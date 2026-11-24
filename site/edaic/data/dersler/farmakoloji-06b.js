VERI.sorular = VERI.sorular || {};
VERI.sorular['far06b-1'] = {
  no: 1, kok: 'Tek kompartımanda bolus ve infüzyon', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 59–61]]',
  onermeler: [
    { t: 'Klirensin birimi mg/dk’dır.', d: false, n: 'Klirens birim zamanda ilaçtan arındırılan hacimdir ve mL/dk ile ifade edilir. [[K3 s. 59]]' },
    { t: 'Bir zaman sabiti sonunda bolus sonrası konsantrasyon başlangıcın yaklaşık %37’sidir.', d: true, n: 'Bir τ süresinde C₀ değeri C₀/e’ye iner. [[K3 s. 61]]' },
    { t: 'Bolus sonrası ln C–zaman doğrusunun eğimi k’dir.', d: false, n: 'Konsantrasyon azaldığı için eğim −k’dir. [[K3 s. 59]]' },
    { t: 'Kararlı durumda birim zamanda verilen ve elimine edilen ilaç miktarları eşittir.', d: true, n: 'İnfüzyonla giriş Cᵢ × I, eliminasyonla çıkış Cₛₛ × Cl olduğunda bu iki çarpım eşitlenir. [[K3 s. 61]]' },
    { t: 'Tek kompartımanlı modelde yarılanma ömrü bir zaman sabitinden uzundur.', d: false, n: 'Yarılanma ömrü zaman sabitinin 0,693 katıdır. [[K3 s. 61]]' },
  ],
};
VERI.sorular['far06b-2'] = {
  no: 2, kok: 'İki kompartımanlı modelde santral bolus', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 62–64]]',
  onermeler: [
    { t: 'Başlangıçtaki hızlı düşüşte periferik dağılımın payı vardır.', d: true, n: 'Başlangıçta eliminasyona santralden perifere geçiş eklenir. [[K3 s. 62]]' },
    { t: 'k₂₁ periferden santrale geçişin hız sabitidir.', d: true, n: 'Periferdeki ilaç santrale dönerken santral miktara katkısı +k₂₁X₂’dir. [[K3 s. 62–63]]' },
    { t: 'Terminal fazın hız sabiti β doğrudan k₁₀’a eşittir.', d: false, n: 'β, k₁₀ ile iki yönlü geçiş sabitlerinin ortak etkisini yansıtır. [[K3 s. 63–64]]' },
    { t: 'Bolustan hemen sonraki santral konsantrasyon A + B’dir.', d: true, n: 't = 0 anında iki üstel çarpan da bire eşittir. [[K3 s. 63]]' },
    { t: 'Santral kompartıman hacmi zorunlu olarak plazma hacmine eşittir.', d: false, n: 'Plazmayla benzer kinetik gösteren dokular da santral hacme katılır. [[K3 s. 63–64]]' },
  ],
};
VERI.sorular['far06b-3'] = {
  no: 3, kok: 'Üç kompartıman ve etki bölgesi', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 64–65]]',
  onermeler: [
    { t: 'Üçüncü kompartımana dağılım ikinciye göre daha hızlıdır.', d: false, n: 'Dağılım ikinci kompartımana daha hızlıdır. [[K3 s. 64]]' },
    { t: 'Kararlı durum dağılım hacmi üç kinetik hacmin toplamıdır.', d: true, n: 'Santral hacim ile iki periferik hacim birlikte Vₛₛ’yi verir. [[K3 s. 64]]' },
    { t: 'Vücut klirensi santral hacim ile eliminasyon hız sabitinin çarpımıdır.', d: true, n: 'İlaç sistemden santral kompartıman üzerinden uzaklaşır ve Cl = V₁ × k₁₀ olur. [[K3 s. 62–64]]' },
    { t: 'Etki kompartımanına ayrı bir dağılım hacmi atanmaz.', d: true, n: 'Etki kompartımanının hacmi yoktur; kan–beyin dengelenmesindeki gecikmeyi kₑ₀ ile temsil eder. [[K3 s. 65]]' },
    { t: 'Etki bölgesinin dengelenme yarılanma ömrü kₑ₀ ile ilişkilidir.', d: true, n: 'Kitap, gecikmeyi tanımlayan kₑ₀ sabitine ait yarılanma ömrünü t½kₑ₀ olarak adlandırır. [[K3 s. 65]]' },
  ],
};

