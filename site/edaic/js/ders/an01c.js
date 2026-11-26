(function () {
  'use strict';
  const VIZ = window.VIZ;
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.an01c_iskelet = (el) => SEKIL.cizim(el, {
    baslik: 'Larinks iskeletinin ön ve arka yüzleri',
    giris: 'Önden tiroid ile krikoid arasındaki bağı, arkadan krikoid üzerinde duran aritenoid çiftini bulun. [[K5 s. 25–26]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/01c-on.webp', en: 1024, boy: 1024, noktalar: [
      nokta(505, 167, 'Hiyoid gövdesi', 'Hiyoid, tirohiyoid membranın üst tutunma yeridir. [[K5 s. 26]]'),
      nokta(653, 243, 'Tirohiyoid membran', 'İnternal laringeal dal ve üst laringeal damarlar bu membranı birlikte deler. [[K5 s. 26]]'),
      nokta(508, 380, 'Tiroid çentiği', 'Üstte iki laminanın ayrıldığı orta çizgi girintisidir. [[K5 s. 24]]'),
      nokta(377, 484, 'Tiroid laminası', 'İki lamina önde birleşerek kalkan biçimli tiroid kıkırdağı oluşturur. [[K5 s. 24]]'),
      nokta(506, 660, 'Krikotiroid bağ', 'Tiroidin alt kenarı ile krikoid ark arasındaki bu yumuşak alan ön boyunda palpe edilebilir. [[K5 s. 29–30]]'),
      nokta(535, 753, 'Krikoid ark', 'Öndeki dar ark arkada geniş bir laminayla devam eder. [[K5 s. 25]]'),
      nokta(473, 820, 'Krikotrakeal bağ', 'Krikoidi birinci trakea halkasına bağlar. [[K5 s. 26]]'),
      nokta(541, 873, 'Birinci trakea halkası', 'Halka krikoidin altından palpe edilir ve perkütan giriş için sıklıkla bunun altındaki aralık kullanılır. [[K5 s. 33]]'),
    ] }, { ad: 'Arkadan', resim: 'img/anatomi/01c-arka.webp', en: 1024, boy: 936, noktalar: [
      nokta(506, 170, 'Epiglot', 'Yukarı ve arkaya uzanan serbest ucu girişin üzerinde yer alır. [[K5 s. 25]]'),
      nokta(842, 109, 'Tiroidin üst boynuzu', 'Her laminanın arka kenarının üst ucu bir boynuz oluşturur. [[K5 s. 25]]'),
      nokta(358, 344, 'Kornikulat kıkırdak', 'Aritenoid piramidinin tepesindeki küçük nodüldür. [[K5 s. 26]]'),
      nokta(656, 442, 'Aritenoid kıkırdak', 'Piramidin tabanı krikoid laminanın üst yan bölümüne oturur. [[K5 s. 25]]'),
      nokta(264, 461, 'Lateral kas çıkıntısı', 'Posterior ve lateral krikoaritenoid kasların tutunduğu yan çıkıntıdır. [[K5 s. 25]]'),
      nokta(486, 686, 'Krikoid lamina', 'Krikoidin arka yüzündeki dörtgen lamina sağ ve sol aritenoid için eklem yüzü taşır. [[K5 s. 25]]'),
      nokta(780, 730, 'Tiroidin alt boynuzu', 'Alt boynuzun iç yüzündeki faset krikoidle eklem yapar. [[K5 s. 25]]'),
    ] }],
  });

  VIZ.an01c_glottis = (el) => SEKIL.cizim(el, {
    baslik: 'Laringoskopik görünüm, ön taraf üstte',
    giris: 'Tellerin önde birleştiği noktayı ve arkada ayrı duran uçlarını izleyin. [[K5 s. 39]]',
    gorunumler: [{ ad: 'Üstten', resim: 'img/anatomi/01c-glottis.webp', en: 1024, boy: 1024, noktalar: [
      nokta(340, 72, 'Dil kökü', 'Dil kökü laringoskopide ilk görülen yapılardandır. [[K5 s. 39]]'),
      nokta(691, 178, 'Vallekula', 'Orta glossoepiglottik kıvrımın iki yanındaki ceplerden biridir. [[K5 s. 25]]'),
      nokta(506, 123, 'Orta glossoepiglottik kıvrım', 'Orta çizgideki mukoza kıvrımı epiglotun ön yüzünden dile geçer. [[K5 s. 25]]'),
      nokta(415, 295, 'Epiglot', 'Larinks girişinin ön sınırını epiglotun arka yüzü oluşturur. [[K5 s. 39]]'),
      nokta(510, 335, 'Epiglottik tüberkül', 'Epiglotun arka yüzünün alt bölümündeki kabarıklıktır. [[K5 s. 25]]'),
      nokta(205, 450, 'Ariepiglottik kıvrım', 'Girişin yan kenarı epiglotun yanından posteromediale doğru ilerler. [[K5 s. 39]]'),
      nokta(623, 490, 'Vestibüler kıvrım', 'Yalancı ses telinin altında vestibüler bağ uzanır. [[K5 s. 29]]'),
      nokta(404, 640, 'Vokal kıvrım', 'Parlak tel, öndeki tiroid açısından arkadaki aritenoidin vokal çıkıntısına gider. [[K5 s. 39]]'),
      nokta(502, 579, 'Rima glottidis', 'Teller arasındaki üçgenin tepesi öne bakar. [[K5 s. 39]]'),
      nokta(504, 697, 'Trakea halkası', 'Açıklıktan bakıldığında derinde üstteki iki ya da üç halka seçilebilir. [[K5 s. 39]]'),
    ] }],
  });

  // Seçilen anatomik ilişkiyi ortak bir dikey düzende gösterir.
  function yol(el, baslik, yollar) {
    return SEKIL.adim(el, {
      baslik, vb: [640, 220], vbDar: [360, 220], oto: false,
      adimlar: yollar.map(([ad, duraklar, metin]) => ({
        ad, metin, ciz: S => {
          const x = S.w / 2;
          return duraklar.map((durak, i) => {
            const y = 12 + i * 72;
            return (i ? S.ok([[x, y - 24], [x, y - 3]], { renk: 'muted' }) : '')
              + S.kutu(x - 148, y, 296, 46, { yazi: durak, renk: i === 2 ? 'accent' : 'basic', dolgu: i === 2 ? 'accent-soft' : 'paper' });
          }).join('');
        },
      })),
    });
  }

  VIZ.an01c_katman = (el) => SEKIL.cizim(el, {
    baslik: 'Larinksin yan duvarı, arkadan görülen koronal kesit',
    giris: 'Mukoza altındaki fibröz çatıyı larinks sinüsü üst ve alt kata ayırır. [[K5 s. 29]]',
    gorunumler: [{ ad: 'Koronal kesit', resim: 'img/anatomi/01c-katman.webp', en: 1024, boy: 683, noktalar: [
      nokta(286, 142, 'Kuadrangüler membran', 'Üst kat, ariepiglottik kıvrıma ve larinks girişine destek verir. [[K5 s. 29]]'),
      nokta(332, 254, 'Vestibüler kıvrım', 'Kuadrangüler membranın kalınlaşan alt kenarı vestibüler bağdır. [[K5 s. 29]] Bu bağ üstteki yalancı ses telini destekler. [[K5 s. 29]]'),
      nokta(346, 306, 'Larinks sinüsü', 'Arkadan açılan larinkste vestibüler kıvrım ile vokal kıvrım arasında yarık biçiminde görülür. [[K5 s. 27]]'),
      nokta(663, 149, 'Sakkül', 'Sinüsün ön kısmından yukarı uzanan bu kör kese, vestibüler kıvrımla tiroid laminasının iç yüzü arasındadır. [[K5 s. 29]]'),
      nokta(681, 345, 'Vokal kıvrım', 'Krikovokal membranın serbest üst kenarı vokal bağı oluşturur. [[K5 s. 28–29]] Bu bağın desteklediği gerçek ses telinin gerginliği ses üretimi sırasında değişir. [[K5 s. 33–35]]'),
      nokta(669, 455, 'Krikovokal membran', 'Alt katın elastik lifleri krikoidin üst kenarından vokal bağa doğru yükselir. [[K5 s. 29]]'),
    ] }],
  });

  VIZ.an01c_erisim = (el) => SEKIL.cizim(el, {
    baslik: 'Ön boyunda krikotiroid oluk ve üst trakea halkaları',
    giris: 'Tiroid çentiğinden başlayıp orta çizgi boyunca krikoide, ardından trakea halkalarına inin. [[K5 s. 24–26]]',
    gorunumler: [{ ad: 'Önden diseksiyon', resim: 'img/anatomi/01c-erisim.webp', en: 1024, boy: 1121, noktalar: [
      nokta(506, 127, 'Tiroid çentiği', 'İki tiroid laminasının birleştiği yerdeki üst girintidir. [[K5 s. 24]]'),
      nokta(401, 330, 'Tiroid laminası', 'Laminayı aşağı izleyince tiroidin alt kenarına ulaşılır. [[K5 s. 24–25]]'),
      nokta(555, 504, 'Tiroidin alt kenarı', 'Palpe edilen yumuşak oluğun üst sınırıdır. [[K5 s. 29]]'),
      nokta(509, 589, 'Krikotiroid bağ', 'Oluk bu bağın üzerindedir. [[K5 s. 29]] K5’in cerrahi tarifinde bağdaki kesi genişletilir ve küçük bir tüple ventilasyon sağlanır. [[K5 s. 30]]'),
      nokta(516, 724, 'Krikoidin ön arkı', 'Oluğun alt sınırını krikoid oluşturur. [[K5 s. 29]]'),
      nokta(467, 863, 'Birinci trakea halkası', 'Krikoidin altında palpe edilen ilk halkadır. [[K5 s. 31–33]]'),
      nokta(548, 928, 'İlk iki halka arası', 'Perkütan trakeostomi için sık kullanılan düzeydir. [[K5 s. 33]]'),
    ] }],
  });

  const hareket = [
    ['Abdüksiyon', 58, 164, 'Posterior krikoaritenoid', 'İki aritenoid dışa döndüğünde vokal çıkıntılar ve bunlara bağlı teller birbirinden uzaklaşır. [[K5 s. 35]]'],
    ['Addüksiyon', 2, 164, 'Lateral krikoaritenoid', 'İçe rotasyonla teller yaklaşır, arka açıklığın kapanmasına interaritenoid de katılır. [[K5 s. 35]]'],
    ['Gerilme', 11, 193, 'Krikotiroid', 'Aritenoidleri taşıyan krikoid laminanın geriye yatması ön ve arka tutunma yerlerini birbirinden uzaklaştırır. [[K5 s. 35]]'],
    ['Gevşeme', 11, 140, 'Tiroaritenoid', 'Aritenoidin öne çekilmesi telin iki tutunma noktası arasındaki uzaklığı azaltır. [[K5 s. 35]]'],
  ];
  VIZ.an01c_hareket = (el) => SEKIL.sahne(el, {
    baslik: 'Üstten glottis, hareketler şematik', vb: [640, 245], vbDar: [360, 245],
    secenek: { id: 'hal', ad: 'Hareket', liste: hareket.map(([ad], i) => ({ d: String(i), ad })) },
    metin: p => hareket[p.hal][4],
    ciz: (S, t, p) => {
      const [, aciklik, arka, kas] = hareket[p.hal];
      const x = S.w / 2;
      return S.t(x, 22, 'Ön · tiroid açısı', { a: 'middle' })
        + S.cizgi([[x - aciklik, arka], [x, 45], [x + aciklik, arka]], { renk: 'accent', w: 6 })
        + [-1, 1].map(yon => S.daire(x + yon * aciklik, arka, 5, { dolgu: 'basic', renk: 'basic' })).join('')
        + S.t(x, 225, kas, { a: 'middle', c: 'b' });
    },
  });

  VIZ.an01c_dolasim = (el) => yol(el, 'Lenfin izlediği yol', [
    ['Supraglottis', ['Ses tellerinin üstü', 'Üst laringeal ven boyunca', 'Üst derin servikal düğümler'], 'Üst bölgenin lenfini taşıyan damarlar üst laringeal venle birlikte seyreder. [[K5 s. 36]]'],
    ['İnfraglottis', ['Ses tellerinin altı', 'Alt laringeal ven boyunca', 'Alt derin servikal zincir'], 'Derin servikal zincirin alt bölümüne giden yol alt laringeal veni izler. [[K5 s. 36]]'],
    ['Ön bölüm', ['Alt larinksin ön kısmı', 'Ek drenaj', ['Prelaringeal ve', 'pretrakeal düğümler']], 'Alt bölümün ön yüzünde derin servikal drenaja ek olarak iki küçük düğüm grubu bulunur. [[K5 s. 36]]'],
  ]);
  VIZ.an01c_sinir = (el) => yol(el, 'Sinir yaralanmasında işlev ve bulgu', [
    ['Eksternal dal', ['Üst tiroid damarları', 'Krikotiroid işlev kaybı', 'Ses kısıklığı'], 'Üst kutuptaki sinir hasarı telin gerilmesini bozar, karşı krikotiroid telafi edebilir. [[K5 s. 37]]'],
    ['Tek rekürren', ['Tek taraflı sinir hasarı', 'Aynı tarafta hareketsiz tel', 'Karşı telde aşırı addüksiyon'], 'Etkilenen tel orta hatta yakın ve daha aşağıdadır, karşı telin hareketi hafif kısıklığı giderebilir. [[K5 s. 38]]'],
    ['İki rekürren', ['İki taraflı sinir hasarı', 'İnspirasyonda teller yaklaşır', 'Stridor ve ağır dispne'], 'İnspirasyonda birbirine yönelen felçli teller glottiste kapak benzeri tıkanma oluşturur. [[K5 s. 38]]'],
  ]);

  VIZ.an01c_derece = (el) => SEKIL.cizim(el, {
    baslik: 'Direkt laringoskopide Cormack–Lehane dereceleri',
    giris: 'Glottisin ve epiglotun ne kadarının seçilebildiğine göre görünüm dört dereceye ayrılır. [[K5 s. 41]]',
    gorunumler: [
      ['Derece 1', [120, 74, 264, 364], nokta(251, 322, 'Tüm yapılar', 'Glottik açıklığın tamamı dahil tüm yapılar görünür. [[K5 s. 41]]')],
      ['Derece 2', [636, 74, 264, 364], nokta(763, 388, 'Arka glottis', 'Glottik açıklığın yalnız arka bölümü seçilir. [[K5 s. 41]]')],
      ['Derece 3', [120, 586, 264, 364], nokta(250, 715, 'Yalnız epiglot', 'Epiglot görülür, glottis görüş alanının dışında kalır. [[K5 s. 41]]')],
      ['Derece 4', [636, 586, 264, 364], nokta(769, 798, 'Görüş kapalı', 'Görüş alanında tanınabilir hiçbir larinks yapısı yoktur. [[K5 s. 41]]')],
    ].map(([ad, kirp, alan]) => ({
      ad, kirp, resim: 'img/anatomi/01c-derece.webp', en: 1024, boy: 1024, noktalar: [alan],
    })),
  });
})();
