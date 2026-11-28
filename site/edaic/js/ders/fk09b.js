(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sayi = (v, basamak = 2) => v.toLocaleString('tr-TR', { maximumFractionDigits: basamak });
  const boyut = { vb: [640, 305], vbDar: [350, 295] };
  const eksen = (ad, min, max, adimlar) => ({ ad, min, max, adimlar });
  const oran = { min: 0.5, max: 2, adim: 0.01, deger: 1 };

  VIZ.fk09b_boyle = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'İki sıcaklıkta basınç–hacim izotermleri',
    x: eksen('Hacim oranı V/V₁', 0.5, 2, [0.5, 1, 1.5, 2]),
    y: eksen('Basınç oranı P/P₁', 0, 4, [0, 1, 2, 3, 4]),
    param: [{ ...oran, id: 'v', ad: 'Hacim oranı' }],
    egriler: [{ f: v => 1 / v, renk: 'basic' }, { f: v => 2 / v, renk: 'clin', kesik: true }],
    noktalar: p => [{ x: p.v, y: 1 / p.v, renk: 'basic' }, { x: p.v, y: 2 / p.v, renk: 'clin' }],
    okuma: p => `Seçilen hacim ilk hacmin ${sayi(p.v)} katı. [[K6 s. 166–167]] Sürekli eğride basınç referansın ${sayi(1 / p.v)} katı, iki kat mutlak sıcaklığı gösteren kesikli eğride ${sayi(2 / p.v)} katıdır. [[K6 s. 167]] [[K6 s. 172]]`,
  });

  VIZ.fk09b_tup = el => SEKIL.cizim(el, {
    baslik: 'Oksijen tüpü ve basınç göstergesi',
    giris: 'Süre hesabına giren iki büyüklüğü resim üzerinde bulun. [[K6 s. 168–169]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/fizik/09b-oksijen-tupu.webp', en: 1024, boy: 1536,
      noktalar: [
        { x: 455, y: 845, ad: 'Tüp gövdesi', metin: 'Örnekte E tipi tüpün iç hacmi 4,5 L’dir. [[K6 s. 168]]' },
        { x: 667, y: 197, ad: 'Basınç göstergesi', metin: 'Gösterge tüp basıncını bildirir, ancak okuma belirgin bir hata payı taşıyabilir. [[K6 s. 168–169]]' },
      ],
    }],
  });

  function sicaklikGrafigi(el, basinc) {
    const nicelik = basinc ? 'basınç' : 'hacim';
    const kaynak = basinc ? '[[K6 s. 172–173]]' : '[[K6 s. 170–171]]';
    return SEKIL.grafik(el, {
      ...boyut, baslik: 'Mutlak sıcaklık ve ' + nicelik,
      x: eksen('Mutlak sıcaklık oranı T/T₁', 0, 2, [0, 0.5, 1, 1.5, 2]),
      y: eksen(basinc ? 'Basınç oranı P/P₁' : 'Hacim oranı V/V₁', 0, 2, [0, 0.5, 1, 1.5, 2]),
      param: [{ ...oran, id: 't', ad: 'Mutlak sıcaklık oranı' }],
      egriler: [
        { f: t => t < oran.min ? t : NaN, kesik: true, renk: 'muted' },
        { f: t => t >= oran.min ? t : NaN },
      ],
      noktalar: p => [{ x: p.t, y: p.t }],
      okuma: p => `Mutlak sıcaklık başlangıcın ${sayi(p.t)} katına geldiğinde ${nicelik} de başlangıcın ${sayi(p.t)} katı olur. ${kaynak} Kesikli parça doğrunun mutlak sıfıra doğru matematiksel uzantısını gösterir. ${kaynak}`,
    });
  }
  VIZ.fk09b_charles = el => sicaklikGrafigi(el, false);
  VIZ.fk09b_basinc = el => sicaklikGrafigi(el, true);

  VIZ.fk09b_termometre = el => SEKIL.cizim(el, {
    baslik: 'Gazlı Bourdon termometresi',
    giris: 'Gazın bulunduğu tüpü, bağlantıyı ve sıcaklığın okunduğu kadranı bulun. [[K6 s. 171–172]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/fizik/09b-bourdon.webp', en: 1024, boy: 342,
      noktalar: [
        { x: 190, y: 297, ad: 'Gaz içeren tüp', metin: 'Sıcaklık değişimiyle tüpteki gazın genleşmesi ölçümün temelidir. [[K6 s. 171–172]]' },
        { x: 545, y: 297, ad: 'Kadran bağlantısı', metin: 'Gazı içeren tüp kadrana bağlıdır. [[K6 s. 171–172]]' },
        { x: 820, y: 145, ad: 'Kadran', metin: 'Sıcaklık kadrandan izlenir. [[K6 s. 171–172]]' },
      ],
    }],
  });

  const basincOrani = derinlik => 1 + derinlik / 10;
  const kabarcikHacmi = (derinlik, sicaklik) => 20 * basincOrani(40) / basincOrani(derinlik) * (273 + sicaklik) / 283;
  VIZ.fk09b_kabarcik = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Derinlik ve sıcaklık ile kabarcık hacmi',
    x: eksen('Derinlik (m)', 0, 40, [0, 10, 20, 40]),
    y: eksen('Hacim (mL)', 0, 104, [0, 20, 100]),
    param: [
      { id: 'd', ad: 'Derinlik', min: 0, max: 40, adim: 1, deger: 40, birim: 'm' },
      { id: 't', ad: 'Su sıcaklığı', min: 10, max: 20, adim: 1, deger: 10, birim: '°C' },
    ],
    egriler: [{ f: (d, p) => kabarcikHacmi(d, p.t) }],
    noktalar: p => [{ x: p.d, y: kabarcikHacmi(p.d, p.t) }],
    okuma: p => `${p.d} m’de mutlak basınç yüzey basıncının ${sayi(basincOrani(p.d))} katıdır. [[K6 s. 174]] Seçilen sıcaklıkta (${273 + p.t} K) kabarcık hacmi yaklaşık <b>${sayi(kabarcikHacmi(p.d, p.t), 1)} mL</b> olur. [[K6 s. 173–174]]`,
  });

  const yasalar = [
    ['Boyle', 'PV = sabit', 'T ve n sabit', 'Sıcaklık sabitken basınç ile hacmin çarpımı korunur. [[K6 s. 167]]'],
    ['Charles', 'V/T = sabit', 'P ve n sabit', 'Sıcaklığı değiştirirken basıncı korursanız hacim mutlak sıcaklıkla orantılı artar. [[K6 s. 170–171]]'],
    ['Gay-Lussac', 'P/T = sabit', 'V ve n sabit', 'Hacmi koruduğunuzda mutlak sıcaklıktaki artış basınçta aynı oranda artış doğurur. [[K6 s. 172]]'],
    ['Birleşik', 'PV/T = sabit', 'n sabit', 'Basınç, hacim ve sıcaklık birlikte değişse de gaz miktarı korununca bu oran aynıdır. [[K6 s. 173]]'],
    ['Avogadro', 'V/n = sabit', 'P ve T sabit', 'Aynı sıcaklık ve basınçta hacim gazın mol sayısıyla doğru orantılıdır. [[K6 s. 175]]'],
    ['Evrensel', 'PV = nRT', 'Gaz miktarı denklemde', 'Birleşik denklemin PV/T oranı gaz miktarıyla orantılıdır ve nR’ye eşittir. [[K6 s. 173–175]]'],
  ];
  VIZ.fk09b_yasalar = el => SEKIL.adim(el, {
    baslik: 'Sabit kalan büyüklükten gaz denklemine', vb: [640, 152], vbDar: [350, 152], oto: false,
    adimlar: yasalar.map(([ad, denklem, kosul, metin]) => ({
      ad, metin, ciz: S => S.kutu(12, 12, S.w - 24, 55, { yazi: kosul, dolgu: 'basic-soft', renk: 'basic' })
        + S.ok([ [S.w / 2, 69], [S.w / 2, 87] ], { renk: 'muted' })
        + S.kutu(12, 89, S.w - 24, 51, { yazi: denklem, dolgu: 'accent-soft', renk: 'accent' }),
    })),
  });

  const oksijenHacmi = kutle => (kutle / 32) * 8.31 * 273 / 101300 * 1000;
  VIZ.fk09b_mol = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'STP’de oksijen kütlesi ve hacmi',
    x: eksen('Oksijen kütlesi (g)', 0, 32, [0, 16, 32]),
    y: eksen('Hacim (L)', 0, 22.4, [0, 11.2, 22.4]),
    param: [{ id: 'm', ad: 'Oksijen kütlesi', min: 0, max: 32, adim: 1, deger: 32, birim: 'g' }],
    egriler: [{ f: oksijenHacmi }], noktalar: p => [{ x: p.m, y: oksijenHacmi(p.m) }],
    okuma: p => `${p.m} g O₂ ÷ (32 g/mol) = ${sayi(p.m / 32, 5)} mol. [[K6 s. 176]] 273 K ve 101,3 kPa’da bu miktar yaklaşık <b>${sayi(oksijenHacmi(p.m), 1)} L</b> yer kaplar. [[K6 s. 176–177]]`,
  });
})();
