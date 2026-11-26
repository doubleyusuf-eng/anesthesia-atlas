VERI.sorular = VERI.sorular || {};
VERI.sorular['an04e-1'] = {
  no: 1, kok: 'Sakral pleksusun pelvis içindeki ilişkileri', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 201–204]]',
  onermeler: [
    { t: 'S4 ön dalının tamamı sakral pleksusa katılır.', d: false, n: 'Yanlış. S4 liflerinin bir bölümü sakral, kalanı koksigeal pleksusa gider. [[K5 s. 201–202]]' },
    { t: 'Lumbosakral trunkus S1 ile sakroiliak eklemin önünde birleşir.', d: true, n: 'Doğru. L4 ve L5 lifleri pelvis girişini aşarak burada S1’e katılır. [[K5 s. 202]]' },
    { t: 'İliolomber damarlar S1 ile S2 arasından geçer.', d: false, n: 'Yanlış. Bu damarların geçiş aralığı L4 ile L5 arasındadır. [[K5 s. 203]]' },
    { t: 'İnternal pudendal damarlar siyatik ve pudendal sinirler arasındadır.', d: true, n: 'Doğru. İki terminal sinir arasındaki aralıktan internal pudendal arter ve ven geçer. [[K5 s. 203]]' },
    { t: 'Pleksus piriformisin arka yüzündedir.', d: false, n: 'Yanlış. Köklerin birleştiği bant piriformisin pelvik yüzündedir. [[K5 s. 202]]' },
  ],
};
VERI.sorular['an04e-2'] = {
  no: 2, kok: 'Gluteal bölgede kas ve deri dalları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 204–205]]',
  onermeler: [
    { t: 'Üst gluteal sinir piriformisin üstünden çıkar.', d: true, n: 'Doğru. Üst gluteal sinire aynı adlı damarlar eşlik eder. [[K5 s. 204]]' },
    { t: 'Obturator internus siniri üst gemellusa dal verir.', d: true, n: 'Doğru. Bu dal sinirin gluteal bölgedeki kısa seyrinden ayrılır. [[K5 s. 204]]' },
    { t: 'Perforan kutanöz sinir kalçanın inferolateral derisine gider.', d: false, n: 'Yanlış. Sakrotüberöz bağı delen sinir kalçanın inferomedial derisine ulaşır. [[K5 s. 205]]' },
    { t: 'Uyluğun posterior kutanöz siniri foramenden çıkarken siyatik sinirin medialindedir.', d: true, n: 'Doğru. İki sinir de piriformisin altından geçer. [[K5 s. 205]]' },
    { t: 'Alt gluteal sinir gluteus minimusun derin yüzüne girer.', d: false, n: 'Yanlış. Alt gluteal sinirin ulaştığı kas gluteus maksimustur. [[K5 s. 205]]' },
  ],
};
VERI.sorular['an04e-3'] = {
  no: 3, kok: 'Siyatik sinir ve tibial bileşen', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 205–209]]',
  onermeler: [
    { t: 'Siyatik sinirin iki bileşeni başlangıçtan itibaren ayrı olabilir.', d: true, n: 'Doğru. Ayrılma popliteal fossanın tepesinden sakral pleksusa kadar herhangi bir düzeyde olabilir. [[K5 s. 205]]' },
    { t: 'Siyatik sinir içindeki eşlikçi arter alt gluteal arterden gelir.', d: true, n: 'Doğru. Bu damar siyatik sinirin içinde distale ilerler. [[K5 s. 206]]' },
    { t: 'Biseps femorisin kısa başı tibial bileşenden dal alır.', d: false, n: 'Yanlış. Kısa başa giden dal siyatik sinirin lateralindeki ortak peroneal bileşenden çıkar. [[K5 s. 209]]' },
    { t: 'Tibial sinir popliteal damarları yüzeyelden çaprazlar.', d: true, n: 'Doğru. Yukarıda damarların lateralindeyken aşağıda mediale geçer. [[K5 s. 209]]' },
    { t: 'Biseps femorisin uzun başı siyatik siniri yüzeyelden çaprazlar.', d: true, n: 'Doğru. Uzun başın oblik seyri medialden laterale doğrudur. [[K5 s. 206]]' },
  ],
};

