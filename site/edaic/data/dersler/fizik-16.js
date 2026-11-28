VERI.sorular = VERI.sorular || {};
VERI.sorular['fk16-1'] = {
  no: 1, kok: 'Boya dilüsyonu ve ilk geçiş', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 276–280]]',
  onermeler: [
    {t: 'Sabit boya dozunda ilk geçiş alanının büyümesi daha yüksek debiyi gösterir.', d: false, n: 'Debi, verilen boya miktarının ilk geçiş alanına bölümüdür. [[K6 s. 279–280]]'},
    {t: 'Tam karışan depoda çıkış konsantrasyonu depodaki konsantrasyona eşittir.', d: true, n: 'Çıkıştan alınan örnek, karıştırılan bütün hacmi temsil eder. [[K6 s. 276–277]]'},
    {t: 'Arterde ilk boyanın görülmesi enjeksiyondan sonra gecikir.', d: true, n: 'Boyanın venöz enjeksiyon yerinden arterdeki algılayıcıya ulaşması zaman alır. [[K6 s. 278]]'},
    {t: 'İkinci tepe, ilk kez algılayıcıya gelen en yavaş boyayı temsil eder.', d: false, n: 'En hızlı dolaşan boyanın yeniden algılayıcıya ulaşması ikinci tepeyi oluşturur. [[K6 s. 278–279]]'},
    {t: 'İlk geçiş alanı hesaplanırken üstel iniş ikinci tepenin altından uzatılır.', d: true, n: 'İlk inişin eğiminden öngörülen kuyruk, yeniden dolaşan boyanın katkısını dışarıda bırakır. [[K6 s. 279–280]]'}
  ]
};
VERI.sorular['fk16-2'] = {
  no: 2, kok: 'Termodilüsyon ve lityum dilüsyonu', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 281–283]]',
  onermeler: [
    {t: 'Pulmoner arter kateterinde distal termistör balonun hemen proksimalindedir.', d: true, n: 'Uçtan geriye doğru sıralama distal lümen ağzı, balon ve termistördür. [[K6 s. 281]]'},
    {t: 'Soğuk bolusun sıcaklık eğrisini elde etmek için arterden kan çekilir.', d: false, n: 'Akımın aşağısındaki termistör kan sıcaklığını doğrudan ölçer. [[K6 s. 281]]'},
    {t: 'Sürekli termodilüsyonda filaman sabit güçle kesintisiz ısıtır.', d: false, n: 'Monitör, rastgele bir sinyalle filamanı açıp kapatır. [[K6 s. 283]]'},
    {t: 'Lityum dilüsyonunda iyon algılayıcısı elektrokimyasal ölçüm yapar.', d: true, n: 'Arter hattından çekilen kan lityum iyonuna duyarlı algılayıcıdan geçirilir. [[K6 s. 283]]'},
    {t: 'Basınç dalgasından sürekli debi hesabında tek başlangıç kalibrasyonu yeterlidir.', d: false, n: 'Lityum dilüsyonu ile kalibrasyon birkaç saatte bir tekrarlanır. [[K6 s. 283]]'}
  ]
};
VERI.sorular['fk16-3'] = {
  no: 3, kok: 'Doppler sinyalinin yorumu', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 284–288]]',
  onermeler: [
    {t: 'Ses demeti damar eksenine dikken frekans kayması en büyüktür.', d: false, n: 'Dik açıdaki kosinüs çarpanı sıfırdır ve akım Doppler kayması üretmez. [[K6 s. 284]]'},
    {t: 'Yansıyan sesin frekansı hem gidişte hem dönüşte kayar.', d: true, n: 'Hareketli eritrosit önce alıcı, yansıma sırasında da hareketli kaynak gibi davranır. [[K6 s. 284]]'},
    {t: 'Atımlı Doppler ölçümünde yankının gecikmesi örnekleme derinliği hakkında bilgi verir.', d: true, n: 'Farklı dönüş zamanları damarın farklı derinliklerindeki yansımaları ayırır. [[K6 s. 286]]'},
    {t: 'Kısa ultrason atımı komşu derinlikleri ayırmayı kolaylaştırır.', d: true, n: 'Kısa paket uzaklık çözünürlüğünü, uzun paket ise hız ayrımını destekler. [[K6 s. 286]]'},
    {t: 'Parçacıksız saf su akarken lazer Doppler fluksu sıfırdır.', d: true, n: 'Hareketli saçıcı bulunmadığında hacimsel akım sürse bile fluks sıfırdır. [[K6 s. 288]]'}
  ]
};

const FK16_NAV = [
  ['depo','Yıkanma'], ['boya','İlk geçiş'], ['bolus','Soğuk bolus'], ['surekli','Sürekli ölçüm'],
  ['lityum','Lityum'], ['ses','Sürekli dalga'], ['atim','Atımlı Doppler'], ['lazer','Lazer Doppler'],
  ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
];

