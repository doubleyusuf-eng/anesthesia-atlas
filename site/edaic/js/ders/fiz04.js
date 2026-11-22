/* Fizyoloji Bölüm 4 · Hücre zarı (K1 s. 13–17) · bileşenler.
   Çizimler şematik, sayılar göreli ve eğitim amaçlıdır; her bileşenin altında belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const f1 = (v) => (Math.round(v * 10) / 10).toString();
  const yuzde = (v) => '%' + Math.round(clamp(v, 0, 1) * 100);
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const tr = (e, x, y) => e.setAttribute('transform', `translate(${f1(x)},${f1(y)})`);

  /* ---------- ortak çizim parçaları ---------- */
  const HEX = (r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return f1(r * Math.cos(a)) + ',' + f1(r * Math.sin(a)); }).join(' ');
  const SEKIL = {
    na: '<circle r="5.6"/>',
    k: '<rect x="-5.2" y="-5.2" width="10.4" height="10.4" rx="2.6"/>',
    ca: '<path d="M0 -6.8L6.8 0L0 6.8L-6.8 0Z"/>',
    glu: `<polygon points="${HEX(6.6)}"/>`,
    o2: '<circle cx="-3.2" r="4.2"/><circle cx="3.2" r="4.2"/>',
    ach: '<path d="M0 -6.5L6.5 5H-6.5Z"/>',
  };
  const ADI = { na: 'Na⁺', k: 'K⁺', ca: 'Ca²⁺', glu: 'glukoz', o2: 'O₂', ach: 'ACh' };
  const pt = (t) => `<g class="f04-pt f04-${t}">${SEKIL[t]}</g>`;
  const lejant = (ts) => `<div class="f04-lej">${ts.map((t) => `<span><svg viewBox="-8 -8 16 16" aria-hidden="true">${pt(t)}</svg>${ADI[t]}</span>`).join('')}</div>`;

  // tek fosfolipit: yon 1 → baş yukarıda, kuyruklar aşağı; yon −1 → tersi
  const lipit = (x, y, yon, k = 1) => {
    const t0 = y + yon * 4 * k, t1 = y + yon * 19 * k, dx = 1.8 * k;
    return `<path class="f04-kuy" d="M${f1(x - dx)} ${f1(t0)}V${f1(t1)}M${f1(x + dx)} ${f1(t0)}V${f1(t1)}"/><circle class="f04-bas" cx="${f1(x)}" cy="${f1(y)}" r="${f1(4.6 * k)}"/>`;
  };
  // yatay çift tabaka şeridi: y = dış baş sırası, kalınlık 44·k; bos = protein boşlukları [[a,b],…]
  const serit = (x0, x1, y, bos = [], k = 1) => {
    const d = 10.6 * k, r = 4.6 * k, T = 44 * k;
    let s = `<rect class="f04-mrk" x="${x0}" y="${f1(y + 3 * k)}" width="${x1 - x0}" height="${f1(T - 6 * k)}"/>`;
    for (let x = x0 + d / 2; x < x1; x += d) {
      if (bos.some(([a, b]) => x > a - r && x < b + r)) continue;
      s += lipit(x, y, 1, k) + lipit(x, y + T, -1, k);
    }
    return s;
  };
  // iki loblu taşıyıcı: lobAc(k) ile k = +1 dışa açık, −1 içe açık, 0 simetrik
  const lob = (cx, my, cls, w = 22, h = 68) => `<g class="f04-lob ${cls}"><rect class="l" x="${f1(cx - w - 3)}" y="${f1(my - h / 2)}" width="${w}" height="${h}" rx="9"/><rect class="r" x="${f1(cx + 3)}" y="${f1(my - h / 2)}" width="${w}" height="${h}" rx="9"/></g>`;
  const lobAc = (g, cx, my, k) => {
    const a = 12 * k;
    g.querySelector('.l').setAttribute('transform', `rotate(${f1(-a)} ${cx} ${my})`);
    g.querySelector('.r').setAttribute('transform', `rotate(${f1(a)} ${cx} ${my})`);
  };

  // bölmelere üst üste binmeden dağılmış, hafifçe titreşen arka plan parçacıkları
  function arkaPlan(g, tanim, bol, kacin, tohum = 1) {
    const L = [], yer = { e: [], i: [] };
    let s = tohum * 97;
    Object.entries(tanim).forEach(([t, say]) => {
      ['e', 'i'].forEach((b, bi) => {
        for (let j = 0; j < say[bi]; j++) {
          const [x0, y0, x1, y1] = bol[b];
          let x = 0, y = 0;
          for (let dene = 0; dene < 40; dene++) {
            x = x0 + rnd(s++) * (x1 - x0); y = y0 + rnd(s++) * (y1 - y0);
            if (kacin && x > kacin[0] && x < kacin[1]) continue;
            if (yer[b].every(([a, c]) => (a - x) ** 2 + (c - y) ** 2 > 400)) break;
          }
          yer[b].push([x, y]);
          L.push({ x, y, ph: rnd(s++) * 6.28, w: 0.7 + rnd(s++) * 0.8, t, b });
        }
      });
    });
    g.innerHTML = L.map((p) => pt(p.t)).join('');
    [...g.children].forEach((c, i) => { L[i].el = c; });
    return L;
  }
  const titret = (L, t) => L.forEach((p) => tr(p.el, p.x + (RM ? 0 : 2.6 * Math.sin(t * p.w + p.ph)), p.y + (RM ? 0 : 2.2 * Math.cos(t * p.w * 1.3 + p.ph))));

  // anahtar kare: [[u, x, y], …]; u aralık dışındaysa null
  const kfAt = (kf, u) => {
    if (u < kf[0][0] || u > kf[kf.length - 1][0]) return null;
    for (let i = 0; i < kf.length - 1; i++) {
      const a = kf[i], b = kf[i + 1];
      if (u <= b[0]) { const f = ease((u - a[0]) / Math.max(1e-6, b[0] - a[0])); return [lerp(a[1], b[1], f), lerp(a[2], b[2], f)]; }
    }
    const z = kf[kf.length - 1]; return [z[1], z[2]];
  };
  const kfOp = (kf, u) => clamp(Math.min((u - kf[0][0]) / 0.05, (kf[kf.length - 1][0] - u) / 0.05), 0, 1);
  const kfVal = (kf, u) => {
    if (u <= kf[0][0]) return kf[0][1];
    for (let i = 0; i < kf.length - 1; i++) { const a = kf[i], b = kf[i + 1]; if (u <= b[0]) return lerp(a[1], b[1], ease((u - a[0]) / Math.max(1e-6, b[0] - a[0]))); }
    return kf[kf.length - 1][1];
  };
  // çoklu doğru üzerinde konum (f 0–1)
  const yolda = (P, f) => {
    const L = []; let top = 0;
    for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); top += d; }
    let h = clamp(f, 0, 1) * top;
    for (let i = 0; i < L.length; i++) { if (h <= L[i] || i === L.length - 1) { const g = L[i] ? h / L[i] : 0; return [lerp(P[i][0], P[i + 1][0], g), lerp(P[i][1], P[i + 1][1], g)]; } h -= L[i]; }
    return P[P.length - 1];
  };
  const seker = (x, y, n) => { // y'den yukarı kısa karbonhidrat zinciri
    const p = [[x, y - 9], [x, y - 20], [x - 6, y - 30], [x + 6, y - 30], [x - 6, y - 41]].slice(0, n);
    return `<path class="f04-sek-c" d="M${x} ${y}V${y - 20}L${x - 6} ${y - 30}${n > 4 ? `V${y - 41}` : ''}M${x} ${y - 20}L${x + 6} ${y - 30}"/>` + p.map(([a, b]) => `<polygon class="f04-sek" points="${HEX(4.3)}" transform="translate(${a},${b})"/>`).join('');
  };
  // iki satırlık protein etiketi
  const etk = (x, my, L) => { const a = Array.isArray(L) ? L : [L]; return `<text class="f04-plbl" x="${x}" y="${f1(my + 4 - (a.length - 1) * 7)}">${a.map((s, i) => `<tspan x="${x}" dy="${i ? 14 : 0}">${s}</tspan>`).join('')}</text>`; };
  const tikla = (el, fn) => el.addEventListener('click', (e) => { if (e.target.closest('.ref')) return; fn(e); });

  /* ---------- 1. Zarın yapısı ve akışkanlığı ---------- */
  VIZ.f04_zar = (el) => {
    const H = 250, Y = 104, B = Y + 44, X0 = 0, X1 = 380;
    const YAPI = [
      ['pl', 'Fosfolipit', '<b>Fosfolipit.</b> Polar, hidrofilik fosfat başı suyu çeker; apolar, hidrofobik yağ asidi kuyrukları suyu iter. Başlar dışa (ECF ve ICF tarafına), kuyruklar çift tabakanın içine bakar. [[K1 s. 13]]'],
      ['mrk', 'Hidrofobik merkez', '<b>Hidrofobik merkez.</b> Kuyrukların oluşturduğu merkez suyun ve hidrofilik maddelerin serbest geçişini engeller. Hücrenin içinde ve dışında farklı çözünen konsantrasyonlarının bulunabilmesi bu engele bağlıdır. [[K1 s. 13–14]]'],
      ['tm', 'Transmembran protein', '<b>Transmembran protein.</b> Çift tabakayı boydan boya geçer. Zar akışkan olduğu için lipit denizindeki bir buzdağı gibi yüzer: animasyondaki iki protein yanlara kayıyor. [[K1 s. 14]]'],
      ['per', 'Periferik protein', '<b>Periferik protein.</b> Zarı boydan boya geçmez, yüzeye (çoğunlukla iç yüze) oturur. İç yüzdekiler sıklıkla ankirin gibi proteinlerle hücre iskeletine bağlanır ve hücrenin şeklini korur; kitap dış yüzdekilere hücreleri birbirine bağlayan hücre adezyon moleküllerini örnek verir (sağ üstte; Atlas notu: kaderin ve integrin gibi başlıca adezyon molekülleri aslında transmembran proteindir). [[K1 s. 14]]'],
      ['glk', 'Glikoprotein, glikolipit', '<b>Glikoprotein ve glikolipit.</b> Dış yüzdeki kısa karbonhidrat zincirleri bir proteine bağlıysa glikoprotein, bir lipide bağlıysa glikolipit adını alır. Zincirler etiket işlevi görür: hücrenin, bağışıklık hücreleri dahil diğer hücrelerce tanınmasını sağlar. [[K1 s. 14]]'],
      ['kol', 'Kolesterol', '<b>Kolesterol.</b> Fosfolipitlerin arasına yerleşir; çift tabakayı sağlamlaştırır ve suya geçirgenliğini daha da azaltır. [[K1 s. 14]]'],
    ];
    const GENEL = '<b>Akışkan çift tabaka.</b> Zar katı değil, iki boyutlu bir sıvıdır: fosfolipitler kendi yarıları içinde serbestçe yer değiştirir. Başı dolgulu fosfolipiti izleyin: yanlara gezer ama öbür yarıya geçmez (Atlas notu: kendiliğinden öbür yarıya geçiş çok seyrektir). Proteinler de lipitlerin arasında yüzer. Bir yapıya basınca o yapı öne çıkar. [[K1 s. 13–14]]';
    const mk = (n, kol, gl) => Array.from({ length: n }, (_, i) => ({ tip: kol.includes(i) ? 'kol' : i === gl ? 'gl' : 'pl', ph: rnd(i + n) * 6.28, w: 0.9 + rnd(i * 3 + n) * 1.1 }));
    const UST = mk(28, [5, 17], 21), ALT = mk(28, [9, 23], -1);
    UST[12].isaret = true;
    const GEN = { pl: 10.6, kol: 6.4, gl: 10.6 };
    const TM = [{ x0: 104, a: 22, w: 0.33, ph: 0, gen: 46 }, { x0: 270, a: 17, w: 0.25, ph: 2.1, gen: 40 }];
    const tmX = (i, t) => TM[i].x0 + TM[i].a * Math.sin(TM[i].w * t + TM[i].ph);
    const segler = (t) => { const p1 = tmX(0, t), p2 = tmX(1, t); return [[X0, p1 - TM[0].gen / 2], [p1 + TM[0].gen / 2, p2 - TM[1].gen / 2], [p2 + TM[1].gen / 2, X1]]; };
    const say = (arr) => { const S = segler(0).map(([a, b]) => b - a), top = S[0] + S[1] + S[2]; const n0 = Math.round((arr.length * S[0]) / top), n1 = Math.round((arr.length * S[1]) / top); return [n0, n1, arr.length - n0 - n1]; };
    const SAY = [say(UST), say(ALT)];
    const hedef = (arr, n, t) => {
      let k = 0;
      segler(t).forEach(([a, b], s) => {
        const its = arr.slice(k, k + n[s]), S = its.reduce((q, it) => q + GEN[it.tip], 0), g = (b - a - S) / Math.max(1, its.length);
        let x = a + g / 2;
        its.forEach((it) => { it.h = x + GEN[it.tip] / 2; x += GEN[it.tip] + g; });
        k += n[s];
      });
    };
    const kolSVG = (ust) => (ust ? `<rect class="f04-kol" x="-2.7" y="${Y + 2}" width="5.4" height="17" rx="2.7"/><circle class="f04-kol" cy="${Y - 1.5}" r="2.6"/>` : `<rect class="f04-kol" x="-2.7" y="${B - 19}" width="5.4" height="17" rx="2.7"/><circle class="f04-kol" cy="${B + 1.5}" r="2.6"/>`);
    const itSVG = (it, ust) => {
      if (it.tip === 'kol') return `<g data-y="kol">${kolSVG(ust)}</g>`;
      if (it.tip === 'gl') return `<g data-y="glk">${lipit(0, Y, 1)}${seker(0, Y - 5, 4)}</g>`;
      return `<g data-y="pl"${it.isaret ? ' class="f04-isaret"' : ''}>${ust ? lipit(0, Y, 1) : lipit(0, B, -1)}</g>`;
    };
    const tmSVG = (i) => `<g class="f04-tmg"><g data-y="tm"><rect class="f04-tm" x="${-TM[i].gen / 2}" y="${Y - 15}" width="${TM[i].gen}" height="${B - Y + 30}" rx="16"/><path class="f04-tm-h" d="M-10 ${Y - 6}V${B + 6}M0 ${Y - 9}V${B + 9}M10 ${Y - 6}V${B + 6}"/></g>${i === 0 ? `<g data-y="glk">${seker(0, Y - 15, 5)}</g>` : ''}</g>`;
    el.innerHTML = `<div class="viz-head"><div class="f04-chips" role="group" aria-label="Zar yapıları">${YAPI.map(([id, ad]) => `<button type="button" class="f04-chip-b" data-id="${id}" aria-pressed="false">${ad}</button>`).join('')}</div><button type="button" class="btn ghost play">Duraklat</button></div>
      <svg class="f04-svg f04-zar-svg" viewBox="0 0 380 ${H}" role="img" aria-label="Fosfolipit çift tabaka kesiti: transmembran ve periferik proteinler, glikoprotein, glikolipit ve kolesterol">
        <rect class="f04-ecf" width="380" height="${Y + 4}"/>
        <rect class="f04-icf" y="${B - 4}" width="380" height="${H - B + 4}"/>
        <text class="f04-bol" x="10" y="18">Hücre dışı sıvı (ECF)</text><text class="f04-bol" x="10" y="${H - 9}">Hücre içi sıvı (ICF)</text>
        <rect class="f04-mrk" data-y="mrk" x="0" y="${Y + 3}" width="380" height="38"/>
        <g class="f04-alt">${ALT.map((it) => itSVG(it, false)).join('')}</g>
        <g class="f04-ust">${UST.map((it) => itSVG(it, true)).join('')}</g>
        ${TM.map((_, i) => tmSVG(i)).join('')}
        <g data-y="per"><path class="f04-isk" d="M0 ${B + 60}C60 ${B + 50} 120 ${B + 70} 190 ${B + 60}S320 ${B + 50} 380 ${B + 62}"/><path class="f04-ank" d="M196 ${B + 22}l-5 6 10 6-10 6 10 6-5 6V${B + 60}"/><ellipse class="f04-per" cx="196" cy="${B + 14}" rx="23" ry="9"/>
          <rect class="f04-per" x="324" y="${Y - 24}" width="26" height="14" rx="7"/><path class="f04-ank" d="M337 ${Y - 10}V${Y - 5}"/>
          <text class="f04-bol" x="372" y="${B + 84}" text-anchor="end">hücre iskeleti</text></g>
      </svg>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik kesit, ölçekli değildir. Yapılar ve işlevleri kitaptaki listeye göredir. [[K1 s. 13–14]]')}</p>`;
    const svg = el.querySelector('svg'), cap = el.querySelector('.viz-cap'), play = el.querySelector('.play');
    [...el.querySelector('.f04-ust').children].forEach((g, i) => { UST[i].el = g; });
    [...el.querySelector('.f04-alt').children].forEach((g, i) => { ALT[i].el = g; });
    [...el.querySelectorAll('.f04-tmg')].forEach((g, i) => { TM[i].el = g; });
    let t = 0, run = !RM, sw = 0, sec = null, son = '';
    const gez = () => { // işaretli lipit komşusuyla yer değiştirir (yalnız kendi yarısında)
      const i = UST.findIndex((it) => it.isaret);
      let d = Math.random() < 0.5 ? -1 : 1;
      if (i < 5) d = 1; else if (i > 22) d = -1;
      const j = i + d; [UST[i], UST[j]] = [UST[j], UST[i]];
    };
    const ciz = (dt) => {
      hedef(UST, SAY[0], t); hedef(ALT, SAY[1], t);
      const f = dt > 0 ? 1 - Math.exp(-dt / 0.22) : 1;
      [UST, ALT].forEach((arr) => arr.forEach((it) => {
        it.x = it.x == null ? it.h : it.x + (it.h - it.x) * f;
        const j = RM ? 0 : 1.1 * Math.sin(t * it.w + it.ph);
        it.el.setAttribute('transform', `translate(${f1(it.x + j)},0)`);
      }));
      TM.forEach((m, i) => m.el.setAttribute('transform', `translate(${f1(tmX(i, t))},0)`));
      const c = sec ? YAPI.find((y) => y[0] === sec)[2] : GENEL;
      if (c !== son) { cap.innerHTML = REF(c); son = c; }
    };
    tikla(el, (e) => {
      const b = e.target.closest('[data-id]');
      if (b) {
        sec = sec === b.dataset.id ? null : b.dataset.id;
        el.querySelectorAll('[data-id]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.id === sec)));
        svg.classList.toggle('sec', !!sec); if (sec) svg.dataset.s = sec; else delete svg.dataset.s;
        ciz(0); return;
      }
      if (e.target.closest('.play')) { run = !run; play.textContent = run ? 'Duraklat' : 'Oynat'; }
    });
    if (RM) play.textContent = 'Oynat';
    ciz(0);
    return ticker(el, (dt) => { if (run) { t += dt; sw += dt; if (sw > 0.85) { sw = 0; gez(); } } ciz(dt); });
  };

  /* ---------- 2. Zardan taşıma yolları (altı yol) ---------- */
  VIZ.f04_tasima = (el) => {
    const Y = 96, B = Y + 44, MY = Y + 22, CX = 180, H = 236;
    const BOL = { e: [16, 30, 344, 80], i: [16, 160, 344, 216] };
    const K2 = [[0, 1], [0.3, 1], [0.5, -1], [0.75, -1], [0.95, 1], [1, 1]];
    const uc = (f) => [0, 1, 2].map(f);
    const M = {
      basit: {
        ad: 'Basit difüzyon', tur: 'yok', P: 3.4, arka: { o2: [8, 2], na: [3, 1] }, lej: ['o2', 'na'],
        akt: [...uc((i) => ({ t: 'o2', o: i / 3, kf: [[0, 112 + i * 62, 36], [0.32, 115 + i * 62, 86], [0.68, 119 + i * 62, 150], [1, 123 + i * 62, 204]] })),
          { t: 'na', kf: [[0, 300, 38], [0.42, 302, 86], [0.86, 314, 42]] }],
        oz: [['Protein', 'Gerekmez; lipit çift tabakadan doğrudan geçer'], ['Enerji', 'Gerekmez'], ['Yön', 'Konsantrasyon (ya da parsiyel basınç) gradyanı yönünde'], ['Örnek', 'O₂, CO₂, steroit hormonlar']],
        cap: '<b>Basit difüzyon.</b> Lipofilik küçük moleküller hidrofobik merkeze takılmadan geçer; yüksek konsantrasyondan (ya da parsiyel basınçtan) düşüğe doğru difüze olur. Na⁺ gibi hidrofilik bir iyon ise merkezden geri döner. [[K1 s. 14]]',
      },
      kanal: {
        ad: 'İyon kanalı', tur: 'kanal', P: 2.7, etiket: 'Na⁺ kanalı', arka: { na: [9, 2], k: [2, 8] }, lej: ['na', 'k'],
        akt: [...uc((i) => ({ t: 'na', o: i / 3, kf: [[0, 140 + i * 40, 40], [0.3, CX, Y - 4], [0.62, CX, B + 6], [1, 150 + i * 40, 206]] })),
          { t: 'k', kf: [[0, 122, 206], [0.45, CX - 3, B + 8], [0.9, 110, 196]] }],
        oz: [['Protein', 'Su dolu por (kanal); belirli bir iyona özgü'], ['Enerji', 'Gerekmez'], ['Yön', 'İyonun konsantrasyon gradyanı yönünde'], ['Örnek', 'Voltaj kapılı Na⁺ kanalı']],
        cap: '<b>İyon kanalı.</b> Su dolu por belirli bir iyona yüksek derecede özgüdür: Na⁺ kanalı Na⁺\'yı geçirir, içeriden gelen K⁺ porun ağzından geri döner. Na⁺ kendi gradyanı yönünde, yüksek konsantrasyonlu ECF\'den hücreye akar. [[K1 s. 14–15]]',
      },
      kolay: {
        ad: 'Kolaylaştırılmış', tur: 'tas', cls: 'tas', P: 3.4, etiket: 'GLUT', kon: K2, arka: { glu: [7, 2] }, lej: ['glu'],
        akt: [{ t: 'glu', kf: [[0, 132, 40], [0.26, CX, MY - 8], [0.3, CX, MY - 8], [0.5, CX, MY + 8], [0.74, 206, 202]] }],
        oz: [['Protein', 'Taşıyıcı; konformasyon değiştirerek bir yüzden öbürüne açılır'], ['Enerji', 'Gerekmez'], ['Yön', 'Konsantrasyon gradyanı yönünde'], ['Örnek', 'Glukoz · glukoz taşıyıcısı (GLUT)']],
        cap: '<b>Kolaylaştırılmış difüzyon.</b> Taşıyıcı glukozu dış yüzde bağlar, konformasyon değiştirip iç yüze açılır ve glukozu bırakır; boş taşıyıcı geri döner. Madde yine gradyanı yönünde geçer, enerji harcanmaz. [[K1 s. 15]]',
      },
      primer: {
        ad: 'Primer aktif', tur: 'tas', cls: 'pompa', P: 5.4, etiket: 'Na⁺/K⁺-ATPaz', kon: [[0, -1], [0.2, -1], [0.34, 1], [0.62, 1], [0.76, -1], [1, -1]], arka: { na: [9, 2], k: [2, 8] }, lej: ['na', 'k'],
        akt: [...uc((i) => ({ t: 'na', kf: [[0, 140 + i * 38, 206], [0.18, CX - 8 + i * 8, MY + 6], [0.2, CX - 8 + i * 8, MY + 6], [0.34, CX - 8 + i * 8, MY - 6], [0.5, 140 + i * 40, 40]] })),
          ...[0, 1].map((i) => ({ t: 'k', kf: [[0.46, 150 + i * 64, 36], [0.6, CX - 4 + i * 8, MY - 6], [0.62, CX - 4 + i * 8, MY - 6], [0.76, CX - 4 + i * 8, MY + 6], [0.95, 152 + i * 60, 206]] })),
          { t: 'atp', kf: [[0, 268, 206], [0.17, 222, B + 22], [0.28, 222, B + 22], [0.44, 262, 204]], yazi: [[0, 'ATP'], [0.24, 'ADP + Pi']] }],
        oz: [['Protein', 'Pompa (ATPaz)'], ['Enerji', 'ATP; pompanın kendisi hidrolize eder'], ['Yön', 'Gradyana karşı, genellikle tek yönlü'], ['Örnek', 'Na⁺/K⁺-ATPaz: bir ATP ile 3 Na⁺ dışarı, 2 K⁺ içeri']],
        cap: '<b>Na⁺/K⁺-ATPaz.</b> İç yüzde üç Na⁺ bağlanır; ATP hidroliziyle pompa dış yüze açılır ve Na⁺ ECF\'ye bırakılır. Dış yüzde iki K⁺ bağlanır, pompa iç yüze döner ve K⁺ ICF\'ye bırakılır. İki iyon da kendi gradyanına karşı taşınır. [[K1 s. 16]]',
      },
      simport: {
        ad: 'Simport', tur: 'tas', cls: 'tas', P: 3.6, etiket: 'SGLT-2', kon: K2, arka: { na: [9, 2], glu: [2, 6] }, lej: ['na', 'glu'],
        akt: [{ t: 'na', kf: [[0, 136, 38], [0.26, CX - 6, MY - 8], [0.3, CX - 6, MY - 8], [0.5, CX - 6, MY + 8], [0.74, 148, 204]] },
          { t: 'glu', kf: [[0, 226, 44], [0.26, CX + 7, MY - 8], [0.3, CX + 7, MY - 8], [0.5, CX + 7, MY + 8], [0.74, 214, 200]] }],
        oz: [['Protein', 'Taşıyıcı; ATP hidrolize etmez'], ['Enerji', 'Dolaylı: Na⁺/K⁺-ATPaz\'ın oluşturduğu Na⁺ gradyanı'], ['Yön', 'Aynı yönde: Na⁺ gradyanı yönünde, glukoz gradyanına karşı'], ['Örnek', 'SGLT-2: Na⁺ ile glukoz']],
        cap: '<b>Sekonder aktif: birlikte taşıma (simport).</b> Na⁺ ve glukoz aynı yönde, birlikte taşınır. İtici güç Na⁺\'nın hücre içine doğru gradyanıdır; glukoz bu sayede kendi gradyanına karşı hücreye girebilir. [[K1 s. 16]]',
      },
      antiport: {
        ad: 'Antiport', tur: 'tas', cls: 'tas', P: 5.2, etiket: ['Na⁺/Ca²⁺', 'değiştiricisi'], kon: [[0, 1], [0.2, 1], [0.34, -1], [0.62, -1], [0.76, 1], [1, 1]], arka: { na: [9, 2], ca: [5, 1] }, lej: ['na', 'ca'],
        akt: [...uc((i) => ({ t: 'na', kf: [[0, 140 + i * 40, 38], [0.18, CX - 8 + i * 8, MY - 6], [0.2, CX - 8 + i * 8, MY - 6], [0.34, CX - 8 + i * 8, MY + 6], [0.5, 146 + i * 38, 206]] })),
          { t: 'ca', kf: [[0.44, 238, 206], [0.6, CX, MY + 6], [0.62, CX, MY + 6], [0.76, CX, MY - 6], [0.95, 220, 38]] }],
        oz: [['Protein', 'Taşıyıcı; ATP hidrolize etmez'], ['Enerji', 'Dolaylı: Na⁺ gradyanı'], ['Yön', 'Zıt yönlerde: Na⁺ gradyanı yönünde içeri, öbür iyon gradyanına karşı dışarı'], ['Örnek', 'Na⁺/Ca²⁺ değiştiricisi: 3 Na⁺ içeri, 1 Ca²⁺ dışarı (Atlas notu)']],
        cap: '<b>Sekonder aktif: karşı taşıma (antiport).</b> İyonlar zıt yönlerde taşınır: Na⁺ gradyanı yönünde girerken öbür iyonu gradyanına karşı dışarı çıkarır. Kitabın örneği toplayıcı kanal esas hücrelerindeki Na⁺/K⁺ antiporteridir; çizimdeki Na⁺/Ca²⁺ değiştiricisi atlasın seçtiği örnektir (Aktif taşıma bölümündeki ikinci Atlas notuna bakın). [[K1 s. 16]]',
      },
    };
    const TAM = { basit: 'Basit difüzyon', kanal: 'İyon kanalı', kolay: 'Kolaylaştırılmış difüzyon', primer: 'Primer aktif taşıma', simport: 'Sekonder aktif: birlikte taşıma (simport)', antiport: 'Sekonder aktif: karşı taşıma (antiport)' };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Taşıma yolu">${Object.entries(M).map(([id, m]) => `<button type="button" data-m="${id}" aria-pressed="false">${m.ad}</button>`).join('')}</div></div>
      <div class="f04-tas">
        <div><svg class="f04-svg" viewBox="0 0 360 ${H}" role="img" aria-label="Hücre zarından taşıma: seçilen yolun canlandırması"></svg><div class="f04-lej-y"></div></div>
        <dl class="f04-oz"></dl>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim: parçacık yoğunluğu konsantrasyonu temsil eder; taşıyıcıların konformasyon döngüsü sadeleştirilmiştir. Yollar ve örnekler kitaptandır; Na⁺/Ca²⁺ değiştiricisi Atlas notudur. [[K1 s. 14–16]]')}</p>`;
    const svg = el.querySelector('svg'), oz = el.querySelector('.f04-oz'), cap = el.querySelector('.viz-cap'), lejY = el.querySelector('.f04-lej-y');
    let mod = 'basit', T = 0, AK = [], AR = [], lobEl = null;
    const kur = () => {
      const m = M[mod];
      el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mod)));
      svg.innerHTML = `<rect class="f04-ecf" width="360" height="${Y + 4}"/><rect class="f04-icf" y="${B - 4}" width="360" height="${H - B + 4}"/>
        <text class="f04-bol" x="10" y="17">Hücre dışı (ECF)</text><text class="f04-bol" x="10" y="${H - 7}">Hücre içi (ICF)</text>
        ${serit(0, 360, Y, m.tur === 'yok' ? [] : [[CX - 28, CX + 28]])}
        ${m.tur === 'kanal' ? `<g class="f04-kanal"><rect x="${CX - 28}" y="${MY - 34}" width="22" height="68" rx="9"/><rect x="${CX + 6}" y="${MY - 34}" width="22" height="68" rx="9"/></g>` : ''}
        ${m.tur === 'tas' ? lob(CX, MY, m.cls) : ''}
        ${m.etiket ? etk(CX + 34, MY, m.etiket) : ''}
        <g class="f04-arka"></g><g class="f04-akt"></g>`;
      lobEl = svg.querySelector('.f04-lob');
      AR = arkaPlan(svg.querySelector('.f04-arka'), m.arka, BOL, [CX - 34, CX + 34], Object.keys(M).indexOf(mod) + 1);
      const akt = svg.querySelector('.f04-akt');
      akt.innerHTML = m.akt.map((a) => (a.t === 'atp' ? '<g class="f04-atp"><rect x="-28" y="-8.5" width="56" height="17" rx="8.5"/><text y="3.8" text-anchor="middle">ATP</text></g>' : pt(a.t))).join('');
      AK = [...akt.children];
      oz.innerHTML = `<div class="f04-oz-h">${TAM[mod]}</div>` + m.oz.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
      lejY.innerHTML = lejant(m.lej);
      cap.innerHTML = REF(m.cap);
      T = RM ? m.P * 0.55 : 0;
      ciz();
    };
    const ciz = () => {
      const m = M[mod], u = (T / m.P) % 1;
      titret(AR, T);
      m.akt.forEach((a, i) => {
        const uu = (u + (a.o || 0)) % 1, p = kfAt(a.kf, uu), e = AK[i];
        if (!p) { e.setAttribute('opacity', 0); return; }
        e.setAttribute('opacity', f1(kfOp(a.kf, uu))); tr(e, p[0], p[1]);
        if (a.yazi) { const y = a.yazi.filter((q) => uu >= q[0]).pop(); const tx = e.querySelector('text'); if (y && tx.textContent !== y[1]) tx.textContent = y[1]; }
      });
      if (m.kon && lobEl) lobAc(lobEl, CX, MY, kfVal(m.kon, u));
    };
    tikla(el, (e) => { const b = e.target.closest('[data-m]'); if (b && b.dataset.m !== mod) { mod = b.dataset.m; kur(); } });
    kur();
    return ticker(el, (dt) => { if (RM) return; T += dt; ciz(); });
  };

  /* ---------- 3. İyon kanalı tipleri ve kapılanma ---------- */
  VIZ.f04_kanal = (el) => {
    const Y = 84, B = Y + 44, MY = Y + 22, CX = 180, H = 228;
    const BOL = { e: [14, 26, 346, 70], i: [14, 150, 346, 208] };
    const TUR = {
      siz: { ad: 'Sızıntı', ion: 'k', ic: false, arka: { k: [2, 8] } },
      vol: { ad: 'Voltaj kapılı', ion: 'na', ic: true, arka: { na: [9, 2] } },
      lig: { ad: 'Ligand kapılı', ion: 'na', ic: true, arka: { na: [9, 2] } },
      mek: { ad: 'Mekanik kapılı', ion: 'ca', ic: true, arka: { ca: [6, 1] } },
    };
    const CAP = {
      siz: '<b>Sızıntı kanalı.</b> Her zaman açıktır: iyon kendi konsantrasyon gradyanı yönünde sürekli hareket eder. Çizimde içeriden dışarı sızan K⁺ örnek alındı (Atlas notu: K⁺ sızıntısı istirahat zar potansiyelinin temelidir, Bölüm 51). [[K1 s. 15]]',
      vol0: '<b>Voltaj kapılı kanal: kapalı.</b> Zar istirahatte, kanal kapalı; kapalı kanaldan iyon geçmez. Zarı depolarize etmek için düğmeye basın. [[K1 s. 15]]',
      vol1: '<b>Açık.</b> Depolarizasyon kanalın şeklini değiştirir ve kanal açılır; Na⁺ kendi gradyanı yönünde hücreye girer. Atlas notu: kanal, iç yüz henüz negatifken eşikte açılır; iç yüzü pozitife çeviren bu Na⁺ girişidir (Bölüm 52). [[K1 s. 15]]',
      vol2: '<b>İnaktive.</b> Zar hâlâ depolarize ama kanal inaktive oldu: Na⁺ geçişi durdu, kanal bu iyonu yine geçirmiyor. Atlas notu: kanalın yeniden açılabilmesi için önce zarın repolarize olması gerekir (Bölüm 52). [[K1 s. 15]]',
      vol3: '<b>Repolarizasyon.</b> İnaktivasyon kapısı çekildi, kanal kapalı ve yeniden açılmaya hazır. Kalbin aksiyon potansiyelindeki içe doğrultucu K⁺ kanalları ise tersine, zar repolarize olunca açılır (Bölüm 57). [[K1 s. 15]]',
      lig0: '<b>Ligand kapılı kanal.</b> Örnek nöromüsküler kavşaktaki nikotinik ACh reseptörüdür; reseptörün kendisi bir katyon kanalıdır. ACh vermek için düğmeye basın. [[K1 s. 15]]',
      lig1: '<b>ACh bağlanıyor.</b> Ligand reseptörün hücre dışı yüzündeki bağlanma bölgelerine ulaşıyor. [[K1 s. 15]]',
      lig2: '<b>Kanal açık.</b> ACh\'nin bağlanması reseptörün yapısındaki katyon kanalını açar ve Na⁺ hücreye girer. Atlas notu: kanalın açılması için iki ACh molekülünün bağlanması gerekir (Bölüm 53). [[K1 s. 15]]',
      lig3: '<b>ACh ayrıldı.</b> Ligand olmadan kanal kapanır ve iyon geçişi durur. [[K1 s. 15]]',
      mek0: '<b>Mekanik kapılı kanal: kapalı.</b> Gerilme düşük. Kaydırıcıyla zarı gerin; lipitlerin aralandığına ve kanalın açıldığına bakın. [[K1 s. 15]]',
      mek1: '<b>Gerilme kanalı açtı.</b> Arteriyol düz kası gerildiğinde mekanik kapılı Ca²⁺ kanalları açılır ve Ca²⁺ hücreye girer; miyojenik yanıtın temeli budur (Bölüm 34 ve 56). Atlas notu: gerilmeye duyarlı kanalların çoğu seçici olmayan katyon kanallarıdır; yol açtıkları depolarizasyon L-tipi voltaj kapılı Ca²⁺ kanallarını açar ve Ca²⁺ asıl bu yoldan girer. [[K1 s. 15]]',
    };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Kanal tipi">${Object.entries(TUR).map(([id, t]) => `<button type="button" data-t="${id}" aria-pressed="false">${t.ad}</button>`).join('')}</div></div>
      <svg class="f04-svg f04-kan-svg" viewBox="0 0 360 ${H}" role="img" aria-label="Zardaki bir iyon kanalı, kapısı ve iyon akışı"></svg>
      <div class="f04-kan-alt"><div class="f04-kan-ctl"></div><div class="f04-oku"></div></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim: kapıların şekli ve süreler temsilîdir. Ligand kapılı kanalda yalnız Na⁺ girişi çizildi; kanal katyonlara geçirgendir. Kanal tipleri ve örnekleri kitaptandır. [[K1 s. 15]]')}</p>`;
    const svg = el.querySelector('svg'), ctl = el.querySelector('.f04-kan-ctl'), oku = el.querySelector('.f04-oku'), cap = el.querySelector('.viz-cap');
    let tip = 'siz', t = 0, AR = [], AKIM = [], LIP = [], acc = 0, gecen = 0, o = 1, ib = 0;
    let depol = false, tA = 0, oldu = false, ach = 0, tL = 0, ger = 0, son = '', sonO = '', ligBitti = false;
    const ACH = [[CX - 17, MY - 38], [CX + 17, MY - 38]], ACH0 = [[118, 22], [246, 18]];
    const kur = () => {
      const T = TUR[tip];
      el.querySelectorAll('[data-t]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.t === tip)));
      let lip = '';
      [-1, 1].forEach((s) => { for (let i = 0; i < 18; i++) { const d = 39.3 + i * 10.6; lip += `<g data-d="${d}" data-s="${s}">${lipit(0, Y, 1)}${lipit(0, B, -1)}</g>`; } });
      const kapi = tip !== 'siz' ? `<rect class="f04-kapi" x="${CX - 6}" y="${MY - 2}" width="15" height="4" rx="2"/>` : '';
      const yuk = [30, 70, 110, 250, 290, 330];
      svg.innerHTML = `<rect class="f04-ecf" width="360" height="${Y + 4}"/><rect class="f04-icf" y="${B - 4}" width="360" height="${H - B + 4}"/>
        <text class="f04-bol" x="10" y="16">Hücre dışı (ECF)</text><text class="f04-bol" x="10" y="${H - 7}">Hücre içi (ICF)</text>
        <rect class="f04-mrk" x="0" y="${Y + 3}" width="360" height="38"/>
        <g class="f04-lip">${lip}</g>
        ${tip === 'vol' ? `<g class="f04-yuk">${yuk.map((x) => `<text class="yd" x="${x}" y="${Y - 10}" text-anchor="middle">+</text><text class="yi" x="${x}" y="${B + 20}" text-anchor="middle">−</text>`).join('')}</g>` : ''}
        <g class="f04-kanal"><g class="kl"><rect x="${CX - 28}" y="${MY - 34}" width="22" height="68" rx="9"/>${kapi}</g><g class="kr"><rect x="${CX + 6}" y="${MY - 34}" width="22" height="68" rx="9"/></g></g>
        ${tip === 'vol' ? '<path class="f04-zincir"/><circle class="f04-top" r="6.5"/>' : ''}
        ${tip === 'lig' ? `<path class="f04-bag" d="M${CX - 24} ${MY - 34}q7 8 14 0M${CX + 10} ${MY - 34}q7 8 14 0"/>` : ''}
        ${etk(CX + 40, MY, { siz: ['K⁺ sızıntı', 'kanalı'], vol: ['voltaj kapılı', 'Na⁺ kanalı'], lig: ['nikotinik ACh', 'reseptörü'], mek: ['mekanik kapılı', 'Ca²⁺ kanalı'] }[tip])}
        <g class="f04-arka"></g><g class="f04-akim"></g><g class="f04-lig">${tip === 'lig' ? pt('ach') + pt('ach') : ''}</g>`;
      LIP = [...svg.querySelectorAll('.f04-lip > g')].map((g) => ({ g, d: +g.dataset.d, s: +g.dataset.s }));
      AR = arkaPlan(svg.querySelector('.f04-arka'), T.arka, BOL, [CX - 36, CX + 36], 11 + Object.keys(TUR).indexOf(tip));
      AKIM = []; acc = 0; gecen = 0; depol = false; tA = 0; oldu = false; ach = 0; tL = 0; ligBitti = false;
      o = tip === 'siz' ? 1 : 0; ib = 0; son = ''; sonO = '';
      ctl.innerHTML = tip === 'siz' ? `<span class="small muted">Bu kanal her zaman açıktır.</span>${lejant(['k'])}`
        : tip === 'vol' ? `<button type="button" class="btn" data-a="dep">Depolarize et</button>${lejant(['na'])}`
          : tip === 'lig' ? `<button type="button" class="btn" data-a="ach">ACh ver</button>${lejant(['ach', 'na'])}`
            : `<label class="f04-rng"><span>Zar gerilmesi <b class="o-g">%${Math.round(ger * 100)}</b></span><input type="range" min="0" max="100" step="1" value="${Math.round(ger * 100)}" data-r="g"></label>${lejant(['ca'])}`;
      ciz(0);
    };
    const durum = () => {
      if (tip === 'siz') return 'siz';
      if (tip === 'vol') return depol ? (tA < 1.3 ? 'vol1' : 'vol2') : oldu ? 'vol3' : 'vol0';
      if (tip === 'lig') return ach === 0 ? (ligBitti ? 'lig3' : 'lig0') : ['lig0', 'lig1', 'lig2', 'lig3'][ach];
      return o > 0.5 ? 'mek1' : 'mek0';
    };
    const ciz = (dt) => {
      const T = TUR[tip];
      titret(AR, t);
      // kapı ve hedef açıklık
      let oH = 1, ibH = 0;
      if (tip === 'vol') { oH = depol ? 1 : 0; ibH = depol && tA >= 1.3 ? 1 : 0; }
      if (tip === 'lig') oH = ach === 2 ? 1 : 0;
      if (tip === 'mek') oH = clamp((ger - 0.45) / 0.2, 0, 1);
      const f = dt > 0 ? 1 - Math.exp(-dt / 0.16) : 1;
      o += (oH - o) * f; ib += (ibH - ib) * f;
      const kapi = svg.querySelector('.f04-kapi');
      if (kapi) kapi.setAttribute('transform', `rotate(${f1(-80 * o)} ${CX - 6} ${MY})`);
      const ac = tip === 'mek' ? 4 * ger : 0;
      svg.querySelector('.kl').setAttribute('transform', `translate(${f1(-ac)},0)`); svg.querySelector('.kr').setAttribute('transform', `translate(${f1(ac)},0)`);
      LIP.forEach((L) => L.g.setAttribute('transform', `translate(${f1(CX + L.s * (34 + ac + (L.d - 34) * (1 + 0.3 * (tip === 'mek' ? ger : 0))))},0)`));
      if (tip === 'vol') {
        const [bx, by] = [lerp(CX + 46, CX, ease(ib)), lerp(B + 34, B + 3, ease(ib))];
        const top = svg.querySelector('.f04-top'); top.setAttribute('cx', f1(bx)); top.setAttribute('cy', f1(by));
        svg.querySelector('.f04-zincir').setAttribute('d', `M${CX + 20} ${B + 12}Q${f1((CX + 20 + bx) / 2 + 8)} ${f1(Math.max(B + 12, by) + 14)} ${f1(bx)} ${f1(by)}`);
        // önce iç yüz yalnız daha az negatif (soluk işaretler); kutup ancak Na⁺ girdikten sonra tersine döner
        const ters = depol && tA > 1.1;
        svg.querySelectorAll('.f04-yuk .yd').forEach((x) => { x.textContent = ters ? '−' : '+'; });
        svg.querySelectorAll('.f04-yuk .yi').forEach((x) => { x.textContent = ters ? '+' : '−'; });
        svg.querySelector('.f04-yuk').setAttribute('opacity', depol && !ters ? 0.35 : 1);
      }
      if (tip === 'lig') {
        const L = [...svg.querySelectorAll('.f04-lig > g')];
        L.forEach((g, i) => {
          let p, op = 1;
          if (ach === 0) { p = ACH0[i]; op = 0; }
          else if (ach === 1) { const q = ease(tL / 0.8); p = [lerp(ACH0[i][0], ACH[i][0], q), lerp(ACH0[i][1], ACH[i][1], q)]; op = clamp(tL / 0.2, 0, 1); }
          else if (ach === 2) p = ACH[i];
          else { const q = ease(tL / 0.8); p = [lerp(ACH[i][0], ACH0[i][0] + (i ? 30 : -30), q), lerp(ACH[i][1], ACH0[i][1], q)]; op = 1 - q; }
          tr(g, p[0], p[1]); g.setAttribute('opacity', f1(op));
        });
      }
      // iyon akışı
      const akis = o * (1 - ib);
      if (dt > 0) {
        acc += dt * 2.4 * akis;
        while (acc >= 1) {
          acc -= 1;
          const sx = (Math.random() - 0.5) * 90, ex = (Math.random() - 0.5) * 110;
          const P = T.ic ? [[CX + sx, Y - 42], [CX, Y - 6], [CX, B + 6], [CX + ex, B + 52]] : [[CX + sx, B + 52], [CX, B + 6], [CX, Y - 6], [CX + ex, Y - 42]];
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('class', `f04-pt f04-${T.ion}`); g.innerHTML = SEKIL[T.ion];
          svg.querySelector('.f04-akim').appendChild(g);
          AKIM.push({ g, P, t: 0, say: false });
        }
        AKIM = AKIM.filter((a) => {
          a.t += dt / 1.5;
          if (a.t >= 1) { a.g.remove(); return false; }
          const p = yolda(a.P, a.t); tr(a.g, p[0], p[1]);
          a.g.setAttribute('opacity', f1(clamp(Math.min(a.t / 0.12, (1 - a.t) / 0.15), 0, 1)));
          if (!a.say && a.t > 0.5) { a.say = true; gecen++; }
          return true;
        });
      }
      const d = durum();
      const acik = tip === 'vol' && d === 'vol2' ? 'inaktive' : o > 0.5 ? 'açık' : 'kapalı';
      const okuH = `<span class="f04-durum ${acik === 'açık' ? 'ok' : acik === 'inaktive' ? 'warn' : ''}">Kanal: ${acik}</span><span>Geçen iyon: <b>${gecen}</b></span>${tip === 'vol' ? `<span>Zar: ${depol ? 'depolarize (iç yüz daha pozitif)' : 'istirahat (iç yüz negatif)'}</span>` : ''}`;
      if (okuH !== sonO) { oku.innerHTML = okuH; sonO = okuH; }
      if (d !== son) { cap.innerHTML = REF(CAP[d]); son = d; }
    };
    tikla(el, (e) => {
      const b = e.target.closest('[data-t]'); if (b) { if (b.dataset.t !== tip) { tip = b.dataset.t; kur(); } return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'dep') { depol = !depol; tA = 0; if (!depol) oldu = true; a.textContent = depol ? 'Repolarize et' : 'Depolarize et'; }
      if (a.dataset.a === 'ach' && (ach === 0 || ach === 3)) { ach = 1; tL = 0; }
    });
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="g"]'); if (!r) return; ger = +r.value / 100; el.querySelector('.o-g').textContent = '%' + r.value; });
    kur();
    return ticker(el, (dt) => {
      t += dt;
      if (tip === 'vol' && depol) tA += dt;
      if (tip === 'lig' && ach) {
        tL += dt;
        if (ach === 1 && tL >= 0.8) { ach = 2; tL = 0; } else if (ach === 2 && tL >= 3.2) { ach = 3; tL = 0; } else if (ach === 3 && tL >= 0.8) { ach = 0; tL = 0; ligBitti = true; }
        const btn = el.querySelector('[data-a="ach"]'); if (btn) btn.disabled = ach === 1 || ach === 2;
      }
      ciz(dt);
    });
  };

  /* ---------- 4. Kolaylaştırılmış difüzyon: doygunluk ---------- */
  VIZ.f04_kolay = (el) => {
    const TC = 1.15, KM = 3, KON = 1 / (KM * TC), PS = 0.04, Y = 78, B = Y + 44, MY = Y + 22, HS = 214;
    const J = (c, n) => ((n / TC) * c) / (KM + c);
    let C = 2, N = 3, TAS = [], HAV = [], son = '';
    el.innerHTML = `<div class="f04-kol2">
        <svg class="f04-svg f04-sol" viewBox="0 0 300 ${HS}" role="img" aria-label="Zardaki taşıyıcı proteinler glukozu hücre içine taşıyor"></svg>
        <div><svg class="f04-svg f04-graf" viewBox="0 0 300 ${HS}" role="img" aria-label="Akımın konsantrasyon farkıyla değişimi: kolaylaştırılmış difüzyon doygunluğa ulaşır, basit difüzyon doğrusal ve düşüktür"></svg>
        <div class="f04-glej"><span><i class="c"></i>kolaylaştırılmış difüzyon</span><span><i class="b"></i>basit difüzyon</span><span><i class="k"></i>1–5 taşıyıcı</span></div></div>
      </div>
      <div class="f04-ctl">
        <label class="f04-rng"><span>Konsantrasyon farkı <b class="o-c"></b></span><input type="range" min="0" max="10" step="0.5" value="${C}" data-r="c"></label>
        <label class="f04-rng"><span>Zardaki taşıyıcı sayısı <b class="o-n"></b></span><input type="range" min="1" max="5" step="1" value="${N}" data-r="n"></label>
      </div>
      <div class="f04-oku"></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Model şematiktir: akım = N × C / (Km + C) / döngü süresi (Km = 3, birimler göreli); hücre içi glukoz sıfıra yakın varsayıldı. Doygunluk eğrisinin biçimi atlasın modelidir; kitap, hızın zardaki taşıyıcı miktarıyla sınırlı olduğunu söyler. [[K1 s. 15]]')}</p>`;
    const sol = el.querySelector('.f04-sol'), graf = el.querySelector('.f04-graf'), oku = el.querySelector('.f04-oku'), cap = el.querySelector('.viz-cap');
    const HP = Array.from({ length: 14 }, (_, i) => [18 + ((i * 47) % 264) + rnd(i) * 10, 24 + ((i * 19) % 36) + rnd(i + 40) * 5]);
    const zarCiz = () => {
      const xs = Array.from({ length: N }, (_, i) => 20 + (i + 0.5) * (260 / N));
      sol.innerHTML = `<rect class="f04-ecf" width="300" height="${Y + 4}"/><rect class="f04-icf" y="${B - 4}" width="300" height="${HS - B + 4}"/>
        <text class="f04-bol" x="8" y="15">ECF</text><text class="f04-bol" x="8" y="${HS - 7}">ICF</text>
        ${serit(0, 300, Y, xs.map((x) => [x - 19, x + 19]))}
        ${xs.map((x) => lob(x, MY, 'tas', 14, 60)).join('')}
        <g class="f04-havuz">${HP.map(() => pt('glu')).join('')}</g><g class="f04-akt"></g>`;
      const L = [...sol.querySelectorAll('.f04-lob')];
      TAS = xs.map((x, i) => ({ x, st: 'bos', t: 0, k: 1, g: null, el: L[i] }));
      HAV = [...sol.querySelectorAll('.f04-havuz > g')];
    };
    const GX = (c) => 44 + (c / 10) * 240, GY = (j) => 180 - (j / 4.6) * 160;
    const egri = (n) => Array.from({ length: 41 }, (_, i) => { const c = i / 4; return f1(GX(c)) + ',' + f1(GY(J(c, n))); }).join(' ');
    const grafCiz = () => {
      graf.innerHTML = `<rect class="f04-g-bg" x="44" y="20" width="240" height="160"/>
        ${[1, 2, 3, 4, 5].map((n) => `<polyline class="f04-gk" points="${egri(n)}"/>`).join('')}
        <line class="f04-gp" x1="44" x2="284" y1="${f1(GY(N / TC))}" y2="${f1(GY(N / TC))}"/>
        <text class="f04-gt" x="280" y="${f1(GY(N / TC) - 5)}" text-anchor="end">en yüksek hız</text>
        <polyline class="f04-gc" points="${egri(N)}"/>
        <line class="f04-gb" x1="${GX(0)}" y1="${GY(0)}" x2="${GX(10)}" y2="${f1(GY(PS * 10))}"/>
        <circle class="f04-gm" r="5.5"/><circle class="f04-gm b" r="4"/>
        <text class="f04-ax" x="44" y="196" text-anchor="middle">0</text><text class="f04-ax" x="164" y="196" text-anchor="middle">5</text><text class="f04-ax" x="284" y="196" text-anchor="middle">10</text>
        <text class="f04-ax" x="164" y="210" text-anchor="middle">konsantrasyon farkı (göreli)</text>
        <text class="f04-ax" x="44" y="13">akım (göreli)</text>`;
      noktala();
    };
    const noktala = () => {
      const m = graf.querySelectorAll('.f04-gm');
      m[0].setAttribute('cx', f1(GX(C))); m[0].setAttribute('cy', f1(GY(J(C, N))));
      m[1].setAttribute('cx', f1(GX(C))); m[1].setAttribute('cy', f1(GY(PS * C)));
      el.querySelector('.o-c').textContent = String(C).replace('.', ',');
      el.querySelector('.o-n').textContent = N;
      const doluluk = C / (KM + C);
      oku.innerHTML = `<span>Taşıyıcıların dolu olma oranı <b>${yuzde(doluluk)}</b></span><span>Kolaylaştırılmış akım <b>${J(C, N).toFixed(1).replace('.', ',')}</b> (en çok ${(N / TC).toFixed(1).replace('.', ',')})</span><span>Basit difüzyon <b>${(Math.round(PS * C * 100) / 100).toString().replace('.', ',')}</b></span>`;
      const c = C === 0 ? '<b>Gradyan yok.</b> Konsantrasyon farkı olmadan net taşıma olmaz: kolaylaştırılmış difüzyon da pasiftir, yalnız gradyan yönünde çalışır. [[K1 s. 15]]'
        : doluluk < 0.5 ? '<b>Düşük konsantrasyon farkı.</b> Taşıyıcıların çoğu boşta bekliyor; farkı artırmak akımı belirgin biçimde artırır. Aynı madde lipitten basit difüzyonla geçseydi akım çok daha düşük kalırdı. [[K1 s. 15]]'
          : doluluk < 0.72 ? '<b>Taşıyıcılar dolmaya başladı.</b> Eğri yatıklaşıyor: bir taşıyıcı döngüsünü bitirmeden yeni bir molekül alamaz. [[K1 s. 15]]'
            : '<b>Doygunluğa yaklaşıyor.</b> Taşıyıcıların büyük çoğunluğu meşgul; konsantrasyon farkını artırmak akımı artık çok az artırır. Akımı artırmanın yolu zardaki taşıyıcı sayısını artırmaktır: kolaylaştırılmış difüzyonun hızı taşıyıcı miktarıyla sınırlıdır. [[K1 s. 15]]';
      if (c !== son) { cap.innerHTML = REF(c); son = c; }
    };
    const havuz = (t) => { const n = Math.round(C * 1.4); HAV.forEach((g, i) => { g.setAttribute('opacity', i < n ? 1 : 0); tr(g, HP[i][0] + (RM ? 0 : 2.4 * Math.sin(t * (0.8 + rnd(i) * 0.6) + i)), HP[i][1] + (RM ? 0 : 2 * Math.cos(t * 0.9 + i * 1.7))); }); };
    const yeniGlu = (x) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'f04-pt f04-glu'); g.innerHTML = SEKIL.glu;
      sol.querySelector('.f04-akt').appendChild(g);
      return { g, x0: x + (Math.random() - 0.5) * 34, y0: Y - 34 };
    };
    let t = 0;
    const adim = (dt) => {
      TAS.forEach((c) => {
        c.t += dt;
        if (c.st === 'bos') { c.k = 1; if (C > 0 && Math.random() < 1 - Math.exp(-KON * C * dt)) { c.st = 'ice'; c.t = 0; c.g = yeniGlu(c.x); } }
        else if (c.st === 'ice') {
          const f = clamp(c.t / 0.45, 0, 1);
          c.k = lerp(1, -1, ease(clamp((f - 0.35) / 0.65, 0, 1)));
          const a = clamp(f / 0.4, 0, 1), p = f < 0.4 ? [lerp(c.g.x0, c.x, ease(a)), lerp(c.g.y0, MY - 6, ease(a))] : [c.x, lerp(MY - 6, MY + 6, ease((f - 0.4) / 0.6))];
          tr(c.g.g, p[0], p[1]); c.g.g.setAttribute('opacity', f1(clamp(f / 0.15, 0, 1)));
          if (f >= 1) { c.st = 'birak'; c.t = 0; }
        } else if (c.st === 'birak') {
          const f = clamp(c.t / 0.3, 0, 1);
          tr(c.g.g, c.x + 8 * ease(f), lerp(MY + 6, B + 42, ease(f))); c.g.g.setAttribute('opacity', f1(1 - clamp((f - 0.5) / 0.5, 0, 1)));
          if (f >= 1) { c.g.g.remove(); c.g = null; c.st = 'don'; c.t = 0; }
        } else if (c.st === 'don') {
          const f = clamp(c.t / 0.4, 0, 1); c.k = lerp(-1, 1, ease(f));
          if (f >= 1) { c.st = 'bos'; c.t = 0; }
        }
        lobAc(c.el, c.x, MY, c.k);
      });
    };
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'c') { C = +r.value; noktala(); havuz(t); }
      else { N = +r.value; zarCiz(); grafCiz(); havuz(t); }
    });
    zarCiz(); grafCiz(); havuz(0);
    TAS.forEach((c) => lobAc(c.el, c.x, MY, 1));
    return ticker(el, (dt) => { if (RM) return; t += dt; havuz(t); adim(dt); });
  };

  /* ---------- 5. Sekonder aktif taşıma: primer aktif taşımaya bağımlılık ---------- */
  VIZ.f04_sekonder = (el) => {
    const k = 0.78, TK = 44 * k, YA = 56, YB = 190, MA = YA + TK / 2, MB = YB + TK / 2, xS = 112, xP = 112, xG = 254, H = 296;
    // Na⁺ girişinin çoğu başka yollardan (sızıntı terimi), küçük bir kısmı SGLT-2'den; normalde hücre içi Na⁺ ≈ lümenin %10'u
    const GL = 0.4, S0 = 0.12, VP = 1.92, KP = 0.3, J0 = 0.48;
    let Na = 0.1, atp = true, inh = false, accS = 0, accP = 0, t = 0, son = '', flash = 0;
    el.innerHTML = `<div class="f04-sek2">
        <svg class="f04-svg" viewBox="0 0 360 ${H}" role="img" aria-label="Proksimal tübül hücresi: apikal zarda SGLT-2, bazolateral zarda Na⁺/K⁺-ATPaz ve GLUT-2">
          <rect class="f04-ecf" width="360" height="${YA + 4}"/><rect class="f04-icf" y="${f1(YA + TK - 4)}" width="360" height="${f1(YB - YA - TK + 8)}"/><rect class="f04-ecf" y="${f1(YB + TK - 4)}" width="360" height="${f1(H - YB - TK + 4)}"/>
          <text class="f04-bol" x="10" y="17">Tübül lümeni</text><text class="f04-bol" x="350" y="${f1(YA + TK + 17)}" text-anchor="end">Tübül hücresi (ICF)</text><text class="f04-bol" x="10" y="${H - 8}">İnterstisyum ve kan</text>
          ${serit(0, 360, YA, [[xS - 22, xS + 22]], k)}
          ${serit(0, 360, YB, [[xP - 22, xP + 22], [xG - 22, xG + 22]], k)}
          ${lob(xS, MA, 'tas', 16, 50)}${lob(xP, MB, 'pompa', 16, 50)}${lob(xG, MB, 'tas2', 16, 50)}
          <text class="f04-plbl" x="${xS + 26}" y="${MA + 4}">SGLT-2</text><text class="f04-plbl" x="${xP + 26}" y="${MB + 4}">Na⁺/K⁺-ATPaz</text><text class="f04-plbl" x="${xG + 26}" y="${MB + 4}">GLUT-2</text>
          <text class="f04-plbl m" x="10" y="${MA + 4}">apikal zar</text><text class="f04-plbl m" x="10" y="${MB + 4}">bazolateral</text>
          <g class="f04-atp f04-atp-s" transform="translate(${xP + 52},${YB - 16})"><rect x="-24" y="-8.5" width="48" height="17" rx="8.5"/><text y="3.8" text-anchor="middle">ATP</text></g>
          <g class="f04-arka"></g><g class="f04-hna"></g><g class="f04-kan"></g><g class="f04-akt"></g>
        </svg>
        <div class="f04-yan">
          <div class="f04-bars">${['Hücre içi Na⁺ (lümene göre)', 'Na⁺ gradyanı (lümen → hücre)', 'SGLT-2 ile glukoz girişi', 'Na⁺/K⁺-ATPaz hızı'].map((a, i) => `<div class="f04-bar"><span>${a}<b data-v="${i}"></b></span><span class="trk"><i data-i="${i}"></i></span></div>`).join('')}</div>
          <div class="btn-row"><button type="button" class="btn" data-a="atp">ATP'yi kes</button><button type="button" class="btn ghost" data-a="inh">SGLT-2 inhibitörü ekle</button><button type="button" class="btn ghost" data-a="sif">Sıfırla</button></div>
          ${lejant(['na', 'k', 'glu'])}
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model: Na⁺ konsantrasyonu lümene göre göreli, zaman ölçeği kısaltılmıştır. SGLT-2 ve GLUT-2 düzeni kitaptandır [[K1 s. 16]]; Na⁺/K⁺-ATPaz\'ın bazolateral zarda bulunması ve SGLT-2 inhibitörü düğmesi Atlas notudur.')}</p>`;
    const svg = el.querySelector('svg'), cap = el.querySelector('.viz-cap'), akt = svg.querySelector('.f04-akt'), atpG = svg.querySelector('.f04-atp-s');
    const HAR = arkaPlan(svg.querySelector('.f04-arka'), { na: [8, 0], glu: [3, 5], k: [0, 6] }, { e: [150, 12, 350, 44], i: [150, 122, 350, 176] }, null, 21);
    const hNa = arkaPlan(svg.querySelector('.f04-hna'), { na: [0, 8] }, { e: [0, 0, 1, 1], i: [24, 112, 232, 158] }, [xP - 30, xP + 30], 23);
    const KANP = arkaPlan(svg.querySelector('.f04-kan'), { na: [8, 0], k: [2, 0], glu: [2, 0] }, { e: [150, YB + TK + 14, 350, H - 24], i: [0, 0, 1, 1] }, null, 27);
    const ucan = [];
    const firlat = (tip, P, sure) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `f04-pt f04-${tip}`); g.innerHTML = SEKIL[tip]; akt.appendChild(g);
      ucan.push({ g, P, sure, t: 0 });
    };
    const R = () => Math.random();
    const model = (dt) => {
      const Js = inh ? 0 : S0 * clamp((1 - Na) / 0.9, 0, 1.2);
      const Jin = GL * (1 - Na) + Js, Jp = atp ? (VP * Na) / (Na + KP) : 0;
      Na = clamp(Na + (Jin - Jp) * dt * 0.5, 0.01, 1);
      return { Js, Jp };
    };
    const ciz = (dt) => {
      const { Js, Jp } = model(dt);
      t += dt;
      titret(HAR, t); titret(hNa, t); titret(KANP, t);
      const nV = Math.round(clamp(Na, 0, 1) * 8);
      hNa.forEach((p, i) => p.el.setAttribute('opacity', i < Math.max(1, nV) ? 1 : 0));
      if (dt > 0 && !RM) {
        accS += dt * 1.1 * (Js / S0); accP += dt * 0.8 * (Jp / J0);
        while (accS >= 1) {
          accS -= 1;
          firlat('na', [[xS - 30 + R() * 14, 22 + R() * 10], [xS - 5, MA - 10], [xS - 5, MA + 10], [xS - 40 - R() * 40, 128 + R() * 40]], 1.7);
          firlat('glu', [[xS + 30 + R() * 16, 26 + R() * 10], [xS + 5, MA - 10], [xS + 5, MA + 10], [200, 140], [xG, MB - 12], [xG, MB + 12], [xG + 20 - R() * 40, 262 + R() * 14]], 3.8);
        }
        while (accP >= 1) {
          accP -= 1; flash = 0.35;
          [0, 1, 2].forEach((i) => firlat('na', [[xP - 26 + i * 12 + R() * 6, 150 + R() * 10], [xP - 6 + i * 6, MB - 10], [xP - 6 + i * 6, MB + 12], [xP - 34 + i * 22, 262 + R() * 10]], 1.7));
          [0, 1].forEach((i) => firlat('k', [[xP - 18 + i * 36, 270 + R() * 8], [xP - 3 + i * 6, MB + 12], [xP - 3 + i * 6, MB - 10], [xP - 40 + i * 70, 150 + R() * 14]], 1.7));
        }
      }
      for (let i = ucan.length - 1; i >= 0; i--) {
        const u = ucan[i]; u.t += dt / u.sure;
        if (u.t >= 1) { u.g.remove(); ucan.splice(i, 1); continue; }
        const p = yolda(u.P, u.t); tr(u.g, p[0], p[1]); u.g.setAttribute('opacity', f1(clamp(Math.min(u.t / 0.08, (1 - u.t) / 0.12), 0, 1)));
      }
      flash = Math.max(0, flash - dt);
      atpG.classList.toggle('yok', !atp); atpG.classList.toggle('on', flash > 0);
      atpG.querySelector('text').textContent = atp ? 'ATP' : 'ATP yok';
      const V = [Na, (1 - Na) / 0.9, Js / S0, Jp / J0];
      el.querySelectorAll('.f04-bar i').forEach((b, i) => { b.style.width = (clamp(V[i], 0, 1) * 100).toFixed(1) + '%'; });
      el.querySelectorAll('.f04-bar [data-v]').forEach((b, i) => { b.textContent = yuzde(V[i]); });
      let c;
      if (!atp) c = Na < 0.8 ? '<b>Pompa durdu.</b> ATP olmadan Na⁺ dışarı atılamaz: hücre içi Na⁺ yükselir, Na⁺ gradyanı azalır ve SGLT-2 yavaşlar. Taşıyıcı ATP kullanmaz, ama çalışması ATP tüketen primer aktif taşımaya bağlıdır. [[K1 s. 16]]' : '<b>Gradyan kayboldu.</b> Hücre içi Na⁺ lümendekine yaklaştı; Na⁺\'nın içeri doğru itici gücü kalmadığı için glukoz da SGLT-2 ile hücreye giremiyor. Sekonder aktif taşıma, primer aktif taşıma olmadan sürmez. [[K1 s. 16]]';
      else if (inh) c = '<b>SGLT-2 inhibitörü (Atlas notu).</b> Pompa çalışıyor, Na⁺ gradyanı korunuyor; ama taşıyıcı engellendiği için glukoz bu hücreye giremez, lümende kalır ve idrarla atılır (glukozüri). Gliflozinlerin etki mekanizması budur.';
      else if (Na > 0.16) c = '<b>ATP geri geldi.</b> Na⁺/K⁺-ATPaz Na⁺\'yı yeniden dışarı atıyor; hücre içi Na⁺ düştükçe gradyan kuruluyor ve SGLT-2 hızlanıyor. [[K1 s. 16]]';
      else c = '<b>Normal çalışma.</b> Bazolateral Na⁺/K⁺-ATPaz hücre içi Na⁺\'yı düşük tutar. Lümendeki yüksek Na⁺ ile hücredeki düşük Na⁺ arasındaki gradyan, SGLT-2\'nin glukozu Na⁺ ile birlikte apikal zardan içeri almasını sağlar. Glukoz bazolateral zardaki GLUT-2\'den, ATP gerektirmeyen kolaylaştırılmış difüzyonla kana geçer. [[K1 s. 16]]';
      if (c !== son) { cap.innerHTML = REF(c); son = c; }
    };
    tikla(el, (e) => {
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'atp') atp = !atp;
      if (a.dataset.a === 'inh') inh = !inh;
      if (a.dataset.a === 'sif') { atp = true; inh = false; Na = 0.1; }
      el.querySelector('[data-a="atp"]').textContent = atp ? 'ATP\'yi kes' : 'ATP\'yi geri ver';
      el.querySelector('[data-a="inh"]').textContent = inh ? 'İnhibitörü çıkar' : 'SGLT-2 inhibitörü ekle';
      el.querySelector('[data-a="inh"]').setAttribute('aria-pressed', String(inh));
      el.querySelector('[data-a="atp"]').setAttribute('aria-pressed', String(!atp));
      if (RM) ciz(0);
    });
    ciz(0);
    return ticker(el, ciz);
  };

  /* ---------- 6. Veziküler taşıma ---------- */
  VIZ.f04_vezikul = (el) => {
    const W = 360, H = 250, R = 26, CX = 180;
    const duz = (Y) => `M-10 ${Y}H${W + 10}`;
    const cukur = (Y, c, dir) => { const h = Math.sqrt(Math.max(0, R * R - c * c)); return `M-10 ${Y}H${f1(CX - h)}A${R} ${R} 0 ${c > 0 ? 1 : 0} ${dir > 0 ? 0 : 1} ${f1(CX + h)} ${Y}H${W + 10}`; };
    const psodo = (Y, Pc, Ri, Ro, g) => {
      const bb = Math.acos(clamp((Pc - Y) / Ro, -1, 1)), a = Math.PI * (1 - g);
      if (a >= bb - 0.01) return duz(Y);
      const s = Math.sin, co = Math.cos, tp = (Ro - Ri) / 2;
      const P = (r, ang, sg) => `${f1(CX + sg * r * s(ang))} ${f1(Pc - r * co(ang))}`;
      return `M-10 ${Y}H${f1(CX - Ro * s(bb))}A${Ro} ${Ro} 0 0 1 ${P(Ro, a, -1)}A${tp} ${tp} 0 0 1 ${P(Ri, a, -1)}A${Ri} ${Ri} 0 ${a < Math.PI / 2 ? 1 : 0} 0 ${P(Ri, a, 1)}A${tp} ${tp} 0 0 1 ${P(Ro, a, 1)}A${Ro} ${Ro} 0 0 1 ${f1(CX + Ro * s(bb))} ${Y}H${W + 10}`;
    };
    const tumsek = (Y, Pcb, Ro) => { const d = Y - Pcb; if (d <= -Ro + 0.5) return duz(Y); const h = Math.sqrt(Math.max(0, Ro * Ro - d * d)); return `M-10 ${Y}H${f1(CX - h)}A${Ro} ${Ro} 0 ${Pcb < Y ? 1 : 0} 1 ${f1(CX + h)} ${Y}H${W + 10}`; };
    const yukari = (d) => `${d}L${W + 10} -10L-10 -10Z`, asagi = (d) => `${d}L${W + 10} ${H + 10}L-10 ${H + 10}Z`;
    const IC = [[-9, -6], [8, -9], [2, 8], [-12, 7], [13, 5], [-2, -14], [0, 0]]; // vezikül içi konumlar
    const MOD = {
      fago: { ad: 'Fagositoz', sure: 6.2, as: [[0, 'Parçacık hücreye yaklaşır'], [0.8, 'Zar parçacığın çevresini sarar'], [3.4, 'Fagozom oluşur ve içeri taşınır']],
        cap: '<b>Fagositoz.</b> Mikroplar (bakteri, virüs), hücreler ve hücre artıkları gibi parçacıkların endositozla alınmasıdır. Nötrofiller ve makrofajlar mikropları bu yolla yutar ve öldürür (Bölüm 75). Çizimdeki psödopod sarması Atlas notudur. [[K1 s. 17]]' },
      pino: { ad: 'Pinositoz', sure: 6, as: [[0, 'Makromoleküller zar yüzeyinde'], [1, 'Çukur oluşur'], [2.4, 'Zar maddeyi sarar'], [3.6, 'Vezikül oluşur, içeri taşınır']],
        cap: '<b>Pinositoz.</b> Makromoleküllerin endositozla alınmasıdır. Vezikül maddeyle birlikte az miktarda ECF\'yi de içeri taşır (küçük noktalar). Kitabın örneği anne sütündeki IgA\'nın yenidoğan bağırsağında zardan geçişidir (Atlas notu: insanda sütteki IgA büyük ölçüde emilmez, bağırsak lümeninde korur). [[K1 s. 16–17]]' },
      res: { ad: 'Reseptör aracılı', sure: 6.4, as: [[0, 'Madde reseptörüne bağlanır'], [1.4, 'Çukur oluşur'], [2.8, 'Zar kompleksi sarar'], [4, 'Vezikül oluşur, içeri taşınır']],
        cap: '<b>Reseptör aracılı endositoz.</b> Madde önce zarın dış yüzündeki reseptörüne bağlanır; reseptör–madde kompleksi endositozla içeri alınır. Demir ve kolesterol bu yolla taşınır. [[K1 s. 17]]' },
      ekzo: { ad: 'Ekzositoz', sure: 5.8, as: [[0, 'Vezikül zara yaklaşır'], [1.4, 'SNARE proteinleriyle kenetlenir'], [2.2, 'Zarla kaynaşır'], [3.2, 'İçerik ECF\'ye salınır']],
        cap: '<b>Ekzositoz.</b> Endositozun tersidir ve o da enerji tüketir: vezikül zara ulaşır, SNARE adı verilen protein etkileşimleriyle fosfolipit çift tabakayla kaynaşır ve içeriğini ECF\'ye bırakır. Nörotransmiterler ve hormonlar bu yolla salınır. [[K1 s. 17]]' },
      trans: { ad: 'Transsitoz', sure: 8, as: [[0, 'Bir yüzde endositoz'], [3.2, 'Vezikül hücreyi geçer'], [4.8, 'Öbür yüzde ekzositoz']],
        cap: '<b>Transsitoz.</b> Madde hücrenin bir yüzünde endositozla alınır, vezikül içinde hücreyi geçer ve öbür yüzde ekzositozla bırakılır. [[K1 s. 17]]' },
    };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Veziküler taşıma tipi">${Object.entries(MOD).map(([id, m]) => `<button type="button" data-v="${id}" aria-pressed="false">${m.ad}</button>`).join('')}</div><button type="button" class="btn ghost play">Baştan oynat</button></div>
      <div class="f04-vez">
        <svg class="f04-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Veziküler taşımanın adımları"></svg>
        <ol class="f04-asama"></ol>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim: zar kalınlığı ve vezikül boyutu ölçekli değildir; adımlar kitaptaki tanımlara göredir. Fagositozdaki psödopodlar Atlas notudur. [[K1 s. 16–17]]')}</p>`;
    const svg = el.querySelector('svg'), asama = el.querySelector('.f04-asama'), cap = el.querySelector('.viz-cap');
    let mod = 'pino', T = 0, run = !RM, Q = {};
    const zar = (cls = '') => `<path class="f04-zd ${cls}"/><path class="f04-zi ${cls}"/>`;
    const kur = () => {
      const m = MOD[mod];
      el.querySelectorAll('[data-v]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === mod)));
      const tr2 = mod === 'trans';
      const icerik = mod === 'fago' ? '<rect class="f04-bak" x="-16" y="-9.5" width="32" height="19" rx="9.5"/><circle class="f04-bak-i" cx="-6" r="2.2"/><circle class="f04-bak-i" cx="6" cy="2" r="2.2"/>'
        : mod === 'ekzo' ? IC.slice(0, 6).map(() => '<circle class="f04-nt" r="3.4"/>').join('')
          : mod === 'res' ? [0, 1, 2].map(() => '<g class="f04-res"><path d="M0 0V-8M0 -8L-4.5 -12.5M0 -8L4.5 -12.5"/></g><circle class="f04-ligd" r="3.6"/>').join('')
            : [0, 1, 2].map(() => '<ellipse class="f04-mak" rx="6" ry="4"/>').join('') + (mod === 'pino' ? [0, 1, 2, 3].map(() => '<circle class="f04-svd" r="2"/>').join('') : '');
      svg.innerHTML = `<rect class="f04-icf" width="${W}" height="${H}"/>
        <path class="f04-ecf e1"/>${tr2 ? '<path class="f04-ecf e2"/>' : ''}
        <g class="f04-vz" opacity="0"><circle class="f04-ecf"/><circle class="f04-zd"/><circle class="f04-zi"/></g>
        <g class="f04-z1">${zar()}</g>${tr2 ? `<g class="f04-z2">${zar()}</g>` : ''}
        <g class="f04-snare" opacity="0"><path d="M${CX - 10} 0l-3 3 6 3-6 3 6 3-3 3M${CX + 10} 0l-3 3 6 3-6 3 6 3-3 3"/></g>
        <g class="f04-ic">${icerik}</g>
        <text class="f04-bol" x="10" y="17">${tr2 ? 'ECF (bir yüz)' : 'Hücre dışı (ECF)'}</text>
        <text class="f04-bol" x="10" y="${tr2 ? 136 : H - 8}">Hücre içi (ICF)</text>${tr2 ? `<text class="f04-bol" x="10" y="${H - 8}">ECF (öbür yüz)</text>` : ''}`;
      Q = { e1: svg.querySelector('.e1'), e2: svg.querySelector('.e2'), z1: [...svg.querySelectorAll('.f04-z1 path')], z2: [...svg.querySelectorAll('.f04-z2 path')], vz: svg.querySelector('.f04-vz'), vc: [...svg.querySelectorAll('.f04-vz circle')], sn: svg.querySelector('.f04-snare'), ic: [...svg.querySelector('.f04-ic').children] };
      asama.innerHTML = m.as.map(([, a]) => `<li>${a}</li>`).join('');
      cap.innerHTML = REF(m.cap);
      T = RM ? m.sure : 0; run = !RM;
      ciz();
    };
    const zarYaz = (P, d) => P.forEach((p) => p.setAttribute('d', d));
    const vez = (x, y, r, op = 1) => { Q.vz.setAttribute('opacity', op); Q.vc.forEach((c) => { c.setAttribute('cx', f1(x)); c.setAttribute('cy', f1(y)); c.setAttribute('r', r); }); };
    const ciz = () => {
      const m = MOD[mod];
      let si = 0; m.as.forEach(([ta], i) => { if (T >= ta) si = i; });
      [...asama.children].forEach((li, i) => { li.classList.toggle('on', i === si); li.classList.toggle('gec', i < si); });
      Q.vz.setAttribute('opacity', 0);
      if (mod === 'pino' || mod === 'res' || mod === 'trans') {
        const Y = mod === 'trans' ? 66 : 96, d0 = mod === 'res' ? 0.4 : 0, tP = 3.6 + d0 - (mod === 'trans' ? 0.4 : 0);
        const t1 = (mod === 'trans' ? 1 : 1 + d0), t2 = t1 + (mod === 'trans' ? 1.2 : 1.4), cm = 0.985 * R;
        let c = -R; if (T > t1) c = T < t2 ? lerp(-R, 0, ease((T - t1) / (t2 - t1))) : lerp(0, cm, ease((T - t2) / (tP - t2)));
        let mx = CX, my;
        if (T < tP) { zarYaz(Q.z1, cukur(Y, c, 1)); Q.e1.setAttribute('d', yukari(cukur(Y, c, 1))); my = Y + c; }
        else {
          zarYaz(Q.z1, duz(Y)); Q.e1.setAttribute('d', yukari(duz(Y)));
          if (mod === 'trans') {
            const Y2 = 196;
            if (T < 4.8) { my = lerp(Y + cm, Y2 - cm, ease((T - tP) / (4.8 - tP))); vez(mx, my, R); zarYaz(Q.z2, duz(Y2)); Q.e2.setAttribute('d', asagi(duz(Y2))); }
            else { const c2 = lerp(cm, -R, ease((T - 4.8) / 1.4)); my = Y2 - c2; zarYaz(Q.z2, cukur(Y2, c2, -1)); Q.e2.setAttribute('d', asagi(cukur(Y2, c2, -1))); }
          } else { my = lerp(Y + cm, Y + 110, ease((T - tP) / 1.6)); vez(mx, my, R); }
        }
        if (mod === 'trans' && T < tP) { zarYaz(Q.z2, duz(196)); Q.e2.setAttribute('d', asagi(duz(196))); }
        const sal = mod === 'trans' ? ease((T - 5.0) / 1.6) : 0;
        if (mod === 'res') {
          const kum = ease((T - 0.1) / 1.2), lb = ease((T - 0.2) / 1.0);
          const DAG = [80, 175, 285];
          [0, 1, 2].forEach((i) => {
            const th = (i - 1) * 0.66, rr = R - 5;
            const ax = mx + rr * Math.sin(th), ay = my + rr * Math.cos(th);
            const x = lerp(DAG[i], ax, kum), y = lerp(Y - 5, ay, kum), rot = lerp(0, (-th * 180) / Math.PI, kum);
            Q.ic[i * 2].setAttribute('transform', `translate(${f1(x)},${f1(y)}) rotate(${f1(rot)})`);
            const tx = x + 15 * Math.sin((rot * Math.PI) / 180), ty = y - 15 * Math.cos((rot * Math.PI) / 180);
            const l0 = [DAG[i] + (i - 1) * 18, 20 + i * 9];
            Q.ic[i * 2 + 1].setAttribute('cx', f1(lerp(l0[0], tx, lb))); Q.ic[i * 2 + 1].setAttribute('cy', f1(lerp(l0[1], ty, lb)));
          });
        } else {
          Q.ic.forEach((e, i) => {
            const [ox, oy] = IC[i % IC.length], x0 = mx + ox, y0 = my + oy;
            const x = lerp(x0, CX + (i - (Q.ic.length - 1) / 2) * 26, sal), y = lerp(y0, 214 + (i % 2) * 12, sal);
            e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y));
            e.setAttribute('opacity', f1(clamp(T / 0.5, 0, 1)));
          });
        }
      } else if (mod === 'fago') {
        const Y = 132, Ri = 24, Ro = 37, Pc = Y - 26;
        let px = CX, py;
        if (T < 0.8) { zarYaz(Q.z1, duz(Y)); Q.e1.setAttribute('d', yukari(duz(Y))); py = lerp(26, Pc, ease(T / 0.8)); }
        else if (T < 3.4) { const g = lerp(0.2, 0.97, ease((T - 0.8) / 2.6)), d = psodo(Y, Pc, Ri, Ro, g); zarYaz(Q.z1, d); Q.e1.setAttribute('d', yukari(d)); py = Pc; }
        else { const f = ease((T - 3.4) / 1.6), d = tumsek(Y, lerp(Pc, Y + Ro, f), Ro); zarYaz(Q.z1, d); Q.e1.setAttribute('d', yukari(d)); py = lerp(Pc, Y + 74, f); vez(CX, py, Ri); }
        Q.ic.forEach((e) => e.setAttribute('transform', `translate(${f1(px)},${f1(py)})`));
      } else if (mod === 'ekzo') {
        const Y = 100, cm = 0.985 * R, dock = Y + R + 16;
        let my, sal = 0;
        if (T < 1.4) my = lerp(Y + 132, dock, ease(T / 1.4));
        else if (T < 2.2) my = dock;
        else if (T < 2.8) my = lerp(dock, Y + cm, ease((T - 2.2) / 0.6));
        if (T < 2.8) { zarYaz(Q.z1, duz(Y)); Q.e1.setAttribute('d', yukari(duz(Y))); vez(CX, my, R); }
        else { const c = lerp(cm, -R, ease((T - 2.8) / 1.2)); my = Y + c; zarYaz(Q.z1, cukur(Y, c, 1)); Q.e1.setAttribute('d', yukari(cukur(Y, c, 1))); sal = ease((T - 3.0) / 1.7); }
        Q.sn.setAttribute('opacity', T < 1.4 ? 0 : T < 2.8 ? f1(clamp((T - 1.4) / 0.4, 0, 1)) : 0);
        Q.sn.setAttribute('transform', `translate(0,${f1(Y + 2)})`);
        Q.ic.forEach((e, i) => {
          const [ox, oy] = IC[i], x = lerp(CX + ox, CX + (i - 2.5) * 34, sal), y = lerp(my + oy, 30 + (i % 3) * 16, sal);
          e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y));
        });
      }
    };
    tikla(el, (e) => {
      const b = e.target.closest('[data-v]'); if (b) { if (b.dataset.v !== mod) { mod = b.dataset.v; kur(); } return; }
      if (e.target.closest('.play')) { T = 0; run = true; ciz(); }
    });
    kur();
    return ticker(el, (dt) => { if (!run) return; T = Math.min(MOD[mod].sure, T + dt); if (T >= MOD[mod].sure) run = false; ciz(); });
  };
})();