SAYFALAR['dersler/anatomi/04e'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 4 · Ders 04e', baslik: 'Sakral pleksus ve siyatik sinir',
  lede: 'Piriformisi bulun, siyatik sinirin kalçadan uyluğa seyrini izleyin ve bu seyri yüzeydeki kemik işaretleriyle eşleştirin.',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an04e-pleksus"><span>01</span>Kökler</button>
  <button type="button" data-scroll="an04e-rotator"><span>02</span>Kas dalları</button>
  <button type="button" data-scroll="an04e-kutan"><span>03</span>Deri ve vissera</button>
  <button type="button" data-scroll="an04e-siyatik"><span>04</span>Siyatik sinir</button>
  <button type="button" data-scroll="an04e-yuzey"><span>05</span>Yüzey işaretleri</button>
  <button type="button" data-scroll="an04e-labat"><span>06</span>Blok ve enjeksiyon</button>
  <button type="button" data-scroll="an04e-tibial"><span>07</span>Tibial sinir</button>
  <button type="button" data-scroll="an04e-p1"><span>08</span>Part I</button>
  <button type="button" data-scroll="an04e-p2"><span>09</span>Part II</button>
  <button type="button" data-scroll="an04e-ozet"><span>10</span>Özet</button>
</nav>

<section class="wrap blk ders-sec" id="an04e-pleksus">
  <h2>Pelviste kökler ve damar geçişleri</h2>
  <p class="intro">Olağan düzende sakral pleksusa L4 ve S4’ün birer bölümü ile L5, S1, S2 ve S3 ön dallarının tamamı katılır. [[K5 s. 201]]</p>
  <div class="viz"><div class="viz-head"><h3>Pelvis girişinden sakruma</h3></div><div data-viz="an04e_pleksus"></div><p class="viz-cap" aria-live="polite"></p></div>

  <p>Sakral ve koksigeal ön dalların bağlantıları değişebilir. [[K5 s. 201]] S4’ün kalan lifleri, S5 ve koksigeal sinirin ön dalı koksigeal pleksusu oluşturur. [[K5 s. 201–202]]</p>
  <ul class="ozet">
    <li><b>Lumbosakral trunkus.</b> L4’ten ayrılan lifler, psoasın medial kenarında ve obturator sinirin medialinde L5’in tüm ön dalıyla birleşir. [[K5 s. 202]] Trunkus pelvis giriş kenarını aşar ve sakroiliak eklemin önünde S1’e katılır. [[K5 s. 202]]</li>
    <li><b>Sakral çıkışlar.</b> S1–S4 ön sakral foramenlerden çıkar. [[K5 s. 202]] S5, sakrumun alt lateral köşesi ile koksiksin transvers çıkıntısı arasından geçer. [[K5 s. 202]] Birinci koksigeal sinir bu çıkıntının altından, koksigeal kası delerek çıkar. [[K5 s. 202]]</li>
    <li><b>Pelvisin arka duvarı.</b> Sakral pleksusun kökleri pelvik fasyanın arkasında, piriformisin ön yüzünde geniş bir bantta birleşir. [[K5 s. 202]] Koksigeal pleksus ise koksigeusun ön yüzündedir. [[K5 s. 203]]</li>
    <li><b>Ön komşular.</b> İnternal iliak damarlar ve üretere solda sigmoid kolon, sağda distal ileum ansları eşlik eder. [[K5 s. 202–203]] K5’in pelvis görünümünde sempatik zincir, dış iliak damarlar ve obturator sinir de işaretlidir. [[K5 s. 203]]</li>
  </ul>
  <h3>Hangi arter ve ven çifti nereden geçer?</h3>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Damar çifti</th><th>Pleksus içindeki aralık</th></tr></thead><tbody>
    <tr><td>İliolomber</td><td>L4 ile L5 kökleri arası. [[K5 s. 203]]</td></tr>
    <tr><td>Üst gluteal</td><td>Lumbosakral trunkus ile S1 ya da S1 ile S2 arası. [[K5 s. 203]]</td></tr>
    <tr><td>Alt gluteal</td><td>S1 ile S2 ya da S2 ile S3 arası. [[K5 s. 203]]</td></tr>
    <tr><td>İnternal pudendal</td><td>Siyatik sinir ile pudendal sinir arası. [[K5 s. 203]]</td></tr>
  </tbody></table></div>
</section>

<section class="wrap blk ders-sec" id="an04e-rotator">
  <h2>Piriformisin üstünden ve altından geçen dallar</h2>
  <p class="intro">Sakral pleksusun terminal dalları siyatik ve pudendal sinirlerdir (pudendal sinir S2–S4). [[K5 s. 202–204]] Kollateral dallar kasa, deriye ve pelvik visseraya dağılır. [[K5 s. 204]]</p>
  <div class="viz"><div class="viz-head"><h3>Derin gluteal kasları bulun</h3></div><div data-viz="an04e_rotator"></div><p class="viz-cap" aria-live="polite"></p></div>

  <dl class="an04e-dallar">
    <dt>Üst gluteal sinir · L4, L5, S1</dt><dd>Büyük siyatik foramenin piriformis üstündeki bölümünden yalnız bu sinir ve üst gluteal damarlar geçer. [[K5 s. 204]] Sinir gluteus medius, gluteus minimus ve tensor fasya latayı inerve eder. [[K5 s. 204]]</dd>
    <dt>Alt gluteal sinir · L5, S1, S2</dt><dd>Aynı foramenin alt bölümünden çıkar ve gluteus maksimusa derin yüzünden girer. [[K5 s. 205]]</dd>
    <dt>Kuadratus femoris siniri · L4, L5, S1</dt><dd>Piriformisin altından geçer ve iskium ile siyatik sinir arasında iner. [[K5 s. 204]] Kalça ekleminin arkasında, gemellusların ve obturator internus tendonunun derininde kuadratus femorise ulaşır. [[K5 s. 204]] Alt gemellusu da inerve eder ve kalça eklemine ince bir dal verir. [[K5 s. 204]]</dd>
    <dt>Obturator internus siniri · L5, S1, S2</dt><dd>Piriformisin altından büyük siyatik forameni geçer ve gluteal bölgede üst gemellusa dal verir. [[K5 s. 204]] Spina iskiadikayı çaprazlarken internal pudendal damarlar medialinde, siyatik sinir lateralindedir. [[K5 s. 204]] Küçük siyatik foramenden iskiyorektal fossanın lateral duvarına dönerek obturator internusa ulaşır. [[K5 s. 204]]</dd>
    <dt>Piriformis siniri · S1, S2</dt><dd>Kısa seyirle kasın pelvik yüzüne girer ve bazen iki dala ayrılır. [[K5 s. 204]]</dd>
    <dt>Pelvis tabanına giden kas dalları · S4</dt><dd>S4 trunkusunun dalları levator ani ve koksigeusa pelvik yüzden girer. [[K5 s. 205]] İnce perineal dal koksigeusu deler, iskiyorektal fossaya girer ve eksternal anal sfinktere iner. [[K5 s. 205]]</dd>
  </dl>
</section>

<section class="wrap blk ders-sec" id="an04e-kutan">
  <h2>Uyluğun arka yüzünden perineye duyu dağılımı</h2>
  <p class="intro">Uyluğun posterior kutanöz siniri (S1–S3), büyük siyatik foramenden piriformisin altında ve siyatik sinirin medialinde çıkar. [[K5 s. 205]]</p>
  <div class="viz"><div class="viz-head"><h3>Kalça kıvrımından baldıra</h3></div><div data-viz="an04e_kutan"></div><p class="viz-cap" aria-live="polite"></p></div>

  <ul class="ozet">
    <li><b>Arka uyluk ve baldır.</b> Posterior kutanöz sinir baldır ortasına kadar inerken arka uyluğa, popliteal fossaya ve üst baldıra dallar verir. [[K5 s. 205]]</li>
    <li><b>İnferolateral kalça.</b> Gluteal dalları gluteus maksimusun alt kenarını dolanarak buraya çıkar. [[K5 s. 205]]</li>
    <li><b>Perine.</b> Perineal dal tuber iskiadikumun altından öne döner ve skrotuma veya labium majusa ulaşır. [[K5 s. 205]]</li>
    <li><b>İnferomedial kalça.</b> Perforan kutanöz sinir (S2, S3) sakrotüberöz bağı deler ve gluteus maksimusun alt kenarını dolanarak deriye ulaşır. [[K5 s. 205]] Bazen uyluğun posterior kutanöz sinirinden veya pudendal sinirden ayrılır. [[K5 s. 205]]</li>
  </ul>
  <div class="note"><b>Visseral kollateraller.</b> Pelvik splanknik sinirler, S2 ve S3’ten, bazen S4’ten gelen parasempatik lifleri taşıyan beyaz bağlantı dallarıdır. [[K5 s. 205]] Bu lifler pelvik organları inerve eden otonom pleksuslara katılır. [[K5 s. 205]]</div>
</section>

<section class="wrap blk ders-sec" id="an04e-siyatik">
  <h2>Siyatik sinirin kılıfı, varyasyonu ve derin komşuları</h2>
  <p class="intro">Vücudun en büyük periferik siniri olan siyatik sinir (L4, L5, S1–S3) başlangıçta eni 1 cm’yi biraz aşan yassı bir banttır. [[K5 s. 205]]</p>
  <div class="viz"><div class="viz-head"><h3>Piriformis düzeyinde iki görünüm</h3></div><div data-viz="an04e_siyatik"></div><p class="viz-cap" aria-live="polite"></p></div>

  <p>K5, siyatik sinirin liflerini pleksusun bütün köklerine bağlar ve sinirin segmentlerini L4, L5, S1–S3 olarak sıralar. [[K5 s. 205]] Tibial ve ortak peroneal bileşenler ortak fibröz kılıf içinde ilerler ve genellikle popliteal fossanın tepesinde ayrılır. [[K5 s. 205]] Ayrılma daha proksimalde herhangi bir düzeyde olabilir, hatta bileşenler pleksustan ayrı çıkabilir. [[K5 s. 205]] Erken ayrılmada ortak peroneal sinir genellikle piriformisi deler (kitapta olguların %10’u). [[K5 s. 205]]</p>
  <ol class="iskelet">
    <li><b>Gluteal giriş.</b> Siyatik sinir arka pelvis duvarını piriformisin altında büyük siyatik foramenden terk eder. [[K5 s. 206]] Tuber iskiadikum ile büyük trokanterin orta noktasının hemen medialinden geçer, ardından arka uyluğun orta hattında fossa tepesine dik iner. [[K5 s. 206]]</li>
    <li><b>Önündeki yatak.</b> Yukarıdan aşağıya iskiumun arka yüzü → üst gemellus → obturator internus tendonu → alt gemellus → kuadratus femoris → adduktor magnus sıralanır. [[K5 s. 206]] Kuadratus femoris siniri kemikle siyatik sinir arasındadır. [[K5 s. 206]]</li>
    <li><b>Arkasındaki örtü.</b> Üstte gluteus maksimus siniri örter. [[K5 s. 206]] Kasın hemen distalinde sinir fasya altında yer alır ve hafif bir yarayla zedelenebilir. [[K5 s. 206]] Daha aşağıda biseps femorisin uzun başı sinirin yüzeyinden medialden laterale çapraz geçer. [[K5 s. 206]]</li>
  </ol>
  <div class="note"><b>Diz üstü amputasyonda güdük ağrısı.</b> Alt gluteal arterin dalı olan arteria comitans siyatik sinirin içinde iner. [[K5 s. 206]] K5, sinir kesilmeden damarın bulunup bağlanmasını tarif eder. [[K5 s. 206]] Aksi hâlde damar bağlanırken sinir lifleri de bağa dahil olabilir ve güdükte şiddetli ağrıya yol açabilir. [[K5 s. 206]]</div>
</section>

<section class="wrap blk ders-sec" id="an04e-yuzey">
  <h2>Siyatik sinirin yüzey izdüşümü</h2>
  <p class="intro">Siyatik sinirin yüzey izdüşümünü çizerken iki orta nokta kullanılır. [[K5 s. 207]]</p>
  <div class="viz"><div class="viz-head"><h3>Kemik işaretlerini seçin</h3></div><div data-viz="an04e_yuzey"></div><p class="viz-cap" aria-live="polite"></p></div>

  <ol class="iskelet">
    <li><b>İlk orta nokta.</b> Sakral çukurcuğun derinindeki spina iliaka posterior superior ile tuber iskiadikumun ucu arasındaki mesafeyi ortalayın. [[K5 s. 207]]</li>
    <li><b>İkinci orta nokta.</b> Çizgiyi dışa ve aşağı kıvırarak tuber iskiadikum ile büyük trokanter arasındaki orta noktanın hemen medialinden geçirin. [[K5 s. 207]]</li>
    <li><b>Uyluk.</b> Buradan arka uyluğun orta hattında dikey olarak aşağı devam edin. [[K5 s. 207]]</li>
  </ol>
</section>
<section class="wrap blk ders-sec" id="an04e-labat">
  <h2>Posterior blok ve gluteal enjeksiyon bölgesi</h2>
  <p class="intro">Labat yaklaşımında iki kemik işareti giriş noktasını, sinir stimülasyonu ise ayaktaki yanıtı belirlemeye yardım eder. [[K5 s. 207]]</p>
  <div class="viz"><div class="viz-head"><h3>Labat yaklaşımında yüzey işaretleri</h3></div><div data-viz="an04e_labat"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>K5’in yaygın ve güvenilir olarak nitelediği posterior yaklaşımda hasta yan yatar, dizleri fleksiyondadır. [[K5 s. 207]] Başlangıç çizgisi bu kez büyük trokanter ile spina iliaka posterior superior arasındadır. [[K5 s. 207]] Çizginin ortasından indirilen dik üzerinde 4–5 cm uzaklıktaki giriş, iğneyi siyatik sinire yöneltir. [[K5 s. 207]] Kitabın tarif ettiği stimülasyon yanıtı ayakta dorsifleksiyondur. [[K5 s. 207]]</p>
  <p>Anterior, lateral ve Raj yaklaşımları hastayı yana çevirmeyi gerektirmez. [[K5 s. 207–208]] Tüm alt ekstremiteye anestezi veya analjezi için lomber pleksus bloğu da yapılacaksa hasta zaten Labat yaklaşımına uygun konumdadır. [[K5 s. 208]]</p>
  <h3>Üst dış kadranın sınırı neden önemlidir?</h3>
  <p>Gluteal intramüsküler enjeksiyonlardan sonra siyatik hasar o kadar sık bildirilmiştir ki bu bölgenin kullanımından vazgeçilmesi önerilmiştir. [[K5 s. 208]] Yazarlar olası nedeni, kalça sınırlarının gözde olduğundan küçük canlandırılmasına bağlar. [[K5 s. 208]]</p>
  <ul class="ozet">
    <li><b>Kadran.</b> Üst sınır iliak kresti, dış sınır büyük trokanteri içermelidir. [[K5 s. 208]] Yalnızca kalça kabartısı dörde bölünürse üst dış kadran siyatik sinire yaklaşır. [[K5 s. 208]]</li>
    <li><b>El işareti.</b> Başparmak ve tenar kabartı krest boyunca, başparmak ucu spina iliaka anterior superior üzerinde durduğunda açık elin örttüğü alan kitabın güvenli alan tarifidir. [[K5 s. 208]]</li>
    <li><b>Çizgi işareti.</b> Diğer tarif, büyük trokanter ile spina iliaka posterior superioru birleştiren çizginin önünde kalmaktır. [[K5 s. 208]]</li>
  </ul>
  <p class="an04e-atlas"><b>Sinir Bloğu Atlası</b> <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=subgluteal">Subgluteal siyatik blok</a> · <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=popliteal">Popliteal siyatik blok</a></p>
</section>

<section class="wrap blk ders-sec" id="an04e-tibial">
  <h2>Kas dalları ve tibial sinirin fossadaki seyri</h2>
  <p class="intro">Siyatik sinir kalça eklemine ve uyluk kaslarına dal verir, terminalde ortak peroneal ve daha büyük olan tibial sinire ayrılır. [[K5 s. 209]]</p>
  <div class="viz"><div class="viz-head"><h3>Fossada sinir ve damar ilişkisi</h3></div><div data-viz="an04e_tibial"></div><p class="viz-cap" aria-live="polite"></p></div>

  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Kas veya kas bölümü</th><th>Köken ve innervasyon</th></tr></thead><tbody>
    <tr><td>Semitendinozus, semimembranozus, biseps femorisin uzun başı</td><td>İskiumdan başlayan gerçek hamstringlere siyatik sinirin medialindeki tibial bileşen dal verir. [[K5 s. 209]] Proksimal ayrılma görülen %10’luk grupta dallar doğrudan tibial sinirden çıkar. [[K5 s. 209]]</td></tr>
    <tr><td>Adduktor magnus</td><td>İskial baş modifiye hamstring sayılabilir ve tibial innervasyon alır. [[K5 s. 209]] İskium dalından başlayan gerçek adduktor bölümü obturator sinir inerve eder. [[K5 s. 209]]</td></tr>
    <tr><td>Biseps femorisin kısa başı</td><td>Femur cisminin arkasından başlar ve gelişimsel olarak gluteus maksimusa aittir. [[K5 s. 209]] Hamstring sayılmaz ve bu grupta lateralden çıkan ortak peroneal bileşenin inerve ettiği tek kastır. [[K5 s. 209]]</td></tr>
  </tbody></table></div>
  <ul class="ozet">
    <li><b>Başlangıç ve taban.</b> Tibial sinir (L4, L5, S1–S3) genellikle fossa tepesinden, bazen daha proksimalden, hatta doğrudan pleksustan başlar. [[K5 s. 209]] İnerken sırasıyla femurun popliteal yüzünü, diz kapsülünün arka yüzünü ve popliteusu çaprazlar. [[K5 s. 209]]</li>
    <li><b>Kas örtüsü.</b> Üstte medialden semimembranozus ve semitendinozus, lateralden biseps femoris siniri örter. [[K5 s. 209]] Aşağıda örtüyü gastroknemiusun iki başı oluşturur. [[K5 s. 209]]</li>
    <li><b>Damarlarla çaprazlaşma.</b> Popliteal damarlar adduktor hiatustan fossaya hafif medialden yaklaştığı için sinir başlangıçta damarların lateralindedir. [[K5 s. 209]] Damarları yüzeyelden çaprazlayıp fossanın alt ucunda mediale geçer. [[K5 s. 209]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="an04e-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="an04e-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an04e-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an04e-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an04e-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Yan yatan hastada siyatik sinirin yerini nasıl tahmin edersiniz? Labat yaklaşımının giriş noktasını ve beklediğiniz stimülasyon yanıtını anlatın.</p></div>
  <h3>Cevap iskeleti</h3>
  <ol class="iskelet">
    <li>Pelvik çıkışı tarif edin. Siyatik sinir L4–S3 liflerini taşır ve genellikle piriformisin altından büyük siyatik forameni geçer. [[K5 s. 205–206]]</li>
    <li>Spina iliaka posterior superior ile tuber iskiadikum arasının ortasından başlayın. [[K5 s. 207]] Sinirin izdüşümünü aşağı ve dışa, trokanter ile tuber arasındaki orta noktanın hemen medialine, oradan arka uyluğun orta hattına taşıyın. [[K5 s. 207]]</li>
    <li>Labat yaklaşımında hasta yan yatar, dizleri fleksiyondadır. [[K5 s. 207]] Trokanter ile spina iliaka posterior superioru birleştirin ve çizginin ortasından inilen dik üzerinde 4–5 cm uzaklıktaki girişi gösterin. [[K5 s. 207]]</li>
    <li>K5, uygun konumda stimülasyonla ayakta dorsifleksiyon tarif eder. [[K5 s. 207]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Üç kemik işaretini yerleştirip siyatik sinirin eğrisini çizin. [[K5 s. 207]] Yanına piriformisin delindiği varyasyonu ekleyip kası geçen bileşeni adlandırın. [[K5 s. 205]]</div>
  <div class="note plain"><b>Ek sorular</b><ul><li>Gluteal kıvrımın distalindeki yüzeyel yara siniri neden zedeleyebilir?</li><li>Gerçek hamstringler ile bisepsin kısa başına giden dallar siyatik sinirin hangi yüzlerinden ayrılır?</li><li>Tibial sinirin popliteal damarlarla ilişkisi fossa boyunca nasıl değişir?</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="an04e-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>L4 ve L5 lifleri lumbosakral trunkusta birleşir, trunkus sakroiliak eklemin önünde S1’e katılır. [[K5 s. 202]]</li>
    <li>Piriformisin üstünden üst gluteal sinir ve damarlar geçer. [[K5 s. 204]] Altında uyluğun posterior kutanöz siniri siyatik sinirin medialindedir. [[K5 s. 205]]</li>
    <li>Ortak kılıftaki tibial ve ortak peroneal bileşenler genellikle fossa tepesinde ayrılır. [[K5 s. 205]] Bisepsin kısa başına lateralden ortak peroneal bileşen dal verir. [[K5 s. 209]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="04e"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/04d">← Torakal sinirler ve lomber pleksus</a><a href="#/dersler/anatomi/04f">Sonraki: Popliteal fossa, bacak–ayak sinirleri ve alt ekstremite dermatomları →</a></nav>
</section>`,
};
