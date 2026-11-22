/* Fizyoloji Ek ders (Bölüm 22 ardından) · Nefes tutma, egzersiz ve anestezik ajanların ventilasyon kontrolüne etkisi · bileşenler.
   Kaynak K2 s. 109–110 (+ K1 çapraz bağlantılar). Tarif: docs/tasarim/fizek22.md. Bütün modeller şematiktir (viz-foot).
   Bileşen yalnız data-viz öğesine çizer; açıklamayı sayfadaki .viz-cap'e yazar.
   Renk sözlüğü: O₂ --crit · CO₂ --accent · N₂ --muted/--chip · H₂O --line · H⁺/uyarı --warn · normal --ok */
(function () {
  'use strict';
  const { ticker, esc, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  let SAYAC = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => { const k = Math.pow(10, d); let r = (Math.round(+v * k + (v >= 0 ? 1e-7 : -1e-7)) / k).toFixed(d); if (/^-0(\.0+)?$/.test(r)) r = r.slice(1); return r.replace('.', ',').replace('-', '−'); };
  const hill = (p) => { const a = Math.pow(Math.max(p, 0), 2.7); return 100 * a / (a + Math.pow(3.5, 2.7)); };
  const T = (x, y, s, cls, ek) => `<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}"${cls ? ` class="${cls}"` : ''}${ek ? ' ' + ek : ''}>${s}</text>`;
  const Ln = (x1, y1, x2, y2, cls) => `<line x1="${(+x1).toFixed(1)}" y1="${(+y1).toFixed(1)}" x2="${(+x2).toFixed(1)}" y2="${(+y2).toFixed(1)}" class="${cls}"/>`;
  const Rc = (x, y, w, h, cls, ek) => `<rect x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" width="${Math.max(0, w).toFixed(1)}" height="${Math.max(0, h).toFixed(1)}" class="${cls}"${ek ? ' ' + ek : ''}/>`;
  const Ci = (x, y, r, cls, ek) => `<circle cx="${(+x).toFixed(1)}" cy="${(+y).toFixed(1)}" r="${r}" class="${cls}"${ek ? ' ' + ek : ''}/>`;
  const yol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const MID = 'text-anchor="middle"', END = 'text-anchor="end"';
  const DIK = (x, y) => `transform="rotate(-90 ${x} ${y})" text-anchor="middle"`;
  /* çift yönlü ok (yatay ya da dikey), cls çizgi, clsB uç */
  const ciftOk = (x1, y1, x2, y2, cls, clsB, b = 6) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
    const uc = (x, y, yon) => { const q = (dx, dy) => (x + yon * (dx * c - dy * s)).toFixed(1) + ',' + (y + yon * (dx * s + dy * c)).toFixed(1); return `<polygon points="${q(0, 0)} ${q(-b, b * 0.55)} ${q(-b, -b * 0.55)}" class="${clsB}"/>`; };
    return Ln(x1 + c * b * 0.6, y1 + s * b * 0.6, x2 - c * b * 0.6, y2 - s * b * 0.6, cls) + uc(x2, y2, 1) + uc(x1, y1, -1);
  };
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${esc(ad)}">${opts.map(([v, l, k]) => `<button type="button" data-${key}="${v}"${k ? ' class="k"' : ''} aria-pressed="${String(String(v) === String(cur))}"><span class="fek22-uzun">${l}</span>${k ? `<span class="fek22-kisa">${k}</span>` : ''}</button>`).join('')}</div>`;
  const basSec = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const kaydirici = (key, ad, min, max, step, val) => `<label class="fek22-rng" data-rk="${key}"><span>${ad} <output data-o="${key}"></output></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-r="${key}" aria-label="${esc(ad)}"></label>`;
  const oynaHtml = () => (RM ? '' : '<button type="button" class="btn ghost fek22-oyna" data-a="oyna" aria-pressed="false">Oynat</button>');
  /* sayfadaki .viz-cap'e yaz (yalnız metin değişince) */
  function capOf(el) {
    const viz = el.closest('.viz'), c = viz ? viz.querySelector('.viz-cap') : null;
    let son = null;
    return { yaz(h) { if (!c || h === son) return; c.innerHTML = REF(h); son = h; } };
  }
  /* dar/geniş yerleşim: el.clientWidth < 520 değişince cb(dar) */
  function genislik(el, cb) {
    let dar = null;
    const bak = () => { const d = el.clientWidth < 520; if (d !== dar) { dar = d; cb(d); } };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    bak();
    return () => { if (ro) ro.disconnect(); };
  }
  /* etiketleri çakışmayacak biçimde aralar: istenen konumlar → [lo, hi] içinde en az gap aralıklı konumlar */
  function arala(ist, gap, lo, hi) {
    const a = ist.map((p, i) => ({ i, p: clamp(p, lo, hi) })).sort((x, y) => x.p - y.p);
    for (let k = 1; k < a.length; k++) if (a[k].p < a[k - 1].p + gap) a[k].p = a[k - 1].p + gap;
    if (a.length && a[a.length - 1].p > hi) {
      a[a.length - 1].p = hi;
      for (let k = a.length - 2; k >= 0; k--) if (a[k].p > a[k + 1].p - gap) a[k].p = a[k + 1].p - gap;
    }
    const r = []; a.forEach((o) => { r[o.i] = o.p; }); return r;
  }

  /* ================= 1 · Nefes tutma: üç senaryoda alveol gazı ================= */
  VIZ.fek22_apne = (el) => {
    const cap = capOf(el), uid = ++SAYAC;
    const st = { s: 2, t: 0, oyn: false };
    const tmax = () => (st.s === 3 ? 5 : 3);
    const pco2 = (t) => 5.3 + 0.8 * t;
    const po2 = (s, t) => (s === 1 ? 5.3 + 8 * Math.exp(-t / 0.33) - 0.5 * Math.max(0, t - 1)
      : s === 2 ? (t <= 2 ? 13.3 - 4.15 * t : 5.0 - 1.2 * (t - 2)) : 89.4 - 0.8 * t);
    const hacim = (s, t) => (s === 1 ? 2000 - 50 * t : 2000);
    const deger = (s, t) => {
      const c = pco2(t), o = po2(s, t), n = Math.max(0, 101 - 6.3 - c - o);
      return { c, o, n, sat: s === 3 ? 100 : hill(o), depo: o / 101 * hacim(s, t) };
    };
    el.innerHTML = `<div class="fek22-kok">
      <div class="fek22-ust">
        ${seg('Senaryo', 's', [[1, '1 · Hava yolu tıkalı', 'Tıkalı'], [2, '2 · Açık · oda havası', 'Açık · hava'], [3, '3 · Açık · %100 oksijen', 'Açık · O₂']], st.s)}
        ${kaydirici('t', 'Zaman', 0, 3, 0.1, 0)}
        ${oynaHtml()}
      </div>
      <div class="fek22-leg" hidden><span class="crit"><i></i><b>PAO₂</b></span><span class="acc"><i></i><b>PACO₂ (0,4–0,8 kPa/dk)</b></span></div>
      <div class="fek22-svgk"></div>
      <dl class="fek22-oku fek22-oku5"><div><dt>zaman</dt><dd data-o="t"></dd></div><div><dt>PAO₂</dt><dd data-o="o"></dd></div><div><dt>PACO₂</dt><dd data-o="c"></dd></div><div><dt>SaO₂</dt><dd data-o="sat"></dd></div><div><dt>akciğerdeki O₂</dt><dd data-o="depo"></dd></div></dl>
    </div>`;
    const kok = el.querySelector('.fek22-kok'), kap = el.querySelector('.fek22-svgk'), leg = el.querySelector('.fek22-leg');
    const rng = el.querySelector('[data-r="t"]'), out = el.querySelector('[data-o="t"]'), oyna = el.querySelector('[data-a="oyna"]');
    const dd = (k) => el.querySelector(`dd[data-o="${k}"]`);
    let G = null;
    const kur = (dar) => {
      kok.classList.toggle('dar', dar);
      leg.hidden = !dar;
      G = dar
        ? { dar, W: 340, H: 440, x0: 50, x1: 328, yL0: 262, yL1: 112, yU0: 88, yU1: 32, top: 26, kop: [104, 96], tkY: 279, axY: 297 }
        : { dar, W: 740, H: 410, x0: 70, x1: 460, yL0: 330, yL1: 120, yU0: 96, yU1: 36, top: 30, kop: [112, 104], tkY: 346, axY: 374 };
      G.X = (t) => G.x0 + t / 5 * (G.x1 - G.x0);
      G.YL = (p) => G.yL0 - p / 14 * (G.yL0 - G.yL1);
      G.YU = (p) => G.yU0 - (p - 80) / 15 * (G.yU0 - G.yU1);
      ciz();
    };
    const ciz = () => {
      if (!G) return;
      const { X, YL, YU, dar } = G, s = st.s, t = st.t, T5 = tmax(), v = deger(s, t), o = [];
      const Yo = (p) => (s === 3 ? YU(p) : YL(p));
      o.push(`<defs><pattern id="fek22-n2-${uid}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" class="fek22-n2bg"/><line x1="0" y1="0" x2="0" y2="7" class="fek22-n2ln"/></pattern></defs>`);
      // üst bölge (80–95 kPa) ve alt bölge zeminleri
      o.push(Rc(G.x0, G.yU1, G.x1 - G.x0, G.yU0 - G.yU1, 'fek22-ap-ust' + (s === 3 ? ' on' : '')));
      o.push(Rc(G.x0, YL(8), G.x1 - G.x0, G.yL0 - YL(8), 'fek22-ap-hipo'));
      for (let p = 0; p <= 14; p += 2) o.push(Ln(G.x0, YL(p), G.x1, YL(p), 'fek22-izg'), T(G.x0 - 7, YL(p) + 4, p, 'fek22-mono', END));
      for (let p = 80; p <= 95; p += 5) o.push(Ln(G.x0, YU(p), G.x1, YU(p), 'fek22-izg'), T(G.x0 - 7, YU(p) + 4, p, 'fek22-mono', END));
      o.push(T(G.x1 - 4, G.yU1 + 13, 'yalnız %100 oksijen senaryosu', 'fek22-s', END));
      // kitap bu bölgede sayı vermez (S1, S2: t > 3)
      if (s !== 3) {
        o.push(Rc(X(3), G.top, X(5) - X(3), G.yL0 - G.top, 'fek22-ap-yok'));
        const xm = (X(3) + X(5)) / 2;
        o.push(T(xm, YL(12.6), 'kitap bu bölgede', 'fek22-s', MID), T(xm, YL(12.6) + 14, 'sayı vermez', 'fek22-s', MID));
      }
      // PCO₂ bandı (0,4–0,8 kPa/dk)
      const ust = [], alt = [];
      for (let i = 0; i <= 50; i++) { const tt = i / 10; ust.push([X(tt), YL(5.3 + 0.8 * tt)]); alt.push([X(tt), YL(5.3 + 0.4 * tt)]); }
      o.push(`<path d="${yol(ust.concat(alt.slice().reverse()))} Z" class="fek22-ap-bant"/>`);
      o.push(`<path d="${yol(alt)}" class="fek22-ap-co2lo"/>`, `<path d="${yol(ust)}" class="fek22-ap-co2"/>`);
      // referans çizgileri
      o.push(Ln(G.x0, YL(8), G.x1, YL(8), 'fek22-ap-h8'));
      o.push(Ln(G.x0, YL(6.7), G.x1, YL(6.7), 'fek22-ap-kir'));
      if (s === 1) o.push(Ln(G.x0, YL(5.3), X(3), YL(5.3), 'fek22-ap-mv'));
      // eksenler, kopma
      o.push(`<path d="M${G.x0} ${G.yU1 - 4} V${G.yL0} H${G.x1}" class="fek22-eksen"/>`);
      const [k1, k2] = G.kop;
      o.push(Ln(G.x0, k2 - 1, G.x0, k1 + 1, 'fek22-ap-kopmab'));
      o.push(`<path d="M${G.x0 - 7} ${k1 + 2} L${G.x0 + 7} ${k1 - 3} M${G.x0 - 7} ${k2 + 3} L${G.x0 + 7} ${k2 - 2}" class="fek22-ap-kopma"/>`);
      o.push(T(G.x0 + 11, (k1 + k2) / 2 + 5, '≈', 'fek22-k'));
      for (let i = 0; i <= 5; i++) o.push(Ln(X(i), G.yL0, X(i), G.yL0 + 5, 'fek22-tik'), T(X(i), G.tkY - (dar ? 0 : 0), i, 'fek22-mono', MID));
      o.push(T((G.x0 + G.x1) / 2, G.axY, 'zaman (dakika)', 'fek22-k', MID));
      o.push(T(dar ? 14 : 22, (G.yU1 + G.yL0) / 2, 'parsiyel basınç (kPa)', 'fek22-k', DIK(dar ? 14 : 22, (G.yU1 + G.yL0) / 2)));
      // kırılma aralığı şeridi (1,8–3,5 dk)
      o.push(Rc(X(1.75), G.yL0 - 6, X(3.5) - X(1.75), 4, 'fek22-ap-kirs'));
      o.push(T((X(1.75) + X(3.5)) / 2, G.yL0 - 10, 'PCO₂ 6,7 kPa: 1,75–3,5 dk (model)', 'fek22-s fek22-warn fek22-h', MID));
      // çizgi etiketleri
      if (dar) {
        o.push(T(G.x1 - 2, YL(6.7) + 14, 'kırılma 6,7 kPa', 'fek22-s fek22-warn fek22-h', END));
        o.push(T(G.x1 - 2, G.yL0 - 27, 'PO₂ < 8 kPa', 'fek22-s fek22-crit fek22-h', END));
      } else {
        o.push(T(G.x1 - 2, YL(6.7) + 14, 'kırılma noktası', 'fek22-s fek22-warn fek22-h', END), T(G.x1 - 2, YL(6.7) + 27, '≈ 6,7 kPa (50 mmHg)', 'fek22-s fek22-warn fek22-h', END));
        o.push(T(G.x1 - 2, G.yL0 - 8, 'PO₂ 8 kPa altı (hipoksemi)', 'fek22-s fek22-crit fek22-h', END));
        const bt = s === 1 ? 5 : 2.95, bx = s === 1 ? X(5) - 2 : X(2.95);
        o.push(T(bx, YL(5.3 + 0.8 * bt) - 21, 'PACO₂', 'fek22-acc fek22-b fek22-h', END), T(bx, YL(5.3 + 0.8 * bt) - 8, '0,4–0,8 kPa/dk', 'fek22-s fek22-acc fek22-h', END));
      }
      if (s === 1) o.push(T(G.x0 + 4, YL(5.3) + 14, dar ? 'miks venöz PO₂ 5,3' : 'miks venöz PO₂ 5,3 kPa', 'fek22-s fek22-h'));
      // PO₂ eğrisi: geçmiş düz, gelecek soluk
      const n = 70, gec = [], gel = [];
      for (let i = 0; i <= n; i++) { const tt = i / n * T5, p = [X(tt), Yo(po2(s, tt))]; if (tt <= t + 1e-9) gec.push(p); if (tt >= t - T5 / n) gel.push(p); }
      gec.push([X(t), Yo(v.o)]); gel.unshift([X(t), Yo(v.o)]);
      if (gel.length > 1 && t < T5) o.push(`<path d="${yol(gel)}" class="fek22-ap-o2g"/>`);
      if (gec.length > 1) o.push(`<path d="${yol(gec)}" class="fek22-ap-o2"/>`);
      if (!dar) {
        const ex = X(T5), ey = Yo(po2(s, T5));
        o.push(s === 3 ? T(ex - 4, ey - 9, 'PAO₂', 'fek22-crit fek22-b fek22-h', END) : T(ex + 6, ey + 4, 'PAO₂', 'fek22-crit fek22-b fek22-h'));
      }
      // kitap çapaları
      if (s === 2) {
        o.push(Ci(X(2), YL(5.0), 5, 'fek22-bos', 'style="stroke:var(--crit)"'));
        if (dar) o.push(T(X(2) - 8, YL(5.0) + 18, 'K1: 2 dk · %70', 'fek22-s fek22-crit fek22-h', END));
        else o.push(Ln(X(2) + 3, YL(5.0) + 5, X(2) + 7, YL(5.0) + 24, 'fek22-ap-lead'), T(X(2) + 4, YL(5.0) + 36, "K1: 2 dk'da SaO₂ %70, PO₂ 5,0 kPa", 'fek22-s fek22-crit fek22-h'));
      } else if (s === 3) {
        o.push(Ci(X(5), YL(10), 5, 'fek22-bos', 'style="stroke:var(--accent)"'));
        o.push(T(X(5) - 9, YL(10) - 8, dar ? 'K1: 5 dk · 10 kPa' : "K1: 5 dk'da PaCO₂ ≈ 10 kPa", 'fek22-s fek22-acc fek22-h', END));
      } else {
        o.push(Ln(X(1) + 3, YL(6.1) - 4, X(1) + 9, YL(8) - 16, 'fek22-ap-lead'));
        o.push(Ci(X(1), YL(6.1), 5, 'fek22-bos', 'style="stroke:var(--accent)"'));
        o.push(T(X(1) + 7, YL(8) - 5, dar ? 'venöz 6,1' : 'miks venöz PCO₂ 6,1 kPa', 'fek22-s fek22-acc fek22-h'));
      }
      // çalışma noktası
      o.push(Ln(X(t), G.top, X(t), G.yL0, 'fek22-kil'));
      o.push(Ci(X(t), YL(v.c), 6, 'fek22-nok', 'style="fill:var(--accent)"'), Ci(X(t), Yo(v.o), 6, 'fek22-nok', 'style="fill:var(--crit)"'));
      // ---- alveol gaz sütunu ----
      const dilim = [
        { ad: 'H₂O', v: 6.3, cls: 'fek22-ap-h2o' }, { ad: 'CO₂', v: v.c, cls: 'fek22-ap-dco2' },
        { ad: 'O₂', v: v.o, cls: 'fek22-ap-do2' }, { ad: 'N₂', v: v.n, cls: '', fill: `url(#fek22-n2-${uid})` },
      ];
      let top = 0; dilim.forEach((d) => { d.a = top; top += d.v; d.b = top; });
      const n0 = 6.3 + 5.3 + 13.3, n1 = 6.3 + v.c + v.o, dN = v.n - 76.1;
      if (!dar) {
        const cx0 = 574, cx1 = 664, cy0 = 70, cy1 = 340, Yc = (p) => cy1 - p / 101 * (cy1 - cy0);
        o.push(T(619, 30, 'Alveol gazı · parsiyel basınçlar', 'fek22-b', MID));
        if (s === 3) o.push(`<rect x="531" y="39" width="176" height="18" rx="5" class="fek22-ap-roz"/>`, T(619, 52, 'azot yok · denitrojenizasyon', 'fek22-s fek22-ok', MID));
        dilim.forEach((d) => { if (d.v > 0.05) o.push(Rc(cx0, Yc(d.b), cx1 - cx0, Yc(d.a) - Yc(d.b), d.cls, d.fill ? `fill="${d.fill}"` : '')); });
        dilim.forEach((d) => { if (d.a > 0.05) o.push(Ln(cx0, Yc(d.a), cx1, Yc(d.a), 'fek22-ap-ayr')); });
        o.push(`<rect x="${cx0}" y="${cy0}" width="${cx1 - cx0}" height="${cy1 - cy0}" rx="6" class="fek22-ap-cer"/>`);
        o.push(T(cx0 - 5, cy0 + 4, '101', 'fek22-mono', END), T(cx0 - 5, cy1 + 4, '0', 'fek22-mono', END));
        const ly = arala(dilim.map((d) => (Yc(d.a) + Yc(d.b)) / 2 + 4), 15, cy0 + 10, cy1 + 2);
        dilim.forEach((d, i) => {
          const my = (Yc(d.a) + Yc(d.b)) / 2;
          if (Math.abs(ly[i] - 4 - my) > 2 || Yc(d.a) - Yc(d.b) < 16) o.push(`<path d="M${cx1} ${my.toFixed(1)} L${cx1 + 5} ${my.toFixed(1)} L${cx1 + 9} ${(ly[i] - 4).toFixed(1)}" class="fek22-ap-lead"/>`);
          o.push(T(cx1 + 12, ly[i], `${d.ad} ${fmt(d.v)}`, d.ad === 'O₂' ? 'fek22-crit' : d.ad === 'CO₂' ? 'fek22-acc' : d.ad === 'N₂' ? 'fek22-mut' : 'fek22-mut'));
        });
        if (s === 2) {
          const y0 = Yc(n0), y1 = Yc(n1);
          o.push(Ln(530, y0, cx1, y0, 'fek22-ap-n0'), T(562, y0 - 5, 't = 0: 76,1 kPa', 'fek22-s', END));
          if (dN > 0.15) o.push(ciftOk(568, y0, 568, y1, 'fek22-ap-ok', 'fek22-ap-okb', 5));
          if (dN > 0.05) o.push(T(562, Math.max(y1, y0 + 6) + 13, `+${fmt(dN)} kPa azot`, 'fek22-s fek22-warn', END));
        }
      } else {
        const bx0 = 14, bx1 = 326, by0 = 354, by1 = 392, Xb = (p) => bx0 + p / 101 * (bx1 - bx0);
        o.push(T(bx0, 320, 'Alveol gazı · parsiyel basınçlar (kPa)', 'fek22-b'));
        if (s === 3) o.push(`<rect x="${bx0}" y="329" width="206" height="17" rx="5" class="fek22-ap-roz"/>`, T(bx0 + 103, 341.5, 'azot yok · denitrojenizasyon', 'fek22-s fek22-ok', MID));
        dilim.forEach((d) => { if (d.v > 0.05) o.push(Rc(Xb(d.a), by0, Xb(d.b) - Xb(d.a), by1 - by0, d.cls, d.fill ? `fill="${d.fill}"` : '')); });
        dilim.forEach((d) => { if (d.a > 0.05) o.push(Ln(Xb(d.a), by0, Xb(d.a), by1, 'fek22-ap-ayr')); });
        o.push(`<rect x="${bx0}" y="${by0}" width="${bx1 - bx0}" height="${by1 - by0}" rx="6" class="fek22-ap-cer"/>`);
        const lx = arala(dilim.map((d) => (Xb(d.a) + Xb(d.b)) / 2), 44, bx0 + 18, bx1 - 22);
        dilim.forEach((d, i) => {
          const mx = (Xb(d.a) + Xb(d.b)) / 2;
          if (Math.abs(lx[i] - mx) > 2) o.push(`<path d="M${mx.toFixed(1)} ${by1} L${lx[i].toFixed(1)} ${by1 + 6}" class="fek22-ap-lead"/>`);
          const c = d.ad === 'O₂' ? 'fek22-crit' : d.ad === 'CO₂' ? 'fek22-acc' : 'fek22-mut';
          o.push(T(lx[i], 411, d.ad, 'fek22-s ' + c, MID), T(lx[i], 426, fmt(d.v), 'fek22-mono', MID));
        });
        if (s === 2) {
          const x0 = Xb(n0), x1 = Xb(n1);
          o.push(Ln(x0, 336, x0, by1, 'fek22-ap-n0'));
          if (dN > 0.15) o.push(ciftOk(x0, 345, x1, 345, 'fek22-ap-ok', 'fek22-ap-okb', 5));
          o.push(T(x0 + 6, 340, dN > 0.05 ? `t = 0: N₂ 76,1 · +${fmt(dN)} kPa azot` : 't = 0: N₂ 76,1 kPa', 'fek22-s fek22-warn'));
        }
      }
      kap.innerHTML = `<svg class="fek22-svg fek22-ap-svg${dar ? ' dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Nefes tutmada zamana göre alveoler PO₂ ve PCO₂ grafiği ve alveol gazının parsiyel basınç sütunu">${o.join('')}</svg>`;
      // okuma kutucukları
      out.textContent = fmt(t) + ' dk';
      rng.setAttribute('aria-valuetext', fmt(t) + ' dakika');
      dd('t').textContent = fmt(t) + ' dk';
      dd('o').textContent = fmt(v.o) + ' kPa';
      dd('c').textContent = fmt(v.c) + ' kPa'; dd('c').className = v.c >= 6.7 - 1e-9 ? 'fek22-warn' : '';
      const sat = Math.round(v.sat);
      dd('sat').textContent = '%' + sat; dd('sat').className = sat < 90 ? 'fek22-crit' : sat >= 95 ? 'fek22-ok' : '';
      dd('depo').textContent = Math.round(v.depo) + ' mL';
      // açıklama
      const tt = fmt(t), po = fmt(v.o), pc = fmt(v.c);
      let h;
      if (s === 1) h = `<b>Hava yolu tıkalı.</b> ${tt} dk: PAO₂ ${po} kPa, PACO₂ ${pc} kPa, SaO₂ %${sat}. Alveolden kana oksijen geçişi sürer ama yerine hiçbir gaz konmaz: alveoler PO₂ bir dakika içinde yaklaşık miks venöz PO₂ düzeyine (5,3 kPa) iner. [[K2 s. 109]] [[K1 s. 66]]`;
      else if (s === 2) {
        h = `<b>Açık hava yolu, ortam gazı hava.</b> ${tt} dk: PAO₂ ${po} kPa, PACO₂ ${pc} kPa, SaO₂ %${sat}, alveoler azot ${fmt(v.n)} kPa. Apnede oksijen alımı karbondioksit çıkışından büyük olduğu için akciğer hacmi küçülür ve yerine ortam havası çekilir; havanın azotu alveollerde birikir. [[K2 s. 109]]`;
        if (t >= 2 - 1e-9) h += ' Yaklaşık iki dakika sonra hipoksi gelişmiştir: K1 bu noktada SaO₂ %70 ve PO₂ 5,0 kPa verir. [[K2 s. 109]] [[K1 s. 39]]';
      } else {
        h = `<b>Açık hava yolu, ortam gazı oksijen.</b> ${tt} dk: PAO₂ ${po} kPa, PACO₂ ${pc} kPa, SaO₂ %${sat}, akciğerde ${Math.round(v.depo)} mL oksijen. Alveol gazından alınan oksijenin yerine kütlesel akımla oksijen çekilir; alveol gazına azot eklenmediği için PO₂ yalnızca PCO₂'nin yükseldiği hızda düşer. [[K2 s. 110]]`;
        if (t >= 5 - 1e-9) h += " Beş dakika sonra SaO₂ hâlâ %100'dür, ama PaCO₂ 10 kPa'ya yaklaşmıştır: bu yolu sınırlayan hipoksi değil hiperkapnidir. [[K1 s. 39]]";
      }
      if (v.c >= 6.7 - 1e-9) h += ' PCO₂ kırılma noktasını (6,7 kPa) geçti: hava solunduktan sonra nefes tutma bu değerde biter, ama baskın etken PCO₂ değil büyük olasılıkla eşlik eden hipoksidir. [[K2 s. 110]]';
      cap.yaz(h);
    };
    const oynat = (on) => { st.oyn = on; if (oyna) { oyna.textContent = on ? 'Durdur' : 'Oynat'; oyna.setAttribute('aria-pressed', String(on)); } };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-s]');
      if (b) {
        st.s = +b.dataset.s; basSec(el, 's', st.s);
        rng.max = tmax(); st.t = Math.min(st.t, tmax()); rng.value = st.t; ciz(); return;
      }
      if (e.target.closest('[data-a="oyna"]')) { if (st.oyn) oynat(false); else { if (st.t >= tmax() - 1e-6) st.t = 0; oynat(true); ciz(); } }
    });
    rng.addEventListener('input', () => { oynat(false); st.t = +rng.value; ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (!st.oyn) return;
      st.t = Math.min(tmax(), st.t + dt * tmax() / 8);
      rng.value = st.t;
      if (st.t >= tmax()) oynat(false);
      ciz();
    });
    const durG = genislik(el, kur);
    return () => { durT(); durG(); };
  };

  /* ================= YENİ · Kırılma noktası: istemli çaba ile soluk alma uyarısı ================= */
  VIZ.fek22_kirilma = (el) => {
    const cap = capOf(el), uid = ++SAYAC;
    const poA = (t) => (t <= 2 ? 13.3 - 4.15 * t : 5.0 - 1.2 * (t - 2));
    const SEN = {
      A: { ad: 'Hava · normal hacim', k: 'Hava', c0: 5.3, po: poA },
      B: { ad: 'Preoksijenasyon', k: 'Preoks.', c0: 5.3, po: (t) => 89.4 - 0.8 * t },
      C: { ad: 'Küçük akciğer hacmi', k: 'Küçük hacim', c0: 5.3, po: (t) => Math.max(4.0, 13.3 - 6.2 * t) },
      D: { ad: 'Hiperventilasyon sonrası', k: 'Hiperv. sonrası', c0: 4.0, po: poA },
    };
    const durum = (k, t) => {
      const S = SEN[k], c = S.c0 + 0.8 * t, p = S.po(t), uc = Math.max(0, 25 * (c - 5.3)), uh = Math.max(0, 33 * (8.0 - p));
      return { c, p, uc, uh, u: uc + uh, sat: k === 'B' ? 100 : hill(p) };
    };
    // kırılma noktası: U = 100 olan ilk an (doğrusal ara değerle)
    Object.keys(SEN).forEach((k) => {
      let br = 5, onc = 0;
      for (let t = 0.001; t <= 5.0005; t += 0.001) {
        const u = durum(k, t).u;
        if (u >= 100 - 1e-9) { const u0 = durum(k, t - 0.001).u; br = t - 0.001 + 0.001 * (100 - u0) / Math.max(1e-9, u - u0); break; }
        onc = u;
      }
      SEN[k].br = Math.min(5, br); SEN[k].son = k === 'B' ? 5 : Math.min(5, SEN[k].br + 0.3);
      void onc;
    });
    const st = { k: 'A', t: SEN.A.br, oyn: false };
    el.innerHTML = `<div class="fek22-kok">
      <div class="fek22-ust">
        ${seg('Başlangıç koşulu', 'k', Object.keys(SEN).map((k) => [k, SEN[k].ad, SEN[k].k]), st.k)}
        ${kaydirici('t', 'Zaman', 0, SEN.A.son.toFixed(2), 0.01, st.t.toFixed(2))}
        ${oynaHtml()}
      </div>
      <div class="fek22-leg"><span class="acc"><i></i><b>PCO₂ payı</b></span><span class="crit"><i></i><b>hipoksi payı</b></span><span style="color:var(--warn)"><i></i><b>toplam uyarı</b></span><span class="ink"><i></i><b>istemli çaba tavanı</b></span></div>
      <div class="fek22-yan"><div class="fek22-svgk"></div><div class="fek22-pano" aria-live="off"></div></div>
    </div>`;
    const kok = el.querySelector('.fek22-kok'), kap = el.querySelector('.fek22-svgk'), pano = el.querySelector('.fek22-pano');
    const rng = el.querySelector('[data-r="t"]'), out = el.querySelector('[data-o="t"]'), oyna = el.querySelector('[data-a="oyna"]');
    let G = null;
    const kur = (dar) => {
      kok.classList.toggle('dar', dar);
      G = dar ? { dar, W: 340, H: 350, x0: 46, x1: 326, y0: 296, y1: 82, tkY: 313, axY: 333, cy: 14 }
        : { dar, W: 560, H: 380, x0: 64, x1: 534, y0: 320, y1: 70, tkY: 337, axY: 362, cy: 18 };
      G.X = (t) => G.x0 + t / 5 * (G.x1 - G.x0);
      G.Y = (u) => G.y0 - u / 140 * (G.y0 - G.y1);
      ciz();
    };
    const ciz = () => {
      if (!G) return;
      const { X, Y, dar } = G, S = SEN[st.k], br = S.br, t = st.t, o = [];
      const b = durum(st.k, br), a = durum(st.k, t);
      const pa = Math.round(b.uc / Math.max(1e-9, b.u) * 100), pb = 100 - pa;
      o.push(`<defs><clipPath id="fek22-kg-${uid}"><rect x="0" y="${G.y1}" width="${X(t).toFixed(1)}" height="${G.y0 - G.y1 + 2}"/></clipPath><clipPath id="fek22-kf-${uid}"><rect x="${X(t).toFixed(1)}" y="${G.y1}" width="${G.W}" height="${G.y0 - G.y1 + 2}"/></clipPath></defs>`);
      // eksenler
      o.push(Ln(G.x0, Y(0), G.x1, Y(0), 'fek22-izg'));
      o.push(`<path d="M${G.x0} ${G.y1} V${G.y0} H${G.x1}" class="fek22-eksen"/>`);
      for (let i = 0; i <= 5; i++) o.push(Ln(X(i), G.y0, X(i), G.y0 + 5, 'fek22-tik'), T(X(i), G.tkY, i, 'fek22-mono', MID));
      o.push(T((G.x0 + G.x1) / 2, G.axY, 'nefes tutma süresi (dakika)', 'fek22-k', MID));
      o.push(T(G.x0 - 7, Y(0) + 4, '0', 'fek22-mono', END), T(G.x0 - 7, Y(100) + 4, '100', 'fek22-mono', END));
      const ym = (G.y0 + G.y1) / 2, xd = dar ? 12 : 20;
      o.push(T(xd, ym, 'soluk alma uyarısı (birimsiz)', 'fek22-k', DIK(xd, ym)));
      // nefesin bittiği bölge
      if (st.k !== 'B' && br < 4.99) {
        o.push(Rc(X(br), G.y1, G.x1 - X(br), G.y0 - G.y1, 'fek22-kr-son'));
        o.push(T((X(S.son) + G.x1) / 2 + 4, Y(70), 'nefes burada biter', 'fek22-s', MID));
      }
      // yığılmış alanlar
      const n = 120, pts = [];
      for (let i = 0; i <= n; i++) { const tt = i / n * S.son, d = durum(st.k, tt); pts.push([X(tt), Y(d.uc), Y(d.u)]); }
      const tabanY = Y(0);
      const aCo2 = `M${pts[0][0].toFixed(1)} ${tabanY} ` + pts.map((p) => `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ` L${pts[n][0].toFixed(1)} ${tabanY} Z`;
      const aHip = yol(pts.map((p) => [p[0], p[2]])) + ' ' + pts.slice().reverse().map((p) => `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';
      const katman = `<path d="${aCo2}" class="fek22-kr-aco2"/>${st.k === 'B' ? '' : `<path d="${aHip}" class="fek22-kr-ahip"/>`}<path d="${yol(pts.map((p) => [p[0], p[1]]))}" class="fek22-kr-lco2"/><path d="${yol(pts.map((p) => [p[0], p[2]]))}" class="fek22-kr-lu"/>`;
      o.push(`<g clip-path="url(#fek22-kg-${uid})">${katman}</g><g clip-path="url(#fek22-kf-${uid})" class="fek22-kr-gel">${katman}</g>`);
      // istemli çaba tavanı
      o.push(Ln(G.x0, Y(100), G.x1, Y(100), 'fek22-kr-tavan'));
      o.push(T(G.x0 + 5, Y(100) - 7, dar ? 'istemli çaba' : 'istemli çaba tavanı', 'fek22-ink fek22-h'));
      // toplam uyarı etiketi (U = 120'yi kestiği yerde; B'de tavanın altında)
      if (st.k === 'B') o.push(T(X(3.3), Y(80), 'toplam uyarı', 'fek22-warn fek22-h', END));
      else {
        let t120 = S.son; for (let tt = 0; tt <= S.son; tt += 0.005) if (durum(st.k, tt).u >= 120) { t120 = tt; break; }
        o.push(T(X(t120) + 7, Y(120) + 4, 'toplam uyarı', 'fek22-warn fek22-h'));
      }
      if (st.k === 'B') o.push(T(G.x0 + 8, Y(dar ? 128 : 125), 'hipoksi payı yok · azot yerine oksijen', 'fek22-s fek22-ok fek22-h'));
      // A çapası (K2): PCO₂ payının üst kenarında
      if (st.k === 'A') {
        const ax = X(br), ay = Y(b.uc), lx = X(S.son) + 8;
        o.push(Ci(ax, ay, 5, 'fek22-bos', 'style="stroke:var(--accent)"'));
        o.push(Ln(ax + 5, ay, lx - 2, ay, 'fek22-ap-lead'));
        if (dar) o.push(T(lx, ay + 4, 'K2: 6,7 kPa', 'fek22-s fek22-acc fek22-h'));
        else o.push(T(lx, ay - 2, 'K2: hava solunduktan sonra', 'fek22-s fek22-acc fek22-h'), T(lx, ay + 12, 'PCO₂ 6,7 kPa (50 mmHg)', 'fek22-s fek22-acc fek22-h'));
      }
      // seçili an
      if (Math.abs(t - br) > 0.006) {
        o.push(Ln(X(t), G.y1, X(t), G.y0, 'fek22-kr-an'));
        o.push(Ci(X(t), Y(Math.min(a.u, 140)), 5, 'fek22-kr-andot'));
      }
      // kırılma noktası + üstteki açıklama kutusu
      const bx = X(br), byy = Y(100);
      o.push(Ln(bx, byy, bx, G.y0, 'fek22-kr-kil'));
      const cxm = clamp(bx, G.x0 + 92, G.x1 - 92), sw = dar ? 150 : 180, cy = G.cy;
      o.push(Ln(bx, cy + 52, bx, byy - 8, 'fek22-kr-kil'));
      if (dar) o.push(T(cxm, cy, `kırılma · ${fmt(br, 2)} dk · ${fmt(b.c)} kPa`, 'fek22-warn fek22-b fek22-h', MID));
      else o.push(T(cxm, cy, 'kırılma noktası', 'fek22-warn fek22-b', MID), T(cxm, cy + 15, `${fmt(br, 2)} dk · PCO₂ ${fmt(b.c)} kPa`, 'fek22-warn', MID));
      const sy = dar ? cy + 9 : cy + 23, sx = cxm - sw / 2, wa = sw * pa / 100;
      o.push(Rc(sx, sy, wa, 9, 'fek22-kr-sco2'), Rc(sx + wa, sy, sw - wa, 9, 'fek22-kr-ship'), Rc(sx, sy, sw, 9, 'fek22-kr-scer'));
      o.push(T(cxm, sy + 23, `%${pa} PCO₂ · %${pb} hipoksi`, 'fek22-s fek22-ink', MID));
      o.push(Ci(bx, byy, 7, 'fek22-kr-nok'));
      kap.innerHTML = `<svg class="fek22-svg fek22-kr-svg${dar ? ' dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Nefes tutma süresince PCO₂ ve hipoksi paylarından oluşan soluk alma uyarısı ve istemli çaba tavanı; kesişme noktası kırılma noktasıdır">${o.join('')}</svg>`;
      // pano
      const kat = br / SEN.A.br, ap = a.u > 0.05 ? Math.round(a.uc / a.u * 100) : null;
      pano.innerHTML = `<h4>Okuma</h4><dl>
        <div><dt>kırılma noktası</dt><dd class="fek22-warn">${fmt(br, 2)} dk</dd></div>
        <div><dt>seçili an · toplam uyarı</dt><dd>${fmt(t, 2)} dk · ${Math.round(a.u)}</dd></div>
        <div><dt>PACO₂</dt><dd class="${a.c >= 6.7 - 1e-9 ? 'fek22-warn' : ''}">${fmt(a.c)} kPa</dd></div>
        <div><dt>PAO₂ · SaO₂</dt><dd class="${a.sat < 90 ? 'fek22-crit' : ''}">${fmt(a.p)} kPa · %${Math.round(a.sat)}</dd></div>
        <hr>
        <div><dt>PCO₂ payı</dt><dd class="fek22-acc">${ap === null ? '—' : '%' + ap}</dd></div>
        <div><dt>hipoksi payı</dt><dd class="fek22-crit">${ap === null ? '—' : '%' + (100 - ap)}</dd></div>
        <hr>
        <div><dt>hava solunduğunda</dt><dd>${fmt(SEN.A.br, 2)} dk${st.k === 'A' ? '' : ` · bu koşulda ×${fmt(kat)}`}</dd></div>
      </dl>`;
      out.textContent = fmt(t, 2) + ' dk';
      rng.setAttribute('aria-valuetext', fmt(t, 2) + ' dakika');
      // açıklama
      const ti = fmt(br, 2), pc = fmt(b.c), po = fmt(b.p), sat = Math.round(b.sat);
      const H = {
        A: `<b>Hava solunmuş, normal akciğer hacmi.</b> Kırılma noktası ${ti} dk: PACO₂ ${pc} kPa, PAO₂ ${po} kPa, SaO₂ %${sat}; uyarının %${pa}'si PCO₂'den, %${pb}'si hipoksiden gelir. Hava solunduktan sonra kırılma noktası PCO₂ ≈ 6,7 kPa'da (50 mmHg) olur, ama bu PCO₂'nin baskın etken olduğu anlamına gelmez: eşlik eden hipoksi büyük olasılıkla daha önemlidir. [[K2 s. 110]]`,
        B: `<b>Önceden oksijen solunmuş.</b> Kırılma noktası ${ti} dk'ya uzar: hipoksi payı oluşmaz, uyarıyı tek başına yükselen PCO₂ (${pc} kPa) verir. Önceden oksijen solumak hipoksinin başlamasını geciktirdiği için nefes tutma süresini uzatır. [[K2 s. 110]]`,
        C: `<b>Küçük akciğer hacminde başlanmış.</b> Kırılma noktası ${ti} dk'ya iner ve PACO₂ yalnız ${pc} kPa'dır: nefes tutma süresi, tutmanın başındaki akciğer hacmiyle orantılıdır — büyük hacim hem oksijen deposunu büyütür hem de akciğer ve göğüs duvarından çıkan sinir afferentleriyle süreyi uzatır. [[K2 s. 110]]`,
        D: `<b>Hiperventilasyondan sonra.</b> Kırılma noktası ${ti} dk'ya uzar, ama uyarının %${pb}'si hipoksiden gelir ve PACO₂ yalnız ${pc} kPa'ya çıkmıştır. Hiperventilasyon ile preoksijenasyon birlikte çok uzun nefes tutma süreleri sağlar; hiperventilasyon tek başına PCO₂ uyarısını geciktirdiği hâlde oksijen deposunu büyütmez. [[K2 s. 110]]`,
      };
      let on = '';
      if (t < br - 0.006) on = `${fmt(t, 2)} dk: toplam uyarı tavanın altında, nefes tutmayı sürdürebilir. `;
      else if (t > br + 0.006) on = `${fmt(t, 2)} dk: uyarı istemli çabayı aştı; nefes burada biter. `;
      cap.yaz(on + H[st.k]);
    };
    const oynat = (on) => { st.oyn = on; if (oyna) { oyna.textContent = on ? 'Durdur' : 'Oynat'; oyna.setAttribute('aria-pressed', String(on)); } };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-k]');
      if (b) { oynat(false); st.k = b.dataset.k; basSec(el, 'k', st.k); rng.max = SEN[st.k].son.toFixed(2); st.t = SEN[st.k].br; rng.value = st.t.toFixed(2); ciz(); return; }
      if (e.target.closest('[data-a="oyna"]')) { if (st.oyn) oynat(false); else { st.t = 0; rng.value = 0; oynat(true); ciz(); } }
    });
    rng.addEventListener('input', () => {
      oynat(false);
      let v = +rng.value; const br = SEN[st.k].br;
      if (Math.abs(v - br) < 0.006) v = br; // kırılma noktasına yapış
      st.t = v; ciz();
    });
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (!st.oyn) return;
      const br = SEN[st.k].br;
      st.t = Math.min(br, st.t + dt * br / 5);
      rng.value = st.t.toFixed(2);
      if (st.t >= br) oynat(false);
      ciz();
    });
    const durG = genislik(el, kur);
    return () => { durT(); durG(); };
  };

  /* ================= 2 · Egzersizde ventilasyon: hangi sinyal ne zaman? ================= */
  VIZ.fek22_egzersiz = (el) => {
    const cap = capOf(el);
    const M = (x) => {
      const ve = x <= 70 ? 5 + 0.5714 * x : 45 + 2.5 * (x - 70);
      const pac = x <= 70 ? 5.3 - 0.003 * x : 5.09 - 0.016 * (x - 70);
      const h = x <= 70 ? 40 : 40 + 0.2 * (x - 70);
      return { vo: 0.25 + 0.0375 * x, ve, pac, pao: 13.0, h, ph: 9 - Math.log10(h), pvo: 5.3 - 0.028 * x, pvc: 6.1 + 0.024 * x, co: 5 + 0.2 * x };
    };
    const bolge = (x) => (x <= 10 ? 'İstirahat' : x <= 35 ? 'Hafif egzersiz' : x < 70 ? 'Orta egzersiz' : x === 70 ? 'Anaerobik eşik' : x < 100 ? 'Yoğun egzersiz' : 'En üst düzey');
    const SIN = [
      { ad: 'Motor korteksten inen uyarılar', a: 3, b: 15, r: 'basic' },
      { ad: 'Eklem ve kas reseptörleri (kas iğcikleri)', a: 3, b: 25, r: 'basic' },
      { ad: 'Tidal hacimle büyüyen PCO₂ salınımı (periferik kemoreseptör)', a: 15, b: 60, r: 'acc' },
      { ad: 'Adrenalin ve noradrenalin salınımı + kan sıcaklığı artışı', a: 25, b: 85, r: 'clin' },
      { ad: 'H⁺ artışı (laktik asit) → karotis cisimcikleri', a: 70, b: 100, r: 'warn' },
    ];
    const KG = [
      { k: 'pac', ad: 'PaCO₂', r: 'acc', lo: 4, hi: 6, d0: 5.3, f: (m) => fmt(m.pac, 2) + ' kPa' },
      { k: 'pao', ad: 'PaO₂', r: 'crit', lo: 10, hi: 15, d0: 13, f: (m) => fmt(m.pao) + ' kPa' },
      { k: 'h', ad: '[H⁺] · pH', r: 'warn', lo: 36, hi: 48, d0: 40, f: (m) => `${fmt(m.h)} nmol/L · pH ${fmt(m.ph, 2)}` },
      { k: 'pvc', ad: 'PvCO₂', r: 'acc', lo: 5, hi: 9, d0: 6.1, f: (m) => fmt(m.pvc) + ' kPa' },
      { k: 'pvo', ad: 'PvO₂', r: 'crit', lo: 2, hi: 6, d0: 5.3, f: (m) => fmt(m.pvo) + ' kPa' },
    ];
    const kgSat = (g) => `<div class="fek22-kg-sat"><span>${g.ad}</span><div class="fek22-kg-ser ${g.r}"><i data-kg="${g.k}"></i><u style="left:${((g.d0 - g.lo) / (g.hi - g.lo) * 100).toFixed(1)}%"></u></div><b data-kgv="${g.k}"></b></div>`;
    const st = { x: 35, oyn: false };
    el.innerHTML = `<div class="fek22-kok">
      <div class="fek22-ust">
        ${kaydirici('x', 'Egzersiz şiddeti', 0, 100, 1, st.x)}
        ${seg('Hazır şiddet', 'p', [[0, 'İstirahat'], [20, 'Hafif'], [50, 'Orta'], [85, 'Yoğun'], [100, 'En üst']], -1)}
        ${oynaHtml()}
      </div>
      <div class="fek22-eg-izgara">
        <div class="fek22-eg-hucre"><h4>V̇<sub>E</sub> ve V̇O₂</h4><div class="fek22-svgk" data-k="a"></div></div>
        <div class="fek22-eg-hucre"><div class="fek22-kg">
          <h4>Kan gazları</h4>
          <div class="fek22-kg-bas"><span>arteriyel</span><span class="fek22-kg-roz ok" data-roz></span></div>
          ${KG.slice(0, 3).map(kgSat).join('')}
          <div class="fek22-kg-bas"><span>venöz</span></div>
          ${KG.slice(3).map(kgSat).join('')}
          <div class="fek22-kg-alt" data-alt></div>
        </div></div>
        <div class="fek22-eg-hucre"><h4>Öne sürülen sinyaller</h4>
          <div class="fek22-sn">${SIN.map((s, i) => `<div class="fek22-sn-sat r-${s.r}" data-sn="${i}"><span>${s.ad}</span><div class="fek22-sn-ser"><i></i></div><em></em></div>`).join('')}</div>
        </div>
        <div class="fek22-eg-hucre"><h4>Kan H⁺ artışına ventilatuvar yanıt</h4><p class="fek22-eg-alt">K2'nin tek sayısal eğrisi; ayrı bir yanıt, egzersizdeki V̇E değil</p><div class="fek22-svgk" data-k="d"></div></div>
      </div>
      <dl class="fek22-oku fek22-oku4"><div><dt>şiddet</dt><dd data-o="b"></dd></div><div><dt>V̇O₂</dt><dd data-o="vo"></dd></div><div><dt>V̇<sub>E</sub></dt><dd data-o="ve"></dd></div><div><dt>PaCO₂ · [H⁺]</dt><dd data-o="ph"></dd></div></dl>
    </div>`;
    const kok = el.querySelector('.fek22-kok'), kapA = el.querySelector('[data-k="a"]'), kapD = el.querySelector('[data-k="d"]');
    const rng = el.querySelector('[data-r="x"]'), out = el.querySelector('[data-o="x"]'), oyna = el.querySelector('[data-a="oyna"]');
    const $ = (s) => el.querySelector(s);
    let G = null;
    const kur = (dar) => {
      kok.classList.toggle('dar', dar);
      G = dar ? { dar, W: 340, H: 268, x0: 44, x1: 298, y0: 230, y1: 34, bY: 248, yt: 12, yr: 330 }
        : { dar, W: 450, H: 272, x0: 54, x1: 398, y0: 236, y1: 40, bY: 253, yt: 16, yr: 438 };
      G.X = (x) => G.x0 + x / 100 * (G.x1 - G.x0);
      G.YV = (v) => G.y0 - v / 130 * (G.y0 - G.y1);
      G.YO = (v) => G.y0 - v / 4.5 * (G.y0 - G.y1);
      G.D = dar ? { W: 340, H: 200, x0: 50, x1: 318, y0: 160, y1: 22 } : { W: 300, H: 200, x0: 46, x1: 284, y0: 160, y1: 22 };
      ciz();
    };
    const cizA = (m) => {
      const { X, YV, YO, dar } = G, x = st.x, o = [];
      o.push(Rc(X(70), G.y1, X(100) - X(70), G.y0 - G.y1, 'fek22-eg-esikb'));
      (dar ? [0, 50, 100] : [0, 25, 50, 75, 100, 125]).forEach((v) => o.push(Ln(G.x0, YV(v), G.x1, YV(v), 'fek22-izg'), T(G.x0 - 6, YV(v) + 4, v, 'fek22-mono fek22-acc', END)));
      (dar ? [0, 2, 4] : [0, 1, 2, 3, 4]).forEach((v) => o.push(Ln(G.x1, YO(v), G.x1 + 4, YO(v), 'fek22-tik'), T(G.x1 + 7, YO(v) + 4, v, 'fek22-mono fek22-crit')));
      o.push(`<path d="M${G.x0} ${G.y1} V${G.y0} H${G.x1} V${G.y1}" class="fek22-eksen"/>`);
      [10, 35, 70].forEach((b) => o.push(Ln(X(b), G.y0, X(b), G.y0 + 6, 'fek22-tik')));
      const BL = dar ? [[5, 'ist.'], [22.5, 'hafif'], [52.5, 'orta'], [85, 'yoğun']] : [[5, 'istirahat'], [22.5, 'hafif'], [52.5, 'orta'], [85, 'yoğun']];
      BL.forEach(([b, s]) => o.push(T(X(b), G.bY, s, 'fek22-s', MID)));
      o.push(T((G.x0 + G.x1) / 2, G.bY + 15, 'egzersiz şiddeti (şematik)', 'fek22-k', MID));
      o.push(T(G.yt, (G.y0 + G.y1) / 2, 'V̇E (L/dk)', 'fek22-k fek22-acc', DIK(G.yt, (G.y0 + G.y1) / 2)));
      o.push(T(G.yr, (G.y0 + G.y1) / 2, 'V̇O₂ (L/dk)', 'fek22-k fek22-crit', DIK(G.yr, (G.y0 + G.y1) / 2)));
      // eşik
      o.push(Ln(X(70), G.y1, X(70), G.y0, 'fek22-eg-esik'));
      o.push(T(X(70) + 5, G.y0 - 22, 'anaerobik eşik', 'fek22-s fek22-warn fek22-h'), T(X(70) + 5, G.y0 - 9, 'H⁺ ↑', 'fek22-s fek22-warn fek22-h'));
      // eğriler
      o.push(`<path d="M${X(0).toFixed(1)} ${YO(0.25).toFixed(1)} L${X(100).toFixed(1)} ${YO(4).toFixed(1)}" class="fek22-eg-vo"/>`);
      o.push(`<path d="M${X(0).toFixed(1)} ${YV(5).toFixed(1)} L${X(70).toFixed(1)} ${YV(45).toFixed(1)} L${X(100).toFixed(1)} ${YV(120).toFixed(1)}" class="fek22-eg-ve"/>`);
      // gösterge (sol üst boş alan)
      const lx = G.x0 + 8, ly = G.y1 + 16, dy = dar ? 16 : 14;
      o.push(Ln(lx, ly - 4, lx + 20, ly - 4, 'fek22-eg-legv'), T(lx + 26, ly, dar ? 'V̇E (sol)' : 'V̇E · sol eksen', 'fek22-s fek22-acc fek22-h'));
      o.push(Ln(lx, ly + dy - 4, lx + 20, ly + dy - 4, 'fek22-eg-lego'), T(lx + 26, ly + dy, dar ? 'V̇O₂ (sağ)' : 'V̇O₂ · sağ eksen', 'fek22-s fek22-crit fek22-h'));
      o.push(T(lx + 26, ly + 2 * dy, dar ? '250 mL/dk →' : 'istirahat 250 mL/dk', 'fek22-s fek22-crit fek22-h'));
      o.push(T(lx + 26, ly + 3 * dy, dar ? '3–4 L/dk (K2)' : 'sporcularda 3–4 L/dk (K2)', 'fek22-s fek22-crit fek22-h'));
      // çapalar
      o.push(Ci(X(100), YV(120), 5, 'fek22-bos', 'style="stroke:var(--accent)"'), T(X(100) - 9, YV(127) + 2, dar ? 'K2 · 120' : 'K2: 120 L/dk', 'fek22-s fek22-acc fek22-h', END));
      // K1 çapası: etiket eğrinin altındaki boş alanda, işaretten inen kılavuzla
      o.push(Ci(X(92), YV(100), 5, 'fek22-bos', 'style="stroke:var(--accent)"'));
      o.push(Ln(X(92), YV(100) + 5, X(92), YV(52) - 2, 'fek22-ap-lead'));
      o.push(T(X(100) - 4, YV(52) + 10, dar ? 'K1 · 100' : 'K1: 20 kat ·', 'fek22-s fek22-acc fek22-h', END));
      if (!dar) o.push(T(X(100) - 4, YV(52) + 23, '100 L/dk', 'fek22-s fek22-acc fek22-h', END));
      // çalışma noktası
      o.push(Ln(X(x), G.y1, X(x), G.y0, 'fek22-kil'));
      o.push(Ci(X(x), YO(m.vo), 6, 'fek22-nok', 'style="fill:var(--crit)"'), Ci(X(x), YV(m.ve), 6, 'fek22-nok', 'style="fill:var(--accent)"'));
      kapA.innerHTML = `<svg class="fek22-svg fek22-eg-svg${dar ? ' dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Egzersiz şiddetine göre dakika ventilasyonu ve oksijen tüketimi; anaerobik eşikte ventilasyon eğrisi dikleşir">${o.join('')}</svg>`;
    };
    const cizD = (m) => {
      const D = G.D, dar = G.dar, X = (h) => D.x0 + (h - 40) / 6 * (D.x1 - D.x0), Y = (v) => D.y0 - v / 16 * (D.y0 - D.y1), o = [];
      const ust = st.x > 70;
      [0, 5, 10, 15].forEach((v) => o.push(Ln(D.x0, Y(v), D.x1, Y(v), 'fek22-izg'), T(D.x0 - 6, Y(v) + 4, v, 'fek22-mono', END)));
      [40, 42, 44, 46].forEach((h) => o.push(Ln(X(h), D.y0, X(h), D.y0 + 5, 'fek22-tik'), T(X(h), D.y0 + 17, h, 'fek22-mono', MID)));
      o.push(`<path d="M${D.x0} ${D.y1} V${D.y0} H${D.x1}" class="fek22-eksen"/>`);
      o.push(T((D.x0 + D.x1) / 2, D.y0 + 33, '[H⁺] (nmol/L) · pH 7,40 → 7,34', 'fek22-k', MID));
      o.push(T(14, (D.y0 + D.y1) / 2, 'V̇E (L/dk)', 'fek22-k', DIK(14, (D.y0 + D.y1) / 2)));
      o.push(`<path d="M${X(40).toFixed(1)} ${Y(5).toFixed(1)} L${X(46).toFixed(1)} ${Y(15).toFixed(1)}" class="fek22-eg-hl${ust ? '' : ' soluk'}"/>`);
      o.push(T(X(40) + 8, Y(5) + 16, '5 L/dk', 'fek22-s fek22-warn fek22-h'), T(X(46) - 8, Y(15) - 2, '15 L/dk', 'fek22-s fek22-warn fek22-h', END));
      if (ust) {
        const hx = X(m.h), hy = Y(5 + 10 / 6 * (m.h - 40));
        o.push(`<path d="M${hx.toFixed(1)} ${D.y0} V${hy.toFixed(1)} H${D.x0}" class="fek22-kil"/>`);
        o.push(Ci(hx, hy, 6, 'fek22-nok', 'style="fill:var(--warn)"'));
      } else o.push(T((D.x0 + D.x1) / 2 + 30, D.y0 - 12, 'eşiğin altında H⁺ değişmiyor', 'fek22-s fek22-h', MID));
      kapD.innerHTML = `<svg class="fek22-svg fek22-eg-svgd${dar ? ' dar' : ''}" viewBox="0 0 ${D.W} ${D.H}" role="img" aria-label="Kan hidrojen iyonu konsantrasyonu 40'tan 46 nmol/L'ye çıkınca dakika ventilasyonu 5'ten 15 L/dk'ya yükselir">${o.join('')}</svg>`;
    };
    const ciz = () => {
      if (!G) return;
      const x = st.x, m = M(x);
      cizA(m); cizD(m);
      // kan gazı panosu
      KG.forEach((g) => {
        const v = m[g.k];
        $(`[data-kg="${g.k}"]`).style.width = (clamp((v - g.lo) / (g.hi - g.lo), 0, 1) * 100).toFixed(1) + '%';
        $(`[data-kgv="${g.k}"]`).textContent = g.f(m);
      });
      const roz = $('[data-roz]');
      roz.className = 'fek22-kg-roz ' + (x > 70 ? 'warn' : 'ok');
      roz.innerHTML = x > 70 ? 'eşiğin üstünde:<br>PaCO₂ ↓, H⁺ ↑' : 'arteriyel değerler<br>hemen hemen değişmedi';
      $('[data-alt]').innerHTML = `kalp debisi <b>${fmt(m.co)} L/dk</b> (×${fmt(m.co / 5)}) · V̇<sub>E</sub> <b>×${fmt(m.ve / 5)}</b>`;
      // sinyaller
      SIN.forEach((s, i) => {
        const d = clamp((x - s.a) / (s.b - s.a), 0, 1), r = el.querySelector(`[data-sn="${i}"]`);
        r.classList.toggle('bos', d <= 0); r.classList.toggle('var', d > 0);
        r.querySelector('i').style.width = (d * 100).toFixed(1) + '%';
        const em = r.querySelector('em');
        em.className = '';
        if (i === 4 && d <= 0) { em.textContent = 'yalnız anaerobik eşiğin üstünde'; em.className = 'uyari'; } else em.textContent = d <= 0 ? 'beklemede' : d < 1 ? 'artıyor' : 'tam';
      });
      // okuma
      out.textContent = `${x} · ${bolge(x).toLowerCase()}`;
      rng.setAttribute('aria-valuetext', `${x} / 100, ${bolge(x).toLowerCase()}`);
      $('[data-o="b"]').textContent = bolge(x);
      $('[data-o="vo"]').textContent = fmt(m.vo, 2) + ' L/dk';
      $('[data-o="ve"]').textContent = fmt(m.ve) + ' L/dk';
      $('[data-o="ph"]').textContent = `${fmt(m.pac, 2)} kPa · ${fmt(m.h)} nmol/L`;
      basSec(el, 'p', [0, 20, 50, 85, 100].includes(x) ? x : -1);
      // açıklama
      let h = `<b>${bolge(x)}.</b> V̇O₂ ${fmt(m.vo, 2)} L/dk, V̇<sub>E</sub> ${fmt(m.ve)} L/dk; PaCO₂ ${fmt(m.pac, 2)} kPa, PaO₂ ${fmt(m.pao)} kPa, [H⁺] ${fmt(m.h)} nmol/L (pH ${fmt(m.ph, 2)}); venöz PCO₂ ${fmt(m.pvc)} kPa, venöz PO₂ ${fmt(m.pvo)} kPa. `;
      if (x <= 10) h += "İstirahatte oksijen tüketimi 250 mL/dk, dakika ventilasyonu ≈ 5 L/dk'dır. [[K2 s. 109]] [[K1 s. 181]]";
      else if (x <= 70) h += "Orta şiddete kadar egzersizde ventilasyon doku metabolik gereksinimiyle birlikte artar, ama arteriyel PCO₂, PO₂ ve hidrojen iyonu konsantrasyonu anlamlı biçimde değişmez; değişen, yükselen venöz PCO₂ ve düşen venöz PO₂'dir. Ventilasyonu bu dönemde neyin artırdığı açık değildir: motor korteksten inen uyarılar ve uzuv hareketini algılayan eklem ile kas reseptörleri öne sürülen ilk iki mekanizmadır. [[K2 s. 109]]";
      else h += 'Anaerobik eşiğin üstünde iskelet kası enerjinin bir bölümünü anaerobik metabolizmayla sağlar; açığa çıkan laktik asit ve hidrojen iyonları periferik kemoreseptörleri uyarır, ventilasyon metabolik gereksinimin ötesine geçer ve arteriyel PCO₂ düşer. [[K2 s. 109]] [[K1 s. 182]]';
      if (x === 100) h += " Üst uçta dakika ventilasyonu 120 L/dk'ya ulaşır; K1 aynı rezervi oranla verir: V̇<sub>E</sub> 20 kat artarken kalp debisi yalnız 5 kat artar. [[K2 s. 109]] [[K1 s. 181]]";
      cap.yaz(h);
    };
    const oynat = (on) => { st.oyn = on; if (oyna) { oyna.textContent = on ? 'Durdur' : 'Oynat'; oyna.setAttribute('aria-pressed', String(on)); } };
    let xs = st.x;
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-p]');
      if (b) { oynat(false); st.x = +b.dataset.p; xs = st.x; rng.value = st.x; ciz(); return; }
      if (e.target.closest('[data-a="oyna"]')) { if (st.oyn) oynat(false); else { if (st.x >= 100) { st.x = 0; xs = 0; } oynat(true); ciz(); } }
    });
    rng.addEventListener('input', () => { oynat(false); st.x = +rng.value; xs = st.x; ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (!st.oyn) return;
      xs = Math.min(100, xs + dt * 10);
      const nx = Math.round(xs);
      if (nx !== st.x) { st.x = nx; rng.value = nx; ciz(); }
      if (xs >= 100) oynat(false);
    });
    const durG = genislik(el, kur);
    return () => { durT(); durG(); };
  };

  /* ================= 3 · CO₂ ve hipoksi yanıt eğrileri ================= */
  VIZ.fek22_yanit = (el) => {
    const cap = capOf(el);
    const veN = (P) => (P < 3.97 ? 0 : P <= 10 ? 4.5 * (P - 3.97) : Math.max(0, 27.15 + 4.5 * (P - 10) - 1.8 * (P - 10) * (P - 10)));
    const par = (aj, d) => (aj === 'v' ? { k: 4.5 - 2.7 * d, s: 1.8 * d, g: 1 - 0.85 * Math.pow(d, 0.25) } : aj === 'o' ? { k: 4.5 - 3.0 * d, s: 2.6 * d, g: 1 - 0.7 * d } : { k: 4.5, s: 0, g: 1 });
    const veA = (P, p) => (p.k / 4.5) * veN(P - p.s);
    const Hh = (P) => Math.exp((8 - P) / 2.2);
    const veH = (P, g) => 6 + g * Hh(P);
    const AD = { n: 'Ajan yok', v: 'Volatil ajan', o: 'Opioid' };
    const dozAd = (d) => (d === 0 ? 'sıfır' : d <= 0.2 ? 'eser' : d <= 0.7 ? 'orta' : 'yüksek');
    const st = { g: 'co2', aj: 'n', doz: 50, p: { co2: 8.0, hip: 8.0 } };
    el.innerHTML = `<div class="fek22-kok">
      <div class="fek22-ust">
        <div class="fek22-grup"><span class="fek22-gl">Görünüm</span>${seg('Görünüm', 'g', [['co2', 'CO₂ yanıtı'], ['hip', 'Hipoksi yanıtı']], st.g)}</div>
        <div class="fek22-grup"><span class="fek22-gl">Ajan</span>${seg('Ajan', 'aj', [['n', 'Ajan yok'], ['v', 'Volatil ajan'], ['o', 'Opioid']], st.aj)}</div>
        <div class="fek22-rng" data-rk="doz"><span>Doz · etki şiddeti <output data-o="doz"></output></span><input type="range" min="0" max="100" step="5" value="${st.doz}" data-r="doz" aria-label="Doz · etki şiddeti"><div class="fek22-doz" aria-hidden="true"><span style="left:15%">eser</span><span style="left:50%">orta</span><span style="left:100%">yüksek</span></div></div>
        ${kaydirici('p', 'Çalışma noktası · PaCO₂', 4, 15, 0.1, st.p.co2)}
      </div>
      <div class="fek22-leg"></div>
      <div class="fek22-yan"><div class="fek22-svgk"></div><div class="fek22-pano"></div></div>
    </div>`;
    const kok = el.querySelector('.fek22-kok'), kap = el.querySelector('.fek22-svgk'), pano = el.querySelector('.fek22-pano'), leg = el.querySelector('.fek22-leg');
    const rD = el.querySelector('[data-r="doz"]'), rP = el.querySelector('[data-r="p"]'), oD = el.querySelector('[data-o="doz"]'), oP = el.querySelector('[data-o="p"]');
    const lP = el.querySelector('[data-rk="p"] > span'), kD = el.querySelector('[data-rk="doz"]');
    let G = null;
    const kur = (dar) => {
      kok.classList.toggle('dar', dar);
      G = dar ? { dar, W: 340, H: 392, x0: 46, x1: 330, y0: 300, y1: 26, tkY: 316, apY: 340, axY: 368 }
        : { dar, W: 560, H: 396, x0: 64, x1: 540, y0: 316, y1: 44, tkY: 333, apY: 356, axY: 386 };
      ciz();
    };
    const ciz = () => {
      if (!G) return;
      const dar = G.dar, co2 = st.g === 'co2', d = st.doz / 100, aj = st.aj, p = par(aj, d), P = st.p[st.g], o = [];
      const X = co2 ? (x) => G.x0 + (x - 3) / 12 * (G.x1 - G.x0) : (x) => G.x0 + (x - 3) / 17 * (G.x1 - G.x0);
      const Y = co2 ? (v) => G.y0 - v / 32 * (G.y0 - G.y1) : (v) => G.y0 - v / 14 * (G.y0 - G.y1);
      const cA = aj === 'v' ? 'v' : 'o', var_ = aj !== 'n';
      const fN = co2 ? veN : (x) => veH(x, 1), fA = co2 ? (x) => veA(x, p) : (x) => veH(x, p.g);
      const vN = fN(P), vA = fA(P);
      // bölge ve eksen
      if (co2) {
        o.push(Rc(X(5), G.y1, X(10) - X(5), G.y0 - G.y1, 'fek22-yn-dog'));
        o.push(T((X(5) + X(10)) / 2, G.y1 + 14, '5–10 kPa', 'fek22-ok fek22-b', MID), T((X(5) + X(10)) / 2, G.y1 + 28, 'doğrusal yanıt', 'fek22-s fek22-ok', MID));
      }
      const yt = co2 ? [0, 10, 20, 30] : [0, 5, 10];
      yt.forEach((v) => o.push(Ln(G.x0, Y(v), G.x1, Y(v), 'fek22-izg'), T(G.x0 - 7, Y(v) + 4, v, 'fek22-mono', END)));
      const xt = co2 ? (dar ? [4, 6, 8, 10, 14] : [4, 5, 6, 8, 10, 12, 14]) : (dar ? [4, 8, 12, 20] : [4, 6, 8, 10, 15, 20]);
      xt.forEach((x) => {
        const kal = co2 ? (x === 5 || x === 10) : x === 8;
        o.push(`<line x1="${X(x).toFixed(1)}" y1="${G.y0}" x2="${X(x).toFixed(1)}" y2="${G.y0 + (kal ? 7 : 5)}" class="fek22-tik" style="stroke-width:${kal ? 2.4 : 1.2}${!co2 && kal ? ';stroke:var(--crit)' : ''}"/>`);
        o.push(T(X(x), G.tkY, x, 'fek22-mono' + (!co2 && kal ? ' fek22-crit' : ''), MID + (kal ? ' style="font-weight:700"' : '')));
      });
      o.push(`<path d="M${G.x0} ${G.y1} V${G.y0} H${G.x1}" class="fek22-eksen"/>`);
      o.push(T((G.x0 + G.x1) / 2, G.axY, co2 ? 'PaCO₂ (kPa)' : 'PaO₂ (kPa)', 'fek22-k', MID));
      const ym = (G.y0 + G.y1) / 2, xd = dar ? 12 : 18;
      o.push(T(xd, ym, co2 && !dar ? 'Dakika ventilasyonu V̇E (L/dk)' : 'V̇E (L/dk)', 'fek22-k', DIK(xd, ym)));
      // eğri örnekleri
      const egri = (f, s, cls) => {
        if (co2) {
          const T0 = 3.97 + s, duz = [], kes = [];
          for (let x = T0; x <= 15.0001; x += 0.05) { const pt = [X(x), Y(Math.max(0, f(x)))]; if (x - s <= 10 + 1e-9) duz.push(pt); if (x - s >= 10 - 0.05) kes.push(pt); }
          return `<path d="${yol(duz)}" class="${cls}"/>` + (kes.length > 1 ? `<path d="${yol(kes)}" class="${cls} fek22-yn-kes"/>` : '');
        }
        const pts = []; for (let x = 3.45; x <= 20.0001; x += 0.05) pts.push([X(x), Y(Math.min(14, f(x)))]);
        return `<path d="${yol(pts)}" class="${cls}"/>`;
      };
      if (!co2) {
        o.push(Ln(X(8), G.y1, X(8), G.y0, 'fek22-yn-h8'));
        o.push(T(X(8) + 6, G.y1 + 14, '8 kPa', 'fek22-crit fek22-b'), T(X(8) + 6, G.y1 + 28, 'altında dik artış', 'fek22-s fek22-crit'));
      }
      if (co2 && !dar) o.push(T(X(11.3), Y(30) - 4, '10 kPa üstü: hayvan deneyleri', 'fek22-s fek22-h', MID));
      o.push(egri(fN, 0, 'fek22-yn-n'));
      if (var_) o.push(egri(fA, p.s, 'fek22-yn-' + cA));
      // eğim üçgenleri (yalnız geniş, CO₂)
      if (co2 && !dar) {
        o.push(`<path d="M${X(5).toFixed(1)} ${Y(veN(5)).toFixed(1)} V${Y(veN(6)).toFixed(1)} H${X(6).toFixed(1)}" class="fek22-yn-ego n"/>`);
        o.push(T(X(5) - 5, (Y(veN(5)) + Y(veN(6))) / 2 + 4, 'eğim 4,5', 'fek22-s fek22-ink fek22-h', END));
        if (var_ && p.k < 4.49) {
          const a = 3.97 + p.s + 1, va = veA(a, p), vb = veA(a + 1, p);
          o.push(`<path d="M${X(a).toFixed(1)} ${Y(va).toFixed(1)} H${X(a + 1).toFixed(1)} V${Y(vb).toFixed(1)}" class="fek22-yn-ego ${cA}"/>`);
          o.push(T(X(a + 1) + 5, (Y(va) + Y(vb)) / 2 + 6, 'eğim ' + fmt(p.k), 'fek22-s fek22-h ' + (cA === 'v' ? 'fek22-clin' : 'fek22-acc')));
        }
      }
      // apneik eşik işaretleri
      if (co2) {
        const tri = (x, cls) => `<polygon points="${(x - 4.5).toFixed(1)},${G.y0 - 9} ${(x + 4.5).toFixed(1)},${G.y0 - 9} ${x.toFixed(1)},${G.y0}" class="${cls}"/>`;
        const Tn = 3.97, Ta = 3.97 + p.s;
        o.push(tri(X(Tn), 'fek22-yn-tn'));
        if (var_ && p.s > 0.05) {
          o.push(tri(X(Ta), 'fek22-yn-t' + cA));
          o.push(Ln(X(Tn), G.y0 + 8, X(Tn), G.apY - 10, 'fek22-kil'), Ln(X(Ta), G.y0 + 8, X(Ta), G.apY - 10, 'fek22-kil'));
          o.push(ciftOk(X(Tn), G.apY - 4, X(Ta), G.apY - 4, 'fek22-yn-ok', 'fek22-yn-okb', 5));
          o.push(T(X(Tn) - 6, G.apY, '4,0 kPa', 'fek22-s fek22-ink', END));
          o.push(T(X(Ta) + 6, G.apY, dar ? `${fmt(Ta)} kPa · +${fmt(p.s)}` : `${fmt(Ta)} kPa · apneik eşik +${fmt(p.s)} kPa`, 'fek22-s fek22-warn'));
        } else o.push(T(X(Tn) - 6, G.apY, 'apneik eşik ≈ 4,0 kPa', 'fek22-s fek22-ink'));
      }
      // hipoksik kazanç sütunları
      const kN = veH(4, 1) - 6, kA = veH(4, p.g) - 6, yuz = Math.round(kA / kN * 100);
      if (!co2) {
        const bx = dar ? G.x1 - 104 : G.x1 - 150, by = G.y1 + 10, bh = dar ? 56 : 66, bw = 22, ar = dar ? 20 : 14, tab = by + 20 + bh;
        o.push(T(bx, by + 4, 'hipoksik kazanç · 4 kPa', 'fek22-s fek22-ink'));
        o.push(Rc(bx + 4, tab - bh, bw, bh, 'fek22-yn-kz n'));
        o.push(T(bx + 4 + bw / 2, tab + 14, '+' + fmt(kN), 'fek22-mono fek22-ink', MID));
        if (var_) {
          const h = bh * kA / kN;
          o.push(Rc(bx + 4 + bw + ar, tab - bh, bw, bh, 'fek22-yn-kzt'), Rc(bx + 4 + bw + ar, tab - h, bw, h, 'fek22-yn-kz ' + cA));
          o.push(T(bx + 4 + bw * 1.5 + ar, tab + 14, '+' + fmt(kA), 'fek22-mono fek22-ink', MID));
          o.push(T(bx + 4 + 2 * bw + ar + 6, tab - 4, dar ? `%${yuz}` : `normalin %${yuz}'si`, 'fek22-s fek22-ink'));
        }
      }
      // çalışma noktası ve iki okunuş
      const xP = X(P);
      o.push(Ln(xP, G.y1, xP, G.y0, 'fek22-kil'));
      const yN = Y(Math.min(co2 ? 32 : 14, vN)), yA = Y(Math.min(co2 ? 32 : 14, vA)), fark = vN - vA;
      if (var_ && Math.abs(fark) > 0.25 && Math.abs(yN - yA) > 16) {
        o.push(ciftOk(xP, yN, xP, yA, 'fek22-yn-fark', 'fek22-yn-farkb', 6));
        const lab = `aynı ${co2 ? 'PaCO₂' : 'PaO₂'}'de ${fmt(Math.abs(fark))} L/dk ${fark >= 0 ? 'daha az' : 'daha fazla'}`;
        const sag = xP + 10 + (dar ? 150 : 200) < G.x1;
        o.push(T(sag ? xP + 9 : xP - 9, (yN + yA) / 2 + 4, lab, 'fek22-s fek22-ink fek22-h', sag ? '' : END));
      }
      o.push(Ci(xP, yN, 6, 'fek22-nok', 'style="fill:var(--ink)"'));
      if (var_) o.push(Ci(xP, yA, 6, 'fek22-nok', `style="fill:var(${cA === 'v' ? '--c-clin' : '--accent'})"`));
      kap.innerHTML = `<svg class="fek22-svg fek22-yn-svg${dar ? ' dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="${co2 ? 'Arteriyel PCO₂ ile dakika ventilasyonu: normal eğri ve ajan eğrisi, eğim ve apneik eşik' : 'Arteriyel PO₂ ile dakika ventilasyonu: normal ve ajanlı hipoksik yanıt eğrileri'}">${o.join('')}</svg>`;
      // gösterge
      const ajL = var_ ? `<span class="${cA === 'v' ? 'clin' : 'acc'}"><i></i><b>${AD[aj].toLowerCase()} · ${dozAd(d)} doz</b></span>` : '';
      leg.innerHTML = `<span class="ink"><i></i><b>normal</b></span>${ajL}${co2 ? '<span class="mut"><i class="kes"></i><b>10 kPa üstü: hayvan deneyleri</b></span>' : ''}`;
      // kontroller
      kD.classList.toggle('kapali', !var_); rD.disabled = !var_;
      oD.textContent = var_ ? `${st.doz} · ${dozAd(d)}` : '—';
      rD.setAttribute('aria-valuetext', `${st.doz}, ${dozAd(d)} doz`);
      el.querySelectorAll('.fek22-doz span').forEach((s, i) => s.classList.toggle('on', var_ && dozAd(d) === ['eser', 'orta', 'yüksek'][i]));
      lP.firstChild.nodeValue = co2 ? 'Çalışma noktası · PaCO₂ ' : 'Çalışma noktası · PaO₂ ';
      oP.textContent = fmt(P) + ' kPa';
      rP.setAttribute('aria-valuetext', fmt(P) + ' kilopaskal');
      // pano
      const satir = (dt, ddv, cls) => `<div><dt>${dt}</dt><dd${cls ? ` class="${cls}"` : ''}>${ddv}</dd></div>`;
      let pn = `<h4>Okuma</h4><dl>${satir(co2 ? 'PaCO₂' : 'PaO₂', fmt(P) + ' kPa')}${satir('V̇<sub>E</sub> · normal', fmt(vN) + ' L/dk')}${satir('V̇<sub>E</sub> · ajanla', var_ ? fmt(vA) + ' L/dk' : '—', var_ ? (cA === 'v' ? '' : 'fek22-acc') : '')}<hr>`;
      if (co2) {
        pn += satir('eğim (L·dk⁻¹·kPa⁻¹)', var_ ? `4,5 → ${fmt(p.k)}` : '4,5') + satir('apneik eşik', var_ ? `4,0 → ${fmt(3.97 + p.s)} kPa` : '4,0 kPa', var_ && p.s > 0.05 ? 'fek22-warn' : '');
        pn += satir(`aynı PaCO₂'de`, var_ ? `${fark >= 0 ? '−' : '+'}${fmt(Math.abs(fark))} L/dk` : '—');
        if (dar) pn += satir('10 kPa üstü', 'hayvan deneyleri');
      } else {
        pn += satir('hipoksik kazanç', var_ ? `${fmt(kN)} → ${fmt(kA)} L/dk` : `${fmt(kN)} L/dk`) + satir('normalin', var_ ? `%${yuz}'si` : '%100');
        pn += '<hr>' + satir('istirahat V̇<sub>E</sub>', 'karşılaştırma için 6 L/dk\'da sabit');
      }
      pn += `</dl><div class="fek22-rozet">doz: ${['eser', 'orta', 'yüksek'].map((z) => (var_ && dozAd(d) === z ? `<b>${z}</b>` : z)).join(' / ')}</div>`;
      pano.innerHTML = pn;
      // açıklama
      const dz = dozAd(d), pp = fmt(P);
      let h;
      if (co2) {
        if (!var_) h = `<b>Normal CO₂ yanıtı.</b> PaCO₂ ${pp} kPa'da V̇<sub>E</sub> ≈ ${fmt(vN)} L/dk; eğim 4,5 L·dk⁻¹·kPa⁻¹, apneik eşik ≈ 4,0 kPa. Ventilasyonun CO₂'ye yanıtı normal klinik sınırlar içinde (PaCO₂ 5–10 kPa) doğrusaldır; çok yüksek PaCO₂ değerlerinde hayvan deneyleri V̇<sub>E</sub>'nin azaldığını göstermiştir. [[K1 s. 96]]`;
        else if (aj === 'v') h = `<b>Volatil ajan · ${dz} doz.</b> Dakika ventilasyonunun yükselen PCO₂ ile artış hızı azalır: eğim 4,5 yerine ${fmt(p.k)} L·dk⁻¹·kPa⁻¹. Eğri sağa kayar ve hiperventilasyondan sonra spontan solunumun yeniden başladığı arteriyel PCO₂, yani apneik eşik, 4,0 kPa'dan ${fmt(3.97 + p.s)} kPa'ya yükselir. PaCO₂ ${pp} kPa'da ventilasyon ${fmt(vN)} yerine ${fmt(vA)} L/dk olur. [[K2 s. 109]]`;
        else h = `<b>Opioid · ${dz} doz.</b> Sonuç volatil ajandakine benzer: eğim ${fmt(p.k)} L·dk⁻¹·kPa⁻¹'ye iner, apneik eşik ${fmt(3.97 + p.s)} kPa'ya çıkar, PaCO₂ ${pp} kPa'da ventilasyon ${fmt(vN)} yerine ${fmt(vA)} L/dk olur. Etkinin yeri ise ayrıdır: K1'e göre opioidler kemoreseptörlerin hipoksemi ve hiperkapni yanıtını etkilemez, medulladaki solunum merkezini baskılar ve CO₂ yanıt eğrisi sağa kayar. [[K2 s. 109]] [[K1 s. 96]]`;
      } else {
        if (!var_) h = `<b>Normal hipoksik yanıt.</b> PaO₂ 8 kPa'nın altına düştüğünde periferik kemoreseptörler solunum merkezini hızla uyarır ve ventilasyon belirgin biçimde artar: PaO₂ 4 kPa'da artış ≈ +6,2 L/dk. PaO₂ ${pp} kPa'da V̇<sub>E</sub> ≈ ${fmt(vN)} L/dk. [[K1 s. 95]]`;
        else if (aj === 'v') h = `<b>Volatil ajan · ${dz} doz.</b> Hipoksik yanıt eğrisi çok düşük konsantrasyonlarda bile baskılanır: eser dozda (15) PaO₂ 4 kPa'daki artış +6,2'den +2,9 L/dk'ya, yani normalin yarısının altına iner. Şimdiki dozda artış +${fmt(kA)} L/dk (normalin %${yuz}'si). İstirahat ventilasyonu bu görünümde karşılaştırma için 6 L/dk'da tutulmuştur. [[K2 s. 109]]`;
        else h = `<b>Opioid · ${dz} doz.</b> Hipoksiye ventilatuvar yanıt da körelir: PaO₂ 4 kPa'daki artış +${fmt(kA)} L/dk (normalin %${yuz}'si). K1'e göre bu körelme kemoreseptörlerin yanıtının değişmesinden değil, medulladaki solunum merkezinin baskılanmasından doğar. Etki erken postoperatif döneme uzanır ve hipoksi gelişme riskini artırır. [[K2 s. 109]] [[K1 s. 96]]`;
      }
      if (var_ && d === 0) h += ' Doz sıfırda ajan eğrisi normal eğriyle çakışır.';
      cap.yaz(h);
    };
    el.addEventListener('click', (e) => {
      const g = e.target.closest('[data-g]'), a = e.target.closest('[data-aj]');
      if (g) {
        st.g = g.dataset.g; basSec(el, 'g', st.g);
        if (st.g === 'co2') { rP.min = 4; rP.max = 15; } else { rP.min = 4; rP.max = 20; }
        rP.value = st.p[st.g]; ciz();
      }
      if (a) { st.aj = a.dataset.aj; basSec(el, 'aj', st.aj); ciz(); }
    });
    rD.addEventListener('input', () => { st.doz = +rD.value; ciz(); });
    rP.addEventListener('input', () => { st.p[st.g] = +rP.value; ciz(); });
    return genislik(el, kur);
  };
})();
