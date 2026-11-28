VERI.sorular = VERI.sorular || {};
VERI.sorular['fk25-1'] = {
  no: 1, kok: 'Ana alan ve rezonans', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 402–406]]',
  onermeler: [
    { t: 'MRG, çekirdeği uyarmak için iyonlaştırıcı ışın kullanır.', d: false, n: 'Yanlış. Çekirdek radyo dalgasından enerji soğurur. [[K6 s. 402]]' },
    { t: 'Süperiletken sargıda akım dirençten kaynaklanan ısı kaybı olmadan dolaşabilir.', d: true, n: 'Doğru. Çok düşük sıcaklıkta sargının elektriksel direnci ortadan kalkar. [[K6 s. 403]]' },
    { t: 'Dış alan uygulanınca bütün hidrojen dipolleri paralel yönde dizilir.', d: false, n: 'Yanlış. Antiparalel dipoller de bulunur, paralel olanların sayısı biraz daha fazladır. [[K6 s. 404]]' },
    { t: 'Ana alan güçlendiğinde hidrojenin Larmor frekansı artar.', d: true, n: 'Doğru. Presesyon frekansı uygulanan alanla doğru orantılıdır. [[K6 s. 404]]' },
    { t: 'RF enerjisinin verimli aktarılması için frekans seçiminde serbestlik vardır.', d: false, n: 'Yanlış. Etkili enerji aktarımı için uyarı frekansı Larmor frekansına yakın olmalıdır. [[K6 s. 404]]' }
  ]
};
VERI.sorular['fk25-2'] = {
  no: 2, kok: 'RF sinyalinden doku kontrastına', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 406–408]]',
  onermeler: [
    { t: 'Verici bobin, RF darbesi kesildikten sonra alıcı olarak çalışabilir.', d: true, n: 'Doğru. Bilgisayara bağlı bobin zayıf elektromanyetik darbeleri pasif olarak algılar. [[K6 s. 406]]' },
    { t: 'Gradyan bobinleri Larmor frekansını kesit boyunca eşit tutar.', d: false, n: 'Yanlış. Gradyan, yerel alanı ve dolayısıyla frekansı konuma göre değiştirir. [[K6 s. 407]]' },
    { t: 'T1, ana alana paralel mıknatıslanmanın toparlanmasını anlatır.', d: true, n: 'Doğru. Boyuna bileşen ana alan doğrultusunda yeniden gelişir. [[K6 s. 407]]' },
    { t: 'T2 ağırlıklı görüntü ödemli yaralanmayı ayırt etmeye elverişlidir.', d: true, n: 'Doğru. Su içeriği yüksek dokular bu ağırlıklandırmada parlak görünür. [[K6 s. 407]]' },
    { t: 'Gadolinyum şelatlarının başlıca etkisi yakındaki protonların T1 süresini uzatmaktır.', d: false, n: 'Yanlış. Gadolinyum yakındaki protonların T1 süresini kısaltır. [[K6 s. 408]]' }
  ]
};
VERI.sorular['fk25-3'] = {
  no: 3, kok: 'Tarayıcı odasında güvenlik', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 408–410]]',
  onermeler: [
    { t: 'Ferromanyetik olmayan bir iletken manyetik alana çekilmediği için taramada yanık riski taşımaz.', d: false, n: 'Yanlış. Değişen alanın indüklediği akım direnç ısısı oluşturabilir. [[K6 s. 408]]' },
    { t: 'Birbirine değen ekstremiteleri köpük pedle ayırmak yanık riskine karşı bir önlemdir.', d: true, n: 'Doğru. İletken dokuların teması akım yolunu kapatabilir. [[K6 s. 408]]' },
    { t: 'Manyetik kodlu kartlardaki veriler güçlü alanda silinebilir.', d: true, n: 'Doğru. Kredi ve kimlik kartlarının manyetik kayıtları zarar görebilir. [[K6 s. 408]]' },
    { t: 'Quench tahliye borusunun tıkanması odada asfiksi riski doğurur.', d: true, n: 'Doğru. Hızla açığa çıkan buhar oda havasının yerini alabilir. [[K6 s. 410]]' },
    { t: 'Cihaz gürültüsü nedeniyle monitör ekranını doğrudan görmek önemlidir.', d: true, n: 'Doğru. Tarama sırasında sesli alarmları duymak güçleşir. [[K6 s. 410]]' }
  ]
};

