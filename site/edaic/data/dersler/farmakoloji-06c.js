VERI.sorular = VERI.sorular || {};
VERI.sorular['far06c-1'] = {
  no: 1, kok: 'Eğri alanları ve dağılım hacmi', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 65–67]]',
  onermeler: [
    {t:'AUMC, konsantrasyonun zamana karşı grafiğinin altında kalan alandır.', d:false, n:'AUMC için düşey eksene konsantrasyonun zamanla çarpımı yerleştirilir. [[K3 s. 65]]'},
    {t:'Dozun AUC’ye bölünmesi klirensi verir.', d:true, n:'AUC dozun klirense oranıdır. [[K3 s. 65]]'},
    {t:'Dağılım hacmi toplam vücut suyunu aşabilir.', d:true, n:'Dağılım hacmi ölçülen konsantrasyondan çıkarılan görünür bir hacimdir. [[K3 s. 66]]'},
    {t:'Kararlı durum dağılım hacmi, klirensin MRT’ye bölünmesiyle hesaplanır.', d:false, n:'Vss için klirens ile ortalama kalış süresi çarpılır. [[K3 s. 65]]'},
    {t:'Terminal fazdan ekstrapolasyon, dağılım belirgin olduğunda toplam hacmi düşük tahmin eder.', d:false, n:'Yalnız terminal fazı hesaba katmak hacmi fazla tahmin ettirebilir. [[K3 s. 66–67]]'}
  ]
};
VERI.sorular['far06c-2'] = {
  no: 2, kok: 'Klirens ve metabolik kapasite', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 67–69]]',
  onermeler: [
    {t:'Eliminasyon klirensi santral kompartıman hacmi ile k₁₀’un çarpımıdır.', d:true, n:'Sistemden kayıp için kullanılan hacim V₁’dir. [[K3 s. 67]]'},
    {t:'C₁₃, ilacın birinci ve üçüncü kompartıman arasındaki geçişini tanımlar.', d:true, n:'C₁₃ bu iki kompartıman arasındaki klirenstir. [[K3 s. 67–68]]'},
    {t:'Doymuş enzimin metabolizma hızı, substrat konsantrasyonuyla orantılı artar.', d:false, n:'Enzim maksimum kapasitesine ulaştığında substrat artışı hızı yükseltmez. [[K3 s. 68]]'},
    {t:'Fenitoin metabolizması normal aralığın üst ucunda doyabilir.', d:true, n:'Bu düzeyde küçük bir doz artışı konsantrasyonda büyük bir artış doğurabilir. [[K3 s. 68]]'},
    {t:'Sabit hızlı infüzyonda giriş maksimum atılım hızını aşarsa konsantrasyon doğrusal yükselmeyi sürdürür.', d:true, n:'Kapasite aşıldıktan sonra giriş ile atılım arasındaki fark sürer. [[K3 s. 68–69]]'}
  ]
};
VERI.sorular['far06c-3'] = {
  no: 3, kok: 'Logaritma, eğim ve yarılanma ömrü', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 70–73]]',
  onermeler: [
    {t:'log(w/z), log w ile log z’nin toplamıdır.', d:false, n:'Bölümün logaritması farktır, çarpımın logaritması toplamdır. [[K3 s. 70]]'},
    {t:'Doğal logaritmayı on tabanına dönüştürmek için ln 10 ile çarparız.', d:false, n:'On tabanına geçerken ln 10’a böleriz. [[K3 s. 71]]'},
    {t:'Tek kompartımanda ln C’nin zamana karşı doğrusunun eğimi −k’dir.', d:true, n:'ln C = ln C₀ − kt denkleminde t’nin katsayısı −k’dir. [[K3 s. 72]]'},
    {t:'Konsantrasyon yarıya indiğinde k ile geçen sürenin çarpımı ln 2’dir.', d:true, n:'ln C − ln(C/2) = ln 2 olduğundan k × t½ = ln 2 olur. [[K3 s. 73]]'},
    {t:'Tek kompartımanda yarılanma ömrü zaman sabitinden kısadır.', d:true, n:'t½, zaman sabitinin yaklaşık 0,693 katıdır. [[K3 s. 73]]'}
  ]
};

