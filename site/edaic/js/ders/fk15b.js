(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const secim = (ad, degerler) => ({ id: 'secili', ad, liste: degerler.map(ad => ({ d: ad, ad })) });
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.fk15b_beer = el => SEKIL.grafik(el, {
    baslik: 'Optik kalınlığa göre geçen ışık', vb: [600, 310], vbDar: [350, 265],
    x: { min: 0, max: 3, ad: 'Optik kalınlık (εcd)', adimlar: [0, 1, 2, 3] },
    y: { min: 0, max: 1, ad: 'Geçen pay (I₁/I₀)', adimlar: [0, 0.5, 1] },
    param: [{ id: 'a', ad: 'Optik kalınlık (εcd)', min: 0, max: 3, adim: 0.1, deger: 1 }],
    egriler: [{ f: a => Math.exp(-a), renk: 'accent' }],
    dikey: p => [{ x: p.a }], noktalar: p => [{ x: p.a, y: Math.exp(-p.a) }],
    okuma: p => 'I₁/I₀ = e<sup>−' + p.a.toLocaleString('tr') + '</sup> = ' + Math.exp(-p.a).toFixed(3).replace('.', ',') + ' (yuvarlanmış). [[K6 s. 268]]',
  });

  // Nitel çizgiler yalnız sıralamayı ve kesişmeyi kodlar.
  const fark = x => x <= 805 ? (805 - x) / 155 : (805 - x) / 390;
  const spektrum = (x, tur) => 0.5 + tur * 0.32 * fark(x);
  VIZ.fk15b_spektrum = el => SEKIL.grafik(el, {
    baslik: 'Hemoglobin türlerinin göreli soğurması', vb: [600, 310], vbDar: [350, 270],
    x: { min: 650, max: 1000, ad: 'Dalga boyu (nm)', adimlar: [670, 805, 950] },
    y: { min: 0, max: 1, ad: 'Göreli sönüm (nitel)' },
    param: [{ id: 'dalga', ad: 'Dalga boyu', min: 650, max: 1000, adim: 1, deger: 805, birim: 'nm' }],
    bolgeler: () => [{ x1: 650, x2: 670 }, { x1: 940, x2: 960 }],
    egriler: [{ f: x => spektrum(x, 1), renk: 'basic' }, { f: x => spektrum(x, -1), renk: 'clin', kesik: true }],
    dikey: p => [{ x: p.dalga }],
    noktalar: p => [1, -1].map(tur => ({ x: p.dalga, y: spektrum(p.dalga, tur), renk: tur === 1 ? 'basic' : 'clin' })),
    okuma: p => p.dalga === 805 ? '805 nm’de iki türün molar sönüm katsayıları eşittir. [[K6 s. 269]]'
      : p.dalga < 805 ? 'Kesişmenin kırmızı tarafında deoksihemoglobin daha güçlü soğurur. [[K6 s. 269]]'
        : 'Kesişmenin ötesinde aynı derişimdeki deoksihemoglobin daha geçirgendir. [[K6 s. 269]]',
  });

  VIZ.fk15b_prob = el => SEKIL.cizim(el, {
    baslik: 'Parmak probunun optik yolu', giris: 'Kaynağı, ışığın geçtiği dokuyu ve karşıdaki dedektörü bulun. [[K6 s. 270–271]]',
    gorunumler: [{ ad: 'Yandan kesit', resim: 'img/fizik/15b-prob.webp', en: 1024, boy: 512, noktalar: [
      nokta(443, 179, 'Işık kaynağı', 'Kaynak parmağı kırmızı ve kızılötesi ışıkla aydınlatır. [[K6 s. 270]]'),
      nokta(437, 276, 'Parmak', 'Sistolde arter ve arteriyollerdeki kan hacmi artar. [[K6 s. 271]]'),
      nokta(445, 364, 'Fotodedektör', 'Fotodedektör parmaktan geçen ışığı algılar. [[K6 s. 270–271]]'),
      nokta(940, 264, 'Monitör bağlantısı', 'Monitör tahmini satürasyonla birlikte kalp hızını da gösterebilir. [[K6 s. 270]]'),
    ] }],
  });

  VIZ.fk15b_nabiz = el => SEKIL.sahne(el, {
    baslik: 'Kalp döngüsünde optik yol ve dedektör sinyali', vb: [480, 214], vbDar: [340, 214],
    secenek: secim('Kalp döngüsü', ['Diyastol', 'Sistol']),
    ciz: (S, t, p) => {
      const sistol = p.secili === 'Sistol', x = S.w / 2, r = sistol ? 35 : 22;
      return S.t(x, 23, 'Arter kesiti', orta) + S.daire(x, 78, r, { dolgu: 'crit-soft', renk: 'crit' })
        + S.ok([ [x - r, 78], [x + r, 78] ], { renk: 'crit', cift: true })
        + S.t(x, 139, 'Dedektöre geçen ışık', orta)
        + S.kutu(34, 158, S.w - 68, 20, { dolgu: 'paper' })
        + S.kutu(34, 158, (S.w - 68) * (sistol ? 0.48 : 0.82), 20, { dolgu: 'accent', renk: 'accent' });
    },
    metin: p => p.secili === 'Sistol' ? 'Kanla dolu yol uzar, absorbans artar ve geçen ışık azalır. [[K6 s. 271]]'
      : 'Diyastolde kanla dolu yol daha kısadır ve dedektöre daha çok ışık ulaşır. [[K6 s. 271]]',
  });

  VIZ.fk15b_nirs = el => SEKIL.cizim(el, {
    baslik: 'Alında NIRS yerleşimi', giris: 'Kaynakla iki dedektörün kortekse göre yerini inceleyin. [[K6 s. 272]]',
    gorunumler: [{ ad: 'Alından kesit', resim: 'img/fizik/15b-nirs.webp', en: 1024, boy: 437, noktalar: [
      nokta(213, 177, 'Yakın kızılötesi kaynak', 'Alındaki kaynak korteks dokusunu aydınlatır. [[K6 s. 272]]'),
      nokta(521, 185, 'Birinci dedektör', 'Deri yüzeyindeki dedektör beyinden geri saçılan ışığı alır. [[K6 s. 272]]'),
      nokta(797, 186, 'İkinci dedektör', 'İki dedektör de kaynakla aynı yüzeyde, kaynaktan birkaç santimetre uzaktadır. [[K6 s. 272]]'),
      nokta(516, 362, 'Serebral korteks', 'Probun altındaki dokudan gelen sinyale arteriyel ve venöz kan katkıda bulunur. [[K6 s. 272]]'),
    ] }],
  });

  const asamalar = [
    ['Örnek', 'Giriş portu', 'Küvet', '100 µL heparinli kan giriş portundan küvete aktarılır.'],
    ['Hemoliz', 'Küvette ultrason', 'Berrak çözelti', 'Ultrason eritrositleri parçalar ve hücre içeriği plazmaya karışır.'],
    ['Aydınlatma', 'Halojen lamba', 'Küvetteki örnek', 'Halojen lambadan gelen ışık berrak örnekten geçer.'],
    ['İletim', 'Optik lif', 'Spektrometre', 'Küvetten çıkan ışığı optik lif spektrometreye taşır.'],
    ['Ayrıştırma', 'Kırınım ağı', 'Fotodedektör dizisi', 'Ağ görünür ve yakın kızılötesi ışığı dalga boylarına ayırır, dizi her dalga boyundaki şiddeti ölçer.'],
    ['Rapor', 'Ölçülen şiddetler', 'Bilgisayarda derişim hesabı', 'Bilgisayar ölçülen şiddetlerden örnekteki hemoglobin türlerinin derişimlerini hesaplar.'],
  ];
  VIZ.fk15b_co = el => SEKIL.adim(el, {
    oto: false, baslik: 'CO-oksimetrede örneğin ve ışığın izlediği yol', vb: [460, 160], vbDar: [340, 160],
    adimlar: asamalar.map(([ad, giris, cikis, metin]) => ({
      ad, metin: metin + ' [[K6 s. 273]]',
      ciz: S => S.kutu(20, 12, S.w - 40, 46, { yazi: giris, dolgu: 'basic-soft' })
        + S.ok([ [S.w / 2, 60], [S.w / 2, 91] ], { renk: 'accent' })
        + S.kutu(20, 95, S.w - 40, 46, { yazi: cikis, dolgu: 'clin-soft' }),
    })),
  });
})();
