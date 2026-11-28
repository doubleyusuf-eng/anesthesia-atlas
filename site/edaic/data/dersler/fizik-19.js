VERI.sorular = VERI.sorular || {};
VERI.sorular['fk19-1'] = {
  no: 1, kok: 'Manyetik alanlar, manyetik malzemeler ve indüksiyon', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 315–319]]',
  onermeler: [
    { t: 'Manyetik bir kuzey kutbu, güney kutbu olmadan tek başına bulunabilir.', d: false, n: 'Elektrik yükleri tek başına bulunabilirken manyetik alanlar iki kutupludur; kuzey kutbu eşlik eden güney kutbu olmadan var olamaz. [[K6 s. 315]]' },
    { t: 'Akım taşıyan bir tel, çevresinde akış yönüne dik ve silindir biçimli bir manyetik alan oluşturur.', d: true, n: 'Ørsted’in 1820 gözlemi, teldeki akımın hareket yönüne dik dairesel/silindirik bir manyetik alan doğurduğunu gösterdi. [[K6 s. 316]]' },
    { t: 'Demir, nikel ve kobalt ferromanyetik malzemelere örnektir.', d: true, n: 'Yalnızca birkaç element ferromanyetiktir; bunlar arasında demir, nikel ve kobalt yer alır. [[K6 s. 317–318]]' },
    { t: 'Oksijen ve süperiletkenlerin ikisi de manyetik alanlarca itilen diyamanyetik maddelerdir.', d: false, n: 'Süperiletkenler diyamanyetikken oksijen eşleşmemiş elektronları nedeniyle zayıfça çekilen paramanyetik bir maddedir. [[K6 s. 318]]' },
    { t: 'Elektrik motorunun mili dışarıdan döndürülürse bobinlerinde elektrik akımı indüklenir.', d: true, n: 'Dinamo ile elektrik motoru aynı yapıdadır; motorun mili döndürüldüğünde ters yönde çalışarak akım üretir. [[K6 s. 319]]' },
  ],
};
VERI.sorular['fk19-2'] = {
  no: 2, kok: 'Alternatif akım, RMS ve transformatörler', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 320–324]]',
  onermeler: [
    { t: 'Bir doğrultucunun AC’yi DC’ye çevirmesi sırasında enerjinin bir bölümü ısıya dönüşebilir.', d: true, n: 'AC–DC dönüşümü verimsizdir; enerji kaybı dizüstü bilgisayar adaptörlerinin ısınmasında açıkça hissedilir. [[K6 s. 320]]' },
    { t: 'Birleşik Krallık şebekesinin 240 V RMS değeri için tepe gerilimi yaklaşık 339,4 V’tur.', d: true, n: 'RMS değeri 0,707 × tepe gerilimine eşittir; buradan tepe gerilimi 240 × √2 ≈ 339,4 V bulunur. [[K6 s. 321]]' },
    { t: 'Alternatif akım devrelerinde güç hesabında direnç yerine indüktans ve kapasitansı da içeren empedans (Z) kullanılır.', d: true, n: 'Empedans, devrenin alternatif akıma karşı koymasını ifade eder ve devrenin indüktansı ile kapasitansını da hesaba katar. [[K6 s. 321–322]]' },
    { t: 'Transformatörler sabit doğru akım (DC) uygulandığında da sekonder sargıda sürekli gerilim indükler.', d: false, n: 'Transformatörlerin ikinci bobinde akım indüklemesi için manyetik alanın sürekli değişmesi gerekir; bu yüzden AC’ye dayanırlar. [[K6 s. 322]]' },
    { t: 'Yükseltici transformatörde gerilim yükselirken enerji korunumu gereği akım düşer.', d: true, n: 'Sekonderden alınan güç primerden büyük olamayacağı için gerilimin yükseltilmesi akımın düşürülmesiyle sonuçlanır. [[K6 s. 323]]' },
  ],
};
VERI.sorular['fk19-3'] = {
  no: 3, kok: 'Yüksek gerilimli iletim ve şebeke fiş güvenliği', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 324–327]]',
  onermeler: [
    { t: 'Elektrik iletim hatlarında gerilimin yaklaşık 400 000 V’a çıkarılması kablodaki ısı kaybını artırır.', d: false, n: 'Aynı güç daha düşük akımla taşındığından kablonun I²R direnç ısı kaybı azalır ve daha ince kablolar kullanılabilir. [[K6 s. 324]]' },
    { t: 'İnsan dokusu 50 Hz frekansa duyarsızdır; ventriküler fibrilasyon için yalnızca kilohertz frekansları etkilidir.', d: false, n: 'İnsan dokusu 40–150 Hz aralığına en duyarlıdır ve 50 Hz ventriküler fibrilasyon oluşturmak için optimaldir. [[K6 s. 325]]' },
    { t: 'BS 1363 tipi üç pimli Birleşik Krallık şebeke fişinin içinde dahili sigorta bulunur.', d: true, n: 'BS 1363 fişleri priz kapaklarına ek olarak fiş gövdesinin içinde sigorta taşır. [[K6 s. 325]]' },
    { t: 'Üç telli şebeke fişinde kahverengi canlı, mavi nötr, sarı-yeşil ise toprak telidir.', d: true, n: 'BK fişlerinde kahverengi etkin canlı, mavi dönüş nötr ve sarı-yeşil güvenlik toprak telidir. [[K6 s. 326–327]]' },
    { t: 'Nötr teli yalnızca bina dışındaki yerel toprak kazığına bağlanır ve devreden dönen akımı taşımaz.', d: false, n: 'Yerel toprak kazığına genellikle bağlanan toprak telidir; nötr teli akımın cihazdan trafo merkezine dönüş yolunu tamamlar. [[K6 s. 326–327]]' },
  ],
};

