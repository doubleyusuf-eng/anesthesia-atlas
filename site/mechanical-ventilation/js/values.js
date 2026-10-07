'use strict';
/* Mekanik Ventilasyon Atlası · "Değerler" alt sekmesi: açıklamalı ventilatör ekranı
   Markasız, genel bir ventilatör ekranı çizilir: üst çubuk (mod, alarm, manevra düğmeleri), solda eğriler, sağda ölçülen
   değerler, altta ayarlar. Tablodaki bir değere tıklanınca ekrandaki yeri vurgulanır ve eğri üzerinde gösterilir.
   Eğriler fizik motorundan üretilir (VC bekletmeli ya da PS, pasif/aktif model). Sayılar örnek model girdisidir. */
const VALUES = (() => {
  const T = k => MVA.t(k);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const n = (v, d = 0) => MVA.num(v, d);

  /* Tablo satırı (ilk sütun) → anahtar(lar), konum ve ilgili örnek mod */
  const ROWS = {
    'FiO₂': {k: 'fio2', loc: 'set+meas'},
    'VTi / VTe': {k: 'vt', loc: 'meas+curve'},
    'VT/PBW': {k: 'pbw', loc: 'calc'},
    'fset / ftotal': {k: 'f', loc: 'set+meas+curve'},
    'VE / MVe': {k: 've', loc: 'meas'},
    'Ppeak / PIP': {k: 'ppeak', loc: 'meas+curve'},
    'Pplat': {k: 'pplat', loc: 'man+meas+curve', mode: 'vc'},
    'PEEPset': {k: 'peep', loc: 'set+curve'},
    'PEEPtotal / PEEPi': {k: 'peeptot', loc: 'man+meas'},
    'ΔP': {k: 'dp', loc: 'calc+curve', mode: 'vc'},
    'Pmean / Paw mean': {k: 'pmean', loc: 'meas+curve'},
    'PS / ΔPsupport': {k: 'ps', loc: 'set+curve', mode: 'ps'},
    'IPAP / EPAP': {k: 'ipap', loc: 'other'},
    'Ti / Te / I:E': {k: 'ti', loc: 'set+meas+curve'},
    'Rise time / slope': {k: 'rise', loc: 'set+curve', mode: 'ps'},
    'Trigger': {k: 'trig', loc: 'set+curve', mode: 'ps'},
    'ETS / E-sens / cycling-off': {k: 'ets', loc: 'set+curve', mode: 'ps'},
    'Cstat / Cdyn': {k: 'cstat', loc: 'meas+calc', mode: 'vc'},
    'R / Raw': {k: 'r', loc: 'meas+calc', mode: 'vc'},
    'SpO₂': {k: 'spo2', loc: 'other'},
    'PaCO₂ / EtCO₂': {k: 'etco2', loc: 'meas+other'},
    'PaO₂/FiO₂': {k: 'pf', loc: 'other'},
    'P0.1': {k: 'p01', loc: 'man'},
    'Pocc': {k: 'pocc', loc: 'man'},
    'Edi': {k: 'edi', loc: 'other'},
    'RSBI': {k: 'rsbi', loc: 'calc'},
    'OI': {k: 'oi', loc: 'other'},
    'OSI': {k: 'osi', loc: 'other'}
  };
  const LOCS = ['set', 'meas', 'curve', 'man', 'calc', 'other'];

  /* ---------- Örnek veriler: fizik motorundan iki soluk ---------- */
  function capture(kind) {
    const vc = kind === 'vc';
    const sim = vc ? new VENT.Sim(VENT.make('vc-cmv', {vt: .45, rate: 15, ti: 1.1, pause: .3, peep: 5}), {R: 12, C: .045, effort: {on: false}})
                   : new VENT.Sim(VENT.make('psv', {ps: 8, peep: 5, ets: .25, rise: .15, trig: .05}), {R: 10, C: .05, effort: {on: true, rate: 16, pmax: 6, ti: 1, jitter: 0}});
    sim.run(12, 1);
    /* pencere bir ekspirasyonun ortasında başlasın (ilk soluk soldan biraz içeride görünsün) */
    let guard = 0; const lag = vc ? 1.4 : .6; while (!(sim.phase === 'exp' && sim.t - sim.lastEnd > lag && sim.t - sim.lastEnd < lag + .02) && guard++ < 20000) sim.run(.001, 1);
    const W = 8, pts = [], t0 = sim.t;
    sim.run(W, .01, s => pts.push({t: s.t - t0, paw: s.paw, flow: s.flow, vol: s.vol, pmus: s.pmus, phase: s.phase}));
    const br = sim.breaths.filter(b => b.t0 >= t0).map(b => ({start: b.t0 - t0, ti: b.ti, vt: b.vt, peak: b.peak, flowPeak: b.flowPeak, kind: b.kind, ets: b.ets, p: b.p}));
    const b0 = br[0], b1 = br[1];
    const at = t => pts[Math.min(pts.length - 1, Math.max(0, Math.round(t / .01)))];
    const D = {kind, pts, W, br, set: vc ? {vt: 450, f: 15, ti: 1.1, peep: 5, fio2: 40, pause: .3, trig: 2} : {ps: 8, peep: 5, fio2: 40, rise: .15, ets: 25, trig: 3}};
    const iPeak = pts.reduce((m, p, i) => p.t >= b0.start && p.t <= b0.start + b0.ti && p.paw > pts[m].paw ? i : m, Math.round(b0.start / .01));
    D.ppeak = pts[iPeak].paw; D.tPeak = pts[iPeak].t;
    D.peep = at(b1.start - .05).paw;
    D.vt = b0.vt * 1000; D.tiM = b0.ti; D.per = b1.start - b0.start; D.te = D.per - D.tiM; D.f = 60 / D.per;
    D.ve = D.vt / 1000 * D.f;
    D.pmean = pts.reduce((a, p) => a + p.paw, 0) / pts.length;
    D.tVmax = pts.reduce((m, p) => p.vol > m.vol ? p : m, pts[0]).t;
    if (vc) {
      D.pplat = at(b0.start + b0.ti - .03).paw; D.tPlat = [b0.start + b0.ti - .3 + .05, b0.start + b0.ti];
      D.flowI = .45 / (1.1 - .3); D.dp = D.pplat - D.peep; D.cstat = D.vt / D.dp; D.R = (D.ppeak - D.pplat) / D.flowI;
    } else {
      D.ps = 8; D.etsFlow = b0.flowPeak * .25; D.tCycle = b0.start + b0.ti;
      /* hasta eforunun başladığı an: Pmus eşiği */
      const pre = pts.filter(p => p.t < b0.start && p.t > b0.start - 1);
      const on = pre.find(p => p.pmus > .2); D.tEffort = on ? on.t : b0.start - .1;
    }
    D.b0 = b0; D.b1 = b1;
    return D;
  }

  /* ---------- Ekran SVG ---------- */
  const VW = 1200, VH = 720, WX = 64, WR = 880, CH = [[78, 236], [256, 414], [434, 560]];
  function screenSVG(D) {
    const xs = t => WX + t / D.W * (WR - WX);
    const ch = (key, lo, hi, i) => { const [y0, y1] = CH[i]; return v => y1 - (v - lo) / (hi - lo) * (y1 - y0); };
    const pMax = Math.ceil((Math.max(...D.pts.map(p => p.paw)) + 3) / 5) * 5, fMax = Math.ceil(Math.max(...D.pts.map(p => Math.abs(p.flow))) * 2 + .5) / 2, vMax = Math.ceil(Math.max(...D.pts.map(p => p.vol)) * 10 + 1) / 10;
    const yP = ch('p', 0, pMax, 0), yF = ch('f', -fMax, fMax, 1), yV = ch('v', 0, vMax, 2);
    D.map = {xs, yP, yF, yV, pMax, fMax, vMax};
    const line = (get, y) => 'M' + D.pts.map(p => `${xs(p.t).toFixed(1)},${y(get(p)).toFixed(1)}`).join('L');
    const vc = D.kind === 'vc', s = D.set;
    const tile = (k, l, v, u, x, y, w = 140) => `<g class="vt-tile" data-k="${k}" transform="translate(${x},${y})"><rect width="${w}" height="66" rx="8"/><text class="tl" x="10" y="20">${esc(l)}</text><text class="tv" x="10" y="50">${esc(v)}</text><text class="tu" x="${w - 8}" y="50" text-anchor="end">${esc(u)}</text></g>`;
    const knob = (k, l, v, u, x, w = 128) => `<g class="vt-knob" data-k="${k}" transform="translate(${x},622)"><rect width="${w}" height="76" rx="10"/><text class="tl" x="${w / 2}" y="22" text-anchor="middle">${esc(l)}</text><text class="tv" x="${w / 2}" y="52" text-anchor="middle">${esc(v)}</text><text class="tu" x="${w / 2}" y="69" text-anchor="middle">${esc(u)}</text></g>`;
    const meas = vc ? [
      ['ppeak', 'Ppeak', n(D.ppeak), 'cmH₂O'], ['pplat', 'Pplat', n(D.pplat), 'cmH₂O'],
      ['peeptot', 'PEEP', n(D.peep), 'cmH₂O'], ['pmean', 'Pmean', n(D.pmean), 'cmH₂O'],
      ['vti', 'VTi', n(D.vt), 'mL'], ['vte', 'VTe', n(D.vt), 'mL'],
      ['ftot', 'ftotal', n(D.f), MVA.u('/dk')], ['ve', 'MVe', n(D.ve, 1), MVA.u('L/dk')],
      ['ie', 'I:E', '1:' + n(D.te / D.tiM, 1), ''], ['fio2m', 'FiO₂', '40', '%'],
      ['cstat', 'Cstat', n(D.cstat), 'mL/cmH₂O'], ['r', 'R', n(D.R), 'cmH₂O·s/L'],
      ['etco2', 'EtCO₂', '—', 'mmHg']
    ] : [
      ['ppeak', 'Ppeak', n(D.ppeak), 'cmH₂O'], ['peeptot', 'PEEP', n(D.peep), 'cmH₂O'],
      ['pmean', 'Pmean', n(D.pmean), 'cmH₂O'], ['ie', 'I:E', '1:' + n(D.te / D.tiM, 1), ''],
      ['vti', 'VTi', n(D.vt), 'mL'], ['vte', 'VTe', n(D.vt), 'mL'],
      ['ftot', 'ftotal', n(D.f), MVA.u('/dk')], ['ve', 'MVe', n(D.ve, 1), MVA.u('L/dk')],
      ['fio2m', 'FiO₂', '40', '%'], ['etco2', 'EtCO₂', '—', 'mmHg']
    ];
    const knobs = vc ? [['mode', T('va2.k.mode'), 'VC-A/C', ''], ['vtset', 'VT', '450', 'mL'], ['fset', 'f', '15', MVA.u('/dk')], ['tiset', 'Ti', n(1.1, 1), 's'], ['pause', T('va2.k.pause'), n(.3, 1), 's'], ['peep', 'PEEP', '5', 'cmH₂O'], ['fio2', 'FiO₂', '40', '%'], ['trig', T('va2.k.trig'), '2', MVA.u('L/dk')]]
                     : [['mode', T('va2.k.mode'), 'PS / CPAP', ''], ['ps', 'PS', '8', T('va2.abovePeep')], ['peep', 'PEEP', '5', 'cmH₂O'], ['rise', T('va2.k.rise'), n(.15, 2), 's'], ['ets', 'ETS', '25', '%'], ['trig', T('va2.k.trig'), '3', MVA.u('L/dk')], ['fio2', 'FiO₂', '40', '%'], ['apnea', T('va2.k.apnea'), '20', 's']];
    const kw = (VW - 40 - 8 * (knobs.length - 1)) / knobs.length;
    const grid = CH.map(([y0, y1], i) => `<rect class="vt-ch" x="${WX}" y="${y0}" width="${WR - WX}" height="${y1 - y0}"/>`).join('');
    const lab = (txt, unit, i, cls) => `<text class="vt-cl ${cls}" x="${WX + 8}" y="${CH[i][0] + 16}">${txt} · ${unit}</text>`;
    const axis = (y, lo, hi, i) => `<text class="vt-ax" x="${WX - 8}" y="${CH[i][0] + 10}" text-anchor="end">${n(hi, hi < 2 ? 1 : 0)}</text><text class="vt-ax" x="${WX - 8}" y="${CH[i][1]}" text-anchor="end">${n(lo, Math.abs(lo) < 2 && lo ? 1 : 0)}</text>`;
    return `<svg class="vscreen" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="${esc(T('va2.aria'))}">
      <rect class="vt-bg" width="${VW}" height="${VH}" rx="18"/>
      <g class="vt-top" data-k="top"><rect x="16" y="14" width="${VW - 32}" height="48" rx="10"/>
        <g class="vt-chipm" data-k="mode"><rect x="28" y="22" width="150" height="32" rx="7"/><text x="103" y="43" text-anchor="middle">${vc ? 'VC-A/C' : 'PS / CPAP'}</text></g>
        <text class="vt-pt" x="196" y="43">${esc(T('va2.adult'))}</text>
        <g class="vt-alarm" data-k="alarm"><rect x="400" y="22" width="300" height="32" rx="7"/><text x="416" y="43">${esc(T('va2.noAlarm'))}</text></g>
        <g class="vt-man" data-k="ihold"><rect x="${VW - 470}" y="22" width="140" height="32" rx="7"/><text x="${VW - 400}" y="43" text-anchor="middle">${esc(T('va2.ihold'))}</text></g>
        <g class="vt-man" data-k="ehold"><rect x="${VW - 322}" y="22" width="140" height="32" rx="7"/><text x="${VW - 252}" y="43" text-anchor="middle">${esc(T('va2.ehold'))}</text></g>
        <g class="vt-man" data-k="p01"><rect x="${VW - 174}" y="22" width="130" height="32" rx="7"/><text x="${VW - 109}" y="43" text-anchor="middle">P0.1 / Pocc</text></g>
      </g>
      ${grid}
      <line class="vt-zero" x1="${WX}" x2="${WR}" y1="${yF(0)}" y2="${yF(0)}"/>
      <path class="vt-w paw" d="${line(p => p.paw, yP)}"/><path class="vt-w flow" d="${line(p => p.flow, yF)}"/><path class="vt-w vol" d="${line(p => p.vol, yV)}"/>
      ${lab('Paw', 'cmH₂O', 0, 'paw')}${lab(esc(T('ch.flow')), 'L/s', 1, 'flow')}${lab(esc(T('ch.vol')), 'L', 2, 'vol')}
      ${axis(yP, 0, D.map.pMax, 0)}${axis(yF, -D.map.fMax, D.map.fMax, 1)}${axis(yV, 0, D.map.vMax, 2)}
      <text class="vt-ax" x="${WR}" y="580" text-anchor="end">${esc(T('ch.time'))} · ${D.W} s</text>
      <g class="vt-anno"></g>
      <g class="vt-meas">${meas.map((m, i) => tile(m[0], m[1], m[2], m[3], 900 + (i % 2) * 148, 78 + Math.floor(i / 2) * 74)).join('')}</g>
      <g class="vt-set">${knobs.map((k, i) => knob(k[0], k[1], k[2], k[3], 20 + i * (kw + 8), kw)).join('')}</g>
      <text class="vt-cap" x="${VW / 2}" y="612" text-anchor="middle">${esc(T('va2.setbar'))}</text>
    </svg>`;
  }

  /* ---------- Vurgu ve eğri üzeri açıklamalar ---------- */
  function annotate(svg, D, k) {
    const g = svg.querySelector('.vt-anno'), M = D.map, xs = M.xs, b0 = D.b0, b1 = D.b1, vc = D.kind === 'vc';
    const hl = [];
    const line = (x1, y1, x2, y2, c = '') => `<line class="an ${c}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    const dot = (x, y) => `<circle class="an-dot" cx="${x}" cy="${y}" r="7"/>`;
    const tag = (x, y, t, anchor = 'start') => `<g class="an-tag"><text x="${x}" y="${y}" text-anchor="${anchor}">${esc(t)}</text></g>`;
    const vbr = (x, y1, y2, t) => `${line(x, y1, x, y2, 'br')}${line(x - 6, y1, x + 6, y1, 'br')}${line(x - 6, y2, x + 6, y2, 'br')}${tag(x + 10, (y1 + y2) / 2 + 5, t)}`;
    const hbr = (x1, x2, y, t) => `${line(x1, y, x2, y, 'br')}${line(x1, y - 6, x1, y + 6, 'br')}${line(x2, y - 6, x2, y + 6, 'br')}${tag((x1 + x2) / 2, y - 10, t, 'middle')}`;
    const area = (t0, t1, cls) => { const seg = D.pts.filter(p => p.t >= t0 && p.t <= t1); return `<path class="an-area ${cls}" d="M${xs(t0)},${M.yF(0)}L${seg.map(p => `${xs(p.t).toFixed(1)},${M.yF(p.flow).toFixed(1)}`).join('L')}L${xs(t1)},${M.yF(0)}Z"/>`; };
    let h = '';
    switch (k) {
      case 'ppeak': h = dot(xs(D.tPeak), M.yP(D.ppeak)) + line(WX, M.yP(D.ppeak), xs(D.tPeak), M.yP(D.ppeak), 'dash') + tag(xs(D.tPeak) + 12, M.yP(D.ppeak) - 6, 'Ppeak ' + n(D.ppeak)); hl.push('ppeak'); break;
      case 'pplat': h = line(xs(D.tPlat[0]), M.yP(D.pplat) - 8, xs(D.tPlat[1]), M.yP(D.pplat) - 8, 'thick') + tag(xs(D.tPlat[1]) + 10, M.yP(D.pplat) - 4, 'Pplat ' + n(D.pplat) + ' · ' + T('va2.holdNote')); hl.push('pplat', 'ihold', 'pause'); break;
      case 'peep': h = line(WX, M.yP(D.peep), WR, M.yP(D.peep), 'thick') + tag(WR - 6, M.yP(D.peep) - 8, 'PEEP ' + n(D.peep), 'end'); hl.push('peep'); break;
      case 'peeptot': h = line(WX, M.yP(D.peep), WR, M.yP(D.peep), 'dash') + tag(xs(b1.start) - 10, M.yP(D.peep) - 10, T('va2.eholdNote'), 'end') + line(xs(b1.start - .3), M.yP(D.peep) + 10, xs(b1.start), M.yP(D.peep) + 10, 'thick'); hl.push('peeptot', 'ehold'); break;
      case 'dp': { const x = xs(D.tPlat[1]) + 26; h = vbr(x, M.yP(D.pplat), M.yP(D.peep), 'ΔP = ' + n(D.pplat) + ' − ' + n(D.peep) + ' = ' + n(D.dp)); hl.push('pplat', 'peeptot'); break; }
      case 'pmean': h = line(WX, M.yP(D.pmean), WR, M.yP(D.pmean), 'dash') + tag(WR - 6, M.yP(D.pmean) - 8, 'Pmean ≈ ' + n(D.pmean), 'end'); hl.push('pmean'); break;
      case 'vt': h = area(b0.start, b0.start + b0.ti, 'in') + area(b0.start + b0.ti, b1.start, 'ex') + dot(xs(D.tVmax), M.yV(D.vt / 1000)) + tag(xs(D.tVmax) + 12, M.yV(D.vt / 1000) + 4, 'VT ' + n(D.vt) + ' mL') + tag(xs(b0.start + b0.ti / 2), M.yF(0) - 10, 'VTi', 'middle') + tag(xs(b0.start + b0.ti + .6), M.yF(0) + 22, 'VTe', 'middle'); hl.push('vti', 'vte', vc ? 'vtset' : ''); break;
      case 'f': h = hbr(xs(b0.start), xs(b1.start), CH[0][0] + 30, '60 / f = ' + n(D.per, 1) + ' s'); hl.push('ftot', 'fset'); break;
      case 've': hl.push('ve'); h = tag(xs(D.W / 2), CH[0][0] + 30, 'VE = VT × f = ' + n(D.vt / 1000, 2) + ' × ' + n(D.f) + ' ≈ ' + n(D.ve, 1) + ' ' + MVA.u('L/dk'), 'middle'); break;
      case 'ti': h = hbr(xs(b0.start), xs(b0.start + b0.ti), CH[2][1] - 6, 'Ti ' + n(D.tiM, 1)) + hbr(xs(b0.start + b0.ti), xs(b1.start), CH[2][1] - 6, 'Te ' + n(D.te, 1)); hl.push('tiset', 'ie'); break;
      case 'fio2': hl.push('fio2', 'fio2m'); break;
      case 'cstat': h = tag(xs(D.W / 2), CH[0][0] + 30, 'Cstat = VT / (Pplat − PEEP) = ' + n(D.vt) + ' / ' + n(D.dp) + ' ≈ ' + n(D.cstat) + ' mL/cmH₂O', 'middle'); hl.push('cstat', 'pplat', 'vti'); break;
      case 'r': h = tag(xs(D.W / 2), CH[0][0] + 30, 'R ≈ (Ppeak − Pplat) / ' + T('val.flow') + ' = (' + n(D.ppeak) + ' − ' + n(D.pplat) + ') / ' + n(D.flowI, 2) + ' L/s ≈ ' + n(D.R), 'middle') + line(xs(b0.start + .1), M.yF(D.flowI) - 8, xs(b0.start + b0.ti - .35), M.yF(D.flowI) - 8, 'thick'); hl.push('r', 'ppeak', 'pplat'); break;
      case 'etco2': hl.push('etco2'); break;
      case 'ps': h = vbr(xs(b0.start + .5), M.yP(D.peep), M.yP(D.peep + D.ps), 'PS ' + n(D.ps) + ' (' + T('va2.abovePeep') + ')'); hl.push('ps', 'peep'); break;
      case 'rise': h = line(xs(b0.start), M.yP(D.peep) + 10, xs(b0.start + .15), M.yP(D.peep + D.ps) + 10, 'thick') + tag(xs(b0.start + .2), M.yP(D.peep + D.ps) + 28, T('va2.riseNote')); hl.push('rise'); break;
      case 'trig': h = dot(xs(b0.start), M.yF(.05)) + line(xs(D.tEffort), CH[0][0], xs(D.tEffort), CH[2][1], 'dash') + line(xs(b0.start), CH[0][0], xs(b0.start), CH[2][1], 'thick') + tag(xs(b0.start) + 10, CH[1][0] + 34, T('va2.trigNote')); hl.push('trig'); break;
      case 'ets': h = line(xs(b0.start), M.yF(D.etsFlow), xs(D.tCycle + .3), M.yF(D.etsFlow), 'dash') + dot(xs(D.tCycle), M.yF(D.etsFlow)) + tag(xs(D.tCycle) + 12, M.yF(D.etsFlow) - 10, T('va2.etsNote')); hl.push('ets'); break;
      case 'p01': case 'pocc': hl.push('p01'); break;
    }
    g.innerHTML = h;
    svg.querySelectorAll('[data-k]').forEach(el => el.classList.toggle('on', hl.includes(el.dataset.k)));
    svg.classList.toggle('focus', !!k);
  }

  /* ---------- Görünüm ---------- */
  function view(el, docHTML, docSources, srcList) {
    /* tablo satırlarını içerikten oku */
    const tmp = document.createElement('div'); tmp.innerHTML = docHTML;
    const rows = [...tmp.querySelectorAll('tbody tr')].map(tr => { const td = [...tr.children]; return {name: td[0].textContent.trim(), unit: td[1].innerHTML, meaning: td[2].innerHTML, note: td[3].innerHTML}; });
    const rowOf = k => rows.find(r => (ROWS[r.name] || {}).k === k);
    const intro = tmp.querySelector('p') ? tmp.querySelector('p').outerHTML : '';
    const pbwHead = [...tmp.querySelectorAll('h3')].find(h => /PBW/.test(h.textContent)), pbwText = pbwHead && pbwHead.nextElementSibling ? pbwHead.nextElementSibling.outerHTML : '';
    const normHead = [...tmp.querySelectorAll('h3')].find(h => /normal/i.test(h.textContent)), normText = normHead && normHead.nextElementSibling ? normHead.nextElementSibling.outerHTML : '';
    let mode = 'vc', cur = 'ppeak';
    const data = {vc: capture('vc'), ps: capture('ps')};
    el.insertAdjacentHTML('beforeend', `<section class="wrap vals">
      <div class="vals-intro">${intro}</div>
      <div class="vals-grid">
        <div class="vals-screen">
          <div class="seg vmode" role="group"><button class="chip" data-m="vc" aria-pressed="true">${T('va2.mVC')}</button><button class="chip" data-m="ps" aria-pressed="false">${T('va2.mPS')}</button><span class="muted small">${T('va2.tapHint')}</span></div>
          <div class="vsvg"></div>
          <div class="vlegend">${LOCS.map(l => `<span class="vl vl-${l}">${T('va2.loc.' + l)}</span>`).join('')}</div>
        </div>
        <aside class="vcard" aria-live="polite"></aside>
      </div>
      <div class="vchips">${LOCS.filter(l => l !== 'curve').map(l => `<div class="vgroup"><span class="cg-l">${T('va2.grp.' + l)}</span>${rows.filter(r => ROWS[r.name] && ROWS[r.name].loc.split('+')[0] === l).map(r => `<button type="button" class="chip" data-k="${ROWS[r.name].k}">${esc(r.name)}</button>`).join('')}</div>`).join('')}</div>
      <div class="vals-more">
        <div class="pbw-card">
          <h3>${T('vt.title')}</h3>
          <ol class="vt-steps">
            <li><b>${T('vt.s1.t')}</b> ${T('vt.s1.d')}</li>
            <li><b>${T('vt.s2.t')}</b> ${pbwText}</li>
            <li><b>${T('vt.s3.t')}</b> ${T('vt.s3.d')}</li>
            <li><b>${T('vt.s4.t')}</b> ${T('vt.s4.d')}</li>
          </ol>
          <div class="pbw-ctl"><div class="seg" role="group"><button class="chip" data-s="m" aria-pressed="true">${T('va2.male')}</button><button class="chip" data-s="f" aria-pressed="false">${T('va2.female')}</button></div>
          <label class="sl">${T('va2.height')} <output id="pbwH">170</output> cm<input type="range" id="pbwR" min="140" max="210" value="170"></label>
          <label class="sl">${T('vt.actual')} <output id="pbwKgO">95</output> kg<input type="range" id="pbwKg" min="40" max="180" value="95"></label></div>
          <div class="pbw-out" id="pbwOut"></div>
        </div>
        <div class="norm-card"><h3>${esc(normHead ? normHead.textContent : '')}</h3>${normText}</div>
      </div>
      <details class="vals-table"><summary>${T('va2.fullTable')}</summary><article class="doc">${tmp.querySelector('.tbl') ? tmp.querySelector('.tbl').outerHTML : ''}<h3>${T('src.title')}</h3>${srcList(docSources)}</article></details>
    </section>`);
    const box = el.querySelector('.vsvg'), card = el.querySelector('.vcard');
    const render = () => { box.innerHTML = screenSVG(data[mode]); bindSvg(); };
    const show = k => {
      cur = k; const r = rowOf(k) || rows.find(x => (ROWS[x.name] || {}).k === k);
      const meta = r ? ROWS[r.name] : null;
      if (meta && meta.mode && meta.mode !== mode) { mode = meta.mode; paintMode(); render(); }
      annotate(box.querySelector('svg'), data[mode], k);
      el.querySelectorAll('.vchips .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.k === k));
      if (!r) { card.innerHTML = `<p class="muted">${T('va2.pick')}</p>`; return; }
      const locs = meta.loc.split('+');
      card.innerHTML = `<p class="eyebrow">${locs.map(l => `<span class="vl vl-${l}">${T('va2.loc.' + l)}</span>`).join(' ')}</p>
        <h3>${esc(r.name)}</h3>${(() => { const f = r.name.split(/\s*\/\s*/).map(x => [x, (window.MVA_ABBR || {})[x]]).filter(x => x[1]); return f.length ? `<p class="vfull">${f.map(([k, v]) => `<b>${esc(k)}</b>: ${esc(v)}`).join('<br>')}</p>` : ''; })()}<p class="vunit">${r.unit}</p>
        <p class="vmean">${r.meaning}</p>
        <p class="vnote"><b>${T('va2.firstRead')}</b> ${r.note}</p>
        ${T('va2.where.' + meta.k) !== 'va2.where.' + meta.k ? `<p class="vwhere">${T('va2.where.' + meta.k)}</p>` : ''}
        <p class="muted small">${T('va2.modelNote')}</p>`;
    };
    const paintMode = () => el.querySelectorAll('.vmode .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));
    function bindSvg() {
      /* ekrandaki öğeye tıklanınca ilgili satırı aç */
      const alias = {vti: 'vt', vte: 'vt', vtset: 'vt', ftot: 'f', fset: 'f', ie: 'ti', tiset: 'ti', fio2m: 'fio2', ihold: 'pplat', ehold: 'peeptot', pause: 'pplat'};
      box.querySelectorAll('[data-k]').forEach(n2 => n2.addEventListener('click', () => { const k = alias[n2.dataset.k] || n2.dataset.k; if (rowOf(k)) show(k); }));
    }
    el.querySelectorAll('.vmode .chip').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; paintMode(); render(); const meta = (rows.find(x => (ROWS[x.name] || {}).k === cur) || {}).name; if (meta && ROWS[meta].mode && ROWS[meta].mode !== mode) cur = mode === 'ps' ? 'ps' : 'pplat'; show(cur); }));
    el.querySelectorAll('.vchips .chip').forEach(b => b.addEventListener('click', () => show(b.dataset.k)));
    /* PBW */
    let sex = 'm';
    const pbw = () => {
      const h = +el.querySelector('#pbwR').value, kg = +el.querySelector('#pbwKg').value;
      el.querySelector('#pbwH').textContent = h; el.querySelector('#pbwKgO').textContent = kg;
      const w = (sex === 'm' ? 50 : 45.5) + .91 * (h - 152.4);
      const bar = (lbl, lo, hi, cls, note) => `<div class="vt-row ${cls}"><span class="vt-l">${lbl}</span><span class="vt-bar"><i style="left:${lo / 12}%;width:${(hi - lo) / 12}%"></i></span><span class="vt-v">${n(lo)}–${n(hi)} mL</span><span class="vt-n">${note}</span></div>`;
      el.querySelector('#pbwOut').innerHTML = `<p class="vt-pbw">${MVA.fill(T('vt.result'), {w: n(w, 1)})}</p>
        ${bar(T('vt.ctx.periop'), w * 6, w * 8, 'periop', T('vt.ctx.periop.n'))}
        ${bar(T('vt.ctx.ards'), w * 4, w * 8, 'ards', T('vt.ctx.ards.n'))}
        ${bar(T('vt.ctx.wrong'), kg * 6, kg * 8, 'wrong', T('vt.ctx.wrong.n'))}
        <p class="muted small">${T('vt.scale')}</p>`;
    };
    el.querySelectorAll('.pbw-ctl .chip').forEach(b => b.addEventListener('click', () => { sex = b.dataset.s; el.querySelectorAll('.pbw-ctl .chip').forEach(x => x.setAttribute('aria-pressed', x === b)); pbw(); }));
    el.querySelector('#pbwR').addEventListener('input', pbw); el.querySelector('#pbwKg').addEventListener('input', pbw);
    render(); show(cur); pbw();
  }
  return {view, capture};
})();
