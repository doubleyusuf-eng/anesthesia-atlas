VERI.sorular = VERI.sorular || {};
VERI.sorular['fk04b-1'] = {
  no: 1, kok: 'Vücut sıcaklığı ve perioperatif ısı kaybı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 64–66]]',
  onermeler: [
    { t: 'Aynı ortam sıcaklığında nem artınca terin buharlaşması hızlanır.', d: false, n: 'Nemli havada buharlaşma yavaşlar ve deriden daha az ısı uzaklaşır. [[K6 s. 65]]' },
    { t: 'Titreme soğukta ısı üretimini artırır.', d: true, n: 'Titreme ve istemli kas etkinliği ısı üretimine katkıda bulunur. [[K6 s. 64–65]]' },
    { t: 'Yansıtıcı örtü vücudun yaydığı ısıl ışınımı geri yansıtır.', d: true, n: 'Örtü, ışınımla kaybedilen enerjiyi azaltır. [[K6 s. 65]]' },
    { t: 'Vücut ısısının yaklaşık %90’ı baştan kaybedilir.', d: false, n: 'Kitap başın payını yaklaşık %20–40 olarak tahmin eder. [[K6 s. 65]]' },
    { t: 'Sıvı ısıtıcısı infüzyon hattındaki gaz kabarcıklarını küçültür.', d: false, n: 'Isınan gaz genleşir, bu nedenle kabarcık tutucu sıklıkla ısıtıcının çıkışında bulunur. [[K6 s. 66]]' },
  ],
};
VERI.sorular['fk04b-2'] = {
  no: 2, kok: 'Termometreyi oluşturan parçalar ve ölçüm ilkeleri', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 66–71]]',
  onermeler: [
    { t: 'Cam termometredeki boğum, cihaz hastadan alındıktan sonra okumaya izin verir.', d: true, n: 'Hazne ile sütun arasındaki daralma sıvının hemen geri dönmesini engeller. [[K6 s. 67]]' },
    { t: 'İnce platin telin direnci sıcaklıkla doğrusal değişir.', d: true, n: 'Ölçülen direnç basit bir kalibrasyon denklemiyle sıcaklığa çevrilir. [[K6 s. 68]]' },
    { t: 'NTC termistör ısındığında direnci artar.', d: false, n: 'Negatif sıcaklık katsayılı termistörün direnci soğuyunca artar. [[K6 s. 69]]' },
    { t: 'Termokuplun Seebeck katsayısı kullanılan metal çiftine bağlıdır.', d: true, n: 'Aynı sıcaklık farkının ürettiği gerilimi metal çiftine özgü katsayı belirler. [[K6 s. 69–70]]' },
    { t: 'Timpanik termometredeki termopil ısıl enerjiyi elektrik enerjisine çevirir.', d: true, n: 'Kulak zarından gelen kızılötesi ışınım termopili ısıtır ve elektriksel bir sinyal elde edilir. [[K6 s. 70]]' },
  ],
};
VERI.sorular['fk04b-3'] = {
  no: 3, kok: 'Isı, iş ve gazın sıcaklığı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 72–74]]',
  onermeler: [
    { t: 'Adyabatik bir süreçte gazın iç enerjisi mutlaka sabit kalır.', d: false, n: 'Dışarıyla ısı alışverişi yokken gazın yaptığı iş iç enerjisinden karşılanır. [[K6 s. 73–74]]' },
    { t: 'Buzdolabının soğuk iç hacminden daha sıcak ortama ısı taşımak iş gerektirir.', d: true, n: 'Soğuktan sıcağa ısı aktarımı kendiliğinden gerçekleşmez. [[K6 s. 72–73]]' },
    { t: 'Mutlak sıfıra sonlu sayıda işlemle ulaşılamaz.', d: true, n: 'Üçüncü yasa, kelvin ölçeğinin kuramsal alt sınırına erişilemeyeceğini söyler. [[K6 s. 73]]' },
    { t: 'Lastik yavaş şişirilirken pompa valfi ısıyı çevreye aktarmaya zaman bulamaz.', d: false, n: 'Yavaş sıkıştırma ısının çevreye yayılmasına zaman tanır. [[K6 s. 74]]' },
    { t: 'Kriyoprobun soğuması sıkıştırılmış gazın hızla genleşmesine dayanır.', d: true, n: 'Probu soğutan etki, yüksek basınçlı gazın çıkışta genleşmesiyle elde edilir. [[K6 s. 74]]' },
  ],
};