SAYFALAR['dersler/fizik/25'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 25', baslik: 'Manyetik rezonans görüntüleme',
  lede: 'Manyetik rezonans görüntüleme (MRG), güçlü bir alandaki çekirdekleri radyo dalgalarıyla uyarır ve dokudan geri gelen zayıf sinyallerden iç yapıların görüntüsünü oluşturur. [[K6 s. 402]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button data-scroll="fk25-miknatis">Tarayıcı</button><button data-scroll="fk25-spin">Spin ve presesyon</button><button data-scroll="fk25-rf">RF darbesi</button><button data-scroll="fk25-konum">Konum</button><button data-scroll="fk25-kontrast">Doku kontrastı</button><button data-scroll="fk25-guvenlik">Alan güvenliği</button><button data-scroll="fk25-hasta">Quench ve hasta</button><button data-scroll="fk25-p1">Part I</button><button data-scroll="fk25-p2">Part II</button><button data-scroll="fk25-ozet">Özet</button>
</nav>

<section class="wrap blk ders-sec" id="fk25-miknatis">
<h2>Tarayıcının merkezinde neden süperiletken bir sargı var?</h2>
<p class="intro">Ayrıntılı bir görüntü elde etmek için mıknatısın dokuda oluşturduğu alan hem güçlü hem de son derece düzgün olmalıdır. [[K6 s. 403]]</p>
<div class="viz"><div class="viz-head"><h3>Tarayıcıyı kesitte inceleyin</h3></div><div data-viz="fk25_tarayici"></div><p class="viz-cap" aria-live="polite"></p></div>
<p><b>Nükleer manyetik rezonans (NMR)</b>, güçlü bir alandaki çekirdeklerin belirli frekanslarda radyo dalgası soğurması ve verici kapanınca elektromanyetik dalga yaymasıdır. [[K6 s. 402]] Halkın “nükleer” sözcüğünü radyoaktiviteyle ilişkilendirebileceği düşünülerek tekniğin ilk adı olan NMR değiştirilmiştir. [[K6 s. 402]] Röntgen ve bilgisayarlı tomografiden (BT) farklı olarak MRG iyonlaştırıcı radyasyon kullanmaz. [[K6 s. 402]]</p>
<div class="fk25-kartlar">
<div class="card"><h3>Elektrik direnci</h3><p>Bazı metaller ve seramikler çok düşük sıcaklığa soğutulunca elektrik dirençlerini kaybeder, elektronlar engellenmeden hareket eder. [[K6 s. 402–403]] Süperiletkenlik denen bu özellik, çok büyük akımların direnç ısısı olarak enerji kaybetmeden taşınmasını sağlar. [[K6 s. 403]]</p></div>
<div class="card"><h3>Soğutma ve sürekli akım</h3><p>Elektromıknatısın niyobyum–titanyum alaşımı gibi bir malzemeden yapılan tel sargısı sıvı helyum içinde tutulur. [[K6 s. 403]] Sargı −250 °C’nin (23 K) altında tutulduğunda bir kez aktarılan akım enerji tüketmeden dolaşmayı sürdürebilir. [[K6 s. 403]]</p></div>
<div class="card"><h3>Alanın büyüklüğü</h3><p>Manyetik akı yoğunluğunun birimi tesladır (T) ve 1 T = 10 000 gauss eder. [[K6 s. 403]] Tipik değer 1,5–3 T olup bazı tarayıcılarda 7 T’ye ulaşır. [[K6 s. 403]] Kitap karşılaştırma için Dünya’nın alanını 0,000006 T verir. [[K6 s. 403]]</p></div>
</div>
<div class="note"><b>Alan birimini dönüştürün.</b> Aynı tarayıcının alanını tesla ve gauss cinsinden ifade etmek için kitabın verdiği 1 T = 10 000 gauss eşitliğini kullanın. [[K6 s. 403]] Örneğin 1,5 T için 1,5 × 10 000 = 15 000 gauss elde edilir. [[K6 s. 403]] Burada değişen yalnızca birimdir, sargının oluşturduğu alan aynıdır. [[K6 s. 403]]</div>
<h3>Ana alanı RF darbesinden ayırın</h3>
<p>Kesitte görülen büyük sargının görevi, tarama bölgesinde çekirdeklerin hizalanacağı alanı kurmaktır. [[K6 s. 403–405]] Bir çekirdekten enerji soğurmasını istediğimizde ise başka bir bobinden, uygun frekansta ve kısa süreli elektromanyetik enerji veririz. [[K6 s. 404]] Görüntü için ölçülen enerji, bu darbe kapandıktan sonra çekirdeklerden geri gelen çok küçük miktardır. [[K6 s. 402]] [[K6 s. 406]]</p>
<p>Alan şiddeti ile alan düzgünlüğü iki ayrı özelliktir. [[K6 s. 403]] Şiddeti, serbest bir metal serum askısını havaya fırlatacak kadar büyük olabilir. [[K6 s. 403]] Düzgünlüğü ise yüksek çözünürlüklü görüntüleme için gerekir, sinyalin yerini bulmak üzere bu alana ayrıca kontrollü bir gradyan eklenir. [[K6 s. 403]] [[K6 s. 407]]</p>
</section>

<section class="wrap blk ders-sec" id="fk25-spin">
<h2>Hidrojen hangi frekansta yanıt verir?</h2>
<p class="intro">Ana manyetik alan güçlendikçe protonun presesyonu hızlanır ve onu uyarmak için gereken radyo frekansı yükselir. [[K6 s. 404]]</p>
<div class="viz"><div class="viz-head"><h3>Alanı değiştirin, Larmor frekansını okuyun</h3></div><div data-viz="fk25_larmor"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Doğru, 0,5 T için verilen 21,3 MHz değerinden alanla orantılı olarak hesaplanır. [[K6 s. 404]]</p></div>
<p><b>Spinin kaynağı.</b> Bir zamanlar bölünmez sayılan atomun merkezinde küçük bir çekirdek, çevresinde elektronlar bulunur. [[K6 s. 403]] Çekirdeği oluşturan proton ve nötronlara nükleon denir, her ikisi de kuarklardan oluşur. [[K6 s. 403]] Spin belirli atomaltı parçacıkların ve çekirdeklerin özelliğidir, tek sayıda proton ya da nötron içeren çekirdeklerde görülür. [[K6 s. 403]]</p>
<p><b>Neden hidrojen?</b> Hidrojen çekirdeği tek, pozitif yüklü bir protondur ve spin taşıyan bu yük küçük bir manyetik dipol oluşturur. [[K6 s. 403]] Vücudun büyük bölümü sudan (H₂O) oluştuğu için hidrojen atom sayısı bakımından en bol elementtir. [[K6 s. 404]] Bu nedenle dokudaki çok sayıda manyetik olarak etkin hidrojen çekirdeğinden sinyal alınabilir. [[K6 s. 404–406]]</p>
<p><b>Presesyonu düşünün.</b> Dönmekte olan eğik bir topacın ekseninin bir koni çizmesi gibi, protonun ekseni de uygulanan alan doğrultusu çevresinde dolanır. [[K6 s. 404]] Bu hareketin frekansına Larmor frekansı denir. [[K6 s. 404]] <i>f</i> ∝ <i>B</i> ilişkisinde <i>f</i> hidrojenin presesyon frekansı (MHz), <i>B</i> manyetik akı yoğunluğudur (T). [[K6 s. 404]] Kitabın klinik örneğinde 0,5–3 T aralığı yaklaşık 21,3–128 MHz’e karşılık gelir. [[K6 s. 404]]</p>
<div class="viz"><div class="viz-head"><h3>Topaç benzetmesinde hangi eksen dolanır?</h3></div><div data-viz="fk25_presesyon"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Önce ana alanı gösteren sabit oka, ardından eğik okun ucuna bakın. Dönmekte olan protonun ekseni alan çevresinde dolanırken izlenen hareket presesyondur. [[K6 s. 404]] Grafikte frekansı okuduğunuzda, bu dolanmanın birim zamanda kaç kez tekrarlandığını okursunuz. [[K6 s. 404]]</p>
<div class="note"><b>Grafiği okuyun.</b> Kaydırıcıyı 0,5 T’den 1,5 T’ye götürün. Alan üç katına çıkınca hesaplanan frekans da 21,3 MHz’den yaklaşık 63,9 MHz’e çıkar. [[K6 s. 404]] Aynı frekanstaki radyo darbesinin bu iki alanda da rezonans oluşturması beklenmez, vericinin frekansı o alandaki hidrojenin presesyonuna yakın seçilir. [[K6 s. 404]]</div>
</section>

<section class="wrap blk ders-sec" id="fk25-rf">
<h2>Bir proton nasıl sinyal kaynağı olur?</h2>
<p class="intro">Ana alan dipolleri hizalar, ikinci bir bobinden verilen radyofrekans (RF) darbesi ise protonların bir bölümünün enerji durumunu değiştirir. [[K6 s. 404]]</p>
<div class="viz"><div class="viz-head"><h3>Diz taramasında seçili protonu izleyin</h3></div><div data-viz="fk25_dipol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Oklar dipol yönünü gösterir, örnekteki ok sayıları dokudaki proton oranlarını temsil etmez. [[K6 s. 404–406]]</p></div>
<ol class="iskelet"><li><b>Hizalanma.</b> Alan yokken rastgele yönelen dipoller, alan uygulanınca paralel veya antiparalel hizalanır. [[K6 s. 403–405]] Paralel, düşük enerjili yönde küçük ama sürekli bir sayısal üstünlük kalır. [[K6 s. 404–406]]</li>
<li><b>Uyarılma.</b> RF darbesinin manyetik bileşeni ana alana diktir. [[K6 s. 404]] [[K6 s. 407]] Frekans Larmor frekansına yakınsa paralel protonlardan bazıları enerji soğurup yüksek enerjili antiparalel duruma geçer. [[K6 s. 404]] Rezonanstan uzak frekanslarda enerji aktarımı verimsizdir. [[K6 s. 404]]</li>
<li><b>Geri dönüş.</b> Darbe kesildiğinde uyarılmış protonlar düşük enerjili paralel duruma dönerken iki durumun enerji farkını RF fotonlarıyla geri verir. [[K6 s. 406]] Enerji korunduğu için yayılan fotonun frekansı, enerji soğurulurken geçerli olan yerel Larmor frekansıdır. [[K6 s. 407]]</li></ol>
<p><b>Vericiden alıcıya.</b> RF bobini bu kez bilgisayara bağlı, çok duyarlı bir pasif algılayıcı olarak çalışır. [[K6 s. 406]] Hidrojen çekirdeklerinin çok küçük bir bölümündeki değişiklik bile elektromanyetik darbeler halinde ölçülüp görüntüye dönüştürülebilir. [[K6 s. 406]] Sinyal, suyun, yağın ve hidrojen içeren diğer bileşiklerin dağılımını yansıtır. [[K6 s. 406–407]]</p>
<p><b>Diz örneğini okuyun.</b> İlk iki adımı karşılaştırırken tek tek okların yönüne bakın. Alan uygulanmadan önce doku zaten hidrojen içerir, tarayıcı bu çekirdeklerin dipollerini yönlendirir. [[K6 s. 404–405]] RF açıldığında işaretli proton enerji alır, kapandığında ters yöndeki geçiş algılanabilir bir sinyal verir. [[K6 s. 404–406]] Bilgisayarın kullandığı bilgi, dokudan gelen bu zayıf yanıtın alıcı bobinde ölçülmesidir. [[K6 s. 402]] [[K6 s. 406]]</p>
</section>

<section class="wrap blk ders-sec" id="fk25-konum">
<h2>Alıcı, sinyalin nereden geldiğini nasıl ayırır?</h2>
<p class="intro">Gradyan bobinlerinden geçirilen akım, düzgün ana alana konuma göre değişen bir alan ekler. [[K6 s. 407]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı kesitte üç konumu karşılaştırın</h3></div><div data-viz="fk25_konum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Dalgalar aynı zaman aralığındaki göreli frekansı gösterir, çevrim sayıları şematiktir. [[K6 s. 407]]</p></div>
<p>Bir protonun bulunduğu yerde alan ne kadar güçlüyse yaydığı fotonun frekansı o kadar yüksektir. [[K6 s. 407]] Gradyan bilindiğinde bilgisayar, algılanan sinyalden fotonların kaynaklandığı konumu matematiksel olarak belirleyebilir. [[K6 s. 407]] Böylece çekirdeğin verdiği yanıt uzaydaki yeriyle eşleştirilir. [[K6 s. 407]]</p>
<p><b>Kesitten hacme.</b> Hasta ardışık konumlarda taranırken RF darbesi tekrar tekrar açılıp kapatılır. [[K6 s. 407]] Her konumda iki boyutta gradyan uygulanır ve kesitin her noktasından elde edilen RF ölçümleri enine kesit görüntüsünü oluşturur. [[K6 s. 407]] İki boyutlu kesitler birleştirilerek iç yapıların yüksek çözünürlüklü üç boyutlu görünümü elde edilebilir. [[K6 s. 407]]</p>
<div class="note"><b>Şekildeki dalgaları okuyun.</b> Gradyan kapalıyken aynı tip çekirdekler aynı alanı görür ve frekans tek başına sağdaki protonu soldakinden ayırmaz. [[K6 s. 404]] [[K6 s. 407]] Gradyanı açıp dalgaları aynı zaman aralığında karşılaştırın. Daha sık salınan sinyal, alanın daha güçlü olduğu konumdan gelir. [[K6 s. 407]] Ardışık kesitlerin birleştirilmesi, bu yer bilgisini tek bir düzlemin dışına taşır. [[K6 s. 407]]</div>
<p><b>Alıcıdan geriye doğru düşünün.</b> Alıcı bobine ulaşan fotonun enerjisini, protonun uyarılma sırasında soğurduğu enerji belirler. [[K6 s. 407]] Bu enerjiye karşılık gelen frekans yerel alan şiddetine, yerel alan da uygulanan gradyan nedeniyle konuma bağlıdır. [[K6 s. 407]] Bilgisayar bu bağıntıyı ters yönde kullanarak ölçülmüş bir sinyale görüntüde yer verir. [[K6 s. 407]]</p>
</section>

<section class="wrap blk ders-sec" id="fk25-kontrast">
<h2>İki dokunun parlaklığı neden farklıdır?</h2>
<p class="intro">Dokular hidrojen yoğunlukları ve uyarılan protonlarının dengeye dönüş süreleri bakımından farklıdır. [[K6 s. 406–407]] Bu farklar beyin, iç organ, kas ve tümör gibi yumuşak dokuların ayırt edilmesini sağlar. [[K6 s. 402]] [[K6 s. 407]]</p>
<div class="viz"><div class="viz-head"><h3>RF kesildikten sonra iki bileşeni izleyin</h3></div><div data-viz="fk25_gevseme"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Ok uzunlukları değişimin yönünü gösterir, süre veya dokuya özgü ölçüm vermez. [[K6 s. 407]]</p></div>
<div class="fk25-kartlar"><div class="card"><h3>T1 · Boyuna gevşeme</h3><p>RF darbesi kesildiğinde mıknatıslanmanın ana alana paralel bileşeni yeniden gelişir. [[K6 s. 407]] Bu toparlanmanın süresi dokunun bileşimi hakkında bilgi verir. [[K6 s. 407]]</p></div>
<div class="card"><h3>T2 · Enine gevşeme</h3><p>Ana alana dik bileşenin azalması boyuna toparlanmadan bağımsız ölçülebilir. [[K6 s. 407]] Kitabın örneğinde T2 ağırlıklı görüntüde su içeriği yüksek doku yağ içeren dokudan daha parlaktır, bu yüzden ödemli yaralanmalar belirginleşir. [[K6 s. 407]]</p></div></div>
<h3>Kontrast madde yakınındaki protonları nasıl etkiler?</h3>
<p>Çoğu MR kontrast maddesi çevresindeki protonların T1 süresini kısaltır. [[K6 s. 408]] Güçlü paramanyetik metal iyonlarının ısıl titreşimi, uygun rezonans frekansında salınan yerel elektromanyetik alanlar oluşturur. [[K6 s. 408]] Böylece protonlar paralel duruma daha hızlı döner. [[K6 s. 408]]</p>
<ul><li><b>Madde seçimi.</b> MRG’de gadolinyum şelatları, BT ve diğer röntgen tekniklerinde iyot türevi kontrast maddeler kullanılır. [[K6 s. 408]] Gadolinyumun eşleşmemiş yedi elektronu güçlü paramanyetizmasını ve belirgin yerel alan etkisini açıklar. [[K6 s. 408]]</li>
<li><b>Uygulama.</b> Ağızdan kontrast gastrointestinal kanal için, damar içi enjeksiyon diğer incelemelerin çoğu için uygundur. [[K6 s. 408]] Gadolinyum sıklıkla tümörleri belirginleştirmek için ve MR anjiyografide kullanılır. [[K6 s. 408]]</li></ul>
<p><b>Kontrastın etki alanı.</b> Gadolinyum iyonunun eşleşmemiş elektronları, bulunduğu yerde güçlü bir manyetik alan oluşturmasını sağlar. [[K6 s. 408]] İyonun ısıl hareketi bu yerel alanı değişken hale getirir ve salınımlar uygun enerjideyse komşu hidrojen çekirdekleri paralel duruma daha çabuk geçer. [[K6 s. 408]] T1 kısalması bu nedenle özellikle kontrast maddenin yakınındaki protonlar için tanımlanır. [[K6 s. 408]]</p>
<p><b>Üç ayrı soruyu ayırın.</b> Hidrojen yoğunluğu, dokunun birim hacminde sinyal verebilecek ne kadar hidrojen bulunduğunu anlatır. [[K6 s. 406–407]] Gevşeme, RF kesildikten sonra mıknatıslanmanın dengeye nasıl döndüğünü anlatır ve farklı dokularda farklı süre alır. [[K6 s. 407]] Gradyanın sağladığı frekans bilgisi ise alınan sinyalin hangi konuma yerleştirileceğini belirler. [[K6 s. 407]]</p>
<p>Ödem örneğinde T2 ağırlıklı kesitin parlaklığı, fazla su içeren yaralı alanı seçmeye yardım eder. [[K6 s. 407]] Gadolinyum örneğinde ise dışarıdan verilen madde yakındaki protonların boyuna toparlanmasını hızlandırır, dolayısıyla görüntü kontrastı yerel olarak değişir. [[K6 s. 408]]</p>
</section>

<section class="wrap blk ders-sec" id="fk25-guvenlik">
<h2>Tarayıcı odasında cisim, hasta ve çalışan için hangi riskler var?</h2>
<p class="intro">Güçlü ana alan serbest ferromanyetik cismi fırlatabilir, değişen alan ise iletkende akım oluşturarak ısınmaya veya sinir uyarılmasına neden olabilir. [[K6 s. 408–409]]</p>
<div class="viz"><div class="viz-head"><h3>Tehlikeyi mekanizmasına göre ayırın</h3></div><div data-viz="fk25_risk"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="fk25-kartlar">
<div class="card"><h3>Odaya giriş ve ekranlama</h3><p>Tarama odasına giriş kısıtlanır, demir içeren cisimler içeri alınmaz. [[K6 s. 408]] Dış elektromanyetik girişim, özellikle radyo dalgaları, duyarlı alıcı bobinleri etkileyebileceğinden oda ekranlanır. [[K6 s. 408]] Bakır bir tüp olan dalga kılavuzu izlem kablosunun kontrol odasına geçişini sağlar. [[K6 s. 408]] Soğutucu buharı için ayrı bir tahliye yolu gerekir. [[K6 s. 408]]</p></div>
<div class="card"><h3>Metal ve temas</h3><p>Serbest ferromanyetik bir cisim hasta, personel veya ekipmana çarpabilir. [[K6 s. 408]] Alüminyum tarayıcıya girebilir, ferromanyetik olmayan titanyum MR eşliğindeki işlemlerde implant ve cerrahi alet için elverişlidir. [[K6 s. 408–409]] Alana çekilmeyen metalde bile alanın açılıp kapanması akım indükleyerek direnç ısısına ve yanığa yol açabilir. [[K6 s. 408]] Doku da iletken olduğundan birbirine değen ekstremiteler köpük pedle ayrılır. [[K6 s. 408]]</p></div>
<div class="card"><h3>İmplant ve elektronik cihaz</h3><p>Kalp pili ve implante kardiyoverterler güçlü alan nedeniyle taramaya engel olabilir. [[K6 s. 408]] Yakın kızılötesi spektroskopi (NIRS) ve puls oksimetre probları dahil elektronik cihazlarda MR için uygunluk işareti aranır. [[K6 s. 408]] Ferromanyetik olmayan parçalardan üretilmiş özel ekipman hazır bulunmalı ve açıkça etiketlenmelidir. [[K6 s. 408]] Güçlü alan, kredi kartı ve kimlik kartı gibi manyetik kodlu kayıtlardaki veriyi silebilir. [[K6 s. 408]]</p></div>
</div>
<h3>Odaya girecek üç nesneyi karşılaştırın</h3>
<ul><li><b>Serum askısı.</b> Ferromanyetik bir askı serbest haldeyse ana alan onu hızlandırabilir. [[K6 s. 403]] [[K6 s. 408]] Burada korunması gereken yalnız tarayıcının kendisi değildir, askının yolu üzerinde duran hasta veya çalışan da yaralanabilir. [[K6 s. 408]]</li>
<li><b>Puls oksimetre probu.</b> Prob açısından soru yalnız malzemenin mıknatısa çekilip çekilmediği değildir, elektronik ekipmanın bu ortamda kullanılmak üzere etiketlenmiş olması gerekir. [[K6 s. 408]] Benzer değerlendirme NIRS probu için de geçerlidir. [[K6 s. 408]]</li>
<li><b>Kalp pili.</b> İmplante bir cihaz hasta ile birlikte alana gireceği için uygunluk sorusu taramadan önce o cihaz için yanıtlanmalıdır. [[K6 s. 408–409]] Kitap kalp pilini ve implante kardiyoverteri taramaya engel olabilecek cihazlara örnek verir. [[K6 s. 408]]</li></ul>
<h3>Kitaptaki cihaz sınıflaması</h3>
<p>Kitabın Tablo 25.1’i, implante edilenler dahil tıbbi cihazlar için aşağıdaki dört tanımı verir. [[K6 s. 409]]</p>
<div class="tbl-wrap"><table class="tbl fk25-tablo"><thead><tr><th>Kitaptaki terim</th><th>Tablodaki anlamı</th></tr></thead><tbody>
<tr><th>MR-compatible</th><td>Tarayıcının içinde çalışabilir. [[K6 s. 409]]</td></tr>
<tr><th>MR-safe</th><td>Tarayıcıya girebilir, ancak içeride çalışmayabilir. [[K6 s. 409]]</td></tr>
<tr><th>MR-conditional</th><td>Tarayıcıya girip giremeyeceği konusunda bilgi alınmalıdır. [[K6 s. 409]]</td></tr>
<tr><th>MR-unsafe</th><td>Tarayıcıya girmemelidir. [[K6 s. 409]]</td></tr>
</tbody></table></div>
<p>Kitap, yaklaşık 1,5 T’den 7 T’ye çıkan sistemlerde önceden MR-safe sayılan bazı ekipmanın daha güçlü alan için yeniden sınıflandırılmasının gerekebileceğini belirtir. [[K6 s. 409]] Tablodaki “girebilir” ile “çalışabilir” ayrımını monitör üzerinden düşünün. Bir monitörün odaya alınabilmesi ile ölçümlerini tarayıcının içinde sürdürebilmesi, kitabın tablosunda iki ayrı sorudur. [[K6 s. 409]] Çevrede kullanılacak ekipmanın üzerindeki açık işaret, o cihaza ilişkin değerlendirmeyi personele iletir. [[K6 s. 408–409]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap “MR-compatible” terimini ayrı kategori sayar ve “MR-conditional” için danışılmasını söyler. [[K6 s. 409]] Güncel etiketler MR Safe, MR Conditional ve MR Unsafe şeklindedir, koşullu bir cihaz yalnız üreticinin belirttiği tarama koşullarında güvenlidir. [[K6 s. 409]]</aside>
<h3>İnsan dokusunda sabit alan ve değişen alan</h3>
<p>MRG’deki elektromanyetik dalgaların enerjisi molekül yapısını değiştirecek düzeyde değildir, bu nedenle tarama dokuyu iyonlaştırmaz. [[K6 s. 409]] Hasta ve çalışanların aralıklı maruziyeti ile arka plan maruziyeti için sınırları belirleyen kılavuzlar vardır. [[K6 s. 409]] Kitap, <b>sabit alanda</b> 10 T’ye kadar insanda bilinen veya beklenen zararlı bir etki olmadığını bildirir. [[K6 s. 409]]</p>
<p><b>Alan ne kadar hızlı değişiyor?</b> Değişim hızı 20 T·s<sup>−1</sup> değerini aşarsa girdap akımları indüklenebilir ve mikroşok oluşabilir. [[K6 s. 409]] Hastalar tarama sırasında sıklıkla hafif periferik sinir uyarılması hisseder. [[K6 s. 409]]</p>
<div class="note"><b>Birimden mekanizmayı bulun.</b> Tesla cinsinden verilen sayı, cihaza yaklaştırılan bir cismi etkileyen alanın büyüklüğünü anlatır. [[K6 s. 403]] [[K6 s. 408]] T·s<sup>−1</sup> ise alanın bir saniyede ne kadar değiştiğini ifade eder ve indüklenen akımlarla ilişkilidir. [[K6 s. 409]] Bu yüzden bir metalin mıknatısa çekilmemesi, değişen alanda ısınma olasılığını tek başına dışlamaz. [[K6 s. 408]]</div>
</section>

<section class="wrap blk ders-sec" id="fk25-hasta">
<h2>Quench ve anestezi altındaki hastaya erişim</h2>
<p class="intro">Mıknatıs sargılarını soğutan sıvı kriyojenin hızla kaynamasına <i>quench</i> denir. [[K6 s. 409–410]]</p>
<div class="viz"><div class="viz-head"><h3>Buharın çıkış yolunu izleyin</h3></div><div data-viz="fk25_quench"></div><p class="viz-cap" aria-live="polite"></p></div>
<p><b>Mıknatıs durduğunda.</b> Bir arıza kendiliğinden quench başlatabilir veya mıknatısın acil durdurma düğmesiyle quench tetiklenebilir. [[K6 s. 409]] Kriyojen hızla buharlaşınca sargı süperiletkenliğini yitirir ve elektriksel direnci geri gelir. [[K6 s. 409]] Soğuk gazın hızla kaçışına genellikle patlama veya şiddetli tıslama sesi eşlik eder. [[K6 s. 409]]</p>
<p><b>Tahliye çalışmazsa.</b> Normalde boru buharı bina dışına taşır. [[K6 s. 410]] Boru tıkanırsa ya da sistem arızalanırsa kriyojenik sıvı ve buhar deride soğuk yanığına, hatta donmaya neden olabilir. [[K6 s. 410]] Çok soğuk buhar akciğeri zedeleyebilir, hızla genişleyip oda havasının çoğunu uzaklaştırırsa oksijensizlikten asfiksi gelişebilir. [[K6 s. 410]]</p>
<p><b>Acil durdurma kararı.</b> Hastanın mıknatısa sıkışması alanı acilen durdurmayı gerektirebilir. [[K6 s. 410]] Sargıların tekrar soğutulması ve tarayıcının çalışır duruma gelmesi birkaç gün sürebilir. [[K6 s. 410]]</p>
<div class="note"><b>İki farklı sesin anlamı.</b> Olağan taramadaki yüksek ses, güçlü alan içindeki bobinlerin mekanik hareketiyle ilişkilidir. [[K6 s. 410]] Quench sırasında duyulabilen ani patlama veya şiddetli tıslama ise soğuk gazın hızla kaçmasına eşlik eder. [[K6 s. 409]] Burada hastanın tehlikesini belirleyen sorulardan biri bu gazın tahliye borusundan dışarı çıkıp çıkamadığıdır. [[K6 s. 410]]</div>
<h3>Anestezi sırasında izlem</h3>
<ul><li><b>Erişim.</b> Ünite ideal olarak hastaya kolay erişim sağlayacak şekilde tasarlanır, ancak masa tarama boyunca tünelde çok yavaş hareket ederken hastaya erişim ciddi ölçüde kısıtlanır. [[K6 s. 410]]</li>
<li><b>Tolerans.</b> Dar tünel bazı hastalarda klostrofobiye yol açabilir ve sedasyon gerekebilir. [[K6 s. 410]]</li>
<li><b>Gürültü.</b> Kitap, güçlü alanda bobinlerin hızla açılıp kapanmasına eşlik eden mekanik hareketin bazı tarayıcılarda 120 dB’ye varan ses oluşturduğunu bildirir. [[K6 s. 410]] Genellikle kulak koruyucusu kullanılır ve alarmı duymak zor olacağından monitör ekranları açıkça görülmelidir. [[K6 s. 410]]</li></ul>
<aside class="note plain"><b>Atlas notu.</b> Kitap tarama gürültüsünü RF bobinlerinin anahtarlanmasına bağlar. [[K6 s. 410]] Başlıca kaynak, güçlü ana alan içinde hızla değişen akımın gradyan bobinlerine uyguladığı kuvvet ve bundan doğan mekanik titreşimdir. [[K6 s. 410]]</aside>
<p><b>Monitörü nereye koyarsınız?</b> Tüneldeki hastaya erişim sınırlıyken cihazın sesli alarmı da tarama gürültüsü içinde zor duyulur. [[K6 s. 410]] Tarama odası ile gözlem odası arasındaki kablo geçişi için dalga kılavuzu bulunur. [[K6 s. 408]] İzlem düzeni kurulurken monitörün görüş hattında kalması ve odadaki probun MR kullanımına uygunluğu birlikte değerlendirilir. [[K6 s. 408]] [[K6 s. 410]]</p>
</section>

<section class="wrap blk ders-sec" id="fk25-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önerme için kararınızı verin, sonra gerekçeyi açın.</p>
<div class="viz"><div data-viz="mtf" data-q="fk25-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk25-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk25-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk25-p2">
<h2>Part II · SOE 2 · Klinik ölçüm ve ekipman</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Anestezi altındaki bir hastayı MRG’ye götüreceksiniz. Tarayıcı dokudan nasıl sinyal alır? Monitörü, probu ve hasta yerleşimini nasıl seçersiniz?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Süperiletken sargı düzgün ana alanı sağlar, hidrojen dipolleri iki yönde hizalanır. [[K6 s. 403–404]]</li>
<li>Larmor frekansına yakın RF darbesi enerji aktarır, darbe kesilince bobin geri yayılan sinyali algılar. [[K6 s. 404–406]] Gradyanlar sinyalin konumunu kodlar. [[K6 s. 407]]</li>
<li>Serbest ferromanyetik cisimleri uzaklaştırın, probun ve monitörün MR uygunluğunu kontrol edin. [[K6 s. 408–409]] Ekstremiteler arasına köpük ped yerleştirin. [[K6 s. 408]]</li>
<li>Dar tüneli ve hareketli masayı hesaba katarak erişimi planlayın, kulak koruması sağlayın ve ekranları görünür tutun. [[K6 s. 410]]</li>
</ol>
<div class="note"><b>Çizin.</b> Aynı eksen üzerinde önce rastgele, sonra ana alana paralel ve antiparalel dipolleri gösterin. [[K6 s. 404–405]] Bir protonun RF alırken ve verirken yönünü, yanına da bobinin o sıradaki görevini yazın. [[K6 s. 404–406]]</div>
<h3>Olası ek sorular</h3><ul><li>Ödemli yaralanmada hangi ağırlıklandırmayı seçersiniz? [[K6 s. 407]]</li><li>Sabit alan şiddeti ile alanın değişim hızı hangi farklı tehlikeleri belirler? [[K6 s. 408–409]]</li><li>Hasta mıknatısa sıkışırsa acil durdurma sonrasında buhar hangi yoldan uzaklaşır? [[K6 s. 409–410]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk25-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Sıvı helyumla soğutulan süperiletken sargı, güçlü ve düzgün ana alanı oluşturur. [[K6 s. 403]]</li>
<li>RF darbesi hizalanmış protonlara rezonansla enerji verir, darbe kesilince yayılan RF sinyali algılanır. [[K6 s. 404–406]]</li>
<li>Gradyan konumu kodlar, hidrojen yoğunluğu ile T1 ve T2 gevşemeleri doku farklarını görünür kılar. [[K6 s. 406–407]]</li>
<li>Ferromanyetik cisimler tarayıcının içine veya yakınına getirilmez, çevresinde kullanılan ekipmanın MR uygunluğu etiketinden doğrulanır. [[K6 s. 408–411]]</li>
<li>Quench sırasında gaz bina dışına tahliye edilir, anestezi sırasında dar tünel erişimi ve gürültü alarm sesini kısıtlar. [[K6 s. 410]]</li>
</ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="25"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/24">← Lazerler</a><a href="#/dersler/fizik/26">Sonraki: Nükleer fizik, radyasyon ve görüntüleme →</a></nav>
</section>`
};
