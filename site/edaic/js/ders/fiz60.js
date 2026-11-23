/* Bölüm 60 · Ağrı fizyolojisi · bileşenler (tarif: docs/tasarim/fiz60.md; K1 s. 272–275).
   Şematik modeller; sayılar yalnız kitaptaki değerlerdir, diğerleri nitel/temsilîdir (viz-foot'ta belirtilir). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const CSSK = { fill: 1, stroke: 1, 'stop-color': 1 };
  const mk = (tag, a, p) => {
    const e = document.createElementNS(NS, tag);
    for (const k in a) { const v = a[k]; if (CSSK[k] && String(v).indexOf('var(') >= 0) e.style.setProperty(k, v); else e.setAttribute(k, v); }
    if (p) p.appendChild(e);
    return e;
  };
  const svgIn = (host, w, h, label) => mk('svg', { viewBox: `0 0 ${w} ${h}`, class: 'f60-svg', role: 'img', 'aria-label': label }, host);
  const tx = (p, x, y, s, cls, anc) => {
    const t = mk('text', { x, y, class: 'f60-t ' + (cls || ''), 'text-anchor': anc || 'start' }, p);
    String(s).split('\n').forEach((l, i) => { const sp = mk('tspan', { x, dy: i ? '1.18em' : 0 }, t); sp.textContent = l; });
    return t;
  };
  const wrap = (s, n) => {
    const out = []; let cur = '';
    String(s).split(' ').forEach((w) => { if (cur && (cur + ' ' + w).length > n) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; });
    if (cur) out.push(cur);
    return out;
  };
  const H = (tag, cls, html, parent) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; };
  const pts = (a) => a.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  // yol üzerinde konum (0..1)
  const Yol = (a) => {
    const L = [0]; for (let i = 1; i < a.length; i++) L.push(L[i - 1] + Math.hypot(a[i][0] - a[i - 1][0], a[i][1] - a[i - 1][1]));
    const T = L[L.length - 1] || 1;
    return { a, T, at(f) { f = clamp(f, 0, 1); const d = f * T; let i = 1; while (i < L.length - 1 && L[i] < d) i++; const k = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return [lerp(a[i - 1][0], a[i][0], k), lerp(a[i - 1][1], a[i][1], k)]; } };
  };
  const arrow = (p, x1, y1, x2, y2, col, w) => {
    const g = mk('g', {}, p); const an = Math.atan2(y2 - y1, x2 - x1), s = 7;
    mk('line', { x1, y1, x2: x2 - Math.cos(an) * 3, y2: y2 - Math.sin(an) * 3, stroke: col, 'stroke-width': w || 2 }, g);
    mk('path', { d: `M${x2} ${y2} L${x2 - s * Math.cos(an - 0.45)} ${y2 - s * Math.sin(an - 0.45)} L${x2 - s * Math.cos(an + 0.45)} ${y2 - s * Math.sin(an + 0.45)}Z`, fill: col }, g);
    return g;
  };
  const capper = (el) => {
    const c = el.closest('.viz').querySelector('.viz-cap'); const def = c.innerHTML;
    return { set: (h) => { c.innerHTML = REF(h); }, reset: () => { c.innerHTML = def; } };
  };
  const press = (root, sel, val, attr) => root.querySelectorAll(sel).forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute(attr) === String(val))));
  const seg = (parent, label, key, opts, cur) => {
    const d = H('div', 'seg', opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join(''), parent);
    d.setAttribute('role', 'group'); d.setAttribute('aria-label', label); return d;
  };
  const clickable = (g, label, fn) => {
    g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', label); g.classList.add('f60-clk');
    g.addEventListener('click', fn); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } });
  };
  // genişliğe göre geniş / dar yerleşim; durum S dışarıda tutulur
  function mount(el, make) {
    let narrow = null, inst = null;
    el.classList.add('f60-root');
    const rebuild = (force) => {
      if (!el.clientWidth) return;
      const n = el.clientWidth < 560;
      if (force !== true && n === narrow && inst) return;
      narrow = n; if (inst && inst.stop) inst.stop();
      el.innerHTML = ''; el.classList.toggle('f60-dar', n); inst = make(n) || {};
    };
    rebuild();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => rebuild()) : null; if (ro) ro.observe(el);
    const stopT = ticker(el, (dt) => { if (inst && inst.tick) inst.tick(dt); });
    const stop = () => { stopT(); if (ro) ro.disconnect(); if (inst && inst.stop) inst.stop(); };
    stop.rebuild = () => rebuild(true);
    return stop;
  }
  // omurilik kesiti (f60_yol ve f60_inen ortak çizimi): cx, ust = beyaz madde üst kenarı
  function omurilik(p, cx, ust, idp) {
    const cy = ust + 78, g = mk('g', {}, p);
    mk('ellipse', { cx, cy, rx: 108, ry: 78, fill: 'var(--paper)', stroke: 'var(--line)', 'stroke-width': 2 }, g);
    const d = `M${cx - 14} ${cy - 30} L${cx - 30} ${cy - 58} Q${cx - 50} ${cy - 68} ${cx - 70} ${cy - 58} L${cx - 68} ${cy - 28} L${cx - 84} ${cy - 8} Q${cx - 92} ${cy + 12} ${cx - 74} ${cy + 24} L${cx - 48} ${cy + 28} L${cx - 14} ${cy + 20} L${cx + 14} ${cy + 20} L${cx + 48} ${cy + 28} L${cx + 74} ${cy + 24} Q${cx + 92} ${cy + 12} ${cx + 84} ${cy - 8} L${cx + 68} ${cy - 28} L${cx + 70} ${cy - 58} Q${cx + 50} ${cy - 68} ${cx + 30} ${cy - 58} L${cx + 14} ${cy - 30}Z`;
    mk('path', { d, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
    mk('circle', { cx, cy: cy - 14, r: 3.5, fill: 'var(--paper)', stroke: 'var(--line)' }, g);
    return { cy, d, horn: [cx - 52, cy - 40], hornR: [cx + 52, cy - 40], kom: [cx, cy + 4] };
  }

  /* ================= 1 · Ağrının sınıfları ================= */
  VIZ.f60_sinif = (el) => {
    const cap = capper(el); const S = { sel: null };
    const CP = {
      akut: '<b>Akut ağrı.</b> Geleneksel olarak 12 haftadan kısa süren ağrı; bu keyfî sınır bugün kullanılmıyor. [[K1 s. 272]]',
      kronik: '<b>Kronik ağrı.</b> Eskiden 12 haftadan uzun; bugün doku hasarından sonra beklenen iyileşme süresini aşan ağrı. [[K1 s. 272]]',
      nosi: '<b>Nosiseptif ağrı.</b> Nosiseptörlerin uyarılmasıyla oluşur; yüzeyel, derin ve visseral diye ayrılır. [[K1 s. 272]]',
      yuz: '<b>Yüzeyel (kutanöz) ağrı.</b> Deri hasarından; keskin ve iyi lokalize. [[K1 s. 272]]',
      derin: '<b>Derin ağrı.</b> Kas, tendon ve ligamentlerden; künt, sızlayan, kötü lokalize. [[K1 s. 272]]',
      visc: '<b>Visseral ağrı.</b> İç organlardan, ör. içi boş organın spazmı ya da aşırı gerilmesi; künt, yaygın, kötü lokalize. [[K1 s. 272]]',
      nor: '<b>Nöropatik ağrı.</b> Nöronların kendi hasarından doğar; ayrıntısı bölüm sonunda. [[K1 s. 272, 275]]',
    };
    return mount(el, (N) => {
      const W = N ? 360 : 680, svg = svgIn(el, W, 100, 'Ağrının sınıflaması: süreye göre akut ve kronik; kaynağına göre nosiseptif (yüzeyel, derin, visseral) ve nöropatik');
      const rects = {};
      const box = (x, y, w, id, name, sub, o) => {
        o = o || {};
        const rw = w - (o.mark ? 46 : 18), lines = [];
        (sub || []).forEach(([s, c]) => wrap(s, Math.floor(rw / 6.3)).forEach((l) => lines.push([l, c])));
        const h = 28 + lines.length * 15 + 8;
        const g = mk('g', {}, svg), r = mk('rect', { x, y, width: w, height: h, rx: 10, class: 'f60-bx' }, g);
        mk('rect', { x: x + 1, y: y + 6, width: 5, height: h - 12, rx: 2.5, fill: o.strip || 'var(--line)' }, g);
        tx(g, x + 16, y + 21, name, 'f60-b');
        lines.forEach(([l, c], i) => tx(g, x + 16, y + 39 + i * 15, l, 'f60-s ' + (c || '')));
        if (o.mark) mk('circle', { cx: x + w - 24, cy: y + h / 2, r: o.mark, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-width': 1.5, 'stroke-dasharray': o.mark > 5 ? '3 3' : '0' }, g);
        if (id) { rects[id] = r; clickable(g, name, () => pick(id)); }
        return h;
      };
      const head = (x, y, s) => tx(svg, x, y, s, 'f60-m f60-b');
      const root = mk('g', {}, svg); const rx0 = W / 2 - 60;
      mk('rect', { x: rx0, y: 4, width: 120, height: 34, rx: 17, class: 'f60-bx' }, root); tx(root, W / 2, 26, 'Ağrı', 'f60-b', 'middle');
      clickable(root, 'Ağrı', () => pick(null)); rects.root = root.firstChild;
      let y1, y2;
      const SUR = [['akut', 'Akut', [['eski tanım: < 12 hafta', 'f60-old']], { strip: 'var(--c-basic)' }], ['kronik', 'Kronik', [['eski: > 12 hafta', 'f60-old'], ['bugün: beklenen iyileşme süresini aşan ağrı', '']], { strip: 'var(--c-basic)' }]];
      const KAY = (x, w, y) => {
        y += box(x, y, w, 'nosi', 'Nosiseptif', [['nosiseptörlerin uyarılması', '']], { strip: 'var(--c-clin)' }) + 8;
        y += box(x + 20, y, w - 20, 'yuz', 'Yüzeyel (kutanöz)', [['deri hasarı · keskin, iyi lokalize', '']], { strip: 'var(--c-clin)', mark: 3.5 }) + 8;
        y += box(x + 20, y, w - 20, 'derin', 'Derin', [['kas, tendon, ligament · künt, sızlayan, kötü lokalize', '']], { strip: 'var(--c-clin)', mark: 8 }) + 8;
        y += box(x + 20, y, w - 20, 'visc', 'Visseral', [['iç organlar · künt, yaygın, kötü lokalize · ör. içi boş organın spazmı ya da aşırı gerilmesi', '']], { strip: 'var(--c-clin)', mark: 12 }) + 8;
        y += box(x, y, w, 'nor', 'Nöropatik', [['nöronların kendi hasarı', ''], ['→ Bölüm sonu: nöropatik ağrı', 'f60-link']], { strip: 'var(--c-clin)' }) + 8;
        return y;
      };
      const SURF = (x, w, y) => { SUR.forEach(([id, n, s, o]) => { y += box(x, y, w, id, n, s, o) + 8; }); return y; };
      if (!N) {
        mk('path', { d: `M${W / 2} 38 V50 H150 V58 M${W / 2} 50 H510 V58`, fill: 'none', stroke: 'var(--line)', 'stroke-width': 2 }, svg);
        head(0, 74, 'SÜREYE GÖRE'); head(350, 74, 'KAYNAĞINA GÖRE');
        y1 = SURF(0, 300, 82); y2 = KAY(350, 330, 82);
      } else {
        head(0, 62, 'SÜREYE GÖRE'); y1 = SURF(0, 360, 70);
        head(0, y1 + 20, 'KAYNAĞINA GÖRE'); y2 = KAY(0, 360, y1 + 28);
      }
      const hh = Math.max(y1, y2); svg.setAttribute('viewBox', `0 0 ${W} ${Math.ceil(hh)}`);
      function pick(id) {
        S.sel = S.sel === id ? null : id;
        Object.keys(rects).forEach((k) => rects[k].classList.toggle('f60-sel', k === S.sel));
        if (S.sel) cap.set(CP[S.sel]); else cap.reset();
      }
      if (S.sel) { const s = S.sel; S.sel = null; pick(s); }
    });
  };

  /* ================= 2 · Hasar, aracılar, iki hızda ağrı ================= */
  VIZ.f60_lifler = (el) => {
    const cap = capper(el);
    const S = { t: RM ? 99 : -1, run: false, d: 0.6, cap: 0 };
    const TF = 2.1; // ateşleme anı (aracı akışı bittikten sonra)
    const CP = [
      null,
      '<b>2 · Ateşleme.</b> Uyarılan nosiseptörler aksiyon potansiyeli başlatır; sinyal iki lifte aynı anda yola çıkar. [[K1 s. 272]]',
      '<b>3 · İlk ağrı.</b> Miyelinli, C\'den kalın Aδ lifi ≈ 20 m/s ile önce varır: keskin, iyi lokalize ilk ağrı. [[K1 s. 272]]',
      '<b>4 · İkinci ağrı.</b> Miyelinsiz, ince C lifi 0,5–4,0 m/s ile çok sonra varır: ilk ağrıyı izleyen künt, kötü lokalize ağrı. [[K1 s. 272–273]]',
    ];
    const MED = [['K⁺', 'hasarlı hücre'], ['Histamin', 'mast hücresi'], ['Bradikinin ↑', 'inflamasyon'], ['Lökotrienler, prostaglandinler (sentez)', 'zar hasarı'], ['Serotonin (vasküler hasar)', 'trombosit']];
    return mount(el, (N) => {
      const W = N ? 360 : 720, rowH = 58, hz = 30 + 5 * rowH + 8;
      const ex = N ? 330 : 205; // sinir ucu x
      const px0 = N ? 14 : 255, px1 = N ? 300 : 650; // yarış hattı
      const ry = N ? hz + 70 : 112; // Aδ hattı y
      const cyC = ry + (N ? 62 : 96);
      const stripY = N ? cyC + 66 : 275;
      const Ht = N ? stripY + 90 : 340;
      const svg = svgIn(el, W, Ht, 'Doku hasarındaki beş aracı nosiseptörü uyarır; Aδ ve C lifleri omuriliğe farklı hızlarla ulaşır ve iki ayrı ağrı olarak algılanır');
      // --- hasar paneli
      const tix = N ? 160 : 96;
      mk('rect', { x: tix, y: 8, width: N ? 200 : 140, height: 30 + 5 * rowH, rx: 12, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-dasharray': '5 4', opacity: 0.9 }, svg);
      tx(svg, tix + (N ? 100 : 70), 26, 'Doku hasarı', 'f60-b f60-crit', 'middle');
      const icx = N ? 190 : 128;
      const medDots = [];
      const eyA = N ? 120 : ry, eyC = N ? 220 : cyC, endY = (eyA + eyC) / 2;
      MED.forEach((m, i) => {
        const cy = 36 + rowH / 2 + i * rowH;
        const ln = wrap(m[0], N ? 15 : 14), top = cy - (ln.length + 1) * 7.5;
        tx(svg, 4, top + 9, ln.join('\n'), 'f60-b');
        tx(svg, 4, top + 9 + ln.length * 15.5, m[1], 'f60-s f60-m');
        // simge
        const g = mk('g', { transform: `translate(${icx},${cy})` }, svg);
        if (i === 0) mk('path', { d: 'M-9 -3 L-3 -9 L4 -7 L9 -1 L5 8 L-4 9 L-9 3Z M-2 -8 L1 0 L-6 7', fill: 'var(--paper)', stroke: 'var(--crit)', 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, g);
        if (i === 1) { mk('circle', { r: 9, fill: 'var(--warn-soft)', stroke: 'var(--warn)', 'stroke-width': 1.6 }, g); [[-3, -3], [3, 2], [-2, 4]].forEach((q) => mk('circle', { cx: q[0], cy: q[1], r: 1.5, fill: 'var(--warn)' }, g)); }
        if (i === 2) mk('path', { d: 'M-10 0 Q-5 -8 0 0 T10 0 M-10 6 Q-5 -2 0 6 T10 6', fill: 'none', stroke: 'var(--crit)', 'stroke-width': 1.8 }, g);
        if (i === 3) { mk('rect', { x: -9, y: -7, width: 18, height: 14, rx: 7, fill: 'none', stroke: 'var(--c-basic)', 'stroke-width': 1.6, 'stroke-dasharray': '3 2' }, g); }
        if (i === 4) { mk('circle', { cx: -4, r: 7, fill: 'var(--chip)', stroke: 'var(--muted)', 'stroke-width': 1.5 }, g); mk('circle', { cx: 5, cy: 3, r: 5, fill: 'var(--chip)', stroke: 'var(--muted)', 'stroke-width': 1.5 }, g); }
        medDots.push({ x: icx + 12, y: cy, el: mk('circle', { r: 4.5, fill: 'var(--crit)', opacity: 0 }, svg) });
      });
      // uçlar
      const ends = mk('g', {}, svg);
      const eA = ex - 18;
      mk('path', { d: `M${eA - 2} ${eyA} l-12 -9 M${eA - 2} ${eyA} l-14 0 M${eA - 2} ${eyA} l-12 9`, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 3, 'stroke-linecap': 'round' }, ends);
      mk('path', { d: `M${eA - 2} ${eyC} l-12 -9 M${eA - 2} ${eyC} l-14 0 M${eA - 2} ${eyC} l-12 9`, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 2, 'stroke-linecap': 'round' }, ends);
      const glowA = mk('circle', { cx: eA - 12, cy: eyA, r: 14, fill: 'var(--crit)', opacity: 0 }, svg), glowC = mk('circle', { cx: eA - 12, cy: eyC, r: 14, fill: 'var(--crit)', opacity: 0 }, svg);
      if (!N) { mk('line', { x1: eA - 2, y1: eyA, x2: px0, y2: ry, stroke: 'var(--accent)', 'stroke-width': 3 }, svg); mk('line', { x1: eA - 2, y1: eyC, x2: px0, y2: cyC, stroke: 'var(--warn)', 'stroke-width': 2 }, svg); }
      tx(svg, N ? 356 : 234, N ? eyC + 30 : 264, 'Nosiseptör: serbest,\nmiyelinsiz uç', 'f60-s f60-m', 'end');
      // --- yarış paneli: lifler
      const lx = N ? ex - 14 : ex - 14;
      if (!N) { mk('rect', { x: px1 + 18, y: ry - 34, width: 50, height: cyC - ry + 68, rx: 10, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2 }, svg); tx(svg, px1 + 43, ry + (cyC - ry) / 2 + 4, 'Omurilik', 'f60-b', 'middle'); }
      else { mk('rect', { x: px1 + 12, y: ry - 30, width: 44, height: cyC - ry + 60, rx: 10, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2 }, svg); tx(svg, px1 + 34, (ry + cyC) / 2 + 4, 'Omurilik', 'f60-b', 'middle'); }
      const x0 = N ? px0 : px0, xe = px1;
      // Aδ hattı + miyelin
      mk('line', { x1: x0, y1: ry, x2: xe, y2: ry, stroke: 'var(--accent)', 'stroke-width': 3 }, svg);
      const nm = N ? 6 : 8, seL = (xe - x0) / nm;
      for (let i = 0; i < nm; i++) mk('rect', { x: x0 + i * seL + 3, y: ry - 8, width: seL - 6, height: 16, rx: 7, fill: 'var(--accent-soft)', stroke: 'var(--accent)', 'stroke-width': 1.5 }, svg);
      mk('line', { x1: x0, y1: cyC, x2: xe, y2: cyC, stroke: 'var(--warn)', 'stroke-width': 2 }, svg);
      tx(svg, x0, ry - 22, N ? 'Aδ · miyelinli · ≈ 20 m/s\nmekanik, termal' : 'Aδ · miyelinli · ≈ 20 m/s · mekanik, termal', 'f60-s f60-acc');
      if (N) svg.lastChild.setAttribute('y', ry - 36);
      tx(svg, x0, cyC - 12, N ? 'C · miyelinsiz, ince · 0,5–4,0 m/s\ntermal, mekanik, kimyasal' : 'C · miyelinsiz, ince · 0,5–4,0 m/s · termal, mekanik, kimyasal', 'f60-s f60-wrn');
      if (N) svg.lastChild.setAttribute('y', cyC - 30);
      if (!N) { svg.lastChild.setAttribute('y', cyC + 24); }
      const dA = mk('circle', { r: 5, fill: 'var(--accent)', opacity: 0, stroke: 'var(--paper)', 'stroke-width': 1.5 }, svg), dC = mk('circle', { r: 5, fill: 'var(--warn)', opacity: 0, stroke: 'var(--paper)', 'stroke-width': 1.5 }, svg);
      // algı şeridi
      const sx0 = N ? 14 : 255, sx1 = N ? 346 : 700, sy = stripY + (N ? 60 : 44);
      tx(svg, sx0, stripY - 4, 'Algı', 'f60-b');
      mk('line', { x1: sx0, y1: sy, x2: sx1, y2: sy, stroke: 'var(--line)', 'stroke-width': 2 }, svg);
      tx(svg, sx1, sy + 18, 'zaman →', 'f60-s f60-m', 'end');
      const sc = (sx1 - sx0) / 10.5; // saniye başına piksel (0..10 sn)
      const trace = mk('path', { d: '', fill: 'none', stroke: 'var(--crit)', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
      const lab1 = tx(svg, sx0, sy - (N ? 46 : 36), 'İlk ağrı: keskin,\niyi lokalize', 'f60-s f60-b', 'start'); lab1.style.opacity = 0;
      const lab2 = tx(svg, sx1, sy - (N ? 46 : 36), 'İkinci ağrı: künt,\nkötü lokalize', 'f60-s f60-b', 'end'); lab2.style.opacity = 0;
      const gauss = (x, m, s) => Math.exp(-((x - m) * (x - m)) / (2 * s * s));
      const tA = () => S.d * 1.0, tC = () => S.d * 10;
      const yAt = (t) => { // algı eğrisi (temsilî): t, ateşlemeden sonra geçen süre
        return (N ? 44 : 38) * gauss(t, tA(), 0.09) + (N ? 15 : 14) * gauss(t, tC(), 0.7 + S.d * 0.5);
      };
      function draw() {
        const t = S.t;
        medDots.forEach((m, i) => {
          const st = 0.0 + i * 0.3, f = clamp((t - st) / 0.9, 0, 1);
          const on = t >= 0 && f > 0 && f < 1;
          m.el.setAttribute('opacity', on ? 0.9 : 0);
          if (on) { m.el.setAttribute('cx', lerp(m.x, eA - 12, f)); m.el.setAttribute('cy', lerp(m.y, endY, f)); }
        });
        const glow = t >= 0.9 ? clamp(1 - (t - 0.9) / 3, 0.25, 1) * 0.35 : 0;
        glowA.setAttribute('opacity', t >= 0.9 ? glow : 0); glowC.setAttribute('opacity', t >= 0.9 ? glow : 0);
        const u = t - TF;
        const fa = u > 0 ? clamp(u / tA(), 0, 1) : 0, fc = u > 0 ? clamp(u / tC(), 0, 1) : 0;
        dA.setAttribute('opacity', u > 0 && fa < 1 ? 1 : 0); dC.setAttribute('opacity', u > 0 && fc < 1 ? 1 : 0);
        dA.setAttribute('cx', lerp(x0, xe, fa)); dA.setAttribute('cy', ry); dC.setAttribute('cx', lerp(x0, xe, fc)); dC.setAttribute('cy', cyC);
        // algı eğrisi
        let d = ''; const nmax = 260, upto = u > 0 ? Math.min(u, 10) : 0;
        if (upto > 0) for (let i = 0; i <= nmax; i++) { const tt = (i / nmax) * upto; d += (i ? 'L' : 'M') + (sx0 + tt * sc).toFixed(1) + ' ' + (sy - yAt(tt)).toFixed(1); }
        trace.setAttribute('d', d);
        lab1.style.opacity = u >= tA() ? 1 : 0; lab2.style.opacity = u >= tC() ? 1 : 0;
        const c = u >= tC() ? 3 : u >= tA() ? 2 : u > 0 ? 1 : t >= 0 ? 0 : 0;
        if (c !== S.cap) { S.cap = c; if (c === 0) cap.reset(); else cap.set(CP[c]); }
      }
      // denetimler
      const ctl = H('div', 'f60-ctl', '', el), row = H('div', 'btn-row', '', ctl);
      const play = H('button', 'btn', RM ? '↺ Baştan' : (S.t < 0 ? '▶ Oynat' : '↺ Baştan'), row); play.type = 'button';
      const rl = H('label', 'f60-rng', '<span>Uzaklık (nosiseptör–omurilik)</span><b data-o>orta</b>', ctl);
      const rng = H('input', '', null, rl); rng.type = 'range'; rng.min = 0.2; rng.max = 1; rng.step = 0.05; rng.value = S.d; rng.setAttribute('aria-label', 'Uzaklık (nosiseptör–omurilik)');
      const scale = H('div', 'f60-scale', '<span>kısa</span><span>uzun</span>', ctl);
      const oran = H('p', 'f60-oran', 'C, Aδ\'den ≈ 5–40 kat yavaş (20 / 4,0 ve 20 / 0,5)', ctl);
      const lbl = () => { rl.querySelector('b').textContent = S.d < 0.45 ? 'kısa' : S.d < 0.8 ? 'orta' : 'uzun'; };
      lbl();
      rng.addEventListener('input', () => { S.d = +rng.value; lbl(); if (RM || S.t >= TF + tC()) S.t = RM ? 99 : S.t; draw(); });
      play.addEventListener('click', () => { S.t = RM ? 99 : 0; S.run = !RM; play.textContent = '↺ Baştan'; S.cap = -1; draw(); });
      draw();
      return { tick(dt) { if (S.run && S.t >= 0) { S.t += dt; if (S.t > TF + tC() + 0.3) { S.t = TF + tC() + 0.3; S.run = false; } draw(); } }, stop() {} };
    });
  };

  /* ================= 3 · Nosiseptörden kortekse (spinotalamik / trigeminal) ================= */
  VIZ.f60_yol = (el) => {
    const cap = capper(el);
    const S = { mode: 'sp', step: 1, sub: null };
    const CS = {
      sp: [null,
        '<b>1 · Birinci nöron.</b> C ya da Aδ lifi, sinyali arka boynuzda substantia gelatinosa (Rexed lamina II) ya da nucleus proprius\'a (lamina III, IV, V) getirir. "İleri"ye basın. [[K1 s. 273]]',
        '<b>2 · İlk sinaps.</b> Birinci nöron arka boynuzda ikinci nöronla sinaps yapar; nörotransmitter P maddesidir. [[K1 s. 273]]',
        '<b>3 · Çapraz ve yükseliş.</b> İkinci nöron ön komissürde karşı tarafa geçer ve spinotalamik yolda omurilik boyunca yükselip talamusta üçüncü nöronla sinaps yapar. [[K1 s. 273]]',
        '<b>4 · Korteks.</b> Üçüncü nöron aksiyon potansiyellerini somatosensoriyel kortekse iletir. [[K1 s. 273]]'],
      tg: [null,
        '<b>1 · Birinci nöron.</b> Yüzden gelen C ya da Aδ lifi çoğunlukla trigeminal sinirle; orofarenks ve kulaktan az sayıda lif fasiyal, glossofaringeal ve vagus sinirleriyle gelir. [[K1 s. 273]]',
        '<b>2 · Trigeminal çekirdek.</b> Hangi kraniyal sinirle gelirse gelsin bütün duyu lifleri burada ikinci nöronla sinaps yapar; P maddesinin aracı olduğu düşünülür. Ağrı ve ısı spinal kısma gider. [[K1 s. 273]]',
        '<b>3 · Çapraz ve yükseliş.</b> Spinotalamik yoldaki gibi ikinci nöronlar hemen çapraz yapar, beyin sapından talamusa yükselir ve üçüncü nöronla sinaps yapar. [[K1 s. 273]]',
        '<b>4 · Korteks.</b> Üçüncü nöronlar somatosensoriyel kortekse iletir. [[K1 s. 273]]'],
    };
    const SUB = {
      mez: '<b>Mezensefalik çekirdek.</b> Çene propriosepsiyonu. [[K1 s. 273]]',
      ana: '<b>Ana çekirdek.</b> Yüz ve ağızdan dokunma ve propriosepsiyon. [[K1 s. 273]]',
      spin: '<b>Spinal trigeminal çekirdek.</b> Ağrı ve ısı; arka boynuzun karşılığıdır. [[K1 s. 273]]',
    };
    return mount(el, (N) => {
      const W = N ? 360 : 680, Hh = N ? 548 : 470;
      const sc = H('div', 'f60-top', '', el);
      seg(sc, 'Yol', 'mode', [['sp', 'Spinotalamik (gövde, uzuv)'], ['tg', 'Trigeminal (yüz)']], S.mode);
      const svg = svgIn(el, W, Hh, 'Ağrı yolunun üç nöronu: nosiseptörden arka boynuza ya da trigeminal çekirdeğe, oradan talamusa ve somatosensoriyel kortekse');
      const nav = H('div', 'f60-nav', '<button type="button" class="btn ghost" data-nav="-1">‹ Geri</button><span class="f60-adim" aria-live="polite"></span><button type="button" class="btn ghost" data-nav="1">İleri ›</button>', el);
      let active = null, dots = [], tt = 0, extra = null;
      const col = { n1: 'var(--accent)', n2: 'var(--c-clin)', n3: 'var(--ok)' };
      const state = (i) => (S.step === i ? 'on' : S.step > i ? 'done' : 'off');
      const op = (st) => (st === 'on' ? 1 : st === 'done' ? 0.5 : 0.16);
      function beyin(cx) {
        mk('rect', { x: cx - 120, y: 22, width: 240, height: 130, rx: 60, fill: 'none', stroke: 'var(--line)', 'stroke-width': 2 }, svg);
        mk('path', { d: `M${cx - 100} 84 Q${cx} 6 ${cx + 100} 84`, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.55 }, svg);
        tx(svg, cx, 14, 'Somatosensoriyel korteks', 'f60-s f60-b', 'middle');
        mk('ellipse', { cx, cy: 112, rx: 46, ry: 17, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2 }, svg);
        tx(svg, cx, 117, 'Talamus', 'f60-s f60-b', 'middle');
      }
      const neuron = (a, c, st, w) => { const p = mk('path', { d: pts(a), fill: 'none', stroke: c, 'stroke-width': w || 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: op(st) }, svg); return p; };
      function setDots(list) { dots = list.map((y) => ({ y, el: mk('circle', { r: 4.5, fill: 'var(--ink)', stroke: 'var(--paper)', 'stroke-width': 1.5 }, svg) })); }
      function draw() {
        svg.innerHTML = ''; dots = []; extra = null;
        const sp = S.mode === 'sp';
        const cx = sp ? W / 2 : (N ? 160 : 320);
        beyin(cx);
        const n3 = [[cx + 12, 96], [cx + 42, 49]];
        const n3s = state(4);
        let n2, n1 = null;
        if (sp) {
          // beyin sapı
          mk('rect', { x: cx + 6, y: 152, width: 40, height: 150, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2 }, svg);
          tx(svg, cx + 54, 232, 'Beyin sapı', 'f60-s f60-m');
          const o = omurilik(svg, cx, 302, 'sp'); const cy = o.cy;
          // laminalar
          const clip = mk('clipPath', { id: 'f60-yol-cl' }, svg); mk('path', { d: o.d }, clip);
          const bg = mk('g', { 'clip-path': 'url(#f60-yol-cl)' }, svg);
          mk('rect', { x: cx - 92, y: cy - 64, width: 66, height: 8, fill: 'var(--paper)', opacity: 0.8 }, bg);
          mk('rect', { x: cx - 92, y: cy - 56, width: 66, height: 13, fill: 'var(--accent-soft)' }, bg);
          mk('rect', { x: cx - 92, y: cy - 43, width: 66, height: 17, fill: 'var(--c-clin-soft)' }, bg);
          [cy - 56, cy - 43, cy - 26].forEach((y) => mk('line', { x1: cx - 92, y1: y, x2: cx - 26, y2: y, stroke: 'var(--line)', 'stroke-width': 1 }, bg));
          const lab = (y, s, t) => { mk('line', { x1: cx - 74, y1: y, x2: cx - 92, y2: y, stroke: 'var(--muted)', 'stroke-width': 1 }, svg); if (!N) tx(svg, cx - 96, y + 4, s, 'f60-s ' + (t || ''), 'end'); };
          lab(cy - 60, 'I', 'f60-m'); lab(cy - 50, 'II · substantia gelatinosa', 'f60-b'); lab(cy - 35, 'III–V · nucleus proprius', 'f60-b');
          mk('line', { x1: cx - 14, y1: cy + 5, x2: cx + 14, y2: cy + 5, stroke: 'var(--accent)', 'stroke-width': 2.5 }, svg);
          tx(svg, cx, cy + 40, 'ön komissür', 'f60-s f60-m', 'middle');
          // spinotalamik yol bölgesi
          const rx = cx + 98, ry = cy - 16;
          mk('circle', { cx: rx, cy: ry, r: 10, fill: 'var(--c-clin-soft)', stroke: 'var(--c-clin)', 'stroke-width': 2 }, svg);
          if (!N) tx(svg, cx + 116, ry + 4, 'spinotalamik yol', 'f60-s f60-b');
          else {
            const ly = cy + 98; mk('rect', { x: 6, y: ly - 11, width: 12, height: 12, fill: 'var(--accent-soft)', stroke: 'var(--line)' }, svg); tx(svg, 24, ly, 'II · s. gelatinosa (Rexed lamina II)', 'f60-s');
            mk('rect', { x: 6, y: ly + 8, width: 12, height: 12, fill: 'var(--c-clin-soft)', stroke: 'var(--line)' }, svg); tx(svg, 24, ly + 19, 'III–V · n. proprius (lamina III–V)', 'f60-s');
            mk('circle', { cx: 12, cy: ly + 33, r: 6, fill: 'var(--c-clin-soft)', stroke: 'var(--c-clin)', 'stroke-width': 2 }, svg); tx(svg, 24, ly + 38, 'spinotalamik yol', 'f60-s');
          }
          // nöronlar
          const hx = cx - 52, hy = cy - 42;
          n1 = [[8, 262], [cx - 112, 292], [cx - 82, 300], [cx - 60, 316], [hx, hy]];
          n2 = [[hx, hy], [cx - 14, cy - 6], [cx + 14, cy + 2], [cx + 60, cy + 8], [rx, ry], [cx + 82, cy - 56], [cx + 44, 300], [cx + 28, 282], [cx + 26, 128]];
          const s1 = state(1);
          neuron(n1, col.n1, s1, 3.5); neuron(n1.map((p) => [p[0], p[1] + 4]), 'var(--warn)', s1, 2);
          mk('ellipse', { cx: cx - 106, cy: 293, rx: 13, ry: 8, fill: 'var(--paper)', stroke: 'var(--muted)', 'stroke-width': 1.5, opacity: op(s1) }, svg);
          tx(svg, 6, N ? 236 : 242, 'birinci nöron\nC ya da Aδ', 'f60-s f60-b');
          neuron(n2, col.n2, state(3));
          neuron(n3, col.n3, n3s);
          mk('circle', { cx: hx, cy: hy, r: 6, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 2.5, opacity: S.step >= 2 ? 1 : 0.4 }, svg);
          if (S.step === 2) {
            extra = { type: 'p', cx: hx, cy: hy, els: [0, 1, 2, 3, 4].map(() => mk('circle', { r: 3, fill: 'var(--crit)' }, svg)) };
            tx(svg, cx - 112, cy + 38, 'P maddesi', 'f60-s f60-b f60-crit', 'end');
            mk('line', { x1: cx - 108, y1: cy + 33, x2: hx - 4, y2: hy + 8, stroke: 'var(--crit)', 'stroke-width': 1 }, svg);
          }
          mk('circle', { cx: cx + 26, cy: 127, r: 5, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 2.5, opacity: S.step >= 3 ? 1 : 0.4 }, svg);
          active = S.step === 1 ? [Yol(n1)] : S.step === 3 ? [Yol(n2)] : S.step === 4 ? [Yol(n3)] : [];
        } else {
          // trigeminal
          const f0 = N ? 4 : 40, fx = f0 + 30, fy = 262;
          mk('ellipse', { cx: fx, cy: fy, rx: 30, ry: 44, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2 }, svg);
          mk('path', { d: `M${fx - 30} ${fy} l-9 14 l9 4z`, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2, 'stroke-linejoin': 'round' }, svg);
          mk('ellipse', { cx: fx + 22, cy: fy - 6, rx: 5, ry: 9, fill: 'var(--paper)', stroke: 'var(--line)', 'stroke-width': 1.5 }, svg);
          const colL = cx - 22;
          const segs = [['MEZENSEFALON', 152, 222], ['PONS', 222, 322], ['MEDULLA', 322, 450]];
          mk('rect', { x: colL, y: 152, width: 44, height: 298, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2 }, svg);
          [222, 322].forEach((y) => mk('line', { x1: colL, y1: y, x2: colL + 44, y2: y, stroke: 'var(--line)', 'stroke-width': 2 }, svg));
          const parts = [['mez', 162, 218, 'var(--c-basic)', 'Mezensefalik çekirdek', 'çene propriosepsiyonu'], ['ana', 228, 316, 'var(--ok)', 'Ana çekirdek', 'yüz ve ağızdan dokunma, propriosepsiyon'], ['spin', 326, 444, 'var(--crit)', 'Spinal trigeminal çekirdek', 'ağrı ve ısı · arka boynuzun karşılığı']];
          const s2 = S.step === 2;
          parts.forEach(([id, y0, y1, c, nm, ds], i) => {
            const g = mk('g', {}, svg);
            const on = s2 || S.sub === id;
            mk('rect', { x: cx - 8, y: y0, width: 16, height: y1 - y0, rx: 5, fill: c, opacity: on ? 0.85 : 0.3, stroke: S.sub === id ? 'var(--ink)' : 'none', 'stroke-width': 2 }, g);
            mk('rect', { x: cx - 24, y: y0 - 4, width: 48, height: y1 - y0 + 8, fill: 'transparent' }, g);
            const lx = cx + 32, mw = N ? 22 : 40;
            tx(g, lx, y0 + 10, segs[i][0], 'f60-s f60-m');
            tx(g, lx, y0 + 26, wrap(nm, N ? 20 : 34).join('\n'), 'f60-b');
            const nl = wrap(nm, N ? 20 : 34).length;
            tx(g, lx, y0 + 26 + nl * 15.5, wrap(ds, N ? 26 : 44).join('\n'), 'f60-s');
            clickable(g, nm, () => { S.sub = S.sub === id ? null : id; cap.set(S.sub ? SUB[id] : CS.tg[S.step]); draw(); });
          });
          // lifler
          const fibers = [['V', fx + 14, fy - 8, colL, 262, 'var(--accent)', 4.5], ['VII', fx + 24, fy - 12, colL, 292, 'var(--warn)', 2], ['IX', fx - 6, fy + 28, colL, 314, 'var(--warn)', 2], ['X', fx - 2, fy + 34, colL, 334, 'var(--warn)', 2]];
          const s1 = state(1); const fl = [];
          fibers.forEach((f) => { const a = [[f[1], f[2]], [(f[1] + f[3]) / 2, (f[2] + f[4]) / 2 + (f[0] === 'V' ? -10 : 8)], [f[3], f[4]]]; fl.push(Yol(a)); neuron(a, f[5], s1, f[6]); });
          const lg = N ? 372 : 372;
          [['V · trigeminal sinir (çoğunluk)', 'var(--accent)', 4], ['VII · fasiyal', 'var(--warn)', 2], ['IX · glossofaringeal', 'var(--warn)', 2], ['X · vagus', 'var(--warn)', 2]].forEach((q, i) => {
            mk('line', { x1: f0, y1: lg + i * 19 - 4, x2: f0 + 14, y2: lg + i * 19 - 4, stroke: q[1], 'stroke-width': q[2] + 1, opacity: op(s1) }, svg);
            tx(svg, f0 + 20, lg + i * 19, q[0], 'f60-s');
          });
          n2 = [[cx - 2, 336], [cx + 18, 318], [cx + 26, 290], [cx + 26, 128]];
          neuron(n2, col.n2, state(3)); neuron(n3, col.n3, n3s);
          mk('circle', { cx: cx + 26, cy: 127, r: 5, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 2.5, opacity: S.step >= 3 ? 1 : 0.4 }, svg);
          tx(svg, f0, 330 + 0, 'yüz, orofarenks, kulak', 'f60-s f60-m'); svg.lastChild.setAttribute('y', 322);
          active = S.step === 1 ? fl : S.step === 3 ? [Yol(n2)] : S.step === 4 ? [Yol(n3)] : [];
        }
        setDots(active.map(() => 0));
        nav.querySelector('.f60-adim').textContent = `Adım ${S.step}/4`;
        nav.querySelector('[data-nav="-1"]').disabled = S.step === 1; nav.querySelector('[data-nav="1"]').disabled = S.step === 4;
        // RM ya da hareketsiz: nokta gösterilmez
        if (RM) dots.forEach((d) => d.el.setAttribute('opacity', 0));
      }
      const say = () => cap.set(S.sub ? SUB[S.sub] : CS[S.mode][S.step]);
      draw(); say();
      const onClick = (e) => {
        const m = e.target.closest('[data-mode]'), n = e.target.closest('[data-nav]');
        if (m) { S.mode = m.dataset.mode; S.step = 1; S.sub = null; press(sc, '[data-mode]', S.mode, 'data-mode'); draw(); say(); }
        if (n && !n.disabled) { S.step = clamp(S.step + +n.dataset.nav, 1, 4); S.sub = null; draw(); say(); }
      };
      el.addEventListener('click', onClick);
      return {
        tick(dt) {
          if (RM) return; tt += dt;
          dots.forEach((d, i) => { const p = active[i].at((tt % 2.4) / 2.4); d.el.setAttribute('cx', p[0]); d.el.setAttribute('cy', p[1]); });
          if (extra) extra.els.forEach((e, i) => { const f = ((tt * 0.9 + i / 5) % 1); e.setAttribute('cx', extra.cx + 4 + f * 26 + (i % 2) * 3); e.setAttribute('cy', extra.cy + 6 + f * 10 + i * 2); e.setAttribute('opacity', 1 - f * 0.6); });
        },
        stop() { el.removeEventListener('click', onClick); },
      };
    });
  };

  /* ================= 4 · Kapı kontrol kuramı ================= */
  VIZ.f60_kapi = (el) => {
    const cap = capper(el);
    const S = { a: 0, c: 70 };
    let tt = 0;
    const model = () => { const a = S.a / 100, c = S.c / 100; const I = clamp(0.5 + 0.5 * (a - c), 0, 1); const O = clamp((c + 0.3 * a) * (1 - 0.9 * I), 0, 1); return { a, c, I, O }; };
    const say = () => {
      if (S.c < 30) cap.set('<b>Ağrılı uyaran yok.</b> A lifi sinyali arka kolonlara gider; spinotalamik yola geçen nosiseptif sinyal azdır. [[K1 s. 273–274]]');
      else if (S.a >= 30) cap.set('<b>Kapı kapanıyor.</b> Kurama göre iki lif aynı ikinci nörona yakınsar; A lifi etkinliği arttıkça C lifinden geçen ağrı azalır. Yarayı ovmak, sıcak ya da buz uygulamak böyle açıklanmıştı. [[K1 s. 273]]');
      else cap.set('<b>Kapı açık.</b> Yalnız C lifi ateşlerken ikinci nöron sinyali spinotalamik yola geçirir. Mekanoreseptör lifinin etkinliğini artırın. [[K1 s. 273–274]]');
    };
    return mount(el, (N) => {
      const W = N ? 360 : 680, Hh = N ? 300 : 300;
      const svg = svgIn(el, W, Hh, 'Kapı kontrol kuramı: A lifi ve C lifi inhibitör ara nöron ve ikinci nöron üzerinde birleşir; A lifi etkinliği arttıkça spinotalamik yola geçen ağrı sinyali azalır');
      const tA = N ? [92, 64] : [170, 70], tC = N ? [92, 236] : [170, 230], pI = N ? [160, 150] : [330, 150], p2 = N ? [240, 150] : [520, 150], rI = N ? 18 : 24, r2 = N ? 20 : 28;
      const gx = N ? 202 : 432;
      const L = {};
      const line = (a, b, c, key, mid) => { const l = mk('path', { d: pts(a), fill: 'none', stroke: c, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg); L[key] = { el: l, y: Yol(a), c }; return l; };
      // lifler
      const aPath = [[N ? 6 : 10, tA[1]], tA]; const cPath = [[N ? 6 : 10, tC[1]], tC];
      line(aPath, 0, 'var(--c-basic)', 'a'); line(cPath, 0, 'var(--warn)', 'c');
      mk('circle', { cx: tA[0], cy: tA[1], r: 5, fill: 'var(--c-basic)' }, svg); mk('circle', { cx: tC[0], cy: tC[1], r: 5, fill: 'var(--warn)' }, svg);
      tx(svg, N ? 4 : 10, tA[1] - 14, N ? 'A lifi\n(mekanoreseptör)' : 'A lifi (mekanoreseptör)', 'f60-b f60-bas');
      if (N) svg.lastChild.setAttribute('y', tA[1] - 28);
      tx(svg, N ? 4 : 10, tC[1] + 24, N ? 'C lifi\n(nosiseptif)' : 'C lifi (nosiseptif)', 'f60-b f60-wrn');
      // arka kolon dalı
      const bx = N ? 50 : 100;
      mk('path', { d: `M${bx} ${tA[1]} L${bx} ${N ? 14 : 24}`, fill: 'none', stroke: 'var(--c-basic)', 'stroke-width': 2, 'stroke-dasharray': '4 3' }, svg);
      tx(svg, bx + 6, N ? 20 : 30, '→ arka kolonlar', 'f60-s f60-bas');
      // bağlantılar (+/−)
      const sign = (x, y, plus) => { const g = mk('g', {}, svg); mk('circle', { cx: x, cy: y, r: 8, fill: plus ? 'var(--ok-soft)' : 'var(--crit-soft)', stroke: plus ? 'var(--ok)' : 'var(--crit)', 'stroke-width': 1.5 }, g); tx(g, x, y + 4.5, plus ? '+' : '−', 'f60-b ' + (plus ? 'f60-ok' : 'f60-crit'), 'middle'); };
      const topY = p2[1] - r2, botY = p2[1] + r2;
      const aI = [tA, [pI[0] - rI * 0.6, pI[1] - rI * 0.8]], aN = [tA, [p2[0], tA[1]], [p2[0], topY]], cN = [tC, [p2[0], tC[1]], [p2[0], botY]], cI = [tC, [pI[0] - rI * 0.6, pI[1] + rI * 0.8]];
      const iN = [[pI[0] + rI, pI[1]], [p2[0] - r2, p2[1]]];
      line(aN, 0, 'var(--c-basic)', 'an'); line(cN, 0, 'var(--warn)', 'cn'); line(aI, 0, 'var(--c-basic)', 'ai'); line(cI, 0, 'var(--warn)', 'ci'); line(iN, 0, 'var(--crit)', 'in');
      sign(lerp(tA[0], p2[0], 0.62), tA[1], true); sign(p2[0], (tA[1] + topY) / 2, true);
      sign(lerp(aI[0][0], aI[1][0], 0.55), lerp(aI[0][1], aI[1][1], 0.55), true);
      sign(lerp(cI[0][0], cI[1][0], 0.55), lerp(cI[0][1], cI[1][1], 0.55), false);
      sign(lerp(tC[0], p2[0], 0.62), tC[1], true); sign(p2[0], (tC[1] + botY) / 2, true);
      sign((pI[0] + p2[0]) / 2 + (N ? -2 : -20), pI[1] - 0, false);
      // ara nöron, ikinci nöron
      mk('circle', { cx: pI[0], cy: pI[1], r: rI, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-width': 2.5 }, svg);
      tx(svg, pI[0], pI[1] + 6, '−', 'f60-b f60-crit', 'middle'); svg.lastChild.style.fontSize = '20px';
      tx(svg, pI[0], pI[1] + rI + 18, N ? 'inhibitör\nara nöron' : 'inhibitör ara nöron\n(substantia gelatinosa)', 'f60-s f60-b', 'middle');
      mk('circle', { cx: p2[0], cy: p2[1], r: r2, fill: 'var(--c-clin-soft)', stroke: 'var(--c-clin)', 'stroke-width': 2.5 }, svg);
      tx(svg, p2[0], p2[1] + 4, N ? '2.' : '2. nöron', 'f60-s f60-b', 'middle');
      // kapı
      const gate = mk('g', {}, svg); const g1 = mk('rect', { x: gx - 5, width: 10, rx: 3, fill: 'var(--ink)' }, gate), g2 = mk('rect', { x: gx - 5, width: 10, rx: 3, fill: 'var(--ink)' }, gate);
      tx(svg, gx, p2[1] - (N ? 38 : 44), 'kapı', 'f60-s f60-b', 'middle');
      // çıkış
      const outL = [[p2[0] + r2, p2[1]], [N ? 300 : 600, p2[1]]];
      line(outL, 0, 'var(--c-clin)', 'out'); arrow(svg, outL[1][0] - 8, p2[1], outL[1][0] + 8, p2[1], 'var(--c-clin)', 2);
      tx(svg, p2[0] + r2 + 6, p2[1] - 8, N ? '→ spinotalamik\nyol' : '→ spinotalamik yol', 'f60-s f60-b f60-clin');
      if (N) svg.lastChild.setAttribute('y', p2[1] - 22);
      // nokta
      const dotG = mk('g', {}, svg);
      const nd = 14; const dots = Array.from({ length: nd }, () => mk('circle', { r: 3.8, fill: 'var(--ink)', opacity: 0 }, dotG));
      // alt şerit + denetimler
      const note = H('div', 'f60-uyari', 'Kuram, yalnız Aδ nosiseptif sinyallerini taşıyan ara nöronlar bulununca büyük ölçüde çürütüldü; TENS gibi olgular başka segmental mekanizmalarla açıklanabilir. [[K1 s. 273]]', el);
      note.innerHTML = REF(note.innerHTML);
      const mt = H('div', 'f60-meter', '<span class="f60-ml">Spinotalamik yola geçen sinyal</span><span class="f60-mbar"><i></i></span><span class="f60-mr"><em>az</em><em>çok</em></span>', el);
      const ctl = H('div', 'f60-ctl', '', el);
      ctl.innerHTML = `<label class="f60-rng"><span>C lifi etkinliği (ağrılı uyaran) <b data-o="c"></b></span><input type="range" min="0" max="100" step="1" data-r="c" aria-label="C lifi etkinliği (ağrılı uyaran)"></label>
        <label class="f60-rng"><span>A lifi etkinliği (ovma, dokunma) <b data-o="a"></b></span><input type="range" min="0" max="100" step="1" data-r="a" aria-label="A lifi etkinliği (ovma, dokunma)"></label>
        <div class="btn-row"><button type="button" class="btn ghost" data-pre="yara">Yalnız yara</button><button type="button" class="btn ghost" data-pre="ov">Yarayı ovmak</button></div>`;
      const fill = mt.querySelector('i');
      function upd() {
        const m = model();
        ctl.querySelector('[data-r=c]').value = S.c; ctl.querySelector('[data-r=a]').value = S.a;
        ctl.querySelector('[data-o=c]').textContent = S.c; ctl.querySelector('[data-o=a]').textContent = S.a;
        L.a.el.setAttribute('stroke-width', 1.5 + 4 * m.a); L.an.el.setAttribute('stroke-width', 1.5 + 4 * m.a); L.ai.el.setAttribute('stroke-width', 1.5 + 4 * m.a);
        L.c.el.setAttribute('stroke-width', 1.5 + 4 * m.c); L.cn.el.setAttribute('stroke-width', 1.5 + 4 * m.c); L.ci.el.setAttribute('stroke-width', 1.5 + 4 * m.c);
        L.a.el.setAttribute('opacity', 0.3 + 0.7 * m.a); L.an.el.setAttribute('opacity', 0.3 + 0.7 * m.a); L.ai.el.setAttribute('opacity', 0.3 + 0.7 * m.a);
        L.c.el.setAttribute('opacity', 0.3 + 0.7 * m.c); L.cn.el.setAttribute('opacity', 0.3 + 0.7 * m.c); L.ci.el.setAttribute('opacity', 0.3 + 0.7 * m.c);
        L.in.el.setAttribute('stroke-width', 1 + 5 * m.I); L.in.el.setAttribute('opacity', 0.25 + 0.75 * m.I);
        L.out.el.setAttribute('stroke-width', 1 + 6 * m.O); L.out.el.setAttribute('opacity', 0.25 + 0.75 * m.O);
        const open = 1 - m.I, half = 22, gap = open * half; // kanat aralığı
        g1.setAttribute('y', p2[1] - half - 6); g1.setAttribute('height', half - gap + 6 > 0 ? Math.max(4, half - gap) : 4);
        g2.setAttribute('y', p2[1] + gap); g2.setAttribute('height', Math.max(4, half - gap + 6));
        fill.style.width = (m.O * 100).toFixed(0) + '%';
        say();
      }
      const onIn = (e) => { const r = e.target.closest('[data-r]'); if (r) { S[r.dataset.r] = +r.value; upd(); } };
      const onClk = (e) => { const b = e.target.closest('[data-pre]'); if (!b) return; if (b.dataset.pre === 'yara') { S.c = 70; S.a = 0; } else { S.c = 70; S.a = 80; } upd(); };
      ctl.addEventListener('input', onIn); ctl.addEventListener('click', onClk);
      upd();
      return {
        tick(dt) {
          if (RM) { dots.forEach((d) => d.setAttribute('opacity', 0)); return; }
          tt += dt; const m = model();
          const tr = [[L.a, m.a], [L.c, m.c], [L.an, m.a], [L.cn, m.c], [L.in, m.I], [L.out, m.O]];
          let k = 0;
          tr.forEach(([l, act]) => {
            const n = Math.round(act * 2 + (act > 0.05 ? 0.6 : 0));
            for (let i = 0; i < n && k < nd; i++, k++) { const p = l.y.at(((tt * (0.25 + act * 0.5)) + i / n) % 1); dots[k].setAttribute('cx', p[0]); dots[k].setAttribute('cy', p[1]); dots[k].setAttribute('opacity', 0.9); dots[k].setAttribute('fill', l.c); }
          });
          for (; k < nd; k++) dots[k].setAttribute('opacity', 0);
        },
        stop() {},
      };
    });
  };

  /* ================= 5 · Opioid ================= */
  VIZ.f60_opioid = (el) => {
    const cap = capper(el);
    const S = { m: 'none', tau: RM ? 99 : 0 };
    const T = 3.4, PER = 4.6;
    const CP = {
      none: '<b>Opioid yok.</b> Aksiyon potansiyeli presinaptik uca ulaşır, Ca²⁺ girer, P maddesi salınır ve ikinci nöron ateşler. Opioidi ekleyin. [[K1 s. 273–274]]',
      pre: '<b>Presinaptik etki.</b> Opioid reseptörü presinaptik uca Ca²⁺ girişini engeller; P maddesi salınımı azalır, ikinci nöron ateşlemez. [[K1 s. 274]]',
      post: '<b>Postsinaptik etki.</b> Opioid reseptörü postsinaptik zarda K⁺ kanallarını açar; ikinci nöron hiperpolarize olur, eşiğe ulaşamaz. [[K1 s. 274]]',
      both: '<b>İkisi birlikte.</b> μ, κ ve δ reseptörleri G proteinine bağlıdır; endojen ligandları enkefalinler, endorfinler ve dinorfindir. Sonuç: ağrı iletimi engellenir. [[K1 s. 273–274]]',
    };
    const sm = (x, a, b) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    return mount(el, (N) => {
      const Wm = N ? 360 : 440, W = N ? 360 : 680, Hs = 330, Hh = N ? 570 : 330;
      const top = H('div', 'f60-note', '', el); top.innerHTML = REF('Reseptörler: PAG, ventral medulla, omurilik · μ, κ, δ · G proteinine bağlı [[K1 s. 273]]');
      const sc = H('div', 'f60-top', '', el); seg(sc, 'Opioid etkisi', 'm', [['none', 'Opioid yok'], ['pre', 'Presinaptik etki'], ['post', 'Postsinaptik etki'], ['both', 'İkisi birlikte']], S.m);
      const svg = svgIn(el, W, Hh, 'Arka boynuz sinapsı: presinaptik uçta Ca²⁺ girişi ve P maddesi salınımı, postsinaptik zarda K⁺ kanalı; opioid reseptörleri ikisini de baskılar');
      const xCa = N ? 70 : 110, xRp = N ? 290 : 330, xK = N ? 180 : 220, xRo = N ? 290 : 380, xP = xCa;
      // presinaptik uç
      mk('path', { d: `M30 150 V64 Q30 24 70 24 H${Wm - 70} Q${Wm - 30} 24 ${Wm - 30} 64 V150Z`, fill: 'var(--warn-soft)', stroke: 'var(--warn)', 'stroke-width': 3 }, svg);
      tx(svg, N ? 40 : 46, 44, 'presinaptik uç (birinci nöron)', 'f60-s f60-b f60-wrn');
      mk('line', { x1: Wm / 2, y1: 0, x2: Wm / 2, y2: 24, stroke: 'var(--warn)', 'stroke-width': 3 }, svg);
      const mem = mk('line', { x1: 30, y1: 150, x2: Wm - 30, y2: 150, stroke: 'var(--warn)', 'stroke-width': 5 }, svg);
      const bars = [mk('rect', { y: 142, width: 8, height: 16, rx: 2, fill: 'var(--paper)', stroke: 'var(--warn)', 'stroke-width': 2 }, svg), mk('rect', { y: 142, width: 8, height: 16, rx: 2, fill: 'var(--paper)', stroke: 'var(--warn)', 'stroke-width': 2 }, svg)];
      tx(svg, xCa, 130, 'Ca²⁺ kanalı', 'f60-s f60-b', 'middle');
      // presinaptik reseptör
      const Y = (x, y, dir, c) => { mk('path', { d: `M${x} ${y} v${dir * 16} M${x} ${y + dir * 16} l-8 ${dir * 12} M${x} ${y + dir * 16} l8 ${dir * 12}`, fill: 'none', stroke: c, 'stroke-width': 3, 'stroke-linecap': 'round' }, svg); };
      Y(xRp, 150, 1, 'var(--c-basic)');
      mk('ellipse', { cx: xRp, cy: 134, rx: 11, ry: 8, fill: 'var(--c-basic-soft)', stroke: 'var(--c-basic)', 'stroke-width': 1.5 }, svg); tx(svg, xRp, 138, 'G', 'f60-s f60-b', 'middle');
      tx(svg, xRp, 106, 'opioid reseptörü\n(presinaptik)', 'f60-s f60-b', 'middle');
      // veziküller
      const vx = N ? [44, 82, 120, 158, 196, 234] : [52, 90, 128, 166, 204, 242, 280];
      const ves = vx.map((x, i) => { const g = mk('g', {}, svg); mk('circle', { r: 10, fill: 'var(--paper)', stroke: 'var(--ok)', 'stroke-width': 2 }, g); mk('circle', { r: 3, fill: 'var(--crit)' }, g); g.dataset.x = x; g.setAttribute('transform', `translate(${x},${i % 2 ? 84 : 72})`); return { g, x, y: i % 2 ? 84 : 72 }; });
      // postsinaptik
      mk('path', { d: `M30 230 H${Wm - 30} V282 Q${Wm - 30} 322 ${Wm - 70} 322 H70 Q30 322 30 282Z`, fill: 'var(--c-clin-soft)', stroke: 'var(--c-clin)', 'stroke-width': 3 }, svg);
      mk('line', { x1: 30, y1: 230, x2: Wm - 30, y2: 230, stroke: 'var(--c-clin)', 'stroke-width': 5 }, svg);
      tx(svg, N ? 40 : 46, 304, 'postsinaptik (ikinci nöron)', 'f60-s f60-b f60-clin'); svg.lastChild.setAttribute('y', 314);
      [-9, 9].forEach((d) => mk('path', { d: `M${xP + d - 6} 230 q6 -12 12 0`, fill: 'var(--paper)', stroke: 'var(--crit)', 'stroke-width': 2 }, svg));
      tx(svg, xP, 262, 'P maddesi\nreseptörü', 'f60-s f60-b', 'middle');
      const kch = [mk('rect', { x: xK - 14, y: 223, width: 8, height: 16, rx: 2, fill: 'var(--paper)', stroke: 'var(--c-clin)', 'stroke-width': 2 }, svg), mk('rect', { x: xK + 6, y: 223, width: 8, height: 16, rx: 2, fill: 'var(--paper)', stroke: 'var(--c-clin)', 'stroke-width': 2 }, svg)];
      tx(svg, xK, 262, 'K⁺ kanalı', 'f60-s f60-b', 'middle');
      Y(xRo, 230, -1, 'var(--c-basic)');
      mk('ellipse', { cx: xRo, cy: 246, rx: 11, ry: 8, fill: 'var(--c-basic-soft)', stroke: 'var(--c-basic)', 'stroke-width': 1.5 }, svg); tx(svg, xRo, 250, 'G', 'f60-s f60-b', 'middle');
      tx(svg, xRo, 274, 'opioid reseptörü\n(postsinaptik)', 'f60-s f60-b', 'middle');
      tx(svg, N ? 150 : 168, 196, 'sinaptik aralık', 'f60-s f60-m', 'middle'); svg.lastChild.setAttribute('x', N ? 160 : 190);
      // ligand
      const tri = (g, x, y) => { const t = mk('path', { d: 'M0 -7 L7 6 L-7 6Z', fill: 'var(--c-basic)', stroke: 'var(--paper)', 'stroke-width': 1 }, g); g.setAttribute('transform', `translate(${x},${y})`); return t; };
      const ligP = mk('g', {}, svg), ligQ = mk('g', {}, svg); tri(ligP, xRp, 192); tri(ligQ, xRo, 208);
      // akan noktalar
      const mkD = (n, c, r) => Array.from({ length: n }, () => mk('circle', { r: r || 3.5, fill: c, opacity: 0 }, svg));
      const ca = mkD(5, 'var(--c-basic)', 3.5), pd = mkD(12, 'var(--crit)', 3.2), kd = mkD(5, 'var(--c-clin)', 3.5);
      const ap = mk('circle', { r: 5, fill: 'var(--ink)', stroke: 'var(--paper)', 'stroke-width': 1.5, opacity: 0 }, svg), apo = mk('circle', { r: 5, fill: 'var(--ink)', stroke: 'var(--paper)', 'stroke-width': 1.5, opacity: 0 }, svg);
      // sağ / alt panel: ölçer ve potansiyel
      const px = N ? 20 : 470, py = N ? 350 : 20, pw = N ? 320 : 200;
      tx(svg, px, py + 10, 'P maddesi salınımı', 'f60-s f60-b');
      mk('rect', { x: px, y: py + 18, width: pw, height: 14, rx: 7, fill: 'var(--chip)', stroke: 'var(--line)' }, svg);
      const pm = mk('rect', { x: px, y: py + 18, width: 0, height: 14, rx: 7, fill: 'var(--crit)' }, svg);
      tx(svg, px, py + 50, 'az', 'f60-s f60-m'); tx(svg, px + pw, py + 50, 'çok', 'f60-s f60-m', 'end');
      const gy = py + 76, gh = N ? 120 : 160, g0 = gy + gh * 0.62, gk = 40;
      tx(svg, px, gy, 'İkinci nöron zar potansiyeli', 'f60-s f60-b');
      mk('rect', { x: px, y: gy + 8, width: pw, height: gh, rx: 8, fill: 'var(--paper)', stroke: 'var(--line)' }, svg);
      mk('line', { x1: px + 6, y1: g0, x2: px + pw - 6, y2: g0, stroke: 'var(--muted)', 'stroke-width': 1, 'stroke-dasharray': '2 3' }, svg);
      tx(svg, px + pw - 8, g0 + 13, 'dinlenim', 'f60-s f60-m', 'end');
      mk('line', { x1: px + 6, y1: g0 - 0.5 * gk, x2: px + pw - 6, y2: g0 - 0.5 * gk, stroke: 'var(--crit)', 'stroke-width': 1, 'stroke-dasharray': '5 3' }, svg);
      tx(svg, px + 8, g0 - 0.5 * gk - 4, 'eşik', 'f60-s f60-crit');
      const trace = mk('path', { d: '', fill: 'none', stroke: 'var(--c-clin)', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
      const hyp = tx(svg, px + 8, g0 + 30, 'hiperpolarize', 'f60-s f60-b f60-clin'); hyp.style.opacity = 0;
      const atesle = tx(svg, px + pw - 8, gy + 28, '', 'f60-s f60-b f60-crit', 'end');
      // zaman → potansiyel
      const vOf = (tau, pre, post) => {
        const rel = pre ? 0.25 : 1;
        const base = post ? -0.4 * sm(tau, 1.0, 1.5) : 0;
        const b = tau >= 1.7 && tau <= 2.7 ? Math.sin(Math.PI * (tau - 1.7)) : 0;
        let v = base + 0.85 * rel * b;
        const fire = 0.85 * rel - (post ? 0.4 : 0) >= 0.5;
        if (fire && tau >= 2.0 && tau <= 2.4) { const k = 1 - Math.abs(tau - 2.2) / 0.2; v += 1.1 * k; }
        return v;
      };
      const draw = (tau, gtau) => {
        const pre = S.m === 'pre' || S.m === 'both', post = S.m === 'post' || S.m === 'both';
        const rel = pre ? 0.25 : 1, fire = 0.85 * rel - (post ? 0.4 : 0) >= 0.5;
        ligP.style.opacity = pre ? 1 : 0; ligQ.style.opacity = post ? 1 : 0;
        // AP
        const fa = tau / 0.5; ap.setAttribute('opacity', tau < 0.55 ? 1 : 0); ap.setAttribute('cx', Wm / 2); ap.setAttribute('cy', lerp(2, 56, clamp(fa, 0, 1)));
        // Ca kanalı
        const gap = pre ? 3 : 14, gg = lerp(14, gap, sm(tau, 0.2, 0.5));
        bars[0].setAttribute('x', xCa - gg / 2 - 8); bars[1].setAttribute('x', xCa + gg / 2);
        // Ca
        const nCa = pre ? 1 : 4;
        ca.forEach((d, i) => { const f = (tau - 0.5 - i * 0.1) / 0.5; const on = i < nCa && f > 0 && f < 1; d.setAttribute('opacity', on ? 1 : 0); if (on) { d.setAttribute('cx', xCa + (i - 1.5) * 4); d.setAttribute('cy', lerp(178, 118, f)); } });
        // veziküller
        const ord = ves.map((v, i) => [Math.abs(v.x - xCa), i]).sort((a, b) => a[0] - b[0]).map((q) => q[1]);
        const nF = pre ? 1 : 4;
        ves.forEach((v, i) => { const r = ord.indexOf(i); if (r < nF) { const f = sm(tau, 1.0 + r * 0.08, 1.5 + r * 0.08); v.g.setAttribute('transform', `translate(${v.x},${lerp(v.y, 138, f)})`); v.g.style.opacity = f >= 1 ? 0 : 1; } else { v.g.setAttribute('transform', `translate(${v.x},${v.y})`); v.g.style.opacity = 1; } });
        // P maddesi noktaları
        pd.forEach((d, i) => { const q = Math.floor(i / 3), f = (tau - 1.4 - q * 0.08 - (i % 3) * 0.12) / 0.8; const on = q < nF && f > 0 && f < 1; d.setAttribute('opacity', on ? 1 : 0); if (on) { const vi = ord[q]; d.setAttribute('cx', lerp(ves[vi].x, xP + (i % 3 - 1) * 8, f)); d.setAttribute('cy', lerp(150, 224, f)); } });
        // K⁺
        kch.forEach((r, j) => r.setAttribute('transform', `translate(${(post ? (j ? 7 : -7) : 0) * sm(tau, 0.9, 1.3)},0)`));
        kd.forEach((d, i) => { const f = (tau - 1.1 - i * 0.28) / 0.7; const on = post && f > 0 && f < 1 && tau < 2.9; d.setAttribute('opacity', on ? 1 : 0); if (on) { d.setAttribute('cx', xK + (i % 2 ? 5 : -5)); d.setAttribute('cy', lerp(256, 206, f)); } });
        // ölçer
        pm.setAttribute('width', pw * lerp(0, rel, sm(tau, 1.4, 2.0)));
        // grafik
        const x0g = px + 8, wg = pw - 16, N2 = 120; let dd = ''; const upto = gtau;
        for (let i = 0; i <= N2; i++) { const t2 = (i / N2) * T; if (t2 > upto) break; dd += (i ? 'L' : 'M') + (x0g + (t2 / T) * wg).toFixed(1) + ' ' + (g0 - gk * vOf(t2, pre, post)).toFixed(1); }
        trace.setAttribute('d', dd);
        hyp.style.opacity = post && gtau > 1.5 ? 1 : 0;
        atesle.textContent = gtau > 2.3 ? (fire ? 'ateşledi' : 'ateşlemedi') : '';
        // çıkış AP
        const fo = (tau - 2.4) / 0.7; apo.setAttribute('opacity', fire && fo > 0 && fo < 1 ? 1 : 0); apo.setAttribute('cx', lerp(Wm / 2, Wm - 26, clamp(fo, 0, 1))); apo.setAttribute('cy', 340 - 22 - (0));
        apo.setAttribute('cy', 302);
      };
      const btn = H('div', 'btn-row', '<button type="button" class="btn" data-go="1">▶ Uyarı gönder</button>', el);
      H('p', 'f60-leg', '<span class="f60-tri"></span> endojen opioidler: enkefalin, endorfin, dinorfin', el);
      const render = () => { if (RM) draw(1.45, T); else draw(Math.min(S.tau, T), Math.min(S.tau, T)); };
      const onClick = (e) => {
        const m = e.target.closest('[data-m]'), g = e.target.closest('[data-go]');
        if (m) { S.m = m.dataset.m; press(sc, '[data-m]', S.m, 'data-m'); S.tau = RM ? 99 : 0; cap.set(CP[S.m]); render(); }
        if (g) { S.tau = RM ? 99 : 0; render(); }
      };
      el.addEventListener('click', onClick);
      cap.set(CP[S.m]); render();
      return { tick(dt) { if (RM) return; S.tau += dt; if (S.tau > PER) S.tau = 0; render(); }, stop() { el.removeEventListener('click', onClick); } };
    });
  };

  /* ================= 6 · İnen inhibisyon ================= */
  VIZ.f60_inen = (el) => {
    const cap = capper(el);
    const S = { on: false, drug: null };
    const CP = {
      off: '<b>Yol kapalı.</b> Nosiseptif sinyal birinci nörondan ikinci nörona, oradan üçüncü nörona tam geçer. "İnen yolu etkinleştir"e basın. [[K1 s. 274]]',
      on: '<b>İnen inhibisyon.</b> PAG nöronları medulladaki rafe çekirdekleri üzerinden arka boynuza iner; birinci ve ikinci nöron arasındaki sinapsı baskılar, ağrı algısı azalır. Nörotransmitterlerin başlıcaları serotonin ve noradrenalin sayılır. [[K1 s. 274]]',
      ssri: '<b>SSRI.</b> Seçici serotonin geri alım inhibitörlerinin analjezik etkisi kısmen inen yolla açıklanır. [[K1 s. 274]]',
      tca: '<b>Trisiklik antidepresan.</b> Analjezik etkisi kısmen inen yolla açıklanır. [[K1 s. 274]]',
      clo: '<b>Klonidin.</b> α2-adrenerjik agonist; analjezisinin inen inhibitör yolun etkinliğini artırmasından kaynaklandığı düşünülür. [[K1 s. 274]]',
    };
    const pass = () => (S.on ? (S.drug ? 0.2 : 0.33) : 1);
    const say = () => cap.set(CP[S.drug || (S.on ? 'on' : 'off')]);
    let dots = [], puffs = [], tn = 0, td = 0, k = 0, shown = pass();
    return mount(el, (N) => {
      const W = N ? 360 : 680, Hh = N ? 530 : 470;
      const xa = N ? 70 : 130, xd = N ? 304 : 560, cx = N ? 170 : 300, ust = 300;
      const svg = svgIn(el, W, Hh, 'İnen ağrı inhibisyonu: PAG ve rafe magnus çekirdeği arka boynuzdaki birinci ve ikinci nöron sinapsını baskılar');
      // yükselen taraf: beyin
      mk('path', { d: `M${xa - 56} 76 Q${xa + 10} 0 ${xa + 76} 76`, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.55 }, svg);
      tx(svg, xa + 10, 14, N ? 'Talamus →\nkorteks' : 'Talamus → korteks', 'f60-s f60-b', 'middle'); if (N) svg.lastChild.setAttribute('y', 12);
      mk('ellipse', { cx: xa + 6, cy: 106, rx: N ? 36 : 42, ry: 16, fill: 'var(--chip)', stroke: 'var(--line)', 'stroke-width': 2 }, svg); tx(svg, xa + 6, 110, 'Talamus', 'f60-s f60-b', 'middle');
      // PAG, rafe
      mk('ellipse', { cx: xd, cy: 74, rx: 46, ry: 22, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-width': 2 }, svg);
      tx(svg, xd, 70, 'PAG', 'f60-b f60-crit', 'middle'); tx(svg, xd, 30, 'Periakuaduktal\ngri madde', 'f60-s f60-b', 'middle'); svg.lastChild.setAttribute('y', 16);
      mk('ellipse', { cx: xd, cy: 222, rx: 46, ry: 26, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-width': 2 }, svg);
      tx(svg, xd, 218, 'Rafe magnus\nçekirdeği', 'f60-s f60-b f60-crit', 'middle'); tx(svg, xd, 262, '(medulla)', 'f60-s f60-m', 'middle');
      const o = omurilik(svg, cx, ust, 'in'); const cy = o.cy; const hx = cx - 52, hy = cy - 42;
      const n1 = [[4, 352], [cx - 110, 352], [cx - 76, 344], [hx, hy]];
      const n2 = [[hx, hy], [hx - 26, 312], [xa + 10, 300], [xa, 284], [xa, 122]];
      const n3 = [[xa + 12, 94], [xa + 38, 52]];
      const dsc = [[xd, 96], [xd, 196], [xd, 248], [xd, 290], [cx - 20, 300], [cx - 50, 326], [hx + 3, hy - 4]];
      const P = { n1: Yol(n1), n2: Yol(n2), n3: Yol(n3), d: Yol(dsc) };
      const ln = (a, c, w) => mk('path', { d: pts(a), fill: 'none', stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
      const lD = ln(dsc, 'var(--crit)', 4), l1 = ln(n1, 'var(--warn)', 3.5), l2 = ln(n2, 'var(--c-clin)', 4), l3 = ln(n3, 'var(--ok)', 4);
      mk('circle', { cx: hx, cy: hy, r: 6, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 2.5 }, svg);
      const sg = mk('g', {}, svg); mk('circle', { cx: hx + 22, cy: hy - 20, r: 9, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-width': 1.5 }, sg); tx(sg, hx + 22, hy - 15, '−', 'f60-b f60-crit', 'middle');
      tx(svg, xd - 10, 278, 'Serotonin (5-HT) ·\nNoradrenalin', 'f60-s f60-b f60-crit', 'end'); svg.lastChild.setAttribute('y', N ? 276 : 276);
      // etiketler
      tx(svg, xa + 8, 210, 'ikinci nöron\n(yükselen)', 'f60-s f60-b f60-clin');
      tx(svg, xa + 46, 78, 'üçüncü nöron', 'f60-s f60-b f60-ok'); if (N) svg.lastChild.setAttribute('x', xa + 42);
      if (!N) tx(svg, 6, 322, 'birinci nöron\n(periferik nosiseptörden)', 'f60-s f60-b f60-wrn');
      else {
        const ly = cy + 98;
        [['var(--warn)', 'birinci nöron (periferik nosiseptörden)'], ['var(--c-clin)', 'ikinci nöron (yükselen)'], ['var(--ok)', 'üçüncü nöron'], ['var(--crit)', 'inen inhibitör yol']].forEach((q, i) => { mk('line', { x1: 6, y1: ly + i * 19 - 4, x2: 22, y2: ly + i * 19 - 4, stroke: q[0], 'stroke-width': 4 }, svg); tx(svg, 28, ly + i * 19, q[1], 'f60-s'); });
      }
      // denetimler
      const mt = H('div', 'f60-meter', '<span class="f60-ml">Ağrı algısı</span><span class="f60-mbar"><i></i></span><span class="f60-mr"><em>az</em><em>çok</em></span>', el);
      const fill = mt.querySelector('i');
      const ctl = H('div', 'f60-ctl', '', el);
      const main = H('button', 'btn', 'İnen yolu etkinleştir', H('div', 'btn-row', '', ctl)); main.type = 'button';
      const dsg = seg(ctl, 'İlaç', 'drug', [['ssri', 'SSRI'], ['tca', 'Trisiklik antidepresan'], ['clo', 'Klonidin (α2 agonisti)']], S.drug);
      function paint() {
        main.setAttribute('aria-pressed', String(S.on)); main.classList.toggle('ghost', !S.on); main.textContent = S.on ? 'İnen yol etkin' : 'İnen yolu etkinleştir';
        press(dsg, '[data-drug]', S.drug || '', 'data-drug');
        const p = pass(), inh = S.on ? (S.drug ? 1 : 0.6) : 0;
        lD.setAttribute('opacity', S.on ? 1 : 0.15); lD.setAttribute('stroke-width', S.on ? (S.drug ? 6 : 4) : 2);
        sg.style.opacity = S.on ? 1 : 0.25;
        l2.setAttribute('stroke-width', 1.5 + 4 * p); l3.setAttribute('stroke-width', 1.5 + 4 * p); l2.setAttribute('opacity', 0.35 + 0.65 * p); l3.setAttribute('opacity', 0.35 + 0.65 * p);
        fill.style.width = (p * 100).toFixed(0) + '%';
      }
      const onClick = (e) => {
        if (e.target.closest('.btn') === main) { S.on = !S.on; if (!S.on) S.drug = null; }
        const b = e.target.closest('[data-drug]'); if (b) { S.drug = S.drug === b.dataset.drug ? null : b.dataset.drug; if (S.drug) S.on = true; }
        else if (e.target.closest('.btn') !== main) return;
        paint(); say();
      };
      ctl.addEventListener('click', onClick);
      paint(); say();
      const mkDot = (path, c, r) => { const d = { path, f: 0, c, el: mk('circle', { r: r || 4.5, fill: c, stroke: 'var(--paper)', 'stroke-width': 1.5 }, svg) }; return d; };
      dots = []; puffs = [];
      return {
        tick(dt) {
          if (RM) return;
          tn += dt; td += dt;
          if (tn > 0.6) { tn = 0; k++; const d = mkDot('n1', 'var(--warn)'); d.pass = ((k * 0.618) % 1) < pass(); dots.push(d); }
          if (S.on && td > (S.drug ? 0.4 : 0.7)) { td = 0; dots.push(mkDot('d', 'var(--crit)')); }
          dots.forEach((d) => {
            d.f += dt / (d.path === 'd' ? 1.8 : d.path === 'n1' ? 0.9 : d.path === 'n2' ? 1.4 : 0.5);
            if (d.f >= 1) {
              d.dead = true;
              if (d.path === 'n1' && d.pass) { const n = mkDot('n2', 'var(--c-clin)'); dots.push(n); }
              else if (d.path === 'n2') dots.push(mkDot('n3', 'var(--ok)'));
              else if (d.path === 'd') for (let i = 0; i < (S.drug ? 6 : 4); i++) puffs.push({ a: Math.random() * 6.28, f: 0, el: mk('circle', { r: 3, fill: 'var(--crit)', cx: hx, cy: hy, opacity: 0 }, svg) });
            } else { const p = P[d.path].at(d.f); d.el.setAttribute('cx', p[0]); d.el.setAttribute('cy', p[1]); }
          });
          dots = dots.filter((d) => { if (d.dead) d.el.remove(); return !d.dead; });
          puffs.forEach((q) => { q.f += dt / 0.8; q.el.setAttribute('cx', hx + Math.cos(q.a) * 20 * q.f + 8); q.el.setAttribute('cy', hy + Math.sin(q.a) * 20 * q.f - 6); q.el.setAttribute('opacity', 1 - q.f); });
          puffs = puffs.filter((q) => { if (q.f >= 1) q.el.remove(); return q.f < 1; });
        },
        stop() { ctl.removeEventListener('click', onClick); dots = []; puffs = []; },
      };
    });
  };

  /* ================= 7 · Hiperaljezi ve allodini ================= */
  VIZ.f60_hiper = (el) => {
    const cap = capper(el);
    const S = { z: 'hasar', u: 'agri', n: false };
    const sig = (v) => 1 / (1 + Math.exp(-v));
    const CURVE = { norm: (x) => 0.9 * sig(11 * (x - 0.78)), hiper: (x) => sig(12 * (x - 0.5)), allo: (x) => sig(14 * (x - 0.07)) };
    const THR = 0.3, XU = { dokunma: 0.12, agri: 0.85 };
    const MEK = {
      hasar: 'P maddesi, bradikinin, histamin → nosiseptör duyarlanır, eşik ↓',
      cevre: 'Uyarılmış ikinci nöronlar P maddesi, CGRP, glutamat salar → komşu ikinci nöronlar duyarlanır (somatotopik düzen)',
      sag: 'Normal eşik',
    };
    const say = () => {
      if (S.u === 'dokunma') {
        if (S.n) cap.set('<b>Allodini.</b> Normalde ağrısız uyaran (hafif dokunma, serin esinti) ağrılı algılanır. Yararı yoktur; trigeminal nevralji gibi nöropatik ağrılarda sıktır. Olası mekanizma: omurilikte nosiseptör ve mekanoreseptör ara nöronlarının yer değiştirmesi. [[K1 s. 275]]');
        else cap.set('<b>Hafif dokunma.</b> Normalde ağrı oluşturmaz; eşik aşılmaz. [[K1 s. 275]]');
      } else if (S.n) cap.set('<b>Nöropatik ağrı · ağrılı uyaran.</b> Hiperaljezi de sıktır. Hiperaljezi koruyucu sayılabilir, allodininin yararı yoktur. [[K1 s. 275]]');
      else if (S.z === 'hasar') cap.set('<b>Hasarlı bölge · ağrılı uyaran.</b> Duyarlanmış nosiseptörlerin eşiği düşmüştür; ağrı normal deriden fazladır: primer hiperaljezi. Bölge ve uyaran seçin. [[K1 s. 275]]');
      else if (S.z === 'cevre') cap.set('<b>Çevre doku · ağrılı uyaran.</b> Hasarın çevresinde de ağrı artmıştır: sekonder hiperaljezi. Uyarılmış ikinci nöronların saldığı P maddesi, CGRP ve glutamat komşu ikinci nöronları duyarlar; somatotopik düzen nedeniyle bunlar çevre dokuya karşılık gelir. [[K1 s. 275]]');
      else cap.set('<b>Sağlam deri · ağrılı uyaran.</b> Normal yanıt. Hiperaljezi tanımı: normalde ağrı oluşturan uyarandan artmış ağrı. [[K1 s. 275]]');
    };
    return mount(el, (N) => {
      const W = N ? 360 : 680, Hh = N ? 460 : 320;
      const svg = svgIn(el, W, Hh, 'Sol: hasarlı, çevre ve sağlam deri haritası. Sağ: uyaran şiddetine karşı ağrı eğrileri (normal, hiperaljezi, allodini)');
      const zone = {};
      const mw = N ? 352 : 330, mx = N ? 4 : 0, my = 28, mh = N ? 164 : 272;
      const cxm = mx + mw / 2, cym = my + mh / 2;
      tx(svg, mx, 18, 'Deri haritası', 'f60-b f60-m');
      const gs = mk('g', {}, svg); mk('rect', { x: mx, y: my, width: mw, height: mh, rx: 14, class: 'f60-skin' }, gs); zone.sag = gs.firstChild; clickable(gs, 'Sağlam deri', () => pick('z', 'sag'));
      const gc = mk('g', {}, svg); zone.cevre = mk('ellipse', { cx: cxm, cy: cym, rx: N ? 150 : 128, ry: N ? 68 : 104, class: 'f60-cev' }, gc); clickable(gc, 'Çevre doku', () => pick('z', 'cevre'));
      const gh = mk('g', {}, svg); zone.hasar = mk('ellipse', { cx: cxm, cy: cym, rx: N ? 70 : 58, ry: N ? 38 : 48, class: 'f60-has' }, gh); clickable(gh, 'Hasarlı bölge', () => pick('z', 'hasar'));
      tx(svg, cxm, cym - 2, 'hasarlı bölge\n(ör. güneş yanığı)', 'f60-s f60-b f60-crit', 'middle'); svg.lastChild.style.pointerEvents = 'none';
      tx(svg, cxm, N ? cym + 57 : cym + 88, 'çevre doku', 'f60-s f60-b f60-wrn', 'middle'); svg.lastChild.style.pointerEvents = 'none';
      tx(svg, mx + 12, my + mh - 10, 'sağlam deri', 'f60-s f60-m'); svg.lastChild.style.pointerEvents = 'none';
      // grafik
      const gx = N ? 48 : 392, gy = N ? 262 : 40, gw = N ? 296 : 276, gh2 = N ? 150 : 200;
      tx(svg, N ? 4 : 352, N ? 232 : 18, 'Uyaran–ağrı', 'f60-b f60-m');
      mk('rect', { x: gx, y: gy, width: gw, height: gh2, fill: 'var(--paper)', stroke: 'var(--line)' }, svg);
      const X = (x) => gx + x * gw, Y = (y) => gy + gh2 - y * (gh2 - 8) - 2;
      mk('line', { x1: gx, y1: Y(THR), x2: gx + gw, y2: Y(THR), stroke: 'var(--muted)', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }, svg);
      tx(svg, gx + gw - 4, Y(THR) - 5, 'ağrı eşiği', 'f60-s f60-m', 'end');
      tx(svg, gx - 6, gy + 12, 'ağrı', 'f60-s f60-m', 'end'); if (N) { svg.lastChild.setAttribute('x', gx - 6); }
      tx(svg, gx, gy + gh2 + 17, 'hafif dokunma', 'f60-s f60-m'); tx(svg, gx + gw, gy + gh2 + 17, 'iğne batması', 'f60-s f60-m', 'end');
      tx(svg, gx + gw / 2, gy + gh2 + (N ? 36 : 36), 'uyaran şiddeti →', 'f60-s f60-m', 'middle');
      const cv = {};
      const cols = { norm: ['var(--muted)', ''], hiper: ['var(--crit)', ''], allo: ['var(--accent)', '7 4'] };
      Object.keys(CURVE).forEach((k) => { let d = ''; for (let i = 0; i <= 60; i++) { const x = i / 60; d += (i ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(CURVE[k](x)).toFixed(1); } cv[k] = mk('path', { d, fill: 'none', stroke: cols[k][0], 'stroke-width': 3, 'stroke-dasharray': cols[k][1] || '0', 'stroke-linecap': 'round' }, svg); });
      const vl = mk('line', { y1: gy, y2: gy + gh2, stroke: 'var(--ink)', 'stroke-width': 1.5, 'stroke-dasharray': '2 3' }, svg);
      const pt = mk('circle', { r: 7, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 3 }, svg);
      // alt: mekanizma + denetim + ölçer
      const mek = H('p', 'f60-mek', '', el);
      const mt = H('div', 'f60-meter', '<span class="f60-ml">Ağrı <b data-o="s"></b></span><span class="f60-mbar"><i></i></span><span class="f60-mr"><em>az</em><em>çok</em></span>', el);
      const ctl = H('div', 'f60-ctl', '', el);
      seg(ctl, 'Bölge', 'z', [['hasar', 'Hasarlı bölge'], ['cevre', 'Çevre doku'], ['sag', 'Sağlam deri']], S.z);
      seg(ctl, 'Uyaran', 'u', [['dokunma', 'Hafif dokunma / serin esinti'], ['agri', 'Ağrılı uyaran']], S.u);
      const tg = H('button', 'btn ghost', 'Nöropatik ağrı (allodini)', H('div', 'btn-row', '', ctl)); tg.type = 'button';
      function upd() {
        const key = S.n ? 'allo' : S.z === 'sag' ? 'norm' : 'hiper';
        Object.keys(cv).forEach((k) => cv[k].setAttribute('opacity', k === key ? 1 : 0.22));
        Object.keys(zone).forEach((k) => zone[k].classList.toggle('f60-sel', k === S.z));
        const x = XU[S.u], y = CURVE[key](x);
        vl.setAttribute('x1', X(x)); vl.setAttribute('x2', X(x)); pt.setAttribute('cx', X(x)); pt.setAttribute('cy', Y(y));
        pt.style.stroke = y > THR ? 'var(--crit)' : 'var(--ink)';
        mek.innerHTML = '<b>' + { hasar: 'Hasarlı bölge', cevre: 'Çevre doku', sag: 'Sağlam deri' }[S.z] + ':</b> ' + MEK[S.z];
        mt.querySelector('i').style.width = (y * 100).toFixed(0) + '%';
        mt.querySelector('[data-o=s]').textContent = y < THR ? '· eşik altı, ağrı yok' : y < 0.65 ? '· orta' : y < 0.85 ? '· belirgin' : '· şiddetli';
        tg.setAttribute('aria-pressed', String(S.n)); tg.classList.toggle('ghost', !S.n);
        press(ctl, '[data-z]', S.z, 'data-z'); press(ctl, '[data-u]', S.u, 'data-u');
        say();
      }
      function pick(k, v) { S[k] = v; upd(); }
      const onClick = (e) => { const b = e.target.closest('[data-z],[data-u]'); if (b) { if (b.dataset.z) S.z = b.dataset.z; else S.u = b.dataset.u; upd(); } if (e.target.closest('.btn') === tg) { S.n = !S.n; upd(); } };
      ctl.addEventListener('click', onClick);
      upd();
      return { stop() { ctl.removeEventListener('click', onClick); } };
    });
  };

  /* ================= 8 · Nöropatik ağrı: iki mekanizma ================= */
  VIZ.f60_noropati = (el) => {
    const cap = capper(el);
    const T = 9.5;
    const S = { v: 'dm', t: RM ? T : 0, run: false };
    const CP = {
      dm: '<b>Diyabetik nöropati.</b> Miyelinli lifin iskemisi demiyelinizasyon yapar; açığa çıkan akson ektopik aksiyon potansiyelleri üretir, saplanan ya da yanan ağrı olarak algılanır. [[K1 s. 275]]',
      kes: '<b>Kesilmiş sinir.</b> Kesilen akson, Schwann hücrelerinin saldığı sinir büyüme faktörüyle yeniden büyümeye çalışır; büyüme düzensiz olabilir. Filizlenen uçlar kendiliğinden aksiyon potansiyeli üretebilir ya da eşikleri değişmiş olabilir. [[K1 s. 275]]',
    };
    const TK = { dm: [4.7, 5.2, 5.4, 6.1, 6.3, 6.9, 7.6, 7.8, 8.4], kes: [5.9, 6.2, 6.4, 7.0, 7.4, 7.6, 8.2, 8.7] };
    const sm = (x, a, b) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    let M;
    M = mount(el, (N) => {
      const W = N ? 360 : 680, Hh = N ? 292 : 262, ay = N ? 112 : 108, X = (f) => f * W;
      const sc = H('div', 'f60-top', '', el); seg(sc, 'Mekanizma', 'v', [['dm', 'Diyabetik nöropati'], ['kes', 'Kesilmiş sinir']], S.v);
      const svg = svgIn(el, W, Hh, 'Hasarlı sinirin kendiliğinden ateşlemesi: diyabette iskemi, demiyelinizasyon ve ektopik aksiyon potansiyelleri; kesilmiş sinirde düzensiz filizlenme');
      const axE = S.v === 'dm' ? (N ? 0.66 : 0.76) : 0.42;
      const els = { sheaths: [], dots: [] };
      // sağlam akson
      mk('line', { x1: X(0.03), y1: ay, x2: X(axE), y2: ay, stroke: 'var(--accent)', 'stroke-width': 3 }, svg);
      const ns = S.v === 'dm' ? 6 : 3, L = (X(axE) - X(0.03)) / ns;
      for (let i = 0; i < ns; i++) els.sheaths.push(mk('rect', { x: X(0.03) + i * L + 3, y: ay - 11, width: L - 6, height: 22, rx: 9, fill: 'var(--accent-soft)', stroke: 'var(--accent)', 'stroke-width': 2 }, svg));
      const bare = mk('line', { x1: 0, y1: ay, x2: 0, y2: ay, stroke: 'var(--crit)', 'stroke-width': 4, opacity: 0 }, svg);
      const strip = { x0: X(0.03), w: X(0.94), y: ay + (N ? 86 : 92) };
      tx(svg, strip.x0, strip.y - 8, 'ateşleme izi', 'f60-s f60-b');
      mk('rect', { x: strip.x0, y: strip.y, width: strip.w, height: 34, rx: 6, fill: 'var(--paper)', stroke: 'var(--line)' }, svg);
      tx(svg, strip.x0 + strip.w, strip.y + 50, 'zaman →', 'f60-s f60-m', 'end');
      const ticks = TK[S.v].map((t) => mk('line', { x1: strip.x0 + (t / T) * strip.w, x2: strip.x0 + (t / T) * strip.w, y1: strip.y + 5, y2: strip.y + 29, stroke: 'var(--crit)', 'stroke-width': 2.5, opacity: 0 }, svg));
      const ectL = tx(svg, strip.x0, strip.y + 50, 'ektopik aksiyon potansiyelleri', 'f60-s f60-b f60-crit'); ectL.style.opacity = 0;
      let upd;
      if (S.v === 'dm') {
        const vx0 = X(0.1), vx1 = X(0.62);
        const ves = mk('rect', { x: vx0, y: 28, width: vx1 - vx0, height: 20, rx: 10, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-width': 2 }, svg);
        tx(svg, vx0, 22, 'kan damarı', 'f60-s f60-m');
        const isk = tx(svg, (vx0 + vx1) / 2, 43, 'iskemi', 'f60-s f60-b f60-crit', 'middle'); isk.style.opacity = 0;
        const demy = tx(svg, X(0.03) + 3.5 * L + 3, ay - 22, 'demiyelinizasyon', 'f60-s f60-b f60-crit', 'middle'); demy.style.opacity = 0;
        const bx0 = X(0.03) + 2 * L + 6, bx1 = X(0.03) + 5 * L - 6;
        const bubX = N ? 310 : X(0.89), bub = mk('g', {}, svg);
        mk('ellipse', { cx: bubX, cy: ay, rx: N ? 46 : 54, ry: 30, fill: 'var(--crit-soft)', stroke: 'var(--crit)', 'stroke-width': 2 }, bub); tx(bub, bubX, ay - 4, 'saplanan /\nyanan ağrı', 'f60-s f60-b f60-crit', 'middle'); bub.style.opacity = 0;
        tx(svg, bubX, ay + 44, 'algı', 'f60-s f60-m', 'middle');
        upd = () => {
          const t = S.t;
          ves.setAttribute('opacity', 1 - 0.7 * sm(t, 0.5, 2)); isk.style.opacity = t > 0.6 ? 1 : 0;
          els.sheaths.forEach((s, i) => { if (i >= 2 && i <= 4) { const f = sm(t, 2.5 + (i - 2) * 0.5, 3.5 + (i - 2) * 0.5); s.setAttribute('opacity', 1 - f); s.setAttribute('transform', `scale(1,${1 - f * 0.4})`); s.style.transformOrigin = `${+s.getAttribute('x') + L / 2}px ${ay}px`; } });
          demy.style.opacity = t > 4.0 ? 1 : 0;
          const bareOn = t > 4.0; bare.setAttribute('opacity', bareOn ? 1 : 0); bare.setAttribute('x1', bx0); bare.setAttribute('x2', bx1);
          bare.setAttribute('y1', ay + (bareOn && t < T ? Math.sin(t * 30) * 1.2 : 0)); bare.setAttribute('y2', ay);
          bub.style.opacity = t > 5.3 ? 1 : 0;
          ticks.forEach((k, i) => k.setAttribute('opacity', t >= TK.dm[i] ? 1 : 0)); ectL.style.opacity = t >= TK.dm[0] ? 1 : 0;
          els.dots.forEach((d, i) => { const f = (t - TK.dm[i]) / 1.5; d.setAttribute('opacity', f > 0 && f < 1 ? 1 : 0); d.setAttribute('cx', lerp((bx0 + bx1) / 2, bubX - 40, clamp(f, 0, 1))); d.setAttribute('cy', ay); });
        };
        TK.dm.forEach(() => els.dots.push(mk('circle', { r: 4.5, fill: 'var(--crit)', stroke: 'var(--paper)', 'stroke-width': 1.5, opacity: 0 }, svg)));
      } else {
        const tip = X(axE);
        // Schwann
        const sch = [[0.465, ay - 34], [0.5, ay + 38], [0.535, ay - 40]].map(([f, y]) => mk('ellipse', { cx: X(f), cy: y, rx: N ? 18 : 24, ry: 12, fill: 'var(--ok-soft)', stroke: 'var(--ok)', 'stroke-width': 1.8 }, svg));
        tx(svg, X(0.5), 22, 'Schwann hücreleri', 'f60-s f60-b f60-ok', 'middle');
        const sprouts = [
          [[tip, ay], [X(0.5), ay - 8], [X(0.6), ay - 26], [X(0.72), ay - 38]],
          [[tip, ay], [X(0.52), ay + 6], [X(0.64), ay + 10], [X(0.78), ay + 2]],
          [[tip, ay], [X(0.49), ay + 22], [X(0.57), ay + 46], [X(0.5), ay + 62]],
          [[tip, ay], [X(0.5), ay - 20], [X(0.58), ay - 44], [X(0.54), ay - 62]],
        ].map((a) => ({ a, p: mk('path', { d: pts(a), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '0 1' }, svg), y: Yol(a) }));
        const lab1 = tx(svg, X(0.72) + 4, ay - 46, 'eşik değişmiş', 'f60-s f60-b f60-crit'); lab1.style.opacity = 0;
        const lab2 = tx(svg, X(0.78) - 4, ay + 22, 'eşik değişmiş', 'f60-s f60-b f60-crit', 'end'); lab2.style.opacity = 0;
        const ngf = tx(svg, X(0.77), ay + 56, 'sinir büyüme\nfaktörü (NGF)', 'f60-s f60-b f60-ok', 'middle'); ngf.style.opacity = 0;
        tx(svg, X(0.03), ay - 22, 'sağlam parça', 'f60-s f60-m');
        const nd = Array.from({ length: 6 }, () => mk('circle', { r: 3.2, fill: 'var(--ok)', opacity: 0 }, svg));
        TK.kes.forEach(() => els.dots.push(mk('circle', { r: 4.5, fill: 'var(--crit)', stroke: 'var(--paper)', 'stroke-width': 1.5, opacity: 0 }, svg)));
        const full = Yol([[sprouts[1].a[3][0], sprouts[1].a[3][1]], ...sprouts[1].a.slice(0, 3).reverse(), [X(0.03), ay]]);
        upd = () => {
          const t = S.t;
          ngf.style.opacity = t > 0.4 && t < 4.5 ? 1 : 0;
          nd.forEach((d, i) => { const f = ((t - 0.5 - i * 0.35) % 1.6) / 1.2; const on = t > 0.5 && t < 4.5 && f > 0 && f < 1; d.setAttribute('opacity', on ? 1 : 0); if (on) { const s = sch[i % 3]; d.setAttribute('cx', lerp(+s.getAttribute('cx'), tip + 4, f)); d.setAttribute('cy', lerp(+s.getAttribute('cy'), ay, f)); } });
          const g = sm(t, 2.6, 5.6); sprouts.forEach((s) => s.p.setAttribute('stroke-dasharray', `${g} 1.01`));
          lab1.style.opacity = lab2.style.opacity = t > 6 ? 1 : 0;
          ticks.forEach((k, i) => k.setAttribute('opacity', t >= TK.kes[i] ? 1 : 0)); ectL.style.opacity = t >= TK.kes[0] ? 1 : 0;
          els.dots.forEach((d, i) => { const f = (t - TK.kes[i]) / 1.8; d.setAttribute('opacity', f > 0 && f < 1 ? 1 : 0); const p = full.at(clamp(f, 0, 1)); d.setAttribute('cx', p[0]); d.setAttribute('cy', p[1]); });
        };
      }
      const row = H('div', 'btn-row', '', el); const play = H('button', 'btn', S.t > 0 ? '↺ Baştan' : '▶ Oynat', row); play.type = 'button';
      const info = H('div', 'f60-info', '', el);
      info.innerHTML = REF(`<div><b>Nedenler</b><span>Periferik (PNS): diyabet, herpes zoster gibi enfeksiyonlar, kanser invazyonu</span><span>Merkezi (MSS): multipl skleroz, omurilik hasarı</span></div><div><b>Nitelik</b><span>Nöropatik: epizodik (elektrik çarpması gibi) ya da yanıcı; parestezi, allodini</span><span>Nosiseptif: genellikle keskin ya da sızlayıcı</span></div><p>[[K1 s. 275]]</p>`);
      cap.set(CP[S.v]);
      upd();
      const onClick = (e) => {
        const m = e.target.closest('[data-v]'); if (m) { S.v = m.dataset.v; S.t = RM ? T : 0; S.run = false; cap.set(CP[S.v]); M.rebuild(); return; }
        if (e.target.closest('.btn') === play) { S.t = RM ? T : 0; S.run = !RM; play.textContent = '↺ Baştan'; upd(); }
      };
      el.addEventListener('click', onClick);
      return { tick(dt) { if (S.run) { S.t += dt; if (S.t >= T) { S.t = T; S.run = false; } upd(); } }, stop() { el.removeEventListener('click', onClick); } };
    });
    return M;
  };

  /* ================= 9 · KBAS: etkilenen uzuv ================= */
  VIZ.f60_krps = (el) => {
    const cap = capper(el);
    const S = { k: null };
    const CP = {
      1: '<b>Vazomotor değişiklik.</b> Etkilenen uzuv diğerinden daha sıcak ya da daha soğuk olabilir. [[K1 s. 275]]',
      2: '<b>Sudomotor değişiklik.</b> Kitaba göre terleme azalır (klinikte artış da görülür). [[K1 s. 275]]',
      3: '<b>Trofik değişiklik.</b> Kıl ve tırnak büyümesi azalır. [[K1 s. 275]]',
      4: '<b>Osteoporoz.</b> Alttaki kemikte gelişir. [[K1 s. 275]]',
      5: '<b>Nöropatik ağrı.</b> Hiperaljezi ve allodini sıktır. [[K1 s. 275]]',
    };
    const LST = [['Vazomotor', 'karşı uzuvdan sıcak ya da soğuk'], ['Sudomotor', 'terleme değişir (kitapta azalır)'], ['Kıl ve tırnak', 'büyüme azalır'], ['Kemik', 'osteoporoz'], ['Nöropatik ağrı', 'hiperaljezi ve allodini sık']];
    return mount(el, () => {
      const wrapE = H('div', 'f60-kr', '', el);
      const svg = svgIn(wrapE, 340, 300, 'Sağlam ve etkilenen uzvun karşılaştırması: vazomotor, sudomotor, kıl ve tırnak, kemik ve nöropatik ağrı bulguları');
      const defs = mk('defs', {}, svg), lg = mk('linearGradient', { id: 'f60-kr-g', x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
      [['0', 'var(--crit-soft)'], ['0.5', 'var(--crit-soft)'], ['0.5', 'var(--c-basic-soft)'], ['1', 'var(--c-basic-soft)']].forEach(([o, c]) => mk('stop', { offset: o, 'stop-color': c }, lg));
      const feat = {};
      const limb = (X, aff) => {
        const fill = aff ? 'url(#f60-kr-g)' : 'var(--chip)'; const st = { fill, stroke: 'var(--muted)', 'stroke-width': 2 };
        mk('rect', Object.assign({ x: X - 26, y: 150, width: 52, height: 132, rx: 14 }, st), svg);
        mk('rect', Object.assign({ x: X - 32, y: 98, width: 64, height: 62, rx: 14 }, st), svg);
        [[-30, 60], [-15, 50], [0, 54], [15, 66]].forEach(([dx, top]) => mk('rect', Object.assign({ x: X + dx, y: top + 22, width: 14, height: 98 - top - 14, rx: 7 }, st), svg));
        mk('rect', Object.assign({ x: X - 48, y: 114, width: 15, height: 30, rx: 7 }, st), svg);
        // tırnaklar
        [[-30, 60], [-15, 50], [0, 54], [15, 66]].forEach(([dx, top]) => mk('rect', { x: X + dx + 2.5, y: top + 24, width: 9, height: aff ? 3 : 7, rx: 2, fill: 'var(--paper)', stroke: 'var(--muted)', 'stroke-width': 1.2 }, svg));
        // kemik
        [-9, 9].forEach((dx) => mk('rect', { x: X + dx - 3, y: 164, width: 6, height: 106, rx: 3, fill: 'none', stroke: aff ? 'var(--muted)' : 'var(--ink)', 'stroke-width': aff ? 1.5 : 2, 'stroke-dasharray': aff ? '2 4' : '0', opacity: aff ? 0.7 : 0.6 }, svg));
        // kıl
        const nh = aff ? 3 : 9;
        for (let i = 0; i < nh; i++) { const hx = X - 20 + (aff ? i * 18 : i * 5), hy = 196 + (i % 3) * 22 + (aff ? 6 : 0); mk('path', { d: `M${hx} ${hy} l6 -7`, stroke: 'var(--ink)', 'stroke-width': 1.3, opacity: 0.7 }, svg); }
        // ter damlaları
        const nd = aff ? 1 : 3;
        for (let i = 0; i < nd; i++) mk('path', { d: `M${X + 14 - i * 6} ${222 + i * 18 - 6} q6 8 0 12 q-6 -4 0 -12z`, fill: 'var(--c-basic-soft)', stroke: 'var(--c-basic)', 'stroke-width': 1.5 }, svg);
      };
      limb(85, false); limb(255, true);
      tx(svg, 85, 18, 'Sağlam', 'f60-b', 'middle'); tx(svg, 255, 18, 'Etkilenen\n(yaralanma bölgesi)', 'f60-b', 'middle');
      // yara izi + şimşek
      mk('path', { d: 'M241 238 l12 8 l8 -10 l10 8', fill: 'none', stroke: 'var(--crit)', 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
      mk('path', { d: 'M298 108 l-8 16 h8 l-6 16 l16 -20 h-9 l7 -12z', fill: 'var(--warn)', stroke: 'var(--ink)', 'stroke-width': 1, 'stroke-linejoin': 'round' }, svg);
      const MP = [[205, 190], [307, 196], [307, 64], [205, 246], [326, 150]];
      const ring = mk('circle', { r: 20, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 3, opacity: 0 }, svg);
      const mks = MP.map((p, i) => { const g = mk('g', { transform: `translate(${p[0]},${p[1]})` }, svg); const c = mk('circle', { r: 11, class: 'f60-mk' }, g); tx(g, 0, 4.5, String(i + 1), 'f60-b', 'middle'); clickable(g, LST[i][0], () => pick(i + 1)); return c; });
      // liste
      const side = H('div', 'f60-kr-l', '', wrapE);
      H('p', 'f60-kr-h', 'Sempatik sinir sistemi işlev bozukluğu · nedeni bilinmiyor · az sayıda hastada', side);
      const ol = H('ol', '', '', side);
      LST.forEach((q, i) => { const li = H('li', '', `<button type="button" data-k="${i + 1}" aria-pressed="false"><span class="f60-no">${i + 1}</span><span><b>${q[0]}</b> — ${q[1]}</span></button>`, ol); });
      function pick(k) {
        S.k = S.k === k ? null : k;
        mks.forEach((c, i) => c.classList.toggle('f60-sel', S.k === i + 1));
        ol.querySelectorAll('button').forEach((b) => { b.setAttribute('aria-pressed', String(+b.dataset.k === S.k)); });
        if (S.k) { ring.setAttribute('cx', MP[S.k - 1][0] - (S.k === 5 ? 0 : 0)); ring.setAttribute('cy', MP[S.k - 1][1]); ring.setAttribute('opacity', 1); cap.set(CP[S.k]); } else { ring.setAttribute('opacity', 0); cap.reset(); }
      }
      const onClick = (e) => { const b = e.target.closest('button[data-k]'); if (b) pick(+b.dataset.k); };
      side.addEventListener('click', onClick);
      if (S.k) { const k = S.k; S.k = null; pick(k); }
      return { stop() { side.removeEventListener('click', onClick); } };
    });
  };
})();
