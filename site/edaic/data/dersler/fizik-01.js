VERI.sorular = VERI.sorular || {};
VERI.sorular['fk01-1'] = {
  no: 1, kok: 'Atomun yapısı ve kimyasal bağlar', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 19–21]]',
  onermeler: [
    { t: 'Bir nötron kaybeden He-4 çekirdeğinin atom numarası değişir.', d: false, n: 'Atom numarasını protonlar belirler ve He-3 çekirdeğinde de iki proton vardır. [[K6 s. 20]]' },
    { t: 'Bir protonun kütlesi bir elektronunkinin yaklaşık 1840 katıdır.', d: true, n: 'Proton ve nötronun kütleleri birbirine yakındır ve her biri elektron kütlesinin yaklaşık 1840 katıdır. [[K6 s. 20]]' },
    { t: 'Bohr modelinde elektron iki kabuk arasında herhangi bir ara enerjide kalabilir.', d: false, n: 'Elektron ancak izin verilen enerji düzeylerinde bulunabilir. [[K6 s. 21]]' },
    { t: 'Kovalent bağdaki ortak elektronlar her iki çekirdek tarafından çekilir.', d: true, n: 'Çekirdekler arasındaki elektron bulutu iki pozitif çekirdeğin birbirini itmesine üstün gelen bir çekim sağlar. [[K6 s. 21]]' },
    { t: 'İyonik bağ kurulurken elektronu alan atom katyona dönüşür.', d: false, n: 'Elektron alan atom negatif yüklü anyona dönüşür. [[K6 s. 21]]' },
  ],
};
VERI.sorular['fk01-2'] = {
  no: 2, kok: 'Isı aktarımı ve madde hâlleri', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 22–25]]',
  onermeler: [
    { t: 'Katıda tanecikler denge konumları çevresinde titreşir.', d: true, n: 'Sıkı bağlar düzeni korurken tanecikler yerlerinde titreşebilir. [[K6 s. 22]]' },
    { t: 'Erime platosundaki parafine ısı verilmeye devam edilebilir.', d: true, n: 'Alınan enerji erime tamamlanana kadar moleküller arası bağların çözülmesine gider. [[K6 s. 23]]' },
    { t: 'Özgül ısı kapasitesi ile özgül buharlaşma ısısının SI birimleri aynıdır.', d: false, n: 'İlkinin birimi J·kg⁻¹·°C⁻¹, ikincisininki J·kg⁻¹ olur. [[K6 s. 25]]' },
    { t: 'Aynı koşullarda 1 kg sıvıyı buharlaştıran enerji, aynı kütlenin yoğuşurken verdiği enerjiye eşittir.', d: true, n: 'Ters geçişte enerjinin büyüklüğü aynı kalır, yalnız aktarım yönü değişir. [[K6 s. 24]]' },
    { t: 'Erimekte olan buzun hastadan ısı alması için önce sıcaklığının yükselmesi gerekir.', d: false, n: 'Buz 0 °C’de erirken sıcaklığı yükselmeden hastadan ısı alır. [[K6 s. 24]]' },
  ],
};
VERI.sorular['fk01-3'] = {
  no: 3, kok: 'Faz diyagramı ve buhar', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 25–27]]',
  onermeler: [
    { t: 'Çaydanlığın önündeki beyaz bulut gaz fazındaki sudur.', d: false, n: 'Beyaz görünen kısım yoğuşmuş sıvı damlacıklardır. [[K6 s. 27]]' },
    { t: 'Üçlü noktada katı, sıvı ve gaz bir arada bulunabilir.', d: true, n: 'Üç fazın denge koşulları aynı sıcaklık ve basınçta kesişir. [[K6 s. 25–27]]' },
    { t: 'Suyun katı–sıvı sınırı, basınç arttıkça düşük sıcaklıklara doğru eğilir.', d: true, n: 'Bu eğim buzun sıvı sudan daha düşük yoğunlukta olmasıyla ilişkilidir. [[K6 s. 26]]' },
    { t: 'Rakım arttığında su daha düşük sıcaklıkta kaynayabilir.', d: true, n: 'Everest zirvesi yakınında düşük atmosfer basıncı nedeniyle kaynama sıcaklığı 80 °C’nin altındadır. [[K6 s. 25]]' },
    { t: 'Kritik sıcaklığın altındaki gaz fazı buhar olarak adlandırılır.', d: true, n: 'Kritik sıcaklığın altında basınç artışıyla, soğutmadan yoğuşma mümkün olabilir. [[K6 s. 27]]' },
  ],
};

