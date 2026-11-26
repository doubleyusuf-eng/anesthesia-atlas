(() => {
  VIZ.an04c_skapula = (el) => SEKIL.cizim(el, {
    baslik: 'Skapulanın arka yüzü', giris: 'Supraskapular siniri çentikten iki kasın derin yüzüne kadar izleyin. [[K5 s. 174]]',
    gorunumler: [
      { ad: 'Skapulanın arka yüzü', resim: 'img/anatomi/04c-skapula.webp', en: 1024, boy: 1060,
        noktalar: [
          { x: 597, y: 167, ad: 'Supraskapular çentik', metin: 'Sinir, supraskapular bağın köprülediği çentikten geçer. [[K5 s. 174]]' },
          { x: 314, y: 162, ad: 'Supraspinatus', metin: 'Üst trunkustan gelen supraskapular sinir kasa derin yüzünden girer. [[K5 s. 174]]' },
          { x: 362, y: 506, ad: 'İnfraspinatus', metin: 'Supraskapular sinir aşağı inerek bu kası da uyarır. [[K5 s. 174]]' },
        ],
      },
    ],
  });

  VIZ.an04c_kord = (el) => SEKIL.cizim(el, {
    baslik: 'Pektoral bölge, önden', giris: 'Pektoralis majör kaldırıldığında derindeki pektoralis minörün konumunu inceleyin. [[K5 s. 175]]',
    gorunumler: [
      { ad: 'Pektoral bölge, önden', resim: 'img/anatomi/04c-kord.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 154, y: 519, ad: 'Pektoralis majör', metin: 'Lateral pektoral sinir klavipektoral fasyayı geçip bu kasa girer, medial pektoral sinirin bazı lifleri de kasa ulaşır. [[K5 s. 175]]' },
          { x: 546, y: 412, ad: 'Pektoralis minör', metin: 'Medial pektoral sinir bu kası deler ve uyarır. [[K5 s. 175]]' },
          { x: 605, y: 93, ad: 'Klavikula', metin: 'Klavipektoral fasya pektoralis minörden klavikulaya uzanır ve subklaviusu sarar. [[K5 s. 175]]' },
        ],
      },
    ],
  });

  VIZ.an04c_ulnar = (el) => SEKIL.cizim(el, {
    baslik: 'Dirseğin medial yüzü', giris: 'Ulnar sinirin kemik çıkıntısının arkasından ön kola döndüğü yeri bulun. [[K5 s. 177]]',
    gorunumler: [
      { ad: 'Dirseğin medial yüzü', resim: 'img/anatomi/04c-ulnar.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 751, y: 393, ad: 'Medial epikondil', metin: 'Ulnar sinir bu çıkıntının arkasında kemiğe karşı palpe edilebilir. [[K5 s. 177]]' },
          { x: 783, y: 478, ad: 'Ulnar sinir', metin: 'Dirsek çevresinde sinir masa kenarı veya tespit kayışıyla basıya uğrayabilir. [[K5 s. 178]]' },
          { x: 680, y: 624, ad: 'Fleksör karpi ulnarise giriş', metin: 'Sinir kasın humeral ve ulnar başları arasına girer, bu sırada medial eklem kapsülünün üzerindedir. [[K5 s. 177]]' },
        ],
      },
    ],
  });

  VIZ.an04c_median = (el) => SEKIL.cizim(el, {
    baslik: 'Bileğin enine kesiti', giris: 'Palmar yüz üstteyken retinakulumun iki yanındaki sinirleri karşılaştırın. [[K5 s. 181]] [[K5 s. 184]]',
    gorunumler: [
      { ad: 'Bileğin enine kesiti', resim: 'img/anatomi/04c-median.webp', en: 1024, boy: 683,
        noktalar: [
          { x: 424, y: 273, ad: 'Median sinir', metin: 'Karpal tünelde retinakulumun derin yüzüne yakın seyreder. [[K5 s. 181]]' },
          { x: 536, y: 215, ad: 'Fleksör retinakulum', metin: 'Median sinir bu örtünün distalinde iki terminal dala ayrılır. [[K5 s. 182]]' },
          { x: 822, y: 229, ad: 'Ulnar sinir', metin: 'Pisiformun hemen radiyalinde ve fleksör retinakulumun yüzeyinde yer alır. [[K5 s. 178]] [[K5 s. 180]]' },
          { x: 780, y: 251, ad: 'Ulnar arter', metin: 'Bileğe kadar sinirin lateralinden gelir ve eşlikçi venleriyle retinakulumun yüzeyinden geçer. [[K5 s. 178]] [[K5 s. 184]]' },
          { x: 848, y: 324, ad: 'Pisiform', metin: 'Bilek çizgisindeki bu palpe edilebilir kemik, ulnar sinirin yüzey işaretidir. [[K5 s. 180]]' },
        ],
      },
    ],
  });

  VIZ.an04c_arka = (el) => SEKIL.cizim(el, {
    baslik: 'Dörtgen aralık, arkadan', giris: 'Aksiller siniri dörtgen aralığın sınırları içinde bulun. [[K5 s. 184]]',
    gorunumler: [
      { ad: 'Dörtgen aralık, arkadan', resim: 'img/anatomi/04c-arka.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 463, y: 332, ad: 'Teres minör', metin: 'Aralığın üst sınırına subskapularis ile birlikte katılır. [[K5 s. 184]]' },
          { x: 490, y: 631, ad: 'Teres majör', metin: 'Dörtgen aralığı alttan sınırlar. [[K5 s. 184]]' },
          { x: 295, y: 500, ad: 'Trisepsin uzun başı', metin: 'Aralığın medial duvarını oluşturur. [[K5 s. 184]]' },
          { x: 644, y: 385, ad: 'Cerrahi boyun', metin: 'Aralığın lateral sınırı humerusun cerrahi boynudur. [[K5 s. 184]]' },
          { x: 507, y: 495, ad: 'Aksiller sinir', metin: 'Posterior sirkumfleks humeral damarlarla aralıktan geçer. [[K5 s. 184]]' },
        ],
      },
    ],
  });

  VIZ.an04c_radial = (el) => SEKIL.cizim(el, {
    baslik: 'Humerusun arka yüzü', giris: 'Sinir ile eşlik eden damarın humerusu çaprazladığı yeri inceleyin. [[K5 s. 185–186]]',
    gorunumler: [
      { ad: 'Humerusun arka yüzü', resim: 'img/anatomi/04c-radial.webp', en: 1024, boy: 1536, kirp: [260, 250, 535, 660],
        noktalar: [
          { x: 441, y: 499, ad: 'Radiyal sinir', metin: 'Radiyal sinir spiral oluk boyunca oblik olarak aşağı iner. [[K5 s. 185–186]]' },
          { x: 506, y: 602, ad: 'Derin brakiyal damar yolu', metin: 'Sinir arka kompartımana geçerken derin brakiyal damarlarla birliktedir. [[K5 s. 185]]' },
          { x: 625, y: 717, ad: 'Trisepsin lateral başı', metin: 'Spiral oluktaki sinirin yüzeyel planını önce uzun, sonra lateral baş oluşturur. [[K5 s. 185–186]]' },
        ],
      },
    ],
  });

  VIZ.an04c_bilek = (el) => SEKIL.cizim(el, {
    baslik: 'Avuç ve el bileği, palmar yüz', giris: 'Orta parmak ekseni, pisiform bölgesi ve başparmak tabanını yüzeyden karşılaştırın. [[K5 s. 180–181]] [[K5 s. 189]]',
    gorunumler: [
      { ad: 'Avuç ve el bileği, palmar yüz', resim: 'img/anatomi/04c-bilek.webp', en: 1024, boy: 1536,
        noktalar: [
          { x: 527, y: 955, ad: 'Median sinirin izdüşümü', metin: 'Uzatılmış orta parmağın ekseni bilek kıvrımının ortasında sinirin seyrini gösterir. [[K5 s. 181]]' },
          { x: 655, y: 925, ad: 'Ulnar sinirin izdüşümü', metin: 'Palmar bilek çizgisinde pisiformun hemen radiyalinde aranır. [[K5 s. 180]]' },
          { x: 263, y: 655, ad: 'Başparmak tabanı', metin: 'Radiyal sinirin kutanöz dalları bu bölgenin deri altı infiltrasyonuyla bloke edilebilir. [[K5 s. 189]]' },
          { x: 746, y: 362, ad: 'Serçe parmak', metin: 'Palmar ulnar duyu alanı bazen yalnız bu parmakla sınırlıdır. [[K5 s. 188]]' },
        ],
      },
    ],
  });

  VIZ.an04c_segment = (el) => SEKIL.cizim(el, {
    baslik: 'Segmental deri alanları', giris: 'Noktalar örtüşen dermatomlardan birer yeri gösterir. [[K5 s. 190]]',
    gorunumler: [
      { ad: 'Segmental deri alanları', resim: 'img/anatomi/04c-segment.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 841, y: 90, ad: 'C3–C4', metin: 'Supraklaviküler sinirler omuz üstünün duyusunu taşır. [[K5 s. 190]]' },
          { x: 685, y: 232, ad: 'C5', metin: 'Deltoid bölge ve lateral kol C5 alanındadır. [[K5 s. 190]]' },
          { x: 390, y: 558, ad: 'C6', metin: 'Lateral ön kol ve başparmak C6 ile eşleşir. [[K5 s. 190]]' },
          { x: 85, y: 807, ad: 'C7', metin: 'El ve ortadaki üç parmak C7 alanındadır. [[K5 s. 190]]' },
          { x: 144, y: 873, ad: 'C8', metin: 'Serçe parmak, medial el ve distal medial ön kol bu segmente karşılık gelir. [[K5 s. 190]]' },
          { x: 575, y: 528, ad: 'T1', metin: 'Distal kol ile proksimal ön kolun medial yüzlerini kapsar. [[K5 s. 190]]' },
          { x: 775, y: 332, ad: 'T2', metin: 'Proksimal medial kol duyusu interkostobrakiyal sinirle taşınır. [[K5 s. 190]]' },
        ],
      },
      { ad: 'Terminal sinir · motor', resim: 'img/anatomi/04c-segment.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 685, y: 215, ad: 'Aksiller · deltoid', metin: 'Deltoid paralizisi kol abdüksiyonunu zayıflatır. [[K5 s. 185]]' },
          { x: 651, y: 368, ad: 'Muskülokütanöz · biseps', metin: 'Biseps ve brakiyalis arasından geçerken her iki kasa dal verir. [[K5 s. 175]]' },
          { x: 227, y: 707, ad: 'Median · tenar kaslar', metin: 'Kısa abdüktör, opponens ve kısa başparmak fleksörü tenar dalı alır. [[K5 s. 184]]' },
          { x: 200, y: 780, ad: 'Ulnar · hipotenar kaslar', metin: 'Üç hipotenar kas ulnar sinirin derin dalından lif alır. [[K5 s. 180]]' },
          { x: 475, y: 497, ad: 'Radiyal · brakiyoradiyalis', metin: 'Lateral kas dallarından biri brakiyoradiyalise gider. [[K5 s. 187]]' },
        ],
      },
      { ad: 'Terminal sinir · duyu', resim: 'img/anatomi/04c-segment.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 683, y: 234, ad: 'Aksiller', metin: 'Lateral deltoid üzerinde küçük bir alan aksiller sinir kesisiyle anestezik kalır. [[K5 s. 185]]' },
          { x: 366, y: 575, ad: 'Muskülokütanöz', metin: 'Lateral ön kol derisine terminal kutanöz dalı ulaşır. [[K5 s. 175]]' },
          { x: 61, y: 758, ad: 'Median', metin: 'İşaret parmağının radiyal palmar yüzüne lateral terminal daldan lif gelir. [[K5 s. 184]]' },
          { x: 141, y: 870, ad: 'Ulnar', metin: 'Serçe parmağın medial kenarı yüzeyel terminal daldan lif alır. [[K5 s. 180]]' },
          { x: 561, y: 427, ad: 'Radiyal', metin: 'Kolun alt lateral kutanöz siniri dirseğin hemen üstündeki lateral kol derisine dağılır. [[K5 s. 187]]' },
        ],
      },
    ],
  });
})();
