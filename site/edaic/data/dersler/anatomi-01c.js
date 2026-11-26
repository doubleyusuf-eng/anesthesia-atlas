VERI.sorular = VERI.sorular || {};
VERI.sorular['an01c-1'] = {
  no: 1, kok: 'Larinksin çatısı ve boşluğu', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 25–29]]',
  onermeler: [
    { t: 'Krikoidin geniş laminası önde yer alır.', d: false, n: 'Geniş lamina arkada, ince ark öndedir. [[K5 s. 25]]' },
    { t: 'Kornikulat kıkırdak aritenoidin tepesindedir.', d: true, n: 'Aritenoidin tepesindeki küçük nodül kornikulattır. [[K5 s. 26]]' },
    { t: 'Larinks sakkülü sinüsün arka ucundan aşağı iner.', d: false, n: 'Sakkül sinüsün ön kesiminden yukarı uzanır. [[K5 s. 29]]' },
    { t: 'Kuadrangüler membranın alt kenarı vestibüler bağı oluşturur.', d: true, n: 'Kalınlaşan bu kenar yalancı ses telini destekler. [[K5 s. 29]]' },
    { t: 'Krikotrakeal bağ krikoidi hiyoid gövdesine bağlar.', d: false, n: 'Alt tutunma yeri birinci trakea halkasıdır. [[K5 s. 26]]' },
  ],
};
VERI.sorular['an01c-2'] = {
  no: 2, kok: 'Fonasyonda ve inspirasyonda kaslar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 35–37]]',
  onermeler: [
    { t: 'Posterior krikoaritenoid ses telini abdüksiyona getirir.', d: true, n: 'Aritenoidi dışa döndüren bu kas glottisi açar. [[K5 s. 35]]' },
    { t: 'Krikotiroid kasılınca glottisin ön-arka çapı kısalır.', d: false, n: 'Krikoid lamina arkaya eğilirken ön-arka çap uzar ve tel gerilir. [[K5 s. 35]]' },
    { t: 'İnteraritenoid kas glottisin arka bölümünü kapatmaya yardım eder.', d: true, n: 'İki aritenoidi birleştiren kas özellikle arka açıklığa etki eder. [[K5 s. 35]]' },
    { t: 'Tiroaritenoid kas aritenoidi öne çekerek teli gevşetir.', d: true, n: 'Öne gelen aritenoid ile tiroid arasındaki tel kısalır. [[K5 s. 35]]' },
    { t: 'Krikotiroidin motor siniri rekürren laringeal sinirdir.', d: false, n: 'Krikotiroidi üst laringeal sinirin eksternal dalı uyarır. [[K5 s. 37]]' },
  ],
};
VERI.sorular['an01c-3'] = {
  no: 3, kok: 'Tiroid cerrahisi ve laringoskopi', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 37–41]]',
  onermeler: [
    { t: 'Sol rekürren laringeal sinir sağ subklavyen arterin altından döner.', d: false, n: 'Sol sinir aort arkının altından döner. [[K5 s. 37]]' },
    { t: 'İnternal laringeal sinir piriform fossa mukozasının altında seyreder.', d: true, n: 'Sinirin yüzeyel konumu burada topikal blok yapılabilmesini açıklar. [[K5 s. 37]]' },
    { t: 'Tek taraflı rekürren felçte hareketsiz tel karşı telden daha aşağıda kalır.', d: true, n: 'Paralitik kasların aşağı çektiği tel orta hatta yakın durur. [[K5 s. 38]]' },
    { t: 'İki taraflı rekürren felçte inspiratuvar stridor gelişebilir.', d: true, n: 'İnspirasyonda iki tel birbirine yaklaşarak hava geçişini engeller. [[K5 s. 38]]' },
    { t: 'Cormack–Lehane derece 3 görünümde yalnız epiglot seçilir.', d: true, n: 'Bu derecede epiglot görülürken glottis seçilemez. [[K5 s. 41]]' },
  ],
};

