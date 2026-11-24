/* Bakteriler ve antibiyotik tedavisinin ilkeleri · K3, Türkçe çalışma çevirisi, s. 335–342. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const gramVeri = {
    'Gram-pozitif': {
      renk: 'basic',
      k1: ['Kalın peptidoglikan duvarı', 'Dış membran yok · Mor boyanır'],
      k2: ['Duvar sentezi ilaçlarına duyarlı', 'Örnek: S. aureus, S. pneumoniae'],
      metin: 'Gram-pozitif bakteriler kristal viyole boyasını tutarak mor boyanır; kalın peptidoglikan duvarları vardır ve dış membranları yoktur. [[K3 s. 336–337]]',
    },
    'Gram-negatif': {
      renk: 'crit',
      k1: ['İnce duvar + Dış LPS membranı', 'Karşıt boya (sufenin) ile pembe'],
      k2: ['Lizis → LPS (endotoksin) salınımı', 'Aşırı sitokin yanıtı oluşturabilir'],
      metin: 'Gram-negatif bakterilerde ince peptidoglikanı lipopolisakkaritten zengin dış membran örter; lizis büyük miktarda endotoksin salarak aşırı sitokin yanıtına yol açabilir. [[K3 s. 336]]',
    },
    'Aside dirençli': {
      renk: 'warn',
      k1: ['Asit/alkol sonrası kırmızı kalır', 'Dekolorizasyona dirençlidir'],
      k2: ['Prokaryot: 30S/50S · Sterol yok', 'Ökaryottan fark → seçici toksisite'],
      metin: 'Aside dirençli basiller asit/alkol karışımıyla temastan sonra bile kırmızı boyayı tutar; prokaryot–ökaryot farkları seçici toksisitenin temelidir. [[K3 s. 335–336]]',
    },
  };
  VIZ.a23a_gram = (el) => SEKIL.sahne(el, {
    baslik: 'Bakteri boyanma grupları ve yapısal farklar',
    vb: [640, 210], vbDar: [360, 248],
    secenek: secim('Grup', Object.keys(gramVeri)),
    metin: p => gramVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = gramVeri[secili], W = S.w;
      return S.kutu(14, 14, W - 28, S.dar ? 100 : 84, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1, lh: 24 })
        + S.kutu(14, S.dar ? 128 : 112, W - 28, S.dar ? 104 : 84, { dolgu: 'paper', renk: 'line', yazi: v.k2, lh: 24 });
    },
  });

  function zincir(baslik, adimlar) {
    return {
      baslik, vb: [640, 316], vbDar: [360, 316], oto: false, adimlar,
      ortak: (S, secili) => adimlar.map(({ satir, darSatir }, i) => {
        const y = 8 + i * 78, etkin = secili === i, orta = S.w / 2;
        const bag = i ? S.ok([[orta, y - 18], [orta, y - 4]], { renk: 'muted' }) : '';
        return bag + S.kutu(S.w * 0.05, y, S.w * 0.9, 56, {
          yazi: (S.dar && darSatir) ? darSatir : satir, yc: etkin ? 'b' : 'normal', lh: 20, w: etkin ? 3 : 1,
          renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper',
        });
      }).join(''),
    };
  }

  VIZ.a23a_hedefler = (el) => SEKIL.adim(el, zincir('Antibakteriyel ilaçların dört temel etki hedefi', [
    {
      ad: 'Hücre duvarı',
      satir: ['Hücre duvarı sentezinin inhibisyonu', 'β-laktamlar · Glikopeptitler (Gram-pozitifte daha duyarlı)'],
      darSatir: ['Hücre duvarı sentezi inh.', 'β-laktamlar · Glikopeptitler'],
      metin: 'Gram-pozitifler kalın peptidoglikan tabakasına bağımlı olup dış LPS membranından yoksun olduğundan hücre duvarı sentezini bozan ilaçlara daha duyarlıdır. [[K3 s. 337]]',
    },
    {
      ad: 'Protein sentezi',
      satir: ['Protein sentezinin inhibisyonu (prokaryotik 30S / 50S)', 'Aminoglikozid · Tetrasiklin · Makrolid · Oksazolidinon'],
      darSatir: ['Protein sentezi (30S / 50S)', 'Aminogl. · Tetr. · Makr. · Oks.'],
      metin: 'Aminoglikozidler, tetrasiklinler, makrolidler ve oksazolidinonlar protein sentezini inhibe eder; prokaryot ribozomu (30S/50S) ökaryottakinden (60S/40S) farklıdır. [[K3 s. 336–338]]',
    },
    {
      ad: 'Membran',
      satir: ['Sitoplazmik membran bütünlüğünün bozulması', 'Polimiksinler · Kolistinler · Daptomisin'],
      darSatir: ['Sitoplazmik membran bozulması', 'Polimiksin · Kolistin · Dapto.'],
      metin: 'Polimiksinler, kolistinler ve daptomisin bakteri sitoplazmik membranının bütünlüğünü bozarak etkisini gösterir. [[K3 s. 338]]',
    },
    {
      ad: 'Nükleik asit',
      satir: ['Nükleik asit replikasyonunun inhibisyonu', 'Florokinolon · Sülfonamid · Rifampisin · Metronidazol'],
      darSatir: ['Nükleik asit replikasyonu inh.', 'Kinolon · Sülf. · Rif. · Metr.'],
      metin: 'Florokinolonlar, sülfonamidler, rifampisin ve metronidazol bakteri nükleik asit replikasyonunu inhibe eder. [[K3 s. 338]]',
    },
  ]));

  const pkVeri = {
    'Doku Geçişi & Atılım': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Perfüzyon ↑: beyin, böbrek, KC', 'Lipofilik metronidazol > β-laktam', 'Yalnız bağlanmamış ilaç aktiftir']
        : ['Perfüzyon ↑: beyin, böbrek, KC, kalp · ↓: tendon, d. osteomiyelit', 'Metronidazol KBB’yi geçer · Enflamasyon geçişi artırır', 'Yalnız bağlanmamış (serbest) ilaç aktiftir'],
      k2: S => S.dar
        ? ['Filtrasyon + tübüler sekresyon', 'Gentamisin idrarda yoğunlaşır', 'Safra: eritromisin, rif., klind.']
        : ['Böbrek: filtrasyon + tübüler sekresyon (probenesid ↓)', 'Gentamisin glomerüler filtrasyonla idrarda yoğunlaşır', 'Safra: eritromisin, azitromisin, moksifl., klind., rif.'],
      metin: 'Doku penetrasyonu yerel perfüzyon, kapiller bariyer (ör. KBB), protein bağlanması, lipit çözünürlüğü ve pKa’ya bağlıdır; yalnız serbest ilaç etkilidir. [[K3 s. 338–339]]',
    },
    '5 Yerel Faktör & Biyofilm': {
      renk: 'warn',
      k1: S => S.dar
        ? ['1. Düşük pH: gentamisin/eritro. ↓', '2. Hipoksi: aminoglikozid geçişi ↓', '3. Bakteri ilacı inaktive eder']
        : ['1. Düşük doku pH’ı: gentamisin ve eritromisin inaktive olur', '2. Hipoksi: aminoglikozid duvar geçişi O₂-bağımlı (↓)', '3. Bakteri maddeleri ilacı inaktive eder (ör. β-laktam)'],
      k2: S => S.dar
        ? ['4. Ca²⁺: gentamisini olumsuz etkiler', '5. Biyofilm: yabancı cisim + salgı', '   Konak & antibiyotikten korur']
        : ['4. Lokal Ca²⁺ konsantrasyonu gentamisini olumsuz etkiler', '5. Biyofilm (mikroorganizma + salgı) yabancı cisme tutunur', '   Bakterileri konaktan ve antibiyotiklerden korur'],
      metin: 'Enfeksiyon bölgesindeki düşük pH, hipoksi, bakteri enzimleri, kalsiyum düzeyi ve biyofilm antibiyotik etkinliğini azaltabilir. [[K3 s. 339]]',
    },
  };
  VIZ.a23a_yerel = (el) => SEKIL.sahne(el, {
    baslik: 'Antibiyotik farmakokinetiği ve enfeksiyon bölgesindeki yerel faktörler',
    vb: [640, 232], vbDar: [360, 290],
    secenek: secim('Konu', Object.keys(pkVeri)),
    metin: p => pkVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = pkVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 124 : 96, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 150 : 122, W - 28, S.dar ? 126 : 96, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const konsZaman = (x, p) => {
    if (p.secili === 'zaman') {
      const f1 = x >= 0.3 ? Math.max(0, 9.8 * Math.exp(-0.42 * (x - 0.3))) * (1 - Math.exp(-4.5 * (x - 0.3))) : 0;
      const f2 = x >= 5.0 ? Math.max(0, 9.8 * Math.exp(-0.42 * (x - 5.0))) * (1 - Math.exp(-4.5 * (x - 5.0))) : 0;
      return Math.min(15, f1 + f2);
    }
    return x >= 0.4 ? Math.min(15, 14.5 * Math.exp(-0.48 * (x - 0.4)) * (1 - Math.exp(-4.5 * (x - 0.4)))) : 0;
  };
  const oranUstu = (p) => {
    let n = 0;
    for (let i = 0; i <= 120; i++) {
      if (konsZaman(i * 0.1, p) > p.mik) n++;
    }
    return Math.round((n / 121) * 100);
  };
  VIZ.a23a_pd = (el) => SEKIL.grafik(el, {
    baslik: 'Zaman-bağımlı ve konsantrasyon-bağımlı öldürme profilleri (şematik)',
    vb: [640, 320], vbDar: [380, 350],
    x: { min: 0, max: 12, ad: 'Zaman (saat · şematik doz aralığı)', adimlar: [0, 3, 6, 9, 12] },
    y: { min: 0, max: 16, ad: 'Serbest düzey (şematik birim)', adimlar: [0, 4, 8, 12, 16] },
    secenek: {
      id: 'secili', ad: 'Profil',
      liste: [{ d: 'zaman', ad: 'Zaman-bağımlı (Penisilin)' }, { d: 'kons', ad: 'Konsantrasyon-bağımlı (Aminogl.)' }],
    },
    param: [{ id: 'mik', ad: 'MİK eşiği', min: 1, max: 5, adim: 1, deger: 2, birim: ' br' }],
    bolgeler: (p) => p.secili === 'kons' ? [{ x1: 0.4 + Math.log(14.5 / p.mik) / 0.48, x2: 10.5, renk: 'basic-soft', ad: 'Uzamış PAE (<MİK)' }] : [],
    yatay: (p) => [{ y: p.mik, ad: `MİK (${p.mik})`, renk: 'warn' }],
    egriler: [{
      renk: 'accent', w: 3,
      f: (x, p) => konsZaman(x, p),
    }],
    ek: (S, p, X, Y) => S.t(
      X(p.secili === 'zaman' ? 2.8 : 4.2),
      Y(p.secili === 'zaman' ? 11.2 : 11.5),
      'Serbest düzey',
      { c: 'b', renk: 'accent' }
    ),
    okuma: (p) => {
      const yuzde = oranUstu(p);
      return p.secili === 'zaman'
        ? `<b>Zaman-bağımlı bakterisidal (MİK üstü süre ≈ %${yuzde}).</b> Penisilinler ve vankomisinde daha yüksek tepe değil, MİK üzerinde geçen süre (doz aralığının ≥%50’si) belirleyicidir; minimal PAE nedeniyle sık dozlama gerekir. [[K3 s. 340–341]]`
        : `<b>Konsantrasyon-bağımlı bakterisidal (MİK üstü süre ≈ %${yuzde}).</b> Aminoglikozidler, florokinolonlar, daptomisin, kolistin ve metronidazolde yüksek Cmax öldürmeyi artırır ve MİK altına inildikten sonra uzun süreli PAE baskılanması sürer. [[K3 s. 340–341]]`;
    },
  });

  const kombVeri = {
    'Sinerjizm (β-laktam + Aminoglikozid)': {
      renk: 'ok',
      k1: ['Yavaş bakterisidal (β-laktam / glikopeptit)', '+ Standart serum düzeyinde aminoglikozid'],
      k2: ['Hücre duvarı hasarı → aminoglikozid', 'girişi artar → hızlı bakterisidal etki'],
      metin: 'Standart dozlarda yalnız bakteriyostatik düzeyde kalabilen aminoglikozid, hücre duvarını zedeleyen β-laktam veya glikopeptitlerle birleştiğinde hücre içi giriş artarak hızlı bakterisidal sinerji doğar. [[K3 s. 341]]',
    },
    'Antagonizm (Tetrasiklin + Penisilin)': {
      renk: 'crit',
      k1: ['Tetrasiklin (büyümeyi önler)', '+ Penisilin (büyüyen bakteri gerekir)'],
      k2: ['Hücre büyümesi durur → duvar zayıflatıcı', 'lizis oluşamaz → penisilin duyarlılığı ↓'],
      metin: 'Penisilinin lizis yapabilmesi için aktif büyüyen bakteri gerekir; tetrasiklin büyümeyi durdurduğu için bazı bakterilerin penisiline duyarlılığını azaltır. [[K3 s. 341]]',
    },
  };
  VIZ.a23a_komb = (el) => SEKIL.sahne(el, {
    baslik: 'Antibiyotik kombinasyonlarında sinerjizm ve antagonizm',
    vb: [640, 224], vbDar: [360, 266],
    secenek: secim('Etkileşim', Object.keys(kombVeri)),
    metin: p => kombVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = kombVeri[secili], W = S.w;
      const y1 = 14, h1 = S.dar ? 94 : 76, y2 = S.dar ? 142 : 122, h2 = S.dar ? 104 : 80;
      const d1 = S.dar ? ['β-laktam / glikopeptit', '+ Aminoglikozid (ör. gentamisin)'] : v.k1;
      const a1 = S.dar ? ['Tetrasiklin (büyüme durur)', '+ Penisilin (büyüme gerekir)'] : v.k1;
      const g1 = secili.startsWith('Sinerjizm') ? d1 : a1;
      const g2 = secili.startsWith('Sinerjizm') && S.dar ? ['Duvar hasarı → giriş artar', '→ hızlı bakterisidal etki'] : (!secili.startsWith('Sinerjizm') && S.dar ? ['Büyüme durur → lizis olmaz', '→ penisilin etkisi azalır'] : v.k2);
      return S.kutu(14, y1, W - 28, h1, { dolgu: v.renk + '-soft', renk: v.renk, yazi: g1, lh: 23 })
        + S.ok([[W / 2, y1 + h1 + 2], [W / 2, y2 - 4]], { renk: v.renk, w: 3 })
        + S.kutu(14, y2, W - 28, h2, { dolgu: 'paper', renk: 'line', yazi: g2, lh: 23 });
    },
  });
})();
