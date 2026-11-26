VERI.sorular = VERI.sorular || {};
VERI.sorular['an04f-1'] = {
  no: 1, kok: 'Popliteal fossa ve baldır', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 209–215]]',
  onermeler: [
    { t: 'Sural sinir medial malleolün arkasından geçer.', d: false, n: 'Sural sinir lateral malleolün arkasından ayağın dış kenarına yönelir. [[K5 s. 211]]' },
    { t: 'Gastroknemiusun medial başına giden dal, tibial sinirin diğer popliteal kas dallarından çıkış yönüyle ayrılır.', d: true, n: 'Diğer popliteal kas dalları tibial sinirin lateral kenarından çıkar. [[K5 s. 211]]' },
    { t: 'Soleus yalnızca derin yüzünden motor dal alır.', d: false, n: 'İki daldan biri yüzeyel, diğeri derin yüzden girer. [[K5 s. 213]]' },
    { t: 'Ortak peroneal sinir fibula boynuna karşı palpe edilebilir.', d: true, n: 'Ortak peroneal sinir peroneus longusun derininde fibula boynunu dolanır. [[K5 s. 214]]' },
    { t: 'Sural bağlantı dalı her zaman sural sinire katılır.', d: false, n: 'Bağlantı oluşmadığında dal bacağın ve ayak bileğinin lateral derisine bağımsız gider. [[K5 s. 215]]' },
  ],
};
VERI.sorular['an04f-2'] = {
  no: 2, kok: 'Ayak sırtı, tabanı ve bileği', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 211–218]]',
  onermeler: [
    { t: 'Birinci lumbrikale giden dal birinci plantar dijital sinirden ayrılır.', d: true, n: 'Birinci lumbrikal medial plantar sinirden bu yolla innervasyon alır. [[K5 s. 213]]' },
    { t: 'Medial plantar sinir tabanın medial üçte ikisinin derisini inerve eder.', d: true, n: 'Aynı dal medialdeki üç buçuk parmağın plantar derisine de dağılır. [[K5 s. 213]]' },
    { t: 'Derin peroneal sinirin lateral terminal dalı birinci parmak aralığının duyusunu taşır.', d: false, n: 'Bu duyu medial terminal dala aittir. [[K5 s. 216]] Lateral dal kısa parmak ekstansörüne ve ayak eklemlerine gider. [[K5 s. 217]]' },
    { t: 'Tibial sinir medial malleol arkasında arka tibial arterin hemen posteriorundadır.', d: true, n: 'Arterin hemen arkasındaki sinir posterior tibial bloğun hedefidir. [[K5 s. 217]]' },
    { t: 'Yüzeyel peroneal sinir bloğunun subkutan enjeksiyon alanı ekstansör hallusis tendonu ile medial malleol arasıdır.', d: false, n: 'Yüzeyel peroneal için lateral malleol tarafı, safen için medial malleol tarafı seçilir. [[K5 s. 218]]' },
  ],
};
VERI.sorular['an04f-3'] = {
  no: 3, kok: 'Pelvik geçişler ve segmentler', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 218–221]]',
  onermeler: [
    { t: 'Pudendal sinir perineye büyük siyatik foramenden girer.', d: false, n: 'Büyük foramenden pelvisi terk eder ve küçük foramenden perineye girer. [[K5 s. 218]]' },
    { t: 'Anokoksigeal sinir sakrotüberöz bağı deler.', d: true, n: 'Koksigeal pleksusun tek gövdesi bu bağdan geçerek koksiks üzerindeki deriye gider. [[K5 s. 219]]' },
    { t: 'S2 arka uyluk ve arka bacağın deri duyusuna katılır.', d: true, n: 'Her iki bölgenin arka yüzü S2 alanıdır. [[K5 s. 220]]' },
    { t: 'Ayak bileği inversiyonu L4 ile ilişkilidir.', d: true, n: 'Kitap invertörler için L4, evertörler için L5 ve S1 verir. [[K5 s. 221]]' },
    { t: 'Diz fleksörleri L5 ve S1 segmentlerinden innervasyon alır.', d: true, n: 'Diz fleksiyonunun segmentleri L5–S1, ekstansiyonun segmentleri L3–L4’tür. [[K5 s. 221]]' },
  ],
};

