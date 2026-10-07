'use strict';
/* Mekanik Ventilasyon Atlası · tek sayfalı uygulama
   Uzun kaydırma yerine sekmeler: her üst sekme kendi görünümünü, alt sekmeler de kendi panelini açar.
   Rotalar: #/ · #/ekran/<alt> · #/temel/<alt> · #/modlar · #/mod/<id>[/<bölüm>] · #/klinik[/<id>] · #/vakalar · #/simulator · #/sinav · #/kaynaklar[/<n>] */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const C = window.MVA_CONTENT;
const T = k => MVA.t(k);

/* ---------- Mod grupları (akordiyon) ---------- */
const MODE_GROUPS = [
  ['kontrollu', ['vc-cmv', 'pc-cmv']],
  ['karma', ['vc-simv', 'pc-simv', 'mmv']],
  ['adaptif', ['prvc', 'prvc-simv', 'volume-support']],
  ['spontan', ['psv', 'cpap', 'variable-ps', 'smartcare']],
  ['iki-duzey', ['bilevel', 'aprv']],
  ['orantili', ['pav-plus', 'pps', 'nava', 'niv-nava']],
  ['kapali', ['asv-adaptive-support', 'intellivent-asv', 'automode']],
  ['niv', ['niv-s', 'niv-st', 'niv-t-pc', 'avaps', 'avaps-ae', 'ivaps']],
  ['uyku', ['sleep-asv', 'apap']],
  ['neo', ['neonatal-tcpl', 'neonatal-ac-sippv', 'neonatal-vg', 'ncpap', 'nippv']],
  ['hf', ['hfov', 'hfov-vg', 'hfjv', 'hfpv', 'nhfov']],
  ['ozel', ['fcv', 'mouthpiece', 'negative-pressure', 'independent-lung', 'vaps-intrabreath']]
];
const MODE = new Map(C.modes.map(m => [m.id, m]));
const ORDER = MODE_GROUPS.flatMap(g => g[1]);
const groupOf = id => MODE_GROUPS.find(g => g[1].includes(id));
/* Kısa ad: başlıktaki "—" sonrası kısaltma, yoksa başlık */
const shortName = m => { const p = m.title.split(' — '); return p.length > 1 ? p[p.length - 1] : m.title; };
const longName = m => m.title.split(' — ')[0];
const SEC_KEYS = ['logic', 'physics', 'settings', 'curve', 'when', 'pitfalls', 'case'];

