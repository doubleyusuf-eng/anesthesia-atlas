(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an01e_loblar = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ ve sol akciğerin lobları',
    giris: 'Önce oblik fissürü izleyin, sonra sağdaki orta lob ile soldaki lingulayı karşılaştırın. [[K5 s. 61–62]]',
    gorunumler: [{ ad: 'Sağ lateral', resim: 'img/anatomi/01e-loblar.webp', en: 1024, boy: 1121, noktalar: [
      { x: 463, y: 118, ad: 'Apeks', metin: 'Apeks boyun köküne uzanır. [[K5 s. 57]]' },
      { x: 632, y: 421, ad: 'Üst lob', metin: 'Kostal yüzde üst lobun orta lobla sınırını transvers fissür çizer. [[K5 s. 58]]' },
      { x: 757, y: 594, ad: 'Transvers fissür', metin: 'Önden gelen transvers fissür midaksiller hatta oblik fissürle birleşir. [[K5 s. 62]]' },
      { x: 827, y: 716, ad: 'Orta lob', metin: 'Orta lob, transvers ve oblik fissürler arasında kalır. [[K5 s. 58]]' },
      { x: 709, y: 739, ad: 'Oblik fissür', metin: 'Sağ oblik fissür arkada beşinci kaburga hizasından öne ve aşağı uzanır. [[K5 s. 61–62]]' },
      { x: 377, y: 842, ad: 'Alt lob', metin: 'Oblik fissürün arka-alt tarafını alt lob doldurur. [[K5 s. 58]]' }
    ] }, { ad: 'Sol anterolateral', resim: 'img/anatomi/01e-lingula.webp', en: 1024, boy: 1366, noktalar: [
      { x: 500, y: 375, ad: 'Üst lob', metin: 'Lingula sol üst lobun ön-alt bölümüne aittir. [[K5 s. 65–66]]' },
      { x: 241, y: 795, ad: 'Kardiyak çentik', metin: 'Sol ön kenarın çentiği beşinci ve altıncı kostal kıkırdakların arkasına düşer. [[K5 s. 61]]' },
      { x: 179, y: 968, ad: 'Lingula', metin: 'Dil biçimindeki bu çıkıntıya üst lob bronşunun alt bölümü dağılır. [[K5 s. 65–66]]' },
      { x: 552, y: 845, ad: 'Oblik fissür', metin: 'Sol oblik fissür üst ve alt lobların sınırıdır. [[K5 s. 61]]' },
      { x: 661, y: 1056, ad: 'Alt lob', metin: 'Alt lob oblik fissürün arka-alt tarafında kalır. [[K5 s. 58]]' }
    ] }]
  });

  VIZ.an01e_karina = (el) => SEKIL.cizim(el, {
    baslik: 'Trakea bifurkasyonu',
    giris: 'Hastanın sağ ana bronşunu resmin solunda, parlak karina sırtının yanında bulun. [[K5 s. 67]]',
    gorunumler: [{ ad: 'Bronkoskopik', resim: 'img/anatomi/01e-karina.webp', en: 1024, boy: 1024, noktalar: [
      { x: 589, y: 473, ad: 'Karina', metin: 'Kısa, keskin kenarlı sagittal sırt trakeanın orta çizgisinin biraz solunda görülür. [[K5 s. 67]]' },
      { x: 335, y: 478, ad: 'Sağ ana bronş', metin: 'Sağ ana bronş daha geniş ve daha dik olduğundan bronkoskop bu yöne daha kolay ilerler. [[K5 s. 67]]' },
      { x: 727, y: 497, ad: 'Sol ana bronş', metin: 'Solda üst lob ağzına ulaşmadan önce daha uzun bir ana bronş geçilir. [[K5 s. 67]]' },
      { x: 493, y: 180, ad: 'Kıkırdak halkası', metin: 'Trakeada halkaların beyazı ile aradaki kırmızımsı mukoza birbirini izler. [[K5 s. 66]]' }
    ] }]
  });

  VIZ.an01e_bolmeler = (el) => SEKIL.cizim(el, {
    baslik: 'Sagittal görünümde mediasten',
    giris: 'Sternum önde, omurga arkadadır. Perikardı bulup çevresindeki üç bölgeyi izleyin. [[K5 s. 56–57]]',
    gorunumler: [{ ad: 'Sagittal', resim: 'img/anatomi/01e-mediasten.webp', en: 1024, boy: 1089, noktalar: [
      { x: 405, y: 644, ad: 'Orta mediasten', metin: 'Orta mediasten perikardı ve içindekileri kapsar. [[K5 s. 57]]' },
      { x: 222, y: 499, ad: 'Ön mediasten', metin: 'Ön mediasten sternumun arka yüzü ile perikard arasında kalan dar alandır. [[K5 s. 57]]' },
      { x: 678, y: 678, ad: 'Arka mediasten', metin: 'Arka mediasten yukarıda perikardın, aşağıda diyaframın arkasında yer alır. [[K5 s. 57]]' },
      { x: 497, y: 200, ad: 'Üst mediasten', metin: 'Perikarddan toraks girişine doğru çıkıldığında üst mediastene geçilir. [[K5 s. 57]]' },
      { x: 397, y: 903, ad: 'Diyafram', metin: 'Sagittal görünümde diyaframı perikardın altında izleyin. [[K5 s. 57]]' }
    ] }]
  });

  VIZ.an01e_hilus = (el) => SEKIL.cizim(el, {
    baslik: 'Akciğer kökünün dış komşuları',
    giris: 'Akciğer kaldırıldığında kökün önünden frenik sinir, arkasından vagus geçer. Her iki görünümde öne bakan tarafı bu sinirlerle bulun. [[K5 s. 62–63]]',
    gorunumler: [{ ad: 'Sağ kök', resim: 'img/anatomi/01e-hilus-sag.webp', en: 1024, boy: 936, noktalar: [
      { x: 583, y: 335, ad: 'Sağ kök', metin: 'Kökte üst lob bronşunun kesiti pulmoner damarların üstünde ve arkasındadır. [[K5 s. 62]]' },
      { x: 483, y: 202, ad: 'Azigos veni', metin: 'Azigos veni sağ kökün üzerinden bir yay çizerek geçer. [[K5 s. 63]]' },
      { x: 265, y: 330, ad: 'Superior vena kava', metin: 'Superior vena kava sağ kökün önündedir. [[K5 s. 63]]' },
      { x: 369, y: 561, ad: 'Frenik sinir', metin: 'Sağ frenik sinir kökün önünden geçer. [[K5 s. 63]]' },
      { x: 686, y: 554, ad: 'Vagus', metin: 'Sağ vagus kökün arkasında seyreder. [[K5 s. 63]]' },
      { x: 531, y: 725, ad: 'Pulmoner bağ', metin: 'Sağ kökün altında pulmoner bağ uzanır. [[K5 s. 63]]' }
    ] }, { ad: 'Sol kök', resim: 'img/anatomi/01e-hilus-sol.webp', en: 1024, boy: 936, noktalar: [
      { x: 426, y: 419, ad: 'Sol kök', metin: 'Kökte bronş, pulmoner damarların arkasında kalır. [[K5 s. 62]]' },
      { x: 551, y: 130, ad: 'Aort arkı', metin: 'Aort arkı sol kökün üzerinden geçer. [[K5 s. 62]]' },
      { x: 280, y: 601, ad: 'İnen aort', metin: 'Arkın devamı olan inen aort kökün arkasındadır. [[K5 s. 62]]' },
      { x: 347, y: 536, ad: 'Vagus', metin: 'Sol vagus kökün arkasından geçer. [[K5 s. 62]]' },
      { x: 694, y: 485, ad: 'Frenik sinir', metin: 'Sol frenik sinir kökün önünde seyreder. [[K5 s. 62]]' },
      { x: 492, y: 744, ad: 'Pulmoner bağ', metin: 'Sol kökün altında pulmoner bağ bulunur. [[K5 s. 62]]' }
    ] }]
  });

  VIZ.an01e_segment = (el) => SEKIL.cizim(el, {
    baslik: 'Loblara göre segment bronşları',
    giris: 'Bir lob bölgesi seçin. Açıklamadaki sayılar o bölgeye dağılan segment bronşlarının numaralarıdır. [[K5 s. 63–66]]',
    gorunumler: [{ ad: 'Anterolateral', resim: 'img/anatomi/01e-segment-brons.webp', en: 1024, boy: 936, noktalar: [
      { x: 338, y: 357, ad: 'Sağ üst lob', metin: 'Apikal (1), posterior (2) ve anterior (3) dallar tek üçlenmeyle veya birbirine yakın iki çatallanmayla ayrılır. [[K5 s. 63–64]]' },
      { x: 357, y: 574, ad: 'Sağ orta lob', metin: 'Sağ ana bronşun alt bölümünden çıkan orta lob bronşu lateral (4) ve medial (5) dalları verir. [[K5 s. 63–64]]' },
      { x: 190, y: 728, ad: 'Sağ alt lob', metin: 'Apikal (6) dalın distalinde medial bazal (7), anterior bazal (8), lateral bazal (9) ve posterior bazal (10) dallar ayrılır. [[K5 s. 63–64]]' },
      { x: 696, y: 359, ad: 'Sol üst lobun üst bölümü', metin: 'Apikal ve posterior dallar genellikle ortak apikoposterior gövdeden (1–2) çıkar. Anterior dal (3) ayrıdır. [[K5 s. 64–65]]' },
      { x: 581, y: 644, ad: 'Lingula', metin: 'Sol üst lobun lingular bölümü üst (4) ve alt (5) segment bronşlarına ayrılır. [[K5 s. 64–66]]' },
      { x: 827, y: 733, ad: 'Sol alt lob', metin: 'Apikal (6), anterior bazal (8), lateral bazal (9) ve posterior bazal (10) dallar bulunur. Kitabın haritasında ayrı medial bazal dal yoktur. [[K5 s. 64–66]]' }
    ] }]
  });

  // Bir yol seçildiğinde durakları yukarıdan aşağıya okutur.
  function yol(S, duraklar) {
    const h = 38, bosluk = 19, genislik = Math.min(360, S.w - 26), x = (S.w - genislik) / 2;
    return duraklar.map((ad, i) => {
      const y = 10 + i * (h + bosluk), orta = S.w / 2;
      return (i ? S.ok([[orta, y - bosluk], [orta, y - 2]], { renk: 'basic' }) : '')
        + S.kutu(x, y, genislik, h, { yazi: ad, dolgu: i === 0 ? 'accent-soft' : 'paper' });
    }).join('');
  }

  VIZ.an01e_hava = (el) => SEKIL.cizim(el, {
    baslik: 'Bronşiyolden alveole',
    giris: 'Havanın izlediği yolu sol üstteki bronşiyolden başlayarak kese duvarına kadar takip edin. [[K5 s. 68–69]]',
    gorunumler: [{ ad: 'Boyuna açılmış hava yolu', resim: 'img/anatomi/01e-asinus.webp', en: 1024, boy: 768, noktalar: [
      { x: 106, y: 138, ad: 'Bronşiyol', metin: 'Bronşiyolün kıkırdaksız duvarında düz kas ve silyalı kübik epitel vardır. [[K5 s. 68]]' },
      { x: 308, y: 199, ad: 'Respiratuvar bronşiyol', metin: 'Duvara açılan ilk seyrek alveoller respiratuvar bronşiyolü tanıtır. [[K5 s. 68–69]]' },
      { x: 533, y: 395, ad: 'Alveoler kanal', metin: 'Respiratuvar bronşiyolün distal ucu alveoler kanal olarak devam eder. [[K5 s. 69]]' },
      { x: 724, y: 529, ad: 'Atriyum', metin: 'Her alveoler kanalın ucunda yaklaşık küresel 3–6 atriyum bulunur. Resimde bunlardan birinin keseye açılışı izlenir. [[K5 s. 69]]' },
      { x: 843, y: 620, ad: 'Alveoler kese', metin: 'Atriyumdan açılan kesenin ortak boşluğunu çevresindeki alveoller sınırlar. [[K5 s. 69]]' },
      { x: 911, y: 672, ad: 'Alveol', metin: 'Kese duvarındaki ince duvarlı hava hücrelerinin her biri bir alveoldür. [[K5 s. 69]]' }
    ] }]
  });

  VIZ.an01e_kan = (el) => SEKIL.sahne(el, {
    baslik: 'Arterden venöz dönüşe', vb: [540, 236], vbDar: [360, 236],
    secenek: { id: 'yatak', ad: 'Yatak', liste: [{ d: 'pulmoner', ad: 'Alveol' }, { d: 'proksimal', ad: 'Proksimal bronş' }, { d: 'distal', ad: 'Distal bronş' }] },
    ciz: (S, t, p) => {
      const yollar = {
        pulmoner: ['Pulmoner arter', 'Alveoler kapillerler', 'Pulmoner ven', 'Sol atriyum'],
        proksimal: ['Bronşiyal arter', 'Proksimal bronş duvarı', 'Bronşiyal ven', 'Sağda azigos / solda iki olası yol'],
        distal: ['Bronşiyal arter', 'Distal bronş duvarı', 'Pulmoner ven', 'Sol atriyum']
      };
      return yol(S, yollar[p.yatak]);
    },
    metin: (p) => ({
      pulmoner: 'Alveoler gaz alışverişinden geçen kan pulmoner venlerle sol atriyuma döner. [[K5 s. 69–70]]',
      proksimal: 'İlk iki veya üç çatallanma bronşiyal venlerle sağda azigosa, solda superior hemiazigosa veya sol superior interkostal vene drene olur. [[K5 s. 70]]',
      distal: 'Distal bronş duvarından çıkan venöz kan pulmoner venlere karışarak fizyolojik şanta katkı verir. [[K5 s. 70]]'
    })[p.yatak]
  });

  VIZ.an01e_lenf = (el) => SEKIL.sahne(el, {
    baslik: 'Lenfatik drenajın durakları', vb: [540, 298], vbDar: [360, 298],
    secenek: { id: 'pleksus', ad: 'Başlangıç', liste: [{ d: 'yuzey', ad: 'Yüzeyel ağ' }, { d: 'derin', ad: 'Derin ağ' }] },
    ciz: (S, t, p) => yol(S, [p.pleksus === 'yuzey' ? 'Visseral plevra' : 'Bronşlar', 'Bronkopulmoner düğüm', 'Trakeobronşiyal düğüm', 'Bronkomediastinal trunkus', 'Genellikle aynı tarafın venöz açısı']),
    metin: () => 'Her iki pleksus aynı düğüm yolunu izler. [[K5 s. 71]] Trunkuslar çoğunlukla kendi tarafındaki juguler–subklavyen birleşime doğrudan açılır. [[K5 s. 71]]'
  });

  VIZ.an01e_gelisim = (el) => SEKIL.adim(el, {
    baslik: 'Solunum yolunun gelişimi ve tipik fistül', vb: [540, 168], vbDar: [360, 168], oto: false,
    adimlar: [
      { ad: 'Oluk', metin: 'Ön bağırsağın ventral orta hattında divertikül belirir. [[K5 s. 71]]', ciz: (S) => yol(S, ['3 mm embriyo', 'Ön bağırsak', 'Ventral trakeobronşiyal oluk']) },
      { ad: 'Ayrılma', metin: 'Oluk kaudalde kapanır ve larinks girişi dışında ilkel özofagustan ayrılır. [[K5 s. 71]]', ciz: (S) => yol(S, ['Oluk derinleşir', 'Kaudal kenarlar birleşir', 'Hava yolu ve özofagus ayrılır']) },
      { ad: 'Dallanma', metin: 'Kaudal uzantıdan iki ana bronş, proliferasyonla iki akciğer tomurcuğu gelişir. [[K5 s. 71]]', ciz: (S) => yol(S, ['Kaudal uzantı', 'İki ana bronş', 'Sağ ve sol akciğer tomurcukları']) },
      { ad: 'Tipik anomali', metin: 'Üst özofagus kör sonlanırken distal özofagus T4 hizasında trakeaya bağlanır. [[K5 s. 72]]', ciz: (S) => S.kutu(8, 12, S.w - 16, 44, { yazi: 'Üst özofagus · kör poş' })
        + S.kutu(8, 93, S.w * .38, 54, { yazi: 'Trakea' }) + S.kutu(S.w * .56, 93, S.w * .41, 54, { yazi: 'Distal özofagus' })
        + S.cizgi([[8 + S.w * .38, 120], [S.w * .56, 120]], { renk: 'accent', w: 4 })
        + S.t(S.w * .48, 108, 'T4', { a: 'middle' }) }
    ]
  });
})();
