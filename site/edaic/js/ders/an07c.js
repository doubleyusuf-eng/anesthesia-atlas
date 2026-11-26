(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an07c_yuzey = (el) => SEKIL.cizim(el, {
    baslik: 'Kemik işaretleri, önden görünüm',
    giris: 'Önce orta hattaki ksifoidi bulun, ardından kostal kenarı dışa doğru ve iliak kreti en yüksek noktasına kadar izleyin. [[K5 s. 314–315]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/07c-yuzey.webp', en: 1024, boy: 1121,
      noktalar: [
        { x: 510, y: 439, ad: 'Ksifoid çıkıntı', metin: 'Sternumun bu ucu arkada T9 gövdesine karşılık gelir, derideki segmental işareti ise T7’dir. [[K5 s. 314]] [[K5 s. 319]]' },
        { x: 385, y: 470, ad: 'Kostal kenar', metin: 'Ksifoidden başlayan kenarı aşağı ve dışa izlediğinizde 10. kaburganın alt sınırına ulaşırsınız. [[K5 s. 315]]' },
        { x: 725, y: 739, ad: 'İliak kret', metin: 'Aynı noktayı karşı tarafta bulun ve iki kretin tepelerini birleştirin, elde edilen çizgi çoğunlukla L4 düzeyindedir. [[K5 s. 315]]' },
        { x: 511, y: 1066, ad: 'Pubik simfiz', metin: 'Pubis ile suprasternal çentik arasındaki mesafenin ortası transpilorik düzlemi verir. [[K5 s. 315]]' },
      ] }],
  });

  VIZ.an07c_rektus = (el) => SEKIL.cizim(el, {
    baslik: 'Rektus, linea alba ve piramidalis',
    giris: 'Rektusun pubisten kostal kıkırdaklara uzanan ön yüzünde, boyuna kas liflerini kesen açık renkli fibröz hatları bulun. [[K5 s. 315]]',
    gorunumler: [{ ad: 'Ön yüz', resim: 'img/anatomi/07c-rektus.webp', en: 1024, boy: 1121,
      noktalar: [
        { x: 398, y: 158, ad: 'Rektus abdominis', metin: 'Kasın üstte 5., 6. ve 7. kostal kıkırdaklara yayılan 7,5 cm genişliğindeki tutunması, pubisteki 2,5 cm’lik başlangıcından daha geniştir. [[K5 s. 315]]' },
        { x: 395, y: 584, ad: 'Göbek hizasındaki ara hat', metin: 'Bu fibröz hat ön kılıfa yapışıktır ve rektusun segmental gelişiminin kasın ön yüzündeki izlerinden biridir. [[K5 s. 315]]' },
        { x: 513, y: 300, ad: 'Linea alba', metin: 'Aponevrozların birleştiği bu orta hat göbeğin üzerinde daha geniş, alt karında daha dardır. [[K5 s. 317]]' },
        { x: 513, y: 990, ad: 'Piramidalis', metin: 'Alt ucunu pubiste, sivri ucunu linea albada arayın, bu küçük kas bazı kişilerde bulunmaz. [[K5 s. 315]]' },
      ] }],
  });

  VIZ.an07c_kilif = (el) => SEKIL.cizim(el, {
    baslik: 'Rektusun yatağı ve iki düzeyde enine kesiti',
    giris: 'Önden görünümde arkuat çizgiyi bulun, iki kesitte arka aponevrozun hangi düzeyde kaybolduğunu karşılaştırın. [[K5 s. 316–318]]',
    gorunumler: [
      { ad: 'Önden', resim: 'img/anatomi/07c-kilif.webp', en: 1024, boy: 1536, noktalar: [
        { x: 730, y: 110, ad: 'Kostal kıkırdak', metin: 'Kostal kenarın yukarısında rektusun arka yatağını kıkırdak oluşturur. [[K5 s. 315–316]]' },
        { x: 622, y: 198, ad: 'Transversusun kas lifleri', metin: 'Üst epigastriumda rektusun arkasındaki yatay lifler yumuşak bir arka duvar oluşturur. [[K5 s. 315–316]]' },
        { x: 627, y: 663, ad: 'Arka kılıf', metin: 'Arka duvarın büyük bölümü fibröz bir aponevroz niteliğindedir. [[K5 s. 316]]' },
        { x: 617, y: 1143, ad: 'Arkuat çizgi', metin: 'Göbek ile pubis arasındaki bu sınırda arka aponevrotik örtü sonlanır. [[K5 s. 316]]' },
        { x: 608, y: 1287, ad: 'Ekstraperitoneal yağ', metin: 'Çizginin altında transversalis fasyasının derininde yağ, onun da derininde periton yer alır. [[K5 s. 316]]' },
      ] },
      { ad: 'Çizginin üstü', resim: 'img/anatomi/07c-arkuat.webp', en: 1024, boy: 512, kirp: [0, 0, 1024, 258], noktalar: [
        { x: 789, y: 104, ad: 'Rektus', metin: 'İnternal oblik aponevrozunun iki yaprağı kasın önünden ve arkasından geçer. [[K5 s. 315]]' },
        { x: 867, y: 61, ad: 'Ön yaprak', metin: 'Eksternal oblik aponevrozu internal obliğin ön yaprağıyla birlikte ön kılıfı oluşturur. [[K5 s. 315]]' },
        { x: 755, y: 157, ad: 'Arka yaprak', metin: 'Transversus aponevrozu internal obliğin arka yaprağına katılır. [[K5 s. 315]]' },
      ] },
      { ad: 'Çizginin altı', resim: 'img/anatomi/07c-arkuat.webp', en: 1024, boy: 512, kirp: [0, 266, 1024, 246], noktalar: [
        { x: 679, y: 357, ad: 'Önde birleşen aponevrozlar', metin: 'Üç yan kasın aponevrozunu lateralden mediale izleyin, hepsi rektusun önüne geçer. [[K5 s. 316]]' },
        { x: 776, y: 431, ad: 'Rektusun arka yüzü', metin: 'Arkuat çizginin altında kasın arkasında aponevrotik kılıf bulunmaz, doğrudan transversalis fasyasına komşudur. [[K5 s. 316]]' },
      ] },
    ],
  });

  VIZ.an07c_katman = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ yan duvarda lif yönleri ve sinir düzlemi',
    giris: 'Kostal kenarla iliak kret arasındaki diseksiyonda üç kası lif yönünden tanıyın, ardından en derindeki kasın üzerindeki siniri bulun. [[K5 s. 317–319]]',
    gorunumler: [{ ad: 'Yandan', resim: 'img/anatomi/07c-katman.webp', en: 1024, boy: 1048, noktalar: [
      { x: 805, y: 769, ad: 'Eksternal oblik', metin: 'Yüzeyel kastaki lifleri aşağı ve mediale doğru izleyin. [[K5 s. 317]]' },
      { x: 478, y: 535, ad: 'İnternal oblik', metin: 'Ortadaki tabakanın yukarı ve mediale giden lifleri, üzerindeki eksternal obliğin liflerini çaprazlar. [[K5 s. 317]]' },
      { x: 355, y: 289, ad: 'Transversus abdominis', metin: 'En derin kasın enine lifleri internal oblikte açılan pencereden görülebilir. [[K5 s. 317]]' },
      { x: 405, y: 359, ad: 'Kaslar arasındaki sinir', metin: 'Toraksta internal ve en iç interkostal kasların arasındaki sinir, karında internal oblik ile transversus arasındadır. [[K5 s. 319]]' },
    ] }],
  });

  VIZ.an07c_damar = (el) => SEKIL.cizim(el, {
    baslik: 'Rektusun arkasındaki epigastrik arterler',
    giris: 'Rektusun kaldırıldığı tarafta biri kasıktan yükselen, diğeri kostal kenardan inen iki arterin seyirlerini izleyin. [[K5 s. 319]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/07c-damar.webp', en: 1024, boy: 1536, noktalar: [
      { x: 338, y: 1018, ad: 'İnferior epigastrik arter', metin: 'Alt kısımdaki kavis, eksternal iliaktan çıkan arterin rektusun arkasına yükselen seyrine karşılık gelir. [[K5 s. 319]]' },
      { x: 444, y: 298, ad: 'Süperior epigastrik arter', metin: 'Yukarıdan gelen daha küçük damar internal torasik arterin devamıdır ve aşağıda inferior epigastrik arterle birleşir. [[K5 s. 319]]' },
      { x: 442, y: 708, ad: 'Göbek yanındaki damar seyri', metin: 'Yüzey izdüşümü göbeğin yaklaşık bir parmak lateralinden geçer, ancak değişken seyir ve dallanma nedeniyle yalnız bu çizgiye güvenilemez. [[K5 s. 319]]' },
    ] }],
  });

  VIZ.an07c_kesit = (el) => SEKIL.cizim(el, {
    baslik: 'Rektus kılıfı bloğunda katlar ve hedef',
    giris: 'Kesitte ön yüz yukarıdadır, iğnenin geçtiği ön kılıfı ve ucunun arka kılıfla ilişkisini bulun. [[K5 s. 318–319]]',
    gorunumler: [{ ad: 'Enine kesit', resim: 'img/anatomi/07c-kesit.webp', en: 1024, boy: 512, noktalar: [
      { x: 509, y: 177, ad: 'Ön kılıfı geçiş', metin: 'Kısa eğimli uçlu ya da küntleştirilmiş iğneyle hissedilebilen ilk belirgin direnç kaybı ön kılıfın geçilmesine karşılık gelir. [[K5 s. 319]]' },
      { x: 373, y: 267, ad: 'Rektus abdominis', metin: 'Kasın ön yüzündeki ara hatlar ön kılıfa yapışıktır, arka yüzde lokal anestezik aynı engelle karşılaşmaz. [[K5 s. 315]]' },
      { x: 510, y: 368, ad: 'Arka kılıfın hemen önü', metin: 'Maviyle gösterilen birikim, lokal anesteziğin kas ile arka kılıf arasındaki hedefini gösterir. [[K5 s. 318]]' },
      { x: 748, y: 340, ad: 'Epigastrik damar', metin: 'Hedefle komşu epigastrik damarlar ve dalları rektus bloğu sırasında yaralanabilir. [[K5 s. 319]]' },
    ] }],
  });

  VIZ.an07c_kasik = (el) => SEKIL.cizim(el, {
    baslik: 'İnguinal kanal çevresinde L1 dalları',
    giris: 'Spermatik kordu bulun, kordun önündeki sinir ile kanalın üzerinde ilerleyen siniri ayırt edin. [[K5 s. 320]]',
    gorunumler: [{ ad: 'Sağ kasık', resim: 'img/anatomi/07c-kasik.webp', en: 1024, boy: 683, noktalar: [
      { x: 63, y: 198, ad: 'Spina iliaka anterior superior', metin: 'Kitaptaki giriş noktası bu kemik çıkıntının 2 cm medialinde ve 2 cm inferiorundadır. [[K5 s. 320]]' },
      { x: 559, y: 259, ad: 'İliohipogastrik sinir', metin: 'Kanalın üstünden suprapubik deriye doğru uzanan dalı izleyin. [[K5 s. 320]]' },
      { x: 609, y: 359, ad: 'İlioinguinal sinir', metin: 'Kordun ön yüzündeki sinir dış halkadan veya bitişik aponevrozdan çıkar. [[K5 s. 320]]' },
      { x: 506, y: 367, ad: 'Spermatik kord', metin: 'İlioinguinal sinirin kanal içindeki seyrini tarif ederken kordun ön yüzünü işaretleyin. [[K5 s. 320]]' },
      { x: 947, y: 551, ad: 'Pubik tüberkül', metin: 'Genitofemoral sinirin genital dalı için tarif edilen enjeksiyon noktası tüberkülün hemen lateralinde, inguinal bağın altındadır. [[K5 s. 320]]' },
    ] }, { ad: 'Blok işaretleri', resim: 'img/anatomi/07c-kasik.webp', en: 1024, boy: 683,
      kirp: [0, 0, 1024, 653], noktalar: [
        { x: 63, y: 198, ad: 'Giriş için kemik işareti', metin: 'Spinanın 2 cm medial ve 2 cm inferiorundaki girişten iğne pubise doğru 45–60° açıyla yöneltilir. [[K5 s. 320]]' },
        { x: 541, y: 523, ad: 'Kaldırılmış eksternal oblik aponevrozu', metin: 'İlk 7–10 mL, aponevroz geçilirken hissedilebilen ani direnç kaybının ardından verilir. [[K5 s. 320]]' },
        { x: 656, y: 314, ad: 'İnternal oblik', metin: 'İğne internal obliğin daha yumuşak dokusu içinde 1–2 cm ilerledikten sonra ikinci 7–10 mL verilir. [[K5 s. 320]]' },
        { x: 933, y: 548, ad: 'Genital dal için kemik işareti', metin: 'Ayrı enjeksiyonun yeri pubik tüberkülün hemen dışı, inguinal bağın altıdır, tarif edilen hacim 10 mL’dir. [[K5 s. 320]]' },
      ] }],
  });
})();
