VERI.sorular = VERI.sorular || {};
VERI.sorular['fk27-1'] = {
  no: 1, kok: 'Sayılar, ölçekler ve fonksiyonlar', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 426–432]]',
  onermeler: [
    {t:'Anlamlı basamak sayısı yalnız virgülden sonraki rakamları sayar.',d:false,n:'Anlamlı basamaklar virgülün her iki yanında bulunabilir. [[K6 s. 426]]'},
    {t:'0,333… sayısı iki tam sayının oranı biçiminde yazılabilir.',d:true,n:'Bu devirli ondalık sayı 1/3 kesrine eşittir. [[K6 s. 428]]'},
    {t:'pH 7,1 olan çözeltide hidrojen iyonu derişimi pH 7,4 olanın yaklaşık yarısıdır.',d:false,n:'Derişimler sırasıyla yaklaşık 80 ve 40 nmol/L olduğundan ilk çözeltide derişim yaklaşık iki kattır. [[K6 s. 430]]'},
    {t:'Doğrusal bir fonksiyonun eğimi x ile değişir.',d:false,n:'Bir doğru boyunca y’deki değişimin x’teki değişime oranı sabittir. [[K6 s. 431]]'},
    {t:'Polinomun derecesini, katsayısı sıfır olmayan en yüksek kuvvetli terim belirler.',d:true,n:'İkinci dereceden polinomda en yüksek kuvvet x²’dir. [[K6 s. 432]]'}
  ]
};
VERI.sorular['fk27-2'] = {
  no: 2, kok:'Açı, eğim ve alan', kagit:'Paper A · Fizik', kaynak:'[[K6 s. 432–439]]',
  onermeler:[
    {t:'Hipotenüs, dik açının karşısındadır.',d:true,n:'Dik üçgenin en uzun kenarı 90°’nin karşısında yer alır. [[K6 s. 432]]'},
    {t:'Sinüs ile kosinüs arasındaki faz farkı π radyandır.',d:false,n:'Faz farkı π/2 radyan, yani 90°’dir. [[K6 s. 435]]'},
    {t:'Bir sabitin x’e göre türevi sıfırdır.',d:true,n:'x değişirken sabitin değeri değişmez. [[K6 s. 436]]'},
    {t:'Belirli integralde integrasyon sabiti sonuçtan düşer.',d:true,n:'Üst ve alt sınırdaki değerler çıkarılırken aynı sabit kendisinden çıkarılır. [[K6 s. 437–438]]'},
    {t:'Akım–zaman grafiğinde inspirasyon bölgesinin eğimi inspirasyon hacmini verir.',d:false,n:'Hacmi akımın zamana göre integrali verir. [[K6 s. 439]]'}
  ]
};
VERI.sorular['fk27-3'] = {
  no:3, kok:'Üstel değişim ve eliminasyon', kagit:'Paper A · Fizik', kaynak:'[[K6 s. 440–444]]',
  onermeler:[
    {t:'Basit faizde ikinci yılın faizi ilk yıl sonundaki toplam bakiyeye uygulanır.',d:false,n:'Basit faizde her yıl başlangıç tutarı esas alınır. [[K6 s. 442]]'},
    {t:'Ardışık karelerde para sayısı ikiye katlanıyorsa artış üsteldir.',d:true,n:'İlk karede iki para varsa n’inci karedeki para sayısı 2ⁿ olur. [[K6 s. 440–441]]'},
    {t:'Birinci dereceden eliminasyonda derişimin azalma hızı o andaki plazma derişimiyle orantılıdır.',d:true,n:'Derişim düştükçe birim zamanda uzaklaştırılan miktar azalır. [[K6 s. 443]]'},
    {t:'Eliminasyon sabiti büyüdüğünde derişim daha hızlı düşer.',d:true,n:'Daha büyük eliminasyon sabiti, aynı derişimde daha hızlı azalmaya karşılık gelir. [[K6 s. 443–444]]'},
    {t:'Bir yarı ömür sonra o aralığın başındaki derişimin %50’si kalır.',d:true,n:'Yarı ömür, derişimin yarıya düşmesi için geçen süredir. [[K6 s. 444]]'}
  ]
};

