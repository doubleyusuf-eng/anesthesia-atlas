(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an04d_interkostal = (el) => SEKIL.cizim(el, {
    baslik: 'Kosta oluğunda hangi yapı en altta?',
    giris: 'Kosta oluğunda en üstte ven, onun altında arter ve sinir bulunur. [[K5 s. 191]] İnterkostal sinirin konumunu belirlemek için önce üst kaburganın alt kenarını bulun, sonra oluğu aşağı doğru izleyin. [[K5 s. 190–191]]',
    gorunumler: [{
      ad: 'Kosta kesiti', resim: 'img/anatomi/04d-interkostal.webp', en: 1024, boy: 1536,
      noktalar: [
        { x: 566, y: 422, ad: 'Üst kosta', metin: 'İnterkostal aralıkta ven, arter ve sinir yukarıdan aşağıya sıralanır. [[K5 s. 191]]' },
        { x: 483, y: 595, ad: 'İnterkostal ven', metin: 'Ven, arterin üstündedir. [[K5 s. 191]]' },
        { x: 451, y: 662, ad: 'İnterkostal arter', metin: 'Arter, ven ile sinir arasında ilerler. [[K5 s. 191]]' },
        { x: 387, y: 733, ad: 'İnterkostal sinir', metin: 'Sinir kosta açısı düzeyinde internal ve en iç interkostal kasların arasına girer. [[K5 s. 190–191]]' },
        { x: 560, y: 1213, ad: 'Alt kosta', metin: 'Kollateral sinir dalı interkostal aralığın alt kenarında seyreder. [[K5 s. 191]]' },
      ],
    }],
  });

  VIZ.an04d_karin = (el) => SEKIL.cizim(el, {
    baslik: 'Kostal kenar ile rektus kılıfı arasında',
    giris: 'Rektus kılıfına ulaşan T7–T8 ile önce iç oblik ve transvers karın kasları arasında ilerleyen T9–T11’i karşılaştırın. [[K5 s. 191–192]]',
    gorunumler: [{
      ad: 'İç yüzden', resim: 'img/anatomi/04d-karin.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 393, y: 181, ad: 'Üst iki sinirin yönü', metin: 'T7 ve T8 kısa karın seyirlerinde yukarı ve mediale dönerek rektus kılıfının arka yaprağına girer. [[K5 s. 191–192]]' },
        { x: 491, y: 333, ad: 'Ortadaki sinir', metin: 'T9 yaklaşık transvers bir yol izler. [[K5 s. 192]]' },
        { x: 495, y: 506, ad: 'Alt sinirlerin yönü', metin: 'T10 ve T11 rektusa doğru ilerlerken aşağı yönelir. [[K5 s. 192]]' },
        { x: 745, y: 435, ad: 'Rektus kılıfı', metin: 'T9–T11 iç oblik ile transvers kas arasından kılıfın arka yaprağına ulaşır. [[K5 s. 192]]' },
        { x: 873, y: 523, ad: 'Rektus abdominis', metin: 'Sinirler rektusu ve kılıfın ön yaprağını geçerek deriye çıkar. [[K5 s. 192]]' },
        { x: 196, y: 410, ad: 'İç oblik kas', metin: 'Karın duvarında alt üç interkostal sinir iç oblik ile transvers kas arasındadır. [[K5 s. 192]]' },
      ],
    }],
  });

  VIZ.an04d_psoas = (el) => SEKIL.cizim(el, {
    baslik: 'Psoasın yüzü ve iki kenarı',
    giris: 'Lateral kenardaki dalları yukarıdan aşağıya izleyin. Genitofemoral siniri bulmak için kasın ön yüzüne, obturator siniri bulmak için medial kenarına geçin. [[K5 s. 194–196]]',
    gorunumler: [{
      ad: 'Önden', resim: 'img/anatomi/04d-psoas.webp', en: 1024, boy: 936,
      noktalar: [
        { x: 465, y: 169, ad: 'İliohipogastrik sinir', metin: 'L1’in üst bölümünden çıkar ve ilioinguinal sinirin üzerinde seyreder. [[K5 s. 193–194]]' },
        { x: 384, y: 226, ad: 'İlioinguinal sinir', metin: 'L1 kökenli bu dal psoasın lateral kenarında iliohipogastrik sinirin altında belirir. [[K5 s. 193–194]]' },
        { x: 292, y: 465, ad: 'Uyluğun lateral kutanöz siniri', metin: 'İliakusu çaprazlayarak inguinal bağın lateral ucuna yönelir. [[K5 s. 196]]' },
        { x: 399, y: 753, ad: 'Femoral sinir', metin: 'Psoas ile iliakus arasındaki olukta uyluğa doğru iner. [[K5 s. 198]]' },
        { x: 567, y: 486, ad: 'Genitofemoral sinir', metin: 'Kası delip ön yüzüne çıktıktan sonra inguinal bağa doğru iner. [[K5 s. 195]]' },
        { x: 661, y: 599, ad: 'Obturator sinir', metin: 'Psoasın medial kenarından pelvis girişine ulaşır. [[K5 s. 200]]' },
      ],
    }],
  });

  VIZ.an04d_kasik = (el) => SEKIL.cizim(el, {
    baslik: 'Ön üst iliak diken ve inguinal bağ',
    giris: 'Ön üst iliak dikeni bulun, bağın lateral ucunun altından geçen siniri sartoriusun başlangıcına kadar izleyin. [[K5 s. 196–198]]',
    gorunumler: [{
      ad: 'Önden', resim: 'img/anatomi/04d-kasik.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 107, y: 87, ad: 'Ön üst iliak diken', metin: 'Lateral kutanöz sinir bu kemik işaretin medialinden geçer. [[K5 s. 198]]' },
        { x: 444, y: 211, ad: 'İnguinal bağ', metin: 'Sinir çoğunlukla bağın lateral ucunun altından geçer, bazen bağı deler. [[K5 s. 196–198]]' },
        { x: 228, y: 196, ad: 'Lateral kutanöz sinir', metin: 'Sartoriusun başlangıcı üzerinde ön ve arka dallara ayrılır. [[K5 s. 196]]' },
        { x: 339, y: 471, ad: 'Sartorius', metin: 'Sinirin uyluğa girişini izlemek için sartoriusun başlangıcını bulun. [[K5 s. 196]]' },
      ],
    }],
  });

  VIZ.an04d_femoral = (el) => SEKIL.cizim(el, {
    baslik: 'Femoral kılıf ile sinirin ilişkisi',
    giris: 'Önce inguinal bağı, ardından altından geçen damarları bulun. Femoral üçgenin tabanında sinir, arterin bir parmak genişliği lateralinde iliakusun üzerinde yer alır. [[K5 s. 198]]',
    gorunumler: [{
      ad: 'Önden', resim: 'img/anatomi/04d-femoral.webp', en: 1024, boy: 1536,
      noktalar: [
        { x: 678, y: 282, ad: 'İnguinal bağ', metin: 'Femoral sinir bağın altından geçer geçmez terminal dallarına ayrılır. [[K5 s. 198]]' },
        { x: 362, y: 246, ad: 'Femoral sinir', metin: 'Psoas–iliakus oluğundan gelen sinir, üçgenin tabanında iliakus üzerinde bulunur. [[K5 s. 198]]' },
        { x: 541, y: 352, ad: 'Femoral arter', metin: 'Siniri ararken arterin lateraline bakılır. [[K5 s. 198]]' },
        { x: 618, y: 365, ad: 'Femoral ven', metin: 'Ven arterle birlikte femoral kılıf içindedir. [[K5 s. 198–199]]' },
        { x: 576, y: 454, ad: 'Femoral kılıf', metin: 'Pektineusun motor dalı iki damarı içeren kılıfın arkasından geçer. [[K5 s. 198–199]]' },
      ],
    }],
  });

  VIZ.an04d_safen = (el) => SEKIL.cizim(el, {
    baslik: 'Addüktör kanaldan medial malleole',
    giris: 'İlk görünümde safen siniri femoral arterin lateralinden medialine izleyin. [[K5 s. 199]] İkinci görünümde büyük safen ven ile sinirin medial malleolün önünden birlikte geçişini bulun. [[K5 s. 199]]',
    gorunumler: [{
      ad: 'Addüktör kanal', resim: 'img/anatomi/04d-safen.webp', en: 1024, boy: 3072, kirp: [0, 0, 1024, 1536],
      noktalar: [
        { x: 349, y: 284, ad: 'Proksimalde sinir', metin: 'Safen sinir kanala girerken femoral arterin lateralindedir. [[K5 s. 199]]' },
        { x: 461, y: 709, ad: 'Önden çapraz', metin: 'Sinir, addüktör kanal içinde arterin ön yüzünden geçer. [[K5 s. 199]]' },
        { x: 589, y: 1059, ad: 'Distalde sinir', metin: 'Arterin medialine geçen sinir, kanalın alt kısmından sartorius ile grasilis arasında çıkar. [[K5 s. 199]]' },
      ],
    }, {
      ad: 'Bacak ve ayak', resim: 'img/anatomi/04d-safen.webp', en: 1024, boy: 3072, kirp: [0, 1536, 1024, 1536],
      noktalar: [
        { x: 598, y: 2022, ad: 'Safen sinir', metin: 'Ana dal tibianın medial kenarı boyunca ilerler. [[K5 s. 199]]' },
        { x: 586, y: 2570, ad: 'Büyük safen ven', metin: 'Ayak bileğinde ven açığa çıkarılırken eşlik eden safen sinir zarar görebilir. [[K5 s. 199]]' },
        { x: 611, y: 2768, ad: 'Medial malleol', metin: 'Sinir ve ven bu kemik çıkıntının önünden geçer. [[K5 s. 199]]' },
        { x: 272, y: 2954, ad: 'Başparmak tabanı', metin: 'Safen sinirin distal seyri ayak başparmağının tabanına ulaşır. [[K5 s. 199]]' },
      ],
    }],
  });

  VIZ.an04d_obturator = (el) => SEKIL.cizim(el, {
    baslik: 'İki dalın arasındaki kas',
    giris: 'Ön dalı addüktör brevisin yüzeyinde izleyin. Brevisin derinindeki arka dal, addüktör magnusun üzerinde aşağı iner. [[K5 s. 197]] [[K5 s. 200]]',
    gorunumler: [{
      ad: 'Ön-medialden', resim: 'img/anatomi/04d-obturator.webp', en: 1024, boy: 1536,
      noktalar: [
        { x: 701, y: 150, ad: 'Pubisin üst dalı', metin: 'Aksesuar obturator sinir varsa pubisin üst dalını çaprazlar. [[K5 s. 200–201]]' },
        { x: 589, y: 173, ad: 'Obturator kanal', metin: 'Obturator sinir kanal içinde ön ve arka dallara ayrılır. [[K5 s. 200]]' },
        { x: 419, y: 547, ad: 'Ön dal', metin: 'Uylukta addüktör brevisin yüzeyinde, pektineus ve addüktör longusun derininde seyreder. [[K5 s. 200]]' },
        { x: 502, y: 570, ad: 'Addüktör brevis', metin: 'Bu kas obturator sinirin ön ve arka dallarını birbirinden ayırır. [[K5 s. 200]]' },
        { x: 333, y: 954, ad: 'Arka dal', metin: 'Brevisin derininden magnusa ulaşır ve dize giden eklem dalını verir. [[K5 s. 197]] [[K5 s. 200]]' },
        { x: 493, y: 1110, ad: 'Addüktör magnus', metin: 'Obturator sinirin arka dalı ve siyatik sinir bu kasın innervasyonuna katılır. [[K5 s. 200]]' },
      ],
    }],
  });

})();
