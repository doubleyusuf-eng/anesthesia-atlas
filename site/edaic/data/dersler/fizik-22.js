VERI.sorular = VERI.sorular || {};
VERI.sorular['fk22-1'] = {
  no: 1, kok: 'Kara kutu modeli, transdüserler ve fizyolojik sinyaller', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 365–368]]',
  onermeler: [
    { t: 'EKG ölçümü doğası elektriksel olmadığı için mutlaka mekanik bir transdüser gerektirir.', d: false, n: 'Kalbin elektriksel aktivitesi zaten elektriksel olduğundan transdüser gerektirmez; ancak gürültüsüz veri için sinyal koşullandırma genellikle yine gereklidir. [[K6 s. 367]]' },
    { t: 'Kara kutu modelinde sinyal işleme basamağı A–D dönüştürücünün ürettiği sayısal veriyi algoritma ile klinik değişkene çevirir.', d: true, n: 'A–D dönüşümünden sonra mikroişlemci, bazen kalibrasyon verilerini de katarak matematiksel bir algoritma ile klinik değişkeni üretir. [[K6 s. 366]]' },
    { t: 'Çözünmüş oksijen kısmi basıncı (PO₂) Severinghaus elektrodu ile ölçülür.', d: false, n: 'Tablo 22.2’ye göre çözünmüş PO₂ Clark elektrodu ile, çözünmüş PCO₂ ise Severinghaus elektrodu ile ölçülür (pH cam elektrotladır). [[K6 s. 368]]' },
    { t: 'İnvaziv arteriyel ve venöz kan basıncı ölçümlerinde bağlı yarı iletken gerinim ölçer transdüserleri kullanılabilir.', d: true, n: 'Tablo 22.1’de hem arteriyel (30–300 mmHg) hem venöz (−5 ile +20 mmHg) invaziv basınç için bağlı yarı iletken gerinim ölçer listelenir. [[K6 s. 367]]' },
    { t: 'Bazı transdüserler akım veya gerilim üretmek yerine devrenin direnç gibi bir elektriksel özelliğini değiştirir.', d: true, n: 'Ölçülen nicelik değiştikçe kimi transdüserler akım/gerilim üretirken kimileri devre direnci gibi bir özelliği değiştirir. [[K6 s. 366–367]]' },
  ],
};
VERI.sorular['fk22-2'] = {
  no: 2, kok: 'Sinyal koşullandırma, filtreler ve A–D dönüşüm', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 368–372]]',
  onermeler: [
    { t: 'Yükseltici devrede 0 ile 1 arasında bir kazanç değeri, girişten daha küçük genlikli bir çıkış üretir.', d: true, n: 'Kazanç çıkış geriliminin giriş gerilimine oranıdır; 0–1 arası bir kazanç sinyali küçültür (zayıflatır). [[K6 s. 368–369]]' },
    { t: 'Sinyali mümkün olan en erken aşamada yükseltmek, mevcut gürültüyü yok ederek sinyal–gürültü oranını doğrudan artırır.', d: false, n: 'Erken yükseltme sonraki aşamalarda eklenecek gürültüye karşı sinyali güçlendirir ama var olan gürültüyü de aynı oranda büyütür; gürültüyü ortadan kaldırmaz. [[K6 s. 369–370]]' },
    { t: 'İdeal bir bant geçiren filtrenin geçiş bandındaki kazancı 1, durdurma bandındaki kazancı 0 olarak düşünülür.', d: true, n: 'Filtre, geçirdiği frekans aralığında (geçiş bandı) kazancı 1, engellediği aralıklarda (durdurma bandı) kazancı 0 olan frekans seçici bir yükseltici gibidir. [[K6 s. 370–371]]' },
    { t: 'İşlemsel yükselticilerin (op-amp) kazancı bir çipe yerleştirildikten sonra ayarlanamaz.', d: false, n: 'Op-amp’ler küçük, ucuz ve çok yönlü olup kazançları 1’den en az 10⁶’ya kadar çok geniş aralıkta ayarlanabilir. [[K6 s. 369]]' },
    { t: 'Analog sinyaller dijital sinyallere kıyasla uzun ağlarda aktarım sırasında bozulmaya karşı daha dirençlidir.', d: false, n: 'Bozulmaya ve distorsiyona daha dirençli olup uzun ağlarda doğru aktarılabilen ve algoritmalarla işlenebilen dijital (0 ve 1) sinyallerdir. [[K6 s. 371–372]]' },
  ],
};
VERI.sorular['fk22-3'] = {
  no: 3, kok: 'Donanım, ekranlar, kablosuz ağlar ve elektronik kayıtlar', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 372–376]]',
  onermeler: [
    { t: 'Dokunmatik bir ekran hem görüntü verdiği hem dokunma verisi aldığı için aynı anda giriş ve çıkış aygıtıdır.', d: true, n: 'Dokunmatik monitör görüntü çıktısı verirken dokunmayla bilgisayara girdi göndererek iki işlevi birleştirir. [[K6 s. 372]]' },
    { t: 'OLED ekranlarda ışık yayan katman ince organik filmlerden oluşur ve güç tüketimi düşüktür.', d: true, n: 'OLED ince hidrokarbon ışık yayan filmleriyle derin kontrast ve özellikle düşük güç tüketimi sunar. [[K6 s. 374]]' },
    { t: 'Bluetooth LE (düşük enerji), radyo dalgaları dokuya çok iyi nüfuz ettiği için implante kalp pillerinde standarttır.', d: false, n: 'Ne Bluetooth ne Bluetooth LE implante cihazlarda genellikle kullanılmaz; çünkü bu frekanstaki radyo dalgaları insan dokusuna iyi nüfuz etmez. [[K6 s. 375]]' },
    { t: 'Wi-Fi (2–5 GHz) ve Bluetooth (2,402–2,480 GHz) örtüşen frekansları nedeniyle birbirleriyle girişim yapabilir.', d: true, n: 'Her iki teknoloji de bazı ortak frekansları kullandığı için cihazlar arasında girişim ortaya çıkabilir. [[K6 s. 375]]' },
    { t: 'Elektronik sağlık kaydı (EHR), birden fazla kurum arasında paylaşılabilen kişisel bir sağlık belgesidir.', d: true, n: 'EMR genellikle hastane intraneti içi hasta notlarını, EHR ise birden çok kurum ve kuruluş arasında şifreli paylaşılan bireysel sağlık belgesini ifade eder. [[K6 s. 375]]' },
  ],
};