const AN01C_NAV = [
  ['iskelet', 'Kıkırdaklar'], ['bosluk', 'Bağlar ve boşluk'], ['erisim', 'Cerrahi hava yolu'],
  ['kas', 'Kaslar'], ['damar', 'Damarlar ve lenf'], ['sinir', 'Sinirler ve felç'],
  ['gorunum', 'Laringoskopi'], ['derece', 'Görünüm dereceleri'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];
SAYFALAR['dersler/anatomi/01c'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 1 · Ders 01c', baslik: 'Larinks',
  lede: 'Larinks yutarken solunum yolunu koruyan bir kapak olarak gelişmiştir. [[K5 s. 24]] Konuşma, bu hareketli kıkırdak iskeletin evrimsel olarak daha sonra kazandığı bir işlevdir. [[K5 s. 24]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${AN01C_NAV.map(([id, ad]) => `<button type="button" data-scroll="an01c-${id}">${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="an01c-iskelet">
<h2>Elle hissedilen iskelet</h2>
<p class="intro">Boynun önünde larinksi palpe ederken C4–C6 karşısındaki kıkırdakları izlersiniz. [[K5 s. 24]]</p>
<div class="viz"><div data-viz="an01c_iskelet"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Arkada laringofarenks, larinksi omurgadan ayırır. [[K5 s. 24]] Önde orta çizgiyi derin fasyanın sarıcı tabakası, yanları ince şerit kaslar örter. [[K5 s. 24]] Bağlar kıkırdakları bir arada tutar, kaslar eklemlerdeki hareketi sağlar. [[K5 s. 24]]</p>
<p>Yüzey işaretlerini birlikte okurken hiyoidin C3, tiroid çentiğinin C4 çevresinde gösterildiğine dikkat edin. [[K5 s. 25]] Şekilde karotis bifurkasyonu hiyoid ile tiroid çentiği düzeyleri arasında, tiroid istmusu ise krikoidin altında yer alır. [[K5 s. 25]] Krikoid ve krikotrakeal bağ C6 karşısındadır. [[K5 s. 25]] Aşağıda suprasternal çentik için gösterilen karşılık T2/3 düzeyidir. [[K5 s. 25]]</p>
<h3>Üç tek kıkırdak</h3>
<ul class="an01c-iliskiler">
<li><b>Tiroid.</b> Kalkana biçimini veren iki lamina önde alt kesimde birleşir, üstte aralarında çentik kalır. [[K5 s. 24]] Birleşme yerindeki larinks çıkıntısı (Âdem elması) erkekte belirgindir. [[K5 s. 24]] Kadında bu çıkıntı belirgin değildir. [[K5 s. 24]] Her laminanın arka kenarı üst ve alt boynuzla sonlanır. [[K5 s. 25]] Alt boynuzun içindeki yuvarlak eklem yüzü krikoide bakar. [[K5 s. 25]]</li>
<li><b>Krikoid.</b> Mühür yüzüğünün geniş kısmını arkadaki dörtgen lamina, dar kısmını öndeki ark oluşturur. [[K5 s. 25]] Laminanın her yanında tiroidin alt boynuzu için bir faset, daha yukarıda aritenoid için ikinci bir faset bulunur. [[K5 s. 25]]</li>
<li><b>Epiglot.</b> Yaprak biçimli kıkırdağın dar alt ucu tiroepiglottik bağla tiroidin arka yüzüne tutunur. [[K5 s. 25]] Serbest üst uç hiyoid ve dil kökünün arkasında yukarı ve arkaya uzanır, girişin üzerine sarkar. [[K5 s. 25]] Arka yüzü serbesttir, aşağısında epiglottik tüberkül kabarır. [[K5 s. 25]]</li>
</ul>
<h3>Üç çift kıkırdak</h3>
<ul class="an01c-iliskiler">
<li><b>Aritenoid.</b> Krikoid laminanın iki üst yan köşesinde üç yüzlü birer piramit oturur. [[K5 s. 25]] Yandaki kas çıkıntısına posterior ve lateral krikoaritenoidler, öndeki vokal çıkıntıya ise vokal bağın arka ucu tutunur. [[K5 s. 25]]</li>
<li><b>Kornikulat.</b> Aritenoidin tepesindeki küçük nodülü bulun. [[K5 s. 26]]</li>
<li><b>Küneiform.</b> İnce kıkırdak parçası ariepiglottik kıvrımın kenarında yer alır. [[K5 s. 26]]</li>
</ul>
<p>Epiglotun serbest ön üst yüzünü örten mukoza ortada dile, yanlarda orofarenks duvarına geçerek orta ve yan glossoepiglottik kıvrımları oluşturur. [[K5 s. 25]] Orta kıvrımın iki yanındaki vallekulalara balık kılçığı gibi sivri cisimler takılabilir. [[K5 s. 25]] Ön yüzün alt bölümünü hiyoepiglottik bağ, hiyoid gövdesinin arkasına bağlar. [[K5 s. 25]]</p>
<p>Yenidoğanda uzun ve gevşek epiglotun serbest ucundaki derin oluk, bazı bebeklerde laringoskopide V biçiminde görünür. [[K5 s. 25–26]] Sucul memelilerin epiglotuna benzeyen bu biçim, emerken nazotrakeal hava yolunun korunmasına uygundur. [[K5 s. 26]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-bosluk">
<h2>İki kıvrım arasında bir sinüs</h2>
<p class="intro">Larinks boşluğunun yan duvarında sinüs, üstteki vestibüler kıvrım ile alttaki vokal kıvrım arasında ince bir yarık açar. [[K5 s. 29]]</p>
<div class="viz"><div data-viz="an01c_katman"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Vokal bağ önde tiroid çıkıntısının orta noktasına, arkada aritenoidin vokal çıkıntısına tutunur. [[K5 s. 29]] Krikovokal membranın önde kalınlaşan bölümü, tiroid ile krikoidi orta çizgide birleştiren krikotiroid bağı oluşturur. [[K5 s. 29]]</p>
<h3>Dış bağlantıları yukarıdan aşağıya izleyin</h3>
<ul class="an01c-iliskiler">
<li><b>Hiyoid–tiroid.</b> Tirohiyoid membran tiroidin üst kenarından hiyoid kemiğe uzanır. [[K5 s. 26]] Öndeki yoğun lifler orta tirohiyoid bağı, kalın arka kenar ise hiyoidin büyük boynuzu ile tiroidin üst boynuzunun uçları arasındaki lateral bağı yapar. [[K5 s. 26]] Üst laringeal damarlar ve üst laringeal sinirin internal dalı membrandan geçer. [[K5 s. 26]]</li>
<li><b>Tiroid–krikoid.</b> Ortadaki krikotiroid bağ yüzeyden bulunabilir ve intratrakeal enjeksiyon ya da acil laringotomi için erişim sağlar. [[K5 s. 26]]</li>
<li><b>Krikoid–trakea.</b> Krikotrakeal bağ ilk trakea halkasına uzanır. [[K5 s. 26]]</li>
</ul>
<p>Ekstrinsik bağlar arasında hiyoepiglottik bağ da sayılır. [[K5 s. 29]] Krikoaritenoid ve krikotiroid eklemler küçük, sinovyal eklemlerdir ve kapsülleri intrinsik bağlar arasındadır. [[K5 s. 29]]</p>
<h3>Yüzeyi hangi epitel örter?</h3>
<p>Mukozanın çoğunda silli silindirik epitel ve aralara dağılmış mukus salgılayan goblet hücreleri bulunur. [[K5 s. 42]] Gerçek ses tellerinde ve besin yoluyla birleşen giriş yüzeylerinde epitel çok katlı yassıdır. [[K5 s. 42]] Girişte bu değişimi epiglotun ön yüzü, arka yüzünün üstü ve ariepiglottik kıvrımların üst kısmında izleyin. [[K5 s. 42]]</p>
<p>Özellikle epiglotta çok sayıda müköz bez vardır ve mukoza kaldırıldığında bezlerin kıkırdakta bıraktığı çukurlar görülebilir. [[K5 s. 42]] Gerçek ses telinde bez bulunmaz ve epitel vokal bağa sıkıca tutunur. [[K5 s. 42]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-erisim">
<h2>Ön boyunda iki ayrı erişim düzeyi</h2>
<p class="intro">Krikotiroid giriş tiroid ile krikoid arasındaki yumuşak aralığı, trakeostomi ise krikoidin altındaki trakea halkalarını kullanır. [[K5 s. 29–33]]</p>
<div class="viz"><div data-viz="an01c_erisim"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Gelişmekte olan ya da akut supraglottik tıkanmada standart trakeostominin gerektirdiği süre ve cerrahi beceri önem kazanır. [[K5 s. 29]] Birleşik Krallık Kraliyet Anestezistler Kolejinin dördüncü ulusal denetiminde kanülle krikotiroid girişlerin %60’a kadarı başarısız kalmış, acil cerrahi hava yolu hemen her olguda sağlanmıştır. [[K5 s. 29]] Kitap bu bağlamda anestezi ve yoğun bakım uzmanlarının dilatasyonlu trakeostomi eğitimi almasını önerir. [[K5 s. 29]]</p>
<h3>Krikotiroid aralık</h3>
<p>K5’in tarifinde hasta sırtüstüdür, boyun nötr tutulur veya servikal yaralanma yoksa ekstansiyona alınabilir. [[K5 s. 29]] Duruma ve aciliyete göre cilt altına lokal anestezik uygulanabilir. [[K5 s. 29]]</p>
<ul class="an01c-iliskiler">
<li><b>Cerrahi açıklık.</b> Larinks sabitlenerek bağ üzerinde 1–2 cm yatay cilt kesisi ve ardından bağda küçük bir kesi yapılır. [[K5 s. 29–30]] K5’in tarifinde genişletme için bistürinin sapı döndürülür. [[K5 s. 30]] Tüp seçiminde trakeal tüp ve trakeostomi tüpü seçenekleri vardır. [[K5 s. 30]] K5 açık krikotirotomiyi görece kolay bir girişim olarak tanımlar ve bağın nispeten damarsız olması nedeniyle kuramsal olarak az kanama bekler. [[K5 s. 30]]</li>
<li><b>Minitrakeostomi.</b> Daha az travmatik olabilen bu yaklaşımda aynı pozisyonda, sıklıkla 1 cm dikey cilt kesisi kullanılır. [[K5 s. 30]] İğneden geçirilen tel yerleştiriciye kılavuzluk eder, bazı setlerde membranı yerleştiricinin kendisi geçer. [[K5 s. 30]] Yerleştirici üzerinden 4,0 mm tüp ilerletilir. [[K5 s. 30]]</li>
<li><b>Kullanım amacı.</b> Kitap küçük tüp için birikmiş balgamın aspirasyonunu, oksijen verilmesini ve üst hava yolu tıkanmasında acil erişimi sayar. [[K5 s. 30]] K5’in anlattığı dönemde Birleşik Krallık’ta minitrakeostominin ventilasyon amacıyla kullanımı bırakılmıştır. [[K5 s. 30]]</li>
</ul>
<h3>Açık trakeostomide orta çizgi</h3>
<p>Omuzlar arasına konan kum torbası başı tam ekstansiyona getirir, çene ile sternal çentiğin aynı çizgide tutulması başın yana sapmasını önler. [[K5 s. 30]] Orta çizgide kalmak büyük boyun damarlarından uzak tutar. [[K5 s. 31]]</p>
<ol>
<li><b>Deri ve fasya.</b> Kozmetik açıdan krikoid ile suprasternal çentik arasının ortasında kısa enine kesi tercih edilir. [[K5 s. 30–31]] K5, acilde deneyimi sınırlı bir uygulayıcının tiroidin alt kenarından çentiğin hemen üstüne inen dikey kesiyi daha güvenli bulabileceğini belirtir. [[K5 s. 31]]</li>
<li><b>Şerit kaslar.</b> Sarıcı fasya dikey açılır, pretrakeal kaslar ortadan ayrılarak ekartörlerle yanlarda tutulur. [[K5 s. 31]] İlk halkanın görülmesi ve halkaların palpe edilmesi trakeanın yerini doğrular. [[K5 s. 31–32]]</li>
<li><b>Tiroid istmusu.</b> Üst halkaları görmek için istmus çoğunlukla aşağıya alınabilir. [[K5 s. 32]] Bu mümkün olmazsa künt diseksiyonla kaldırılıp iki arter pensi arasında dikey kesilir. [[K5 s. 32]]</li>
<li><b>Trakea.</b> Küçük dikey açıklığa zorlamadan uyan en geniş tüp yerleştirilir. [[K5 s. 32]] Tüp içinden aspirasyondan sonra cilt iki veya üç dikişle gevşek kapatılır. [[K5 s. 32]]</li>
</ol>
<h3>Perkütan trakeostomide halka aralığı</h3>
<p>K5, uzun süreli hava yolu yönetiminde birçok yoğun bakım ünitesinin perkütan yöntemi benimsediğini bildirir. [[K5 s. 32–33]] Eğitimli yoğun bakım hekimi işlemi ünitede yapabilir. [[K5 s. 32]] Kitap hem erken hem geç dönemde daha az komplikasyon bildirir. [[K5 s. 32]] Genellikle küçük bir iz kalır ve kozmetik sonuç tatmin edicidir. [[K5 s. 32–33]] KBB cerrahının açık trakeostomisi, özellikle zor anatomi ve damar ya da tiroid yaralanması riski düşünülen hastalarda kullanılır. [[K5 s. 33]]</p>
<p>Hasta sırtüstü ve boyun ekstansiyondayken krikoidin hemen altında halkalar palpe edilir, en sık birinci ve ikinci halka arasından girilir. [[K5 s. 33]] Gerekirse düşük konsantrasyonda epinefrin içeren lokal anestezik kullanılabilir. [[K5 s. 33]] Bir santimetrelik cilt kesisi sonrası enjektörlü iğne halkalar arasından geçer ve hava aspirasyonu lümen içindeki konumu doğrular. [[K5 s. 33]]</p>
<p>Bronkoskopi eşliğinde iğneden ilerletilen Seldinger teli yerinde bırakılır, iğne çekilir. [[K5 s. 32–33]] Ardışık bujiler veya balon, tel üzerinden açıklığı tüp geçecek kadar genişletir. [[K5 s. 31–33]] İşlem boyunca yeterli ventilasyon ve oksijenasyonun sürdürülmesi gerekir. [[K5 s. 33]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-kas">
<h2>Glottisi açmak, kapatmak ve teli germek</h2>
<p class="intro">İntrinsik kaslar inspirasyonda telleri ayırır, yutmada telleri ve girişi kapatır, konuşmada tel gerginliğini değiştirir. [[K5 s. 33–35]]</p>
<div class="viz"><div data-viz="an01c_hareket"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>İntrinsik kasın tutunması etkisini nasıl açıklar?</h3>
<ul class="an01c-iliskiler">
<li><b>Posterior krikoaritenoid.</b> Krikoid laminanın arkasından aritenoidin kas çıkıntısının arkasına uzanır. [[K5 s. 35]] Aritenoidi dışa döndüren çekiş teli abdüksiyona getirir ve bu, glottisi açan tek kastır. [[K5 s. 35]]</li>
<li><b>Lateral krikoaritenoid.</b> Krikoid arkın üst kenarından aritenoidin yan yüzüne uzanır. [[K5 s. 35]] İçe rotasyon teli orta hatta yaklaştırır ve glottis kapanır. [[K5 s. 35]]</li>
<li><b>İnteraritenoid.</b> Çifti olmayan bu tek kas iki aritenoid arasında uzanır, özellikle glottisin arkasını kapatır. [[K5 s. 35]] Transvers liflere eşlik eden oblik lifler yukarı ve dışa dönerek ariepiglottik kas olarak devam eder. [[K5 s. 35]] Bu kas aynı adlı kıvrım içinde, girişte nispeten zayıf bir sfinkter oluşturur. [[K5 s. 35]]</li>
<li><b>Tiroaritenoid.</b> Tiroid laminalarının birleştiği yerin arkasından aritenoidin ön yan yüzüne, vokal çıkıntının ucundan kas çıkıntısına kadar tutunur. [[K5 s. 35]] Aritenoidi öne çekince tel kısalır ve gevşer. [[K5 s. 35]] Bazı lifleri ariepiglottik kıvrım boyunca epiglotun kenarına ulaşır ve tiroepiglottik kas olarak girişin kapanmasına katılır. [[K5 s. 35]]</li>
<li><b>Vokal kas.</b> Tiroaritenoidin derininde vokal kıvrıma tutunan lifler, tel gerginliğinin ince ayarına katkıda bulunabilir. [[K5 s. 35]]</li>
<li><b>Krikotiroid.</b> Kıkırdak çatının dışında kalan tek intrinsik kastır. [[K5 s. 35]] Arkın ön dış yüzünden yukarı ve arkaya uzanarak tiroid laminasının alt kenarına ve alt boynuzun ön yüzüne tutunur. [[K5 s. 35]] Ön ark tiroide yaklaşınca arkadaki lamina ve üzerindeki aritenoid geriye eğilir. [[K5 s. 35]] Glottisin ön-arka çapı uzar ve tel gerilir, bu germe işini yalnız krikotiroid yapar. [[K5 s. 35]]</li>
</ul>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">İşlev</th><th scope="col">Kaslar</th></tr></thead><tbody>
<tr><th scope="row">Abdüktör</th><td>Posterior krikoaritenoid. [[K5 s. 35]]</td></tr>
<tr><th scope="row">Addüktör</th><td>Lateral krikoaritenoid ve interaritenoid. [[K5 s. 35]]</td></tr>
<tr><th scope="row">Vestibül sfinkteri</th><td>Ariepiglottik ve tiroepiglottik. [[K5 s. 35]]</td></tr>
<tr><th scope="row">Tel gerginliği</th><td>Krikotiroid gerer, tiroaritenoid gevşetir, vokal kas ince ayar yapar. [[K5 s. 35]]</td></tr>
</tbody></table></div>
<p>Arkadan diseksiyonda epiglotun altında ariepiglottik kas, daha aşağıda oblik ve transvers interaritenoid lifler ile posterior krikoaritenoid seçilir. [[K5 s. 34]] Bu görünümün altındaki komşu işaret özofagusun longitudinal liflerinin başlangıç tendonudur. [[K5 s. 34]] Yandan görünümde tiroepiglottik, tiroaritenoid ve lateral krikoaritenoid kasların birbirine göre yerleri seçilir. [[K5 s. 34]]</p>
<h3>Larinksi bir bütün olarak hareket ettiren bağlantılar</h3>
<p>Ekstrinsik kaslar larinksi çevre yapılara bağlar, stilofarengeal ve palatofarengeal kasların bazı lifleri de öne uzanarak tiroidin arka kenarına tutunur. [[K5 s. 33]] Tiroid laminasının dışındaki oblik çizgiyi üç bağlantı için ortak işaret olarak kullanın. [[K5 s. 33]]</p>
<ul class="an01c-iliskiler">
<li><b>Sternotiroid.</b> Manubriumun arka yüzünü oblik çizgiyle birleştirir ve larinksi aşağı çeker, motor siniri ansa hipoglossidir. [[K5 s. 33]]</li>
<li><b>Tirohiyoid.</b> Oblik çizgiden hiyoidin büyük boynuzunun alt kenarına çıkar, larinksi yukarı kaldırır ve motor C1 liflerini hipoglossal sinir taşır. [[K5 s. 33]]</li>
<li><b>Alt konstriktör.</b> Oblik çizgi, krikotiroid üzerindeki tendinöz ark ve farenks yanı başlangıç yerleridir, kasın işlevi farenksi daraltmaktır. [[K5 s. 33]]</li>
</ul>
<p>Hiyoidle sıkı kas ve bağ bağlantıları dolaylı harekete izin verir. [[K5 s. 33]] Milohiyoid, stilohiyoid ve geniohiyoid yükselmeye, sternohiyoid ve omohiyoid alçalmaya yardım eder. [[K5 s. 33]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-damar">
<h2>Ses telinin iki yanında damar ve lenf yolları</h2>
<p class="intro">Üst ve alt laringeal damarlar sırasıyla üst ve rekürren laringeal sinirlere eşlik eder, lenf drenajının sınırını ise ses telleri çizer. [[K5 s. 36]]</p>
<div class="viz"><div data-viz="an01c_dolasim"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="an01c-iliskiler">
<li><b>Üst arter yolu.</b> Eksternal karotisin ilk dalı olan üst tiroid arterinden üst laringeal arter çıkar. [[K5 s. 36]] Üst laringeal sinirin internal dalıyla birlikte tirohiyoid membranı delerek larinksin içini besler. [[K5 s. 36]]</li>
<li><b>Alt arter yolu.</b> Subklavyen arterin birinci bölümü tiroservikal trunkusu, trunkus alt tiroid arterini, bu arter de alt laringeal arteri verir. [[K5 s. 36]] Alt laringeal arterin larinkse girişteki komşusu rekürren laringeal sinirdir. [[K5 s. 36]]</li>
<li><b>Venöz dönüş.</b> Üst laringeal ven üst tiroid venine, alt laringeal ven alt tiroid venine boşalır. [[K5 s. 36]]</li>
</ul>
<p>Vokal membrana sıkıca yapışan gerçek ses tellerinde lenf kanalı bulunmaz, bu yüzden üst ve alt drenaj bölgelerinin sınırı keskindir. [[K5 s. 36]] Supraglottik lenf üst laringeal ven boyunca üst derin servikal düğümlere, infraglottik lenf alt laringeal ven boyunca derin servikal zincirin alt bölümüne gider. [[K5 s. 36]] Alt bölümün ön yüzü ayrıca küçük prelaringeal ve pretrakeal düğümlere drene olur. [[K5 s. 36]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-sinir">
<h2>Sinirin seyrinden ses teli bulgusuna</h2>
<p class="intro">Vagusun üst ve rekürren laringeal dalları duyuyu ses teli düzeyinde paylaşır, motor dağılımda ayırt edici kas krikotiroiddir. [[K5 s. 37]]</p>
<div class="viz"><div data-viz="an01c_sinir"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Üst laringeal sinirin iki dalı</h3>
<p>Üst laringeal sinir internal ve eksternal karotislerin derininden geçtikten sonra ikiye ayrılır. [[K5 s. 37]] Büyük internal dal tirohiyoid membranı delerek larinks içinin ses tellerine kadar duyusunu taşır ve muhtemelen interaritenoide motor lif de verir. [[K5 s. 37]] Piriform fossada mukozanın hemen altından geçtiği için laringoskopi ve bronkoskopide bu bölgeye uygulanan topikal lokal anestezikle bloke edilebilir. [[K5 s. 37]]</p>
<p>Küçük eksternal dal alt konstriktörün üzerinde, tiroid üst kutbuna giden üst tiroid arter ve veninin hemen derininde aşağı iner. [[K5 s. 37]] Üst kutup damarları bağlanırken yaralanması, krikotiroidin tek başına sağladığı germe işlevini bozar; kitap bu kası "larinksin akort çatalı" diye anar. [[K5 s. 37]] Ses kısılır, ancak karşı krikotiroidin artan etkinliğiyle bu bulgu geçicidir. [[K5 s. 37]]</p>
<h3>Rekürren laringeal siniri sağdan ve soldan izleyin</h3>
<ul class="an01c-iliskiler">
<li><b>Sağ.</b> Vagus subklavyen arteri çaprazlarken ayrılan dal arterin altından döner ve trakeoözofageal olukta yukarı çıkar. [[K5 s. 37]]</li>
<li><b>Sol.</b> Vagus aort arkını çaprazlarken ayrılan dal arkın altından dönerek oluğa ulaşır, boyunda sağdakiyle aynı komşulukları kurar. [[K5 s. 37]]</li>
<li><b>Hedef.</b> Rekürren sinir krikotiroid dışındaki intrinsik kaslara motor lif, ses tellerinin altındaki mukozaya duyu lifi sağlar. [[K5 s. 37]]</li>
</ul>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Dal</th><th scope="col">Motor</th><th scope="col">Duyu</th></tr></thead><tbody>
<tr><th scope="row">İnternal dal</th><td>Muhtemelen interaritenoid. [[K5 s. 37]]</td><td>Ses tellerine kadar larinks içi. [[K5 s. 37]]</td></tr>
<tr><th scope="row">Eksternal dal</th><td>Krikotiroid. [[K5 s. 37]]</td><td>—</td></tr>
<tr><th scope="row">Rekürren</th><td>Krikotiroid dışındaki intrinsik kaslar. [[K5 s. 37]]</td><td>Ses tellerinin altındaki mukoza. [[K5 s. 37]]</td></tr>
</tbody></table></div>
<p>Boyunda siniri tiroidin lateral lobu örter. [[K5 s. 37]] Alt tiroid arter ortak karotisin arkasından mediale geçerek beze yaklaşır. [[K5 s. 37]] Sinir arterin önünde, arkasında veya terminal dalları arasında bulunabilir. [[K5 s. 37–38]] Sağda üç ilişki eşit olasılıklıdır, solda sinir daha sık arterin arkasındadır. [[K5 s. 37]] Hastalıklı bez siniri yerinden uzaklaştırabildiği için tiroidektomide yaralanma riski özellikle önemlidir. [[K5 s. 37]]</p>
<h3>Boyun dışındaki nedenleri ne zaman düşünürsünüz?</h3>
<p>Boyunda cerrahiye ek olarak malign, bazen benign tiroid büyümesi, lenf düğümü büyümesi ve servikal travma rekürren siniri etkileyebilir. [[K5 s. 38]] Solda toraks içindeki ek komşuluklar olası nedenleri genişletir. [[K5 s. 38]]</p>
<ul class="an01c-iliskiler">
<li><b>Kitle.</b> Akciğer veya özofagus malignitesi, malign ya da inflamatuvar lenf düğümleri ve aort arkı anevrizması siniri etkileyebilir. [[K5 s. 38]]</li>
<li><b>Kalp ve büyük damarlar.</b> Mitral stenozda çok genişleyen sol atriyum sol pulmoner arteri yukarı itebilir ve sinir arter ile aort arkı arasında sıkışabilir. [[K5 s. 38]] Arkın altından dönerken duktus arteriozusun hemen derininde bulunması, açık duktusun bağlanması sırasında bazen yaralanmasını açıklar. [[K5 s. 38]]</li>
<li><b>Sıklık.</b> Sol rekürren felç sağdakinin iki katı sıklıktadır. [[K5 s. 38]] Rekürren felçlerin yaklaşık %25’i idiyopatiktir ve periferik nörit olası açıklamadır. [[K5 s. 38]]</li>
</ul>
<h3>Tiroidektomiden sonra ses ve solunum</h3>
<p><b>Tek taraflı rekürren felçte</b> aynı taraftaki hareketsiz tel orta hatta yakın ve karşı telden aşağıdadır, paralitik kaslar teli aşağı çeker. [[K5 s. 38]] Hafif ses kısıklığı çoğunlukla sağlam telin aşırı addüksiyonuyla telafi edilir. [[K5 s. 38]] <b>İki taraflı felçte</b> ses gücü tümüyle kaybolur, teller özellikle inspirasyonda birbirine doğru çırpınarak kapak gibi tıkanma, ağır dispne ve belirgin inspiratuvar stridor oluşturur. [[K5 s. 38]]</p>
<p><b>Diğer tıkanma nedenleri.</b> Özellikle tiroid kanserinde trakea kıkırdaklarının doğrudan travması trakeomalaziye yol açabilir. [[K5 s. 38]] Sarıcı fasyanın derinindeki kanama da trakeaya dıştan basabilir. [[K5 s. 38]] Kıkırdaklar sağlamsa benign guatrın entübasyonu önleyecek bası yapması çok nadirdir ve trakea entübasyonla düzleşip genişler. [[K5 s. 38]]</p>
<p>Bütünlüğü korunmuş bez içine kanamada tıkanmanın daha olası nedeni larinks ödemidir. [[K5 s. 39]] Tiroidektomi sonrasında fasya planları bozulduğundan kanama hem trakeaya bası hem de larinks ödemiyle hava yolunu daraltabilir. [[K5 s. 39]] İlk 24 saatte laringoskopide yalancı tellerde sıklıkla bir miktar ödem görülür. [[K5 s. 39]] Ameliyatta larinksin dıştan travmaya uğraması ve venöz-lenfatik drenajın zedelenmesi olası açıklamalardır. [[K5 s. 39]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-gorunum">
<h2>Laringoskopide bakış yönü ve görülen yapılar</h2>
<p class="intro">Dil kökünden başlayın, vallekulaları ve epiglotun ön yüzünü tanıyın, ardından larinks girişini ve onun derinindeki gerçek ses tellerini bulun. [[K5 s. 39]]</p>
<div class="viz"><div data-viz="an01c_glottis"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>K5’in direkt laringoskopi ve tüp geçişi için tarif ettiği modelde boyun fleksiyonu orofarenks ve larinks eksenlerini yaklaştırırken ağız ekseni bunlara dik kalır. [[K5 s. 39]] Atlanto-oksipital eklemde başa tam ekstansiyon verildiğinde ağız da aynı doğrultuya gelir, burun öne ve yukarı yönelir. [[K5 s. 39]] Kitap bu duruşu temiz hava koklayan ya da dolu bira bardağına uzanan birinin baş pozisyonuna benzetir. [[K5 s. 39]]</p>
<ul class="an01c-iliskiler">
<li><b>Girişin önü.</b> Epiglotun arka yüzündeki belirgin tüberkülü bulun. [[K5 s. 39]]</li>
<li><b>Girişin yanları.</b> Ariepiglottik kıvrımlar epiglotun yanından arkaya ve ortaya yönelir. [[K5 s. 39]] Öndeki ince kenar, arkada küneiform ve kornikulat kıkırdakları içerdiği yerde kalınlaşır. [[K5 s. 39]]</li>
<li><b>Glottis.</b> Soluk parlak teller tiroid açısındaki ortak ön uçtan arkadaki iki vokal çıkıntıya uzanır. [[K5 s. 39]] Aralarındaki rima glottidis öne bakan tepesiyle üçgen oluşturur, derininde ilk iki ya da üç trakea halkası seçilebilir. [[K5 s. 39]]</li>
</ul>
<p>Az gelişmiş mandibula ve gerideki çene, özellikle çene açısı ile tiroid kıkırdak arasındaki mesafe de kısaysa oral entübasyonu güçleştirebilir. [[K5 s. 40]] Kabarık dil epiglotu altına saklar, pala ucunun vallekulaya yerleştirilmesi güçleşir. [[K5 s. 40]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-derece">
<h2>Laringoskopi görünümünü derecelendirme</h2>
<div class="viz"><div data-viz="an01c_derece"></div><p class="viz-cap" aria-live="polite"></p></div>
<p><b>Cormack–Lehane</b> direkt laringoskopide elde edilen görünümü derecelendirip kaydeder ve günümüzde en yaygın kullanılan sistemdir. [[K5 s. 41]] <b>Mallampati</b> ise kişi ağzını tam açtığında görülen yapılardan entübasyonun muhtemel güçlüğünü önceden değerlendirir ve dört sınıf kullanır. [[K5 s. 41–42]]</p>
</section>

<section class="wrap blk ders-sec" id="an01c-p1"><h2>Part I · Doğru mu, yanlış mı?</h2>
<p>Her önermeyi ayrı yanıtlayın, sonra gerekçesini açın.</p>
<div data-viz="mtf" data-q="an01c-1"></div><div data-viz="mtf" data-q="an01c-2"></div><div data-viz="mtf" data-q="an01c-3"></div></section>
<section class="wrap blk ders-sec" id="an01c-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Tiroidektomiden sonra hastada ses kısıklığı gelişti. Larinksi boynun önünde nasıl bulursunuz? Hangi sinirin yaralandığını kas işlevi ve laringoskopik görünüm üzerinden tartışın.</p></div>
<h3>Cevap iskeleti</h3>
<ol class="iskelet">
<li>Orta çizgide tiroid çentiğinden tiroid çıkıntısına, altındaki yumuşak krikotiroid aralığa ve krikoidin sert ön arkına inilir. [[K5 s. 24–26]]</li>
<li>Üst kutup damarlarının derinindeki eksternal dal yaralanırsa krikotiroidin teli germe işlevi aksar, karşı kasın telafisiyle ses düzelebilir. [[K5 s. 35–37]]</li>
<li>Rekürren sinir tiroid lateral lobunun derininde alt tiroid arterle değişken komşuluk gösterir. [[K5 s. 37]]</li>
<li>Tek taraflı rekürren felçte aynı taraftaki tel hareketsiz, orta hatta yakın ve karşı telden aşağıdadır. [[K5 s. 38]]</li>
<li>İki taraflı felçte inspiratuvar stridor ve ağır dispne beklenir, ameliyat sonrası tıkanmada ayrıca kanama, ödem ve trakeomalazi düşünülür. [[K5 s. 38–39]]</li>
</ol>
<p class="note"><b>Çizin.</b> Önden tiroid ve krikoidi, aralarında krikotiroid bağı işaretleyin. [[K5 s. 25–26]] İkinci çizimde üstten bakarak inspirasyondaki üçgen açıklığı, ön birleşimi ve arkadaki vokal çıkıntıları gösterin. [[K5 s. 39]]</p>
<h3>Olası ek sorular</h3><ul class="an01c-iliskiler"><li>Piriform fossadaki topikal anestezik hangi dala ulaşır?</li><li>Sol rekürren sinirin toraks içindeki komşulukları felç nedenlerini nasıl değiştirir?</li><li>Ses tellerini ayıran tek kas nereye tutunur?</li><li>Yalnız epiglotu gördüğünüz laringoskopiyi nasıl kaydedersiniz?</li></ul>
</section>
<section class="wrap blk ders-sec" id="an01c-ozet"><h2>Özet</h2>
<ul class="ozet">
<li>Krikoidin öndeki dar arkı cerrahi yüzey işaretidir, arkadaki geniş laminası aritenoidleri taşır. [[K5 s. 25–26]]</li>
<li>Yalancı tel vestibüler bağla, gerçek tel vokal bağla desteklenir ve aralarında larinks sinüsü uzanır. [[K5 s. 29]]</li>
<li>İnspirasyonda tek abdüktör posterior krikoaritenoiddir, fonasyonda teli geren kas krikotiroiddir. [[K5 s. 35]]</li>
<li>Ses teli düzeyi duyusal innervasyonun ve lenf drenajının üst-alt ayrımına karşılık gelir. [[K5 s. 36–37]]</li>
<li>Rekürren sinir sağda subklavyen arterin, solda aort arkının altından döner. [[K5 s. 37]]</li>
<li>İki taraflı rekürren felç inspirasyonda glottik tıkanmaya yol açabilir. [[K5 s. 38]]</li>
</ul><div data-viz="tamam" data-modul="anatomi" data-bolum="01c"></div>
<nav class="ders-gec"><a href="#/dersler/anatomi/01b">← Farinks ve yutma</a><a href="#/dersler/anatomi/01d">Sonraki: Trakea, ana bronşlar, plevra ve göğüs duvarı →</a></nav></section>`,
};
