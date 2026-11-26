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

  const gecitler = [
    { ad: 'T8', yapi: 'Vena kava inferior', eslik: ['Sağ frenik sinirin', 'bazı lifleri geçebilir'], metin: 'Vena kava inferior T8 gövdesi hizasında geçer. [[K5 s. 72]] Sağ frenik sinirin bazı lifleri vene eşlik edebilir. [[K5 s. 75]]' },
    { ad: 'T10', yapi: 'Özofagus', eslik: ['Vagus sinirleri', 'Sol gastrik damarların', 'özofageal dalları'], metin: 'Özofagus vagus sinirleriyle ve sol gastrik damarların özofageal dallarıyla aynı açıklıktan geçer. [[K5 s. 74]]' },
    { ad: 'T12', yapi: 'Aort', eslik: ['Torasik kanal', 'Azigos ven'], metin: 'Aort, torasik kanal ve azigos ven median arkuat bağın arkasından geçer. [[K5 s. 74]]' },
  ];
  VIZ.an01f_gecit = (el) => SEKIL.adim(el, {
    baslik: 'Ana geçiş düzeyleri ve eşlikçiler', vb: [400, 220], vbDar: [370, 220], oto: false,
    ortak: (S, secili) => gecitler.map((gecit, i) => {
      const y = 18 + i * 67;
      const etkin = i === secili;
      return S.kutu(8, y, 65, 52, { yazi: gecit.ad, dolgu: etkin ? 'basic-soft' : 'paper' })
        + S.kutu(79, y, 128, 52, { yazi: gecit.yapi, yc: 'k', dolgu: etkin ? 'basic-soft' : 'paper' })
        + (etkin ? S.kutu(214, y - 4, S.w - 222, 60, { yazi: gecit.eslik, yc: 'k', dolgu: 'clin-soft' }) : '');
    }).join(''),
    adimlar: gecitler,
  });

  VIZ.an01f_frenik = (el) => SEKIL.sahne(el, {
    baslik: 'Frenik sinirlerin diyaframı geçişi', vb: [380, 240],
    secenek: { id: 'taraf', ad: 'Frenik sinir', liste: [
      { d: 'sag', ad: 'Sağ' }, { d: 'sol', ad: 'Sol' },
    ] },
    ciz: (S, t, p) => {
      const sag = p.taraf === 'sag';
      return S.t(20, 25, 'Torasik yüz', { c: 'm' })
        + S.kutu(18, 99, 344, 56, { dolgu: sag ? 'basic-soft' : 'clin-soft' })
        + S.t(30, 139, sag ? 'Santral tendon' : 'Kas bölümü', { c: 'k' })
        + S.kutu(187, 57, 167, 48, { yazi: sag ? 'Vena kava inferior' : 'Perikard tutunması', yc: 'k' })
        + S.ok([[145, 48], [145, 162], [106, 186]], { renk: 'accent', w: 4 })
        + S.ok([[145, 162], [176, 186]], { renk: 'accent', w: 3 })
        + (sag ? S.ok([[145, 65], [210, 120], [210, 169]], { renk: 'accent', kesik: true }) : '')
        + S.t(20, 219, 'Abdominal yüz', { c: 'm' });
    },
    metin: p => p.taraf === 'sag'
      ? 'Ana sinir kavanın lateralinde tendonu deler, kesikli yol kaval açıklıktan geçebilen lifleri gösterir. [[K5 s. 75]]'
      : 'Sol sinir perikard tutunmasının yaklaşık 1 cm lateralinde kas bölümünü deler ve terminal lifleri abdominal yüze dağılır. [[K5 s. 75]]',
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

  VIZ.an01f_herni = (el) => SEKIL.sahne(el, {
    baslik: 'Kardiya ve fundusun hiatusa göre konumu', vb: [380, 222],
    secenek: { id: 'tip', ad: 'Herni tipi', liste: [
      { d: 'kayma', ad: 'Kayma tipi' }, { d: 'para', ad: 'Paraözofageal' },
    ] },
    ciz: (S, t, p) => {
      const kayma = p.tip === 'kayma';
      const kardiyaY = kayma ? 66 : 163, fundusY = kayma ? 52 : 58;
      return S.t(14, 26, 'Toraks', { c: 'm' }) + S.t(14, 203, 'Karın', { c: 'm' })
        + S.cizgi([[14, 116], [115, 116]], { renk: 'clin', w: 6 })
        + S.cizgi([[249, 116], [362, 116]], { renk: 'clin', w: 6 })
        + S.t(278, 140, 'Diyafram', { c: 'k' })
        + S.cizgi([[144, 18], [144, kardiyaY]], { renk: 'basic', w: 7 })
        + S.cizgi([[144, kardiyaY], [168, 185], [207, 176], [225, fundusY + 10], [209, fundusY], [188, fundusY + 10], [167, kardiyaY + 10], [144, kardiyaY]], { renk: 'clin', dolgu: 'clin-soft', w: 3 })
        + S.daire(144, kardiyaY, 6, { dolgu: 'accent' }) + S.t(130, kardiyaY + 4, 'Kardiya', { a: 'end' })
        + S.t(236, fundusY + 6, 'Fundus');
    },
    metin: p => p.tip === 'kayma'
      ? 'Uzandığında veya öne eğildiğinde hastanın alt özofagusu ve üst midesi gevşek hiatustan toraksa kayar. [[K5 s. 78]]'
      : 'Daha seyrek olan paraözofageal tipte kardiya aşağıda kalır, fundus özofagusun önünden toraksa yuvarlanır. [[K5 s. 78]]',
  });
})();