const A06B_NAV = [
  ['bolus', 'Tek kompartıman'], ['infuzyon', 'Kararlı durum'], ['gecis', 'İki kompartıman'],
  ['faz', 'İki üstel faz'], ['hedef', 'Üç kompartıman ve etki'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/06b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 6 · Ders 06b', baslik: 'Kompartıman modelleri',
  lede: 'Bir bolustan sonra plazma düzeyi hızla düşebilir, oysa ilacın bir bölümü yalnızca dokulara geçmiştir. [[K3 s. 62]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A06B_NAV.map(([id, ad]) => `<button type="button" data-scroll="a06b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a06b-bolus">
  <h2>Tek kompartıman · Bir bolustan ne öğrenilir?</h2>
  <p class="intro">Tek kompartımanlı modelde bolus, iyi karışmış tek bir hacme anında ve eşit dağılır, ardından konsantrasyon tek bir hız sabitiyle üstel olarak azalır. [[K3 s. 57]]</p>
  <div class="viz a06b-sekiller"><div class="viz-head"><h3>Aynı bolusu üç görünümde okuyun</h3></div><div data-viz="a06b_bolus"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel eğriler ve başlangıç teğeti. [[K3 s. 59–61]]</p></div>
  <p>Araştırmacılar, ilaç verilen gönüllü veya hasta grubunda ölçülen plazma konsantrasyonlarına bir denklem uydurur. [[K3 s. 57]] Bu denklem başka koşullardaki plazma düzeyini öngörmeye yarar. [[K3 s. 57]] Birçok ilaçta düzey ile aktivite yakından ilişkili olduğundan farmakodinamik etki de öngörülebilir. [[K3 s. 57]]</p>
  <p>Kompartıman modelleri, fizyolojik modeller ve kompartımansız modeller bu amaçla kullanılan üç yaklaşımdır. [[K3 s. 57]] Tek kompartıman klinikteki ilaçlara seyrek uyar, ancak daha karmaşık modellerin temelini verir. [[K3 s. 57]]</p>
  <div class="cols"><div class="card"><h3>Hacmi kesişimden bulun</h3>
  <p>Bolus dozu X (mg), başlangıç düzeyi C₀ (mg/mL) ve dağılım hacmi Vd için <b>C₀ = X/Vd</b> olur. [[K3 s. 59]]</p>
  <p>Doğal logaritma alınca C = C₀e<sup>−kt</sup> denklemi ln C = ln C₀ − kt biçimine dönüşür. [[K3 s. 57–59]] Doğrunun düşey ekseni kestiği değer ln C₀’dır, buradan C₀ ve sonra Vd = X/C₀ bulunur. [[K3 s. 59]]</p></div>
  <div class="card"><h3>Azalmanın süresini okuyun</h3>
  <p>Eğimin büyüklüğü k, birim zamanda ilaçtan arındırılan hacim fraksiyonudur. [[K3 s. 59]] Tersi, modelleri ele alırken yarılanma ömrü yerine kullanılabilen zaman sabitidir (τ = 1/k). [[K3 s. 59–61]]</p>
  <p>Başlangıç hızı sürseydi konsantrasyon τ sonunda sıfıra inerdi. [[K3 s. 61]] Gerçek eğride aynı sürede C, C/e’ye (yaklaşık %37’ye) iner ve yarılanma daha erken gerçekleşir (t½ = 0,693τ). [[K3 s. 61]]</p></div></div>
  <h3>Hacim, miktar ve hız</h3>
  <p>Bir bolusun ardından “ne kadar ilaç kaldı?” sorusu ile “bir dakikada ne kadar ilaç uzaklaşıyor?” sorusunu ayrı okuyun. [[K3 s. 59–60]] İlk sorunun cevabı miktar eğrisinin yüksekliği, ikincisininki o anda eğriye çizilen teğetin eğiminin büyüklüğüdür. [[K3 s. 59–60]]</p>
  <ul><li><b>Klirens (Cl, mL/dk).</b> Birim zamanda ilaçtan arındırılan hacim, <b>k × Vd = Vd/τ</b> kadardır. [[K3 s. 59]] Modelde k ve Vd sabit olduğundan Cl de sabittir. [[K3 s. 59]] Hacimleri ve zaman sabitleri çok farklı iki ilacın Vd/τ oranları eşitse klirensleri aynıdır. [[K3 s. 59]]</li>
  <li><b>Kalan miktar (Xₜ, mg).</b> Bolustan sonra Xₜ = Xe<sup>−kt</sup> ilişkisiyle, konsantrasyon gibi üstel olarak sıfıra yaklaşır. [[K3 s. 59]]</li>
  <li><b>Miktarın değişim hızı (mg/dk).</b> Miktar eğrisinin teğet eğimi dXₜ/dt = −kXₜ’dir. [[K3 s. 59]] k yerine Cl/Vd ve Xₜ/Vd yerine C yazınca dXₜ/dt = −Cl × C elde edilir. [[K3 s. 60]] Eksi işareti miktarın azaldığını gösterir, uzaklaştırılan miktarın hızı ise Cl × C’dir; bu eliminasyon hızı, hız sabiti k’dan farklıdır. [[K3 s. 60]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a06b-infuzyon">
  <h2>Kararlı durum · Giriş çıkışı ne zaman karşılar?</h2>
  <p class="intro">Önceki doz hâlâ plazmadayken bolusu tekrarlamak testere dişi görünümü verir, sabit hızlı infüzyon ise konsantrasyonu düzgün bir eğriyle yükseltir. [[K3 s. 60]]</p>
  <div class="viz a06b-sekiller"><div class="viz-head"><h3>Uygulama biçimini değiştirin</h3></div><div data-viz="a06b_infuzyon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel plazma düzeyleri. [[K3 s. 60–61]]</p></div>
  <p>Aralıklı uygulamada her yeni doz, önceki dozdan kalanın üzerine eklenir. [[K3 s. 60]] Hedeflenen plazma düzeyinin oluşma hızında klirens rol oynar. [[K3 s. 60]] Sabit infüzyonda negatif üstel terim içeren yükseliş, kararlı durum düzeyine (Cₛₛ) yaklaşır. [[K3 s. 60–61]]</p>
  <ul><li><b>Girişi hesaplayın.</b> Enjektördeki konsantrasyon Cᵢ ile hacimsel infüzyon hızı I’nın çarpımı, birim zamanda verilen ilaç miktarıdır. [[K3 s. 61]]</li>
  <li><b>Çıkışı hesaplayın.</b> Kararlı durumdaki eliminasyon hızı Cₛₛ × Cl’dir. [[K3 s. 61]]</li>
  <li><b>Dengeyi kurun.</b> Giriş ve çıkış eşitlendiğinde Cᵢ × I = Cₛₛ × Cl olur. [[K3 s. 61]] Böylece sabit infüzyonda ulaşılacak düzey <b>Cₛₛ = (Cᵢ × I)/Cl</b> ile bulunur. [[K3 s. 61]]</li></ul>
  <p>Eğrinin yataylaştığı kısımda enjektör ilaç vermeyi sürdürür. [[K3 s. 60–61]] Plazma düzeyinin sabit kalmasını sağlayan, aynı sürede aynı miktarda ilacın elimine edilmesidir. [[K3 s. 61]] Bu nedenle kararlı düzeyi hesaplarken enjektördeki konsantrasyonu giriş tarafına, plazmadaki konsantrasyonu çıkış tarafına yazın. [[K3 s. 61]]</p>
</section>
<section class="wrap blk ders-sec" id="a06b-gecis">
  <h2>İki kompartıman · Plazmadan ayrılan ilaç nereye gider?</h2>
  <p class="intro">Santrale verilen bolustan sonra ilacın bir bölümü vücuttan uzaklaşırken bir bölümü geri dönebileceği periferik hacme dağılır. [[K3 s. 62]]</p>
  <div class="viz a06b-sekiller"><div class="viz-head"><h3>Santral miktarı değiştiren üç yol</h3></div><div data-viz="a06b_gecis"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel geçiş yönleri ve miktar dengesi. [[K3 s. 62–63]]</p></div>
  <p>Kompartımanlar, kan akımı ve ilaç alımı bakımından farklı dokuları ortak farmakokinetik davranışlarına göre gruplar. [[K3 s. 62]] “Damardan zengin” ve “damardan fakir” bu gruplar için kullanılan adlardır. [[K3 s. 62]] Kuramsal olarak istenen sayıda kompartıman kurulabilir, ancak üçten fazlasını deneysel olarak birbirinden ayırmak mümkün olmaz. [[K3 s. 62]]</p>
  <div class="cols"><div class="card"><h3>Hacimler neyi temsil eder?</h3>
  <p>Toplam dağılım hacmi, santral V₁ ile periferik V₂’nin toplamıdır. [[K3 s. 62]] Bunlar anatomik sınırlarla çizilmiş hacimler değildir. [[K3 s. 63–64]] Plazma gibi davranan dokuları da içerdiğinden V₁ çoğu zaman plazma hacmini aşar. [[K3 s. 64]]</p></div>
  <div class="card"><h3>Geçiş neden değişir?</h3>
  <p>Üstel geçişin hızını konsantrasyon farkı ve ilgili yönün hız sabiti belirler. [[K3 s. 62]] Hacimler ve geçiş hızları ilaçlar arasında büyük farklılık gösterebilir, çünkü ilacın fizikokimyasal özellikleri, metabolizma yeri ve hızı değişir. [[K3 s. 62]]</p></div></div>
  <p>Santrale X mg verildikten t süre sonra santralde X₁, periferde X₂ miktarında ilaç bulunsun. [[K3 s. 63]] Her akım, çıktığı kompartımandaki miktar ile o yolun hız sabitinin çarpımıdır. [[K3 s. 63]]</p>
  <p class="note"><b>Santral miktarın bilançosu</b><br>dX₁/dt = −k₁₀X₁ − k₁₂X₁ + k₂₁X₂. [[K3 s. 63]] İlk iki terim santral miktarı azaltır, üçüncüsü artırır, ancak yalnız k₁₀ yolu ilacı sistemin dışına taşır. [[K3 s. 62–63]]</p>
</section>
<section class="wrap blk ders-sec" id="a06b-faz">
  <h2>İki üstel faz · Eğride hangi süreç baskın?</h2>
  <p class="intro">İki kompartımanda erken düşüş tek kompartımandakinden diktir, çünkü eliminasyona perifere dağılım eklenir. [[K3 s. 62]]</p>
  <div class="viz a06b-sekiller"><div class="viz-head"><h3>Yarı logaritmik grafiği bileşenlerine ayırın</h3></div><div data-viz="a06b_faz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel eğri ve üstel bileşenleri. [[K3 s. 62–64]]</p></div>
  <p>Miktar denklemi Laplace dönüşümleriyle çözülür ve santral miktar V₁’e bölünerek plazma konsantrasyonu bulunur. [[K3 s. 63]] Sonuç <b>C = Ae<sup>−αt</sup> + Be<sup>−βt</sup></b> biçimindedir. [[K3 s. 63]]</p>
  <ul><li><b>Toplam eğri.</b> Ölçülen C’yi elde etmek için iki üstel terimi önce konsantrasyon ölçeğinde toplayın. [[K3 s. 63]] Yarı logaritmik grafikte her terim ayrı çizildiğinde doğru verirken ölçülen toplamın grafiği bükülür. [[K3 s. 62–63]]</li>
  <li><b>Kesişimler.</b> Bileşen doğrularını t = 0’a uzatınca ln A ve ln B okunur, buradan A ve B bulunur. [[K3 s. 63]] Başlangıçta C₀ = A + B olduğundan bolus dozu X için V₁ = X/(A + B) olur. [[K3 s. 63]] Burada hesaplanan hacim V₁’dir, çünkü bolus başlangıçta santrale verilir ve ölçülen konsantrasyon bu hacme aittir. [[K3 s. 62–63]]</li>
  <li><b>Eğimler.</b> Bileşenlerin eğimleri −α ve −β, zaman sabitleri ise τ<sub>α</sub> = 1/α ve τ<sub>β</sub> = 1/β’dır. [[K3 s. 63–64]] Her fazın kendi yarılanma ömrü vardır (t½α ve t½β). [[K3 s. 64]] Hem α hem β, üç hız sabitinin ortak etkisini içerir. [[K3 s. 63–64]]</li>
  <li><b>Erken faz.</b> Hızlı α fazında dağılım baskındır. [[K3 s. 62–63]] k₁₂/k₂₁ oranı yükseldikçe perifere geçiş geri dönüşe göre hızlanır ve ilk düşüş dikleşir. [[K3 s. 64]] Fentanilde bu oran yaklaşık 4:1’dir, bu yüzden bolustan sonra plazma düzeyi çok hızlı düşer. [[K3 s. 64]]</li>
  <li><b>Terminal faz.</b> Daha yavaş β fazında plazma düzeyinin düşüşünü hem periferden geri dönen ilaç hem de devam eden eliminasyon belirler. [[K3 s. 62–63]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a06b-hedef">
  <h2>Üç kompartıman · Dağılımdan etki bölgesine</h2>
  <p class="intro">Üçüncü kompartıman, santral hacimle daha yavaş ilaç alışverişi yapan ikinci bir periferik hacim (V₃) ekler. [[K3 s. 58]]</p>
  <div class="viz a06b-sekiller"><div class="viz-head"><h3>Propofol modelinde dağılımı ve hedefi seçin</h3></div><div data-viz="a06b_hedef"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel dağılım ve kan–beyin dengelenmesi. [[K3 s. 64–65]]</p></div>
  <p>İnfüzyon santral kompartımana girer ve ilaç vücuttan yalnız buradan uzaklaşır. [[K3 s. 62–64]] Modelde santral hacim plazmayı, V₂ iyi perfüze dokuları, V₃ az perfüze dokuları temsil edebilir. [[K3 s. 64]] İkinci kompartımana dağılım üçüncüye dağılımdan her zaman hızlıdır. [[K3 s. 64]]</p>
  <p>İlacın plazmadan kas ve yağa dağılımı nedeniyle bu düzen çoğu anestezik ajan için makul bir modeldir. [[K3 s. 64]] Kararlı durumdaki dağılım hacmi <b>Vₛₛ = V₁ + V₂ + V₃</b> olur. [[K3 s. 64]]</p>
  <div class="cols"><div class="card"><h3>Üçüncü üstel terim</h3>
  <p>V₃’e giriş ve oradan dönüş de hesaba katıldığında denklem C(t) = Ae<sup>−αt</sup> + Be<sup>−βt</sup> + Ge<sup>−γt</sup> olur. [[K3 s. 64]] G üçüncü terimin katsayısı, γ hız sabitidir. [[K3 s. 64]]</p>
  <p>Son faz tek bir üstel terimle tanımlanabilir. [[K3 s. 64]] Terminal eliminasyon yarılanma ömrü hem periferden dönüşü hem vücuttan uzaklaşmayı yansıtır. [[K3 s. 64]] Dolayısıyla terminal zaman sabitinin tersi k₁₀’u vermez. [[K3 s. 64]] Model parametreleri belirlendikten sonra k₁₀ hesaplanabilir ve <b>Cl = V₁ × k₁₀</b> bulunur. [[K3 s. 64]]</p>
  <p>Bu çarpımda hangi hacmi kullanacağınızı eliminasyon okundan okuyun: ilaç periferde de bulunabilir, ancak vücudu terk ettiği yol santral hacimden başlar. [[K3 s. 62–64]]</p></div>
  <div class="card"><h3>Etki kompartımanı</h3>
  <p>Klinikte üç kompartımanlı modelle plazma ya da etki konsantrasyonu hedeflenebilir. [[K3 s. 65]] Propofol modelinde etki bölgesi, kan ile beyin arasındaki dengelenme gecikmesini gösterir. [[K3 s. 65]]</p>
  <p>Bu bölgeye hacim atanmaz. [[K3 s. 65]] Santral düzeyle gecikmeli dengelenmeyi etki bölgesine ait eliminasyon hız sabiti kₑ₀ tanımlar, ilgili dengelenme yarılanma ömrü t½kₑ₀’dır. [[K3 s. 65]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="a06b-p1">
  <h2>Part I · MTF</h2><p>Her önermeyi doğru veya yanlış olarak işaretleyin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far06b-1"></div></div><div class="viz"><div data-viz="mtf" data-q="far06b-2"></div></div><div class="viz"><div data-viz="mtf" data-q="far06b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a06b-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><h3>Açılış sorusu</h3><p>Bir bolus sonrasında plazma düzeyi önce hızla, sonra daha yavaş düşüyor. Bu seyri nasıl modellersiniz? Modeli propofolde etki bölgesini hedefleyecek biçimde nasıl genişletirsiniz? [[K3 s. 62–65]]</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
  <li>Tek kompartımanda ln C–zaman grafiği doğrudur ve eğimi −k’dir. [[K3 s. 59–60]]</li>
  <li>İki kompartımanda ilk hızlı düşüşü santral eliminasyon ve eşzamanlı periferik dağılım açıklar. [[K3 s. 62]]</li>
  <li>Terminal düşüş, geri dağılım ile eliminasyonun birlikte etkisini taşır. [[K3 s. 62–63]]</li>
  <li>İki üstel terimin katsayıları başlangıçta toplanır ve V₁ = X/(A + B) verir. [[K3 s. 63]]</li>
  <li>Üçüncü kinetik hacim daha yavaş alışveriş yapar, eliminasyon santralde kalır. [[K3 s. 58]] [[K3 s. 64]]</li>
  <li>Hacimsiz etki kompartımanı, kₑ₀ aracılığıyla kan–beyin dengelenmesindeki gecikmeyi modele katar. [[K3 s. 65]]</li></ol>
  <div class="cols"><div class="note"><b>Çizin.</b> V₁’den iki periferik hacme gidiş ve dönüşü ayrı oklarla gösterin, eliminasyon okunu santralden çıkarın. [[K3 s. 62–64]] Etki bölgesini ayrıca işaretleyip gecikmenin yanına kₑ₀ yazın. [[K3 s. 65]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> k₁₂/k₂₁ oranı fentanilin ilk düşüşünü nasıl açıklar? [[K3 s. 64]] Sabit infüzyonda Cₛₛ nasıl hesaplanır? [[K3 s. 61]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a06b-ozet"><h2>Özet</h2><ul class="ozet">
  <li>Tek bolustan sonra ln C grafiğinin kesişimi başlangıç düzeyini, eğimi eliminasyon hız sabitini verir. [[K3 s. 59]]</li>
  <li>Klirens hacim/zaman, Cl × C ise miktar/zaman birimindedir. [[K3 s. 59–60]]</li>
  <li>Kararlı durumda birim zamandaki giriş ve çıkış eşittir. [[K3 s. 61]]</li>
  <li>İki kompartımanda ilk düşüşte dağılım baskındır, terminal eğim periferden dönüşü de içerir. [[K3 s. 62–63]]</li>
  <li>Üç kinetik hacim dağılıma katılır, vücuttan eliminasyon santral hacimden olur. [[K3 s. 64]]</li>
  <li>Etki bölgesinin dengeye gelişinde gecikme vardır, modele eklediği bir hacim yoktur. [[K3 s. 65]]</li></ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="06b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/06a">← 06a · Matematiksel kavramlar</a><a href="#/dersler/farmakoloji/06c">Sonraki: 06c · Kompartımansız modeller ve parametrelerin ölçülmesi →</a></nav>
</section>`,
};
