(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle', c: 'b' };
  function resim(el, ad, dosya, gorunum, giris, noktalar, boy = 1024) {
    return SEKIL.cizim(el, {
      baslik: ad, giris,
      gorunumler: [{ ad: gorunum, resim: 'img/anatomi/01d-' + dosya + '.webp', en: 1024, boy,
        noktalar: noktalar.map(([x, y, ad, metin]) => ({ x, y, ad, metin })) }],
    });
  }
  VIZ.an01d_brons = el => resim(el, 'Bifurkasyonun iki kolu', 'brons', 'Önden',
    'Hastanın sağ ana bronşunu bulun, sonra iki bronşun eğimini karşılaştırın. [[K5 s. 46–47]]', [
      [395, 250, 'Distal trakea', 'Uzunlamasına fibroelastik doku, trakeanın C biçimli kıkırdaklarını birbirine bağlar. [[K5 s. 42]]'],
      [395, 485, 'Bifurkasyon', 'Trakea burada ikiye ayrılır, karina bronkoskopide lümen içinden görülen sagittal kabartıdır. [[K5 s. 42–43]]'],
      [282, 598, 'Sağ ana bronş', 'Sağdaki daha geniş bronş düşeyle 25° yapar ve üst lob dalını 2,5 cm sonra verir. [[K5 s. 46]]'],
      [615, 660, 'Sol ana bronş', 'Soldaki bronş düşeyle 45° yapar ve üst lob dalına kadar 5 cm uzanır. [[K5 s. 46–47]]'],
    ]);
  VIZ.an01d_aralik = el => resim(el, 'Kaburga oluğunda nörovasküler demet', 'aralik', 'Göğüs duvarı kesiti',
    'Dıştan içe kas tabakalarını, sonra olukta yukarıdan aşağıya demetin elemanlarını seçin. [[K5 s. 51–53]]', [
      [480, 163, 'Üst kaburga', 'Bu kaburganın altındaki oluk, interkostal demeti korur. [[K5 s. 53]]'],
      [580, 295, 'Ven', 'Posterior interkostal ven arterin üstündedir. [[K5 s. 53–54]]'],
      [574, 363, 'Arter', 'Posterior interkostal arter ven ile sinir arasında seyreder. [[K5 s. 53]]'],
      [573, 430, 'Sinir', 'İnterkostal sinir demetin en altındadır. [[K5 s. 53]]'],
      [286, 475, 'Eksternal interkostal', 'Dış tabakanın lifleri üst kaburgadan alt kaburgaya doğru öne ve aşağı iner. [[K5 s. 52]]'],
      [458, 528, 'İnternal interkostal', 'Orta tabakanın lifleri aşağı ve arkaya uzanır. [[K5 s. 52]]'],
      [605, 606, 'En iç interkostal', 'Yan duvarda demet, en iç tabakayı internal interkostal kastan ayırır. [[K5 s. 53]]'],
    ]);

  VIZ.an01d_duzey = el => resim(el, 'Trakeanın başlangıç ve sonlanma düzeyleri', 'duzey', 'Omurganın yandan görünümü',
    'Trakeanın başlangıç ve sonlanma düzeylerini omur gövdeleri üzerinde karşılaştırın. [[K5 s. 42]]', [
      [400, 105, 'C6 · Krikoid', 'Trakea C6 düzeyinde krikoid kıkırdağın alt kenarından başlar. [[K5 s. 42]]'],
      [395, 954, 'T4 · Kadavra', 'Korunmuş, sırtüstü kadavrada bifurkasyon T4 ve manubriosternal bileşke (Louis açısı) düzeyindedir. [[K5 s. 42]] [[K5 s. 46]]'],
      [395, 1140, 'T5 · Ayakta', 'Canlıda dik çekilen oblik grafide trakeanın alt ucu T5’e kadar inebilir. [[K5 s. 42]]'],
      [395, 1350, 'T6 · Tam inspirasyon', 'Ayakta tam inspirasyonda bifurkasyon T6 düzeyine inebilir. [[K5 s. 42]] [[K5 s. 46]]'],
    ], 1536);

  VIZ.an01d_yansima = el => resim(el, 'Plevranın alt kenarının yüzey izdüşümü', 'yansima', 'Önden, yandan ve arkadan',
    'Noktalar plevra alt kenarının kemik izdüşümlerini gösterir. Sırayla ön, yan ve arka göğüs duvarını inceleyin. [[K5 s. 49]]', [
      [90, 316, 'Ön · 8. kaburga', 'Önde plevranın alt kenarı midklaviküler hatta sekizinci kaburgayı keser. [[K5 s. 49]]'],
      [500, 361, 'Yan · 10. kaburga', 'Alt kenarın en alçak noktası midaksiller hatta onuncu kaburga düzeyindedir. [[K5 s. 49]]'],
      [832, 366, 'Arka · T12', 'Arkada alt kenar T12 spinöz çıkıntısına ulaşır. [[K5 s. 49]] Kostovertebral açıda kostal kenarın biraz altına sarkar. [[K5 s. 49]]'],
    ], 428);

  VIZ.an01d_ucgen = el => resim(el, 'Aksillanın altında güvenli üçgen', 'ucgen', 'Yan göğüs duvarı',
    'Etkilenen taraftaki eli başın arkasına almak yan göğüs duvarındaki alanı açar. [[K5 s. 50]]', [
      [588, 326, 'Tepe · Aksillanın altı', 'Üçgenin tepesi aksillanın hemen altındadır. [[K5 s. 50]]'],
      [411, 468, 'Ön sınır · Pektoralis majör', 'Pektoralis majörün lateral kenarı üçgeni önden sınırlar. [[K5 s. 50]]'],
      [680, 470, 'Arka sınır · Latissimus dorsi', 'Latissimus dorsinin ön kenarı üçgeni arkadan sınırlar. [[K5 s. 50]]'],
      [478, 541, 'Taban · 5. interkostal aralık', 'Beşinci interkostal aralıktan geçen yatay çizgi üçgenin tabanını oluşturur. [[K5 s. 50]]'],
    ]);
  const damarlar = [
    ['1.–2.', 'Superior interkostal', 'İnternal torasik', 'Arkada kostoservikal trunkusun superior interkostal dalı, önde internal torasik arterin dalları bulunur. [[K5 s. 54]]'],
    ['3.–6.', 'Torasik aorta', 'İnternal torasik', 'Posterior arter doğrudan aortadan, anterior çift internal torasik arterden gelir. [[K5 s. 54]]'],
    ['7.–9.', 'Torasik aorta', 'Müskülofrenik', 'Arkadan doğrudan aortanın, önden müskülofrenik arterin dalları gelir. [[K5 s. 54]]'],
    ['10.–11.', 'Torasik aorta', '—', 'Bu düzeylerde posterior arterler aortadan çıkar, anterior interkostal arter çiftleri üst dokuz aralıkla sınırlıdır. [[K5 s. 54]]'],
  ];
  VIZ.an01d_damar = el => SEKIL.adim(el, {
    baslik: 'İnterkostal arterlerin kökeni', vb: [400,185], vbDar: [360,185], oto: false,
    adimlar: damarlar.map(([ad,,,metin]) => ({ ad, metin })),
    ortak: (S,i) => {
      const [ad,arka,on] = damarlar[i], x = S.w/2;
      let svg = S.t(x,32,ad + ' aralık',merkez)
        + S.t(x,95,'Posterior',merkez) + S.t(x,158,'Anterior',merkez);
      svg += S.t(x,70,arka,{a:'middle',renk:'accent'})
        + S.t(x,133,on,{a:'middle',renk:'basic'});
      return svg;
    },
  });
  VIZ.an01d_blok = el => resim(el, 'Kaburga açısında blok adımları', 'aralik', 'Göğüs duvarı kesiti',
    'Dış yüz solda, plevra yönü sağdadır. [[K5 s. 51–53]] Kaburganın alt kenarındaki olukta yukarıdan aşağıya ven, arter ve sinir yer alır. [[K5 s. 53]] Noktalar blok sırasındaki anatomik hedefleri gösterir. [[K5 s. 56]]', [
      [311, 222, 'Palpasyon · Kaburga', 'Oturur, lateral veya pron hastada kaburga açısı düzeyi seçilir. [[K5 s. 56]] Cilt altı infiltrasyonundan sonra alt kenar palpe edilir ve deri hafifçe sefalade kaydırılır. [[K5 s. 56]]'],
      [394, 277, 'Kemik teması · Alt kenar', 'Kısa hipodermik iğne kaburganın alt kenarına doğru kemikle temas edene kadar ilerletilir. [[K5 s. 56]]'],
      [485, 294, 'Alt kenarı geçiş', 'İğne alt kenardan sıyrıldıktan sonra hafifçe sefalade doğru 3–5 mm ilerletilir. [[K5 s. 56]]'],
      [548, 429, 'Aspirasyon · Sinir komşuluğu', 'Damar içi yerleşimi dışlamak için dikkatle aspirasyon yapılır, ardından 3–5 mL lokal anestezik verilir. [[K5 s. 56]]'],
    ]);
})();
