VERI.sorular = VERI.sorular || {};
VERI.sorular['an01a-1'] = {
  no: 1, kok: 'Ağız ve damak', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 3–6]]',
  onermeler: [
    { t: 'Parotis kanalı dil frenulumunun yanına açılır.', d: false, n: 'Parotis papillası üst ikinci moların karşısında, submandibular kanal ağızları ise frenulumun iki yanındadır. [[K5 s. 3]]' },
    { t: 'Tensor palati tendonu hamulus çevresinde yön değiştirir.', d: true, n: 'Tendon içe döner ve palatin aponevroza katılır. [[K5 s. 5]]' },
    { t: 'Levator palati motor liflerini mandibular sinirden alır.', d: false, n: 'Mandibular sinirin innerve ettiği kas tensor palatidir, levatora lifler farengeal pleksusla gelir. [[K5 s. 6]]' },
    { t: 'Passavant kabartısı C2 düzeyinde oluşur.', d: true, n: 'Üst konstriktörün üst lifleri arka ve yan farenks duvarlarında enine kabartı oluşturur. [[K5 s. 6]]' },
    { t: 'Çatallı uvula tam damak yarığıdır.', d: false, n: 'Kısmi yarık yalnız uvulayı tutabilir. [[K5 s. 6]]' },
  ],
};
VERI.sorular['an01a-2'] = {
  no: 2, kok: 'Konkalar ve paranazal sinüsler', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 8–10]]',
  onermeler: [
    { t: 'Alt konka bağımsız bir kemiktir.', d: true, n: 'Üst ve orta konkalar etmoid labirentten gelişirken alt konka ayrı bir kemiktir. [[K5 s. 8]]' },
    { t: 'Arka etmoid hücreler orta meatusa açılır.', d: false, n: 'Arka grup üst meatusa, orta grup orta meatustaki bullaya boşalır. [[K5 s. 8]]' },
    { t: 'Maksiller ostium sinüsün medial duvarında yüksektedir.', d: true, n: 'Yüksek açıklık nedeniyle antrumun drenajı silyaların hareketine bağlıdır. [[K5 s. 9–10]]' },
    { t: 'Nazolakrimal kanal alt meatusun ön ucuna açılır.', d: true, n: 'Gözyaşı bu düzeyde tek başına açılan nazolakrimal kanaldan gelir. [[K5 s. 9]]' },
    { t: 'Kaş kabartısının büyüklüğü frontal sinüsün yayılımını gösterir.', d: false, n: 'Sinüsün yayılımı ile süpersiliyer kabartının büyüklüğü arasında ilişki yoktur. [[K5 s. 10]]' },
  ],
};
VERI.sorular['an01a-3'] = {
  no: 3, kok: 'Burun duyusu ve hava yolu', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 11–15]]',
  onermeler: [
    { t: 'Ön etmoidal sinir burun ucunun dış yüzünü innerve etmez.', d: false, n: 'Burun boşluğunu terk edince eksternal nazal sinir adını alır ve kıkırdak ucun hem iç hem dış yüzünün duyusunu taşır. [[K5 s. 12]]' },
    { t: 'Little alanı septumun ön-alt kesimindedir.', d: true, n: 'Vestibülün hemen içindeki bu bölge burun kanamalarının yaklaşık %90’ının kaynağıdır. [[K5 s. 11]]' },
    { t: 'Servikal sempatik blok tarafında burun pasajı tıkanabilir.', d: true, n: 'Sempatik vazokonstriktör liflerin işlev kaybı aynı tarafta tıkanıklık yapabilir. [[K5 s. 14]]' },
    { t: 'Trakeal entübasyon doğal ekspiratuvar direnci azaltır.', d: true, n: 'Üst hava yollarının yaklaşık 1–2 cmH₂O düzeyindeki direnci entübasyonla azalır. [[K5 s. 13]]' },
    { t: 'Alt konkanın arka ucundaki hipertrofi nazal tüpün geçişini güçleştirebilir.', d: true, n: 'Tüp tabanı izlerken hipertrofik arka uçta dirençle karşılaşabilir. [[K5 s. 14]]' },
  ],
};

