VERI.sorular = VERI.sorular || {};
VERI.sorular['fk15b-1'] = {
  no: 1, kok: 'Beer yasası ve hemoglobin spektrumları', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 268–270]]',
  onermeler: [
    { t: 'Boya derişimi sabitken geçen ışık şiddeti optik yol boyunca doğrusal azalır.', d: false, n: 'Geçen ışık şiddeti mesafeyle üstel olarak azalır. [[K6 s. 268]]' },
    { t: 'Dalga boyu ve optik yol sabitken absorbans derişimle doğru orantılıdır.', d: true, n: 'Beer yasasına göre bu koşullarda derişim iki katına çıkarsa absorbans da iki katına çıkar. [[K6 s. 268–269]]' },
    { t: '805 nm’de oksihemoglobin ve deoksihemoglobinin molar sönüm katsayıları eşittir.', d: true, n: '805 nm bu iki türün izosbestik dalga boyudur. [[K6 s. 269]]' },
    { t: '670 nm dolayında oksihemoglobin kırmızı ışığı deoksihemoglobinden daha güçlü soğurur.', d: false, n: 'Bu bölgede deoksihemoglobinin molar sönüm katsayısı daha büyüktür. [[K6 s. 269]]' },
    { t: 'Bir maddenin molar sönüm katsayısı dalga boyundan bağımsızdır.', d: false, n: 'Katsayının dalga boyuyla değişimi maddenin soğurma spektrumunu oluşturur. [[K6 s. 268–269]]' },
  ],
};
VERI.sorular['fk15b-2'] = {
  no: 2, kok: 'Puls oksimetrede sinyalin kaynağı ve yorumlanması', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 270–271]]',
  onermeler: [
    { t: 'Parmak probu tipik olarak kırmızı ve kızılötesi ışık kullanır.', d: true, n: 'Tipik bantlar 650–670 nm ve 940–960 nm’dir. [[K6 s. 270]]' },
    { t: 'Sistolde kanla dolu arterlerden geçen optik yol kısalır.', d: false, n: 'Sistolde arter ve arteriyollerde kan miktarı arttığından optik yol uzar. [[K6 s. 271]]' },
    { t: 'Pleth dalgası geçen ışık şiddetinin zamanla değişen bileşenini gösterir.', d: true, n: 'Kalp döngüsü boyunca değişen iletilmiş ışık sinyali fotopletismogramı oluşturur. [[K6 s. 271]]' },
    { t: 'Duman inhalasyonundan sonra yüksek karboksihemoglobin, normal görünen bir SpO₂ değerine yol açabilir.', d: true, n: 'Gerçek satürasyon kritik düzeyde düşükken puls oksimetre yüksek okuyabilir. [[K6 s. 271]]' },
    { t: 'Hipotermide periferik perfüzyonun azalması ölçüm güvenilirliğini etkileyebilir.', d: true, n: 'Hipotermiye eşlik eden yetersiz periferik perfüzyon hata kaynakları arasındadır. [[K6 s. 271]]' },
  ],
};
VERI.sorular['fk15b-3'] = {
  no: 3, kok: 'Serebral NIRS ve CO-oksimetri', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 271–273]]',
  onermeler: [
    { t: 'Serebral NIRS dedektörleri ışık kaynağının karşısında, başın öbür tarafındadır.', d: false, n: 'Her iki dedektör alındaki kaynağa birkaç santimetre uzaklıktan geri saçılan ışığı algılar. [[K6 s. 272]]' },
    { t: 'Bölgesel serebral satürasyona venöz kan da katkı verir.', d: true, n: 'Ölçüm probun altındaki arteriyel ve venöz kanın katkılarını içerir. [[K6 s. 272]]' },
    { t: 'CO-oksimetrede örnek küvette ultrasonla hemolize edilir.', d: true, n: 'Eritrosit içeriği plazmaya karışınca optik olarak berrak bir çözelti elde edilir. [[K6 s. 273]]' },
    { t: 'CO-oksimetre oksijen satürasyonunu sürekli izler.', d: false, n: 'Kan örneği gerektirdiğinden ölçüm örnek alındığı zamanı temsil eder. [[K6 s. 273]]' },
    { t: 'Bazı CO-oksimetreler bilirubin derişimini de ölçebilir.', d: true, n: 'Bilirubin ölçümü bazı cihazlarda bulunur. [[K6 s. 273]]' },
  ],
};

