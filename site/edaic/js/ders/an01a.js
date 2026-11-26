(() => {
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.an01a_taban = (el) => SEKIL.cizim(el, {
    baslik: 'Dil kaldırıldığında ağız tabanı',
    giris: 'Frenulumu bulun, ardından yanındaki kanal ağzından kıvrımı arkaya doğru izleyin. [[K5 s. 3–4]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/01a-taban.webp', en: 1024, boy: 683, noktalar: [
      nokta(510, 326, 'Dil frenulumu', 'Dilin alt yüzünü mandibulaya yönelen ağız tabanı mukozasına bağlayan orta hat kıvrımıdır. [[K5 s. 3–4]]'),
      nokta(461, 452, 'Submandibular kanal ağzı', 'Wharton kanalları frenulumun iki yanında, sublingual kıvrımların ucuna açılır. [[K5 s. 3–4]]'),
      nokta(706, 406, 'Sublingual kıvrım', 'Sublingual bezin üzerini örter ve submandibular kanal ağzından arkaya ve dışa uzanır. [[K5 s. 3]]'),
    ] }],
  });

  VIZ.an01a_agiz = (el) => SEKIL.cizim(el, {
    baslik: 'Ağızdan görülen yumuşak damak',
    giris: 'Orta hatta uvulayı, her iki yanda tonsili sınırlayan kıvrımları bulun. [[K5 s. 3–5]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/01a-agiz.webp', en: 1024, boy: 683, noktalar: [
      nokta(512, 293, 'Uvula', 'Yumuşak damağın serbest kenarından ortada sarkar. [[K5 s. 3–4]]'),
      nokta(275, 322, 'Palatoglossal ark', 'Bu ön kıvrımdaki palatoglossus, yumuşak damaktan dilin yanına iner. [[K5 s. 4–5]]'),
      nokta(667, 321, 'Palatofarengeal ark', 'Arka kıvrımdaki palatofarengeus, damağı farenksin yan duvarına bağlar. [[K5 s. 4–5]]'),
      nokta(716, 367, 'Palatin tonsil', 'Palatoglossal ve palatofarengeal arklar arasında görülür. [[K5 s. 4]]'),
      nokta(569, 163, 'Yumuşak damak', 'Ağızdan görülen yüzü çok katlı yassı epitelle örtülüdür. [[K5 s. 3]]'),
    ] }],
  });

  VIZ.an01a_konka = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ burun yan duvarı, medialden görünüm',
    giris: 'Vestibülden geriye bakarken her konkanın altındaki geçidi bulun. [[K5 s. 7–8]]',
    gorunumler: [{ ad: 'Medialden', resim: 'img/anatomi/01a-konka.webp', en: 1024, boy: 577, noktalar: [
      nokta(96, 447, 'Vestibül', 'Burun deliğinin hemen gerisindeki genişlemenin alt kısmında kıllar bulunur. [[K5 s. 7]]'),
      nokta(729, 142, 'Üst konka', 'Kısa üst konka etmoid labirentin iç yüzünden gelişir. [[K5 s. 8]]'),
      nokta(580, 258, 'Orta konka', 'Orta konka da üst konka gibi etmoid kemiğe aittir. [[K5 s. 8]]'),
      nokta(490, 398, 'Alt konka', 'Dış duvardaki üç konkadan bağımsız kemik olanıdır. [[K5 s. 8]]'),
      nokta(655, 464, 'Alt meatus', 'Alt konka ile burun tabanı arasındaki bu geçide nazolakrimal kanal önde açılır. [[K5 s. 8–9]]'),
    ] }],
  });

  VIZ.an01a_antrum = (el) => SEKIL.cizim(el, {
    baslik: 'Koronal kesitte maksiller sinüs',
    giris: 'Her antrumu altındaki diş kökleri, üstündeki orbita ve medialindeki burun boşluğu ile birlikte inceleyin. [[K5 s. 9–10]]',
    gorunumler: [{ ad: 'Koronal', resim: 'img/anatomi/01a-antrum.webp', en: 1024, boy: 683, noktalar: [
      nokta(213, 333, 'Maksiller antrum', 'Maksilla gövdesini kaplayan bu boşluk paranazal sinüslerin en büyüğüdür. [[K5 s. 9]]'),
      nokta(793, 211, 'Antrum tavanı', 'Orbitaya komşu bu tabaka maksillanın orbital plağıdır ve infraorbital kanalı taşır. [[K5 s. 9]]'),
      nokta(210, 524, 'Molar kökleri', 'Molar kökleri sinüs tabanını kabartabilir, hatta bir veya birkaç kök tabanı delebilir. [[K5 s. 9]]'),
      nokta(614, 117, 'Etmoid hava hücreleri', 'Burun boşluğunun üst dış duvarında, orbital plağın iç tarafında yer alırlar. [[K5 s. 10]]'),
      nokta(508, 337, 'Nazal septum', 'İki burun boşluğunu birbirinden ayırır. [[K5 s. 7]]'),
      nokta(565, 467, 'Sert damak', 'Burun tabanının kemikleri aynı zamanda ağız boşluğunun sert damak bölümünü oluşturur. [[K5 s. 3]] [[K5 s. 7]]'),
    ] }],
  });

  // Şematik bağlantılarda kutular arasında yalnız kaynakta belirtilen yol çizilir.
  function baglanti(secenek, dugumler, metin) {
    return {
      ad: secenek, metin,
      ciz: (S) => dugumler.map((ad, i) => {
        const y = 10 + i * 70;
        const orta = S.w / 2;
        const ok = i ? S.ok([[orta, y - 20], [orta, y - 2]], { renk: 'accent' }) : '';
        return ok + S.kutu((S.w - 288) / 2, y, 288, 50, {
          yazi: ad, dolgu: i === dugumler.length - 1 ? 'accent-soft' : 'paper',
        });
      }).join(''),
    };
  }

  VIZ.an01a_drenaj = (el) => SEKIL.adim(el, {
    baslik: 'Sinüsten burun boşluğuna drenaj', vb: [480, 200], vbDar: [350, 200], oto: false,
    adimlar: [
      baglanti('Sfenoid', ['Sfenoid sinüs', 'Sfenoetmoidal reses'], 'Sfenoid sinüsün ağzı üst konka ile sfenoid gövde arasındaki resestedir. [[K5 s. 8]]'),
      baglanti('Arka etmoid', ['Arka etmoid hücreler', 'Üst meatus'], 'Arka grup üst meatusa boşalır. [[K5 s. 8]]'),
      baglanti('Orta etmoid', ['Orta etmoid hücreler', 'Etmoid bulla yüzeyi', 'Orta meatus'], 'Orta etmoid hücreler, orta meatusta oluşturdukları kabarıklığa açılır. [[K5 s. 8]]'),
      baglanti('Ön etmoid', ['Ön etmoid hücreler', 'İnfundibulum', 'Orta meatus'], 'İnfundibulum, semilunar hiatusun bulla önünde kıvrılan devamıdır. [[K5 s. 8]]'),
      baglanti('Maksiller', ['Maksiller sinüs', 'Semilunar hiatus', 'Orta meatus'], 'Antrumun ostiumu bullanın altındaki yarığa açılır. [[K5 s. 8–9]]'),
      baglanti('Frontal', ['Frontal sinüs', 'Frontonazal kanal', ['İnfundibulum üzerinden veya', 'doğrudan orta meatusa']], 'Kanal yaklaşık %50 olguda infundibuluma, kalanlarda orta meatusun ön ucuna açılır. [[K5 s. 8–9]]'),
      baglanti('Gözyaşı', ['Nazolakrimal kanal', 'Alt meatusun ön ucu'], 'Gözyaşı alt meatusun ön ucuna, buraya tek başına açılan kanaldan gelir. [[K5 s. 9]]'),
    ],
  });

  VIZ.an01a_damar = (el) => SEKIL.adim(el, {
    baslik: 'Burunda damar bağlantıları', vb: [480, 200], vbDar: [350, 200], oto: false,
    adimlar: [
      baglanti('Üst bölüm', ['İnternal karotis', 'Oftalmik arter', 'Ön ve arka etmoidal arterler'], 'Oftalmik arterin iki etmoidal dalı burun boşluğunun üst bölümünü besler. [[K5 s. 10–11]]'),
      baglanti('Little alanı', [['Maksiller → sfenopalatin', 'Fasiyal → üst labial → septal dal'], 'Ön-alt septum'], 'Alt bölüme dağılan sfenopalatin arter, vestibülün hemen içindeki septumda üst labial arterin septal dalıyla birleşir. [[K5 s. 11]]'),
      baglanti('Venöz dönüş', ['Submukozal venöz pleksus', ['Sfenopalatin, fasiyal', 've oftalmik venler']], 'Zengin submukozal ağ bu üç venöz sisteme boşalır, oftalmik venler kavernöz sinüsle bağlantı kurar. [[K5 s. 11]]'),
      baglanti('Kribriform plak', ['Küçük nazal venler', 'Kribriform plak', 'Orbital lobun alt yüzündeki venler'], 'Küçük venler kribriform plağı geçerek beynin orbital lobunun alt yüzündeki venlere ulaşır. [[K5 s. 11]]'),
    ],
  });

  VIZ.an01a_yol = (el) => SEKIL.adim(el, {
    baslik: 'Hava ile nazotrakeal tüpün yolları', vb: [512, 289], vbDar: [512, 289], oto: false,
    ortak: (S) => S.cizgi([[28, 180], [84, 123], [140, 61], [214, 36], [317, 37], [386, 73], [414, 129], [416, 240], [395, 272]], { renk: 'muted' })
      + S.cizgi([[35, 199], [115, 205], [338, 205], [361, 214], [366, 238], [343, 265]], { renk: 'muted' })
      + S.t(220, 229, 'Burun tabanı', { a: 'middle', c: 'b' })
      + S.t(18, 267, 'Ön', { c: 'b' }) + S.t(462, 267, 'Arka', { c: 'b' }),
    adimlar: [
      { ad: 'Solunan hava', metin: 'Hava alt meatusu doğrudan izlemez, burun boşluğunun üst kesimlerine doğru kavis çizerek nazofarenkse ulaşır (şematik yandan görünüm). [[K5 s. 13]]',
        ciz: (S) => S.ok([[42, 184], [84, 158], [126, 118], [173, 88], [228, 75], [287, 76], [334, 92], [363, 120], [381, 161], [390, 203]], { renk: 'basic', w: 4 }) },
      { ad: 'Nazal tüp', metin: 'Tüp burun tabanını izleyerek alt konkanın altından doğrudan arkaya yönelir. [[K5 s. 14]]',
        ciz: (S) => S.ok([[40, 187], [118, 193], [265, 193], [375, 193]], { renk: 'clin', w: 5 }) },
      { ad: 'Nazofarenkste dönüş', metin: 'Nazofarenksten geçerken tüp öne kıvrılmalıdır. [[K5 s. 14]]',
        ciz: (S) => S.ok([[40, 187], [118, 193], [327, 193], [354, 195], [372, 202], [384, 216], [388, 232], [385, 247], [376, 263]], { renk: 'clin', w: 5 }) },
    ],
  });
})();