(function () {
  const nav = [['atom','Atom ve izotop'],['bag','Bağlar'],['hal','Madde hâlleri'],['isi','Özgül ısı'],['plato','Gizli ısı'],['faz','Faz diyagramı'],['buhar','Buhar'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  function sekil(ad, baslik, alt) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk01_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  }
  SAYFALAR['dersler/fizik/01'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 1', baslik: 'Atomlar ve madde',
    lede: 'Erimekte olan buz, sıcaklığı yükselmeden hastadan ısı alabilir. [[K6 s. 24]] Bu olayı açıklamak için tanecikler arasındaki bağları ve hâl değişiminde enerjinin nereye gittiğini izleyin.',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad],i) => `<button type="button" data-scroll="fk01-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk01-atom">
<h2>Proton elementi, nötron izotopu ayırt eder</h2>
<p class="intro">Bir elementin periyodik tablodaki yerini çekirdeğindeki proton sayısı belirler. [[K6 s. 20]]</p>
${sekil('atom','Bir nötron eksilirse ne değişir?', 'Şemada + protonu, 0 nötronu, − elektronu gösterir; boyutlar ölçekli değildir. [[K6 s. 19–20]]')}
<p>Yunanca <i>atomos</i> “bölünemez” demektir. [[K6 s. 19]] Yeni Zelandalı fizikçi Ernest Rutherford 1912’de kütlenin hemen tümünün küçük, pozitif bir çekirdekte toplandığını göstererek atom fiziğinin yolunu açtı. [[K6 s. 19]] Negatif elektronlar çekirdeğin çevresinde seyrek bir bulut oluşturur. [[K6 s. 19]]</p>
<ul>
<li><b>Gezegen modeli.</b> Rutherford elektronları Güneş çevresindeki gezegenlere benzetti. [[K6 s. 19]] Gezegenleri yörüngelerinde kütleçekimi tutarken elektronu çekirdeğe bağlayan, karşıt yüklerin elektriksel çekimidir. [[K6 s. 19]]</li>
<li><b>Nükleonlar.</b> Çekirdekteki pozitif proton ile yüksüz nötronun kütleleri yaklaşık eşittir ve her biri bir elektrondan yaklaşık 1840 kat ağırdır. [[K6 s. 19–20]]</li>
<li><b>Atom numarası (Z).</b> Proton sayısı bir element için sabittir: hidrojende 1, helyumda 2, karbonda 6’dır. [[K6 s. 20]]</li>
<li><b>Kütle numarası (A).</b> Proton ve nötron sayılarının toplamıdır; atomik kütle birimiyle ifade edilen atom kütlesi bu tam sayıya yakındır ve fark elemente göre değişir. [[K6 s. 19–20]]</li>
</ul>
<p>İzotoplarda proton sayısı aynı, nötron sayısı farklıdır. [[K6 s. 20]] Yeryüzünde her 10 000 He-4 atomuna ikiden az He-3 atomu düşer; füzyon araştırmalarında aranan izotop He-3’tür. [[K6 s. 20]] Kararlı izotopların yanında, bozunurken parçacık veya ışınım yayan çok kararsız, radyoaktif izotoplar da vardır. [[K6 s. 20]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap tanım kutusunda nükleon toplamına “atom kütlesi” der ve eski proton temelli kütle biriminin yerine karbon-12 çekirdeğinin kütlesinin 1/12’sini verir. [[K6 s. 19–20]] Doğrusu, toplamın kütle numarası olması ve birimin temel hâlde, durgun, serbest ve nötr karbon-12 atomunun kütlesinin 1/12’si olarak tanımlanmasıdır. [[K6 s. 19–20]]</aside>
<p><b>Bohr’un eklediği kural.</b> Rutherford’dan iki yıl sonra Danimarkalı fizikçi Niels Bohr, elektronların ancak belirli enerjilere sahip kabuklarda bulunabildiğini öne sürdü. [[K6 s. 21]] Elektron bir düzeyden diğerine sıçrayabilir; izin verilen düzeylerin enerjileri sabittir. [[K6 s. 21]] Rutherford–Bohr modelindeki bu fikir kuantum fiziğinin temellerindendir ve lazerin geliştirilmesine katkı sağlamıştır. [[K6 s. 21]]</p>
<div class="card fk01-hesap"><h3>Hesap · Helyumun iki izotopu</h3>
<p>He-4 için önce yükü, sonra kütleyi sayın: çekirdekteki iki proton Z = 2 verir; iki nötronu da ekleyince A = 2 + 2 = 4 bulunur. [[K6 s. 20]] Atom kütlesi yaklaşık 4 atomik kütle birimidir. [[K6 s. 20]]</p>
<p>Kaydırıcıyı bir nötrona getirin: He-3 için A = 2 + 1 = 3 ve atom kütlesi yaklaşık 3 atomik kütle birimidir. [[K6 s. 20]] Periyodik tabloda başka bir kutuya geçilmez, çünkü çekirdekte hâlâ iki proton vardır. [[K6 s. 20]]</p></div>
<details><summary>Modeli okurken yörünge ile enerji düzeyini nasıl ayırırsınız?</summary><p>Rutherford’un gezegen benzetmesinde çekirdeğin çevresindeki elektronun neden çekirdeğe doğru çekildiğini, yüklerin işaretinden açıklayabilirsiniz. [[K6 s. 19]] Bohr’un getirdiği ek koşul elektronun enerjisini sınırlar: bir kabuktan diğerine geçiş mümkündür ama aradaki her enerjiye sahip bir elektron çizilemez. [[K6 s. 21]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk01-bag">
<h2>Elektron paylaşılırsa veya aktarılırsa</h2>
<p class="intro">Kimyasal bağ, atomları bir arada tutan ve iki ya da daha fazla atom içeren maddelerin oluşmasını sağlayan çekimdir. [[K6 s. 21]]</p>
${sekil('bag','Elektronu hangi çekirdek çeker?', 'Oklar kovalent bağda ortak elektrona etkiyen çekimleri, iyonik bağda elektronun aktarılma yönünü gösterir. [[K6 s. 21]]')}
<div class="cols">
<div class="card"><h3>Kovalent bağ</h3><p>İki atom dış kabuklarından bir veya daha fazla elektronu paylaşır. [[K6 s. 21]] Hızla hareket eden elektronlar, çekirdekler arasındaki denge konumu çevresinde bir bulut oluşturur. [[K6 s. 21]] İki çekirdeğin bu buluta uyguladığı çekim, çekirdekler arası itmeyi aşar ve güçlü bir bağ kurulur. [[K6 s. 21]]</p><p>Genellikle ametaller arasında görülür; organik bileşikler, iki atomlu gazlar ve su örnektir. [[K6 s. 21]]</p></div>
<div class="card"><h3>İyonik bağ</h3><p>Dış kabuktaki bir elektron başka bir atoma geçer; orada daha sıkı bağlanır ve daha düşük enerji düzeyinde bulunur. [[K6 s. 21]] Elektronu veren atom pozitif katyon, alan atom negatif anyon olur. [[K6 s. 21]]</p><p>Genellikle metal katyonu ile ametal anyonunun elektrostatik çekimi bir metal tuzu oluşturur; sofra tuzu (Na⁺Cl⁻) örnektir. [[K6 s. 21]]</p></div>
</div>
<p>Kovalent ve iyonik bağlar atomlar arasında güçlü bağlardır; moleküller arasındaki dipol–dipol etkileşimleri ve hidrojen bağları genellikle daha zayıftır. [[K6 s. 21]]</p>
<details><summary>Sodyum klorür oluşurken bir elektronu izleyin</summary><ol>
<li>Başlangıçta sodyumun dış kabuğundaki elektronu seçin; bağ kurulurken bu elektron klora geçer. [[K6 s. 21]]</li>
<li>Enerjiyi karşılaştırın: elektron, alıcı atomda verici atomdakine göre daha düşük bir enerji düzeyinde kalabilir. [[K6 s. 21]]</li>
<li>Yükleri kontrol edin: elektronun ayrılmasıyla sodyumda pozitif, alınmasıyla klorda negatif yük ortaya çıkar; iki iyon arasındaki çekim tuzu bir arada tutar. [[K6 s. 21]]</li>
</ol><p>Su molekülündeki kovalent bağı açıklarken aynı aktarım çizilemez; burada izlediğiniz dış kabuk elektronu iki çekirdeğin arasındaki ortak buluttadır. [[K6 s. 21]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk01-hal">
<h2>Taneciklerin hareketinden madde hâline</h2>
<p class="intro">Atomlar ve moleküller arasındaki bağlar, maddenin toplu özelliklerini ve belirli bir sıcaklıkta hangi hâlde bulunacağını belirler. [[K6 s. 21–22]]</p>
${sekil('hal','Düzen, aralık ve hareketi karşılaştırın', 'Taneciklerin konumu ve hareketi şematiktir. [[K6 s. 22]] [[K6 s. 25]]')}
<ul>
<li><b>Katı.</b> Tanecikler sık paketlenmiştir; güçlü kuvvetler belirgin bir dizilişi korur ve hareket denge konumu çevresinde titreşimle sınırlıdır. [[K6 s. 22]]</li>
<li><b>Sıvı.</b> Düzenli bir örgü yoktur; moleküller zayıf çekim için yeterince yakındır ve birbirinden bağımsız davranmadan birbirlerinin yanından kayabilir. [[K6 s. 22]]</li>
<li><b>Gaz.</b> Tanecikler uzaktır; aralarındaki kuvvetler çok küçüktür, belirli konumları yoktur ve bağımsız hareket ederken rastgele çarpışırlar. [[K6 s. 22]]</li>
<li><b>Plazma.</b> Olağan koşullarda görülmeyen bu gaz benzeri hâl, çok yüksek sıcaklıkta moleküllerin parçalanması ve atomlardan elektron kopmasıyla oluşur. [[K6 s. 25]] Yüksek enerjili parçacıkların pozitif ve negatif yükleri toplamda dengededir. [[K6 s. 25]]</li>
</ul>
<p>Güneş’te madde büyük ölçüde plazmadır. [[K6 s. 25]] Floresan tüplerde ve plazma televizyonlarda elektrik yardımıyla plazmadan ışık elde edilir; ekranda her biri iki küçük elektrot arasında bulunan binlerce gaz cebi vardır. [[K6 s. 25]]</p>
<div class="card"><h3>Plazma ekranındaki bir gaz cebini düşünün</h3><p>Önce gazın bulunduğu cebi, sonra bu cebin iki yanındaki küçük elektrotları belirleyin; ekranda bu düzen binlerce kez tekrarlanır. [[K6 s. 25]] Elektrik yardımıyla ışık üretiminde kullanılan plazma için bir başka örnek floresan tüptür. [[K6 s. 25]]</p><p>Şekilde plazma seçildiğinde iki işareti birlikte izleyin: ortamda yüklü tanecikler bulunması, bütünün net yük taşımasını gerektirmez. [[K6 s. 25]] Güneş örneğinde aynı madde hâlini tanımlayan özellik, maddenin çok yüksek sıcaklıkta iyonlaşmış olmasıdır. [[K6 s. 25]]</p></div>
<details><summary>Hareket eden tanecikleri görmeniz gazı tanımaya yeter mi?</summary><p>Katıda da hareket vardır; komşuların oluşturduğu düzen korunurken tek bir tanecik denge konumu çevresinde gidip gelir. [[K6 s. 22]] Sıvıyı tanımak için taneciklerin yakın kalmasına ama komşuların birbirinin yanından geçebilmesine bakın. [[K6 s. 22]]</p><p>Gazı ayırt eden, hareketin bağımsız olması ve sabit komşulukların kaybolmasıdır; tanecikler ancak rastgele karşılaşır. [[K6 s. 22]] Plazmaya geçildiğinde ek bir değişim daha vardır: enerji, elektronları atomlarından ayıracak kadar yüksektir. [[K6 s. 25]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk01-isi">
<h2>Sıcaklığı yükseltmek için gereken enerji</h2>
<p class="intro">Bir kilogram maddenin sıcaklığını 1 °C yükseltmek için gereken enerjiye özgül ısı kapasitesi (<i>c</i>) denir. [[K6 s. 23]]</p>
${sekil('isi','1 g suya ne kadar ısı verilmeli?', 'Doğru, sıvı su için sabit özgül ısı kabulüyle hesaplanır. [[K6 s. 23]]')}
<p><b><i>Q</i> = <i>m</i> · <i>c</i> · Δ<i>T</i></b> ilişkisinde <i>Q</i> eklenen ısı (J), <i>m</i> kütle (kg), Δ<i>T</i> sıcaklık değişimi (°C), <i>c</i> özgül ısı kapasitesidir (J·kg⁻¹·°C⁻¹). [[K6 s. 23–25]] Kütleyi gramla kullanırsanız özgül ısıyı da gram başına ifade edin. [[K6 s. 23]]</p>
<div class="card fk01-hesap"><h3>Hesap · Bir gram su</h3><p>Sıvı su için <i>c</i> = 4,18 J·g⁻¹·°C⁻¹ alındığında, 1 g suyu 1 °C ısıtmak için <i>Q</i> = 1 × 4,18 × 1 = <b>4,18 J</b> gerekir. [[K6 s. 23]]</p></div>
<p>Kitap sıvı suyun ısı kapasitesini sıcaklıktan bağımsız alır; buzun, sıvı suyun ve su buharının ısı kapasiteleri birbirinden farklıdır. [[K6 s. 23]]</p>
<details><summary>Isı kapasitesini grafikten nasıl okursunuz?</summary><p>Önce yatay eksenden hedef sıcaklık artışını seçin, sonra doğru üzerindeki noktaya karşılık gelen enerjiyi okuyun. [[K6 s. 23]] Düşeyde ölçülen, suyun son sıcaklığı değil, seçtiğiniz sıcaklık artışını sağlamak için ona aktarmanız gereken ısıdır. [[K6 s. 23]]</p>
<p>Artışın yarısını seçerseniz 1 g su için hesap 1 × 4,18 × 0,5 = 2,09 J verir. [[K6 s. 23]] Birimi kilogram üzerinden yazmak isterseniz aynı özgül ısı 4180 J·kg⁻¹·°C⁻¹ olur; bu kez denklemde kütleyi kilogram cinsinden yerine koyarsınız. [[K6 s. 23–25]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk01-plato">
<h2>Isı verilirken sıcaklık neden sabit kalır?</h2>
<p class="intro">Hâl değiştirirken alınan veya verilen enerjiye gizli ısı denir; bağları çözmek enerji gerektirir, bağ kurulması enerji açığa çıkarır. [[K6 s. 22–24]]</p>
${sekil('plato','Parafinin ısıtma eğrisinde bir evre seçin', 'Yatay parçalar faz değişimini gösterir; uzunluklar ve eğimler ölçekli değildir. [[K6 s. 23–24]]')}
<p>Oda sıcaklığındaki katı parafin fırında yaklaşık 59 °C’ye kadar ısınır. [[K6 s. 23]] Erime başladığında verilen ısı moleküller arası bağları çözer; bloğun tamamı sıvılaşınca sıcaklık tekrar yükselir. [[K6 s. 23]] Fırın yeterince sıcaksa buharlaşmada ikinci bir plato görülür. [[K6 s. 23]]</p>
<div class="cols"><div class="card"><h3>Erime ve donma</h3><p><i>L</i><sub>f</sub>, 1 kg katıyı eritmek için gereken özgül erime ısısıdır; aynı kütledeki sıvı donarken eşit miktarda enerji verir. [[K6 s. 22–25]] İngilizce <i>heat of fusion</i> ve <i>heat of melting</i> aynı geçiş için kullanılabilir. [[K6 s. 25]]</p></div>
<div class="card"><h3>Buharlaşma ve yoğuşma</h3><p><i>L</i><sub>v</sub>, kaynama noktasındaki 1 kg sıvıyı buhara dönüştürmek için gereken enerjidir; 1 kg buhar yoğuşurken aynı enerjiyi verir. [[K6 s. 23–25]] Bu nedenle ters yönde yoğuşma ısısı adı da kullanılır. [[K6 s. 24]]</p></div></div>
<p>Özgül gizli ısının birimi J·kg⁻¹ veya daha sık kJ·kg⁻¹’dir; 1 kJ·kg⁻¹ = 1 × 10<sup>3</sup> J·kg⁻¹. [[K6 s. 25]]</p>
<div class="card fk01-hesap"><h3>Hesap · Birimleri kullanarak ısıyı bulun</h3>
<p>Başlangıçta erime noktasında bulunan buz için kütleyi <i>m</i> (kg), özgül erime ısısını <i>L</i><sub>f</sub> (J·kg⁻¹) olarak yazın. [[K6 s. 24–25]] Tamamı erirken aldığı enerji <i>Q</i> = <i>m</i> · <i>L</i><sub>f</sub> olur; kütle birimleri sadeleşir ve sonuç joule cinsinden çıkar. [[K6 s. 24–25]]</p>
<p>Kaynama noktasında sıvıdan gaza geçişi hesaplarken aynı işlemi <i>L</i><sub>v</sub> ile yapın. [[K6 s. 24–25]] Ters geçişte bir kilogram için sayısal büyüklük aynıdır; sonucu yorumlarken enerjiyi bu kez maddenin çevresine verdiğini söyleyin. [[K6 s. 24]]</p></div>
<p><b>Hastayı soğuturken.</b> Aynı kütlede ve 0 °C’deki sıvı su ile erimekte olan buzu karşılaştırın. [[K6 s. 24]] Buz erimek için hastadan ayrıca ısı aldığı için soğutma daha etkilidir; bu sırada buzun sıcaklığı yükselmez. [[K6 s. 24]]</p>
<details><summary>Aynı sıcaklıkta iki ölçüm arasında enerji aktarılmış olabilir mi?</summary><p>Parafinin erimeye başladığı anı ve son katı parçanın kaybolduğu anı karşılaştırın. [[K6 s. 23]] Termometrede her iki okumada da yaklaşık 59 °C görürsünüz; ikinci okumada madde bütünüyle sıvıyken ilkinde çözülmesi gereken bağlar vardır. [[K6 s. 23]] İki an arasında parafine verilen ısıyı yalnız sıcaklık farkından bulamazsınız. [[K6 s. 23–24]]</p>
<p>Aynı mantık kaynayan suya da uygulanır: enerji vermeyi sürdürdüğünüzde sıvının bir bölümü daha gaza dönüşebilir ama geride kaynayan suyun sıcaklığı değişmez. [[K6 s. 23]] Ters yönde, aynı miktarda buhar sıvıya döndüğünde bağlar kurulur ve enerji çevreye geçer. [[K6 s. 24]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk01-faz">
<h2>Faz diyagramında basınç ve sıcaklık</h2>
<p class="intro">Faz diyagramı katı, sıvı ve gaz hâllerinin sıcaklık, hacim ve basınçla ilişkisini gösterir; basınç–sıcaklık kesitinde iki değer maddenin hâlini öngörmeye yeter. [[K6 s. 25]]</p>
${sekil('faz','Suyun faz sınırlarını okuyun', 'Her maddenin diyagramı farklıdır; suyun sınır çizgileri burada ölçekli değildir. [[K6 s. 25–26]]')}
<p>Deniz seviyesinde atmosfer basıncında su 0 °C’de donar ve 100 °C’de kaynar. [[K6 s. 25]] Çaydanlığın altını daha çok açmak, su tükenene kadar kaynama sıcaklığını yükseltmez. [[K6 s. 23]] Everest zirvesi yakınında kamp ocağındaki su düşük basınç nedeniyle 80 °C’nin altında kaynar. [[K6 s. 25]] Düdüklü tencerede atmosferi aşan basınç kaynamayı yaklaşık 125 °C’ye taşır ve pişirme süresini kısaltır. [[K6 s. 25]]</p>
<ul>
<li><b>Üçlü nokta.</b> Üç fazın birlikte bulunabildiği tek basınç–sıcaklık çiftidir. [[K6 s. 25–27]] Su için 0,01 °C ve 0,006 atm, CO₂ için −56,4 °C ve atmosfer basıncının yaklaşık beş katıdır. [[K6 s. 25–26]]</li>
<li><b>Erime çizgisi.</b> Suyun katı–sıvı sınırı sola eğilir; buz sıvıdan daha az yoğundur ve yüzer. [[K6 s. 26]] Bu sıra dışı özellik olmasa denizde yaşamın evrimleşememiş olabileceği öne sürülmüştür. [[K6 s. 26]]</li>
<li><b>Kritik sıcaklık.</b> Kitap bunu, basıncı ne kadar artırırsanız artırın gazı sıvılaştıramayacağınız sıcaklık sınırı olarak tanımlar. [[K6 s. 27]]</li>
<li><b>Kritik basınç.</b> Kitaptaki tanımı, kritik sıcaklıkta gazı sıvılaştırmak için gereken en düşük basınçtır. [[K6 s. 27]]</li>
</ul>
<aside class="note plain"><b>Atlas notu.</b> Kitap kritik noktanın ötesindeki maddeye yalnızca gaz der. [[K6 s. 26]] Doğrusu, kritik sıcaklık ve basıncın ikisi de aşıldığında maddenin süperkritik akışkan olmasıdır; kritik noktada sıvı ile gaz arasındaki ayrım kalkar. [[K6 s. 26–27]]</aside>
<h3>Kritik noktaları karşılaştırın</h3>
<table class="tbl fk01-tablo"><thead><tr><th>Madde</th><th>Sıcaklık (°C)</th><th>Basınç (bar)</th></tr></thead><tbody>
<tr><td>Su (H₂O)</td><td>374</td><td>218 [[K6 s. 26]]</td></tr>
<tr><td>Azot protoksit (N₂O)</td><td>36,5</td><td>71,7 [[K6 s. 26]]</td></tr>
<tr><td>Karbondioksit (CO₂)</td><td>31,1</td><td>73 [[K6 s. 26]]</td></tr>
<tr><td>Oksijen (O₂)</td><td>−119</td><td>50 [[K6 s. 26]]</td></tr>
<tr><td>Ksenon (Xe), kitap değeri*</td><td>−112</td><td>0,8 [[K6 s. 26]]</td></tr></tbody></table>
<aside class="note plain"><b>Atlas notu.</b> *Kitap ksenonun kritik değerlerini −112 °C ve 0,8 bar verir. [[K6 s. 26]] Doğrusu yaklaşık 16,6 °C ve 58,4 bardır. [[K6 s. 26]]</aside>
<details><summary>Tablodan N₂O ve O₂ için nasıl farklı sonuç çıkar?</summary>
<p>İki maddeyi de suyun deniz seviyesindeki erime sıcaklığında, yani 0 °C’de gaz fazından başlayarak düşünün. [[K6 s. 25–27]] Azot protoksit için bu değer kritik sıcaklık olan 36,5 °C’nin altındadır; dolayısıyla sıcaklığı sabit tutup basıncı artırarak sıvılaşma sağlanabilir. [[K6 s. 26–27]]</p>
<p>Oksijen için aynı 0 °C, kritik sıcaklık olan −119 °C’nin üzerindedir; yalnız basıncı artırarak aynı sonucu elde edemezsiniz. [[K6 s. 26–27]] Tablodaki 50 barı her sıcaklıkta sıvı oksijen elde edeceğiniz bir basınç gibi okumayın; o sütundaki değer kritik noktaya aittir. [[K6 s. 26–27]]</p></details>
<details><summary>Diyagram üzerinde üç farklı yol izleyin</summary><ol>
<li><b>Basıncı sabit tutun.</b> Deniz seviyesindeki atmosfer basıncında sıcaklık ekseni boyunca buzdan başlayın; 0 °C katı–sıvı, 100 °C sıvı–gaz sınırını gösterir. [[K6 s. 25]] Bu değerleri başka bir basınçtaki su için kullanmadan önce yeni basınçta sınırın nereden geçtiğine bakın. [[K6 s. 25]]</li>
<li><b>Kaynama sınırını izleyin.</b> Kamp ocağı ile düdüklü tencere örneğinde kaynayan madde yine sudur; değişen, sıvı–gaz dengesinin kurulduğu basınç ve ona karşılık gelen sıcaklıktır. [[K6 s. 25]] Düşük basınç tarafında daha düşük, yüksek basınç tarafında daha yüksek kaynama sıcaklığı okursunuz. [[K6 s. 25]]</li>
<li><b>Sınırın uçlarını bulun.</b> Sıvı–gaz çizgisinin üçlü noktadaki ucunda katı da dengeye katılabilir; kritik uçta ise sıvılaşma için sıcaklık sınırına gelinir. [[K6 s. 25–27]] Üçlü noktayı başka bir maddeye taşımayın: karbondioksitte suya göre sıcaklık daha düşük, gerekli basınç daha yüksektir. [[K6 s. 25–26]]</li>
</ol></details>
</section>
<section class="wrap blk ders-sec" id="fk01-buhar">
<h2>Çaydanlıktan çıkan beyaz bulut</h2>
<p class="intro">Su kaynarken gaz fazına geçer; çaydanlığın ağzına yakın görünmeyen bölgeyle daha ilerideki beyaz bulut farklı fazlardır. [[K6 s. 27]]</p>
${sekil('caydanlik','Gözünüz sıvıyı nerede seçebiliyor?', 'Çıkış ağzından dışarı doğru önce su buharı, sonra yoğuşmuş sıvı damlacıkları bulunur. [[K6 s. 27]]')}
<p><b>Buhar</b>, kritik sıcaklığının altında gaz fazında bulunan maddedir. [[K6 s. 27]] Sıcaklığı düşürmeden basıncı artırmak buharı sıvıya veya katıya dönüştürebilir. [[K6 s. 27]] Kitap CO₂ için tabloda 31,1 °C, buhar örneğinde ise 31,03 °C verir; örnekte CO₂ bu sıcaklığın altındayken buhar olarak adlandırılabilir. [[K6 s. 26–27]]</p>
<p>Gözlemi anlatırken önce nereden baktığınızı belirtin. [[K6 s. 27]] Çaydanlığın ağzı ile beyaz bulut arasındaki saydam bölgeyi boş sanırsanız, sıvının kaynarken geçtiği gaz fazını gözden kaçırırsınız. [[K6 s. 27]] Beyaz bölgeyi doğrudan su buharı diye adlandırırsanız da gazdan sıvıya dönüşü gözden kaçırırsınız. [[K6 s. 27]] Aynı suyu çıkış yönünde izlemek bu iki fazı birbirinden ayırır. [[K6 s. 27]]</p>
<details><summary>Gaz fazındaki bir örnek yalnız basınçla sıvılaştırılabilir mi?</summary><p>Önce hangi maddeye baktığınızı belirleyin; kritik sıcaklık su, karbondioksit, azot protoksit ve oksijen için farklıdır. [[K6 s. 26]] Ardından örneğin sıcaklığını o maddenin kritik sıcaklığı ile karşılaştırın. [[K6 s. 27]]</p><p>Kritik sıcaklığın altındaki bir gaz için “buhar” diyebilirsiniz; burada sıcaklığı sabit tutarak basıncı artırmak bir hâl değişimi sağlayabilir. [[K6 s. 27]] Kritik sıcaklığın üstünde ise basıncı artırmakla sıvı elde edemezsiniz. [[K6 s. 27]] Çaydanlık resminde beyaz bulutu işaretlediğinizde bu sorunun başlangıç koşulu değişir: işaretlediğiniz şey zaten sıvıdır. [[K6 s. 27]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk01-p1"><h2>Part I · Doğru mu, yanlış mı?</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div data-viz="mtf" data-q="fk01-1"></div><div data-viz="mtf" data-q="fk01-2"></div><div data-viz="mtf" data-q="fk01-3"></div></section>
<section class="wrap blk ders-sec" id="fk01-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><h3>Klinik ölçüm ve ekipman</h3><p>Bir hastayı soğutmak için eşit kütlede, 0 °C’de su ve erimekte olan buz var. [[K6 s. 24]] Hangisini seçersiniz? Termometrenin gösterdiği sıcaklık, hastadan çekilen ısıyı tek başına açıklar mı?</p></div>
<ol class="iskelet">
<li><b>Seçim.</b> Eşit kütle ve başlangıç sıcaklığında eriyen buz daha etkili soğutur. [[K6 s. 24]]</li>
<li><b>Enerji yolu.</b> Buzun erimesine gereken enerji hastadan gelir. [[K6 s. 24]]</li>
<li><b>Ölçüm.</b> Erime bitmeden sıcaklık yükselmez; sabit termometre okuması ısı aktarımıyla bağdaşır. [[K6 s. 23–24]]</li>
<li><b>Nicelik.</b> Birim kütle başına erime enerjisi <i>L</i><sub>f</sub> ile gösterilir ve J·kg⁻¹ olarak verilir. [[K6 s. 24–25]]</li>
<li><b>Plato sonrası.</b> Sıvının sıcaklık artışı kütleye, aldığı enerjiye ve özgül ısı kapasitesine bağlıdır. [[K6 s. 23]]</li></ol>
<p class="note"><b>Çizin.</b> Yatay eksene eklenen ısıyı, düşey eksene sıcaklığı yerleştirin; buzu ısıtırken 0 °C’deki erime platosunu ve sıvı suyun ısınmasını işaretleyin. [[K6 s. 23–25]]</p>
<p><b>Ek sorular.</b> Buharlaşma ve yoğuşmada enerji hangi yönde aktarılır? Düdüklü tencerede kaynama sıcaklığı neden yükselir? Kritik nokta ile üçlü noktayı diyagramda nasıl ayırırsınız?</p></section>
<section class="wrap blk ders-sec" id="fk01-ozet"><h2>Özet</h2><ul class="ozet">
<li>Proton sayısı elementin kimliğini, proton ve nötron toplamı kütle numarasını verir. [[K6 s. 19–20]]</li>
<li>Bohr modelinde elektronun geçebileceği enerji düzeyleri belirlidir. [[K6 s. 21]]</li>
<li>Elektron paylaşımı kovalent bağa, elektron aktarımıyla oluşan karşıt yüklerin çekimi iyonik bağa yol açar. [[K6 s. 21]]</li>
<li>Isınmayı özgül ısı kapasitesi, sabit sıcaklıktaki hâl değişimini gizli ısı açıklar. [[K6 s. 23–25]]</li>
<li>Üçlü noktada üç faz bir aradadır; kritik sıcaklığın üzerinde basınç artışı tek başına sıvılaşma sağlayamaz. [[K6 s. 27–28]]</li>
<li>Çaydanlıktan yükselen beyaz bulutta görülen, gaz hâlindeki suyun yoğuşmasıyla oluşmuş damlacıklardır. [[K6 s. 27]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="01"></div>
<nav class="ders-gec"><a href="#/dersler/fizik">← İçindekiler</a><a href="#/dersler/fizik/02">Sonraki: Basit mekanik: kuvvet, basınç, viskozite ve yüzey gerilimi →</a></nav></section>`,
  };
})();