(function () {
  const nav = [
    ['kara', 'Kara kutu'], ['transduser', 'Transdüserler'], ['prob', 'Optik prob'], ['kazanc', 'Yükseltme'], ['kosul', 'Gürültü ve filtre'],
    ['ad', 'A–D dönüşüm'], ['donanim', 'Ekranlar'], ['bilgisayar', 'Donanım ve saklama'], ['ag', 'Ağ ve kayıtlar'],
    ['kayit', 'Elektronik kayıt'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  function sekil(ad, baslik, alt) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk22_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  }
  SAYFALAR['dersler/fizik/22'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 22', baslik: 'Sinyal işleme, saklama ve gösterim',
    lede: 'Çoğu hastane monitörü farklı ham verileri neredeyse aynı “kara kutu” zincirinden geçirir: sensör → yükseltme ve filtreleme → A–D dönüşüm → algoritma → saklama ve gösterim. [[K6 s. 365–366]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk22-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk22-kara">
<h2>“Kara kutu” yaklaşımı ve ölçüm zinciri</h2>
<p class="intro">Elektronik cihazların karmaşık iç bileşenleri “kara kutu” diye özetlenir; böylece cihazın işlevi, iç devrelerin ayrıntılarına girmeden anlatılabilir. [[K6 s. 365]]</p>
${sekil('kara', 'Fizyolojik ölçümde “kara kutu” işlem zinciri', 'Beş adımı izleyerek ham biyosinyalden klinik veriye geçişi görün. [[K6 s. 365–366]]')}
<p><b>Ölçülen büyüklük (measurand)</b> kan basıncı veya deri sıcaklığı gibi ilgilenilen niceliktir. [[K6 s. 365]] Fiziksel veya kimyasal süreçle buna yanıt veren sensör (enerji biçimini değiştiriyorsa <b>transdüser</b>, örneğin gerinim ölçer basınç sensörü) genliği çoğu kez küçük olan ve gürültü içerebilen bir ham biyosinyal (biyolojik kökenli sinyal) üretir. [[K6 s. 365–366]]</p>
<p>Sinyal önce <b>yükseltme</b> ve <b>filtreleme</b> ile koşullandırılır, ardından <b>analog–dijital (A–D) dönüştürücü</b> ile sayılara çevrilir. [[K6 s. 366]] Mikroişlemci, bazen kalibrasyon verisini de kullanan bir <b>algoritma</b> (matematiksel denklem) ile sinyali işleyerek klinik değişkene dönüştürür; sayısal veri kolayca saklanır, gösterilir ve ağ üzerinden iletilir. [[K6 s. 366]]</p>
<div class="cols"><div class="card"><h3>Girişte ne değişiyor?</h3><p>Ameliyathane monitöründe basınç kanalı ile sıcaklık kanalını düşünün: hastaya bağlanan sensörün hangi değişikliğe yanıt verdiği, ölçmek istediğiniz büyüklüğe bağlıdır. [[K6 s. 365]] Gerinim ölçerde mekanik zorlanma elektriksel bir değişikliğe dönüşür ve bu değişiklik basınç hakkında bilgi taşır. [[K6 s. 365]]</p></div>
<div class="card"><h3>Çıkışta ne okunuyor?</h3><p>Ham sinyalin genliğini artırmak ve istenmeyen bileşenlerini azaltmak, onu işlemeye hazırlar. [[K6 s. 366]] Çoğu modern cihazda mikroişlemci, sayısallaştırılmış ölçüm ile sonuç arasındaki matematiksel ilişkiyi kullanarak klinik değişkeni yüksek doğrulukla hesaplayabilir. [[K6 s. 366]] Aynı sayısal sonuç monitörde gösterilebilir, sonradan erişilmek üzere saklanabilir veya yerel ağdan başka bir bilgisayara gönderilebilir. [[K6 s. 366]]</p></div></div>
<p>“Kara kutu” tek bir fiziksel parçanın adı değildir: basamaklar ayrı bileşenlerde de tek bir cihaz içinde de bulunabilir. [[K6 s. 365–366]] Basınç ve sıcaklık gibi farklı ölçümlerde ortak olan, ilk verinin nasıl toplandığından çok, toplandıktan sonra izlediği yoldur. [[K6 s. 365]]</p>
</section>

<section class="wrap blk ders-sec" id="fk22-transduser">
<h2>Transdüserler ve fizyolojik sinyal aralıkları</h2>
<p class="intro">Transdüser, enerjiyi bir biçimden diğerine (genellikle elektriksel olmayan bir olguyu elektriksel sinyale) çeviren aygıttır. [[K6 s. 366]]</p>
${sekil('transduser', 'Sistemlere göre ölçüm aralıkları ve transdüserler', 'Kardiyovasküler, solunum ve diğer sinyalleri seçerek inceleyin. [[K6 s. 367–368]]')}
<p>Kimi transdüserler doğrudan akım veya gerilim üretirken kimileri ölçülen büyüklüğe göre devrede direnç gibi bir elektriksel özelliği değiştirir; seçimde büyüklüğün doğası, aralığı, gereken doğruluk, ölçüm yeri ve maliyet dikkate alınır. [[K6 s. 366–367]] Gözle okunan sıvı termometresi elektriksel dönüşüm istemez; kalbin elektriksel etkinliği (EKG) ise zaten elektriksel olduğundan transdüser gerektirmez (yalnız koşullandırma ister). [[K6 s. 367]]</p>
<h3>Ölçüm yerinden yönteme</h3>
<p>Sensör seçerken önce ölçüm yerini ve beklenen değer aralığını belirleyin: aort ile internal juguler vende basınç ölçülebilir, ancak bu iki yer için verilen tipik aralıklar farklıdır. [[K6 s. 367]] Sonra gereken doğruluğu ve maliyeti birlikte düşünün: her fizyolojik büyüklük için tek bir teknik zorunlu değildir. [[K6 s. 367]]</p>
<p>Tabloları soldan sağa okuyun: ilk sütun klinik değişkeni, son sütun hangi fiziksel işaretin bu değişkene erişim sağladığını gösterir. [[K6 s. 367–368]] Örneğin kalp hızını bulmak için kalbin elektriksel etkinliği, arter basıncının dalga biçimi veya optik nabız kaydı kullanılabilir. [[K6 s. 367]] Kanın damardaki akımını ölçmek içinse elektromanyetik akımölçer ya da ultrasonik Doppler akımölçer seçilebilir. [[K6 s. 367]]</p>
<div class="tbl-wrap"><table class="tbl fk22-tablo"><caption>Tablo 22.1 · Kardiyovasküler sistem sinyalleri [[K6 s. 367]]</caption><thead><tr><th>Ölçülen</th><th>Tipik aralık</th><th>Transdüser / yöntem</th></tr></thead><tbody>
<tr><td>Arter basıncı (aort veya radyal arter, invaziv)</td><td>30–300 mmHg</td><td>Bağlı yarı iletken gerinim ölçer [[K6 s. 367]]</td></tr>
<tr><td>Ven basıncı (ör. internal juguler ven, invaziv)</td><td>−5 ile +20 mmHg</td><td>Bağlı yarı iletken gerinim ölçer [[K6 s. 367]]</td></tr>
<tr><td>Kalp hızı</td><td>25–200 atım/dk</td><td>EKG, arter dalgası veya PPG’den türetilir [[K6 s. 367]]</td></tr>
<tr><td>Kan akımı (arter/ven)</td><td>0–300 mL·s⁻¹</td><td>Elektromanyetik veya ultrasonik Doppler akımölçer [[K6 s. 367]]</td></tr>
<tr><td>Kalp debisi</td><td>0,5–25 L·dk⁻¹</td><td>Termodilüsyon yöntemi [[K6 s. 367]]</td></tr>
<tr><td>Fotopletismografi (PPG)</td><td>—</td><td>Geçirimli/yansıtmalı prob (iki yayıcı + fotodiyot) [[K6 s. 367]]</td></tr>
<tr><td>Oksijen satürasyonu</td><td>%70–100</td><td>PPG’den türetilir [[K6 s. 367]]</td></tr>
</tbody></table></div>
<div class="tbl-wrap"><table class="tbl fk22-tablo"><caption>Tablo 22.2–22.3 · Solunum ve diğer fizyolojik sinyaller [[K6 s. 367–368]]</caption><thead><tr><th>Ölçülen</th><th>Tipik aralık</th><th>Transdüser / yöntem</th></tr></thead><tbody>
<tr><td>Solunum hızı</td><td>5–50 soluk/dk</td><td>Termistör, CO₂ dedektörü veya gerinim ölçer [[K6 s. 367]]</td></tr>
<tr><td>Solunum akım hızı</td><td>0–10 L·s⁻¹</td><td>Fleisch pnömotakografı [[K6 s. 367]]</td></tr>
<tr><td>Tidal hacim</td><td>250–750 mL</td><td>Spirometre / pnömotakograftan integre akım [[K6 s. 368]]</td></tr>
<tr><td>Ekspire CO₂ derişimi</td><td>%2,5–9,0</td><td>Kızılötesi sensör [[K6 s. 368]]</td></tr>
<tr><td>Akciğer difüzyonu (CO)</td><td>12–35 mL CO·mmHg⁻¹·dk⁻¹</td><td>Kızılötesi sensör (CO absorpsiyonu) [[K6 s. 368]]</td></tr>
<tr><td>pH</td><td>6,8–7,8</td><td>Cam elektrot [[K6 s. 368]]</td></tr>
<tr><td>Çözünmüş CO₂ kısmi basıncı</td><td>2–9 kPa</td><td>Severinghaus elektrodu [[K6 s. 368]]</td></tr>
<tr><td>Çözünmüş O₂ kısmi basıncı</td><td>6–18 kPa</td><td>Clark elektrodu [[K6 s. 368]]</td></tr>
<tr><td>Santral sıcaklık</td><td>20–40 °C</td><td>Faringeal probda termokupl veya termistör, damar içinde termistör [[K6 s. 368]]</td></tr>
<tr><td>Deri sıcaklığı</td><td>12–38 °C</td><td>Deri üzerine yerleştirilen termokupl veya termistör [[K6 s. 368]]</td></tr>
<tr><td>Galvanik deri direnci</td><td>1–500 kΩ</td><td>EKG benzeri yüzey elektrotları [[K6 s. 368]]</td></tr>
</tbody></table></div>
<h3>Tablodaki ölçümleri birbirinden ayırın</h3>
<div class="cols"><div class="card"><h3>Akım mı, hacim mi?</h3><p>Fleisch pnömotakografıyla ölçülen solunum akımı, bir saniyede geçen gaz hacmi olarak L·s⁻¹ birimiyle ifade edilir. [[K6 s. 367]] Tek bir soluktaki hacmi elde etmek için akım sinyali zaman boyunca toplanabilir; kitap bu yöntemi doğrudan spirometreyle ölçümün yanında verir. [[K6 s. 368]] Bu nedenle 0–10 L·s⁻¹ akım satırına, 250–750 mL ise tidal hacim satırına aittir. [[K6 s. 367–368]]</p>
<p>Solunum hızında aranan bilgi yine farklıdır: dakikadaki soluk sayısı için termistör, CO₂ dedektörü veya gerinim ölçer kullanılabilir. [[K6 s. 367]] Aynı sistemden alınan ölçümlerde aranan değişkeni söylemek, neden farklı algılayıcı ve birim seçildiğini açıklar. [[K6 s. 367–368]]</p></div>
<div class="card"><h3>Gaz nerede ve hangi biçimde?</h3><p>Ekspire edilen gazda CO₂ derişimi yüzde olarak bildirilir ve kızılötesi sensörle ölçülür. [[K6 s. 368]] Çözünmüş CO₂ için tablonun verdiği büyüklük ise kısmi basınçtır; birim kPa, algılayıcı Severinghaus elektrodudur. [[K6 s. 368]] CO ile akciğer difüzyon kapasitesi ölçülürken kızılötesi sensör CO absorpsiyonunu izler; sonuç mmHg ve dakika başına CO hacmi (mL CO·mmHg⁻¹·dk⁻¹) olarak ifade edilir. [[K6 s. 368]]</p>
<p>Merkezî sıcaklık için probun yerini de belirtin: faringeal prob termokupl veya termistör içerebilirken damar içi sensör için termistör verilir. [[K6 s. 368]] Deri sıcaklığı için eleman deri üzerine yerleştirilir; galvanik deri direnci ise EKG elektrotlarına benzer yüzey elektrotlarıyla ölçülür. [[K6 s. 368]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="fk22-prob">
<h2>Optik probdan oksijen satürasyonuna</h2>
<p class="intro">Puls oksimetrede prob bir optik dalga biçimi sağlar, oksijen satürasyonu ise bu dalgadan hesaplanır. [[K6 s. 367–372]]</p>
${sekil('prob', 'Geçirimli probun iç yüzleri', 'Yayıcıları ve fotodiyodu seçerek algılamanın hangi parçalara dayandığını inceleyin. [[K6 s. 367]]')}
<p>K6, fotopletismografi için geçirimli veya yansıtmalı prob tanımlar: her iki durumda da parça listesinde iki yayıcı ve bir fotodiyot vardır. [[K6 s. 367]] Geçirimli düzende bir tarafta ışığı veren iki eleman, karşı tarafta iletilen ışığı algılayan eleman bulunur. [[K6 s. 367]]</p>
<p>Tablodaki %70–100 aralığı hesaplanan oksijen satürasyonuna aittir; fotopletismogram satırında bir sayısal aralık verilmez. [[K6 s. 367]] Burada sensörün çıktısı ile monitörde gösterilen değer arasındaki basamağı adlandırmak önemlidir: cihaz optik dalganın sayısal karşılığını kendi algoritmasına girdi olarak verir. [[K6 s. 372]]</p></section>
<section class="wrap blk ders-sec" id="fk22-kazanc">
<h2>Yükseltme: hangi gerilim kaç kat büyür?</h2>
<p class="intro">Küçük bir biyosinyali zincirin başında yükseltmek, sonraki devrelerde eklenen gürültünün ölçümü bastırma olasılığını azaltır. [[K6 s. 369]]</p>
${sekil('kazanc', 'Giriş ve çıkış gerilimi', 'Kaydırıcı giriş gerilimini değiştirir. Kazancı seçip aynı girişin çıkışta kaç milivolta karşılık geldiğini okuyun. [[K6 s. 368–369]]')}
<p>Yükseltici sinyal genliğini değiştiren aygıttır; bir ses sisteminde ses düzeyi düğmesini çevirmek yükselticinin kazancını değiştirir. [[K6 s. 368–369]] Çıkış geriliminin giriş gerilimine oranı kazancı verir: <i>G</i> = <i>V</i><sub>çıkış</sub> / <i>V</i><sub>giriş</sub>. [[K6 s. 368–369]] İki gerilimi aynı birimde yazdığınızda kazanç birimsiz bir çarpandır. [[K6 s. 368–369]]</p>
<div class="cols"><div class="card fk22-hesap"><h3>Hesap · EKG elektrodu</h3><p>Giriş genliği yaklaşık 1 mV olan bir EKG için kitap yaklaşık 1000 kazanç verir. [[K6 s. 369]] <i>V</i><sub>çıkış</sub> = <i>G</i> × <i>V</i><sub>giriş</sub> ≈ 1000 × 1 mV = 1000 mV = 1 V. [[K6 s. 368–369]] Kazancı 2 seçerseniz aynı girişte çıkış 2 mV olur; 0 ile 1 arasındaki kazançta çıkış girişten küçük kalır. [[K6 s. 369]]</p></div>
<div class="card"><h3>Kazancı biyosinyale uydurmak</h3><p>EEG elektrodundan alınan gerilim çok küçüktür; bu yüzden EEG için çok yüksek kazanç gerekir. [[K6 s. 369]] Tıbbi cihazlarda kullanılan işlemsel yükselticiler küçük bir çipe sığar, ucuz ve güvenilirdir. [[K6 s. 369]] Aynı devre türünün farklı ölçümlerde işe yaramasının bir nedeni, kazancın 1’den en az 10⁶’ya kadar ayarlanabilmesidir. [[K6 s. 369]]</p></div></div>
<h3>Sinyal büyüdüğünde gürültüye ne olur?</h3>
<p>Sinyal–gürültü oranı (<i>SNR</i>), yararlı sinyalin genliğinin gürültü genliğine oranıdır: <i>SNR</i> = <i>V</i><sub>sinyal</sub> / <i>V</i><sub>gürültü</sub>; sinyalin elektriksel gürültüyle ne ölçüde bozulduğunu anlatır. [[K6 s. 370]] Genlikleri aynı birimde ifade ederseniz bu oran da birimsizdir. [[K6 s. 370]] Oran düşük olduğunda kaydedilen dalgadan yararlı bilgiyi ayırmak güçleşir ve ek filtreleme gerekebilir. [[K6 s. 370]]</p>
<p>Gürültünün devreye nerede katıldığını sorun: girişte zaten bulunan gürültü ile yararlı sinyal aynı kazançla çarpılır, dolayısıyla bunların oranı değişmez. [[K6 s. 369–370]] Buna karşılık erken yükseltilen sinyal sonraki basamaklara daha büyük bir genlikle ulaşır ve orada eklenen gürültüye karşı daha iyi korunur. [[K6 s. 369]]</p><p>Şekilde aynı EKG girişini koruyup kazancı değiştirin: değişen, elektrottaki gerilim değil yükselticiden sonraki gerilimdir. [[K6 s. 368–369]] Sonra kazancı sabit tutup giriş genliğini değiştirin; çıkış gerilimi girişle aynı oranda değişir. [[K6 s. 368–369]] Bu iki durumda da sinyal–gürültü oranını hesaplayabilmek için yararlı genliğin yanında gürültü genliğini de bilmek gerekir. [[K6 s. 370]]</p>
</section>
<section class="wrap blk ders-sec" id="fk22-kosul">
<h2>Gürültünün kaynağı ve filtrenin geçirdiği bant</h2>
<p class="intro">Filtre sinyali frekansına göre geçirir veya bastırır; hangi filtrenin işe yarayacağı yararlı sinyal ile girişimin frekanslarına bağlıdır. [[K6 s. 370–371]]</p>
${sekil('filtre', 'Seçilen frekans filtreden geçer mi?', 'Renkli çizgi ideal bant geçiren filtrenin kazancını gösterir. [[K6 s. 370–371]] Frekansı değiştirip işaretin geçiş veya durdurma bandına düştüğünü okuyun. [[K6 s. 370–371]]')}
<p>Hastanede hem tıbbi cihazlar hem gündelik elektrikli aletler radyo frekansı bölgesinde elektromanyetik enerji yayabilir. [[K6 s. 369]] Genellikle önemsiz olan bu girişim, hasta monitörü gibi duyarlı ölçüm cihazlarında kayda karışabilir. [[K6 s. 369]] Güç hatları, floresan lambalar, araç ateşleme sistemleri, elektrik motorları, diyatermi cihazları, bilgisayarlar ve ekranlar örnek kaynaklardır. [[K6 s. 369]]</p>
<p>Girişimin etkisi kaynağın türüne, ölçüm yerine yakınlığına ve yapılan ölçüme bağlıdır; çoğu kez yararlı dalganın üstüne yüksek frekanslı bir bileşen biner. [[K6 s. 370]] Kaynak vücudun içinde de olabilir: titreyen hastada kasların elektriksel etkinliği EKG izinde görülebilir. [[K6 s. 369]] Küçük genlikli bir EKG’de girişim yararlı sinyali bütünüyle örtebilir ve yorumlamayı olanaksız kılabilir. [[K6 s. 370]]</p>
<p>Kitabın EKG örneğinde düşük frekanslı yararlı bileşenler korunurken bunların üzerindeki 50–60 Hz şebeke girişimi alçak geçiren filtreyle bastırılır. [[K6 s. 370]] Bant geçiren filtre ise hem alt hem üst sınır koyar: seçilen aralıkta (bant genişliği) kazanç 1, dışında 0 kabul edilir. [[K6 s. 370–371]] EMG örneğinde 7–20 Hz dışında kalan bileşenler çıkarıldığında ham verideki yararlı bilginin büyük ölçüde korunması beklenir. [[K6 s. 371]]</p>
<div class="cols">
<div class="card"><h3>Tablo 22.4 · Başlıca sinyal artefaktları</h3><ul>
<li><b>Şebeke girişimi:</b> 50 Hz (ABD 60 Hz) sinüs dalgaları. [[K6 s. 370]]</li>
<li><b>Hareket artefaktı:</b> Hasta hareket ettiğinde transdüserin deriyle teması bir an kesilebilir. [[K6 s. 370]]</li>
<li><b>Elektrot temas gürültüsü:</b> Elektrot ile deri arasındaki elektriksel temas yetersizse dalga biçimi bozulur. [[K6 s. 370]]</li>
<li><b>Taban çizgisi kayması:</b> Solunumla eşzamanlı düşük frekanslı kayma. [[K6 s. 370]]</li>
<li><b>Kas depolarizasyonu:</b> Kas kasılması istenmeyen potansiyeller üretir. [[K6 s. 370]]</li>
<li><b>Diyatermi:</b> Probun ucundaki yoğun alan tüm frekanslara yayılan girişime yol açarak EKG izini silebilir. [[K6 s. 370]]</li>
</ul></div>
<div class="card"><h3>Tablo 22.5 · Biyosinyal aralıkları</h3><ul>
<li><b>EEG:</b> 1–20 Hz · 10–100 μV [[K6 s. 371]]</li>
<li><b>EMG:</b> 7–20 Hz · 50 μV – 30 mV [[K6 s. 371]]</li>
<li><b>EKG:</b> 0,5–40 Hz · 0,1–5 mV [[K6 s. 371]]</li>
</ul></div>
</div>
<aside class="note plain"><b>Atlas notu.</b> Kitap, şebeke frekansını verdiği EKG bandının üzerinde gösterir. [[K6 s. 370–371]] Bu ilişki tanısal EKG’ye genellenemez: kaydedilen bant genişlediğinde şebeke frekansı yararlı bandın içine düşebilir. [[K6 s. 370–371]]</aside>
<aside class="note plain"><b>Atlas notu.</b> Kitap EMG için 7–20 Hz verir. [[K6 s. 371]] Doğrusu, yüzey EMG’nin frekans içeriği yüzlerce hertze (yaklaşık 10–500 Hz) uzanır; 7–20 Hz bandını yalnız kitabın filtre örneği olarak okuyun.</aside>
<div class="card"><h3>Grafiği okuyun · diyatermi sırasında kaybolan EKG</h3>
<p>Önce artefaktın kaynağını düşünün: ameliyathanede diyatermi probunun ucundaki yoğun elektrik alanı, dar bir frekansla sınırlı kalmayan girişim yaratır. [[K6 s. 370]] Buna karşılık şebeke girişiminin örüntüsü belirgindir; sinüs dalgası 50 Hz’de, ABD örneğinde ise 60 Hz’de görülür. [[K6 s. 370]]</p>
<p>Şekilde EKG’yi seçip işareti önce 20 Hz’e, sonra 50 Hz’e getirin: kitapta verilen EKG bandını temsil eden ideal filtre ilkini geçirir, ikincisini durdurur. [[K6 s. 370–371]] Aynı deneyi EMG için yaparken alt sınırı da izleyin: örneğin 1 Hz, EMG için verilen aralığın altında kaldığından bu kez alt uçtan elenir. [[K6 s. 371]]</p>
<p>Grafiğin düşey eksenini dalga genliğiyle karıştırmayın: burada okunan değer, seçilen frekanstaki çıkış genliğinin giriş genliğine oranıdır. [[K6 s. 368–371]] Bu yüzden geçiş bandında 1 okunması, EKG elektrodunun 1 mV verdiği anlamına gelmez; o frekanstaki bileşenin genliği korunur. [[K6 s. 369–371]]</p></div>
</section>

<section class="wrap blk ders-sec" id="fk22-ad">
<h2>Analog–dijital (A–D) dönüşüm</h2>
<p class="intro">Analog sinyal dalga biçiminin doğrudan kopyasıyken A–D dönüştürücü dalgayı ikili (0 ve 1) sayı dizisine çevirir. [[K6 s. 371]]</p>
${sekil('ad', 'Aynı kaynağın analog ve sayısal yolları', 'Plak, sayısal müzik ve puls oksimetre yollarını karşılaştırın. Hangi adımda bilgi sayı dizisine çevriliyor? [[K6 s. 371–372]]')}
<div class="cols"><div class="card"><h3>Analog kayıt · şekli korumak</h3><p>Ses dalgası da zamana göre değişen bir gerilim de analog olarak kaydedilebilir: kayıt, asıl dalganın biçimini temsil eder. [[K6 s. 371]] Mikrofon bir transdüserdir; sese karşılık gelen bir elektriksel dalga üretir. [[K6 s. 371]] Bu dalganın biçimi bir plak üzerindeki oluğa ya da ses bandındaki küçük manyetik parçacıkların konumlarına aktarılabilir. [[K6 s. 371]]</p></div>
<div class="card"><h3>Sayısal kayıt · sayıları korumak</h3><p>A–D dönüştürücüye aynı elektriksel dalgayı verirseniz bu kez elde edilen kayıt ikili rakamlardan, yani 0 ve 1’lerden oluşur. [[K6 s. 371]] Bu dizinin üzerinde matematiksel dönüşümler yapılabilir, dizi sabit diskte veya kompakt diskte saklanabilir ve veri paketleri halinde gönderilebilir. [[K6 s. 371–372]]</p></div></div>
<p>Bir müzik kaydının yolunu izleyin: stüdyodaki ses sayısallaştırılır, çevrim içi müzik mağazasına ve oradan mobil ağ üzerinden telefona ulaşır. [[K6 s. 371–372]] Sayısal kaydın bozulmaya daha az duyarlı olması, hem saklanan kaynağın aslına yakın yeniden üretilmesini hem de uzak ağlar üzerinden doğru aktarılmasını kolaylaştırır. [[K6 s. 372]]</p>
<p>Puls oksimetrede sayısallaştırmanın bir başka amacı vardır: bilgisayarın ham optik kayıttan klinik bir değişken hesaplayabilmesi. [[K6 s. 372]] Mikroişlemci, cihazda saklanan yazılımı çalıştırarak fotopletismogramdan oksijen satürasyonunu hesaplar. [[K6 s. 372]] Üretici, cihazın performansını iyileştirmek için bu yazılımı zaman içinde değiştirebilir veya güncelleyebilir. [[K6 s. 372]]</p>
</section>

<section class="wrap blk ders-sec" id="fk22-donanim">
<h2>Monitör görüntüyü nasıl oluşturur?</h2>
<p class="intro">Bir ekrandaki görüntüyü karşılaştırırken iki ayrı özelliğe bakın: pikselde ışığın nasıl oluştuğu ve görüntünün kaç pikselden oluştuğu. [[K6 s. 373–374]]</p>
${sekil('ekran', 'Pikselde ışığın kaynağı', 'Ekran türünü seçin. Işığın kaynağını, görüntünün nasıl oluştuğunu ve kullanım açısından öne çıkan özelliği karşılaştırın. [[K6 s. 373–374]]')}
<p><b>Çözünürlük</b>, resmi oluşturan görüntü hücrelerinin, yani piksellerin sayısını ifade eder ve genellikle genişlik × yükseklik olarak yazılır. [[K6 s. 373]] Örneğin 1600 × 1200 bir monitörde yatayda 1600, düşeyde 1200 piksel vardır; tam format 8K ekran için kitap 8192 × 4320 örneğini verir. [[K6 s. 373]] Bu sayılar büyüdükçe görüntünün çözünürlüğü artar. [[K6 s. 373]]</p>
<div class="cols"><div class="card"><h3>Işığı pikselin üretmesi</h3><ul>
<li><b>Plazma.</b> Küçük gaz ceplerine yeterince yüksek gerilim uygulandığında gaz ışık yayar. [[K6 s. 373]] Üretim görece ucuz olsa da LCD ve LED’e göre çözünürlüğü düşüktür; ağırlığı ve yüksek güç tüketimi nedeniyle yerini büyük ölçüde OLED’e bırakmıştır. [[K6 s. 373]]</li>
<li><b>LED.</b> Elektronik devre kırmızı, mavi ve yeşil ışık yayan diyotları açıp kapatır. [[K6 s. 373]] Diyotların verimi yüksektir ve üretim yöntemleri her pikseli oluşturan elemanların çok küçük yapılmasına, dolayısıyla yüksek kaliteli görüntüye olanak verir. [[K6 s. 373]]</li>
<li><b>OLED.</b> Işığı organik hidrokarbon zincirlerinden oluşan çok ince filmler yayar. [[K6 s. 374]] LED ekranda ise bu işi yarı iletkenler görür. [[K6 s. 374]] Yüksek çözünürlük ve derin kontrast sağlayan OLED ekranların özellikle düşük güç tüketimi bir avantajdır. [[K6 s. 374]]</li></ul></div>
<div class="card"><h3>Arka ışığın pikselden geçmesi</h3><p><b>LCD</b> ekranda belirli bir gerilim uygulandığında sıvı kristal saydamlaşır; filtrelerle arka aydınlatma birlikte parlak ve renkli bir görüntü oluşturur. [[K6 s. 374]] Pikseller çok küçük yapılabildiğinden birim alana çok sayıda piksel sığar; akıllı telefonda olduğu gibi yakından bakılan ekranlar için bu özellik elverişlidir. [[K6 s. 374]]</p><p>Kitap, yıllarca kullanılan katot ışın tüplerinin (CRT) büyük ölçüde kullanım dışı kaldığını ve ekranları LED/OLED, LCD ve plazma aileleri altında ele aldığını belirtir. [[K6 s. 373]]</p></div></div></section>

<section class="wrap blk ders-sec" id="fk22-bilgisayar"><h2>Donanım, yazılım ve depolama ortamı</h2>
<p class="intro">Bir monitörde dokunmayı algılayan yüzey, görüntüyü hesaplayan program ve veriyi saklayan sürücü farklı görevler üstlenir. [[K6 s. 372–373]]</p>
${sekil('bilgisayar', 'Bilgi hangi yönde hareket eder?', 'Çevre birimini seçin ve kullanıcı ile işlem birimi arasındaki okun yönünü izleyin. [[K6 s. 372]]')}
<p><b>Donanım</b> bilgisayarın fiziksel parçalarının tümüdür: ana işlem biriminde işlemci ve bellek bulunur; çevre birimleri bu birime bağlanır. [[K6 s. 372–373]] Yazıcı gibi bir çevre birimi ile mikroişlemci arasındaki iletişimi sağlayan arayüze veri yolu denir; USB (Universal Serial Bus) bir örnektir. [[K6 s. 372]] Okuma ve yazma yapabilen sabit disk gibi birimler kasanın içine de yerleştirilebilir. [[K6 s. 372]]</p>
<ul><li><b>Giriş.</b> Klavyede tuşlanan bilgi, farenin hareketi veya kameradan gelen görüntü bilgisayara gider. [[K6 s. 372]]</li>
<li><b>Çıkış.</b> Monitör bilgisayardan gelen elektronik sinyalleri alır ve ekranda bir görüntüye dönüştürür. [[K6 s. 372]]</li>
<li><b>İki yön.</b> Dokunmatik monitör görüntüyü kullanıcıya sunarken çıkış, kullanıcının dokunduğu bilgiyi bilgisayara iletirken giriş işlevi görür. [[K6 s. 372]]</li>
<li><b>Harici depolama.</b> Giriş ve çıkış aygıtlarının yanında üçüncü çevre birimi sınıfıdır; kaydedilen elektronik veriye daha sonra erişilmesini sağlar. [[K6 s. 372]]</li></ul>
<p><b>Yazılım</b> bilgisayarın yorumlayıp çalıştırdığı komut veya programlardır; kullanıcıya belirli bir işi yaptıran program bir uygulamadır. [[K6 s. 373]] <b>İşletim sistemi</b> de yazılımdır; uygulamaları yönetir, dosya işlemlerini yürütür ve bilgisayarın kaynaklarını denetler. [[K6 s. 373]]</p>
<h3>Veri nerede saklanır?</h3>
<ul><li><b>Manyetik ortam.</b> Manyetik bandı daha sonra disket izlemiştir; yüksek kapasiteli manyetik sabit diskler düşük maliyetleri sayesinde hem iç hem dış depolamada kullanılmıştır. [[K6 s. 372]]</li>
<li><b>Katı hâl sürücüsü (SSD).</b> SSD maliyetlerinin düşmesiyle kişisel bilgisayarlarda ana depolama görevi büyük ölçüde bu sürücülere geçmiştir. [[K6 s. 372–373]]</li>
<li><b>Optik ortam.</b> Salt okunur CD-ROM ve DVD-ROM, müzik ve filmlerin arşivlenmesi ve çok sayıda kopyasının dağıtılması için kullanılmıştır. [[K6 s. 373]]</li>
<li><b>Uzak ortam.</b> Kayıt internet üzerinden cihazın bulunduğu yer dışındaki bir depoya gönderilebilir; bulut depolama bu yaklaşımın yaygın bir örneğidir. [[K6 s. 373]]</li></ul></section>

<section class="wrap blk ders-sec" id="fk22-ag">
<h2>Hastane ağları, kablosuz aktarım ve elektronik kayıtlar</h2>
<p class="intro">Yerel alan ağları (LAN), Ethernet, Wi-Fi ve Bluetooth cihazlar ile hastane elektronik kayıtları arasında klinik veri taşır. [[K6 s. 374–375]]</p>
${sekil('ag', 'Ethernet, Wi-Fi, Bluetooth ve Bluetooth LE', 'Bağlantı türünü seçerek frekans, menzil ve tıbbi kullanım sınırlarını görün. [[K6 s. 374–375]]')}
<p>İnternet birçok ağın birbirine bağlanmasıyla oluşur; yerel alan ağı (LAN) ise daha küçük ölçekte klinik verilerin ve başka bilgilerin aktarılmasını sağlar. [[K6 s. 374]] Örneğin ameliyathanedeki bir hastanın yaşamsal bulguları yoğun bakımın merkezî monitöründe eşzamanlı gösterilebilir veya bir görüntüleme tetkiki uzaktan incelenebilir. [[K6 s. 374]]</p>
<p>Hastanenin yerel ağı merkezî bir sunucuyla internete bağlandığında ağdaki bilgisayarlar bu bağlantıdan yararlanabilir. [[K6 s. 374]] Bu kolaylıkla birlikte iki risk ortaya çıkar: bilgisayar virüsleri ve kişisel bilgilerin yetkisiz kişilerin eline geçmesi. [[K6 s. 374]] Bu nedenle hastane ağının dayanıklı olması ve gelişmiş siber güvenlik önlemleriyle korunması gerekir. [[K6 s. 374]]</p>
<div class="cols"><div class="card"><h3>Kabloyla aktarım</h3><p>Ethernet, verilerin yerel ağda nasıl iletileceğini belirleyen kurallar bütünüdür. [[K6 s. 374]] Kablolu bağlantı güvenilirlik ve güvenlik yanında çok yüksek veri aktarım hızlarına da olanak verir. [[K6 s. 374]] Birden çok cihaz bir hub veya yönlendiricide bir araya gelebilir; yönlendirici, bilgisayarlar ile ağın geri kalanı arasında veri paketlerinin gideceği yönü belirler. [[K6 s. 374]]</p></div>
<div class="card"><h3>Radyo dalgalarıyla aktarım</h3><p>Wi-Fi bir ağdaki çok sayıda cihaza hizmet ederken Bluetooth kısa mesafede bir cihazı diğeriyle eşleştirir. [[K6 s. 374]] Her ikisini kullanan tıbbi cihazlar da ölçümleri elektronik hasta kaydına gönderebilir ve kâğıda kayıt gereğini ortadan kaldırabilir. [[K6 s. 374]]</p></div></div>
<p>K6, Wi-Fi için 2–5 GHz ve genellikle yaklaşık 20 m, Bluetooth için 2,402–2,480 GHz ve yaklaşık 10 m verir. [[K6 s. 375]] Bantlar kısmen ortak olduğundan cihazlar birbirinde girişime yol açabilir; bağlantı zayıflarsa hem sinyal kalitesi hem veri aktarım hızı düşer. [[K6 s. 375]]</p>
<p><b>Bluetooth LE</b> daha az enerji ve maliyet gerektirecek biçimde tasarlanmıştır; küçük veri paketlerini seyrek göndermesi sayesinde minyatür bir cihaz düğme pille aylarca çalışabilir. [[K6 s. 375]] Bu aktarım biçimi sese uygun değildir; giyilebilir sürekli glukoz monitörleri ve insülin pompaları kullanım örnekleridir. [[K6 s. 375]] Kullanılan radyo frekansları insan dokusuna iyi nüfuz etmediğinden Bluetooth ve Bluetooth LE implante tıbbi cihazlarda genellikle tercih edilmez. [[K6 s. 375]]</p></section>
<section class="wrap blk ders-sec" id="fk22-kayit"><h2>Elektronik kayda kim, nereden erişir?</h2>
<p class="intro">Klinik kaydın saklandığı yer, kaybı önlemek için nasıl yedeklendiği ve kimlerle paylaşılabildiği ayrı sorulardır. [[K6 s. 375]]</p>
${sekil('kayit', 'Bir hasta kaydının erişim yolu', 'Hastane içindeki notlar ile kurumlar arası sağlık belgesini seçerek erişim yolunu izleyin. [[K6 s. 375–376]]')}
<p>Tıbbi kayıt güvenli biçimde korunmalıdır; elektronik kayıtta bunun için verinin çoğaltılması ve yedeğinin tutulması gerekir. [[K6 s. 375]] Amaç, ciddi bir veri kaybında başka bir kopyanın elde bulunmasıdır. [[K6 s. 375]] Hastaneler özellikle yedekleme işini, verileri hastane dışında saklayan uzman bir şirkete verebilir. [[K6 s. 375]]</p>
<p>Yerel saklamada dosya tıbbi cihazın, dizüstü bilgisayarın veya telefonun kendi sürücüsündedir. [[K6 s. 375]] Bulutta ise dosya başka bir yerde, üçüncü bir şirketin sahip olduğu ve bakımını yaptığı sunucularda tutulur; erişim internet üzerindendir. [[K6 s. 375]] Hastanenin yönetmediği bir buluta hasta bilgileri veya görüntüleri konduğunda hasta gizliliği ciddi biçimde ihlal edilebilir. [[K6 s. 375]]</p>
<div class="cols"><div class="card"><h3>EMR · elektronik tıbbi kayıt</h3><p>EMR çoğu kez hastanın tıbbi notları anlamına gelir; gerekli erişim yetkisi olan kişiler bu notları hastanenin iç ağı üzerinden okuyabilir. [[K6 s. 375]] Burada belirleyici olan, klinik notların kurum içinden erişilebilir olmasıdır. [[K6 s. 375]]</p></div>
<div class="card"><h3>EHR · elektronik sağlık kaydı</h3><p>EHR kişinin birden fazla sağlık kuruluşu ve kurum arasında paylaşılan sağlık belgesidir. [[K6 s. 375]] Şifrelenerek güvenli biçimde saklanır ve farklı konumlardan erişilebilir. [[K6 s. 375]] Bu paylaşım tıbbi kayıtların doğruluğunu ve anlaşılırlığını artırabilir; aynı tetkikin tekrarlanmasını ve tedavide gecikmeyi azaltabilir. [[K6 s. 375]] Hastanın kendi kayıtlarına erişimini ve klinik kurumlarla araştırma kurumlarının iş birliğini de kolaylaştırır. [[K6 s. 375–376]]</p></div></div><p>Bir görüntüleme tetkikini düşünün: klinisyenin başka bir odadan görüntüyü açabilmesi ağ üzerinden erişime, disk kaybından sonra dosyanın geri alınabilmesi ise yedek kopyaya dayanır. [[K6 s. 374–375]] Aynı tetkikin başka bir kurumda yeniden istenmesini azaltabilecek özellik ise kişinin sağlık belgesinin kurumlar arasında paylaşılmasıdır. [[K6 s. 375]] Böylece tek bir hasta örneği üzerinden erişim, kaybı önleme ve kaydı klinik bakımda yeniden kullanma amaçlarını ayırt edebilirsiniz. [[K6 s. 374–375]]</p>
</section>

<section class="wrap blk ders-sec" id="fk22-p1"><h2>Part I · Doğru mu, yanlış mı?</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div data-viz="mtf" data-q="fk22-1"></div><div data-viz="mtf" data-q="fk22-2"></div><div data-viz="mtf" data-q="fk22-3"></div></section>

<section class="wrap blk ders-sec" id="fk22-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><h3>Klinik ölçüm ve ekipman</h3><p>Bir hasta monitörünü “kara kutu” modeliyle basamak basamak anlatın. Sinyal koşullandırmada erken yükseltme ile bant geçiren filtrelemenin farklı rollerini ve A–D dönüşümünün neden gerekli olduğunu açıklayın. [[K6 s. 365–372]]</p></div>
<ol class="iskelet">
<li><b>Algılama.</b> Ölçülen büyüklük sensör/transdüser ile ham biyosinyale çevrilir (ör. basınçta gerinim ölçer; EKG zaten elektrikseldir). [[K6 s. 365–367]]</li>
<li><b>Erken yükseltme.</b> Küçük sinyal (EKG ≈ 1 mV, kazanç ≈ 1000; EEG için gereken kazanç daha yüksek) sonraki devre gürültüsünün üstünde kalması için erken yükseltilir; ancak bu işlem mevcut SNR’yi tek başına artırmaz. [[K6 s. 369–370]]</li>
<li><b>Filtreleme.</b> Kitabın EKG örneğinde alçak geçiren filtre üst frekanslardaki şebeke girişimini bastırır; ideal bant geçiren filtre seçilen bandın iki yanını da bastırır. [[K6 s. 370–371]]</li>
<li><b>A–D dönüşüm.</b> Analog dalga 0 ve 1’lere çevrilir; dijital veri bozulmaya dirençlidir, saklanır ve ağdan iletilir. [[K6 s. 371–372]]</li>
<li><b>Algoritma ve gösterim.</b> Mikroişlemci gerektiğinde kalibrasyon verisini kullanarak klinik değeri hesaplar (ör. puls oksimetrede SpO₂) ve ekranda (LCD/OLED) sunar. [[K6 s. 366–374]]</li>
</ol>
<p class="note"><b>Çizin.</b> Ölçülen büyüklük → Transdüser → Yükseltici + Filtre → A–D dönüştürücü → Mikroişlemci/Algoritma → Gösterim/Saklama blok şemasını ve kazanç–frekans bant geçiren filtre grafiğini çizin. [[K6 s. 366–371]]</p>
<p><b>Ek sorular.</b> Tablo 22.1–22.2’den üç transdüser örneği verin. Bluetooth LE implante cihazlarda neden genellikle tercih edilmez? EMR ile EHR arasındaki fark nedir? [[K6 s. 367–375]]</p></section>

<section class="wrap blk ders-sec" id="fk22-ozet"><h2>Özet</h2><ul class="ozet">
<li>Kara kutu ölçüm zinciri: ölçülen büyüklük → sensör/transdüser → yükseltme + filtreleme → A–D dönüşüm → algoritma → saklama/gösterim. [[K6 s. 365–366]]</li>
<li>Erken yükseltme sonraki gürültüye karşı sinyali güçlendirir ama mevcut gürültüyü silmez; filtreler istenmeyen frekans bantlarını (50–60 Hz vb.) bastırır. [[K6 s. 369–371]]</li>
<li>A–D dönüştürücü analog dalgayı ikili sayı dizisine çevirerek bozulmaya dirençli saklama ve algoritma işlemesi sağlar. [[K6 s. 371–372]]</li>
<li>OLED ince organik filmlerle yüksek kontrast ve düşük güç tüketimi sunar; LCD yüksek piksel yoğunluğuyla yakın izlemeye uygundur. [[K6 s. 374]]</li>
<li>Bluetooth LE seyrek küçük paketlerle uzun pil ömrü verir ama dokuya nüfuz zayıf olduğu için implantlarda genellikle tercih edilmez. [[K6 s. 375]]</li>
<li>EMR hastane içi hasta notları iken EHR kurumlar arası şifreli paylaşılan sağlık kaydıdır. [[K6 s. 375]]</li>
</ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="22"></div>
<nav class="ders-gec"><a href="#/dersler/fizik/21b">← Biyolojik potansiyeller: EKG, EMG, EEG ve kalp pilleri</a><a href="#/dersler/fizik/23">Sonraki: Ultrason →</a></nav></section>`,
  };
})();
