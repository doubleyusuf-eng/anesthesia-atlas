(() => {
  'use strict';

  VIZ.an06a_taban = (el) => SEKIL.cizim(el, {
    baslik: 'Beyin tabanına alttan bakış',
    giris: 'Orta hatta baziler arteri bulun, ardından iki yana doğru sinir köklerini arayın. [[K5 s. 246]]',
    gorunumler: [{
      ad: 'Beyin tabanına alttan bakış', resim: 'img/anatomi/06a-taban.webp', en: 1024, boy: 1121,
      noktalar: [
        { x: 457, y: 120, ad: 'Olfaktör bulbus', metin: 'Kribriform plağı geçen reseptör lifleri bulbustaki mitral hücrelere ulaşır. [[K5 s. 248]]' },
        { x: 571, y: 248, ad: 'Olfaktör traktus', metin: 'Mitral hücre aksonları traktus içinde arkaya ilerler. [[K5 s. 248]]' },
        { x: 510, y: 397, ad: 'Optik kiazma', metin: 'Medial retina yarılarından gelen lifler burada çaprazlaşır. [[K5 s. 250]]' },
        { x: 515, y: 602, ad: 'Baziler arter', metin: 'Beyin tabanındaki arter ve sinir kökü komşuluklarının izlendiği damarlardan biridir. [[K5 s. 246]]' },
        { x: 565, y: 885, ad: 'Vertebral arter', metin: 'K5’in beyin tabanı görünümünde vertebral arterler ile baziler arter birlikte gösterilir. [[K5 s. 246]]' },
        { x: 365, y: 620, ad: 'V. sinirin kökü', metin: 'Somatik duyu sütunu yüz duyusuyla, V’in motor çekirdeği birinci ark kaslarıyla ilişkilidir. [[K5 s. 245–247]]' },
      ],
    }],
  });

  VIZ.an06a_lamina = (el) => SEKIL.cizim(el, {
    baslik: 'İlkel arka beynin enine kesiti',
    giris: 'Kesitte dorsal duyu alanından ventral motor alana geçerken iç yüzeydeki oluğu bulun. [[K5 s. 245–247]]',
    gorunumler: [{
      ad: 'İlkel arka beynin enine kesiti', resim: 'img/anatomi/06a-lamina.webp', en: 1024, boy: 936,
      noktalar: [
        { x: 328, y: 251, ad: 'Alar lamina', metin: 'Tüpün dorsalindeki hücre grubu afferent lifleri alır ve dört duyu sütunu verir. [[K5 s. 245–247]]' },
        { x: 356, y: 470, ad: 'Sulkus limitans', metin: 'Lümen kenarındaki oluk, alar laminanın afferent alanıyla bazal laminanın efferent alanı arasındaki sınırdır. [[K5 s. 245]]' },
        { x: 682, y: 673, ad: 'Bazal lamina', metin: 'Ventral hücre grubu somatik, brankiyal ve genel visseral efferent sütunları oluşturur. [[K5 s. 245–247]]' },
      ],
    }],
  });

  VIZ.an06a_koku = (el) => SEKIL.cizim(el, {
    baslik: 'Burun tavanının yandan kesiti',
    giris: 'Burun tavanından başlayıp demetleri kribriform plak boyunca bulbusa kadar izleyin. [[K5 s. 248]]',
    gorunumler: [{
      ad: 'Burun tavanının yandan kesiti', resim: 'img/anatomi/06a-koku.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 401, y: 172, ad: 'Olfaktör bulbus', metin: 'Mitral hücrelerin dendritleri, mukozadan gelen liflerle burada sinaps yapar. [[K5 s. 248]]' },
        { x: 805, y: 185, ad: 'Olfaktör traktus', metin: 'Bulbustan çıkan mitral hücre aksonları unkus ve anterior perfore alan bölgesine doğru ilerler. [[K5 s. 248]]' },
        { x: 557, y: 211, ad: 'Kribriform plak', metin: 'Etmoid kemiğin delikli plağı sinir demetlerinin kafatasına geçiş yeridir. [[K5 s. 248]]' },
        { x: 379, y: 264, ad: 'Olfaktör sinir demetleri', metin: 'Üst konka ve septumun üst kısmındaki reseptörlerin uzantıları yaklaşık 20 küçük demette toplanır. [[K5 s. 248]]' },
      ],
    }],
  });

  VIZ.an06a_retina = (el) => SEKIL.cizim(el, {
    baslik: 'Vitreustan koroide retina kesiti',
    giris: 'Gangliyon hücresinden bipolar hücreye ve reseptörlere doğru ilerleyin. [[K5 s. 249]]',
    gorunumler: [{
      ad: 'Vitreustan koroide retina kesiti', resim: 'img/anatomi/06a-retina.webp', en: 1024, boy: 512,
      noktalar: [
        { x: 276, y: 109, ad: 'Gangliyon hücresi', metin: 'Aksonları optik disk düzeyinde birleşerek gözü terk eder. [[K5 s. 249]]' },
        { x: 522, y: 215, ad: 'Bipolar hücreler', metin: 'Ortadaki hücre tabakası reseptörler ile gangliyon hücreleri arasındadır. [[K5 s. 249]]' },
        { x: 605, y: 344, ad: 'Çubuk ve koniler', metin: 'Işığı alan reseptör tabakası pigment hücrelerine komşudur. [[K5 s. 249]]' },
        { x: 778, y: 402, ad: 'Pigment hücreleri', metin: 'Retina kesitinde fotoreseptörler ile koroid arasında yer alır. [[K5 s. 249]]' },
        { x: 301, y: 466, ad: 'Koroid', metin: 'Pigment hücrelerinin dış tarafında koroid görülür. [[K5 s. 249]]' },
      ],
    }],
  });

  VIZ.an06a_kiazma = (el) => SEKIL.cizim(el, {
    baslik: 'Görme yoluna üstten bakış',
    giris: 'İki optik sinirin birleştiği yeri bulun ve bir traktusu arkaya doğru izleyin. [[K5 s. 250]]',
    gorunumler: [{
      ad: 'Görme yoluna üstten bakış', resim: 'img/anatomi/06a-kiazma.webp', en: 1024, boy: 936,
      noktalar: [
        { x: 335, y: 442, ad: 'Optik sinir', metin: 'Sinir gözden arkaya ve mediale ilerleyerek önce optik foramene ulaşır. [[K5 s. 250]]' },
        { x: 510, y: 651, ad: 'Optik kiazma', metin: 'İki gözün temporal görme alanlarını taşıyan lifler burada karşı tarafa geçer. [[K5 s. 250]]' },
        { x: 654, y: 776, ad: 'Optik traktus', metin: 'Aynı tarafın lateral retina lifleri ile karşı taraftan çaprazlaşan medial retina liflerini taşır. [[K5 s. 250]]' },
      ],
    }],
  });

  VIZ.an06a_okulomotor = (el) => SEKIL.cizim(el, {
    baslik: 'Beyin sapının yandan görünümü',
    giris: 'Dorsal yüzdeki iki kabartıyı kullanarak III ve IV çekirdeklerinin düzeylerini karşılaştırın. [[K5 s. 251–253]]',
    gorunumler: [{
      ad: 'Beyin sapının yandan görünümü', resim: 'img/anatomi/06a-okulomotor.webp', en: 1024, boy: 1536,
      noktalar: [
        { x: 731, y: 153, ad: 'Superior kollikulus', metin: 'III’ün somatik çekirdeği ve Edinger–Westphal çekirdeği bu düzeyde akuaduktus tabanındadır. [[K5 s. 251]]' },
        { x: 739, y: 279, ad: 'İnferior kollikulus', metin: 'IV’ün çekirdeği bu düzeyde, liflerin yüzeye çıkışı kollikulusun hemen arkasındadır. [[K5 s. 253]]' },
        { x: 364, y: 602, ad: 'Pons', metin: 'Pontin fleksuranın oluştuğu bölge gelişmekte olan ponsa karşılık gelir. [[K5 s. 245]]' },
        { x: 552, y: 1134, ad: 'Medulla oblongata', metin: 'Soliter traktus çekirdeği medullanın merkezi gri maddesinde yer alır. [[K5 s. 246]]' },
      ],
    }],
  });

  VIZ.an06a_kavernoz = (el) => SEKIL.cizim(el, {
    baslik: 'Orbita apeksine önden bakış',
    giris: 'Yuvarlak optik foramen ile uzamış fissürü ayırt edin, ardından halkanın sınırını izleyin. [[K5 s. 250]]',
    gorunumler: [{
      ad: 'Orbita apeksine önden bakış', resim: 'img/anatomi/06a-kavernoz.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 562, y: 280, ad: 'Optik foramen', metin: 'Optik sinir ve oftalmik arter bu geçidi kullanır, sinir arterin superomedialindedir. [[K5 s. 250]]' },
        { x: 366, y: 297, ad: 'Superior orbital fissür', metin: 'IV halkanın lateralinden, III’ün üst ve alt dalları ise halkanın içinden orbitaya girer. [[K5 s. 252–254]]' },
        { x: 508, y: 329, ad: 'Ortak tendinöz halka', metin: 'Rektus kasları orbita apeksindeki bu halkadan köken alır. [[K5 s. 250]]' },
      ],
    }],
  });

  VIZ.an06a_troklear = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ orbitaya üstten bakış',
    giris: 'Superior oblik kası, III’ün üst dalından lif alan superior rektusla karşılaştırın. [[K5 s. 252–254]]',
    gorunumler: [{
      ad: 'Sağ orbitaya üstten bakış', resim: 'img/anatomi/06a-troklear.webp', en: 1024, boy: 1074,
      noktalar: [
        { x: 663, y: 481, ad: 'Superior oblik', metin: 'Troklear sinir, optik sinirin üzerinden mediale geçerek bu kasa girer. [[K5 s. 253–254]]' },
        { x: 491, y: 442, ad: 'Superior rektus', metin: 'Superior rektusun motor lifleri okülomotor sinirin üst dalıyla gelir. [[K5 s. 252]]' },
        { x: 324, y: 331, ad: 'Göz küresi', metin: 'III tamamen kesildiğinde etkisini sürdüren superior oblik ve lateral rektus göz küresini dışa döndürür. [[K5 s. 253]]' },
      ],
    }],
  });
})();
