'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · görünüm (vl-model-0.1)
   Rotalar: #/laboratuvar[/<VLxx>] mekanik laboratuvar · #/laboratuvar/mod/<kart> mod kartından serbest deney ·
   #/laboratuvar/gaz[/VL15|VL16] kararlı durum gaz deneyleri · #/laboratuvar/model model ve doğrulama.
   Akış: öğren → tahmin et → ayarı değiştir → eğriyi gör → nedenini açıkla. Ayarlar "Uygula" ile tek paket olarak gider;
   uygulanmayı bekleyen paket görünür. Monitör yalnız ölçülebilir değerleri gösterir; modelin bildiği C, R, x, Palv ve M
   "Modelin içi" panelindedir. Tahmin sorusunun yanıtı motorun soluk kayıtlarından okunur. */
const VLAB_VIEW = (() => {
  const T = k => MVA.t(k), F = (k, v) => MVA.fill(T(k), v), n = (v, d = 0) => MVA.num(v, d);
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const CT = VLAB_CTRL, ME = VLAB_MEAS, SC = VLAB_SC, GAS = VLAB_GAS, DR = VLAB_DRAW, TE = VLAB_TEACH;
  const clone = o => JSON.parse(JSON.stringify(o));
  const CARD2MODE = {'vc-cmv': 'VC-AC', 'pc-cmv': 'PC-AC', 'psv': 'PSV', 'cpap': 'CPAP'};
  const MODE2CARD = {'VC-AC': 'vc-cmv', 'PC-AC': 'pc-cmv', 'PSV': 'psv', 'CPAP': 'cpap'};
  /* Paket kaynak numarası → atlas kaynak numarası (DOI/URL ile eşlendi) */
  const SRC = [[1, 4], [2, 3], [3, 81], [4, 82], [5, 83], [6, 84], [7, 85], [8, 86], [9, 87], [10, 88], [11, 89], [12, 90], [13, 47], [14, 8], [15, 91]];
  let lastMech = null;   // gaz deneyine aktarım için son mekanik durum

  /* ---------- Alan tanımları (ekran birimi = motor birimi × k) ---------- */
  const FD = {
    PEEP: {u: 'cmH₂O', d: 1}, Pmax: {u: 'cmH₂O', d: 0}, VTset: {u: 'mL', k: 1000, d: 0}, Qset: {u: 'L/min', k: 60, d: 0}, RRset: {u: '/min', d: 0},
    pauseTime: {u: 's', d: 2}, dPinsp: {u: 'cmH₂O', d: 1, above: true}, PS: {u: 'cmH₂O', d: 1, above: true}, Ti: {u: 's', d: 2}, riseTime: {u: 's', d: 2},
    cycle_fraction: {u: '%', k: 100, d: 0}, Ti_min: {u: 's', d: 2}, Ti_max: {u: 's', d: 2}, Qtrigger: {u: 'L/min', k: 60, d: 1}, dPtrigger: {u: 'cmH₂O', d: 1}, apneaTime: {u: 's', d: 0},
    C: {u: 'mL/cmH₂O', k: 1000, d: 0}, Rin: {u: 'cmH₂O·s/L', d: 0}, Rexp: {u: 'cmH₂O·s/L', d: 0}, Mmax: {u: 'cmH₂O', d: 1}, neuralRR: {u: '/min', d: 0}, neuralTi: {u: 's', d: 2}
  };
  const MF = {'VC-AC': ['VTset', 'Qset', 'RRset', 'pauseTime', 'PEEP', 'Pmax'], 'PC-AC': ['dPinsp', 'Ti', 'RRset', 'riseTime', 'PEEP', 'Pmax'], 'PSV': ['PS', 'riseTime', 'cycle_fraction', 'Ti_min', 'Ti_max', 'PEEP', 'Pmax', 'apneaTime'], 'CPAP': ['PEEP', 'Pmax', 'apneaTime']};
  const PF = ['C', 'Rin', 'Rexp', 'Mmax', 'neuralRR', 'neuralTi'];
  const BK = ['RRset', 'dPinsp', 'Ti', 'riseTime'];
  const toUI = (k, v) => v == null ? '' : n(v * (FD[k].k || 1), FD[k].d + (FD[k].k === 60 && FD[k].d === 0 ? 0 : 0));
  const rangeTxt = k => { const r = CT.RANGE[k], f = FD[k].k || 1; return r ? `${n(r[0] * f, FD[k].d)}–${n(r[1] * f, FD[k].d)} ${FD[k].u}` : ''; };
  const why = e => e.reasonCodes.map(c => T('lab.why.' + c)).join(' · ');
  const errTxt = e => { const base = e.k.replace('backupPC.', ''); const f = FD[base] || {}; const lab = (e.k.startsWith('backupPC.') ? T('lab.backup') + ' · ' : '') + T('lab.f.' + base); return `<b>${esc(lab)}</b>: ${esc(F('lab.err.' + e.code, {lo: e.lo != null ? n(e.lo * (f.k || 1), f.d || 0) : '', hi: e.hi != null ? n(e.hi * (f.k || 1), f.d || 0) : '', u: f.u || ''}))}`; };

  function head(cur) {
    const tabs = [['', 'lab.sub.mech'], ['gaz', 'lab.sub.gas'], ['model', 'lab.sub.model']];
    return `<header class="page-head wrap lab-head"><p class="eyebrow">${T('tab.lab')}</p><h1>${T('lab.title')}</h1><p class="lede">${T('lab.lede')}</p>
      <nav class="subtabs" aria-label="${T('nav.sub')}">${tabs.map(([k, l]) => `<a href="#/laboratuvar${k ? '/' + k : ''}"${k === cur ? ' aria-current="page"' : ''}>${T(l)}</a>`).join('')}</nav></header>`;
  }

  function mount(el, sub, arg) {
    if (sub === 'gaz') return mountGas(el, arg);
    if (sub === 'model') return mountModel(el);
    const sc = sub && /^VL\d\d$/.test(sub) ? SC.get(sub) : null;
    if (sc && sc.lab) return mountGas(el, sc.id);
    return mountMech(el, sc, sub === 'mod' ? CARD2MODE[arg] : null);
  }

  /* ================= Mekanik laboratuvar ================= */
  function freeInit(mode) {
    const b = SC.get('VL01'), init = SC.init(b);
    init.settings.mode = mode || 'VC-AC';
    if (mode === 'PSV' || mode === 'CPAP') Object.assign(init.patient, {Mmax: 6, neuralRR: 15});
    return init;
  }
  function mountMech(el, sc, freeMode) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lab, draft, pdraft, running = !reduce, speed = 1, raf = 0, tPrev = 0, tUI = 0, side = 'task', depth = 1, ref = null, thr = {VTlow: .25, MVlow: 3};
    let st = null, alarmSeen = {}, ack = {}, showBreathEv = false, mode0 = sc ? sc.mode : freeMode || 'VC-AC', pend = false;
    const vEdited = new Set(), pEdited = new Set();   // yalnız kullanıcının düzenlediği alanlar gönderilir
    const mech = SC.list.filter(s => !s.lab), gas = SC.list.filter(s => s.lab);
    el.innerHTML = `${head('')}
    <section class="wrap lab" id="lab">
      <div class="lab-bar">
        <label class="lab-sc"><span>${T('lab.scenario')}</span><select id="lsc"><option value="">${T('lab.free')}</option>
          <optgroup label="${T('lab.sub.mech')}">${mech.map(s => `<option value="${s.id}"${sc && sc.id === s.id ? ' selected' : ''}>${s.id} · ${esc(T('lab.sc.' + s.id + '.title'))}</option>`).join('')}</optgroup>
          <optgroup label="${T('lab.sub.gas')}">${gas.map(s => `<option value="${s.id}">${s.id} · ${esc(T('lab.sc.' + s.id + '.title'))}</option>`).join('')}</optgroup></select></label>
        <span class="badge lab-synth" title="${esc(T('lab.synthAdultD'))}">${T('lab.synthAdult')}</span>
        <span class="sp"></span>
        <div class="lab-run" role="group" aria-label="${T('lab.runCtl')}">
          <button type="button" class="btn-ghost" id="lplay" aria-pressed="${running}">${T(running ? 'viz.pause' : 'viz.play')}</button>
          <button type="button" class="btn-ghost" id="lstep" title="${esc(T('lab.stepD'))}">${T('lab.step')}</button>
          <button type="button" class="btn-ghost" id="lstep1">${T('lab.step1')}</button>
          <button type="button" class="btn-ghost" id="lrestart">${T('lab.restart')}</button>
          <label class="lab-speed"><span>${T('lab.speed')}</span><select id="lspeed">${[.5, 1, 2, 4].map(v => `<option value="${v}"${v === 1 ? ' selected' : ''}>${n(v, v < 1 ? 1 : 0)}×</option>`).join('')}</select></label>
        </div>
      </div>
      ${reduce ? `<p class="lab-note">${T('lab.reduced')}</p>` : ''}
      <div class="vent" id="vent">
        <header class="vt-top">
          <button type="button" class="vt-mode" id="lmodeB" title="${esc(T('lab.mode'))}"></button>
          <div class="vt-alarms" id="lalarm" aria-live="polite"></div>
          <span class="vt-state" id="lstate" aria-live="polite"></span>
        </header>
        <div class="vt-body">
          <div class="vt-waves">
            <div class="vt-tools">
              <button type="button" id="lshowM" aria-pressed="false" title="${esc(T('lab.showMD'))}">${T('lab.showM')}</button>
              <button type="button" id="llock" aria-pressed="false">${T('lab.lock')}</button>
              <span class="sp"></span>
              <button type="button" id="lrefA">${T('lab.refA')}</button>
              <button type="button" id="lrefX" hidden>${T('lab.refClear')}</button>
            </div>
            <div class="lab-wave"><canvas id="lw" aria-label="${esc(T('lab.waveAria'))}" role="img"></canvas></div>
          </div>
          <div class="vt-loops lab-loop"><canvas id="ll" aria-label="${esc(T('lab.loopAria'))}" role="img"></canvas></div>
          <div class="vt-nums" id="lnums"></div>
        </div>
        <div class="vt-holds"><span class="vt-hl">${T('lab.holdsT')}</span><div class="vt-hnums" id="lholds"></div></div>
        <div class="legend vt-legend"><span class="lg mand">${T('lab.bt.mand')} · ${T('lab.btl.mand')}</span><span class="lg assist">${T('lab.bt.assist')} · ${T('lab.btl.assist')}</span><span class="lg spont">${T('lab.bt.spont')} · ${T('lab.btl.spont')}</span><span class="lg backup">${T('lab.bt.backup')} · ${T('lab.btl.backup')}</span><span class="lg">▲ ${T('lab.btl.pmax')}</span></div>
        <div id="lbk"></div>
        <div class="vt-tabs" role="tablist">${[['set', 'lab.m.set'], ['pt', 'lab.vt.pt'], ['man', 'lab.vt.man'], ['alarm', 'lab.vt.alarm']].map(([k, l]) => `<button type="button" role="tab" data-vtab="${k}" aria-selected="${k === 'set'}">${T(l)}</button>`).join('')}</div>
        <div class="vt-ctl" data-vpane="set">
          <form id="lform" novalidate>
            <div class="vt-tiles"><label class="lf vt-modesel"><span class="lf-n">${T('lab.mode')}</span><select id="lmsel">${CT.MODES.map(m => `<option value="${m}">${T('lab.mode.' + m)}</option>`).join('')}</select></label><div id="lfields" class="vt-tilegroup"></div></div>
            <div class="vt-foot"><button type="submit" class="btn">${T('lab.apply')}</button><button type="button" class="btn-ghost" id="lrevert">${T('lab.revert')}</button>
              <p class="lab-pend" id="lpend" hidden></p><p class="lab-err" id="lerr" role="alert"></p><p class="vt-note">${T('lab.applyNote')}</p></div>
          </form>
        </div>
        <div class="vt-ctl" data-vpane="pt" hidden>
          <form id="lpform" novalidate>
            <div class="vt-tiles" id="lpfields"></div>
            <div class="vt-foot"><button type="submit" class="btn">${T('lab.ptApply')}</button><p class="lab-err" id="lperr" role="alert"></p><p class="vt-note">${T('lab.ptNote')}</p></div>
          </form>
        </div>
        <div class="vt-ctl" data-vpane="man" hidden>
          <div class="vt-foot vt-man"><button type="button" class="btn-ghost" data-hold="insp">${T('lab.hold.insp')}</button><button type="button" class="btn-ghost" data-hold="exp">${T('lab.hold.exp')}</button><button type="button" class="btn-ghost" data-hold="both">${T('lab.hold.both')}</button>
            <p class="vt-note" id="lholdmsg">${T('lab.holdNote')}</p></div>
        </div>
        <div class="vt-ctl" data-vpane="alarm" hidden>
          <div class="vt-tiles">
            <div class="lf-w"><label class="lf" for="lthVT"><span class="lf-n">${T('lab.al.lowVT')}</span><span class="lf-in"><input id="lthVT" inputmode="decimal" value="${n(thr.VTlow * 1000)}"><span class="lf-u">mL</span></span></label></div>
            <div class="lf-w"><label class="lf" for="lthMV"><span class="lf-n">${T('lab.al.lowMV')}</span><span class="lf-in"><input id="lthMV" inputmode="decimal" value="${n(thr.MVlow, 1)}"><span class="lf-u">L/min</span></span></label></div>
          </div>
          <div class="vt-foot"><p class="vt-note">${T('lab.alarmNote')}</p></div>
        </div>
      </div>
      <div class="lab-lower">
        <aside class="lab-side">
          <div class="sectabs" role="tablist">${['task', 'easy', 'inside', 'events'].map(k => `<button type="button" role="tab" data-side="${k}" aria-selected="${k === side}">${T('lab.side.' + k)}</button>`).join('')}</div>
          <div class="lab-panel" id="lpanel"></div>
        </aside>
        <div class="lab-data">
          <div id="lref"></div>
          <h3 class="h-xs">${T('lab.tbl.title')}</h3><div class="tbl lab-tbl" id="ltbl"></div>
        </div>
      </div>
      <p class="model-note">${T('lab.note')}</p>
    </section>`;
    const root = $('#lab', el);
    const waves = new DR.Waves($('#lw', root)), loops = new DR.Loops($('#ll', root));

    /* ---------- kurulum ---------- */
    function create() {
      lab = new CT.Lab(sc ? SC.init(sc) : freeInit(mode0));
      draft = clone(lab.S); pdraft = clone(lab.P); vEdited.clear(); pEdited.clear(); waves.rng = {}; loops.rng = {}; ref = null; alarmSeen = {}; ack = {};
      st = sc ? {phase: sc.observe ? 'observe' : 'base', guess: null, snap: sc.observe ? {tI: 0} : null, res: null} : null;
      renderFields(); renderPFields(); renderBackup(); updateSide(true); updateNums(true);
      $('#lrefX', root).hidden = true;
    }
    /* ---------- ayar alanları ---------- */
    function fieldHTML(k, v, prefix = '') {
      const f = FD[k], id = 'lf-' + prefix + k;
      return `<div class="lf-w" data-k="${prefix}${k}"><label class="lf" for="${id}"><span class="lf-n">${T('lab.f.' + k)}</span><span class="lf-in"><input id="${id}" inputmode="decimal" autocomplete="off" value="${toUI(k, v)}"><span class="lf-u">${f.u}</span></span></label>
        <div class="lf-pop"><span class="lf-h">${f.above ? `<b>${T('lab.aboveP')}</b> · ` : ''}${T('lab.range')} ${rangeTxt(k)}</span>
        <details class="lf-x"><summary>${T('lab.expect')}</summary><p>${T('lab.fx.' + k)}</p></details></div><span class="lf-e" role="alert"></span></div>`;
    }
    function renderFields() {
      $('#lmsel', root).value = draft.mode;
      const m = draft.mode, ks = MF[m];
      let h = ks.map(k => fieldHTML(k, draft[k])).join('');
      if (m !== 'CPAP') h += `<label class="lf vt-modesel"><span class="lf-n">${T('lab.f.trigger_kind')}</span><select id="ltk"><option value="flow">${T('lab.trig.flow')}</option><option value="pressure">${T('lab.trig.pressure')}</option></select></label>` + (draft.trigger_kind === 'pressure' ? fieldHTML('dPtrigger', draft.dPtrigger) : fieldHTML('Qtrigger', draft.Qtrigger));
      if (m === 'PSV' || m === 'CPAP') {
        const b = draft.backupPC || {RRset: 12, dPinsp: 10, Ti: 1, riseTime: .1};
        h += `<label class="lf lf-chk vt-chk"><input type="checkbox" id="lbkon"${draft.backupEnabled ? ' checked' : ''}> <span>${T('lab.f.backupEnabled')}</span></label>`;
        if (draft.backupEnabled) h += `<div class="lf-bk"><p class="vt-note">${T('lab.backupNote')}</p>${BK.map(k => fieldHTML(k, b[k], 'b.')).join('')}</div>`;
      }
      $('#lfields', root).innerHTML = h;
      const tk = $('#ltk', root); if (tk) { tk.value = draft.trigger_kind; tk.addEventListener('change', () => { draft.trigger_kind = tk.value; vEdited.add('trigger_kind'); renderFields(); }); }
      const bk = $('#lbkon', root); if (bk) bk.addEventListener('change', () => { draft.backupEnabled = bk.checked; vEdited.add('backupEnabled'); vEdited.add('backupPC'); if (bk.checked && !draft.backupPC) draft.backupPC = {RRset: 12, dPinsp: 10, Ti: 1, riseTime: .1}; renderFields(); });
      $$('#lfields .lf-w', root).forEach(w => {
        const key = w.dataset.k, inp = $('input', w), base = key.replace('b.', '');
        inp.addEventListener('input', () => {
          const r = CT.parseNum(inp.value), e = $('.lf-e', w);
          if (r.v == null) { e.textContent = T('lab.err.' + r.why); w.classList.add('bad'); return; }
          e.textContent = ''; w.classList.remove('bad');
          const v = r.v / (FD[base].k || 1);
          if (key.startsWith('b.')) { draft.backupPC[base] = v; vEdited.add('backupPC'); } else { draft[key] = v; vEdited.add(key); }
          markDirty();
        });
      });
      markDirty();
    }
    function markDirty() {
      const S = lab.pending || lab.S;
      $$('#lfields .lf-w', root).forEach(w => { const key = w.dataset.k, base = key.replace('b.', ''); const a = key.startsWith('b.') ? (draft.backupPC || {})[base] : draft[key], b = key.startsWith('b.') ? (S.backupPC || {})[base] : S[key]; w.classList.toggle('dirty', a !== b); });
    }
    function renderPFields() {
      $('#lpfields', root).innerHTML = PF.map(k => fieldHTML(k, pdraft[k], 'p.')).join('');
      $$('#lpfields .lf-w', root).forEach(w => {
        const key = w.dataset.k.slice(2), inp = $('input', w);
        inp.addEventListener('input', () => {
          const r = CT.parseNum(inp.value), e = $('.lf-e', w);
          if (r.v == null) { e.textContent = T('lab.err.' + r.why); w.classList.add('bad'); return; }
          e.textContent = ''; w.classList.remove('bad'); pdraft[key] = r.v / (FD[key].k || 1); pEdited.add(key); w.classList.toggle('dirty', pdraft[key] !== lab.P[key]);
        });
      });
    }
    function renderBackup() {
      $('#lbk', root).innerHTML = lab.backup ? `<div class="lab-bkbox"><p><b>${T('lab.backupOn')}</b> ${T('lab.backupOnD')}</p><button type="button" class="btn" id="lbkoff"${lab.backupReturn ? ' disabled' : ''}>${F('lab.backupOff', {m: T('lab.mode.' + lab.S.mode)})}</button></div>` : '';
      const b = $('#lbkoff', root); if (b) b.addEventListener('click', () => { lab.endBackup(); renderBackup(); });
    }
    $('#lmsel', root).addEventListener('change', e => { draft.mode = e.target.value; vEdited.add('mode'); renderFields(); });
    $('#lform', root).addEventListener('submit', e => {
      e.preventDefault();
      if ($$('#lfields .lf-w.bad', root).length) { $('#lerr', root).innerHTML = T('lab.fixFields'); return; }
      const cur = lab.pending || lab.S, bundle = {};
      for (const k of ['mode', 'trigger_kind', 'backupEnabled', ...CT.SET_KEYS]) if (vEdited.has(k) && JSON.stringify(draft[k]) !== JSON.stringify(cur[k])) bundle[k] = draft[k];
      if (vEdited.has('backupPC') && JSON.stringify(draft.backupPC) !== JSON.stringify(cur.backupPC)) bundle.backupPC = draft.backupPC;
      if (!Object.keys(bundle).length) { $('#lerr', root).textContent = T('lab.noChange'); return; }
      const errs = lab.request(bundle);
      $('#lerr', root).innerHTML = errs.map(errTxt).join('<br>');
      if (!errs.length) { pend = true; vEdited.clear(); updatePend(); }
    });
    $('#lrevert', root).addEventListener('click', () => { draft = clone(lab.pending || lab.S); vEdited.clear(); $('#lerr', root).textContent = ''; renderFields(); });
    $('#lpform', root).addEventListener('submit', e => {
      e.preventDefault();
      if ($$('#lpfields .lf-w.bad', root).length) { $('#lperr', root).innerHTML = T('lab.fixFields'); return; }
      const d = {}; for (const k of PF) if (pEdited.has(k) && pdraft[k] !== lab.P[k]) d[k] = pdraft[k];
      if (!Object.keys(d).length) { $('#lperr', root).textContent = T('lab.noChange'); return; }
      const errs = lab.setPatient(d); $('#lperr', root).innerHTML = errs.map(errTxt).join('<br>');
      if (!errs.length) { pEdited.clear(); pdraft = clone(lab.P); renderPFields(); }
    });
    /* Motorun güncel (veya bekleyen) ayarlarıyla formları eşitle; kullanıcının henüz göndermediği düzenlemeler korunur */
    function syncForms() {
      const S = clone(lab.pending || lab.S);
      for (const k of vEdited) if (k in draft) S[k] = draft[k];
      draft = S; pdraft = Object.assign(clone(lab.P), Object.fromEntries([...pEdited].map(k => [k, pdraft[k]])));
      renderFields(); renderPFields();
      $$('#lpfields .lf-w', root).forEach(w => { const k = w.dataset.k.slice(2); w.classList.toggle('dirty', pEdited.has(k) && pdraft[k] !== lab.P[k]); });
    }
    function updatePend() {
      const p = $('#lpend', root);
      if (lab.pending) { p.hidden = false; p.innerHTML = `⏳ ${T('lab.pending')}`; }
      else if (pend) { pend = false; p.hidden = false; p.innerHTML = `✓ ${T('lab.applied')}`; syncForms(); setTimeout(() => { if (!lab.pending) p.hidden = true; }, 2500); }
    }
    $$('[data-hold]', root).forEach(b => b.addEventListener('click', () => {
      const r = lab.hold(b.dataset.hold);
      $('#lholdmsg', root).textContent = r === 'no_mandatory' ? T('lab.holdNoMand') : r === 'busy' ? T('lab.holdBusy') : T('lab.holdQueued');
    }));
    const thIn = (id, f) => $(id, root).addEventListener('input', e => { const r = CT.parseNum(e.target.value); if (r.v != null) f(r.v); });
    thIn('#lthVT', v => { thr.VTlow = v / 1000; }); thIn('#lthMV', v => { thr.MVlow = v; });

    /* ---------- üst çubuk ---------- */
    $('#lsc', root).addEventListener('change', e => { location.hash = e.target.value ? '#/laboratuvar/' + e.target.value : '#/laboratuvar' + (mode0 && !sc ? '/mod/' + MODE2CARD[mode0] : ''); });
    const play = $('#lplay', root);
    const setRun = on => { running = on; play.setAttribute('aria-pressed', on); play.textContent = T(on ? 'viz.pause' : 'viz.play'); };
    play.addEventListener('click', () => setRun(!running));
    $('#lstep', root).addEventListener('click', () => { setRun(false); lab.untilNext(60); drawAll(true); });
    $('#lstep1', root).addEventListener('click', () => { setRun(false); lab.advance(1); drawAll(true); });
    $('#lrestart', root).addEventListener('click', () => { create(); drawAll(true); });
    $('#lspeed', root).addEventListener('change', e => { speed = +e.target.value; });
    $('#lshowM', root).addEventListener('click', e => { waves.showM = !waves.showM; waves.rng = {}; e.target.setAttribute('aria-pressed', waves.showM); });
    $('#llock', root).addEventListener('click', e => { waves.lock = loops.lock = !waves.lock; e.target.setAttribute('aria-pressed', waves.lock); });
    $('#lrefA', root).addEventListener('click', () => {
      const b = ME.lastBreath(lab); if (!b || !b.loop) return;
      ref = {pts: b.loop, M: ME.monitor(lab), H: ME.holds(lab), t: lab.t, S: clone(lab.S), P: clone(lab.P)};
      waves.lock = loops.lock = true; $('#llock', root).setAttribute('aria-pressed', 'true'); $('#lrefX', root).hidden = false; updateNums(true);
    });
    $('#lrefX', root).addEventListener('click', () => { ref = null; $('#lrefX', root).hidden = true; updateNums(true); });
    const vtab = k => { $$('[data-vtab]', root).forEach(x => x.setAttribute('aria-selected', x.dataset.vtab === k)); $$('[data-vpane]', root).forEach(x => { x.hidden = x.dataset.vpane !== k; }); };
    $$('[data-vtab]', root).forEach(b => b.addEventListener('click', () => vtab(b.dataset.vtab)));
    $('#lmodeB', root).addEventListener('click', () => { vtab('set'); $('#lmsel', root).focus(); });
    $$('[data-side]', root).forEach(b => b.addEventListener('click', () => { side = b.dataset.side; $$('[data-side]', root).forEach(x => x.setAttribute('aria-selected', x === b)); updateSide(true); }));

    /* ---------- monitör değerleri ---------- */
    const cell = (label, env, k = 1, d = 0, unit, extra = '') => {
      const v = env && env.value != null ? n(env.value * k, d) : '—', stc = env ? env.status : 'unavailable';
      const note = env && env.status !== 'valid' ? why(env) : env && env.reasonCodes.includes('stale') ? `${T('lab.why.stale')} · ${F('lab.ago', {s: n(lab.t - env.validAt, 0)})}` : env && env.reasonCodes.includes('passive_model') ? T('lab.why.passive_model') : '';
      return `<div class="lnum st-${stc}" title="${esc(label + (note ? ' · ' + note : ''))}"><span class="ln-l">${label}</span><span class="ln-u">${unit ?? (env && env.unit) ?? ''}</span><b class="ln-v">${v}</b>${note ? `<span class="ln-n">${esc(note)}</span>` : ''}${extra}</div>`;
    };
    function updateNums() {
      const M = ME.monitor(lab), H = ME.holds(lab);
      $('#lnums', root).innerHTML = [
        cell(T('lab.m.Ppeak'), M.Ppeak, 1, 1), cell(T('lab.m.PawMean'), M.PawMean, 1, 1), cell(T('lab.m.PEEPset'), M.PEEPset, 1, 1),
        cell(T('lab.m.VTi'), M.VTi, 1000, 0, 'mL'), cell(T('lab.m.VTe'), M.VTe, 1000, 0, 'mL'), cell(T('lab.m.ftotal'), M.ftotal, 1, 1, '/min'),
        cell(T('lab.m.MVe'), M.MVe, 1, 2, 'L/min'), cell(T('lab.m.Ti'), M.Ti, 1, 2, 's'), cell(T('lab.m.IE'), M.IE, 1, 1, '', '')
      ].join('').replace(`<b class="ln-v">${M.IE.value != null ? n(M.IE.value, 1) : '—'}</b>`, `<b class="ln-v">${M.IE.value != null ? '1:' + n(M.IE.value, 1) : '—'}</b>`);
      const age = env => env && env.validAt != null ? `<span class="ln-a">${F('lab.ago', {s: n(lab.t - env.validAt, 0)})}</span>` : '';
      $('#lholds', root).innerHTML = [
        cell(T('lab.m.holdPawI'), H.holdPawI, 1, 1, 'cmH₂O', age(H.holdPawI)), cell(T('lab.m.Pplat'), H.Pplat, 1, 1, 'cmH₂O'), cell(T('lab.m.PEEPtot'), H.PEEPtot, 1, 1, 'cmH₂O', age(H.PEEPtot)),
        cell(T('lab.m.PEEPi'), H.PEEPi, 1, 1, 'cmH₂O'), cell(T('lab.m.DP'), H.DP, 1, 1, 'cmH₂O'), cell(T('lab.m.Cstat'), H.Cstat, 1000, 0, 'mL/cmH₂O'), cell(T('lab.m.Rin'), H.Rin, 1, 1, 'cmH₂O·s/L')
      ].join('');
      /* A/B karşılaştırması */
      if (ref) {
        const rows = [['Ppeak', 1, 1, 'cmH₂O'], ['PawMean', 1, 1, 'cmH₂O'], ['VTi', 1000, 0, 'mL'], ['VTe', 1000, 0, 'mL'], ['Ti', 1, 2, 's'], ['ftotal', 1, 1, '/min']];
        const v = (e, k, d) => e && e.value != null ? n(e.value * k, d) : '—';
        $('#lref', root).innerHTML = `<div class="tbl lab-ab"><table><thead><tr><th>${T('lab.ab.k')}</th><th>A · ${n(ref.t, 0)} s</th><th>${T('lab.ab.now')}</th></tr></thead><tbody>${rows.map(([k, s, d, u]) => `<tr><td>${T('lab.m.' + k)} <span class="muted">${u}</span></td><td data-h="A">${v(ref.M[k], s, d)}</td><td data-h="${esc(T('lab.ab.now'))}">${v(ME.monitor(lab)[k], s, d)}</td></tr>`).join('')}</tbody></table><p class="muted small">${T('lab.ab.note')}</p></div>`;
      } else $('#lref', root).innerHTML = '';
      /* son soluklar tablosu */
      const bs = lab.breaths.filter(b => b.tInspEnd != null).slice(-6).reverse(), H2 = ['#', 'kind', 'trig', 'cyc', 'VTi', 'VTe', 'Ppeak', 'PawMean', 'Ti', 'Te', 'qNext', 'lim'].map(k => T('lab.tbl.' + k));
      $('#ltbl', root).innerHTML = bs.length ? `<table><thead><tr>${H2.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${bs.map(b => {
        const c = [b.id, T('lab.btl.' + b.kind), T('lab.cause.' + b.trigger), T('lab.cause.' + b.cycle), n(b.VTi * 1000), b.VTe != null ? n(b.VTe * 1000) : '—', n(b.Ppeak, 1), n(b.PawMean, 1), n(b.Ti, 2), b.Te != null ? n(b.Te, 2) : '—', n(b.flowAtNextStart * 60, 1), b.pressureLimited ? '▲ ' + T('lab.yes') : '—'];
        return `<tr>${c.map((x, i) => `<td data-h="${esc(H2[i])}">${i === 1 ? `<span class="bt-tag bt-${b.kind}" title="${esc(x)}">${T('lab.bt.' + b.kind)}</span> <span class="bt-txt">${esc(x)}</span>` : esc(x)}</td>`).join('')}</tr>`; }).join('')}</tbody></table><p class="muted small">${T('lab.tbl.note')}</p>` : `<p class="muted small">${T('lab.tbl.none')}</p>`;
    }
    /* ---------- alarmlar ---------- */
    function updateAlarms() {
      const A = ME.alarms(lab, thr);
      for (const a of A) { if (a.active && !alarmSeen[a.id]) { alarmSeen[a.id] = true; if (!a.info) lab.log('alarm_on', {alarm: a.id}); } if (!a.active) { alarmSeen[a.id] = false; ack[a.id] = false; } }
      const act = A.filter(a => a.active);
      $('#lalarm', root).innerHTML = act.map(a => `<span class="lab-al${a.info ? ' info' : ''}${ack[a.id] ? ' ack' : ''}">${a.info ? 'ⓘ' : '⚠'} ${T('lab.al.' + a.id)}${a.info || ack[a.id] ? '' : ` <button type="button" data-ack="${a.id}">${T('lab.ack')}</button>`}</span>`).join('') + (A.find(a => a.id === 'lowMV').pending ? `<span class="lab-al pend">${T('lab.al.mvPending')}</span>` : '');
      $$('[data-ack]', root).forEach(b => b.addEventListener('click', () => { ack[b.dataset.ack] = true; lab.log('alarm_ack', {alarm: b.dataset.ack}); updateAlarms(); }));
      if (!act.length) $('#lalarm', root).innerHTML = `<span class="vt-ok">${T('lab.vt.noAlarm')}</span>`;
      $('#lmodeB', root).textContent = T('lab.mode.' + lab.mode).replace(/\s*\(.*\)$/, '');
      $('#lstate', root).innerHTML = `${T('lab.st.' + lab.state)} · <b>${n(lab.t, 0)} s</b>`;
    }

    /* ---------- yan panel ---------- */
    const ivText = () => {
      if (!sc) return '';
      const iv = sc.iv || {settings: {}, patient: {}}, parts = [];
      for (const [k, v] of Object.entries(iv.patient)) parts.push(`${T('lab.f.' + k)}: ${toUI(k, sc.patient[k])} → ${toUI(k, v)} ${FD[k].u}`);
      for (const [k, v] of Object.entries(iv.settings)) parts.push(`${T('lab.f.' + k)}: ${toUI(k, sc.settings[k])} → ${toUI(k, v)} ${FD[k].u}`);
      if (sc.hold) parts.push(T('lab.hold.' + sc.hold));
      return parts.join(' · ');
    };
    function compareRows(ev) {
      const s = ev.s, P = (bs, f) => SC.pick(bs || [], f), rows = [];
      const tri = (label, f, k, d, u) => rows.push(`<tr><td>${label} <span class="muted">${u}</span></td>${[P(s.before, f), s.first ? f(s.first) : null, P(s.last, f)].map((v, i) => `<td data-h="${esc(T('lab.cmp.' + ['before', 'first', 'last'][i]))}">${v == null ? '—' : n(v * k, d)}</td>`).join('')}</tr>`);
      const one = (label, v) => rows.push(`<tr><td>${label}</td><td colspan="3">${v}</td></tr>`);
      for (const key of sc.show) {
        if (key === 'Ppeak') tri(T('lab.m.Ppeak'), b => b.Ppeak, 1, 1, 'cmH₂O');
        if (key === 'VTi') tri(T('lab.m.VTi'), b => b.VTi, 1000, 0, 'mL');
        if (key === 'VTe') tri(T('lab.m.VTe'), b => b.VTe, 1000, 0, 'mL');
        if (key === 'Ti') tri(T('lab.m.Ti'), b => b.Ti, 1, 2, 's');
        if (key === 'flowEnd') tri(T('lab.cmp.flowEnd'), b => b.flowAtNextStart, 60, 1, 'L/min');
        if (key === 'cycle') one(T('lab.cmp.cycle'), esc(s.last.map(b => T('lab.cause.' + b.cycle)).join(', ') || '—'));
        if (key === 'ftotal') { const st0 = s.after.map(b => b.tStart); one(T('lab.cmp.ftotal'), st0.length >= 3 ? `${n(60 * (st0.length - 1) / (st0[st0.length - 1] - st0[0]), 1)} /min · RRset ${n(lab.S.RRset)} /min` : '—'); }
        if (key === 'causes') { const c = {}; s.after.forEach(b => { c[b.trigger] = (c[b.trigger] || 0) + 1; }); one(T('lab.cmp.causes'), Object.entries(c).map(([k, v]) => `${esc(T('lab.cause.' + k))}: ${v}`).join(' · ') || '—'); }
        if (key === 'count') one(T('lab.cmp.count'), String(s.after.length + (lab.br && lab.br.tStart >= ev.s.tI && lab.br.tInspEnd == null ? 1 : 0)));
        if (key === 'kinds') { const c = {}; s.after.forEach(b => { c[b.kind] = (c[b.kind] || 0) + 1; }); one(T('lab.cmp.kinds'), Object.entries(c).map(([k, v]) => `${esc(T('lab.btl.' + k))}: ${v}`).join(' · ') || '—'); }
        if (key === 'efforts') { const E = ME.efforts(lab); one(T('lab.cmp.efforts'), F('lab.cmp.effortsV', {tr: E.triggered, in: E.ineffective, ov: E.overlap})); }
        if (key === 'offset') { const o = P(s.after, b => b.cycleOffset); one(T('lab.cmp.offset'), o == null ? '—' : `${n(o * 1000)} ms`); }
        if (key === 'double') { const d = lab.events.filter(e => e.type === 'double_trigger').length; one(T('lab.cmp.double'), d ? F('lab.cmp.doubleY', {n: d}) : T('lab.cmp.doubleN')); }
        if (key === 'Pplat' || key === 'holdPaw') { const H = ME.holds(lab); if (key === 'holdPaw') one(T('lab.m.holdPawI'), H.holdPawI.value != null ? `${n(H.holdPawI.value, 1)} cmH₂O` : '—'); else one(T('lab.m.Pplat'), H.Pplat.value != null ? `${n(H.Pplat.value, 1)} cmH₂O` : `— · ${esc(why(H.Pplat))}`); }
        if (key === 'limited') { const b = s.after[0]; one(T('lab.cmp.limited'), b ? `${T('lab.m.VTi')} ${n(b.VTi * 1000)} mL / VTset ${n(lab.S.VTset * 1000)} mL · ${b.pressureLimited ? '▲ ' + T('lab.cause.pmax') : '—'}` : '—'); }
        if (key === 'xstep') one(T('lab.cmp.xstep'), s.x0 != null && s.x50 != null ? F('lab.cmp.xstepV', {a: n(s.x0 * 1000), b: n(s.x50 * 1000), c: n(lab.x * 1000), p: n(lab.pawNow, 1)}) : '—');
        if (key === 'pawEnd') one(T('lab.cmp.pawEnd'), `${n(lab.pawNow, 1)} cmH₂O · PEEP ${n(lab.S.PEEP, 1)}`);
      }
      return `<div class="tbl lab-cmp"><table><thead><tr><th></th><th>${T('lab.cmp.before')}</th><th>${T('lab.cmp.first')}</th><th>${T('lab.cmp.last')}</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>${sc.minAfter ? `<p class="muted small">${F('lab.cmp.transNote', {n: s.trans || 0})}</p>` : ''}`;
    }
    function taskHTML() {
      if (!sc) return `<h3 class="h-sm">${T('lab.free')}</h3><p>${T('lab.freeD')}</p><p class="muted small">${T('lab.freeS')}</p>
        <ul class="lab-sclist">${SC.list.map(s => `<li><a href="#/laboratuvar/${s.id}"><b>${s.id}</b> ${esc(T('lab.sc.' + s.id + '.title'))}</a> <span class="muted small">${s.lab ? T('lab.sub.gas') : T('lab.mode.' + s.mode)}</span></li>`).join('')}</ul>`;
      const id = sc.id, k = x => T('lab.sc.' + id + '.' + x);
      let h = `<p class="eyebrow">${id} · ${T('lab.mode.' + sc.mode)} · ${T('lab.synthAdult')}</p><h3 class="h-sm">${esc(k('title'))}</h3><p><b>${T('lab.task')}:</b> ${esc(k('task'))}</p>`;
      h += `<fieldset class="lab-q"><legend>${T('lab.predict')}</legend><p>${esc(k('q'))}</p>${sc.opts.map(o => `<label class="lab-opt"><input type="radio" name="lq" value="${o}"${st.guess === o ? ' checked' : ''}${st.res ? ' disabled' : ''}> <span>${esc(T('lab.sc.' + id + '.o.' + o))}</span></label>`).join('')}</fieldset>`;
      if (!sc.observe && !st.snap) { const bl = SC.baseline(sc, lab); h += `<p class="muted small">${T('lab.ivIs')}: <b>${esc(ivText())}</b></p><p class="lab-wait" id="lbase"></p><button type="button" class="btn" id="liv"${st.guess && bl.ready ? '' : ' disabled'}>${T('lab.ivDo')}</button> <button type="button" class="linkbtn" id="lskip"${bl.ready ? '' : ' disabled'}>${T('lab.skipGuess')}</button>`; }
      if (st.snap && !st.res) h += `<p class="lab-wait" id="lwait"></p>${sc.observe && !st.guess ? `<button type="button" class="linkbtn" id="lskipO">${T('lab.showRes')}</button>` : ''}`;
      if (st.res) {
        const ok = st.guess && st.guess === st.res.answer;
        h += `<div class="lab-res ${st.guess ? (ok ? 'ok' : 'no') : ''}"><p><b>${T('lab.engineSays')}:</b> ${esc(T('lab.sc.' + id + '.o.' + st.res.answer))}</p>${st.guess ? `<p>${ok ? T('lab.match') : T('lab.mismatch')}</p>` : ''}<p class="muted small">${T('lab.scoreNote')}</p></div>
          ${compareRows(st.res)}
          <h4 class="h-xs">${T('lab.why')}</h4><p>${esc(k('why'))}</p>
          <h4 class="h-xs">${T('lab.expected')}</h4><p>${esc(k('exp'))}</p>
          <div class="lab-must"><b>${T('lab.mustNot')}</b> ${esc(k('must'))}</div>
          ${id === 'VL10' ? `<p class="muted small">${T('lab.sc.VL10.note')}</p>` : ''}`;
      }
      return h;
    }
    function bindTask() {
      $$('input[name=lq]', root).forEach(r => r.addEventListener('change', () => { st.guess = r.value; const b = $('#liv', root); if (b) b.disabled = !SC.baseline(sc, lab).ready; }));
      const go = () => { if (!SC.baseline(sc, lab).ready) return; st.snap = SC.intervene(sc, lab); st.phase = 'iv'; syncForms(); updateSide(true); };
      const iv = $('#liv', root); if (iv) iv.addEventListener('click', go);
      const sk = $('#lskip', root); if (sk) sk.addEventListener('click', () => { st.guess = null; st.skip = true; go(); });
      const so = $('#lskipO', root); if (so) so.addEventListener('click', () => { st.skip = true; so.remove(); scenarioTick(); });
    }
    function scenarioTick() {
      if (sc && !st.snap && !sc.observe) {
        const bl = SC.baseline(sc, lab), w = $('#lbase', root), b = $('#liv', root), k = $('#lskip', root);
        if (w) w.textContent = bl.ready ? T('lab.baseOk') : bl.n ? F('lab.baseB', {k: bl.k, n: bl.n}) : F('lab.baseT', {s: n(bl.s, 0)});
        if (b) b.disabled = !(bl.ready && st.guess); if (k) k.disabled = !bl.ready;
        return;
      }
      if (!sc || !st.snap || st.res) return;
      const ev = SC.evaluate(sc, lab, st.snap);
      /* sonuç, tahmin seçilmeden (ya da açıkça atlanmadan) gösterilmez */
      if (ev.ready && ev.answer && !st.guess && !st.skip) { const w0 = $('#lwait', root); if (w0) w0.textContent = T('lab.readyGuess'); return; }
      if (ev.ready && ev.answer) { st.res = Object.assign({answer: ev.answer, s: Object.assign(ev.s, {tI: st.snap.tI})}); lab.log('scenario_result', {id: sc.id, answer: ev.answer, guess: st.guess}); if (side === 'task') updateSide(true); return; }
      const w = $('#lwait', root);
      if (w) w.textContent = sc.minAfter ? F('lab.waitB', {k: Math.min(ev.s.after.length, sc.minAfter), n: sc.minAfter}) : F('lab.waitT', {s: n(Math.max(0, st.snap.tI + (sc.minTime || 0) - lab.t), 0)});
    }
    function insideHTML() {
      const I = ME.inside(lab), r = (k, v, u = '') => `<tr><td>${k}</td><td>${v}</td><td class="muted">${u}</td></tr>`;
      return `<p class="lab-warnbox">${T('lab.in.note')}</p><div class="tbl"><table><tbody>
        ${r('x', n(I.x * 1000), 'mL')}${r(T('lab.in.xEq'), n(I.xEq * 1000), 'mL')}${r(T('lab.in.above'), I.above != null ? n(I.above * 1000) : '—', 'mL')}
        ${r('Palv = x/C − M', n(I.Palv, 2), 'cmH₂O')}${r('M(t)', n(I.M, 2), 'cmH₂O')}${r('C', n(I.C * 1000), 'mL/cmH₂O')}${r('Rin / Rexp / Rv', `${n(I.Rin)} / ${n(I.Rexp)} / ${n(I.Rv)}`, 'cmH₂O·s/L')}
        ${r('τin = Rin·C', n(I.tauIn, 2), 's')}${r('τexp = (Rexp+Rv)·C', n(I.tauExp, 2), 's')}${r(T('lab.in.neural'), `Mmax ${n(I.neural.Mmax, 1)} · ${n(I.neural.rr)} /min · Ti ${n(I.neural.ti, 2)} s`, '')}
        ${r(T('lab.in.state'), `${T('lab.mode.' + I.mode)} · ${T('lab.st.' + I.state)}`, '')}${r(T('lab.in.step'), n(I.h * 1000, 3), 'ms')}${r(T('lab.in.res'), I.residual.toExponential(1), 'L')}${r(T('lab.in.ver'), I.version, '')}
      </tbody></table></div>
      <label class="lf lf-chk"><input type="checkbox" id="lshowM2"${waves.showM ? ' checked' : ''}> <span>${T('lab.showMD')}</span></label>
      <h4 class="h-xs">${T('lab.in.eq')}</h4><pre class="lab-eq">Paw = x/C + R·Q − M(t)
Palv = x/C − M(t)        dx/dt = Q
PC:  Q = (P_hedef(t) + M − x/C) / Rin
VC:  Q = Qset
EXP: Q = (PEEP + M − x/C) / (Rexp + Rv)
     Paw = PEEP − Rv·Q
M(t) = Mmax · sin²(π·u),  0 ≤ u ≤ 1</pre><p class="muted small">${T('lab.in.eqNote')}</p>`;
    }
    function eventsHTML() {
      const E = ME.efforts(lab);
      const evs = lab.events.filter(e => showBreathEv || !['breath_start', 'insp_end', 'neural_start'].includes(e.type)).slice(-80).reverse();
      return `<p><b>${T('lab.ev.efforts')}</b> ${F('lab.cmp.effortsV', {tr: E.triggered, in: E.ineffective, ov: E.overlap})}${E.double ? ' · ' + F('lab.cmp.doubleY', {n: E.double}) : ''}</p>
        <label class="lf lf-chk"><input type="checkbox" id="lshowB"${showBreathEv ? ' checked' : ''}> <span>${T('lab.ev.showBreath')}</span></label>
        <ol class="lab-evs">${evs.map(e => `<li class="ev-${e.type}"><span class="ev-t">${n(e.t, 2)} s</span> ${esc(evText(e))}</li>`).join('')}</ol>`;
    }
    const kv = d => (d || []).map(x => { const f = FD[x.k]; const fmtv = v => typeof v === 'number' && f ? `${n(v * (f.k || 1), f.d)} ${f.u}` : typeof v === 'object' && v ? '…' : T('lab.v.' + v) !== 'lab.v.' + v ? T('lab.v.' + v) : String(v); return `${T('lab.f.' + x.k)} ${x.old !== undefined ? fmtv(x.old) + ' → ' : ''}${fmtv(x.nw)}`; }).join('; ');
    function evText(e) {
      const o = {n: e.breath ?? '', cause: e.cause ? T('lab.cause.' + e.cause) : '', kind: e.kind ? T('lab.btl.' + e.kind) : '', mode: e.mode ? T('lab.mode.' + e.mode) : '',
        vt: e.VTi != null ? n(e.VTi * 1000) : '', ti: e.Ti != null ? n(e.Ti, 2) : '', paw: e.Paw != null ? n(e.Paw, 1) : '', pmax: e.Pmax != null ? n(e.Pmax) : '', diff: kv(e.diff),
        alarm: e.alarm ? T('lab.al.' + e.alarm) : '', hold: e.kind ? T('lab.hold.' + e.kind) : '', passive: e.passive === false ? T('lab.ev.notPassive') : e.passive ? T('lab.ev.passive') : '',
        why: e.errors ? e.errors.map(x => T('lab.f.' + x.k.replace('backupPC.', '')) + ': ' + T('lab.err.' + x.code)).join('; ') : e.why ? T('lab.why.' + e.why) : '',
        pel: e.Pel_old != null ? `${n(e.Pel_old, 1)} → ${n(e.Pel_new, 1)}` : '', id: e.id ?? '', ans: e.answer ? T('lab.sc.' + e.id + '.o.' + e.answer) : '', s: e.apneaTime != null ? n(e.apneaTime) : ''};
      if (e.type === 'hold_start' || e.type === 'hold_end' || e.type === 'hold_requested' || e.type === 'hold_unavailable') o.hold = T('lab.hold.' + e.kind);
      if (e.type === 'scenario_result') { o.ans = T('lab.sc.' + e.id + '.o.' + e.answer); }
      const key = 'lab.ev.' + e.type, t = T(key);
      return t === key ? e.type : MVA.fill(t, o);
    }
    function easyHTML() {
      const L = TE.live(lab, depth);
      return `<div class="seg lab-depth" role="group" aria-label="${T('lab.depth')}">${[1, 2, 3].map(d => `<button type="button" class="chip" data-depth="${d}" aria-pressed="${d === depth}">${T('lab.depth.' + d)}</button>`).join('')}</div>
        ${sc ? `<p>${esc(T('lab.sc.' + sc.id + '.why'))}</p>` : ''}
        <ul class="lab-teach">${L.map(x => `<li class="tc-${x.kind}">${x.kind === 'model' ? `<span class="tc-tag">${T('lab.in.tag')}</span> ` : ''}${x.html}</li>`).join('')}</ul>
        ${depth >= 3 ? `<p class="muted small">${T('lab.depth3')}</p>` : ''}`;
    }
    function updateSide(force) {
      const p = $('#lpanel', root);
      if (side === 'task') { if (force) { p.innerHTML = taskHTML(); bindTask(); } scenarioTick(); return; }
      if (side === 'easy') p.innerHTML = easyHTML();
      if (side === 'inside') p.innerHTML = insideHTML();
      if (side === 'events') p.innerHTML = eventsHTML();
      $$('[data-depth]', p).forEach(b => b.addEventListener('click', () => { depth = +b.dataset.depth; updateSide(true); }));
      const m2 = $('#lshowM2', p); if (m2) m2.addEventListener('change', () => { waves.showM = m2.checked; waves.rng = {}; $('#lshowM', root).setAttribute('aria-pressed', waves.showM); });
      const sb = $('#lshowB', p); if (sb) sb.addEventListener('change', () => { showBreathEv = sb.checked; updateSide(true); });
    }

    /* ---------- döngü ---------- */
    let nb = -1;
    function drawAll(full) {
      waves.draw(lab); loops.draw(lab, ref);
      const now = performance.now(), nb2 = lab.breaths.length;
      if (full || now - tUI > 300 || nb2 !== nb) {
        tUI = now; nb = nb2;
        updateNums(); updateAlarms(); updatePend(); markDirty();
        if (lab.backup !== !!$('#lbkoff', root) || (lab.backup && lab.backupReturn !== !!($('#lbkoff', root) || {}).disabled)) renderBackup();
        if (side === 'task') scenarioTick(); else if (!(side === 'events' && root.contains(document.activeElement) && document.activeElement.id === 'lshowB')) updateSide(false);
        const b = ME.lastBreath(lab);
        if (b) { const done = lab.breaths.filter(x => x.tInspEnd != null).slice(-3); const per = done.length === 3 && Math.max(...done.map(x => x.VTi)) - Math.min(...done.map(x => x.VTi)) < .001; lastMech = {VT: b.VTi, f: ME.monitor(lab).ftotal.value, passive: lab.P.Mmax === 0 && (lab.mode === 'VC-AC' || lab.mode === 'PC-AC'), periodic: per}; }
      }
    }
    function frame(ts) {
      const wall = tPrev ? (ts - tPrev) / 1000 : 0; tPrev = ts;
      if (running && lab.state !== 'INVALID') { try { lab.advance(CT.frameStep(wall, speed)); } catch (e) { console.error(e); running = false; } }
      drawAll(false);
      raf = requestAnimationFrame(frame);
    }
    const vis = () => { tPrev = 0; };
    document.addEventListener('visibilitychange', vis);
    create();
    raf = requestAnimationFrame(frame);
    return {dispose() { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', vis); }};
  }

  /* ================= Gaz deneyleri ================= */
  function mountGas(el, scId) {
    const sc = scId ? SC.get(scId) : null;
    const g15 = SC.get('VL15').gas, g16 = SC.get('VL16').gas;
    const c = {VT: g15.VT_L * 1000, VD: g15.VD_L * 1000, f: g15.f_min, VCO2: g15.VCO2_mL_min_STPD};
    const o = {FiO2: g16.FiO2_fraction, PB: g16.PB_mmHg, PACO2: g16.PACO2_mmHg, RQ: g16.RQ, Hb: g16.Hb_g_dL, PvO2: g16.PvO2_mmHg, s: g16.shunt_fraction * 100};
    let histC = [], histO = [];
    const fld = (id, k, v, u) => `<label class="lf"><span class="lf-n">${T('lab.gas.' + k)}</span><span class="lf-in"><input id="${id}" data-k="${k}" inputmode="decimal" value="${n(v, Number.isInteger(v) ? 0 : 2)}"><span class="lf-u">${u}</span></span><span class="lf-e" role="alert"></span></label>`;
    const task = s => s ? `<div class="lab-gtask"><p class="eyebrow">${s.id} · ${T('lab.synthAdult')}</p><h3 class="h-sm">${esc(T('lab.sc.' + s.id + '.title'))}</h3><p><b>${T('lab.task')}:</b> ${esc(T('lab.sc.' + s.id + '.task'))}</p>
      <fieldset class="lab-q"><legend>${T('lab.predict')}</legend><p>${esc(T('lab.sc.' + s.id + '.q'))}</p>${s.opts.map(x => `<label class="lab-opt"><input type="radio" name="gq" value="${x}"> <span>${esc(T('lab.sc.' + s.id + '.o.' + x))}</span></label>`).join('')}</fieldset>
      <button type="button" class="btn" id="gcheck" disabled>${T('lab.gas.check')}</button><div id="gres"></div></div>` : '';
    el.innerHTML = `${head('gaz')}
    <section class="wrap lab-gas">
      <p class="lab-warnbox">${T('lab.gas.assume')}</p>
      ${task(sc)}
      <div class="lab-gcards">
        <form class="lab-gcard" id="gco2" novalidate><h2 class="h-sm">${T('lab.gas.co2T')}</h2><p class="muted small">${T('lab.gas.co2D')}</p>
          <pre class="lab-eq">VA = f · (VT − VD)          L/min, BTPS
PACO₂ = 0,863 · VCO₂ / VA   mmHg</pre>
          ${fld('gVT', 'VT', c.VT, 'mL')}${fld('gVD', 'VD', c.VD, 'mL')}${fld('gf', 'f', c.f, '/min')}${fld('gVCO2', 'VCO2', c.VCO2, 'mL/min STPD')}
          <div class="lab-actions"><button type="submit" class="btn">${T('lab.gas.calc')}</button><button type="button" class="btn-ghost" id="gimp">${T('lab.gas.import')}</button></div><p class="muted small" id="gimpN"></p>
          <div id="gco2r"></div></form>
        <form class="lab-gcard" id="go2" novalidate><h2 class="h-sm">${T('lab.gas.o2T')}</h2><p class="muted small">${T('lab.gas.o2D')}</p>
          <pre class="lab-eq">PAO₂ = FiO₂·(PB − 47) − PACO₂·(FiO₂ + (1 − FiO₂)/RQ)
S(P) = (P³ + 150P) / (P³ + 150P + 23400)
CO₂ = 1,34·Hb·S + 0,003·P
CaO₂ = (1 − s)·Cc′O₂ + s·Cv̄O₂</pre>
          ${fld('gFi', 'FiO2', o.FiO2, '')}${fld('gPB', 'PB', o.PB, 'mmHg')}${fld('gPC', 'PACO2', o.PACO2, 'mmHg')}${fld('gRQ', 'RQ', o.RQ, '')}${fld('gHb', 'Hb', o.Hb, 'g/dL')}${fld('gPv', 'PvO2', o.PvO2, 'mmHg')}${fld('gS', 's', o.s, '%')}
          <p class="muted small">${T('lab.gas.fixed')}</p>
          <div class="lab-actions"><button type="submit" class="btn">${T('lab.gas.calc')}</button></div>
          <div id="go2r"></div></form>
      </div>
      <p class="model-note">${T('lab.gas.note')}</p>
    </section>`;
    const root = $('.lab-gas', el);
    const read = (form) => { const out = {}; let bad = false; $$('input[data-k]', form).forEach(i => { const r = CT.parseNum(i.value), e = i.closest('.lf').querySelector('.lf-e'); if (r.v == null) { bad = true; e.textContent = T('lab.err.' + r.why); } else { e.textContent = ''; out[i.dataset.k] = r.v; } }); return bad ? null : out; };
    const st = (r, d, u) => r.status === 'valid' ? `<b>${n(r.value, d)}</b> ${u}` : `<span class="muted">— · ${esc(r.reasonCodes.map(x => T('lab.why.' + x)).join(' · '))}</span>`;
    function calcC(v) {
      const r = GAS.co2({VT_L: v.VT / 1000, VD_L: v.VD / 1000, f_min: v.f, VCO2: v.VCO2});
      histC.push({v, r}); if (histC.length > 2) histC.shift();
      const [A, B] = histC.length === 2 ? histC : [null, histC[0]];
      const row = (h, lab) => `<tr><td>${lab}</td><td>${n(h.v.VT)} / ${n(h.v.VD)} / ${n(h.v.f)}</td><td>${st(h.r.VA, 2, 'L/min')}</td><td>${st(h.r.PACO2, 1, 'mmHg')}</td></tr>`;
      $('#gco2r', root).innerHTML = `<div class="tbl"><table><thead><tr><th></th><th>VT / VD / f</th><th>VA</th><th>PACO₂</th></tr></thead><tbody>${A ? row(A, T('lab.gas.prev')) : ''}${row(B, T('lab.gas.cur'))}</tbody></table></div>
        ${A && A.r.VA.value && B.r.VA.value ? `<p>${F('lab.gas.ratio', {va: n(B.r.VA.value / A.r.VA.value, 2), pc: n(B.r.PACO2.value / A.r.PACO2.value, 2)})}</p>` : ''}<p class="muted small">${T('lab.gas.co2Lbl')}</p>`;
      return r;
    }
    function calcO(v) {
      const inp = {FiO2: v.FiO2, PB: v.PB, PACO2: v.PACO2, RQ: v.RQ, Hb: v.Hb, PvO2: v.PvO2, s: v.s / 100};
      const r = GAS.shunt(inp); histO.push({v, r}); if (histO.length > 2) histO.shift();
      if (r.PaO2.status !== 'valid') { $('#go2r', root).innerHTML = `<p class="lab-err">${st(r.PAO2.status !== 'valid' ? r.PAO2 : r.PaO2, 1, '')}</p>`; return r; }
      const [A] = histO.length === 2 ? histO : [null];
      const kv2 = (k, x, d, u) => `<div class="lnum"><span class="ln-l">${k}</span><b class="ln-v">${n(x, d)}</b><span class="ln-u">${u}</span></div>`;
      $('#go2r', root).innerHTML = `<div class="lab-nums">${kv2('PIO₂', r.PAO2.PIO2, 1, 'mmHg')}${kv2('PAO₂', r.PAO2.value, 1, 'mmHg')}${kv2('Cc′O₂', r.CcO2.value, 2, 'mL/dL')}${kv2('Cv̄O₂', r.CvO2.value, 2, 'mL/dL')}${kv2('CaO₂', r.CaO2.value, 2, 'mL/dL')}${kv2('PaO₂', r.PaO2.value, 1, 'mmHg')}${kv2(T('lab.gas.sao2'), r.SaO2.value, 1, '%')}${kv2(T('lab.gas.naiveV'), r.naive, 1, 'mmHg')}</div>
        ${DR.o2Svg(GAS, r, inp)}
        <p class="muted small">${T('lab.gas.chartNote')}</p>
        ${A && A.r.PaO2.status === 'valid' ? `<p>${F('lab.gas.o2cmp', {s1: n(A.v.s, 0), s2: n(v.s, 0), a1: n(A.r.PaO2.value, 1), a2: n(r.PaO2.value, 1), c1: n(A.r.CaO2.value, 2), c2: n(r.CaO2.value, 2)})}</p>` : ''}`;
      return r;
    }
    $('#gco2', root).addEventListener('submit', e => { e.preventDefault(); const v = read(e.target); if (v) calcC(v); });
    $('#go2', root).addEventListener('submit', e => { e.preventDefault(); const v = read(e.target); if (v) calcO(v); });
    $('#gimp', root).addEventListener('click', () => {
      const m = lastMech, msg = $('#gimpN', root);
      if (!m || !m.passive || !m.periodic || !m.f) { msg.textContent = T('lab.gas.importNo'); return; }
      $('#gVT', root).value = n(m.VT * 1000); $('#gf', root).value = n(m.f, 1); msg.textContent = T('lab.gas.importOk');
    });
    calcC(read($('#gco2', root))); calcO(read($('#go2', root)));
    if (sc) {
      $$('input[name=gq]', root).forEach(r => r.addEventListener('change', () => { $('#gcheck', root).disabled = false; }));
      $('#gcheck', root).addEventListener('click', () => {
        /* Senaryo deneyi formda iki adımda çalışır (A: temel, B: müdahale); yanıt bu iki hesaptan okunur */
        const guess = ($('input[name=gq]:checked', root) || {}).value; let ans, txt;
        const set = (id, v, d) => { $(id, root).value = n(v, d); };
        if (sc.id === 'VL15') {
          set('#gVT', g15.VT_L * 1000, 0); set('#gVD', g15.VD_L * 1000, 0); set('#gVCO2', g15.VCO2_mL_min_STPD, 0);
          set('#gf', g15.f_min, 0); histC = []; const a = calcC(read($('#gco2', root)));
          set('#gf', 2 * g15.f_min, 0); const b = calcC(read($('#gco2', root)));
          const rt = b.PACO2.value / a.PACO2.value; ans = Math.abs(rt - .5) < 1e-6 ? 'half' : rt > 1 + 1e-6 ? 'double' : Math.abs(rt - 1) < 1e-6 ? 'same' : 'half';
          txt = F('lab.sc.VL15.res', {a: n(a.PACO2.value, 1), b: n(b.PACO2.value, 1)});
        } else {
          set('#gFi', g16.FiO2_fraction, 2); set('#gPB', g16.PB_mmHg, 0); set('#gPC', g16.PACO2_mmHg, 0); set('#gRQ', g16.RQ, 2); set('#gHb', g16.Hb_g_dL, 0); set('#gPv', g16.PvO2_mmHg, 0);
          set('#gS', 20, 0); histO = []; const a = calcO(read($('#go2', root)));
          set('#gS', 40, 0); const b = calcO(read($('#go2', root)));
          ans = b.CaO2.value < a.CaO2.value - 1e-9 ? 'toward_v' : b.CaO2.value > a.CaO2.value + 1e-9 ? 'toward_c' : 'same';
          txt = F('lab.sc.VL16.res', {a: n(a.CaO2.value, 2), b: n(b.CaO2.value, 2), pa: n(a.PaO2.value, 1), pb: n(b.PaO2.value, 1), na: n(a.naive, 1)});
        }
        txt += ' ' + T('lab.gas.inForm');
        $('#gres', root).innerHTML = `<div class="lab-res ${guess === ans ? 'ok' : 'no'}"><p><b>${T('lab.engineSays')}:</b> ${esc(T('lab.sc.' + sc.id + '.o.' + ans))}</p><p>${guess === ans ? T('lab.match') : T('lab.mismatch')}</p><p>${esc(txt)}</p></div>
          <h4 class="h-xs">${T('lab.expected')}</h4><p>${esc(T('lab.sc.' + sc.id + '.exp'))}</p><div class="lab-must"><b>${T('lab.mustNot')}</b> ${esc(T('lab.sc.' + sc.id + '.must'))}</div>`;
      });
    }
    return {dispose() {}};
  }

  /* ================= Model ve doğrulama ================= */
  function mountModel(el) {
    const S = window.MVA_CONTENT.sources, byId = new Map(S.map(s => [s.id, s]));
    const rows = ['mech', 'modes', 'effort', 'sync', 'meas', 'gas', 'pt'];
    el.innerHTML = `${head('model')}
    <section class="wrap doc-wrap lab-model"><article class="doc">
      <h2>${T('lab.mo.what')}</h2><p>${T('lab.mo.whatD')}</p>
      <h2>${T('lab.mo.tags')}</h2><ul>${['B', 'M', 'U', 'S'].map(k => `<li><b>[${k}]</b> ${T('lab.mo.tag.' + k)}</li>`).join('')}</ul>
      <h2>${T('lab.mo.scope')}</h2>
      <div class="tbl"><table><thead><tr><th>${T('lab.mo.layer')}</th><th>${T('lab.mo.in')}</th><th>${T('lab.mo.out')}</th></tr></thead><tbody>${rows.map(r => `<tr><td>${T('lab.mo.r.' + r)}</td><td data-h="${esc(T('lab.mo.in'))}">${T('lab.mo.r.' + r + '.in')}</td><td data-h="${esc(T('lab.mo.out'))}">${T('lab.mo.r.' + r + '.out')}</td></tr>`).join('')}</tbody></table></div>
      <h2>${T('lab.mo.rules')}</h2><ul>${['x', 'set', 'hold', 'thr', 'apply', 'cpap', 'gas', 'dx'].map(k => `<li>${T('lab.mo.rule.' + k)}</li>`).join('')}</ul>
      <h2>${T('lab.mo.ver')}</h2><p>${T('lab.mo.verD')}</p>
      <div class="tbl"><table><thead><tr><th>${T('lab.mo.vk')}</th><th>${T('lab.mo.vs')}</th></tr></thead><tbody>${['phys', 'state', 'browser', 'clin'].map(k => `<tr><td>${T('lab.mo.v.' + k)}</td><td data-h="${esc(T('lab.mo.vs'))}">${T('lab.mo.v.' + k + '.s')}</td></tr>`).join('')}</tbody></table></div>
      <h2>${T('lab.mo.cmp')}</h2><p>${T('lab.mo.cmpD')}</p>
      <h2>${T('lab.mo.src')}</h2><p class="muted small">${T('lab.mo.srcD')}</p>
      <ol class="srcs">${SRC.map(([p, a]) => { const s = byId.get(a); return s ? `<li value="${a}"><span class="sn">[${a}]</span> <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>. <span class="muted">${esc(s.pub)}, ${s.year ?? T('src.noyear')}. ${esc(s.scope)}</span> <a class="cite" href="#/kaynaklar/${a}">${T('lab.mo.inAtlas')}</a></li>` : ''; }).join('')}</ol>
    </article></section>`;
    return {dispose() {}};
  }

  return {mount, CARD2MODE};
})();
