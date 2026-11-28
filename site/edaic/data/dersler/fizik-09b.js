VERI.sorular = VERI.sorular || {};
VERI.sorular['fk09b-1'] = {
  no: 1, kok: 'Kapalı bir gaz örneğinin sıkıştırılması ve klinik karşılıkları', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 166–169]]',
  onermeler: [
    { t: 'Sıcaklık sabitken hacim yarıya inerse basınç da yarıya iner.', d: false, n: 'Basınç iki katına çıkar, böylece basınç ile hacmin çarpımı korunur. [[K6 s. 166–167]]' },
    { t: 'Aynı miktarda gaz için daha sıcak izoterm aynı hacimde daha yüksek basınç gösterir.', d: true, n: 'Sıcak eğri üzerindeki nokta aynı hacimde soğuk eğrinin üzerindedir. [[K6 s. 167]]' },
    { t: 'İnspirasyon sırasında akciğerin genişlemesi içeri doğru hava akışını engeller.', d: false, n: 'Genişleme akciğer içi basıncı atmosfer basıncının altına düşürür ve hava içeri akar. [[K6 s. 168]]' },
    { t: 'Yüzeye çıkan dalgıcın diş boşluğunda hapsolmuş gaz genişler.', d: true, n: 'Yükselirken çevre basıncı azalır ve hapsolmuş gazın hacmi artar. [[K6 s. 168]]' },
    { t: 'Tüpün iç basıncı atmosfer basıncına indiğinde içeride hiç oksijen kalmaz.', d: false, n: 'Tüpün kendi iç hacmini dolduran gaz atmosfer basıncında içeride kalır. [[K6 s. 169]]' },
  ],
};
VERI.sorular['fk09b-2'] = {
  no: 2, kok: 'Sıcaklığın hacme ve basınca etkisi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 170–173]]',
  onermeler: [
    { t: 'Basıncı ve gaz miktarı sabit bir balon ısıtıldığında hacmi artar.', d: true, n: 'Charles yasasına göre hacim mutlak sıcaklıkla doğru orantılıdır. [[K6 s. 170]]' },
    { t: 'Sıcak hava balonu ısınırken alt açıklığından hava çıkabilir.', d: true, n: 'Genleşen havanın bir kısmı çıkar ve içeride kalan sıcak havanın yoğunluğu dışarıdaki soğuk havadan düşük olur. [[K6 s. 171]]' },
    { t: 'Sabit hacimde basınç, Celsius cinsinden sıcaklıkla doğru orantılıdır.', d: false, n: 'Orantı kelvin cinsinden mutlak sıcaklık için geçerlidir. [[K6 s. 172]]' },
    { t: 'Gaz yoğunlaşıp sıvılaşsa da basınç yasası geçerliliğini korur.', d: false, n: 'Kaynama noktasının altında yoğunlaşma bu gaz modelinin geçerliliğini sınırlar. [[K6 s. 172]]' },
    { t: 'Tüpün kullanılacağı ortamın sıcaklığı dolumda dikkate alınır.', d: true, n: 'Sıcaklık yükseldiğinde tüp içi basınç artacağından dolum oranı buna göre seçilir. [[K6 s. 173]]' },
  ],
};
VERI.sorular['fk09b-3'] = {
  no: 3, kok: 'Kabarcık hesabından molar hacme', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 173–177]]',
  onermeler: [
    { t: 'Birleşik gaz yasası iki durumu karşılaştırırken gaz miktarının değişmesine izin verir.', d: false, n: 'İki durumda da aynı miktarda gaz bulunması gerekir. [[K6 s. 173]]' },
    { t: 'Her 10 m için bir atmosferlik artış varsayılırsa 40 m’de mutlak basınç beş atmosferdir.', d: true, n: 'Suyun dört atmosferlik katkısına yüzeydeki bir atmosfer eklenir. [[K6 s. 174]]' },
    { t: 'Sabit basınç ve sıcaklıkta gaz hacmi tanecik sayısıyla doğru orantılıdır.', d: true, n: 'Avogadro ilişkisi, birleşik yasaya gaz miktarını ekler. [[K6 s. 175]]' },
    { t: '32 g moleküler oksijen bir moldür.', d: true, n: 'Gazdaki oksijen iki atomludur ve molar kütlesi 32 g/mol’dür. [[K6 s. 176]]' },
    { t: 'Standart koşullarda bir mol ideal gazın hacmi yaklaşık 22,4 L’dir.', d: true, n: '273 K ve 101,3 kPa ile hesap yaklaşık 0,0224 m³ verir. [[K6 s. 176–177]]' },
  ],
};

