/* Fizyoloji Bölüm 42 · Egzersiz fizyolojisi · bileşenler (tarif: docs/tasarim/fiz42.md; K1 s. 178–184).
   Çizimler şematiktir; kitaptan gelen sayılar (2–4 / 50–100 mL/100 g/dk, CO 5 → 25 L/dk, %20 → %80, koroner 250 → 1250 mL/dk,
   V̇E 5 → 100 L/dk, V̇O₂ 250 → 5000 mL/dk, V̇/Q̇ 0,8 → 1,0, K⁺ 8/12 mmol/L, −1°C, 40,6°C, %20–25, %40, %25, 15 L/dk)
   olduğu gibi, eğri biçimleri ve ara değerler temsilî olarak çizilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const sig = (z) => 1 / (1 + Math.exp(-z));
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const rngHtml = (ad, aria, min, max, val, step) => `<label class="f42-rng"><span>${ad} <b data-o></b></span><input type="range" min="${min}" max="${max}" value="${val}" step="${step || 1}" aria-label="${aria}"></label>`;
  /* kapsayıcı 560 px'ten darsa dar yerleşim; yalnız eşik geçilince yeniden çizer */
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const svgAc = (vb, aria, dar, cls) => `<svg class="f42-svg${dar ? ' f42-dar' : ''} ${cls || ''}" viewBox="${vb}" role="img" aria-label="${aria}">`;
  const T = (x, y, s, cls, anc, ek) => `<text class="${cls || 'f42-ts'}" x="${x}" y="${y}" text-anchor="${anc || 'start'}"${ek || ''}>${s}</text>`;
  /* ok: çizgi + üçgen uç (marker kullanmadan; renk sınıfla) */
  const ok = (x1, y1, x2, y2, cls, w, h) => {
    w = w || 2; h = h || 7;
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
    const bx = x2 - c * h, by = y2 - s * h, k = h * 0.6;
    return `<g class="f42-ok ${cls || ''}"><line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" stroke-width="${w}"/><polygon points="${x2},${y2} ${bx - s * k},${by + c * k} ${bx + s * k},${by - c * k}"/></g>`;
  };
  /* kalın yön oku (gösterge): dir +1 yukarı, −1 aşağı, 0 eşit */
  const yonOk = (cx, cy, dir, boy, cls) => {
    if (!dir) return `<g class="${cls}"><rect x="${cx - 11}" y="${cy - 7}" width="22" height="4" rx="2"/><rect x="${cx - 11}" y="${cy + 3}" width="22" height="4" rx="2"/></g>`;
    const h = boy, w = boy * 0.62, sw = w * 0.38, ty = cy - (dir * h) / 2, by = cy + (dir * h) / 2, hy = ty + dir * h * 0.48;
    return `<polygon class="${cls}" points="${cx},${ty} ${cx + w / 2},${hy} ${cx + sw / 2},${hy} ${cx + sw / 2},${by} ${cx - sw / 2},${by} ${cx - sw / 2},${hy} ${cx - w / 2},${hy}"/>`;
  };
  /* grafik çerçevesi */
  const grafik = (o) => {
    const X = (u) => o.x0 + (o.x1 - o.x0) * u;
    const Y = (v) => o.y1 - ((o.y1 - o.y0) * (v - o.ymin)) / (o.ymax - o.ymin);
    let s = '';
    (o.grid || []).forEach((v) => { s += `<line class="f42-izg" x1="${o.x0}" y1="${Y(v)}" x2="${o.x1}" y2="${Y(v)}"/>` + T(o.x0 - 5, Y(v) + 4, String(v).replace('.', ','), 'f42-tk', 'end'); });
    s += `<line class="f42-eks" x1="${o.x0}" y1="${o.y1}" x2="${o.x1}" y2="${o.y1}"/><line class="f42-eks" x1="${o.x0}" y1="${o.y0}" x2="${o.x0}" y2="${o.y1}"/>`;
    if (o.ylab) s += T(o.x0 + 4, o.y0 - 8, o.ylab, 'f42-t f42-gb');
    (o.xt || []).forEach(([u, l], i, a) => { s += T(X(u), o.y1 + 15, l, 'f42-tk', i === 0 ? 'start' : i === a.length - 1 ? 'end' : 'middle'); });
    return { X, Y, s };
  };
  const YOG = [[0, 'İstirahat'], [1 / 3, 'Hafif'], [2 / 3, 'Orta'], [1, 'Yoğun']];
  const yolF = (f, u0, u1, X, Y, n) => { n = n || 60; let d = ''; for (let i = 0; i <= n; i++) { const u = u0 + ((u1 - u0) * i) / n; d += (i ? 'L' : 'M') + X(u).toFixed(1) + ' ' + Y(f(u)).toFixed(1); } return d; };
  const yogAd = (v) => (v <= 0 ? 'İstirahat' : v <= 33 ? 'Hafif' : v <= 67 ? 'Orta' : 'Yoğun');
  /* oynat: değeri 0 → 100 arası süre boyunca ilerletir (ticker ile; yalnız görünürken) */
  const oynatici = (el, sure, cb, bitti) => {
    let on = false, u = 0;
    const stop = ticker(el, (dt) => { if (!on) return; u = Math.min(1, u + dt / sure); cb(u); if (u >= 1) { on = false; if (bitti) bitti(); } });
    return { bas: (u0) => { u = u0 || 0; on = true; }, dur: () => { on = false; }, calisiyor: () => on, stop };
  };

  /* =====================================================================
     1 · f42_tip — dinamik ve statik egzersiz, kas kapillerleri (K1 s. 178)
     ===================================================================== */
  VIZ.f42_tip = (el) => {
    const CAP = {
      din: "<b>Dinamik (izotonik).</b> Kas ritmik kasılıp gevşer, eklem hareket eder (koşu). Kapiller yataklar genişler, SVR düşer; düşen DBP'ye baroreseptörler taşikardiyle yanıt verir. Statik egzersizi seçin. [[K1 s. 178]]",
      sta: '<b>Statik (izometrik).</b> Kas dirence karşı kasılır ama boyu değişmez (ağırlık kaldırma). Sürekli kasılma kapillerleri dışarıdan sıkıştırır, anaerobik metabolizma artar; SVR ve DBP yükselir. HR de artar, ama dinamik egzersizdekinden az. [[K1 s. 178]]',
    };
    const GOS = {
      din: [['SVR', -1, 30, ['kapiller yatak', 'genişler']], ['DBP', -1, 22, ['SVR düşer']], ['HR', 1, 34, ['düşen DBP →', 'baroreseptörler']]],
      sta: [['SVR', 1, 30, ['kapillerler', 'sıkışır']], ['DBP', 1, 26, ['SVR artar']], ['HR', 1, 16, ['sempatik etkinlik', '(daha az artış)']]],
    };
    let mod = 'din', dar = false, t = 0, R = null;
    el.innerHTML = `<div class="f42-ust">${segHtml('Kasılma biçimi', 'm', [['din', 'Dinamik (izotonik)'], ['sta', 'Statik (izometrik)']], 'din')}</div><div class="f42-sahne f42-gen-m"></div>`;
    const sahne = el.querySelector('.f42-sahne');
    const J = [220, 186], A = [62, 132];
    const geo = (phi) => {
      const r = (phi * Math.PI) / 180, d = [Math.cos(r), -Math.sin(r)];
      const B = [J[0] + 34 * d[0], J[1] + 34 * d[1] - 10], E = [J[0] + 100 * d[0], J[1] + 100 * d[1]];
      const L = Math.hypot(B[0] - A[0], B[1] - A[1]), ang = (Math.atan2(B[1] - A[1], B[0] - A[0]) * 180) / Math.PI;
      return { B, E, L, ang };
    };
    const L0 = geo(35).L;
    const igPath = (L, h) => `M${0.1 * L} 0 C ${0.3 * L} ${-h * 1.32} ${0.7 * L} ${-h * 1.32} ${0.9 * L} 0 C ${0.7 * L} ${h * 1.32} ${0.3 * L} ${h * 1.32} ${0.1 * L} 0 Z`;
    const ciz = () => {
      const st = mod === 'sta', g = geo(35), h = st ? 34 : 26;
      const ox = dar ? 15 : 0, oy = dar ? 0 : 30;
      let s = svgAc(dar ? '0 0 360 410' : '0 0 560 280', st ? 'Statik egzersiz: kas boyu sabit, kapillerler sıkışmış; SVR ve DBP artar, HR az artar' : 'Dinamik egzersiz: kas ritmik kasılır, kapillerler geniş; SVR ve DBP düşer, HR belirgin artar', dar);
      s += `<g transform="translate(${ox} ${oy})">`;
      s += `<rect class="f42-tag-k" x="14" y="4" width="${st ? 196 : 136}" height="24" rx="12"/>` + T(26, 21, st ? 'Statik · ağırlık kaldırma' : 'Dinamik · koşu', 'f42-t');
      s += `<line class="f42-kemik" x1="28" y1="${J[1]}" x2="${J[0]}" y2="${J[1]}"/><line class="f42-kemik f42-on-kol" x1="${J[0]}" y1="${J[1]}" x2="${g.E[0]}" y2="${g.E[1]}"/><circle class="f42-eklem" cx="${J[0]}" cy="${J[1]}" r="9"/>`;
      s += `<g class="f42-agirlik"${st ? '' : ' hidden'}><line class="f42-ip" x1="${g.E[0]}" y1="${g.E[1]}" x2="${g.E[0]}" y2="${g.E[1] + 18}"/><rect class="f42-yuk" x="${g.E[0] - 22}" y="${g.E[1] + 18}" width="44" height="26" rx="4"/>${T(g.E[0], g.E[1] + 35, 'direnç', 'f42-ts f42-ink', 'middle')}</g>`;
      s += `<g class="f42-kas" transform="translate(${A[0]} ${A[1]}) rotate(${g.ang})"><line class="f42-tendon" x1="0" y1="0" x2="${0.12 * g.L}" y2="0"/><line class="f42-tendon f42-tend2" x1="${0.88 * g.L}" y1="0" x2="${g.L}" y2="0"/>
        <path class="f42-kas-g" d="${igPath(g.L, h)}"/>
        ${[-0.36, 0, 0.36].map((k) => `<line class="f42-kap ${st ? 'f42-kap-bas' : ''}" data-k="${k}" x1="${0.22 * g.L}" y1="${k * h}" x2="${0.78 * g.L}" y2="${k * h}"/>`).join('')}
        <g class="f42-par"></g>
        ${st ? [0.3, 0.43, 0.57, 0.7].map((u) => ok(u * g.L, -h - 24, u * g.L, -h - 3, 'f42-ok-warn', 2, 6)).join('') : ''}</g>`;
      const my = A[1] + (g.B[1] - A[1]) * 0.5;
      s += st ? T(140, my - h - 34, 'dış bası', 'f42-t f42-warn-t', 'middle') + T(140, 238, 'kapiller sıkışır → anaerobik', 'f42-ts f42-warn-t', 'middle')
        : T(140, my - h - 12, 'O₂ → aerobik', 'f42-t f42-ok-t', 'middle') + T(140, 238, 'kapiller yatak geniş', 'f42-ts f42-ok-t', 'middle');
      s += T(J[0], J[1] + 26, 'eklem', 'f42-ts', 'middle') + '</g>';
      /* göstergeler */
      GOS[mod].forEach(([ad, dir, boy, ger], i) => {
        const x = dar ? 16 : 352, y = dar ? 230 + i * 60 : 22 + i * 84;
        s += `<rect class="f42-gkutu" x="${x}" y="${y}" width="${dar ? 328 : 200}" height="${dar ? 52 : 74}" rx="10"/>`;
        s += T(x + 12, y + (dar ? 32 : 22), ad, 'f42-t f42-gb');
        const ax = dar ? x + 84 : x + 34, ay = dar ? y + 26 : y + 48;
        s += yonOk(ax, ay, dir, dar ? Math.min(boy, 34) * 1.2 : boy * 0.9, dir > 0 ? 'f42-f-crit' : 'f42-f-basic');
        const tx = dar ? x + 118 : x + 64;
        ger.forEach((g2, j) => { s += T(tx, (dar ? y + 22 : y + 44) + j * 15 - (ger.length - 1) * (dar ? 0 : 7), g2, 'f42-ts f42-ink'); });
      });
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { kas: svg.querySelector('.f42-kas'), g: svg.querySelector('.f42-kas-g'), kol: svg.querySelector('.f42-on-kol'), kap: [...svg.querySelectorAll('.f42-kap')], t2: svg.querySelector('.f42-tend2'), par: svg.querySelector('.f42-par'), h, dots: [] };
      if (!RM) {
        const n = st ? 2 : 5;
        R.kap.forEach((k, ki) => { for (let i = 0; i < n; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', st ? 1.8 : 3); R.par.appendChild(c); R.dots.push({ c, k: +k.dataset.k, u: (i + ki * 0.33) / n }); } });
      }
      kare(0);
    };
    const kare = (dt) => {
      if (!R) return;
      const st = mod === 'sta';
      t += dt;
      const phi = st || RM ? 35 : 35 + 10 * Math.sin((2 * Math.PI * t) / 1.2);
      const g = geo(phi), h = st ? 34 : 26 * Math.pow(L0 / g.L, 1.6);
      if (!st && !RM) {
        R.kas.setAttribute('transform', `translate(${A[0]} ${A[1]}) rotate(${g.ang})`);
        R.g.setAttribute('d', igPath(g.L, h));
        R.kol.setAttribute('x2', g.E[0]); R.kol.setAttribute('y2', g.E[1]);
        R.t2.setAttribute('x1', 0.88 * g.L); R.t2.setAttribute('x2', g.L);
        R.kap.forEach((k) => { k.setAttribute('x1', 0.22 * g.L); k.setAttribute('x2', 0.78 * g.L); k.setAttribute('y1', +k.dataset.k * h); k.setAttribute('y2', +k.dataset.k * h); });
      }
      const hiz = st ? 0.07 : 0.55;
      R.dots.forEach((d) => {
        d.u = (d.u + dt * hiz) % 1;
        const x = (0.22 + 0.56 * d.u) * g.L;
        d.c.setAttribute('cx', x); d.c.setAttribute('cy', d.k * h);
        d.c.setAttribute('class', d.u < 0.5 ? 'f42-f-crit' : 'f42-f-basic');
      });
    };
    const kur = (m) => { mod = m; basSec(el, 'm', m); capYaz(el, CAP[m]); ciz(); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (b) kur(b.dataset.m); });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, kare);
    return () => { d1(); stop(); };
  };

  /* =====================================================================
     2 · f42_lif — tip I, IIa, IIb lifleri ve lif karışımı (K1 s. 178–179)
     ===================================================================== */
  VIZ.f42_lif = (el) => {
    const CAP = {
      I: '<b>Tip I.</b> Trigliseritleri oksidatif yolla yakar; miyoglobin, mitokondri ve kapiller boldur, kırmızıdır. Bir lif tipi seçin ya da lif karışımını değiştirin. [[K1 s. 178]]',
      IIa: '<b>Tip IIa.</b> İşlevce I ile IIb arasındadır: büyük glikojen deposuyla hem aerobik hem anaerobik metabolizma kullanır; IIb\'den yavaş kasılır, yorgunluğa daha dirençlidir. [[K1 s. 178]]',
      IIb: '<b>Tip IIb.</b> ATP\'yi çoğunlukla glikolizle üretir, glikojen deposu büyüktür; miyoglobin yoktur, beyazdır. Kısa, hızlı, güçlü hareketler (sprint) için; anaerobik kapasite sınırlı olduğundan çabuk yorulur. [[K1 s. 178]]',
      hi: '<b>Tip IIb oranı yüksek.</b> Genetik olarak IIb lifi fazla olan kişi iyi sprinter olur. [[K1 s. 178–179]]',
      lo: '<b>Tip I oranı yüksek.</b> Tip I lifi fazla olan kişi iyi dayanıklılık sporcusu olur. [[K1 s. 179]]',
    };
    const LIF = [
      { k: 'I', ad: 'Tip I', alt: 'yavaş · oksidatif', cls: 'f42-lif-1', mit: 12, kap: 6, gli: 4, tg: 5, yor: 1, hiz: 'yavaş' },
      { k: 'IIa', ad: 'Tip IIa', alt: 'hızlı oksidatif', cls: 'f42-lif-2', mit: 7, kap: 4, gli: 16, tg: 0, yor: 0.6, hiz: 'hızlı' },
      { k: 'IIb', ad: 'Tip IIb', alt: 'hızlı glikolitik', cls: 'f42-lif-3', mit: 2, kap: 2, gli: 34, tg: 0, yor: 0.22, hiz: 'en hızlı' },
    ];
    let sec = 'I', oran = 50, dar = false, son = 'lif';
    el.innerHTML = `<div class="f42-ust">${segHtml('Lif tipi', 'l', LIF.map((l) => [l.k, l.ad]), 'I')}</div><div class="f42-sahne f42-gen-m"></div>
      <div class="f42-kont">${rngHtml('Tip IIb oranı', 'Kastaki tip IIb lif oranı', 10, 90, 50, 10)}</div>`;
    const sahne = el.querySelector('.f42-sahne'), inp = el.querySelector('input'), out = el.querySelector('[data-o]');
    /* sabit sözde rasgele sıra: mozaik oran değiştikçe yavaş değişsin */
    const RANK = Array.from({ length: 60 }, (_, i) => i).sort((a, b) => Math.sin(a * 12.9898) * 43758.5453 % 1 - Math.sin(b * 12.9898) * 43758.5453 % 1);
    const ciz = () => {
      const r = dar ? 46 : 62, cy = dar ? 62 : 80, cxs = dar ? [62, 180, 298] : [95, 280, 465];
      let s = svgAc(dar ? '0 0 360 520' : '0 0 560 350', 'Tip I, IIa ve IIb kas lifi kesitleri ve kas lif karışımı mozaiği', dar);
      LIF.forEach((l, i) => {
        const cx = cxs[i], on = l.k === sec;
        s += `<g class="f42-lifg${on ? ' on' : ''}" data-l="${l.k}" tabindex="0" role="button" aria-label="${l.ad} seç">`;
        s += `<circle class="f42-lif-hal" cx="${cx}" cy="${cy}" r="${r + 9}"/><circle class="${l.cls}" cx="${cx}" cy="${cy}" r="${r}"/>`;
        for (let j = 0; j < l.kap; j++) { const a = (j / l.kap) * 2 * Math.PI + 0.3; s += `<circle class="f42-kapd" cx="${cx + (r + 4) * Math.cos(a)}" cy="${cy + (r + 4) * Math.sin(a)}" r="${dar ? 4 : 5}"/>`; }
        for (let j = 0; j < l.mit; j++) { const rr = r * 0.72 * Math.sqrt((j + 0.5) / l.mit), a = j * 2.39996; s += `<ellipse class="f42-mito" cx="${cx + rr * Math.cos(a)}" cy="${cy + rr * Math.sin(a)}" rx="${dar ? 5.5 : 7}" ry="${dar ? 3 : 3.8}" transform="rotate(${(j * 47) % 180} ${cx + rr * Math.cos(a)} ${cy + rr * Math.sin(a)})"/>`; }
        for (let j = 0; j < l.gli; j++) { const rr = r * 0.82 * Math.sqrt((j + 0.3) / l.gli), a = j * 2.39996 + 1.2; s += `<circle class="f42-gli" cx="${cx + rr * Math.cos(a)}" cy="${cy + rr * Math.sin(a)}" r="${dar ? 1.8 : 2.3}"/>`; }
        for (let j = 0; j < l.tg; j++) { const a = j * 1.26 + 0.6, rr = r * 0.5; s += `<circle class="f42-tg" cx="${cx + rr * Math.cos(a)}" cy="${cy + rr * Math.sin(a)}" r="${dar ? 3.4 : 4.2}"/>`; }
        const ly = cy + r + (dar ? 28 : 30);
        s += T(cx, ly, l.ad, 'f42-t f42-gb', 'middle') + T(cx, ly + (dar ? 16 : 15), l.alt, 'f42-ts f42-ink', 'middle');
        const bw = dar ? 96 : 120, by = ly + (dar ? 28 : 26);
        s += `<rect class="f42-bar-z" x="${cx - bw / 2}" y="${by}" width="${bw}" height="8" rx="4"/><rect class="f42-bar-ok" x="${cx - bw / 2}" y="${by}" width="${bw * l.yor}" height="8" rx="4"/>`;
        s += T(cx, by + (dar ? 22 : 21), 'kasılma: ' + l.hiz, 'f42-ts', 'middle') + '</g>';
      });
            
      /* mozaik */
      const nIIb = Math.round((60 * oran) / 100);
      const cols = dar ? 10 : 15, rows = dar ? 6 : 4, cw = dar ? 32 : 22, mx = dar ? 20 : 22, my = dar ? 296 : 256;
      s += T(mx, my - 8, 'Kas kesiti (60 lif)', 'f42-t f42-gb'); s += T(dar ? 340 : 538, my - 8, 'çubuk: yorgunluğa direnç', 'f42-ts', 'end');
      RANK.forEach((rk, i) => {
        const c = i % cols, rw = Math.floor(i / cols), x = mx + c * cw + (rw % 2 ? cw / 2 : 0), y = my + 6 + rw * (cw * 0.86);
        const cls = rk < nIIb ? 'f42-lif-3' : rk % 2 ? 'f42-lif-1' : 'f42-lif-2';
        s += `<circle class="${cls} f42-moz" cx="${x + cw / 2}" cy="${y + cw / 2}" r="${cw / 2 - 1.4}"/>`;
      });
      const tip = oran >= 70 ? 'Sprinter' : oran <= 30 ? 'Dayanıklılık sporcusu' : 'Karışık';
      const lx = dar ? 20 : 380, lyy = dar ? my + 6 + rows * cw * 0.86 + 34 : my + 24;
      s += T(lx, lyy, `IIb %${oran} · I + IIa %${100 - oran}`, 'f42-ts f42-ink') + T(lx, lyy + 22, tip, 'f42-t f42-big ' + (oran >= 70 ? 'f42-warn-t' : oran <= 30 ? 'f42-crit-t' : ''));
      s += T(lx, lyy + 42, 'Oran kasın işlevine göre değişir,', 'f42-tk') + T(lx, lyy + 56, 'kişiler arasında çok farklıdır.', 'f42-tk');
      sahne.innerHTML = s + '</svg>';
    };
    const capG = () => capYaz(el, son === 'rng' && oran >= 70 ? CAP.hi : son === 'rng' && oran <= 30 ? CAP.lo : CAP[sec]);
    const lifSec = (k) => { sec = k; son = 'lif'; basSec(el, 'l', k); ciz(); capG(); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-l]'); if (b) lifSec(b.dataset.l); });
    el.addEventListener('keydown', (e) => { const b = e.target.closest('g[data-l]'); if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); lifSec(b.dataset.l); } });
    const oku = () => { oran = +inp.value; out.textContent = '%' + oran; inp.setAttribute('aria-valuetext', '%' + oran + ' tip IIb'); };
    inp.addEventListener('input', () => { oku(); son = 'rng'; ciz(); capG(); });
    oku();
    return darIzle(sahne, (n) => { dar = n; ciz(); });
  };

  /* =====================================================================
     3 · f42_enerji — ATP kaynaklarının zaman sırası (K1 s. 179)
     ===================================================================== */
  VIZ.f42_enerji = (el) => {
    const TMAX = 21600; /* 0,5 s × 21600 = 3 sa */
    const zaman = (v) => 0.5 * Math.pow(TMAX, v / 1000);
    const KAY = [
      { ad: 'Depo ATP', not: '1–2 s', cls: 'acc' },
      { ad: 'Fosfokreatin', not: 'PCr + ADP → ATP · tampon', cls: 'basic' },
      { ad: 'Glikoliz', not: 'O₂ gerekmez · glukoz 2, glikojen 3 ATP · laktik asit', cls: 'warn' },
      { ad: 'Oksidatif fosforilasyon (karbonhidrat)', not: 'glikoliz + sitrik asit döngüsü + elektron taşıma zinciri · 36 ATP', cls: 'ok' },
      { ad: 'Yağ (β-oksidasyon)', not: 'g başına daha çok ATP · yavaş seferberlik', cls: 'clin' },
    ];
    const pay = (t) => {
      const lt = Math.log10(t);
      const a = [
        1 / (1 + Math.exp((t - 1.5) / 0.25)),
        1.2 * sig((t - 0.6) / 0.3) / (1 + Math.exp((t - 7) / 0.8)),
        1.3 * sig((lt - 0.55) / 0.12) * Math.exp(-Math.pow(Math.max(0, lt - 1.6), 2) / 0.5),
        1.6 * sig((lt - 1.6) / 0.18) * (1 - 0.85 * sig((lt - 3.7) / 0.12)),
        0.15 * sig((lt - 1.8) / 0.3) + 1.4 * sig((lt - 3.4) / 0.2),
      ];
      const S = a.reduce((x, y) => x + y, 0);
      return a.map((x) => x / S);
    };
    const glikojen = (t) => 1 - sig((Math.log10(t) - 3.7) / 0.1);
    const CAP = [
      [2, '<b>İlk saniyeler.</b> Depo ATP 1–2 s\'de biter; fosfokreatin ATP\'yi ADP\'den yeniden yapar ve yaklaşık 7 s yoğun egzersize yeter. Zamanı ilerletin. [[K1 s. 179]]'],
      [20, '<b>Fosfokreatin ve glikoliz.</b> Fosfokreatin ≈ 7 s\'de tükenir; glikoliz birkaç saniyede en yüksek hızına ulaşır. Hızlı ama verimsizdir: glukoz 2, glikojen 3 ATP verir; yan ürünü laktik asittir. [[K1 s. 179]]'],
      [1800, '<b>Oksidatif fosforilasyon.</b> En verimli yol: bir glukozun tam yıkımı 36 ATP verir. Ağır egzersizde karaciğer akımı azaldığı için laktik asit üretildiğinden yavaş temizlenir. [[K1 s. 179]]'],
      [7200, '<b>Yağ metabolizması.</b> β-oksidasyon aynı ağırlıktaki karbonhidrattan daha çok ATP verir ama yavaş seferber edilir; glikojen azaldıkça önemi artar. [[K1 s. 179]]'],
      [Infinity, '<b>Duvara çarpma.</b> Kas ve karaciğer glikojeni tükenince maratonda ani yorgunluk olur. [[K1 s. 179]]'],
    ];
    const v0 = Math.round((1000 * Math.log(2)) / Math.log(TMAX));
    let v = v0, dar = false, R = null, sonCap = -1;
    const isaret = (t, l) => `<span style="left:${(100 * Math.log(t / 0.5)) / Math.log(TMAX)}%">${l}</span>`;
    el.innerHTML = `<div class="f42-kont f42-kont-row">${rngHtml('Egzersiz süresi', 'Egzersiz süresi', 0, 1000, v0, 1)}<button type="button" class="btn ghost" data-a="oyn"${RM ? ' disabled title="Azaltılmış hareket açık"' : ''}>Oynat</button></div>
      <div class="f42-isaret" aria-hidden="true">${isaret(1.4, '1–2 s')}${isaret(7, '≈ 7 s')}${isaret(180, 'dakikalar')}${isaret(5400, 'saatler')}</div>
      <div class="f42-oku" aria-live="off"></div><div class="f42-sahne f42-gen-m"></div><div class="legend f42-lej"></div>`;
    const sahne = el.querySelector('.f42-sahne'), inp = el.querySelector('input'), out = el.querySelector('[data-o]'), okuEl = el.querySelector('.f42-oku'), lej = el.querySelector('.f42-lej'), oyn = el.querySelector('[data-a="oyn"]');
    const zYaz = (t) => (t < 60 ? fmt(t, t < 10 ? 1 : 0) + ' s' : t < 3600 ? fmt(t / 60, t < 600 ? 1 : 0) + ' dk' : fmt(t / 3600, 1) + ' sa');
    const ciz = () => {
      const G = dar ? { x0: 44, x1: 344, y0: 26, y1: 220 } : { x0: 56, x1: 470, y0: 26, y1: 240 };
      const lts = [[1, '1 s'], [10, '10 s'], [60, '1 dk'], [600, '10 dk'], [3600, '1 sa'], [10800, '3 sa']];
      const g = grafik({ ...G, ymin: 0, ymax: 100, grid: [50, 100], ylab: 'Katkı payı (%)', xt: [] });
      const U = (t) => Math.log(t / 0.5) / Math.log(TMAX);
      let s = svgAc(dar ? '0 0 360 300' : '0 0 560 290', 'Logaritmik zaman ekseninde ATP kaynaklarının katkı payları ve glikojen deposu', dar);
      /* yığın alanlar */
      const N = 120, us = Array.from({ length: N + 1 }, (_, i) => i / N), P = us.map((u) => pay(zaman(u * 1000)));
      let alt = us.map(() => 0);
      KAY.forEach((k, i) => {
        const ust = alt.map((a, j) => a + P[j][i] * 100);
        let d = 'M' + us.map((u, j) => `${g.X(u).toFixed(1)} ${g.Y(ust[j]).toFixed(1)}`).join('L');
        d += 'L' + us.map((u, j) => `${g.X(us[N - j]).toFixed(1)} ${g.Y(alt[N - j]).toFixed(1)}`).join('L') + 'Z';
        s += `<path class="f42-alan f42-a-${k.cls}" data-k="${i}" d="${d}"/>`;
        alt = ust;
      });
      s += g.s;
      lts.forEach(([t, l], i) => { s += `<line class="f42-eks" x1="${g.X(U(t))}" y1="${G.y1}" x2="${g.X(U(t))}" y2="${G.y1 + 4}"/>` + (dar && t === 3600 ? '' : T(g.X(U(t)), G.y1 + 16, l, 'f42-tk', i === lts.length - 1 ? 'end' : 'middle')); });
      s += T((G.x0 + G.x1) / 2, G.y1 + 34, 'Süre (logaritmik)', 'f42-tk', 'middle');
      s += `<line class="f42-imlec" x1="0" y1="${G.y0 - 4}" x2="0" y2="${G.y1}"/>`;
      /* glikojen göstergesi */
      if (dar) s += T(G.x0, 276, 'Kas + karaciğer glikojeni', 'f42-ts f42-ink') + `<rect class="f42-bar-z f42-gk-c" x="${G.x0}" y="284" width="${G.x1 - G.x0}" height="12" rx="6"/><rect class="f42-bar-ok f42-gk" x="${G.x0}" y="284" width="0" height="12" rx="6"/>` + T(G.x1, 276, '', 'f42-t f42-crit-t f42-duvar', 'end');
      else s += T(515, 18, 'Glikojen', 'f42-ts f42-ink', 'middle') + `<rect class="f42-bar-z f42-gk-c" x="500" y="${G.y0}" width="30" height="${G.y1 - G.y0}" rx="8"/><rect class="f42-bar-ok f42-gk" x="500" y="${G.y1}" width="30" height="0" rx="8"/>` + T(515, G.y1 + 16, 'kas + KC', 'f42-tk', 'middle') + T(515, G.y1 + 34, '', 'f42-t f42-crit-t f42-duvar', 'middle');
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { g, G, U, im: svg.querySelector('.f42-imlec'), gk: svg.querySelector('.f42-gk'), gkc: svg.querySelector('.f42-gk-c'), duv: svg.querySelector('.f42-duvar'), al: [...svg.querySelectorAll('.f42-alan')] };
      guncelle();
    };
    lej.innerHTML = KAY.map((k, i) => `<span data-k="${i}"><i class="f42-i-${k.cls}"></i><span><b>${k.ad}</b> · ${k.not}</span></span>`).join('');
    const guncelle = () => {
      const t = zaman(v), p = pay(t), dom = p.indexOf(Math.max(...p));
      out.textContent = zYaz(t); inp.setAttribute('aria-valuetext', zYaz(t));
      if (R) {
        const x = R.g.X(v / 1000); R.im.setAttribute('x1', x); R.im.setAttribute('x2', x);
        R.al.forEach((a, i) => a.classList.toggle('on', i === dom));
        const gl = clamp(glikojen(t), 0, 1);
        if (dar) R.gk.setAttribute('width', Math.max(0, (R.G.x1 - R.G.x0) * gl));
        else { const H = R.G.y1 - R.G.y0; R.gk.setAttribute('height', H * gl); R.gk.setAttribute('y', R.G.y1 - H * gl); }
        const bos = t > 7200; R.duv.textContent = bos ? 'Duvara çarpma' : ''; R.gkc.classList.toggle('f42-yanip', bos && !RM); R.gkc.classList.toggle('f42-bos', bos);
      }
      lej.querySelectorAll('span[data-k]').forEach((s2) => s2.classList.toggle('on', +s2.dataset.k === dom));
      const lak = p[2];
      okuEl.innerHTML = `<span>Baskın kaynak: <b>${KAY[dom].ad}</b></span><span class="f42-lak">Laktat <i><u style="width:${Math.round(lak * 100)}%"></u></i>${lak > 0.35 ? '<em>üretim > temizlenme (karaciğer akımı ↓)</em>' : ''}</span>`;
      const ci = CAP.findIndex(([s2]) => t <= s2);
      if (ci !== sonCap) { sonCap = ci; capYaz(el, CAP[ci][1]); }
    };
    const O = oynatici(el, 8, (u) => { v = Math.round(u * 1000); inp.value = v; guncelle(); }, () => { oyn.textContent = 'Oynat'; });
    oyn.addEventListener('click', () => { if (O.calisiyor()) { O.dur(); oyn.textContent = 'Oynat'; } else { O.bas(v >= 1000 ? 0 : v / 1000); oyn.textContent = 'Duraklat'; } });
    inp.addEventListener('input', () => { O.dur(); oyn.textContent = 'Oynat'; v = +inp.value; guncelle(); });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    return () => { d1(); O.stop(); };
  };

  /* =====================================================================
     4 · f42_yorgun — yorgunluğa katkıda bulunan dört etken (K1 s. 179)
     ===================================================================== */
  VIZ.f42_yorgun = (el) => {
    const CAP = [
      '<b>ADP ve fosfat birikimi.</b> ATP yıkımıyla artarlar; sarkoplazmik retikuluma Ca²⁺ geri alımını azalttıkları ya da ATP\'ye duyarlı K⁺ kanallarını açıp membran uyarılabilirliğini düşürdükleri öne sürülür (Bölüm 54). Bir etken seçin. [[K1 s. 179]]',
      '<b>Hücre dışı K⁺ artışı.</b> Ağır egzersizde arteriyel K⁺ 8 mmol/L\'ye, kas interstisyel K⁺\'u 12 mmol/L\'ye çıkabilir; hiperkaleminin yorgunluğa katkıda bulunduğu düşünülür. Egzersizdeki kalp bundan korunmuş görünür. [[K1 s. 179]]',
      '<b>Kasta laktat birikimi.</b> Yoğun egzersiz aerobik metabolizma enzimlerini baskılayabilir. [[K1 s. 179]]',
      '<b>Glikojen tükenmesi.</b> Uzun egzersizden sonra kas glikojen depoları biter. [[K1 s. 179]]',
    ];
    let sec = 0, dar = false, t0 = 0, R = null;
    el.innerHTML = `<div class="f42-ust">${segHtml('Yorgunluk etkeni', 'y', [['0', 'ADP ve fosfat'], ['1', 'K⁺'], ['2', 'Laktat'], ['3', 'Glikojen']], '0')}</div><div class="f42-sahne f42-gen-m"></div>`;
    const sahne = el.querySelector('.f42-sahne');
    const ciz = () => {
      let s = svgAc(dar ? '0 0 360 430' : '0 0 560 290', 'Yorgunluk: kuvvet–zaman eğrisi ve kas lifinde seçilen etkenin yeri', dar);
      /* kuvvet grafiği */
      const G = dar ? { x0: 40, x1: 200, y0: 28, y1: 118 } : { x0: 36, x1: 200, y0: 34, y1: 160 };
      const g = grafik({ ...G, ymin: 0, ymax: 1, grid: [], ylab: 'Kuvvet', xt: [[1, 'süre']] });
      s += g.s + `<path class="f42-egri f42-s-warn" d="${yolF((u) => 0.92 - 0.62 * Math.pow(u, 1.6), 0, 1, g.X, g.Y)}"/>`;
      const yx = dar ? 214 : G.x0, yy = dar ? 50 : G.y1 + 42;
      s += T(yx, yy, 'Yorgunluk: kuvvet üretme', 'f42-ts f42-ink') + T(yx, yy + 15, 'yeteneği ↓ · tepe gerim ve', 'f42-ts f42-ink') + T(yx, yy + 30, 'kasılma hızı ↓', 'f42-ts f42-ink');
      const kx = dar ? 214 : G.x0, ky = dar ? 104 : G.y1 + 100;
      s += `<path class="f42-kalkan" d="M${kx} ${ky - 12} l9 -4 l9 4 v6 c0 6 -4 10 -9 12 c-5 -2 -9 -6 -9 -12z"/>` + T(kx + 24, ky - 4, 'Koruyucu: ATP tükenmesini,', 'f42-ts f42-ok-t') + T(kx + 24, ky + 11, 'rigor ve apoptozu önler', 'f42-ts f42-ok-t');
      /* kas lifi (yerel çerçeve 310 × 230) */
      const ox = dar ? 22 : 238, oy = dar ? 150 : 24;
      s += `<g transform="translate(${ox} ${oy})">`;
      s += `<rect class="f42-inter" x="200" y="0" width="114" height="160" rx="10"/>` + T(257, 152, 'interstisyum', 'f42-tk', 'middle');
      s += `<rect class="f42-kap-v" x="270" y="8" width="30" height="128" rx="14"/>` + T(285, 22, 'kap.', 'f42-tk', 'middle');
      s += `<rect class="f42-lif-k" x="0" y="0" width="210" height="160" rx="16"/>` + T(12, 18, 'Kas lifi', 'f42-t f42-gb');
      s += `<path class="f42-sr" d="M20 38 q12 -10 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/>` + T(184, 42, 'SR', 'f42-ts f42-basic-t');
      s += `<ellipse class="f42-mito2" cx="62" cy="112" rx="30" ry="14"/><path class="f42-mito-ic" d="M38 112 q6 -8 12 0 t12 0 t12 0 t12 0"/>` + T(62, 140, 'mitokondri', 'f42-tk', 'middle');
      s += `<g class="f42-glik">${Array.from({ length: 14 }, (_, i) => `<circle class="f42-gli" cx="${126 + (i % 5) * 12 + (Math.floor(i / 5) % 2) * 6}" cy="${96 + Math.floor(i / 5) * 12}" r="3.6"/>`).join('')}</g>` + T(150, 140, 'glikojen', 'f42-tk', 'middle');
      s += `<rect class="f42-katp" x="203" y="62" width="14" height="${sec === 0 ? 30 : 30}" rx="3"/><rect class="f42-katp-g${sec === 0 ? ' acik' : ''}" x="207.5" y="62" width="5" height="30"/>` + T(210, 56, 'K_ATP', 'f42-tk', 'middle');
      /* Ca²⁺ dönüş okları */
      [70, 110, 150].forEach((x) => { s += ok(x, 76, x, 50, 'f42-ok-basic' + (sec === 0 ? ' f42-ince' : ''), sec === 0 ? 1 : 2.4, 6) + `<circle class="f42-ca" cx="${x - 8}" cy="${82}" r="3"/>`; });
      s += T(116, 70, 'Ca²⁺', 'f42-tk');
      s += `<g class="f42-dyn"></g>`;
      /* seçime göre etiketler */
      const ly = 182;
      if (sec === 0) {
        s += ok(212, 70, 252, 70, 'f42-ok-warn', 2, 6) + T(256, 66, 'K⁺', 'f42-ts f42-warn-t');
        s += T(0, ly, 'Ca²⁺ geri alımı ↓ (öne sürülen, Bölüm 54)', 'f42-ts f42-ink') + T(0, ly + 17, 'K_ATP açılır → membran uyarılabilirliği ↓', 'f42-ts f42-ink') + T(0, ly + 34, '(öne sürülen)', 'f42-ts');
      } else if (sec === 1) {
        s += `<rect class="f42-roz" x="0" y="${ly - 14}" width="250" height="22" rx="11"/>` + T(10, ly + 1, 'Arteriyel K⁺ 8 mmol/L\'ye dek', 'f42-ts f42-ink');
        s += `<rect class="f42-roz" x="0" y="${ly + 12}" width="250" height="22" rx="11"/>` + T(10, ly + 27, 'İnterstisyel K⁺ 12 mmol/L\'ye dek', 'f42-ts f42-ink');
        s += `<path class="f42-kalp-i" d="M266 ${ly + 4} c-6 -8 -18 -4 -14 6 l14 13 l14 -13 c4 -10 -8 -14 -14 -6z"/>` + T(266, ly + 42, 'kalp korunmuş', 'f42-tk', 'middle');
      } else if (sec === 2) {
        s += `<line class="f42-carpi" x1="40" y1="100" x2="84" y2="124"/><line class="f42-carpi" x1="84" y1="100" x2="40" y2="124"/>`;
        s += T(0, ly, 'Laktat birikir → aerobik enzimler', 'f42-ts f42-ink') + T(0, ly + 17, 'baskılanabilir', 'f42-ts f42-ink');
      } else {
        s += T(0, ly, 'Uzun egzersiz → kas glikojen', 'f42-ts f42-ink') + T(0, ly + 17, 'depoları biter', 'f42-ts f42-ink');
      }
      s += '</g>';
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { dyn: svg.querySelector('.f42-dyn'), gl: [...svg.querySelectorAll('.f42-glik circle')], nok: [] };
      /* birikecek noktalar */
      const ekle = (n, cls, lbl, alan) => { for (let i = 0; i < n; i++) { const a = alan(i); const g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g2.setAttribute('class', cls); g2.innerHTML = `<circle cx="${a[0]}" cy="${a[1]}" r="${lbl ? 8.5 : 3.4}"/>${lbl ? `<text x="${a[0]}" y="${a[1] + 3.5}" text-anchor="middle">${lbl[i % lbl.length]}</text>` : ''}`; R.dyn.appendChild(g2); R.nok.push(g2); } };
      const p8 = (i) => [[30, 88, 170, 192][i % 4], i < 4 ? 58 : 80];
      const ps = (i, x0, y0, w, h) => [x0 + ((i * 37) % w), y0 + ((i * 23) % h)];
      if (sec === 0) ekle(8, 'f42-nk-acc', ['ADP', 'Pᵢ'], p8);
      if (sec === 1) ekle(12, 'f42-nk-warn', ['K⁺'], (i) => (i < 7 ? ps(i, 222, 16, 40, 112) : [285, 40 + (i - 7) * 20]));
      if (sec === 2) ekle(8, 'f42-nk-warn', ['La'], p8);
      t0 = 0; kare(RM ? 99 : 0);
    };
    const kare = (dt) => {
      if (!R) return;
      t0 += dt;
      const f = RM ? 1 : clamp(t0 / 2.4, 0, 1);
      R.nok.forEach((g2, i) => g2.setAttribute('opacity', f * R.nok.length > i ? 1 : 0));
      R.gl.forEach((c, i) => c.setAttribute('opacity', sec === 3 ? (f * R.gl.length > i ? 0.08 : 1) : 1));
    };
    const kur = (i) => { sec = i; basSec(el, 'y', i); capYaz(el, CAP[i]); ciz(); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-y]'); if (b) kur(+b.dataset.y); });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, kare);
    return () => { d1(); stop(); };
  };

  /* =====================================================================
     5 · f42_bekle — beklenti: sprint ya da maraton (K1 s. 179–180)
     ===================================================================== */
  VIZ.f42_bekle = (el) => {
    const CAP = {
      sp: '<b>Sprint bekleniyor.</b> Kısa mesafede HR\'yi maksimuma yaklaştırmaya zaman yoktur; bu yüzden beklentide HR daha çok artar. Maratonu seçin. [[K1 s. 180]]',
      ma: '<b>Maraton bekleniyor.</b> Uzun koşuda kardiyovasküler yanıtı başlatmak için bol zaman vardır; beklentideki HR artışı daha küçüktür. Yanıtın beklenen süre ve yoğunluğa göre ayarlanması ileri beslemeli kontroldür. [[K1 s. 180]]',
    };
    let mod = 'sp', dar = false, t = 0, R = null;
    el.innerHTML = `<div class="f42-ust">${segHtml('Beklenen egzersiz', 'b', [['sp', 'Sprint bekleniyor'], ['ma', 'Maraton bekleniyor']], 'sp')}<button type="button" class="btn ghost" data-a="yen">Yeniden oynat</button></div><div class="f42-sahne f42-gen-m"></div>`;
    const sahne = el.querySelector('.f42-sahne');
    const kart = (i, x, y, w, h) => {
      const cx = x + w / 2;
      let s = `<g class="f42-kart" data-i="${i}"><rect class="f42-kart-z" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
      const ty = y + 18, iy = y + 42, l1 = y + h - 26, l2 = y + h - 11;
      if (i === 0) s += T(x + 10, ty, '1 · Venler', 'f42-t f42-gb') + `<path class="f42-tup-v" d="M${x + 14} ${iy - 9} H${cx - 12} C${cx} ${iy - 9} ${cx} ${iy - 4} ${cx + 12} ${iy - 4} H${x + w - 14} V${iy + 4} H${cx + 12} C${cx} ${iy + 4} ${cx} ${iy + 9} ${cx - 12} ${iy + 9} H${x + 14} Z"/>` + T(x + 10, l1, 'venokonstriksiyon', 'f42-ts f42-ink') + T(x + 10, l2, '→ venöz dönüş ↑', 'f42-ts f42-ink');
      if (i === 1) {
        s += T(x + 10, ty, '2 · Kalp', 'f42-t f42-gb');
        const gx = x + w - 34, gy = iy + 8;
        s += `<path class="f42-kalp-i" d="M${x + 30} ${iy - 6} c-8 -10 -22 -5 -17 8 l17 16 l17 -16 c5 -13 -9 -18 -17 -8z"/>`;
        s += `<path class="f42-kadran" d="M${gx - 22} ${gy} A22 22 0 0 1 ${gx + 22} ${gy}"/><line class="f42-ibre" x1="${gx}" y1="${gy}" x2="${gx - 20}" y2="${gy}"/>` + T(gx, gy + 13, 'HR', 'f42-tk', 'middle');
        s += T(x + 10, l1, 'HR, kontraktilite ↑ · CO ↑', 'f42-ts f42-ink') + T(x + 10, l2, mod === 'sp' ? 'daha büyük artış' : 'daha küçük artış', 'f42-ts f42-acc-t');
      }
      if (i === 2) s += T(x + 10, ty, '3 · İskelet kası', 'f42-t f42-gb') + `<path class="f42-tup-k" d="M${x + 14} ${iy - 4} H${cx - 12} C${cx} ${iy - 4} ${cx} ${iy - 10} ${cx + 12} ${iy - 10} H${x + w - 14} V${iy + 10} H${cx + 12} C${cx} ${iy + 10} ${cx} ${iy + 4} ${cx - 12} ${iy + 4} H${x + 14} Z"/>` + T(x + 10, l1, 'kolinerjik vazodilatasyon', 'f42-ts f42-ink') + T(x + 10, l2, 'büyük basınç artışı önlenir', 'f42-ts f42-ink');
      if (i === 3) s += T(x + 10, ty, '4 · Barsak ve deri', 'f42-t f42-gb') + `<path class="f42-tup-a" d="M${x + 14} ${iy - 9} H${cx - 12} C${cx} ${iy - 9} ${cx} ${iy - 4} ${cx + 12} ${iy - 4} H${x + w - 14} V${iy + 4} H${cx + 12} C${cx} ${iy + 4} ${cx} ${iy + 9} ${cx - 12} ${iy + 9} H${x + 14} Z"/>` + T(x + 10, l1, 'vazokonstriksiyon', 'f42-ts f42-ink') + T(x + 10, l2, '(akım kasa yönelir)', 'f42-ts');
      return s + '</g>';
    };
    const ciz = () => {
      let s = svgAc(dar ? '0 0 360 520' : '0 0 560 310', 'Beklenti yanıtı: beyin sempatik etkinliği artırıp parasempatiği azaltır; venler, kalp, iskelet kası ve barsak–deri damarları değişir', dar);
      /* koşucu */
      const rx = dar ? 40 : 52, ry = dar ? 100 : 150;
      s += `<line class="f42-start" x1="${rx - 30}" y1="${ry + 44}" x2="${rx + 34}" y2="${ry + 44}"/>` + T(rx - 30, ry + 60, 'başlangıç', 'f42-tk');
      s += `<g class="f42-kosucu"><circle cx="${rx}" cy="${ry - 30}" r="9"/><path d="M${rx} ${ry - 21} L${rx} ${ry + 8} M${rx} ${ry - 12} L${rx - 13} ${ry - 2} M${rx} ${ry - 12} L${rx + 12} ${ry - 4} M${rx} ${ry + 8} L${rx - 10} ${ry + 44} M${rx} ${ry + 8} L${rx + 12} ${ry + 44}"/></g>`;
      s += `<path class="f42-balon" d="M${rx - 34} ${ry - 92} h68 a10 10 0 0 1 10 10 v18 a10 10 0 0 1 -10 10 h-30 l-8 10 l-2 -10 h-28 a10 10 0 0 1 -10 -10 v-18 a10 10 0 0 1 10 -10z"/>` + T(rx, ry - 70, mod === 'sp' ? '100 m' : '42 km', 'f42-t f42-big', 'middle');
      s += `<circle class="f42-balon" cx="${rx + 4}" cy="${ry - 47}" r="2.5"/>`;
      /* beyin */
      const bx = dar ? 120 : 132, by = dar ? 36 : 122, bw = dar ? 104 : 104;
      s += `<rect class="f42-beyin" x="${bx}" y="${by}" width="${bw}" height="40" rx="18"/>` + T(bx + bw / 2, by + 25, 'Beklenti', 'f42-t f42-gb', 'middle');
      if (dar) {
        s += ok(bx + 30, by + 42, bx + 30, 164, 'f42-ok-acc', 2.4, 7) + T(bx + bw + 8, by + 16, 'Sempatik ↑', 'f42-ts f42-acc-t');
        s += ok(bx + 74, by + 42, bx + 74, 164, 'f42-ok-mut f42-kesik', 1.6, 6) + T(bx + bw + 8, by + 34, 'Parasempatik ↓', 'f42-ts');
      } else {
        s += ok(bx + bw + 4, by + 12, 266, 70, 'f42-ok-acc', 2.4, 7) + T(bx + 4, by - 26, 'Sempatik ↑', 'f42-ts f42-acc-t');
        s += ok(bx + bw + 4, by + 28, 266, 200, 'f42-ok-mut f42-kesik', 1.6, 6) + T(bx + 4, by + 62, 'Parasempatik ↓', 'f42-ts');
      }
      const K = dar ? { x0: 12, y0: 170, w: 164, h: 112, gx: 12, gy: 10 } : { x0: 264, y0: 14, w: 142, h: 108, gx: 8, gy: 10 };
      for (let i = 0; i < 4; i++) s += kart(i, K.x0 + (i % 2) * (K.w + K.gx), K.y0 + Math.floor(i / 2) * (K.h + K.gy), K.w, K.h);
      /* ileri besleme şeması */
      const fy = dar ? 430 : 262;
      const fx = dar ? 14 : 20;
      s += `<rect class="f42-ff" x="${fx}" y="${fy}" width="${dar ? 140 : 160}" height="30" rx="8"/>` + T(fx + (dar ? 70 : 80), fy + 20, 'Beklenti (önceden)', 'f42-ts f42-ink', 'middle');
      s += ok(fx + (dar ? 144 : 164), fy + 15, fx + (dar ? 186 : 216), fy + 15, 'f42-ok-acc', 2, 6);
      s += `<rect class="f42-ff" x="${fx + (dar ? 190 : 220)}" y="${fy}" width="${dar ? 140 : 120}" height="30" rx="8"/>` + T(fx + (dar ? 260 : 280), fy + 20, 'düzeltme', 'f42-ts f42-ink', 'middle');
      s += T(dar ? 14 : fx + 360, dar ? fy + 54 : fy + 13, 'İleri beslemeli kontrol:', 'f42-ts f42-acc-t') + T(dar ? 14 : fx + 360, dar ? fy + 71 : fy + 29, 'bozulma olmadan önce yanıt', 'f42-ts f42-ink');
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { kart: [...svg.querySelectorAll('.f42-kart')], ibre: svg.querySelector('.f42-ibre') };
      t = RM ? 99 : 0; kare(0);
    };
    const kare = (dt) => {
      if (!R) return;
      t += dt;
      R.kart.forEach((k, i) => k.classList.toggle('on', t >= 0.4 + i * 0.5));
      const hed = mod === 'sp' ? 0.82 : 0.42, f = ease((t - 0.9) / 1.2) * hed;
      const l = R.ibre, x1 = +l.getAttribute('x1'), y1 = +l.getAttribute('y1'), a = Math.PI * (1 - f);
      l.setAttribute('x2', x1 + 20 * Math.cos(a)); l.setAttribute('y2', y1 - 20 * Math.sin(a));
    };
    const kur = (m) => { mod = m; basSec(el, 'b', m); capYaz(el, CAP[m]); ciz(); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-b]'); if (b) kur(b.dataset.b); if (e.target.closest('[data-a="yen"]')) ciz(); });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, kare);
    if (RM) kare(0);
    return () => { d1(); stop(); };
  };

  /* =====================================================================
     6 · f42_kdv — yoğunlukla HR, SV, basınç; kas sfinkterleri, CO (K1 s. 180–181)
     ===================================================================== */
  VIZ.f42_kdv = (el) => {
    const CAP = [
      '<b>İstirahat.</b> Prekapiller sfinkterler kapalıdır; kan kas kapiller yataklarından büyük damarlara yönlenir, kas akımı 2–4 mL/100 g/dk\'dır. Yoğunluğu artırın. [[K1 s. 180]]',
      '<b>Hafif.</b> O₂ tüketimiyle orantılı üretilen H⁺, AMP, K⁺ ve fosfat sfinkterleri açar. Sempatik kolinerjik arteriyol genişlemesi CO artışını dengeler, basınç az değişir. [[K1 s. 180]]',
      '<b>Orta.</b> Ön yük artar, art yük azalır, HR ve kontraktilite (sempatik + Bowditch) yükselir. SBP yükselir, DBP aynı kalır ya da düşer; MAP yavaşça artar. [[K1 s. 180]]',
      '<b>Yoğun.</b> CO 5\'ten 25 L/dk\'ya çıkar, %80\'i kasa gider; kas akımı 50–100 mL/100 g/dk. Çok yüksek HR\'de dolum süresi kısalır, atım hacmi düşer. [[K1 s. 180–181]]',
      '<b>Statik egzersiz.</b> Kas kapiller yatakları tıkanır; DBP yükselir, MAP hızla artar. [[K1 s. 180]]',
    ];
    const F = {
      din: { sbp: (x) => 120 + 60 * x, dbp: (x) => 80 - 5 * x },
      sta: { sbp: (x) => 120 + 50 * x, dbp: (x) => 80 + 40 * x },
    };
    const map = (m, x) => F[m].dbp(x) + (F[m].sbp(x) - F[m].dbp(x)) / 3;
    const sv = (x) => (x < 0.5 ? 70 + 50 * ease(x / 0.5) : x < 0.72 ? 120 : 120 - 15 * Math.pow((x - 0.72) / 0.28, 1.4));
    const hr = (x) => 70 + 120 * x;
    let v = 0, mod = 'din', dar = false, R = null, sonCap = -1;
    el.innerHTML = `<div class="f42-kont f42-kont-row">${rngHtml('Yoğunluk', 'Egzersiz yoğunluğu', 0, 100, 0, 1)}${segHtml('Egzersiz biçimi', 'm', [['din', 'Dinamik'], ['sta', 'Statik']], 'din')}<button type="button" class="btn ghost" data-a="oyn"${RM ? ' disabled title="Azaltılmış hareket açık"' : ''}>Oynat</button></div>
      <div class="f42-oku"></div><div class="f42-sahne f42-gen-l"></div><ul class="f42-dort"></ul>`;
    const sahne = el.querySelector('.f42-sahne'), inp = el.querySelector('input'), out = el.querySelector('[data-o]'), okuEl = el.querySelector('.f42-oku'), dort = el.querySelector('.f42-dort'), oyn = el.querySelector('[data-a="oyn"]');
    const ROUTE = (cx) => [[0, 20], [cx, 20], [cx, 128], [176, 128]];
    const KX = [34, 72, 110, 148];
    const ciz = () => {
      const st = mod === 'sta';
      const gx0 = dar ? 46 : 46, gx1 = dar ? 318 : 318;
      const P = dar ? [[22, 122], [154, 250], [282, 380]] : [[22, 118], [146, 238], [266, 358]];
      let s = svgAc(dar ? '0 0 360 660' : '0 0 560 420', 'Egzersiz yoğunluğuyla kan basıncı, atım hacmi ve kalp hızı; kas prekapiller sfinkterleri ve kalp debisi', dar);
      const g1 = grafik({ x0: gx0, x1: gx1, y0: P[0][0], y1: P[0][1], ymin: 0, ymax: 180, grid: [60, 120, 180], ylab: 'Kan basıncı (mmHg)' });
      const g2 = grafik({ x0: gx0, x1: gx1, y0: P[1][0], y1: P[1][1], ymin: 60, ymax: 140, grid: [60, 100, 140], ylab: 'Atım hacmi (mL)' });
      const g3 = grafik({ x0: gx0, x1: gx1, y0: P[2][0], y1: P[2][1], ymin: 0, ymax: 200, grid: [100, 200], ylab: 'Kalp hızı (atım/dk)', xt: YOG });
      s += g1.s + `<path class="f42-tarama"/>` +
        `<path class="f42-hayal f42-s-crit" d="${yolF(F[mod].sbp, 0, 1, g1.X, g1.Y, 20)}"/><path class="f42-hayal f42-s-basic" d="${yolF(F[mod].dbp, 0, 1, g1.X, g1.Y, 20)}"/><path class="f42-hayal f42-s-acc" d="${yolF((x) => map(mod, x), 0, 1, g1.X, g1.Y, 20)}"/>` +
        `<path class="f42-egri f42-s-crit" data-c="sbp"/><path class="f42-egri f42-s-basic" data-c="dbp"/><path class="f42-egri f42-s-acc f42-kesik" data-c="map"/>` +
        T(gx1 + 4, g1.Y(F[mod].sbp(1)) + 4, 'SBP', 'f42-ts f42-crit-t') + T(gx1 + 4, g1.Y(map(mod, 1)) + (st ? 4 : 2), 'MAP', 'f42-ts f42-acc-t') + T(gx1 + 4, g1.Y(F[mod].dbp(1)) + (st ? 10 : 6), 'DBP', 'f42-ts f42-basic-t') +
        T(gx0 + 8, P[0][1] - 8, st ? 'MAP hızla ↑' : 'Nabız basıncı genişler', 'f42-ts f42-not f42-acc-t');
      s += `<g class="${st ? 'f42-soluk' : ''}">${g2.s}<path class="f42-hayal f42-s-ok" d="${yolF(sv, 0, 1, g2.X, g2.Y)}"/><path class="f42-egri f42-s-ok" data-c="sv"/></g>` +
        (st ? T((gx0 + gx1) / 2, (P[1][0] + P[1][1]) / 2 + 4, 'statik için çizilmedi', 'f42-t', 'middle') : T(g2.X(0.98), g2.Y(134), 'dolum süresi kısalır → SV ↓', 'f42-ts f42-not f42-warn-t', 'end'));
      s += g3.s + `<path class="f42-hayal f42-s-crit" d="${yolF(hr, 0, 1, g3.X, g3.Y, 10)}"/><path class="f42-egri f42-s-crit" data-c="hr"/>` + T(gx0 + 8, g3.Y(185), 'yoğunlukla orantılı', 'f42-ts f42-not');
      s += T((gx0 + gx1) / 2, P[2][1] + 34, 'Egzersiz yoğunluğu', 'f42-tk', 'middle');
      s += `<line class="f42-imlec" y1="${P[0][0] - 4}" y2="${P[2][1]}"/>` + [0, 1, 2].map((i) => `<circle class="f42-nok" data-n="${i}" r="4.5"/>`).join('') + `<circle class="f42-nok f42-nok-b" data-n="3" r="4.5"/><circle class="f42-nok f42-nok-a" data-n="4" r="4"/>`;
      /* kas kesiti */
      const mx = dar ? 12 : 372, my = dar ? 448 : 26;
      s += `<g transform="translate(${mx} ${my})">` + T(0, -8, 'Kas: prekapiller sfinkterler', 'f42-t f42-gb');
      s += `<rect class="f42-lif-k ${st ? 'f42-sik' : ''}" x="0" y="0" width="180" height="150" rx="14"/>`;
      s += `<path class="f42-damar f42-art" d="M-4 20 H176"/><path class="f42-damar f42-ven" d="M30 128 H180"/>` + T(176, 14, 'büyük damarlar →', 'f42-tk', 'end');
      KX.forEach((cx, i) => { s += `<line class="f42-kapl ${st ? 'f42-kap-bas2' : ''}" data-i="${i}" x1="${cx}" y1="30" x2="${cx}" y2="128"/><g class="f42-sfk" data-i="${i}"><rect class="f42-sf" x="${cx - 9}" y="27" width="6" height="6" rx="1.5"/><rect class="f42-sf" x="${cx + 3}" y="27" width="6" height="6" rx="1.5"/></g>`; });
      s += `<g class="f42-met"></g><g class="f42-par"></g>`;
      s += T(90, 146, 'H⁺ · AMP · K⁺ · fosfat', 'f42-tk f42-met-t', 'middle');
      s += T(0, 172, '', 'f42-ts f42-ink f42-akim') + '</g>';
      /* CO çubuğu */
      const cx0 = dar ? 236 : 404, cy0 = dar ? 452 : 236, ch = dar ? 168 : 150;
      s += `<g class="${st ? 'f42-soluk' : ''}">` + T(cx0 - (dar ? 0 : 32), cy0 - 10, 'Kalp debisi', 'f42-t f42-gb') + `<rect class="f42-bar-z" x="${cx0}" y="${cy0}" width="36" height="${ch}" rx="6"/><rect class="f42-co" x="${cx0}" width="36" rx="6"/><rect class="f42-co-kas" x="${cx0}" width="36" rx="6"/>`;
      s += T(cx0 + 44, cy0 + 14, '', 'f42-ts f42-ink f42-co-t') + T(cx0 + 44, cy0 + 30, '', 'f42-ts f42-clin-t f42-co-k') + T(cx0 + 44, cy0 + 46, '', 'f42-ts f42-co-k2') + T(cx0 + 44, cy0 + ch, 'kas payı', 'f42-tk f42-clin-t') + (st ? T(cx0 + 44, cy0 + ch - 20, 'statik için gösterilmedi', 'f42-tk') : '') + '</g>';
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { g1, g2, g3, P, cy0, ch, svg, c: {}, n: [...svg.querySelectorAll('.f42-nok')], im: svg.querySelector('.f42-imlec'), tar: svg.querySelector('.f42-tarama'),
        kap: [...svg.querySelectorAll('.f42-kapl')], sfk: [...svg.querySelectorAll('.f42-sfk')], met: svg.querySelector('.f42-met'), par: svg.querySelector('.f42-par'), akim: svg.querySelector('.f42-akim'), metT: svg.querySelector('.f42-met-t'),
        co: svg.querySelector('.f42-co'), cok: svg.querySelector('.f42-co-kas'), coT: svg.querySelector('.f42-co-t'), coK: svg.querySelector('.f42-co-k'), coK2: svg.querySelector('.f42-co-k2'), notlar: [...svg.querySelectorAll('.f42-not')], dots: [] };
      svg.querySelectorAll('[data-c]').forEach((p) => { R.c[p.dataset.c] = p; });
      for (let i = 0; i < 22; i++) { const m = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); m.setAttribute('r', 2.4); m.setAttribute('class', 'f42-f-warn'); m.setAttribute('cx', 14 + ((i * 47) % 152)); m.setAttribute('cy', 44 + ((i * 29) % 74)); R.met.appendChild(m); }
      if (!RM) for (let i = 0; i < 16; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', 2.6); R.par.appendChild(c); R.dots.push({ c, u: i / 16, r: i % 4, sec: (i * 0.618) % 1 }); }
      guncelle();
    };
    const guncelle = () => {
      const x = v / 100, st = mod === 'sta';
      out.textContent = `${v} · ${yogAd(v)}`; inp.setAttribute('aria-valuetext', `${yogAd(v)} (${v})`);
      if (R) {
        const { g1, g2, g3 } = R;
        R.c.sbp.setAttribute('d', yolF(F[mod].sbp, 0, Math.max(x, 0.001), g1.X, g1.Y, 30));
        R.c.dbp.setAttribute('d', yolF(F[mod].dbp, 0, Math.max(x, 0.001), g1.X, g1.Y, 30));
        R.c.map.setAttribute('d', yolF((u) => map(mod, u), 0, Math.max(x, 0.001), g1.X, g1.Y, 30));
        R.c.sv.setAttribute('d', st ? '' : yolF(sv, 0, Math.max(x, 0.001), g2.X, g2.Y, 50));
        R.c.hr.setAttribute('d', yolF(hr, 0, Math.max(x, 0.001), g3.X, g3.Y, 30));
        const tar = st ? '' : yolF(F[mod].sbp, 0, Math.max(x, 0.001), g1.X, g1.Y, 20) + yolF(F[mod].dbp, Math.max(x, 0.001), 0, g1.X, g1.Y, 20).replace('M', 'L') + 'Z';
        R.tar.setAttribute('d', tar);
        const X = g1.X(x);
        R.im.setAttribute('x1', X); R.im.setAttribute('x2', X);
        const pts = [[g1.Y(F[mod].sbp(x))], [st ? -99 : g2.Y(sv(x))], [g3.Y(hr(x))], [g1.Y(F[mod].dbp(x))], [g1.Y(map(mod, x))]];
        R.n.forEach((c) => { const i = +c.dataset.n; c.setAttribute('cx', X); c.setAttribute('cy', pts[i][0]); c.style.display = pts[i][0] < 0 ? 'none' : ''; });
        R.notlar[0].style.opacity = x > 0.4 ? 1 : 0;
        if (R.notlar[1]) R.notlar[1].style.opacity = x > 0.78 && !st ? 1 : 0;
        R.notlar[R.notlar.length - 1].style.opacity = x > 0.3 ? 1 : 0;
        /* sfinkterler */
        const o = st ? 0 : clamp(x * 1.25, 0, 1);
        R.kap.forEach((k) => { k.setAttribute('stroke-width', st ? 1.2 : 1 + 4 * o); });
        R.sfk.forEach((g, i) => { const d = 3 * o + (st ? 0 : 0); const r = g.querySelectorAll('rect'); r[0].setAttribute('x', KX[i] - 6 - d); r[1].setAttribute('x', KX[i] + 0 + d); });
        const nm = Math.round((st ? 0.9 : x) * 22);
        [...R.met.children].forEach((m, i) => m.setAttribute('opacity', i < nm ? 0.85 : 0));
        R.metT.style.opacity = x > 0.05 ? 1 : 0;
        R.akim.textContent = st ? (v > 0 ? 'Kapiller yataklar tıkanır' : 'Kas akımı: 2–4 mL/100 g/dk') : v === 0 ? 'Kas akımı: 2–4 mL/100 g/dk' : v === 100 ? 'Kas akımı: 50–100 mL/100 g/dk' : 'Kas akımı ↑';
        R.akim.setAttribute('class', 'f42-ts ' + (st && v > 0 ? 'f42-warn-t' : 'f42-ink') + ' f42-akim');
        /* CO */
        const co = 5 + 20 * x, kp = 0.2 + 0.6 * x, H = (R.ch * co) / 25, Hk = H * kp;
        R.co.setAttribute('y', R.cy0 + R.ch - H); R.co.setAttribute('height', H);
        R.cok.setAttribute('y', R.cy0 + R.ch - Hk); R.cok.setAttribute('height', Hk);
        R.coT.textContent = v === 0 ? 'CO 5 L/dk' : v === 100 ? 'CO 25 L/dk (×5)' : `CO ≈ ${fmt(co)} L/dk`;
        R.coK.textContent = v === 0 ? 'kas %20' : v === 100 ? 'kas %80' : `kas ≈ %${Math.round(kp * 100)}`;
        R.coK2.textContent = v === 0 ? '(1000 mL/dk)' : '';
      }
      const lit = v > 10;
      dort.innerHTML = [
        ['Ön yük ↑', 'venokonstriksiyon, kas ve solunum pompası'],
        st ? ['SVR ↑', 'kapiller yataklar tıkanır', 'w'] : ['Art yük ↓', 'SVR düşer (metabolitler)'],
        ['HR ↑', 'parasempatik ↓ sempatik ↑'],
        ['Kontraktilite ↑', 'sempatik + Bowditch'],
      ].map(([a, b, w]) => `<li class="${lit ? 'on' : ''} ${w ? 'w' : ''}"><b>${a}</b> · ${b}</li>`).join('');
      okuEl.innerHTML = `<span><i class="f42-i-crit"></i>HR ${v === 0 ? '' : '≈ '}${Math.round(hr(x))}</span>${st ? '' : `<span><i class="f42-i-ok"></i>SV ${v === 0 ? '' : '≈ '}${Math.round(sv(x))} mL</span>`}<span><i class="f42-i-crit"></i>SBP ≈ ${Math.round(F[mod].sbp(x))}</span><span><i class="f42-i-basic"></i>DBP ≈ ${Math.round(F[mod].dbp(x))}</span><span><i class="f42-i-acc"></i>MAP ≈ ${Math.round(map(mod, x))} mmHg</span>`;
      const ci = st && v > 0 ? 4 : v === 0 ? 0 : v <= 33 ? 1 : v <= 67 ? 2 : 3;
      if (ci !== sonCap) { sonCap = ci; capYaz(el, CAP[ci]); }
    };
    const kare = (dt) => {
      if (!R || !R.dots.length) return;
      const o = mod === 'sta' ? 0 : clamp((v / 100) * 1.25, 0, 1);
      R.dots.forEach((d) => {
        d.u += dt * (mod === 'sta' ? 0.12 : 0.35 + 0.4 * o);
        if (d.u >= 1) { d.u -= 1; d.kap = d.sec < o * 0.9 + (mod === 'sta' ? 0 : 0); d.sec = (d.sec + 0.618) % 1; }
        let x, y, cls = 'f42-f-crit';
        if (d.kap) {
          const r = ROUTE(KX[d.r]), segs = [r[1][0] - r[0][0], r[2][1] - r[1][1], r[3][0] - r[2][0]], L = segs[0] + segs[1] + segs[2];
          let q = d.u * L;
          if (q < segs[0]) { x = q; y = 20; } else if (q < segs[0] + segs[1]) { q -= segs[0]; x = r[1][0]; y = 20 + q; cls = q > segs[1] * 0.5 ? 'f42-f-basic' : 'f42-f-crit'; } else { q -= segs[0] + segs[1]; x = r[2][0] + q; y = 128; cls = 'f42-f-basic'; }
        } else { x = -4 + d.u * 180; y = 20; }
        d.c.setAttribute('cx', x); d.c.setAttribute('cy', y); d.c.setAttribute('class', cls);
      });
    };
    const O = oynatici(el, 8, (u) => { v = Math.round(u * 100); inp.value = v; guncelle(); }, () => { oyn.textContent = 'Oynat'; });
    oyn.addEventListener('click', () => { if (O.calisiyor()) { O.dur(); oyn.textContent = 'Oynat'; } else { O.bas(v >= 100 ? 0 : v / 100); oyn.textContent = 'Duraklat'; } });
    inp.addEventListener('input', () => { O.dur(); oyn.textContent = 'Oynat'; v = +inp.value; guncelle(); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (b) { mod = b.dataset.m; basSec(el, 'm', mod); sonCap = -1; ciz(); } });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, kare);
    return () => { d1(); O.stop(); stop(); };
  };

  /* =====================================================================
     7 · f42_akim — CO'nun organlara dağılımı (K1 s. 180–181)
     ===================================================================== */
  VIZ.f42_akim = (el) => {
    const CAP = {
      ist: '<b>İstirahat: CO 5 L/dk.</b> Kas yaklaşık %20 (1000 mL/dk), koroner dolaşım 250 mL/dk alır. Ağır egzersizi seçin. [[K1 s. 180–181]]',
      egz: '<b>Ağır egzersiz: CO 25 L/dk.</b> Kas payı %80\'e çıkar; koroner akım beş kat artar (1250 mL/dk), deri akımı ısı için artar. Splanknik akım belirgin, renal akım daha az düşer; serebral akım değişmez. [[K1 s. 180–181]]',
    };
    const ORG = [
      ['İskelet kası', 1, 40, 'f42-f-ok', '%20 · 1000 mL/dk', '%80 · ≈ 20 L/dk'],
      ['Koroner', 1, 26, 'f42-f-crit', '250 mL/dk', '1250 mL/dk (×5)'],
      ['Deri', 1, 22, 'f42-f-crit', 'istirahat', 'belirgin ↑ · ısı atımı'],
      ['Splanknik', -1, 32, 'f42-f-warn', 'istirahat', 'belirgin ↓'],
      ['Böbrek', -1, 16, 'f42-f-warn', 'istirahat', '↓ · daha güçlü otoregülasyon'],
      ['Beyin', 0, 0, 'f42-f-ok', 'istirahat', 'değişmez'],
    ];
    let mod = 'ist', f = 0, hedef = 0, dar = false, R = null;
    el.innerHTML = `<div class="f42-ust">${segHtml('Durum', 'a', [['ist', 'İstirahat'], ['egz', 'Ağır egzersiz']], 'ist')}</div><div class="f42-sahne f42-gen-m"></div>`;
    const sahne = el.querySelector('.f42-sahne');
    const ciz = () => {
      let s = svgAc(dar ? '0 0 360 470' : '0 0 560 320', 'Kalp debisi ve organlara dağılımı: istirahat ve ağır egzersiz', dar);
      if (dar) s += T(16, 20, 'Kalp debisi (CO)', 'f42-t f42-gb') + `<rect class="f42-bar-z" x="16" y="30" width="328" height="28" rx="8"/><rect class="f42-co" x="16" y="30" height="28" rx="8"/><rect class="f42-co-kas" x="16" y="30" height="28" rx="8"/>` + T(16, 78, '', 'f42-ts f42-ink f42-co-t') + T(344, 78, '', 'f42-ts f42-clin-t f42-co-k', 'end');
      else s += T(30, 22, 'Kalp debisi', 'f42-t f42-gb') + `<rect class="f42-bar-z" x="40" y="34" width="54" height="250" rx="8"/><rect class="f42-co" x="40" width="54" rx="8"/><rect class="f42-co-kas" x="40" width="54" rx="8"/>` + T(67, 302, '', 'f42-ts f42-ink f42-co-t', 'middle') + T(104, 0, '', 'f42-ts f42-clin-t f42-co-k');
      ORG.forEach(([ad, dir, boy, cls], i) => {
        const y = dar ? 106 + i * 60 : 30 + i * 48;
        const x = dar ? 16 : 180;
        s += `<rect class="f42-gkutu" x="${x}" y="${y - 4}" width="${dar ? 328 : 370}" height="${dar ? 52 : 42}" rx="9"/>`;
        s += T(x + 12, y + (dar ? 18 : 22), ad, 'f42-t f42-gb');
        const ax = dar ? x + 300 : x + 150, ay = y + (dar ? 22 : 17);
        s += `<g class="f42-org-ok" data-i="${i}" transform="translate(${ax} ${ay})">${yonOk(0, 0, dir, boy * (dar ? 0.9 : 0.9), dir === 0 ? 'f42-f-ok' : cls)}</g>`;
        s += T(dar ? x + 12 : x + 178, y + (dar ? 38 : 22), '', 'f42-ts f42-ink f42-org-t');
      });
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { co: svg.querySelector('.f42-co'), cok: svg.querySelector('.f42-co-kas'), coT: svg.querySelector('.f42-co-t'), coK: svg.querySelector('.f42-co-k'), ok: [...svg.querySelectorAll('.f42-org-ok')], t: [...svg.querySelectorAll('.f42-org-t')] };
      boya();
    };
    const boya = () => {
      if (!R) return;
      const e = ease(f), co = 5 + 20 * e, kp = 0.2 + 0.6 * e;
      if (dar) { R.co.setAttribute('width', (328 * co) / 25); R.cok.setAttribute('width', (328 * co * kp) / 25); }
      else { const H = (250 * co) / 25, Hk = H * kp; R.co.setAttribute('y', 284 - H); R.co.setAttribute('height', H); R.cok.setAttribute('y', 284 - Hk); R.cok.setAttribute('height', Hk); R.coK.setAttribute('y', 284 - Hk / 2 + 4); }
      R.coT.textContent = f > 0.5 ? 'CO 25 L/dk (×5)' : 'CO 5 L/dk';
      R.coK.textContent = f > 0.5 ? 'kas %80' : 'kas %20';
      R.ok.forEach((g, i) => { const tr = g.getAttribute('transform').replace(/ scale\([^)]*\)/, ''); const k = i < 2 ? 0.35 + 0.65 * e : e; g.setAttribute('transform', tr + ` scale(${Math.max(0.001, k)})`); g.style.opacity = i < 2 || f > 0.02 ? 1 : 0; });
      R.t.forEach((t2, i) => { t2.textContent = f > 0.5 ? ORG[i][5] : ORG[i][4]; t2.setAttribute('class', 'f42-ts f42-org-t ' + (f > 0.5 || i < 2 ? 'f42-ink' : '')); });
    };
    const kare = (dt) => { if (f === hedef) return; f = hedef > f ? Math.min(hedef, f + dt / 0.8) : Math.max(hedef, f - dt / 0.8); boya(); };
    const kur = (m) => { mod = m; hedef = m === 'egz' ? 1 : 0; basSec(el, 'a', m); capYaz(el, CAP[m]); if (RM) { f = hedef; boya(); } };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-a]'); if (b) kur(b.dataset.a); });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, kare);
    return () => { d1(); stop(); };
  };

  /* =====================================================================
     8 · f42_solunum — V̇E, MPAP, V̇/Q̇, PaO₂ yoğunlukla (K1 s. 181–182)
     ===================================================================== */
  VIZ.f42_solunum = (el) => {
    const CAP = [
      '<b>Başlangıç.</b> V̇E hızla sıçrar; hem solunum hızı hem tidal hacim artar. Solunum merkezini motor korteks etkinliği ve eklem proprioseptörlerinden gelen uyarılar uyarır. Yoğunluğu artırın. [[K1 s. 181–182]]',
      '<b>Orantılı artış.</b> CO₂ kas metabolizmasının yan ürünüdür; V̇E yoğunlukla orantılı artar. Pulmoner akım CO kadar artar ama damar yatağının açılması ve genişlemesi sayesinde MPAP yalnız hafif yükselir; V̇/Q̇ 1,0\'a yaklaşır. [[K1 s. 182]]',
      '<b>Anaerobik eşik.</b> O₂ sunumu tüketimi karşılayamaz, anaerobik metabolizma başlar. Laktik asit pH\'yi düşürür, karotis cisimcikleri solunum merkezini ayrıca uyarır ve V̇E orantısız artar. PaO₂ yine normaldir; P50 sağa kayar. [[K1 s. 182]]',
    ];
    const ve = (x) => { const p = x * 100; return p <= 5 ? 5 + 15 * (p / 5) : p <= 70 ? 20 + (40 * (p - 5)) / 65 : 60 + (40 * (p - 70)) / 30; };
    const mpap = (x) => 15 + 7 * x;
    const karsi = (x) => Math.min(30, 15 + 25 * x);
    let v = 0, dar = false, R = null, sonCap = -1;
    el.innerHTML = `<div class="f42-kont f42-kont-row">${rngHtml('Yoğunluk', 'Egzersiz yoğunluğu', 0, 100, 0, 1)}<button type="button" class="btn ghost" data-a="oyn"${RM ? ' disabled title="Azaltılmış hareket açık"' : ''}>Oynat</button></div>
      <div class="f42-sahne f42-gen-l"></div><dl class="f42-kv"></dl>`;
    const sahne = el.querySelector('.f42-sahne'), inp = el.querySelector('input'), out = el.querySelector('[data-o]'), kv = el.querySelector('.f42-kv'), oyn = el.querySelector('[data-a="oyn"]');
    const ciz = () => {
      let s = svgAc(dar ? '0 0 360 700' : '0 0 560 430', 'Egzersiz yoğunluğuyla dakika ventilasyonu ve ortalama pulmoner arter basıncı; solunum merkezine gelen uyaranlar ve akciğerde V/Q', dar);
      const gx0 = 46, gx1 = dar ? 344 : 330;
      const A = dar ? [24, 170] : [24, 190], B = dar ? [212, 320] : [236, 350];
      const g1 = grafik({ x0: gx0, x1: gx1, y0: A[0], y1: A[1], ymin: 0, ymax: 100, grid: [50, 100], ylab: 'Dakika ventilasyonu (L/dk)' });
      const g2 = grafik({ x0: gx0, x1: gx1, y0: B[0], y1: B[1], ymin: 0, ymax: 30, grid: [10, 20, 30], ylab: 'Ort. pulmoner arter basıncı (mmHg)', xt: YOG });
      s += `<defs><clipPath id="f42-mp-k"><rect x="${gx0}" y="${B[0]}" width="${gx1 - gx0}" height="${B[1] - B[0]}"/></clipPath></defs>`;
      s += `<rect class="f42-bas-bant" x="${g1.X(0)}" y="${A[0]}" width="${g1.X(0.05) - g1.X(0)}" height="${A[1] - A[0]}"/>`;
      s += g1.s + `<line class="f42-esik" x1="${g1.X(0.7)}" y1="${A[0]}" x2="${g1.X(0.7)}" y2="${A[1]}"/>` + `<path class="f42-hayal f42-s-basic" d="${yolF(ve, 0, 1, g1.X, g1.Y, 100)}"/><path class="f42-egri f42-s-basic" data-c="ve"/>`;
      s += `<g class="f42-ann" data-u="0.02">${T(g1.X(0.06), g1.Y(24), 'Başlangıç artışı', 'f42-ts f42-ink')}</g>`;
      s += `<g class="f42-ann" data-u="0.3">${T(g1.X(0.3), g1.Y(dar ? 46 : 44), 'CO₂ ile orantılı', 'f42-ts f42-ink', 'middle')}</g>`;
      s += `<g class="f42-ann" data-u="0.68">${T(g1.X(0.68), g1.Y(dar ? 96 : 95), 'Anaerobik eşik', 'f42-ts f42-warn-t', 'end')}${T(g1.X(0.68), g1.Y(dar ? 85 : 86), 'asidoz V̇E\'yi', 'f42-ts f42-ink', 'end')}${T(g1.X(0.68), g1.Y(dar ? 76 : 78), 'ayrıca artırır', 'f42-ts f42-ink', 'end')}</g>`;
      s += g2.s + `<g clip-path="url(#f42-mp-k)"><path class="f42-hayal f42-karsi" d="${yolF((x) => 15 + 25 * x, 0, 1, g2.X, g2.Y, 10)}"/></g>` + `<path class="f42-hayal f42-s-basic" d="${yolF(mpap, 0, 1, g2.X, g2.Y, 10)}"/><path class="f42-egri f42-s-basic" data-c="mp"/>`;
      s += T(g2.X(0.3), g2.Y(28.5), 'açılma ve genişleme olmasaydı', 'f42-ts', 'start') + T(g2.X(0.98), g2.Y(mpap(1)) + 16, 'hafif artış', 'f42-ts f42-basic-t', 'end');
      s += T((gx0 + gx1) / 2, B[1] + 34, 'Egzersiz yoğunluğu', 'f42-tk', 'middle');
      s += `<line class="f42-imlec" y1="${A[0] - 4}" y2="${B[1]}"/><circle class="f42-nok f42-nok-b" data-n="0" r="4.5"/><circle class="f42-nok f42-nok-b" data-n="1" r="4.5"/>`;
      /* uyaran paneli */
      const px = dar ? 16 : 352, py = dar ? 374 : 18, pw = dar ? 328 : 200;
      const KAY = [['Motor korteks +', 'eklem proprioseptörleri', 0], ['CO₂', '(kas metabolizması)', 0.05], ['Karotis cisimcikleri', '← laktik asit, pH ↓', 0.7]];
      const bh = dar ? 40 : 44, gap = dar ? 8 : 10;
      s += `<line class="f42-bus" x1="${px + 6}" y1="${py + bh / 2}" x2="${px + 6}" y2="${py + 3 * (bh + gap) + 18}"/>`;
      KAY.forEach(([a, b, e], i) => {
        const y = py + i * (bh + gap), w = dar ? pw - 22 : pw - 22;
        s += `<g class="f42-uy${i === 2 ? ' w' : ''}" data-e="${e}"><line class="f42-bus-s" x1="${px + 6}" y1="${y + bh / 2}" x2="${px + 18}" y2="${y + bh / 2}"/><rect x="${px + 18}" y="${y}" width="${w}" height="${bh}" rx="9"/>${T(px + 28, y + (dar ? 17 : 18), a, 'f42-ts f42-ink')}${T(px + 28, y + (dar ? 32 : 34), b, 'f42-ts')}</g>`;
      });
      const my = py + 3 * (bh + gap) + 4;
      s += ok(px + 6, my - 4, px + 6, my + 14, 'f42-ok-acc', 2, 6);
      s += `<rect class="f42-merkez" x="${px}" y="${my + 16}" width="${pw}" height="${dar ? 34 : 36}" rx="10"/>` + T(px + pw / 2, my + (dar ? 38 : 39), 'Solunum merkezi', 'f42-t f42-gb', 'middle');
      s += T(px + pw / 2, my + (dar ? 68 : 72), 'solunum hızı ↑ · tidal hacim ↑', 'f42-ts f42-ink', 'middle');
      /* akciğer */
      const lx = dar ? 16 : 360, ly = my + (dar ? 92 : 100);
      const lung = (ox) => `<path d="M${ox} ${ly} c-26 4 -34 40 -32 70 c2 14 24 14 32 6 z"/>`;
      s += `<defs><linearGradient id="f42-vq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="f42-vq-ust"/><stop offset="1" class="f42-vq-alt"/></linearGradient></defs>`;
      s += `<g class="f42-akc"><g class="f42-akc-g" fill="url(#f42-vq)">${lung(lx + 36)}<g transform="translate(${2 * (lx + 36) + 16} 0) scale(-1 1)">${lung(lx + 36)}</g></g><g class="f42-akc-e">${lung(lx + 36)}<g transform="translate(${2 * (lx + 36) + 16} 0) scale(-1 1)">${lung(lx + 36)}</g></g></g>`;
      s += `<path class="f42-trakea" d="M${lx + 44} ${ly - 14} V${ly + 4} M${lx + 44} ${ly + 4} L${lx + 36} ${ly + 10} M${lx + 44} ${ly + 4} L${lx + 52} ${ly + 10}"/>`;
      s += T(lx + 96, ly + 8, 'V̇/Q̇', 'f42-t f42-gb') + T(lx + 96, ly + 26, 'tepe: yüksek', 'f42-ts f42-akc-u') + T(lx + 96, ly + 42, 'taban: düşük', 'f42-ts f42-akc-a') + T(lx + 96, ly + 62, '', 'f42-ts f42-ok-t f42-akc-n');
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { g1, g2, A, B, svg, ve: svg.querySelector('[data-c="ve"]'), mp: svg.querySelector('[data-c="mp"]'), im: svg.querySelector('.f42-imlec'), n: [...svg.querySelectorAll('.f42-nok')], ann: [...svg.querySelectorAll('.f42-ann')], uy: [...svg.querySelectorAll('.f42-uy')], ae: svg.querySelector('.f42-akc-e'), an: svg.querySelector('.f42-akc-n'), au: svg.querySelector('.f42-akc-u'), aa: svg.querySelector('.f42-akc-a') };
      guncelle();
    };
    const guncelle = () => {
      const x = v / 100;
      out.textContent = `${v} · ${yogAd(v)}`; inp.setAttribute('aria-valuetext', `${yogAd(v)} (${v})`);
      if (R) {
        const { g1, g2 } = R;
        R.ve.setAttribute('d', yolF(ve, 0, Math.max(x, 0.001), g1.X, g1.Y, Math.max(4, Math.round(x * 100))));
        R.mp.setAttribute('d', yolF(mpap, 0, Math.max(x, 0.001), g2.X, g2.Y, 10));
        const X = g1.X(x); R.im.setAttribute('x1', X); R.im.setAttribute('x2', X);
        R.n[0].setAttribute('cx', X); R.n[0].setAttribute('cy', g1.Y(ve(x))); R.n[1].setAttribute('cx', X); R.n[1].setAttribute('cy', g2.Y(mpap(x)));
        R.ann.forEach((a) => { a.style.opacity = x >= +a.dataset.u ? 1 : 0; });
        R.uy.forEach((u) => u.classList.toggle('on', x >= +u.dataset.e || (+u.dataset.e === 0)));
        R.ae.style.opacity = x; R.an.textContent = x > 0.5 ? 'yerçekimi etkisi ↓, fizyolojik şant ↓' : '';
        R.au.textContent = x > 0.5 ? 'tepe ve taban eşitlenir' : 'tepe: yüksek'; R.aa.textContent = x > 0.5 ? '' : 'taban: düşük';
      }
      const vq = 0.8 + 0.2 * x;
      kv.innerHTML = [
        ['V̇O₂', v === 0 ? '250 mL/dk (bazal)' : v === 100 ? '5000 mL/dk' : '250 → 5000 mL/dk arasında ↑'],
        ['V̇E', v === 0 ? '5 L/dk' : v === 100 ? '100 L/dk (×20)' : `≈ ${Math.round(ve(x))} L/dk`],
        ['CO', '×5 (karşılaştırma)'],
        ['V̇/Q̇', (v === 0 || v === 100 ? '' : '≈ ') + fmt(vq, 2).replace(/0$/, '')],
        ['PaO₂, SaO₂', '<span class="f42-ok-t">normal · difüzyonla sınırlı değil</span>'],
        ['P50', v > 30 ? '<span class="f42-warn-t">sağa kayar · asidoz + sıcaklık → O₂ bırakılır</span>' : 'normal'],
      ].map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
      const ci = v <= 5 ? 0 : v < 70 ? 1 : 2;
      if (ci !== sonCap) { sonCap = ci; capYaz(el, CAP[ci]); }
    };
    const O = oynatici(el, 8, (u) => { v = Math.round(u * 100); inp.value = v; guncelle(); }, () => { oyn.textContent = 'Oynat'; });
    oyn.addEventListener('click', () => { if (O.calisiyor()) { O.dur(); oyn.textContent = 'Oynat'; } else { O.bas(v >= 100 ? 0 : v / 100); oyn.textContent = 'Duraklat'; } });
    inp.addEventListener('input', () => { O.dur(); oyn.textContent = 'Oynat'; v = +inp.value; guncelle(); });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    return () => { d1(); O.stop(); };
  };

  /* =====================================================================
     9 · f42_isi — ısı üretimi, kayıp yolları ve ortam (K1 s. 182)
     ===================================================================== */
  VIZ.f42_isi = (el) => {
    const CAP = {
      il: '<b>Ilıman ortam.</b> Terleme buharlaşmanın gizli ısısıyla, deri vazodilatasyonu kondüksiyonla ısı kaybettirir. Sıcak ya da nemli ortamı seçin. [[K1 s. 182]]',
      si: '<b>Ortam vücuttan sıcak.</b> Kondüksiyonla ısı kaybı için gradyan kalmaz; tek kayıp yolu terlemedir. [[K1 s. 182]]',
      ne: '<b>Sıcak ve nemli ortam.</b> Terin buharlaşması da bozulur; ısı düzenlemesi başarısız olur ve merkezî sıcaklık yükselir. Isı çarpması (> 40,6°C) konfüzyon ve senkop gibi bulgularla görülebilir; hızlı dış soğutma gerekir. [[K1 s. 182]]',
    };
    const OR = { il: { ter: 7, kon: 7, sol: 2, teq: 38 }, si: { ter: 12, kon: 0, sol: 2, teq: 38.8 }, ne: { ter: 3, kon: 3, sol: 2, teq: 41.6 } };
    const sic = (m, u) => (u < 0.16 ? 37 - Math.sin((Math.PI * u) / 0.16) : 37 + (OR[m].teq - 37) * (1 - Math.exp(-(u - 0.16) / 0.22)));
    let mod = 'il', dar = false, R = null, t = 0;
    el.innerHTML = `<div class="f42-ust">${segHtml('Ortam', 'o', [['il', 'Ilıman'], ['si', 'Sıcak (ortam > vücut)'], ['ne', 'Nemli']], 'il')}</div><div class="f42-sahne f42-gen-m"></div>`;
    const sahne = el.querySelector('.f42-sahne');
    const ciz = () => {
      const o = OR[mod];
      let s = svgAc(dar ? '0 0 360 614' : '0 0 560 340', 'Kasta ısı üretimi, terleme, deri vazodilatasyonu ve solunum yoluyla ısı kaybı; merkezî sıcaklığın zaman seyri', dar);
      /* siluet */
      const bx = dar ? 64 : 70, by = 30;
      s += `<g class="f42-insan"><circle cx="${bx}" cy="${by + 14}" r="16"/><rect x="${bx - 24}" y="${by + 36}" width="48" height="92" rx="16"/><rect x="${bx - 22}" y="${by + 122}" width="18" height="96" rx="8"/><rect x="${bx + 4}" y="${by + 122}" width="18" height="96" rx="8"/><rect x="${bx - 38}" y="${by + 40}" width="13" height="78" rx="6"/><rect x="${bx + 25}" y="${by + 40}" width="13" height="78" rx="6"/></g>`;
      s += `<rect class="f42-kasb" x="${bx - 21}" y="${by + 132}" width="13" height="44" rx="6"/><rect class="f42-kasb" x="${bx + 7}" y="${by + 132}" width="13" height="44" rx="6"/>` + T(bx, by + 238, 'kas: ısı üretir', 'f42-ts f42-clin-t', 'middle');
      /* enerji halkası */
      const hx = dar ? 304 : 300, hy = dar ? 232 : 246, hr = 22, c = 2 * Math.PI * hr;
      s += `<circle class="f42-halka-i" cx="${hx}" cy="${hy}" r="${hr}" stroke-dasharray="${c * 0.78} ${c}" transform="rotate(-90 ${hx} ${hy})"/><circle class="f42-halka-m" cx="${hx}" cy="${hy}" r="${hr}" stroke-dasharray="${c * 0.22} ${c}" transform="rotate(${-90 + 0.78 * 360} ${hx} ${hy})"/>`;
      s += T(hx - 32, hy - 4, '%75–80 ısı', 'f42-ts f42-warn-t', 'end') + T(hx - 32, hy + 12, '%20–25 mekanik iş', 'f42-ts f42-clin-t', 'end');
      /* kayıp okları */
      const ax = bx + 40;
      const yol = [
        ['ter', o.ter, by + 70, 'Terleme', mod === 'ne' ? 'buharlaşma bozulur' : 'buharlaşmanın gizli ısısı'],
        ['kon', o.kon, by + 150, 'Deri vazodilatasyonu', mod === 'si' ? 'gradyan yok' : mod === 'ne' ? 'kısıtlı · kondüksiyon' : 'kondüksiyon'],
        ['sol', o.sol, by + 14, 'Solunum', 'nemlendirme · az önemli'],
      ];
      yol.forEach(([k, w, y, a, b]) => {
        const x1 = k === 'sol' ? bx + 16 : ax, x2 = ax + (dar ? 84 : 92);
        const sol = mod === 'ne' && k === 'ter';
        if (w > 0) s += `<g class="${sol ? 'f42-soluk2' : ''}">${ok(x1, y, x2, y, k === 'ter' ? 'f42-ok-basic' : k === 'kon' ? 'f42-ok-crit' : 'f42-ok-mut', w, Math.max(8, w * 1.6))}</g>`;
        else s += `<line class="f42-hayal" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/><path class="f42-carpi" d="M${(x1 + x2) / 2 - 8} ${y - 8} l16 16 M${(x1 + x2) / 2 + 8} ${y - 8} l-16 16"/>`;
        s += T(x2 + 8, y - 3, a, 'f42-ts f42-ink') + T(x2 + 8, y + 13, b, 'f42-ts ' + ((mod === 'si' && k === 'kon') || sol ? 'f42-warn-t' : ''));
      });
      s += `<g class="f42-damla"></g>`;
      s += `<path class="f42-deri-d" d="M${bx + 25} ${by + 150} q6 -6 12 0 t12 0"/>`;
      /* denetim şeması */
      const dy = dar ? 350 : 306, dx = 16;
      const kut = dar ? [['Duyargalar', 92], ['Hipotalamus', 98], ['Efektörler', 92]] : [['Duyargalar (periferik + santral)', 168], ['Hipotalamus', 82], ['Ter bezleri, deri damarları', 156]];
      let xx = dx;
      kut.forEach(([a, w], i) => { s += `<rect class="f42-ff" x="${xx}" y="${dy}" width="${w}" height="26" rx="7"/>` + T(xx + w / 2, dy + 17, a, 'f42-ts f42-ink', 'middle'); if (i < 2) s += ok(xx + w + 1, dy + 13, xx + w + (dar ? 14 : 16), dy + 13, 'f42-ok-acc', 1.6, 5); xx += w + (dar ? 15 : 18); });
      s += T(dx, dy - 8, 'Negatif geri bildirim (Bölüm 89)', 'f42-tk');
      /* sıcaklık eğrisi */
      const G = dar ? { x0: 46, x1: 344, y0: 424, y1: 580 } : { x0: 384, x1: 548, y0: 112, y1: 268 };
      const g = grafik({ ...G, ymin: 36, ymax: 42, grid: [36, 38, 40, 42], ylab: 'Merkezî sıcaklık (°C)', xt: [[0, 'egzersiz başı'], [1, 'süre →']] });
      s += g.s + `<line class="f42-esik2" x1="${G.x0}" y1="${g.Y(40.6)}" x2="${G.x1}" y2="${g.Y(40.6)}"/>` + T(G.x1, g.Y(40.6) - 5, 'Isı çarpması 40,6°C', 'f42-tk f42-crit-t', 'end');
      s += `<path class="f42-hayal f42-s-warn" d="${yolF((u) => sic(mod, u), 0, 1, g.X, g.Y, 60)}"/><path class="f42-egri f42-s-warn f42-sic" d="${yolF((u) => sic(mod, u), 0, 1, g.X, g.Y, 60)}"/>`;
      s += T(g.X(0.2), g.Y(36.35), '−1°C: soğuk venöz kan', 'f42-ts f42-basic-t', 'start');
      if (mod === 'ne') { const rx = dar ? 16 : 362, ry = dar ? 278 : 42, w = dar ? 328 : 192; s += `<rect class="f42-roz-c" x="${rx}" y="${ry}" width="${w}" height="44" rx="10"/>` + T(rx + 10, ry + 18, 'Isı çarpması: konfüzyon, senkop', 'f42-ts f42-crit-t') + T(rx + 10, ry + 35, '→ hızlı dış soğutma', 'f42-ts f42-crit-t'); }
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      const sp = svg.querySelector('.f42-sic');
      R = { sp, L: sp.getTotalLength(), dam: svg.querySelector('.f42-damla'), dots: [], ax, by };
      if (!RM) {
        sp.style.strokeDasharray = R.L; sp.style.strokeDashoffset = R.L;
        const n = mod === 'ne' ? 2 : mod === 'si' ? 6 : 4;
        for (let i = 0; i < n; i++) { const d = document.createElementNS('http://www.w3.org/2000/svg', 'path'); d.setAttribute('class', 'f42-f-basic' + (mod === 'ne' ? ' f42-soluk2' : '')); R.dam.appendChild(d); R.dots.push({ d, u: i / n }); }
      }
      t = 0;
    };
    const kare = (dt) => {
      if (!R) return;
      t += dt;
      R.sp.style.strokeDashoffset = R.L * (1 - clamp(t / 2.5, 0, 1));
      R.dots.forEach((o) => { o.u = (o.u + dt * 0.5) % 1; const x = R.ax - 18 + 10 * Math.sin(o.u * 9), y = R.by + 50 + o.u * 60; o.d.setAttribute('d', `M${x} ${y - 6} q4 6 0 8 q-4 -2 0 -8z`); });
    };
    const kur = (m) => { mod = m; basSec(el, 'o', m); capYaz(el, CAP[m]); ciz(); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-o]'); if (b && b.tagName === 'BUTTON') kur(b.dataset.o); });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, kare);
    return () => { d1(); stop(); };
  };

  /* =====================================================================
     10 · f42_epoc — V̇O₂ max, O₂ açığı ve EPOC (K1 s. 182–184)
     ===================================================================== */
  VIZ.f42_epoc = (el) => {
    const CAPA = '<b>V̇O₂ max.</b> V̇O₂ yoğunlukla doğrusal artar, sonra platoya ulaşır. Plato, vücudun O₂ taşıma ve kullanma kapasitesinin üst sınırıdır. "Zaman seyri"ni seçin. [[K1 s. 182]]';
    const CAPH = '<b>V̇O₂ peak.</b> CPET\'te ölçülen, test süresinde ulaşılan en yüksek V̇O₂\'dir; CPET\'e gönderilen hastaların çoğu platoya hiç ulaşmaz (Bölüm 43). [[K1 s. 183]]';
    const CAPB = [
      '<b>İstirahat.</b> Egzersiz 1. dakikada başlar. İleri ile ilerleyin. [[K1 s. 184]]',
      '<b>O₂ açığı.</b> V̇O₂ yükü hemen karşılayamaz; ideal ile gerçek O₂ alımı arasındaki fark O₂ açığıdır. Ventilasyonu önce sinirsel, sonra kimyasal uyarı artırır. [[K1 s. 184]]',
      '<b>Sabit evre.</b> O₂ alımı gereksinimi karşılar. [[K1 s. 184]]',
      '<b>EPOC: alaktasit evre.</b> Egzersiz bitince V̇O₂ yüksek kalır (O₂ borcu). Hızlı evrede fosfokreatin ve ATP, miyoglobin O₂\'si ve kas ile karaciğer glikojeni yenilenir. [[K1 s. 183]]',
      '<b>EPOC: laktasit evre.</b> Çok daha uzundur: laktatın çoğu karaciğerde pirüvata geri dönüştürülür. Borcun ödenme süresi egzersizin süresi ve yoğunluğuna bağlıdır. [[K1 s. 183]]',
    ];
    const YAN = [
      ['İstirahat', ['V̇O₂ istirahat düzeyinde.']],
      ['O₂ açığı', ['İdeal ile gerçek O₂ alımı arasındaki fark', 'önce sinirsel solunum uyarısı ↑', 'sonra kimyasal solunum uyarısı']],
      ['Sabit evre', ['O₂ alımı gereksinimi karşılar']],
      ['Alaktasit evre (hızlı)', ['fosfokreatin ve ATP', 'miyoglobin O₂\'si', 'kas ve karaciğer glikojeni']],
      ['Laktasit evre (yavaş)', ['laktat → pirüvat (çoğu karaciğerde)', 'Ödenme süresi: kısa yürüyüş → birkaç dakika · maraton → bir günden uzun', 'Uzun vadede: katekolaminler + sıcaklık → metabolizma ↑; günler–haftalar: onarım, hipertrofi']],
    ];
    const SON = [1, 3, 6, 7.5, 10];
    const vo2A = (x) => { const lin = 3.5 + 55.3 * x; return lin < 41 ? lin : lin < 49 ? 41 + 4 * Math.sin(((lin - 41) / 8) * (Math.PI / 2)) : 45; };
    const gercek = (t) => (t <= 1 ? 4 : t <= 6 ? 4 + 26 * (1 - Math.exp(-(t - 1) / 0.55)) : 4 + 18 * Math.exp(-(t - 6) / 0.4) + 8.0 * Math.exp(-(t - 6) / 2.2));
    const ideal = (t) => (t >= 1 && t <= 6 ? 30 : 4);
    let tab = 'A', hasta = false, adim = 0, uc = 1, hedefUc = 1, dar = false, R = null, oto = false, otoT = 0;
    el.innerHTML = `<div class="f42-ust">${segHtml('Grafik', 't', [['A', 'V̇O₂ max'], ['B', 'Zaman seyri']], 'A')}<span class="f42-a-k"><button type="button" class="btn ghost" data-a="has" aria-pressed="false">Hasta (CPET)</button></span>
      <span class="f42-b-k btn-row" hidden><button type="button" class="btn ghost" data-a="geri">‹ Geri</button><span class="f42-adim"></span><button type="button" class="btn ghost" data-a="ileri">İleri ›</button><button type="button" class="btn ghost" data-a="oyn"${RM ? ' disabled title="Azaltılmış hareket açık"' : ''}>Oynat</button></span></div>
      <div class="f42-sahne f42-gen-m"></div><div class="f42-yan"></div>`;
    const sahne = el.querySelector('.f42-sahne'), yan = el.querySelector('.f42-yan'), ak = el.querySelector('.f42-a-k'), bk = el.querySelector('.f42-b-k'), adimEl = el.querySelector('.f42-adim'), oynB = el.querySelector('[data-a="oyn"]'), hasB = el.querySelector('[data-a="has"]');
    const cizA = () => {
      let s = svgAc(dar ? '0 0 360 270' : '0 0 560 300', 'Egzersiz yoğunluğuyla O2 tüketimi: doğrusal artış ve V̇O₂ max platosu', dar);
      const G = dar ? { x0: 44, x1: 344, y0: 28, y1: 222 } : { x0: 58, x1: 540, y0: 28, y1: 250 };
      const g = grafik({ ...G, ymin: 0, ymax: 50, grid: [10, 20, 30, 40, 50], ylab: 'O₂ tüketimi (mL/kg/dk)', xt: YOG });
      s += g.s + T((G.x0 + G.x1) / 2, G.y1 + 34, 'Egzersiz yoğunluğu', 'f42-tk', 'middle');
      const xs = (50 - 3.5) / 55.3;
      s += `<path class="f42-egri f42-hayal2 f42-s-basic f42-ciz" d="${yolF((x) => 3.5 + 55.3 * x, 0, xs, g.X, g.Y, 10)}"/>` + ok(g.X(xs), g.Y(48), g.X(xs), G.y0 - 2, 'f42-ok-basic', 1.6, 6) + T(g.X(xs) - 6, G.y0 + 14, 'Sporcu: daha yüksek', 'f42-ts f42-basic-t', 'end');
      s += `<path class="f42-egri f42-s-crit f42-ciz ${hasta ? 'f42-soluk' : ''}" d="${yolF(vo2A, 0, 1, g.X, g.Y, 80)}"/>` + T(g.X(0.92), g.Y(45) - 10, 'V̇O₂ max', 'f42-t f42-crit-t', 'middle');
      if (hasta) { const xp = 0.5; s += `<path class="f42-egri f42-s-warn f42-ciz" d="${yolF(vo2A, 0, xp, g.X, g.Y, 30)}"/><circle class="f42-nok f42-nok-w" cx="${g.X(xp)}" cy="${g.Y(vo2A(xp))}" r="5.5"/>` + T(g.X(xp) + 10, g.Y(vo2A(xp)) + 18, 'V̇O₂ peak (plato yok)', 'f42-t f42-warn-t'); }
      sahne.innerHTML = s + '</svg>';
      yan.innerHTML = `<dl class="f42-kv"><div><dt>Birim</dt><dd>mL O₂/kg/dk</dd></div><div><dt>Anlamı</dt><dd>fiziksel zindelik ölçüsü</dd></div><div><dt>CPET'te ölçülen</dt><dd>V̇O₂ peak: test süresindeki en yüksek V̇O₂; hastaların çoğu platoya ulaşmaz</dd></div></dl>`;
      R = null;
    };
    const cizB = () => {
      let s = svgAc(dar ? '0 0 360 270' : '0 0 560 300', 'Egzersiz öncesi, sırası ve sonrasında O2 tüketimi: O2 açığı, sabit evre, alaktasit ve laktasit EPOC', dar);
      const G = dar ? { x0: 44, x1: 344, y0: 40, y1: 222 } : { x0: 58, x1: 540, y0: 40, y1: 250 };
      const g = grafik({ ...G, ymin: 0, ymax: 40, grid: [10, 20, 30, 40], ylab: 'O₂ tüketimi (mL/kg/dk)', xt: [0, 2, 4, 6, 8, 10].map((m) => [m / 10, String(m)]) });
      const Xt = (t2) => g.X(t2 / 10);
      s += `<path class="f42-alan2 f42-acik"/><path class="f42-alan2 f42-alak"/><path class="f42-alan2 f42-laks"/>`;
      s += g.s + T((G.x0 + G.x1) / 2, G.y1 + 34, 'Süre (dk)', 'f42-tk', 'middle');
      s += `<path class="f42-ideal"/><path class="f42-egri f42-s-crit f42-gercek"/><circle class="f42-nok" r="4.5"/>`;
      s += `<g class="f42-eb"><path class="f42-brace" d="M${Xt(1)} ${g.Y(36) + 6} v-6 H${Xt(6)} v6"/>${T((Xt(1) + Xt(6)) / 2, g.Y(36) - 5, 'Egzersiz', 'f42-ts f42-ink', 'middle')}</g>`;
      s += `<g class="f42-lb" data-a="0">${T(Xt(0.5), g.Y(4) - 8, 'İstirahat', 'f42-ts f42-ink', 'middle')}</g>`;
      s += `<g class="f42-lb" data-a="1">${T(Xt(dar ? 1.9 : 1.8), g.Y(25), 'O₂ açığı', 'f42-t f42-warn-t', 'middle')}</g>`;
      s += `<g class="f42-lb" data-a="2">${T(Xt(4.5), g.Y(30) - 8, 'Sabit evre', 'f42-ts f42-ink', 'middle')}</g>`;
      s += `<g class="f42-lb" data-a="3">${T(Xt(6.45), g.Y(24), dar ? 'alaktasit' : 'alaktasit (hızlı)', 'f42-ts f42-acc-t')}</g>`;
      s += `<g class="f42-lb" data-a="4">${T(Xt(dar ? 7.7 : 7.9), g.Y(13), dar ? 'laktasit' : 'laktasit (yavaş)', 'f42-ts f42-basic-t')}<path class="f42-brace" d="M${Xt(6.1)} ${g.Y(36) + 6} v-6 H${Xt(10)} v6"/>${T(Xt(8.05), g.Y(36) - 5, 'EPOC: ek O₂', 'f42-t f42-gb', 'middle')}</g>`;
      sahne.innerHTML = s + '</svg>';
      const svg = sahne.querySelector('svg');
      R = { g, Xt, G, svg, ger: svg.querySelector('.f42-gercek'), id: svg.querySelector('.f42-ideal'), nok: svg.querySelector('.f42-nok'), ac: svg.querySelector('.f42-acik'), alak: svg.querySelector('.f42-alak'), laks: svg.querySelector('.f42-laks'), lb: [...svg.querySelectorAll('.f42-lb')], eb: svg.querySelector('.f42-eb') };
      boyaB();
    };
    const yolT = (f, a, b, n) => { let d = ''; for (let i = 0; i <= n; i++) { const t2 = a + ((b - a) * i) / n; d += (i ? 'L' : 'M') + R.Xt(t2).toFixed(1) + ' ' + R.g.Y(f(t2)).toFixed(1); } return d; };
    const alan = (a, b, e) => { if (e <= a) return ''; const bb = Math.min(b, e); return yolT(gercek, a, bb, 30) + yolT(() => 4, bb, a, 2).replace('M', 'L') + 'Z'; };
    const boyaB = () => {
      if (!R) return;
      const e = uc;
      R.ger.setAttribute('d', yolT(gercek, 0, e, Math.max(10, Math.round(e * 30))));
      R.nok.setAttribute('cx', R.Xt(e)); R.nok.setAttribute('cy', R.g.Y(gercek(e)));
      R.id.setAttribute('d', adim >= 1 ? `M${R.Xt(0)} ${R.g.Y(4)} H${R.Xt(1)} V${R.g.Y(30)} H${R.Xt(Math.min(6, e))}` + (e >= 6 ? ` V${R.g.Y(4)} H${R.Xt(e)}` : '') : '');
      const ac = e > 1 ? yolT(() => 30, 1, Math.min(e, 3.2), 4) + yolT(gercek, Math.min(e, 3.2), 1, 30).replace('M', 'L') + 'Z' : '';
      R.ac.setAttribute('d', adim >= 1 ? ac : '');
      R.alak.setAttribute('d', adim >= 3 ? alan(6, 7.5, e) : '');
      R.laks.setAttribute('d', adim >= 4 ? alan(7.5, 10, e) : '');
      R.lb.forEach((l) => { const a = +l.dataset.a; l.style.opacity = a <= adim && e >= SON[a] - 0.05 ? 1 : a <= adim && a > 0 ? 0.0 : a <= adim ? 1 : 0; });
      R.eb.style.opacity = adim >= 2 ? 1 : 0;
    };
    const yanB = () => {
      yan.innerHTML = `<ol class="f42-adimlar">${YAN.map(([b, l], i) => `<li class="${i === adim ? 'on' : i < adim ? 'ge' : ''}"><b>${i + 1} · ${b}</b>${i === adim ? `<ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}</li>`).join('')}</ol>`;
      adimEl.textContent = `Adım ${adim + 1}/5`;
      el.querySelector('[data-a="geri"]').disabled = adim === 0;
      el.querySelector('[data-a="ileri"]').disabled = adim === 4;
    };
    const adimKur = (i, anim) => {
      adim = clamp(i, 0, 4); hedefUc = SON[adim];
      if (!anim || RM || hedefUc < uc) uc = hedefUc;
      capYaz(el, CAPB[adim]); yanB(); boyaB();
    };
    const ciz = () => { if (tab === 'A') cizA(); else cizB(); };
    const tabKur = (k) => {
      tab = k; basSec(el, 't', k); ak.hidden = k !== 'A'; bk.hidden = k !== 'B'; oto = false; if (oynB) oynB.textContent = 'Oynat';
      if (k === 'A') { capYaz(el, hasta ? CAPH : CAPA); cizA(); } else { cizB(); adimKur(0, false); }
    };
    const kare = (dt) => {
      if (tab !== 'B') return;
      if (uc < hedefUc) { uc = Math.min(hedefUc, uc + dt * 2.6); boyaB(); }
      if (oto) { otoT += dt; if (otoT >= 2.5) { otoT = 0; if (adim < 4) adimKur(adim + 1, true); else { oto = false; oynB.textContent = 'Oynat'; } } }
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-t]'); if (b) tabKur(b.dataset.t);
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'has') { hasta = !hasta; a.setAttribute('aria-pressed', String(hasta)); capYaz(el, hasta ? CAPH : CAPA); cizA(); }
      if (a.dataset.a === 'ileri') { oto = false; oynB.textContent = 'Oynat'; adimKur(adim + 1, true); }
      if (a.dataset.a === 'geri') { oto = false; oynB.textContent = 'Oynat'; adimKur(adim - 1, false); }
      if (a.dataset.a === 'oyn') { if (oto) { oto = false; a.textContent = 'Oynat'; } else { oto = true; otoT = 0; a.textContent = 'Duraklat'; if (adim === 4) adimKur(0, false); } }
    });
    const d1 = darIzle(sahne, (n) => { dar = n; ciz(); if (tab === 'B') boyaB(); });
    const stop = RM ? () => {} : ticker(el, kare);
    return () => { d1(); stop(); };
  };

  /* =====================================================================
     11 · f42_sporcu — antrenmanın etkileri (K1 s. 183–184)
     ===================================================================== */
  VIZ.f42_sporcu = (el) => {
    const CAP = {
      sed: '<b>Sedanter kişi.</b> Antrenmanlı sporcuyu seçerek farkları görün; istirahat CO\'su değişmez. [[K1 s. 183]]',
      sp: '<b>Antrenmanlı sporcu.</b> Kalp hipertrofisiyle atım hacmi %40\'a kadar artar; vagal tonus istirahat HR\'sini düşürür, maksimum HR değişmez. İstirahat CO\'su aynı, maksimum CO artar; V̇O₂ max %25\'e kadar artabilir. [[K1 s. 183]]',
      day: '<b>Dayanıklılık antrenmanı.</b> Tip I lif çapı, kas kapiller oluşumu, mitokondri yoğunluğu ve oksidatif enzim etkinliği artar. [[K1 s. 184]]',
      tek: '<b>Tekrarlayan yoğun epizodlar.</b> Tip IIb lif çapı ve anaerobik enzim etkinliği artar. [[K1 s. 184]]',
      dir: '<b>Direnç işi.</b> Kas hipertrofisi aerobik antrenmanın değil kasların yaptığı direnç işinin sonucudur. Yük taşıyan egzersiz kemik mineral yoğunluğunu artırır. [[K1 s. 184]]',
    };
    let mod = 'sed', alt = 'day';
    el.innerHTML = `<div class="f42-ust">${segHtml('Kişi', 's', [['sed', 'Sedanter kişi'], ['sp', 'Antrenmanlı sporcu']], 'sed')}<span class="f42-alt-s" hidden>${segHtml('Antrenman türü', 'k', [['day', 'Dayanıklılık'], ['tek', 'Yoğun tekrarlayan'], ['dir', 'Direnç']], 'day')}</span></div><div class="f42-kartlar"></div>`;
    const kap = el.querySelector('.f42-kartlar'), altS = el.querySelector('.f42-alt-s');
    const satir = (ad, deg, cls) => `<li><span>${ad}</span><b class="${mod === 'sp' ? cls || '' : ''}">${mod === 'sp' ? deg : 'referans'}</b></li>`;
    const ciz = () => {
      const sp = mod === 'sp', dw = sp ? 16 : 9;
      const kalp = `<svg class="f42-mini" viewBox="0 0 160 110" role="img" aria-label="${sp ? 'Kalınlaşmış sol ventrikül duvarı (fizyolojik hipertrofi)' : 'Normal kalp duvarı'}"><ellipse class="f42-kalp-d" cx="80" cy="56" rx="${44 + dw / 2}" ry="${40 + dw / 2}" stroke-width="${dw}"/><ellipse class="f42-kalp-b" cx="80" cy="56" rx="${44 - dw / 2}" ry="${40 - dw / 2}"/><text class="f42-ts f42-ink" x="80" y="60" text-anchor="middle">${sp ? 'duvar kalın' : 'sol ventrikül'}</text></svg>`;
      const vb = (h, cls, l) => `<div class="f42-vbar"><i class="${cls}" style="height:${h}%"></i><span>${l}</span></div>`;
      const lifN = sp && alt === 'day' ? 'I' : sp && alt === 'tek' ? 'IIb' : sp && alt === 'dir' ? 'hip' : '';
      const kas = `<svg class="f42-mini" viewBox="0 0 160 110" role="img" aria-label="Kas kesiti">${Array.from({ length: 12 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4), tip = i % 3 === 0 ? 'I' : i % 3 === 1 ? 'IIa' : 'IIb'; let rr = 14; if (lifN === 'I' && tip === 'I') rr = 18; if (lifN === 'IIb' && tip === 'IIb') rr = 18; if (lifN === 'hip') rr = 17.5; return `<circle class="${tip === 'I' ? 'f42-lif-1' : tip === 'IIa' ? 'f42-lif-2' : 'f42-lif-3'}" cx="${26 + c * 36}" cy="${20 + r * 34}" r="${rr}"/>`; }).join('')}${lifN === 'I' ? Array.from({ length: 8 }, (_, i) => `<circle class="f42-kapd" cx="${44 + (i % 4) * 36}" cy="${37 + Math.floor(i / 4) * 34}" r="3.5"/>`).join('') : ''}</svg>`;
      const kasT = !sp ? ['Antrenman türüne göre değişir'] : alt === 'day' ? ['Tip I lif çapı ↑', 'Kas kapiller oluşumu ↑', 'Mitokondri yoğunluğu ↑', 'Oksidatif enzim etkinliği ↑'] : alt === 'tek' ? ['Tip IIb lif çapı ↑', 'Anaerobik enzim etkinliği ↑'] : ['Kas hipertrofisi', '(aerobik değil, direnç işi)'];
      kap.innerHTML = `
        <section class="f42-kart2${sp ? ' on' : ''}"><h4>Kalp</h4>${kalp}<p class="f42-k-not">${sp ? 'Fizyolojik hipertrofi · aort stenozundaki patolojik hipertrofiden farklı' : 'Sedanter kalp (referans)'}</p>
          <ul class="f42-sat">${satir('Atım hacmi', '↑ %40\'a kadar', 'up')}${satir('İstirahat HR', '↓ vagal tonus', 'dn')}${satir('Maksimum HR', '= değişmez', 'eq')}${satir('İstirahat CO', '= aynı', 'eq')}${satir('Maksimum CO', '↑', 'up')}</ul>${sp ? '<p class="f42-k-not">Sinüs aritmisi erişkinlikte sürebilir.</p>' : ''}</section>
        <section class="f42-kart2${sp ? ' on' : ''}"><h4>V̇O₂ max</h4><div class="f42-vbars">${vb(100 / 1.25, 'n', 'Sedanter')}${vb(sp ? 100 : 100 / 1.25, sp ? 's' : 'n f42-soluk', 'Sporcu')}</div><p class="f42-k-not">${sp ? '↑ %25\'e kadar · kas vaskülarizasyonu ↑ → O₂ sunumu ↑' : 'Sporcuyu seçin'}</p></section>
        <section class="f42-kart2${sp ? ' on' : ''}"><h4>Akciğer</h4><ul class="f42-sat">${satir('Maks. solunum hızı', '↑', 'up')}${satir('Akciğer hacmi', '↑', 'up')}${satir('Pulmoner kapiller', '↑', 'up')}${satir('Maksimum V̇E', '+15 L/dk\'ya kadar', 'up')}</ul></section>
        <section class="f42-kart2${sp ? ' on' : ''}"><h4>Kas ve kemik</h4>${kas}<ul class="f42-liste">${kasT.map((x) => `<li>${x}</li>`).join('')}</ul><p class="f42-k-not"><b>Kemik:</b> ${sp ? 'yük taşıyan egzersiz → kemik mineral yoğunluğu ↑ · yaşlıda kırık riski ↓' : 'yük taşıyan egzersizle değişir'}</p></section>`;
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-s]'); if (b) { mod = b.dataset.s; basSec(el, 's', mod); altS.hidden = mod !== 'sp'; capYaz(el, mod === 'sp' ? CAP.sp : CAP.sed); ciz(); }
      const k = e.target.closest('[data-k]'); if (k) { alt = k.dataset.k; basSec(el, 'k', alt); capYaz(el, CAP[alt]); ciz(); }
    });
    ciz();
    return () => {};
  };
})();
