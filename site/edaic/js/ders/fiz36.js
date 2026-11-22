/* Bölüm 36 · Kapillerler ve endotel · bileşenler (tarif: docs/tasarim/fiz36.md; K1 s. 158–162).
   Bütün çizimler şematiktir; sayılar tarif ve kitapla aynıdır, temsilî olanlar viz-foot'ta söylenir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const MQ = '(max-width: 560px)';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const seg01 = (u, a, b) => clamp((u - a) / (b - a), 0, 1);
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const rndGen = (seed) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const isaret = (v) => (v > 0 ? '+' + v : v < 0 ? '−' + Math.abs(v) : '0');
  const ondalik = (v, d = 1) => v.toFixed(d).replace('.', ',');
  const capYaz = (() => {
    const son = new WeakMap();
    return (el, html) => { const v = el.closest('.viz'); const c = v && v.querySelector('.viz-cap'); if (!c || son.get(c) === html) return; son.set(c, html); c.innerHTML = REF(html); };
  })();
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg${cls ? ' ' + cls : ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const bas = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  // dar ekran değişince bileşeni yeniden kurar (durum kur() dışındaki değişkenlerde tutulur)
  function duyarli(kur) {
    const mq = window.matchMedia(MQ);
    let t = kur(mq.matches);
    const f = () => { if (t) t(); t = kur(mq.matches); };
    if (mq.addEventListener) mq.addEventListener('change', f); else mq.addListener(f);
    return () => { if (t) t(); if (mq.removeEventListener) mq.removeEventListener('change', f); else mq.removeListener(f); };
  }
  const ok = (id, renk, b = 9) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="${b}" markerHeight="${b}" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" style="fill:${renk}"/></marker>`;

  /* ================= 1 · Kapiller tipleri ================= */
  // parçacıklar: simge çizimi hem SVG'de hem listede aynı
  const PT = [
    { k: 'gaz', ad: 'O₂ · CO₂', w: 30 },
    { k: 'su', ad: 'Su', w: 22 },
    { k: 'kucuk', ad: 'Küçük suda çözünen moleküller (ör. glukoz, elektrolit)', w: 20 },
    { k: 'alb', ad: 'Albümin (büyük plazma proteini)', w: 12 },
    { k: 'rbc', ad: 'Eritrosit', w: 10 },
    { k: 'wbc', ad: 'Lökosit', w: 6 },
  ];
  const simge = (k) => ({
    gaz: '<circle r="3.4" style="fill:var(--c-clin)"/>',
    su: '<circle r="2.8" style="fill:var(--c-basic)"/>',
    kucuk: '<path d="M0 -3.8 L3.8 0 L0 3.8 L-3.8 0 Z" style="fill:var(--ok)"/>',
    alb: '<circle r="5.6" style="fill:var(--warn)"/>',
    rbc: '<ellipse rx="8.5" ry="3.8" style="fill:var(--crit)"/><ellipse rx="3.8" ry="1.3" style="fill:var(--crit-soft)"/>',
    wbc: '<circle r="7.6" style="fill:var(--paper);stroke:var(--accent);stroke-width:1.6"/><circle cx="-2.4" cy="-1" r="2" style="fill:var(--accent)"/><circle cx="1.6" cy="-2" r="1.8" style="fill:var(--accent)"/><circle cx="1.2" cy="2.2" r="1.9" style="fill:var(--accent)"/>',
  })[k];
  const TIP = [
    { ad: 'Sürekli', yer: 'kas, beyin, bağ dokusu', gec: ['zar', 'aralik', 'aralik', 0, 0, 0], jw: [4, 4, 4], zip: 1, fen: 0, etiket: 'sıkı bağlantı',
      cap: '<b>Sürekli kapiller.</b> Kesintisiz bazal membran, sıkı bağlantılarla yapışık endotel hücreleri. Bir tip seçin: duvarın yapısı ve geçebilen parçacıklar değişir. [[K1 s. 158]]' },
    { ad: 'Sürekli · beyin (KBB)', yer: 'beyin (kan–beyin bariyeri) · Bölüm 47', gec: ['zar', 'zar', 'tas', 0, 0, 0], jw: [3, 3, 3], zip: 2, fen: 0, ast: 1, etiket: 'çok sıkı bağlantı',
      cap: '<b>Kan–beyin bariyeri.</b> Sıkı bağlantılar hücreleri özellikle sıkı tutar, dışını astrosit ayakçıkları sarar. Yalnız su, O₂ ve CO₂ gibi en küçük moleküller serbestçe geçer; besin, metabolit ve ilaçlar taşıyıcı aracılı taşımaya bağlıdır. [[K1 s. 158]]' },
    { ad: 'Fenestralı', yer: 'renal glomerül, bağırsak mukozası, koroid pleksus', gec: ['zar', 'aralik', 'aralik', 0, 0, 0], jw: [4, 4, 4], zip: 1, fen: 1, etiket: 'fenestra 60–80 nm',
      cap: '<b>Fenestralı kapiller.</b> Endotel hücresinin içindeki 60–80 nm\'lik fenestralar duvarı sürekli kapillerden çok daha geçirgen yapar; en büyük plazma proteinleri (ör. albümin) dışında neredeyse her şey geçer. [[K1 s. 158]]' },
    { ad: 'Sinüzoidal', yer: 'kemik iliği, lenf düğümü', gec: ['zar', 'aralik', 'aralik', 'buyuk', 'buyuk', 'buyuk'], jw: [4, 26, 4], zip: 1, fen: 1, etiket: 'açıklık ≤ 10 μm',
      cap: '<b>Sinüzoidal kapiller.</b> Özel bir fenestralı tip: kemik iliği ve lenf düğümlerinde 10 μm\'ye varan açıklıklardan eritrosit ve lökosit geçer. [[K1 s. 158]]' },
    { ad: 'Süreksiz sinüzoidal', yer: 'karaciğer, dalak', gec: ['zar', 'aralik', 'aralik', 'buyuk', 'buyuk', 'buyuk'], jw: [24, 24, 24], zip: 0, fen: 1, kesik: 1, etiket: 'sıkı bağlantı yok',
      cap: '<b>Süreksiz sinüzoidal kapiller.</b> Karaciğer ve dalakta büyük fenestralara sıkı bağlantı yokluğu da eklenir; hücreler en kolay burada geçer. [[K1 s. 158]]' },
  ];
  const DURUM = { zar: ['ok', '✓ geçer'], aralik: ['ok', '✓ geçer'], buyuk: ['ok', '✓ geçer'], tas: ['tas', 'taşıyıcıyla'], 0: ['no', '✕ geçmez'] };

  VIZ.f36_tip = (el) => {
    let tip = 0;
    return duyarli((dar) => {
      const W = dar ? 340 : 520, H = 250, LY = 112, WB = 146, BM = 150;
      el.innerHTML = `<div class="f36-kok">
        ${segHtml('Kapiller tipi', 'tip', TIP.map((t, i) => [i, t.ad]), tip, 'f36-seg')}
        <p class="f36-not">Kapiller çapı 5–10 μm · duvar: tek hücre endotel + bazal membran</p>
        <div class="f36-yan">
          <svg class="f36-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kapiller duvarının kesiti: üstte lümen, ortada endotel hücreleri ve bazal membran, altta interstisyum; parçacıklar duvardan geçer ya da geri seker">
            <rect x="0" y="0" width="${W}" height="${LY + 4}" style="fill:var(--crit-soft)"/>
            <rect x="0" y="${LY + 4}" width="${W}" height="${H - LY - 4}" style="fill:var(--bg)"/>
            <g class="f36-tp-duvar"></g><g class="f36-tp-par"></g><g class="f36-tp-et"></g>
          </svg>
          <div class="f36-panel"><p class="f36-yer"><span>Bulunduğu yer</span><b></b></p><ul class="f36-gl"></ul></div>
        </div></div>`;
      const kok = el.firstElementChild, svg = kok.querySelector('svg');
      const gD = svg.querySelector('.f36-tp-duvar'), gP = svg.querySelector('.f36-tp-par'), gE = svg.querySelector('.f36-tp-et');
      const JX = [W * 0.25, W * 0.5, W * 0.75];
      let acik = [], kat = [];
      let parts = [], spawnT = 0;
      const rnd = rndGen(11);

      function ciz() {
        const T = TIP[tip];
        gD.innerHTML = ''; gE.innerHTML = '';
        acik = JX.map((x, j) => ({ x, w: T.jw[j], k: T.jw[j] > 10 ? 'buyuk' : 'aralik' }));
        if (T.fen) for (let c = 0; c < 4; c++) { const cx = W * (0.125 + 0.25 * c); [-1, 1].forEach((s) => acik.push({ x: cx + s * W * 0.068, w: 5, k: 'fen' })); }
        acik.sort((a, b) => a.x - b.x);
        // hücre parçaları
        let x = -20;
        kat = [];
        acik.concat([{ x: W + 20 + 0, w: 0 }]).forEach((o) => { const e = o.x - o.w / 2; if (e - x > 1) kat.push([x, e]); x = o.x + o.w / 2; });
        kat.forEach(([a, b]) => mk('rect', { x: a, y: LY, width: b - a, height: WB - LY, rx: 7, class: 'f36-hucre' }, gD));
        for (let c = 0; c < 4; c++) mk('ellipse', { cx: W * (0.125 + 0.25 * c), cy: (LY + WB) / 2, rx: Math.min(14, W * 0.035), ry: 7, class: 'f36-cekirdek' }, gD);
        // sıkı bağlantılar
        if (T.zip) acik.filter((o) => o.k === 'aralik').forEach((o) => { for (let y = LY + 6; y < WB - 2; y += 8) mk('line', { x1: o.x - 4, x2: o.x + 4, y1: y, y2: y, class: 'f36-zip' + (T.zip === 2 ? ' kalin' : '') }, gD); });
        // bazal membran
        mk('line', { x1: 0, x2: W, y1: BM, y2: BM, class: 'f36-bm' + (T.kesik ? ' kesik' : '') }, gD);
        if (T.ast) for (let ax = 10; ax < W; ax += 21) mk('circle', { cx: ax, cy: BM + 10, r: 8.5, class: 'f36-ast' }, gD);
        if (T.gec[2] === 'tas') for (let c = 0; c < 4; c++) mk('circle', { cx: W * (0.125 + 0.25 * c) + 18, cy: LY, r: 4.2, class: 'f36-tasiyici' }, gD);
        // etiketler
        const t = (x, y, s, cls, anc) => { const e = mk('text', { x, y, class: 'f36-h ' + (cls || 'f36-t'), 'text-anchor': anc || 'start' }, gE); e.textContent = s; return e; };
        t(8, 18, 'Lümen (kan)');
        t(8, H - 10, 'İnterstisyum');
        t(W - 8, BM + (T.ast ? 32 : 16), 'bazal membran' + (T.kesik ? ' (kesik)' : ''), 'f36-ts', 'end');
        if (T.ast) t(8, BM + 32, 'astrosit ayakçıkları', 'f36-ts f36-klin');
        if (T.gec[2] === 'tas') t(W * 0.125 + 26, LY - 7, 'taşıyıcı', 'f36-ts f36-vurgu');
        let fx = W * 0.5;
        if (tip === 2) fx = W * 0.625 - W * 0.068;
        mk('line', { x1: fx, x2: fx, y1: BM + 2, y2: 196, class: 'f36-kilavuz' }, gE);
        t(fx, 210, T.etiket, 'f36-t f36-vurgu', 'middle');
        // liste
        kok.querySelector('.f36-yer b').textContent = T.yer;
        kok.querySelector('.f36-gl').innerHTML = PT.map((p, i) => { const [c, s] = DURUM[T.gec[i]]; return `<li class="${c}"><svg viewBox="-11 -8 22 16" aria-hidden="true">${simge(p.k)}</svg><span>${p.ad}</span><b>${s}</b></li>`; }).join('');
        // parçacıklar
        gP.innerHTML = ''; parts = [];
        if (RM) durgun(); else for (let i = 0; i < 16; i++) dog(rnd() * W * 0.9);
      }
      function hedefX(mod) {
        if (mod === 'zar') { for (let n = 0; n < 10; n++) { const x = W * (0.08 + rnd() * 0.86); if (!acik.some((o) => Math.abs(o.x - x) < o.w / 2 + 6)) return x; } return W * 0.4; }
        if (mod === 'tas') return W * (0.125 + 0.25 * Math.floor(rnd() * 4)) + 18;
        const L = acik.filter((o) => (mod === 'buyuk' ? o.k === 'buyuk' : true));
        return L[Math.floor(rnd() * L.length)].x;
      }
      function sec() { let r = rnd() * 100; for (let i = 0; i < PT.length; i++) { r -= PT[i].w; if (r <= 0) return i; } return 0; }
      function dog(x0) {
        const i = sec(), T = TIP[tip], mod = T.gec[i];
        const buyukP = i >= 3;
        const y0 = buyukP ? 34 + rnd() * 52 : 24 + rnd() * 70;
        const gecer = mod && rnd() < (tip === 4 ? 0.85 : 0.6);
        const tx = gecer ? hedefX(mod) : W * (0.15 + rnd() * 0.7);
        const g = mk('g', {}, gP); g.innerHTML = simge(PT[i].k);
        parts.push({ i, g, x: x0, y: y0, y0, tx, gecer, mod, st: tx < x0 ? 'akis-son' : 'akis', b: 0, life: 0, ty: 178 + rnd() * 50, vx: buyukP ? 32 : 44, sx: 1 });
      }
      function durgun() {
        const T = TIP[tip];
        PT.forEach((p, i) => {
          const x = W * (0.09 + 0.155 * i), gec = !!T.gec[i];
          [[x, gec ? 50 : 98 - (i >= 3 ? 6 : 0)], gec ? [x + 8, 190 + (i % 2) * 18] : [x + 12, 56]].forEach(([px, py]) => { const g = mk('g', { transform: `translate(${px} ${py})` }, gP); g.innerHTML = simge(p.k); });
        });
      }
      function adim(dt) {
        spawnT += dt;
        if (spawnT > 0.34 && parts.length < 24) { spawnT = 0; dog(-12); }
        parts = parts.filter((p) => {
          const r = p.i >= 3 ? 7 : 4;
          if (p.st === 'akis' || p.st === 'akis-son') {
            p.x += p.vx * dt;
            p.y = p.y0 + Math.sin((p.x + p.y0 * 3) / 40) * 3;
            if (p.st === 'akis' && p.x >= p.tx) { p.x = p.tx; p.st = p.gecer ? 'gec' : 'sek'; p.b = 0; }
          } else if (p.st === 'sek') {
            p.b += dt * 1.3; p.x += p.vx * 0.35 * dt;
            p.y = p.y0 + (LY - r - 2 - p.y0) * Math.sin(Math.PI * Math.min(1, p.b));
            if (p.b >= 1) { p.st = 'akis-son'; p.y0 = p.y; }
          } else if (p.st === 'gec') {
            const hiz = p.mod === 'tas' ? 22 : p.i >= 4 ? 24 : 40;
            p.y += hiz * dt;
            p.x = lerp(p.x, p.tx, 0.2);
            p.sx = p.i >= 4 && p.y > LY - 10 && p.y < BM + 8 ? (p.mod === 'buyuk' && TIP[tip].jw[1] < 20 && tip !== 4 ? 0.5 : 0.62) : 1;
            if (p.y >= p.ty) { p.st = 'disari'; p.life = 0; }
          } else if (p.st === 'disari') {
            p.life += dt; p.x += 7 * dt; p.y += 2 * dt;
            p.g.style.opacity = String(clamp(1 - (p.life - 1.2), 0, 1));
            if (p.life > 2.2) { p.g.remove(); return false; }
          }
          if (p.x > W + 14) { p.g.remove(); return false; }
          p.g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${p.sx} ${p.sx < 1 ? 1.25 : 1})`);
          return true;
        });
      }
      kok.addEventListener('click', (e) => {
        const b = e.target.closest('[data-tip]'); if (!b) return;
        tip = +b.dataset.tip; bas(kok, 'tip', tip); capYaz(el, TIP[tip].cap); ciz();
      });
      ciz();
      return RM ? () => {} : ticker(kok, adim);
    });
  };

  /* ================= 2 · Değişim yolları ================= */
  const YOL = [
    { ad: '1 Difüzyon', cap: '<b>Basit difüzyon.</b> O₂, CO₂ ve anestezikler gibi küçük lipofilik moleküller hücre zarından, küçük suda çözünen moleküller gözeneklerden ya da hücre aralıklarından geçer. Hızı en çok duvar boyunca konsantrasyon (parsiyel basınç) farkı belirler: Fick yasası. [[K1 s. 158]]',
      lej: [['var(--crit)', 'O₂'], ['var(--ok)', 'anestezik'], ['var(--c-clin)', 'CO₂ (ters yönde)'], ['var(--c-basic)', 'küçük suda çözünen']], not: 'Hız ∝ konsantrasyon (parsiyel basınç) farkı · Fick yasası, Bölüm 10', grad: 1 },
    { ad: '2 Kitle akımı', cap: '<b>Kitle akımı.</b> Su, hücre içindeki sıvı dolu gözeneklerden (fenestralar) ya da hücreler arasından süzülür ve elektrolitler gibi çözünmüş maddeleri sürükler. Fenestralı glomerül kapillerlerinde özellikle önemlidir; yönünü Starling kuvvetleri belirler. [[K1 s. 158–159]]',
      lej: [['var(--c-basic)', 'su'], ['var(--accent)', 'elektrolit (Na⁺, Cl⁻)']], not: 'su + çözünmüş maddeler · yönü Starling kuvvetleri belirler' },
    { ad: '3 Pinositoz', cap: '<b>Pinositoz.</b> Enerji harcayan bir endositoz: lümendeki madde zarla sarılıp vezikül olur, hücreden geçer ve interstisyuma boşaltılır (Bölüm 4). Değişime katkısı küçüktür. [[K1 s. 159]]',
      lej: [['var(--warn)', 'taşınan madde']], not: 'enerji harcar (ATP) · değişime katkısı küçük' },
    { ad: '4 Bolus akımı', cap: '<b>Bolus akımı.</b> Kapiller eritrosit kadar dardır (≈ 7 μm): eritrosit şeklini bozarak sığar, akım sıralı eritrosit ve plazma boluslarına bölünür. Boluslardaki karışma değişimi kolaylaştırır, etkin viskozite ise yalnız ≈ %30 artar. [[K1 s. 159]]',
      lej: [['var(--crit)', 'eritrosit'], ['var(--c-basic)', 'plazma bolusu içinde karışma']], not: 'boyuna kesit · akım soldan sağa' },
  ];
  VIZ.f36_yol = (el) => {
    let adimNo = 0, dur = false;
    return duyarli((dar) => {
      const W = dar ? 340 : 600, H = dar ? 300 : 270;
      const LB = dar ? 104 : 96, CH = 62, BM = LB + CH + 5, GX = W * 0.56, GW = 10, PX = W * 0.24, PW = 8, VX = W * 0.7;
      el.innerHTML = `<div class="f36-kok">
        <div class="f36-ust">${segHtml('Değişim yolu', 'ad', YOL.map((y, i) => [i, y.ad]), adimNo, 'f36-seg')}${RM ? '' : `<button type="button" class="btn ghost f36-oyna">${dur ? 'Oynat' : 'Duraklat'}</button>`}</div>
        <svg class="f36-svg f36-svg-g" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kapiller duvarından madde geçiş yolları">
          <defs>${ok('f36-y-ok', 'var(--ink)')}<clipPath id="f36-y-tup"><rect x="14" y="0" width="${W - 28}" height="${H}"/></clipPath></defs>
          <g class="f36-y-sahne"></g>
        </svg>
        <div class="f36-lej"></div></div>`;
      const kok = el.firstElementChild, svg = kok.querySelector('svg'), G = svg.querySelector('.f36-y-sahne');
      const rnd = rndGen(5);
      let parts = [], spawnT = 0, faz = 0, ref = {};
      const t = (p, x, y, s, cls, anc) => { const e = mk('text', { x, y, class: 'f36-h ' + (cls || 'f36-t'), 'text-anchor': anc || 'start' }, p); e.textContent = s; return e; };

      function duvar() {
        mk('rect', { x: 0, y: 0, width: W, height: LB + 2, style: 'fill:var(--crit-soft)' }, G);
        mk('rect', { x: 0, y: LB + 2, width: W, height: H - LB - 2, style: 'fill:var(--bg)' }, G);
        const parca = [[-10, PX - PW / 2], [PX + PW / 2, GX - GW / 2], [GX + GW / 2, W + 10]];
        parca.forEach(([a, b]) => { mk('rect', { x: a, y: LB, width: b - a, height: CH, rx: 9, class: 'f36-hucre' }, G); mk('line', { x1: a + 6, x2: b - 6, y1: LB + 3.5, y2: LB + 3.5, class: 'f36-zar2' }, G); mk('line', { x1: a + 6, x2: b - 6, y1: LB + CH - 3.5, y2: LB + CH - 3.5, class: 'f36-zar2' }, G); });
        mk('ellipse', { cx: W * 0.42, cy: LB + CH / 2, rx: dar ? 15 : 20, ry: 11, class: 'f36-cekirdek' }, G);
        mk('ellipse', { cx: W * 0.86, cy: LB + CH / 2, rx: dar ? 15 : 20, ry: 11, class: 'f36-cekirdek' }, G);
        mk('line', { x1: 0, x2: W, y1: BM, y2: BM, class: 'f36-bm' }, G);
        t(G, 8, 18, 'Lümen (kan)'); t(G, 8, H - 10, 'İnterstisyum');
      }
      function ciz() {
        G.innerHTML = ''; parts = []; ref = {}; faz = 0;
        const Y = YOL[adimNo];
        kok.querySelector('.f36-lej').innerHTML = Y.lej.map(([c, s]) => `<span><i style="background:${c}"></i>${s}</span>`).join('') + (Y.grad ? '<span class="f36-grad"><i></i>lümen yüksek → interstisyum düşük</span>' : '') + `<span class="f36-lej-not">${Y.not}</span>`;
        if (adimNo < 3) {
          duvar();
          if (adimNo === 0) {
            t(G, PX, LB - 8, 'gözenek', 'f36-ts', 'middle'); t(G, GX, LB - 8, 'hücre aralığı', 'f36-ts', 'middle');
            mk('line', { x1: W * 0.8, x2: W * 0.8, y1: LB - 20, y2: LB + 2, class: 'f36-kilavuz' }, G);
            t(G, W - 6, LB - 26, dar ? 'fosfolipid zar' : 'fosfolipid çift katman', 'f36-ts', 'end');
          } else if (adimNo === 1) {
            t(G, PX, LB - 8, 'fenestra', 'f36-ts', 'middle'); t(G, GX, LB - 8, 'hücre aralığı', 'f36-ts', 'middle');
            t(G, W - 8, H - 10, 'su + çözünmüş maddeler', 'f36-ts', 'end');
          } else {
            ref.dipF = mk('path', { style: 'fill:var(--crit-soft)' }, G); ref.dipA = mk('path', { class: 'f36-zarc' }, G);
            ref.fuF = mk('path', { style: 'fill:var(--bg)' }, G); ref.fuA = mk('path', { class: 'f36-zarc' }, G);
            ref.ves = mk('g', {}, G); ref.vesC = mk('circle', { r: 13, class: 'f36-vez' }, ref.ves);
            ref.dots = [0, 1, 2].map(() => mk('circle', { r: 3, style: 'fill:var(--warn)' }, G));
            const atp = mk('g', { transform: `translate(${VX + (dar ? 26 : 34)} ${LB - 30})` }, G);
            mk('rect', { x: -18, y: -11, width: 36, height: 20, rx: 10, class: 'f36-atp' }, atp); t(atp, 0, 4, 'ATP', 'f36-ts f36-vurgu', 'middle');
            ref.evre = t(G, W - 8, H - 10, '', 'f36-t', 'end');
            t(G, VX, LB + CH + 26, 'vezikül', 'f36-ts', 'middle');
          }
        } else {
          const yc = dar ? 92 : 88, R = dar ? 20 : 24;
          ref.yc = yc; ref.R = R;
          mk('rect', { x: 14, y: yc - R - 11, width: W - 28, height: 2 * R + 22, rx: 8, class: 'f36-hucre' }, G);
          mk('rect', { x: 14, y: yc - R, width: W - 28, height: 2 * R, style: 'fill:var(--crit-soft)' }, G);
          t(G, 14, yc - R - 18, 'Kapiller duvarı (endotel)', 'f36-ts');
          ref.akis = mk('g', { 'clip-path': 'url(#f36-y-tup)' }, G);
          const S = dar ? 84 : 100; ref.S = S; ref.n = Math.ceil(W / S) + 2; ref.rbc = []; ref.vor = [];
          for (let i = 0; i < ref.n; i++) {
            const r = mk('path', { d: `M-7 ${-R + 1.5} Q 15 ${-R + 1.5} 15 0 Q 15 ${R - 1.5} -7 ${R - 1.5} Q 5 0 -7 ${-R + 1.5} Z`, class: 'f36-rbcb' }, ref.akis);
            ref.rbc.push(r);
            const v = mk('g', {}, ref.akis);
            [-1, 1].forEach((s) => { const g = mk('g', { 'data-s': s }, v); const rr = R / 2 - 3; mk('path', { d: `M ${rr} 0 A ${rr} ${rr} 0 1 1 0 ${-rr}`, class: 'f36-vor', 'marker-end': 'url(#f36-y-ok)' }, g); });
            ref.vor.push(v);
          }
          // ölçü
          const ox = dar ? 34 : 40;
          mk('line', { x1: ox, x2: ox, y1: yc - R + 2, y2: yc + R - 2, class: 'f36-olcu', 'marker-start': 'url(#f36-y-ok)', 'marker-end': 'url(#f36-y-ok)' }, G);
          t(G, ox + 6, yc + R + 26, 'iç çap ≈ 7 μm', 'f36-t');
          // viskozite çubukları
          const y0 = yc + R + 54, L = W - 28;
          t(G, 14, y0, 'Etkin viskozite artışı', 'f36-t');
          mk('rect', { x: 14, y: y0 + 10, width: L * 0.14, height: 14, rx: 3, style: 'fill:var(--accent)' }, G);
          t(G, 14 + L * 0.14 + 8, y0 + 22, 'bolus akımı ≈ %30', 'f36-t f36-vurgu');
          mk('rect', { x: 14, y: y0 + 40, width: L - 14, height: 14, rx: 3, class: 'f36-kesikbar' }, G);
          mk('line', { x1: W - 30, x2: W - 16, y1: y0 + 47, y2: y0 + 47, class: 'f36-olcu', 'marker-end': 'url(#f36-y-ok)' }, G);
          t(G, 14, y0 + 74, dar ? 'türbülanslı akımda: çok daha fazla' : 'türbülanslı akımda beklenen: çok daha fazla', 'f36-ts');
        }
        if (RM) { adim(0, true); }
      }
      function dog() {
        if (adimNo === 0) {
          const r = rnd();
          if (r < 0.5) { // O₂ ya da anestezik: zardan aşağı
            let x; for (let n = 0; n < 10; n++) { x = W * (0.04 + rnd() * 0.92); if (Math.abs(x - PX) > 12 && Math.abs(x - GX) > 12) break; }
            parts.push({ c: rnd() < 0.6 ? 'var(--crit)' : 'var(--ok)', x, y: 20 + rnd() * 30, vy: 34, ox: null });
          } else if (r < 0.72) {
            let x; for (let n = 0; n < 10; n++) { x = W * (0.04 + rnd() * 0.92); if (Math.abs(x - PX) > 12 && Math.abs(x - GX) > 12) break; }
            parts.push({ c: 'var(--c-clin)', x, y: H - 22 - rnd() * 20, vy: -30, ox: null });
          } else { const ox = rnd() < 0.5 ? PX : GX; parts.push({ c: 'var(--c-basic)', x0: ox + (rnd() - 0.5) * 80, x: 0, y: 26 + rnd() * 20, vy: 36, ox }); }
        } else if (adimNo === 1) {
          const ox = rnd() < 0.5 ? PX : GX, el2 = rnd() < 0.28;
          parts.push({ c: el2 ? 'var(--accent)' : 'var(--c-basic)', x0: ox + (rnd() - 0.5) * 110, x: 0, y: 22 + rnd() * 30, vy: 46, ox, cizgi: !el2, etk: el2 ? (rnd() < 0.5 ? 'Na⁺' : 'Cl⁻') : null, yay: (rnd() - 0.5) * 90 });
        }
        const p = parts[parts.length - 1];
        p.g = p.cizgi ? mk('line', { x1: 0, y1: -6, x2: 0, y2: 6, class: 'f36-sucizgi' }, G) : mk('circle', { r: 3, style: `fill:${p.c}` }, G);
        if (p.etk) { p.tx = mk('text', { class: 'f36-ts f36-h', 'text-anchor': 'start' }, G); p.tx.textContent = p.etk; }
      }
      function adim(dt, durgunMu) {
        if (adimNo < 2) {
          if (durgunMu) { for (let i = 0; i < 26; i++) dog(); parts.forEach((p, i) => { const f = (i % 13) / 13; p.y = p.vy > 0 ? lerp(20, H - 30, f) : lerp(H - 22, 20, f); konum(p); }); return; }
          spawnT += dt; const hiz = adimNo === 0 ? 0.13 : 0.08;
          while (spawnT > hiz) { spawnT -= hiz; if (parts.length < 60) dog(); }
          parts = parts.filter((p) => { p.y += p.vy * dt; konum(p); if (p.y > H - 4 || p.y < 2) { p.g.remove(); if (p.tx) p.tx.remove(); return false; } return true; });
        } else if (adimNo === 2) {
          faz = durgunMu ? 2.5 : (faz + dt) % 4.4;
          pino(faz);
        } else {
          faz = durgunMu ? 0.35 : faz + dt;
          bolus(faz, durgunMu);
        }
      }
      function konum(p) {
        if (p.ox != null) {
          const f = clamp((LB - p.y) / 60, 0, 1), alt = clamp((p.y - (LB + CH)) / 70, 0, 1);
          p.x = p.ox + (p.x0 - p.ox) * f + (p.yay || 0) * alt;
        }
        const op = clamp(p.vy > 0 ? (H - 4 - p.y) / 40 : (p.y - 2) / 30, 0, 1);
        if (p.cizgi) { p.g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`); } else { p.g.setAttribute('cx', p.x.toFixed(1)); p.g.setAttribute('cy', p.y.toFixed(1)); }
        p.g.style.opacity = op;
        if (p.tx) { p.tx.setAttribute('x', (p.x + 5).toFixed(1)); p.tx.setAttribute('y', (p.y - 4).toFixed(1)); p.tx.style.opacity = op; }
      }
      function pino(u) {
        const top = LB, bot = LB + CH, rx = 15;
        const d1 = u < 1 ? 28 * ease(u) : u < 1.5 ? 28 * (1 - ease((u - 1) / 0.5)) : 0;
        ref.dipF.setAttribute('d', d1 > 0.5 ? `M ${VX - rx} ${top} A ${rx} ${d1} 0 0 0 ${VX + rx} ${top} Z` : '');
        ref.dipA.setAttribute('d', d1 > 0.5 ? `M ${VX - rx} ${top} A ${rx} ${d1} 0 0 0 ${VX + rx} ${top}` : '');
        let vy = null, vop = 0;
        if (u >= 1 && u < 3) { vy = u < 1.5 ? top + 16 : lerp(top + 16, bot - 16, ease((u - 1.5) / 1.5)); vop = 1; }
        const d2 = u >= 3 && u < 4.2 ? 22 * Math.sin(Math.PI * clamp((u - 3) / 1.2, 0, 1)) : 0;
        ref.fuF.setAttribute('d', d2 > 0.5 ? `M ${VX - rx} ${bot} A ${rx} ${d2} 0 0 1 ${VX + rx} ${bot} Z` : '');
        ref.fuA.setAttribute('d', d2 > 0.5 ? `M ${VX - rx} ${bot} A ${rx} ${d2} 0 0 1 ${VX + rx} ${bot}` : '');
        ref.ves.style.opacity = vop; if (vy != null) ref.ves.setAttribute('transform', `translate(${VX} ${vy})`);
        ref.dots.forEach((d, i) => {
          const ox = (i - 1) * 6, oy = i === 1 ? -4 : 2;
          let x, y;
          if (u < 1) { const f = ease(u); x = VX + ox + (i - 1) * 18 * (1 - f); y = lerp(top - 30 - i * 6, top + d1 * 0.55 + oy, f); }
          else if (u < 3) { x = VX + ox; y = vy + oy; }
          else { const f = ease(clamp((u - 3) / 1.3, 0, 1)); x = VX + ox + (i - 1) * 14 * f; y = lerp(bot - 16 + oy, bot + 34 + i * 6, f); }
          d.setAttribute('cx', x.toFixed(1)); d.setAttribute('cy', y.toFixed(1)); d.style.opacity = u > 4 ? clamp(1 - (u - 4) / 0.4, 0, 1) : 1;
        });
        ref.evre.textContent = u < 1 ? '1 · zar çukurlaşır' : u < 1.5 ? '2 · vezikül kopar' : u < 3 ? '3 · hücreden geçer' : '4 · interstisyuma boşaltır';
      }
      function bolus(tt, durgunMu) {
        const S = ref.S, yc = ref.yc, R = ref.R, off = (tt * 46) % S, ang = durgunMu ? 0 : tt * 200;
        for (let i = 0; i < ref.n; i++) {
          const x = -S + off + i * S;
          ref.rbc[i].setAttribute('transform', `translate(${x.toFixed(1)} ${yc})`);
          const v = ref.vor[i]; v.setAttribute('transform', `translate(${(x + S / 2 + 4).toFixed(1)} ${yc})`);
          [...v.children].forEach((g) => { const s = +g.dataset.s; g.setAttribute('transform', `translate(0 ${s * R / 2}) rotate(${s * ang})`); });
        }
      }
      kok.addEventListener('click', (e) => {
        const b = e.target.closest('[data-ad]');
        if (b) { adimNo = +b.dataset.ad; bas(kok, 'ad', adimNo); capYaz(el, YOL[adimNo].cap); ciz(); return; }
        if (e.target.closest('.f36-oyna')) { dur = !dur; e.target.closest('.f36-oyna').textContent = dur ? 'Oynat' : 'Duraklat'; }
      });
      ciz();
      return RM ? () => {} : ticker(kok, (dt) => { if (!dur) adim(dt); });
    });
  };

  /* ================= 3 · Starling kuvvetleri ================= */
  VIZ.f36_starling = (el) => {
    const D = { pos: 0, sg: 1, intro: RM ? -1 : 0, el: false };
    const Pc = (x) => 36 - 26 * x;
    const net = (x) => Pc(x) - 2 - D.sg * 21;
    return duyarli((dar) => {
      const W = dar ? 340 : 640, X0 = dar ? 34 : 40, X1 = W - (dar ? 22 : 30), L = X1 - X0, k = dar ? 2 : 2.3;
      const TY = 30 + 36 * k + 12, TH = 34, TB = TY + TH, GY0 = TB + 24 * k + 50, GH = 84, H = GY0 + GH + 14;
      el.innerHTML = `<div class="f36-kok"><div class="f36-yan f36-yan-st">
        <div>
          <svg class="f36-svg f36-st-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kapiller boyunca dört Starling kuvveti ve net filtrasyon basıncı">
            <defs>${ok('f36-st-mw', 'var(--warn)', 13)}${ok('f36-st-mb', 'var(--c-basic)', 13)}</defs>
            <rect x="${X0 - 14}" y="22" width="${L + 28}" height="${TB + 24 * k + 26 - 22}" rx="10" style="fill:var(--bg)"/>
            <text class="f36-t f36-h" x="${X0}" y="14">Arteriol ucu</text>
            <text class="f36-t f36-h" x="${X1}" y="14" text-anchor="end">Venül ucu</text>
            <text class="f36-ts f36-h" x="${(X0 + X1) / 2}" y="14" text-anchor="middle">kan akımı →</text>
            <g class="f36-st-su"></g>
            <rect x="${X0}" y="${TY}" width="${L}" height="${TH}" rx="${TH / 2}" class="f36-tup"/>
            <text class="f36-ts f36-h f36-st-int" x="${X1 + 8}" y="${TB + 24 * k + 20}" text-anchor="end">interstisyum</text>
            <g class="f36-st-ok"></g>
            <g class="f36-st-isaret" style="cursor:ew-resize">
              <line class="f36-st-cz" y1="${TY - 4}" y2="${TB + 4}"/>
              <circle class="f36-st-tut" cy="${TY + TH / 2}" r="9"/>
            </g>
            <g class="f36-st-graf"></g>
            <rect class="f36-st-hit" x="${X0 - 14}" y="${TY - 6}" width="${L + 28}" height="${TH + 12}" style="fill:transparent;cursor:ew-resize"/>
          </svg>
          <div class="f36-ctl">
            <label class="f36-rng"><span>Kapillerdeki konum <b data-o="pos"></b></span><input type="range" min="0" max="100" step="1" data-r="pos" aria-label="Kapillerdeki konum"></label>
            <label class="f36-rng"><span>σ (yansıma katsayısı) <b data-o="sg"></b></span><input type="range" min="0" max="1" step="0.1" data-r="sg" aria-label="Yansıma katsayısı sigma"><small>σ = 1: duvar proteinlere geçirgen değil</small></label>
          </div>
        </div>
        <div class="f36-dk" aria-live="off">
          <div class="f36-dk-f"></div><div class="f36-dk-s"></div>
          <div class="f36-rozet"></div>
          <dl class="f36-kv">
            <div class="dis"><dt>Pc (dışa)</dt><dd data-k="pc"></dd></div><div class="dis"><dt>πi (dışa)</dt><dd data-k="pi2"></dd></div>
            <div class="ic"><dt>Pi (içe)</dt><dd>2 mmHg</dd></div><div class="ic"><dt>πc (içe)</dt><dd data-k="pcc"></dd></div>
          </dl>
          <p class="f36-dk-k">Filtrasyon hızı = Kf × net basınç · Kf: duvarın suya geçirgenliği</p>
        </div></div></div>`;
      const kok = el.firstElementChild, svg = kok.querySelector('svg');
      const gOk = svg.querySelector('.f36-st-ok'), gSu = svg.querySelector('.f36-st-su'), gG = svg.querySelector('.f36-st-graf'), isr = svg.querySelector('.f36-st-isaret');
      const rPos = kok.querySelector('[data-r=pos]'), rSg = kok.querySelector('[data-r=sg]');
      const XX = (x) => X0 + x * L;
      // kuvvet okları
      const okC = (x, cls, m) => { const g = mk('g', {}, gOk); const l = mk('line', { class: cls, 'marker-end': `url(#${m})` }, g); const tx = mk('text', { class: 'f36-t f36-h', 'text-anchor': 'middle' }, g); return { g, l, tx, x }; };
      const OK = { pc: okC(-12, 'f36-okw', 'f36-st-mw'), pii: okC(12, 'f36-okw', 'f36-st-mw'), pi: okC(-12, 'f36-okb', 'f36-st-mb'), pcc: okC(12, 'f36-okb', 'f36-st-mb') };
      OK.pc.tx.textContent = 'Pc'; OK.pii.tx.textContent = 'πi'; OK.pi.tx.textContent = 'Pi'; OK.pcc.tx.textContent = 'πc';
      // su damlaları: her istasyonda üstte ve altta bir damla
      const ist = []; for (let x = X0 + 18; x < X1 - 10; x += dar ? 22 : 26) [-1, 1].forEach((s) => ist.push({ x, s, f: Math.random(), c: mk('circle', { r: 2.4, cx: x, style: 'fill:var(--c-basic)' }, gSu) }));
      const ciz = () => {
        const mx = XX(D.pos), pc = Math.round(Pc(D.pos)), n = Math.round(net(D.pos));
        isr.setAttribute('transform', `translate(${mx.toFixed(1)} 0)`);
        const it = svg.querySelector('.f36-st-int'); if (D.pos < 0.5) { it.setAttribute('x', X1 + 8); it.setAttribute('text-anchor', 'end'); } else { it.setAttribute('x', X0 - 8); it.setAttribute('text-anchor', 'start'); }
        const set = (o, y1, y2, ty) => { const L2 = Math.abs(y2 - y1); o.g.style.display = L2 < 1 ? 'none' : ''; o.l.setAttribute('x1', mx + o.x); o.l.setAttribute('x2', mx + o.x); o.l.setAttribute('y1', y1); o.l.setAttribute('y2', y2); o.tx.setAttribute('x', mx + o.x); o.tx.setAttribute('y', ty); };
        const lp = Pc(D.pos) * k, li = 3 * k * D.sg, lb = 2 * k, lc = 24 * k * D.sg;
        set(OK.pc, TY - 2, TY - 2 - lp, TY - 8 - lp); set(OK.pii, TY - 2, TY - 2 - Math.max(li, 0), TY - 8 - Math.max(li, 6));
        set(OK.pi, TB + 2 + lb, TB + 2, TB + 16 + lb); set(OK.pcc, TB + 2 + lc, TB + 2, TB + 16 + lc);
        // grafik
        const n0 = net(0), n1 = net(1), ymax = Math.max(15, Math.ceil((n0 + 2) / 5) * 5), ymin = -15;
        const YY = (v) => GY0 + (ymax - v) / (ymax - ymin) * GH, z = YY(0);
        const xz = (36 - (2 + 21 * D.sg)) / 26;
        const pos = [], neg = [];
        for (let i = 0; i <= 40; i++) { const x = i / 40, v = net(x); pos.push([XX(x), YY(Math.max(v, 0))]); neg.push([XX(x), YY(Math.min(v, 0))]); }
        const poly = (pts) => `M ${XX(0)} ${z} ` + pts.map((p) => `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ` L ${XX(1)} ${z} Z`;
        const dz = xz >= 0 && xz <= 1;
        gG.innerHTML = `<text class="f36-ts" x="${X0 - 14}" y="${GY0 - 10}">net basınç (mmHg)</text>
          <path d="${poly(pos)}" style="fill:var(--warn-soft)"/><path d="${poly(neg)}" style="fill:var(--c-basic-soft)"/>
          <line x1="${X0}" x2="${X1}" y1="${z}" y2="${z}" class="f36-sifir"/>
          <line x1="${XX(0)}" x2="${XX(1)}" y1="${YY(n0)}" y2="${YY(n1)}" class="f36-netc"/>
          <text class="f36-ts" x="${X0 - 6}" y="${YY(n0) + 4}" text-anchor="end">${isaret(Math.round(n0))}</text>
          <text class="f36-ts f36-h" x="${XX(1) - 4}" y="${YY(n1) + (n1 < 0 ? 15 : -6)}" text-anchor="end">${isaret(Math.round(n1))}</text>
          <text class="f36-ts" x="${X0 - 6}" y="${z + 4}" text-anchor="end">0</text>
          ${dz ? `<line x1="${XX(xz)}" x2="${XX(xz)}" y1="${z - 5}" y2="${z + 5}" class="f36-netc"/><text class="f36-ts f36-h" x="${XX(xz)}" y="${z + 18}" text-anchor="middle">denge</text>` : ''}
          <circle cx="${mx}" cy="${YY(net(D.pos))}" r="5.5" class="f36-st-nok"/>`;
        // kutu
        const sgT = D.sg < 1 ? ondalik(D.sg) + ' × ' : '';
        kok.querySelector('.f36-dk-f').innerHTML = `Net = (Pc − Pi) − ${D.sg < 1 ? '<b>σ</b>' : ''}(πc − πi)`;
        kok.querySelector('.f36-dk-s').textContent = `= (${pc} − 2) − ${sgT}(24 − 3) = ${isaret(n)} mmHg`;
        const rz = kok.querySelector('.f36-rozet');
        rz.textContent = n > 0 ? `${isaret(n)} mmHg · filtrasyon` : n < 0 ? `${isaret(n)} mmHg · geri emilim` : '0 mmHg · denge';
        rz.className = 'f36-rozet ' + (n > 0 ? 'dis' : n < 0 ? 'ic' : 'den');
        kok.querySelector('[data-k=pc]').textContent = pc + ' mmHg';
        kok.querySelector('[data-k=pi2]').textContent = '3 mmHg';
        kok.querySelector('[data-k=pcc]').textContent = '24 mmHg';
        kok.querySelector('[data-o=pos]').textContent = D.pos < 0.05 ? 'arteriol ucu' : D.pos > 0.95 ? 'venül ucu' : '%' + Math.round(D.pos * 100);
        kok.querySelector('[data-o=sg]').textContent = ondalik(D.sg);
        rPos.value = Math.round(D.pos * 100); rSg.value = D.sg;
        const x = D.pos;
        let c = x < 0.15 ? '<b>Arteriol ucu.</b> Pc 36 mmHg: (36 − 2) − (24 − 3) = 13 mmHg dışa doğru, filtrasyon. Konumu venül ucuna kaydırın. [[K1 s. 159]]'
          : x < 0.42 ? '<b>Filtrasyon azalıyor.</b> Pc düştükçe dışa itiş zayıflar; πc, Pi ve πi değişmez. [[K1 s. 159]]'
            : x <= 0.58 ? '<b>Denge noktası.</b> Pc ≈ 23 mmHg olduğunda dışa ve içe kuvvetler eşitlenir; burada akım yön değiştirir. [[K1 s. 159–160]]'
              : x <= 0.85 ? '<b>Geri emilim başlıyor.</b> Pc artık plazma onkotik basıncının etkisini karşılayamıyor; sıvı kapillere döner. [[K1 s. 160]]'
                : '<b>Venül ucu.</b> Pc 10 mmHg: (10 − 2) − (24 − 3) = −13 mmHg, geri emilim. Fark tam eşleşmez: günde ≈ 4 L net filtrat lenfle duktus torasikustan döner. [[K1 s. 160–161]]';
        if (D.sg < 1) c += ' σ düşünce proteinler duvarı geçer, onkotik fark etkisini yitirir ve net filtrasyon artar (glomerül hastalığında proteinüri). [[K1 s. 159, 161]]';
        if (D.el || D.intro !== 0) capYaz(el, c);
      };
      const su = (dt) => {
        ist.forEach((p) => {
          const v = net((p.x - X0) / L), hz = Math.abs(v) / 13;
          p.f = (p.f + dt * (0.25 + hz * 0.9)) % 1;
          const f = v >= 0 ? p.f : 1 - p.f;
          const y = p.s < 0 ? lerp(TY + 6, TY - 16, f) : lerp(TB - 6, TB + 16, f);
          p.c.setAttribute('cy', y.toFixed(1)); p.c.style.opacity = (clamp(hz, 0.08, 1) * Math.sin(Math.PI * p.f)).toFixed(2);
        });
      };
      const kullanici = () => { D.el = true; D.intro = -1; };
      rPos.addEventListener('input', () => { kullanici(); D.pos = rPos.value / 100; ciz(); });
      rSg.addEventListener('input', () => { kullanici(); D.sg = +rSg.value; ciz(); });
      let surukle = false;
      const pX = (e) => { const r = svg.getBoundingClientRect(); return clamp(((e.clientX - r.left) / r.width * W - X0) / L, 0, 1); };
      const dn = (e) => { surukle = true; kullanici(); D.pos = pX(e); ciz(); svg.setPointerCapture && svg.setPointerCapture(e.pointerId); };
      const mv = (e) => { if (surukle) { D.pos = pX(e); ciz(); } };
      const up = () => { surukle = false; };
      [isr, svg.querySelector('.f36-st-hit')].forEach((h) => h.addEventListener('pointerdown', dn));
      svg.addEventListener('pointermove', mv); svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
      ciz();
      if (RM) { ist.forEach((p) => { p.f = 0.5; }); su(0); return () => {}; }
      return ticker(kok, (dt) => {
        if (D.intro >= 0) {
          D.intro += dt;
          const t = D.intro;
          D.pos = t < 6 ? ease(t / 6) : t < 7.4 ? 1 - ease((t - 6) / 1.4) : 0;
          if (t >= 7.4) { D.intro = -1; D.pos = 0; }
          ciz();
        }
        su(dt);
      });
    });
  };

  /* ================= 4 · Klinikte Starling: Pc–πc grafiği ================= */
  const KL = [
    { ad: 'Normal', a: 36, b: 10, p: 24, rz: ['den', 'Alanlar yaklaşık dengede'], ton: 'normal',
      cap: '<b>Normal.</b> Pc 36\'dan 10 mmHg\'ye iner, πc 24 mmHg\'de düz kalır. Pc\'nin πc üstünde kaldığı alan 1 filtrasyon, altında kaldığı alan 2 geri emilimdir. Bir durum seçin. [[K1 s. 160]]' },
    { ad: 'Böbrek', a: 45, b: 40, p: 24, rz: ['dis', 'Net filtrasyon ↑'], bobrek: 1,
      cap: '<b>Böbrek.</b> Afferent ve efferent arteriol düzeni glomerül kapillerinde Pc\'yi yüksek tutar; net filtrasyon artar ve günde 180 L plazma süzülür. Glomerül hastalığında σ düşerse albümin filtrata geçer: proteinüri. [[K1 s. 161]]' },
    { ad: 'Hipoalbüminemi', a: 36, b: 10, p: 16, rz: ['dis', 'Net filtrasyon ↑'],
      cap: '<b>Hipoalbüminemi (kritik hastalık).</b> πc düşer, çizgi aşağı iner: alan 1 büyür, alan 2 küçülür. Net filtrasyon periferik ödem olarak görülür. [[K1 s. 161]]' },
    { ad: 'Kalp yetersizliği (KKY)', a: 40, b: 22, p: 24, rz: ['dis', 'Net filtrasyon ↑'],
      cap: '<b>Konjestif kalp yetersizliği.</b> Venöz basınç yükselir, Pc eğrisinin venöz ucu yukarı kalkar; net filtrasyon artar, periferik ödem gelişir. [[K1 s. 161]]' },
    { ad: 'Akciğer', a: 9, b: 7, p: 24, rz: ['ic', 'Net geri emilim ↑'], akc: 1,
      cap: '<b>Akciğer.</b> Düşük basınçlı pulmoner dolaşımda ortalama Pc yalnız 8 mmHg, πc yine ≈ 24 mmHg: net geri emilim alveolleri kuru tutar. [[K1 s. 161]]' },
    { ad: 'Sol ventrikül yetersizliği', a: 30, b: 26, p: 24, rz: ['dis', 'Net filtrasyon: pulmoner ödem'],
      cap: '<b>Sol ventrikül yetersizliği.</b> Pulmoner ven basıncı, dolayısıyla pulmoner Pc yükselir; yeterince artarsa sıvı alveole süzülür: pulmoner ödem. [[K1 s. 161]]' },
    { ad: 'Kanama', a: 26, b: 4, p: 24, rz: ['ic', 'Net geri emilim ↑: ototransfüzyon'], ton: 'dar', kanama: 1,
      cap: '<b>Kanama.</b> Sempatik çıkış artar, arteriol vazokonstriksiyonu SVR\'yi artırıp ortalama arter basıncını korurken aşağıdaki kapillerlerde Pc\'yi düşürür. Geri emilim artar: 30 dakikada ≈ 500 mL interstisyel sıvı damar içine geçer (ototransfüzyon). [[K1 s. 161]]' },
  ];
  const alanlar = (a, b, p) => { let s1 = 0, s2 = 0; for (let i = 0; i < 100; i++) { const x = (i + 0.5) / 100, v = lerp(a, b, x) - p; if (v > 0) s1 += v / 100; else s2 -= v / 100; } return [s1, s2]; };
  VIZ.f36_klinik = (el) => {
    let dur = 0; const cur = { a: 36, b: 10, p: 24 };
    return duyarli((dar) => {
      const W = dar ? 340 : 600, H = dar ? 262 : 270, ML = dar ? 40 : 50, MR = 14, MT = 14, MB = 54;
      const x0 = ML, x1 = W - MR, y0 = MT, y1 = H - MB;
      const X = (f) => x0 + f * (x1 - x0), Y = (v) => y1 - (v / 50) * (y1 - y0);
      el.innerHTML = `<div class="f36-kok">
        ${segHtml('Klinik durum', 'kl', KL.map((d, i) => [i, d.ad]), dur, 'f36-seg')}
        <svg class="f36-svg f36-kl-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kapiller boyunca Pc eğrisi ve plazma onkotik basıncı çizgisi; aradaki alanlar filtrasyon ve geri emilimi gösterir">
          <g class="f36-kl-eks">${[0, 10, 20, 30, 40, 50].map((v) => `<line x1="${x0}" x2="${x1}" y1="${Y(v)}" y2="${Y(v)}" class="f36-izgara"/><text class="f36-ts" x="${x0 - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join('')}
            <line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="f36-eksen"/><line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="f36-eksen"/>
            <text class="f36-ts" transform="translate(${dar ? 10 : 14} ${(y0 + y1) / 2}) rotate(-90)" text-anchor="middle">Basınç (mmHg)</text>
            <text class="f36-ts f36-kl-x0" x="${x0}" y="${y1 + 17}"></text><text class="f36-ts" x="${X(0.5)}" y="${y1 + 17}" text-anchor="middle">Orta</text><text class="f36-ts f36-kl-x1" x="${x1}" y="${y1 + 17}" text-anchor="end"></text>
            <text class="f36-ts" x="${X(0.5)}" y="${y1 + 38}" text-anchor="middle">Kapillerdeki konum</text></g>
          <path class="f36-kl-a1" style="fill:var(--warn-soft)"/><path class="f36-kl-a2" style="fill:var(--c-basic-soft)"/>
          <line class="f36-kl-hayalet" x1="${X(0)}" x2="${X(1)}" y1="${Y(36)}" y2="${Y(10)}"/>
          <line class="f36-kl-pic" x1="${x0}" x2="${x1}"/>
          <line class="f36-kl-pc" x1="${X(0)}" x2="${X(1)}"/>
          <text class="f36-alan f36-h f36-kl-n1" text-anchor="middle">1</text><text class="f36-alan f36-h f36-kl-n2" text-anchor="middle">2</text>
          <g class="f36-kl-et"></g>
        </svg>
        <div class="f36-kl-alt">
          <div class="f36-bars">
            <div class="f36-bar dis"><span>Alan 1 · net filtrasyon</span><i><b></b></i></div>
            <div class="f36-bar ic"><span>Alan 2 · net geri emilim</span><i><b></b></i></div>
          </div>
          <div class="f36-rozet"></div>
          <div class="f36-ton" hidden><svg viewBox="-24 -24 48 48" aria-hidden="true"><circle class="f36-ton-d" r="16"/></svg><span></span></div>
          <div class="f36-kan" hidden><span>Damar içine geçen interstisyel sıvı</span><i><b></b></i><em>0 → 500 mL · 30 dk</em></div>
        </div></div>`;
      const kok = el.firstElementChild, svg = kok.querySelector('svg');
      const q = (s) => svg.querySelector(s);
      let raf = 0, kanT = null;
      const ciz = () => {
        const d = KL[dur], { a, b, p } = cur;
        let p1 = '', p2 = '';
        const N = 60; const up = [], dn = [];
        for (let i = 0; i <= N; i++) { const f = i / N, v = lerp(a, b, f); up.push([X(f), Y(Math.max(v, p))]); dn.push([X(f), Y(Math.min(v, p))]); }
        p1 = 'M ' + up.map((q2) => q2[0].toFixed(1) + ' ' + q2[1].toFixed(1)).join(' L ') + ` L ${X(1)} ${Y(p)} L ${X(0)} ${Y(p)} Z`;
        p2 = 'M ' + dn.map((q2) => q2[0].toFixed(1) + ' ' + q2[1].toFixed(1)).join(' L ') + ` L ${X(1)} ${Y(p)} L ${X(0)} ${Y(p)} Z`;
        q('.f36-kl-a1').setAttribute('d', p1); q('.f36-kl-a2').setAttribute('d', p2);
        q('.f36-kl-pic').setAttribute('y1', Y(p)); q('.f36-kl-pic').setAttribute('y2', Y(p));
        q('.f36-kl-pc').setAttribute('y1', Y(a)); q('.f36-kl-pc').setAttribute('y2', Y(b));
        q('.f36-kl-hayalet').style.display = dur === 0 ? 'none' : '';
        // alan numaraları: ağırlık merkezi
        const [s1, s2] = alanlar(a, b, p);
        const merkez = (isa) => { let sx = 0, sy = 0, sw = 0; for (let i = 0; i < 100; i++) { const f = (i + 0.5) / 100, v = lerp(a, b, f), h = isa ? v - p : p - v; if (h > 0) { sx += f * h; sy += (v + p) / 2 * h; sw += h; } } return sw ? [sx / sw, sy / sw] : null; };
        [[1, s1, '.f36-kl-n1'], [2, s2, '.f36-kl-n2']].forEach(([n, s, sel]) => { const m = merkez(n === 1), t = q(sel); if (!m || s < 0.8) { t.style.display = 'none'; return; } t.style.display = ''; t.setAttribute('x', X(m[0]).toFixed(1)); t.setAttribute('y', (Y(m[1]) + 6).toFixed(1)); });
        // etiketler
        const et = q('.f36-kl-et');
        const yaz = (x, y, s, cls, anc) => `<text class="${cls} f36-h" x="${x}" y="${y}" text-anchor="${anc}">${s}</text>`;
        let h = '';
        const pcYukari = a > p;
        h += yaz(X(0) + 6, Y(a) + (pcYukari || a > p - 6 ? -8 : 16), dur === 0 ? 'Pc 36' : 'Pc', 'f36-t f36-kirmizi', 'start');
        if (dur === 0) h += yaz(X(1) - 4, Y(b) + 16, '10', 'f36-t f36-kirmizi', 'end');
        h += yaz(X(1) - 4, Y(p) - 7, dur === 0 ? 'πc 24' : d.akc ? 'πc ≈ 24' : 'πc', 'f36-t f36-mavi', 'end');
        if (d.akc) h += yaz(X(0.5), Y(8) + 18, 'ortalama Pc 8', 'f36-t f36-kirmizi', 'middle');
        et.innerHTML = h;
        q('.f36-kl-x0').textContent = d.bobrek ? (dar ? 'Afferent a. ucu' : 'Afferent arteriol ucu') : 'Arteriol ucu';
        q('.f36-kl-x1').textContent = d.bobrek ? (dar ? 'Efferent a. ucu' : 'Efferent arteriol ucu') : 'Venül ucu';
        const bars = kok.querySelectorAll('.f36-bar b');
        bars[0].style.width = clamp(s1 / 18.5 * 100, 0, 100) + '%'; bars[1].style.width = clamp(s2 / 18.5 * 100, 0, 100) + '%';
      };
      const durum = () => {
        const d = KL[dur], rz = kok.querySelector('.f36-rozet');
        rz.textContent = d.rz[1]; rz.className = 'f36-rozet ' + d.rz[0];
        const ton = kok.querySelector('.f36-ton');
        ton.hidden = !d.ton;
        if (d.ton) { ton.classList.toggle('dar', d.ton === 'dar'); ton.querySelector('span').textContent = d.ton === 'dar' ? 'arteriol: daralmış (sempatik)' : 'arteriol: normal tonus'; }
        const kn = kok.querySelector('.f36-kan'); kn.hidden = !d.kanama;
        if (kanT) { cancelAnimationFrame(kanT); kanT = null; }
        if (d.kanama) {
          const b = kn.querySelector('b'), em = kn.querySelector('em');
          if (RM) { b.style.width = '100%'; em.textContent = '500 mL · 30 dk'; } else {
            const t0 = performance.now();
            const f = (t) => { const u = clamp((t - t0) / 1500, 0, 1); b.style.width = u * 100 + '%'; em.textContent = Math.round(u * 500) + ' mL · ' + Math.round(u * 30) + ' dk'; if (u < 1) kanT = requestAnimationFrame(f); };
            kanT = requestAnimationFrame(f);
          }
        }
      };
      const git = (i) => {
        dur = i; bas(kok, 'kl', i); capYaz(el, KL[i].cap); durum();
        const from = { ...cur }, to = KL[i];
        cancelAnimationFrame(raf);
        if (RM) { cur.a = to.a; cur.b = to.b; cur.p = to.p; ciz(); return; }
        const t0 = performance.now();
        const f = (t) => { const u = ease(clamp((t - t0) / 600, 0, 1)); cur.a = lerp(from.a, to.a, u); cur.b = lerp(from.b, to.b, u); cur.p = lerp(from.p, to.p, u); ciz(); if (u < 1) raf = requestAnimationFrame(f); };
        raf = requestAnimationFrame(f);
      };
      kok.addEventListener('click', (e) => { const b = e.target.closest('[data-kl]'); if (b) git(+b.dataset.kl); });
      ciz(); durum();
      return () => { cancelAnimationFrame(raf); if (kanT) cancelAnimationFrame(kanT); };
    });
  };

  /* ================= 5 · Prekapiller sfinkterler ================= */
  VIZ.f36_sfinkter = (el) => {
    const SIRA = [0, 5, 2, 7, 1, 4, 6, 3];
    let s = 0, elle = {};
    return duyarli((dar) => {
      const W = dar ? 340 : 600, H = dar ? 280 : 290, yc = H / 2;
      const xa = dar ? 34 : 64, xv = W - xa, A = xa + (dar ? 6 : 14), B = xv - (dar ? 6 : 14), S = (B - A) / 4.5, hmax = yc - 30;
      el.innerHTML = `<div class="f36-kok">
        <svg class="f36-svg f36-sf-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mikrodolaşım ağı: arteriol, metarteriol, prekapiller sfinkterli sekiz kapiller ve venül">
          <defs><linearGradient id="f36-sf-gk" x1="0" x2="1" y1="0" y2="0"><stop offset="0.1" style="stop-color:var(--crit)"/><stop offset="0.9" style="stop-color:var(--c-basic)"/></linearGradient>
            <linearGradient id="f36-sf-gm" gradientUnits="userSpaceOnUse" x1="${xa}" x2="${xv}" y1="0" y2="0"><stop offset="0" style="stop-color:var(--crit)"/><stop offset="1" style="stop-color:var(--c-basic)"/></linearGradient></defs>
          <g class="f36-sf-doku"></g><g class="f36-sf-kap"></g><g class="f36-sf-o2"></g>
          <line x1="0" x2="${xa + 2}" y1="${yc}" y2="${yc}" class="f36-sf-art"/>
          <line x1="${xa}" x2="${xv}" y1="${yc}" y2="${yc}" class="f36-sf-met"/>
          <line x1="${xv - 2}" x2="${W}" y1="${yc}" y2="${yc}" class="f36-sf-ven"/>
          <g class="f36-sf-akan"></g><g class="f36-sf-sf"></g><g class="f36-sf-et"></g>
        </svg>
        <div class="f36-sf-alt">
          <div class="f36-ctl">
            <label class="f36-rng"><span>Doku etkinliği <b data-o="s"></b></span><input type="range" min="0" max="100" step="1" value="${Math.round(s * 100)}" data-r="s" aria-label="Doku etkinliği"><small class="f36-uc"><em>İstirahat</em><em>Egzersiz yapan kas</em></small></label>
            <p class="f36-sayac">Açık kapiller: <b></b></p>
            <ul class="f36-uyaran"><li>Sinirsel uyarı</li><li>O₂ basıncı ↓</li><li>H⁺, CO₂ ↑</li></ul>
          </div>
          <figure class="f36-yakin">
            <svg viewBox="0 0 170 84" aria-hidden="true">
              <rect x="0" y="34" width="44" height="16" style="fill:var(--crit-soft);stroke:var(--crit);stroke-width:1.2"/>
              <path d="M44 36 L170 39 M44 48 L170 45" style="stroke:var(--crit);stroke-width:1.2;fill:none"/>
              <path d="M44 36 L170 39 L170 45 L44 48 Z" style="fill:var(--crit-soft)"/>
              <ellipse cx="74" cy="42" rx="9" ry="22" style="fill:none;stroke:var(--accent);stroke-width:6;stroke-dasharray:34 4"/>
              <ellipse cx="74" cy="20" rx="2.6" ry="1.8" style="fill:var(--ink)"/><ellipse cx="74" cy="64" rx="2.6" ry="1.8" style="fill:var(--ink)"/>
              <text class="f36-ts" x="2" y="80">metarteriol</text><text class="f36-ts" x="168" y="80" text-anchor="end">kapiller</text>
            </svg>
            <figcaption><b>Prekapiller sfinkter (yakın plan)</b> 1–2 düz kas hücresi · kapillerin arteriol ucunda manşon</figcaption>
          </figure>
        </div></div>`;
      const kok = el.firstElementChild, svg = kok.querySelector('svg');
      const gK = svg.querySelector('.f36-sf-kap'), gS = svg.querySelector('.f36-sf-sf'), gA = svg.querySelector('.f36-sf-akan'), gO = svg.querySelector('.f36-sf-o2'), gE = svg.querySelector('.f36-sf-et'), gD = svg.querySelector('.f36-sf-doku');
      const rnd = rndGen(3);
      // doku hücreleri
      for (let x = 16; x < W; x += dar ? 34 : 40) for (let y = 16; y < H; y += 36) mk('circle', { cx: x + (rnd() - 0.5) * 10 + ((y / 36) % 2) * 16, cy: y + (rnd() - 0.5) * 8, r: 8 + rnd() * 4, class: 'f36-doku' }, gD);
      const bez = (p0, p1, p2, p3, t) => { const m = 1 - t; return [m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0], m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1]]; };
      const kap = [];
      for (let j = 0; j < 8; j++) {
        const i = j % 4, sgn = j < 4 ? -1 : 1, p = A + (i + (j < 4 ? 0 : 0.5)) * S + S * 0.05, qq = p + S * 0.9, h = hmax * [0.92, 0.78, 1, 0.84][(i + (j < 4 ? 0 : 2)) % 4];
        const P0 = [p, yc], P1 = [p - S * 0.35, yc + sgn * 1.33 * h], P2 = [qq + S * 0.35, yc + sgn * 1.33 * h], P3 = [qq, yc];
        const path = mk('path', { d: `M ${p} ${yc} C ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${qq} ${yc}`, class: 'f36-sf-k', style: 'stroke:url(#f36-sf-gk)' }, gK);
        const sp = bez(P0, P1, P2, P3, 0.07), tp = bez(P0, P1, P2, P3, 0.5);
        const g = mk('g', { class: 'f36-sf-hal', tabindex: 0, role: 'button', 'data-i': j, 'aria-label': `Sfinkter ${j + 1}: aç ya da kapat` }, gS);
        mk('circle', { cx: sp[0], cy: sp[1], r: 13, style: 'fill:transparent' }, g);
        const ring = mk('circle', { cx: sp[0], cy: sp[1], r: 5.5, class: 'f36-sf-r' }, g);
        const dots = [0, 1, 2].map(() => mk('circle', { r: 2.4, style: 'fill:var(--crit)' }, gA));
        const o2 = [0, 1].map(() => mk('circle', { r: 2.2, style: 'fill:var(--ok)' }, gO));
        kap.push({ path, ring, dots, o2, tp, sgn, L: 0, ac: false, f: rnd() });
      }
      kap.forEach((k) => { k.L = k.path.getTotalLength ? k.path.getTotalLength() : 300; });
      const ana = Array.from({ length: 16 }, () => ({ c: mk('circle', { r: 2.6, style: 'fill:var(--crit)' }, gA), f: rnd() }));
      // etiketler
      const t = (x, y, s2, cls, anc) => { const e = mk('text', { x, y, class: 'f36-h ' + (cls || 'f36-t'), 'text-anchor': anc || 'start' }, gE); e.textContent = s2; return e; };
      t(4, yc - 12, 'Arteriol', 'f36-t f36-kirmizi'); t(W - 4, yc - 12, 'Venül', 'f36-t f36-mavi', 'end');
      t(W / 2, yc + 17, 'Metarteriol', 'f36-ts', 'middle');
      t(W - 4, 16, 'kapiller ağı', 'f36-ts', 'end');
      const sp0 = kap[0].ring, sx0 = +sp0.getAttribute('cx'), sy0 = +sp0.getAttribute('cy');
      t(4, 16, 'prekapiller sfinkter', 'f36-ts f36-vurgu', 'start');
      mk('line', { x1: 30, y1: 21, x2: sx0 - 4, y2: sy0 - 6, class: 'f36-kilavuz' }, gE);
      const rS = kok.querySelector('[data-r=s]');
      const durum = () => {
        const n = Math.round(2 + 5 * s), acikSet = new Set(SIRA.slice(0, n));
        kap.forEach((k, j) => { k.ac = j in elle ? elle[j] : acikSet.has(j); k.path.classList.toggle('kapali', !k.ac); k.ring.classList.toggle('kapali', !k.ac); k.dots.forEach((c) => { c.style.opacity = k.ac ? 1 : 0; }); });
        const acik = kap.filter((k) => k.ac).length;
        kok.querySelector('.f36-sayac b').textContent = acik + '/8';
        kok.querySelector('[data-o=s]').textContent = s < 0.05 ? 'istirahat' : s > 0.95 ? 'egzersiz' : '%' + Math.round(s * 100);
        kok.querySelectorAll('.f36-uyaran li').forEach((li) => { li.style.opacity = (0.35 + 0.65 * s).toFixed(2); });
        kok.querySelector('.f36-uyaran').classList.toggle('etkin', s > 0.2);
        return acik;
      };
      const adim = (dt) => {
        const acik = kap.filter((k) => k.ac).length;
        kap.forEach((k) => {
          k.f = (k.f + dt * 0.35) % 1;
          if (k.ac) k.dots.forEach((c, i) => { const p = k.path.getPointAtLength(((k.f + i / 3) % 1) * k.L); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); });
          k.o2.forEach((c, i) => { const u = (k.f * 2 + i * 0.5) % 1; c.setAttribute('cx', (k.tp[0] + (i ? 10 : -10)).toFixed(1)); c.setAttribute('cy', (k.tp[1] + k.sgn * 18 * u).toFixed(1)); c.style.opacity = k.ac ? (1 - u).toFixed(2) : 0; });
        });
        const nAna = 4 + 1.5 * (8 - acik);
        ana.forEach((a, i) => { a.f = (a.f + dt * (0.12 + 0.02 * (8 - acik))) % 1; a.c.setAttribute('cx', (a.f * W).toFixed(1)); a.c.setAttribute('cy', yc); a.c.style.opacity = i < nAna ? 1 : 0; });
      };
      const sfCap = () => capYaz(el, s < 0.2 ? '<b>İstirahat.</b> Sfinkterlerin çoğu kapalı; kan açık kapillerlerden ve metarteriolden venüle geçer. Dokunun etkinliğini artırın. [[K1 s. 161]]'
        : s <= 0.7 ? '<b>Etkinlik artıyor.</b> Sfinkter tonusu arteriollerdeki gibi sinirsel ve yerel metabolik etkenlerle değişir; açılan her sfinkter yeni bir kapiller ağa kan verir. [[K1 s. 161]]'
          : '<b>Egzersiz yapan kas.</b> Sinirsel uyarı, düşük O₂ basıncı ve yüksek H⁺ ile CO₂ sfinkterlerin büyük kısmını açar; kapillerlerden geçen kan dokuya yeniden O₂ ve substrat getirir. [[K1 s. 161]]');
      rS.addEventListener('input', () => { s = rS.value / 100; elle = {}; durum(); sfCap(); if (RM) adim(0); });
      const tikla = (g) => {
        const j = +g.dataset.i, ac = !kap[j].ac; elle[j] = ac; durum(); if (RM) adim(0);
        capYaz(el, ac ? '<b>Sfinkter gevşedi.</b> Kan ağa girer, dokuya O₂ ve besin taşır. [[K1 s. 161]]' : '<b>Sfinkter kasıldı.</b> Kan bu ağa giremez; başka kapillerlere ya da metarteriolle venüle yönelir. [[K1 s. 161]]');
      };
      gS.addEventListener('click', (e) => { const g = e.target.closest('.f36-sf-hal'); if (g) tikla(g); });
      gS.addEventListener('keydown', (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const g = e.target.closest('.f36-sf-hal'); if (g) { e.preventDefault(); tikla(g); } });
      durum();
      if (RM) { kap.forEach((k) => { k.f = 0.15; }); ana.forEach((a, i) => { a.f = i / 16; }); adim(0); return () => {}; }
      return ticker(kok, adim);
    });
  };

  /* ================= 6 · Endotelin üç işi ================= */
  const EN_CAP = {
    vazo: '<b>Vazoaktif maddeler.</b> NO ve PGI₂ düz kası gevşetir, endotelin kasar. Bir işlev seçin; hemostazda "sağlam" ile "hasarlı" arasında geçiş yapın. [[K1 s. 162]]',
    saglam: '<b>Sağlam endotel: antikoagülan.</b> Trombomodulin trombini bağlar, kompleks protein C\'yi etkinleştirir; heparan sülfat antitrombin III\'ü etkinleştirir, o da trombin ve faktör Xa\'yı inaktive eder; NO ve PGI₂ trombosit agregasyonunu baskılar (Bölüm 72). [[K1 s. 162]]',
    hasarli: '<b>Hasarlı endotel: prokoagülan.</b> Endotelin yaptığı vWF plazmada faktör VIII\'e bağlı dolaşır; damar zedelenince açığa çıkan kollajeni trombositlere bağlayan adezyon molekülü olur ve trombositleri etkinleştirir. [[K1 s. 162]]',
    inf: '<b>İnflamasyon.</b> İnterlökin 1 ve TNF endotelde adezyon molekülü ekspresyonunu uyarır; nötrofil ve lenfositler yüzeyde yuvarlanır, sonra endotel katından geçerek dokuya göç eder (Bölüm 75). [[K1 s. 162]]',
  };
  VIZ.f36_endotel = (el) => {
    let sek = 'vazo', hem = 'saglam';
    return duyarli((dar) => {
      const W = dar ? 340 : 600, LB = dar ? 168 : 132, CH = 38, BMY = LB + CH, H = dar ? 336 : 300, SMY = H - 40;
      el.innerHTML = `<div class="f36-kok">
        <div class="f36-ust">${segHtml('Endotel işlevi', 'sk', [['vazo', 'Vazoaktif maddeler'], ['hem', 'Hemostaz'], ['inf', 'İnflamasyon']], sek, 'f36-seg')}
        <span class="f36-alt-seg"${sek === 'hem' ? '' : ' hidden'}>${segHtml('Endotel durumu', 'hm', [['saglam', 'Sağlam endotel'], ['hasarli', 'Hasarlı endotel']], hem, 'f36-seg')}</span></div>
        <svg class="f36-svg f36-en-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Endotel hücresi şeması: lümen, endotel, bazal membran ve düz kas">
          <defs>${ok('f36-en-ok', 'var(--ink)')}${ok('f36-en-okc', 'var(--c-clin)')}</defs>
          <rect x="0" y="0" width="${W}" height="${LB + 2}" style="fill:var(--crit-soft)"/>
          <rect x="0" y="${LB + 2}" width="${W}" height="${H - LB - 2}" style="fill:var(--bg)"/>
          <g class="f36-en-taban"></g><g class="f36-en-sahne"></g>
        </svg>
        <ul class="f36-no"${sek === 'vazo' ? '' : ' hidden'}>
          <li><b>İnhale NO</b> pulmoner arteriol dilatasyonu, PVR ↓ (yenidoğan ve erişkin pulmoner hipertansiyon, ARDS)</li>
          <li><b>Vene vurmak</b> yerel NO salınımı → venodilatasyon, kanülasyon kolaylaşır</li>
          <li><b>GTN (NO verici)</b> kapasitans venleri genişler → venöz dönüş ve ön yük ↓ → miyokard O₂ gereksinimi ↓ → angina geçer</li>
        </ul>
        <p class="f36-not">Erişkinde endotel ≈ 1 kg · yarı geçirgen zar</p></div>`;
      const kok = el.firstElementChild, svg = kok.querySelector('svg'), gT = svg.querySelector('.f36-en-taban'), G = svg.querySelector('.f36-en-sahne');
      const t = (p, x, y, s2, cls, anc) => { const e = mk('text', { x, y, class: 'f36-h ' + (cls || 'f36-t'), 'text-anchor': anc || 'start' }, p); e.textContent = s2; return e; };
      let ref = {}, tt = 0;
      const anahtar = () => (sek === 'hem' ? hem : sek);
      function taban() {
        gT.innerHTML = '';
        const gap = anahtar() === 'hasarli' ? 40 : 4, m = W / 2;
        [[6, m - gap / 2], [m + gap / 2, W - 6]].forEach(([a, b]) => mk('rect', { x: a, y: LB, width: b - a, height: CH, rx: 10, class: 'f36-hucre' }, gT));
        // bazal membran + kollajen
        mk('rect', { x: 0, y: BMY + 1, width: W, height: 10, class: 'f36-bmb' }, gT);
        for (let x = 4; x < W; x += 14) mk('path', { d: `M ${x} ${BMY + 3} q 4 4 8 0 t 8 0`, class: 'f36-kol' + (anahtar() === 'hasarli' && Math.abs(x - m) < gap / 2 + 8 ? ' acik' : '') }, gT);
        // düz kas
        ref.sm = [W * 0.27, W * 0.73].map((cx) => mk('ellipse', { cx, cy: SMY, rx: W * 0.19, ry: 11, class: 'f36-dk-h' }, gT));
        t(gT, W - 6, BMY + 26, 'bazal membran', 'f36-ts', 'end');
        t(gT, 6, H - 8, 'düz kas hücresi', 'f36-ts');
      }
      function sahne() {
        G.innerHTML = ''; ref = { sm: ref.sm }; tt = 0;
        const k = anahtar(), m = W / 2, CY = LB + CH / 2;
        if (k !== 'vazo') { mk('ellipse', { cx: m - 34, cy: CY, rx: 14, ry: 8, class: 'f36-cekirdek' }, G); mk('ellipse', { cx: W - 34, cy: CY, rx: 14, ry: 8, class: 'f36-cekirdek' }, G); }
        if (k === 'vazo') {
          t(G, m, 20, 'yerel metabolik ve mekanik uyaranlar', 'f36-ts', 'middle');
          [W * 0.25, W * 0.75].forEach((x) => mk('line', { x1: x, x2: x, y1: 30, y2: LB - 6, class: 'f36-ince', 'marker-end': 'url(#f36-en-ok)' }, G));
          const lx = W * 0.27;
          t(G, lx, LB + 14, 'NOS', 'f36-ts', 'middle');
          t(G, lx, LB + 30, dar ? 'L-arginin → NO' : 'L-arginin  →  NO', 'f36-t', 'middle');
          t(G, W * 0.73, LB + 24, 'endotelin (ET)', 'f36-t', 'middle');
          ref.mol = [];
          for (let i = 0; i < 6; i++) ref.mol.push({ c: mk('circle', { r: 3.2, style: `fill:${i % 2 ? 'var(--ok)' : 'var(--c-clin)'}` }, G), x: W * 0.27 + (i - 2.5) * 12, sol: 1, f: i / 6 });
          for (let i = 0; i < 4; i++) ref.mol.push({ c: mk('circle', { r: 3.2, style: 'fill:var(--crit)' }, G), x: W * 0.73 + (i - 1.5) * 14, sol: 0, f: i / 4 });
          t(G, W * 0.27 + (dar ? 40 : 52), BMY + 40, 'NO, PGI₂', 'f36-t f36-klin', 'start');
          t(G, W * 0.73 + (dar ? 32 : 40), BMY + 40, 'ET', 'f36-t f36-kirmizi', 'start');
          ref.e1 = t(G, W * 0.27, SMY - 18, 'vazodilatasyon', 'f36-t f36-klin', 'middle');
          ref.e2 = t(G, W * 0.73, SMY - 18, dar ? 'güçlü konstriksiyon' : 'güçlü vazokonstriksiyon', 'f36-t f36-kirmizi', 'middle');
        } else if (k === 'saglam') {
          const tmx = W * 0.17, hsx = W * 0.64;
          t(G, m, 16, 'NO, PGI₂ → trombosit agregasyonu ✕', 'f36-ts f36-klin', 'middle');
          ref.trm = [0, 1, 2].map(() => mk('ellipse', { rx: 7, ry: 2.8, class: 'f36-trm' }, G));
          // trombomodulin
          mk('path', { d: `M ${tmx} ${LB} L ${tmx} ${LB - 14} M ${tmx - 8} ${LB - 22} Q ${tmx} ${LB - 10} ${tmx + 8} ${LB - 22}`, class: 'f36-res' }, G);
          t(G, dar ? 12 : tmx + 20, LB + 24, 'trombomodulin', 'f36-ts', 'start');
          ref.th = mk('g', {}, G); mk('circle', { r: 8, class: 'f36-trb' }, ref.th); t(ref.th, 0, 4, 'IIa', 'f36-mini', 'middle');
          ref.thT = t(G, 0, 0, 'trombin', 'f36-ts', 'start');
          ref.pc = mk('g', {}, G); ref.pcC = mk('circle', { r: 8.5, class: 'f36-pc' }, ref.pc); ref.pcT = t(ref.pc, 0, 4, 'PC', 'f36-mini', 'middle');
          ref.apcT = [t(G, 0, 0, 'aktif protein C', 'f36-ts f36-yesil', 'start'), t(G, 0, 0, '(güçlü antikoagülan)', 'f36-ts f36-yesil', 'start')];
          // heparan sülfat
          mk('path', { d: `M ${hsx} ${LB} l 4 -6 l -8 -6 l 8 -6 l -8 -6 l 4 -6`, class: 'f36-hs' }, G);
          t(G, dar ? m + 10 : hsx + 14, LB + 24, 'heparan sülfat', 'f36-ts', 'start');
          ref.at = mk('g', {}, G); ref.atC = mk('circle', { r: 10, class: 'f36-at' }, ref.at); t(ref.at, 0, 4, 'AT', 'f36-mini', 'middle');
          ref.atT = t(G, 0, 0, 'antitrombin III', 'f36-ts', 'start');
          ref.inh = mk('g', {}, G);
          const ax = hsx, ay = LB - 44;
          mk('line', { x1: ax + 10, y1: ay - 6, x2: ax + 30, y2: ay - 26, class: 'f36-ince', 'marker-end': 'url(#f36-en-ok)' }, ref.inh);
          mk('line', { x1: ax + 12, y1: ay + 2, x2: ax + 32, y2: ay + 2, class: 'f36-ince', 'marker-end': 'url(#f36-en-ok)' }, ref.inh);
          t(ref.inh, ax + 34, ay - 26, 'trombin ✕', 'f36-ts f36-kirmizi', 'start');
          t(ref.inh, ax + 36, ay + 6, 'faktör Xa ✕', 'f36-ts f36-kirmizi', 'start');
          ref.tmx = tmx; ref.hsx = hsx;
        } else if (k === 'hasarli') {
          t(G, m, LB + CH + 40, 'açığa çıkan kollajen', 'f36-ts f36-turuncu', 'middle');
          ref.vwf = [0, 1].map(() => { const g = mk('g', {}, G); mk('circle', { r: 5, cx: -4, style: 'fill:var(--c-basic)' }, g); mk('circle', { r: 3.6, cx: 5, style: 'fill:var(--accent)' }, g); return g; });
          ref.vT = t(G, 0, 0, 'vWF + faktör VIII', 'f36-ts', 'start');
          ref.plt = mk('path', { class: 'f36-trmb' }, G);
          ref.pT = t(G, 0, 0, 'trombosit', 'f36-ts', 'start');
          t(G, 8, 18, 'endotel yırtığı', 'f36-ts');
          mk('line', { x1: 60, x2: m - 22, y1: 24, y2: LB - 4, class: 'f36-kilavuz' }, G);
        } else {
          ref.y = [];
          for (let i = 0; i < 8; i++) { const x = W * (0.08 + i * 0.12); const g = mk('path', { d: `M ${x} ${LB} l 0 -7 m 0 0 l -4 -5 m 4 5 l 4 -5`, class: 'f36-adez' }, G); ref.y.push(g); }
          t(G, m, 18, 'adezyon molekülleri (yüzeyde)', 'f36-ts f36-vurgu', 'middle');
          t(G, m, H - 56, 'IL-1, TNF (dokudan)', 'f36-t f36-vurgu', 'middle');
          [W * 0.32, W * 0.68].forEach((x) => mk('line', { x1: x, x2: x, y1: H - 70, y2: BMY + 14, class: 'f36-ince', 'marker-end': 'url(#f36-en-ok)' }, G));
          ref.notr = mk('g', {}, G); mk('circle', { r: 11, class: 'f36-lok' }, ref.notr); [[-4, -2], [1, -5], [3, 3], [-2, 5]].forEach(([x, y]) => mk('circle', { cx: x, cy: y, r: 2.8, style: 'fill:var(--accent)' }, ref.notr));
          ref.lenf = mk('g', {}, G); mk('circle', { r: 9.5, class: 'f36-lok f36-lenf' }, ref.lenf); mk('circle', { r: 6, style: 'fill:var(--c-clin)' }, ref.lenf);
          ref.nT = t(G, 0, 0, 'nötrofil', 'f36-ts', 'middle'); ref.lT = t(G, 0, 0, 'lenfosit', 'f36-ts', 'middle');
        }
        oynat(RM ? null : 0);
      }
      const yer = (g, x, y, extra) => g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})${extra || ''}`);
      const txt = (e, x, y) => { e.setAttribute('x', x.toFixed(1)); e.setAttribute('y', y.toFixed(1)); };
      function oynat(time) {
        const k = anahtar(), m = W / 2;
        if (k === 'vazo') {
          const u = time == null ? 0.7 : (time % 4) / 4;
          const e = time == null ? 1 : seg01(u, 0.25, 0.55) * (1 - seg01(u, 0.85, 1));
          ref.mol.forEach((p) => {
            const f = time == null ? 0.5 + (p.f - 0.5) * 0.6 : (u + p.f) % 1;
            p.c.setAttribute('cx', (p.x + Math.sin(f * 6 + p.f * 9) * 2).toFixed(1)); p.c.setAttribute('cy', lerp(LB + CH - 4, SMY - 30, f).toFixed(1));
            p.c.style.opacity = (Math.sin(Math.PI * f) * 1.2).toFixed(2);
          });
          const [s1, s2] = ref.sm;
          s1.setAttribute('rx', (W * 0.19 * (1 + 0.18 * e)).toFixed(1)); s1.setAttribute('ry', (11 * (1 - 0.35 * e)).toFixed(1));
          s2.setAttribute('rx', (W * 0.19 * (1 - 0.3 * e)).toFixed(1)); s2.setAttribute('ry', (11 * (1 + 0.55 * e)).toFixed(1));
          ref.e1.style.opacity = ref.e2.style.opacity = (0.25 + 0.75 * e).toFixed(2);
        } else {
          ref.sm.forEach((s) => { s.setAttribute('rx', W * 0.19); s.setAttribute('ry', 11); });
        }
        if (k === 'saglam') {
          const u = time == null ? 1 : (time % 5.5) / 5;
          const { tmx, hsx } = ref;
          ref.trm.forEach((p, i) => { const x = time == null ? W * (0.3 + i * 0.18) : ((time * 40 + i * W / 3) % (W + 40)) - 20; p.setAttribute('cx', x.toFixed(1)); p.setAttribute('cy', 32 + i * 4); });
          const a = ease(seg01(u, 0, 0.3));
          const thx = lerp(tmx - (dar ? 20 : 50), tmx, a), thy = lerp(44, LB - 30, a);
          yer(ref.th, thx, thy); txt(ref.thT, thx - 30, thy - 12); ref.thT.setAttribute('text-anchor', 'start');
          const b = ease(seg01(u, 0.3, 0.5)), c2 = ease(seg01(u, 0.55, 0.85));
          const pcx = c2 > 0 ? lerp(tmx + 14, tmx + (dar ? 34 : 60), c2) : lerp(tmx + (dar ? 56 : 110), tmx + 14, b), pcy = c2 > 0 ? lerp(LB - 28, LB - 70, c2) : lerp(50, LB - 28, b);
          yer(ref.pc, pcx, pcy);
          const etkin = u >= 0.55;
          ref.pcC.setAttribute('class', etkin ? 'f36-pc etkin' : 'f36-pc'); ref.pcT.textContent = etkin ? 'APC' : 'PC';
          ref.apcT.forEach((e2, i) => { txt(e2, pcx + 13, pcy - 2 + i * 14); e2.style.opacity = seg01(u, 0.7, 0.85); });
          const at = ease(seg01(u, 0, 0.35));
          const atx = lerp(hsx + (dar ? 40 : 70), hsx, at), aty = lerp(46, LB - 44, at);
          yer(ref.at, atx, aty); txt(ref.atT, atx - 12, aty - 16); ref.atT.setAttribute('text-anchor', 'end');
          ref.atC.setAttribute('class', u > 0.4 ? 'f36-at etkin' : 'f36-at');
          ref.inh.style.opacity = seg01(u, 0.45, 0.6);
        } else if (k === 'hasarli') {
          const u = time == null ? 1 : (time % 5.5) / 5;
          ref.vwf.forEach((g, i) => {
            const a = ease(seg01(u, i * 0.12, 0.3 + i * 0.12));
            const x0 = W * 0.3 - i * 30, y0 = LB - 2, x1 = m - 10 + i * 18, y1 = BMY + 4;
            const x = lerp(x0, x1, a), y = lerp(y0, y1, a) - Math.sin(Math.PI * a) * 40;
            yer(g, x, y);
            if (i === 0) txt(ref.vT, x + (a > 0.9 ? 12 : -50), y - (a > 0.9 ? -24 : 12));
          });
          ref.vT.style.opacity = 1;
          const pa = ease(seg01(u, 0.4, 0.72)), px = lerp(-10, m, pa), py = lerp(LB - 50, BMY - 10, pa);
          const spiky = u > 0.75;
          ref.plt.setAttribute('d', spiky ? yildiz(px, py, 12, 6, 8) : `M ${px - 10} ${py} a 10 4.5 0 1 0 20 0 a 10 4.5 0 1 0 -20 0 Z`);
          ref.plt.setAttribute('class', spiky ? 'f36-trmb etkin' : 'f36-trmb');
          txt(ref.pT, px + 16, py - 10); ref.pT.textContent = spiky ? 'trombosit yapışır, etkinleşir' : 'trombosit';
          ref.pT.setAttribute('text-anchor', spiky && dar ? 'middle' : 'start');
          if (spiky && dar) txt(ref.pT, px, LB - 30);
        } else if (k === 'inf') {
          const u = time == null ? 1 : (time % 7) / 6;
          ref.y.forEach((y) => { y.style.opacity = (0.15 + 0.85 * seg01(u, 0, 0.2)).toFixed(2); });
          const lok = (g, tx, x0, xs, r, u0) => {
            const a = seg01(u, u0, u0 + 0.4), x = lerp(x0, xs, 1 - Math.pow(1 - a, 2.2)), mg = ease(seg01(u, u0 + 0.45, u0 + 0.75));
            const y = lerp(LB - r - 1, BMY + 34, mg), sq = y > LB - r && y < BMY + 10 ? 0.62 : 1;
            yer(g, x, y, ` rotate(${((x - x0) / r * 57).toFixed(0)}) scale(${sq} ${sq < 1 ? 1.2 : 1})`);
            txt(tx, x, mg > 0.5 ? y + r + 15 : y - r - 6);
          };
          lok(ref.notr, ref.nT, -14, W * 0.3, 11, 0.05);
          lok(ref.lenf, ref.lT, -14, W * 0.72, 9.5, 0.2);
        }
      }
      const yildiz = (cx, cy, R, r, n) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a = (Math.PI * i) / n, rr = i % 2 ? r : R; d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a) * 0.6).toFixed(1); } return d + 'Z'; };
      kok.addEventListener('click', (e) => {
        const b = e.target.closest('[data-sk]'), h = e.target.closest('[data-hm]');
        if (b) { sek = b.dataset.sk; bas(kok, 'sk', sek); kok.querySelector('.f36-alt-seg').hidden = sek !== 'hem'; kok.querySelector('.f36-no').hidden = sek !== 'vazo'; }
        else if (h) { hem = h.dataset.hm; bas(kok, 'hm', hem); }
        else return;
        capYaz(el, EN_CAP[anahtar()]); taban(); sahne();
      });
      taban(); sahne();
      return RM ? () => {} : ticker(kok, (dt) => { tt += dt; oynat(tt); });
    });
  };
})();
