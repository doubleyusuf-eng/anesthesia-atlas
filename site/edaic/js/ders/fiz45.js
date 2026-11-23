/* Bölüm 45 · Beyin · bileşenler (tarif: docs/tasarim/fiz45.md; K1 s. 192–197).
   Kitaptan: bölgeler, loblar, yollar, zarlar, damarlar, Bamford tipleri, EEG bant sınırları (0–4/4–8/8–13/>13 Hz),
   19 elektrot, BIS 0/100/40–60, B-Aware %82. Temsilî: çizim oranları, akım/kollateral modeli, EEG/SSEP/BIS eğrileri. */
(function () {
  'use strict';
  const { ticker, REF, RM, esc } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`button[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; el.classList.toggle('f45-dar', n); cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tween = (ms, cb) => {
    if (RM || !ms) { cb(1); return () => {}; }
    let raf = 0, t0 = 0;
    const f = (t) => { if (!t0) t0 = t; const k = clamp((t - t0) / ms, 0, 1); cb(k); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  };
  const tx = (x, y, s, cls, anc, extra) => `<text class="${cls}" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}${extra || ''}>${s}</text>`;
  const btnAt = (key, v, lbl) => `data-${key}="${v}" role="button" tabindex="0" aria-label="${esc(lbl)}"`;
  /* SVG parçasına dokunma / Enter / Space ve .seg düğmesi aynı işleyiciye gider */
  const secimDinle = (el, key, fn) => {
    const sel = `[data-${key}]`;
    const c = (e) => { const t = e.target.closest(sel); if (t && el.contains(t)) fn(t.dataset[key], t); };
    const k = (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const t = e.target.closest(sel); if (t && el.contains(t) && t.tagName !== 'BUTTON') { e.preventDefault(); fn(t.dataset[key], t); } };
    el.addEventListener('click', c); el.addEventListener('keydown', k);
  };
  const okDef = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="${cls}"/></marker>`;
  /* yol üstünde nokta konumu */
  const nokta = (p, k) => { const L = p.getTotalLength(); return p.getPointAtLength(clamp(k, 0, 1) * L); };

  /* =====================================================================
     1 · f45_bolgeler — orta hat kesitinde beş bölge (K1 s. 192–193)
     ===================================================================== */
  VIZ.f45_bolgeler = (el) => {
    const B = {
      tel: ['Telensefalon', 'Telensefalon (serebrum)', 'ön ve orta kraniyal fossa', 'sağ ve sol hemisfer, bazal gangliyonlar, limbik sistem', '<b>Telensefalon (serebrum).</b> En büyük bölüm; ön ve orta kraniyal fossayı doldurur. Üç alt bölgesi vardır: hemisferler, bazal gangliyonlar ve limbik sistem. [[K1 s. 192]]'],
      dien: ['Diensefalon', 'Diensefalon', 'hemisferlerin altında, ortada', 'talamus, hipotalamus, subtalamus, metatalamus', '<b>Diensefalon.</b> Talamus, hipotalamus, subtalamus ve metatalamustan oluşur. [[K1 s. 192–193]]'],
      mez: ['Orta beyin', 'Mezensefalon (orta beyin)', 'diensefalonla arka beyin arasında', 'Sylvius akuaduktu, CN III–IV çekirdekleri, kırmızı çekirdekler', '<b>Mezensefalon (orta beyin).</b> Arka beyni serebral hemisferlere bağlar; beyin sapının en üst katıdır. [[K1 s. 193]]'],
      cer: ['Serebellum', 'Serebellum', 'arka kraniyal fossa', 'vermis ve iki serebellar hemisfer', '<b>Serebellum ("küçük beyin").</b> Arka kraniyal fossadadır; hacmin %10\'u, nöronların %50\'sinden fazlası. [[K1 s. 193]]'],
      rom: ['Rombensefalon', 'Rombensefalon', 'arka beyin', 'pons ve medulla oblongata', '<b>Rombensefalon.</b> Pons ve medulla oblongatadan oluşur; orta beyinle birlikte beyin sapını yapar. [[K1 s. 193]]'],
    };
    let sec = 'tel', dar = false;
    el.innerHTML = `<div class="f45-g2 f45-bolge-g"><div class="f45-svgk"></div><div class="f45-kart"></div></div>
      <div class="f45-segkay">${segHtml('Bölge', 'b', Object.keys(B).map((k) => [k, B[k][0]]), sec)}</div>`;
    const kutu = el.querySelector('.f45-svgk'), kart = el.querySelector('.f45-kart'), g = el.querySelector('.f45-bolge-g');
    const ciz = () => {
      const fs = dar ? ['ön fossa', 'orta fossa', 'arka fossa'] : ['ön kraniyal fossa', 'orta kraniyal fossa', 'arka kraniyal fossa'];
      kutu.innerHTML = `<svg class="f45-svg" viewBox="0 0 420 330" role="img" aria-label="Beynin orta hat kesiti: telensefalon, diensefalon, orta beyin, serebellum ve rombensefalon">
        <path class="f45-fossa" d="M14 196 L110 196 L120 222 L166 222"/>
        <path class="f45-fossa" d="M236 298 C280 306 340 300 362 270 L392 188"/>
        ${tx(14, 212, fs[0], 'f45-ts')}${tx(166, 240, fs[1], 'f45-ts', 'end')}${tx(318, 322, fs[2], 'f45-ts', 'middle')}
        <g class="f45-bol" ${btnAt('b', 'tel', 'Telensefalon')}><path d="M44 168 C30 100 92 30 206 28 C318 26 386 86 382 160 C380 182 364 192 340 190 L300 186 C276 184 248 180 236 182 L196 182 C176 182 150 186 120 188 C84 190 52 190 44 168 Z"/></g>
        <path class="f45-kk" d="M128 140 C160 106 260 102 296 138"/>
        <g class="f45-bol" ${btnAt('b', 'cer', 'Serebellum')}><path d="M236 204 C246 184 318 180 344 206 C360 226 344 268 300 274 C262 278 236 258 234 232 C233 222 233 212 236 204 Z"/>
          <path class="f45-folia" d="M250 220 C280 205 320 208 340 222 M244 238 C280 224 324 228 346 242 M248 256 C280 244 316 248 334 258"/></g>
        <path class="f45-ctx" d="M207 292 L223 292 L221 326 L209 326 Z"/>
        <g class="f45-bol" ${btnAt('b', 'rom', 'Rombensefalon: pons ve medulla')}><path d="M200 208 L232 208 C238 222 238 238 232 248 L200 248 C184 244 180 214 200 208 Z"/><path d="M202 248 L230 248 L225 292 L206 292 Z"/></g>
        <g class="f45-bol" ${btnAt('b', 'mez', 'Orta beyin')}><path d="M196 182 L234 182 L232 208 L200 208 Z"/></g>
        <g class="f45-bol" ${btnAt('b', 'dien', 'Diensefalon')}><ellipse cx="214" cy="164" rx="42" ry="17"/></g>
        <path class="f45-brace" d="M180 184 L174 184 L174 292 L180 292"/>
        <g class="f45-nopt">
          ${tx(206, 76, 'telensefalon', 'f45-t f45-halo', 'middle')}
          ${tx(212, 116, 'korpus kallozum', 'f45-ts f45-halo', 'middle')}
          ${tx(214, 168, 'diensefalon', 'f45-t2', 'middle')}
          ${tx(216, 232, 'pons', 'f45-t2', 'middle')}
          ${tx(296, 252, 'serebellum', 'f45-t f45-halo', 'middle')}
          ${tx(230, 320, 'omurilik', 'f45-ts')}
          ${tx(168, 276, 'beyin sapı', 'f45-t f45-halo', 'end')}
        </g>
      </svg>`;
      uygula();
    };
    const uygula = () => {
      el.querySelectorAll('.f45-bol').forEach((p) => p.classList.toggle('on', p.dataset.b === sec));
      const b = B[sec];
      kart.innerHTML = `<h4>${b[1]}</h4><dl class="kv"><dt>Yeri</dt><dd>${b[2]}</dd><dt>İçerdikleri</dt><dd>${b[3]}</dd></dl>
        <p class="f45-not">Beyin istirahat kalp debisinin %15'ini alır.</p>`;
      basSec(el, 'b', sec);
    };
    secimDinle(el, 'b', (v) => { sec = v; uygula(); capYaz(el, B[v][4]); });
    const ro = darIzle(el, (d) => { dar = d; g.classList.toggle('f45-dar', d); ciz(); });
    return () => ro();
  };

  /* =====================================================================
     2 · f45_loblar — dört lob ve dominant hemisfer (K1 s. 192)
     ===================================================================== */
  VIZ.f45_loblar = (el) => {
    let lob = 'fr', hem = 'dom', dar = false, durT = () => {}, flip = 1;
    const LOB = { fr: 'Frontal', pa: 'Parietal', te: 'Temporal', ok: 'Oksipital' };
    el.innerHTML = `<div class="f45-kont">
        <div><span class="f45-lbl">Lob</span>${segHtml('Lob', 'lob', Object.keys(LOB).map((k) => [k, LOB[k]]), lob)}</div>
        <div><span class="f45-lbl">Hemisfer</span>${segHtml('Hemisfer', 'hem', [['dom', 'Dominant (sol, %97)'], ['non', 'Nondominant']], hem)}</div></div>
      <div class="f45-svgk f45-lob-k"></div>
      <p class="f45-not">Hemisferleri korpus kallozum bağlar · korteks gri, derin katmanlar beyaz cevher · girus ve sulkuslar</p>`;
    const kutu = el.querySelector('.f45-lob-k');
    const OUT = 'M120 186 C102 104 190 50 300 48 C410 46 522 84 532 176 C536 230 506 264 470 266 C432 268 404 264 384 276 C344 296 272 298 236 278 C216 266 202 240 172 238 C138 236 124 216 120 186 Z';
    const P = {
      fr: '0,0 344,0 340,56 294,184 207,214 0,226',
      pa: '344,0 462,0 454,76 442,166 402,182 294,184 340,56',
      ok: '462,0 640,0 640,360 482,360 472,256 442,166 454,76',
      te: '0,226 207,214 294,184 402,182 442,166 472,256 482,360 0,360',
    };
    const X = (x) => (flip < 0 ? 640 - x : x);
    const A = (a) => (flip < 0 ? (a === 'start' ? 'end' : a === 'end' ? 'start' : a) : a);
    const etiketler = () => {
      const d = dar, s = d ? 0.5625 : 1;
      const L = (x, y, str, cls, anc) => tx(X(x) * s, y * s, str, cls, A(anc));
      const top = hem === 'dom' ? (d ? 'okuma, matematik' : 'yapı ve düzen: okuma, matematik') : (d ? 'mekânsal farkındalık' : 'mekânsal farkındalık');
      const on = (k) => (lob === k ? ' on' : '');
      let h = '';
      if (!d) {
        h += L(205, 118, 'Frontal lob', 'f45-t f45-halo' + on('fr'), 'middle') + L(205, 136, 'planlama, akıl yürütme, dil üretimi', 'f45-ts f45-halo', 'middle');
        h += L(398, 96, 'Parietal lob', 'f45-t f45-halo' + on('pa'), 'middle') + L(398, 114, 'duyusal bütünleştirme', 'f45-ts f45-halo', 'middle') + L(398, 132, top, 'f45-ts f45-acc f45-halo', 'middle');
        h += L(306, 238, 'Temporal lob', 'f45-t f45-halo' + on('te'), 'middle') + L(306, 256, 'işitme, dil, bellek', 'f45-ts f45-halo', 'middle');
        h += L(492, 168, 'Oksipital lob', 'f45-t f45-halo' + on('ok'), 'middle') + L(492, 186, 'görme', 'f45-ts f45-halo', 'middle');
        h += L(316, 20, 'premotor + primer motor korteks', 'f45-ts f45-c-basic', 'end') + L(360, 20, 'postsantral girus:', 'f45-ts f45-c-clin', 'start') + L(360, 34, 'primer somatosensoriyel korteks', 'f45-ts f45-c-clin', 'start');
        h += `<path class="f45-lead" d="M${X(300)} 24 L${X(318)} 58"/><path class="f45-lead" d="M${X(372)} 38 L${X(352)} 60"/>`;
        h += L(300, 334, 'primer işitme korteksi', 'f45-ts', 'middle') + `<path class="f45-lead" d="M${X(318)} 322 L${X(338)} 208"/>`;
        if (hem === 'dom') h += L(500, 334, 'Wernicke alanı (dil anlama)', 'f45-ts f45-c-warn', 'middle') + `<path class="f45-lead" d="M${X(470)} 322 L${X(424)} 212"/>`;
      } else {
        h += L(200, 112, 'Frontal lob', 'f45-t f45-halo' + on('fr'), 'middle') + L(200, 140, 'planlama, dil üretimi', 'f45-ts f45-halo', 'middle');
        h += L(400, 84, 'Parietal lob', 'f45-t f45-halo' + on('pa'), 'middle') + L(400, 112, 'duyu bütünleştirme', 'f45-ts f45-halo', 'middle') + L(400, 140, top, 'f45-ts f45-acc f45-halo', 'middle');
        h += L(300, 246, 'Temporal lob', 'f45-t f45-halo' + on('te'), 'middle') + L(300, 274, 'işitme, dil, bellek', 'f45-ts f45-halo', 'middle');
        h += L(540, 200, 'Oksipital', 'f45-t f45-halo' + on('ok'), 'middle') + L(540, 228, 'görme', 'f45-ts f45-halo', 'middle');
        if (lob === 'fr') h += tx(flip < 0 ? 330 : 50, 14, 'premotor + primer motor korteks', 'f45-ts f45-c-basic', flip < 0 ? 'end' : 'start');
        if (lob === 'pa') h += tx(flip < 0 ? 330 : 50, 14, 'postsantral girus: somatosensoriyel', 'f45-ts f45-c-clin', flip < 0 ? 'end' : 'start');
        if (lob === 'te') { h += L(330, 372, 'primer işitme korteksi', 'f45-ts', 'middle'); if (hem === 'dom') h += L(330, 404, 'Wernicke alanı (dil anlama)', 'f45-ts f45-c-warn', 'middle'); }
      }
      return h;
    };
    const ciz = () => {
      const s = dar ? 0.5625 : 1;
      const vb = dar ? `40 0 300 ${lob === 'te' ? 236 : 192}` : '0 0 640 344';
      kutu.innerHTML = `<svg class="f45-svg" viewBox="${vb}" role="img" aria-label="Beynin yan görünümü: frontal, parietal, temporal ve oksipital lob">
        <defs><clipPath id="f45-lob-clip"><path d="${OUT}"/></clipPath></defs>
        <g transform="scale(${s})"><g class="f45-ayna" transform="${flip < 0 ? 'translate(640 0) scale(-1 1)' : ''}">
          <ellipse class="f45-ctx" cx="452" cy="286" rx="62" ry="28"/>
          <g clip-path="url(#f45-lob-clip)">
            ${Object.keys(P).map((k) => `<polygon class="f45-lob" ${btnAt('lob', k, LOB[k] + ' lob')} points="${P[k]}"/>`).join('')}
            <polygon class="f45-motor" points="322,56 340,56 294,184 276,186"/>
            <polygon class="f45-duyu" points="340,56 358,56 312,184 294,184"/>
            <ellipse class="f45-isitme" cx="338" cy="200" rx="24" ry="7"/>
            ${hem === 'dom' ? '<ellipse class="f45-wern" cx="424" cy="204" rx="17" ry="11"/>' : ''}
          </g>
          <path class="f45-out" d="${OUT}"/>
          <path class="f45-sulk" d="M340 56 L294 184"/>
          <path class="f45-sulk2" d="M207 214 L294 184 L402 182"/>
        </g></g>
        <g class="f45-nopt f45-lbls">${etiketler()}</g>
      </svg>`;
      uygula();
    };
    const uygula = () => {
      kutu.querySelectorAll('.f45-lob').forEach((p) => p.classList.toggle('on', p.dataset.lob === lob));
      basSec(el, 'lob', lob); basSec(el, 'hem', hem);
    };
    const capH = () => {
      if (lob === 'fr') return '<b>Frontal lob.</b> Büyük bölümü üst düzey işlevlerdedir: problem çözme, akıl yürütme, planlama, dil üretimi, karmaşık sosyal ve cinsel davranış. Arka kısmındaki premotor ve primer motor korteks hareketi planlar ve başlatır. [[K1 s. 192]]';
      if (lob === 'pa') return hem === 'dom' ? '<b>Parietal lob, dominant hemisfer.</b> Duyusal bütünleştirme alanıdır; en öndeki postsantral girus primer somatosensoriyel kortekstir. Dominant hemisfer (toplumun %97\'sinde sol) yapı ve düzenle ilgilidir: okuma harfleri, matematik sayıları sıralamayı gerektirir. [[K1 s. 192]]'
        : '<b>Parietal lob, nondominant hemisfer.</b> Sol ve sağ parietal lobun işlevi biraz farklıdır; nondominant taraf mekânsal farkındalıkla ilgilidir. [[K1 s. 192]]';
      if (lob === 'te') return hem === 'dom' ? '<b>Temporal lob.</b> İşitme, dil ve belleği yönetir; kitaba göre primer işitme korteksi sol temporal lobdadır. Dil anlamada önemli Wernicke alanı dominant hemisferdedir (yeri için sayfadaki Atlas notuna bakın). [[K1 s. 192]]'
        : '<b>Temporal lob.</b> İşitme, dil ve belleği yönetir. Wernicke alanı yalnız dominant hemisferdedir. [[K1 s. 192]]';
      return '<b>Oksipital lob.</b> Görsel uyaranları yorumlar. [[K1 s. 192]]';
    };
    secimDinle(el, 'lob', (v) => { lob = v; ciz(); capYaz(el, capH()); });
    secimDinle(el, 'hem', (v) => {
      if (v === hem) return;
      hem = v; basSec(el, 'hem', hem);
      const hedef = hem === 'dom' ? 1 : -1;
      durT();
      const ayna = kutu.querySelector('.f45-ayna'), lb = kutu.querySelector('.f45-lbls');
      if (RM || !ayna) { flip = hedef; ciz(); capYaz(el, capH()); return; }
      const f0 = flip;
      if (lb) lb.style.opacity = '0';
      durT = tween(400, (k) => {
        const f = f0 + (hedef - f0) * ease(k);
        ayna.setAttribute('transform', `translate(${320 * (1 - f)} 0) scale(${f || 0.001} 1)`);
        if (k >= 1) { flip = hedef; ciz(); }
      });
      capYaz(el, capH());
    });
    const ro = darIzle(el, (d) => { dar = d; kutu.classList.toggle('f45-dar', d); ciz(); });
    return () => { durT(); ro(); };
  };

  /* =====================================================================
     3 · f45_aktarim — duyu yolu talamustan geçer, koku geçmez (K1 s. 192–193)
     ===================================================================== */
  VIZ.f45_aktarim = (el) => {
    const D = { dok: 'Dokunma', gor: 'Görme', isi: 'İşitme', kok: 'Koku' };
    const CAP = {
      dok: '<b>Dokunma.</b> Afferent lif lateral talamik çekirdekte sinaps yapar, oradan postsantral girustaki primer somatosensoriyel kortekse gider. [[K1 s. 192]]',
      gor: '<b>Görme.</b> Metatalamusun lateral genikulat çekirdeği optik sinirden gelen bilgiyi primer görme korteksine aktarır. [[K1 s. 193]]',
      isi: '<b>İşitme.</b> Metatalamusun medial genikulat çekirdeği işitme bilgisini primer işitme korteksine aktarır. [[K1 s. 193]]',
      kok: '<b>Koku.</b> Duyusal afferentler arasında tek istisna koku nöronlarıdır: kortekse gitmeden önce talamusta sinaps yapmazlar. [[K1 s. 192]]',
    };
    let duyu = 'dok', dar = false, t = RM ? 9 : 0, oyn = !RM;
    el.innerHTML = `<div class="f45-kont"><div>${segHtml('Duyu', 'd', Object.keys(D).map((k) => [k, D[k]]), duyu)}</div>
      <div class="btn-row"><button type="button" class="btn ghost" data-a="oyn">Oynat</button></div></div>
      <div class="f45-svgk f45-akt-k"></div>`;
    const kutu = el.querySelector('.f45-akt-k');
    let L, svg;
    /* yerleşimler: kaynak, çekirdek, hedef; yol = giriş + çıkış */
    const LAY = {
      g: { vb: '0 0 640 330', arc: 'M120 92 Q370 4 620 92', tal: [320, 186, 132, 64],
        nuc: { lat: [208, 146, 112, 40], lgn: [338, 142, 96, 36], mgn: [338, 186, 96, 36] }, meta: [330, 134, 112, 96],
        hip: [300, 274, 36, 12], src: { gor: [44, 96], dok: [44, 160], isi: [44, 224], kok: [44, 290] },
        tgt: { dok: [300, 50], isi: [470, 52], gor: [598, 82], kok: [132, 96] },
        yol: {
          dok: ['M70 160 C130 160 170 166 208 166', 'M264 146 C270 110 290 80 300 56'],
          gor: ['M70 96 C150 96 250 116 338 152', 'M434 156 C500 150 560 120 596 88'],
          isi: ['M70 224 C170 236 290 222 338 206', 'M434 198 C470 160 470 100 470 58'],
          kok: ['M70 290 C150 300 168 250 166 190 C164 140 150 112 134 100', ''],
        },
        tl: [[300, 22, 'primer somatosensoriyel korteks', 'middle'], [300, 36, '(postsantral girus)', 'middle'], [474, 30, 'primer işitme korteksi', 'middle'], [600, 118, 'primer görme', 'middle'], [600, 132, 'korteksi (oksipital)', 'middle'], [132, 124, 'koku korteksi', 'middle']],
        nl: { lat: ['lateral talamik', 'çekirdekler'], lgn: ['LGN', 'lateral genikulat'], mgn: ['MGN', 'medial genikulat'] },
        sl: { gor: 'görme', dok: 'dokunma', isi: 'işitme', kok: 'koku' }, slPos: 'alt' },
      d: { vb: '0 0 360 318', arc: 'M22 84 Q180 4 340 84', tal: [184, 166, 128, 58],
        nuc: { lat: [66, 138, 98, 42], lgn: [186, 124, 96, 32], mgn: [186, 164, 96, 32] }, meta: [179, 117, 110, 86],
        hip: [96, 226, 34, 11], src: { dok: [52, 272], gor: [136, 272], isi: [220, 272], kok: [304, 272] },
        tgt: { dok: [118, 50], isi: [228, 50], gor: [332, 78], kok: [28, 82] },
        yol: {
          dok: ['M52 256 C52 220 90 200 108 180', 'M114 138 C114 100 116 70 118 56'],
          gor: ['M136 256 C140 220 190 190 212 156', 'M282 136 C310 120 326 100 330 84'],
          isi: ['M220 256 C222 236 226 220 234 196', 'M282 178 C300 150 240 90 228 56'],
          kok: ['M304 256 C300 300 40 300 22 240 C12 200 14 140 26 90', ''],
        },
        tl: [[118, 24, 'somatosensoriyel', 'middle'], [228, 24, 'işitme', 'middle'], [352, 108, 'görme', 'end'], [32, 110, 'koku', 'start']],
        nl: { lat: ['lateral', 'talamik'], lgn: ['LGN', ''], mgn: ['MGN', ''] },
        sl: { dok: 'dokunma', gor: 'görme', isi: 'işitme', kok: 'koku' }, slPos: 'alt' },
    };
    const simge = (k, x, y) => {
      if (k === 'dok') return `<g class="f45-simge" transform="translate(${x} ${y})"><path d="M-9 10 L-9 -2 M-4 8 L-4 -9 M1 8 L1 -11 M6 8 L6 -8 M-11 4 C-12 14 10 16 10 6 L10 -4"/></g>`;
      if (k === 'gor') return `<g class="f45-simge" transform="translate(${x} ${y})"><path d="M-14 0 C-6 -10 6 -10 14 0 C6 10 -6 10 -14 0 Z"/><circle r="4.5" class="f45-simge-d"/></g>`;
      if (k === 'isi') return `<g class="f45-simge" transform="translate(${x} ${y})"><path d="M6 10 C-2 14 -10 6 -10 -2 C-10 -10 -4 -14 2 -14 C10 -14 12 -6 8 -2 C5 1 3 2 4 6 M-3 -3 C-3 -8 4 -9 4 -4"/></g>`;
      return `<g class="f45-simge" transform="translate(${x} ${y})"><path d="M0 -13 C-1 -4 -10 4 -9 9 C-8 12 -3 11 0 9 C3 11 8 12 9 9 C10 4 1 -4 0 -13"/></g>`;
    };
    const ciz = () => {
      L = dar ? LAY.d : LAY.g;
      const [tx0, ty0, trx, try0] = L.tal;
      const nuc = Object.keys(L.nuc).map((k) => { const [x, y, w, h] = L.nuc[k]; const n = L.nl[k];
        return `<g class="f45-nuc" data-n="${k}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/>${tx(x + w / 2, y + (n[1] ? h / 2 - 2 : h / 2 + 5), n[0], 'f45-t2', 'middle')}${n[1] ? tx(x + w / 2, y + h / 2 + 12, n[1], 'f45-ts2', 'middle') : ''}<text class="f45-sinaps" x="${x + w / 2}" y="${y - 5}" text-anchor="middle">sinaps</text></g>`; }).join('');
      const [mx, my, mw, mh] = L.meta;
      const [hx, hy, hrx, hry] = L.hip;
      const yollar = Object.keys(L.yol).map((k) => L.yol[k].filter(Boolean).map((d, i) => `<path class="f45-yol" data-y="${k}" data-i="${i}" d="${d}"/>`).join('')).join('');
      svg = null;
      kutu.innerHTML = `<svg class="f45-svg" viewBox="${L.vb}" role="img" aria-label="Duyu yolları: talamus aktarımı ve talamusa uğramayan koku yolu">
        <path class="f45-korteks" d="${L.arc}"/>
        ${Object.keys(L.tgt).map((k) => `<circle class="f45-hedef" data-h="${k}" cx="${L.tgt[k][0]}" cy="${L.tgt[k][1]}" r="${dar ? 9 : 11}"/>`).join('')}
        ${L.tl.map((a) => tx(a[0], a[1], a[2], 'f45-ts f45-halo', a[3])).join('')}
        <g class="f45-tal"><ellipse cx="${tx0}" cy="${ty0}" rx="${trx}" ry="${try0}"/>
          ${tx(dar ? tx0 - 60 : tx0 - 70, ty0 + try0 - 12, 'talamus', 'f45-t', 'middle')}
          <rect class="f45-meta" x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="9"/>${tx(mx + mw / 2, my + mh + 13, 'metatalamus', 'f45-ts', 'middle')}
          ${nuc}<text class="f45-ugramaz" x="${tx0}" y="${ty0 - try0 - 6}" text-anchor="middle">talamusa uğramaz</text></g>
        <path class="f45-ctx-l" d="M${hx} ${hy + hry} L${hx} ${hy + hry + 14}"/><ellipse class="f45-ctx" cx="${hx}" cy="${hy}" rx="${hrx}" ry="${hry}"/><circle class="f45-ctx" cx="${hx}" cy="${hy + hry + 19}" r="5"/>
        ${tx(hx + hrx + 5, hy + 4, 'hipotalamus', 'f45-ts')}${tx(hx + 9, hy + hry + 24, 'hipofiz', 'f45-ts')}
        ${yollar}
        ${!dar ? tx(150, 104, 'optik sinir', 'f45-ts f45-optik', 'middle') : tx(176, 212, 'optik sinir', 'f45-ts f45-optik', 'start')}
        ${Object.keys(L.src).map((k) => simge(k, L.src[k][0] + (dar ? 0 : 0), L.src[k][1]) + tx(L.src[k][0] + (dar ? 0 : 0), L.src[k][1] + (dar ? 32 : 30), L.sl[k], 'f45-ts', 'middle')).join('')}
        <g class="f45-dizi">${[0, 1, 2, 3, 4].map(() => '<circle r="4.5"/>').join('')}</g>
      </svg>`;
      svg = kutu.querySelector('svg');
      kare();
    };
    /* zaman çizelgesi: 0–1 giriş, 1–1,4 sinaps, 1,4–2,4 çıkış, 2,4–2,8 varış vurgusu; koku 0–2 tek yol */
    const kare = () => {
      if (!svg) return;
      const kok = duyu === 'kok';
      const n = { dok: 'lat', gor: 'lgn', isi: 'mgn' }[duyu];
      svg.querySelectorAll('.f45-yol').forEach((p) => {
        const ak = p.dataset.y === duyu; p.classList.toggle('ak', ak);
        let k = 0;
        if (ak) k = kok ? clamp(t / 2, 0, 1) : (p.dataset.i === '0' ? clamp(t, 0, 1) : clamp((t - 1.4), 0, 1));
        if (ak) { const Lg = p.getTotalLength(); p.style.strokeDasharray = Lg; p.style.strokeDashoffset = Lg * (1 - k); } else { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; }
      });
      svg.querySelectorAll('.f45-nuc').forEach((g) => {
        const on = g.dataset.n === n; g.classList.toggle('on', on && t >= 1);
        g.classList.toggle('sin', on && t >= 1 && (RM || t < 1.7));
      });
      svg.querySelector('.f45-tal').classList.toggle('sol', kok);
      svg.querySelector('.f45-optik').style.opacity = duyu === 'gor' ? 1 : 0;
      const varT = kok ? 2 : 2.4;
      svg.querySelectorAll('.f45-hedef').forEach((c) => { const on = c.dataset.h === duyu; c.classList.toggle('on', on && t >= varT); c.classList.toggle('flas', on && t >= varT && t < varT + 0.4); });
      const dz = svg.querySelectorAll('.f45-dizi circle');
      const yol = (i) => svg.querySelector(`.f45-yol[data-y="${duyu}"][data-i="${i}"]`);
      dz.forEach((c, j) => {
        const tt = t - j * 0.06;
        let p = null, k = 0;
        if (RM || tt < 0) { c.style.opacity = 0; return; }
        if (kok) { if (tt <= 2) { p = yol(0); k = tt / 2; } }
        else if (tt <= 1) { p = yol(0); k = tt; } else if (tt >= 1.4 && tt <= 2.4) { p = yol(1); k = tt - 1.4; }
        if (!p) { c.style.opacity = 0; return; }
        const q = nokta(p, k); c.setAttribute('cx', q.x); c.setAttribute('cy', q.y); c.style.opacity = 1 - j * 0.16;
      });
    };
    const oynat = () => { t = RM ? 9 : 0; oyn = !RM; kare(); };
    secimDinle(el, 'd', (v) => { duyu = v; basSec(el, 'd', v); capYaz(el, CAP[v]); oynat(); });
    el.querySelector('[data-a=oyn]').addEventListener('click', oynat);
    const ro = darIzle(el, (d) => { dar = d; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { if (!oyn) return; t += dt; if (t > 3) { oyn = false; t = 3; } kare(); });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     4 · f45_sap — beyin sapının katları (K1 s. 193)
     ===================================================================== */
  VIZ.f45_sap = (el) => {
    const S = {
      mez: ['Orta beyin', ['Sylvius akuaduktu: 3. → 4. ventrikül (Bölüm 46)', 'okülomotor (III) ve troklear (IV) sinir çekirdekleri', 'kırmızı çekirdekler: serebellum ve korteksten gelen ekstrapiramidal yolları omuriliğe aktarır'],
        '<b>Orta beyin.</b> Arka beyni hemisferlere bağlar; içindeki Sylvius akuaduktu üçüncü ventrikülü dördüncü ventriküle bağlar (Bölüm 46). [[K1 s. 193]]'],
      pons: ['Pons ("köprü")', ['serebellumu beyin sapına, medullayı orta beyne bağlar', 'V–VIII. kraniyal sinir çekirdekleri'],
        '<b>Pons.</b> Serebellumu beyin sapına, medullayı orta beyne bağlar; V–VIII. kraniyal sinir çekirdekleri buradadır. [[K1 s. 193]]'],
      sin: ['Pons–medulla sınırı', ['pnömotaksik ve apnöstik merkezler (solunum merkezinin parçası)'],
        '<b>Pons–medulla sınırı.</b> Solunum merkezinin parçası olan pnömotaksik ve apnöstik merkezler burada yer alır. [[K1 s. 193]]'],
      med: ['Medulla oblongata', ['beyni omuriliğe bağlar', 'piramitler: inen piramidal motor yolların çoğu burada çaprazlaşır', 'dorsal kolon–medial lemniskus yolu da burada çaprazlaşır', 'solunum ve vazomotor merkezler', 'kalbin otonom yolla dış düzenlenmesi', 'refleksler: kusma, yutma, hapşırma, öğürme, öksürük'],
        '<b>Medulla oblongata.</b> Yaşam için en temel işlevlerin çekirdekleri buradadır; piramidal motor yolların çoğu ve dorsal kolon–medial lemniskus yolu burada çaprazlaşır. [[K1 s. 193]]'],
    };
    let sec = 'mez';
    el.innerHTML = `<div class="f45-g2 f45-sap-g"><div class="f45-svgk f45-sap-k"><svg class="f45-svg" viewBox="0 0 300 372" role="img" aria-label="Beyin sapının ön görünümü: orta beyin, pons, pons–medulla sınırı, medulla">
        <defs>${okDef('f45-ok-b', 'f45-okb')}${okDef('f45-ok-c', 'f45-okc')}</defs>
        <g class="f45-sv" ${btnAt('s', 'mez', 'Orta beyin')}><path d="M54 30 L136 30 L120 108 L70 108 Z"/><path class="f45-ic" d="M95 44 L95 104"/></g>
        <g class="f45-sv" ${btnAt('s', 'pons', 'Pons')}><path d="M70 108 C26 112 26 186 70 190 L120 190 C164 186 164 112 120 108 Z"/>
          <path class="f45-ic" d="M46 128 L144 128 M40 146 L150 146 M40 164 L150 164 M46 180 L144 180"/></g>
        <g class="f45-sv f45-sin" ${btnAt('s', 'sin', 'Pons–medulla sınırı')}><rect x="40" y="186" width="110" height="22" rx="4"/><path class="f45-kes" d="M40 197 L150 197"/></g>
        <g class="f45-sv" ${btnAt('s', 'med', 'Medulla oblongata')}><path d="M72 208 L118 208 L110 318 L80 318 Z"/>
          <ellipse class="f45-pir" cx="87" cy="250" rx="7" ry="36"/><ellipse class="f45-pir" cx="103" cy="250" rx="7" ry="36"/>
          <path class="f45-dek f45-dek-m" d="M84 292 L104 318" marker-end="url(#f45-ok-b)"/><path class="f45-dek f45-dek-s" d="M86 318 L104 292" marker-end="url(#f45-ok-c)"/></g>
        <path class="f45-ctx" d="M82 318 L108 318 L106 366 L84 366 Z"/>
        <g class="f45-nopt">
          <path class="f45-lead" d="M140 70 L160 70 M150 150 L160 150 M152 197 L160 197 M116 262 L160 262"/>
          ${tx(164, 74, 'orta beyin', 'f45-t')}${tx(164, 154, 'pons', 'f45-t')}${tx(164, 201, 'pons–medulla sınırı', 'f45-t')}${tx(164, 266, 'medulla oblongata', 'f45-t')}
          ${tx(164, 300, 'motor ↓', 'f45-ts f45-c-basic f45-dek-t')}${tx(164, 316, 'duyu ↑ çaprazlaşır', 'f45-ts f45-c-clin f45-dek-t')}
          ${tx(120, 352, 'omurilik', 'f45-ts')}
        </g></svg></div><div class="f45-liste" aria-live="off"></div></div>
      <div class="f45-segkay">${segHtml('Düzey', 's', [['mez', 'Orta beyin'], ['pons', 'Pons'], ['sin', 'Sınır'], ['med', 'Medulla']], sec)}</div>`;
    const liste = el.querySelector('.f45-liste'), g = el.querySelector('.f45-sap-g');
    const uygula = () => {
      el.querySelectorAll('.f45-sv').forEach((p) => p.classList.toggle('on', p.dataset.s === sec));
      g.classList.toggle('f45-medon', sec === 'med');
      el.querySelector('.f45-dek-m').setAttribute('marker-end', sec === 'med' ? 'url(#f45-ok-b)' : '');
      el.querySelector('.f45-dek-s').setAttribute('marker-end', sec === 'med' ? 'url(#f45-ok-c)' : '');
      liste.innerHTML = `<h4>${S[sec][0]}</h4><ul>${S[sec][1].map((m) => `<li>${m}</li>`).join('')}</ul>`;
      basSec(el, 's', sec);
    };
    secimDinle(el, 's', (v) => { sec = v; uygula(); capYaz(el, S[v][2]); });
    const ro = darIzle(el, (d) => g.classList.toggle('f45-dar', d));
    uygula();
    return () => ro();
  };

  /* =====================================================================
     5 · f45_capraz — lezyon hangi tarafı etkiler? (K1 s. 193)
     ===================================================================== */
  VIZ.f45_capraz = (el) => {
    const LZ = { mot: 'Sağ motor korteks', ser: 'Sağ serebellar hemisfer', ver: 'Vermis', yok: 'Lezyon yok' };
    const CAP = {
      mot: '<b>Sağ motor korteks.</b> Piramidal yol medullada karşı tarafa geçtiği için hasar sol hemipleji yapar. [[K1 s. 193]]',
      ser: '<b>Sağ serebellar hemisfer.</b> Hasar aynı tarafta, yani sağda ekstremite ataksisi yapar; kol felç değildir, çünkü serebellum hareketi başlatmaz, yalnız düzeltir. [[K1 s. 193]]',
      ver: '<b>Vermis.</b> Orta kısım gövdenin motor ve postüral kontrolünü yürütür; hasarı gövde dengesini bozar. [[K1 s. 193]]',
      yok: '<b>Sağlam sistem.</b> Motor korteks hareketi başlatır; serebellum deneyimle kurduğu "çalışma modeli" ile hareketi akıcı, eşgüdümlü ve isabetli kılar. [[K1 s. 193]]',
    };
    let lz = 'mot', dar = false, ts = RM ? 9 : 0, th = RM ? 9 : -1;
    el.innerHTML = `<div class="f45-kont"><div><span class="f45-lbl">Lezyon</span>${segHtml('Lezyon', 'lz', Object.keys(LZ).map((k) => [k, LZ[k]]), lz)}</div>
      <div class="btn-row"><button type="button" class="btn" data-a="har">Hareket et</button></div></div>
      <div class="f45-svgk f45-cap-k"></div>
      <div class="legend"><span><i style="background:var(--c-basic)"></i>piramidal yol (medullada çaprazlaşır)</span><span><i style="background:var(--c-clin)"></i>serebellar etki: aynı taraf</span><span><i style="background:var(--warn)"></i>vermis → gövde</span></div>`;
    const kutu = el.querySelector('.f45-cap-k');
    let svg;
    /* sağ (izleyicinin solu) ve sol (izleyicinin sağı) */
    const SH = { R: [154, 318], L: [206, 318] }, TG = { R: [62, 300], L: [298, 300] }, RS = { R: [118, 384], L: [242, 384] };
    const ciz = () => {
      const ox = dar ? 0 : 0;
      const ped = dar
        ? `<g transform="translate(0 412)" class="f45-nopt">${tx(10, 12, 'Serebellar pedinküller', 'f45-t')}
            <rect class="f45-pbox" x="10" y="26" width="92" height="72" rx="8"/>${tx(56, 66, 'serebellum', 'f45-ts', 'middle')}
            ${[['orta beyin', 'superior', 30], ['pons', 'orta', 54], ['medulla', 'inferior', 78]].map(([a, b, y]) => `<rect class="f45-pbox" x="250" y="${y - 10}" width="100" height="20" rx="6"/>${tx(300, y + 4, a, 'f45-ts', 'middle')}<path class="f45-ped" d="M102 ${62 + (y - 54) * 0.5} L250 ${y}"/>${tx(244, y - 4, b, 'f45-ts f45-c-clin f45-halo', 'end')}`).join('')}
            ${tx(350, 116, 'kitap: superior ve orta → pons', 'f45-ts', 'end')}</g>`
        : `<g transform="translate(400 40)" class="f45-nopt">${tx(0, 0, 'Serebellar pedinküller', 'f45-t')}
            <rect class="f45-pbox" x="140" y="40" width="88" height="96" rx="8"/>${tx(184, 92, 'serebellum', 'f45-ts', 'middle')}
            ${[['orta beyin', 'superior', 40], ['pons', 'orta', 88], ['medulla', 'inferior', 136]].map(([a, b, y]) => `<rect class="f45-pbox" x="0" y="${y - 13}" width="86" height="26" rx="6"/>${tx(43, y + 4, a, 'f45-ts', 'middle')}<path class="f45-ped" d="M86 ${y} L140 ${60 + (y - 40) * 0.6}"/>${tx(90, y - 5, b, 'f45-ts f45-c-clin f45-halo', 'start')}`).join('')}
            ${tx(0, 176, 'kitap: superior ve orta → pons', 'f45-ts')}</g>`;
      kutu.innerHTML = `<svg class="f45-svg" viewBox="${dar ? '0 0 360 540' : '0 0 640 404'}" role="img" aria-label="Lezyon yeri ile bulgu tarafı: piramidal yol çaprazlaşır, serebellar etki aynı taraftadır">
        <defs>${okDef('f45-ok-c2', 'f45-okc')}${okDef('f45-ok-w', 'f45-okw')}</defs>
        <g transform="translate(${ox} 0)">
        ${tx(100, 22, 'SAĞ', 'f45-big', 'middle')}${tx(100, 38, 'hastanın sağı', 'f45-ts', 'middle')}
        ${tx(260, 22, 'SOL', 'f45-big', 'middle')}${tx(260, 38, 'hastanın solu', 'f45-ts', 'middle')}
        <ellipse class="f45-hem" cx="122" cy="92" rx="56" ry="40"/><ellipse class="f45-hem" cx="238" cy="92" rx="56" ry="40"/>
        <path class="f45-mstrip" d="M82 72 C100 56 144 56 162 72"/><path class="f45-mstrip" d="M198 72 C216 56 260 56 278 72"/>
        ${tx(110, 106, 'motor korteks', 'f45-ts', 'middle')}${tx(250, 106, 'motor korteks', 'f45-ts', 'middle')}
        <ellipse class="f45-cb" cx="132" cy="190" rx="38" ry="22"/><ellipse class="f45-cb" cx="228" cy="190" rx="38" ry="22"/>
        <rect class="f45-bs" x="170" y="128" width="20" height="120" rx="6"/>
        <ellipse class="f45-cbv" cx="180" cy="190" rx="11" ry="18"/>
        ${tx(104, 160, 'serebellar hem.', 'f45-ts f45-halo', 'middle')}${tx(256, 160, 'serebellar hem.', 'f45-ts f45-halo', 'middle')}${tx(204, 224, 'vermis', 'f45-ts f45-c-warn f45-halo', 'start')}
        <rect class="f45-bs" x="172" y="248" width="16" height="56" rx="4"/>
        <path class="f45-pyr" data-p="R" d="M146 64 C160 90 172 118 174 150 L174 224 L186 244 L186 300 C196 306 200 312 ${SH.L[0]} ${SH.L[1]}"/>
        <path class="f45-pyr" data-p="L" d="M214 64 C200 90 188 118 186 150 L186 224 L174 244 L174 300 C164 306 160 312 ${SH.R[0]} ${SH.R[1]}"/>
        ${tx(194, 248, 'medulla: çaprazlaşma', 'f45-ts f45-halo', 'start')}
        <path class="f45-cbe" data-p="R" d="M100 208 C76 240 84 290 ${SH.R[0] - 6} ${SH.R[1] - 4}" marker-end="url(#f45-ok-c2)"/>
        <path class="f45-cbe" data-p="L" d="M260 208 C284 240 276 290 ${SH.L[0] + 6} ${SH.L[1] - 4}" marker-end="url(#f45-ok-c2)"/>
        ${tx(64, 262, 'aynı taraf', 'f45-ts f45-c-clin', 'middle')}${tx(296, 262, 'aynı taraf', 'f45-ts f45-c-clin', 'middle')}
        <path class="f45-vre" d="M180 208 C200 240 206 280 196 330" marker-end="url(#f45-ok-w)"/>
        <g class="f45-govde"><circle class="f45-insan-b" cx="180" cy="300" r="0"/>
          <path class="f45-insan" d="M154 318 L206 318 L198 372 L162 372 Z M168 372 L162 402 M192 372 L198 402"/></g>
        <circle class="f45-hedefc" cx="${TG.R[0]}" cy="${TG.R[1]}" r="8"/><circle class="f45-hedefc" cx="${TG.L[0]}" cy="${TG.L[1]}" r="8"/>
        <path class="f45-iz" data-k="R"/><path class="f45-iz" data-k="L"/>
        <path class="f45-kol" data-k="R"/><path class="f45-kol" data-k="L"/>
        <circle class="f45-el" data-k="R" r="5"/><circle class="f45-el" data-k="L" r="5"/>
        <path class="f45-lez" d="M0 -12 L3.5 -4 L12 -4 L5 1.5 L7.5 10 L0 5 L-7.5 10 L-5 1.5 L-12 -4 L-3.5 -4 Z"/>
        <text class="f45-bulgu" data-b="hem" x="300" y="352" text-anchor="middle">hemipleji</text>
        <text class="f45-bulgu" data-b="ata" x="60" y="352" text-anchor="middle">ataksi</text>
        <text class="f45-bulgu" data-b="gov" x="${dar ? 180 : 260}" y="${dar ? 400 : 398}" text-anchor="${dar ? 'middle' : 'start'}">gövde ve postür</text>
        <circle class="f45-sinyal" r="5"/>
        </g>${ped}</svg>`;
      svg = kutu.querySelector('svg');
      kare();
    };
    const lezPos = { mot: [140, 64], ser: [132, 190], ver: [180, 190] };
    const elPos = (k, u, lez) => {
      const r = RS[k], h = TG[k];
      if (k === 'L' && lez === 'mot') return { x: r[0], y: r[1] };
      let x = r[0] + (h[0] - r[0]) * ease(u), y = r[1] + (h[1] - r[1]) * ease(u);
      if (k === 'R' && lez === 'ser' && u > 0) {
        const s = Math.sin(u * Math.PI * 7) * 12 * (1 - u * 0.4), dx = h[0] - r[0], dy = h[1] - r[1], n = Math.hypot(dx, dy);
        const os = u > 0.7 ? Math.sin((u - 0.7) / 0.3 * Math.PI) * 18 : 0;
        x += (-dy / n) * s + (dx / n) * os; y += (dx / n) * s + (dy / n) * os;
      }
      return { x, y };
    };
    const kolCiz = (k, p) => {
      const sh = SH[k], mx = (sh[0] + p.x) / 2 + (k === 'R' ? -10 : 10), my = (sh[1] + p.y) / 2 + 12;
      return `M${sh[0]} ${sh[1]} Q${mx} ${my} ${p.x} ${p.y}`;
    };
    const kare = () => {
      if (!svg) return;
      const lp = lezPos[lz];
      const lez = svg.querySelector('.f45-lez');
      if (lp) { const sc = RM ? 1 : clamp(ts / 0.3, 0, 1); lez.setAttribute('transform', `translate(${lp[0]} ${lp[1]}) scale(${sc})`); lez.style.display = ''; } else lez.style.display = 'none';
      svg.querySelectorAll('.f45-pyr').forEach((p) => p.classList.toggle('ak', (lz === 'mot' && p.dataset.p === 'R') || lz === 'yok'));
      svg.querySelectorAll('.f45-pyr').forEach((p) => p.classList.toggle('kes', lz === 'mot' && p.dataset.p === 'R'));
      svg.querySelectorAll('.f45-cbe').forEach((p) => p.classList.toggle('ak', (lz === 'ser' && p.dataset.p === 'R') || lz === 'yok'));
      svg.querySelector('.f45-vre').classList.toggle('ak', lz === 'ver' || lz === 'yok');
      const sg = svg.querySelector('.f45-sinyal');
      const sp = lz === 'mot' ? svg.querySelector('.f45-pyr[data-p=R]') : lz === 'ser' ? svg.querySelector('.f45-cbe[data-p=R]') : lz === 'ver' ? svg.querySelector('.f45-vre') : svg.querySelector('.f45-pyr[data-p=L]');
      if (!RM && ts < 1.8 && sp) { const q = nokta(sp, ts / 1.5); sg.setAttribute('cx', q.x); sg.setAttribute('cy', q.y); sg.style.opacity = ts < 1.5 ? 1 : 0; sg.classList.toggle('kr', lz === 'mot'); } else sg.style.opacity = 0;
      const u = th < 0 ? 0 : clamp(th / 1.6, 0, 1);
      ['R', 'L'].forEach((k) => {
        const p = elPos(k, u, lz);
        svg.querySelector(`.f45-kol[data-k=${k}]`).setAttribute('d', kolCiz(k, p));
        const e = svg.querySelector(`.f45-el[data-k=${k}]`); e.setAttribute('cx', p.x); e.setAttribute('cy', p.y);
        const fel = k === 'L' && lz === 'mot';
        svg.querySelector(`.f45-kol[data-k=${k}]`).classList.toggle('fel', fel); e.classList.toggle('fel', fel);
        const iz = svg.querySelector(`.f45-iz[data-k=${k}]`);
        if (k === 'R' && lz === 'ser' && u > 0) { let d = ''; for (let i = 0; i <= 40; i++) { const q = elPos('R', (i / 40) * u, 'ser'); d += (i ? ' L' : 'M') + q.x.toFixed(1) + ' ' + q.y.toFixed(1); } iz.setAttribute('d', d); } else iz.setAttribute('d', '');
      });
      const sway = lz === 'ver' && th >= 0 ? Math.sin(th * 6) * 4 * (RM ? 0 : 1) : 0;
      svg.querySelector('.f45-govde').setAttribute('transform', `rotate(${sway.toFixed(2)} 180 402)`);
      svg.querySelector('[data-b=hem]').classList.toggle('on', lz === 'mot');
      svg.querySelector('[data-b=ata]').classList.toggle('on', lz === 'ser' && (th > 0.2 || RM));
      svg.querySelector('[data-b=gov]').classList.toggle('on', lz === 'ver' && (th > 0.2 || RM));
    };
    secimDinle(el, 'lz', (v) => { lz = v; basSec(el, 'lz', v); capYaz(el, CAP[v]); ts = RM ? 9 : 0; th = RM ? 9 : -1; kare(); });
    el.querySelector('[data-a=har]').addEventListener('click', () => { th = RM ? 9 : 0; kare(); });
    const ro = darIzle(el, (d) => { dar = d; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      let ch = false;
      if (ts < 2) { ts += dt; ch = true; }
      if (th >= 0 && (th < 1.7 || lz === 'ver')) { th += dt; ch = true; if (lz === 'ver' && th > 4) { th = 1.7; } }
      if (ch) kare();
    });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     6 · f45_meninks — zarlar ve aralıklar; köprü ven yırtılması (K1 s. 193–194)
     ===================================================================== */
  VIZ.f45_meninks = (el) => {
    const CAP = {
      beyin: '<b>Beyin.</b> Dura iki katlıdır; dural venöz sinüsler bu iki katın arasında uzanır. Bir katmana dokunun ya da omuriliğe geçin. [[K1 s. 194]]',
      dura: '<b>Dura mater.</b> Kalın dış zar; dışta periostal, içte meningeal kat. İçe dört kıvrım yapar: falx cerebri, tentorium cerebelli, falx cerebelli, diaphragma sellae. [[K1 s. 194]]',
      ara: '<b>Araknoid mater.</b> İnce, örümcek ağı görünümlü zar. [[K1 s. 194]]',
      pia: '<b>Pia mater.</b> Çok ince, damardan zengin; beyin ve omurilik yüzeyine yapışır. Omurilik bitince filum terminale olarak sürer. [[K1 s. 194]]',
      sd: '<b>Subdural aralık.</b> Dura ile araknoid arasındaki potansiyel aralık; beyinde de omurilikte de vardır. [[K1 s. 194]]',
      sa: '<b>Subaraknoid aralık.</b> Araknoid ile pia arasındadır ve beyin-omurilik sıvısı içerir. [[K1 s. 194]]',
      hem: '<b>Subdural hematom.</b> Köprü ven yırtılınca kan dura ile araknoidi birbirinden ayırır. [[K1 s. 194]]',
      om: '<b>Omurilik.</b> Spinal dura ligamenta flavadan ve vertebra gövdesi, pedikül ve laminaların periostundan epidural aralıkla ayrılır. [[K1 s. 194]]',
      epi: '<b>Epidural (ekstradural) aralık.</b> Lenfatikler, spinal sinir kökleri, gevşek bağ dokusu ve epidural venöz pleksus içerir; sakrokoksigeal membrandan foramen magnuma uzanır. [[K1 s. 194]]',
    };
    let mod = 'beyin', sec = '', dar = false, k = 0, oyn = false;
    el.innerHTML = `<div class="f45-kont"><div><span class="f45-lbl">Kesit</span>${segHtml('Kesit', 'm', [['beyin', 'Beyin'], ['om', 'Omurilik']], mod)}</div>
      <div class="btn-row"><button type="button" class="btn" data-a="ven">Köprü ven yırtılsın</button></div></div>
      <div class="f45-g2 f45-men-g"><div class="f45-svgk f45-men-k"></div><div class="f45-men-yan"></div></div>`;
    const kutu = el.querySelector('.f45-men-k'), yan = el.querySelector('.f45-men-yan'), g = el.querySelector('.f45-men-g'), vbtn = el.querySelector('[data-a=ven]');
    let W = 400, X0 = 0, X1 = 400;
    const h = (x) => { const c = W / 2, s = 120; const u = (x - c) / s; return Math.abs(u) >= 1 ? 0 : Math.pow(Math.cos(u * Math.PI / 2), 2) * 36 * ease(k); };
    const bant = (yTop, yBot, cls, attr) => {
      let d = `M${X0} ${yTop(X0)}`;
      for (let x = X0; x <= X1; x += 10) d += ` L${x} ${yTop(x).toFixed(1)}`;
      for (let x = X1; x >= X0; x -= 10) d += ` L${x} ${yBot(x).toFixed(1)}`;
      return `<path class="${cls}" ${attr || ''} d="${d} Z"/>`;
    };
    const ciz = () => {
      W = dar ? 340 : 400; X1 = W;
      const lab = (x, y, s, cls) => tx(x, y, s, (cls || 'f45-t3') + ' f45-halo');
      if (mod === 'beyin') {
        const A = (x) => 92 + h(x);
        let trab = ''; for (let x = 24; x < 400; x += 34) trab += `M${x} ${(A(x) + 12).toFixed(1)} C${x + 6} ${(A(x) + 30).toFixed(1)} ${x - 6} ${(A(x) + 44).toFixed(1)} ${x + 2} 170 `;
        const yirt = k > 0.05;
        kutu.innerHTML = `<svg class="f45-svg" viewBox="0 0 ${W} 250" role="img" aria-label="Kafatasında zarlar ve aralıklar: kemik, iki katlı dura, subdural aralık, araknoid, subaraknoid aralık, pia, korteks">
          <defs><pattern id="f45-kemik" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" class="f45-kem-z"/><circle cx="4" cy="4" r="1.6" class="f45-kem-n"/><circle cx="10" cy="9" r="1.2" class="f45-kem-n"/></pattern></defs>
          <rect class="f45-kem" x="0" y="0" width="${W}" height="46"/>
          <g class="f45-kat" ${btnAt('k', 'dura', 'Dura mater')}><rect class="f45-dura1" x="0" y="46" width="${W}" height="18"/><rect class="f45-dura2" x="0" y="64" width="${W}" height="16"/></g>
          <path class="f45-sinus" d="M${W - 112} 48 L${W - 48} 48 L${W - 80} 84 Z"/>
          ${bant(() => 80, A, 'f45-sd', btnAt('k', 'sd', 'Subdural aralık'))}
          ${k > 0 ? bant((x) => 80, (x) => 80 + Math.max(0, h(x) * 0.98 + (h(x) > 0.5 ? 8 : 0)), 'f45-kan') : ''}
          ${bant(A, (x) => A(x) + 12, 'f45-ara', btnAt('k', 'ara', 'Araknoid mater'))}
          ${bant((x) => A(x) + 12, () => 170, 'f45-sa', btnAt('k', 'sa', 'Subaraknoid aralık'))}
          <path class="f45-trab" d="${trab}"/>
          <g class="f45-kat" ${btnAt('k', 'pia', 'Pia mater')}><rect class="f45-pia" x="0" y="170" width="${W}" height="8"/></g>
          <rect class="f45-kor" x="0" y="178" width="${W}" height="72"/>
          <path class="f45-kven${yirt ? ' kop' : ''}" d="M120 178 C120 140 140 ${(A(140) + 6).toFixed(1)} 170 ${(A(170)).toFixed(1)}"/>
          <path class="f45-kven${yirt ? ' kop' : ''}" d="${yirt ? 'M196 80' : `M170 ${A(170).toFixed(1)}`} C210 76 ${W - 150} 70 ${W - 108} 60"/>
          <g class="f45-nopt">
            ${lab(8, 30, 'kafatası', 'f45-t3')}${lab(8, 60, 'dura: periostal kat')}${lab(8, 77, 'dura: meningeal kat')}
                        ${lab(8, 140, 'subaraknoid aralık · BOS', 'f45-t3 f45-c-basic')}
            ${lab(8, 216, 'korteks', 'f45-t3')}
            ${tx(W - 8, 28, 'dural venöz sinüs', 'f45-t3 f45-c-basic f45-halo', 'end')}
            ${tx(W - 8, 200, 'pia: damardan zengin, yüzeye yapışık', 'f45-ts f45-halo', 'end')}
            ${tx(W - 8, 236, 'köprü ven: korteksten sinüse', 'f45-ts f45-c-basic f45-halo', 'end')}
            ${k > 0.3 ? tx(W / 2, 108, 'subdural hematom', 'f45-t3 f45-c-crit f45-halo', 'middle') : `${tx(8, 91, 'subdural aralık (potansiyel)', 'f45-ts f45-halo')}${tx(8, 104, 'araknoid', 'f45-ts f45-halo')}`}
          </g></svg>`;
        yan.innerHTML = `<p class="f45-yan-bas">Dura kıvrımları</p><ul class="f45-kiv">
          <li><b>falx cerebri</b>hemisferler arası</li><li><b>tentorium cerebelli</b>oksipital lob / serebellum arası</li>
          <li><b>falx cerebelli</b>tentoriumun altında, serebellar hemisferler arası</li><li><b>diaphragma sellae</b>sella turcicada hipofizi saran halka</li></ul>`;
      } else {
        kutu.innerHTML = `<svg class="f45-svg" viewBox="0 0 ${W} 268" role="img" aria-label="Omurilikte zarlar ve epidural aralık">
          <rect class="f45-kem" x="0" y="0" width="${W}" height="36"/>
          <g class="f45-kat" ${btnAt('k', 'epi', 'Epidural aralık')}><rect class="f45-epi" x="0" y="36" width="${W}" height="86"/></g>
          <g class="f45-nopt">
            <path class="f45-kok" d="M${W - 150} 122 C${W - 144} 96 ${W - 120} 80 ${W - 70} 70"/>
            ${[[40, 60], [120, 96], [200, 58], [W - 40, 100]].map(([x, y]) => `<circle class="f45-plex" cx="${x}" cy="${y}" r="7"/><circle class="f45-plex" cx="${x + 13}" cy="${y + 5}" r="5"/>`).join('')}
            ${[[90, 54], [W - 100, 104]].map(([x, y]) => `<circle class="f45-lenf" cx="${x}" cy="${y}" r="4"/><circle class="f45-lenf" cx="${x + 9}" cy="${y - 4}" r="3"/>`).join('')}
            <path class="f45-gevsek" d="M150 72 c6 -6 12 6 18 0 s12 6 18 0 M${W - 70} 112 c6 -6 12 6 18 0 s12 6 18 0"/>
          </g>
          <g class="f45-kat" ${btnAt('k', 'dura', 'Spinal dura')}><rect class="f45-dura2" x="0" y="122" width="${W}" height="16"/></g>
          <g class="f45-kat" ${btnAt('k', 'sd', 'Subdural aralık')}><rect class="f45-sd" x="0" y="138" width="${W}" height="10"/></g>
          <g class="f45-kat" ${btnAt('k', 'ara', 'Araknoid mater')}><rect class="f45-ara" x="0" y="148" width="${W}" height="10"/></g>
          <g class="f45-kat" ${btnAt('k', 'sa', 'Subaraknoid aralık')}><rect class="f45-sa" x="0" y="158" width="${W}" height="46"/></g>
          <g class="f45-kat" ${btnAt('k', 'pia', 'Pia mater')}><rect class="f45-pia" x="0" y="204" width="${W}" height="8"/></g>
          <rect class="f45-kor" x="0" y="212" width="${W}" height="56"/>
          <g class="f45-nopt">
            ${lab(8, 24, 'ligamenta flava / periost')}
            ${lab(8, 52, 'epidural (ekstradural) aralık', 'f45-t3 f45-c-warn')}
            ${tx(28, 84, 'venöz pleksus', 'f45-ts f45-halo')}${tx(98, 46, 'lenfatikler', 'f45-ts f45-halo')}${tx(150, 92, 'gevşek bağ dokusu', 'f45-ts f45-halo')}${tx(W - 62, 62, 'spinal sinir kökü', 'f45-ts f45-halo', 'end')}
            ${lab(8, 135, 'spinal dura')}${tx(8, 186, 'subaraknoid aralık · BOS', 'f45-t3 f45-c-basic f45-halo')}${tx(W - 8, 147, 'subdural · araknoid', 'f45-ts f45-halo', 'end')}
            ${tx(W - 8, 222, 'pia', 'f45-ts f45-halo', 'end')}${lab(8, 244, 'omurilik')}
          </g></svg>`;
        const mini = dar
          ? `<svg class="f45-svg" viewBox="0 0 340 112" role="img" aria-label="Epidural aralık foramen magnumdan sakrokoksigeal membrana uzanır; filum terminale omuriliği koksikse bağlar">
              <defs>${okDef('f45-ok-m', 'f45-okm')}</defs>
              <path class="f45-om-c" d="M20 40 L320 40"/><path class="f45-om-k" d="M20 56 L190 56"/><path class="f45-om-f" d="M190 56 L318 56"/>
              <path class="f45-om-ok" d="M24 80 L316 80" marker-start="url(#f45-ok-m)" marker-end="url(#f45-ok-m)"/>
              ${tx(20, 26, 'foramen magnum', 'f45-ts')}${tx(320, 26, 'sakrokoksigeal membran', 'f45-ts', 'end')}
              ${tx(170, 100, 'epidural aralık', 'f45-ts f45-c-warn', 'middle')}${tx(100, 70, 'omurilik', 'f45-ts', 'middle')}${tx(256, 70, 'filum terminale', 'f45-ts', 'middle')}</svg>`
          : `<svg class="f45-svg" viewBox="0 0 200 270" role="img" aria-label="Epidural aralık foramen magnumdan sakrokoksigeal membrana uzanır; filum terminale omuriliği koksikse bağlar">
              <defs>${okDef('f45-ok-m', 'f45-okm')}</defs>
              <path class="f45-om-c" d="M70 20 L70 250"/><path class="f45-om-k" d="M86 20 L86 150"/><path class="f45-om-f" d="M86 150 L86 248"/>
              <path class="f45-om-ok" d="M40 24 L40 246" marker-start="url(#f45-ok-m)" marker-end="url(#f45-ok-m)"/>
              ${tx(70, 12, 'foramen magnum', 'f45-ts', 'middle')}${tx(70, 266, 'sakrokoksigeal membran', 'f45-ts', 'middle')}
              ${tx(34, 140, 'epidural aralık', 'f45-ts f45-c-warn', 'middle', ' transform="rotate(-90 34 140)"')}
              ${tx(94, 90, 'omurilik', 'f45-ts')}${tx(94, 190, 'filum terminale', 'f45-ts')}${tx(94, 205, '(pia + dura,', 'f45-ts')}${tx(94, 220, 'koksikse bağlar)', 'f45-ts')}</svg>`;
        yan.innerHTML = `<p class="f45-yan-bas">Uzunlamasına</p>${mini}`;
      }
      el.querySelectorAll('[data-k]').forEach((p) => p.classList.toggle('on', p.dataset.k === sec));
    };
    const capH = () => {
      if (mod === 'beyin' && k > 0.5 && !sec) return CAP.hem;
      if (!sec) return CAP[mod];
      if (sec === 'pia' && mod === 'om') return CAP.pia.replace(' [[', ' Durayla birlikte omuriliği koksikse bağlar. [[');
      return CAP[sec];
    };
    secimDinle(el, 'm', (v) => { mod = v; sec = ''; k = 0; oyn = false; basSec(el, 'm', v); vbtn.style.display = v === 'beyin' ? '' : 'none'; vbtn.textContent = 'Köprü ven yırtılsın'; ciz(); capYaz(el, capH()); });
    secimDinle(el, 'k', (v) => { sec = sec === v ? '' : v; el.querySelectorAll('[data-k]').forEach((p) => p.classList.toggle('on', p.dataset.k === sec)); capYaz(el, capH()); });
    vbtn.addEventListener('click', () => {
      if (k > 0) { k = 0; oyn = false; vbtn.textContent = 'Köprü ven yırtılsın'; ciz(); capYaz(el, capH()); return; }
      sec = ''; vbtn.textContent = 'Baştan';
      if (RM) { k = 1; ciz(); } else { k = 0.001; oyn = true; }
      capYaz(el, CAP.hem);
    });
    const ro = darIzle(el, (d) => { dar = d; g.classList.toggle('f45-dar', d); ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { if (!oyn) return; k = Math.min(1, k + dt / 3); if (k >= 1) oyn = false; ciz(); });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     7 · f45_glia — dört glia hücresi (K1 s. 194)
     ===================================================================== */
  VIZ.f45_glia = (el) => {
    const G = { ast: 'Astrosit', oli: 'Oligodendrosit', epe: 'Ependim', mik: 'Mikroglia' };
    const CAP = {
      ast: '<b>Astrosit.</b> En bol glia hücresi; nöronları kan damarlarına bağlar ve kan–beyin bariyerini kurarak nörona sabit bir dış ortam sağlar (Bölüm 47). [[K1 s. 194]]',
      oli: '<b>Oligodendrosit.</b> Periferdeki Schwann hücresinin MSS\'deki karşılığı; aksonları elektriksel yalıtkan miyelinle sarar (Bölüm 52). [[K1 s. 194]]',
      epe: '<b>Ependim hücreleri.</b> Beyin ventriküllerinin ve omurilik santral kanalının epitel örtüsü. [[K1 s. 194]]',
      mik: '<b>Mikroglia.</b> MSS\'nin özelleşmiş makrofajları. [[K1 s. 194]]',
    };
    let sec = 'ast', dar = false, pk = RM ? 1 : 0;
    el.innerHTML = `<div class="f45-kont"><div>${segHtml('Glia hücresi', 'gl', Object.keys(G).map((k) => [k, G[k]]), sec)}</div><span class="tag gold f45-rozet">nöron: bölünmez · glia: yaşam boyu bölünür</span></div>
      <div class="f45-svgk f45-glia-k"></div>`;
    const kutu = el.querySelector('.f45-glia-k');
    const ciz = () => {
      const l = dar ? { bbb: 'kan–beyin bariyeri', my: 'miyelin', ve: 'ventrikül', mk: 'makrofaj' } : { bbb: 'kapiller duvarı: kan–beyin bariyeri', my: 'miyelin: elektriksel yalıtkan', ve: 'ventrikül / santral kanal (BOS)', mk: 'makrofaj: artığı yutar' };
      let ep = ''; for (let x = 0; x < 480; x += 40) ep += `<rect x="${x + 1}" y="36" width="38" height="22" rx="4"/><circle cx="${x + 20}" cy="47" r="4" class="f45-cek"/>`;
      kutu.innerHTML = `<svg class="f45-svg" viewBox="0 0 480 318" role="img" aria-label="Nöron ve çevresindeki astrosit, oligodendrosit, ependim hücreleri ve mikroglia">
        <rect class="f45-bos" x="0" y="0" width="480" height="36"/>${tx(240, 24, l.ve, 'f45-tg f45-c-basic', 'middle')}
        <g class="f45-hc" ${btnAt('gl', 'epe', 'Ependim hücreleri')}><g class="f45-epe">${ep}</g><rect class="f45-halka" x="-2" y="33" width="484" height="28" rx="8"/></g>
        <g class="f45-noron"><path d="M178 160 C150 140 130 120 110 108 M182 146 C176 120 180 100 170 82 M196 140 C204 118 222 104 236 96 M180 176 C160 190 140 196 120 192"/>
          <path class="f45-akson" d="M222 162 L470 170"/><circle cx="200" cy="160" r="22" class="f45-soma"/></g>
        ${tx(200, 196, 'nöron', 'f45-tg', 'middle', ' dy="1"')}
        <g class="f45-hc" ${btnAt('gl', 'oli', 'Oligodendrosit')}><g class="f45-oli"><path d="M330 104 C310 120 300 140 288 158 M334 104 C336 130 340 146 342 160 M338 102 C362 124 384 140 396 160"/>
          <rect x="262" y="157" width="46" height="13" rx="6.5"/><rect x="318" y="158" width="46" height="13" rx="6.5"/><rect x="374" y="160" width="46" height="13" rx="6.5"/><circle cx="334" cy="98" r="13"/></g>
          <circle class="f45-halka" cx="334" cy="98" r="22"/></g>
        ${tx(352, 92, 'oligodendrosit', 'f45-tg f45-halo', 'start')}${tx(340, 192, l.my, 'f45-tg2 f45-c-basic f45-halo', 'middle')}
        <rect class="f45-kap" x="0" y="262" width="250" height="26" rx="13"/>
        ${[30, 92, 150, 206].map((x) => `<ellipse class="f45-rbc" cx="${x}" cy="275" rx="11" ry="7"/>`).join('')}
        <g class="f45-hc" ${btnAt('gl', 'ast', 'Astrosit')}><g class="f45-ast"><path d="M110 222 C130 200 160 186 182 176 M104 230 C80 240 60 250 50 262 M112 232 C114 244 118 252 124 262 M120 226 C150 236 170 248 190 262 M100 222 C86 210 74 200 60 196"/>
          <path class="f45-ayak" d="M38 262 L62 262 M112 262 L136 262 M178 262 L202 262"/><circle cx="108" cy="226" r="11"/></g>
          <circle class="f45-halka" cx="108" cy="226" r="22"/></g>
        ${tx(74, 214, 'astrosit', 'f45-tg f45-halo', 'end')}${tx(125, 308, l.bbb, 'f45-tg2 f45-c-crit', 'middle')}
        <g class="f45-hc" ${btnAt('gl', 'mik', 'Mikroglia')}><g class="f45-mik"><path d="M390 248 L372 234 M390 248 L380 268 M394 246 L404 228 M396 250 L418 256 M378 234 L366 238 M404 228 L412 222"/><circle cx="392" cy="248" r="9"/></g>
          <circle class="f45-halka" cx="392" cy="248" r="22"/></g>
        <circle class="f45-artik" cx="452" cy="286" r="5"/>
        ${tx(392, 296, 'mikroglia', 'f45-tg', 'middle')}${tx(392, 313, l.mk, 'f45-tg2 f45-c-warn', 'middle')}
        ${tx(dar ? 476 : 476, 222, dar ? '' : '', 'f45-ts', 'end')}
      </svg>`;
      uygula();
    };
    const uygula = () => {
      kutu.querySelectorAll('.f45-hc').forEach((p) => { p.classList.toggle('on', p.dataset.gl === sec); p.classList.toggle('sol', p.dataset.gl !== sec); });
      basSec(el, 'gl', sec);
      art();
    };
    const art = () => {
      const a = kutu.querySelector('.f45-artik'); if (!a) return;
      const kk = sec === 'mik' ? ease(pk) : 0;
      a.setAttribute('cx', 452 + (400 - 452) * kk); a.setAttribute('cy', 286 + (254 - 286) * kk);
      a.style.opacity = sec === 'mik' && pk >= 1 ? 0.35 : 1;
    };
    secimDinle(el, 'gl', (v) => { sec = v; pk = RM ? 1 : 0; uygula(); capYaz(el, CAP[v]); });
    const ro = darIzle(el, (d) => { dar = d; kutu.classList.toggle('f45-dar', d); ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { if (sec === 'mik' && pk < 1) { pk = Math.min(1, pk + dt / 1.5); art(); } });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     8 · f45_willis — Willis poligonu: bir damarı tıkayın (K1 s. 194–196)
     ===================================================================== */
  VIZ.f45_willis = (el) => {
    /* hasta solu = izleyicinin sağı (alttan görünüm, ön yukarıda) */
    const V = {
      vR: 'M140 412 C142 380 160 350 176 330', vL: 'M220 412 C218 380 200 350 184 330',
      bas: 'M180 332 L180 254',
      p1R: 'M180 254 C164 248 150 244 136 242', p1L: 'M180 254 C196 248 210 244 224 242',
      p2R: 'M136 242 C110 244 84 252 62 266', p2L: 'M224 242 C250 244 276 252 298 266',
      pcR: 'M136 242 C134 220 132 196 130 170', pcL: 'M224 242 C226 220 228 196 230 170',
      mR: 'M124 158 C100 152 70 150 40 150', mL: 'M236 158 C260 152 290 150 320 150',
      a1R: 'M134 152 C146 130 158 108 166 94', a1L: 'M226 152 C214 130 202 108 194 94',
      a2R: 'M166 94 C164 74 162 56 162 40', a2L: 'M194 94 C196 74 198 56 198 40',
      ac: 'M166 94 L194 94',
    };
    const POST = ['vR', 'vL', 'bas', 'p1R', 'p1L', 'p2R', 'p2L', 'pcR', 'pcL'];
    const TIK = { icaL: 'sol ICA', mL: 'sol MCA', a1L: 'sol ACA', bas: 'baziler arter', p2L: 'sol PCA', icaR: 'sağ ICA' };
    const ADI = { icaL: 'Sol ICA', icaR: 'Sağ ICA', mL: 'Sol MCA', a1L: 'Sol ACA', bas: 'Baziler arter', p2L: 'Sol PCA' };
    let tam = true, tik = '', dar = false, faz = 0;
    el.innerHTML = `<div class="f45-kont"><div><span class="f45-lbl">Poligon</span>${segHtml('Poligon', 'pl', [['tam', 'Tam'], ['eks', 'Eksik (PCom ve ACom yok)']], 'tam')}</div>
      <div class="btn-row"><button type="button" class="btn ghost" data-a="bas">Baştan</button></div></div>
      <div class="f45-g2 f45-wil-g"><div class="f45-svgk f45-wil-k"></div>
        <div class="f45-wil-yan"><p class="f45-sayac"><b>⅔</b> kan ICA'lardan · <b>⅓</b> vertebral arterlerden</p>
          <div class="legend"><span><i style="background:var(--c-basic)"></i>anterior dolaşım (ICA'dan)</span><span><i style="background:var(--c-clin)"></i>posterior dolaşım (vertebral arterlerden)</span></div>
          <div class="legend"><span><i style="background:var(--ok-soft);border:1.5px solid var(--ok)"></i>beslenir</span><span><i style="background:var(--warn-soft);border:1.5px solid var(--warn)"></i>kollateralle beslenir</span><span><i style="background:var(--crit-soft);border:1.5px solid var(--crit)"></i>enfarkt riski</span></div>
          <p class="f45-not">Tıklanabilir: sol/sağ ICA, sol MCA, sol ACA (ACom'dan önce), baziler arter, sol PCA (PCom'dan sonra).</p></div></div>`;
    const kutu = el.querySelector('.f45-wil-k'), g = el.querySelector('.f45-wil-g');
    let svg;
    /* akım: +1 yol yönünde, −1 ters, 0 yok; alan durumu ok/warn/crit */
    const model = () => {
      const f = { vR: 1, vL: 1, bas: 1, p1R: 1, p1L: 1, p2R: 1, p2L: 1, pcR: 0, pcL: 0, mR: 1, mL: 1, a1R: 1, a1L: 1, a2R: 1, a2L: 1, ac: 0, icaR: 1, icaL: 1 };
      const a = { aR: 'ok', aL: 'ok', mR: 'ok', mL: 'ok', pR: 'ok', pL: 'ok', bs: 'ok' };
      if (tik === 'icaL' || tik === 'icaR') {
        const s = tik === 'icaL' ? 'L' : 'R', o = s === 'L' ? 'R' : 'L';
        f['ica' + s] = 0;
        if (tam) { f.ac = s === 'L' ? 1 : -1; f['a1' + s] = -1; f['pc' + s] = 1; a['a' + s] = 'warn'; a['m' + s] = 'warn'; }
        else { f['a1' + s] = 0; f['m' + s] = 0; f['a2' + s] = 0; a['a' + s] = 'crit'; a['m' + s] = 'crit'; }
        void o;
      } else if (tik === 'bas') {
        f.bas = 0; f.p1R = 0; f.p1L = 0; a.bs = 'crit';
        if (tam) { f.pcR = -1; f.pcL = -1; f.p1R = -1; f.p1L = -1; a.pR = 'warn'; a.pL = 'warn'; } else { f.p2R = 0; f.p2L = 0; a.pR = 'crit'; a.pL = 'crit'; }
      } else if (tik === 'a1L') {
        f.a1L = 0;
        if (tam) { f.ac = 1; a.aL = 'warn'; } else { f.a2L = 0; a.aL = 'crit'; }
      } else if (tik === 'mL') { f.mL = 0; a.mL = 'crit'; }
      else if (tik === 'p2L') { f.p2L = 0; a.pL = 'crit'; }
      if (!tam) { f.ac = 0; f.pcR = 0; f.pcL = 0; }
      return { f, a };
    };
    const ROZ = { aR: [150, 20, 'a'], aL: [210, 20, 'a'], mR: [26, 150, 'm'], mL: [334, 150, 'm'], pR: [52, 274, 'p'], pL: [308, 274, 'p'], bs: [212, 334, 'b'] };
    const ciz = () => {
      const tikla = (k, d, lbl) => `<path class="f45-hit" ${btnAt('tk', k, lbl + ' tıka')} d="${d}"/>`;
      kutu.innerHTML = `<svg class="f45-svg" viewBox="0 0 360 430" role="img" aria-label="Willis poligonu alttan görünüm; damara dokunarak tıkayın">
        ${tx(180, 12, 'ön', 'f45-ts', 'middle')}${tx(4, 420, 'hastanın sağı', 'f45-ts')}${tx(356, 420, 'hastanın solu', 'f45-ts', 'end')}
        ${Object.keys(ROZ).map((k) => { const [x, y] = ROZ[k]; return `<circle class="f45-roz" data-r="${k}" cx="${x}" cy="${y}" r="${dar ? 12 : 12}"/>`; }).join('')}
        ${tx(132, 20, 'superior +', 'f45-ts', 'end')}${tx(132, 33, 'medial hemisfer', 'f45-ts', 'end')}
        ${tx(26, 116, 'lateral', 'f45-ts', 'middle')}${tx(26, 130, 'hemisfer', 'f45-ts', 'middle')}${tx(334, 116, 'lateral', 'f45-ts', 'middle')}${tx(334, 130, 'hemisfer', 'f45-ts', 'middle')}
        ${tx(52, 300, 'oksipital +', 'f45-ts', 'middle')}${tx(52, 312, 'medial temporal', 'f45-ts', 'middle')}${tx(308, 300, 'oksipital +', 'f45-ts', 'middle')}${tx(308, 312, 'medial temporal', 'f45-ts', 'middle')}
        ${tx(228, 338, 'beyin sapı', 'f45-ts')}
        <path class="f45-ctx-l" d="M150 388 C130 384 112 384 96 390 M210 388 C230 384 248 384 264 390 M166 368 C172 376 178 384 180 396 L180 428 M194 368 C188 376 182 384 180 396"/>
        ${tx(92, 384, 'PICA', 'f45-ts', 'end')}${tx(268, 384, 'PICA', 'f45-ts')}${tx(186, 428, 'anterior spinal arter', 'f45-ts')}
        ${Object.keys(V).map((k) => `<path class="f45-dmr ${POST.includes(k) ? 'f45-post' : 'f45-ant'}" data-v="${k}" d="${V[k]}"/>`).join('')}
        <circle class="f45-ica f45-ant" data-v="icaR" cx="130" cy="160" r="10"/><circle class="f45-ica f45-ant" data-v="icaL" cx="230" cy="160" r="10"/>
        <g class="f45-akim"></g>
        ${tikla('icaR', 'M130 152 L130 168', 'Sağ ICA')}${tikla('icaL', 'M230 152 L230 168', 'Sol ICA')}${tikla('mL', V.mL, 'Sol MCA')}${tikla('a1L', V.a1L, 'Sol ACA')}${tikla('bas', V.bas, 'Baziler arter')}${tikla('p2L', V.p2L, 'Sol PCA')}
        <path class="f45-x" d=""/>
        <g class="f45-nopt">
          ${tx(112, 186, 'ICA', 'f45-t2', 'middle')}${tx(248, 186, 'ICA', 'f45-t2', 'middle')}
          ${tx(76, 166, 'MCA', 'f45-t2', 'middle')}${tx(284, 166, 'MCA', 'f45-t2', 'middle')}
          ${tx(140, 112, 'ACA', 'f45-t2', 'end')}${tx(220, 112, 'ACA', 'f45-t2')}${tx(180, 114, 'ACom', 'f45-t2', 'middle')}
          ${tx(122, 210, 'PCom', 'f45-t2', 'end')}${tx(238, 210, 'PCom', 'f45-t2')}
          ${tx(100, 262, 'PCA', 'f45-t2', 'middle')}${tx(260, 262, 'PCA', 'f45-t2', 'middle')}
          ${tx(200, 318, 'baziler', 'f45-t2', 'start', ' transform="rotate(-90 200 318)"')}
          ${tx(140, 372, 'vertebral', 'f45-t2', 'end')}${tx(220, 372, 'vertebral', 'f45-t2')}
          <text class="f45-yok" x="180" y="86" text-anchor="middle">yok</text><text class="f45-yok" x="118" y="224" text-anchor="end">yok</text><text class="f45-yok" x="242" y="224">yok</text>
        </g></svg>`;
      svg = kutu.querySelector('svg');
      /* akım noktaları */
      const ak = svg.querySelector('.f45-akim');
      let h = '';
      Object.keys(V).forEach((k) => { for (let i = 0; i < 3; i++) h += `<circle class="f45-ad ${POST.includes(k) ? 'f45-post' : 'f45-ant'}" data-v="${k}" data-i="${i}" r="2.6"/>`; });
      ak.innerHTML = h + (RM ? Object.keys(V).map((k) => `<path class="f45-sok" data-v="${k}" d=""/>`).join('') : '');
      uygula();
    };
    const uygula = () => {
      if (!svg) return;
      const { f, a } = model();
      g.classList.toggle('f45-eksik', !tam);
      svg.querySelectorAll('.f45-dmr,.f45-ica').forEach((p) => { const v = p.dataset.v; p.classList.toggle('dur', f[v] === 0 && !['ac', 'pcR', 'pcL'].includes(v)); p.classList.toggle('kol', f[v] !== 0 && ['ac', 'pcR', 'pcL'].includes(v)); p.classList.toggle('ters', f[v] === -1); p.classList.toggle('tik', v === tik); });
      Object.keys(ROZ).forEach((k) => { const c = svg.querySelector(`[data-r=${k}]`); c.classList.remove('ok', 'warn', 'crit'); c.classList.add(a[k]); });
      const x = svg.querySelector('.f45-x');
      if (tik) {
        const p = tik.startsWith('ica') ? { x: tik === 'icaL' ? 230 : 130, y: 160 } : nokta(svg.querySelector(`.f45-dmr[data-v=${tik}]`), 0.5);
        x.setAttribute('d', `M${p.x - 7} ${p.y - 7} L${p.x + 7} ${p.y + 7} M${p.x + 7} ${p.y - 7} L${p.x - 7} ${p.y + 7}`);
      } else x.setAttribute('d', '');
      svg.querySelectorAll('.f45-hit').forEach((p) => p.setAttribute('aria-pressed', String(p.dataset.tk === tik)));
      if (RM) svg.querySelectorAll('.f45-sok').forEach((s) => {
        const v = s.dataset.v, d = f[v]; if (!d) { s.setAttribute('d', ''); return; }
        const p = svg.querySelector(`.f45-dmr[data-v=${v}]`), L = p.getTotalLength(), m = p.getPointAtLength(L * 0.5), q = p.getPointAtLength(L * (0.5 + 0.08 * d));
        const ang = Math.atan2(q.y - m.y, q.x - m.x), c = Math.cos(ang), sn = Math.sin(ang);
        s.setAttribute('d', `M${m.x + c * 5} ${m.y + sn * 5} L${m.x - c * 4 - sn * 4} ${m.y - sn * 4 + c * 4} L${m.x - c * 4 + sn * 4} ${m.y - sn * 4 - c * 4} Z`);
      });
      akKare();
    };
    const akKare = () => {
      if (!svg || RM) { if (svg) svg.querySelectorAll('.f45-ad').forEach((c) => (c.style.display = 'none')); return; }
      const { f } = model();
      svg.querySelectorAll('.f45-ad').forEach((c) => {
        const v = c.dataset.v, d = f[v];
        if (!d) { c.style.display = 'none'; return; }
        c.style.display = '';
        let u = ((faz + +c.dataset.i / 3) % 1); if (d < 0) u = 1 - u;
        const q = nokta(svg.querySelector(`.f45-dmr[data-v=${v}]`), u); c.setAttribute('cx', q.x); c.setAttribute('cy', q.y);
        c.classList.toggle('kolad', ['ac', 'pcR', 'pcL'].includes(v) || d < 0);
      });
    };
    const capH = () => {
      if (!tik) return tam ? '<b>Tam poligon.</b> ICA\'lar anterior, vertebral–baziler sistem posterior dolaşımı besler; ACom iki ACA\'yı, PCom\'lar iki dolaşımı birleştirir. Bir damara dokunarak tıkayın. [[K1 s. 194–195]]'
        : '<b>Eksik poligon.</b> Poligon sıklıkla anatomik olarak eksiktir; bu durumda bağlantılar kollateral akım taşıyamaz. Bir damarı tıkayın. [[K1 s. 196]]';
      const ad = ADI[tik];
      if (tik === 'mL') return `<b>${ad} tıkalı.</b> Tıkanma poligonun ötesinde olduğu için halka kollateral sağlayamaz. En sık tutulan damar MCA'dır (Bamford: ACI). [[K1 s. 195]]`;
      if (tik === 'p2L') return `<b>${ad} tıkalı.</b> Tıkanma poligonun ötesinde olduğu için halka kollateral sağlayamaz. [[K1 s. 195]]`;
      const ek = tik === 'bas' ? ' Baziler arterin dalları beyin sapını besler. [[K1 s. 194]]' : '';
      const yol = tik === 'bas' ? 'PCom\'lar' : tik === 'a1L' ? 'ACom' : 'ACom ve PCom';
      if (tam) return `<b>${ad} tıkalı, poligon tam.</b> Kan ${yol} üzerinden ters yönde akar ve alanı kollateral olarak besler; poligonun kuramsal görevi budur. [[K1 s. 196]]${ek}`;
      return `<b>${ad} tıkalı, poligon eksik.</b> Kollateral akım gelmez ve alan enfarkt riskindedir; inmenin Birleşik Krallık'ta üçüncü ölüm nedeni olması kısmen bundandır. [[K1 s. 196]]${ek}`;
    };
    secimDinle(el, 'pl', (v) => { tam = v === 'tam'; basSec(el, 'pl', v); uygula(); capYaz(el, capH()); });
    secimDinle(el, 'tk', (v) => { tik = tik === v ? '' : v; uygula(); capYaz(el, capH()); });
    el.querySelector('[data-a=bas]').addEventListener('click', () => { tik = ''; tam = true; basSec(el, 'pl', 'tam'); uygula(); capYaz(el, capH()); });
    const ro = darIzle(el, (d) => { dar = d; g.classList.toggle('f45-dar', d); ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { faz = (faz + dt * 0.55) % 1; akKare(); });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     9 · f45_ven — dural sinüsler ve hava embolisi (K1 s. 194–195)
     ===================================================================== */
  VIZ.f45_ven = (el) => {
    const CAP = {
      akim: '<b>Venöz akım.</b> Yüzeyel ve derin venlerden gelen kan dural sinüslerden internal juguler venlere akar. Akımı izleyin ya da duvarı açın. [[K1 s. 195]]',
      duvar: '<b>Duvar açıldığında.</b> Sinüsler duradan yapıldıkları için kapaksızdır ve kollabe olmaz; açık kalan lümen nöroşirurjide hava embolisi riskinin yüksekliğini kısmen açıklar. [[K1 s. 195]]',
      galen: '<b>Galen veni.</b> Derin venlerin birleşimidir; kitaba göre inferior sagittal sinüse açılır (sayfadaki Atlas notuna bakın). [[K1 s. 195]]',
    };
    let mod = 'akim', dar = false, faz = 0, k = 0;
    el.innerHTML = `<div class="f45-kont"><div><span class="f45-lbl">Görünüm</span>${segHtml('Görünüm', 'g', [['akim', 'Akım'], ['duvar', 'Duvar açıldığında']], mod)}</div></div>
      <div class="f45-g2 f45-ven-g"><div class="f45-svgk f45-ven-k"></div><div class="f45-svgk f45-ven-p"></div></div>
      <div class="legend"><span><i style="background:var(--c-basic)"></i>yüzeyel sistem: dural sinüsler</span><span><i style="background:var(--c-clin)"></i>derin sistem: klasik venler → Galen veni</span><span><i style="background:var(--warn)"></i>hava</span></div>`;
    const kutu = el.querySelector('.f45-ven-k'), pan = el.querySelector('.f45-ven-p'), g = el.querySelector('.f45-ven-g');
    const S = {
      sss: 'M96 118 C110 50 220 22 300 40 C352 52 384 90 384 150',
      iss: 'M176 128 C204 106 252 102 282 116',
      duz: 'M282 116 C320 124 356 136 384 152',
      gal: 'M262 150 C272 136 280 124 284 117',
      tr: 'M384 152 C380 170 360 180 336 186',
      sig: 'M336 186 C312 192 320 214 306 226 C298 234 300 244 300 252',
      ijv: 'M300 252 L300 300',
      kav: '',
    };
    const AK = [
      'M96 118 C110 50 220 22 300 40 C352 52 384 90 384 150 C380 170 360 180 336 186 C312 192 320 214 306 226 C298 234 300 244 300 300',
      'M176 128 C204 106 252 102 282 116 C320 124 356 136 384 152 C380 170 360 180 336 186 C312 192 320 214 306 226 C298 234 300 244 300 300',
      'M232 172 C246 166 256 158 262 150 C272 136 280 124 284 117 C320 124 356 136 384 152',
    ];
    const ciz = () => {
      kutu.innerHTML = `<svg class="f45-svg" viewBox="${dar ? '52 0 368 306' : '0 0 420 306'}" role="img" aria-label="Kafanın yan görünümünde dural sinüsler, Galen veni ve internal juguler ven">
        <path class="f45-beyin" d="M70 150 C56 80 140 26 250 28 C350 30 404 86 400 160 C398 196 372 210 340 206 C300 202 270 214 240 216 C200 218 176 206 150 200 C110 196 78 184 70 150 Z"/>
        <path class="f45-kk2" d="M168 140 C200 118 256 116 288 132"/>
        ${[['M140 110 C130 96 120 94 112 92'], ['M200 70 C204 58 210 46 214 34'], ['M290 76 C296 62 300 52 302 42'], ['M160 84 C160 70 160 60 158 50']].map(([d]) => `<path class="f45-yv" d="${d}"/>`).join('')}
        <path class="f45-dv" d="M200 176 C214 170 226 168 236 172 M216 190 C232 184 244 174 252 162 M250 186 C254 176 258 164 262 150"/>
        ${['sss', 'iss', 'duz', 'tr', 'sig', 'ijv'].map((s) => `<path class="f45-sn" d="${S[s]}"/>`).join('')}
        <path class="f45-gal" ${btnAt('gv', 'galen', 'Galen veni')} d="${S.gal}"/>
        <ellipse class="f45-kav" cx="186" cy="200" rx="16" ry="8"/>
        <g class="f45-akd">${AK.map((d, i) => `<path class="f45-akp" data-i="${i}" d="${d}"/>`).join('')}${AK.map((_, i) => [0, 1, 2, 3, 4, 5].map((j) => `<circle class="f45-vd${i === 2 ? ' der' : ''}" data-i="${i}" data-j="${j}" r="2.8"/>`).join('')).join('')}</g>
        <g class="f45-kab">${[0, 1, 2, 3, 4].map((j) => `<circle class="f45-bub" data-j="${j}" r="3.6"/>`).join('')}</g>
        <path class="f45-kesik" d="M206 22 L214 34 M216 20 L210 34"/>
        <g class="f45-nopt">
          ${tx(212, 14, 'superior sagittal sinüs', 'f45-ts f45-c-basic', 'middle')}
          ${tx(226, 98, 'inferior sagittal sinüs', 'f45-ts f45-c-basic f45-halo', 'middle')}
          ${tx(330, 114, 'düz sinüs (Atlas notu)', 'f45-ts f45-halo', 'middle')}
          ${tx(300, 168, 'Galen veni', 'f45-ts f45-c-clin f45-halo', 'middle')}${tx(196, 192, 'derin venler', 'f45-ts f45-c-clin f45-halo', 'end')}
          ${tx(410, 188, 'transvers', 'f45-ts f45-c-basic', 'end')}${tx(346, 224, 'sigmoid sinüs', 'f45-ts f45-c-basic')}
          ${tx(308, 286, 'internal juguler ven (çift)', 'f45-ts f45-c-basic')}
          ${tx(186, 224, 'kavernöz sinüs', 'f45-ts f45-c-basic', 'middle')}
          ${tx(104, 70, 'yüzey venleri', 'f45-ts', 'middle')}
        </g></svg>`;
      const pnl = dar
        ? { vb: '0 0 360 150', v: [90, 74], s: [270, 74] }
        : { vb: '0 0 220 306', v: [110, 80], s: [110, 222] };
      const [vx, vy] = pnl.v, [sx, sy] = pnl.s;
      pan.innerHTML = `<svg class="f45-svg" viewBox="${pnl.vb}" role="img" aria-label="Vücuttaki ven ile dural sinüsün kesiti: ven kollabe olur, sinüs açık kalır">
        <g class="f45-vpan" transform="translate(${vx} ${vy})">
          ${tx(0, -46, 'vücuttaki ven', 'f45-t', 'middle')}
          <ellipse class="f45-vduv" cx="0" cy="0" rx="30" ry="28"/><ellipse class="f45-vlum" cx="0" cy="0" rx="25" ry="23"/>
          <path class="f45-kapak" d="M-24 4 C-10 0 -4 8 0 16 M24 4 C10 0 4 8 0 16"/>
          ${tx(0, 46, 'kapaklı, ince duvar', 'f45-ts', 'middle')}<text class="f45-vson" x="0" y="62" text-anchor="middle">kollabe olur, hava girmez</text></g>
        <g class="f45-span" transform="translate(${sx} ${sy})">
          ${tx(0, -52, 'dural sinüs', 'f45-t', 'middle')}
          <rect class="f45-dura1" x="-60" y="-38" width="120" height="12"/><path class="f45-dura2" d="M-60 -26 L60 -26 L60 -14 L22 -14 L0 24 L-22 -14 L-60 -14 Z"/>
          <path class="f45-slum" d="M-20 -26 L20 -26 L0 12 Z"/>
          <g class="f45-sbub">${[0, 1, 2, 3].map((j) => `<circle class="f45-bub" data-j="${j}" r="3.2"/>`).join('')}</g>
          ${tx(0, 40, 'iki dura katı arası, kapaksız', 'f45-ts', 'middle')}<text class="f45-sson" x="0" y="56" text-anchor="middle">açık kalır → hava girebilir</text></g>
      </svg>`;
      kare();
    };
    const kare = () => {
      const svg = kutu.querySelector('svg'), ps = pan.querySelector('svg'); if (!svg || !ps) return;
      const duv = mod === 'duvar', kk = duv ? (RM ? 1 : ease(clamp(k / 2, 0, 1))) : 0;
      svg.querySelectorAll('.f45-vd').forEach((c) => {
        if (RM) { c.style.display = 'none'; return; }
        const p = svg.querySelector(`.f45-akp[data-i="${c.dataset.i}"]`);
        const q = nokta(p, (faz + c.dataset.j / 6) % 1); c.setAttribute('cx', q.x); c.setAttribute('cy', q.y);
      });
      svg.querySelector('.f45-akd').classList.toggle('rm', RM);
      svg.querySelector('.f45-kesik').style.opacity = duv ? 1 : 0;
      const p0 = svg.querySelector('.f45-akp[data-i="0"]'), L = p0.getTotalLength();
      const s0 = 0.30; // kesik yeri (sss üstünde)
      svg.querySelectorAll('.f45-kab .f45-bub').forEach((c) => {
        if (!duv) { c.style.display = 'none'; return; }
        c.style.display = '';
        const u = RM ? s0 + (c.dataset.j / 5) * 0.6 : s0 + (((faz * 0.8 + c.dataset.j / 5) % 1)) * (1 - s0) * kk;
        const q = p0.getPointAtLength(L * Math.min(1, u)); c.setAttribute('cx', q.x); c.setAttribute('cy', q.y);
      });
      /* panel: ven kollabe, sinüs açık */
      const vd = ps.querySelector('.f45-vduv'), vl = ps.querySelector('.f45-vlum');
      vd.setAttribute('ry', 28 - 22 * kk); vl.setAttribute('ry', Math.max(0.5, 23 - 23 * kk));
      ps.querySelector('.f45-kapak').style.opacity = 1 - kk;
      ps.querySelector('.f45-vson').style.opacity = kk > 0.5 ? 1 : 0;
      ps.querySelector('.f45-sson').style.opacity = kk > 0.5 ? 1 : 0;
      ps.querySelector('.f45-span').classList.toggle('acik', duv);
      ps.querySelector('.f45-vpan').classList.toggle('acik', duv);
      ps.querySelectorAll('.f45-sbub .f45-bub').forEach((c) => {
        if (!duv) { c.style.display = 'none'; return; }
        c.style.display = '';
        const u = RM ? (c.dataset.j / 4) : ((faz * 1.2 + c.dataset.j / 4) % 1) * kk;
        c.setAttribute('cx', (-8 + c.dataset.j * 5) * (1 - u)); c.setAttribute('cy', -40 + u * 44);
      });
    };
    secimDinle(el, 'g', (v) => { mod = v; k = 0; basSec(el, 'g', v); capYaz(el, CAP[v]); kare(); });
    secimDinle(el, 'gv', () => capYaz(el, CAP.galen));
    const ro = darIzle(el, (d) => { dar = d; g.classList.toggle('f45-dar', d); ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { faz = (faz + dt * 0.18) % 1; if (mod === 'duvar') k += dt; kare(); });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     10 · f45_bamford — Bamford sınıflaması (K1 s. 195–196)
     ===================================================================== */
  VIZ.f45_bamford = (el) => {
    const T = {
      aci: ['ACI', [['güç', 'kontralateral güçsüzlük (motor korteks)'], ['göz', 'homonim hemianopi (optik trakt)'], ['dil', 'üst düzey işlev bozukluğu: disfazi (dominant parietal) ya da görsel-mekânsal bozukluk (nondominant parietal)']], 'anterior dolaşım, en sık MCA',
        '<b>Anterior dolaşım enfarktı (ACI).</b> Trombüs ya da emboli anterior dolaşımı tıkar ve geniş kortikal enfarkt olur; en sık tutulan damar MCA\'dır. [[K1 s. 195]]'],
      poci: ['POCI', [['den', 'serebellar: ataksi, nistagmus'], ['sap', 'beyin sapı: kraniyal sinir felçleri ya da bilinç kaybı'], ['göz', 'oksipital: homonim hemianopi']], 'vertebrobaziler dolaşım',
        '<b>Posterior dolaşım enfarktı (POCI).</b> Vertebrobaziler dolaşımdaki trombüs ya da emboli akım yönündeki beyin alanlarında enfarkt yapar. [[K1 s. 195–196]]'],
      laci: ['Laküner', [['güç', 'ör. motor hemiparezi: küçük enfarkta göre orantısız'], ['yok', 'üst düzey işlev bozukluğu yok'], ['iyi', 'prognoz ACI ve POCI\'den çok iyi']], 'küçük subkortikal damar',
        '<b>Laküner enfarkt (LACI).</b> Küçük subkortikal damar tıkanır; motor ya da duyusal aksonların geçtiği lateral talamus ya da internal kapsül arka bacağı tutulduğu için bulgu enfarktın boyutuyla orantısızdır. [[K1 s. 196]]'],
    };
    let tip = 'aci', alt = 'tot';
    el.innerHTML = `<div class="f45-kont"><div><span class="f45-lbl">İnme tipi</span>${segHtml('İnme tipi', 'ti', [['aci', 'ACI'], ['poci', 'POCI'], ['laci', 'Laküner']], tip)}</div>
      <div class="f45-alt"><span class="f45-lbl">ACI alt sınıfı</span>${segHtml('ACI alt sınıfı', 'al', [['tot', 'Total'], ['par', 'Parsiyel']], alt)}</div></div>
      <div class="f45-g2 f45-bam-g"><div class="f45-svgk"><svg class="f45-svg" viewBox="0 0 360 196" role="img" aria-label="Lateral görünüm ve koronal kesitte enfarkt alanı">
        <defs><clipPath id="f45-bam-clip"><path d="M14 92 C8 46 54 18 104 18 C150 18 178 46 176 92 C175 116 160 124 140 122 C120 122 110 128 96 136 C76 144 52 138 44 124 C30 118 16 110 14 92 Z"/></clipPath></defs>
        ${tx(95, 12, 'lateral görünüm', 'f45-ts', 'middle')}${tx(275, 12, 'koronal kesit', 'f45-ts', 'middle')}
        <path class="f45-ctx f45-poc-x" d="M128 128 C140 120 166 122 170 134 C172 148 150 156 134 150 C124 146 122 136 128 128 Z"/>
        <path class="f45-ctx f45-poc-x" d="M110 128 L122 128 L120 172 L112 172 Z"/>
        <path class="f45-bbeyin" d="M14 92 C8 46 54 18 104 18 C150 18 178 46 176 92 C175 116 160 124 140 122 C120 122 110 128 96 136 C76 144 52 138 44 124 C30 118 16 110 14 92 Z"/>
        <path class="f45-lsin" d="M104 20 L90 84 M50 96 L90 84 L134 84 M150 36 L150 112"/>
        <g clip-path="url(#f45-bam-clip)"><path class="f45-enf" data-e="aci-tot" d="M52 50 C80 34 128 36 146 60 C150 86 140 110 120 120 C96 130 70 128 56 112 C44 96 42 66 52 50 Z"/>
          <path class="f45-enf" data-e="aci-par" d="M70 70 C88 60 112 62 122 78 C124 96 112 108 96 108 C80 108 66 96 70 70 Z"/>
          <path class="f45-enf" data-e="poci-ok" d="M150 30 C176 40 182 80 176 120 L150 120 Z"/></g>
        <path class="f45-enf" data-e="poci-cb" d="M128 128 C140 120 166 122 170 134 C172 148 150 156 134 150 C124 146 122 136 128 128 Z"/>
        <path class="f45-enf" data-e="poci-bs" d="M110 128 L122 128 L120 172 L112 172 Z"/>
        ${tx(150, 186, 'serebellum + beyin sapı', 'f45-ts f45-poc-t', 'middle')}
        <g transform="translate(275 100)">
          <path class="f45-bbeyin" d="M-4 -78 C-40 -82 -78 -60 -80 -14 C-82 30 -60 62 -24 64 L-4 54 Z M4 -78 C40 -82 78 -60 80 -14 C82 30 60 62 24 64 L4 54 Z"/>
          <path class="f45-kortex" d="M-4 -70 C-36 -74 -70 -54 -72 -14 C-74 26 -54 54 -24 56 M4 -70 C36 -74 70 -54 72 -14 C74 26 54 54 24 56"/>
          <ellipse class="f45-talamus" cx="-14" cy="6" rx="12" ry="16"/><ellipse class="f45-talamus" cx="14" cy="6" rx="12" ry="16"/>
          <path class="f45-ik" d="M-30 -22 L-36 30 M30 -22 L36 30"/>
          <path class="f45-enf" data-e="aci-tot" d="M-78 -24 C-74 -60 -40 -78 -6 -76 L-30 0 L-38 32 C-58 44 -78 26 -78 -24 Z"/>
          <path class="f45-enf" data-e="aci-par" d="M-80 -12 C-78 -40 -62 -56 -44 -62 L-46 -6 C-56 4 -74 6 -80 -12 Z"/>
          <circle class="f45-enf f45-lak" data-e="laci" cx="-31" cy="14" r="4"/>
          ${tx(0, 82, 'talamus · internal kapsül', 'f45-ts', 'middle')}
        </g></svg></div>
        <div class="f45-bkart"></div></div>`;
    const kart = el.querySelector('.f45-bkart'), altK = el.querySelector('.f45-alt');
    const IC = { 'güç': '↯', 'göz': '◐', 'dil': '“”', den: '≈', sap: '⊙', yok: '–', iyi: '✓' };
    const uygula = () => {
      const kod = tip === 'aci' ? 'aci-' + alt : tip;
      el.querySelectorAll('.f45-enf').forEach((p) => p.classList.toggle('on', tip === 'poci' ? p.dataset.e.startsWith('poci') : p.dataset.e === kod));
      el.querySelectorAll('.f45-poc-x').forEach((p) => p.classList.toggle('gizli', tip !== 'poci'));
      el.querySelector('.f45-poc-t').style.opacity = tip === 'poci' ? 1 : 0;
      altK.style.visibility = tip === 'aci' ? 'visible' : 'hidden';
      const t = T[tip];
      kart.innerHTML = `${t[1].map(([s, m]) => `<div class="f45-bk"><span aria-hidden="true">${IC[s]}</span><p>${m}</p></div>`).join('')}
        <p class="f45-bdamar"><b>Tıkanan damar:</b> ${t[2]}</p>${tip === 'aci' ? `<p class="f45-not">${alt === 'tot' ? 'total' : 'parsiyel'} alt sınıfı; ölçütü kitapta verilmez, alan şematik büyüklüktür.</p>` : ''}`;
      basSec(el, 'ti', tip); basSec(el, 'al', alt);
    };
    secimDinle(el, 'ti', (v) => { tip = v; uygula(); capYaz(el, T[v][3]); });
    secimDinle(el, 'al', (v) => { alt = v; uygula(); });
    const ro = darIzle(el, (d) => el.querySelector('.f45-bam-g').classList.toggle('f45-dar', d));
    uygula();
    return () => ro();
  };

  /* =====================================================================
     11 · f45_eeg — EEG bantları ve klinik örüntüler (K1 s. 196)
     ===================================================================== */
  const gur = (t, s) => 0.5 * Math.sin(2 * Math.PI * (37.3 * t + s)) + 0.3 * Math.sin(2 * Math.PI * (53.1 * t + 2 * s)) + 0.2 * Math.sin(2 * Math.PI * (71.7 * t + 3 * s));
  VIZ.f45_eeg = (el) => {
    const BANT = {
      d: ['δ', 'δ dalgası', '0–4 Hz', 2, '<b>δ dalgası (0–4 Hz).</b> Yavaş, büyük genlikli; genel anestezide EEG bu örüntüye kayar. [[K1 s. 196]]'],
      t: ['θ', 'θ dalgası', '4–8 Hz', 6, '<b>θ dalgası (4–8 Hz).</b> Bant sınırları frekansa göredir. [[K1 s. 196]]'],
      a: ['α', 'α dalgası', '8–13 Hz', 10.5, '<b>α dalgası (8–13 Hz).</b> Bant sınırları frekansa göredir. [[K1 s. 196]]'],
      b: ['β', 'β dalgası', '&gt; 13 Hz', 20, '<b>β dalgası (&gt; 13 Hz).</b> Uyanıklığın hızlı, küçük genlikli izi. [[K1 s. 196]]'],
    };
    const KL = {
      nob: ['Nöbet', 'düzenli, eşzamanlı', '<b>Nöbet.</b> Nöronlarda düzenli, eşzamanlı etkinlik EEG\'de tanınır. Yoğun bakımda sedasyona ara verilince uyanmayan hastada konvülsif olmayan status epileptikus önemli ayırıcı tanıdır. [[K1 s. 196]]'],
      ens: ['Ensefalopati', 'yavaş dalga artar', '<b>Ensefalopati.</b> Yavaş dalga etkinliğinde giderek artış ile tanınır. [[K1 s. 196]]'],
      bs: ['Burst supresyon', 'patlama / baskılanma', '<b>Burst supresyon.</b> Anestezi derinliğinin ölçüsü olarak yoğun bakımda kullanılır; ör. barbitürat koması. [[K1 s. 196]]'],
      izo: ['İzoelektrik', 'elektriksel etkinlik yok', '<b>İzoelektrik EEG.</b> Beyin ölümünde elektriksel etkinlik yoktur. EEG Birleşik Krallık yasasında beyin ölümü tanısı için gerekmez, başka ülkelerde doğrulamak için kullanılır. [[K1 s. 196]]'],
    };
    let sec = 'b', dar = false, T0 = 6;
    el.innerHTML = `<div class="f45-kont f45-eeg-kont"><div><span class="f45-lbl">Bant</span>${segHtml('Bant', 'e', Object.keys(BANT).map((k) => [k, BANT[k][0]]), sec, 'f45-seg-buyuk')}</div>
      <div><span class="f45-lbl">Klinik</span>${segHtml('Klinik örüntü', 'e', Object.keys(KL).map((k) => [k, KL[k][0]]), sec)}</div></div>
      <div class="f45-svgk f45-eeg-k"></div><div class="f45-eeg-alt"><div class="f45-svgk f45-band-k"></div><div class="f45-kafa-k"></div></div>`;
    const kutu = el.querySelector('.f45-eeg-k'), bandK = el.querySelector('.f45-band-k'), kafa = el.querySelector('.f45-kafa-k');
    let W, H, Wn, svg, iz;
    /* sinyal: −1..1 */
    const sig = (t) => {
      const s = sec;
      if (s === 'd') return 0.8 * Math.sin(2 * Math.PI * 2 * t) + 0.12 * Math.sin(2 * Math.PI * 1.1 * t) + 0.05 * gur(t, 0);
      if (s === 't') return 0.55 * Math.sin(2 * Math.PI * 6 * t) + 0.08 * Math.sin(2 * Math.PI * 2.3 * t) + 0.05 * gur(t, 0.2);
      if (s === 'a') return 0.4 * (0.65 + 0.35 * Math.sin(2 * Math.PI * 0.5 * t)) * Math.sin(2 * Math.PI * 10.5 * t) + 0.04 * gur(t, 0.4);
      if (s === 'b') return 0.15 * (0.55 * Math.sin(2 * Math.PI * 20 * t) + 0.45 * Math.sin(2 * Math.PI * 25.3 * t + 1)) + 0.06 * gur(t, 0.6);
      if (s === 'nob') { const ph = (t * 3) % 1; const sp = Math.exp(-Math.pow((ph - 0.12) / 0.035, 2)); const sl = -Math.sin(2 * Math.PI * (ph - 0.25)) * 0.5; return 0.9 * (sp * 1.0 - 0.35 + sl * 0.55) + 0.02 * gur(t, 0.1); }
      if (s === 'ens') {
        if (RM) { const tt = t - (T0 - W); const ph = 8 * tt - 0.75 * tt * tt; const a = 0.3 + 0.12 * tt; return a * Math.sin(2 * Math.PI * ph) + 0.03 * gur(t, 0.3); }
        const u = ((t % 12) + 12) % 12, n = Math.floor(t / 12); const ph = 60 * n + 8 * u - 0.25 * u * u; const a = 0.3 + 0.5 * u / 12; return a * Math.sin(2 * Math.PI * ph) + 0.03 * gur(t, 0.3);
      }
      if (s === 'bs') { const c = ((t % 3.6) + 3.6) % 3.6; if (c < 1) { const e = Math.sin(Math.PI * c); return e * (0.5 * Math.sin(2 * Math.PI * 3 * t) + 0.3 * Math.sin(2 * Math.PI * 7.3 * t) + 0.18 * Math.sin(2 * Math.PI * 13.7 * t)) * 1.3; } return 0.03 * gur(t, 0.5); }
      return 0.01 * gur(t, 0.7);
    };
    const ciz = () => {
      W = dar ? 3 : 4; Wn = dar ? 360 : 640; H = dar ? 150 : 170;
      let grid = ''; for (let s = 0; s <= W; s++) grid += `<line class="f45-grid" x1="${(s / W) * Wn}" x2="${(s / W) * Wn}" y1="0" y2="${H}"/>`;
      const p1 = Wn / W;
      kutu.innerHTML = `<svg class="f45-svg f45-scr" viewBox="0 0 ${Wn} ${H}" role="img" aria-label="Kayan sentetik EEG izi">
        <rect class="f45-scr-z" x="0" y="0" width="${Wn}" height="${H}" rx="8"/>${grid}<line class="f45-grid" x1="0" x2="${Wn}" y1="${H / 2}" y2="${H / 2}"/>
        <path class="f45-olc" d="M10 16 L${10 + p1} 16"/>${tx(10 + p1 / 2, 32, '1 s', 'f45-ts f45-scr-t', 'middle')}
        <text class="f45-t f45-scr-a" x="${Wn - 10}" y="22" text-anchor="end"></text><text class="f45-ts f45-scr-t f45-scr-f" x="${Wn - 10}" y="38" text-anchor="end"></text>
        <text class="f45-ts f45-ens-t" x="${Wn / 2}" y="${H - 12}" text-anchor="middle">yavaş dalga etkinliği giderek artar →</text>
        <path class="f45-iz2" d=""/></svg>`;
      svg = kutu.querySelector('svg'); iz = svg.querySelector('.f45-iz2');
      const bw = dar ? 360 : 640, x = (f) => 12 + (f / 30) * (bw - 40);
      bandK.innerHTML = `<svg class="f45-svg" viewBox="0 0 ${bw} 62" role="img" aria-label="Frekans şeridi: δ 0–4, θ 4–8, α 8–13, β 13 Hz üstü">
        <defs>${okDef('f45-ok-f', 'f45-okm')}</defs>
        <g class="f45-bantlar">
          <rect class="f45-bd" x="${x(0)}" y="18" width="${x(4) - x(0)}" height="22"/><rect class="f45-bt" x="${x(4)}" y="18" width="${x(8) - x(4)}" height="22"/>
          <rect class="f45-ba" x="${x(8)}" y="18" width="${x(13) - x(8)}" height="22"/><rect class="f45-bb" x="${x(13)}" y="18" width="${x(30) - x(13)}" height="22"/>
          <path class="f45-om-ok" d="M${x(30) - 2} 29 L${bw - 6} 29" marker-end="url(#f45-ok-f)"/>
          ${tx((x(0) + x(4)) / 2, 34, 'δ', 'f45-t', 'middle')}${tx((x(4) + x(8)) / 2, 34, 'θ', 'f45-t', 'middle')}${tx((x(8) + x(13)) / 2, 34, 'α', 'f45-t', 'middle')}${tx((x(13) + x(30)) / 2, 34, 'β', 'f45-t', 'middle')}
          ${[0, 4, 8, 13, 30].map((f) => tx(x(f), 56, f, 'f45-ts', 'middle')).join('')}${tx(bw - 4, 56, 'Hz', 'f45-ts', 'end')}
        </g>
        <path class="f45-imlec" d="M-6 0 L6 0 L0 12 Z"/><text class="f45-ts f45-imlec-t" x="${bw / 2}" y="12" text-anchor="middle"></text></svg>`;
      bandK.dataset.bw = bw;
      kafa.innerHTML = kafaSvg();
      etiket();
      kare(0);
    };
    const kafaSvg = () => {
      const E = [[-12, -40], [12, -40], [-34, -24], [-17, -21], [0, -20], [17, -21], [34, -24], [-42, 0], [-21, 0], [0, 0], [21, 0], [42, 0], [-34, 24], [-17, 21], [0, 20], [17, 21], [34, 24], [-12, 40], [12, 40]];
      return `<svg class="f45-svg" viewBox="-60 -56 120 128" role="img" aria-label="19 saçlı deri elektrodu">
        <circle class="f45-kafa" r="48"/><path class="f45-kafa" d="M-7 -47 L0 -56 L7 -47"/>${E.map(([x, y]) => `<circle class="f45-elk" cx="${x}" cy="${y}" r="4"/>`).join('')}
        ${tx(0, 66, '19 saçlı deri elektrodu', 'f45-ts', 'middle')}</svg>`;
    };
    const fx = (f) => { const bw = +bandK.dataset.bw || 640; return 12 + (f / 30) * (bw - 40); };
    const etiket = () => {
      if (!svg) return;
      const b = BANT[sec], kl = KL[sec];
      svg.querySelector('.f45-scr-a').textContent = b ? b[1] : kl[0];
      svg.querySelector('.f45-scr-f').innerHTML = b ? b[2] : kl[1];
      svg.querySelector('.f45-ens-t').style.display = sec === 'ens' ? '' : 'none';
      bandK.querySelector('.f45-bantlar').classList.toggle('sol', !b);
      const im = bandK.querySelector('.f45-imlec'), it = bandK.querySelector('.f45-imlec-t');
      if (b) { im.style.display = ''; im.setAttribute('transform', `translate(${fx(b[3])} 4)`); it.textContent = ''; }
      else if (sec === 'ens') { im.style.display = ''; it.textContent = ''; }
      else { im.style.display = 'none'; it.textContent = kl[1]; }
    };
    const kare = () => {
      if (!iz) return;
      const N = dar ? 360 : 640, A = H * 0.46, mid = H / 2;
      let d = '';
      for (let i = 0; i <= N; i += 1) { const t = T0 - W + (i / N) * W; const y = mid - A * clamp(sig(t), -1.05, 1.05); d += (i ? 'L' : 'M') + ((i / N) * Wn).toFixed(1) + ' ' + y.toFixed(1); }
      iz.setAttribute('d', d);
      if (sec === 'ens' && !RM) { const u = ((T0 % 12) + 12) % 12; const f = 8 - 0.5 * u; bandK.querySelector('.f45-imlec').setAttribute('transform', `translate(${fx(f)} 4)`); }
      else if (sec === 'ens') bandK.querySelector('.f45-imlec').setAttribute('transform', `translate(${fx(4)} 4)`);
    };
    secimDinle(el, 'e', (v) => { sec = v; basSec(el, 'e', v); etiket(); kare(); capYaz(el, (BANT[v] || KL[v])[BANT[v] ? 4 : 2]); });
    const ro = darIzle(el, (d) => { dar = d; el.classList.toggle('f45-dar', d); ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { T0 += dt; kare(); });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     12 · f45_ssep — periferik uyarı, kortikal yanıt (K1 s. 196)
     ===================================================================== */
  VIZ.f45_ssep = (el) => {
    let z = 0, t = RM ? 9 : 9, dar = false;
    el.innerHTML = `<div class="f45-kont"><div class="btn-row"><button type="button" class="btn" data-a="uy">Uyar</button></div>
      <label class="f45-kay"><span class="f45-lbl">Omurilik zorlanması: <b data-o="z">%0</b></span><input type="range" min="0" max="100" step="1" value="0" aria-label="Omurilik zorlanması"></label></div>
      <div class="f45-g2 f45-ssep-g"><div class="f45-svgk f45-ssep-f"></div><div class="f45-svgk f45-ssep-o"></div></div>
      <div class="f45-gost"><dl class="kv"><dt>Genlik</dt><dd data-o="g">%100</dd><dt>Latans</dt><dd data-o="l">bazal</dd></dl><span class="tag crit f45-uyari">nörolojik hasar düşündürür</span></div>`;
    const fig = el.querySelector('.f45-ssep-f'), osc = el.querySelector('.f45-ssep-o'), g = el.querySelector('.f45-ssep-g');
    fig.innerHTML = `<svg class="f45-svg" viewBox="0 0 360 200" role="img" aria-label="Yüzükoyun hasta: ayak bileğinde uyarı, omurilik boyunca duyusal yol, kafada saçlı deri elektrotları">
      <path class="f45-govde2" d="M30 98 C30 76 58 70 74 82 L96 86 C120 74 200 74 236 84 L330 90 C344 92 346 108 332 110 L236 114 C200 124 120 124 96 112 L74 116 C58 128 30 120 30 98 Z"/>
      <path class="f45-om" d="M96 92 L236 92"/>
      <rect class="f45-cerr" x="148" y="70" width="58" height="44" rx="6"/>${tx(177, 62, 'cerrahi alan', 'f45-ts f45-cerr-t', 'middle')}
      <path class="f45-ssyol" d="M326 102 L236 104 L236 92 L96 92 L72 94 L52 84"/>
      <path class="f45-ssyol on" d=""/>
      <g class="f45-elek"><circle cx="322" cy="104" r="6"/><path d="M322 110 L322 132"/></g>${tx(322, 146, 'periferik sinir uyarısı', 'f45-ts', 'middle')}
      <g class="f45-elek"><circle cx="46" cy="80" r="5"/><circle cx="58" cy="76" r="5"/><path d="M46 75 L40 46 M58 71 L60 46"/></g>${tx(50, 40, 'saçlı deri elektrotları', 'f45-ts', 'start')}
      ${tx(40, 130, 'somatosensoriyel korteks', 'f45-ts', 'start')}
      ${tx(180, 168, 'duyusal yol: periferik sinir → omurilik → korteks', 'f45-ts f45-c-clin', 'middle')}
      ${tx(180, 190, 'genellikle motor uyarılmış potansiyellerle birlikte', 'f45-ts', 'middle')}
      <circle class="f45-sinyal" r="5"/></svg>`;
    osc.innerHTML = `<svg class="f45-svg" viewBox="0 0 360 200" role="img" aria-label="Kortikal yanıt izi: bazal ve güncel">
      <rect class="f45-scr-z" x="0" y="0" width="360" height="200" rx="8"/>
      <line class="f45-grid" x1="30" x2="344" y1="104" y2="104"/><line class="f45-grid" x1="30" x2="30" y1="20" y2="176"/>
      ${tx(30, 192, '0', 'f45-ts f45-scr-t', 'middle')}${tx(344, 192, '60', 'f45-ts f45-scr-t', 'middle')}${tx(187, 192, 'ms', 'f45-ts f45-scr-t', 'middle')}${tx(14, 100, 'µV', 'f45-ts f45-scr-t', 'middle', ' transform="rotate(-90 14 100)"')}
      <line class="f45-bazcz" x1="0" x2="0" y1="24" y2="176"/>
      <path class="f45-baz" d=""/><path class="f45-gun" d=""/>
      ${tx(344, 30, 'bazal', 'f45-ts f45-scr-t f45-baz-t', 'end')}${tx(344, 46, 'güncel', 'f45-ts f45-gun-t', 'end')}</svg>`;
    const yol = fig.querySelector('.f45-ssyol');
    const x = (ms) => 30 + (ms / 60) * 314;
    const dalga = (amp, lat) => { let d = ''; for (let i = 0; i <= 300; i++) { const ms = (i / 300) * 60; const v = amp * (-Math.exp(-Math.pow((ms - lat) / 2.6, 2)) + 0.85 * Math.exp(-Math.pow((ms - lat - 9) / 3.4, 2))) + 0.02 * Math.sin(ms * 2.1); d += (i ? 'L' : 'M') + x(ms).toFixed(1) + ' ' + (104 + v * 70).toFixed(1); } return d; };
    const L0 = 22;
    const ofs = osc.querySelector('svg');
    ofs.querySelector('.f45-baz').setAttribute('d', dalga(1, L0));
    ofs.querySelector('.f45-bazcz').setAttribute('transform', `translate(${x(L0)} 0)`);
    const gun = ofs.querySelector('.f45-gun'); let gunL = 0;
    const kare = () => {
      const zz = z / 100, amp = 1 - 0.7 * zz, lat = 8 * zz;
      const sg = fig.querySelector('.f45-sinyal');
      if (!RM && t < 0.8) { const q = nokta(yol, t / 0.8); sg.setAttribute('cx', q.x); sg.setAttribute('cy', q.y); sg.style.opacity = 1; } else sg.style.opacity = 0;
      gun.setAttribute('d', dalga(amp, L0 + lat));
      if (!gunL) gunL = gun.getTotalLength() || 1;
      const k = RM ? 1 : clamp((t - 0.8) / 0.6, 0, 1);
      gun.style.strokeDasharray = gunL; gun.style.strokeDashoffset = gunL * (1 - k);
    };
    const durum = () => {
      const zz = z / 100, amp = 100 * (1 - 0.7 * zz), lat = 8 * zz;
      el.querySelector('[data-o=z]').textContent = '%' + z;
      el.querySelector('[data-o=g]').textContent = '%' + fmt(amp);
      el.querySelector('[data-o=l]').textContent = lat < 0.05 ? 'bazal' : '+' + fmt(lat, 1) + ' ms';
      const esik = amp < 50 || lat > 4;
      el.querySelector('.f45-uyari').classList.toggle('on', esik);
      const c = fig.querySelector('.f45-cerr'); c.classList.toggle('kr', esik); c.style.setProperty('--f45-z', String(0.25 + 0.75 * zz));
      return z === 0 ? '<b>Bazal yanıt.</b> Periferik sinir uyarılır; yanıt somatosensoriyel korteksin üstüne yerleştirilen saçlı deri elektrotlarından alınır. Uyarın, sonra omuriliği zorlayın. [[K1 s. 196]]'
        : esik ? '<b>Genlik düştü, latans uzadı.</b> Spinal cerrahide SSEP genliğinin azalması ya da latansının uzaması nörolojik hasarı düşündürür. [[K1 s. 196]]'
        : '<b>Hafif değişiklik.</b> Genlik biraz azaldı, latans biraz uzadı; izlem sürer. [[K1 s. 196]]';
    };
    const uyar = () => { t = RM ? 9 : 0; kare(); };
    el.querySelector('[data-a=uy]').addEventListener('click', uyar);
    const inp = el.querySelector('input');
    let son = '';
    inp.addEventListener('input', () => { z = +inp.value; const h = durum(); if (h !== son) { son = h; capYaz(el, h); } if (!RM && t >= 1.4) uyar(); else kare(); });
    const ro = darIzle(el, (d) => { dar = d; g.classList.toggle('f45-dar', d); });
    durum(); son = durum(); kare();
    const dur = RM ? () => {} : ticker(el, (dt) => { if (t < 1.5) { t += dt; kare(); } });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     13 · f45_bis — ajan ve doz: EEG ve BIS (K1 s. 196–197)
     ===================================================================== */
  VIZ.f45_bis = (el) => {
    const AJ = { pro: 'Propofol', inh: 'İnhalasyon ajanı', mid: 'Midazolam', n2o: 'N₂O', opi: 'Opioid', ket: 'Ketamin' };
    let aj = 'pro', doz = 60, dar = false, T0 = 0, ilk = true;
    el.innerHTML = `<div class="f45-kont"><div><span class="f45-lbl">Ajan</span>${segHtml('Ajan', 'aj', Object.keys(AJ).map((k) => [k, AJ[k]]), aj)}</div>
      <label class="f45-kay"><span class="f45-lbl">Doz: <b data-o="d">%60</b></span><input type="range" min="0" max="100" step="1" value="60" aria-label="Doz"></label></div>
      <div class="f45-g2 f45-bis-g"><div><div class="f45-svgk f45-bis-e"></div><div class="f45-svgk f45-bis-s"></div></div>
        <div class="f45-bis-yan"><div class="f45-svgk f45-bis-c"></div><p class="tag crit f45-ayr">BIS klinik etkiyi yansıtmıyor</p></div></div>
      <div class="f45-cal"><div><b>B-Aware</b> BIS rehberliği hatırlanan farkındalık riskini %82 azalttı.</div><div><b>B-Unaware</b> End-tidal volatil konsantrasyon izleminden daha fazla azaltmadı.</div></div>`;
    const eK = el.querySelector('.f45-bis-e'), sK = el.querySelector('.f45-bis-s'), cK = el.querySelector('.f45-bis-c'), g = el.querySelector('.f45-bis-g');
    const FS = 200, WIN = 3, N = FS * WIN; const buf = new Float32Array(N); let bi = 0, ph1 = 0, ph2 = 0, ph3 = 0;
    const doza = () => ['pro', 'inh', 'mid'].includes(aj);
    const bisD = () => {
      if (doza()) return 97 - 0.75 * doz;
      if (aj === 'ket') return Math.min(99, 92 + 0.07 * doz);
      return 95 + 2 * Math.sin(T0 * 1.3) * Math.sin(T0 * 0.47 + 1);
    };
    const klin = () => (doza() ? doz / 100 : aj === 'ket' ? 0.9 * doz / 100 : 0.8 * doz / 100);
    const par = () => {
      const u = doz / 100;
      if (doza()) return { f1: 20 - 18 * u, a1: 0.15 + 0.65 * u, f2: 2.6 * (20 - 18 * u), a2: 0.12 * (0.15 + 0.65 * u), n: 0.07 };
      if (aj === 'ket') return { f1: 22, a1: 0.15 + 0.2 * u, f2: 29, a2: 0.05 + 0.15 * u, n: 0.05 + 0.03 * u };
      return { f1: 20, a1: 0.13, f2: 25.3, a2: 0.07, n: 0.05 };
    };
    const uret = (n) => {
      const p = par();
      for (let i = 0; i < n; i++) {
        ph1 += p.f1 / FS; ph2 += (p.f2 || 1) / FS; ph3 += 0.7 / FS;
        const tt = (bi + i) / FS;
        buf[(bi + i) % N] = p.a1 * (0.8 + 0.2 * Math.sin(2 * Math.PI * 0.43 * tt) + 0.12 * Math.sin(2 * Math.PI * 1.7 * tt)) * Math.sin(2 * Math.PI * ph1) + p.a2 * Math.sin(2 * Math.PI * ph2) + p.n * gur(tt, 0.3) + (doza() ? 0.08 * p.a1 * Math.sin(2 * Math.PI * ph3) : 0);
      }
      bi += n;
    };
    const ciz = () => {
      const ew = 360, eh = dar ? 120 : 132;
      eK.innerHTML = `<svg class="f45-svg f45-scr" viewBox="0 0 ${ew} ${eh}" role="img" aria-label="Kayan frontal EEG izi"><rect class="f45-scr-z" width="${ew}" height="${eh}" rx="8"/>
        ${[1, 2].map((s) => `<line class="f45-grid" x1="${s * ew / 3}" x2="${s * ew / 3}" y1="0" y2="${eh}"/>`).join('')}${tx(10, 20, 'frontal EEG', 'f45-ts f45-scr-t')}<path class="f45-iz2" d=""/></svg>`;
      const x = (b) => 16 + (b / 100) * 328;
      sK.innerHTML = `<svg class="f45-svg" viewBox="0 0 360 104" role="img" aria-label="BIS ölçeği 0–100; 40–60 cerrahi için uygun">
        <rect class="f45-bz0" x="${x(0)}" y="52" width="${x(40) - x(0)}" height="18"/><rect class="f45-bz1" x="${x(40)}" y="52" width="${x(60) - x(40)}" height="18"/><rect class="f45-bz2" x="${x(60)}" y="52" width="${x(100) - x(60)}" height="18"/>
        ${[0, 40, 60, 100].map((b) => tx(x(b), 84, b, 'f45-ts', 'middle')).join('')}
        ${tx(x(50), 99, 'cerrahi için uygun 40–60', 'f45-ts f45-c-ok', 'middle')}${tx(x(0), 99, 'etkinlik yok', 'f45-ts', 'start')}${tx(x(100), 99, 'tam uyanık', 'f45-ts', 'end')}
        <g class="f45-bim"><path class="f45-imlec" d="M-7 38 L7 38 L0 50 Z"/><text class="f45-bisno" x="0" y="32" text-anchor="middle">52</text></g></svg>`;
      cK.innerHTML = dar
        ? `<svg class="f45-svg" viewBox="0 0 360 56" role="img" aria-label="Klinik derinlik çubuğu (temsilî)">${tx(0, 14, 'klinik derinlik (temsilî)', 'f45-ts')}
            <rect class="f45-kd-z" x="0" y="22" width="360" height="16" rx="8"/><rect class="f45-kd" x="0" y="22" width="0" height="16" rx="8"/>${tx(0, 52, 'uyanık', 'f45-ts')}${tx(360, 52, 'derin', 'f45-ts', 'end')}</svg>`
        : `<svg class="f45-svg" viewBox="0 0 160 236" role="img" aria-label="Klinik derinlik çubuğu (temsilî)">${tx(80, 14, 'klinik derinlik', 'f45-ts', 'middle')}${tx(80, 28, '(temsilî)', 'f45-ts', 'middle')}
            <rect class="f45-kd-z" x="62" y="40" width="36" height="170" rx="10"/><rect class="f45-kd" x="62" y="40" width="36" height="0" rx="10"/>${tx(108, 52, 'uyanık', 'f45-ts')}${tx(108, 208, 'derin', 'f45-ts')}</svg>`;
      cK.dataset.dar = dar ? '1' : '';
      kare();
    };
    const kare = () => {
      const ez = eK.querySelector('.f45-iz2'); if (!ez) return;
      const ew = 360, eh = dar ? 120 : 132, mid = eh / 2 + 6, A = eh * 0.42;
      let d = '';
      for (let i = 0; i < N; i += 2) { const v = buf[(bi + i) % N]; d += (i ? 'L' : 'M') + ((i / N) * ew).toFixed(1) + ' ' + (mid - A * clamp(v, -1.1, 1.1)).toFixed(1); }
      ez.setAttribute('d', d);
      const b = bisD(), x = 16 + (b / 100) * 328;
      sK.querySelector('.f45-bim').setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
      sK.querySelector('.f45-bisno').textContent = Math.round(b);
      const c = klin(), kd = cK.querySelector('.f45-kd');
      if (cK.dataset.dar) kd.setAttribute('width', Math.max(16, 360 * c)); else kd.setAttribute('height', Math.max(20, 170 * c));
      const ayr = (!doza()) && doz >= 40;
      el.querySelector('.f45-ayr').classList.toggle('on', ayr);
    };
    const capH = () => {
      if (doza()) { const b = bisD(); return `<b>${AJ[aj]}.</b> Doz arttıkça EEG yavaşlar ve BIS düşer: doz–yanıt ilişkisi vardır.${b >= 40 && b <= 60 ? ' Cerrahi için uygun düzey: 40–60.' : ''} [[K1 s. 196]]`; }
      if (aj === 'ket') return '<b>Ketamin.</b> Öteki anestezik ajanların aksine EEG etkinliğini artırır ve BIS sayısını yükseltir. [[K1 s. 196]]';
      return `<b>${AJ[aj]}.</b> Klinikte öteki ajanlarla sinerjik etkisi olduğu hâlde BIS sayısını değiştirmez. [[K1 s. 196]]`;
    };
    const inp = el.querySelector('input');
    let son = '';
    const capG = () => { const h = capH(); if (h !== son) { son = h; capYaz(el, h); } };
    secimDinle(el, 'aj', (v) => { aj = v; doz = 60; inp.value = 60; el.querySelector('[data-o=d]').textContent = '%60'; basSec(el, 'aj', v); ilk = false; capG(); if (RM) { uret(N); kare(); } });
    inp.addEventListener('input', () => { doz = +inp.value; el.querySelector('[data-o=d]').textContent = '%' + doz; ilk = false; capG(); if (RM) { uret(N); } kare(); });
    void ilk;
    uret(N);
    const ro = darIzle(el, (d) => { dar = d; g.classList.toggle('f45-dar', d); ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { T0 += dt; uret(Math.max(1, Math.round(dt * FS))); kare(); });
    return () => { dur(); ro(); };
  };
})();
