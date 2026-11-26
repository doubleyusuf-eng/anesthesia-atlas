(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an06e_farenks = (el) => SEKIL.cizim(el, {
    baslik: 'Stilofaringeus ve farenks duvarı', giris: 'Bir numara seçerek komşulukları inceleyin.',
    gorunumler: [
      { ad: 'Yandan farenks', resim: 'img/anatomi/06e-farenks.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 313, y: 285, ad: 'Stiloid çıkıntı', metin: 'IX, juguler çıkıştan sonra stiloid çıkıntının ve ona tutunan kasların derininde ilerler. [[K5 s. 282]]' },
          { x: 401, y: 446, ad: 'Stilofaringeus', metin: 'IX bu kası çaprazlar ve üçüncü brankiyal ark kökenli kasın motor innervasyonunu sağlar. [[K5 s. 281–282]]' },
          { x: 459, y: 425, ad: 'Glossofaringeal sinir', metin: 'İki konstriktörün arasındaki sarı dalı izleyin. [[K5 s. 282]] Sinir, burada farenkse girerek dil kökü, tonsil ve farenks mukozasına dağılır. [[K5 s. 282]]' },
          { x: 477, y: 329, ad: 'Üst konstriktör', metin: 'IX’un farenkse girdiği aralığın üstündeki kastır. [[K5 s. 282]]' },
          { x: 469, y: 514, ad: 'Orta konstriktör', metin: 'IX’un giriş aralığının altında kalır, vagusun faringeal dalı ise bu kas üzerinde pleksusa katılır. [[K5 s. 282]] [[K5 s. 288]]' },
        ],
      },
      { ad: 'Juguler foramen', resim: 'img/anatomi/06e-foramen.webp', en: 1024, boy: 512,
        noktalar: [
          { x: 200, y: 275, ad: 'İnferior petrozal sinüs', metin: 'Resmin sol ucu anteriordur, bu venöz sinüs sinirlerin önünde kalır. [[K5 s. 285]]' },
          { x: 310, y: 260, ad: 'IX', metin: 'Ayrı dura kılıfı içindeki en öndeki sinirdir. [[K5 s. 281]] [[K5 s. 285]]' },
          { x: 408, y: 266, ad: 'X', metin: 'Vagus, IX’un arkasında ve XI’in önünde geçer. [[K5 s. 285]]' },
          { x: 467, y: 271, ad: 'XI', metin: 'Aksesuar sinir vagusla aynı kılıftadır. [[K5 s. 285]]' },
          { x: 689, y: 216, ad: 'Juguler ven', metin: 'Kesitte en arkada görülen venöz bölüm internal juguler vene devam eder. [[K5 s. 285]]' },
        ],
      },
    ],
  });

  VIZ.an06e_karotis = (el) => SEKIL.cizim(el, {
    baslik: 'Karotis bifurkasyonunun derin yüzü', giris: 'Bir numara seçerek komşulukları inceleyin.',
    gorunumler: [
      { ad: 'Karotis bifurkasyonu', resim: 'img/anatomi/06e-karotis.webp', en: 1024, boy: 1536,
        noktalar: [
          { x: 409, y: 655, ad: 'Karotis sinüsü', metin: 'İnternal karotisin başlangıcında lümenin genişlediği bölümü bulun. [[K5 s. 283]] İnce arter duvarı yoğun glossofaringeal innervasyon alır. [[K5 s. 283]]' },
          { x: 495, y: 777, ad: 'Karotis cisimciği', metin: 'Bifurkasyon derinindeki küçük oval yapının zengin sinüzoidal kanlanması, kanın kimyasal bileşimindeki değişikliklerin izlenmesine olanak verir. [[K5 s. 283]]' },
          { x: 409, y: 392, ad: 'IX’un karotis dalı', metin: 'İnternal karotis boyunca aşağı inen bu dal hem sinüsün hem cisimciğin refleks afferentlerini taşır. [[K5 s. 282–283]]' },
          { x: 488, y: 1100, ad: 'Ortak karotis', metin: 'Damarın çatallanmasını aşağıdan izleyerek cisimciğin bulunduğu yere ulaşın. [[K5 s. 283]]' },
        ],
      },
      { ad: 'Blok için kemik işaretleri', resim: 'img/anatomi/06e-stiloid.webp', en: 1024, boy: 683,
        noktalar: [
          { x: 182, y: 306, ad: 'Mastoid çıkıntı', metin: 'Blok için tarif edilen yüzey çizgisi bu çıkıntıyla mandibula açısını birleştirir. [[K5 s. 283]]' },
          { x: 391, y: 516, ad: 'Mandibula açısı', metin: 'Ciltteki giriş yeri iki kemik işaretini birleştiren çizginin ortasıdır. [[K5 s. 283]]' },
          { x: 302, y: 344, ad: 'Stiloid çıkıntı', metin: 'Stiloid çıkıntı derin işarettir; iğne cilde dik ilerletildiğinde çıkıntıya 3 cm içinde ulaşılması beklenir. [[K5 s. 283]]' },
        ],
      },
    ],
  });

  VIZ.an06e_boyun = (el) => SEKIL.cizim(el, {
    baslik: 'Karotis kılıfında vagusu bulun', giris: 'Bir numara seçerek komşulukları inceleyin.',
    gorunumler: [
      { ad: 'Boyunda enine kesit', resim: 'img/anatomi/06e-boyun.webp', en: 1024, boy: 683,
        noktalar: [
          { x: 334, y: 318, ad: 'Ortak karotis', metin: 'Boynun aşağı bölümünde vagusa komşu arter ortak karotistir, yukarıda yerini internal karotis alır. [[K5 s. 285]]' },
          { x: 630, y: 311, ad: 'İnternal juguler ven', metin: 'Vagusun boyun seyrinde hem yukarıda hem aşağıda aynı venöz komşuyu izleyebilirsiniz. [[K5 s. 285]]' },
          { x: 453, y: 408, ad: 'Vagus', metin: 'Kesitte ön taraf yukarıdadır, sarı sinir arterle venin arasında ve geriye doğru yerleşir. [[K5 s. 285]]' },
          { x: 496, y: 482, ad: 'Servikal sempatik zincir', metin: 'Kılıfın arkasındaki sempatik zincir ile kılıfın içindeki vagusu ayrı ayrı bulun. [[K5 s. 285]]' },
        ],
      },
    ],
  });

  VIZ.an06e_toraks = (el) => SEKIL.cizim(el, {
    baslik: 'Önden toraks girişi ve arkus aorta', giris: 'Bir numara seçerek komşulukları inceleyin.',
    gorunumler: [
      { ad: 'Önden mediasten', resim: 'img/anatomi/06e-toraks.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 329, y: 432, ad: 'Sağ rekürren dal', metin: 'Hastanın sağı resmin solundadır. [[K5 s. 285–286]] Sağ vagus subklavyenin ilk bölümünü çaprazlar ve rekürren dalı alt kenarında verir. [[K5 s. 285–286]]' },
          { x: 274, y: 390, ad: 'Sağ subklavyen arter', metin: 'Sağ rekürren dönüş için boyun kökünde bu arteri bulun. [[K5 s. 285–286]]' },
          { x: 609, y: 715, ad: 'Sol rekürren dal', metin: 'Sol vagusun rekürren dalı aort arkının alt kenarında ayrıldığı için sağdaki dönüşten daha aşağıdadır. [[K5 s. 285–286]]' },
          { x: 539, y: 650, ad: 'Aort arkı', metin: 'Sol vagusun arkı geçtiği nokta frenik sinirin geçişine göre daha dışta ve arkadadır. [[K5 s. 286]]' },
          { x: 507, y: 373, ad: 'Trakea', metin: 'Sağ vagus brakiyosefalik venin arkasından toraksa geçtikten sonra trakeanın yan yüzünde seyreder. [[K5 s. 285]]' },
        ],
      },
    ],
  });

  VIZ.an06e_mide = (el) => SEKIL.cizim(el, {
    baslik: 'Kardiya ve küçük kurvaturda anterior vagus', giris: 'Bir numara seçerek komşulukları inceleyin.',
    gorunumler: [
      { ad: 'Midenin ön yüzü', resim: 'img/anatomi/06e-mide.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 498, y: 204, ad: 'Anterior vagus', metin: 'Önde özofagusa yakın duran trunkus, sol ve sağ vagustan gelen lifler içerir. [[K5 s. 286–287]]' },
          { x: 535, y: 385, ad: 'Kardiya dalları', metin: 'Anterior vagustan midenin giriş bölgesine dallar ayrılır. [[K5 s. 287]]' },
          { x: 474, y: 643, ad: 'Küçük kurvatur', metin: 'Ön trunkusun gastrik dalları küçük kurvatura da ulaşır. [[K5 s. 287]]' },
          { x: 408, y: 400, ad: 'Hepatik dal', metin: 'Anterior vagusun büyük hepatik dalı pilora ve antruma giden dalı verir. [[K5 s. 287]]' },
        ],
      },
    ],
  });

  VIZ.an06e_aksesuar = (el) => SEKIL.cizim(el, {
    baslik: 'Tragustan trapeze yüzey anatomisi', giris: 'Bir numara seçerek komşulukları inceleyin.',
    gorunumler: [
      { ad: 'Boynun yan yüzü', resim: 'img/anatomi/06e-aksesuar.webp', en: 1024, boy: 936,
        noktalar: [
          { x: 479, y: 115, ad: 'Tragus', metin: 'XI’in yüzey izdüşümünü çizerken üstte bu işaretten başlayın. [[K5 s. 290]]' },
          { x: 425, y: 451, ad: 'Sternokleidomastoid', metin: 'XI bu kası deler ve inerve eder, arka kenarın üst ve orta üçte birinin birleşimi sinirin yüzey işaretidir. [[K5 s. 290]]' },
          { x: 575, y: 478, ad: 'Aksesuar sinir', metin: 'Posterior üçgeni geçen sinir, boyun lenf nodu diseksiyonunda hasar görebilir. [[K5 s. 290]]' },
          { x: 710, y: 598, ad: 'Trapez', metin: 'Sinir kasın ön kenarına ulaşır ve derin yüzüne girer. [[K5 s. 290]]' },
          { x: 606, y: 775, ad: 'Klavikula', metin: 'Trapezin ön kenarındaki yüzey işareti klavikulanın yaklaşık 5 cm yukarısındadır. [[K5 s. 290]]' },
        ],
      },
    ],
  });

  VIZ.an06e_dil = (el) => SEKIL.cizim(el, {
    baslik: 'Ağız tabanında hipoglossal sinir', giris: 'Bir numara seçerek komşulukları inceleyin.',
    gorunumler: [
      { ad: 'Ağız tabanı', resim: 'img/anatomi/06e-dil.webp', en: 1024, boy: 683,
        noktalar: [
          { x: 576, y: 411, ad: 'Hipoglossal sinir', metin: 'XII hiyoglossusu yüzeyinden geçerken öne ve yukarıya yönelir, sonra genioglossus üzerinde dil kaslarına dağılır. [[K5 s. 290]]' },
          { x: 589, y: 326, ad: 'Hiyoglossus', metin: 'Hiyoglossus üzerinde XII, submandibular bezin derin yüzüne komşudur. [[K5 s. 290]]' },
          { x: 324, y: 328, ad: 'Genioglossus', metin: 'XII’nin terminal dağılımını izlerken hiyoglossustan sonra bu kası bulun. [[K5 s. 290]]' },
          { x: 853, y: 299, ad: 'Submandibular bez', metin: 'Bez ile hiyoglossus arasındaki komşuluktan sonra XII, submandibular kanalın ve lingual sinirin inferiorunda yer alır. [[K5 s. 290]]' },
        ],
      },
    ],
  });
})();