const FK09B_NAV = [
  ['boyle', 'Boyle'], ['tup', 'Tüp süresi'], ['charles', 'Charles'], ['termometre', 'Termometre'],
  ['basinc', 'Gay-Lussac'], ['birlesik', 'Birleşik yasa'], ['evrensel', 'Evrensel yasa'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];
SAYFALAR['dersler/fizik/09b'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 9 · Ders 09b',
  baslik: 'Boyle, Charles ve Gay-Lussac yasaları; birleşik ve evrensel gaz yasası',
  lede: 'Aynı gaz ısıtıldığında bir balon genişlerken kapalı ve sert bir tüpte basınç yükselir. [[K6 s. 170–172]] Hangi niceliğin sabit kaldığını belirlemek, kullanılacak denklemi seçtirir. [[K6 s. 167–175]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK09B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="fk09b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk09b-boyle">
<h2>Boyle yasası · Gazı daha küçük bir hacme sıkıştırmak</h2>
<p class="intro">Birinci ideal gaz yasasına göre kapalı bir kaptaki gazın sıcaklığı sabitse hacim ile basınç ters orantılıdır. [[K6 s. 166–167]]</p>
<div class="viz"><div class="viz-head"><h3>Hacmi yarıya indirin, iki izotermi karşılaştırın</h3></div><div data-viz="fk09b_boyle"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Her eğri tek bir sıcaklığı gösterir. [[K6 s. 167–168]] Eksenler başlangıç hacmine ve soğuk gazın başlangıç basıncına oranlanmıştır. [[K6 s. 166–167]]</p></div>
<p>Duvarın hissettiği basınç moleküllerin çarpmasından doğar. [[K6 s. 166]] Eşit sayıda molekül içeren iki silindirden küçük olanında duvarın birim alanına daha sık çarpma olur. [[K6 s. 167]] Gaz kaçmadan hacim yarıya indiğinde çarpma sıklığı ve basınç iki katına çıkar. [[K6 s. 166–167]]</p>
<p>Bisiklet pompasının ağzını parmağınızla kapatırsanız pistonu başlangıçta kolay itersiniz. [[K6 s. 167]] İçerideki hava sıkıştıkça piston artan basınca karşı ilerler ve itmek güçleşir. [[K6 s. 167]]</p>
<div class="note"><b>İki durumu eşitleyin.</b> <i>P</i><sub>1</sub>·<i>V</i><sub>1</sub> = <i>P</i><sub>2</sub>·<i>V</i><sub>2</sub> bağıntısında <i>P</i> gaz basıncı, <i>V</i> gaz hacmidir. [[K6 s. 167–169]] Bir izoterm boyunca bu çarpım değişmez, daha sıcak izotermde ise aynı hacme daha yüksek basınç karşılık gelir. [[K6 s. 167]]</div>
<details class="fk09b-okuma"><summary>Grafiği iki yönde okuyun</summary>
<p><b>Tek eğri boyunca.</b> Başlangıçtaki gazı daha küçük bir kaba aldığınızı düşünün ve sürekli çizgide sola ilerleyin. [[K6 s. 166–167]] Basınç oranının birden ikiye çıktığı noktada hacim oranı yarıma inmiştir. [[K6 s. 166–167]] Aynı eğri üzerinde sağa doğru ilerlerseniz bu kez gaz genişlerken basıncın düştüğünü izlersiniz. [[K6 s. 167–168]]</p>
<p><b>Eğriler arasında.</b> Şimdi hacmi değiştirmeden, aynı yatay konumdaki iki işareti karşılaştırın. [[K6 s. 167]] Düşeyde gördüğünüz fark, eşit miktarda gaz aynı hacimde tutulduğunda sıcak olanın duvara daha yüksek basınç uygulamasını gösterir. [[K6 s. 167]]</p></details>
<ul class="ozet"><li><b>Soluk alma.</b> Göğüs boşluğu genişleyince akciğer hacmi artar ve iç basınç atmosfer basıncının altına iner. [[K6 s. 168]] Burun ve ağız çevresindeki hava bu basınç farkıyla akciğere girer. [[K6 s. 168]]</li>
<li><b>Dalış.</b> Dalgıç derine indikçe vücuduna etkiyen basınç artar ve örneğin diş boşluğunda hapsolmuş gaz küçülür. [[K6 s. 168]] Yüzeye çıkarken basınç düşer ve aynı gaz genişler. [[K6 s. 168]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitabın giriş paragrafı basıncı hacimle orantılı diye niteler. [[K6 s. 166]] Doğrusu, sonraki sayfadaki tanımda verildiği gibi, sabit sıcaklıkta ters orantıdır. [[K6 s. 167]]</div>
</section>
<section class="wrap blk ders-sec" id="fk09b-tup">
<h2>Oksijen tüpü · Basınçtan kalan süreye</h2>
<p class="intro">Atmosfer basıncının yüz katındaki oksijen tüpü için gazın atmosferde kaplayacağı hacim, tüp iç hacminin yaklaşık yüz katıdır. [[K6 s. 168–169]]</p>
<div class="viz"><div class="viz-head"><h3>Hacim ve basınç hangi parçalara ait?</h3></div><div data-viz="fk09b_tup"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Dolumda gaz daha büyük bir hacimden tüpe sıkıştırılır. [[K6 s. 168]] Tüpün içine giren molekül sayısı arttığı için gazın yoğunluğu ve tüp içindeki basınç yükselir. [[K6 s. 168]] Kullanım süresini tahmin etmek için önce bu gazı atmosfer basıncındaki eşdeğer hacmine dönüştürün. [[K6 s. 168–169]]</p>
<article class="card fk09b-hesap"><h3>Hesap · Kısmen kullanılmış E tipi tüp</h3>
<p>İç hacim 4,5 L, tüp basıncı 100 bar, istenen oksijen akışı 2,5 L/dk. [[K6 s. 168]]</p>
<ol><li><b>Basınçları eş birime getirin.</b> 1 bar = 100 kPa olduğundan kitap tüp basıncını 10⁴ kPa alır. [[K6 s. 168]] Atmosfer basıncı <i>P</i><sub>B</sub> = 101,3 kPa olsa da yaklaşık hesapta 100 kPa kullanılır. [[K6 s. 169]]</li>
<li><b>Atmosferdeki hacim.</b> <i>V</i><sub>B</sub> = <i>P</i><sub>tüp</sub>·<i>V</i><sub>tüp</sub>/<i>P</i><sub>B</sub> = (10⁴/100) × 4,5 L = 450 L. [[K6 s. 168–169]]</li>
<li><b>Süre.</b> Akış, birim zamanda verilen hacimdir. [[K6 s. 169]] Süre ≈ 450 L ÷ (2,5 L/dk) = <strong>180 dakika</strong>. [[K6 s. 169]]</li></ol></article>
<details class="fk09b-okuma"><summary>Neden doğrudan 4,5 L’yi akışa bölmüyoruz?</summary>
<p>4,5 L, yüksek basınçta depolanan gazın tüpte kapladığı yerdir. [[K6 s. 168]] Oysa süreyi bulmak için gereken hacim, aynı oksijenin tüpten çıktığında atmosfer basıncında kaplayacağı yerdir. [[K6 s. 168–169]] İki basıncı eş birime çevirmek bu iki hacim arasındaki çarpanı verir. [[K6 s. 168–169]]</p>
<p>Birimleri son satıra kadar taşırsanız litreler sadeleşir ve geriye dakika kalır. [[K6 s. 169]] Aynı sonucu tersten de sınayabilirsiniz: 180 dakika boyunca dakikada 2,5 L verilmesi, yaklaşık 450 L oksijen verilmesi demektir. [[K6 s. 168–169]]</p></details>
<ul class="ozet"><li><b>Gösterge belirsizliği.</b> Çoğu tüpün basınç göstergesi hassas değildir, bu yüzden süre tahmininde belirgin bir hata payı beklenir. [[K6 s. 169]]</li><li><b>Kullanılabilir hacim.</b> Tüp atmosfer basıncına indiğinde kendi iç hacmi kadar gaz içerir. [[K6 s. 169]] Kitabın hesabını bu artık gaz için düzeltirken 450 L’den tüpün 4,5 L iç hacmi çıkarılır. [[K6 s. 168–169]]</li></ul>
<details class="fk09b-okuma"><summary>Artık gaz için düzeltme yapılırsa süre ne olur?</summary>
<p>Kitabın kullandığı yaklaşık basınç oranını koruyarak yalnız tüpte kalan gazı hesaba katın. [[K6 s. 168–169]] Bu durumda kullanılabilir hacim 450 − 4,5 = 445,5 L ve buna karşılık gelen süre 445,5 ÷ 2,5 = 178,2 dakikadır. [[K6 s. 168–169]]</p>
<p>Bu düzeltme ile göstergenin hata payı iki ayrı konudur. [[K6 s. 169]] İçeride kalacak gaz hacmini çıkarmak, başlangıçtaki basınç okumasının belirsizliğini gidermez; bu yüzden daha çok ondalık basamak yazmak süre tahminini kesinleştirmez. [[K6 s. 169]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk09b-charles">
<h2>Charles yasası · Sabit basınçta genleşme</h2>
<p class="intro">İkinci ideal gaz yasasında basınç ve gaz miktarı sabit tutulur, hacim mutlak sıcaklıkla doğru orantılı değişir. [[K6 s. 170–171]]</p>
<div class="viz"><div class="viz-head"><h3>Balonun mutlak sıcaklığını değiştirin</h3></div><div data-viz="fk09b_charles"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Eksenlerdeki oranlar ilk durumun sıcaklık ve hacmine göredir. [[K6 s. 170–171]]</p></div>
<p>Genleşebilen bir kutudaki gazı ısıtınca moleküller hızlanır ve duvarları dışa iter. [[K6 s. 170]] Eşit sayıda molekül taşıyan iki parti balonundan öğle güneşinde bırakılanın hacmi artarken buzdolabına konulan küçülür. [[K6 s. 170]]</p>
<p><i>V</i><sub>1</sub>/<i>T</i><sub>1</sub> = <i>V</i><sub>2</sub>/<i>T</i><sub>2</sub> yazarken <i>T</i> kelvin (K) cinsindendir. [[K6 s. 170–171]] Hacim–sıcaklık doğrusu mutlak sıfıra uzanır, ancak bu sınıra yaklaşıldığında ideal gaz modeli geçerliliğini yitirir. [[K6 s. 170–171]] Yaklaşık −273 °C’ye karşılık gelen 0 K, molekül hareketinin kuramsal olarak durduğu sıcaklıktır. [[K6 s. 170]]</p>
<details class="fk09b-okuma"><summary>İki balon örneğinde hangi nicelikleri karşılaştırıyoruz?</summary>
<p>İlk karşılaştırmada iki kapalı balonda eşit sayıda molekül vardır. [[K6 s. 170]] Güneşteki balon büyürken içine yeni moleküller girmez; daha hızlı hareket eden aynı moleküller daha büyük bir hacme yayılır. [[K6 s. 170]] Balon soğuk ortama alınırsa değişimin yönü tersine döner. [[K6 s. 170]]</p>
<p>Aşağıdaki sıcak hava balonunda ise alt açıklık gaz çıkışına izin verir. [[K6 s. 171]] Burada balonun yükselişini açıklarken kapalı balondaki gibi yalnız hacim değişimini izlemek yetmez; içeride kalan havanın yoğunluğunu dışarıdaki havanın yoğunluğuyla karşılaştırmak gerekir. [[K6 s. 171]]</p></details>
<ul class="ozet"><li><b>Sıcak hava balonu.</b> Isınan hava molekülleri enerji kazanır ve hızlanır, genleşen havanın bir bölümü balonun altından dışarı çıkar. [[K6 s. 171]] Balonda kalan sıcak hava dışarıdaki soğuk havadan daha az yoğun olduğu için balon yükselir. [[K6 s. 171]]</li>
<li><b>Dalış sonrası.</b> Dokularda kalmış olabilecek küçük azot kabarcıkları, vücut sıcaklığı yükseldiğinde genişleyebilir. [[K6 s. 172]] Dekompresyon hastalığını ağırlaştırabileceğinden dalış sonrasında sıcak banyo veya ağır egzersiz önerilmez. [[K6 s. 172]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk09b-termometre">
<h2>Bourdon termometresi · Genleşmeden sıcaklık okumaya</h2>
<p class="intro">Bourdon termometresinde bir tüpteki gazın genleşmesi, kadrandan sıcaklığın izlenmesini sağlar. [[K6 s. 171–172]]</p>
<div class="viz"><div class="viz-head"><h3>Gaz içeren bölümden kadrana giden bağlantıyı izleyin</h3></div><div data-viz="fk09b_termometre"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Oksijen tüpü örneğinde göstergeden okunan büyüklük basınçtır. [[K6 s. 168–169]] Bourdon termometresinde ise tüp ile kadran arasındaki bağlantı sayesinde izlenen büyüklük sıcaklıktır. [[K6 s. 171–172]]</p>
</section>
<section class="wrap blk ders-sec" id="fk09b-basinc">
<h2>Gay-Lussac yasası · Hacim sabitse basınç değişir</h2>
<p class="intro">Joseph Louis Gay-Lussac’ın adıyla anılan üçüncü ideal gaz yasası, sabit hacimdeki gazın basıncını mutlak sıcaklığına bağlar. [[K6 s. 172]]</p>
<div class="viz"><div class="viz-head"><h3>Kapalı tüpü başlangıç sıcaklığının iki katına ısıtın</h3></div><div data-viz="fk09b_basinc"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Sıcaklık ve basınç başlangıç değerlerine oranlanmıştır. [[K6 s. 172–173]]</p></div>
<p>Özdeş tüplerden biri serin odada kalırken güneşe bırakılan tüpte moleküllerin kinetik enerjisi artar. [[K6 s. 172]] Daha hızlı hareket eden moleküller sert duvarlara daha sık çarpar, böylece gazın basıncı yükselir. [[K6 s. 172]] Soğuyan tüpte basınç düşer. [[K6 s. 172]]</p>
<p>Basınç yasası <i>P</i><sub>1</sub>/<i>T</i><sub>1</sub> = <i>P</i><sub>2</sub>/<i>T</i><sub>2</sub> biçiminde yazılır. [[K6 s. 172]] Basınç–sıcaklık doğrusu Celsius eksenine uzatılırsa ekseni −273,15 °C’de, yani 0 K’de keser. [[K6 s. 172–173]] Bu bir uzatmadır; gaz kaynama noktasının altında yoğunlaşıp sıvıya dönüştüğünde yasa uygulanamaz. [[K6 s. 172]]</p>
<details class="fk09b-okuma"><summary>Grafikte sıcaklığı iki katına çıkarmak ne demek?</summary>
<p>Önce mutlak sıcaklık oranını 1’e getirin: bu nokta tüpün başlangıç basıncını gösterir. [[K6 s. 172]] Sıcaklık oranını 2’ye çıkardığınızda hacmi değişmeyen tüpün basınç oranı da 2 olur. [[K6 s. 172]] Aynı sayısal işlemi Celsius sıcaklığıyla yapamazsınız, çünkü oranı belirleyen uzaklık mutlak sıfırdan ölçülür. [[K6 s. 172]]</p>
<p>İki güneş örneğinin ayrıldığı yer kabın duvarıdır. [[K6 s. 170–172]] Balonun duvarı dışa hareket edebildiği için sabit basınçta değişen büyüklük hacimdir; sert tüpte duvar hareket edemediği için aynı ısınma basınç artışıyla görünür. [[K6 s. 170–172]]</p></details>
<ul class="ozet"><li><b>Dolum oranı.</b> Tüpün ne kadar doldurulabileceği belirlenirken sonraki sıcaklık artışının yaratacağı basınç yükselmesi hesaba katılır. [[K6 s. 173]] Basınç kritik düzeye ulaşırsa tüp en zayıf noktasından yırtılıp patlayabilir. [[K6 s. 173]]</li>
<li><b>Dolum sıcaklığı.</b> Tüpler depolanacakları ve kullanılacakları ortamın sıcaklığında doldurulmalıdır. [[K6 s. 173]] Dalış tüpleri sıklıkla dalış yerinin sıcaklığına ayarlanmış bir su banyosunda doldurulur. [[K6 s. 173]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk09b-birlesik">
<h2>Birleşik gaz yasası · Derinden yüzeye çıkan kabarcık</h2>
<p class="intro">Boyle, Charles ve Gay-Lussac yasaları birleştirildiğinde miktarı değişmeyen gaz için basınç ile hacmin çarpımı mutlak sıcaklıkla orantılıdır. [[K6 s. 173]]</p>
<div class="viz"><div class="viz-head"><h3>Önce derinliği azaltın, sonra suyu ısıtın</h3></div><div data-viz="fk09b_kabarcik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Eğri, seçtiğiniz su sıcaklığı için aynı kabarcığın farklı derinliklerdeki hacmini gösterir. [[K6 s. 173–174]]</p></div>
<p>İlk durum ile son durum için <i>P</i><sub>1</sub>·<i>V</i><sub>1</sub>/<i>T</i><sub>1</sub> = <i>P</i><sub>2</sub>·<i>V</i><sub>2</sub>/<i>T</i><sub>2</sub> yazılır. [[K6 s. 173–174]] Kabarcığın gaz miktarı korunurken çevre basıncı ve sıcaklık birlikte değişebildiği için bu örnekte yalnız Boyle yasası yeterli olmaz. [[K6 s. 173–174]]</p>
<article class="card fk09b-hesap"><h3>Hesap · 40 m’den deniz yüzeyine</h3>
<p>Dalgıcın tüpünden 40 m’de çıkan kabarcığın başlangıç hacmi 20 mL, su sıcaklığı derinde 10 °C ve yüzeyde 20 °C’dir. [[K6 s. 173–174]]</p>
<ol><li><b>Mutlak basınç.</b> Her 10 m iniş için basıncın bir yüzey atmosferi (<i>P</i><sub>B</sub>) arttığını varsayın. [[K6 s. 174]] Su sütunu 40 m’de 4<i>P</i><sub>B</sub> ekler, dolayısıyla toplam basınç <i>P</i><sub>B</sub> + 4<i>P</i><sub>B</sub> = 5<i>P</i><sub>B</sub> olur. [[K6 s. 174]]</li>
<li><b>Birimler.</b> Kitabın yuvarlamasıyla sıcaklıklar 283 K ve 293 K’dir. [[K6 s. 174]] Hacmin SI birimi m³ olduğundan 1 mL = 10⁻⁶ m³ ve başlangıç hacmi 20 × 10⁻⁶ m³’tür. [[K6 s. 174]]</li>
<li><b>Yüzey hacmi.</b> <i>V</i><sub>yüzey</sub> = <i>V</i><sub>derin</sub> × (5<i>P</i><sub>B</sub>/<i>P</i><sub>B</sub>) × (293/283) ≈ <strong>104 mL</strong>. [[K6 s. 174]] Basınç düşüşü tek başına hacmi beş katına çıkarırdı; yüzey suyunun daha sıcak olması bu artışı beş katın üzerine taşır. [[K6 s. 174]]</li></ol></article>
<details class="fk09b-okuma"><summary>Basınç etkisini sıcaklık etkisinden ayırın</summary>
<p>Su sıcaklığını 10 °C’de bırakıp derinliği 40 m’den 0 m’ye getirin. [[K6 s. 174]] Sıcaklık oranı 1 kalırken basınç oranı 5 olduğu için 20 mL’lik kabarcık yüzeyde 100 mL yer kaplar. [[K6 s. 173–174]] Şimdi derinliğe dokunmadan sıcaklığı 20 °C’ye çıkarın: ikinci değişikliğin katkısı grafiğin yüzey ucunda görülebilir. [[K6 s. 174]]</p>
<p>İlk ve son sıcaklığı kelvine çevirmeden 20’yi 10’a bölerseniz sıcaklık etkisini iki kat olarak hesaplarsınız. [[K6 s. 174]] Denklemde gereken oran ise 293/283’tür; bu yüzden ısınmanın sağladığı ek hacim, basınç düşüşünün sağladığından çok daha küçüktür. [[K6 s. 174]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk09b-evrensel">
<h2>Evrensel gaz yasası · Gaz miktarını hesaba katmak</h2>
<p class="intro">Avogadro yasasına göre basınç ve sıcaklık sabitken gazın hacmi tanecik sayısıyla doğru orantılıdır. [[K6 s. 175]] Bu ilişki birleşik yasaya eklendiğinde <i>P</i>·<i>V</i> = <i>n</i>·<i>R</i>·<i>T</i> elde edilir. [[K6 s. 175]]</p>
<div class="viz"><div class="viz-head"><h3>Standart koşullarda oksijen kütlesini değiştirin</h3></div><div data-viz="fk09b_mol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Oksijen kütlesi mol sayısına çevrilir, hacim denklemden hesaplanır. [[K6 s. 175–177]]</p></div>
<h3>Üç yasadan tek denkleme</h3>
<div class="viz"><div class="viz-head"><h3>Sabit kalan büyüklüğü seçin ve bağıntıyı okuyun</h3></div><div data-viz="fk09b_yasalar"></div><p class="viz-cap" aria-live="polite"></p></div>
<ol class="iskelet"><li><b>Önce aynı gazı izleyin.</b> Sıcaklık değişmiyorsa Boyle yasası basınç ile hacmin çarpımını korur. [[K6 s. 167]] Bu koşulu kaldırınca çarpımın alacağı yeni değeri, sabit basınçta hacmin ya da sabit hacimde basıncın sıcaklıkla nasıl değiştiğinden çıkarabilirsiniz. [[K6 s. 170–173]] Her iki yoldan da <i>PV</i> çarpımının mutlak sıcaklıkla aynı oranda değiştiği sonucuna varılır. [[K6 s. 173]]</li>
<li><b>Sonra gaz miktarını değiştirin.</b> Aynı sıcaklık ve basınçta ikinci bir gaz örneği ilkinden daha fazla tanecik içeriyorsa hacmi de aynı oranda büyüktür. [[K6 s. 175]] Bu yüzden <i>PV</i>/<i>T</i> değeri her miktarda gaz için aynı sayı olamaz; gaz miktarını mol cinsinden yazdığımızda bu değer <i>nR</i> olur. [[K6 s. 175–177]]</li>
<li><b>Bilinmeyeni seçin.</b> Kabarcık sorusunda ilk ve son hâldeki gaz miktarı aynı olduğundan kaç mol gaz bulunduğunu öğrenmeye gerek yoktur. [[K6 s. 173–174]] Oksijenin tartıldığı örnekte ise başlangıç ve son durum karşılaştırılmaz; kütleden bulunan mol sayısı tek bir durumda hacmi hesaplamaya yeter. [[K6 s. 175–177]]</li></ol>
<p>Gaz miktarı ve sıcaklık biliniyorsa ölçülen basınçtan hacim ya da bilinen hacimden basınç bulunabilir. [[K6 s. 175]] Örneğin hacmi ve sıcaklığı bilinen bir tüpte basıncı ölçerek gaz miktarını <i>n</i> = <i>P</i>·<i>V</i>/(<i>R</i>·<i>T</i>) ile hesaplayabilirsiniz. [[K6 s. 175–176]]</p>
<ul class="ozet"><li><b>Mekanik büyüklükler.</b> <i>P</i> mutlak basınç (Pa), <i>V</i> hacimdir (m³). [[K6 s. 175–177]]</li>
<li><b>Madde miktarı ve sıcaklık.</b> <i>n</i> mol cinsinden gaz miktarını, <i>T</i> kelvin cinsinden mutlak sıcaklığı gösterir. [[K6 s. 175–177]]</li>
<li><b>Gaz sabiti.</b> <i>R</i> = 8,31 J·K<sup>−1</sup>·mol<sup>−1</sup> kullanıldığında diğer birimler bu sabitle uyumlu olmalıdır. [[K6 s. 177]] Sabitin içindeki K sıcaklığın hangi birimde girileceğini gösterir; hacim biriminin karıştırılması bu denklemde en sık hata kaynağıdır. [[K6 s. 177]]</li></ul>
<article class="card fk09b-hesap"><h3>Hesap · Deniz düzeyinde 32 g oksijen</h3>
<p>Uç koşullar dışında oksijen gaz hâlindedir. [[K6 s. 176]] Kitabın kullandığı standart sıcaklık ve basınçta (STP) sıcaklık 0 °C ≈ 273 K, deniz düzeyinde basınç 101,3 kPa’dır. [[K6 s. 176]]</p>
<ol><li><b>Kütleden mole.</b> Oksijenin atom kütlesi 16’dır, ancak gaz iki atomlu O₂ moleküllerinden oluşur. [[K6 s. 176]] Molekül kütlesi 32, molar kütle 32 g/mol olduğundan <i>n</i> = 32 g ÷ (32 g/mol) = 1 mol. [[K6 s. 176]]</li>
<li><b>Molden hacme.</b> <i>V</i> = <i>nRT</i>/<i>P</i> = (1 × 8,31 × 273) / 101 300 ≈ 0,0224 m³. [[K6 s. 175–177]]</li>
<li><b>Litreye dönüş.</b> 1 m³ = 1000 L olduğundan bu koşullarda bir molün kapladığı hacim yaklaşık <strong>22,4 L</strong>’dir. [[K6 s. 176–177]]</li></ol></article>
<details class="fk09b-okuma"><summary>Hesabı tersine çevirerek kontrol edin</summary>
<p>Şekilde 16 g’ı seçtiğinizde atom kütlesini değiştirmiş olmazsınız; tartılan oksijen örneğinin kütlesini değiştirmiş olursunuz. [[K6 s. 175–176]] Oksijen yine iki atomlu olduğundan molar kütle 32 g/mol kalır ve bu kez gaz miktarı yarım moldür. [[K6 s. 176]] Aynı basınç ve sıcaklıkta hacmin de bir mol için bulunan hacmin yarısı, yaklaşık 11,2 L olması gerekir. [[K6 s. 175–177]]</p>
<p>Bir tüpte ölçülen basınçla ters işlemi yaparken önce hacmi litre yerine metreküp olarak yazın. [[K6 s. 175–177]] Sonra mutlak basınç ile hacmin çarpımını gaz sabiti ile mutlak sıcaklığın çarpımına bölerek mol sayısına ulaşın. [[K6 s. 175–177]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk09b-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<p>Her önermeyi ayrı değerlendirin ve yanıtınızın gerekçesini kontrol edin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk09b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk09b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk09b-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk09b-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir E tipi oksijen tüpünün iç hacmi 4,5 L ve göstergesi 100 bar. [[K6 s. 168]] 2,5 L/dk akış için kullanım süresini nasıl tahmin eder, hangi belirsizlikleri bildirirsiniz? [[K6 s. 168–169]]</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Sıcaklığı sabit kabul edin ve gazın tüpteki hacmini atmosfer basıncındaki eşdeğer hacmiyle Boyle yasası üzerinden ilişkilendirin. [[K6 s. 167–169]]</li>
<li>Tüp için 10⁴ kPa, atmosfer için yaklaşık 100 kPa kullanınca basınç oranı 100 çıkar. [[K6 s. 168–169]]</li>
<li>4,5 × 100 = 450 L’yi 2,5 L/dk’ya bölerek yaklaşık 180 dakika bulun. [[K6 s. 168–169]]</li>
<li>Basınç göstergesinin hassasiyeti sınırlıdır ve tüpün içinde atmosfer basıncında gaz kalır. [[K6 s. 169]]</li>
<li>Kapalı tüp ısınırsa gaz miktarı aynı kalsa bile sabit hacimde basınç yükselir. [[K6 s. 172–173]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Düşey eksene basıncı, yatay eksene hacmi yerleştirin ve iki izoterm çizin. [[K6 s. 167–168]] Aynı hacimde sıcak olan eğriyi üstte gösterin. [[K6 s. 167]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Dalış tüpü doldurulurken su banyosu ne işe yarar? [[K6 s. 173]] Yükselen bir kabarcığın yüzey hacmini hesaplamak için hangi iki sıcaklığı bilmek gerekir? [[K6 s. 174]] Tüpteki mol sayısını basınçtan nasıl bulursunuz? [[K6 s. 175–176]]</div></div></section>
<section class="wrap blk ders-sec" id="fk09b-ozet"><h2>Özet</h2>
<ul class="ozet"><li>İdeal gaz modeli gerçek gazların belirli koşullardaki davranışını öngörmeye yardım eder; çok büyük moleküllerde ve uç sıcaklık veya basınçlarda uyum azalır. [[K6 s. 177]]</li>
<li>Bir karışımdaki bileşenlerin kısmi basınçları toplam basıncı verir. [[K6 s. 177]]</li>
<li>Sabit sıcaklıkta hacim arttıkça basınç düşer; akciğerler genişlediğinde bu düşüş havayı içeri çeker. [[K6 s. 168]]</li>
<li>Isınan gaz, sabit basınçta genleşir; hacmi sabitse basıncı yükselir ve tüpte yeterince büyük bir artış patlamaya yol açabilir. [[K6 s. 170–173]]</li>
<li>Sabit miktarda gazın iki durumu <i>PV</i>/<i>T</i> ile karşılaştırılır; mol sayısı hesaba katıldığında <i>PV</i> = <i>nRT</i> kullanılır. [[K6 s. 173–175]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="09b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/09a">← İdeal gaz, Avogadro yasası ve kısmi basınç</a><a href="#/dersler/fizik/10">Sonraki: Difüzyon, ozmoz ve çözünürlük →</a></nav></section>`,
};
