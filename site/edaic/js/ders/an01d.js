(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle', c: 'b' };
  function resim(el, ad, dosya, gorunum, giris, noktalar) {
    return SEKIL.cizim(el, {
      baslik: ad, giris,
      gorunumler: [{ ad: gorunum, resim: 'img/anatomi/01d-' + dosya + '.webp', en: 1024, boy: 1024,
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

  VIZ.an01d_duzey = el => SEKIL.adim(el, {
    baslik: 'Bifurkasyon hangi düzeyde?', vb: [400, 255], vbDar: [360, 255], oto: false,
    adimlar: [
      { ad: 'Kadavra', metin: 'Korunmuş, sırtüstü kadavrada bifurkasyon T4 ve Louis açısı düzeyindedir. [[K5 s. 42]] [[K5 s. 46]]' },
      { ad: 'Ayakta', metin: 'Canlıda dik çekilen oblik grafide alt uç T5’e kadar inebilir. [[K5 s. 42]]' },
      { ad: 'Tam inspirasyon', metin: 'Ayakta tam inspirasyonda bifurkasyon T6 düzeyine inebilir. [[K5 s. 42]] [[K5 s. 46]]' },
    ],
    ortak: (S, i) => {
      const x = S.w * 0.52, y = 122 + 45 * i;
      let s = S.t(24, 30, 'C6 · Krikoid') + S.cizgi([[x,26],[x,y]], {renk:'basic',w:10});
      ['T4','T5','T6'].forEach((ad, j) => {
        s += S.t(24, 126 + j * 45, ad, { c: i === j ? 'b' : 'm' })
          + S.cizgi([[62,122+j*45],[x-12,122+j*45]], { renk:'line',kesik:true });
      });
      return s + S.cizgi([[x-15,y+28],[x,y],[x+28,y+28]], {renk:'accent',w:9});
    },
  });

  VIZ.an01d_yansima = el => SEKIL.adim(el, {
    baslik: 'Plevranın alt kenarını önden arkaya izleyin', vb:[400,215], vbDar:[360,215], oto:false,
    adimlar: [
      { ad:'Ön', metin:'Midklaviküler hatta alt sınır 8. kaburgayı keser. [[K5 s. 49]]' },
      { ad:'Yan', metin:'En alçak nokta midaksiller hatta 10. kaburga düzeyindedir. [[K5 s. 49]]' },
      { ad:'Arka', metin:'Arkada sınır T12 spinöz çıkıntısına ulaşır, kostovertebral açıda kostal kenarın biraz altına sarkar. [[K5 s. 49]]' },
    ],
    ortak:(S,i) => {
      const xs=[64,S.w/2,S.w-64], ys=[65,140,108];
      let s=S.cizgi(xs.map((x,j)=>[x,ys[j]]),{renk:'basic',w:4});
      return s + xs.map((x,j)=>S.daire(x,ys[j],7,{dolgu:i===j?'accent':'paper',renk:'accent'})
        + S.t(x,ys[j]-20,['8. kaburga','10. kaburga','T12'][j],merkez)
        + S.t(x,ys[j]+32,['Midklaviküler','Midaksiller','Spinöz çıkıntı'][j],{a:'middle',c:'k'})).join('');
    },
  });
  VIZ.an01d_ucgen = el => SEKIL.sahne(el, {
    baslik:'Aksillanın altında güvenli üçgen', vb:[400,205], vbDar:[360,205],
    ciz:S=>{
      const x=S.w/2;
      return S.cizgi([[x,40],[x-85,150],[x+85,150],[x,40]],{renk:'accent',dolgu:'accent-soft',w:3})
        + S.t(x,26,'Aksillanın altı',merkez)
        + S.t(10,85,['Pektoralis','majör','lateral kenarı'],{c:'k',lh:18})
        + S.t(S.w-10,85,['Latissimus','dorsi','ön kenarı'],{a:'end',c:'k',lh:18})
        + S.t(x,182,'5. interkostal aralık',merkez);
    },
    metin:()=> 'Şema yan göğüs duvarını gösterir. [[K5 s. 50]] Etkilenen taraftaki eli başın arkasına almak alanı açar. [[K5 s. 50]]',
  });
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
  VIZ.an01d_blok = el => SEKIL.adim(el, {
    baslik:'Kaburga açısında iğne ile demetin ilişkisi', vb:[400,210], vbDar:[360,210], oto:false,
    adimlar:[
      {ad:'Palpasyon',metin:'Oturur, lateral veya pron hastada kaburga açısı düzeyi seçilir, cilt altı infiltrasyonundan sonra alt kenar palpe edilir ve deri hafifçe sefalade kaydırılır. [[K5 s. 56]]'},
      {ad:'Kemik teması',metin:'Kısa hipodermik iğne, kaburganın alt kenarına doğru kemikle temas edene kadar ilerletilir. [[K5 s. 56]]'},
      {ad:'Alt kenarı geçiş',metin:'İğne alt kenardan sıyrıldıktan sonra hafifçe sefalade doğru 3–5 mm ilerletilir. [[K5 s. 56]]'},
      {ad:'Aspirasyon',metin:'İntravasküler yerleşimi dışlamak için dikkatle aspirasyon yapılır, ardından 3–5 mL lokal anestezik verilir. [[K5 s. 56]]'},
    ],
    ortak:(S,i)=>{
      const x=S.w/2;
      let s=S.kutu(x-48,20,96,85,{r:20,yazi:'Kaburga',dolgu:'paper',renk:'basic'})
        + S.t(x+65,120,['Ven','Arter','Sinir'],{c:'k',lh:20});
      ['basic','crit','warn'].forEach((renk,j)=>{s+=S.daire(x+30,117+20*j,7,{dolgu:renk,renk});});
      if(i===1) s+=S.ok([[x-145,128],[x-48,92]],{renk:'accent'});
      if(i>=2) s+=S.ok([[x-145,179],[x+12,150]],{renk:'accent'});
      return s + S.t(12,202,'Dış yüz',{c:'k'}) + S.t(S.w-12,202,'Plevra yönü',{a:'end',c:'k'});
    },
  });
})();
