/* Fizyoloji Bölüm 15 · Ventilasyon–perfüzyon ilişkileri · bileşenler (K1 s. 68–70).
   Tarifler: docs/tasarim/fiz15.md. Bütün modeller şematiktir; kitaptan gelen sayılar ve model varsayımları
   bileşen altlarında (viz-foot) belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const txt = (parent, x, y, s, cls, attrs) => { const t = mk('text', Object.assign({ x, y, class: cls }, attrs || {}), parent); t.textContent = s; return t; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
  const fmt = (v, d = 1) => (Math.abs(v) < 0.5 * Math.pow(10, -d) ? 0 : v).toFixed(d).replace('.', ',').replace('-', '−');
  const uid = () => Math.random().toString(36).slice(2, 7);
  const rnd = (() => { let s = 15; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const yolD = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  /* çoklu doğru üzerinde yol: at(s) → [x, y] */
  function rota(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const len = L[L.length - 1];
    return {
      pts, len, L,
      at(s) {
        s = clamp(s, 0, len);
        let i = 1; while (i < L.length - 1 && L[i] < s) i++;
        const f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
        return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
      },
    };
  }
  /* sayfadaki .viz-cap: bileşen yalnız data-viz öğesine çizer, açıklamayı buraya yazar */
  function capOf(el) {
    const viz = el.closest('.viz'), c = viz ? viz.querySelector('.viz-cap') : null;
    let son = null;
    return { yaz(h) { if (!c || h === son) return; c.innerHTML = REF(h); son = h; } };
  }
  /* öğe ilk kez görünür olunca bir kez çalıştır */
  function gorununce(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return () => {}; }
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); fn(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }
  /* kap genişliği eşiği geçince yeniden kur */
  function genislik(el, esikler, cb) {
    let son = null;
    const bak = () => { const w = el.clientWidth || 0; const d = esikler.filter((e) => w < e).length; if (d !== son) { son = d; cb(d); } };
    bak();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  }

  /* ---------- O₂ modeli (4. ve 6. bileşen) ----------
     İçerik = 1,34 × Hb × S + 0,023 × PO₂; Hb 15 g/dL; miks venöz içerik 15,2 mL/dL, PvO₂ 5,3 kPa; PB − PH₂O = 94,7 kPa [K1 s. 66].
     S Hill denklemiyle (n 2,7; P50 3,5 kPa). Bir bölmenin kapiller sonu PO₂'si O₂ kütle dengesinden (alveoler gaz denklemi biçimi). */
  const HB = 15, HUF = 1.34, COZ = 0.023, NH = 2.7, P50 = 3.5, CV = 15.2, PV = 5.3, PKURU = 101 - 6.3, RQ = 0.8, BTPS = 1.21;
  const KK = 100 / (PKURU * BTPS);
  const SAT = (p) => { p = Math.max(p, 0); const a = Math.pow(p, NH); return a / (a + Math.pow(P50, NH)); };
  const ICR = (p) => HUF * HB * SAT(p) + COZ * p;
  function birim(vq, fio2) {
    if (vq === 0) return { p: PV, c: CV };
    const pio2 = fio2 * PKURU;
    if (!isFinite(vq)) return { p: pio2, c: ICR(pio2) };
    const F = 1 - fio2 * (1 - RQ);
    const f = (p) => KK * vq * (pio2 - p) - F * (ICR(p) - CV);
    let lo = 1, hi = pio2;
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
    const p = (lo + hi) / 2;
    return { p, c: ICR(p) };
  }
  function ters(c) {
    let lo = 0.5, hi = 700;
    for (let i = 0; i < 70; i++) { const m = (lo + hi) / 2; if (ICR(m) < c) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  /* satürasyona göre kan rengi: %75 → mavi, %100 → kırmızı */
  const satRenk = (s) => `color-mix(in srgb, var(--crit) ${clamp(((s * 100 - 75) / 25) * 100, 0, 100).toFixed(0)}%, var(--c-basic))`;

  /* ---------- akciğer silueti ----------
     u: tabandan (0) apekse (1); s: −1…1 yanlara. map(u, s) → [x, y]. kubbe: diyafram kubbesinin derinliği (u cinsinden). */
  const hwf = (u) => Math.pow(Math.max(0, 1 - u), 0.45);
  function akcPoly(map, kubbe = 0, n = 26) {
    const P = [];
    for (let i = 0; i <= n; i++) { const u = 1 - Math.pow(1 - i / n, 1.7); P.push(map(u, -hwf(u))); }
    for (let i = n - 1; i >= 0; i--) { const u = 1 - Math.pow(1 - i / n, 1.7); P.push(map(u, hwf(u))); }
    if (kubbe) for (let i = 1; i < 12; i++) { const s = 1 - (2 * i) / 12; P.push(map(kubbe * (1 - s * s), s)); }
    return P;
  }
  const polyD = (P) => yolD(P) + 'Z';
  const icinde = (x, y, P) => {
    let c = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, yi] = P[i], [xj, yj] = P[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const okBasi = (x, y, yon, w, l) => { // yon: 'a' aşağı, 'y' yukarı, 's' sağ, 'l' sol
    if (yon === 'a') return `M${x - w} ${y - l} L${x} ${y} L${x + w} ${y - l} Z`;
    if (yon === 'y') return `M${x - w} ${y + l} L${x} ${y} L${x + w} ${y + l} Z`;
    if (yon === 's') return `M${x - l} ${y - w} L${x} ${y} L${x - l} ${y + w} Z`;
    return `M${x + l} ${y - w} L${x} ${y} L${x + l} ${y + w} Z`;
  };

  /* ================= 1 · Kan sütunu: pozisyon ve egzersiz ================= */
  VIZ.f15_kan = (el) => {
    const cap = capOf(el), id = uid();
    const PROF = {
      dik: [1, 0.83, 0.65, 0.48, 0.3, 0.13], egz: [1, 0.94, 0.88, 0.82, 0.76, 0.7],
      sirt: [1, 0.88, 0.76, 0.64, 0.52, 0.4], yan: [1, 0.83, 0.65, 0.48, 0.3, 0.13],
    };
    const CAPS = {
      dik: "<b>Dik duruş.</b> Apeks tabandan yaklaşık 30 cm yukarıdadır: aradaki kan sütunu 30 cmH₂O ≈ 22 mmHg'lık bir fark yaratır, ortalama pulmoner arter basıncı ise yalnızca 15 mmHg'dır. Perfüzyon tepeden tabana doğru artar. [[K1 s. 68]]",
      egz: "<b>Egzersiz.</b> Kalp debisi artınca MPAP de yükselir. 22 mmHg'lık hidrostatik fark değişmez ama yükselen basıncın yanında görece önemsizleşir: kan apekse de ulaşır ve akciğer boyunca daha eşit dağılır. [[K1 s. 68]]",
      sirt: '<b>Sırtüstü.</b> Apeks ile taban aynı yüksekliğe gelir, aralarındaki dikey fark ortadan kalkar. Şimdi ön akciğer arka akciğerden yukarıdadır; aynı hidrostatik nedenle arka bölüm daha çok perfüze olur. [[K1 s. 68]]',
      yan: '<b>Yan yatış.</b> Alttaki (dependan) akciğer, üstteki (nondependan) akciğerden daha çok kan alır. İlke dik duruştakiyle aynıdır; yalnızca dikey eksen değişmiştir. [[K1 s. 68]]',
    };
    const NOT = {
      dik: '<b>22 mmHg &gt; 15 mmHg:</b> apekse az kan.',
      egz: "<b>MPAP yükseldi:</b> 22 mmHg'lık fark görece küçüldü.",
      sirt: '<b>Apeks–taban farkı yok:</b> fark artık ön–arka arasında.',
      yan: '<b>Apeks–taban farkı yok:</b> fark iki akciğer arasında.',
    };
    let poz = 'dik', egz = false, P = [], geo = null, B = null;
    el.innerHTML = `<div class="f15-ctl">${segHtml('Pozisyon', 'poz', [['dik', 'Dik'], ['sirt', 'Sırtüstü'], ['yan', 'Yan yatış']], 'dik')}
        <button type="button" class="btn ghost f15-tog" data-egz aria-pressed="false">Egzersiz (CO ↑)</button></div>
      <div class="f15-kan">
        <div class="f15-kan-sol"><svg class="f15-svg" viewBox="0 0 360 340" role="img" aria-label="Akciğer silueti; yatay dilimlerin kırmızı yoğunluğu göreli perfüzyonu, hareket eden noktalar kan akımını gösterir"></svg></div>
        <div class="f15-kan-sag"><svg class="f15-svg f15-kan-bsvg" role="img" aria-label="Apeks–taban hidrostatik basınç farkı ile ortalama pulmoner arter basıncının mmHg ölçeğinde karşılaştırması"></svg>
          <p class="f15-kan-not"></p><p class="f15-kan-cev">30 cm kan sütunu ≈ 30 cmH₂O ≈ 22 mmHg (1 mmHg ≈ 1,36 cmH₂O)</p></div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const root = $('.f15-kan'), svgL = $('.f15-kan-sol svg'), svgR = $('.f15-kan-bsvg');
    const profil = () => PROF[poz === 'dik' && egz ? 'egz' : poz];

    function sahneKur() {
      svgL.innerHTML = '';
      let lob, bant, hil, kalp = null;
      if (poz === 'dik') {
        lob = [akcPoly((u, s) => [205 + s * 100, 320 - u * 300], 0.06)];
        bant = [0, 1, 2, 3, 4, 5].map((k) => [320 - 50 * (k + 1), 320 - 50 * k]);
        hil = () => [142, 200];
      } else if (poz === 'sirt') {
        lob = [akcPoly((u, s) => [340 - u * 260, 170 + s * 100], 0.06)];
        bant = [0, 1, 2, 3, 4, 5].map((k) => [270 - (200 / 6) * (k + 1), 270 - (200 / 6) * k]);
        hil = () => [196, 170];
      } else {
        lob = [akcPoly((u, s) => [330 - u * 260, 95 + s * 68], 0.06), akcPoly((u, s) => [330 - u * 260, 245 + s * 68], 0.06)];
        bant = [0, 1, 2, 3, 4, 5].map((k) => [320 - 50 * (k + 1), 320 - 50 * k]);
        hil = (k) => (k < 3 ? [206, 192] : [206, 148]);
        kalp = [200, 170, 24];
      }
      const defs = mk('defs', null, svgL);
      const cp = mk('clipPath', { id: `f15-kan-cp-${id}` }, defs);
      lob.forEach((L) => mk('path', { d: polyD(L) }, cp));
      const gZem = mk('g', null, svgL);
      lob.forEach((L) => mk('path', { d: polyD(L), class: 'f15-kan-zem' }, gZem));
      const gBant = mk('g', { 'clip-path': `url(#f15-kan-cp-${id})` }, svgL);
      const bR = bant.map(([y0, y1]) => mk('rect', { x: 0, y: y0, width: 360, height: y1 - y0, class: 'f15-kan-bant' }, gBant));
      bant.slice(1).forEach(([, y1]) => mk('line', { x1: 0, x2: 360, y1, y2: y1, class: 'f15-kan-bcz' }, gBant));
      lob.forEach((L) => mk('path', { d: polyD(L), class: 'f15-kan-ana' }, svgL));
      if (kalp) { mk('circle', { cx: kalp[0], cy: kalp[1], r: kalp[2], class: 'f15-kan-kalp' }, svgL); txt(svgL, kalp[0], kalp[1] + 4, 'kalp', 'f15-tk', { 'text-anchor': 'middle' }); }
      // yerçekimi
      mk('line', { x1: 24, y1: 70, x2: 24, y2: 262, class: 'f15-kan-g' }, svgL);
      mk('path', { d: okBasi(24, 274, 'a', 6, 12), class: 'f15-kan-gb' }, svgL);
      txt(svgL, 32, 172, 'g', 'f15-lb f15-kan-gl');
      // cetvel ve etiketler
      const lb = (x, y, s, a, c) => txt(svgL, x, y, s, c || 'f15-lb', { 'text-anchor': a || 'middle' });
      if (poz === 'dik') {
        mk('line', { x1: 60, y1: 20, x2: 60, y2: 320, class: 'f15-kan-cet' }, svgL);
        [0, 10, 20, 30].forEach((cm) => { const y = 320 - cm * 10; mk('line', { x1: 55, x2: 65, y1: y, y2: y, class: 'f15-kan-cet' }, svgL); txt(svgL, 69, y + 4, cm === 30 ? '30 cm' : String(cm), 'f15-tk'); });
        lb(205, 12, 'Apeks'); lb(205, 337, 'Taban');
        mk('line', { x1: 98, y1: 200, x2: 142, y2: 200, class: 'f15-kan-pa' }, svgL);
        txt(svgL, 96, 191, 'PA', 'f15-tk', { 'text-anchor': 'end' });
      } else if (poz === 'sirt') {
        mk('line', { x1: 60, y1: 70, x2: 60, y2: 270, class: 'f15-kan-cet' }, svgL);
        [70, 270].forEach((y) => mk('line', { x1: 55, x2: 65, y1: y, y2: y, class: 'f15-kan-cet' }, svgL));
        lb(210, 56, 'Ön (anterior)'); lb(210, 292, 'Arka (posterior)');
        lb(80, 316, '← Apeks', 'start'); lb(340, 316, 'Taban →', 'end');
        txt(svgL, 8, 336, 'dikey eksen: ön–arka', 'f15-tk');
        mk('circle', { cx: 196, cy: 170, r: 6, class: 'f15-kan-hil' }, svgL);
      } else {
        lb(205, 15, 'Üstteki akciğer (nondependan)'); lb(205, 336, 'Alttaki akciğer (dependan)');
      }
      const gP = mk('g', { class: 'f15-kan-par' }, svgL);
      geo = { lob, bant, hil, kalp, bR, gP };
      parcaKur();
    }
    const icNokta = (k) => {
      const [y0, y1] = geo.bant[k];
      for (let t = 0; t < 400; t++) {
        const x = 20 + rnd() * 330, y = y0 + 5 + rnd() * (y1 - y0 - 10);
        if (geo.kalp && Math.hypot(x - geo.kalp[0], y - geo.kalp[1]) < geo.kalp[2] + 8) continue;
        if (geo.lob.some((L) => icinde(x - 5, y, L) && icinde(x + 5, y, L) && icinde(x, y - 4, L) && icinde(x, y + 4, L))) return [x, y];
      }
      return null;
    };
    function parcaKur() {
      geo.gP.innerHTML = ''; P = [];
      const I = profil(), N = poz === 'dik' && egz ? 60 : 36, top = I.reduce((a, b) => a + b, 0);
      I.forEach((v, k) => {
        const n = Math.round((N * v) / top);
        for (let i = 0; i < n; i++) {
          const H = geo.hil(k), A = icNokta(k), C = icNokta(k);
          if (!A || !C) continue;
          const r = rota([H, A, C, H]);
          P.push({ r, s: rnd() * r.len, c: mk('circle', { r: 2.5, class: 'f15-kan-p' }, geo.gP) });
        }
      });
      parcaCiz(0);
    }
    function parcaCiz(dt) {
      const v = 78 * (poz === 'dik' && egz ? 1.6 : 1);
      P.forEach((p) => {
        if (!RM) p.s = (p.s + v * dt) % p.r.len;
        const [x, y] = p.r.at(p.s);
        const kenar = Math.min(p.s, p.r.len - p.s);
        p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1));
        p.c.setAttribute('opacity', RM ? 0.9 : clamp(kenar / 14, 0, 1).toFixed(2));
      });
    }
    function dolgu(anim) {
      const I = profil();
      geo.bR.forEach((r, k) => {
        const hedef = (0.12 + 0.6 * I[k]).toFixed(3);
        if (anim && !RM) { r.style.fillOpacity = 0.12; requestAnimationFrame(() => requestAnimationFrame(() => { r.style.fillOpacity = hedef; })); } else r.style.fillOpacity = hedef;
      });
    }

    function basKur(dar) {
      svgR.innerHTML = '';
      const H = dar ? 222 : 300, y0 = dar ? 168 : 250, yT = dar ? 30 : 40, s = (y0 - yT) / 30;
      svgR.setAttribute('viewBox', `0 0 260 ${H}`);
      const Y = (m) => y0 - m * s;
      const defs = mk('defs', null, svgR);
      const pat = mk('pattern', { id: `f15-kan-tar-${id}`, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
      mk('rect', { width: 6, height: 6, class: 'f15-kan-tarz' }, pat);
      mk('line', { x1: 1, y1: 0, x2: 1, y2: 6, class: 'f15-kan-tarc' }, pat);
      [0, 10, 20, 30].forEach((m) => { mk('line', { x1: 40, x2: 244, y1: Y(m), y2: Y(m), class: 'f15-grid' }, svgR); txt(svgR, 34, Y(m) + 4, String(m), 'f15-tk', { 'text-anchor': 'end' }); });
      mk('line', { x1: 40, x2: 40, y1: yT - 6, y2: y0, class: 'f15-eksen' }, svgR);
      mk('line', { x1: 40, x2: 244, y1: y0, y2: y0, class: 'f15-eksen' }, svgR);
      txt(svgR, 40, yT - 14, 'mmHg', 'f15-tk');
      const b1 = mk('rect', { x: 72, width: 50, y: Y(22), height: 22 * s, rx: 3, class: 'f15-kan-b1' }, svgR);
      const b1h = mk('rect', { x: 72, width: 50, y: Y(22), height: 22 * s, rx: 3, class: 'f15-kan-b1h' }, svgR);
      const b1t = txt(svgR, 97, Y(22) - 8, '22 mmHg', 'f15-lb f15-kan-b1t', { 'text-anchor': 'middle' });
      const b2 = mk('rect', { x: 178, width: 50, y: Y(15), height: 15 * s, rx: 3, class: 'f15-kan-b2' }, svgR);
      const b2x = mk('rect', { x: 178, width: 50, y: Y(21), height: 6 * s, class: 'f15-kan-b2x', style: `fill:url(#f15-kan-tar-${id})` }, svgR);
      const b2o = mk('g', { class: 'f15-kan-b2o' }, svgR);
      mk('line', { x1: 203, x2: 203, y1: Y(21), y2: Y(25.5), class: 'f15-kan-b2ok' }, b2o);
      mk('path', { d: okBasi(203, Y(26.5), 'y', 6, 9), class: 'f15-kan-b2ob' }, b2o);
      const b2t = txt(svgR, 203, Y(15) - 8, '15 mmHg', 'f15-lb f15-kan-b2t', { 'text-anchor': 'middle' });
      txt(svgR, 97, y0 + 17, 'Apeks–taban', 'f15-tk', { 'text-anchor': 'middle' });
      txt(svgR, 97, y0 + 32, 'hidrostatik fark', 'f15-tk', { 'text-anchor': 'middle' });
      txt(svgR, 203, y0 + 17, 'MPAP', 'f15-tk', { 'text-anchor': 'middle' });
      txt(svgR, 203, y0 + 32, 'ortalama PAB', 'f15-tk', { 'text-anchor': 'middle' });
      B = { b1, b1h, b1t, b2, b2x, b2o, b2t, Y };
      basGuncelle();
    }
    function basGuncelle() {
      if (!B) return;
      const dik = poz === 'dik';
      B.b1.style.opacity = dik ? 1 : 0; B.b1h.style.opacity = dik ? 0 : 1;
      B.b1t.textContent = dik ? '22 mmHg' : 'yok';
      B.b1t.classList.toggle('sonuk', !dik);
      const e = dik && egz;
      B.b2x.style.opacity = e ? 1 : 0; B.b2o.style.opacity = e ? 1 : 0;
      B.b2t.textContent = e ? 'MPAP ↑ (CO ↑)' : '15 mmHg';
      B.b2t.setAttribute('y', (e ? B.Y(26.5) - 8 : B.Y(15) - 8).toFixed(1));
    }
    function guncelle(anim) {
      const eb = $('[data-egz]');
      eb.setAttribute('aria-pressed', String(poz === 'dik' && egz));
      eb.disabled = poz !== 'dik';
      eb.title = poz === 'dik' ? '' : 'Kitap egzersizin etkisini dik akciğerdeki gradyan üzerinden anlatır';
      dolgu(anim);
      parcaKur();
      basGuncelle();
      const k = poz === 'dik' ? (egz ? 'egz' : 'dik') : poz;
      $('.f15-kan-not').innerHTML = NOT[k];
      $('.f15-kan-cev').hidden = poz !== 'dik';
      cap.yaz(CAPS[k]);
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.poz) {
        if (b.dataset.poz === poz) return;
        poz = b.dataset.poz; if (poz !== 'dik') egz = false;
        basSec(el, 'poz', poz); sahneKur(); guncelle(true);
      } else if (b.hasAttribute('data-egz')) {
        if (poz !== 'dik') return;
        egz = !egz; guncelle(false);
      }
    });
    sahneKur();
    const birak = genislik(el, [560], (d) => { root.classList.toggle('f15-dar', d > 0); basKur(d > 0); });
    guncelle(false);
    const dur = RM ? () => {} : ticker(el, (dt) => parcaCiz(dt));
    return () => { dur(); birak(); };
  };

  /* ================= 2 · Aynı basınç düşüşü, farklı hacim artışı ================= */
  VIZ.f15_alveol = (el) => {
    const cap = capOf(el);
    const V = (D) => 5 + 95 / (1 + Math.exp(-(D - 6.5) / 2));
    const NOK = [{ ad: 'Apeks', d0: 10, k: 'ap' }, { ad: 'Taban', d0: 3, k: 'tb' }];
    const CAPS = {
      frc: "<b>FRC.</b> İntraplevral basınç apekste yaklaşık −10, tabanda −3 cmH₂O'dur. Apikal alveol eğrinin düz üst bölümünde ve neredeyse tümüyle şişmiştir; bazal alveol eğrinin dik bölümünün başındadır. [[K1 s. 68, 86]]",
      insp: '<b>Tidal inspirasyon.</b> İntraplevral basınç her yerde yaklaşık 3 cmH₂O düşer: apekste −13, tabanda −6 cmH₂O. Bazal alveol eğrinin dik bölümünde olduğu için hacmi çok artar; apikal alveol düz üst bölümde olduğundan az artar. Taban daha iyi ventile olur. [[K1 s. 86–87]]',
    };
    let p = RM ? 1 : 0, hedef = p, dongu = false, tc = 0, son = -1, A = null;
    el.innerHTML = `<div class="f15-ctl"><button type="button" class="btn" data-soluk></button>
        <button type="button" class="btn ghost f15-tog" data-dongu aria-pressed="false"${RM ? ' disabled title="Azaltılmış hareket tercihi açık"' : ''}>Sürekli soluk</button></div>
      <div class="f15-al">
        <div class="f15-al-egri"><svg class="f15-svg" viewBox="0 0 400 300" role="img" aria-label="Alveol basınç–hacim eğrisi: yatay eksende intraplevral basınç, dikey eksende alveol hacmi; apikal ve bazal alveolün yeri"></svg></div>
        <div class="f15-al-yan"><svg class="f15-svg f15-al-asvg" role="img" aria-label="Apikal ve bazal alveolün büyütülmüş görünümü; daire alanı alveol hacmiyle orantılı"></svg></div>
      </div>
      <div class="f15-al-dv">
        ${NOK.map((n) => `<div class="f15-al-sat ${n.k}"><span>Hacim artışı · ${n.ad.toLowerCase()}</span><span class="f15-al-trk"><i></i></span><b data-dv="${n.k}"></b></div>`).join('')}
        <div class="f15-al-olc" aria-hidden="true"><span></span><span><em>0</em><em>15</em><em>30 puan</em></span><span></span></div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const root = $('.f15-al'), svgE = $('.f15-al-egri svg'), svgA = $('.f15-al-asvg');
    // eğri
    const X = (D) => 64 + ((D + 5) / 25) * 316, Y = (v) => 250 - (v / 100) * 220;
    [0, 50, 100].forEach((v) => { mk('line', { x1: 64, x2: 380, y1: Y(v), y2: Y(v), class: 'f15-grid' }, svgE); txt(svgE, 58, Y(v) + 4, String(v), 'f15-tk', { 'text-anchor': 'end' }); });
    [-5, 0, 5, 10, 15, 20].forEach((D) => { mk('line', { x1: X(D), x2: X(D), y1: 250, y2: 255, class: 'f15-eksen' }, svgE); txt(svgE, X(D), 270, D === -5 ? '+5' : D === 0 ? '0' : '−' + D, 'f15-tk', { 'text-anchor': 'middle' }); });
    mk('line', { x1: 64, x2: 64, y1: 24, y2: 250, class: 'f15-eksen' }, svgE);
    mk('line', { x1: 64, x2: 382, y1: 250, y2: 250, class: 'f15-eksen' }, svgE);
    txt(svgE, 222, 293, 'İntraplevral basınç (cmH₂O) →', 'f15-tk', { 'text-anchor': 'middle' });
    txt(svgE, 0, 0, "Alveol hacmi (en büyüğün %'si)", 'f15-tk', { transform: 'translate(16 137) rotate(-90)', 'text-anchor': 'middle' });
    const pts = []; for (let D = -5; D <= 20.001; D += 0.25) pts.push([X(D), Y(V(D))]);
    mk('path', { d: yolD(pts), class: 'f15-al-egr' }, svgE);
    txt(svgE, 378, 80, 'düz üst bölüm', 'f15-sm', { 'text-anchor': 'end' });
    txt(svgE, 378, 96, '(düşük kompliyans)', 'f15-sm', { 'text-anchor': 'end' });
    txt(svgE, 200, 112, 'dik bölüm', 'f15-sm', { 'text-anchor': 'end' });
    txt(svgE, 200, 128, '(yüksek kompliyans)', 'f15-sm', { 'text-anchor': 'end' });
    const E = NOK.map((n, i) => {
      const g = mk('g', { class: 'f15-al-n ' + n.k }, svgE);
      const D0 = n.d0, v0 = V(D0);
      const o = {
        gx0: mk('line', { x1: X(D0), x2: X(D0), y1: Y(v0), y2: 250, class: 'f15-al-kl sonuk' }, g),
        gy0: mk('line', { x1: 64, x2: X(D0), y1: Y(v0), y2: Y(v0), class: 'f15-al-kl sonuk' }, g),
        gx: mk('line', { y2: 250, class: 'f15-al-kl' }, g),
        gy: mk('line', { x1: 64, class: 'f15-al-kl' }, g),
        dp: mk('line', { y1: 246 - i * 6, y2: 246 - i * 6, class: 'f15-al-dp' }, g),
        dv: mk('line', { x1: 70 + i * 9, x2: 70 + i * 9, class: 'f15-al-dvb' }, g),
        hay: mk('circle', { cx: X(D0), cy: Y(v0), r: 6, class: 'f15-al-hay' }, g),
        nok: mk('circle', { r: 7, class: 'f15-al-nok' }, g),
        lb: txt(g, 0, 0, n.ad, 'f15-lb f15-al-nlb', { 'text-anchor': i === 0 ? 'end' : 'start' }),
      };
      return o;
    });
    function alvKur(dar) {
      svgA.innerHTML = '';
      const W = dar ? 400 : 220, H = dar ? 172 : 300;
      svgA.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const L = dar ? { cx: 40, hw: 32, ya: 14, yb: 160 } : { cx: 46, hw: 40, ya: 34, yb: 278 };
      const lp = akcPoly((u, s) => [L.cx + s * L.hw, L.yb - u * (L.yb - L.ya)], 0.05);
      mk('path', { d: polyD(lp), class: 'f15-al-akc' }, svgA);
      const C = dar ? [[172, 62], [318, 62]] : [[150, 72], [150, 204]];
      const uc = [[L.cx, L.ya + 10], [L.cx, L.yb - 14]];
      A = NOK.map((n, i) => {
        const [cx, cy] = C[i];
        mk('line', { x1: uc[i][0], y1: uc[i][1], x2: cx - 36, y2: cy, class: 'f15-al-ip' }, svgA);
        mk('circle', { cx: uc[i][0], cy: uc[i][1], r: 3.5, class: 'f15-al-uc ' + n.k }, svgA);
        mk('circle', { cx, cy, r: 34, class: 'f15-al-cer' }, svgA);
        const c = mk('circle', { cx, cy, class: 'f15-al-alv ' + n.k }, svgA);
        txt(svgA, cx, cy + 50, n.ad, 'f15-lb', { 'text-anchor': 'middle' });
        const t = txt(svgA, cx, cy + 66, '', 'f15-tk f15-al-at', { 'text-anchor': 'middle' });
        return { c, t };
      });
      son = -1; ciz();
    }
    function ciz() {
      const f = ease(p);
      if (f === son) return; son = f;
      NOK.forEach((n, i) => {
        const D = n.d0 + 3 * f, v = V(D), v0 = V(n.d0), o = E[i];
        const x = X(D), y = Y(v);
        o.nok.setAttribute('cx', x.toFixed(1)); o.nok.setAttribute('cy', y.toFixed(1));
        o.gx.setAttribute('x1', x.toFixed(1)); o.gx.setAttribute('x2', x.toFixed(1)); o.gx.setAttribute('y1', y.toFixed(1));
        o.gy.setAttribute('x2', x.toFixed(1)); o.gy.setAttribute('y1', y.toFixed(1)); o.gy.setAttribute('y2', y.toFixed(1));
        o.dp.setAttribute('x1', X(n.d0).toFixed(1)); o.dp.setAttribute('x2', x.toFixed(1));
        o.dv.setAttribute('y1', Y(v0).toFixed(1)); o.dv.setAttribute('y2', y.toFixed(1));
        o.lb.setAttribute('x', (i === 0 ? x - 11 : x + 12).toFixed(1)); o.lb.setAttribute('y', (i === 0 ? y - 10 : y + 5).toFixed(1));
        o.gx0.style.opacity = o.gy0.style.opacity = o.hay.style.opacity = o.dp.style.opacity = o.dv.style.opacity = f > 0.02 ? 1 : 0;
        if (A) { A[i].c.setAttribute('r', (34 * Math.sqrt(v / 100)).toFixed(2)); A[i].t.textContent = `${fmt(-D, 0)} cmH₂O · %${Math.round(v)}`; }
        const dv = v - v0;
        el.querySelector(`.f15-al-sat.${n.k} i`).style.width = ((dv / 30) * 100).toFixed(1) + '%';
        el.querySelector(`[data-dv="${n.k}"]`).textContent = '+' + fmt(dv, 1);
      });
    }
    function yaz() {
      const ins = dongu ? tc < 1.5 : hedef === 1;
      $('[data-soluk]').textContent = ins ? '◀ Ekspirasyon' : 'İnspirasyon ▶';
      $('[data-dongu]').setAttribute('aria-pressed', String(dongu));
      $('[data-dongu]').textContent = dongu ? 'Duraklat' : 'Sürekli soluk';
      cap.yaz(dongu || hedef === 1 ? CAPS.insp : CAPS.frc);
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.hasAttribute('data-soluk')) {
        if (dongu) { hedef = tc < 1.5 ? 1 : 0; dongu = false; }
        hedef = hedef === 1 ? 0 : 1;
        if (RM) { p = hedef; ciz(); }
        yaz();
      } else if (b.hasAttribute('data-dongu')) {
        if (RM) return;
        dongu = !dongu;
        if (dongu) tc = p >= 1 ? 1.5 : p * 1.5;
        else hedef = p > 0.5 ? 1 : 0;
        yaz();
      }
    });
    const birak = genislik(el, [560], (d) => { root.classList.toggle('f15-dar', d > 0); alvKur(d > 0); });
    yaz(); ciz();
    const dur = RM ? () => {} : ticker(el, (dt) => {
      if (dongu) {
        const once = tc < 1.5;
        tc = (tc + dt) % 4;
        p = tc < 1.5 ? tc / 1.5 : 1 - (tc - 1.5) / 2.5;
        if (once !== tc < 1.5) yaz();
      } else if (p !== hedef) {
        p = hedef > p ? Math.min(hedef, p + dt / 1.5) : Math.max(hedef, p - dt / 2.5);
      } else return;
      ciz();
    });
    return () => { dur(); birak(); };
  };

  /* ================= 3 · Apeksten tabana: V̇, Q̇ ve V̇/Q̇ ================= */
  VIZ.f15_egim = (el) => {
    const cap = capOf(el);
    const AD = ['Taban', 'Alt', 'Orta-alt', 'Orta-üst', 'Üst', 'Apeks'], W8 = [1.3, 1.25, 1.15, 1, 0.8, 0.5];
    const D = AD.map((ad, i) => ({ ad, q: 0.12 - 0.021 * i, v: 0.072 - 0.0045 * i, w: W8[i] }));
    const sq = D.reduce((a, d) => a + d.w * d.q, 0), sv = D.reduce((a, d) => a + d.w * d.v, 0);
    D.forEach((d) => { d.vq = d.v / d.q; d.pq = (100 * d.w * d.q) / sq; d.pv = (100 * d.w * d.v) / sv; });
    const ORT = sv / sq;
    const CAPS = [
      '<b>Taban · V̇/Q̇ ≈ 0,6.</b> Perfüzyon ventilasyondan fazladır. Alveollerden daha çok O₂ çekilir ve PAO₂ düşer; kanın bir bölümü tam oksijenlenmeden çıkabilir (fonksiyonel şant). Akciğer kanının en büyük payı bu bölgeden geçer. [[K1 s. 69, 64]]',
      "<b>Alt bölge · V̇/Q̇ ≈ 0,7.</b> Perfüzyon hâlâ ventilasyondan fazladır; oran bütün akciğerin ortalamasının (0,8) altında kalır. [[K1 s. 68–69]]",
      '<b>Orta-alt bölge · V̇/Q̇ ≈ 0,8.</b> Oran bütün akciğerin ortalamasına yakındır: yaklaşık 4 L/dk alveoler ventilasyon / 5 L/dk perfüzyon. [[K1 s. 68]]',
      '<b>Orta-üst bölge · V̇/Q̇ ≈ 1.</b> Ventilasyon ve perfüzyon bu düzeye yakın eşitlenir; daha yukarıda ventilasyon perfüzyonu geçer, çünkü perfüzyon yukarı doğru daha hızlı azalır. [[K1 s. 68–69]]',
      '<b>Üst bölge · V̇/Q̇ ≈ 1,5.</b> Ventilasyon perfüzyondan fazladır; PAO₂ yükselir, PACO₂ düşer. [[K1 s. 69]]',
      '<b>Apeks · V̇/Q̇ &gt; 3.</b> Buradan çıkan kan tam oksijenlenmiştir; ama toplam kan akımının yalnızca küçük bir payı (modelde ≈ %2) buradan geçer, gaz değişimi azdır. PAO₂ yüksek, PACO₂ düşüktür. [[K1 s. 69]]',
    ];
    const CAP_BUTUN = '<b>Bütün akciğer.</b> Alveoler ventilasyon yaklaşık 4 L/dk, perfüzyon (kalp debisi) yaklaşık 5 L/dk: ortalama V̇/Q̇ 0,8. Bölgesel değerler tabanda 0,6\'dan apekste 3\'ün üzerine kadar değişir. [[K1 s. 68–69]]';
    const sinif = (vq) => (vq < 0.75 ? 'warn' : vq <= 1.2 ? 'ok' : 'clin');
    const ROZ = { warn: 'PAO₂ düşük', ok: 'ortalamaya yakın', clin: 'PAO₂ yüksek · PACO₂ düşük' };
    let sec = -1, g = RM ? 1 : 0, S = null, L = null;
    el.innerHTML = `<div class="f15-eg"><div class="f15-eg-sahne"></div>
        <div class="f15-lej" aria-hidden="true"><span style="--k:var(--c-clin)"><i></i>V̇ (ventilasyon)</span><span style="--k:var(--crit)"><i></i>Q̇ (perfüzyon)</span><span class="nokta" style="--k:var(--accent)"><i></i>V̇/Q̇</span></div>
        <div class="f15-eg-det">
          <svg class="f15-eg-ikon" viewBox="0 0 130 96" role="img" aria-label="Seçili bölgenin alveolü: ok kalınlığı ventilasyonu, kapiller kalınlığı perfüzyonu gösterir">
            <line class="f15-eg-ik-v" x1="65" y1="2" x2="65" y2="20"/><path class="f15-eg-ik-vb"/>
            <circle class="f15-eg-ik-a" cx="65" cy="44" r="20"/>
            <line class="f15-eg-ik-q" x1="8" y1="80" x2="122" y2="80"/>
            <text class="f15-tk" x="78" y="14">V̇</text><text class="f15-tk" x="8" y="70">Q̇</text>
          </svg>
          <div class="f15-eg-dg"><div class="f15-eg-dbas"><b data-o="ad"></b><span class="tag" data-o="roz"></span></div>
            <dl class="f15-oku" data-o="dl"></dl>
            <p class="f15-eg-ipucu">Bir dilime ya da satıra dokunun.</p></div>
          <button type="button" class="btn ghost f15-tog" data-butun aria-pressed="false">Bütün akciğer</button>
        </div></div>`;
    const $ = (s) => el.querySelector(s);
    const sahne = $('.f15-eg-sahne');
    const LAY = {
      genis: { W: 640, H: 380, sil: { x0: 20, x1: 160, y0: 56, y1: 326 }, bar: { x0: 206, x1: 432, y0: 56, y1: 326 }, vq: { x0: 466, x1: 628, y0: 56, y1: 326 } },
      dar: { W: 360, H: 640, sil: { x0: 12, x1: 128, y0: 50, y1: 280 }, vq: { x0: 168, x1: 346, y0: 50, y1: 280 }, bar: { x0: 100, x1: 346, y0: 360, y1: 590, ad: true } },
    };
    const yc = (c, i) => c.y1 - (i + 0.5) * ((c.y1 - c.y0) / 6);
    const yb = (c, i) => [c.y1 - (i + 1) * ((c.y1 - c.y0) / 6), c.y1 - i * ((c.y1 - c.y0) / 6)];
    function kur(dar) {
      L = LAY[dar ? 'dar' : 'genis'];
      sahne.innerHTML = '';
      const svg = mk('svg', { viewBox: `0 0 ${L.W} ${L.H}`, class: 'f15-svg', role: 'group', 'aria-label': 'Altı akciğer dilimi: soldan sağa akciğer silueti, dilim başına ventilasyon ve perfüzyon çubukları, V̇/Q̇ oranı' }, sahne);
      const { sil, bar, vq } = L;
      const sx = (v) => bar.x0 + (v / 0.13) * (bar.x1 - bar.x0), svx = (v) => vq.x0 + (v / 3.5) * (vq.x1 - vq.x0);
      S = { sx, svx, vurgu: [], dil: [], bV: [], bQ: [], nok: [], nt: [] };
      // seçim vurgusu (satır şeritleri)
      const gV = mk('g', null, svg);
      D.forEach((d, i) => {
        const r = [];
        [bar, vq].forEach((c) => { const [a, b] = yb(c, i); r.push(mk('rect', { x: c.x0 - 6, y: a + 1, width: c.x1 - c.x0 + 12, height: b - a - 2, rx: 6, class: 'f15-eg-vur' }, gV)); });
        S.vurgu.push(r);
      });
      // siluet
      const scx = (sil.x0 + sil.x1) / 2, shw = (sil.x1 - sil.x0) / 2, sh = sil.y1 - sil.y0;
      const lp = akcPoly((u, s) => [scx + s * shw, sil.y1 - u * sh]);
      mk('path', { d: polyD(lp), class: 'f15-eg-akc' }, svg);
      D.forEach((d, i) => {
        const ua = i / 6, ub = (i + 1) / 6, pts = [];
        for (let t = 0; t <= 8; t++) { const u = lerp(ua, ub, t / 8); pts.push([scx - shw * hwf(u), sil.y1 - u * sh]); }
        for (let t = 8; t >= 0; t--) { const u = lerp(ua, ub, t / 8); pts.push([scx + shw * hwf(u), sil.y1 - u * sh]); }
        S.dil.push(mk('path', { d: polyD(pts), class: 'f15-eg-dil ' + sinif(d.vq) }, svg));
      });
      txt(svg, scx, sil.y0 - 10, 'Apeks', 'f15-lb', { 'text-anchor': 'middle' });
      txt(svg, scx, sil.y1 + 20, 'Taban', 'f15-lb', { 'text-anchor': 'middle' });
      // V̇ ve Q̇ çubukları
      txt(svg, bar.x0, bar.y0 - (dar ? 20 : 26), 'V̇ ve Q̇', 'f15-lb f15-mono');
      [0, 0.05, 0.1].forEach((v) => { mk('line', { x1: sx(v), x2: sx(v), y1: bar.y0 - 4, y2: bar.y1, class: 'f15-grid' }, svg); txt(svg, sx(v), bar.y1 + 17, fmt(v, v ? 2 : 0), 'f15-tk', { 'text-anchor': 'middle' }); });
      txt(svg, (bar.x0 + bar.x1) / 2, bar.y1 + 35, 'L/dk / % akciğer hacmi', 'f15-tk', { 'text-anchor': 'middle' });
      mk('line', { x1: bar.x0, x2: bar.x0, y1: bar.y0 - 4, y2: bar.y1, class: 'f15-eksen' }, svg);
      const bh = Math.min(9, ((bar.y1 - bar.y0) / 6 - 12) / 2);
      D.forEach((d, i) => {
        const c = yc(bar, i);
        S.bV.push(mk('rect', { x: bar.x0, y: c - bh - 1, height: bh, rx: 2, class: 'f15-eg-bv' }, svg));
        S.bQ.push(mk('rect', { x: bar.x0, y: c + 1, height: bh, rx: 2, class: 'f15-eg-bq' }, svg));
        if (bar.ad) txt(svg, 4, c + 5, d.ad, 'f15-tk f15-eg-ad');
      });
      S.lV = mk('path', { class: 'f15-eg-lv' }, svg); S.lQ = mk('path', { class: 'f15-eg-lq' }, svg);
      S.esit = txt(svg, sx(0.0585) + 10, yc(bar, 3) + 5, 'V̇ = Q̇ (V̇/Q̇ ≈ 1)', 'f15-tk f15-eg-esit');
      S.bh = bh;
      // V̇/Q̇
      txt(svg, vq.x0, vq.y0 - (dar ? 20 : 26), 'V̇/Q̇', 'f15-lb f15-mono');
      [0, 1, 2, 3].forEach((v) => { mk('line', { x1: svx(v), x2: svx(v), y1: vq.y0 - 4, y2: vq.y1, class: 'f15-grid' }, svg); txt(svg, svx(v), vq.y1 + 17, String(v), 'f15-tk', { 'text-anchor': 'middle' }); });
      mk('line', { x1: vq.x0, x2: vq.x0, y1: vq.y0 - 4, y2: vq.y1, class: 'f15-eksen' }, svg);
      mk('line', { x1: svx(1), x2: svx(1), y1: vq.y0 - 4, y2: vq.y1, class: 'f15-eg-r1' }, svg);
      mk('line', { x1: svx(0.8), x2: svx(0.8), y1: vq.y0 - 4, y2: vq.y1, class: 'f15-eg-r8' }, svg);
      txt(svg, svx(1) + 4, vq.y0 - 7, '1', 'f15-tk');
      txt(svg, svx(0.8) - 4, vq.y0 - 7, 'ort. 0,8', 'f15-tk', { 'text-anchor': 'end' });
      S.lVQ = mk('path', { class: 'f15-eg-lvq', d: yolD(D.map((d, i) => [svx(d.vq), yc(vq, i)])) }, svg);
      D.forEach((d, i) => {
        const x = svx(d.vq), y = yc(vq, i), sag = d.vq > 2.6;
        S.nok.push(mk('circle', { cx: x, cy: y, r: 5.5, class: 'f15-eg-nk' }, svg));
        S.nt.push(txt(svg, sag ? x - 10 : x + 10, y + 4.5, fmt(d.vq, 2), 'f15-tk f15-eg-nt f15-hale', { 'text-anchor': sag ? 'end' : 'start' }));
      });
      // tıklama alanları
      D.forEach((d, i) => {
        const alan = dar ? [[0, L.W, ...yb(sil, i)], [0, L.W, ...yb(bar, i)]] : [[0, L.W, ...yb(sil, i)]];
        alan.forEach(([x0, x1, a, b], j) => {
          const r = mk('rect', { x: x0, y: a, width: x1 - x0, height: b - a, class: 'f15-eg-hit', 'data-i': i }, svg);
          if (j === 0) { r.setAttribute('role', 'button'); r.setAttribute('tabindex', '0'); r.setAttribute('aria-label', `${d.ad} dilimi · V̇/Q̇ ${fmt(d.vq, 2)}`); }
          else r.setAttribute('aria-hidden', 'true');
        });
      });
      ciz(); sec >= -1 && secim(sec, false);
    }
    function ciz() {
      if (!S) return;
      const { sx, svx } = S, k = ease(g);
      D.forEach((d, i) => {
        S.bV[i].setAttribute('width', Math.max(0, sx(d.v * k) - L.bar.x0).toFixed(1));
        S.bQ[i].setAttribute('width', Math.max(0, sx(d.q * k) - L.bar.x0).toFixed(1));
        S.nok[i].style.opacity = S.nt[i].style.opacity = clamp(g * 1.4 - 0.4, 0, 1);
      });
      S.lV.setAttribute('d', yolD(D.map((d, i) => [sx(d.v * k), yc(L.bar, i) - S.bh / 2 - 1])));
      S.lQ.setAttribute('d', yolD(D.map((d, i) => [sx(d.q * k), yc(L.bar, i) + S.bh / 2 + 1])));
      S.lV.style.opacity = S.lQ.style.opacity = S.lVQ.style.opacity = S.esit.style.opacity = clamp(g * 2 - 1, 0, 1);
    }
    function secim(i, yazCap = true) {
      sec = i;
      if (!S) return;
      S.vurgu.forEach((r, j) => r.forEach((x) => x.classList.toggle('on', j === i)));
      S.dil.forEach((p, j) => p.classList.toggle('on', j === i));
      sahne.querySelectorAll('.f15-eg-hit[role]').forEach((r) => r.setAttribute('aria-pressed', String(+r.dataset.i === i)));
      $('[data-butun]').setAttribute('aria-pressed', String(i === -1 && g >= 1));
      const roz = $('[data-o="roz"]'), dl = $('[data-o="dl"]');
      let vV, vQ;
      if (i >= 0) {
        const d = D[i], s = sinif(d.vq);
        $('[data-o="ad"]').textContent = d.ad;
        roz.className = 'tag ' + s; roz.textContent = ROZ[s]; roz.hidden = false;
        dl.innerHTML = `<div><dt>V̇/Q̇</dt><dd>${fmt(d.vq, 2)}</dd></div><div><dt>Toplam kan akımındaki payı</dt><dd>%${fmt(d.pq, 1)}</dd></div><div><dt>Toplam ventilasyondaki payı</dt><dd>%${fmt(d.pv, 1)}</dd></div>`;
        vV = d.v * 120; vQ = d.q * 120;
        if (yazCap) cap.yaz(CAPS[i]);
      } else {
        $('[data-o="ad"]').textContent = 'Bütün akciğer';
        roz.hidden = true;
        dl.innerHTML = `<div><dt>V̇A</dt><dd>≈ 4 L/dk</dd></div><div><dt>Q̇ (kalp debisi)</dt><dd>≈ 5 L/dk</dd></div><div><dt>V̇/Q̇</dt><dd>0,8 (model ${fmt(ORT, 2)})</dd></div>`;
        vV = 4 * 2.6; vQ = 5 * 2.6;
        if (yazCap && g >= 1) cap.yaz(CAP_BUTUN);
      }
      const ik = $('.f15-eg-ikon');
      ik.querySelector('.f15-eg-ik-v').style.strokeWidth = vV.toFixed(2);
      ik.querySelector('.f15-eg-ik-vb').setAttribute('d', okBasi(65, 23, 'a', Math.max(5, vV * 0.9), 7));
      ik.querySelector('.f15-eg-ik-q').style.strokeWidth = Math.max(1.2, vQ).toFixed(2);
    }
    const sec2 = (t) => { const r = t.closest('.f15-eg-hit'); if (r && g >= 1) secim(+r.dataset.i); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-butun]')) { if (g >= 1) secim(-1); return; }
      sec2(e.target);
    });
    el.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.f15-eg-hit')) { e.preventDefault(); sec2(e.target); } });
    const birak = genislik(el, [560], (d) => { el.querySelector('.f15-eg').classList.toggle('f15-dar', d > 0); kur(d > 0); });
    let animT = 0, dur = () => {}, gozle = () => {};
    if (RM) { g = 1; ciz(); secim(0); }
    else {
      secim(0, false);
      gozle = gorununce(el, () => {
        const t0 = performance.now();
        const adim = (t) => { g = clamp((t - t0) / 600, 0, 1); ciz(); if (g < 1) animT = requestAnimationFrame(adim); else secim(0); };
        animT = requestAnimationFrame(adim);
      });
    }
    return () => { cancelAnimationFrame(animT); gozle(); dur(); birak(); };
  };

  /* ================= 4 · Düşük V̇/Q̇ mı, şant mı? Oksijene yanıt ================= */
  VIZ.f15_o2 = (el) => {
    const cap = capOf(el), id = uid();
    const DUR = [0, 0.05, 0.1, 0.3, 0.6, 0.8, 3.3, Infinity];
    const DAD = [['0', 'şant'], ['0,05', ''], ['0,1', ''], ['0,3', ''], ['0,6', 'taban'], ['0,8', 'ortalama'], ['3,3', 'apeks'], ['∞', 'ölü boşluk']];
    const CAPS = [
      '<b>Şant (V̇/Q̇ = 0).</b> B bölgesi perfüze olur ama hiç ventile olmaz; kan bölgeyi miks venöz kan olarak terk eder. Ek O₂ bu kana ulaşamaz. PaO₂ ancak biraz yükselir: geri kalan akciğerden gelen kan zaten neredeyse tam satüredir, ona yalnızca az miktarda çözünmüş O₂ eklenebilir. [[K1 s. 65]]',
      "<b>Çok düşük V̇/Q̇.</b> Ventilasyon çok azdır; FiO₂ artışı bölgenin PAO₂'sini ancak yüksek FiO₂'de yükseltebilir. V̇/Q̇ sıfıra yaklaştıkça uyumsuzluk şant gibi davranır. [[K1 s. 65]]",
      "<b>Düşük V̇/Q̇.</b> Bölgede PAO₂ düşüktür ve kan tam oksijenlenmeden çıkar. FiO₂ yükseldikçe bu bölgenin PAO₂'si ve alveol–kapiller O₂ gradyanı artar; kapiller sonu kan satüre olur ve PaO₂ belirgin yükselir. [[K1 s. 69–70]]",
      null,
      '<b>Taban benzeri (≈ 0,6).</b> Dik akciğerin tabanındaki orana yakındır: PAO₂ biraz düşüktür ama kan yine neredeyse tam satüredir. [[K1 s. 69]]',
      '<b>Ortalama (0,8).</b> B bölgesi akciğerin geri kalanıyla aynıdır: uyumsuzluk yoktur. [[K1 s. 68]]',
      "<b>Yüksek V̇/Q̇.</b> Bölgeden çıkan kan tam oksijenlenmiştir ve PaO₂ düşmez. Ama ventilasyonun bir bölümü boşa gider (alveoler ölü boşluk) ve solunum işi artar. [[K1 s. 65, 69]]",
      "<b>Ölü boşluk (V̇/Q̇ → ∞).</b> Bölge ventile olur ama hiç perfüze olmaz: alveoler gaz solunan gaza yaklaşır, kanın tamamı akciğerin geri kalanından geçer ve PaO₂ normal kalır. Pulmoner embolinin distalindeki durum budur. [[K1 s. 65, 70]]",
    ];
    CAPS[3] = CAPS[2];
    let di = 2, fio2 = 0.21, pay = 0.3, santAc = true, E = null, G = null, dar = null;
    el.innerHTML = `<div class="f15-o2">
        <div class="f15-o2-ctl">
          <label class="f15-rng f15-o2-vq"><span>B bölgesinin V̇/Q̇ oranı <b data-o="vq"></b></span>
            <input type="range" min="0" max="7" step="1" value="2" data-r="vq" aria-label="B bölgesinin V̇/Q̇ oranı">
            <span class="f15-o2-dur" aria-hidden="true">${DAD.map(([a, b], i) => `<em data-i="${i}" style="--i:${i}">${a}${b ? `<small>${b}</small>` : ''}</em>`).join('')}</span></label>
          <label class="f15-rng"><span>FiO₂ <b data-o="fio2"></b></span>
            <input type="range" min="0.21" max="1" step="0.01" value="0.21" data-r="fio2" aria-label="FiO₂"></label>
          <div class="f15-o2-hz" role="group" aria-label="Hızlı FiO₂ seçimi">${[0.21, 0.4, 0.6, 1].map((f) => `<button type="button" class="btn ghost" data-f="${f}" aria-pressed="false">${fmt(f, 2)}</button>`).join('')}</div>
          <label class="f15-rng"><span>B bölgesinin kan akımı payı <b data-o="pay"></b></span>
            <input type="range" min="10" max="50" step="5" value="30" data-r="pay" aria-label="B bölgesinin kan akımı payı"><small class="f15-o2-pn" data-o="pn"></small></label>
          <button type="button" class="btn ghost f15-tog" data-sant aria-pressed="true">Şantla karşılaştır</button>
        </div>
        <div class="f15-o2-sema"></div>
        <div class="f15-o2-tb"><div class="tbl-wrap"><table class="tbl f15-o2-tbl"><thead><tr><th></th><th>B bölgesi</th><th>Geri kalan</th><th>Arteriyel</th></tr></thead>
          <tbody><tr><th>PO₂ (kPa)</th><td class="num" data-t="bp"></td><td class="num" data-t="np"></td><td class="num" data-t="ap"></td></tr>
          <tr><th>SO₂ (%)</th><td class="num" data-t="bs"></td><td class="num" data-t="ns"></td><td class="num" data-t="as"></td></tr>
          <tr><th>O₂ içeriği (mL/dL)</th><td class="num" data-t="bc"></td><td class="num" data-t="nc"></td><td class="num" data-t="ac"></td></tr></tbody></table></div></div>
        <div class="f15-o2-graf"><div class="f15-o2-gsv"></div>
          <div class="f15-lej" aria-hidden="true"><span style="--k:var(--accent)"><i></i>seçili B bölgesi</span><span class="kesik f15-o2-sl" style="--k:var(--c-basic)"><i></i>şant (aynı pay)</span><span class="noktali" style="--k:var(--muted)"><i></i>8 kPa</span></div></div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const root = $('.f15-o2');
    const hesap = (vq, f, py) => {
      const N = birim(0.8, f);
      if (!isFinite(vq)) return { B: birim(vq, f), N, a: N.c, pa: ters(N.c) };
      const B = birim(vq, f), a = (1 - py) * N.c + py * B.c;
      return { B, N, a, pa: ters(a) };
    };
    function semaKur() {
      const kutu = $('.f15-o2-sema'); kutu.innerHTML = '';
      const W = dar ? 360 : 640, H = dar ? 424 : 262;
      const svg = mk('svg', { viewBox: `0 0 ${W} ${H}`, class: 'f15-svg', role: 'img', 'aria-label': 'İki alveol–kapiller birimi: B bölgesi ve akciğerin geri kalanı; kapillerlerden çıkan kan arteriyel kanda karışır' }, kutu);
      const defs = mk('defs', null, svg);
      const gr = (k, x1, x2, y) => { const g = mk('linearGradient', { id: `f15-o2-${k}-${id}`, gradientUnits: 'userSpaceOnUse', x1, x2, y1: y, y2: y }, defs); const a = mk('stop', { offset: 0 }, g), b = mk('stop', { offset: 1 }, g); a.style.stopColor = 'var(--c-basic)'; return b; };
      // yerleşim
      const Lg = dar
        ? { B: { ax: 128, ay: 82, r: 42, top: 0, ky: 150, giris: [[18, 150]], k0: 18, k1: 222, g0: 86, g1: 170, cikis: [[222, 150], [294, 150], [294, 196]], so2: [176, 172], b: [186, 30, 'start'] },
          N: { ax: 128, ay: 262, r: 42, top: 176, ky: 330, giris: [[18, 330]], k0: 18, k1: 222, g0: 86, g1: 170, cikis: [[222, 330], [294, 330], [294, 286]], so2: [176, 352], b: [40, 378, 'start'] },
          ven: [[18, 400], [18, 150]], venL: [10, 418], kutu: [236, 196, 116, 90] }
        : { B: { ax: 150, ay: 92, r: 46, top: 0, ky: 170, giris: [[40, 236], [40, 170]], k0: 40, k1: 232, g0: 104, g1: 196, cikis: [[232, 170], [262, 170]], so2: [196, 194], b: [10, 22, 'start'] },
          N: { ax: 490, ay: 92, r: 46, top: 0, ky: 170, giris: [[600, 236], [600, 170]], k0: 600, k1: 408, g0: 536, g1: 444, cikis: [[408, 170], [378, 170]], so2: [444, 194], b: [630, 22, 'end'] },
          ven: [[12, 236], [600, 236]], venL: [12, 254], kutu: [262, 124, 116, 92] };
      E = {};
      mk('path', { d: yolD(Lg.ven), class: 'f15-o2-ven' }, svg);
      txt(svg, Lg.venL[0], Lg.venL[1], 'Miks venöz kan · PvO₂ 5,3 kPa', 'f15-tk');
      ['B', 'N'].forEach((k) => {
        const o = Lg[k], e = {};
        e.giris = mk('path', { d: yolD([...o.giris, [o.k0, o.ky]]), class: 'f15-o2-kap ven' }, svg);
        e.stop = gr(k, o.g0, o.g1, o.ky);
        e.kap = mk('path', { d: yolD([[o.k0, o.ky], [o.k1, o.ky]]), class: 'f15-o2-kap', style: `stroke:url(#f15-o2-${k}-${id})` }, svg);
        e.cikis = mk('path', { d: yolD(o.cikis), class: 'f15-o2-kap' }, svg);
        e.okY = mk('path', { class: 'f15-o2-oky', d: okBasi((o.k0 + o.k1) / 2 + (o.k1 > o.k0 ? 6 : -6), o.ky, o.k1 > o.k0 ? 's' : 'l', 4, 6) }, svg);
        e.hava = mk('line', { x1: o.ax, x2: o.ax, y1: o.top, y2: o.ay - o.r - 10, class: 'f15-o2-hava' }, svg);
        e.havaB = mk('path', { class: 'f15-o2-havab' }, svg);
        e.alv = mk('circle', { cx: o.ax, cy: o.ay, r: o.r, class: 'f15-o2-alv' }, svg);
        e.t1 = txt(svg, o.ax, o.ay - 4, 'PAO₂', 'f15-tk', { 'text-anchor': 'middle' });
        e.t2 = txt(svg, o.ax, o.ay + 15, '', 'f15-lb f15-mono', { 'text-anchor': 'middle' });
        e.so2 = txt(svg, o.so2[0], o.so2[1], '', 'f15-tk f15-o2-so2', { 'text-anchor': 'middle' });
        const [bx, by, ba] = o.b;
        if (k === 'B') {
          txt(svg, bx, by, 'B bölgesi', 'f15-lb', { 'text-anchor': ba });
          e.bvq = txt(svg, bx, by + 18, '', 'f15-tk f15-o2-bvq', { 'text-anchor': ba });
        } else if (dar) {
          const t = txt(svg, bx, by, 'Akciğerin geri kalanı · ', 'f15-lb', { 'text-anchor': ba });
          mk('tspan', { class: 'f15-o2-bvq f15-mono' }, t).textContent = 'V̇/Q̇ 0,8';
        } else {
          txt(svg, bx, by, 'Akciğerin', 'f15-lb', { 'text-anchor': ba });
          txt(svg, bx, by + 17, 'geri kalanı', 'f15-lb', { 'text-anchor': ba });
          txt(svg, bx, by + 35, 'V̇/Q̇ 0,8', 'f15-tk f15-o2-bvq', { 'text-anchor': ba });
        }
        e.o = o;
        E[k] = e;
      });
      const [kx, ky, kw, kh] = Lg.kutu;
      E.kutu = mk('rect', { x: kx, y: ky, width: kw, height: kh, rx: 10, class: 'f15-o2-kutu' }, svg);
      txt(svg, kx + kw / 2, ky + 18, 'Arteriyel kan', 'f15-lb', { 'text-anchor': 'middle' });
      E.ka = txt(svg, kx + kw / 2, ky + 40, '', 'f15-lb f15-mono f15-o2-pa', { 'text-anchor': 'middle' });
      E.ks = txt(svg, kx + kw / 2, ky + 58, '', 'f15-tk', { 'text-anchor': 'middle' });
      E.kc = txt(svg, kx + kw / 2, ky + 75, '', 'f15-tk', { 'text-anchor': 'middle' });
    }
    function grafKur() {
      const kutu = $('.f15-o2-gsv'); kutu.innerHTML = '';
      const W = dar ? 360 : 640, H = dar ? 226 : 204;
      const P = dar ? { x0: 46, x1: 348, y0: 26, y1: 176 } : { x0: 56, x1: 624, y0: 24, y1: 162 };
      const svg = mk('svg', { viewBox: `0 0 ${W} ${H}`, class: 'f15-svg', role: 'img', 'aria-label': "FiO₂'ye yanıt: yatay eksende FiO₂, dikey eksende arteriyel PO₂; seçili B bölgesi ve şant eğrileri" }, kutu);
      const X = (f) => P.x0 + ((f - 0.21) / 0.79) * (P.x1 - P.x0), Y = (pa) => P.y1 - (clamp(pa, 0, 100) / 100) * (P.y1 - P.y0);
      [0, 25, 50, 75, 100].forEach((v) => { mk('line', { x1: P.x0, x2: P.x1, y1: Y(v), y2: Y(v), class: 'f15-grid' }, svg); txt(svg, P.x0 - 6, Y(v) + 4, String(v), 'f15-tk', { 'text-anchor': 'end' }); });
      [0.21, 0.4, 0.6, 0.8, 1].forEach((f) => { mk('line', { x1: X(f), x2: X(f), y1: P.y1, y2: P.y1 + 5, class: 'f15-eksen' }, svg); txt(svg, X(f), P.y1 + 19, fmt(f, 2), 'f15-tk', { 'text-anchor': 'middle' }); });
      mk('line', { x1: P.x0, x2: P.x0, y1: P.y0 - 6, y2: P.y1, class: 'f15-eksen' }, svg);
      mk('line', { x1: P.x0, x2: P.x1, y1: P.y1, y2: P.y1, class: 'f15-eksen' }, svg);
      txt(svg, P.x0, P.y0 - 12, 'PaO₂ (kPa)', 'f15-tk');
      txt(svg, P.x1, P.y1 + 38, 'FiO₂', 'f15-tk', { 'text-anchor': 'end' });
      mk('line', { x1: P.x0, x2: P.x1, y1: Y(8), y2: Y(8), class: 'f15-o2-e8' }, svg);
      G = { X, Y, P, sant: mk('path', { class: 'f15-o2-gs' }, svg), santT: txt(svg, P.x1 - 2, 0, 'şant', 'f15-tk f15-o2-gst', { 'text-anchor': 'end' }), egr: mk('path', { class: 'f15-o2-ge' }, svg), dik: mk('line', { y1: P.y0, y2: P.y1, class: 'f15-o2-gd' }, svg), nok: mk('circle', { r: 6, class: 'f15-o2-gn' }, svg), nt: txt(svg, 0, 0, '', 'f15-lb f15-mono f15-o2-gnt') };
    }
    function guncelle() {
      const vq = DUR[di], inf = !isFinite(vq), R = hesap(vq, fio2, pay);
      // denetimler
      $('[data-o="vq"]').textContent = DAD[di][0] + (DAD[di][1] ? ' · ' + DAD[di][1] : '');
      const rv = $('[data-r="vq"]'); rv.setAttribute('aria-valuetext', DAD[di][0] + (DAD[di][1] ? ', ' + DAD[di][1] : ''));
      el.querySelectorAll('.f15-o2-dur em').forEach((e) => e.classList.toggle('on', +e.dataset.i === di));
      $('[data-o="fio2"]').textContent = fmt(fio2, 2);
      el.querySelectorAll('[data-f]').forEach((b) => b.setAttribute('aria-pressed', String(Math.abs(+b.dataset.f - fio2) < 0.005)));
      $('[data-o="pay"]').textContent = '%' + Math.round(pay * 100);
      $('[data-r="pay"]').disabled = inf;
      $('[data-o="pn"]').textContent = inf ? 'B kan almıyor: kanın tamamı geri kalan akciğerden geçer' : '';
      $('[data-sant]').setAttribute('aria-pressed', String(santAc));
      // şema
      if (E) {
        const vB = inf ? 0.8 * pay * 5 : vq * pay * 5, vN = 0.8 * (1 - pay) * 5;
        const qB = inf ? 0 : pay, qN = inf ? 1 : 1 - pay;
        const sB = SAT(R.B.p), sN = SAT(R.N.p), sA = SAT(R.pa);
        [['B', vB, qB, sB, R.B], ['N', vN, qN, sN, R.N]].forEach(([k, v, q, s, b]) => {
          const e = E[k], o = e.o, sw = v > 0 ? Math.max(1.4, v * 1.7) : 0;
          e.hava.style.strokeWidth = sw.toFixed(2); e.hava.style.opacity = v > 0 ? 1 : 0;
          e.havaB.setAttribute('d', okBasi(o.ax, o.ay - o.r - 2, 'a', Math.max(5, sw * 0.9), 9)); e.havaB.style.opacity = v > 0 ? 1 : 0;
          const kw = q > 0 ? Math.max(2.5, q * 16) : 3;
          [e.giris, e.kap, e.cikis].forEach((p) => { p.style.strokeWidth = kw.toFixed(2); p.classList.toggle('yok', q === 0); });
          const renk = satRenk(s);
          e.stop.style.stopColor = renk; e.cikis.style.stroke = renk;
          e.alv.classList.toggle('kapali', k === 'B' && vq === 0);
          if (k === 'B' && vq === 0) { e.t1.textContent = 'ventilasyon'; e.t2.textContent = 'yok'; }
          else if (k === 'B' && inf) { e.t1.textContent = dar ? 'PAO₂=PIO₂' : 'PAO₂ = PIO₂'; e.t2.textContent = fmt(b.p, 1) + ' kPa'; }
          else { e.t1.textContent = 'PAO₂'; e.t2.textContent = fmt(b.p, 1) + ' kPa'; }
          e.so2.textContent = q === 0 ? 'kan yok' : 'SO₂ %' + fmt(s * 100, 1);
          if (e.bvq) e.bvq.textContent = 'V̇/Q̇ ' + (inf ? '∞' : DAD[di][0]);
        });
        E.kutu.style.stroke = satRenk(sA);
        E.ka.textContent = 'PaO₂ ' + fmt(R.pa, 1) + ' kPa';
        E.ks.textContent = 'SaO₂ %' + fmt(sA * 100, 1);
        E.kc.textContent = 'CaO₂ ' + fmt(R.a, 2);
      }
      // tablo
      const t = (k, v) => { $(`[data-t="${k}"]`).textContent = v; };
      if (inf) { t('bp', 'PAO₂ ' + fmt(R.B.p, 1)); t('bs', 'kan yok'); t('bc', 'kan yok'); }
      else { t('bp', fmt(R.B.p, 1)); t('bs', fmt(SAT(R.B.p) * 100, 1)); t('bc', fmt(R.B.c, 2)); }
      t('np', fmt(R.N.p, 1)); t('ns', fmt(SAT(R.N.p) * 100, 1)); t('nc', fmt(R.N.c, 2));
      t('ap', fmt(R.pa, 1)); t('as', fmt(SAT(R.pa) * 100, 1)); t('ac', fmt(R.a, 2));
      // grafik
      if (G) {
        const egri = [], sant = [];
        for (let i = 0; i <= 40; i++) { const f = 0.21 + (0.79 * i) / 40; egri.push([G.X(f), G.Y(hesap(vq, f, pay).pa)]); sant.push([G.X(f), G.Y(hesap(0, f, pay).pa)]); }
        G.egr.setAttribute('d', yolD(egri));
        G.sant.setAttribute('d', yolD(sant)); G.sant.style.opacity = G.santT.style.opacity = santAc ? 1 : 0;
        G.santT.setAttribute('y', (sant[40][1] - egri[40][1] > 22 ? sant[40][1] - 7 : Math.min(sant[40][1] + 16, G.P.y1 - 4)).toFixed(1));
        $('.f15-o2-sl').style.opacity = santAc ? 1 : 0.35;
        const x = G.X(fio2), y = G.Y(R.pa);
        G.dik.setAttribute('x1', x.toFixed(1)); G.dik.setAttribute('x2', x.toFixed(1));
        G.nok.setAttribute('cx', x.toFixed(1)); G.nok.setAttribute('cy', y.toFixed(1));
        const sol = x > G.P.x1 - 100;
        G.nt.textContent = fmt(R.pa, 1) + ' kPa';
        G.nt.setAttribute('x', (sol ? x - 10 : x + 10).toFixed(1)); G.nt.setAttribute('text-anchor', sol ? 'end' : 'start');
        G.nt.setAttribute('y', (y < G.P.y0 + 18 ? y + 18 : y - 9).toFixed(1));
      }
      // açıklama
      let c = CAPS[di];
      if (Math.abs(fio2 - 0.21) > 0.005) c += ` FiO₂ 0,21'de PaO₂ ${fmt(hesap(vq, 0.21, pay).pa, 1)} kPa; FiO₂ ${fmt(fio2, 2)} ile ${fmt(R.pa, 1)} kPa.`;
      cap.yaz(c);
    }
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'vq') di = +r.value;
      else if (r.dataset.r === 'fio2') fio2 = +r.value;
      else pay = +r.value / 100;
      guncelle();
    });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.f) { fio2 = +b.dataset.f; $('[data-r="fio2"]').value = fio2; guncelle(); }
      else if (b.hasAttribute('data-sant')) { santAc = !santAc; guncelle(); }
    });
    const birak = genislik(el, [640, 980], (d) => {
      root.classList.toggle('f15-dar', d === 2); root.classList.toggle('f15-genis', d === 0);
      const yeni = d === 2;
      if (yeni !== dar) { dar = yeni; semaKur(); grafKur(); }
      guncelle();
    });
    return () => { birak(); };
  };

  /* ================= 5 · PE'de hipoksemi: adım adım ================= */
  VIZ.f15_pe = (el) => {
    const cap = capOf(el), id = uid();
    const CX = [100, 220, 340];
    const ADIM = [
      { ad: 'Başlangıç', g: [['=', 'normal', 'ok'], ['=', 'normal', 'ok'], ['=', 'normal', 'ok']], cap: '<b>Başlangıç.</b> Üç akciğer bölgesinde ventilasyon ve perfüzyon uyumludur; PaO₂, PaCO₂ ve V̇E normaldir. Bir sonraki adımda emboli bir pulmoner arter dalını tıkayacak. [[K1 s. 70]]' },
      { ad: 'Emboli', g: [['=', 'normal', 'ok'], ['=', 'normal', 'ok'], ['=', 'normal', 'ok']], cap: '<b>Emboli.</b> Bir pıhtı (ya da gaz, yağ, amniyotik sıvı) pulmoner arterin bir dalını tıkar. Distaldeki B bölgesinde ventilasyon sürer, perfüzyon durur: V̇/Q̇ çok yükselir ve alveoler ölü boşluk artar; bu alveollerde PAO₂ yükselir, PACO₂ düşer. [[K1 s. 70]]' },
      { ad: 'Beklenen tablo', g: [['=', 'normal', 'ok', 'beklenen'], ['=', 'normal', 'ok'], ['↑', 'artmış', 'warn', 'beklenen']], cap: "<b>Beklenen tablo.</b> A ve C bölgelerinden çıkan kan yine tam oksijenlenmiştir. Ölü boşluk arttığı için V̇E artmalı, PaO₂ ise normal kalmalıdır. Oysa PE'li hastalar klinikte hipoksemiktir. [[K1 s. 70]]" },
      { ad: 'J reseptörleri', g: [['=', 'normal', 'ok'], ['↓', 'azalmış', 'warn'], ['↑', 'artmış', 'warn']], cap: "<b>J reseptörleri.</b> Alveol duvarındaki J reseptörleri emboliyle uyarılır: nefes darlığı hissi doğar ve V̇E artar. PE'li hastalardaki düşük PaCO₂'yi bu açıklar. [[K1 s. 70]]" },
      { ad: 'Mediyatörler', g: [['=', 'normal', 'ok'], ['↓', 'azalmış', 'warn'], ['↑', 'artmış', 'warn']], cap: '<b>İnflamatuvar mediyatörler.</b> Emboli yerel mediyatör salınımına yol açar: küçük hava yollarında bronkokonstriksiyon, alveol–kapiller bariyer hasarı ve pulmoner ödem, sürfaktan üretiminin azalması ve atelektazi. Perfüze olmayı sürdüren C bölgesinin ventilasyonu azalır. [[K1 s. 70]]' },
      { ad: 'Sonuç: hipoksemi', g: [['↓', 'hipoksemi', 'crit'], ['↓', 'azalmış', 'warn'], ['↑', 'artmış', 'warn']], cap: '<b>Sonuç: hipoksemi.</b> Mediyatörlerin üç etkisinin her biri düşük V̇/Q̇ bölgeleri oluşturur. Bu bölgelerden tam oksijenlenmemiş kan arteriyel kana karışır ve PaO₂ düşer; PaCO₂ ise artmış V̇E nedeniyle düşük kalır. [[K1 s. 70]]' },
      { ad: 'Ek mekanizmalar', atlas: true, g: [['↓↓', 'hipoksemi derinleşir', 'crit'], ['↓', 'azalmış', 'warn'], ['↑', 'artmış', 'warn']], cap: "<b>Atlas notu · ek mekanizmalar.</b> Tıkalı daldan geri çevrilen kan A ve C bölgelerine yönelir ve oradaki V̇/Q̇'yu düşürür. Masif PE'de kalp debisi düşer, miks venöz PO₂ azalır ve düşük V̇/Q̇ bölgelerinin etkisi büyür. Sağ atriyum basıncı yükselirse açık foramen ovaleden sağdan sola şant eklenebilir. Kitap bu mekanizmaları anmaz." },
    ];
    const ROZ = (s) => [
      s >= 6 ? ['A · Q̇ ↑ → V̇/Q̇ ↓', 'warn'] : ['A · V̇/Q̇ ≈ 0,8', 'ok'],
      s >= 1 ? ['B · V̇/Q̇ ↑↑<br>ölü boşluk<br>PAO₂ ↑ · PACO₂ ↓', 'clin'] : ['B · V̇/Q̇ ≈ 0,8', 'ok'],
      s >= 4 ? ['C · V̇/Q̇ ↓<br>bronko\u00adkonstriksiyon', 'warn'] : ['C · V̇/Q̇ ≈ 0,8', 'ok'],
    ];
    const GAD = ['PaO₂', 'PaCO₂', 'V̇E'];
    let s = 0, oyn = false, tA = 0, pihti = 1, zaman = 0;
    el.innerHTML = `<div class="f15-pe">
        <div class="f15-pe-ctl"><button type="button" class="btn ghost" data-geri>◀ Geri</button>
          <div class="f15-pe-nok" role="group" aria-label="Adımlar">${ADIM.map((a, i) => `<button type="button" data-s="${i}" aria-label="Adım ${i}: ${a.ad}" aria-pressed="false"></button>`).join('')}</div>
          <button type="button" class="btn ghost" data-ileri>İleri ▶</button><button type="button" class="btn" data-oynat aria-pressed="false">Oynat</button></div>
        <div class="f15-pe-bas"><b data-o="ad"></b><span class="tag gold" data-o="atlas" hidden>Atlas notu</span></div>
        <div class="f15-pe-gov">
          <div class="f15-pe-sol"><div class="f15-pe-roz" aria-hidden="true"><span></span>${[0, 1, 2].map((i) => `<span class="tag" data-roz="${i}"></span>`).join('')}</div>
            <svg class="f15-svg f15-pe-svg" viewBox="0 0 400 350" role="img" aria-label="Üç akciğer bölgesi (A, B, C): yukarıdan bronşiyoller ve alveoller, aşağıdan pulmoner arter dalları ve kapillerler; emboli B dalını tıkar"></svg></div>
          <div class="f15-pe-gos">${GAD.map((a, i) => `<div class="f15-pe-g" data-g="${i}"><span class="f15-pe-gad">${a}</span><span class="f15-pe-gs"></span><span class="f15-pe-gk"></span><span class="f15-pe-gb">beklenen</span></div>`).join('')}
            <p class="f15-pe-bk" hidden>B bölgesi: PAO₂ ↑ · PACO₂ ↓</p></div>
        </div></div>`;
    const $ = (q) => el.querySelector(q);
    const root = $('.f15-pe'), svg = $('.f15-pe-svg');
    const defs = mk('defs', null, svg);
    const mrk = mk('marker', { id: `f15-pe-ok-${id}`, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' }, defs);
    mk('path', { d: 'M0 0 L10 5 L0 10 Z', class: 'f15-pe-mok' }, mrk);
    const Y = { br0: 0, br1: 52, alv: 84, lbl: 120, kap: [132, 141, 150], trunk: 212, ven: 246 };
    const R = CX.map((cx) => ({ cx, g: mk('g', null, svg) }));
    // damarlar (önce venüller: gövde üstlerinden "köprü" ile geçer)
    const gDam = mk('g', null, svg);
    const tup = (d, c) => { const a = mk('path', { d, class: c }, gDam); mk('path', { d, class: c + '-ic' }, gDam); return a; };
    const venD = yolD([[150, Y.ven], [398, Y.ven]]);
    const ven = mk('path', { d: venD, class: 'f15-pe-ven' }, gDam);
    R.forEach((r) => { r.des = mk('path', { d: yolD([[r.cx + 50, Y.kap[1]], [r.cx + 50, Y.ven]]), class: 'f15-pe-ven' }, gDam); });
    mk('path', { d: venD, class: 'f15-pe-ven-ic' }, gDam);
    R.forEach((r) => { r.desIc = mk('path', { d: yolD([[r.cx + 50, Y.kap[1]], [r.cx + 50, Y.ven]]), class: 'f15-pe-ven-ic' }, gDam); });
    mk('path', { d: yolD([[34, Y.trunk], [290, Y.trunk]]), class: 'f15-pe-kopru' }, gDam);
    const trunk = tup(yolD([[34, Y.trunk], [290, Y.trunk]]), 'f15-pe-art');
    R.forEach((r) => { r.ris = tup(yolD([[r.cx - 50, Y.trunk], [r.cx - 50, Y.kap[1]]]), 'f15-pe-art'); });
    mk('path', { d: yolD([[CX[1] - 50, 182], [CX[1] - 50, Y.kap[1]]]), class: 'f15-pe-bosr' }, gDam);
    mk('path', { d: yolD([[CX[1] - 50, 182], [CX[1] - 50, Y.kap[1]]]), class: 'f15-pe-bosr-ic' }, gDam);
    // kalp
    mk('path', { d: 'M18 228 C-2 214 0 196 11 196 C15 196 18 199 18 203 C18 199 21 196 25 196 C36 196 38 214 18 228 Z', class: 'f15-pe-kalp' }, svg);
    // bölgeler
    R.forEach((r, i) => {
      const { cx } = r;
      r.kap = Y.kap.map((y) => mk('path', { d: `M${cx - 50} ${y} q 12.5 -4 25 0 t 25 0 t 25 0 t 25 0`, class: 'f15-pe-kap' }, r.g));
      r.br = mk('rect', { x: cx - 6, y: Y.br0, width: 12, height: Y.br1 - Y.br0, rx: 3, class: 'f15-pe-br' }, r.g);
      r.alv = [[-34, 6], [0, 0], [34, 6]].map(([dx, dy]) => {
        mk('line', { x1: cx, y1: Y.br1 - 2, x2: cx + dx * 0.8, y2: Y.alv + dy - 12, class: 'f15-pe-duk' }, r.g);
        return mk('circle', { cx: cx + dx, cy: Y.alv + dy, r: 16, class: 'f15-pe-alv' }, r.g);
      });
      r.air = Array.from({ length: 4 }, (_, j) => ({ ph: j / 4, c: mk('circle', { r: 2.6, class: 'f15-pe-hava' }, r.g) }));
    });
    // B: J reseptörleri
    const gJ = mk('g', { class: 'f15-pe-j' }, svg);
    R[1].alv.forEach((a) => { const x = +a.getAttribute('cx'), y = +a.getAttribute('cy'); mk('path', { d: `M${x - 13} ${y - 15} l4 -7 l1 5 l4 -6`, class: 'f15-pe-jz' }, gJ); });
    txt(gJ, 205, 20, 'J reseptörleri', 'f15-sm f15-pe-jt', { 'text-anchor': 'end' });
    txt(gJ, 205, 36, 'nefes darlığı', 'f15-sm f15-pe-jt', { 'text-anchor': 'end' });
    // C: ödem, atelektazi
    const gC = mk('g', { class: 'f15-pe-c4' }, svg);
    mk('circle', { cx: CX[2] - 34, cy: Y.alv + 6, r: 16, class: 'f15-pe-odem' }, gC);
    txt(gC, CX[2] - 22, Y.lbl, 'ödem', 'f15-sm f15-pe-ct', { 'text-anchor': 'end' });
    txt(gC, 398, Y.lbl, 'atelektazi', 'f15-sm f15-pe-ct', { 'text-anchor': 'end' });
    // mediyatörler
    const medYol = (t) => { const a = [172, 192], c = [262, 118], b = [CX[2] - 4, Y.alv + 18], u = 1 - t; return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]; };
    const med = Array.from({ length: 7 }, (_, j) => ({ ph: j / 7, c: mk('circle', { r: 3, class: 'f15-pe-med' }, svg) }));
    // 6. adım: geri çevrilen akım, CO ↓, PFO
    const g6 = mk('g', { class: 'f15-pe-g6' }, svg);
    mk('path', { d: `M160 204 Q 110 196 ${CX[0] - 44} 172`, class: 'f15-pe-yon', 'marker-end': `url(#f15-pe-ok-${id})` }, g6);
    mk('path', { d: `M180 204 Q 236 196 ${CX[2] - 56} 172`, class: 'f15-pe-yon', 'marker-end': `url(#f15-pe-ok-${id})` }, g6);
    mk('rect', { x: 52, y: 218, width: 96, height: 20, rx: 5, class: 'f15-pe-cor' }, g6);
    txt(g6, 100, 232.5, 'CO ↓ → PvO₂ ↓', 'f15-sm f15-pe-cot', { 'text-anchor': 'middle' });
    mk('path', { d: yolD([[8, 228], [8, 322], [392, 322], [392, 254]]), class: 'f15-pe-pfo', 'marker-end': `url(#f15-pe-ok-${id})` }, g6);
    txt(g6, 16, 342, 'PFO: sağdan sola şant', 'f15-sm f15-pe-pfot');
    // pıhtı
    const pR = rota([[34, Y.trunk], [170, Y.trunk], [170, 192]]);
    const pihtiE = mk('ellipse', { rx: 7.5, ry: 9.5, class: 'f15-pe-pih' }, svg);
    const notE = txt(svg, 16, 296, 'Emboli: pıhtı · gaz · yağ · amniyotik sıvı', 'f15-sm f15-pe-pnot');
    // etiketler
    txt(svg, 16, 270, 'sağ kalp → pulmoner arter', 'f15-sm');
    txt(svg, 384, 270, 'pulmoner ven → sol kalp', 'f15-sm', { 'text-anchor': 'end' });
    // kan parçacıkları
    const kanY = CX.map((cx) => rota([[34, Y.trunk], [cx - 50, Y.trunk], [cx - 50, Y.kap[1]], [cx + 50, Y.kap[1]], [cx + 50, Y.ven], [398, Y.ven]]));
    const gK = mk('g', null, svg);
    const kan = CX.map(() => Array.from({ length: 16 }, () => ({ ph: 0, c: mk('circle', { r: 2.8, class: 'f15-pe-kan' }, gK) })));
    const kapBas = (i) => kanY[i].L[2], kapSon = (i) => kanY[i].L[3];

    function cikisRenk(i) {
      if (i === 2 && s >= 5) return satRenk(0.87);
      if (i === 0 && s >= 6) return satRenk(0.93);
      return 'var(--crit)';
    }
    function goster(eski) {
      const a = ADIM[s];
      $('[data-o="ad"]').textContent = `${s} · ${a.ad}`;
      $('[data-o="atlas"]').hidden = !a.atlas;
      el.querySelectorAll('[data-s]').forEach((b) => { b.setAttribute('aria-pressed', String(+b.dataset.s === s)); b.classList.toggle('gecti', +b.dataset.s < s); });
      $('[data-geri]').disabled = s === 0; $('[data-ileri]').disabled = s === ADIM.length - 1;
      $('[data-oynat]').textContent = oyn ? 'Duraklat' : 'Oynat';
      $('[data-oynat]').setAttribute('aria-pressed', String(oyn));
      ROZ(s).forEach(([h, c], i) => { const r = $(`[data-roz="${i}"]`); r.innerHTML = h; r.className = 'tag ' + c; });
      a.g.forEach(([sim, soz, c, bek], i) => {
        const g = $(`[data-g="${i}"]`); g.className = 'f15-pe-g ' + c;
        g.querySelector('.f15-pe-gs').textContent = sim; g.querySelector('.f15-pe-gk').textContent = soz;
        g.querySelector('.f15-pe-gb').hidden = !bek;
      });
      $('.f15-pe-bk').hidden = s < 1;
      // çizim
      root.classList.toggle('s1', s >= 1); root.classList.toggle('s3', s >= 3); root.classList.toggle('s4', s >= 4); root.classList.toggle('s5', s >= 5); root.classList.toggle('s6', s >= 6);
      R[1].kap.forEach((k) => k.classList.toggle('bos', s >= 1));
      R[0].kap.forEach((k) => { k.style.strokeWidth = s >= 6 ? 3.6 : ''; k.style.stroke = cikisRenk(0); });
      R[2].kap.forEach((k) => { k.style.stroke = cikisRenk(2); });
      R[1].kap.forEach((k) => { k.style.stroke = s >= 1 ? '' : 'var(--crit)'; });
      R[0].ris.style.strokeWidth = s >= 6 ? 11 : '';
      ven.style.stroke = s >= 6 ? satRenk(0.9) : s >= 5 ? satRenk(0.94) : '';
      R.forEach((r, i) => { r.des.style.stroke = i === 1 && s >= 1 ? '' : cikisRenk(i); r.des.classList.toggle('bos', i === 1 && s >= 1); r.desIc.classList.toggle('bos', i === 1 && s >= 1); });
      trunk.style.stroke = s >= 6 ? 'color-mix(in srgb, var(--c-basic) 62%, var(--ink))' : '';
      R[2].br.style.transform = s >= 4 ? 'scaleX(0.4)' : '';
      R[2].alv[2].style.transform = s >= 4 ? 'scale(0.45, 0.32)' : '';
      cap.yaz(a.cap);
      pihti = s === 1 && eski === 0 && !RM ? 0 : 1;
      pihtiE.style.opacity = s >= 1 ? 1 : 0;
      notE.style.opacity = s >= 1 ? 1 : 0;
      cizHareket(0);
    }
    function git(n) { const eski = s; s = clamp(n, 0, ADIM.length - 1); tA = 0; if (s === ADIM.length - 1) oyn = false; goster(eski); }
    function cizHareket(dt) {
      zaman += dt;
      if (pihti < 1) pihti = Math.min(1, pihti + dt);
      const [px, py] = pR.at(pR.len * ease(pihti));
      pihtiE.setAttribute('cx', px.toFixed(1)); pihtiE.setAttribute('cy', py.toFixed(1));
      // kan
      const v = 92;
      kan.forEach((arr, i) => {
        const r = kanY[i], n = i === 0 && s >= 6 ? 16 : i === 2 && s >= 6 ? 13 : 10;
        const durdu = i === 1 && s >= 1 && pihti >= 1;
        arr.forEach((p, j) => {
          if (!RM && !durdu) p.ph = (p.ph + (v * dt) / r.len) % 1;
          const vis = j < n && !durdu;
          if (!vis) { p.c.setAttribute('opacity', 0); return; }
          const sd = ((p.ph + j / n) % 1) * r.len, [x, y] = r.at(sd);
          p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1)); p.c.setAttribute('opacity', 0.95);
          const a = kapBas(i), b = kapSon(i);
          p.c.style.fill = sd < a ? (s >= 6 ? 'color-mix(in srgb, var(--c-basic) 62%, var(--ink))' : 'var(--c-basic)') : sd > b ? cikisRenk(i) : `color-mix(in srgb, ${cikisRenk(i)} ${Math.round(((sd - a) / (b - a)) * 100)}%, var(--c-basic))`;
        });
      });
      // hava
      const hv = s >= 3 ? 1.8 : 1;
      R.forEach((r, i) => {
        const az = i === 2 && s >= 4;
        r.air.forEach((a, j) => {
          if (!RM) a.ph = (a.ph + (dt * 0.75 * hv * (az ? 0.5 : 1))) % 1;
          const vis = !(az && j % 2);
          a.c.setAttribute('cx', r.cx); a.c.setAttribute('cy', (Y.br0 + 4 + a.ph * (Y.br1 - Y.br0 - 4)).toFixed(1));
          a.c.setAttribute('opacity', vis ? (RM ? 0.9 : (1 - a.ph * 0.6).toFixed(2)) : 0);
        });
      });
      // J ve mediyatörler
      gJ.style.opacity = s >= 3 ? (RM ? 1 : (0.55 + 0.45 * Math.sin(zaman * 6)).toFixed(2)) : 0;
      med.forEach((m) => {
        if (!RM) m.ph = (m.ph + dt * 0.35) % 1;
        const [x, y] = medYol(m.ph);
        m.c.setAttribute('cx', x.toFixed(1)); m.c.setAttribute('cy', y.toFixed(1));
        m.c.setAttribute('opacity', s >= 4 ? (RM ? 0.9 : Math.min(1, Math.min(m.ph, 1 - m.ph) * 8).toFixed(2)) : 0);
      });
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.s !== undefined) { oyn = false; git(+b.dataset.s); }
      else if (b.hasAttribute('data-geri')) { oyn = false; git(s - 1); }
      else if (b.hasAttribute('data-ileri')) { oyn = false; git(s + 1); }
      else if (b.hasAttribute('data-oynat')) {
        oyn = !oyn;
        if (oyn && s === ADIM.length - 1) git(0); else { tA = 0; goster(s); }
      }
    });
    const birak = genislik(el, [600], (d) => root.classList.toggle('f15-dar', d > 0));
    goster(0);
    const dur = ticker(el, (dt) => {
      if (oyn) { tA += dt; if (tA >= 5) git(s + 1); }
      if (!RM || pihti < 1) cizHareket(dt);
    });
    return () => { dur(); birak(); };
  };

  /* ================= 6 · Eşleşik dallanma ve HPV ================= */
  VIZ.f15_esleme = (el) => {
    const cap = capOf(el);
    const CAPS = {
      es: '<b>Eşleşik dallanma.</b> Hava yolu ve damar aynı noktalarda dallanır, çapları birbirine uyar. Dallanma asimetrik olduğu için uç birimlerin aldığı hava ve kan birbirinden farklıdır, ama her birimde ikisi benzer kalır. [[K1 s. 70]]',
      esz: '<b>Eşleşmesiz dallanma (varsayımsal).</b> Damarlar hava yollarından farklı oranlarla dallansaydı aynı yükseklikteki uç birimler çok farklı V̇/Q̇ alırdı (modelde 0,30–1,44) ve PaO₂ düşerdi (13,4 → 11,4 kPa). Gerçekte hava yolu ve damar embriyonik gelişimde birlikte gelişir, aynı noktalarda dallanır ve çapları birbirine uyar. [[K1 s. 70]]',
      hk: '<b>Az ventile bölge, HPV yok.</b> Üçüncü bölgenin ventilasyonu azalmıştır ama perfüzyonu sürer: V̇/Q̇ 0,36 ve bölgenin PAO₂\'si düşüktür; tam oksijenlenmemiş kan arteriyel kana karışır (model PaO₂ 11,7 kPa). [[K1 s. 70]]',
      ha: '<b>Hipoksik pulmoner vazokonstriksiyon.</b> Düşük PAO₂ bölgenin pulmoner arteriyollerini daraltır ve perfüzyonu azaltır (V̇/Q̇ 0,36 → 0,67). Kan iyi ventile olan bölgelere yönelir; oradaki kapillerler açılarak ve genişleyerek artan hacmi karşılar (V̇/Q̇ 1,02 → 0,83). Model PaO₂ 11,7 → 13,4 kPa. [[K1 s. 70]]',
    };
    const BOL_V = [[0.6], [0.6, 0.6], [0.6, 0.6, 0.6, 0.6]], BOL_QE = [[0.6], [0.4, 0.6], [0.5, 0.3, 0.7, 0.5]];
    const yapraklar = (B) => { let w = [1]; const kat = [w]; for (const g of B) { const n = []; w.forEach((x, i) => { n.push(x * g[i]); n.push(x * (1 - g[i])); }); w = n; kat.push(w); } return kat; };
    const KV = yapraklar(BOL_V);
    const sinif = (vq) => (vq < 0.6 ? 'warn' : vq <= 1.2 ? 'ok' : 'clin');
    const V3 = [1.7, 1.7, 0.6];
    let mod = 'a', esz = false, hpv = false, h = 0, buyu = RM ? 99 : 0, buyuyor = false, dar = null, A = null, Bm = null, ilk = true;
    el.innerHTML = `<div class="f15-es">
        <div class="f15-ctl">${segHtml('Görünüm', 'mod', [['a', 'Eşleşik dallanma'], ['b', 'HPV']], 'a')}
          <span class="f15-es-a"><button type="button" class="btn ghost f15-tog" data-esz aria-pressed="false">Damarlar eşleşmesiz dallansaydı (varsayımsal)</button>
          <button type="button" class="btn ghost" data-dallan>Dallan ▶</button></span>
          <span class="f15-es-b" hidden><button type="button" class="btn ghost f15-tog" data-hpv aria-pressed="false">HPV</button></span></div>
        <dl class="f15-oku f15-es-oku" data-o="oku"></dl>
        <div class="f15-es-sahne"></div>
        <p class="f15-es-not small muted" data-o="not"></p>
        <div class="tbl-wrap f15-es-tb" hidden><table class="tbl"><thead><tr><th></th><th>Bölge 1<small>iyi ventile</small></th><th>Bölge 2<small>iyi ventile</small></th><th>Bölge 3<small>az ventile</small></th></tr></thead><tbody data-o="tb"></tbody></table></div>
        <div class="f15-lej" aria-hidden="true"><span style="--k:var(--c-clin)"><i></i>hava yolu</span><span style="--k:var(--c-basic)"><i></i>pulmoner arter dalı</span><span class="f15-es-lb" style="--k:var(--crit)" hidden><i></i>kapiller</span></div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const root = $('.f15-es'), sahne = $('.f15-es-sahne');
    /* ---- mod A: dallanan ağaç ---- */
    function agacKur() {
      sahne.innerHTML = '';
      const W = dar ? 400 : 640, H = dar ? 312 : 340;
      const yl = dar ? 248 : 262, x0 = dar ? 25 : 40, dx = dar ? 50 : 80, ys = dar ? [8, 58, 120, 184] : [8, 62, 128, 194];
      const svg = mk('svg', { viewBox: `0 0 ${W} ${H}`, class: 'f15-svg', role: 'img', 'aria-label': 'Hava yolu ve pulmoner arter dalı birlikte üç kuşak ikili dallanır; sekiz uç birimin V̇/Q̇ oranı' }, sahne);
      const lx = Array.from({ length: 8 }, (_, i) => x0 + i * dx);
      const kat3 = [0, 1, 2, 3].map((j) => (lx[2 * j] + lx[2 * j + 1]) / 2), kat2 = [0, 1].map((j) => (kat3[2 * j] + kat3[2 * j + 1]) / 2), kat1 = [(kat2[0] + kat2[1]) / 2];
      const D = [[[kat1[0], ys[0]], [kat1[0], ys[1]], 0, 0]];
      kat2.forEach((x, j) => D.push([[kat1[0], ys[1]], [x, ys[2]], 1, j]));
      kat3.forEach((x, j) => D.push([[kat2[j >> 1], ys[2]], [x, ys[3]], 2, j]));
      lx.forEach((x, j) => D.push([[kat3[j >> 1], ys[3]], [x, yl - 20], 3, j]));
      const gHy = mk('g', null, svg), gDm = mk('g', null, svg);
      const kenar = D.map(([a, b, k, j]) => {
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
        const hy = mk('line', { pathLength: 1, class: 'f15-es-hy' }, gHy), dm = mk('line', { pathLength: 1, class: 'f15-es-dm' }, gDm);
        return { a, b, k, j, nx, ny, hy, dm };
      });
      const uc = lx.map((x) => ({ c: mk('circle', { cx: x, cy: yl, r: 16, class: 'f15-es-uc' }, svg), t: txt(svg, x, yl + 36, '', 'f15-tk f15-es-ut', { 'text-anchor': 'middle' }) }));
      A = { kenar, uc };
      agacGuncelle();
    }
    function paylar() {
      const KQ = esz ? yapraklar(BOL_QE) : KV;
      return { KQ, vq: KV[3].map((v, i) => (4 * v) / (5 * KQ[3][i])) };
    }
    function agacGuncelle() {
      if (!A) return;
      const { KQ, vq } = paylar();
      A.kenar.forEach((e) => {
        const sv = e.k === 0 ? 1 : KV[e.k][e.j], sq = e.k === 0 ? 1 : KQ[e.k][e.j];
        const wa = 2 + 14 * sv, wq = 2 + 14 * sq, oa = -(wa / 2 + 1.2), oq = wq / 2 + 1.2;
        [[e.hy, oa, wa], [e.dm, oq, wq]].forEach(([l, o, w]) => {
          l.setAttribute('x1', (e.a[0] + e.nx * o).toFixed(1)); l.setAttribute('y1', (e.a[1] + e.ny * o).toFixed(1));
          l.setAttribute('x2', (e.b[0] + e.nx * o).toFixed(1)); l.setAttribute('y2', (e.b[1] + e.ny * o).toFixed(1));
          l.style.strokeWidth = w.toFixed(2);
          const f = clamp(buyu - e.k, 0, 1);
          l.style.strokeDashoffset = (1 - ease(f)).toFixed(3);
        });
      });
      const ucF = clamp(buyu - 4, 0, 1);
      A.uc.forEach((u, i) => {
        u.c.setAttribute('class', 'f15-es-uc ' + sinif(vq[i]));
        u.c.style.opacity = u.t.style.opacity = ucF.toFixed(2);
        u.t.textContent = fmt(vq[i], 2);
      });
      const ca = KQ[3].reduce((a, q, i) => a + q * birim(vq[i], 0.21).c, 0), pa = ters(ca);
      const mn = Math.min(...vq), mx = Math.max(...vq);
      $('[data-o="oku"]').innerHTML = `<div><dt>Uç birimlerde V̇/Q̇</dt><dd>${fmt(mn, 2)}–${fmt(mx, 2)}</dd></div><div><dt>Model PaO₂ (FiO₂ 0,21)</dt><dd>${fmt(pa, 1)} kPa · SaO₂ %${fmt(SAT(pa) * 100, 1)}</dd></div>`;
      $('[data-o="not"]').textContent = esz
        ? 'Hava yolu her düğümde 0,6 / 0,4 dallanır. Varsayımsal damar başka oranlarla dallanır (soldan sağa sol dal payı): 1. kuşak 0,6; 2. kuşak 0,4 · 0,6; 3. kuşak 0,5 · 0,3 · 0,7 · 0,5. Renkler: turuncu V̇/Q̇ < 0,6, yeşil 0,6–1,2, turkuaz > 1,2.'
        : 'Hava yolu ve damar her düğümde aynı oranla (sol dal 0,6, sağ dal 0,4) dallanır; çizgi kalınlığı dalın payıyla orantılıdır. Renkler: turuncu V̇/Q̇ < 0,6, yeşil 0,6–1,2, turkuaz > 1,2.';
    }
    /* ---- mod B: HPV ---- */
    function hpvKur() {
      sahne.innerHTML = '';
      const W = dar ? 400 : 640, H = dar ? 324 : 282;
      const svg = mk('svg', { viewBox: `0 0 ${W} ${H}`, class: 'f15-svg', role: 'img', 'aria-label': 'Üç akciğer bölgesi: iki iyi ventile, biri az ventile; bronşiyol kalınlığı ventilasyonu, arteriyol kalınlığı perfüzyonu gösterir' }, sahne);
      const hw = dar ? 54 : 80, cx = [W / 6, W / 2, (5 * W) / 6], ya = 262;
      const B = { hw, cx, ya, svg, bol: [] };
      mk('path', { d: yolD([[4, ya], [cx[2] - hw, ya]]), class: 'f15-es-ana' }, svg);
      mk('path', { d: yolD([[4, ya], [cx[2] - hw, ya]]), class: 'f15-es-ana-ic' }, svg);
      cx.forEach((x, i) => {
        const r = {};
        const az = i === 2;
        r.br = mk('line', { x1: x, x2: x, y1: 0, y2: 64, class: 'f15-es-br' }, svg);
        txt(svg, x + 10, 16, String(i + 1), 'f15-lb');
        const ar = az ? 0.21 * hw : 0.3 * hw;
        [[-0.55, 10], [0, 0], [0.55, 10]].forEach(([fx, dy]) => {
          mk('line', { x1: x, y1: 62, x2: x + fx * hw * 0.8, y2: 88 + dy - ar + 2, class: 'f15-es-duk' + (az ? ' az' : '') }, svg);
          mk('circle', { cx: x + fx * hw, cy: 88 + dy, r: ar, class: 'f15-es-alv' + (az ? ' az' : '') }, svg);
        });
        r.kap = [140, 150, 160].map((y) => mk('path', { d: `M${x - hw} ${y} ${Array.from({ length: 4 }, () => `q ${hw / 4} -4 ${hw / 2} 0`).join(' ')}`, class: 'f15-es-kap' }, svg));
        r.yeni = az ? [] : [170, 180].map((y) => mk('path', { d: `M${x - hw} ${y} ${Array.from({ length: 4 }, () => `q ${hw / 4} -4 ${hw / 2} 0`).join(' ')}`, class: 'f15-es-kap yeni' }, svg));
        r.art = mk('path', { d: yolD([[x - hw, ya], [x - hw, 150]]), class: 'f15-es-art' }, svg);
        r.artIc = mk('path', { d: yolD([[x - hw, ya], [x - hw, 150]]), class: 'f15-es-art-ic' }, svg);
        r.rota = rota([[4, ya], [x - hw, ya], [x - hw, 150], [x + hw, 150]]);
        r.kan = Array.from({ length: 22 }, () => ({ ph: 0, c: mk('circle', { r: 2.6, class: 'f15-es-kan' }, svg) }));
        if (az) {
          r.dar = mk('g', { class: 'f15-es-daral' }, svg);
          mk('path', { d: okBasi(x - hw - 4, 220, 's', 4, 7), class: 'f15-es-dok' }, r.dar);
          mk('path', { d: okBasi(x - hw + 4, 220, 'l', 4, 7), class: 'f15-es-dok' }, r.dar);
          const [nx, ny, na] = dar ? [W - 4, 288, 'end'] : [x - hw + 16, 206, 'start'];
          r.not = [txt(svg, nx, ny, 'vazokonstriksiyon', 'f15-sm f15-es-vk', { 'text-anchor': na }), txt(svg, nx, ny + 16, 'PAO₂ düşük', 'f15-sm f15-es-pn', { 'text-anchor': na }), txt(svg, nx, ny + 32, 'arteriyol daralır', 'f15-sm f15-es-vk', { 'text-anchor': na })];
        } else {
          r.not = [txt(svg, x, 200, 'açılma +', 'f15-sm f15-es-ac', { 'text-anchor': 'middle' }), txt(svg, x, 216, 'genişleme', 'f15-sm f15-es-ac', { 'text-anchor': 'middle' })];
        }
        B.bol.push(r);
      });
      Bm = B;
      hpvGuncelle();
    }
    function hpvDeger() {
      const q3 = lerp(5 / 3, 0.9, ease(h)), q = (5 - q3) / 2, Q = [q, q, q3];
      const b = Q.map((x, i) => birim(V3[i] / x, 0.21));
      const ca = b.reduce((a, x, i) => a + x.c * Q[i], 0) / 5, pa = ters(ca);
      return { Q, b, pa };
    }
    function hpvGuncelle() {
      if (!Bm) return;
      const { Q, b, pa } = hpvDeger(), k = ease(h);
      Bm.bol.forEach((r, i) => {
        r.br.style.strokeWidth = (V3[i] * 4.2).toFixed(2);
        r.art.style.strokeWidth = (Q[i] * 4.4).toFixed(2); r.artIc.style.strokeWidth = Math.max(0.6, Q[i] * 4.4 - 3.4).toFixed(2);
        r.kap.forEach((p) => { p.style.strokeWidth = i < 2 ? (2 + 1.2 * k).toFixed(2) : (2 - 0.6 * k).toFixed(2); });
        r.yeni.forEach((p) => { p.style.opacity = k.toFixed(2); });
        if (i === 2) { r.dar.style.opacity = k.toFixed(2); r.not[0].style.opacity = r.not[2].style.opacity = k.toFixed(2); r.not[1].textContent = k > 0.5 ? 'PAO₂ düşük →' : 'PAO₂ düşük'; }
        else r.not.forEach((t) => { t.style.opacity = k.toFixed(2); });
      });
      $('[data-o="tb"]').innerHTML = [
        ['V̇ (L/dk)', V3.map((v) => fmt(v, 2))],
        ['Q̇ (L/dk)', Q.map((v) => fmt(v, 2))],
        ['V̇/Q̇', Q.map((q, i) => fmt(V3[i] / q, 2))],
        ['PAO₂ (kPa)', b.map((x) => fmt(x.p, 1))],
      ].map(([a, v]) => `<tr><th>${a}</th>${v.map((x, i) => `<td class="num${i === 2 ? ' f15-es-c3' : ''}">${x}</td>`).join('')}</tr>`).join('');
      $('[data-o="oku"]').innerHTML = `<div><dt>Bölge 3 · V̇/Q̇</dt><dd>${fmt(V3[2] / Q[2], 2)}</dd></div><div><dt>Model PaO₂ (FiO₂ 0,21)</dt><dd>${fmt(pa, 1)} kPa · SaO₂ %${fmt(SAT(pa) * 100, 1)}</dd></div>`;
      $('[data-o="not"]').textContent = 'Toplam V̇A 4 L/dk, Q̇ 5 L/dk. Bronşiyol kalınlığı ventilasyonla, arteriyol kalınlığı ve kan noktalarının sayısı perfüzyonla orantılıdır.';
    }
    function kanCiz(dt) {
      if (!Bm || mod !== 'b') return;
      const { Q } = hpvDeger();
      Bm.bol.forEach((r, i) => {
        const n = clamp(Math.round(Q[i] * 7), 1, 22);
        r.kan.forEach((p, j) => {
          if (!RM) p.ph = (p.ph + (80 * dt) / r.rota.len) % 1;
          if (j >= n) { p.c.setAttribute('opacity', 0); return; }
          const sd = ((p.ph + j / n) % 1) * r.rota.len, [x, y] = r.rota.at(sd);
          p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1));
          p.c.setAttribute('opacity', clamp((r.rota.len - sd) / 30, 0, 0.95).toFixed(2));
          p.c.style.fill = sd < r.rota.L[2] ? 'var(--c-basic)' : 'var(--crit)';
        });
      });
    }
    function kur() {
      if (mod === 'a') agacKur(); else { hpvKur(); kanCiz(0); }
    }
    function yaz() {
      basSec(el, 'mod', mod);
      $('.f15-es-a').hidden = mod !== 'a'; $('.f15-es-b').hidden = mod !== 'b';
      $('.f15-es-tb').hidden = mod !== 'b'; $('.f15-es-lb').hidden = mod !== 'b';
      $('[data-esz]').setAttribute('aria-pressed', String(esz));
      $('[data-hpv]').setAttribute('aria-pressed', String(hpv));
      cap.yaz(mod === 'a' ? (esz ? CAPS.esz : CAPS.es) : hpv ? CAPS.ha : CAPS.hk);
    }
    const dallan = () => { if (RM) { buyu = 99; agacGuncelle(); return; } buyu = 0; buyuyor = true; agacGuncelle(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.mod) { if (b.dataset.mod === mod) return; mod = b.dataset.mod; yaz(); kur(); if (mod === 'a' && buyu < 5) dallan(); }
      else if (b.hasAttribute('data-esz')) { esz = !esz; yaz(); agacGuncelle(); }
      else if (b.hasAttribute('data-dallan')) dallan();
      else if (b.hasAttribute('data-hpv')) { hpv = !hpv; if (RM) h = hpv ? 1 : 0; yaz(); hpvGuncelle(); kanCiz(0); }
    });
    const birak = genislik(el, [600], (d) => { root.classList.toggle('f15-dar', d > 0); dar = d > 0; kur(); });
    yaz();
    const gozle = RM ? () => {} : gorununce(el, () => { if (ilk && mod === 'a') { ilk = false; dallan(); } });
    const dur = ticker(el, (dt) => {
      if (mod === 'a' && buyuyor) { buyu += dt / 0.7; if (buyu >= 5) { buyu = 5; buyuyor = false; } agacGuncelle(); }
      if (mod === 'b') {
        const hd = hpv ? 1 : 0;
        if (h !== hd) { h = RM ? hd : hd > h ? Math.min(1, h + dt / 1.5) : Math.max(0, h - dt / 1.5); hpvGuncelle(); }
        if (!RM) kanCiz(dt);
      }
    });
    return () => { dur(); gozle(); birak(); };
  };
  /* ================= 7 · Nedenlerin haritası: ventilasyon mu, perfüzyon mu? ================= */
  VIZ.f15_neden = (el) => {
    const cap = capOf(el), id = uid();
    const SA = [['ua', 'Üst hava yolu obstrüksiyonu'], ['yab', 'Yabancı cisim aspirasyonu'], ['pno', 'Pnömoni'], ['ptx', 'Pnömotoraks'], ['atl', 'Atelektazi'], ['ards', 'ARDS'], ['amf', 'Amfizem'], ['tav', 'Tek akciğer ventilasyonu'], ['yas', 'Normal yaşlanma'], ['obe', 'Obezite (kapanma kapasitesi ↑)']];
    const SB = [['pe', 'Pulmoner emboli'], ['hip', 'Hipovolemi'], ['sve', 'Sağ ventrikül enfarktüsü'], ['tam', 'Perikard tamponadı']];
    const BIL = { sant: { ad: '0 · şant', g: 's' }, olu: { ad: '∞ · ölü boşluk', g: 'o' } };
    SA.forEach(([k, ad]) => (BIL[k] = { ad, g: 'v' }));
    SB.forEach(([k, ad]) => (BIL[k] = { ad, g: 'q' }));
    const CAP0 = "<b>İki grup.</b> Ventilasyonu bozan durumlar V̇/Q̇'yu düşürür, perfüzyonu bozanlar yükseltir. Bir nedene dokunun: nerede etki ettiği ve V̇/Q̇ ölçeğini hangi yöne kaydırdığı görünür. [[K1 s. 69]]";
    const capMetni = (k) => {
      if (!k) return CAP0;
      const { ad, g } = BIL[k];
      if (g === 'v') {
        let s = `<b>${ad} · ventilasyon sorunu.</b> Bölgeye giden hava azalır, kan akmayı sürdürür: V̇/Q̇ düşer ve kan tam oksijenlenmeden çıkabilir. Düşük V̇/Q̇ hipokseminin en sık nedenidir. [[K1 s. 68–69]]`;
        if (k === 'pno' || k === 'tav') s += ' Alveoller tümüyle sıvıyla doluysa ya da proksimal hava yolu tümüyle kapalıysa (tek akciğer ventilasyonu) V̇/Q̇ = 0 olur: akciğer içi şant. [[K1 s. 64]]';
        if (k === 'yas' || k === 'obe') s += ' FRC kapanma kapasitesinin altına inerse küçük hava yolları kapanır; sonuç V̇/Q̇ uyumsuzluğu ve hipoksemidir. [[K1 s. 51]]';
        return s;
      }
      if (k === 'pe') return "<b>Pulmoner emboli · perfüzyon sorunu.</b> Bölge ventile olmayı sürdürür ama kan akımı azalır: V̇/Q̇ yükselir. Kan yine ventile alveollerden geçtiği için bu bölge PaO₂'yi düşürmez; ventilasyonun bir bölümü boşa gider (alveoler ölü boşluk), solunum işi artar. Klinikte PE'li hastalar yine de hipoksemiktir; nedeni aşağıdaki PE bölümündedir. [[K1 s. 65, 69–70]]";
      if (g === 'q') return `<b>${ad} · perfüzyon sorunu.</b> Sağ ventrikül atım hacmi azalır ve akciğere daha az kan gider: V̇/Q̇ yükselir. Kan yine ventile alveollerden geçtiği için PaO₂ normal kalır; ventilasyonun bir bölümü boşa gider (alveoler ölü boşluk), solunum işi artar. [[K1 s. 65, 69]]`;
      if (k === 'sant') return "<b>V̇/Q̇ = 0 · şant.</b> Bölge perfüze olur ama hiç ventile olmaz; kan gaz değişimine katılmadan arteriyel kana karışır ve PaO₂'yi düşürür. [[K1 s. 64]]";
      return '<b>V̇/Q̇ → ∞ · alveoler ölü boşluk.</b> Bölge ventile olur ama perfüzyonu yetersizdir; bu alveoller gaz değişimine katılamaz ve ventilasyon boşa gider. [[K1 s. 45, 65]]';
    };
    /* seçimde öne çıkan parçalar (öteki parçalar soluklaşır) */
    const ILGI = { ua: ['ua', 'alv'], yab: ['br', 'alv'], pno: ['alv'], ptx: ['pl'], atl: ['alv'], ards: ['alv'], amf: ['alv'], tav: ['br', 'alv', 'pa'], yas: ['br', 'alv'], obe: ['br', 'alv'], pe: ['pa', 'alv'], hip: ['kalp', 'pa'], sve: ['kalp', 'pa'], tam: ['per', 'kalp', 'pa'] };
    /* kısa etiket: satırlar, konum [x, ilk satır y], hiza, (isteğe bağlı) gösterge çizgisi */
    const KISA = {
      ua: [['üst hava yolu daralır'], [230, 33], 'start'],
      yab: [['bronşta', 'yabancı cisim'], [110, 170], 'end'],
      pno: [['sıvıyla dolu', 'alveoller'], [318, 252], 'start'],
      ptx: [['plevral boşlukta', 'hava'], [398, 40], 'end', [352, 64, 318, 146]],
      atl: [['kollabe', 'alveoller'], [24, 284], 'start', [86, 278, 128, 238]],
      ards: [['ARDS'], [332, 98], 'start'],
      amf: [['amfizem'], [272, 70], 'start'],
      tav: [['ventile edilmiyor,', 'perfüzyon sürüyor'], [398, 40], 'end', [318, 64, 222, 110]],
      yas: [['küçük hava yolları', 'kapanır'], [24, 284], 'start'],
      pe: [['pulmoner arter', 'dalında emboli'], [24, 50], 'start', [104, 70, 155, 151]],
      hip: [['SV atım hacmi ↓'], [154, 294], 'end', [148, 284, 178, 266]],
    };
    KISA.obe = KISA.yas; KISA.sve = KISA.hip; KISA.tam = KISA.hip;

    /* ---------- geometri (soldaki akciğer; sağdaki x → 400 − x aynası) ---------- */
    const X = (l, x) => (l ? 400 - x : x);
    const P = (l, p) => [X(l, p[0]), p[1]];
    const ps = (p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1);
    const ayna = (l, d) => (l ? d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, a, b) => `${400 - +a} ${b}`) : d);
    const AKC = 'M140 70 C114 72 94 118 90 175 C87 220 88 255 92 270 Q122 257 150 268 C151 245 158 222 172 205 L182 150 C184 108 164 70 140 70 Z';
    const PAR_T = (l) => `translate(${X(l, 136)} 170) scale(1.1 1.05) translate(${-X(l, 136)} -170)`;
    const G = { C: [200, 100], M: [172, 130], U: [150, 128], L: [140, 176], S: [200, 194], Mp: [178, 137], Up: [153, 135], Lp: [146, 181] };
    const KUME = {
      ui: { e: [152, 113], K: [152, 100], t: [159, 115], b: 'U', a: 'Up' },
      ud: { e: [129, 132], K: [116, 132], t: [130, 139], b: 'U', a: 'Up' },
      ai: { e: [140, 209], K: [140, 222], t: [147, 210], b: 'L', a: 'Lp' },
      ad: { e: [112, 203], K: [108, 214], t: [118, 207], b: 'L', a: 'Lp' },
    };
    const KAD = ['ui', 'ud', 'ai', 'ad'];
    const ALV = (K) => { const [x, y] = K; return [ [x - 6.5, y + 4], [x + 6.5, y + 4], [x, y - 7] ]; };
    /* kapiller: uç arter dalından başlayıp kümenin çevresini dolanan kıvrımlı yay */
    function kapYol(q) {
      const { K, t, e } = q;
      const a0 = Math.atan2(t[1] - K[1], t[0] - K[0]), ab = Math.atan2(e[1] - K[1], e[0] - K[0]);
      let d = a0 - ab; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
      const s = d >= 0 ? 1 : -1, sw = (110 * Math.PI) / 180, r0 = Math.hypot(t[0] - K[0], t[1] - K[1]);
      const pts = [];
      for (let i = 0; i <= 28; i++) { const f = i / 28, a = a0 + s * sw * f, r = lerp(r0, 15, Math.min(1, f * 4)) + 1.8 * Math.sin(f * Math.PI * 6); pts.push([K[0] + r * Math.cos(a), K[1] + r * Math.sin(a)]); }
      return pts;
    }
    const pD = (l, pts) => pts.map((p, i) => (i ? 'L' : 'M') + ps(P(l, p))).join(' ');
    const seg = (l, a, b, cls, w, extra = '') => `<line class="${cls}" x1="${X(l, a[0])}" y1="${a[1]}" x2="${X(l, b[0])}" y2="${b[1]}" style="--w:${w}" ${extra}/>`;
    const kapanma = (l, q) => {
      const a = G[q.b], e = q.e, dx = e[0] - a[0], dy = e[1] - a[1], n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n;
      const p = [a[0] + dx * 0.8, a[1] + dy * 0.8];
      return [-1.9, 1.9].map((o) => { const c = [p[0] + ux * o, p[1] + uy * o]; return `<line x1="${X(l, c[0] - uy * 4.5).toFixed(1)}" y1="${(c[1] + ux * 4.5).toFixed(1)}" x2="${X(l, c[0] + uy * 4.5).toFixed(1)}" y2="${(c[1] - ux * 4.5).toFixed(1)}"/>`; }).join('');
    };
    const kapNokta = (l, q) => { const a = G[q.b], e = q.e; return P(l, [a[0] + (e[0] - a[0]) * 0.8, a[1] + (e[1] - a[1]) * 0.8]); };
    const orta = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const aci = (a, b) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;

    function akciger(l) {
      const fb = orta(G.L, KUME.ad.e), pih = orta(G.Mp, G.Lp), tx = orta(G.C, G.M);
      let s = `<g data-p="pl"><path class="f15-ne-pfill" data-l="${l}" d="${ayna(l, AKC)}" transform="${PAR_T(l)}"/>
        <path class="f15-ne-par" d="${ayna(l, AKC)}" transform="${PAR_T(l)}"/></g>`;
      s += `<g class="f15-ne-akc" data-l="${l}" style="transform-origin:${X(l, 190)}px 110px">`;
      s += `<g data-p="pl"><path class="f15-ne-vis" d="${ayna(l, AKC)}"/></g>`;
      /* pulmoner arter dalları */
      s += `<g data-p="pa">${seg(l, G.S, G.Mp, 'f15-ne-pa', 5)}${seg(l, G.Mp, G.Up, 'f15-ne-pa', 3)}${seg(l, G.Mp, G.Lp, 'f15-ne-pa', 3)}`;
      KAD.forEach((k) => { const q = KUME[k]; s += seg(l, G[q.a], q.t, 'f15-ne-pa f15-ne-pat', 2.5, `data-c="${l}${k}"`); });
      KAD.forEach((k) => { s += `<path class="f15-ne-kap" data-c="${l}${k}" d="${pD(l, kapYol(KUME[k]))}"/>`; });
      if (!l) s += `<ellipse class="f15-ne-mod f15-ne-pih" data-m="pe" cx="${pih[0]}" cy="${pih[1]}" rx="5.5" ry="3.8" transform="rotate(${aci(G.Mp, G.Lp).toFixed(0)} ${pih[0]} ${pih[1]})"/>`;
      s += '</g>';
      /* bronşlar */
      s += `<g data-p="br">${seg(l, G.C, G.M, 'f15-ne-br', 7)}${seg(l, G.M, G.U, 'f15-ne-br', 5)}${seg(l, G.M, G.L, 'f15-ne-br', 5)}`;
      KAD.forEach((k) => { const q = KUME[k]; s += seg(l, G[q.b], q.e, 'f15-ne-br', 3); });
      s += `<g class="f15-ne-mod f15-ne-kpn" data-m="yas obe">${kapanma(l, KUME.ai)}${kapanma(l, KUME.ad)}</g>`;
      if (!l) s += `<ellipse class="f15-ne-mod f15-ne-yc" data-m="yab" cx="${fb[0]}" cy="${fb[1]}" rx="4.6" ry="3.2" transform="rotate(${aci(G.L, KUME.ad.e).toFixed(0)} ${fb[0]} ${fb[1]})"/>`;
      if (l) s += `<g class="f15-ne-mod f15-ne-x" data-m="tav"><path d="M${X(1, tx[0]) - 6} ${tx[1] - 6} l12 12 M${X(1, tx[0]) + 6} ${tx[1] - 6} l-12 12"/></g>`;
      s += '</g>';
      /* alveoller */
      s += '<g data-p="alv">';
      KAD.forEach((k) => ALV(KUME[k].K).forEach((p, j) => { const q = P(l, p); s += `<circle class="f15-ne-alv" data-a="${l}${k}${j}" cx="${q[0]}" cy="${q[1]}" r="6"/>`; }));
      if (l) { const q = P(1, KUME.ui.K); s += `<circle class="f15-ne-mod f15-ne-amf" data-m="amf" cx="${q[0]}" cy="${q[1]}" r="13"/>`; }
      s += '</g></g>';
      return s;
    }
    function haritaSvg() {
      const at = orta(G.C, G.M), hp = '200 247';
      let s = `<defs><pattern id="f15-ne-tar-${id}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" style="fill:var(--paper)"/><line x1="0" y1="0" x2="0" y2="4" style="stroke:var(--crit);stroke-width:1.8"/></pattern></defs>`;
      s += `<g class="f15-ne-harita">`;
      s += akciger(0) + akciger(1);
      /* üst hava yolu + trakea (iki çizgili tüp) */
      s += `<g data-p="ua"><line class="f15-ne-tdis" x1="200" y1="14" x2="200" y2="44" style="stroke-width:24"/><line class="f15-ne-tic" x1="200" y1="15.5" x2="200" y2="44" style="stroke-width:20"/>
        <g class="f15-ne-mod f15-ne-dar" data-m="ua"><path d="M190 17 Q199.5 29 190 41 Z"/><path d="M210 17 Q200.5 29 210 41 Z"/></g></g>`;
      s += `<g data-p="br"><line class="f15-ne-tdis" x1="200" y1="44" x2="200" y2="101" style="stroke-width:18"/><line class="f15-ne-tic" x1="200" y1="44" x2="200" y2="101" style="stroke-width:14"/></g>`;
      /* kalp, perikard, pulmoner arter gövdesi */
      s += `<g data-p="per"><ellipse class="f15-ne-mod f15-ne-sivi" data-m="tam" cx="200" cy="247" rx="41" ry="35"/><ellipse class="f15-ne-perl" cx="200" cy="247" rx="41" ry="35"/></g>`;
      s += `<g data-p="kalp"><g class="f15-ne-kalp" style="transform-origin:200px 247px"><ellipse class="f15-ne-kalp-z" cx="200" cy="247" rx="35" ry="29"/>
        <path class="f15-ne-sv" d="M200 218 A35 29 0 0 0 200 276 Z" style="transform-origin:200px 247px"/>
        <ellipse class="f15-ne-mod f15-ne-enf" data-m="sve" cx="171" cy="247" rx="6" ry="16" style="fill:url(#f15-ne-tar-${id})"/>
        <text class="f15-ne-et f15-ne-svt" x="186" y="252" text-anchor="middle">SV</text></g></g>`;
      s += `<g data-p="pa"><path class="f15-ne-pa" d="M189 226 L196 207 L200 194" style="--w:8"/></g>`;
      /* genel etiketler */
      const et = (p, x, y, t, a, ok) => `<g class="f15-ne-etg" data-p="${p}">${ok ? `<line class="f15-ne-ok" x1="${ok[0]}" y1="${ok[1]}" x2="${ok[2]}" y2="${ok[3]}"/>` : ''}<text class="f15-ne-et f15-hale" x="${x}" y="${y}" text-anchor="${a}">${t}</text></g>`;
      s += et('ua', 174, 33, 'üst hava yolu', 'end');
      s += et('br', 176, 66, 'bronş', 'end', [178, 69, 189, 111]);
      s += et('alv', 324, 136, 'alveoller', 'start', [321, 132, 299, 132]);
      s += et('pl', 324, 196, 'plevra', 'start', [321, 192, 314, 190]);
      s += et('kalp', 200, 298, 'sağ ventrikül', 'middle', [186, 287, 186, 273]);
      s += et('per', 246, 285, 'perikard', 'start', [244, 280, 233, 274]);
      /* vurgu halkaları */
      const hl = (k, inner) => `<g class="f15-ne-hl" data-r="${k}">${inner}</g>`;
      const ci = (p, r) => `<circle cx="${p[0]}" cy="${p[1]}" r="${r}"/>`;
      const fb = orta(G.L, KUME.ad.e), pih = orta(G.Mp, G.Lp);
      s += hl('ua', '<ellipse cx="200" cy="29" rx="21" ry="19"/>');
      s += hl('yab', ci(fb, 10));
      s += hl('pno', ci(P(1, KUME.ad.K), 18));
      s += hl('ptx', `<path d="${ayna(1, AKC)}" transform="${PAR_T(1)}" style="vector-effect:non-scaling-stroke"/>`);
      s += hl('atl', ci(KUME.ai.K, 18));
      s += hl('ards', ci(KUME.ui.K, 16) + ci(KUME.ad.K, 16) + ci(P(1, KUME.ud.K), 16) + ci(P(1, KUME.ai.K), 16));
      s += hl('amf', ci(P(1, KUME.ui.K), 18));
      s += hl('tav', ci(P(1, at), 11));
      const kp = [0, 1].flatMap((l) => [kapNokta(l, KUME.ai), kapNokta(l, KUME.ad)]).map((p) => ci(p, 8)).join('');
      s += hl('yas', kp) + hl('obe', kp);
      s += hl('pe', ci(pih, 10));
      const svh = '<path d="M200 218 A35 29 0 0 0 200 276 Z"/>';
      s += hl('hip', svh) + hl('sve', svh) + hl('tam', '<ellipse cx="200" cy="247" rx="41" ry="35"/>');
      /* kısa etiket */
      s += '<g class="f15-ne-pil" aria-hidden="true"><line class="f15-ne-pok"/><rect rx="6"/><text></text></g>';
      s += '</g>';
      return s;
    }
    /* yakın görünüm + ölçek: geniş ve dar ölçüler */
    const ZG = { bx: 420, by: 30, bw: 210, bh: 246, cx: 525, a0: 38, a1: 62, ay: 115, ar: 46, kap: 'M434 182 C480 182 490 170 525 170 C560 170 570 182 616 182', k0: 434, k1: 616, mv: [434, 200], cik: [616, 214], kanyok: [616, 214], t1: [525, 240], t2: [525, 264], bas: [[525, 22, 'Yakın görünüm: alveol ve kapiller']],
      o: { x0: 40, x1: 600, y: 330, ly: 360, uy: 360 } };
    const ZD = { bx: 6, by: 6, bw: 188, bh: 160, cx: 100, a0: 12, a1: 30, ay: 68, ar: 30, kap: 'M16 122 C60 122 70 111 100 111 C130 111 140 122 184 122', k0: 16, k1: 184, mv: [16, 141], cik: [184, 158], kanyok: [184, 158], t1: [300, 92], t2: [300, 122], bas: [[300, 26, 'Yakın görünüm:'], [300, 44, 'alveol ve kapiller']],
      o: { x0: 14, x1: 386, y: 200, ly: 230, uy: 256 } };
    function zoomSvg(Z) {
      const o = Z.o, W = o.x1 - o.x0, xa = (f) => o.x0 + W * f;
      let s = `<defs><linearGradient id="f15-ne-kg-${id}" gradientUnits="userSpaceOnUse" x1="${Z.k0}" y1="0" x2="${Z.k1}" y2="0">
          <stop offset="0" style="stop-color:var(--c-basic)"/><stop offset=".3" style="stop-color:var(--c-basic)"/><stop class="f15-ne-kgs" offset=".72"/><stop class="f15-ne-kgs" offset="1"/></linearGradient></defs>`;
      s += `<g class="f15-ne-zoom">`;
      Z.bas.forEach(([x, y, t]) => (s += `<text class="f15-sm f15-ne-zbas" x="${x}" y="${y}" text-anchor="middle">${t}</text>`));
      s += `<rect class="f15-ne-zkut" x="${Z.bx}" y="${Z.by}" width="${Z.bw}" height="${Z.bh}" rx="10"/>`;
      s += `<circle class="f15-ne-zalv" cx="${Z.cx}" cy="${Z.ay}" r="${Z.ar}"/>`;
      s += `<text class="f15-sm f15-ne-zyok" x="${Z.cx}" y="${Z.ay + 4}" text-anchor="middle">ventilasyon yok</text>`;
      s += `<g class="f15-ne-zok"><line x1="${Z.cx}" y1="${Z.by + Z.a0 - Z.by + 0}" x2="${Z.cx}" y2="${Z.a1}"/><path d="${okBasi(Z.cx, Z.a1 + 9, 'a', 9, 11)}"/></g>`;
      s += `<g class="f15-ne-zx"><path d="M${Z.cx - 7} ${(Z.a0 + Z.a1) / 2 - 7} l14 14 M${Z.cx + 7} ${(Z.a0 + Z.a1) / 2 - 7} l-14 14"/></g>`;
      s += `<path class="f15-ne-zkap" d="${Z.kap}" style="stroke:url(#f15-ne-kg-${id})"/>`;
      s += `<text class="f15-sm f15-ne-zmv" x="${Z.mv[0]}" y="${Z.mv[1]}">miks venöz</text>`;
      s += `<text class="f15-sm f15-ne-zcik" x="${Z.cik[0]}" y="${Z.cik[1]}" text-anchor="end"></text>`;
      s += `<text class="f15-sm f15-ne-zt1" x="${Z.t1[0]}" y="${Z.t1[1]}" text-anchor="middle"></text>`;
      s += `<text class="f15-ne-zt2" x="${Z.t2[0]}" y="${Z.t2[1]}" text-anchor="middle"></text>`;
      s += '</g>';
      /* V̇/Q̇ ölçeği */
      s += `<g class="f15-ne-olcek">`;
      s += `<clipPath id="f15-ne-cl-${id}"><rect x="${xa(0)}" y="${o.y}" width="${W}" height="14" rx="7"/></clipPath><g style="clip-path:url(#f15-ne-cl-${id})">`;
      s += `<rect class="f15-ne-bnt" x="${xa(0)}" y="${o.y}" width="${W * 0.42}" height="14" style="fill:var(--warn)"/>`;
      s += `<rect class="f15-ne-bnt" x="${xa(0.42)}" y="${o.y}" width="${W * 0.16}" height="14" style="fill:var(--ok)"/>`;
      s += `<rect class="f15-ne-bnt" x="${xa(0.58)}" y="${o.y}" width="${W * 0.42}" height="14" style="fill:var(--c-clin)"/></g>`;
      s += `<text class="f15-sm" x="${xa(0.21)}" y="${o.ly}" text-anchor="middle">düşük</text><text class="f15-sm f15-ne-ort" x="${xa(0.5)}" y="${o.ly}" text-anchor="middle">0,8 · ortalama</text><text class="f15-sm" x="${xa(0.79)}" y="${o.ly}" text-anchor="middle">yüksek</text>`;
      const uc = (k, x, a, t) => `<g class="f15-ne-uc" data-k="${k}" role="button" tabindex="0" aria-pressed="false" aria-label="${t}"><rect/><text class="f15-sm" x="${x}" y="${o.uy}" text-anchor="${a}" data-a="${a}">${t}</text></g>`;
      s += uc('sant', xa(0), 'start', '0 · şant') + uc('olu', xa(1), 'end', '∞ · ölü boşluk');
      s += `<g class="f15-ne-isk"><path d="M-7 ${o.y - 15} L7 ${o.y - 15} L0 ${o.y - 3} Z"/></g>`;
      s += `<g class="f15-ne-isk2"><path d="M${xa(0) - 6} ${o.y - 14} L${xa(0) + 6} ${o.y - 14} L${xa(0)} ${o.y - 3} Z"/><text class="f15-sm" x="${xa(0) + 10}" y="${o.y - 21}">tümüyle dolu / tümüyle tıkalıysa</text></g>`;
      s += '</g>';
      return s;
    }

    el.innerHTML = `<div class="f15-ne">
        <div class="f15-ne-cip">
          <div class="f15-ne-sat" style="--k:var(--warn)" role="group" aria-label="Ventilasyon sorunu, V̇/Q̇ düşer"><span class="f15-ne-gb">Ventilasyon sorunu · V̇/Q̇ ↓</span>${SA.map(([k, ad]) => `<button type="button" data-k="${k}" aria-pressed="false">${ad}</button>`).join('')}</div>
          <div class="f15-ne-sat" style="--k:var(--c-clin)" role="group" aria-label="Perfüzyon sorunu, V̇/Q̇ yükselir"><span class="f15-ne-gb">Perfüzyon sorunu · V̇/Q̇ ↑</span><button type="button" data-k="pe" aria-pressed="false">Pulmoner emboli</button><span class="f15-ne-ara">sağ ventrikül atım hacmi ↓:</span>${SB.slice(1).map(([k, ad]) => `<button type="button" data-k="${k}" aria-pressed="false">${ad}</button>`).join('')}</div>
        </div>
        <div class="f15-ne-sahne"></div>
        <div class="f15-lej" aria-hidden="true"><span style="--k:var(--c-clin)"><i></i>hava yolu</span><span class="nokta" style="--k:var(--c-clin)"><i></i>alveol</span><span data-p="pa" style="--k:var(--c-basic)"><i></i>pulmoner arter</span><span style="--k:var(--crit)"><i></i>kapiller</span></div>
      </div>`;
    const root = el.querySelector('.f15-ne'), sahne = el.querySelector('.f15-ne-sahne');
    if (RM) root.classList.add('f15-rm');
    let sec = null, dar = false;
    const ARIA = 'V̇/Q̇ uyumsuzluğu nedenlerinin hava yolu, akciğer ve kalp üzerindeki yerleri ve V̇/Q̇ ölçeğindeki yönleri';
    function kur() {
      if (dar) {
        sahne.innerHTML = `<svg class="f15-svg f15-ne-svg" viewBox="10 4 400 300" role="img" aria-label="${ARIA}">${haritaSvg()}</svg>
          <svg class="f15-svg f15-ne-svg2" viewBox="0 0 400 264" role="group" aria-label="Yakın görünüm ve V̇/Q̇ ölçeği">${zoomSvg(ZD)}</svg>`;
      } else {
        sahne.innerHTML = `<svg class="f15-svg f15-ne-svg" viewBox="0 0 640 390" role="group" aria-label="${ARIA}">${haritaSvg()}${zoomSvg(ZG)}</svg>`;
      }
      el.querySelectorAll('.f15-ne-uc').forEach((g) => {
        const t = g.querySelector('text'), r = g.querySelector('rect');
        let b; try { b = t.getBBox(); } catch (e) { b = null; }
        if (!b || !b.width) { const fs = dar ? 13.5 : 11.5, w = t.textContent.length * fs * 0.58, x = +t.getAttribute('x'), a = t.dataset.a; b = { x: a === 'end' ? x - w : x, y: +t.getAttribute('y') - fs, width: w, height: fs * 1.2 }; }
        r.setAttribute('x', (b.x - 7).toFixed(1)); r.setAttribute('y', (b.y - 4).toFixed(1));
        r.setAttribute('width', (b.width + 14).toFixed(1)); r.setAttribute('height', (b.height + 8).toFixed(1)); r.setAttribute('rx', 7);
      });
      uygula();
    }
    const ALVD = (k) => {
      const D = {};
      const her = (l, kume, c) => [0, 1, 2].forEach((j) => (D[`${l}${kume}${j}`] = c));
      if (k === 'ua') [0, 1].forEach((l) => KAD.forEach((q) => her(l, q, 'sol')));
      if (k === 'yab') her(0, 'ad', 'sol');
      if (k === 'pno') her(1, 'ad', 'dolu');
      if (k === 'atl') her(0, 'ai', 'yassi');
      if (k === 'ards') { D['0ui0'] = 'dolu'; D['0ad1'] = 'yassi'; D['1ud2'] = 'dolu'; D['1ai0'] = 'yassi'; }
      if (k === 'amf') her(1, 'ui', 'gizli');
      if (k === 'tav') KAD.forEach((q) => her(1, q, 'sol'));
      if (k === 'yas' || k === 'obe') [0, 1].forEach((l) => ['ai', 'ad'].forEach((q) => her(l, q, 'sol')));
      return D;
    };
    const ZMET = {
      n: ['V̇ normal · Q̇ normal', 'V̇/Q̇ ≈ 0,8', 'oksijenlenmiş', 'var(--crit)'],
      v: ['V̇ ↓ · Q̇ normal', 'V̇/Q̇ ↓', 'tam oksijenlenmemiş', 'color-mix(in srgb, var(--crit) 40%, var(--c-basic))'],
      q: ['V̇ normal · Q̇ ↓', 'V̇/Q̇ ↑', 'oksijenlenmiş', 'var(--crit)'],
      s: ['V̇ yok · Q̇ normal', 'V̇/Q̇ = 0', 'oksijenlenmemiş', 'var(--c-basic)'],
      o: ['V̇ normal · Q̇ yok', 'V̇/Q̇ → ∞', 'kan yok', 'var(--crit)'],
    };
    function pil(k) {
      const g = el.querySelector('.f15-ne-pil'); if (!g) return;
      const K = k && KISA[k];
      g.classList.toggle('on', !!K);
      if (!K) return;
      const [sat, [x, y], a, ok] = K, t = g.querySelector('text'), r = g.querySelector('rect'), ln = g.querySelector('line');
      const lh = dar ? 16 : 14;
      t.setAttribute('text-anchor', a);
      t.innerHTML = sat.map((s, i) => `<tspan x="${x}" y="${y + i * lh}">${s}</tspan>`).join('');
      let b; try { b = t.getBBox(); } catch (e) { b = null; }
      if (!b || !b.width) { const fs = dar ? 14 : 12, w = Math.max(...sat.map((s) => s.length)) * fs * 0.6; b = { x: a === 'end' ? x - w : a === 'middle' ? x - w / 2 : x, y: y - fs, width: w, height: fs * 1.25 + (sat.length - 1) * lh }; }
      r.setAttribute('x', (b.x - 6).toFixed(1)); r.setAttribute('y', (b.y - 3).toFixed(1));
      r.setAttribute('width', (b.width + 12).toFixed(1)); r.setAttribute('height', (b.height + 6).toFixed(1));
      if (ok) { ln.setAttribute('x1', ok[0]); ln.setAttribute('y1', ok[1]); ln.setAttribute('x2', ok[2]); ln.setAttribute('y2', ok[3]); ln.style.display = ''; } else ln.style.display = 'none';
    }
    function uygula() {
      const k = sec, g = k ? BIL[k].g : null, ilgi = k ? ILGI[k] : null;
      el.querySelectorAll('[data-k]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
      root.dataset.g = g || '';
      el.querySelectorAll('[data-p]').forEach((p) => { const on = !!ilgi && ilgi.includes(p.dataset.p); p.classList.toggle('on', on); p.classList.toggle('dim', !!ilgi && !on); });
      const D = ALVD(k);
      el.querySelectorAll('.f15-ne-alv').forEach((a) => a.setAttribute('class', 'f15-ne-alv' + (D[a.dataset.a] ? ' ' + D[a.dataset.a] : '')));
      el.querySelectorAll('[data-m]').forEach((m) => m.classList.toggle('on', !!k && m.dataset.m.split(' ').includes(k)));
      el.querySelectorAll('[data-r]').forEach((m) => m.classList.toggle('on', m.dataset.r === k));
      el.querySelectorAll('.f15-ne-kap, .f15-ne-pat').forEach((c) => c.classList.toggle('kesik', k === 'pe' && (c.dataset.c === '0ai' || c.dataset.c === '0ad')));
      const h = el.querySelector('.f15-ne-harita');
      if (h) h.classList.toggle('yari', k === 'hip' || k === 'sve' || k === 'tam');
      el.querySelectorAll('.f15-ne-akc').forEach((a) => a.classList.toggle('kuc', k === 'ptx' && a.dataset.l === '1'));
      el.querySelectorAll('.f15-ne-pfill').forEach((a) => a.classList.toggle('on', k === 'ptx' && a.dataset.l === '1'));
      el.querySelectorAll('.f15-ne-kalp').forEach((a) => a.classList.toggle('kuc', k === 'tam'));
      el.querySelectorAll('.f15-ne-sv').forEach((a) => a.classList.toggle('kuc', k === 'hip'));
      /* yakın görünüm */
      const zm = ZMET[g || 'n'];
      el.querySelectorAll('.f15-ne-zt1').forEach((t) => (t.textContent = zm[0]));
      el.querySelectorAll('.f15-ne-zt2').forEach((t) => (t.textContent = zm[1]));
      el.querySelectorAll('.f15-ne-zcik').forEach((t) => (t.textContent = zm[2]));
      el.querySelectorAll('.f15-ne-kgs').forEach((s) => (s.style.stopColor = zm[3]));
      /* ölçek işaretçisi */
      const o = dar ? ZD.o : ZG.o, f = { v: 0.21, q: 0.79, s: 0, o: 1 }[g];
      const xi = o.x0 + (o.x1 - o.x0) * (f === undefined ? 0.5 : f);
      el.querySelectorAll('.f15-ne-isk').forEach((p) => (p.style.transform = `translateX(${xi.toFixed(1)}px)`));
      el.querySelectorAll('.f15-ne-isk2').forEach((p) => p.classList.toggle('on', k === 'pno' || k === 'tav'));
      pil(k);
      cap.yaz(capMetni(k));
    }
    const sec2 = (k) => { sec = sec === k ? null : k; uygula(); };
    const tik = (e) => { const b = e.target.closest('[data-k]'); if (b && el.contains(b)) sec2(b.dataset.k); };
    const tus = (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('.f15-ne-uc')) { e.preventDefault(); sec2(e.target.closest('.f15-ne-uc').dataset.k); } };
    el.addEventListener('click', tik);
    el.addEventListener('keydown', tus);
    const birak = genislik(el, [600], (d) => { dar = d > 0; root.classList.toggle('f15-dar', dar); kur(); });
    /* yazı tipleri geç yüklenirse çip kutularını yeniden ölç */
    let fontBekle = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (fontBekle) kur(); });
    return () => { fontBekle = false; birak(); el.removeEventListener('click', tik); el.removeEventListener('keydown', tus); };
  };
})();