/* ---------- Ortak parçalar ---------- */
const srcById = new Map(C.sources.map(s => [s.id, s]));
function srcList(ids) {
  return `<ol class="srcs">${ids.map(i => { const s = srcById.get(i); if (!s) return ''; return `<li value="${i}" id="src-${i}"><span class="sn">[${i}]</span> <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>. <span class="muted">${esc(s.pub)}, ${s.year ?? T('src.noyear')}. ${esc(s.type)}.</span></li>`; }).join('')}</ol>`;
}
function subtabs(base, items, cur) {
  return `<nav class="subtabs" aria-label="${T('nav.sub')}">${items.map(([k, label]) => `<a href="#/${base}/${k}"${k === cur ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('')}</nav>`;
}
const disclaimer = () => `<p class="model-note">${T('model.note')}</p>`;
const entityBadge = e => `<span class="badge ent ent-${e}" title="${esc(T('ent.' + e + '.d'))}">${esc(T('ent.' + e))}</span>`;
function figure(file, key) {
  return `<figure class="synth"><img src="${MVA.root}img/${MVA.lang === 'tr' ? '' : MVA.lang + '/'}${file}" alt="${esc(T('fig.' + key + '.alt'))}" loading="lazy"><figcaption>${esc(T('fig.' + key + '.cap'))} <span class="muted">${T('fig.synth')}</span></figcaption></figure>`;
}

/* Etkin görselleştirmeler (rota değişince kapatılır) */
let live = [];
const cleanup = () => { live.forEach(x => x && x.dispose && x.dispose()); live = []; };

/* Görsel kutusu: ekran + sayısal değerler + (isteğe bağlı) döngüler + 3B */
function vizHTML(o = {}) {
  return `<div class="viz${o.stage ? ' with-stage' : ''}">
    <div class="viz-screen">
      <div class="screen-tabs" role="tablist">
        <button type="button" role="tab" aria-selected="true" data-v="wave">${T('viz.waves')}</button>
        ${o.loops === false ? '' : `<button type="button" role="tab" aria-selected="false" data-v="loop">${T('viz.loops')}</button>`}
        <span class="sp"></span>
        <button type="button" class="play" aria-pressed="true" title="${T('viz.pause')}">${T('viz.pause')}</button>
      </div>
      <div class="screen"><canvas class="sc-wave"></canvas><canvas class="sc-loop" hidden></canvas></div>
      <div class="nums" aria-live="off"></div>
      <div class="legend"><span class="lg mand">${T('lg.mand')}</span><span class="lg assist">${T('lg.assist')}</span><span class="lg spont">${T('lg.spont')}</span></div>
    </div>
    ${o.stage ? `<div class="stage" ><div class="pins"></div><div class="stage-views" role="group" aria-label="${T('stage.views')}">${['over', 'front', 'side', 'airway'].map((k, i) => `<button type="button" data-view="${k}" aria-pressed="${!i}">${T('stage.v.' + k)}</button>`).join('')}</div><div class="stage-tools"><button type="button" data-act="lab" aria-pressed="true" title="${T('stage.labels')}">${T('stage.labelsShort')}</button><button type="button" data-act="in" aria-label="${T('stage.in')}">+</button><button type="button" data-act="out" aria-label="${T('stage.out')}">−</button><button type="button" data-act="reset" aria-label="${T('stage.reset')}">⟲</button></div><span class="stage-hint">${T('stage.hint')}</span></div>` : ''}
  </div>
  <div class="chips"></div>`;
}
function mountViz(box, opts) {
  const v = $('.viz', box), st = MODEVIZ.run({scope: $('.sc-wave', v), loops: $('.sc-loop', v), stage: $('.stage', v), nums: $('.nums', v)}, opts);
  live.push(st);
  const chipsBox = box.querySelector('.chips');
  if (chipsBox && !opts.noChips) MODEVIZ.chips(chipsBox, opts.cfg || MODEVIZ.cfg(opts.id), st);
  $$('.screen-tabs [role=tab]', v).forEach(b => b.addEventListener('click', () => {
    $$('.screen-tabs [role=tab]', v).forEach(x => x.setAttribute('aria-selected', x === b));
    $('.sc-wave', v).hidden = b.dataset.v !== 'wave'; $('.sc-loop', v).hidden = b.dataset.v !== 'loop';
    st.scope.resize(); st.loops && st.loops.resize();
  }));
  const play = $('.play', v);
  play.addEventListener('click', () => { const on = st.toggle(); play.setAttribute('aria-pressed', on); play.textContent = T(on ? 'viz.pause' : 'viz.play'); });
  const lab = $('[data-act=lab]', v);
  if (lab) lab.addEventListener('click', () => { const on = lab.getAttribute('aria-pressed') !== 'true'; lab.setAttribute('aria-pressed', on); st.lung && st.lung.setLabels(on); });
  const vb = $$('.stage-views [data-view]', v);
  if (st.lung) st.lung.onView = name => vb.forEach(b => b.setAttribute('aria-pressed', b.dataset.view === name));
  vb.forEach(b => b.addEventListener('click', () => st.lung && st.lung.setView(b.dataset.view)));
  return st;
}

/* =====================================================================
   Görünümler
   ===================================================================== */
const V = {};

V.home = (el) => {
  const m = C.meta;
  el.innerHTML = `<section class="hero wrap">
    <div class="hero-txt">
      <h1>${T('site.name')}</h1>
      <p class="lede">${T('home.lede')}</p>
      <ul class="facts"><li><b>${m.modeCount}</b> ${T('home.f.cards')}</li><li><b>${m.diseaseCount}</b> ${T('home.f.dis')}</li><li><b>${m.caseCount}</b> ${T('home.f.cases')}</li><li><b>${m.sourceCount}</b> ${T('home.f.src')}</li></ul>
      <p class="muted small">${T('home.cardsNote')}</p>
    </div>
    <div class="hero-viz" id="heroViz">${vizHTML({stage: true, loops: false})}</div>
  </section>
  <section class="wrap path">
    <h2 class="h-sm">${T('home.path')}</h2>
    <ol class="steps">
      ${[['ekran/degerler', 'ekran'], ['temel/fizik', 'temel'], ['modlar', 'modlar'], ['klinik', 'klinik'], ['vakalar', 'vakalar'], ['simulator', 'sim'], ['sinav', 'sinav']].map(([h, k], i) => `<li><a href="#/${h}"><span class="n">${i + 1}</span><b>${T('tab.' + k)}</b><span>${T('home.step.' + k)}</span></a></li>`).join('')}
    </ol>
  </section>`;
  const st = mountViz($('#heroViz'), {id: 'pc-cmv', noChips: true});
  $('#heroViz .chips').innerHTML = `<p class="muted small">${T('home.vizCap')}</p>`;
};

/* ---------- Ventilatör ekranı ---------- */
const EKRAN = [['degerler', 'ek.degerler'], ['egriler', 'ek.egriler'], ['donguler', 'ek.donguler'], ['asenkroni', 'ek.asenkroni'], ['alarmlar', 'ek.alarmlar']];
V.ekran = (el, sub = 'degerler', item) => {
  if (!EKRAN.find(x => x[0] === sub)) sub = 'degerler';
  const tabs = subtabs('ekran', EKRAN.map(([k, l]) => [k, T(l)]), sub);
  const head = `<header class="page-head wrap"><p class="eyebrow">${T('tab.ekran')}</p><h1>${T('ek.title')}</h1>${tabs}</header>`;
  if (sub === 'degerler') { el.innerHTML = head; VALUES.view(el, C.docs.degerler.html, C.docs.degerler.sources, srcList); return; }
  if (sub === 'egriler') {
    el.innerHTML = head + `<div class="wrap split">
      <div class="col-viz">${vizHTML({stage: false})}<div class="cmp-switch" role="group"><button class="chip" data-m="vc-cmv" aria-pressed="true">VC</button><button class="chip" data-m="pc-cmv" aria-pressed="false">PC</button><button class="chip" data-m="psv" aria-pressed="false">PS</button></div>${disclaimer()}${figure('01_vc_pc_skalerler.svg', 'f1')}</div>
      <article class="doc col-doc">${docBody('okuma')}</article></div>`;
    compareSwitch(el); return;
  }
  if (sub === 'donguler') {
    const d = C.docs.okuma, i0 = d.html.indexOf('<h3 id="iki-dongu"'), i1 = d.html.indexOf('<h3', i0 + 5);
    el.innerHTML = head + `<div class="wrap split pat">
      <div class="col-viz">
        <div class="pat-list" role="tablist">${LOOPS.map((p, i) => `<button type="button" role="tab" class="pat-b" data-i="${i}" aria-selected="${i === 0}">${T('lp.' + p.k)}</button>`).join('')}</div>
        <div id="lv"></div>
        <p class="pat-cap"></p>
        ${disclaimer()}
      </div>
      <article class="doc col-doc">${d.html.slice(i0, i1 > 0 ? i1 : undefined)}${srcList(d.sources)}</article></div>`;
    bindLoops(el, Math.max(0, LOOPS.findIndex(x => x.k === item)));
    return;
  }
  if (sub === 'asenkroni') { el.innerHTML = head + patternView(); bindPatterns(el); return; }
  if (sub === 'alarmlar') { el.innerHTML = head + docView('olcum'); return; }
};

/* VC / PC / PS karşılaştırma düğmeleri */
function compareSwitch(el) {
  const box = $('.col-viz', el);
  let st = mountViz(box, {id: 'vc-cmv', noChips: true});
  $$('.cmp-switch .chip', el).forEach(b => b.addEventListener('click', () => {
    $$('.cmp-switch .chip', el).forEach(x => x.setAttribute('aria-pressed', x === b));
    st.dispose(); live = live.filter(x => x !== st);
    const v = $('.viz', box); v.outerHTML = vizHTML({stage: false}); $('.chips', box).remove();
    st = mountViz(box, {id: b.dataset.m, noChips: true});
  }));
}

/* ---------- Döngü galerisi: her örnek fizik motorundan; kesikli çizgi aynı modun referans döngüsü ---------- */
const LOOPS = [
  {k: 'vc', id: 'vc-cmv', set: {pause: .2}},
  {k: 'pc', id: 'pc-cmv'},
  {k: 'lowC', id: 'vc-cmv', set: {pause: .2}, pt: {C: .025}, ref: 'vc'},
  {k: 'highR', id: 'vc-cmv', set: {pause: .2}, pt: {R: 25}, ref: 'vc'},
  {k: 'over', id: 'vc-cmv', set: {vt: .6, pause: .2}, pt: {Ku: 450, Vu: .6}, ref: {id: 'vc-cmv', set: {vt: .6, pause: .2}}, only: 'pv'},
  {k: 'flowlim', id: 'vc-cmv', set: {pause: .2}, pt: {R: 12, fl: 7}, ref: {id: 'vc-cmv', set: {pause: .2}, pt: {R: 14}}, only: 'fv'},
  {k: 'trap', id: 'vc-cmv', set: {rate: 24, vt: .5, ti: 1, pause: 0}, pt: {R: 22, C: .06}, only: 'fv'},
  {k: 'leak', id: 'pc-cmv', pt: {leak: .035, measVol: true}, ref: 'pc'},
  {k: 'secr', id: 'vc-cmv', set: {pause: .2}, pt: {secr: .14}, ref: 'vc'},
  {k: 'effort', id: 'psv', set: {ps: 6, trigP: 2}, pt: {effort: {on: true, rate: 18, pmax: 11, ti: 1}}, ref: {id: 'pc-cmv', set: {pinsp: 6, ti: .9}}, only: 'pv'}
];
/* Bir modelin tam bir soluğunu döngü noktaları olarak yakala (referans için) */
function captureLoop(def) {
  const sim = new VENT.Sim(VENT.make(def.id, Object.assign({}, def.set)), Object.assign({R: 10, C: .05, effort: {on: false}}, def.pt || {}));
  sim.run(14, 1);
  const pts = []; let n0 = sim.events.length, started = false;
  for (let i = 0; i < 1200; i++) {
    sim.run(.01, .01, s => { if (sim.events.length > n0) { n0 = sim.events.length; if (started) i = 1e9; started = true; } if (started) pts.push([s.paw, s.vol, s.flow]); });
  }
  return pts;
}
function bindLoops(el, start = 0) {
  let st = null;
  const show = i => {
    const p = LOOPS[i];
    $$('.pat-b', el).forEach(b => b.setAttribute('aria-selected', +b.dataset.i === i));
    if (st) { st.dispose(); live = live.filter(x => x !== st); }
    $('#lv').innerHTML = vizHTML({stage: false});
    const cfg = Object.assign({}, MODEVIZ.cfg(p.id), {ch: [], groups: [], win: 10});
    st = mountViz($('#lv'), {id: p.id, cfg, settings: Object.assign({}, p.set), patient: Object.assign({R: 10, C: .05, effort: {on: false}}, JSON.parse(JSON.stringify(p.pt || {}))), noChips: true});
    if (p.only) st.loops.o.only = p.only;
    if (p.ref) { const r = typeof p.ref === 'string' ? LOOPS.find(x => x.k === p.ref) : p.ref; st.loops.setReference(captureLoop(r)); }
    $$('#lv .screen-tabs [role=tab]')[1].click();
    $('.pat-cap', el).textContent = T('lp.' + p.k + '.d');
  };
  $$('.pat-b', el).forEach(b => b.addEventListener('click', () => show(+b.dataset.i)));
  show(start);
}

/* ---------- Örüntü ve asenkroni galerisi (fizik motoruyla üretilir) ---------- */
const PATTERNS = [
  {k: 'peak', id: 'vc-cmv', pt: {R: 10, C: .05}, ev: {R: 20}, sec: 'mekanik-oruntuler'},
  {k: 'both', id: 'vc-cmv', pt: {R: 10, C: .05}, ev: {C: .025}, sec: 'mekanik-oruntuler'},
  {k: 'pcvt', id: 'pc-cmv', pt: {R: 10, C: .05}, ev: {C: .025}, sec: 'mekanik-oruntuler'},
  {k: 'trap', id: 'vc-cmv', set: {rate: 24, vt: .5, ti: 1, pause: 0}, pt: {R: 22, C: .06}, sec: 'hava-hapsi-ve-peep'},
  {k: 'leak', id: 'pc-cmv', pt: {R: 10, C: .05, leak: .1}, showLeak: true, loops: true, sec: 'mekanik-oruntuler'},
  {k: 'ineff', id: 'vc-cmv', set: {rate: 20, vt: .55, ti: 1.1, pause: 0, trig: .12}, pt: {R: 24, C: .06, effort: {on: true, rate: 30, pmax: 3.5, ti: .7}}, sec: 'tetikleme-sorunlari'},
  {k: 'auto', id: 'psv', set: {ps: 8}, pt: {R: 10, C: .05, leak: .08, leakTau: 1e9}, showLeak: true, sec: 'tetikleme-sorunlari'},
  {k: 'delay', id: 'psv', set: {ps: 8, trig: .2}, pt: {R: 12, C: .05, effort: {on: true, rate: 20, pmax: 7, ti: .9}}, ch: ['pmus'], sec: 'tetikleme-sorunlari'},
  {k: 'starve', id: 'vc-cmv', set: {rate: 12, vt: .45, ti: 1.2, pause: 0}, pt: {R: 10, C: .05, effort: {on: true, rate: 22, pmax: 14, ti: 1.1}}, ch: ['pmus'], sec: 'akim-ve-cevrim-sorunlari'},
  {k: 'early', id: 'psv', set: {ps: 7, ets: .6}, pt: {R: 10, C: .05, effort: {on: true, rate: 16, pmax: 9, ti: 1.5}}, ch: ['pmus'], sec: 'akim-ve-cevrim-sorunlari'},
  {k: 'late', id: 'psv', set: {ps: 12, ets: .15, tiMax: 3}, pt: {R: 22, C: .06, effort: {on: true, rate: 18, pmax: 5, ti: .6}}, ch: ['pmus'], sec: 'akim-ve-cevrim-sorunlari'},
  {k: 'double', id: 'vc-cmv', set: {rate: 14, vt: .4, ti: .7, pause: 0}, pt: {R: 10, C: .05, effort: {on: true, rate: 20, pmax: 10, ti: 1.6}}, ch: ['pmus'], sec: 'akim-ve-cevrim-sorunlari'},
  {k: 'reverse', id: 'vc-cmv', set: {rate: 16, vt: .4, ti: 1, pause: 0, noAssist: false}, pt: {R: 10, C: .05, effort: {on: true, rate: 4, pmax: 6, ti: .8, entrain: .9}}, ch: ['pmus'], sec: 'akim-ve-cevrim-sorunlari'}
];
function patternView() {
  const d = C.docs.oruntu;
  return `<div class="wrap split pat">
    <div class="col-viz">
      <div class="pat-list" role="tablist">${PATTERNS.map((p, i) => `<button type="button" role="tab" class="pat-b" data-i="${i}" aria-selected="${i === 0}">${T('pat.' + p.k)}</button>`).join('')}</div>
      <div id="patViz">${vizHTML({stage: false})}</div>
      <div class="pat-ev"></div>
      <p class="pat-cap"></p>
      ${disclaimer()}
    </div>
    <article class="doc col-doc" id="patDoc">${d.html}${srcList(d.sources)}</article>
  </div>`;
}
function bindPatterns(el) {
  let st = null;
  const show = i => {
    const p = PATTERNS[i];
    $$('.pat-b', el).forEach(b => b.setAttribute('aria-selected', +b.dataset.i === i));
    if (st) { st.dispose(); live = live.filter(x => x !== st); }
    $('#patViz').innerHTML = vizHTML({stage: false});
    const cfg = Object.assign({}, MODEVIZ.cfg(p.id), {ch: p.ch || [], groups: [], win: 10});
    const patient = Object.assign({R: 10, C: .05, effort: {on: false}}, JSON.parse(JSON.stringify(p.pt)));
    const settings = Object.assign({}, p.set || {});
    st = mountViz($('#patViz'), {id: p.id, cfg, patient, settings, noChips: true});
    if (p.showLeak) st.sim.mode.showLeak = true;
    if (p.loops) $$('#patViz .screen-tabs [role=tab]')[1].click();
    const ev = $('.pat-ev', el);
    ev.innerHTML = p.ev ? `<button type="button" class="chip" aria-pressed="false">${T('pat.' + p.k + '.ev')}</button>` : '';
    if (p.ev) { const b = $('button', ev); b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); st.apply(on ? p.ev : {R: p.pt.R, C: p.pt.C}); }); }
    $('.pat-cap', el).textContent = T('pat.' + p.k + '.d');
    const h = $('#' + p.sec, $('#patDoc')); $$('#patDoc .hl').forEach(x => x.classList.remove('hl')); if (h) h.classList.add('hl');
  };
  $$('.pat-b', el).forEach(b => b.addEventListener('click', () => show(+b.dataset.i)));
  show(0);
}

/* ---------- Temel kavramlar ---------- */
const TEMEL = [['oku', 'te.oku'], ['fizik', 'te.fizik'], ['ozellikler', 'te.ozellikler'], ['sozluk', 'te.sozluk']];
V.temel = (el, sub = 'oku') => {
  if (!TEMEL.find(x => x[0] === sub)) sub = 'oku';
  const head = `<header class="page-head wrap"><p class="eyebrow">${T('tab.temel')}</p><h1>${T('te.title')}</h1>${subtabs('temel', TEMEL.map(([k, l]) => [k, T(l)]), sub)}</header>`;
  if (sub === 'fizik') {
    el.innerHTML = head + `<div class="wrap split">
      <div class="col-viz" id="eqm">
        <h2 class="h-sm">${T('eq.title')}</h2><p class="muted small">${T('eq.lede')}</p>
        <div class="eq-ctrl">
          <div class="seg" role="group"><button class="chip" data-m="vc-cmv" aria-pressed="true">VC</button><button class="chip" data-m="pc-cmv" aria-pressed="false">PC</button></div>
          <label class="sl">R <output data-o="R">10</output> cmH₂O·s/L<input type="range" min="5" max="30" step="1" value="10" data-k="R"></label>
          <label class="sl">C <output data-o="C">${MVA.num(.05, 3)}</output> L/cmH₂O<input type="range" min="10" max="80" step="1" value="50" data-k="C"></label>
        </div>
        <div id="eqViz">${vizHTML({stage: false})}</div>
        <p class="eq-read" id="eqRead"></p>
        ${disclaimer()}
        ${figure('02_direnc_kompliyans.svg', 'f2')}${figure('03_zaman_sabiti.svg', 'f3')}
      </div>
      <article class="doc col-doc">${docBody('fizik')}</article></div>`;
    bindEquation(el); return;
  }
  el.innerHTML = head + docView(sub, {search: sub === 'sozluk'});
  if (sub === 'sozluk') bindTableSearch(el);
};
function bindEquation(el) {
  let mode = 'vc-cmv', st = null;
  const P = {R: 10, C: .05};
  const read = () => {
    const tau = P.R * P.C;
    $('#eqRead').innerHTML = MVA.fill(T('eq.read'), {tau: MVA.num(tau, 2), tau3: MVA.num(tau * 3, 2)});
    $('[data-o=R]', el).textContent = P.R; $('[data-o=C]', el).textContent = MVA.num(P.C, 3);
  };
  const start = () => {
    if (st) { st.dispose(); live = live.filter(x => x !== st); $('#eqViz').innerHTML = vizHTML({stage: false}); }
    st = mountViz($('#eqViz'), {id: mode, cfg: Object.assign({}, MODEVIZ.cfg(mode), {groups: [], win: 8}), patient: {R: P.R, C: P.C, effort: {on: false}}, noChips: true});
  };
  $$('.seg .chip', el).forEach(b => b.addEventListener('click', () => { $$('.seg .chip', el).forEach(x => x.setAttribute('aria-pressed', x === b)); mode = b.dataset.m; start(); }));
  $$('input[type=range]', el).forEach(r => r.addEventListener('input', () => { P[r.dataset.k] = r.dataset.k === 'C' ? +r.value / 1000 : +r.value; read(); st.apply({[r.dataset.k]: P[r.dataset.k]}); }));
  read(); start();
}

/* Belge görünümü: içerik + kaynaklar; bölüm içi küçük içindekiler */
function docBody(id) { const d = C.docs[id]; return `${d.html}${srcList(d.sources)}`; }
function docView(id, o = {}) {
  const d = C.docs[id];
  const toc = d.sections.length > 2 ? `<nav class="toc" aria-label="${T('doc.toc')}">${d.sections.map(s => `<a href="#${s.id}" data-jump="${s.id}">${esc(s.title)}</a>`).join('')}</nav>` : '';
  return `<div class="wrap doc-wrap">${toc}<article class="doc">${o.search ? `<label class="search"><span class="sr">${T('doc.search')}</span><input type="search" placeholder="${T('doc.search')}"></label>` : ''}${d.html}<h3>${T('src.title')}</h3>${srcList(d.sources)}</article></div>`;
}
function bindTableSearch(el) {
  const inp = $('input[type=search]', el); if (!inp) return;
  inp.addEventListener('input', () => { const q = MVA.fold(inp.value.trim()); $$('tbody tr', el).forEach(tr => { tr.hidden = q && !MVA.fold(tr.textContent).includes(q); }); });
}

/* ---------- Mod kataloğu (akordiyon) ---------- */
V.modlar = (el) => {
  const types = Object.keys(C.meta.entityTypes);
  el.innerHTML = `<header class="page-head wrap"><p class="eyebrow">${T('tab.modlar')}</p><h1>${T('mo.title')}</h1><p class="lede">${T('mo.lede')}</p></header>
  <section class="wrap">
    <div class="toolbar">
      <label class="search"><span class="sr">${T('mo.search')}</span><input type="search" id="mq" placeholder="${T('mo.search')}"></label>
      <div class="seg" role="group" aria-label="${T('mo.filter')}"><button class="chip" data-e="" aria-pressed="true">${T('mo.all')}</button>${types.map(t => `<button class="chip" data-e="${t}" aria-pressed="false">${T('ent.' + t)} <span class="muted">${C.meta.entityTypes[t]}</span></button>`).join('')}</div>
    </div>
    <div id="acc">${MODE_GROUPS.map(([g, ids], gi) => `<details class="group" data-g="${g}"${gi === 0 ? ' open' : ''}>
      <summary><span class="n">${String(gi + 1).padStart(2, '0')}</span><span class="g-title"><h3>${T('mg.' + g)}</h3><span class="g-preview">${ids.map(i => esc(shortName(MODE.get(i)))).join(' · ')}</span></span><span class="g-count">${ids.length}</span><span class="chev" aria-hidden="true"></span></summary>
      <div class="g-body"><p class="g-lede">${T('mg.' + g + '.d')}</p><div class="cards">${ids.map(i => modeCard(MODE.get(i))).join('')}</div></div>
    </details>`).join('')}</div>
    <p class="empty" hidden>${T('mo.empty')}</p>
  </section>`;
  const acc = $('#acc', el);
  /* aynı anda tek grup açık */
  $$('details.group', acc).forEach(d => d.addEventListener('toggle', () => { if (d.open && !acc.dataset.searching) $$('details.group', acc).forEach(o => { if (o !== d) o.open = false; }); }));
  let ent = '';
  const filter = () => {
    const q = MVA.fold($('#mq').value.trim()); let any = false;
    acc.dataset.searching = q || ent ? '1' : '';
    $$('details.group', acc).forEach(d => {
      let n = 0;
      $$('.card', d).forEach(c => { const m = MODE.get(c.dataset.id); const ok = (!ent || m.entity === ent) && (!q || MVA.fold(m.title + ' ' + m.aliases.join(' ') + ' ' + m.group).includes(q)); c.hidden = !ok; if (ok) n++; });
      d.hidden = !n; if (q || ent) d.open = n > 0; any = any || n > 0;
    });
    if (!q && !ent) { const first = $$('details.group', acc).find(d => d.open); if (!first) $('details.group', acc).open = true; }
    $('.empty', el).hidden = any;
  };
  $('#mq').addEventListener('input', filter);
  $$('.seg .chip', el).forEach(b => b.addEventListener('click', () => { $$('.seg .chip', el).forEach(x => x.setAttribute('aria-pressed', x === b)); ent = b.dataset.e; filter(); }));
};
function modeCard(m) {
  const logic = m.sections[0].html.replace(/<span class="cites">[\s\S]*?<\/span>/g, '');
  const ps = PROG.stage(m.id);
  return `<a class="card" href="#/mod/${m.id}" data-id="${m.id}">
    ${ps ? `<span class="pmark p${ps}" title="${esc(T('prog.st' + ps))}">${ps === 3 ? '✓' : ''}</span>` : ''}
    <span class="card-k">${esc(shortName(m))}</span>
    <h4>${esc(longName(m))}</h4>
    <p>${logic}</p>
    <span class="badges">${entityBadge(m.entity)}<span class="badge">${esc(m.group)}</span></span>
  </a>`;
}

/* ---------- Mod sayfası ---------- */
V.mod = (el, id, sec) => {
  const m = MODE.get(id); if (!m) return V.modlar(el);
  PROG.mark(id, 1);
  const g = groupOf(id), i = ORDER.indexOf(id), prev = MODE.get(ORDER[i - 1]), next = MODE.get(ORDER[i + 1]);
  const tabs = LAYERS.MODE_TABS.filter(k => m.x || ['summary', 'src', 'q'].includes(k));
  let cur = tabs.includes(sec) ? sec : tabs[0];
  const dis = C.diseases.filter(d => d.related.includes(id) || (d.x && d.x.modes.some(h => h.mod === id)));
  const grp = (C.groups || []).filter(d => d.modes.some(h => h.mod === id));
  const curve = m.sections[3];
  const nStart = m.x ? m.x.start.rows.length : 0;
  el.innerHTML = `<header class="page-head wrap mode-head">
    <nav class="crumbs"><a href="#/modlar">${T('tab.modlar')}</a> › <a href="#/modlar" data-open="${g[0]}">${T('mg.' + g[0])}</a></nav>
    <h1><span class="mk">${esc(shortName(m))}</span> ${esc(longName(m))}</h1>
    <div class="badges">${entityBadge(m.entity)}<span class="badge">${esc(m.group)}</span><span class="badge ok">✓ ${T('mode.review')}</span></div>
    ${m.aliasNote ? `<p class="aliases"><b>${T('mode.aliases')}:</b> ${m.aliasNote}${m.exact ? '' : ` <span class="muted">${T('mode.noexact')}</span>`}</p>` : ''}
  </header>
  <section class="wrap mode-viz" id="mv">
    ${vizHTML({stage: true})}
    <div class="curve-note"><b>${esc(curve.title)}</b> ${curve.html}</div>
    ${disclaimer()}
  </section>
  <section class="wrap mode-body" id="katman">
    <div class="sectabs" role="tablist">${tabs.map(k => `<button type="button" role="tab" aria-selected="${k === cur}" data-k="${k}">${T('lt.' + k)}${k === 'src' ? ` <span class="muted">${m.src.length}</span>` : k === 'start' ? ` <span class="muted">${nStart || '–'}</span>` : ''}</button>`).join('')}</div>
    <div class="secpanel" role="tabpanel"></div>
    <div class="mode-foot">
      ${dis.length || grp.length ? `<div class="rel"><b>${T('mode.diseases')}</b>${dis.map(d => `<a class="chip" href="#/klinik/${d.id}">${esc(d.title.split(':')[0])}</a>`).join('')}${grp.map(d => `<a class="chip" href="#/klinik/${d.id}">${esc(d.title.split(':')[0])}</a>`).join('')}</div>` : ''}
      <nav class="prevnext">${prev ? `<a href="#/mod/${prev.id}">← ${esc(shortName(prev))}</a>` : '<span></span>'}${next ? `<a href="#/mod/${next.id}">${esc(shortName(next))} →</a>` : ''}</nav>
    </div>
  </section>`;
  mountViz($('#mv'), {id});
  const panel = $('.secpanel', el);
  const show = k => {
    cur = k;
    $$('.sectabs [role=tab]', el).forEach(b => b.setAttribute('aria-selected', b.dataset.k === k));
    if (k === 'src') { panel.innerHTML = `<h2 class="h-sm">${T('src.title')}</h2>${srcList(m.src.concat(...(m.x ? [] : [])))}${m.x ? `<h3 class="h-xs">${T('src.v2')}</h3>${srcList(v2Sources(m).filter(n => !m.src.includes(n)))}` : ''}`; return; }
    if (k === 'q') { panel.innerHTML = ''; QUIZ.inline(panel, id); return; }
    if (k === 'summary') {
      panel.innerHTML = `<h2 class="h-sm">${T('lt.summary')}</h2><p class="muted small">${T('lx.summaryNote')}</p><div class="sum-grid">${m.sections.map((s, j) => `<section class="sumc"><h4>${esc(s.title)}</h4><p>${s.html}</p><p class="muted small">${T('src.inline')} ${s.src.map(n => `<a class="cite" href="#/kaynaklar/${n}">${n}</a>`).join(' ')}</p></section>`).join('')}</div>`;
      return;
    }
    panel.innerHTML = LAYERS.modeTab(k, m, {MODE, shortName});
  };
  $$('.sectabs [role=tab]', el).forEach(b => b.addEventListener('click', () => { show(b.dataset.k); history.replaceState(null, '', `#/mod/${id}/${b.dataset.k}`); }));
  show(cur);
  if (sec) setTimeout(() => $('#katman').scrollIntoView({block: 'start'}), 50);
  $('[data-open]', el).addEventListener('click', e => { sessionStorage.setItem('mva-open', e.target.dataset.open); });
};
/* V2 katmanlarında atıf yapılan kaynaklar (metindeki [n] ve kaynak_ids) */
function v2Sources(m) {
  const set = new Set(), add = a => (a || []).forEach(n => set.add(n));
  const x = m.x; const scan = h => { if (h) for (const r of String(h).matchAll(/data-src="(\d+)"/g)) set.add(+r[1]); };
  scan(x.easy); scan(x.detail); (x.settings || []).forEach(a => { add(a.src); scan(a.ne); });
  (x.ind || []).forEach(e => add(e.src)); (x.avoid || []).forEach(e => add(e.src)); (x.studies || []).forEach(e => add(e.src));
  x.start.rows.forEach(r => add(r.src)); (x.titr || []).forEach(e => add(e.src)); x.wean && add(x.wean.src); (x.errors || []).forEach(e => add(e.src)); (x.cmp || []).forEach(e => add(e.src));
  if (x.vaka) scan(x.vaka.html);
  return [...set].sort((a, b) => a - b);
}

