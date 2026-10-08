'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · çizim (vl-model-0.1)
   Eğriler ve döngüler motorun örnek belleğinden (lab.ring) ve soluk kayıtlarından çizilir; ara hesap veya ayrı formül yoktur.
   Akım motorda L/s'dir, ekranda ×60 ile L/min; hacim soluk başlangıcına göre ∫Q dt, mL. Soluk başında hacim sıfırlanınca
   bağlantı çizgisi çizilmez (boşluk bırakılır). Her piksel sütununda en küçük/en büyük değer korunur; tepe yumuşatılmaz.
   Döngüler kapatılmak için son noktadan ilk noktaya çizgi çekilmez. Ölçek değişince kısa bir uyarı gösterilir; kilitlenebilir. */
const VLAB_DRAW = (() => {
  const css = (el, k) => getComputedStyle(el).getPropertyValue(k).trim();
  const DPR = () => Math.min(window.devicePixelRatio || 1, 2);
  const T = k => MVA.t(k);
  const FONT = '600 10.5px "JetBrains Mono",ui-monospace,monospace';
  function nice(lo, hi) {
    if (!(hi > lo)) { hi = lo + 1; }
    const sp = hi - lo, p = Math.pow(10, Math.floor(Math.log10(sp))), st = [1, 2, 2.5, 5, 10].map(m => m * p / 4).find(m => sp / m <= 5) || p;
    return [Math.floor(lo / st) * st, Math.ceil(hi / st) * st, st];
  }
  /* Sıfırın hemen altındaki küçük sayısal taşma (ör. efor tetiklemesi öncesi −1,6 mL) ekseni bir ızgara adımı aşağı itmesin:
     açıklığın %4'ünden küçük negatif değer ölçekte sıfıra yuvarlanır (eğri en fazla birkaç piksel tabanın altına iner). */
  const floor0 = (a, b) => a < 0 && -a < .04 * Math.abs(b) ? 0 : a;
  const fmt = v => Math.abs(v) >= 100 || Number.isInteger(v) ? MVA.num(v, 0) : MVA.num(v, Math.abs(v) < 1 ? 2 : 1);
  function fit(cv) { const r = cv.getBoundingClientRect(), d = DPR(); const w = Math.round(r.width * d), h = Math.round(r.height * d); if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; } const g = cv.getContext('2d'); g.setTransform(d, 0, 0, d, 0, 0); return {g, W: r.width, H: r.height}; }

  /* Kanal tanımları: örnek belleğinden değer ve görünüm birimi */
  const CH = {
    paw: {get: (R, i) => R.paw[i], col: '--w-paw', unit: 'cmH₂O', key: 'lab.ch.paw'},
    q: {get: (R, i) => R.q[i] * 60, col: '--w-flow', unit: 'L/min', key: 'lab.ch.flow', zero: true},
    vol: {get: (R, i) => R.vol[i] * 1000, col: '--w-vol', unit: 'mL', key: 'lab.ch.vol', gaps: true},
    M: {get: (R, i) => R.M[i], col: '--w-edi', unit: 'cmH₂O', key: 'lab.ch.M', model: true}
  };
  const BTCOL = {1: '--t-mand', 2: '--t-assist', 3: '--t-spont', 4: '--t-event'};

  class Waves {
    constructor(cv, o = {}) { this.cv = cv; this.win = o.win || 12; this.rng = {}; this.lock = false; this.flash = 0; this.showM = false; }
    channels() { return ['paw', 'q', 'vol'].concat(this.showM ? ['M'] : []); }
    draw(lab) {
      const {g, W, H} = fit(this.cv); if (!W) return;
      const col = k => css(this.cv, k) || '#888', ink = col('--scope-ink'), grid = col('--scope-grid');
      g.fillStyle = col('--scope-bg'); g.fillRect(0, 0, W, H);
      const R = lab.ring, tNow = lab.t, Wn = this.win, s0 = Math.floor(tNow / Wn) * Wn;
      const L = 50, Rm = 10, top = 22, bot = 18, gap = 8, chs = this.channels(), n = chs.length, hh = (H - top - bot - gap * (n - 1)) / n, PW = Math.max(10, Math.floor(W - L - Rm));
      const posOf = t => (t >= s0 ? t - s0 : t - s0 + Wn) / Wn;
      const cur = posOf(tNow), erase = .025;
      /* sütun kümeleri */
      const bins = chs.map(() => ({mn: new Float64Array(PW).fill(NaN), mx: new Float64Array(PW).fill(NaN), f: new Float64Array(PW).fill(NaN), l: new Float64Array(PW).fill(NaN), gap: new Uint8Array(PW)}));
      const bt = new Uint8Array(PW), ph = new Uint8Array(PW);
      const lo = chs.map(() => Infinity), hi = chs.map(() => -Infinity);
      for (let k = 0; k < R.len; k++) {
        const i = R.idx(k), t = R.t[i]; if (t <= tNow - Wn + 1e-9) continue;
        const p = posOf(t); if (p > cur && p < cur + erase) continue;
        const c = Math.min(PW - 1, Math.floor(p * PW));
        bt[c] = R.bt[i]; if (R.ph[i] === 3 || R.ph[i] === 4) ph[c] = R.ph[i];
        chs.forEach((key, j) => {
          const v = CH[key].get(R, i), b = bins[j];
          if (v < lo[j]) lo[j] = v; if (v > hi[j]) hi[j] = v;
          if (b.f[c] !== b.f[c]) b.f[c] = v; b.l[c] = v;
          if (!(b.mn[c] <= v)) b.mn[c] = v; if (!(b.mx[c] >= v)) b.mx[c] = v;
          if (R.gap[i] && CH[key].gaps) b.gap[c] = 1;
        });
      }
      /* soluk türü şeridi ve bekletme bantları */
      for (let c = 0; c < PW; c++) { if (bt[c]) { g.fillStyle = col(BTCOL[bt[c]]); g.fillRect(L + c, 4, 1.2, 6); } if (ph[c]) { g.fillStyle = 'rgba(255,255,255,.06)'; g.fillRect(L + c, top, 1.2, H - top - bot); } }
      g.font = FONT; let changed = false;
      chs.forEach((key, j) => {
        const d = CH[key], y0 = top + j * (hh + gap);
        let a = lo[j], b = hi[j];
        if (key === 'paw') { a = Math.min(a, 0); b = Math.max(b, lab.S.PEEP + 2); }
        if (d.zero || key === 'vol' || key === 'M') { a = Math.min(a, 0); b = Math.max(b, 0); }
        if (key === 'vol') a = floor0(a, b);
        if (!Number.isFinite(a)) { a = 0; b = 1; }
        const want = nice(a, b + (b - a) * .06), r = this.rng[key];
        if (!r || (!this.lock && (a < r[0] || b > r[1] || (r[1] - r[0]) > 2.4 * (want[1] - want[0])))) { if (r) changed = true; this.rng[key] = want; }
        const [ylo, yhi, st] = this.rng[key], Y = v => y0 + hh - (v - ylo) / (yhi - ylo) * hh, X = c => L + c + .5;
        /* ızgara */
        g.strokeStyle = grid; g.lineWidth = 1; g.globalAlpha = .7;
        for (let v = ylo; v <= yhi + 1e-9; v += st) { const y = Math.round(Y(v)) + .5; g.beginPath(); g.moveTo(L, y); g.lineTo(W - Rm, y); g.stroke(); }
        g.globalAlpha = 1;
        if (ylo < 0 && yhi > 0) { g.strokeStyle = ink; g.globalAlpha = .55; g.beginPath(); g.moveTo(L, Math.round(Y(0)) + .5); g.lineTo(W - Rm, Math.round(Y(0)) + .5); g.stroke(); g.globalAlpha = 1; }
        g.fillStyle = ink; g.textAlign = 'right'; g.textBaseline = 'top'; g.fillText(fmt(yhi), L - 6, y0 - 1); g.textBaseline = 'bottom'; g.fillText(fmt(ylo), L - 6, y0 + hh + 1);
        /* PEEP (kesikli) ve Pmax çizgileri */
        if (key === 'paw') {
          g.setLineDash([5, 4]); g.strokeStyle = col('--w-paw'); g.globalAlpha = .55; let y = Math.round(Y(lab.S.PEEP)) + .5; g.beginPath(); g.moveTo(L, y); g.lineTo(W - Rm, y); g.stroke();
          if (lab.S.Pmax <= yhi) { g.strokeStyle = col('--t-event'); y = Math.round(Y(lab.S.Pmax)) + .5; g.beginPath(); g.moveTo(L, y); g.lineTo(W - Rm, y); g.stroke(); }
          g.setLineDash([]); g.globalAlpha = 1;
          g.textAlign = 'left'; g.textBaseline = 'bottom'; g.fillStyle = ink; g.fillText(`PEEP ${fmt(lab.S.PEEP)}`, W - Rm - 70, Y(lab.S.PEEP) - 2);
        }
        g.textAlign = 'left'; g.textBaseline = 'top'; g.fillStyle = col(d.col); g.fillText(`${T(d.key)} · ${d.unit}${d.model ? ' · ' + T('lab.ch.modelOnly') : ''}`, L + 6, y0 + 2);
        /* eğri */
        const bn = bins[j];
        g.strokeStyle = col(d.col); g.lineWidth = 1.7; g.lineJoin = 'round'; if (d.model) g.setLineDash([4, 3]);
        g.beginPath(); let pen = false;
        for (let c = 0; c < PW; c++) {
          if (bn.f[c] !== bn.f[c]) { pen = false; continue; }
          if (bn.gap[c]) pen = false;
          const x = X(c);
          /* tekdüze sütunda yalnız son değer: eğim çapraz kalır; tepe/dip uçların dışındaysa dikey olarak korunur */
          const lo2 = Math.min(bn.f[c], bn.l[c]), hi2 = Math.max(bn.f[c], bn.l[c]), ext = bn.mn[c] < lo2 - 1e-9 || bn.mx[c] > hi2 + 1e-9;
          if (!pen) g.moveTo(x, Y(bn.f[c])); else if (ext || hi2 - lo2 > (yhi - ylo) * .15) g.lineTo(x, Y(bn.f[c]));
          if (ext) { g.lineTo(x, Y(bn.mn[c])); g.lineTo(x, Y(bn.mx[c])); }
          g.lineTo(x, Y(bn.l[c])); pen = true;
        }
        g.stroke(); g.setLineDash([]);
      });
      if (changed) this.flash = performance.now();
      /* soluk başlangıç etiketleri: renk tek ayırıcı olmasın diye harf */
      g.textAlign = 'center'; g.textBaseline = 'top'; g.font = '700 9.5px "JetBrains Mono",ui-monospace,monospace';
      const all = lab.breaths.slice(-30).concat(lab.br ? [lab.br] : []);
      for (const b of all) { if (b.tStart <= tNow - Wn) continue; const p = posOf(b.tStart); if (p > cur && p < cur + erase) continue; g.fillStyle = col(BTCOL[{mand: 1, assist: 2, spont: 3, backup: 4}[b.kind]] || '--scope-ink'); g.fillText(T('lab.bt.' + b.kind), L + p * PW, 11); if (b.pressureLimited) { g.fillStyle = col('--t-event'); g.fillText('▲', L + p * PW + 9, 11); } }
      /* zaman ekseni ve imleç */
      g.fillStyle = ink; g.font = FONT; g.textAlign = 'right'; g.textBaseline = 'bottom'; g.fillText(`${MVA.num(Wn, 0)} s`, W - Rm, H - 1);
      for (let s = 0; s <= Wn; s += 1) g.fillRect(L + s / Wn * PW, H - bot + 2, 1, s % 5 ? 3 : 6);
      g.fillStyle = col('--scope-cursor'); g.fillRect(L + cur * PW - 1, top, 2, H - top - bot);
      if (performance.now() - this.flash < 1800) { g.fillStyle = col('--warn'); g.textAlign = 'left'; g.textBaseline = 'bottom'; g.fillText(T('lab.scaleChanged'), L + 4, H - 1); }
      if (this.lock) { g.fillStyle = ink; g.textAlign = 'right'; g.textBaseline = 'bottom'; g.fillText(T('lab.scaleLocked'), W - Rm - 60, H - 1); }
    }
  }

  /* Döngüler: PV (x Paw, y soluk hacmi) ve FV (x soluk hacmi, y akım). İnspirasyon düz, ekspirasyon kesikli;
     başlangıç daire, bitiş kare; A referansı kesikli gri. */
  class Loops {
    constructor(cv) { this.cv = cv; this.rng = {}; this.lock = false; }
    draw(lab, ref) {
      const {g, W, H} = fit(this.cv); if (!W) return;
      const col = k => css(this.cv, k) || '#888', ink = col('--scope-ink'), grid = col('--scope-grid');
      g.fillStyle = col('--scope-bg'); g.fillRect(0, 0, W, H);
      const loops = lab.loops.slice(-3), curL = lab.loop, last = loops[loops.length - 1];
      const insp = (pts, b) => pts.map(p => p[3] <= (b && b.tInspEnd != null ? b.tInspEnd + 1e-9 : Infinity));
      const breathOf = id => lab.breaths.find(b => b.id === id);
      const sets = loops.map(l => ({pts: l.pts, b: breathOf(l.id)})).concat(curL.length ? [{pts: curL, b: lab.br, live: true}] : []);
      const stack = W < 520, panels = stack ? [['pv', 0, 0, W, H / 2], ['fv', 0, H / 2, W, H / 2]] : [['pv', 0, 0, W / 2, H], ['fv', W / 2, 0, W / 2, H]];
      g.font = FONT;
      for (const [kind, px, py, pw, phh] of panels) {
        const xi = kind === 'pv' ? 0 : 1, yi = kind === 'pv' ? 1 : 2, sx = [1, 1000, 60], X0 = p => p[xi] * sx[xi], Y0 = p => p[yi] * sx[yi];
        let xl = Infinity, xh = -Infinity, yl = Infinity, yh = -Infinity;
        for (const s of sets.concat(ref ? [{pts: ref.pts}] : [])) for (const p of s.pts) { const a = X0(p), b = Y0(p); if (a < xl) xl = a; if (a > xh) xh = a; if (b < yl) yl = b; if (b > yh) yh = b; }
        if (!Number.isFinite(xl)) continue;
        if (kind === 'pv') { xl = Math.min(xl, 0); yl = Math.min(yl, 0); } else { yl = Math.min(yl, 0); yh = Math.max(yh, 0); xl = Math.min(xl, 0); }
        if (kind === 'pv') yl = floor0(yl, yh); else xl = floor0(xl, xh);
        /* eğri kenara değmesin: üstte ve (sıfıra sabitlenmemişse) altta açıklığın %12'si kadar pay bırakılır */
        const pad = (l, h) => { const m = (h - l || 1) * .12; return [l < 0 ? l - m : l, h > 0 ? h + m : h]; };
        [xl, xh] = pad(xl, xh); [yl, yh] = pad(yl, yh);
        const kx = kind + 'x', ky = kind + 'y', wx = nice(xl, xh), wy = nice(yl, yh);
        const upd = (k, w, a, b) => { const r = this.rng[k]; if (!r || (!this.lock && (a < r[0] || b > r[1] || (r[1] - r[0]) > 2.4 * (w[1] - w[0])))) this.rng[k] = w; };
        upd(kx, wx, xl, xh); upd(ky, wy, yl, yh);
        const [ax0, ax1, sxs] = this.rng[kx], [ay0, ay1, sys] = this.rng[ky];
        const L = px + 50, Rr = px + pw - 12, Tt = py + 24, B = py + phh - 30;
        const X = v => L + (v - ax0) / (ax1 - ax0) * (Rr - L), Y = v => B - (v - ay0) / (ay1 - ay0) * (B - Tt);
        g.strokeStyle = grid; g.lineWidth = 1; g.fillStyle = ink;
        for (let v = ax0; v <= ax1 + 1e-9; v += sxs) { const x = Math.round(X(v)) + .5; g.globalAlpha = Math.abs(v) < 1e-9 ? 1 : .55; g.beginPath(); g.moveTo(x, Tt); g.lineTo(x, B); g.stroke(); g.globalAlpha = 1; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText(fmt(v), x, B + 4); }
        for (let v = ay0; v <= ay1 + 1e-9; v += sys) { const y = Math.round(Y(v)) + .5; g.globalAlpha = Math.abs(v) < 1e-9 ? 1 : .55; g.beginPath(); g.moveTo(L, y); g.lineTo(Rr, y); g.stroke(); g.globalAlpha = 1; g.textAlign = 'right'; g.textBaseline = 'middle'; g.fillText(fmt(v), L - 5, y); }
        g.textAlign = 'left'; g.textBaseline = 'top'; g.fillStyle = col(kind === 'pv' ? '--w-paw' : '--w-flow');
        g.fillText(kind === 'pv' ? `${T('lab.loop.pv')} · x cmH₂O · y mL` : `${T('lab.loop.fv')} · x mL · y L/min`, L, py + 6);
        const path = (pts, mask, color, alpha, dashInsp, dashExp) => {
          for (const seg of [true, false]) {
            g.strokeStyle = color; g.globalAlpha = alpha * (seg ? 1 : .75); g.lineWidth = 1.8; g.setLineDash(seg ? dashInsp : dashExp); g.beginPath(); let pen = false;
            pts.forEach((p, i) => { if ((mask ? mask[i] : true) !== seg && mask) { pen = false; return; } const x = X(X0(p)), y = Y(Y0(p)); if (pen) g.lineTo(x, y); else { g.moveTo(x, y); pen = true; } });
            g.stroke();
          }
          g.setLineDash([]); g.globalAlpha = 1;
        };
        if (ref) path(ref.pts, null, ink, .7, [3, 4], [3, 4]);
        sets.forEach((s, k) => {
          const color = col(kind === 'pv' ? '--w-vol' : '--w-flow'), a = s.live ? 1 : .25 + .3 * (k / Math.max(1, sets.length - 1));
          path(s.pts, insp(s.pts, s.b), color, s === sets[sets.length - (curL.length ? 2 : 1)] ? 1 : a, [], [5, 3]);
        });
        /* son tamamlanan döngüde başlangıç (daire), bitiş (kare) ve yön oku */
        if (last && last.pts.length > 4) {
          const p0 = last.pts[0], p1 = last.pts[last.pts.length - 1], c = col('--scope-cursor');
          g.fillStyle = c; g.beginPath(); g.arc(X(X0(p0)), Y(Y0(p0)), 3.5, 0, 7); g.fill(); g.fillRect(X(X0(p1)) - 3, Y(Y0(p1)) - 3, 6, 6);
          const b = breathOf(last.id), m = insp(last.pts, b), k = Math.max(1, Math.floor(m.filter(Boolean).length / 2)), a = last.pts[k - 1], bb = last.pts[k];
          if (a && bb) { const x1 = X(X0(a)), y1 = Y(Y0(a)), x2 = X(X0(bb)), y2 = Y(Y0(bb)), an = Math.atan2(y2 - y1, x2 - x1); g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - 9 * Math.cos(an - .45), y2 - 9 * Math.sin(an - .45)); g.lineTo(x2 - 9 * Math.cos(an + .45), y2 - 9 * Math.sin(an + .45)); g.closePath(); g.fill(); }
        }
      }
    }
  }

  /* Gaz deneyi: içerik–PO₂ eğrisi (SVG). Karışım içerik ekseninde yapılır; basınç ortalaması ayrı işaretlenir. */
  function o2Svg(GAS, r, inp) {
    const hb = inp.Hb;
    const W = 520, H = 300, L = 54, R = 16, Tp = 16, B = 44;
    const xmax = Math.max(150, Math.ceil(r.PAO2.value / 50) * 50), ymax = Math.ceil((GAS.content(xmax, hb) + .5) / 2) * 2;
    const X = p => L + p / xmax * (W - L - R), Y = c => H - B - c / ymax * (H - B - Tp);
    let d = ''; for (let p = 0; p <= xmax; p += xmax / 200) d += (d ? 'L' : 'M') + X(p).toFixed(1) + ',' + Y(GAS.content(p, hb)).toFixed(1);
    const tick = []; for (let p = 0; p <= xmax; p += xmax > 300 ? 100 : 50) tick.push(`<line x1="${X(p)}" x2="${X(p)}" y1="${Tp}" y2="${H - B}" class="g"/><text x="${X(p)}" y="${H - B + 16}" text-anchor="middle">${MVA.num(p, 0)}</text>`);
    for (let c = 0; c <= ymax; c += ymax > 16 ? 4 : 2) tick.push(`<line x1="${L}" x2="${W - R}" y1="${Y(c)}" y2="${Y(c)}" class="g"/><text x="${L - 6}" y="${Y(c) + 4}" text-anchor="end">${MVA.num(c, 0)}</text>`);
    const pt = (p, c, cls, lab, dy = -8) => { const right = X(p) > W - 60; return `<circle cx="${X(p)}" cy="${Y(c)}" r="5" class="${cls}"/><text x="${X(p) + (right ? -8 : 7)}" y="${Y(c) + (right ? 20 : dy)}" text-anchor="${right ? 'end' : 'start'}" class="pl ${cls}">${lab}</text>`; };
    const nv = r.naive;
    return `<svg viewBox="0 0 ${W} ${H}" class="o2svg" role="img" aria-label="${T('lab.gas.chartAria')}">${tick.join('')}
      <path d="${d}" class="curve"/>
      <line x1="${X(r.PaO2.value)}" x2="${X(r.PaO2.value)}" y1="${Y(r.CaO2.value)}" y2="${H - B}" class="drop"/>
      <line x1="${X(nv)}" x2="${X(nv)}" y1="${Tp}" y2="${H - B}" class="naive"/><text x="${X(nv) + (X(nv) > W / 2 ? -5 : 5)}" y="${H - B - 8}" text-anchor="${X(nv) > W / 2 ? 'end' : 'start'}" class="pl naive">${T('lab.gas.naive')}</text>
      ${pt(r.PaO2.value, r.CaO2.value, 'pa', 'a', 18)}${pt(inp.PvO2, r.CvO2.value, 'pv', 'v̄')}${pt(r.PAO2.value, r.CcO2.value, 'pc', "c′")}
      <text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle">PO₂ · mmHg</text><text x="14" y="${(Tp + H - B) / 2}" text-anchor="middle" transform="rotate(-90 14 ${(Tp + H - B) / 2})">O₂ · mL/dL</text></svg>`;
  }

  return {Waves, Loops, o2Svg, nice, fit};
})();
