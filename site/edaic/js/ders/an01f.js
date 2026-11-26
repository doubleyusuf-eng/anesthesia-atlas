(function () {
  'use strict';
  const VIZ = window.VIZ;
  VIZ.an01f_kubbeler = (el) => SEKIL.cizim(el, {
    baslik: 'Diyaframın abdominal yüzü',
    giris: 'Alttan görünümde ön taraf üstte, hastanın sağı resmin solundadır. Santral tendondan kruslara ve arkuat bağlara ilerleyin. [[K5 s. 72–73]]',
    gorunumler: [{ ad: 'Alttan · abdominal yüz', resim: 'img/anatomi/01f-kubbeler.webp', en: 1024, boy: 527, noktalar: [
      { x: 502, y: 111, ad: 'Santral tendon', metin: 'Merkezdeki tendon yonca yaprağı biçimindedir; üst yüzü fibröz perikardla birleşir. [[K5 s. 72]]' },
      { x: 425, y: 405, ad: 'Sağ krus', metin: 'Daha büyük olan sağ krus L1, L2 ve L3 vertebra gövdelerinden başlar. [[K5 s. 72]] Splanknik sinirler krusları deler. [[K5 s. 74]]' },
      { x: 579, y: 364, ad: 'Sol krus', metin: 'Sol krus L1 ve L2 vertebra gövdelerinden başlar. [[K5 s. 72]] Hemiazigos ven sol krustan geçer. [[K5 s. 74]]' },
      { x: 513, y: 261, ad: 'Median arkuat ligament', metin: 'İki krusu birbirine bağlayan fibröz bir yaydır. [[K5 s. 72]]' },
      { x: 325, y: 287, ad: 'Medial arkuat ligament', metin: 'Psoas üzerindeki fasyanın kalınlaşmasıyla oluşur. [[K5 s. 72]] Sempatik trunkus bu bağın arkasından geçer. [[K5 s. 74]]' },
      { x: 151, y: 312, ad: 'Lateral arkuat ligament', metin: 'Kuadratus lumborum üzerindeki yoğunlaşmış fasya, lateralde on ikinci kaburga ucuna yakın sonlanır. [[K5 s. 72]]' },
      { x: 345, y: 168, ad: 'İVK açıklığı', metin: 'İnferior vena kava diyaframdan T8 vertebra gövdesi düzeyinde geçer. [[K5 s. 72]] Sağ frenik sinir santral tendonu bu venin lateralinde deler. [[K5 s. 75]]' },
      { x: 577, y: 204, ad: 'Özofagus hiatusu', metin: 'Özofagus T10 düzeyinde geçer; hiatus sağ krustan gelen askı biçimli kas lifleriyle güçlendirilir. [[K5 s. 74]]' },
      { x: 515, y: 290, ad: 'Aort hiatusu', metin: 'Aort, torasik kanal ve azigos ven T12 düzeyinde median arkuat bağın arkasından geçer. [[K5 s. 74]]' },
    ] }],
  });

  VIZ.an01f_kardiya = (el) => SEKIL.cizim(el, {
    baslik: 'Özofagogastrik bileşke ve diyafram',
    giris: 'Hiatustan aşağı inerek özofagusun mideye katıldığı yeri bulun. [[K5 s. 76]]',
    gorunumler: [{ ad: 'Önden yakın görünüm', resim: 'img/anatomi/01f-kardiya.webp', en: 1024, boy: 683, noktalar: [
      { x: 324, y: 226, ad: 'Krural askı', metin: 'Kas lifleri özofagusu sararak hiatusu güçlendirir. [[K5 s. 74]]' },
      { x: 405, y: 365, ad: 'Abdominal özofagus', metin: 'Karın içi basınç bu segmentin duvarlarını birbirine yaklaştırabilir. [[K5 s. 76]]' },
      { x: 411, y: 450, ad: 'Kardiya', metin: 'Normalde bileşke diyaframın altında yer alır. [[K5 s. 76]]' },
      { x: 476, y: 435, ad: 'Özofagogastrik açı', metin: 'Kayma tipi hernide normal eğik açı düzleşir. [[K5 s. 76]]' },
      { x: 755, y: 345, ad: 'Fundus', metin: 'Paraözofageal hernide fundus hiatusu özofagusun önünden aşar. [[K5 s. 78]]' },
    ] }],
  });

  VIZ.an01f_gecit = (el) => SEKIL.cizim(el, {
    baslik: 'Diyafram açıklıkları ve vertebra düzeyleri',
    giris: 'Üst sırada üç açıklığı, alt sırada karşılık gelen omurları seçin. Omurgayı soldan sağa T1’den başlayarak sayın. [[K5 s. 72–74]]',
    gorunumler: [{ ad: 'Üç geçiş ve torakal omurga', resim: 'img/anatomi/01f-gecit.webp', en: 1024, boy: 683, noktalar: [
      { x: 153, y: 190, ad: 'Vena kava inferior', metin: 'Vena kava inferior T8 gövdesi hizasında santral tendondan geçer. [[K5 s. 72–75]] Sağ frenik sinirin bazı lifleri bu açıklıkta vene eşlik edebilir. [[K5 s. 75]]' },
      { x: 512, y: 181, ad: 'Özofagus', metin: 'T10 düzeyinde özofagusa vagus sinirleri ve sol gastrik damarların özofageal dalları eşlik eder. [[K5 s. 74]]' },
      { x: 814, y: 241, ad: 'Aort', metin: 'Aort T12 düzeyinde median arkuat bağın arkasından torasik kanal ve azigos venle birlikte geçer. [[K5 s. 74]]' },
      { x: 636, y: 522, ad: 'T8 gövdesi', metin: 'Üç ana geçişin en üstündeki kaval açıklık bu gövde hizasındadır. [[K5 s. 72–74]]' },
      { x: 793, y: 522, ad: 'T10 gövdesi', metin: 'Özofageal hiatusun düzeyidir. [[K5 s. 74]]' },
      { x: 953, y: 522, ad: 'T12 gövdesi', metin: 'Aortun kruslar arasından geçtiği düzeydir. [[K5 s. 74]]' },
    ] }],
  });

  VIZ.an01f_frenik = (el) => SEKIL.cizim(el, {
    baslik: 'Frenik sinirlerin diyaframı geçişi',
    giris: 'Önden görünümde hastanın sağı resmin solundadır. Sarı sinirleri torasik yüzden abdominal yüzdeki uç dallarına doğru izleyin. [[K5 s. 75]]',
    gorunumler: [{ ad: 'Önden · kısmi kesit', resim: 'img/anatomi/01f-frenik.webp', en: 1024, boy: 683, noktalar: [
      { x: 300, y: 294, ad: 'Sağ frenik sinir', metin: 'Ana sinir vena kava inferiorun lateralinde santral tendonu deler. [[K5 s. 75]]' },
      { x: 331, y: 258, ad: 'Vena kava inferior', metin: 'Sağ frenik sinirin bazı lifleri kaval açıklıktan venle birlikte geçebilir. [[K5 s. 75]]' },
      { x: 616, y: 276, ad: 'Perikardın tutunma yeri', metin: 'Soldaki sinirin geçişini bulmak için perikardın diyaframa tutunduğu kenarı izleyin. [[K5 s. 75]]' },
      { x: 709, y: 345, ad: 'Sol frenik sinir', metin: 'Sol sinir perikardın tutunma yerinin yaklaşık 1 cm lateralinde diyaframın kas bölümünü deler. [[K5 s. 75]]' },
      { x: 237, y: 390, ad: 'Abdominal yüzdeki uç dallar', metin: 'Her iki frenik sinirin terminal lifleri diyafram kasına abdominal yüzden girer. [[K5 s. 75]]' },
    ] }],
  });

  const evreler = [
    { ad: 'İnspirasyon', metin: 'Kubbeler santral tendondan daha fazla iner ve toraks piston hareketiyle genişler. [[K5 s. 75]] Alt kostal kenarın yükselip dışa dönmesi toraks tabanını da genişletir. [[K5 s. 75]]' },
    { ad: 'Ekspirasyon', metin: 'Diyafram gevşer. [[K5 s. 75]]' },
    { ad: 'Zorlu ekspirasyon', metin: 'Ön karın duvarı kasılınca artan karın içi basınç diyaframı yukarı iter. [[K5 s. 75]]' },
  ];
  VIZ.an01f_hareket = (el) => SEKIL.adim(el, {
    baslik: 'Kubbelerin ve santral tendonun göreli hareketi', vb: [380, 200], oto: false,
    ortak: (S, i) => {
      const profil = (iniste) => Array.from({ length: 81 }, (_, j) => {
        const x = j / 80, yay = Math.abs(Math.sin(2 * Math.PI * x));
        return [26 + 328 * x, 117 + 25 * Math.abs(2 * x - 1) - (x < .5 ? 68 : 61) * yay + (iniste ? 4 + 25 * yay : 0)];
      });
      const iniste = i === 0;
      const baslangic = profil(!iniste), son = profil(iniste);
      return S.t(190, 22, 'Toraks', { a: 'middle' })
        + S.cizgi(baslangic, { renk: 'muted', kesik: true })
        + S.cizgi(son, { renk: 'clin', w: 4 })
        + [20, 60].map(j => S.ok([baslangic[j], son[j]], { renk: 'accent' })).join('')
        + S.t(190, 180, i === 2 ? 'Karın içi basınç ↑' : 'Karın', { a: 'middle' });
    },
    adimlar: evreler,
  });

  VIZ.an01f_herni = (el) => SEKIL.cizim(el, {
    baslik: 'Kardiya ve fundusun hiatusa göre konumu',
    giris: 'Solda kayma tipi, sağda paraözofageal herni görülür. Diyaframın üstü toraks, altı karındır. Her kesitte özofagusu kardiyaya kadar izleyin. [[K5 s. 77–78]]',
    gorunumler: [{ ad: 'İki herninin kesiti', resim: 'img/anatomi/01f-herni.webp', en: 1024, boy: 683, noktalar: [
      { x: 238, y: 151, ad: 'Kayma tipi · kardiya', metin: 'Hasta uzandığında veya öne eğildiğinde alt özofagus ve üst mide gevşek hiatustan toraksa kayar. [[K5 s. 78]] Bileşke yükselince özofagogastrik açı düzleşir. [[K5 s. 76]]' },
      { x: 335, y: 188, ad: 'Kayma tipi · fundus', metin: 'Midenin üst bölümü kardiyayla birlikte diyaframı aşar. [[K5 s. 78]]' },
      { x: 409, y: 278, ad: 'Diyafram', metin: 'Kardiyanın konumunu özofagusun diyaframdan geçtiği düzeye göre değerlendirin. [[K5 s. 77–78]]' },
      { x: 756, y: 395, ad: 'Paraözofageal tip · kardiya', metin: 'Daha seyrek görülen bu tipte kardiya karında kalır ve kardiyoözofageal bileşke korunur. [[K5 s. 78]]' },
      { x: 829, y: 205, ad: 'Paraözofageal tip · fundus', metin: 'Fundus özofagusun önünden geçerek hiatustan toraksa yuvarlanır. [[K5 s. 78]]' },
    ] }],
  });
})();
