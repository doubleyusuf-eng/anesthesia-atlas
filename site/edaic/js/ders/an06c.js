(() => {
  'use strict';

  VIZ.an06c_kok = (el) => SEKIL.cizim(el, {
    baslik: 'Foramen ovale ve kısa V₃ gövdesi',
    giris: 'Foramen ovaleden geçen iki kökün birleşme yerini bulun. [[K5 s. 268]]',
    gorunumler: [{
      ad: 'Kafa tabanı', resim: 'img/anatomi/06c-kok.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 563, y: 155, ad: 'Foramen ovale', metin: 'Duyu ve motor kökleri bu açıklıktan ayrı ayrı geçer. [[K5 s. 268]]' },
        { x: 482, y: 384, ad: 'Ortak gövde', metin: 'Köklerin birleşmesiyle oluşan kısa gövde lateral pterigoidin derinindedir. [[K5 s. 268]]' },
        { x: 546, y: 370, ad: 'Otik gangliyon', metin: 'Gangliyon foramen ovalenin hemen altında, mandibular sinirin medialindedir. [[K5 s. 274]]' },
        { x: 365, y: 426, ad: 'Orta meningeal arter', metin: 'Arter kısa sinir gövdesinin hemen arkasında seyreder. [[K5 s. 268]]' },
        { x: 344, y: 551, ad: 'Ön trunkus', metin: 'Küçük trunkustan bir duysal dal ve çiğneme kaslarına giden motor dallar çıkar. [[K5 s. 270]]' },
        { x: 584, y: 562, ad: 'Arka trunkus', metin: 'Daha büyük trunkus aurikülotemporal, lingual ve inferior alveolar sinirleri verir. [[K5 s. 270]]' },
      ],
    }],
  });

  VIZ.an06c_dallar = (el) => SEKIL.cizim(el, {
    baslik: 'Ramusun iç yüzünde iki ayrı sinir', giris: 'Öne ilerleyen siniri, kemik içine giren komşusundan ayırın. [[K5 s. 271–272]]',
    gorunumler: [{
      ad: 'Ramusun medial yüzü', resim: 'img/anatomi/06c-dallar.webp', en: 1024, boy: 936,
      noktalar: [
        { x: 593, y: 389, ad: 'Lingual sinir', metin: 'Bu dal ramusun iç yüzünde, son molar köklerinin hemen altından ağız tabanına geçer. [[K5 s. 271–272]]' },
        { x: 707, y: 251, ad: 'İnferior alveolar sinir', metin: 'Lingual sinirin hemen arkasından iner ve mandibular kanala girer. [[K5 s. 272]]' },
        { x: 675, y: 350, ad: 'Lingula', metin: 'Sfenomandibular bağ mandibular foramenin hemen önündeki lingulaya tutunur. [[K5 s. 271]]' },
        { x: 463, y: 496, ad: 'Üçüncü molar', metin: 'Lingual sinir bu dişin kökleri düzeyinin hemen altında, diş eti mukozasının derinindedir. [[K5 s. 271–272]]' },
      ],
    }],
  });

  VIZ.an06c_blok = (el) => SEKIL.cizim(el, {
    baslik: 'Mandibular blokta iki derinlik',
    giris: 'Çentiği belirleyin, sonra derin görünümde pterigoid lamina ile hedefi bulun. [[K5 s. 269]]',
    gorunumler: [
      { ad: 'Yüzey işareti', resim: 'img/anatomi/06c-blok.webp', en: 1024, boy: 683, kirp: [3, 66, 504, 537],
        noktalar: [
          { x: 214, y: 336, ad: 'Zigomatik ark', metin: 'Giriş işareti arkın altındadır. [[K5 s. 269]]' },
          { x: 253, y: 394, ad: 'Koronoid çentik', metin: 'Giriş çentiğin orta noktasındandır. [[K5 s. 269]]' },
        ] },
      { ad: 'Derin hedef', resim: 'img/anatomi/06c-blok.webp', en: 1024, boy: 683, kirp: [517, 42, 502, 599],
        noktalar: [
          { x: 772, y: 385, ad: 'Lateral pterigoid lamina', metin: 'Kafa tabanına dik ilk ilerleyişte yaklaşık 3,5–5,0 cm derinde laminaya ulaşılır. [[K5 s. 269]]' },
          { x: 854, y: 281, ad: 'Foramen ovale çıkışındaki sinir', metin: 'İğne geri çekilip posterosuperiora yöneltildiğinde laminanın arkasından bu hedefe ulaşır. [[K5 s. 269]]' },
        ] },
    ],
  });

  VIZ.an06c_kulak = (el) => SEKIL.cizim(el, {
    baslik: 'Kulak önünde damar ve sinir', giris: 'Tragustan öne doğru ilerleyip önce siniri, sonra arteri bulun. [[K5 s. 271]]',
    gorunumler: [{
      ad: 'Yandan', resim: 'img/anatomi/06c-kulak.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 670, y: 218, ad: 'Aurikülotemporal sinir', metin: 'Sinir kulak önünde zigomatik arkı geçerek şakak bölgesine yükselir. [[K5 s. 271]]' },
        { x: 641, y: 95, ad: 'Yüzeyel temporal arter', metin: 'Palpe edilen nabzın hemen arkasında aurikülotemporal sinir bulunur. [[K5 s. 271]]' },
        { x: 716, y: 287, ad: 'Tragus', metin: 'Auriküler dallar tragus derisini ve heliksin komşu lateral yüzünü inerve eder. [[K5 s. 271]]' },
        { x: 557, y: 420, ad: 'Mandibula boynu', metin: 'Sinir eklemin hemen altında boynun arkasından çıkar. [[K5 s. 271]]' },
        { x: 615, y: 505, ad: 'Parotis', metin: 'Parotis dalı sekretomotor, sempatik ve duysal lifleri buraya taşır. [[K5 s. 271]]' },
      ],
    }],
  });

  VIZ.an06c_dil = (el) => SEKIL.cizim(el, {
    baslik: 'Wharton kanalının altında lingual sinir', giris: 'Sarı siniri ağız tabanından dilin yan yüzüne kadar izleyin. [[K5 s. 272]]',
    gorunumler: [{
      ad: 'Ağız tabanı, yandan', resim: 'img/anatomi/06c-dil.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 857, y: 285, ad: 'Lingual sinir', metin: 'Sinir dilin yanına doğru öne ilerler. [[K5 s. 272]]' },
        { x: 521, y: 492, ad: 'Wharton kanalı', metin: 'Lingual sinir bu submandibular kanalın çevresini dolanır. [[K5 s. 272]]' },
        { x: 560, y: 517, ad: 'Kanalın altından dönüş', metin: 'Sinir öne giderken kanalın lateralinden medialine geçer. [[K5 s. 272]]' },
        { x: 402, y: 314, ad: 'Dile giden dallar', metin: 'Terminal dallar dil mukozasının hemen altında seyreder. [[K5 s. 272]]' },
      ],
    }],
  });

  VIZ.an06c_alveol = (el) => SEKIL.cizim(el, {
    baslik: 'Mandibular kanal ve terminal dallar', giris: 'Siniri ramustan ön dişlere doğru takip edin. [[K5 s. 272]]',
    gorunumler: [{
      ad: 'Kanal açılmış görünüm', resim: 'img/anatomi/06c-alveol.webp', en: 1024, boy: 512,
      noktalar: [
        { x: 830, y: 196, ad: 'Mandibular foramen', metin: 'İnferior alveolar sinir, ona eşlik eden damarlarla ramusun medialinden kanala girer. [[K5 s. 272–273]]' },
        { x: 523, y: 377, ad: 'İnferior alveolar sinir', metin: 'Kanal içindeki sinir her molara ve premolara diş dalları verir. [[K5 s. 272]]' },
        { x: 323, y: 413, ad: 'Mental dal', metin: 'Mental foramenden çıkan dal çene ile alt dudak derisi ve mukozasına yayılır. [[K5 s. 272]]' },
        { x: 171, y: 372, ad: 'İnsiziv dal', metin: 'Kanal içinde öne uzanan dal kanin ve kesici dişlere ulaşır. [[K5 s. 272]]' },
      ],
    }],
  });

  VIZ.an06c_agiz = (el) => SEKIL.cizim(el, {
    baslik: 'İnferior alveolar blokta ağız içi işaretler', giris: 'Önce son moların çiğneme yüzeyini, ardından ramusun ön kenarını bulun. [[K5 s. 273]]',
    gorunumler: [{
      ad: 'Ağız açık, karşıdan', resim: 'img/anatomi/06c-agiz.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 549, y: 415, ad: 'Üçüncü molar', metin: 'Giriş yüksekliği bu dişin oklüzal yüzeyinden yaklaşık 1 cm yukarıdadır. [[K5 s. 273]]' },
        { x: 627, y: 367, ad: 'Ramusun ön kenarı', metin: 'Giriş noktası bu kemik kenarının hemen medialindedir. [[K5 s. 273]]' },
        { x: 490, y: 300, ad: 'İğnenin doğrultusu', metin: 'Enjektör mandibula gövdesi ve oklüzal yüzeylere paralel tutulur. [[K5 s. 273]]' },
        { x: 702, y: 321, ad: 'İnferior alveolar sinir', metin: 'Hedef sinir bağın lateralinde, ramusun medialindedir. [[K5 s. 273]]' },
      ],
    }],
  });

  VIZ.an06c_bez = (el) => SEKIL.cizim(el, {
    baslik: 'Lingual sinire asılı submandibular gangliyon', giris: 'Önce ince sarı siniri, ardından alt yüzündeki küçük gangliyonu bulun. [[K5 s. 273]]',
    gorunumler: [{
      ad: 'Mandibulanın medialinden', resim: 'img/anatomi/06c-bez.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 231, y: 246, ad: 'Lingual sinir', metin: 'Sinir hiyoglossusun yüzeyel yüzünü çaprazlar. [[K5 s. 273]]' },
        { x: 354, y: 339, ad: 'Submandibular gangliyon', metin: 'Lingual sinirin altından sarkan gangliyonun parasempatik, sempatik ve duysal bağlantıları vardır. [[K5 s. 273]]' },
        { x: 319, y: 450, ad: 'Submandibular bez', metin: 'Sekretomotor liflerin kaynağı superior salivator çekirdektir. [[K5 s. 273]]' },
        { x: 747, y: 401, ad: 'Sublingual bez', metin: 'Bu beze de sekretomotor lifler korda timpani ve lingual sinir yoluyla ulaşır. [[K5 s. 273]]' },
      ],
    }],
  });
})();
