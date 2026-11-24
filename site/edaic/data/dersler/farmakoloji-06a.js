VERI.sorular = VERI.sorular || {};
VERI.sorular['far06a-1'] = {
  no: 1, kok: 'Model varsayımları ve üstel süreçler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 52–54]]',
  onermeler: [
    { t: 'Sanal kompartımanın hacmi ölçülmüş plazma hacmini verir.', d: false, n: 'Model, gerçek sıvı hacimlerini temsil etme varsayımı taşımaz. [[K3 s. 52]]' },
    { t: 'Bolus sonrası basit uzaklaşma eğrisinin başlangıç değeri C₀’dır.', d: true, n: 't = 0 iken üstel çarpan birdir ve C = C₀ olur. [[K3 s. 53–54]]' },
    { t: 'Bir zaman sabiti sonunda başlangıç konsantrasyonunun yaklaşık %63’ü kalır.', d: false, n: 'Yaklaşık %63 uzaklaşmıştır ve kalan konsantrasyon C₀/e’dir. [[K3 s. 53]]' },
    { t: 'Sabit hızlı infüzyonda kararlı duruma yaklaşırken konsantrasyon artışı yavaşlar.', d: true, n: 'Birikme eğrisi Cₛₛ düzeyine yaklaştıkça eğimi küçülür. [[K3 s. 53–54]]' },
    { t: 'Zaman sabiti yarılanma ömründen kısadır.', d: false, n: 'e, 2’den büyük olduğundan C/e düzeyine ulaşmak C/2 düzeyine ulaşmaktan uzun sürer. [[K3 s. 53]]' },
  ],
};
VERI.sorular['far06a-2'] = {
  no: 2, kok: 'Üs ve logaritma', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 54–56]]',
  onermeler: [
    { t: '10 tabanında 1000’in logaritması 3’tür.', d: true, n: '10’un üçüncü kuvveti 1000’dir. [[K3 s. 54–55]]' },
    { t: 'Taban değiştiğinde 1’in logaritması da değişir.', d: false, n: 'Logaritma eğrilerinin hepsi (1, 0) noktasından geçer. [[K3 s. 55]]' },
    { t: 'ln x gösteriminde taban e’dir.', d: true, n: 'Doğal logaritma, sayıyı e’nin kuvveti olarak yazarken kullanılan üssü verir. [[K3 s. 55–56]]' },
    { t: 'ln 2 yaklaşık 0,693’tür.', d: true, n: 'e’nin yaklaşık 0,693’üncü kuvveti 2’dir. [[K3 s. 56]]' },
    { t: 'x sıfıra sağdan yaklaşırken log x sıfıra yaklaşır.', d: false, n: 'Pozitif x küçüldükçe log x negatif sonsuza gider. [[K3 s. 55]]' },
  ],
};
VERI.sorular['far06a-3'] = {
  no: 3, kok: 'Konsantrasyon–zaman eğrisinde eğim ve alan', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 56–57]]',
  onermeler: [
    { t: 'Birinci dereceden eliminasyonda eğrinin eğimi sabittir.', d: false, n: 'Eğim −kC olduğundan konsantrasyonla birlikte değişir. [[K3 s. 56]]' },
    { t: 'Doğrusal kinetikte uzaklaşma hızı C’nin birinci kuvvetiyle orantılıdır.', d: true, n: 'Basit tek kompartımanlı modelde bu bağıntı dC/dt = −kC biçimindedir. [[K3 s. 56]]' },
    { t: 'Bazı ilaçlarda eliminasyon doyduğunda konsantrasyon–zaman grafiği bir doğru olur.', d: true, n: 'Sıfırıncı dereceden eliminasyonda konsantrasyon sabit hızla düşer. [[K3 s. 56]]' },
    { t: 'İntegral, zaman ekseninde seçilen iki sınır arasındaki alanı verir.', d: true, n: 'Konsantrasyonun zamana göre integrali, o aralıkta eğri altında kalan alanı ölçer. [[K3 s. 57]]' },
    { t: 'Toplam alan için integralin üst sınırı sonsuz zamandır.', d: true, n: 'Toplam alan hesaplanırken zaman sıfırdan sonsuza alınır. [[K3 s. 57]]' },
  ],
};