(function () {
  const nav = [['alan','Eğri alanları'],['hacim','Dağılım hacmi'],['klirens','Klirens'],['doyma','Doyma'],['log','Logaritma'],['egim','Eğim ve süre'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  SAYFALAR['dersler/farmakoloji/06c'] = {
    grup:'dersler', eyebrow:'Farmakoloji · Kısım 1 · Bölüm 6 · Ders 06c',
    baslik:'Kompartımansız modeller ve parametrelerin ölçülmesi',
    lede:'Bir dozdan sonra izlenen plazma konsantrasyonu, ilacın hangi hacimlere dağıldığını varsaymadan klirensi ve ortalama kalış süresini hesaplamaya olanak verir. [[K3 s. 65]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad], i) => `<button type="button" data-scroll="a06c-${id}"><span>${i+1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a06c-alan">
<h2>Aynı ölçümlerden iki alan</h2>
<p class="intro">Kompartımansız modelde ilacın plazmadan uzaklaşmasını konsantrasyon–zaman eğrisinin altındaki alanla (AUC) değerlendiririz. [[K3 s. 65]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi alanı ölçüyoruz?</h3></div><div data-viz="a06c_alan"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel eğriler. [[K3 s. 65]]</p></div>
<ul class="ozet">
<li><b>Klirens (Cl).</b> AUC = doz / Cl olduğundan, verilen dozu ölçülen alana böleriz. [[K3 s. 65]]</li>
<li><b>Ortalama kalış süresi (MRT).</b> Birinci moment eğrisi, her ölçümde konsantrasyonu o ölçümün zamanıyla çarparak elde edilir. [[K3 s. 65]] Bu eğrinin alanını (AUMC) AUC’ye bölmek, ilacın vücutta ne kadar kaldığını gösterir. [[K3 s. 65]] MRT, kompartıman modelindeki zaman sabitine benzer. [[K3 s. 65]]</li>
<li><b>Kararlı durum dağılım hacmi (Vss).</b> Klirensle ortalama kalış süresini çarptığımızda hacmi buluruz. [[K3 s. 65]] İki alanı yerine yazarsak Vss = (doz/AUC) × (AUMC/AUC) = doz × AUMC / AUC² olur. [[K3 s. 67]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a06c-hacim">
<h2>Dağılım hacmi nasıl tahmin edilir?</h2>
<p class="intro">Dağılım hacmi (Vd), ölçülen plazma konsantrasyonunu açıklayan, belirli bir fizyolojik hacme karşılık gelmeyen görünür hacimdir ve toplam vücut suyunu çok aşabilir. [[K3 s. 66]]</p>
<div class="viz"><div class="viz-head"><h3>Toplam hacme üç yaklaşım</h3></div><div data-viz="a06c_hacim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel yöntem karşılaştırması. [[K3 s. 66–67]]</p></div>
<p>Vd, klirens ve zaman sabitleri ilaçların vücutta kalıcılığını karşılaştırmaya yarar. [[K3 s. 66]] Vd litre olarak ya da ağırlığa göre L/kg olarak verilir. [[K3 s. 66]] Molekül büyüklüğü, lipit çözünürlüğü ve elektriksel yük dağılımı etkiler. [[K3 s. 66]]</p>
<div class="tbl-wrap"><table class="tbl a06c-tablo"><thead><tr><th>İlaç</th><th>Dağılım hacmini ne açıklar?</th></tr></thead><tbody>
<tr><th>Propofol</th><td>Lipitlerde çok iyi çözünür, Vd yaklaşık 250 L’dir. [[K3 s. 66]]</td></tr>
<tr><th>Vekuronyum ve atrakuryum</th><td>İkisi de yüklü moleküldür, Vd sırasıyla yaklaşık 19 L ve 11 L’dir. [[K3 s. 66]]</td></tr>
<tr><th>Klorokin</th><td>Bu antimalaryalin Vd’si 10 000 L’yi aşar. [[K3 s. 66]] Dokuya bağlanma, özellikle hücre içinde tutulma, çok büyük hacimleri açıklayabilir. [[K3 s. 66]]</td></tr>
</tbody></table></div>
<p>Karaciğer ve böbrek hastalıklarında sıvı kompartımanlarının göreli hacimleri değişir ve Vd artar. [[K3 s. 66]]</p>
<h3>Başlangıç hacmi ile toplam hacmi ayırın</h3>
<ul class="ozet">
<li><b>Basit model.</b> Başlangıç dozu X’i uygulamanın hemen sonrasındaki plazma konsantrasyonuna bölünce Vd = X/C₀ elde edilir. [[K3 s. 66]]</li>
<li><b>Santral hacim.</b> Çok kompartımanlı modelde ilaç başlangıçta santral hacme dağılır. [[K3 s. 66]] Kitap, hızlı dağılım fazının düşey eksen kesişimine karşılık gelen A konsantrasyonundan başlangıç hacmini V<sub>intial</sub> = X/A olarak tahmin eder. [[K3 s. 66]]</li>
<li><b>Proteine bağlanma.</b> Kitabın karşılaştırmasında yüksek bağlanma daha büyük santral hacimle ilişkilidir. [[K3 s. 66]] Propofolün %98’i proteine bağlıdır, santral hacmi yaklaşık 16 L, gerçek plazma hacmi ise yaklaşık 3 L’dir. [[K3 s. 66]]</li>
</ul>
<p>Toplam dağılım hacmi, modeldeki hacimlerin toplamıdır. [[K3 s. 66]] Şekilde önce tek bir kesişimi kullanan yöntemi, sonra eğrinin alanını kullanan iki yöntemi seçin. [[K3 s. 66–67]]</p>
<ul class="ozet">
<li><b>Vextrap.</b> Yarı logaritmik grafikte terminal doğruyu sıfır zamanına uzatıp kesişime karşılık gelen konsantrasyonu (M) bulun. [[K3 s. 66]] Kesişim ln M’yi verir, hacim hesabındaki payda ise M’dir. [[K3 s. 66]] X/M yalnız terminal fazı temsil eder ve özellikle dağılım belirginse toplam hacmi çok yüksek gösterebilir. [[K3 s. 66–67]]</li>
<li><b>Varea.</b> AUC’den bulunan klirensi iki kompartımanda β’ya, üç kompartımanda γ’ya bölün. [[K3 s. 67]] Terminal zaman sabitinin tersi böylece plazmadan uzaklaşmanın ortalama hız sabiti yerine kullanılır. [[K3 s. 67]] Dağılım ve yeniden dağılım belirginse β bu hızı düşük, dolayısıyla hacmi yüksek tahmin eder. [[K3 s. 67]] İki kompartımanda hesabın iki eşdeğer yazımı Varea = Cl/β ve Varea = X/(AUC × β) biçimindedir. [[K3 s. 67]] Deneysel veriden kolay hesaplanır ve Vextrap’tan daha iyi bir tahmindir. [[K3 s. 67]]</li>
<li><b>Vss.</b> Kompartımansız hesap eliminasyondan bağımsız bir hacim tahmini verir. [[K3 s. 67]] Tahminlerin sırası Vextrap &gt; Varea &gt; Vss biçimindedir ve Vss genellikle Varea’ya daha yakındır. [[K3 s. 67]]</li>
</ul>
<div class="note plain"><b>Atlas notu.</b> Kitap parametreleri sıralarken α, β ve γ’ya “zaman sabitleri” der. Bunlar fazların hız sabitleridir, zaman sabitleri ise tersleridir.</div>
</section>
<section class="wrap blk ders-sec" id="a06c-klirens">
<h2>Klirens neyi ölçer?</h2>
<p class="intro">Klirens, birim zamanda içerdiği ilacın tamamı uzaklaştırılmış sayılan plazma hacmidir ve genellikle mL/dk ile ifade edilir. [[K3 s. 67]]</p>
<div class="viz"><div class="viz-head"><h3>İki farklı çarpım, birbirine yakın klirensler</h3></div><div data-viz="a06c_klirens"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kutular hacim ölçeğinde çizilmemiştir. [[K3 s. 67]]</p></div>
<ul class="ozet">
<li><b>Eliminasyon.</b> Tek kompartımanda klirens, Vd ile eliminasyon hız sabitinin çarpımıdır. [[K3 s. 67]] Birden çok kompartımanda sistemden kaybı V₁ × k₁₀ verir. [[K3 s. 67]] Pratikte klirens sıklıkla doz/AUC ile hesaplanır. [[K3 s. 67]]</li>
<li><b>Propofol.</b> k₁₀ ≈ 0,12 olduğundan birim zamanda santral hacmin yaklaşık sekizde birine karşılık gelen ilaç uzaklaşır. [[K3 s. 67]]</li>
<li><b>Remifentanil.</b> Propofolden daha küçük santral hacme ve daha yüksek k₁₀’a sahiptir. [[K3 s. 67]] Santral hacmin küçülmesiyle çarpanlardan biri azalırken hız sabitinin yükselmesiyle diğeri büyür. [[K3 s. 67]] Kitap 5,1 × 0,5 çarpımının sonucunu yaklaşık “2,5 litre” olarak verir. [[K3 s. 67]]</li>
<li><b>Kompartımanlar arası geçiş.</b> C₁₂ birinci ve ikinci, C₁₃ birinci ve üçüncü kompartıman arasındaki klirenstir. [[K3 s. 67–68]] Hacimler karşılaştırılabilir olduğunda daha yüksek kompartımanlar arası klirens, daha hızlı dağılım ve yeniden dağılım demektir. [[K3 s. 68]]</li>
</ul>
<div class="note plain"><b>Atlas notu.</b> Kitap remifentanil klirensini “2,5 litre” diye yazar. Bu örnekte doğru birim L/dk’dır.</div>
</section>
<section class="wrap blk ders-sec" id="a06c-doyma">
<h2>Eliminasyon kapasitesi aşılınca</h2>
<p class="intro">Metabolizmada enzim genellikle substrata göre bol olduğundan enzim kapasitesi hızı sınırlamaz ve eliminasyon birinci derecedendir. [[K3 s. 68]]</p>
<div class="viz"><div class="viz-head"><h3>Sabit hızlı infüzyonu izleyin</h3></div><div data-viz="a06c_doyma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel konsantrasyon–zaman eğrisi. [[K3 s. 68–69]]</p></div>
<p>Bazı süreçler düşük dozda birinci dereceden, daha yüksek dozda sıfırıncı dereceden işler. [[K3 s. 68]] Şekilde A’dan B’ye yaklaşırken plazma düzeyi artar, ancak artışın hızı giderek yavaşlar. [[K3 s. 69]] B’den sonra genellikle karaciğer enzimleri maksimum kapasitede çalışır ve çizginin eğimi sabit kalır. [[K3 s. 69]]</p><p>Doyma kinetiği olarak da bilinen sıfırıncı derecede enzim maksimum kapasitededir ve substrat artsa da birim zamandaki eliminasyon sabit kalır. [[K3 s. 68]]</p>
<div class="tbl-wrap"><table class="tbl a06c-tablo"><thead><tr><th>Örnek</th><th>Hangi koşulda?</th></tr></thead><tbody>
<tr><th>Etanol</th><td>Orta miktarda alımdan sonra metabolizma görece sabit hızdadır. [[K3 s. 68]] Alkol dehidrogenaz yolunda az bulunan bir kofaktör hızı sınırlar. [[K3 s. 68]]</td></tr>
<tr><th>Fenitoin</th><td>Metabolizması normal aralığın üst ucunda doyabilir. [[K3 s. 68]]</td></tr>
<tr><th>Tiyopental</th><td>Status epileptikus tedavisindeki gibi uzun infüzyonda kinetiği sıfırıncı dereceye geçer. [[K3 s. 68]]</td></tr>
</tbody></table></div>
<ul class="ozet">
<li><b>Doz artışı.</b> Terapötik aralığın üst ucunda küçük bir doz artışı plazma düzeyini çok yükseltip toksisiteye yol açabilir. [[K3 s. 68]] Fenitoinde toksik düzeylerden kaçınmak için plazma konsantrasyonu izlenmelidir. [[K3 s. 68]]</li>
<li><b>Birikim.</b> Verilme hızı maksimum atılımı aşarsa kararlı duruma ulaşılamaz. [[K3 s. 68–69]] İlaç alımı sürdükçe düzey yükselir ve toksisite ölümle sonuçlanabilir. [[K3 s. 68]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a06c-log">
<h2>Logaritmayla çarpma, bölme ve taban değiştirme</h2>
<p class="intro">On tabanında logaritma, sayıyı 10’un kuvveti olarak yazdığımızda elde ettiğimiz üstür. [[K3 s. 70]]</p>
<div class="viz"><div class="viz-head"><h3>13 ve 257 ile iki işlem</h3></div><div data-viz="a06c_log"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Logaritma ve antilogaritma değerleri kitabın yuvarlamalarıyla verilmiştir. [[K3 s. 69–70]]</p></div>
<p>w = 10<sup>x</sup> ve z = 10<sup>y</sup> ise log w = x ve log z = y olur. [[K3 s. 69]] log(wz) = x + y olduğundan çarpmada üsleri toplarız, log(w/z) = x − y olduğundan bölmede çıkarırız. [[K3 s. 69–70]]</p>
<ul class="ozet">
<li><b>Tabloyu okuyun.</b> Kitaptaki örnekte 1–9,999 arasındaki sayıların logaritmaları 0–0,999 aralığında tablolanır. [[K3 s. 69]] Antilogaritma için üssü tam sayı ile pozitif ondalık kısma ayırın. [[K3 s. 69–70]]</li>
<li><b>Çarpma.</b> 13 ve 257’nin logaritmaları yaklaşık 1,1139 ve 2,4100’dır. [[K3 s. 69]] Bunları topladığımızda 3,5239 buluruz, fakat bu değer hâlâ çarpımın üssüdür. [[K3 s. 69]] 10<sup>3,5239</sup> = 10³ × 10<sup>0,5239</sup> ve antilog(0,5239) ≈ 3,341 olduğundan sonuç 1000 × 3,341 = 3341’dir. [[K3 s. 69–70]]</li>
<li><b>Bölme.</b> Aynı iki logaritmanın farkı 1,1139 − 2,4100 = −1,2961’dir. [[K3 s. 70]] Tabloda negatif logaritma bulunmadığı için −1,2961’i −2 + 0,7039 biçiminde ayırırız. [[K3 s. 70]] Böylece 10<sup>−1,2961</sup> = 10<sup>−2</sup> × 10<sup>0,7039</sup> yazıp yalnız pozitif ondalık kısmı tablodan ararız. [[K3 s. 70]] Antilog(0,7039) ≈ 5,057 olduğundan bölüm 0,01 × 5,057 ≈ 0,05057’dir. [[K3 s. 70]] Hesap makinesi çarpma ve bölmeyi tablodan daha hassas yapabilir. [[K3 s. 70]]</li>
</ul>
<h3>Taban değişirse</h3>
<ul class="ozet">
<li><b>Üssü okuyun.</b> 10⁻³, 10², 10⁴ ve 10<sup>x</sup> için log değerleri sırasıyla −3, 2, 4 ve x’tir. [[K3 s. 70]] e⁻², e⁴, e⁷ ve e<sup>t</sup> için ln değerleri −2, 4, 7 ve t olur, dolayısıyla ln(e<sup>−kt</sup>) = −kt’dir. [[K3 s. 70]]</li>
<li><b>Üssü öne alın.</b> e⁴ dört e’nin çarpımıdır, dolayısıyla log(e⁴) dört log e’nin toplamı, yani 4 log e’dir. [[K3 s. 71]] Benzer biçimde ln(10<sup>y</sup>) = y ln 10 olur. [[K3 s. 71]]</li>
<li><b>Aynı C, iki gösterim.</b> C = e<sup>ln C</sup> = 10<sup>log C</sup> eşitliğinde iki tarafın doğal logaritmasını alınca ln C = (log C) ln 10 bulunur. [[K3 s. 71]] ln 10 ≈ 2,302 olduğundan log C ≈ ln C / 2,302 ≈ 0,434 ln C’dir. [[K3 s. 71]]</li>
<li><b>Ters yönde.</b> Aynı eşitliğin on tabanında logaritması log C = (ln C) log e verir. [[K3 s. 71–72]] Böylece ln C = log C / log e olur ve log e ≈ 0,434’tür. [[K3 s. 72]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a06c-egim">
<h2>Doğrunun eğiminden yarılanma ömrüne</h2>
<p class="intro">Tek kompartımanlı modelde konsantrasyon eksenini logaritmik seçmek, üstel azalışı k ve C₀’ı bulabileceğimiz bir doğruya dönüştürür. [[K3 s. 72]]</p>
<div class="viz"><div class="viz-head"><h3>Düşey ekseni değiştirin</h3></div><div data-viz="a06c_egim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel grafikler, eğimler denklemlerde verilmiştir. [[K3 s. 72]]</p></div>
<p>C = C₀e<sup>−kt</sup> ifadesinde taban e olduğundan doğal logaritma işlemi kolaylaştırır. [[K3 s. 72]] Çarpım toplam haline gelir ve ln C = ln C₀ + ln(e<sup>−kt</sup>) = ln C₀ − kt bulunur. [[K3 s. 72]] Düşey eksendeki kesişim ln C₀’dır, doğrunun eğimi ise −k’dır. [[K3 s. 72]]</p><p>On tabanında çarpımı açtığımızda log C = log C₀ + log(e<sup>−kt</sup>) elde ederiz. [[K3 s. 72]] Son terim ln(e<sup>−kt</sup>)/2,302 olduğundan log C ≈ log C₀ − kt/2,302 ≈ log C₀ − 0,434kt olur. [[K3 s. 72]]</p>
<h3>Konsantrasyonun yarıya inmesi ne kadar sürer?</h3>
<ol class="iskelet">
<li><b>Zamanı yalnız bırakın.</b> t = (ln C₀ − ln C)/k olur. [[K3 s. 73]]</li>
<li><b>İki anı seçin.</b> t₁ anında C ve t₂ anında C/2 ölçülürse t½ = t₂ − t₁’dir. [[K3 s. 73]]</li>
<li><b>Farkı alın.</b> İlk zaman (ln C₀ − ln C)/k, ikinci zaman ise (ln C₀ − ln(C/2))/k’dır. [[K3 s. 73]] İki zamanın farkında ln C₀ terimleri birbirini götürür, kalan ifade k × t½ = ln C − ln(C/2) olur. [[K3 s. 73]]</li>
<li><b>Orana geçin.</b> Sağ taraf ln[C/(C/2)] = ln 2 ≈ 0,693’tür. [[K3 s. 73]] k = 1/τ olduğundan t½ ≈ 0,693 τ bulunur, yani yarılanma ömrü zaman sabitinden kısadır. [[K3 s. 73]]</li>
</ol>
</section>
<section class="wrap blk ders-sec" id="a06c-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin ve gerekçenizi kontrol edin.</p>
<div class="viz"><div data-viz="mtf" data-q="far06c-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far06c-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far06c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a06c-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Bilinen bir dozdan sonra plazma konsantrasyonlarını zaman içinde ölçtünüz. Kompartıman hacmi varsaymadan klirens, ortalama kalış süresi ve kararlı durum dağılım hacmini nasıl bulursunuz? Tek kompartımanlı üstel azalışta yarılanma ömrünü nasıl çıkarırsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>C’yi zamana karşı çizip AUC’yi bulun ve dozu AUC’ye bölerek klirensi hesaplayın. [[K3 s. 65]]</li>
<li>Her C’yi ölçüm zamanı t ile çarpıp t’ye karşı çizin ve AUMC’yi bulun. [[K3 s. 65]]</li>
<li>AUMC/AUC, ilacın vücutta ortalama kalış süresidir. [[K3 s. 65]]</li>
<li>Klirensi bu süreyle çarparak Vss’yi elde edin. [[K3 s. 65]]</li>
<li>ln C–zaman doğrusunun eğiminden k’yı bulun. [[K3 s. 72]] Konsantrasyon yarıya inene kadar geçen süre t½ = ln 2/k’dır. [[K3 s. 73]]</li>
</ol>
<div class="note"><b>Çizin.</b> C–t ve (t × C)–t grafiklerinde alanları tarayın. [[K3 s. 65]] Ayrı bir ln C–t grafiğinde C ile C/2’ye karşılık gelen iki noktayı ve aralarındaki zaman farkını gösterin. [[K3 s. 72–73]]</div>
<h3>Olası ek sorular</h3><ul><li>Vextrap ile Varea neden farklı tahminler verir? [[K3 s. 66–67]]</li><li>Propofol ve remifentanilin klirensleri neden birbirine yakındır? [[K3 s. 67]]</li><li>İnfüzyon hızı eliminasyon kapasitesini aşarsa eğri nasıl değişir? [[K3 s. 68–69]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a06c-ozet"><h2>Özet</h2><ul class="ozet">
<li>Doz/AUC klirensi, AUMC/AUC ortalama kalış süresini verir. [[K3 s. 65]]</li>
<li>Vss = Cl × MRT, üç toplam hacim tahmini içinde en küçüğüdür. [[K3 s. 65–67]]</li>
<li>Sistemden kaybı belirleyen klirens V₁ × k₁₀’dur. [[K3 s. 67]]</li>
<li>Doymuş eliminasyonda sabit giriş atılımı aşarsa plazma düzeyi doğrusal yükselir. [[K3 s. 68–69]]</li>
<li>ln C–zaman doğrusunda eğim −k, yarılanma ömrü ln 2/k’dır. [[K3 s. 72–73]]</li>
</ul><div data-viz="tamam" data-modul="farmakoloji" data-bolum="06c"></div>
<nav class="ders-gec"><a href="#/dersler/farmakoloji/06b">← 06b · Kompartıman modelleri</a><a href="#/dersler/farmakoloji/07a">Sonraki: 07a · Propofol, remifentanil ve manuel TİVA →</a></nav>
</section>`
  };
})();
