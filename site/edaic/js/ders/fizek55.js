/* Ek ders · Omurilik refleksleri, kas tonusu ve postür · bileşenler (tarif: docs/tasarim/fizek55.md)
   Kaynak: K2 s. 62–63. Bütün deşarj izleri, gecikmeler ve kuvvetler ölçeksiz/şematiktir. */
(() => {
  'use strict';
  const { ticker, esc, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  let UID = 0, FS = 13, CU = 0;
  const f1 = (n) => Math.round(n * 10) / 10;
  const lerp = (a, b, f) => a + (b - a) * f;
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const sm = (a, b, t) => { const u = cl((t - a) / (b - a)); return u * u * (3 - 2 * u); };
  const C = { ok: 'var(--ok)', okS: 'var(--ok-soft)', crit: 'var(--crit)', critS: 'var(--crit-soft)', ia: 'var(--c-basic)', ib: 'var(--c-clin)', al: 'var(--accent)', alS: 'var(--accent-soft)', warn: 'var(--warn)', ink: 'var(--ink)', mut: 'var(--muted)', chip: 'var(--chip)', line: 'var(--line)', paper: 'var(--paper)', clinS: 'var(--c-clin-soft)' };
  const MC = { ok: C.ok, crit: C.crit, ia: C.ia, ib: C.ib, al: C.al, ink: C.ink, warn: C.warn, mut: C.mut };
  const defs = (u) => `<defs>${Object.entries(MC).map(([k, c]) => `<marker id="fek55-m${u}-${k}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L8 4L0 8z" fill="${c}"/></marker>`).join('')}</defs>`;

  /* ---------- çizim ilkelleri ---------- */
  const PD = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + f1(p[0]) + ' ' + f1(p[1])).join(' ');
  const ln = (pts, col, w = 2, o = {}) => `<path d="${PD(pts)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o.d ? ` stroke-dasharray="${o.d}"` : ''}${o.op != null ? ` opacity="${o.op}"` : ''}${o.m ? ` marker-end="url(#fek55-m${CU}-${o.m})"` : ''}/>`;
  const tx = (x, y, s, o = {}) => `<text class="fek55-lb" x="${f1(x)}" y="${f1(y)}" text-anchor="${o.a || 'middle'}" font-size="${o.s || FS}" fill="${o.c || C.ink}"${o.b ? ' font-weight="700"' : ''}${o.op != null ? ` opacity="${o.op}"` : ''}>${esc(s)}</text>`;
  const tx2 = (x, y, lines, o = {}) => lines.map((s, i) => tx(x, y + i * ((o.s || FS) + 2), s, o)).join('');
  const cir = (x, y, r, fill, stroke, w = 1.8, op) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"${op != null ? ` opacity="${op}"` : ''}/>`;
  const soma = (x, y, s, fill, stroke, op = 1) => `<polygon points="${f1(x - s)},${f1(y + s * 0.8)} ${f1(x + s)},${f1(y + s * 0.8)} ${f1(x)},${f1(y - s)}" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round" opacity="${op}"/>`;
  const rct = (x, y, w, h, fill, stroke, r = 8, sw = 1.6, op = 1) => `<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${op}"/>`;
  const lens = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; };
  const atD = (pts, d) => { const L = lens(pts); d = cl(d, 0, L[L.length - 1]); for (let i = 1; i < pts.length; i++) if (d <= L[i]) { const k = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; } return pts[pts.length - 1]; };
  const dot = (pts, f) => {
    if (f == null || f <= 0 || f >= 1) return '';
    const L = lens(pts), D = L[L.length - 1], d1 = f * D, d0 = Math.max(0, d1 - 30);
    const tr = [atD(pts, d0)]; for (let i = 1; i < pts.length - 1; i++) if (L[i] > d0 && L[i] < d1) tr.push(pts[i]); tr.push(atD(pts, d1));
    const p = atD(pts, d1);
    return `<path d="${PD(tr)}" fill="none" stroke="${C.al}" stroke-width="4" stroke-linecap="round" opacity=".35"/>${cir(p[0], p[1], 5, C.al, C.paper, 1.2)}`;
  };
  const kapali = (p) => { const n = p.length; let d = `M${f1(p[0][0])} ${f1(p[0][1])}`; for (let i = 0; i < n; i++) { const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n]; d += `C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`; } return d + 'Z'; };
  const kord = (x, y, w, h) => {
    const Lh = [[.5, .4], [.42, .3], [.38, .14], [.3, .04], [.22, .1], [.24, .28], [.12, .34], [.04, .46], [.06, .68], [.14, .86], [.28, .92], [.4, .8], [.5, .64]];
    const Rh = [[.6, .8], [.72, .92], [.86, .86], [.94, .68], [.96, .46], [.88, .34], [.76, .28], [.78, .1], [.7, .04], [.62, .14], [.58, .3]];
    const pts = Lh.concat(Rh).map((p) => [x + p[0] * w, y + p[1] * h]);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/><path d="${kapali(pts)}" fill="${C.chip}" stroke="${C.mut}" stroke-width="1" opacity=".95"/>`;
  };
  const ellips = (cx, cy, rx, ry, st, rot = 0) => {
    const [fl, sk, op] = st === 'on' ? [C.okS, C.ok, 1] : st === 'off' ? [C.chip, C.mut, .35] : [C.chip, C.mut, 1];
    return `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${fl}" stroke="${sk}" stroke-width="1.8" opacity="${op}"${rot ? ` transform="rotate(${f1(rot)} ${f1(cx)} ${f1(cy)})"` : ''}/>`;
  };
  const sinaps = (x, y, tip, col, k = 1) => (tip === '-' ? cir(x, y, 4.5, col, col, 1) : '');

  /* ---------- deşarj dizisi (ortak) ---------- */
  const tren = () => ({ s: [], ph: 0.5 });
  const adim = (tr, t, dt, rate) => { tr.ph += Math.min(rate, 55) * dt; if (tr.ph >= 1) { tr.ph -= Math.floor(tr.ph); tr.s.push(t); if (tr.s.length > 300) tr.s.shift(); } };
  const dik = (tr, x0, y, w, win, now, col) => { let o = ''; for (const ts of tr.s) { const a = now - ts; if (a < 0 || a > win) continue; const x = x0 + w * (1 - a / win); o += `M${f1(x)} ${f1(y - 7)}V${f1(y + 7)}`; } return o ? `<path d="${o}" stroke="${col}" stroke-width="1.5" fill="none"/>` : ''; };
  const sabitDik = (tr, x0, y, w, T, col, ts1 = 0) => { let o = ''; for (const ts of tr.s) { o += `M${f1(x0 + w * ts / T)} ${f1(y - 7)}V${f1(y + 7)}`; } return o ? `<path d="${o}" stroke="${col}" stroke-width="1.5" fill="none"/>` : ''; };

  /* ---------- iskele: kontrol + svg + ticker ---------- */
  const segH = (ad, k, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${String(String(cur) === v)}">${l}</button>`).join('')}</div>`;
  function iskele(el, o) {
    const u = ++UID;
    el.classList.add('fek55');
    el.innerHTML = `<div class="fek55-ctl">${o.kontrol}</div><svg class="fek55-svg" role="img" aria-label="${esc(o.aria)}"></svg>`;
    const svg = el.querySelector('svg'), ctl = el.querySelector('.fek55-ctl');
    const vz = el.closest('.viz'), cap = vz && vz.querySelector('.viz-cap');
    const cap0 = cap ? cap.innerHTML : '';
    let lastCap = '\u0000', dar = false;
    const api = {
      u,
      setCap(h) { if (!cap || h === lastCap) return; lastCap = h; cap.innerHTML = h == null ? REF(cap0) : REF(h); },
      paint() {
        svg.innerHTML = defs(u) + o.render(dar, u);
        ctl.querySelectorAll('[data-k]').forEach((b) => b.setAttribute('aria-pressed', String(String(o.S[b.dataset.k]) === b.dataset.v)));
        if (o.ctlSync) o.ctlSync(ctl);
      },
    };
    const olc = () => { dar = el.clientWidth < 560; const r = dar ? o.dar : o.wide; svg.setAttribute('viewBox', `0 0 ${r[0]} ${r[1]}`); api.paint(); };
    ctl.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.k) { o.S[b.dataset.k] = b.dataset.v; if (o.degisti) o.degisti(b.dataset.k, b.dataset.v, api); }
      else if (b.dataset.a) o.act(b.dataset.a, b, api);
      api.paint();
    });
    if (o.svgClick) svg.addEventListener('click', (e) => { if (o.svgClick(e, api)) api.paint(); });
    const ro = 'ResizeObserver' in window ? new ResizeObserver(olc) : null;
    if (ro) ro.observe(el);
    olc();
    const stop = RM || !o.tick ? null : ticker(el, (dt) => { if (o.tick(dt, api)) api.paint(); });
    return { api, destroy: () => { if (stop) stop(); if (ro) ro.disconnect(); } };
  }
  const oynatH = (k) => RM ? '' : `<button type="button" class="btn ghost" data-a="oynat">Oynat</button>`;
  const stepH = (n) => `<div class="seg" role="group" aria-label="Adım">${Array.from({ length: n }, (_, i) => `<button type="button" data-a="adim" data-i="${i}" aria-label="Adım ${i + 1}">${i + 1}</button>`).join('')}</div>`;

  /* ============================================================
     1 · fek55_yay — refleks yayı, Renshaw, kolaylaşma
     ============================================================ */
  VIZ.fek55_yay = (el) => {
    const S = { mod: 'yay', alt: 'tek', t: 0, calis: false, bas: false };
    const STEP = 1.6, CYC = 4.5, SPK = [0.2, 0.6, 1.1, 1.8];
    const CAP = [
      '1/5 · Reseptör uyaranı algılar. Refleks, uyarana reseptör, afferent yol ve efektörle verilen otomatik, istemsiz, kalıplaşmış yanıttır. [[K2 s. 62]]',
      '2/5 · Afferent nöron uyarıyı arka kökten omuriliğe taşır. [[K2 s. 62]]',
      '3/5 · Bilgi omurilikte internöronlarla bütünleşir. Her sinaps gecikme ekler: refleksin latent süresi buradan gelir. İnternöronlar çok uyarılabilirdir, spontan deşarj hızları yüksek olabilir. [[K2 s. 62]]',
      '4/5 · Motor nöron son ortak efferent yoldur. α motor nöronlar ≈ 14 μm çaplı ve hızlıdır; γ motor nöronlar ≈ 5 μm çaplı ve daha yavaştır. [[K2 s. 62]]',
      '5/5 · Efektör kas kasılır. Yanıt uyarana özgü ve kalıplaşmıştır. [[K2 s. 62]]'];
    const CAPR = 'Renshaw hücresi motor nöron aksonunun kollateralini alır ve kendi aksonlarıyla aynı ya da komşu motor nöronları inhibe eder. [[K2 s. 62]]';
    const CAPK = { tek: 'Tek bir uyaran eşik altı EPSP oluşturur; yanıt yok. [[K2 s. 62]]', uz: 'Aynı anda gelen iki komşu girdinin EPSP\'leri toplanır ve eşik aşılır: uzaysal kolaylaşma. [[K2 s. 62]]', zam: 'Aynı girdiden hızla art arda gelen uyaranların EPSP\'leri sönmeden üst üste biner ve eşik aşılır: zamansal kolaylaşma. [[K2 s. 62]]' };
    const EVT = { tek: { A: [0.3], B: [] }, uz: { A: [0.3], B: [0.3] }, zam: { A: [0.3, 0.75, 1.2], B: [] } };
    const GW = { w: 760, h: 380, cord: [300, 40, 220, 260], skin: [20, 200, 190, 100], rec: [70, 250], A: [70, 238], B: [70, 268], a1: [[130, 150], [245, 86], [270, 80], [330, 92], [395, 118]], drg: [270, 80], inn: [395, 118], al: [365, 235], ga: [325, 265], rn: [440, 205], nb: [485, 240], ax: [[368, 248], [392, 298], [470, 310], [574, 258]], gx: [[325, 276], [345, 306], [480, 328], [650, 268]], col: [[390, 296], [425, 282], [438, 216]], ia: [[395, 127], [368, 224]], musc: [575, 200, 165, 100], sp: [650, 250], gr: [560, 36, 180, 110], grK: [560, 36, 180, 150], mn: 'M575 250 Q655 190 740 250 Q655 310 575 250Z', mc: [657, 250] };
    const GN = { w: 380, h: 560, cord: [90, 20, 200, 200], skin: [10, 250, 170, 80], rec: [50, 290], A: [48, 276], B: [48, 306], a1: [[30, 200], [40, 100], [65, 62], [80, 60], [130, 66], [185, 70]], drg: [72, 61], inn: [185, 70], al: [150, 165], ga: [112, 192], rn: [235, 140], nb: [260, 185], ax: [[152, 177], [170, 222], [195, 262], [214, 288]], gx: [[112, 203], [130, 240], [150, 345], [230, 345], [285, 300]], col: [[170, 222], [215, 190], [232, 152]], ia: [[185, 79], [155, 155]], musc: [200, 250, 170, 80], sp: [285, 292], gr: [10, 392, 360, 130], grK: [10, 392, 360, 150], mn: 'M205 292 Q285 235 365 292 Q285 349 205 292Z', mc: [285, 292] };
    const vm = (u, rest, thr, pk) => {
      if (u < 0.6) return rest - (rest - thr) * 1.12 * sm(0, 0.6, u);
      if (u < 0.68) return lerp(rest - (rest - thr) * 1.12, pk, (u - 0.6) / 0.08);
      if (u < 0.82) return lerp(pk, rest + 8, (u - 0.68) / 0.14);
      return lerp(rest + 8, rest, (u - 0.82) / 0.18);
    };
    const epspKol = (alt) => {
      const ev = EVT[alt], arr = ev.A.concat(ev.B).map((x) => x + 0.7).sort((a, b) => a - b), amp = 0.6, tau = 0.8;
      const pts = []; let last = -9, spike = null;
      for (let t = 0; t <= 4.001; t += 0.03) {
        let v = 0; for (const a of arr) if (a > last && t >= a) v += amp * (1 - Math.exp(-(t - a) / 0.08)) * Math.exp(-(t - a) / tau);
        if (v >= 1 && spike == null) { spike = t; last = t; pts.push([t, 1, 'sp']); continue; }
        pts.push([t, spike != null && t - spike < 0.5 ? 0 : v, '']);
      }
      return { pts, spike };
    };
    const kolSim = epspKol;
    const MAXT = { yay: 5 * STEP, ren: CYC, kol: 4 };
    const render = (dar, u) => {
      FS = dar ? 12 : 13; CU = u;
      const g = dar ? GN : GW, mod = S.mod, yay = mod === 'yay', ren = mod === 'ren', kol = mod === 'kol';
      let s = -1, f = 0;
      if (yay && S.bas) { s = Math.min(4, Math.floor(S.t / STEP)); f = cl((S.t - s * STEP) / STEP); if (S.t >= 5 * STEP) { s = 4; f = 1; } }
      const tc = ren ? (RM ? 4.4 : S.t % CYC) : 0;
      const kt = kol ? Math.min(S.t, 4) : 0;
      const kolRes = kol ? kolSim(S.alt) : null;
      const afA = [kol ? g.A : g.rec].concat(g.a1);
      const afB = [g.B].concat(g.a1.map((p, i) => (i < g.a1.length - 1 ? [p[0], p[1] + (dar ? 10 : 8)] : p)));
      const motor = g.ia.concat([]); // internöron → α üstü
      const mp = [g.inn].concat([g.ia[1]]).concat(g.ax);
      const mpD = [[g.inn[0], g.inn[1]], g.ia[1]].concat(g.ax);
      // durum
      let recLit = s >= 0, affLit = s >= 1, innLit = s >= 2, alLit = s >= 3 && !(s === 3 && f < 0.3), axLit = s >= 3, c = s === 4 ? sm(0, 0.7, f) : 0;
      let rnLit = false, dots = '', clock = s === 2, trace = null, dim = 1;
      if (yay) {
        if (s === 1) dots += dot(afA, f);
        if (s === 3) dots += dot(mpD, f);
        const p = s < 3 ? 0 : s === 3 ? f : 1;
        trace = [];
        const gr = g.gr, gx = gr[0] + 12, gw = gr[2] - 24, rest = gr[1] + gr[3] - 26, thr = gr[1] + gr[3] * 0.38, pk = gr[1] + 10;
        for (let q = 0; q <= p + 1e-6; q += 0.01) trace.push([gx + q * gw, vm(q, rest, thr, pk)]);
      } else if (ren) {
        const gr = g.gr, gx = gr[0] + 12, gw = gr[2] - 24, rest = gr[1] + gr[3] - 26, thr = gr[1] + gr[3] * 0.38, pk = gr[1] + 10;
        trace = [];
        for (let t = 0; t <= tc + 1e-6; t += 0.03) {
          let inh = 0; for (const ts of SPK) if (t > ts + 0.3) inh += 0.12 * Math.exp(-(t - ts - 0.3) / 0.5);
          let y = thr + (rest - thr) * (0.06 + inh);
          for (const ts of SPK) if (t >= ts && t < ts + 0.07) y = pk;
          trace.push([gx + gw * t / CYC, y]);
        }
        const alt = (RM ? [] : SPK);
        for (const ts of alt) {
          const d = tc - ts;
          if (d >= 0 && d < 0.5) dots += dot(g.ax, d / 0.5);
          if (d >= 0.1 && d < 0.4) dots += dot([g.ax[1]].concat(g.col.slice(1)), (d - 0.1) / 0.3);
          if (d >= 0.3 && d < 0.6) rnLit = true;
          if (d >= 0 && d < 0.15) alLit = true;
        }
        if (RM) { rnLit = true; alLit = true; }
        axLit = true; recLit = false; dim = 0.35;
      } else if (kol) {
        const gr = g.grK, gx = gr[0] + 12, gw = gr[2] - 24, rest = gr[1] + gr[3] - 28, thr = gr[1] + gr[3] * 0.34, pk = gr[1] + 10;
        trace = [];
        for (const q of kolRes.pts) { if (q[0] > kt + 1e-6) break; const y = q[2] === 'sp' ? pk : rest - q[1] * (rest - thr); trace.push([gx + gw * q[0] / 4, y]); }
        const ev = EVT[S.alt];
        const full = afA.concat([g.inn]).concat([g.ia[1]]);
        const fullB = afB.concat([g.inn]).concat([g.ia[1]]);
        for (const a of ev.A) dots += dot(full, (kt - a) / 0.7);
        for (const a of ev.B) dots += dot(fullB, (kt - a) / 0.7);
        recLit = kt > 0.3; affLit = kt > 0.4; innLit = kt > 0.9;
        const sp = kolRes.spike;
        alLit = sp != null && kt >= sp; axLit = alLit;
        c = sp != null ? sm(0, 0.7, kt - sp - 0.1) : 0;
        dim = 1;
      }
      const act = (b) => (b ? 1 : 0.45);
      let o = '';
      // omurilik
      o += kord(...g.cord);
      o += tx(g.cord[0] + g.cord[2] / 2, g.cord[1] + (dar ? 16 : 24), 'Arka boynuz', { c: C.mut, s: dar ? 11 : 12 });
      o += dar ? tx(g.cord[0] + g.cord[2] + 4, g.cord[1] + 196, 'Ön boynuz', { c: C.mut, a: 'start', s: 11 }) : tx(g.cord[0] + g.cord[2] + 6, 190, 'Ön boynuz', { c: C.mut, a: 'start', s: 12 });
      // deri/kas bloğu
      o += rct(...g.skin, C.chip, C.line, 14, 1.5, 0.8);
      if (!kol) {
        o += cir(g.rec[0], g.rec[1], 9, recLit ? C.okS : C.paper, recLit ? C.ok : C.ia, 2.2);
        o += tx(g.rec[0], g.skin[1] + g.skin[3] + (dar ? 14 : 16), 'Reseptör', { op: 1 });
      } else {
        o += cir(g.A[0], g.A[1], 8, recLit ? C.okS : C.paper, recLit ? C.ok : C.ia, 2) + tx(g.A[0] + 16, g.A[1] + 4, 'A', { a: 'start', b: 1 });
        o += cir(g.B[0], g.B[1], 8, S.alt === 'uz' && recLit ? C.okS : C.paper, S.alt === 'uz' && recLit ? C.ok : C.ia, 2, S.alt === 'uz' ? 1 : 0.4) + tx(g.B[0] + 16, g.B[1] + 4, 'B', { a: 'start', b: 1, op: S.alt === 'uz' ? 1 : 0.4 });
      }
      // afferent
      const afOp = ren ? 0.3 : act(affLit || yay && s < 1);
      o += ln(afA, C.ia, 2.2, { op: yay ? (affLit ? 1 : 0.55) : kol ? (affLit ? 1 : 0.6) : afOp });
      if (kol) o += ln(afB, C.ia, 2.2, { op: S.alt === 'uz' ? (affLit ? 1 : 0.6) : 0.3 });
      o += cir(g.drg[0], g.drg[1], 0, 'none', 'none') + `<ellipse cx="${g.drg[0]}" cy="${g.drg[1]}" rx="14" ry="9" fill="${C.paper}" stroke="${C.ia}" stroke-width="2"/>`;
      if (dar) o += tx2(4, 22, ['Arka kök', 'gangliyonu'], { a: 'start', c: C.mut, s: 11 });
      else o += tx(250, 56, 'Arka kök gangliyonu', { a: 'end', c: C.mut, s: 12 });
      o += dar ? tx2(46, 122, ['Afferent', 'nöron'], { a: 'start', c: C.ia, s: 11 }) : tx(112, 138, 'Afferent nöron', { c: C.ia, s: 12 });
      // internöron
      o += ln([g.inn, g.ia[1]], C.ink, 2, { op: act(innLit || kol && innLit), m: 'ink' });
      o += cir(g.inn[0], g.inn[1], 9, innLit ? C.okS : C.paper, innLit ? C.ok : C.ink, 2.2, ren ? 0.35 : 1);
      o += tx(g.inn[0] + (dar ? -4 : 14), g.inn[1] + (dar ? 26 : 26), 'İnternöron', { a: dar ? 'start' : 'start', s: dar ? 11 : 12 });
      if (clock) { const cx = g.inn[0] + 18, cy = g.inn[1] - 18; o += cir(cx, cy, 8, C.paper, C.warn, 1.8) + `<path d="M${cx} ${cy - 5}V${cy}L${cx + 4} ${cy + 2}" stroke="${C.warn}" stroke-width="1.6" fill="none"/>` + tx(cx + 12, cy + 4, 'sinaptik gecikme', { a: 'start', c: C.warn, s: dar ? 11 : 12 }); }
      // motor nöronlar
      const [ax0, ay0] = g.al;
      o += ln(g.ax, C.al, 2.5, { op: axLit ? 1 : 0.55 });
      o += ln(g.gx, C.al, 1.2, { d: '4 3', op: kol ? 0.25 : 0.8 });
      o += soma(g.ga[0], g.ga[1], 7, C.paper, C.al, kol ? 0.3 : 1);
      o += soma(ax0, ay0, 12, alLit ? C.okS : C.paper, alLit ? C.ok : C.al, 1);
      o += soma(g.nb[0], g.nb[1], 10, C.paper, C.al, 0.35);
      if (dar) {
        o += tx2(86, 160, ['α motor nöron', '≈ 14 μm · hızlı'], { a: 'end', s: 11 }) + ln([[88, 162], [135, 168]], C.mut, 0.8);
        o += tx2(86, 196, ['γ motor nöron', '≈ 5 μm · yavaş'], { a: 'end', s: 11 }) + ln([[88, 198], [106, 197]], C.mut, 0.8);
        o += tx(g.nb[0], g.nb[1] + 26, 'komşu motor nöron', { s: 11, op: 0.8 });
        o += tx(g.rn[0], g.rn[1] - 14, 'Renshaw', { s: 11, c: C.crit, op: ren ? 1 : kol ? 0.4 : 0.8 });
      } else {
        o += tx2(296, 224, ['α motor nöron', '≈ 14 μm · hızlı'], { a: 'end' }) + ln([[298, 232], [350, 236]], C.mut, 0.8);
        o += tx2(296, 262, ['γ motor nöron', '≈ 5 μm · daha yavaş'], { a: 'end' }) + ln([[298, 268], [316, 266]], C.mut, 0.8);
        o += tx(g.nb[0] + 4, g.nb[1] + 30, 'komşu motor nöron', { s: 12, op: 0.8 });
        o += tx(g.rn[0], g.rn[1] - 16, 'Renshaw hücresi', { c: C.crit, s: 12, op: ren ? 1 : kol ? 0.4 : 0.8 });
        o += tx(g.cord[0] + 10, 352, 'Son ortak efferent yol', { a: 'start', c: C.al, s: 12 });
      }
      // Renshaw
      o += ln(g.col, C.al, 1.5, { op: ren ? (rnLit ? 1 : 0.7) : kol ? 0.2 : 0.55, m: ren ? 'al' : '' });
      const rnOp = ren ? 1 : kol ? 0.3 : 0.7;
      o += cir(g.rn[0], g.rn[1], 8, rnLit ? C.critS : C.paper, C.crit, 2, rnOp);
      o += ln([[g.rn[0] - 8, g.rn[1] + 2], [g.al[0] + 12, g.al[1] - 4]], C.crit, 1.6, { op: rnLit ? 1 : 0.5 * (ren ? 1.2 : 0.7) }) + cir(g.al[0] + 12, g.al[1] - 4, 3.6, C.crit, C.crit, 1, rnOp);
      o += ln([[g.rn[0] + 8, g.rn[1] + 6], [g.nb[0] - 8, g.nb[1] - 6]], C.crit, 1.6, { op: rnLit ? 1 : 0.5 * (ren ? 1.2 : 0.7) }) + cir(g.nb[0] - 8, g.nb[1] - 6, 3.6, C.crit, C.crit, 1, rnOp);
      o += tx(g.rn[0] + (dar ? 22 : 17), g.rn[1] + 5, '−', { a: 'middle', c: C.crit, b: 1, s: 16, op: rnOp });
      // efektör kas
      const m = g.musc, cx = g.mc[0], cy = g.mc[1], sx = 1 - 0.15 * c, sy = 1 + 0.15 * c;
      o += `<g transform="translate(${cx} ${cy}) scale(${f1(sx * 100) / 100} ${f1(sy * 100) / 100}) translate(${-cx} ${-cy})"><path d="${g.mn}" fill="${c > 0.05 ? C.okS : C.chip}" stroke="${c > 0.05 ? C.ok : C.mut}" stroke-width="2"/></g>`;
      o += `<rect x="${g.sp[0] - 15}" y="${g.sp[1] - 5}" width="30" height="10" rx="5" fill="${C.paper}" stroke="${C.ia}" stroke-width="1.6"/>`;
      o += tx(m[0] + m[2] / 2 + (dar ? 0 : -12), dar ? 356 : 322, 'Efektör: iskelet kası', { s: dar ? 12 : 13 });
      o += tx(dar ? 370 : 735, dar ? 248 : 195, kol || ren ? '' : '', {});
      o += dots;
      // grafik
      const gr = kol ? g.grK : g.gr, gx = gr[0], gy = gr[1], gw = gr[2], gh = gr[3];
      o += tx(gx, gy - 8, 'Motor nöron zar potansiyeli', { a: 'start', c: C.mut, s: dar ? 11 : 12 });
      o += rct(gx, gy, gw, gh, 'none', C.line, 6, 1.5);
      const thrY = kol ? gy + gh * 0.34 : gy + gh * 0.38;
      o += `<path d="M${gx + 4} ${f1(thrY)}H${gx + gw - 4}" stroke="${C.warn}" stroke-width="1.4" stroke-dasharray="5 4" fill="none"/>` + tx(gx + gw - 6, thrY - 4, 'eşik', { a: 'end', c: C.warn, s: 11 });
      o += tx(gx + gw / 2, gy + gh + 15, 'zaman →', { c: C.mut, s: 11 });
      if (trace && trace.length > 1) o += `<path d="${PD(trace)}" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
      return o;
    };
    const S1 = {
      kontrol: `${segH('Mod', 'mod', [['yay', 'Refleks yayı'], ['ren', 'Renshaw'], ['kol', 'Kolaylaşma']], 'yay')}<span data-alt-wrap></span>${oynatH()}<button type="button" class="btn ghost" data-a="bas">Baştan</button><span data-step-wrap>${stepH(5)}</span>`,
    };
    let api;
    const capNow = () => {
      if (S.mod === 'yay') { if (!S.bas) return null; return CAP[Math.min(4, Math.floor(S.t / STEP))]; }
      if (S.mod === 'ren') return CAPR;
      return CAPK[S.alt];
    };
    const sync = (ctl) => {
      const play = ctl.querySelector('[data-a=oynat]'); if (play) play.textContent = S.calis ? 'Duraklat' : 'Oynat';
      ctl.querySelector('[data-step-wrap]').style.display = S.mod === 'yay' ? '' : 'none';
      const aw = ctl.querySelector('[data-alt-wrap]');
      if (S.mod === 'kol') { if (!aw.firstChild) aw.innerHTML = segH('Uyaran', 'alt', [['tek', 'Tek uyaran'], ['uz', 'İki komşu uyaran (uzaysal)'], ['zam', 'Hızlı ardışık uyaran (zamansal)']], S.alt); } else aw.innerHTML = '';
      api && api.setCap(capNow());
    };
    const reset = () => { S.t = 0; S.bas = false; S.calis = false; };
    const basla = () => { S.t = 0; S.bas = true; S.calis = !RM; if (RM) S.t = S.mod === 'yay' ? 5 * STEP - 0.01 : S.mod === 'ren' ? 4.4 : 4; };
    const r = iskele(el, {
      S, aria: 'Refleks yayının adımları, Renshaw hücresinin geri bildirimi ve uzaysal ile zamansal kolaylaşma; omurilik kesiti, afferent ve motor lifler ve motor nöronun zar potansiyeli grafiği',
      kontrol: S1.kontrol, wide: [760, 380], dar: [380, 560], render, ctlSync: sync,
      degisti: (k) => { if (k === 'mod') { reset(); if (S.mod !== 'yay') basla(); } if (k === 'alt') basla(); },
      act: (a, b) => {
        if (a === 'oynat') { if (!S.bas || S.t >= MAXT[S.mod] && S.mod !== 'ren') basla(); else S.calis = !S.calis; }
        else if (a === 'bas') { reset(); if (S.mod !== 'yay') basla(); }
        else if (a === 'adim') { S.bas = true; S.calis = false; S.t = +b.dataset.i * STEP + 1.5; }
      },
      tick: (dt) => {
        if (!S.calis) return false;
        S.t += dt;
        if (S.mod === 'yay' && S.t >= 5 * STEP) { S.t = 5 * STEP; S.calis = false; }
        if (S.mod === 'kol' && S.t >= 4) { S.t = 4; S.calis = false; }
        return true;
      },
    });
    api = r.api; api.paint();
    if (RM) { /* son hâl: ilk açılışta tam refleks yayı */ S.bas = true; S.t = 5 * STEP - 0.01; api.paint(); }
    return r.destroy;
  };

  /* ============================================================
     2 · fek55_germe — germe refleksi ve uzama tepkisi
     ============================================================ */
  VIZ.fek55_germe = (el) => {
    const S = { mod: 'germe', ev: null, lvl: 0, tl: 0, g: 0, cap: null };
    let now = 0;
    const T = { ia: tren(), t2: tren(), ag: tren(), an: tren(), ib: tren() };
    let gser = [];
    const WIN = 5;
    const CAPG = [
      '1/4 · Kas gerilir; iğciğin primer uçları germeyi algılar ve Ia lifleriyle omuriliğe taşır. [[K2 s. 62]]',
      '2/4 · Ia etkinliği kısa ve şiddetli fazik bileşeni, tip II etkinliği daha zayıf, uzun süren tonik bileşeni oluşturur. [[K2 s. 62]]',
      '3/4 · Ia aksonu aynı kasın ve sinerjistlerin motor nöronlarıyla doğrudan sinaps yapar; tip II lifleri sinerjistleri etkinleştirip refleksi güçlendirir. Yol monosinaptik olduğu için latans kısadır. [[K2 s. 62]]',
      '4/4 · Ia kollaterali inhibitör internöronu uyarır, internöron antagonisti baskılar: resiprokal inhibisyon. Agonist ve sinerjist kasılır, diz açılır. [[K2 s. 62]]'];
    const CAPU = ['Gerim arttıkça Golgi tendon organından gelen deşarj artar. [[K1 s. 247]]', 'Çok güçlü kasılmada uzama tepkisi α motor nöronu baskılar ve kas liflerini hasardan korur: kasın ürettiği kuvvet kendi gevşemesinin uyaranıdır. Bu tepki normal kas etkinliğinde gerimi düzenlemeye de katılabilir. [[K2 s. 62]]'];
    const dE = () => (S.ev == null ? -1 : now - S.ev);
    const stg = () => { const d = dE(); return d < 0 ? 0 : d < 1 ? 1 : d < 2.5 ? 2 : d < 4 ? 3 : 4; };
    const gerimHedef = () => { if (S.lvl < 5) return [0, 28, 42, 56, 70][S.lvl]; return S.tl < 0.7 ? 100 : 8; };
    const rates = () => {
      if (S.mod === 'germe') {
        const d = dE(); const inh = d >= 3.2 && d < 7.5;
        return { ia: 6 + (d >= 0.5 && d < 1.1 ? 64 : 0), t2: 6 + (d >= 0.7 && d < 3.6 ? 10 : 0), ag: 10 + (d >= 1.6 && d < 4.2 ? 32 : 0), an: inh ? 0 : 14, ib: 0 };
      }
      const inhB = S.lvl === 5 && S.tl > 0.45;
      return { ia: 8, t2: 0, ag: inhB ? 0 : S.lvl === 0 ? 10 : 30 + 7 * S.lvl, an: 12, ib: 4 + 0.5 * S.g };
    };
    const step = (dt) => {
      now += dt; S.tl += dt;
      if (S.mod === 'germe' && S.ev != null && now - S.ev > 8.6) S.ev = null;
      const tg = gerimHedef(); S.g += (tg - S.g) * (1 - Math.exp(-dt * 6));
      const r = rates(); for (const k in T) adim(T[k], now, dt, r[k]);
      if (S.mod === 'uz') { gser.push([now, S.g]); if (gser.length > 400) gser.shift(); }
    };
    const simule = (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); };
    const reset = () => { for (const k in T) T[k] = tren(); gser = []; S.ev = null; S.lvl = 0; S.tl = 0; S.g = 0; S.cap = null; now = 0; };
    const GW = { w: 760, h: 400, hip: [110, 160], knee: [230, 160], L: 150, qx: [128, 222], qy: 137, hy: 183, sx: [140, 215], sy: 112, spin: [160, 137], gto: [214, 138],
      Ia: [[160, 130], [160, 64], [340, 64], [380, 84], [386, 100]], II: [[176, 132], [176, 48], [340, 48], [384, 70]], Ib: [[214, 131], [214, 28], [420, 28], [428, 60]],
      ag: [400, 258], sn: [455, 258], an: [520, 258], inh: [508, 158], ibi: [440, 172], cord: [360, 40, 200, 290], B: [386, 100], sx0: 585, sw: 165, sy0: 24, sh: 76, nm: 'wide' };
    const GN = { w: 380, h: 640, hip: [30, 140], knee: [130, 140], L: 80, qx: [42, 122], qy: 118, hy: 164, sx: [55, 118], sy: 96, spin: [68, 118], gto: [116, 119],
      Ia: [[68, 112], [68, 38], [196, 38], [206, 56], [214, 84]], II: [[84, 114], [84, 24], [196, 24], [212, 50]], Ib: [[116, 114], [116, 10], [250, 10], [256, 50]],
      ag: [224, 222], sn: [280, 222], an: [336, 222], inh: [326, 138], ibi: [256, 160], cord: [190, 44, 180, 216], B: [214, 84], sx0: 14, sw: 350, sy0: 296, sh: 80, nm: 'dar' };
    const render = (dar, u) => {
      FS = dar ? 12 : 13; CU = u;
      const g = dar ? GN : GW, uz = S.mod === 'uz';
      const d = dE(), s = uz ? 0 : stg();
      let o = '';
      // durum değişkenleri
      let ang = 0, sh = 0, str = 0, antOp = 1, hamSt = 'n';
      const ex = uz ? 0 : 1;
      if (!uz && d >= 0) {
        const fall = 1 - sm(7, 8.2, d);
        sh = sm(3, 4.2, d) * fall; ang = 15 * sh; str = 0.08 * sm(0.2, 0.5, d) * (1 - sm(0.5, 1.2, d));
        antOp = 1 - 0.65 * sm(3.9, 4.4, d) * fall;
      }
      const inhOn = uz && S.lvl === 5 && S.tl > 0.45;
      const ibOn = uz && (4 + 0.5 * S.g) > 28;
      const thick = uz ? 1 + 0.006 * S.g : 1 + 0.35 * sh;
      const lenF = uz ? 1 : 1 + str - 0.15 * sh;
      // bacak
      const [hx, hy] = g.hip, [kx, ky] = g.knee, th = [kx - hx];
      const aR = ang * Math.PI / 180;
      const ank = [kx + g.L * Math.sin(aR), ky + g.L * Math.cos(aR)];
      o += ln([g.hip, g.knee, ank], C.mut, 7, { op: 0.5 });
      o += cir(kx, ky, 8, C.paper, C.mut, 2.5);
      const qc = (g.qx[0] + g.qx[1]) / 2, qw = (g.qx[1] - g.qx[0]) / 2;
      const agSt = (!uz && sh > 0.4) || (uz && S.g > 5 && !(S.lvl === 5 && S.tl > 1.2)) ? 'on' : 'n';
      o += ellips(qc, g.qy, qw * lenF, 13 * thick, agSt);
      o += ellips((g.sx[0] + g.sx[1]) / 2, g.sy, (g.sx[1] - g.sx[0]) / 2 * lenF, 8 * (uz ? 1 : 1 + 0.2 * sh), !uz && sh > 0.4 ? 'on' : 'n');
      o += `<g opacity="${f1(antOp * 100) / 100}">${ellips(qc, g.hy, qw, 13, 'n')}</g>`;
      // tendon + iğcik + GTO
      o += ln([[g.qx[1] * 1 + (g.qx[1] - qc) * 0 - (1 - lenF) * qw * 0, g.qy], [kx + 6, ky + 20]], C.mut, 3, {});
      o += `<ellipse cx="${g.spin[0]}" cy="${g.spin[1]}" rx="10" ry="3.6" fill="${C.paper}" stroke="${C.ia}" stroke-width="2"/>`;
      o += `<path d="M${g.gto[0] - 5} ${g.gto[1] - 5}l4 3l-4 3l4 3l-4 3" stroke="${C.ib}" stroke-width="2" fill="none" stroke-linejoin="round"/>`;
      // ayak
      o += ln([ank, [ank[0] + 20, ank[1] + 3]], C.mut, 6, { op: 0.5 });
      // çekiç
      if (!uz) {
        const P = dar ? [200, 96] : [310, 120];
        const th2 = d < 0 ? 200 : d < 0.3 ? 200 - 63 * sm(0, 0.3, d) : 137 + 63 * sm(0.4, 0.9, d);
        const tr = th2 * Math.PI / 180, h = dar ? [P[0] + 62 * Math.cos(tr), P[1] + 62 * Math.sin(tr)] : [P[0] + 95 * Math.cos(tr), P[1] + 95 * Math.sin(tr)];
        o += ln([P, h], C.mut, 3) + cir(h[0], h[1], 7, C.ink, C.ink, 1) + cir(P[0], P[1], 3, C.mut, C.mut, 1);
      }
      // etiketler
      if (!dar) {
        o += tx2(100, 134, ['Agonist:', 'kuadriseps'], { a: 'end' }) + tx(100, 116, 'Sinerjist', { a: 'end' });
        o += tx2(100, 180, ['Antagonist:', 'hamstring'], { a: 'end', op: antOp });
        o += tx(154, 84, 'Kas iğciği', { a: 'end', c: C.ia });
        o += tx2(228, 100, ['Golgi', 'tendon organı'], { a: 'start', c: C.ib });
      } else {
        o += tx2(10, 238, ['Agonist: kuadriseps', 'Antagonist: hamstring', 'Sinerjist: eş etkili kas'], { a: 'start', s: 12 });
        o += tx(60, 78, 'iğcik', { a: 'end', c: C.ia, s: 11 }) + tx(116, 100, 'GTO', { a: 'middle', c: C.ib, s: 11 });
      }
      // omurilik
      o += kord(...g.cord);
      const lit = (b) => (b ? 1 : 0.4);
      const ia = s >= 2 || uz, c3 = s >= 3 || uz, c4 = s >= 4;
      o += ln(g.Ia, C.ia, 2.4, { op: lit(ia) });
      o += ln(g.II, C.ia, 1.8, { d: '4 3', op: lit(s >= 2 && !uz) });
      if (uz) o += ln(g.Ib, C.ib, 2.2, { op: lit(true) });
      const B = g.B, ag = g.ag, sn = g.sn, an = g.an, inh = g.inh, ibi = g.ibi;
      o += ln([B, [ag[0] - 2, ag[1] - 14]], C.ia, 2, { op: lit(c3), m: 'ok' });
      o += ln([[B[0] + 4, B[1] + 4], [sn[0] - 2, sn[1] - 14]], C.ia, 2, { op: lit(c3), m: 'ok' });
      o += ln([[g.II[g.II.length - 1][0], g.II[g.II.length - 1][1]], [(g.II[g.II.length - 1][0] + sn[0]) / 2 + 10, (g.II[g.II.length - 1][1] + sn[1]) / 2 - 20], [sn[0] + 3, sn[1] - 14]], C.ia, 1.6, { d: '4 3', op: lit(c3 && !uz) });
      o += ln([[B[0] + 6, B[1] + 18], [inh[0] - 8, inh[1] - 8]], C.ia, 1.8, { op: lit(c4 && !uz), m: 'ok' });
      o += ln([[inh[0] + 2, inh[1] + 9], [an[0] - 2, an[1] - 14]], C.crit, 2, { op: lit(c4 && !uz) }) + cir(an[0] - 2, an[1] - 14, 4, C.crit, C.crit, 1, lit(c4 && !uz));
      o += cir(inh[0], inh[1], 9, c4 && !uz ? C.critS : C.paper, C.crit, 2, uz ? 0.35 : 1);
      if (uz) {
        o += ln([[g.Ib[3][0], g.Ib[3][1]], [ibi[0], ibi[1] - 9]], C.ib, 2, { op: lit(true) });
        o += ln([[ibi[0] - 5, ibi[1] + 8], [ag[0] + 8, ag[1] - 14]], C.crit, 2, { op: lit(inhOn || ibOn) }) + cir(ag[0] + 8, ag[1] - 14, 4, C.crit, C.crit, 1, lit(inhOn || ibOn));
        o += cir(ibi[0], ibi[1], 9, ibOn ? C.critS : C.paper, C.crit, 2);
        o += dar ? tx2(ibi[0] + 12, ibi[1] + 16, ['Ib', 'internöronu'], { a: 'start', s: 11 }) : tx2(ibi[0] + 14, ibi[1] + 24, ['Ib', 'internöronu'], { a: 'start' });
      }
      o += soma(ag[0], ag[1], 11, (c3 && !uz) || (uz && S.g > 5 && !inhOn) ? C.okS : inhOn ? C.critS : C.paper, inhOn ? C.crit : C.ok, 1);
      o += soma(sn[0], sn[1], 11, c3 && !uz ? C.okS : C.paper, C.ok, c3 && !uz ? 1 : 0.55);
      o += soma(an[0], an[1], 11, c4 && !uz ? C.critS : C.paper, c4 && !uz ? C.crit : C.mut, 1);
      if (dar) {
        o += tx2(ag[0], ag[1] + 24, ['agonist', 'α'], { s: 11 }) + tx2(sn[0], sn[1] + 24, ['sinerjist', 'α'], { s: 11 }) + tx2(an[0], an[1] + 24, ['antagonist', 'α'], { s: 11 });
        o += tx2(inh[0] + 40, inh[1] - 26, ['İnhibitör', 'internöron'], { s: 11, a: 'end' });
      } else {
        o += tx(ag[0], ag[1] + 30, 'agonist α') + tx(sn[0], sn[1] + 44, 'sinerjist α') + tx(an[0], an[1] + 30, 'antagonist α');
        o += tx2(inh[0] + 14, inh[1] - 2, ['İnhibitör', 'internöron'], { a: 'start' });
        if (s >= 3 || uz) o += tx(ag[0] - 24, ag[1] + 56, s === 3 && !uz ? 'tek sinaps · kısa latans' : '', { a: 'start', c: C.ok, s: 12 });
      }
      // nokta
      if (!uz && d >= 1 && d < 3) { const full = g.Ia.concat([[ag[0] - 2, ag[1] - 14]]); o += dot(full, (d - 1) / 2); }
      // şeritler
      const names = uz ? [['Ia', 'ia', C.ia], ['Agonist α', 'ag', C.ok], ['Ib', 'ib', C.ib], ['Kas gerimi', 'gm', C.mut]] : [['Ia', 'ia', C.ia], ['Tip II', 't2', C.ia], ['Agonist α', 'ag', C.ok], ['Antagonist α', 'an', C.crit]];
      names.forEach(([nm, k, col], i) => {
        const y0 = g.sy0 + i * g.sh, x0 = g.sx0, w = g.sw, mid = y0 + 14 + (g.sh - 14) / 2;
        o += tx(x0, y0 + 11, nm, { a: 'start', c: C.mut, s: dar ? 11 : 12 });
        o += `<rect x="${x0}" y="${y0 + 14}" width="${w}" height="${g.sh - 20}" rx="5" fill="${C.chip}" opacity=".5"/>`;
        if (k === 'gm') {
          const hh = g.sh - 28, top = y0 + 21;
          const thrY = top + hh * (1 - 0.85);
          o += `<path d="M${x0 + 3} ${f1(thrY)}H${x0 + w - 3}" stroke="${C.warn}" stroke-width="1.3" stroke-dasharray="4 3" fill="none"/>` + tx(x0 + w - 4, thrY - 3, 'eşik', { a: 'end', c: C.warn, s: 10 });
          const pts = gser.filter((q) => now - q[0] <= WIN).map((q) => [x0 + w * (1 - (now - q[0]) / WIN), top + hh * (1 - Math.min(1, q[1] / 100))]);
          if (pts.length > 1) o += `<path d="${PD(pts)}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
        } else o += dik(T[k], x0, mid, w, WIN, now, col);
      });
      if (!dar && !uz && d >= 0.6) {
        o += tx(g.sx0 + 4, g.sy0 + 11, 'fazik · kısa, şiddetli', { a: 'start', c: C.ia, s: 11, op: 0 });
      }
      if (!uz) {
        const lblY = g.sy0 + 11;
        o += tx(g.sx0 + g.sw, lblY, 'fazik · kısa, şiddetli', { a: 'end', c: C.ia, s: 11, op: d >= 1 && d < 3.5 ? 1 : 0.35 });
        o += tx(g.sx0 + g.sw, lblY + g.sh, 'tonik · zayıf, uzun', { a: 'end', c: C.ia, s: 11, op: d >= 1 && d < 3.8 ? 1 : 0.35 });
      }
      return o;
    };
    let api;
    const capNow = () => {
      if (S.mod === 'germe') { if (S.ev == null && S.cap == null) return null; return S.cap; }
      return S.cap;
    };
    const sync = (ctl) => {
      const x = ctl.querySelector('[data-w]'); if (x.dataset.m !== S.mod) { x.dataset.m = S.mod; x.innerHTML = S.mod === 'germe' ? '<button type="button" class="btn ghost" data-a="ger">Ger</button>' : '<button type="button" class="btn ghost" data-a="art">Kasılmayı artır</button><button type="button" class="btn ghost" data-a="bas">Baştan</button>'; }
      if (S.mod === 'germe' && S.ev != null) S.cap = CAPG[stg() - 1 < 0 ? 0 : stg() - 1];
      api && api.setCap(capNow());
    };
    const r = iskele(el, {
      S, aria: 'Germe refleksi: kas iğciğinden Ia ve tip II lifleri omuriliğe gider, agonist ve sinerjist motor nöronları uyarılır, antagonist inhibitör internöronla baskılanır; çok güçlü kasılmada Golgi tendon organı Ib lifiyle agonisti baskılar; sağda deşarj şeritleri',
      kontrol: `${segH('Mod', 'mod', [['germe', 'Germe refleksi'], ['uz', 'Güçlü kasılma (uzama tepkisi)']], 'germe')}<span data-w></span>`,
      wide: [760, 400], dar: [380, 640], render, ctlSync: sync,
      degisti: () => { reset(); simule(5); if (S.mod === 'uz') { S.cap = null; } },
      act: (a) => {
        if (a === 'ger') { S.ev = now; S.cap = CAPG[0]; if (RM) { simule(6.2); S.cap = CAPG[3]; S.ev = now - 6.2; } }
        else if (a === 'art') { if (S.lvl < 5) { S.lvl++; S.tl = 0; S.cap = S.lvl < 5 ? CAPU[0] : CAPU[1]; if (RM) simule(S.lvl === 5 ? 2.5 : 1.5); } }
        else if (a === 'bas') { reset(); simule(5); }
      },
      tick: (dt) => { step(dt); if (S.mod === 'germe' && S.ev != null) { const k = stg(); S.cap = CAPG[Math.max(0, k - 1)]; } return true; },
    });
    api = r.api;
    simule(5);
    if (RM) { S.ev = now; simule(6.2); S.ev = now - 6.2; S.cap = CAPG[3]; }
    api.paint();
    return r.destroy;
  };

  /* ============================================================
     3 · fek55_cekilme — geri çekilme, çapraz ekstansör, artdeşarj
     ============================================================ */
  VIZ.fek55_cekilme = (el) => {
    const S = { t: 0, calis: false, bas: false };
    const TT = 9.5, SD = 2;
    let T = { pa: tren(), fl: tren() };
    const CAP = [
      '1/4 · Aδ ve C liflerinin serbest sinir uçlarındaki ağrı reseptörleri uyarılır. Geri çekilme, vücudu zararlı uyarandan uzaklaştıran bir deri refleksidir. [[K2 s. 62]]',
      '2/4 · Ağrı reseptörü ile α motor nöron arasında birkaç internöron vardır: yol polisinaptiktir. Fleksörler kasılır, antagonist ekstansörler aynı anda baskılanır: resiprokal innervasyon. [[K2 s. 62]]',
      '3/4 · Omuriliği çaprazlayan internöronlar karşı taraftaki ekstansör motor nöronları uyarır: çapraz ekstansör refleks. [[K2 s. 62]]',
      '4/4 · Reseptör deşarjı bitse de yanıt sürer: internöron dallarının kurduğu yankılanan devreler motor nöronu yeniden uyarır. Buna artdeşarj denir. [[K2 s. 62]]'];
    const rt = (t) => ({ pa: 4 + (t > 0.2 && t < 2.8 ? 34 : 0), fl: 5 + (t > 1.8 && t < 2.8 ? 26 : 0) + (t >= 2.8 && t < 7 ? 26 : 0) + (t >= 7 && t < 7.6 ? 12 : 0) });
    const sim = (t) => { T = { pa: tren(), fl: tren() }; for (let x = 0; x < t; x += 0.02) { const r = rt(x); adim(T.pa, x, 0.02, r.pa); adim(T.fl, x, 0.02, r.fl); } };
    const stp = (t) => Math.min(3, Math.floor(t / SD));
    // kord kutusu (geniş) → dar dönüşümü
    const W = { w: 760, h: 420, cord: [250, 30, 260, 200], map: (p) => p, sx: 568, sw: 182, y1: 36, y2: 140, sh: 80, hipL: [190, 262], hipR: [370, 262], foot: 392, nl: nm => nm };
    const N = { w: 380, h: 620, cord: [70, 20, 240, 200], map: (p) => [70 + (p[0] - 250) * (240 / 260), 20 + (p[1] - 30)], sx: 10, sw: 360, y1: 436, y2: 524, sh: 76, hipL: [110, 250], hipR: [270, 250] };
    const render = (dar, u) => {
      FS = dar ? 12 : 13; CU = u;
      const g = dar ? N : W, M = g.map, t = S.t, s = S.bas ? stp(t) : -1;
      const fl = S.bas ? sm(1.9, 2.9, t) * (1 - sm(7.6, 9.2, t)) : 0, ex = S.bas ? sm(4, 5, t) * (1 - sm(7.8, 9.2, t)) : 0;
      let o = kord(...g.cord);
      const i1 = M([305, 62]), i2 = M([325, 95]), i3 = M([350, 128]), inL = M([342, 158]), fL = M([290, 200]), eL = M([345, 200]), eR = M([415, 200]), fR = M([470, 200]), inR = M([470, 158]);
      const loop = [M([350, 134]), M([300, 150]), M([272, 100]), M([292, 64])];
      const cross = [M([352, 134]), M([400, 148]), M([470, 158])], toER = [M([400, 148]), M([415, 188])];
      const opn = (b) => (b ? 1 : 0.4);
      const lit2 = s >= 1, lit3 = s >= 2, lit4 = s >= 3;
      o += tx(g.cord[0] + g.cord[2] / 2, g.cord[1] + 15, 'orta hat', { c: C.mut, s: 11, op: 0.8 }) + `<path d="M${M([380, 22])[0]} ${g.cord[1] + 22}V${g.cord[1] + g.cord[3] - 4}" stroke="${C.mut}" stroke-width="1" stroke-dasharray="4 4" opacity=".6"/>`;
      // afferent
      const footL = [g.hipL[0] - (dar ? 0 : 0), dar ? 372 : 384];
      const aff = dar ? [[footL[0], footL[1] - 8], [48, 330], [36, 200], [48, 90], [100, 54], i1] : [[footL[0], footL[1] - 8], [110, 330], [60, 250], [60, 110], [210, 66], [i1[0] - 8, i1[1]]];
      o += ln(aff, C.warn, 2.4, { op: opn(s >= 0 && S.bas) });
      o += tx(dar ? 6 : 70, dar ? 12 : 205, dar ? 'Aδ ve C lifleri · serbest uçlar' : 'Aδ ve C lifleri', { a: 'start', c: C.warn, s: dar ? 11 : 13 });
      if (!dar) o += tx(70, 220, 'serbest sinir uçları', { a: 'start', c: C.warn });
      // internöron zinciri
      o += ln([i1, i2, i3], C.ink, 1.8, { op: opn(lit2) });
      o += ln(loop, C.ink, 1.6, { op: opn(lit4), d: '4 3', m: 'ink' });
      const lbL = dar ? [i3[0] - 20, i3[1] + 26] : [246, 150];
      o += tx(lbL[0], lbL[1], 'yankılanan devre', { a: dar ? 'start' : 'end', c: C.mut, s: dar ? 11 : 12 });
      o += tx(i3[0] + 12, i3[1] - 10, 'internöronlar', { a: 'start', c: C.mut, s: dar ? 11 : 12 });
      [i1, i2, i3].forEach((p) => { o += cir(p[0], p[1], 7, lit2 ? C.okS : C.paper, lit2 ? C.ok : C.ink, 2); });
      // fleksör uyarımı + ekstansör baskı
      o += ln([i3, [fL[0] + 2, fL[1] - 13]], C.ok, 2, { op: opn(lit2), m: 'ok' });
      o += ln([i3, inL], C.crit, 1.6, { op: opn(lit2) }) + cir(inL[0], inL[1], 7, lit2 ? C.critS : C.paper, C.crit, 2);
      o += ln([[inL[0], inL[1] + 7], [eL[0], eL[1] - 14]], C.crit, 2, { op: opn(lit2) }) + cir(eL[0], eL[1] - 14, 3.5, C.crit, C.crit, 1, opn(lit2));
      // çapraz
      o += ln(cross, C.ok, 2, { op: opn(lit3) });
      o += ln(toER, C.ok, 2, { op: opn(lit3), m: 'ok' });
      o += cir(inR[0], inR[1], 7, lit3 ? C.critS : C.paper, C.crit, 2);
      o += ln([[inR[0], inR[1] + 7], [fR[0], fR[1] - 14]], C.crit, 2, { op: opn(lit3) }) + cir(fR[0], fR[1] - 14, 3.5, C.crit, C.crit, 1, opn(lit3));
      // motor nöronlar
      const act = (b, c) => (b ? c : C.paper);
      o += soma(fL[0], fL[1], 11, lit2 && fl > 0.2 || s >= 1 ? C.okS : C.paper, C.ok);
      o += soma(eL[0], eL[1], 11, C.paper, C.crit, s >= 1 ? 1 : 0.5);
      o += soma(eR[0], eR[1], 11, s >= 2 ? C.okS : C.paper, C.ok, s >= 2 ? 1 : 0.6);
      o += soma(fR[0], fR[1], 11, C.paper, C.crit, s >= 2 ? 1 : 0.5);
      o += tx(fL[0], fL[1] + 28, 'fleksör α', { s: dar ? 11 : 12 }) + tx(eL[0] + (dar ? 4 : 6), fL[1] + 42, 'ekstansör α', { s: dar ? 11 : 12 }) + tx(eR[0] - (dar ? 4 : 6), fL[1] + 28, 'ekstansör α', { s: dar ? 11 : 12 }) + tx(fR[0] + (dar ? 4 : 0), fL[1] + 42, 'fleksör α', { s: dar ? 11 : 12 });
      // noktalar
      let dots = '';
      if (S.bas) {
        if (s === 0) dots += dot(aff, cl(t / 1.8));
        if (s === 1) { const p = (t - 2) / 2; dots += dot([i1, i2, i3, [fL[0] + 2, fL[1] - 13]], p); }
        if (s === 2) { const p = (t - 4) / 2; dots += dot(cross.concat([toER[1]]), p); }
        if (s === 3) { const p = (t - 6) / 2; const per = 0.33; const k = (p % per) / per; if (p < 1) { const L = lens(loop), D = L[L.length - 1]; const pt = atD(loop, k * D); dots += cir(pt[0], pt[1], 5, C.al, C.paper, 1.2); } }
      }
      o += dots;
      // bacaklar
      const leg = (hip, kneeRest, kneeAct, ankRest, ankAct, k) => { const kn = [lerp(kneeRest[0], kneeAct[0], k), lerp(kneeRest[1], kneeAct[1], k)], an = [lerp(ankRest[0], ankAct[0], k), lerp(ankRest[1], ankAct[1], k)]; return { hip, kn, an }; };
      const dxL = g.hipL[0] - 190, dyL = g.hipL[1] - 262, dxR = g.hipR[0] - 370, dyR = g.hipR[1] - 262;
      const Lg = leg(g.hipL, [190 + dxL, 325 + dyL], [225 + dxL, 300 + dyL], [190 + dxL, 385 + dyL], [205 + dxL, 340 + dyL], fl);
      const Rg = leg(g.hipR, [360 + dxR, 325 + dyR], [370 + dxR, 322 + dyR], [362 + dxR, 385 + dyR], [370 + dxR, 385 + dyR], ex);
      o += `<path d="M${g.hipL[0]} ${g.hipL[1]}H${g.hipR[0]}" stroke="${C.mut}" stroke-width="6" stroke-linecap="round" opacity=".5"/>`;
      const bacak = (G, fSt, eSt, sol) => {
        let q = ln([G.hip, G.kn, G.an], C.mut, 7, { op: 0.5 });
        const mid = [(G.hip[0] + G.kn[0]) / 2, (G.hip[1] + G.kn[1]) / 2], ang = Math.atan2(G.kn[1] - G.hip[1], G.kn[0] - G.hip[0]), len = Math.hypot(G.kn[0] - G.hip[0], G.kn[1] - G.hip[1]);
        const nx = -Math.sin(ang), ny = Math.cos(ang), deg = ang * 180 / Math.PI;
        const a = [mid[0] - nx * 13, mid[1] - ny * 13], b = [mid[0] + nx * 13, mid[1] + ny * 13];
        const [fp, ep] = sol ? [a, b] : [a, b];
        q += ellips(fp[0], fp[1], len * 0.38, 6.5, fSt, deg) + ellips(ep[0], ep[1], len * 0.38, 6.5, eSt, deg);
        q += cir(G.kn[0], G.kn[1], 6, C.paper, C.mut, 2) + ln([G.an, [G.an[0] + 20, G.an[1] + 3]], C.mut, 5, { op: 0.5 });
        return q;
      };
      o += bacak(Lg, fl > 0.3 ? 'on' : 'n', fl > 0.3 ? 'off' : 'n', true) + bacak(Rg, ex > 0.3 ? 'off' : 'n', ex > 0.3 ? 'on' : 'n', false);
      // çivi
      const nx0 = Lg.an[0] > g.hipL[0] + 10 ? 0 : 1;
      const nail = [g.hipL[0] - (dar ? 0 : 0), (dar ? 372 : 384) + 18];
      o += `<polygon points="${nail[0] - 12},${nail[1] + 10} ${nail[0] + 12},${nail[1] + 10} ${nail[0]},${nail[1] - 8}" fill="${C.warn}" stroke="${C.warn}" stroke-width="1.5" stroke-linejoin="round"/>`;
      o += tx(nail[0] + (dar ? 22 : 24), nail[1] + 12, 'ağrılı uyaran', { a: 'start', c: C.warn, s: dar ? 12 : 13 });
      // şeritler
      const sx = g.sx, sw = g.sw, bandW = sw * 2.8 / TT;
      [[g.y1, 'Ağrı lifi deşarjı', T.pa, C.warn], [g.y2, 'Sol fleksör α deşarjı', T.fl, C.ok]].forEach(([y0, nm, tr, col], i) => {
        o += tx(sx, y0 + 12, nm, { a: 'start', c: C.mut, s: dar ? 11 : 12 });
        o += `<rect x="${sx}" y="${y0 + 18}" width="${sw}" height="${g.sh - 28}" rx="5" fill="${C.chip}" opacity=".55"/>`;
        o += `<rect x="${sx + sw * 0.2 / TT}" y="${y0 + 18}" width="${f1(sw * 2.6 / TT)}" height="${g.sh - 28}" fill="${C.mut}" opacity=".28"/>`;
        o += sabitDik(tr, sx, y0 + 18 + (g.sh - 28) / 2, sw, TT, col);
        if (i === 0) o += tx(sx + sw * 1.5 / TT, y0 + g.sh - 2, 'uyaran', { c: C.mut, s: 11 });
      });
      if (S.bas) o += `<path d="M${f1(sx + sw * t / TT)} ${g.y1 + 16}V${g.y2 + g.sh - 8}" stroke="${C.al}" stroke-width="1.4" opacity=".8"/>`;
      const bx0 = sx + sw * 2.8 / TT, bx1 = sx + sw * 7.6 / TT, by = g.y2 + g.sh - 6;
      o += `<path d="M${f1(bx0)} ${by - 4}V${by}H${f1(bx1)}V${by - 4}" stroke="${C.warn}" stroke-width="1.5" fill="none" opacity="${t > 5 && S.bas ? 1 : 0.35}"/>` + tx((bx0 + bx1) / 2, by + 13, 'artdeşarj', { c: C.warn, s: 11, op: t > 5 && S.bas ? 1 : 0.5 });
      return o;
    };
    let api;
    const sync = (ctl) => { const p = ctl.querySelector('[data-a=oynat]'); if (p) p.textContent = S.calis ? 'Duraklat' : 'Oynat'; api && api.setCap(S.bas ? CAP[stp(S.t)] : null); };
    const r = iskele(el, {
      S, aria: 'Geri çekilme refleksi: çiviye basan ayakta ağrı lifleri omuriliğe girer, internöron zinciri aynı taraf fleksörü uyarır ve ekstansörü baskılar, orta hattı geçen internöron karşı tarafta ekstansörü uyarır, yankılanan devre artdeşarj üretir; sağda deşarj şeritleri',
      kontrol: `${oynatH()}<button type="button" class="btn ghost" data-a="bas">Baştan</button>${stepH(4)}`,
      wide: [760, 420], dar: [380, 620], render, ctlSync: sync,
      act: (a, b) => {
        if (a === 'oynat') { if (!S.bas || S.t >= TT - 0.01) { S.bas = true; S.t = 0; sim(0); S.calis = true; } else S.calis = !S.calis; }
        else if (a === 'bas') { S.bas = false; S.t = 0; S.calis = false; sim(0); }
        else if (a === 'adim') { S.bas = true; S.calis = false; S.t = +b.dataset.i * SD + 1.9; sim(S.t); }
      },
      tick: (dt) => {
        if (!S.calis) return false;
        const t0 = S.t; S.t = Math.min(TT, S.t + dt);
        for (let x = t0; x < S.t; x += 0.01) { const rr = rt(x); adim(T.pa, x, 0.01, rr.pa); adim(T.fl, x, 0.01, rr.fl); }
        if (S.t >= TT) S.calis = false;
        return true;
      },
    });
    api = r.api;
    if (RM) { S.bas = true; S.t = 7.2; sim(S.t); }
    api.paint();
    return r.destroy;
  };

  /* ============================================================
     4 · fek55_koakt — kas tonusu ve α–γ koaktivasyonu
     ============================================================ */
  VIZ.fek55_koakt = (el) => {
    const S = { mod: 'a', tp: null, bas: false };
    let now = 0; const TI = tren(); let ser = []; const WIN = 7;
    const CAPR = 'Dinlenimde motor nöronların tonik etkinliği kası önceden ayarlı uzunlukta tutar; kasın pasif germeye gösterdiği refleks direnç kas tonusudur ve postürün korunması için gereklidir. [[K2 s. 63]]';
    const CAPM = { a: 'Yalnız α etkinliğinde kas kısalırken iğcik gevşer ve Ia deşarjı azalır; SSS kısalmanın hızını ve miktarını algılayamaz. [[K2 s. 63]]', ag: 'γ motor nöron etkinliği intrafuzal lifleri ekstrafuzal liflerle birlikte kısaltır; sarkomersiz orta bölge gergin kalır ve Ia deşarjı sürer: α–γ koaktivasyonu. γ motor nöronların doğrudan uyarılması hareket başlatabilir, ama normalde böyle olmaz. [[K2 s. 63]]' };
    const cOf = () => { if (S.tp == null) return 0; const d = now - S.tp; return d < 3 ? sm(0, 3, d) : d < 4 ? 1 : d < 5 ? 1 - sm(4, 5, d) : 0; };
    const step = (dt) => {
      now += dt; if (S.tp != null && now - S.tp > 5.3) S.tp = null;
      const c = cOf(); const rate = S.mod === 'a' ? 18 * (1 - 0.93 * c) : 18 + 3 * c;
      adim(TI, now, dt, rate); ser.push([now, c]); if (ser.length > 500) ser.shift();
    };
    const simule = (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); };
    const reset = () => { now = 0; S.tp = null; S.bas = false; TI.s = []; ser = []; };
    const GW = { w: 760, h: 340, x0: 70, x1: 720, y0: 30, ft: [38, 64], fb: [156, 182], iy: 110, st: 560, sx: 70, sw: 650, y1: 214, y2: 270, sh: 56, shrink: 136, pit: 16 };
    const GN = { w: 380, h: 440, x0: 36, x1: 360, y0: 20, ft: [34, 58], fb: [186, 210], iy: 122, sx: 10, sw: 360, y1: 244, y2: 330, sh: 80, shrink: 68, pit: 13 };
    const render = (dar, u) => {
      FS = dar ? 12 : 13; CU = u;
      const g = dar ? GN : GW, c = cOf(), R = g.x1 - g.shrink * c;
      let o = '';
      const pit = g.pit - 4 * c, con = c > 0.05;
      [g.ft, g.fb].forEach((fb) => {
        o += rct(g.x0, fb[0], R - g.x0, fb[1] - fb[0], con ? C.okS : C.chip, con ? C.ok : C.mut, 6, 1.6);
        let ls = ''; for (let x = g.x0 + 8; x < R - 4; x += pit) ls += `M${f1(x)} ${fb[0] + 4}V${fb[1] - 4}`;
        o += `<path d="${ls}" stroke="${C.al}" stroke-width="1" opacity=".55" fill="none"/>`;
      });
      o += tx(g.x0 + 6, g.ft[0] - 6, 'ekstrafuzal lifler', { a: 'start', c: C.mut, s: dar ? 11 : 12 });
      // intrafuzal
      const cx0 = g.x0 + (dar ? 28 : 50), cx1 = R - (dar ? 28 : 50), Lc0 = (g.x1 - (dar ? 28 : 50)) - (g.x0 + (dar ? 28 : 50)), e0 = 0.28 * Lc0;
      const e = S.mod === 'ag' ? e0 - c * g.shrink / 2 : e0;
      const ay = g.iy, ah = 14;
      const mx0 = cx0 + e, mx1 = cx1 - e, chord = mx1 - mx0, M0 = Lc0 - 2 * e0, slack = Math.max(0, M0 - chord), amp = Math.min(16, 0.12 * slack);
      o += rct(cx0 - 6, ay - ah - 3, cx1 - cx0 + 12, 2 * ah + 6, C.paper, C.mut, 14, 1.6, 0.9);
      o += rct(cx0, ay - ah + 3, e, 2 * ah - 6, C.alS, C.al, 4, 1.4, 0.85) + rct(cx1 - e, ay - ah + 3, e, 2 * ah - 6, C.alS, C.al, 4, 1.4, 0.85);
      let ls2 = ''; for (let x = cx0 + 5; x < cx0 + e - 3; x += 7) ls2 += `M${f1(x)} ${ay - ah + 6}V${ay + ah - 6}`; for (let x = cx1 - e + 5; x < cx1 - 3; x += 7) ls2 += `M${f1(x)} ${ay - ah + 6}V${ay + ah - 6}`;
      o += `<path d="${ls2}" stroke="${C.al}" stroke-width="1" opacity=".6" fill="none"/>`;
      const wv = []; for (let i = 0; i <= 60; i++) { const q = i / 60; wv.push([mx0 + q * chord, ay + amp * Math.sin(q * Math.PI * 6)]); }
      o += `<path d="${PD(wv)}" fill="none" stroke="${C.chip}" stroke-width="16" stroke-linecap="round"/><path d="${PD(wv)}" fill="none" stroke="${C.mut}" stroke-width="2.2" opacity=".9"/>`;
      // Ia ucu (spiral)
      const mc = (mx0 + mx1) / 2; let coil = '';
      for (let k = -3; k <= 3; k++) { const x = mc + k * 7, q = (x - mx0) / chord, y = ay + amp * Math.sin(q * Math.PI * 6); coil += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="2.6" ry="11" fill="none" stroke="${C.ia}" stroke-width="1.8"/>`; }
      o += coil + ln([[mc, ay - 12 - amp], [mc, g.ft[1] + 6]], C.ia, 2);
      o += tx(mc + 8, g.ft[1] + (dar ? 18 : 20), 'Ia ucu', { a: 'start', c: C.ia });
      // etiketler
      if (!dar) { o += tx(cx0 + e / 2, ay + 36, 'kasılabilir uç', { s: 12, c: C.mut }) + tx(mc, ay + 36, 'orta bölge · sarkomer yok', { s: 12, c: C.mut }); }
      else { o += tx2(cx0 + e / 2 + 6, ay + 32, ['kasılabilir', 'uç'], { s: 11, c: C.mut }) + tx2(mc, ay + 32, ['orta bölge ·', 'sarkomer yok'], { s: 11, c: C.mut }); }
      // α ve γ lifleri
      const ax = dar ? 8 : 8;
      o += ln([[ax + 4, (g.ft[0] + g.ft[1]) / 2], [g.x0, (g.ft[0] + g.ft[1]) / 2]], C.al, 2.5) + tx(ax + 10, g.ft[0] - 4, 'α', { c: C.al, b: 1, s: 14 });
      o += ln([[ax + 4, ay], [cx0, ay]], C.al, 1.3, { d: '4 3', op: S.mod === 'ag' ? 1 : 0.3 }) + tx(ax + 10, ay - 8, 'γ', { c: C.al, b: 1, s: 14, op: S.mod === 'ag' ? 1 : 0.4 });
      // şeritler
      const y1 = g.y1, y2 = g.y2, sx = g.sx, sw = g.sw, sh = g.sh;
      o += tx(sx, y1 + 11, 'Kas uzunluğu', { a: 'start', c: C.mut, s: dar ? 11 : 12 });
      o += `<rect x="${sx}" y="${y1 + 16}" width="${sw}" height="${sh - 22}" rx="5" fill="${C.chip}" opacity=".5"/>`;
      const hh = sh - 34, top = y1 + 22;
      const pts = ser.filter((q) => now - q[0] <= WIN).map((q) => [sx + sw * (1 - (now - q[0]) / WIN), top + hh * q[1]]);
      if (pts.length > 1) o += `<path d="${PD(pts)}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
      o += tx(sx, y2 + 11, 'Ia deşarjı', { a: 'start', c: C.ia, s: dar ? 11 : 12 });
      o += `<rect x="${sx}" y="${y2 + 16}" width="${sw}" height="${sh - 22}" rx="5" fill="${C.chip}" opacity=".5"/>`;
      o += dik(TI, sx, y2 + 16 + (sh - 22) / 2, sw, WIN, now, C.ia);
      if (c > 0.35 && S.tp != null) {
        const ok = S.mod === 'ag';
        if (dar) o += tx2(sx + sw, y2 - 18 + 0, ok ? ['Ia deşarjı korundu'] : ['Ia deşarjı azaldı ·', 'SSS kısalmayı izleyemiyor'], { a: 'end', c: ok ? C.ok : C.crit, s: 11, b: 1 });
        else o += tx(sx + sw, y2 + 11, ok ? 'Ia deşarjı korundu' : 'Ia deşarjı azaldı · SSS kısalmayı izleyemiyor', { a: 'end', c: ok ? C.ok : C.crit, b: 1 });
      }
      return o;
    };
    let api;
    const capNow = () => (!S.bas ? null : S.tp == null && now < 0 ? CAPR : S.tp != null ? CAPM[S.mod] : CAPR);
    const sync = (ctl) => { api && api.setCap(S.bas ? (S.tp != null ? CAPM[S.mod] : CAPR) : null); };
    const r = iskele(el, {
      S, aria: 'Kas segmenti: ekstrafuzal lifler kasılırken intrafuzal liflerin orta bölgesinin gevşemesi ya da gergin kalması; yalnız α etkinliği ile α ve γ koaktivasyonunun kas uzunluğu ve Ia deşarjı üzerindeki etkisi',
      kontrol: `${segH('Motor etkinliği', 'mod', [['a', 'Yalnız α'], ['ag', 'α + γ (koaktivasyon)']], 'a')}<button type="button" class="btn ghost" data-a="kas">Kas</button><button type="button" class="btn ghost" data-a="bas">Baştan</button>`,
      wide: [760, 340], dar: [380, 440], render, ctlSync: sync,
      degisti: () => { reset(); simule(7); },
      act: (a) => {
        if (a === 'kas') { S.bas = true; if (S.tp == null) { S.tp = now; if (RM) { simule(4); } } }
        else if (a === 'bas') { reset(); simule(7); }
      },
      tick: (dt) => { step(dt); return true; },
    });
    api = r.api;
    simule(7);
    api.paint();
    return r.destroy;
  };

  /* ============================================================
     5 · fek55_postur — postürü koruyan refleksler haritası
     ============================================================ */
  VIZ.fek55_postur = (el) => {
    const S = { sel: '', t: 0 };
    const CAP = {
      statik: 'Yer çekimiyle oluşan statik refleksler, karmaşık örüntülerde birleşen germe refleksleridir: ayakta dururken diz ekstansörleri sürekli gerildiği için refleks olarak kasılı kalır. Segmental statik refleksler resiprokal innervasyonla vücudun iki yanında yanıt verebilir; labirentlerin uyarılması genel statik refleksler oluşturabilir. [[K2 s. 63]]',
      dogr: 'Deri reseptörlerinin, labirent reseptörlerinin ve kas propriyoseptörlerinin uyarılmasıyla doğan doğrulma refleksleri, postürü almak ve korumak için gereken kasılmayı denetler; görsel refleksler bu süreci kolaylaştırır. [[K2 s. 63]]',
      vest: 'Başın doğrusal ivmelenmesini utrikül ve sakkül algılar ve vestibülospinal traktuslarla refleks oluşturur; dönmeyi semisirküler kanallar algılar ve göz, boyun ve proksimal kol kaslarında refleks yanıt başlatır. Bu yollar vestibülospinal ve retikülospinal traktuslarla antigravite kaslarının α ve γ motor nöronlarını uyarıp kas tonusunu sağlar. [[K2 s. 63]]',
      gorsel: 'Postür kontrolünde baş konumuna ilişkin görsel ve vestibüler bilgi yakından bütünleşir: ikisi de başın uzaydaki konumunu bildirir ve vestibüler sinyaller sürekli görsel sinyallerle karşılaştırılır. [[K2 s. 63]]',
    };
    const SETS = {
      statik: { in: ['sp', 'lab'], pt: ['seg', 'vs'], tg: ['antig'] },
      dogr: { in: ['skin', 'lab', 'sp', 'eye'], pt: ['vs', 'rs', 'seg'], tg: ['govde', 'boyun', 'prox'] },
      vest: { in: ['lab'], pt: ['vs', 'rs'], tg: ['goz', 'boyun', 'prox', 'antig'] },
      gorsel: { in: ['eye'], pt: ['cmp'], tg: [] },
    };
    const NOTE = 'Görme ve vestibüler sistem baş konumunu birlikte bildirir; vestibüler sinyaller sürekli görsel sinyallerle karşılaştırılır.';
    const render = (dar, u) => {
      FS = dar ? 12 : 13; CU = u;
      const st = SETS[S.sel], none = !st;
      const L = (kind, id) => (none ? 0.7 : st[kind].includes(id) ? 1 : 0.35);
      const lit = (kind, id) => !none && st[kind].includes(id);
      const vest = S.sel === 'vest';
      const tt = RM ? 9 : S.t;
      const tgOn = (id) => (vest ? (id === 'antig' ? tt > 3 : true) : lit('tg', id));
      let o = '';
      // ---- siluet grubu
      const sil = dar ? 'translate(-20 -14) scale(.9)' : '';
      const headDx = vest && !RM ? (tt < 1 ? 14 * sm(0, 1, tt) : tt < 1.6 ? 14 * (1 - sm(1, 1.6, tt)) : 0) : 0;
      const headRot = vest && !RM && tt > 1.6 && tt < 3 ? 24 * Math.sin((tt - 1.6) / 1.4 * Math.PI) : 0;
      o += `<g transform="${sil}">`;
      o += `<g opacity=".7" stroke="${C.mut}" stroke-width="9" stroke-linecap="round" fill="none"><path d="M120 100V112M120 112L116 205M120 128L150 168L146 198M116 205L130 272L122 338L150 342"/></g>`;
      o += ellips(137, 248, 8, 28, lit('tg', 'antig') || (vest && tgOn('antig')) ? 'on' : 'n', -8);
      o += `<g transform="translate(${headDx} 0) rotate(${f1(headRot)} 120 100)">` + cir(120, 78, 22, C.paper, C.mut, 3, 1);
      const labOp = L('in', 'lab'), eyeOp = L('in', 'eye'), labC = lit('in', 'lab') ? C.al : C.mut;
      o += `<g opacity="${labOp}"><ellipse cx="106" cy="76" rx="8" ry="5" fill="none" stroke="${labC}" stroke-width="2"/><circle cx="106" cy="86" r="5" fill="none" stroke="${labC}" stroke-width="2"/><circle cx="100" cy="68" r="4" fill="none" stroke="${labC}" stroke-width="2"/></g>`;
      o += `<g opacity="${eyeOp}"><circle cx="133" cy="72" r="5.5" fill="${lit('in', 'eye') ? C.alS : C.paper}" stroke="${lit('in', 'eye') ? C.al : C.mut}" stroke-width="2"/><circle cx="134" cy="72" r="2" fill="${C.ink}"/></g></g>`;
      const spC = lit('in', 'sp') ? C.al : C.ia, skC = lit('in', 'skin') ? C.al : C.mut;
      o += `<ellipse cx="146" cy="262" rx="9" ry="3.6" fill="${C.paper}" stroke="${spC}" stroke-width="2.2" opacity="${L('in', 'sp')}" transform="rotate(75 146 262)"/>`;
      o += `<path d="M122 347H152" stroke="${skC}" stroke-width="4" stroke-dasharray="3 3" opacity="${L('in', 'skin')}"/>`;
      if (dar) {
        o += tx(76, 66, 'Labirent', { a: 'end', s: 12, op: labOp }) + tx(160, 70, 'Göz', { a: 'start', s: 12, op: eyeOp }) + tx(120, 262, 'İğcik', { a: 'end', s: 12, op: L('in', 'sp') }) + tx(116, 356, 'Deri', { a: 'end', s: 12, op: L('in', 'skin') });
      } else {
        o += tx(82, 66, 'Labirent', { a: 'end', op: labOp }) + tx(160, 70, 'Göz', { a: 'start', op: eyeOp }) + tx(112, 262, 'Kas iğcikleri', { a: 'end', op: L('in', 'sp') }) + tx(116, 356, 'Deri (ayak tabanı)', { a: 'end', op: L('in', 'skin') });
      }
      o += '</g>';
      // ---- merkez sütun
      const cs = dar ? 'translate(-110 -30)' : '';
      o += `<g transform="${cs}">`;
      const vsOn = lit('pt', 'vs') || vest, rsOn = lit('pt', 'rs') || vest;
      o += rct(300, 40, 180, 40, vsOn || lit('pt', 'cmp') ? C.clinS : C.paper, C.ib, 8, 2, none ? 0.8 : (vsOn || lit('pt', 'cmp') ? 1 : 0.4));
      o += tx(390, 65, 'Vestibüler çekirdekler', { c: C.ink, op: none ? 0.9 : (vsOn || lit('pt', 'cmp') ? 1 : 0.5) });
      o += rct(330, 100, 150, 40, rsOn ? C.clinS : C.paper, C.ib, 8, 2, none ? 0.8 : (rsOn ? 1 : 0.4));
      o += tx(405, 125, 'Retiküler formasyon', { op: none ? 0.9 : (rsOn ? 1 : 0.5) });
      o += ln([[312, 82], [312, 285]], C.ib, 4, { op: none ? 0.7 : vsOn ? 1 : 0.35, m: 'ib' });
      o += ln([[430, 142], [430, 285]], C.ib, 4, { op: none ? 0.7 : rsOn ? 1 : 0.35, m: 'ib' });
      o += tx2(306, 196, ['Vestibülospinal', 'traktus'], { a: 'end', s: dar ? 12 : 13, op: none ? 0.9 : vsOn ? 1 : 0.5 });
      o += tx2(438, 196, ['Retikülospinal', 'traktus'], { a: 'start', s: dar ? 12 : 13, op: none ? 0.9 : rsOn ? 1 : 0.5 });
      const mnOn = !none && (lit('pt', 'vs') || lit('pt', 'rs') || lit('pt', 'seg') || vest);
      o += rct(300, 290, 180, 46, mnOn ? C.okS : C.paper, C.ok, 8, 2, none ? 0.8 : mnOn ? 1 : 0.4);
      o += tx2(390, 310, ['α ve γ', 'motor nöronlar'], { op: none ? 0.9 : mnOn ? 1 : 0.5 });
      if (!dar) {
        // girdi → sütun çizgileri
        o += ln([[116, 80], [210, 96], [296, 66]], C.al, 1.8, { op: lit('in', 'lab') ? 1 : 0.2 });
        o += ln([[148, 258], [296, 316]], C.al, 2, { op: lit('pt', 'seg') ? 1 : 0.15, m: 'al' });
        o += ln([[156, 346], [296, 328]], C.al, 2, { op: lit('in', 'skin') ? 1 : 0.15, m: 'al' });
        if (lit('pt', 'seg')) o += tx(220, 300, 'segmental', { c: C.al, s: 12 });
        o += `<g opacity="${S.sel === 'gorsel' ? 1 : 0.15}"><path d="M142 70 296 56" stroke="${C.al}" stroke-width="2" fill="none" marker-start="url(#fek55-m${u}-al)" marker-end="url(#fek55-m${u}-al)"/></g>`;
        if (S.sel === 'gorsel') o += tx(218, 52, 'karşılaştırma', { c: C.al, b: 1 });
      }
      o += '</g>';
      // ---- hedef kutular
      const tg = dar
        ? [['goz', 'Göz', 10, 326, 170, 40], ['boyun', 'Boyun', 200, 326, 170, 40], ['govde', 'Gövde', 10, 376, 170, 40], ['prox', 'Proksimal ekstremite', 200, 376, 170, 40], ['antig', ['Antigravite kasları', '(ör. diz ekstansörleri)'], 10, 426, 360, 56]]
        : [['goz', 'Göz', 540, 40, 210, 36], ['boyun', 'Boyun', 540, 86, 210, 36], ['govde', 'Gövde', 540, 132, 210, 36], ['prox', 'Proksimal ekstremite', 540, 178, 210, 36], ['antig', ['Antigravite kasları', '(ör. diz ekstansörleri)'], 540, 224, 210, 52]];
      if (!dar) {
        o += ln([[480, 313], [520, 313], [520, 60]], C.ok, 2, { op: none ? 0.5 : (st.tg.length || vest ? 1 : 0.2) });
        o += ln([[480, 60], [538, 58]], C.ib, 2, { op: tgOn('goz') ? 1 : 0.25, m: 'ib' });
        [104, 150, 196, 250].forEach((y) => { o += ln([[520, y], [538, y]], C.ok, 2, { m: 'ok', op: none ? 0.5 : 1 }); });
      } else {
        o += ln([[280, 308], [280, 322]], C.ok, 2, { op: none ? 0.5 : 1, m: 'ok' });
      }
      tg.forEach(([id, nm, x, y, w, h]) => {
        const on = tgOn(id);
        o += rct(x, y, w, h, on ? C.okS : C.paper, on ? C.ok : C.mut, 8, 1.8, none ? 0.8 : on ? 1 : 0.4);
        if (Array.isArray(nm)) o += tx2(x + w / 2, y + 22, nm, { op: none ? 0.9 : on ? 1 : 0.5 }); else o += tx(x + w / 2, y + h / 2 + 5, nm, { op: none ? 0.9 : on ? 1 : 0.5 });
      });
      // ---- iç kulak ayrıntısı
      if (vest) {
        const cx = dar ? 118 : 160, cy = dar ? 58 : 20, cw = dar ? 172 : 136, ch = dar ? 134 : 150;
        o += rct(cx, cy, cw, ch, C.paper, C.line, 10, 2, 1);
        const ox = cx + (dar ? 40 : 36), oy = cy + (dar ? 36 : 42), dx = RM ? 0 : (tt < 1 ? 12 * sm(0, 1, tt) : tt < 1.6 ? 12 * (1 - sm(1, 1.6, tt)) : 0), rot = RM ? 0 : (tt > 1.6 && tt < 3 ? 30 * Math.sin((tt - 1.6) / 1.4 * Math.PI) : 0);
        o += `<g transform="rotate(${f1(rot)} ${ox + 20} ${oy})">` + `<ellipse cx="${ox + 20}" cy="${oy - 14}" rx="22" ry="12" fill="none" stroke="${C.al}" stroke-width="2.2"/><ellipse cx="${ox + 6}" cy="${oy}" rx="9" ry="20" fill="none" stroke="${C.al}" stroke-width="2.2"/><ellipse cx="${ox + 20}" cy="${oy + 10}" rx="18" ry="9" fill="none" stroke="${C.al}" stroke-width="2.2" transform="rotate(35 ${ox + 20} ${oy + 10})"/>` + '</g>';
        o += `<ellipse cx="${ox + 54}" cy="${oy + 4}" rx="14" ry="8" fill="${C.alS}" stroke="${C.ia}" stroke-width="2"/><circle cx="${f1(ox + 54 + dx)}" cy="${oy + 4}" r="3.5" fill="${C.ia}"/>`;
        if (false) {}
        else { o += tx2(cx + cw / 2, cy + (dar ? 78 : 100), ['utrikül · sakkül', '→ doğrusal ivme'], { s: 12, c: C.ia }) + tx2(cx + cw / 2, cy + (dar ? 108 : 128), ['kanallar → dönme', '(açısal ivme)'], { s: 12, c: C.al }); }
      }
      // ---- alt not
      const gn = S.sel === 'gorsel';
      if (dar) o += tx2(190, 540, ['Görme ve vestibüler sistem baş konumunu birlikte bildirir;', 'vestibüler sinyaller sürekli görsel sinyallerle', 'karşılaştırılır.'], { s: 12, c: gn ? C.al : C.mut, b: gn });
      else o += tx(380, 408, NOTE, { s: 13, c: gn ? C.al : C.mut, b: gn });
      return o;
    };
    let api;
    const sync = (ctl) => { api && api.setCap(S.sel ? CAP[S.sel] : null); };
    const r = iskele(el, {
      S, aria: 'Postürü koruyan refleksler haritası: kas iğcikleri, deri, labirent ve görme girdileri; vestibüler çekirdekler, retiküler formasyon, vestibülospinal ve retikülospinal traktuslar; α ve γ motor nöronlar ve göz, boyun, gövde ve ekstremite kasları',
      kontrol: `<div class="fek55-kart seg" role="group" aria-label="Refleks türü">${[['statik', 'Statik refleksler'], ['dogr', 'Doğrulma refleksleri'], ['vest', 'Vestibüler refleksler'], ['gorsel', 'Görsel refleksler']].map(([v, l]) => `<button type="button" data-k="sel" data-v="${v}" aria-pressed="false">${l}</button>`).join('')}</div>`,
      wide: [760, 420], dar: [380, 620], render, ctlSync: sync,
      degisti: (k, v) => { S.t = 0; },
      act: () => {},
      tick: (dt) => { if (S.sel !== 'vest') return false; S.t += dt; if (S.t > 5) S.t = 0; return true; },
    });
    api = r.api; api.paint();
    return r.destroy;
  };
})();
