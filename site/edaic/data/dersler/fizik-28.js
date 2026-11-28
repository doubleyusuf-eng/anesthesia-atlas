VERI.sorular = VERI.sorular || {};
(function () {
  'use strict';
  const soru = (no, kok, kaynak, satirlar) => ({
    no, kok, kagit: 'Paper A · Fizik', kaynak,
    onermeler: satirlar.map(([t, d, n]) => ({ t, d, n })),
  });
  VERI.sorular['fk28-1'] = soru(1, 'SI birimlerini temel birimlerine ayırın.', '[[K6 s. 446–448]]', [
    ['Kuvvetin birimi kg·m·s⁻² olarak yazılabilir.', true, 'Newton, kütle ile ivmenin birimlerini birleştirir. [[K6 s. 447]]'],
    ['Manyetik alan şiddetinin birimi A·m⁻²’dir.', false, 'Alan şiddeti A·m⁻¹, akım yoğunluğu A·m⁻² ile ölçülür. [[K6 s. 447]]'],
    ['Joule, newton metreye eşittir.', true, 'İşin birimi N·m olarak da yazılır. [[K6 s. 446–447]]'],
    ['Kandela türetilmiş bir birimdir.', false, 'Işık şiddeti yedi temel nicelikten biridir ve birimi kandeladır. [[K6 s. 446]]'],
    ['Frekans ve radyonüklit aktivitesinin temel birimlerle gösterimi aynıdır.', true, 'Hertz ve becquerel için açılım s⁻¹’dir. [[K6 s. 447]]'],
  ]);
  VERI.sorular['fk28-2'] = soru(2, 'Gaz hesabı için yapılan dönüşümleri değerlendirin.', '[[K6 s. 448–449]]', [
    ['Bir milimol 1000 moldür.', false, 'Mili öneki binde biri gösterir, dolayısıyla 1 mmol = 0,001 mol. [[K6 s. 448–449]]'],
    ['1 kPa yaklaşık 7,5 mmHg eder.', true, 'Kısmi basınç için kitapta verilen dönüşüm 1 kPa = 7,5 mmHg’dir. [[K6 s. 449]]'],
    ['Bir litre bir metreküpe eşittir.', false, 'Bir litre, metreküpün binde biridir. [[K6 s. 449]]'],
    ['Gaz hesabında sıcaklık kelvin cinsinden kullanılmalıdır.', true, 'Santigrat dereceyle verilen sıcaklığa 273,15 eklenerek kelvin değeri bulunur. [[K6 s. 449]]'],
    ['Küçük m öneki mega anlamına gelir.', false, 'Mega büyük M, mili küçük m ile yazılır. [[K6 s. 448]]'],
  ]);
  VERI.sorular['fk28-3'] = soru(3, 'Solunum fizyolojisinde sembolleri okuyun.', '[[K6 s. 450–451]]', [
    ['İkincil sembol A arter kanını belirtir.', false, 'Büyük A alveolü, küçük a arter kanını gösterir. [[K6 s. 450]]'],
    ['Q kan hacmini gösterir.', true, 'Birincil sembollerden Q kan hacmini, V gaz hacmini belirtir. [[K6 s. 450–451]]'],
    ['Hacim sembolünün üstündeki nokta akımı belirtir.', true, 'Nokta zaman türevini gösterir ve hacmin zamana göre değişimi akımdır. [[K6 s. 450]]'],
    ['ET soluk sonunu (end-tidal) belirtir.', true, 'ET gazın yerini veya örnekleme evresini bildiren ikincil sembollerdendir. [[K6 s. 450–451]]'],
    ['c′ kapiller sonunu gösterir.', true, 'Kapilleri belirten c harfinden sonraki işaret son ucu belirtir. [[K6 s. 450–451]]'],
  ]);

  const nav = [['sabit','Fiziksel sabitler'], ['birim','SI birimleri'], ['onek','Önekler'], ['gaz','Gaz hesapları'], ['simge','Solunum sembolleri'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']];
  function tablo(basliklar, satirlar, sayfa) {
    return '<table class="fk28-tablo"><thead><tr>' + basliklar.map(b => '<th scope="col">'+b+'</th>').join('') +
      '</tr></thead><tbody>' + satirlar.map(([ad, bilgi, s]) => '<tr><th scope="row">'+ad+'</th><td>'+bilgi+' [[K6 s. '+(s || sayfa)+']]</td></tr>').join('') + '</tbody></table>';
  }
  const sabitler = tablo(['Sabit ve simgesi','Bölümde kullanılan değer'], [
    ['Pi · π','3,1415927'], ['Planck sabiti · h','6,626 × 10⁻³⁴ J·s'], ['Işık hızı · c','2,998 × 10⁸ m·s⁻¹'],
    ['Yerçekimi ivmesi · g','9,81 m·s⁻²'], ['Elektron yükünün büyüklüğü · e','1,602 × 10⁻¹⁹ C'],
    ['Stefan–Boltzmann sabiti · σ','5,670 × 10⁻⁸ W·m⁻²·K⁻⁴'], ['Avogadro sayısı · N<sub>A</sub>','6,022 × 10²³ mol⁻¹'],
    ['Evrensel gaz sabiti · R','8,314 J·mol⁻¹·K⁻¹'],
  ], 445);
  const temel = tablo(['Temel nicelik','Birim ve simgesi'], [
    ['Uzunluk','metre (m)'], ['Kütle','kilogram (kg)'], ['Zaman','saniye (s)'], ['Madde miktarı','mol (mol)'],
    ['Termodinamik sıcaklık','kelvin (K)'], ['Elektrik akımı','amper (A)'], ['Işık şiddeti','kandela (cd)'],
  ], 446);
  const turetilen = tablo(['Türetilmiş nicelik','Temel birimlerle okunuşu'], [
    ['Alan','metrekare (m²)'], ['Hacim','metreküp (m³)'], ['Sürat ve hız','saniye başına metre (m·s⁻¹)'],
    ['İvme','saniye kare başına metre (m·s⁻²)'], ['Dalga sayısı','metre başına (m⁻¹)',447],
    ['Kütle yoğunluğu','metreküp başına kilogram (kg·m⁻³)',447], ['Akım yoğunluğu','metrekare başına amper (A·m⁻²)',447],
    ['Manyetik alan şiddeti','metre başına amper (A·m⁻¹)',447],
  ], 446);
  const ozel = tablo(['Ölçülen nicelik','Özel birim adı, simgesi ve açılımı'], [
    ['Frekans','hertz · Hz = s⁻¹'], ['Kuvvet','newton · N = kg·m·s⁻²'],
    ['Basınç ve mekanik gerilme','pascal · Pa = N·m⁻² = m⁻¹·kg·s⁻²'], ['Enerji, iş ve ısı miktarı','joule · J = N·m = m²·kg·s⁻²'],
    ['Güç ve ışınım akısı','watt · W = J·s⁻¹ = m²·kg·s⁻³'], ['Elektrik yükü (elektrik miktarı)','coulomb · C = s·A'],
    ['Potansiyel farkı ve elektromotor kuvvet','volt · V = W·A⁻¹ = m²·kg·s⁻³·A⁻¹'],
    ['Elektriksel sığa','farad · F = C·V⁻¹ = m⁻²·kg⁻¹·s⁴·A²'], ['Elektrik direnci','ohm · Ω = V·A⁻¹ = m²·kg·s⁻³·A⁻²'],
    ['Elektriksel iletkenlik (kondüktans)','siemens · S = A·V⁻¹ = m⁻²·kg⁻¹·s³·A²'],
    ['Manyetik akı','weber · Wb = V·s = m²·kg·s⁻²·A⁻¹'], ['Manyetik akı yoğunluğu','tesla · T = Wb·m⁻² = kg·s⁻²·A⁻¹'],
    ['İndüktans','henry · H = Wb·A⁻¹ = m²·kg·s⁻²·A⁻²'], ['Celsius sıcaklığı','santigrat derece · °C (temel sıcaklık birimi K)'],
    ['Radyonüklit aktivitesi','becquerel · Bq = s⁻¹'], ['Soğurulan doz, aktarılan özgül enerji ve kerma','gray · Gy = J·kg⁻¹ = m²·s⁻²'],
    ['Doz eşdeğeri','sievert · Sv = J·kg⁻¹ = m²·s⁻²','447–448'],
  ], 447);
  const onekler = tablo(['Küçük kat','Büyük kat'], [
    ['atto (a) · 10⁻¹⁸','eksa (E) · 10¹⁸','448–449'], ['femto (f) · 10⁻¹⁵','peta (P) · 10¹⁵','448–449'],
    ['piko (p) · 10⁻¹²','tera (T) · 10¹²'], ['nano (n) · 10⁻⁹','giga (G) · 10⁹'],
    ['mikro (μ) · 10⁻⁶','mega (M) · 10⁶'], ['mili (m) · 10⁻³','kilo (k) · 10³'],
  ], 448);
  const gaz = tablo(['Gaz hesabında nicelik','Birimi nasıl seçeriz?'], [
    ['Basınç · P','SI birimi Pa = N·m⁻² = m⁻¹·kg·s⁻² olup basınç sıklıkla kPa ile verilir.'],
    ['Kısmi basınç · P<sub>gaz</sub>','Gazda da sıvıda da aynı basınç birimleri geçerlidir ve mmHg yaygın kullanılır.'],
    ['Sıcaklık · T','Hesapta daima kelvin kullanılır. [[K6 s. 449]] T(K) = T(°C) + 273,15.'],
    ['Hacim · V','SI birimi m³ olsa da litre yaygındır. [[K6 s. 449]] 1 L = 0,001 m³.'],
    ['Madde miktarı · n','Mol yerine sıklıkla milimol kullanılır. [[K6 s. 449]] 1 mmol = 0,001 mol.'],
    ['Kütle · m','1 kg = 1000 g.'],
  ], 449);
  const simgeler = tablo(['Gösterimdeki görev','Semboller nasıl okunur?'], [
    ['Birincil · değişken (italik)','<i>C</i> kandaki gaz içeriği, <i>F</i> fraksiyonel konsantrasyon, <i>P</i> basınç veya kısmi basınç, <i>Q</i> kan hacmi.'],
    ['Birincil · satürasyon ve gaz hacmi','<i>S</i> hemoglobinin oksijen satürasyonu, <i>V</i> gaz hacmi.',451],
    ['İkincil · gaz (büyük harf)','A alveoler, B barometrik (atmosfer basıncı), E ekspirasyon gazı, I inspirasyon gazı.'],
    ['İkincil · soluk evresi','T tidal, ET soluk sonu.',451],
    ['İkincil · sıvı (küçük harf)','a arteriyel, c kapiller, v venöz.'],
    ['Üçüncül · bileşik','CO karbonmonoksit, CO₂ karbondioksit, O₂ oksijen.'],
    ['Üst nokta · zaman türevi','V̇ hacmin zamana göre değişimini, yani akımı gösterir.'],
    ['Üst çizgi · karışık veya ortalama','v̄ karışık venöz örneği belirtir.',451],
    ['Sağdaki ′ · son','c′ kapillerin son ucunu belirtir.',451],
  ], 450);
  SAYFALAR['dersler/fizik/28'] = {
    grup:'dersler', eyebrow:'Fizik · Bölüm 28', baslik:'Fiziksel nicelikler ve SI birimleri',
    lede:'Bir gaz ölçümünü okurken simge neyin nerede ölçüldüğünü, birim ise değerin hangi ölçekte verildiğini anlatır. [[K6 s. 449–450]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu bölümde">${nav.map(([id,ad]) => '<button type="button" data-scroll="fk28-'+id+'">'+ad+'</button>').join('')}</nav>
<section class="wrap blk ders-sec" id="fk28-sabit"><h2>Bir sabitin değeri ve birimi</h2>
<p class="intro">Fiziksel sabitleri kullanırken sayı ile birlikte birimini de okuyun. [[K6 s. 445]]</p>
<div class="viz"><div class="viz-head"><h3>Bilimsel gösterimi okuyun</h3></div><div data-viz="fk28_sabit"></div><p class="viz-cap" aria-live="polite">Planck sabitini seçin ve sayıyı parçalara ayırın: 6,626 katsayısını 10⁻³⁴ ile çarpıp birimi J·s olarak okuyun. [[K6 s. 445]]</p></div>
${sabitler}
<div class="note plain"><b>Atlas notu.</b> Kitap yerçekimi ivmesini değişmeyen sabitler arasında verir. [[K6 s. 445]] Yerel yerçekimi ivmesi konuma göre değişir ve 9,81 m·s⁻² yaklaşık bir değerdir. [[K6 s. 445]]</div></section>
<section class="wrap blk ders-sec" id="fk28-birim"><h2>Temel birimlerden türetilmiş birimlere</h2>
<p class="intro">Farklı ölçü sistemlerini sadeleştirip birleştirmek için geliştirilen SI (<i>Système international d’unités</i>), yedi temel niceliğe dayanır. [[K6 s. 446]]</p>
<div class="viz"><div class="viz-head"><h3>Newton’dan basınca veya işe</h3></div><div data-viz="fk28_birim"></div><p class="viz-cap" aria-live="polite">Basıncı seçin ve kuvvetin birimini alana bölün: N/m², pascalın temel birimlerle açılımına giden ara basamaktır. [[K6 s. 447]]</p></div>
<p>Diğer birimlerin tümü temel birimlerin birleşimi olarak yazılabilir. [[K6 s. 446]] Enerji birimi adını İngiliz bilim insanı James Prescott Joule’den alır ve türetilmiş newton ile temel metre biriminin çarpımına eşittir. [[K6 s. 446]]</p>
<h3>Hangi nicelikler temel kabul edilir?</h3>${temel}
<h3>Özel bir ad kullanmadan türetme</h3><p>Metreyi kendisiyle çarpınca alan, bir kez daha metreyle çarpınca hacim birimi elde edilir. [[K6 s. 446]] Aynı uzunluğu bir süreye bölerseniz sonuç hız birimindedir. [[K6 s. 446]]</p>${turetilen}
<h3>Özel ad taşıyan birimleri çözme</h3><p>Tabloyu iki yönde okuyun: birimi tanımak için nicelikten simgeye, denklem denetlemek için simgeden temel birimlere gidin. [[K6 s. 446–448]] Örneğin gray ve sievert aynı birimlere açılır, ancak biri soğurulan dozu, diğeri doz eşdeğerini bildirir. [[K6 s. 447–448]]</p>${ozel}
<div class="note plain"><b>Atlas notu.</b> Kitap watt için temel birim sütununda m²·kg·s⁻² verir. [[K6 s. 447]] W = J/s olduğundan wattın doğru açılımı m²·kg·s⁻³’tür. [[K6 s. 447]]</div>
<div class="note plain"><b>Atlas notu.</b> Kaynak metinde ohm simgesi O olarak görünür. [[K6 s. 447]] Doğru simge Ω’dır. [[K6 s. 447]]</div>
<p>Denklemin iki tarafını temel birimlere açarak kontrol edin: bir tarafta m·s⁻¹ varsa diğer tarafta da m·s⁻¹ bulunmalıdır. [[K6 s. 448]]</p></section>
<section class="wrap blk ders-sec" id="fk28-onek"><h2>Önek değişince sayı nasıl değişir?</h2>
<p class="intro">Birimin önüne gelen önek, onun hangi ondalık katının veya kesrinin kullanıldığını gösterir. [[K6 s. 448]]</p>
<div class="viz"><div class="viz-head"><h3>Bir paskalın farklı yazılışları</h3></div><div data-viz="fk28_onek"></div><p class="viz-cap" aria-live="polite">Kaydırıcıyı kilo ile mili arasında gezdirin: aynı paskalı daha küçük birimle yazmak için daha büyük bir sayı gerekir. [[K6 s. 448–449]]</p></div>
<p>Küçük veya büyük nicelikleri yazarken uygun öneki seçmek, virgülden önce ya da sonra çok sayıda sıfır yazma gereğini azaltır. [[K6 s. 448–449]]</p>
<div class="card"><h3>Hesap kartı · Önek seçimi</h3><p>0,0000000036 J = 3,6 × 10⁻⁹ J = 3,6 nJ. [[K6 s. 449]] 43 000 000 Pa = 4,3 × 10⁷ Pa = 43 MPa. [[K6 s. 449]]</p></div>${onekler}</section>
<section class="wrap blk ders-sec" id="fk28-gaz"><h2>Gaz ölçümünü hesaba hazırlamak</h2>
<p class="intro">Basınç en az yedi farklı birimle bildirilebildiğinden gaz hesabına başlamadan önce mümkünse ölçümleri SI birimlerine çevirin. [[K6 s. 449]]</p>
<div class="viz"><div class="viz-head"><h3>Kısmi basıncı iki ölçekte okuyun</h3></div><div data-viz="fk28_basinc"></div><p class="viz-cap" aria-live="polite">Yatay eksende kPa değerini seçin, doğru üzerindeki noktadan düşey eksene geçerek karşılık gelen mmHg değerini okuyun. [[K6 s. 449]]</p></div>
<div class="card"><h3>Hesap kartı · Basınç dönüşümü</h3><p>Ölçümden hesaba geçerken birimleri işlemin içinde tutun. [[K6 s. 448–449]] 7,5 mmHg ÷ (7,5 mmHg/kPa) ≈ 1 kPa = 1000 Pa. [[K6 s. 449]]</p></div>
<p>Ölçüme uygun birimi seçin: kan basıncı yakın geçmişe kadar rutin olarak cıvalı sfigmomanometreyle ölçüldüğü için bugün de mmHg ile kaydedilir. [[K6 s. 448]]</p>${gaz}</section>
<section class="wrap blk ders-sec" id="fk28-simge"><h2>Solunum sembolünü üç parçadan okumak</h2>
<p class="intro">Solunum fizyolojisi, çok sayıdaki ölçümü ayırt etmek için değişkeni, yeri ve bileşiği aynı gösterimde birleştirir. [[K6 s. 450]]</p>
<div class="viz"><div class="viz-head"><h3>A mı, a mı?</h3></div><div data-viz="fk28_simge"></div><p class="viz-cap" aria-live="polite">Alveol gazından arter kanına geçin: ana sembol ve bileşik aynı kalırken örneğin alındığı yeri gösteren harf değişir. [[K6 s. 450]]</p></div>
<p>Önce italik ana sembolü okuyun, ardından yer harfinin büyük mü küçük mü olduğuna bakın ve son olarak gazın adını söyleyin. [[K6 s. 450]] Tıbbın başka alanlarında da benzer gösterimler kullanılır, ancak çok azı solunum fizyolojisindeki kadar kapsamlıdır. [[K6 s. 450]]</p>${simgeler}</section>
<section class="wrap blk ders-sec" id="fk28-p1"><h2>Part I · MTF</h2><p>Her önermeyi bağımsız olarak doğru veya yanlış işaretleyin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk28-1"></div></div><div class="viz"><div data-viz="mtf" data-q="fk28-2"></div></div><div class="viz"><div data-viz="mtf" data-q="fk28-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk28-p2"><h2>Part II · SOE 2</h2><div class="card soe-soru"><h3>Klinik ölçüm · Açılış sorusu</h3><p>Alveol gazında karbondioksit kısmi basıncını bildireceksiniz. Sembolü nasıl kurarsınız? Cihaz mmHg gösteriyorsa değeri gaz hesabına nasıl aktarırsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Ölçülen değişken kısmi basınçtır, ana sembolü <i>P</i>’dir. [[K6 s. 450]]</li>
<li>Alveol gazının yer sembolü büyük A, karbondioksitin bileşik sembolü CO₂’dir. [[K6 s. 450]]</li>
<li>Birlikte <i>P</i><sub>A</sub>CO₂, alveoler karbondioksit kısmi basıncını belirtir. [[K6 s. 450]]</li>
<li>mmHg cinsinden sayıyı 7,5’e bölerek kPa, ardından 1000 ile çarparak Pa elde ederim. [[K6 s. 449]]</li>
<li>Hesabı denetlemek için basıncı N·m⁻² olarak açar, denklemin iki tarafındaki temel birimleri karşılaştırırım. [[K6 s. 447–448]]</li></ol>
<div class="note"><b>Çizin.</b> <i>P</i><sub>A</sub>CO₂ gösterimini yazıp üç parçasını değişken, yer ve bileşik olarak etiketleyin. [[K6 s. 450]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Arter kanı örneğine geçerseniz hangi harf değişir? Cıvalı tansiyon aletinin kan basıncı birimine etkisi nedir? Gaz hesabında °C değerini nasıl kullanırsınız?</div></section>
<section class="wrap blk ders-sec" id="fk28-ozet"><h2>Özet</h2><ul class="ozet">
<li>SI’da yedi temel nicelik diğer birimlerin kurulmasını sağlar. [[K6 s. 446]]</li>
<li>Basınç kuvvetin alana bölünmesiyle Pa, iş ise kuvvetin uzunlukla çarpılmasıyla J birimini alır. [[K6 s. 447]]</li>
<li>Önek birimin ölçeğini belirler: m binde bir, M bir milyondur. [[K6 s. 448]]</li>
<li>1 kPa = 1000 Pa ≈ 7,5 mmHg. [[K6 s. 449]]</li>
<li>Gaz hesabında sıcaklık kelvine çevrilir. [[K6 s. 449]]</li>
<li>Solunum gösteriminde yer harfinin büyük olması gazı, küçük olması sıvıyı belirtir. [[K6 s. 450]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="28"></div>
<nav class="ders-gec"><a href="#/dersler/fizik/27">← Temel matematik kavramlar: fonksiyonlar, kalkülüs, üstel büyüme ve azalma</a><a href="#/dersler/fizik/29">Sonraki: İstatistik →</a></nav></section>`,
  };
})();