(() => {
  const nav = [['temel','Sayılar'],['log','Logaritma ve pH'],['fonk','Fonksiyonlar'],['ucgen','Dik üçgen'],['dalga','Radyan ve faz'],['kalk','Türev ve integral'],['araba','Hız ve yol'],['solunum','Akım ve hacim'],['buyume','Üstel büyüme'],['azalma','Üstel azalma'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  const figure = (name,title,foot) => `<div class="viz"><div class="viz-head"><h3>${title}</h3></div><div data-viz="fk27_${name}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${foot}</p></div>`;
  SAYFALAR['dersler/fizik/27'] = {
    grup:'dersler', eyebrow:'Fizik · Bölüm 27', baslik:'Temel matematik kavramlar: fonksiyonlar, kalkülüs, üstel büyüme ve azalma',
    lede:'Ventilatördeki akım eğrisinin yüksekliği, eğimi ve altında kalan alan üç ayrı soruya yanıt verir. [[K6 s. 439]]',
    html:`<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad])=>`<button type="button" data-scroll="fk27-${id}">${ad}</button>`).join('')}</nav>
<div class="fk27-ders">
<section class="wrap blk ders-sec" id="fk27-temel">
<h2>Bir sayıyı nasıl yazmalı?</h2>
<p class="intro">Aynı niceliği kesirle, ondalık gösterimle veya on kuvvetleriyle ifade edebiliriz. [[K6 s. 426–428]]</p>
${figure('kesir','Bir bütünden kaç parça aldınız?','Paydayı sabit tutup payı değiştirin. [[K6 s. 426–428]]')}
<h3>Kesirden anlamlı basamağa</h3>
<ul><li><b>Kesir.</b> Payda bütünü kaç eşit parçaya ayırdığımızı, pay bu parçalardan kaçını aldığımızı gösterir. [[K6 s. 426–428]] Örneğin %12,5 = 0,125 = 1/8’dir. [[K6 s. 426]]</li>
<li><b>Devirli ondalık.</b> Aynı rakam sonsuza kadar yinelendiğinde rakamın üzerine nokta koyabiliriz: 1/3 = 0,3̇. [[K6 s. 428]]</li>
<li><b>İrrasyonel sayı.</b> İki tam sayının kesriyle ifade edilemez ve ondalık açılımı sona ermez. [[K6 s. 428]] Hesapta kullanacağımız basamağa yuvarlarız: √2 ≈ 1,414. [[K6 s. 428]]</li>
<li><b>Yuvarlama.</b> Ondalık basamak sayısı virgülden sonraki haneleri, anlamlı basamak sayısı virgülün iki yanındaki anlamlı rakamların toplamını belirtir. [[K6 s. 426]] Örneğin dört anlamlı basamakla 2,4936 → 2,494 ve 24,9357 → 24,94 olur. [[K6 s. 426]]</li></ul>
<p>Şekilde bir parçadan iki parçaya geçiş, 1/3 + 1/3 = 2/3 işlemidir. [[K6 s. 426–428]] Bütünün bölündüğü eşit parça sayısı değişmediği için toplarken payda aynı kalır. [[K6 s. 426–428]] Farklı paydalı kesirleri toplarken veya çıkarırken önce aynı büyüklükteki parçalarla ifade edin. [[K6 s. 426–428]]</p>
<div class="fk27-hesap"><b>Aynı sayının iki yuvarlaması</b><p>√2 için verilen 1,414 değerini iki ondalık basamağa yuvarlarsanız 1,41, iki anlamlı basamağa yuvarlarsanız 1,4 elde edersiniz. [[K6 s. 426–428]] İlk işlemde virgülün sağından iki hane, ikinci işlemde soldaki ilk anlamlı rakamdan başlayarak toplam iki hane tutulur. [[K6 s. 426–428]]</p></div>
<h3>Cebirin kısa yazımı</h3>
<p>Bilinmeyen nicelikler <i>x</i> ve <i>y</i> gibi harflerle ya da Yunan harfleriyle gösterildiğinde aynı yasa değişen değerler için yazılabilir. [[K6 s. 426]] Gerilim <i>V</i>, akım <i>I</i> ve sıcaklık <i>T</i> birer değişken, ışık hızı <i>c</i> ve kütleçekim sabiti <i>G</i> birer sabittir. [[K6 s. 427]] Her iki türün simgesi de eğik yazılır. [[K6 s. 427]]</p>
<ul><li>Çarpma işaretini bilinmeyen <i>x</i> ile karıştırmamak için <i>a</i> × <i>b</i> yerine <i>ab</i> veya <i>a</i>·<i>b</i> yazılabilir. [[K6 s. 427]]</li>
<li>Çarpma ve bölme, toplama ve çıkarmadan önce gelir. [[K6 s. 427]] Örneğin <i>a</i> + <i>bc</i> ifadesinde önce çarpım, (<i>a</i> + <i>b</i>)<i>c</i> ifadesinde önce parantez içindeki toplam hesaplanır. [[K6 s. 427]]</li>
<li>Pozitif sayının önündeki artı çoğunlukla yazılmaz, negatif sayının önünde eksi bulunur. [[K6 s. 427]] İki negatif çarpanın çarpımı pozitif, biri pozitif diğeri negatif iki çarpanın çarpımı negatiftir. [[K6 s. 427]]</li></ul>
<div class="fk27-hesap"><b>Bilimsel gösterim</b><p><i>a</i> × 10<sup><i>b</i></sup> yazımında <i>a</i> katsayı, <i>b</i> ise 10’un üssüdür. [[K6 s. 428]] Katsayı genellikle 1 ile 10 arasında seçilir ve üç, en çok dört anlamlı basamağa yuvarlanır. [[K6 s. 428]]</p><p>Pozitif bir sayı 1’den küçükse bu gösterimde üs negatiftir. [[K6 s. 428–429]] Örneğin 4 750 000 = 4,75 × 10⁶ ve 0,000028 = 2,8 × 10<sup>−5</sup>’tir. [[K6 s. 428]] 10⁶ milyon, 10³ bin, 10⁰ = 1, 10<sup>−1</sup> = 0,1 ve 10<sup>−2</sup> = 0,01’dir. [[K6 s. 429]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk27-log">
<h2>Logaritma ve pH ölçeği</h2>
<p class="intro">Logaritma “Bu sayıyı elde etmek için tabanı hangi kuvvete yükseltmeliyim?” sorusunu yanıtlar. [[K6 s. 429]]</p>
${figure('ph','pH 7,4’ten 7,1’e indiğinde ne değişir?','Kaydırıcıdaki pH için noktanın yüksekliği hidrojen iyonu derişimini verir. [[K6 s. 430]]')}
<p><i>b</i><sup><i>y</i></sup> = <i>x</i> ise log<sub><i>b</i></sub>(<i>x</i>) = <i>y</i> olur. [[K6 s. 429]] Yaygın iki taban 10 ve Euler sayısı <i>e</i>’dir: “log” genellikle 10 tabanını, “ln” doğal logaritmayı belirtir. [[K6 s. 429]] Örneğin log 100 000 = 5, log 236 = 2,373 (10<sup>2,373</sup> = 236) ve ln 7,839 = 2’dir (<i>e</i>² = 7,839). [[K6 s. 429]]</p>
<p>Tabanı ve sonucu yerlerine koyarak kontrol edebilirsiniz: log<sub>10</sub>(1) = 0 çünkü 10⁰ = 1; ln(<i>e</i>) = 1 çünkü <i>e</i>¹ = <i>e</i>. [[K6 s. 428–429]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap <i>e</i> için 2,7818 yazar; doğru yaklaşık değer 2,71828’dir. [[K6 s. 429]]</div>
<p>Logaritma büyük sayılarla hesap yapmayı kolaylaştırır. [[K6 s. 429–430]] Cep hesap makinelerinden önce çarpma ve bölme için logaritma tabloları veya sürgülü hesap cetveli kullanılırdı. [[K6 s. 429–430]] Apollo döneminde NASA mühendisleri ve görev kontrol ekipleri de sürgülü cetvel kullanıyordu. [[K6 s. 429–430]]</p>
<ul><li>Çarpımın logaritması: log(<i>ab</i>) = log <i>a</i> + log <i>b</i>. [[K6 s. 429–430]]</li>
<li>Bölümün logaritması: log(<i>a</i>/<i>b</i>) = log <i>a</i> − log <i>b</i>. [[K6 s. 429–430]]</li>
<li>Kuvvetin logaritması: log(<i>a</i><sup><i>n</i></sup>) = <i>n</i> log <i>a</i>; aynı tabanlı doğal logaritmalar için de bu kurallar geçerlidir. [[K6 s. 429–430]]</li></ul>
<div class="fk27-hesap"><b>Logaritmayla çarpma</b><p>Tablodaki 100 ve 1 000 değerlerini on kuvvetleriyle yazın: 10² × 10³ = 10⁵. [[K6 s. 428–430]] Aynı hesabı logaritmayla yaparken 2 ve 3’ü toplar, sonra tabanı bu toplama yükseltirsiniz. [[K6 s. 429–430]] Bölmede ise 1 000/100 için üslerin farkı 3 − 2 = 1 olduğundan sonuç 10¹’dir. [[K6 s. 429–430]]</p></div>
<p>Hidrojen iyonu derişimi geniş bir aralığa yayıldığından pH logaritmik ölçekte gösterilir: pH = −log<sub>10</sub>[H⁺] (derişimin mol/L cinsinden sayısal değeri). [[K6 s. 430]] Bu nedenle pH farkını yorumlarken derişimlerin oranına bakarız. [[K6 s. 430]]</p>
<table class="tbl"><thead><tr><th>pH</th><th>[H⁺] (nmol/L)</th></tr></thead><tbody>${[['3','1 000 000'],['6','1 000'],['7','100'],['7,1','80'],['7,4','40'],['7,7','20'],['8','10'],['9','1']].map(([p,h])=>`<tr><td>${p}</td><td>${h} [[K6 s. 430]]</td></tr>`).join('')}</tbody></table>
<p>Tabloyu yukarıdan aşağıya okuyunca pH 6’dan 7’ye çıkarken derişimin 1 000’den 100 nmol/L’ye indiğini görürsünüz. [[K6 s. 430]] Aynı bir birimlik adım pH 8’den 9’a geçişte derişimi 10’dan 1 nmol/L’ye düşürür. [[K6 s. 430]] İki geçişte mutlak derişim farkları farklı, başlangıç değerine göre azalma oranları aynıdır. [[K6 s. 430]]</p>
<div class="fk27-hesap"><b>Derişim oranını okuyun</b><p>pH 7,1 ve 7,4 için yuvarlanmış değerleri bölün: 80/40 = 2. [[K6 s. 430]] pH farkı yalnız 0,3 iken daha düşük pH’lı çözeltide yaklaşık iki kat H⁺ bulunur. [[K6 s. 430]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk27-fonk">
<h2>Fonksiyonun biçimi ve eğimi</h2>
<p class="intro">Bir fonksiyon bir veya birkaç bağımsız değişkenin değerini bir sonuca bağlar: <i>y</i> = <i>f</i>(<i>x</i>); <i>y</i> bağımlı, <i>x</i> bağımsız değişkendir. [[K6 s. 430–431]]</p>
${figure('egim','Teğeti doğru ve parabol üzerinde gezdirin','Şemada katsayıları birim seçilen iki polinom karşılaştırılır. [[K6 s. 431–432]]')}
<div class="fk27-hesap"><b>Eşit adımları karşılaştırın</b><p>Şekilde <i>x</i> sırasıyla 0, 1 ve 2 iken <i>y</i> = <i>x</i> doğrusunun çıktıları 0, 1 ve 2’dir. [[K6 s. 431]] Aynı girdiler <i>y</i> = <i>x</i>² parabolünde 0, 1 ve 4 verir. [[K6 s. 432]] İkinci yatay adım da bir birimdir, ancak parabolde karşılık gelen düşey değişim üç birime çıkmıştır. [[K6 s. 431–432]]</p></div>
<ul><li><b>Tek girdi.</b> Dairenin alanı <i>A</i> = π<i>r</i>² yalnız yarıçapa bağlıdır; yarıçap iki katına çıkarsa alan dört katına çıkar. [[K6 s. 431]]</li>
<li><b>İki girdi.</b> Beden kitle indeksi, kütlenin (kg) boyun (m) karesine bölümüdür; birimi kg/m²’dir. [[K6 s. 431]]</li>
<li><b>Doğru.</b> <i>y</i> = <i>mx</i> + <i>c</i> denkleminde <i>c</i>, <i>x</i> sıfırken elde edilen değer, <i>m</i> ise Δ<i>y</i>/Δ<i>x</i> eğimidir. [[K6 s. 431]] Aynı yatay adımı doğrunun neresinde atarsak atalım dikey değişim aynıdır. [[K6 s. 431]]</li>
<li><b>Polinom.</b> <i>ax</i>² + <i>bx</i> + <i>c</i> ifadesinde <i>a</i>, <i>b</i> ve <i>c</i> katsayılardır. [[K6 s. 432]] Daha yüksek dereceli polinomlarda <i>x</i>’in daha yüksek tam sayı kuvvetleri de yer alır. [[K6 s. 432]] Dereceyi en yüksek sıfır olmayan terimin üssü belirler: doğru birinci, parabol ikinci derecedendir. [[K6 s. 431–432]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk27-ucgen">
<h2>Dik üçgende hangi kenar?</h2>
<p class="intro">Eski Yunan’da sistemleştirilen trigonometri, kenar uzunlukları ile açıları ilişkilendirir; mekanikte, dalgalarda ve basit harmonik harekette kullanılır. [[K6 s. 432]]</p>
${figure('ucgen','Bir açının üç oranı','Hipotenüs, 90°’nin karşısındaki en uzun kenardır. [[K6 s. 432]]')}
<p>Önce θ açısını seçin: karşı kenar onun karşısındadır, komşu dik kenar ise bu açıyı hipotenüsle birlikte oluşturur. [[K6 s. 432–433]] Aynı açıyı koruyarak üçgeni büyütürseniz kenarların oranı değişmez. [[K6 s. 433]]</p>
<table class="tbl"><thead><tr><th>İşlev</th><th>Kenar oranı</th></tr></thead><tbody><tr><td>sin θ</td><td>Karşı / hipotenüs [[K6 s. 433]]</td></tr><tr><td>cos θ</td><td>Komşu / hipotenüs [[K6 s. 433]]</td></tr><tr><td>tan θ</td><td>Karşı / komşu [[K6 s. 433]]</td></tr></tbody></table>
<p>Komşu ve karşı adları seçilen açıya bağlıdır. [[K6 s. 432–433]] Şekilde θ yerine öteki dar açıya bakarsanız karşı ve komşu kenarlar yer değiştirir, hipotenüs aynı kalır. [[K6 s. 432–433]] Bu yüzden bir açının sinüsü, öteki dar açının kosinüsüne eşittir. [[K6 s. 433]]</p>
<p><b>SOH–CAH–TOA</b> sırasıyla sine–opposite–hypotenuse, cosine–adjacent–hypotenuse ve tangent–opposite–adjacent sözcüklerinin baş harflerini birleştirir. [[K6 s. 433]] Pisagor teoremine göre hipotenüsün karesi iki dik kenarın karelerinin toplamıdır. [[K6 s. 433]] Her terimi hipotenüsün karesine bölerseniz sin²θ + cos²θ = 1 elde edilir. [[K6 s. 433–435]]</p></section>
<section class="wrap blk ders-sec" id="fk27-dalga">
<h2>Daireden dalgaya: radyan ve faz</h2>
<p class="intro">Çember üzerinde ilerleyen açıyı radyanla ifade etmek daire ve dalga hesaplarını kolaylaştırır. [[K6 s. 434]]</p>
${figure('dalga','Aynı açıda iki farklı dalga değeri','İki eğrinin tepeleri arasında çeyrek çevrim vardır. [[K6 s. 434–435]]')}
<p>Çevrenin çapa oranı π = 3,14159265359’dur (12 anlamlı basamak); π iki tam sayının oranı olarak yazılamaz. [[K6 s. 433–434]] Yarıçap <i>r</i> ise çevre 2π<i>r</i>, alan π<i>r</i>² olur. [[K6 s. 431]] [[K6 s. 433–434]]</p>
<p>Bir radyan, uzunluğu yarıçapa eşit yayı gören merkez açıdır; üç anlamlı basamakla 57,3° eder. [[K6 s. 434]] Tam tur 2π radyan (360°), yarım tur π radyan (180°), çeyrek tur π/2 radyandır (90°). [[K6 s. 434–435]] Radyan değerleri sıklıkla tam sayı çıkmasa da dalga, dairesel hareket ve faz grafiklerinde açı bu birimle verilir. [[K6 s. 434]]</p>
<p>Uzayda ilerleyen dalgalar sinüs fonksiyonuyla betimlenebilir. [[K6 s. 432]] Kosinüsün tepesi sinüsünkinden π/2 radyan önce gelir: cos θ = sin(θ + π/2). [[K6 s. 434–435]] İki bağımsız açı için toplama bağıntıları daha karmaşık ifadeleri sadeleştirir. [[K6 s. 435]]</p>
<div class="fk27-hesap"><b>Fazı grafikten okuyun</b><p>Kaydırıcıyı önce sıfıra, sonra π/2’ye alın. [[K6 s. 434–435]] İlk konumda sinüs sıfır ve kosinüs birken ikinci konumda sinüs bir ve kosinüs sıfırdır. [[K6 s. 434–435]] Böylece kosinüsün başlangıç değerine sinüsün hangi yatay uzaklıktan sonra ulaştığını doğrudan okuyabilirsiniz. [[K6 s. 434–435]]</p></div>
<ul><li>sin²θ + cos²θ = 1; tan θ = sin θ/cos θ; sin 2θ = 2 sin θ cos θ; cos 2θ = cos²θ − sin²θ. [[K6 s. 435]]</li><li>sin(α ± β) = sin α cos β ± cos α sin β. [[K6 s. 435]]</li><li>cos(α ± β) = cos α cos β ∓ sin α sin β. [[K6 s. 435]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap cos(θ ± φ) açılımında ikinci terime ± yazar; doğrusu ∓’dir. [[K6 s. 435]]</div></section>
<section class="wrap blk ders-sec" id="fk27-kalk">
<h2>Kalkülüs: bir noktada eğim, bir aralıkta alan</h2>
<p class="intro">Türev bir niceliğin diğerine göre anlık değişim hızını, belirli integral ise iki sınır arasında eğrinin altında biriken işaretli alanı verir. [[K6 s. 435–437]]</p>
${figure('integral','Dilimleri inceltince alan tahmini nasıl değişir?','Dilim sayısını artırın; her dikdörtgenin yüksekliği orta noktasındaki fonksiyon değeridir. [[K6 s. 437]]')}
<p>Düşen bir elma ya da Dünya çevresinde dolanan Ay gibi hareketli sistemleri açıklama ihtiyacı Newton’u sonsuz küçük değişimlerin hesabına yöneltti. [[K6 s. 435]] Kalkülüsün önceliği konusunda Newton ile Alman filozof ve matematikçi Leibniz tartıştı; bugün kullanılan diferansiyel gösterimi Leibniz’e aittir. [[K6 s. 435]]</p>
<h3>İki noktanın eğiminden teğete</h3>
<p>İki nokta arasında düşey farkı yatay farka böldüğümüzde Δ<i>y</i>/Δ<i>x</i> ortalama eğimini buluruz. [[K6 s. 436]] Eğri üzerinde noktaları yaklaştırdıkça hem Δ<i>x</i> hem Δ<i>y</i> küçülür; oranlarının limiti o noktadaki teğetin eğimidir. [[K6 s. 436]] Bu türev <i>dy</i>/<i>dx</i> veya <i>f</i>′(<i>x</i>) ile gösterilir. [[K6 s. 436]]</p>
<ul><li><b>Kuvvet kuralı.</b> <i>ax</i><sup><i>n</i></sup> teriminin türevi <i>anx</i><sup><i>n</i>−1</sup> olur. [[K6 s. 436]] Eski üs katsayıya çarpılır ve üs bir azalır. [[K6 s. 436]]</li>
<li><b>Polinom.</b> <i>ax</i>² + <i>bx</i> + <i>c</i> için sonuç 2<i>ax</i> + <i>b</i>’dir; doğrusal terimde <i>x</i>⁰ = 1 olur, sabitin türevi sıfırdır. [[K6 s. 432]] [[K6 s. 436]] Kitabın örnekleri: <i>d</i>(<i>x</i>² + 3)/<i>dx</i> = 2<i>x</i>, <i>d</i>(2<i>x</i>³ + 7<i>x</i>)/<i>dx</i> = 6<i>x</i>² + 7. [[K6 s. 436]]</li>
<li><b>Diğer türevler.</b> Açı radyanla verildiğinde sin <i>x</i>’in türevi cos <i>x</i>, cos <i>x</i>’in türevi −sin <i>x</i>’tir. [[K6 s. 437]] <i>e</i><sup><i>x</i></sup> kendisinin türevidir; ln <i>x</i>’in türevi 1/<i>x</i>’tir. [[K6 s. 437]]</li></ul>
<div class="fk27-hesap"><b>Ortalama değişim ile anlık değişimi ayırın</b><p><i>y</i> = <i>x</i>² eğrisinde 1 ile 2 arasında ortalama eğim (4 − 1)/(2 − 1) = 3’tür. [[K6 s. 432]] [[K6 s. 436]] Oysa türev 2<i>x</i> olduğundan aynı aralığın başındaki teğetin eğimi 2, sonundaki teğetin eğimi 4’tür. [[K6 s. 436]]</p></div>
<h3>Biriken alanı hesaplayın</h3>
<p>Genişliği <i>dx</i>, yüksekliği <i>f</i>(<i>x</i>) olan ince bir dilimin alanı <i>f</i>(<i>x</i>) <i>dx</i>’tir. [[K6 s. 437]] Dilimler sonsuz incelirken alanlarının toplamı ∫ <i>f</i>(<i>x</i>) <i>dx</i> integraline gider. [[K6 s. 437]]</p>
<p>Şekilde tek dilim seçildiğinde orta nokta <i>x</i> = ½’dir; dikdörtgenin yüksekliği (½)², genişliği 1, dolayısıyla alan tahmini ¼’tür. [[K6 s. 436–437]] Dilimleri inceltmek, yüksekliğin her aralıkta nasıl değiştiğini toplama daha iyi yansıtır. [[K6 s. 437]]</p>
<p>İntegral türev almanın tersidir: <i>F</i>′ = <i>f</i> ise belirsiz integral <i>F</i>(<i>x</i>) + <i>C</i>’dir; <i>C</i> integrasyon sabitidir. [[K6 s. 437]] Kuvvet kuralını tersine uygulayın: <i>n</i> ≠ −1 için ∫ <i>ax</i><sup><i>n</i></sup> <i>dx</i> = <i>ax</i><sup><i>n</i>+1</sup>/(<i>n</i> + 1) + <i>C</i>. [[K6 s. 436–437]] Böylece sabit <i>a</i>’nın integrali <i>ax</i> + <i>C</i> olur. [[K6 s. 437]]</p>
<div class="fk27-hesap"><b>İki sınır arasındaki alan</b><p>∫<sub>x₁</sub><sup>x₂</sup> <i>f</i>(<i>x</i>) <i>dx</i> = <i>F</i>(<i>x</i>₂) − <i>F</i>(<i>x</i>₁); sabit <i>C</i> fark alınırken düşer. [[K6 s. 437–438]] Şekildeki <i>x</i>² için 0’dan 1’e alan, [<i>x</i>³/3]₀¹ = 1/3’tür. [[K6 s. 436–437]]</p></div></section>
<section class="wrap blk ders-sec" id="fk27-araba">
<h2>Çözümlü örnek: hızdan ivmeye ve yola</h2>
<p class="intro">Düz bir yolda duran araç hızlanır, en yüksek hızını bir süre korur, sonra frenleyerek durur. [[K6 s. 438]]</p>
${figure('araba','Araç hangi evrede en çok yol alır?','Şemada her evrenin süresi bir birime, en yüksek hız bir birime ölçeklenmiştir. [[K6 s. 438]]')}
<div class="fk27-hesap"><b>Grafiği üç parçaya ayırın</b>
<p>Hızın zamana göre türevi ivmedir: <i>a</i> = <i>dv</i>/<i>dt</i>. [[K6 s. 438]] İlk doğru yükseldiği için ivme pozitif, yatay kesimde sıfır, frenleme sırasında negatiftir. [[K6 s. 438]]</p>
<p><i>t</i>₁ ile <i>t</i>₂ arasında alınan yol hızın zaman integralidir. [[K6 s. 438]] Şekilde hızlanma ile frenlemenin üçgen alanlarına sabit hız evresinin dikdörtgen alanını ekleyin: yol = <i>v</i><sub>maks</sub> × (hızlanma süresi/2 + sabit hız süresi + frenleme süresi/2). [[K6 s. 438]]</p>
<p>Şemanın göreli birimleriyle toplam yol ½ + 1 + ½ = 2’dir; yatay bölümde ivme sıfırken araç yol almaya devam eder. [[K6 s. 438]]</p></div></section>
<section class="wrap blk ders-sec" id="fk27-solunum">
<h2>Klinik ölçüm: akım eğrisinden soluk hacmi</h2>
<p class="intro">Ventilasyon döngüsünde iki an arasındaki hacim değişimini bulmak için o aralıkta akımı zaman boyunca toplayın. [[K6 s. 439]]</p>
${figure('solunum','Nefes boyunca işaretli alanı izleyin','Sinüs, göreli eksenlerde örnek bir akım biçimidir; kitap şeklinin ölçüm değerlerini temsil etmez. [[K6 s. 432]] [[K6 s. 439]]')}
<ul><li><b>Yükseklik.</b> Seçilen andaki düşey değer <i>Q</i> akımıdır; akım, hacmin zamana göre türevidir: <i>Q</i> = <i>dV</i>/<i>dt</i>. [[K6 s. 439]]</li>
<li><b>Eğim.</b> İnspirasyon başında akım arttığı için eğim pozitiftir; tepeyi geçince akım hâlâ inspirasyon yönündeyken yavaşlar ve eğim negatife döner. [[K6 s. 439]]</li>
<li><b>Alan.</b> Başlangıçtan faz geçişine kadar ∫ <i>Q dt</i> inspirasyon hacmini verir; geçişten sona kadar sıfırın altındaki alanın büyüklüğü ekspirasyon hacmidir. [[K6 s. 439]] Eğriyi ince dikdörtgenlere bölerek doğrusal olmayan akımlarda da bu hacimler hesaplanabilir. [[K6 s. 437]] [[K6 s. 439]]</li></ul>
<div class="fk27-hesap"><b>İnspirasyonun tepe noktasını yorumlayın</b><p>Akım tepesinde teğet yataydır; bu anda akımın zamana göre değişim hızı sıfırdır. [[K6 s. 435–436]] [[K6 s. 439]] Akımın kendisi ise pozitiftir ve tepenin hemen sağındaki ince zaman dilimi toplam inspirasyon hacmine hâlâ pozitif bir alan ekler. [[K6 s. 437]] [[K6 s. 439]]</p></div>
<p>Kitabın örneğinde inspirasyon ve ekspirasyon alanlarının büyüklükleri yaklaşık eşittir; dolayısıyla alınan ve verilen hacimler birbirine yakındır. [[K6 s. 439]]</p></section>
<section class="wrap blk ders-sec" id="fk27-buyume">
<h2>Üstel büyüme: artışın dayandığı miktar</h2>
<p class="intro">Üstel büyümede eklenen miktar mevcut miktarla orantılıdır; büyüklük arttıkça birim zamanda eklenen miktar da artar. [[K6 s. 439–440]]</p>
${figure('faiz','İkinci yılda faiz hangi tutardan hesaplanır?','Noktalar tam yıl bakiyelerini gösterir; yıllar arasındaki eğriler karşılaştırmayı kolaylaştırır. [[K6 s. 442]]')}
<div class="fk27-hesap"><b>Satranç tahtası</b><p>İlk kareye iki para koyup her karede sayıyı ikiye katlayın: 2, 4, 8, 16, 32, 64, 128… [[K6 s. 440]] <i>n</i>’inci karedeki para sayısı <i>x</i> = 2<sup><i>n</i></sup> olduğundan yalnız 64’üncü karede yaklaşık 1,8 × 10<sup>19</sup> para vardır. [[K6 s. 440–441]] Her biri 2 mm kalınlığındaki bu paralar üst üste konursa yükseklik Alfa Centauri’ye uzaklığın yarısını aşar. [[K6 s. 441–442]]</p></div>
<p>Tahtada bir kare ilerlerken eklenen para sayısına bakın: iki paradan dörde geçerken iki, dörtten sekize geçerken dört para eklenir. [[K6 s. 440]] Bir önceki kareye göre artış oranı aynı kalırken mutlak artış büyür. [[K6 s. 440–441]] Genel biçim <i>x</i>(<i>t</i>) = <i>a</i>·<i>b</i><sup><i>t</i>/τ</sup>’dur: <i>a</i> başlangıç değeri, <i>b</i> pozitif büyüme çarpanı, <i>t</i> zaman, τ ise <i>x</i>’in <i>b</i> katına çıktığı süredir (zaman sabiti). [[K6 s. 440]]</p>
<p>Basit faizde yıllık kazanç ilk yatırılan paraya, bileşik faizde bir önceki yılın son bakiyesine göre hesaplanır. [[K6 s. 442]] 100 £ için yıllık %10 faiz iki yöntemde de ilk yıl 10 £ kazandırır. [[K6 s. 442]] İkinci yılda basit faizin matrahı yine 100 £, bileşik faizinki ise 110 £’dur. [[K6 s. 442]]</p>
<table class="tbl"><thead><tr><th>Yıl sonu</th><th>Basit faiz (£)</th><th>Bileşik faiz (£)</th></tr></thead><tbody>${[['0','100','100'],['1','110','110'],['2','120','121'],['3','130','133,10'],['4','140','146,41'],['5','150','161,05'],['10','200','259,37']].map(([y,a,b])=>`<tr><td>${y}</td><td>${a}</td><td>${b} [[K6 s. 442]]</td></tr>`).join('')}</tbody></table>
<p>Basit faizde <i>n</i> yıl sonundaki bakiyeyi 100 + 10<i>n</i> olarak yazabiliriz. [[K6 s. 442]] Bileşik faizde ise her yıl önceki bakiye 1,10 ile çarpılır; aynı noktadaki bakiye 100 × 1,10<sup><i>n</i></sup> olur. [[K6 s. 442]] Tablodaki ikinci yıl bu ayrımı gösterir: ilk yöntemle 110 + 10 = 120 £, ikinci yöntemle 110 × 1,10 = 121 £ elde edilir. [[K6 s. 442]]</p>
<div class="fk27-hesap"><b>Aynı hesabı saatlik bakteri artışına uygulayın</b><p>Uygun ortamda her saat %10 artan 100 000 bakteri için bir yıl yerine bir saat, her 1 £ yerine 1 000 bakteri düşünün. [[K6 s. 442]] Onuncu yıldaki iki bakiye arasında yaklaşık 60 £ fark vardır; bakteri sayısı için bileşik faiz sütununu kullanırız. [[K6 s. 442]] On saatin sonunda 100 000 × 1,10<sup>10</sup> ≈ 260 000 bakteri elde edilir. [[K6 s. 442]]</p></div></section>
<section class="wrap blk ders-sec" id="fk27-azalma">
<h2>Üstel azalma: neden önce hızlı, sonra yavaş?</h2>
<p class="intro">Üstel azalmada eşit zaman aralıklarında kalan miktarın aynı oranı kaybedilir. [[K6 s. 443]]</p>
${figure('azalma','Her yarı ömürde kalan derişimi okuyun','Zaman ekseni yarı ömür, düşey eksen başlangıç derişiminin yüzdesi cinsindendir. [[K6 s. 443–444]]')}
<p>Kitaptaki küvet modelinde su azalınca giderin üzerindeki su sütunu alçalır, basınç düşer ve çıkış yavaşlar. [[K6 s. 442–443]] Modeldeki çıkış hızı kalan su hacmiyle orantılıdır. [[K6 s. 443]] Genel biçim <i>x</i>(<i>t</i>) = <i>a</i>·<i>e</i><sup>−<i>t</i>/τ</sup>’dur: <i>a</i> başlangıç değeri, τ ise <i>x</i>’in <i>e</i> kat azaldığı süredir (zaman sabiti). [[K6 s. 443]]</p>
<div class="fk27-hesap"><b>Birinci dereceden ilaç eliminasyonu</b><p>Plazma derişimi <i>C</i>, başlangıç derişimi <i>C</i>₀ ve eliminasyon sabiti <i>k</i> (kitapta <i>k</i><sub>e</sub>) ise <i>C</i> = <i>C</i>₀ <i>e</i><sup>−<i>kt</i></sup> olur; azalma hızı plazma derişimiyle doğru orantılıdır. [[K6 s. 443–444]] Başlangıçta derişim yüksekken mutlak düşüş daha hızlıdır; derişim sıfıra yaklaşırken eğri yatıklaşır. [[K6 s. 443]]</p>
<p>Kaydırıcıda ardışık iki yarı ömrü karşılaştırın: ilkinde başlangıcın %100’ünden %50’sine, ikincisinde %50’sinden %25’ine inilir. [[K6 s. 443–444]] İki aralığın süresi eşit olsa da başlangıç derişimi cinsinden kayıp önce 50, sonra 25 yüzde puanıdır. [[K6 s. 443–444]]</p>
<p>Üstelin üssünde geçen <i>kt</i> çarpımı birimsizdir; zamanın birimi değişirse <i>k</i> aynı zaman biriminin tersiyle ifade edilir. [[K6 s. 443–444]] Başlangıçta <i>t</i> = 0 koyunca üstel çarpan 1 olur; denklem başlangıç derişimini geri verir. [[K6 s. 443]]</p>
<p>Yarı ömür <i>t</i><sub>½</sub>, derişimin aralık başındaki değerinin %50’sine inmesi için geçen süredir. [[K6 s. 444]] <i>C</i>/<i>C</i>₀ = ½ yazıldığında <i>t</i><sub>½</sub> = ln(2)/<i>k</i> bulunur; eliminasyon sabiti büyüdükçe düşüş hızlanır ve yarı ömür kısalır. [[K6 s. 443–444]]</p></div></section>
<section class="wrap blk ders-sec" id="fk27-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk27-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk27-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk27-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk27-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><b>Açılış sorusu</b><p>Ventilatörde bir soluk boyunca akım–zaman eğrisini görüyorsunuz. İnspirasyon hacmini nasıl bulursunuz? İnspirasyon sürerken eğim negatif olabilir mi?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Eksenleri ve iki sınırı belirlerim: zaman yatay, akım düşey eksendedir; inspirasyon başlangıcı ile ekspirasyona geçiş arasında çalışırım. [[K6 s. 439]]</li><li>Akımı bu aralıkta zamana göre integre ederim; bulunan alan inspirasyon hacmidir. [[K6 s. 439]]</li><li>Akım pozitifken azalabilir: hâlâ içeri gaz girer, fakat eğim negatiftir. [[K6 s. 439]]</li><li>Ekspirasyon alanının mutlak büyüklüğünü inspirasyon alanıyla karşılaştırırım; örnekte iki hacim yaklaşık eşittir. [[K6 s. 439]]</li></ol>
<div class="note"><b>Çizin.</b> Akım–zaman eksenlerinde inspirasyon ve ekspirasyon alanlarını ayrı tarayın; inspirasyon tepesinden önce ve sonra birer teğet çizin. [[K6 s. 439]]</div>
<h3>Ek sorular</h3><ul><li>Bir hacim–zaman grafiği verilseydi anlık akımı nasıl bulurdunuz? [[K6 s. 439]]</li><li>Hız–zaman grafiğinde aynı eğim ve alan işlemleri hangi iki niceliği verir? [[K6 s. 438]]</li><li>Plazma derişimi birinci dereceden azalırken başlangıç ve son bölümdeki teğetler neden farklıdır? [[K6 s. 443–444]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk27-ozet"><h2>Özet</h2><ul class="ozet">
<li>Logaritma üssü verir; pH’daki küçük bir fark H⁺ derişiminde kat farkına karşılık gelebilir. [[K6 s. 429–430]]</li>
<li>Sinüs ve kosinüsün faz farkı çeyrek tur, yani π/2 radyandır. [[K6 s. 434–435]]</li>
<li>Türev anlık eğimi, belirli integral iki sınır arasındaki işaretli alanı verir; akımın integrali hacim değişimidir. [[K6 s. 435–439]]</li>
<li>Üstel değişimde hız o andaki miktara bağlıdır; birinci dereceden eliminasyonda her yarı ömürde kalan derişim yarıya iner. [[K6 s. 440]] [[K6 s. 443–444]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="27"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/26">← Nükleer fizik, radyasyon ve görüntüleme</a><a href="#/dersler/fizik/28">Sonraki: Fiziksel nicelikler ve SI birimleri →</a></nav></section></div>`
  };
})();
