'use strict';
/* Mekanik Ventilasyon Atlası · ventilatör ekranı çizimi
   Scope: yan yana zaman eğrileri (basınç, akım, hacim, isteğe bağlı Edi/Pmus/Pext/Palv), soldan sağa tarama imleci,
   üstte soluk türü şeridi. Loops: son tamamlanan soluğun basınç–hacim ve akım–hacim döngüleri.
   Eksenler ve birimler gorseller/MODEL_NOTU.md ile aynıdır: basınç cmH₂O, akım L/s, hacim L (yenidoğanda mL). */
const SCOPE = (() => {
  const css = (el, k) => getComputedStyle(el).getPropertyValue(k).trim();
  const DPR = () => Math.min(window.devicePixelRatio || 1, 2);

  /* Kanal tanımları: anahtar, örnekten değer alma, renk değişkeni */
  const CH = {
    paw:  {get: s => s.paw, col: '--w-paw', unit: 'cmH₂O', label: 'Paw'},
    flow: {get: s => s.flow, col: '--w-flow', unit: 'L/s', label: 'flow', zero: true},
    vol:  {get: s => s.vol, col: '--w-vol', unit: 'L', label: 'vol'},
    volml:{get: s => s.vol * 1000, col: '--w-vol', unit: 'mL', label: 'vol'},
    flowml:{get: s => s.flow * 60, col: '--w-flow', unit: MVA.u('L/dk'), label: 'flow', zero: true},
    edi:  {get: s => s.edi, col: '--w-edi', unit: 'µV', label: 'Edi'},
    pmus: {get: s => s.pmus, col: '--w-edi', unit: 'cmH₂O', label: 'Pmus'},
    pext: {get: s => s.pext, col: '--w-edi', unit: 'cmH₂O', label: 'Pext', zero: true},
    palv: {get: s => s.palv, col: '--w-alv', unit: 'cmH₂O', label: 'Palv'},
    flowL:{get: s => s.flowL[0], get2: s => s.flowL[1], col: '--w-flow', col2: '--w-edi', unit: 'L/s', label: 'flowLR', zero: true},
    volL: {get: s => s.volL[0] - (s._v0 || 0), get2: s => s.volL[1] - (s._v1 || 0), col: '--w-vol', col2: '--w-edi', unit: 'L', label: 'volLR'}
  };

  class Scope {
    /* o: {channels:[key|{key,min,max}], window:s, labels:{key:text}, typeColors} */
    constructor(canvas, o) {
      this.cv = canvas; this.ctx = canvas.getContext('2d'); this.o = o;
      this.win = o.window || 8; this.every = o.every || .01;
      this.n = Math.round(this.win / this.every);
      this.chs = o.channels.map(c => { const k = typeof c === 'string' ? c : c.key, d = CH[k]; return Object.assign({key: k, buf: new Float32Array(this.n).fill(NaN), buf2: d.get2 ? new Float32Array(this.n).fill(NaN) : null, lo: 0, hi: 0, fix: typeof c === 'object' && c.min != null}, d, typeof c === 'object' ? c : {}); });
      this.types = new Array(this.n).fill(null); this.marks = new Array(this.n).fill(null);
      this.i = 0; this.filled = false;
      this.resize(); if ('ResizeObserver' in window) new ResizeObserver(() => this.resize()).observe(canvas);
    }
    resize() { const r = this.cv.getBoundingClientRect(), d = DPR(); this.w = r.width; this.h = r.height; this.cv.width = Math.round(r.width * d); this.cv.height = Math.round(r.height * d); this.ctx.setTransform(d, 0, 0, d, 0, 0); }
    clear() { for (const c of this.chs) { c.buf.fill(NaN); c.buf2 && c.buf2.fill(NaN); c.lo = c.hi = 0; } this.types.fill(null); this.marks.fill(null); this.i = 0; }
    push(s, mark) {
      const i = this.i;
      for (const c of this.chs) { c.buf[i] = c.get(s); if (c.buf2) c.buf2[i] = c.get2(s); }
      this.types[i] = s.phase === 'insp' ? s.type : null; this.marks[i] = mark || null;
      /* imlecin önünde küçük boşluk (tarama ekranı) */
      for (let k = 1; k <= Math.max(2, Math.round(this.n * .02)); k++) { const j = (i + k) % this.n; for (const c of this.chs) { c.buf[j] = NaN; if (c.buf2) c.buf2[j] = NaN; } this.types[j] = null; this.marks[j] = null; }
      this.i = (i + 1) % this.n;
    }
    /* Eksen aralığı: hızlı genişler, yavaş daralır (ölçek sıçramasın) */
    range(c) {
      if (c.fix) return [c.min, c.max];
      let lo = Infinity, hi = -Infinity;
      for (const a of [c.buf, c.buf2]) if (a) for (const v of a) if (v === v) { if (v < lo) lo = v; if (v > hi) hi = v; }
      if (lo === Infinity) { lo = 0; hi = 1; }
      if (c.zero || c.key === 'paw' || c.key.startsWith('vol') || c.key === 'edi') { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
      const pad = (hi - lo) * .12 || .5; lo -= c.key === 'paw' || c.key === 'edi' || lo >= -1e-3 * (hi - lo) ? 0 : pad; hi += pad;
      const nice = niceRange(lo, hi);
      c.lo = c.lo === c.hi ? nice[0] : (nice[0] < c.lo ? nice[0] : c.lo + (nice[0] - c.lo) * .02);
      c.hi = c.lo === c.hi ? nice[1] : (nice[1] > c.hi ? nice[1] : c.hi + (nice[1] - c.hi) * .02);
      return [c.lo, c.hi];
    }
    draw() {
      const g = this.ctx, W = this.w, H = this.h; if (!W) return;
      const col = k => css(this.cv, k) || '#888', ink = col('--scope-ink'), grid = col('--scope-grid'), bg = col('--scope-bg');
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      const L = 46, Rm = 8, top = 14, gap = 6, ch = this.chs.length, hh = (H - top - 18 - gap * (ch - 1)) / ch;
      /* soluk türü şeridi */
      const tcol = {mand: col('--t-mand'), assist: col('--t-assist'), spont: col('--t-spont')};
      for (let i = 0; i < this.n; i++) { const t = this.types[i]; if (!t) continue; g.fillStyle = tcol[t] || ink; g.fillRect(L + i / this.n * (W - L - Rm), 3, (W - L - Rm) / this.n + .6, 6); }
      g.font = '600 10.5px "JetBrains Mono",ui-monospace,monospace';
      this.chs.forEach((c, k) => {
        const y0 = top + k * (hh + gap), [lo, hi] = this.range(c), X = i => L + i / (this.n - 1) * (W - L - Rm), Y = v => y0 + hh - (v - lo) / (hi - lo) * hh;
        g.strokeStyle = grid; g.lineWidth = 1; g.beginPath(); g.moveTo(L, y0 + .5); g.lineTo(W - Rm, y0 + .5); g.moveTo(L, y0 + hh + .5); g.lineTo(W - Rm, y0 + hh + .5); g.stroke();
        if (lo < 0 && hi > 0) { g.setLineDash([3, 3]); g.beginPath(); g.moveTo(L, Math.round(Y(0)) + .5); g.lineTo(W - Rm, Math.round(Y(0)) + .5); g.stroke(); g.setLineDash([]); }
        g.fillStyle = ink; g.textAlign = 'right'; g.textBaseline = 'top'; g.fillText(fmt(hi), L - 6, y0); g.textBaseline = 'bottom'; g.fillText(fmt(lo), L - 6, y0 + hh);
        g.textAlign = 'left'; g.textBaseline = 'top'; g.fillStyle = col(c.col); g.fillText(`${this.o.labels && this.o.labels[c.label] || c.label} · ${c.unit}`, L + 6, y0 + 3);
        const line = (buf, color) => {
          g.strokeStyle = color; g.lineWidth = 1.8; g.lineJoin = 'round'; g.beginPath(); let pen = false;
          for (let i = 0; i < this.n; i++) { const v = buf[i]; if (v !== v) { pen = false; continue; } const x = X(i), y = Y(Math.max(lo, Math.min(hi, v))); if (pen) g.lineTo(x, y); else { g.moveTo(x, y); pen = true; } }
          g.stroke();
        };
        line(c.buf, col(c.col)); if (c.buf2) line(c.buf2, col(c.col2));
      });
      /* olay işaretleri (ör. mod geçişi) */
      g.fillStyle = col('--t-event'); g.textAlign = 'center'; g.textBaseline = 'top';
      for (let i = 0; i < this.n; i++) { const m = this.marks[i]; if (!m) continue; const x = L + i / (this.n - 1) * (W - L - Rm); g.fillRect(x - .75, top, 1.5, H - top - 18); g.fillText(m, Math.min(W - 40, Math.max(L + 30, x)), H - 15); }
      /* zaman ekseni */
      g.fillStyle = ink; g.textAlign = 'left'; g.textBaseline = 'bottom';
      const step = this.win > 30 ? 10 : this.win > 9 ? 2 : this.win > 3 ? 1 : .25;
      for (let s = 0; s <= this.win + 1e-6; s += step) { const x = L + s / this.win * (W - L - Rm); g.fillRect(x, H - 16, 1, 4); }
      g.textAlign = 'right'; g.fillText((this.o.timeLabel || 's') + ' · ' + this.win + ' s', W - Rm, H - 1);
      /* imleç */
      const cx = L + this.i / (this.n - 1) * (W - L - Rm); g.fillStyle = col('--scope-cursor'); g.fillRect(cx - 1, top, 2, H - top - 18);
    }
  }

  /* Döngüler: basınç–hacim (yatay basınç, dikey hacim) ve akım–hacim (yatay hacim, dikey akım).
     Gerçek ventilatör ekranı gibi: döngü canlı çizilir, önceki döngüler soluklaşarak kalır, isteğe bağlı referans döngü
     kesikli gösterilir; son tamamlanan döngüde yön okları vardır. Eksen aralıkları sıçramasın diye yavaş daralır. */
  class Loops {
    constructor(canvas, o = {}) {
      this.cv = canvas; this.ctx = canvas.getContext('2d'); this.o = o;
      this.cur = []; this.hist = []; this.ref = null; this.rng = {};
      this.resize(); if ('ResizeObserver' in window) new ResizeObserver(() => this.resize()).observe(canvas);
    }
    resize() { const r = this.cv.getBoundingClientRect(), d = DPR(); this.w = r.width; this.h = r.height; this.cv.width = Math.round(r.width * d); this.cv.height = Math.round(r.height * d); this.ctx.setTransform(d, 0, 0, d, 0, 0); }
    point(s) { return [s.paw, s.vol * (this.o.ml ? 1000 : 1), s.flow * (this.o.ml ? 60 : 1)]; }
    push(s, newBreath) {
      if (newBreath && this.cur.length > 10) { this.hist.push(this.cur); if (this.hist.length > 3) this.hist.shift(); this.cur = []; }
      this.cur.push(this.point(s));
      if (this.cur.length > 6000) this.cur.shift();
    }
    setReference(pts) { this.ref = pts; }
    lastLoop() { return this.hist[this.hist.length - 1] || this.cur; }
    /* yumuşak eksen aralığı */
    axis(key, lo, hi, zero) {
      if (zero) { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
      const pad = (hi - lo) * .08 || .5; let [a, b] = niceRange(lo - (lo < 0 ? pad : 0), hi + pad);
      const r = this.rng[key];
      if (r) { a = a < r[0] ? a : r[0] + (a - r[0]) * .03; b = b > r[1] ? b : r[1] + (b - r[1]) * .03; }
      this.rng[key] = [a, b]; return [a, b];
    }
    draw() {
      const g = this.ctx, W = this.w, H = this.h; if (!W) return;
      const col = k => css(this.cv, k) || '#888', ink = col('--scope-ink'), grid = col('--scope-grid');
      g.fillStyle = col('--scope-bg'); g.fillRect(0, 0, W, H);
      const ml = this.o.ml, lab = this.o.labels || {}, only = this.o.only;
      const panels = only === 'pv' ? [['pv', 0, W]] : only === 'fv' ? [['fv', 0, W]] : [['pv', 0, W / 2], ['fv', W / 2, W / 2]];
      const all = this.hist.flat().concat(this.cur, this.ref || []);
      if (!all.length) return;
      for (const [kind, x0, pw] of panels) {
        const xi = kind === 'pv' ? 0 : 1, yi = kind === 'pv' ? 1 : 2;
        let xl = Infinity, xh = -Infinity, yl = Infinity, yh = -Infinity;
        for (const p of all) { if (p[xi] < xl) xl = p[xi]; if (p[xi] > xh) xh = p[xi]; if (p[yi] < yl) yl = p[yi]; if (p[yi] > yh) yh = p[yi]; }
        const [ax0, ax1] = this.axis(kind + 'x', kind === 'pv' ? Math.min(xl, 0) : xl, xh, kind === 'pv');
        const [ay0, ay1] = this.axis(kind + 'y', yl, yh, true);
        const L = x0 + 46, R = x0 + pw - 14, T = 30, B = H - 34;
        const X = v => L + (v - ax0) / (ax1 - ax0) * (R - L), Y = v => B - (v - ay0) / (ay1 - ay0) * (B - T);
        /* ızgara ve ölçek */
        g.font = '600 10.5px "JetBrains Mono",ui-monospace,monospace'; g.lineWidth = 1;
        const tick = (a, b) => { const sp = b - a, p = Math.pow(10, Math.floor(Math.log10(sp))), st = [1, 2, 5, 10].map(m => m * p / 10).find(m => sp / m <= 6) || p; const out = []; for (let v = Math.ceil(a / st) * st; v <= b + 1e-9; v += st) out.push(+v.toFixed(6)); return out; };
        g.strokeStyle = grid; g.fillStyle = ink;
        for (const v of tick(ax0, ax1)) { const x = Math.round(X(v)) + .5; g.globalAlpha = v === 0 ? 1 : .55; g.beginPath(); g.moveTo(x, T); g.lineTo(x, B); g.stroke(); g.globalAlpha = 1; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText(fmt(v), x, B + 4); }
        for (const v of tick(ay0, ay1)) { const y = Math.round(Y(v)) + .5; g.globalAlpha = v === 0 ? 1 : .55; g.beginPath(); g.moveTo(L, y); g.lineTo(R, y); g.stroke(); g.globalAlpha = 1; g.textAlign = 'right'; g.textBaseline = 'middle'; g.fillText(fmt(v), L - 6, y); }
        g.strokeStyle = ink; g.globalAlpha = .7; g.strokeRect(L + .5, T + .5, R - L, B - T); g.globalAlpha = 1;
        const xUnit = kind === 'pv' ? 'Paw · cmH₂O' : (lab.vol || 'V') + ' · ' + (ml ? 'mL' : 'L'), yUnit = kind === 'pv' ? (lab.vol || 'V') + ' · ' + (ml ? 'mL' : 'L') : (lab.flow || 'V̇') + ' · ' + (ml ? MVA.u('L/dk') : 'L/s');
        g.textAlign = 'left'; g.textBaseline = 'top'; g.fillStyle = col(kind === 'pv' ? '--w-vol' : '--w-flow'); g.font = '700 11px "JetBrains Mono",ui-monospace,monospace';
        g.fillText(kind === 'pv' ? (lab.pv || 'P–V') : (lab.fv || 'F–V'), L, 8);
        g.font = '600 10px "JetBrains Mono",ui-monospace,monospace'; g.fillStyle = ink; g.textAlign = 'right'; g.fillText('→ ' + xUnit, R, B + 18); g.textAlign = 'left'; g.fillText('↑ ' + yUnit, L + 6, T + 4);
        const color = col(kind === 'pv' ? '--w-vol' : '--w-flow');
        const path = (arr, c, w, alpha, dash) => {
          if (arr.length < 2) return; g.save(); g.beginPath(); g.rect(L, T, R - L, B - T); g.clip();
          g.strokeStyle = c; g.lineWidth = w; g.globalAlpha = alpha; g.lineJoin = 'round'; g.lineCap = 'round'; g.setLineDash(dash || []);
          g.beginPath(); arr.forEach((p, i) => i ? g.lineTo(X(p[xi]), Y(p[yi])) : g.moveTo(X(p[xi]), Y(p[yi]))); g.stroke(); g.restore();
        };
        if (this.ref) { path(this.ref, '#C9D4DE', 1.6, .75, [5, 4]); }
        this.hist.forEach((h, i) => path(h, color, 2, .18 + .2 * (i + 1) / this.hist.length));
        const last = this.hist[this.hist.length - 1];
        if (last) {
          path(last, color, 2.4, .95);
          /* yön okları */
          [.22, .62].forEach(f => {
            const i = Math.floor(last.length * f), a = last[Math.max(0, i - 3)], b = last[Math.min(last.length - 1, i + 3)];
            const ax = X(a[xi]), ay = Y(a[yi]), bx = X(b[xi]), by = Y(b[yi]), ang = Math.atan2(by - ay, bx - ax);
            if (Math.hypot(bx - ax, by - ay) < 1) return;
            g.save(); g.translate(X(last[i][xi]), Y(last[i][yi])); g.rotate(ang); g.fillStyle = '#F4F8FB'; g.beginPath(); g.moveTo(7, 0); g.lineTo(-5, -5); g.lineTo(-5, 5); g.closePath(); g.fill(); g.restore();
          });
        }
        /* canlı çizilen döngü ve uç noktası */
        path(this.cur, '#F4F8FB', 2.2, .95);
        const hd = this.cur[this.cur.length - 1];
        if (hd) { g.fillStyle = color; g.beginPath(); g.arc(X(hd[xi]), Y(hd[yi]), 4, 0, Math.PI * 2); g.fill(); }
        if (this.ref) { g.fillStyle = '#C9D4DE'; g.textAlign = 'right'; g.textBaseline = 'top'; g.fillText('- - ' + (lab.ref || 'referans'), R - 4, T + 4); }
      }
    }
  }

  function niceRange(lo, hi) {
    if (hi - lo < 1e-9) { hi = lo + 1; }
    const span = hi - lo, p = Math.pow(10, Math.floor(Math.log10(span))), st = [1, 2, 5, 10].map(x => x * p / 10).find(x => span / x <= 6) || p;
    return [Math.floor(lo / st) * st, Math.ceil(hi / st) * st];
  }
  function fmt(v) {
    const a = Math.abs(v), s = a >= 10 ? v.toFixed(0) : a >= 1 ? v.toFixed(1).replace(/\.0$/, '') : a === 0 ? '0' : v.toFixed(a >= .1 ? 2 : 3).replace(/0+$/, '');
    return typeof MVA !== 'undefined' && MVA.lang !== 'en' ? s.replace('.', ',') : s;
  }

  return {Scope, Loops, CH, niceRange, fmt};
})();
