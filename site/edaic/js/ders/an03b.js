(() => {
  'use strict';
  const VIZ = window.VIZ;
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  VIZ.an03b_kemik = el => SEKIL.cizim(el, {
    baslik: 'Sakrumun kemik işaretleri',
    giris: 'Bir görünüm ve bir kemik işareti seçin.',
    gorunumler: [
      { ad: 'Önden', resim: 'img/anatomi/03b-on.webp', en: 1024, boy: 1024, noktalar: [
        nokta(503, 194, 'Promontoryum', 'Tabandaki oval gövdenin öne taşan kenarıdır. [[K5 s. 123]]'),
        nokta(178, 121, 'Ala', 'Lateral kitlenin üst yüzüdür, lumbosakral kordon burada oluk bırakır. [[K5 s. 123]]'),
        nokta(490, 522, 'Transvers çizgi', 'Bu dört çizgi komşu sakral gövdelerin birleşme yerlerini gösterir. [[K5 s. 120]]'),
        nokta(677, 349, 'Ön sakral foramen', 'Üst dört sakral sinirin ön primer dalları bu çift deliklerden çıkar. [[K5 s. 120]]'),
        nokta(827, 501, 'Sinir oluğu', 'Ön dal foramenden çıktıktan sonra lateral kitle üzerinde bir oluk bırakır. [[K5 s. 120]]'),
        nokta(871, 412, 'Lateral kitle', 'Ön foramen sırasının dışındaki bu kitle aşağıya doğru daralır. [[K5 s. 120]]'),
      ] },
      { ad: 'Arkadan', resim: 'img/anatomi/03b-arka.webp', en: 1024, boy: 1024, noktalar: [
        nokta(697, 55, 'Üst eklem faseti', 'L5’in alt fasetini karşılayan eklem yüzü arkaya ve içe bakar. [[K5 s. 123]]'),
        nokta(510, 405, 'Orta krest', 'Kaynaşmış spinöz çıkıntılar burada küçük tüberküller halinde seçilir. [[K5 s. 120]]'),
        nokta(451, 505, 'Kaynaşmış laminalar', 'Orta krestin iki yanındaki laminalar sakral kanalın kemik tavanına katılır. [[K5 s. 120]]'),
        nokta(614, 445, 'Eklem kresti', 'Kaynaşmış eklem fasetlerinin tüberküllerini taşıyan krest aşağıda boynuzda biter. [[K5 s. 120]]'),
        nokta(693, 476, 'S2 arka forameni', 'İkinci arka foramen arka üst iliak çıkıntının yaklaşık 1 cm altında ve medialindedir. [[K5 s. 122]]'),
        nokta(809, 470, 'Lateral krest', 'Transvers çıkıntıların uçları arka foramenlerin dışındaki tüberkülleri oluşturur. [[K5 s. 122]]'),
        nokta(506, 902, 'Sakral hiatus', 'Eksik laminalar nedeniyle kanalın alt arka yüzünde üçgen bir açıklık kalır. [[K5 s. 123]]'),
        nokta(578, 947, 'Sakral boynuz', 'İki boynuzun arasındaki çöküntü hiatusun palpasyonuna kılavuzluk eder. [[K5 s. 123–124]]'),
      ] },
    ],
  });

  const ortali = { a: 'middle', c: 'k' };
  VIZ.an03b_kaudal = el => SEKIL.adim(el, {
    baslik: 'Kaudal yolun yüzey işaretleri ve iğne yönü, şematik', vb: [360, 220], oto: false,
    adimlar: [
      { ad: 'Yüzey', metin: 'Yan veya yüzüstü konumda iki arka üst iliak çıkıntı ile hiatus yaklaşık eşkenar bir üçgenin köşelerine düşer. [[K5 s. 123]]',
        ciz: S => S.cizgi([[105,60],[255,60],[180,190],[105,60]], { kesik: true })
          + S.daire(105,60,6,{dolgu:'basic'}) + S.daire(255,60,6,{dolgu:'basic'})
          + S.daire(180,190,6,{dolgu:'accent'}) + S.t(180,32,'Arka üst iliak çıkıntılar',ortali)
          + S.t(180,217,'Hiatus',ortali) },
      { ad: 'Bağı geçiş', metin: 'Kitaptaki tarifte sıklıkla 21 G hipodermik iğne kullanılır ve arka sakrokoksigeal bağa deriye yaklaşık 45° açıyla yaklaşılır. [[K5 s. 124]]',
        ciz: S => igne(S,false) },
      { ad: 'Kanala yöneliş', metin: 'Bağ geçilince göbek alçaltılır, iğne deriye daha paralel hale gelir ve sakral kanal içinde başa doğru ilerletilebilir. [[K5 s. 124]]',
        ciz: S => igne(S,true) },
      { ad: 'Dural kese', metin: 'Dural kese S2’de biter, filum terminalenin yer aldığı ekstradural aralık ise aşağıda hiatustan erişilebilir durumdadır. [[K5 s. 123–124]]',
        ciz: S => S.kutu(35,14,78,185,{dolgu:'basic-soft'})
          + S.kutu(56,15,36,78,{dolgu:'clin-soft',renk:'clin'})
          + S.cizgi([[75,94],[75,172]],{renk:'basic'})
          + S.cizgi([[92,92],[133,92]],{renk:'clin'})
          + S.t(139,97,'S2 · Dural kese sonu',{c:'k'})
          + S.cizgi([[76,137],[133,137]],{renk:'basic'})
          + S.t(139,142,'Filum terminale',{c:'k'})
          + S.ok([[141,188],[108,181],[85,167]],{renk:'accent'})
          + S.t(148,193,'Hiatustan giriş',{c:'k'}) },
    ],
  });
  function igne(S, kanalda) {
    return S.t(12,23,'Kaudal', {c:'k'}) + S.t(348,23,'Kraniyal',{a:'end',c:'k'})
      + S.cizgi([[15,105],[345,105]],{renk:'ink'})
      + S.cizgi([[105,135],[215,135]],{renk:'clin',w:6})
      + S.cizgi([[215,135],[345,135]],{renk:'muted',w:9})
      + S.cizgi([[70,187],[345,187]],{renk:'muted',w:9})
      + S.t(271,173,'Sakral kanal',ortali) + S.t(49,99,'Deri',ortali)
      + S.t(95,158,'Arka bağ',ortali)
      + S.ok(kanalda ? [[48,97],[235,153]] : [[86,58],[169,141]],{renk:'accent',w:4})
      + (kanalda ? '' : S.t(176,92,'≈45°',ortali));
  }

  VIZ.an03b_defekt = el => SEKIL.cizim(el, {
    baslik: 'Arka ark açıklığı ve kesenin içeriği',
    giris: 'Omurlara üstten bakıyorsunuz. Her örnekte arka taraf yukarıdadır. [[K5 s. 125–126]]',
    gorunumler: [{ ad: 'Üstten', resim: 'img/anatomi/03b-defekt.webp', en: 1024, boy: 1024, noktalar: [
      nokta(258, 235, 'Occulta · kanal içindeki sinir dokusu', 'Yalnız kemik ark kapanmamıştır. Kese yoktur, meninksler ve sinir dokusu normaldir. [[K5 s. 125]]'),
      nokta(770, 83, 'Meningosel · meningeal kese', 'Meninksler arka açıklıktan kese halinde çıkar. Kesenin içinde sinir dokusu bulunmaz. [[K5 s. 125]]'),
      nokta(270, 646, 'Miyelomeningosel · kesedeki kökler', 'Omurilik veya kökler kesenin içine uzanır ve duvarına yapışık olabilir. [[K5 s. 125]]'),
      nokta(795, 626, 'Ayrık arkın kemik kenarı', 'Bu preparatta yalnız kemik kenarları görülür. Miyeloselde (raşişizis) nöral tüp kapanmaz, açıklığı kırmızı, granüler bir nöral plak doldurur. [[K5 s. 125]] Plağın merkezinden BOS sızar. [[K5 s. 125]] Kitap bu biçimi yaşamla bağdaşmaz olarak tanımlar. [[K5 s. 125]]'),
    ] }],
  });

  VIZ.an03b_gecis = el => SEKIL.cizim(el, {
    baslik: 'L5 ve S1 geçiş varyantları',
    giris: 'İki örnekte L5, S1 ve sakrumun geri kalanı arasındaki sınırları karşılaştırın. [[K5 s. 125]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/03b-gecis.webp', en: 1024, boy: 1024, noktalar: [
      nokta(260, 340, 'Sakralizasyon · L5–S1 sınırı', 'L5 sakrumla kısmen veya tamamen kaynaşabilir. Solda L5 ile hemen altındaki S1 arasında tam kaynaşma görülür. [[K5 s. 125]]'),
      nokta(764, 393, 'Lomberizasyon · ayrı S1', 'S1 sakrumun geri kalanından kısmen veya tamamen ayrılabilir. Sağda en üstte L5, onun altında tamamen ayrılmış S1, altta sakrumun geri kalanı görülür. [[K5 s. 125]]'),
    ] }],
  });

  VIZ.an03b_baglar = el => SEKIL.cizim(el, {
    baslik: 'Lomber omurlar arasında beş bağ',
    giris: 'Boyuna kesitte gövdeler solda, spinöz çıkıntıların uçları sağdadır. [[K5 s. 128]]',
    gorunumler: [{ ad: 'Boyuna kesit', resim: 'img/anatomi/03b-baglar.webp', en: 1024, boy: 683, noktalar: [
      nokta(980, 292, 'Supraspinöz bağ', 'Bu güçlü fibröz bağ, C7’den sakruma kadar komşu spinöz çıkıntıların uçlarını birleştirir. [[K5 s. 128]]'),
      nokta(811, 298, 'İnterspinöz bağ', 'Komşu spinöz çıkıntıların gövdeleri arasında uzanır. [[K5 s. 128]] Bu bağlar özellikle boyunda ince ve narindir. [[K5 s. 128]]'),
      nokta(613, 300, 'Sarı bağ', 'Komşu laminaları ligamentum flavumun dikey elastik lifleri birleştirir. [[K5 s. 128]]'),
      nokta(30, 332, 'Ön longitudinal bağ', 'C2’den üst sakruma inerken genişler. [[K5 s. 128]] Disklerin ön yüzlerine ve komşu omur gövdelerinin ön kenarlarına yapışır. [[K5 s. 128]]'),
      nokta(423, 332, 'Arka longitudinal bağ', 'Gövdenin arkasında seyreder. [[K5 s. 128]] Ön longitudinal bağın öndeki tutunmalarına karşılık, diskin arka yüzüne ve komşu gövdelerin arka kenarlarına tutunur. [[K5 s. 128]]'),
    ] }],
  });

  VIZ.an03b_dens = el => SEKIL.cizim(el, {
    baslik: 'Densi çevreleyen bağlar',
    giris: 'Arkadan bakışta solda çapraz bağ, sağda bu bağ kaldırıldığında görülen derin bağlar yer alır. [[K5 s. 129–130]]',
    gorunumler: [{ ad: 'Arkadan', resim: 'img/anatomi/03b-dens.webp', en: 1024, boy: 512, noktalar: [
      nokta(175, 313, 'Transvers bağ', 'Atlasın iki lateral kitlesinin medial yüzleri arasında uzanır ve densi ön arkın arka yüzündeki fasete bastırır. [[K5 s. 130]]'),
      nokta(254, 225, 'Çapraz bağ · üst demet', 'Transvers bağdan oksiputa ve aksis gövdesine daha zayıf uzunlamasına demetler ayrılır. [[K5 s. 130]] Yatay bant ve iki dikey demet birlikte çapraz bağı oluşturur. [[K5 s. 130]]'),
      nokta(815, 235, 'Alar bağ', 'Dens tepesinin iki yanından oksipital kondillerin medial yüzlerine uzanan iki kısa, güçlü bağ başın aşırı dönmesini sınırlar. [[K5 s. 130]]'),
      nokta(866, 374, 'Aksesuar alar bağ', 'Her yanda aksis gövdesini atlasın lateral kitlesine bağlar. [[K5 s. 130]]'),
      nokta(768, 194, 'Apikal bağ', 'Densin ucunu foramen magnumun ön kenarına bağlayan ince demet, embriyonik notokordun kraniyal uzantısından kalır. [[K5 s. 130]]'),
    ] }],
  });
})();
