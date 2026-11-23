/* Bölüm 47 · Kan–beyin bariyeri · bileşenler (tarif: docs/tasarim/fiz47.md; K1 s. 200–201).
   Kitaptan: üç katman, dört geçiş yolu, dışlanan maddeler, dört ilaç yolu, 100 kat (diamorfin/morfin),
   beş sirkumventriküler yapı, sağlam kan–BOS bariyeri. Temsilî: konumlar, boyutlar, molekül sayıları. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const f = (v) => Math.round(v * 10) / 10;
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const darIzle = (el, cb) => {
    let d = null;
    const g = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    g();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(g) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tx = (x, y, s, cls, anc) => `<text class="${cls}" x="${f(x)}" y="${f(y)}"${anc ? ` text-anchor="${anc}"` : ''}>${s}</text>`;
  const pol = (cx, cy, r, a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const halka = (cx, cy, r1, r2, a1, a2) => {
    const [x1, y1] = pol(cx, cy, r2, a1), [x2, y2] = pol(cx, cy, r2, a2), [x3, y3] = pol(cx, cy, r1, a2), [x4, y4] = pol(cx, cy, r1, a1);
    const l = a2 - a1 > 180 ? 1 : 0;
    return `M${f(x1)} ${f(y1)}A${r2} ${r2} 0 ${l} 1 ${f(x2)} ${f(y2)}L${f(x3)} ${f(y3)}A${r1} ${r1} 0 ${l} 0 ${f(x4)} ${f(y4)}Z`;
  };
  /* dokunulabilir SVG parçaları: tıklama + Enter/Space */
  const dokun = (root, sel, cb) => {
    const h = (e) => { const t = e.target.closest(sel); if (!t || !root.contains(t)) return; if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return; if (e.type === 'keydown') e.preventDefault(); cb(t); };
    root.addEventListener('click', h); root.addEventListener('keydown', h);
  };

  /* =====================================================================
     1 · f47_katman — beyin kapilleri kesiti: üç katman (K1 s. 200)
     ===================================================================== */
  VIZ.f47_katman = (el) => {
    const KAT = [['endo', 'Endotel'], ['bm', 'Bazal membran'], ['astro', 'Astrosit uzantıları'], ['sj', 'Sıkı bağlantı']];
    const CAP = {
      endo: '<b>Endotel hücreleri.</b> Sıkı bağlantılarla birbirine kenetlenir; çok sayıda mitokondri içerir. Bir katmana dokunun ya da koroid pleksusla karşılaştırın. [[K1 s. 200]]',
      sj: "<b>Sıkı bağlantılar.</b> Endotel hücreleri arasındaki yolu kapatır; maddelerin kapillerden beyin ECF'sine geçişini kısıtlar. [[K1 s. 200]]",
      bm: '<b>Kalın bazal membran.</b> Endotel hücrelerinin hemen altında, ikinci katmandır. [[K1 s. 200]]',
      astro: '<b>Astrosit ayaksı uzantıları.</b> Destek glia hücresi olan astrositler kapilleri sarar ve ona yakından yapışır; endotel geçirgenliğini azaltan kimyasallar salgılar. [[K1 s. 200]]',
      mito: '<b>Mitokondriler.</b> BBB kapillerlerini beyin dışı kapillerlerden ayıran yüksek mitokondri yoğunluğu, iyonların aktif taşınmasının yüksek metabolik etkinliğini yansıtır. [[K1 s. 200]]',
      kp: '<b>Koroid pleksus.</b> Astrositlerle sarılı değildir; endoteli bu yüzden çok geçirgendir. [[K1 s. 200]]',
      uc: '<b>Üç katman birlikte</b> lipofobik moleküllere neredeyse geçit vermeyen bir bariyer kurar. [[K1 s. 200]]',
    };
    const KART = {
      endo: ['Endotel hücreleri', 'Birinci katman: sıkı bağlantılarla kenetli hücreler.', 'Bol mitokondri: beyin dışı kapillerlerden farkı.'],
      sj: ['Sıkı bağlantılar', "Hücreler arası yolu kapatır: kapillerden beyin ECF'sine geçiş kısıtlanır."],
      bm: ['Kalın bazal membran', 'İkinci katman: endotelin hemen altında.'],
      astro: ['Astrosit ayaksı uzantıları', 'Üçüncü katman: kapilleri sarar, yakından yapışır.', 'Endotel geçirgenliğini azaltan kimyasallar salgılar.'],
      mito: ['Mitokondriler', 'Yüksek yoğunluk = iyonların aktif taşınmasının yüksek metabolik etkinliği.'],
    };
    const ON = { endo: ['endo', 'mito'], mito: ['mito'], bm: ['bm'], astro: ['astro'], sj: ['sj'] };
    let mod = 'bbb', sel = 'endo', t = 0;
    el.innerHTML = `<div class="f47-ust">${segHtml('Kesit', 'mod', [['bbb', 'Beyin kapilleri (BBB)'], ['kp', 'Koroid pleksus']], mod)}</div>
      <div class="btn-row f47-bt" role="group" aria-label="Katman">${KAT.map(([k, l]) => `<button type="button" class="btn ghost" data-kat="${k}" aria-pressed="${String(k === sel)}">${l}</button>`).join('')}</div>
      <div class="f47-kat-g"><div class="f47-kat-svg"></div>
        <div class="f47-kat-yan"><div class="f47-kart"></div>
          <div class="f47-islev"><p class="f47-islev-bas">BBB'nin üç işlevi</p>
            <p><b>1</b><span>Sabit MSS ECF'si (en önemli işlev): ör. egzersizde plazma pH ve K⁺ değişimi nöronlara geçmez</span></p>
            <p><b>2</b><span>Kanla gelen zararlı/nöroaktif maddelerden koruma</span></p>
            <p><b>3</b><span>MSS nörotransmiterlerinin kana kaçmasını önleme</span></p></div></div></div>`;
    const kutu = el.querySelector('.f47-kat-svg'), g = el.querySelector('.f47-kat-g'), kart = el.querySelector('.f47-kart');
    const C = [175, 172];
    const SJA = [90, 210, 330];
    const dilim = (gap) => SJA.map((a) => `<path class="f47-endo-d" d="${halka(C[0], C[1], 48, 72, a + gap, a + 120 - gap)}"/>`).join('');
    const mitoHtml = SJA.map((a) => [a + 28, a + 60, a + 92].map((m) => {
      const [x, y] = pol(C[0], C[1], 60, m);
      return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(m + 90)})"><rect x="-8" y="-3.6" width="16" height="7.2" rx="3.6"/><path d="M-5 0l2-2.4 2 4.8 2-4.8 2 4.8"/></g>`;
    }).join('')).join('');
    const astroYay = [0, 1, 2, 3, 4, 5].map((i) => `<path d="${halka(C[0], C[1], 81, 100, i * 60 - 87, i * 60 - 33)}"/>`).join('');
    const yildiz = (cx, cy, r) => { let d = ''; for (let i = 0; i < 12; i++) { const [x, y] = pol(cx, cy, i % 2 ? r * 0.5 : r, i * 30 - 90); d += (i ? 'L' : 'M') + f(x) + ' ' + f(y); } return d + 'Z'; };
    const [s1x, s1y] = pol(C[0], C[1], 99, -40), [s2x, s2y] = pol(C[0], C[1], 99, 160);
    const SALG0 = [304, 70], SALG1 = pol(C[0], C[1], 76, -36);
    const [mx, my] = pol(C[0], C[1], 60, 238), [ex, ey] = pol(C[0], C[1], 60, 192), [bx, by] = pol(C[0], C[1], 76, 148), [ax, ay] = pol(C[0], C[1], 92, 42);
    kutu.innerHTML = `<svg class="f47-svg" viewBox="0 0 380 336" role="img" aria-label="Beyin kapilleri enine kesiti: lümen, endotel, bazal membran, astrosit ayaksı uzantıları">
      <rect class="f47-ecf-z" x="0" y="0" width="380" height="336" rx="10"/>
      ${tx(8, 326, 'beyin ECF', 'f47-ts f47-c-ok')}
      <g class="f47-astro-w">
        <g data-k="astro" class="f47-astro" tabindex="0" role="button" aria-label="Astrosit uzantıları">
          <path class="f47-sap" d="M${f(s1x)} ${f(s1y)}Q292 112 ${SALG0[0] + 8} ${SALG0[1] - 8}"/><path class="f47-sap" d="M${f(s2x)} ${f(s2y)}Q60 196 4 188"/>
          <path class="f47-sap-i" d="M${f(s1x)} ${f(s1y)}Q292 112 ${SALG0[0] + 8} ${SALG0[1] - 8}"/><path class="f47-sap-i" d="M${f(s2x)} ${f(s2y)}Q60 196 4 188"/>
          ${astroYay}<path class="f47-govde" d="${yildiz(318, 54, 19)}"/></g>
        ${tx(294, 34, 'astrosit', 'f47-t f47-c-ok', 'end')}
        <line class="f47-salg-yol" x1="${SALG0[0]}" y1="${SALG0[1]}" x2="${f(SALG1[0])}" y2="${f(SALG1[1])}"/>
        <g class="f47-salg"><circle r="3.6"/><circle r="3.6"/><circle r="3.6"/></g>
        ${tx(288, 112, 'geçirgenliği', 'f47-ts')}${tx(288, 127, 'azaltan', 'f47-ts')}${tx(288, 142, 'kimyasallar', 'f47-ts')}
        <line class="f47-ok-c" x1="${f(ax)}" y1="${f(ay)}" x2="290" y2="262"/>${tx(292, 270, 'ayaksı', 'f47-ts f47-c-ok')}${tx(292, 285, 'uzantı', 'f47-ts f47-c-ok')}
      </g>
      <g data-k="bm" class="f47-bm" tabindex="0" role="button" aria-label="Bazal membran"><circle cx="${C[0]}" cy="${C[1]}" r="80"/><circle class="f47-bm-i" cx="${C[0]}" cy="${C[1]}" r="72"/></g>
      <g data-k="endo" class="f47-endo" tabindex="0" role="button" aria-label="Endotel">${dilim(0)}</g>
      <g data-k="mito" class="f47-mito" tabindex="0" role="button" aria-label="Mitokondriler">${mitoHtml}</g>
      <g data-k="sj" class="f47-sj" tabindex="0" role="button" aria-label="Sıkı bağlantılar">${SJA.map((a) => { const [x1, y1] = pol(C[0], C[1], 46, a), [x2, y2] = pol(C[0], C[1], 74, a); return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`; }).join('')}</g>
      <circle class="f47-lumen" cx="${C[0]}" cy="${C[1]}" r="47"/>
      <ellipse class="f47-rbc" cx="${C[0]}" cy="${C[1] - 6}" rx="24" ry="10"/><ellipse class="f47-rbc-i" cx="${C[0]}" cy="${C[1] - 6}" rx="11" ry="3.6"/>
      ${tx(C[0], C[1] + 26, 'lümen (kan)', 'f47-ts f47-c-crit', 'middle')}
      <g class="f47-siz"><circle r="4"/><circle r="4"/><circle r="4"/><circle r="4"/><circle r="4"/></g>
      <line class="f47-lead" x1="${f(mx)}" y1="${f(my)}" x2="80" y2="58"/>${tx(78, 52, 'mitokondri', 'f47-ts', 'end')}
      <line class="f47-lead" x1="${f(ex)}" y1="${f(ey)}" x2="62" y2="136"/>${tx(58, 140, 'endotel', 'f47-t f47-c-basic', 'end')}
      <line class="f47-lead" x1="${f(bx)}" y1="${f(by)}" x2="64" y2="252"/>${tx(6, 266, 'bazal membran', 'f47-ts')}
      <line class="f47-lead" x1="${C[0]}" y1="${C[1] + 74}" x2="${C[0]}" y2="${C[1] + 112}"/>${tx(C[0], C[1] + 126, 'sıkı bağlantı', 'f47-ts f47-sj-et', 'middle')}
    </svg>`;
    const svg = kutu.querySelector('svg');
    const endoG = svg.querySelector('.f47-endo'), sjG = svg.querySelector('.f47-sj'), astroW = svg.querySelector('.f47-astro-w');
    const salg = [...svg.querySelectorAll('.f47-salg circle')], siz = [...svg.querySelectorAll('.f47-siz circle')];
    const sjEt = svg.querySelector('.f47-sj-et');
    if (RM) astroW.style.transition = 'none';
    const SIZA = [90, 90, 210, 210, 330];
    const kare = () => {
      salg.forEach((c, i) => {
        const k = RM ? 0.2 + i * 0.3 : ((t * 0.45 + i / 3) % 1);
        c.setAttribute('cx', f(SALG0[0] + (SALG1[0] - SALG0[0]) * k)); c.setAttribute('cy', f(SALG0[1] + (SALG1[1] - SALG0[1]) * k));
        c.style.opacity = RM ? 1 : String(Math.min(1, k * 5, (1 - k) * 5));
      });
      siz.forEach((c, i) => {
        const k = RM ? 0.55 + (i % 2) * 0.3 : ((t * 0.33 + i * 0.37) % 1);
        const a = SIZA[i] + (i % 2 ? 3 : -3);
        const [x, y] = pol(C[0], C[1], 38 + k * 82, a);
        c.setAttribute('cx', f(x)); c.setAttribute('cy', f(y));
        c.style.opacity = RM ? 1 : String(Math.min(1, k * 4, (1 - k) * 4));
      });
    };
    const ciz = () => {
      const on = ON[sel];
      svg.querySelectorAll('[data-k]').forEach((n) => n.classList.toggle('f47-on', on.includes(n.dataset.k)));
      svg.classList.toggle('f47-sec', true);
      basSec(el, 'kat', sel === 'mito' ? '' : sel);
      const kp = mod === 'kp';
      endoG.innerHTML = dilim(kp ? 5 : 0);
      sjG.style.display = kp ? 'none' : '';
      astroW.classList.toggle('f47-yok', kp);
      svg.querySelector('.f47-siz').style.display = kp ? '' : 'none';
      sjEt.textContent = kp ? 'aralık: geçirgen' : 'sıkı bağlantı';
      el.querySelector('[data-kat=astro]').disabled = kp;
      const K = KART[sel];
      kart.innerHTML = `<p class="f47-kart-bas">${K[0]}</p>${K.slice(1).map((s) => `<p>${s}</p>`).join('')}${kp ? '<p class="f47-kart-kp"><span class="tag warn">koroid pleksus</span> Astrosit yok → endotel çok geçirgen.</p>' : ''}`;
      kare();
    };
    const secKat = (k) => { if (mod === 'kp' && k === 'astro') return; sel = k; ciz(); capYaz(el, CAP[k]); };
    el.addEventListener('click', (e) => {
      const m = e.target.closest('[data-mod]');
      if (m) { mod = m.dataset.mod; basSec(el, 'mod', mod); if (mod === 'kp' && sel === 'astro') sel = 'endo'; ciz(); capYaz(el, mod === 'kp' ? CAP.kp : CAP.uc); return; }
      const b = e.target.closest('[data-kat]');
      if (b && !b.disabled) secKat(b.dataset.kat);
    });
    dokun(svg, '[data-k]', (n) => secKat(n.dataset.k));
    const durD = darIzle(el, (d) => g.classList.toggle('f47-dar', d));
    ciz();
    const durT = RM ? () => {} : ticker(el, (dt) => { t += dt; kare(); });
    return () => { durT(); durD(); };
  };

  /* =====================================================================
     2 · f47_gecis — molekül seçin: BBB'yi hangi yoldan geçer? (K1 s. 200–201)
     ===================================================================== */
  VIZ.f47_gecis = (el) => {
    const GECEN = [['o2', 'O₂'], ['co2', 'CO₂'], ['etoh', 'Etanol'], ['ster', 'Steroid'], ['iyon', 'Na⁺/K⁺ ve öteki iyonlar'], ['glk', 'Glukoz'], ['su', 'Su'], ['ins', 'İnsülin'], ['ldopa', 'L-DOPA']];
    const DIS = [['da', 'Dopamin'], ['na', 'Noradrenalin'], ['gly', 'Glisin / glutamik asit'], ['nh3', 'NH₃']];
    const AD = Object.fromEntries([...GECEN, ...DIS]);
    const DIFF = (ad) => `<b>${ad} · basit difüzyon.</b> Küçük, lipitte çözünen moleküller vücuttaki öteki hücresel bariyerlerde olduğu gibi fosfolipit çift katmanlardan geçer. [[K1 s. 200]]`;
    const KATE = (ad) => `<b>${ad} · geçemez.</b> MSS'de nörotransmiter olan katekolaminler BBB'den geçmez. [[K1 s. 201]]`;
    const M = {
      o2: { lab: 'O₂', yol: 'A', cap: '<b>O₂ · basit difüzyon.</b> Küçük, lipitte çözünen molekül endotelin fosfolipit çift katmanından doğrudan geçer. Başka bir molekül seçin. [[K1 s. 200]]', tag: ['ok', 'geçer'], yolAd: 'basit difüzyon (fosfolipit çift katman)' },
      co2: { lab: 'CO₂', yol: 'A', cap: DIFF('CO₂'), tag: ['ok', 'geçer'], yolAd: 'basit difüzyon' },
      etoh: { lab: 'EtOH', yol: 'A', cap: DIFF('Etanol'), tag: ['ok', 'geçer'], yolAd: 'basit difüzyon' },
      ster: { lab: 'St', yol: 'A', cap: DIFF('Steroid hormonlar'), tag: ['ok', 'geçer'], yolAd: 'basit difüzyon (steroid hormonlar)' },
      iyon: { yol: 'B', cap: "<b>İyonlar · aktif taşıma.</b> Na⁺, K⁺, Mg²⁺, Ca²⁺, Cl⁻, HCO₃⁻ ve H⁺ geçişini zar ve taşıma süreçleri denetler; bu yüzden kan ile BOS'un pH'sı ve iyon konsantrasyonları farklı olabilir. Bol mitokondri bu yüksek metabolik etkinliği karşılar. [[K1 s. 200]]", tag: ['gold', 'denetimli geçiş'], yolAd: 'aktif taşıma dahil zar süreçleri', ek: 'Na⁺ · K⁺ · Mg²⁺ · Ca²⁺ · Cl⁻ · HCO₃⁻ · H⁺' },
      glk: { lab: 'Glk', yol: 'C', cap: '<b>Glukoz · kolaylaştırılmış difüzyon.</b> GLUT1 taşıyıcısı glukozu konsantrasyon gradyanı yönünde taşır; ATP gerekmez. [[K1 s. 200]]', tag: ['ok', 'geçer'], yolAd: 'kolaylaştırılmış difüzyon (GLUT1)', ek: 'Gradyan yönünde · ATP gerekmez' },
      su: { lab: 'H₂O', yol: 'Q', cap: '<b>Su · akuaporin.</b> Su, akuaporin denen porlardan kolaylaştırılmış difüzyonla geçer. [[K1 s. 200]]', tag: ['ok', 'geçer'], yolAd: 'kolaylaştırılmış difüzyon (akuaporin)' },
      ins: { lab: 'İns', yol: 'D', cap: "<b>İnsülin · pinositoz.</b> Bazı moleküllerin, örneğin insülinin, BBB'yi pinositozla geçtiği düşünülür (Bölüm 4). [[K1 s. 200]]", tag: ['ok', 'geçtiği düşünülür'], yolAd: 'pinositoz', ek: 'Olası yol' },
      ldopa: { lab: 'L-D', yol: 'C', cap: '<b>L-DOPA · kolaylaştırılmış difüzyon.</b> Dopaminin öncülü taşınır ve beyinde dopamine çevrilir; substantia nigrada dopamin eksikliği olan Parkinson hastasına bu yüzden L-DOPA verilir. [[K1 s. 201]]', tag: ['ok', 'geçer'], yolAd: 'kolaylaştırılmış difüzyon', ek: 'Beyinde dopamine (DA) çevrilir' },
      da: { lab: 'DA', yol: 'X', cap: KATE('Dopamin'), tag: ['warn', 'geçemez'], yolAd: 'katekolamin: kanda kalır' },
      na: { lab: 'NA', yol: 'X', cap: KATE('Noradrenalin'), tag: ['warn', 'geçemez'], yolAd: 'katekolamin: kanda kalır' },
      gly: { yol: 'C', cap: '<b>Amino asitler · sıkı denetim.</b> Glisin ve glutamik asit gibi bazı amino asitler MSS\'de nörotransmiterdir; amino asitlerin BBB\'den taşınması sıkı düzenlenir. [[K1 s. 201]]', tag: ['gold', 'sıkı düzenlenir'], yolAd: 'taşıyıcı (nörotransmiter amino asit)' },
      nh3: { lab: 'NH₃', yol: 'A', cap: "<b>Amonyak · astrosit tuzağı.</b> Küçük ve lipofilik NH₃'ün geçmesi beklenir; ama astrositlerde hızla glutamine çevrilir ve normalde nöronlara önemli miktarda ulaşmaz. [[K1 s. 201]]", tag: ['warn', 'nörona ulaşmaz'], yolAd: 'geçer ama astrositte glutamine (Gln) çevrilir' },
    };
    const SON = 2.7;
    let mol = 'o2', dar = null, G = null, t = SON + 1, durD = () => {};
    const cip = (l) => l.map(([k, a]) => `<button type="button" class="f47-cip" data-mol="${k}" aria-pressed="${String(k === mol)}">${a}</button>`).join('');
    el.innerHTML = `<div class="f47-cipler"><div><span class="f47-lbl">Geçenler</span><div class="f47-cip-s" role="group" aria-label="Geçen moleküller">${cip(GECEN)}</div></div>
        <div><span class="f47-lbl">Dışarıda tutulanlar</span><div class="f47-cip-s" role="group" aria-label="Dışarıda tutulan maddeler">${cip(DIS)}</div></div></div>
      <div class="f47-gecis-svg"></div>
      <div class="f47-gecis-alt"><div class="f47-sonuc" aria-live="off"></div><button type="button" class="btn ghost f47-kucuk" data-a="yen">Yeniden oynat</button></div>
      <div class="legend f47-kapi-l"><span data-g="A"><b>A</b> basit difüzyon</span><span data-g="B"><b>B</b> aktif taşıma</span><span data-g="C"><b>C</b> kolaylaştırılmış difüzyon (GLUT1 · akuaporin)</span><span data-g="D"><b>D</b> pinositoz</span></div>`;
    const kutu = el.querySelector('.f47-gecis-svg'), sonuc = el.querySelector('.f47-sonuc');
    const geo = (d) => d
      ? { W: 360, H: 340, yB: 110, yE: 188, yBM: 195, yA: 213, top: 46, ecf: 272, cells: [[0, 179], [181, 360]], tj: [180], A: 45, B: 122, mito: [[86, 160], [158, 152]], C: 222, Q: 268, D: 322, nr: [190, 300] }
      : { W: 640, H: 300, yB: 90, yE: 170, yBM: 178, yA: 196, top: 38, ecf: 250, cells: [[0, 212], [214, 426], [428, 640]], tj: [213, 427], A: 106, B: 258, mito: [[236, 136], [294, 142]], C: 340, Q: 390, D: 534, nr: [600, 256] };
    /* senaryolar: parça = { lab, cls, pts:[[x,y,t]], don:[t,lab] } */
    const senaryo = (k) => {
      const m = M[k], Gx = G, top = Gx.top, mem = Gx.yB, astY = (Gx.yBM + Gx.yA) / 2, ecf = Gx.ecf;
      const ev = {};
      let p = [];
      if (m.yol === 'A') {
        if (k === 'nh3') { p = [{ lab: 'NH₃', cls: '', pts: [[Gx.A, top, 0], [Gx.A, mem - 16, 0.6], [Gx.A, astY, 1.6]], don: [1.8, 'Gln'] }]; ev.nhx = 1; }
        else p = [{ lab: m.lab, cls: '', pts: [[Gx.A, top, 0], [Gx.A, mem - 16, 0.6], [Gx.A, Gx.yA + 18, 1.6], [Gx.A + 24, ecf, 2.4]] }];
      } else if (m.yol === 'B') {
        p = [['Na⁺', -32, 0], ['K⁺', 0, 0.25], ['Cl⁻', 32, 0.5]].map(([lab, dx, s]) => ({ lab, cls: '', pts: [[Gx.B + dx, top, s], [Gx.B, mem - 16, 0.55 + s], [Gx.B, mem + 16, 0.95 + s], [Gx.B, Gx.yA + 16, 1.55 + s], [Gx.B + dx, ecf, 2.15 + s]] }));
        ev.pompa = [0.5, 1.9]; ev.mito = [0.55, 1.9];
      } else if (m.yol === 'C' && k !== 'gly') {
        p = [{ lab: m.lab, cls: '', pts: [[Gx.C, top, 0], [Gx.C, mem - 18, 0.55], [Gx.C, mem - 18, 0.8], [Gx.C, mem + 20, 1.15], [Gx.C, Gx.yA + 18, 1.75], [Gx.C + 14, ecf, 2.4]], don: k === 'ldopa' ? [2.2, 'DA'] : null }];
        ev.kapi = [0.7, 1.35, 1];
      } else if (k === 'gly') {
        p = [{ lab: 'Gly', cls: '', pts: [[Gx.C, top, 0], [Gx.C, mem - 18, 0.55], [Gx.C, mem - 18, 0.8], [Gx.C, mem + 20, 1.15], [Gx.C, Gx.yA + 18, 1.75], [Gx.C, ecf, 2.4]] },
          { lab: 'Glu', cls: 'f47-m-ret', pts: [[Gx.C - 34, top, 0.1], [Gx.C - 12, mem - 20, 0.85], [Gx.C - 46, top + 10, 1.7]] },
          { lab: 'Gly', cls: 'f47-m-ret', pts: [[Gx.C + 34, top - 6, 0.25], [Gx.C + 12, mem - 20, 1.0], [Gx.C + 40, top + 14, 1.9]] }];
        ev.kapi = [0.7, 1.35, 0.5];
      } else if (m.yol === 'Q') {
        p = [{ lab: m.lab, cls: '', pts: [[Gx.Q, top, 0], [Gx.Q, mem - 16, 0.6], [Gx.Q, Gx.yA + 18, 1.6], [Gx.Q - 10, ecf, 2.4]] }];
      } else if (m.yol === 'D') {
        p = [{ lab: m.lab, cls: '', pts: [[Gx.D, top, 0], [Gx.D, mem + 4, 0.7], [Gx.D, Gx.yE - 16, 1.6], [Gx.D, Gx.yA + 18, 2.0], [Gx.D - 14, ecf, 2.5]] }];
        ev.ves = [0.7, 1.95];
      } else {
        p = [{ lab: m.lab, cls: 'f47-m-ret', pts: [[Gx.A + 10, top, 0], [Gx.A, mem - 16, 0.75], [Gx.A - 22, top + 8, 1.6]] },
          { lab: m.lab, cls: 'f47-m-ret', pts: [[Gx.tj[0] + 16, top - 4, 0.2], [Gx.tj[0], mem - 16, 0.95], [Gx.tj[0] + 26, top + 12, 1.8]] }];
        ev.sek = [[Gx.A, mem - 2, 0.75], [Gx.tj[0], mem - 2, 0.95]];
      }
      return { p, ev };
    };
    const konum = (pts, tt) => {
      if (tt <= pts[0][2]) return [pts[0][0], pts[0][1], 0];
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        if (tt <= b[2]) { const k = b[2] > a[2] ? ease((tt - a[2]) / (b[2] - a[2])) : 1; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, 1]; }
      }
      const z = pts[pts.length - 1]; return [z[0], z[1], 1];
    };
    let S = null, parcalar = [];
    const ciz = () => {
      G = geo(dar);
      const { W, H, yB, yE, yBM, yA } = G;
      const mitoE = (x, y) => `<g class="f47-g-mito" transform="translate(${x} ${y})"><ellipse rx="13" ry="6"/><path d="M-8 0l2.6-3 2.6 6 2.6-6 2.6 6 2.6-6"/></g>`;
      const rozet = (x, y, h) => `<g class="f47-rozet" data-gr="${h}"><circle cx="${x}" cy="${y}" r="10"/>${tx(x, y + 4.4, h, 'f47-roz-t', 'middle')}</g>`;
      kutu.innerHTML = `<svg class="f47-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kapiller duvarı kesiti: kan, endotel, bazal membran, astrosit uzantısı ve beyin ECF; dört geçiş kapısı">
        <defs><marker id="f47-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="f47-ok-uc"/></marker></defs>
        <rect class="f47-kan" x="0" y="0" width="${W}" height="${yB}"/>
        <rect class="f47-ecf-b" x="0" y="${yA}" width="${W}" height="${H - yA}"/>
        ${tx(8, 18, 'kan (kapiller lümeni)', 'f47-ts f47-c-crit')}${tx(8, H - 10, 'beyin ECF', 'f47-ts f47-c-ok')}
        ${G.cells.map(([a, b]) => `<rect class="f47-hucre" x="${a}" y="${yB}" width="${b - a}" height="${yE - yB}"/>`).join('')}
        ${tx(G.cells[G.cells.length - 1][1] - 8, dar ? yB + 64 : yE - 8, 'endotel', 'f47-ts f47-c-basic', 'end')}
        ${G.tj.map((x) => `<line class="f47-tj" x1="${x}" y1="${yB}" x2="${x}" y2="${yE}"/>`).join('')}
        ${tx(G.tj[0] + 6, yE - 8, 'sıkı bağlantı', 'f47-ts')}
        <rect class="f47-bm-s" x="0" y="${yE}" width="${W}" height="${yBM - yE}"/>
        <rect class="f47-astro-s" x="0" y="${yBM}" width="${W}" height="${yA - yBM}"/>
        ${tx(W - 8, yA - 4.5, dar ? 'astrosit uzantısı' : 'astrosit ayaksı uzantısı', 'f47-ts f47-c-ok', 'end')}
        <g class="f47-kapi" data-g="A"><path class="f47-lip" d="M${G.A - 26} ${yB + 3}h52M${G.A - 26} ${yB + 7}h52M${G.A - 26} ${yE - 3}h52M${G.A - 26} ${yE - 7}h52"/></g>
        <g class="f47-kapi" data-g="B"><g class="f47-pompa" transform="translate(${G.B} ${yB})"><circle r="12"/><path class="f47-pompa-o" d="M-6 -5A8 8 0 0 1 7 -3M6 5A8 8 0 0 1 -7 3"/></g>${G.mito.map(([x, y]) => mitoE(x, y)).join('')}</g>
        <g class="f47-kapi" data-g="C"><g class="f47-glut"><rect class="f47-glut-l" x="${G.C - 12}" y="${yB - 9}" width="9" height="24" rx="4.5"/><rect class="f47-glut-r" x="${G.C + 3}" y="${yB - 9}" width="9" height="24" rx="4.5"/></g>
          <g class="f47-aqp" data-g="C"><rect x="${G.Q - 9}" y="${yB - 7}" width="6" height="22" rx="2"/><rect x="${G.Q + 3}" y="${yB - 7}" width="6" height="22" rx="2"/></g>
          ${tx(G.C, yB - 14, 'GLUT1', 'f47-ts f47-c-basic', 'middle')}${tx(G.Q + (dar ? 6 : 0), yB - 14, 'AQP', 'f47-ts f47-c-basic', 'middle')}</g>
        <g class="f47-kapi" data-g="D"><path class="f47-ves-cuk" d="M${G.D - 22} ${yB + 1}C${G.D - 12} ${yB + 1} ${G.D - 14} ${yB + 22} ${G.D} ${yB + 22}S${G.D + 12} ${yB + 1} ${G.D + 22} ${yB + 1}"/></g>
        ${rozet(G.A + 26, yB + 26, 'A')}${rozet(G.B + 24, yB + 26, 'B')}${rozet((G.C + G.Q) / 2, yB + 34, 'C')}${rozet(G.D + 26, yB + 30, 'D')}
        <g class="f47-noron" transform="translate(${G.nr[0]} ${G.nr[1]})"><path d="M-9 0L-24 -9M-9 2L-22 12M9 0L24 -6M7 6L18 18M0 -9L-3 -22"/><circle r="9"/>${tx(0, 28, 'nöron', 'f47-ts', 'middle')}</g>
        <g class="f47-nhx"><path class="f47-iz" d="M${G.A + 18} ${(yBM + yA) / 2 + 12}Q${(G.A + G.nr[0]) / 2} ${G.nr[1] + 10} ${G.nr[0] - 26} ${G.nr[1]}"/>${tx(G.nr[0] - 36, G.nr[1] - 8, '×', 'f47-x', 'middle')}</g>
        <g class="f47-izler"></g><g class="f47-sek"></g><g class="f47-mols"></g>
      </svg>`;
      yukle();
    };
    const yukle = () => {
      const svg = kutu.querySelector('svg'); if (!svg) return;
      S = senaryo(mol);
      const m = M[mol];
      const gk = m.yol === 'Q' ? 'C' : m.yol;
      svg.querySelectorAll('.f47-kapi, .f47-rozet').forEach((n) => n.classList.toggle('f47-akt', (n.dataset.g || n.dataset.gr) === gk));
      el.querySelectorAll('.f47-kapi-l [data-g]').forEach((n) => n.classList.toggle('f47-akt', n.dataset.g === gk));
      svg.querySelector('.f47-mols').innerHTML = S.p.map((q) => `<g class="f47-mol ${q.cls}"><circle r="14"/>${tx(0, 4.4, q.lab, 'f47-mol-t', 'middle')}</g>`).join('');
      svg.querySelector('.f47-izler').innerHTML = S.p.map((q) => `<polyline class="f47-iz" marker-end="url(#f47-ok)" points="${q.pts.map((z) => z[0] + ',' + z[1]).join(' ')}"/>`).join('');
      svg.querySelector('.f47-sek').innerHTML = (S.ev.sek || []).map(([x, y]) => `<g transform="translate(${x} ${y})"><path class="f47-sek-p" d="M-8 -6L8 6M-8 6L8 -6"/></g>`).join('');
      parcalar = [...svg.querySelectorAll('.f47-mol')];
      sonuc.innerHTML = `<p class="f47-sonuc-bas">${AD[mol]} <span class="tag ${m.tag[0]}">${m.tag[1]}</span></p><p>${m.yolAd}${m.ek ? ` · <b>${m.ek}</b>` : ''}</p>`;
      kare();
    };
    const kare = () => {
      const svg = kutu.querySelector('svg'); if (!svg || !S) return;
      const tt = RM ? SON + 1 : t, bitti = tt >= SON;
      S.p.forEach((q, i) => {
        const n = parcalar[i]; if (!n) return;
        const [x, y] = konum(q.pts, tt);
        n.setAttribute('transform', `translate(${f(x)} ${f(y)})`);
        const d = q.don && tt >= q.don[0];
        n.classList.toggle('f47-m-don', !!d);
        n.querySelector('text').textContent = d ? q.don[1] : q.lab;
      });
      svg.querySelector('.f47-izler').style.opacity = bitti ? 1 : 0;
      const ic = (a) => a && tt >= a[0] && tt <= a[1];
      const pom = svg.querySelector('.f47-pompa');
      const ang = S.ev.pompa ? clamp((tt - S.ev.pompa[0]) / (S.ev.pompa[1] - S.ev.pompa[0]), 0, 1) * 720 : 0;
      pom.setAttribute('transform', `translate(${G.B} ${G.yB}) rotate(${f(ang)})`);
      svg.querySelectorAll('.f47-g-mito').forEach((n) => n.classList.toggle('f47-parla', !!ic(S.ev.mito)));
      const ac = S.ev.kapi && ic(S.ev.kapi) ? 5 * S.ev.kapi[2] : 0;
      svg.querySelector('.f47-glut-l').setAttribute('transform', `translate(${-ac} 0)`);
      svg.querySelector('.f47-glut-r').setAttribute('transform', `translate(${ac} 0)`);
      svg.querySelector('.f47-sek').style.opacity = S.ev.sek && (tt >= 0.75) ? 1 : 0;
      svg.querySelector('.f47-nhx').style.opacity = S.ev.nhx && bitti ? 1 : 0;
      const ves = svg.querySelector('.f47-ves-cuk');
      ves.classList.toggle('f47-akt', !!ic(S.ev.ves));
      if (parcalar[0]) parcalar[0].classList.toggle('f47-m-ves', !!ic(S.ev.ves));
    };
    const oynat = () => { t = RM ? SON + 1 : 0; kare(); };
    el.addEventListener('click', (e) => {
      const c = e.target.closest('[data-mol]');
      if (c) { mol = c.dataset.mol; basSec(el, 'mol', mol); capYaz(el, M[mol].cap); yukle(); oynat(); return; }
      if (e.target.closest('[data-a=yen]')) oynat();
    });
    durD = darIzle(el, (d) => { dar = d; ciz(); });
    let basladi = false;
    const io = !RM && 'IntersectionObserver' in window ? new IntersectionObserver((en) => { if (en[0].isIntersecting && !basladi) { basladi = true; oynat(); } }, { threshold: 0.3 }) : null;
    if (io) io.observe(kutu);
    const durT = RM ? () => {} : ticker(el, (dt) => { if (t <= SON + 0.5) { t += dt; kare(); } });
    return () => { durT(); durD(); if (io) io.disconnect(); };
  };

  /* =====================================================================
     3 · f47_ilac — dört yol ve inflamasyon (K1 s. 201)
     ===================================================================== */
  VIZ.f47_ilac = (el) => {
    const YOL = [['lip', 'Lipitte çözünen'], ['atla', 'Bariyeri atlama'], ['tas', 'Taşıyıcı'], ['lipo', 'Lipofiliklik']];
    const CAP = {
      lip: '<b>Lipitte çözünen ilaç.</b> Propofol, tiyopental, volatil anestezikler, benzodiazepinler ve fenitoin basit difüzyonla geçer. Bir yol seçin ya da inflamasyonu açın. [[K1 s. 201]]',
      atla: "<b>Bariyeri atlama.</b> İlaç doğrudan MSS'ye verilir: intratekal metotreksat ya da polimere bağlı kemoterapi ajanlarının beyin içine yerleştirilmesi. [[K1 s. 201]]",
      tas: "<b>Transmembran taşıyıcı.</b> L-DOPA nötral amino asit taşıyıcısıyla MSS'ye girer ve orada dopamine çevrilir; dopaminin kendisi geçemez. [[K1 s. 201]]",
      lipo: "<b>Lipofilikliği artırmak.</b> Diamorfin, ana bileşiği morfinden daha lipofiliktir ve BBB'yi 100 kat kolay geçer. [[K1 s. 201]]",
      inf: '<b>İnflamasyon.</b> BBB zayıflar: normalde geçmeyen antibiyotikler menenjitte etkili olabilir. [[K1 s. 201]]',
    };
    let yol = 'lip', inf = false, dar = null, t = 0, L = null;
    el.innerHTML = `<div class="f47-ust">${segHtml('İlaç yolu', 'yol', YOL, yol)}<button type="button" class="btn ghost f47-inf" data-a="inf" aria-pressed="false">İnflamasyon (menenjit)</button></div>
      <div class="f47-ilac-svg"></div>
      <div class="f47-cubuk" hidden><p class="f47-lbl">BBB'den geçiş kolaylığı (doğrusal)</p>
        <div class="f47-cb"><span>morfin</span><i><b class="f47-cb-m"></b></i><em>1</em></div>
        <div class="f47-cb"><span>diamorfin</span><i><b class="f47-cb-d"></b></i><em>≈ 100 kat</em></div></div>
      <div class="legend f47-ilac-l"></div>`;
    const kutu = el.querySelector('.f47-ilac-svg'), cub = el.querySelector('.f47-cubuk'), leg = el.querySelector('.f47-ilac-l');
    /* u: akış ekseni (0 kan başı → 1 MSS sonu), v: yan eksen (0–1) */
    const geo = (d) => d ? { W: 360, H: 400, b1: 140 / 400, b2: 180 / 400, P: (u, v) => [v * 360, u * 400] } : { W: 640, H: 300, b1: 220 / 640, b2: 300 / 640, P: (u, v) => [u * 640, v * 300] };
    const TJ = [0.22, 0.46, 0.7, 0.9];
    const TAS_V = 0.58;
    /* parçacıklar */
    const sahne = () => {
      const p = [];
      const ab = { v0: 0.9, v1: 0.9, kind: 'ab', cls: 'f47-p-ab', T: 3.4 };
      if (yol === 'lip') {
        [0.1, 0.27, 0.44, 0.61, 0.78].forEach((v, i) => [0, 1, 2].forEach((j) => p.push({ v0: v, v1: clamp(v + (j - 1) * 0.08, 0.05, 0.84), uEnd: 0.62 + j * 0.13, fate: 'gec', cls: 'f47-p-ilac', T: 3.2, off: (i * 0.37 + j * 0.33) % 1 })));
      } else if (yol === 'tas') {
        [0, 1, 2, 3, 4].forEach((j) => p.push({ v0: TAS_V + (j % 2 ? 0.05 : -0.05), vMid: TAS_V, v1: 0.5 + (j - 2) * 0.09, uEnd: 0.66 + (j % 3) * 0.11, fate: 'gec', cls: 'f47-p-ilac', cls2: 'f47-p-da', T: 3.6, off: j / 5 }));
        [0.3, 0.8].forEach((v, j) => [0, 1].forEach((k) => p.push({ v0: v + k * 0.04, fate: 'sek', cls: 'f47-p-warn', T: 2.6, off: (j * 0.5 + k * 0.25) })));
      } else if (yol === 'lipo') {
        [0, 1, 2, 3, 4, 5, 6].forEach((j) => p.push({ v0: 0.62, v1: 0.5 + (j - 3) * 0.06, uEnd: 0.6 + (j % 4) * 0.1, fate: 'gec', cls: 'f47-p-ilac', T: 1.8, off: j / 7 }));
        [0, 1, 2, 3, 4].forEach((j) => p.push({ v0: 0.3, v1: 0.3 + (j - 2) * 0.02, uEnd: 0.7, fate: j === 0 ? 'gec' : 'sek', cls: 'f47-p-ilac', T: j === 0 ? 6 : 2.4, off: j / 5 }));
      }
      if (yol !== 'atla') [0, 1, 2].forEach((j) => p.push(Object.assign({}, ab, { off: j / 3, uEnd: 0.6 + j * 0.13, v1: 0.88 - j * 0.03, fate: inf ? 'gec' : 'sek', vMid: 0.9 })));
      return p;
    };
    let P = [];
    const ciz = () => {
      L = geo(dar);
      const { W, H, b1, b2 } = L;
      const dik = !dar; // geniş: kan solda
      const rect = (u0, u1, cls) => { const [x0, y0] = L.P(u0, 0), [x1, y1] = L.P(u1, 1); return `<rect class="${cls}" x="${f(Math.min(x0, x1))}" y="${f(Math.min(y0, y1))}" width="${f(Math.abs(x1 - x0))}" height="${f(Math.abs(y1 - y0))}"/>`; };
      const cizgi = (u0, u1, v, cls) => { const [x0, y0] = L.P(u0, v), [x1, y1] = L.P(u1, v); return `<line class="${cls}" x1="${f(x0)}" y1="${f(y0)}" x2="${f(x1)}" y2="${f(y1)}"/>`; };
      const [kx, ky] = L.P(0.02, 0.02), [mx, my] = L.P(b2 + 0.02, 0.02);
      let ek = '';
      const hap = (u, v, s, cls) => { const [x, y] = L.P(u, v); const w = s.length * 7 + 16; return `<g class="f47-hap ${cls || ''}" transform="translate(${f(x)} ${f(y)})"><rect x="${-w / 2}" y="-11" width="${w}" height="22" rx="11"/>${tx(0, 4.5, s, 'f47-hap-t', 'middle')}</g>`; };
      if (yol === 'lip') {
        const ad = ['propofol', 'tiyopental', 'volatil anestezikler', 'benzodiazepinler', 'fenitoin'];
        ek = dar ? ad.map((s, i) => hap(i < 3 ? 0.11 : 0.21, i < 3 ? [0.17, 0.5, 0.83][i] : [0.27, 0.73][i - 3], s)).join('')
          : ad.map((s, i) => hap(0.17, [0.1, 0.27, 0.44, 0.61, 0.78][i], s)).join('');
      } else if (yol === 'atla') {
        const ig = dar ? [70, 236] : [400, 70], im = dar ? [262, 330] : [560, 196];
        ek = `<g class="f47-igne"><path d="M${ig[0]} ${ig[1] - 62}L${ig[0]} ${ig[1]}"/><path class="f47-igne-u" d="M${ig[0] - 5} ${ig[1] - 74}h10v14h-10z"/></g>
          <ellipse class="f47-bos" cx="${ig[0]}" cy="${ig[1] + 26}" rx="44" ry="18"/>${tx(ig[0], ig[1] + 31, 'BOS', 'f47-ts f47-c-acc', 'middle')}
          ${tx(ig[0] + 14, ig[1] - 44, 'intratekal', 'f47-t f47-c-clin')}${tx(ig[0] + 14, ig[1] - 28, 'metotreksat', 'f47-t f47-c-clin')}
          <circle class="f47-implant" cx="${im[0]}" cy="${im[1]}" r="15"/>${tx(im[0], im[1] - 44, 'beyin içi implant:', 'f47-t f47-c-clin', 'middle')}${tx(im[0], im[1] - 28, 'polimere bağlı kemoterapi', 'f47-ts', 'middle')}`;
        L.kaynak = [[ig[0], ig[1] + 4, 'bos'], [im[0], im[1], 'imp']];
      } else if (yol === 'tas') {
        const [gx, gy] = L.P((b1 + b2) / 2, TAS_V);
        ek = (dik ? `<rect class="f47-tasiyici" x="${gx - 40}" y="${gy - 13}" width="80" height="26" rx="10"/>` : `<rect class="f47-tasiyici" x="${gx - 13}" y="${gy - 20}" width="26" height="40" rx="10"/>`)
          + hap(dar ? 0.1 : 0.15, dar ? 0.55 : 0.52, 'L-DOPA') + hap(dar ? 0.2 : 0.15, dar ? 0.3 : 0.18, 'dopamin', 'f47-hap-w')
          + (dik ? `${tx(gx, gy + 38, 'nötral amino asit', 'f47-ts f47-c-basic', 'middle')}${tx(gx, gy + 52, 'taşıyıcısı', 'f47-ts f47-c-basic', 'middle')}`
            : `${tx(gx + 20, gy + 40, 'nötral amino asit', 'f47-ts f47-c-basic')}${tx(gx + 20, gy + 54, 'taşıyıcısı', 'f47-ts f47-c-basic')}`)
          + (() => { const [x, y] = L.P(dar ? 0.8 : 0.78, dar ? 0.6 : 0.36); return tx(x, y, 'L-DOPA → dopamin', 'f47-t f47-c-ok', 'middle'); })();
      } else if (yol === 'lipo') {
        ek = hap(dar ? 0.11 : 0.15, 0.3, 'morfin') + hap(dar ? 0.11 : 0.15, 0.62, 'diamorfin');
      }
      const abHap = yol !== 'atla' ? hap(dar ? 0.22 : 0.15, dar ? 0.83 : 0.93, 'antibiyotik', 'f47-hap-ab') : '';
      kutu.innerHTML = `<svg class="f47-svg${yol === 'atla' ? ' f47-atla' : ''}${inf ? ' f47-inf-on' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kan, BBB duvarı ve MSS; seçili ilaç yolu">
        ${rect(0, b1, 'f47-kan')}${rect(b2, 1, 'f47-ecf-b')}${rect(b1, b2, 'f47-duvar')}
        ${TJ.map((v) => cizgi(b1, b2, v, 'f47-tj f47-tj-i')).join('')}
        ${tx(kx, ky + 14, 'kan', 'f47-t f47-c-crit')}${dar ? tx(8, H - 10, 'beyin ECF / MSS', 'f47-t f47-c-ok') : tx(mx + 4, my + 14, 'beyin ECF / MSS', 'f47-t f47-c-ok')}
        ${(() => { const [x, y] = L.P(b1, 0); return dar ? tx(W - 6, y + 25, 'BBB', 'f47-ts f47-c-basic', 'end') : tx(x + 40, y + H - 8, 'BBB', 'f47-ts f47-c-basic', 'middle'); })()}
        <g class="f47-ps"></g>${ek}${abHap}</svg>`;
      P = sahne();
      kutu.querySelector('.f47-ps').innerHTML = P.map((q) => `<circle class="${q.cls}" r="${q.kind === 'ab' ? 6 : 6.5}"/>`).join('') + (yol === 'atla' ? new Array(14).fill('<circle class="f47-p-ilac" r="6"/>').join('') : '');
      cub.hidden = yol !== 'lipo';
      leg.innerHTML = { lip: '<span><i style="background:var(--c-clin)"></i>lipitte çözünen ilaç</span>', atla: '<span><i style="background:var(--c-clin)"></i>doğrudan MSS\'ye verilen ilaç</span>', tas: '<span><i style="background:var(--c-clin)"></i>L-DOPA</span><span><i style="background:var(--ok)"></i>MSS\'de dopamin</span><span><i style="background:var(--warn)"></i>kandaki dopamin: geri seker</span>', lipo: '<span><i style="background:var(--c-clin)"></i>morfin (üst) · diamorfin (alt)</span>' }[yol]
        + (yol !== 'atla' ? `<span><i style="background:var(--accent)"></i>antibiyotik: ${inf ? 'aralıktan geçer' : 'geri seker'}</span>` : '');
      kare();
    };
    const kare = () => {
      const svg = kutu.querySelector('svg'); if (!svg || !L) return;
      const cs = svg.querySelectorAll('.f47-ps circle');
      const u0 = 0.03, { b1, b2 } = L;
      P.forEach((q, i) => {
        const c = cs[i]; if (!c) return;
        let tau = RM ? 1 : (((t / q.T) + q.off) % 1);
        let u, v = q.v0, op = 1, sinif = q.cls;
        if (q.fate === 'gec') {
          if (RM) tau = 0.92 - (i % 5) * 0.02;
          u = u0 + (q.uEnd - u0) * tau;
          if (q.vMid != null && u < b2) v = q.v0 + (q.vMid - q.v0) * clamp(u / b1, 0, 1);
          if (u > b2) { const k = ease((u - b2) / (q.uEnd - b2)); v = (q.vMid != null ? q.vMid : q.v0) + (q.v1 - (q.vMid != null ? q.vMid : q.v0)) * k; if (q.cls2) sinif = q.cls2; }
          if (q.kind === 'ab' && RM) { u = b2 + 0.03 + (i % 3) * 0.03; v = q.vMid; }
          op = RM ? 1 : Math.min(1, tau * 8, (1 - tau) * 8);
        } else {
          const ucU = b1 - (L.W === 640 ? 0.015 : 0.022);
          if (RM) { u = ucU - 0.01 - (i % 3) * 0.015; }
          else u = tau < 0.5 ? u0 + (ucU - u0) * ease(tau * 2) : ucU + (u0 - ucU) * ease((tau - 0.5) * 2);
          op = RM ? 1 : Math.min(1, tau * 8, (1 - tau) * 8);
          if (q.kind === 'ab' && RM) { v = 0.9 + ((i % 3) - 1) * 0.025; u = b1 - 0.03 - (i % 3) * 0.02; }
        }
        const [x, y] = L.P(u, v);
        c.setAttribute('cx', f(x)); c.setAttribute('cy', f(y)); c.style.opacity = op;
        if (c.getAttribute('class') !== sinif) c.setAttribute('class', sinif);
      });
      if (yol === 'atla' && L.kaynak) {
        for (let j = 0; j < 14; j++) {
          const c = cs[P.length + j]; if (!c) continue;
          const [sx, sy, tip] = L.kaynak[j % 2];
          const tau = RM ? 0.8 : (((t / 3) + j / 14) % 1);
          const a = (j * 137.5) * Math.PI / 180;
          const r = (tip === 'bos' ? 18 : 22) + tau * 46;
          c.setAttribute('cx', f(sx + Math.cos(a) * r)); c.setAttribute('cy', f(sy + Math.sin(a) * r * (tip === 'bos' ? 0.6 : 1) + (tip === 'bos' ? 22 : 0)));
          c.style.opacity = RM ? 1 : Math.min(1, tau * 6, (1 - tau) * 4);
        }
      }
    };
    const capG = () => capYaz(el, CAP[yol] + (inf ? ' ' + CAP.inf : ''));
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-yol]');
      if (b) { yol = b.dataset.yol; basSec(el, 'yol', yol); ciz(); capG(); return; }
      const i = e.target.closest('[data-a=inf]');
      if (i) { inf = !inf; i.setAttribute('aria-pressed', String(inf)); ciz(); capG(); }
    });
    const durD = darIzle(el, (d) => { dar = d; ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => { t += dt; kare(); });
    return () => { durT(); durD(); };
  };

  /* =====================================================================
     4 · f47_cvo — sirkumventriküler organlar, sağlam kan–BOS bariyeri (K1 s. 201)
     ===================================================================== */
  VIZ.f47_cvo = (el) => {
    const Y = [
      { k: 'ap', ad: 'Area postrema', p: [239, 252], gorev: 'Kemoreseptör tetik bölgesi: kanda zararlı madde olunca kusma merkezine afferent sinyal göndererek kusmayı tetikler.', tag: ['crit', 'kanı algılar'],
        cap: '<b>Area postrema.</b> Kemoreseptör tetik bölgesi: kanda zararlı madde olunca kusma merkezine afferent sinyal gönderip kusmayı tetikler. Bir yapıya dokunun ya da sızıntıyı oynatın. [[K1 s. 201]]' },
      { k: 'hip', ad: 'Hipotalamus', p: [181, 172], gorev: 'Hipotalamik osmoreseptörler sistemik kanın ozmolaritesini izler.', tag: ['crit', 'kanı algılar'], cap: '<b>Hipotalamus.</b> İçindeki osmoreseptörler sistemik kanın ozmolaritesini izler. [[K1 s. 201]]' },
      { k: 'hfz', ad: 'Hipofiz', p: [177, 226], gorev: 'Ön ve arka lob sekiz hormonu doğrudan sistemik dolaşıma salgılar.', ek: '8 hormon · 6 ön + 2 arka', tag: ['clin', 'hormon salgılar'], cap: '<b>Hipofiz.</b> Ön ve arka lob sekiz hormonu doğrudan sistemik dolaşıma verir: altısı ön, ikisi arka lobdan. [[K1 s. 201]]' },
      { k: 'pin', ad: 'Pineal bez', p: [222, 136], gorev: 'Melatonini doğrudan sistemik dolaşıma salgılar.', tag: ['clin', 'hormon salgılar'], cap: '<b>Pineal bez.</b> Melatonini doğrudan sistemik dolaşıma salgılar. [[K1 s. 201]]' },
      { k: 'kp', ad: 'Koroid pleksus', p: [192, 114], gorev: 'Sistemik kanın plazmasından BOS üretir.', tag: ['basic', 'BOS üretir'], cap: '<b>Koroid pleksus.</b> Sistemik kanın plazmasını kullanarak BOS üretir. [[K1 s. 201]]' },
    ];
    const BIT = "<b>Kan–BOS bariyeri sağlam.</b> Maddeler fenestralı kapillerden organa sızar, ama BOS'a geçip beyin nöronlarına ulaşamaz. [[K1 s. 201]]";
    const SURE = 3.2;
    let sec = 'ap', t = -1, oyn = false;
    el.innerHTML = `<div class="btn-row f47-bt" role="group" aria-label="Yapı">${Y.map((y) => `<button type="button" class="btn ghost" data-y="${y.k}" aria-pressed="${String(y.k === sec)}">${y.ad}</button>`).join('')}</div>
      <div class="f47-cvo-g">
        <div class="f47-cvo-beyin"><svg class="f47-svg" viewBox="0 0 380 322" role="img" aria-label="Beynin orta hat kesiti; üçüncü ve dördüncü ventrikül, beş sirkumventriküler yapı">
          ${tx(190, 16, 'Sirkumventriküler organlar: fenestralı kapillerler', 'f47-t', 'middle')}
          <path class="f47-beyin" d="M58 172C26 120 56 46 152 36C242 26 334 62 346 126C352 160 336 184 306 190C282 193 262 186 244 180L210 182C196 186 170 186 150 188C110 192 76 190 58 172Z"/>
          <path class="f47-beyincik" d="M246 196C262 182 312 180 334 202C348 222 336 252 306 258C282 262 258 252 250 238Z"/>
          <path class="f47-sap-b" d="M196 176C202 214 206 252 210 300L242 300C238 258 236 222 246 182Z"/>
          <path class="f47-kc" d="M116 112C150 80 238 76 276 112"/>
          <path class="f47-v3" d="M176 118C190 114 212 120 218 134L210 170C202 180 186 180 178 170Z"/>
          <path class="f47-akuadukt" d="M210 168C220 178 230 188 238 200"/>
          <path class="f47-v4" d="M236 198L260 222L238 250Z"/>
          <path class="f47-kp-s" d="M178 120q4 -6 8 0t8 0 8 0 8 0M246 210q3 -5 6 0t6 0"/>
          <path class="f47-hfz-sap" d="M181 178L178 198"/><ellipse class="f47-hfz-l" cx="171" cy="205" rx="8" ry="7"/><ellipse class="f47-hfz-l f47-hfz-a" cx="186" cy="205" rx="7" ry="6.5"/>
          ${tx(146, 212, 'ön', 'f47-ts', 'end')}${tx(196, 226, 'arka', 'f47-ts')}<line class="f47-lead" x1="148" y1="209" x2="163" y2="206"/>
          <path class="f47-pin-b" d="M216 128q8 -6 12 2q-4 8 -12 -2z"/>
          ${tx(196, 152, '3. v.', 'f47-ts f47-c-acc', 'middle')}${tx(272, 246, '4. v.', 'f47-ts f47-c-acc')}
          ${tx(250, 316, 'beyin sapı', 'f47-ts')}${tx(330, 278, 'beyincik', 'f47-ts', 'end')}
          ${Y.map((y) => `<g class="f47-nok" data-y="${y.k}" tabindex="0" role="button" aria-label="${y.ad}"><circle cx="${y.p[0]}" cy="${y.p[1]}" r="9"/></g>`).join('')}
          <line class="f47-lead" x1="232" y1="258" x2="200" y2="282"/>${tx(196, 288, 'Area postrema', 'f47-t', 'end')}${tx(196, 303, '4. ventrikül tabanı', 'f47-ts f47-c-acc', 'end')}
          <line class="f47-lead" x1="172" y1="174" x2="132" y2="228"/>${tx(128, 236, 'Hipotalamus', 'f47-t', 'end')}
          <line class="f47-lead" x1="170" y1="232" x2="152" y2="252"/>${tx(150, 262, 'Hipofiz', 'f47-t', 'end')}
          <line class="f47-lead" x1="228" y1="128" x2="250" y2="100"/>${tx(252, 98, 'Pineal bez', 'f47-t')}
          <line class="f47-lead" x1="184" y1="108" x2="160" y2="70"/>${tx(156, 66, 'Koroid pleksus', 'f47-t', 'end')}
        </svg></div>
        <div class="f47-cvo-yan"><div class="f47-kart f47-cvo-kart"></div>
          <div class="f47-siz-p"><div class="btn-row"><button type="button" class="btn f47-kucuk" data-a="siz">Sızıntıyı oynat</button></div>
          <svg class="f47-svg" viewBox="0 0 300 196" role="img" aria-label="Sızıntı paneli: fenestralı kapiller, organ dokusu, sağlam kan–BOS bariyeri, BOS ve nöronlar">
            <rect class="f47-kan" x="0" y="8" width="300" height="42" rx="6"/>
            <path class="f47-kap-d" d="M0 8H300M0 50H44M60 50H104M120 50H164M180 50H224M240 50H300"/>
            ${tx(8, 26, 'fenestralı kapiller (kan)', 'f47-ts f47-c-crit')}
            <rect class="f47-doku" x="0" y="56" width="300" height="66"/>
            <text class="f47-t f47-c-clin f47-doku-ad" x="292" y="76" text-anchor="end"></text>
            <line class="f47-bar" x1="0" y1="126" x2="300" y2="126"/>
            ${tx(8, 141, 'kan–BOS bariyeri (sağlam)', 'f47-ts f47-c-ok')}
            <rect class="f47-ecf-b" x="0" y="148" width="300" height="46" rx="6"/>
            ${tx(8, 176, 'BOS → nöronlar', 'f47-t f47-c-ok')}
            <g class="f47-noron" transform="translate(262 170)"><path d="M-9 0L-22 -9M-9 2L-20 12M9 0L22 -6M7 6L16 16M0 -9L-3 -18"/><circle r="8"/></g>
            <g class="f47-sizp"></g>
          </svg></div></div></div>`;
    const kart = el.querySelector('.f47-cvo-kart'), gr = el.querySelector('.f47-cvo-g'), sp = el.querySelector('.f47-sizp'), dokuAd = el.querySelector('.f47-doku-ad');
    const N = 8;
    const D = Array.from({ length: N }, (_, i) => ({ x0: 14 + i * 24, fx: [52, 112, 172, 232][i % 4], s: i * 0.16, son: [30 + i * 33, 112 - (i % 3) * 8] }));
    sp.innerHTML = D.map(() => '<circle r="5"/>').join('');
    const cs = [...sp.querySelectorAll('circle')];
    const kare = () => {
      cs.forEach((c, i) => {
        const d = D[i];
        let x, y;
        const tt = RM && t >= 0 ? 99 : t;
        if (tt < 0) { x = d.x0; y = 40; }
        else {
          const k = clamp((tt - d.s) / (SURE - 0.8), 0, 1);
          if (k < 0.3) { const q = ease(k / 0.3); x = d.x0 + (d.fx - d.x0) * q; y = 40 + 4 * q; }
          else if (k < 0.55) { const q = ease((k - 0.3) / 0.25); x = d.fx; y = 44 + 26 * q; }
          else if (k < 0.85) { const q = ease((k - 0.55) / 0.3); x = d.fx + (d.son[0] - d.fx) * q; y = 70 + (d.son[1] + 6 - 70) * q; }
          else { const q = (k - 0.85) / 0.15; x = d.son[0]; y = d.son[1] + 6 - Math.sin(q * Math.PI) * 5 - 6 * q; }
        }
        c.setAttribute('cx', f(x)); c.setAttribute('cy', f(y));
      });
    };
    const goster = (k) => {
      sec = k; const y = Y.find((z) => z.k === k);
      basSec(el, 'y', k);
      el.querySelectorAll('.f47-nok').forEach((n) => n.classList.toggle('f47-on', n.dataset.y === k));
      kart.innerHTML = `<p class="f47-kart-bas">${y.ad} <span class="tag ${y.tag[0]}">${y.tag[1]}</span></p><p>${y.gorev}</p>${y.ek ? `<p><b>${y.ek}</b></p>` : ''}`;
      dokuAd.textContent = y.ad;
      t = -1; oyn = false; kare();
      capYaz(el, y.cap);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-y]');
      if (b) { goster(b.dataset.y); return; }
      if (e.target.closest('[data-a=siz]')) { t = RM ? 99 : 0; oyn = !RM; kare(); if (RM) capYaz(el, BIT); }
    });
    dokun(el.querySelector('.f47-cvo-beyin svg'), '.f47-nok', (n) => goster(n.dataset.y));
    const durD = darIzle(el, (d) => gr.classList.toggle('f47-dar', d));
    goster(sec);
    const durT = RM ? () => {} : ticker(el, (dt) => { if (!oyn) return; t += dt; kare(); if (t >= SURE) { oyn = false; capYaz(el, BIT); } });
    return () => { durT(); durD(); };
  };
})();
