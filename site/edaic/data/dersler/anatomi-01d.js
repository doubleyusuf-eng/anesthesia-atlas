VERI.sorular = VERI.sorular || {};
VERI.sorular['an01d-1'] = {
  no: 1, kok: 'Trakea ve ana bronşlar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 42–47]]',
  onermeler: [
    { t: 'Dik pozisyonda tam inspirasyon bifurkasyonu T4 düzeyine yükseltir.', d: false, n: 'Bifurkasyon ayakta tam inspirasyonda T6’ya kadar inebilir. [[K5 s. 42]]' },
    { t: 'Tiroid istmusu ikinci ile dördüncü trakea halkalarının önündedir.', d: true, n: 'İstmusun üst kenarında iki taraftan gelen superior tiroid arter dalları birleşir. [[K5 s. 43]]' },
    { t: 'Torasik trakea ile özofagus arasındaki sol olukta sağ rekürren laringeal sinir seyreder.', d: false, n: 'Toraksta sol oluktaki sinir sol rekürren laringeal sinirdir. [[K5 s. 44]]' },
    { t: 'Sağ üst lob bronşu karinadan yaklaşık 2,5 cm sonra ayrılır.', d: true, n: 'Bu kısa mesafe sağ taraflı tüpte üst lob ağzına hizalanan bir yan pencere gerektirir. [[K5 s. 46–47]]' },
    { t: 'Sol pulmoner arter önce sol ana bronşun altından geçer.', d: false, n: 'Sol pulmoner arter önce üstte, ardından öndedir. [[K5 s. 47]]' },
  ],
};
VERI.sorular['an01d-2'] = {
  no: 2, kok: 'Plevranın yüzey anatomisi', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 48–51]]',
  onermeler: [
    { t: 'Visseral plevra akciğer fissürlerine girer.', d: true, n: 'Visseral yaprak parankime sıkıca tutunur ve fissürleri örter. [[K5 s. 48]]' },
    { t: 'Plevranın alt kenarı midklaviküler hatta onuncu kaburgayı keser.', d: false, n: 'Midklaviküler sınır sekizinci, midaksiller sınır onuncu kaburgadadır. [[K5 s. 49]]' },
    { t: 'Plevra tepesi klavikulanın medial üçte birini yaklaşık 4 cm aşar.', d: true, n: 'Kubbe bu düzeye ulaşır ve ön kenar sternoklaviküler eklemin arkasından geçer. [[K5 s. 48]]' },
    { t: 'Sakin solunumda kostodiyafragmatik reses kalır.', d: true, n: 'Burada kostal ve diyafragmatik yapraklar temas eder, zorlu inspirasyonda akciğer bu alana genişler. [[K5 s. 49]]' },
    { t: 'Güvenli üçgenin arka sınırını latissimus dorsinin arka kenarı çizer.', d: false, n: 'Üçgeni latissimus dorsinin ön kenarı sınırlar. [[K5 s. 50]]' },
  ],
};
VERI.sorular['an01d-3'] = {
  no: 3, kok: 'Göğüs duvarının damar ve sinirleri', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 53–56]]',
  onermeler: [
    { t: 'İnterkostal sinir olukta arterin üzerinde bulunur.', d: false, n: 'Üstten alta sıra ven, arter ve sinirdir. [[K5 s. 53]]' },
    { t: 'İlk iki posterior interkostal arter doğrudan torasik aortadan çıkar.', d: false, n: 'Birinci ve ikinci aralığı kostoservikal trunkusun superior interkostal dalı besler. [[K5 s. 54]]' },
    { t: 'Birinci interkostal sinirin küçük interkostal dalı yalnız motor lif taşır.', d: true, n: 'Büyük dal C8’e katılırken küçük dal motor innervasyonu sağlar. [[K5 s. 55]]' },
    { t: 'T2’nin interkostobrakiyal dalı brakiyal pleksus bloğuyla bloke edilir.', d: false, n: 'Bu sinir brakiyal pleksusun dışında kaldığı için medial kolun duyusu korunur. [[K5 s. 56]]' },
    { t: 'T7–T11 karında eksternal ve internal oblik kaslar arasında seyreder.', d: false, n: 'Sinirler internal oblik ile transversus abdominis arasındaki düzlemi izler. [[K5 s. 54–55]]' },
  ],
};

