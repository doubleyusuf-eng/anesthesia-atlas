/* Diüretikler · K3, Türkçe çalışma çevirisi, s. 328–333. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortada = { a: 'middle', c: 'b' };
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(ad => ({ d: ad, ad })),
  });

  const yerler = {
    Tiyazid: 'Tiyazidler erken distal tübülde Na⁺ ve Cl⁻ geri emilimini azaltır. [[K3 s. 328]]',
    Loop: 'Etki kalın çıkan kolda güçlü, erken distal tübülde daha zayıftır. [[K3 s. 330]]',
    Amilorid: 'Amilorid distal kıvrımlı tübülde Na⁺/K⁺ değişimini engeller. [[K3 s. 331]]',
    Spironolakton: 'Spironolakton distal tübülde aldosteronun etkisini azaltır. [[K3 s. 331]]',
    Mannitol: 'Glomerülden serbestçe süzülen mannitol tübülde geri emilmez ve filtratın osmolalitesini artırır. [[K3 s. 332]]',
    Asetazolamid: 'Asetazolamid proksimal tübülde karbonik anhidrazı inhibe eder. [[K3 s. 333]]',
  };

  VIZ.a22_yer = (el) => SEKIL.sahne(el, {
    baslik: 'Diüretiklerin nefrondaki etki yerleri', vb: [640, 255], vbDar: [360, 255],
    secenek: secim('İlaç grubu', Object.keys(yerler)),
    metin: p => yerler[p.secili],
    ciz: (S, t, { secili }) => {
      const x = v => v * S.w / 360;
      const filtre = secili === 'Mannitol';
      const distal = ['Amilorid', 'Spironolakton'].includes(secili);
      const loop = secili === 'Loop';
      function segment(yol, etkin, ikincil = false) {
        const pts = yol.map(([a, b]) => [x(a), b]);
        let svg = S.cizgi(pts, { renk: etkin ? 'accent' : 'muted', w: etkin ? 10 : 5 });
        if (ikincil) svg += S.cizgi(pts, { renk: 'accent', w: 5, kesik: true });
        if (filtre) svg += S.cizgi(pts, { renk: 'basic', w: 3, kesik: true });
        return svg;
      }
      const etiket = (a, b, ad, etkin, hiza = 'middle') =>
        S.t(x(a), b, ad, { a: hiza, c: etkin ? 'b k' : 'k', renk: etkin ? 'accent' : 'ink', lh: 19 });
      let svg = segment([[40,76],[53,68],[60,83],[70,66],[80,82],[89,70],[101,78],[107,99]], secili === 'Asetazolamid');
      svg += segment([[107,99],[111,179],[119,202],[129,212],[145,214],[156,203],[162,182]], false);
      svg += segment([[162,182],[174,103],[181,76]], loop);
      svg += segment([[181,76],[190,58],[200,54],[209,67],[220,70]], secili === 'Tiyazid', loop);
      svg += segment([[220,70],[233,62],[242,79],[254,63],[266,77],[277,69],[291,81],[321,81]], distal);
      svg += segment([[321,61],[321,208]], false);
      svg += S.daire(x(27), 76, 17, { renk: filtre ? 'accent' : 'muted', dolgu: filtre ? 'accent-soft' : 'paper', w: filtre ? 4 : 2 });
      svg += S.cizgi([[x(18),79],[x(22),68],[x(30),84],[x(34),69],[x(26),74],[x(20),82]], { renk: filtre ? 'accent' : 'muted' });
      return svg + etiket(8, 47, 'Glomerül', filtre, 'start')
        + etiket(9, 108, ['Proksimal', 'tübül'], secili === 'Asetazolamid', 'start')
        + etiket(97, 171, 'İnen kol', false, 'end')
        + etiket(184, 154, ['Kalın çıkan', 'kol'], loop, 'start')
        + etiket(190, 20, ['Erken distal', 'tübül'], loop || secili === 'Tiyazid')
        + etiket(261, 109, 'Distal tübül', distal)
        + etiket(350, 237, 'Toplayıcı kanal', false, 'end');
    },
  });

  // Her adımda zincirin tümü görünür. Seçili basamağın kenarı ve yazısı kalınlaşır.
  function zincir(baslik, adimlar) {
    return {
      baslik, vb: [640, 305], vbDar: [360, 305], oto: false, adimlar,
      ortak: (S, secili) => adimlar.map(({ satir }, i) => {
        const y = 8 + i * 78, etkin = secili === i;
        const orta = S.w / 2;
        const bag = i ? S.ok([[orta, y - 18], [orta, y - 4]], { renk: 'muted' }) : '';
        return bag + S.kutu(S.w * 0.06, y, S.w * 0.88, 56, {
          yazi: satir, yc: etkin ? 'b' : 'normal', lh: 21, w: etkin ? 3 : 1,
          renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper',
        });
      }).join(''),
    };
  }
  VIZ.a22_tiyazid = (el) => SEKIL.adim(el, zincir('Tiyazidlerden alkaloza giden yol', [
    { ad: 'Geri emilim', satir: ['Erken distal tübül', 'Na⁺ ve Cl⁻ geri emilimi ↓'], metin: 'Na⁺ ve Cl⁻ lümende kalınca su atılımı da artar. [[K3 s. 328]]' },
    { ad: 'Na⁺ yükü', satir: 'Distale ulaşan Na⁺ ↑', metin: 'Geri emilemeyen Na⁺ tübülün sonraki bölümüne taşınır. [[K3 s. 328]]' },
    { ad: 'İyon değişimi', satir: 'Na⁺ ile K⁺ ve H⁺ değişimi ↑', metin: 'Artan Na⁺ yükü, K⁺ ve H⁺ atılımını uyarır. [[K3 s. 328]]' },
    { ad: 'Sonuç', satir: ['Hipokalemik, hipokloremik', 'alkaloz eğilimi'], metin: 'K⁺ ve H⁺ kaybına Cl⁻ kaybı da eşlik eder. [[K3 s. 328]]' },
  ]));

  const karsilastirma = {
    'Renal kan akımı': {
      tiyazid: ['Kan akımı ↓'], loop: ['Kan akımı ↑', 'Dış kortekse', 'yönelim'],
      metin: 'Tiyazidlerle renal kan akımı azalır. [[K3 s. 329]] Loop diüretiklerle akım artar ve kan jukstaglomerüler bölgeden dış kortekse yönelir. [[K3 s. 330]]',
    },
    'Ca²⁺': {
      tiyazid: ['Atılım ↓', 'Hiperkalsemi', 'riski'], loop: ['Atılım ↑', 'Hipokalsemi', 'riski'],
      metin: 'Ca²⁺ atılımındaki azalma hiperkalsemiye, artış ise hipokalsemiye yol açabilir. [[K3 s. 329–330]]',
    },
    Glukoz: {
      tiyazid: ['Plazma glukozu', 'artma eğiliminde'], loop: ['Hiperglisemi', 'daha seyrek'],
      metin: 'Tiyazidlerle glukoz artışı özellikle diyabetiklerde belirgindir. [[K3 s. 329]] Loop diüretiklerle hiperglisemi daha seyrek görülür. [[K3 s. 330]]',
    },
    Lipitler: {
      tiyazid: ['Kolesterol ↑', 'Trigliserit ↑'], loop: ['Kolesterol ↑', 'Trigliserit ↑'],
      metin: 'Her iki grup da plazma lipitlerini yükseltir. [[K3 s. 329–330]] Loop diüretiklerle uzun tedavide düzeyler genellikle normale döner. [[K3 s. 330]]',
    },
    İşitme: {
      tiyazid: ['Kitapta', 'belirtilmez'], loop: ['Hızlı verilen', 'yüksek dozda', 'sağırlık riski'],
      metin: 'Hızlı verilen yüksek doz zaman zaman sağırlığa yol açar. [[K3 s. 330–331]] Risk böbrek yetmezliğinde ve aminoglikozid alanlarda artar. [[K3 s. 330–331]] Bumetanid furosemidden daha az ototoksiktir, ancak miyalji yapabilir. [[K3 s. 331]]',
    },
  };
  VIZ.a22_kars = (el) => SEKIL.sahne(el, {
    baslik: 'Tiyazid ve loop diüretiklerin etkileri', vb: [640, 152], vbDar: [360, 152],
    secenek: secim('Karşılaştırılacak özellik', Object.keys(karsilastirma)),
    metin: p => karsilastirma[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const veri = karsilastirma[secili], yari = S.w / 2;
      return ['Tiyazid', 'Loop'].map((ad, i) => {
        const x = i * yari + 6, orta = i * yari + yari / 2;
        return S.kutu(x, 6, yari - 12, 136, { dolgu: i ? 'clin-soft' : 'basic-soft' })
          + S.t(orta, 34, ad, ortada)
          + S.cizgi([[x + 16, 46], [x + yari - 28, 46]], { renk: 'line' })
          + S.t(orta, 74, i ? veri.loop : veri.tiyazid, { a: 'middle', lh: 24 });
      }).join('');
    },
  });

  const aldo = {
    Normal: 'Aldosteronun uyardığı Na⁺ geri emilimi, K⁺ iyonunun lümene atılması için itici güç sağlar. [[K3 s. 331]]',
    Amilorid: 'Amilorid distal tübülde Na⁺/K⁺ değişimini bloke eder ve K⁺ atılımı azalır. [[K3 s. 331]]',
    Spironolakton: 'Spironolakton aldosteronu kompetitif olarak antagonize eder ve K⁺ atılımı belirgin azalır. [[K3 s. 331]] Na⁺ geri emiliminin yalnız %2’si aldosteron kontrolündedir, bu yüzden diürez sınırlıdır. [[K3 s. 331]]',
  };
  VIZ.a22_aldo = (el) => SEKIL.sahne(el, {
    baslik: 'Distal tübülde iyon değişimi ve aldosteron', vb: [640, 214], vbDar: [360, 214],
    secenek: secim('Durum', Object.keys(aldo)), metin: p => aldo[p.secili],
    ciz: (S, t, { secili }) => {
      const x = v => v * S.w / 360;
      const amilorid = secili === 'Amilorid', spiro = secili === 'Spironolakton';
      const dur = (a, b) => S.cizgi([[x(a), b - 9], [x(a), b + 9]], { renk: 'crit', w: 4 });
      function tasima(a, b, y, bloke, renk, zayif = false) {
        const pts = [[x(a), y], [x(b), y]];
        return bloke ? S.cizgi(pts, { renk }) + dur(b, y) : S.ok(pts, { renk, w: zayif ? 2 : 4, kesik: zayif });
      }
      return S.kutu(x(98), 5, x(145), 198, { dolgu: 'basic-soft', renk: 'basic' })
        + S.t(x(49), 33, 'Lümen', ortada) + S.t(x(170), 29, ['Distal tübül', 'hücresi'], { ...ortada, lh: 20 })
        + S.t(x(301), 33, 'Kan', ortada)
        + S.t(x(45), 78, 'Na⁺', ortada) + tasima(45, amilorid ? 97 : 151, 93, amilorid, 'basic', spiro)
        + S.t(x(150), 146, 'K⁺', ortada) + tasima(151, amilorid ? 99 : 45, 160, amilorid, 'clin', spiro)
        + S.t(x(300), 96, 'Aldosteron', { a: 'middle', c: 'k b' })
        + tasima(312, spiro ? 243 : 207, 113, spiro, 'accent');
    },
  });

  VIZ.a22_mannitol = (el) => SEKIL.sahne(el, {
    baslik: 'Kan–beyin bariyerinden mannitol ve su geçişi', vb: [640, 210], vbDar: [360, 210],
    secenek: secim('Kan–beyin bariyeri', ['Bariyer sağlam', 'Bariyer hasarlı']),
    metin: p => p.secili === 'Bariyer sağlam'
      ? 'Mannitol plazmada kalınca artan osmolalite suyu beyinden plazmaya çeker. [[K3 s. 332]]'
      : 'Kafa travması bariyeri zedelerse mannitol beyne geçer. [[K3 s. 332]] Su da beyne yönelir ve serebral ödem artar. [[K3 s. 332]]',
    ciz: (S, t, { secili }) => {
      const hasar = secili === 'Bariyer hasarlı', orta = S.w / 2;
      const bariyer = (a, b) => S.cizgi([[orta, a], [orta, b]], { renk: 'muted', w: 5 });
      const damla = (x, y) => S.daire(x, y, 5, { renk: 'basic', dolgu: 'basic' });
      const yon = hasar ? 1 : -1;
      let svg = S.kutu(6, 5, S.w - 12, 197)
        + S.t(orta / 2, 34, 'Plazma', ortada) + S.t(orta * 1.5, 34, 'Beyin', ortada)
        + bariyer(17, hasar ? 82 : 190) + (hasar ? bariyer(116, 190) : '')
        + S.t(orta / 2, 74, 'Mannitol', { a: 'middle', renk: 'basic' });
      for (const dx of [-65, -44, -23]) svg += damla(orta + dx, 99);
      if (hasar) svg += damla(orta, 99) + damla(orta + 23, 99) + damla(orta + 44, 99);
      return svg + S.ok([[orta - yon * 69, 153], [orta + yon * 69, 153]], { renk: 'clin', w: 4 })
        + S.t(orta + yon * 70, 181, 'Su', { ...ortada, renk: 'clin' });
    },
  });

  VIZ.a22_ka = (el) => SEKIL.adim(el, zincir('Asetazolamidin böbrekte ve kanda etkisi', [
    { ad: 'Tepkime', satir: ['Karbonik anhidraz', 'CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻'], metin: 'Proksimal tübülde karbonik anhidraz, karbonik asit üzerinden H⁺ ve HCO₃⁻ oluşumunu hızlandırır. [[K3 s. 333]]' },
    { ad: 'İnhibisyon', satir: ['Asetazolamid', 'Nonkompetitif enzim inhibisyonu'], metin: 'Enzim inhibisyonuyla atılabilecek H⁺ miktarı azalır. [[K3 s. 333]]' },
    { ad: 'İdrar', satir: ['H⁺ atılımı ↓ · HCO₃⁻ geri emilmez', 'Alkali idrar'], metin: 'Bikarbonat idrarda kaldığı için idrar alkali olur. [[K3 s. 333]]' },
    { ad: 'Kan', satir: ['Hiperkloremik metabolik asidoz', 'Respiratuvar alkalozu dengeler'], metin: 'Metabolik asidoz, dağ hastalığında gelişen respiratuvar alkalozu dengeler. [[K3 s. 333]]' },
  ]));
})();