(function () {
  const nav = [
    ['pusula', 'Tel ve pusula'], ['alan', 'Akı ve malzeme'], ['motor', 'Motor ve dinamo'], ['ac', 'Alternatif akım'], ['rms', 'RMS ve güç'],
    ['trafo', 'Transformatör'], ['iletim', 'Yüksek gerilim'], ['sebeke', 'Şebeke ve fiş'],
    ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  function sekil(ad, baslik, alt) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk19_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  }
  SAYFALAR['dersler/fizik/19'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 19', baslik: 'Elektromanyetizma, alternatif akım ve transformatörler',
    lede: 'Hareketli elektrik yükü manyetik alan doğurur; değişen manyetik alan da iletkende akım indükler. [[K6 s. 315–319]] Bu iki yönlü ilişki elektrik motorunu, dinamoyu, transformatörü ve hastaneye ulaşan AC şebekeyi mümkün kılar. [[K6 s. 319–325]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk19-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk19-pusula">
<h2>Bir tel pusula iğnesini nasıl saptırır?</h2>
<p class="intro">Bir iletkenden geçen yüklerin oluşturduğu manyetik alanı, yakındaki bir pusula iğnesinin yön değiştirmesinden anlayabiliriz. [[K6 s. 316]]</p>
${sekil('pusula', 'Ørsted’in gözlemi', 'Devreyi kapatıp açın ve telin yakınındaki iğneyi izleyin. Yönler ve sapma açısı şematiktir. [[K6 s. 316]]')}
<p>Pusulanın iğnesi, bir destek üzerinde serbestçe dönebilen hafif bir mıknatıstır. [[K6 s. 315–316]] Yakındaki devreden akım geçmezken iğnenin kuzey ucu Dünya’nın manyetik kuzeyini gösterir. [[K6 s. 316]] Ørsted, 1820’de ders için düzeneğini hazırlarken devreyi kapattığında iğnenin bu doğrultudan ayrıldığını gördü. [[K6 s. 316]]</p>
<p>Telin uzun eksenine dik bir kesit düşünün. [[K6 s. 316]] Akım geçerken bu kesitte alan çizgileri telin çevresini halkalar hâlinde sarar. [[K6 s. 316]] Tel boyunca bu kesitleri art arda düşündüğünüzde alanın neden silindirik diye tanımlandığı anlaşılır. [[K6 s. 316]]</p>
<p>Faraday 1831’de ilişkinin diğer yönünü gösterdi. [[K6 s. 316]] Ørsted’in deneyinde akımı verip manyetik etkiyi gözlersiniz. [[K6 s. 316]] Faraday’ın deneyinde ise iletkeni manyetik alan içinde hareket ettirip ortaya çıkan akımı gözlersiniz. [[K6 s. 316]]</p>
<h3>Dünya, tel ve kalıcı mıknatıs</h3>
<ul><li><b>Dünya.</b> Erimiş çekirdekte hareket eden yükler, gezegenin çevresine uzanan manyetik alanın kaynağıdır. [[K6 s. 315]]</li>
<li><b>Tel bobin.</b> Burada alanı oluşturan akım, sargı boyunca taşınan yüklerin makroskopik hareketidir. [[K6 s. 315–316]]</li>
<li><b>Kalıcı mıknatıs.</b> Kitap aynı ilişkiyi atom ölçeğinde kurar ve alanın kaynağını çekirdek çevresindeki elektron hareketiyle açıklar. [[K6 s. 315–316]]</li></ul>
<p>Manyetik alanlar, onlardan ayrı olsa da elektrik ve kütleçekim alanlarına benzer. [[K6 s. 315]] Mıknatısların benzer kutupları birbirini iter, karşıt kutupları çeker. [[K6 s. 315]] Bu bakımdan kuzey ve güney kutupları, pozitif ve negatif elektrik yüklerini andırır. [[K6 s. 315]] Tek başına pozitif ya da negatif yük bulunabilirken bir mıknatısın kuzey ve güney kutupları birlikte bulunur. [[K6 s. 315]]</p>
<p>Pusulanın gösterdiği yön ile iğneyi çeken kutbun fiziksel adını ayrı düşünün. [[K6 s. 316]] İğnenin kuzey ucunu çeken, Dünya’nın kuzey yönündeki fiziksel güney kutbudur. [[K6 s. 316]] Aynı mantığı öteki uca uygularsanız Dünya’nın manyetik güneyi diye adlandırılan yerde fiziksel bir kuzey kutbu bulunduğu sonucuna ulaşırsınız. [[K6 s. 316]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap, alan çizgilerinin Dünya’nın manyetik kuzeyinden çıktığını söyler, ardından bu ucun fiziksel olarak güney kutbu olduğunu belirtir. [[K6 s. 315–316]] Doğrusu, mıknatısın dışında çizgilerin fiziksel kuzeyden çıkıp fiziksel güneye girmesidir. [[K6 s. 315–316]]</aside>
</section>

<section class="wrap blk ders-sec" id="fk19-alan">
<h2>Manyetik akı, elektromıknatıs ve malzeme seçimi</h2>
<p class="intro">Demir, oksijen ve bakırı aynı dış alana koyduğunuzda çekimin yönü ve büyüklüğü maddeye göre değişir. [[K6 s. 317–318]]</p>
${sekil('alan', 'Manyetik malzemeler dış alana nasıl yanıt verir?', 'Malzeme sınıfını seçin ve mıknatısa göre hareket yönünü karşılaştırın. Okların uzunluğu şematiktir. [[K6 s. 317–318]]')}
<p><b>Akı mı, akı yoğunluğu mu?</b> Önce hangi yüzeyden söz ettiğinizi belirleyin. [[K6 s. 317]] Manyetik akı, yüzeyden geçen toplam alanı anlatır ve o yüzeyi kesen alan çizgilerinin sayısıyla orantılıdır. [[K6 s. 317]] Dünya yüzeyindeki belirli bir noktada alanın ne kadar güçlü olduğunu tarif etmek için ise akı yoğunluğunu kullanırsınız. [[K6 s. 317]]</p>
<ul>
<li><b>Bobin (solenoid) ve elektromıknatıs.</b> Sarım sayısı arttıkça alan güçlenir; bobinin demir çekirdeğe sarılması alanı daha da büyütür. [[K6 s. 316]] Anahtarla kapatılıp açılabildikleri için yangın kapılarını açık tutmada kullanılırlar: alarm akımı kesince kapı kapanır. [[K6 s. 316]]</li>
<li><b>Manyetik akı (Φ) ve akı yoğunluğu (B).</b> Belirli bir yüzeyden geçen alan miktarı akıdır ve weber (Wb) ile ölçülür; akı ile akı yoğunluğu arasındaki bağıntı <i>Φ</i> = <i>B</i> · <i>A</i>’dır; <i>A</i> kesit alanıdır (m²). [[K6 s. 317]] Birim alan başına düşen akı Wb·m⁻² (tesla, T) birimiyle ölçülür. [[K6 s. 317]]</li>
</ul>
<div class="cols cols-3">
<div class="card"><h3>Ferromanyetik</h3><p>Büyük ve pozitif duyarlılıkla güçlü çekilirler; eşleşmemiş elektronlar nedeniyle atomlar küçük mıknatıslar gibi hizalanır ve dış alan kalksa da malzemenin türüne, saflığına ve sıcaklığına bağlı olarak bir süre mıknatıslı kalırlar (demir, nikel, kobalt). [[K6 s. 317–318]]</p></div>
<div class="card"><h3>Diyamanyetik</h3><p>Zayıf ve negatif duyarlılıkla alandan itilirler; tüm elektronları eşleştiğinden atomda kalıcı net manyetik moment oluşmaz. [[K6 s. 318]] Çoğu element bu sınıftadır. [[K6 s. 318]] Bakır, gümüş, altın, su, çoğu organik bileşik ve süperiletkenler örnektir. [[K6 s. 318]]</p></div>
<div class="card"><h3>Paramanyetik</h3><p>Küçük ve pozitif duyarlılıkla zayıf çekilirler; eşleşmemiş elektronları dış alana hizalanır (magnezyum, molibden, lityum, tantal ve oksijen). [[K6 s. 318]]</p></div>
</div>
<details><summary>Demir çubuk ile yangın kapısındaki bobinde kalıcılık neden farklı bir sorudur?</summary>
<p>Bir mıknatıs demir çubuğu kuvvetle çeker. [[K6 s. 318]] Eşleşmemiş elektronların net manyetik momenti nedeniyle her atom küçük bir mıknatıs gibi davranır. [[K6 s. 317–318]] Atomlar uygulanan alan yönünde hizalandığında, alan kaldırılsa bile bu düzen kısmen korunabilir. [[K6 s. 318]] Bu nedenle demir gibi bir malzemeye dış alan uygulayarak kalıcı bir mıknatıs elde etmek mümkündür. [[K6 s. 317]]</p>
<p>Yangın kapısını tutan elektromıknatısta ise tasarımın amacı, tutma etkisini devredeki akımla kontrol etmektir. [[K6 s. 316]] Alarmın kapıyı serbest bırakabilmesi, bobinin akımı kesildiğinde elektromıknatısın kapıyı açık tutan etkisini kaybetmesine dayanır. [[K6 s. 316]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk19-motor">
<h2>Elektrik motoru ve dinamo</h2>
<p class="intro">Elektrik motoru elektrik enerjisini mekanik enerjiye, dinamo ise mekanik enerjiyi elektrik enerjisine dönüştürür. [[K6 s. 318–319]]</p>
${sekil('dinamo', 'Elektrik motoru ile dinamo aynı makinenin iki yönüdür', 'Kipi değiştirip enerjinin hangi uçtan verildiğini izleyin. Dönüş hızı şematiktir. [[K6 s. 318–319]]')}
<p>Faraday cıva dolu bir kabın ortasına sabit mıknatıs koyup üstten sarkan telin ucunu cıvaya batırdı ve pil bağladığında akım taşıyan telin mıknatıs çevresinde döndüğünü gösterdi; bu ilk elektrik motoruydu. [[K6 s. 318]] Modern motorlarda tek tel yerine büyük bobinler kullanılır; elektromanyetik kuvvet mili döndürür ve dönüş hızı akım değiştirilerek ayarlanır (saç kurutma makinesi, vantilatör, matkap). [[K6 s. 319]]</p>
<p><b>Elektromanyetik indüksiyon</b>, manyetik alanla iletkenin (örneğin tel bobinin) birbirine göre hareket etmesiyle akım üretilmesidir. [[K6 s. 319]] Dinamo motorla aynı temel yapıda olup mili dışarıdan döndürülünce bobinlerde akım doğar; sabit mıknatıs içinde dönen bobin (veya sabit bobinde dönen mıknatıs) saniyedeki devir sayısına eşit frekansta alternatif akım üretir. [[K6 s. 319]] Santral jeneratörleri buhar türbinlerine, rüzgâr jeneratörleri türbin kanatlarına bağlı büyük dinamolardır; rüzgâr hızına göre çıkış değişkendir. [[K6 s. 319]]</p>
<div class="cols"><div class="card"><h3>Motoru okurken mili izleyin</h3><p>Faraday sarkan teli serbest bırakmış, mıknatısı ise kabın ortasında sabitlemişti. [[K6 s. 318]] Pil devreyi tamamladığında telin mıknatıs çevresinde dolaşması, elektrik enerjisinin harekete dönüşebildiğini ilk kez gösterdi. [[K6 s. 318]] Bu ilk düzenek yararlı bir iş yapabilecek güçte değildi. [[K6 s. 319]] İzleyen yıllarda tek telin yerini geniş bobinlerin almasıyla daha güçlü motorlar yapıldı. [[K6 s. 319]]</p></div>
<div class="card"><h3>Dinamoyu okurken devreyi izleyin</h3><p>Mili dışarıdan çevirdiğinizde bobinin teli manyetik alan çizgilerini keser. [[K6 s. 319]] Devreye bir ampul bağlıysa bu hareketin ürettiği akım ampulü yakar. [[K6 s. 320]] Bobini sabit tutup mıknatısı hareket ettirmek de aynı ilkeye dayanır. [[K6 s. 319]] Daha gelişmiş üreteçler birden çok mıknatıs, birden çok bobin ya da her ikisini kullanabilir. [[K6 s. 319]]</p></div></div>
<p>Basit üreteçte frekansı bulmak için bobinin bir saniyedeki tam dönüşlerini sayın. [[K6 s. 319]] Her tam tur, akımın gidişini ve geri dönüşünü içeren bir tam çevrime karşılık gelir. [[K6 s. 319–320]] Santralde milin mekanik girdisi buhar türbininden gelir. [[K6 s. 319]] Rüzgâr türbininde ise dinamoya bağlı büyük kanatların dönüş hızı rüzgâra bağlı olduğundan elektrik çıkışı da önemli ölçüde değişebilir. [[K6 s. 319]]</p>
</section>

<section class="wrap blk ders-sec" id="fk19-ac">
<h2>Alternatif akım ve şebeke frekansı</h2>
<p class="intro">Piller tek yönlü doğru akım (DC) verirken duvar prizleri yönünü periyodik olarak tersine çeviren alternatif akım (AC) sağlar. [[K6 s. 320]]</p>
${sekil('ac', 'Sinüsoidal AC dalgasında etkin değer ve tepe değeri', 'Şebekeyi seçin ve zaman işaretini bir çevrim boyunca kaydırın. [[K6 s. 320–321]]')}
<p>Elektrik santrali jeneratörleri doğal olarak AC üretir ve AC gerilimi transformatörlerle kolayca yükseltilip alçaltılabildiği için uzun hatlarda verimli taşınır. [[K6 s. 320]] Isıtıcı ve ampuller AC ya da DC ile aynı çalışsa da elektronik cihazların çoğu DC ister; dönüşümü sağlayan <b>doğrultucu (rectifier)</b> devreler verimsizdir ve bu enerji kaybı dizüstü bilgisayar adaptörünün ısınmasıyla hissedilir. [[K6 s. 320]]</p>
<p>AC’de yük akışı periyodik olarak tersine döndüğünden kutuplar sabit kalmaz. [[K6 s. 320]] Frekans, saniyedeki tam çevrim sayısıdır (hertz, Hz). [[K6 s. 320]] Birleşik Krallık’ta saniyede 50, ABD ve başka birçok ülkede 60 çevrim tamamlanır. [[K6 s. 320]] İki oduncunun iki kişilik testereyle ağaç kesmesinde olduğu gibi hem itmede hem çekmede (“negatif” yarımda da) iş yapılır. [[K6 s. 320]]</p>
<div class="card fk19-hesap"><h3>Grafikte bir çevrim ne kadar sürüyor?</h3>
<p>Birleşik Krallık ayarında eğrinin sıfırdan yükseldiği noktadan başlayın ve sıfırdan yine yükseldiği bir sonraki noktaya gidin. [[K6 s. 320–321]] Aradaki süre bir tam çevrimdir ve 1 / 50 saniye, yani 20 ms sürer. [[K6 s. 320]] Kuzey Amerika ayarında aynı iki nokta birbirine yaklaşır, çünkü bir saniyeye 60 çevrim sığar. [[K6 s. 325]]</p>
<p>Aynı grafikte sıfır gerilimin art arda görüldüğü iki noktayı seçerseniz bunların arasında yalnızca yarım çevrim vardır. [[K6 s. 320–321]] İlkinde gerilim artarken ikincisinde azalır ve dalga başlangıçtaki hareket yönüne henüz dönmemiştir. [[K6 s. 320–321]]</p></div>
<p>Grafiği soldan sağa okurken önce aynı sürede kaç tam dalga gördüğünüze, sonra dalganın dikey eksende ne kadar yükseldiğine bakın. [[K6 s. 320–321]] Frekans çevrimlerin tekrarlanma hızını, tepe gerilimi ise bir çevrimde ulaşılan en büyük pozitif gerilimi verir. [[K6 s. 320–321]] Dalganın zaman ekseninin altına geçmesi ikinci yarıda iş yapılamayacağı anlamına gelmez. [[K6 s. 320]]</p></section>

<section class="wrap blk ders-sec" id="fk19-rms"><h2>Bir çevrimden etkin gerilime</h2>
<p class="intro">Gerilimin etkin değerini bulmak için önce işaretlerin birbirini götürmesini önlemek gerekir. [[K6 s. 321]]</p>
${sekil('rms','Aynı dalganın karesi, ortalaması ve karekökü','Düşey eksenin birimi kare alma ve karekök adımlarında değişir. [[K6 s. 321]]')}
<p>Sinüs dalgasında artı ve eksi yarımlar birbirini götürdüğü için tam döngü ortalaması sıfırdır; bu yüzden etkin gerilim olarak tüm noktaların karesi alınıp ortalamasının karekökü hesaplanan <b>kareler ortalamasının karekökü (RMS)</b> kullanılır: <b>RMS ≈ 0,707 × tepe genliği</b> (√2 / 2). [[K6 s. 321]]</p>
<div class="card fk19-hesap"><h3>Hesap · Birleşik Krallık şebekesinin tepe gerilimi</h3>
<p>BK şebekesinin RMS gerilimi 240 V’tur; tepe gerilimi bundan büyüktür ve 240 V × √2 ≈ <b>339,4 V</b> olarak hesaplanır. [[K6 s. 321]]</p></div>
<p>AC devrelerinde DC’deki direncin yerini devrenin indüktans ve kapasitansını (Bölüm 21.1) da hesaba katan <b>empedans (<i>Z</i>)</b> alır; AC gücü <b><i>P</i> = <i>V</i><sub>RMS</sub> · <i>I</i><sub>RMS</sub> = <i>I</i><sub>RMS</sub>² · <i>Z</i> = <i>V</i><sub>RMS</sub>² / <i>Z</i></b> biçiminde yazılır (kitabın güç hesabı). [[K6 s. 321–322]]</p>
<ol><li><b>Dalga boyunca örnek alın.</b> Sinüs geriliminin pozitif ve negatif yarılarında eşit büyüklükte, ters işaretli değerler vardır. [[K6 s. 321]] Bu değerleri doğrudan toplamak, sıfırdan farklı tepelere ulaşan bir şebeke gerilimi için bile sıfır ortalama verir. [[K6 s. 321]]</li>
<li><b>Her değerin karesini alın.</b> Gerilim hangi işarette olursa olsun karesi sıfır ya da pozitiftir. [[K6 s. 321]] Böylece iki yarım dalganın katkısı ortalama alınırken korunur. [[K6 s. 321]]</li>
<li><b>Bütün çevrim üzerinden ortalayın, sonra karekök alın.</b> Bu son adımla yeniden volt cinsinden ifade edilebilen etkin gerilime ulaşırsınız. [[K6 s. 321]] Akım için de aynı işlemleri akım dalgasının değerlerine uygulayarak amper cinsinden etkin değeri bulursunuz. [[K6 s. 321]]</li></ol>
<p>Çözümlü örnekte verilen 240 V, dalganın en yüksek noktası değil bu işlemin sonucudur. [[K6 s. 321]] Tepeden etkin değere giderken √2’ye böler, etkin değerden tepeye dönerken √2 ile çarparsınız. [[K6 s. 321]] Böylece hesapladığınız tepenin verilen etkin değerden büyük olması gerektiğini grafikten de denetleyebilirsiniz. [[K6 s. 321]]</p>
<p>Güç bağıntısındaki <i>P</i> watt cinsinden gücü, <i>V</i><sub>RMS</sub> volt cinsinden etkin gerilimi, <i>I</i><sub>RMS</sub> amper cinsinden etkin akımı gösterir. [[K6 s. 321–322]] Empedansın simgesi <i>Z</i>, birimi ohm (Ω) olup devrenin alternatif akıma gösterdiği karşı koymayı ifade eder. [[K6 s. 321–322]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap, etkin gerilim ile etkin akımın çarpımını AC güç hesabı olarak verir. [[K6 s. 322]] Doğrusu, sinüsoidal devrede aktif güç için bu çarpımı gerilim ve akım arasındaki faz farkının kosinüsüyle çarpmaktır. [[K6 s. 322]]</aside>
</section>

<section class="wrap blk ders-sec" id="fk19-trafo">
<h2>Transformatörler ve sarım oranı</h2>
<p class="intro">Transformatör, bağlı elektromanyetik indüksiyonla bir devreden diğerine akım ve değiştirilmiş gerilim aktaran aygıttır. [[K6 s. 322]]</p>
${sekil('trafo', 'Primer ve sekonder sarım sayısı gerilimi belirler', 'Sarım oranını değiştirin ve ideal dönüşümde gerilim ile akımın nasıl değiştiğini izleyin. Sarımlar şematiktir. [[K6 s. 322–323]]')}
<p>Yan yana yerleştirilen iki bobinden birincisine AC uygulandığında sürekli değişen manyetik alan çizgileri ikinci bobinin sarımlarını keserek akım indükler (<b>bağlı indüksiyon</b>). [[K6 s. 322]]</p>
<ul>
<li><b>Primer ve sekonder.</b> Kaynağa bağlanan giriş sargısı primer, indüklenen gerilimin alındığı çıkış sargısı sekonderdir. [[K6 s. 322–323]] Küçük elektrikli cihazların beslenmesi ve pillerin şarj edilmesi, bu iki devre arasında indüksiyonla enerji aktarımının günlük örnekleridir. [[K6 s. 322]]</li>
<li><b>Demir çekirdek.</b> Bobinlerin sarıldığı demir çekirdek manyetik akıyı en üst düzeye çıkarır. [[K6 s. 322–323]]</li>
<li><b>Yükseltici ve alçaltıcı.</b> Sekonder gerilimi sarım oranıyla belirlenir (<i>V</i><sub>s</sub> / <i>V</i><sub>p</sub> = <i>N</i><sub>s</sub> / <i>N</i><sub>p</sub>); sekonder sarım fazlaysa gerilim yükselir (step-up), azsa düşer (step-down). [[K6 s. 322–323]]</li>
<li><b>Enerji korunumu ve dişli benzetmesi.</b> Sekonderden alınan güç primerden büyük olamaz; bu nedenle gerilimi yükseltmek akımı düşürür. [[K6 s. 323]] İndüksiyonla dönüşüm birbirine geçen dişli çarklara benzer: dişlilerin dönüş hızı akıma, tork (döndürme kuvveti) ise gerilime karşılık gelir. [[K6 s. 323–324]]</li>
</ul>
<p>Sarım bağıntısında <i>N</i><sub>p</sub> ve <i>N</i><sub>s</sub> birimsiz sarım sayılarını, <i>V</i><sub>p</sub> ve <i>V</i><sub>s</sub> ise aynı birimle ölçülen giriş ve çıkış gerilimlerini belirtir. [[K6 s. 322–323]] Çıkış gerilimini ararken önce çıkış sarımlarını giriş sarımlarına bölün, sonra bu oranı giriş gerilimiyle çarpın. [[K6 s. 323]]</p>
<div class="card fk19-hesap"><h3>Sarım oranını iki yönde okuyun</h3>
<p>Şekilde sekonder sargıda primerin yarısı kadar sarım seçin. [[K6 s. 323]] Aynı çekirdekteki bu iki sargı için gerilim oranı da yarımdır ve 240 V girişten 120 V çıkış elde edilir. [[K6 s. 321–323]] Şimdi sekonderin sarım sayısını primerin iki katı yapın. [[K6 s. 323]] Aynı girişe karşılık bu kez çıkış 480 V olur ve kayıpsız dönüşümde çıkış akımı giriş akımının yarısına iner. [[K6 s. 323]]</p></div>
<p>Dişli benzetmesinde iki çarkın birbirine aktardığı hareketi düşünün. [[K6 s. 323–324]] Gerilimi azaltan bir transformatör, benzetmede daha düşük torkla daha hızlı dönen bir çıkışa karşılık gelir. [[K6 s. 323–324]] Elektrik tarafında bunun karşılığı daha düşük gerilim ve daha büyük akımdır. [[K6 s. 323]] Çıkış gerilimini büyütmek bu nedenle kullanılabilir gücü kendiliğinden büyütmez. [[K6 s. 323]]</p>
<details><summary>Transformatör neden pille (DC) sürekli çalışamaz?</summary>
<p>Sekonder bobinde akım indüklenmesi için manyetik alan çizgilerinin bobin sarımlarını sürekli değişerek kesmesi gerekir. [[K6 s. 322]] Sabit doğru akımda manyetik alan yalnızca anahtar açılıp kapanırken anlık değişir; sürekli değişimi sağlayan AC’dir ve güç iletiminde AC seçilmesinin temel nedenlerinden biri budur. [[K6 s. 322]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk19-iletim">
<h2>Yüksek gerilimli güç iletimi</h2>
<p class="intro">Elektrik enerjisi uzun mesafelere kayıpları en aza indirmek için çok yüksek gerilimle taşınır. [[K6 s. 324]]</p>
${sekil('iletim', 'Santralden hastaneye gerilim dönüşümü', 'Adımları izleyerek 400 kV seçiminin nedenini görün. [[K6 s. 324–325]]')}
<p>Santrallerde birkaç yüz voltta yüksek akımla üretilen elektrik, direkler ve yeraltı kablolarıyla taşınmadan önce yükseltici transformatörlerle yaklaşık <b>400 000 V</b> düzeyine çıkarılır. [[K6 s. 324]] Aynı gücü iletmek için yüksek gerilimde daha düşük akım yeterli olduğundan hem daha ince ve ucuz kablolar kullanılır hem de sabit dirençli kablodaki ısı kaybı (<i>P</i> = <i>I</i>² · <i>R</i>) çarpıcı biçimde azalır. [[K6 s. 324]]</p>
<p>Trafo merkezlerinde (substation) gerilim alçaltıcı transformatörlerle ev ve ofisler için <b>240 V</b>’a indirilir; bazı sanayi tesisleri ve hastaneler daha güçlü cihazlar için <b>415 V</b> besleme de kullanır. [[K6 s. 324]]</p>
${sekil('kayip','Hat akımını azaltınca ısı kaybı nasıl değişir?', 'Her iki eksen başlangıç değerine oranı gösterir. [[K6 s. 324]] Akımı yarıya indirdiğinizde kablonun ısı kaybı öncekinin dörtte birine düşer. [[K6 s. 324]]')}
<details><summary>400 kV hatlar direnç kaybını nasıl azaltır?</summary>
<p>Önce santralden taşınacak gücü sabit tutun. [[K6 s. 324]] Girişte gerilimi yükseltmek, aynı gücün hat boyunca daha küçük akımla taşınabilmesini sağlar. [[K6 s. 324]] Ardından yalnız kabloyu inceleyin. [[K6 s. 324]] Burada <i>R</i> kablonun sabit direnci (Ω), <i>I</i> ise hattan geçen akımdır (A). [[K6 s. 324]] Isı olarak kaybedilen güç (W), alıcıya iletilmek istenen güçten farklıdır ve <i>I</i>²<i>R</i> ile hesaplanır. [[K6 s. 324]]</p>
<p>İletim hattı direkler arasında havadan geçebilir ya da yeraltına döşenebilir. [[K6 s. 324]] Her iki durumda da santral ucundaki transformatör ile alıcıya yakın trafo merkezindeki transformatör farklı işler yapar. [[K6 s. 324–325]] İlki hattaki kaybı azaltacak gerilimi sağlar, ikincisi gerilimi evin, ofisin ya da hastanedeki cihazın kullanacağı düzeye indirir. [[K6 s. 324–325]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk19-sebeke">
<h2>Şebeke elektriği ve üç telli fiş güvenliği</h2>
<p class="intro">Hastane ve ev prizlerindeki şebeke frekansı insan dokusunun en duyarlı olduğu aralıkta bulunduğundan kablo ve sigorta düzeni yaşamsaldır. [[K6 s. 325–327]]</p>
${sekil('fis', 'BS 1363 üç pimli fişin iç bağlantıları', 'Numaralı noktalara tıklayarak tellerin ve sigortanın görevini inceleyin. [[K6 s. 325–327]]')}
<p>BK şebekesi 240 V / 50 Hz, Kuzey Amerika şebekesi 120 V / 60 Hz’tir; insan dokusu <b>40–150 Hz</b> aralığına en duyarlıdır ve <b>50 Hz ventriküler fibrilasyon oluşturmak için optimaldir</b>. [[K6 s. 325]] BK prizlerinde faz ve nötr yuvalarında koruyucu kapak (shutter) ve çoğunlukla ayrı bir açma/kapama anahtarı, BS 1363 fişlerinde ise dahili sigorta bulunur (ancak taşınabilir cihazlarda fişin hantal olması tartışma yaratır). [[K6 s. 325]]</p>
<div class="tbl-wrap"><table class="tbl fk19-tablo"><caption>Tablo 19.1 · BK ev tipi fişlerdeki üç telin görevi [[K6 s. 326–327]]</caption><thead><tr><th>Tel</th><th>Kılıf rengi</th><th>İşlev</th><th>Açıklama</th></tr></thead><tbody>
<tr><td>Canlı / Faz (Live)</td><td>Kahverengi</td><td>Etkin (Active)</td><td>Akım için itici kuvvet; dokunulursa ölümcül çarpma [[K6 s. 326–327]]</td></tr>
<tr><td>Nötr (Neutral)</td><td>Mavi</td><td>Pasif</td><td>Devreyi tamamlar; akım için trafo merkezine dönüş yolu (yüksüzken 0 V) [[K6 s. 326–327]]</td></tr>
<tr><td>Toprak (Earth)</td><td>Yeşil / Sarı</td><td>Güvenlik</td><td>Kaçak/hatalı akımların yerel toprağa güvenle akma yolu (çoğunlukla gömülü metal kazık) [[K6 s. 326–327]]</td></tr>
</tbody></table></div>
<p>Bir fişin kablosunu tablodan resme doğru izleyin. [[K6 s. 326–327]] Üç ayrı yalıtılmış iletkenin her biri kendi pimine, her pim de prizdeki karşılık gelen terminale bağlanır. [[K6 s. 326]] Fazın kaynağı jeneratörün veya trafo merkezinin aktif çıkışıdır. [[K6 s. 326]] Akımı süren gerilimi taşıdığı için dokunulduğunda elektrik çarpması açısından en tehlikeli bağlantı budur. [[K6 s. 326]]</p>
<p>Fiş ile prizin sunduğu korumalar farklı yerlerdedir. [[K6 s. 325]] Prizdeki kapaklar faz ve nötr kontaklarının üzerindedir, fişi açtığınızda gördüğünüz sigorta ise fiş gövdesindedir. [[K6 s. 325]] Kitap bu özelliklerin Birleşik Krallık tipi fişi en güvenli tasarımlardan biri saymak için gerekçe olabileceğini belirtir. [[K6 s. 325]] Aynı tasarımın belirgin bir bedeli, özellikle taşınabilir ekipmanla birlikte taşındığında fişin fazla yer kaplamasıdır. [[K6 s. 325]]</p>
<p>Kablo yolunu bu kez cihaz tarafından geriye doğru izleyin. [[K6 s. 326–327]] Normal çalışma akımını izliyorsanız mavi tel sizi cihazdan trafo merkezine götürür. [[K6 s. 326–327]] İstenmeyen bir akımın güvenli yolunu izliyorsanız sarı-yeşil tel sizi yerel toprak terminaline götürür. [[K6 s. 326–327]] Bu ayrım, nötrün yüksüzken sıfır volt olmasına karşın neden faz ile birlikte çalışma devresinin parçası olduğunu açıklar. [[K6 s. 326–327]]</p>
<p>Santral jeneratörünün diğer ucu da elektron deposu sağlayan toprağa bağlı olduğundan nötr teli “trafo merkezindeki toprak bağlantısı” gibidir. [[K6 s. 326]] Cihazların hazır kablolu fişle gelmesi zorunlu olsa da kablo düzenini bilmek elektrik çarpmasına bağlı ciddi yaralanma veya ölümü önlemeye yardımcı olur. [[K6 s. 326]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap s. 326’da canlı telin geriliminin her şebeke döngüsünde “+240 V RMS ile −240 V RMS arası gittiğini” yazar. [[K6 s. 326]] Doğrusu etkin değerin 240 V RMS olması, anlık gerilimin ise +339,4 V ile −339,4 V tepe değerleri arasında salınmasıdır. [[K6 s. 321]]</aside>
<details><summary>Üç telli fişte nötr ile toprak arasındaki farkı nasıl özetlersiniz?</summary>
<p>Nötr teli normal çalışma akımını cihazdan trafo merkezine geri taşır ve yüksüzken 0 V’tur; canlı telden farklı olarak etkin sürücü değildir. [[K6 s. 326–327]] Toprak teli ise normalde akım taşımaz; bir arıza oluştuğunda istenmeyen akımın yerel toprağa güvenle akmasını sağlayan güvenlik yoludur. [[K6 s. 326–327]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk19-p1"><h2>Part I · Doğru mu, yanlış mı?</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div data-viz="mtf" data-q="fk19-1"></div><div data-viz="mtf" data-q="fk19-2"></div><div data-viz="mtf" data-q="fk19-3"></div></section>

<section class="wrap blk ders-sec" id="fk19-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><h3>Klinik ölçüm ve ekipman</h3><p>Birleşik Krallık’ta hastaneye enerji iletiminde alternatif akımın ne avantajı vardır? Bir cihazdaki alçaltıcı transformatörün çalışma ilkesini ve 240 V RMS değerinin tepe gerilimle ilişkisini açıklayın. [[K6 s. 320–325]]</p></div>
<ol class="iskelet">
<li><b>İletim ve transformatör üstünlüğü.</b> Santraller doğal olarak AC üretir ve AC gerilimi transformatörle kolayca değiştirilir. [[K6 s. 320]] Gerilim 400 kV’a çıkarılınca akım düşer ve <i>I</i>²<i>R</i> kablo ısı kaybı azalır. [[K6 s. 324]]</li>
<li><b>Transformatör mekanizması.</b> Primer bobindeki değişen AC akımı demir çekirdekte manyetik akı oluşturur ve sekonderde sarım oranına göre gerilim indükler. [[K6 s. 322–323]]</li>
<li><b>Enerji korunumu.</b> Alçaltıcı transformatörde (<i>N</i><sub>s</sub> &lt; <i>N</i><sub>p</sub>) gerilim düşerken çıkış akımı yükselir. [[K6 s. 323]]</li>
<li><b>RMS ve tepe gerilim.</b> Sinüs dalgasının ortalaması sıfırdır; etkin gerilim 240 V RMS olup tepe gerilimi 240 × √2 ≈ 339,4 V’tur. [[K6 s. 321]]</li>
<li><b>Klinik güvenlik.</b> İnsan dokusu 40–150 Hz aralığına en duyarlıdır ve 50 Hz ventriküler fibrilasyon riski en yüksek frekanstır. [[K6 s. 325]]</li>
</ol>
<p class="note"><b>Çizin.</b> Demir çekirdeğin iki yanına sarılmış primer ve daha az sarımlı sekonder bobinden oluşan alçaltıcı transformatörü ve 240 V RMS / 339,4 V tepe sinüs eğrisini çizin. [[K6 s. 321–323]]</p>
<p><b>Ek sorular.</b> Ferromanyetik, paramanyetik ve diyamanyetik maddelere birer tıbbi/fiziksel örnek verin. [[K6 s. 317–318]] BS 1363 fişinde üç telin renkleri ve görevleri nelerdir? [[K6 s. 326–327]] Doğrultucu neden ısınır? [[K6 s. 320]]</p></section>

<section class="wrap blk ders-sec" id="fk19-ozet"><h2>Özet</h2><ul class="ozet">
<li>Manyetik alanlar hareketli yüklerden doğar ve her zaman iki kutupludur (N–S ayrılamaz). [[K6 s. 315]]</li>
<li>Maddeler manyetik tepkilerine göre ferromanyetik (Fe, Ni, Co), paramanyetik (O₂ vb.) ve diyamanyetik (Cu, su, süperiletkenler) olarak üçe ayrılır. [[K6 s. 317–318]]</li>
<li>Motor elektriği harekete, dinamo hareketi AC elektriğe çevirir; ikisi simetrik yapılardır. [[K6 s. 318–319]]</li>
<li>Sinüs AC’de etkin gerilim RMS ≈ 0,707 × tepe gerilimidir; güç hesabında empedans <i>Z</i> kullanılır. [[K6 s. 321–322]]</li>
<li>Transformatörler yalnız AC ile çalışır; sarım oranıyla gerilimi değiştirir ve 400 kV iletimle <i>I</i>²<i>R</i> kaybını azaltır. [[K6 s. 322–324]]</li>
<li>50 Hz şebeke insan dokusunun en duyarlı olduğu aralıktadır; BK fişinde kahverengi faz, mavi nötr, sarı-yeşil toprak teli ve dahili sigorta bulunur. [[K6 s. 325–327]]</li>
</ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="19"></div>
<nav class="ders-gec"><a href="#/dersler/fizik/18">← Elektriğin temelleri ve Wheatstone köprüsü</a><a href="#/dersler/fizik/20">Sonraki: Elektrik çarpması, topraklama, mikroşok ve elektrocerrahi →</a></nav></section>`,
  };
})();
