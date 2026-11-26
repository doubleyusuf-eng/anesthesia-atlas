VERI.sorular = VERI.sorular || {};
VERI.sorular['an06b-1'] = {
  no: 1, kok: 'Trigeminal kökler ve merkezî yollar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 254–256]]',
  onermeler: [
    { t: 'Küçük medial kök duyu liflerini taşır.', d: false, n: 'Yanlış. Küçük medial kök motor, büyük lateral kök duyusaldır. [[K5 s. 256]]' },
    { t: 'Ana duyu çekirdeği dokunmayla ilişkilidir.', d: true, n: 'Doğru. Dokunma ana duyu çekirdeğiyle, ağrı ve sıcaklık spinal traktus çekirdeğiyle ilişkilidir. [[K5 s. 254]]' },
    { t: 'Motor çekirdek kortikobulber lifleri yalnız karşı hemisferden alır.', d: false, n: 'Yanlış. Her iki hemisferden lif gelir, karşı tarafın katkısı daha büyüktür. [[K5 s. 254]]' },
    { t: 'Spinal traktus çekirdeğinde oftalmik lifler en kaudalde temsil edilir.', d: true, n: 'Doğru. Kaudalden rostrale sıra oftalmik, maksiller ve mandibulardır. [[K5 s. 254–256]]' },
    { t: 'Santral duyu lifleri talamusa aynı tarafta yükselir.', d: false, n: 'Yanlış. Lifler çaprazlaşır ve trigeminal lemniskusla talamusun lateral çekirdeğine yükselir. [[K5 s. 256]]' },
  ],
};
VERI.sorular['an06b-2'] = {
  no: 2, kok: 'Orbita ve siliyer gangliyon', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 258–261]]',
  onermeler: [
    { t: 'Nazosiliyer sinir rektusların tendinöz halkası içinden geçer.', d: true, n: 'Doğru. Nazosiliyer dal halkadan geçerek optik sinirin üzerinden mediale yönelir. [[K5 s. 260]]' },
    { t: 'Lakrimal sinir V₁’in en büyük dalıdır.', d: false, n: 'Yanlış. Lakrimal dal en küçük, frontal dal en büyüktür. [[K5 s. 258–259]]' },
    { t: 'İnfratroklear sinir üst oblik kasın makarasının altından çıkar.', d: true, n: 'Doğru. İnfratroklear dal makaranın altından burun yanına ve iç kantus çevresine ulaşır. [[K5 s. 261]]' },
    { t: 'Siliyer gangliyona gelen duyu lifleri burada sinaps yapar.', d: false, n: 'Yanlış. Nazosiliyer kökenli duyu lifleri sinaps yapmadan kısa siliyer sinirlere katılır. [[K5 s. 261]]' },
    { t: 'Pupilla dilatatörüne giden sempatik liflerin çoğu uzun siliyer sinirleri izler.', d: true, n: 'Doğru. Uzun siliyer yol nazosiliyer sinirin dallarından geçer. [[K5 s. 260–261]]' },
  ],
};
VERI.sorular['an06b-3'] = {
  no: 3, kok: 'Maksiller sinir ve pterigopalatin fossa', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 261–268]]',
  onermeler: [
    { t: 'Maksiller sinir pterigopalatin fossaya foramen ovaleden girer.', d: false, n: 'Yanlış. Maksiller sinirin fossaya girişi foramen rotundumdandır. [[K5 s. 261]]' },
    { t: 'Posterior superior alveolar dal fossadan pterigomaksiller fissürle çıkar.', d: true, n: 'Doğru. Dal fissürden çıktıktan sonra posterior dental kanala ulaşır. [[K5 s. 267]]' },
    { t: 'Orta superior alveolar dal infraorbital kanalın arka bölümünden ayrılır.', d: true, n: 'Doğru. Arka bölümden çıkan dal maksillanın lateral duvarında iki premolara iner. [[K5 s. 264]]' },
    { t: 'Nazopalatin sinir insiziv foramenden damağa geçer.', d: true, n: 'Doğru. Sinir septumda öne ve aşağıya ilerleyip insiziv foramene ulaşır. [[K5 s. 265]]' },
    { t: 'İnfraorbital ve mental foramenler aynı sagittal düzlemdedir.', d: true, n: 'Doğru. Aynı düzlemde supraorbital çentik veya foramen de yer alır. [[K5 s. 268]]' },
  ],
};