const A06A_NAV = [
  ['model', 'Model'], ['ustel', 'Üstel süreçler'], ['log', 'Logaritma'],
  ['turev', 'Türev'], ['alan', 'İntegral'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/06a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 6 · Ders 06a', baslik: 'Matematiksel kavramlar',
  lede: 'Bir bolustan sonra plazma konsantrasyonu önce hızla, sonra daha yavaş düşer. [[K3 s. 53]] Aynı eğrinin bir noktasındaki eğim anlık değişim hızını, iki zaman arasındaki alan ise konsantrasyonun o aralıktaki integralini verir. [[K3 s. 56–57]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A06A_NAV.map(([id, ad]) => `<button type="button" data-scroll="a06a-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a06a-model">
  <h2>Bir model neyi öngörür?</h2>
  <p class="intro">Farmakokinetik, vücudun verilen ilacı nasıl işlediğini inceler. [[K3 s. 52]]</p>
  <div class="viz"><div class="viz-head"><h3>Uygulamadan etkiye</h3></div><div data-viz="a06a_model"></div><p class="viz-cap" aria-live="polite">Doz ve doz aralığı değiştikçe modelin öngördüğü konsantrasyon seyri de değişir. [[K3 s. 52]]</p><p class="viz-foot">Şematik/nitel · Modelin kullanım basamakları. [[K3 s. 52]]</p></div>
  <p>Kompartıman modelinin denklemleri deneysel gözlemlerden elde edilir. [[K3 s. 52]] Doz, doz aralığı veya infüzyon değiştiğinde model, zaman içinde beklenen plazma konsantrasyonunu verir. [[K3 s. 52]]</p>
  <div class="cols">
    <div class="card"><h3>Hacim varsayımı</h3><p>Kompartıman hacmi sanaldır. [[K3 s. 52]] Plazma veya hücre dışı sıvı hacmini doğrudan göstermez. [[K3 s. 52]] Bir kompartımanı iyi ya da az perfüze olan dokularla eşleştirmek kullanışlıdır, ancak fizyolojik durumun yalnızca yaklaşık karşılığıdır. [[K3 s. 52]]</p></div>
    <div class="card"><h3>Gözlem sınırı</h3><p>Klinik modellerin parametreleri az sayıda hastadan elde edilmiştir. [[K3 s. 52]] Çalışmalardaki infüzyonlar, klinikteki en uzun infüzyonlardan daha kısa sürmüştür. [[K3 s. 52]]</p></div>
  </div>
  <p>Bir hedef plazma düzeyi seçildiğinde aynı ilişki uygulamayı yönlendirebilir. [[K3 s. 52]] Bilgisayar, hedef düzeye ve böylece istenen terapötik etkiye ulaşmak için infüzyon hızını zaman içinde değiştirecek biçimde programlanabilir. [[K3 s. 52]]</p>
  <p>Modelden infüzyon hızını hesaplarken üstel fonksiyon, logaritma, türev ve integral kullanılır. [[K3 s. 52]] Bir fonksiyon, bağımsız değişkenin her x değeri için tek bir y değeri tanımlar: y = f(x). [[K3 s. 52]] Burada zaman bağımsız, konsantrasyon bağımlı değişkendir: C = f(t). [[K3 s. 52–53]]</p>
</section>
<section class="wrap blk ders-sec" id="a06a-ustel">
  <h2>Üstel süreçlerde ne değişir?</h2>
  <p class="intro">Tek bir bolustan sonra konsantrasyon yüksekken düşüş hızlıdır. [[K3 s. 53]] Eşit sürelerde konsantrasyonun aynı oranı uzaklaşır. [[K3 s. 53]]</p>
  <div class="viz"><div class="viz-head"><h3>Başlangıç düzeyinden asimptota</h3></div><div data-viz="a06a_ustel"></div><p class="viz-cap" aria-live="polite">Tek bolustan sonra uzaklaşma eğrisi C₀ düzeyinden başlar ve sıfıra yaklaşır. [[K3 s. 53–54]]</p><p class="viz-foot">Şematik/nitel · Eğriler kendi başlangıç veya kararlı durum düzeyine göre çizilmiştir. [[K3 s. 53–54]]</p></div>
  <div class="cols">
    <div class="card"><h3>Bolus · uzaklaşma</h3><p>En basit tek kompartımanlı modelde <b>C = C₀e<sup>−kt</sup></b>. [[K3 s. 53]] Başlangıç düzeyini C₀, eğrinin dikliğini eliminasyon hız sabiti k belirler. [[K3 s. 53]] Bu iki sabit verilince ilacın uzaklaşma eğrisi tanımlanır. [[K3 s. 53]]</p></div>
    <div class="card"><h3>İnfüzyon · birikme</h3><p>Sabit hızda infüzyonda <b>C = C<sub>ss</sub>(1 − e<sup>−kt</sup>)</b>. [[K3 s. 54]] Başlangıçta konsantrasyon sıfırdır ve aynı k, kararlı durum düzeyi C<sub>ss</sub>’ye yaklaşmayı belirler. [[K3 s. 54]] Konsantrasyon artsa da artış yavaşladığı için üstel terimin işareti negatiftir. [[K3 s. 53–54]]</p></div>
  </div>
  <p>İki eğriyi soldan sağa izleyin. Bolusta azalma, infüzyonda artma vardır, ancak her iki eğride de bir zaman aralığında kat edilen düşey mesafe giderek küçülür. [[K3 s. 53–54]] Bu yüzden yalnızca eğrinin yukarı yönelmesi, pozitif üstel büyümeyi tanımak için yeterli değildir. [[K3 s. 53–54]]</p>
  <h3>Uzaklaşma eğrisinde iki zaman ölçüsü</h3>
  <ul><li><b>Zaman sabiti (τ = 1/k).</b> Bir τ sonra C, C/e’ye iner ve uzaklaşmanın yaklaşık %63’ü tamamlanır. [[K3 s. 53]] Üç τ sonra süreç neredeyse tamamdır. [[K3 s. 53]]</li>
  <li><b>Yarılanma ömrü (t½).</b> Bir t½ sonra C, C/2’ye iner. [[K3 s. 53]] Beş yarılanma ömründe uzaklaşma neredeyse tamamlanır. [[K3 s. 53]] e, 2’den büyük olduğu için τ, t½’den uzundur. [[K3 s. 53]]</li></ul>
  <p>Şekilde t½ işaretinden eğriye doğru çıkıldığında düşey eksendeki başlangıç değerinin yarısına ulaşılır. [[K3 s. 53]] Daha sağdaki τ işaretinde ise başlangıç değerinin 1/e kadarı kalır. [[K3 s. 53]] Başlangıçtan hangi süre kadar uzaklaşıldığı, kalan konsantrasyonun nasıl okunacağını belirler. [[K3 s. 53]]</p>
  <h3>Pozitif üstel büyüme</h3>
  <p>Genel biçim y = An<sup>ax</sup> olup n taban, x üsteki değişken, A ve a sabittir. [[K3 s. 53]] Taban değişebilir, ancak e<sup>x</sup> türevi ve integrali kendisine eşit olan tek fonksiyon olduğu için e ile işlem kolaydır. [[K3 s. 53]] e aşkın ve irrasyoneldir, tam sayıların oranıyla yazılamaz ve ondalık açılımı sonsuzdur. [[K3 s. 53]]</p>
  <aside class="note plain"><b>Atlas notu.</b> Kitap e’nin ilk basamaklarını 2,716… verir. Doğrusu 2,718…’dir.</aside>
  <p>Pozitif üstel büyümede (y = Ae<sup>ax</sup>, A ve a pozitif) teğet giderek dikleşir. [[K3 s. 53]] Bileşik faizle büyüyen yatırım ve bakteri çoğalması buna örnektir. [[K3 s. 53]] Tek bakteri ikiye bölünür, oluşan iki bakteri de bölünür. [[K3 s. 54]] Bölünmeler arası süre d ise t anındaki sayı N = 2<sup>t/d</sup> olur. [[K3 s. 54]]</p>
</section>
<section class="wrap blk ders-sec" id="a06a-log">
  <h2>Logaritma hangi üssü verir?</h2>
  <p class="intro">Pozitif bir x sayısını 10<sup>y</sup> biçiminde yazdığınızda üs, x’in 10 tabanındaki logaritmasıdır. [[K3 s. 54–55]]</p>
  <div class="viz"><div class="viz-head"><h3>Sayıyı seçin, üssü okuyun</h3></div><div data-viz="a06a_log"></div><p class="viz-cap" aria-live="polite">10’un sıfırıncı kuvveti 1 olduğundan log 1 = 0 olur. [[K3 s. 55]]</p><p class="viz-foot">Üsler seçilen tabana göredir. [[K3 s. 54–56]]</p></div>
  <p>1000’i seçince üst kutuda 10’un hangi kuvvetinin 1000 olduğu, alt kutuda aynı işlemin logaritma ile yazılışı görülür. [[K3 s. 54–55]] 5’i seçtiğinizde üs tam sayı değildir: 5, yaklaşık olarak 10’un 0,699’uncu kuvvetidir. [[K3 s. 54–55]]</p>
  <p>y = log x ile x = 10<sup>y</sup> aynı ilişkiyi anlatır, dolayısıyla x = 10<sup>log x</sup> olur. [[K3 s. 54–55]] Her logaritma eğrisi (1, 0) noktasından geçer. [[K3 s. 55]] 10 tabanında eğrinin üst sınırı yoktur ve x sıfıra sağdan yaklaşırken log x negatif sonsuza gider. [[K3 s. 55]] Negatif bir sayının gerçek logaritması yoktur. [[K3 s. 55]]</p>
  <aside class="note plain"><b>Atlas notu.</b> Kitap asimptotu x ekseni üzerinde tarif eder. Doğru asimptot x = 0 doğrusu, yani y eksenidir.</aside>
  <p>log x için taban 10, ln x için e, log<sub>n</sub> x için n’dir. [[K3 s. 56]] Farmakokinetikte üstel terim e tabanlı olduğundan logaritmik dönüşümde doğal logaritma kullanılır. [[K3 s. 55–56]] ln 2 ≈ 0,693 değeri iki süreyi birbirine bağlar: t½ = τ ln 2. [[K3 s. 53–56]] Üstel ve logaritmik denklemlerle işlemler kitabın ekinde (s. 69) sürer. [[K3 s. 56]]</p>
</section>
<section class="wrap blk ders-sec" id="a06a-turev">
  <h2>Türev: o anda ne kadar hızlı?</h2>
  <p class="intro">C–zaman grafiğinde bir noktaya çizilen teğetin eğimi, o andaki konsantrasyon değişim hızıdır (dC/dt). [[K3 s. 56]]</p>
  <div class="viz"><div class="viz-head"><h3>Teğeti eğri boyunca taşıyın</h3></div><div data-viz="a06a_turev"></div><p class="viz-cap" aria-live="polite">Erken noktada C yüksek olduğundan teğetin aşağı yönlü eğimi daha diktir. [[K3 s. 56]]</p><p class="viz-foot">Şematik/nitel · Kesikli çizgi seçili noktadaki teğettir. [[K3 s. 56]]</p></div>
  <div class="cols"><div class="card"><h3>Birinci derece</h3><p>Basit tek kompartımanlı modelde uzaklaşma hızı C’nin birinci kuvvetiyle orantılıdır. [[K3 s. 56]] Diferansiyel denklem <b>dC/dt = −kC</b> olur ve buna doğrusal kinetik denir. [[K3 s. 56]]</p></div>
  <div class="card"><h3>Sıfırıncı derece</h3><p>Bazı ilaçlarda eliminasyon süreçleri doyduğunda C sabit hızla düşer. [[K3 s. 56]] <b>dC/dt = −k</b> denkleminde hız C’den bağımsızdır (C<sup>0</sup> = 1) ve grafik bir doğrudur. [[K3 s. 56]]</p></div></div>
  <p>Birinci derecede teğeti bulmak için C₀e<sup>−kt</sup> ifadesinin zamana göre türevini alın. [[K3 s. 56]] Üstel terim korunur ve üs içindeki −kt’nin zamana göre türevi olan −k çarpanı gelir. [[K3 s. 56]] Başlangıç konsantrasyonu C₀ ise sabit çarpan olarak kalır. [[K3 s. 53–56]]</p>
  <aside class="note plain"><b>Atlas notu.</b> Kitap ara satırda C₀e<sup>−kt</sup> ifadesinin türevini −C₀e<sup>−kt</sup> olarak yazar. Doğru türev −kC₀e<sup>−kt</sup> = −kC’dir.</aside>
</section>
<section class="wrap blk ders-sec" id="a06a-alan">
  <h2>İntegral: iki zaman arasında ne kadar alan var?</h2>
  <p class="intro">Konsantrasyonu zamana göre integre etmek, seçilen iki zaman arasında eğrinin altında kalan alanı hesaplamaktır. [[K3 s. 57]]</p>
  <div class="viz"><div class="viz-head"><h3>İntegralin sınırlarını izleyin</h3></div><div data-viz="a06a_alan"></div><p class="viz-cap" aria-live="polite">Renkli alanı iki zaman sınırı arasında okuyun. [[K3 s. 57]]</p><p class="viz-foot">Şematik/nitel · Toplam alan görünümünde eğri çizimin sağında sürer. [[K3 s. 57]]</p></div>
  <p>İki zaman seçildiğinde yalnızca bu zamanların arasında, eğri ile zaman ekseni arasındaki bölgeyi okuyun. [[K3 s. 57]] Farmakokinetikte tüm uzaklaşmayı incelemek için alt sınırı ilacın verildiği ana, üst sınırı sonsuza taşıyın. [[K3 s. 53–57]]</p>
  <p>Toplam alan <b>∫₀<sup>∞</sup> C₀e<sup>−kt</sup> dt</b> ile gösterilir. [[K3 s. 57]] “dt” integrali zaman boyunca aldığımızı belirtir. [[K3 s. 57]]</p>
  <p>İntegral alma, türev almanın ters işlemidir. [[K3 s. 57]] dC/dt = −kC denkleminin integrali alınırsa, sonsuz zamanda konsantrasyonun sıfır olması gerektiği de bilinerek, uzaklaşma eğrisi C = C₀e<sup>−kt</sup> yeniden elde edilir. [[K3 s. 57]]</p>
</section>
<section class="wrap blk ders-sec" id="a06a-p1"><h2>Part I · MTF</h2><p>Her önermeyi doğru veya yanlış olarak işaretleyin.</p>
<div class="viz"><div data-viz="mtf" data-q="far06a-1"></div></div><div class="viz"><div data-viz="mtf" data-q="far06a-2"></div></div><div class="viz"><div data-viz="mtf" data-q="far06a-3"></div></div></section>
<section class="wrap blk ders-sec" id="a06a-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Bir bolustan sonraki uzaklaşma eğrisini çizin. Başlangıç değerini, zaman sabitini, teğetin eğimini ve eğri altındaki toplam alanı nasıl açıklarsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Yatay eksene zamanı, düşey eksene C’yi koyup eğriyi t = 0’da C₀’dan başlatırım. [[K3 s. 53–54]]</li>
<li>Basit modelde C = C₀e<sup>−kt</sup> olduğundan eğri sıfıra yaklaşır. [[K3 s. 53–54]]</li>
<li>Bir τ = 1/k sonunda C₀/e, bir yarılanma ömrü sonunda C₀/2 düzeyini işaretlerim. [[K3 s. 53]]</li>
<li>Teğetin eğimi −kC’dir ve C düştükçe eğimin mutlak değeri küçülür. [[K3 s. 56]]</li>
<li>t = 0’dan sonsuza kadar eğri altında kalan alanı ∫₀<sup>∞</sup> C₀e<sup>−kt</sup> dt olarak yazarım. [[K3 s. 57]]</li></ol>
<p class="note"><b>Çizin.</b> Eğri üzerinde t½ ve τ’yı gösterin, erken ve geç birer noktaya teğet çizin ve toplam alanı tarayın. [[K3 s. 53–57]]</p>
<h3>Olası ek sorular</h3><ul><li>Sabit hızlı infüzyonda asimptot hangi düzeyi gösterir?</li><li>ln 2 hangi iki süreyi ilişkilendirir?</li><li>Eliminasyon doyduğunda teğete ne olabilir?</li></ul></section>
<section class="wrap blk ders-sec" id="a06a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Model, uygulama biçiminden plazma konsantrasyonunu ve buna bağlı klinik etkiyi öngörmeye yardım eder. [[K3 s. 52]]</li>
<li>Bolus eğrisi sıfıra, sabit infüzyon eğrisi kararlı durum konsantrasyonuna yaklaşır. [[K3 s. 53–54]]</li>
<li>Bir τ’da C/e, bir t½’de C/2 kalır. [[K3 s. 53]]</li>
<li>ln 2, yaklaşık 0,693’tür ve yarılanma ömrünün zaman sabitine oranını verir. [[K3 s. 53–56]]</li>
<li>Birinci derecede eğim −kC, sıfırıncı derecede −k’dir. [[K3 s. 56]]</li>
<li>Toplam alanın zaman sınırları 0 ve ∞’dur. [[K3 s. 57]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="06a"></div>
<nav class="ders-gec"><a href="#/dersler/farmakoloji/05">← 5 · İzomerizm</a><a href="#/dersler/farmakoloji/06b">Sonraki: 06b · Kompartıman modelleri →</a></nav></section>`,
};