SAYFALAR['dersler/anatomi/04f'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 4 · Ders 04f',
  baslik: 'Popliteal fossa, bacak–ayak sinirleri ve alt ekstremite dermatomları',
  lede: 'Diz arkasından ayak parmaklarına sinirleri izleyin. Ardından perineye geçişleri, deri duyusunu ve hareketleri kökleriyle eşleştirin.',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an04f-fossa"><span>01</span>Fossa</button>
  <button type="button" data-scroll="an04f-baldir"><span>02</span>Baldır</button>
  <button type="button" data-scroll="an04f-taban"><span>03</span>Ayak tabanı</button>
  <button type="button" data-scroll="an04f-peroneal"><span>04</span>Peroneal sinirler</button>
  <button type="button" data-scroll="an04f-bilek"><span>05</span>Ayak bileği</button>
  <button type="button" data-scroll="an04f-pelvis"><span>06</span>Pelvis ve perine</button>
  <button type="button" data-scroll="an04f-segment"><span>07</span>Segmentler</button>
  <button type="button" data-scroll="an04f-p1"><span>08</span>Part I</button>
  <button type="button" data-scroll="an04f-p2"><span>09</span>Part II</button>
  <button type="button" data-scroll="an04f-ozet"><span>10</span>Özet</button>
</nav>

<section class="wrap blk ders-sec" id="an04f-fossa">
<h2>Diz arkasında iki siniri ayırt etmek</h2>
<p class="intro">Popliteal fossada tibial sinir damarları yüzeyden çaprazlar, ortak peroneal sinir ise biseps femorisin medial kenarını izleyerek fibulaya yönelir. [[K5 s. 209]] [[K5 s. 214]]</p>
<div class="viz"><div data-viz="an04f_fossa"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Fossayı arkadan okuyun</h3>
<ul><li><b>Kas örtüsü.</b> Üstte sinirin medialini semimembranozus ve semitendinozus, lateralini biseps femoris örter. [[K5 s. 209]] Aşağıda gastroknemiusun iki başı siniri örter. [[K5 s. 209]]</li>
<li><b>Taban.</b> Proksimalden distale femurun popliteal yüzü, diz kapsülünün arkası ve popliteus sıralanır. [[K5 s. 209–210]] Kemik işaretleri addüktör tüberkülü ve lateral femoral kondildir. [[K5 s. 210]]</li>
<li><b>Damarlar.</b> Popliteal arter ve ven addüktör hiatustan mediale yakın girer. [[K5 s. 209–210]] Tibial sinir üstte damarların lateralindeyken alt uçta mediallerine geçmiştir. [[K5 s. 209]] Yüzeyel diseksiyonda küçük safen ven ve sural sinir de görülür. [[K5 s. 210]]</li></ul>
<h3>Tibial sinirin üç dal grubu</h3>
<ul><li><b>Kas.</b> Popliteus, gastroknemius, soleus ve plantaris tibial dallar alır. [[K5 s. 209–210]] Gastroknemiusun medial başına giden dal dışında kas dallarının tümü sinirin lateral kenarından çıkar. [[K5 s. 211]]</li>
<li><b>Deri.</b> Sural sinir (L5, S1, S2) gastroknemius başları arasından çıkar ve baldırın arka yüzünün orta düzeyinde derin fasyayı deler. [[K5 s. 211]] Ortak peroneal sinirin bağlantı dalını aldıktan sonra lateral malleolün arkasından geçer ve ayak dış kenarını beşinci parmağa kadar izler. [[K5 s. 211]] Duyu alanı baldırın distal üçte birinin posterolaterali ile ayağın ve beşinci parmağın lateralidir. [[K5 s. 211]]</li>
<li><b>Eklem.</b> Tibial sinirin fossadaki eklem dalı dize gider. [[K5 s. 210]]</li></ul>
<div class="note"><b>Popliteal siyatik blok.</b> Arkadan doğrudan veya lateral yaklaşım mümkündür. [[K5 s. 211]] Siyatik sinir bu düzeyde genellikle ayrılmıştır, bu nedenle kitap iki terminal dalın ayrı ayrı bulunup bloke edilmesini önerir. [[K5 s. 211]]</div>
<nav class="an04f-atlas" aria-label="Sinir Bloğu Atlası"><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=popliteal">Popliteal siyatik blok ↗</a>
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=ipack">iPACK bloğu ↗</a></nav>
</section>

<section class="wrap blk ders-sec" id="an04f-baldir">
<h2>Baldırda tibial sinir ve arka tibial damarlar</h2>
<p class="intro">Tibial sinir baldırda dikey inerken ona eşlik eden arka tibial damarlar sinirin bir yanından öbürüne geçer. [[K5 s. 211]]</p>
<div class="viz"><div data-viz="an04f_baldir"></div><p class="viz-cap" aria-live="polite"></p></div>
<ol><li><b>Popliteusun alt kenarı.</b> Sinir, soleusun başlangıç arkının altına girer ve tibialis posterior kası üzerinde aşağıya ilerler. [[K5 s. 211]] Yukarıda gastroknemius ve soleusun kas karınları siniri örter. [[K5 s. 211]]</li>
<li><b>Damarların kavsi.</b> Ön tibial damarların interosseöz membran üzerinden ayrılması damarları laterale çeker. [[K5 s. 211]] Arka tibial damarlar başlangıçta sinirin lateralindedir; popliteusun hemen altında siniri derinden (önden) çaprazlayıp medialinden iner. [[K5 s. 211]]</li>
<li><b>Distal bacak.</b> Sinir artık doğrudan tibia cisminin arka yüzünde ilerler ve distal üçte birde derin fasyanın hemen altında bulunur. [[K5 s. 211]] Arka diseksiyonda tibialis posteriorun yanında uzun parmak ve uzun başparmak fleksörleri, lateralde peroneus longus ve peroneal arter ayırt edilir. [[K5 s. 212]]</li></ol>
<h3>Baldırdan ayak bileğine dallar</h3>
<ul><li><b>Kaslar.</b> Tibialis posterior, fleksör digitorum longus, fleksör hallusis longus ve soleus tibial sinirden dal alır. [[K5 s. 211–213]] Soleusa biri kasın yüzeyel, diğeri derin yüzünden giren iki dal ulaşır. [[K5 s. 213]]</li>
<li><b>Deri ve eklem.</b> Medial kalkaneal sinir fleksör retinakulumu delip tabanın medialindeki deriye gider. [[K5 s. 213]] Eklem dalı ayak bileğine ulaşır. [[K5 s. 213]]</li>
<li><b>Sonlanma.</b> Medial malleol arkasında, fleksör retinakulumun altında tibial sinir medial ve lateral plantar sinirlere ayrılır. [[K5 s. 211]] Deri üzerindeki izdüşümünü medial malleol ile Aşil tendonu arasındaki orta noktadan geçen dikey çizgi verir. [[K5 s. 211]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="an04f-taban">
<h2>Ayak tabanında iki dağılım</h2>
<p class="intro">Tibial sinirin daha büyük terminal dalı medial plantar sinirdir ve dağılımı eldeki median sinire benzer. [[K5 s. 213]] Daha küçük lateral plantar dalın dağılımı ise ulnar sinirinkini andırır. [[K5 s. 213]]</p>
<div class="viz"><div data-viz="an04f_taban"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Medial plantar sinir</h3>
<ul><li><b>Yol.</b> Fleksör retinakulum altından başlayan sinir, medial plantar damarlarla abdüktör hallusisin derininden geçer. [[K5 s. 213]] Bu kasla fleksör digitorum brevis arasına yerleşir, kas dallarını verdikten sonra plantar dijital dallara ayrılır. [[K5 s. 213]]</li>
<li><b>Kaslar.</b> Abdüktör hallusis, fleksör digitorum brevis, fleksör hallusis brevis ve birinci lumbrikal medial plantar sinirden dal alır. [[K5 s. 213]] Birinci lumbrikale ulaşan dal birinci plantar dijital sinirden çıkar. [[K5 s. 213]] Median sinirle karşılaştırıldığında iki fark vardır: iki yerine bir lumbrikal ve opponens yerine kısa parmak fleksörü. [[K5 s. 213]]</li>
<li><b>Deri.</b> Tabanın medial üçte ikisi ve medialdeki üç buçuk parmağın plantar yüzü bu dala aittir. [[K5 s. 213]]</li></ul>
<h3>Lateral plantar sinir</h3>
<ul><li><b>Yüzeyel seyir.</b> Abdüktör hallusisin altından çıkan sinir, lateral plantar damarlarla birinci katmandaki fleksör digitorum brevis ve ikinci katmandaki fleksör aksesoryus arasından geçer. [[K5 s. 213]] Beşinci parmak tabanına ulaşır ve ayağın lateralinde plantar dijital dallar verir. [[K5 s. 213]]</li>
<li><b>Derin dönüş.</b> Derin dal damarlarla birlikte üçüncü katmandaki addüktör hallusis ile dördüncü katmandaki interosseöz kaslar arasından tabanı ters yönde çaprazlar. [[K5 s. 213]]</li>
<li><b>Kaslar.</b> Tüm interosseözler, ikinci–dördüncü lumbrikaller, addüktör hallusis, fleksör digiti minimi brevis, fleksör aksesoryus ve abdüktör digiti minimi lateral plantar sinirden dal alır. [[K5 s. 213–214]] Böylece medial plantar dalın inerve ettiği dört kas dışındaki küçük taban kaslarının tümü bu gruba girer. [[K5 s. 213–214]]</li>
<li><b>Deri.</b> Tabanın lateral üçte biri ve lateraldeki bir buçuk parmağın plantar yüzü bu dala aittir. [[K5 s. 214]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="an04f-peroneal">
<h2>Fibula boynundan ayak sırtına</h2>
<p class="intro">Ortak peroneal sinir (L4, L5, S1, S2), tibial sinirin yaklaşık yarısı çapındadır ve fibula boynuna karşı palpe edilebilir. [[K5 s. 214]]</p>
<div class="viz"><div data-viz="an04f_peroneal"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Fossanın tepesinden veya daha proksimalden başlayan sinir, biseps femoris ile gastroknemiusun lateral başı arasından oblik iner. [[K5 s. 214]] Biseps tendonu ve lateral kollateral bağ bu bölgenin işaretleridir. [[K5 s. 214]] Peroneus longusun derininde fibula boynunu dolanır ve burada derin ve yüzeyel dallara ayrılır. [[K5 s. 214–215]] Kitap onu alt ekstremitede palpe edilebilen tek sinir olarak tanımlar. [[K5 s. 214]]</p>
<h3>Ortak gövdenin dalları</h3>
<ul><li><b>Sural bağlantı.</b> Fossada ayrılıp gastroknemiusun lateral başı üzerinden sural sinire katılır ve onunla dağılır. [[K5 s. 215]] Bağlantı bazen oluşmaz ve dal bacağın ve ayak bileğinin lateral derisine bağımsız gider. [[K5 s. 215]]</li>
<li><b>Baldırın lateral kutanöz siniri.</b> Yine fossadan çıkıp lateral baş üzerinden iner, üst baldırın anterolateral ve posterolateral derisini inerve eder. [[K5 s. 215]]</li>
<li><b>Eklem ve terminal dallar.</b> Eklem dalı dize gider, terminal dallar derin peroneal (anterior tibial) ve yüzeyel peroneal (müskülokutanöz) sinirlerdir. [[K5 s. 215]]</li></ul>
<h3>Derin peroneal sinir</h3>
<ol><li><b>Proksimal.</b> Fibula boynu ile peroneus longus arasından başlar, ekstansör digitorum longusun üst kısmının derininden interosseöz membranın önüne geçer. [[K5 s. 215]] Bu düzeyde tibialis anterior medial, ekstansör digitorum longus lateral komşusudur. [[K5 s. 215]]</li>
<li><b>Orta ve distal.</b> Fibula cisminin ikinci ve üçüncü dörtte birinden, ekstansör digitorum longusun medialinden doğan ekstansör hallusis longus sinirin yeni lateral komşusu olur. [[K5 s. 215]] Tibialis anterior medialde kalırken sinir membran üzerinden tibianın ön yüzünün distal üçte birine iner. [[K5 s. 215]] Ayak bileğinin önünde ekstansör hallusis longus tendonu başparmağa yönelirken siniri lateralden mediale oblik çaprazlar. [[K5 s. 215]]</li>
<li><b>Damarlar.</b> Ön tibial damarlar membranın üstünden, sinir fibula boynundan gelir. [[K5 s. 215]] Membran üzerinde damarlar önce sinirin medialinde, bacağın orta düzeyinde arkasında, alt üçte birde yeniden medialindedir. [[K5 s. 215]]</li>
<li><b>Motor ve eklem dalları.</b> Tibialis anterior, ekstansör hallusis longus, ekstansör digitorum longus ve peroneus tertius motor dal alır, eklem dalı ayak bileğine gider. [[K5 s. 215]]</li>
<li><b>Ayak sırtı.</b> Medial terminal dal, dorsalis pedis arterinin lateralinde ilerler ve arter birinci–ikinci metatars tabanları arasından derine dalana kadar ona eşlik eder. [[K5 s. 216]] Birinci parmak aralığında ikiye ayrılır, tek deri alanı başparmakla ikinci parmağın birbirine bakan dorsal yüzleridir. [[K5 s. 216–217]] Lateral terminal dal ekstansör digitorum brevisin altından geçip kası inerve eder ve ayak eklemlerine ince dallar verir. [[K5 s. 217]]</li></ol>
<p>Ön diseksiyonda tibianın deri altı yüzü, tibialis anterior ve ekstansör retinakulum yer belirlemeye yardım eder. [[K5 s. 216]] Femoral sinirin safen dalı bacağın medialinde, derin peroneal sinir ise ön tibial arterle birlikte görülür. [[K5 s. 216]]</p>
<h3>Yüzeyel peroneal sinir</h3>
<p>Sinir, peroneal ve ekstansör kaslar arasındaki septumu izler. [[K5 s. 217]] Lateral komşusu önce peroneus longus, sonra peroneus brevistir, medial komşusu ise tüm seyri boyunca ekstansör digitorum longustur. [[K5 s. 217]] Her iki peroneal kasa motor, bacağın alt dış yüzüne kutanöz dallar verir. [[K5 s. 217]]</p>
<ul><li><b>Medial terminal dal.</b> Bileğin önünden geçer, bir dalı başparmağın medial kenarına, diğeri ikiye ayrılarak ikinci–üçüncü parmakların komşu dorsal yanlarına ulaşır. [[K5 s. 217]]</li>
<li><b>Lateral terminal dal.</b> Ayak sırtına ve iki dorsal dijital dalla üçüncü–dördüncü ve dördüncü–beşinci parmakların karşılıklı yanlarına dağılır. [[K5 s. 217]]</li></ul>
<div class="note"><b>Parmak sırtında iki istisna.</b> Beşinci parmağın dış kenarı sural, birinci aralık derin peroneal, geri kalan alan yüzeyel peroneal sinire aittir. [[K5 s. 217]] Lateralde sural sinirin alanı yüzeyel peroneal alana belirgin biçimde taşabilir. [[K5 s. 217]]</div>
</section>

<section class="wrap blk ders-sec" id="an04f-bilek">
<h2>Ayak bileğinde beş sinirin yüzey işaretleri</h2>
<p class="intro">Posterior tibial, sural, derin peroneal, yüzeyel peroneal ve safen sinir malleollere yakın geçer. [[K5 s. 217]] Hangilerinin bloke edileceğini cerrahi alan belirler. [[K5 s. 217]]</p>
<div class="viz"><div data-viz="an04f_bilek"></div><p class="viz-cap" aria-live="polite"></p></div>
<p><b>Medial malleolün ucundan laterale sıralayın.</b> Tibialis posterior tendonu → fleksör digitorum longus tendonu → arka tibial ven → arka tibial arter → tibial sinir → fleksör hallusis longus tendonu. [[K5 s. 211–212]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sinir</th><th>Kitapta tarif edilen yer</th></tr></thead><tbody>
<tr><td>Posterior tibial</td><td>Medial malleolün hemen posteriorunda sinir arka tibial arterin hemen arkasındadır. [[K5 s. 217]] Kitap burada 7–10 mL lokal anestezik tarif eder, iğnenin yerleştirilmesi sırasında parestezi olursa daha küçük hacmin kullanılabileceğini belirtir. [[K5 s. 217]]</td></tr>
<tr><td>Sural</td><td>Lateral malleol ile Aşil tendonu arasına subkutan infiltrasyon uygulanır. [[K5 s. 218]]</td></tr>
<tr><td>Derin peroneal</td><td>Enjeksiyon ekstansör hallusis tendonunun hemen lateraline yapılır. [[K5 s. 218]]</td></tr>
<tr><td>Yüzeyel peroneal</td><td>Ekstansör hallusis tendonu ile lateral malleol arasına subkutan enjeksiyon yapılır. [[K5 s. 218]]</td></tr>
<tr><td>Safen</td><td>Ekstansör hallusis tendonu ile medial malleol arasına subkutan infiltrasyon uygulanır, safen ven içine enjeksiyondan kaçınılır. [[K5 s. 218]]</td></tr></tbody></table></div>
</section>

<section class="wrap blk ders-sec" id="an04f-pelvis">
<h2>Siyatik foramenlerden perineye</h2>
<p class="intro">Pudendal sinirin perineye ulaşmak için izlediği dönüşü iskiyal diken üzerinde takip edebilirsiniz. [[K5 s. 218–219]]</p>
<div class="viz"><div data-viz="an04f_pelvis"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Pudendal sinirin yolu</h3>
<ol><li><b>Pelvisten çıkış.</b> Perinenin başlıca siniri olan pudendal sinir (S2–S4), sakral pleksusun alt ana dalıdır ve komşusu siyatik sinirden çok küçüktür. [[K5 s. 218]] Büyük siyatik foramenden piriformisin altında çıkar. [[K5 s. 218]]</li>
<li><b>Gluteal dönüş.</b> İnternal pudendal damarlar sinirin lateralindedir. [[K5 s. 218]] Sinir gluteal bölgede yalnızca iskiyal dikenin arkasını çaprazlayacak kadar kalır, ardından küçük siyatik foramenden perineye girer. [[K5 s. 218]]</li>
<li><b>Alcock kanalı.</b> İskioanal (iskiyorektal) fossanın lateral duvarında sinir ve damarlar obturator internusun medial yüzündeki özel fasya kompartımanında ilerler. [[K5 s. 218–219]] Sinir derin perineal aralığa ve dış genital organların derisine ulaşır. [[K5 s. 218–219]]</li></ol>
<h3>Kanaldan çıkan dallar</h3>
<ul><li><b>Alt rektal.</b> İlk ayrılan daldır, fossayı çaprazlayıp dış anal sfinkteri ve perianal deriyi inerve eder. [[K5 s. 219]]</li>
<li><b>Perineal.</b> İki terminal dalın daha büyüğüdür ve hemen ikiye ayrılır. [[K5 s. 219]] Derin dal, derin perineal aralıkta üretra sfinkteri, iskiyokavernöz, bulbospongiyöz, yüzeyel ve derin transvers perine kaslarına gider. [[K5 s. 219]] Yüzeyel dal skrotumun arka derisine ulaşır. [[K5 s. 219]]</li>
<li><b>Penisin veya klitorisin dorsal siniri.</b> Derin perineal aralığı geçer ve perineal membranı tepesine yakın deler. [[K5 s. 219]] Peniste asıcı bağı da delerek dorsal yüzü inerve eder. [[K5 s. 219]] Kadındaki dağılım çiziminde tuber iskiadikum kemik işareti olarak, alt rektal, perineal ve dorsal klitoral dallar ise ayrı ayrı gösterilir. [[K5 s. 218]]</li></ul>
<h3>Hangi açıklıktan ne geçer?</h3>
<p>Büyük ve küçük siyatik çentikleri sakrospinöz ve sakrotüberöz bağlar kapatarak karşılık gelen foramenleri oluşturur. [[K5 s. 219–220]] Büyük foramenden geçen en büyük yapı piriformistir ve açıklığı ikiye böler. [[K5 s. 219–220]]</p>
<ul><li><b>Piriformisin üstü.</b> Üst gluteal damarlar ve sinir geçer. [[K5 s. 219]]</li>
<li><b>Piriformisin altı, lateralden mediale.</b> Siyatik sinir, onun derininde kuadratus femoris siniri, yüzeyelinde uyluğun arka kutanöz siniri, ardından alt gluteal sinir ve alt gluteal damarlar yer alır. [[K5 s. 219]] Bu beş yapı iskiyumun arkasından geçerek kalçada kalır veya uyluğa iner. [[K5 s. 219]] Daha medialde sırasıyla obturator internus siniri, internal pudendal damarlar ve pudendal sinir bulunur. [[K5 s. 219]]</li>
<li><b>Küçük foramen.</b> Medialdeki bu üç yapı sakrospinöz bağı veya iskiyal dikeni çaprazlayarak hemen küçük foramene girer. [[K5 s. 219]] Bunlara katılan tek ek yapı obturator internus tendonudur. [[K5 s. 219]]</li>
<li><b>Gluteal komşular.</b> Gluteus maksimus kaldırıldığında gluteus medius, piriformis, obturator internus ve gemelli, büyük trokanter ve kuadratus femoris bu geçişlere yön verir. [[K5 s. 220]]</li></ul>
<div class="note"><b>Koksigeal pleksus.</b> Bu küçük pleksusa S4’ün bir bölümü ile S5 ve Co1’in tamamı katılır. [[K5 s. 219]] Tek gövdesi olan anokoksigeal sinir sakrotüberöz bağı delip koksiks üzerindeki deriye ulaşır. [[K5 s. 219]]</div>
</section>

<section class="wrap blk ders-sec" id="an04f-segment">
<h2>Dermatomları ve miyotomları eşleştirmek</h2>
<p class="intro">Ön uylukta kökler yukarıdan aşağıya L1, L2 ve L3 olarak sıralanırken arka uyluk ve arka bacak S2 alanındadır. [[K5 s. 220]]</p>
<div class="viz"><div data-viz="an04f_segment"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Deride kökü bulun</h3>
<ul><li><b>Ön bacak.</b> Anteromedial yüz L4, anterolateral yüz ve ayağın medial tarafı L5 alanıdır. [[K5 s. 220]]</li>
<li><b>Ayak ve arka bacak.</b> Ayağın laterali ve tabanı S1, bacakla uyluğun arkası S2 alanıdır. [[K5 s. 220]]</li>
<li><b>Kalça ve perine.</b> Kalça ve perianal bölge S3–S4 alanıdır. [[K5 s. 220]] Skrotum veya vulvanın arkası S3, önü L1 tarafından inerve edilir. [[K5 s. 221]]</li></ul>
<h3>Hareketten köke gidin</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Eklem</th><th>Hareket ve segment</th></tr></thead><tbody>
<tr><td>Kalça</td><td>Fleksiyon, addüksiyon ve iç rotasyon L2–L3 ile ilişkilidir. [[K5 s. 221]] Ekstansiyon, abdüksiyon ve dış rotasyon L3–L4 ile ilişkilidir. [[K5 s. 221]]</td></tr>
<tr><td>Diz</td><td>Ekstansörler L3–L4, fleksörler L5–S1’den innervasyon alır. [[K5 s. 221]]</td></tr>
<tr><td>Ayak bileği</td><td>Dorsifleksörler L4–L5, plantar fleksörler S1–S2’den innervasyon alır. [[K5 s. 221]] İnvertörler L4, evertörler L5–S1 ile ilişkilidir. [[K5 s. 221]]</td></tr></tbody></table></div>
</section>
<section class="wrap blk ders-sec" id="an04f-p1">
<h2>Part I · Çoklu doğru–yanlış</h2>
<p>Her önermeyi bağımsız yanıtlayın.</p>
<div class="viz"><div data-viz="mtf" data-q="an04f-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an04f-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an04f-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an04f-p2">
<h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Başparmağın plantar yüzüne ve birinci dorsal parmak aralığına müdahale edilecek. Bu iki alanın sinirlerini ayak bileğindeki işaretlerinden başlayarak nasıl izlersiniz?</p></div>
<h3>Cevap iskeleti</h3>
<ol class="iskelet"><li>Başparmağın plantar yüzüne medial plantar sinir gider. [[K5 s. 213]] Ana gövdeyi medial malleol arkasında fleksör retinakulumun altında, arka tibial arterin hemen arkasında bulun. [[K5 s. 211]] [[K5 s. 217]]</li>
<li>Medial plantar dalı abdüktör hallusisin derininden, bu kas ile fleksör digitorum brevis arasına ve plantar dijital dallara kadar izleyin. [[K5 s. 213]]</li>
<li>Birinci dorsal aralık için derin peroneal siniri ekstansör hallusis tendonunun hemen lateralinde bulun. [[K5 s. 218]] Medial terminal dalı dorsalis pedis arterinin lateralinden başparmak ile ikinci parmağın karşılıklı yüzlerine kadar izleyin. [[K5 s. 216–217]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Medial malleol ile Aşil tendonunu işaretleyin ve malleolün arkasındaki altı yapıyı sıraya koyun. [[K5 s. 211–212]]</div>
<div class="note plain"><b>Ek sorular</b><ul><li>Popliteal yaklaşımda iki dalı neden ayrı ararsınız?</li><li>Beşinci parmağın lateral kenarında hangi siniri değerlendirirsiniz?</li><li>Ayak bileği dorsifleksiyonu ile plantar fleksiyonun kökleri nelerdir?</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="an04f-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Popliteal fossada genellikle ayrılmış iki terminal dal bulunur, ortak peroneal dal fibula boynunu dolanır. [[K5 s. 211]] [[K5 s. 214]]</li>
<li>Medial ve lateral plantar sinirler tabanı paylaşır, birinci dorsal parmak aralığına derin peroneal sinir gider. [[K5 s. 213–214]] [[K5 s. 216–217]]</li>
<li>Pudendal sinir büyük siyatik foramenden çıkar, iskiyal dikenin arkasından küçük foramene ve Alcock kanalına ulaşır. [[K5 s. 218–219]]</li>
<li>Bacağın önünde L4 medial, L5 lateral alandadır, arka yüz S2’ye aittir. [[K5 s. 220]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="04f"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/04e">← Sakral pleksus ve siyatik sinir</a><a href="#/dersler/anatomi/05">Sonraki: Otonom sinir sistemi →</a></nav>
</section>`,
};