/* ---------- Klinik: hastalığa göre yaklaşım + özel gruplar (katmanlı) ---------- */
V.klinik = (el, id, sec) => {
  const list = C.diseases, groups = C.groups || [];
  if (!id) id = list[0].id;
  const isPed = id === 'pediatri';
  const d = list.find(x => x.id === id) || groups.find(x => x.id === id);
  const isGroup = groups.includes(d);
  el.innerHTML = `<header class="page-head wrap"><p class="eyebrow">${T('tab.klinik')}</p><h1>${T('kl.title')}</h1><p class="lede">${T('kl.lede')}</p></header>
  <section class="wrap md">
    <nav class="md-list" aria-label="${T('kl.list')}">${list.map(x => `<a href="#/klinik/${x.id}"${x.id === id ? ' aria-current="page"' : ''}>${esc(x.title.split(':')[0])}</a>`).join('')}
      <span class="md-sep">${T('kl.special')}</span>
      ${groups.map(x => `<a href="#/klinik/${x.id}"${x.id === id ? ' aria-current="page"' : ''}>${esc(x.title.split(':')[0])} <span class="agegrp-s">${esc(x.grup)}</span></a>`).join('')}
      <a href="#/klinik/pediatri"${isPed ? ' aria-current="page"' : ''}>${T('kl.ped')}</a></nav>
    <article class="md-detail doc">${isPed ? `<h2>${esc(C.docs.pediatri.title)}</h2>${docBody('pediatri')}` : d ? disHead(d, isGroup) : ''}</article>
  </section>`;
  if (!d || isPed) return;
  const x = d.x || (isGroup ? d : null);
  const tabs = (x ? LAYERS.DIS_TABS : ['summary', 'src']).filter(k => isGroup ? k !== 'summary' : true);
  let cur = tabs.includes(sec) ? sec : tabs[0];
  const box = $('.md-detail', el);
  box.insertAdjacentHTML('beforeend', `<div class="sectabs" role="tablist">${tabs.map(k => `<button type="button" role="tab" data-k="${k}" aria-selected="${k === cur}">${T('dt.' + k)}</button>`).join('')}</div><div class="secpanel dpanel"></div><p class="muted small">${T('kl.notool')}</p>`);
  const panel = $('.dpanel', el);
  const show = k => {
    $$('.sectabs [role=tab]', box).forEach(b => b.setAttribute('aria-selected', b.dataset.k === k));
    if (k === 'summary') { panel.innerHTML = disParts(d); return; }
    if (k === 'src') { const all = new Set([...(d.src || []), ...((x && x.src) || [])]); if (x) { x.start.rows.forEach(r => r.src.forEach(n => all.add(n))); x.studies.forEach(s => s.src.forEach(n => all.add(n))); [...x.goals, ...x.titr, ...x.rescue].forEach(e => e.src.forEach(n => all.add(n))); } panel.innerHTML = `<h2 class="h-sm">${T('src.title')}</h2>${srcList([...all].sort((a, b) => a - b))}`; return; }
    panel.innerHTML = LAYERS.disTab(k, x, {MODE, shortName});
  };
  $$('.sectabs [role=tab]', box).forEach(b => b.addEventListener('click', () => { show(b.dataset.k); history.replaceState(null, '', `#/klinik/${id}/${b.dataset.k}`); }));
  show(cur);
};
function disHead(d, isGroup) {
  const title = (d.x && d.x.title) || d.title, [t1, ...rest] = title.split(':'), grp = (d.x && d.x.grup) || d.grup, grpK = (d.x && d.x._o && d.x._o.grup) || (d._o && d._o.grup) || grp;
  return `<h2>${esc(t1)}${rest.length ? `<span class="sub">${esc(rest.join(':').trim())}</span>` : ''}</h2>
    <div class="badges">${grp ? LAYERS.grpBadge(grp, grpK) : ''}${isGroup ? `<span class="badge">${T('kl.groupBadge')}</span>` : ''}<span class="badge ok">✓ ${T('mode.review')}</span></div>
    ${d.related ? `<div class="rel"><b>${T('kl.modes')}</b>${d.related.map(r => `<a class="chip" href="#/mod/${r}">${esc(shortName(MODE.get(r)))}</a>`).join('')}</div>` : ''}`;
}
function disParts(d) {
  return `<h2 class="h-sm">${T('dt.summary')}</h2><div class="dis-parts">${d.parts.map(p => `<section class="dpart${/vaka/i.test((p._o || p).label) ? ' case' : /kaçınılacak|ezber/i.test((p._o || p).label) ? ' avoid' : ''}"><h4>${esc(p.label)}</h4><p>${p.html}</p></section>`).join('')}</div>`;
}

