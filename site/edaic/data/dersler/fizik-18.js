VERI.sorular = VERI.sorular || {};
VERI.sorular['fk18-1'] = {
  no: 1, kok: 'Elektrik akımı, potansiyel fark ve Ohm yasası', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 302–306]]',
  onermeler: [
    { t: 'Devre şemalarındaki geleneksel akım oku I, pozitif uçtan negatif uca doğru çizilir.', d: true, n: 'Elektronlar negatiften pozitife aksa da geleneksel akım yönü uzlaşımla pozitiften negatife gösterilir. [[K6 s. 303]]' },
    { t: 'İletken bir telin uzunluğu arttıkça elektriksel direnci azalır.', d: false, n: 'Telin direnci uzunlukla artar, kesit alanının büyümesiyle azalır. [[K6 s. 303]]' },
    { t: '1 volt, 1 coulomb yükü iki nokta arasında taşımak için 1 joule enerji gerektiren potansiyel farktır.', d: true, n: 'Voltun enerji temelli tanımı birim yük (1 C) başına 1 joule enerji harcanmasıdır. [[K6 s. 304]]' },
    { t: 'Metal telde ısınmayla artan atom titreşimleri elektronların hareketini kolaylaştırır.', d: false, n: 'Metaller genellikle düşük sıcaklıklarda daha iyi iletir; sıcaklık arttıkça titreşen atomlar elektron akışını engeller. [[K6 s. 308]]' },
    { t: '6 V gerilim kaynağına bağlı 240 Ω dirençten geçen akım 1 A değerindedir.', d: false, n: 'Ohm yasasına göre I = 6 V / 240 Ω = 0,025 A, yani 25 mA’dır. [[K6 s. 305–306]]' },
  ],
};
VERI.sorular['fk18-2'] = {
  no: 2, kok: 'İletkenler, yarı iletkenler ve Kirchhoff yasaları', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 306–310]]',
  onermeler: [
    { t: 'Saf silisyum oda sıcaklığında metallere benzer biçimde yüksek iletkenlik gösterir.', d: false, n: 'Saf silisyumun dört değerlik elektronu komşu atomlara sıkı bağlıdır; oda sıcaklığında etkili bir yalıtkandır. [[K6 s. 307]]' },
    { t: 'Serum fizyolojik ve kan, çözünmüş iyon içerdikleri için iletken sayılır.', d: true, n: 'Serum fizyolojik çözünmüş iyonlar içerir ve kan da kitaptaki iletken örnekleri arasındadır. [[K6 s. 306–307]]' },
    { t: 'Diyot akımı yalnızca tek yönde geçirirken transistör küçük bir akımla daha büyük akımı kontrol edebilir.', d: true, n: 'Farklı katkılı yarı iletken katmanlarından yapılan diyot tek yönlü, transistör ise yükseltici temeli olan anahtar gibi davranır. [[K6 s. 308]]' },
    { t: 'Termistörler yalnızca negatif sıcaklık katsayılı yarı iletkenlerden üretilebilir.', d: false, n: 'Termistörler yarı iletkenlerden yapılır ve seçilen malzemeye bağlı olarak pozitif veya negatif sıcaklık katsayısına sahip olabilir. [[K6 s. 308]]' },
    { t: 'Kirchhoff’un ikinci yasasına göre kapalı bir devre çevresindeki gerilim değişimlerinin cebirsel toplamı sıfırdır.', d: true, n: 'Kapalı çevredeki toplam kaynak gerilimi, devre elemanlarındaki gerilim düşüşlerinin toplamıyla dengelenir. [[K6 s. 309–310]]' },
  ],
};
VERI.sorular['fk18-3'] = {
  no: 3, kok: 'Elektriksel güç, direnç bağlama ve Wheatstone köprüsü', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 310–314]]',
  onermeler: [
    { t: 'Paralel bağlanan iki pozitif direncin eşdeğer direnci küçük olan dirençten de küçüktür.', d: true, n: 'Paralel bağlantıda ters dirençler toplandığı için eşdeğer direnç her bir kolun direncinden küçüktür. [[K6 s. 311]]' },
    { t: 'Gerilim bölücünün çıkışına R₂ ile aynı dirençte bir yük bağlandığında çıkış gerilimi yüksüz değerinde kalır.', d: false, n: 'Yük akım çekeceği için R₂ üzerindeki gerilim düşer; hatanın küçük kalması için yük direnci R₂’den çok büyük olmalıdır. [[K6 s. 312]]' },
    { t: 'Elektriksel güç, devredeki gerilim ile akımın çarpımına (V·I) eşittir.', d: true, n: 'Güç P = V·I olarak yazılır ve Ohm yasası ile I²·R veya V²/R biçiminde ifade edilebilir. [[K6 s. 310]]' },
    { t: 'Wheatstone köprüsü dengedeyken A ve B noktaları arasındaki voltmetreden akım geçmez.', d: true, n: 'İki gerilim bölücü kolunun çıkışı eşitlendiğinde V_O sıfır olur ve köprü kolundan akım akmaz. [[K6 s. 313]]' },
    { t: 'Arteriyel basınç transdüserindeki gerinim ölçer basınca bağlı olarak çok küçük direnç değişimleri gösterir.', d: true, n: 'Gerinim ölçerin direnç değişimi çok küçüktür; bu yüzden Wheatstone köprüsü gibi duyarlı bir devre gerekir. [[K6 s. 312–313]]' },
  ],
};