SAYFALAR['dersler/fizik/16'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 16',
  baslik: 'Kan akımı ölçümü: indikatör dilüsyonu, termodilüsyon ve Doppler',
  lede: 'Kalp debisi kalbin sağ ya da sol yarısının bir dakikada pompaladığı kan hacmidir. [[K6 s. 275]] Aorttan deri kapillerine geçerken ölçmek istediğimiz akım ve onu görünür kılan sinyal değişir. [[K6 s. 275]] [[K6 s. 287]] Temel yaklaşımlar üçtür: boya ya da başka bir maddenin dilüsyonu, termodilüsyon ve Doppler akımölçer. [[K6 s. 275]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK16_NAV.map(([id,ad]) => `<button type="button" data-scroll="fk16-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk16-depo">
<h2>Boyanın yıkanması akımı nasıl gösterir?</h2>
<p class="intro">Bir sıvı akımı boyayı ortamdan uzaklaştırırken konsantrasyonun zamanla değişimini çizersek bir <b>yıkanma eğrisi</b> elde ederiz. [[K6 s. 276]]</p>
<div class="viz"><h3>Aynı depoda akımı artırın</h3><div data-viz="fk16_depo"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Zaman, konsantrasyon ve akım bir başlangıç durumuna göre ölçeklenmiştir. [[K6 s. 276–277]]</p></div>
<p>Üst musluktan temiz su giren bir depoyu düşünün. [[K6 s. 276]] Alttaki musluk aynı miktarda suyu dışarı verir ve iki musluk birlikte ayarlanır. [[K6 s. 276]] Böylece akımı değiştirdiğimizde bile depodaki su düzeyi sabit kalır. [[K6 s. 276]]</p>
<ul class="ozet">
<li><b>Başlangıç.</b> Depoya bir defada boya eklenir ve tabandaki karıştırıcı boyayı bütün suya dağıtır. [[K6 s. 276]] Çıkıştaki su hemen koyulaşır, ardından temiz su geldikçe giderek açılır. [[K6 s. 276]]</li>
<li><b>Algılama.</b> Çıkışa yerleştirilen optik algılayıcı rengin zamanla açılmasını konsantrasyon olarak kaydedebilir. [[K6 s. 276]] Tam karışma sayesinde o anda çıkan su ile depoda kalan suyun boya konsantrasyonu aynıdır. [[K6 s. 276–277]]</li>
<li><b>Kütle dengesi.</b> Birim zamanda uzaklaşan boya miktarı <i>Q·C</i>’dir. [[K6 s. 276–277]] Burada <i>Q</i> sıvı akımı (hacim/zaman), <i>C</i> ise boya konsantrasyonudur (kütle/hacim). [[K6 s. 276–277]]</li>
</ul>
<p>Depo hacmi <i>V</i> sabitken kalan boya kütlesi <i>V·C</i> olur. [[K6 s. 276–277]] Dolayısıyla <i>V·dC/dt = −Q·C</i> ve sabit akımda <i>C(t) = C</i><sub>0</sub>·e<sup>−Qt/V</sup> bağıntıları aynı yıkanmayı anlatır. [[K6 s. 276–277]] <i>C</i><sub>0</sub> karışımın başlangıç konsantrasyonu, <i>t</i> ise karışmadan sonra geçen süredir. [[K6 s. 276–277]]</p>
<p>Eğrinin başlangıcı diktir çünkü o sırada çıkan her birim hacim daha çok boya taşır. [[K6 s. 276–277]] Konsantrasyon azaldıkça uzaklaştırılan boya miktarı da azalır ve eğri yataylaşır. [[K6 s. 276–277]] Aynı boya miktarında akım ne kadar yüksekse yıkanma o kadar hızlı, eğrinin altındaki alan o kadar küçüktür. [[K6 s. 277]]</p>
<div class="fk16-oku"><h3>Eğriyi soldan sağa okuyun</h3>
<p>Kaydırıcıyı değiştirirken önce eğrinin başladığı noktaya bakın. [[K6 s. 276–277]] Boya dozu ve su hacmi aynı kaldığı için başlangıçtaki koyuluk da aynıdır. [[K6 s. 276–277]] Ardından zaman ekseninde bir nokta seçin ve iki akım ayarında o noktadaki yüksekliği karşılaştırın. [[K6 s. 277]] Hızlı akımda aynı süre içinde daha fazla temiz su geçtiğinden geride daha az boya kalır. [[K6 s. 276–277]]</p>
<p>Son olarak bütün alanı düşünün. [[K6 s. 277]] Çıkış konsantrasyonunu her küçük zaman aralığında geçen sıvı hacmiyle çarparsak o aralıkta uzaklaşan boya kütlesini buluruz. [[K6 s. 276–277]] Bütün aralıkların toplamı, başlangıçta depoya eklediğimiz boya miktarını geri verir. [[K6 s. 277]] Bu yüzden tek bir konsantrasyon değerinin yerine bütün yıkanmayı hesaba katarız. [[K6 s. 276–277]]</p></div>
<div class="fk16-hesap"><h3>Hesap · Aynı boya dozu, iki kat akım</h3><p>Başlangıç akımına <i>Q</i>, ölçülen alana <i>A</i> diyelim. [[K6 s. 277]] Verilen kütle sabit kaldığında akımı iki katına çıkarırsak yeni alan <i>M/(2Q) = A/2</i> olur. [[K6 s. 277]] Kaydırıcıda göreli akımı 1’den 2’ye getirerek alan oranının 1’den 0,5’e inişini izleyin. [[K6 s. 277]] Yarıya inen büyüklük eğrinin başlangıç yüksekliği değil, zaman boyunca altında kalan alanın tamamıdır. [[K6 s. 276–277]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-boya">
<h2>Dolaşımda hangi alanı ölçeriz?</h2>
<p class="intro">Depodan çıkan boya geri dönmezken dolaşıma verilen boya aynı algılayıcıdan tekrar geçebilir. [[K6 s. 277–279]] Kalp debisi hesabı için ilk geçişi ayırmak gerekir. [[K6 s. 279–280]]</p>
<div class="viz"><h3>Arter kaydından ilk geçişi ayırın</h3><div data-viz="fk16_gecis"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Geçiş gecikmesi, yuvarlak tepe ve ikinci geçiş şematiktir. [[K6 s. 278–280]]</p></div>
<ol class="iskelet">
<li><b>Enjeksiyon, t₀.</b> Bilinen miktarda indosiyanin yeşili (ICG) juguler ven gibi büyük bir vene verilebilir. [[K6 s. 277–278]] Debi, boyayı kalp boşluklarından ve pulmoner damarlardan taşıyarak periferik arter ağacına ulaştırır. [[K6 s. 277]]</li>
<li><b>İlk saptama, t₁.</b> Örneğin radial arterdeki optik algılayıcı, enjeksiyondan ancak bir süre sonra boya görür. [[K6 s. 277–278]] Konsantrasyon hızla yükselse de en yüksek değere bir anda varmaz. [[K6 s. 278]]</li>
<li><b>Yuvarlak tepe.</b> Laminer akımda farklı hızlarda ilerleyen boya aynı anda ulaşmaz. [[K6 s. 278]] Boyanın bir bölümü doğrudan yol alırken bir bölümü kalp boşluklarındaki girdaplarda oyalanır. [[K6 s. 278]]</li>
<li><b>İkinci tepe.</b> İlk tepenin ardından konsantrasyon üstel olarak düşer. [[K6 s. 278]] İlk boya henüz tümüyle uzaklaşmadan en hızlı ilerleyen bölüm dolaşımı tamamlayıp yeni bir yükseliş oluşturur. [[K6 s. 278–279]]</li>
</ol>
<p>İlk tepenin ikinci geçişten önceki üstel inişi, düşüşün nasıl süreceğini öngörmek için kullanılır. [[K6 s. 279]] Bu parça aşağı doğru uzatılır ve yeniden oluşturulan kuyruğun altı ilk geçiş alanına katılır. [[K6 s. 279–280]] <i>t</i><sub>2</sub>, bu eğride boya konsantrasyonunun ihmal edilebilir düzeye indiği andır. [[K6 s. 280]]</p>
<div class="fk16-hesap"><h3>Alanı debiye çevirme</h3>
<p>Verilen boya kütlesi <i>M</i>, ilk geçiş alanı <i>A = ∫ C(t) dt</i> ise <b><i>Q = M/A</i></b> olur. [[K6 s. 277–280]] Aynı hesabı ortalama konsantrasyonla yazarsak <i>Q = M / [C̄ · (t</i><sub>2</sub> − <i>t</i><sub>1</sub>)] elde edilir. [[K6 s. 279–280]]</p>
<p>Örnekleme yerinden geçen hacim <i>Q · (t</i><sub>2</sub> − <i>t</i><sub>1</sub>) olduğundan, <i>C̄</i> verilen kütlenin bu hacme bölümüdür. [[K6 s. 280]] Konsantrasyonu kütle/hacim, zamanı dakika cinsinden alırsanız sonuç hacim/dakika çıkar. [[K6 s. 275]] [[K6 s. 280]]</p></div>
<p>İndikatör seçerken tekrar ölçümü de düşünün. [[K6 s. 280]] ICG kolay saptanır ve verilen miktarın %50’si 10 dakikada karaciğerde metabolize edilir. [[K6 s. 280]] Uygun bir aradan sonra ölçüm tekrarlanabilir. [[K6 s. 280]]</p>
<div class="fk16-oku"><h3>Eğriyi yanlış yerden keserseniz</h3>
<p>İkinci tepenin göründüğü noktada kaydı tümüyle kestiğinizi düşünün. [[K6 s. 278–280]] İlk kez yoldan geçen boyanın bir kısmı hâlâ algılayıcıya ulaşmaktadır ve ilk geçişe ait kuyruğun alanı eksik kalır. [[K6 s. 278–280]] Sabit bir dozu olduğundan küçük bir alana bölerseniz bulduğunuz debi fazla çıkar. [[K6 s. 279–280]]</p>
<p>Tersine, ikinci yükselişi de ilk geçişe katarsanız aynı boyanın bir bölümünü ikinci kez sayarsınız. [[K6 s. 278–280]] Bu kez payda büyür ve hesaplanan debi düşer. [[K6 s. 279–280]] Şekilde ilk geçiş alanını açıp özellikle ikinci tepenin altındaki sınırı izleyin. [[K6 s. 279–280]] Enjeksiyon ile ilk saptama arasındaki bekleme, boyanın algılayıcıdan geçiş süresine eklenmez. [[K6 s. 278–280]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-bolus">
<h2>Soğuk bolusla termodilüsyon</h2>
<p class="intro">Boya yerine sıcaklığı bilinen soğuk serum fizyolojik verirsek akımın aşağısında kısa bir sıcaklık düşüşü kaydederiz. [[K6 s. 281–282]]</p>
<div class="viz"><h3>Swan–Ganz kateterinde giriş ve ölçüm yerleri</h3><div data-viz="fk16_kateter"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Pulmoner arter kateteri, adını geliştiricilerinden alan Swan–Ganz kateteri olarak da bilinir. [[K6 s. 281]] Esnek plastik gövdesinde birden çok lümen bulunur. [[K6 s. 281]] Kateter juguler ya da mammaria veninden ilerletilir, ucu pulmoner artere ulaşınca izlem için orada bırakılır. [[K6 s. 281]]</p>
<p class="note"><b>Atlas notu.</b> Kitap giriş yeri olarak juguler ya da “mammary” veni sayar. [[K6 s. 281]] Doğrusu, pulmoner arter kateteri klinikte genellikle internal juguler, subklavyen ya da femoral venden yerleştirilir.</p>
<ul class="ozet">
<li><b>Ucu yönlendirme.</b> Distal açıklığın hemen gerisindeki balon havayla şişirilince kan akımı kateter ucunu taşır. [[K6 s. 281]] Distal lümen basınç transdüserine bağlanırsa aynı kateterden pulmoner arter basıncı da kaydedilebilir. [[K6 s. 280–281]]</li>
<li><b>Sıcaklığı örnekleme.</b> Kitap, enjeksiyon noktasının akım öncesi ve sonrasındaki sıcaklık algılayıcılarını tarif eder. [[K6 s. 281]] Balonun hemen proksimalindeki termistör, kendisinden 20–30 cm proksimalde bulunan enjeksiyon portundan verilen bolusu algılar. [[K6 s. 281]]</li>
<li><b>Proksimal bağlantılar.</b> Lümen bağlantıları ilaç vermeye, kan örneği almaya ve balonu şişirmeye yarar. [[K6 s. 281]] Termistörün ayrı bir elektrik bağlantısı vardır. [[K6 s. 281]]</li>
</ul>
<div class="viz"><h3>Termistörün kaydettiği sıcaklık farkı</h3><div data-viz="fk16_soguma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Zaman ekseni şematiktir ve sıcaklık değişimi başlangıç düzeyine göredir. [[K6 s. 281–282]]</p></div>
<p>İlk uygulamada yaklaşık 0 °C’de serum fizyolojik tek bolus olarak verilirdi. [[K6 s. 281]] Enjeksiyon anında bilgisayarın düğmesine basılarak başlangıç zamanı bildirilir. [[K6 s. 282]] Akım yönünde enjeksiyon portunun ilerisindeki termistör sıcaklık düşüşünü doğrudan kaydeder, bu ölçüm için kan örneği almak gerekmez. [[K6 s. 281]]</p>
<p>Eğri, boya konsantrasyonundaki yükselişin sıcaklıkta bir çukur olarak kaydedilmiş karşılığıdır. [[K6 s. 281–282]] Kan sıcaklığındaki düşüş genellikle 1–2 °C’yi aşmaz. [[K6 s. 281]] Soğuk bolus sistemik dolaşımda dağıldığından ikinci bir tepe oluşmaz ve gerek duyuldukça yeni ölçüm yapılabilir. [[K6 s. 281–282]]</p>
<div class="fk16-hesap"><h3>Isıl indikatörün alanı</h3><p>Bilgisayar, bilinen bolusun soğutma etkisini ölçülen sıcaklık farkının zaman içindeki alanına bölerek debiyi hesaplar. [[K6 s. 281–282]] Alan için başlangıçtaki kan sıcaklığı ile anlık kan sıcaklığı arasındaki farkın büyüklüğü kullanılır. [[K6 s. 281–282]] Aynı soğuk bolus için küçük alan yüksek debiye karşılık gelir. [[K6 s. 277]] [[K6 s. 281–282]]</p></div>
<div class="fk16-oku"><h3>Bolustan bilgisayara hangi bilgiler gider?</h3>
<p>Enjeksiyon tarafında verilen hacim <i>V</i><sub>i</sub> ve kan ile enjektat arasındaki başlangıç sıcaklık farkı <i>T</i><sub>b</sub> − <i>T</i><sub>i</sub> soğutma etkisini belirler. [[K6 s. 281–282]] Ölçüm tarafında ise monitör bir sıcaklık değeri yerine zaman boyunca biriken sıcaklık farkını kullanır. [[K6 s. 281–282]] Bu alanı <i>A</i><sub>T</sub> = ∫ [<i>T</i><sub>b</sub> − <i>T(t)</i>] d<i>t</i> olarak yazabiliriz (sıcaklık farkı × zaman). [[K6 s. 281–282]]</p>
<p>İlişki <i>Q</i> ∝ <i>V</i><sub>i</sub> · (<i>T</i><sub>b</sub> − <i>T</i><sub>i</sub>) / <i>A</i><sub>T</sub> biçimindedir. [[K6 s. 281–282]] Kitabın denklemi <b><i>Q = V</i><sub>i</sub>·(<i>T</i><sub>b</sub> − <i>T</i><sub>i</sub>) / [<i>T</i><sub>ort</sub>·(<i>t</i><sub>2</sub> − <i>t</i><sub>1</sub>)]</b> biçimindedir. [[K6 s. 282]] <i>t</i><sub>1</sub> düşüşün ilk görüldüğü, <i>t</i><sub>2</sub> sıcaklığın normale yakın döndüğü andır. [[K6 s. 282]]</p><p class="note"><b>Atlas notu.</b> Kitap <i>T</i><sub>ort</sub>’u termistörün ölçtüğü ortalama sıcaklık olarak tanımlar. [[K6 s. 282]] Doğrusu, paydaki büyüklük ortalama sıcaklık düşüşüdür (<i>T</i><sub>ort</sub>·(<i>t</i><sub>2</sub> − <i>t</i><sub>1</sub>) = <i>A</i><sub>T</sub>); gerçek hesapta kan ve enjektatın yoğunluk ve özgül ısısını içeren bir sabit de bulunur.</p><p>Soğuk sıvının sıcaklığını bilmek payı, enjeksiyon zamanını işaretlemek kaydın başlangıcını belirlemeye yarar. [[K6 s. 281–282]] En dip noktaları aynı olan iki kayıttan daha uzun süren düşüş, diğer koşullar aynıyken daha büyük bir alan verebilir. [[K6 s. 281–282]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-surekli">
<h2>Termodilüsyonu sürekli kılmak</h2>
<p class="intro">İki termistör arasındaki filaman kanı aralıklı olarak ısıtır ve monitör bu ısıtmanın kandaki karşılığını izler. [[K6 s. 282–283]]</p>
<div class="viz"><h3>Isıtma komutundan eşdeğer yıkanma eğrisine</h3><div data-viz="fk16_isitma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Komut dizisi, sıcaklık yanıtı ve hesaplanan eğri şematik olarak gösterilmiştir. [[K6 s. 283]]</p></div>
<ol class="iskelet"><li><b>Giriş sinyali.</b> Monitör, kateterin içine yerleştirilmiş filamanı rastgele bir sinyalle açıp kapatır. [[K6 s. 283]] Her ısıtma aynı süre boyunca uygulanmadığından farklı uzunlukta küçük yıkanma eğrileri oluşur. [[K6 s. 283]]</li>
<li><b>Ölçülen yanıt.</b> Bilgisayar sıcaklık artışı ile kendi uyguladığı sinyal arasındaki ilişkiyi çapraz korelasyonla belirler. [[K6 s. 283]] Bu işlemden tek bir teorik yıkanma eğrisi elde eder ve debiyi bolus yöntemindeki hesapla bulur. [[K6 s. 283]]</li>
<li><b>Klinik izlem.</b> Kullanıcının her ölçümü başlatması gerekmez. [[K6 s. 282]] Cihaz debinin zaman içindeki seyrini gösterebilir ve değer belirli bir düzeyin altına inerse ekibi uyarabilir. [[K6 s. 282–283]]</li></ol>
<p>Kitap pulmoner arter kateterini kalp debisi ölçüm doğruluğu açısından referans yöntem olarak tanımlar. [[K6 s. 283]] Oldukça invaziv bir girişimdir ve birçok hastada taşıdığı risk, yüksek doğruluğun sağlayacağı yarardan ağır basar. [[K6 s. 283]] Klinik kullanımının azalması bu seçimle ilişkilidir. [[K6 s. 281]] [[K6 s. 283]]</p>
<div class="fk16-oku"><h3>Neden hem komut hem sıcaklık kaydedilir?</h3>
<p>Filamanı açma komutu monitörün bildiği giriş, termistörün ölçtüğü sıcaklık değişimi ise kanın taşıdığı yanıttır. [[K6 s. 283]] Farklı uzunluktaki ısıtma dönemleri için aynı yükseklikte tek bir sıcaklık tepesi aramak, ölçümün bu iki parçası arasındaki ilişkiyi vermez. [[K6 s. 283]] Algoritma komut dizisini ölçülen sıcaklık dizisiyle birlikte değerlendirir ve tek bir bolus verilmiş gibi yorumlanabilen eğriyi hesaplar. [[K6 s. 283]] Böylece her bir açma komutunu ayrı bir klinik debi ölçümü olarak okumak gerekmez. [[K6 s. 282–283]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-lityum">
<h2>Lityumla ölçüm ve arter dalgasının kalibrasyonu</h2>
<p class="intro">Lityum klorür dilüsyonunda indikatörün arterdeki geçişi, lityum iyonuna duyarlı elektrokimyasal algılayıcıyla kaydedilir. [[K6 s. 283]]</p>
<div class="viz"><h3>Bir bolustan sürekli debi izlemine</h3><div data-viz="fk16_lityum"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet"><li><b>Venöz yol.</b> Küçük bir lityum klorür bolusu santral ya da periferik venöz hattan verilebilir. [[K6 s. 283]] Kitabın örneğinde enjeksiyon juguler venden, örnekleme radial arterdendir. [[K6 s. 283]] Gereken işaretleyici dozu çok küçüktür ve bilinen bir farmakolojik etkisi yoktur. [[K6 s. 283]]</li>
<li><b>Arter hattı.</b> Hastanın mevcut arter hattına bağlı sensörden kan çekilirken arteriyel lityum konsantrasyonunun zamana göre eğrisi kaydedilir. [[K6 s. 283]] Boya dilüsyonuyla aynı ilke kullanılır ve ölçüm doğruluğu pulmoner arter kateteriyle karşılaştırılabilir kabul edilir. [[K6 s. 283]]</li>
<li><b>Sürekli kayıt.</b> Aradaki debi değerleri hastanın arter basıncı dalga biçiminin analizinden elde edilir. [[K6 s. 283]] Bu sürekli ölçüm, birkaç saatte bir lityum dilüsyonuyla yeniden kalibre edilir. [[K6 s. 283]]</li></ul>
<p>Basınç dalgasından elde edilen ölçümün geniş bir debi aralığında termodilüsyonla karşılaştırılabilir doğrulukta olduğu gösterilmiştir. [[K6 s. 283]] Bu karşılaştırmaya iki kalibrasyon arasında debinin değiştiği durumlar da dahildir. [[K6 s. 283]]</p>
<div class="fk16-oku"><h3>İki kaydı birbirinden ayırın</h3>
<p>Lityum verildiği sırada zamana karşı izlenen büyüklük arter kanındaki iyon konsantrasyonudur. [[K6 s. 283]] İki enjeksiyon arasında monitöre sürekli gelen büyüklük ise arter basıncıdır. [[K6 s. 283]] Birincisinden dilüsyon ilkesiyle bulunan debi, ikincisinden hesaplanan debi için belirli aralıklarla bir başvuru değeri sağlar. [[K6 s. 283]] Bu nedenle bir basınç dalgası gördüğünüzde, o anda hastaya yeni bir lityum bolusu verilmiş olması gerekmez. [[K6 s. 283]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-ses">
<h2>Sürekli dalga Doppler ile kan hızı</h2>
<p class="intro">Sabit bir probdan çıkan ultrason hareketli eritrositten yansıdığında, giden sesle dönen ses arasındaki frekans farkı kan hızını tahmin etmeyi sağlar. [[K6 s. 283–284]]</p>
<div class="viz"><h3>Kalem probun ucundaki iki kristal</h3><div data-viz="fk16_prob"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Ultrason, işitilebilir aralığın üstündeki, frekansı 20 kHz’i aşan ses dalgasıdır. [[K6 s. 283]] Sürekli dalga yöntemi özellikle ekstremitelerdeki büyük arter ve venlerde akımın yeterliliğini değerlendirmek için kullanılır. [[K6 s. 283]] Beklenenden yüksek hız, damarda daralma ya da kısmi tıkanma olasılığına işaret edebilir. [[K6 s. 283–284]]</p>
<ol class="iskelet"><li><b>Gidiş.</b> Eritrosit vericiye göre hareket ettiğinden hücreye ulaşan dalganın frekansı kaymıştır. [[K6 s. 284]]</li>
<li><b>Dönüş.</b> Hücre sesi yansıtırken küçük bir hareketli verici gibi davranır. [[K6 s. 284]] Alıcıya göre hareketi bu kez dönüş yolunda ikinci bir kayma oluşturur. [[K6 s. 284]]</li></ol>
<div class="viz"><h3>Akım değişmeden probu döndürün</h3><div data-viz="fk16_aci"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Ses doğrultusu damar ekseniyle çakışıyorsa bağıl kaymanın büyüklüğü <i>|Δf|/f</i><sub>0</sub> = <i>2v/(v + c)</i> ≈ <i>2v/c</i> olur. [[K6 s. 284]] Bu yaklaşım, dokudaki ses hızı <i>c</i> (≈ 1500 m·s<sup>−1</sup>) kan hücresinin hızı <i>v</i>’den çok büyük olduğu için geçerlidir. [[K6 s. 284]] Eğik gelişte yalnız demet doğrultusundaki hız bileşeni katkı verir. [[K6 s. 284]]</p>
<div class="fk16-hesap"><p><b>|Δ<i>f</i>| ≈ 2<i>f</i><sub>0</sub>·<i>v</i>·|cos θ|/<i>c</i></b> bağıntısında <i>f</i><sub>0</sub> gönderilen frekans, |Δ<i>f</i>| giden ve dönen frekanslar arasındaki farkın büyüklüğüdür (Hz). [[K6 s. 284–285]] Açı θ ses demeti ile damar ekseni arasındadır ve iki hız aynı birimle ifade edilir. [[K6 s. 284]]</p></div>
<ul class="ozet">
<li><b>Temas.</b> Kalem prob elde taşınan küçük bir monitöre bağlıdır ve uçta düşük empedanslı verici ve alıcı kristaller bulunur. [[K6 s. 284]] Prob cilde açılı tutulur, empedans uyumu sağlayan jel dokuyla ses iletimini iyileştirir. [[K6 s. 284]] Dik gelişte kan akıyor olsa bile Doppler kayması görülmez. [[K6 s. 284]]</li>
<li><b>İşitilen fark.</b> Taşıyıcı frekans birkaç MHz düzeyindeyken kayma birkaç yüz Hz düzeyinde ve işitilebilir aralıktadır. [[K6 s. 285]] Hoparlörden bu fark frekansı duyulur, sesin perdesi eritrosit hızıyla orantılıdır. [[K6 s. 285]]</li>
<li><b>Arter sesi.</b> Atımlı arter akımı, nabızla kabarıp sönen bir üfleme sesi oluşturur. [[K6 s. 285]] Bazı cihazlar kan hızını hesaplayıp ekranda gösterir ya da pulsatil dalga biçimini çizer. [[K6 s. 285]] Kitaptaki basit cihaz, yaklaşma ve uzaklaşmada kaymanın büyüklüğünü pozitif hız olarak verir. [[K6 s. 284]]</li></ul>
<div class="fk16-oku"><h3>Sesi yorumlarken neyi sabit tuttunuz?</h3>
<p>Önce şekli damar eksenine yakın bir açıya getirin, sonra demeti dikleştirin. [[K6 s. 284]] Kanın hızı ve taşıyıcı frekans aynıyken değişen tek şey, eritrosit hızının demetin doğrultusunda kalan bileşenidir. [[K6 s. 284]] Hoparlördeki perdenin düşmesi böyle bir durumda kanın yavaşladığını göstermez. [[K6 s. 284–285]] Akım yeterliliğini değerlendirirken duyulan farkın hem hız hem açıyla ilişkisini korumak gerekir. [[K6 s. 283–285]]</p>
<p>Ardından açıyı sabit düşünün. [[K6 s. 284]] Nabız döngüsü içinde eritrositler hızlandığında geri dönen frekansın taşıyıcıdan uzaklığı artar. [[K6 s. 284–285]] Arter üzerinde duyulan sesin perdesi de aynı döngü içinde değişir. [[K6 s. 285]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-atim">
<h2>Atımlı Doppler ile derinlikten debiye</h2>
<p class="intro">Sürekli dalga ölçümü damar içindeki ortalama hız hakkında bilgi verir, hacimsel akıma geçiş için damar çapını ve hızın kesite nasıl dağıldığını bilmek gerekir. [[K6 s. 285]]</p>
<div class="viz"><h3>Yankı kapısını damar kesiti boyunca gezdirin</h3><div data-viz="fk16_derinlik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kesit ve örnekleme derinliği göreli gösterilmiştir. [[K6 s. 285–286]]</p></div>
<p>Laminer akımda damarın her yerindeki hız aynı değildir. [[K6 s. 285]] Atımlı Doppler radar benzeri bir düzenle farklı derinliklerden gelen yankıları ayırır. [[K6 s. 285–286]] Özofagusa yerleştirilen probla aort incelenebilir ve kalp debisi tahmin edilebilir. [[K6 s. 285–286]]</p>
<ul class="ozet"><li><b>Gönder ve dinle.</b> Kısa elektrik uyarısıyla verici tek bir ses paketi yollar. [[K6 s. 286]] Yankılar daha sonra döndüğü için aynı eleman aradaki sürede alıcı olarak kullanılabilir. [[K6 s. 286]]</li>
<li><b>Gecikmeyi seç.</b> Gönderim ile yankının alınması arasında geçen süre yansıtıcının uzaklığını gösterir. [[K6 s. 286]] Farklı gecikmelerde frekans kaymasını ölçmek damarın bir kenarından ötekine hız profilini ortaya çıkarır. [[K6 s. 286]]</li>
<li><b>Atım süresini seç.</b> Yakın iki derinliği ayırmak için kısa atım, birbirine yakın hızları ayırmak için uzun atım istenir. [[K6 s. 286]] Kitaptaki uzlaşma örneğinde 8 MHz frekanslı, 1 µs süreli atım uzayda 1,5 mm uzunluğunda bir ses paketidir. [[K6 s. 286]]</li></ul>
<div class="fk16-hesap"><h3>İnen aorttan toplam debiye</h3><p>Ejeksiyon döngüsünde ölçülen ortalama kan hızı ile inen aortun kesit alanının çarpımı o kesitten geçen akımı verir (<i>Q = v̄·A</i>). [[K6 s. 286]] Kesit alanı yaş, ağırlık ve boyu kullanan nomogramlardan elde edilir. [[K6 s. 286]] İnen aort akımını bildirilen toplam kalp debisine dönüştürmek için ayrıca bir düzeltme çarpanı gerekir. [[K6 s. 286]]</p>
<p>Hızın birimi uzunluk/zaman, kesitin birimi uzunluğun karesi olduğundan çarpım hacim/zaman boyutundadır. [[K6 s. 286]] Kalp debisi aynı zamanda atım hacmi ile kalp hızının çarpımıdır (hacim/atım × atım/dakika). [[K6 s. 275]]</p></div>
<p>Transözofageal sistemler sürekli dalga veya atımlı olabilir, atımlı sistemler daha yüksek doğrulukları nedeniyle daha çok tercih edilmiştir. [[K6 s. 286]] Özofagus yoluyla ölçüm kalp kateteri yerleştirilmesine göre çok daha az invazivdir ve hastaya zarar verme olasılığı daha düşük olabilir. [[K6 s. 286]]</p>
<p>Kateterle elde edilen debi değerinin doğruluğu daha yüksektir. [[K6 s. 286–287]] Birçok hastada başlangıç değerinden itibaren değişimi izlemek klinik amaç için yeterli olduğundan daha düşük risk ağır basabilir. [[K6 s. 286–287]]</p>
<div class="fk16-oku"><h3>Aynı yankıdan iki ayrı bilgi</h3>
<p>Bir yankı geç döndüğünde yansıtıcı daha uzaktadır. [[K6 s. 286]] Bu tek başına hücrenin daha yavaş ilerlediğini söylemez, çünkü hız bilgisi dönüş süresinden değil frekans farkından gelir. [[K6 s. 284–286]] Şekilde yakın duvardan uzağa doğru ilerlerken ölçüm noktasını seçen değişkeni, seçilen noktada hızı bildiren değişkenden ayırın. [[K6 s. 286]]</p>
<p>Debi hesabı için tek bir noktadaki hızın neden yetersiz kalabileceğini bu kesit üzerinden açıklayabilirsiniz. [[K6 s. 285–286]] Damar içinde hız değişiyorsa bir noktadaki ölçüm, tüm kesitten aynı anda geçen kanı tek başına temsil etmez. [[K6 s. 285–286]] Ayrıca aynı ortalama hız farklı büyüklükteki iki kesitte farklı hacimsel akımlara karşılık gelir. [[K6 s. 285–286]]</p></div>
<div class="fk16-hesap"><h3>Hesap · Bir atımın içinde kaç dalga var?</h3><p>Bir saniyede 8 milyon çevrim üreten verici, saniyenin milyonda biri boyunca çalışırsa <i>8 × 10<sup>6</sup> Hz × 10<sup>−6</sup> s = 8</i> çevrim gönderir. [[K6 s. 286]] Kitabın verdiği 1,5 mm bu sekiz çevrimi taşıyan paketin tüm uzunluğudur. [[K6 s. 286]] Bu örnekte uzaklık çözünürlüğü ile hız ayrımı arasındaki seçimi belirleyen süre, yankının dönüş süresi değil, gönderilen paketin süresidir. [[K6 s. 286]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-lazer">
<h2>Lazer Doppler ile mikrodolaşım</h2>
<p class="intro">Derinin yüzeyine yakın kapiller, arteriyol ve küçük venüllerde hareketli eritrositlerin saçtığı görünür ışık mikrodolaşım hakkında bilgi verir. [[K6 s. 287]]</p>
<div class="viz"><h3>Optik liflerden yüzeyel damara</h3><div data-viz="fk16_lazer"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Lazer Doppler akımölçer, prob içindeki optik liflerle ışığı dokuya taşır ve saçılan ışığı geri toplar. [[K6 s. 287]] Derinin yanı sıra bağırsak epitel yüzeyinin veya başka organ yüzeylerinin kanlanmasını değerlendirmek için içeriden de kullanılabilir. [[K6 s. 287]] Geleneksel ışık kaynağı helyum-neon (He–Ne) lazeridir, daha yeni sistemlerde sıklıkla diyot lazer kullanılır. [[K6 s. 287]]</p>
<div class="fk16-hesap"><h3>Hesap örneği · Bir kapiller eritrositin sinyali</h3>
<p>He–Ne lazerinin dalga boyu <i>λ</i> = 633 nm, frekansı <i>f</i><sub>0</sub> = 4,74 × 10<sup>14</sup> Hz’dir. [[K6 s. 287]] Tipik bir kapiller örneğinde eritrosit hızı 1,5 mm/s alınır ve ışık hücreye tam karşıdan gelir. [[K6 s. 287]]</p>
<p>Çift kayma için <i>|Δf| ≈ 2v/λ</i> kullanılırsa <b>2 × (1,5 × 10<sup>−3</sup> m/s) / (633 × 10<sup>−9</sup> m) ≈ 4,7 kHz</b> bulunur. [[K6 s. 287]] Optik taşıyıcıyla karşılaştırıldığında bu farkın karşılığı olan dalga boyu değişimi çok küçüktür. [[K6 s. 287]]</p></div>
<p class="note"><b>Atlas notu.</b> Kitap 4,7 kHz için “bağıl kayma” ifadesini kullanır. [[K6 s. 287]] Doğrusu, 4,7 kHz mutlak frekans farkıdır, bağıl kayma ise Δ<i>f</i>/<i>f</i><sub>0</sub> oranıdır ve birimsizdir. [[K6 s. 287]]</p>
<p>Frekansı kaymış ışık ile kaymamış ışığın bir bölümü birleşerek girişim yapar. [[K6 s. 287]] Oluşan ışığın şiddeti iki optik frekansın farkı kadar bir frekansta değişir. [[K6 s. 287]] Böylece optik dalga boyundaki küçük değişim, kHz aralığında kolay algılanan bir sinyal verir. [[K6 s. 287]]</p>
<ul class="ozet"><li><b>Yön bilgisi.</b> Algılayıcı yalnız frekans farkının büyüklüğüne duyarlıdır, proba yaklaşan veya probdan uzaklaşan hücreler eşit katkı verir. [[K6 s. 288]] Işığın dokuda yaygın saçılması ve damarların farklı yönlerde uzanması da belirgin yön duyarlılığını ortadan kaldırır. [[K6 s. 288]]</li>
<li><b>Açı ortalaması.</b> Tüm açılardan toplanan ışık için kitap, kosinüs büyüklüğünün ortalamasını 0,5 alır. [[K6 s. 288]] Böylece çift kaymadaki 2 çarpanı sadeleşir ve ortalama hız için <i>v̄ ≈ c·|Δf|/f</i><sub>0</sub> yazılabilir (<i>c</i> ışık hızı). [[K6 s. 287–288]]</li></ul>
<div class="viz"><h3>Aynı hızda eritrosit sayısı değişirse</h3><div data-viz="fk16_fluks"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Hız, hareketli hücre konsantrasyonu ve fluks göreli birimlerdedir. [[K6 s. 288]]</p></div>
<p><b>Fluks = eritrosit hızı × hareketli eritrosit konsantrasyonu (CMBC).</b> [[K6 s. 288]] Hacimsel akım birim zamanda geçen sıvı hacmini, fluks ise belirli bir doku hacminden belli sürede geçen eritrosit miktarını ifade eder. [[K6 s. 288]]</p>
<p>Bir boruda akan kanın yerine saf su koyduğunuzu düşünün. [[K6 s. 288]] Su akmayı sürdürse bile kaymış ışığı geri saçacak parçacık bulunmadığından ölçülen fluks sıfırdır. [[K6 s. 288]] Bu nedenle lazer Doppler sinyalini doğrudan hacimsel debi olarak okuyamayız. [[K6 s. 288]]</p>
<div class="fk16-oku"><h3>İki farklı sinyali karşılaştırın</h3>
<p>Kapiller için yapılan sayısal hesap tek hücreyle tam karşıdan etkileşimi anlatır. [[K6 s. 287]] Gerçek probun topladığı ışık ise farklı yönlere saçılmış ve farklı doğrultularda hareket eden hücrelerle etkileşmiştir. [[K6 s. 288]] Bu nedenle o tek hücre için hesaplanan frekans farkını doğrudan bütün doku hacminin akımı olarak kullanamayız. [[K6 s. 287–288]]</p>
<p>Şekilde aynı hız noktasını seçerek hücre konsantrasyonunu azaltın. [[K6 s. 288]] Birim zamanda örneklenen dokudan geçen hareketli hücre miktarı azalır ve fluks düşer. [[K6 s. 288]] Tersinden okunduğunda bir fluks değişiminin tek başına hücre hızındaki değişimi vermediği görülür, çünkü çarpımın diğer bileşeni de değişebilir. [[K6 s. 288]]</p></div>
<div class="fk16-hesap"><h3>Hesap · Frekans farkının taşıyıcıya oranı</h3><p>Kapiller örneğindeki 4,7 kHz’i Hz’e çevirip lazerin frekansına bölersek <i>4,7 × 10<sup>3</sup> / (4,74 × 10<sup>14</sup>) ≈ 9,9 × 10<sup>−12</sup></i> elde ederiz. [[K6 s. 287]] Pay ve payda aynı birimde olduğundan sonuç birimsizdir. [[K6 s. 287]] Probun algılayabildiği kHz düzeyindeki modülasyon, bu küçük oranın payındaki frekans farkına karşılık gelir. [[K6 s. 287]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk16-p1"><h2>Part I · Doğru / yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="fk16-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk16-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk16-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk16-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Ameliyatta kalp debisini izlemeniz isteniyor. Pulmoner arter kateteriyle soğuk bolus ölçümünü anlatın. Kateter yerleştirmenin riski ağır basarsa transözofageal Doppler size hangi bilgiyi verir?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Kalbin bir yarısının dakikada pompaladığı hacmi arıyorum. [[K6 s. 275]]</li>
<li>Balonun kan akımıyla taşıdığı kateterin ucunu pulmoner arterde bırakırım. [[K6 s. 281]] Proksimal porttan sıcaklığı bilinen soğuk bolusu verirken enjeksiyon anını işaretlerim. [[K6 s. 281–282]]</li>
<li>Distal termistörün kaydettiği sıcaklık düşüşünün alanını kullanırım. [[K6 s. 281–282]] Bolus sistemik dolaşımda dağıldığı için boya eğrisindeki ikinci tepeyi ayırmam gerekmez. [[K6 s. 282]]</li>
<li>Özofagustaki probla farklı yankı gecikmelerinden aorttaki hız dağılımını elde ederim. [[K6 s. 285–286]] Ortalama hızla kesit alanını çarpar, inen aort akımını düzeltme çarpanıyla toplam debiye dönüştürürüm. [[K6 s. 286]]</li>
<li>Mutlak doğruluk kateterden düşüktür, ancak başlangıçtan itibaren değişim yeterliyse daha az invaziv izlem uygun olabilir. [[K6 s. 286–287]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Zaman ekseninde soğuk bolusun sıcaklık çukurunu çizin ve ölçülen alanı tarayın. [[K6 s. 281–282]] Yanına boya eğrisini çizip t₀, t₁, ikinci tepe ve uzatılmış ilk geçiş kuyruğunu işaretleyin. [[K6 s. 278–280]]</div>
<div class="note plain"><b>Ek sorular</b><ul><li>Basınç dalgasından debi ölçümünü nasıl kalibre edersiniz?</li><li>Prob açısı değişince aynı damardan neden farklı bir ses duyabilirsiniz?</li><li>Saf su akarken lazer Doppler hangi değeri verir?</li></ul></div></div></section>
<section class="wrap blk ders-sec" id="fk16-ozet"><h2>Özet</h2><ul class="ozet">
<li>Dilüsyonda pay verilen indikatör miktarı, payda ilk geçişin konsantrasyon–zaman alanıdır. [[K6 s. 277–280]]</li>
<li>Isıl indikatör tek soğuk bolusla ya da filamanın tekrarlı ısıtmasıyla oluşturulabilir. [[K6 s. 281–283]] Lityum dilüsyonu arter basıncı dalgasından sürekli debi ölçümünü kalibre edebilir. [[K6 s. 283]]</li>
<li>Ultrason Doppler hız bilgisi verir, inen aorttan toplam debiye geçişte ortalama hız, kesit ve düzeltme çarpanı birlikte kullanılır. [[K6 s. 284–286]]</li>
<li>Lazer Doppler mikrodolaşımdaki hareketli eritrositlerin hızına ve konsantrasyonuna bağlı bir fluks ölçer. [[K6 s. 287–289]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="16"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/15b">← Beer yasası, hemoglobin spektrumları, puls oksimetri, NIRS ve CO-oksimetri</a><a href="#/dersler/fizik/17">Sonraki: Ekipman yönetimi: kalibrasyon, temizlik ve sterilizasyon →</a></nav></section>`
};