SAYFALAR['dersler/anatomi/06b'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 6 · Ders 06b',
  baslik: 'Trigeminal sinir: gangliyon, oftalmik ve maksiller dallar',
  lede: 'Üst kapağın, alt kapağın ve üst dişlerin duyusunu yüzeyden ponsa doğru izleyin. [[K5 s. 254–256]] [[K5 s. 258–261]] [[K5 s. 264]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an06b-kok"><span>01</span>Kökler</button>
  <button type="button" data-scroll="an06b-gangliyon"><span>02</span>Gangliyon</button>
  <button type="button" data-scroll="an06b-orbita"><span>03</span>Oftalmik sinir</button>
  <button type="button" data-scroll="an06b-siliyer"><span>04</span>Siliyer gangliyon</button>
  <button type="button" data-scroll="an06b-maksilla"><span>05</span>Maksiller sinir</button>
  <button type="button" data-scroll="an06b-damak"><span>06</span>Damak ve burun</button>
  <button type="button" data-scroll="an06b-fossa"><span>07</span>Fossa ve bloklar</button>
  <button type="button" data-scroll="an06b-p1"><span>08</span>Part I</button>
  <button type="button" data-scroll="an06b-p2"><span>09</span>Part II</button>
  <button type="button" data-scroll="an06b-ozet"><span>10</span>Özet</button>
</nav>
<section class="wrap blk ders-sec" id="an06b-kok">
  <h2>Ponstan yüz duyusuna</h2>
  <p class="intro">Kraniyal sinirlerin en büyüğü olan trigeminal sinir, yüzün, orbitanın, burnun ve ağzın başlıca duyu siniridir. [[K5 s. 254]]</p>
  <div class="viz"><div class="viz-head"><h3>Kökleri karşılaştırın</h3></div><div data-viz="an06b_kok"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Pons yüzeyinde önce kalın demeti bulun, sonra hemen medialindeki ince demeti seçin. [[K5 s. 256]] İkisini çap ve konum farkıyla ayırt edin. [[K5 s. 256]]</p></div>
  <h3>Kökler ve görevleri</h3>
  <dl class="an06b-liste">
    <div><dt>Duyu alanı</dt><dd>Yüzden arkaya, saçlı deride vertekse kadar uzanır. [[K5 s. 254]] Göz küresi ve orbita, burun boşluğu, paranazal sinüsler ve nazofarenksin büyük bölümü bu alana girer. [[K5 s. 254]] Ağız, diş eti ve damak mukozasıyla dilin ön üçte ikisinin ve dişlerin duyusunu da taşır. [[K5 s. 254]]</dd></div>
    <div><dt>Motor alan</dt><dd>Çiğneme kaslarına, milohiyoide, digastriğin ön karnına, tensor palati ve tensor timpaniye lif verir. [[K5 s. 254]]</dd></div>
    <div><dt>Otonom bağlantılar</dt><dd>Siliyer, pterigopalatin, submandibular ve otik gangliyonlarla bağlantı kurar. [[K5 s. 254]]</dd></div>
    <div><dt>Motor çekirdek</dt><dd>Brankiyal efferent kolondadır ve üst ponsta dördüncü ventrikül tabanının lateral bölümünün hemen altında yer alır. [[K5 s. 254]] Her iki motor korteksten kortikobulber lif alır, karşı tarafın katkısı daha fazladır. [[K5 s. 254]]</dd></div>
    <div><dt>Çıkan duyu lifleri</dt><dd>Gangliyondan ponsa giren lifler çıkan ve inen yollara ayrılır. [[K5 s. 254]] Genel somatik afferent kolonun mezensefalik çekirdeği orta beynin santral gri maddesinde propriyosepsiyonla ilişkilidir. [[K5 s. 254]] Ana duyu çekirdeği dokunmayı işler ve motor çekirdekle süperior serebellar pedinkül arasında yer alır. [[K5 s. 254]]</dd></div>
    <div><dt>İnen duyu lifleri</dt><dd>Spinal traktus pons ve medullayı boydan boya geçerek omurilikte substansiya jelatinozaya katılır. [[K5 s. 254]] Afferentler burada lateral retiküler formasyonla sinaps yapar ve spinal gri maddenin arka boynuzunu örter. [[K5 s. 254]] Ağrı ve sıcaklıkla ilgili spinal traktus çekirdeği, traktusun hemen derininde ana çekirdekten omuriliğe uzanır. [[K5 s. 254]]</dd></div>
    <div><dt>Spinal çekirdekte sıra</dt><dd>Kaudalden rostrale oftalmik (V₁), maksiller (V₂), mandibular (V₃) lifler sıralanır. [[K5 s. 254–256]] Ventralden dorsale sıra yine V₁, V₂, V₃’tür. [[K5 s. 256]]</dd></div>
    <div><dt>Pons kesitini yönlendirme</dt><dd>K5’in transvers kesitinde dördüncü ventrikül, medial longitudinal demet ve medial lemniskus çekirdekleri bulmak için gösterilen işaretler arasındadır. [[K5 s. 255]] Aynı kesitte üst ve orta serebellar pedinküllerle serebrospinal traktus da seçilir. [[K5 s. 255]] Dorsal görünümde mezensefalik çekirdek, motor ve ana duyu çekirdekleri ile aşağı uzanan spinal traktus çekirdeği birlikte izlenir. [[K5 s. 255]]</dd></div>
    <div><dt>Kortekse iletim</dt><dd>Üç duyu çekirdeğinin santral lifleri çaprazlaşır ve trigeminal lemniskusla talamusun lateral çekirdeğine çıkar. [[K5 s. 256]] Buradan postsantral girusun yüz alanına iletilir. [[K5 s. 256]]</dd></div>
  </dl>
  <details class="note plain"><summary>Bir duyu yakınmasını merkeze kadar izleyin</summary><p>Önce duyunun türünü seçin. Yüzde dokunma bilgisini izliyorsanız ponstaki ana çekirdeği, ağrı ve sıcaklığı izliyorsanız aşağı inen spinal traktusu bulun. [[K5 s. 254]] Her iki yolun sonraki ortak durağı, orta hattı geçen liflerin ulaştığı talamustur. [[K5 s. 256]] Motor çekirdeği bu duyu yolundan ayıran ipucu, liflerini iki hemisferin motor korteksinden almasıdır. [[K5 s. 254]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an06b-gangliyon">
  <h2>Petröz apekste trigeminal gangliyon</h2>
  <p class="intro">Ponsun üst kenarına yakın ventrolateral yüzünden çıkan iki kök pontin sisternada öne ilerler. [[K5 s. 256]]</p>
  <div class="viz"><div class="viz-head"><h3>Hilalin iki yüzünü ayırt edin</h3></div><div data-viz="an06b_gangliyon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Duyu kökünü konkav yüzüne kadar izleyin. [[K5 s. 256]] Karşı kenarda birbirinden uzaklaşan üç dalı izlerken üst orbital fissürü, foramen rotundumu ve foramen ovaleyi sırayla düşünün. [[K5 s. 256–257]]</p></div>
  <h3>Gangliyonun komşuları ve çıkışları</h3>
  <dl class="an06b-liste">
    <div><dt>Kökten gangliyona</dt><dd>Büyük lateral kök (portio major) duyusal, küçük medial kök (portio minor) motordur. [[K5 s. 256]] Yaklaşık 1 cm sonra duyu kökü genişleyerek ilk duyu hücrelerinin bulunduğu gangliyonu oluşturur. [[K5 s. 256]]</dd></div>
    <div><dt>Yatak</dt><dd>Semilunar ya da Gasser gangliyonu spinal arka kök gangliyonuna karşılık gelir. [[K5 s. 256]] Konveksliği laterale bakan hilal, tentoryumun ön tutunmasının hemen altındaki dura cebinde, petröz apeksin bir ölçüde çukurlaşmış yerine oturur. [[K5 s. 256]] Foramen laserumu dolduran kıkırdak üzerine uzanır. [[K5 s. 256]]</dd></div>
    <div><dt>Derin, üst ve medial</dt><dd>Motor kök ve büyük petrozal sinir gangliyonun derininden geçer. [[K5 s. 256]] Üstte temporal lobun hipokampal girusu, medialde internal karotis ve kavernöz sinüsün arka bölümü bulunur. [[K5 s. 256]]</dd></div>
    <div><dt>Ponsa bakan yüz</dt><dd>Konkav medial yüzden çıkan lifler tentoryumun tepesinde, üst petrozal sinüsün altından arkaya dönerek ponsa ulaşır. [[K5 s. 256]]</dd></div>
    <div><dt>Yüzün gelişiminde yön bulma</dt><dd>K5’in embriyonik yüz görünümünde ön beyin, göz, olfaktör çukur, medial ve lateral nazal kıvrımlar ile stomodeum, üç çıkıntıyı ayırt etmeye yardımcı olur. [[K5 s. 256]]</dd></div>
    <div><dt>Üç yüz çıkıntısı, üç yol</dt><dd>Anteroinferior yüzden çıkan V₁ frontonazal, V₂ maksiller, V₃ mandibular fetal çıkıntıya dağılır. [[K5 s. 256]] V₁’in üç dalı öne ve biraz yukarı, üst orbital fissüre yönelir. [[K5 s. 256–257]] V₂ öne, foramen rotundumdan pterigopalatin fossaya geçer. [[K5 s. 257]] V₃ hemen hemen dik inerek foramen ovaleden infratemporal fossaya çıkar. [[K5 s. 257]]</dd></div>
    <div><dt>Dirençli ağrı</dt><dd>Gangliyon bloğunun en sık endikasyonu tedaviye dirençli trigeminal nevraljidir, dirençli kanser ağrısı ve küme baş ağrısında da kullanılmıştır. [[K5 s. 257]] Nevraljide köke beyin sapı yakınında kıvrımlı veya ektatik bir damarın basarak demiyelinizasyona yol açtığı düşünülür. [[K5 s. 257]]</dd></div>
    <div><dt>Dekompresyon</dt><dd>En sık, kökün girişinde üst serebellar arter dalının basısı bulunur. [[K5 s. 257]] Suboksipital kraniyotomi gerektiren mikrovasküler dekompresyon en kalıcı yanıtı sağlar. [[K5 s. 257]] Kitap majör sorun oranını %4, BOS kaçağını %2’nin altında, serebellar infarktı %0,45 olarak verir. [[K5 s. 257]]</dd></div>
    <div><dt>Diğer girişimler</dt><dd>Dekompresyon endike değilse, yapılamıyor veya tolere edilemiyorsa radyofrekans gangliyolizi, Meckel boşluğuna gliserol enjeksiyonu ya da balon kompresyonu kullanılabilir. [[K5 s. 257–258]] Bazı merkezlerde stereotaktik radyocerrahi (gamma knife) arka fossadaki trigeminal kökü hedefler. [[K5 s. 258]]</dd></div>
    <div><dt>Perkütan yol</dt><dd>Kitap skopi veya BT eşliğinde giriş yerini ikinci üst molar hizasında, zigomatik kemiğin arka üçte birinin altında tarif eder. [[K5 s. 258]] Yol pterigoid laminanın arkasından posteromediale dönerek görüntülemede belirlenen foramen ovaleye ulaşır. [[K5 s. 258]] Foramenin 1 cm ötesinde gangliyona erişildiğinde trigeminal alanda genellikle parestezi hissedilir. [[K5 s. 258]]</dd></div>
    <div><dt>Konum ve sonuç</dt><dd>Dura ponksiyonu aspirasyonla, tekal örtülerin geçilip geçilmediği radyopak kontrastla kontrol edilir. [[K5 s. 258]] Kontrast foramen çevresinde sınırlı kaldığında enjeksiyon, kompresyon veya radyofrekans uygulanabilir. [[K5 s. 258]] Bu tekniklerden sonra yaklaşık %4’te korneal hipoestezi ve anestezi dolorosa, %50’de bir ölçüde duyu kaybı bildirilir. [[K5 s. 258]]</dd></div>
  </dl>
  <details class="note plain"><summary>Giriş deliği hangi hedefe götürür?</summary><p>Foramen ovale hem V₃’ün kafadan çıkış yeri hem de gangliyona yönelik perkütan girişimin kemik işaretidir. [[K5 s. 257–258]] Hedefi delikle karıştırmayın. Gangliyon daha derinde, petröz apeks yakınındaki dura cebindedir. [[K5 s. 256]] Kitabın foramen çevresindeki kontrast dağılımını özellikle aramasının nedeni, iğnenin tekal örtülere göre konumunu değerlendirmektir. [[K5 s. 258]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an06b-orbita">
  <h2>Üst orbital fissürde üç dal</h2>
  <p class="intro">Tamamen duyusal V₁, kavernöz sinüsün lateral duvarında III ve IV’ün altından ilerleyerek üst orbital fissürde lakrimal, frontal ve nazosiliyer dallara ayrılır. [[K5 s. 258]]</p>
  <div class="viz"><div class="viz-head"><h3>Önce orbitayı, sonra alnı inceleyin</h3></div><div data-viz="an06b_orbita"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Orbita içi görünümde lateral kenardan mediale ilerleyerek lakrimal, frontal ve nazosiliyer yolları ayırt edin. [[K5 s. 258–260]] Alın görünümüne geçin ve frontal dalın iki ucunu boyutları ve orta hatta uzaklıklarıyla eşleştirin. [[K5 s. 259–260]]</p></div>
  <h3>Orbitadan alna ve buruna</h3>
  <dl class="an06b-liste">
    <div><dt>Duyu alanı</dt><dd>Göz küresi ve konjonktiva, üst kapak, lakrimal bez, alın, burun ve vertekse kadar saçlı deriyi kapsar. [[K5 s. 258]] Burnun ön bölümünün medial ve lateral mukozası ile frontal ve etmoidal sinüsler de bu alandadır. [[K5 s. 258]]</dd></div>
    <div><dt>Lakrimal</dt><dd>En küçük dal, fissürün lateral bölümünden kasların kökenindeki fibröz halkanın üstünde girer. [[K5 s. 258]] V₂’nin zigomatik dalından aldığı pterigopalatin sekretomotor lifleri beze iletir. [[K5 s. 258]] Orbita kenarının lateral ucunun altından çıkar, konjonktivaya ve dış kantusa komşu küçük bir üst kapak deri alanına dağılır. [[K5 s. 258–259]]</dd></div>
    <div><dt>Frontal</dt><dd>En büyük dal fissürden halkanın ve levator palpebrae superiorisin üzerinden geçer. [[K5 s. 259]] Orbitada büyük supraorbital ve küçük supratroklear dallara ayrılır. [[K5 s. 259]]</dd></div>
    <div><dt>Supraorbital</dt><dd>Üst orbita kenarındaki çentikten, bazen bir foramenden çıkar. [[K5 s. 259]] Üst kapağın medialine dallar verdikten sonra alın ve saçlı deride vertekse kadar uzanır. [[K5 s. 259]]</dd></div>
    <div><dt>Supratroklear</dt><dd>Üst oblik kasın makarasının üzerinden geçerek iç kantus yakınındaki üst kapak derisini, konjonktivayı, orbitanın hemen üstündeki medial alnı ve burun kökünü inerve eder. [[K5 s. 259]]</dd></div>
    <div><dt>Yüzeyde yer bulma</dt><dd>Alın orta hattından dışa yan yana yerleştirilen üç parmaktan ikincisi supratroklear, üçüncüsü supraorbital geçişe denk gelir. [[K5 s. 260]] Supraorbital çentik çoğu kez palpasyonla bulunabilir ve üzerine bası belirgin ağrı verir. [[K5 s. 260]]</dd></div>
    <div><dt>Nazosiliyer</dt><dd>Rektusların tendinöz halkası içinden girer, optik sinirin üstünden mediale çaprazlayarak orbita iç duvarına varır. [[K5 s. 260]] Anterior etmoidal foramene girdiğinde anterior etmoidal sinir adını alır. [[K5 s. 260]] Ön kraniyal fossada kribriform plağı geçer, krista galli yakınından buruna girerek ikiye ayrılır. [[K5 s. 260]]</dd></div>
    <div><dt>Anterior etmoidal uçlar</dt><dd>Septal dal ön septum mukozasına, lateral dal ön lateral duvara gider. [[K5 s. 260]] Lateral dal nazal kemiğin alt kenarı ile lateral nazal kıkırdak arasından eksternal nazal sinir olarak çıkar, kanat ve uç derisine dağılır. [[K5 s. 260]] Böylece kıkırdak ucun iç ve dış yüzü de nazosiliyer alandadır. [[K5 s. 260]]</dd></div>
    <div><dt>Diğer nazosiliyer dallar</dt><dd>Siliyer gangliyona duyu lifi verir, iki uzun siliyer sinir arkadan göz küresine girerek duyu ve pupilla dilatatörüne sempatik lif taşır. [[K5 s. 260]] Medial duvarda ayrılan posterior etmoidal dal kendi forameninden arka etmoidal hava hücrelerine ulaşır. [[K5 s. 260]] İnfratroklear dal anterior etmoidal foramenden hemen önce ayrılır, makaranın altından çıkarak burun yanı derisiyle iç kantus yakınındaki konjonktivaya gider. [[K5 s. 261]]</dd></div>
    <div><dt>Oftalmik blok</dt><dd>Göz cerrahisinde bazen kullanılan oftalmik blok, optik sinirin yakınlığı nedeniyle görmeyi geçici olarak bozabilir. [[K5 s. 258]] Kitap, santral retinal arter uç arter olduğu için bu blokta epinefrin eklenmemesini, kalıcı körlük riski nedeniyle nörolitik ajan kullanılmamasını belirtir. [[K5 s. 258]]</dd></div>
  </dl>
  <details class="note plain"><summary>Kapakta aynı noktaya kaç yoldan yaklaşılır?</summary><p>İç kantusun yakınında yalnız “V₁” demek dalı belirlemez. [[K5 s. 259–261]] Üst kapak derisinden alna ve burun köküne doğru izlenen yol supratroklear dala, konjonktivadan burun yanına doğru izlenen yol infratroklear dala uyar. [[K5 s. 259]] [[K5 s. 261]] Dış kantusa bitişik küçük üst kapak alanı ise lakrimal siniri düşündürür. [[K5 s. 258–259]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an06b-siliyer">
  <h2>Siliyer gangliyonda hangi lif sinaps yapar?</h2>
  <p class="intro">Orbita apeksine yakın, optik sinir ile lateral rektus arasındaki yaklaşık 1 mm çaplı gangliyona üç tür lif ulaşır. [[K5 s. 261]]</p>
  <div class="viz"><div class="viz-head"><h3>Sinapsın yerini bulun</h3></div><div data-viz="an06b_siliyer"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Göz küresinin arkasındaki kalın optik siniri bulun ve lateral rektusa doğru bakın. [[K5 s. 261]] Aradaki küçük gangliyondan çıkan ince kısa siliyer sinirleri küreye kadar izleyin. [[K5 s. 261]]</p></div>
  <h3>Kısa ve uzun siliyer yollar</h3>
  <dl class="an06b-liste">
    <div><dt>Parasempatik</dt><dd>Edinger–Westphal çekirdeğinden gelen lifler III. sinirin alt oblik kasa giden dalıyla gangliyona ulaşır ve sinaps yapar. [[K5 s. 261]] Postgangliyonik lifler yaklaşık altı kısa siliyer sinirle pupilla sfinkterine ve siliyer kasa gider. [[K5 s. 261]] Uyarı pupillayı daraltır, lensin akomodasyonunu sağlar. [[K5 s. 261]]</dd></div>
    <div><dt>Sempatik</dt><dd>Üst servikal gangliyondan çıkan lifler internal karotid pleksus üzerinden gelir. [[K5 s. 261]] Gangliyonda sinaps yapmadan kısa siliyer sinirlerle göz küresine geçerek vazokonstriktör innervasyon sağlar. [[K5 s. 261]] Pupilla dilatatörüne giden sempatik liflerin çoğu ise nazosiliyer sinirin uzun siliyer dallarında taşınır. [[K5 s. 261]]</dd></div>
    <div><dt>Duyu</dt><dd>Nazosiliyer dalın duyu lifleri de gangliyondan sinaps yapmadan geçer ve kısa siliyer sinirler içinde göz küresine ulaşır. [[K5 s. 261]]</dd></div>
  </dl>
  <details class="note plain"><summary>Pupillaya giden yolları ayırın</summary><p>Pupillayı daraltan yanıtı geriye doğru izlerken önce sfinkterden kısa siliyer sinirlere, oradan siliyer gangliyona ulaşın. [[K5 s. 261]] Gangliyonun öncesindeki bağlantı III. sinirin alt oblik dalıdır. [[K5 s. 261]] Pupillayı genişleten lifler için aynı yolu tersine çevirmeyin. Bu sempatik liflerin çoğu göz küresine nazosiliyer sinirin uzun siliyer dallarıyla girer. [[K5 s. 261]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an06b-maksilla">
  <h2>Maksiller siniri dört bölgede izleyin</h2>
  <p class="intro">Tamamen duyusal V₂, hem boyut hem yerleşim bakımından V₁ ile V₃ arasındadır. [[K5 s. 261]]</p>
  <div class="viz"><div class="viz-head"><h3>Sinirin ad değiştirdiği bölgeyi izleyin</h3></div><div data-viz="an06b_maksilla"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Maksillanın orbital yüzündeki siniri öne doğru takip edin. [[K5 s. 261]] Altındaki üst diş dizisinde molar, premolar ve kesici gruplarını seçerek alveolar dalların hangi duvar boyunca indiğini düşünün. [[K5 s. 264]]</p></div>
  <h3>Kafa tabanından yanağa</h3>
  <dl class="an06b-liste">
    <div><dt>Kafa tabanı</dt><dd>Gangliyonun ön kenarından çıkan V₂, kavernöz sinüs lateral duvarının alt bölümünde V₁’in altından ilerler. [[K5 s. 261]] İntrakraniyal meningeal dalı orta kraniyal fossa durasını inerve eder. [[K5 s. 264]]</dd></div>
    <div><dt>Pterigopalatin fossa</dt><dd>V₂ foramen rotundumdan çıkar ve fossayı geçerken zigomatik dalı, iki gangliyonik dalı ve posterior superior alveolar siniri verir. [[K5 s. 261]] [[K5 s. 264]] Gangliyonik dallar pterigopalatin gangliyonun duyu kökleridir. [[K5 s. 264]]</dd></div>
    <div><dt>Zigomatik</dt><dd>Alt orbital fissürden orbitaya girer ve lateral duvarda ikiye ayrılır. [[K5 s. 264]] Zigomatikotemporal dal kendi kemik kanalından temporal fossaya çıkıp şakak derisine yükselir. [[K5 s. 264]] Henüz orbitadayken lakrimal sinire ince bir bağlantı vererek bezin parasempatik liflerini iletir. [[K5 s. 264]] Zigomatikofasiyal dal elmacık kemiğindeki aynı adlı foramenden malar çıkıntı derisine geçer. [[K5 s. 264]]</dd></div>
    <div><dt>Oluk ve kanal</dt><dd>V₂ fossadan sonra infraorbital sinir adını alır ve maksillanın orbital yüzünde önce oluğa, ardından kanala girer. [[K5 s. 261]] Orta ve anterior superior alveolar sinirler kanalda ayrılır. [[K5 s. 264]]</dd></div>
    <div><dt>Arka dişler</dt><dd>Posterior superior alveolar sinir maksillanın arka yüzünden aşağı iner, posterior dental kanala girer ve her bir üst molara dallar verir. [[K5 s. 264]] Sinir de kanal da çift olabilir. [[K5 s. 264]] Sinirin dalları maksiller sinüs mukozasına da gider. [[K5 s. 264]]</dd></div>
    <div><dt>Orta ve ön dişler</dt><dd>Orta superior alveolar dal kanalın arkasından çıkarak maksillanın lateral duvarında iki üst premolara iner. [[K5 s. 264]] Anterior superior alveolar dal kanalın ön ucundan çıkar, maksillanın ön duvarında üst kanin ve kesicilere ulaşır. [[K5 s. 264]] Küçük bir dal inferior meatusun lateral duvarını delerek ön-alt lateral burun duvarı ve burun tabanı mukozasına gider. [[K5 s. 264]]</dd></div>
    <div><dt>Yanak</dt><dd>İnfraorbital sinir levator labii superiorisin altında foramenden çıkar ve yanağın deri altı dokusunda yelpaze gibi açılır. [[K5 s. 261]] [[K5 s. 264]] Palpebral dallar alt kapağın derisi ve konjonktivasına, nazal dallar burun yanı derisine gider. [[K5 s. 264]] Labial dallar üst dudak ile ön yanağın hem derisini hem mukozasını inerve eder. [[K5 s. 264]]</dd></div>
  </dl>
  <details class="note plain"><summary>Aynı sinirin iki farklı çıkışı</summary><p>Bir üst kesici dişten geriye giderseniz anterior superior alveolar dalla infraorbital kanalın ön ucuna ulaşırsınız. [[K5 s. 264]] Üst dudak derisinden geriye giderseniz önce labial dala, sonra infraorbital foramenden yeni çıkmış sinire ulaşırsınız. [[K5 s. 261]] [[K5 s. 264]] İki alanın da V₂ ile ilişkili olması, dalların aynı bölgede ayrıldığı anlamına gelmez. [[K5 s. 261]] [[K5 s. 264]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an06b-damak">
  <h2>Pterigopalatin gangliyondan damağa ve buruna</h2>
  <p class="intro">Fossanın üst bölümünde, V₂’ye komşu derin yerleşimli pterigopalatin gangliyon parasempatik, sempatik ve duyusal lifler alır. [[K5 s. 264]]</p>
  <div class="viz"><div class="viz-head"><h3>Açıklıkları bulun</h3></div><div data-viz="an06b_damak"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Damakta tek bir orta hat açıklığı arıyorsanız önce kesicileri bulun. [[K5 s. 265]] Arka yanda ise büyük palatin sinirin çıktığı açıklığı hemen arkasındaki daha küçük çıkışlardan ayırın. [[K5 s. 265–266]]</p></div>
  <h3>Gangliyona gelen lifler ve dağılımları</h3>
  <dl class="an06b-liste">
    <div><dt>Büyük petrozal yol</dt><dd>Parasempatik lifleri taşıyan büyük petrozal sinir VII’nin genikulat gangliyonundan ayrılır. [[K5 s. 264]] Petröz temporal kemiği geçip ön yüzündeki olukta, trigeminal gangliyonun derininde ilerleyerek foramen laseruma varır. [[K5 s. 264]]</dd></div>
    <div><dt>Vidian siniri</dt><dd>İnternal karotid pleksusun sempatik lifleri derin petrozal siniri oluşturur. [[K5 s. 265]] Foramen laserumda büyük ve derin petrozal sinirler birleşir, oluşan Vidian siniri pterigoid kanalı izleyerek gangliyona ulaşır. [[K5 s. 264–265]] Sekretomotor liflerin lakrimal beze giden yolu sırasıyla V₂’nin zigomatikotemporal ve V₁’in lakrimal dallarından geçer. [[K5 s. 265]]</dd></div>
    <div><dt>Duyu kökleri</dt><dd>İki sfenopalatin dal duyuyu V₂’den getirir. [[K5 s. 265]] Gangliyonun dalları burun, nazofarenks, damak ve orbitaya duyu ve sempatik vazokonstriktör lifler dağıtır. [[K5 s. 265]]</dd></div>
    <div><dt>Nazopalatin</dt><dd>Uzun sfenopalatin sinir de denen bu dal sfenopalatin foramenden mediale geçer, burun tavanını çaprazlar. [[K5 s. 265]] Septum boyunca vomerde oluk açarak öne ve aşağıya, insiziv foramenden ağız tavanı mukozasına ilerler. [[K5 s. 265]] Arka burun tavanı, septum ve kesicilere komşu ön sert damakla diş etine ince dallar verir. [[K5 s. 265]]</dd></div>
    <div><dt>Posterior superior nazal</dt><dd>Medial ve lateral dallar sfenopalatin foramenden mediale geçer. [[K5 s. 265]] Üst ve orta konkalarla septumun arka bölümüne duyu taşır. [[K5 s. 265]]</dd></div>
    <div><dt>Büyük palatin</dt><dd>Anterior palatin sinir büyük palatin kanaldan iner, palatomaksiller sütürün hemen arkasındaki büyük palatin foramenden çıkar. [[K5 s. 265]] Öne giden dalları kaninlere kadar sert damak mukozası ve diş etine, arkaya gidenler yumuşak damağın iki yüzüne dağılır. [[K5 s. 265]] Nazal dalları palatin kemiğin dik laminasındaki açıklıklardan inferior konka bölgesine ulaşır. [[K5 s. 265]]</dd></div>
    <div><dt>Küçük palatin</dt><dd>Orta ve arka palatin sinirler iki, bazen üç tanedir. [[K5 s. 266]] Büyük palatin sinirle aynı kanalda iner, palatin kemik tüberkülünün alt ve medial yüzlerinde ayrı küçük foramenlerden çıkarlar. [[K5 s. 266]] Yumuşak damak, uvula ve tonsile dağılırlar. [[K5 s. 266]]</dd></div>
    <div><dt>Alttan kemik işaretleri</dt><dd>Kesicilerden arkaya doğru kanin, premolar ve molar dişleri izlemek damaktaki çıkışları diş sırasıyla eşleştirmeyi kolaylaştırır. [[K5 s. 265]] K5’in kemik görünümünde büyük ve küçük palatin foramenlerin arkasında medial pterigoid lamina, pterigoid hamulus ve lateral pterigoid lamina da işaretlenir. [[K5 s. 265]]</dd></div>
    <div><dt>Faringeal ve orbital</dt><dd>Faringeal dal fossanın arka duvarındaki faringeal kanaldan geriye, Östaki tüpü ağzının hemen arkasındaki nazofarenks mukozasına gider. [[K5 s. 266]] İki veya üç ince orbital dal komşu periostu inerve eder, muhtemelen lakrimal beze bazı sekretomotor lifler de taşır. [[K5 s. 266]]</dd></div>
  </dl>
  <details class="note plain"><summary>Damağın önüne iki yol</summary><p>Damağa alttan bakarken önce kesici dişlerin hemen gerisindeki bölgeyi bulun. Buraya gelen nazopalatin lifler burun septumu boyunca yol aldıktan sonra orta hattaki insiziv forameni kullanır. [[K5 s. 265]] Kaninlerin yanındaki damak mukozasını geriye doğru izlediğinizde ise büyük palatin sinir üzerinden arkadaki büyük palatin foramene ulaşırsınız. [[K5 s. 265]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an06b-fossa">
  <h2>Pterigopalatin fossanın kapıları ve blok anatomisi</h2>
  <p class="intro">Orbita apeksinin altında, uzun, dar, piramidal aralık (altta ön ve arka duvarlar yaklaşır), V₂’nin dallarını burun, ağız ve orbitaya dağıtır. [[K5 s. 266–267]]</p>
  <div class="viz"><div class="viz-head"><h3>Derin ve yüzeyel blok hedeflerini karşılaştırın</h3></div><div data-viz="an06b_fossa"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Yan görünümde maksillanın arka duvarından pterigoid çıkıntıya doğru bakın ve bu aralığa ulaşan arteri bulun. [[K5 s. 266–267]] Ardından yüz görünümünde dış kantusla burun kanadı arasındaki infraorbital çıkışı arayın. [[K5 s. 268]]</p></div>
  <h3>Duvarlar, açıklıklar ve yüzey işaretleri</h3>
  <dl class="an06b-liste">
    <div><dt>Kemik sınırlar</dt><dd>Önde maksillanın arka yüzünün üst bölümü, arkada sfenoidin büyük kanadı ve pterigoid çıkıntının kökü bulunur. [[K5 s. 266]] Tavanın medialini sfenoid gövdesinin alt yüzü yapar, lateralde tavan eksiktir. [[K5 s. 266]] Medial duvar palatin kemiğin dik laminasıdır, lateral yüz genişçe açıktır. [[K5 s. 266]] Altta ön ve arka duvarlar birleşerek tabanı kapatır. [[K5 s. 266]]</dd></div>
    <div><dt>Medial kapı</dt><dd>Sfenopalatin foramen dik laminanın üst ucunda orbital ve sfenoidal çıkıntılar arasındadır. [[K5 s. 266]] Nazopalatin, medial ve lateral posterior superior nazal sinirler ile maksiller damarların eşlik eden dalları buradan burun boşluğuna geçer. [[K5 s. 266]]</dd></div>
    <div><dt>Üç arka kapı</dt><dd>Foramen rotundum V₂’yi, pterigoid kanal Vidian sinirini fossaya getirir. [[K5 s. 266]] Faringeal kanal gangliyonun faringeal dalını ve eşlik eden damarları nazofarenkse taşır. [[K5 s. 266]]</dd></div>
    <div><dt>Orbitaya açılan yol</dt><dd>Fossanın üst ucundan öne açılan alt orbital fissür maksiller ve zigomatik sinirleri, gangliyonun orbital dallarını ve infraorbital damarları geçirir. [[K5 s. 266–267]] K5, eksik lateral tavanın orbitaya açıldığı yer için üst orbital fissürün arka bölümünü, orbital dalların geçişi için de üst orbital fissürü tarif eder. [[K5 s. 266]]</dd></div>
    <div><dt>Lateral kapı</dt><dd>Pterigomaksiller fissür infratemporal fossayla bağlantı kurar. [[K5 s. 266–267]] Maksiller arter buradan içeri girerken posterior superior alveolar dal buradan çıkar ve maksillanın arka yüzündeki posterior dental kanala ulaşır. [[K5 s. 267]]</dd></div>
    <div><dt>Alt kapı</dt><dd>Büyük palatin kanalda büyük ve küçük palatin sinirlerle damarları iner, sert damağa ayrı büyük ve küçük palatin foramenlerden çıkarlar. [[K5 s. 267]]</dd></div>
    <div><dt>Maksiller blok</dt><dd>Foramen rotundumdan çıkmış V₂’nin fossada blokajı maksillanın bir yarısında anestezi sağlar. [[K5 s. 267]] Kitap akut ya da kronik herpetik nevralji, trigeminal nevralji ve en sık kanser ağrısını endikasyonlar arasında sayar. [[K5 s. 267]]</dd></div>
    <div><dt>Kemik işareti</dt><dd>Kitabın tarifinde giriş, zigomatik ark altındaki koronoid çentiğin orta noktasıdır. [[K5 s. 267]] Kafa tabanına dik yönde yaklaşık 3,5–5,0 cm derinde lateral pterigoid laminaya ulaşılır. [[K5 s. 267]] İğne biraz geri çekilerek öne ve yukarı yönlendirilir, fossaya girişte sıklıkla parestezi olur. [[K5 s. 267]]</dd></div>
    <div><dt>Damar komşuluğu</dt><dd>Kitap, genellikle görüntü yoğunlaştırıcı eşliğinde ve intravasküler yerleşimi kontrol eden aspirasyondan sonra 3–5 mL lokal anestezik tarif eder. [[K5 s. 267]] Venöz pleksus nedeniyle bazen hematom gelişir. [[K5 s. 267]]</dd></div>
    <div><dt>İnfraorbital blok</dt><dd>Daha sınırlı bir blok için infraorbital foramen genellikle dış kantusla burun kanadı arasındaki orta noktada palpe edilir. [[K5 s. 268]] Supraorbital çentik veya foramen, infraorbital foramen ve mental foramen aynı sagittal düzlemdedir. [[K5 s. 268]]</dd></div>
  </dl>
  <details class="note plain"><summary>Yüzey işaretinden derin hedefe</summary><p>Alt kapak ve üst dudak için yüzeyde aranan çıkış infraorbital foramendir. [[K5 s. 261]] [[K5 s. 264]] [[K5 s. 268]] Tüm yarım maksillanın anestezisi için tarif edilen hedef ise sinirin foramen rotundumdan çıktıktan sonraki fossa bölümüdür. [[K5 s. 267]] Lateral yaklaşımın kemik işareti pterigoid laminadır. [[K5 s. 267]] Damar komşuluğunu açıklamak için maksiller arterin fossaya giriş yönü ile venöz pleksusun yerini birlikte düşünün. [[K5 s. 267]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an06b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <div class="viz"><div data-viz="mtf" data-q="an06b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an06b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an06b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an06b-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Üst dudakta girişim için infraorbital blok planlanıyor. Hedefi yüzde nasıl bulursunuz? Uyuşmasını beklediğiniz alanları açıklayın. Blok pterigopalatin fossada yapılsaydı kapsamı nasıl değişirdi?</p></div>
  <h3>Cevap iskeleti</h3>
  <ol class="iskelet">
    <li>Dış kantus ile burun kanadı arasındaki orta noktada infraorbital forameni ararım. [[K5 s. 268]] Üstte supraorbital çentik, altta mental foramen aynı sagittal düzlemi gösterir. [[K5 s. 268]]</li>
    <li>İnfraorbital sinirin yüzdeki palpebral, nazal ve labial dallarını izlerim. [[K5 s. 264]] Alt kapak derisi ve konjonktiva, burun yanı, ön yanak ve üst dudak dağılım alanıdır. [[K5 s. 264]]</li>
    <li>Diş dallarının daha proksimalde ayrıldığını gösteririm. [[K5 s. 261]] [[K5 s. 264]] Foramen rotundum çıkışında V₂’yi hedefleyen fossa bloğu maksillanın bir yarısında anestezi sağlar. [[K5 s. 267]]</li>
    <li>Fossanın lateral girişini ve oradan geçen maksiller arteri gösteririm. [[K5 s. 267]] Venöz pleksus hematom olasılığını açıklar. [[K5 s. 267]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Yüzün bir yarısında üç forameni aynı sagittal düzlemde işaretleyin. [[K5 s. 268]] V₂’yi foramen rotundumdan orbitanın tabanına ve alt kapağa kadar izleyin. [[K5 s. 261]] [[K5 s. 264]]</div>
  <div class="note plain"><b>Ek sorular</b><ul><li>Üst kapağın iç ve dış kantusa komşu alanlarını hangi V₁ dalları paylaşır?</li><li>Lakrimal beze giden sekretomotor lif hangi noktada V₂’den V₁’e geçer?</li><li>Korneal hipoestezi hangi gangliyon girişiminden sonra görülebilir?</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="an06b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Büyük duyu kökü petröz apeks yakınında Gasser gangliyonunu oluşturur, küçük motor kök gangliyonun derininden geçer. [[K5 s. 256]]</li>
    <li>Üst orbital fissürde frontal ve lakrimal dallar halkanın üstünden, nazosiliyer dal içinden geçer. [[K5 s. 258–260]]</li>
    <li>Siliyer gangliyonda parasempatik lifler sinaps yapar, sempatik ve duyusal lifler kısa siliyer sinirlere doğrudan katılır. [[K5 s. 261]]</li>
    <li>V₂’yi foramen rotundum, pterigopalatin fossa, infraorbital oluk, kanal ve foramen boyunca izleyebilirsiniz. [[K5 s. 261]]</li>
    <li>Kesicilerin gerisindeki ön damağa nazopalatin sinir, kanin düzeyine kadar sert damağa büyük palatin sinir ulaşır. [[K5 s. 265]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="06b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/06a">← Kraniyal sinirlere giriş ve I–IV. sinirler</a><a href="#/dersler/anatomi/06c">Sonraki: Mandibular sinir ve ilişkili bloklar →</a></nav>
</section>`,
};
