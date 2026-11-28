(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secenek = (ad, adlar) => ({
    id: 'secim', ad, liste: adlar.map(ad => ({ ad, d: ad })),
  });
  const ortada = { a: 'middle', c: 'b' };
  VIZ.fk11a_yol = el => SEKIL.sahne(el, {
    baslik: 'Gaz ve verinin izlediği yol', vb: [640, 256], vbDar: [360, 256],
    secenek: secenek('Örnekleme yöntemi', ['Ana akım', 'Yan akım']),
    metin: ({ secim }) => secim === 'Ana akım'
      ? 'Gaz devreden geçerken dedektör ölçer, monitöre kabloyla veri gider. [[K6 s. 195]]'
      : 'Fan örneği modüle doğru çeker. [[K6 s. 196]] İnce hattan taşınan gazın derişimi birkaç saniye sonra ekrana gelir. [[K6 s. 197]]',
    ciz: (S, t, { secim }) => {
      const ana = secim === 'Ana akım', orta = S.w / 2;
      const kutular = ana
        ? ['Solunum devresi', 'Adaptördeki dedektör', 'Anestezi monitörü']
        : ['Solunum devresi', 'Su tutucu', 'Monitördeki ölçüm modülü'];
      const baglar = ana ? ['Devredeki gaz', 'Kabloda veri'] : ['Örnek hattında gaz', 'Örnek gaz'];
      return kutular.map((ad, i) => {
        const y = 10 + i * 94;
        const kutu = S.kutu(orta - 134, y, 268, 45, { yazi: ad, dolgu: i === 1 ? 'accent-soft' : 'paper' });
        if (i === 2) return kutu;
        return kutu + S.ok([[orta - 70, y + 46], [orta - 70, y + 88]], { renk: 'accent' })
          + S.t(orta - 52, y + 74, baglar[i]);
      }).join('');
    },
  });

  VIZ.fk11a_beer = el => SEKIL.grafik(el, {
    baslik: 'CO₂ derişimi ile göreli absorbans', vb: [640, 285], vbDar: [360, 258],
    x: { min: 0, max: 5, ad: 'CO₂ derişimi (hacimce %)', adimlar: [0, 5] },
    y: { min: 0, max: 1, ad: 'Göreli absorbans' },
    param: [{ id: 'c', ad: 'Hacimce CO₂', min: 0, max: 5, adim: 0.1, deger: 5, birim: '%' }],
    egriler: [{ f: c => c / 5, renk: 'accent' }],
    noktalar: p => [{ x: p.c, y: p.c / 5 }],
    dikey: p => [{ x: p.c }], yatay: p => [{ y: p.c / 5 }],
    okuma: p => 'Hacimce %' + p.c.toLocaleString('tr-TR') + ' CO₂ için absorbansın, %5 CO₂’deki absorbansa oranı %'
      + Math.round(100 * p.c / 5) + ' olur. [[K6 s. 197–198]]',
  });

  VIZ.fk11a_tepe = el => SEKIL.sahne(el, {
    baslik: 'Seçici soğurma ve çarpışma genişlemesi', vb: [640, 230], vbDar: [360, 230],
    secenek: secenek('Örnek', ['CO₂', 'CO₂ ve N₂O']),
    metin: ({ secim }) => secim === 'CO₂'
      ? 'CO₂’nin soğurma tepesi 4,28 µm dalga boyundadır. [[K6 s. 197]]'
      : 'Kesikli çizgi karşılaştırma için CO₂ tepesini gösterir. [[K6 s. 197]] Moleküller etkileştiğinde tepe genişler ve tepenin dalga boyu değişebilir. [[K6 s. 197–198]]',
    ciz: (S, t, { secim }) => {
      const mix = secim === 'CO₂ ve N₂O', left = 35, width = S.w - 55;
      const x = u => left + width * u;
      function tepe(merkez, genislik, kesik) {
        const pts = Array.from({ length: 101 }, (_, i) => {
          const u = i / 100, z = (u - merkez) / genislik;
          return [x(u), 170 - 111 * Math.exp(-z * z)];
        });
        return S.cizgi(pts, { renk: kesik ? 'muted' : 'accent', w: kesik ? 2 : 4, kesik });
      }
      return S.t(left, 22, 'Absorbans') + S.cizgi([[left, 33], [left, 175], [x(1), 175]], { renk: 'ink' })
        + tepe(0.45, 0.09, mix) + (mix ? tepe(0.51, 0.18, false) : '')
        + S.t(x(0.45), 198, '4,28 µm', ortada) + S.t(x(1), 220, 'Dalga boyu', { a: 'end' });
    },
  });

  const evreler = [
    { ad: 'A–B', metin: 'Ekspirasyon başlarken örnek haznesindeki gazların karışması CO₂ yükselişine S biçimi verir. [[K6 s. 199]]' },
    { ad: 'B–C', metin: 'Ekspiratuvar plato hafifçe yükselir ve C noktasında en yüksek derişime ulaşır. [[K6 s. 199]]' },
    { ad: 'C–D', metin: 'C’deki kesikli çizgi EtCO₂ düzeyidir. [[K6 s. 199]] İnspirasyon başlayınca CO₂ derişimi düşer. [[K6 s. 199]]' },
    { ad: 'D–E', metin: 'İnspirasyonun geri kalanında CO₂ düşük düzeyde kalır. [[K6 s. 195]] [[K6 s. 199]]' },
  ];
  VIZ.fk11a_kapno = el => SEKIL.sahne(el, {
    baslik: 'Bir solukta CO₂ derişimi ve zaman', vb: [640, 235], vbDar: [360, 235],
    secenek: secenek('Solunum evresi', evreler.map(e => e.ad)),
    metin: ({ secim }) => evreler.find(e => e.ad === secim).metin,
    ciz: (S, t, { secim }) => {
      const x = u => 30 + u * (S.w - 60);
      const noktalar = [[0, 170], [0.27, 81], [0.63, 61], [0.76, 170], [1, 170]];
      let svg = S.t(18, 22, 'CO₂ derişimi') + S.t(S.w - 14, 222, 'Zaman', { a: 'end' })
        + S.cizgi([[16, 33], [16, 184], [S.w - 14, 184]], { renk: 'ink' })
        + S.cizgi([[16, 61], [S.w - 18, 61]], { renk: 'muted', kesik: true })
        + S.t(S.w - 18, 48, 'EtCO₂', { a: 'end', c: 'b' });
      evreler.forEach((evre, i) => {
        const [a, ya] = noktalar[i], [b, yb] = noktalar[i + 1];
        const pts = Array.from({ length: 33 }, (_, k) => {
          const u = k / 32, sekil = (i === 0 || i === 2) ? u * u * (3 - 2 * u) : u;
          return [x(a + (b - a) * u), ya + (yb - ya) * sekil];
        });
        svg += S.cizgi(pts, { renk: evre.ad === secim ? 'accent' : 'muted', w: evre.ad === secim ? 6 : 3 });
      });
      return svg + noktalar.map(([u, y], i) => S.daire(x(u), y, 4, { dolgu: 'ink' })
        + S.t(x(u), y + (i === 2 ? -11 : i === 1 ? 25 : -12), 'ABCDE'[i], ortada)).join('');
    },
  });

  VIZ.fk11a_ornekcihaz = el => SEKIL.cizim(el, {
    baslik: 'Solunum devresinde ana akım ve yan akım örnekleme',
    giris: 'Ana akımda dedektör devreye takılır, yan akımda ince bir hat gazı monitöre taşır. [[K6 s. 195–196]]',
    gorunumler: [
      { ad: 'Ana akım', resim: 'img/fizik/11a-ana-akim.webp', en: 1024, boy: 683, kirp: [0, 54, 1024, 472],
        noktalar: [
          { x: 337, y: 408, ad: 'Devre adaptörü', metin: 'Solunum devresinin bu özel boru parçası dedektörü taşır. [[K6 s. 195]]' },
          { x: 509, y: 297, ad: 'Klipsli dedektör', metin: 'Dedektör adaptöre dışarıdan takılır ve ölçümü gazın geçtiği yerde yapar. [[K6 s. 195]]' },
          { x: 673, y: 97, ad: 'Veri kablosu', metin: 'Dedektör ile anestezi monitörü arasında ölçüm bilgisini taşır. [[K6 s. 195]]' },
        ] },
      { ad: 'Yan akım', resim: 'img/fizik/11a-yan-akim.webp', en: 1024, boy: 349,
        noktalar: [
          { x: 252, y: 142, ad: 'Devreden örnek alma yeri', metin: 'İnce örnek hattı solunum devresine burada bağlanır. [[K6 s. 196]]' },
          { x: 494, y: 150, ad: 'Örnek hattı', metin: 'Modül ucunda oluşturulan hafif negatif basınç gazı bu ince borudan çeker. [[K6 s. 196]]' },
          { x: 717, y: 219, ad: 'Su tutucu', metin: 'Örnekte yoğuşan suyu modüle girmeden tutar. [[K6 s. 196]]' },
          { x: 906, y: 176, ad: 'Ölçüm modülü', metin: 'Monitördeki modül, kızılötesi analizörle seri bir oksijen analizörü barındırabilecek büyüklükte olabilir. [[K6 s. 196]]' },
        ] },
    ],
  });
  VIZ.fk11a_optik = el => SEKIL.cizim(el, {
    baslik: 'Kızılötesi analizörde örnek haznesinin kesiti',
    giris: 'Işınım soldaki telden sağdaki fotodedektöre giderken filtreyi ve örnek haznesini geçer. [[K6 s. 198]]',
    gorunumler: [{ ad: 'Optik yol', resim: 'img/fizik/11a-analizor.webp', en: 1024, boy: 342,
      noktalar: [
        { x: 134, y: 155, ad: 'Isıtılan tel', metin: 'Isıtılan tel kızılötesi ışınım kaynağıdır. [[K6 s. 198]]' },
        { x: 261, y: 155, ad: 'Dalga boyu filtresi', metin: 'Hedef gazın soğurduğu dalga boyunu seçer. [[K6 s. 198]]' },
        { x: 343, y: 156, ad: 'Giriş penceresi', metin: 'Safir gibi kızılötesini geçiren bir malzeme ışınımın örneğe ulaşmasını sağlar. [[K6 s. 198]]' },
        { x: 552, y: 157, ad: 'Örnek haznesi', metin: 'Seçilen ışınım ölçülecek gazın içinden geçer. [[K6 s. 198]]' },
        { x: 783, y: 155, ad: 'Çıkış penceresi', metin: 'Hazne çıkışındaki geçirgen pencere ışınımı fotodedektöre geçirir. [[K6 s. 198]]' },
        { x: 884, y: 151, ad: 'Fotodedektör', metin: 'Örnek haznesini geçen kızılötesi ışınımın şiddetini ölçer. [[K6 s. 198]]' },
      ] }],
  });
})();
