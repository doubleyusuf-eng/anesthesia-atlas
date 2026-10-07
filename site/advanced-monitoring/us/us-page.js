'use strict';
/* İleri Monitörizasyon Atlası · ultrason bölümü · sayfa
   Bölümler: modeller (DEV3D), mantık + görüntü laboratuvarı (USIM), görüntü ayarı, prob hareketleri (USLAB part),
   iğne teknikleri (USLAB ip/oop), güvenlik, kendini sına, kaynaklar. Metinler us-text.js'ten gelir. */
(() => {
  const X = window.US_TEXT, P = ICA.pick, main = $('#usMain');
  if (!X || !main) return;
  const TX = o => {   /* {tr,en,es} ağacından geçerli dildeki düz nesne */
    if (o && typeof o === 'object' && !Array.isArray(o) && 'tr' in o) return P(o);
    if (Array.isArray(o)) return o.map(TX);
    if (o && typeof o === 'object') { const r = {}; for (const k in o) r[k] = TX(o[k]); return r; }
    return o;
  };
  const refSet = new Set(X.refs.map(r => r.n));
  /* [n][m] → kaynakça bağlantıları */
  const inl = s => esc(s).replace(/(?:\[\d+\])+/g, m => { const ns = m.match(/\d+/g); return ns.every(n => refSet.has(+n)) ? `<sup class="cite">${ns.map(n => `<a href="#ref-${n}">${n}</a>`).join(', ')}</sup>` : m; });
  document.title = `${P(X.title)} · ${ICA.t('site.name')}`;
  const md = document.querySelector('meta[name=description]'); if (md) md.setAttribute('content', P(X.desc));
  const tools = `<div class="stage-tools">
      <button type="button" data-act="in" aria-label="${esc(ICA.t('stage.in'))}" title="${esc(ICA.t('stage.in'))}">+</button>
      <button type="button" data-act="out" aria-label="${esc(ICA.t('stage.out'))}" title="${esc(ICA.t('stage.out'))}">−</button>
      <button type="button" data-act="reset" aria-label="${esc(ICA.t('stage.reset'))}" title="${esc(ICA.t('stage.reset'))}">⟲</button>
    </div><span class="stage-hint">${esc(ICA.t('stage.hint'))}</span>`;
  const M = (typeof USM !== 'undefined' && USM) ? USM.MODELS : {};
  const ids = Object.keys(M);
  const qs = new URLSearchParams(location.search);
  /* 3B sahne kurulumu (common.js'teki mountStage hasta modelini gerektirir; bu sayfa yalnız K3 kullanır) */
  const mountStage = (stage, mount) => {
    const fail = () => { const d = document.createElement('div'); d.className = 'stage-fail'; d.textContent = ICA.t('stage.fail'); stage.appendChild(d); return null; };
    if (typeof K3 === 'undefined' || !K3) return fail();
    try { return mount(stage); } catch (e) { console.error(e); return fail(); }
  };

  /* ---------- Sayfa iskeleti ---------- */
  const S = X;
  const toc = Object.keys(S.toc).map(k => `<a href="#${k}">${esc(P(S.toc[k]))}</a>`).join('');
  const table = (head, rows, cls = '') => `<div class="ptable-wrap"><table class="ptable ${cls}"><thead><tr>${head.map(h => `<th>${inl(P(h))}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inl(P(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const steps = id => `<aside class="steps us-steps" aria-live="polite">
      <div class="us-screen"><p class="eyebrow">${esc(P(S.needle.screen))}</p><canvas id="${id}Screen" width="520" height="560" aria-hidden="true"></canvas></div>
      <p class="eyebrow" id="${id}No"></p><h3 id="${id}Title"></h3><p class="us-steptext" id="${id}Text"></p>
      <div class="dots" id="${id}Dots"></div>
      <div class="nav-btns"><button type="button" class="btn" id="${id}Prev"></button><button type="button" class="btn primary" id="${id}Next"></button></div>
      <p class="proto">${esc(P(S.needle.proto))}</p>
    </aside>`;

  main.innerHTML = `
  <section class="hero us-hero"><div class="wrap">
    <p class="eyebrow">${esc(P(S.hero.eyebrow))}</p>
    <h1>${esc(P(S.hero.h))}</h1>
    <p class="lede">${esc(P(S.hero.lede))}</p>
    <ul class="facts">${S.hero.facts.map(([a, b]) => `<li><b>${esc(P(a))}</b> ${esc(P(b))}</li>`).join('')}</ul>
    <p><a class="btn primary us-cta" href="#igne">${esc(P(S.hero.cta))}</a></p>
  </div></section>
  <nav class="toc" aria-label="${esc(ICA.t('dev.toc'))}"><div class="wrap">${toc}</div></nav>

  <section class="sec" id="modeller"><div class="wrap">
    <h2>${esc(P(S.models.h))}</h2>
    <p class="lede us-lede">${inl(P(S.models.lede))}</p>
    <div class="chips" id="usChips" role="group" aria-label="${esc(P(S.models.h))}">${ids.map(id => `<button type="button" data-id="${id}" aria-pressed="false">${esc(M[id].name)}</button>`).join('')}<button type="button" data-id="vygoplex-ens-echo" aria-pressed="false" class="chip-needle">${esc(P(S.models.needleChip))}</button><button type="button" data-id="plexygon" aria-pressed="false" class="chip-needle">${esc(P(S.models.plxChip))}</button></div>
    <div class="workbench">
      <div id="modelHost"></div>
      <aside class="steps parts-panel" aria-live="polite">
        <div id="modelInfo"></div>
        <p class="eyebrow">${esc(P(S.models.parts))}</p>
        <div class="part-list" id="partList"></div>
        <div class="part-info" id="partInfo"><p class="muted">${esc(P(S.models.partHint))}</p></div>
        <p class="proto">${esc(P(S.models.modelNote))}</p>
      </aside>
    </div>
    <div class="us-grid2">
      <div class="us-card"><h3>${esc(P(S.models.common.h))}</h3><ul>${S.models.common.items.map(i => `<li>${inl(P(i))}</li>`).join('')}</ul></div>
      <div class="us-card"><h3>${esc(P(S.models.table))}</h3><div id="cmpTable"></div></div>
    </div>
    <p class="muted us-scope">${inl(P(S.models.scope))}</p>
  </div></section>

  <section class="sec" id="uygulama"><div class="wrap">
    <h2>${esc(P(S.app.h))}</h2>
    <p class="lede us-lede">${inl(P(S.app.lede))}</p>
    <div class="us-appgrid">
      <div class="us-tabletwrap" id="tabletWrap">
        <div class="us-tablet"><canvas id="appCanvas" width="1200" height="800" aria-label="${esc(P(S.app.h))}"></canvas></div>
        <button type="button" class="btn us-full" id="appFull" hidden>⤢ <span>${esc(P(S.app.full))}</span></button>
      </div>
      <aside class="us-ctl us-appside" id="appSide">
        <p class="eyebrow">${esc(P(S.app.simH))}</p>
        <div class="us-row"><span>${esc(P(S.app.view))}</span><div class="us-seg" role="group" data-k="view"><button type="button" data-v="short" aria-pressed="true">${esc(P(S.app.short))}</button><button type="button" data-v="long" aria-pressed="false">${esc(P(S.app.long))}</button></div></div>
        <label class="us-sl"><span>${esc(P(S.app.angle))}</span><input type="range" data-k="angle" min="-45" max="45" step="1" value="15"><output data-o="angle">15</output><em>°</em></label>
        <label class="us-sl"><span>${esc(P(S.app.press))}</span><input type="range" data-k="press" min="0" max="100" step="5" value="0"><output data-o="press">0</output><em>%</em></label>
        <label class="check"><input type="checkbox" data-k="needle"><span>${esc(P(S.app.needle))}</span></label>
        <label class="us-sl"><span>${esc(P(S.app.adv))}</span><input type="range" data-k="adv" min="5" max="100" step="1" value="70" disabled><output data-o="adv">70</output><em>%</em></label>
        <div class="us-modeinfo" id="appMode" aria-live="polite"></div>
      </aside>
    </div>
    <p class="proto">${esc(P(S.app.note))}</p>
  </div></section>

  <section class="sec" id="mantik"><div class="wrap">
    <h2>${esc(P(S.physics.h))}</h2>
    <p class="lede us-lede">${inl(P(S.physics.lede))}</p>
    <div class="us-cards">${S.physics.cards.map(c => `<article class="us-card"><h3>${esc(P(c.h))}</h3><p>${inl(P(c.p))}</p></article>`).join('')}</div>
    <h3 class="sub">${esc(P(S.physics.sim.h))}</h3>
    <p class="us-lede">${inl(P(S.physics.sim.p))}</p>
    <div class="us-simlab">
      <div class="us-screen big"><canvas id="simCanvas" width="640" height="600" aria-label="${esc(P(S.physics.sim.h))}"></canvas><p class="us-read mono" id="simRead"></p></div>
      <div class="us-ctl" id="simCtl"></div>
    </div>
    <ul class="us-tries">${S.physics.sim.tries.map(t => `<li>${inl(P(t))}</li>`).join('')}</ul>
    <p class="proto">${esc(P(S.physics.sim.note))}</p>
    <div class="us-grid2">
      <div class="us-card"><h3>${esc(P(S.physics.tissues.h))}</h3>${table(S.physics.tissues.head, S.physics.tissues.rows)}</div>
      <div class="us-card"><h3>${esc(P(S.physics.probes.h))}</h3><p>${inl(P(S.physics.probes.p))}</p><div class="us-shapes" id="probeShapes"></div></div>
    </div>
  </div></section>

  <section class="sec" id="ayar"><div class="wrap">
    <h2>${esc(P(S.knobs.h))}</h2>
    <p class="lede us-lede">${inl(P(S.knobs.lede))}</p>
    <dl class="us-knobs">${S.knobs.items.map(([k, v]) => `<div><dt>${esc(P(k))}</dt><dd>${inl(P(v))}</dd></div>`).join('')}</dl>
    <div class="us-card us-ergo"><h3>${esc(P(S.knobs.ergo.h))}</h3><p>${inl(P(S.knobs.ergo.p))}</p></div>
  </div></section>

  <section class="sec" id="tarama"><div class="wrap">
    <h2>${esc(P(S.scan.h))}</h2>
    <p class="lede us-lede">${inl(P(S.scan.lede))}</p>
    <div class="workbench us-lab"><div class="stage stage-lab" id="partStage"><div class="pins"></div>${tools}</div>${steps('part')}</div>
    <p class="muted us-scope">${inl(P(S.scan.axes))}</p>
  </div></section>

  <section class="sec" id="igne"><div class="wrap">
    <h2>${esc(P(S.needle.h))}</h2>
    <p class="lede us-lede">${inl(P(S.needle.lede))}</p>
    <div class="chips us-tabs" id="needleTabs" role="tablist"><button type="button" role="tab" data-k="ip" aria-selected="true">${esc(P(S.needle.tabs.ip))}</button><button type="button" role="tab" data-k="oop" aria-selected="false">${esc(P(S.needle.tabs.oop))}</button></div>
    <div class="workbench us-lab"><div class="stage stage-lab" id="needleStage"><div class="pins"></div>${tools}</div>${steps('needle')}</div>
    <div class="us-grid2">
      <div class="us-card">${table(S.needle.cmp.head, S.needle.cmp.rows, 'us-cmp')}</div>
      <div class="us-card"><h3>${esc(P(S.needle.tips.h))}</h3><ul>${S.needle.tips.items.map(i => `<li>${inl(P(i))}</li>`).join('')}</ul></div>
    </div>
  </div></section>

  <section class="sec" id="stim"><div class="wrap">
    <h2>${esc(P(S.stim.h))}</h2>
    <p class="lede us-lede">${inl(P(S.stim.lede))}</p>
    <div class="us-cards">${S.stim.cards.map(c => `<article class="us-card"><h3>${esc(P(c.h))}</h3><p>${inl(P(c.p))}</p></article>`).join('')}</div>
    <h3 class="sub">${esc(P(S.stim.panel.h))}</h3>
    <p class="us-lede">${inl(P(S.stim.panel.p))}</p>
    <div class="us-plx">
      <div class="plx-dev"><div class="plx-lcd" id="plxLcd" aria-live="polite"></div><p class="plx-brand">PLEXYGON <span>Nerve Stimulator</span></p></div>
      <div class="us-ctl" id="plxCtl"></div>
    </div>
    <p class="proto">${esc(P(S.stim.panel.note))}</p>
  </div></section>

  <section class="sec" id="guvenlik"><div class="wrap">
    <h2>${esc(P(S.safety.h))}</h2>
    <div class="us-cards">${S.safety.cards.map(c => `<article class="us-card"><h3>${esc(P(c.h))}</h3><p>${inl(P(c.p))}</p></article>`).join('')}</div>
    <h3 class="sub">${esc(P(S.safety.links))}</h3>
    <div class="grid" id="usRelated"></div>
  </div></section>

  <section class="sec" id="sinav"><div class="wrap">
    <h2>${esc(P(S.quiz.h))}</h2>
    <div id="usQuiz"></div>
  </div></section>

  <section class="sec" id="kaynaklar"><div class="wrap">
    <h2>${esc(P(S.refsH))}</h2>
    <ol class="refs">${S.refs.map(r => `<li id="ref-${r.n}" value="${r.n}">${esc(r.t)}. <span class="muted">${esc(r.p)}</span>, ${esc(r.y)}.${r.doi ? ` <a href="https://doi.org/${esc(r.doi)}" rel="noopener">doi:${esc(r.doi)}</a>` : ` <a href="${esc(r.url)}" rel="noopener">${esc(new URL(r.url).hostname.replace(/^www\./, ''))}</a>`}</li>`).join('')}</ol>
    <p class="muted us-scope">${esc(P(S.refNote))}</p>
  </div></section>`;

  /* ---------- Modeller ---------- */
  const fmt = n => String(n).replace('.', ICA.lang === 'en' ? '.' : ',');
  let modelView = null;
  /* Clarius uygulaması benzetimi: tek durum, 3B tablet ve büyük ekran birlikte kullanır */
  const APP = (typeof USAPP !== 'undefined' && USAPP) ? USAPP.get() : null;
  if (APP) { APP.setText(TX(S.app.ui)); APP.onProbe = id => showModel(id); }
  function showModel(id) {
    if (!DEV3D || !DEV3D.has(id)) return;
    if (APP && M[id] && APP.state.probe !== id) APP.setProbe(id);
    $$('#usChips button').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === id));
    /* Önceki görüntüleyiciyi kaldır (WebGL bağlamı serbest kalsın) */
    if (modelView) { const i = K3.viewers.indexOf(modelView); if (i >= 0) K3.viewers.splice(i, 1); try { modelView.renderer.dispose(); modelView.renderer.forceContextLoss(); } catch (_) {} modelView = null; }
    const host = $('#modelHost'); host.innerHTML = `<div class="stage" id="modelStage"><div class="pins"></div>${tools}</div>`;
    const list = $('#partList'), info = $('#partInfo');
    const show = (key, i) => {
      $$('#partList button').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
      info.innerHTML = key ? `<h3>${i + 1}. ${esc(DEV3D.part(key, 0))}</h3><p>${inl(DEV3D.part(key, 1))}</p>` : `<p class="muted">${esc(P(S.models.partHint))}</p>`;
    };
    const ctl = mountStage($('#modelStage'), el => DEV3D.mount(el, id, show));
    if (ctl) {
      modelView = ctl.view;
      list.innerHTML = ctl.parts.map((p, i) => `<button type="button" data-i="${i}" aria-pressed="false"><b>${i + 1}</b> ${esc(DEV3D.part(p.key, 0))}</button>`).join('');
      list.onclick = e => { const b = e.target.closest('button[data-i]'); if (b) ctl.select(+b.dataset.i); };
    }
    show(null);
    /* Bilgi kartı */
    const K = S.models.k;
    if (id === 'vygoplex-ens-echo' || id === 'plexygon') {
      const N = id === 'plexygon' ? S.models.plx : S.models.needle;
      $('#modelInfo').innerHTML = `<p class="eyebrow">Vygon</p><h3>${esc(P(N.h))}</h3><p class="small">${inl(P(N.p))}</p>
        <dl class="us-spec">${N.rows.map(([k, v]) => `<div><dt>${esc(P(k))}</dt><dd>${esc(P(v))}</dd></div>`).join('')}</dl><p class="muted small">${inl(P(N.note))}</p>
        <p class="small"><a href="#stim">${esc(P(S.stim.h))} →</a></p>`;
    } else {
      const m = M[id], f = m.kind === 'dual' ? 'f' : 'f';
      const feats = [m.ne && S.models.feat.ne, m.sc && S.models.feat.sc, m.hi && S.models.feat.hi].filter(Boolean).map(P);
      $('#modelInfo').innerHTML = `<p class="eyebrow">Clarius · ${esc(P(S.models.types[m.kind]))}</p><h3>${esc(m.name)}</h3>
        <dl class="us-spec">
          <div><dt>${esc(P(K.freq))}</dt><dd>${m[f][0]}–${m[f][1]} MHz</dd></div>
          <div><dt>${esc(P(K.depth))}</dt><dd>${m.dmax} cm</dd></div>
          <div><dt>${esc(P(K.fov))}</dt><dd>${esc(m.fovTxt)}</dd></div>
          <div><dt>${esc(P(K.el))}</dt><dd>${m.el}${m.R ? ` · ${esc(P(K.rad))} ${m.R} mm` : ''}</dd></div>
          <div><dt>${esc(P(K.dims))}</dt><dd>${m.dims} mm · ${m.g} g</dd></div>
        </dl>
        <p class="small"><b>${esc(P(K.apps))}:</b> ${esc(P(S.models.apps[id]))} <sup class="cite"><a href="#ref-1">1</a></sup></p>
        ${feats.length ? `<p class="small"><b>${esc(P(K.feat))}:</b> ${esc(feats.join(' · '))} <sup class="cite"><a href="#ref-1">1</a></sup></p>` : ''}
        <p class="small us-use"><b>${esc(P(K.use))}:</b> ${inl(P(S.models.use[id]))}</p>`;
    }
    if (history.replaceState) { const u = new URL(location.href); u.searchParams.set('model', id); history.replaceState(null, '', u.pathname + u.search + location.hash); }
  }
  $('#usChips').addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) showModel(b.dataset.id); });
  /* Karşılaştırma tablosu */
  $('#cmpTable').innerHTML = `<div class="ptable-wrap"><table class="ptable us-tbl"><thead><tr><th></th><th>${esc(P(S.models.k.type))}</th><th>MHz</th><th>${esc(P(S.models.k.depth))}</th><th>${esc(P(S.models.k.fov))}</th><th>g</th></tr></thead><tbody>${ids.map(id => { const m = M[id]; return `<tr><td><button type="button" class="linkbtn" data-id="${id}">${esc(m.name)}</button></td><td>${esc(P(S.models.types[m.kind]))}</td><td>${m.f[0]}–${m.f[1]}</td><td>${m.dmax} cm</td><td>${esc(m.fovTxt)}</td><td>${m.g}</td></tr>`; }).join('')}</tbody></table></div>`;
  $('#cmpTable').addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) { showModel(b.dataset.id); $('#modeller').scrollIntoView({behavior: REDUCED_MOTION ? 'auto' : 'smooth'}); } });

  /* ---------- Canvas boyutu (cihaz piksel oranıyla) ---------- */
  function fitCanvas(c, onChange) {
    const fit = () => { const r = c.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1); const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr); if (w > 10 && h > 10 && (w !== c.width || h !== c.height)) { c.width = w; c.height = h; onChange && onChange(); } };
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(c); else addEventListener('resize', fit);
    fit();
  }
  const visible = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.bottom > -60 && r.top < innerHeight + 60; };

  /* ---------- Görüntü laboratuvarı ---------- */
  (function simLab() {
    if (typeof USIM === 'undefined' || !USM) return;
    const T = S.physics.sim, cv = $('#simCanvas'), ctl = $('#simCtl');
    const geoms = ids.map(id => [id, M[id].name]).concat([['clarius-pal-la', 'PAL HD3 · LA']]);
    const st = {id: 'clarius-l7', freq: 10, depth: 40, gain: 0, tgc: [0, 0, 0], tilt: 0, press: 0, doppler: false, labels: true};
    const specOf = id => id === 'clarius-pal-la' ? {f: [5, 15], dmax: 7, name: 'PAL HD3 · LA', f0: 10} : M[id];
    const scan = USIM.Scanner(cv, {geom: USM.GEOM[st.id], depth: st.depth, freq: st.freq, gain: 0, tgc: st.tgc, labels: true, head: {model: 'L7 HD3', preset: 'Nerve'}});
    fitCanvas(cv, () => scan.invalidate());
    const row = (k, lab, min, max, step, val, unit) => `<label class="us-sl"><span>${esc(lab)}</span><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${val}"><output data-o="${k}"></output>${unit ? `<em>${unit}</em>` : ''}</label>`;
    function draw() {
      const m = specOf(st.id), dmax = Math.min(m.dmax * 10, 120);
      ctl.innerHTML = `<label class="us-sl us-sel"><span>${esc(P(T.probe))}</span><select data-k="id">${geoms.map(([id, n]) => `<option value="${id}"${id === st.id ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
        ${row('freq', P(T.freq), m.f[0], m.f[1], .5, st.freq, 'MHz')}
        ${row('depth', P(T.depth), 10, dmax, 5, st.depth, 'mm')}
        ${row('gain', P(T.gain), -15, 15, 1, st.gain, 'dB')}
        <fieldset class="us-tgc"><legend>${esc(P(T.tgc))}</legend>${[0, 1, 2].map(i => `<input type="range" data-k="tgc${i}" min="-15" max="15" step="1" value="${st.tgc[i]}" aria-label="TGC ${i + 1}">`).join('')}</fieldset>
        ${row('tilt', P(T.tilt), -30, 30, 1, st.tilt, '°')}
        ${row('press', P(T.press), 0, 100, 5, Math.round(st.press * 100), '%')}
        <div class="us-checks"><label class="check"><input type="checkbox" data-k="doppler"${st.doppler ? ' checked' : ''}><span>${esc(P(T.doppler))}</span></label><label class="check"><input type="checkbox" data-k="labels"${st.labels ? ' checked' : ''}><span>${esc(P(T.labels))}</span></label></div>
        <div class="us-btns"><button type="button" class="btn" data-a="freeze">${esc(P(T.freeze))}</button><button type="button" class="btn" data-a="reset">${esc(P(T.reset))}</button></div>`;
      sync();
    }
    function sync() {
      const m = specOf(st.id);
      st.freq = clamp(st.freq, m.f[0], m.f[1]); st.depth = clamp(st.depth, 10, Math.min(m.dmax * 10, 120));
      Object.assign(scan.o, {geom: USM.GEOM[st.id], depth: st.depth, freq: st.freq, gain: st.gain, tgc: st.tgc.slice(), doppler: st.doppler, labels: st.labels, head: {model: m.name, preset: USM.GEOM[st.id].type === 'linear' ? 'Nerve' : 'Abdomen'}});
      scan.invalidate();
      $$('output[data-o]', ctl).forEach(o => { const k = o.dataset.o; o.textContent = k === 'press' ? Math.round(st.press * 100) : fmt(st[k]); });
      const lam = (USIM.C / st.freq).toFixed(2), t = Math.round(2 * st.depth / USIM.C);
      $('#simRead').textContent = ICA.fill(P(T.read), {l: fmt(lam), d: fmt((st.depth / 10).toFixed(1)), t});
    }
    ctl.addEventListener('input', e => {
      const k = e.target.dataset.k; if (!k) return;
      if (k === 'id') { st.id = e.target.value; st.freq = specOf(st.id).f0 || specOf(st.id).f[0]; st.depth = Math.min(USM.GEOM[st.id].type === 'linear' ? 40 : 90, specOf(st.id).dmax * 10); draw(); return; }
      if (k.startsWith('tgc')) st.tgc[+k.slice(3)] = +e.target.value;
      else if (k === 'doppler' || k === 'labels') st[k] = e.target.checked;
      else if (k === 'press') st.press = +e.target.value / 100;
      else st[k] = +e.target.value;
      sync();
    });
    ctl.addEventListener('click', e => {
      const a = (e.target.closest('button[data-a]') || {}).dataset?.a; if (!a) return;
      if (a === 'freeze') { scan.frozen = !scan.frozen; e.target.classList.toggle('primary', scan.frozen); }
      else { Object.assign(st, {freq: specOf(st.id).f0 || st.freq, depth: Math.min(USM.GEOM[st.id].type === 'linear' ? 40 : 90, specOf(st.id).dmax * 10), gain: 0, tgc: [0, 0, 0], tilt: 0, press: 0, doppler: false, labels: true}); scan.frozen = false; draw(); }
    });
    draw();
    const IMG = TX(S.img);
    (function loop(now) {
      if (visible(cv)) {
        const t = now / 1000;
        const sim = {pose: USIM.pose(0, 0, 0, st.tilt * Math.PI / 180, st.press), press: st.press, pulse: Math.max(0, Math.sin(t * 7.5)) ** 2, needles: [], labels: toImage => USIM.anatomyLabels(IMG, toImage, 0)};
        scan.render(sim, t);
      }
      requestAnimationFrame(loop);
    })(performance.now());
  })();

  /* ---------- Uygulama: büyük tablet ekranı ve benzetim denetimleri ---------- */
  (function appPanel() {
    const cv = $('#appCanvas'), side = $('#appSide');
    if (!APP) { $('#uygulama').hidden = true; return; }
    const g = cv.getContext('2d'), sim = APP.sim;
    fitCanvas(cv);
    const toApp = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * APP.W, (e.clientY - r.top) / r.height * APP.H]; };
    let pid = null;
    cv.addEventListener('pointerdown', e => { const [x, y] = toApp(e); if (APP.pointer('down', x, y)) { pid = e.pointerId; try { cv.setPointerCapture(e.pointerId); } catch (_) {} e.preventDefault(); } });
    cv.addEventListener('pointermove', e => { const [x, y] = toApp(e); if (pid === e.pointerId) APP.pointer('move', x, y); else if (e.pointerType === 'mouse') cv.style.cursor = APP.hover(x, y) ? 'pointer' : ''; });
    const up = e => { if (pid === e.pointerId) { APP.pointer('up', 0, 0); pid = null; } };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    /* Benzetim denetimleri */
    const out = k => side.querySelector(`output[data-o="${k}"]`);
    side.addEventListener('input', e => {
      const k = e.target.dataset.k; if (!k) return;
      if (k === 'angle') { sim.angle = +e.target.value; out(k).textContent = sim.angle; }
      else if (k === 'press') { sim.press = +e.target.value / 100; out(k).textContent = e.target.value; }
      else if (k === 'adv') { sim.adv = +e.target.value / 100; out(k).textContent = e.target.value; }
      else if (k === 'needle') { sim.needle = e.target.checked; side.querySelector('input[data-k="adv"]').disabled = !sim.needle || sim.view !== 'short'; }
    });
    side.addEventListener('click', e => {
      const b = e.target.closest('.us-seg button'); if (!b) return;
      sim.view = b.dataset.v; $$('.us-seg[data-k="view"] button', side).forEach(x => x.setAttribute('aria-pressed', x === b));
      side.querySelector('input[data-k="adv"]').disabled = !sim.needle || sim.view !== 'short';
      side.querySelector('input[data-k="press"]').closest('label').classList.toggle('dim', sim.view !== 'short');
    });
    /* Seçili modun açıklaması */
    const MI = TX(S.app.modes); let mkey = '';
    function modeInfo() {
      const st = APP.state, k = st.ne ? 'ne' : st.split ? 'split' : st.mode, key = k + st.probe;
      if (key === mkey) return; mkey = key;
      const [h, p] = MI[k] || MI.B;
      $('#appMode').innerHTML = `<p class="eyebrow">${esc(P(S.app.tryH))}</p><h3>${esc(h)}</h3><p>${esc(p)}</p>`;
    }
    /* Tam ekran (destekleyen tarayıcılarda); yatay yöne kilitlemeyi dener */
    const wrap = $('#tabletWrap'), fb = $('#appFull');
    if (document.fullscreenEnabled && wrap.requestFullscreen) {
      fb.hidden = false;
      fb.addEventListener('click', () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else wrap.requestFullscreen().then(() => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (_) {} }).catch(() => {});
      });
      document.addEventListener('fullscreenchange', () => { fb.querySelector('span').textContent = P(document.fullscreenElement ? S.app.exitFull : S.app.full); });
    }
    (function loop(now) {
      if (visible(cv)) { APP.render(now / 1000); g.drawImage(APP.canvas, 0, 0, cv.width, cv.height); modeInfo(); }
      requestAnimationFrame(loop);
    })(performance.now());
  })();

  /* Prob biçimleri: lineer, konveks, fazlı dizi (SVG) */
  $('#probeShapes').innerHTML = [['linear', 'L7 HD3'], ['convex', 'C3 HD3'], ['phased', 'PA HD3']].map(([k, n]) => {
    const path = k === 'linear' ? 'M30 14h60v86H30z' : k === 'convex' ? 'M38 14 Q60 6 82 14 L112 100 Q60 116 8 100z' : 'M56 10h8L112 92 Q60 116 8 92z';
    return `<figure><svg viewBox="0 0 120 120" aria-hidden="true"><path d="${path}" fill="#0B1215" stroke="var(--accent)" stroke-width="1.5"/><path d="${k === 'linear' ? 'M30 14h60' : k === 'convex' ? 'M38 14 Q60 6 82 14' : 'M56 10h8'}" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" fill="none"/></svg><figcaption>${esc(P(S.models.types[k]))}<br><span class="muted">${n}</span></figcaption></figure>`;
  }).join('');

  /* ---------- Adım denetimi (laboratuvar sahneleri) ---------- */
  function stepper(id, lab, getTrack, texts) {
    let i = 0;
    const n = () => lab.count(getTrack());
    const dots = () => { $(`#${id}Dots`).innerHTML = Array.from({length: n()}, (_, k) => `<button type="button" data-k="${k}" aria-label="${esc(ICA.fill(P(S.step), {i: k + 1, n: n()}))}">${k + 1}</button>`).join(''); };
    function show(k) {
      const N = n(); i = clamp(k, 0, N - 1); lab.go(getTrack(), i);
      const tx = texts()[i];
      $(`#${id}No`).textContent = ICA.fill(P(S.step), {i: i + 1, n: N});
      $(`#${id}Title`).textContent = P(tx[0]); $(`#${id}Text`).innerHTML = inl(P(tx[1]));
      $$(`#${id}Dots button`).forEach((b, q) => { if (q === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); b.classList.toggle('done', q < i); });
      $(`#${id}Prev`).disabled = i === 0; $(`#${id}Prev`).textContent = P(S.prev);
      $(`#${id}Next`).textContent = i === N - 1 ? P(S.again) : P(S.next);
    }
    $(`#${id}Prev`).addEventListener('click', () => show(i - 1));
    $(`#${id}Next`).addEventListener('click', () => show(i === n() - 1 ? 0 : i + 1));
    $(`#${id}Dots`).addEventListener('click', e => { const b = e.target.closest('button[data-k]'); if (b) show(+b.dataset.k); });
    dots(); show(0);
    return {reset() { dots(); show(0); }, show};
  }
  const TAGS = TX(S.tag), IMGT = TX(S.img);
  const mountLab = (stageId, screenId) => {
    const c = $('#' + screenId);
    return mountStage($('#' + stageId), el => { const lab = USLAB.mount(el, c, {tag: TAGS, img: IMGT}); fitCanvas(c, () => lab.scan.invalidate()); return lab; });
  };
  if (typeof USLAB !== 'undefined' && USLAB) {
    const partLab = mountLab('partStage', 'partScreen');
    if (partLab) stepper('part', partLab, () => 'part', () => S.scan.steps);
    const nLab = mountLab('needleStage', 'needleScreen');
    if (nLab) {
      let track = qs.get('teknik') === 'oop' ? 'oop' : 'ip';
      const sp = stepper('needle', nLab, () => track, () => S.needle[track]);
      const setTab = k => { track = k; $$('#needleTabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.k === k)); sp.reset(); };
      $('#needleTabs').addEventListener('click', e => { const b = e.target.closest('button[data-k]'); if (b && b.dataset.k !== track) setTab(b.dataset.k); });
      if (track === 'oop') setTab('oop');
    }
  } else {
    ['partStage', 'needleStage'].forEach(s => mountStage($('#' + s), () => { throw new Error('3B yok'); }));
  }

  /* ---------- Plexygon paneli: USM.plx ortak durumunu değiştirir (3B LCD aynı durumu çizer) ---------- */
  (function plxPanel() {
    if (!USM) return;
    const X2 = S.stim.panel, st = USM.plx, ctl = $('#plxCtl'), lcd = $('#plxLcd');
    /* Akım adımları: 0,5 mA altında 0,02 mA (üretici), üstünde 0,1 mA */
    const steps = () => { const a = []; for (let v = 0; v < .5 - 1e-9; v += .02) a.push(+v.toFixed(2)); for (let v = .5; v <= USM.PLX_MAX[st.pw] + 1e-9; v += .1) a.push(+v.toFixed(1)); return a; };
    const seg = (k, opts, cur) => `<div class="us-seg" role="group" data-k="${k}">${opts.map(o => `<button type="button" data-v="${o}" aria-pressed="${String(o) === String(cur)}">${o}</button>`).join('')}</div>`;
    function draw() {
      const S2 = steps(), idx = Math.max(0, S2.findIndex(v => v >= st.mA - 1e-9));
      ctl.innerHTML = `<label class="us-sl"><span>${esc(P(X2.cur))}</span><input type="range" data-k="cur" min="0" max="${S2.length - 1}" step="1" value="${idx}"><output>${fmt(st.mA < .5 ? st.mA.toFixed(2) : st.mA.toFixed(1))}</output><em>mA</em></label>
        <div class="us-row"><span>${esc(P(X2.pw))}</span>${seg('pw', [300, 100, 50], st.pw)}<em>µs</em></div>
        <div class="us-row"><span>${esc(P(X2.hz))}</span>${seg('hz', [1, 2, 4], st.hz)}<em>Hz</em></div>
        <div class="us-row"><span>${esc(P(X2.unit))}</span>${seg('unit', ['mA', 'nC'], st.unit)}</div>
        <div class="us-btns"><button type="button" class="btn plx-safety" data-a="safety">${esc(P(X2.safety))}</button><button type="button" class="btn plx-on" data-a="power" aria-pressed="${st.on}">${esc(P(X2.power))}</button></div>
        <p class="us-read2 mono">${esc(ICA.fill(P(X2.charge), {i: fmt(st.mA.toFixed(2)), pw: st.pw, q: Math.round(st.mA * st.pw), max: USM.PLX_MAX[st.pw]}))}</p>
        <button type="button" class="linkbtn" data-a="show">${esc(P(X2.show3d))} →</button>`;
      paint();
    }
    function paint() {
      lcd.classList.toggle('off', !st.on);
      lcd.innerHTML = st.on ? `<span class="u">${st.unit}</span><b>${USM.plxVal()}</b><span class="pw">µsec<br>${st.pw}</span><span class="hz">Hz<br>${st.hz}</span><i class="pulse" style="animation-duration:${(1 / st.hz).toFixed(2)}s"></i>` : '';
    }
    ctl.addEventListener('input', e => { if (e.target.dataset.k === 'cur') { st.mA = steps()[+e.target.value] || 0; draw(); } });
    ctl.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const g = b.closest('.us-seg');
      if (g) { const k = g.dataset.k, v = b.dataset.v; st[k] = k === 'unit' ? v : +v; if (k === 'pw') st.mA = Math.min(st.mA, USM.PLX_MAX[st.pw]); draw(); return; }
      const a = b.dataset.a;
      if (a === 'safety') { st.mA = 0; draw(); }
      else if (a === 'power') { st.on = !st.on; draw(); }
      else if (a === 'show') { showModel('vygoplex-ens-echo'); $('#modeller').scrollIntoView({behavior: REDUCED_MOTION ? 'auto' : 'smooth'}); }
    });
    draw();
  })();

  /* ---------- İlgili kayıtlar ---------- */
  $('#usRelated').innerHTML = ['ultrasound', 'nerve-stimulator', 'injection-pressure-monitor', 'tte', 'tee'].map(id => DB.byId.get(id)).filter(Boolean).map(cardHTML).join('');

  /* ---------- Kendini sına ---------- */
  (function quiz() {
    const Q = S.quiz, host = $('#usQuiz'), res = [];
    const shuffle = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
    function draw() {
      res.length = 0;
      host.innerHTML = `<p class="us-score muted" id="usScore"></p>` + Q.qs.map((x, qi) => {
        const order = shuffle([0, 1, 2, 3]);
        return `<div class="qcard" data-q="${qi}"><p class="eyebrow">${qi + 1} / ${Q.qs.length}</p><p class="qstem">${esc(P(x.q))}</p>
          <div class="qopts" role="group">${order.map((k, i) => `<button type="button" data-k="${k}"><span class="ql">${'ABCD'[i]}</span><span>${esc(P(x.o[k]))}</span></button>`).join('')}</div>
          <div class="qfeed" aria-live="polite" hidden></div></div>`;
      }).join('') + `<p class="qmore"><button type="button" class="btn" id="usAgain">${esc(P(Q.again))}</button></p>`;
      $('#usAgain').addEventListener('click', draw);
      score();
    }
    const score = () => { $('#usScore').textContent = ICA.fill(P(Q.score), {n: Q.qs.length, k: res.filter(Boolean).length}); };
    host.addEventListener('click', e => {
      const b = e.target.closest('.qopts button'); if (!b || b.disabled) return;
      const card = b.closest('.qcard'), qi = +card.dataset.q, x = Q.qs[qi], k = +b.dataset.k, ok = k === x.a;
      card.querySelectorAll('.qopts button').forEach(o => { o.disabled = true; const kk = +o.dataset.k; if (kk === x.a) o.classList.add('right'); else if (o === b) o.classList.add('wrong'); });
      const f = card.querySelector('.qfeed'); f.hidden = false; f.className = 'qfeed ' + (ok ? 'ok' : 'no');
      f.innerHTML = `<p class="qverdict">${esc(P(ok ? Q.right : Q.wrong))}</p><p>${inl(P(x.ex))}</p>`;
      res[qi] = ok; score();
    });
    draw();
  })();

  /* ---------- Başlangıç ---------- */
  const m0 = qs.get('model');
  showModel(m0 && (DEV3D && DEV3D.has(m0)) ? m0 : 'clarius-l7');
  /* İçindekiler vurgusu */
  const links = new Map($$('.toc a').map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(a => a.classList.remove('active')); links.get(e.target.id)?.classList.add('active'); } }), {rootMargin: '-45% 0px -50% 0px'});
  $$('.sec').forEach(s => io.observe(s));
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) requestAnimationFrame(() => t.scrollIntoView()); }
})();
