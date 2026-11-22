/* Fizyoloji Bölüm 14 · Hipoksi ve şantlar · bileşenler (K1 s. 63–67).
   Tarifler: docs/tasarim/fiz14.md. Zincir, harita ve V̇/Q̇ birimi şematiktir; sayısal model yalnız şant denklemi ve
   izo-şant bileşenindedir (girdiler kitaptan, bileşen altlarında belirtilir). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const txt = (parent, x, y, s, cls, attrs) => { const t = mk('text', Object.assign({ x, y, class: cls }, attrs || {}), parent); t.textContent = s; return t; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const fmt = (v, d = 1) => (Math.abs(v) < 0.5 * Math.pow(10, -d) ? 0 : v).toFixed(d).replace('.', ',').replace('-', '−');
  const rnd = (() => { let s = 14; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg${cls ? ' ' + cls : ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const yolD = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const bez = (p0, p1, p2, p3, n = 16) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]];
  });
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
    const ilk = c ? c.innerHTML : '';
    let son = null;
    return {
      yaz(h) { if (!c || h === son) return; c.innerHTML = REF(h); son = h; },
      ilk() { if (!c || son === null) return; c.innerHTML = ilk; son = null; },
    };
  }

  /* ================= 1 · Oksijen zinciri: hangi halka koptu? ================= */
  VIZ.f14_zincir = (el) => {
    const cap = capOf(el);
    const HALKA = [
      { ad: 'Akciğer', alt: 'PaO₂' },
      { ad: 'Kan', alt: 'Hb · taşıma kapasitesi' },
      { ad: 'Dolaşım', alt: 'Kalp debisi · akım' },
      { ad: 'Hücre', alt: 'Mitokondri' },
    ];
    const TIPLER = ['normal', 'hipoksemik', 'anemik', 'stagnan', 'sitotoksik'];
    const TIP = {
      normal: { ad: 'Normal', roz: ['ok', 'ok', 'ok', 'ok'] },
      hipoksemik: { ad: 'Hipoksemik', roz: ['crit', 'etk', 'etk', 'etk'], cap: "<b>Hipoksemik hipoksi.</b> İlk halka kopmuştur: akciğerden çıkan kanın PaO₂'si düşüktür. PaO₂ 8 kPa'nın altına inince dissosiyasyon eğrisinin dik bölümüne girilir, Hb satürasyonu hızla düşer ve dokulara giden O₂ azalır. Nedenleri: hipoventilasyon, difüzyon kısıtlanması, şant, V̇/Q̇ uyumsuzluğu. [[K1 s. 63]]" },
      anemik: { ad: 'Anemik', roz: ['ok', 'crit', 'etk', 'etk'], cap: '<b>Anemik hipoksi.</b> PaO₂ normaldir, ama kanın O₂ taşıma kapasitesi azalmıştır. Kitaptaki örnekler ağır anemi ve karbonmonoksit zehirlenmesidir (Bölüm 8). [[K1 s. 63]]' },
      stagnan: { ad: 'Stagnan', roz: ['ok', 'ok', 'crit', 'etk'], cap: '<b>Stagnan hipoksi.</b> PaO₂ ve Hb konsantrasyonu normaldir; dolaşım yetersizliği dokuya O₂ sunumunu azaltır. Örnekler: kardiyojenik şok ve arteriyel emboli sonrası akut ekstremite iskemisi. [[K1 s. 63]]' },
      sitotoksik: { ad: 'Sitotoksik', roz: ['ok', 'ok', 'ok', 'crit'], cap: '<b>Sitotoksik hipoksi.</b> PaO₂, taşıma kapasitesi ve O₂ sunumu normaldir; mitokondri oksijeni etkin kullanamaz. Örnekler: ağır sepsis ve siyanür zehirlenmesi. [[K1 s. 63]] Kullanılmayan O₂ venöz kana geri döner; siyanür zehirlenmesinde venöz kanın parlak kırmızı olması bundandır (Bölüm 8). [[K1 s. 36]]' },
    };
    const ROZ = { ok: 'yeterli', crit: 'bozuk', etk: 'etkilenir', soru: '?' };
    const ORNEK = [
      { ad: 'Ağır anemi', h: 1, tip: 'anemik', n: 'Anemik hipoksi: PaO₂ normal, taşıma kapasitesi azalmış. [[K1 s. 63]]' },
      { ad: 'Karbonmonoksit zehirlenmesi', h: 1, tip: 'anemik', n: 'Kitap CO zehirlenmesini anemik hipoksiye örnek verir: PaO₂ normal, taşıma kapasitesi azalmış. [[K1 s. 63]]' },
      { ad: 'Kardiyojenik şok', h: 2, tip: 'stagnan', n: 'Stagnan hipoksi: PaO₂ ve [Hb] normal, dolaşım yetersiz. [[K1 s. 63]]' },
      { ad: 'Arteriyel emboli sonrası akut ekstremite iskemisi', h: 2, tip: 'stagnan', n: 'Stagnan hipoksi: o bölgeye arteriyel akım azalmış ya da durmuştur. [[K1 s. 63]]' },
      { ad: 'Ağır sepsis', h: 3, tip: 'sitotoksik', n: "Sitotoksik hipoksi: mitokondri O₂'yi etkin kullanamaz. [[K1 s. 63]]" },
      { ad: 'Siyanür zehirlenmesi', h: 3, tip: 'sitotoksik', n: 'Sitotoksik hipoksi: PaO₂, taşıma kapasitesi ve sunum normaldir. [[K1 s. 63]]' },
      { ad: 'Hipoventilasyon', h: 0, tip: 'hipoksemik', n: "Hipoksemik hipoksi: PaCO₂ yükselir, AGE'ye göre PAO₂ ve sonra PaO₂ düşer. [[K1 s. 63]]" },
      { ad: 'Pnömonide intrapulmoner şant', h: 0, tip: 'hipoksemik', n: 'Hipoksemik hipoksi: sıvıyla dolu alveollerden geçen kan oksijenlenmez. [[K1 s. 63–64]]' },
      { ad: 'Pulmoner fibroziste difüzyon kısıtlanması', h: 0, tip: 'hipoksemik', n: 'Hipoksemik hipoksi: kalınlaşmış bariyer difüzyonu kısıtlar. [[K1 s. 63]]' },
    ];
    el.innerHTML = `<div class="f14-zn">
      <div class="f14-zn-ust">
        <div class="f14-zn-tipler">${segHtml('Hipoksi tipi', 'tip', TIPLER.map((k) => [k, TIP[k].ad]), 'normal')}<button type="button" class="btn ghost" data-tahmin>Tahmin</button></div>
        <div class="f14-zn-kart" hidden><span class="tag gold">Örnek</span><b class="f14-zn-ornek"></b><span class="f14-zn-yon">Hangi halka koptu? Halkaya dokunun.</span></div>
      </div>
      <div class="f14-zn-sahne"></div>
      <div class="f14-zn-dip btn-row" hidden><button type="button" class="btn" data-sonraki>Sonraki örnek</button><button type="button" class="btn ghost" data-don>Tiplere dön</button><span class="f14-zn-say"></span></div>
    </div>`;
    const $ = (s) => el.querySelector(s);
    const sahne = $('.f14-zn-sahne');
    let tip = 'normal', mod = 'tip', sira = [], k = 0, dogru = 0, cevap = null, bitti = false;
    let dikey = null, G = null, flashT = 0, kalpFaz = 0;
    const P = Array.from({ length: 96 }, () => ({ on: false }));

    function kur(dk) {
      dikey = dk;
      sahne.innerHTML = '';
      const W = dk ? 360 : 760, H = dk ? 542 : 272;
      const svg = mk('svg', { viewBox: `0 0 ${W} ${H}`, class: 'f14-svg f14-zn-svg' + (dk ? ' dikey' : ''), role: 'group', 'aria-label': 'Oksijen zinciri: akciğer, kan, dolaşım ve hücre halkaları; oksijen akciğerden mitokondriye akar' }, sahne);
      const ring = [];
      for (let i = 0; i < 4; i++) {
        if (!dk) { const x = 13 + i * 196, y = 40; ring.push({ x, y, w: 146, h: 112, cx: x + 73, cy: y + 62 }); }
        else { const y = 8 + i * 112; ring.push({ x: 70, y, w: 260, h: 84, cx: 112, cy: y + 42 }); }
      }
      const step = dk ? 112 : 196, half = dk ? 42 : 73;
      const M = dk ? (u, v) => [112 + v, ring[0].cy + u] : (u, v) => [ring[0].cx + u, ring[0].cy - v];
      const gBoru = mk('g', {}, svg), gDon = mk('g', { class: 'f14-zn-don' }, svg), gHalka = mk('g', {}, svg);
      const gRoz = mk('g', {}, svg), gCer = mk('g', { class: 'f14-zn-cer' }, svg), gPar = mk('g', { class: 'f14-zn-par' }, svg);
      // halkalar arası borular ve ok başları
      for (let i = 0; i < 3; i++) {
        const a = ring[i], b = ring[i + 1];
        if (!dk) {
          mk('line', { x1: a.x + a.w, y1: a.cy, x2: b.x - 4, y2: a.cy, class: 'f14-zn-boru' }, gBoru);
          mk('path', { d: `M${b.x - 12} ${a.cy - 9} L${b.x - 1} ${a.cy} L${b.x - 12} ${a.cy + 9} Z`, class: 'f14-zn-okb' }, gBoru);
        } else {
          mk('line', { x1: a.cx, y1: a.y + a.h, x2: a.cx, y2: b.y - 4, class: 'f14-zn-boru' }, gBoru);
          mk('path', { d: `M${a.cx - 9} ${b.y - 12} L${a.cx} ${b.y - 1} L${a.cx + 9} ${b.y - 12} Z`, class: 'f14-zn-okb' }, gBoru);
        }
      }
      // sitotoksik: venöz dönüş yolu
      const donPts = dk
        ? [[ring[3].cx, ring[3].cy], [40, ring[3].cy], [40, ring[0].cy], [64, ring[0].cy]]
        : [[ring[3].cx, ring[3].cy], [734, ring[3].cy], [734, 168], [40, 168], [40, 156]];
      mk('path', { d: yolD(donPts), class: 'f14-zn-donyol' }, gDon);
      const son = donPts[donPts.length - 1];
      mk('path', { d: dk ? `M${son[0] - 9} ${son[1] - 8} L${son[0] + 2} ${son[1]} L${son[0] - 9} ${son[1] + 8} Z` : `M${son[0] - 8} ${son[1] + 9} L${son[0]} ${son[1] - 2} L${son[0] + 8} ${son[1] + 9} Z`, class: 'f14-zn-donok' }, gDon);
      if (dk) txt(gDon, 0, 0, 'venöz dönüş', 'f14-zn-donl', { transform: `translate(30 ${(ring[0].cy + ring[3].cy) / 2}) rotate(-90)`, 'text-anchor': 'middle' });
      else txt(gDon, 387, 186, 'kullanılmayan O₂ venöz kana döner', 'f14-zn-donl', { 'text-anchor': 'middle' });
      // halkalar
      const halkaG = [], roz = [], ikon = {};
      ring.forEach((r, i) => {
        const g = mk('g', { class: 'f14-zn-halka', 'data-h': i }, gHalka);
        mk('rect', { x: r.x, y: r.y, width: r.w, height: r.h, rx: 14, class: 'f14-zn-kutu' }, g);
        const ig = mk('g', { transform: dk ? `translate(${r.cx} ${r.cy}) rotate(90)` : `translate(${r.cx} ${r.cy})` }, g);
        if (i === 0) {
          ikon.kapG = mk('line', { x1: -36, y1: 0, x2: -2, y2: 0, class: 'f14-zn-kap ven' }, ig);
          ikon.kapC = mk('line', { x1: -2, y1: 0, x2: 36, y2: 0, class: 'f14-zn-kap art' }, ig);
          mk('circle', { cx: -6, cy: -18, r: 13, class: 'f14-zn-alv' }, ig);
        } else if (i === 1) {
          ikon.rbc = [-15, 15].map((x) => { const e = mk('g', { transform: `translate(${x} 0)`, class: 'f14-zn-rbc' }, ig); mk('ellipse', { rx: 13, ry: 7.5, class: 'dis' }, e); mk('ellipse', { rx: 6, ry: 3, class: 'ic' }, e); return e; });
        } else if (i === 2) {
          const hg = mk('g', { transform: dk ? 'rotate(-90)' : '' }, ig);
          ikon.kalp = mk('path', { d: 'M0 17 C-24 2 -22 -19 -9 -19 C-4 -19 0 -15 0 -11 C0 -15 4 -19 9 -19 C22 -19 24 2 0 17 Z', class: 'f14-zn-kalp' }, hg);
        } else {
          mk('ellipse', { cx: 4, cy: 0, rx: 31, ry: 16, class: 'f14-zn-mito' }, ig);
          mk('path', { d: 'M-21 5 L-15 -8 L-8 8 L-1 -8 L6 8 L13 -8 L20 8 L26 -3', class: 'f14-zn-kris' }, ig);
        }
        if (!dk) {
          txt(g, r.cx, r.y + 24, `${i + 1} · ${HALKA[i].ad}`, 'f14-zn-ad', { 'text-anchor': 'middle' });
          txt(g, r.cx, r.y + r.h - 11, HALKA[i].alt, 'f14-zn-alt', { 'text-anchor': 'middle' });
        } else {
          txt(g, 152, r.y + 28, `${i + 1} · ${HALKA[i].ad}`, 'f14-zn-ad');
          txt(g, 152, r.y + 47, HALKA[i].alt, 'f14-zn-alt');
        }
        g.addEventListener('click', () => sec(i));
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec(i); } });
        halkaG.push(g);
        // rozet
        const bw = dk ? 92 : 96, bh = dk ? 21 : 24;
        const bx = dk ? r.x + r.w - bw - 8 : r.cx - bw / 2, by = dk ? r.y + r.h - bh - 7 : 8;
        const rg = mk('g', { class: 'f14-zn-roz' }, gRoz);
        mk('rect', { x: bx, y: by, width: bw, height: bh, rx: bh / 2 }, rg);
        const rt = txt(rg, bx + bw / 2, by + bh / 2 + 4.6, '', '', { 'text-anchor': 'middle' });
        roz.push({ g: rg, t: rt });
      });
      // 8 kPa çerçevesi (yalnız hipoksemik)
      const fr = dk ? { x: 70, y: 444, w: 260, h: 90 } : { x: 13, y: 180, w: 220, h: 88 };
      mk('rect', { x: fr.x, y: fr.y, width: fr.w, height: fr.h, rx: 10, class: 'f14-zn-cerk' }, gCer);
      const px0 = fr.x + 40, px1 = fr.x + fr.w - 14, py0 = fr.y + fr.h - 22, py1 = fr.y + 12;
      const X = (p) => px0 + (p / 14) * (px1 - px0), Y = (s) => py0 - s * (py0 - py1);
      const sat = (p) => (p <= 0 ? 0 : Math.pow(p, 2.7) / (Math.pow(p, 2.7) + Math.pow(3.5, 2.7)));
      mk('line', { x1: px0, y1: py0, x2: px1, y2: py0, class: 'f14-eksen' }, gCer);
      mk('line', { x1: px0, y1: py0, x2: px0, y2: py1, class: 'f14-eksen' }, gCer);
      const egri = (a, b) => yolD(Array.from({ length: 41 }, (_, j) => { const p = a + (b - a) * j / 40; return [X(p), Y(sat(p))]; }));
      mk('path', { d: egri(8, 14), class: 'f14-zn-egri' }, gCer);
      const dikE = mk('path', { d: egri(0, 8), class: 'f14-zn-egri dik' }, gCer);
      mk('line', { x1: X(8), y1: py0, x2: X(8), y2: py1 - 2, class: 'f14-zn-esik' }, gCer);
      txt(gCer, X(8) + 4, py0 - 19, '8 kPa', 'f14-zn-ct b');
      txt(gCer, px0, py0 + 15, 'PaO₂ (kPa)', 'f14-zn-ct');
      txt(gCer, fr.x + 8, py1 + 9, 'SaO₂', 'f14-zn-ct');
      const dikL = txt(gCer, X(2.7), Y(0.1), 'dik düşüş', 'f14-zn-ct k');
      const nok = mk('circle', { r: 5, class: 'f14-zn-nok' }, gCer);
      const cer = { dikE, dikL, nok, yer(dusuk) {
        const p = dusuk ? 5.5 : 13, x = X(p), y = Y(sat(p));
        nok.setAttribute('cx', x); nok.setAttribute('cy', y);

      } };
      // parçacık yolu (u: akış yönü, v: dik)
      const rotaPts = [M(-6, 18), M(-2, 0), M(3 * step + 4, 0)];
      const R1 = rota(rotaPts), R2 = rota(donPts);
      const d0 = R1.L[1];
      const sU = (u) => d0 + (u + 2);
      G = {
        svg, ring, step, half, R1, R2, halkaG, roz, ikon, gCer, gDon, cer,
        sGir: (i) => sU(i * step - half), sOrta: (i) => sU(i * step), sCik: (i) => sU(i * step + half), sSon: R1.len,
        v: step * 0.7,
        pc: P.map(() => mk('circle', { r: 4.2, class: 'f14-zn-p', opacity: 0 }, gPar)),
      };
      P.forEach((p) => { p.on = false; });
      isin();
      ciz();
    }
    const kader = () => {
      const r = rnd();
      if (tip === 'anemik') return r < 0.6 ? 'kan' : 'ok';
      return 'ok';
    };
    let birikim = 0;
    function adim(dt) {
      // stagnan: kalp debisi düşük → akım bütün zincirde yavaşlar; içerik (yoğunluk) normal kalır, hücreye ulaşan O₂ ≈ %30
      const g = G, yavas = tip === 'stagnan' ? 0.3 : 1, oran = 4.4 * (tip === 'hipoksemik' ? 0.35 : 1) * yavas;
      birikim += dt * oran;
      while (birikim >= 1) {
        birikim -= 1;
        const p = P.find((q) => !q.on);
        if (p) { p.on = true; p.s = 0; p.don = false; p.fate = kader(); }
      }
      P.forEach((p) => {
        if (!p.on) return;
        if (p.don) { p.s += dt * g.v * 0.8; if (p.s >= g.R2.len) p.on = false; return; }
        p.s += dt * g.v * yavas;
        if (p.fate === 'kan' && p.s >= g.sOrta(1)) p.on = false;
        else if (p.s >= g.sSon) { if (tip === 'sitotoksik') { p.don = true; p.s = 0; } else p.on = false; }
      });
      kalpFaz += dt * (tip === 'stagnan' ? 0.45 : 1.25);
    }
    function ciz() {
      const g = G;
      P.forEach((p, i) => {
        const c = g.pc[i];
        if (!p.on || (RM && p.don && i % 6)) { c.setAttribute('opacity', 0); return; } // RM: dönüş yolunda yalnız birkaç durağan nokta
        let xy, op = 1, r = 4.2;
        if (p.don) { xy = g.R2.at(p.s); op = p.s > g.R2.len - 30 ? (g.R2.len - p.s) / 30 : 0.9; c.classList.add('don'); }
        else {
          xy = g.R1.at(p.s); c.classList.remove('don');
          if (p.fate === 'kan' && p.s > g.sGir(1)) op = clamp(1 - (p.s - g.sGir(1)) / (g.sOrta(1) - g.sGir(1)), 0, 1);
          if (tip !== 'sitotoksik' && p.s > g.sSon - 24) r = 4.2 * clamp((g.sSon - p.s) / 24, 0, 1);
          if (p.s < g.R1.L[1]) op = Math.min(op, 0.35 + 0.65 * p.s / g.R1.L[1]);
        }
        c.setAttribute('cx', xy[0].toFixed(1)); c.setAttribute('cy', xy[1].toFixed(1));
        c.setAttribute('r', r.toFixed(2)); c.setAttribute('opacity', op.toFixed(2));
      });
      const sk = RM ? 1 : 1 + (tip === 'stagnan' ? 0.05 : 0.09) * Math.pow(Math.max(0, Math.sin(kalpFaz * Math.PI * 2)), 2);
      g.ikon.kalp.setAttribute('transform', `scale(${sk.toFixed(3)})`);
    }
    function isin() { // durağan görünüm için akışı önceden doldur (RM'de son durum budur)
      P.forEach((p) => { p.on = false; }); birikim = 0;
      for (let i = 0; i < 440; i++) adim(0.05);
    }
    function goster() {
      const g = G, soru = mod === 'tahmin' && cevap === null && !bitti;
      const rz = soru ? ['soru', 'soru', 'soru', 'soru'] : TIP[tip].roz;
      g.roz.forEach((r, i) => { r.g.setAttribute('class', 'f14-zn-roz ' + rz[i]); r.t.textContent = ROZ[rz[i]]; });
      g.halkaG.forEach((h, i) => {
        h.classList.toggle('bozuk', !soru && TIP[tip].roz[i] === 'crit');
        const secilir = mod === 'tahmin' && cevap === null && !bitti;
        h.classList.toggle('secilir', secilir);
        if (secilir) { h.setAttribute('role', 'button'); h.setAttribute('tabindex', '0'); h.setAttribute('aria-label', `${i + 1} · ${HALKA[i].ad} halkası`); }
        else { h.removeAttribute('role'); h.removeAttribute('tabindex'); h.removeAttribute('aria-label'); }
      });
      const hpx = tip === 'hipoksemik' && !soru;
      g.gCer.classList.toggle('on', hpx); g.cer.dikL.style.display = hpx ? '' : 'none'; g.cer.yer(hpx);
      g.gDon.style.display = tip === 'sitotoksik' && !soru ? '' : 'none';
      g.ikon.kapC.classList.toggle('dusuk', tip === 'hipoksemik' && !soru);
      g.ikon.rbc[1].style.display = tip === 'anemik' && !soru ? 'none' : '';
      g.ikon.rbc[0].style.opacity = tip === 'anemik' && !soru ? 0.4 : 1;
      // denetimler
      $('.f14-zn-tipler').hidden = mod === 'tahmin';
      $('.f14-zn-kart').hidden = mod !== 'tahmin';
      $('.f14-zn-dip').hidden = mod !== 'tahmin';
      if (mod === 'tahmin') {
        const o = ORNEK[sira[k]], sb = $('[data-sonraki]');
        $('.f14-zn-ornek').textContent = bitti ? 'Bitti' : o.ad;
        $('.f14-zn-yon').textContent = bitti ? `${ORNEK.length} örnekten ${dogru} doğru` : cevap === null ? 'Hangi halka koptu? Halkaya dokunun.' : `Doğru halka: ${o.h + 1} · ${HALKA[o.h].ad}`;
        sb.disabled = !bitti && cevap === null;
        sb.textContent = bitti ? 'Yeniden başla' : k === ORNEK.length - 1 ? 'Sonucu gör' : 'Sonraki örnek';
        $('.f14-zn-say').textContent = bitti ? '' : `Örnek ${k + 1} / ${ORNEK.length} · ${dogru} doğru`;
      }
    }
    function tipSec(t) {
      const eski = tip; tip = t;
      basSec(el, 'tip', t);
      if (RM) isin();
      else if (eski !== t) P.forEach((p) => { if (p.on && !p.don && p.s < G.sGir(1)) p.fate = kader(); });
      goster(); ciz();
      if (mod === 'tip') { if (t === 'normal') cap.ilk(); else cap.yaz(TIP[t].cap); }
    }
    const karistir = () => { const a = ORNEK.map((_, i) => i); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const soruCap = '<b>Tahmin.</b> Örnekteki durumda oksijen zincirinin hangi halkası kopar? Halkaya dokunun ya da Tab ile seçip Enter’a basın. [[K1 s. 63]]';
    function tahminBasla() { mod = 'tahmin'; sira = karistir(); k = 0; dogru = 0; cevap = null; bitti = false; tipSec('normal'); cap.yaz(soruCap); goster(); }
    function sec(i) {
      if (mod !== 'tahmin' || cevap !== null || bitti) return;
      const o = ORNEK[sira[k]], ok = i === o.h;
      cevap = i; if (ok) dogru++;
      const h = G.halkaG[i];
      h.classList.add(ok ? 'dogru' : 'yanlis');
      clearTimeout(flashT);
      flashT = setTimeout(() => { G.halkaG.forEach((x) => x.classList.remove('dogru', 'yanlis')); }, 1400);
      tipSec(o.tip);
      cap.yaz((ok ? '<b>Doğru.</b> ' : `<b>Yanlış.</b> Doğru halka: ${o.h + 1} · ${HALKA[o.h].ad}. `) + o.n);
      goster();
      const sb = $('[data-sonraki]'); if (sb) sb.focus({ preventScroll: true });
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.tip) { tipSec(b.dataset.tip); return; }
      if (b.hasAttribute('data-tahmin')) { tahminBasla(); return; }
      if (b.hasAttribute('data-don')) { mod = 'tip'; G.halkaG.forEach((x) => x.classList.remove('dogru', 'yanlis')); tipSec('normal'); cap.ilk(); return; }
      if (b.hasAttribute('data-sonraki')) {
        if (bitti) { tahminBasla(); return; }
        if (k === ORNEK.length - 1) { bitti = true; tipSec('normal'); cap.yaz(`<b>Bitti.</b> ${ORNEK.length} örnekten ${dogru} doğru. Yeniden başlayabilir ya da tiplere dönebilirsiniz. [[K1 s. 63]]`); goster(); return; }
        k++; cevap = null; tipSec('normal'); cap.yaz(soruCap); goster();
      }
    });
    const bak = () => { const dk = el.clientWidth < 560; if (dk !== dikey) { kur(dk); goster(); } };
    bak();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    const dur = RM ? () => {} : ticker(el, (dt) => { adim(dt); ciz(); });
    return () => { dur(); if (ro) ro.disconnect(); clearTimeout(flashT); };
  };

  /* ================= 2 · Şant haritası ================= */
  VIZ.f14_harita = (el) => {
    const cap = capOf(el);
    const TAIL = [[340, 131], [376, 131], [376, 276], [350, 276], [290, 276], [290, 322], [228, 322], [228, 300], [228, 246]];
    const AVM = [[60, 172], ...bez([60, 172], [92, 156], [116, 190], [148, 172], 8).slice(1), ...bez([148, 172], [180, 154], [210, 190], [244, 172], 8).slice(1), ...bez([244, 172], [276, 156], [306, 190], [340, 172], 8).slice(1)];
    const BRON = bez([207, 22], [262, 14], [332, 30], [340, 90], 18);
    const YER = [
      { n: 1, kisa: 'Bronşiyal', fiz: true, rozet: 'Fizyolojik · anatomik', bas: 'Bronşiyal dolaşım', m: [318, 44],
        yon: 'Bronşiyal venöz kan → pulmoner ven → sol kalp',
        cap: 'Büyük hava yollarının venöz kanının çoğu doğrudan pulmoner venlere boşalır ve gaz değişimine katılmadan sol kalbe döner. [[K1 s. 64]] Atlas notu: akciğer köküne yakın bölümün kanı bronşiyal venlerle azigos sistemine, yani sağ kalbe döner ve şant değildir; şant olan, akciğer içindeki bronşiyal kanın pulmoner venlere boşalan bölümüdür.',
        yol: [BRON], par: [{ pts: [...BRON, [340, 131], ...TAIL.slice(1)], renk: 'v' }] },
      { n: 2, kisa: 'Thebesius', fiz: true, rozet: 'Fizyolojik · anatomik', bas: 'Thebesius venleri', m: [370, 308],
        yon: 'Koroner venöz kan → sol atriyum ve sol ventrikül',
        cap: 'Koroner venöz kanın küçük bir bölümü Thebesius venleriyle doğrudan kalbin dört boşluğuna boşalır. Yalnız sol atriyuma ve sol ventriküle boşalan bölüm şanttır; sağ boşluklara boşalan kan olağan venöz dönüştür. [[K1 s. 64]]',
        yol: [[[346, 240], [340, 246], [344, 252], [336, 258]], [[348, 312], [341, 318], [345, 324], [337, 330]], [[348, 346], [341, 352], [345, 358], [337, 364]]],
        par: [{ pts: [[336, 258], [318, 270], [290, 276], [290, 322], [228, 322], [228, 300], [228, 246]], renk: 'v' }, { pts: [[337, 330], [300, 324], [290, 322], [228, 322], [228, 300], [228, 246]], renk: 'v' }, { pts: [[337, 364], [300, 340], [260, 324], [228, 322], [228, 300], [228, 246]], renk: 'v' }] },
      { n: 3, kisa: 'Fonksiyonel', fiz: true, rozet: 'Fizyolojik · fonksiyonel', bas: 'Bazal yetersiz ventile alveoller', m: [86, 108],
        yon: 'Pulmoner arter → yetersiz ventile alveol → pulmoner ven',
        cap: "Akciğer tabanındaki yetersiz ventile alveollerden geçen kan tam oksijenlenmez: yerel bir V̇/Q̇ uyumsuzluğu (Bölüm 15). Normal fizyolojik şantın (%2–5) yaklaşık yarısı budur, öbür yarısı anatomik şanttır. [[K1 s. 64]]",
        yol: [[[60, 126], [340, 126]]], par: [{ pts: [[30, 131], [60, 131], [60, 126], [340, 126], ...TAIL], renk: 'yari', x: 112 }] },
      { n: 4, kisa: 'VSD', fiz: false, rozet: 'Patolojik · intrakardiyak', bas: 'Ventriküler septal defekt', m: [200, 358], basAd: 'Sağ ventrikül basıncı',
        yon: { normal: 'Sol V → Sağ V (soldan sağa)', yuksek: 'Sağ V → Sol V (sağdan sola)' },
        cap: { normal: 'Sol ventrikül basıncı sağdan yüksektir: VSD’den akım soldan sağadır. Bu yönde arteriyel kana venöz kan katılmaz, yani şant hipoksemisi yoktur. [[K1 s. 64]]', yuksek: 'Sağ ventrikül basıncı artarsa (Eisenmenger sendromu; Fallot tetralojisindeki gibi sağ ventrikül çıkış yolu obstrüksiyonu) akım sağdan sola döner: deoksijenize kan sol ventriküle geçer, patolojik şant oluşur. [[K1 s. 64]]' },
        yol: { normal: [[[228, 336], [172, 336]]], yuksek: [[[172, 336], [228, 336]]] },
        par: { normal: [{ pts: [[262, 336], [204, 336], [196, 336], [150, 336], [150, 322], [172, 322], [172, 300], [172, 232]], renk: 'a' }], yuksek: [{ pts: [[140, 336], [196, 336], [204, 336], [252, 336], [252, 322], [228, 322], [228, 300], [228, 232]], renk: 'v' }] } },
      { n: 5, kisa: 'PDA', fiz: false, rozet: 'Patolojik · büyük damar', bas: 'Patent duktus arteriyozus', m: [200, 234], basAd: 'Pulmoner arter basıncı',
        yon: { normal: 'Aort → pulmoner arter (soldan sağa)', yuksek: 'Pulmoner arter → aort (sağdan sola)' },
        cap: { normal: 'Aort basıncı normalde pulmoner arter basıncından yüksektir: PDA’da akım genellikle soldan sağadır. Şant iyatrojenik olarak da kurulabilir (Fallot palyasyonunda Blalock–Taussig şantı); yönü burada da basınç farkı belirler. [[K1 s. 64]]', yuksek: 'Pulmoner arteriyel hipertansiyon gelişirse, örneğin yenidoğanda hipoksik pulmoner vazokonstriksiyonla, akım sağdan sola döner: patolojik şant. [[K1 s. 64]]' },
        yol: { normal: [[[228, 214], [172, 214]]], yuksek: [[[172, 214], [228, 214]]] },
        par: { normal: [{ pts: [[228, 214], [172, 214], [172, 200], [96, 200]], renk: 'a' }], yuksek: [{ pts: [[172, 214], [228, 214], [228, 194], [310, 194]], renk: 'v' }] } },
      { n: 6, kisa: 'Pulmoner AVM', fiz: false, rozet: 'Patolojik · büyük damar', bas: 'Pulmoner arteriyovenöz malformasyon', m: [124, 172],
        yon: 'Pulmoner arter → doğrudan pulmoner ven (her zaman sağdan sola)',
        cap: 'Pulmoner arter basıncı pulmoner ven basıncından yüksek olduğu için akım hep sağdan soladır; kan alveollere hiç uğramaz. AVM doğumsal ya da edinsel olabilir; karaciğer sirozunda gelişen çok sayıda AVM hepatopulmoner sendroma yol açar. [[K1 s. 64]]',
        yol: [AVM], par: [{ pts: [[30, 131], [60, 131], ...AVM, [340, 131], ...TAIL.slice(1)], renk: 'v' }] },
      { n: 7, kisa: 'İntrapulmoner', fiz: false, rozet: 'Patolojik · intrapulmoner (en sık)', bas: 'Perfüze ama ventile olmayan alveol', m: [316, 143],
        yon: 'Pulmoner arter → sıvıyla dolu ya da hava yolu tıkalı alveol → pulmoner ven',
        cap: 'Patolojik şantların açık ara en sık nedeni. Alveol perfüze ama gaz değişimine katılamıyor: tamamen sıvıyla dolu (pulmoner ödem, pnömoni) ya da proksimal hava yolu tıkalı (bronş obstrüksiyonu, tek akciğer ventilasyonu). [[K1 s. 64]]',
        yol: [[[60, 158], [340, 158]]], par: [{ pts: [[30, 131], [60, 131], [60, 158], [340, 158], ...TAIL], renk: 'v' }] },
    ];
    const FIZCAP = 'Fizyolojik şant = anatomik (bronşiyal dolaşım, sol boşluklara açılan Thebesius venleri) + fonksiyonel (bazal yetersiz ventile alveoller); toplam %2–5, yaklaşık yarı yarıya. Fizyolojik ölü boşluğun kan tarafındaki karşılığıdır. [[K1 s. 64]]';
    const bas = { 4: 'normal', 5: 'normal' };
    let sec = null; // 1..7 ya da 'fiz'
    el.innerHTML = `<div class="f14-hr">
      <div class="f14-hr-svgk"></div>
      <div class="f14-hr-pan">
        <div class="f14-hr-bil"></div>
        <div class="f14-hr-bas" hidden><span class="f14-hr-basad"></span>${segHtml('Basınç', 'bas', [['normal', 'normal'], ['yuksek', 'yüksek']], 'normal')}</div>
        <div class="f14-hr-liste" role="group" aria-label="Şant yerleri">${YER.map((y) => `<button type="button" data-yer="${y.n}" aria-pressed="false" class="${y.fiz ? 'fiz' : 'pat'}"><i>${y.n}</i>${y.kisa}</button>`).join('')}<button type="button" data-yer="fiz" aria-pressed="false" class="hepsi">Fizyolojik şantların hepsi</button></div>
        <div class="f14-hr-serit">
          <p>${REF('Normal fizyolojik şant: kalp debisinin <b>%2–5</b>’i [[K1 s. 64]]')}</p>
          <div class="f14-hr-cubuk"><span class="an">≈ yarısı anatomik</span><span class="fn">≈ yarısı fonksiyonel</span></div>
        </div>
      </div>
    </div>`;
    const $ = (s) => el.querySelector(s);
    const svg = mk('svg', { viewBox: '0 0 400 440', class: 'f14-svg f14-hr-svg', role: 'group', 'aria-label': 'Şematik dolaşım: akciğer, kalbin dört boşluğu ve sistemik dolaşım; yedi şant yeri numaralı' }, $('.f14-hr-svgk'));
    const defs = mk('defs', {}, svg);
    const mrk = mk('marker', { id: 'f14-hr-ok', viewBox: '0 0 10 10', refX: 6, refY: 5, markerWidth: 9, markerHeight: 9, markerUnits: 'userSpaceOnUse', orient: 'auto-start-reverse' }, defs);
    mk('path', { d: 'M0 0 L10 5 L0 10 Z', class: 'f14-hr-okb' }, mrk);
    const L = (pts, cls, p) => mk('path', { d: yolD(pts), class: cls }, p);
    // akciğer
    const gA = mk('g', {}, svg);
    mk('rect', { x: 40, y: 22, width: 320, height: 158, rx: 18, class: 'f14-hr-akc' }, gA);
    txt(gA, 52, 44, 'Akciğer', 'f14-hr-lb');
    mk('path', { d: 'M193 0 L193 38 M207 0 L207 38', class: 'f14-hr-trk' }, gA);
    mk('path', { d: 'M200 38 L150 52 M200 38 L200 50 M200 38 L250 52', class: 'f14-hr-hy' }, gA);
    mk('path', { d: 'M196 38 C170 60 120 78 112 101', class: 'f14-hr-hy ince' }, gA);
    mk('path', { d: 'M204 38 C240 64 286 98 290 132', class: 'f14-hr-hy' }, gA);
    mk('path', { d: 'M258 74 l12 12 M270 74 l-12 12', class: 'f14-hr-x' }, gA);
    // damarlar (alttan üste)
    const gD = mk('g', {}, svg);
    L([[110, 414], [14, 414], [14, 276], [50, 276]], 'f14-hr-dm v', gD); // venöz dönüş
    L([[172, 300], [172, 200], [30, 200], [30, 131], [60, 131]], 'f14-hr-dm v', gD); // pulmoner arter
    L([[60, 90], [60, 172]], 'f14-hr-dm v ince', gD);
    L([[60, 90], [150, 90]], 'f14-hr-kp v', gD); L([[150, 90], [340, 90]], 'f14-hr-kp a', gD);
    L([[60, 126], [340, 126]], 'f14-hr-kp v', gD); L([[112, 126], [340, 126]], 'f14-hr-kp a yari', gD);
    L([[60, 158], [340, 158]], 'f14-hr-kp v', gD);
    L(AVM, 'f14-hr-dm v avm', gD);
    L(BRON, 'f14-hr-br', gD);
    L([[340, 90], [340, 172]], 'f14-hr-dm a ince', gD);
    L([[340, 131], [376, 131], [376, 276], [350, 276]], 'f14-hr-dm a', gD); // pulmoner ven
    L([[228, 300], [228, 194], [392, 194], [392, 414], [290, 414]], 'f14-hr-dm hale', gD);
    L([[228, 300], [228, 194], [392, 194], [392, 414], [290, 414]], 'f14-hr-dm a', gD); // aort
    const pdaYol = L([[172, 214], [228, 214]], 'f14-hr-dm pda', gD);
    // alveoller
    [[150, 66], [200, 64], [250, 66]].forEach(([x, y]) => mk('circle', { cx: x, cy: y, r: 15, class: 'f14-hr-alv' }, gA));
    mk('circle', { cx: 112, cy: 110, r: 9, class: 'f14-hr-alv soluk' }, gA);
    mk('circle', { cx: 290, cy: 143, r: 11, class: 'f14-hr-alv sivi' }, gA);
    mk('path', { d: 'M282 141 q4 -3 8 0 t8 0 M282 147 q4 -3 8 0 t8 0', class: 'f14-hr-dalga' }, gA);
    // kalp
    const gK = mk('g', {}, svg);
    mk('rect', { x: 50, y: 236, width: 110, height: 56, rx: 10, class: 'f14-hr-oda v' }, gK);
    mk('rect', { x: 50, y: 300, width: 148, height: 72, rx: 10, class: 'f14-hr-oda v' }, gK);
    mk('rect', { x: 240, y: 236, width: 110, height: 56, rx: 10, class: 'f14-hr-oda a' }, gK);
    mk('rect', { x: 202, y: 300, width: 148, height: 72, rx: 10, class: 'f14-hr-oda a' }, gK);
    mk('rect', { x: 195, y: 329, width: 10, height: 14, class: 'f14-hr-delik' }, gK);
    YER[1].yol.forEach((p) => L(p, 'f14-hr-teb', gK));
    // parçacıklar
    const gP = mk('g', {}, svg), gV = mk('g', { class: 'f14-hr-vurgu' }, svg);
    // sistemik dolaşım kutusu (parçacıkların üstünde)
    const gS = mk('g', {}, svg);
    mk('rect', { x: 110, y: 400, width: 180, height: 28, rx: 8, class: 'f14-hr-sis' }, gS);
    txt(gS, 200, 419, 'Sistemik dolaşım', 'f14-hr-lb2', { 'text-anchor': 'middle' });
    // etiketler
    const gL = mk('g', {}, svg);
    txt(gL, 105, 256, 'Sağ A', 'f14-hr-oad', { 'text-anchor': 'middle' });
    txt(gL, 92, 362, 'Sağ V', 'f14-hr-oad', { 'text-anchor': 'middle' });
    txt(gL, 295, 256, 'Sol A', 'f14-hr-oad', { 'text-anchor': 'middle' });
    txt(gL, 300, 362, 'Sol V', 'f14-hr-oad', { 'text-anchor': 'middle' });
    txt(gL, 100, 220, 'pulmoner arter', 'f14-hr-dl', { 'text-anchor': 'middle' });
    txt(gL, 300, 214, 'aort', 'f14-hr-dl', { 'text-anchor': 'middle' });
    // yer işaretleri
    const gM = mk('g', {}, svg);
    const isaret = YER.map((y) => {
      const g = mk('g', { class: 'f14-hr-m ' + (y.fiz ? 'fiz' : 'pat'), role: 'button', tabindex: 0, 'aria-label': `${y.n} · ${y.bas}`, 'data-yer': y.n }, gM);
      mk('circle', { cx: y.m[0], cy: y.m[1], r: 17, class: 'hit' }, g);
      mk('circle', { cx: y.m[0], cy: y.m[1], r: 12, class: 'd' }, g);
      txt(g, y.m[0], y.m[1] + 4.6, String(y.n), 'n', { 'text-anchor': 'middle' });
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); secim(y.n); } });
      return g;
    });
    // taban dolaşımı
    const TAB = rota([[200, 414], [110, 414], [14, 414], [14, 276], [50, 276], [110, 276], [110, 322], [172, 322], [172, 300], [172, 200], [30, 200], [30, 131], [60, 131], [60, 90], [150, 90], [340, 90], [340, 131], [376, 131], [376, 276], [350, 276], [290, 276], [290, 322], [228, 322], [228, 300], [228, 194], [392, 194], [392, 414], [290, 414], [200, 414]]);
    const sKir = TAB.L[14];
    const NT = 58, HIZ = 64;
    const tabC = Array.from({ length: NT }, () => mk('circle', { r: 3.2, class: 'f14-hr-p' }, gP));
    let faz = 0;
    // seçili şant parçacıkları
    const SP = Array.from({ length: 60 }, () => ({ on: false }));
    const spC = SP.map(() => mk('circle', { r: 3.4, class: 'f14-hr-p sp', opacity: 0 }, gP));
    let aktif = [], birikim = 0;
    const yerOf = (n) => YER[n - 1];
    const secimYollari = () => {
      if (sec === null) return { yol: [], par: [] };
      const ys = sec === 'fiz' ? [1, 2, 3] : [sec];
      const yol = [], par = [];
      ys.forEach((n) => { const y = yerOf(n); const yy = Array.isArray(y.yol) ? y.yol : y.yol[bas[n]]; const pp = Array.isArray(y.par) ? y.par : y.par[bas[n]]; yol.push(...yy); par.push(...pp); });
      return { yol, par };
    };
    function vurguCiz() {
      gV.innerHTML = '';
      const { yol, par } = secimYollari();
      yol.forEach((p) => { const e = L(p, 'f14-hr-yol', gV); e.setAttribute('marker-end', 'url(#f14-hr-ok)'); });
      aktif = par.map((p) => { const R = rota(p.pts); return Object.assign({}, p, { R, sx: p.x ? R.L[2] + (p.x - p.pts[2][0]) : 0 }); });
      SP.forEach((p) => { p.on = false; });
      birikim = 0;
      const pdaRenk = sec === 5 ? (bas[5] === 'normal' ? 'a' : 'v') : 'n';
      pdaYol.setAttribute('class', 'f14-hr-dm pda ' + pdaRenk);
      if (RM) { // durağan: her yolda eşit aralıklı birkaç parçacık
        let j = 0;
        aktif.forEach((a, ai) => { const n = Math.max(3, Math.round(a.R.len / 70)); for (let i = 0; i < n && j < SP.length; i++, j++) Object.assign(SP[j], { on: true, a: ai, s: (i + 0.5) * a.R.len / n, u: (i % 2) / 2 + 0.25 }); });
      } else { for (let i = 0; i < 400; i++) adim(0.05); }
    }
    function adim(dt) {
      faz = (faz + dt * HIZ) % TAB.len;
      if (!aktif.length) return;
      birikim += dt * 1.5 * aktif.length;
      while (birikim >= 1) {
        birikim -= 1;
        const p = SP.find((q) => !q.on);
        if (p) Object.assign(p, { on: true, a: Math.floor(rnd() * aktif.length), s: 0, u: rnd() });
      }
      SP.forEach((p) => { if (p.on) { p.s += dt * HIZ; if (p.s >= aktif[p.a].R.len) p.on = false; } });
    }
    function ciz() {
      tabC.forEach((c, i) => {
        const s = (faz + i * TAB.len / NT) % TAB.len, xy = TAB.at(s);
        c.setAttribute('cx', xy[0].toFixed(1)); c.setAttribute('cy', xy[1].toFixed(1));
        c.setAttribute('class', 'f14-hr-p ' + (s >= sKir ? 'a' : 'v'));
      });
      SP.forEach((p, i) => {
        const c = spC[i];
        if (!p.on || !aktif[p.a]) { c.setAttribute('opacity', 0); return; }
        const a = aktif[p.a], xy = a.R.at(p.s);
        let renk = a.renk === 'a' ? 'a' : 'v';
        if (a.renk === 'yari' && p.s >= a.sx && p.u < 0.5) renk = 'a'; // yetersiz ventile alveolden sonra kanın yarısı oksijenlenir
        const op = p.s > a.R.len - 36 ? (a.R.len - p.s) / 36 : 1;
        c.setAttribute('cx', xy[0].toFixed(1)); c.setAttribute('cy', xy[1].toFixed(1));
        c.setAttribute('opacity', op.toFixed(2)); c.setAttribute('class', 'f14-hr-p sp ' + renk);
      });
    }
    function bilgi() {
      const bil = $('.f14-hr-bil'), bb = $('.f14-hr-bas');
      el.querySelectorAll('.f14-hr-liste [data-yer]').forEach((b) => b.setAttribute('aria-pressed', String(String(sec) === b.dataset.yer)));
      isaret.forEach((g, i) => g.classList.toggle('on', sec === i + 1 || (sec === 'fiz' && i < 3)));
      if (sec === null) { bil.innerHTML = '<p class="f14-hr-bos">Bir şant yerine dokunun: haritadaki numaraya ya da aşağıdaki düğmelere.</p>'; bb.hidden = true; cap.ilk(); return; }
      if (sec === 'fiz') {
        bil.innerHTML = '<span class="tag basic">Fizyolojik</span><h4>Anatomik + fonksiyonel şant</h4><p class="f14-hr-yon"><b>Yerler:</b> 1 bronşiyal dolaşım, 2 sol boşluklara açılan Thebesius venleri, 3 bazal yetersiz ventile alveoller</p>';
        bb.hidden = true; cap.yaz(FIZCAP); return;
      }
      const y = yerOf(sec), yon = typeof y.yon === 'string' ? y.yon : y.yon[bas[sec]], c = typeof y.cap === 'string' ? y.cap : y.cap[bas[sec]];
      bil.innerHTML = `<span class="tag ${y.fiz ? 'basic' : 'crit'}">${y.rozet}</span><h4>${y.n} · ${y.bas}</h4><p class="f14-hr-yon"><b>Yön:</b> ${yon}</p>`;
      if (y.basAd) { bb.hidden = false; $('.f14-hr-basad').textContent = y.basAd + ':'; basSec(bb, 'bas', bas[sec]); } else bb.hidden = true;
      cap.yaz(c);
    }
    function secim(n) { sec = n; bilgi(); vurguCiz(); ciz(); }
    el.addEventListener('click', (e) => {
      const m = e.target.closest('[data-yer]');
      if (m && el.contains(m)) { const v = m.dataset.yer; secim(v === 'fiz' ? 'fiz' : +v); return; }
      const b = e.target.closest('[data-bas]');
      if (b && (sec === 4 || sec === 5)) { bas[sec] = b.dataset.bas; bilgi(); vurguCiz(); ciz(); }
    });
    bilgi(); vurguCiz(); ciz();
    if (RM) return () => {};
    return ticker(el, (dt) => { adim(dt); ciz(); });
  };

  /* ================= 3 · Şant mı, V̇/Q̇ uyumsuzluğu mu? ================= */
  VIZ.f14_vq = (el) => {
    const cap = capOf(el);
    const FI = [21, 40, 60, 100];
    const B = {
      yuksek: { ad: 'V̇/Q̇ > 1', V: 16, Q: 5, A: [0.45, 0.6, 0.75, 0.95], O: [1, 1, 1, 1], vent: 'fazla', yanit: '— (kan zaten oksijenli)',
        cap: "<b>V̇/Q̇ > 1.</b> Kan ventile alveolden geçer, gaz değişimi olur ve birimden çıkan kan normal PaO₂'lidir. Ventilasyon görece fazla olduğundan bir bölümü boşa gider: alveoler ölü boşluk artar, solunum işi artar. [[K1 s. 65]]" },
      esit: { ad: 'V̇/Q̇ ≈ 1', V: 10, Q: 10, A: [0.35, 0.55, 0.7, 0.95], O: [0.97, 1, 1, 1], vent: 'normal', yanit: '—',
        cap: '<b>V̇/Q̇ ≈ 1.</b> Ventilasyon ve perfüzyon eşleşmiştir; birimden çıkan kan tam oksijenlenir. [[K1 s. 65]]' },
      hafif: { ad: 'V̇/Q̇ < 1 hafif', V: 5, Q: 14, A: [0.15, 0.35, 0.55, 0.85], O: [0.55, 0.8, 0.92, 1], vent: 'az', yanit: 'belirgin',
        cap: '<b>V̇/Q̇ < 1, hafif.</b> Kanın bir bölümü yetersiz ventile alveolden geçer; çıkan kan tam oksijenlenmez, arteriyel kana venöz karışım katılır ve PaO₂ düşer. [[K1 s. 65]]',
        ek: (fi) => (fi > 21 ? " FiO₂ artınca AGE'ye göre PAO₂ yükselir, yetersiz ventile alveolde difüzyon için daha çok O₂ olur ve PaO₂ artar: hipoksemi O₂'ye yanıt verir. [[K1 s. 65]]" : '') },
      agir: { ad: 'V̇/Q̇ → 0 ağır', V: 1.5, Q: 14, A: [0.05, 0.1, 0.15, 0.25], O: [0.12, 0.18, 0.24, 0.3], vent: 'çok az', yanit: 'zayıf', kesik: true,
        cap: "<b>V̇/Q̇ → 0, ağır.</b> Ventilasyon çok azdır; birim sağdan sola şant gibi davranır ve O₂'ye zayıf yanıt verir. Kitaba göre ağır V̇/Q̇ uyumsuzluğu ile şant arasındaki fark büyük ölçüde akademiktir. [[K1 s. 65]]",
        ek: (fi) => (fi === 100 ? ' (Atlas notu: %100 O₂ uzun süre verilirse bu birimlerde alveoler PO₂ zamanla yükselebilir; ama yüksek FiO₂ absorpsiyon atelektazisiyle onları şanta da çevirebilir.)' : '') },
      sant: { ad: 'Şant (V̇/Q̇ = 0)', V: 0, Q: 14, A: [0, 0, 0, 0], O: [0, 0, 0, 0], vent: 'yok', yanit: 'çok az (yalnız öbür birimlerden gelen kanda çözünen ek O₂)',
        cap: '<b>Şant, V̇/Q̇ = 0.</b> Alveol perfüze ama hiç ventile değil; kan havalanan alveole uğramaz ve verilen ek O₂ ile hiç karşılaşmaz. FiO₂ ne olursa olsun bu birimden çıkan kan değişmez. Arteriyel PaO₂ yalnızca öbür, ventile alveollerden geçen kanda çözünen ek O₂ kadar, çok az yükselir. [[K1 s. 65]]' },
    };
    const SIRA = ['yuksek', 'esit', 'hafif', 'agir', 'sant'];
    let br = 'hafif', fi = 21, aCur = 0.15, oCur = 0.55, aHed = 0.15, oHed = 0.55;
    el.innerHTML = `<div class="f14-vq">
      <div class="f14-vq-ctl">
        <div class="f14-vq-sat"><span>Birim</span>${segHtml('Akciğer birimi', 'br', SIRA.map((k) => [k, B[k].ad]), br, 'f14-mono')}</div>
        <div class="f14-vq-sat"><span>FiO₂</span>${segHtml('FiO₂', 'fi', FI.map((f) => [f, '%' + f]), fi, 'f14-mono')}</div>
      </div>
      <div class="f14-vq-svgk"></div>
      <dl class="f14-vq-oku">
        <div><dt>Ventilasyon</dt><dd data-o="v"></dd></div>
        <div><dt>Çıkan kan</dt><dd data-o="o"></dd></div>
        <div><dt>PaO₂ yanıtı (FiO₂ artışına)</dt><dd data-o="y"></dd></div>
      </dl>
    </div>`;
    const $ = (s) => el.querySelector(s);
    const svg = mk('svg', { viewBox: '0 0 380 280', class: 'f14-svg f14-vq-svg', role: 'img', 'aria-label': 'Tek akciğer birimi: hava yolu, alveol ve altından geçen kapiller; FiO₂ arttıkça alveol ve çıkan kan değişir' }, $('.f14-vq-svgk'));
    const defs = mk('defs', {}, svg);
    const gr = mk('linearGradient', { id: 'f14-vq-gr', gradientUnits: 'userSpaceOnUse', x1: 140, y1: 0, x2: 232, y2: 0 }, defs);
    mk('stop', { offset: 0, style: 'stop-color:var(--crit);stop-opacity:0' }, gr);
    mk('stop', { offset: 1, style: 'stop-color:var(--crit);stop-opacity:1' }, gr);
    // hava yolu
    mk('path', { d: 'M172 0 L172 66 M208 0 L208 66', class: 'f14-vq-hy' }, svg);
    const gaz = mk('line', { x1: 190, y1: 4, x2: 190, y2: 52, class: 'f14-vq-gaz' }, svg);
    const gazOk = mk('path', { class: 'f14-vq-gazok' }, svg);
    const xIs = mk('path', { d: 'M180 24 l20 20 M200 24 l-20 20', class: 'f14-vq-x' }, svg);
    txt(svg, 216, 18, 'hava yolu', 'f14-vq-lb');
    const fiL = txt(svg, 216, 36, '', 'f14-vq-lb m');
    // ölü boşluk kolu
    const olu = mk('g', { class: 'f14-vq-olu' }, svg);
    mk('path', { d: 'M184 44 C182 84 168 108 154 118 C138 128 124 116 122 96 L120 36', class: 'f14-vq-oluyol' }, olu);
    mk('path', { d: 'M113 44 L120 32 L127 44', class: 'f14-vq-oluok' }, olu);
    txt(olu, 108, 22, 'alveoler', 'f14-vq-lb k', { 'text-anchor': 'end' });
    txt(olu, 108, 38, 'ölü boşluk', 'f14-vq-lb k', { 'text-anchor': 'end' });
    // alveol
    const alv = mk('circle', { cx: 190, cy: 125, r: 62, class: 'f14-vq-alv' }, svg);
    const sivi = mk('g', { class: 'f14-vq-sivi' }, svg);
    mk('circle', { cx: 190, cy: 125, r: 62, class: 'f14-vq-sivid' }, sivi);
    mk('path', { d: 'M150 110 q10 -7 20 0 t20 0 t20 0 t20 0 M144 128 q10 -7 20 0 t20 0 t20 0 t20 0 t12 0 M150 146 q10 -7 20 0 t20 0 t20 0 t20 0', class: 'f14-vq-dalga' }, sivi);
    txt(svg, 258, 92, 'alveol', 'f14-vq-lb');
    const gGaz = mk('g', {}, svg);
    // kapiller
    const kapV = mk('line', { x1: 20, y1: 205, x2: 352, y2: 205, class: 'f14-vq-kap' }, svg);
    const kapA = mk('line', { x1: 140, y1: 205, x2: 352, y2: 205, class: 'f14-vq-kapa', stroke: 'url(#f14-vq-gr)' }, svg);
    const kapOk = mk('path', { class: 'f14-vq-kapok' }, svg);
    const gKan = mk('g', {}, svg);
    txt(svg, 20, 240, 'venöz kan', 'f14-vq-lb v');
    txt(svg, 362, 240, 'birimden çıkan kan', 'f14-vq-lb', { 'text-anchor': 'end' });
    const GZ = Array.from({ length: 16 }, () => ({ y: rnd() * 60, x: rnd() * 2 - 1, ph: rnd() }));
    const gzC = GZ.map(() => mk('circle', { r: 3, class: 'f14-vq-gp' }, gGaz));
    const KN = Array.from({ length: 16 }, (_, i) => ({ x: 20 + i * (332 / 16), u: rnd(), dy: rnd() * 2 - 1 }));
    const knC = KN.map(() => mk('circle', { r: 3.6, class: 'f14-vq-kp' }, gKan));
    let t = 0;
    const cikan = (o) => (o <= 0.001 ? 'oksijenlenmemiş' : o < 0.35 ? 'çok az oksijenlenmiş' : o < 0.95 ? 'kısmen oksijenlenmiş' : 'tam oksijenlenmiş');
    function sabit() {
      const b = B[br], Vw = b.V * 1.7, Qw = b.Q * 1.35;
      gaz.style.display = b.V ? '' : 'none';
      gaz.setAttribute('stroke-width', Math.max(1.5, Vw));
      gaz.classList.toggle('kesik', !!b.kesik);
      const ow = Math.max(5, Vw * 0.75 + 4);
      gazOk.setAttribute('d', b.V ? `M${190 - ow} 52 L190 ${60 + ow * 0.4} L${190 + ow} 52 Z` : '');
      xIs.style.display = br === 'sant' ? '' : 'none';
      olu.style.display = br === 'yuksek' ? '' : 'none';
      sivi.style.display = br === 'sant' ? '' : 'none';
      kapV.setAttribute('stroke-width', Qw); kapA.setAttribute('stroke-width', Qw);
      const kw = Qw / 2 + 5;
      kapOk.setAttribute('d', `M352 ${205 - kw} L366 205 L352 ${205 + kw} Z`);
      fiL.textContent = 'FiO₂ %' + fi;
      $('[data-o="v"]').textContent = b.vent;
      $('[data-o="y"]').textContent = b.yanit;
      basSec(el, 'br', br); basSec(el, 'fi', fi);
      cap.yaz(b.cap + (b.ek ? b.ek(fi) : ''));
    }
    function hedef() {
      const b = B[br], i = FI.indexOf(fi);
      aHed = b.A[i]; oHed = b.O[i];
      if (RM) { aCur = aHed; oCur = oHed; }
      $('[data-o="o"]').textContent = cikan(oHed);
    }
    function ciz() {
      const b = B[br];
      alv.style.fillOpacity = aCur.toFixed(3);
      kapA.style.opacity = oCur.toFixed(3);
      // gaz parçacıkları
      gzC.forEach((c, i) => {
        const g = GZ[i];
        if (i >= Math.round(b.V * 0.9)) { c.setAttribute('opacity', 0); return; }
        const sp = 0.35 + b.V / 30;
        const f = RM ? (g.ph + i / 16) % 1 : (g.ph + t * sp) % 1;
        const y = 6 + f * 96, x = 190 + g.x * Math.min(12, 2 + b.V * 0.7) * (y > 62 ? 1 + (y - 62) / 18 : 1);
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1));
        c.setAttribute('opacity', (y > 80 ? Math.max(0, 1 - (y - 80) / 22) : 0.9).toFixed(2));
      });
      // kan parçacıkları
      const nK = Math.round(b.Q * 1.1);
      knC.forEach((c, i) => {
        const k = KN[i];
        if (i >= nK) { c.setAttribute('opacity', 0); return; }
        const x = 20 + ((i / nK) * 332 + (k.u - 0.5) * 8 + (RM ? 0 : t * 46)) % 332;
        const y = 205 + k.dy * Math.max(0, b.Q * 0.55 - 1);
        const ox = x > 196 && k.u < oCur;
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1));
        c.setAttribute('opacity', (x > 340 ? Math.max(0, (352 - x) / 12) : 1).toFixed(2));
        c.setAttribute('class', 'f14-vq-kp ' + (ox ? 'a' : 'v'));
      });
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.br) br = b.dataset.br; else if (b.dataset.fi) fi = +b.dataset.fi; else return;
      sabit(); hedef(); ciz();
    });
    sabit(); hedef(); aCur = aHed; oCur = oHed; ciz();
    if (RM) return () => {};
    return ticker(el, (dt) => {
      t += dt;
      const f = 1 - Math.exp(-dt / 0.18); // ≈ 0,6 s'de hedefe
      aCur += (aHed - aCur) * f; oCur += (oHed - oCur) * f;
      ciz();
    });
  };

  /* ================= 4 · Şant denklemi: türetin ve hesaplayın ================= */
  VIZ.f14_denklem = (el) => {
    const cap = capOf(el);
    // denklem satırı: terimleri kanal rengiyle boya (Q̇S, CvO₂ şant kanalı; Q̇T − Q̇S, CcO₂ ventile kanal)
    const TOK = { 'QS': ['s', 'Q̇S'], 'QT': ['', 'Q̇T'], 'CcO₂': ['c', 'CcO₂'], 'CvO₂': ['s', 'CvO₂'], 'CaO₂': ['', 'CaO₂'] };
    const S = (s) => s.replace(/\(QT − QS\)|QT − QS|QS|QT|CcO₂|CvO₂|CaO₂/g, (m) => {
      if (m.indexOf('−') > 0) return `<span class="f14-t c">${m.replace('QT', 'Q̇T').replace('QS', 'Q̇S')}</span>`;
      return `<span class="f14-t ${TOK[m][0]}">${TOK[m][1]}</span>`;
    });
    const ADIM = [
      { satir: ['Ventile alveollere giden akım = QT − QS'], vur: 'akim', cap: "<b>1 · Akımlar.</b> Pulmoner arterden gelen toplam akım Q̇T'dir (kalp debisi). Bunun Q̇S kadarı ventile olmayan alveollere, yani şanta gider; kalan Q̇T − Q̇S ventile alveollerden geçer. [[K1 s. 66]]" },
      { satir: ['üst kanal: CcO₂ · alt kanal: CvO₂'], vur: 'icerik', cap: '<b>2 · İçerikler.</b> Ventile alveolden geçen kan kapiller sonu içeriğe (CcO₂) ulaşır; şanttan geçen kan miks venöz içerikte (CvO₂) kalır. Pulmoner vende ikisi karışır ve arteriyel içerik CaO₂ olur. [[K1 s. 65–66]]' },
      { satir: ['QT × CaO₂ = (QT − QS) × CcO₂ + QS × CvO₂'], vur: 'carpim', cap: "<b>3 · O₂ dengesi.</b> Pulmoner vendeki O₂ miktarı, ventile kapillerlerden ve şant kapillerlerinden gelen O₂'nin toplamına eşit olmalıdır. [[K1 s. 66]]" },
      { satir: ['QT × CaO₂ = QT × CcO₂ − QS × CcO₂ + QS × CvO₂'], vur: '', cap: '<b>4 · Parantezi açın.</b> (Q̇T − Q̇S) × CcO₂ iki terime ayrılır. [[K1 s. 66]]' },
      { satir: ['QS × CcO₂ − QS × CvO₂ = QT × CcO₂ − QT × CaO₂', 'QS (CcO₂ − CvO₂) = QT (CcO₂ − CaO₂)'], vur: '', cap: "<b>5 · Terimleri toplayın.</b> Q̇S'li terimler bir yana, Q̇T'li terimler öbür yana; sonra ortak çarpanlar paranteze alınır. [[K1 s. 67]]" },
      { satir: ['QS / QT = (CcO₂ − CaO₂) / (CcO₂ − CvO₂)'], vur: 'son', cap: '<b>6 · Şant denklemi.</b> İki yan Q̇T (CcO₂ − CvO₂) ile bölünür. Pay, şantın arteriyel kanı “ideal” kapiller sonu kandan ne kadar uzaklaştırdığını; payda, tamamen şantlanan kanın ne kadar uzak olacağını gösterir. [[K1 s. 67]]' },
    ];
    const GIR = [
      { k: 'hb', ad: '[Hb]', b: 'g/dL', min: 6, max: 20, st: 0.5, v: 15, d: 1 },
      { k: 'sa', ad: 'SaO₂', b: '%', min: 70, max: 100, st: 1, v: 99, d: 0 },
      { k: 'pa', ad: 'PaO₂', b: 'kPa', min: 4, max: 70, st: 0.1, v: 13, d: 1 },
      { k: 'sv', ad: 'SvO₂', b: '%', min: 30, max: 95, st: 1, v: 75, d: 0 },
      { k: 'pv', ad: 'PvO₂', b: 'kPa', min: 2, max: 10, st: 0.1, v: 5.3, d: 1 },
      { k: 'pc', ad: 'PaCO₂', b: 'kPa', min: 3, max: 10, st: 0.1, v: 5.3, d: 1 },
      { k: 'fi', ad: 'FiO₂', b: '', min: 0.21, max: 1, st: 0.01, v: 0.21, d: 2 },
    ];
    const V = {}; GIR.forEach((g) => { V[g.k] = g.v; });
    let kip = 'turet', ad = 0, oyna = false, oT = 0;
    const gHtml = (g) => {
      const val = g.k === 'hb' ? fmt(V[g.k], V[g.k] % 1 ? 1 : 0) : g.b === '%' ? String(V[g.k]) : fmt(V[g.k], g.d);
      return `<label class="f14-rng"><span>${g.ad}${g.b ? ` (${g.b})` : ''} <b data-g="${g.k}">${val}</b></span><input type="range" min="${g.min}" max="${g.max}" step="${g.st}" value="${V[g.k]}" data-r="${g.k}" aria-label="${g.ad}"></label>`;
    };
    el.innerHTML = `<div class="f14-dk">
      <div class="f14-dk-ust">${segHtml('Kip', 'kip', [['turet', 'Türetme'], ['hesap', 'Hesap']], 'turet')}</div>
      <div class="f14-dk-turet">
        <div class="f14-dk-svgk"></div>
        <div class="f14-dk-dug btn-row"><button type="button" class="btn ghost" data-a="-1">‹ Önceki</button><span class="f14-dk-say" aria-live="polite"></span><button type="button" class="btn ghost" data-a="1">Sonraki ›</button>${RM ? '' : '<button type="button" class="btn ghost" data-oyna>Oynat</button>'}</div>
        <div class="f14-dk-denk" aria-live="polite"></div>
      </div>
      <div class="f14-dk-hesap" hidden>
        <div class="f14-dk-gir">${GIR.map(gHtml).join('')}</div>
        <p class="f14-dk-sabit">${REF('Sabitler: PB 101 kPa · suyun doymuş buhar basıncı 6,3 kPa · R 0,8 [[K1 s. 66]]')} <button type="button" class="btn ghost" data-ornek>Kitap örneği</button></p>
        <div class="f14-dk-cik"></div>
        <div class="f14-dk-sonuc"><span>Şant fraksiyonu <span class="f14-m">Q̇S/Q̇T</span></span><b data-o="qs"></b>
          <span class="f14-dk-bar" aria-hidden="true"><i class="bant"></i><i class="isr"></i></span>
          <span class="f14-dk-bart" aria-hidden="true"><em style="left:0">%0</em><em style="left:20%">%10</em><em style="left:40%">%20</em><em style="left:60%">%30</em><em style="left:80%">%40</em><em style="left:100%">%50</em></span>
          <span class="f14-dk-bant">${REF('yeşil bant: sağlıklı akciğerde tipik, fizyolojik şant %2–5 [[K1 s. 64, 66]]')}</span>
        </div>
      </div>
    </div>`;
    const $ = (s) => el.querySelector(s);
    // türetme şeması
    const svg = mk('svg', { viewBox: '0 0 400 240', class: 'f14-svg f14-dk-svg', role: 'img', 'aria-label': 'İki kanallı şant şeması: pulmoner arterden gelen akım ventile alveolden ve şanttan geçip pulmoner vende birleşir' }, $('.f14-dk-svgk'));
    const UST = [[8, 120], [80, 120], ...bez([80, 120], [96, 120], [96, 70], [112, 70], 8).slice(1), [288, 70], ...bez([288, 70], [304, 70], [304, 120], [320, 120], 8).slice(1), [392, 120]];
    const ALT = [[8, 120], [80, 120], ...bez([80, 120], [96, 120], [96, 170], [112, 170], 8).slice(1), [288, 170], ...bez([288, 170], [304, 170], [304, 120], [320, 120], 8).slice(1), [392, 120]];
    const gk = mk('g', {}, svg);
    L2(UST.slice(0, 11), 'f14-dk-k v'); // giriş + üst kanal başı
    L2(ALT.slice(1, 11), 'f14-dk-k v');
    L2([[112, 70], [200, 70]], 'f14-dk-k v');
    L2([[200, 70], [288, 70], ...UST.slice(12, 20)], 'f14-dk-k a');
    L2([[112, 170], [288, 170], ...ALT.slice(12, 20)], 'f14-dk-k v');
    L2([[320, 120], [392, 120]], 'f14-dk-k a cikis');
    L2([[320, 120], [392, 120]], 'f14-dk-k karisik');
    function L2(pts, cls) { return mk('path', { d: yolD(pts), class: cls }, gk); }
    mk('circle', { cx: 200, cy: 40, r: 22, class: 'f14-dk-alv' }, gk);
    mk('circle', { cx: 200, cy: 202, r: 14, class: 'f14-dk-alv kapali' }, gk);
    mk('path', { d: 'M191 199 q4.5 -3 9 0 t9 0 M191 206 q4.5 -3 9 0 t9 0', class: 'f14-dk-dalga' }, gk);
    const gPa = mk('g', {}, svg);
    const gE = mk('g', {}, svg);
    // etiket türleri: g = giriş (hep görünür), ayri = kanal/çıkış (adım 1–2), carpim = akım × içerik (adım 3–6)
    const E = (x, y, s, tur, renk, kim) => txt(gE, x, y, s, `f14-dk-et ${renk || ''}`, { 'text-anchor': 'middle', 'data-tur': tur, 'data-kim': kim });
    E(44, 106, 'Q̇T', 'g', '', 'akim'); E(44, 145, 'CvO₂', 'g', 's', 'icerik');
    E(146, 92, 'Q̇T − Q̇S', 'ayri', 'c', 'akim'); E(258, 92, 'CcO₂', 'ayri', 'c', 'icerik');
    E(146, 158, 'Q̇S', 'ayri', 's', 'akim'); E(258, 158, 'CvO₂', 'ayri', 's', 'icerik');
    E(356, 106, 'Q̇T', 'ayri', '', 'akim'); E(356, 145, 'CaO₂', 'ayri', '', 'icerik');
    E(200, 92, '(Q̇T − Q̇S) × CcO₂', 'carpim', 'c', 'carpim');
    E(200, 158, 'Q̇S × CvO₂', 'carpim', 's', 'carpim');
    E(356, 106, 'Q̇T × CaO₂', 'carpim', '', 'carpim');
    txt(gE, 8, 200, 'pulmoner arter', 'f14-dk-ad');
    txt(gE, 392, 200, 'pulmoner ven', 'f14-dk-ad', { 'text-anchor': 'end' });
    txt(gE, 200, 232, 'şant: gaz değişimine katılamaz', 'f14-dk-ad', { 'text-anchor': 'middle' });
    const RU = rota(UST), RA = rota(ALT);
    const PP = Array.from({ length: 30 }, (_, i) => ({ alt: i % 5 === 4, f: i / 30 }));
    const ppC = PP.map(() => mk('circle', { r: 3.6, class: 'f14-dk-p' }, gPa));
    let t = 0;
    function semaCiz() {
      PP.forEach((p, i) => {
        const R = p.alt ? RA : RU, f = (p.f + (RM ? 0 : t * 0.14)) % 1, xy = R.at(f * R.len);
        const a = !p.alt && xy[0] >= 200;
        const c = ppC[i];
        c.setAttribute('cx', xy[0].toFixed(1)); c.setAttribute('cy', xy[1].toFixed(1));
        c.setAttribute('class', 'f14-dk-p ' + (a ? 'a' : 'v'));
        c.setAttribute('opacity', (f > 0.96 ? (1 - f) / 0.04 : f < 0.03 ? f / 0.03 : 1).toFixed(2));
      });
    }
    function turetGoster() {
      const A = ADIM[ad];
      gE.querySelectorAll('.f14-dk-et').forEach((t) => {
        const tur = t.dataset.tur, kim = t.dataset.kim;
        let gor = tur === 'carpim' ? ad >= 2 : tur === 'ayri' ? ad < 2 : true;
        if (kim === 'icerik' && ad < 1) gor = false;
        t.style.display = gor ? '' : 'none';
        t.classList.toggle('on', gor && A.vur === kim);
      });
      svg.classList.toggle('son', A.vur === 'son');
      const satirlar = [];
      ADIM.slice(0, ad + 1).forEach((a, i) => a.satir.forEach((s) => satirlar.push(`<p class="f14-dk-sat${i === ad ? ' yeni' : ''}${a.vur === 'son' ? ' son' : ''}">${S(s)}</p>`)));
      $('.f14-dk-denk').innerHTML = satirlar.join('');
      $('.f14-dk-say').textContent = `${ad + 1} / ${ADIM.length}`;
      el.querySelector('[data-a="-1"]').disabled = ad === 0;
      el.querySelector('[data-a="1"]').disabled = ad === ADIM.length - 1;
      cap.yaz(A.cap);
    }
    // hesap
    const PB = 101, PH2O = 6.3, RQ = 0.8, K1 = 1.34, KC = 0.023;
    const kitapMi = () => GIR.every((g) => Math.abs(V[g.k] - g.v) < 1e-9);
    function hesapGoster() {
      const { hb, sa, pa, sv, pv, pc, fi } = V;
      const PA = fi * (PB - PH2O) - pc / RQ;
      const Ca = hb * K1 * sa / 100 + pa * KC, Cv = hb * K1 * sv / 100 + pv * KC, Cc = hb * K1 + PA * KC;
      let uyari = null, F = null;
      if (PA <= 0) uyari = 'Bu FiO₂ ve PaCO₂ ile PAO₂ sıfırın altında çıkıyor.';
      else if (pa > PA) uyari = "PaO₂, alveoler PO₂'den (PAO₂) büyük olamaz: FiO₂'yi ya da PaCO₂'yi kontrol edin.";
      else if (Cc - Cv <= 0) uyari = 'Miks venöz içerik kapiller sonu içeriğe eşit ya da büyük: hesaplanamaz.';
      else if (Ca > Cc) uyari = 'CaO₂, kapiller sonu içerikten büyük çıktı; bu girdilerle şant hesaplanamaz.';
      else F = (Cc - Ca) / (Cc - Cv);
      const hbS = fmt(hb, hb % 1 ? 1 : 0), sat = (s) => fmt(s / 100, 2);
      const satir = (ad, denk, son, b) => `<div class="f14-dk-cs"><span class="ad">${ad}</span><span class="dn">${denk} = <b>${son}</b>${b ? ' ' + b : ''}</span></div>`;
      $('.f14-dk-cik').innerHTML = [
        satir('PAO₂', `${fmt(fi, 2)} × (101 − 6,3) − ${fmt(pc)} / 0,8`, fmt(PA), 'kPa'),
        satir('CaO₂', `${hbS} × 1,34 × ${sat(sa)} + ${fmt(pa)} × 0,023`, fmt(Ca), 'mL/100 mL'),
        satir('CvO₂', `${hbS} × 1,34 × ${sat(sv)} + ${fmt(pv)} × 0,023`, fmt(Cv), 'mL/100 mL'),
        satir('CcO₂', `${hbS} × 1,34 × 1,00 + ${fmt(PA)} × 0,023`, fmt(Cc), 'mL/100 mL'),
        satir('Q̇S/Q̇T', `(${fmt(Cc)} − ${fmt(Ca)}) / (${fmt(Cc)} − ${fmt(Cv)})`, F === null ? '—' : fmt(F, 3), ''),
      ].join('');
      const yz = F === null ? null : F * 100;
      $('[data-o="qs"]').textContent = yz === null ? '—' : '%' + (yz < 1 ? fmt(yz, 1) : String(Math.round(yz)));
      const isr = $('.f14-dk-bar .isr');
      isr.style.display = yz === null ? 'none' : '';
      isr.style.left = clamp((yz || 0) / 50 * 100, 0, 100).toFixed(1) + '%';
      isr.classList.toggle('tas', yz !== null && yz > 50);
      isr.setAttribute('data-t', yz !== null && yz > 50 ? '> %50' : '');
      if (uyari) cap.yaz('<b>Hesaplanamıyor.</b> ' + uyari);
      else cap.yaz('Şant fraksiyonu = (CcO₂ − CaO₂) / (CcO₂ − CvO₂). CcO₂ ölçülemez: satürasyon %100 ve PO₂ = PAO₂ kabul edilir; PAO₂ alveoler gaz denkleminden PaCO₂ ile hesaplanır. CvO₂ için örnek ideal olarak pulmoner arter kateterinden alınır. [[K1 s. 65–66]]'
        + (kitapMi() ? ' Kitabın örneği: ≈ %4, sağlıklı akciğer için tipik. [[K1 s. 66]]' : '')
        + (fi >= 0.9 ? ' (Atlas notu: %100 O₂ solurken hesaplanan değer gerçek şanta daha yakındır; oda havasında düşük V̇/Q̇’lu bölgelerin katkısı da içindedir.)' : ''));
    }
    function girYaz() {
      GIR.forEach((g) => {
        const b = el.querySelector(`[data-g="${g.k}"]`), r = el.querySelector(`[data-r="${g.k}"]`);
        b.textContent = g.k === 'hb' ? fmt(V.hb, V.hb % 1 ? 1 : 0) : g.b === '%' ? String(V[g.k]) : fmt(V[g.k], g.d);
        if (+r.value !== V[g.k]) r.value = V[g.k];
      });
    }
    function kipSec(k) {
      kip = k; basSec(el, 'kip', k);
      $('.f14-dk-turet').hidden = k !== 'turet'; $('.f14-dk-hesap').hidden = k !== 'hesap';
      if (k === 'turet') turetGoster(); else { oynaDur(); hesapGoster(); }
    }
    const oynaDur = () => { oyna = false; oT = 0; const b = el.querySelector('[data-oyna]'); if (b) b.textContent = 'Oynat'; };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.kip) { kipSec(b.dataset.kip); return; }
      if (b.dataset.a) { oynaDur(); ad = clamp(ad + +b.dataset.a, 0, ADIM.length - 1); turetGoster(); return; }
      if (b.hasAttribute('data-oyna')) {
        if (oyna) { oynaDur(); return; }
        oyna = true; oT = 0; b.textContent = 'Duraklat';
        if (ad === ADIM.length - 1) { ad = 0; turetGoster(); }
        return;
      }
      if (b.hasAttribute('data-ornek')) { GIR.forEach((g) => { V[g.k] = g.v; }); girYaz(); hesapGoster(); }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      V[r.dataset.r] = Math.round(+r.value * 100) / 100; girYaz(); hesapGoster();
    });
    kipSec('turet'); semaCiz();
    if (RM) return () => {};
    return ticker(el, (dt) => {
      t += dt; semaCiz();
      if (oyna && kip === 'turet') {
        oT += dt;
        if (oT >= 3) { oT = 0; if (ad < ADIM.length - 1) { ad++; turetGoster(); } if (ad === ADIM.length - 1) oynaDur(); }
      }
    });
  };

  /* ================= 5 · İzo-şant çizgileri ================= */
  VIZ.f14_izosant = (el) => {
    const cap = capOf(el);
    // model (docs/tasarim/fiz14.md): kitap sabitleri, Hill eğrisi, sabit a–v içerik farkı
    const PB = 101, PH2O = 6.3, PCO2 = 5.3, RQ = 0.8, HB = 15, K1 = 1.34, KC = 0.023, D = 5.0;
    const sat = (p) => (p <= 0 ? 0 : Math.pow(p, 2.7) / (Math.pow(p, 2.7) + Math.pow(3.5, 2.7)));
    const C = (p) => HB * K1 * sat(p) + KC * p;
    const Cinv = (c) => { let a = 0.1, b = 120; for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (C(m) < c) a = m; else b = m; } return (a + b) / 2; };
    const PAO2 = (fi) => fi * (PB - PH2O) - PCO2 / RQ;
    const model = (F, fi) => { const PA = PAO2(fi), Cc = C(PA), Ca = Cc - F * D / (1 - F); return { PA, Cc, Ca, Pa: Cinv(Ca), hbb: HB * K1 * sat(PA), coz: KC * PA }; };
    const X0 = 52, X1 = 378, Y0 = 266, Y1 = 16, FMIN = 16, FMAX = 100, PMAX = 90;
    const X = (f) => X0 + (f - FMIN) / (FMAX - FMIN) * (X1 - X0), Y = (p) => Y0 - p / PMAX * (Y0 - Y1);
    let F = 20, FI = 21, oyna = false, oT = 0;
    el.innerHTML = `<div class="f14-iz">
      <div class="f14-iz-svgk"></div>
      <div class="f14-iz-pan">
        <label class="f14-rng"><span>Şant fraksiyonu <b data-o="F"></b></span><input type="range" min="0" max="50" step="1" value="20" data-r="F" aria-label="Şant fraksiyonu"></label>
        <label class="f14-rng"><span>FiO₂ <b data-o="FI"></b></span><input type="range" min="21" max="100" step="1" value="21" data-r="FI" aria-label="FiO₂"></label>
        <div class="btn-row"><button type="button" class="btn ghost" data-oyna>${RM ? 'FiO₂ %100' : '%21 → %100 oynat'}</button></div>
        <dl class="f14-iz-oku">
          <div><dt>PAO₂</dt><dd data-o="PA"></dd></div>
          <div><dt>Kapiller sonu O₂ (CcO₂)</dt><dd data-o="Cc"></dd><dd class="alt" data-o="Ccb"></dd></div>
          <div><dt>Arteriyel O₂ (CaO₂)</dt><dd data-o="Ca"></dd></div>
          <div class="pa"><dt>PaO₂</dt><dd data-o="Pa"></dd></div>
          <div class="genis"><dt>FiO₂ %21 → %100 ile PaO₂</dt><dd data-o="kaz"></dd></div>
        </dl>
      </div>
    </div>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const svg = mk('svg', { viewBox: '0 0 420 308', class: 'f14-svg f14-iz-svg', role: 'img', 'aria-label': 'İzo-şant çizgileri: FiO₂ yüzde 21 ile 100 arasında PaO₂; şant büyüdükçe çizgiler yatıklaşır' }, $('.f14-iz-svgk'));
    const gG = mk('g', {}, svg), tikler = [];
    for (let p = 0; p <= PMAX; p += 10) {
      mk('line', { x1: X0, x2: X1, y1: Y(p), y2: Y(p), class: 'f14-grid' }, gG);
      if (p % 20 === 0) tikler.push([p, txt(gG, X0 - 7, Y(p) + 4.5, String(p), 'f14-tk', { 'text-anchor': 'end' })]);
    }
    [21, 40, 60, 80, 100].forEach((f) => { mk('line', { x1: X(f), x2: X(f), y1: Y0, y2: Y0 + 5, class: 'f14-eksen' }, gG); txt(gG, X(f), Y0 + 20, String(f), 'f14-tk', { 'text-anchor': 'middle' }); });
    mk('line', { x1: X0, x2: X1, y1: Y0, y2: Y0, class: 'f14-eksen' }, gG);
    mk('line', { x1: X0, x2: X0, y1: Y0, y2: Y1, class: 'f14-eksen' }, gG);
    txt(gG, X1, Y0 + 37, 'FiO₂ (%)', 'f14-tk b', { 'text-anchor': 'end' });
    txt(gG, 2, 10, 'PaO₂ (kPa)', 'f14-tk b');
    mk('line', { x1: X(21), x2: X(21), y1: Y0, y2: Y1 + 10, class: 'f14-iz-oda' }, gG);
    txt(gG, X(21) + 5, Y1 + 8, 'oda havası', 'f14-tk');
    const ciz = (Fq) => yolD(Array.from({ length: 80 }, (_, i) => { const f = 21 + 79 * i / 79; return [X(f), Y(model(Fq / 100, f / 100).Pa)]; }));
    const gE = mk('g', {}, svg);
    const ETK = [0, 10, 20, 30, 40, 50];
    ETK.forEach((q) => mk('path', { d: ciz(q), class: 'f14-iz-ince' }, gE));
    // etiketler: sağ uçta, üst üste binmesin
    let onceki = -99;
    ETK.map((q) => ({ q, y: Y(model(q / 100, 1).Pa) })).sort((a, b) => a.y - b.y).forEach((e) => { const y = Math.max(e.y + 4, onceki + 14); onceki = y; txt(gE, X1 + 9, y, '%' + e.q, 'f14-tk'); });
    const secE = mk('path', { class: 'f14-iz-sec' }, svg);
    const yatay = mk('line', { class: 'f14-iz-yatay' }, svg);
    const yEt = txt(svg, X0 - 6, 0, '', 'f14-iz-yet', { 'text-anchor': 'end' });
    const paN = mk('circle', { r: 5, class: 'f14-iz-pao' }, svg);
    const paL = txt(svg, 0, 0, 'PAO₂', 'f14-iz-pal');
    const nok = mk('circle', { r: 6, class: 'f14-iz-nok' }, svg);
    function guncelle(egriDe) {
      if (egriDe) secE.setAttribute('d', ciz(F));
      const m = model(F / 100, FI / 100), x = X(FI), y = Y(m.Pa);
      nok.setAttribute('cx', x); nok.setAttribute('cy', y);
      yatay.setAttribute('x1', X0); yatay.setAttribute('x2', x); yatay.setAttribute('y1', y); yatay.setAttribute('y2', y);
      yEt.setAttribute('y', y + 4.5); yEt.textContent = fmt(m.Pa);
      tikler.forEach(([p, t]) => { t.style.display = Math.abs(Y(p) - y) < 16 ? 'none' : ''; });
      const ya = Y(m.PA);
      paN.setAttribute('cx', x); paN.setAttribute('cy', ya);
      const gizle = F === 0;
      paN.style.display = gizle ? 'none' : ''; paL.style.display = gizle ? 'none' : '';
      const sol = x > X1 - 52;
      paL.setAttribute('x', sol ? x - 9 : x + 9); paL.setAttribute('y', ya + 4.5); paL.setAttribute('text-anchor', sol ? 'end' : 'start');
      o('F').textContent = '%' + F; o('FI').textContent = '%' + FI;
      o('PA').textContent = fmt(m.PA) + ' kPa';
      o('Cc').textContent = fmt(m.Cc) + ' mL/100 mL';
      o('Ccb').textContent = `Hb'ye bağlı ${fmt(m.hbb)} + çözünmüş ${fmt(m.coz, 2)}`;
      o('Ca').textContent = fmt(m.Ca) + ' mL/100 mL';
      o('Pa').innerHTML = `${fmt(m.Pa)} kPa <span>(${Math.round(m.Pa * 7.5)} mmHg)</span>`;
      const a = model(F / 100, 0.21).Pa, b = model(F / 100, 1).Pa;
      o('kaz').textContent = `${fmt(a)} → ${fmt(b)} kPa (+${fmt(b - a)})`;
      const ref = F <= 5 ? '[[K1 s. 64, 67]]' : F <= 30 ? '[[K1 s. 67]]' : '[[K1 s. 65, 67]]';
      const govde = F <= 5 ? "Şant yok ya da sağlıklı akciğerdeki fizyolojik düzeyde (%2–5). FiO₂ artışı PAO₂'yi, onunla birlikte PaO₂'yi de belirgin yükseltir."
        : F <= 15 ? 'Kanın bir bölümü ventile alveolleri atlar; aynı FiO₂ artışı artık daha az PaO₂ kazancı sağlar ve çizgi yatıklaşmaya başlar.'
          : F <= 30 ? "Şantlanan kan ek O₂ ile hiç karşılaşmaz ve payı büyüdükçe yüksek FiO₂'nin etkisi azalır: oda havasından %100 O₂'ye geçmek PaO₂'yi şantsız akciğerdekinden çok daha az yükseltir."
            : 'Ventile alveollerden çıkan kan oda havasında bile neredeyse tam satüredir; FiO₂ artışı ona yalnızca az miktarda çözünmüş O₂ ekler. Bu küçük ek, şantlanan venöz kanla seyrelince PaO₂ çok az yükselir.';
      cap.yaz(`<b>Şant %${F}.</b> ${govde} ${ref}`);
    }
    const oynaDur = () => { oyna = false; const b = $('[data-oyna]'); if (b && !RM) b.textContent = '%21 → %100 oynat'; };
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'F') { F = +r.value; guncelle(true); } else { oynaDur(); FI = +r.value; guncelle(false); }
    });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-oyna]'); if (!b) return;
      if (RM) { FI = 100; $('[data-r="FI"]').value = 100; guncelle(false); return; }
      if (oyna) { oynaDur(); return; }
      oyna = true; oT = 0; FI = 21; $('[data-r="FI"]').value = 21; b.textContent = 'Duraklat'; guncelle(false);
    });
    guncelle(true);
    if (RM) return () => {};
    return ticker(el, (dt) => {
      if (!oyna) return;
      oT += dt;
      const f = Math.min(1, oT / 3);
      FI = Math.round(21 + 79 * f); $('[data-r="FI"]').value = FI; guncelle(false);
      if (f >= 1) oynaDur();
    });
  };

  /* ================= 6 · Hipokseminin dört nedeni: dört akciğer birimi (durağan şema) ================= */
  VIZ.f14_nedenler = (el) => {
    // ortak şablon (panel içi birimler, viewBox 170 × 150): hava yolu → alveol → bariyer → kapiller
    const AY = 62, AR = 28, BY = 97.5, KY = 122;
    const PAN = [
      { bas: 'Hipoventilasyon', cx: 85, hw: 2.5, A: 0.15, O: 0.45, o2: 1.4,
        s1: 'PaCO₂ ↑ → PAO₂ ↓ (AGE)', s2: 'bariyerde O₂ gradyanı küçülür',
        ek: (cx) => `<text x="${cx + 10}" y="25" class="f14-nd-t k">V̇A ↓</text>
          <text x="${cx}" y="58" class="f14-nd-t k in" text-anchor="middle">PACO₂ ↑</text>
          <text x="${cx}" y="76" class="f14-nd-t b in" text-anchor="middle">PAO₂ ↓</text>` },
      { bas: 'Difüzyon kısıtlanması', cx: 42, hw: 7, A: 0.45, O: 0.6, o2: 2.6, kalin: true,
        s1: 'nadir: normalde denge kapillerin ilk üçte birinde kurulur', s2: 'kalın bariyer, düşük inspire O₂ (irtifa) ya da bunlar hafifken egzersiz',
        ek: () => mini() },
      { bas: 'Şant', cx: 85, hw: 7, A: 0, O: 0, o2: 0, sant: true,
        s1: 'kan gaz değişimini atlar', s2: 'O₂’ye yanıt zayıf' },
      { bas: '<span class="f14-m">V̇/Q̇</span> uyumsuzluğu', ad: 'V̇/Q̇ uyumsuzluğu', cx: 85, hw: 2.5, A: 0.15, O: 0.55, o2: 1.4,
        s1: 'yetersiz ventile alveol: venöz karışım', s2: 'hafifse O₂’ye yanıt verir',
        ek: () => `<rect x="102" y="9" width="58" height="21" rx="10.5" class="f14-nd-hap"/><text x="131" y="23.6" class="f14-nd-t w in" text-anchor="middle">V̇/Q̇ &lt; 1</text>` },
    ];
    // difüzyon paneli: kapiller boyunca PO₂ (nitel; "⅓" kitaptan [[K1 s. 63]])
    function mini() {
      const x0 = 82, x1 = 160, yA = 24, yV = 64, yE = 68, xu = x0 + (x1 - x0) / 3;
      const e = (k) => yolD(Array.from({ length: 49 }, (_, i) => { const u = i / 48; return [x0 + u * (x1 - x0), yV - (yV - yA) * (1 - Math.exp(-k * u))]; }));
      return `<rect x="74" y="2" width="94" height="102" rx="8" class="f14-nd-fr"/>
        <line x1="${x0}" y1="${yA}" x2="${x1}" y2="${yA}" class="f14-nd-pao"/>
        <line x1="${xu}" y1="${yA}" x2="${xu}" y2="${yE}" class="f14-nd-esik"/>
        <line x1="${x0}" y1="${yE}" x2="${x1}" y2="${yE}" class="f14-eksen"/><line x1="${x0}" y1="${yA - 6}" x2="${x0}" y2="${yE}" class="f14-eksen"/>
        <path d="${e(2.2)}" class="f14-nd-eg k"/><path d="${e(12)}" class="f14-nd-eg"/>
        <text x="${xu - 2}" y="16" class="f14-nd-d" text-anchor="middle">denge</text>
        <text x="164" y="16" class="f14-nd-t c" text-anchor="end">PAO₂</text>
        <text x="140" y="50" class="f14-nd-d k" text-anchor="middle">kalın</text><text x="140" y="61.5" class="f14-nd-d k" text-anchor="middle">bariyer</text>
        <text x="${x0}" y="80" class="f14-nd-t" text-anchor="middle">0</text><text x="${xu}" y="80" class="f14-nd-t" text-anchor="middle">⅓</text><text x="${x1}" y="80" class="f14-nd-t" text-anchor="middle">1</text>
        <text x="121" y="96" class="f14-nd-d" text-anchor="middle">kapiller boyu</text>`;
    }
    const panel = (p, i) => {
      const cx = p.cx, id = `f14-nd-gr${i}`;
      const gazOk = p.sant ? '' : p.hw > 4
        ? `<line x1="${cx}" y1="5" x2="${cx}" y2="22" class="f14-nd-gaz" stroke-width="3.6"/><path d="M${cx - 6} 21 L${cx} 31 L${cx + 6} 21 Z" class="f14-nd-gazok"/>`
        : `<line x1="${cx}" y1="5" x2="${cx}" y2="25" class="f14-nd-gaz" stroke-width="1.4"/><path d="M${cx - 3} 24 L${cx} 31 L${cx + 3} 24 Z" class="f14-nd-gazok"/>`;
      const alv = p.sant
        ? `<circle cx="${cx}" cy="${AY}" r="${AR}" class="f14-nd-alv sivi"/>
           <path d="M${cx - 18} 50 q4.5 -4 9 0 t9 0 t9 0 t9 0 M${cx - 18} 78 q4.5 -4 9 0 t9 0 t9 0 t9 0" class="f14-nd-dalga"/>
           <text x="${cx}" y="67" class="f14-nd-d b" text-anchor="middle">sıvı</text>`
        : `<circle cx="${cx}" cy="${AY}" r="${AR}" class="f14-nd-alv" style="fill-opacity:${p.A}"/>`;
      const bar = p.kalin
        ? `<rect x="${cx - 30}" y="${BY - 5}" width="60" height="10" class="f14-nd-kalin" style="fill:url(#f14-nd-tar)"/>`
        : `<line x1="${cx - 42}" y1="${BY}" x2="${cx + 42}" y2="${BY}" class="f14-nd-bar"/>`;
      const o2 = p.o2 ? `<line x1="${cx}" y1="${AY + AR + 1}" x2="${cx}" y2="${KY - 12}" class="f14-nd-o2" stroke-width="${p.o2}"/>
          <path d="M${cx - 3.6} ${KY - 13} L${cx} ${KY - 6.5} L${cx + 3.6} ${KY - 13} Z" class="f14-nd-o2ok"/>
          <text x="${cx + 7}" y="${KY - 9}" class="f14-nd-t c">O₂</text>` : '';
      return `<figure class="f14-nd-p">
        <h4>${p.bas}</h4>
        <svg viewBox="0 0 170 150" class="f14-svg f14-nd-svg" role="img" aria-label="${p.ad || p.bas}: hava yolu, alveol, bariyer ve kapiller; ${p.s1}">
          <defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${cx - 22}" y1="0" x2="${cx + 24}" y2="0"><stop offset="0" style="stop-color:var(--crit);stop-opacity:0"/><stop offset="1" style="stop-color:var(--crit);stop-opacity:1"/></linearGradient>
          ${p.kalin ? '<pattern id="f14-nd-tar" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" class="f14-nd-tarz"/><line x1="0" y1="0" x2="0" y2="5" class="f14-nd-tarc"/></pattern>' : ''}</defs>
          <path d="M${cx - p.hw} 2 L${cx - p.hw} 36 M${cx + p.hw} 2 L${cx + p.hw} 36" class="f14-nd-hy"/>
          ${gazOk}
          ${p.sant ? `<path d="M${cx - 7} 11 L${cx + 7} 25 M${cx + 7} 11 L${cx - 7} 25" class="f14-nd-x"/>` : ''}
          ${alv}${bar}${o2}
          <line x1="10" y1="${KY}" x2="146" y2="${KY}" class="f14-nd-kap"/>
          <line x1="10" y1="${KY}" x2="146" y2="${KY}" class="f14-nd-kap a" style="stroke:url(#${id});opacity:${p.O}"/>
          <path d="M151 ${KY - 7} L163 ${KY} L151 ${KY + 7} Z" class="f14-nd-kapok"/>
          <text x="8" y="${KY + 22}" class="f14-nd-d">venöz</text><text x="164" y="${KY + 22}" class="f14-nd-d" text-anchor="end">çıkan kan</text>
          ${p.ek ? p.ek(cx) : ''}
        </svg>
        <figcaption><b>${p.s1}</b><span>${p.s2}</span></figcaption>
      </figure>`;
    };
    el.innerHTML = `<div class="f14-nd">
      <div class="f14-nd-grid">${PAN.map(panel).join('')}</div>
      <div class="f14-nd-lej" aria-hidden="true"><span><i class="v"></i>venöz kan</span><span><i class="a"></i>oksijenlenmiş kan</span><span><i class="g"></i>alveoler O₂ (renk yoğunluğu)</span><span><i class="o"></i>bariyerden O₂ geçişi</span></div>
    </div>`;
    return () => {};
  };

  /* ================= 7 · Şantta PaCO₂: solunum merkezi telafi eder ================= */
  VIZ.f14_co2 = (el) => {
    const capEl = (el.closest('.viz') || el).querySelector('.viz-cap');
    const capIlk = capEl ? capEl.innerHTML : '';
    // sayfadaki açıklamada "(1) … (4)" adımları var: seçili adımın cümlesini işaretle (metin değişmez)
    function capVurgu(k) {
      if (!capEl) return;
      const a = k ? capIlk.indexOf(`(${k})`) : -1;
      if (a < 0) { capEl.innerHTML = capIlk; return; }
      let b = k < 4 ? capIlk.indexOf(`(${k + 1})`, a) : -1;
      if (b < 0) { b = capIlk.indexOf('<', a); if (b < 0) b = capIlk.length; }
      const parca = capIlk.slice(a, b), bos = parca.length - parca.trimEnd().length;
      capEl.innerHTML = capIlk.slice(0, a) + '<mark class="f14-co-mk">' + parca.trimEnd() + '</mark>' + parca.slice(parca.length - bos) + capIlk.slice(b);
    }
    const TY = 179, UY = 122, LY = 236, XS = 62, XM = 278, XA = 100, XB = 240;
    const UPb = bez([XS, TY], [XS + 20, TY], [XS + 20, UY], [XA, UY], 12), UPc = bez([XB, UY], [XB + 20, UY], [XB + 20, TY], [XM, TY], 12);
    const LOb = bez([XS, TY], [XS + 20, TY], [XS + 20, LY], [XA, LY], 12), LOc = bez([XB, LY], [XB + 20, LY], [XB + 20, TY], [XM, TY], 12);
    const UP = [...UPb, ...UPc], LO = [...LOb, ...LOc];
    const ADIM = [
      'Adım 1: şantlanan kan CO₂’sini bırakmadan arteriyel kana karışır',
      'Adım 2: PaCO₂ yükselme eğilimine girer ve algılanır',
      'Adım 3: solunum merkezi alveoler ventilasyonu artırır',
      'Adım 4: ventile alveollerden daha çok CO₂ atılır, PaCO₂ normal kalır',
    ];
    const M = [[106, 213], [332, 92], [209, 13], [124, 80]];
    el.innerHTML = `<div class="f14-co">
      <div class="f14-co-ctl">
        <div class="btn-row"><button type="button" class="btn ghost" data-a="-1" aria-label="Önceki adım">‹</button><span class="f14-co-say" aria-live="polite"></span><button type="button" class="btn ghost" data-a="1" aria-label="Sonraki adım">›</button>${RM ? '' : '<button type="button" class="btn ghost" data-oyna>Oynat</button>'}</div>
        <p class="f14-co-ip">Numaralara dokunun ya da adım adım ilerleyin; seçili adım şemada ve açıklamada öne çıkar.</p>
      </div>
      <div class="f14-co-svgk">
        <svg viewBox="0 0 392 304" class="f14-svg f14-co-svg" role="group" aria-label="Şant ve PaCO₂: şantlanan kan CO₂'sini bırakmaz; solunum merkezi alveoler ventilasyonu artırır, ventile alveollerden daha çok CO₂ atılır">
          <defs>
            <linearGradient id="f14-co-gr" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="194" y2="0"><stop offset="0" style="stop-color:var(--crit);stop-opacity:0"/><stop offset="1" style="stop-color:var(--crit);stop-opacity:1"/></linearGradient>
            <marker id="f14-co-ok-a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 Z" class="f14-co-oka"/></marker>
            <marker id="f14-co-ok-u" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 Z" class="f14-co-oku"/></marker>
          </defs>
          <g class="f14-co-g s0">
            <path d="${yolD([[6, TY], [XS, TY]])}" class="f14-co-k v"/>
            <text x="6" y="203" class="f14-co-lb">miks</text><text x="6" y="219" class="f14-co-lb">venöz kan</text>
          </g>
          <g class="f14-co-g s1">
            <path d="${yolD(LO)}" class="f14-co-k v"/>
            <circle cx="170" cy="272" r="22" class="f14-co-sivi"/>
            <path d="M156 264 q3.5 -3.5 7 0 t7 0 t7 0 t7 0 M153 272 q3.5 -3.5 7 0 t7 0 t7 0 t7 0 t6 0 M156 280 q3.5 -3.5 7 0 t7 0 t7 0 t7 0" class="f14-co-dalga"/>
            <text x="200" y="272" class="f14-co-lb">sıvıyla dolu alveol</text><text x="200" y="288" class="f14-co-lb">(ventilasyon yok)</text>
            <rect x="124" y="202" width="92" height="23" rx="7" class="f14-co-kalir" data-sigdir="170"/><text x="170" y="218.5" class="f14-co-lb b" text-anchor="middle">CO₂ kalır</text>
            <g class="f14-co-pLO"></g>
          </g>
          <g class="f14-co-g s4">
            <path d="${yolD(UP)}" class="f14-co-k v"/>
            <path d="${yolD(UP)}" class="f14-co-k" style="stroke:url(#f14-co-gr)"/>
            <circle cx="170" cy="80" r="28" class="f14-co-alv"/>
            <text x="170" y="86" class="f14-co-lb g" text-anchor="middle">CO₂</text>
            ${[158, 170, 182].map((x) => `<line x1="${x}" y1="114" x2="${x}" y2="101" class="f14-co-cok"/><path d="M${x - 3.4} 102 L${x} 95 L${x + 3.4} 102 Z" class="f14-co-cokb"/>`).join('')}
            <g class="f14-co-pUP"></g><g class="f14-co-pHY"></g>
            <rect x="282" y="208" width="96" height="24" rx="12" class="f14-co-hap" data-sigdir="330"/><text x="330" y="224.5" class="f14-co-hapt" text-anchor="middle">PaCO₂ normal</text>
          </g>
          <g class="f14-co-g s2">
            <path d="${yolD([[XM, TY], [344, TY]])}" class="f14-co-k a"/>
            <path d="${yolD([[XM, TY], [344, TY]])}" class="f14-co-k kar"/>
            <path d="M344 ${TY - 8} L358 ${TY} L344 ${TY + 8} Z" class="f14-co-cik"/>
            <text x="330" y="200" class="f14-co-lb" text-anchor="middle">arteriyel kan</text>
            <line x1="332" y1="${TY - 7}" x2="332" y2="62" class="f14-co-geri" marker-end="url(#f14-co-ok-u)"/>
            <text x="318" y="76" class="f14-co-lb k" text-anchor="end">PaCO₂ ↑</text><text x="318" y="92" class="f14-co-lb k" text-anchor="end">eğilimi</text><text x="318" y="108" class="f14-co-lb w" text-anchor="end">algılanır</text>
          </g>
          <g class="f14-co-g s3">
            <path d="M160 0 L160 53 M180 0 L180 53" class="f14-co-hy"/>
            <rect x="232" y="6" width="150" height="48" rx="10" class="f14-co-mrk"/>
            <text x="307" y="27" class="f14-co-mrt" text-anchor="middle">Solunum merkezi</text><text x="307" y="45" class="f14-co-lb" text-anchor="middle">(Bölüm 22)</text>
            <line x1="231" y1="30" x2="190" y2="30" class="f14-co-va" marker-end="url(#f14-co-ok-a)"/>
            <text x="209" y="50" class="f14-co-vat" text-anchor="middle">V̇A ↑</text>
          </g>
          <g class="f14-co-mler">${M.map(([x, y], i) => `<g class="f14-co-m" data-adim="${i + 1}" role="button" tabindex="0" aria-label="${ADIM[i]}"><circle cx="${x}" cy="${y}" r="16" class="hit"/><circle cx="${x}" cy="${y}" r="11" class="d"/><text x="${x}" y="${y + 4.6}" class="n" text-anchor="middle">${i + 1}</text></g>`).join('')}</g>
        </svg>
      </div>
      <div class="f14-co-hiz">
        <div data-k="ure"><b>CO₂ üretimi</b><span>metabolizma hızı belirler · değişmez</span></div>
        <div data-k="ati"><b>CO₂ atılımı</b><span><span class="f14-m">V̇A</span>’ya bağlı · artar</span></div>
      </div>
    </div>`;
    const $ = (s) => el.querySelector(s), svg = $('.f14-co-svg');
    // kutular yazıya göre genişlesin (yazı tipi yüklenince yeniden ölçülür)
    const sigdir = () => svg.querySelectorAll('[data-sigdir]').forEach((r) => {
      const t = r.nextElementSibling; let L = 0; try { L = t.getComputedTextLength(); } catch (_) { L = 0; }
      if (!L) return;
      const w = Math.max(+r.getAttribute('width'), L + 16), cx = +r.dataset.sigdir, x = Math.min(cx - w / 2, 390 - w);
      r.setAttribute('width', w.toFixed(1)); r.setAttribute('x', x.toFixed(1)); t.setAttribute('x', (x + w / 2).toFixed(1));
    });
    sigdir(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(sigdir);
    // CO₂ parçacıkları: alt kanalda kanla birlikte arteriyel kana geçer; üst kanalda alveole difüze olur, hava yolundan atılır
    const RLO = rota([[6, TY], [XS, TY], ...LO.slice(1), [344, TY]]);
    const RUP = rota([[6, TY], [XS, TY], ...UPb.slice(1), [188, UY]]);
    const pc = (g, n, r) => Array.from({ length: n }, () => mk('circle', { r, class: 'f14-co-p', opacity: 0 }, g));
    const cLO = pc($('.f14-co-pLO'), 10, 3.6), cUP = pc($('.f14-co-pUP'), 12, 3.6), cHY = pc($('.f14-co-pHY'), 6, 3.4);
    const PL = cLO.map(() => ({ on: false })), PU = cUP.map(() => ({ on: false }));
    const HY = cHY.map((_, i) => ({ f: i / cHY.length, dx: (i % 3 - 1) * 3.5 }));
    const HIZ = 52;
    let birikim = 0, sira = 0, t = 0;
    function adimP(dt) {
      t += dt;
      birikim += dt * 1.6;
      while (birikim >= 1) {
        birikim -= 1; sira++;
        const alt = sira % 3 === 0; // şant akımı ventile kanaldan küçük (şematik)
        const P = alt ? PL : PU, p = P.find((q) => !q.on);
        if (p) Object.assign(p, { on: true, s: 0, yuk: 0, xe: 156 + Math.random() * 26 });
      }
      PL.forEach((p) => { if (p.on) { p.s += dt * HIZ; if (p.s >= RLO.len) p.on = false; } });
      PU.forEach((p) => {
        if (!p.on) return;
        if (p.yuk) { p.yuk += dt * 22; if (p.yuk > 24) p.on = false; return; }
        p.s += dt * HIZ;
        const xy = RUP.at(p.s);
        if ((xy[0] >= p.xe && xy[1] <= UY + 0.5) || p.s >= RUP.len) { p.yuk = 0.01; p.xe = xy[0]; }
      });
    }
    function cizP() {
      PL.forEach((p, i) => {
        const c = cLO[i]; if (!p.on) { c.setAttribute('opacity', 0); return; }
        const xy = RLO.at(p.s), op = p.s > RLO.len - 26 ? (RLO.len - p.s) / 26 : p.s < 14 ? p.s / 14 : 1;
        c.setAttribute('cx', xy[0].toFixed(1)); c.setAttribute('cy', xy[1].toFixed(1)); c.setAttribute('opacity', op.toFixed(2));
      });
      PU.forEach((p, i) => {
        const c = cUP[i]; if (!p.on) { c.setAttribute('opacity', 0); return; }
        let xy = RUP.at(p.s), op = p.s < 14 ? p.s / 14 : 1;
        if (p.yuk) { xy = [p.xe, UY - p.yuk]; op = 1 - p.yuk / 24; }
        c.setAttribute('cx', xy[0].toFixed(1)); c.setAttribute('cy', xy[1].toFixed(1)); c.setAttribute('opacity', op.toFixed(2));
      });
      HY.forEach((h, i) => {
        const f = RM ? (0.2 + i / HY.length * 0.7) % 1 : (h.f + t * 0.42) % 1, y = 56 - f * 56;
        const c = cHY[i];
        c.setAttribute('cx', (170 + h.dx).toFixed(1)); c.setAttribute('cy', y.toFixed(1));
        c.setAttribute('opacity', (f > 0.8 ? (1 - f) / 0.2 : f < 0.1 ? f / 0.1 : 1).toFixed(2));
      });
    }
    function durgun() { // RM: eşit aralıklı durağan noktalar
      [0.3, 0.42, 0.54, 0.66, 0.92].forEach((f, i) => Object.assign(PL[i], { on: true, s: f * RLO.len }));
      [0.25, 0.5, 0.72].forEach((f, i) => Object.assign(PU[i], { on: true, s: f * RUP.len, yuk: 0, xe: 999 }));
      Object.assign(PU[3], { on: true, s: RUP.len, yuk: 10, xe: 170 });
    }
    // adım vurgusu
    let adim = 0, oyna = false, oT = 0;
    function goster() {
      if (adim) svg.setAttribute('data-adim', adim); else svg.removeAttribute('data-adim');
      el.querySelectorAll('.f14-co-m').forEach((m) => { const on = +m.dataset.adim === adim; m.classList.toggle('on', on); m.setAttribute('aria-pressed', String(on)); });
      $('.f14-co-say').textContent = adim ? `Adım ${adim} / 4` : 'Hepsi';
      $('[data-a="-1"]').disabled = adim === 0;
      $('[data-a="1"]').disabled = adim === 4;
      $('[data-k="ati"]').classList.toggle('on', adim >= 3);
      capVurgu(adim);
    }
    const oynaDur = () => { oyna = false; oT = 0; const b = $('[data-oyna]'); if (b) b.textContent = 'Oynat'; };
    const sec = (k) => { adim = clamp(k, 0, 4); goster(); };
    el.addEventListener('click', (e) => {
      const m = e.target.closest('.f14-co-m');
      if (m) { oynaDur(); sec(+m.dataset.adim === adim ? 0 : +m.dataset.adim); return; }
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.a) { oynaDur(); sec(adim + +b.dataset.a); return; }
      if (b.hasAttribute('data-oyna')) {
        if (oyna) { oynaDur(); return; }
        oyna = true; oT = 0; b.textContent = 'Duraklat'; sec(1);
      }
    });
    el.addEventListener('keydown', (e) => {
      const m = e.target.closest('.f14-co-m');
      if (m && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); oynaDur(); sec(+m.dataset.adim === adim ? 0 : +m.dataset.adim); }
    });
    goster();
    if (RM) { durgun(); cizP(); return () => { capVurgu(0); }; }
    for (let i = 0; i < 160; i++) adimP(0.05);
    cizP();
    const dur = ticker(el, (dt) => {
      adimP(dt); cizP();
      if (oyna) {
        oT += dt;
        if (oT >= 2.8) { oT = 0; if (adim < 4) sec(adim + 1); else { oynaDur(); sec(0); } }
      }
    });
    return () => { dur(); capVurgu(0); };
  };
})();
