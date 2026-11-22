/* Fizyoloji Bölüm 27 · Kalbin anatomisi ve işlevi · bileşenler (K1 s. 111–116). Tarif: docs/tasarim/fiz27.md
   1 f27_yapi     kanın kalpteki yolu (8 adım), duvar katmanları, RV/LV kesit biçimi (K1 s. 111–112)
   2 f27_disk     interkalar disk: gap junction, fascia adherens, macula adherens; AP yayılımı (K1 s. 112)
   3 f27_koroner  koroner ağaç, beslenme alanları, dominans, tıkanma (K1 s. 112–113)
   4 f27_ven      koroner sinüs, anterior kardiyak venler, Thebesius venleri, CRT kabloları (K1 s. 113–114)
   5 f27_akim     kalp döngüsünde aort basıncı, sol ve sağ koroner akım; kalp hızı (K1 s. 114–115)
   6 f27_otoreg   otoregülasyon (CPP 60–180 mmHg), O₂ talebi, ateromlu darlık (K1 s. 114–115)
   7 f27_ilac     O₂ sunumu–talebi terazisi ve ilaçlar (K1 s. 115–116)
   Çizimler şematiktir; sayfadaki viz-foot notları bunu söyler. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* ---------- ortak ---------- */
  const DAR = 560;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const r1 = (v) => Math.round(v * 10) / 10;
  const fmt = (v, d = 1) => {
    let s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
    return s.replace('.', ',').replace('-', '−');
  };
  const segHtml = (ad, key, opts, cur) => `<div class="f27-segk"><span>${ad}</span><div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div></div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capYazici = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    let son = null;
    return (h) => {
      const html = h == null ? ilk : REF(h);
      if (cap && html !== son) { cap.innerHTML = html; son = html; }
    };
  };
  const genislikIzle = (el, cb) => {
    if (!('ResizeObserver' in window)) return () => {};
    let son = el.clientWidth < DAR;
    const ro = new ResizeObserver(() => { const d = el.clientWidth < DAR; if (d !== son) { son = d; cb(); } });
    ro.observe(el);
    return () => ro.disconnect();
  };
  /* SVG içinde tabindex'li öğeler: Enter/Space = tıklama */
  const klavye = (el) => el.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const t = e.target.closest('[data-k],[data-a]');
    if (!t || t.tagName === 'BUTTON') return;
    e.preventDefault();
    t.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const T = (x, y, cls, s, a, ek = '') => `<text x="${r1(x)}" y="${r1(y)}" class="${cls}"${a ? ` text-anchor="${a}"` : ''}${ek}>${s}</text>`;
  const at = (e, o) => { if (e) for (const k in o) e.setAttribute(k, typeof o[k] === 'number' ? r1(o[k]) : o[k]); };
  /* çoklu çizgi üzerinde konum */
  const hat = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, L, top: L[L.length - 1] }; };
  const hatAt = (h, f) => {
    const d = clamp(f, 0, 1) * h.top;
    for (let i = 1; i < h.pts.length; i++) if (d <= h.L[i] || i === h.pts.length - 1) {
      const g = (d - h.L[i - 1]) / ((h.L[i] - h.L[i - 1]) || 1);
      return [lerp(h.pts[i - 1][0], h.pts[i][0], g), lerp(h.pts[i - 1][1], h.pts[i][1], g)];
    }
    return h.pts[0];
  };
  const pd = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ' ' + r1(p[1])).join(' ');
  /* anahtar noktalar arasında kosinüs ara değeri */
  const kp = (P, x) => {
    if (x <= P[0][0]) return P[0][1];
    for (let i = 1; i < P.length; i++) if (x <= P[i][0]) {
      const f = (x - P[i - 1][0]) / (P[i][0] - P[i - 1][0]);
      return lerp(P[i - 1][1], P[i][1], (1 - Math.cos(Math.PI * f)) / 2);
    }
    return P[P.length - 1][1];
  };
  const adimHtml = (adlar, oyn, nolar) => `<div class="f27-adim"><div class="btn-row f27-adim-dug"><button type="button" class="btn ghost" data-a="geri">← Önceki</button><button type="button" class="btn" data-a="ileri">Sonraki →</button>${oyn && !RM ? `<button type="button" class="btn ghost" data-a="oyn" aria-pressed="false">${oyn}</button>` : ''}</div>
    <div class="phase f27-faz" role="group" aria-label="Adımlar">${adlar.map((a, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}" aria-label="Adım ${nolar ? nolar[i] : i + 1}: ${a}"><b>${nolar ? nolar[i] : i + 1}</b>${a ? `<span>${a}</span>` : ''}</button>`).join('')}</div></div>`;
  const fazGuncelle = (el, i) => el.querySelectorAll('.f27-faz button').forEach((b, k) => {
    b.classList.toggle('on', k === i); b.classList.toggle('past', k < i); b.setAttribute('aria-pressed', String(k === i));
  });
  const OK_DEF = (id) => `<marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker>`;

  /* =====================================================================
     1 · Kanın kalpteki yolu
     ===================================================================== */
  VIZ.f27_yapi = (el) => {
    const cap = capYazici(el);
    const C = {
      1: '<b>1 · Sağ atriyum.</b> Oksijeni azalmış kan vena kava superior ve inferiordan sağ atriyuma gelir. Adım adım ilerleyin ya da bir boşluğa, kapağa veya duvar katmanına dokunun. [[K1 s. 111]]',
      2: '<b>2 · Triküspit kapak.</b> RA kasılınca kan üç yaprakçıklı triküspit kapaktan sağ ventriküle geçer. [[K1 s. 111]]',
      3: '<b>3 · Pulmoner kapak.</b> RV kasılınca kan üç yaprakçıklı pulmoner kapaktan pulmoner artere itilir. Sağ kalbin işi pulmoner dolaşımda akım üretmektir. [[K1 s. 111]]',
      4: '<b>4 · Akciğerler.</b> Kan akciğerlerde oksijenlenir; renk maviden kırmızıya döner. [[K1 s. 111]]',
      5: '<b>5 · Sol atriyum.</b> Oksijenlenmiş kan dört pulmoner venle (normal varyasyon 3–5) sol atriyuma döner. [[K1 s. 111]]',
      6: '<b>6 · Mitral kapak.</b> LA kasılınca kan iki yaprakçıklı mitral kapaktan sol ventriküle geçer. [[K1 s. 111]]',
      7: '<b>7 · Aort kapağı.</b> LV kasılınca kan üç yaprakçıklı aort kapağından aortaya itilir. Sol kalp arteriyel dolaşımda basınç üretir; her organın akımı doku gereksinimine göre ayarlanır. [[K1 s. 111]]',
      8: '<b>8 · Endokrin işlev.</b> Plazma hacmi artınca atriyum ve ventriküllerdeki gerilme reseptörleri uyarılır; ANP ve BNP salgılanır, böbrekte natriürez plazma hacmini normale döndürür. [[K1 s. 111]]',
      rv: '<b>Sağ ventrikül.</b> Transvers kesitte hilal, uzunlamasına kesitte üçgen; matematiksel modeli zor olduğundan hacmi ekokardiyografiyle güç tahmin edilir. [[K1 s. 111]]',
      lv: '<b>Sol ventrikül.</b> Transvers kesitte dairesel, uzunlamasına kesitte konik; hacmi ekokardiyografiyle doğru tahmin edilir. [[K1 s. 111]]',
      sep: '<b>Septum.</b> İki yanı interatriyal ve interventriküler septum ayırır; her yan bir atriyum ve bir ventrikülden oluşur. [[K1 s. 111]]',
      per: '<b>Perikard.</b> Kalbi saran fibröz kese; çevre yapılara tutunarak kalbi yerinde tutar. [[K1 s. 111]]',
      epi: '<b>Epikard.</b> Dıştaki bağ dokusu katmanı. Onu perikarddan ayıran az miktar perikard sıvısı, kalp hareket ederken sürtünmeyi azaltır. [[K1 s. 111]]',
      mio: '<b>Miyokard.</b> Ortadaki, kalp kasından oluşan katman. [[K1 s. 111]]',
      endo: '<b>Endokard.</b> Kalbin iç yüzünü döşeyen epitel hücreleri; kanla temas eder ve damarların endotel katmanıyla devamlıdır. Boşluktaki kan yalnız endokardı doğrudan besler. [[K1 s. 111–112]]',
    };
    const ADIM_K = { ra: 1, tri: 2, pul: 3, akc: 4, la: 5, mit: 6, aor: 7 };
    const VURGU = { 1: ['vks', 'vki', 'ra'], 2: ['tri', 'rv'], 3: ['pul', 'pa', 'rv'], 4: ['akc', 'pa', 'pv'], 5: ['pv', 'la'], 6: ['mit', 'lv'], 7: ['aor', 'ao', 'org', 'lv'], 8: ['ra', 'la', 'rv', 'lv', 'bob'] };
    const SOLUK = ['vks', 'vki', 'pa', 'pv', 'ao', 'org', 'akc'];
    const YOL = {
      1: [[[80, 40], [80, 120], [96, 150]], [[4, 164], [60, 162], [92, 156]]],
      2: [[[96, 150], [86, 182], [88, 250]]],
      3: [[[98, 262], [136, 232], [140, 200], [140, 36]]],
      4: [[[140, 24], [180, 22], [250, 22]]],
      5: [[[252, 15], [348, 15], [348, 120], [280, 146]]],
      6: [[[270, 150], [264, 182], [262, 250]]],
      7: [[[256, 262], [222, 232], [220, 200], [220, 52], [300, 52]]],
      8: [[[110, 168], [190, 384]], [[256, 168], [200, 384]], [[112, 306], [186, 384]], [[248, 306], [204, 384]]],
    };
    const H = {}; for (const k in YOL) H[k] = YOL[k].map(hat);
    let adim = 1, sec = null, oyna = false, sayac = 0, zaman = 0;

    const pipe = (d, cls, k) => `<g class="f27-yp-dm ${cls}" data-dm="${k}"><path d="${d}" class="f27-pipe-d"/><path d="${d}" class="f27-pipe-i"/></g>`;
    const kapak = (x, y, w, k, yon) => { // yon: 'v' yatay kapak düzlemi (akış aşağı), 'h' boru içinde (akış yukarı)
      const a = yon === 'v'
        ? `<path d="M${x - w / 2} ${y - 3} L${x - 3} ${y + 5} M${x + w / 2} ${y - 3} L${x + 3} ${y + 5}${w > 40 ? ` M${x} ${y - 4} L${x} ${y + 5}` : ''}" class="f27-kapak"/>`
        : `<path d="M${x - 6} ${y + 5} L${x - 1} ${y - 4} M${x + 6} ${y + 5} L${x + 1} ${y - 4}" class="f27-kapak"/>`;
      return `<g class="f27-yp-kp" data-k="${k}" tabindex="0" aria-label="${k}">${a}<circle cx="${x}" cy="${y}" r="${yon === 'v' ? w / 2 + 2 : 10}" class="f27-hit"/></g>`;
    };
    const pvYol = [0, 1, 2, 3].map((i) => { const yh = 12 + 3 * i, xv = 348 - 4 * i, ye = 156 - 16 * i; return `M250 ${yh} L${xv} ${yh} L${xv} ${ye} L312 ${ye}`; });
    const ana = `<svg class="f27-svg f27-yp-svg" viewBox="0 0 360 420" aria-label="Kalbin şematik ön kesiti: dört boşluk, dört kapak, büyük damarlar ve perikard">
      <defs>${OK_DEF('f27-yp-ok')}</defs>
      <rect x="30" y="64" width="300" height="292" rx="40" class="f27-yp-per"/>
      <rect x="30" y="64" width="300" height="292" rx="40" class="f27-hit-s" data-k="per" tabindex="0" aria-label="Perikard"/>
      <g class="f27-yp-dm f27-yp-akc" data-dm="akc" data-k="akc" tabindex="0" aria-label="Akciğerler"><rect x="110" y="4" width="140" height="32" rx="10"/>${T(180, 25, 'f27-lb', 'Akciğerler', 'middle')}</g>
      ${pipe('M80 34 L80 98', 'f27-mavi', 'vks')}${pipe('M2 164 L54 164', 'f27-mavi', 'vki')}
      <g class="f27-yp-dm f27-yp-pv" data-dm="pv">${pvYol.map((d) => `<path d="${d}"/>`).join('')}</g>
      <rect x="48" y="92" width="128" height="92" rx="16" class="f27-yp-oda f27-sag" data-k="ra" tabindex="0" aria-label="Sağ atriyum"/>
      <rect x="184" y="92" width="128" height="92" rx="16" class="f27-yp-oda f27-sol" data-k="la" tabindex="0" aria-label="Sol atriyum"/>
      <rect x="48" y="196" width="128" height="136" rx="18" class="f27-yp-oda f27-sag" data-k="rv" tabindex="0" aria-label="Sağ ventrikül"/>
      <rect x="187" y="199" width="122" height="134" rx="18" class="f27-yp-oda f27-sol f27-yp-lv" data-k="lv" tabindex="0" aria-label="Sol ventrikül"/>
      <g data-k="sep" tabindex="0" aria-label="Septum"><line x1="180" y1="92" x2="180" y2="336" class="f27-yp-sep"/><line x1="180" y1="92" x2="180" y2="336" class="f27-hit-s"/></g>
      ${pipe('M140 214 L140 34', 'f27-mavi', 'pa')}
      ${pipe('M220 214 L220 52 L296 52', 'f27-kirmizi', 'ao')}
      <g class="f27-yp-dm" data-dm="org"><path d="M296 52 L314 52" class="f27-yp-org" marker-end="url(#f27-yp-ok)"/>${T(318, 40, 'f27-tk f27-hl', 'Organlar', 'end')}</g>
      ${kapak(86, 190, 50, 'tri', 'v')}${kapak(274, 190, 50, 'mit', 'v')}${kapak(140, 204, 12, 'pul', 'h')}${kapak(220, 204, 12, 'aor', 'h')}
      ${T(80, 28, 'f27-tk', 'VKS', 'middle')}${T(4, 156, 'f27-tk', 'VKİ')}
      ${T(330, 78, 'f27-tk f27-hl', '4 pulmoner ven', 'end')}${T(330, 90, 'f27-tk f27-hl', '(normal 3–5)', 'end')}
      ${T(180, 75, 'f27-tk f27-hl', 'interatriyal', 'middle')}${T(180, 87, 'f27-tk f27-hl', 'septum', 'middle')}
      ${T(180, 349, 'f27-tk f27-hl', 'interventriküler septum', 'middle')}
      ${T(94, 128, 'f27-lb f27-ns', 'Sağ atriyum', 'middle')}${T(94, 143, 'f27-tk f27-ns', '(RA)', 'middle')}
      ${T(268, 128, 'f27-lb f27-ns', 'Sol atriyum', 'middle')}${T(268, 143, 'f27-tk f27-ns', '(LA)', 'middle')}
      ${T(100, 276, 'f27-lb f27-ns', 'Sağ', 'middle')}${T(100, 291, 'f27-lb f27-ns', 'ventrikül', 'middle')}${T(100, 306, 'f27-tk f27-ns', '(RV)', 'middle')}
      ${T(258, 276, 'f27-lb f27-ns', 'Sol', 'middle')}${T(258, 291, 'f27-lb f27-ns', 'ventrikül', 'middle')}${T(258, 306, 'f27-tk f27-ns', '(LV)', 'middle')}
      ${T(54, 214, 'f27-tk2 f27-ns', 'Triküspit · 3')}${T(131, 230, 'f27-tk2 f27-ns', 'Pulmoner · 3', 'end')}
      ${T(304, 214, 'f27-tk2 f27-ns', 'Mitral · 2', 'end')}${T(230, 230, 'f27-tk2 f27-ns', 'Aort · 3')}
      ${T(36, 376, 'f27-tk', 'Perikard · fibröz kese')}${T(36, 390, 'f27-tk', 'kapak yanı sayı = yaprakçık')}
      <g class="f27-yp-hor"><text x="110" y="172" class="f27-tk2 f27-cl f27-ns" text-anchor="middle">ANP</text><text x="268" y="172" class="f27-tk2 f27-cl f27-ns" text-anchor="middle">ANP</text>
        <text x="100" y="322" class="f27-tk2 f27-cl f27-ns" text-anchor="middle">BNP</text><text x="258" y="322" class="f27-tk2 f27-cl f27-ns" text-anchor="middle">BNP</text></g>
      <g class="f27-yp-bob" data-dm="bob"><path d="M182 372 C170 372, 166 392, 178 404 C188 412, 200 404, 196 396 C192 390, 202 386, 204 380 C206 372, 194 368, 182 372 Z"/>${T(214, 389, 'f27-tk2', 'Böbrek')}<path d="M214 400 L270 400" class="f27-yp-na" marker-end="url(#f27-yp-ok)"/>${T(214, 415, 'f27-tk f27-cl', 'Na⁺ + su atılımı')}</g>
      <g class="f27-yp-yolg"></g><g class="f27-yp-par"></g>
    </svg>`;
    const katman = `<svg class="f27-svg f27-yp-pano" viewBox="0 0 240 172" aria-label="Kalp duvarının katmanları, dıştan içe">
      <defs><pattern id="f27-yp-lif" width="10" height="8" patternUnits="userSpaceOnUse"><path d="M0 4 C3 1, 7 7, 10 4" class="f27-yp-lifp"/></pattern></defs>
      <g data-k="per" tabindex="0" aria-label="Perikard"><rect x="0" y="6" width="240" height="18" class="f27-ky f27-ky-per"/>${T(8, 19, 'f27-tk2', 'Perikard')}${T(232, 19, 'f27-tk', 'fibröz kese', 'end')}</g>
      <g data-k="epi" tabindex="0" aria-label="Perikard sıvısı"><rect x="0" y="24" width="240" height="13" class="f27-ky f27-ky-siv"/>${T(232, 34, 'f27-tk', 'sıvı · sürtünme ↓', 'end')}</g>
      <g data-k="epi" tabindex="0" aria-label="Epikard"><rect x="0" y="37" width="240" height="18" class="f27-ky f27-ky-epi"/>${T(8, 50, 'f27-tk2', 'Epikard')}${T(232, 50, 'f27-tk', 'bağ dokusu', 'end')}</g>
      <g data-k="mio" tabindex="0" aria-label="Miyokard"><rect x="0" y="55" width="240" height="52" class="f27-ky f27-ky-mio"/><rect x="0" y="55" width="240" height="52" fill="url(#f27-yp-lif)"/>${T(8, 86, 'f27-tk2 f27-hl', 'Miyokard')}${T(232, 86, 'f27-tk f27-hl', 'kalp kası', 'end')}</g>
      <g data-k="endo" tabindex="0" aria-label="Endokard"><rect x="0" y="107" width="240" height="14" class="f27-ky f27-ky-endo"/>${T(8, 118, 'f27-tk2', 'Endokard')}${T(232, 118, 'f27-tk', 'endotelle devamlı', 'end')}</g>
      <rect x="0" y="121" width="240" height="51" class="f27-ky f27-ky-kan"/>${T(120, 146, 'f27-tk2', 'Boşluktaki kan', 'middle')}${T(120, 161, 'f27-tk', 'yalnız endokardı besler', 'middle')}
    </svg>`;
    const kesit = `<svg class="f27-svg f27-yp-pano" viewBox="0 0 240 190" aria-label="RV ve LV kesit biçimleri">
      <g data-k="rv" tabindex="0" aria-label="Sağ ventrikül kesiti" class="f27-yp-ks f27-yp-krv">
        ${T(60, 14, 'f27-lb', 'RV', 'middle')}
        <circle cx="78" cy="58" r="22" class="f27-yp-hayal"/>
        <path d="M64.3 20.4 A40 40 0 0 0 64.3 95.6 L69.1 82.4 A26 26 0 0 1 69.1 33.6 Z" class="f27-sag-d"/>
        ${T(60, 112, 'f27-tk', 'transvers: hilal', 'middle')}
        <path d="M40 124 L80 124 L60 152 Z" class="f27-sag-d"/>
        ${T(60, 166, 'f27-tk', 'uzunlamasına: üçgen', 'middle')}
        ${T(60, 184, 'f27-tk2 f27-wr', 'eko: tahmin zor', 'middle')}
      </g>
      <g data-k="lv" tabindex="0" aria-label="Sol ventrikül kesiti" class="f27-yp-ks f27-yp-klv">
        ${T(180, 14, 'f27-lb', 'LV', 'middle')}
        <circle cx="180" cy="58" r="30" class="f27-sol-h"/>
        ${T(180, 112, 'f27-tk', 'transvers: daire', 'middle')}
        <ellipse cx="180" cy="126" rx="22" ry="5" class="f27-sol-d"/><path d="M158 126 Q170 146 180 154 Q190 146 202 126 A22 5 0 0 1 158 126 Z" class="f27-sol-d"/>
        ${T(180, 166, 'f27-tk', 'uzunlamasına: konik', 'middle')}
        ${T(180, 184, 'f27-tk2 f27-okt', 'eko: hacim doğru', 'middle')}
      </g>
    </svg>`;
    el.innerHTML = `<div class="f27-yp">
        <div class="f27-yp-ana">${ana}</div>
        <div class="f27-yp-yan">
          <figure class="f27-pn"><figcaption>Duvar katmanları <small>dıştan içe</small></figcaption>${katman}</figure>
          <figure class="f27-pn"><figcaption>Kesit biçimi</figcaption>${kesit}</figure>
        </div>
      </div>
      <p class="f27-not">${REF('Kalp venöz sistemden emmez; negatif basınç kompliyan venleri kollabe ederdi. [[K1 s. 111]]')}</p>
      ${adimHtml(['RA', 'Triküspit', 'Pulmoner', 'Akciğer', 'LA', 'Mitral', 'Aort', 'ANP/BNP'], 'Oynat')}`;
    klavye(el);
    const svg = el.querySelector('.f27-yp-svg'), yolG = svg.querySelector('.f27-yp-yolg'), parG = svg.querySelector('.f27-yp-par');
    const PN = 14;
    const parc = [];
    for (let i = 0; i < PN; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', 3.2); parG.appendChild(c); parc.push(c); }
    const yolCiz = () => {
      yolG.innerHTML = YOL[adim].map((p) => `<path d="${pd(p)}" class="f27-yp-yol ${adim === 8 ? 'f27-yp-yol-h' : adim >= 5 || (adim === 4) ? 'f27-yp-yol-k' : 'f27-yp-yol-m'}" marker-end="url(#f27-yp-ok)"/>`).join('');
    };
    const ciz = () => {
      const v = VURGU[adim];
      svg.querySelectorAll('[data-dm]').forEach((g) => g.classList.toggle('f27-soluk', SOLUK.includes(g.dataset.dm) && !v.includes(g.dataset.dm)));
      el.querySelectorAll('[data-k]').forEach((g) => {
        const k = g.dataset.k, pano = !!g.closest('.f27-yp-pano');
        g.classList.toggle('f27-on', sec ? k === sec : !pano && v.includes(k));
      });
      svg.classList.toggle('f27-a8', adim === 8);
      svg.querySelector('.f27-yp-bob').classList.toggle('f27-gor', adim === 8);
      svg.querySelector('.f27-yp-hor').classList.toggle('f27-gor', adim === 8);
      yolCiz();
      fazGuncelle(el, adim - 1);
      cap(sec ? C[sec] : C[adim]);
      konum(0);
    };
    const konum = (dt) => {
      zaman += dt;
      const yollar = H[adim];
      parc.forEach((c, i) => {
        if (RM) { c.setAttribute('opacity', 0); return; }
        const h = yollar[i % yollar.length];
        const n = Math.ceil(PN / yollar.length), j = Math.floor(i / yollar.length);
        const f = ((zaman * 60) / h.top + j / n) % 1;
        const [x, y] = hatAt(h, f);
        at(c, { cx: x, cy: y });
        let cls = 'f27-par-m';
        if (adim === 8) cls = 'f27-par-h';
        else if (adim >= 5 || (adim === 4 && f > 0.5)) cls = 'f27-par-k';
        c.setAttribute('class', cls);
        c.setAttribute('opacity', f < 0.06 ? f / 0.06 : f > 0.94 ? (1 - f) / 0.06 : 1);
      });
    };
    const git = (n) => { adim = ((n - 1 + 8) % 8) + 1; sec = null; sayac = 0; ciz(); };
    const oynaAyar = (on) => { oyna = on; const b = el.querySelector('[data-a="oyn"]'); if (b) { b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Duraklat' : 'Oynat'; } };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const a = e.target.closest('[data-a]');
      if (a) { const k = a.dataset.a; if (k === 'geri') { oynaAyar(false); git(adim - 1); } else if (k === 'ileri') { oynaAyar(false); git(adim + 1); } else if (k === 'oyn') oynaAyar(!oyna); return; }
      const f = e.target.closest('.f27-faz button');
      if (f) { oynaAyar(false); git(+f.dataset.i + 1); return; }
      const t = e.target.closest('[data-k]');
      if (!t) return;
      const k = t.dataset.k;
      oynaAyar(false);
      if (ADIM_K[k]) git(ADIM_K[k]); else { sec = k; ciz(); }
    });
    ciz();
    const dur = ticker(el, (dt) => {
      if (oyna) { sayac += dt; if (sayac > 2.5) git(adim + 1); }
      konum(dt);
    });
    return () => dur();
  };

  /* =====================================================================
     2 · İnterkalar diskteki üç bağlantı
     ===================================================================== */
  VIZ.f27_disk = (el) => {
    const cap = capYazici(el);
    const C = {
      gap: "<b>Gap junction kompleksleri.</b> Hücre içi iyonların ve daha büyük moleküllerin bir hücreden ötekine doğrudan geçtiği kanallardır: elektriksel sinaps. Aksiyon potansiyeli hücreden hücreye doğrudan yayılır. [[K1 s. 112]]",
      fas: '<b>Fascia adherens.</b> Sarkomerdeki aktin filamentlerini hücre zarına bağlar; kasılma kuvveti bir hücreden ötekine aktarılır. [[K1 s. 112]]',
      mak: '<b>Macula adherens (desmozom).</b> Kalp hücrelerini birbirine tutturur. Üç bağlantı birlikte miyokardı elektriksel, kimyasal ve mekanik olarak bağlar: fonksiyonel sinsityum. [[K1 s. 112]]',
    };
    let dar = el.clientWidth < DAR, sec = null, oyna = false, t = 0, zi = 0, E = {};
    const kur = () => {
      dar = el.clientWidth < DAR;
      const W = dar ? 360 : 640, H = dar ? 340 : 300, N = dar ? 3 : 5;
      const x0 = 14, cw = (W - 28) / N, yT = 46, hT = 64;
      const yB = dar ? 168 : 168, hB = dar ? 166 : 124, pw = (W - 28 - 2 * 10) / 3;
      let s = `<defs>${OK_DEF('f27-dk-ok')}<clipPath id="f27-dk-kl${dar ? 'd' : 'g'}">`;
      for (let i = 0; i < N; i++) s += `<rect x="${r1(x0 + i * cw + 1.5)}" y="${yT}" width="${r1(cw - 3)}" height="${hT}" rx="12"/>`;
      s += '</clipPath></defs>';
      s += `${T(W / 2, 18, 'f27-lb f27-dk-tek', 'tek, eşgüdümlü birim', 'middle')}`;
      for (let i = 0; i < N; i++) {
        const x = x0 + i * cw + 1.5, w = cw - 3, cx = x + w / 2;
        let cz = '';
        for (let k = x + 7; k < x + w - 4; k += 7) cz += `M${r1(k)} ${yT + 8} L${r1(k)} ${yT + hT - 8} `;
        s += `<g class="f27-dk-h" data-h="${i}" data-cx="${r1(cx)}"><rect x="${r1(x)}" y="${yT}" width="${r1(w)}" height="${hT}" rx="12" class="f27-dk-hc"/>
          <rect x="${r1(x)}" y="${yT}" width="0" height="${hT}" rx="12" class="f27-dk-dep"/>
          <path d="${cz}" class="f27-dk-cz"/>
          ${T(cx, yT + hT + 16, 'f27-tk', `hücre ${i + 1}`, 'middle')}</g>`;
      }
      for (let i = 1; i < N; i++) {
        const x = x0 + i * cw;
        s += `<path d="M${r1(x)} ${yT + 2} L${r1(x)} ${yT + 20} L${r1(x + 5)} ${yT + 20} L${r1(x + 5)} ${yT + 42} L${r1(x)} ${yT + 42} L${r1(x)} ${yT + hT - 2}" class="f27-dk-disk"/>`;
        s += `<g class="f27-dk-kv" data-d="${i}">${[0, 1, 2].map((j) => `<circle cx="${r1(x + 2.5)}" cy="${yT + 14 + j * 16}" r="3.4"/>`).join('')}</g>`;
        s += `<path d="M${r1(x - 9)} ${yT - 8} L${r1(x + 11)} ${yT - 8}" class="f27-dk-rm" marker-end="url(#f27-dk-ok)"/>`;
      }
      // büyütme çerçevesi (disk 1)
      const zx = x0 + cw;
      s += `<rect x="${r1(zx - 10)}" y="${yT - 2}" width="25" height="${hT + 4}" rx="4" class="f27-dk-bk"/>`;
      s += `<path d="M${r1(zx - 10)} ${yT + hT + 2} L${x0} ${yB - 4} M${r1(zx + 15)} ${yT + hT + 2} L${W - 14} ${yB - 4}" class="f27-dk-bkc"/>`;
      s += T(W / 2, yB - 12, 'f27-tk2 f27-hl', 'interkalar disk · büyütme', 'middle');
      const tur = [['gap', 'Gap junction', 'elektriksel sinaps'], ['fas', 'Fascia adherens', 'aktin → zar'], ['mak', 'Macula adherens', '(desmozom) hücre ↔ hücre']];
      tur.forEach(([k, ad, alt], i) => {
        const px = x0 + i * (pw + 10), cx = px + pw / 2, yt = yB + 6, yb = yB + hB - (dar ? 46 : 40);
        let ic = '';
        if (k === 'gap') {
          for (let j = 0; j < 3; j++) { const y = lerp(yt + 14, yb - 14, j / 2); ic += `<rect x="${r1(cx - 13)}" y="${r1(y - 5)}" width="26" height="10" rx="3" class="f27-dk-gj"/><line x1="${r1(cx - 13)}" y1="${r1(y)}" x2="${r1(cx + 13)}" y2="${r1(y)}" class="f27-dk-gjk"/>`; }
          ic += `<g class="f27-dk-iyon"></g>`;
        } else if (k === 'fas') {
          ic += `<rect x="${r1(cx - 15)}" y="${r1(yt + 10)}" width="6" height="${r1(yb - yt - 20)}" rx="2" class="f27-dk-fa"/><rect x="${r1(cx + 9)}" y="${r1(yt + 10)}" width="6" height="${r1(yb - yt - 20)}" rx="2" class="f27-dk-fa"/>`;
          for (let j = 0; j < 5; j++) { const y = lerp(yt + 16, yb - 16, j / 4); ic += `<path d="M${r1(cx - 15)} ${r1(y)} L${r1(px + 8)} ${r1(y + (j % 2 ? 3 : -3))} M${r1(cx + 15)} ${r1(y)} L${r1(px + pw - 8)} ${r1(y + (j % 2 ? -3 : 3))}" class="f27-dk-ak"/>`; }
        } else {
          for (let j = 0; j < 2; j++) {
            const y = lerp(yt + 22, yb - 22, j);
            ic += `<rect x="${r1(cx - 17)}" y="${r1(y - 9)}" width="7" height="18" rx="3.5" class="f27-dk-mk"/><rect x="${r1(cx + 10)}" y="${r1(y - 9)}" width="7" height="18" rx="3.5" class="f27-dk-mk"/>`;
            ic += `<path d="M${r1(cx - 10)} ${r1(y - 5)} L${r1(cx - 3)} ${r1(y - 1)} L${r1(cx + 3)} ${r1(y - 5)} L${r1(cx + 10)} ${r1(y - 1)} M${r1(cx - 10)} ${r1(y + 3)} L${r1(cx - 3)} ${r1(y + 7)} L${r1(cx + 3)} ${r1(y + 3)} L${r1(cx + 10)} ${r1(y + 7)}" class="f27-dk-mf"/>`;
            ic += `<path d="M${r1(cx - 17)} ${r1(y - 6)} L${r1(px + 10)} ${r1(y - 14)} M${r1(cx - 17)} ${r1(y + 6)} L${r1(px + 10)} ${r1(y + 14)} M${r1(cx + 17)} ${r1(y - 6)} L${r1(px + pw - 10)} ${r1(y - 14)} M${r1(cx + 17)} ${r1(y + 6)} L${r1(px + pw - 10)} ${r1(y + 14)}" class="f27-dk-mf2"/>`;
          }
        }
        const ly = yb + (dar ? 18 : 18);
        s += `<g class="f27-dk-tur" data-k="${k}" tabindex="0" aria-label="${ad}">
          <rect x="${r1(px)}" y="${yB}" width="${r1(pw)}" height="${hB}" rx="12" class="f27-dk-pn"/>
          <line x1="${r1(cx - 9)}" y1="${yt}" x2="${r1(cx - 9)}" y2="${r1(yb)}" class="f27-dk-zar"/><line x1="${r1(cx + 9)}" y1="${yt}" x2="${r1(cx + 9)}" y2="${r1(yb)}" class="f27-dk-zar"/>
          ${ic}
          ${T(cx, ly, 'f27-lb', ad, 'middle')}
          ${dar && k === 'mak' ? T(cx, ly + 15, 'f27-tk', '(desmozom)', 'middle') + T(cx, ly + 29, 'f27-tk', 'hücre ↔ hücre', 'middle') : T(cx, ly + 15, 'f27-tk', alt, 'middle')}
        </g>`;
      });
      el.innerHTML = `<div class="f27-ctl">${segHtml('Bağlantı türü', 'k', tur.map(([k, ad]) => [k, ad]), sec)}${RM ? '' : '<button type="button" class="btn" data-a="oyn" aria-pressed="false">Oynat</button>'}</div>
        <svg class="f27-svg${dar ? ' f27-dar' : ''}" viewBox="0 0 ${W} ${H}" aria-label="Beş kalp kası hücresi ve aralarındaki interkalar diskler; altta diskteki üç bağlantının büyütmesi">${s}</svg>`;
      E = {
        N, cw, x0, yT, hT,
        h: [...el.querySelectorAll('.f27-dk-h')], dep: [...el.querySelectorAll('.f27-dk-dep')],
        kv: [...el.querySelectorAll('.f27-dk-kv')], tek: el.querySelector('.f27-dk-tek'), iyon: el.querySelector('.f27-dk-iyon'),
        rm: [...el.querySelectorAll('.f27-dk-rm')],
      };
      // iyon noktaları (gap junction kanalından geçen)
      E.iy = [];
      el.querySelectorAll('[data-k="gap"] .f27-dk-gjk').forEach((ln) => {
        for (let j = 0; j < 2; j++) {
          const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          c.setAttribute('r', 2.6); c.setAttribute('class', 'f27-dk-iy');
          E.iyon.appendChild(c); E.iy.push({ c, x1: +ln.getAttribute('x1') - 14, x2: +ln.getAttribute('x2') + 14, y: +ln.getAttribute('y1'), ph: j * 0.5 });
        }
      });
      oynaAyar(oyna);
      secCiz();
      ciz();
    };
    const secCiz = () => {
      el.querySelectorAll('.f27-dk-tur').forEach((g) => g.classList.toggle('f27-on', g.dataset.k === sec));
      basSec(el, 'k', sec);
    };
    const oynaAyar = (on) => { oyna = on && !RM; const b = el.querySelector('[data-a="oyn"]'); if (b) { b.setAttribute('aria-pressed', String(oyna)); b.textContent = oyna ? 'Duraklat' : 'Oynat'; } };
    const TC = 3, HIZ = 0.15; // döngü (s), hücre başına yayılma (s; şematik)
    const ciz = () => {
      const tt = RM ? 99 : t % TC, oynuyor = oyna || RM || t > 0;
      let kasTum = 0, kasilan = 0;
      E.h.forEach((g, i) => {
        const t0 = 0.1 + i * HIZ;
        let f = oynuyor ? clamp((tt - t0) / HIZ, 0, 1) : 0;
        const son = 0.1 + E.N * HIZ;
        if (!RM && tt > 2.3) f *= clamp(1 - (tt - 2.3) / 0.4, 0, 1); // repolarizasyon
        if (RM) f = 1;
        E.dep[i].setAttribute('width', r1(f * (E.cw - 3)));
        // kasılma: depolarizasyondan 0,2 s sonra, 0,9 s sürer
        const c0 = t0 + HIZ + 0.2, c1 = c0 + 0.9;
        let k = 0;
        if (oynuyor && !RM) k = tt < c0 ? 0 : tt < c0 + 0.15 ? (tt - c0) / 0.15 : tt < c1 ? 1 : tt < c1 + 0.2 ? 1 - (tt - c1) / 0.2 : 0;
        if (k > 0.9) kasilan++;
        kasTum++;
        const cx = +g.dataset.cx, sx = 1 - 0.06 * ease(k);
        g.setAttribute('transform', k > 0 ? `translate(${r1(cx)} 0) scale(${sx.toFixed(4)} 1) translate(${r1(-cx)} 0)` : '');
        void son;
      });
      E.kv.forEach((g) => {
        const d = +g.dataset.d, ta = 0.1 + d * HIZ;
        const on = RM ? 1 : oynuyor && tt >= ta - 0.04 && tt < ta + 0.25 ? 1 : 0;
        g.setAttribute('opacity', RM ? 0.9 : on ? 1 : 0.18);
        g.classList.toggle('f27-par-p', !!on && !RM);
      });
      E.rm.forEach((p) => p.setAttribute('opacity', RM ? 1 : 0));
      E.tek.setAttribute('opacity', (kasilan === kasTum && kasTum) || RM ? 1 : 0);
      E.iy.forEach((p) => {
        const f = RM ? (p.ph + 0.25) % 1 : ((zi * 0.6) + p.ph) % 1;
        at(p.c, { cx: lerp(p.x1, p.x2, f), cy: p.y });
        p.c.setAttribute('opacity', RM ? 1 : f < 0.1 ? f * 10 : f > 0.9 ? (1 - f) * 10 : 1);
      });
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      if (e.target.closest('[data-a="oyn"]')) { oynaAyar(!oyna); if (oyna) { t = 0; sec = null; secCiz(); cap(null); } ciz(); return; }
      const b = e.target.closest('[data-k]');
      if (b) { sec = b.dataset.k; secCiz(); cap(C[sec]); }
    });
    klavye(el);
    kur();
    const durRO = genislikIzle(el, kur);
    const dur = ticker(el, (dt) => { if (oyna) t += dt; zi += dt; ciz(); });
    return () => { dur(); durRO(); };
  };

  /* =====================================================================
     3 · Hangi arter nereyi besler?
     ===================================================================== */
  VIZ.f27_koroner = (el) => {
    const cap = capYazici(el);
    const C = {
      sag: "<b>Sağ dominans (çoğu kişi).</b> Bir artere dokunun: seyri, beslediği bölge ve tıkanırsa ne olacağı görünür. [[K1 s. 112–113]]",
      sol: "<b>Sol dominans (kişilerin yaklaşık %15'i).</b> En sık koroner varyantı: arka interventriküler arter sağ koronerden değil sol sirkumfleksten çıkar. [[K1 s. 113]]",
      kok: '<b>Aort (Valsalva) sinüsleri.</b> Aort kapağının hemen üstündeki üç genişlemede girdap akımları oluşur; yaprakçıkları aort duvarından uzak tutarak kapağın düzgün kapanmasını kolaylaştırır ve sinüslerden çıkan koroner ağızların tıkanmasını önler. Sol koroner sol posterior, sağ koroner anterior sinüsten çıkar. [[K1 s. 112]]',
      lm: "<b>Sol ana koroner.</b> Sol posterior sinüsten, aort kapağının sol yaprakçığı üstünden çıkar; sol AV olukta 2,5 cm'den kısa bir yol alıp LAD ve sirkumflekse ayrılır. [[K1 s. 112]]",
      lad: '<b>Sol ön inen arter (LAD; sol interventriküler).</b> Ön interventriküler olukta iner, septal ve diyagonal dallar verir; LV\'nin çoğunu besler: anterolateral duvar, apeks, interventriküler septum. Apeksi aştıktan sonra çoğu kez arka interventriküler arterle anastomoz yapar. [[K1 s. 112]]',
      cx: "<b>Sol sirkumfleks.</b> Sol AV olukta sürer, bir ya da daha çok obtus marjinal dal verir; ucu AV olukta sağ koronerle anastomoz yapar. Posterolateral LV'yi ve kişilerin %40'ında SA düğümü besler. [[K1 s. 113]]",
      rca: "<b>Sağ koroner.</b> Anterior sinüsten, aort kapağının sağ yaprakçığı üstünden çıkar ve sağ AV olukta ilerler. SA dalı (kişilerin %60'ında) SA düğümü, sağ marjinal arter (sağ kenardan apekse; LAD'nin sağdaki karşılığı) RV'yi besler. [[K1 s. 113]]",
      pda: '<b>Arka interventriküler (arka inen) arter.</b> Çoğu kişide sağ koroner arka interventriküler oluğa ulaşınca verir; septumun arka kısmını ve AV düğümü besler. Sağ koroner AV olukta sirkumfleksle anastomoza kadar sürer. [[K1 s. 113]]',
    };
    const CT = {
      lad: '<b>Tıkanma: LAD tıkanması.</b> Uç arter olduğundan anterolateral LV, apeks ve septum ön kısmı kansız kalır: LV\'nin büyük bölümünde enfarktüs. [[K1 s. 112]]',
      cx: '<b>Tıkanma: Sirkumfleks tıkanması.</b> Posterolateral LV etkilenir; SA dalı sirkumfleksten çıkıyorsa (%40) SA düğüm de; sol dominansta arka inen arter de kaybolur. [[K1 s. 113]]',
      rca: '<b>Tıkanma: Sağ koroner tıkanması.</b> RV, çoğu kişide SA düğüm ve sağ dominansta arka inen arterle septum arka kısmı ve AV düğüm etkilenir: bradikardi ve AV bloğa yatkınlık. [[K1 s. 113]]',
      lm: '<b>Tıkanma: Sol ana koroner tıkanması.</b> LAD ve sirkumfleksin bütün alanı etkilenir. Koroner arterler uç arter olduğundan akut tıkanma miyokard enfarktüsü yapar. [[K1 s. 112]]',
      pda: '<b>Tıkanma: Arka inen arter tıkanması.</b> Septumun arka kısmı ve AV düğüm etkilenir: AV blok. [[K1 s. 113]]',
    };
    const AD = { lm: 'Sol ana', lad: 'LAD', cx: 'Sirkumfleks', rca: 'Sağ koroner', pda: 'Arka inen' };
    const BOLGE_AD = { ant: 'anterolateral LV', apex: 'apeks', sepOn: 'septum ön kısmı', post: 'posterolateral LV', rv: 'RV', sepArka: 'septum arka kısmı', sa: 'SA düğüm', av: 'AV düğüm' };
    let dom = 'sag', mod = 'bes', saK = 'rca', sec = null, dar = el.clientWidth < DAR, zaman = 0;
    const kaynak = (b) => {
      if (b === 'ant' || b === 'apex' || b === 'sepOn') return 'lad';
      if (b === 'post') return 'cx';
      if (b === 'rv') return 'rca';
      if (b === 'sa') return saK;
      return dom === 'sag' ? 'rca' : 'cx'; // sepArka, av (arka inen yoluyla)
    };
    const kume = (a) => {
      const B = ['ant', 'apex', 'sepOn', 'post', 'rv', 'sepArka', 'sa', 'av'];
      if (a === 'lm') return B.filter((b) => ['lad', 'cx'].includes(kaynak(b)));
      if (a === 'pda') return ['sepArka', 'av'];
      return B.filter((b) => kaynak(b) === a);
    };
    const RENK = { lad: 'f27-kr-lad', cx: 'f27-kr-cx', rca: 'f27-kr-rca' };
    /* arterler (ön görünüm, 360×372); arkadaki parçalar kesikli */
    const P = {
      lm: [['M196 76 C205 92, 213 104, 222 116', 'on']],
      lad: [['M222 116 C229 200, 227 280, 213 338', 'on'], ['M213 338 C206 352, 194 348, 192 334', 'ark'],
        ['M226 160 L212 168 M227 200 L213 208 M226 240 L212 248', 'sep'], ['M226 150 C240 166, 252 178, 264 190 M227 214 C238 228, 250 240, 258 252', 'dal']],
      cx: [['M222 116 C250 115, 286 120, 306 134', 'on'], ['M300 146 C298 180, 288 212, 276 238', 'dal'], ['M306 134 C302 150, 282 156, 254 156', 'ark']],
      cxL: [['M254 156 C230 150, 202 150, 172 152', 'ark']],
      rca: [['M164 76 C150 92, 118 106, 64 126 C54 140, 54 160, 58 172', 'on'], ['M60 160 C80 230, 140 300, 188 332', 'dal']],
      rcaR: [['M58 172 C92 168, 140 158, 172 152 C200 150, 228 150, 254 156', 'ark']],
      rcaL: [['M58 172 C80 169, 100 166, 120 163', 'ark']],
      pda: [['M172 152 C178 220, 190 290, 192 334', 'ark']],
      saR: [['M146 92 C130 84, 110 88, 97 97', 'on']],
      saC: [['M236 116 C222 80, 140 66, 97 97', 'ark']],
    };
    const TIK = { lm: [206, 92], lad: [227, 150], cx: [258, 116], rca: [130, 100], pda: [176, 190] };
    const agacSvg = () => {
      const yol = (ks, a) => ks.map(([d, t]) => `<path d="${d}" class="f27-kr-a f27-kr-${t}" data-p="${a}"/>`).join('');
      return `<svg class="f27-svg f27-kr-agac" viewBox="0 0 360 372" aria-label="Aort kökü ve koroner arterlerin ön görünümü; arkadaki seyir kesikli">
        <defs><pattern id="f27-kr-tar" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" class="f27-kr-tarb"/><line x1="0" y1="0" x2="0" y2="7" class="f27-kr-tarl"/></pattern></defs>
        <path d="M70 104 C120 88, 240 88, 296 104 C330 150, 320 230, 236 330 C222 346, 206 350, 196 340 C120 272, 64 210, 56 150 C54 126, 60 112, 70 104 Z" class="f27-kr-kalp"/>
        <path d="M62 128 C140 112, 230 112, 308 130" class="f27-kr-oluk"/><path d="M222 118 C228 200, 226 280, 212 340" class="f27-kr-oluk"/>
        <path d="M170 140 C176 220, 190 290, 204 338" class="f27-kr-oluk f27-kr-oluk-a"/>
        <g data-k="kok" tabindex="0" aria-label="Aort kökü ve sinüsler" class="f27-kr-kok">
          <rect x="166" y="0" width="28" height="62" class="f27-kr-aort"/>
          <circle cx="164" cy="70" r="12" class="f27-kr-sin"/><circle cx="196" cy="70" r="12" class="f27-kr-sin"/><circle cx="180" cy="76" r="10" class="f27-kr-sin"/>
          <path d="M158 70 a6 6 0 1 1 6 6" class="f27-kr-gir" marker-end="url(#f27-kr-ok)"/><path d="M190 70 a6 6 0 1 1 6 6" class="f27-kr-gir" marker-end="url(#f27-kr-ok)"/>
          <rect x="146" y="52" width="68" height="40" class="f27-hit"/>
        </g>
        <defs>${OK_DEF('f27-kr-ok')}</defs>
        ${dar ? '' : T(150, 62, 'f27-tk f27-hl', 'anterior (sağ) sinüs', 'end') + T(210, 62, 'f27-tk f27-hl', 'sol posterior sinüs')}
        <g class="f27-kr-ag">
          <g data-a="lm" tabindex="0" aria-label="Sol ana koroner">${yol(P.lm, 'lm')}</g>
          <g data-a="lad" tabindex="0" aria-label="LAD">${yol(P.lad, 'lad')}</g>
          <g data-a="cx" tabindex="0" aria-label="Sirkumfleks">${yol(P.cx, 'cx')}<g class="f27-kr-dom-sol">${yol(P.cxL, 'cx')}</g><g class="f27-kr-sa-cx">${yol(P.saC, 'cx')}</g></g>
          <g data-a="rca" tabindex="0" aria-label="Sağ koroner">${yol(P.rca, 'rca')}<g class="f27-kr-dom-sag">${yol(P.rcaR, 'rca')}</g><g class="f27-kr-dom-sol">${yol(P.rcaL, 'rca')}</g><g class="f27-kr-sa-rca">${yol(P.saR, 'rca')}</g></g>
          <g data-a="pda" tabindex="0" aria-label="Arka inen arter">${yol(P.pda, 'pda')}</g>
        </g>
        <circle cx="192" cy="333" r="5" class="f27-kr-anas"/><circle cx="254" cy="156" r="5" class="f27-kr-anas"/>
        <path d="M92 90 l3 5 5 1 -4 4 1 5 -5 -2 -5 2 1 -5 -4 -4 5 -1z" class="f27-kr-dg" data-n="sa"/>
        <rect x="168" y="140" width="10" height="10" rx="2" class="f27-kr-dg" data-n="av"/>
        ${T(96, 82, 'f27-tk2 f27-hl', 'SA düğüm', 'middle')}${T(182, 136, 'f27-tk2 f27-hl', 'AV düğüm', 'start')}
        ${T(234, 98, 'f27-tk2 f27-hl', 'Sol ana')}${T(234, 110, 'f27-tk f27-hl', '< 2,5 cm')}
        ${T(234, 296, 'f27-tk2 f27-hl', 'LAD')}${T(268, 196, 'f27-tk f27-hl', 'diyagonal')}${T(196, 176, 'f27-tk f27-hl', 'septal', 'end')}
        ${T(316, 150, 'f27-tk2 f27-hl', 'Sirkumfleks', 'end')}${T(290, 256, 'f27-tk f27-hl', 'obtus marjinal', 'middle')}
        ${T(76, 146, 'f27-tk2 f27-hl', 'Sağ koroner')}${T(86, 262, 'f27-tk f27-hl', 'sağ marjinal', 'end')}
        ${T(164, 286, 'f27-tk2 f27-hl', 'Arka inen', 'end')}${T(164, 298, 'f27-tk f27-hl', '(arkada)', 'end')}
        ${T(214, 364, 'f27-tk f27-hl', 'anastomoz', 'middle')}
        <g class="f27-kr-x"></g>
        <g class="f27-kr-hitg">${Object.keys(AD).map((a) => (a === 'pda' ? P.pda : a === 'cx' ? P.cx : a === 'rca' ? [...P.rca, ...P.rcaR] : P[a]).map(([d]) => `<path d="${d}" class="f27-hit-s f27-hit-k" data-a="${a}"/>`).join('')).join('')}</g>
      </svg>`;
    };
    /* kısa eksen kesiti */
    const pol = (cx, cy, r, a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
    const halka = (cx, cy, R, r, a0, a1) => {
      const b = a1 - a0 > 180 ? 1 : 0;
      const [x1, y1] = pol(cx, cy, R, a0), [x2, y2] = pol(cx, cy, R, a1), [x3, y3] = pol(cx, cy, r, a1), [x4, y4] = pol(cx, cy, r, a0);
      return `M${r1(x1)} ${r1(y1)} A${R} ${R} 0 ${b} 1 ${r1(x2)} ${r1(y2)} L${r1(x3)} ${r1(y3)} A${r} ${r} 0 ${b} 0 ${r1(x4)} ${r1(y4)} Z`;
    };
    const kesitSvg = () => {
      const cx = 140, cy = 104;
      return `<svg class="f27-svg f27-kr-kesit" viewBox="0 0 260 262" aria-label="Ventriküllerin kısa eksen kesiti; bölgeler besleyen artere göre renkli">
        <path d="${halka(cx, cy, 64, 36, 250, 380)}" class="f27-kr-b" data-b="ant"/>
        <path d="${halka(cx, cy, 64, 36, 20, 110)}" class="f27-kr-b" data-b="post"/>
        <path d="${halka(cx, cy, 64, 36, 110, 180)}" class="f27-kr-b" data-b="sepArka"/>
        <path d="${halka(cx, cy, 64, 36, 180, 250)}" class="f27-kr-b" data-b="sepOn"/>
        <path d="${halka(cx, cy, 94, 70, 118, 242)}" class="f27-kr-b" data-b="rv"/>
        <circle cx="228" cy="196" r="17" class="f27-kr-b" data-b="apex"/>
        ${T(cx, cy + 5, 'f27-lb', 'LV', 'middle')}${T(62, cy + 4, 'f27-lb f27-hl', 'RV', 'middle')}
        ${T(200, 22, 'f27-tk f27-hl', 'anterolateral', 'middle')}${T(206, 186, 'f27-tk f27-hl', 'posterolateral', 'end')}
        ${T(62, 14, 'f27-tk f27-hl', 'septum (ön)', 'middle')}${T(56, 214, 'f27-tk f27-hl', 'septum (arka)', 'middle')}
        <path d="M78 20 L104 56 M76 204 L104 154" class="f27-kr-ok2"/>
        ${T(228, 230, 'f27-tk f27-hl', 'apeks', 'middle')}
        <g class="f27-kr-nd" data-b="sa"><path d="M24 236 l3.5 6 6.5 1 -5 4.5 1.5 6.5 -6.5 -3 -6.5 3 1.5 -6.5 -5 -4.5 6.5 -1z" class="f27-kr-ndi"/>${T(40, 252, 'f27-tk2', 'SA düğüm')}</g>
        <g class="f27-kr-nd" data-b="av"><rect x="118" y="238" width="13" height="13" rx="2.5" class="f27-kr-ndi"/>${T(137, 250, 'f27-tk2', 'AV düğüm')}</g>
      </svg>`;
    };
    const kur = () => {
      dar = el.clientWidth < DAR;
      el.innerHTML = `<div class="f27-ctl">${segHtml('Dominans', 'dom', [['sag', 'Sağ dominans (çoğu kişi)'], ['sol', 'Sol dominans (%15)']], dom)}${segHtml('Mod', 'mod', [['bes', 'Besleme alanı'], ['tik', 'Tıka']], mod)}${segHtml('SA dalı', 'sak', [['rca', 'sağ koronerden (%60)'], ['cx', 'sirkumfleksten (%40)']], saK)}</div>
        <div class="f27-art" role="group" aria-label="Arter seçimi">${Object.keys(AD).map((a) => `<button type="button" class="f27-chip" data-a="${a}" aria-pressed="false"><i class="${RENK[a === 'lm' ? 'lad' : a === 'pda' ? (dom === 'sag' ? 'rca' : 'cx') : a] || ''}"></i>${AD[a]}</button>`).join('')}</div>
        <div class="f27-kr${dar ? ' f27-dar' : ''}"><div class="f27-kr-sol">${agacSvg()}</div><div class="f27-kr-sag">${kesitSvg()}
          <div class="legend"><span><i class="f27-li f27-kr-lad"></i>LAD</span><span><i class="f27-li f27-kr-cx"></i>Sirkumfleks</span><span><i class="f27-li f27-kr-rca"></i>Sağ koroner</span><span><i class="f27-li f27-li-tik"></i>iskemi</span></div>
          <p class="f27-kr-sonuc" aria-live="polite"></p></div></div>
        <p class="f27-not">İnce kesikli çizgiler: AV oluk ve ön/arka interventriküler oluk; kalın kesikli: kalbin arka yüzündeki seyir.</p>`;
      ciz();
    };
    const ciz = () => {
      const svg = el.querySelector('.f27-kr-agac');
      svg.classList.toggle('f27-kr-sol-dom', dom === 'sol');
      svg.classList.toggle('f27-kr-sacx', saK === 'cx');
      const ilgili = !sec ? [] : sec === 'lm' ? ['lm', 'lad', 'cx', ...(dom === 'sol' ? ['pda'] : [])] : sec === 'rca' && dom === 'sag' ? ['rca', 'pda'] : sec === 'cx' && dom === 'sol' ? ['cx', 'pda'] : [sec];
      svg.querySelectorAll('.f27-kr-ag > g[data-a]').forEach((g) => {
        const a = g.dataset.a;
        g.classList.toggle('f27-on', mod === 'bes' && ilgili.includes(a));
        g.classList.toggle('f27-tikali', mod === 'tik' && ilgili.includes(a));
        g.classList.toggle('f27-soluk', !!sec && mod === 'bes' && !ilgili.includes(a));
      });
      // arka inen: sol dominansta sirkumfleks renginde
      svg.querySelector('[data-a="pda"]').classList.toggle('f27-pda-cx', dom === 'sol');
      const xg = svg.querySelector('.f27-kr-x');
      xg.innerHTML = mod === 'tik' && sec ? (() => { const [x, y] = TIK[sec]; return `<path d="M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}" class="f27-kr-xi"/>${T(x + 10, y - 8, 'f27-tk2 f27-wr f27-hl', 'tıkanma')}`; })() : '';
      const K = sec ? kume(sec) : [];
      el.querySelectorAll('.f27-kr-kesit [data-b]').forEach((p) => {
        const b = p.dataset.b, src = kaynak(b);
        p.classList.remove('f27-kr-lad', 'f27-kr-cx', 'f27-kr-rca', 'f27-kr-isk', 'f27-soluk', 'f27-yan');
        if (mod === 'tik' && K.includes(b)) p.classList.add('f27-kr-isk', !RM ? 'f27-yan' : 'f27-kr-isk');
        else p.classList.add(RENK[src]);
        if (mod === 'bes' && sec && !K.includes(b)) p.classList.add('f27-soluk');
      });
      el.querySelectorAll('.f27-kr-dg').forEach((d) => {
        const b = d.dataset.n;
        d.classList.toggle('f27-kr-isk', mod === 'tik' && K.includes(b));
        d.classList.toggle('f27-yan', mod === 'tik' && K.includes(b) && !RM);
      });
      el.querySelectorAll('.f27-art [data-a]').forEach((b) => {
        b.setAttribute('aria-pressed', String(b.dataset.a === sec));
        const i = b.querySelector('i'), a = b.dataset.a;
        i.className = RENK[a === 'lm' ? 'lad' : a === 'pda' ? (dom === 'sag' ? 'rca' : 'cx') : a] || '';
      });
      const son = el.querySelector('.f27-kr-sonuc');
      son.innerHTML = sec ? `<b>${mod === 'tik' ? 'İskemi' : 'Besler'}:</b> ${K.map((b) => BOLGE_AD[b]).join(', ')}` : mod === 'tik' ? 'Tıkamak için bir artere dokunun.' : 'Renkler: her bölgeyi besleyen arter.';
      basSec(el, 'dom', dom); basSec(el, 'mod', mod); basSec(el, 'sak', saK);
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const s = e.target.closest('[data-dom],[data-mod],[data-sak]');
      if (s) {
        if (s.dataset.dom) { dom = s.dataset.dom; cap(sec ? (mod === 'tik' ? CT : C)[sec] : C[dom]); }
        if (s.dataset.mod) { mod = s.dataset.mod; cap(sec ? (mod === 'tik' ? CT : C)[sec] : C[dom]); }
        if (s.dataset.sak) { saK = s.dataset.sak; if (sec) cap((mod === 'tik' ? CT : C)[sec]); }
        ciz(); return;
      }
      const a = e.target.closest('[data-a]');
      if (a) { sec = a.dataset.a; cap((mod === 'tik' ? CT : C)[sec]); ciz(); return; }
      const k = e.target.closest('[data-k="kok"]');
      if (k) { sec = null; cap(C.kok); ciz(); }
    });
    klavye(el);
    kur();
    void zaman;
    const durRO = genislikIzle(el, kur);
    return () => durRO();
  };

  /* =====================================================================
     4 · Üç venöz sistem ve CRT kablolarının yolu
     ===================================================================== */
  VIZ.f27_ven = (el) => {
    const cap = capYazici(el);
    const C = {
      cs: '<b>Koroner sinüs.</b> LV\'nin venöz kanı kardiyak venlerde toplanır; venler birleşip koroner sinüsü yapar ve sinüs sağ atriyuma açılır. Bir sistem ya da "CRT kabloları" seçin. [[K1 s. 113]]',
      ant: '<b>Anterior kardiyak venler.</b> RV\'nin ön yüzünden çıkan küçük venlerdir; doğrudan sağ atriyuma açılır. [[K1 s. 113]]',
      the: '<b>Thebesius venleri.</b> Kardiyak venlerin en küçükleri; doğrudan dört boşluğa, çoğunlukla RA ve RV\'ye açılır. Sol boşluklara açılan birkaçı oksijeni azalmış kanı tam oksijenlenmiş kana katar ve anatomik şanta katkıda bulunur. [[K1 s. 113]] [[K1 s. 64]]',
      0: "<b>CRT · önce.</b> Sinüs ritminde, EF %35'in altında ve geniş QRS'li ileti kusuru olan kalp yetersizliğinde sağ ve sol ventrikül asenkron kasılır. [[K1 s. 113]]",
      1: "<b>1 · Atriyum kablosu.</b> Standart pillerdeki gibi subklavyen venden girer, VKS'den sağ atriyuma ilerler. [[K1 s. 113–114]]",
      2: "<b>2 · RV kablosu.</b> Aynı yoldan sağ atriyuma, oradan sağ ventriküle geçer. [[K1 s. 114]]",
      3: '<b>3 · LV kablosu.</b> O da sağ atriyuma gelir; koroner sinüse girer ve büyük kardiyak ven boyunca LV miyokardına ulaşır. Üç kablo atriyum ve ventrikül eşzamanlılığını düzeltir. [[K1 s. 113–114]]',
    };
    let mod = 'cs', dar = el.clientWidth < DAR, faz = 0, ilerle = 1, oyna = false, zaman = 0, fazT = 0, E = {};
    /* yüz çizimleri: yerel 260×200 */
    const V = {
      gcvA: [[192, 186], [186, 140], [176, 92], [214, 86], [256, 84]], // ön yüz: LAD yanında yukarı, sol AV oluk
      ant: [[[60, 140], [52, 108], [50, 84]], [[92, 150], [84, 112], [78, 84]], [[122, 136], [110, 106], [104, 86]]],
      gcvP: [[4, 84], [70, 86]],
      cs: [[70, 86], [180, 86], [188, 76]],
      mcv: [[138, 186], [146, 140], [150, 90]],
      scv: [[238, 98], [210, 92], [182, 88]],
      obl: [[58, 34], [70, 58], [86, 82]],
    };
    const arka = () => `<g class="f27-vn-yuz">
      ${T(130, 12, 'f27-lb', 'Arka-alt yüz', 'middle')}
      <rect x="30" y="22" width="92" height="58" rx="14" class="f27-sol-h f27-vn-oda"/><rect x="138" y="22" width="92" height="58" rx="14" class="f27-sag-h f27-vn-oda"/>
      ${T(76, 46, 'f27-tk2', 'LA', 'middle')}${T(184, 46, 'f27-tk2', 'RA', 'middle')}
      <path d="M220 58 L246 58 L246 118" class="f27-vn-vki"/>${T(250, 132, 'f27-tk', 'VKİ', 'end')}
      <path d="M18 92 C30 86, 230 86, 244 94 C244 150, 190 190, 140 196 C80 190, 20 150, 18 92 Z" class="f27-vn-vent"/>
      ${T(70, 172, 'f27-tk2 f27-ns', 'LV', 'middle')}${T(206, 160, 'f27-tk2 f27-ns', 'RV', 'middle')}
      <path d="M8 91 L246 93 M150 90 L140 194" class="f27-vn-oluk"/>
      <path d="M8 91 C60 92, 120 92, 172 91 M172 92 L240 96 M156 92 L144 186" class="f27-vn-art"/>
      <g class="f27-vn-s" data-s="cs">
        <path d="${pd(V.gcvP)}" class="f27-vn-v"/><path d="${pd(V.cs)}" class="f27-vn-v f27-vn-cs"/>
        <path d="${pd(V.mcv)}" class="f27-vn-v"/><path d="${pd(V.scv)}" class="f27-vn-v"/><path d="${pd(V.obl)}" class="f27-vn-v"/>
        <circle cx="189" cy="76" r="5" class="f27-vn-agiz"/>
        ${T(128, 104, 'f27-tk2 f27-hl', 'koroner sinüs', 'middle')}
        ${T(10, 78, 'f27-tk f27-hl', 'büyük kv. ven', 'start')}
        ${T(150, 152, 'f27-tk f27-hl', 'orta kv. ven', 'start')}${T(226, 112, 'f27-tk f27-hl', 'küçük kv. ven', 'end')}
        ${T(40, 30, 'f27-tk f27-hl', 'oblik ven', 'start')}
        <rect x="24" y="112" width="96" height="32" rx="8" class="f27-vn-kutu"/>${T(72, 125, 'f27-tk2', 'LV venöz kanı', 'middle')}${T(72, 139, 'f27-tk', 'venin ≈ %85\'i', 'middle')}
        ${T(196, 66, 'f27-tk f27-hl', 'ağız', 'start')}
      </g>
    </g>`;
    const on = () => `<g class="f27-vn-yuz">
      ${T(130, 12, 'f27-lb', 'Ön yüz', 'middle')}
      <rect x="24" y="22" width="88" height="60" rx="14" class="f27-sag-h f27-vn-oda"/><rect x="176" y="28" width="60" height="44" rx="12" class="f27-sol-h f27-vn-oda"/>
      ${T(68, 46, 'f27-tk2', 'RA', 'middle')}${T(206, 54, 'f27-tk2', 'LA', 'middle')}
      <path d="M120 82 L120 30 M156 82 L150 26" class="f27-vn-bd"/>
      <path d="M16 92 C30 86, 230 86, 248 94 C246 150, 216 186, 190 194 C120 192, 26 160, 16 92 Z" class="f27-vn-vent"/>
      ${T(96, 176, 'f27-tk2 f27-ns', 'RV', 'middle')}${T(222, 150, 'f27-tk2 f27-ns', 'LV', 'middle')}
      <path d="M16 90 L248 92 M174 90 L192 192" class="f27-vn-oluk"/>
      <path d="M180 90 C184 130, 190 160, 196 190" class="f27-vn-art"/>
      <g class="f27-vn-s" data-s="cs"><path d="${pd(V.gcvA)}" class="f27-vn-v"/>${T(196, 130, 'f27-tk f27-hl', 'büyük kv. ven', 'start')}${T(256, 78, 'f27-tk f27-hl', '→ arkaya', 'end')}</g>
      <g class="f27-vn-s" data-s="ant">${V.ant.map((p) => `<path d="${pd(p)}" class="f27-vn-v f27-vn-ince"/>`).join('')}${T(20, 192, 'f27-tk f27-hl', 'anterior kardiyak venler → RA', 'start')}</g>
    </g>`;
    const NOK = { ra: [[34, 40], [56, 34], [80, 46], [104, 36], [44, 70], [70, 80], [96, 70]], rv: [[34, 120], [60, 112], [92, 126], [110, 150], [44, 160], [74, 176], [100, 178]], la: [[178, 50], [214, 68]], lv: [[172, 140], [210, 160]] };
    const thebSvg = () => `<g class="f27-vn-yuz">
      ${T(130, 12, 'f27-lb', 'Dört boşluk (kesit)', 'middle')}
      <rect x="20" y="22" width="106" height="76" rx="12" class="f27-sag-h"/><rect x="134" y="22" width="106" height="76" rx="12" class="f27-sol-h"/>
      <rect x="20" y="104" width="106" height="88" rx="12" class="f27-sag-h"/><rect x="134" y="104" width="106" height="88" rx="12" class="f27-sol-h"/>
      ${T(73, 62, 'f27-tk2', 'RA', 'middle')}${T(187, 44, 'f27-tk2', 'LA', 'middle')}${T(73, 152, 'f27-tk2', 'RV', 'middle')}${T(187, 128, 'f27-tk2', 'LV', 'middle')}
      <g class="f27-vn-s" data-s="the">${Object.values(NOK).flat().map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" class="f27-vn-th"/>`).join('')}
        <g class="f27-vn-damla"></g>
        ${T(187, 92, 'f27-tk2 f27-wr f27-hl', 'anatomik şant', 'middle')}${T(187, 184, 'f27-tk2 f27-wr f27-hl', 'anatomik şant', 'middle')}
        ${T(73, 92, 'f27-tk f27-hl', 'çok (RA)', 'middle')}${T(73, 188, 'f27-tk f27-hl', 'çok (RV)', 'middle')}</g>
    </g>`;
    /* CRT: ön görünüm 360×330 */
    const KB = [
      [[352, 24], [134, 24], [134, 98], [114, 124]],
      [[352, 28], [130, 28], [130, 102], [140, 170], [150, 236], [122, 294]],
      [[352, 32], [126, 32], [126, 106], [160, 168], [220, 150], [290, 146], [322, 182], [326, 246]],
    ].map(hat);
    const crtSvg = () => `<svg class="f27-svg" viewBox="0 0 360 352" aria-label="Kardiyak resenkronizasyon tedavisi: üç kablonun subklavyen venden kalbe yolu">
      <path d="M356 28 L130 28 L130 100" class="f27-vn-bor"/>
      ${T(352, 16, 'f27-tk f27-hl', 'subklavyen ven', 'end')}${T(122, 62, 'f27-tk2 f27-hl', 'VKS', 'end')}
      <g class="f27-crt-lv"><path d="M206 154 C250 136, 316 140, 332 186 C344 240, 318 312, 262 322 C226 326, 206 300, 204 260 Z" class="f27-sol-h f27-crt-lvd"/>${T(274, 290, 'f27-lb', 'LV', 'middle')}</g>
      <g class="f27-crt-rv"><path d="M70 196 C110 182, 190 184, 204 200 C210 250, 190 300, 150 316 C110 320, 74 300, 70 250 Z" class="f27-sag-h"/>${T(104, 262, 'f27-lb', 'RV', 'middle')}</g>
      <rect x="62" y="96" width="112" height="86" rx="20" class="f27-sag-h"/>${T(84, 128, 'f27-lb', 'RA', 'middle')}
      <path d="M162 170 C190 158, 220 150, 290 146 C312 150, 324 168, 324 188 L328 250" class="f27-vn-cs2"/>
      <ellipse cx="160" cy="172" rx="7" ry="5" class="f27-vn-agiz"/>
      ${T(150, 158, 'f27-tk f27-hl', 'koroner sinüs ağzı', 'end')}${T(250, 138, 'f27-tk f27-hl', 'koroner sinüs', 'middle')}${T(314, 206, 'f27-tk f27-hl', 'büyük', 'end')}${T(314, 218, 'f27-tk f27-hl', 'kv. ven', 'end')}
      <g class="f27-crt-kab">${KB.map((h, i) => `<path d="${pd(h.pts)}" class="f27-kab" data-i="${i}" stroke-dasharray="${r1(h.top)}" stroke-dashoffset="${r1(h.top)}"/><circle r="4.5" class="f27-kab-uc" data-i="${i}" cx="${h.pts[h.pts.length - 1][0]}" cy="${h.pts[h.pts.length - 1][1]}"/>`).join('')}</g>
      <g class="f27-crt-dlg"></g>
      ${T(180, 346, 'f27-tk2 f27-wr f27-crt-not', '', 'middle')}
      
    </svg>`;
    const kur = () => {
      dar = el.clientWidth < DAR;
      let svg;
      if (mod === 'crt') svg = crtSvg();
      else {
        const sol = arka(), sag = mod === 'the' ? thebSvg() : on();
        svg = dar
          ? `<svg class="f27-svg" viewBox="0 0 360 548" aria-label="Kalbin arka ve ön yüzünde venler"><g transform="translate(11 4) scale(1.3)">${sol}</g><g transform="translate(11 278) scale(1.3)">${sag}</g><g class="f27-vn-par"></g></svg>`
          : `<svg class="f27-svg" viewBox="0 0 528 206" aria-label="Kalbin arka ve ön yüzünde venler"><g transform="translate(0 4)">${sol}</g><g transform="translate(268 4)">${sag}</g><g class="f27-vn-par"></g></svg>`;
      }
      el.innerHTML = `<div class="f27-ctl">${segHtml('Göster', 'm', [['cs', 'Koroner sinüs'], ['ant', 'Anterior kardiyak venler'], ['the', 'Thebesius venleri'], ['crt', 'CRT kabloları']], mod)}</div>
        ${mod === 'crt' ? adimHtml(['', 'Atriyum', 'RV', 'LV'], 'Oynat', ['Önce', '1', '2', '3']) : ''}
        <div class="f27-vn${dar ? ' f27-dar' : ''}${mod === 'crt' ? ' f27-vn-crt' : ''}">${svg}</div>
        ${mod === 'crt' ? '' : '<div class="legend"><span><i class="f27-li f27-li-ven"></i>ven (oksijeni azalmış kan)</span><span><i class="f27-li f27-li-art"></i>arter (soluk; aynı oluklarda)</span></div>'}`;
      E = { svg: el.querySelector('svg.f27-svg'), par: el.querySelector('.f27-vn-par') };
      if (mod !== 'crt') {
        el.querySelectorAll('.f27-vn-s').forEach((g) => g.classList.toggle('f27-on', g.dataset.s === mod));
        el.querySelectorAll('.f27-vn-s').forEach((g) => g.classList.toggle('f27-soluk', g.dataset.s !== mod));
        // parçacık yolları (svg koordinatına çevrilmiş)
        const tr = (pts, yuz) => pts.map(([x, y]) => (dar ? [11 + x * 1.3, (yuz ? 278 : 4) + y * 1.3] : [(yuz ? 268 : 0) + x, 4 + y]));
        let Y = [];
        if (mod === 'cs') Y = [tr([...V.gcvP, ...V.cs.slice(1)], 0), tr([...V.mcv, [150, 90], [180, 86], [188, 76]], 0), tr([...V.scv, [188, 76]], 0), tr([...V.obl, [180, 86], [188, 76]], 0), tr(V.gcvA, 1)];
        else if (mod === 'ant') Y = V.ant.map((p) => tr(p, 1));
        else {
          Y = [...NOK.la, ...NOK.lv].map(([x, y]) => tr([[x, y], [x + (x < 200 ? 16 : -16), y + 12]], 1));
          Y.push(...NOK.ra.slice(0, 3).map(([x, y]) => tr([[x, y], [x + 8, y + 12]], 1)));
        }
        E.Y = Y.map(hat);
        E.pc = [];
        E.Y.forEach((h, i) => {
          const n = mod === 'the' ? 1 : Math.max(2, Math.round(h.top / 40));
          for (let j = 0; j < n; j++) {
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('r', mod === 'the' ? 2.6 : 3); c.setAttribute('class', 'f27-par-m');
            E.par.appendChild(c); E.pc.push({ c, h, ph: j / n + i * 0.13 });
          }
        });
        cap(C[mod]);
      } else {
        E.kab = [...el.querySelectorAll('.f27-kab')]; E.uc = [...el.querySelectorAll('.f27-kab-uc')];
        E.lv = el.querySelector('.f27-crt-lv'); E.rv = el.querySelector('.f27-crt-rv'); E.dlg = el.querySelector('.f27-crt-dlg');
        E.not = el.querySelector('.f27-crt-not');
        fazAyar(faz, true);
        oynaAyar(oyna);
      }
      ciz(0);
    };
    const fazAyar = (n, sessiz) => {
      faz = clamp(n, 0, 3); fazT = 0; ilerle = RM || faz === 0 ? 1 : 0;
      fazGuncelle(el, faz);
      cap(C[faz]);
      void sessiz;
    };
    const oynaAyar = (on2) => { oyna = on2 && !RM; const b = el.querySelector('[data-a="oyn"]'); if (b) { b.setAttribute('aria-pressed', String(oyna)); b.textContent = oyna ? 'Duraklat' : 'Oynat'; } };
    const ciz = (dt) => {
      zaman += dt;
      if (mod !== 'crt') {
        if (!E.pc) return;
        E.pc.forEach((p) => {
          if (RM) { p.c.setAttribute('opacity', 0); return; }
          const f = ((zaman * (mod === 'the' ? 0.5 : 40 / Math.max(40, p.h.top))) + p.ph) % 1;
          const [x, y] = hatAt(p.h, f);
          at(p.c, { cx: x, cy: y });
          p.c.setAttribute('opacity', f < 0.08 ? f / 0.08 : f > 0.9 ? (1 - f) / 0.1 : 1);
        });
        return;
      }
      fazT += dt;
      if (!RM && faz > 0 && ilerle < 1) ilerle = clamp(fazT / 1.5, 0, 1);
      if (oyna && fazT > (faz === 0 ? 1.2 : 2.0)) { if (faz < 3) fazAyar(faz + 1); else oynaAyar(false); }
      E.kab.forEach((p, i) => {
        const L = KB[i].top, f = RM || i + 1 < faz ? 1 : i + 1 === faz ? ilerle : 0;
        p.setAttribute('stroke-dashoffset', r1(L * (1 - f)));
        p.classList.toggle('f27-on', i + 1 === faz);
        E.uc[i].setAttribute('opacity', f >= 0.999 ? 1 : 0);
      });
      const senk = faz === 3 && ilerle >= 0.999;
      // vuru: 1 s'lik döngü; RV önce, LV 0,25 s gecikmeli (asenkron) ya da birlikte
      const ph = RM ? 0.12 : zaman % 1;
      const sik = (p) => (p >= 0 && p < 0.35 ? Math.sin((p / 0.35) * Math.PI) : 0);
      const kR = sik(ph), kL = senk ? kR : sik((ph - 0.28 + 1) % 1);
      const sk = (g, k, cx, cy) => g.setAttribute('transform', `translate(${cx} ${cy}) scale(${(1 - 0.07 * k).toFixed(4)}) translate(${-cx} ${-cy})`);
      sk(E.rv, RM ? 0 : kR, 137, 252); sk(E.lv, RM ? 0 : kL, 270, 236);
      E.not.textContent = senk ? 'resenkronizasyon: iki ventrikül birlikte kasılır' : faz === 0 || faz < 3 ? 'geniş QRS · asenkron kasılma' : '';
      E.not.setAttribute('class', `f27-tk2 f27-crt-not ${senk ? 'f27-okt' : 'f27-wr'}`);
      if (senk && !RM) {
        const r = 4 + (ph % 1) * 26;
        E.dlg.innerHTML = [0, 1, 2].map((i) => { const p = KB[i].pts[KB[i].pts.length - 1]; return `<circle cx="${p[0]}" cy="${p[1]}" r="${r1(r)}" class="f27-dalga" opacity="${r1(1 - ph)}"/>`; }).join('');
      } else if (senk && RM) {
        E.dlg.innerHTML = [0, 1, 2].map((i) => { const p = KB[i].pts[KB[i].pts.length - 1]; return `<circle cx="${p[0]}" cy="${p[1]}" r="12" class="f27-dalga" opacity="0.8"/>`; }).join('');
      } else E.dlg.innerHTML = '';
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const m = e.target.closest('[data-m]');
      if (m) { mod = m.dataset.m; zaman = 0; if (mod === 'crt') { faz = 0; oyna = false; } kur(); return; }
      const a = e.target.closest('[data-a]');
      if (a) {
        const k = a.dataset.a;
        if (k === 'geri') { oynaAyar(false); fazAyar(faz - 1); }
        else if (k === 'ileri') { oynaAyar(false); fazAyar(faz + 1); }
        else if (k === 'oyn') { if (!oyna && faz === 3) fazAyar(0); oynaAyar(!oyna); }
        return;
      }
      const f = e.target.closest('.f27-faz button');
      if (f) { oynaAyar(false); fazAyar(+f.dataset.i); }
    });
    kur();
    const durRO = genislikIzle(el, kur);
    const dur = ticker(el, (dt) => ciz(dt));
    return () => { dur(); durRO(); };
  };

  /* =====================================================================
     5 · Kalp döngüsünde sol ve sağ koroner akım
     ===================================================================== */
  VIZ.f27_akim = (el) => {
    const cap = capYazici(el);
    const AO = { s: [[0, 80], [0.14, 79], [0.3, 104], [0.48, 119], [0.62, 120], [0.8, 113], [0.94, 104], [1, 99]], d: [[0, 99], [0.05, 103], [0.2, 98], [0.5, 90], [1, 80]] };
    const LC = { s: [[0, 82], [0.1, 12], [0.22, 22], [0.5, 36], [0.8, 32], [1, 28]], d: [[0, 28], [0.1, 140], [0.2, 147], [0.5, 120], [1, 82]] };
    const RC = { s: [[0, 13], [0.12, 11], [0.35, 21], [0.55, 24], [0.8, 22], [1, 17]], d: [[0, 17], [0.1, 15], [0.5, 13.5], [1, 13]] };
    let HR = 60, oyna = !RM, tc = 0.62, dar = el.clientWidth < DAR, E = {};
    const sure = () => { const T0 = 60 / HR, S = 0.3 * Math.pow(60 / HR, 0.25); return { T: T0, S, D: T0 - S }; };
    const deger = (K, tau, m) => (tau < m.S ? kp(K.s, tau / m.S) : kp(K.d, (tau - m.S) / m.D));
    const kur = () => {
      dar = el.clientWidth < DAR;
      el.innerHTML = `<div class="f27-ctl f27-ak-ctl">
          <label class="f27-rng"><span>Kalp hızı <b data-o="hr"></b></span><input type="range" min="60" max="150" step="5" value="${HR}" aria-label="Kalp hızı"></label>
          ${RM ? '' : '<button type="button" class="btn ghost" data-a="oyn" aria-pressed="true">Duraklat</button>'}
        </div>
        <div class="f27-ak${dar ? ' f27-dar' : ''}">
          <div class="f27-ak-gr"><svg class="f27-svg" viewBox="0 0 ${dar ? 360 : 520} 418" aria-label="Bir kalp döngüsünde aort basıncı, sol koroner akım ve sağ koroner akım eğrileri"></svg></div>
          <div class="f27-ak-yan">
            <svg class="f27-svg f27-ak-duvar" viewBox="0 0 250 264" aria-label="Sol ve sağ ventrikül duvar dilimi: sistolde LV intramural arteriyolleri sıkışır"></svg>
            <dl class="f27-oku"></dl>
            <p class="f27-not">${REF('İstirahat: 250 mL/dk = kalp debisinin %5\'i; egzersizde 5 katına dek · O₂ ekstraksiyonu ≈ %70 (iskelet kası %25) [[K1 s. 114]]')}</p>
          </div>
        </div>`;
      E = { gr: el.querySelector('.f27-ak-gr svg'), dv: el.querySelector('.f27-ak-duvar'), oku: el.querySelector('.f27-oku'), hr: el.querySelector('[data-o="hr"]') };
      ciz();
    };
    const ciz = () => {
      const m = sure(), W = dar ? 360 : 520, L = 46, R = W - 14, X = (tau) => L + (tau / m.T) * (R - L);
      const G = [
        { ad: dar ? 'Aort (mmHg)' : 'Aort basıncı (mmHg)', K: AO, y0: 34, y1: 118, v0: 80, v1: 120, tk: [80, 90, 100, 110, 120], cls: 'f27-ak-ao' },
        { ad: dar ? 'Sol koroner (mL/100 g/dk)' : 'Sol koroner akım (mL/100 g/dk)', K: LC, y0: 156, y1: 262, v0: 0, v1: 200, tk: [0, 50, 100, 150, 200], cls: 'f27-ak-lc' },
        { ad: dar ? 'Sağ koroner (aynı birim) · ölçek farklı' : 'Sağ koroner akım (mL/100 g/dk) · ölçek farklı', K: RC, y0: 300, y1: 372, v0: 0, v1: 30, tk: [0, 10, 20, 30], cls: 'f27-ak-rc' },
      ];
      const xs = X(m.S);
      let s = `<rect x="${L}" y="20" width="${r1(xs - L)}" height="354" class="f27-ak-sis"/><rect x="${r1(xs)}" y="20" width="${r1(R - xs)}" height="354" class="f27-ak-dia"/>`;
      s += T((L + xs) / 2, 14, 'f27-tk2 f27-wr', 'SİSTOL', 'middle') + T((xs + R) / 2, 14, 'f27-tk2', 'DİYASTOL', 'middle');
      G.forEach((g) => {
        const Y = (v) => g.y1 - ((v - g.v0) / (g.v1 - g.v0)) * (g.y1 - g.y0);
        g.Y = Y;
        s += T(dar ? 4 : L, g.y0 - 8, 'f27-lb f27-hl', g.ad);
        g.tk.forEach((v) => { s += `<line x1="${L}" y1="${r1(Y(v))}" x2="${R}" y2="${r1(Y(v))}" class="f27-izg"/>` + T(L - 5, Y(v) + 4, 'f27-tk', v, 'end'); });
        const N = 140, pts = [];
        for (let i = 0; i <= N; i++) { const tau = (i / N) * m.T; pts.push([X(tau), Y(deger(g.K, tau, m))]); }
        if (g.cls === 'f27-ak-lc') {
          const dp = pts.filter((p) => p[0] >= xs - 0.01);
          s += `<path d="${pd(dp)} L${r1(R)} ${r1(Y(0))} L${r1(xs)} ${r1(Y(0))} Z" class="${HR > 110 ? 'f27-ak-dolw' : 'f27-ak-dol'}"/>`;
        }
        s += `<path d="${pd(pts)}" class="f27-ak-e ${g.cls}"/>`;
      });
      // etiketler
      const gA = G[0], gL = G[1], gR = G[2];
      s += `<circle cx="${r1(xs)}" cy="${r1(gA.Y(99))}" r="3" class="f27-ak-nok"/>` + T(xs + 6, gA.Y(105) - 2, 'f27-tk f27-hl', 'dikrotik çentik');
      const xi = X(m.S * 0.1);
      s += T(Math.min(xi + 8, R - 4), gL.Y(58), 'f27-tk f27-hl f27-ak-izo', dar ? 'izovolümetrik kasılma: keskin düşüş' : 'izovolümetrik kasılmada keskin düşüş');
      s += T(R - 4, gL.Y(180), 'f27-tk2 f27-hl f27-okt', HR > 110 ? '' : 'diyastolde daha çok akım', 'end');
      if (HR > 110) s += T(R - 4, gL.Y(180), 'f27-tk2 f27-wr f27-hl', 'diyastol kısaldı → sol koroner akım ↓', 'end');
      s += T((L + xs) / 2, gR.Y(28) + 2, 'f27-tk f27-hl f27-bsc', 'sistolde daha çok akım', 'middle');
      // zaman ekseni
      const adimS = m.T > 0.7 ? 0.25 : 0.1, ond = adimS < 0.2 ? 1 : 2;
      for (let v = 0; v <= m.T + 1e-6; v += adimS) s += `<line x1="${r1(X(v))}" y1="374" x2="${r1(X(v))}" y2="379" class="f27-eks"/>` + T(X(v), 392, 'f27-tk', fmt(v, ond), 'middle');
      s += `<line x1="${L}" y1="374" x2="${R}" y2="374" class="f27-eks"/>` + T((L + R) / 2, 410, 'f27-tk', `Zaman (s) · bir döngü = ${fmt(m.T, 2)} s`, 'middle');
      s += `<g class="f27-ak-imc"><line y1="20" y2="374" class="f27-ak-im"/>${G.map((g, i) => `<circle r="4" class="f27-ak-imn ${g.cls}" data-g="${i}"/><text class="f27-tk2 f27-hl f27-ak-imt" data-g="${i}"></text>`).join('')}</g>`;
      E.gr.innerHTML = s;
      E.G = G; E.X = X; E.m = m;
      E.imc = E.gr.querySelector('.f27-ak-imc');
      E.hr.textContent = `${HR} /dk`;
      const Dm = m.D * HR, rel = (Dm / (0.7 * 60)) * 100, rr = 100 - (5 * (HR - 60)) / 90;
      E.oku.innerHTML = `<div><dt>Döngü süresi</dt><dd>${fmt(m.T, 2)} s</dd></div><div><dt>Sistol</dt><dd>${fmt(m.S, 2)} s</dd></div><div><dt>Diyastol</dt><dd>${fmt(m.D, 2)} s</dd></div><div><dt>Diyastol oranı</dt><dd>%${Math.round((m.D / m.T) * 100)}</dd></div>
        <div><dt>Sol koroner akım (dakikada, göreli)</dt><dd class="${HR > 110 ? 'f27-wr-t' : ''}">%${Math.round(rel)}</dd></div><div><dt>Sağ koroner akım (göreli)</dt><dd>%${Math.round(rr)}</dd></div>`;
      imlec();
    };
    const duvar = (comp) => {
      // LV dilimi (kalın) ve RV dilimi (ince); comp 0 diyastol, 1 sistol
      const lvDilim = (x, w, k, etk) => {
        const h = 96 + 26 * k, y0 = 46, aw = 9 - 7.2 * k;
        let s = `<rect x="${x}" y="${y0 - 6}" width="${w}" height="6" class="f27-ak-epi"/><rect x="${x}" y="${y0}" width="${w}" height="${r1(h)}" class="f27-ak-mio${k > 0.5 ? ' f27-ak-mio-s' : ''}"/>`;
        s += `<rect x="${x}" y="${r1(y0 + h)}" width="${w}" height="${r1(176 - h)}" class="f27-ak-bos"/>`;
        s += `<circle cx="${x + w / 2}" cy="${y0 - 12}" r="9" class="f27-ak-kor"/>`;
        [0.22, 0.5, 0.78].forEach((f) => { s += `<rect x="${r1(x + w * f - aw / 2)}" y="${y0}" width="${r1(aw)}" height="${r1(h - 10)}" rx="${r1(aw / 2)}" class="f27-ak-art"/>`; });
        s += T(x + w / 2, 212, 'f27-tk', 'LV boşluğu', 'middle');
        if (etk) s += T(x + w / 2, 14, 'f27-tk2', etk, 'middle');
        return s;
      };
      const rvDilim = (x, w) => {
        const y0 = 46, h = 40;
        let s = `<rect x="${x}" y="${y0 - 6}" width="${w}" height="6" class="f27-ak-epi"/><rect x="${x}" y="${y0}" width="${w}" height="${h}" class="f27-ak-mio"/><rect x="${x}" y="${y0 + h}" width="${w}" height="40" class="f27-ak-bos"/>`;
        s += `<circle cx="${x + w / 2}" cy="${y0 - 12}" r="7" class="f27-ak-kor"/>`;
        [0.3, 0.7].forEach((f) => { s += `<rect x="${r1(x + w * f - 4)}" y="${y0}" width="8" height="${h - 8}" rx="4" class="f27-ak-art"/>`; });
        s += T(x + w / 2, 14, 'f27-tk2', 'RV duvarı', 'middle');
        s += T(x + w / 2, y0 + h + 58, 'f27-tk f27-bsc', 'RV basıncı', 'middle') + T(x + w / 2, y0 + h + 72, 'f27-tk f27-bsc', 'düşük →', 'middle') + T(x + w / 2, y0 + h + 86, 'f27-tk f27-bsc', 'sistolde de', 'middle') + T(x + w / 2, y0 + h + 100, 'f27-tk f27-bsc', 'akım', 'middle');
        return s;
      };
      let s = '';
      if (RM) {
        s += lvDilim(4, 76, 1, 'LV sistol') + lvDilim(88, 76, 0, 'LV diyastol') + rvDilim(178, 66);
        s += T(42, 246, 'f27-tk2 f27-wr', 'sıkışık', 'middle') + T(126, 246, 'f27-tk2 f27-okt', 'açık', 'middle');
      } else {
        s += lvDilim(4, 150, comp, comp > 0.5 ? 'LV duvarı · sistol' : 'LV duvarı · diyastol') + rvDilim(178, 66);
        s += `<g class="f27-ak-ip"></g>`;
        if (comp > 0.5) s += T(79, 240, 'f27-tk2 f27-wr', 'intramural basınç', 'middle') + T(79, 255, 'f27-tk2 f27-wr', '> koroner basınç', 'middle');
        else s += T(79, 240, 'f27-tk2 f27-okt', 'arteriyoller açık:', 'middle') + T(79, 255, 'f27-tk2 f27-okt', 'akım sürer', 'middle');
      }
      return s;
    };
    let sonComp = -1, akT = 0;
    const imlec = () => {
      const m = E.m, tau = tc * m.T;
      const sis = tau < m.S;
      const comp = sis ? clamp(Math.min(tau / (0.12 * m.S), (m.S - tau) / (0.12 * m.S)), 0, 1) : 0;
      const cb = comp > 0.5 ? 1 : 0;
      if (RM) { if (sonComp !== 2) { E.dv.innerHTML = duvar(0); sonComp = 2; } }
      else if (cb !== sonComp) { E.dv.innerHTML = duvar(cb); sonComp = cb; }
      if (!RM) {
        // arteriyol içinde parçacıklar: diyastolde akar, sistolde durur
        const ip = E.dv.querySelector('.f27-ak-ip');
        if (ip) {
          let s = '';
          [0.22, 0.5, 0.78].forEach((f, i) => { for (let j = 0; j < 3; j++) { const ff = ((cb ? 0.35 : akT * 0.8) + j / 3 + i * 0.1) % 1; s += `<circle cx="${r1(4 + 150 * f)}" cy="${r1(48 + ff * (cb ? 108 : 84))}" r="${cb ? 1.2 : 2.4}" class="f27-par-k"/>`; } });
          [0.3, 0.7].forEach((f, i) => { for (let j = 0; j < 2; j++) { const ff = (akT * 0.8 + j / 2 + i * 0.2) % 1; s += `<circle cx="${r1(178 + 66 * f)}" cy="${r1(48 + ff * 28)}" r="2.2" class="f27-par-k"/>`; } });
          ip.innerHTML = s;
        }
      }
      if (!E.imc) return;
      E.imc.style.display = RM ? 'none' : '';
      if (RM) return;
      const x = E.X(tau);
      at(E.imc.querySelector('.f27-ak-im'), { x1: x, x2: x });
      E.G.forEach((g, i) => {
        const v = deger(g.K, tau, m), y = g.Y(v);
        at(E.imc.querySelector(`circle[data-g="${i}"]`), { cx: x, cy: y });
        const tx = E.imc.querySelector(`text[data-g="${i}"]`);
        at(tx, { x: (dar ? 360 : 520) - 14, y: g.y0 - 8 });
        tx.setAttribute('text-anchor', 'end');
        tx.textContent = `imleç ${Math.round(v)}`;
      });
      if (!oyna) cap(sis ? '<b>Sistol.</b> İzovolümetrik kasılmada sol koroner akım keskin düşer; sağ koroner akım ise sistolde daha yüksektir, çünkü RV basıncı çok düşüktür. [[K1 s. 114]]' : '<b>Diyastol.</b> Kalp gevşer, intramural basınç düşer ve sol koroner akım yeniden başlar: LV\'nin akımı aralıklıdır. [[K1 s. 114]]');
    };
    const hrCap = () => {
      const m = sure();
      if (HR === 60) cap(null);
      else cap(`<b>Kalp hızı ${HR}/dk.</b> Diyastol ${fmt(m.D, 2)} s'ye, sistol ${fmt(m.S, 2)} s'ye indi; diyastol sistolden çok daha fazla kısaldı. Sol koroner akım azalır, sağ koroner akım görece etkilenmez. [[K1 s. 115]]`);
    };
    el.addEventListener('input', (e) => { if (e.target.type === 'range') { HR = +e.target.value; ciz(); hrCap(); } });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a="oyn"]');
      if (!b) return;
      oyna = !oyna; b.setAttribute('aria-pressed', String(oyna)); b.textContent = oyna ? 'Duraklat' : 'Oynat';
      if (oyna) hrCap(); else imlec();
    });
    kur();
    const durRO = genislikIzle(el, kur);
    const dur = ticker(el, (dt) => {
      if (RM) return;
      akT += dt;
      if (oyna) tc = (tc + (dt * 0.5) / E.m.T) % 1; // imleç yarı hızda
      imlec();
    });
    return () => { dur(); durRO(); };
  };

  /* =====================================================================
     6 · Otoregülasyon, O₂ talebi ve darlık
     ===================================================================== */
  VIZ.f27_otoreg = (el) => {
    const cap = capYazici(el);
    let A = 90, LV = 10, ex = false, ath = false, dar = el.clientWidth < DAR, E = {}, zaman = 0;
    const qN = (p) => (p < 60 ? p / 60 : p <= 180 ? 1 : 1 + (p - 180) / 120);
    const qE = (p) => (p < 60 ? p / 60 : p <= 180 ? Math.min(2, p / 60) : 2 + (p - 180) / 120);
    const Q = (p) => { let q = ex ? qE(p) : qN(p); if (ath) q = Math.min(q, 1); return q; };
    const cpp = () => Math.max(0, A - LV);
    const cap2 = () => {
      const c = cpp(), ek = LV >= 20 ? ' Yüksek LVEDP, aort basıncı değişmese de CPP\'yi düşürür. [[K1 s. 115]]' : '';
      let h;
      if (ath && ex) h = '<b>Ateromlu darlık, egzersiz.</b> Ateromlu arter artan O₂ talebine karşın genişleyemez; aşağıdaki miyokard yeterli O₂ alamaz ve iskemiye girer. Akut tıkanma (tromboz, emboli, vazospazm) ise talep artmadan da iskemi yapar. [[K1 s. 115]]';
      else if (ath && c >= 60) h = '<b>Ateromlu darlık, istirahat.</b> Akım şimdilik yetiyor. Kronik aterom aşağıdaki dokuda iskemik ön koşullanma sağlar ve öteki koroner arterlerden kollateraller gelişebilir; bu yüzden yavaş darlık, akut tıkanmadan daha ileri derecede tolere edilir. [[K1 s. 115]]';
      else if (c < 60) h = `<b>CPP ${c} mmHg: otoregülasyonun altı.</b> 60 mmHg'de arteriyoller zaten en geniştir; basınç daha düşerse koroner akım basınçla birlikte düşer. [[K1 s. 115]]`;
      else if (ex && c < 120) h = '<b>Egzersiz, düşük perfüzyon basıncı.</b> Arteriyoller genişlemiş olsa da basınç yetmez; akım talebi karşılayamaz ve iskemi gelişir. [[K1 s. 115]]';
      else if (ex) h = '<b>Egzersiz.</b> Kardiyak iş artınca sitozolik ATP azalır, AMP artar; miyositlerden salınan adenozin koroner arteriyolleri genişletir ve akım talebi karşılar. Öteki olası aracılar K⁺, CO₂, H⁺ ve NO\'dur. [[K1 s. 114–115]]';
      else if (c > 180) h = `<b>CPP ${c} mmHg: otoregülasyonun üstü.</b> Arteriyoller daha fazla daralamaz; akım basınçla artar. [[K1 s. 115]]`;
      else h = `<b>Koroner perfüzyon basıncı ${c} mmHg.</b> Aort basıncı ${A}, LVEDP ${LV} mmHg; basınç 60–180 mmHg arasında kaldıkça arteriyoller çaplarını değiştirerek akımı sabit tutar. Basıncı, O₂ talebini ve darlığı değiştirin. [[K1 s. 115]]`;
      cap(h + ek);
    };
    const kur = () => {
      dar = el.clientWidth < DAR;
      el.innerHTML = `<div class="f27-ctl f27-or-ctl">
          <label class="f27-rng"><span>Aort basıncı <b data-o="a"></b></span><input type="range" min="30" max="220" step="5" value="${A}" data-r="a" aria-label="Aort basıncı"></label>
          <label class="f27-rng"><span>LVEDP <b data-o="l"></b></span><input type="range" min="0" max="30" step="1" value="${LV}" data-r="l" aria-label="LVEDP"></label>
          ${segHtml('O₂ talebi', 'ex', [['0', 'İstirahat'], ['1', 'Egzersiz']], ex ? '1' : '0')}${segHtml('Damar', 'ath', [['0', 'Normal'], ['1', 'Ateromlu darlık']], ath ? '1' : '0')}
        </div>
        <p class="f27-or-cpp" data-o="cpp"></p>
        <div class="f27-or${dar ? ' f27-dar' : ''}">
          <div class="f27-or-gr"><svg class="f27-svg" viewBox="0 0 ${dar ? 360 : 420} ${dar ? 270 : 300}" aria-label="Koroner otoregülasyon eğrisi: perfüzyon basıncına karşı koroner akım"></svg></div>
          <div class="f27-or-yan"><svg class="f27-svg f27-or-art" viewBox="0 0 240 200" aria-label="Koroner arteriyol ve miyosit: çap ve adenozin"></svg>
            <div class="meters f27-or-m"><div class="meter" data-m="q"><div class="t">Koroner akım (göreli)</div><div class="v"></div><div class="trk"><div class="fl"></div></div></div>
            <div class="meter" data-m="o"><div class="t">O₂ dengesi</div><div class="v"></div><div class="trk"><div class="fl"></div></div></div></div>
          </div>
        </div>`;
      E = { gr: el.querySelector('.f27-or-gr svg'), ar: el.querySelector('.f27-or-art'), cpp: el.querySelector('[data-o="cpp"]'), a: el.querySelector('[data-o="a"]'), l: el.querySelector('[data-o="l"]'), mq: el.querySelector('[data-m="q"]'), mo: el.querySelector('[data-m="o"]') };
      ciz();
    };
    const ciz = () => {
      const W = dar ? 360 : 420, H = dar ? 270 : 300, L = 44, R = W - 12, Tp = 22, B = H - 50;
      const X = (p) => L + (p / 220) * (R - L), Y = (q) => B - (q / 2.6) * (B - Tp);
      const c = cpp(), q = Q(c), talep = ex ? 2 : 1;
      let s = `<rect x="${r1(X(60))}" y="${Tp}" width="${r1(X(180) - X(60))}" height="${r1(B - Tp)}" class="f27-or-band"/>`;
      s += T((X(60) + X(180)) / 2, Tp + 14, 'f27-tk2 f27-okt', 'otoregülasyon aralığı 60–180', 'middle');
      [0, 60, 100, 140, 180, 220].forEach((v) => { s += `<line x1="${r1(X(v))}" y1="${B}" x2="${r1(X(v))}" y2="${B + 5}" class="f27-eks"/>` + T(X(v), B + 18, 'f27-tk', v, 'middle'); });
      [1, 2].forEach((v) => { s += `<line x1="${L}" y1="${r1(Y(v))}" x2="${R}" y2="${r1(Y(v))}" class="f27-izg"/>` + T(L - 5, Y(v) + 4, 'f27-tk', v === 1 ? '1' : '2', 'end'); });
      s += T(L - 5, Y(0) + 4, 'f27-tk', '0', 'end');
      s += `<line x1="${L}" y1="${B}" x2="${R}" y2="${B}" class="f27-eks"/><line x1="${L}" y1="${Tp}" x2="${L}" y2="${B}" class="f27-eks"/>`;
      s += T((L + R) / 2, B + 36, 'f27-tk', 'Koroner perfüzyon basıncı (mmHg)', 'middle');
      s += `<text class="f27-tk" transform="translate(12 ${r1((Tp + B) / 2)}) rotate(-90)" text-anchor="middle">Koroner akım (göreli; 1 = istirahat)</text>`;
      s += `<line x1="${r1(X(60))}" y1="${Tp + 22}" x2="${r1(X(60))}" y2="${B}" class="f27-or-60"/>` + T(X(60) + 4, Y(0.35), 'f27-tk f27-hl', 'arteriyoller', 'start') + T(X(60) + 4, Y(0.35) + 12, 'f27-tk f27-hl', 'en geniş', 'start');
      const egri = (f) => { const p = []; for (let v = 0; v <= 220; v += 2) p.push([X(v), Y(f(v))]); return pd(p); };
      if (ex || ath) s += `<path d="${egri(qN)}" class="f27-or-e0"/>`;
      s += `<path d="${egri(Q)}" class="f27-or-e"/>`;
      s += `<line x1="${L}" y1="${r1(Y(talep))}" x2="${R}" y2="${r1(Y(talep))}" class="f27-or-tal"/>` + T(R - 4, Y(talep) - 5, 'f27-tk2 f27-wr f27-hl', `O₂ talebi (${ex ? 'egzersiz' : 'istirahat'})`, 'end');
      s += `<line x1="${r1(X(Math.min(c, 220)))}" y1="${r1(Y(q))}" x2="${r1(X(Math.min(c, 220)))}" y2="${B}" class="f27-or-kes"/><circle cx="${r1(X(Math.min(c, 220)))}" cy="${r1(Y(q))}" r="6" class="f27-or-nok"/>`;
      E.gr.innerHTML = s;
      E.a.textContent = `${A} mmHg`; E.l.textContent = `${LV} mmHg`;
      E.cpp.innerHTML = `CPP = ${A} − ${LV} = <b>${c} mmHg</b>`;
      // arteriyol
      let d = c < 60 ? 1 : c <= 180 ? 0.5 + 0.5 * ((60 / c - 1 / 3) / (2 / 3)) : 0.5;
      if (ex) d = c <= 120 ? 1.3 : c <= 180 ? 1.3 - (0.4 * (c - 120)) / 60 : 0.9;
      E.d = d; E.q = q;
      const yc = 62, hw = 9 + 14 * d;
      let a = `<path d="M10 ${r1(yc - hw)} L230 ${r1(yc - hw)} M10 ${r1(yc + hw)} L230 ${r1(yc + hw)}" class="f27-or-duv"/>`;
      a += `<rect x="10" y="${r1(yc - hw + 2)}" width="220" height="${r1(2 * hw - 4)}" class="f27-or-lum"/>`;
      for (let x = 22; x < 230; x += 16) a += `<path d="M${x} ${r1(yc - hw - 6)} l0 6 M${x} ${r1(yc + hw)} l0 6" class="f27-or-kas"/>`;
      if (ath) a += `<path d="M30 ${r1(yc - hw)} Q55 ${r1(yc - 4)} 80 ${r1(yc - hw)} Z M30 ${r1(yc + hw)} Q55 ${r1(yc + 4)} 80 ${r1(yc + hw)} Z" class="f27-or-ath"/>` + T(55, yc - hw - 12, 'f27-tk2 f27-wr', 'aterom: genişleyemez', 'start');
      a += T(236, 18, 'f27-tk2', `arteriyol · çap ×${fmt(d, 2)}`, 'end');
      a += `<g class="f27-or-par"></g>`;
      a += `<rect x="40" y="128" width="160" height="40" rx="10" class="f27-or-mio"/>` + T(120, 144, 'f27-tk2', 'miyosit', 'middle');
      a += T(120, 160, 'f27-tk2 f27-ac', ex ? 'iş ↑ · ATP ↓ AMP ↑ → adenozin' : 'istirahat', 'middle');
      a += T(120, 190, 'f27-tk', 'öteki olası aracılar: K⁺, CO₂, H⁺, NO', 'middle');
      a += `<g class="f27-or-ado"></g>`;
      E.ar.innerHTML = a;
      E.par = E.ar.querySelector('.f27-or-par'); E.ado = E.ar.querySelector('.f27-or-ado'); E.yc = yc; E.hw = hw;
      const mq = E.mq, mo = E.mo, ok = q >= talep - 1e-6;
      mq.querySelector('.v').innerHTML = `${fmt(q, 2)}<small>×</small>`;
      mq.querySelector('.fl').style.width = `${clamp((q / 2.6) * 100, 0, 100)}%`; mq.classList.add('ok');
      mo.className = `meter ${ok ? 'ok' : 'f27-m-wr'}`;
      mo.querySelector('.v').innerHTML = ok ? 'yeterli' : 'iskemi';
      mo.querySelector('.fl').style.width = `${clamp((q / talep) * 100, 0, 100)}%`;
      basSec(el, 'ex', ex ? '1' : '0'); basSec(el, 'ath', ath ? '1' : '0');
      parc(0);
    };
    const parc = (dt) => {
      zaman += dt;
      if (!E.par) return;
      let s = '';
      const n = 9;
      for (let i = 0; i < n; i++) {
        const f = RM ? (i + 0.5) / n : ((zaman * 0.25 * E.q) + i / n) % 1;
        const y = E.yc + ((i % 3) - 1) * (E.hw * 0.5);
        s += `<circle cx="${r1(14 + f * 212)}" cy="${r1(y)}" r="3" class="f27-par-k"/>`;
      }
      E.par.innerHTML = s;
      let a = '';
      if (ex) for (let i = 0; i < 6; i++) {
        const f = RM ? 0.5 : ((zaman * 0.5) + i / 6) % 1;
        const x = 70 + i * 20, y = lerp(126, E.yc + E.hw + 4, f);
        a += `<circle cx="${x}" cy="${r1(y)}" r="3.2" class="f27-or-adn"/>`;
      }
      if (ex) a += T(206, 112, 'f27-tk2 f27-ac', 'adenozin', 'end');
      E.ado.innerHTML = a;
    };
    el.addEventListener('input', (e) => { const r = e.target.dataset.r; if (!r) return; if (r === 'a') A = +e.target.value; else LV = +e.target.value; ciz(); cap2(); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex],[data-ath]');
      if (!b) return;
      if (b.dataset.ex != null) ex = b.dataset.ex === '1';
      if (b.dataset.ath != null) ath = b.dataset.ath === '1';
      ciz(); cap2();
    });
    kur();
    const durRO = genislikIzle(el, kur);
    const dur = RM ? () => {} : ticker(el, (dt) => parc(dt));
    return () => { dur(); durRO(); };
  };

  /* =====================================================================
     7 · Miyokard O₂ sunumu ile talebi arasındaki terazi
     ===================================================================== */
  VIZ.f27_ilac = (el) => {
    const cap = capYazici(el);
    const BEL = { sun: [['akim', 'Koroner akım'], ['dia', 'Diyastol süresi'], ['acik', 'Damar açıklığı (trombüs/plak)']], tal: [['hiz', 'Kalp hızı'], ['kon', 'Kontraktilite'], ['on', 'Önyük'], ['ard', 'Ardyük']] };
    const IL = {
      yok: { ad: 'İlaçsız', p: 0, o: {}, z: [], c: '<b>İlaçsız.</b> Terazinin bir kefesinde koroner akımla gelen O₂ sunumu, ötekinde kalp hızı, kontraktilite, önyük ve ardyükün belirlediği O₂ talebi var. Bir ilaç seçin. [[K1 s. 114–115]]' },
      nit: { ad: 'Nitrat', p: 2, o: { akim: ['↓', 'arterler genişler, ama talep ↓ → toplam akım ↓'], on: ['↓', 'venodilatasyon'], ard: ['↓', 'periferik vazodilatasyon'] }, z: ['Koroner + venöz + periferik vazodilatasyon', 'önyük ↓, ardyük ↓', 'O₂ talebi ↓', 'toplam koroner akım ↓'], c: '<b>Nitratlar.</b> Koroner arterleri genişletir; ayrıca venodilatasyonla önyük, periferik vazodilatasyonla ardyük azalır. O₂ talebi düştüğü için toplam koroner akım azalır. [[K1 s. 115]]' },
      bb: { ad: 'β-bloker', p: 3, o: { hiz: ['↓', ''], dia: ['↑', 'HR ↓ → diyastol uzar'], akim: ['↑', 'LV koroner akımı'], kon: ['↓', 'katekolaminle artış engellenir'] }, z: ['HR ↓', 'diyastol uzar', 'LV koroner akımı ↑', 'katekolaminle kontraktilite artışı ↓', 'talep artışı sınırlanır'], c: '<b>β-blokerler.</b> Kalp hızı azalınca diyastol uzar ve LV koroner akımı artar; egzersizdeki katekolamin etkisiyle kontraktilitenin artması engellenir, talep artışı sınırlanır. [[K1 s. 115]]' },
      cak: { ad: 'Ca²⁺ kanal blokeri', p: 2, o: { akim: ['↑', 'arteriyoler vazodilatasyon'], ard: ['↓', 'periferik vazodilatasyon'] }, z: ['Koroner arteriyoller genişler', 'akım ↑', 'periferik vazodilatasyon → ardyük ↓', 'talep ↓'], c: '<b>Ca²⁺ kanal blokerleri.</b> Koroner arteriyolleri genişletip akımı artırır; periferik vazodilatasyonla ardyükü ve O₂ talebini azaltır. [[K1 s. 115]]' },
      nik: { ad: 'Nikorandil', p: 2, o: { akim: ['↑', 'normal ve darlıklı segmentler genişler'] }, z: ['K⁺ çıkışı ↑', 'hiperpolarizasyon', 'sitozolik Ca²⁺ ↓', 'düz kas gevşer', 'koroner arteriyol genişler'], c: '<b>Nikorandil.</b> Arteriyol düz kasından K⁺ çıkışını artırır; hücre hiperpolarize olur, sitozolik Ca²⁺ azalır ve düz kas gevşer. Hem normal hem darlıklı segmentleri genişletir. [[K1 s. 115]]' },
      ran: { ad: 'Ranolazin', p: 2, o: { kon: ['↓', 'miyosit gerimi ↓, gevşeme kolaylaşır'] }, z: ['Geç Na⁺ akımı inhibe', 'hücre içi Na⁺ ↓', 'Na⁺/Ca²⁺ değiştiriciyle Ca²⁺ çıkışı ↑', 'hücre içi Ca²⁺ ↓', 'gerim ↓, gevşeme ↑ → talep ↓'], c: '<b>Ranolazin.</b> Geç Na⁺ akımını inhibe eder; hücre içi Na⁺ azalınca Na⁺/Ca²⁺ değiştirici daha çok Ca²⁺ çıkarır. Miyosit gerimi azalır, gevşeme kolaylaşır, O₂ talebi düşer. [[K1 s. 115]]' },
      ant: { ad: 'Antitrombositer', p: 0, kal: true, o: { acik: ['✓', 'tıkayıcı trombüs önlenir'] }, z: ['Trombosit kümelenmesi ↓', 'tıkayıcı koroner trombüs oluşmaz', 'sunum korunur'], c: '<b>Antitrombositerler.</b> Aspirin ve klopidogrel koroner arterde tıkayıcı trombüs oluşumunu önler; akut tıkanma talep artmadan da iskemi yapabilir. [[K1 s. 115]]' },
      sta: { ad: 'Statin', p: 1, o: { acik: ['✓', 'plak stabilizasyonu'] }, z: ['Kolesterol ↓ + antiinflamatuvar, antitrombotik etki', 'akut plak stabilizasyonu', 'MI sonrası koroner akım iyileşir'], c: '<b>Statinler.</b> Aterom oluşumunun itici gücü sayılan kolesterolü düşürür; ayrıca antiinflamatuvar ve antitrombotik etkiyle plağı akut olarak stabilize eder ve miyokard enfarktüsünden sonra koroner akımı iyileştirir. [[K1 s. 115–116]]' },
    };
    let sec = 'yok', aci = 0, raf = 0;
    const liste = (k, bas, cls) => `<div class="f27-il-l ${cls}"><h4>${bas}</h4><ul>${BEL[k].map(([id, ad]) => `<li data-b="${id}"><span class="f27-il-ad">${ad}</span><span class="f27-il-ok"></span><small class="f27-il-ge"></small></li>`).join('')}</ul></div>`;
    el.innerHTML = `<div class="f27-ctl">${segHtml('İlaç', 'il', Object.entries(IL).map(([k, d]) => [k, d.ad]), sec)}</div>
      <div class="f27-il">
        ${liste('sun', 'O₂ sunumu', 'f27-il-sun')}
        <div class="f27-il-ter"><svg class="f27-svg" viewBox="0 0 300 196" aria-label="O₂ sunumu ile talebi arasındaki terazi"></svg></div>
        ${liste('tal', 'O₂ talebi', 'f27-il-tal')}
      </div>
      <div class="f27-il-z" aria-live="polite"></div>`;
    const svg = el.querySelector('.f27-il-ter svg');
    const terazi = (a) => {
      const cx = 150, cy = 44, Rr = 104, rad = (a * Math.PI) / 180;
      const lx = cx - Rr * Math.cos(rad), ly = cy - Rr * Math.sin(rad), rx = cx + Rr * Math.cos(rad), ry = cy + Rr * Math.sin(rad);
      const kefe = (x, y, cls, ad) => `<path d="M${r1(x)} ${r1(y)} L${r1(x - 34)} ${r1(y + 56)} M${r1(x)} ${r1(y)} L${r1(x + 34)} ${r1(y + 56)}" class="f27-il-ip"/><path d="M${r1(x - 42)} ${r1(y + 56)} L${r1(x + 42)} ${r1(y + 56)} Q${r1(x)} ${r1(y + 84)} ${r1(x - 42)} ${r1(y + 56)} Z" class="${cls}"/>${T(x, y + 50, 'f27-tk2 f27-hl', ad, 'middle')}`;
      let s = `<path d="M150 44 L150 176 M112 180 L188 180" class="f27-il-dir"/><path d="M138 30 L150 44 L162 30" class="f27-il-dir"/>`;
      s += `<line x1="${r1(lx)}" y1="${r1(ly)}" x2="${r1(rx)}" y2="${r1(ry)}" class="f27-il-kol"/><circle cx="150" cy="44" r="5" class="f27-il-mil"/>`;
      s += kefe(lx, ly, 'f27-il-ks', 'O₂ sunumu') + kefe(rx, ry, 'f27-il-kt', 'O₂ talebi');
      if (IL[sec].kal) s += `<path d="M${r1(lx - 50)} ${r1(ly + 22)} l-12 4 0 10 c0 8 6 13 12 16 c6 -3 12 -8 12 -16 l0 -10 z" class="f27-il-kalkan"/>`;
      s += T(150, 194, 'f27-tk', a === 0 ? 'denge' : a < 0 ? 'sunum lehine' : 'talep lehine', 'middle');
      svg.innerHTML = s;
    };
    const ciz = () => {
      const d = IL[sec];
      basSec(el, 'il', sec);
      el.querySelectorAll('.f27-il li').forEach((li) => {
        const o = d.o[li.dataset.b];
        li.classList.toggle('f27-on', !!o);
        li.querySelector('.f27-il-ok').textContent = o ? o[0] : '';
        li.querySelector('.f27-il-ge').textContent = o ? o[1] : '';
      });
      el.querySelector('.f27-il-z').innerHTML = d.z.length ? `<span class="f27-il-zb">Mekanizma</span><ol>${d.z.map((z) => `<li>${z}</li>`).join('')}</ol>` : '<span class="f27-il-zb">Mekanizma</span><p class="f27-not">Bir ilaç seçince mekanizma zinciri burada görünür.</p>';
      cap(sec === 'yok' ? null : d.c);
      const hedef = -clamp(d.p * 6, -18, 18);
      cancelAnimationFrame(raf);
      if (RM) { aci = hedef; terazi(aci); return; }
      const bas = aci, t0 = performance.now();
      const adim = (t) => { const k = ease(Math.min(1, (t - t0) / 400)); aci = lerp(bas, hedef, k); terazi(aci); if (k < 1) raf = requestAnimationFrame(adim); };
      raf = requestAnimationFrame(adim);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-il]'); if (b) { sec = b.dataset.il; ciz(); } });
    terazi(0);
    ciz();
    return () => cancelAnimationFrame(raf);
  };
})();
