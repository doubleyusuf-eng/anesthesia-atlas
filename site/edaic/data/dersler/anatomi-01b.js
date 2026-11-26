VERI.sorular = VERI.sorular || {};
VERI.sorular['an01b-1'] = {
  no: 1, kok: 'Farinksin bölümleri ve tonsiller', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 15–18]]',
  onermeler: [
    { t: 'Nazofarinks yumuşak damağın altında yer alır.', d: false, n: 'Yumuşak damağın üstünde, burun boşluğunun arkasındadır. [[K5 s. 15]]' },
    { t: 'Rosenmüller fossası tubal kabarıklığın arkasındadır.', d: true, n: 'Tüp ağzından arkaya doğru önce kıkırdağın kabarıklığı, sonra farengeal reses görülür. [[K5 s. 16]]' },
    { t: 'Palatin tonsilin başlıca arteri üst kutuptan girer.', d: false, n: 'Fasiyal arterin tonsiller dalı iki eşlikçi venle alt kutba ulaşır. [[K5 s. 17]]' },
    { t: 'Paratonsiller ven kapsülün dış yüzünde seyreder.', d: true, n: 'Yumuşak damaktan bu yüz boyunca inen ven tonsillektomiden sonra kanayabilir. [[K5 s. 18]]' },
    { t: 'Adenoidin belirgin bir fibröz kapsülü vardır.', d: false, n: 'Adenoid belirgin bir kapsül olmaksızın üst konstriktöre dayanır. [[K5 s. 16]]' },
  ],
};
VERI.sorular['an01b-2'] = {
  no: 2, kok: 'Laringofarinks ve farinks duvarı', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 18–20]]',
  onermeler: [
    { t: 'Laringofarinks krikoidin alt kenarında sonlanır.', d: true, n: 'Bu kenar C6 düzeyinde özofagusa geçişi işaretler. [[K5 s. 15]] [[K5 s. 18]]' },
    { t: 'Piriform fossanın submukozasında üst laringeal sinirin eksternal dalı bulunur.', d: false, n: 'Fossa mukozasının derininde internal dal seyreder. [[K5 s. 18]]' },
    { t: 'Krikofaringeusun lifleri enine uzanır.', d: true, n: 'Alt konstriktörün krikoidden başlayan bu bölümü sfinkter işlevi görür. [[K5 s. 20]]' },
    { t: 'Killian açıklığı üst ve orta konstriktör arasındadır.', d: false, n: 'Kese alt konstriktörün iki bölümünün birleştiği zayıf noktadan çıkar. [[K5 s. 20]]' },
    { t: 'Alt konstriktör rekürren laringeal sinirden ince dallar alır.', d: true, n: 'Pleksusa ek olarak ince dallar rekürren laringeal sinirden ve üst laringeal sinirin eksternal dalından gelir. [[K5 s. 20]]' },
  ],
};
VERI.sorular['an01b-3'] = {
  no: 3, kok: 'Yutma sırasında hava ve besin yolları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 21–23]]',
  onermeler: [
    { t: 'Epiglot ana bolus geçmeden önce larinks girişini kapak gibi örter.', d: false, n: 'Epiglot bolusu iki yana yönlendirir, kapak hareketi ana bolusun ardından gelir. [[K5 s. 22]]' },
    { t: 'Tensor veli palatini yutarken Östaki tüpünün ağzını açar.', d: true, n: 'Tüp açıldığında timpan zarının iki tarafındaki basınç eşitlenir. [[K5 s. 21]]' },
    { t: 'Larinks yükselmiş ve girişi kapanmışken solunum refleks olarak baskılanır.', d: true, n: 'Bu solunum duraklaması bolusun farinksten geçtiği evreye eşlik eder. [[K5 s. 22]]' },
    { t: 'Kardiya peristaltik dalga ulaşmadan hemen önce gevşer.', d: true, n: 'Özofagustaki dalga katı bolusu taşırken kardiya yaklaşan dalganın önünde açılır. [[K5 s. 22]]' },
    { t: 'Laringeal maske kafı larinks ağzı üzerinde sızdırmazlık sağlar.', d: true, n: 'Maske ağızdan larinks açıklığına ilerler ve kafı burada şişirilir. [[K5 s. 23–24]]' },
  ],
};

