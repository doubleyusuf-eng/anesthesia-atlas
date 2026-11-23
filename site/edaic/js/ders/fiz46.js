/* Bölüm 46 · Beyin–omurilik sıvısı · bileşenler (tarif: docs/tasarim/fiz46.md; K1 s. 198–199).
   Kitaptan: 1400 g → < 50 g, 0,3 mL/dk ≈ 500 mL/gün, 100–150 mL (yarı yarıya), dolaşım yolu, %90/%10,
   BOS 15 / venöz 8 cmH₂O, onkotik 25 / ≈ 0 mmHg, Tablo 46.1 değerleri, hidrosefali sınıflaması ve tedavisi.
   Şematik: bütün çizimler, emilim hızı–basınç ilişkisi, iyon çubukları, basınç göstergeleri (viz-foot'larda belirtildi). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tween = (ms, cb) => {
    if (RM || !ms) { cb(1); return () => {}; }
    let raf = 0, t0 = 0;
    const f = (t) => { if (!t0) t0 = t; const k = clamp((t - t0) / ms, 0, 1); cb(ease(k)); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  };
  /* çok satırlı metin: satırlar '|' ile */
  const tx = (x, y, s, cls, anc, lh) => {
    const L = String(s).split('|');
    return `<text class="f46-t ${cls || ''}" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}>${L.map((l, i) => `<tspan x="${x}" dy="${i ? (lh || 16) : 0}">${l}</tspan>`).join('')}</text>`;
  };
  const okDef = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="${cls}"/></marker>`;
  /* kırık çizgi boyunca konum */
  const yol = (pts) => {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const top = L[L.length - 1];
    return {
      pts, top,
      at(s) {
        s = clamp(s, 0, top);
        let i = 1; while (i < L.length - 1 && L[i] < s) i++;
        const k = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
        return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k];
      },
    };
  };
  const dYol = (pts) => 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');

  /* =====================================================================
     Ortak yalın sagittal beyin (yerel koordinat 0–330 × 0–360; ön = sol)
     ===================================================================== */
  const BR = {
    dura: 'M14 150 C10 62 96 6 182 6 C272 6 330 66 328 156 C327 220 320 270 296 292 C270 308 234 306 214 300 L212 360 L160 360 L158 300 C156 270 150 250 140 238 C120 236 80 240 52 226 C30 214 16 190 14 150 Z',
    sinus: 'M62 42 C98 6 140 1 182 1 C232 1 272 12 300 44',
    cer: 'M26 150 C24 72 102 18 182 18 C266 18 316 72 316 152 C316 192 304 214 282 218 C262 222 236 214 214 204 C200 198 196 194 186 194 L168 194 C156 212 130 224 100 224 C66 224 36 206 26 150 Z',
    cbl: 'M214 232 C232 222 284 224 300 246 C306 266 290 286 262 288 C236 290 214 278 212 258 Z',
    stem: 'M168 192 L202 192 L198 212 L188 216 L188 256 L194 264 L192 300 L192 360 L174 360 L174 300 C172 284 170 272 172 262 C156 256 154 222 168 212 Z',
    lat: 'M132 130 C110 108 140 80 196 84 C236 88 254 120 240 150 C232 166 216 172 204 170',
    mon: 'M132 130 L146 133',
    uc: 'M146 132 C148 150 154 172 172 186',
    aq: 'M172 186 L190 214',
    dort: 'M190 214 L212 236 L193 258 L184 236 Z',
  };
  const PX = { lat: [[244, 126], [249, 132], [242, 133]], uc: [[146, 143], [151, 147]], dort: [[192, 248], [197, 251]] };
  const GRAN = [[130, 8], [182, 5], [236, 10]];
  const P = {
    lat: [[206, 170], [232, 162], [244, 140], [244, 118], [224, 94], [196, 85], [160, 86], [128, 100], [122, 118], [132, 130]],
    mon: [[132, 130], [146, 133]],
    uc: [[146, 133], [149, 152], [156, 170], [172, 186]],
    aq: [[172, 186], [181, 200], [190, 214]],
    dort: [[190, 214], [200, 226], [204, 236], [196, 250], [193, 256]],
    mag: [[193, 256], [200, 276], [222, 297]],
    lus: [[186, 236], [168, 250], [161, 268], [163, 290]],
    up: [[222, 297], [262, 301], [292, 288], [306, 265], [316, 230], [322, 190], [322, 150], [312, 100], [285, 51], [240, 15], [182, 12], [120, 17], [69, 50], [32, 100], [20, 150]],
    down: [[222, 297], [206, 314], [203, 358]],
    down2: [[163, 290], [166, 358]],
    etv: [[146, 133], [149, 152], [156, 170], [164, 182], [158, 204], [150, 226], [110, 232], [60, 224], [26, 180], [20, 150]],
  };
  const cat = (...a) => a.reduce((r, p) => r.concat(r.length ? p.slice(1) : p), []);
  const DUZ = {
    gen: { W: 660, H: 380, s: 1, ox: 160, oy: 8 },
    dar: { W: 360, H: 330, s: 0.78, ox: 2, oy: 4 },
  };
  const gp = (L, p) => [L.ox + p[0] * L.s, L.oy + p[1] * L.s];
  const beyinHtml = (L) => `<g transform="translate(${L.ox} ${L.oy}) scale(${L.s})">
      <path class="f46-bos-alan" data-sa d="${BR.dura}"/>
      <path class="f46-sinus-d" d="${BR.sinus}"/><path class="f46-sinus-i" d="${BR.sinus}"/>
      ${GRAN.map((p, i) => `<circle class="f46-gran" data-gran="${i}" cx="${p[0]}" cy="${p[1]}" r="4.5"/>`).join('')}
      <path class="f46-doku" data-cer d="${BR.cer}"/>
      <path class="f46-doku" data-cbl d="${BR.cbl}"/>
      <path class="f46-doku" d="${BR.stem}"/>
      <ellipse class="f46-talamus" cx="176" cy="150" rx="22" ry="14"/>
      <path class="f46-bas" data-bas="lat" d="${BR.lat}"/><path class="f46-bas" data-bas="uc" d="${BR.uc}"/>
      <path class="f46-bas f46-bas-d" data-bas="dort" d="${BR.dort}"/>
      <path class="f46-vk" data-vk="lat" d="${BR.lat}" stroke-width="15"/>
      <path class="f46-vk" data-vk="mon" d="${BR.mon}" stroke-width="7"/>
      <path class="f46-vk" data-vk="uc" d="${BR.uc}" stroke-width="10"/>
      <path class="f46-vk" data-vk="aq" d="${BR.aq}" stroke-width="5"/>
      <path class="f46-vi" data-vi="lat" d="${BR.lat}" stroke-width="10"/>
      <path class="f46-vi" data-vi="mon" d="${BR.mon}" stroke-width="3.5"/>
      <path class="f46-vi" data-vi="uc" d="${BR.uc}" stroke-width="6"/>
      <path class="f46-vi" data-vi="aq" d="${BR.aq}" stroke-width="2"/>
      <path class="f46-dort" data-vk="dort" d="${BR.dort}"/>
      ${Object.keys(PX).map((k) => `<g class="f46-px" data-px="${k}">${PX[k].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.2"/>`).join('')}</g>`).join('')}
    </g>`;
  /* e: { id, p: yerel nokta, w: [yan, y, metin], n: [y, metin] } */
  const SAG_X = 508, SOL_X = 155, DAR_X = 270;
  const etiketHtml = (list, L, dar) => list.map((e) => {
    const [gx, gy] = gp(L, e.p);
    if (dar) {
      if (!e.n) return '';
      return `<g data-e="${e.id}"><line class="f46-lead" x1="${DAR_X - 3}" y1="${e.n[0] - 4}" x2="${gx.toFixed(1)}" y2="${gy.toFixed(1)}"/>${tx(DAR_X, e.n[0], e.n[1], 'f46-lbl')}</g>`;
    }
    if (!e.w) return '';
    const r = e.w[0] === 'r', x = r ? SAG_X : SOL_X;
    return `<g data-e="${e.id}"><line class="f46-lead" x1="${r ? x - 3 : x + 3}" y1="${e.w[1] - 4}" x2="${gx.toFixed(1)}" y2="${gy.toFixed(1)}"/>${tx(x, e.w[1], e.w[2], 'f46-lbl', r ? 'start' : 'end')}</g>`;
  }).join('');
  /* parçacık havuzu */
  const havuz = (kap, n, cls) => { let h = ''; for (let i = 0; i < n; i++) h += `<circle class="${cls || 'f46-par'}" r="3.2" cx="-20" cy="-20"/>`; kap.insertAdjacentHTML('beforeend', h); return Array.from(kap.querySelectorAll('circle')).slice(-n); };

  /* =====================================================================
     1 · f46_islev — BOS'un beş işi (K1 s. 198)
     ===================================================================== */
  VIZ.f46_islev = (el) => {
    const SEC = [['kaldirma', 'Kaldırma'], ['iyon', 'İyon ortamı'], ['kib', 'KİB tamponu'], ['solunum', 'Solunum'], ['glim', 'Glimfatik']];
    const CAP = {
      kaldirma: '<b>Kaldırma kuvveti.</b> Erişkin beyni ≈ 1400 g gelir; BOS içinde asılıyken etkin ağırlığı 50 g\'ın altına iner. Ani baş hareketinde eylemsizlik azdır; BOS beyni kafa tabanına karşı da yastıklar. [[K1 s. 198]]',
      iyon: '<b>Sabit iyon ortamı.</b> Nöronlar dış ortamlarındaki değişikliğe çok duyarlıdır; sabit iyon ve ozmotik ortam normal nöron etkinliği için şarttır. [[K1 s. 198]]',
      kib: '<b>KİB tamponu.</b> KİB artınca BOS kafatasından uzaklaşır; bu önemli ama sınırlı bir kompansasyondur (Bölüm 49). [[K1 s. 198]]',
      solunum: '<b>Solunumun kontrolü.</b> CO₂ kandan BOS\'a serbestçe geçer; BOS\'ta protein az, tampon gücü düşük olduğu için pH kan PCO₂\'sine çok duyarlıdır. Merkezi kemoreseptörler bunu algılar, V̇E ayarlanır (Bölüm 22). [[K1 s. 198]]',
      glim: '<b>Glimfatik sistem.</b> Beyinde lenfatik yoktur; BOS damarlarla astrosit ayaksı uzantıları arasındaki paravasküler kanallarda dolaşıp atıkları toplar. [[K1 s. 198]]',
    };
    let sec = 'kaldirma', dar = false, sahne = null, t = 0, tmr = 0;
    el.innerHTML = `<div class="f46-kont">${segHtml('BOS işlevi', 'is', SEC, sec)}</div><div class="f46-islev-kap"></div>`;
    const kap = el.querySelector('.f46-islev-kap');

    const beyinSil = (cx, cy, rx, ry, cls) => `<g class="${cls || ''}"><ellipse class="f46-doku" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
      <path class="f46-girus" d="M${cx - rx * 0.6} ${cy - ry * 0.2} q${rx * 0.25} ${-ry * 0.5} ${rx * 0.5} 0 M${cx - rx * 0.1} ${cy + ry * 0.35} q${rx * 0.3} ${-ry * 0.55} ${rx * 0.6} -${ry * 0.1} M${cx + rx * 0.05} ${cy - ry * 0.55} q${rx * 0.25} ${ry * 0.3} ${rx * 0.5} ${ry * 0.05} M${cx - rx * 0.75} ${cy + ry * 0.3} q${rx * 0.2} ${-ry * 0.3} ${rx * 0.45} -${ry * 0.05}"/></g>`;

    const sahneler = {
      kaldirma(d) {
        const W = d ? 360 : 640, k = d ? 0.74 : 1;
        const cxL = W * 0.25, cxR = W * 0.72, cyB = d ? 132 : 140, cyK = d ? 142 : 150;
        const rx = 62 * k, ry = 42 * k, krx = 96 * k, kry = 74 * k;
        const dial = (cx, val, cls) => `${tx(cx, 18, 'etkin ağırlık', 'f46-kucuk', 'middle')}<rect class="f46-dial" x="${cx - 42 * k}" y="26" width="${84 * k}" height="30" rx="6"/>${tx(cx, 47, val, 'f46-big ' + (cls || ''), 'middle')}`;
        const z = []; const n = 7, x0 = cxR - krx * 0.72, x1 = cxR + krx * 0.72, yb = cyK + kry * 0.66;
        for (let i = 0; i <= n * 2; i++) z.push(`${(x0 + (x1 - x0) * i / (n * 2)).toFixed(1)} ${(i % 2 ? yb - 9 * k : yb + 2).toFixed(1)}`);
        const html = `${dial(cxL, '1400 g')}${dial(cxR, '&lt; 50 g', 'f46-c-b')}
          <line class="f46-ip" x1="${cxL}" y1="56" x2="${cxL}" y2="${cyB - ry}"/>${beyinSil(cxL, cyB, rx, ry)}
          ${tx(cxL, cyB + ry + 22, 'havada', 'f46-lbl', 'middle')}
          <g data-kafa><ellipse class="f46-kafa" cx="${cxR}" cy="${cyK}" rx="${krx}" ry="${kry}"/>
            <polyline class="f46-taban" points="${z.join(' ')}"/>
            <line class="f46-ip" x1="${cxR}" y1="56" x2="${cxR}" y2="${cyK - 8 - ry}"/>
            <g data-bey>${beyinSil(cxR, cyK - 8, rx, ry)}</g></g>
          ${d ? tx(cxR, cyK + kry + 22, 'BOS yastığı', 'f46-lbl f46-c-b', 'middle') + tx(cxR, cyK + kry + 40, 'girintili kafa tabanı', 'f46-lbl', 'middle')
            : tx(cxR - 10, cyK + kry + 26, 'BOS yastığı', 'f46-lbl f46-c-b', 'end') + tx(cxR + 10, cyK + kry + 26, 'girintili kafa tabanı', 'f46-lbl', 'start')}
          ${d ? tx(W / 2, 300, 'eylemsizlik ↓ →|hızlanma–yavaşlama hasarı ↓', 'f46-lbl f46-vurgu', 'middle', 18) : tx(W / 2, 286, 'eylemsizlik ↓ → hızlanma–yavaşlama hasarı ↓', 'f46-lbl f46-vurgu', 'middle')}`;
        let sx = 0, bx = 0, bv = 0;
        return {
          html,
          step(dt, T, svg) {
            const ph = T % 2;
            sx = ph < 0.25 ? 9 * Math.sin(ph / 0.25 * Math.PI * 3) * (1 - ph / 0.25) : 0;
            bv += (420 * (sx - bx) - 30 * bv) * dt; bx += bv * dt;
            svg.querySelector('[data-kafa]').setAttribute('transform', `translate(${sx.toFixed(2)} 0)`);
            svg.querySelector('[data-bey]').setAttribute('transform', `translate(${(bx - sx).toFixed(2)} 0)`);
          },
        };
      },
      iyon(d) {
        const W = d ? 360 : 640;
        const hx = d ? 140 : 250, hy = d ? 135 : 150, hrx = d ? 128 : 200, hry = d ? 92 : 105;
        const nx = d ? 76 : 160, nr = d ? 22 : 28, ax1 = d ? 226 : 400;
        const ions = [['Na⁺', -0.72, -0.5], ['Cl⁻', -0.2, -0.72], ['K⁺', 0.35, -0.62], ['Na⁺', 0.75, -0.25], ['Cl⁻', 0.7, 0.42], ['K⁺', 0.15, 0.7], ['Na⁺', -0.4, 0.68], ['Cl⁻', -0.85, 0.15]];
        const bx = d ? [288, 312, 336] : [508, 548, 588], bw = d ? 16 : 24, by = d ? 200 : 220, bh = d ? [86, 70, 24] : [110, 92, 32];
        const html = `<ellipse class="f46-hale" cx="${hx}" cy="${hy}" rx="${hrx}" ry="${hry}"/>
          ${tx(hx + hrx * 0.55, hy - hry * 0.78, 'BOS', 'f46-lbl f46-c-b', 'middle')}
          <path class="f46-akson" d="M${nx + nr - 2} ${hy} L${ax1} ${hy}"/>
          <path class="f46-dend" d="M${nx - nr + 4} ${hy - 12} l-22 -16 M${nx - nr + 2} ${hy + 8} l-24 14 M${nx - 6} ${hy - nr + 2} l-6 -22 M${nx - 4} ${hy + nr - 2} l-4 22 M${ax1} ${hy} l14 -10 M${ax1} ${hy} l14 10"/>
          <circle class="f46-noron" cx="${nx}" cy="${hy}" r="${nr}"/>${tx(nx, hy + 5, 'nöron', 'f46-kucuk', 'middle')}
          <circle class="f46-spike" r="5" cx="${nx}" cy="${hy}"/>
          ${ions.map((o, i) => `<text class="f46-t f46-ion" data-ion="${i}" x="${hx + o[1] * hrx * 0.8}" y="${hy + o[2] * hry * 0.8 + 5}" text-anchor="middle">${o[0]}</text>`).join('')}
          ${tx((bx[0] + bx[2] + bw) / 2, d ? 80 : 90, 'derişim|sabit', 'f46-kucuk', 'middle')}
          ${bx.map((x, i) => `<rect class="f46-cub" x="${x}" y="${by - bh[i]}" width="${bw}" height="${bh[i]}" rx="3"/>${tx(x + bw / 2, by + 18, ['Na⁺', 'Cl⁻', 'K⁺'][i], 'f46-kucuk', 'middle')}`).join('')}
          <line class="f46-eks" x1="${bx[0] - 6}" x2="${bx[2] + bw + 6}" y1="${by}" y2="${by}"/>
          ${d ? tx(W / 2, 300, 'sabit iyon ve ozmotik ortam →|normal nöron etkinliği', 'f46-lbl f46-vurgu', 'middle', 18) : tx(W / 2, 286, 'sabit iyon ve ozmotik ortam → normal nöron etkinliği', 'f46-lbl f46-vurgu', 'middle')}`;
        return {
          html,
          step(dt, T, svg) {
            svg.querySelectorAll('[data-ion]').forEach((e, i) => {
              const o = ions[i];
              e.setAttribute('x', (hx + o[1] * hrx * 0.8 + Math.sin(T * 0.9 + i * 1.7) * 7).toFixed(1));
              e.setAttribute('y', (hy + o[2] * hry * 0.8 + 5 + Math.cos(T * 0.7 + i) * 5).toFixed(1));
            });
            const sp = svg.querySelector('.f46-spike'), f = (T % 1.6) / 1.2;
            sp.setAttribute('cx', (nx + nr + (ax1 - nx - nr) * clamp(f, 0, 1)).toFixed(1));
            sp.style.opacity = f <= 1 ? 1 : 0;
          },
          son(svg) { const sp = svg.querySelector('.f46-spike'); sp.style.opacity = 0; },
        };
      },
      kib(d) {
        const W = d ? 360 : 640;
        const cx = d ? 140 : 250, cy = d ? 118 : 128, rx = d ? 125 : 150, ry = d ? 92 : 100;
        const kx0 = cx - 18, kw = 36, ky0 = cy + ry - 14, ky1 = d ? 290 : 296;
        const mx = d ? 286 : 494, my0 = 60, my1 = d ? 210 : 220, mw = d ? 28 : 36;
        const html = `<rect class="f46-kanal" x="${kx0}" y="${ky0}" width="${kw}" height="${ky1 - ky0}"/>
          <rect class="f46-kanal-d" data-kd x="${kx0 + 2}" y="${ky1}" width="${kw - 4}" height="0"/>
          <ellipse class="f46-kafa" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
          <rect class="f46-bos-alan" x="${kx0 + 2}" y="${cy + ry - 22}" width="${kw - 4}" height="24" style="stroke:none"/>
          <ellipse class="f46-doku" data-bey cx="${cx}" cy="${cy - 6}" rx="${rx - 26}" ry="${ry - 26}"/>
          <path class="f46-kan" d="M${cx - rx * 0.62} ${cy + 10} q${rx * 0.3} -${ry * 0.75} ${rx * 0.7} -${ry * 0.55} q${rx * 0.25} ${ry * 0.12} ${rx * 0.45} ${ry * 0.5}"/>
          <circle class="f46-kitle" data-kit cx="${cx + rx * 0.3}" cy="${cy - ry * 0.25}" r="10"/>
          ${tx(cx - rx * 0.4, cy + ry * 0.38, 'beyin', 'f46-kucuk', 'middle')}
          ${tx(cx - rx * 0.62, cy - 4, 'kan', 'f46-kucuk f46-c-k', 'end')}
          <text class="f46-t f46-kucuk f46-c-w" data-kitt x="${cx + rx * 0.3}" y="${cy - ry * 0.25 + 4}" text-anchor="middle">kitle / ödem</text>
          <text class="f46-t f46-kucuk f46-c-b" data-bost x="${cx + rx - 13}" y="${cy + 5}" text-anchor="middle">BOS</text>
          <path class="f46-okb" d="M${cx} ${cy + ry - 30} L${cx} ${ky1 - 14}" marker-end="url(#f46-ok-is)"/>
          ${d ? tx(kx0 + kw + 8, ky1 - 30, 'BOS → spinal|aralık', 'f46-kucuk f46-c-b') : tx(kx0 + kw + 10, ky1 - 34, 'BOS → spinal aralık', 'f46-kucuk f46-c-b')}
          ${tx(mx + mw / 2, 46, 'kompansasyon', 'f46-kucuk', 'middle')}
          <rect class="f46-mtrk" x="${mx}" y="${my0}" width="${mw}" height="${my1 - my0}" rx="5"/>
          <rect class="f46-mfl" data-mfl x="${mx}" y="${my0}" width="${mw}" height="${my1 - my0}" rx="5"/>
          <text class="f46-t f46-kucuk" data-mst x="${mx + mw / 2}" y="${my1 + 20}" text-anchor="middle">dolu</text>
          <text class="f46-t f46-lbl f46-c-w" data-tuk x="${d ? W / 2 : W - 6}" y="${d ? 324 : 268}" text-anchor="${d ? 'middle' : 'end'}" style="opacity:0">${d ? 'sınırlı kompansasyon tükendi (Bölüm 49)' : '<tspan>sınırlı kompansasyon tükendi</tspan><tspan x="' + (W - 6) + '" dy="18">(Bölüm 49)</tspan>'}</text>`;
        const uygula = (svg, k) => {
          const b = svg.querySelector('[data-bey]');
          b.setAttribute('rx', (rx - 26 + 21 * k).toFixed(1)); b.setAttribute('ry', (ry - 26 + 21 * k).toFixed(1));
          svg.querySelector('[data-kit]').setAttribute('r', (10 + 32 * k).toFixed(1));
          svg.querySelector('[data-kitt]').setAttribute('y', (cy - ry * 0.25 + 4 + (k > 0.35 ? 0 : 26)).toFixed(1));
          const h = (ky1 - ky0 - 6) * (0.15 + 0.85 * k), kd = svg.querySelector('[data-kd]');
          kd.setAttribute('y', (ky1 - h).toFixed(1)); kd.setAttribute('height', h.toFixed(1));
          const mf = svg.querySelector('[data-mfl]'), mh = (my1 - my0) * (1 - k);
          mf.setAttribute('y', (my1 - mh).toFixed(1)); mf.setAttribute('height', Math.max(0, mh).toFixed(1));
          mf.classList.toggle('f46-az', k > 0.6);
          svg.querySelector('[data-mst]').textContent = k > 0.97 ? 'boş' : k > 0.4 ? 'azalıyor' : 'dolu';
          svg.querySelector('[data-bost]').style.opacity = k > 0.8 ? 0 : 1;
          svg.querySelector('[data-tuk]').style.opacity = k > 0.97 ? 1 : 0;
        };
        return {
          html,
          step(dt, T, svg) { const c = T % 6; uygula(svg, ease(c / 4.5)); },
          son(svg) { uygula(svg, 0.6); },
        };
      },
      solunum(d) {
        const W = d ? 360 : 640;
        const v = d ? [10, 160] : [30, 200], bx = d ? 170 : 215, b = d ? [180, 350] : [230, 400], y0 = 40, y1 = d ? 190 : 210;
        const prot = (x, y) => `<path class="f46-prot" d="M${x} ${y} l5 -6 m-5 6 l-5 -6 m5 6 v8"/>`;
        const pP = [[0.15, 0.2], [0.45, 0.15], [0.75, 0.25], [0.25, 0.5], [0.6, 0.45], [0.85, 0.6], [0.15, 0.8], [0.45, 0.75], [0.75, 0.85], [0.35, 0.95]];
        const pB = [[0.3, 0.3], [0.7, 0.5]];
        const pxx = (r, f) => r[0] + (r[1] - r[0]) * f, pyy = (f) => y0 + 10 + (y1 - y0 - 40) * f;
        let ph, html;
        const star = (x, y, r) => { let s = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; s += `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)} `; } return `<polygon class="f46-yildiz" data-yil points="${s}"/>`; };
        const top = `<rect class="f46-damar" x="${v[0]}" y="${y0}" width="${v[1] - v[0]}" height="${y1 - y0}" rx="10"/>
          <rect class="f46-hale" x="${b[0]}" y="${y0}" width="${b[1] - b[0]}" height="${y1 - y0}" rx="10"/>
          <line class="f46-sinir" x1="${bx}" x2="${bx}" y1="${y0 - 6}" y2="${y1 + 6}"/>
          ${tx((v[0] + v[1]) / 2, 30, 'kan (plazma)', 'f46-lbl f46-c-k', 'middle')}${tx((b[0] + b[1]) / 2, 30, 'BOS', 'f46-lbl f46-c-b', 'middle')}
          ${pP.map((p) => prot(pxx(v, p[0]), pyy(p[1]))).join('')}${pB.map((p) => prot(pxx(b, p[0]), pyy(p[1]) - 6)).join('')}
          ${tx((b[0] + b[1]) / 2, y1 - 26, 'az protein →|tampon gücü düşük', 'f46-kucuk f46-c-b', 'middle')}
          ${tx(pxx(v, 0.5), y1 - 10, 'çok protein', 'f46-kucuk f46-c-k', 'middle')}
          <g data-co2>${[0, 1, 2, 3, 4, 5].map(() => '<text class="f46-t f46-co2" x="-50" y="-50" text-anchor="middle">CO₂</text>').join('')}</g>`;
        if (!d) {
          ph = { x: 445, y0: 60, y1: 200 };
          html = `${top}${tx(bx, 232, 'küçük, yağda çözünen CO₂ serbestçe geçer', 'f46-lbl', 'middle')}
            ${tx(445, 46, 'BOS pH', 'f46-kucuk', 'middle')}<line class="f46-eks" x1="445" x2="445" y1="60" y2="200"/>
            <path class="f46-isaret" data-phm d="M432 0 l10 -6 v12 Z"/>${tx(445, 218, 'pH ↓', 'f46-kucuk f46-c-w', 'middle')}
            ${star(505, 112, 15)}${tx(505, 146, 'merkezi|kemoreseptör', 'f46-kucuk', 'middle')}
            <path class="f46-oka" data-okv d="M526 112 L556 112" marker-end="url(#f46-ok-isa)"/>
            ${tx(600, 98, 'solunum|merkezi|→ V̇E ↑', 'f46-lbl', 'middle')}
            ${tx(634, 288, 'Bölüm 22', 'f46-kucuk', 'end')}`;
        } else {
          ph = { x: 0, h: true, x0: 120, x1: 24, y: 276 };
          html = `${top}${tx(bx, 212, 'küçük, yağda çözünen CO₂|serbestçe geçer', 'f46-lbl', 'middle', 17)}
            ${tx(72, 262, 'BOS pH ↓', 'f46-kucuk f46-c-w', 'middle')}<line class="f46-eks" x1="20" x2="124" y1="276" y2="276"/>
            <path class="f46-isaret" data-phm d="M0 270 l-6 -10 h12 Z"/>
            ${star(170, 276, 13)}${tx(170, 306, 'merkezi|kemoreseptör', 'f46-kucuk', 'middle')}
            <path class="f46-oka" data-okv d="M188 276 L232 276" marker-end="url(#f46-ok-isa)"/>
            ${tx(296, 270, 'solunum merkezi|→ V̇E ↑', 'f46-lbl', 'middle', 18)}
            ${tx(354, 334, 'Bölüm 22', 'f46-kucuk', 'end')}`;
        }
        const uygula = (svg, T, rm) => {
          const c = rm ? 4 : T % 6;
          const co = svg.querySelectorAll('[data-co2] text');
          co.forEach((e, i) => {
            const st = i * 0.45, f = clamp((c - st) / 2.4, 0, 1);
            const yy = pyy(0.04 + 0.11 * i) + 6;
            const xs = pxx(v, 0.2 + 0.1 * (i % 3)), xe = pxx(b, 0.25 + 0.1 * (i % 4));
            e.setAttribute('x', (xs + (xe - xs) * ease(f)).toFixed(1)); e.setAttribute('y', yy.toFixed(1));
            e.style.opacity = c < st ? 0.35 : 1;
          });
          const a = clamp((c - 1.5) / 2.5, 0, 1);
          const m = svg.querySelector('[data-phm]');
          if (ph.h) m.setAttribute('transform', `translate(${(ph.x0 + (ph.x1 - ph.x0) * a).toFixed(1)} 0)`);
          else m.setAttribute('transform', `translate(0 ${(ph.y0 + (ph.y1 - ph.y0) * a).toFixed(1)})`);
          const on = a > 0.75;
          svg.querySelector('[data-yil]').classList.toggle('f46-on', on);
          svg.querySelector('[data-okv]').style.opacity = on ? 1 : 0.25;
        };
        return { html, step(dt, T, svg) { uygula(svg, T, false); }, son(svg) { uygula(svg, 0, true); } };
      },
      glim(d) {
        const W = d ? 360 : 640, x0 = d ? 10 : 20, x1 = d ? 350 : 620;
        const ty0 = d ? 44 : 34, ty1 = d ? 262 : 252, a0 = d ? 134 : 124, a1 = d ? 168 : 160, kw = 12;
        const ust = a0 - kw, alt = a1 + kw, n = d ? 9 : 14, fw = (x1 - x0) / n;
        let feet = '', bodies = '';
        for (let i = 0; i < n; i++) {
          const cx = x0 + fw * (i + 0.5);
          feet += `<path class="f46-ayak" d="M${cx - fw * 0.44} ${ust} q0 -14 ${fw * 0.44} -14 q${fw * 0.44} 0 ${fw * 0.44} 14 Z"/><path class="f46-ayak" d="M${cx - fw * 0.44} ${alt} q0 14 ${fw * 0.44} 14 q${fw * 0.44} 0 ${fw * 0.44} -14 Z"/>`;
          if (i % 3 === 1) {
            const by = ust - 44, by2 = alt + 44;
            bodies += `<path class="f46-uzanti" d="M${cx} ${by} L${cx - fw} ${ust - 12} M${cx} ${by} L${cx} ${ust - 12} M${cx} ${by} L${cx + fw} ${ust - 12} M${cx} ${by2} L${cx - fw} ${alt + 12} M${cx} ${by2} L${cx} ${alt + 12} M${cx} ${by2} L${cx + fw} ${alt + 12}"/><circle class="f46-astro" cx="${cx}" cy="${by}" r="10"/><circle class="f46-astro" cx="${cx}" cy="${by2}" r="10"/>`;
          }
        }
        const fx = x0 + fw * 1.5;
        const html = `<rect class="f46-doku-z" x="${x0}" y="${ty0}" width="${x1 - x0}" height="${ty1 - ty0}" rx="10"/>
          <rect class="f46-hale" x="${x0}" y="${ust}" width="${x1 - x0}" height="${alt - ust}"/>
          <rect class="f46-damar" x="${x0}" y="${a0}" width="${x1 - x0}" height="${a1 - a0}"/>
          ${tx((x0 + x1) / 2, (a0 + a1) / 2 + 5, 'kan damarı', 'f46-lbl f46-c-k', 'middle')}
          ${bodies}${feet}
          <g data-atik></g><g data-bp></g>
          ${tx(x0, d ? 18 : 22, 'astrosit ayaksı uzantısı (glia)', 'f46-kucuk')}<line class="f46-lead" x1="${x0 + 20}" y1="${d ? 22 : 26}" x2="${fx}" y2="${ust - 8}"/>
          ${tx(x1, d ? 36 : 22, 'paravasküler kanal', 'f46-kucuk f46-c-b', 'end')}<line class="f46-lead" x1="${x1 - 30}" y1="${d ? 40 : 26}" x2="${x1 - fw * 1.2}" y2="${ust + 6}"/>
          ${tx(x0 + fw * 3.2, ty1 - 8, 'atık', 'f46-kucuk', 'middle')}
          ${d ? tx(W / 2, 296, 'beyinde lenfatik yok →|glia + lenfatik = glimfatik', 'f46-lbl f46-vurgu', 'middle', 18) : tx(W / 2, 284, 'beyinde lenfatik yok → glia + lenfatik = glimfatik', 'f46-lbl f46-vurgu', 'middle')}`;
        /* atık: dokudan kanala, sonra akışla sağa */
        const A = [];
        const yeniA = (a, ilk) => {
          a.x = x0 + 10 + Math.random() * (x1 - x0 - 60); a.top = Math.random() < 0.5;
          a.y0 = a.top ? ty0 + 8 + Math.random() * (ust - 40 - ty0) : alt + 30 + Math.random() * (ty1 - alt - 40);
          a.t = ilk ? -Math.random() * 3 : -Math.random(); a.y = a.y0;
        };
        const B = [];
        return {
          html,
          kur(svg) {
            const g = svg.querySelector('[data-atik]'), gb = svg.querySelector('[data-bp]');
            let h = ''; for (let i = 0; i < 12; i++) h += '<circle class="f46-atik" r="3"/>'; g.innerHTML = h;
            let hb = ''; for (let i = 0; i < 16; i++) hb += '<circle class="f46-par" r="2.6"/>'; gb.innerHTML = hb;
            g.querySelectorAll('circle').forEach((c) => { const a = { c }; yeniA(a, true); A.push(a); });
            gb.querySelectorAll('circle').forEach((c, i) => { B.push({ c, x: x0 + (x1 - x0) * (i / 8 % 1), y: i % 2 ? ust + 6 : alt - 6 }); });
            this.cizA();
          },
          cizA() {
            A.forEach((a) => { a.c.setAttribute('cx', a.x.toFixed(1)); a.c.setAttribute('cy', a.y.toFixed(1)); a.c.style.opacity = a.t < 0 ? 0.55 : 1; });
            B.forEach((b) => { b.c.setAttribute('cx', b.x.toFixed(1)); b.c.setAttribute('cy', b.y.toFixed(1)); });
          },
          step(dt) {
            B.forEach((b) => { b.x += 55 * dt; if (b.x > x1 - 3) b.x = x0 + 3; });
            A.forEach((a) => {
              a.t += dt;
              if (a.t < 0) return;
              const ky = a.top ? ust + 6 : alt - 6;
              if (a.t < 1.6) a.y = a.y0 + (ky - a.y0) * ease(a.t / 1.6);
              else { a.y = ky; a.x += 55 * dt; if (a.x > x1 - 4) yeniA(a, false); }
            });
            this.cizA();
          },
          son() {
            A.forEach((a, i) => { if (i % 3 === 0) { a.y = a.top ? ust + 6 : alt - 6; } a.t = 1; });
            this.cizA();
          },
        };
      },
    };

    const ciz = () => {
      const W = dar ? 360 : 640, H = dar ? 340 : 300;
      sahne = sahneler[sec](dar);
      kap.innerHTML = `<svg class="f46-svg${dar ? ' f46-n' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="BOS işlevi: ${SEC.find((s) => s[0] === sec)[1]}">
        <defs>${okDef('f46-ok-is', 'f46-mk-b')}${okDef('f46-ok-isa', 'f46-mk-a')}</defs><g class="f46-sahne">${sahne.html}</g></svg>`;
      const svg = kap.querySelector('svg');
      if (sahne.kur) sahne.kur(svg);
      if (RM) { if (sahne.son) sahne.son(svg); } else if (sahne.step) sahne.step(0, t, svg);
    };
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    el.querySelectorAll('[data-is]').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.is === sec && kap.querySelector('svg')) { capYaz(el, CAP[sec]); return; }
      sec = b.dataset.is; basSec(el, 'is', sec); capYaz(el, CAP[sec]);
      const g = kap.querySelector('.f46-sahne');
      clearTimeout(tmr);
      if (RM || !g) { t = 0; ciz(); return; }
      g.style.opacity = 0;
      tmr = setTimeout(() => { t = 0; ciz(); const g2 = kap.querySelector('.f46-sahne'); g2.style.opacity = 0; requestAnimationFrame(() => { g2.style.opacity = 1; }); }, 150);
    }));
    const durT = RM ? () => {} : ticker(el, (dt) => {
      t += dt;
      const svg = kap.querySelector('svg');
      if (svg && sahne && sahne.step) sahne.step(dt, t, svg);
    });
    return () => { durT(); durD(); clearTimeout(tmr); };
  };

  /* =====================================================================
     2 · f46_akim — lateral ventrikülden subaraknoid aralığa (K1 s. 198)
     ===================================================================== */
  VIZ.f46_akim = (el) => {
    const CAP = [
      '<b>1 · Yapım.</b> İki lateral, üçüncü ve dördüncü ventriküldeki koroid pleksus BOS\'u 0,3 mL/dk (≈ 500 mL/gün) hızla üretir. Akışı adım adım izleyin. [[K1 s. 198]]',
      '<b>2 · Monro foramenleri.</b> BOS iki lateral ventrikülden iki Monro foramenini geçip sağ ve sol talamus arasındaki üçüncü ventriküle akar. Sillerin hareketi BOS\'u ventriküllerde ilerletir. [[K1 s. 198]]',
      '<b>3 · Sylvius akuaduktu.</b> Üçüncü ventrikülden çıkan BOS, orta beyindeki dar akuaduktustan dördüncü ventriküle geçer. [[K1 s. 198]]',
      '<b>4 · Dördüncü ventrikül.</b> BOS beyin sapının arkasındaki dördüncü ventrikülde toplanır. [[K1 s. 198]]',
      '<b>5 · Luschka ve Magendie.</b> BOS iki lateral Luschka foramenleri ve orta hattaki Magendie forameniyle subaraknoid aralığa çıkar. Akılda tutma: lateral = Luschka, orta hat = Magendie. [[K1 s. 198]]',
      '<b>6 · Subaraknoid aralık.</b> BOS\'un çoğu serebral hemisferlerin çevresinde, kalanı omuriliğin çevresinde dolaşır. [[K1 s. 198]]',
      '<b>7 · Hacim.</b> Toplam BOS 100–150 mL\'dir: yaklaşık yarısı ventriküllerde, yarısı subaraknoid aralıktadır. Emilim için bir sonraki şekle bakın. [[K1 s. 198]]',
    ];
    /* her adım: yollar [nokta dizisi, parçacık sayısı, kesik?], vurgulanan yapılar, etiketler */
    const ADIM = [
      { y: [[P.lat, 6]], v: ['px'], e: ['lat'] },
      { y: [[cat(P.lat, P.mon, P.uc), 9]], v: ['lat', 'mon', 'uc'], e: ['lat', 'mon', 'uc'] },
      { y: [[cat(P.uc.slice(2), P.aq), 4]], v: ['aq'], e: ['aq'] },
      { y: [[P.dort, 4]], v: ['dort'], e: ['dort'] },
      { y: [[P.mag, 3], [P.lus, 3, true]], v: ['cik'], e: ['lus', 'mag'] },
      { y: [[P.up, 9], [P.down, 2], [P.down2, 1]], v: ['sa'], e: ['sa', 'omur'] },
      { y: [[P.up, 5], [P.lat, 3]], v: ['lat', 'mon', 'uc', 'aq', 'dort', 'sa'], e: ['lat', 'sa'] },
    ];
    const ETK = [
      { id: 'sinus', p: [252, 2], w: ['r', 22, 'üst sagittal sinüs'], n: [14, 'sinüs'] },
      { id: 'gran', p: [236, 10], w: ['r', 46, 'araknoid|granülasyonlar'], n: [34, 'granülasyon'] },
      { id: 'sa', p: [322, 150], w: ['r', 104, 'subaraknoid|aralık'], n: [58, 'subaraknoid'] },
      { id: 'lat', p: [244, 112], w: ['r', 148, 'lateral|ventriküller (2)'], n: [80, 'lateral v.'] },
      { id: 'mon', p: [139, 131], w: ['l', 112, 'Monro|foramenleri'], n: [106, 'Monro'] },
      { id: 'uc', p: [150, 158], w: ['l', 164, 'üçüncü ventrikül|(talamuslar|arasında)'], n: [128, '3. v.'] },
      { id: 'aq', p: [182, 201], w: ['r', 196, 'Sylvius akuaduktu|(orta beyin)'], n: [150, 'Sylvius'] },
      { id: 'dort', p: [206, 238], w: ['r', 240, 'dördüncü|ventrikül'], n: [172, '4. v.'] },
      { id: 'lus', p: [168, 252], w: ['l', 240, 'Luschka|(2, lateral)'], n: [194, 'Luschka'] },
      { id: 'mag', p: [212, 288], w: ['r', 284, 'Magendie|(orta hat)'], n: [216, 'Magendie'] },
      { id: 'cbl', p: [282, 262], n: [238, 'serebellum'] },
      { id: 'omur', p: [183, 340], w: ['r', 340, 'omurilik'], n: [262, 'omurilik'] },
    ];
    const NOKTA = [[262, 148], [122, 150], [200, 198], [224, 240], [232, 306], [322, 118], [72, 132]];
    let adim = 0, oyn = false, dar = false, acc = 0, parcalar = [], svg = null;
    el.innerHTML = `<div class="btn-row f46-kont">
        <button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">◀ Geri</button>
        <button type="button" class="btn" data-a="oyn" aria-pressed="false">Oynat</button>
        <button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">İleri ▶</button>
        <span class="f46-adim" aria-live="polite">Adım 1/7</span></div>
      <div class="f46-akim-kap"></div>
      <div class="f46-bilgi">
        <dl class="kv"><dt>Yapım</dt><dd>0,3 mL/dk ≈ 500 mL/gün</dd><dt>Toplam</dt><dd>100–150 mL</dd></dl>
        <div class="f46-hacim" aria-label="Hacmin dağılımı: yarısı ventriküllerde, yarısı subaraknoid aralıkta"><span><i></i><b>≈ ½ ventriküller</b></span><span><i></i><b>≈ ½ subaraknoid aralık</b></span></div>
      </div>`;
    const kap = el.querySelector('.f46-akim-kap');
    const bilgi = el.querySelector('.f46-bilgi');
    const ciz = () => {
      const L = dar ? DUZ.dar : DUZ.gen;
      const bub = dar ? { x: 2, y: 192, w: 122, h: 134 } : { x: 4, y: 282, w: 300, h: 94 };
      let cells = '';
      const cx0 = dar ? 9 : 16, cy0 = dar ? 262 : 330, cw = dar ? 22 : 26, nC = 5;
      for (let i = 0; i < nC; i++) {
        const x = cx0 + i * cw;
        cells += `<rect class="f46-epen" x="${x}" y="${cy0}" width="${cw - 2}" height="18" rx="2"/><circle class="f46-cek" cx="${x + cw / 2 - 1}" cy="${cy0 + 9}" r="3"/>`;
        for (let j = 0; j < 3; j++) cells += `<path class="f46-sil" data-sil="${i * 3 + j}" d="M${x + 4 + j * 7} ${cy0} l0 -9"/>`;
      }
      const bubTxt = dar ? tx(8, 210, 'koroid pleksus =|değişmiş silli|ependim', 'f46-kucuk', 'start', 15) + tx(8, 302, 'filtrasyon +|aktif salgı', 'f46-kucuk', 'start', 15)
        : tx(160, 302, 'koroid pleksus =|değişmiş silli|ependim hücreleri:|filtrasyon +|aktif salgı', 'f46-kucuk', 'start', 17);
      const pxG = gp(L, PX.lat[0]);
      kap.innerHTML = `<svg class="f46-svg${dar ? ' f46-n' : ''}" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Sagittal kesitte BOS dolaşım yolu; adım adım">
        <defs>${okDef('f46-ok-ak', 'f46-mk-a')}</defs>
        ${beyinHtml(L)}
        ${dar ? '' : tx(L.ox + 258 * L.s, L.oy + 266 * L.s, 'serebellum', 'f46-kucuk', 'middle')}
        <g data-iz></g><g data-yolok></g>
        ${etiketHtml(ETK, L, dar)}
        <g data-par></g>
        ${NOKTA.map((p, i) => { const [x, y] = gp(L, p); return `<g class="f46-no" data-no="${i}" role="button" tabindex="0" aria-label="Adım ${i + 1}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11"/><text class="f46-t" x="${x.toFixed(1)}" y="${(y + 4.5).toFixed(1)}" text-anchor="middle">${i + 1}</text></g>`; }).join('')}
        <g class="f46-bub" data-bub>
          <line class="f46-lead f46-lead-a" x1="${dar ? 100 : 250}" y1="${dar ? 192 : 282}" x2="${pxG[0]}" y2="${pxG[1]}"/>
          <rect class="f46-bub-r" x="${bub.x}" y="${bub.y}" width="${bub.w}" height="${bub.h}" rx="10"/>
          ${cells}${dar ? '' : ''}${bubTxt}
          <path class="f46-okb" d="M${cx0 + cw * 2.5} ${cy0 + 32} L${cx0 + cw * 2.5} ${cy0 + 22}" style="display:none"/>
        </g>
      </svg>`;
      svg = kap.querySelector('svg');
      svg.querySelectorAll('[data-no]').forEach((g) => {
        const go = () => { git(+g.dataset.no); };
        g.addEventListener('click', go);
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      });
      guncelle();
    };
    const guncelle = () => {
      if (!svg) return;
      const L = dar ? DUZ.dar : DUZ.gen, A = ADIM[adim];
      el.querySelector('.f46-adim').textContent = `Adım ${adim + 1}/7`;
      svg.querySelectorAll('[data-vk]').forEach((p) => p.classList.toggle('f46-on', A.v.includes(p.dataset.vk)));
      svg.querySelector('[data-sa]').classList.toggle('f46-on', A.v.includes('sa'));
      svg.querySelectorAll('[data-px]').forEach((g) => g.classList.toggle('f46-yan', adim === 0));
      svg.querySelectorAll('[data-e]').forEach((g) => g.classList.toggle('f46-on', A.e.includes(g.dataset.e)));
      svg.querySelectorAll('[data-no]').forEach((g) => { g.classList.toggle('f46-on', +g.dataset.no === adim); g.setAttribute('aria-pressed', String(+g.dataset.no === adim)); });
      svg.querySelector('[data-bub]').classList.toggle('f46-gor', adim === 0);
      /* geçilen yollar soluk iz */
      let iz = '';
      for (let i = 1; i < adim; i++) ADIM[i].y.forEach((y) => { if (i < 6) iz += `<path class="f46-iz${y[2] ? ' f46-kesik' : ''}" d="${dYol(y[0].map((p) => gp(L, p)))}"/>`; });
      svg.querySelector('[data-iz]').innerHTML = iz;
      svg.querySelector('[data-yolok]').innerHTML = A.y.map((y) => `<path class="f46-yol${y[2] ? ' f46-kesik' : ''}" d="${dYol(y[0].map((p) => gp(L, p)))}" marker-end="url(#f46-ok-ak)"/>`).join('');
      /* parçacıklar */
      const gpar = svg.querySelector('[data-par]'); gpar.innerHTML = '';
      parcalar = [];
      if (!RM) A.y.forEach((y) => {
        const yy = yol(y[0].map((p) => gp(L, p)));
        const cs = havuz(gpar, y[1]);
        cs.forEach((c, i) => parcalar.push({ c, yy, f: i / y[1] }));
      });
      konumla(0);
      bilgi.classList.toggle('f46-vur', adim >= 5);
      bilgi.classList.toggle('f46-dol', adim === 6);
    };
    const konumla = (dt) => {
      parcalar.forEach((p) => {
        p.f = (p.f + dt * 55 / p.yy.top) % 1;
        const [x, y] = p.yy.at(p.f * p.yy.top);
        p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1));
        p.c.style.opacity = p.f < 0.08 ? p.f / 0.08 : p.f > 0.92 ? (1 - p.f) / 0.08 : 1;
      });
    };
    const oynBtn = el.querySelector('[data-a=oyn]');
    const oynAyar = (v) => { oyn = v; oynBtn.textContent = v ? 'Duraklat' : 'Oynat'; oynBtn.setAttribute('aria-pressed', String(v)); acc = 0; };
    const git = (i) => { adim = clamp(i, 0, 6); capYaz(el, CAP[adim]); guncelle(); if (adim === 6) oynAyar(false); };
    el.querySelector('[data-a=geri]').addEventListener('click', () => { oynAyar(false); git(adim - 1); });
    el.querySelector('[data-a=ileri]').addEventListener('click', () => { oynAyar(false); git(adim + 1); });
    oynBtn.addEventListener('click', () => {
      if (oyn) { oynAyar(false); return; }
      if (adim === 6) git(0);
      oynAyar(true);
    });
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    let st = 0;
    const durT = ticker(el, (dt) => {
      if (oyn) { acc += dt; if (acc >= 3) { acc = 0; git(adim + 1); } }
      if (RM) return;
      konumla(dt);
      st += dt;
      if (adim === 0 && svg) svg.querySelectorAll('[data-sil]').forEach((s, i) => s.setAttribute('transform', `rotate(${(Math.sin(st * 6 - i * 0.6) * 14).toFixed(1)} ${s.getAttribute('d').split(' ')[0].slice(1)} ${s.getAttribute('d').split(' ')[1]})`));
    });
    return () => { durT(); durD(); };
  };

  /* =====================================================================
     3 · f46_emilim — araknoid villus: emilimi süren iki fark (K1 s. 199)
     ===================================================================== */
  VIZ.f46_emilim = (el) => {
    const VEN = 8;
    let P0 = 15, dar = false, svg = null, acc = 0, par = [], G = null;
    el.innerHTML = `<div class="f46-emilim-kap"></div>
      <div class="f46-kont f46-kay">
        <label class="f46-kay-l" for="f46-pbos">BOS basıncı <b data-pv>15</b> cmH₂O</label>
        <input type="range" id="f46-pbos" class="f46-range" min="5" max="40" step="1" value="15" aria-label="BOS basıncı, cmH₂O">
        <div class="btn-row"><button type="button" class="btn ghost" data-p="15" aria-pressed="true">Normal (15)</button><button type="button" class="btn ghost" data-p="30" aria-pressed="false">Travmatik beyin hasarı (30)</button></div>
      </div>`;
    const kap = el.querySelector('.f46-emilim-kap'), rng = el.querySelector('#f46-pbos');
    const hiz = () => 0.1 + 0.9 * clamp((P0 - VEN) / 32, 0, 1);
    const ciz = () => {
      const d = dar;
      G = d ? { W: 360, H: 410, sx0: 6, sx1: 354, s0: 16, s1: 86, d1: 94, a1: 222, vx: 92, cy: 56, crx: 48, cry: 24, hx: 26, ox: 54, tx: 158, sinY: 40 }
        : { W: 640, H: 330, sx0: 10, sx1: 440, s0: 20, s1: 96, d1: 106, a1: 250, vx: 140, cy: 64, crx: 52, cry: 28, hx: 50, ox: 88, tx: 220, sinY: 48 };
      const g = G;
      const stem = `M${g.vx - 18} ${g.s1} L${g.vx - 18} ${g.cy + g.cry - 6} M${g.vx + 18} ${g.s1} L${g.vx + 18} ${g.cy + g.cry - 6}`;
      const vil = `M${g.vx - 30} ${g.d1 + 18} C${g.vx - 20} ${g.d1 + 6} ${g.vx - 18} ${g.d1} ${g.vx - 18} ${g.s1 - 4} L${g.vx - 18} ${g.cy + g.cry - 8} C${g.vx - g.crx - 6} ${g.cy + g.cry} ${g.vx - g.crx} ${g.cy - g.cry} ${g.vx} ${g.cy - g.cry} C${g.vx + g.crx} ${g.cy - g.cry} ${g.vx + g.crx + 6} ${g.cy + g.cry} ${g.vx + 18} ${g.cy + g.cry - 8} L${g.vx + 18} ${g.s1 - 4} C${g.vx + 18} ${g.d1} ${g.vx + 20} ${g.d1 + 6} ${g.vx + 30} ${g.d1 + 18} Z`;
      const sag = d ? `
          ${tx(20, 286, 'emilim hızı (şematik)', 'f46-kucuk')}
          <rect class="f46-mtrk" x="20" y="294" width="320" height="16" rx="6"/><rect class="f46-mfl-b" data-em x="20" y="294" width="0" height="16" rx="6"/>
          <rect class="f46-p90" x="20" y="336" width="288" height="16" rx="4"/><rect class="f46-p10" x="310" y="336" width="30" height="16" rx="4"/>
          ${tx(164, 348, '%90', 'f46-kucuk f46-on-dk', 'middle')}
          ${tx(20, 374, '%90 kafa içi (sagittal ve sigmoid sinüsler)', 'f46-kucuk')}${tx(20, 394, '%10 spinal araknoid villuslar', 'f46-kucuk')}`
        : `
          ${tx(540, 30, 'emilim hızı', 'f46-kucuk', 'middle')}${tx(540, 46, '(şematik)', 'f46-kucuk', 'middle')}
          <rect class="f46-mtrk" x="520" y="56" width="40" height="176" rx="6"/><rect class="f46-mfl-b" data-em x="520" y="232" width="40" height="0" rx="6"/>
          <rect class="f46-p90" x="470" y="254" width="144" height="18" rx="4"/><rect class="f46-p10" x="616" y="254" width="16" height="18" rx="4"/>
          ${tx(542, 267, '%90', 'f46-kucuk f46-on-dk', 'middle')}
          ${tx(470, 292, '%90 kafa içi sinüsler', 'f46-kucuk')}${tx(470, 308, '(sagittal, sigmoid)', 'f46-kucuk')}${tx(470, 326, '%10 spinal villuslar', 'f46-kucuk')}`;
      kap.innerHTML = `<svg class="f46-svg${d ? ' f46-n' : ''}" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Araknoid villus; BOS basıncı ile emilim">
        <defs>${okDef('f46-ok-hb', 'f46-mk-b')}${okDef('f46-ok-hk', 'f46-mk-k')}${okDef('f46-ok-hv', 'f46-mk-b')}</defs>
        <rect class="f46-damar" x="${g.sx0}" y="${g.s0}" width="${g.sx1 - g.sx0}" height="${g.s1 - g.s0}" rx="8"/>
        <rect class="f46-dura" x="${g.sx0}" y="${g.s1}" width="${g.sx1 - g.sx0}" height="${g.d1 - g.s1}"/>
        <rect class="f46-hale" x="${g.sx0}" y="${g.d1}" width="${g.sx1 - g.sx0}" height="${g.a1 - g.d1}" rx="8"/>
        <path class="f46-villus" d="${vil}"/>
        ${tx(g.tx, g.sinY, 'dural venöz sinüs|venöz kan ≈ 8 cmH₂O', 'f46-kucuk f46-c-k', 'start', 18)}
        ${tx(g.sx1 - 6, g.d1 + 18, 'dura', 'f46-kucuk', 'end')}
        ${tx(g.tx, g.d1 + 42, 'araknoid granülasyon|(villus)', 'f46-kucuk f46-c-b', 'start', 16)}<line class="f46-lead" x1="${g.tx - 4}" y1="${g.d1 + 38}" x2="${g.vx + g.crx * 0.7}" y2="${g.cy + 10}"/>
        <text class="f46-t f46-kucuk f46-c-b" data-sat x="${g.tx}" y="${g.a1 - 14}">subaraknoid aralık (BOS 15 cmH₂O)</text>
        <path class="f46-okh" data-okh d="M${g.hx} ${g.a1 - 10} L${g.hx} ${g.a1 - 60}" marker-end="url(#f46-ok-hb)"/>
        <path class="f46-okk" d="M${g.ox} ${g.d1 + 58} L${g.ox} ${g.s1 - 18}" marker-end="url(#f46-ok-hk)"/>
        <path class="f46-okv" data-okv d="M${g.vx} ${g.d1 + 14} L${g.vx} ${g.cy - 4}" marker-end="url(#f46-ok-hv)"/>
        <g data-par></g>
        <text class="f46-t f46-kucuk f46-c-b" data-hl x="${d ? 6 : 16}" y="${d ? 246 : 274}">▲ hidrostatik fark: 15 − 8 = 7 cmH₂O</text>
        ${tx(d ? 6 : 16, d ? 266 : 296, '▲ onkotik fark: plazma 25 − BOS ≈ 0 mmHg', 'f46-kucuk f46-c-k')}
        ${sag}
      </svg>`;
      svg = kap.querySelector('svg');
      par = [];
      if (!RM) havuz(svg.querySelector('[data-par]'), 40).forEach((c) => par.push({ c, on: false }));
      uygula();
    };
    const uygula = () => {
      el.querySelector('[data-pv]').textContent = P0;
      el.querySelectorAll('[data-p]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.p === P0)));
      if (!svg) return;
      const g = G, fark = P0 - VEN, r = hiz();
      const okh = svg.querySelector('[data-okh]');
      if (fark > 0) { okh.style.display = ''; okh.setAttribute('d', `M${g.hx} ${g.a1 - 10} L${g.hx} ${(g.a1 - 10 - 14 - fark * (dar ? 4.6 : 5.2)).toFixed(1)}`); }
      else okh.style.display = 'none';
      svg.querySelector('[data-hl]').textContent = fark > 0 ? `▲ hidrostatik fark: ${P0} − 8 = ${fark} cmH₂O` : 'hidrostatik fark yok';
      svg.querySelector('[data-sat]').textContent = `subaraknoid aralık (BOS ${P0} cmH₂O)`;
      const em = svg.querySelector('[data-em]');
      if (dar) em.setAttribute('width', (320 * r).toFixed(1));
      else { em.setAttribute('y', (232 - 176 * r).toFixed(1)); em.setAttribute('height', (176 * r).toFixed(1)); }
      const okv = svg.querySelector('[data-okv]');
      okv.style.display = RM ? '' : 'none';
      okv.style.strokeWidth = (2 + 10 * r).toFixed(1);
      const metin = (P0 >= 13 && P0 <= 17)
        ? `<b>Normal.</b> BOS ≈ ${P0} cmH₂O, venöz kan ≈ 8 cmH₂O; plazma onkotik basıncı ≈ 25 mmHg, BOS'unki pratikte 0. İki fark da sıvıyı sinüse çeker. BOS basıncını değiştirin. [[K1 s. 199]]`
        : P0 >= 18 ? `<b>BOS basıncı ${P0} cmH₂O.</b> Hidrostatik fark ${fark} cmH₂O'ya çıktı; emilim artar. Travmatik beyin hasarı sonrası olan budur (Bölüm 49). [[K1 s. 199]]`
          : P0 >= 9 ? `<b>BOS basıncı ${P0} cmH₂O.</b> BOS ile venöz kan arasındaki fark küçüldü (${fark} cmH₂O); emilim azalır. [[K1 s. 199]]`
            : `<b>BOS basıncı ${P0} cmH₂O.</b> BOS venöz basıncı geçmiyor; hidrostatik sürücü kalmadı. Emilim basınç farkına bağlıdır. [[K1 s. 199]]`;
      return metin;
    };
    const ayarla = (v) => { P0 = clamp(Math.round(v), 5, 40); rng.value = P0; capYaz(el, uygula()); };
    rng.addEventListener('input', () => ayarla(+rng.value));
    el.querySelectorAll('[data-p]').forEach((b) => b.addEventListener('click', () => ayarla(+b.dataset.p)));
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (!svg || !G) return;
      const g = G;
      acc += dt * (1 + 13 * hiz());
      while (acc >= 1) {
        acc -= 1;
        const p = par.find((q) => !q.on);
        if (p) {
          const sx = g.sx0 + 20 + Math.random() * (g.sx1 - g.sx0 - 60);
          p.yy = yol([[sx, g.a1 - 30 - Math.random() * 40], [g.vx + (Math.random() - 0.5) * 16, g.d1 + 10], [g.vx + (Math.random() - 0.5) * 14, g.cy + 4], [g.vx + g.crx + 14, g.cy - 10 + Math.random() * 16], [g.sx1 - 10, g.cy - 14 + Math.random() * 30]]);
          p.s = 0; p.on = true;
        }
      }
      par.forEach((p) => {
        if (!p.on) { p.c.setAttribute('cx', -20); return; }
        p.s += dt * 75;
        if (p.s >= p.yy.top) { p.on = false; p.c.setAttribute('cx', -20); return; }
        const [x, y] = p.yy.at(p.s);
        p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1));
        p.c.style.opacity = p.s > p.yy.top - 40 ? (p.yy.top - p.s) / 40 : 1;
      });
    });
    return () => { durT(); durD(); };
  };

  /* =====================================================================
     4 · f46_bilesim — BOS ve plazma yan yana (Tablo 46.1, K1 s. 199)
     ===================================================================== */
  VIZ.f46_bilesim = (el) => {
    const lg = (v, a, b) => clamp((Math.log10(Math.max(v, a)) - Math.log10(a)) / (Math.log10(b) - Math.log10(a)), 0, 1);
    /* [ad, birim/not, bos, plazma, bosAralik, plazmaAralik, ölçek, fark, metinBOS, metinPl, açıklama] */
    const R = [
      ['Na⁺', 'mmol/L', 140, 140, null, null, (v) => v / 140, '=', '140', '140', '<b>Na⁺.</b> BOS\'ta da plazmada da ≈ 140 mmol/L. [[K1 s. 199]]'],
      ['Glukoz', 'mmol/L', 4, 6, null, null, (v) => v / 6, '↓', '4', '6', '<b>Glukoz.</b> BOS ≈ 4, plazma ≈ 6 mmol/L: BOS\'ta daha düşük. [[K1 s. 199]]'],
      ['Cl⁻', 'mmol/L', 120, 110, null, null, (v) => v / 120, '↑', '120', '110', '<b>Cl⁻.</b> BOS ≈ 120, plazma ≈ 110 mmol/L: BOS\'ta daha yüksek. [[K1 s. 199]]'],
      ['HCO₃⁻', 'mmol/L', 24, 24, null, null, (v) => v / 24, '=', '24', '24', '<b>HCO₃⁻.</b> İkisinde de ≈ 24 mmol/L. [[K1 s. 199]]'],
      ['pH', 'eksen 7,0\'dan', 7.32, 7.4, null, null, (v) => (v - 7) / 0.4, '↓', '7,32', '7,4', '<b>pH.</b> BOS 7,32, plazma 7,4: BOS biraz daha asidiktir. Tampon gücü düşük olduğu için PCO₂ değişikliklerine çok duyarlıdır. [[K1 s. 198–199]]'],
      ['Protein', 'g/L · log', 0.3, 70, [0.2, 0.4], null, (v) => lg(v, 0.1, 100), '↓↓', '0,2–0,4', '70', '<b>Protein.</b> BOS 0,2–0,4 g/L, plazma 70 g/L. Bu yüzden BOS\'un onkotik basıncı çok düşük, tampon gücü azdır. [[K1 s. 199]]'],
      ['Lökosit', 'hücre/mm³ · log', 2.5, 7500, [0, 5], [4000, 11000], (v) => lg(v, 1, 20000), '↓↓', '0–5', '4000–11.000', '<b>Lökosit.</b> BOS\'ta 0–5, kanda 4000–11.000 hücre/mm³: BOS\'ta hücresel öğe neredeyse yoktur. [[K1 s. 199]]'],
    ];
    let sec = 0, dar = false, svg = null, kk = 1, durTw = () => {};
    el.innerHTML = `<div class="legend f46-leg"><span><i style="background:var(--c-basic)"></i>BOS</span><span><i style="background:var(--crit)"></i>plazma (lökositte kan)</span><span><b class="f46-c-w">↓</b> BOS'ta düşük</span><span><b class="f46-c-c">↑</b> BOS'ta yüksek</span><span><b>=</b> eşit</span></div>
      <div class="f46-bil-kap"></div>
      <div class="f46-notlar"><div class="f46-not" data-not>az protein → onkotik basınç ≈ 0</div><div class="f46-not" data-not>az protein → tampon gücü ↓ → pH PCO₂'ye duyarlı</div></div>`;
    const kap = el.querySelector('.f46-bil-kap');
    const ciz = () => {
      const d = dar, W = d ? 360 : 640, rh = d ? 64 : 40, top = d ? 4 : 6, H = top + rh * 7 + 4;
      const bx0 = d ? 10 : 170, bw = d ? 236 : 300, vx = d ? 252 : 484, sx = d ? 346 : 626;
      let h = '';
      R.forEach((r, i) => {
        const y = top + i * rh, yb = d ? y + 24 : y + 6, yp = yb + 13;
        const sym = r[7] === '=' ? 'f46-c-m' : r[7] === '↑' ? 'f46-c-c' : 'f46-c-w';
        const bys = (v, rng, yy, cls, idx) => {
          const w = bw * clamp(r[6](v), 0, 1);
          let s = `<rect class="${cls}" data-w="${w.toFixed(1)}" x="${bx0}" y="${yy}" width="${w.toFixed(1)}" height="10" rx="3"/>`;
          if (rng) { const a = bx0 + bw * clamp(r[6](rng[0]), 0, 1), b = bx0 + bw * clamp(r[6](rng[1]), 0, 1); s += `<path class="f46-biyik" data-bi="${idx}" d="M${a.toFixed(1)} ${yy + 5} H${b.toFixed(1)} M${a.toFixed(1)} ${yy} v10 M${b.toFixed(1)} ${yy} v10"/>`; }
          return s;
        };
        h += `<g class="f46-satir" data-r="${i}" role="button" tabindex="0" aria-pressed="${String(i === sec)}" aria-label="${r[0]}: BOS ${r[8]}, plazma ${r[9]} ${r[1]}">
          <rect class="f46-sat-z" x="2" y="${y}" width="${W - 4}" height="${rh - 4}" rx="6"/>
          ${d ? tx(10, y + 17, `<tspan class="f46-b">${r[0]}</tspan> · ${r[1]}`, 'f46-kucuk') : tx(12, y + 17, r[0], 'f46-lbl f46-b') + tx(12, y + 32, r[1], 'f46-kucuk')}
          <rect class="f46-cub-z" x="${bx0}" y="${yb}" width="${bw}" height="10" rx="3"/><rect class="f46-cub-z" x="${bx0}" y="${yp}" width="${bw}" height="10" rx="3"/>
          ${bys(r[2], r[4], yb, 'f46-bar-b', 0)}${bys(r[3], r[5], yp, 'f46-bar-k', 1)}
          ${tx(vx, yb + 10, r[8], 'f46-kucuk f46-c-b f46-deg')}${tx(vx, yp + 10, r[9], 'f46-kucuk f46-c-k f46-deg')}
          ${tx(sx, d ? y + 17 : y + 23, r[7], 'f46-big ' + sym, 'end')}
        </g>`;
      });
      kap.innerHTML = `<svg class="f46-svg${d ? ' f46-n' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="BOS ve plazma bileşimi, yedi bileşen">${h}</svg>`;
      svg = kap.querySelector('svg');
      svg.querySelectorAll('[data-r]').forEach((g) => {
        const s = () => sec !== +g.dataset.r && sec_(+g.dataset.r);
        g.addEventListener('click', () => sec_(+g.dataset.r));
        g.addEventListener('mouseenter', s);
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec_(+g.dataset.r); } });
      });
      boy(kk); vurgula();
    };
    const boy = (k) => { if (!svg) return; svg.querySelectorAll('[data-w]').forEach((b) => b.setAttribute('width', (+b.dataset.w * k).toFixed(1))); svg.querySelectorAll('.f46-biyik').forEach((b) => { b.style.opacity = k; }); };
    const vurgula = () => {
      if (svg) svg.querySelectorAll('[data-r]').forEach((g) => { const on = +g.dataset.r === sec; g.classList.toggle('f46-on', on); g.setAttribute('aria-pressed', String(on)); });
      el.querySelectorAll('[data-not]').forEach((n) => n.classList.toggle('f46-on', sec === 5));
    };
    const sec_ = (i) => { sec = i; vurgula(); capYaz(el, R[i][10]); };
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    /* açılışta çubuklar soldan büyür (bileşen görünür olunca) */
    let io = null;
    if (!RM && 'IntersectionObserver' in window) {
      kk = 0; boy(0);
      io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); io = null; durTw = tween(600, (k) => { kk = k; boy(k); }); } });
      io.observe(el);
    }
    return () => { durD(); durTw(); if (io) io.disconnect(); };
  };

  /* =====================================================================
     5 · f46_hidro — tıkanıklık yeri, genişleyen ventriküller, tedavi (K1 s. 199)
     ===================================================================== */
  VIZ.f46_hidro = (el) => {
    const YER = [['yok', 'Tıkanıklık yok'], ['monro', 'Monro'], ['sylvius', 'Sylvius'], ['cikis', '4. ventrikül çıkışları'], ['gran', 'Granülasyonlar']];
    const TED = [['yok', 'Yok'], ['evd', 'EVD'], ['sant', 'Şant'], ['etv', 'ETV']];
    const GEN = { yok: { lat: 0.6, uc: 0.6, dort: 0.6, sa: 0.6 }, monro: { lat: 1 }, sylvius: { lat: 1, uc: 1 }, cikis: { lat: 1, uc: 1, dort: 1 }, gran: { lat: 1, uc: 1, dort: 1, sa: 1 } };
    const NEDEN = {
      yok: 'aşırı üretim (nadir): koroid pleksus papillomu', monro: 'tümör basısı', sylvius: 'konjenital darlık · subaraknoid kanama · tümör basısı',
      cikis: 'subaraknoid kanama · kronik menenjit · Arnold–Chiari tip II (konjenital)', gran: 'subaraknoid kanama pıhtıları emilimi engeller',
    };
    const YCAP = {
      yok: '<b>Tıkanıklık yok.</b> Dolaşım ve emilim açıksa sorun büyük olasılıkla aşırı üretimdir; bu nadir durum koroid pleksus papillomuyla olabilir. [[K1 s. 199]]',
      monro: '<b>Monro foramenleri.</b> Bir tümörün basısıyla tıkanabilir; lateral ventriküller genişler. [[K1 s. 199]]',
      sylvius: '<b>Sylvius akuaduktu.</b> Konjenital darlık, subaraknoid kanama ya da tümör basısı bu dar kanalı tıkar; lateral ve üçüncü ventriküller genişler. [[K1 s. 199]]',
      cikis: '<b>Dördüncü ventrikül çıkışları.</b> Subaraknoid kanama, kronik menenjit ya da konjenital Arnold–Chiari malformasyonu tip II ile tıkanabilir; dört ventrikülün hepsi genişler. [[K1 s. 199]]',
      gran: '<b>Araknoid granülasyonlar.</b> Subaraknoid kanamanın pıhtıları BOS emilimini engelleyebilir. [[K1 s. 199]]',
    };
    const GENEL = ' Ventrikül içi basınç parankimi sıkıştırır (ventrikülomegali); bası sürerse hasar kalıcıdır. [[K1 s. 199]]';
    const TCAP = {
      evd: ' <b>EVD.</b> Geçici drenaj; BOS örneği almayı, basıncı ölçmeyi ve intratekal ilaç vermeyi de sağlar. [[K1 s. 199]]',
      sant: ' <b>Ventriküler şant.</b> Daha kalıcı; BOS\'u periton boşluğuna ya da sağ atriyuma yönlendirir. [[K1 s. 199]]',
      etvOk: ' <b>ETV.</b> Üçüncü ventrikül tabanındaki delikten BOS doğrudan bazal sisternalara geçer ve tıkanıklık atlatılır. [[K1 s. 199]]',
      etvNo: ' <b>ETV.</b> Kitap ETV\'yi akuaduktus ya da dördüncü ventrikül tıkanıklığını atlatmak için verir; bu durumda EVD ya da şant seçin. [[K1 s. 199]]',
    };
    const TBILGI = {
      evd: '<b>EVD</b> · geçici · BOS örneği · BOS basıncı ölçümü · intratekal ilaç',
      sant: '<b>Şant</b> · daha kalıcı · BOS → periton boşluğu ya da sağ atriyum',
      etvOk: '<b>ETV</b> · üçüncü ventrikül tabanı → bazal sisternalar',
      etvNo: '<b>ETV burada işe yaramaz:</b> kitap ETV\'yi akuaduktus ya da dördüncü ventrikül tıkanıklığını atlatmak için verir',
    };
    const ETK = [
      { id: 'sinus', p: [252, 2], w: ['r', 22, 'üst sagittal sinüs'], n: [14, 'sinüs'] },
      { id: 'gran', p: [236, 10], w: ['r', 46, 'araknoid|granülasyonlar'], n: [34, 'granülasyon'] },
      { id: 'lat', p: [244, 112], w: ['r', 104, 'lateral|ventriküller'], n: [80, 'lateral v.'] },
      { id: 'mon', p: [139, 131], w: ['l', 112, 'Monro|foramenleri'], n: [106, 'Monro'] },
      { id: 'uc', p: [150, 158], w: ['l', 164, 'üçüncü|ventrikül'], n: [128, '3. v.'] },
      { id: 'aq', p: [182, 201], w: ['r', 176, 'Sylvius|akuaduktu'], n: [150, 'Sylvius'] },
      { id: 'sis', p: [150, 230], w: ['l', 222, 'bazal|sisternalar'], n: [218, 'sisterna'] },
      { id: 'dort', p: [206, 238], w: ['r', 228, 'dördüncü|ventrikül'], n: [172, '4. v.'] },
      { id: 'cik', p: [204, 270], w: ['r', 276, 'çıkışlar|(Luschka, Magendie)'], n: [196, 'çıkışlar'] },
    ];
    const BLOK = { monro: [[139, 131]], sylvius: [[181, 200]], cikis: [[196, 262], [178, 244]], gran: [[182, 5]] };
    const upTo = (pts, p) => { const i = pts.findIndex((q) => q[0] === p[0] && q[1] === p[1]); return pts.slice(0, i + 1); };
    const ROTA = {
      yok: cat(P.lat, P.mon, P.uc, P.aq, P.dort, P.mag, upTo(P.up, [182, 12])),
      monro: P.lat, sylvius: cat(P.lat, P.mon, P.uc, [[172, 186], [181, 200]]), cikis: cat(P.lat, P.mon, P.uc, P.aq, P.dort),
      gran: cat(P.lat, P.mon, P.uc, P.aq, P.dort, P.mag, upTo(P.up, [182, 12])),
    };
    let yer = 'sylvius', ted = 'yok', dar = false, svg = null, ilk = true, par = [], cur = { lat: 0, uc: 0, dort: 0, sa: 0, p: 0.25 }, hedef = null, L = DUZ.gen, st = 0;
    el.innerHTML = `<div class="f46-kont f46-hkont">
        <div><span class="f46-kl">Tıkanıklık yeri</span>${segHtml('Tıkanıklık yeri', 'yer', YER, yer)}</div>
        <div><span class="f46-kl">Tedavi</span>${segHtml('Tedavi', 'ted', TED, ted)}</div></div>
      <div class="f46-hidro-kap"></div>
      <div class="f46-hbilgi">
        <div class="f46-meter"><span>ventrikül içi basınç</span><div class="f46-trk"><i data-pm></i></div></div>
        <p class="f46-satirb" data-neden></p>
        <p class="f46-satirb" data-tedb hidden></p>
      </div>`;
    const kap = el.querySelector('.f46-hidro-kap');
    const etkiliTed = () => ted === 'evd' || ted === 'sant' || (ted === 'etv' && (yer === 'sylvius' || yer === 'cikis'));
    const hedefHesap = () => {
      const g = GEN[yer], t = etkiliTed();
      return { lat: t ? 0 : g.lat || 0, uc: t ? 0 : g.uc || 0, dort: t ? 0 : g.dort || 0, sa: t ? 0 : g.sa || 0, p: t ? 0.25 : yer === 'yok' ? 0.68 : 0.9 };
    };
    const ciz = () => {
      L = dar ? { ...DUZ.dar, H: 298 } : DUZ.gen;
      const bag = dar ? { x: 22, y: 30 } : { x: 70, y: 52 };
      const evdLoc = [[124, 104], [98, 30], [84, 2]].map((p) => gp(L, p));
      const evdPts = evdLoc.concat([[bag.x, bag.y - 24]]);
      const santLoc = [[240, 128], [290, 62], [318, 44], [340, 92], [340, 250], [336, 320], [334, 372]].map((p) => gp(L, p));
      const etvG = gp(L, [164, 184]);
      kap.innerHTML = `<svg class="f46-svg${dar ? ' f46-n' : ''}" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Hidrosefali: tıkanıklık yeri ve tedavi">
        <defs>${okDef('f46-ok-hd', 'f46-mk-a')}</defs>
        ${beyinHtml(L)}
        ${dar ? '' : tx(L.ox + 258 * L.s, L.oy + 266 * L.s, 'serebellum', 'f46-kucuk', 'middle')}
        ${etiketHtml(ETK, L, dar)}
        <g data-pihti>${GRAN.map((p) => { const [x, y] = gp(L, p); return `<circle class="f46-pihti" cx="${(x - 2).toFixed(1)}" cy="${(y + 1).toFixed(1)}" r="2.6"/><circle class="f46-pihti" cx="${(x + 2.5).toFixed(1)}" cy="${(y - 1.5).toFixed(1)}" r="2"/>`; }).join('')}</g>
        <g data-blok></g>
        <g class="f46-ted" data-t="evd"><path class="f46-tup" d="${dYol(evdPts)}"/>
          <rect class="f46-torba" x="${bag.x - 13}" y="${bag.y - 24}" width="26" height="${dar ? 36 : 46}" rx="6"/>
          <circle class="f46-olcer" cx="${evdLoc[2][0].toFixed(1)}" cy="${(evdLoc[2][1] + 2).toFixed(1)}" r="5"/>
          ${dar ? tx(bag.x + 18, 20, 'EVD', 'f46-lbl f46-c-c') : tx(bag.x, bag.y + 42, 'EVD', 'f46-lbl f46-c-c', 'middle')}</g>
        <g class="f46-ted" data-t="sant"><path class="f46-tup" d="${dYol(santLoc)}"/><circle class="f46-olcer" cx="${santLoc[2][0].toFixed(1)}" cy="${santLoc[2][1].toFixed(1)}" r="5"/>
          ${dar ? tx(DAR_X, 250, 'şant ↓|periton /|sağ atriyum', 'f46-kucuk f46-c-c', 'start', 16) : tx(SAG_X + 6, 318, 'şant ↓|periton boşluğu|ya da sağ atriyum', 'f46-kucuk f46-c-c', 'start', 16)}</g>
        <g class="f46-ted" data-t="etv"><circle class="f46-etv" cx="${etvG[0].toFixed(1)}" cy="${etvG[1].toFixed(1)}" r="${dar ? 5 : 6}"/></g>
        <g data-yolok></g><g data-par></g><g data-birik></g>
      </svg>`;
      svg = kap.querySelector('svg');
      svg._evd = evdPts; svg._sant = santLoc;
      guncelle(true);
    };
    const rota = () => {
      const g = (pts) => pts.map((p) => gp(L, p));
      if (ted === 'evd') return { pts: g(P.lat.slice(0, 8)).concat(svg._evd), blok: false };
      if (ted === 'sant') return { pts: g(P.lat.slice(0, 3)).concat(svg._sant), blok: false };
      if (ted === 'etv' && etkiliTed()) return { pts: g(cat(P.lat, P.mon, P.etv)), blok: false };
      return { pts: g(ROTA[yer]), blok: yer !== 'yok' };
    };
    const guncelle = (anind) => {
      if (!svg) return;
      hedef = hedefHesap();
      if (anind || RM) cur = { ...hedef };
      svg.querySelectorAll('.f46-ted').forEach((g) => g.classList.toggle('f46-gor', g.dataset.t === ted));
      svg.querySelector('[data-pihti]').style.display = yer === 'gran' ? '' : 'none';
      svg.querySelectorAll('[data-e]').forEach((g) => g.classList.toggle('f46-on', (yer === 'monro' && g.dataset.e === 'mon') || (yer === 'sylvius' && g.dataset.e === 'aq') || (yer === 'cikis' && g.dataset.e === 'cik') || (yer === 'gran' && g.dataset.e === 'gran') || (ted === 'etv' && g.dataset.e === 'sis')));
      svg.querySelector('[data-blok]').innerHTML = (BLOK[yer] || []).map((p) => { const [x, y] = gp(L, p); return `<path class="f46-x" d="M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}"/>`; }).join('');
      const r = rota();
      svg.querySelector('[data-yolok]').innerHTML = `<path class="f46-yol" d="${dYol(r.pts)}" marker-end="url(#f46-ok-hd)"/>`;
      const birik = r.blok ? r.pts[r.pts.length - 1] : null;
      svg.querySelector('[data-birik]').innerHTML = birik ? [[-6, -3], [-2, 5], [4, -5], [6, 3], [0, 0], [-7, 4]].map((o) => `<circle class="f46-par" r="3" cx="${(birik[0] + o[0]).toFixed(1)}" cy="${(birik[1] + o[1]).toFixed(1)}"/>`).join('') : '';
      const gpar = svg.querySelector('[data-par]'); gpar.innerHTML = ''; par = [];
      if (!RM) { const yy = yol(r.pts); havuz(gpar, 10).forEach((c, i) => par.push({ c, yy, f: i / 10 })); }
      el.querySelector('[data-neden]').innerHTML = `<b>Neden:</b> ${NEDEN[yer]}`;
      const tl = el.querySelector('[data-tedb]');
      if (ted === 'yok') { tl.hidden = true; } else {
        const k = ted === 'etv' ? (etkiliTed() ? 'etvOk' : 'etvNo') : ted;
        tl.hidden = false; tl.classList.toggle('f46-uyari', k === 'etvNo');
        tl.innerHTML = `${TBILGI[k]}<br><span class="f46-ek">Olanaklıysa tıkayan lezyon cerrahi olarak çıkarılır.</span>`;
      }
      ciz2();
    };
    const ciz2 = () => {
      const s = svg; if (!s) return;
      const c = cur;
      const set = (sel, a, v) => { const e = s.querySelector(sel); if (e) e.setAttribute(a, v.toFixed(2)); };
      set('[data-vk=lat]', 'stroke-width', 15 + 11 * c.lat); set('[data-vi=lat]', 'stroke-width', 10 + 11 * c.lat);
      set('[data-vk=uc]', 'stroke-width', 10 + 9 * c.uc); set('[data-vi=uc]', 'stroke-width', 6 + 9 * c.uc);
      const sc = 1 + 0.5 * c.dort;
      s.querySelector('[data-vk=dort]').setAttribute('transform', `translate(198 236) scale(${sc.toFixed(3)}) translate(-198 -236)`);
      const bl = s.querySelector('[data-bas=lat]'); bl.setAttribute('stroke-width', (24 + 11 * c.lat).toFixed(1)); bl.style.opacity = (c.lat * 0.9).toFixed(2);
      const bu = s.querySelector('[data-bas=uc]'); bu.setAttribute('stroke-width', (18 + 9 * c.uc).toFixed(1)); bu.style.opacity = (c.uc * 0.9).toFixed(2);
      const bd = s.querySelector('[data-bas=dort]'); bd.setAttribute('transform', `translate(198 236) scale(${(sc + 0.35).toFixed(3)}) translate(-198 -236)`); bd.style.opacity = (c.dort * 0.9).toFixed(2);
      const ss = 1 - 0.035 * c.sa;
      s.querySelector('[data-cer]').setAttribute('transform', `translate(171 121) scale(${ss.toFixed(4)}) translate(-171 -121)`);
      s.querySelector('[data-cbl]').setAttribute('transform', `translate(258 256) scale(${(1 - 0.05 * c.sa).toFixed(4)}) translate(-258 -256)`);
      s.querySelectorAll('[data-px]').forEach((g) => {
        const big = yer === 'yok' && !etkiliTed();
        g.classList.toggle('f46-yan', big);
        const p = PX[g.dataset.px][0];
        g.setAttribute('transform', big ? `translate(${p[0]} ${p[1]}) scale(1.6) translate(${-p[0]} ${-p[1]})` : '');
      });
      el.querySelector('[data-pm]').style.width = (c.p * 100).toFixed(1) + '%';
      el.querySelector('[data-pm]').classList.toggle('f46-yuk', c.p > 0.6);
    };
    const yaz = () => {
      let h = YCAP[yer];
      if (ted === 'yok' && ilk) { /* varsayılan metin sayfada */ }
      else if (ted === 'yok') h += GENEL;
      else h += TCAP[ted === 'etv' ? (etkiliTed() ? 'etvOk' : 'etvNo') : ted];
      capYaz(el, h);
    };
    el.querySelectorAll('[data-yer]').forEach((b) => b.addEventListener('click', () => { yer = b.dataset.yer; ilk = false; basSec(el, 'yer', yer); guncelle(false); yaz(); }));
    el.querySelectorAll('[data-ted]').forEach((b) => b.addEventListener('click', () => { ted = b.dataset.ted; ilk = false; basSec(el, 'ted', ted); guncelle(false); yaz(); }));
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (!svg) return;
      st += dt;
      if (hedef) {
        let m = false; const k = Math.min(1, dt * 5);
        for (const a in hedef) { const dlt = hedef[a] - cur[a]; if (Math.abs(dlt) > 0.002) { cur[a] += dlt * k; m = true; } }
        if (m) ciz2();
      }
      par.forEach((p) => {
        p.f = (p.f + dt * 60 / p.yy.top) % 1;
        const [x, y] = p.yy.at(p.f * p.yy.top);
        p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1));
        p.c.style.opacity = p.f > 0.9 ? (1 - p.f) / 0.1 : 1;
      });
    });
    return () => { durT(); durD(); };
  };
})();
