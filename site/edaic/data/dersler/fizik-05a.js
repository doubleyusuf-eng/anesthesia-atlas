VERI.sorular = VERI.sorular || {};
VERI.sorular['fk05a-1'] = {
  no: 1, kagit: 'Paper A · Fizik', kok: 'Sesin yayılması ve ölçülmesi', kaynak: '[[K6 s. 76–80]]',
  onermeler: [
    { t: 'Boyuna dalgada taneciklerin salınımı yayılma doğrultusuna diktir.', d: false, n: 'Boyuna dalgada tanecikler yayılma doğrultusunda ileri geri hareket eder. [[K6 s. 76]]' },
    { t: 'Frekans iki katına çıktığında periyot yarıya iner.', d: true, n: 'Periyot frekansın tersidir. [[K6 s. 77–78]]' },
    { t: 'Aynı ortamda sesin genliğini artırmak yayılma hızını artırır.', d: false, n: 'Genlik arttığında ses daha gür duyulur, yayılma hızı genlikten bağımsızdır. [[K6 s. 78–79]]' },
    { t: 'Sabit yayılma hızında daha kısa dalga boyu daha yüksek frekansa karşılık gelir.', d: true, n: 'Hız sabitken frekans ile dalga boyunun çarpımı sabittir. [[K6 s. 78]]' },
    { t: 'İnfrason işitilebilir aralığın üstündedir.', d: false, n: 'İnfrason işitilebilir aralığın altında, ultrason üstündedir. [[K6 s. 79]]' },
  ],
};
VERI.sorular['fk05a-2'] = {
  no: 2, kagit: 'Paper A · Fizik', kok: 'Işık, fotonlar ve filtreler', kaynak: '[[K6 s. 80–84]]',
  onermeler: [
    { t: 'Elektromanyetik dalgada elektrik ve manyetik alanlar birbirine diktir.', d: true, n: 'Her iki alan da ayrıca yayılma doğrultusuna diktir. [[K6 s. 80]]' },
    { t: 'Foton enerjisi frekansla doğru orantılıdır.', d: true, n: 'Foton başına aktarılan enerji E = h f bağıntısına uyar. [[K6 s. 82]]' },
    { t: 'Polarize olmayan ışıkta elektrik alanı yayılma doğrultusunda salınır.', d: false, n: 'Alanların yönelimleri değişse de salınım yayılma doğrultusuna dik kalır. [[K6 s. 83]]' },
    { t: 'X ışını fotonları bir atomdan elektron koparabilir.', d: true, n: 'X ve gama ışınları bu nedenle iyonlaştırıcı ışınımdır. [[K6 s. 82–83]]' },
    { t: 'Geçirgenlik doğrultuları birbirine dik iki ideal polarizör ışığı engeller.', d: true, n: 'İlk filtreden çıkan bileşen ikinci filtrenin geçirgenlik doğrultusuna diktir. [[K6 s. 83–84]]' },
  ],
};
VERI.sorular['fk05a-3'] = {
  no: 3, kagit: 'Paper A · Fizik', kok: 'Faz ve gürültü önleme', kaynak: '[[K6 s. 84–85]]',
  onermeler: [
    { t: 'Aynı fazdaki iki dalganın bileşke genliği, genliklerinin farkıdır.', d: false, n: 'Aynı fazda sapmalar birbirini güçlendirir ve genlikler toplanır. [[K6 s. 84]]' },
    { t: 'Yarım çevrimlik kayma 180° faz farkına karşılık gelir.', d: true, n: 'Biri çevrime başlarken diğeri çevrimin ortasındadır. [[K6 s. 84]]' },
    { t: 'Ters fazdaki eşit genlikli iki özdeş dalga birbirini tamamen söndürebilir.', d: true, n: 'Her noktada eşit büyüklükteki zıt sapmaların toplamı sıfırdır. [[K6 s. 84]]' },
    { t: 'Gürültü önleyici kulaklıkta dış mikrofonun görevi müzik sinyalini ters çevirmektir.', d: false, n: 'Mikrofon ortam sesini alır, sinyali elektronik devre tersine çevirir. [[K6 s. 85]]' },
    { t: 'Gürültü önleme sinyali müzik sinyaline eklenebilir.', d: true, n: 'Karşı sinyal ortam sesini azaltırken müzik dinleyiciye iletilir. [[K6 s. 85]]' },
  ],
};