const FK04B_NAV = [
  ['denge','Isı dengesi'], ['infuzyon','İnfüzyon'], ['mekanik','Mekanik termometreler'],
  ['direnc','Direnç'], ['termokupl','Termokupl'], ['kulak','Timpanik ölçüm'],
  ['yasalar','Üç yasa'], ['gaz','Gazın genleşmesi'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];
SAYFALAR['dersler/fizik/04b'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 4 · Ders 04b',
  baslik: 'Vücut sıcaklığının düzenlenmesi, sıcaklık ölçümü ve termodinamik yasaları',
  lede: 'Terin buharlaşması deriden ısı çeker. [[K6 s. 65]] Kulak zarından yayılan ısıl ışınım ise çekirdek sıcaklığını tahmin etmeye yarar. [[K6 s. 70]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK04B_NAV.map(([id, ad]) => `<button type="button" data-scroll="fk04b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk04b-denge">
<h2>Vücut ısıyı nasıl üretir ve uzaklaştırır?</h2>
<p class="intro">Dinlenmekte olan ortalama sağlıklı bir erkek, vücut yüzeyinin metrekaresi başına yaklaşık 50 W, toplamda yaklaşık 80 W ısı yayar. [[K6 s. 64]]</p>
<div class="viz"><div class="viz-head"><h3>Isı kaybında hangi yolun payı daha büyük?</h3></div><div data-viz="fk04b_kayip"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="card"><h3>Payları birlikte okuyun</h3>
<p>Kitaptaki dağılımda ışınım %40, taşınım %30, derideki suyun buharlaşması %20 ve solunum %10 pay alır. [[K6 s. 65]] Işınım ile taşınımın payları toplandığında kaybın %70’i elde edilir, giysi bu iki yoldan da kaybı azaltır. [[K6 s. 65]]</p>
<p>Burada yüzdeler ısının hangi <em>yolla</em> kaybedildiğini belirtir, başın payı ise kaybın vücudun hangi <em>bölgesinden</em> gerçekleştiğini anlatır. [[K6 s. 65]]</p></div>
<p>Memeliler ve diğer sıcakkanlı hayvanlar sürekli ısı üretir, ölümden sonra vücudun hızla soğuması bunun bir göstergesidir. [[K6 s. 64]] Isı yayım hızını bazal metabolizma hızı etkiler. [[K6 s. 64]] Yemek sonrasında ve egzersiz sırasında metabolizma hızlanır, çekirdek sıcaklığı yükselir. [[K6 s. 64]]</p>
<div class="viz"><div class="viz-head"><h3>Yüzey alanından yayılan gücü hesaplayın</h3></div><div data-viz="fk04b_guc"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şekil, dinlenme örneğindeki yaklaşık 50 W/m² üzerinden hesaplanmıştır, egzersiz için bir tahmin değildir. [[K6 s. 64]]</p></div>
<div class="card"><h3>Şekilden hesaba · metrekareden toplam güce</h3><p>Kitabın verdiği iki yaklaşık değerden, bu örnekteki yüzey alanını geriye doğru hesaplayabilirsiniz: 80 W ÷ 50 W/m² ≈ 1,6 m². [[K6 s. 64]] Ters yönde hesap için birim alan başına yayılan gücü ele aldığınız alanla çarpın, metrekareler sadeleşir ve sonuç watt cinsinden çıkar. [[K6 s. 64]]</p>
<p>Kaydırıcıda alanı yarıya getirdiğinizde aynı birim alan başına güç için toplamın da yarıya indiğini görebilirsiniz. [[K6 s. 64]] Bu işlem yüzey alanının katkısını ayırır, oysa bir kişi yemek yediğinde ya da egzersize başladığında ısı yayım hızını metabolizma da değiştirir. [[K6 s. 64]]</p></div>
<div class="cols"><article class="card"><h3>Soğukta üretim</h3><p>Soğuk ortamda titreme ve istemli kas hareketleri ek ısı sağlar. [[K6 s. 64–65]] Aşırı ısınmada ise ısı üretimini doğrudan kısan bir mekanizma yoktur, vücut terleme gibi soğutucu yanıtlardan yararlanır. [[K6 s. 65]]</p></article>
<article class="card"><h3>Deriden çevreye</h3><p>Deri kan akımı arttığında ışınımla daha fazla ısı kaybedilir, vücut ile çevre arasındaki sıcaklık farkı büyüdükçe ısı kaybı hızlanır. [[K6 s. 65]] Giysiler hem ışınımla hem taşınımla kaybı azaltır. [[K6 s. 65]]</p></article></div>
<ul class="ozet"><li><b>Yüzey alanı.</b> Yenidoğanın göreli vücut yüzey alanı daha büyük olduğundan ışınımla ısı kaybı erişkine göre daha hızlıdır. [[K6 s. 65]] Baştan kaybedilen pay için %90 iddiası abartılıdır, kitap bu payın muhtemelen %20–40 arasında olduğunu belirtir. [[K6 s. 65]]</li>
<li><b>Terin kaderi.</b> Ter kuru havada kolayca buharlaşır, sıvı suyu buhara dönüştürmek için gereken enerji deriden alınır. [[K6 s. 65]] Aynı sıcaklıkta nemli hava buharlaşmayı yavaşlatır ve sıcağın daha bunaltıcı hissedilmesine yol açar. [[K6 s. 65]]</li>
<li><b>Terleme ile soğuma arasındaki basamak.</b> Deride ter görmek, suyun buharlaşarak enerjiyi uzaklaştırdığını tek başına göstermez. [[K6 s. 65]] Kuru ve nemli bir günü karşılaştırırken önce havanın sıcaklığını aynı tutun, sonra terin hangi ortamda daha kolay buhara dönüşeceğini düşünün. [[K6 s. 65]]</li>
<li><b>Sudan çıktıktan sonra.</b> Dalış giysisi terin buharlaşmasını engeller ve vücudu yalıtır, bu nedenle karada giysiyle yoğun egzersiz hızla aşırı ısınmaya yol açabilir. [[K6 s. 65]]</li>
<li><b>Yansıtıcı örtü.</b> Vücut ısıl ışınımı hem soğurur hem yayar, periferik damarlar genişlediğinde yayım artar. [[K6 s. 65]] Triatlon sonrasında sporcuya sıklıkla verilen örtü, yayılan ışınımı geri yansıtarak bu yoldan kaybı azaltır ve hipotermik hastada da kullanılabilir. [[K6 s. 65]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk04b-infuzyon">
<h2>İnfüzyon hattında sıvı ve gaz birlikte ısınır</h2>
<p class="intro">Çekirdek sıcaklığının altındaki bir sıvı hastaya verildiğinde vücut sıcaklığını düşürür. [[K6 s. 66]]</p>
<div class="viz"><div class="viz-head"><h3>Isıtıcıdan hastaya giden hattı izleyin</h3></div><div data-viz="fk04b_hat"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Sıcak bir hasta, küçük infüzyon hacminin yol açtığı enerji kaybını kolayca karşılar. [[K6 s. 66]] Anestezi altında soğumakta olan hastaya büyük hacimde sıvı verilecekse sıvının yaklaşık çekirdek sıcaklığına kadar ısıtılması gerekir. [[K6 s. 66]]</p>
<div class="card"><h3>Hattı kurarken iki soru</h3><ol><li>Verilecek hacim ve hastanın sıcaklığı birlikte düşünüldüğünde hasta bu ısı kaybını karşılayabilir mi? [[K6 s. 66]]</li><li>Sıvı ısıtıldığında gazın da ısınacağı hesaba katılırsa, büyüyen kabarcığın hastaya doğru ilerlediği yol üzerinde tutucu nereye konur? [[K6 s. 66]]</li></ol></div>
<p>Isıtıcı sıvının içindeki gazı da ısıtır ve Charles yasasına göre gaz kabarcıklarının hacmi artar. [[K6 s. 66]] Bu yüzden kabarcık tutucu sıklıkla akış yönünde ısıtıcıdan sonra yer alır. [[K6 s. 66]]</p>
</section>
<section class="wrap blk ders-sec" id="fk04b-mekanik">
<h2>Genleşmeyi okumak</h2>
<p class="intro">Termometrik özellik, sıcaklıkla bilinen ve tutarlı biçimde değişen fiziksel bir özelliktir. [[K6 s. 66]]</p>
<div class="viz"><div class="viz-head"><h3>Cam termometrede okumayı hangi parça korur?</h3></div><div data-viz="fk04b_cam"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Basit ve tercihen doğrusal bir ilişki ölçümü kolaylaştırır, ancak termistör gibi doğrusal olmayan bir algılayıcıyla da sıcaklık ölçülebilir. [[K6 s. 66]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Termometre</th><th>Sıcaklığı bildiren özellik</th></tr></thead><tbody>
<tr><td>Cam hazneli</td><td>Sıvının genleşmesi [[K6 s. 66]]</td></tr><tr><td>Bimetalik şerit</td><td>Katının genleşmesi [[K6 s. 66]]</td></tr>
<tr><td>Bourdon</td><td>Gaz basıncının değişimi [[K6 s. 66]]</td></tr><tr><td>Direnç termometresi</td><td>Tel bobinin elektrik direnci [[K6 s. 66]]</td></tr>
<tr><td>Termistör</td><td>Metal oksitlerin elektrik direnci [[K6 s. 66]]</td></tr><tr><td>Termokupl</td><td>Seebeck etkisi [[K6 s. 66]]</td></tr><tr><td>Kızılötesi termometre</td><td>Isıl ışınım [[K6 s. 66]]</td></tr>
</tbody></table></div>
<p>Tabloyu okurken önce gözlenen büyüklüğü belirleyin: cam termometrede sıvı sütununun ucunu doğrudan görürsünüz, Bourdon tipinde ise gaz basıncının mekanik sonucunu bir ibre gösterir. [[K6 s. 66–67]] Elektronik direnç termometresinde kullanıcıya gösterilen sıcaklık, cihazın ölçtüğü direncin bir kalibrasyon bağıntısıyla dönüştürülmesinden elde edilir. [[K6 s. 68]]</p>
<p><b>Cam termometre.</b> Ağız, koltuk altı ve rektumda kullanılan bu termometrede, önceleri cıva kullanılırken günümüzde alkol esaslı sıvı bulunur. [[K6 s. 66–67]] Sıcaklıkla doğrusal genleşme toplam hacmin yalnızca %1–2’si kadardır, bu yüzden cam gövde ince sıvı sütununu büyütecek biçimde yapılır. [[K6 s. 66–67]]</p>
<p>Hazne çıkışındaki boğum, termometre hastadan alındıktan sonra sütunun okunabilmesini sağlar, sıvıyı hazneye geri göndermek için termometreyi sallamak gerekir. [[K6 s. 67]] Yapısı basit ve ucuzdur, ancak kırılgandır, duyarlılığı düşüktür ve yanıtı yavaştır. [[K6 s. 67]]</p>
<div class="viz"><div class="viz-head"><h3>Bourdon termometresinde hazneden ibreye</h3></div><div data-viz="fk04b_bourdon"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Çizimde iki ayrı bağlantıyı takip edin: hazneden kadranın içine kadar uzanan ince boru basıncı iletir, kadranın içindeki kısa mekanik kol ise tüp ucunun hareketini ibreye iletir. [[K6 s. 67]] İlk bağlantıyı izlemek sıcaklığın nerede algılandığını, ikinciyi izlemek sonucun nereden okunduğunu gösterir. [[K6 s. 67]]</p>
<p><b>Bourdon termometresi.</b> Yüksek sıcaklıkları doğrulukla ölçebildiği için sanayide tercih edilir. [[K6 s. 67]] Haznedeki gaz ısındığında basıncı artar, bu değişiklik kılcal bağlantı üzerinden içi boş, kıvrımlı Bourdon tüpüne iletilir. [[K6 s. 67]] Tüp açıldıkça mekanik bağlantı ibreyi hareket ettirir, sıcaklık kalibre edilmiş kadrandan okunur. [[K6 s. 67]]</p>
<p>Bourdon basınç göstergesiyle ortak ilkesi akışkanın genleşmesidir, hazne gazla veya ısınınca genleşen bir sıvıyla doldurulabilir. [[K6 s. 67–68]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap gazın basınç–sıcaklık ilişkisini Charles yasasına bağlar. [[K6 s. 67]] Doğrusu, sabit hacimde basıncın mutlak sıcaklığa oranının sabit olmasıdır (basınç yasası), Charles yasası ise sabit basınçta hacim ile mutlak sıcaklığı ilişkilendirir. [[K6 s. 66–67]]</aside>
</section>
<section class="wrap blk ders-sec" id="fk04b-direnc">
<h2>Elektrik direncinden sıcaklığa</h2>
<p class="intro">Elektronik termometreler çoğunlukla sıcaklığa duyarlı bir direnç ya da bir termokupl kullanır. [[K6 s. 68]]</p>
<div class="viz"><div class="viz-head"><h3>Prob ısınınca hangi yönde bir değişim beklersiniz?</h3></div><div data-viz="fk04b_direnc"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Elde taşınan veya hasta monitörüne entegre edilen elektronik termometreler görece ucuzdur, duyarlı algılayıcıları vardır ve hassas biçimde kalibre edilebilir. [[K6 s. 68]] Değerin kolay okunması ve otomatik kaydı özellikle uzun süreli izlemde yararlıdır. [[K6 s. 68]]</p>
<div class="cols"><article class="card"><h3>Platin tel</h3><p>En basit elektronik tipte, ince platin telden yapılmış bobinin direnci ölçülür. [[K6 s. 66–68]] Direnç sıcaklıkla doğrusal arttığından basit bir kalibrasyon denklemiyle sıcaklığa çevrilir. [[K6 s. 68]] Direnç–sıcaklık eğrisinin eğimi termistörünkine göre daha yatıktır, dolayısıyla küçük sıcaklık değişimlerine daha az duyarlıdır. [[K6 s. 68]]</p></article>
<article class="card"><h3>NTC termistör</h3><p>Termistör sıcaklığa duyarlı bir dirençtir, çoğu seçilmiş metal oksitlerden yapılmış bir yarı iletkendir. [[K6 s. 69]] Negatif sıcaklık katsayısı (NTC), sıcaklık düştüğünde direncin arttığını ifade eder. [[K6 s. 69]] Wheatstone köprüsü bu direncin hassas ölçümünü sağlar. [[K6 s. 69]]</p></article></div>
<p><b>Kalibrasyon.</b> Termistörde direnç–sıcaklık ilişkisi doğrusal olmadığı için elektronik ölçüm sistemine uygun kalibrasyon denklemi programlanır. [[K6 s. 69]] Ucuz, küçük, kullanışlı ve doğru ölçüm yapabilen bu probların düşük kütlesi, değişen sıcaklığa hızlı yanıt vermelerini sağlar. [[K6 s. 69]]</p>
<div class="card"><h3>“Duyarlı”, “hızlı” ve “doğru” aynı soruyu mu yanıtlar?</h3><ul>
<li><b>Duyarlılık.</b> Aynı küçük sıcaklık değişiminde direnç ne kadar değişir? Platin tel ile termistörü karşılaştırırken direnç–sıcaklık eğrisinin eğimine bakılır, daha dik eğim daha büyük bir direnç değişikliği verir. [[K6 s. 68]]</li>
<li><b>Yanıt süresi.</b> Sıcaklık değiştiğinde prob bunu ne kadar çabuk izler? Termistör probunun küçük kütlesi bu soruda önem kazanır. [[K6 s. 69]]</li>
<li><b>Kalibrasyon.</b> Ölçülen direnç hangi sıcaklığa karşılık gelir? Platin telde doğrusal bir dönüşüm yeterliyken termistörün elektronik sistemi doğrusal olmayan ilişkiyi hesaba katar. [[K6 s. 68–69]]</li></ul></div>
<p><b>Yerleşim.</b> Prob nazofarinkse, özofagusa veya rektuma konabilir, mesanede ölçüm için idrar kateterine entegre edilebilir. [[K6 s. 69]]</p>
</section>
<section class="wrap blk ders-sec" id="fk04b-termokupl">
<h2>Termokupl hangi sıcaklık farkını algılar?</h2>
<p class="intro">İki farklı metalden yapılmış termokupl, ölçüm ve referans birleşimleri arasındaki sıcaklık farkını elektriksel bir sinyale çevirir. [[K6 s. 69–70]]</p>
<div class="viz"><div class="viz-head"><h3>Referans eriyen buzdayken ölçüm ucu ısınırsa</h3></div><div data-viz="fk04b_seebeck"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Düşey eksende gerilim metal çiftinin katsayısına bölünmüştür, kaydırıcı küçük bir sıcaklık farkını örnekler. [[K6 s. 69–70]]</p></div>
<p><b>Seebeck etkisi.</b> Farklı metallerin birleşimlerinde sıcaklık farkı küçük bir gerilim oluşturur, devre kapalıysa akım doğar. [[K6 s. 69]] Küçük değişimler için bu gerilim sıcaklık farkıyla doğrusal orantılıdır. [[K6 s. 69]]</p>
<div class="card fk04b-formul"><h3>Birleşimler arasındaki fark</h3><p><i>V</i> = <i>S</i> · (<i>T</i><sub>ölçüm</sub> − <i>T</i><sub>referans</sub>) [[K6 s. 69–70]]</p><p><i>V</i> Seebeck gerilimi (volt), <i>S</i> seçilen iki metale bağlı Seebeck katsayısıdır (V/K), iki sıcaklık arasındaki fark kelvin cinsindendir. [[K6 s. 69–70]]</p></div>
<div class="viz"><div class="viz-head"><h3>Gerilimi ölçen devrede referansı bulun</h3></div><div data-viz="fk04b_devre"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="card"><h3>Şekilden hesaba · iki uç aynı sıcaklıktayken</h3><p>Ölçüm ucunu da eriyen buza koyarsanız her iki birleşim 0 °C’dedir, sıcaklık farkı 0 K ve hesaplanan Seebeck gerilimi 0 V olur. [[K6 s. 69–70]] Şimdi referansı buzda bırakıp yalnız ölçüm ucunu ısıtın: küçük farklar için sıcaklık farkını iki katına çıkarmak gerilimi de iki katına çıkarır. [[K6 s. 69–70]]</p>
<p>Bu karşılaştırma boyunca metal çifti aynı kaldığından katsayı da aynıdır, dolayısıyla sonucu okumak için bakır–konstantan çiftine sayısal bir katsayı atamak gerekmez. [[K6 s. 69–70]]</p></div>
<ul class="ozet"><li><b>Klasik düzenek.</b> Bir birleşim ölçüm probundadır, diğer birleşim bilinen, sabit bir sıcaklıkta tutulur, örneğin eriyen buzda 0 °C’de. [[K6 s. 69]] Yaygın malzeme çifti bakır ve konstantandır, konstantan %40 nikel içeren bir bakır alaşımıdır. [[K6 s. 69]]</li>
<li><b>Soğuk birleşim kompanzasyonu.</b> Modern termometrede tek ölçüm birleşimi kullanılır, ayrı bir sabit sıcaklık referansının işini elektronik devre üstlenir. [[K6 s. 70]] Devredeki termistör ortam sıcaklığını algılar ve termokupl çıkışının buna göre düzeltilmesini sağlar. [[K6 s. 70]]</li>
<li><b>Referansın görevi.</b> Gerilimden ölçüm ucunun sıcaklığını bulmak için diğer ucun sıcaklığını da bilmek gerekir. [[K6 s. 69–70]] Eriyen buz bu bilgiyi sabit bir değer olarak verirken kompanzasyon devresinde ortamı izleyen termistör aynı hesabı değişen ortam sıcaklığında yapmaya yarar. [[K6 s. 69–70]]</li>
<li><b>Küçük örnekte ölçüm.</b> Çok küçük üretilebilen termokuplun ısı kapasitesi de çok düşüktür, böylece çok küçük madde hacimlerinde bile sıcaklığı hızla ölçebilir. [[K6 s. 70]] Doğru kalibre edildiğinde ölçüm doğruluğu yüksek olabilir. [[K6 s. 70]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk04b-kulak">
<h2>Timpanik ölçümde görüş hattı</h2>
<p class="intro">Kızılötesi timpanik termometre, orta kulak sıcaklığını tahmin etmek için kulak zarının yaydığı ışınımı algılar. [[K6 s. 70]]</p>
<div class="viz"><div class="viz-head"><h3>Algılayıcıya ışınım nereden geliyor?</h3></div><div data-viz="fk04b_kulak"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Zarın kanlanması, hem konumu hem de kanın sıcaklığı bakımından termoregülasyon merkezi olan hipotalamusun kanlanmasına benzer, bu yüzden zar çekirdek sıcaklığını tahmin etmek için uygundur. [[K6 s. 70]]</p>
<p>Şekilde okun başlangıcı ışınımı yayan dokuyu, ucu ise bu ışınımı alan probu gösterir. [[K6 s. 70–71]] Bu ayrım önemlidir: prob kanalı gördüğünde termopil yine bir sinyal üretir ama sinyal zardan daha soğuk bir yüzeye aittir. [[K6 s. 70–71]]</p>
<p><b>Sinyal.</b> Kızılötesi ışınım algılayıcıdaki termopili ısıtır, termopil bu ısıl enerjiyi elektrik enerjisine dönüştürür. [[K6 s. 70]] Yayılan ışınımın gücü, kaynağın sıcaklığı hakkında bilgi verir. [[K6 s. 70]]</p>
<ul class="ozet"><li><b>Yanlış düşük okuma.</b> Kulak anatomisi, birikmiş kulak kiri, başka kalıntılar veya uygulama tekniği zardan gelen ışınımın algılanmasını engelleyebilir. [[K6 s. 70]]</li>
<li><b>Hedefi bulmak.</b> Kulak yukarı kaldırıldığında cihaz zarı doğrudan görebilir, aksi durumda yaklaşık 2 °C daha soğuk olan kanal duvarının ışınımını algılayabilir. [[K6 s. 70–71]]</li>
<li><b>Okumayı yorumlarken.</b> Yaklaşık 2 °C, kulak kanalı ile zar arasındaki sıcaklık farkını anlatır. [[K6 s. 70–71]] Probun baktığı yüzeyi değiştirmeden yalnız ekrandaki sayıyı okumak, sinyalin kanal duvarından mı yoksa zardan mı geldiğini ayırt ettirmez. [[K6 s. 70–71]]</li>
<li><b>Kullanım sınırı.</b> Bu tip termometreyle yalnız kulaktan ölçüm yapılabilir. [[K6 s. 71]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk04b-yasalar">
<h2>Enerjinin miktarı, ısının yönü ve sıcaklığın alt sınırı</h2>
<p class="intro">Termodinamik, ısıl enerjinin başta mekanik iş olmak üzere diğer enerji biçimleriyle ilişkisini inceler. [[K6 s. 71]]</p>
<div class="viz"><div class="viz-head"><h3>Alınan ısının ne kadarı işe gidiyor?</h3></div><div data-viz="fk04b_enerji"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Sistem ısı alıyor ve iş yapıyor, oranların ikisi de aynı ısı miktarına göre hesaplanıyor. [[K6 s. 72]]</p></div>
<p>Bir gazın sıcaklığı, basıncı ve hacmi ısıl enerjisiyle ilişkilidir, termodinamik yasaları bu değişkenlerin fiziksel süreçlerde nasıl davranacağını öngörmemizi sağlar. [[K6 s. 71]]</p>
<div class="card fk04b-formul"><h3>Birinci yasa · enerji hesabı</h3><p>Δ<i>U</i> = <i>Q</i> − <i>W</i> [[K6 s. 72]]</p><p>Δ<i>U</i> iç enerjideki değişim, <i>Q</i> sisteme verilen ısı, <i>W</i> sistemin yaptığı iştir, üçü de joule ile ifade edilir. [[K6 s. 72]]</p></div>
<p>Enerji yoktan var edilemez ve yok edilemez, bir biçimde azalan enerji başka bir biçimde ortaya çıkar. [[K6 s. 72]] Dışarıyla hiçbir alışverişi olmayan, tam yalıtılmış bir odanın toplam enerjisi sabit kalır, insan vücudu için de enerji hesabının temeli bu korunmadır. [[K6 s. 71–72]]</p>
<div class="card"><h3>Şekilden hesaba · enerji nereye gitti?</h3><p>Grafikte her iki eksende de enerji, sisteme verilen aynı ısıya bölünür: yatayda <i>W/Q</i>, düşeyde Δ<i>U/Q</i> okunur. [[K6 s. 72]] Birinci yasayı <i>Q</i>’ya böldüğünüzde düşey eksendeki payın 1 − <i>W/Q</i> olduğunu görürsünüz. [[K6 s. 72]]</p>
<ul><li>Sistem iş yapmazsa verilen ısının tümü iç enerjiyi artırır. [[K6 s. 72]]</li><li>Yapılan iş verilen ısının yarısına eşitse geriye kalan yarı iç enerji artışını verir. [[K6 s. 72]]</li><li>Yapılan iş verilen ısının tamamına eşitse iç enerji değişimi sıfırdır, oysa sistem sınırından hem ısı hem iş geçmiştir. [[K6 s. 72]]</li></ul></div>
<div class="cols"><article class="card"><h3>İkinci yasa · aktarımın yönü</h3><p>Isı kendiliğinden soğuk bir cisimden sıcak bir cisme geçmez. [[K6 s. 72–73]] Buzdolabının soğuk iç hacminden daha sıcak dış ortama ısı pompalamak için iş yapılması ve dolayısıyla enerji sağlanması gerekir. [[K6 s. 72]] Entropi düzensizliğin bir ölçüsüdür, en olası durum entropinin en büyük olduğu durumdur. [[K6 s. 73]]</p></article>
<article class="card"><h3>Üçüncü yasa · mutlak sıfır</h3><p>Kelvin ölçeğinin kuramsal alt sınırı 0 K’dir, sistem bu sınıra yaklaşırken süreçler durmaya, entropi en küçük değerine yaklaşır. [[K6 s. 73]] İşlemler ne kadar ideal olursa olsun sonlu sayıda işlemle mutlak sıfıra ulaşılamaz. [[K6 s. 73]]</p></article></div>
<aside class="note plain"><b>Atlas notu.</b> Kitap entropiyi birimsiz olarak niteler ve artışı koşulsuz ifade eder. [[K6 s. 73]] Doğrusu, termodinamik entropinin SI biriminin J/K olması ve yalıtılmış sistemde entropinin tersinir süreçte sabit kalıp tersinmez süreçte artmasıdır. [[K6 s. 73]]</aside>
<p>Buzdolabı örneğinde iki ayrı soru sorun: soğuk iç hacimden çıkan ısı nereye gidiyor ve bunun daha sıcak ortama taşınmasını hangi iş mümkün kılıyor? [[K6 s. 72]] İlk soru enerjinin hesabını tutturur, ikincisi sürecin neden kendiliğinden yürümeyeceğini açıklar. [[K6 s. 72–73]]</p>
<p>C. P. Snow’un oyun benzetmesinde ilk yasa karşılıksız kazancı dışlar, ikincisi düzensizliğin artışını hatırlatır, üçüncüsü mutlak sıfıra ulaşarak oyundan çıkmanın yolunu kapatır. [[K6 s. 73]]</p>
</section>
<section class="wrap blk ders-sec" id="fk04b-gaz">
<h2>Sıkıştırma, genleşme ve valfteki sıcaklık</h2>
<p class="intro">Gaz genleşirken iş yapar, süreç adyabatikse dışarıyla ısı alışverişi olmadığından bu iş gazın iç enerjisinden karşılanır. [[K6 s. 73–74]]</p>
<div class="viz"><div class="viz-head"><h3>Pompanın valfi neden hızlı şişirmede ısınır?</h3></div><div data-viz="fk04b_pompa"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Pompa, valf ve lastiği bir sistem olarak düşünün: hızla sıkıştırılan gazın sıcaklığı yükselir ve valf dokununca sıcak hissedilir. [[K6 s. 74]] Isı alışverişine çok az zaman kaldığından bu kısa süreç yaklaşık adyabatiktir, yavaş şişirmede ise ısı çevreye dağılır. [[K6 s. 74]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap sistemden çıkan enerjiyi pozitif sayar ve adyabatik genleşme için Δ<i>U</i> = 0 yazar. [[K6 s. 72–74]] Doğrusu, Δ<i>U</i> = <i>Q</i> − <i>W</i> gösteriminde sisteme giren ısının ve sistemin yaptığı işin pozitif olmasıdır, dolayısıyla adyabatik genleşmede <i>Q</i> = 0 ve Δ<i>U</i> = −<i>W</i> olur. [[K6 s. 72–74]]</aside>
<p>İç enerji hesabına başlamadan önce sınırdan neyin geçtiğini belirleyin: dış dünyayla bütün alışverişi kesilmiş bir sistem enerji kazanamaz veya kaybedemez. [[K6 s. 71–72]] Yalnız ısı geçişinin engellendiği bir sistem ise çevreye iş yapabilir, bu yüzden ısı yalıtımı tek başına iç enerjinin sabit olduğunu göstermez. [[K6 s. 72–74]]</p>
<p><b>Joule–Thomson etkisi.</b> Gaz yüksek basınçtan düşük basınca geçerken sıcaklığı değişir, çoğu gaz bu sırada soğur. [[K6 s. 74]]</p>
<ul class="ozet"><li><b>Medikal gaz tüpü.</b> Tüp boşalırken çıkan gazın sıcaklığı düşer, valfte oluşabilecek buz çıkışı tıkayabileceğinden gazlar kuru saklanır. [[K6 s. 74]]</li>
<li><b>Kriyoprob.</b> Tüp çıkışında güvenlik sorunu oluşturabilen soğuma, kriyoprobda istenen sonuçtur: sıkıştırılmış gaz hızla genleşerek probu soğutur. [[K6 s. 74]]</li>
<li><b>Anestezi makinesi.</b> Borulardaki gaz atmosfer basıncından tüp basıncına hızla sıkıştırılırsa sıcaklığı yükselir. [[K6 s. 74]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk04b-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div data-viz="mtf" data-q="fk04b-1"></div><div data-viz="mtf" data-q="fk04b-2"></div><div data-viz="mtf" data-q="fk04b-3"></div></section>
<section class="wrap blk ders-sec" id="fk04b-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Anestezi altında sıvı verdiğiniz bir hastada timpanik ölçüm beklediğinizden düşük. Ölçümü nasıl sorgular, sürekli izlem için hangi probu seçer ve infüzyon hattını nasıl düzenlersiniz?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Gerçek soğuma olasılığını değerlendirin: çekirdek sıcaklığından daha soğuk sıvılar özellikle yüksek hacimde verildiğinde hastadan ısı alır. [[K6 s. 66]]</li>
<li>Ölçümün kaynağını açıklayın: zarın yaydığı kızılötesi ışınım termopilde elektriksel sinyale çevrilir. [[K6 s. 70]]</li>
<li>Anatomi, kir ve görüş hattını sorgulayın: kulağı yukarı kaldırmak probun yaklaşık 2 °C daha soğuk kanal duvarı yerine zarı görmesini kolaylaştırır. [[K6 s. 70–71]]</li>
<li>Sürekli ölçümü örnekleyin: özofageal bir termistörün düşük kütlesi hızlı yanıta, elektronik monitör otomatik kayda olanak verir. [[K6 s. 68–69]]</li>
<li>Hattı akış yönünde tarif edin: soğuyan hastada yüksek hacimli sıvıyı yaklaşık çekirdek sıcaklığına kadar ısıtın, ısınırken genleşen gaz için tutucu sıklıkla ısıtıcıdan sonra yer alır. [[K6 s. 66]]</li></ol>
<div class="note"><b>Çizin.</b> Kanal duvarını gören prob ile kulak yukarı kaldırıldığında zarı gören probu yan yana çizin, ışınımın kaynaktan algılayıcıya yönünü işaretleyin. [[K6 s. 70–71]]</div>
<h3>Olası ek sorular</h3><ul><li>Platin tel yerine NTC termistör seçerseniz kalibrasyon nasıl değişir?</li><li>Termokuplun referans birleşimini hangi devreyle ikame edebilirsiniz?</li><li>Tüp valfinde buzlanma nasıl gelişir?</li></ul></section>
<section class="wrap blk ders-sec" id="fk04b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Vücuttan ısı kaybının en büyük payı ışınıma aittir (%40), terle soğuma ise terin buharlaşmasına bağlıdır. [[K6 s. 65]]</li>
<li>İnfüzyon hattında ısınan kabarcık genleşir, bu nedenle tutucu sıklıkla ısıtıcının hasta tarafında yer alır. [[K6 s. 66]]</li>
<li>Termometreler sıcaklıkla öngörülebilir biçimde değişen bir özelliği ölçer, elektronikte termistör ve termokupl sık kullanılan duyarlı algılayıcılardır. [[K6 s. 75]]</li>
<li>İki birleşimli termokuplda gerilimi doğuran, birleşimlerin sıcaklık farkıdır. [[K6 s. 75]]</li>
<li>Timpanik ölçümde zar yerine kanal duvarından ışınım alınması yanlış düşük değere yol açabilir. [[K6 s. 70–71]]</li>
<li>İç enerji değişimi verilen ısıdan yapılan iş çıkarılarak bulunur, soğuktan sıcağa ısı taşımak iş gerektirir ve mutlak sıfıra sonlu adımda erişilemez. [[K6 s. 72–73]]</li>
</ul><div data-viz="tamam" data-modul="fizik" data-bolum="04b"></div>
<nav class="ders-gec"><a href="#/dersler/fizik/04a">← Isı, sıcaklık, ısı aktarımı ve siyah cisim ışıması</a><a href="#/dersler/fizik/05a">Sonraki: Dalgaların özellikleri, ses ve elektromanyetik dalgalar →</a></nav></section>`,
};