SAYFALAR['dersler/anatomi/01a'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 1 · Ders 01a', baslik: 'Ağız, damak ve burun',
  lede: 'Dil kaldırılınca ağız tabanındaki tükürük kanalları, indirilince damak arkları görülür. [[K5 s. 3–4]] Burunda ise konkalar hem sinüslerin açıldığı düzeyleri hem nazal tüpün geçeceği yolu bulmaya yardım eder. [[K5 s. 8–9]] [[K5 s. 14]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
<button type="button" data-scroll="an01a-agiz"><span>01</span>Ağız</button>
<button type="button" data-scroll="an01a-damak"><span>02</span>Damak</button>
<button type="button" data-scroll="an01a-burun"><span>03</span>Burun duvarları</button>
<button type="button" data-scroll="an01a-sinus"><span>04</span>Sinüs drenajı</button>
<button type="button" data-scroll="an01a-antrum"><span>05</span>Sinüs komşulukları</button>
<button type="button" data-scroll="an01a-duyu"><span>06</span>Damarlar ve duyu</button>
<button type="button" data-scroll="an01a-hava"><span>07</span>Hava ve tüp</button>
<button type="button" data-scroll="an01a-p1"><span>08</span>Part I</button>
<button type="button" data-scroll="an01a-p2"><span>09</span>Part II</button>
<button type="button" data-scroll="an01a-ozet"><span>10</span>Özet</button>
</nav>
<section class="wrap blk ders-sec an01a-icerik" id="an01a-agiz">
<h2>Ağız muayenesinde hangi açıklık nerede aranır?</h2>
<p class="intro">Diş arkları, dudak ve yanakların ardındaki vestibül ile asıl ağız boşluğunu ayırt etmek için başlangıç noktasıdır. [[K5 s. 3]]</p>
<div class="viz"><div class="viz-head"><h3>Dil kaldırıldığında ağız tabanı</h3></div><div data-viz="an01a_taban"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Bölge</th><th scope="col">Muayenede izlenen sınır</th></tr></thead><tbody>
<tr><th scope="row">Vestibül</th><td>Dış sınırı dudaklar ve yanaklar, iç sınırı dişler ve diş etleridir. [[K5 s. 3]]</td></tr>
<tr><th scope="row">Ağız boşluğu</th><td>Vestibülün iç tarafında asıl ağız boşluğuna geçilir. [[K5 s. 3]] Önde maksilla ve mandibulanın alveoler arkları ile dişler, üstte sert ve yumuşak damak, arkada orofarengeal istmus bulunur. [[K5 s. 3]]</td></tr>
<tr><th scope="row">Taban</th><td>Dilin ön üçte ikisini ve dil mukozasının mandibulaya doğru öne kıvrıldığı bölümü izleyin. [[K5 s. 3]]</td></tr>
</tbody></table></div>
<p>Yüz kaslarının istirahat tonusu yanağı dişlere yakın tutar. [[K5 s. 3]] VII. sinir felcinde yanak uzaklaşır, genişleyen vestibülde yiyecek ve içecek birikir ve ağızdan sızabilir. [[K5 s. 3]]</p>
<aside class="note plain"><b>Atlas notu.</b> K5 vestibülün ağız açıklığıyla asıl ağız boşluğuna bağlandığını söyler. [[K5 s. 3]] Doğrusu, ağız açıklığı dış ortamdan vestibüle açılır, vestibül ise asıl ağız boşluğuyla diş aralıklarından ve son molarların arkasından bağlantı kurar.</aside>
<h3>Tükürük akışını izleyin</h3>
<ul class="ozet">
<li><b>Submandibular bez.</b> Aynada dili kaldırıp çene açısının altındaki beze bastırınca sublingual kıvrımın ön ucundaki Wharton kanalı ağzından tükürük çıkışı görülebilir. [[K5 s. 3–4]]</li>
<li><b>Sublingual bez.</b> Bezi örten kıvrım, submandibular kanal ağzından arkaya ve dışa uzanır. [[K5 s. 3]] Tek bir sublingual kanal ağzı aramayın. Kanalların çoğu kıvrım boyunca küçük deliklere, bir kısmı Wharton kanalına açılır. [[K5 s. 3]]</li>
<li><b>Parotis.</b> Yanağı dışa çekip aynı taraftaki beze bastırınca üst ikinci moların karşısındaki küçük papilladan tükürük çıkışı izlenebilir. [[K5 s. 3]]</li>
</ul>
<p>Ağız tabanının koronal kesitinde dil, genioglossus, hiyoglossus, geniohiyoid, milohiyoid ve digastrik kasın ön karnı seçilir. [[K5 s. 5]] Aynı kesitte sublingual bez, submandibular bez ve kanalı, lingual arter ve lingual sinir de bulunur. [[K5 s. 5]]</p>
<details class="an01a-muayene"><summary>Muayene · Yiyecek neden yanakta birikir?</summary><p>Muayenede yanak ile dişler arasına bakın. Bu aralığın açık kalması, dili kaldırınca orta hatta görülen frenulumdan ve kanalların açıldığı tabandan farklı bir bölgeyi gösterir. [[K5 s. 3–4]] VII. sinir felcinde yüz kaslarının yanağı dişlere yakın tutan tonusu kaybolabilir. [[K5 s. 3]] Bu nedenle genişleyen vestibülde hem lokma kalabilir hem de biriken sıvı dudaklardan sızabilir. [[K5 s. 3]]</p></details>
</section>

<section class="wrap blk ders-sec an01a-icerik" id="an01a-damak">
<h2>Sert damaktan hareketli damağa</h2>
<p class="intro">Sert damağın arka kenarından sarkan yumuşak damak, yutma ve konuşma sırasında nazofarenksin ağızdan ayrılmasına yardım eder. [[K5 s. 3]] [[K5 s. 6]]</p>
<div class="viz"><div class="viz-head"><h3>Uvula, damak arkları ve tonsil</h3></div><div data-viz="an01a_agiz"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet">
<li><b>Sert damak.</b> Maksillaların palatin çıkıntıları ve palatin kemiklerin yatay plakları kemik çatıyı oluşturur. [[K5 s. 3]] Çok katlı yassı mukoza periosta sıkıca bağlıdır ve ameliyatta ikisi mukoperiost olarak birlikte kaldırılır. [[K5 s. 3]]</li>
<li><b>Mukoperiostun kalınlığı.</b> Orta hat ince, küçük palatin tükürük bezlerinin yoğun olduğu yan kesimler kalındır. [[K5 s. 3]] Bu bezlerden seyrek olarak mikst tükürük bezi tümörü gelişebilir. [[K5 s. 3]]</li>
<li><b>Yumuşak damak.</b> Serbest kenar ortada uvulayı taşır, yanlarda farenks duvarına katılır. [[K5 s. 3]] Ağız yüzü çok katlı yassı, nazofarenkse bakan arka yüz silyalı silindirik epitelle örtülüdür. [[K5 s. 3]] Epitel altında lenfoid doku içindeki müköz ve seröz bezler kalın bir tabaka oluşturur. [[K5 s. 3]]</li>
</ul>
<p>Yumuşak damağın fibröz desteği palatin aponevrozdur. [[K5 s. 5]] Sert damağın arka kenarına tutunur ve iki yanda tensor palati tendonuyla devam eder, hatta tendonun genişlemesi olabilir. [[K5 s. 5]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Kas</th><th scope="col">Tutunma ve seyir</th><th scope="col">Hareket veya klinik bulgu</th></tr></thead><tbody>
<tr><th scope="row">Tensor palati</th><td>Medial pterigoid plak kökündeki skafoid fossa, Östaki kıkırdağının dış yüzü ve sfenoid dikenin iç yüzünden başlar. [[K5 s. 5]] Üst konstriktörün ve medial plağın dışından iner. [[K5 s. 5]] Tendonu farenksi delip hamulus çevresinden içe dönerek aponevroza ulaşır. [[K5 s. 5]]</td><td>Damağı gerip düzleştirir. [[K5 s. 5]]</td></tr>
<tr><th scope="row">Levator palati</th><td>Petröz temporal kemiğin alt yüzünden ve Östaki borusunun iç yüzünden damağın üst yüzüne ulaşır, karşı kasla birleşir. [[K5 s. 5]]</td><td>Damağı kaldırır. [[K5 s. 5]]</td></tr>
<tr><th scope="row">Palatoglossus</th><td>Yumuşak damaktan palatoglossal kıvrım içinde dilin yanına iner. [[K5 s. 5]]</td><td>İki palatoglossal kıvrımı yaklaştırır. [[K5 s. 5]]</td></tr>
<tr><th scope="row">Palatofarengeus</th><td>Yumuşak damaktan palatofarengeal kıvrım içinde farenksin yan duvarına iner, bazı lifleri tiroid kıkırdağın arka kenarına tutunur. [[K5 s. 5]]</td><td>İki palatofarengeal kıvrımı yaklaştırır. [[K5 s. 5]]</td></tr>
<tr><th scope="row">Uvula kası</th><td>Palatin kemiğin arka nazal dikeni hizasında aponevrozdan başlar ve uvulaya tutunur. [[K5 s. 5]]</td><td>Vagusla gelen kraniyal aksesuar liflerin hasarında uvula yukarıya ve sağlam tarafa çekilir. [[K5 s. 5]]</td></tr>
</tbody></table></div>
<p>Tensor palati motor liflerini otik gangliyon yoluyla mandibular sinirden (V3) alır. [[K5 s. 6]] Diğer dört kasa kraniyal aksesuar lifler vagus ve farengeal pleksus üzerinden ulaşır. [[K5 s. 6]]</p>
<p>Yutma ve fonasyonda üst konstriktörün üst lifleri de kapanmaya katılır. [[K5 s. 6]] C2 hizasında farenksin arka ve yan duvarlarında enine Passavant kabartısı oluşur. [[K5 s. 6]] Damak felcinde veya ileri yarık damakta ses genizden gelir ve besin buruna geri kaçabilir. [[K5 s. 6]]</p>
<h3>Yarığın uzanımı</h3>
<p>Ortadaki premaksilla ile iki lateral maksiller çıkıntının birleşmesi değişik derecelerde aksayabilir. [[K5 s. 6]] Premaksilla çoğunlukla dört, bazen yalnız iki kesici diş taşır. [[K5 s. 6]]</p>
<ul class="ozet">
<li>Tam yarık premaksillanın bir ya da iki yanından geçer, iki taraflı yarıkta premaksilla öne yer değiştirir ve belirgin bir şekil bozukluğu oluşur. [[K5 s. 6]]</li>
<li>Arka damaktaki kısmi yarık çatallı uvulayla sınırlı kalabilir, yumuşak damağa veya sert damağın arka bölümüne uzanabilir. [[K5 s. 6]]</li>
</ul>
<details class="an01a-muayene"><summary>Muayene · Uvula yukarı ve bir yana çekilmişse hangi tarafı düşünürsünüz?</summary><p>Uvula kasının motor liflerini kraniyal aksesuar kökten başlayarak vagus ve farengeal pleksus boyunca izleyin. [[K5 s. 5–6]] Tek taraflı hasarda uvula yukarı ve karşı tarafa çekildiğinden, sapma yönünün karşısı etkilenen taraftır. [[K5 s. 5]] Yutma ve fonasyonu değerlendirirken yalnız uvulanın konumuna bakmakla yetinmeyin. Nazofarenksin ağızdan ayrılmasına damak kaslarıyla birlikte farenksin arka ve yan duvarlarındaki Passavant kabartısı katılır. [[K5 s. 6]]</p></details>
</section>

<section class="wrap blk ders-sec an01a-icerik" id="an01a-burun">
<h2>Vestibülden koanaya</h2>
<p class="intro">Dış burundan giren hava, septumun birbirinden ayırdığı iki boşluktan geçerek arkadaki koanalardan nazofarenkse ulaşır. [[K5 s. 6–7]]</p>
<div class="viz"><div class="viz-head"><h3>Sağ burun boşluğunun dış duvarı</h3></div><div data-viz="an01a_konka"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Dış burnun üst iskeletini nazal kemikler, frontal kemiğin nazal bölümü ve maksillaların frontal çıkıntıları kurar. [[K5 s. 7]] Altta kıkırdaklar, merkezde destek veren septum kıkırdağı bulunur. [[K5 s. 7]] Burun kanadının dış kenarında küçük bir fibröz yağ dokusu alanı vardır. [[K5 s. 7]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Her burun yarısında</th><th scope="col">Önden arkaya ve yukarıdan aşağıya sınırlar</th></tr></thead><tbody>
<tr><th scope="row">Giriş ve çıkış</th><td>Burun deliğinin hemen gerisindeki hafif genişleme vestibüldür, alt bölümünde sert ve düz kıllar bulunur. [[K5 s. 7]] Arka burun açıklığı koanadır. [[K5 s. 7]]</td></tr>
<tr><th scope="row">Tavan</th><td>Nazal ve frontal kemikler burun köprüsünde yukarı ve arkaya yükselir. [[K5 s. 7]] Ardından yatay kribriform plak, en arkada aşağı eğimli sfenoid gövde gelir. [[K5 s. 7]]</td></tr>
<tr><th scope="row">Taban</th><td>Maksillanın palatin çıkıntısı ile palatin kemiğin yatay plağı enine, daha hafif olarak da önden arkaya içbükey bir taban oluşturur. [[K5 s. 7]]</td></tr>
<tr><th scope="row">İç duvar</th><td>Septumun bileşenleri septum kıkırdağı, etmoidin dikey plağı ve vomerdir. [[K5 s. 7]]</td></tr>
<tr><th scope="row">Dış duvar</th><td>Üstte etmoid labirentin buruna bakan yüzü, ön altta maksillanın nazal yüzü, arkada palatin kemiğin dikey plağı bulunur. [[K5 s. 8]] Üç konkanın her biri kendi meatusunun üzerine kıvrılır. [[K5 s. 8]]</td></tr>
</tbody></table></div>
<p>Yan duvarda yukarıdan aşağıya bakarken üst ve orta konkayı etmoid labirentin iç yüzüne kadar izleyin. [[K5 s. 8]] İkisi bu kemikten gelişir, en alttaki konkayı ise ayrı bir kemik oluşturur. [[K5 s. 8]]</p>
<h3>Septum deviasyonu iki tarafı nasıl tıkar?</h3>
<p>Erişkinlerin yaklaşık %75’inde bir ölçüde deviasyon vardır ve eğrilik hemen daima septumun ön kesimindedir. [[K5 s. 7–8]] K5’e göre olguların hemen tümünde köken muhtemelen travmatiktir, çocuklukta hatta doğumda hafif bir yaralanma yeterli olabilir. [[K5 s. 7–8]]</p>
<p>Kıkırdaktaki küçük kayma çoğu kez daimi dişlenme başlayıp yüz hızla büyüyünce belirginleşir. [[K5 s. 8]] Erkeklerde daha sık görülmesi travmatik köken görüşünü destekler. [[K5 s. 8]] S biçimli eğrilik veya karşı konkaların telafi edici hipertrofisi her iki pasajı tıkayabilir. [[K5 s. 8]]</p>
<details class="an01a-muayene"><summary>Kesiti okuyun · Burun tabanının hemen altında ne vardır?</summary><p>Maksillanın palatin çıkıntısı boyunca arkaya doğru ilerlediğinizde palatin kemiğin yatay plağına geçersiniz. [[K5 s. 7]] Aynı iki kemiğin alt yüzü ağız boşluğunun tavanındaki sert damağa aittir. [[K5 s. 3]] Bu ortak duvarın üstünde nazal tüpün izleyeceği taban, altında ameliyatta periostla birlikte kaldırılabilen ağız mukozası bulunur. [[K5 s. 3]] [[K5 s. 14]]</p></details>
</section>

<section class="wrap blk ders-sec an01a-icerik" id="an01a-sinus">
<h2>Hangi boşluk nereye açılır?</h2>
<p class="intro">Paranazal sinüsler burun yan duvarından gelişen ve burun boşluğuna açılan ceplerdir. [[K5 s. 9]]</p>
<div class="viz"><div class="viz-head"><h3>Yan duvarda drenaj düzeyini seçin</h3></div><div data-viz="an01a_drenaj"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Konkadan açıklığa</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Yan duvarda bakılacak yer</th><th scope="col">Buraya ne boşalır?</th></tr></thead><tbody>
<tr><th scope="row">Üst konkanın üstü ve arkası</th><td>Sfenoid sinüsü ararken üst meatusun üzerine çıkın ve sfenoetmoidal resesi bulun. [[K5 s. 8]]</td></tr>
<tr><th scope="row">Üst meatus</th><td>Üst konkanın altındaki geçide arka etmoid hücreler açılır. [[K5 s. 8]]</td></tr>
<tr><th scope="row">Orta meatus</th><td>Maksiller sinüs, ön ve orta etmoid hücreler ile frontal sinüs bu düzeye drene olur. [[K5 s. 8–9]] Frontonazal kanal olguların yaklaşık yarısında infundibuluma ulaşır, kalanlarda doğrudan orta meatusun ön ucuna girer. [[K5 s. 8–9]]</td></tr>
<tr><th scope="row">Alt meatus</th><td>Ön uçtaki tek açıklıktan gözyaşı gelir, buraya açılan yapı nazolakrimal kanaldır. [[K5 s. 9]]</td></tr>
</tbody></table></div>
<p>Sfenoetmoidal reses kısa üst konka ile sfenoid gövdenin ön yüzü arasındadır. [[K5 s. 8]] Orta meatusta orta etmoid hücreler etmoid bullayı kabartır ve yüzeyine açılır. [[K5 s. 8]] Bullanın altındaki semilunar hiatus, önde kıvrılıp ön etmoid hücrelerin boşaldığı infundibulumu oluşturur. [[K5 s. 8]]</p>
<p>Sinüslerin boyutu ve yayılımı kişiye göre değişir, iki taraf nadiren simetriktir. [[K5 s. 9]] Yenidoğanda maksiller ve sfenoid taslaklar vardır. [[K5 s. 9]] Diğer sinüsler daimi dişlerin sürmesi ve yüzün uzamasıyla yaklaşık 7–8 yaşında belirginleşir, sinüsler tam boyutlarına ancak ergenlikte ulaşır. [[K5 s. 9]]</p>
</section>

<section class="wrap blk ders-sec an01a-icerik" id="an01a-antrum">
<h2>Sinüslerin komşulukları</h2>
<p class="intro">En büyük sinüs olan Highmore antrumu maksilla gövdesinde piramit biçimindedir. [[K5 s. 9]] Piramidin tabanı burun yan duvarına dayanır, tepesi dışa, zigomatik çıkıntıya yönelir. [[K5 s. 9]]</p>
<div class="viz"><div class="viz-head"><h3>Maksiller sinüsün komşuları</h3></div><div data-viz="an01a_antrum"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet">
<li><b>Alt duvar.</b> Sinüs alveoler çıkıntıya uzanır, bu çıkıntı burun tabanının yaklaşık 1,25 cm altındadır. [[K5 s. 9]] En az birinci ve ikinci moların kökleri kabarıklık yapar. [[K5 s. 9]] Sayı değişebilir, kanin, premolar ve molar dişlerin tümü iz bırakabilir ve bir veya birkaç kök tabanı delebilir. [[K5 s. 9]]</li>
<li><b>Tavan.</b> Maksillanın orbital plağı aynı zamanda maksiller sinirin infraorbital dalının geçtiği kanalı taşır. [[K5 s. 9]]</li>
<li><b>İç duvar.</b> Orta meatusa açılan ostium yüksekte olduğundan drenajı duvardaki silyalar sağlar. [[K5 s. 9–10]] Orta meatusa açılan bir veya daha çok ek ostium bulunabilir. [[K5 s. 10]]</li>
</ul>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Diğer sinüsler</th><th scope="col">Yer ve değişkenlik</th></tr></thead><tbody>
<tr><th scope="row">Sfenoid</th><td>Sfenoid gövdede yan yana durur, bazen bazisfenoide ve klinoid çıkıntılara uzanırlar. [[K5 s. 10]] Boyutları nadiren eşittir, septumları genellikle eksiktir. [[K5 s. 10]]</td></tr>
<tr><th scope="row">Frontal</th><td>Frontal kemikte orbitaların ve burun kökünün üstündedirler. [[K5 s. 10]] Boyutları genellikle farklıdır, septumları eksik olabilir ve yayılımları kaş kabartılarının büyüklüğünden kestirilemez. [[K5 s. 10]]</td></tr>
<tr><th scope="row">Etmoid</th><td>Yaklaşık 8–10 hava hücresi kribriform plağın dış ucundan sarkar, dışta etmoidin orbital plağıyla sınırlanır. [[K5 s. 10]] Burun yan duvarının üst kesiminde kemik septumlar hücreleri ön, orta ve arka gruplara ayırır. [[K5 s. 10]]</td></tr>
</tbody></table></div>
<p>Yan duvarı incelerken iki açıklığı ayırın. [[K5 s. 9]] Nazolakrimal kanal burunda alt meatusun önüne açılırken Östaki borusunun ağzı şekilde arkada ayrı bir açıklık olarak görülür. [[K5 s. 9]]</p>
<p>Koronal kesitte orta hattaki crista galli, septum ve sert damak ile yanlardaki orbita, etmoid hücreler, konkalar ve maksiller antrum arasındaki ilişki izlenebilir. [[K5 s. 10]]</p>
<details class="an01a-muayene"><summary>Kesiti okuyun · Bir molar kökü ile sinüs ostiumu aynı düzeyde midir?</summary><p>Önce kökü bulun, ardından sinüsün iç duvarını yukarı doğru izleyin. Molar kökleri aşağıda alveoler çıkıntıya uzanan sinüs tabanında kabarıklık oluştururken, doğal ostium medial duvarın üst bölümünde kalır. [[K5 s. 9–10]] Bu yüzden tabandaki içeriğin buruna taşınması için duvarı döşeyen silyaların çalışması önemlidir. [[K5 s. 10]] Orbitaya doğru bakıldığında ise sinir için aranacak yer, sinüs tavanındaki infraorbital kanaldır. [[K5 s. 9]]</p></details>
</section>

<section class="wrap blk ders-sec an01a-icerik" id="an01a-duyu">
<h2>Burunda damar ve sinir dağılımı</h2>
<p class="intro">Burun vestibülünün hemen iç tarafındaki ön-alt septumda yüzeyel damarlar birleşir ve burun kanamalarının yaklaşık %90’ı bu Little alanından kaynaklanır. [[K5 s. 11]] [[K5 s. 13]]</p>
<div class="viz"><div class="viz-head"><h3>Septumdan venöz bağlantılara</h3></div><div data-viz="an01a_damar"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Damarları örten mukoza Little alanında incelir ve damarlar yüzeyden görülebilir. [[K5 s. 13]] Burun içinde veya yakınındaki çıban ve diğer enfeksiyonların tehlikesi, venlerin kafa içine uzanan bağlantılarından kaynaklanır. [[K5 s. 11]]</p>
<h3>Koku alanı ve genel duyu</h3>
<p>Olfaktör sinir (I), septum ve yan duvarların en üstündeki yaklaşık 2 cm²’lik özelleşmiş alana dağılır. [[K5 s. 11]] Genel duyuyu trigeminal sinirin oftalmik bölümünden (V1) nazosiliyer dallar ve maksiller bölümünden (V2) gelen dallar taşır. [[K5 s. 11]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Duyu alanı</th><th scope="col">Siniri izleyin</th></tr></thead><tbody>
<tr><th scope="row">Septum</th><td>Büyük kısmını pterigopalatin gangliyon üzerinden V2’den gelen nazopalatin sinir, arka-üst köşeyi aynı kaynaktan medial arka üst nazal dallar innerve eder. [[K5 s. 11]] Ön kesim nazosiliyer sinirin dalı olan ön etmoidal sinirin septal dallarına aittir. [[K5 s. 11–12]]</td></tr>
<tr><th scope="row">Üst ve orta konkalar</th><td>Bu düzeyde yan duvarın duyusunu lateral arka üst nazal sinir taşır. [[K5 s. 12]]</td></tr>
<tr><th scope="row">Alt konka</th><td>Ön üst alveoler sinir infraorbital kanalda maksiller sinirden ayrılır. [[K5 s. 12]] Alt konka bu sinirden ve pterigopalatin gangliyondan gelen büyük (ön) palatin sinirden dallar alır. [[K5 s. 12]]</td></tr>
<tr><th scope="row">Konkaların önü ve burun ucu</th><td>Ön etmoidal sinir öndeki yan duvara dal verir, nazal kemikle üst nazal kıkırdak arasından çıkar ve eksternal nazal sinir olarak dış yüze dağılır. [[K5 s. 12]] Böylece kıkırdak ucun hem iç hem dış yüzünün duyusunu taşır. [[K5 s. 12]]</td></tr>
<tr><th scope="row">Palatin dalların tanınması</th><td>Yan duvarın sinirlerini gösteren çizimde ön palatin dal büyük palatin, arka palatin dallar ise küçük palatin sinirler adıyla gösterilir. [[K5 s. 12]] Nazopalatin sinirin sonlanması da aynı görünümde işaretlidir. [[K5 s. 12]]</td></tr>
<tr><th scope="row">Taban ve vestibül</th><td>Tabanın önünü ön üst alveoler, arkasını büyük palatin sinir innerve eder. [[K5 s. 12]] Vestibüle V2’nin infraorbital dalının uçları ulaşır, bunlar burnun hemen yanındaki ve altındaki deriye de dağılır. [[K5 s. 12]]</td></tr>
<tr><th scope="row">Maksiller sinüs (V2)</th><td>Tavana infraorbital, tabana ön palatin, medial duvara medial arka üst nazal ve büyük palatin sinirler gider. [[K5 s. 12]] Ön, arka ve dış duvarları üst alveoler dallar innerve eder. [[K5 s. 12]]</td></tr>
<tr><th scope="row">Diğer sinüsler (V1)</th><td>Etmoid ve sfenoid sinüslere ön ve arka etmoidal, frontal sinüse supraorbital ve supratroklear sinirler dağılır. [[K5 s. 12–13]]</td></tr>
</tbody></table></div>
<details class="an01a-muayene"><summary>Siniri izleyin · Burun ucunda iç ve dış yüzün duyusu nerede birleşir?</summary><p>Konkaların önündeki mukozadan başlayın. Burada genel duyu nazosiliyer sinirin ön etmoidal dalına aittir. [[K5 s. 12]] Aynı dalın nazal kemik ile üst nazal kıkırdak arasından çıktığı noktayı geçince adı eksternal nazal sinir olur. [[K5 s. 12]] Vestibülden burun kanadının yanına veya altına yöneldiğinizde ise infraorbital sinirin uç dallarının alanına geçersiniz. [[K5 s. 12]]</p></details>
</section>

<section class="wrap blk ders-sec an01a-icerik" id="an01a-hava">
<h2>Havanın ve nazal tüpün izlediği yollar</h2>
<p class="intro">Burunda hava ısınır, nemlenir ve süzülür. [[K5 s. 13]] Nazal entübasyonda dar bir geçit, tüpün ilerlemesini güçleştirebilir. [[K5 s. 14]]</p>
<div class="viz"><div class="viz-head"><h3>Havanın kavisli yolu ve tüpün taban boyunca geçişi</h3></div><div data-viz="an01a_yol"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Solunum yüzeyi</h3>
<ul class="ozet">
<li>Vestibülün çok katlı yassı epitelinde sert, düz kıllar, yağ ve ter bezleri bulunur. [[K5 s. 13]] Olfaktör alan dışında kalan iç yüzü uzun silyalı silindirik hücreler ve aralarındaki mukus salgılayan goblet hücreleri örter. [[K5 s. 13]] Bu epitel sinüslere kesintisiz uzanır. [[K5 s. 13]]</li>
<li>Alttaki damardan zengin bağ dokusunda lenfoid kümeler, müköz ve seröz bezler vardır. [[K5 s. 13]] Septumun çoğunda ve konkalar üzerinde kalın ve kadifemsi olan örtü, Little alanında, meatuslarda ve tabanda incedir. [[K5 s. 13]]</li>
<li>Burun ve sinüs mukozası periosta veya perikondriuma sıkıca yapışır. [[K5 s. 13]] Cerrahide sert damaktaki gibi bu örtü alttaki tabakayla birlikte mukoperiost olarak sıyrılır. [[K5 s. 13]]</li>
</ul>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">İşlev</th><th scope="col">Mekanizma</th></tr></thead><tbody>
<tr><th scope="row">Isıtma</th><td>Boylamasına uzanan kavernöz damar pleksusları havayı nazofarenkse ulaşana kadar vücut sıcaklığına getirir. [[K5 s. 13]]</td></tr>
<tr><th scope="row">Nemlendirme</th><td>Su kısmen müköz ve seröz bezler ile goblet hücrelerinden, esas olarak da mukozal yüzeylerden sızarak gelir. [[K5 s. 13]] Hava neredeyse %100 doygunluğa ulaşır. [[K5 s. 13]]</td></tr>
<tr><th scope="row">Süzme</th><td>Burun ve sinüs mukusu parçacıkları tutar, silyalar mukusu farenkse taşır ve mukus yutulur. [[K5 s. 13]] Refleks hapşırma da irritanları uzaklaştırır. [[K5 s. 13]]</td></tr>
<tr><th scope="row">Koku ve ses</th><td>Burun koku alır ve konuşma sırasında rezonans sağlar. [[K5 s. 13]]</td></tr>
</tbody></table></div>
<p>Doğuştan güçlü burun solunumu refleksi, özellikle emerken bebek için önemlidir. [[K5 s. 13]] Bu yüzden burun tıkanıklığı belirgin rahatsızlık yaratabilir. [[K5 s. 13]] Koanal atrezi yenidoğanda siyanoza, ameliyat sonrası burun tamponu ise anesteziden uyanırken huzursuzluğa yol açabilir. [[K5 s. 13]]</p>
<p>Üst hava yolunun yaklaşık 1–2 cmH₂O düzeyindeki doğal ekspiratuvar direnci farkında olmadan artırılabilir ve sürekli pozitif hava yolu basıncı sağlayabilir. [[K5 s. 13]] Trakeal entübasyon bu direnci azaltır. [[K5 s. 13]]</p>
<p>Genel ısınma refleks hiperemiye, soğuma vazokonstriksiyona yol açar. [[K5 s. 13–14]] Sıcak odada tıkanan burnun soğukta açılması buna bağlıdır. [[K5 s. 14]] Servikal sempatik blok sonrası Horner sendromunda vazokonstriktör liflerin felci, blok tarafındaki pasajı tıkayabilir. [[K5 s. 14]]</p>
<h3>Nazal entübasyonda direnç ve kavis</h3>
<ul class="ozet">
<li><b>Direncin yeri.</b> Alt konkanın arka ucu hipertrofik olabilir ve tüpün geçişini engelleyebilir. [[K5 s. 14]] Kuvvet uygulanmamalıdır, burun ve arka farenks duvarının hassas mukozası kolay yırtılır. [[K5 s. 14]]</li>
<li><b>Yaralanma.</b> Tüpün arka farenks duvarını delip retrofarengeal boşluğa girdiği olgular bildirilmiştir. [[K5 s. 14]] Posterior etmoidal damarların yaralanması ağır kanayabilir, internal karotis–oftalmik arter kökeni nedeniyle proksimal ligasyonla kontrol edilemez. [[K5 s. 14]]</li>
<li><b>Nazofarenksten sonra.</b> Öne kavisli bir tüp kör ilerleyebilir, daha esnek tüpleri ses tellerinden geçirmek için sıklıkla Magill pensiyle yardım gerekir. [[K5 s. 14–15]] İyi kavisli rijit tüp kör girişimin başarı şansını ve ön trakea duvarında travma olasılığını birlikte artırabilir. [[K5 s. 15]]</li>
<li><b>Doğrulama.</b> Deneyimli uygulayıcı bir eliyle larinksi yönlendirirken diğeriyle entübasyonu gerçekleştirebilir. [[K5 s. 15]] Tüp geçişi laringoskopide görülerek veya ekshale edilen CO₂ kapnografiyle ölçülerek doğrulanabilir. [[K5 s. 15]]</li>
</ul>
<details class="an01a-muayene"><summary>Klinik bağlantı · Tıkalı bir burunda aynı bulgunun üç açıklaması</summary><p>Yapısal bir darlık ararken ön septumun eğriliğini, karşı konkadaki büyümeyi ve alt konkanın arka ucunu ayrı ayrı değerlendirin. [[K5 s. 8]] [[K5 s. 14]] Sıcak ortamda artıp soğuğa çıkınca azalan tıkanıklıkta mukoza damarlarının refleks yanıtı rol oynar. [[K5 s. 13–14]] Servikal sempatik bloktan sonra ise vazokonstriktör liflerin felci nedeniyle tıkanıklığın tarafı blok tarafıyla örtüşebilir. [[K5 s. 14]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an01a-p1">
<h2>Part I · Çoklu doğru / yanlış</h2><p>Her önermeyi ayrı değerlendirin, ardından açıklamayı açın.</p>
<div class="viz"><div data-viz="mtf" data-q="an01a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an01a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an01a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an01a-p2">
<h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir hastada nazotrakeal tüpü ilerletirken dirençle karşılaşıyorsunuz. Tüpün yolunu, direncin olası anatomik nedenlerini ve zorlamanın sonuçlarını anlatın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Önde vestibülü, içte septumu, dışta alt konkayı belirlerim. [[K5 s. 7–8]]</li>
<li>Taban boyunca doğrudan arkaya, alt konkanın altındaki geçide yönelirim. [[K5 s. 14]]</li>
<li>Ön septumdaki deviasyon, karşı konkadaki telafi edici büyüme veya alt konkanın hipertrofik arka ucu pasajı daraltabilir. [[K5 s. 8]] [[K5 s. 14]]</li>
<li>Kuvvet uygulamak mukozayı yırtabilir, tüpü retrofarengeal boşluğa yöneltebilir veya posterior etmoidal damarları yaralayabilir. [[K5 s. 14]]</li>
<li>Nazofarenkste tüp öne kıvrılır, esnek tüpü ses tellerinden geçirmek için Magill pensi gerekebilir. [[K5 s. 14–15]]</li>
<li>Geçişi laringoskopiyle görerek veya kapnografiyle ekshale edilen CO₂’yi saptayarak doğrularım. [[K5 s. 15]]</li>
</ol><div class="cols"><div class="note"><b>Çizin.</b> Burun yan duvarında üç konkayı gösterin. Tüpü taban boyunca arkaya, ardından nazofarenkste öne kıvrılırken çizin. [[K5 s. 8]] [[K5 s. 14]]</div>
<div class="note plain"><b>Ek sorular</b><ul><li>Ön-alt septumdaki kanama odağını hangi arterler besler?</li><li>Frontal sinüsün iki drenaj yolu nedir?</li><li>Damak felci sesi ve yutmayı nasıl etkiler?</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="an01a-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Üst ikinci molar parotis papillasını, dil frenulumu submandibular kanal ağızlarını buldurur. [[K5 s. 3–4]]</li>
<li>Damağı geren kasın motor siniri V3’tür, diğer dört kasa lifler vagus ve farengeal pleksusla ulaşır. [[K5 s. 5–6]]</li>
<li>Orta meatus maksiller, frontal, ön ve orta etmoidal drenajın buluştuğu düzeydir. [[K5 s. 8–9]]</li>
<li>Yan duvarların ve septumun en üstündeki küçük koku alanı I. sinire, burun genel duyusu V1 ve V2’ye aittir. [[K5 s. 11]]</li>
<li>Solunan hava yukarı kavis çizer, nazal tüp alt konkanın altından tabanı izler. [[K5 s. 13–14]]</li>
</ul><div data-viz="tamam" data-modul="anatomi" data-bolum="01a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi">← İçindekiler</a><a href="#/dersler/anatomi/01b">Sonraki: Farinks ve yutma →</a></nav>
</section>`,
};
