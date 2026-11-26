VERI.sorular = VERI.sorular || {};
VERI.sorular['an07b-1'] = {
  no: 1, kok: 'Kemik orbita ve geçitleri', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 303–305]]',
  onermeler: [
    { t: 'İnferior orbital fissür sfenoidin küçük ve büyük kanatları arasındadır.', d: false, n: 'İki kanat arasındaki açıklık superior fissürdür, inferior fissür büyük kanatla maksilla arasındadır. [[K5 s. 304]]' },
    { t: 'Optik foramenden oftalmik arter geçer.', d: true, n: 'Oftalmik arter optik sinirle birlikte bu foramenden orbitaya ulaşır. [[K5 s. 305]]' },
    { t: 'İki orbitanın medial duvarları birbirine dik uzanır.', d: false, n: 'Medial duvarlar paralel, iki lateral duvar birbirine diktir. [[K5 s. 303–304]]' },
    { t: 'İnfraorbital oluk maksillada bir kanala dönüşür.', d: true, n: 'Kanal maksillanın ön yüzündeki infraorbital foramende sonlanır. [[K5 s. 304]]' },
    { t: 'Oftalmik venler orbitayı optik foramenden terk eder.', d: false, n: 'Üst ve alt oftalmik venlerin geçidi superior orbital fissürdür. [[K5 s. 305]]' },
  ],
};

VERI.sorular['an07b-2'] = {
  no: 2, kok: 'Göz küresi ve kaslar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 306–310]]',
  onermeler: [
    { t: 'Aköz hümör arka kamaradan pupilla yoluyla ön kamaraya geçer.', d: true, n: 'Pupilla, iris arkasındaki kamarayı kornea ile iris arasındaki kamaraya bağlar. [[K5 s. 309]]' },
    { t: 'Optik disk makulanın lateralindedir.', d: false, n: 'Disk makulanın medialinde, sinir liflerinin gözden çıktığı yerdedir. [[K5 s. 308]]' },
    { t: 'İki oblik kas da skleraya ekvatorun arkasında tutunur.', d: true, n: 'Obliklerin tutunması arkada, dört rektusunki öndedir. [[K5 s. 310]]' },
    { t: 'Üst rektus ve alt oblik birlikte saf elevasyon oluşturur.', d: true, n: 'İki kasın ortak dikey etkisi elevasyondur. [[K5 s. 310]]' },
    { t: 'Lateral rektusun motor siniri troklear sinirdir.', d: false, n: 'Lateral rektusu abdusens, üst oblik kası troklear sinir çalıştırır. [[K5 s. 310]]' },
  ],
};

VERI.sorular['an07b-3'] = {
  no: 3, kok: 'Kapak duyusu ve orbital bloklar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 305–306]] [[K5 s. 312–314]]',
  onermeler: [
    { t: 'Peribulber enjeksiyon rektus konisinin içine yapılır.', d: false, n: 'Peribulber enjeksiyon koninin dışına yapılır, etkisi intrakonal alana difüzyonla gelişir. [[K5 s. 306]]' },
    { t: 'İnfratroklear sinir alt kapağın duyusuna katılır.', d: true, n: 'Alt kapakta infratroklear sinirin yanında infraorbital sinirin de duyu alanı vardır. [[K5 s. 312]]' },
    { t: 'Koninin içinde siliyer gangliyon bulunur.', d: true, n: 'Siliyer gangliyon retrobulber alanın otonom yapılarındandır. [[K5 s. 305]]' },
    { t: 'Sub-Tenon enjeksiyonunda hacmin artması kas kılıflarına yayılımı kolaylaştırır.', d: true, n: 'Kas kılıflarına ulaşan anestezik motor sinir blokajını destekler. [[K5 s. 314]]' },
    { t: 'İntrakonal anestezik optik sinirin dural kılıfı boyunca beyin sapına ulaşabilir.', d: true, n: 'Optik sinir kılıfı, anesteziğin orbitadan beyin sapına yayılabileceği bir yoldur. [[K5 s. 314]]' },
  ],
};