SAYFALAR['dersler/anatomi/01d'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 1 · Ders 01d',
  baslik: 'Trakea, ana bronşlar, plevra ve göğüs duvarı',
  lede: 'Bir bronş tüpünün penceresi hangi ağızla hizalanır? Göğüs dreni ve interkostal blokta kaburganın hangi kenarı önem kazanır?',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an01d-trakea"><span>01</span>Trakea</button>
  <button type="button" data-scroll="an01d-brons"><span>02</span>Ana bronşlar</button>
  <button type="button" data-scroll="an01d-plevra"><span>03</span>Plevra</button>
  <button type="button" data-scroll="an01d-dren"><span>04</span>Göğüs tüpü</button>
  <button type="button" data-scroll="an01d-duvar"><span>05</span>Göğüs duvarı</button>
  <button type="button" data-scroll="an01d-damar"><span>06</span>Damarlar ve lenf</button>
  <button type="button" data-scroll="an01d-sinir"><span>07</span>Sinirler ve blok</button>
  <button type="button" data-scroll="an01d-p1"><span>08</span>Part I</button>
  <button type="button" data-scroll="an01d-p2"><span>09</span>Part II</button>
  <button type="button" data-scroll="an01d-ozet"><span>10</span>Özet</button>
</nav>
<section class="wrap blk ders-sec" id="an01d-trakea">
  <h2>Trakeanın düzeyi ve komşuları</h2>
  <p class="intro">Krikoid kıkırdağın alt kenarında C6’dan başlayan trakeanın sonlandığı düzey, vücudun konumuna ve solunuma göre değişir. [[K5 s. 42]]</p>
  <div class="viz"><div class="viz-head"><h3>Krikoidden bifurkasyona</h3></div><div data-viz="an01d_duzey"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="an01d-kartlar">
    <div class="card"><h3>Boyut ve duvar</h3>
      <p>Erişkinde yaklaşık 15 cm’lik trakeanın 5 cm’si suprasternal çentiğin üzerindedir. [[K5 s. 42]] Boyun tam ekstansiyona getirildiğinde çentik üzerinde kalan bölüm yaklaşık 8 cm’ye çıkar. [[K5 s. 42]] Çap vücut boyutuyla değişir ve kabaca kişinin işaret parmağının çapına karşılık gelir. [[K5 s. 42]]</p>
      <p>Lümeni açık tutan 16–20 C biçimli kıkırdağı uzunlamasına fibroelastik doku birleştirir, her halkanın arka açıklığını düz kas yapısındaki trakealis kapatır. [[K5 s. 42]]</p>
    </div>
    <div class="card"><h3>Boyunda ön yüz</h3>
      <p>Orta hattaki halkalar deri, yüzeyel fasya ve derin fasya üzerinden palpe edilir. [[K5 s. 43]] İkinci–dördüncü halkaların önünde tiroid istmusu, istmusun üst kenarında iki superior tiroid arterin birleşen dalları bulunur. [[K5 s. 43]]</p>
      <p>Aşağıda sternohiyoid ve sternotiroid kenarları trakeanın üzerine taşar. [[K5 s. 43]] İnferior tiroid venleri brakiyosefalik venlere inerken önden geçer, anterior juguler venlerin enine bağlantısı da buradadır. [[K5 s. 43]] Varsa tiroidea ima arteri aort arkından veya brakiyosefalik arterden yukarı çıkar. [[K5 s. 43]]</p>
    </div>
    <div class="card"><h3>Yan ve arka yüz</h3>
      <p>İki tiroid lobu trakeayı karotis kılıflarından ayırır. [[K5 s. 43]] Her kılıfta ortak karotis arteri, internal juguler ven ve vagus bulunur, sempatik zincir kılıfın arkasındadır. [[K5 s. 43–44]]</p>
      <p>Trakeanın arkasına özofagus dayanır, iki yandaki trakeoözofageal oluklarda rekürren laringeal sinirler uzanır. [[K5 s. 43]] C6 kesitinde tiroidi içeren pretrakeal fasya, sarıcı ve prevertebral fasyalar, sternokleidomastoid, omohiyoid ve eksternal juguler ven de ayırt edilir. [[K5 s. 44]]</p>
    </div>
    <div class="card"><h3>Kaf ile özofagusun ilişkisi</h3>
      <p>Kaf şişince kıkırdak desteği olmayan arka duvar özofagusun ön yüzüne bastırır. [[K5 s. 44]] Özellikle yüksek basınçlı trakeostomi kafı yutmayı güçleştirebilir, aşırı şişirilmiş kaf rijit özofagoskopide tıkanıklık izlenimi verebilir. [[K5 s. 44]]</p>
      <p>K5’in tarifinde, doğru konumdaki tüpün kafına hızla 5 mL hava verilince yüzeyel trakeadaki kabarıklık suprasternal çentiğin üzerinde iki parmakla hissedilebilir. [[K5 s. 44]] Trakeostomi tüpü duvarı aşındırırsa yakınındaki brakiyosefalik arterden ani, şiddetli kanama olabilir, karotis daha seyrek etkilenir. [[K5 s. 43]]</p>
    </div>
    <div class="card"><h3>Toraksta önden arkaya</h3>
      <p>Aort arkı, üst mediastende inen trakeayı hafifçe sağa iter. [[K5 s. 43–44]] Ön komşular yukarıdan aşağıya inferior tiroid venleri, sternotiroidlerin manubrium arkasındaki başlangıçları, timus kalıntıları, brakiyosefalik ve sol ortak karotis arterleri, ardından aort arkıdır. [[K5 s. 44]]</p>
      <p>İki arter trakea ile sol brakiyosefalik veni ayırır. [[K5 s. 44]] Arkada özofagus trakeaya boydan boya dayanır, sol rekürren laringeal sinir sol oluktadır. [[K5 s. 44]]</p>
    </div>
    <div class="card"><h3>Toraksta sağ ve sol</h3>
      <p>Sağda mediastinal plevra trakeaya dayanır, araya yalnız azigos veni ve sağ vagus girer. [[K5 s. 44]] Solda araya sol ortak karotis, sol subklavyen arter, aort arkı ve sol vagus girer. [[K5 s. 44]]</p>
      <p>Büyük arterlerin arkustan boyun köküne doğru birbirinden ayrılıp kısmen spiral çizmesi komşulukları düzeye göre değiştirir. [[K5 s. 44]] T4 kesitinde ikinci kosta kıkırdağı, internal torasik damarlar, timus, vena kava superior, iki frenik sinir ve torasik kanal da seçilir. [[K5 s. 45]]</p>
    </div>
    <div class="card"><h3>Bebekte trakeotomi alanı</h3>
      <p>Brakiyosefalik arter erişkine göre yüksek seyreder ve suprasternal çentiğin arkasında trakeayı çaprazlar. [[K5 s. 45]] Sol brakiyosefalik ven boyna uzanıp servikal trakeanın önüne geçebilir ve asfikside kanla dolup gerilebilir. [[K5 s. 45]] İki yaşına kadar büyük olan timus, servikal trakeanın alt bölümünü önden örter. [[K5 s. 45]]</p>
    </div>
    <div class="card"><h3>Damar, lenf ve sinir</h3>
      <p>Arteriyel kan inferior tiroid arterlerinden gelir ve venöz kan inferior tiroid venleriyle uzaklaşır. [[K5 s. 46]] Lenf derin servikal, pretrakeal ve paratrakeal düğümlere gider. [[K5 s. 46]] Büyük trakeobronşiyal düğümler trakeanın yanlarında ve bronşlar arasındaki açıdadır. [[K5 s. 44]]</p>
      <p>Trakeanın komşuluklarını gösteren görünümde torasik kanal ve özofagusla birlikte perikardın sınırı ve diyaframın sağ krusu da işaretlenir. [[K5 s. 46]] Vagal innervasyon rekürren laringeal daldan, sempatik innervasyon orta servikal gangliondan gelir. [[K5 s. 46]]</p>
    </div>
  </div>
  <details class="note plain"><summary>Üç görünümü birleştirin</summary>
    <p><b>Boyun ekstansiyonuyla tam inspirasyonun etkisini aynı anatomik işaretle mi değerlendirirsiniz?</b></p>
    <p>Boyun ekstansiyonunda suprasternal çentiği referans alın. Çentiğin üzerinde kalan trakea bölümü yaklaşık 5 cm’den 8 cm’ye uzar. [[K5 s. 42]] İnspirasyonun etkisini tarif ederken ise trakeanın alt ucunu vertebralara göre konumlandırın. [[K5 s. 42]]</p>
    <p>Sırtüstü kadavrada manubriosternal bileşkeye karşılık gelen bifurkasyon, canlıda dik çekilmiş oblik grafide daha aşağıda görülebilir. [[K5 s. 42]] Bu nedenle krikoid alt kenarı, suprasternal çentik ve karina için önce hangi koşulda ve hangi yapıya göre düzey bildirdiğinizi söyleyin. [[K5 s. 42]]</p>
  </details>
</section>
<section class="wrap blk ders-sec" id="an01d-brons">
  <h2>Karinadan üst lob ağzına</h2>
  <p class="intro">Sağ üst lob bronşunun erken ayrılması, sağ taraflı çift lümenli tüpün biçimini belirler. [[K5 s. 46–47]]</p>
  <div class="viz"><div class="viz-head"><h3>Önden bakışla sağ ve sol ana bronş</h3></div><div data-viz="an01d_brons"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="an01d-kartlar">
    <div class="card"><h3>Bronkoskopide karina</h3>
      <p>Bifurkasyonun içindeki omurga biçimli kıkırdak bronkoskopide keskin, sagittal bir sırt oluşturur. [[K5 s. 42]] Kenarın düzleşmesi genellikle hiler lenf düğümlerinin büyüdüğünü veya fibrozis, tümör ya da başka bir patolojinin akciğer anatomisini belirgin biçimde bozduğunu düşündürür. [[K5 s. 42–43]]</p>
    </div>
    <div class="card"><h3>Sağ ana bronş</h3>
      <p>Daha büyük akciğere hava taşıyan sağ ana bronş daha geniştir, düşeyle 25° yapar ve ilk 2,5 cm’de üst lob dalını verir. [[K5 s. 46]] Yabancı cisim ve aspirasyon kateteri bu nedenle sağ bronşa daha kolay girer. [[K5 s. 46–47]]</p>
      <p>Azigos veni bronşun üzerinden kavis çizer, sağ pulmoner arter ise önce alttan geçip sonra öne döner. [[K5 s. 47]]</p>
    </div>
    <div class="card"><h3>Sol ana bronş</h3>
      <p>Hilusa ulaşmak için aort arkının arkasından yana yönelen sol bronş düşeyle 45° yapar ve 5 cm uzanır. [[K5 s. 46–47]] Arkusun altından, özofagusun, torasik kanalın ve inen aortun önünden geçer. [[K5 s. 47]] Sol pulmoner arter önce bronşun üstünde, sonra önündedir. [[K5 s. 47]]</p>
    </div>
    <div class="card"><h3>Lob ağızları ve tüp seçimi</h3>
      <p>Önden görünümde sağ üst, orta ve alt lob bronşları, solda apikoposterior, anterior ve lingüler dallar ayırt edilir. [[K5 s. 43]] Alt lob dallanmasında apikal, anterior, lateral ve posterior bazal dallar ile sağ medial bazal (kardiyak) dal gösterilir. [[K5 s. 43]]</p>
      <p>Sağ üst lob ağzı karinaya çok yakın ayrıldığından sağ bronşa konan tüp bu ağzı tıkayabilir. [[K5 s. 47]] Sağ çift lümenli tüpün distal kaf bölgesindeki yan pencere üst lob ağzına hizalanır. [[K5 s. 47]] Solda karina ile üst lob ağzı arasındaki 5 cm kaflı uca yer bırakır, özel pencere gerekmez. [[K5 s. 47]] Yerleşim rutin olarak fiberoptik bronkoskopiyle kontrol edilir. [[K5 s. 47]]</p>
    </div>
  </div>
  <aside class="note plain"><b>Atlas notu.</b> K5 çevirisi sağ bronşa konan tüpün alt lobu tıkama riskinden söz eder. [[K5 s. 47]] Doğrusu, sağ ana bronştaki tüpün tıkama riski taşıdığı ağız sağ üst lob bronşudur; yan pencere bu yüzden vardır.</aside>
  <details class="note plain"><summary>Fiberoptik görünümü yorumlayın</summary>
    <p><b>Sağ ana bronşa girildiğini görmek, sağ tüpün doğru yerleştiğini söylemek için neden yetersizdir?</b></p>
    <p>Karinadan sonra sağ üst lob ağzına kadar yalnızca 2,5 cm vardır. [[K5 s. 46]] Bu kısa alanda iki açıklığın ilişkisini tarif etmek gerekir. Sağ tüpün yan deliği sağ üst lob ağzına bakmalı, alt loba giden yol da açık kalmalıdır. [[K5 s. 47]]</p>
    <p>Sol tüpte aynı yan deliği aramanız gerekmez. [[K5 s. 47]] Solda karina ile üst lob ağzı arasındaki 5 cm tüpün kaflı ucunu barındırır. [[K5 s. 47]] İki tarafta da tüpün yerleşimini değerlendirirken K5’in tarif ettiği kontrol fiberoptik bronkoskopidir. [[K5 s. 47]]</p>
  </details>
</section>
<section class="wrap blk ders-sec" id="an01d-plevra">
  <h2>Plevra yaprakları ve yüzey izdüşümü</h2>
  <p class="intro">Akciğer ile plevra kesesinin alt sınırları sakin solunumda örtüşmez, aralarında zorlu inspirasyonda kullanılabilen bir reses kalır. [[K5 s. 49]]</p>
  <div class="viz"><div class="viz-head"><h3>Alt sınırın üç yüzey işareti</h3></div><div data-viz="an01d_yansima"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="an01d-kartlar">
    <div class="card"><h3>Hilusta yaprak değişimi</h3>
      <p>Gelişim sırasında akciğer sölom boşluğunu içe doğru çökertince seröz yüzeyli çift duvarlı bir kese oluşur. [[K5 s. 48]] Visseral yaprak akciğer yüzeyini ve fissürleri, pariyetal yaprak diyaframı, göğüs duvarını, toraks apeksini ve mediasteni örter. [[K5 s. 48]]</p>
      <p>Yapraklar invajinasyon yerinde, akciğer kökünde birleşir ve hilustan aşağı sarkan kıvrımları pulmoner bağı oluşturur. [[K5 s. 48]] Aralarındaki potansiyel boşluğu ince bir seröz sıvı filmi nemlendirir. [[K5 s. 48]]</p>
    </div>
    <div class="card"><h3>Cerrahi ayrılma düzlemi</h3>
      <p>Visseral plevrayı sıyırmak sıkıca tutunduğu akciğer parankimini yırtar. [[K5 s. 48]] Gevşek bağ dokusundan oluşan ince ekstraplevral fasya ise pariyetal plevranın göğüs duvarından kolayca ve kanamasız ayrılmasını sağlar. [[K5 s. 48]]</p>
    </div>
    <div class="card"><h3>Kubbeden sternuma</h3>
      <p>Plevra tepesi klavikulanın medial üçte birinden yaklaşık 4 cm yukarı çıkar. [[K5 s. 48]] Ön kenar sternoklaviküler eklemin arkasından iner ve ikinci kosta kıkırdağı düzeyinde, Louis açısında sternum arkasında karşı kenarla buluşur. [[K5 s. 48]]</p>
      <p>Solda kenar dördüncü kosta kıkırdağında akciğerin kardiyak çentiğine uyarak sternumun lateral kenarına yönelir, buradan altıncı kıkırdağa iner. [[K5 s. 48]] Sağ kenar düz inerek sağ kostoksifoid açıyı biraz aşar. [[K5 s. 49]]</p>
    </div>
    <div class="card"><h3>Kostodiyafragmatik reses</h3>
      <p>Pariyetal plevra diyaframın tutunma çizgisine ulaşmaz, en alt kosta kıkırdaklarına ve aralıklara diyafram kası doğrudan dayanır. [[K5 s. 49]] Sakin solunumda akciğer tabanı kesenin dibini doldurmaz, birbirine değen kostal ve diyafragmatik plevra arasında yarık biçimli reses kalır. [[K5 s. 49]]</p>
      <p>Yüzey izdüşümünü okurken plevra çizgisini akciğerin lob ve fissür çizgilerinden ayırın. [[K5 s. 48–49]] Önden sağda üst, orta ve alt loblar ile horizontal ve oblik fissürler, solda üst ve alt lob ile oblik fissür gösterilir. [[K5 s. 48]] Arkadan üst ve alt lobların arasındaki oblik fissür ile aşağıdaki plevra sınırı izlenir. [[K5 s. 49]] Zorlu inspirasyonda akciğer resese genişler. [[K5 s. 49]] On ikinci kaburganın yatağından veya altından böbreğe ya da böbreküstü bezine ulaşırken reses istemeden açılabilir. [[K5 s. 49]]</p>
    </div>
  </div>
  <details class="note plain"><summary>Yüzey işaretinden resese</summary>
    <p><b>Böbreğe on ikinci kaburganın yatağından yaklaşırken, sakin solunumda akciğerin doldurmadığı hangi alan açılabilir?</b></p>
    <p>Arkada T12 spinöz çıkıntısını bulun ve plevra alt kenarını kostovertebral açıya doğru izleyin. [[K5 s. 49]] Kenar burada kostal sınırın biraz aşağısına uzanır. [[K5 s. 49]] Kostal ve diyafragmatik plevranın karşılaştığı bu bölüm, sakin solunumda akciğer tarafından tümüyle doldurulmaz. [[K5 s. 49]]</p>
    <p>Dolayısıyla cerrahi alanla komşu olan yapı kostodiyafragmatik resestir. [[K5 s. 49]] Aynı sınırı yandan tarif etmeniz istenirse referansı değiştirin. Midaksiller hatta en alçak nokta onuncu kaburga düzeyindedir. [[K5 s. 49]]</p>
  </details>
</section>
<section class="wrap blk ders-sec" id="an01d-dren">
  <h2>Göğüs tüpünün giriş alanı</h2>
  <p class="intro">Plevra boşluğundaki hava veya kan gibi sıvıları boşaltmak için göğüs tüpü gerekebilir. [[K5 s. 49]]</p>
  <div class="viz"><div class="viz-head"><h3>Güvenli üçgenin sınırları</h3></div><div data-viz="an01d_ucgen"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="an01d-kartlar">
    <div class="card"><h3>Sıvı ve diyafram</h3>
      <p>K5, sıvı drenajında lokülasyonları ve plevral kalınlaşmayı belirlemek için Britanya Toraks Derneğinin ultrason kılavuzluğu önerisini aktarır. [[K5 s. 49]] Gerçek zamanlı görüntüleme solunumla hareket eden diyaframı ayırt ettirerek güvenliği artırır, uç koşullarda uygulanamayabilir. [[K5 s. 49–50]]</p>
    </div>
    <div class="card"><h3>Konum ve giriş</h3>
      <p>Aynı taraftaki el baş arkasına alındığında latissimus dorsinin ön kenarıyla pektoralis majörün lateral kenarı arasındaki alan açılır. [[K5 s. 50]] Tepesi aksillanın altında olan üçgenin tabanı beşinci interkostal aralıktan geçen yatay çizgidir. [[K5 s. 50]]</p>
      <p>K5’in çiziminde midaksiller hat ve meme başı düzeyi de gösterilir. [[K5 s. 50]] Yer belirlendikten sonra gerekirse cilt altına epinefrinli lidokain (en çok 3 mg/kg) infiltre edilip küçük bir deri kesisi yapılır. [[K5 s. 50]]</p>
    </div>
    <div class="card"><h3>Küçük ve orta çap</h3>
      <p>8–14 F tüpte künt diseksiyon gerekmeyebilir. [[K5 s. 51]] İğne ve enjektörle hava veya sıvı saptanınca iğneden tel geçirilir, trakt dilatörle genişletilir ve tüp görüntüleme eşliğinde ilerletilebilir. [[K5 s. 51]] 16–24 F tüpte Seldinger tekniği veya künt diseksiyon kullanılabilir. [[K5 s. 51]]</p>
    </div>
    <div class="card"><h3>Büyük çap</h3>
      <p>Kesi ve Spencer Wells ya da benzeri pensle künt diseksiyon, üstteki kaburganın altındaki damar ve siniri korumak için alttaki kaburganın üst kenarından yapılır. [[K5 s. 51]]</p>
      <p>Parmakla yerel yapışıklık aranabilir ve akciğer giriş yerinden uzaklaştırılabilir. [[K5 s. 50–51]] Tüp büyük pensle tutularak plevra boşluğuna geçirilir, setteki sivri trokar kullanılmaz. [[K5 s. 51]] K5 tüm göğüs tüpleri ve intraplevral kateterlerin konumunun işlem sonrası akciğer grafisiyle doğrulanmasını belirtir. [[K5 s. 51]]</p>
    </div>
  </div>
  <details class="note plain"><summary>İki ayrı konum sorusu</summary>
    <p><b>Plevral sıvı için giriş yeri seçimiyle tüpün son konumunu doğrulamak arasında nasıl bir ayrım yaparsınız?</b></p>
    <p>Girişten önce ultrason sıvının bölmelere ayrıldığı yerleri ve plevra kalınlaşmasını gösterir. [[K5 s. 49]] Gerçek zamanlı izlemenin ek yararı, solunum boyunca diyaframı seçebilmektir. [[K5 s. 49]] Yan göğüs duvarında güvenli üçgeni sınırlandırmak için iki kas kenarını ve beşinci interkostal aralığı kullanın. [[K5 s. 50]]</p>
    <p>Tüpün hangi teknikle ilerletildiğini çapıyla birlikte belirtin. [[K5 s. 51]] Küçük çapta tel ve dilatör kullanılabilirken büyük çapta künt diseksiyon gerekir. [[K5 s. 51]] Son konumu değerlendirme adımı tüm intraplevral kateterler için akciğer grafisidir. [[K5 s. 51]]</p>
  </details>
</section>
<section class="wrap blk ders-sec" id="an01d-duvar">
  <h2>İnterkostal aralığın katmanları ve damarları</h2>
  <p class="intro">İnterkostal aralığı örten ince, güçlü kas ve aponevrozların arasından sinirler, damarlar ve lenfatikler geçer. [[K5 s. 51]]</p>
  <div class="viz"><div class="viz-head"><h3>Üst kaburganın altındaki korunaklı düzlem</h3></div><div data-viz="an01d_aralik"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="an01d-kartlar">
    <div class="card"><h3>Dış ve orta katman</h3>
      <p>Göğüs duvarının üç kas katmanı karın yan duvarının katmanlarına karşılık gelir. [[K5 s. 52]] Eksternal interkostal lifler üst kaburganın alt kenarından alttakinin üst kenarına aşağı ve öne uzanır. [[K5 s. 52]] Arkada tüberkülden önde kostokondral bileşke yakınına kadar kastır, oradan sternum yanına kadar anterior interkostal membran olarak sürer. [[K5 s. 52]]</p>
      <p>İnternal interkostaller sternumdan, alt aralıklarda kıkırdakların ön ucundan başlar. [[K5 s. 52]] Aşağı ve arkaya yönelen lifler kaburga açısına ulaşır, daha arkada yerlerini posterior interkostal membran alır. [[K5 s. 52]]</p>
    </div>
    <div class="card"><h3>Kesintili en iç katman</h3>
      <p>Önde transversus torasis (sternokostalis) alt sternumun yanından 2.–6. kosta kıkırdaklarına yelpaze gibi yayılır. [[K5 s. 53]] Yanda en iç interkostaller (interkostales intimi) nörovasküler demetin geçtiği yer dışında internal interkostallerle birleşir. [[K5 s. 53]]</p>
      <p>Arkada alt kaburga açıları yakınındaki subkostal demetler internal interkostallerle aynı yönde iki ya da üç aralığı aşar. [[K5 s. 53]] Demetleri bağlayan membranöz doku üstte supraplevral membranla (Sibson fasyası) devam eder. [[K5 s. 53]]</p>
    </div>
    <div class="card"><h3>Fasya ve demetin düzlemi</h3>
      <p>Karındaki transversalis fasyasının karşılığı olan gevşek endotorasik fasya, kas ile pariyetal plevra arasında cerrahi sıyırma düzlemidir. [[K5 s. 53]] Demet arkada posterior interkostal membranla plevra arasındadır, kaburga açısında internal ve en iç interkostal arasına girer. [[K5 s. 53]] Üst kaburganın oluğunda yukarıdan aşağıya posterior interkostal ven, posterior interkostal arter ve interkostal sinir sıralanır. [[K5 s. 53]]</p>
    </div>
    <div class="card"><h3>Solunumda kaburga hareketi</h3>
      <p>İnterkostal paralizi sakin solunumda kaburga hareketini küçültür. [[K5 s. 53]] Kasların kesin rolü hayvan deneyleri, modeller ve geometriyle tartışılmış, elektromiyografiyle aydınlatılmıştır. [[K5 s. 53]] İnspirasyonda interkostaller kasılır, solunum eforu arttıkça elektriksel etkinlikleri artar. [[K5 s. 53]] Kaburgaların yükselip dışa dönmesi toraksın hem ön-arka hem yan çapını büyütür. [[K5 s. 53]]</p>
      <p>Zorlu ekspirasyonda alt interkostaller kasılır, karın kaslarının sabitlediği alt kaburgaları muhtemelen aşağı çekerek hacmi azaltır ve aralıkları rijit tutar. [[K5 s. 53]] Ankilozan spondilitteki gibi göğüs duvarı sabitlenmesi maksimum solunum kapasitesini yaklaşık %20–30 azaltır. [[K5 s. 53]]</p>
    </div>
  </div>
  <details class="note plain"><summary>Kaburga açısında düzlem değişimi</summary>
    <p><b>Bir interkostal siniri arkadan yana izlediğinizde, sinirle pariyetal plevra arasında hangi kas tabakası belirir?</b></p>
    <p>Arkada demeti posterior interkostal membran ile plevra arasında arayın. [[K5 s. 53]] Kaburga açısına geldiğinizde demet internal interkostal kas ile en iç kas arasına girer. [[K5 s. 53]] Böylece yanda sinirin derininde en iç interkostal tabaka yer alır. [[K5 s. 53]]</p>
    <p>Bu değişikliği gösterirken sinirin oluk içindeki yüksekliğini değiştirmeyin. Üst kaburganın alt kenarındaki olukta ven en üstte, arter ortada ve sinir en alttadır. [[K5 s. 53]] Pariyetal plevrayı göğüs duvarından ayıran cerrahi düzlem ise kasların derinindeki gevşek bağ dokusudur. [[K5 s. 53]]</p>
  </details>
</section>
<section class="wrap blk ders-sec" id="an01d-damar">
  <h2>Bir interkostal aralığa kan nereden gelir?</h2>
  <p class="intro">Üst dokuz aralıkta arkadan gelen arter ile kollaterali, önden gelen iki arterle birleşir. [[K5 s. 54]]</p>
  <div class="viz"><div class="viz-head"><h3>Aralığı seçip iki kaynağı izleyin</h3></div><div data-viz="an01d_damar"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="an01d-kartlar">
    <div class="card"><h3>Posterior arterler</h3>
      <p>3.–11. aralık arterleri doğrudan torasik aortadan, ilk ikisi kostoservikal trunkusun superior interkostal arterinden çıkar. [[K5 s. 54]] Superior interkostal arter Sibson fasyası üzerinden kavisle birinci kaburga boynunun önüne gelir, burada medialinde sempatik trunkus, lateralinde T1 kökü vardır. [[K5 s. 54]]</p>
      <p>Her posterior arter bir kollateral dal verir, üst dokuz aralıkta bunlar iki anterior interkostal arterle anastomoz yapar. [[K5 s. 54]]</p>
    </div>
    <div class="card"><h3>Posterior venler</h3>
      <p>Venöz dönüş değişkenlik gösterir. [[K5 s. 54]] İki yanda ilk ven vertebral veya brakiyosefalik vene gider. [[K5 s. 54]] İkinci, üçüncü ve bazen dördüncü ven birleşerek superior interkostal veni yapar. [[K5 s. 54]]</p>
      <p>Bu ven sağda azigosa açılır, solda aort arkının üzerinden frenik ve vagus sinirleri arasından geçip sol brakiyosefalik vene dökülür. [[K5 s. 54]] Alt sekiz ven sağda azigosa, solda dörderli gruplarla superior ve inferior hemiazigosa gider. [[K5 s. 54]]</p>
    </div>
    <div class="card"><h3>İnternal torasik damarlar</h3>
      <p>Arter subklavyenin ilk parçasından çıkar, sternumun bir parmak lateralinde üst altı kosta kıkırdağının arkasından iner ve superior epigastrik ile müskülofrenik arterlere ayrılır. [[K5 s. 54]] Başta doğrudan plevraya dayanır, üçüncü kosta kıkırdağından sonlanana kadar transversus torasisin önünde korunur. [[K5 s. 54]]</p>
      <p>Her aralığı delen dalları pektoralis majörü, deriyi ve kadında memeyi besler, en büyük meme dalları 2.–4. dallardır. [[K5 s. 54]] Diğer dallar mediasten ve perikarda gider, perikardiyakofrenik arter frenik sinire eşlik eder. [[K5 s. 54]]</p>
    </div>
    <div class="card"><h3>Ön anastomozlar ve lenf</h3>
      <p>Her birinde iki anterior interkostal arter bulunan ilk altı aralığı internal torasik arter, 7.–9. aralıkları müskülofrenik dalı besler. [[K5 s. 54]] İnternal torasik ven artere eşlik ederek aynı tarafın brakiyosefalik venine dökülür. [[K5 s. 54]]</p>
      <p>İnternal torasik damarların yanındaki düğümler memenin lenfini alır ve torasik kanala veya mediastinal lenf trunkusuna iletir. [[K5 s. 54]]</p>
    </div>
  </div>
  <details class="note plain"><summary>Aynı aralıkta iki farklı kaynak</summary>
    <p><b>Sekizinci interkostal aralıkta önden ve arkadan gelen damarları kökenlerine kadar izleyin. Aynı yanıt ikinci aralık için de geçerli midir?</b></p>
    <p>Sekizinci aralıkta iki anterior interkostal arter müskülofrenik daldan gelir. [[K5 s. 54]] Arka tarafta ise torasik aortadan çıkan posterior interkostal arter ve onun kollateral dalı vardır. [[K5 s. 54]] Bu iki çift üst dokuz aralıktaki anastomoz düzenine uyar. [[K5 s. 54]]</p>
    <p>İkinci aralıkta düzen korunur, iki uçtaki kaynak değişir. [[K5 s. 54]] Öndeki çift doğrudan internal torasik arterden gelir. [[K5 s. 54]] Arkadaki arterin kökenini tarif ederken kostoservikal trunkusu ve onun superior interkostal dalını belirtin. [[K5 s. 54]]</p>
  </details>
</section>
<section class="wrap blk ders-sec" id="an01d-sinir">
  <h2>Göğüs duvarının sinirlerini blok anatomisiyle okumak</h2>
  <p class="intro">İnterkostal sinirler T1–T11’in anterior primer ramuslarıdır ve her biri kendi aralığının nörovasküler demetinde ilerler. [[K5 s. 54]]</p>
  <div class="viz"><div class="viz-head"><h3>İnterkostal blokta kemik, demet ve iğne ucu</h3></div><div data-viz="an01d_blok"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="an01d-kartlar">
    <div class="card"><h3>Segmental dağılım</h3>
      <p>İnterkostal sinirler gövdenin ve üst kol medial yüzünün segmental duyusunu, interkostal ve ön karın duvarı kaslarının motor innervasyonunu sağlar. [[K5 s. 55]] Alt beş sinir (T7–T11) karında internal oblik ile transversus abdominis arasında, ikinci ve üçüncü kas katmanları arasındaki düzlemi korur. [[K5 s. 54–55]]</p>
      <p>Sekizinci ve dokuzuncu kosta kıkırdaklarını içeren kesitte sekizinci sinirin seyri izlenebilir. [[K5 s. 52]] Bu kesitte anterior ve posterior primer ramuslar, lateral ve anterior kutanöz dallar, rektus ve kılıfı ile periton ayırt edilir. [[K5 s. 52]] Aynı kesitin kasları arasında serratus anterior, latissimus dorsi, erektör spina, trapez ve eksternal oblik bulunur. [[K5 s. 52]]</p>
    </div>
    <div class="card"><h3>T1 ve T2’nin özel dalları</h3>
      <p>T1’in büyük dalı birinci kaburga boynunu çaprazlar ve C8 ile birleşip brakiyal pleksusun alt trunkusuna katılır. [[K5 s. 55]] Bu dal nedeniyle T1 torasik ramusların en büyüğüdür, küçük interkostal dalı ise bütünüyle motordur. [[K5 s. 55]]</p>
      <p>T2’nin lateral kutanöz dalı interkostobrakiyal sinir olarak aksilla tavanını aşar, üst kolun medial derisine dirseğe kadar duyu verir. [[K5 s. 56]] Pleksusa katılmadığı için brakiyal pleksus bloğundan etkilenmez. [[K5 s. 56]] Uyanık hastada üst kol turnikesi için aksillada medial kol kenarı boyunca cilt altı lokal anestezi gerekir. [[K5 s. 56]]</p>
    </div>
    <div class="card"><h3>Diğer interkostal sinirlerin dalları</h3>
      <p>Motor kollateral dal kaburga açısında ayrılıp bir kasta sonlanır ya da ana sinire bir halka ile döner. [[K5 s. 55]] Lateral kutanöz dal midaksiller hatta yüzeye yönelip ön ve arka dala ayrılır. [[K5 s. 55]]</p>
      <p>Anterior kutanöz dallar üst altı aralıkta internal torasik damarların önünden yüzeye geçip deriyi innerve eder. [[K5 s. 55]] Alt beş sinirin dalları ön karın duvarına ulaşmak için rektus abdominisi deler. [[K5 s. 55]] Deri ve yüzeyel fasya kaldırıldığında T10, T11 ve T12 düzeylerindeki terminal dallar izlenebilir. [[K5 s. 55]] Karın duvarındaki yüzeyel görünümde subkostal ve iliohipogastrik lateral dallar, ilioinguinal sinir, ön rektus kılıfı ve spermatik kordon da gösterilir. [[K5 s. 55]]</p>
    </div>
    <div class="card"><h3>Blokta uygulama ve doz</h3>
      <p>K5, interkostal bloğu toraks veya üst karın cerrahisi sonrası ağrıda, kaburga kırıklarında ve postherpetik nevralji gibi kronik ağrılarda tarif eder. [[K5 s. 56]]</p>
      <p>Hedef kaburga açısına yakındır, hasta oturabilir, yan veya yüzüstü yatabilir. [[K5 s. 56]] Cilt altı infiltrasyonunu alt kenarın palpasyonu, derinin hafifçe sefalade kaydırılması ve kısa iğneyle kemik teması izler. [[K5 s. 56]]</p>
      <p>Alt kenardan sıyrılan iğne hafif sefalade 3–5 mm ilerletilir, dikkatli aspirasyonun ardından 3–5 mL lokal anestezik verilir. [[K5 s. 56]] Birden çok enjeksiyon gerekebildiğinden ve bölgeden dolaşıma emilim hızlı olduğundan toplam doz gözetilir. [[K5 s. 56]]</p>
    </div>
  </div>
  <nav class="ders-gec" aria-label="Sinir Bloğu Atlası">
    <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=serratus">Serratus anterior plan bloğu ↗</a>
    <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=pecs">PECS II bloğu ↗</a>
    <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=paravertebral">Torasik paravertebral blok ↗</a>
  </nav>
  <details class="note plain"><summary>Pleksus bloğundan sonra korunan duyu</summary>
    <p><b>Brakiyal pleksus bloğu uygulanmış uyanık bir hastada üst kolun medialindeki turnike ağrısını hangi dal açıklar?</b></p>
    <p>T1 ile T2’yi ayırarak başlayın. T1’den ayrılan büyük dal birinci kaburganın boynunu geçip C8 ile alt trunkusu oluşturur. [[K5 s. 55]] T2’nin lateral kutanöz dalı ise aksillanın tavanı üzerinden medial kola geçer ve dirseğe kadar derinin duyusunu taşır. [[K5 s. 56]]</p>
    <p>Bu ikinci dal interkostobrakiyal sinirdir ve brakiyal pleksusun parçası olmadığı için pleksus bloğundan etkilenmez. [[K5 s. 56]] K5’in turnike analjezisi için tarif ettiği ek uygulamanın yeri aksillada üst kolun medial kenarı boyunca cilt altıdır. [[K5 s. 56]]</p>
  </details>
</section>
<section class="wrap blk ders-sec" id="an01d-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="an01d-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an01d-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an01d-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an01d-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir hastada plevral sıvı için göğüs dreni planlanıyor. Yan göğüs duvarında giriş alanını gösterin. Hangi kenardan ilerlersiniz, hangi yapıları korursunuz?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Pektoralis majörün lateral ve latissimus dorsinin ön kenarını bulun, tabanı beşinci aralığa, tepeyi aksillanın altına yerleştirin. [[K5 s. 50]]</li>
    <li>Sıvı drenajında ultrasonla lokülasyonları, plevral kalınlaşmayı ve solunum sırasında diyaframı değerlendirin. [[K5 s. 49]]</li>
    <li>Üst kaburganın alt oluğunda ven, arter ve sinir sıralandığından büyük dren için alt kaburganın üst kenarından künt diseksiyon yapılır. [[K5 s. 51–53]]</li>
    <li>Parmakla akciğer yapışıklığı kontrol edilebilir, tüpün konumu işlemden sonra akciğer grafisiyle doğrulanır. [[K5 s. 51]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> İki kaburgayı ve üç kas katmanını çizin. Üst kaburganın oluğunda ven, arter ve siniri sıralayıp dren girişini alttaki kaburganın üst kenarında gösterin. [[K5 s. 51–53]]</div>
  <div class="note plain"><b>Ek sorular</b><p>Midaksiller hatta plevranın en alt noktası hangi düzeydedir? Sağ çift lümenli tüpün yan penceresi neden gerekir? Brakiyal pleksus bloğundan sonra üst kol turnikesi neden ağrıyabilir?</p></div></div>
</section>
<section class="wrap blk ders-sec" id="an01d-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Trakea C6’dan başlar, bifurkasyon korunmuş kadavrada T4’teyken canlıda ayakta tam inspirasyonda T6’ya inebilir. [[K5 s. 42]]</li>
    <li>Sağ ana bronş daha dik, geniş ve kısadır, sağ üst lob ağzı çift lümenli tüpün penceresiyle hizalanır. [[K5 s. 46–47]]</li>
    <li>Plevranın alt kenarı midklaviküler hatta 8. kaburga, midaksiller hatta 10. kaburga ve arkada T12 spinöz çıkıntısı düzeyindedir. [[K5 s. 49]]</li>
    <li>Dren girişinde kaburganın üst kenarı seçilirken interkostal blokta üstteki kaburganın altındaki sinir hedeflenir. [[K5 s. 51]] [[K5 s. 56]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="01d"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/01c">← Larinks</a><a href="#/dersler/anatomi/01e">Sonraki: Mediasten ve akciğerler →</a></nav>
</section>`,
};