/* ---------- Vakalar ---------- */
V.vakalar = (el) => {
  el.innerHTML = `<header class="page-head wrap"><p class="eyebrow">${T('tab.vakalar')}</p><h1>${T('va.title')}</h1><p class="lede">${T('va.lede')}</p></header>
  <section class="wrap"><div class="cases">${C.cases.map((c, i) => `<article class="case-card" data-i="${i}">
    <p class="eyebrow">${T('va.case')} ${i + 1} · ${T('va.fiction')}</p>
    <h3>${esc(c.title)}</h3>
    <p class="cq">${c.q}</p>
    <button type="button" class="reveal" aria-expanded="false">${T('va.reveal')}</button>
    <div class="ca" hidden><p><b>${T('va.answer')}</b> ${c.a}</p><p class="trap"><b>${T('va.trap')}</b> ${c.trap}</p><p class="muted small">${T('src.inline')} ${c.src.map(n => `<a class="cite" href="#/kaynaklar/${n}">${n}</a>`).join(' ')}</p></div>
  </article>`).join('')}</div></section>`;
  $$('.reveal', el).forEach(b => b.addEventListener('click', () => { const a = b.nextElementSibling, open = a.hidden; a.hidden = !open; b.setAttribute('aria-expanded', open); b.textContent = T(open ? 'va.hide' : 'va.reveal'); }));
};