SAYFALAR['dersler/anatomi/07b'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 7 · Ders 07b', baslik: 'Orbita ve içeriği',
  lede: 'Orbita anatomisi göz cerrahisindeki rejyonel blokları, maksillanın blow-out kırıklarını ve frontal kafa yaralanmalarını anlamaya yardım eder. [[K5 s. 303]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an07b-kemik"><span>01</span>Kemik orbita</button>
  <button type="button" data-scroll="an07b-apeks"><span>02</span>Orbita apeksi</button>
  <button type="button" data-scroll="an07b-kure"><span>03</span>Göz küresi</button>
  <button type="button" data-scroll="an07b-fundus"><span>04</span>Retina</button>
  <button type="button" data-scroll="an07b-kas"><span>05</span>Kaslar ve fasya</button>
  <button type="button" data-scroll="an07b-kapak"><span>06</span>Kapaklar</button>
  <button type="button" data-scroll="an07b-gozyasi"><span>07</span>Gözyaşı</button>
  <button type="button" data-scroll="an07b-blok"><span>08</span>Bloklar</button>
  <button type="button" data-scroll="an07b-p1"><span>09</span>Part I</button>
  <button type="button" data-scroll="an07b-p2"><span>10</span>Part II</button>
  <button type="button" data-scroll="an07b-ozet"><span>11</span>Özet</button>
</nav>

<section class="wrap blk ders-sec" id="an07b-kemik">
  <h2>Kemik orbita ve geçitleri</h2>
  <p class="intro">Orbitanın dörtgen kenarı piramidin tabanını, optik foramen ise apeksini oluşturur. [[K5 s. 303–304]]</p>
  <div class="viz"><div data-viz="an07b_kemik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Sağ orbitaya önden bakıyorsunuz. [[K5 s. 303–304]] Önce dörtgen kenarı izleyin, sonra bakışınızı orbitanın dibindeki optik foramene çevirin. [[K5 s. 303–304]] Medial duvardaki lakrimal oluğu, tabanda öne doğru uzanan infraorbital oluktan konumuyla ayırın. [[K5 s. 304–305]]</p></div>
  <h3>Kenar ve duvarlar</h3>
  <p>Frontal kemik, zigoma ve maksilla elle izlenebilen orbita kenarını oluşturur. [[K5 s. 303]] Lateral kenarın ortasındaki çentik, zigomanın frontal çıkıntısıyla frontal kemiğin zigomatik çıkıntısının birleştiği yerdir. [[K5 s. 303]] Üst kenarın ortasında supraorbital siniri taşıyan çentik hissedilir ve tırnakla bası ağrı verir. [[K5 s. 303]]</p>
  <p>Çentik yerine foramen bulunması istisnadır; bu durumda tırnakla bası ağrı vermez. [[K5 s. 303]] Nazal boşluğun iki yanındaki medial duvarlar paralel ve yaklaşık 2,5 cm aralıklıdır. [[K5 s. 303]] İki lateral duvar birbirine dik açı yapar. [[K5 s. 304]]</p>
  <p>Medial ve lateral duvarların her biri yaklaşık 5 cm, kürenin çapı bunun yarısı kadardır. [[K5 s. 304]] Kemik orbitanın hacmi yaklaşık 30 mL’dir. [[K5 s. 304]] Kenarın üç kemiğine etmoid, sfenoid, lakrimal ve palatin kemikler eklenince orbitayı oluşturan yedi kemik tamamlanır. [[K5 s. 304]]</p>
  <p>Medial duvarın büyük kısmını lakrimal kemik ve etmoidin ince orbital plağı yapar. [[K5 s. 304]] Kuru kemikte etmoid hava hücreleri yarı saydam plağın arkasından seçilebilir. [[K5 s. 304]] Frontal kemikle birleşim hattında ön ve arka etmoid foramenler bulunur. [[K5 s. 304]]</p>
  <p>Lakrimal oluğun arka kresti öndekinden daha belirgindir ve Tenon fasyasının medial kontrol bağı buraya tutunur. [[K5 s. 305]] Lakrimal kese cerrahisinde bu fasyanın yüzeyelinde kalınması orbita içeriğini korur. [[K5 s. 305]] Lakrimal kemiğin ön kenarı ile maksillanın frontal çıkıntısının arka kenarı kese fossasını tamamlar. [[K5 s. 305]]</p>
  <p>En küçük kemik katkısı palatinin orbital çıkıntısıdır. [[K5 s. 305]] Çıkıntı, fissürlerin medial birleşiminde etmoid ile maksillanın orbital yüzü arasındadır. [[K5 s. 305]] Periostun kemiğe gevşek tutunması, bazı duvar parçalarının orbita boşluğuna girilmeden çıkarılabilmesini sağlar. [[K5 s. 305]]</p>
  <p>Orbita kenarından derine ilerlerken inferiordaki yarığın ön ucunu izleyin. [[K5 s. 304]] Açık bir oluk olarak başlayan yol, maksillanın içinde kemikle çevrilir ve yüzdeki infraorbital foramende yeniden görünür. [[K5 s. 304]] Bu devamlılık, yüzeydeki çıkış ile orbita tabanındaki sinir ve damarların ilişkisini gösterir. [[K5 s. 304]]</p>
  <h3>Hangi açıklıktan ne geçer?</h3>
  <dl class="an07b-liste">
    <div><dt>Optik foramen</dt><dd>Sfenoid gövdesiyle küçük kanadın iki kökü arasından optik sinir ve oftalmik arter geçer. [[K5 s. 304–305]]</dd></div>
    <div><dt>Superior orbital fissür</dt><dd>Optik foramenin lateralindeki V’nin üst kolu, sfenoidin küçük ve büyük kanatları arasındadır. [[K5 s. 304]] III, IV, V₁ ve VI. sinirlerle üst ve alt oftalmik venleri iletir. [[K5 s. 305]]</dd></div>
    <div><dt>İnferior orbital fissür</dt><dd>V’nin alt kolu, büyük kanat ile maksilla arasındadır. [[K5 s. 304]] İnfraorbital sinir (V₂), arter ve ven orbita tabanındaki oluktan kanala ilerler ve maksillanın ön yüzündeki foramenden çıkar. [[K5 s. 304–305]]</dd></div>
    <div><dt>Etmoid foramenler</dt><dd>Nazosiliyer sinirin etmoid dalları ve eşlik eden damarlar arka ve ön açıklıklardan sırasıyla kraniyal boşluğa ve burun boşluğuna geçer. [[K5 s. 305]]</dd></div>
    <div><dt>Diğer geçitler</dt><dd>Supraorbital çentikten aynı adlı sinir (V₁) ve damarlar, küçük zigomatikofasiyal ve zigomatikotemporal kanallardan ise V₂’nin aynı adlı dalları geçer. [[K5 s. 305]] Nazolakrimal kanal, lakrimal kesenin buruna boşalma yoludur. [[K5 s. 305]] [[K5 s. 313]]</dd></div>
  </dl>
</section>

<section class="wrap blk ders-sec" id="an07b-apeks">
  <h2>Apekste tendinöz halka</h2>
  <p class="intro">Dört rektusun ortak başlangıcı olan tendinöz halka, optik forameni ve superior orbital fissürün medial bölümünü birlikte çevreler. [[K5 s. 310]]</p>
  <div class="viz"><div data-viz="an07b_apeks"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Ortadaki kesik sinir ucu optik kanalı buldurur. [[K5 s. 304–305]] Etrafındaki tendinöz halkanın sınırını superior orbital fissüre doğru takip edin. [[K5 s. 310]] Halkanın kemiğe oturduğu bu bölge, rektusların küreye kadar uzanan kas konisinin dar ucudur. [[K5 s. 305–306]] [[K5 s. 310]]</p></div>
  <p>Önden derine bakarken önce yuvarlak optik forameni bulun. [[K5 s. 304]] Bu açıklıkta optik sinire oftalmik arter eşlik eder. [[K5 s. 305]] Hemen lateralindeki superior orbital fissürü izlediğinizde, medial ucunun ortak kas halkası içinde kaldığını görürsünüz. [[K5 s. 304]] [[K5 s. 310]]</p>
  <h3>Kasları öne doğru izleyin</h3>
  <dl class="an07b-liste">
    <div><dt>Halkadan koniye</dt><dd>Üst, alt, medial ve lateral rektuslar apeksteki dar başlangıçlarından küreye doğru ayrılır. [[K5 s. 305–306]] [[K5 s. 309–310]] Kasların arasındaki yağ içinde optik sinir ve kılıfı uzanır. [[K5 s. 305–306]]</dd></div>
    <div><dt>Koni içindeki sinirler</dt><dd>Optik sinirin yanında okülomotor ve abdusens sinirleriyle V₁’in nazosiliyer dalı yer alır. [[K5 s. 305]] Konideki siliyer gangliyon da retrobulber enjeksiyonun yakın komşularındandır. [[K5 s. 305]]</dd></div>
    <div><dt>Koni dışında kalanlar</dt><dd>Troklear sinir, frontal sinir ve lakrimal sinir ekstrakonal yağ dokusunun bulunduğu alandadır. [[K5 s. 306]] Üst oblik kasın başlangıcı da rektusların ortak halkasının hemen üstündedir. [[K5 s. 310]]</dd></div>
  </dl>
  <p class="note"><b>İki halkayı ayırt edin.</b> Arkada kemiğe bağlı tendinöz halka rektusların başlangıcıdır. [[K5 s. 310]] Öndeki fasya halkası ise rektus kılıflarının kalınlaşmasıyla oluşur ve alt bölümü küreyi destekleyen asıcı bağa dönüşür. [[K5 s. 311]]</p>
</section>

<section class="wrap blk ders-sec" id="an07b-kure">
  <h2>Göz küresi, kamaralar ve lens</h2>
  <p class="intro">Korneadan giren ışık ön kamara, pupilla, arka kamara, lens ve vitreus kamarasını geçerek retinaya ulaşır. [[K5 s. 306]]</p>
  <div class="viz"><div data-viz="an07b_kure"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kesitte korneayı önde, optik siniri arkada bulduktan sonra kürenin duvarını içeriden dışarıya okuyun. [[K5 s. 306–308]] Vitreusa komşu retina ile dıştaki sklera arasında ince vasküler koroid uzanır. [[K5 s. 307–308]] Önde siliyer bölge, bu duvar katlarıyla lensin asıcı bağı arasındaki ilişkiyi gösterir. [[K5 s. 307]] [[K5 s. 309]]</p></div>
  <h3>Kürenin duvarı</h3>
  <p>Bütün çapları 25 mm’nin hemen altında olan göz, farklı büyüklükte iki küre parçasından oluşur. [[K5 s. 306]] Öne kabaran saydam parça kürenin yaklaşık altıda birini, opak arka parça altıda beşini oluşturur. [[K5 s. 306]] Optik sinir arka kutbun yaklaşık 3 mm nazalinden girer. [[K5 s. 306]]</p>
  <dl class="an07b-liste">
    <div><dt>Fibröz kat</dt><dd>Öndeki saydam kornea, sklerokorneal bileşkede opak skleraya geçer. [[K5 s. 306]] Sağlam sklera kürenin biçimini korur ve dış göz kaslarına tutunma yüzeyi sağlar. [[K5 s. 306]] Arkada optik sinirin sklerayı deldiği yerde sklera dural kılıfla birleşir. [[K5 s. 306]]</dd></div>
    <div><dt>Vasküler kat</dt><dd>Sklerayı içten döşeyen ince, damardan zengin koroidi arkada optik sinir deler. [[K5 s. 307]] Koroid önde siliyer cisim aracılığıyla irise bağlanır. [[K5 s. 307]]</dd></div>
    <div><dt>Siliyer cisim</dt><dd>Koroidle devamlı fibröz halka ile iris arasında radyal dizilmiş 60–80 siliyer kıvrım bulunur. [[K5 s. 307]] Bu çıkıntılar arkada lensin asıcı bağına bağlanır. [[K5 s. 307]] Dıştaki radyal ve içteki sirküler düz kaslar, III. sinirle gelen parasempatik liflerin denetiminde lensin eğriliğini değiştirir. [[K5 s. 307]]</dd></div>
    <div><dt>İris</dt><dd>Pupillayı çevreleyen kasılabilir diskin dört katı önden arkaya mezotelyal örtü, pigment hücreli bağ dokusu stroması, düz kaslar ve pigmentli arka hücre tabakasıdır. [[K5 s. 307–308]] Arka tabaka retinanın siliyer bölümüyle devam eder. [[K5 s. 308]] Sempatik lifler radyal kasla pupillayı genişletir, III. sinirdeki parasempatik lifler sirküler sfinkterle daraltır. [[K5 s. 308]]</dd></div>
  </dl>
  <p>Ön segment kesitini okurken önce pupillayı bulun. [[K5 s. 306–307]] Ortadaki açıklık pupilla, onu kuşatan kasılabilir disk iristir. [[K5 s. 307]] Lens bu açıklığın hemen arkasında yer alır ve konveks yüzleriyle vitreus ile aköz hümör arasındaki sınırı gösterir. [[K5 s. 308]]</p>
  <h3>Lensin iki yanındaki ortamlar</h3>
  <dl class="an07b-liste">
    <div><dt>Lens</dt><dd>İrisin hemen arkasındaki bikonveks lens aköz hümörle vitreus arasındadır. [[K5 s. 308]] Özellikle orta veya arka bölümündeki opasiteler (katarakt) görmeyi engelleyebilir. [[K5 s. 308]]</dd></div>
    <div><dt>Aköz hümör</dt><dd>İris ve siliyer cisim damarlarından süzülen plazma filtratı önce iris ile lens arasındaki arka kamaraya salgılanır. [[K5 s. 309]] Pupilladan kornea ile iris arasındaki ön kamaraya geçer, skleranın venöz sinüsünden (Schlemm kanalı) siliyer venlere geri emilir. [[K5 s. 309]]</dd></div>
    <div><dt>Vitreus</dt><dd>Kürenin arkadaki beşte dördünü dolduran saydam, akışkan jeli ince hiyaloid membran sarar. [[K5 s. 309]] İçinden lenf dolu hiyaloid kanal geçer. [[K5 s. 309]]</dd></div>
    <div><dt>Akomodasyon</dt><dd>Hiyaloid membranın kalın ön kısmına siliyer çıkıntılar tutunur ve buradan çıkan asıcı bağ lens kapsülüne ekvatorun önünde bağlanır. [[K5 s. 309]] Radyal siliyer lifler kasılınca lensi yerinde tutan bağ gevşer ve lens daha konveks olur. [[K5 s. 309]]</dd></div>
  </dl>
  <p class="note"><b>Arka kamara nerede biter?</b> Kornea tarafından bakarken önce ön kamarayı geçersiniz, ardından pupilladan irisin arka yüzüne ulaşırsınız. [[K5 s. 306–307]] Arka kamara iris ile lens arasındaki boşluktur ve arka sınırı lenstir. [[K5 s. 309]] Lensin ötesindeki geniş boşluğa geçtiğinizde artık aköz hümörün dolaştığı kamaralardan çıkmış, hiyaloid membranın sardığı vitreusa ulaşmış olursunuz. [[K5 s. 306–309]]</p>
</section>

<section class="wrap blk ders-sec" id="an07b-fundus">
  <h2>Retina ve göz dibi</h2>
  <p class="intro">Işık, çubuk ve konilere ulaşmadan önce retinayı kat eder. [[K5 s. 306]]</p>
  <div class="viz"><div data-viz="an07b_fundus"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Bu görünüm sağ gözün oftalmoskopik göz dibidir. [[K5 s. 308]] Damarların çıktığı soluk disk nazal tarafı, makulanın merkezindeki fovea temporal tarafı buldurur. [[K5 s. 308]] Sinirin retinadan çıkış yeriyle merkezi görmenin karşılığını ayrı ayrı gösterin. [[K5 s. 308]]</p></div>
  <dl class="an07b-liste">
    <div><dt>Tabakalar</dt><dd>Gözün içteki sinir tabakası retina, koroid ile vitreusun hiyaloid membranı arasında uzanır. [[K5 s. 306]] [[K5 s. 308]] Dışı pigmentli, içi nöraldir ve önde ora serrata denen düzensiz kenarla sonlanır. [[K5 s. 308]]</dd></div>
    <div><dt>İmpulsun yolu</dt><dd>Çubuk ve konilerden başlayan sinyal, ara tabakadaki bipolar nöronlardan gangliyon hücrelerine geçer. [[K5 s. 306]] [[K5 s. 308]] Gangliyon aksonları retinanın yüzeyel sinir liflerini oluşturur ve arkada birleşerek orbitadan beyne uzanan optik siniri meydana getirir. [[K5 s. 306]] [[K5 s. 308]]</dd></div>
    <div><dt>Merkezi görme</dt><dd>Arka kutup yakınındaki soluk sarı makula luteanın merkezinde fovea bulunur. [[K5 s. 307–308]] Merkezi görmeden makula sorumludur. [[K5 s. 308]]</dd></div>
    <div><dt>Kör nokta</dt><dd>Makulanın hemen medialindeki soluk optik disk, sinir liflerinin retinadan çıktığı bölgedir. [[K5 s. 308]] Retinanın santral arteri burada üst ve alt dallara, ardından her biri nazal ve temporal dallara ayrılır. [[K5 s. 308]]</dd></div>
  </dl>
  <h3>Göz dibinde yönünüzü bulun</h3>
  <p>Sağ göz dibinde iki ayrı noktayı arayın. [[K5 s. 308]] Üst ve alt damar dallarını köklerine doğru geri izlediğinizde optik diske varırsınız. [[K5 s. 308]] Buradan temporale doğru bakınca merkezi görme alanına karşılık gelen makulayı ve içindeki santral foveayı bulursunuz. [[K5 s. 308]]</p>
  <p>Görme yolunu ters yönde anlatırken diskten başlayın. [[K5 s. 306]] [[K5 s. 308]] Diskte birleşen lifler gangliyon hücrelerinin aksonlarıdır, bu hücrelerin girdisi bipolar nöronlardan, onların girdisi ise çubuk ve konilerden gelir. [[K5 s. 306]] [[K5 s. 308]] Böylece histolojik olarak çok katlı retina, işlev bakımından üç hücre grubu üzerinden okunabilir. [[K5 s. 308]]</p>
</section>

<section class="wrap blk ders-sec" id="an07b-kas">
  <h2>Kaslar, hareketler ve Tenon fasyası</h2>
  <p class="intro">Dört rektus ekvatorun önüne, iki oblik kas ise arkasına tutunur. [[K5 s. 310]]</p>
  <div class="viz"><div data-viz="an07b_kas"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Sağ gözün üst yüzünde rektusları öne doğru izleyin. [[K5 s. 309–310]] Medial duvar tarafındaki dar üst oblik kasın tendonu makarada yön değiştirirken rektuslar skleraya doğrudan tutunur. [[K5 s. 310]] Alt yüzü dolanan ikinci oblik kasın seyri üst oblikten farklıdır. [[K5 s. 310]]</p></div>
  <p>Orbita kasları arasında bu altı kasa ek olarak üst kapağı kaldıran levator palpebrae superioris bulunur. [[K5 s. 309]] [[K5 s. 312]]</p>
  <dl class="an07b-liste">
    <div><dt>Rektuslar</dt><dd>Ortak tendinöz halka optik forameni ve superior orbital fissürün medial bölümünü çevreler. [[K5 s. 310]] Dört rektus buradan başlayıp skleraya uzanır. [[K5 s. 310]] Lateral rektusu VI, diğer üç rektusu III. sinir çalıştırır. [[K5 s. 310]]</dd></div>
    <div><dt>Üst oblik</dt><dd>Halkanın hemen üzerinden başlar. [[K5 s. 310]] Uzun tendonu tavanın medialindeki fibröz makaradan dönüp üst rektus tutunmasının hemen lateralinde skleraya bağlanır. [[K5 s. 310]] Motor siniri IV’tür. [[K5 s. 310]]</dd></div>
    <div><dt>Alt oblik</dt><dd>Orbitanın medialinden başlayıp kürenin altını askı gibi dolanır ve üst ile lateral rektus arasında skleraya tutunur. [[K5 s. 310]] Motor siniri III’tür. [[K5 s. 310]]</dd></div>
  </dl>
  <h3>Primer bakıştan itibaren kas etkileri</h3>
  <dl class="an07b-liste">
    <div><dt>Medial ve lateral rektuslar</dt><dd>Tek eksende çalışırlar. [[K5 s. 310]] Medial rektus addüksiyon, lateral rektus abdüksiyon yaptırır. [[K5 s. 310]]</dd></div>
    <div><dt>Üst ve alt rektuslar</dt><dd>İkisi de addüksiyon yaptırır. [[K5 s. 310]] Üst rektus buna elevasyon ve medial rotasyon, alt rektus depresyon ve lateral rotasyon ekler. [[K5 s. 310]]</dd></div>
    <div><dt>Üst ve alt oblikler</dt><dd>İkisi de abdüksiyon yaptırır. [[K5 s. 310]] Üst oblik depresyon ve medial rotasyon, alt oblik elevasyon ve lateral rotasyon ekler. [[K5 s. 310]] Kitaptaki “serserinin kası” anımsatıcısı, üst obliğin gözü aşağı ve dışa yöneltmesini hatırlatır. [[K5 s. 310]]</dd></div>
    <div><dt>Saf dikey hareket</dt><dd>Üst rektus ile alt oblik birlikte gözü kaldırır. [[K5 s. 310]] Alt rektus ile üst oblik birlikte gözü indirir. [[K5 s. 310]]</dd></div>
  </dl>
  <p>Göz tam karşıya bakarken saf depresyonu açıklamak için alt rektus ile üst obliğin etkilerini yan yana koyun. [[K5 s. 310]] İkisi de gözü indirir, ancak ilki addüksiyon ve lateral rotasyon, ikincisi abdüksiyon ve medial rotasyon yaptırır. [[K5 s. 310]] Bu karşıt bileşenler birbirini dengeler ve ortak dikey etki kalır. [[K5 s. 310]]</p>
  <h3>Küreyi taşıyan askı</h3>
  <p>Tenon fasyası (vajina bulbi), korneoskleral bileşkeden arkaya uzanan ince bir kılıftır. [[K5 s. 310]] Optik sinirin girişinde dural kılıfla birleşir ve küreyi kaslarla arasındaki orbital yağdan ayırır. [[K5 s. 310]] Kas tendonları Tenon fasyasını deler, fasya kas üzerine dönerek her birine kılıf oluşturur. [[K5 s. 310–311]]</p>
  <p>Rektus kılıfları önde, Tenon ile birleşmeden hemen önce kalınlaşıp bir halka oluşturur. [[K5 s. 311]] Halkanın alt kalınlaşması gözün asıcı bağıdır. [[K5 s. 311]] Medial ve lateral uzantıları kontrol bağları olarak kemik duvarlara tutunur ve küreyi hamak gibi taşır. [[K5 s. 311]]</p>
</section>

<section class="wrap blk ders-sec" id="an07b-kapak">
  <h2>Göz kapakları ve konjonktiva</h2>
  <p class="intro">Kapakları orbikülaris okuli ve levator palpebrae superioris hareket ettirir, bu hareket üst kapakta daha belirgindir. [[K5 s. 311–312]]</p>
  <div class="viz"><div data-viz="an07b_kapak"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kesitte önce kirpik köklerini bulun ve üst kapağın serbest kenarından iç yüzüne doğru ilerleyin. [[K5 s. 311–312]] Kirpiklerin hemen arkasında tarsal bezlerin ağızları, kapağın göz küresine bakan yüzünde ise konjonktiva vardır. [[K5 s. 312]]</p></div>
  <p>Üst kapak daha büyük ve daha hareketlidir; levator palpebrae superioris içermesi dışında iki kapağın temel yapısı aynıdır. [[K5 s. 311]]</p>
  <dl class="an07b-liste">
    <div><dt>Dıştan içe</dt><dd>Deri ve gevşek bağ dokusundan sonra orbikülaris lifleri, yoğun fibröz tarsal plaklar, tarsal bezler ve konjonktiva gelir. [[K5 s. 311–312]]</dd></div>
    <div><dt>Kapak kenarı</dt><dd>Kirpikler deri ile mukozanın birleşiminden çıkar. [[K5 s. 312]] Hemen arkalarında büyük sebase bezler olan Meibomian bezlerinin ağızları bulunur. [[K5 s. 312]] Salgı, kapalı kapakta fissürün kapanmasına yardım eder ve açıkta kalan göz yüzeyinde ince bir film oluşturur. [[K5 s. 312]] Tıkanan bez genişleyerek kiste dönüşebilir. [[K5 s. 312]]</dd></div>
    <div><dt>Bağlar</dt><dd>Tarsal plakların medial uçları güçlü medial palpebral bağla kesenin önünde, anterior lakrimal kreste ve maksillanın komşu frontal çıkıntısına tutunur. [[K5 s. 312]] Lateral palpebral bağ orbita kenarının hemen içindeki zigomaya ulaşır. [[K5 s. 312]]</dd></div>
    <div><dt>Septum</dt><dd>Orbita kenarının periostuna bağlı ince fibröz septum üstte levator fasyasına, altta alt tarsal plağın kenarlarına katılır. [[K5 s. 312]] Preseptal aralık bu yaprağın önündedir. [[K5 s. 312]]</dd></div>
    <div><dt>Duyu</dt><dd>Üst kapak V₁’in supraorbital, supratroklear ve lakrimal dallarından duyu alır. [[K5 s. 312]] Alt kapağın duyusunu infraorbital (V₂) ve infratroklear (V₁) sinirler taşır. [[K5 s. 312]] Bu dallar koni dışında kaldığından retrobulber blok kapak duyusunu etkili biçimde kaldırmaz. [[K5 s. 312]] Kapak ve konjonktiva anestezisinde preseptal yaklaşım daha etkilidir. [[K5 s. 312]]</dd></div>
    <div><dt>Konjonktiva</dt><dd>Kapağın iç yüzünü döşeyen mukoza fornikste kıvrılıp ön skleraya geçer ve kornea epiteliyle devam eder. [[K5 s. 312]] Kapakta daha kalın ve damarlı, sklera üzerinde daha incedir. [[K5 s. 312]] Lakrimal bez üst fornikse açılır. [[K5 s. 312]]</dd></div>
  </dl>
  <p>Kapak diseksiyonunda üst tarsal plağın üzerinde levator tendonu, yan tarafta lakrimal arter ve sinir, üst kenarda supraorbital damar ve sinir seçilir. [[K5 s. 311]] Aynı kesitte orbital septumun kapak iskeletine uzanışı, preseptal enjeksiyonun neden kas konisinden ayrı bir alana yapıldığını gösterir. [[K5 s. 305–306]] [[K5 s. 311–312]]</p>
  <p>Palpebral fissürün genişliği orbikülaris ile levatorun tonusuna ve kürenin öne çıkma derecesine bağlıdır. [[K5 s. 312]]</p>
</section>

<section class="wrap blk ders-sec" id="an07b-gozyasi">
  <h2>Gözyaşının bezden buruna yolu</h2>
  <p class="intro">Gözyaşı üst forniksin lateraline salgılanır ve kapakların medial kenarındaki iki punktumdan toplanır. [[K5 s. 312]]</p>
  <div class="viz"><div data-viz="an07b_gozyasi"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Sağ gözün üst dışındaki bez ile burna komşu kese gözün karşılıklı iki yanında yer alır. [[K5 s. 312–313]] Kapağın medial kenarından başlayan iki ince kanalikülü önce keseye, sonra tek bir kanal halinde aşağıya, buruna doğru izleyin. [[K5 s. 312–313]]</p></div>
  <dl class="an07b-liste">
    <div><dt>Bez</dt><dd>Orbitanın üst lateralindeki lakrimal fossada bulunan ana lobun büyüklüğü ve biçimi bademi andırır. [[K5 s. 312]] Küçük palpebral lob üst kapağın arkasına uzanır. [[K5 s. 312]]</dd></div>
    <div><dt>Yüzeye dağılım</dt><dd>Bezden çıkan 8–12 ince kanal palpebral lobdan geçerek üst forniksin lateraline açılır. [[K5 s. 312]] Kapak hareketleri salgıyı göz yüzeyine yayar. [[K5 s. 312]]</dd></div>
    <div><dt>Toplanma</dt><dd>Her kapağın medial kenarı yakınındaki küçük lakrimal papillada bir punktum görülür. [[K5 s. 312]] Üst ve alt kanaliküller buradan medial orbital duvardaki çöküntüye yerleşmiş lakrimal keseye açılır. [[K5 s. 312–313]]</dd></div>
    <div><dt>Buruna drenaj</dt><dd>Kese, yaklaşık 12 mm uzunluğundaki nazolakrimal kanalla alt meatusun ön kısmına boşalır. [[K5 s. 313]] Kanal medial duvarda kendi kemik kanalı içinde seyreder ve tıkanması seyrek sayılmaz. [[K5 s. 313]]</dd></div>
  </dl>
  <p>Kesitte burun boşluğunun iç tarafında septumu, dış duvarında orta ve alt konkaları bulun. [[K5 s. 313]] Nazolakrimal kanalı aşağı izlerken sonlanma düzeyini alt konka belirler. [[K5 s. 313]] Kanalın ağzı onun altındaki meatusun önünde yer alır, komşu maksiller sinüs ayrı bir boşluktur. [[K5 s. 313]]</p>
  <p class="note"><b>İki açıklığı gösterin.</b> Üst dışta palpebral lobdan gelen kanalların açıldığı konjonktival forniks, salgının göz yüzeyine ulaştığı yerdir. [[K5 s. 312]] Medialdeki küçük kapak açıklıkları ise gözyaşının yüzeyden ayrılıp kanaliküllere girdiği punktumlardır. [[K5 s. 312–313]]</p>
</section>

<section class="wrap blk ders-sec" id="an07b-blok">
  <h2>Orbita kompartımanları ve bloklar</h2>
  <p class="intro">Orbital septum, rektus konisi ve Tenon fasyası lokal anesteziğin hangi dokulara ulaşabileceğini açıklar. [[K5 s. 305–306]] [[K5 s. 310]] [[K5 s. 313–314]]</p>
  <div class="viz"><div data-viz="an07b_blok"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Bir hedef kürenin yüzeyini, diğer ikisi orbital yağ içindeki kompartımanları izler. [[K5 s. 305–306]] [[K5 s. 313–314]] Noktaları karşılaştırırken her birinin skleraya, alt rektusa ve kılıfı içindeki optik sinire göre konumunu söyleyin. [[K5 s. 305–306]] [[K5 s. 310–311]]</p></div>
  <h3>Dört anatomik alan</h3>
  <dl class="an07b-liste">
    <div><dt>Göz küresi ve preseptal alan</dt><dd>Küre başlı başına bir kompartımandır. [[K5 s. 305]] Preseptal alanı arkadan sınırlayan dikey septum, periostun bağ dokusundan devam eder. [[K5 s. 305]] Kanın öne veya arkaya ekstravazasyonuna ve enfeksiyonun yayılmasına karşı bariyerdir. [[K5 s. 305]]</dd></div>
    <div><dt>Retrobulber alan</dt><dd>Septumun arkasında, rektus konisinin içindedir. [[K5 s. 305]] II, III ve VI. sinirler, nazosiliyer sinir, otonom siliyer gangliyon ve oftalmik damarlar buradadır. [[K5 s. 305]] İntrakonal enjeksiyonun hızlı ve etkili anestezisi bu yakınlıkla açıklanır. [[K5 s. 305]]</dd></div>
    <div><dt>Peribulber alan</dt><dd>Septumun arkasında, koninin dışındadır ve daha az sinir içerir. [[K5 s. 306]] Lakrimal, frontal ve troklear sinir bu alandadır. [[K5 s. 306]] Ekstrakonal enjeksiyon daha yüksek hacim gerektirir ve ilaç retrobulber alana difüzyonla ulaşır. [[K5 s. 306]]</dd></div>
  </dl>
  <p>Kesitte önce alt rektusu bulun. [[K5 s. 306]] Kasın koni içine bakan yüzünde intrakonal yağ ve kılıfı içinde optik sinir, dışa bakan yüzünde ekstrakonal yağ yer alır. [[K5 s. 306]] K5’in arkadan görünümünde optik sinirin yanında dural kılıf ve subaraknoid aralık da seçilir. [[K5 s. 309]] Daha öne, kürenin yüzeyine döndüğünüzde ise Tenon fasyası sklerayı yakından izler. [[K5 s. 310–311]]</p>
  <h3>Cerrahi hedef ile risk arasındaki ilişki</h3>
  <p>Geleneksel hedefler kürede analjezi, dış göz kaslarında akinezi ve göz içi basıncında düşmeydi. [[K5 s. 313]] Fakoemülsifikasyonda lens dokusu ultrasonik el aletiyle parçalanıp aspire edilir. [[K5 s. 313]] Bu yöntemin yaygınlaşması retrobulber blok gereksinimini azaltmıştır. [[K5 s. 313]] Hedef alanın ayrıntılı anatomisi, duruma uygun bloğun seçilmesini sağlar. [[K5 s. 313]]</p>
  <p>Girişimlerin çoğu ön segmenttedir ve komplikasyon oranı daha yüksek olan retrobulber blok uygulanmadan gerçekleştirilebilir. [[K5 s. 313]]</p>
  <dl class="an07b-liste">
    <div><dt>Sub-Tenon</dt><dd>K5’in en sık kullanılan teknik olarak tanımladığı bu yaklaşımda konjonktiva ve Tenon kapsülü forsepsle tutulup küçük bir kesiyle açılır. [[K5 s. 313]] Künt, kavisli iğne veya kanülün ucu küre ekvatoruna ya da daha posteriora ulaşır. [[K5 s. 313]] Küçük hacim (2–5 mL) fasya altında kürenin çevresine yayılarak analjezi oluşturur. [[K5 s. 314]] Daha büyük hacim, fasyayı delen kasların kılıflarına yayılmayı ve içlerindeki motor sinirlerin blokajını kolaylaştırır. [[K5 s. 314]]</dd></div>
    <div><dt>Retrobulber</dt><dd>Amaç anesteziğin kas konisinin içine verilmesidir, bu yüzden “intrakonal anestezi” adı daha doğrudur. [[K5 s. 314]] İntrakonal yaklaşımda iğne ve solüsyonun damarlarla optik sinire yakınlığı damar içi enjeksiyon, retrobulber kanama ve doğrudan sinir yaralanması riskini artırır. [[K5 s. 314]] Anestezik optik sinir kılıfı boyunca beyin sapına yayılabilir. [[K5 s. 314]]</dd></div>
    <div><dt>Peribulber</dt><dd>Birçok anestezist ekstrakonal enjeksiyonu tercih eder. [[K5 s. 314]] Deneyimli ellerde bile komplikasyon görülebilir, ancak sıklığının intrakonal yaklaşımdan düşük olduğu düşünülür. [[K5 s. 314]]</dd></div>
  </dl>
  <p class="note"><b>Analjezi ile akinezi neden ayrılır?</b> Sub-Tenon aralığına verilen küçük hacim kürenin çevresini dolaşarak analjezi sağlar. [[K5 s. 314]] İlaç kas kılıflarına dağılırsa motor sinirlere de ulaşabilir. [[K5 s. 314]] Kapak duyusu ayrı bir sorudur, çünkü üst ve alt kapağın duyu sinirleri rektus konisinin dışında seyreder. [[K5 s. 312]]</p>
</section>

<section class="wrap blk ders-sec" id="an07b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önermeyi bağımsız değerlendirin.</p>
  <div data-viz="mtf" data-q="an07b-1"></div>
  <div data-viz="mtf" data-q="an07b-2"></div>
  <div data-viz="mtf" data-q="an07b-3"></div>
</section>
<section class="wrap blk ders-sec" id="an07b-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><h3>Açılış sorusu</h3><p>Ön segment cerrahisi için önünüzde bir orbita kesiti var. Üç lokal anestezi tekniğinin hedeflerini gösterin. Hangisinde optik sinir kılıfı özellikle önem kazanır?</p></div>
  <h3>Cevap iskeleti</h3>
  <ol class="iskelet">
    <li>Önde septumu, arkada apekse doğru birleşen dört rektusu bulun. [[K5 s. 305–306]] [[K5 s. 309–310]]</li>
    <li>Koni içinde optik sinir, oftalmik damarlar ve siliyer gangliyon bulunduğundan retrobulber blok hızlı etki gösterir. [[K5 s. 305]]</li>
    <li>İntrakonal enjeksiyonda kanama, damar içi enjeksiyon ve doğrudan sinir hasarı riski artar, ilaç sinir kılıfından beyin sapına ulaşabilir. [[K5 s. 314]]</li>
    <li>Peribulber enjeksiyon koni dışındadır ve daha büyük hacimle koni içine difüzyona dayanır. [[K5 s. 306]]</li>
    <li>Sub-Tenon yaklaşımında ilaç küreyi saran fasyanın altına yayılır, hacim arttığında kas kılıflarına da ulaşabilir. [[K5 s. 313–314]]</li>
  </ol>
  <p class="note"><b>Çizin.</b> Tek kesitte küreyi, Tenon fasyasını, optik sinir kılıfını ve rektus konisini yerleştirip üç enjeksiyon düzlemini işaretleyin. [[K5 s. 305–306]] [[K5 s. 310]] [[K5 s. 313–314]]</p>
  <h3>Olası ek sorular</h3><ul><li>Retrobulber bloktan sonra kapak duyusu neden sürebilir?</li><li>Saf elevasyonda hangi iki kas birlikte çalışır?</li><li>Aköz hümör ile gözyaşı hangi farklı yollardan boşalır?</li></ul>
</section>
<section class="wrap blk ders-sec" id="an07b-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Optik kanalı optik sinir ve oftalmik arter, superior orbital fissürü göz hareket sinirleri, V₁ ve oftalmik venler paylaşır. [[K5 s. 305]]</li>
    <li>Arka kamaradaki aköz hümör pupilladan ön kamaraya geçer ve Schlemm kanalı yoluyla venlere döner. [[K5 s. 309]]</li>
    <li>Makula merkezi görmenin, medialindeki optik disk ise kör noktanın karşılığıdır. [[K5 s. 308]]</li>
    <li>Saf elevasyonda üst rektus ve alt oblik, saf depresyonda alt rektus ve üst oblik birlikte çalışır. [[K5 s. 310]]</li>
    <li>Gözyaşı medial punktumlardan keseye, oradan alt meatusun ön kısmına ulaşır. [[K5 s. 312–313]]</li>
    <li>Retrobulber ve peribulber hedefleri rektus konisi ayırır, sub-Tenon yaklaşımının hedefi ise kürenin fasya kılıfının altıdır. [[K5 s. 305–306]] [[K5 s. 313–314]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="07b"></div>
  <nav class="ders-gec"><a href="#/dersler/anatomi/07a">← Toraks girişi ve antekübital fossa</a><a href="#/dersler/anatomi/07c">Sonraki: Karın duvarı →</a></nav>
</section>`,
};
