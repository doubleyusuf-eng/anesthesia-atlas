/* Fizyoloji Bölüm 11 · Ventilasyon ve ölü boşluk · bileşenler (K1 s. 45–49).
   Tarif: docs/tasarim/fiz11.md. Bütün modeller şematiktir; kitaptan gelen sayılar (V_T 500 mL, anatomik ölü boşluk
   150 mL, V̇CO₂ 200 mL/dk, PaCO₂ 5,3 kPa, vital kapasite 4,5 L) sayfadaki bileşen dipnotlarında kaynaklıdır. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const V = 'V̇', Q = 'Q̇'; // V̇, Q̇ (birleşik nokta: yalnız gövde yazı tipinde düzgün)
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const easeTers = (f) => (f < 0.5 ? Math.sqrt(f / 2) : 1 - Math.sqrt(2 * (1 - f)) / 2);
  const yuv = (v, d) => { const m = Math.pow(10, d); return Math.round(v * m + (v >= 0 ? 1e-7 : -1e-7)) / m; };
  const fmt = (v, d = 1) => yuv(v, d).toFixed(d).replace('.', ',').replace('-', '−');
  const tam = (v) => String(Math.round(v)).replace('-', '−');
  const xy = (p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1);
  const poly = (pts) => 'M' + pts.map(xy).join(' L');
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const capEl = (el) => { const v = el.closest('.viz'); return v ? v.querySelector('.viz-cap') : null; };
  const yaz = (cap, html) => { if (cap && cap._h !== html) { cap.innerHTML = REF(html); cap._h = html; } };
  const sub = (t) => `<tspan baseline-shift="sub" font-size="72%">${t}</tspan>`;
  const sup = (t) => `<tspan baseline-shift="super" font-size="72%">${t}</tspan>`;
  const Vn = (s) => `<span class="f11-v">${V}<sub>${s}</sub></span>`;
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const bas = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  let UID = 0;
  const uid = (s) => `f11-${s}-${++UID}`;
  const marker = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="${cls}"/></marker>`;
  const darMi = () => !!(window.matchMedia && window.matchMedia('(max-width:600px)').matches);
  // Türkçe iyelik eki: "%30'u", "%60'ı", "%43'ü" (sayının okunuşundaki son sözcüğe göre)
  const ekI = (n) => {
    n = Math.round(n);
    if (n % 100 === 0) return "'ü";
    const b = n % 10;
    if (b) return ["", "'i", "'si", "'ü", "'ü", "'i", "'sı", "'si", "'i", "'u"][b];
    return ["", "'u", "'si", "'u", "'ı", "'si", "'ı", "'i", "'i", "'ı"][(n % 100) / 10];
  };
  // ok: çizgi + elle çizilmiş uç (kalınlıkla ölçeklenir)
  const okCiz = (g, x1, y1, x2, y2, w, cls) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const hl = 5 + 1.6 * w, hw = 3 + 1.1 * w;
    const bx = x2 - ux * hl, by = y2 - uy * hl;
    mk('line', { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: bx.toFixed(1), y2: by.toFixed(1), class: 'f11-okc ' + cls, style: `stroke-width:${w}px` }, g);
    mk('path', { d: `M${xy([x2, y2])} L${xy([bx - uy * hw, by + ux * hw])} L${xy([bx + uy * hw, by - ux * hw])} Z`, class: 'f11-oku-uc ' + cls }, g);
  };
  // basit ara değer motoru (RM'de anında); temizlenince durur
  function tweener() {
    const aktif = new Set();
    const run = (ms, fn, done) => {
      if (RM || ms <= 0) { fn(1); if (done) done(); return () => {}; }
      let raf = 0, t0 = 0, iptal = false;
      const c = () => { iptal = true; cancelAnimationFrame(raf); aktif.delete(c); };
      const loop = (t) => {
        if (iptal) return;
        if (!t0) t0 = t;
        const f = Math.min(1, (t - t0) / ms);
        fn(ease(f));
        if (f < 1) raf = requestAnimationFrame(loop); else { aktif.delete(c); if (done) done(); }
      };
      aktif.add(c); raf = requestAnimationFrame(loop);
      return c;
    };
    run.durdur = () => [...aktif].forEach((c) => c());
    return run;
  }

  /* =====================================================================
     1 · Ölü boşluk haritası: etkenleri deneyin
     ===================================================================== */
  VIZ.f11_tipler = (el) => {
    const cap = capEl(el);
    const D = {
      normal: { cap: "<b>Normal akciğer.</b> 500 mL'lik bir soluğun yaklaşık 150 mL'si iletici hava yollarında kalır (anatomik ölü boşluk); ventilasyon ve perfüzyon iyi eşleştiği için alveoler ölü boşluk ihmal edilebilir. Bir etken seçin: hangi ölü boşluğu, hangi yönde değiştirir? [[K1 s. 45, 47]]" },
      buyuk: { k: 1.15, s: 1.3, an: 1, cap: "<b>Büyük hasta.</b> Akciğerler büyüdükçe iletici hava yolları da büyür: anatomik ölü boşluk artar. Kitabın tipik değeri 70 kg'lık erkek içindir: 150 mL, yaklaşık 2 mL/kg. [[K1 s. 45]]" },
      hacim: { k: 1.08, s: 1.35, an: 1, radyal: 1, cap: '<b>Yüksek akciğer hacmi.</b> Hava yolu duvarlarına binen radyal çekim hava yolu çapını artırır: anatomik ölü boşluk artar. [[K1 s. 45]]' },
      sirt: { k: 0.92, s: 0.7, an: -1, sirt: 1, cap: '<b>Sırtüstü pozisyon.</b> Akciğer hacmi azalır, hava yolu çapı küçülür: anatomik ölü boşluk azalır. [[K1 s. 45]]' },
      bk: { s: 0.6, an: -1, bant: 1, cap: '<b>Bronkokonstriksiyon.</b> Hava yolu çapı küçülür: anatomik ölü boşluk azalır. [[K1 s. 45]]' },
      bd: { s: 1.4, an: 1, cap: '<b>Bronkodilatasyon.</b> Hava yolu çapı artar: anatomik ölü boşluk artar. [[K1 s. 45]]' },
      dik: { al: 1, apeks: 'seyrek', yer: 1, cap: '<b>Dik postür.</b> Yer çekimi nedeniyle kan apeksleri ancak perfüze eder (West zon 2). Apikal alveoller iyi ventile olur ama yeterince perfüze olmaz: alveoler ölü boşluk artar. [[K1 s. 45]]' },
      dpa: { al: 1, apeks: 'seyrek', pa: 2, cap: `<b>Düşük pulmoner arter basıncı.</b> Örneğin sağ ventrikül debisi azalınca apeksler yetersiz perfüze olur ve ${V}/${Q} oranı yükselir: alveoler ölü boşluk artar. [[K1 s. 45]]` },
      peep: { al: 1, apeks: 'basik', pa: 1, cap: '<b>PEEP ve pozitif basınçlı ventilasyon.</b> Alveoler basınç artar: apekslerde pulmoner kapillerler sıkışır ve perfüzyon azalır (West zon 1). Artan intratorasik basınç sağ ventriküle venöz dönüşü azaltır, pulmoner arter basıncı düşer. İki etki de alveoler ölü boşluğu artırır. [[K1 s. 45–46]]' },
      pe: { al: 1, rb: 'emboli', cap: '<b>Pulmoner emboli.</b> Trombüs, gaz, yağ ya da amniyon sıvısı embolisi bir pulmoner arter dalını tıkar; distaldeki alveoller ventile olur ama perfüze olmaz: alveoler ölü boşluk artar. [[K1 s. 46]]' },
      koah: { al: 1, lb: 'koah', cap: '<b>KOAH.</b> Alveoler septumlar yıkılır, hava boşlukları genişler ve gaz değişimine açık yüzey azalır; genişlemiş boşluklara giren havanın büyük bölümü gaz değişimine katılamaz: alveoler ölü boşluk artar. [[K1 s. 46]]' },
    };
    const ANAT = [['buyuk', 'Büyük hasta'], ['hacim', 'Yüksek akciğer hacmi'], ['sirt', 'Sırtüstü'], ['bk', 'Bronkokonstriksiyon'], ['bd', 'Bronkodilatasyon']];
    const ALV = [['dik', 'Dik postür'], ['dpa', 'Düşük PA basıncı'], ['peep', 'PEEP / pozitif basınç'], ['pe', 'Pulmoner emboli'], ['koah', 'KOAH']];

    // geometri (viewBox 420 × 420; sol taraf hesaplanır, sağ taraf aynalanır)
    const W = 420;
    const mir = (p) => [W - p[0], p[1]];
    const HIL = [152, 180], PAH = [162, 196];
    const acG = (c) => { const dx = HIL[0] - c[0], dy = HIL[1] - c[1], L = Math.hypot(dx, dy), u = [dx / L, dy / L]; return { c, u, phi: Math.atan2(dy, dx), end: [c[0] + u[0] * 20, c[1] + u[1] * 20] }; };
    const LA = acG([104, 134]), LB = acG([102, 304]);
    const R = 31, GAP = 38 * Math.PI / 180;
    const halkaNok = (g, r = R, a0 = g.phi + GAP, a1 = g.phi + 2 * Math.PI - GAP, n = 44) => Array.from({ length: n + 1 }, (_, i) => { const t = a0 + (a1 - a0) * i / n; return [g.c[0] + r * Math.cos(t), g.c[1] + r * Math.sin(t)]; });
    const AC = [{ id: 'la', g: LA, m: false }, { id: 'lb', g: LB, m: false }, { id: 'ra', g: LA, m: true }, { id: 'rb', g: LB, m: true }];
    const P = (ac, p) => (ac.m ? mir(p) : p);
    const SEG = [
      { a: [210, 34], b: [210, 132], w: 16 },
      { a: [210, 132], b: HIL, w: 12 }, { a: [210, 132], b: mir(HIL), w: 12 },
      { a: HIL, b: LA.end, w: 8 }, { a: HIL, b: LB.end, w: 8 }, { a: mir(HIL), b: mir(LA.end), w: 8 }, { a: mir(HIL), b: mir(LB.end), w: 8 },
    ];
    const SIL = 'M128 62 C84 64 48 120 42 200 C36 280 40 342 70 364 C100 384 160 376 194 354 C202 300 200 250 196 210 C192 170 182 120 170 92 C162 72 150 60 128 62 Z';
    const mIs = uid('mk'), mIn = uid('mk');
    const mod = (d, id) => (d.apeks && id[1] === 'a' ? d.apeks : id === 'rb' && d.rb ? d.rb : id === 'lb' && d.lb ? d.lb : 'normal');

    el.innerHTML = `<div class="f11-tp">
      <div class="f11-tp-ctl">
        <div class="f11-grp">${segHtml('Başlangıç', 'd', [['normal', 'Normal']], 'normal')}</div>
        <div class="f11-grp"><span class="f11-grp-t">Anatomik ölü boşluğu değiştirenler</span>${segHtml('Anatomik ölü boşluğu değiştirenler', 'd', ANAT, '')}</div>
        <div class="f11-grp"><span class="f11-grp-t">Alveoler ölü boşluğu artıranlar</span>${segHtml('Alveoler ölü boşluğu artıranlar', 'd', ALV, '')}</div>
      </div>
      <div class="f11-tp-ana">
        <div class="f11-tp-sol">
          <svg class="f11-svg f11-tp-svg" viewBox="0 0 420 420" role="img" aria-label="Şematik akciğer: iletici hava yolu ağacı, dört asinüs, kapillerler ve pulmoner arter; seçilen etkene göre değişir">
            <defs>${marker(mIs, 'f11-mk-warn')}${marker(mIn, 'f11-mk-ink')}</defs>
            <g class="f11-tp-olc">
              <path class="f11-ak" d="${SIL}"/><path class="f11-ak" d="${SIL}" transform="translate(420 0) scale(-1 1)"/>
              <g class="f11-tp-pa"></g><g class="f11-tp-kap"></g><g class="f11-tp-hy"></g><g class="f11-tp-is"></g><g class="f11-tp-alv"></g><g class="f11-tp-rbc"></g>
            </g>
            <g class="f11-tp-sabit">
              <text class="f11-ts f11-t-w f11-h" x="232" y="24">İletici bölge</text>
              <text class="f11-ts f11-t-w f11-h" x="232" y="40">kuşak 0–16</text>
              <text class="f11-ts f11-t-w f11-h" x="232" y="56">anatomik ölü boşluk</text>
            </g>
            <g class="f11-tp-dy"></g>
          </svg>
          <div class="legend f11-lej"><span><i class="f11-sw-hy"></i>iletici hava yolu</span><span><i class="f11-sw-alv"></i>perfüze alveol</span><span><i class="f11-sw-ad"></i>ventile, perfüze değil</span><span><i class="f11-sw-kan"></i>kapiller kan, pulmoner arter</span></div>
        </div>
        <div class="f11-tp-sag">
          <p class="f11-tp-bt">Bir soluk: V<sub>T</sub> 500 mL</p>
          <div class="f11-tp-cubuk">
            <div class="f11-tp-ayr"><span>V<sub>D</sub><sup>Phys</sup></span></div>
            <div class="f11-tp-bar"><span class="f11-tp-an"><b></b></span><span class="f11-tp-al"><b></b><i>≈0</i></span><span class="f11-tp-va"><b></b></span></div>
          </div>
          <p class="f11-tp-not">uzunluklar şematik</p>
          <div class="legend f11-lej"><span><i class="f11-sw-hy"></i>anatomik ölü boşluk</span><span><i class="f11-sw-ad"></i>alveoler ölü boşluk</span><span><i class="f11-sw-alv"></i>alveoler hacim (gaz değişimi)</span></div>
          <div class="f11-tp-oku">
            <div data-r="an"><span>Anatomik ölü boşluk</span><b></b></div>
            <div data-r="al"><span>Alveoler ölü boşluk</span><b></b></div>
            <div data-r="ph"><span>Fizyolojik = anatomik + alveoler</span><b></b></div>
          </div>
        </div>
      </div>
    </div>`;
    const svg = el.querySelector('svg');
    const q = (s) => el.querySelector(s);
    const olc = q('.f11-tp-olc'), gPa = q('.f11-tp-pa'), gKap = q('.f11-tp-kap'), gHy = q('.f11-tp-hy'), gIs = q('.f11-tp-is'), gAlv = q('.f11-tp-alv'), gRbc = q('.f11-tp-rbc'), gDy = q('.f11-tp-dy');
    const bA = q('.f11-tp-an'), bL = q('.f11-tp-al'), bV = q('.f11-tp-va'), ayr = q('.f11-tp-ayr'), not = q('.f11-tp-not');
    const rA = q('[data-r="an"]'), rL = q('[data-r="al"]'), rP = q('[data-r="ph"]');
    // hava yolları: önce duvarlar, sonra lümenler (kavşaklarda lümenler birleşir)
    const HY = SEG.map((s) => ({ s, du: mk('line', { x1: s.a[0], y1: s.a[1], x2: s.b[0], y2: s.b[1], class: 'f11-hy-du' }, gHy) }));
    HY.forEach((h) => { h.lu = mk('line', { x1: h.s.a[0], y1: h.s.a[1], x2: h.s.b[0], y2: h.s.b[1], class: 'f11-hy-lu' }, gHy); });
    const birim = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
    const cizgi = (ln, x1, y1, x2, y2) => { ln.setAttribute('x1', x1.toFixed(1)); ln.setAttribute('y1', y1.toFixed(1)); ln.setAttribute('x2', x2.toFixed(1)); ln.setAttribute('y2', y2.toFixed(1)); };
    const cur = { k: 1, s: 1 };
    let hed = { k: 1, s: 1 }, guncIs = [];
    const halka = [];
    const ciz = () => {
      olc.setAttribute('transform', `translate(210 210) scale(${cur.k.toFixed(4)}) translate(-210 -210)`);
      HY.forEach((h) => { h.du.style.strokeWidth = (h.s.w * cur.s + 4).toFixed(2) + 'px'; h.lu.style.strokeWidth = (h.s.w * cur.s).toFixed(2) + 'px'; });
      guncIs.forEach((f) => f(cur.s));
    };
    const yerles = () => halka.forEach((h) => h.dots.forEach((c, i) => {
      const f = (i / h.n + h.off) % 1, p = h.yol.getPointAtLength(f * h.len);
      c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1));
    }));
    const isKur = (d) => {
      gIs.innerHTML = ''; guncIs = [];
      if (d.bant) SEG.forEach((s) => {
        const u = birim(s.a, s.b), n = [-u[1], u[0]];
        (s.w === 16 ? [0.3, 0.55, 0.8] : [0.34, 0.68]).forEach((f) => {
          const p = [lerp(s.a[0], s.b[0], f), lerp(s.a[1], s.b[1], f)], ln = mk('line', { class: 'f11-bant' }, gIs);
          guncIs.push((sv) => { const h = s.w * sv / 2 + 4; cizgi(ln, p[0] - n[0] * h, p[1] - n[1] * h, p[0] + n[0] * h, p[1] + n[1] * h); });
        });
      });
      if (d.radyal) SEG.forEach((s) => {
        const u = birim(s.a, s.b), n = [-u[1], u[0]];
        (s.w === 16 ? [0.45] : [0.5]).forEach((f) => {
          const p = [lerp(s.a[0], s.b[0], f), lerp(s.a[1], s.b[1], f)];
          [1, -1].forEach((sg) => {
            const ln = mk('line', { class: 'f11-radyal', 'marker-end': `url(#${mIs})` }, gIs);
            guncIs.push((sv) => { const h0 = s.w * sv / 2 + 2.5, h1 = h0 + 10; cizgi(ln, p[0] + sg * n[0] * h0, p[1] + sg * n[1] * h0, p[0] + sg * n[0] * h1, p[1] + sg * n[1] * h1); });
          });
        });
      });
    };
    const acKur = (d) => {
      gPa.innerHTML = ''; gKap.innerHTML = ''; gAlv.innerHTML = ''; gRbc.innerHTML = '';
      halka.length = 0;
      mk('path', { d: 'M210 388 V214 M210 214 L162 196 M210 214 L258 196', class: 'f11-pa f11-pa-gv' + (d.pa === 2 ? ' f11-pa-ince' : d.pa === 1 ? ' f11-pa-orta' : '') }, gPa);
      AC.forEach((ac) => {
        const m = mod(d, ac.id), G = ac.g;
        const pts = (m === 'koah' ? halkaNok(G, 42, G.phi + GAP, G.phi + GAP + 1.25, 14) : halkaNok(G)).map((p) => P(ac, p));
        const pa0 = P(ac, PAH);
        if (m === 'emboli') {
          // pıhtıya kadar kan var, distalinde akım yok
          const c = [lerp(pa0[0], pts[0][0], 0.5), lerp(pa0[1], pts[0][1], 0.5)], a = Math.atan2(pts[0][1] - pa0[1], pts[0][0] - pa0[0]) * 180 / Math.PI;
          mk('path', { d: `M${xy(pa0)} L${xy(c)}`, class: 'f11-pa f11-pa-dal' }, gPa);
          mk('path', { d: `M${xy(c)} L${xy(pts[0])}`, class: 'f11-pa f11-pa-dal f11-pa-kes' }, gPa);
          mk('ellipse', { cx: c[0].toFixed(1), cy: c[1].toFixed(1), rx: 8, ry: 5, transform: `rotate(${a.toFixed(1)} ${xy(c)})`, class: 'f11-pihti' }, gKap);
        } else mk('path', { d: `M${xy(pa0)} L${xy(pts[0])}`, class: 'f11-pa f11-pa-dal' + (m === 'seyrek' || m === 'basik' ? ' f11-pa-ince' : '') }, gPa);
        if (m === 'basik') {
          [80, 150, 215, 280].forEach((dg) => {
            const a = G.phi + dg * Math.PI / 180;
            const p1 = P(ac, [G.c[0] + 29 * Math.cos(a - 0.2), G.c[1] + 29 * Math.sin(a - 0.2)]), p2 = P(ac, [G.c[0] + 29 * Math.cos(a + 0.2), G.c[1] + 29 * Math.sin(a + 0.2)]);
            const c = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2], ang = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;
            mk('ellipse', { cx: c[0].toFixed(1), cy: c[1].toFixed(1), rx: 7, ry: 2, transform: `rotate(${ang.toFixed(1)} ${xy(c)})`, class: 'f11-kap-bas' }, gKap);
          });
        } else {
          const yol = mk('path', { d: poly(pts), class: 'f11-kap' + (m === 'seyrek' ? ' f11-kap-ince' : m === 'emboli' ? ' f11-kap-yok' : '') }, gKap);
          if (m !== 'emboli') {
            const n = m === 'seyrek' || m === 'koah' ? 3 : 7;
            halka.push({ yol, len: yol.getTotalLength(), n, hiz: m === 'seyrek' ? 0.3 : 1, off: 0, dots: Array.from({ length: n }, () => mk('circle', { r: 2.5, class: 'f11-rbc' }, gRbc)) });
          }
        }
        const ad = m !== 'normal';
        if (m === 'koah') {
          const cc = [G.c[0] - 6 * G.u[0], G.c[1] - 6 * G.u[1]];
          const b = Array.from({ length: 90 }, (_, i) => { const t = i / 90 * 2 * Math.PI, r = 33 + 2.2 * Math.sin(3 * t + 0.7) + 1.2 * Math.cos(5 * t + 1.1); return P(ac, [cc[0] + r * Math.cos(t), cc[1] + r * Math.sin(t)]); });
          mk('path', { d: poly(b) + ' Z', class: 'f11-alv f11-alv-d' }, gAlv);
        } else {
          const r = m === 'basik' ? 14.5 : 12, dd = m === 'basik' ? 13.5 : 12;
          [0, 65, -65].forEach((dg) => {
            const a = G.phi + Math.PI + dg * Math.PI / 180, c = P(ac, [G.c[0] + dd * Math.cos(a), G.c[1] + dd * Math.sin(a)]);
            mk('circle', { cx: c[0].toFixed(1), cy: c[1].toFixed(1), r, class: ad ? 'f11-alv f11-alv-d' : 'f11-alv' }, gAlv);
            if (m === 'basik') { const t = mk('text', { x: c[0].toFixed(1), y: (c[1] + 4.5).toFixed(1), class: 'f11-arti', 'text-anchor': 'middle' }, gAlv); t.textContent = '+'; }
          });
        }
      });
      yerles();
    };
    const etiket = (d) => {
      gDy.innerHTML = '';
      const T = (x, y, html, cls = 'f11-t', anc = 'start') => { const t = mk('text', { x, y, class: cls + ' f11-h', 'text-anchor': anc }, gDy); t.innerHTML = html; return t; };
      if (d.sirt) { mk('circle', { cx: 20, cy: 21, r: 5.5, class: 'f11-ikon' }, gDy); mk('rect', { x: 28, y: 16, width: 34, height: 10, rx: 5, class: 'f11-ikon' }, gDy); T(70, 26, 'sırtüstü'); }
      if (d.radyal) T(226, 104, 'radyal çekim', 'f11-t f11-t-w');
      if (d.yer) {
        mk('line', { x1: 410, y1: 150, x2: 410, y2: 272, class: 'f11-ok-ink', 'marker-end': `url(#${mIn})` }, gDy);
        T(0, 0, 'yer çekimi', 'f11-ts', 'middle').setAttribute('transform', 'translate(398 211) rotate(-90)');
        T(12, 24, 'apeks · West zon 2', 'f11-t f11-t-a');
      }
      if (d.pa === 2) { T(220, 352, '↓ PA basıncı', 'f11-t f11-t-k'); T(220, 368, '(sağ ventrikül debisi ↓)', 'f11-ts'); T(408, 24, `${V}/${Q} ↑`, 'f11-t f11-sym f11-t-a', 'end'); }
      if (d.apeks === 'basik') { T(12, 24, 'apeks · West zon 1', 'f11-t f11-t-a'); T(220, 352, '↓ venöz dönüş →', 'f11-t f11-t-k'); T(220, 368, '↓ PA basıncı', 'f11-t f11-t-k'); }
      if (d.rb) T(408, 408, 'trombüs, gaz, yağ, amniyon sıvısı', 'f11-t f11-t-a', 'end');
      if (d.lb) T(12, 408, 'septum yıkımı · geniş hava boşluğu', 'f11-t f11-t-a');
      AC.forEach((ac) => {
        if (mod(d, ac.id) === 'normal') return;
        const ust = ac.id[1] === 'a', p = P(ac, [ac.g.c[0], ac.g.c[1] + (ust ? -44 : 58)]);
        T(p[0], p[1], `V${sub('D')}${sup('Alv')}`, 'f11-t f11-sym f11-t-a', 'middle');
      });
    };
    const cubuk = (d) => {
      const an = d.an || 0, al = d.al || 0, norm = !an && !al;
      const wA = an > 0 ? 38 : an < 0 ? 22 : 30, wL = al ? 12 : 0, wV = 100 - wA - wL;
      bA.style.width = wA + '%'; bL.style.width = wL + '%'; bV.style.width = wV + '%'; ayr.style.width = wA + wL + '%';
      bA.querySelector('b').textContent = norm ? '150 mL' : an > 0 ? '↑' : an < 0 ? '↓' : '';
      bV.querySelector('b').textContent = norm ? '350 mL' : '';
      bL.querySelector('b').textContent = al ? '↑' : '';
      bL.classList.toggle('sifir', !al);
      not.style.visibility = norm ? 'hidden' : 'visible';
      rA.querySelector('b').textContent = an > 0 ? '↑ artar' : an < 0 ? '↓ azalır' : '150 mL';
      rL.querySelector('b').textContent = al ? '↑ artar' : 'ihmal edilebilir';
      rP.querySelector('b').textContent = an > 0 || al ? '↑ artar' : an < 0 ? '↓ azalır' : '≈ 150 mL';
      rA.classList.toggle('on', !!an); rL.classList.toggle('on', !!al); rP.classList.toggle('on', !norm);
    };
    const sec = (key) => {
      const d = D[key];
      bas(el, 'd', key);
      hed = { k: d.k || 1, s: d.s || 1 };
      if (RM) { cur.k = hed.k; cur.s = hed.s; }
      isKur(d); acKur(d); etiket(d); cubuk(d); ciz();
      yaz(cap, d.cap);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b && D[b.dataset.d]) sec(b.dataset.d); });
    sec('normal');
    const dur = RM ? null : ticker(el, (dt) => {
      let deg = false;
      ['k', 's'].forEach((k) => { const f = hed[k] - cur[k]; if (Math.abs(f) > 0.0005) { cur[k] += f * Math.min(1, dt * 9); deg = true; } else if (f) { cur[k] = hed[k]; deg = true; } });
      if (deg) ciz();
      if (halka.length) { halka.forEach((h) => { h.off = (h.off + dt * 0.5 * h.hiz) % 1; }); yerles(); }
    });
    return () => { if (dur) dur(); };
  };

  /* =====================================================================
     2 · Dakika ventilasyonu, alveoler ventilasyon ve PaCO₂
     ===================================================================== */
  VIZ.f11_dakika = (el) => {
    const cap = capEl(el), tw = tweener();
    const K = 0.115; // kPa · L/dk ÷ mL/dk (sayfadaki Atlas notu)
    const HZ = { h1: [500, 15, 200], h2: [250, 30, 200], x2: [500, 30, 200], mh: [500, 15, 400] };
    const CAPS = {
      h1: `<b>Hasta 1.</b> 500 mL × 15/dk: ${V}<sub>E</sub> 7500, ${V}<sub>A</sub> 5250 mL/dk; her soluğun 150 mL'si (%30) ölü boşlukta kalır. Hasta 2'ye geçin: ${V}<sub>E</sub> aynı kalır, nokta hiperbol üzerinde yukarı kayar. [[K1 s. 47]]`,
      h2: `<b>Hasta 2.</b> 250 mL × 30/dk: ${V}<sub>E</sub> yine 7500 mL/dk, ama her soluğun 150 mL'si (%60) ölü boşlukta kalır ve ${V}<sub>A</sub> 3000 mL/dk'ya düşer. Modelde PaCO₂ Hasta 1'inkinin 5250 / 3000 = 1,75 katıdır. [[K1 s. 47]]`,
      x2: `<b>Alveoler ventilasyon iki katı.</b> Solunum sayısı 15'ten 30/dk'ya çıkınca ${V}<sub>A</sub> 5250'den 10500 mL/dk'ya çıkar; CO₂ üretimi aynıyken PaCO₂ yarıya iner. [[K1 s. 46–47]]`,
      mh: `<b>CO₂ üretimi iki katı, ventilasyon aynı.</b> Eğri yukarı kayar ve PaCO₂ iki katına çıkar: telafi edici bir ${V}<sub>A</sub> artışı yoksa hiperkapni gelişir. Ventile edilen malign hipertermi hastasında bu, giderek yükselen end-tidal CO₂ olarak görülür. [[K1 s. 47]]`,
    };
    let vt = 500, rr = 15, co2 = 200, hz = 'h1', ilk = true;
    const gs = { va: 5.25, co2: 200 }; // çizimdeki (canlandırılan) değerler
    const pac = (va, c) => K * c / va;
    const mOk = uid('mk');
    // grafik yerleşimi: dar ekranda daha uzun çizim alanı (yazılar büyür, eğri sıkışmaz)
    let G = null, X = null, Y = null;
    el.innerHTML = `<div class="f11-dk">
      <div class="f11-dk-ctl">
        ${segHtml('Hazır durumlar', 'h', [['h1', 'Hasta 1'], ['h2', 'Hasta 2'], ['x2', 'Hasta 1, ventilasyon × 2'], ['mh', 'Malign hipertermi örneği']], 'h1')}
        <label class="f11-rng"><span>Tidal hacim <b data-o="vt"></b></span><input type="range" min="200" max="700" step="10" value="500" data-r="vt" aria-label="Tidal hacim (mL)"></label>
        <label class="f11-rng"><span>Solunum sayısı <b data-o="rr"></b></span><input type="range" min="6" max="35" step="1" value="15" data-r="rr" aria-label="Solunum sayısı (/dk)"></label>
        <div class="f11-grp"><span class="f11-grp-t">CO₂ üretimi (<span class="f11-v">${V}</span>CO₂), mL/dk</span>${segHtml('CO₂ üretimi (mL/dk)', 'c', [['200', '200'], ['300', '300'], ['400', '400']], '200')}</div>
        <p class="f11-sabit">Anatomik ölü boşluk 150 mL (sabit)</p>
      </div>
      <div class="f11-dk-bar">
        <div class="f11-bb"><div class="f11-bb-t"><b>Bir soluk</b><span>ölçek 0–700 mL</span></div><div class="f11-trk"><i class="f11-s-an" data-b="s-an"></i><i class="f11-s-va" data-b="s-va"></i></div><div class="f11-bb-l"><span class="f11-l-an" data-o="s-an"></span><span class="f11-l-va" data-o="s-va"></span></div></div>
        <div class="f11-bb"><div class="f11-bb-t"><b>Bir dakika</b><span>ölçek 0–25000 mL/dk</span></div><div class="f11-trk"><i class="f11-s-an" data-b="d-an"></i><i class="f11-s-va" data-b="d-va"></i></div><div class="f11-bb-l"><span class="f11-l-an" data-o="d-an"></span><span class="f11-l-va" data-o="d-va"></span></div></div>
      </div>
      <div class="f11-dk-graf">
        <svg class="f11-svg f11-dk-svg" role="img" aria-label="PaCO₂ ile alveoler ventilasyon arasındaki hiperbolik ilişki; seçilen durumun noktası eğri üzerinde"></svg>
      </div>
      <dl class="f11-oku f11-dk-oku">
        <div><dt>Dakika ventilasyonu ${Vn('E')}</dt><dd data-o="ve"></dd></div>
        <div><dt>Alveoler ventilasyon ${Vn('A')}</dt><dd data-o="va"></dd></div>
        <div><dt>Ölü boşluk ventilasyonu ${Vn('D')}</dt><dd data-o="vd"></dd></div>
        <div><dt>${Vn('D')} / ${Vn('E')}</dt><dd data-o="or"></dd></div>
        <div class="f11-dk-pa"><dt>PaCO₂</dt><dd data-o="pa"></dd></div>
      </dl>
    </div>`;
    const q = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`), bar = (k) => el.querySelector(`[data-b="${k}"]`);
    const rVt = q('[data-r="vt"]'), rRr = q('[data-r="rr"]');
    const svg = q('.f11-dk-svg');
    let cE, cEl, c2, c2l, nn, nl, gx, gy, x2, h1l, h2l;
    const kurGraf = () => {
      const m = darMi();
      G = m ? { h: 500, x0: 72, yb: 420, tkY: 448, etY: 490, ytX: 20 } : { h: 360, x0: 60, yb: 310, tkY: 330, etY: 352, ytX: 18 };
      G.m = m;
      X = (v) => G.x0 + v / 20 * (540 - G.x0); Y = (p) => G.yb - p / 12 * (G.yb - 20);
      let iz = '';
      for (let v = 0; v <= 20; v += 4) iz += `<line class="f11-izg" x1="${X(v)}" x2="${X(v)}" y1="20" y2="${G.yb}"/><text class="f11-ts f11-dk-tk" x="${X(v)}" y="${G.tkY}" text-anchor="middle">${v}</text>`;
      for (let p = 0; p <= 12; p += 2) iz += `<line class="f11-izg" x1="${G.x0}" x2="540" y1="${Y(p)}" y2="${Y(p)}"/><text class="f11-ts f11-dk-tk" x="${G.x0 - 8}" y="${Y(p) + 5}" text-anchor="end">${p}</text>`;
      const h1 = [X(5.25), Y(K * 200 / 5.25)], h2 = [X(3), Y(K * 200 / 3)];
      // Hasta etiketleri: geniş ekranda sağ üstte, dar ekranda eğrinin altında (sol altta)
      const hl = (h, alt) => (m ? (alt ? `x="${h[0] - 12}" y="${h[1] + 30}" text-anchor="end"` : `x="${h[0] + 14}" y="${h[1] + 6}"`) : `x="${h[0] + 12}" y="${h[1] - 10}"`);
      const okY = m ? Y(K * 200 / 7.9) - 14 : 216;
      svg.setAttribute('viewBox', `0 0 560 ${G.h}`);
      svg.innerHTML = `<defs>${marker(mOk, 'f11-mk-acc')}</defs>
        ${iz}
        <line class="f11-eks" x1="${G.x0}" x2="540" y1="${G.yb}" y2="${G.yb}"/><line class="f11-eks" x1="${G.x0}" x2="${G.x0}" y1="20" y2="${G.yb}"/>
        <text class="f11-t f11-dk-et" x="${(G.x0 + 540) / 2}" y="${G.etY}" text-anchor="middle">Alveoler ventilasyon (L/dk)</text>
        <text class="f11-t f11-dk-et" transform="translate(${G.ytX} ${(20 + G.yb) / 2}) rotate(-90)" text-anchor="middle">PaCO₂ (kPa)</text>
        <line class="f11-dk-53" x1="${G.x0}" x2="540" y1="${Y(5.3)}" y2="${Y(5.3)}"/>
        <text class="f11-ts f11-dk-tk f11-h" x="536" y="${Y(5.3) - 7}" text-anchor="end">5,3 kPa · tipik arteriyel</text>
        <path class="f11-dk-c200"/><text class="f11-ts f11-sym f11-dk-tk f11-dk-c200l" x="536" text-anchor="end">${V}CO₂ 200</text>
        <path class="f11-dk-c"/><text class="f11-t f11-sym f11-dk-et f11-dk-cl f11-h"></text>
        <circle class="f11-dk-h" cx="${h1[0]}" cy="${h1[1]}" r="6"/><circle class="f11-dk-h" cx="${h2[0]}" cy="${h2[1]}" r="6"/>
        <text class="f11-ts f11-dk-tk f11-h f11-dk-hl" data-h1 ${hl(h1, true)}>Hasta 1</text>
        <text class="f11-ts f11-dk-tk f11-h f11-dk-hl" data-h2 ${hl(h2, false)}>Hasta 2</text>
        <g class="f11-dk-x2"><line class="f11-dk-ok" x1="${h1[0] + 7}" y1="${h1[1] + 2}" x2="${X(10.5) - 9}" y2="${Y(K * 200 / 10.5) - 2}" marker-end="url(#${mOk})"/>
          <text class="f11-t f11-dk-et f11-t-a f11-h" x="${X(7.9)}" y="${okY.toFixed(1)}">ventilasyon × 2 → PaCO₂ ÷ 2</text></g>
        <line class="f11-iz" data-g="x"/><line class="f11-iz" data-g="y"/>
        <circle class="f11-dk-n" r="7"/><text class="f11-t f11-dk-et f11-dk-nl f11-h"></text>`;
      cE = q('.f11-dk-c'); cEl = q('.f11-dk-cl'); c2 = q('.f11-dk-c200'); c2l = q('.f11-dk-c200l');
      nn = q('.f11-dk-n'); nl = q('.f11-dk-nl'); gx = q('[data-g="x"]'); gy = q('[data-g="y"]'); x2 = q('.f11-dk-x2');
      h1l = q('[data-h1]'); h2l = q('[data-h2]');
      x2.style.display = hz === 'x2' ? '' : 'none';
    };
    const egri = (c) => { const v0 = K * c / 12; let d = '', v = v0; while (v <= 20.0001) { d += (d ? ' L' : 'M') + X(v).toFixed(1) + ' ' + Y(pac(v, c)).toFixed(1); v += v < 5 ? 0.02 : 0.1; } return d + ` L${X(20)} ${Y(pac(20, c)).toFixed(1)}`; };
    const ciz = () => {
      const { va, co2: c } = gs;
      cE.setAttribute('d', egri(c));
      const vU = K * c / 10.5; // eğri etiketi: PaCO₂ 10,5 kPa hizasında, eğrinin sağında (boş üst bölge)
      cEl.setAttribute('x', (X(vU) + 14).toFixed(1)); cEl.setAttribute('y', (Y(10.5) + 5).toFixed(1)); cEl.textContent = `${V}CO₂ ${tam(c)} mL/dk`;
      const b2 = Math.abs(c - 200) > 0.5;
      c2.style.display = c2l.style.display = b2 ? '' : 'none';
      if (b2) { c2.setAttribute('d', egri(200)); c2l.setAttribute('y', (Y(pac(19.8, 200)) + 17).toFixed(1)); }
      const p = pac(va, c), px = X(Math.min(va, 20)), py = Y(Math.min(p, 12));
      nn.setAttribute('cx', px.toFixed(1)); nn.setAttribute('cy', py.toFixed(1));
      gx.setAttribute('x1', px.toFixed(1)); gx.setAttribute('x2', px.toFixed(1)); gx.setAttribute('y1', py.toFixed(1)); gx.setAttribute('y2', G.yb);
      gy.setAttribute('x1', G.x0); gy.setAttribute('x2', px.toFixed(1)); gy.setAttribute('y1', py.toFixed(1)); gy.setAttribute('y2', py.toFixed(1));
      const yakin = (v, pp) => Math.abs(px - X(v)) < 3 && Math.abs(py - Y(pp)) < 3;
      const n1 = yakin(5.25, K * 200 / 5.25), n2 = yakin(3, K * 200 / 3);
      h1l.style.display = n1 ? 'none' : ''; h2l.style.display = n2 ? 'none' : '';
      nl.textContent = (n1 ? 'Hasta 1 · ' : n2 ? 'Hasta 2 · ' : '') + (p > 12 ? 'PaCO₂ > 12 kPa' : `PaCO₂ ${fmt(p)} kPa`) + (va > 20 ? ' · > 20 L/dk' : '');
      const sag = px > (G.m ? 400 : 330);
      nl.setAttribute('text-anchor', sag ? 'end' : 'start');
      nl.setAttribute('x', (px + (sag ? -12 : 12)).toFixed(1));
      let ly = py < 44 ? py + 26 : py - 13;
      if (ly > Y(5.3) - 4 && ly < Y(5.3) + (G.m ? 22 : 16)) ly = py + (G.m ? 30 : 24);
      nl.setAttribute('y', ly.toFixed(1));
    };
    const guncelle = () => {
      const ve = vt * rr, va = (vt - 150) * rr, vd = 150 * rr, x = Math.round(150 / vt * 100), p = K * co2 / (va / 1000);
      o('vt').textContent = vt + ' mL'; o('rr').textContent = rr + '/dk';
      bar('s-an').style.width = 150 / 700 * 100 + '%'; bar('s-va').style.width = (vt - 150) / 700 * 100 + '%';
      bar('d-an').style.width = vd / 25000 * 100 + '%'; bar('d-va').style.width = va / 25000 * 100 + '%';
      o('s-an').innerHTML = `ölü boşluk 150 mL (%${x})`; o('s-va').innerHTML = `V<sub>A</sub> ${vt - 150} mL`;
      o('d-an').innerHTML = `${Vn('D')} ${vd}`; o('d-va').innerHTML = `${Vn('A')} ${va} · ${Vn('E')} ${ve} mL/dk`;
      o('ve').textContent = ve + ' mL/dk'; o('va').textContent = va + ' mL/dk'; o('vd').textContent = vd + ' mL/dk';
      o('or').textContent = '%' + Math.round(vd / ve * 100);
      o('pa').innerHTML = `${fmt(p)} kPa <small>(${tam(p * 7.5)} mmHg)</small>`;
      x2.style.display = hz === 'x2' ? '' : 'none';
      if (ilk) return;
      if (hz) { yaz(cap, CAPS[hz]); return; }
      let t = `<b>V<sub>T</sub> ${vt} mL × ${rr}/dk.</b> ${V}<sub>E</sub> ${ve}, ${V}<sub>A</sub> ${va} mL/dk; her soluğun %${x}${ekI(x)} ölü boşlukta kalır. `;
      if (vt <= 250) t += `Tidal hacim ölü boşluğa yaklaştıkça ${V}<sub>E</sub> yüksek olsa bile ${V}<sub>A</sub> hızla düşer. [[K1 s. 46–47]]`;
      else if (co2 > 200) t += `CO₂ üretimi arttı: aynı ${V}<sub>A</sub>'da PaCO₂ üretimle orantılı yükselir. [[K1 s. 47]]`;
      else t += `PaCO₂, ${V}<sub>A</sub> ile ters orantılıdır: ${V}<sub>A</sub>'yı iki katına çıkarmak PaCO₂'yi yarıya indirir. [[K1 s. 46–47]]`;
      yaz(cap, t);
    };
    const git = (anim) => {
      tw.durdur();
      const a = { ...gs }, b = { va: (vt - 150) * rr / 1000, co2 };
      if (!anim) { Object.assign(gs, b); ciz(); return; }
      tw(600, (f) => { gs.va = lerp(a.va, b.va, f); gs.co2 = lerp(a.co2, b.co2, f); ciz(); });
    };
    el.addEventListener('click', (e) => {
      const h = e.target.closest('[data-h]'), c = e.target.closest('[data-c]');
      if (h) { hz = h.dataset.h; [vt, rr, co2] = HZ[hz]; rVt.value = vt; rRr.value = rr; bas(el, 'h', hz); bas(el, 'c', co2); ilk = false; guncelle(); git(true); }
      else if (c) { co2 = +c.dataset.c; hz = null; bas(el, 'h', ''); bas(el, 'c', co2); ilk = false; guncelle(); git(true); }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'vt') vt = +r.value; else rr = +r.value;
      hz = null; bas(el, 'h', ''); ilk = false; guncelle(); git(false);
    });
    const mq = window.matchMedia ? window.matchMedia('(max-width:600px)') : null;
    const mqF = () => { kurGraf(); ciz(); };
    if (mq) (mq.addEventListener ? mq.addEventListener('change', mqF) : mq.addListener(mqF));
    kurGraf(); guncelle(); ciz();
    return () => { tw.durdur(); if (mq) (mq.removeEventListener ? mq.removeEventListener('change', mqF) : mq.removeListener(mqF)); };
  };

  /* =====================================================================
     3 · Şnorkel: mekanik ölü boşluk ve yeniden soluma
     Piston modeli: tüp 10 mL'lik hücreler dizisidir, gaz karışmadan sırayla ilerler.
     ===================================================================== */
  VIZ.f11_yeniden = (el) => {
    const cap = capEl(el), cap0 = cap ? cap.innerHTML : '';
    const TE = 2, P1 = 0.5, TI = 2, DONGU = 5; // s: ekspirasyon, duraklama, inspirasyon, duraklama
    let kip = 'A', S = 0, M = 20, oyna = !RM, t = RM ? TE : 0, durHedef = null;
    let tup0 = [], tupE = [], tupI = [], G = null, sonFaz = -1;
    const FAZ = ['Ekspirasyon: önce ölü boşluk gazı', 'Ekspirasyon: alveoler gaz', 'Ekspirasyon sonu', 'İnspirasyon: önce şnorkeldeki gaz', 'İnspirasyon: taze gaz'];
    el.innerHTML = `<div class="f11-yn">
      ${segHtml('Görünüm', 'k', [['A', 'Şnorkel'], ['B', 'Erişkin ve çocuk']], 'A')}
      <div class="f11-yn-a">
        <div class="f11-yn-ctl">
          <label class="f11-rng"><span>Şnorkel hacmi (mekanik ölü boşluk) <b data-o="S"></b></span><input type="range" min="0" max="700" step="10" value="0" data-r="S" aria-label="Şnorkel hacmi (mL)"></label>
          <div class="btn-row">${segHtml('Hazır şnorkel hacimleri', 's', [['0', 'Yok'], ['150', '150 mL'], ['600', "600 mL (V<sub>T</sub>'den büyük)"]], '0')}
            <button type="button" class="btn play" data-a="oyna">${RM ? 'Oynat' : 'Duraklat'}</button><button type="button" class="btn ghost" data-a="adim">Adım ›</button></div>
        </div>
        <svg class="f11-svg f11-yn-svg" role="img" aria-label="Akciğer balonu, hava yolu ve şnorkel tüpü; gaz hücreleri soluk alıp verirken tüp boyunca ilerler"></svg>
        <div class="phase f11-yn-faz">${FAZ.map((f) => `<div>${f}</div>`).join('')}</div>
        <div class="legend f11-lej"><span><i class="f11-sw-ku"></i>kullanılmış alveoler gaz (CO₂ var, PO₂ düşük)</span><span><i class="f11-sw-tz"></i>taze gaz (atmosfer havası)</span></div>
        <dl class="f11-oku f11-yn-oku">
          <div><dt>Şnorkelden yeniden solunan kullanılmış gaz</dt><dd data-o="ys"></dd></div>
          <div><dt>Alveollere ulaşan taze gaz</dt><dd data-o="tz"></dd></div>
          <div class="f11-gen"><dt>Aynı taze gaz için gereken V<sub>T</sub></dt><dd data-o="gv"></dd></div>
        </dl>
        <p class="f11-uyari" data-o="uy" hidden></p>
      </div>
      <div class="f11-yn-b" hidden>
        <label class="f11-rng"><span>Hava yolu aracının hacmi (mekanik ölü boşluk) <b data-o="M"></b></span><input type="range" min="0" max="60" step="5" value="20" data-r="M" aria-label="Hava yolu aracının hacmi (mL)"></label>
        <div class="f11-hst-k">
          ${[['E', 'Erişkin, 70 kg', 'V<sub>T</sub> 500 mL · anatomik ölü boşluk 150 mL'], ['C', 'Çocuk, 10 kg', 'V<sub>T</sub> 70 mL (7 mL/kg) · anatomik ölü boşluk 20 mL (2 mL/kg)']].map(([id, ad, alt]) => `<div class="f11-hst" data-h="${id}">
            <p class="f11-hst-b">${ad}</p><p class="f11-hst-s">${alt}</p>
            <div class="f11-trk f11-trk-3"><i class="f11-s-an" data-b="${id}-an"></i><i class="f11-s-mk" data-b="${id}-mk"></i><i class="f11-s-va" data-b="${id}-tz"></i></div>
            <dl class="f11-oku">
              <div><dt>Taze alveoler gaz</dt><dd data-o="${id}-tz"></dd></div>
              <div><dt>Mekanik ölü boşluğun payı (toplam ölü boşlukta)</dt><dd data-o="${id}-py"></dd></div>
              <div class="f11-gen"><dt>Aynı ${V}<sub>A</sub> için gereken V<sub>T</sub></dt><dd data-o="${id}-gv"></dd></div>
            </dl>
            <p class="f11-uyari" data-o="${id}-uy" hidden></p>
          </div>`).join('')}
        </div>
        <div class="legend f11-lej"><span><i class="f11-sw-an"></i>anatomik ölü boşluk</span><span><i class="f11-sw-ku"></i>mekanik ölü boşluk (kullanılmış gaz)</span><span><i class="f11-sw-tz"></i>taze alveoler gaz</span></div>
      </div>
    </div>`;
    const q = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const svg = q('.f11-yn-svg'), fazEl = [...el.querySelectorAll('.f11-yn-faz div')], bOy = q('[data-a="oyna"]'), bAd = q('[data-a="adim"]'), rS = q('[data-r="S"]');
    if (RM) bOy.hidden = true;
    const turet = () => {
      const n = tup0.length;
      tupE = tup0.map((_, i) => (i < 50 ? 'k' : tup0[i - 50]));
      tupI = tupE.map((_, i) => (i + 50 < n ? tupE[i + 50] : 't'));
    };
    const kurTup = () => { tup0 = Array(15 + S / 10).fill('t'); turet(); t = RM ? TE : 0; durHedef = null; };
    const kurSvg = () => {
      const m = darMi();
      const L = m ? { w: 360, h: 150, cx: 64, cy: 76, rx: 50, ry: 44, x0: 122, y: 76, o: 0.5, sag: 330, r: 28, sw: 1, tw: 12, hr: 2.2, x2: 160 }
        : { w: 640, h: 176, cx: 96, cy: 104, rx: 68, ry: 58, x0: 176, y: 104, o: 0.6, sag: 580, r: 22, sw: 0, tw: 15, hr: 2.7, x2: 300 };
      L.y2 = L.y + (L.sw ? 2 : -2) * L.r;
      L.agiz = L.x0 + 150 * L.o;
      const d = `M${L.x0} ${L.y} H${L.sag} A${L.r} ${L.r} 0 0 ${L.sw} ${L.sag} ${L.y2} H${L.x2}`;
      svg.setAttribute('viewBox', `0 0 ${L.w} ${L.h}`);
      svg.classList.toggle('dar', m);
      svg.innerHTML = `<line class="f11-yn-boyun" x1="${L.cx}" y1="${L.y}" x2="${L.x0 + 1}" y2="${L.y}" style="stroke-width:${L.tw}px"/>
        <path class="f11-yn-dis f11-yn-dis-hy" d="${d}" style="stroke-width:${L.tw}px"/><path class="f11-yn-dis f11-yn-dis-sn" d="${d}" style="stroke-width:${L.tw}px"/>
        <path class="f11-yn-ic" d="${d}" style="stroke-width:${L.tw - 4}px"/>
        <g class="f11-yn-hc"></g>
        <ellipse class="f11-yn-balon" cx="${L.cx}" cy="${L.cy}" rx="${L.rx}" ry="${L.ry}"/>
        <text class="f11-t f11-yn-bt" x="${L.cx}" y="${L.cy + 5}" text-anchor="middle">alveol</text>
        <line class="f11-yn-agiz" x1="${L.agiz}" x2="${L.agiz}" y1="${L.y - 16}" y2="${L.y + 16}"/>
        <text class="f11-ts f11-yn-tx" x="${L.agiz}" y="${L.y - 22}" text-anchor="middle">ağız</text>
        <text class="f11-ts f11-yn-tx f11-t-w" x="${L.x0 + 4}" y="${L.y + 30}">${m ? 'anatomik ölü' : 'anatomik ölü boşluk'}</text>
        <text class="f11-ts f11-yn-tx f11-t-w" x="${L.x0 + 4}" y="${L.y + 45}">${m ? 'boşluk 150 mL' : '150 mL'}</text>
        <text class="f11-ts f11-yn-tx f11-yn-sl" x="${L.agiz + 26}" y="${L.y - 22}"></text>
        <text class="f11-ts f11-yn-tx f11-yn-atm f11-h">atmosfer</text>`;
      const yol = svg.querySelector('.f11-yn-ic'), top = yol.getTotalLength();
      const lut = []; for (let i = 0; i <= Math.ceil(top); i++) { const p = yol.getPointAtLength(Math.min(i, top)); lut.push([p.x, p.y]); }
      const at = (l) => { const x = clamp(l, 0, lut.length - 1), i = Math.floor(x), f = x - i, a = lut[i], b = lut[Math.min(i + 1, lut.length - 1)]; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; };
      const hg = svg.querySelector('.f11-yn-hc');
      const hav = Array.from({ length: 70 + 15 + 50 }, () => mk('circle', { r: L.hr, class: 'f11-hc-t' }, hg));
      G = { L, at, hav, balon: svg.querySelector('.f11-yn-balon'), dHy: svg.querySelector('.f11-yn-dis-hy'), dSn: svg.querySelector('.f11-yn-dis-sn'), ic: yol, sl: svg.querySelector('.f11-yn-sl'), atm: svg.querySelector('.f11-yn-atm') };
      tupSvg();
    };
    const tupSvg = () => {
      const { L } = G, T = 150 + S;
      G.dHy.style.strokeDasharray = `${150 * L.o} 99999`;
      G.dSn.style.strokeDasharray = `0 ${150 * L.o} ${S * L.o} 99999`;
      G.ic.style.strokeDasharray = `${T * L.o} 99999`;
      G.sl.textContent = S ? `şnorkel ${S} mL` : 'şnorkel yok';
      const l = T * L.o, p = G.at(l), pp = G.at(Math.max(0, l - 3)), ux = (p[0] - pp[0]) / (Math.hypot(p[0] - pp[0], p[1] - pp[1]) || 1);
      const ic = () => { G.atm.setAttribute('x', L.sag - 6); G.atm.setAttribute('y', (L.y + L.y2) / 2 + 4); G.atm.setAttribute('text-anchor', 'end'); };
      if (ux > 0.7) {
        if (p[0] + (L.w < 400 ? 66 : 74) < L.w - 2) { G.atm.setAttribute('x', (p[0] + 9).toFixed(1)); G.atm.setAttribute('y', (p[1] + 4).toFixed(1)); G.atm.setAttribute('text-anchor', 'start'); } else ic();
      } else if (ux < -0.7) { G.atm.setAttribute('x', (p[0] - 9).toFixed(1)); G.atm.setAttribute('y', (p[1] + 4).toFixed(1)); G.atm.setAttribute('text-anchor', 'end'); } else ic();
    };
    const fazHesap = () => {
      const ilk4 = S > 0 ? Math.min(S, 500) : 150;
      if (t < TE) return ease(t / TE) * 500 < 150 ? 0 : 1;
      if (t < TE + P1) return 2;
      if (t < TE + P1 + TI) return ease((t - TE - P1) / TI) * 500 < ilk4 ? 3 : 4;
      return S < 500 ? 4 : 3;
    };
    const ciz = () => {
      if (!G) return;
      const { L } = G, T = 150 + S;
      let taban, kay = 0, ek = 0, v;
      if (t < TE) { const f = ease(t / TE); taban = tup0; kay = f * 500; ek = 1; v = 1 - f; }
      else if (t < TE + P1) { taban = tupE; v = 0; }
      else if (t < TE + P1 + TI) { const g = ease((t - TE - P1) / TI); taban = tupE; kay = -g * 500; ek = 2; v = g; }
      else { taban = tupI; v = 1; }
      let ci = 0;
      const koy = (pos, tip) => {
        const c = G.hav[ci++];
        if (pos < 0 || pos > T) { c.style.display = 'none'; return; }
        const p = G.at(pos * L.o);
        c.style.display = ''; c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1));
        const k = tip === 'k' ? 'f11-hc-k' : 'f11-hc-t'; if (c._k !== k) { c.setAttribute('class', k); c._k = k; }
      };
      for (let i = 0; i < taban.length; i++) koy((i + 0.5) * 10 + kay, taban[i]);
      if (ek === 1) for (let j = 0; j < 50; j++) koy((j + 0.5) * 10 + kay - 500, 'k');
      if (ek === 2) for (let j = 0; j < 50; j++) koy(T + (j + 0.5) * 10 + kay, 't');
      for (; ci < G.hav.length; ci++) G.hav[ci].style.display = 'none';
      G.balon.setAttribute('rx', (L.rx * (0.92 + 0.08 * v)).toFixed(1)); G.balon.setAttribute('ry', (L.ry * (0.93 + 0.07 * v)).toFixed(1));
      const ph = fazHesap();
      if (ph !== sonFaz) { sonFaz = ph; fazEl.forEach((d, i) => { d.classList.toggle('on', i === ph); d.classList.toggle('past', i < ph); }); }
    };
    const sinirlar = () => {
      const ilk4 = S > 0 ? Math.min(S, 500) : 150, b = [TE * easeTers(0.3), TE, TE + P1, TE + P1 + TI * easeTers(ilk4 / 500)];
      if (S < 500) b.push(TE + P1 + TI);
      b.push(DONGU);
      return b;
    };
    const dongu = () => { tup0 = tupI; turet(); };
    const dugme = () => { bOy.textContent = oyna && durHedef == null ? 'Duraklat' : 'Oynat'; };
    const okuA = () => {
      o('S').textContent = S + ' mL';
      o('ys').textContent = Math.min(S, 350) + ' mL/soluk';
      o('tz').textContent = Math.max(0, 350 - S) + ' mL/soluk';
      o('gv').innerHTML = `${500 + S} mL <small>(RR 15'te ${V}<sub>E</sub> ${(500 + S) * 15} mL/dk)</small>`;
      const uy = o('uy');
      uy.hidden = S < 350;
      uy.textContent = S >= 500 ? 'Atmosfer havası ağza bile ulaşmaz: solunan gazın tamamı şnorkelden gelir, alveollere yalnız kullanılmış gaz girer. Giderek hipoksemi.' : 'Ağızdan taze gaz girer ama yalnız hava yolunu doldurur: alveollere taze gaz ulaşmaz.';
      fazEl[3].textContent = S > 0 ? FAZ[3] : 'İnspirasyon: önce hava yolundaki gaz';
      fazEl[4].classList.toggle('yok', S >= 500);
      bas(el, 's', S);
      if (kip !== 'A') return;
      if (S === 0) { if (cap) { cap.innerHTML = cap0; cap._h = null; } return; }
      if (S < 350) yaz(cap, `<b>Şnorkel ${S} mL.</b> Ekspirasyon sonunda şnorkel alveoler gazla doludur; sonraki soluğun ilk ${S} mL'si bu kullanılmış gazdır: yeniden soluma. Alveollere ulaşan taze gaz 350'den ${350 - S} mL'ye iner; alveoler ventilasyonu korumak için tidal hacim, yani dakika ventilasyonu artırılmalıdır. [[K1 s. 47]]`);
      else if (S < 500) yaz(cap, `<b>Şnorkel ${S} mL.</b> Ekspirasyon sonunda şnorkelin ağza yakın 350 mL'si alveoler gazla doludur ve sonraki soluğun başında solunur; ardından ağızdan giren taze gaz yalnızca hava yolunu doldurur, alveole ulaşmaz. Alveollere giren gazın tamamı kullanılmış gazdır: PO₂'si düşük, PCO₂'si yüksektir; hipoksemi ve hiperkapni riski. [[K1 s. 47]]`);
      else yaz(cap, '<b>Şnorkel tidal hacimden büyük.</b> Soluğun tamamı şnorkelin içinden gelir, atmosfer havası ağza hiç ulaşmaz. Alveollere giren gazın tamamı kullanılmış alveoler gazdır: PO₂ düşük, PCO₂ yüksek. Kişi giderek daha hipoksemik olur. [[K1 s. 47]]');
    };
    const okuB = () => {
      o('M').textContent = M + ' mL';
      const H = { E: { vt: 500, an: 150 }, C: { vt: 70, an: 20 } }, sonuc = {};
      Object.entries(H).forEach(([id, h]) => {
        const t0 = h.vt - h.an, tz = Math.max(0, t0 - M), az = Math.round((t0 - tz) / t0 * 100), py = Math.round(M / (h.an + M) * 100), art = Math.round(M / h.vt * 100);
        el.querySelector(`[data-b="${id}-an"]`).style.width = h.an / h.vt * 100 + '%';
        el.querySelector(`[data-b="${id}-mk"]`).style.width = Math.min(M, t0) / h.vt * 100 + '%';
        el.querySelector(`[data-b="${id}-tz"]`).style.width = tz / h.vt * 100 + '%';
        o(id + '-tz').innerHTML = M ? `${tz} mL <small>(−%${az})</small>` : `${tz} mL`;
        o(id + '-py').textContent = '%' + py;
        o(id + '-gv').innerHTML = M ? `${h.vt + M} mL <small>(+%${art})</small>` : `${h.vt} mL`;
        const u = o(id + '-uy'); u.hidden = tz > 0; u.textContent = 'Alveole taze gaz ulaşmaz.';
        sonuc[id] = { py, az };
      });
      if (kip !== 'B') return;
      if (!M) yaz(cap, 'Araç yokken iki hastada da ölü boşluk yalnızca anatomiktir. Kaydırıcıyla bir hava yolu aracı ekleyin. [[K1 s. 45, 47]]');
      else yaz(cap, `<b>Aynı araç, iki hasta.</b> ${M} mL'lik bir aracın toplam ölü boşluktaki payı erişkinde %${sonuc.E.py}, 10 kg'lık çocukta %${sonuc.C.py}; çocukta alveollere ulaşan taze gaz %${sonuc.C.az} azalır. Pediatride mekanik ölü boşluk bu yüzden en aza indirilir: endotrakeal tüp kısaltılır, kateter bağlantısı kısaltılır, dirsek parçalarından kaçınılır. [[K1 s. 47]]`);
    };
    const yeniS = (v) => { S = clamp(Math.round(v / 10) * 10, 0, 700); rS.value = S; kurTup(); tupSvg(); okuA(); ciz(); dugme(); };
    el.addEventListener('click', (e) => {
      const k = e.target.closest('[data-k]'), s = e.target.closest('[data-s]'), a = e.target.closest('[data-a]');
      if (k) {
        kip = k.dataset.k; bas(el, 'k', kip);
        q('.f11-yn-a').hidden = kip !== 'A'; q('.f11-yn-b').hidden = kip !== 'B';
        if (cap) cap._h = null;
        if (kip === 'A') okuA(); else okuB();
      } else if (s) yeniS(+s.dataset.s);
      else if (a && a.dataset.a === 'oyna') { if (oyna && durHedef == null) oyna = false; else { oyna = true; durHedef = null; } dugme(); }
      else if (a && a.dataset.a === 'adim') {
        const nx = sinirlar().find((b) => b > t + 1e-3) ?? DONGU;
        if (RM) { t = nx; if (t >= DONGU) { t = 0; dongu(); } ciz(); }
        else { durHedef = nx; oyna = true; dugme(); }
      }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'S') yeniS(+r.value); else { M = +r.value; okuB(); }
    });
    const mq = window.matchMedia ? window.matchMedia('(max-width:600px)') : null;
    const mqF = () => { kurSvg(); ciz(); };
    if (mq) (mq.addEventListener ? mq.addEventListener('change', mqF) : mq.addListener(mqF));
    kurTup(); kurSvg(); okuA(); okuB(); ciz();
    const dur = RM ? null : ticker(el, (dt) => {
      if (kip !== 'A' || !G) return;
      if (oyna) {
        let nt = t + dt;
        if (durHedef != null && nt >= durHedef) { nt = durHedef; oyna = false; durHedef = null; dugme(); }
        if (nt >= DONGU) { nt -= DONGU; dongu(); }
        t = nt;
      }
      ciz();
    });
    return () => { if (dur) dur(); if (mq) (mq.removeEventListener ? mq.removeEventListener('change', mqF) : mq.removeListener(mqF)); };
  };

  /* =====================================================================
     4 · Fowler eğrisi: tek soluk N₂ yıkama
     ===================================================================== */
  VIZ.f11_fowler = (el) => {
    const cap = capEl(el), cap0 = cap ? cap.innerHTML : '', tw = tweener(), twL = tweener();
    const ADIM = ['Hazırlık', 'O₂ soluğu', 'Faz 1', 'Faz 2', 'Faz 3', 'Faz 4', 'Sonuç'];
    const ARALIK = [[0, 0], [0, 0], [0, 0.1], [0.1, 0.2], [0.2, 4.05], [4.05, 4.5], [4.5, 4.5]];
    const SURE = [2600, 3000, 2600, 4400, 3200, 3000, 0];
    const CAPS = [null,
      '<b>%100 O₂ ile tek soluk.</b> İletici hava yolları saf O₂ ile dolar. Bazal alveoller daha kompliyan olduğu için soluğun çoğu onlara girer: bazal alveollerdeki N₂ daha çok seyrelir, apikal alveollerin N₂\'si yüksek kalır. [[K1 s. 48]]',
      '<b>Faz 1.</b> İlk ekspire edilen gaz anatomik ölü boşluktan gelir: yalnızca O₂ içerir, N₂ sıfırdır. [[K1 s. 48]]',
      '<b>Faz 2.</b> Ölü boşluk gazı ile alveoler gaz karışarak çıkar ve N₂ hızla yükselir. Dikey çizgiyi, solundaki A alanı sağındaki B alanına eşit olana dek sürükleyin: o hacim anatomik ölü boşluktur. [[K1 s. 48]]',
      '<b>Faz 3.</b> Artık yalnızca alveoler gaz çıkar ve N₂ platoya ulaşır. Plato hafifçe yukarı eğimlidir; nedeni için Atlas notuna bakın. [[K1 s. 48]]',
      '<b>Faz 4.</b> Bağımlı bölgelerdeki küçük hava yolları kapanmaya başlar; artık yalnızca N₂\'den zengin apikal alveoller boşalır ve ekspire edilen N₂ keskin biçimde yükselir. Kapanmanın başladığı akciğer hacmi kapanma kapasitesidir. [[K1 s. 48]]',
      '<b>Sonuç.</b> Faz 2\'nin A = B noktası anatomik ölü boşluğu verir (≈150 mL). Faz 4\'ün başladığı noktadan RV\'ye kadar verilen hacim kapanma hacmidir; kapanma kapasitesi = RV + kapanma hacmi, RV ayrıca ölçülür. [[K1 s. 45, 48, 55]]'];
    let adim = RM ? 6 : 0, vCiz = RM ? 4.5 : 0, xL = 0.15, oyn = false, zam = null;
    // eğri modeli (göreli N₂; plato P)
    const Pl = (x) => (x <= 0.25 ? 1 : 1 + 0.06 * (x - 0.25) / 3.8);
    const N = (x) => {
      if (x <= 0.1) return 0;
      if (x <= 0.2) { const u = (x - 0.1) / 0.1; return Pl(x) * (3 * u * u - 2 * u * u * u); }
      if (x <= 4.05) return Pl(x);
      const v = Math.min(1, (x - 4.05) / 0.45); return 1.06 + 0.35 * (1 - (1 - v) * (1 - v));
    };
    const Xv = (v) => (v <= 0.4 ? 50 + v * 450 : 250 + (v - 0.4) * 250 / 4.1);
    const Xinv = (px) => (px <= 230 ? (px - 50) / 450 : px < 250 ? 0.4 : 0.4 + (px - 250) * 4.1 / 250);
    const Yn = (n) => 250 - n * 220 / 1.5;
    const ORN = []; for (let i = 0; i <= 200; i++) ORN.push(i * 0.002); for (let i = 1; i <= 410; i++) ORN.push(+(0.4 + i * 0.01).toFixed(3));
    const alan = (xl) => { const h = 0.001; let a = 0, b = 0; const na = Math.round(xl / h), nb = Math.round((0.25 - xl) / h); for (let i = 0; i < na; i++) a += N((i + 0.5) * h) * h; for (let i = 0; i < nb; i++) { const x = xl + (i + 0.5) * h; b += (Pl(x) - N(x)) * h; } return [a, b]; };
    // grafik ızgarası
    const TK = [[0, '0'], [0.1, '0,1'], [0.2, '0,2'], [0.3, '0,3'], [0.4, '0,4'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [4.5, '4,5']];
    const BANT = [[0, 0.1, '1'], [0.1, 0.2, '2'], [0.2, 4.05, '3'], [4.05, 4.5, '4']];
    el.innerHTML = `<div class="f11-fw">
      <div class="f11-adimlar f11-fw-adim" role="group" aria-label="Adımlar">${ADIM.map((a, i) => `<button type="button" data-i="${i}">${a}</button>`).join('')}</div>
      <div class="btn-row f11-fw-btn"><button type="button" class="btn ghost" data-a="geri">‹ Geri</button><button type="button" class="btn play" data-a="oyna">Oynat</button><button type="button" class="btn ghost" data-a="ileri">İleri ›</button><button type="button" class="btn ghost" data-a="bul">A = B'yi bul</button></div>
      <div class="f11-fw-ana">
        <div class="f11-fw-sema">
          <svg class="f11-svg f11-fw-ssvg" viewBox="0 0 320 224" role="img" aria-label="Ağızlık, spirometre ve N₂ analizörü; trakea, apikal ve bazal alveol birimleri; renk koyulaştıkça N₂ artar">
            <rect class="f11-fw-kutu" x="4" y="6" width="128" height="26" rx="6"/><text class="f11-t f11-fw-kt" x="68" y="23" text-anchor="middle">spirometre · hacim</text>
            <rect class="f11-fw-kutu" x="4" y="38" width="128" height="26" rx="6"/><text class="f11-t f11-fw-kt" x="68" y="55" text-anchor="middle">N₂ analizörü</text>
            <path class="f11-ince" d="M132 19 H140 V35 M132 51 H140 V35 M140 35 H146"/>
            <g class="f11-fw-hy">
              <path class="f11-fw-hd" d="M146 35 H182 V104 M182 104 L236 82 M182 104 L236 158"/>
              <path class="f11-fw-hb" d="M146 35 H182 V104 M182 104 L236 82 M182 104 L236 158"/>
              <path class="f11-fw-hn" d="M146 35 H182 V104 M182 104 L236 82 M182 104 L236 158"/>
            </g>
            <g class="f11-fw-u" data-u="p"></g><g class="f11-fw-u" data-u="b"></g>
            <text class="f11-ts f11-fw-kt" x="258" y="34" text-anchor="middle">apikal</text>
            <text class="f11-ts f11-fw-kt" x="254" y="219" text-anchor="middle">bazal</text>
            <g class="f11-fw-ok"></g>
          </svg>
          <div class="legend f11-lej"><span><i class="f11-sw-n2"></i>N₂ (koyu = çok N₂)</span><span><i class="f11-sw-o2"></i>O₂</span></div>
        </div>
        <div class="f11-fw-graf">
          <svg class="f11-svg f11-fw-gsvg" viewBox="0 0 520 300" role="img" aria-label="Fowler eğrisi: ekspire edilen hacme karşı N₂ konsantrasyonu, dört faz">
            ${BANT.map(([a, b, n]) => `<rect class="f11-fw-bant" data-f="${n}" x="${Xv(a)}" y="20" width="${Xv(b) - Xv(a)}" height="230"/><text class="f11-ts f11-fw-tk f11-fw-fn" data-f="${n}" x="${(Xv(a) + Xv(b)) / 2}" y="14" text-anchor="middle">${n}</text>`).join('')}
            <line class="f11-eks" x1="50" x2="232" y1="250" y2="250"/><line class="f11-eks" x1="248" x2="500" y1="250" y2="250"/><line class="f11-eks" x1="50" x2="50" y1="20" y2="250"/>
            <path class="f11-eks" d="M231 256 L237 244 M243 256 L249 244"/>
            ${TK.map(([v, l]) => `<line class="f11-eks" x1="${Xv(v)}" x2="${Xv(v)}" y1="250" y2="255"/><text class="f11-ts f11-fw-tk${[0.1, 0.3, 1, 3].includes(v) ? ' f11-fw-ara' : ''}${v === 0.4 ? ' f11-fw-k04' : v === 4 ? ' f11-fw-k4' : ''}" x="${Xv(v)}" y="268" text-anchor="middle">${l}</text>`).join('')}
            <text class="f11-ts f11-fw-tk" x="44" y="254" text-anchor="end">0</text>
            <text class="f11-t f11-fw-et" x="50" y="292">Ekspire edilen hacim (L)</text>
            <text class="f11-t f11-fw-et" transform="translate(28 135) rotate(-90)" text-anchor="middle">N₂ konsantrasyonu</text>
            <path class="f11-fw-A"/><path class="f11-fw-B"/>
            <text class="f11-t f11-fw-AB" data-l="A" text-anchor="middle">A</text><text class="f11-t f11-fw-AB" data-l="B" text-anchor="middle">B</text>
            <path class="f11-fw-c"/>
            <g class="f11-fw-f4">
              <line class="f11-fw-kk" x1="${Xv(4.05)}" x2="${Xv(4.05)}" y1="${Yn(1.06) + 6}" y2="250"/>
              <text class="f11-ts f11-fw-tk f11-h" x="${Xv(4.05) - 6}" y="160" text-anchor="end">kapanmanın başladığı nokta</text>
              <path class="f11-fw-cv" d="M${Xv(4.05)} 272 V277 H${Xv(4.5)} V272"/>
              <text class="f11-t f11-fw-et f11-t-k" x="${Xv(4.5)}" y="292" text-anchor="end">kapanma hacmi (CV)</text>
              <text class="f11-t f11-fw-et" x="496" y="40" text-anchor="end">CC = RV + CV</text>
            </g>
            <g class="f11-fw-cz" role="slider" tabindex="0" aria-label="Faz 2 bölme çizgisi" aria-valuemin="50" aria-valuemax="300" aria-valuenow="150" aria-valuetext="150 mL">
              <rect class="f11-fw-cz-al" y="40" width="28" height="214"/>
              <line class="f11-fw-cz-c" y1="250" y2="${Yn(1.32)}"/>
              <circle class="f11-fw-cz-t" cy="${Yn(1.32) - 6}" r="8"/>
              <text class="f11-t f11-fw-et f11-fw-cz-l f11-h" y="${Yn(1.2)}"></text>
            </g>
          </svg>
          <p class="f11-fw-oku" aria-live="polite"></p>
        </div>
      </div>
    </div>`;
    const q = (s) => el.querySelector(s);
    const gsvg = q('.f11-fw-gsvg'), cP = q('.f11-fw-c'), pA = q('.f11-fw-A'), pB = q('.f11-fw-B'), lA = q('[data-l="A"]'), lB = q('[data-l="B"]');
    const f4 = q('.f11-fw-f4'), cz = q('.f11-fw-cz'), czA = q('.f11-fw-cz-al'), czC = q('.f11-fw-cz-c'), czT = q('.f11-fw-cz-t'), czL = q('.f11-fw-cz-l'), oku = q('.f11-fw-oku');
    const bOy = q('[data-a="oyna"]'), bBul = q('[data-a="bul"]'), hn = q('.f11-fw-hn'), gOk = q('.f11-fw-ok');
    // alveol birimleri
    const UN = { p: { c: [258, 70], r: 15, of: [[-9, 7], [9, 7], [0, -8]] }, b: { c: [254, 176], r: 17, of: [[-10, 8], [10, 8], [0, -10]] } };
    Object.entries(UN).forEach(([k, u]) => {
      const g = q(`[data-u="${k}"]`);
      const kat = (cls) => { const gg = mk('g', { class: cls }, g); u.of.forEach(([dx, dy]) => mk('circle', { cx: u.c[0] + dx, cy: u.c[1] + dy, r: u.r }, gg)); return gg; };
      kat('f11-fw-ub'); u.n2 = kat('f11-fw-un'); kat('f11-fw-uc');
      u.g = g;
    });
    // adım başına şema: N₂ düzeyleri (hava yolu, apikal, bazal) ve birim ölçeği
    const SEMA = [[0.6, 0.6, 0.6, 1, 1], [0, 0.78, 0.22, 1.08, 1.1], [0, 0.78, 0.22, 1.04, 1.06], [0.35, 0.78, 0.22, 1, 1.02], [0.45, 0.78, 0.22, 0.95, 0.94], [0.78, 0.78, 0.22, 0.9, 0.86], [0.78, 0.78, 0.22, 0.9, 0.86]];
    const semaCiz = (i) => {
      const [a, p, b, sp, sb] = SEMA[i];
      hn.style.opacity = a; UN.p.n2.style.opacity = p; UN.b.n2.style.opacity = b;
      UN.p.g.setAttribute('transform', `translate(${UN.p.c[0]} ${UN.p.c[1]}) scale(${sp}) translate(${-UN.p.c[0]} ${-UN.p.c[1]})`);
      UN.b.g.setAttribute('transform', `translate(${UN.b.c[0]} ${UN.b.c[1]}) scale(${sb}) translate(${-UN.b.c[0]} ${-UN.b.c[1]})`);
      gOk.innerHTML = '';
      const T = (x, y, s, cls = 'f11-ts f11-fw-kt', anc = 'end') => { const t = mk('text', { x, y, class: cls + ' f11-h', 'text-anchor': anc }, gOk); t.textContent = s; };
      // dal boyunca paralel oklar: apikal dal (182,104)→(236,82), bazal dal (182,104)→(236,158)
      const dalOk = (dal, ic, w, cls) => {
        const [a0, a1] = dal === 'p' ? [[182, 104], [236, 82]] : [[182, 104], [236, 158]];
        const dx = a1[0] - a0[0], dy = a1[1] - a0[1], L = Math.hypot(dx, dy), n = dal === 'p' ? [dy / L * 11, -dx / L * 11] : [-dy / L * 11, dx / L * 11];
        const s = [a0[0] + dx * 0.22 + n[0], a0[1] + dy * 0.22 + n[1]], e = [a0[0] + dx * 0.82 + n[0], a0[1] + dy * 0.82 + n[1]];
        if (ic) okCiz(gOk, s[0], s[1], e[0], e[1], w, cls); else okCiz(gOk, e[0], e[1], s[0], s[1], w, cls);
      };
      const trOk = (yukari, cls, x = 166) => (yukari ? okCiz(gOk, x, 96, x, 50, 2.4, cls) : okCiz(gOk, x, 50, x, 96, 2.4, cls));
      if (i === 0) { okCiz(gOk, 166, 74, 166, 48, 2, 'ink'); okCiz(gOk, 166, 74, 166, 100, 2, 'ink'); T(156, 132, 'tidal soluma'); T(156, 148, 'oda havası'); }
      else if (i === 1) { trOk(false, 'o2'); dalOk('p', true, 1.5, 'o2'); dalOk('b', true, 4.5, 'o2'); T(156, 132, '%100 O₂'); T(156, 148, 'vital kapasite soluğu'); }
      else if (i === 2) { trOk(true, 'o2'); T(156, 132, 'çıkan gaz: O₂'); }
      else if (i === 3) { trOk(true, 'o2', 163); trOk(true, 'n2', 170); T(156, 132, 'çıkan gaz: O₂ + N₂'); }
      else if (i === 4) { trOk(true, 'n2'); dalOk('p', false, 1.6, 'n2'); dalOk('b', false, 4, 'n2'); T(156, 132, 'çıkan gaz: alveoler'); }
      else {
        trOk(true, 'n2'); dalOk('p', false, 2.6, 'n2'); T(156, 132, 'yalnız apikal gaz');
        const c = [lerp(182, 236, 0.74), lerp(104, 158, 0.74)];
        [-5, 5].forEach((d) => mk('line', { x1: c[0] + d * 0.707 - 8 * 0.707, y1: c[1] + d * 0.707 + 8 * 0.707, x2: c[0] + d * 0.707 + 8 * 0.707, y2: c[1] + d * 0.707 - 8 * 0.707, class: 'f11-fw-kap' }, gOk));
        mk('line', { x1: 168, y1: 172, x2: c[0] - 8, y2: c[1] + 6, class: 'f11-ince' }, gOk);
        T(150, 180, 'küçük hava yolu', 'f11-ts f11-fw-kt f11-t-k', 'middle'); T(150, 195, 'kapandı', 'f11-ts f11-fw-kt f11-t-k', 'middle');
      }
    };
    const egriD = (vm) => {
      if (vm <= 0) return '';
      let d = '', onc = null;
      for (const v of ORN) { if (v > vm + 1e-9) break; d += (onc == null ? 'M' : v > 0.4 && onc <= 0.4 ? ' M' : ' L') + Xv(v).toFixed(1) + ' ' + Yn(N(v)).toFixed(1); onc = v; }
      if (onc != null && vm - onc > 1e-6) d += (vm > 0.4 && onc <= 0.4 ? ' M' : ' L') + Xv(vm).toFixed(1) + ' ' + Yn(N(vm)).toFixed(1);
      return d;
    };
    const cizgiGoster = () => adim === 3 || adim === 6;
    const ciz = () => {
      cP.setAttribute('d', egriD(vCiz));
      gsvg.querySelectorAll('.f11-fw-bant, .f11-fw-fn').forEach((r) => r.classList.toggle('on', +r.dataset.f === adim - 1));
      f4.style.display = adim >= 5 && vCiz >= 4.06 ? '' : 'none';
      const g = cizgiGoster() && vCiz >= 0.2;
      cz.style.display = g ? '' : 'none';
      [pA, pB, lA, lB].forEach((e) => { e.style.display = g ? '' : 'none'; });
      bBul.hidden = !cizgiGoster();
      if (!g) { oku.style.visibility = 'hidden'; return; }
      const x = Xv(xL), [a, b] = alan(xL), es = Math.abs(a - b) / Math.max(a, b, 1e-9) < 0.04;
      czA.setAttribute('x', x - 14); czC.setAttribute('x1', x); czC.setAttribute('x2', x); czT.setAttribute('cx', x);
      cz.classList.toggle('ok', es);
      czL.setAttribute('x', x + 12); czL.textContent = es ? 'A = B → anatomik ölü boşluk ≈ 150 mL' : '';
      const mL = Math.round(xL * 1000);
      cz.setAttribute('aria-valuenow', mL); cz.setAttribute('aria-valuetext', mL + ' mL');
      // A: çizginin solunda eğrinin altı; B: sağında eğrinin üstü, platonun altı
      let dA = '';
      if (xL > 0.1) { dA = `M${Xv(0.1)} ${Yn(0)}`; for (let v = 0.1; v < xL; v += 0.002) dA += ` L${Xv(v).toFixed(1)} ${Yn(N(v)).toFixed(1)}`; dA += ` L${x.toFixed(1)} ${Yn(N(xL)).toFixed(1)} L${x.toFixed(1)} ${Yn(0)} Z`; }
      let dB = '';
      if (xL < 0.2) { dB = `M${x.toFixed(1)} ${Yn(N(xL)).toFixed(1)} L${x.toFixed(1)} ${Yn(1)} L${Xv(0.2)} ${Yn(1)}`; for (let v = 0.2; v > xL; v -= 0.002) dB += ` L${Xv(v).toFixed(1)} ${Yn(N(v)).toFixed(1)}`; dB += ' Z'; }
      pA.setAttribute('d', dA); pB.setAttribute('d', dB);
      lA.style.display = a > 0.0012 ? '' : 'none'; lB.style.display = b > 0.0012 ? '' : 'none';
      lA.setAttribute('x', Xv(xL - 0.011).toFixed(1)); lA.setAttribute('y', (Yn(0) - 12).toFixed(1));
      lB.setAttribute('x', Xv(Math.min(0.2, xL) + 0.012).toFixed(1)); lB.setAttribute('y', (Yn(1) + 22).toFixed(1));
      oku.style.visibility = 'visible';
      oku.innerHTML = `Çizgi <b>${mL} mL</b> · A <b>${Math.round(a * 10000)}</b> · B <b>${Math.round(b * 10000)}</b>` + (es ? ' · <span class="f11-ok-y">A = B: anatomik ölü boşluk</span>' : ' · <span>A ile B eşit olana dek sürükleyin</span>');
    };
    const ciziyor = (a, b, ms, done) => {
      const p0 = Xv(a), p1 = Xv(b);
      tw.durdur();
      return tw(ms, (f) => { vCiz = Xinv(lerp(p0, p1, f)); if (f >= 1) vCiz = b; ciz(); }, done);
    };
    const git = (i, anim, otoCizgi) => {
      adim = i; tw.durdur(); twL.durdur();
      el.querySelectorAll('.f11-fw-adim button').forEach((bt) => { const k = +bt.dataset.i; bt.classList.toggle('on', k === i); bt.classList.toggle('past', k < i); bt.setAttribute('aria-pressed', String(k === i)); });
      semaCiz(i);
      if (i === 3) xL = 0.12; else if (i === 6) xL = 0.15;
      if (cap) { if (i === 0) { cap.innerHTML = cap0; cap._h = null; } else yaz(cap, CAPS[i]); }
      const [a, b] = ARALIK[i];
      if (i <= 1) vCiz = 0;
      if (anim && !RM && b > a) {
        vCiz = a; ciz();
        ciziyor(a, b, i === 4 ? 1900 : 1500, () => { if (otoCizgi && i === 3) twL(1500, (f) => { xL = lerp(0.12, 0.15, f); ciz(); }); });
      } else { vCiz = i <= 1 ? 0 : b; ciz(); }
    };
    const durdur = () => { oyn = false; clearTimeout(zam); zam = null; bOy.textContent = 'Oynat'; };
    const sonraki = () => { if (!oyn) return; if (adim >= 6) { durdur(); return; } git(adim + 1, true, true); zam = setTimeout(sonraki, SURE[adim]); };
    const oynat = () => { oyn = true; bOy.textContent = 'Duraklat'; if (adim >= 6) git(0, false); else git(adim, false); zam = setTimeout(sonraki, adim === 0 ? 1600 : 800); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('.f11-fw-adim [data-i]'), a = e.target.closest('[data-a]');
      if (b) { durdur(); git(+b.dataset.i, true, false); return; }
      if (!a) return;
      const k = a.dataset.a;
      if (k === 'oyna') { if (oyn) durdur(); else oynat(); }
      else if (k === 'geri') { durdur(); if (adim > 0) git(adim - 1, false); }
      else if (k === 'ileri') { durdur(); if (adim < 6) git(adim + 1, true, false); }
      else if (k === 'bul') { durdur(); twL.durdur(); const x0 = xL; twL(800, (f) => { xL = lerp(x0, 0.15, f); ciz(); }); }
    });
    // sürükleme ve ok tuşları
    const svgX = (e) => { const pt = gsvg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(gsvg.getScreenCTM().inverse()).x; };
    const xAyarla = (mL) => { xL = clamp(Math.round(mL / 5) * 5, 50, 300) / 1000; ciz(); };
    let surukle = false;
    cz.addEventListener('pointerdown', (e) => { surukle = true; durdur(); twL.durdur(); try { cz.setPointerCapture(e.pointerId); } catch (_) {} xAyarla(Xinv(svgX(e)) * 1000); e.preventDefault(); });
    cz.addEventListener('pointermove', (e) => { if (surukle) xAyarla(Xinv(Math.min(svgX(e), 230)) * 1000); });
    const birak = () => { surukle = false; };
    cz.addEventListener('pointerup', birak); cz.addEventListener('pointercancel', birak);
    cz.addEventListener('keydown', (e) => {
      const m = Math.round(xL * 1000), k = e.key;
      const yeni = k === 'ArrowLeft' || k === 'ArrowDown' ? m - 5 : k === 'ArrowRight' || k === 'ArrowUp' ? m + 5 : k === 'Home' ? 50 : k === 'End' ? 300 : null;
      if (yeni == null) return;
      e.preventDefault(); durdur(); twL.durdur(); xAyarla(yeni);
    });
    git(adim, false);
    return () => { durdur(); tw.durdur(); twL.durdur(); };
  };

  /* =====================================================================
     5 · Bohr denklemi: ekspire edilen CO₂ nereden gelir?
     ===================================================================== */
  VIZ.f11_bohr = (el) => {
    const cap = capEl(el), cap0 = cap ? cap.innerHTML : '', tw = tweener(), twH = tweener();
    const PA = 5.3;
    let kip = 'T', adim = 1, mf = 0, hz = 'n', E = null;
    let H = { vt: 500, an: 150, al: 0 };
    const Hg = { ...H }; // çizimdeki (canlandırılan) değerler
    const HZ = { n: [500, 150, 0], pe: [500, 150, 100], hy: [250, 150, 0] };
    const DENK = [null,
      'V<sub>T</sub> = V<sub>A</sub> + V<sub>D</sub> → <span class="f11-acc">V<sub>A</sub> = V<sub>T</sub> − V<sub>D</sub></span>',
      '<span class="f11-acc">F<sub>A</sub></span> (alveoler) · <span class="f11-acc">F<sub>E</sub></span> (ekspire, karışık) · <span class="f11-acc">F<sub>D</sub></span> (ölü boşluk)',
      'V<sub>T</sub> × F<sub>E</sub> = <span class="f11-acc">V<sub>A</sub> × F<sub>A</sub> + V<sub>D</sub> × F<sub>D</sub></span>',
      '<span class="f11-acc">F<sub>D</sub> = 0</span> → V<sub>T</sub> × F<sub>E</sub> = V<sub>A</sub> × F<sub>A</sub>',
      'V<sub>D</sub> × F<sub>A</sub> = V<sub>T</sub> × (F<sub>A</sub> − F<sub>E</sub>) → <span class="f11-acc">V<sub>D</sub>/V<sub>T</sub> = (F<sub>A</sub> − F<sub>E</sub>) / F<sub>A</sub></span>',
      'V<sub>D</sub>/V<sub>T</sub> = (P<sub>A</sub>CO₂ − PĒCO₂) / P<sub>A</sub>CO₂ ≈ <span class="f11-acc">(PaCO₂ − PĒCO₂) / PaCO₂</span> = (5,3 − 3,7) / 5,3 = <span class="f11-ok-y">0,30</span>'];
    const CAPS = [null, null,
      '<b>2. adım.</b> Üç CO₂ fraksiyonu tanımlanır: alveoler gazda F<sub>A</sub>, ekspire edilen (karışık) gazda F<sub>E</sub>, ölü boşluk gazında F<sub>D</sub>. [[K1 s. 48–49]]',
      '<b>3. adım.</b> Ekspire edilen CO₂\'nin tamamı ya alveolden ya ölü boşluktan gelir: torbadaki CO₂ miktarı (V<sub>T</sub> × F<sub>E</sub>) iki kaynağın toplamıdır. [[K1 s. 49]]',
      '<b>4. adım.</b> Ölü boşluk gazı gaz değişimine katılmadığı için CO₂ içermez (F<sub>D</sub> = 0): torbadaki bütün CO₂ alveollerden gelir. Aynı CO₂ bütün soluğa yayıldığında konsantrasyonu düşer. [[K1 s. 48–49]]',
      '<b>5. adım.</b> V<sub>A</sub> = V<sub>T</sub> − V<sub>D</sub> konur, parantez açılır ve düzenlenir: karışık ekspire gazdaki "eksik" CO₂ oranı, ölü boşluğun tidal hacimdeki payına eşittir. [[K1 s. 49]]',
      '<b>6. adım.</b> Parsiyel basınçlar konsantrasyonlarla orantılıdır: Bohr denklemi. Ölçümü kolaylaştırmak için alveoler PCO₂ yerine arteriyel PCO₂ konur. Örnekte V<sub>D</sub>/V<sub>T</sub> 0,30\'dur, normal aralıkta (0,2–0,35). PĒCO₂ karışık ekspire gazın, yani torbanın değeridir, end-tidal değer değildir (Atlas notu). [[K1 s. 48–49]]'];
    const CAPH = {
      n: '<b>Normal.</b> CO₂ içermeyen 150 mL ölü boşluk gazı karışık ekspire gazı seyreltir: PĒCO₂ 3,71 kPa, V<sub>D</sub>/V<sub>T</sub> 0,30, normal aralıkta (0,2–0,35). End-tidal gaz alveoler gazdır ve modelde PaCO₂\'ye eşittir; bu yüzden end-tidal değerle hesaplanan oran sıfıra yakındır. [[K1 s. 48–49]]',
      pe: '<b>Pulmoner emboli.</b> Ventile ama perfüze olmayan alveollerin CO₂\'siz gazı alveoler gazla birlikte çıkar: fizyolojik V<sub>D</sub>/V<sub>T</sub> 0,50\'ye çıkar ve end-tidal PCO₂ PaCO₂\'nin altına düşer (3,79 kPa). PaCO₂ ile end-tidal değer arasındaki fark alveoler ölü boşluğu yansıtır (Atlas notu). [[K1 s. 46, 48]]',
      hy: '<b>Hızlı yüzeyel soluma.</b> Anatomik ölü boşluk değişmez ama tidal hacim küçüldüğü için payı büyür: V<sub>D</sub>/V<sub>T</sub> 0,60. Hasta 2\'nin PaCO₂\'sinin yükselmesinin bir başka anlatımı budur. [[K1 s. 47–48]]',
    };
    const pid = uid('pat');
    el.innerHTML = `<div class="f11-bh">
      ${segHtml('Görünüm', 'k', [['T', 'Türetme'], ['H', 'Hesapla']], 'T')}
      <svg class="f11-svg f11-bh-svg" role="img" aria-label="Ekspire edilen hacme karşı PCO₂ izi, ölü boşluk ve alveoler gaz alanları ve bütün soluğun toplandığı torba"></svg>
      <div class="f11-bh-t">
        <p class="f11-denk" aria-live="polite"></p>
        <div class="f11-bh-nav"><button type="button" class="btn ghost" data-a="geri">‹ Geri</button>
          <div class="f11-nokta" role="group" aria-label="Türetme adımları">${[1, 2, 3, 4, 5, 6].map((i) => `<button type="button" data-i="${i}" aria-label="${i}. adım">${i}</button>`).join('')}</div>
          <button type="button" class="btn ghost" data-a="ileri">İleri ›</button></div>
      </div>
      <div class="f11-bh-h" hidden>
        <div class="f11-bh-ctl">
          ${segHtml('Hazır durumlar', 'h', [['n', 'Normal'], ['pe', 'Pulmoner emboli'], ['hy', 'Hızlı yüzeyel soluma']], 'n')}
          <label class="f11-rng"><span>Tidal hacim <b data-o="vt"></b></span><input type="range" min="250" max="800" step="10" value="500" data-r="vt" aria-label="Tidal hacim (mL)"></label>
          <label class="f11-rng"><span>Anatomik ölü boşluk <b data-o="an"></b></span><input type="range" min="100" max="250" step="10" value="150" data-r="an" aria-label="Anatomik ölü boşluk (mL)"></label>
          <label class="f11-rng"><span>Alveoler ölü boşluk <b data-o="al"></b></span><input type="range" min="0" max="200" step="10" value="0" data-r="al" aria-label="Alveoler ölü boşluk (mL)"></label>
          <p class="f11-sabit">PaCO₂ 5,3 kPa (sabit) · perfüze alveollerin PCO₂'si = PaCO₂</p>
        </div>
        <dl class="f11-bh-oku">
          <div><dt>PĒCO₂ (karışık ekspire)</dt><dd data-o="pe"></dd></div>
          <div><dt>PETCO₂ (end-tidal)</dt><dd data-o="pet"></dd></div>
          <div class="f11-bh-ana"><dt>V<sub>D</sub>/V<sub>T</sub>, Bohr–Enghoff (fizyolojik)</dt><dd data-o="en"></dd>
            <div class="f11-mt" aria-hidden="true"><span class="f11-mt-bant"></span><span class="f11-mt-fl"></span><span class="f11-mt-n"></span></div>
            <div class="f11-mt-tk" aria-hidden="true"><em style="left:0">0</em><em style="left:20%">0,2</em><em style="left:35%">0,35</em><em style="left:100%">1</em></div>
            <p class="f11-mt-d" data-o="nd"></p></div>
          <div><dt>Bohr, P<sub>A</sub>CO₂ yerine PETCO₂ ile (anatomik)</dt><dd data-o="bp"></dd></div>
          <div><dt>(PaCO₂ − PETCO₂) / PaCO₂ (alveoler ölü boşluk göstergesi)</dt><dd data-o="ai"></dd></div>
        </dl>
      </div>
    </div>`;
    const q = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const svg = q('.f11-bh-svg'), denk = q('.f11-denk');
    const r = { vt: q('[data-r="vt"]'), an: q('[data-r="an"]'), al: q('[data-r="al"]') };
    const kurSvg = () => {
      const m = darMi();
      const L = m ? { w: 360, h: 386, x0: 46, x1: 344, y0: 200, ky: 29, b1: 214, b2: 244, tb: { x: 20, y: 296, w: 112, h: 82 }, tl: [146, 322], dar: true }
        : { w: 600, h: 300, x0: 56, x1: 396, y0: 232, ky: 34, b1: 246, b2: 274, tb: { x: 452, y: 84, w: 124, h: 140 }, tl: [514, 246], dar: false };
      svg.setAttribute('viewBox', `0 0 ${L.w} ${L.h}`);
      svg.classList.toggle('dar', m);
      const Y = (p) => L.y0 - p * L.ky;
      let iz = '';
      [0, 2, 4, 6].forEach((p) => { iz += `<line class="f11-izg" x1="${L.x0}" x2="${L.x1}" y1="${Y(p)}" y2="${Y(p)}"/><text class="f11-ts f11-bh-tk" x="${L.x0 - 8}" y="${Y(p) + 4}" text-anchor="end">${p}</text>`; });
      const tb = L.tb, tbD = `M${tb.x + 14} ${tb.y} H${tb.x + tb.w - 14} Q${tb.x + tb.w} ${tb.y} ${tb.x + tb.w} ${tb.y + 16} V${tb.y + tb.h - 22} Q${tb.x + tb.w} ${tb.y + tb.h} ${tb.x + tb.w / 2} ${tb.y + tb.h} Q${tb.x} ${tb.y + tb.h} ${tb.x} ${tb.y + tb.h - 22} V${tb.y + 16} Q${tb.x} ${tb.y} ${tb.x + 14} ${tb.y} Z`;
      const okD = m ? `M${tb.x + tb.w / 2} ${L.b2 + 24} V${tb.y - 6}` : `M${L.x1 + 8} ${Y(2.6)} H${tb.x - 6}`;
      svg.innerHTML = `<defs>${marker(pid + 'm', 'f11-mk-basic')}<pattern id="${pid}" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)"><rect class="f11-bh-pp" width="10" height="10"/><rect class="f11-bh-pn" width="0" height="10"/></pattern></defs>
        ${iz}
        <line class="f11-eks" x1="${L.x0}" x2="${L.x1}" y1="${L.y0}" y2="${L.y0}"/><line class="f11-eks" x1="${L.x0}" x2="${L.x0}" y1="${Y(6.3)}" y2="${L.y0}"/>
        <text class="f11-t f11-bh-et" transform="translate(${m ? 12 : 16} ${Y(3)}) rotate(-90)" text-anchor="middle">PCO₂ (kPa)</text>
        <rect class="f11-bh-ds"/><rect class="f11-bh-alv"/><rect class="f11-bh-mr"/><rect class="f11-bh-eq"/>
        <rect class="f11-bh-g5"/><rect class="f11-bh-g5u"/>
        <path class="f11-bh-iz"/>
        <line class="f11-bh-pa"/><text class="f11-ts f11-bh-tk f11-bh-pal f11-h" text-anchor="end"></text>
        <line class="f11-bh-pe"/><text class="f11-ts f11-bh-tk f11-bh-pel f11-h"></text>
        <text class="f11-t f11-bh-et f11-bh-dst f11-h" text-anchor="middle"></text><text class="f11-t f11-bh-et f11-bh-dst2 f11-h" text-anchor="middle"></text>
        <text class="f11-t f11-bh-et f11-bh-alt f11-h" text-anchor="middle"></text><text class="f11-ts f11-bh-tk f11-bh-alt2 f11-h" text-anchor="middle"></text>
        <text class="f11-ts f11-bh-tk f11-bh-petl f11-h" text-anchor="end"></text>
        <text class="f11-t f11-bh-et f11-bh-g5l f11-t-a f11-h" text-anchor="middle"></text><text class="f11-t f11-bh-et f11-bh-g5ul f11-t-a f11-h" text-anchor="middle"></text>
        <g class="f11-bh-fark"><path class="f11-bh-fp"/><text class="f11-ts f11-bh-tk f11-t-k f11-h" text-anchor="end">PaCO₂ − PETCO₂</text></g>
        <g class="f11-bh-brk"></g>
        <g class="f11-bh-f"></g>
        <path class="f11-bh-tor" d="${tbD}"/>
        <path class="f11-bh-tok" d="${okD}" marker-end="url(#${pid}m)"/>
        <text class="f11-ts f11-bh-tk" x="${m ? tb.x + tb.w / 2 + 10 : tb.x + tb.w / 2}" y="${m ? L.b2 + 40 : tb.y - 12}" text-anchor="${m ? 'start' : 'middle'}">ekspire gazın tamamı</text>
        <text class="f11-t f11-bh-et" x="${L.tl[0]}" y="${L.tl[1]}" text-anchor="${m ? 'start' : 'middle'}">bütün soluk karışır</text>
        <text class="f11-t f11-bh-et f11-bh-torl" x="${L.tl[0]}" y="${L.tl[1] + 18}" text-anchor="${m ? 'start' : 'middle'}"></text>
        <text class="f11-ts f11-bh-tk f11-bh-tor2" x="${L.tl[0]}" y="${L.tl[1] + 34}" text-anchor="${m ? 'start' : 'middle'}"></text>`;
      const g = (c) => svg.querySelector('.' + c);
      E = { L, Y, ds: g('f11-bh-ds'), alv: g('f11-bh-alv'), mr: g('f11-bh-mr'), eq: g('f11-bh-eq'), iz: g('f11-bh-iz'), pa: g('f11-bh-pa'), pal: g('f11-bh-pal'), pe: g('f11-bh-pe'), pel: g('f11-bh-pel'),
        dst: g('f11-bh-dst'), dst2: g('f11-bh-dst2'), alt: g('f11-bh-alt'), alt2: g('f11-bh-alt2'), g5: g('f11-bh-g5'), g5u: g('f11-bh-g5u'), g5l: g('f11-bh-g5l'), g5ul: g('f11-bh-g5ul'),
        fark: g('f11-bh-fark'), fp: g('f11-bh-fp'), brk: g('f11-bh-brk'), f: g('f11-bh-f'), tor: g('f11-bh-tor'), torl: g('f11-bh-torl'), tor2: g('f11-bh-tor2'), petl: g('f11-bh-petl'), pn: svg.querySelector('.f11-bh-pn') };
    };
    const R = (e, x, y, w, h) => { e.setAttribute('x', x.toFixed(1)); e.setAttribute('y', y.toFixed(1)); e.setAttribute('width', Math.max(0, w).toFixed(1)); e.setAttribute('height', Math.max(0, h).toFixed(1)); };
    const yatay = (e, x1, x2, y) => { e.setAttribute('x1', x1.toFixed(1)); e.setAttribute('x2', x2.toFixed(1)); e.setAttribute('y1', y.toFixed(1)); e.setAttribute('y2', y.toFixed(1)); };
    const goster = (e, v) => { e.style.display = v ? '' : 'none'; };
    const metin = (e, x, y, s) => { e.setAttribute('x', x.toFixed(1)); e.setAttribute('y', y.toFixed(1)); e.innerHTML = s; };
    const ciz = () => {
      if (!E) return;
      const { L, Y } = E, T = kip === 'T';
      const vt = T ? 500 : Hg.vt, an = T ? 150 : Hg.an, al = T ? 0 : Hg.al, vap = vt - an - al;
      const X = (v) => L.x0 + v / vt * (L.x1 - L.x0);
      const pet = PA * vap / (vt - an), pe = PA * vap / vt, plat = T ? PA : pet;
      const xa = X(an);
      // ölü boşluk şeridi ve alveoler alan
      R(E.ds, L.x0, Y(0) - 9, xa - L.x0, 9);
      R(E.alv, xa, Y(plat), L.x1 - xa, Y(0) - Y(plat));
      E.alv.style.fill = !T && al > 0 ? `url(#${pid})` : '';
      E.pn.setAttribute('width', (10 * al / Math.max(1, al + vap)).toFixed(2));
      E.iz.setAttribute('d', `M${L.x0} ${Y(0)} H${xa.toFixed(1)} V${Y(plat).toFixed(1)} H${L.x1}`);
      // kipe ve adıma göre görünürlük
      const glow = T && adim === 3;
      E.alv.classList.toggle('parla', glow); E.ds.classList.toggle('parla', glow || (T && adim === 4)); E.tor.classList.toggle('parla', glow);
      E.alv.classList.toggle('hayal', T && adim >= 4);
      // 4. adım: alan korunarak tam genişliğe yayılma
      const mOn = T && adim >= 4;
      goster(E.mr, mOn);
      if (mOn) { const w0 = L.x1 - xa, w1 = L.x1 - L.x0, A = w0 * (Y(0) - Y(PA)), w = lerp(w0, w1, mf), h = A / w; R(E.mr, L.x1 - w, Y(0) - h, w, h); }
      goster(E.eq, !T); if (!T) R(E.eq, L.x0, Y(pe), L.x1 - L.x0, Y(0) - Y(pe));
      // çizgiler
      const paOn = T ? adim >= 6 : true, peOn = T ? adim >= 4 : true;
      goster(E.pa, paOn); goster(E.pal, paOn);
      yatay(E.pa, L.x0, L.x1, Y(PA)); metin(E.pal, L.x1 - 2, Y(PA) - 6, 'PaCO₂ 5,3');
      goster(E.pe, peOn && (!T || mf > 0.98)); goster(E.pel, peOn && (!T || mf > 0.98));
      yatay(E.pe, L.x0, L.x1, Y(pe)); metin(E.pel, L.x0 + 6, Y(pe) - 6, `PĒCO₂ (karışık) ${fmt(pe, 2)}`);
      // alan etiketleri
      const dsGen = xa - L.x0;
      const dsOn = dsGen > (L.dar ? 70 : 80), mx = (L.x0 + xa) / 2;
      goster(E.dst, dsOn); goster(E.dst2, dsOn);
      metin(E.dst, mx, Y(0) - (L.dar ? 50 : 36), L.dar ? `<tspan x="${mx.toFixed(1)}">ölü boşluk</tspan><tspan x="${mx.toFixed(1)}" dy="16">gazı</tspan>` : 'ölü boşluk gazı');
      metin(E.dst2, mx, Y(0) - 17, T && adim === 4 ? '<tspan class="f11-t-a">CO₂ yok</tspan>' : 'CO₂ yok');
      const ax = (xa + L.x1) / 2, ay = (Y(plat) + Y(0)) / 2;
      const yok = T && adim >= 4;
      goster(E.alt, !yok); goster(E.alt2, !T && al > 0 && !yok);
      metin(E.alt, ax, ay - (!T && al > 0 ? 12 : -4), 'alveoler gaz');
      metin(E.alt2, ax, ay + 8, `<tspan x="${ax.toFixed(1)}">perfüze ${Math.round(vap)} mL</tspan><tspan x="${ax.toFixed(1)}" dy="15">perfüze olmayan ${Math.round(al)} mL</tspan>`);
      goster(E.petl, !T);
      metin(E.petl, L.x1 - 6, Y(plat) + 16, `PETCO₂ ${fmt(pet, 2)}`);
      // 5. adım: V_D × F_A = V_T × (F_A − F_E)
      const a5 = T && adim === 5;
      [E.g5, E.g5u, E.g5l, E.g5ul].forEach((e) => goster(e, a5));
      if (a5) {
        R(E.g5, L.x0, Y(PA), xa - L.x0, Y(0) - Y(PA)); R(E.g5u, L.x0, Y(PA), L.x1 - L.x0, Y(pe) - Y(PA));
        metin(E.g5l, (L.x0 + xa) / 2, (Y(PA) + Y(0)) / 2 + 4, `V${sub('D')} × F${sub('A')}`);
        metin(E.g5ul, (xa + L.x1) / 2 + 10, (Y(PA) + Y(pe)) / 2 + 5, `V${sub('T')} × (F${sub('A')} − F${sub('E')})`);
      }
      // PaCO₂ − PETCO₂ farkı (Hesapla, alveoler ölü boşluk varken)
      const fOn = !T && Y(pet) - Y(PA) > 6;
      goster(E.fark, fOn);
      if (fOn) { const fx = L.x1 - 12; E.fp.setAttribute('d', `M${fx - 5} ${Y(PA)} H${fx} V${Y(pet)} H${fx - 5}`); const tx = E.fark.querySelector('text'); tx.setAttribute('x', fx - 8); tx.setAttribute('y', ((Y(PA) + Y(pet)) / 2 + 4).toFixed(1)); }
      // ayraçlar
      E.brk.innerHTML = '';
      const ayrac = (x1, x2, y, html, cls = '') => {
        mk('path', { d: `M${x1.toFixed(1)} ${y - 5} V${y} H${x2.toFixed(1)} V${y - 5}`, class: 'f11-bh-ay ' + cls }, E.brk);
        const t = mk('text', { x: ((x1 + x2) / 2).toFixed(1), y: y + 15, class: 'f11-t f11-bh-et ' + cls, 'text-anchor': 'middle' }, E.brk); t.innerHTML = html;
      };
      const vurgu = T && adim === 1 ? 'f11-t-a vurgu' : '';
      if (T) {
        ayrac(L.x0 + 1, xa - 1, L.b1, adim === 5 ? `V${sub('D')} 150` : `V${sub('D')}`, vurgu);
        ayrac(xa + 1, L.x1 - 1, L.b1, `V${sub('A')}`, vurgu);
        ayrac(L.x0 + 1, L.x1 - 1, L.b2, (adim === 5 ? `V${sub('T')} 500` : `V${sub('T')}`) + ' · ekspire edilen hacim', vurgu);
      } else {
        ayrac(L.x0 + 1, xa - 1, L.b1, 'anatomik');
        ayrac(xa + 1, L.x1 - 1, L.b1, 'alveoler bölüm');
        ayrac(L.x0 + 1, L.x1 - 1, L.b2, `V${sub('T')} ${Math.round(vt)} mL · ekspire edilen hacim`);
      }
      // 2. adım: örnekleme noktaları
      E.f.innerHTML = '';
      if (T && adim === 2) {
        const tb = L.tb, nok = [[(L.x0 + xa) / 2, Y(0) - 4, `F${sub('D')}`], [(xa + L.x1) / 2, Y(PA), `F${sub('A')}`], [tb.x + tb.w / 2, tb.y + tb.h / 2, `F${sub('E')}`]];
        nok.forEach(([x, y, s]) => { mk('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 6, class: 'f11-bh-fn' }, E.f); const t = mk('text', { x: (x + 10).toFixed(1), y: (y - 9).toFixed(1), class: 'f11-t f11-bh-et f11-t-a f11-h' }, E.f); t.innerHTML = s; });
      }
      // torba
      E.tor.style.fillOpacity = (pe / PA * 0.85).toFixed(3);
      E.torl.innerHTML = `PĒCO₂ ${fmt(pe, 2)} kPa`;
      E.tor2.textContent = 'karışık ekspire gaz';
    };
    const okuH = () => {
      const { vt, an, al } = H, vap = vt - an - al;
      const pe = PA * vap / vt, pet = PA * vap / (vt - an);
      const en = (an + al) / vt, bp = an / vt, ai = al / (vt - an);
      o('vt').textContent = vt + ' mL'; o('an').textContent = an + ' mL'; o('al').textContent = al + ' mL';
      o('pe').textContent = fmt(pe, 2) + ' kPa'; o('pet').textContent = fmt(pet, 2) + ' kPa';
      o('en').textContent = fmt(en, 2); o('bp').textContent = fmt(bp, 2); o('ai').textContent = fmt(ai, 2);
      const enY = yuv(en, 2), nrm = enY >= 0.2 && enY <= 0.35, durum = nrm ? 'normal aralıkta' : enY > 0.35 ? 'normalin üstünde' : 'normalin altında';
      q('.f11-mt-fl').style.width = clamp(en, 0, 1) * 100 + '%'; q('.f11-mt-n').style.left = clamp(en, 0, 1) * 100 + '%';
      q('.f11-mt').classList.toggle('ok', nrm);
      o('nd').textContent = durum;
      r.an.max = Math.min(250, vt - 20); r.al.max = Math.max(0, Math.min(200, vt - an - 20));
      if (kip !== 'H') return;
      if (hz) yaz(cap, CAPH[hz]);
      else yaz(cap, `<b>V<sub>T</sub> ${vt} mL, anatomik ${an} mL, alveoler ${al} mL.</b> Fizyolojik V<sub>D</sub>/V<sub>T</sub> ${fmt(en, 2)} (${durum}). ` + (al > 0 ? 'Alveoler ölü boşluk end-tidal PCO₂\'yi PaCO₂\'nin altına çeker. ' : 'Alveoler ölü boşluk yokken end-tidal PCO₂ PaCO₂\'ye eşittir. ') + '[[K1 s. 48–49]]');
    };
    const hesapGit = (anim) => {
      twH.durdur();
      const a = { ...Hg }, b = { ...H };
      if (!anim) { Object.assign(Hg, b); ciz(); return; }
      twH(300, (f) => { Hg.vt = lerp(a.vt, b.vt, f); Hg.an = lerp(a.an, b.an, f); Hg.al = lerp(a.al, b.al, f); ciz(); });
    };
    const adimGit = (i, anim) => {
      const onc = adim; adim = clamp(i, 1, 6); tw.durdur();
      el.querySelectorAll('.f11-nokta [data-i]').forEach((bt) => { const k = +bt.dataset.i; bt.classList.toggle('on', k === adim); bt.classList.toggle('past', k < adim); bt.setAttribute('aria-pressed', String(k === adim)); });
      denk.innerHTML = DENK[adim];
      q('[data-a="geri"]').disabled = adim === 1; q('[data-a="ileri"]').disabled = adim === 6;
      if (cap) { if (adim === 1) { cap.innerHTML = cap0; cap._h = null; } else yaz(cap, CAPS[adim]); }
      if (adim === 4 && anim && onc === 3 && !RM) { mf = 0; ciz(); tw(800, (f) => { mf = f; ciz(); }); }
      else { mf = adim >= 4 ? 1 : 0; ciz(); }
    };
    el.addEventListener('click', (e) => {
      const k = e.target.closest('[data-k]'), a = e.target.closest('[data-a]'), d = e.target.closest('.f11-nokta [data-i]'), h = e.target.closest('[data-h]');
      if (k) {
        kip = k.dataset.k; bas(el, 'k', kip);
        q('.f11-bh-t').hidden = kip !== 'T'; q('.f11-bh-h').hidden = kip !== 'H';
        if (cap) cap._h = null;
        if (kip === 'T') adimGit(adim, false); else { okuH(); hesapGit(false); }
      } else if (d) adimGit(+d.dataset.i, true);
      else if (a && a.dataset.a === 'geri') adimGit(adim - 1, false);
      else if (a && a.dataset.a === 'ileri') adimGit(adim + 1, true);
      else if (h) {
        hz = h.dataset.h; [H.vt, H.an, H.al] = HZ[hz]; bas(el, 'h', hz);
        r.vt.value = H.vt; okuH(); r.an.value = H.an; r.al.value = H.al; okuH(); hesapGit(true);
      }
    });
    el.addEventListener('input', (e) => {
      const s = e.target.closest('[data-r]'); if (!s) return;
      H[s.dataset.r] = +s.value;
      H.an = Math.min(H.an, H.vt - 20); H.al = clamp(H.al, 0, Math.max(0, H.vt - H.an - 20));
      hz = null; bas(el, 'h', '');
      okuH(); r.vt.value = H.vt; r.an.value = H.an; r.al.value = H.al;
      hesapGit(true);
    });
    const mq = window.matchMedia ? window.matchMedia('(max-width:600px)') : null;
    const mqF = () => { kurSvg(); ciz(); };
    if (mq) (mq.addEventListener ? mq.addEventListener('change', mqF) : mq.addListener(mqF));
    kurSvg(); okuH(); adimGit(1, false);
    return () => { tw.durdur(); twH.durdur(); if (mq) (mq.removeEventListener ? mq.removeEventListener('change', mqF) : mq.removeListener(mqF)); };
  };
})();

/* =====================================================================
   6 · f11_tanim · Bir soluk nereye gider? Ölü boşluğun tipleri ve ölçümü
   Durağan, etiketli şematik çizim; dokunma/üzerine gelme bir bölgeyi vurgular.
   ===================================================================== */
(function () {
  'use strict';
  const { REF } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const V = 'V̇', Q = 'Q̇';
  const f1 = (v) => v.toFixed(1);
  const xy = (p) => f1(p[0]) + ' ' + f1(p[1]);
  const mk = (tag, attrs, parent, html) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; };
  const sub = (t) => `<tspan baseline-shift="sub" font-size="72%">${t}</tspan>`;
  const sup = (t) => `<tspan baseline-shift="super" font-size="68%">${t}</tspan>`;

  VIZ.f11_tanim = (el) => {
    const vizEl = el.closest('.viz');
    const cap = vizEl ? vizEl.querySelector('.viz-cap') : null;
    const cap0 = cap ? cap.innerHTML : '';
    const CAP = {
      1: '<b>Anatomik ölü boşluk.</b> Üst hava yolları ve trakeobronşiyal ağacın iletici ilk 16 kuşağı: soluğun burada kalan bölümü alveole hiç ulaşmaz. 70 kg\'lık erkekte 150 mL, ≈2 mL/kg, normal V<sub>T</sub>\'nin üçte biri; Fowler yöntemiyle ölçülür. [[K1 s. 45]]',
      2: `<b>Alveoler ölü boşluk.</b> Ventile olduğu hâlde yeterince perfüze olmayan alveollerin hacmi (${V}/${Q} uyumsuzluğu). Normal akciğerde ihmal edilebilir; doğrudan ölçülemez, fizyolojik ile anatomik ölü boşluğun farkından hesaplanır. [[K1 s. 45]]`,
      3: '<b>Alveoler hacim.</b> Soluğun perfüze alveollere ulaşan ve gaz değişimine katılan bölümü: 500 − 150 = 350 mL. [[K1 s. 45, 47]]',
      4: '<b>Mekanik ölü boşluk.</b> Anesteziye özgü tip: solunum sisteminin ekspirasyon sonunda ekshale edilmiş gaz içeren bölümü. Bain devresi, halka sistemi ya da Hudson maskesi, her hava yolu aracı onu artırır. [[K1 s. 47]]',
      5: '<b>Fizyolojik ölü boşluk.</b> Ayrı bir bölge değil, toplam ölü boşluktur: anatomik + alveoler. Bohr denklemiyle tidal hacme oranı olarak ölçülür; tidal solunumda V<sub>D</sub>/V<sub>T</sub> normalde 0,2–0,35\'tir. [[K1 s. 45, 48]]',
    };
    const LEJ = [
      [1, 'an', 'Anatomik ölü boşluk', 'V<sub>D</sub><sup>Anat</sup>', 'Üst hava yolları + trakeobronşiyal ağacın ilk 16 kuşağı (iletici hava yolları). 70 kg\'da <b>150 mL</b> ≈ 2 mL/kg ≈ V<sub>T</sub>\'nin (7 mL/kg) üçte biri. Ölçüm: <b>Fowler yöntemi</b>.'],
      [2, 'al', 'Alveoler ölü boşluk', 'V<sub>D</sub><sup>Alv</sup>', `Ventile ama yetersiz perfüze alveoller (${V}/${Q} uyumsuzluğu). Normalde <b>ihmal edilebilir</b>. Doğrudan ölçülemez: <b>fizyolojik − anatomik</b>.`],
      [3, 'va', 'Alveoler hacim', 'V<sub>A</sub>', 'Perfüze alveollere ulaşan, gaz değişimine katılan bölüm: 500 − 150 = <b>350 mL</b>.'],
      [4, 'mk', 'Mekanik ölü boşluk', '', 'Anestezi ekipmanı: solunum sisteminin ekspirasyon sonunda ekshale edilmiş gaz içeren bölümü. Ayrıntı aşağıda.'],
      [5, 'ph', 'Fizyolojik ölü boşluk', 'V<sub>D</sub><sup>Phys</sup> = V<sub>D</sub><sup>Anat</sup> + V<sub>D</sub><sup>Alv</sup>', 'Toplam ölü boşluk. Ölçüm: <b>Bohr denklemi</b>, V<sub>D</sub>/V<sub>T</sub> normal <b>0,2–0,35</b>.'],
    ];
    el.innerHTML = `<div class="f11-tn">
      <svg class="f11-svg f11-tn-svg" viewBox="0 0 420 422" role="img" aria-label="Bir soluğun bölümleri: anatomik ölü boşluk, alveoler ölü boşluk, alveoler hacim; anestezide mekanik ölü boşluk"></svg>
      <div class="f11-tn-lej" role="group" aria-label="Ölü boşluk tipleri">${LEJ.map(([n, c, ad, sim, ac]) => `<button type="button" class="f11-tn-sat" data-n="${n}" aria-pressed="false"><i class="f11-tn-kare f11-tn-${c}" aria-hidden="true">${n}</i><span><b class="f11-tn-ad">${ad}</b>${sim ? ` <span class="f11-tn-sim">${sim}</span>` : ''}<span class="f11-tn-ac">${ac}</span></span></button>`).join('')}</div>
    </div>`;
    const svg = el.querySelector('svg');
    const grp = (k, parent = svg) => mk('g', { 'data-k': k }, parent);

    // geometri
    const dir = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
    const add = (p, u, s) => [p[0] + u[0] * s, p[1] + u[1] * s];
    const KAR = [210, 150], LH = [160, 185], RH = [260, 185];
    const TB = [ // terminal bronşiyol uçları: perfüze (p) / ölü (d)
      { a: LH, e: [110, 255], t: 'p' }, { a: LH, e: [165, 270], t: 'p' },
      { a: RH, e: [255, 270], t: 'p' }, { a: RH, e: [310, 255], t: 'd' },
    ];
    const SEG = [[[210, 46], KAR, 16], [KAR, LH, 11], [KAR, RH, 11], ...TB.map((b) => [b.a, b.e, 7])];
    const RR = 35;

    // 4 · mekanik ölü boşluk (ekipman)
    const g4 = grp('4');
    mk('path', { d: 'M202 32 V44 Q202 50 208 50 H212 Q218 50 218 44 V32', class: 'f11-tn-mk-y' }, g4);
    mk('rect', { x: 150, y: 14, width: 120, height: 18, rx: 9, class: 'f11-tn-mk-y' }, g4);
    mk('text', { x: 280, y: 22, class: 'f11-tn-l f11-tn-c-mk f11-tn-gen' }, g4, 'ekipman ·');
    mk('text', { x: 280, y: 37, class: 'f11-tn-l f11-tn-c-mk f11-tn-gen' }, g4, 'yalnız anestezide');
    ['ekipman ·', 'yalnız', 'anestezide'].forEach((t, i) => mk('text', { x: 280, y: 16 + i * 15, class: 'f11-tn-l f11-tn-c-mk f11-tn-dar' }, g4, t));

    // 1 · anatomik ölü boşluk (iletici hava yolları)
    const g1 = grp('1 5');
    SEG.forEach(([a, b, w]) => mk('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'f11-tn-du', style: `stroke-width:${w + 4}px` }, g1));
    SEG.forEach(([a, b, w]) => mk('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'f11-tn-lu', style: `stroke-width:${w}px` }, g1));
    mk('path', { d: 'M28 56 H20 V228 H28', class: 'f11-tn-cet' }, g1);
    mk('text', { x: 32, y: 60, class: 'f11-tn-l f11-tn-c-an' }, g1, 'kuşak 0');
    mk('text', { x: 32, y: 232, class: 'f11-tn-l f11-tn-c-an' }, g1, 'kuşak 16');
    mk('text', { x: 32, y: 138, class: 'f11-tn-l f11-tn-c-an' }, g1, 'iletici');
    mk('text', { x: 32, y: 154, class: 'f11-tn-l f11-tn-c-an' }, g1, 'hava yolları');

    // asinüsler (3 · perfüze, 2 · ölü)
    const g3 = grp('3'), g2 = grp('2 5');
    const RBC = [];
    TB.forEach((b) => {
      const u = dir(b.a, b.e), n = [-u[1], u[0]], C = add(b.e, u, 24), ol = b.t === 'd';
      const g = ol ? g2 : g3;
      const phi = Math.atan2(-u[1], -u[0]), GAP = 40 * Math.PI / 180;
      const pts = Array.from({ length: 41 }, (_, i) => { const t = phi + GAP + (2 * Math.PI - 2 * GAP) * i / 40; return [C[0] + RR * Math.cos(t), C[1] + RR * Math.sin(t)]; });
      mk('path', { d: 'M' + pts.map(xy).join(' L'), class: ol ? 'f11-tn-kap-yok' : 'f11-tn-kap' }, g);
      [add(C, u, -11), add(add(C, u, 8), n, 12), add(add(C, u, 8), n, -12)].forEach((c) => mk('circle', { cx: f1(c[0]), cy: f1(c[1]), r: 12, class: ol ? 'f11-tn-alv-d' : 'f11-tn-alv' }, g));
      if (ol) {
        const x = add(C, u, RR);
        mk('text', { x: f1(x[0]), y: f1(x[1] + 5), class: 'f11-tn-carpi', 'text-anchor': 'middle' }, g, '×');
      } else {
        [3, 9, 15, 21, 27, 33, 39].forEach((i) => RBC.push(mk('circle', { cx: f1(pts[i][0]), cy: f1(pts[i][1]), r: 2.6, class: 'f11-tn-rbc' }, g)));
        // gaz değişimi: alveol ile kapiller arasında çift ok
        const p0 = add(C, u, 19), p1 = add(C, u, 31);
        mk('line', { x1: f1(p0[0]), y1: f1(p0[1]), x2: f1(p1[0]), y2: f1(p1[1]), class: 'f11-tn-ok' }, g);
        [[p1, 1], [p0, -1]].forEach(([p, s]) => { const bx = add(p, u, -4 * s); mk('path', { d: `M${xy(p)} L${xy(add(bx, n, 2.6))} L${xy(add(bx, n, -2.6))} Z`, class: 'f11-tn-ok-uc' }, g); });
      }
    });
    mk('text', { x: 20, y: 334, class: 'f11-tn-l f11-tn-c-va' }, g3, 'perfüze alveol');
    mk('text', { x: 410, y: 326, class: 'f11-tn-l f11-tn-c-al', 'text-anchor': 'end' }, g2, 'ventile,');
    mk('text', { x: 410, y: 341, class: 'f11-tn-l f11-tn-c-al', 'text-anchor': 'end' }, g2, 'perfüze değil');

    // 5 · fizyolojik ölü boşluk ayracı
    const g5 = grp('5');
    mk('path', { d: 'M388 60 H396 V306 H388', class: 'f11-tn-ayr' }, g5);
    mk('text', { x: 386, y: 176, class: 'f11-tn-l f11-tn-c-ph', 'text-anchor': 'end' }, g5, 'fizyolojik');
    mk('text', { x: 386, y: 192, class: 'f11-tn-l f11-tn-c-ph', 'text-anchor': 'end' }, g5, '= 1 + 2');

    // bir soluk çubuğu: x 20–400 = 500 mL
    const gb = mk('g', { class: 'f11-tn-bar' }, svg);
    mk('text', { x: 400, y: 360, class: 'f11-tn-l f11-tn-c-ph', 'text-anchor': 'end' }, gb, `Bir soluk · V${sub('T')} 500 mL`);
    mk('path', { d: 'M20 368 V362 H138 V368', class: 'f11-tn-ayr' }, gb);
    mk('text', { x: 79, y: 352, class: 'f11-tn-l f11-tn-c-ph f11-tn-sym', 'text-anchor': 'middle' }, gb, `V${sub('D')}`);
    const bs1 = grp('1 5', gb), bs2 = grp('2 5', gb), bs3 = grp('3', gb);
    mk('rect', { x: 20, y: 372, width: 114, height: 22, rx: 4, class: 'f11-tn-b-an' }, bs1);
    mk('text', { x: 77, y: 388, class: 'f11-tn-bt', 'text-anchor': 'middle' }, bs1, '150 mL');
    mk('rect', { x: 134, y: 372, width: 4, height: 22, class: 'f11-tn-b-al' }, bs2);
    mk('rect', { x: 130, y: 368, width: 12, height: 30, class: 'f11-tn-hit' }, bs2);
    mk('text', { x: 136, y: 410, class: 'f11-tn-l f11-tn-c-al', 'text-anchor': 'middle' }, bs2, '≈0');
    mk('rect', { x: 138, y: 372, width: 262, height: 22, rx: 4, class: 'f11-tn-b-va' }, bs3);
    mk('text', { x: 269, y: 388, class: 'f11-tn-bt', 'text-anchor': 'middle' }, bs3, '350 mL');
    mk('text', { x: 400, y: 410, class: 'f11-tn-l f11-tn-c-ph f11-tn-sym', 'text-anchor': 'end' }, gb, `V${sub('T')} = V${sub('A')} + V${sub('D')}`);

    // rozetler
    const roz = (n, x, y, c) => { const g = grp(n === 5 ? '5' : n === 1 ? '1 5' : n === 2 ? '2 5' : String(n)); g.classList.add('f11-tn-roz', 'f11-tn-roz-' + c); mk('circle', { cx: x, cy: y, r: 10 }, g); mk('text', { x, y: y + 0.5, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, g, String(n)); };
    roz(1, 186, 104, 'an'); roz(2, 371, 248, 'al'); roz(3, 44, 290, 'va'); roz(4, 136, 23, 'mk'); roz(5, 396, 120, 'ph');

    // vurgu
    let sel = null;
    const parcalar = [...svg.querySelectorAll('[data-k]')];
    const btns = [...el.querySelectorAll('.f11-tn-sat')];
    parcalar.forEach((p) => p.setAttribute('tabindex', '-1'));
    const goster = (k) => {
      svg.classList.toggle('f11-tn-secili', k != null);
      parcalar.forEach((p) => {
        const on = k != null && p.dataset.k.split(' ').includes(String(k));
        p.classList.toggle('f11-tn-on', on); p.classList.toggle('f11-tn-off', k != null && !on);
      });
      btns.forEach((b) => b.classList.toggle('f11-tn-on', k != null && b.dataset.n === String(k)));
      if (cap) cap.innerHTML = k == null ? cap0 : REF(CAP[k]);
    };
    const sec = (k) => { sel = sel === k ? null : k; btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.n === String(sel)))); goster(sel); };
    btns.forEach((b) => {
      b.addEventListener('click', () => sec(+b.dataset.n));
      b.addEventListener('mouseenter', () => goster(+b.dataset.n));
      b.addEventListener('mouseleave', () => goster(sel));
    });
    const bolge = (e) => { const t = e.target.closest && e.target.closest('[data-k]'); if (!t) return null; const ks = t.dataset.k.split(' '); return +ks[0]; };
    const onClick = (e) => { const k = bolge(e); if (k) sec(k); };
    const onOver = (e) => { if (e.pointerType && e.pointerType !== 'mouse') return; const k = bolge(e); if (k) goster(k); };
    const onOut = (e) => { if (e.pointerType && e.pointerType !== 'mouse') return; if (!svg.contains(e.relatedTarget)) goster(sel); else { const k = bolge({ target: e.relatedTarget }); goster(k || sel); } };
    svg.addEventListener('click', onClick);
    svg.addEventListener('pointerover', onOver);
    svg.addEventListener('pointerout', onOut);
    const onKey = (e) => { if (e.key === 'Escape' && sel != null) { sel = null; btns.forEach((b) => b.setAttribute('aria-pressed', 'false')); goster(null); } };
    el.addEventListener('keydown', onKey);
    return () => { el.removeEventListener('keydown', onKey); };
  };
})();
