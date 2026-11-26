(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an07b_kemik = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ orbitaya önden bakış', giris: 'V biçimli iki fissürü optik foramenin lateralinde bulun. [[K5 s. 304]]',
    gorunumler: [{ ad: 'Sağ orbitaya önden bakış', resim: 'img/anatomi/07b-kemik.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 531, y: 256, ad: 'Optik foramen', metin: 'Optik sinir ve oftalmik arter apeksi bu açıklıktan geçer. [[K5 s. 304–305]]' },
        { x: 386, y: 271, ad: 'Superior orbital fissür', metin: 'Sfenoidin küçük ve büyük kanatları arasındaki üst koldur. [[K5 s. 304]]' },
        { x: 341, y: 390, ad: 'İnferior orbital fissür', metin: 'Büyük kanat ile maksillanın orbital yüzü arasındaki alt koldur. [[K5 s. 304]]' },
        { x: 484, y: 576, ad: 'İnfraorbital foramen', metin: 'Maksilladaki kanalın ön yüze çıkışıdır. [[K5 s. 304]]' },
        { x: 653, y: 273, ad: 'Medial duvar', metin: 'Lakrimal kemik ile etmoidin ince orbital plağı bu duvarın başlıca bileşenleridir. [[K5 s. 304]]' },
        { x: 384, y: 452, ad: 'İnfraorbital oluk', metin: 'İnfraorbital damar ve sinirler maksilladaki bu oluktan kanala ilerler. [[K5 s. 304]]' },
      ],
    }],
  });

  VIZ.an07b_apeks = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ orbita apeksi ve tendinöz halka',
    giris: 'Optik kanal ve superior orbital fissürün medial ucunu aynı tendinöz halka çevreler. [[K5 s. 310]]',
    gorunumler: [{ ad: 'Apekse önden bakış', resim: 'img/anatomi/07b-apeks.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 319, y: 355, ad: 'Ortak tendinöz halka', metin: 'Dört rektus bu halkadan başlayıp öne uzanır. [[K5 s. 310]]' },
        { x: 558, y: 355, ad: 'Optik sinir', metin: 'Optik foramenden oftalmik arterle birlikte geçer. [[K5 s. 305]]' },
        { x: 613, y: 355, ad: 'Oftalmik arter', metin: 'Orbita apeksindeki optik kanalın içindedir. [[K5 s. 304–305]]' },
        { x: 424, y: 333, ad: 'Fissürün medial bölümü', metin: 'Superior orbital fissürün bu ucu rektusların ortak başlangıcı içinde kalır. [[K5 s. 310]]' },
        { x: 256, y: 196, ad: 'Superior orbital fissür', metin: 'Açıklık sfenoidin küçük ve büyük kanatları arasındadır. [[K5 s. 304]]' },
      ],
    }],
  });

  VIZ.an07b_kure = (el) => SEKIL.cizim(el, {
    baslik: 'Göz küresinin kesiti', giris: 'Önde korneayı bulun, ardından lensin önündeki ve arkasındaki ortamları karşılaştırın. [[K5 s. 306–309]]',
    gorunumler: [{ ad: 'Göz küresinin kesiti', resim: 'img/anatomi/07b-kure.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 119, y: 331, ad: 'Kornea', metin: 'Fibröz katın öndeki saydam bölümüdür. [[K5 s. 306]]' },
        { x: 183, y: 439, ad: 'İris', metin: 'Pupilla çapı iristeki radyal ve sirküler liflerle değişir. [[K5 s. 307–308]]' },
        { x: 275, y: 343, ad: 'Lens', metin: 'İrisin arkasındaki bikonveks lensin gerisinde vitreus yer alır. [[K5 s. 308]]' },
        { x: 265, y: 521, ad: 'Siliyer cisim', metin: 'Siliyer çıkıntılar lensin asıcı bağıyla ilişkilidir. [[K5 s. 307]]' },
        { x: 491, y: 356, ad: 'Vitreus', metin: 'Hiyaloid membran içindeki saydam jel kürenin arka beşte dördünü doldurur. [[K5 s. 309]]' },
        { x: 521, y: 21, ad: 'Sklera', metin: 'Dıştaki opak kat kürenin biçimini korur. [[K5 s. 306]]' },
        { x: 864, y: 329, ad: 'Optik sinir', metin: 'Arkada sklera, optik sinirin dural kılıfıyla devam eder. [[K5 s. 306]]' },
      ],
    }],
  });

  VIZ.an07b_fundus = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ göz dibi', giris: 'Makula ile diski ayırt etmek için damarların toplandığı yeri bulun. [[K5 s. 308]]',
    gorunumler: [{ ad: 'Sağ göz dibi', resim: 'img/anatomi/07b-fundus.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 395, y: 341, ad: 'Makula ve santral fovea', metin: 'Fovea merkezi görmeden sorumlu makulanın ortasındadır. [[K5 s. 308]]' },
        { x: 670, y: 335, ad: 'Optik disk', metin: 'Makulanın medialindeki disk görme alanının kör noktasına karşılık gelir. [[K5 s. 308]]' },
        { x: 610, y: 442, ad: 'Alt damar dalları', metin: 'Diskten çıkan santral arterin alt ve üst dalları nazal ve temporal dallara ayrılır. [[K5 s. 308]]' },
      ],
    }],
  });

  VIZ.an07b_kas = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ orbitada kaslar', giris: 'Üst oblik kası medial duvar boyunca izleyerek tendonun yön değiştirdiği makarayı bulun. [[K5 s. 310]]',
    gorunumler: [{ ad: 'Sağ orbitada kaslar', resim: 'img/anatomi/07b-kas.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 491, y: 250, ad: 'Üst rektus', metin: 'Elevasyon, addüksiyon ve medial rotasyon yaptırır. [[K5 s. 310]]' },
        { x: 279, y: 320, ad: 'Lateral rektus', metin: 'VI. sinirin çalıştırdığı bu kas gözü abdüksiyona getirir. [[K5 s. 310]]' },
        { x: 666, y: 335, ad: 'Medial rektus', metin: 'III. sinirle uyarılan medial rektus gözü addüksiyona getirir. [[K5 s. 310]]' },
        { x: 708, y: 267, ad: 'Üst oblik', metin: 'IV. sinirin çalıştırdığı kas halkaya göre daha üstten doğar. [[K5 s. 310]]' },
        { x: 740, y: 476, ad: 'Troklea', metin: 'Tendon, tavanın medialindeki bu fibröz makaradan döner. [[K5 s. 310]]' },
      ],
    }],
  });

  VIZ.an07b_kapak = (el) => SEKIL.cizim(el, {
    baslik: 'Üst kapağın kesiti', giris: 'Kirpik çizgisinden tarsal plağa ve kapağın arka yüzüne ilerleyin. [[K5 s. 312]]',
    gorunumler: [{ ad: 'Üst kapağın kesiti', resim: 'img/anatomi/07b-kapak.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 224, y: 540, ad: 'Kirpikler', metin: 'Kirpikler mukokutanöz birleşimden çıkar. [[K5 s. 312]]' },
        { x: 286, y: 380, ad: 'Orbikülaris okuli', metin: 'Gevşek bağ dokusunun derininde orbikülaris lifleri yer alır. [[K5 s. 312]]' },
        { x: 363, y: 395, ad: 'Tarsal bezler', metin: 'Tarsal bezlerin ağızları kirpiklerin hemen arkasındadır. [[K5 s. 312]]' },
        { x: 442, y: 341, ad: 'Palpebral konjonktiva', metin: 'Kapağın içini döşeyen mukoza burada kalın ve damarlıdır. [[K5 s. 312]]' },
        { x: 738, y: 115, ad: 'Levator aponevrozu', metin: 'Levator palpebrae superioris üst kapağın hareketine katılır. [[K5 s. 311–313]]' },
      ],
    }],
  });

  VIZ.an07b_gozyasi = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ gözün lakrimal sistemi', giris: 'Bezi üst dışta, drenaj yolunu ise medialde izleyin. [[K5 s. 312–313]]',
    gorunumler: [{ ad: 'Sağ gözün lakrimal sistemi', resim: 'img/anatomi/07b-gozyasi.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 243, y: 139, ad: 'Lakrimal bez', metin: 'Ana lob orbitanın üst lateralindeki lakrimal fossada oturur. [[K5 s. 312]]' },
        { x: 630, y: 250, ad: 'Üst kanalikül', metin: 'Üst kapaktaki punktumdan gelen gözyaşını keseye taşır. [[K5 s. 312–313]]' },
        { x: 651, y: 294, ad: 'Alt kanalikül', metin: 'Alt kapağın medialindeki papilladan başlayıp keseye açılır. [[K5 s. 312–313]]' },
        { x: 704, y: 269, ad: 'Lakrimal kese', metin: 'Medial duvardaki çöküntüde iki kanalikülü karşılar. [[K5 s. 313]]' },
        { x: 710, y: 442, ad: 'Nazolakrimal kanal', metin: 'Kendi kemik kanalı içinde keseden alt meatusa doğru iner. [[K5 s. 313]]' },
        { x: 791, y: 576, ad: 'Alt meatus', metin: 'Nazolakrimal kanalın çıkışı alt meatusun ön bölümündedir. [[K5 s. 313]]' },
      ],
    }],
  });

  VIZ.an07b_blok = (el) => SEKIL.cizim(el, {
    baslik: 'Orbital blokların hedef düzlemleri', giris: 'Göz küresinin arkasında kas konisini bulun ve üç hedefin optik sinire göre konumunu karşılaştırın. [[K5 s. 305–306]] [[K5 s. 313–314]]',
    gorunumler: [{ ad: 'Orbital blokların hedef düzlemleri', resim: 'img/anatomi/07b-blok.webp', en: 1024, boy: 512,
      noktalar: [
        { x: 508, y: 192, ad: 'Retrobulber hedef', metin: 'Koni içindeki yağ dokusunun bulunduğu aralık optik siniri ve oftalmik damarları da içerir. [[K5 s. 305–306]]' },
        { x: 450, y: 399, ad: 'Peribulber hedef', metin: 'Alt rektus ile orbita tabanı arasındaki yağ koni dışındadır. [[K5 s. 306]]' },
        { x: 369, y: 326, ad: 'Sub-Tenon hedef', metin: 'Hedef küreyi izleyen ince fasyanın altıdır ve anestezik burada kürenin çevresine dağılır. [[K5 s. 310]] [[K5 s. 313–314]]' },
        { x: 580, y: 239, ad: 'Kılıfı içinde optik sinir', metin: 'İntrakonal anestezik kılıf boyunca beyin sapına yayılabilir. [[K5 s. 314]]' },
        { x: 521, y: 333, ad: 'Alt rektus', metin: 'Kas, koni içi ve dışındaki yağı ayıran sınırlardan biridir. [[K5 s. 305–306]]' },
      ],
    }],
  });

})();
