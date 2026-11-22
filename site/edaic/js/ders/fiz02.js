/* Fizyoloji Bölüm 2 · Hücrenin bileşenleri ve işlevi · bileşenler (K1 s. 6–8).
   f02_hucre: hücre haritası · f02_zar: zardan geçiş · f02_mito: mitokondri bölmeleri ve ATP üretimi
   f02_salgi: salgılanan bir proteinin yolculuğu · f02_tip: hücre tiplerinin organel donanımı.
   f02_cekirdek: çekirdeğin yapısı ve hücre başına çekirdek sayısı · f02_lizozom: bir lizozom ve üç işi.
   Çizimler şematiktir; modellerdeki sayılar göreli birimlerdedir ve bileşen altlarında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const r1 = (v) => Math.round(v * 10) / 10;
  const rad = (d) => (d * Math.PI) / 180;

  /* W = [[x, y, t], ...]: t anındaki konum (bölümler arası yumuşatılmış) */
  const yol = (W, t) => {
    if (t <= W[0][2]) return [W[0][0], W[0][1]];
    for (let i = 1; i < W.length; i++) {
      if (t <= W[i][2]) {
        const a = W[i - 1], b = W[i], f = ease((t - a[2]) / Math.max(1e-6, b[2] - a[2]));
        return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)];
      }
    }
    const z = W[W.length - 1];
    return [z[0], z[1]];
  };
  /* SVG etiketi: metnin arkasına kutu, görünür alanın içinde kalacak biçimde */
  const etiket = (g, txt, x, y, W) => {
    const t = g.querySelector('text'), r = g.querySelector('rect');
    t.textContent = txt; t.setAttribute('x', x); t.setAttribute('y', y);
    try {
      let b = t.getBBox();
      if (b.x < 4) { t.setAttribute('x', x + (4 - b.x)); b = t.getBBox(); }
      if (b.x + b.width > W - 4) { t.setAttribute('x', +t.getAttribute('x') - (b.x + b.width - W + 4)); b = t.getBBox(); }
      r.setAttribute('x', b.x - 5); r.setAttribute('y', b.y - 2); r.setAttribute('width', b.width + 10); r.setAttribute('height', b.height + 4);
    } catch (e) { /* görünmezken ölçülemez */ }
  };

  const RENK = { zar: 'var(--accent)', cek: 'var(--c-basic)', mito: 'var(--crit)', ger: 'var(--c-clin)', der: 'var(--ok)', golgi: 'var(--warn)', lizo: 'var(--f02-lizo)', sito: 'var(--muted)', rib: 'var(--ink)' };

  /* ---------- 1. Hücre haritası ---------- */
  VIZ.f02_hucre = (el) => {
    const P = {
      zar: ['Hücre yüzey zarı', RENK.zar, 'Hücre içini hücre dışı sıvıdan (ECF) ayıran ince engel: içine glikoproteinlerin yerleştiği bir fosfolipit çift tabaka. ECF ile hücre içi sıvı (ICF) arasındaki madde geçişine aracılık eder ve onu düzenler. [[K1 s. 6]]', 220, 14],
      cekirdek: ['Çekirdek', RENK.cek, 'Genetik materyalin (DNA) bulunduğu kontrol merkezi. DNA\'dan transkripsiyonla mRNA burada sentezlenir; çekirdek organellerin işlevini gen ve dolayısıyla protein ekspresyonuyla düzenler. Bileşenleri: çekirdek zarfı, nükleoplazma ve çekirdekçik. [[K1 s. 6–7]]', 270, 97],
      sitoplazma: ['Sitoplazma', RENK.sito, 'Hücre içinin çekirdek dışında kalan bölümü. Üç bileşeni vardır: sitozol, hücre iskeleti ve organeller. [[K1 s. 7]]', 150, 312],
      zarf: ['Çekirdek zarfı ve porlar', RENK.cek, 'Çekirdeği sitoplazmadan ayıran çift katlı zar. Üzerindeki çekirdek porları, hücre yüzey zarında olduğu gibi, seçilmiş moleküllerin kontrollü geçişine izin verir. [[K1 s. 7]]', 270, 97],
      nukleoplazma: ['Nükleoplazma', RENK.cek, 'DNA\'yı saran jel kıvamında madde; sitoplazmanın çekirdekteki karşılığı. [[K1 s. 7]]', 262, 206],
      nukleol: ['Çekirdekçik (nükleol)', RENK.cek, 'Çekirdeğin yoğun boyanan, RNA sentezlenen bölgesi. Çok protein sentezleyen hücrelerde daha bol bulunur. [[K1 s. 7]]', 284, 132],
      sitozol: ['Sitozol', RENK.sito, 'Sitoplazmanın jel kıvamındaki maddesi; sitoplazmanın öteki iki bileşeni hücre iskeleti ve organellerdir. [[K1 s. 7]]', 205, 312],
      iskelet: ['Hücre iskeleti', RENK.sito, 'Hücreye biçim ve destek veren protein çatısı (şemada noktalı çizgiler). [[K1 s. 7]]', 250, 58],
      mito: ['Mitokondri', RENK.mito, 'Aerobik metabolizmayla ATP üretir. İki zarı vardır, az miktarda kendi DNA\'sını taşır ve yalnızca anneden gelir. Metabolik olarak çok etkin hücrelerde daha büyük ve daha çok sayıdadır. [[K1 s. 7–8]]', 150, 64],
      ger: ['Granüllü (pürüzlü) ER', RENK.ger, 'Protein sentezinin yeri; granüllü görünümünü yüzeyindeki ribozomlar verir. Çok protein üreten hücrelerde (endokrin hücreler, plazma hücreleri) belirgindir. Düz ER ile bağlantılıdır. [[K1 s. 8]]', 160, 124],
      ribozom: ['Ribozom', RENK.rib, 'Amino asitlerin sırayla birleştirilerek yeni proteinin kurulduğu yer; granüllü ER\'nin yüzeyinde dizilidir. [[K1 s. 8]]', 226, 66],
      der: ['Düz ER', RENK.der, 'Ribozomu yoktur; steroit ve lipit sentezinin yeridir. Adrenal korteks hücrelerinde boldur; kas hücrelerinde sarkoplazmik retikulum adını alır ve Ca²⁺ depolar. [[K1 s. 8]]', 350, 214],
      golgi: ['Golgi aygıtı', RENK.golgi, 'Hücrenin "postanesi": ER\'den aldığı proteinleri glikozilasyon ve fosforilasyonla değiştirir, varış yerine göre ayırır ve etiketli veziküllere paketler. [[K1 s. 8]]', 104, 134],
      vez: ['Salgı vezikülleri', RENK.golgi, 'Golgi\'de paketlenen proteinleri hücrenin başka bölümlerine ya da hücre zarına taşır. Vezikülün zarla birleşip içeriğini dışarı vermesine ekzositoz denir. [[K1 s. 8]]', 84, 272],
      lizo: ['Lizozom', RENK.lizo, 'Sindirim enzimleri, asit ve serbest radikal türleri içerir: eski ya da bozuk proteinleri parçalar, apoptozda rol oynar, fagosite edilen mikroorganizmaları yok eder. [[K1 s. 8]]', 100, 100],
    };
    const GRUP = { cekirdek: ['zarf', 'nukleoplazma', 'nukleol'], sitoplazma: ['sitozol', 'iskelet', 'mito', 'ger', 'ribozom', 'der', 'golgi', 'vez', 'lizo'], ger: ['ger', 'ribozom'] };
    const TUR = ['zar', 'cekirdek', 'sitoplazma', 'zarf', 'nukleoplazma', 'nukleol', 'sitozol', 'iskelet', 'mito', 'ger', 'ribozom', 'der', 'golgi', 'vez', 'lizo'];
    const NX = 270, NY = 165;
    const yay = (cx, cy, r, a0, a1) => `M${r1(cx + r * Math.cos(rad(a0)))} ${r1(cy + r * Math.sin(rad(a0)))} A${r} ${r} 0 0 1 ${r1(cx + r * Math.cos(rad(a1)))} ${r1(cy + r * Math.sin(rad(a1)))}`;
    const MITO = [[150, 85, -12], [340, 269, 18], [175, 269, 8], [378, 119, 62]];
    const mitoSvg = MITO.map(([x, y, a]) => `<g transform="translate(${x},${y}) rotate(${a})"><ellipse rx="30" ry="13" class="f02-mz"/><path class="f02-mk" d="M-22 0 l5 -7 l5 13 l5 -13 l5 13 l5 -13 l5 13 l5 -13 l4 6"/></g>`).join('');
    const ribs = [72, 84, 96].map((r) => { let s = ''; for (let a = 113; a <= 247; a += 9) s += `<circle cx="${r1(NX + (r + 4) * Math.cos(rad(a)))}" cy="${r1(NY + (r + 4) * Math.sin(rad(a)))}" r="2.1"/>`; return s; }).join('');
    const porlar = [20, 75, 140, 205, 265, 320].map((a) => `<line x1="${r1(NX + 51 * Math.cos(rad(a)))}" y1="${r1(NY + 51 * Math.sin(rad(a)))}" x2="${r1(NX + 63 * Math.cos(rad(a)))}" y2="${r1(NY + 63 * Math.sin(rad(a)))}"/>`).join('');
    el.innerHTML = `<div class="viz-head"><span class="small muted">Bir yapıya ya da adına basın</span><button type="button" class="btn ghost" data-a="tur">Turu duraklat</button></div>
      <div class="f02-hucre">
        <svg class="f02-hsvg" viewBox="0 0 440 334" role="img" aria-label="Şematik hücre: hücre zarı, çekirdek ve organellerle dolu sitoplazma">
          <g class="f02-p" data-p="zar"><ellipse cx="220" cy="172" rx="210" ry="150" class="f02-zar-d"/></g>
          <g class="f02-p" data-p="sitozol"><ellipse cx="220" cy="172" rx="203" ry="143" class="f02-sito"/></g>
          <g class="f02-p" data-p="zar"><ellipse cx="220" cy="172" rx="206.5" ry="146.5" class="f02-hit-s"/></g>
          <g class="f02-p" data-p="iskelet"><path class="f02-isk" d="M42 127 Q132 47 232 39 M62 257 Q172 322 292 307 M397 102 Q427 172 397 247 M48 210 Q110 170 120 120"/></g>
          <g class="f02-p" data-p="ger"><path class="f02-ger" d="${[72, 84, 96].map((r) => yay(NX, NY, r, 112, 248)).join(' ')}"/></g>
          <g class="f02-p" data-p="ribozom"><g class="f02-rib">${ribs}</g></g>
          <g class="f02-p" data-p="nukleoplazma"><circle cx="${NX}" cy="${NY}" r="57" class="f02-np"/><path class="f02-krom" d="M240 150 q10 -12 20 0 t20 0 M246 186 q8 8 18 0 t18 0 M290 176 q8 -10 16 0"/></g>
          <g class="f02-p" data-p="zarf"><circle cx="${NX}" cy="${NY}" r="60" class="f02-zarf"/><circle cx="${NX}" cy="${NY}" r="54" class="f02-zarf"/><g class="f02-por">${porlar}</g></g>
          <g class="f02-p" data-p="nukleol"><circle cx="284" cy="153" r="15" class="f02-nl"/></g>
          <g class="f02-p" data-p="der"><path class="f02-der" d="M305 229 c10 -14 22 -14 30 0 s20 14 30 0 s18 -12 28 -2 M316 247 c10 -10 20 -10 28 0 s18 10 28 0"/></g>
          <g class="f02-p" data-p="golgi"><path class="f02-golgi" d="${[40, 48, 56, 64].map((r) => yay(46, 182, r, -35, 35)).join(' ')}"/></g>
          <g class="f02-p" data-p="vez"><circle cx="62" cy="157" r="6"/><circle cx="58" cy="207" r="6"/><circle cx="75" cy="239" r="5"/><circle cx="26" cy="180" r="7"/></g>
          <g class="f02-p" data-p="mito">${mitoSvg}</g>
          <g class="f02-p" data-p="lizo">${[[100, 119, 10], [402, 197, 9], [250, 297, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" class="f02-lz"/><circle cx="${x - 3}" cy="${y - 2}" r="1.6" class="f02-lzi"/><circle cx="${x + 3}" cy="${y + 2}" r="1.6" class="f02-lzi"/>`).join('')}</g>
          <g class="f02-lbl" aria-hidden="true"><rect rx="6"/><text text-anchor="middle"></text></g>
        </svg>
        <div class="f02-hpanel">
          <div class="f02-hg"><button type="button" class="f02-gb" data-s="zar" style="--k:${RENK.zar}">Hücre yüzey zarı</button></div>
          <div class="f02-hg"><button type="button" class="f02-gb" data-s="cekirdek" style="--k:${RENK.cek}">Çekirdek</button><div class="f02-chips">${GRUP.cekirdek.map((k) => `<button type="button" class="f02-chip" data-s="${k}" style="--k:${P[k][1]}">${P[k][0].replace(' (nükleol)', '')}</button>`).join('')}</div></div>
          <div class="f02-hg"><button type="button" class="f02-gb" data-s="sitoplazma" style="--k:${RENK.sito}">Sitoplazma</button><div class="f02-chips">${GRUP.sitoplazma.map((k) => `<button type="button" class="f02-chip" data-s="${k}" style="--k:${P[k][1]}">${P[k][0].replace(' (pürüzlü)', '')}</button>`).join('')}</div></div>
          <div class="f02-detay" aria-live="polite"></div>
        </div>
      </div>
      <p class="viz-foot">${REF('Şematik çizim (ölçekli değildir); yapılar ve işlevleri kitaptaki listeye göredir. [[K1 s. 6–8]]')}</p>`;
    const parts = [...el.querySelectorAll('.f02-p')], btns = [...el.querySelectorAll('[data-s]')], det = el.querySelector('.f02-detay'), lbl = el.querySelector('.f02-lbl'), turB = el.querySelector('[data-a="tur"]');
    let tur = !RM, tt = 0, ti = 0, secili = '';
    const sec = (id) => {
      secili = id;
      const set = GRUP[id] || [id];
      parts.forEach((g) => { const on = set.includes(g.dataset.p); g.classList.toggle('on', on); g.classList.toggle('dim', !on); });
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.s === id)));
      const p = P[id];
      det.innerHTML = `<h3 style="--k:${p[1]}">${p[0]}</h3><p>${REF(p[2])}</p>`;
      etiket(lbl, p[0], p[3], p[4], 440);
    };
    const turYaz = () => { turB.textContent = tur ? 'Turu duraklat' : 'Turu başlat'; };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      if (e.target.closest('[data-a="tur"]')) { tur = !tur; tt = 0; if (tur) { ti = (TUR.indexOf(secili) + 1) % TUR.length; sec(TUR[ti]); } turYaz(); return; }
      const b = e.target.closest('[data-s]') || e.target.closest('.f02-p');
      if (!b) return;
      tur = false; turYaz();
      sec(b.dataset.s || b.dataset.p);
    });
    turYaz();
    sec('zar');
    return ticker(el, (dt) => {
      if (!tur) return;
      tt += dt;
      if (tt > 3.6) { tt = 0; ti = (ti + 1) % TUR.length; sec(TUR[ti]); }
    });
  };

  /* ---------- 2. Hücre zarından geçiş ---------- */
  VIZ.f02_zar = (el) => {
    const M = {
      o2: { b: 'O₂', ad: 'O₂', yol: 'lipit', yon: 1, renk: 'var(--c-basic)', n: 6,
        cap: '<b>O₂: lipit tabakadan geçer.</b> Küçük, gaz hâlindeki ve lipofilik maddeler hidrofobik çekirdekte takılmaz; zarı düzenlenmeden, basit difüzyonla geçer. Yönü kısmi basınç gradyanı belirler: O₂ hücre dışından içeri girer. [[K1 s. 6]] [[K1 s. 14]]' },
      co2: { b: 'CO₂', ad: 'CO₂', yol: 'lipit', yon: -1, renk: 'var(--muted)', n: 6,
        cap: '<b>CO₂: aynı yol, ters yön.</b> CO₂ de lipit tabakadan basit difüzyonla geçer. Hücrede üretildiği için gradyanı içeriden dışarıya doğrudur. [[K1 s. 2]] [[K1 s. 6]] [[K1 s. 14]]' },
      st: { b: 'Steroit hormon', ad: 'St', yol: 'lipit', yon: 1, renk: 'var(--crit)', n: 5,
        cap: '<b>Steroit hormon: lipofilik.</b> Hidrofobik çekirdek lipofilik maddeleri durdurmaz; steroit hormonlar zarı basit difüzyonla geçer. [[K1 s. 6]] [[K1 s. 14]]' },
      na: { b: 'Na⁺', ad: 'Na⁺', yol: 'kanal', yon: 1, renk: 'var(--warn)', n: 6,
        cap: '<b>Na⁺: yüklü, hidrofilik.</b> Lipit kuyrukların oluşturduğu hidrofobik engel yüklü iyonu geçirmez (halka: çarpıp geri dönüş). Na⁺ zarı bir zar proteini aracılığıyla geçer; burada glikoproteinin oluşturduğu, Na⁺\'ya özgü bir iyon kanalından geçiyor. Na⁺ ayrıca taşıyıcılar ve pompalarla da taşınır (Bölüm 4). [[K1 s. 6]] [[K1 s. 14–16]]' },
      glk: { b: 'Glukoz', ad: 'Glk', yol: 'tasiyici', yon: 1, renk: 'var(--ok)', n: 4, alti: true,
        cap: '<b>Glukoz: büyük, hidrofilik.</b> Lipit tabakadan geçemez. Taşıyıcı protein (GLUT) glukozu bağlar, biçim değiştirerek zarın öbür yüzüne taşır ve bırakır: kolaylaştırılmış difüzyon. Hızı zardaki taşıyıcı sayısıyla sınırlıdır; bir taşıyıcı molekülleri sırayla geçirir. [[K1 s. 6]] [[K1 s. 15]]' },
    };
    const YOL = { lipit: ['lipit çift tabaka · basit difüzyon', 'düzenlenmez; gradyan yönünde'], kanal: ['iyon kanalı (glikoprotein)', 'kanaldan; belirli iyonlara özgü'], tasiyici: ['taşıyıcı (glikoprotein) · kolaylaştırılmış difüzyon', 'taşıyıcı sayısıyla sınırlı'] };
    const XS = [158, 184, 208, 304, 404, 424], CHX = 254, CAX = 356;
    let kuyruk = '', bas = '';
    for (let x = 9; x <= 432; x += 13) {
      if ((x > 216 && x < 292) || (x > 322 && x < 392)) continue;
      kuyruk += `M${x - 2} 121V148M${x + 2} 121V148M${x - 2} 152V179M${x + 2} 152V179`;
      bas += `<circle cx="${x}" cy="116" r="5.5"/><circle cx="${x}" cy="184" r="5.5"/>`;
    }
    const seker = (x, y) => `<path d="M${x} ${y}v-7l-6 -6M${x} ${y - 7}l6 -6"/><circle cx="${x - 6}" cy="${y - 14}" r="2.6"/><circle cx="${x + 6}" cy="${y - 14}" r="2.6"/><circle cx="${x}" cy="${y - 7}" r="2.4"/>`;
    const hex = '<polygon points="11,0 5.5,9.5 -5.5,9.5 -11,0 -5.5,-9.5 5.5,-9.5"/>';
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Molekül">${Object.entries(M).map(([k, m]) => `<button type="button" data-m="${k}" aria-pressed="false">${m.b}</button>`).join('')}</div><button type="button" class="btn ghost" data-a="yine">Yeniden gönder</button></div>
      <svg class="f02-zsvg" viewBox="0 0 440 300" role="img" aria-label="Fosfolipit çift tabaka, iyon kanalı ve taşıyıcı protein: seçilen molekülün zarı nasıl geçtiği">
        <rect x="0" y="0" width="440" height="110" class="f02-ecf"/><rect x="0" y="190" width="440" height="110" class="f02-icf"/>
        <text x="10" y="20" class="f02-zb">Hücre dışı sıvı (ECF)</text><text x="10" y="290" class="f02-zb">Hücre içi sıvı (ICF)</text>
        <path class="f02-kuy" d="${kuyruk}"/><g class="f02-bas">${bas}</g>
        <g class="f02-yazi"><g><rect rx="4"/><text x="10" y="105">hidrofilik baş</text></g><g><rect rx="4"/><text x="10" y="155">hidrofobik kuyruk</text></g></g>
        <g class="f02-kan" data-y="kanal"><rect x="224" y="104" width="20" height="92" rx="8"/><rect x="264" y="104" width="20" height="92" rx="8"/><g class="f02-sk">${seker(234, 104)}${seker(274, 104)}</g><line x1="${CHX}" x2="${CHX}" y1="42" y2="84" class="f02-zcz"/><text x="${CHX}" y="36" text-anchor="middle" class="f02-zl">kanal</text></g>
        <g class="f02-tas" data-y="tasiyici"><rect class="f02-lob" x="-10" y="-44" width="20" height="88" rx="9"/><rect class="f02-lob" x="-10" y="-44" width="20" height="88" rx="9"/><g class="f02-sk">${seker(337, 106)}${seker(375, 106)}</g><line x1="${CAX}" x2="${CAX}" y1="42" y2="84" class="f02-zcz"/><text x="${CAX}" y="36" text-anchor="middle" class="f02-zl">taşıyıcı</text></g>
        <g class="f02-mols"></g>
      </svg>
      <div class="f02-oku"><span>Yol: <b class="o-yol"></b></span><span>Düzenleme: <b class="o-duz"></b></span><span>Geçen: <b class="o-n"></b></span></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim; hızlar ve sayılar temsilîdir. Zarın yapısı ve geçiş ilkesi Bölüm 2, örnekler ve kanal/taşıyıcı ayrıntısı Bölüm 4\'ten. [[K1 s. 6]] [[K1 s. 14–15]]')}</p>`;
    const molG = el.querySelector('.f02-mols'), cap = el.querySelector('.viz-cap'), lobs = [...el.querySelectorAll('.f02-lob')];
    const kan = el.querySelector('.f02-kan'), tas = el.querySelector('.f02-tas'), oYol = el.querySelector('.o-yol'), oDuz = el.querySelector('.o-duz'), oN = el.querySelector('.o-n');
    el.querySelectorAll('.f02-yazi > g').forEach((g) => { const t = g.querySelector('text'), r = g.querySelector('rect'); try { const b = t.getBBox(); r.setAttribute('x', b.x - 4); r.setAttribute('y', b.y - 1); r.setAttribute('width', b.width + 8); r.setAttribute('height', b.height + 2); } catch (e) { /* ölçülemez */ } });
    let cur = 'o2', t = 0, plans = [], tasB = [], bitis = 0, mols = [], hits = [];
    const sTas = (tm) => {
      for (const b of tasB) {
        if (tm >= b + 0.5 && tm < b + 1.3) return ease((tm - b - 0.5) / 0.8);
        if (tm >= b + 1.3 && tm < b + 1.8) return 1;
        if (tm >= b + 1.8 && tm < b + 2.4) return 1 - ease((tm - b - 1.8) / 0.6);
      }
      return 0;
    };
    const draw = () => {
      let gecen = 0;
      plans.forEach((p, i) => {
        const [x, y] = yol(p.W, t);
        mols[i].setAttribute('transform', `translate(${r1(x)},${r1(y)})`);
        if (t >= p.W[p.W.length - 1][2]) gecen++;
        const h = hits[i];
        if (p.hit && t >= p.hit[2] && t < p.hit[2] + 0.7) { const f = (t - p.hit[2]) / 0.7; h.setAttribute('cx', p.hit[0]); h.setAttribute('cy', p.hit[1]); h.setAttribute('r', r1(6 + f * 14)); h.setAttribute('opacity', r1(1 - f)); } else h.setAttribute('opacity', 0);
      });
      const a = 14 * (1 - 2 * sTas(t));
      lobs[0].setAttribute('transform', `translate(343,150) rotate(${r1(-a)})`);
      lobs[1].setAttribute('transform', `translate(369,150) rotate(${r1(a)})`);
      oN.textContent = gecen + '/' + plans.length;
    };
    const gonder = (k) => {
      cur = k; t = 0;
      const m = M[k];
      el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === k)));
      const K = el.getBoundingClientRect().width < 520 ? 1.4 : 1;
      molG.innerHTML = Array.from({ length: m.n }, () => `<circle class="f02-hit" r="0" opacity="0"/><g class="f02-mol" style="--k:${m.renk}"><g transform="scale(${K})">${m.alti ? hex : '<circle r="11"/>'}<text y="3.6" text-anchor="middle">${m.ad}</text></g></g>`).join('');
      mols = [...molG.querySelectorAll('.f02-mol')]; hits = [...molG.querySelectorAll('.f02-hit')];
      plans = []; tasB = [];
      let F = 0;
      for (let i = 0; i < m.n; i++) {
        const x0 = XS[i], ya = 40 + (i % 3) * 18, yb = 236 + (i % 3) * 16;
        if (m.yol === 'lipit') {
          const d = i * 0.45;
          plans.push({ W: m.yon > 0 ? [[x0, ya, d], [x0 + 3, 104, d + 0.9], [x0 + 6, 196, d + 2.3], [x0 + 8, yb, d + 3.2]] : [[x0, yb, d], [x0 - 3, 196, d + 0.9], [x0 - 6, 104, d + 2.3], [x0 - 8, ya, d + 3.2]], hit: null });
        } else if (m.yol === 'kanal') {
          const d = i * 0.6;
          plans.push({ W: [[x0, ya, d], [x0, 98, d + 0.8], [lerp(x0, CHX, 0.2), 76, d + 1.25], [CHX, 88, d + 2.2], [CHX, 214, d + 3.0], [CHX + (i - 2.5) * 26, yb, d + 3.8]], hit: [x0, 106, d + 0.8] });
        } else {
          const d = i * 0.7, wx = 300 + i * 34, a = d + 2.2, b = Math.max(a + 0.4, F);
          plans.push({ W: [[x0, ya, d], [x0, 98, d + 0.8], [x0, 76, d + 1.2], [wx, 70, a], [wx, 70, b - 0.4], [CAX, 98, b], [CAX, 150, b + 0.5], [CAX, 150, b + 1.3], [CAX, 208, b + 1.8], [CAX + (i - 1.5) * 26, yb, b + 2.6]], hit: [x0, 106, d + 0.8] });
          tasB.push(b); F = b + 2.4;
        }
      }
      bitis = Math.max(...plans.map((p) => p.W[p.W.length - 1][2]));
      kan.classList.toggle('on', m.yol === 'kanal'); tas.classList.toggle('on', m.yol === 'tasiyici');
      oYol.textContent = YOL[m.yol][0]; oDuz.textContent = YOL[m.yol][1];
      cap.innerHTML = REF(m.cap);
      if (RM) t = bitis + 1;
      draw();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m]'); if (b) { gonder(b.dataset.m); return; }
      if (e.target.closest('[data-a="yine"]')) gonder(cur);
    });
    gonder('o2');
    return ticker(el, (dt) => { if (t > bitis + 0.8) return; t += dt; draw(); });
  };

  /* ---------- 3. Mitokondri: bölmeler ve ATP üretimi ---------- */
  VIZ.f02_mito = (el) => {
    const CX = 220, CY = 140, ORX = 200, ORY = 110, IRX = 176, IRY = 88, DEP = 44, HW = 7;
    const TOP = [100, 160, 220, 280, 340], BOT = [130, 190, 250, 310];
    const yT = (x) => CY - IRY * Math.sqrt(Math.max(0, 1 - ((x - CX) / IRX) ** 2));
    const yB = (x) => CY + IRY * Math.sqrt(Math.max(0, 1 - ((x - CX) / IRX) ** 2));
    const xs = []; for (let x = CX - IRX; x <= CX + IRX + 0.01; x += 3) xs.push(x);
    let ic = `M${CX - IRX} ${CY}`, k = 0;
    for (const x of xs) {
      while (k < TOP.length && x >= TOP[k] - HW) { const f = TOP[k], yy = r1(yT(f) + DEP - HW); ic += ` L${f - HW} ${r1(yT(f - HW))} L${f - HW} ${yy} A${HW} ${HW} 0 0 0 ${f + HW} ${yy} L${f + HW} ${r1(yT(f + HW))}`; k++; }
      if (!TOP.some((f) => x > f - HW && x < f + HW)) ic += ` L${r1(x)} ${r1(yT(x))}`;
    }
    k = BOT.length - 1;
    for (const x of xs.slice().reverse()) {
      while (k >= 0 && x <= BOT[k] + HW) { const f = BOT[k], yy = r1(yB(f) - DEP + HW); ic += ` L${f + HW} ${r1(yB(f + HW))} L${f + HW} ${yy} A${HW} ${HW} 0 0 0 ${f - HW} ${yy} L${f - HW} ${r1(yB(f - HW))}`; k--; }
      if (!BOT.some((f) => x > f - HW && x < f + HW)) ic += ` L${r1(x)} ${r1(yB(x))}`;
    }
    ic += ' Z';
    const porin = [215, 270, 325, 145, 35, 90].map((a) => {
      const px = CX + ORX * Math.cos(rad(a)), py = CY + ORY * Math.sin(rad(a));
      const fi = (Math.atan2(Math.sin(rad(a)) / ORY, Math.cos(rad(a)) / ORX) * 180) / Math.PI;
      return `<rect x="-4.5" y="-7.5" width="9" height="15" rx="2.5" transform="translate(${r1(px)},${r1(py)}) rotate(${r1(fi - 90)})"/>`;
    }).join('');
    const enzim = [[80, 138], [118, 124], [140, 156], [186, 118], [238, 156], [262, 124], [298, 150], [326, 130], [356, 146], [104, 158], [204, 160]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`).join('');
    const BOLME = {
      dis: ['Dış zar', '<b>Dış zar.</b> Mitokondriyi sitoplazmadan ayıran fosfolipit çift tabaka. Porin denen transmembran proteinlerin ortasındaki pordan 5 kDa\'dan küçük çözünmüş maddeler serbestçe difüze olur. Aşağıdan bir molekül seçip deneyin. [[K1 s. 7]]', 220, 18],
      ara: ['Zarlar arası boşluk', '<b>Zarlar arası boşluk.</b> İki zarın arasındaki bölme. Aerobik metabolizmada elektron taşıma zincirinin (ETZ) protein kompleksleri H⁺\'yı buraya pompalar; oluşan elektrokimyasal gradyan ATP sentezinde kullanılır. "ATP üretimi" görünümünde izleyin. [[K1 s. 7]]', 92, 18],
      ic: ['İç zar', '<b>İç zar.</b> Elektron taşıma zincirinin yeri: zara bağlı proteinler redoks tepkimelerine girer ve sonuçta ATP sentezlenir. Matrikse doğru yaptığı kıvrımlara krista denir (Atlas notu). [[K1 s. 7]]', 350, 272],
      mat: ['Matriks', '<b>Matriks (iç mitokondri matriksi).</b> İç zarla çevrili, çok sayıda enzim içeren alan. Sitrik asit döngüsü, yağ asidi metabolizması ve üre döngüsü burada yürür. [[K1 s. 7]] Atlas notu: yağ asitlerinden burada yürüyen β-oksidasyondur; üre döngüsünün yalnız ilk iki adımı matrikstedir.', 236, 272],
      dna: ['Mitokondriyal DNA', '<b>Mitokondriyal DNA.</b> Mitokondri az miktarda kendi DNA\'sını taşır; bu, evrimde bağımsız bir mikroorganizma olmuş olabileceğini düşündürür. Sitoplazma ve dolayısıyla mitokondriler yalnızca anneden gelir; mitokondriyal hastalıkların anneden kalıtılması buna dayanır. [[K1 s. 7–8]]', 96, 272],
    };
    const UC = { dis: [220, 30], ara: [126, 54], ic: [350, 199], mat: [236, 150], dna: [165, 140] };
    const MOL = {
      pir: ['Pirüvat', '<b>Pirüvat: geçer.</b> 5 kDa\'dan küçük olduğu için porinden zarlar arası boşluğa serbestçe difüze olur. [[K1 s. 7]]'],
      aa: ['Amino asit', '<b>Amino asit: geçer.</b> Küçük çözünmüş maddeler porinden serbestçe geçer. [[K1 s. 7]]'],
      kz: ['Kısa zincirli yağ asidi', '<b>Kısa zincirli yağ asidi: geçer.</b> Porinden serbestçe difüze olur. [[K1 s. 7]]'],
      uz: ['Uzun zincirli yağ asidi', '<b>Uzun zincirli yağ asidi: porinden serbestçe geçmez.</b> Mitokondriye karnitin mekiğiyle girer (Bölüm 77) ve matrikste yağ asidi metabolizmasına katılır. [[K1 s. 7]] Atlas notu: mekiğin asıl aştığı engel iç zardır (bölüm metnindeki nota bakın).'],
    };
    const DUR = {
      normal: '<b>Normal.</b> Elektronlar iç zardaki komplekslerden geçerken (redoks tepkimeleri) H⁺ matriksten zarlar arası boşluğa pompalanır. Biriken H⁺ elektrokimyasal bir gradyan oluşturur; bu gradyan ATP sentezinde kullanılır. [[K1 s. 7]]',
      hipoksi: '<b>O₂ yok.</b> O₂ zincirin son elektron alıcısıdır [[K1 s. 376]]. Atlas notu: O₂ yoksa elektron akışı ve H⁺ pompalanması durur, gradyan söner, mitokondriyal ATP üretimi kesilir; hücre glikolize kalır. Eritrositler mitokondrisiz olduğundan ATP\'yi zaten yalnızca glikolizden sağlar. [[K1 s. 7]]',
      siyanur: '<b>Siyanür.</b> Siyanür kompleks IV\'ü (sitokrom c oksidaz) inhibe eder. Ortamda O₂ vardır ama kullanılamaz; elektron akışı, H⁺ pompalanması ve ATP sentezi durur, hücre glikolize döner ve laktik asidoz gelişir. Sodyum nitroprussidin yıkımında siyanür açığa çıkar. [[K1 s. 36]] [[K1 s. 376]]',
    };
    const halka = (x, y) => { let d = ''; for (let i = 0; i <= 72; i++) { const a = (i / 72) * 2 * Math.PI, r = 11 + 2.2 * Math.sin(a * 7); d += (i ? ' L' : 'M') + r1(x + r * Math.cos(a)) + ' ' + r1(y + r * Math.sin(a)); } return d + ' Z'; };
    const KX = [94, 192, 276], SX = 369;
    const HP = Array.from({ length: 18 }, (_, i) => [22 + ((i * 89) % 400), 38 + ((i * 37) % 50)]);
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Görünüm"><button type="button" data-g="bol" aria-pressed="true">Bölmeler</button><button type="button" data-g="atp" aria-pressed="false">ATP üretimi</button></div><button type="button" class="btn ghost" data-a="tur">Turu duraklat</button></div>
      <div class="f02-msahne">
        <div class="f02-mA">
          <svg class="f02-msvg" viewBox="0 0 440 280" role="img" aria-label="Mitokondri kesiti: dış zar ve porinler, zarlar arası boşluk, kristalı iç zar, matriks ve mitokondriyal DNA">
            <g class="f02-r" data-r="ara"><ellipse cx="${CX}" cy="${CY}" rx="${ORX}" ry="${ORY}" class="f02-ara"/></g>
            <g class="f02-r" data-r="dis"><ellipse cx="${CX}" cy="${CY}" rx="${ORX}" ry="${ORY}" class="f02-dis"/><g class="f02-porin">${porin}</g><ellipse cx="${CX}" cy="${CY}" rx="${ORX}" ry="${ORY}" class="f02-hit-s"/></g>
            <g class="f02-r" data-r="mat"><path d="${ic}" class="f02-mat"/><g class="f02-enz">${enzim}</g></g>
            <g class="f02-r" data-r="ic"><path d="${ic}" class="f02-ic"/><path d="${ic}" class="f02-hit-s"/></g>
            <g class="f02-r" data-r="dna"><path class="f02-mdna" d="${halka(165, 140)}"/><circle cx="165" cy="140" r="15" class="f02-hit-f"/></g>
            <g class="f02-mekik" opacity="0"><rect x="-6" y="-8" width="12" height="16" rx="3" transform="translate(373,69) rotate(35)"/><rect x="-6" y="-8" width="12" height="16" rx="3" transform="translate(356,84) rotate(30)"/><text x="436" y="22" text-anchor="end" class="f02-mt">karnitin mekiği</text></g>
            <g class="f02-tok" opacity="0"></g>
            <circle class="f02-hit" r="0" opacity="0"/>
            <line class="f02-cizgi" opacity="0"/>
            <g class="f02-lbl" aria-hidden="true"><rect rx="6"/><text text-anchor="middle"></text></g>
          </svg>
          <div class="f02-mchips"><span class="small muted">Dış zardan geçiş:</span>${Object.entries(MOL).map(([k, m]) => `<button type="button" class="f02-chip" data-mol="${k}">${m[0]}</button>`).join('')}</div>
        </div>
        <div class="f02-mB" hidden>
          <svg class="f02-msvg" viewBox="0 0 440 280" role="img" aria-label="İç zarda elektron taşıma zinciri H⁺ pompalar, ATP sentaz H⁺ geri akışıyla ATP üretir">
            <rect x="0" y="0" width="440" height="104" class="f02-ara"/><rect x="0" y="152" width="440" height="128" class="f02-mat"/>
            <rect x="0" y="104" width="440" height="48" class="f02-izar"/><line x1="0" x2="440" y1="104" y2="104" class="f02-izc"/><line x1="0" x2="440" y1="152" y2="152" class="f02-izc"/>
            <text x="10" y="18" class="f02-zb">Zarlar arası boşluk</text><text x="10" y="272" class="f02-zb">Matriks</text><text x="10" y="132" class="f02-zb2">İç zar</text>
            <g class="f02-hims">${HP.map(([x, y]) => `<text x="${x}" y="${y}" class="f02-h">H⁺</text>`).join('')}</g>
            <path class="f02-eyol" d="M56 198 L94 166 L94 128 L276 128 L276 176"/>
            <text x="20" y="214" class="f02-ml">NADH</text>
            ${KX.map((x, i) => `<g class="f02-kx${i === 2 ? ' k4' : ''}"><rect x="${x - (i ? 20 : 24)}" y="${i ? 94 : 90}" width="${i ? 40 : 48}" height="${i ? 70 : 78}" rx="10"/><text x="${x}" y="${134}" text-anchor="middle">${['I', 'III', 'IV'][i]}</text></g>`).join('')}
            <g class="f02-sent"><rect x="352" y="98" width="34" height="56" rx="8"/><rect x="364" y="154" width="10" height="30"/><circle cx="${SX}" cy="206" r="22"/><text x="436" y="262" text-anchor="end" class="f02-ml">ATP sentaz</text></g>
            <text x="234" y="206" text-anchor="middle" class="f02-o2"></text>
            <g class="f02-cn" opacity="0"><circle cx="300" cy="96" r="14"/><text x="300" y="100" text-anchor="middle">CN⁻</text></g>
            <g class="f02-elek">${Array.from({ length: 6 }, () => '<circle r="3.6"/>').join('')}</g>
            <g class="f02-pomp">${Array.from({ length: 12 }, () => '<text text-anchor="middle" opacity="0">H⁺</text>').join('')}</g>
            <g class="f02-atps">${Array.from({ length: 8 }, () => '<text text-anchor="middle" opacity="0">ATP</text>').join('')}</g>
          </svg>
          <div class="seg f02-dseg" role="group" aria-label="Koşul"><button type="button" data-d="normal" aria-pressed="true">Normal</button><button type="button" data-d="hipoksi" aria-pressed="false">O₂ yok</button><button type="button" data-d="siyanur" aria-pressed="false">Siyanür</button></div>
          <div class="f02-metre">${['H⁺ gradyanı', 'ATP sentezi', 'O₂ tüketimi'].map((m) => `<div><span>${m}</span><span class="trk"><i></i></span></div>`).join('')}</div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot"></p>`;
    const $ = (s) => el.querySelector(s);
    const A = $('.f02-mA'), B = $('.f02-mB'), cap = $('.viz-cap'), foot = $('.viz-foot'), turB = $('[data-a="tur"]');
    const bolG = [...el.querySelectorAll('.f02-r')], lbl = A.querySelector('.f02-lbl'), cizgi = A.querySelector('.f02-cizgi');
    const tok = $('.f02-tok'), mekik = $('.f02-mekik'), hitC = A.querySelector('.f02-hit');
    const hims = [...el.querySelectorAll('.f02-hims text')], elek = [...el.querySelectorAll('.f02-elek circle')], pomp = [...el.querySelectorAll('.f02-pomp text')], atps = [...el.querySelectorAll('.f02-atps text')];
    const bars = [...el.querySelectorAll('.f02-metre i')], o2t = $('.f02-o2'), cn = $('.f02-cn'), k4 = $('.k4');
    const FOOT = {
      bol: 'Şematik çizim. Kristalar kitapta yalnız Şekil 2.1\'de etiketlidir; halka biçimli mtDNA çizimi Atlas notudur; bölmelerin işlevleri kitaptandır. [[K1 s. 6–8]]',
      atp: 'Şematik model, göreli birimler. Kitap: ETZ\'nin protein kompleksleri H⁺\'yı zarlar arası boşluğa pompalar, oluşan elektrokimyasal gradyan ATP sentezinde kullanılır [[K1 s. 7]]. Kompleks numaraları, NADH, O₂\'nin son elektron alıcısı olması ve ATP sentaz bu bölümde adıyla geçmez; kitap bunları Bölüm 77\'de işler [[K1 s. 376–377]]. Kompleks II, ubikinon ve sitokrom c gösterilmedi.',
    };
    let g = 'bol', bol = 'dis', tur = !RM, tt = 0, mol = null, tm = 0, dur = 'normal', E = 1, G = 0.72, last = '';
    let pT = [0, 0.4, 0.8], sAcc = 0, pi = 0, ai = 0, et = 0;
    const PU = pomp.map(() => ({ t: -1, x: 0, up: true })), AU = atps.map(() => ({ t: -1 }));
    const turYaz = () => { turB.textContent = tur ? 'Turu duraklat' : 'Turu başlat'; turB.hidden = g !== 'bol'; };
    const capYaz = (c) => { if (c !== last) { cap.innerHTML = REF(c); last = c; } };
    const bolSec = (id) => {
      bol = id;
      bolG.forEach((r) => r.classList.toggle('on', r.dataset.r === id));
      const b = BOLME[id];
      etiket(lbl, b[0], b[2], b[3], 440);
      const tb = lbl.querySelector('rect'), u = UC[id];
      const ty = +tb.getAttribute('y') + (b[3] > 140 ? 0 : +tb.getAttribute('height'));
      cizgi.setAttribute('x1', b[2]); cizgi.setAttribute('y1', ty); cizgi.setAttribute('x2', u[0]); cizgi.setAttribute('y2', u[1]); cizgi.setAttribute('opacity', 1);
      if (!mol) capYaz(b[1]);
    };
    const tokYap = (k) => {
      const C = { pir: 'var(--warn)', aa: 'var(--c-clin)', kz: 'var(--ok)', uz: 'var(--ok)' }[k];
      if (k === 'kz' || k === 'uz') {
        const n = k === 'kz' ? 3 : 8;
        let d = 'M0 0'; for (let i = 0; i < n; i++) d += ` l-4.5 ${i % 2 ? 4 : -4}`;
        tok.innerHTML = `<path d="${d}" style="stroke:${C}" class="f02-zz"/><circle r="4" style="fill:${C}"/>`;
      } else tok.innerHTML = `<circle r="6.5" style="fill:${C}"/>`;
    };
    const molW = (k) => k === 'uz' ? [[16, 26, 0], [50, 70, 1.0], [26, 42, 1.5], [300, 16, 3.0], [373, 69, 3.6], [356, 84, 4.1], [362, 126, 4.8]] : [[16, 26, 0], [56, 77, 1.1], [66, 84, 1.6]];
    const molSec = (k) => {
      mol = k; tm = 0; tur = false; turYaz();
      el.querySelectorAll('[data-mol]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mol === k)));
      bolSec('dis'); tokYap(k);
      mekik.setAttribute('opacity', k === 'uz' ? 1 : 0);
      capYaz(MOL[k][1]);
      if (RM) tm = 9;
    };
    const durSec = (d) => {
      dur = d;
      el.querySelectorAll('[data-d]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.d === d)));
      cn.setAttribute('opacity', d === 'siyanur' ? 1 : 0);
      k4.classList.toggle('blok', d === 'siyanur');
      o2t.textContent = d === 'normal' ? 'O₂ → H₂O' : d === 'hipoksi' ? 'O₂ yok' : 'O₂ var, kullanılamaz';
      o2t.classList.toggle('kritik', d !== 'normal');
      capYaz(DUR[d]);
      if (RM) { E = d === 'normal' ? 1 : 0; G = d === 'normal' ? 0.72 : 0; }
    };
    const gorunum = (v) => {
      g = v;
      el.querySelectorAll('[data-g]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === v)));
      A.hidden = v !== 'bol'; B.hidden = v !== 'atp';
      foot.innerHTML = REF(FOOT[v]);
      last = '';
      if (v === 'bol') { if (mol) capYaz(MOL[mol][1]); else bolSec(bol); } else durSec(dur);
      turYaz();
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const gb = e.target.closest('[data-g]'); if (gb) { gorunum(gb.dataset.g); return; }
      const db = e.target.closest('[data-d]'); if (db) { durSec(db.dataset.d); return; }
      const mb = e.target.closest('[data-mol]'); if (mb) { molSec(mb.dataset.mol); return; }
      if (e.target.closest('[data-a="tur"]')) { tur = !tur; tt = 0; turYaz(); return; }
      const r = e.target.closest('.f02-r');
      if (r) { tur = false; turYaz(); mol = null; tok.setAttribute('opacity', 0); mekik.setAttribute('opacity', 0); el.querySelectorAll('[data-mol]').forEach((b) => b.setAttribute('aria-pressed', 'false')); bolSec(r.dataset.r); }
    });
    const ORDER = ['dis', 'ara', 'ic', 'mat', 'dna'];
    const drawA = (dt) => {
      if (tur) { tt += dt; if (tt > 4) { tt = 0; mol = null; bolSec(ORDER[(ORDER.indexOf(bol) + 1) % ORDER.length]); } }
      if (mol) {
        tm += dt;
        const W = molW(mol), [x, y] = yol(W, tm);
        tok.setAttribute('transform', `translate(${r1(x)},${r1(y)})`); tok.setAttribute('opacity', 1);
        if (mol === 'uz' && tm >= 1.0 && tm < 1.7) { const f = (tm - 1.0) / 0.7; hitC.setAttribute('cx', 56); hitC.setAttribute('cy', 77); hitC.setAttribute('r', r1(5 + f * 12)); hitC.setAttribute('opacity', r1(1 - f)); } else hitC.setAttribute('opacity', 0);
      }
    };
    const drawB = (dt0) => {
      const dt = RM ? 0 : dt0; // azaltılmış hareket: çubuklar güncellenir, parçacıklar durur
      const Et = dur === 'normal' ? 1 : 0;
      if (!RM) { E += (Et - E) * (1 - Math.exp(-dt / 0.35)); G = clamp(G + (0.9 * E * (1 - G) - 0.35 * G) * dt, 0, 1); }
      const Ar = clamp((G - 0.18) / (0.72 - 0.18), 0, 1);
      [clamp(G / 0.72, 0, 1), Ar, E].forEach((v, i) => { bars[i].style.width = (v * 100).toFixed(0) + '%'; });
      const nH = Math.round(clamp(G / 0.72, 0, 1) * HP.length);
      hims.forEach((h, i) => h.setAttribute('opacity', i < nH ? 0.9 : 0));
      // elektronlar
      et = (et + dt * 0.25 * E) % 1;
      const EP = [[56, 198], [94, 166], [94, 128], [276, 128], [276, 176]], L = [50, 38, 182, 48], LT = L.reduce((a, b) => a + b, 0);
      elek.forEach((c, i) => {
        let s = ((et + i / elek.length) % 1) * LT, j = 0;
        while (j < L.length - 1 && s > L[j]) { s -= L[j]; j++; }
        const f = Math.min(1, s / L[j]);
        c.setAttribute('cx', r1(lerp(EP[j][0], EP[j + 1][0], f))); c.setAttribute('cy', r1(lerp(EP[j][1], EP[j + 1][1], f)));
        c.setAttribute('opacity', E > 0.15 ? 0.95 : 0);
      });
      // pompalanan H⁺
      for (let i = 0; i < 3; i++) {
        pT[i] += dt;
        if (pT[i] > 1.3 && E > 0.5) { pT[i] = 0; const u = PU[pi]; u.t = 0; u.x = KX[i]; u.up = true; pi = (pi + 1) % PU.length; }
      }
      sAcc += dt * Ar;
      if (sAcc > 0.55) { sAcc = 0; const u = PU[pi]; u.t = 0; u.x = SX; u.up = false; pi = (pi + 1) % PU.length; }
      PU.forEach((u, i) => {
        const p = pomp[i];
        if (u.t < 0) { p.setAttribute('opacity', 0); return; }
        u.t += dt;
        const f = u.t / 1.2;
        if (f >= 1) { if (!u.up) { const a = AU[ai]; a.t = 0; ai = (ai + 1) % AU.length; } u.t = -1; p.setAttribute('opacity', 0); return; }
        p.setAttribute('x', u.x); p.setAttribute('y', r1(u.up ? lerp(190, 70, f) : lerp(70, 182, f)));
        p.setAttribute('opacity', r1(Math.min(1, 4 * Math.min(f, 1 - f)) * 0.95));
      });
      AU.forEach((a, i) => {
        const p = atps[i];
        if (a.t < 0) { p.setAttribute('opacity', 0); return; }
        a.t += dt;
        const f = a.t / 1.4;
        if (f >= 1) { a.t = -1; p.setAttribute('opacity', 0); return; }
        p.setAttribute('x', r1(lerp(SX - 22, 312, f))); p.setAttribute('y', r1(lerp(214, 240, f)));
        p.setAttribute('opacity', r1(1 - f * f));
      });
    };
    gorunum('bol');
    return ticker(el, (dt) => { if (g === 'bol') drawA(dt); else drawB(dt); });
  };

  /* ---------- 4. Salgı yolu: bir proteinin yolculuğu ---------- */
  VIZ.f02_salgi = (el) => {
    const AD = [
      ['Transkripsiyon', '<b>1 · Transkripsiyon.</b> Çekirdekte DNA\'nın bir bölümünün mRNA kopyası sentezlenir; çekirdek hücrenin etkinliklerini bu yolla yönetir. [[K1 s. 7]] [[K1 s. 10]]'],
      ['Çekirdekten çıkış', '<b>2 · Çekirdekten çıkış.</b> mRNA çekirdekten çıkar ve granüllü ER\'nin ribozomlarına gider [[K1 s. 10]]. Çıkış kapısı çekirdek porlarıdır (Atlas notu: porlardan geçiş iki yönlüdür).'],
      ['Ribozom', '<b>3 · Ribozom.</b> Granüllü ER\'nin yüzeyindeki ribozomlarda amino asitler mRNA\'daki sıraya göre birer birer birleştirilir. [[K1 s. 8]] [[K1 s. 10]]'],
      ['Katlanma', '<b>4 · Katlanma.</b> Yeni zincir üç boyutlu yapısına katlanır; protein sentezi böyle tamamlanır. [[K1 s. 8]]'],
      ['Golgi\'ye', '<b>5 · Golgi\'ye.</b> Protein ER\'den Golgi aygıtına ulaşır [[K1 s. 8]]. Atlas notu: bu taşıma küçük veziküllerle olur.'],
      ['Değiştirme', '<b>6 · Değiştirme.</b> Golgi proteine karbonhidrat grubu (glikozilasyon) ve fosfat grubu (fosforilasyon) ekleyebilir. [[K1 s. 8]]'],
      ['Ayırma ve paketleme', '<b>7 · Ayırma ve paketleme.</b> Hücrenin "postanesi" proteini varış yerine göre ayırır ve etiketli bir veziküle paketler. [[K1 s. 8]]'],
      ['Ekzositoz', '<b>8 · Ekzositoz.</b> Vezikül hücre zarına taşınır, zarla birleşir ve içeriğini hücre dışına verir. Veziküller hücrenin başka bölümlerine de gönderilebilir. [[K1 s. 8]]'],
    ];
    const SURE = 2.8, YAP = [[1, 2], [3, 4], [5, 6, 7], [8]];
    const NCX = 468, NCY = 135;
    const yay = (r, a0, a1) => `M${r1(NCX + r * Math.cos(rad(a0)))} ${r1(NCY + r * Math.sin(rad(a0)))} A${r} ${r} 0 0 1 ${r1(NCX + r * Math.cos(rad(a1)))} ${r1(NCY + r * Math.sin(rad(a1)))}`;
    // Golgi yığını: ER'ye bakan giriş (cis) yüzü dışbükey, çıkış (trans) yüzü içbükey
    const gyay = (r) => `M${r1(150 + r * Math.cos(rad(-45)))} ${r1(135 + r * Math.sin(rad(-45)))} A${r} ${r} 0 0 1 ${r1(150 + r * Math.cos(rad(45)))} ${r1(135 + r * Math.sin(rad(45)))}`;
    let ribs = '';
    [84, 120, 156].forEach((y) => { for (let x = 266; x <= 344; x += 10) ribs += `<circle cx="${x}" cy="${y - 3}" r="2.4"/><circle cx="${x}" cy="${y + 19}" r="2.4"/>`; });
    let dna1 = 'M402 92', dna2 = 'M418 92';
    for (let y = 96; y <= 180; y += 4) { dna1 += ` L${r1(410 - 8 * Math.cos(y / 9))} ${y}`; dna2 += ` L${r1(410 + 8 * Math.cos(y / 9))} ${y}`; }
    el.innerHTML = `<div class="viz-head"><div class="btn-row"><button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">‹ Geri</button><button type="button" class="btn" data-a="oyna">Duraklat</button><button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">İleri ›</button></div><div class="f02-adim" role="group" aria-label="Adımlar">${AD.map((a, i) => `<button type="button" data-i="${i}" aria-pressed="false" title="${a[0]}">${i + 1}</button>`).join('')}</div></div>
      <svg class="f02-ssvg" viewBox="0 0 440 270" role="img" aria-label="Salgılanan bir proteinin yolu: çekirdekte transkripsiyon, granüllü ER ribozomunda sentez, Golgi'de değiştirme ve paketleme, ekzositoz">
        <rect x="0" y="0" width="36" height="270" class="f02-ecf"/><rect x="42" y="0" width="398" height="270" class="f02-sbg"/>
        <g class="f02-sy" data-y="8"><rect x="36" y="0" width="6" height="270" class="f02-zar-d"/><text x="18" y="262" text-anchor="middle" class="f02-zb">ECF</text></g>
        <g class="f02-sy" data-y="1"><circle cx="${NCX}" cy="${NCY}" r="101" class="f02-np"/><path class="f02-zarf" d="${yay(104, 110, 175)} ${yay(104, 185, 250)} ${yay(97, 110, 174)} ${yay(97, 186, 250)}"/><path class="f02-dna" d="${dna1}"/><path class="f02-dna" d="${dna2}"/><text x="380" y="24" text-anchor="end" class="f02-sl">Çekirdek</text><text x="376" y="126" class="f02-sk2">por</text></g>
        <g class="f02-sy" data-y="3"><g class="f02-ers">${[84, 120, 156].map((y) => `<rect x="258" y="${y}" width="92" height="16" rx="8"/>`).join('')}<path d="M350 92 Q364 110 350 128 Q364 146 350 164" class="f02-erb"/></g><g class="f02-erib">${ribs}</g><text x="304" y="214" text-anchor="middle" class="f02-sl">Granüllü ER</text></g>
        <g class="f02-sy" data-y="5"><path class="f02-golgi" d="${[36, 46, 56, 66].map(gyay).join(' ')}"/><text x="200" y="208" text-anchor="middle" class="f02-sl">Golgi</text><text x="230" y="78" text-anchor="middle" class="f02-sk2">giriş</text><text x="170" y="78" text-anchor="middle" class="f02-sk2">çıkış</text></g>
        <circle class="f02-rib-on" cx="332" cy="80" r="5.5" opacity="0"/>
        <path class="f02-mrna" d="M-16 0 q4 -5 8 0 t8 0 t8 0 t8 0" opacity="0"/>
        <g class="f02-zin">${Array.from({ length: 8 }, () => '<circle r="3.3"/>').join('')}</g>
        <path class="f02-vez" opacity="0"/>
        <g class="f02-prot" opacity="0"><path class="f02-blob" d="M-9 -2 C-9 -9 -2 -10 2 -7 C8 -9 11 -3 8 2 C10 8 3 11 -1 8 C-6 11 -11 5 -9 -2 Z"/><g class="f02-seker2" opacity="0"><path d="M2 -8 L4 -16 L10 -20"/><circle cx="4" cy="-16" r="2.6"/><circle cx="10" cy="-20" r="2.6"/></g><g class="f02-fos" opacity="0"><circle cx="10" cy="5" r="5.2"/><text x="10" y="8" text-anchor="middle">P</text></g><g class="f02-flag" opacity="0"><path d="M-8 -14 V-26 h10 l-3 3.5 l3 3.5 h-10"/></g></g>
      </svg>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim; boyutlar ölçekli değildir. ER\'den Golgi\'ye vezikülle taşıma ve mRNA\'nın porlardan çıkışı Atlas notudur. [[K1 s. 7–8]] [[K1 s. 10]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const cap = $('.viz-cap'), oyB = $('[data-a="oyna"]'), mrna = $('.f02-mrna'), zin = [...el.querySelectorAll('.f02-zin circle')], vez = $('.f02-vez'), prot = $('.f02-prot');
    const sek = $('.f02-seker2'), fos = $('.f02-fos'), flag = $('.f02-flag'), ribOn = $('.f02-rib-on'), yapi = [...el.querySelectorAll('.f02-sy')], adB = [...el.querySelectorAll('.f02-adim button')];
    let s = 0, f = 0, run = !RM, tek = false, last = -1;
    const K = () => (el.getBoundingClientRect().width < 520 ? 1.35 : 1);
    const vezCiz = (x, y, r, ac = 0) => {
      // ac: 0 kapalı, 1 sola doğru tamamen açık (ekzositoz)
      if (ac <= 0.01) vez.setAttribute('d', `M${r1(x - r)} ${r1(y)} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`);
      else { const a = rad(180 * (1 - ac * 0.92)); vez.setAttribute('d', `M${r1(x + r * Math.cos(Math.PI - a))} ${r1(y - r * Math.sin(Math.PI - a))} A${r} ${r} 0 1 1 ${r1(x + r * Math.cos(Math.PI + a))} ${r1(y - r * Math.sin(Math.PI + a))}`); }
    };
    const ZP = Array.from({ length: 8 }, (_, j) => [328 - 6.5 * j, 92]);
    const draw = () => {
      const st = s + 1, e = ease(f);
      if (s !== last) {
        last = s;
        cap.innerHTML = REF(AD[s][1]);
        adB.forEach((b, i) => b.setAttribute('aria-pressed', String(i === s)));
        yapi.forEach((y) => { const on = YAP.findIndex((a) => a.includes(st)); y.classList.toggle('on', +y.dataset.y === [1, 3, 5, 8][on]); });
      }
      // mRNA
      let mO = 0, mx = 410, my = 140, msx = 1;
      if (st === 1) { mO = 1; msx = Math.max(0.05, e); mx = 392; my = 140; }
      else if (st === 2) { mO = 1; [mx, my] = yol([[392, 140, 0], [370, 135, 0.35], [360, 104, 0.6], [344, 74, 0.85], [332, 72, 1]], f); }
      else if (st === 3) { mO = 1 - 0.5 * e; mx = 332; my = 72; }
      const k = K();
      mrna.setAttribute('opacity', mO); mrna.setAttribute('transform', `translate(${r1(mx)},${r1(my)}) scale(${r1(msx * k)},${k})`);
      ribOn.setAttribute('opacity', st === 3 || st === 2 ? (st === 3 ? 1 : e) : 0);
      // amino asit zinciri
      zin.forEach((c, j) => {
        let o = 0, x = ZP[j][0], y = ZP[j][1];
        if (st === 3) o = j < Math.ceil(e * 8) ? 1 : 0;
        if (st === 4) { o = e < 0.7 ? 1 : 0; x = lerp(ZP[j][0], 292, e); y = lerp(ZP[j][1], 92, e); }
        c.setAttribute('cx', r1(x)); c.setAttribute('cy', r1(y)); c.setAttribute('r', r1(3.3 * k)); c.setAttribute('opacity', o);
      });
      // protein, vezikül, değişiklikler
      let pO = 0, px = 292, py = 92, ps = 1, vO = 0, vx = 0, vy = 0, vr = 14, vac = 0, sO = 0, fO = 0, flO = 0;
      if (st === 4) { pO = e > 0.45 ? 1 : 0; ps = clamp((e - 0.45) / 0.55, 0.3, 1); }
      if (st === 5) { pO = 1; [px, py] = yol([[292, 92, 0], [262, 96, 0.3], [236, 112, 0.65], [216, 134, 1]], f); vO = f > 0.15 ? 1 : 0; vx = px; vy = py; }
      if (st === 6) { pO = 1; px = lerp(216, 184, e); py = 135; sO = f > 0.3 ? 1 : 0; fO = f > 0.62 ? 1 : 0; }
      if (st === 7) { pO = 1; sO = fO = 1; [px, py] = yol([[178, 135, 0], [166, 138, 0.3], [112, 150, 1]], f); vO = 1; vx = px; vy = py; vr = lerp(6, 16, clamp(f / 0.3, 0, 1)); flO = f > 0.35 ? 1 : 0; }
      if (st === 8) {
        pO = 1; sO = fO = 1; flO = f < 0.5 ? 1 : 0; vO = 1; vr = 16;
        if (f < 0.5) { [px, py] = yol([[112, 150, 0], [56, 150, 0.5]], f); vx = px; vy = py; }
        else { vx = 56; vy = 150; vac = ease((f - 0.5) / 0.3); [px, py] = yol([[56, 150, 0.6], [18, 150, 1]], f); }
      }
      prot.setAttribute('opacity', pO); prot.setAttribute('transform', `translate(${r1(px)},${r1(py)}) scale(${r1(ps * k)})`);
      sek.setAttribute('opacity', sO); fos.setAttribute('opacity', fO); flag.setAttribute('opacity', flO);
      vez.setAttribute('opacity', vO); if (vO) vezCiz(vx, vy, vr * k, vac);
    };
    const git = (i, oyna) => { s = (i + AD.length) % AD.length; f = 0; tek = !oyna; run = true; if (RM) { f = 1; run = false; } oyB.textContent = run && !tek ? 'Duraklat' : 'Oynat'; draw(); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('[data-i]'); if (b) { git(+b.dataset.i, false); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'geri') git(s - 1, false);
      if (a.dataset.a === 'ileri') git(s + 1, false);
      if (a.dataset.a === 'oyna') {
        if (run && !tek) { run = false; oyB.textContent = 'Oynat'; }
        else { if (s === AD.length - 1 && f >= 1) { s = 0; f = 0; } tek = false; run = true; if (RM) { f = 1; run = false; } oyB.textContent = run ? 'Duraklat' : 'Oynat'; }
      }
    });
    if (RM) { s = AD.length - 1; f = 1; oyB.textContent = 'Oynat'; }
    draw();
    return ticker(el, (dt) => {
      if (!run) return;
      f += dt / SURE;
      if (f >= 1) {
        if (tek || s === AD.length - 1) { f = 1; run = false; oyB.textContent = s === AD.length - 1 && !tek ? 'Baştan oynat' : 'Oynat'; }
        else { s++; f = 0; }
      }
      draw();
    });
  };

  /* ---------- 5. Hücre tipleri: yapı işlevi izler ---------- */
  VIZ.f02_tip = (el) => {
    const SAT = [['cek', 'Çekirdek'], ['ger', 'Granüllü ER'], ['der', 'Düz ER'], ['mito', 'Mitokondri'], ['lizo', 'Lizozom']];
    const v = ['v', 'var'];
    const TIP = {
      plazma: { ad: 'Plazma hücresi', d: { cek: ['v', 'tek'], ger: ['b', 'belirgin'], der: v, mito: v, lizo: v },
        cap: '<b>Plazma hücresi: antikor üretimi.</b> Çok miktarda protein (antikor) ürettiği için protein sentezinin yeri olan granüllü ER özellikle belirgindir. Çok protein sentezleyen hücrelerde çekirdekçikler de daha bol bulunur. [[K1 s. 7–8]]' },
      adrenal: { ad: 'Adrenal korteks hücresi', d: { cek: ['v', 'tek'], ger: v, der: ['b', 'bol'], mito: v, lizo: v },
        cap: '<b>Adrenal korteks hücresi: steroit üretimi.</b> Steroit hormon sentezleyen hücrelerde steroit ve lipit sentezinin yeri olan düz ER boldur. [[K1 s. 8]]' },
      kas: { ad: 'Kırmızı iskelet kası lifi', d: { cek: ['b', 'çok çekirdekli'], ger: v, der: ['v', 'sarkoplazmik retikulum'], mito: ['b', 'büyük ve çok sayıda'], lizo: v },
        cap: '<b>Kırmızı iskelet kası lifi.</b> Çok çekirdeklidir. Metabolik etkinliği yüksek olduğu için mitokondrileri hem büyük hem çok sayıdadır. Düz ER burada sarkoplazmik retikulumdur: zar depolarize olunca Ca²⁺ salan hücre içi depo. [[K1 s. 7–8]]' },
      fagosit: { ad: 'Makrofaj · nötrofil', d: { cek: ['v', 'tek'], ger: v, der: v, mito: v, lizo: ['b', 'çok sayıda'] },
        cap: '<b>Makrofaj ve nötrofil: fagositler.</b> Fagosite ettikleri mikroorganizmaları sindirim enzimi, asit ve serbest radikal içeren lizozomlarla yok ederler; lizozomları bu yüzden özellikle çoktur. [[K1 s. 8]]' },
      dev: { ad: 'Çok çekirdekli dev hücre', d: { cek: ['b', 'çok çekirdekli'], ger: v, der: v, mito: v, lizo: v },
        cap: '<b>Çok çekirdekli dev hücre.</b> Makrofajlar kaynaşarak çok çekirdekli dev hücreler oluşturur; tek çekirdek kuralının istisnalarından biridir. [[K1 s. 7]]' },
      eritrosit: { ad: 'Olgun eritrosit', d: { cek: ['y', 'yok'], ger: ['y', 'yok*'], der: ['y', 'yok*'], mito: ['y', 'yok'], lizo: ['y', 'yok*'] },
        cap: '<b>Olgun eritrosit.</b> Çekirdeği ve mitokondrisi yoktur; ATP\'sini yalnızca glikolizle üretir. [[K1 s. 7]] (*) Atlas notu: olgun eritrositte ribozom, ER, Golgi ve lizozom da yoktur.' },
    };
    const SIRA = Object.keys(TIP);
    const nuc = (x, y, r, nl = true) => `<circle cx="${x}" cy="${y}" r="${r}" class="f02-tn"/>${nl ? `<circle cx="${x + r * 0.25}" cy="${y - r * 0.2}" r="${r1(r * 0.3)}" class="f02-tnl"/>` : ''}`;
    const mito = (x, y, a, s = 1) => `<g transform="translate(${x},${y}) rotate(${a}) scale(${s})"><ellipse rx="15" ry="6.5" class="f02-mz"/><path class="f02-mk" d="M-10 0 l3 -4 l3 8 l3 -8 l3 8 l3 -8 l2 4"/></g>`;
    const ger = (x, y, w) => { let s = `<path class="f02-tger" d="M${x} ${y} q${w / 4} -7 ${w / 2} 0 t${w / 2} 0"/>`; for (let i = 0; i <= 6; i++) s += `<circle cx="${r1(x + (w * i) / 6)}" cy="${r1(y - 5 + (i % 3 === 1 ? -2 : 1))}" r="1.7" class="f02-trib"/>`; return s; };
    const der = (x, y) => `<path class="f02-tder" d="M${x} ${y} c6 -9 13 -9 18 0 s12 9 18 0"/>`;
    const lizo = (x, y, r = 7) => `<circle cx="${x}" cy="${y}" r="${r}" class="f02-lz"/><circle cx="${x - 2}" cy="${y - 1}" r="1.3" class="f02-lzi"/><circle cx="${x + 2}" cy="${y + 2}" r="1.3" class="f02-lzi"/>`;
    const CIZ = {
      plazma: () => `<ellipse cx="180" cy="110" rx="124" ry="80" class="f02-tz"/>${nuc(258, 110, 34)}${[62, 80, 98, 116, 134, 152].map((y, i) => ger(84 + (i % 2) * 8, y, 118 - Math.abs(y - 107) * 0.6)).join('')}${mito(110, 166, 10)}${mito(156, 52, -8)}${lizo(220, 160)}`,
      adrenal: () => `<path class="f02-tz" d="M96 40 L262 34 L318 104 L270 182 L104 188 L50 110 Z"/>${nuc(180, 110, 28)}${[[80, 92], [92, 136], [112, 66], [120, 162], [214, 60], [232, 152], [250, 84], [252, 128], [150, 52], [168, 168], [70, 114]].map(([x, y]) => der(x, y)).join('')}${mito(126, 104, 70)}${mito(240, 106, -60)}${ger(196, 168, 40)}${lizo(214, 136, 6)}`,
      kas: () => `<rect x="14" y="62" width="332" height="96" rx="40" class="f02-tz"/>${[[64, 70], [150, 150], [236, 70], [306, 150]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="6" class="f02-tn"/>`).join('')}${[84, 110, 136].map((y) => `<path class="f02-tder" d="M40 ${y} H320" style="stroke-width:1.6;stroke-dasharray:5 3"/>`).join('')}${[97, 123].map((y, j) => Array.from({ length: 8 }, (_, i) => mito(52 + i * 36 + j * 18, y, 0, 1.05)).join('')).join('')}`,
      fagosit: () => `<path class="f02-tz" d="M88 60 C120 24 172 44 196 34 C236 18 286 40 290 76 C326 84 332 132 298 146 C300 188 240 196 210 180 C176 204 112 196 104 162 C60 162 40 120 68 102 C50 84 64 64 88 60 Z"/>${nuc(196, 106, 26)}${[[110, 80], [136, 140], [252, 70], [270, 120], [240, 162], [150, 64], [100, 120], [290, 100], [176, 164], [224, 52], [124, 108]].map(([x, y]) => lizo(x, y, 7)).join('')}${mito(160, 116, 80, 0.9)}${mito(238, 120, -30, 0.9)}`,
      dev: () => `<ellipse cx="180" cy="110" rx="160" ry="94" class="f02-tz"/>${[[116, 74], [150, 58], [190, 56], [228, 64], [258, 86], [102, 108], [262, 122], [122, 146], [230, 150]].map(([x, y]) => nuc(x, y, 13, false)).join('')}${lizo(180, 104)}${lizo(160, 132)}${lizo(206, 126)}${mito(76, 150, 30, 0.9)}${mito(290, 64, -30, 0.9)}`,
      eritrosit: () => `<circle cx="180" cy="110" r="92" class="f02-trbc"/><circle cx="180" cy="110" r="40" class="f02-trbc-i"/><text x="180" y="106" text-anchor="middle" class="f02-tt">organel yok</text><text x="180" y="124" text-anchor="middle" class="f02-tt2">ATP: yalnız glikoliz</text>`,
    };
    el.innerHTML = `<div class="viz-head"><div class="seg f02-tseg" role="group" aria-label="Hücre tipi">${SIRA.map((k) => `<button type="button" data-t="${k}" aria-pressed="false">${TIP[k].ad}</button>`).join('')}</div></div>
      <div class="f02-tip">
        <svg class="f02-tsvg" viewBox="0 0 360 220" role="img" aria-label="Seçilen hücre tipinin şematik çizimi"><g class="f02-tg"></g></svg>
        <div><h3 class="f02-tad"></h3><dl class="f02-tdl">${SAT.map(([k, a]) => `<dt style="--k:${RENK[k]}">${a}</dt><dd data-k="${k}"></dd>`).join('')}</dl><p class="f02-tlej"><span class="f02-v b">belirgin</span><span class="f02-v v">var</span><span class="f02-v y">yok</span></p></div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizimler; organel sayıları ve boyutları temsilîdir. "Var": bulunur; kitap bu hücre tipinde öne çıkarmaz. (*) ile işaretli yokluklar Atlas notudur. [[K1 s. 7–8]]')}</p>`;
    const tg = el.querySelector('.f02-tg'), cap = el.querySelector('.viz-cap'), ad = el.querySelector('.f02-tad');
    let cur = '', oto = !RM, tt = 0;
    const sec = (k) => {
      cur = k;
      const T = TIP[k];
      el.querySelectorAll('[data-t]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.t === k)));
      tg.innerHTML = CIZ[k]();
      tg.classList.remove('f02-gir'); void tg.getBoundingClientRect(); tg.classList.add('f02-gir');
      ad.textContent = T.ad;
      SAT.forEach(([s]) => { const dd = el.querySelector(`dd[data-k="${s}"]`); dd.innerHTML = `<span class="f02-v ${T.d[s][0]}">${T.d[s][1]}</span>`; });
      cap.innerHTML = REF(T.cap);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (b) { oto = false; sec(b.dataset.t); } });
    sec('plazma');
    return ticker(el, (dt) => { if (!oto) return; tt += dt; if (tt > 5.5) { tt = 0; sec(SIRA[(SIRA.indexOf(cur) + 1) % SIRA.length]); } });
  };
    /* ortak: sayfadaki viz-cap'i değiştir; seçim kalkınca varsayılan metne dön */
  const capYaz = (el) => {
    const vz = el.closest('.viz'), cap = vz && vz.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    return (html) => { if (cap) cap.innerHTML = html == null ? ilk : REF(html); };
  };
  const tusla = (root, sec) => {
    const h = (e) => {
      const b = e.target.closest('[data-p]');
      if (!b || !root.contains(b)) return;
      if (e.type === 'keydown') { if (b.tagName === 'BUTTON') return; if (e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault(); }
      sec(b.dataset.p);
    };
    root.addEventListener('click', h);
    root.addEventListener('keydown', h);
    return () => { root.removeEventListener('click', h); root.removeEventListener('keydown', h); };
  };

  /* ---------- 6 · çekirdeğin yapısı ve hücre başına çekirdek sayısı (K1 s. 6–7) ---------- */
  VIZ.f02_cekirdek = (el) => {
    const yaz = capYaz(el);
    const CAP = {
      zarf: '<b>Çekirdek zarfı.</b> Çekirdeği sitoplazmadan ayıran çift katlı zar. [[K1 s. 7]]',
      por: '<b>Çekirdek porları.</b> Zarftaki delikler; hücre yüzey zarında olduğu gibi seçilmiş moleküllerin sitoplazmadan nükleoplazmaya kontrollü geçişine izin verir. [[K1 s. 7]]',
      nukleo: '<b>Nükleoplazma.</b> DNA\'yı saran jel kıvamında madde; sitoplazmanın çekirdekteki karşılığı. [[K1 s. 7]]',
      nukleol: '<b>Çekirdekçik (nükleol).</b> Çekirdeğin RNA sentezlenen, yoğun boyanan bölgesi; çok protein sentezleyen hücrelerde daha bol bulunur. [[K1 s. 7]]',
      dna: '<b>DNA.</b> Hücrenin genetik materyalinin çoğu; bireyin genetik kodu, bütün vücut proteinlerinin planı. mRNA burada DNA\'nın transkripsiyonuyla sentezlenir (Bölüm 3). [[K1 s. 6–7]]',
      h1: '<b>Tek çekirdek.</b> Vücut hücrelerinin hemen hepsinde bir çekirdek vardır; genellikle sitoplazmanın ortasında küresel bir yapıdır. [[K1 s. 7]]',
      h2: '<b>Olgun eritrosit: çekirdeksiz.</b> [[K1 s. 7]]',
      h3: '<b>İskelet kası hücresi: çok çekirdekli.</b> [[K1 s. 7]]',
      h4: '<b>Kaynaşmış makrofajlar: çok çekirdekli dev hücre.</b> [[K1 s. 7]]',
    };
    const CX = 340, CY = 150, R1 = 110, R2 = 103, RM_ = (R1 + R2) / 2;
    const pt = (r, a) => [r1(CX + r * Math.cos(rad(a))), r1(CY + r * Math.sin(rad(a)))];
    const POR = [-35, 20, 70, 120, 160, 210, 255];
    const yay = (r) => POR.map((a, i) => {
      const a1 = a + 4.5, a2 = (i < POR.length - 1 ? POR[i + 1] : POR[0] + 360) - 4.5;
      const [x1, y1] = pt(r, a1), [x2, y2] = pt(r, a2);
      return `M${x1} ${y1}A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`;
    }).join('');
    const kapak = POR.map((a) => [a - 5, a + 5].map((b) => { const [x, y] = pt(RM_, b); return `<circle cx="${x}" cy="${y}" r="3.6"/>`; }).join('')).join('');
    const KROM = ['M262 118C282 96 300 140 322 116S358 92 384 110', 'M268 150C288 132 302 172 322 150S346 128 352 142', 'M270 196C286 176 304 214 318 192S330 214 344 222',
      'M300 86C318 70 336 100 356 80S392 76 404 98', 'M398 130C418 140 404 160 424 168', 'M300 238C320 226 340 246 362 232S386 218 396 226'];
    const [mx1, my1] = pt(146, -35), [mx2, my2] = pt(80, -35);
    /* etiketler: [parça, satırlar, y, hedef x, hedef y] */
    const LB = [['por', ['Çekirdek porları'], 45, ...pt(R1 + 2, 255)], ['zarf', ['Çekirdek zarfı', '(çift katlı)'], 95, ...pt(R1, 188)],
      ['dna', ['DNA'], 150, 268, 150], ['nukleol', ['Çekirdekçik'], 205, 348, 192], ['nukleo', ['Nükleoplazma'], 252, 300, 232]];
    const lbl = LB.map(([k, sat, y, tx, ty]) => `<g class="f02-ckl" data-p="${k}" role="button" tabindex="0" aria-pressed="false">
        <rect x="0" y="${y - 22 - (sat.length - 1) * 9}" width="${tx - 0}" height="${30 + (sat.length - 1) * 18}" class="f02-hit-f"/>
        ${sat.map((t, i) => `<text x="170" y="${y + 5 - (sat.length - 1) * 9 + i * 18}" text-anchor="end">${t}</text>`).join('')}
        <line x1="178" y1="${y}" x2="${tx}" y2="${ty}"/><circle cx="${tx}" cy="${ty}" r="3"/></g>`).join('');
    const HUC = [
      ['h1', 'Vücut hücrelerinin hemen hepsi', '1', '<circle cx="80" cy="50" r="38" class="f02-ckz"/><circle cx="80" cy="50" r="13" class="f02-ckn"/>'],
      ['h2', 'Olgun eritrosit', '0 · çekirdeksiz', '<path d="M28 50C28 26 62 28 80 37C98 28 132 26 132 50C132 74 98 72 80 63C62 72 28 74 28 50Z" class="f02-ckr"/>'],
      ['h3', 'İskelet kası hücresi', 'çok', `<rect x="8" y="28" width="144" height="44" rx="20" class="f02-ckz"/>${Array.from({ length: 15 }, (_, i) => `<line x1="${22 + i * 8.4}" y1="31" x2="${22 + i * 8.4}" y2="69" class="f02-cks"/>`).join('')}${[[34, 35], [70, 35], [112, 35], [50, 65], [92, 65], [130, 65]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="3.6" class="f02-ckn"/>`).join('')}`],
      ['h4', 'Dev hücre (kaynaşmış makrofajlar)', 'çok', `<path d="M24 46C18 22 52 8 80 14C108 6 146 20 140 46C152 70 120 94 86 88C56 98 14 80 24 46Z" class="f02-ckz"/>${[[50, 34], [76, 28], [104, 32], [122, 52], [100, 70], [70, 72], [44, 58], [82, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8.5" class="f02-ckn"/>`).join('')}`],
    ];
    el.innerHTML = `<div class="f02-ck">
      <svg class="f02-cksvg" viewBox="0 0 520 300" role="group" aria-label="Çekirdeğin şematik kesiti; parçalara basın">
        <defs><marker id="f02-ckok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--ink)"/></marker></defs>
        <rect x="196" y="4" width="320" height="292" rx="26" class="f02-ckbg"/>
        <text x="504" y="26" text-anchor="end" class="f02-ckk">sitoplazma</text>
        <g class="f02-ckger"><path d="M482 52C494 82 470 112 482 142S494 202 482 238"/><path d="M500 64C510 94 488 124 500 154S510 204 500 232"/></g>
        <g class="f02-ckrib"><path d="M490 52C502 82 478 112 490 142S502 202 490 238"/><path d="M508 64C518 94 496 124 508 154S518 204 508 232"/></g>
        <g class="f02-ckp" data-p="nukleo"><circle cx="${CX}" cy="${CY}" r="${R2}" class="f02-np"/></g>
        <g class="f02-ckp" data-p="dna">${KROM.map((d) => `<path d="${d}" class="f02-ckd"/><path d="${d}" class="f02-hit-s"/>`).join('')}</g>
        <g class="f02-ckp" data-p="nukleol"><circle cx="372" cy="182" r="26" class="f02-cknl"/></g>
        <g class="f02-ckp" data-p="zarf"><path d="${yay(R1)}${yay(R2)}" class="f02-ckzf"/><path d="${yay(RM_)}" class="f02-hit-s"/></g>
        <g class="f02-ckp" data-p="por"><g class="f02-ckpk">${kapak}</g>
          <circle cx="${mx1}" cy="${my1}" r="5" class="f02-ckm"/><line x1="${mx1}" y1="${my1}" x2="${mx2}" y2="${my2}" class="f02-ckmo" marker-end="url(#f02-ckok)"/></g>
        ${lbl}
      </svg>
      <div class="f02-ckh">${HUC.map(([k, ad, n, svg]) => `<button type="button" class="f02-ckc" data-p="${k}" aria-pressed="false">
        <svg viewBox="0 0 160 100" aria-hidden="true">${svg}</svg><span class="f02-cka">${ad}</span><span class="f02-ckb">${n}</span></button>`).join('')}</div>
    </div>`;
    const root = el.querySelector('.f02-ck');
    let cur = '';
    const sec = (k) => {
      cur = cur === k ? '' : k;
      const ust = cur && !cur.startsWith('h');
      root.classList.toggle('f02-cksel', !!ust);
      root.querySelectorAll('[data-p]').forEach((n) => {
        const on = n.dataset.p === cur;
        n.classList.toggle('on', on);
        if (n.hasAttribute('aria-pressed')) n.setAttribute('aria-pressed', String(on));
      });
      yaz(cur ? CAP[cur] : null);
    };
    return tusla(root, sec);
  };

  /* ---------- 7 · bir lizozom ve üç işi (K1 s. 8) ---------- */
  VIZ.f02_lizozom = (el) => {
    const yaz = capYaz(el);
    const CAP = {
      bakim: '<b>Hücre bakımı.</b> Eski, bozuk ya da artık gereksiz proteinleri parçalar. [[K1 s. 8]]',
      apop: '<b>Programlanmış hücre ölümü (apoptoz).</b> Lizozomlar bu süreçte rol oynar. [[K1 s. 8]]',
      sav: '<b>Fagosite edilen mikroorganizmaların yok edilmesi.</b> Sindirim enzimleri, asit ve serbest radikaller mikroorganizmayı yok eder; makrofaj ve nötrofillerde lizozom bu yüzden çoktur. [[K1 s. 8]] Atlas notu: fagozom lizozomla birleşip fagolizozomu oluşturur.',
    };
    const pac = (x, y, s, r) => `<path d="M0 0L${r1(s * 0.87)} ${r1(-s / 2)}A${s} ${s} 0 1 0 ${r1(s * 0.87)} ${r1(s / 2)}Z" transform="translate(${x} ${y}) rotate(${r})" class="f02-lzen"/>`;
    const kiv = (x, y, s) => `<path d="M${x} ${y - s}L${r1(x + s * 0.3)} ${r1(y - s * 0.3)}L${x + s} ${y}L${r1(x + s * 0.3)} ${r1(y + s * 0.3)}L${x} ${y + s}L${r1(x - s * 0.3)} ${r1(y + s * 0.3)}L${x - s} ${y}L${r1(x - s * 0.3)} ${r1(y - s * 0.3)}Z" class="f02-lzrd"/>`;
    const H = (x, y) => `<text x="${x}" y="${y}" class="f02-lzh">H⁺</text>`;
    const zinc = [[14, 52], [24, 44], [34, 52], [44, 44], [58, 54], [68, 46], [78, 54]];
    const ZN = zinc.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('') + '<path d="M14 52L24 44L34 52L44 44M58 54L68 46L78 54"/>';
    const AA = [[176, 40], [192, 56], [206, 38], [218, 60], [184, 72], [224, 44]];
    const PARCA = [[0, -1], [0.95, -0.3], [0.6, 0.8], [-0.6, 0.8], [-0.95, -0.3]];
    el.innerHTML = `<div class="f02-lzw">
      <svg class="f02-lzsvg" viewBox="0 0 300 300" role="img" aria-label="Lizozom: sindirim enzimleri, asit ve serbest radikaller içeren zarla çevrili kese">
        <text x="150" y="20" text-anchor="middle" class="f02-lzb"><tspan font-weight="800">Lizozom</tspan> · bütün hücrelerde;</text>
        <text x="150" y="40" text-anchor="middle" class="f02-lzb">fagositlerde (makrofaj, nötrofil) çok</text>
        <circle cx="150" cy="138" r="74" class="f02-lzbig"/>
        ${pac(112, 110, 11, 20)}${pac(128, 168, 11, -60)}${pac(178, 104, 11, 160)}${pac(190, 160, 11, 210)}${pac(150, 138, 11, 90)}
        ${H(104, 146)}${H(156, 96)}${H(176, 132)}${H(140, 194)}
        ${kiv(118, 84, 7)}${kiv(200, 128, 7)}${kiv(104, 176, 7)}${kiv(170, 186, 7)}
        <g class="f02-lzlej">
          <g transform="translate(40 236)">${pac(0, 0, 9, 0)}<text x="20" y="5">Sindirim enzimleri</text></g>
          <g transform="translate(40 260)"><text x="-9" y="5" class="f02-lzh">H⁺</text><text x="20" y="5">Asit</text></g>
          <g transform="translate(40 284)">${kiv(0, 0, 7)}<text x="20" y="5">Serbest radikaller (•)</text></g>
        </g>
      </svg>
      <div class="f02-lzks">
        <button type="button" class="f02-lzk" data-p="bakim" aria-pressed="false"><span class="f02-lzt">1 · Hücre bakımı</span>
          <svg viewBox="0 0 240 120" aria-hidden="true">
            <g class="f02-lzzn">${ZN}</g><g class="f02-lzzn f02-lzkop">${ZN}</g>
            <path d="M88 50H98M144 50H156" class="f02-lzok" marker-end="url(#f02-lzok)"/>
            <circle cx="122" cy="50" r="22" class="f02-lzbig"/>${pac(116, 46, 6, 20)}${pac(128, 56, 6, 200)}
            <g class="f02-lzaa">${AA.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" data-x="${x}" data-y="${y}"/>`).join('')}</g>
            <text x="46" y="98" text-anchor="middle" class="f02-lzs">bozuk protein</text>
            <text x="200" y="98" text-anchor="middle" class="f02-lzs">amino asitler</text>
            <defs><marker id="f02-lzok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ink)"/></marker></defs>
          </svg></button>
        <button type="button" class="f02-lzk" data-p="apop" aria-pressed="false"><span class="f02-lzt">2 · Apoptoz</span>
          <svg viewBox="0 0 240 120" aria-hidden="true">
            <circle cx="90" cy="54" r="40" class="f02-lzcl"/><circle cx="90" cy="54" r="14" class="f02-ckn f02-lzcn"/>
            <g class="f02-lzap">${PARCA.map(() => '<circle r="9" class="f02-lzcl"/>').join('')}</g>
            <circle cx="196" cy="44" r="15" class="f02-lzbig"/>${pac(196, 44, 6, 30)}
            <text x="196" y="80" text-anchor="middle" class="f02-lzs">lizozom</text>
            <text x="90" y="112" text-anchor="middle" class="f02-lzs f02-lzapl">apoptotik cisimcikler</text>
          </svg></button>
        <button type="button" class="f02-lzk" data-p="sav" aria-pressed="false"><span class="f02-lzt">3 · Savunma</span>
          <svg viewBox="0 0 240 120" aria-hidden="true">
            <circle cx="90" cy="52" r="36" class="f02-lzfg"/><circle cx="90" cy="52" r="36" class="f02-lzbig f02-lzfl"/><g class="f02-lzfe">${pac(76, 31, 5, 40)}${pac(106, 74, 5, 220)}${pac(110, 33, 5, 140)}</g>
            <g class="f02-lzbk"><rect x="-22" y="-8" width="22" height="16" rx="8"/><rect x="0" y="-8" width="22" height="16" rx="8"/></g>
            <g class="f02-lzly"><circle r="18" class="f02-lzbig"/>${pac(0, 0, 6, 30)}</g>
            <text x="90" y="110" text-anchor="middle" class="f02-lzs f02-lzt1">fagozom</text>
            <text x="190" y="110" text-anchor="middle" class="f02-lzs f02-lzt2">lizozom</text>
            <text x="90" y="110" text-anchor="middle" class="f02-lzs f02-lzt3">fagolizozom</text>
          </svg></button>
      </div>
    </div>`;
    const root = el.querySelector('.f02-lzw');
    const q = (s) => root.querySelector(s), qa = (s) => root.querySelectorAll(s);
    const op = (n, v) => n.setAttribute('opacity', r1(clamp(v, 0, 1) * 100) / 100);
    const seg = (f, a, b) => ease((f - a) / (b - a));
    const CIZ = {
      bakim: (f) => {
        const g = q('.f02-lzkop'), m = seg(f, 0, 0.45);
        g.setAttribute('transform', `translate(${r1(lerp(46, 122, m))} 50) scale(${r1(lerp(1, 0.3, m) * 100) / 100}) translate(-46 -50)`);
        op(g, f >= 1 ? 0 : 1 - seg(f, 0.3, 0.45));
        const d = seg(f, 0.55, 1);
        qa('.f02-lzaa circle').forEach((c) => {
          c.setAttribute('cx', r1(lerp(122, +c.dataset.x, d))); c.setAttribute('cy', r1(lerp(50, +c.dataset.y, d)));
          op(c, f < 0.55 ? 0 : d);
        });
      },
      apop: (f) => {
        const k = seg(f, 0, 0.5), a = seg(f, 0.4, 1);
        const cl = q('.f02-lzw [data-p="apop"] .f02-lzcl');
        cl.setAttribute('r', r1(lerp(40, 22, k)));
        q('.f02-lzcn').setAttribute('r', r1(lerp(14, 8, k)));
        qa('.f02-lzap circle').forEach((c, i) => {
          const [ux, uy] = PARCA[i], dd = lerp(14, 36, a);
          c.setAttribute('cx', r1(90 + ux * dd)); c.setAttribute('cy', r1(54 + uy * dd * 0.95)); c.setAttribute('r', r1(lerp(4, 9, a)));
          op(c, a * 1.5);
        });
        op(q('.f02-lzapl'), a);
      },
      sav: (f) => {
        const m = seg(f, 0, 0.5), b = seg(f, 0.5, 0.75), p = seg(f, 0.7, 1);
        const ly = q('.f02-lzly');
        ly.setAttribute('transform', `translate(${r1(lerp(190, 118, m))} 52) scale(${r1(lerp(1, 0.2, b) * 100) / 100})`);
        op(ly, 1 - b);
        op(q('.f02-lzfl'), b); op(q('.f02-lzfe'), b); op(q('.f02-lzfg'), 1 - b);
        op(q('.f02-lzt1'), 1 - b); op(q('.f02-lzt3'), b);
        const t2 = q('.f02-lzt2'); t2.setAttribute('x', r1(lerp(190, 132, m))); op(t2, 1 - seg(f, 0.25, 0.5));
        const bk = q('.f02-lzbk');
        bk.setAttribute('transform', 'translate(90 52)');
        op(bk, 1 - 0.6 * p);
        const [r0, r1_] = bk.querySelectorAll('rect');
        r0.setAttribute('transform', `translate(${r1(-6 * p)} ${r1(-5 * p)}) rotate(${r1(-18 * p)})`);
        r1_.setAttribute('transform', `translate(${r1(6 * p)} ${r1(6 * p)}) rotate(${r1(24 * p)})`);
      },
    };
    const F = { bakim: 1, apop: 1, sav: 1 };
    Object.keys(CIZ).forEach((k) => CIZ[k](1));
    let cur = '', oyn = '';
    const sec = (k) => {
      cur = cur === k ? '' : k;
      qa('.f02-lzk').forEach((n) => { const on = n.dataset.p === cur; n.classList.toggle('on', on); n.setAttribute('aria-pressed', String(on)); });
      root.classList.toggle('f02-lzsel', !!cur);
      yaz(cur ? CAP[cur] : null);
      if (cur && !RM) { if (oyn && oyn !== cur) { F[oyn] = 1; CIZ[oyn](1); } oyn = cur; F[cur] = 0; CIZ[cur](0); }
    };
    const off = tusla(root, sec);
    const stop = ticker(el, (dt) => {
      if (!oyn) return;
      F[oyn] = Math.min(1, F[oyn] + dt / 1.8);
      CIZ[oyn](F[oyn]);
      if (F[oyn] >= 1) oyn = '';
    });
    return () => { off(); stop(); };
  };
})();
