(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an04a_kok = (el) => SEKIL.cizim(el, {
    baslik: 'Torakal sinir',
    giris: 'Arka kökte gangliyonu bulun, sonra iki kökün birleştiği yerden primer dallara ilerleyin. [[K5 s. 149]]',
    gorunumler: [{
      ad: 'Torakal sinir', resim: 'img/anatomi/04a-kok.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 340, y: 187, ad: 'Omurilik', metin: 'Kesitteki gri kolonlardan öndeki motor kökçüklerin başlangıcını, arkadaki ise duyusal kökçüklerin giriş düzeyini gösterir. [[K5 s. 149]]' },
        { x: 453, y: 259, ad: 'Arka kökçükler', metin: 'Bu lifleri içe doğru izlediğinizde arka gri kolon düzeyindeki posterolateral oluğa ulaşırsınız. [[K5 s. 149]]' },
        { x: 591, y: 269, ad: 'Arka kök gangliyonu', metin: 'Duyusal kökün üzerindeki genişlemeyi işaretleyin ve motor kökün bu yapının distalinde katıldığına dikkat edin. [[K5 s. 149]]' },
        { x: 515, y: 338, ad: 'Ön kök', metin: 'Ön gri kolondan gelen küçük demetler birleşerek motor kökü oluşturur. [[K5 s. 149]]' },
        { x: 709, y: 307, ad: 'Spinal sinir', metin: 'Birleşme yerinden sonra kısa bir ortak gövde ve ardından ön ve arka primer dallar izlenir. [[K5 s. 149]]' }
      ]
    }]
  });

  VIZ.an04a_oksipital = (el) => SEKIL.cizim(el, {
    baslik: 'Suboksipital üçgen',
    giris: 'Atlas arkı ile vertebral arter arasındaki aralığı ve alt oblik kasın altından dönen siniri bulun. [[K5 s. 153]]',
    gorunumler: [{
      ad: 'Suboksipital üçgen', resim: 'img/anatomi/04a-oksipital.webp', en: 1024, boy: 936,
      noktalar: [
        { x: 530, y: 253, ad: 'Üst oblik kas', metin: 'Suboksipital üçgeni sınırlayan bu kas C1 arka dalından motor lif alır. [[K5 s. 153]]' },
        { x: 602, y: 430, ad: 'Vertebral arter', metin: 'C1 arka dalı, arter ile altındaki atlas arka arkı arasından üçgene girer. [[K5 s. 153]]' },
        { x: 543, y: 494, ad: 'Atlasın arka arkı', metin: 'Buradaki kemik, vertebral arteri taşıyan üçgen tabanında C1 sinirinin alt komşusudur. [[K5 s. 153]]' },
        { x: 502, y: 604, ad: 'Alt oblik kas', metin: 'C2 arka dalı bu kasın alt kenarını dolanır ve kasa bir dal verir. [[K5 s. 153]]' },
        { x: 367, y: 476, ad: 'Büyük oksipital sinir', metin: 'C2’nin kalın medial dalını alt oblikten yukarı izleyin, yüzeye çıkarken önce semispinalis capitisi, ardından trapezi geçer. [[K5 s. 153]]' }
      ]
    }]
  });

  VIZ.an04a_ansa = (el) => SEKIL.cizim(el, {
    baslik: 'Servikal ansa',
    giris: 'Hipoglossal sinirden ayrılan inen dalı karotis kılıfı üzerindeki halkaya kadar izleyin. [[K5 s. 156–157]]',
    gorunumler: [{
      ad: 'Servikal ansa', resim: 'img/anatomi/04a-ansa.webp', en: 1024, boy: 936,
      noktalar: [
        { x: 415, y: 271, ad: 'Hipoglossal sinir', metin: 'C1 lifleri atlas hizasında XII’ye katılır ve onunla birlikte geniohiyoid ve tirohiyoid kaslara ulaşır. [[K5 s. 156–157]]' },
        { x: 515, y: 397, ad: 'Hipoglossusun inen dalı', metin: 'Halkanın bu kolunda servikal kökenli lifler ilerler ve omohiyoidin ön karnına giden sinir buradan ayrılır. [[K5 s. 157]]' },
        { x: 684, y: 497, ad: 'İnen servikal dal', metin: 'C2 ve C3 kaynaklı lifler hipoglossusun inen dalıyla birleşmek üzere aşağı yönelir. [[K5 s. 157]]' },
        { x: 532, y: 663, ad: 'Servikal ansa', metin: 'Kılıf üzerindeki birleşmeden sternohiyoid ve sternotiroid kaslara ve omohiyoidin arka karnına giden dallar çıkar. [[K5 s. 157]]' }
      ]
    }]
  });

  VIZ.an04a_deri = (el) => SEKIL.cizim(el, {
    baslik: 'Yüzeyel boyun',
    giris: 'Kasın arka kenarından çıkan dalları kulak, boynun ön yüzü ve klavikulaya doğru izleyin. [[K5 s. 157–159]]',
    gorunumler: [{
      ad: 'Yüzeyel boyun', resim: 'img/anatomi/04a-deri.webp', en: 1024, boy: 1072,
      noktalar: [
        { x: 425, y: 635, ad: 'Sternokleidomastoid', metin: 'Kasın arka kenarı, yüzeyel pleksus dallarının çıkışını bulmak için kullanılan yüzey işaretidir. [[K5 s. 158–159]]' },
        { x: 602, y: 356, ad: 'Küçük oksipital sinir', metin: 'Arka kenarı izleyen dalın mastoidin üst ve arkasına uzanması, vertekse çıkan büyük oksipital sinirden ayırt edilmesine yardımcı olur. [[K5 s. 153]] [[K5 s. 157]]' },
        { x: 507, y: 369, ad: 'Büyük auriküler sinir', metin: 'Kasın üzerinden mandibula açısına yönelen dalın uç alanları kulak, mastoid ve parotis ile masseter üzerindeki deridir. [[K5 s. 158]]' },
        { x: 443, y: 550, ad: 'Boynun ön kutanöz siniri', metin: 'Yatay dalın dış juguler venle kesiştiği yerde sinir vene göre derindedir. [[K5 s. 158]]' },
        { x: 515, y: 750, ad: 'Supraklaviküler sinirler', metin: 'İnen ortak gövdeden ayrılan medial, orta ve lateral dalları klavikulayı aşarken izleyin. [[K5 s. 158–159]]' }
      ]
    }]
  });

  VIZ.an04a_blok = (el) => SEKIL.cizim(el, {
    baslik: 'Derin hedeflerin yüzey izdüşümü',
    giris: 'Mastoid ucundan başlayın ve C2, C3, C4 çıkıntılarını sırayla bulun. [[K5 s. 159–160]]',
    gorunumler: [{
      ad: 'Derin hedeflerin yüzey izdüşümü', resim: 'img/anatomi/04a-blok.webp', en: 1024, boy: 936,
      noktalar: [
        { x: 589, y: 141, ad: 'Mastoid uç', metin: 'Üst referans noktasıdır, C2 transvers çıkıntısı buradan yaklaşık 1,5–2,0 cm distalde aranır. [[K5 s. 159–160]]' },
        { x: 586, y: 282, ad: 'C2 transvers çıkıntısı', metin: 'Üç derin blok düzeyinin en üstündeki kemik hedefidir. [[K5 s. 159–160]]' },
        { x: 594, y: 389, ad: 'C3 transvers çıkıntısı', metin: 'Mastoid ile klavikulanın orta noktasını bulduktan sonra C2 ve C4 işaretleri arasının ortasını belirleyin. [[K5 s. 159–160]]' },
        { x: 599, y: 502, ad: 'C4 transvers çıkıntısı', metin: 'Mastoid ile klavikula arasındaki mesafenin yaklaşık yarısı dördüncü servikal transvers çıkıntıya karşılık gelir. [[K5 s. 159–160]]' },
        { x: 236, y: 640, ad: 'Krikoid kıkırdak', metin: 'Mastoid ile çizilen referans çizgisinin alt ucu olan C6 transvers çıkıntısı krikoid düzeyindedir. [[K5 s. 159]]' },
        { x: 563, y: 835, ad: 'Klavikula', metin: 'C4’ün yüzey izdüşümü için kullanılan alt işarettir. [[K5 s. 159–160]]' },
        { x: 461, y: 745, ad: 'Frenik sinir', metin: 'Anterior skalenin önündeki bu sinirin derin blokta etkilenmesi iki taraflı uygulamadan kaçınılmasını açıklar. [[K5 s. 159]] [[K5 s. 164]]' }
      ]
    }]
  });

  VIZ.an04a_stellat = (el) => SEKIL.cizim(el, {
    baslik: 'Boyun kökü',
    giris: 'Gangliyonun vertebral damarlar ve birinci kosta ile ilişkisini inceleyin. [[K5 s. 161]]',
    gorunumler: [{
      ad: 'Boyun kökü', resim: 'img/anatomi/04a-stellat.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 563, y: 297, ad: 'Stellat gangliyon', metin: 'Alt servikal ve ilk torakal gangliyonlar kaynaştığında baş-boyun ile üst ekstremiteye giden sempatik yollar bu bölgede yakın komşudur. [[K5 s. 161]]' },
        { x: 520, y: 120, ad: 'Vertebral damarlar', metin: 'Alt servikal gangliyonun önünde kalan damarları bulun. [[K5 s. 161]]' },
        { x: 335, y: 369, ad: 'Subklavyen arter', metin: 'Yüksek kavisli bir arterin üst kenarı alt servikal gangliyonun hemen önünde yer alabilir. [[K5 s. 161]]' },
        { x: 553, y: 486, ad: 'Birinci kosta', metin: 'Torakal gangliyonun birinci kosta boynuna dayandığı, plevranın bu gangliyonun önünde kaldığı ilişkiyi hatırlayın. [[K5 s. 161]]' },
        { x: 573, y: 166, ad: 'Servikal sempatik zincir', metin: 'Alt ve orta servikal gangliyonlar arasında zincir üzerinden ve ansa subklavya yoluyla bağlantı kurulur. [[K5 s. 161]]' }
      ]
    }]
  });

  VIZ.an04a_horner = (el) => SEKIL.cizim(el, {
    baslik: 'Sol Horner bulguları',
    giris: 'Hastanın solunda, görüntünün sağında, miyozis ile kısmi pitozu birlikte arayın. [[K5 s. 161–163]]',
    gorunumler: [{
      ad: 'Sol Horner bulguları', resim: 'img/anatomi/04a-horner.webp', en: 1024, boy: 478,
      noktalar: [
        { x: 735, y: 233, ad: 'Sol pupilla', metin: 'Sempatik iletinin pupilla dilatatörüne ulaşamaması küçük pupillayı açıklar. [[K5 s. 161]]' },
        { x: 788, y: 215, ad: 'Sol üst kapak', metin: 'Üst kapağın düşmesi aynı taraftaki sempatik kaybın bir diğer bulgusudur. [[K5 s. 161–163]]' },
        { x: 289, y: 228, ad: 'Karşı pupilla', metin: 'Tek taraflı stellat bloktan sonra iki gözü karşılaştırmak, etkilenen taraftaki miyozisi görünür kılar. [[K5 s. 161–163]]' }
      ]
    }]
  });

  VIZ.an04a_frenik = (el) => SEKIL.cizim(el, {
    baslik: 'Önden mediasten',
    giris: 'Sağda venöz komşuları, solda aort arkı ile sol ventrikül üzerindeki perikardı izleyin. [[K5 s. 165]]',
    gorunumler: [{
      ad: 'Önden mediasten', resim: 'img/anatomi/04a-frenik.webp', en: 1024, boy: 1077,
      noktalar: [
        { x: 334, y: 445, ad: 'Sağ frenik sinir', metin: 'Görüntünün solundaki sinir üst ana venin lateralinden aşağı inerken mediastinal plevra onu dıştan örter. [[K5 s. 165]]' },
        { x: 273, y: 691, ad: 'Sağ atriyum komşuluğu', metin: 'Sinir sağ atriyumun lateralinden geçer ve atriyumdan perikardla ayrılır. [[K5 s. 165]]' },
        { x: 305, y: 858, ad: 'Sağ diyafram girişi', metin: 'Alt ana ven açıklığını referans alın, ana frenik gövde hemen lateralinde santral tendonu deler. [[K5 s. 165]]' },
        { x: 632, y: 323, ad: 'Sol frenik sinir', metin: 'Daha uzun ve oblik olan sol sinirin aort arkını çaprazladığı yer vagusun önündedir. [[K5 s. 165]]' },
        { x: 734, y: 660, ad: 'Sol perikard yüzü', metin: 'Akciğer kökünü önden geçen sinir sol ventrikülü örten perikard boyunca diyaframa yönelir. [[K5 s. 165]]' },
        { x: 809, y: 863, ad: 'Sol diyafram girişi', metin: 'Sinir fibröz perikard tutunmasının 1 cm lateralinden geçer ve abdominal yüzden kasa dağılır. [[K5 s. 165]]' }
      ]
    }]
  });
})();