SAYFALAR['dersler/fizik/15b'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 15 · Ders 15b',
  baslik: 'Beer yasası, hemoglobin spektrumları, puls oksimetri, NIRS ve CO-oksimetri',
  lede: 'Parmak probu arteriyel nabzı, alındaki prob dokudan geri saçılan ışığı, CO-oksimetre ise kan örneğinden geçen ışığı kullanır. [[K6 s. 270–273]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${[['beer','Beer yasası'],['spektrum','Hb spektrumları'],['prob','Parmak probu'],['nabiz','Pleth ve hatalar'],['nirs','NIRS'],['co','CO-oksimetri'],['p1','Part I'],['p2','Part II'],['ozet','Özet']].map(([id,ad],i) => `<button type="button" data-scroll="fk15b-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk15b-beer">
<h2>Beer yasası: ışığın ne kadarı geçer?</h2>
<p class="intro">Beer (Beer–Lambert) yasasına göre tek dalga boylu ışık bir boya çözeltisinde ilerlerken, katettiği mesafe arttıkça şiddeti üstel olarak azalır. [[K6 s. 268]]</p>
<div class="viz"><div class="viz-head"><h3>Optik kalınlığı değiştirin</h3></div><div data-viz="fk15b_beer"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Yatay eksen derişim, yol uzunluğu ve molar sönüm katsayısının çarpımıdır. [[K6 s. 268]] Nokta, bu çarpım için denklemden hesaplanan geçen ışık payını gösterir. [[K6 s. 268]]</p></div>
<div class="fk15b-kartlar"><div class="card"><h3>Geçen ışık</h3><p class="fk15b-formul"><i>I</i><sub>1</sub> = <i>I</i><sub>0</sub> e<sup>−εcd</sup> [[K6 s. 268]]</p><p>Çözeltiye giren ışığın şiddeti <i>I</i><sub>0</sub>, çıkanınki <i>I</i><sub>1</sub>’dir. [[K6 s. 268]] İki şiddet aynı birimle ifade edildiğinde oranları geçen ışık payını verir. [[K6 s. 268]] Soğurulan kısım ısıya dönüşür. [[K6 s. 268]]</p></div>
<div class="card"><h3>Absorbans</h3><p class="fk15b-formul"><i>A</i> = ε<i>c</i><i>d</i> [[K6 s. 269]]</p><p>Absorbans, çözeltinin ışığı ne ölçüde soğurduğunu belirten boyutsuz büyüklüktür. [[K6 s. 269]] Dalga boyu ve yol uzunluğu sabitken derişim ikiye katlandığında absorbans da ikiye katlanır. [[K6 s. 268–269]]</p></div></div>
<ul class="ozet"><li><b>ε, molar sönüm katsayısı</b> (L·mol<sup>−1</sup>·cm<sup>−1</sup>), maddenin seçilen dalga boyunda ışığı ne kadar güçlü soğurduğunu gösterir. [[K6 s. 268]] Yeşil boya kırmızı ışığı yeşilden çok daha güçlü soğurur. [[K6 s. 268]] ε dalga boyuyla değiştiği için absorbans da değişir. [[K6 s. 269]]</li>
<li><b><i>c</i>, boya derişimi</b> (mol·L<sup>−1</sup>) arttığında aynı kalınlıktaki çözeltiden daha az ışık geçer. [[K6 s. 268]]</li>
<li><b><i>d</i>, optik yol uzunluğu</b> için geleneksel birim santimetredir. [[K6 s. 268]] Aynı çözeltide ışığın izleyeceği yol uzarsa dedektöre ulaşan ışık azalır. [[K6 s. 268]]</li></ul>
<div class="card"><h3>Hesap kartı · Yol iki katına çıkarsa</h3><p>Kaydırıcıda ε<i>c</i><i>d</i> = 1 seçildiğinde gelen ışığın e<sup>−1</sup> ≈ 0,368’i geçer. [[K6 s. 268]] Aynı çözeltide yolu iki katına çıkarırsanız optik kalınlık 2 olur ve geçen pay e<sup>−2</sup> ≈ 0,135’e düşer. [[K6 s. 268]] İkinci yol parçası kendisine ulaşan ışığın yine aynı payını geçirdiği için iki pay çarpılır. [[K6 s. 268]]</p></div>
<p>Kırmızı şarabın koyuluğu tanenlerin ve diğer renkli bileşiklerin görünür ışığı güçlü biçimde soğurmasından gelir. [[K6 s. 268]] Kırmızı ışık öteki renklere göre daha az soğurulduğu için göze ulaşır. [[K6 s. 268]] Görünür ışıkta melanin ve hemoglobinin absorbansı da su ve yağınkinden yüksektir. [[K6 s. 269]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap geçirgenliği e tabanıyla yazar. [[K6 s. 268–269]] Onluk absorbans için <i>A</i><sub>10</sub> = log<sub>10</sub>(<i>I</i><sub>0</sub>/<i>I</i><sub>1</sub>) alınır ve e tabanlı katsayı onluk katsayının ln(10) katıdır. [[K6 s. 268–269]]</div>
</section>

<section class="wrap blk ders-sec" id="fk15b-spektrum">
<h2>Hemoglobini hangi dalga boyunda ayırt edebiliriz?</h2>
<p class="intro">Oksihemoglobin ile deoksihemoglobinin soğurma spektrumları kırmızıdan yakın kızılötesine geçerken 805 nm’de kesişir. [[K6 s. 269–270]]</p>
<div class="viz"><div class="viz-head"><h3>İzosbestik noktanın iki yanını karşılaştırın</h3></div><div data-viz="fk15b_spektrum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Düz çizgi deoksihemoglobini, kesikli çizgi oksihemoglobini, gölgeli bantlar puls oksimetrenin tipik ölçüm aralıklarını gösterir. [[K6 s. 269–270]] Çizgiler yalnız soğurma sırasını ve kesişmeyi gösteren nitel bir şemadır. [[K6 s. 269–270]]</p></div>
<p>Bir soğurma spektrumunda yatay eksen dalga boyu, dikey eksen absorbans veya molar sönüm katsayısıdır. [[K6 s. 269]] Spektroskopi bu örüntüden bileşiğin kimliğini ve derişimini belirlemeye yarar. [[K6 s. 269]] Ölçümü morötesi veya kızılötesi bölgeye genişletmek bileşik hakkında ek bilgi verebilir. [[K6 s. 269]]</p>
<ul class="ozet"><li><b>Yaklaşık 670 nm.</b> Kırmızı bölgede deoksihemoglobinin molar sönüm katsayısı oksihemoglobininkinden çok daha büyüktür. [[K6 s. 269]]</li>
<li><b>805 nm.</b> Eşit derişim ve optik yolda iki türün absorbansı eşittir. [[K6 s. 269]] Bu dalga boyuna izosbestik dalga boyu denir. [[K6 s. 269]]</li>
<li><b>805 nm’den 1000 nm’ye doğru.</b> Kesişme geçildikten sonra deoksihemoglobin ışığı daha fazla geçirir. [[K6 s. 269]]</li></ul>
<p>Şemayı önce 805 nm’de okuyun: tek başına bu noktadaki ölçüm, aynı derişimdeki iki hemoglobin türünü ayırt ettirmez. [[K6 s. 269]] Sonra kaydırıcıyı iki gölgeli banda sırayla götürün: birinde deoksihemoglobin daha çok ışık tutarken diğerinde oksihemoglobin daha çok ışık tutar. [[K6 s. 269–270]]</p>
<p>Arter kanının oksijen satürasyonu daha yüksektir ve oksihemoglobin baskındır. [[K6 s. 269–270]] İki hemoglobin türünün spektrumları farklı olduğundan arter ve ven kanı farklı renkte görünür. [[K6 s. 269–270]]</p>
</section>

<section class="wrap blk ders-sec" id="fk15b-prob">
<h2>Parmak probundan arteriyel satürasyona</h2>
<p class="intro">Puls oksimetre, parmak veya kulak memesinden geçen ışığı kullanarak arteriyel oksijen satürasyonunu sürekli ve girişimsiz olarak tahmin eder. [[K6 s. 270]]</p>
<div class="viz"><div class="viz-head"><h3>Parmakta ışığın izlediği yol</h3></div><div data-viz="fk15b_prob"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Probun ışık kaynağı parmağı aydınlatır, karşı yüzündeki dedektör dokudan geçen ışığı algılar. [[K6 s. 270–271]] Monitör tahmini oksijen satürasyonunu (SpO<sub>2</sub>) ve kalp hızı gibi ek bilgileri gösterir. [[K6 s. 270]]</p>
<p>Cihazın kullandığı iki bant tipik olarak görünür kırmızıda <b>650–670 nm</b>, kızılötesinde <b>940–960 nm</b> aralığındadır. [[K6 s. 270]] Her iki bantta da oksihemoglobin ile deoksihemoglobinin sönüm katsayıları belirgin biçimde farklıdır. [[K6 s. 270]] Cihaz iki dalga boyundaki soğurmanın oranından arteriyel satürasyonu tahmin eder. [[K6 s. 270]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap hesabı iki dalga boyundaki soğurmanın oranı olarak özetler. [[K6 s. 270]] Geleneksel cihaz her kanalda önce pulsatil bileşeni o kanalın sabit bileşenine oranlar, sonra bu iki oranı karşılaştırır. [[K6 s. 270–271]]</div>
<p>Kitap puls oksimetrenin icadını 1971’e tarihler ve anestezi hazırlık odalarında, ameliyathanelerde, yoğun bakım ünitelerinde ve ambulanslarda standart donanım hâline geldiğini belirtir. [[K6 s. 270]]</p></section>

<section class="wrap blk ders-sec" id="fk15b-nabiz">
<h2>Pleth dalgasını hangi kan oluşturur?</h2>
<p class="intro">Arteriyel pulsasyon, arter kanının değişken optik sinyalini dokudaki diğer soğurucuların katkısından ayırmaya yarar. [[K6 s. 271]]</p>
<div class="viz"><div class="viz-head"><h3>Sistol ile diyastolü karşılaştırın</h3></div><div data-viz="fk15b_nabiz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çift uçlu ok kan içindeki optik yolu, çubuk dedektöre ulaşan ışığın göreli şiddetini gösterir. [[K6 s. 271]] Çap ve çubuk uzunlukları şematiktir. [[K6 s. 271]]</p></div>
<p>Sistolde arter ve arteriyollerde diyastole göre daha çok kan bulunur. [[K6 s. 271]] Kanla dolu optik yolun uzaması doku absorbansını artırır. [[K6 s. 271]] Bu değişim her kalp döngüsünde yinelenir ve iletilen ışık şiddetinin zamanla değişen bileşeni fotopletismogramı (<i>pleth</i> dalgasını) oluşturur. [[K6 s. 271]]</p>
<p>Şekilde kaynağın ve dedektörün yerini sabit düşünün. Değişen uzaklık probun iki ucu arasındaki mesafe değil, ışığın arter kanı içinde aldığı yoldur. [[K6 s. 270–271]] Bu yüzden sistolde doku absorbansı artarken dedektöre ulaşan ışığın şiddeti ters yönde değişir. [[K6 s. 271]]</p>
<h3>Ölçümü ne yanıltır?</h3>
<ul class="ozet"><li><b>Disfonksiyonel hemoglobin.</b> Duman inhalasyonundan sonra karboksihemoglobin sıklıkla yükselir. [[K6 s. 271]] Yeterince yüksekse gerçek satürasyon kritik derecede düşükken puls oksimetre normal bir değer gösterebilir. [[K6 s. 271]]</li>
<li><b>Hareket.</b> Ekstremitenin aşırı hareketi ölçümü bozabilir. [[K6 s. 271]]</li>
<li><b>Zayıf periferik perfüzyon.</b> Hipovolemi, hipotermi veya düşük kalp debisinde okunan değer güvenilirliğini yitirebilir. [[K6 s. 271]]</li></ul>
<p>Bazı yeni cihazlar daha fazla dalga boyuyla karboksihemoglobinin soğurmasını diğer hemoglobin türlerininkinden ayırır. [[K6 s. 271]] Gelişmiş algoritmalar hareketin ve düşük perfüzyonun ölçüme etkisini düzeltmek için kullanılır. [[K6 s. 271]]</p></section>

<section class="wrap blk ders-sec" id="fk15b-nirs">
<h2>NIRS: korteksten geri saçılan ışık</h2>
<p class="intro">Transkraniyal yakın kızılötesi spektroskopi (NIRS), alından gönderilip beyin dokusundan aynı yüzeye geri saçılan ışığı ölçer. [[K6 s. 272]]</p>
<div class="viz"><div class="viz-head"><h3>Bir kaynak ve iki dedektör</h3></div><div data-viz="fk15b_nirs"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="fk15b-kartlar"><div class="card"><h3>Neden karşıdan ölçülmez?</h3><p>Baş, parmak probundaki gibi bir yandan aydınlatılıp karşı yandan ölçülemeyecek kadar büyüktür. [[K6 s. 271]] Soğurma ve saçılma nedeniyle görünür ışık dokuda yaklaşık 1 cm’nin ötesine büyük ölçüde geçemez, özellikle kemik ışığı kötü iletir. [[K6 s. 271]]</p></div>
<div class="card"><h3>Neden bu dalga boyları?</h3><p>Dokuda en bol bulunan bileşen olan su, 1000 nm’nin üzerindeki ışığı güçlü biçimde soğurur. [[K6 s. 271]] Görünür kırmızı ile yakın kızılötesi arasındaki 650–1000 nm penceresinde fotonlar serebral kortekse ulaşabilecek kadar derine ilerleyebilir. [[K6 s. 271–272]]</p></div></div>
<p>Alındaki kaynaktan birkaç santimetre uzakta, deri üzerindeki iki dedektör geri saçılan ışığı toplar. [[K6 s. 272]] Cihaz her dalga boyunda saptanan göreli şiddetten probun altındaki kanın oksijen satürasyonunu hesaplar. [[K6 s. 272]] Arteriyel ve venöz kan birlikte sinyal verdiğinden sonuç, o bölgenin arteriyel ve venöz satürasyonları arasında yer alır. [[K6 s. 272]]</p>
<ul class="ozet"><li><b>Ölçüm alanı.</b> NIRS beyin veya kas dokusundaki kanın oksijen satürasyonunu ölçebilir, en sık kullanım alanı serebral satürasyon izlemesidir. [[K6 s. 272]] Kan hacmi, serebral kan akımı ve oksijen tüketimindeki değişimleri tahmin etmek için de kullanılabilir. [[K6 s. 272]]</li>
<li><b>Klinik kullanım.</b> Nöroşirürji ve kafa travması hastalarının izleminde yer edinmiştir, prematüre yenidoğanlarda serebral hipoksinin yararlı bir göstergesidir. [[K6 s. 272]]</li>
<li><b>İzlem ortamı.</b> Erişkin ve bebek yoğun bakımında yıllardır kullanılan NIRS, kitapta standart izleme yöntemleri arasına girmekte olan bir teknik olarak tanımlanır. [[K6 s. 272]] Büyük cerrahi girişimlerde de izlem için yararlı bulunmuştur. [[K6 s. 272]]</li></ul></section>

<section class="wrap blk ders-sec" id="fk15b-co">
<h2>CO-oksimetri: kan örneğinde hemoglobin türleri</h2>
<p class="intro">CO-oksimetre (hemoksimetre), kan örneğini çok sayıda dalga boyunda ölçerek farklı soğurma spektrumlarına sahip hemoglobin türlerini ayırt eder. [[K6 s. 273]]</p>
<div class="viz"><div class="viz-head"><h3>Giriş portundan analiz raporuna</h3></div><div data-viz="fk15b_co"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>CO-oksimetre bağımsız bir cihaz olabilir veya kan gazı analizörüne entegre edilebilir. [[K6 s. 273]] Yüksek doğruluğu ve hemoglobin türlerini ayırt edebilmesi nedeniyle oksijen satürasyonu ölçümünde altın standart kabul edilir. [[K6 s. 273]] Karboksihemoglobinemi ve puls oksimetrenin hatalı okuyabileceği diğer durumlarda kullanılır. [[K6 s. 273]]</p>
<ol class="iskelet"><li><b>Örneği hazırlama.</b> Giriş portuna verilen 100 µL heparinli kan küvete aktarılır. [[K6 s. 273]] Ultrason eritrosit zarlarını parçalar, hücre içeriği plazmayla karışır ve optik olarak berrak bir çözelti oluşur. [[K6 s. 273]]</li>
<li><b>Işığı ayırma.</b> Halojen lamba küveti aydınlatır ve optik lif geçen ışığı spektrometreye iletir. [[K6 s. 273]] Kırınım ağı ışığı görünür ve yakın kızılötesi dalga boylarına ayırır. [[K6 s. 273]]</li>
<li><b>Sonucu hesaplama.</b> Fotodedektör dizisi her dalga boyunun şiddetini ölçer, bilgisayar bu değerlerden hemoglobin türlerinin derişimlerini hesaplar. [[K6 s. 273]]</li></ol>
<p>Spektrometrede iki işlevi ayırt edin: kırınım ağı ışığı dalga boylarına ayırır, şiddet ölçümlerini ise ağdan sonra gelen fotodedektör dizisi yapar. [[K6 s. 273]] Böylece bilgisayara tek bir toplam ışık şiddeti yerine farklı dalga boylarında ölçülmüş bir dizi değer ulaşır. [[K6 s. 273]]</p>
<p>Raporda toplam hemoglobin derişimi ve oksijen satürasyonunun yanında deoksihemoglobin, oksihemoglobin, karboksihemoglobin, methemoglobin ve diğer disfonksiyonel hemoglobinlerin ayrı derişimleri bulunur. [[K6 s. 273]] Bazı cihazlar bilirubin derişimini de ölçebilir. [[K6 s. 273]] Kan örneği gerektiğinden sonuç tek bir örneği temsil eder ve sürekli izlem sağlamaz. [[K6 s. 273]]</p>
<h3>Hangi sonuç hangi kanı temsil eder?</h3><div class="fk15b-kartlar">
<div class="card"><h4>Parmakta · arter kanı</h4><p>Her kalp döngüsünde değişen sinyal, arteriyel satürasyonu sürekli izlemeyi sağlar. [[K6 s. 270–271]] Duman solumuş bir hastada sayının normal görünmesi, karboksihemoglobinin ölçüme etkisi nedeniyle güven vermez. [[K6 s. 271]]</p></div>
<div class="card"><h4>Alında · bölgesel kan</h4><p>Ölçülen değer probun altındaki beyin dokusuna aittir. [[K6 s. 272]] Venöz kan da geri saçılan ışığa katkı verdiği için bu değeri yalnız arteriyel satürasyon olarak okumak hatalıdır. [[K6 s. 272]]</p></div>
<div class="card"><h4>Küvette · alınan örnek</h4><p>Çok sayıda dalga boyundan elde edilen sonuç, örnekte ne kadar karboksihemoglobin bulunduğunu da gösterir. [[K6 s. 273]] Bu yüzden karboksihemoglobinemide ve puls oksimetrenin yanılabileceği durumlarda tercih edilir. [[K6 s. 273]]</p></div></div></section>

<section class="wrap blk ders-sec" id="fk15b-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk15b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk15b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk15b-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk15b-p2"><h2>Part II · SOE 2 · Klinik ölçüm ve ekipman</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Duman solumuş bir hastada parmak probu normal SpO₂ gösteriyor. Prob bu değeri nasıl elde eder? Sonucu nasıl yorumlar, ölçümü hangi cihazla doğrularsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Kırmızı ve kızılötesi bantlarda iki hemoglobin türünün molar sönüm katsayıları farklıdır. [[K6 s. 269–270]]</li>
<li>Prob arteriyel pulsasyonu kullanarak iki dalga boyundaki soğurmadan SpO₂ tahmini yapar. [[K6 s. 270–271]]</li>
<li>Karboksihemoglobinin yükselmesi gerçek satürasyon kritik derecede düşükken bile normal bir okumaya yol açabilir. [[K6 s. 271]]</li>
<li>CO-oksimetre 100 µL heparinli kanı hemolize eder, çok sayıda dalga boyunda inceleyerek satürasyonu ve karboksihemoglobin dahil türlerin derişimlerini verir. [[K6 s. 273]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Parmakta kaynağı ve karşısındaki dedektörü çizin, kırmızı ve kızılötesi bantları belirtin. [[K6 s. 270–271]] Yanına iki hemoglobinin nitel spektrumunu çizip 805 nm’deki kesişmeyi işaretleyin. [[K6 s. 269–270]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Hipotermi parmak probunu neden yanıltabilir? [[K6 s. 271]] Alın probunda dedektörler nerede bulunur ve hangi kan bölmeleri sonuca katkı verir? [[K6 s. 272]] CO-oksimetrede küvetten çıkan ışık dedektör dizisine nasıl ulaşır? [[K6 s. 273]]</div></div></section>
<section class="wrap blk ders-sec" id="fk15b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Beer yasasında absorbans derişimle doğrusal artar, geçen ışık şiddeti optik yol boyunca üstel azalır. [[K6 s. 268–269]]</li>
<li>805 nm’de iki hemoglobin türünün soğurması eşitlenir, puls oksimetre ölçüm bantlarını bu kesişmenin iki yanından seçer. [[K6 s. 269–270]]</li>
<li>Nabız arteriyel sinyali ayırır, yüksek karboksihemoglobin ise yanıltıcı biçimde normal SpO₂ verebilir. [[K6 s. 271]]</li>
<li>NIRS probun altındaki arteriyel ve venöz kanın ortak katkısını ölçer. [[K6 s. 272]]</li>
<li>Üç yöntem hemoglobinin dalga boyuna bağlı soğurmasından yararlanır. [[K6 s. 274]] CO-oksimetre tek bir kan örneğinde farklı hemoglobin türlerini ayrı ayrı ölçer. [[K6 s. 273]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="15b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/15a">← Kırılma, optik lifler ve fiberoptik endoskoplar</a><a href="#/dersler/fizik/16">Sonraki: Kan akımı ölçümü: indikatör dilüsyonu, termodilüsyon ve Doppler →</a></nav></section>`,
};