(function () {
  const nav = [['yon','Salınım yönü'],['ses','Sesin ölçümü'],['alan','Alanlar ve spektrum'],['foton','Foton'],['filtre','Polarizasyon'],['faz','Girişim'],['kulaklik','Kulaklık'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  const sekil = (ad, baslik, dip = '') => `<div class="viz fk05a-sekil"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk05a_${ad}"></div><p class="viz-cap" aria-live="polite"></p>${dip ? `<p class="viz-foot">${dip}</p>` : ''}</div>`;
  SAYFALAR['dersler/fizik/05a'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 5 · Ders 05a', baslik: 'Dalgaların özellikleri, ses ve elektromanyetik dalgalar',
    lede: 'Radyoda enerji iki ayrı yoldan size ulaşır. [[K6 s. 76]] Verici ile anten arasında elektromanyetik alanlar salınır, hoparlör ile kulağınız arasında ise hava titreşir. [[K6 s. 76]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk05a-${id}"><span>${String(i + 1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk05a-yon"><h2>Dalga ilerlerken tanecik nereye gider?</h2>
<p class="intro">Dalga, uzayda ve zamanda ilerleyen, tekrarlayan bir değişikliktir. [[K6 s. 77]] Enerji bir yerden diğerine taşınırken ortamın tanecikleri kendi denge konumları çevresinde salınır. [[K6 s. 76]]</p>
${sekil('titresim','Bir taneciği, sonra dalganın bütününü izleyin','Tanecik hareketleri şematiktir. [[K6 s. 76–79]]')}
<p>Önce boyuna dalgayı duraklatın ve noktaların birbirine en yakın olduğu yeri bulun. Oynatınca bu bölge bir sonraki taneciğe geçer; iri nokta ise başlangıç konumunun iki yanına gidip gelir. [[K6 s. 76–79]] Enine görünümde aynı karşılaştırmayı yapın: bu kez iri noktanın izlediği yol ile dalganın ilerleyiş oku birbirini dik keser. [[K6 s. 76–77]]</p>
<div class="cols"><div class="card"><h3>Boyuna dalga</h3><p>Bir kuyrukta arkadaki kişi önündekine çarptığında itme sıra boyunca ilerler. [[K6 s. 76]] Ses dalgasında da yerel hareket enerjinin ilerlediği doğrultudadır. [[K6 s. 76–78]]</p></div>
<div class="card"><h3>Enine dalga</h3><p>Tribün dalgası sırayla bir sonraki seyirciye geçerken her seyirci kendi yerinde ayağa kalkar ve oturur. [[K6 s. 77]] Gergin bir ipteki enine titreşimde de hareket yayılma doğrultusuna diktir. [[K6 s. 77]] Bütün elektromanyetik dalgalar eninedir ve boşlukta ilerleyebilir. [[K6 s. 76–77]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="fk05a-ses"><h2>Sesin periyodu, dalga boyu ve genliği</h2>
<p class="intro">Ses kaynağının titreşimi komşu moleküllere geçerken art arda sıkışma ve seyrelme bölgeleri oluşur. [[K6 s. 78–79]] Aynı noktada bunların geçişi denge basıncının çevresinde düzenli bir basınç değişimi olarak ölçülür. [[K6 s. 77–79]]</p>
${sekil('ses','Frekansı bir oktav yükseltin','Önce yatay sıfır çizgisini bulun. Basınç bu çizginin üstündeyken ortam sıkışmış, altındayken seyrelmiştir. [[K6 s. 78–79]] Düşey ölçek şematiktir. [[K6 s. 77–79]]')}
<div class="cols"><div class="card"><h3>Bir noktada süreyi ölçün</h3><p><b>Frekans</b> (<i>f</i>), bir saniyedeki tam salınım sayısıdır ve hertz (Hz) ile ölçülür. [[K6 s. 76–77]] <b>Periyot</b> (<i>T</i>), bir tam salınımın saniye cinsinden süresidir: <i>T</i> = 1/<i>f</i>. [[K6 s. 77–78]]</p></div>
<div class="card"><h3>Bir anda uzunluğu ölçün</h3><p><b>Dalga boyu</b> (λ), bir tam çevrimin uzayda kapladığı uzunluktur (m). [[K6 s. 78]] Dalganın bir saniyede aldığı yol yayılma hızını verir: <i>v</i> = <i>f</i>·λ (m/s). [[K6 s. 78]] Hız sabitken frekans yükselirse iki ardışık sıkışma arasındaki mesafe kısalır. [[K6 s. 78–79]]</p></div>
<div class="card"><h3>Dengeden sapmayı ölçün</h3><p><b>Genlik</b>, denge konumundan en büyük sapmadır. [[K6 s. 77]] Suda dalga tepesinin denge düzeyinden yüksekliği, seste ise basıncın denge değerinin ne kadar üzerine çıktığı okunur. [[K6 s. 77]] Basınç değişimi büyüdükçe ses daha gür duyulur. [[K6 s. 78]]</p></div></div>
${sekil('periyot','Yerinizde kalın ve iki basınç tepesi arasındaki süreyi ölçün')}
<p>İlk grafikte yatay eksen uzaklıktı; ikinci grafikte aynı yerde durup zamanın geçişini izliyorsunuz. [[K6 s. 77–78]] Bir tepeyi izleyen çukurda salınım henüz tamamlanmamıştır; periyodu okumak için bir sonraki tepeye kadar gidin. [[K6 s. 77–78]] Her iki grafikte de tepenin denge çizgisinden yüksekliği genliği verir. [[K6 s. 77–78]]</p>
<p>Şimdi kuru havada 440 Hz’lik sesi düşünün. [[K6 s. 79–80]] Bir noktadan saniyede 440 tam çevrim geçiyorsa o noktadaki basınç yaklaşık her 2,273 ms’de bir aynı yönde ve aynı değerden geçer. [[K6 s. 77–80]] Frekans iki katına çıkarıldığında bu süre yaklaşık 1,136 ms’ye iner. [[K6 s. 77–80]] Aynı süre içinde daha fazla tepe saymak sesin inceldiğini, denge basıncından daha büyük sapma ölçmek ise sesin gürleştiğini gösterir. [[K6 s. 77–80]]</p>
<p>Deniz seviyesinde kuru havada ses yaklaşık 340 m/s hızla yayılır; sudaki hızı bunun dört katından fazladır. [[K6 s. 79]] Aynı ortamda frekans ya da genlik değişse de sesin yayılma hızı değişmez. [[K6 s. 78–79]] Uzayın boşluğunda titreşimi aktaracak ortam bulunmadığından ses duyulmaz. [[K6 s. 79]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap hızı yoğunluğa bağlar ve düşük yoğunluklu ortamda sesin genellikle yavaşladığını söyler. [[K6 s. 78–79]] Doğrusu, bir akışkanda ses hızını yoğunlukla birlikte ortamın sıkıştırılmaya karşı direncinin belirlemesidir.</div>
<h3>İşitme aralığında frekans neyi değiştirir?</h3>
<ul><li><b>İnfrason</b> insanın işitebildiği aralığın altında kalır. [[K6 s. 79]]</li><li><b>İşitilebilir ses</b> insan kulağının algılayabildiği aralığı kapsar. [[K6 s. 79]]</li><li><b>Ultrason</b> bu aralığın üstündedir; kitap ses spektrumunu logaritmik ölçekte gösterir. [[K6 s. 79–80]]</li></ul>
<p>Bazı hayvan türleri daha geniş bir frekans aralığını duyabilir; aynı türün genç bireyleri de genellikle yaşlıların duyamadığı yüksek frekansları işitir. [[K6 s. 80]] Müzikte frekansın algısal karşılığı sesin perdesidir. [[K6 s. 80]]</p>
<div class="card"><h3>Hesap · Aynı havada bir oktav</h3><p>440 Hz’lik la sesinin bir oktav üstü 2 × 440 = 880 Hz’dir. [[K6 s. 80]] Kuru havada dalga boyu yaklaşık 340/440 = 0,773 m iken üst oktavda 340/880 = 0,386 m olur. [[K6 s. 78–80]]</p></div>
<div class="note plain"><b>Atlas notu.</b> Kitap 440 Hz’lik la notasını orta do’nun altına yerleştirir. [[K6 s. 80]] Doğrusu, bu la notasının orta do’nun üstünde olmasıdır.</div>
</section>

<section class="wrap blk ders-sec" id="fk05a-alan"><h2>Elektrik ve manyetik alanlar nasıl yayılır?</h2>
<p class="intro">Bir ışık dalgasında elektrik ve manyetik alanlar birbirine dik iki doğrultuda salınır; dalga bu iki doğrultuya da dik yönde enerji taşır. [[K6 s. 80–81]]</p>
${sekil('alan','Dikey polarize ışığa karşıdan bakın','İki uçlu oklar alanların salınım doğrultularını, merkezdeki nokta ise dalganın size doğru gelişini gösterir. [[K6 s. 80–81]] Dalganın ilerlemesini izlemek için bakış doğrultusunu, polarizasyonu tanımlamak için elektrik alanının okunu kullanın. [[K6 s. 80–83]]')}
<p>Bir radyo vericisinde düşey bir tele alternatif akım uygulandığını düşünün. [[K6 s. 80]] Elektronlar tel boyunca gidip gelirken yüklerini çevreleyen elektrik alanı da salınır. [[K6 s. 80]] Bu değişim, suya düşen bir cismin oluşturduğu dalgalar gibi kaynaktan uzaklaşarak enerji taşır. [[K6 s. 80]] İndüksiyonla değişen elektrik alanı manyetik alan, değişen manyetik alan da elektrik alanı oluşturur. [[K6 s. 80]]</p>
<p>Şekilde dalga size doğru geliyor; yayılma doğrultusu ekranın yüzeyine diktir. [[K6 s. 80–81]] Elektrik alanını tek başına seçip salınım eksenini bulun. Manyetik alanı da açtığınızda, onun da ekranda kaldığını ancak elektrik alanına dik olduğunu görürsünüz. [[K6 s. 80–81]] Dikey anten ile ses kaynağı arasındaki fark şudur: vericide yük hareketi alan değişikliğini başlatırken hoparlör çevresindeki havada mekanik titreşim oluşturur. [[K6 s. 76–80]]</p>
<h3>Spektrumu düşük frekanstan yükseğe okuyun</h3>
<ol class="iskelet"><li><b>Radyo dalgaları</b> en düşük frekans ucundadır; dalga boyları yüzlerce metreden birkaç santimetreye kadar uzanır. [[K6 s. 81]]</li><li>Dalga boyu kısaldıkça sırasıyla <b>mikrodalga, kızılötesi, görünür ışık ve morötesi</b> bölgeleri gelir. [[K6 s. 81]]</li><li><b>X ve gama ışınları</b> yüksek frekans ucundadır; X ışınları katı cisimlerden görünür ışığa göre çok daha kolay geçer. [[K6 s. 81]]</li></ol>
<div class="card"><h3>Hesap · Işık havadan cama girerse</h3><p>Camdaki ışık hızını bulmak için havadaki değeri yaklaşık 2/3 ile çarpın. [[K6 s. 81]] Ters yöndeki karşılaştırmada havadaki hız, camdaki değerin yaklaşık 3/2 katıdır. [[K6 s. 81]] Ses için hava ile suyu karşılaştırdığınızda ise daha hızlı iletimin suda olduğunu hatırlayın. [[K6 s. 79]]</p></div>
<p>Spektrumdaki bölgeler arasında keskin sınırlar yoktur; kısa dalga boylu yakın kızılötesi ışınım görünür ışığa benzer özellikler gösterir. [[K6 s. 81]] Boşlukta hepsi aynı ışık hızıyla ilerler. [[K6 s. 80–81]] Kitabın karşılaştırmasında ışık daha az yoğun ortamda daha hızlıdır; camdaki hızı havadaki hızının yaklaşık üçte ikisidir. [[K6 s. 81]]</p></section>

<section class="wrap blk ders-sec" id="fk05a-foton"><h2>Işık nasıl enerji aktarır?</h2>
<p class="intro">Elektromanyetik ışınım hem dalga hem parçacık özelliği gösterir; hangi özelliğin belirgin olduğu, ışığın nasıl gözlendiğine bağlıdır. [[K6 s. 82]]</p>
${sekil('foton','Girişimden tek fotona')}
<p>Birbirinden ayrı iki ışık kaynağının ışınımı aynı yere geldiğinde ortaya çıkan girişim, yayılmayı dalga olarak tarif etmenin bir yoludur. [[K6 s. 82]] Buna karşılık bir atomla alışverişte sorulacak soru, enerjinin tek olayda ne kadar değiştiğidir. [[K6 s. 82]] Frekansı daha yüksek ışınımda tek bir fotonun taşıdığı enerji de daha büyüktür. [[K6 s. 82]]</p>
<p>Geçen yüzyılın başındaki deneyler, elektromanyetik enerjinin ayrı parçacıklar gibi aktarılabildiğini gösterdi. [[K6 s. 82]] Bu davranış yüksek frekansta belirgindir: Geiger sayacında her gama algılaması ayrı bir tık olarak duyulur. [[K6 s. 82]] Daha düşük frekansta da zayıf bir kaynak ve çok duyarlı bir dedektörle ayrı enerji paketleri saptanabilir. [[K6 s. 82]]</p>
<div class="cols"><div class="card"><h3>Tek fotonun enerjisi</h3><p>Atomun soğurduğu ya da yaydığı elektromanyetik enerji paketine <b>foton</b> denir. [[K6 s. 82]] <i>E</i> = <i>h</i>·<i>f</i> bağıntısında <i>E</i> foton enerjisi (J), <i>f</i> frekans (Hz), <i>h</i> Planck sabitidir (J·s). [[K6 s. 82]]</p></div><div class="card"><h3>Görünür ışıktan iyonlaşmaya</h3><p>Çok sönük bir görünür ışık kaynağı bile çok sayıda foton yayar. [[K6 s. 82]] X ve gama fotonlarının enerjisi atomlardan ya da moleküllerden elektron koparmaya yetebilir; bu yüzden bu ışınlara iyonlaştırıcı ışınım denir. [[K6 s. 82–83]]</p></div></div>
<p>Foton denkleminde frekansı iki katına çıkardığınızı düşünün. Aynı sabitle çarpıldığı için tek fotonun enerjisi de iki katına çıkar. [[K6 s. 82]] Geiger sayacındaki bir tık, enerji aktarımının ayrı bir olay olarak algılanabildiğini gösterir; ışığın başka bir kaynaktan gelen ışıkla girişimi ise dalga davranışını ortaya çıkarır. [[K6 s. 82]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap görünür ışık fotonu başına yaklaşık 10<sup>−20</sup> J verir. [[K6 s. 82]] Doğru mertebe 10<sup>−19</sup> J’dür.</div></section>

<section class="wrap blk ders-sec" id="fk05a-filtre"><h2>Polarizasyonu hangi alan belirler?</h2>
<p class="intro">Düzlem polarize ışıkta elektrik alanının salınım doğrultusu sabittir; polarize olmayan ışıkta ise bu doğrultular yayılma eksenine dik düzlemde rastgele dağılır. [[K6 s. 83]]</p>
${sekil('polarizor','İki filtreyi tek tek ve üst üste görün')}
<p>Demir parmaklıkların arasından bir frizbi geçirmeyi düşünün: disk ancak çubuklara paralel tutulursa aradan geçer. [[K6 s. 83]] Polarizör de elektrik alanının yalnız kendi geçirgenlik doğrultusundaki bileşenini iletir. [[K6 s. 83]] Filtreyi 90° döndürünce çıkan ışığın polarizasyon düzlemi de 90° döner. [[K6 s. 83]] Ses boyuna bir dalgadır; titreşim yayılma doğrultusunda olduğu için bu biçimde polarize edilemez. [[K6 s. 83]]</p>
${sekil('eksen','İkinci filtreyi çeyrek tur döndürün')}
<p>Fotoğrafta yalnız soldaki filtreden görülen bölgeyi seçin. Burada gelen ışığın ilk filtrenin doğrultusuna paralel bileşeni kalır. [[K6 s. 83]] Ortak bölgede ışık önce bu filtreden, sonra ikinci filtreden geçmek zorundadır. [[K6 s. 83–84]] İkinci filtreyi şemada ilkine paralel tutun, sonra çapraz konuma getirin. Çapraz konumda karanlığın nedeni, ilk filtreden çıkan elektrik alanının ikinci filtrenin geçireceği doğrultuda hiçbir bileşeni kalmamasıdır. [[K6 s. 83–84]]</p>
<ul><li><b>Ekran.</b> Polarize gözlükle bakarken bir akaryakıt pompası göstergesinin kararması, birbirine dik iki polarizörün ışığı kesmesine örnektir. [[K6 s. 83]]</li>
<li><b>Kar ve su.</b> Gözlüğün polarizan kaplaması gelen polarize olmayan ışığın yaklaşık %50’sini geçirir. [[K6 s. 84]] Kar veya sudan yansıyan ışık yatay polarize olma eğilimindedir; uygun gözlük bu parlamayı azaltır. [[K6 s. 84]]</li>
<li><b>Yüzeyin ötesini görmek.</b> Kayakçı kardan gelen parlamayı azaltabilir, balıkçı su yüzeyine yakın balıkları daha kolay seçebilir. [[K6 s. 84]] Fotoğrafçılar da otomobil ön camındaki yansımayı azaltıp içeriyi görüntülemek için objektife polarizan filtre takar. [[K6 s. 84]]</li></ul></section>

<section class="wrap blk ders-sec" id="fk05a-faz"><h2>İki dalga karşılaştığında ne toplanır?</h2>
<p class="intro">Üst üste binme (süperpozisyon) sırasında aynı noktadaki anlık sapmalar işaretleriyle toplanır. [[K6 s. 84]] Faz farkı, bir dalganın çevrimde diğerine göre nerede olduğunu belirtir. [[K6 s. 84]]</p>
${sekil('girisim','Fazı kaydırın ve toplam eğriyi okuyun','Üç izde düşey ölçek aynıdır; dalgaların genlikleri eşittir ve yatay eksen çevrimler boyunca ilerlemeyi gösterir. [[K6 s. 84–85]]')}
<p>Eğrileri soldan sağa aynı hızla okuyun ve ilk dalganın tepesinde durun. İkinci iz de denge çizgisinin üzerindeyse o noktada iki pozitif sapma toplanır. [[K6 s. 84]] İkinci iz çizginin altındaysa işaretler karşıttır; toplamı bulmak için iki büyüklüğün farkına bakın. [[K6 s. 84]] Bu işlemi her noktada tekrarladığınızda alttaki bileşke eğriyi elde edersiniz. [[K6 s. 84]]</p>
<div class="cols"><div class="card"><h3>Yapıcı girişim</h3><p>Aynı fazdaki iki dalganın tepeleri ve çukurları aynı anda gelir. [[K6 s. 84]] Bileşke genlik iki genliğin toplamıdır. [[K6 s. 84]]</p></div>
<div class="card"><h3>Yıkıcı girişim</h3><p>Dalgaların biri çevrime başlarken diğeri yarısını tamamlamışsa faz farkı 180°’dir. [[K6 s. 84]] Birinin tepesi diğerinin çukuruna gelir ve bileşke genlik iki genliğin farkının büyüklüğü kadar olur. [[K6 s. 84]] Eşit genlikte tam sönme görülür. [[K6 s. 84]]</p></div></div>
<div class="card"><h3>Hesap · Genlikleri karşılaştırın</h3><p>Her bir dalganın genliğini aynı birimle <i>A</i> olarak yazın. [[K6 s. 84]] Tam aynı fazda bileşkenin genliği <i>A</i> + <i>A</i> = 2<i>A</i>, tam ters fazda ise <i>A</i> − <i>A</i> = 0 olur. [[K6 s. 84]] Ters faz korunup genliklerden biri küçültülürse büyük dalganın karşılanmayan kısmı dinleyiciye ulaşır. [[K6 s. 84–85]]</p></div></section>

<section class="wrap blk ders-sec" id="fk05a-kulaklik"><h2>Kulaklık ortam sesini nasıl azaltır?</h2>
<p class="intro">Gürültü önleyici kulaklık ortam sesini örnekler ve dinleyiciye bununla yıkıcı girişim yapacak ikinci bir ses verir. [[K6 s. 85]]</p>
${sekil('kulaklik','Mikrofondan dinleyiciye sinyal yolu')}
<ol class="iskelet"><li><b>Algıla.</b> Her kulaklığın dışındaki küçük mikrofon ortam sesini alarak elektronik devreye gönderir. [[K6 s. 85]]</li>
<li><b>Tersine çevir.</b> Devre sinyali ters çevirir; ortaya çıkan sinyal gelen sesle 180° faz farkı taşır. [[K6 s. 85]]</li>
<li><b>Dinleyiciye ver.</b> Sinyal uygun genliğe yükseltilip hemen çalınınca istenmeyen ses neredeyse bütünüyle söner. [[K6 s. 85]] Müzik dinlerken karşı sinyal müzik sinyaline eklenir. [[K6 s. 85]]</li></ol>
<p>Son şekli girişim grafiğiyle birlikte okuyun. Birinci izi ortam sesi, ikinciyi kulaklığın ürettiği karşı ses olarak düşünün. [[K6 s. 84–85]] Devrenin fazı tersine çevirmesi bir tepeyi bir çukurla karşılaştırır; yükseltme işlemi ise çukurun büyüklüğünü gelen tepeye uydurur. [[K6 s. 84–85]] Böylece bastırılmak istenen ortam sesi için hem zamanlama hem de genlik koşulu karşılanır. [[K6 s. 84–85]]</p></section>

<section class="wrap blk ders-sec" id="fk05a-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk05a-1"></div></div><div class="viz"><div data-viz="mtf" data-q="fk05a-2"></div></div><div class="viz"><div data-viz="mtf" data-q="fk05a-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk05a-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu · Ekipman</span><p>Bir gürültü önleyici kulaklığın dış mikrofonundan dinleyiciye kadar sinyali izleyin. Ortam sesini azaltmak için faz ve genlik nasıl ayarlanmalıdır?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Ses boyuna bir basınç dalgasıdır; mikrofona art arda sıkışma ve seyrelme olarak ulaşır. [[K6 s. 78–79]]</li><li>Dış mikrofonun aldığı sinyal elektronik devrede ters çevrilir. [[K6 s. 85]]</li><li>Karşı ses, ortam sesine göre 180° ters fazda ve uygun genlikte hemen verilir. [[K6 s. 85]]</li><li>Dinleyicide iki sesin basınç sapmaları toplanır; ideal eşit genlikte toplam sıfırdır, kulaklıkta ise gürültü neredeyse bütünüyle söner. [[K6 s. 84–85]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Aynı zaman ekseninde iki eşit genlikli dalga çizin. Önce tepeleri, sonra birinin tepesiyle diğerinin çukurunu hizalayın. Her durum için toplam basınç eğrisini alta ekleyin. [[K6 s. 84–85]]</div><div class="note plain"><b>Ek sorular.</b> Ters faz korunurken genlikler farklıysa sonuç nedir? [[K6 s. 84]] Müzik sinyali sisteme nasıl katılır? [[K6 s. 85]] Aynı ortamda frekans iki katına çıktığında hız, dalga boyu ve perde nasıl değişir? [[K6 s. 78–80]]</div></div></section>
<section class="wrap blk ders-sec" id="fk05a-ozet"><h2>Özet</h2><ul class="ozet"><li>Periyot bir çevrimin süresi, dalga boyu bir çevrimin uzunluğudur; <i>T</i> = 1/<i>f</i> ve <i>v</i> = <i>f</i>·λ. [[K6 s. 77–78]]</li><li>Seste basınç değişiminin genliği gürlüğe, frekans perdeye karşılık gelir. [[K6 s. 78–80]]</li><li>Işık eninedir; polarizasyonu elektrik alanının yönü, foton enerjisini frekans belirler. [[K6 s. 80–83]]</li><li>İdeal sönme eşit genlik ve ters faz gerektirir; gürültü önleyici kulaklık bu ilişkiyi kullanır. [[K6 s. 84–85]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="05a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/04b">← Vücut sıcaklığının düzenlenmesi, sıcaklık ölçümü ve termodinamik yasaları</a><a href="#/dersler/fizik/05b">Sonraki: Basit harmonik hareket, rezonans ve sönüm, Fourier analizi, Doppler etkisi →</a></nav></section>`,
  };
})();
