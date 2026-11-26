(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secenek = (ad, adlar) => ({ ad, id: 'secim', liste: adlar.map(ad => ({ ad, d: ad })) });

  VIZ.an02b_bolunme = el => SEKIL.cizim(el, {
    baslik: 'Gelişen kalpte bölünme', giris: 'Ortak atriyoventriküler açıklığı, atriyumu ve çıkış yolunu ayrı kesitlerde inceleyin. [[K5 s. 92–93]]',
    gorunumler: [
      { ad: 'AV açıklık', resim: 'img/anatomi/02b-septasyon.webp', en: 1024, boy: 437, kirp: [0, 12, 330, 408],
        noktalar: [
          { x: 166, y: 218, ad: 'Endokardiyal yastıklar', metin: 'Dorsal ve ventral yastıklar orta hatta birleşerek ortak atriyoventriküler açıklığı ikiye ayırır. [[K5 s. 92]]' },
          { x: 82, y: 218, ad: 'Sağ açıklık', metin: 'Birleşen yastıkların sağında triküspit açıklık kalır. [[K5 s. 92]]' },
          { x: 245, y: 219, ad: 'Sol açıklık', metin: 'Yastıkların solundaki geçit mitral açıklıktır. [[K5 s. 92]]' },
        ] },
      { ad: 'Atriyum', resim: 'img/anatomi/02b-septasyon.webp', en: 1024, boy: 437, kirp: [334, 23, 402, 382],
        noktalar: [
          { x: 569, y: 141, ad: 'Foramen sekundum', metin: 'Septum primum ortak atriyumun tavanından ve arka duvarından iner. [[K5 s. 92]] Yastıklarla birleşmeden önce üst bölümünde foramen sekundum oluşur. [[K5 s. 92]]' },
          { x: 459, y: 224, ad: 'Septum sekundum', metin: 'Primumun sağındaki ikinci yaprak aşağı uzanır ve serbest alt kenarı primumdaki deliği örter. [[K5 s. 92]]' },
          { x: 426, y: 277, ad: 'Serbest alt kenar', metin: 'Örtüşen iki yaprak, kanın sağ atriyumdan sol atriyuma geçebildiği kapaklı yolu, foramen ovaleyi oluşturur. [[K5 s. 92–93]]' },
        ] },
      { ad: 'Çıkış yolu', resim: 'img/anatomi/02b-septasyon.webp', en: 1024, boy: 437, kirp: [739, 0, 285, 437],
        noktalar: [
          { x: 881, y: 167, ad: 'Spiral septum', metin: 'Trunkus arteriozusu bölen spiral septum aşağı büyüyüp ventriküller arasındaki kaslı septumla birleşir. [[K5 s. 93]]' },
          { x: 849, y: 40, ad: 'Pulmoner trunkus', metin: 'Ortak çıkış ayrılınca sağ ventrikülden gelen kan pulmoner trunkusa yönelir. [[K5 s. 93]]' },
          { x: 966, y: 24, ad: 'Aort', metin: 'Sol ventrikülün çıkışı aorta açılır. [[K5 s. 93]]' },
        ] },
    ],
  });

  VIZ.an02b_ark = el => SEKIL.cizim(el, {
    baslik: 'Rekürren laringeal sinirin dönüşü', giris: 'Her tarafta vagusu bulun ve dalının larinkse doğru döndüğü yeri seçin. [[K5 s. 94–95]]',
    gorunumler: [
      { ad: 'Sağ', resim: 'img/anatomi/02b-rekurren.webp', en: 1024, boy: 512, kirp: [0, 0, 425, 508],
        noktalar: [
          { x: 225, y: 140, ad: 'Sağ vagus', metin: 'Larinkse giden rekürren dal vagustan ayrılır. [[K5 s. 94]]' },
          { x: 141, y: 258, ad: 'Sağ subklavyen arter', metin: 'Beşinci ark ile distal altıncı ark gerileyince sağdaki dönüşü dördüncü arkın türevi olan subklavyen arter belirler. [[K5 s. 94]]' },
          { x: 240, y: 323, ad: 'Sağ rekürren sinir', metin: 'Dal subklavyen arterin altından döner ve larinkse doğru yükselir. [[K5 s. 94]]' },
        ] },
      { ad: 'Sol', resim: 'img/anatomi/02b-rekurren.webp', en: 1024, boy: 512, kirp: [500, 0, 524, 510],
        noktalar: [
          { x: 836, y: 83, ad: 'Sol vagus', metin: 'Sol rekürren laringeal sinir vagusun bir dalıdır. [[K5 s. 94]]' },
          { x: 661, y: 210, ad: 'Aort arkı', metin: 'Aort arkı, kendisinden çok daha küçük olan ligamentum arteriozumun üzerinden geçer. [[K5 s. 94–95]]' },
          { x: 766, y: 303, ad: 'Ligamentum arteriozum', metin: 'Pulmoner trunkusla bağlantılı kalan sol altıncı ark dorsal aortla bağlantısını korur: fetüste duktus arteriozusu, erişkinde bu bağı oluşturur. [[K5 s. 94–95]]' },
          { x: 808, y: 294, ad: 'Sol rekürren sinir', metin: 'Sinir arkın altında bağı dolanarak larinkse döner. [[K5 s. 94–95]]' },
        ] },
    ],
  });

  // Her basamakta seçilen akım yukarıdan aşağıya okunur.
  const yollar = [
    ['Plasentadan', ['Umbilikal ven', 'Duktus venozus', 'Vena kava inferior', 'Sağ atriyum'], 'Duktus venozus, plasentadan gelen kanın büyük kısmını karaciğeri atlayarak kalbe taşır. [[K5 s. 95]]'],
    ['Beyin ve kalp', ['Foramen ovale', 'Sol atriyum → sol ventrikül', 'Çıkan aort', 'Beyin ve kalp'], 'Alt kavadan gelen kanın yöneldiği bu yolda vertebral, karotis ve koroner arterler görece iyi oksijenlenmiş kan alır. [[K5 s. 95–96]]'],
    ['Alt gövde', ['Üst kava → sağ atriyum', 'Triküspit → sağ ventrikül', ['Pulmoner trunkus', '→ Duktus arteriozus'], 'İnen aort'], 'Alt gövdeyi besleyen akımın plasentaya dönüşü internal iliak arterlerden ayrılan umbilikal arterlerle olur. [[K5 s. 96]]'],
    ['İlk soluk', ['Akciğerler genişler', 'Pulmoner direnç düşer', 'Sol atriyum basıncı yükselir', 'Septumlar karşı karşıya gelir'], 'Sağ atriyum basıncındaki azalma ve sol atriyum basıncındaki artış, foramen ovalenin kapakçığını kapatır. [[K5 s. 96]]'],
    ['Duktus', ['Oksijen gerilimi artar', 'Duktus kası kasılır', 'İşlevsel kapanma', '2–3 ayda obliterasyon'], 'Duktus arteriozusun ilk kapanması kasılmayla gerçekleşir, anatomik kapanma daha sonra tamamlanır. [[K5 s. 96]]'],
  ];
  function zincir(S, adlar) {
    const x = S.w / 2, w = Math.min(368, S.w - 20);
    return adlar.map((ad, i) => {
      const y = 10 + 65*i;
      return (i ? S.ok([[x,y-22],[x,y-3]], { renk: 'accent' }) : '')
        + S.kutu(x-w/2, y, w, 42, { yazi: ad, dolgu: i === adlar.length-1 ? 'accent-soft' : 'paper' });
    }).join('');
  }
  VIZ.an02b_fetus = el => SEKIL.adim(el, {
    baslik: 'Fetal akım ve doğumda geçiş', vb: [640, 260], vbDar: [380, 260], oto: false,
    adimlar: yollar.map(([ad, yol, metin]) => ({ ad, metin, ciz: S => zincir(S, yol) })),
  });

  const defektler = {
    'Fallot': [['Spiral septumun yer değiştirmesi', ['Dar pulmoner çıkış', 've ata binen aort'], ['Ventriküler septal defekt', 've sağ ventrikül hipertrofisi'], 'Sağdan sola geçiş ve siyanoz'],
      'Sağ ventriküldeki desatüre kan defektten sol ventriküle, ayrıca doğrudan aorta geçer. [[K5 s. 97]]'],
    'ASD': [['Atriyal septum', 'Sekundum: yukarıdaki açıklık', 'Primum: AV sınıra yakın açıklık'],
      'Primum defektine membranöz ventriküler septum defekti de eşlik edebilir. [[K5 s. 96]]'],
    'VSD': [['Ventriküler septum', 'Çok geniş açıklık', 'Ortak ventrikül boşluğu', 'Üç odacıklı kalp'],
      'Ventriküllerin tek boşluk gibi birleşmesi çok geniş defektte görülebilir. [[K5 s. 96]]'],
    'PDA': [['Aort ve pulmoner trunkus', 'Arada açık kalan duktus', 'Sol kalpte ilerleyici hipertrofi', 'Eşlik eden pulmoner hipertansiyon'],
      'Patent duktus düzeltilmezse sol kalp hipertrofisi ve pulmoner hipertansiyon gelişir. [[K5 s. 97]]'],
  };
  VIZ.an02b_fallot = el => SEKIL.sahne(el, {
    baslik: 'Doğumsal defektlerin karşılaştırılması', vb: [640, 260], vbDar: [380, 260],
    secenek: secenek('Defekt', Object.keys(defektler)),
    metin: p => defektler[p.secim][1],
    ciz: (S, t, p) => {
      if (p.secim === 'ASD' || p.secim === 'PDA') {
        const w = S.w - 22;
        const etiketler = defektler[p.secim][0];
        return etiketler.map((ad, i) => S.kutu(11, 12+i*62, w, 46,
          { yazi: ad, dolgu: i ? 'paper' : 'accent-soft' })).join('');
      }
      return zincir(S, defektler[p.secim][0]);
    },
  });

  VIZ.an02b_kilif = el => SEKIL.cizim(el, {
    baslik: 'Sağ karotis kılıfı', giris: 'Ön taraf üsttedir. Damarları ve iki siniri seçin. [[K5 s. 99]]',
    gorunumler: [{ ad: 'Enine kesit', resim: 'img/anatomi/02b-kilif.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 354, y: 336, ad: 'İnternal juguler ven', metin: 'Ven, alt boyunda ana karotisin lateralinde ve onunla aynı kılıfta seyreder. [[K5 s. 99]]' },
        { x: 677, y: 321, ad: 'Ana karotis arteri', metin: 'Karotis nabzı sternokleidomastoidin medial kenarının medialinde hissedilebilir. [[K5 s. 104]]' },
        { x: 520, y: 415, ad: 'Vagus', metin: 'Vagus, ven ile arter arasındaki aralığın arka bölümündedir. [[K5 s. 99]]' },
        { x: 439, y: 495, ad: 'Servikal sempatik zincir', metin: 'Zincir, ortak kılıfın hemen arkasından yukarı çıkar. [[K5 s. 99]]' },
      ] }],
  });
  VIZ.an02b_venler = el => SEKIL.cizim(el, {
    baslik: 'Brakiyosefalik venlerin birleşmesi', giris: 'Önden bakarken hastanın sağı solda kalır. Bir damarı seçerek yolunu izleyin. [[K5 s. 100–101]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/02b-venler.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 315, y: 120, ad: 'Sağ internal juguler ven', metin: 'Sigmoid sinüs juguler foramende internal juguler ven olarak devam eder. [[K5 s. 98]]' },
        { x: 176, y: 324, ad: 'Sağ subklavyen ven', metin: 'Aksiller venin devamı olan damar anterior skalenin medial kenarında internal jugulerle birleşir. [[K5 s. 100]]' },
        { x: 345, y: 418, ad: 'Sağ brakiyosefalik ven', metin: 'Yaklaşık 3 cm uzunluğundaki ven manubriumun sağ kenarı arkasında aşağı iner. [[K5 s. 100]]' },
        { x: 705, y: 120, ad: 'Sol internal juguler ven', metin: 'Klavikulanın sternal ucunun arkasında subklavyen vene katılır. [[K5 s. 98]]' },
        { x: 829, y: 323, ad: 'Sol subklavyen ven', metin: 'Torasik kanalın son ucu solda bu vene açılır. [[K5 s. 100]]' },
        { x: 538, y: 420, ad: 'Sol brakiyosefalik ven', metin: 'Yaklaşık 6 cm uzunluğundadır ve manubriumun arkasından oblik geçer. [[K5 s. 101]]' },
        { x: 382, y: 605, ad: 'Superior vena kava', metin: 'İki brakiyosefalik ven birinci kostal kıkırdağın alt kenarında birleşir. [[K5 s. 101]]' },
      ] }],
  });

  VIZ.an02b_kesit = el => SEKIL.cizim(el, {
    baslik: 'Juguler giriş ve kateter ucunun konumu', giris: 'Boyun kesitinde ultrasonla tanınan yapıları, ikinci görünümde kateter ucunun kava ile ilişkisini seçin. [[K5 s. 102–103]]',
    gorunumler: [
      { ad: 'Boyun kesiti', resim: 'img/anatomi/02b-juguler-kesit.webp', en: 1024, boy: 683, kirp: [0, 0, 850, 468],
        noktalar: [
          { x: 452, y: 78, ad: 'Deri', metin: 'Kesitin yüzeyindeki ince tabaka deridir. [[K5 s. 102]]' },
          { x: 398, y: 129, ad: 'Deri altı', metin: 'İğne deriyi geçtikten sonra deri altı dokusundan ilerler. [[K5 s. 102]]' },
          { x: 354, y: 390, ad: 'İğne ucu', metin: 'Uç internal juguler ven lümenindedir ve ultrasonla gerçek zamanlı izlenebilir. [[K5 s. 102–103]]' },
          { x: 241, y: 366, ad: 'İnternal juguler ven', metin: 'İğnenin girdiği ven, sağ alt boyunda ana karotisin lateralindedir. [[K5 s. 99]] [[K5 s. 102]]' },
          { x: 542, y: 403, ad: 'Karotis arteri', metin: 'Vene komşu karotis aynı ultrason kesitinde ayırt edilir. [[K5 s. 102–103]]' },
        ] },
      { ad: 'Kateter ucu', resim: 'img/anatomi/02b-kaval-uc.webp', en: 1024, boy: 683, kirp: [398, 25, 280, 465],
        noktalar: [
          { x: 441, y: 155, ad: 'Superior vena kava', metin: 'Juguler ve subklavyen yollardan ilerletilen santral kateterin hedef damarı superior vena kavadır. [[K5 s. 103]]' },
          { x: 467, y: 281, ad: 'Kateter ucu', metin: 'Uç, kavanın sağ atriyuma giriş düzeyinde ve damarın içinde kalır. [[K5 s. 103]]' },
          { x: 530, y: 395, ad: 'Sağ atriyum', metin: 'Kavanın açıldığı sağ atriyum, resimde kateter ucunun aşağısındadır. [[K5 s. 103]]' },
        ] },
    ],
  });
})();