(function () {
  const nav = [
    ['akim', 'Akım'], ['potansiyel', 'Gerilim ve Ohm'], ['madde', 'İletken ve yarı iletken'],
    ['kirchhoff', 'Kirchhoff'], ['guc', 'Güç ve enerji'], ['direnc', 'Dirençler'],
    ['bolucu', 'Yükleme hatası'], ['wheatstone', 'Wheatstone'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  function sekil(ad, baslik, alt) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk18_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  }
  SAYFALAR['dersler/fizik/18'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 18', baslik: 'Elektriğin temelleri ve Wheatstone köprüsü',
    lede: 'Elektrik akımı yük akışıdır ve potansiyel farkla sürülür. [[K6 s. 302–304]] Kan basıncı ölçümünde Wheatstone köprüsü, transdüserdeki küçük direnç değişimini monitörün işleyebileceği bir gerilime dönüştürür. [[K6 s. 312–313]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk18-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk18-akim">
<h2>Elektrik akımı ve yük taşıyıcıları</h2>
<p class="intro">Elektrik akımı, elektrik yükünün bir iletken veya iyonik çözelti içinde akışıdır. [[K6 s. 302]]</p>
${sekil('akim', 'Geleneksel akım mı, elektron akışı mı?', 'Yük taşıyıcılarının hareket yönü pil ve AC seçeneklerinde şematiktir. [[K6 s. 303–304]]')}
<p>Elektriğin ilk kayıtları Antik Mısırlıların suya girenleri şoklayabilen Nil balıklarını gözlemlemesine ve Antik Yunanların sürtülen kehribarın (Yunanca <i>elektron</i>) başka maddeleri çektiğini (statik elektrik) fark etmesine dayanır. [[K6 s. 302]] 17. yüzyılda “electricity” sözcüğü bu kökten türetildi. [[K6 s. 302]]</p>
<p>Atom çekirdeğindeki protonlar pozitif, çevresindeki elektronlar negatif yüklüdür ve her elektron <b>−1,602 × 10⁻¹⁹ coulomb (C)</b> yük taşır. [[K6 s. 302–303]]</p>
<ul>
<li><b>Metallerde taşıyıcı.</b> Metaller belirli bir atom çekirdeğine bağlı olmayan serbest bir “elektron denizi” içerir; akımı bu elektronların hareketi oluşturur. [[K6 s. 302–303]]</li>
<li><b>Çözeltilerde taşıyıcı.</b> Akım yalnızca elektronlarla değil, çözelti içindeki pozitif veya negatif yüklü iyonların (elektrolitlerin) akışıyla da doğabilir. [[K6 s. 302]]</li>
<li><b>Birim ve sembol.</b> Akım (<i>I</i> veya <i>i</i>) amper (A) ile ölçülür; 1 amper, sabit bir noktadan 1 saniyede 1 coulomb yük geçmesidir. [[K6 s. 303]]</li>
<li><b>Baraj ve boru benzetmesi.</b> Baraj yükseldikçe dipteki boruya etkiyen basınç artar; aynı itici basınçta boru ne kadar kısa ve genişse akım o kadar büyüktür (Hagen–Poiseuille yasası, Bölüm 8). [[K6 s. 302–303]]</li>
<li><b>Telin direnci.</b> Teldeki yük akışını elektriksel direnç sınırlar; tel uzadıkça direnç artar, kesit alanı büyüdükçe azalır ve metaller genellikle düşük sıcaklıklarda daha iyi iletir. [[K6 s. 303]]</li>
</ul>
<div class="cols">
<div class="card"><h3>Doğru akım (DC)</h3><p>Pil gibi bir güç kaynağından çıkan akım her zaman aynı yönde akar. [[K6 s. 303]] Pilin dış devresinde elektronlar negatif (−) uçtan pozitif (+) uca gitse de devre şemalarındaki <i>I</i> oku uzlaşımla pozitiften negatife gösterilir. [[K6 s. 303]]</p></div>
<div class="card"><h3>Alternatif akım (AC)</h3><p>Şebeke elektriğinde olduğu gibi akımın ve elektronların akış yönü belirli aralıklarla tersine döner. [[K6 s. 303–304]] Bir yarı dönemde ileri yönde hareket eden elektronlar sonraki yarı dönemde geri yönde hareket eder. [[K6 s. 303–304]]</p></div>
</div>
<div class="card"><h3>Bir tel kesitinden ne geçiyor?</h3>
<p>Yük, maddenin temel özelliklerinden biridir. [[K6 s. 302]] Coulomb ile yük miktarını, amper ile bu yükün belirli bir noktadan geçiş hızını ifade ederiz. [[K6 s. 302–303]] Teldeki bir kesiti gözünüzde canlandırın: aynı sürede bu kesitten daha çok yük geçerse akım büyür. [[K6 s. 303]]</p>
<p>Barajın dibindeki boruda suyu harekete geçiren basınçtır ve yüksek barajdan gelen su daha çok enerji aktarır. [[K6 s. 302]] Telde buna karşılık gelen itici etki potansiyel farktır, ancak aynı uzunluk ve kesitte bile farklı metaller akımı farklı kolaylıkla iletir. [[K6 s. 303–304]]</p></div>
<aside class="note plain"><b>Atlas notu.</b> Kitap elektronun keşfini 1888 ve kâşifini “J. J. Thompson” olarak yazar; oysa yerleşik tarihe göre J. J. Thomson elektronu 1897’de keşfetmiştir. [[K6 s. 303]]</aside>
<details><summary>Devre şemasında ok neden elektronların tersini gösterir?</summary><p>Elektrik ilk keşfedildiğinde ana yük taşıyıcısının elektron olduğu bilinmiyordu; elektronun negatif yüklü olduğu anlaşıldığında akımın pozitiften negatife aktığını gösteren uzlaşım çoktan yerleşmişti. [[K6 s. 303]] Şekilde “Elektron akışı (DC)” seçildiğinde noktaların − uçtan + uca ters yönde ilerlediğini görebilirsiniz. [[K6 s. 303]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk18-potansiyel">
<h2>Elektriksel potansiyel ve Ohm yasası</h2>
<p class="intro">Gerilim, potansiyel fark veya elektromotor kuvvet (EMK), yükleri bir iletkenden iten basınç ya da kuvvet gibi düşünülebilir. [[K6 s. 304]]</p>
${sekil('ohm', 'Ohm yasası: V = I · R', 'Kaydırıcılarla gerilimi ve direnci değiştirip akımı izleyin. [[K6 s. 305–306]]')}
<p>Devredeki iki düğüm (nokta) arasındaki gerilim farkına potansiyel fark denir ve birimi volttur (V). [[K6 s. 304]] Bir coulomb yükün taşınması için bir joule (J) enerji gerekiyorsa bu fark 1 V’tur. [[K6 s. 304]] Aynı voltun devre üzerinden tanımı, 1 Ω dirençten 1 A akım geçiren gerilimdir. [[K6 s. 304]]</p>
<p>Gerilim akış yönünü belirtmek için pozitif veya negatif yazılabilir ve genellikle öneklerle ifade edilir: mikrovolt (1 μV = 1 × 10⁻⁶ V), milivolt (1 mV = 1 × 10⁻³ V) ve kilovolt (1 kV = 1 × 10³ V). [[K6 s. 304]] Birleşik Krallık ev şebekesi 230–240 V AC iken ABD’de şebeke 110–120 V AC’dir; birçok küçük elektronik cihaz pil veya transformatörle sağlanan 1,5–24 V düşük DC ile çalışır. [[K6 s. 304]]</p>
<p>Baraj benzetmesinden devreye geçerken gerilimi iki uç arasında okuyun: bu büyüklük, bir coulomb yükün taşınmasına ne kadar enerji karşılık geldiğini söyler. [[K6 s. 304]] Aynı telin uçları arasındaki fark büyürse aynı yük başına aktarılan enerji de artar. [[K6 s. 304]] Şebeke evlere ve sanayiye alternatif gerilim sağlar. [[K6 s. 304]]</p>
<div class="tbl-wrap"><table class="tbl fk18-tablo"><caption>Tablo 18.1 · Yaygın elektriksel olguların tipik gerilimleri [[K6 s. 304–305]]</caption><thead><tr><th>Örnek</th><th>Tipik gerilim</th></tr></thead><tbody>
<tr><td>EEG</td><td>50 μV [[K6 s. 304]]</td></tr>
<tr><td>EKG</td><td>1 mV [[K6 s. 304]]</td></tr>
<tr><td>Periferik sinir stimülatörü</td><td>9 V [[K6 s. 304]]</td></tr>
<tr><td>Araba aküsü</td><td>12 V [[K6 s. 304]]</td></tr>
<tr><td>Şebeke elektriği</td><td>240 V [[K6 s. 304]]</td></tr>
<tr><td>Eksternal defibrilatör</td><td>3–5 kV [[K6 s. 305]]</td></tr>
<tr><td>Diyatermi</td><td>200 V–10 kV [[K6 s. 305]]</td></tr>
<tr><td>Enerji iletim hatları</td><td>250–400 kV [[K6 s. 305]]</td></tr>
</tbody></table></div>
<p>Çok düşük sıcaklıklardaki <b>süperiletkenler</b> hariç akım taşıyan her maddenin bir direnci vardır; direnç küçüldükçe aynı potansiyel farkta akan akım büyür. [[K6 s. 305]] <b>Ohm yasası</b>na göre iki nokta arasındaki potansiyel fark, direnç ile akan akımın çarpımına eşittir: <b><i>V</i> = <i>I</i> · <i>R</i></b>. [[K6 s. 305]] Gerilim volt (V), direnç ohm (Ω) alınırsa akım amper (A) çıkar; üç büyüklükten ikisi bilindiğinde üçüncüsü Ohm piramidinden hesaplanabilir. [[K6 s. 305]]</p>
<div class="card fk18-hesap"><h3>Hesap · Dirençten geçen akım</h3>
<p>6 V güç kaynağına bağlı 240 Ω dirençten geçen akımı bulmak için Ohm yasasını düzenleyin: <i>I</i> = <i>V</i> / <i>R</i>. [[K6 s. 305–306]] Değerleri yerine koyduğunuzda <i>I</i> = 6 V / 240 Ω = 0,025 A = <b>25 mA</b> elde edilir. [[K6 s. 306]]</p></div>
<details><summary>Ohm piramidini ve Tablo 18.1’i birlikte nasıl yorumlarsınız?</summary>
<p>Piramidin tepesindeki gerilimi (<i>V</i>) alttaki akım (<i>I</i>) ile direnç (<i>R</i>) çarpımı olarak okuyun: bir değeri kapatınca kalan ikisinin bölümü veya çarpımı aranan niceliği verir. [[K6 s. 305]] Direnci bulmak için piramidin altındaki <i>R</i>’yi kapatın: <i>R</i> = <i>V</i> / <i>I</i> elde edilir. [[K6 s. 305]] Örnek devrede bunu ters kontrol olarak kullanabilirsiniz: 6 V / 0,025 A = 240 Ω. [[K6 s. 305–306]]</p>
<p>EEG ve EKG satırlarını karşılaştırmak için önce aynı birime geçin: 1 mV, 1000 μV eder ve tablodaki EKG gerilimi EEG geriliminin 20 katıdır. [[K6 s. 304]] Ohm grafiğinde gerilimi 6 V’ta tutup direnci 240 Ω’dan 120 Ω’a indirdiğinizde ise akım 25 mA’den 50 mA’e yükselir. [[K6 s. 305–306]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk18-madde">
<h2>İletkenler, yalıtkanlar ve yarı iletkenler</h2>
<p class="intro">Maddeler elektriksel dirençlerine göre iletken, yarı iletken ve yalıtkan olarak üçe ayrılır. [[K6 s. 306–307]]</p>
${sekil('bant', 'Malzemeye göre yük taşıyıcıları', 'Malzemeyi seçerek yükü hangi elektronların taşıyabildiğini karşılaştırın; çizim şematiktir, enerji ölçekli değildir. [[K6 s. 306–308]]')}
<p>Bakır gibi iyi iletkenlerde çok sayıda elektron çekirdeklere gevşek bağlı bir “deniz” oluştururken yalıtkanlarda elektronlar sıkı bağlıdır ve iletime katılamaz. [[K6 s. 306]] Günlük yaşamda metallerin iletkenliği ekmek kızartma makinesine çatal sokmamanın, elektrolit içeren tuzlu suların iletkenliği ise banyo suyuna saç kurutma makinesi düşürmemenin nedenidir. [[K6 s. 306]]</p>
<p>İyonize gaz olan <b>plazma</b> da elektriği iletir ve floresan lambalarla enerji tasarruflu ampullerin çalışmasını sağlar. [[K6 s. 306]] İnsan vücudunun çoğu çözünmüş iyon içeren sudan oluştuğundan iyi bir iletkendir; ancak özellikle kuru deri ciddi bir direnç oluşturarak elektrik çarpması hasarına karşı kısmi koruma sağlar. [[K6 s. 307]]</p>
<div class="tbl-wrap"><table class="tbl fk18-tablo"><caption>Tablo 18.2 · Yalıtkan ve iletken örnekleri [[K6 s. 306–307]]</caption><thead><tr><th>Yalıtkanlar</th><th>İletkenler</th></tr></thead><tbody>
<tr><td>Ahşap, plastik, seramik [[K6 s. 306–307]]</td><td>Metaller, serum fizyolojik (saline) [[K6 s. 306]]</td></tr>
<tr><td>Lateks eldiven, lastik çizme [[K6 s. 307]]</td><td>Yumuşak doku, kan, sinir lifleri [[K6 s. 307]]</td></tr>
<tr><td>Hastane yatağı tekerlekleri, kalp pili kablosunun yalıtımı [[K6 s. 307]]</td><td>EKG elektrotları, kalp pili kablosunun iletken çekirdeği [[K6 s. 307]]</td></tr>
</tbody></table></div>
<div class="cols">
<div class="card"><h3>Yarı iletken ve katkılama (doping)</h3><p>Yarı iletkenlerin direnci iyi iletken ile iyi yalıtkan arasındadır ve çoğu silisyumdan (Grup IV) yapılır. [[K6 s. 307]] Silisyumun dört değerlik elektronu komşularla karbondakine benzer, kovalent bağlarla tutulan bir kristal örgü kurar; oda sıcaklığında saf silisyum etkili bir yalıtkandır, yüksek sıcaklıkta ısıl hareket az sayıda elektronu serbest bırakır. [[K6 s. 307]]</p><p>Üç veya beş dış elektronlu az miktarda safsızlık katılarak (“doping”) örgüde fazla elektron veya “boşluk” yaratılır; boşluk komşu atomdan gelen elektronla dolabildiği için iletim artar. [[K6 s. 307]]</p></div>
<div class="card"><h3>Enerji bantları ve elektronik yapı taşları</h3><p>Düşük enerjili değerlik bandındaki elektronlar enerji soğurarak serbestçe hareket edebilecekleri yüksek enerjili iletim bandına sıçrar; katkılı yarı iletkende daha düşük enerjili çok sayıda ek iletim düzeyi bulunur. [[K6 s. 307–308]]</p><p>Farklı yarı iletkenler birleştirilerek akımı tek yönde geçiren <b>diyot</b> ve küçük akımla büyük akımı yöneten <b>transistör</b> (yükselticinin temeli) yapılır. [[K6 s. 308]] Bu bileşenler küçültülerek tümleşik devreler (mikroçipler) yapılır. [[K6 s. 308]] Bilgisayarlarda, hasta monitörlerinde ve akıllı telefonlarda kullanılan mikroişlemciler milyonlarca, hatta milyarlarca transistör içerebilir. [[K6 s. 308]]</p></div>
</div>
<p><b>Bir boşluk yükü nasıl taşır?</b> Katkı atomunun çevresindeki eksik bağa komşu bir atomdan elektron geçebilir. [[K6 s. 307]] Bu kez elektronun ayrıldığı yerde bir boşluk kalır ve bir sonraki komşudan gelen elektron orayı doldurabilir. [[K6 s. 307]] Elektron fazlası bulunan örgüde ise serbest elektron doğrudan yer değiştirebilir. [[K6 s. 307]] Her iki durumda da yük örgü boyunca taşınır. [[K6 s. 307]]</p>
<p><b>Sıcaklıkla direnç değişimi.</b> Metal tellerde sıcaklık arttıkça titreşen atomlar elektron akışını engellediğinden direnç genellikle artar (<b>pozitif sıcaklık katsayısı</b>). [[K6 s. 308]] Yarı iletkenlerde artan ısıl enerji daha çok elektronu iletim bandına çıkardığı için direnç genellikle düşer (<b>negatif sıcaklık katsayısı</b>). [[K6 s. 308]] Yarı iletkenlerden yapılan ve sıcaklık ölçümünde kullanılan <b>termistörler</b>, seçilen malzemeye bağlı olarak pozitif veya negatif sıcaklık katsayılı olabilir (Bölüm 4). [[K6 s. 308]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap katkılama örneğinde fosforu Grup III, boru Grup V olarak yazar. [[K6 s. 307]] Bor Grup III elementidir ve üç değerlik elektronuyla boşluk oluşturur, fosfor ise Grup V elementidir ve beş değerlik elektronuyla elektron fazlası sağlar. [[K6 s. 307]]</aside>
<details><summary>Değerlik bandı, iletim bandı ve termistör davranışını adım adım izleyin</summary>
<ol>
<li><b>Saf yarı iletken.</b> Oda sıcaklığında elektronlar düşük enerjili değerlik bandında sıkı bağlıdır; iletim bandına geçmek için gereken enerji aralığı büyüktür. [[K6 s. 307–308]]</li>
<li><b>Katkılama etkisi.</b> Düşük enerjilerde yeni iletim düzeyleri oluştuğu için elektronlar ya da komşu atomdan doldurulan boşluklar örgü boyunca daha kolay hareket eder. [[K6 s. 307–308]]</li>
<li><b>Sıcaklık artışı.</b> Metalde atom titreşimi artıp elektronları engeller (direnç artar); yarı iletkende ise ısıl enerji daha çok elektronu iletim bandına taşır (direnç düşer). [[K6 s. 308]]</li>
</ol></details>
</section>

<section class="wrap blk ders-sec" id="fk18-kirchhoff">
<h2>Kirchhoff devre yasaları</h2>
<p class="intro">Devrede yükün korunumu ve kapalı çevredeki gerilim dengesi Kirchhoff’un iki yasasıyla açıklanır. [[K6 s. 308–310]]</p>
${sekil('kirchhoff', 'Düğümde akım, çevrede gerilim dengesi', 'Düğümde okların yönünü, kapalı çevrede gerilim değişimlerinin işaretini izleyin. [[K6 s. 308–310]]')}
<ul>
<li><b>Birinci yasa (akım yasası).</b> Devredeki bir düğüme (kavşağa) giren ve çıkan akımların işaretli toplamı her zaman sıfırdır. [[K6 s. 308–309]] Şekilde düğüme giren akımlar pozitif (<i>I</i>₁, <i>I</i>₂, <i>I</i>₃), çıkanlar zıt işaretli (<i>I</i>₄, <i>I</i>₅) alınır ve giren akım çıkan akıma eşit olur. [[K6 s. 309]]</li>
<li><b>İkinci yasa (gerilim yasası).</b> Akım bir dirençten geçerken gerilim “düşer”, yani direncin bir yanındaki potansiyel diğer yanından yüksektir; aynı akımda seri dirençler üzerindeki gerilim düşüşleri toplanır. [[K6 s. 309]] Telin direnci çok düşük olduğundan tel boyunca gerilim düşüşü çok küçüktür. [[K6 s. 309]]</li>
<li><b>Kapalı çevre toplamı.</b> Pil kapalı çevrede bir gerilim kazancı sağlarken dirençlerde gerilim düşer; kapalı bir ağdaki toplam gerilim tüm gerilim düşüşlerinin toplamına eşittir ve işaretleriyle birlikte cebirsel toplam sıfırdır: <i>V</i><sub>AB</sub> + <i>V</i><sub>BC</sub> + <i>V</i><sub>CD</sub> + <i>V</i><sub>DA</sub> = 0 V. [[K6 s. 309–310]]</li>
</ul>
<div class="card fk18-hesap"><h3>İşareti seçip denklemi kurun</h3>
<p>Düğüme doğru çizilen üç okun büyüklüğünü sol tarafa, düğümden uzaklaşan iki okun büyüklüğünü sağ tarafa yazın: <i>I</i>₁ + <i>I</i>₂ + <i>I</i>₃ = <i>I</i>₄ + <i>I</i>₅. [[K6 s. 308–309]] Bütün terimleri tek tarafa alırsanız son iki terimin işareti değişir. [[K6 s. 309]]</p>
<p>Çevrede D’den A’ya pil üzerinden geçiş bir gerilim kazancıdır. [[K6 s. 310]] Aynı yönde ilerleyip dirençlerdeki düşüşleri çıkardığınızda başlangıç noktasındaki potansiyele dönersiniz. [[K6 s. 309–310]] Çevre denkleminde her terimi volt, düğüm denkleminde her terimi amper cinsinden yazın. [[K6 s. 303–304]]</p></div>
<details><summary>Kirchhoff’un iki yasasını tek bir devrede nasıl uygularsınız?</summary>
<p>Bir kavşak seçtiğinizde akımın yük akışı olduğunu hatırlayın: düğüme giren yük miktarı birikemeyeceği için çıkan yük miktarına eşit olmalıdır. [[K6 s. 308–309]] Diğer girişler sabitken <i>I</i>₁ büyürse iki çıkışın toplamı da girişteki artış kadar büyümelidir. [[K6 s. 308–309]]</p>
<p>İkinci yasada kapalı halkayı bir yönde dolaşın: pil üzerinden geçerken potansiyel yükselir, dirençler üzerinden geçerken düşer ve başlangıç noktasına döndüğünüzde net değişim sıfır kalır. [[K6 s. 309–310]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk18-guc">
<h2>Elektriksel güç ve enerji</h2>
<p class="intro">Elektrik enerjisi ışık (ampul), ısı (ısıtıcı) veya hareket (motor) biçimlerine dönüştürülür; enerjinin harcanma hızına güç denir. [[K6 s. 310]]</p>
${sekil('guc', 'Sabit dirençte akım ve güç', 'Şekil, 6 V ve 240 Ω örneğinden elde edilen 25 mA ile açılır. [[K6 s. 305–306]] Direnci sabit tutup akımı iki katına çıkararak güçteki değişimi okuyun. [[K6 s. 310]]')}
<p>Güç (<i>P</i>) watt (W) ile ölçülür ve 1 watt saniyede aktarılan 1 joule enerjiye eşittir (<i>P</i> = <i>E</i> / <i>t</i>). [[K6 s. 310]] Üzerinde <i>V</i> gerilimi bulunan ve <i>I</i> akımı taşıyan bir direnç ısınarak güç harcar: <b><i>P</i> = <i>V</i> · <i>I</i></b>. [[K6 s. 310]] Ohm yasası yerine konduğunda <b><i>P</i> = <i>I</i>² · <i>R</i> = <i>V</i>² / <i>R</i></b> elde edilir. [[K6 s. 310]]</p>
<p>Bir devrede başka biçimlere dönüşen elektrik enerjisi gücün zamanla çarpımıdır: <b><i>E</i> = <i>P</i> · <i>t</i></b> (zaman saniye, enerji joule cinsindendir; sıkça kilojoule 1 kJ = 10³ J veya megajoule 1 MJ = 10⁶ J kullanılır). [[K6 s. 310–311]] Ev elektrik faturasındaki bir “birim” (1 kilovat-saat, kWh), 1 kW’lık bir ısıtıcının tam 1 saat çalışmasıyla tükettiği enerjidir. [[K6 s. 311]]</p>
<div class="card fk18-hesap"><h3>Hesap · 60 W ampulün bir saatlik enerjisi</h3>
<p>60 W güç çeken bir ampul 1 saat (3600 s) çalıştırıldığında aktarılan enerji <i>E</i> = <i>P</i> · <i>t</i> = 60 W × 3600 s = <b>216 000 J</b> (216 kJ) olur. [[K6 s. 310–311]]</p></div>
<aside class="note plain"><b>Atlas notu.</b> Kitap enerji denkleminin altında “Energy is measured in watts” ifadesini kullanır ve 60 × 3600 çarpımını 126 000 J olarak basar. [[K6 s. 310–311]] Doğrusu enerji biriminin joule olması (watt güç birimidir) ve 60 × 3600 = 216 000 J etmesidir. [[K6 s. 310–311]]</aside>
<div class="card"><h3>Ölçebildiğiniz büyüklükten güce geçin</h3>
<p>Direnç ile üzerinden geçen akımı biliyorsanız gerilimin yerine <i>I R</i> yazın: <i>P</i> = (<i>I R</i>) · <i>I</i> = <i>I</i>²<i>R</i>. [[K6 s. 310]] Aynı akımı taşıyan iki dirençten değeri büyük olan, saniyede daha çok enerji harcar. [[K6 s. 310]]</p>
<p>Ölçülen büyüklük direncin uçlarındaki gerilimse akım yerine <i>V/R</i> koyun: <i>P</i> = <i>V</i> · (<i>V/R</i>) = <i>V</i>²/<i>R</i>. [[K6 s. 310]] Bu karşılaştırmada gerilim sabittir ve büyük dirençte harcanan güç daha küçüktür. [[K6 s. 310]]</p></div>
<details><summary>Güç ve enerji denklemlerini birbirinden nasıl ayırırsınız?</summary>
<p>Güç birim zamandaki enerji dönüşüm hızıdır (J·s⁻¹ = W); örneğin direnç sabitken akımı iki katına çıkarmak gücü dört katına çıkarır (<i>P</i> = <i>I</i>²·<i>R</i>). [[K6 s. 310]] Toplam harcanan enerjiyi bulmak için gücü mutlaka süreyle (saniye cinsinden) çarpmanız gerekir. [[K6 s. 310]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk18-direnc">
<h2>Seri ve paralel dirençler</h2>
<p class="intro">Aynı iki direnç art arda bağlanınca eşdeğer direnç büyür, iki ayrı kola yerleştirilince küçülür. [[K6 s. 311–312]]</p>
${sekil('direnc', 'Aynı dirençler, iki bağlantı', 'R₁ ile R₂ eşitken iki bağlantının eşdeğer dirençlerini karşılaştırın. [[K6 s. 311–312]]')}
<div class="cols">
<div class="card"><h3>Seri dirençler</h3><p>Seri bağlı her dirençten aynı akım geçer ve toplam (eşdeğer) direnç tüm dirençlerin toplamıdır: <b><i>R</i><sub>T</sub> = <i>R</i>₁ + <i>R</i>₂ + …</b> [[K6 s. 311]] Toplam direnç her zaman gruptaki en büyük dirençten büyüktür. [[K6 s. 311]]</p></div>
<div class="card"><h3>Paralel dirençler</h3><p>Paralelde her direncin tersi toplanır: <b>1/<i>R</i><sub>T</sub> = 1/<i>R</i>₁ + 1/<i>R</i>₂ + …</b> [[K6 s. 311]] Toplam direnç her zaman gruptaki en küçük dirençten bile küçüktür. [[K6 s. 311]]</p></div>
</div>
<div class="card fk18-hesap"><h3>Hesap · İki eşit direnç</h3>
<p>Kitabın Ohm örneğindeki 240 Ω’luk dirençten iki tane alırsanız seri bağlantı için <i>R</i><sub>T</sub> = 240 Ω + 240 Ω = 480 Ω bulursunuz. [[K6 s. 305–306]] [[K6 s. 311]] Paralel bağlantıda önce 1/<i>R</i><sub>T</sub> = 2/(240 Ω) yazılır, ardından tersini alarak <i>R</i><sub>T</sub> = 120 Ω bulunur. [[K6 s. 311]]</p></div>
</section>

<section class="wrap blk ders-sec" id="fk18-bolucu">
<h2>Gerilim bölücü ve ölçü aletinin yükü</h2>
<p class="intro">Kaynaktan daha küçük bir gerilim gerektiğinde seri iki direncin birleştiği B noktasından çıkış alınır (potansiyel bölücü); buraya bir ölçü aleti bağlanınca bu gerilim değişebilir. [[K6 s. 311–312]]</p>
${sekil('bolucu', 'Voltmetre bağlanınca ne değişir?', 'B noktasındaki çıkış gerilimi alt uca göre hesaplanır. [[K6 s. 312]]')}
<ol>
<li><b>Yüksüz çıkış.</b> Üstteki <i>R</i>₁ ile alttaki <i>R</i>₂ aynı akımı taşır ve bu akım <i>I</i> = <i>V</i><sub>giriş</sub> / (<i>R</i>₁ + <i>R</i>₂) olur. [[K6 s. 305]] [[K6 s. 311–312]] B noktasının alt uca göre gerilimi yalnız ikinci dirençteki düşüştür: <i>V</i><sub>çıkış</sub> = <i>I R</i>₂ = <i>V</i><sub>giriş</sub> · <i>R</i>₂ / (<i>R</i>₁ + <i>R</i>₂). [[K6 s. 311–312]]</li>
<li><b>Yüklü çıkış.</b> B ile alt uç arasına bağlanan voltmetrenin direnci <i>R</i><sub>L</sub>, artık <i>R</i>₂’ye paraleldir. [[K6 s. 312]] İkisini tek direnç gibi ele alırsanız <i>R</i><sub>alt</sub> = (<i>R</i>₂ · <i>R</i><sub>L</sub>) / (<i>R</i>₂ + <i>R</i><sub>L</sub>) bulursunuz ve bölücü denkleminde <i>R</i>₂ yerine bu değeri kullanırsınız. [[K6 s. 311–312]]</li>
<li><b>Hatanın yönü.</b> Alt kolun eşdeğer direnci küçüldüğünden kaynak geriliminin bu kola düşen payı da küçülür. [[K6 s. 311–312]] Ölçü aletinin direnci <i>R</i>₂’den çok daha büyükse aletten geçen akım azalır ve ölçülen değer yüksüz çıkışa yaklaşır. [[K6 s. 312]]</li></ol>
<div class="card fk18-hesap"><h3>Hesap · B noktasını iki kez okuyun</h3>
<p>Bu hesapta kitabın 6 V kaynağını ve 240 Ω direnç örneğini bölücüye uygulayın. [[K6 s. 305–306]] Yüksüzken 6 V’un yarısı alt dirence düşer ve çıkış 3 V olur. [[K6 s. 311–312]] Ölçer de 240 Ω ise alt kol 120 Ω’a iner ve yeni çıkış 6 V × 120 / (240 + 120) = 2 V olur. [[K6 s. 311–312]]</p></div>
<p><b>Ranvier düğümleri.</b> Sinir lifindeki ardışık düğümleri seri dirençler gibi düşünün. [[K6 s. 312]] Düğümler arasındaki potansiyel farkı ölçmeye çalıştığınızda, sinirdeki akım zaten çok küçük olduğu için ölçerin çektiği akım okumayı bozabilir. [[K6 s. 312]] Daha az akım çeken bir ölçer hatayı küçültebilir. [[K6 s. 312]] Wheatstone köprüsü ise direnç ölçümünü iki nokta arasındaki gerilim farkını sıfırlayarak yapar. [[K6 s. 312–313]]</p>
</section>

<section class="wrap blk ders-sec" id="fk18-wheatstone">
<h2>Wheatstone köprüsü: küçük değişimleri ölçmek</h2>
<p class="intro">Wheatstone köprüsü, elektrik direncindeki çok küçük değişimleri ölçmek için dört direnç ve bir güç kaynağından kurulan duyarlı devredir ve birçok klinik cihazın temel bileşenidir. [[K6 s. 312–313]]</p>
${sekil('wheatstone', 'Köprüyü <i>V</i><sub>O</sub> = 0 V olacak biçimde dengeleyin', 'Modelde (6 V; R₁ 120 Ω, R₂ 240 Ω şematik değerler) iki bölücünün yüksüz gerilimleri karşılaştırılır. [[K6 s. 312–313]] Transdüser direnci değişince potansiyometreyle yeniden sıfırı bulun. [[K6 s. 313–314]]')}
<p>Klinik ölçümlerde fiziksel büyüklükler modern monitörlerin işleyebilmesi için bir <b>transdüser</b> aracılığıyla elektriksel gerilime dönüştürülür; anesteziyolojideki kan basıncı transdüseri, basınca yanıt olarak direncini çok az değiştiren bir gerinim ölçerdir (strain gauge, Bölüm 6.8). [[K6 s. 312]]</p>
<p>Charles Wheatstone’un adıyla anılan devrede uygulanan DC gerilim (<i>V</i><sub>I</sub>) altında paralel iki gerilim bölücü kol bulunur: iki sabit direnç (<i>R</i>₁, <i>R</i>₂), transdüser (<i>R</i><sub>trans</sub>) ve değişken bir direnç/potansiyometre (<i>R</i><sub>var</sub>). [[K6 s. 313]] Voltmetre, iki kolun çıkışları (A ve B noktaları) arasındaki gerilim farkını (<i>V</i><sub>O</sub> = <i>V</i><sub>A</sub> − <i>V</i><sub>B</sub>) ölçer. [[K6 s. 313]]</p>
<p>Potansiyometre <i>R</i><sub>var</sub>, voltmetre çıkışı <i>V</i><sub>O</sub> = 0 olana kadar ayarlanır; bu durumda iki gerilim bölücü çıkışı eşittir, köprü “dengededir” ve A ile B arasından hiç akım akmaz. [[K6 s. 313]] Böylece <i>R</i>₂ ve <i>R</i><sub>trans</sub> üzerinden geçen akım bozulmadan <b><i>R</i><sub>trans</sub> = <i>R</i><sub>var</sub> · <i>R</i>₂ / <i>R</i>₁</b> bağıntısıyla bilinmeyen direnç bulunur. [[K6 s. 313–314]]</p>
<div class="card fk18-hesap"><h3>Hesap · Sıfırı direnç değerine çevirin</h3>
<p>Şekilde A, <i>R</i>₁ ile potansiyometrenin, B ise <i>R</i>₂ ile transdüserin arasındadır. [[K6 s. 313–314]] Her iki gerilim de aynı alt uca göre okunur: <i>V</i><sub>A</sub> = <i>V</i><sub>I</sub> · <i>R</i><sub>var</sub> / (<i>R</i>₁ + <i>R</i><sub>var</sub>) ve <i>V</i><sub>B</sub> = <i>V</i><sub>I</sub> · <i>R</i><sub>trans</sub> / (<i>R</i>₂ + <i>R</i><sub>trans</sub>). [[K6 s. 311–313]]</p>
<p>Dengede bu iki ifadeyi eşitleyince ortak kaynak gerilimi sadeleşir ve <i>R</i><sub>var</sub> / <i>R</i>₁ = <i>R</i><sub>trans</sub> / <i>R</i>₂ kalır. [[K6 s. 313–314]] Şekilde <i>R</i>₂, <i>R</i>₁’in iki katı seçildiğinden dengeyi bulduğunuzda transdüser direncini potansiyometrede okuduğunuz değerin iki katı olarak bulursunuz. [[K6 s. 313–314]]</p></div>
<div class="card"><h3>Basınç değişiminden ekrandaki değere</h3>
<ol><li>Gerinim ölçerde basıncın değiştirdiği büyüklük dirençtir. [[K6 s. 312]] Şekilde önce köprüyü dengeleyin, sonra potansiyometreye dokunmadan yalnız transdüser direncini değiştirin. [[K6 s. 313]]</li>
<li>Transdüserin bulunduğu koldaki gerilim bölüşümü değiştiği için B noktasındaki gerilim değişir, A noktası ise aynı kalır. [[K6 s. 312–313]] İki kolun çıkışı arasındaki bu küçük fark, köprünün monitöre verdiği elektriksel sinyaldir. [[K6 s. 312–313]]</li>
<li>Monitör köprüden gelen gerilim sinyalini işler ve sonucu kan basıncı biriminde gösterir. [[K6 s. 313]] Bilinmeyen direnci denge yöntemiyle bulmak istediğinizde ise potansiyometreyi yeniden ayarlayıp iki kolun gerilimlerini eşitlersiniz. [[K6 s. 313–314]]</li></ol></div>
<details><summary>Wheatstone köprüsü neden gerilim bölücü hatasını ortadan kaldırır?</summary><p>Tek bir gerilim bölücüde ölçü aleti çıkıştan akım çektiğinde R₂ üzerindeki gerilim azalır. [[K6 s. 312]] Dengelenmiş Wheatstone köprüsünde ise <i>V</i><sub>A</sub> = <i>V</i><sub>B</sub> olduğundan A ile B arasında potansiyel farkı kalmaz; voltmetre üzerinden akım geçmez ve bilinmeyen <i>R</i><sub>trans</sub> direnci devreyi bozmadan belirlenir. [[K6 s. 313–314]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk18-p1"><h2>Part I · Doğru mu, yanlış mı?</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div data-viz="mtf" data-q="fk18-1"></div><div data-viz="mtf" data-q="fk18-2"></div><div data-viz="mtf" data-q="fk18-3"></div></section>

<section class="wrap blk ders-sec" id="fk18-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><h3>Klinik ölçüm ve ekipman</h3><p>İnvaziv arteriyel kan basıncı ölçümünde basınç transdüserinden çıkan çok küçük direnç değişimi nasıl okunur? Sıradan bir gerilim bölücü ile voltmetre bağlamak neden yetersiz kalır? [[K6 s. 312–314]]</p></div>
<ol class="iskelet">
<li><b>Transdüser ilkesi.</b> Gerinim ölçer, fiziksel basınç değişimini çok küçük bir elektriksel direnç değişimine çevirir. [[K6 s. 312]]</li>
<li><b>Bölücüdeki sorun.</b> Çıkışa bağlanan voltmetre düşük akımlı devreden akım çekerek ölçülen gerilimi düşürür. [[K6 s. 312]]</li>
<li><b>Wheatstone köprüsü.</b> İki sabit direnç, transdüser ve bir potansiyometre paralel iki gerilim bölücü oluşturur. [[K6 s. 313]]</li>
<li><b>Denge (sıfır) yöntemi.</b> Potansiyometre ile <i>V</i><sub>O</sub> = 0 V sağlandığında A–B kolundan hiç akım geçmez. [[K6 s. 313]]</li>
<li><b>Hesap ve gösterim.</b> Denge oranı bilinmeyen direnci verir. [[K6 s. 313–314]] Monitör köprünün gerilim sinyalini işleyip sonucu kan basıncı birimiyle gösterir. [[K6 s. 313–314]]</li>
</ol>
<p class="note"><b>Çizin.</b> Paralel iki gerilim bölücüyü ortak DC kaynağa bağlayın, A ile B arasına voltmetreyi çizin ve potansiyometreyle transdüserin yerini işaretleyin. [[K6 s. 313]]</p>
<p><b>Ek sorular.</b> Seri ve paralel dirençlerde eşdeğer direnç nasıl değişir? Metallerle yarı iletkenlerin sıcaklık katsayısı neden zıttır? Kirchhoff’un iki yasasını söyleyin. [[K6 s. 308–311]]</p></section>

<section class="wrap blk ders-sec" id="fk18-ozet"><h2>Özet</h2><ul class="ozet">
<li>Elektrik akımı yük akışıdır (1 A = 1 C·s⁻¹); metallerde serbest elektronlar, çözeltilerde iyonlar yük taşır. [[K6 s. 302–303]]</li>
<li>Ohm yasası <i>V</i> = <i>I</i> · <i>R</i> ile potansiyel farkı, akımı ve direnci ilişkilendirir. [[K6 s. 305]]</li>
<li>Sıcaklık arttıkça metallerde direnç genellikle artar (PTC), yarı iletkenlerde ise azalır (NTC). [[K6 s. 308]]</li>
<li>Kirchhoff yasaları düğümde akım toplamının, kapalı çevrede gerilim toplamının sıfır olduğunu bildirir. [[K6 s. 308–310]]</li>
<li>Güç <i>P</i> = <i>V</i>·<i>I</i> = <i>I</i>²<i>R</i> (W), enerji <i>E</i> = <i>P</i>·<i>t</i> (J) ile hesaplanır. [[K6 s. 310]]</li>
<li>Seride <i>R</i><sub>T</sub> en büyük dirençten büyük, paralelde en küçük dirençten küçüktür. [[K6 s. 311]]</li>
<li>Wheatstone köprüsü dengede (<i>V</i><sub>O</sub> = 0) akım çekmeden küçük direnç değişimlerini hassas ölçer. [[K6 s. 313–314]]</li>
</ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="18"></div>
<nav class="ders-gec"><a href="#/dersler/fizik/17">← Ekipman yönetimi: kalibrasyon, temizlik ve sterilizasyon</a><a href="#/dersler/fizik/19">Sonraki: Elektromanyetizma, alternatif akım ve transformatörler →</a></nav></section>`,
  };
})();