/* ---------- Simülatör ---------- */
const SIM_MODES = ['vc-cmv', 'pc-cmv', 'prvc', 'vc-simv', 'pc-simv', 'psv', 'cpap', 'volume-support', 'bilevel', 'aprv', 'pav-plus', 'nava'];
const SIM_SET = {
  'vc-cmv': [['vt', .2, .8, .01, .4, 'L'], ['rate', 6, 35, 1, 15, MVA.u('/dk')], ['ti', .5, 2, .05, 1, 's'], ['pause', 0, .5, .05, .2, 's'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'pc-cmv': [['pinsp', 4, 30, 1, 10, 'cmH₂O'], ['rate', 6, 35, 1, 15, MVA.u('/dk')], ['ti', .5, 2, .05, 1, 's'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'prvc': [['vtTarget', .2, .8, .01, .4, 'L'], ['rate', 6, 35, 1, 15, MVA.u('/dk')], ['ti', .5, 2, .05, 1, 's'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'vc-simv': [['vt', .2, .8, .01, .4, 'L'], ['rate', 2, 20, 1, 8, MVA.u('/dk')], ['ps', 0, 20, 1, 6, 'cmH₂O'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'pc-simv': [['pinsp', 4, 30, 1, 12, 'cmH₂O'], ['rate', 2, 20, 1, 8, MVA.u('/dk')], ['ps', 0, 20, 1, 6, 'cmH₂O'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'psv': [['ps', 0, 25, 1, 8, 'cmH₂O'], ['ets', .05, .7, .05, .25, '×'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'cpap': [['peep', 0, 20, 1, 6, 'cmH₂O']],
  'volume-support': [['vtTarget', .2, .8, .01, .45, 'L'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'bilevel': [['phigh', 5, 35, 1, 15, 'cmH₂O'], ['plow', 0, 20, 1, 5, 'cmH₂O'], ['thigh', .5, 6, .1, 1.6, 's'], ['tlow', .3, 6, .1, 2.4, 's'], ['psLow', 0, 20, 1, 6, 'cmH₂O']],
  'aprv': [['phigh', 5, 35, 1, 20, 'cmH₂O'], ['plow', 0, 15, 1, 0, 'cmH₂O'], ['thigh', 1, 8, .1, 4.5, 's'], ['tlow', .2, 2, .05, .5, 's']],
  'pav-plus': [['gain', .1, .9, .05, .6, '×'], ['peep', 0, 20, 1, 5, 'cmH₂O']],
  'nava': [['level', .1, 3, .1, .8, 'cmH₂O/µV'], ['peep', 0, 20, 1, 5, 'cmH₂O']]
};
V.simulator = (el) => {
  let mode = sessionStorage.getItem('mva-sim') || 'pc-cmv';
  if (!SIM_MODES.includes(mode)) mode = 'pc-cmv';
  const P = {R: 10, C: .05, eff: 0, effRate: 18, leak: 0};
  el.innerHTML = `<header class="page-head wrap"><p class="eyebrow">${T('tab.sim')}</p><h1>${T('si.title')}</h1><p class="lede">${T('si.lede')}</p></header>
  <section class="wrap sim">
    <aside class="sim-ctrl">
      <label class="fld"><span>${T('si.mode')}</span><select id="smode">${SIM_MODES.map(k => `<option value="${k}"${k === mode ? ' selected' : ''}>${esc(shortName(MODE.get(k)))}</option>`).join('')}</select></label>
      <fieldset><legend>${T('si.vent')}</legend><div id="sset"></div></fieldset>
      <fieldset><legend>${T('si.pt')}</legend>
        <label class="sl">R <output data-o="R"></output> cmH₂O·s/L<input type="range" min="5" max="40" step="1" value="10" data-p="R"></label>
        <label class="sl">C <output data-o="C"></output> L/cmH₂O<input type="range" min="10" max="100" step="1" value="50" data-p="C"></label>
        <label class="sl">${T('si.effort')} <output data-o="eff"></output> cmH₂O<input type="range" min="0" max="15" step="1" value="0" data-p="eff"></label>
        <label class="sl">${T('si.effRate')} <output data-o="effRate"></output> ${MVA.u("/dk")}<input type="range" min="6" max="40" step="1" value="18" data-p="effRate"></label>
      </fieldset>
      <button type="button" class="btn-ghost" id="sreset">${T('si.reset')}</button>
      <p class="muted small">${T('si.note')}</p>
    </aside>
    <div class="sim-viz" id="sv">${vizHTML({stage: true})}${disclaimer()}</div>
  </section>`;
  let st = null, S = {};
  const outs = () => {
    $('[data-o=R]', el).textContent = P.R; $('[data-o=C]', el).textContent = MVA.num(P.C, 3);
    $('[data-o=eff]', el).textContent = P.eff; $('[data-o=effRate]', el).textContent = P.effRate;
  };
  const effort = () => ({on: P.eff > 0, pmax: P.eff, rate: P.effRate, ti: Math.min(1.2, 30 / P.effRate * .9)});
  const start = () => {
    if (st) { st.dispose(); live = live.filter(x => x !== st); $('#sv').innerHTML = vizHTML({stage: true}) + disclaimer(); }
    S = {}; (SIM_SET[mode] || []).forEach(([k, , , , v]) => { S[k] = v; });
    $('#sset').innerHTML = (SIM_SET[mode] || []).map(([k, lo, hi, step, v, u]) => `<label class="sl">${T('set.' + k)} <output data-s="${k}">${MVA.num(v, step < 1 ? (step < .1 ? 2 : 1) : 0)}</output> ${u}<input type="range" min="${lo}" max="${hi}" step="${step}" value="${v}" data-s="${k}"></label>`).join('');
    $$('#sset input', el).forEach(r => r.addEventListener('change', () => { S[r.dataset.s] = +r.value; restartKeep(); }));
    $$('#sset input', el).forEach(r => r.addEventListener('input', () => { const st2 = +r.step; $(`output[data-s="${r.dataset.s}"]`, el).textContent = MVA.num(+r.value, st2 < 1 ? (st2 < .1 ? 2 : 1) : 0); }));
    run();
  };
  const run = () => {
    const cfg = Object.assign({}, MODEVIZ.cfg(mode), {groups: [], win: 10, ch: mode === 'nava' ? ['edi'] : P.eff ? ['pmus'] : []});
    st = mountViz($('#sv'), {id: mode, cfg, settings: Object.assign({}, S), patient: {R: P.R, C: P.C, effort: effort()}, noChips: true});
  };
  const restartKeep = () => { st.dispose(); live = live.filter(x => x !== st); $('#sv').innerHTML = vizHTML({stage: true}) + disclaimer(); run(); };
  $('#smode').addEventListener('change', e => { mode = e.target.value; sessionStorage.setItem('mva-sim', mode); start(); });
  $$('[data-p]', el).forEach(r => r.addEventListener('input', () => {
    const k = r.dataset.p; P[k] = k === 'C' ? +r.value / 1000 : +r.value; outs();
    if (k === 'R' || k === 'C') st.apply({[k]: P[k]});
    else st.sim.effort.set(effort());
    if (k === 'eff' && ((P.eff > 0) !== (st.cfg.ch.includes('pmus')))) restartKeep();
  }));
  $('#sreset').addEventListener('click', () => { Object.assign(P, {R: 10, C: .05, eff: 0, effRate: 18}); $$('[data-p]', el).forEach(r => { r.value = r.dataset.p === 'C' ? 50 : P[r.dataset.p]; }); outs(); start(); });
  outs(); start();
};

/* ---------- Kaynaklar ---------- */
V.kaynaklar = (el, n) => {
  const types = [...new Set(C.sources.map(s => s.type))];
  el.innerHTML = `<header class="page-head wrap"><p class="eyebrow">${T('tab.src')}</p><h1>${T('src.page')}</h1><p class="lede">${T('src.lede')}</p></header>
  <section class="wrap doc-wrap"><article class="doc"><div class="seg" role="group">${['', ...types].map(t => `<button class="chip" data-t="${esc(t)}" aria-pressed="${!t}">${t ? esc(t) : T('mo.all')}</button>`).join('')}</div>
  <ol class="srcs full">${C.sources.map(s => `<li id="src-${s.id}" value="${s.id}" data-t="${esc(s.type)}"><span class="sn">[${s.id}]</span> <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>. <span class="muted">${esc(s.pub)}, ${s.year ?? T('src.noyear')}.</span><span class="stype">${esc(s.type)}</span><span class="acc"><b>${T('src.scope')}:</b> ${esc(s.scope)}</span></li>`).join('')}</ol></article></section>`;
  $$('.seg .chip', el).forEach(b => b.addEventListener('click', () => { $$('.seg .chip', el).forEach(x => x.setAttribute('aria-pressed', x === b)); $$('.srcs li', el).forEach(li => { li.hidden = b.dataset.t && li.dataset.t !== b.dataset.t; }); }));
  if (n) { const li = $('#src-' + n, el); if (li) { li.classList.add('hl'); setTimeout(() => li.scrollIntoView({block: 'center'}), 30); } }
};

V.sinav = (el) => QUIZ.page(el);

/* =====================================================================
   Yönlendirici
   ===================================================================== */
const TABS = ['ekran', 'temel', 'modlar', 'klinik', 'vakalar', 'simulator', 'sinav', 'kaynaklar'];
function route() {
  const h = location.hash.replace(/^#\/?/, ''), [a, b, c] = h.split('/').map(decodeURIComponent);
  /* sayfa içi çapa (#bolum-id) */
  if (h && !h.includes('/') && !TABS.includes(h) && !['mod'].includes(h) && document.getElementById(h)) return;
  cleanup();
  const el = $('#view');
  const tab = a === 'mod' ? 'modlar' : a || '';
  $$('.topnav a').forEach(x => x.toggleAttribute('aria-current', x.dataset.tab === tab));
  try {
    if (!a) V.home(el);
    else if (a === 'ekran') V.ekran(el, b, c);
    else if (a === 'temel') V.temel(el, b);
    else if (a === 'modlar') V.modlar(el);
    else if (a === 'mod') V.mod(el, b, c);
    else if (a === 'klinik') V.klinik(el, b, c);
    else if (a === 'vakalar') V.vakalar(el);
    else if (a === 'simulator') V.simulator(el);
    else if (a === 'sinav') V.sinav(el);
    else if (a === 'kaynaklar') V.kaynaklar(el, b);
    else V.home(el);
  } catch (e) { console.error(e); el.innerHTML = `<p class="wrap">${T('err')}</p>`; }
  /* katalogdan bir gruba dönüş */
  const og = sessionStorage.getItem('mva-open');
  if (a === 'modlar' && og) { sessionStorage.removeItem('mva-open'); const d = $(`details[data-g="${og}"]`); if (d) { d.open = true; } }
  if (a !== 'kaynaklar') window.scrollTo(0, 0);
  document.title = (a ? T('tab.' + (tab === 'simulator' ? 'sim' : tab === 'kaynaklar' ? 'src' : tab)) + ' · ' : '') + T('site.name');
}
/* İçerikteki iç çapalar (#bolum) rotayı bozmasın */
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-jump]'); if (!a) return;
  e.preventDefault(); const t = document.getElementById(a.dataset.jump); if (t) t.scrollIntoView({behavior: 'smooth', block: 'start'});
});
document.addEventListener('DOMContentLoaded', () => {
  MVA.applyStatic();
  PROG.mount();
  ABBR.watch($('#view'));
  addEventListener('hashchange', route); route();
});
