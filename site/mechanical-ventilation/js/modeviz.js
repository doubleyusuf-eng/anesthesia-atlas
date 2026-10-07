'use strict';
/* Mekanik Ventilasyon Atlası · mod görselleştirme
   Her mod kartı için: model girdileri (hasta mekaniği, efor), senaryo düğmeleri, ekran kanalları, 3B arayüz.
   Senaryolar ezber yerine fizyolojik yanıtı göstermek içindir: aynı mod, farklı hasta → farklı eğri.
   Sayılar örnek model girdisidir (gorseller/MODEL_NOTU.md ile aynı referans: C 0,05 L/cmH₂O, R 10 cmH₂O·s/L, PEEP 5);
   klinik hedef, normal değer veya başlangıç ayarı değildir. */
const MODEVIZ = (() => {
  const ADULT = {R: 10, C: .05}, NEO = {R: 50, C: .001};
  const EFF = {
    off: {on: false},
    weak: {on: true, rate: 14, pmax: 2, ti: .9},
    on: {on: true, rate: 18, pmax: 6, ti: .9},
    strong: {on: true, rate: 26, pmax: 13, ti: 1.0},
    neoOn: {on: true, rate: 50, pmax: 3, ti: .35, ediPeak: 10},
    neoOff: {on: false}
  };
  /* Senaryo grupları: her grup bir düğme kümesi; seçenek hasta parametrelerini değiştirir */
  const GROUPS = {
    effort:   [['off', {effort: EFF.off}], ['on', {effort: EFF.on}], ['strong', {effort: EFF.strong}]],
    effortSp: [['weak', {effort: EFF.weak}], ['on', {effort: EFF.on}], ['strong', {effort: EFF.strong}]],
    effortAp: [['on', {effort: EFF.on}], ['weak', {effort: EFF.weak}], ['off', {effort: EFF.off}]],
    mech:     [['norm', {C: .05, R: 10}], ['lowC', {C: .025, R: 10}], ['highR', {C: .05, R: 20}]],
    mechNeo:  [['norm', {C: .001, R: 50}], ['surf', {C: .002, R: 50}], ['lowCneo', {C: .0006, R: 50}]],
    effortNeo:[['off', {effort: EFF.neoOff}], ['on', {effort: EFF.neoOn}]],
    leak:     [['noleak', {leak: 0}], ['leak', {leak: .12}], ['bigleak', {leak: .3}]]
  };
  const D = (o) => Object.assign({pt: 'adult', eff: 'on', iface: 'ett', groups: ['effort', 'mech'], ch: [], win: 8, speed: 1}, o);
  const CFG = {
    'vc-cmv': D({eff: 'off'}), 'pc-cmv': D({eff: 'off'}),
    'vc-simv': D({}), 'pc-simv': D({}),
    'prvc': D({eff: 'off', show: ['pinsp']}), 'prvc-simv': D({show: ['pinsp']}),
    'psv': D({groups: ['effortSp', 'mech']}), 'cpap': D({groups: ['effortSp', 'mech']}),
    'volume-support': D({groups: ['effortSp', 'mech'], show: ['ps']}),
    'bilevel': D({win: 12}), 'aprv': D({win: 12}),
    'mmv': D({eff: 'weak', groups: ['effortSp', 'mech'], show: ['mmv'], win: 15}),
    'pav-plus': D({groups: ['effortSp', 'mech'], ch: ['pmus']}), 'pps': D({groups: ['effortSp', 'mech'], ch: ['pmus']}),
    'nava': D({iface: 'nava', groups: ['effortSp', 'mech'], ch: ['edi']}),
    'niv-nava': D({iface: 'niv', groups: ['effortSp', 'leak'], ch: ['edi']}),
    'asv-adaptive-support': D({eff: 'off', show: ['pinsp']}), 'intellivent-asv': D({eff: 'off', show: ['pinsp']}),
    'automode': D({eff: 'off', show: ['auto'], win: 15}),
    'smartcare': D({groups: ['effortSp', 'mech']}), 'variable-ps': D({groups: ['effortSp', 'mech']}),
    'niv-s': D({iface: 'niv', groups: ['effortSp', 'leak']}), 'niv-st': D({iface: 'niv', groups: ['effortAp', 'leak'], win: 15}),
    'niv-t-pc': D({iface: 'niv', groups: ['effort', 'leak']}),
    'avaps': D({iface: 'niv', groups: ['mech', 'leak'], show: ['ps'], win: 15}), 'avaps-ae': D({iface: 'niv', groups: ['mech', 'leak'], show: ['ps'], win: 15}),
    'ivaps': D({iface: 'niv', groups: ['mech', 'leak'], show: ['ps'], win: 15}),
    'sleep-asv': D({iface: 'niv', eff: 'periodic', groups: ['leak'], win: 120, speed: 4, ch: ['pmus']}),
    'apap': D({iface: 'niv', groups: ['effortSp', 'leak']}),
    'neonatal-tcpl': D({pt: 'neo', eff: 'neoOff', bare: true, groups: ['effortNeo', 'mechNeo'], win: 4}),
    'neonatal-ac-sippv': D({pt: 'neo', eff: 'neoOn', bare: true, groups: ['effortNeo', 'mechNeo'], win: 4}),
    'neonatal-vg': D({pt: 'neo', eff: 'neoOff', bare: true, groups: ['effortNeo', 'mechNeo'], win: 6, show: ['pinsp']}),
    'ncpap': D({pt: 'neo', eff: 'neoOn', bare: true, iface: 'nasal', groups: ['effortNeo'], win: 4}),
    'nippv': D({pt: 'neo', eff: 'neoOn', bare: true, iface: 'nasal', groups: ['effortNeo', 'mechNeo'], win: 4}),
    'hfov': D({pt: 'neo', eff: 'neoOff', bare: true, groups: ['mechNeo'], win: 1, ch: ['palv']}),
    'hfov-vg': D({pt: 'neo', eff: 'neoOff', bare: true, groups: ['mechNeo'], win: 1, ch: ['palv'], show: ['amp']}),
    'nhfov': D({pt: 'neo', eff: 'neoOn', bare: true, iface: 'nasal', groups: ['effortNeo'], win: 2, ch: ['palv']}),
    'hfjv': D({eff: 'off', iface: 'jet', win: 3}), 'hfpv': D({eff: 'off', win: 8}),
    'fcv': D({eff: 'off'}),
    'mouthpiece': D({iface: 'mouth', groups: ['mech'], win: 30, show: ['mouth']}),
    'negative-pressure': D({eff: 'off', iface: 'cuirass', ch: ['pext']}),
    'vaps-intrabreath': D({eff: 'off'}),
    'independent-lung': D({eff: 'off', iface: 'dlt', two: true, groups: ['effort'], ch: ['flowL', 'volL']})
  };
  const cfg = id => CFG[id] || D({});

  function patientFor(c) {
    const p = Object.assign({}, c.pt === 'neo' ? NEO : ADULT);
    p.effort = c.eff === 'periodic' ? {on: true, rate: 16, pmax: 6, ti: 1, periodic: 1, periodicT: 60} : Object.assign({}, EFF[c.eff] || EFF.off);
    if (c.two) Object.assign(p, {R: 14, C: .028, second: {R: 14, C: .011}});
    if (['niv', 'nasal'].includes(c.iface)) p.leak = .12;
    return p;
  }
  function channels(c) {
    const neo = c.pt === 'neo';
    if (c.two) return ['paw', ...c.ch];
    return ['paw', neo ? 'flowml' : 'flow', neo ? 'volml' : 'vol', ...c.ch];
  }

  /* ---------- Denetleyici: simülasyon + ekran + döngüler + 3B ---------- */
  /* el: {scope, loops, stage, nums, chips, play}; opts: {id, settings, patient, cfg} */
  function run(el, opts) {
    const id = opts.id, c = opts.cfg || cfg(id);
    const sim = new VENT.Sim(VENT.make(id, opts.settings), opts.patient || patientFor(c));
    const labels = {flow: MVA.t('ch.flow'), vol: MVA.t('ch.vol'), flowLR: MVA.t('ch.flowLR'), volLR: MVA.t('ch.volLR')};
    const scope = new SCOPE.Scope(el.scope, {channels: opts.channels || channels(c), window: c.win, every: c.win <= 2 ? .002 : c.win > 30 ? .05 : .01, labels, timeLabel: MVA.t('ch.time')});
    const loops = el.loops ? new SCOPE.Loops(el.loops, {ml: c.pt === 'neo', labels: {pv: MVA.t('loop.pv'), fv: MVA.t('loop.fv'), vol: MVA.t('ch.vol'), flow: MVA.t('ch.flow'), ref: MVA.t('loop.ref')}}) : null;
    let lung = null;
    if (el.stage && typeof LUNG3D !== 'undefined' && LUNG3D) lung = LUNG3D.mount(el.stage, {iface: c.iface, bare: c.bare, two: c.two});
    const st = {sim, scope, loops, lung, running: true, speed: c.speed, raf: 0, lastEv: 0, nextNum: 0, cfg: c, dead: false};
    /* Isınma: ekran dolu başlasın */
    sim.run(Math.max(6, c.win * .5), 1, null);
    let evIdx = sim.events.length;
    const feed = s => {
      let mark = null, nb = false;
      while (evIdx < sim.events.length) { const e = sim.events[evIdx++]; if (e.type === 'switch') mark = MVA.t('ev.switch.' + e.trig); if (e.type !== 'switch') nb = true; }
      scope.push(s, mark); loops && loops.push(s, nb);
    };
    sim.run(c.win, scope.every, feed);
    let last = performance.now();
    const frame = now => {
      if (st.dead) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (st.running && !document.hidden) {
        sim.run(dt * st.speed, scope.every, feed);
        scope.draw(); loops && loops.draw();
        if (lung) lung.update(sim.sample(), sim);
        if (now > st.nextNum) { st.nextNum = now + 400; el.nums && renderNums(el.nums, sim, c); }
      }
      st.raf = requestAnimationFrame(frame);
    };
    scope.draw(); loops && loops.draw(); el.nums && renderNums(el.nums, sim, c);
    st.raf = requestAnimationFrame(frame);
    st.toggle = v => { st.running = v ?? !st.running; return st.running; };
    st.apply = (o) => sim.setPatient(o, o.instant ? .05 : 1.2);
    st.dispose = () => { st.dead = true; cancelAnimationFrame(st.raf); lung && lung.dispose(); };
    return st;
  }

  const fx = (v, d = 0) => v == null || !isFinite(v) ? '–' : MVA.num(v, d);
  function renderNums(box, sim, c) {
    const n = VENT.numerics(sim, c.win > 30 ? 90 : 30), neo = c.pt === 'neo', st = sim.mode.state || {};
    const peep = sim.mode.peep, items = [];
    const hf = /hfov|nhfov/.test(sim.mode._id || '') || c.win <= 2;
    if (n) {
      if (sim.mode.twoLevel) { items.push([MVA.t('num.phigh'), fx(st.phigh, 0), 'cmH₂O'], [MVA.t('num.plow'), fx(st.plow, 0), 'cmH₂O']); }
      else if (hf) items.push([MVA.t('num.pmean'), fx(sim.pmean, 0), 'cmH₂O']);
      else {
        items.push(['Ppeak', fx(sim.breaths.length ? sim.breaths[sim.breaths.length - 1].peak : null, 0), 'cmH₂O']);
        items.push(['PEEP', fx(sim.paw != null && sim.phase === 'exp' ? sim.paw : peep, 0), 'cmH₂O']);
      }
      items.push([hf ? 'VThf' : 'VT', neo ? fx(n.vt * 1000, 1) : fx(n.vt * 1000, 0), 'mL']);
      items.push(['f', fx(hf ? n.f / 60 : n.f, 0), hf ? 'Hz' : MVA.t('u.bpm')]);
      if (!hf) items.push(['VE', fx(n.mv, neo ? 2 : 1), MVA.t('u.lpm')]);
    }
    (c.show || []).forEach(k => {
      if (k === 'pinsp' && st.pinsp != null) items.push([MVA.t('num.pinsp'), fx(st.pinsp, 1), 'cmH₂O']);
      if (k === 'ps' && st.ps != null) items.push([MVA.t('num.ps'), fx(st.ps, 1), 'cmH₂O']);
      if (k === 'mmv' && sim.stats.mmv != null) items.push([MVA.t('num.mmv'), fx(sim.stats.mmv, 1), MVA.t('u.lpm')]);
      if (k === 'amp' && st.amp != null) items.push([MVA.t('num.amp'), fx(st.amp, 0), 'cmH₂O']);
      if (k === 'auto') items.push([MVA.t('num.auto'), MVA.t(sim.auto === 'sup' ? 'num.auto.sup' : 'num.auto.ctl'), '']);
      if (k === 'mouth') items.push([MVA.t('num.mouth'), MVA.t(sim.mouth ? 'num.mouth.on' : 'num.mouth.off'), '']);
    });
    if (sim.pt.leak) items.push([MVA.t('num.leak'), fx(sim.leak * 60, 0), MVA.t('u.lpm')]);
    box.innerHTML = items.map(([l, v, u]) => `<div class="num"><span class="nl">${l}</span><span class="nv">${v}</span><span class="nu">${u}</span></div>`).join('');
  }

  /* Senaryo düğmeleri */
  function chips(box, c, st) {
    box.innerHTML = c.groups.map(g => `<div class="chipgroup" role="group" aria-label="${MVA.t('sc.g.' + g)}"><span class="cg-l">${MVA.t('sc.g.' + g)}</span>${GROUPS[g].map(([k], i) => `<button type="button" class="chip" data-g="${g}" data-k="${k}">${MVA.t('sc.' + k)}</button>`).join('')}</div>`).join('');
    const cur = {};
    const init = g => { const effKey = Object.keys(EFF).find(k => k === c.eff); const opt = GROUPS[g].find(([k]) => k === effKey) || GROUPS[g].find(([k]) => (g === 'leak' && k === (['niv', 'nasal'].includes(c.iface) ? 'leak' : 'noleak'))) || GROUPS[g][0]; return opt[0]; };
    c.groups.forEach(g => { cur[g] = init(g); });
    const paint = () => box.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', cur[b.dataset.g] === b.dataset.k));
    paint();
    box.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      const g = b.dataset.g, k = b.dataset.k, o = GROUPS[g].find(x => x[0] === k)[1];
      cur[g] = k; paint(); st.apply(o);
    });
  }

  return {cfg, run, chips, patientFor, GROUPS, EFF};
})();
