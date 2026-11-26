(() => {
  'use strict';

  VIZ.an04f_fossa = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ diz arkası',
    giris: 'Önce kalın tibial siniri, sonra fibula boynuna doğru ayrılan ortak peroneal dalı izleyin. [[K5 s. 209–210]] [[K5 s. 214]]',
    gorunumler: [
      {
        ad: 'Arkadan', resim: 'img/anatomi/04f-fossa.webp', en: 1024, boy: 1536,
        noktalar: [
          { x: 518, y: 352, ad: 'Tibial sinir', metin: 'Üst fossada damarların lateralindeki tibial sinir, alt uçta damarların medialine ulaşır. [[K5 s. 209]]' },
          { x: 704, y: 550, ad: 'Ortak peroneal sinir', metin: 'Biseps femorisin medial kenarı boyunca lateral gastroknemius başına doğru oblik iner. [[K5 s. 214]]' },
          { x: 486, y: 739, ad: 'Popliteal arter', metin: 'Arter ve ven fossaya medialden yaklaşır, tibial sinir bu damarları yüzeyden çaprazlar. [[K5 s. 209]]' },
          { x: 445, y: 666, ad: 'Popliteal ven', metin: 'Popliteal ven diz arkasındaki damar demetinin parçasıdır. [[K5 s. 210]]' },
          { x: 336, y: 1078, ad: 'Gastroknemiusun medial başı', metin: 'Bu başa giden tibial dal, diğer popliteal kas dallarının lateralden çıkma düzenine istisnadır. [[K5 s. 211]]' },
          { x: 483, y: 1133, ad: 'Sural sinir', metin: 'İki gastroknemius başı arasından çıkan sural sinir, baldırın orta düzeyinde derin fasyayı deler. [[K5 s. 211]]' },
          { x: 710, y: 1126, ad: 'Gastroknemiusun lateral başı', metin: 'Ortak peroneal sinirin sural bağlantı ve lateral kutanöz dalları bu başın üzerinden iner. [[K5 s. 215]]' },
        ],
      },
    ],
  });

  VIZ.an04f_taban = (el) => SEKIL.cizim(el, {
    baslik: 'Ayak tabanının sinirleri',
    giris: 'Başparmak tarafındaki dalı küçük parmak tabanına doğru çapraz giden dalla karşılaştırın. [[K5 s. 213]]',
    gorunumler: [
      {
        ad: 'Plantardan', resim: 'img/anatomi/04f-taban.webp', en: 1024, boy: 1536,
        noktalar: [
          { x: 259, y: 1242, ad: 'Tibial sinir', metin: 'Medial malleolün arkasında fleksör retinakulum altında iki plantar dala ayrılır. [[K5 s. 211]]' },
          { x: 365, y: 838, ad: 'Medial plantar sinir', metin: 'Abdüktör hallusis ile kısa parmak fleksörü arasından dijital dallarına ilerler. [[K5 s. 213]]' },
          { x: 534, y: 877, ad: 'Lateral plantar sinir', metin: 'Fleksör digitorum brevis ile fleksör aksesoryus arasından beşinci parmak tabanına yönelir. [[K5 s. 213]]' },
          { x: 314, y: 493, ad: 'Medial plantar dijital dal', metin: 'Medial plantar sinirin dijital dalları medial üç buçuk parmağın plantar yüzüne dağılır. [[K5 s. 213]]' },
          { x: 749, y: 454, ad: 'Beşinci parmak', metin: 'Lateral bir buçuk parmağın taban yüzü lateral plantar sinirin deri alanındadır. [[K5 s. 214]]' },
        ],
      },
    ],
  });

  VIZ.an04f_peroneal = (el) => SEKIL.cizim(el, {
    baslik: 'Fibula boynu ve ayak sırtı',
    giris: 'Fibula boynunu dolanan sinirin dallarını bacağın önünde ve lateralinde takip edin. [[K5 s. 214–217]]',
    gorunumler: [
      {
        ad: 'Ön ve lateralden', resim: 'img/anatomi/04f-peroneal.webp', en: 1024, boy: 2048,
        noktalar: [
          { x: 650, y: 323, ad: 'Fibula boynunda ortak peroneal sinir', metin: 'Sinir bu kemik işaretine karşı palpe edilebilir ve peroneus longus derininde terminal dallarını verir. [[K5 s. 214]]' },
          { x: 470, y: 733, ad: 'Derin peroneal sinir', metin: 'Ön tibial damarlarla interosseöz membranın önünden ayak bileğine doğru ilerler. [[K5 s. 215]]' },
          { x: 618, y: 794, ad: 'Yüzeyel peroneal sinir', metin: 'Peroneal ve ekstansör kas grupları arasındaki septumu izler. [[K5 s. 217]]' },
          { x: 461, y: 1232, ad: 'Ekstansör retinakulum', metin: 'Ön bacak diseksiyonunda retinakulum, ayak bileğinin önündeki tendonların üzerinde görülür. [[K5 s. 216]]' },
          { x: 378, y: 1795, ad: 'Birinci dorsal parmak aralığı', metin: 'Derin peroneal sinirin tek deri alanı, birinci ve ikinci parmağın birbirine bakan dorsal yüzleridir. [[K5 s. 216–217]]' },
          { x: 630, y: 1846, ad: 'Beşinci parmağın dış kenarı', metin: 'Sural sinirin duyusal alanı buradan mediale, yüzeyel peroneal sinir alanına taşabilir. [[K5 s. 217]]' },
        ],
      },
    ],
  });

  VIZ.an04f_pelvis = (el) => SEKIL.cizim(el, {
    baslik: 'Piriformis ve iskiyal diken',
    giris: 'Piriformisin altından çıkan pudendal sinirin kısa dönüşünü, uyluğa inen siyatik sinirin seyrinden ayırın. [[K5 s. 218–220]]',
    gorunumler: [
      {
        ad: 'Posterolateralden', resim: 'img/anatomi/04f-pelvis.webp', en: 1024, boy: 791,
        noktalar: [
          { x: 518, y: 282, ad: 'Piriformis', metin: 'Büyük siyatik foramenin en iri içeriği olan kas bu açıklığı üst ve alt kompartımanlara ayırır. [[K5 s. 219]]' },
          { x: 563, y: 515, ad: 'Siyatik sinir', metin: 'Piriformisin altında yer alan yapıların en lateralindedir. [[K5 s. 219]]' },
          { x: 416, y: 454, ad: 'İskiyal diken', metin: 'Pudendal sinir büyük foramenden çıktıktan sonra dikenin arka yüzünü çaprazlar. [[K5 s. 218]]' },
          { x: 397, y: 547, ad: 'Pudendal sinirin dönüşü', metin: 'Sinir internal pudendal damarlarla küçük foramen yoluyla perineye girer. [[K5 s. 218–219]]' },
          { x: 282, y: 531, ad: 'Sakrotüberöz bağ', metin: 'Sakrospinöz bağla birlikte büyük ve küçük siyatik foramenlerin sınırlarına katılır. [[K5 s. 219]]' },
          { x: 877, y: 461, ad: 'Büyük trokanter', metin: 'Gluteal diseksiyonda piriformis ile obturator internus ve gemelli grubunun lateralindeki kemik işaretidir. [[K5 s. 220]]' },
        ],
      },
    ],
  });

  VIZ.an04f_baldir = (el) => SEKIL.cizim(el, {
    baslik: 'Tibial sinirin baldırdaki seyri',
    giris: 'Damarların, dikey inen tibial sinire göre hangi tarafta kaldığını yukarıdan aşağıya izleyin. [[K5 s. 211–212]]',
    gorunumler: [
      {
        ad: 'Arkadan', resim: 'img/anatomi/04f-baldir.webp', en: 1024, boy: 1536,
        noktalar: [
          { x: 522, y: 115, ad: 'Tibial sinir', metin: 'Popliteusun alt kenarından sonra tibial sinir soleusun başlangıç arkının altına girer. [[K5 s. 211]]' },
          { x: 493, y: 326, ad: 'Proksimal arka tibial damarlar', metin: 'Damarlar popliteusun altında sinirin derininden geçerek medialine ulaşır. [[K5 s. 211]]' },
          { x: 442, y: 781, ad: 'Baldırda tibial sinir', metin: 'Tibialis posterior üzerinden aşağı inen sinir, distalde tibia cisminin arka yüzüne dayanır. [[K5 s. 211]]' },
          { x: 406, y: 1069, ad: 'Distal arka tibial damarlar', metin: 'Arka tibial damarlar sinire bileğe kadar eşlik eder ve distal bacakta sinirin medialinde seyreder. [[K5 s. 211]]' },
          { x: 576, y: 1184, ad: 'Sural sinir', metin: 'Baldırın distal üçte birinin posterolateralinde geniş bir deri alanını inerve eder ve lateral malleolün arkasından geçer. [[K5 s. 211]]' },
          { x: 467, y: 1338, ad: 'Aşil tendonu', metin: 'Aşil tendonu ile medial malleol arasının orta noktasından geçen dikey çizgi tibial sinirin yüzey izdüşümünü verir. [[K5 s. 211]]' },
        ],
      },
    ],
  });

  VIZ.an04f_bilek = (el) => SEKIL.cizim(el, {
    baslik: 'Ayak bileğinin iki yüzü',
    giris: 'Önce medial malleolün arkasındaki tendon, damar ve siniri, ardından ayak sırtındaki sinirleri bulun. [[K5 s. 211–212]] [[K5 s. 217–218]]',
    gorunumler: [
      {
        ad: 'Medialden', resim: 'img/anatomi/04f-bilek.webp', en: 1024, boy: 512,
        kirp: [0, 0, 640, 512],
        noktalar: [
          { x: 339, y: 253, ad: 'Medial malleol', metin: 'Tendon ve damarların sırasını belirlemek için medial malleolün ucundan laterale ilerleyin. [[K5 s. 211]]' },
          { x: 563, y: 250, ad: 'Aşil tendonu', metin: 'Aşil tendonu ve lateral malleol arası, sural blok için subkutan infiltrasyon alanıdır. [[K5 s. 218]]' },
        ],
      },
      {
        ad: 'Retinakulum altı', resim: 'img/anatomi/04f-bilek.webp', en: 1024, boy: 512,
        kirp: [358, 216, 172, 134],
        noktalar: [
          { x: 374, y: 301, ad: 'Tibialis posterior tendonu', metin: 'Medial malleolün ucuna en yakın yapı tibialis posteriorun tendonudur. [[K5 s. 211]]' },
          { x: 410, y: 285, ad: 'Fleksör digitorum longus tendonu', metin: 'Uzun parmak fleksörünün tendonu, tibialis posterior tendonu ile arka tibial ven arasındadır. [[K5 s. 211]]' },
          { x: 432, y: 294, ad: 'Arka tibial ven', metin: 'Malleol ucundan laterale ilerlerken arka tibial vene arterden önce ulaşılır. [[K5 s. 211]]' },
          { x: 451, y: 288, ad: 'Arka tibial arter', metin: 'Arter arka tibial ven ile tibial sinir arasında seyreder. [[K5 s. 211]]' },
          { x: 474, y: 266, ad: 'Tibial sinir', metin: 'Sinir arka tibial arterin hemen arkasında bulunur. [[K5 s. 217]]' },
          { x: 493, y: 278, ad: 'Fleksör hallusis longus tendonu', metin: 'Altı yapının sonuncusu uzun başparmak fleksörünün tendonudur. [[K5 s. 211]]' },
        ],
      },
      {
        ad: 'Önden', resim: 'img/anatomi/04f-bilek.webp', en: 1024, boy: 512,
        kirp: [650, 0, 374, 512],
        noktalar: [
          { x: 794, y: 198, ad: 'Derin peroneal sinir', metin: 'Bileğin önünde ekstansör hallusis tendonunun hemen laterali blok yeridir. [[K5 s. 218]]' },
          { x: 877, y: 224, ad: 'Yüzeyel peroneal sinir', metin: 'Subkutan enjeksiyon için ekstansör hallusis tendonundan lateral malleole uzanan alan kullanılır. [[K5 s. 218]]' },
          { x: 755, y: 157, ad: 'Safen sinir', metin: 'Medial malleol ile ekstansör hallusis tendonu arasındaki subkutan infiltrasyonda safen ven korunur. [[K5 s. 218]]' },
        ],
      },
      {
        ad: 'Lateral malleol arkası', resim: 'img/anatomi/04f-baldir.webp', en: 1024, boy: 1536,
        kirp: [270, 990, 420, 525],
        noktalar: [
          { x: 571, y: 1242, ad: 'Sural sinir', metin: 'Lateral malleolün arkasından ayağın dış kenarına iner. [[K5 s. 211]] Bilekte lateral malleol ile Aşil tendonu arasındaki subkutan aralıkta bloke edilir. [[K5 s. 218]]' },
        ],
      },
    ],
  });

  VIZ.an04f_segment = (el) => SEKIL.cizim(el, {
    baslik: 'Alt ekstremitede segmental deri alanları',
    giris: 'Ön ve arka yüzlerde bir işaret seçip o bölgenin segmentini söyleyin. [[K5 s. 220]]',
    gorunumler: [
      {
        ad: 'Ön yüz', resim: 'img/anatomi/04f-segment.webp', en: 1024, boy: 936,
        kirp: [130, 0, 335, 936],
        noktalar: [
          { x: 298, y: 48, ad: 'Üst ön uyluk · L1', metin: 'Ön uylukta en üst alan L1’e aittir. [[K5 s. 220]]' },
          { x: 298, y: 147, ad: 'Orta ön uyluk · L2', metin: 'Ön uyluğun segment sıralamasında L2, L1 ile L3 arasında yer alır. [[K5 s. 220]]' },
          { x: 301, y: 256, ad: 'Alt ön uyluk · L3', metin: 'Ön uyluktaki yukarıdan aşağı dizilimin son segmenti L3’tür. [[K5 s. 220]]' },
          { x: 366, y: 518, ad: 'Anteromedial bacak · L4', metin: 'Bacağın ön ve medial yüzü L4 tarafından inerve edilir. [[K5 s. 220]]' },
          { x: 253, y: 570, ad: 'Anterolateral bacak · L5', metin: 'L5 alanı bacağın anterolateralinden ayağın medialine uzanır. [[K5 s. 220]]' },
          { x: 314, y: 877, ad: 'Medial ayak · L5', metin: 'K5, ayağın medial tarafını L5 alanı içinde tarif eder. [[K5 s. 220]]' },
        ],
      },
      {
        ad: 'Arka yüz', resim: 'img/anatomi/04f-segment.webp', en: 1024, boy: 936,
        kirp: [535, 0, 360, 936],
        noktalar: [
          { x: 720, y: 186, ad: 'Arka uyluk · S2', metin: 'Uyluğun arka yüzü S2’ye aittir. [[K5 s. 220]]' },
          { x: 726, y: 531, ad: 'Arka bacak · S2', metin: 'S2 alanı bacağın arka yüzünü de kapsar. [[K5 s. 220]]' },
          { x: 755, y: 854, ad: 'Lateral ayak · S1', metin: 'S1 ayağın lateral tarafını ve tabanını inerve eder. [[K5 s. 220]]' },
        ],
      },
    ],
  });

})();
