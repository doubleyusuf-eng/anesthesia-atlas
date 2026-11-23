/* Fizyoloji Bölüm 61 · Göz ve göz içi basınç · bileşenler (K1 s. 276–278).
   Çizimler şematiktir; yalnız kitabın verdiği sayılar mutlak yazılır, gerisi temsilîdir (her bileşenin viz-foot satırında belirtilir). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const txt = (parent, x, y, s, cls, extra) => { const t = mk('text', Object.assign({ x, y, class: cls || 'f61-t' }, extra || {}), parent); t.textContent = s; return t; };
  const dpath = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const setCap = (el, html) => { const v = el.closest('.viz'); const c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  const isN = (el) => (el.clientWidth || window.innerWidth) < 560;

  /* Genişlik 560 px'in altına inince/üstüne çıkınca bileşeni yeniden kurar. build(narrow, S) temizleme işlevi döndürür. */
  function mount(el, S, build) {
    let n = isN(el), cl = build(n, S);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => {
      const m = isN(el);
      if (m !== n && el.clientWidth > 0) { n = m; if (cl) cl(); el.innerHTML = ''; cl = build(n, S); }
    }) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); if (cl) cl(); };
  }

  /* ---------- ortak göz kesiti (yerel birim: sklera yarıçapı 100; kornea solda, optik sinir sağda) ---------- */
  const TH = 38 * Math.PI / 180;
  const GX = -100 * Math.cos(TH), GY = 100 * Math.sin(TH);
  const arcR = (r, th) => { const a = th * Math.PI / 180; const x = -r * Math.cos(a), y = r * Math.sin(a); return `M${x.toFixed(1)} ${(-y).toFixed(1)} A${r} ${r} 0 1 1 ${x.toFixed(1)} ${y.toFixed(1)}`; };
  function gozKesiti(parent, o) {
    const g = mk('g', { transform: `translate(${o.cx} ${o.cy}) scale(${o.s})` }, parent);
    mk('path', { class: 'f61-body', d: `M${GX.toFixed(1)} ${(-GY).toFixed(1)} A100 100 0 1 1 ${GX.toFixed(1)} ${GY.toFixed(1)} Q-150 0 ${GX.toFixed(1)} ${(-GY).toFixed(1)} Z` }, g);
    mk('circle', { class: 'f61-p f61-vit', 'data-p': 'vitreus', r: 88 }, g);
    mk('path', { class: 'f61-p f61-aq', 'data-p': 'on', d: 'M-76 -58 Q-138 0 -76 58 L-50 68 L-50 -68 Z' }, g);
    mk('rect', { class: 'f61-aq', x: -50, y: -70, width: 8, height: 140 }, g);
    [-1, 1].forEach((k) => {
      mk('path', { class: 'f61-p f61-aq', 'data-p': 'arka', d: `M-44 ${k * 66} L-27 ${k * 57} L-27 ${k * 27} L-44 ${k * 20} Z` }, g);
    });
    mk('ellipse', { class: 'f61-p f61-sol', 'data-p': 'lens', cx: -26, cy: 0, rx: 18, ry: 27 }, g);
    [-1, 1].forEach((k) => {
      mk('path', { class: 'f61-p f61-sol', 'data-p': 'siliyer', d: `M-56 ${k * 69} L-20 ${k * 84} L-24 ${k * 52} L-44 ${k * 62} Z` }, g);
      mk('path', { class: 'f61-zon', d: `M-24 ${k * 54} L-28 ${k * 27}` }, g);
    });
    const ir = [mk('rect', { class: 'f61-p f61-sol', 'data-p': 'iris', x: -50, width: 7 }, g), mk('rect', { class: 'f61-p f61-sol', 'data-p': 'iris', x: -50, width: 7 }, g)];
    const pupil = (r) => { ir[0].setAttribute('y', -72); ir[0].setAttribute('height', 72 - r); ir[1].setAttribute('y', r); ir[1].setAttribute('height', 72 - r); };
    pupil(o.pupil || 14);
    mk('path', { class: 'f61-p f61-re', 'data-p': 'retina', d: arcR(88, 40) }, g);
    mk('path', { class: 'f61-p f61-ko', 'data-p': 'koroid', d: arcR(94, 39) }, g);
    mk('path', { class: 'f61-p f61-sk', 'data-p': 'sklera', d: arcR(100, 38) }, g);
    mk('path', { class: 'f61-p f61-corn', 'data-p': 'kornea', d: `M${GX.toFixed(1)} ${(-GY).toFixed(1)} Q-150 0 ${GX.toFixed(1)} ${GY.toFixed(1)}` }, g);
    mk('path', { class: 'f61-p f61-stalk', 'data-p': 'sinir', d: 'M96 18 L152 19 L152 35 L93 34 Z' }, g);
    mk('path', { class: 'f61-ax', d: 'M96 26 L152 27' }, g);
    mk('path', { class: 'f61-p f61-disc', 'data-p': 'disk', d: 'M85.5 19 L82 35' }, g);
    mk('circle', { class: 'f61-p f61-fov', 'data-p': 'fovea', cx: 88, cy: 0, r: 4 }, g);
    return { g, pupil, E: (x, y) => [o.cx + o.s * x, o.cy + o.s * y] };
  }
  function vurgula(root, sel) {
    root.querySelectorAll('[data-p]').forEach((e) => {
      const on = sel && (e.dataset.p === sel);
      e.classList.toggle('sel', !!on); e.classList.toggle('dim', !!sel && !on);
    });
  }

  /* ================= 1 · f61_kure ================= */
  const KURE = {
    sklera: ['Sklera', '<b>Sklera.</b> Yoğun, fibröz dış tabaka; göze yapı ve koruma sağlar. Önde kornea, arkada optik sinir için iki açıklığı vardır. Bir parçaya dokunun. [[K1 s. 276]]'],
    koroid: ['Koroid', '<b>Koroid.</b> Orta, vasküler tabaka; asıl görevi skleraya ve retinaya besin sağlamaktır. [[K1 s. 276]]'],
    retina: ['Retina', '<b>Retina.</b> İç, nöral tabaka; ışığa duyarlı çubukları ve konileri içerir. [[K1 s. 276]]'],
    kornea: ['Kornea', '<b>Kornea.</b> Skleranın ön açıklığını kapatan saydam bölüm; ön kamaranın ön sınırı. [[K1 s. 276]]'],
    iris: ['İris', '<b>İris.</b> Ön kamarayı arka kamaradan ayırır; ortasındaki pupilladan aköz hümör ön kamaraya geçer. [[K1 s. 276–277]]'],
    lens: ['Lens', '<b>Lens.</b> Arka kamaranın arka, vitreus kamarasının ön sınırı; siliyer kas şeklini değiştirir (akomodasyon). [[K1 s. 276–277]]'],
    siliyer: ['Siliyer cisim', '<b>Siliyer cisim.</b> Arka kamaranın üçüncü kenarı; aköz hümörü üretir. [[K1 s. 276–277]]'],
    fovea: ['Fovea', '<b>Fovea.</b> Retinada koni yoğunluğu yüksek küçük bir çöküntü; okuma gibi işler için keskin görme sağlar. [[K1 s. 276]]'],
    disk: ['Optik disk', '<b>Optik disk.</b> Optik sinirin başı; çubuk ve koni yoktur, kör noktayı oluşturur. [[K1 s. 277]]'],
    sinir: ['Optik sinir', '<b>Optik sinir (II).</b> Gangliyon hücresi aksonlarından oluşur; skleranın arka açıklığından çıkar. [[K1 s. 276]]'],
    on: ['Ön kamara', '<b>Ön kamara.</b> Kornea ile iris arası; aköz hümör içerir. [[K1 s. 276]]'],
    arka: ['Arka kamara', '<b>Arka kamara.</b> İris, lens ve siliyer cisim arasındaki üçgen boşluk; aköz hümör içerir. [[K1 s. 276]]'],
    vitreus: ['Vitreus kamarası', '<b>Vitreus kamarası.</b> Lensin arkası; kollajen ağı, hiyalüronik asit ve sudan oluşan saydam jel olan vitreus hümörüyle dolu. [[K1 s. 276]]'],
  };
  VIZ.f61_kure = (el) => mount(el, { sel: 'sklera' }, (narrow, S) => {
    const sec = (n) => { S.sel = n; vurgula(svg, n); if (narrow) el.querySelectorAll('[data-sec]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sec === n))); else el.querySelectorAll('.f61-lab').forEach((g) => g.classList.toggle('on', g.dataset.sec === n)); setCap(el, KURE[n][1]); };
    const W = narrow ? 360 : 640, H = narrow ? 250 : 340;
    el.innerHTML = '';
    const svg = mk('svg', { class: 'f61-svg' + (narrow ? ' f61-n' : ''), viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Göz küresinin yatay kesiti: sklera, koroid, retina, kornea, iris, lens, siliyer cisim, fovea, optik disk, optik sinir; ön, arka ve vitreus kamarası' }, el);
    const eye = gozKesiti(svg, narrow ? { cx: 150, cy: 125, s: 1.08 } : { cx: 300, cy: 160, s: 1.15 });
    svg.querySelectorAll('[data-p]').forEach((e) => { e.addEventListener('click', () => sec(e.dataset.p)); e.addEventListener('pointerenter', (ev) => { if (ev.pointerType === 'mouse') sec(e.dataset.p); }); e.style.cursor = 'pointer'; });
    if (!narrow) {
      const L = [['siliyer', 77, 'l', [-38, -72]], ['iris', 112, 'l', [-47, -45]], ['kornea', 150, 'l', [-105, -31]], ['lens', 190, 'l', [-26, 0]],
        ['sklera', 50, 'r', [40, -92]], ['koroid', 85, 'r', [60, -72]], ['retina', 120, 'r', [75, -48]], ['fovea', 160, 'r', [88, 0]], ['disk', 200, 'r', [85, 27]], ['sinir', 240, 'r', [130, 28]]];
      L.forEach(([n, y, side, a]) => {
        const g = mk('g', { class: 'f61-lab', 'data-sec': n, tabindex: 0, role: 'button', 'aria-label': KURE[n][0] }, svg);
        const [ax, ay] = eye.E(a[0], a[1]);
        const x = side === 'l' ? 128 : 486;
        mk('path', { class: 'f61-lead', d: `M${side === 'l' ? x + 4 : x - 4} ${y - 4} L${ax} ${ay}` }, g);
        mk('circle', { class: 'f61-ldot', cx: ax, cy: ay, r: 2.6 }, g);
        mk('rect', { class: 'f61-lbg', x: side === 'l' ? x - 112 : x - 2, y: y - 14, width: 116, height: 22, rx: 6 }, g);
        txt(g, side === 'l' ? x : x + 4, y + 1, KURE[n][0], 'f61-t', { 'text-anchor': side === 'l' ? 'end' : 'start' });
        g.addEventListener('click', () => sec(n)); g.addEventListener('pointerenter', (ev) => { if (ev.pointerType === 'mouse') sec(n); });
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec(n); } });
      });
      [['on', 150, [-75, 10], [-70, 60]], ['arka', 300, [-34, 50], [-34, 70]], ['vitreus', 450, [40, 40], [60, 60]]].forEach(([n, x, a]) => {
        const g = mk('g', { class: 'f61-lab', 'data-sec': n, tabindex: 0, role: 'button', 'aria-label': KURE[n][0] }, svg);
        const [ax, ay] = eye.E(a[0], a[1]);
        mk('path', { class: 'f61-lead', d: `M${x} 296 L${ax} ${ay + 4}` }, g);
        mk('circle', { class: 'f61-ldot', cx: ax, cy: ay + 4, r: 2.6 }, g);
        mk('rect', { class: 'f61-lbg', x: x - 62, y: 297, width: 124, height: 22, rx: 6 }, g);
        txt(g, x, 312, KURE[n][0], 'f61-t', { 'text-anchor': 'middle' });
        g.addEventListener('click', () => sec(n)); g.addEventListener('pointerenter', (ev) => { if (ev.pointerType === 'mouse') sec(n); });
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec(n); } });
      });
      mk('rect', { x: 20, y: 322, width: 11, height: 11, class: 'f61-aq' }, svg); txt(svg, 36, 332, 'aköz hümör', 'f61-tm');
      mk('rect', { x: 130, y: 322, width: 11, height: 11, class: 'f61-vit' }, svg); txt(svg, 146, 332, 'vitreus hümörü', 'f61-tm');
    } else {
      mk('rect', { x: 14, y: 232, width: 11, height: 11, class: 'f61-aq' }, svg); txt(svg, 30, 242, 'aköz hümör', 'f61-tm');
      mk('rect', { x: 140, y: 232, width: 11, height: 11, class: 'f61-vit' }, svg); txt(svg, 156, 242, 'vitreus hümörü', 'f61-tm');
      const order = ['sklera', 'koroid', 'retina', 'kornea', 'iris', 'lens', 'siliyer', 'fovea', 'disk', 'sinir'];
      const grid = document.createElement('div'); grid.className = 'f61-grid';
      order.forEach((n) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.sec = n; b.textContent = KURE[n][0]; b.setAttribute('aria-pressed', 'false'); b.addEventListener('click', () => sec(n)); grid.appendChild(b); });
      const gr2 = document.createElement('div'); gr2.className = 'f61-grid f61-g3';
      ['on', 'arka', 'vitreus'].forEach((n) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.sec = n; b.textContent = KURE[n][0]; b.setAttribute('aria-pressed', 'false'); b.addEventListener('click', () => sec(n)); gr2.appendChild(b); });
      el.appendChild(grid); el.appendChild(gr2);
    }
    sec(S.sel);
    return () => {};
  });

  /* ================= 2 · f61_retina ================= */
  VIZ.f61_retina = (el) => mount(el, { L: 100, bs: 'yok' }, (narrow, S) => {
    const W = 360, H = narrow ? 560 : 320;
    el.innerHTML = '';
    const sw = narrow ? 0 : 1;
    const svg = mk('svg', { class: 'f61-svg' + (narrow ? ' f61-n' : ''), viewBox: narrow ? '0 0 360 560' : '0 0 640 320', role: 'img', 'aria-label': 'Işık düzeyine göre çubuk ve koni etkinliği, sahnenin rengi ve retina şeridinde alıcıların dağılımı; optik diskte alıcı yok' }, el);
    // --- sahne
    const sx = narrow ? 20 : 30, sy = narrow ? 30 : 50, sW = narrow ? 320 : 250, sH = narrow ? 150 : 170;
    txt(svg, sx, sy - 10, 'Gördüğünüz sahne', 'f61-th');
    const clip = mk('clipPath', { id: 'f61-clip-sahne' }, mk('defs', {}, svg));
    mk('rect', { x: sx, y: sy, width: sW, height: sH, rx: 8 }, clip);
    const sahne = mk('g', { 'clip-path': 'url(#f61-clip-sahne)' }, svg);
    const fx = sw ? 1 : sW / 250, fy = sH / 170;
    const sc = mk('g', { class: 'f61-scene', transform: `translate(${sx} ${sy}) scale(${(sW / 250).toFixed(3)} ${(sH / 170).toFixed(3)})` }, sahne);
    mk('rect', { class: 'f61-sky', x: 0, y: 0, width: 250, height: 170 }, sc);
    mk('rect', { class: 'f61-grass', x: 0, y: 128, width: 250, height: 42 }, sc);
    mk('circle', { class: 'f61-sun', cx: 40, cy: 36, r: 17 }, sc);
    mk('rect', { class: 'f61-trunk', x: 63, y: 84, width: 10, height: 50 }, sc); mk('circle', { class: 'f61-crown', cx: 68, cy: 72, r: 26 }, sc);
    mk('rect', { class: 'f61-house', x: 150, y: 80, width: 70, height: 54 }, sc); mk('path', { class: 'f61-roof', d: 'M144 82 L185 50 L226 82 Z' }, sc); mk('rect', { class: 'f61-door', x: 175, y: 106, width: 16, height: 28 }, sc);
    mk('circle', { class: 'f61-ball f61-b1', cx: 100, cy: 150, r: 11 }, sc); mk('circle', { class: 'f61-ball f61-b2', cx: 126, cy: 152, r: 11 }, sc); mk('circle', { class: 'f61-ball f61-b3', cx: 112, cy: 128, r: 11 }, sc);
    // kör nokta (sahne koordinatlarında; sky alanı)
    const bsg = mk('g', { class: 'f61-bsg' }, sc);
    const bsA = mk('circle', { class: 'f61-bs', cx: 118, cy: 28, r: 14 }, bsg);
    const bsB = mk('circle', { class: 'f61-bs2', cx: 158, cy: 28, r: 14 }, bsg);
    const bsLab = mk('g', {}, svg);
    // --- alıcı etkinliği
    const ax = narrow ? 20 : 330, ay = narrow ? 208 : 20, aw = narrow ? 320 : 290;
    txt(svg, ax, ay + 12, 'Alıcı etkinliği', 'f61-th');
    const rodY = ay + 26, conY = ay + 72;
    txt(svg, ax, rodY + 12, 'Çubuklar', 'f61-tm');
    mk('rect', { class: 'f61-trk', x: ax, y: rodY + 18, width: aw, height: 16, rx: 5 }, svg);
    const rodBar = mk('rect', { class: 'f61-rod', x: ax, y: rodY + 18, width: aw, height: 16, rx: 5 }, svg);
    txt(svg, ax, conY + 12, 'Koniler (K, Y, M)', 'f61-tm');
    mk('rect', { class: 'f61-trk', x: ax, y: conY + 18, width: aw, height: 16, rx: 5 }, svg);
    const conSeg = ['f61-ck', 'f61-cy', 'f61-cm'].map((c) => mk('rect', { class: c, y: conY + 18, height: 16, rx: 3 }, svg));
    const rodV = txt(svg, ax + aw, rodY + 12, '', 'f61-tm', { 'text-anchor': 'end' }), conV = txt(svg, ax + aw, conY + 12, '', 'f61-tm', { 'text-anchor': 'end' });
    // --- retina şeridi
    const rx0 = narrow ? 20 : 330, ry0 = narrow ? 352 : 170, rw = narrow ? 320 : 290;
    txt(svg, rx0, ry0 + 12, 'Retina şeridi', 'f61-th');
    const bandY = ry0 + 28, discW = narrow ? 52 : 52, bandW = rw - discW - 6;
    mk('rect', { class: 'f61-band', x: rx0, y: bandY, width: rw, height: 52, rx: 8 }, svg);
    const syms = [];
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < Math.floor(bandW / 6); i++) {
        const x = rx0 + 6 + i * 6, f = i * 6 / bandW; // 0 = fovea
        const pc = Math.max(0.12, 0.92 - f * 1.15);   // koni olasılığı
        const kon = ((i * 7 + row * 3) % 10) / 10 < pc;
        const y = bandY + 8 + row * 22;
        if (kon) { const c = ['f61-ck', 'f61-cy', 'f61-cm'][(i + row) % 3]; syms.push([mk('path', { class: 'f61-sy ' + c, d: `M${x} ${y + 15} L${x + 2.7} ${y} L${x + 5.4} ${y + 15} Z` }, svg), 'k']); }
        else syms.push([mk('rect', { class: 'f61-sy f61-sr', x: x + 1, y, width: 2.4, height: 15 }, svg), 'r']);
      }
    }
    const dx = rx0 + rw - discW;
    mk('rect', { class: 'f61-discr', x: dx, y: bandY + 2, width: discW - 3, height: 48, rx: 8 }, svg);
    const fovG = mk('g', { class: 'f61-lab', tabindex: 0, role: 'button', 'aria-label': 'Fovea' }, svg);
    mk('rect', { class: 'f61-lbg', x: rx0 - 2, y: bandY + 56, width: narrow ? 112 : 126, height: 20, rx: 5 }, fovG);
    txt(fovG, rx0 + 2, bandY + 70, narrow ? 'Fovea (koni yoğun)' : 'Fovea (koni yoğun)', 'f61-tm');
    txt(svg, rx0 + rw, bandY + 70, 'Optik disk', 'f61-tm', { 'text-anchor': 'end' });
    txt(svg, rx0 + rw, bandY + 86, 'alıcı yok → kör nokta', 'f61-tm', { 'text-anchor': 'end' });
    txt(svg, rx0, bandY + 104, 'disk → gangliyon aksonları → optik sinir (II)', 'f61-ts');
    txt(svg, rx0, bandY + 118, '→ lateral genikulat çekirdek → oksipital lob', 'f61-ts');
    // --- kontroller
    const ctl = document.createElement('div'); ctl.className = 'f61-ctl';
    ctl.innerHTML = `<label class="f61-rng"><span>Işık düzeyi <b data-o="L"></b></span><input type="range" min="0" max="100" step="1" value="${S.L}" aria-label="Işık düzeyi: loş ile parlak arası"><em class="f61-ends"><i>Loş</i><i>Parlak</i></em></label>
      <button type="button" class="btn ghost f61-bsb">Kör nokta testi</button>`;
    el.appendChild(ctl);
    const inp = ctl.querySelector('input'), val = ctl.querySelector('[data-o=L]'), btn = ctl.querySelector('.f61-bsb');
    let timer = 0;
    const smooth = (x) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
    const ciz = () => {
      const L = S.L, rod = 1 - 0.85 * smooth((L - 20) / 55), con = smooth((L - 12) / 50);
      val.textContent = L >= 60 ? 'parlak' : L >= 25 ? 'alacakaranlık' : 'loş';
      sc.style.filter = `saturate(${clamp((L - 18) / 40, 0, 1).toFixed(2)}) brightness(${(0.32 + 0.68 * Math.min(1, L / 60)).toFixed(2)})`;
      rodBar.setAttribute('width', (aw * rod).toFixed(1)); rodV.textContent = rod > 0.66 ? 'yüksek' : rod > 0.3 ? 'orta' : 'düşük';
      conSeg.forEach((s, i) => { s.setAttribute('x', (ax + (aw / 3) * i + 1).toFixed(1)); s.setAttribute('width', Math.max(0, (aw / 3 - 2) * con).toFixed(1)); });
      conV.textContent = con > 0.66 ? 'yüksek' : con > 0.3 ? 'orta' : 'düşük';
      syms.forEach(([e, t]) => e.setAttribute('opacity', (0.3 + 0.7 * (t === 'k' ? con : rod)).toFixed(2)));
    };
    const capL = () => setCap(el, S.L >= 60 ? '<b>Parlak ışık.</b> Koniler çalışır: kırmızı, yeşil ve mavi koniler birlikte renk algısını oluşturur. Işık düzeyini azaltın. [[K1 s. 276]]' : S.L >= 25 ? '<b>Geçiş.</b> Koniler zayıflar, çubuklar devreye girer; renkler solar. [[K1 s. 276]]' : '<b>Loş ışık.</b> Çubuklar çalışır: ışığa son derece duyarlıdır ama dalga boylarını ayırt edemez; sahne gri görünür. [[K1 s. 276]]');
    inp.addEventListener('input', () => { S.L = +inp.value; S.bs = 'yok'; bsDraw(); ciz(); capL(); });
    const BSCAP = '<b>Kör nokta.</b> Optik diskte çubuk ve koni olmadığından görme alanında küçük bir boşluk vardır; beyin onu çevredeki renk ve desenlerle doldurur, bu yüzden fark etmeyiz. [[K1 s. 277]]';
    const bsDraw = () => {
      bsLab.innerHTML = '';
      const on = S.bs !== 'yok';
      bsA.style.display = on ? '' : 'none'; bsB.style.display = on && RM ? '' : 'none';
      bsA.setAttribute('class', S.bs === 'dolu' && !RM ? 'f61-bs f61-fill' : 'f61-bs');
      if (on && RM) { txt(bsLab, sx + 118 * (sW / 250), sy + 62 * (sH / 170), 'boşluk', 'f61-ts', { 'text-anchor': 'middle' }); txt(bsLab, sx + 158 * (sW / 250), sy + 62 * (sH / 170), 'dolu', 'f61-ts', { 'text-anchor': 'middle' }); }
      btn.setAttribute('aria-pressed', String(on));
    };
    btn.addEventListener('click', () => {
      clearTimeout(timer);
      S.bs = 'bosluk'; bsDraw(); setCap(el, BSCAP);
      if (!RM) timer = setTimeout(() => { S.bs = 'dolu'; bsDraw(); }, 1000);
    });
    fovG.addEventListener('click', () => setCap(el, '<b>Fovea.</b> Konilerin yoğun olduğu küçük çöküntü; okuma için gereken keskinliği verir. [[K1 s. 276]]'));
    fovG.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fovG.dispatchEvent(new Event('click')); } });
    ciz(); bsDraw();
    return () => clearTimeout(timer);
  });

  /* ================= 3 · f61_sinir ================= */
  const SINIR_CAP = {
    duyu: '<b>Duyu.</b> Trigeminal sinirin oftalmik dalı (V1): lakrimal dal konjonktivayı, nazosiliyer dal korneayı, sklerayı, irisi ve siliyer cismi innerve eder. Bir yol seçin. [[K1 s. 277]]',
    para: '<b>Parasempatik.</b> Pregangliyonik nöronlar Edinger–Westphal çekirdeğinden çıkar, okülomotor sinirin (III) dış yüzeyinde siliyer gangliyona gider; postgangliyonik lifler kısa siliyer sinirle sfinkter pupillayı (miyozis) ve siliyer kası (akomodasyon) innerve eder. [[K1 s. 277]]',
    symp: '<b>Sempatik.</b> Pregangliyonik nöronlar T1 kökünden çıkar, süperior servikal gangliyonda sinaps yapar; postgangliyonik lifler internal karotis arterin dış yüzeyinde yükselir, V1 ile orbitaya girer: dilatatör pupilla (midriyazis) ve süperior tarsal kas. [[K1 s. 277]]',
    kas: '<b>Ekstraoküler kaslar.</b> Lateral rektus (abdüksiyon) abdusens (VI), süperior oblik (intorsiyon) troklear (IV), süperior, inferior ve medial rektus ile inferior oblik okülomotor (III) sinirle innerve edilir. Kitap levator palpebrae superiorisi fasiyal sinire (VII) bağlar; doğrusu III\'tür (Atlas notu). [[K1 s. 277]]',
    kan: '<b>Kan.</b> Tek kaynak oftalmik arterdir; dalları santral retinal arter, anterior siliyer arterler ve posterior siliyer arter. Venöz kan santral retinal ven ve vorteks venleriyle boşalır. [[K1 s. 276–277]]',
    hepsi: '<b>Özet harita.</b> Optik sinir (II) görmeyi taşır; V1 duyu, III üzerinden parasempatik, internal karotis üzerinden sempatik lifler, III–IV–VI ekstraoküler kaslar. [[K1 s. 276–277]]',
  };
  const SYS = { duyu: 'Duyu (V1)', para: 'Parasempatik', symp: 'Sempatik', kas: 'Ekstraoküler kaslar', kan: 'Kan', hepsi: 'Hepsi' };
  VIZ.f61_sinir = (el) => mount(el, { yol: 'duyu', pr: 14 }, (narrow, S) => {
    const LY = narrow
      ? { W: 360, H: 530, eye: { cx: 180, cy: 395, s: 0.75 }, bs: [16, 8, 200, 56], ew: [40, 46], sp: [236, 8, 108, 56], t1: [256, 46], trig: [60, 270], scg: [290, 120], ica: [300, 120, 300], cg: [290, 372], orb: [296, 335], iii: [[60, 140], [200, 250]], sens: [[100, 288]], pup: [50, 462], lab: 12 }
      : { W: 680, H: 360, eye: { cx: 125, cy: 190, s: 0.9 }, bs: [470, 12, 200, 78], ew: [500, 62], sp: [470, 290, 200, 62], t1: [500, 332], trig: [395, 60], scg: [430, 300], ica: [380, 130, 300], cg: [278, 236], orb: [300, 160], iii: [[400, 120], [300, 200]], sens: [[220, 62], [300, 60]], pup: [125, 332], lab: 12 };
    el.innerHTML = '';
    const seg = document.createElement('div'); seg.className = 'seg f61-seg'; seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', 'Yol seçici');
    Object.keys(SYS).forEach((k) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.y = k; b.textContent = SYS[k]; b.setAttribute('aria-pressed', String(k === S.yol)); seg.appendChild(b); });
    el.appendChild(seg);
    const svg = mk('svg', { class: 'f61-svg' + (narrow ? ' f61-n' : ''), viewBox: `0 0 ${LY.W} ${LY.H}`, role: 'img', 'aria-label': 'Gözün sinir yolları ve kanlanması: duyu, parasempatik, sempatik, ekstraoküler motor sinirler ve oftalmik arter dalları' }, el);
    const defs = mk('defs', {}, svg);
    const mkr = mk('marker', { id: 'f61-ok', viewBox: '0 0 8 8', refX: 6, refY: 4, markerWidth: 9, markerHeight: 9, markerUnits: 'userSpaceOnUse', orient: 'auto' }, defs); mk('path', { d: 'M0 0 L8 4 L0 8 Z', class: 'f61-mk' }, mkr);
    const main = mk('g', { class: 'f61-main' }, svg), kasG = mk('g', { class: 'f61-kasg' }, svg);
    const eye = gozKesiti(main, Object.assign({ pupil: S.pr }, LY.eye));
    eye.g.querySelectorAll('[data-p]').forEach((e) => e.removeAttribute('data-p'));
    const E = eye.E;
    // üst kapak (yerel koordinat)
    const lidG = mk('g', { transform: `translate(${LY.eye.cx} ${LY.eye.cy}) scale(${LY.eye.s})` }, main);
    mk('path', { class: 'f61-lid', d: 'M-104 -40 Q-50 -140 62 -100' }, lidG);
    mk('path', { class: 'f61-tars', d: 'M-62 -92 Q-40 -104 -14 -102' }, lidG);
    // düğümler
    const nodes = [];
    const node = (sys, g) => { g.dataset.sys = sys; nodes.push(g); return g; };
    const box = (b, t, sys) => { const g = node(sys, mk('g', {}, main)); mk('rect', { class: 'f61-box', x: b[0], y: b[1], width: b[2], height: b[3], rx: 8 }, g); txt(g, b[0] + 10, b[1] + 18, t, 'f61-th'); return g; };
    const dot = (p, t, sys, tx, anchor, ty) => { const g = node(sys, mk('g', {}, main)); mk('circle', { class: 'f61-nd', cx: p[0], cy: p[1], r: 6 }, g); if (t) txt(g, tx == null ? p[0] + 12 : tx, ty == null ? p[1] + 4 : ty, t, 'f61-t', { 'text-anchor': anchor || 'start' }); return g; };
    box(LY.bs, 'Beyin sapı', 'para'); dot(LY.ew, 'Edinger–Westphal çekirdeği', 'para');
    box(LY.sp, 'Omurilik T1', 'symp'); dot(LY.t1, narrow ? '' : 'T1 kökü', 'symp');
    dot(LY.trig, narrow ? '' : '', 'duyu');
    if (narrow) txt(node('duyu', mk('g', {}, main)), 14, 248, 'Trigeminal gangliyon (V1)', 'f61-t'); else txt(node('duyu', mk('g', {}, main)), LY.trig[0] - 12, LY.trig[1] - 12, 'Trigeminal g. (V1)', 'f61-t', { 'text-anchor': 'end' });
    dot(LY.scg, narrow ? '' : 'Süperior servikal gangliyon', 'symp', LY.scg[0] - 6, 'end', LY.scg[1] + 28);
    if (narrow) txt(node('symp', mk('g', {}, main)), LY.scg[0] - 14, LY.scg[1] + 4, 'Süperior servikal gangliyon', 'f61-t', { 'text-anchor': 'end' });
    dot(LY.cg, narrow ? '' : 'Siliyer gangliyon', 'para', LY.cg[0] - 30, 'start', LY.cg[1] + 30);
    if (narrow) txt(node('para', mk('g', {}, main)), LY.cg[0] + 4, LY.cg[1] - 12, 'Siliyer gangliyon', 'f61-t', { 'text-anchor': 'end' });
    const gI = node('symp kan', mk('g', {}, main));
    mk('rect', { class: 'f61-ica', x: LY.ica[0] - 6, y: LY.ica[1], width: 12, height: LY.ica[2] - LY.ica[1], rx: 5 }, gI);
    txt(gI, narrow ? LY.ica[0] - 12 : LY.ica[0] + 14, narrow ? 180 : 200, 'İnternal karotis', 'f61-t', { 'text-anchor': narrow ? 'end' : 'start' });
    txt(gI, narrow ? LY.ica[0] - 12 : LY.ica[0] + 14, narrow ? 195 : 216, 'arter', 'f61-t', { 'text-anchor': narrow ? 'end' : 'start' });
    // yollar
    const paths = [];
    const path = (sys, cls, pts, o) => { const p = mk('path', { class: 'f61-pth ' + cls, d: dpath(pts), 'data-sys': sys }, main); paths.push({ p, sys, flow: !(o && o.noflow), rev: o && o.rev, len: 0 }); return p; };
    const ICA = [[LY.ica[0], LY.ica[2]], [LY.ica[0], LY.ica[1] + 10]];
    // duyu (gözden beyne)
    const sensTail = LY.sens;
    path('duyu', 'f61-c-duyu', [E(-105, -31), E(-112, -62), E(-60, -125)].concat(sensTail, [LY.trig]));
    path('duyu', 'f61-c-duyu', [E(-10, -114)].concat(sensTail, [LY.trig]));
    // parasempatik
    path('para', 'f61-c-para', [LY.ew].concat(LY.iii, [LY.cg]));
    const paraPost = [LY.cg, E(60, 112), E(-10, 110), E(-38, 74)];
    path('para', 'f61-c-para f61-post', paraPost);
    path('para', 'f61-c-para f61-post', paraPost.concat([E(-46, 40), E(-47, 18)]));
    // sempatik
    path('symp', 'f61-c-symp', [LY.t1, LY.scg].concat([ICA[0], ICA[1]]));
    const orb = LY.orb;
    path('symp', 'f61-c-symp f61-post', [ICA[1], orb, E(100, -80), E(30, -108), E(-20, -100), E(-47, -44)]);
    path('symp', 'f61-c-symp f61-post', [ICA[1], orb, E(100, -80), E(30, -108), E(-35, -105)]);
    // kan
    path('kan', 'f61-c-art', [narrow ? [336, 470] : [440, 345], narrow ? [310, 420] : [340, 300], E(116, 24)]);
    path('kan', 'f61-c-art', [E(116, 24), E(80, 24), E(66, 10)]);
    path('kan', 'f61-c-art', [E(116, 24), E(104, 62), E(70, 80)]);
    path('kan', 'f61-c-art', [E(116, 24), E(100, -70), E(40, -105), E(-70, -85), E(-95, -50)]);
    path('kan', 'f61-c-ven', [E(66, 36), E(110, 38), narrow ? [330, 440] : [350, 262], narrow ? [346, 500] : [440, 292]]);
    path('kan', 'f61-c-ven', [E(0, 103), E(0, 125), E(40, 145)]);
    path('kan', 'f61-c-ven', [E(0, -103), E(0, -125), E(40, -145)]);
    // etiketler (kan)
    const kl = node('kan', mk('g', { class: 'f61-lbls' }, main));
    if (!narrow) {
      txt(kl, 345, 328, 'oftalmik arter', 'f61-ts', { 'text-anchor': 'start' });
      txt(kl, 275, 168 - 80, 'anterior siliyer a.', 'f61-ts', { 'text-anchor': 'start' });
      txt(kl, 150, 52, 'vorteks venleri', 'f61-ts', { 'text-anchor': 'start' });
      txt(kl, 150, 327, 'vorteks venleri', 'f61-ts', { 'text-anchor': 'start' });
      txt(kl, 270, 192, 'santral retinal a./v.', 'f61-ts', { 'text-anchor': 'start' });
      txt(kl, 232, 292, 'posterior siliyer a.', 'f61-ts', { 'text-anchor': 'start' });
    } else {
      txt(kl, 14, 322, 'vorteks v.', 'f61-ts', { 'text-anchor': 'start' });
      txt(kl, 14, 512, 'oftalmik arter ↗', 'f61-ts', { 'text-anchor': 'start' });
      txt(kl, 336, 308, 'santral retinal', 'f61-ts', { 'text-anchor': 'end' });
      txt(kl, 14, 440, 'anterior / posterior siliyer a.', 'f61-ts', { 'text-anchor': 'start' });
    }
    const dl = node('duyu', mk('g', { class: 'f61-lbls' }, main));
    if (!narrow) { txt(dl, 132, 50, 'lakrimal → konjonktiva', 'f61-ts'); txt(dl, 232, 84, 'nazosiliyer →', 'f61-ts'); txt(dl, 232, 98, 'kornea, sklera, iris, siliyer cisim', 'f61-ts'); }
    else { txt(dl, 100, 306, 'lakrimal → konjonktiva', 'f61-ts'); txt(dl, 14, 220, 'nazosiliyer → kornea,', 'f61-ts'); txt(dl, 14, 234, 'sklera, iris, siliyer cisim', 'f61-ts'); }
    // hedef işaretleri (parlayan)
    const tg = mk('g', {}, main);
    const targets = { para: [E(-47, 18), E(-38, 74)], symp: [E(-47, -44), E(-35, -105)] };
    const tEls = [];
    Object.keys(targets).forEach((k) => targets[k].forEach((p) => { tEls.push([k, mk('circle', { class: 'f61-tg f61-c-' + k, cx: p[0], cy: p[1], r: 5 }, tg)]); }));
    // etiket: hedefler
    const tl = node('para symp', mk('g', { class: 'f61-lbls' }, main));
    if (!narrow) { txt(tl, 20, 30, 'Üst kapak: süperior tarsal kas', 'f61-ts'); txt(tl, 20, 44, '(levator değil: bkz. Ekstraoküler kaslar)', 'f61-ts'); }
    else { txt(tl, 8, 296, 'üst kapak: süperior tarsal kas', 'f61-ts'); }
    // pupilla göstergesi
    const pg = mk('g', {}, main);
    mk('circle', { class: 'f61-pi', cx: LY.pup[0], cy: LY.pup[1], r: 22 }, pg);
    const pp = mk('circle', { class: 'f61-pp', cx: LY.pup[0], cy: LY.pup[1], r: 9 }, pg);
    txt(pg, LY.pup[0] + 30, LY.pup[1] + 4, 'Pupilla', 'f61-t');
    // ---- ekstraoküler kas görünümü
    const kc = narrow ? [180, 200] : [260, 200], kr = 1, R1 = narrow ? 78 : 92;
    const kg = mk('g', { transform: `translate(${kc[0]} ${kc[1]}) scale(${kr})` }, kasG);
    mk('circle', { class: 'f61-gl', r: 46 }, kg); mk('circle', { class: 'f61-ir', r: 22 }, kg); mk('circle', { class: 'f61-pi2', r: 9 }, kg);
    const MK = [
      ['lr', 'Lateral rektus', 'VI abdusens', 180, 'end'], ['mr', 'Medial rektus', 'III', 0, 'start'], ['sr', 'Süperior rektus', 'III', -90, 'end'], ['ir', 'İnferior rektus', 'III', 90, 'middle'],
      ['so', 'Süperior oblik', 'IV troklear', -38, 'start'], ['io', 'İnferior oblik', 'III', 40, 'start'],
    ];
    const kasEls = [];
    MK.forEach(([id, ad, sinir, ang, anchor]) => {
      const a = ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
      const x0 = 46 * c, y0 = 46 * s, x1 = R1 * c, y1 = R1 * s;
      const g = mk('g', { class: 'f61-kas', tabindex: 0, role: 'button', 'aria-label': `${ad}: ${sinir}` }, kg);
      mk('path', { class: 'f61-kb', d: `M${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)}` }, g);
      const lx = (id === 'sr') ? -8 : (id === 'ir') ? 0 : (c >= 0 ? x1 + 10 : x1 - 10), ly = (id === 'sr') ? y1 - 4 : (id === 'ir') ? y1 + 16 : y1 + (id === 'so' ? -8 : id === 'io' ? 14 : 4);
      const anc = (id === 'sr') ? 'end' : anchor;
      const t1 = txt(g, lx, ly, ad, 'f61-t', { 'text-anchor': anc });
      const t2 = txt(g, lx, ly + 14, sinir, 'f61-tn', { 'text-anchor': anc });
      void t1; void t2;
      const d = mk('circle', { class: 'f61-fd', r: 3.4, cx: x1, cy: y1 }, g);
      kasEls.push({ g, d, x0, y0, x1, y1, id });
      const pick = () => { kasEls.forEach((k) => k.g.classList.toggle('sel', k.g === g)); setCap(el, id === 'sr' || true ? SINIR_CAP.kas : ''); };
      g.addEventListener('click', pick); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
    // levator
    const lv = mk('g', { class: 'f61-kas', tabindex: 0, role: 'button', 'aria-label': 'Levator palpebrae superioris: kitaba göre VII' }, kg);
    mk('path', { class: 'f61-kb f61-lev', d: `M-26 -112 L26 -112` }, lv);
    txt(lv, narrow ? 0 : 40, narrow ? -138 : -112, 'Levator palpebrae superioris', 'f61-t', { 'text-anchor': narrow ? 'middle' : 'start' });
    txt(lv, narrow ? 0 : 40, narrow ? -124 : -98, 'VII (kitaba göre) *', 'f61-tn', { 'text-anchor': narrow ? 'middle' : 'start' });
    txt(lv, narrow ? 0 : 40, narrow ? 140 : -84, '* aslında III (Atlas notu)', 'f61-ts', { 'text-anchor': narrow ? 'middle' : 'start' });
    kasEls.push({ g: lv, d: mk('circle', { class: 'f61-fd', r: 3.4, cx: 0, cy: -112 }, lv), x0: 0, y0: -112, x1: 26, y1: -112, id: 'lev' });
    lv.addEventListener('click', () => { kasEls.forEach((k) => k.g.classList.toggle('sel', k.g === lv)); setCap(el, SINIR_CAP.kas); });
    lv.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lv.dispatchEvent(new Event('click')); } });
    // gösterge
    const leg = document.createElement('div'); leg.className = 'legend f61-leg';
    leg.innerHTML = '<span><i style="background:var(--c-basic)"></i>duyu (V1)</span><span><i style="background:var(--ok)"></i>parasempatik</span><span><i style="background:var(--c-clin)"></i>sempatik</span><span><i style="background:var(--accent)"></i>motor</span><span><i style="background:var(--crit)"></i>arter</span><span><i style="background:var(--accent-ink)"></i>ven</span>';
    el.appendChild(leg);
    // uzunluklar
    paths.forEach((o) => { o.len = o.p.getTotalLength(); });
    const dotsLayer = mk('g', {}, svg);
    const dEls = [];
    paths.forEach((o) => { for (let i = 0; i < 3; i++) dEls.push([o, i, mk('circle', { class: 'f61-fl', r: 4 }, dotsLayer)]); });
    const kdots = kasEls.map((k) => [k, mk('circle', { class: 'f61-fl f61-c-kas', r: 3.6 }, kg)]);
    let t = 0, prTarget = 14;
    const hedefPupil = () => (S.yol === 'para' ? 6 : S.yol === 'symp' ? 24 : 14);
    const uyg = () => {
      const y = S.yol, all = y === 'hepsi', kas = y === 'kas';
      main.style.display = kas ? 'none' : ''; kasG.style.display = kas ? '' : 'none'; if (narrow) svg.setAttribute('viewBox', `0 0 360 ${kas ? 370 : LY.H}`);
      nodes.forEach((n) => { const lb = n.classList.contains('f61-lbls'); n.classList.toggle('dim', lb ? (all || !n.dataset.sys.split(' ').includes(y)) : (!all && !n.dataset.sys.split(' ').includes(y))); });
      paths.forEach((o) => { const on = all || o.sys === y; o.p.classList.toggle('dim', !on); o.p.classList.toggle('act', on && !all); o.p.setAttribute('marker-end', on ? 'url(#f61-ok)' : ''); });
      if (all || kas) { /* arrow marker only */ }
      paths.filter((o) => o.sys === 'duyu').forEach(() => {});
      tEls.forEach(([k, e]) => e.classList.toggle('on', y === k));
      leg.style.display = y === 'kas' ? 'none' : '';
      seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.y === y)));
      setCap(el, SINIR_CAP[y]);
      prTarget = hedefPupil();
      if (RM) { S.pr = prTarget; eye.pupil(S.pr); pp.setAttribute('r', (S.pr * 0.65).toFixed(1)); }
      dotsLayer.style.display = (RM || all) ? 'none' : '';
    };
    // kan yolunda venler ters yönde akar (dışarı): yol çizimi zaten dışarı yönde; arterler içeri (başlangıç dışarıda).
    seg.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.yol = b.dataset.y; uyg(); });
    uyg();
    const tk = ticker(el, (dt) => {
      if (RM) return;
      t += dt;
      S.pr += (prTarget - S.pr) * (1 - Math.exp(-dt / 0.25)); eye.pupil(S.pr); pp.setAttribute('r', (S.pr * 0.65).toFixed(1));
      const y = S.yol, ph = (t / 1.5) % 1;
      if (y !== 'kas') dEls.forEach(([o, i, c]) => {
        const on = o.sys === y && y !== 'hepsi';
        c.style.display = on ? '' : 'none'; if (!on) return;
        const f = (ph + i / 3) % 1, pt = o.p.getPointAtLength(f * o.len);
        c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
        c.setAttribute('class', 'f61-fl f61-c-' + (o.p.getAttribute('class').includes('f61-c-art') ? 'art' : o.p.getAttribute('class').includes('f61-c-ven') ? 'ven' : o.sys));
      }); else dEls.forEach(([, , c]) => { c.style.display = 'none'; });
      tEls.forEach(([k, e]) => { const on = y === k; e.setAttribute('r', on ? (5 + 3 * Math.max(0, Math.sin(t * 4.2))).toFixed(1) : 5); });
      kdots.forEach(([k, c], i) => { const f = (ph + i * 0.13) % 1; c.setAttribute('cx', lerp(k.x1 * 1.18 + (k.x1 >= 0 ? 12 : -12), k.x0, f).toFixed(1)); c.setAttribute('cy', lerp(k.y1 * 1.12 + 4, k.y0, f).toFixed(1)); c.style.display = y === 'kas' ? '' : 'none'; });
    });
    return () => { tk(); };
  });

  /* ================= 4 · f61_horner ================= */
  VIZ.f61_horner = (el) => mount(el, { t: 0, on: false }, (narrow, S) => {
    el.innerHTML = '';
    const W = 360, H = narrow ? 470 : 300;
    const svg = mk('svg', { class: 'f61-svg' + (narrow ? ' f61-n' : ''), viewBox: narrow ? '0 0 360 470' : '0 0 640 300', role: 'img', 'aria-label': 'Boyunda stellat gangliyon bloğu ve yüzde Horner sendromu bulguları: küçülen pupilla, düşen üst kapak, kuruyan ter' }, el);
    const defs = mk('defs', {}, svg);
    const ng = mk('g', { class: narrow ? 'f61-hnw' : '', transform: narrow ? 'translate(8 6) scale(0.7)' : '' }, svg);
    // boyun şeması (x 20–260, y 20–260 sahne birimleri)
    mk('rect', { class: 'f61-vert', x: 140, y: 170, width: 72, height: 58, rx: 8 }, ng); txt(ng, 176, 204, 'C7', 'f61-th', { 'text-anchor': 'middle' });
    txt(ng, 20, 252, 'Stellat gangliyon', 'f61-t'); txt(ng, 20, 268, '(inf. servikal + T1)', 'f61-ts');
    const fib = mk('path', { class: 'f61-fib', d: 'M118 188 L118 70 L330 70', 'marker-end': 'url(#f61-hok)' }, ng);
    const mkr = mk('marker', { id: 'f61-hok', viewBox: '0 0 8 8', refX: 6, refY: 4, markerWidth: 9, markerHeight: 9, markerUnits: 'userSpaceOnUse', orient: 'auto' }, defs); mk('path', { d: 'M0 0 L8 4 L0 8 Z', class: 'f61-mk' }, mkr);
    const flow = [0, 1, 2].map(() => mk('circle', { class: 'f61-fl f61-c-symp', r: 4 }, ng));
    const gang = mk('path', { class: 'f61-gang', d: 'M118 188 l6 11 12 1 -9 8 3 12 -12 -7 -12 7 3 -12 -9 -8 12 -1 z', transform: 'translate(0 -4) scale(1.1) translate(-12 -6)' }, ng);
    txt(ng, 140, 60, 'sempatik lif → yüz', 'f61-ts');
    const needle = mk('g', {}, ng);
    mk('path', { class: 'f61-needle', d: 'M28 226 L88 212' }, needle); mk('path', { class: 'f61-needle-t', d: 'M88 212 L100 207 L96 218 Z' }, needle);
    txt(needle, 28, 218, 'iğne', 'f61-ts');
    ng.querySelectorAll('.f61-gang').forEach((g) => { g.style.cursor = 'pointer'; g.addEventListener('click', () => setCap(el, '<b>Stellat gangliyon.</b> İnferior servikal ve birinci torasik gangliyonun birleşimi; C7 vertebra gövdesinin hemen önünde. Blok, kol, boyun, yüz ve kalp kaynaklı sempatik aracılı kronik ağrıda ve Raynaud sendromunda yapılır. [[K1 s. 277]]')); });
    // yüz
    const fg = mk('g', { transform: narrow ? 'translate(-266.5 157.5) scale(0.95)' : '' }, svg);
    mk('rect', { class: 'f61-skin', x: 360, y: 40, width: 230, height: 210, rx: 40 }, fg);
    mk('path', { class: 'f61-eyeo', d: 'M400 150 Q470 90 540 150 Q470 206 400 150 Z' }, fg);
    mk('circle', { class: 'f61-iris', cx: 470, cy: 150, r: 33 }, fg);
    const pup = mk('circle', { class: 'f61-pup', cx: 470, cy: 150, r: 15 }, fg);
    const lid = mk('path', { class: 'f61-lidf' }, fg); const lide = mk('path', { class: 'f61-lide' }, fg);
    mk('path', { class: 'f61-lowl', d: 'M400 150 Q470 206 540 150' }, fg);
    mk('rect', { class: 'f61-levb', x: 430, y: 76, width: 80, height: 8, rx: 4 }, fg);
    const drops = [[392, 112], [548, 112], [380, 175], [560, 175], [420, 218], [520, 222]].map(([x, y]) => mk('path', { class: 'f61-drop', d: `M${x} ${y - 7} Q${x + 6} ${y + 1} ${x} ${y + 6} Q${x - 6} ${y + 1} ${x} ${y - 7} Z` }, fg));
    // etiketler
    const lab = (x, y, s, tx, ty, anchor) => { const g = mk('g', {}, fg); mk('path', { class: 'f61-lead', d: `M${x} ${y - 12} L${tx} ${ty}` }, g); txt(g, x, y, s, 'f61-t', { 'text-anchor': anchor || 'start' }); };
    lab(300, 274, 'Dilatatör pupilla', 462, 155, 'start'); lab(430, 274, 'Süperior tarsal kas', 480, 120, 'start'); lab(570, 274, 'Ter bezleri', 538, 208, 'start');
    txt(fg, 470, 66, 'Levator palpebrae superioris', 'f61-ts', { 'text-anchor': 'middle' }); txt(fg, 470, 98, '(bloktan etkilenmez)', 'f61-ts', { 'text-anchor': 'middle' });
    // bulgu listesi
    const kv = document.createElement('dl'); kv.className = 'kv f61-kv';
    kv.innerHTML = '<dt>Pupilla</dt><dd data-r="pup"></dd><dt>Kapak</dt><dd data-r="lid"></dd><dt>Ter</dt><dd data-r="ter"></dd>';
    const btns = document.createElement('div'); btns.className = 'btn-row f61-btns';
    btns.innerHTML = '<button type="button" class="btn f61-go">Blok uygula</button><button type="button" class="btn ghost f61-rs">Sıfırla</button>';
    el.appendChild(btns); el.appendChild(kv);
    const go = btns.querySelector('.f61-go'), rs = btns.querySelector('.f61-rs');
    const rows = { pup: kv.querySelector('[data-r=pup]'), lid: kv.querySelector('[data-r=lid]'), ter: kv.querySelector('[data-r=ter]') };
    const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
    const render = () => {
      const t = S.t;
      const nd = seg(t, 0, 0.8), gg = seg(t, 0.8, 1.2), fb = seg(t, 1.0, 1.6), pu = seg(t, 1.6, 2.2), ld = seg(t, 2.2, 2.8), sw = seg(t, 2.8, 3.4);
      needle.setAttribute('transform', `translate(${(-30 * (1 - nd)).toFixed(1)} ${(6 * (1 - nd)).toFixed(1)})`);
      needle.style.opacity = t > 0 ? 1 : 0.9;
      gang.classList.toggle('blk', gg > 0.5);
      fib.classList.toggle('cut', fb > 0.5);
      flow.forEach((c) => { c.style.display = fb > 0.2 || RM ? 'none' : ''; });
      pup.setAttribute('r', (15 * (1 - 0.4 * pu)).toFixed(2));
      const cy = 80 + 38 * ld; lid.setAttribute('d', `M370 50 L580 50 L580 150 L540 150 Q470 ${cy} 400 150 L380 150 Z`); lide.setAttribute('d', `M400 150 Q470 ${cy} 540 150`);
      drops.forEach((d, i) => { d.style.opacity = (1 - sw).toFixed(2); });
      rows.pup.innerHTML = pu > 0.5 ? 'normal → <b>Miyozis</b>' : 'normal'; rows.lid.innerHTML = ld > 0.5 ? 'normal → <b>Kısmi pitozis</b>' : 'normal'; rows.ter.innerHTML = sw > 0.5 ? 'var → <b>Anhidroz</b>' : 'var';
      rows.pup.classList.toggle('hl', pu > 0 && pu < 1); rows.lid.classList.toggle('hl', ld > 0 && ld < 1); rows.ter.classList.toggle('hl', sw > 0 && sw < 1);
      rows.pup.classList.toggle('done', pu >= 1); rows.lid.classList.toggle('done', ld >= 1); rows.ter.classList.toggle('done', sw >= 1);
    };
    const capNow = () => setCap(el, S.on ? '<b>Horner sendromu.</b> Miyozis (dilatatör pupilla bloğu), kısmi pitozis (süperior tarsal kas bloğu) ve anhidroz (ter bezleri). Pitozis kısmidir, çünkü asıl kaldırıcı levator palpebrae superioris sempatik değildir. Bu üçlü, stellat gangliyon bloğunun tuttuğunu doğrular. [[K1 s. 277]]' : '<b>Blok yok.</b> Sempatik tonus dilatatör pupillayı, süperior tarsal kası ve ter bezlerini çalıştırır. "Blok uygula"ya basın. [[K1 s. 277]]');
    go.addEventListener('click', () => { S.on = true; S.t = RM ? 3.6 : 0.001; render(); capNow(); go.disabled = true; });
    rs.addEventListener('click', () => { S.on = false; S.t = 0; render(); capNow(); go.disabled = false; });
    if (S.on) go.disabled = true;
    render(); capNow();
    const tk = ticker(el, (dt) => {
      if (S.on && S.t < 3.6 && !RM) { S.t += dt; render(); }
      if (!RM && !(S.t > 1.0)) {
        const ph = (performance.now() / 1500) % 1;
        flow.forEach((c, i) => { const f = (ph + i / 3) % 1; c.setAttribute('cx', (118 + (f < 0.35 ? 0 : (f - 0.35) / 0.65 * 212)).toFixed(1)); c.setAttribute('cy', (f < 0.35 ? 188 - f / 0.35 * 118 : 70).toFixed(1)); });
      }
    });
    return () => tk();
  });

  /* ================= 5 · f61_akoz ================= */
  const ROUTE = [[330, 150], [290, 185], [250, 240], [242, 290], [232, 302], [180, 292], [110, 250], [120, 190], [170, 140], [205, 108], [222, 98], [236, 76], [236, 50], [240, 30], [290, 22], [350, 20]];
  const STEPS = [[0, 1], [1, 4], [4, 9], [9, 12], [12, 15]];
  const STEPCAP = [
    '<b>Üretim.</b> Siliyer cisim aköz hümörü arka kamaraya salgılar: %80 Na⁺/K⁺-ATPaz\'a bağlı aktif Na⁺ taşınması, %20 plazma ultrafiltrasyonu. Üretimi ve episkleral venöz basıncı değiştirin. [[K1 s. 277]]',
    '<b>Arka kamara → pupilla.</b> Aköz hümör lens ile iris arasındaki dar aralıktan geçer ve pupilladan ön kamaraya girer. [[K1 s. 277]]',
    '<b>Ön kamara.</b> Aköz hümör burada dolaşır; su ve elektrolitlerden oluşan, hücre dışı sıvıya benzeyen berrak bir sıvıdır. [[K1 s. 276–278]]',
    '<b>Trabeküler ağ → Schlemm kanalı.</b> Sıvı açıdaki trabeküler ağdan Schlemm kanalına süzülür. [[K1 s. 278]]',
    '<b>Episkleral venler.</b> Kanal doğrudan episkleral venlere açılır; emilim GİB ile venöz basınç arasındaki farkla doğru orantılıdır. [[K1 s. 278]]',
  ];
  VIZ.f61_akoz = (el) => mount(el, { prod: 100, pv: 10, G: 15, step: 0, parts: [], acc: 0 }, (narrow, S) => {
    el.innerHTML = '';
    const W = narrow ? 360 : 680, H = narrow ? 440 : 360;
    const svg = mk('svg', { class: 'f61-svg' + (narrow ? ' f61-n' : ''), viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Gözün ön segmentinde aköz hümörün siliyer cisimden Schlemm kanalına yolu ve göz içi basınç göstergesi' }, el);
    const defs = mk('defs', {}, svg);
    const sg = mk('g', { class: 'f61-sg', transform: narrow ? 'translate(6 4) scale(0.76)' : '' }, svg);
    mk('path', { class: 'f61-vit', d: 'M300 176 L336 162 L354 92 L452 82 L452 314 L246 314 C246 224 266 199 296 199 Z' }, sg);
    mk('path', { class: 'f61-aq', d: 'M54 314 C54 206 118 116 222 84 L226 84 L226 314 Z' }, sg);
    mk('path', { class: 'f61-aq', d: 'M238 112 L270 150 L300 176 L296 202 L260 222 L246 260 L246 314 L238 314 Z' }, sg);
    mk('rect', { class: 'f61-aq', x: 226, y: 250, width: 20, height: 64 }, sg);
    mk('path', { class: 'f61-sol', d: 'M246 314 C246 224 266 199 296 199 C330 199 346 224 346 314 Z' }, sg);
    mk('path', { class: 'f61-zon', d: 'M300 176 L298 200 M336 162 L330 205' }, sg);
    mk('path', { class: 'f61-sol', d: 'M240 114 L300 88 L354 92 L336 162 L300 176 L270 150 Z' }, sg);
    [[316, 170], [296, 168], [278, 155]].forEach(([x, y]) => mk('circle', { class: 'f61-sol', cx: x, cy: y, r: 4 }, sg));
    mk('rect', { class: 'f61-sol', x: 226, y: 112, width: 12, height: 138 }, sg);
    mk('path', { class: 'f61-wall', d: 'M230 60 C290 50 360 52 452 56 L452 82 C360 78 290 76 222 84 Z' }, sg);
    const cornea = mk('path', { class: 'f61-corn2', d: 'M40 314 C40 200 110 100 230 60 L222 84 C118 116 54 206 54 314 Z' }, sg);
    // trabeküler ağ (ızgara) ve Schlemm
    const tm = mk('g', {}, sg); mk('rect', { class: 'f61-tmw', x: 216, y: 86, width: 22, height: 24, rx: 3 }, tm);
    for (let i = 1; i < 4; i++) { mk('path', { class: 'f61-tmg', d: `M${216 + i * 5.5} 86 L${216 + i * 5.5} 110` }, tm); mk('path', { class: 'f61-tmg', d: `M216 ${86 + i * 6} L238 ${86 + i * 6}` }, tm); }
    mk('ellipse', { class: 'f61-sch', cx: 236, cy: 72, rx: 11, ry: 6 }, sg);
    mk('path', { class: 'f61-vein0', d: 'M236 66 L236 38 C236 22 290 20 345 18' }, sg);
    mk('path', { class: 'f61-vein1', d: 'M236 66 L236 38 C236 22 290 20 345 18' }, sg);
    // adım vurgusu
    const hl = mk('path', { class: 'f61-hl' }, sg);
    // pompa ve ultrafiltrasyon simgeleri
    const pump = mk('g', { transform: 'translate(272 124)' }, sg);
    mk('circle', { class: 'f61-pump', r: 8 }, pump); const pArr = mk('path', { class: 'f61-pumpa', d: 'M-4 -2 A4.5 4.5 0 0 1 4 -2 M4 2 A4.5 4.5 0 0 1 -4 2' }, pump);
    txt(sg, 285, 129, '%80', 'f61-ts f61-bold'); 
    const uf = mk('g', { transform: 'translate(318 124)' }, sg);
    mk('path', { class: 'f61-ufc', d: 'M-5 -8 L-5 8 M5 -8 L5 8' }, uf); mk('path', { class: 'f61-uf', d: 'M-3 -4 L3 -2 M-3 0 L3 2 M-3 4 L3 6' }, uf);
    txt(sg, 328, 129, '%20', 'f61-ts f61-bold');
    // etiketler
    txt(sg, 20, 22, 'Schlemm kanalı', 'f61-sl'); mk('path', { class: 'f61-lead', d: 'M108 20 L225 69' }, sg);
    txt(sg, 20, 48, 'Trabeküler ağ', 'f61-sl'); mk('path', { class: 'f61-lead', d: 'M98 46 L215 94' }, sg);
    txt(sg, 142, 268, 'Ön kamara', 'f61-sl', { 'text-anchor': 'middle' });
    txt(sg, 275, 346, 'Arka kamara', 'f61-sl'); mk('path', { class: 'f61-lead', d: 'M290 334 L243 285' }, sg);
    txt(sg, 296, 268, 'Lens', 'f61-sl', { 'text-anchor': 'middle' });
    txt(sg, 362, 118, 'Siliyer cisim', 'f61-sl'); mk('path', { class: 'f61-lead', d: 'M358 114 L346 112' }, sg);
    txt(sg, 358, 250, 'Vitreus', 'f61-sl'); txt(sg, 358, 266, '(hacim görece', 'f61-sl'); txt(sg, 358, 282, 'sabit)', 'f61-sl');
    txt(sg, 350, 14, 'Episkleral ven', 'f61-sl', { 'text-anchor': 'start' });
    // parçacıklar
    const cum = [0]; for (let i = 1; i < ROUTE.length; i++) cum.push(cum[i - 1] + Math.hypot(ROUTE[i][0] - ROUTE[i - 1][0], ROUTE[i][1] - ROUTE[i - 1][1]));
    const TOT = cum[cum.length - 1];
    const posAt = (s) => { s = clamp(s, 0, TOT); let i = 1; while (i < cum.length - 1 && cum[i] < s) i++; const f = (s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1); return [lerp(ROUTE[i - 1][0], ROUTE[i][0], f), lerp(ROUTE[i - 1][1], ROUTE[i][1], f), i]; };
    const pl = mk('g', {}, sg);
    if (RM) { [0.06, 0.2, 0.4, 0.58, 0.78, 0.92].forEach((f) => { const a = posAt(f * TOT), b = posAt(f * TOT + 6); const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; mk('path', { class: 'f61-arr', d: 'M-6 -4 L5 0 L-6 4 Z', transform: `translate(${a[0].toFixed(1)} ${a[1].toFixed(1)}) rotate(${ang.toFixed(0)})` }, pl); }); }
    // GİB göstergesi
    const gg = mk('g', {}, svg);
    let gfill, gnum, pfill, pnum, normL;
    const GIB = narrow
      ? { x0: 20, w: 320, y: 318, h: 22, sx: (v) => 20 + v * 320 / 60 }
      : { sx: (v) => 300 - v * (260 / 60) };
    if (!narrow) {
      const Y = GIB.sx; const tx = 505, tw = 30;
      mk('rect', { class: 'f61-bd-c', x: tx, y: Y(60), width: tw, height: Y(40) - Y(60) }, gg);
      mk('rect', { class: 'f61-bd-w', x: tx, y: Y(40), width: tw, height: Y(20) - Y(40) }, gg);
      mk('rect', { class: 'f61-bd-o', x: tx, y: Y(20), width: tw, height: Y(10) - Y(20) }, gg);
      mk('rect', { class: 'f61-bd-n', x: tx, y: Y(10), width: tw, height: Y(0) - Y(10) }, gg);
      gfill = mk('rect', { class: 'f61-gf', x: tx + 8, width: tw - 16 }, gg);
      mk('rect', { class: 'f61-gtube', x: tx, y: Y(60), width: tw, height: Y(0) - Y(60), rx: 4 }, gg);
      [0, 20, 40, 60].forEach((v) => { txt(gg, tx - 6, Y(v) + 4, String(v), 'f61-ts', { 'text-anchor': 'end' }); });
      txt(gg, tx + tw + 8, Y(15) - 3, 'normal', 'f61-ts'); txt(gg, tx + tw + 8, Y(15) + 11, '10–20', 'f61-ts');
      txt(gg, tx, 24, 'GİB', 'f61-t'); gnum = txt(gg, tx + 34, 25, '', 'f61-big');
      const px = 626, pw = 20;
      mk('rect', { class: 'f61-ptube', x: px, y: Y(60), width: pw, height: Y(0) - Y(60), rx: 4 }, gg);
      pfill = mk('rect', { class: 'f61-pf', x: px + 4, width: pw - 8 }, gg);
      pnum = txt(gg, px + pw / 2, 0, '', 'f61-ts', { 'text-anchor': 'middle' });
      txt(gg, px + pw / 2, 322, 'Pv', 'f61-t', { 'text-anchor': 'middle' }); txt(gg, px + pw / 2, 338, 'episkleral', 'f61-ts', { 'text-anchor': 'middle' }); txt(gg, px + pw / 2, 352, 'venöz basınç', 'f61-ts', { 'text-anchor': 'middle' });
    } else {
      const { x0, w, y, h, sx } = GIB;
      txt(gg, x0, y - 12, 'GİB', 'f61-t'); gnum = txt(gg, x0 + 36, y - 11, '', 'f61-big');
      mk('rect', { class: 'f61-bd-n', x: sx(10), y, width: sx(20) - sx(10), height: h }, gg);
      mk('rect', { class: 'f61-bd-w', x: sx(20), y, width: sx(40) - sx(20), height: h }, gg);
      mk('rect', { class: 'f61-bd-c', x: sx(40), y, width: sx(60) - sx(40), height: h }, gg);
      gfill = mk('rect', { class: 'f61-gf', x: x0, y: y + 6, height: h - 12 }, gg);
      mk('rect', { class: 'f61-gtube', x: x0, y, width: w, height: h, rx: 4 }, gg);
      [0, 20, 40, 60].forEach((v) => txt(gg, sx(v), y + h + 15, String(v), 'f61-ts', { 'text-anchor': v === 0 ? 'start' : v === 60 ? 'end' : 'middle' }));
      txt(gg, sx(15), y - 2, 'normal 10–20', 'f61-ts', { 'text-anchor': 'middle', style: 'display:none' });
      txt(gg, x0, y + h + 34, 'yeşil bant: normal 10–20 mmHg', 'f61-ts');
      txt(gg, x0, y + h + 62, 'Pv', 'f61-t'); mk('rect', { class: 'f61-ptube', x: x0 + 24, y: y + h + 50, width: w - 24, height: 16, rx: 4 }, gg);
      pfill = mk('rect', { class: 'f61-pf', x: x0 + 24, y: y + h + 53, height: 10 }, gg); pnum = txt(gg, x0, y + h + 86, '', 'f61-ts');
    }
    const upd = () => {
      const G = S.G;
      if (!narrow) { const Y = GIB.sx; gfill.setAttribute('y', Y(clamp(G, 0, 60))); gfill.setAttribute('height', Y(0) - Y(clamp(G, 0, 60))); pfill.setAttribute('y', Y(S.pv)); pfill.setAttribute('height', Y(0) - Y(S.pv)); pnum.setAttribute('y', Y(S.pv) - 6); pnum.textContent = S.pv + ''; }
      else { gfill.setAttribute('width', (GIB.sx(clamp(G, 0, 60)) - GIB.x0).toFixed(1)); pfill.setAttribute('width', ((S.pv / 60) * (GIB.w - 24)).toFixed(1)); pnum.textContent = 'episkleral venöz basınç: ' + S.pv + ' mmHg'; }
      gnum.textContent = Math.round(G) + ' mmHg';
      gfill.setAttribute('class', 'f61-gf' + (G > 40 ? ' c' : G > 20 ? ' w' : ''));
      cornea.setAttribute('transform', `translate(${-clamp((G - 10) / 50 * 4, 0, 4).toFixed(2)} 0)`);
    };
    // kontroller
    const ctl = document.createElement('div'); ctl.className = 'f61-ctl';
    ctl.innerHTML = `<label class="f61-rng"><span>Aköz üretimi <b data-o="p"></b></span><input type="range" min="50" max="200" step="5" value="${S.prod}" data-r="p" aria-label="Aköz hümör üretimi, yüzde"></label>
      <label class="f61-rng"><span>Episkleral venöz basınç <b data-o="v"></b></span><input type="range" min="5" max="35" step="1" value="${S.pv}" data-r="v" aria-label="Episkleral venöz basınç, mmHg"><em class="f61-ends"><i>öksürme, ıkınma, baş aşağı ↑</i></em></label>
      <div class="btn-row"><button type="button" class="btn ghost f61-step">Yolu adım adım izle</button></div>
      ${narrow ? '<p class="f61-pumpnote"><b>⟳ %80</b> Na⁺/K⁺-ATPaz\'a bağlı aktif Na⁺ taşınması · <b>%20</b> ultrafiltrasyon (kılcal süzülme)</p>' : ''}`;
    el.appendChild(ctl);
    const ip = ctl.querySelector('[data-r=p]'), iv = ctl.querySelector('[data-r=v]'), op = ctl.querySelector('[data-o=p]'), ov = ctl.querySelector('[data-o=v]'), sb = ctl.querySelector('.f61-step');
    const lab = () => { op.textContent = '%' + S.prod; ov.textContent = S.pv + ' mmHg'; };
    const hlStep = () => { if (S.step < 1) { hl.setAttribute('d', ''); return; } const [a, b] = STEPS[S.step - 1]; hl.setAttribute('d', dpath(ROUTE.slice(a, b + 1))); };
    const target = () => S.pv + 5 * S.prod / 100;
    const onIn = () => {
      S.prod = +ip.value; S.pv = +iv.value; lab(); S.step = 0; hlStep(); sb.textContent = 'Yolu adım adım izle';
      if (RM) S.G = target();
      setCap(el, S.pv >= 20 ? '<b>Venöz basınç yüksek.</b> GİB − venöz basınç farkı daralır, drenaj azalır; aköz birikir ve GİB yeni, daha yüksek bir dengeye çıkar. [[K1 s. 278]]' : S.prod > 130 ? '<b>Üretim arttı.</b> Drenaj ancak GİB yükselip fark büyüyünce üretime yetişir. [[K1 s. 277–278]]' : '<b>Denge.</b> Üretim ile drenaj eşit; GİB sabit kalır (normal 10–20 mmHg). [[K1 s. 277]]');
      upd();
    };
    ip.addEventListener('input', onIn); iv.addEventListener('input', onIn);
    sb.addEventListener('click', () => { S.step = S.step % 5 + 1; hlStep(); sb.textContent = `Sonraki adım (${S.step}/5)`; setCap(el, STEPCAP[S.step - 1]); });
    lab(); upd(); hlStep();
    // simülasyon
    const parts = [];
    const dots = [];
    const tk = ticker(el, (dt) => {
      const tg = target();
      S.G += (tg - S.G) * (1 - Math.exp(-dt / 0.25));
      upd();
      if (RM) return;
      pArr.setAttribute('transform', `rotate(${(performance.now() / 6) % 360})`);
      const out = Math.max(0.12, (S.G - S.pv) / 5), uret = S.prod / 100;
      S.acc += dt * 2.6 * uret;
      while (S.acc >= 1) { S.acc -= 1; if (parts.length < 90) { const c = mk('circle', { class: 'f61-pt', r: 3.2 }, pl); parts.push({ s: Math.random() * 8, c, j: (Math.random() - 0.5) * 5 }); } }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i], [, , seg] = posAt(p.s);
        const v = (seg >= 11 && seg <= 12) ? 62 * out * 0.55 : 64 * (0.45 + 0.55 * Math.min(out, 1.6));
        p.s += v * dt;
        if (p.s >= TOT) { p.c.remove(); parts.splice(i, 1); continue; }
        const [x, y] = posAt(p.s); p.c.setAttribute('cx', (x + p.j * (seg < 11 ? 1 : 0)).toFixed(1)); p.c.setAttribute('cy', (y + p.j * 0.4).toFixed(1));
      }
    });
    return () => tk();
  });

  /* ================= 6 · f61_artis ================= */
  const bump = (x, c, w) => Math.exp(-Math.pow((x - c) / w, 2));
  const OLAY = {
    lar: { ad: 'Laringoskopi', A: 15, Ao: 3, f: (x) => bump(x, 0.38, 0.12), etiket: '+10–20 mmHg', band: [10, 20], onl: [['opi', 'Güçlü opioid'], ['lma', 'LMA (entübasyon yok)']],
      cap: '<b>Laringoskopi.</b> Sempatik yanıt GİB\'i 10–20 mmHg artırabilir. Önlem: güçlü bir opioid eklemek ya da entübasyon yerine LMA kullanmak. Bir olay ve bir önlem seçin. [[K1 s. 278]]',
      capO: '<b>Sempatik yanıt baskılandı.</b> Güçlü opioid laringoskopiye sempatik yanıtı köreltir; LMA entübasyonu tümden önler. [[K1 s. 278]]' },
    oks: { ad: 'Öksürme / ıkınma / kusma', A: 35, Ao: 3, f: (x) => 0.55 * bump(x, 0.27, 0.06) + bump(x, 0.5, 0.08) + 0.7 * bump(x, 0.72, 0.06), etiket: '+30–40 mmHg', band: [30, 40],
      zincir: 'venöz basınç ↑ → episkleral venöz basınç ↑ → aköz drenajı ↓ → GİB ↑', onl: [['der', 'Derin ekstübasyon'], ['lma', 'ETT → LMA değişimi'], ['bant', 'Tüpü bantla tespit (bağ yok)'], ['bas', 'Baş yukarı']],
      cap: '<b>Venöz basınç artışı.</b> Öksürme, ıkınma ve kusma episkleral venöz basıncı yükseltir, aköz drenajı azalır: GİB 30–40 mmHg artabilir. Özellikle uyanmada önemlidir. [[K1 s. 278]]',
      capO: '<b>Önlem.</b> Derin ekstübasyon ya da ETT\'nin LMA ile değiştirilmesi öksürük riskini azaltır; bağ juguler venleri sıkabileceği için tüp bantla tespit edilir; baş yukarı pozisyon episkleral venöz basıncı daha da düşürür. [[K1 s. 278]]' },
    sux: { ad: 'Süksinilkolin', A: 10, Ao: 0, f: (x) => (x < 0.083 ? x / 0.083 : x < 0.417 ? 1 : x < 0.833 ? 1 - (x - 0.417) / 0.416 : 0), etiket: 'en çok +10 mmHg', dk: true, band: [10, 10], onl: [['rok', 'Roküronyum']],
      cap: '<b>Süksinilkolin.</b> GİB\'i bilinmeyen bir mekanizmayla 5–10 dakika boyunca en çok 10 mmHg artırır. [[K1 s. 278]]',
      capO: '<b>Roküronyum.</b> Penetran göz yaralanmalı hastalar çoğu zaman yeterince aç değildir; hızlı ardışık indüksiyonda kas gevşetici olarak roküronyum en iyi seçenek olabilir. [[K1 s. 278]]' },
    hip: { ad: 'Hiperkapni', A: 3, Ao: 3, f: (x) => 1 / (1 + Math.exp(-(x - 0.45) * 9)), etiket: 'küçük artış', zincir: 'PaCO₂ ↑ → koroidal vazodilatasyon → GİB hafif ↑', onl: [],
      cap: '<b>Hiperkapni.</b> Koroidal vazodilatasyon yapar ve GİB\'i biraz artırır. Süksinilkolin dışındaki nedenler kafa içi basıncı artıranlarla aynıdır (Bölüm 49). [[K1 s. 278]]' },
  };
  const BASE = 15, ESIK = 35;
  VIZ.f61_artis = (el) => mount(el, { ol: 'lar', onl: {} }, (narrow, S) => {
    el.innerHTML = '';
    const W = 360, H = narrow ? 460 : 320;
    const seg = document.createElement('div'); seg.className = 'seg f61-seg'; seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', 'Olay seçici');
    Object.keys(OLAY).forEach((k) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.o = k; b.textContent = OLAY[k].ad; b.setAttribute('aria-pressed', String(k === S.ol)); seg.appendChild(b); });
    el.appendChild(seg);
    const svg = mk('svg', { class: 'f61-svg' + (narrow ? ' f61-n' : ''), viewBox: narrow ? '0 0 360 420' : '0 0 680 320', role: 'img', 'aria-label': 'Penetran göz yaralanmasında anestezi olaylarının göz içi basıncını nasıl yükselttiğini gösteren GİB–zaman grafiği' }, el);
    // göz küresi
    const ec = narrow ? [180, 70] : [110, 160], er = narrow ? 48 : 72;
    const eg = mk('g', { transform: `translate(${ec[0]} ${ec[1]})` }, svg);
    mk('circle', { class: 'f61-gl', r: er }, eg); mk('circle', { class: 'f61-vit', r: er - 8 }, eg);
    mk('circle', { class: 'f61-ir', cx: -er * 0.55, r: er * 0.22 }, eg);
    const wa = -148 * Math.PI / 180, wx = er * Math.cos(wa), wy = er * Math.sin(wa);
    mk('path', { class: 'f61-wound', d: `M${(wx * 0.9).toFixed(1)} ${(wy * 0.9).toFixed(1)} L${(wx * 1.1).toFixed(1)} ${(wy * 1.1).toFixed(1)}` }, eg);
    const dr = [0, 1, 2].map(() => mk('circle', { class: 'f61-leak', r: er * 0.07 }, eg));
    const leakTxt = txt(svg, narrow ? ec[0] : ec[0], narrow ? ec[1] + er + 18 : ec[1] + er + 24, 'İçerik dışarı itilebilir', 'f61-t f61-warnt', { 'text-anchor': 'middle' });
    txt(svg, ec[0] + (narrow ? er + 10 : 0), narrow ? ec[1] + 4 : ec[1] - er - 10, 'yara açıklığı', 'f61-ts', { 'text-anchor': narrow ? 'start' : 'middle', style: narrow ? '' : 'display:none' });
    // grafik
    const gx = narrow ? 52 : 290, gy = narrow ? 150 : 30, gw = narrow ? 296 : 360, gh = narrow ? 200 : 230;
    const Y = (v) => gy + gh - (v / 60) * gh, X = (u) => gx + u * gw;
    mk('rect', { class: 'f61-ok', x: gx, y: Y(20), width: gw, height: Y(10) - Y(20) }, svg);
    txt(svg, gx + gw - 4, Y(20) + 13, 'normal', 'f61-ts', { 'text-anchor': 'end' });
    mk('path', { class: 'f61-axs', d: `M${gx} ${gy} L${gx} ${gy + gh} L${gx + gw} ${gy + gh}` }, svg);
    [0, 20, 40, 60].forEach((v) => { mk('path', { class: 'f61-gl2', d: `M${gx} ${Y(v)} L${gx + gw} ${Y(v)}` }, svg); txt(svg, gx - 6, Y(v) + 4, String(v), 'f61-ts', { 'text-anchor': 'end' }); });
    mk('path', { class: 'f61-esik', d: `M${gx} ${Y(ESIK)} L${gx + gw} ${Y(ESIK)}` }, svg);
    txt(svg, gx + gw - 4, Y(ESIK) - 5, 'temsilî eşik', 'f61-ts', { 'text-anchor': 'end' });
    txt(svg, narrow ? gx - 42 : gx - 40, gy - 8, 'GİB (mmHg)', 'f61-ts');
    const xlab = txt(svg, gx + gw / 2, gy + gh + 20, 'Zaman', 'f61-ts', { 'text-anchor': 'middle' });
    const dkG = mk('g', {}, svg);
    const bandG = mk('rect', { class: 'f61-rg', x: gx, width: gw }, svg);
    const old = mk('path', { class: 'f61-old' }, svg);
    const cur = mk('path', { class: 'f61-cur', pathLength: 1 }, svg);
    const pk = txt(svg, 0, 0, '', 'f61-t f61-pk', { 'text-anchor': 'middle' });
    // HTML: önlemler, zincir
    const onlD = document.createElement('div'); onlD.className = 'btn-row f61-onl'; el.appendChild(onlD);
    const zin = document.createElement('p'); zin.className = 'f61-zin'; el.appendChild(zin);
    const N = 90, mapd = (o, A) => { const pts = []; for (let i = 0; i <= N; i++) { const u = i / N; pts.push([X(u), Y(BASE + A * o.f(u))]); } return pts; };
    let t0 = 0, prog = 1, leak = false;
    const draw = () => {
      const o = OLAY[S.ol], any = Object.values(S.onl).some(Boolean) && o.onl.length;
      const A = any ? o.Ao : o.A;
      cur.setAttribute('d', dpath(mapd(o, A)));
      if (any) { old.setAttribute('d', dpath(mapd(o, o.A))); old.style.display = ''; } else old.style.display = 'none';
      // tepe
      let pi = 0, pv = -1; for (let i = 0; i <= N; i++) { const v = o.f(i / N); if (v > pv + 1e-9) { pv = v; pi = i; } }
      const px = X(pi / N), py = Y(BASE + A * pv);
      pk.setAttribute('x', clamp(px, gx + 50, gx + gw - 50)); pk.setAttribute('y', py - 8);
      pk.textContent = any ? (S.ol === 'sux' ? 'artış yok' : 'artış küçülür') : o.etiket;
      if (o.band && !any && S.ol !== 'sux') { bandG.style.display = ''; bandG.setAttribute('y', Y(BASE + o.band[1])); bandG.setAttribute('height', Y(BASE + o.band[0]) - Y(BASE + o.band[1])); } else bandG.style.display = 'none';
      leak = !any && BASE + o.A > ESIK; leakTxt.style.display = leak ? '' : 'none';
      dr.forEach((d) => { d.style.display = leak ? '' : 'none'; });
      if (leak && RM) dr.forEach((d, i) => { d.setAttribute('cx', (wx * (1.35 + i * 0.3)).toFixed(1)); d.setAttribute('cy', (wy * (1.2 + i * 0.35) + i * 3).toFixed(1)); });
      // zaman ekseni
      dkG.innerHTML = '';
      if (o.dk) { xlab.textContent = 'Zaman (dk)'; [0, 5, 10].forEach((m) => { const x = X(m / 12); mk('path', { class: 'f61-gl2', d: `M${x} ${gy + gh} L${x} ${gy + gh + 5}` }, dkG); txt(dkG, x, gy + gh + 17, String(m), 'f61-ts', { 'text-anchor': 'middle' }); }); xlab.setAttribute('y', gy + gh + 32); }
      else { xlab.textContent = 'Zaman'; xlab.setAttribute('y', gy + gh + 20); }
      // butonlar
      onlD.innerHTML = '';
      o.onl.forEach(([id, ad]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn ghost f61-ob'; b.textContent = ad; b.setAttribute('aria-pressed', String(!!S.onl[id])); b.addEventListener('click', () => { S.onl[id] = !S.onl[id]; replay(); capN(); }); onlD.appendChild(b); });
      if (!o.onl.length) { const p = document.createElement('p'); p.className = 'f61-info'; p.textContent = 'Kitap bu olay için özel bir önlem vermez.'; onlD.appendChild(p); }
      zin.textContent = o.zincir || ''; zin.style.display = o.zincir ? '' : 'none';
      seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.o === S.ol)));
    };
    const capN = () => { const o = OLAY[S.ol]; setCap(el, Object.values(S.onl).some(Boolean) && o.onl.length ? o.capO : o.cap); };
    const replay = () => { draw(); t0 = 0; prog = RM ? 1 : 0; cur.style.strokeDashoffset = RM ? 0 : 1; };
    seg.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.ol = b.dataset.o; S.onl = {}; replay(); capN(); });
    draw(); capN(); cur.style.strokeDasharray = 1; cur.style.strokeDashoffset = 0;
    t0 = 0; prog = RM ? 1 : 0; cur.style.strokeDashoffset = RM ? 0 : 1;
    const tk = ticker(el, (dt) => {
      if (RM) return;
      t0 += dt;
      if (prog < 1) { prog = clamp(t0 / 2, 0, 1); cur.style.strokeDashoffset = 1 - prog; }
      if (leak && prog >= 0.4) dr.forEach((d, i) => { const f = ((t0 * 0.7 + i / 3) % 1); d.setAttribute('cx', (wx * (1.05 + f * 1.1)).toFixed(1)); d.setAttribute('cy', (wy * (1.05 + f * 0.7) + f * f * 14).toFixed(1)); d.style.opacity = (1 - f * 0.8).toFixed(2); });
    });
    return () => tk();
  });
})();