(() => {
  const nav = [['bolgeler','Bölgeler'],['tonsil','Palatin tonsil'],['piriform','Piriform fossa'],['duvar','Duvar ve kaslar'],['yutma','Yutma'],['hava','Anestezide hava yolu'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  SAYFALAR['dersler/anatomi/01b'] = {
    grup: 'dersler', eyebrow: 'Anatomi · Bölüm 1 · Ders 01b', baslik: 'Farinks ve yutma',
    lede: 'Farinks hava ve besin için ortak bir geçittir. [[K5 s. 15]] Yutarken üç açıklık kapanır ve bolus larinks girişinin iki yanından özofagusa geçer. [[K5 s. 21–22]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="an01b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an01b-bolgeler"><h2>Burundan özofagusa üç bölge</h2>
<p class="intro">Bu geniş kas tüpünün her bölümünü önde açıldığı boşluktan tanıyabilirsiniz. [[K5 s. 15]]</p>
<div class="viz"><div class="viz-head"><h3>Sagittal kesitte geçidi izleyin</h3></div><div data-viz="an01b_kesit"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Farinksin üst ucu oksipital kemiğin baziler parçasına tutunur, alt ucu C6’da özofagusla devam eder. [[K5 s. 15]] Arka duvarının komşuları prevertebral fasya ve servikal omurlardır. [[K5 s. 15]]</p>
<dl class="an01b-liste"><dt>Nazofarinks</dt><dd>Burnun arkasında, yumuşak damağın üstündedir. [[K5 s. 15]] Orofarinkse açılan farengeal istmus yutma sırasında kapanır. [[K5 s. 15]]</dd>
<dt>Orofarinks</dt><dd>Yumuşak damaktan epiglot ucuna kadar uzanır, en önemli yapıları tonsillerdir. [[K5 s. 16–17]] Ağızdan geçişi sağlayan orofarengeal istmusu yanlarda palatoglossal arklar, üstte damak, altta dil sırtı sınırlar. [[K5 s. 16]]</dd>
<dt>Laringofarinks</dt><dd>Epiglot ucundan aşağıya, krikoid kıkırdağın C6’daki alt kenarına iner. [[K5 s. 18]]</dd></dl>
<p><b>İki istmusu kesitte ayırın.</b> Dil sırtının üzerinden geriye giden besin, ağızdan orofarinkse geçerken orofarengeal istmusu aşar. [[K5 s. 16]] [[K5 s. 21]] Kesitte aynı noktadan yumuşak damağın arkasına ve yukarı bakarsanız, orofarinksi nazofarinkse bağlayan farengeal istmusu bulursunuz. [[K5 s. 15]]</p>
<h3>Nazofarinkste üç komşuluk</h3>
<ul class="ozet"><li><b>Yan duvar.</b> Faringotimpanik (Östaki) tüpün ağzı alt nazal konkanın 1 cm arkasında ve hemen altındadır. [[K5 s. 15–16]] Arkaya doğru önce tüp kıkırdağının oluşturduğu kabarıklık, ardından küçük farengeal reses (Rosenmüller fossası) gelir. [[K5 s. 16]]</li>
<li><b>Tavan ve arka duvar.</b> Silyalı epitelle örtülü lenfoid doku burada nazofarengeal tonsili (adenoid) oluşturur. [[K5 s. 16]] Belirgin fibröz kapsülü olmayan adenoid doğrudan üst konstriktöre dayanır. [[K5 s. 16]] Pubertede başlayan atrofiyle erken erişkinlikte neredeyse tümüyle kaybolur. [[K5 s. 16]]</li>
<li><b>Arka-üst komşuluk.</b> Sfenoid sinüs, nazofarinks ile hipofizi barındıran sella turcica arasındadır. [[K5 s. 16]] Transnazal hipofiz yaklaşımının anatomik temeli bu sıralanıştır. [[K5 s. 16]]</li></ul></section>

<section class="wrap blk ders-sec" id="an01b-tonsil"><h2>Palatin tonsil ve cerrahi diseksiyon düzlemi</h2>
<p class="intro">Her palatin tonsil iki pili arasındaki üçgeni doldurur, üçgenin tabanı dil sırtıyla birleşir. [[K5 s. 17]]</p>
<div class="viz"><div class="viz-head"><h3>Ön ve arka pili arasında ne görülür?</h3></div><div data-viz="an01b_tonsil"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Serbest yüzde yaklaşık 12–20 çukur ve üst bölümde bir intratonsiller yarık bulunur. [[K5 s. 17]] Çok katlı yassı epitelin lenfoid dokuyla birlikteliği tonsili mikroskopta tanınır kılar. [[K5 s. 17]] Derin yüzden dil sırtına, yumuşak damağa ve pililere lenfoid uzantılar gidebilir. [[K5 s. 17]]</p>
<p>Farengeal aponevrozun kalınlaşması derin yüzde yoğun bir fibröz kapsül oluşturur. [[K5 s. 17]] Kapsülü üst konstriktörden ayıran ince, gevşek bağ dokusu sayesinde enflamasyon yokken tonsil bütün olarak çıkarılabilir. [[K5 s. 17]] Tekrarlayan peritonsiller apseler kapsülü kasa yapıştırır ve keskin diseksiyon gerektirir. [[K5 s. 17]]</p>
<dl class="an01b-liste"><dt>Arterler</dt><dd>Ana kaynak fasiyal arterin tonsiller dalıdır. [[K5 s. 17]] İki eşlikçi venle üst konstriktörü delerek alt kutba girer. [[K5 s. 17]] Lingual, asendan palatin, asendan farengeal ve maksiller arterlerden küçük dallar katılır. [[K5 s. 17–18]]</dd>
<dt>Venler ve kanama</dt><dd>Kan eşlikçi venlere ve paratonsiller vene boşalır. [[K5 s. 18]] Paratonsiller ven yumuşak damaktan kapsülün dışına iner, duvarı delip farengeal venöz pleksusa ulaşır. [[K5 s. 18]] Ameliyat sonrası güçlük yaratan venöz kanamanın kaynağı olabilir. [[K5 s. 18]] Kitap internal karotisi kapsülden 2,5 cm uzakta, tonsillektomi tehlike alanının dışında tarif eder. [[K5 s. 18]]</dd>
<dt>Lenf</dt><dd>Drenaj üst derin servikal düğümlere, özellikle ortak fasiyal venin internal juguler venle birleştiği yerdeki jugulodigastrik (tonsiller) düğüme yönelir. [[K5 s. 18]]</dd>
<dt>Duyu</dt><dd>Glossofarengeal sinir farengeal pleksustan katkı verir. [[K5 s. 18]] Diğer iki yol maksiller sinirin posterior palatin dalı ve mandibular sinirin lingual dalından gelen ince dallardır. [[K5 s. 18]] Bu dağılım nedeniyle tonsile infiltrasyon anestezisi sinir bloğundan daha uygulanabilirdir. [[K5 s. 18]]</dd></dl>
<details class="an01b-okuma"><summary>Tonsil yatağını yatay kesitte nasıl tarif edersiniz?</summary>
<p>Lümenden dışa ilerlerken önce tonsilin serbest yüzü ve lenfoid dokusu, ardından kapsülü, gevşek bağ dokusunu ve üst konstriktörü gösterin. [[K5 s. 17]] Ön ve arka pililer bu kesitin ağız tarafındaki işaretleridir. [[K5 s. 17]]</p>
<p>Damarları izlerken fasiyal arterle tonsiller dalını, asendan palatin ve asendan farengeal arterleri, ayrıca eksternal ve internal karotisleri ayırt edin. [[K5 s. 17]] Alt kutba kastan geçerek gelen tonsiller dalı belirledikten sonra, kapsülün dışından aşağı inen paratonsiller venin yolunu izleyin. [[K5 s. 17–18]]</p></details>
<p><b>Waldeyer halkası.</b> Palatin ve farengeal tonsiller, dil arkasındaki ve Östaki ağzı çevresindeki lenfoid kümelerle birlikte farinks girişini neredeyse kesintisiz kuşatır. [[K5 s. 18]]</p></section>

<section class="wrap blk ders-sec" id="an01b-piriform"><h2>Larinks girişinin iki yanında piriform fossalar</h2>
<p class="intro">Larinksin orta hatta arkaya yaptığı kabarıklık, laringofarinkste iki yanda birer girinti bırakır. [[K5 s. 18]]</p>
<div class="viz"><div class="viz-head"><h3>Arkadan bakışta larinks girişi ve yan yollar</h3></div><div data-viz="an01b_piriform"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Laringofarinksin ön komşularını yukarıdan aşağı izleyin. Önce ariepiglottik kıvrımların sınırladığı larinks girişi, sonra aritenoidlerin arka yüzleri ve en altta krikoid gelir. [[K5 s. 18]] Balık kılçığı gibi sivri cisimler piriform fossada takılma eğilimindedir. [[K5 s. 18]]</p>
<p>Resimde ortadaki açıklığı ve iki yanındaki olukları ayrı ayrı bulun. Yutulan besin ortadaki girişe yaklaşınca epiglot onu bu oluklara yönlendirir. [[K5 s. 22]] Kılçığın takıldığı yerde yüzeye bakarken alttaki sinirin görünmesini beklemeyin. K5 sinirin seyrini mukoza altında tarif eder. [[K5 s. 18]]</p>
<div class="note"><b>Yüzeyden duyuya.</b> Üst laringeal sinirin internal dalı fossa mukozasının altında seyreder. [[K5 s. 18]] Kitapta Krause pensiyle tutulan pamukla bu yüzeye uygulanan lokal anesteziğin ses tellerinin üstündeki larinkste anestezi sağladığı anlatılır. [[K5 s. 18]] Bu etki laringoskopide ağız anestezisini tamamlar. [[K5 s. 18]]</div></section>

<section class="wrap blk ders-sec" id="an01b-duvar"><h2>Farinks duvarı ve konstriktörler</h2>
<p class="intro">Farinks duvarının dört tabakası lümenden dışa doğru izlenebilir. [[K5 s. 18–19]]</p>
<div class="viz"><div class="viz-head"><h3>Duvarı içten dışa inceleyin</h3></div><div data-viz="an01b_katman"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Üç konstriktörün tutunma yerleri</h3><p>Konstriktörler iki yanda kafatası, mandibula, hiyoid ve larinksten başlayıp farinksi sararak arkadaki median rafeye ulaşır. [[K5 s. 19]]</p>
<p>Rafenin üst ucu oksipital kemiğin baziler bölümündeki farengeal tüberküle tutunur, alt ucu özofagus duvarına karışır. [[K5 s. 19–20]]</p>
<dl class="an01b-liste"><dt>Üst konstriktör</dt><dd>Medial pterigoid plağın alt bölümü, pterigoid hamulus, pterigomandibular rafe ve mandibulanın iç yüzündeki milohiyoid çizginin arka ucu başlangıç yerleridir. [[K5 s. 20]] Serbest üst kenarla kafa tabanı arasında kalan aralıktan Östaki tüpü nazofarinkse geçer. [[K5 s. 20]]</dd>
<dt>Orta konstriktör</dt><dd>Hiyoidin küçük boynuzundan, büyük boynuzunun üst kenarından ve stilohiyoid bağın en alt parçasından yelpaze biçiminde açılır. [[K5 s. 20]]</dd>
<dt>Alt konstriktör</dt><dd>Üçünün en kalınıdır. [[K5 s. 20]] Başlangıçları krikoidin yan yüzü, krikotiroid kası aşan tendinöz ark ve tiroid laminasının oblik çizgisidir. [[K5 s. 20]] Üstte tiroid kökenli oblik tirofarengeal lifler bolusu iter, altta krikoid kökenli enine krikofarengeal lifler sfinkter görevi görür. [[K5 s. 20]]</dd>
<dt>Motor sinirler</dt><dd>K5, konstriktörlere giden aksesuar liflerin vagusun farengeal dalı içinde farengeal pleksusa ulaştığını belirtir. [[K5 s. 20]] Alt konstriktöre ayrıca üst laringeal sinirin eksternal dalından ve vagusun rekürren laringeal dalından ince dallar gelir. [[K5 s. 20]]</dd></dl>
<details class="an01b-okuma"><summary>Kasları diseksiyonda hangi yapılarla birlikte ararsınız?</summary>
<p>Arka duvar kaldırıldığında uvula, hiyoidin ucu, tiroid kıkırdağın üst ve alt boynuzları, piriform fossa ve alt konstriktör içeriden seçilir. [[K5 s. 16]] Damak kasları açığa çıkarılan tarafta levator ve tensor veli palatini ile hamulusun ucu görülür. [[K5 s. 16]] Stilofaringeus, salpingofaringeus ve palatofaringeusu aynı görünümde izlemek mümkündür. [[K5 s. 16]]</p>
<p>Konstriktörlerin dıştan görünümünde lateral pterigoid plak, pterigomandibular bağ, buksinatör ve milohiyoid üst bölgeyi tanımaya yardım eder. [[K5 s. 19]] Daha aşağıdaki işaretler tirohiyoid membran, krikotiroid kas ve özofagustur. [[K5 s. 19]] Üst konstriktörün pterigoid kökenini tarif ederken medial plağın alt bölümünü belirtin. [[K5 s. 20]]</p></details>
<div class="cols"><div class="card"><h3>Killian açıklığı</h3><p>İtici bölüm kuvvetle kasılırken krikofaringeusun spazmda kalmasının farengeal kese oluşumuna katkıda bulunduğu düşünülür. [[K5 s. 20]] Kese iki kas bölümünün birleştiği zayıf alandan arkaya, önce orta hatta çıkar. [[K5 s. 20]] Büyüdükçe omurgaya dayanır ve çoğunlukla daha açık olan sol yana sapar. [[K5 s. 20]]</p></div>
<div class="card"><h3>Ludwig anjini</h3><p>Ağız, tonsil veya diş enfeksiyonundan aşağı yayılan ödemi farengeal fasya sınırlar. [[K5 s. 19]] Farinks ve larinksteki şişme disfaji yapabilir. [[K5 s. 19]] Tablo tanınıp derin farengeal dokular cerrahi olarak drene edilmezse hızla larinks obstrüksiyonu gelişebilir. [[K5 s. 19]] Ağız tabanı cerrahisinden sonra da benzer sorunlar görülebilir ve trakeostominin uygunluğu değerlendirilmelidir. [[K5 s. 19]]</p></div></div></section>

<section class="wrap blk ders-sec" id="an01b-yutma"><h2>Yutma sırasında bolus hangi yolu izler?</h2>
<p class="intro">Yutma istemli başlar, farinksin uyarılmasıyla refleks olarak sürer. [[K5 s. 21]]</p>
<div class="viz"><div class="viz-head"><h3>Bolusu ağızdan kardiyaya izleyin</h3></div><div data-viz="an01b_yutma"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Yutma hem besini taşır hem solunum yolunda toz ve bakteri taşıyan mukusu temizler. [[K5 s. 21]] Medulladaki yutma merkezi vagus çekirdeğiyle solunum merkezlerinin yakınındadır ve refleksleri eşgüdümler. [[K5 s. 21]] Farengeal duyu anesteziyle ortadan kalktığında normal yutma gerçekleşemez. [[K5 s. 21]]</p>
<p>Besinin farinkse ulaşması için önce çiğnenmesi ve tükürükle kayganlaşması gerekir. [[K5 s. 21]] Kuru boğazla hap yutmanın güçlüğü, kayganlaşmanın önemini gösterir. [[K5 s. 21]] Ağız tabanı kasları dili desteklerken dil damağa bastırır ve bolusu arkaya, orofarengeal istmustan geçirir. [[K5 s. 21]]</p>
<h3>Geri kaçışı önleyen üç kapanma</h3>
<dl class="an01b-liste"><dt>Burun yolu</dt><dd>Üst konstriktörün kasılması arka duvarda Passavant kabartısını oluşturur. [[K5 s. 21]] Yükselen yumuşak damak bu kabartıya dayanır, aynı anda tensor veli palatini Östaki ağzını açar. [[K5 s. 21]] Böylece kulak zarının iki yanındaki basınç eşitlenir. [[K5 s. 21]]</dd>
<dt>Ağız yolu</dt><dd>İki palatoglossus kasılınca ön pililer yaklaşır, dil sırtı kalan aralığı doldurup orofarengeal istmusu kapatır. [[K5 s. 21]]</dd>
<dt>Larinks girişi ve altı</dt><dd>Ariepiglottik ve oblik interaritenoid kaslar girişteki kıvrımları yaklaştırır. [[K5 s. 21]] Tiroepiglottik kaslar vestibül duvarlarını birbirine çeker. [[K5 s. 21]] Lateral krikoaritenoid ve transvers interaritenoid kaslar ses tellerini kapatır. [[K5 s. 21]]</dd></dl>
<p>Tirohiyoid, stilohiyoid, stilofaringeus, digastrik ve milohiyoid kaslar larinksi yukarı ve öne, geriye uzanan dil köküne doğru çeker. [[K5 s. 22]] Larinks yükselip girişi kapandığında solunum refleks olarak baskılanır. [[K5 s. 22]]</p>
<p>Bolusun ön ucu epiglota değdiğinde epiglot arka duvara doğru yatar ve ilerlemeyi anlık durdurur. [[K5 s. 22]] Yükselen larinks epiglotu öne sürükleyip dikleştirir, bolus girişin iki yanındaki piriform fossalara ayrılır. [[K5 s. 22]] Bir miktar sıvı vestibüle sızabilir, sıklıkla yalancı ses tellerine ulaşır ve nadiren daha aşağı geçer. [[K5 s. 22]]</p>
<p>Epiglot ana bolus geçtikten sonra geriye yatıp girişi örter. [[K5 s. 22]] Kitaba göre bu son hareket, hava yolu yeniden açılırken girişte besin artığı birikmesini önlüyor olabilir. [[K5 s. 22]]</p>
<p><b>Özofagusta taşıma.</b> Krikofaringeus gevşediğinde bolus farengoözofageal bileşkeyi aşar. [[K5 s. 22]] İlk dil itişiyle sıvı hızla ve pasif ilerleyebilir, katı ve yarı katı besinleri peristaltizm taşır. [[K5 s. 22]] Geçiş yaklaşık 15 saniye sürer ve kardiya dalga gelmeden hemen önce gevşer. [[K5 s. 22]]</p>
<p>Yerçekiminin katkısı küçüktür. [[K5 s. 22]] Yatar ve dik konumda geçiş benzer hızdadır. [[K5 s. 22]] Baş aşağı dururken bile yutmak oldukça kolaydır, bu durumda geçiş zorunlu olarak aktif bir kas sürecidir. [[K5 s. 22]]</p></section>

<section class="wrap blk ders-sec" id="an01b-hava"><h2>Anestezide farengeal hava yolu</h2>
<p class="intro">Sırtüstü hastada indüksiyon sonrası tıkanıklığı açıklarken dilin yanında yumuşak damağın konumunu da değerlendirin. [[K5 s. 22–23]]</p>
<div class="viz"><div class="viz-head"><h3>Hava geçişini hangi yapı kesiyor?</h3></div><div data-viz="an01b_hava"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Klasik açıklama çene kaslarının gevşemesiyle dilin geriye düşüp orofarinksi tıkamasıdır. [[K5 s. 22]] Orofarengeal hava yolu aracı bu tıkanmayı azaltabilir. [[K5 s. 22]] İndüksiyon radyografileri yumuşak damağın arka nazofarinks mukozasına dayanmasının daha önemli bir neden olduğunu göstermiştir. [[K5 s. 22]]</p>
<p>Ağız veya burun yolundaki tıkanıklıklardan birinin giderilmesi hava geçişini sağlar. [[K5 s. 22]]</p>
<details class="an01b-okuma"><summary>Tıkanma ile aspirasyonu klinik örnekte nasıl ayırırsınız?</summary>
<p>İndüksiyon sırasında horlayan hastada önce havanın ağızdan ve burundan farinkse hangi yoldan ulaşabildiğini sorun. [[K5 s. 22]]</p>
<p>Yutma sonrasında trakeaya sıvı kaçtığında ise larinksin yükselmesini, girişinin kapanmasını ve koruyucu refleksin bütünlüğünü sorgulayın. [[K5 s. 21–22]] Larinks yükselirken solunumun kısa süre baskılanması normal yutmanın bir parçasıdır. [[K5 s. 22]]</p></details>
<p><b>Laringeal maske (LMA).</b> Genel anestezide arka farinks tıkanıklığını aşmak için dili elle öne çekme gereğini ortadan kaldırır. [[K5 s. 23]]</p>
<div class="note"><b>Aspirasyonu açıklayan iki mekanizma.</b> Björk tipi ön flepli trakeostomi trakeayı sabitleyip larinksin yükselmesini kısıtlayabilir ve yutulan sıvı trakeaya kaçabilir. [[K5 s. 21]] Farengeal lokal anestezi veya farinks kaslarının cerrahisi koruyucu refleksi ortadan kaldırır. [[K5 s. 21]] Opioidler, anestezi ve beyin travması refleksin merkezi bileşenini baskılar. [[K5 s. 21]] Bu koşullarda yabancı materyal özellikle sırtüstü veya başı yüksekte yatan hastada aspire edilebilir. [[K5 s. 21]]</div></section>

<section class="wrap blk ders-sec" id="an01b-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız yanıtlayın.</p>
<div class="viz"><div data-viz="mtf" data-q="an01b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an01b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an01b-3"></div></div></section>

<section class="wrap blk ders-sec" id="an01b-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Balık kılçığı yutan bir hastanın piriform fossasında yabancı cisim görülüyor. Fossayı tarif edin. Buraya uygulanan lokal anestezik hangi bölgenin duyusunu etkiler? Normalde bolus bu düzeyi nasıl geçer?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Epiglot ucuyla krikoidin alt kenarı arasındaki laringofarinksi ve C6’da özofagusa geçişi gösterin. [[K5 s. 15]] [[K5 s. 18]]</li>
<li>Larinks ortada arkaya kabarır, iki yanda sivri cisimlerin takılabildiği piriform fossalar kalır. [[K5 s. 18]]</li>
<li>Mukoza altında üst laringeal sinirin internal dalı seyreder, yüzeyden anestezi ses tellerinin üstünü etkiler. [[K5 s. 18]]</li>
<li>Giriş kıvrımları, vestibül duvarları ve ses telleri yaklaşırken yükselen larinks dil köküne dayanır. [[K5 s. 21–22]]</li>
<li>Epiglot ana bolusu iki fossaya yönlendirir ve geçişten sonra girişi örter. [[K5 s. 22]]</li>
<li>Krikofaringeusun gevşemesiyle bolus özofagusa geçer. [[K5 s. 22]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Arkadan görünümde larinks girişini, ariepiglottik kıvrımları ve iki piriform fossayı işaretleyin. Bolusun ayrıldığı iki yolu oklarla gösterin. [[K5 s. 18]] [[K5 s. 22]]</div>
<div class="note plain"><b>Olası ek sorular</b><ul><li>Björk trakeostomisi yutmayı hangi hareketi kısıtlayarak bozabilir?</li><li>İndüksiyonda nazal hava yolu nerede kapanabilir?</li><li>Laringeal maskenin kafı hangi açıklığa oturur?</li></ul></div></div></section>

<section class="wrap blk ders-sec" id="an01b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Yumuşak damak ile epiglot ucu üç farinks bölgesini ayırt ettirir, krikoidin alt kenarı özofagusa geçişi gösterir. [[K5 s. 15–18]]</li>
<li>Palatin tonsilde diseksiyon düzlemi kapsülle üst konstriktör arasındadır, paratonsiller ven kapsülün dışından geçer. [[K5 s. 17–18]]</li>
<li>İki piriform fossa bolusu larinks girişinin yanından geçirir, submukozalarında üst laringeal sinirin internal dalı bulunur. [[K5 s. 18]] [[K5 s. 22]]</li>
<li>Alt konstriktörün itici ve sfinkter bölümleri arasındaki zayıf alan farengeal kesenin çıkış yeridir. [[K5 s. 20]]</li>
<li>Yutarken üç düzeyde laringeal kapanmaya larinks yükselmesi ve kısa süreli solunum baskılanması eşlik eder. [[K5 s. 21–22]]</li>
<li>İndüksiyonda dil oral yolu, yumuşak damak nazal yolu kapatabilir. [[K5 s. 22]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="01b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/01a">← Ağız, damak ve burun</a><a href="#/dersler/anatomi/01c">Sonraki: Larinks →</a></nav></section>`,
  };
})();
