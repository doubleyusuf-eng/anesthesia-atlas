VERI.sorular = VERI.sorular || {};
VERI.sorular['far10b-1'] = {
  no: 1, kok: 'Kodein ve dihidrokodein', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 146–147]]',
  onermeler: [
    {t:'Kodeinin başlıca metaboliti morfindir.', d:false, n:'Başlıca ürün kodein-6-glukuroniddir. [[K3 s. 146]]'},
    {t:'Kodeinin morfine dönüşümü CYP2D6’ya bağlıdır.', d:true, n:'CYP2D6, kodeinin O-demetilasyonunu gerçekleştirir. [[K3 s. 146]]'},
    {t:'Kodein intravenöz uygulamada hipotansiyona eğilim yaratır.', d:true, n:'Muhtemel neden histamin salımıdır ve bu yol kullanılmaz. [[K3 s. 146]]'},
    {t:'Dihidrokodeinin oral biyoyararlanımı kodeininkinden yüksektir.', d:false, n:'Oral biyoyararlanım dihidrokodeinde yaklaşık %20, kodeinde %50’dir. [[K3 s. 146–147]]'},
    {t:'Yavaş metabolize edenlerde kodeinden daha fazla morfin oluşur.', d:false, n:'Morfin oluşumu hızlı metabolize edenlerde artar, yavaş metabolize edenlerde analjezi zayıftır. [[K3 s. 146]]'}
  ]
};
VERI.sorular['far10b-2'] = {
  no: 2, kok: 'Fentanil, alfentanil ve remifentanil', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 147–149]]',
  onermeler: [
    {t:'Düşük intravenöz fentanil dozunun kısa etkisini dağılım açıklar.', d:true, n:'İntravenöz doz 3 µg/kg altında kaldığında kısa etki süresini dağılım belirler. [[K3 s. 147]]'},
    {t:'Alfentanil fentanilden daha fazla lipitte çözünür.', d:false, n:'Alfentanilin lipit çözünürlüğü daha düşüktür, ancak fizyolojik pH’da noniyonize fraksiyonu daha büyüktür. [[K3 s. 148]]'},
    {t:'Midazolam ile alfentanil birlikte verildiğinde iki ilacın da eliminasyon yarı ömrü uzar.', d:true, n:'İki ilaç aynı hepatik enzimlerle metabolize edilir. [[K3 s. 148]]'},
    {t:'Kolinesteraz eksikliği remifentanil etkisini uzatır.', d:false, n:'Remifentanil plazma kolinesterazının zayıf substratıdır ve bu eksiklikten etkilenmez. [[K3 s. 149]]'},
    {t:'Remifentanil infüzyonu kesildiğinde postoperatif analjeziye katkısı beklenmez.', d:true, n:'Nonspesifik esterazlarla hızlı yıkım etki süresini çok kısa tutar. [[K3 s. 149]]'}
  ]
};
VERI.sorular['far10b-3'] = {
  no: 3, kok: 'Metabolitler ve opioid antagonizması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 149–153]]',
  onermeler: [
    {t:'Oral oksikodonla birlikte alınan nalokson analjeziyi sistemik olarak antagonize eder.', d:false, n:'Belirgin ilk geçiş metabolizması nedeniyle naloksonun bu kombinasyonda sistemik etkisi yoktur. [[K3 s. 149]]'},
    {t:'Böbrek yetmezliğinde norpetidin birikebilir.', d:true, n:'Norpetidinin yarı ömrü 14–21 saattir ve böbrek yetmezliği birikime yol açar. [[K3 s. 150]]'},
    {t:'O-desmetiltramadol analjezik aktivite gösterir.', d:true, n:'Tramadol metabolitleri arasında analjezik etkisi gösterilen tek üründür. [[K3 s. 151–152]]'},
    {t:'Naloksonun opioid reseptörleri içinde en yüksek afinitesi µ reseptörünedir.', d:true, n:'Saf antagonist µ yanında κ ve δ reseptörlerindeki etkileri de geri döndürür. [[K3 s. 152]]'},
    {t:'Buprenorfin dozunun artmasıyla NOP etkileri baskın hale gelir.', d:true, n:'Düşük konsantrasyondaki µ analjezisini yüksek dozda NOP aracılı antianaljezi izler. [[K3 s. 153]]'}
  ]
};

const A10B_NAV = [
  ['kodein','Kodein ve dihidrokodein'], ['anestezi','Fentanil ve türevleri'], ['oksikodon','Oksikodon'],
  ['petidin','Petidin ve metadon'], ['tramadol','Tramadol ve tapentadol'], ['antagonist','Antagonizm ve parsiyel agonizm'],
  ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
];
SAYFALAR['dersler/farmakoloji/10b'] = {
  grup:'dersler', eyebrow:'Farmakoloji · Kısım 2 · Bölüm 10 · Ders 10b', baslik:'Diğer opioidler ve opioid antagonistleri',
  lede:'Kodeinin analjezik etkisi morfine dönüşümüne bağlı görünürken remifentanilin etki süresini esterazlarla yıkımı belirler. [[K3 s. 146]] [[K3 s. 149]]',
  html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${A10B_NAV.map(([id, ad]) => `<button type="button" data-scroll="a10b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a10b-kodein">
<h2>Kodein ve dihidrokodein</h2>
<p class="intro">Aynı kodein dozu, CYP2D6 etkinliğine göre az analjezi sağlayabilir veya morfine bağlı yan etkileri artırabilir. [[K3 s. 146]]</p>
<div class="viz"><div class="viz-head"><h3>Kodeinden ne kadar morfin oluşur?</h3></div><div data-viz="a10b_kodein"></div><p class="viz-cap" aria-live="polite">CYP2D6 indüklenemez ve genetik polimorfizm gösterir. [[K3 s. 146]] Yavaş metabolize edenlerin oranı Birleşik Krallık’ta %9, Hong Kong’daki Çinli nüfusta %30 olarak tahmin edilir. [[K3 s. 146]]</p><p class="viz-foot">Şematik/nitel karşılaştırma. [[K3 s. 146]]</p></div>
<p>Morfin, kodeinin tanımlanan metabolitleri içinde µ reseptöründe anlamlı etkinlik gösteren tek üründür. [[K3 s. 146]] Bu nedenle kodeinin yalnızca bir ön ilaç olabileceği ileri sürülmüştür. [[K3 s. 146]]</p>
<ul class="ozet">
<li><b>Kodein (3-metilmorfin).</b> Potensi morfinin onda biridir ve şiddetli ağrıya uygun değildir. [[K3 s. 146]] Analjezi dışında öksürük, ishal ve anksiyetede, ayrıca hipnotik olarak kullanılır. [[K3 s. 146]]</li>
<li><b>Uygulama.</b> Erişkinde oral veya intramüsküler doz 30–60 mg’dır. [[K3 s. 146]] Muhtemelen histamin salımına bağlı hipotansiyon eğilimi nedeniyle intravenöz yol kullanılmaz. [[K3 s. 146]] Morfin toksisitesi bildirimleri 12 yaş altında kullanımı kısıtlamıştır. [[K3 s. 146]]</li>
<li><b>Metabolizma.</b> Metil grubu hepatik ilk geçişi azaltır, oral biyoyararlanım (%50) morfininkini biraz aşar. [[K3 s. 146]] İdrara %5–15 değişmeden geçer, kalanı karaciğerde metabolize edilir. [[K3 s. 146]] Başlıca yol 6-hidroksiglukuronidasyonla kodein-6-glukuronid oluşumudur. [[K3 s. 146]] N-demetilasyon %10–20 norkodein, O-demetilasyon %15’e kadar morfin oluşturur. [[K3 s. 146]] Diğer ürünler arasında normorfin ve hidrokodon bulunur. [[K3 s. 146]]</li>
<li><b>Dihidrokodein.</b> Kodeine yapısal olarak benzeyen bu sentetik opioid kabaca iki kat potenttir ve benzer yollarla metabolize olur. [[K3 s. 147]] Oral biyoyararlanımı yaklaşık %20’dir. [[K3 s. 147]] Sınırlı araştırmaya göre µ etkinliği daha yüksek görünür, dolayısıyla yanıt CYP2D6’ya daha az bağımlı ve daha öngörülebilirdir. [[K3 s. 147]]</li>
</ul></section>

<section class="wrap blk ders-sec" id="a10b-anestezi">
<h2>Fentanil, alfentanil ve remifentanil</h2>
<p class="intro">Bu üç sentetik fenilpiperidin µ agonistidir, ancak infüzyon uzadığında etki süreleri farklı davranır. [[K3 s. 147–149]]</p>
<div class="viz"><div class="viz-head"><h3>İnfüzyon kesilince etkiyi ne belirler?</h3></div><div data-viz="a10b_infuzyon"></div><p class="viz-cap" aria-live="polite">Fentanilin küçük intravenöz dozundan sonra kısa etki süresini yalnız dağılım belirler. [[K3 s. 147]]</p><p class="viz-foot">Şematik/nitel karşılaştırma. [[K3 s. 147–149]]</p></div>
<p>Etkinin başlama hızını karşılaştırırken lipit çözünürlüğüyle birlikte membranı geçebilen noniyonize fraksiyonu da okuyun. [[K3 s. 148]]</p>
<div class="tbl-wrap"><table class="tbl"><caption>Fentanil ve alfentanilin eşpotent dozlarda karşılaştırılması</caption><thead><tr><th scope="col">Özellik</th><th scope="col">Fentanil</th><th scope="col">Alfentanil</th></tr></thead><tbody>
<tr><th scope="row">pKa [[K3 s. 148]]</th><td>8.4</td><td>6.5</td></tr>
<tr><th scope="row">pH 7.4’te noniyonize fraksiyon [[K3 s. 148]]</th><td>%9</td><td>%89</td></tr>
<tr><th scope="row">Lipit çözünürlüğü [[K3 s. 148]]</th><td>Daha yüksek</td><td>Daha düşük</td></tr>
<tr><th scope="row">Etki başlangıcı [[K3 s. 147–148]]</th><td>Hızlı</td><td>Daha hızlı</td></tr>
</tbody></table></div>
<h3>Fentanil</h3>
<ul class="ozet">
<li><b>Sunum.</b> Renksiz enjeksiyon çözeltisi 50 µg/ml, transdermal yama 72 saat boyunca 25–100 µg/saat, pastil 15 dakikada 200 µg–1.6 mg sağlar. [[K3 s. 147]] Yama ile plazmada dengeye 12 saatte ulaşılır. [[K3 s. 147]]</li>
<li><b>Cerrahi.</b> Doz, gereken analjezi ve sedasyon süresine göre geniş bir aralıkta değişir. [[K3 s. 147]] Küçük girişimlerde intravenöz 1–2 µg/kg yaklaşık 30 dakika etkilidir, laringoskopi uyarısı genellikle daha yüksek doz gerektirir. [[K3 s. 147]] Opioid temelli anestezide 50–100 µg/kg ile etki yaklaşık 6 saat sürer ve hipnotik de gerekir. [[K3 s. 147]]</li>
<li><b>Sistemik etkiler.</b> Etkileri morfine benzer, histamin salımı daha az olasıdır. [[K3 s. 147]] 50–150 µg/kg cerrahiye metabolik stres yanıtını belirgin azaltabilir veya kaldırabilir, ancak bradikardi ve göğüs duvarı rijiditesiyle ilişkilidir. [[K3 s. 147]]</li>
<li><b>Nöraksiyel kullanım.</b> Lokal anesteziyi güçlendirmek için spinal 10–25 µg, epidural 25–100 µg kullanılmıştır. [[K3 s. 147]] Lipit çözünürlüğü morfininkinin yaklaşık 600 katıdır, intravenöz etki hızla başlar. [[K3 s. 147]] Tipik intratekal doz BOS’tan omuriliğe hızla geçtiğinden gecikmiş solunum depresyonu yapmaz. [[K3 s. 147]] Morfin daha yavaş girer, bir kısmı BOS akımıyla orta beyne ulaşır. [[K3 s. 147]] Sürekli epidural fentanil veya tekrarlanan boluslarla solunum depresyonu görülür. [[K3 s. 147]]</li>
<li><b>Eliminasyon.</b> Büyük dağılım hacmi ve yüksek lipit çözünürlüğüyle uyumlu olarak klirens morfininkine benzerken eliminasyon yarı ömrü daha uzundur. [[K3 s. 147–148]] Asidik midede &gt;%99.9 iyonize halde hapsolabilir, alkali ince bağırsakta noniyonize hale geçerek emilebilir. [[K3 s. 148]] Hızlı hepatik ilk geçiş nedeniyle sistemik düzeyin anlamlı artması beklenmez. [[K3 s. 148]] N-demetilasyon norfentanil oluşturur, hem fentanil hem norfentanil hidroksillenir ve inaktif ürünler idrarla atılır. [[K3 s. 148]]</li>
</ul>
<h3>Alfentanil</h3>
<ul class="ozet">
<li><b>Uygulama.</b> Renksiz çözelti 500 µg/ml veya 5 mg/ml içerir. [[K3 s. 148]] Kısa analjezi için 5–25 µg/kg bolus, sedasyon için infüzyon kullanılır. [[K3 s. 148]]</li>
<li><b>Eliminasyon.</b> Başlangıç dağılım hacmi fentanilinkinden çok küçüktür, dolayısıyla daha düşük klirense rağmen eliminasyon yarı ömrü daha kısadır. [[K3 s. 148]] Karaciğerde N-demetilasyonla oluşan noralfentanil ve diğer metabolitler konjugasyondan sonra idrarla atılır. [[K3 s. 148]]</li>
<li><b>Etkileşim.</b> Midazolam da CYP3A3/4 ile metabolize olur, birlikte uygulama her iki yarı ömrü belirgin uzatır. [[K3 s. 148]] Eritromisin hepatik CYP450 inhibisyonuyla alfentanilin etkisini uzatabilir. [[K3 s. 148]]</li>
</ul>
<h3>Remifentanil</h3>
<ul class="ozet">
<li><b>Sunum.</b> Fentanile benzer potenste saf µ agonistidir. [[K3 s. 148]] Cam flakonda 1, 2 veya 5 mg hidroklorür tuzu, glisin içeren beyaz kristalize toz halinde sunulur. [[K3 s. 148]] Spinal veya epidural kullanım ruhsatı yoktur. [[K3 s. 148]] İntravenöz infüzyon için çoğu kristalloid veya steril suyla seyreltildiğinde 24 saat stabildir. [[K3 s. 148]]</li>
<li><b>Koindüksiyon.</b> En sık propofolle kullanılır, 12 yaş ve üzerinde hedef kontrollü infüzyon (TCI) tercih edilir (3–6 ng/ml). [[K3 s. 149]] Manuel uygulamada veya 12 yaş altında en az 45 saniyede 0.5–1 µg/kg bolusu, 0.25 µg/kg/dk’ya kadar infüzyon izleyebilir. [[K3 s. 149]]</li>
<li><b>Analjezi.</b> Plazma hedefi &gt;5 ng/ml veya hız &gt;0.2 µg/kg/dk ise hiperaljezi gelişebilir ve postoperatif opioid gereksinimi beklenenden yüksek olabilir. [[K3 s. 149]] Kısa etkisi nedeniyle remifentanil postoperatif analjezi sağlamaz. [[K3 s. 149]]</li>
<li><b>Diğer etkiler.</b> Morfin gibi solunum depresyonu ve göğüs duvarı rijiditesi yapar, ultra kısa etki nedeniyle bulantı ve kusma daha seyrek görünür. [[K3 s. 149]] Kalp hızı ve kan basıncındaki düşüşü glikopirolat, analjeziyi nalokson geri döndürür. [[K3 s. 149]]</li>
<li><b>Yıkım.</b> Plazma kolinesterazı için zayıf substrattır, kolinesteraz eksikliği ve antikolinesterazlar metabolizmasını değiştirmez. [[K3 s. 149]] Karaciğer veya böbrek işlev bozukluğu etkilerini uzatmaz. [[K3 s. 149]] İdrarla atılan karboksilik asit metaboliti hemen hemen inaktiftir (potens 1/4600), sağlıklı erişkinde yarı ömrü 2 saattir. [[K3 s. 149]]</li>
</ul></section>

<section class="wrap blk ders-sec" id="a10b-oksikodon">
<h2>Oksikodon ve oral nalokson</h2>
<p class="intro">Oksikodon ve morfinin profilleri benzerdir, ancak bireysel tolerans farklılığı oksikodonu alternatif kılabilir. [[K3 s. 149]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı tablette agonist ve antagonist</h3></div><div data-viz="a10b_ilkgecis"></div><p class="viz-cap" aria-live="polite">Oksikodon bağırsaktan emilir ve oral dozun %85’i sistemik dolaşıma ulaşır. [[K3 s. 149]]</p><p class="viz-foot">Şematik/nitel ilaç yolları. [[K3 s. 149–150]]</p></div>
<p>Bağırsaktaki etki, dirençli konstipasyonla birlikte şiddetli ağrıda kombinasyonun kullanımını açıklar. [[K3 s. 149–150]]</p>
<ul class="ozet"><li><b>Targinact.</b> Uzatılmış salımlı tablette sabit oksikodon/nalokson dozları 5 mg/2.5 mg, 10 mg/5 mg, 20 mg/10 mg veya 40 mg/20 mg’dır. [[K3 s. 149]]</li>
<li><b>Postoperatif kullanım.</b> Uzatılmış salıma rağmen konstipasyonun sorun oluşturabileceği hemoroidektomi veya pelvik taban onarımı sonrasında rolü olabilir. [[K3 s. 150]]</li></ul></section>

<section class="wrap blk ders-sec" id="a10b-petidin">
<h2>Petidin ve metadon</h2>
<p class="intro">Petidinin etkisi 120–150 dakika sürerken aktif metaboliti norpetidinin eliminasyon yarı ömrü 14–21 saattir. [[K3 s. 150–151]]</p>
<div class="viz"><div class="viz-head"><h3>Norpetidin nerede birikir?</h3></div><div data-viz="a10b_birikim"></div><p class="viz-cap" aria-live="polite">Doğum eyleminde sık kullanılan lipofilik petidin fetüse önemli miktarda geçer. [[K3 s. 150]] Fetal norpetidin, annenin ilk intramüsküler dozundan yaklaşık 4 saat sonra doruğa ulaşır. [[K3 s. 150]] Düşük fetal klirens iki ilacın da yarı ömrünü üç katına çıkarır. [[K3 s. 150]]</p><p class="viz-foot">Şematik/nitel birikim yolları. [[K3 s. 150]]</p></div>
<p>Metadonda ise uzun plazma yarı ömrü ana ilaca aittir, karaciğerde oluşan metabolitler inaktiftir. [[K3 s. 151]]</p>
<div class="cols"><article class="card"><h3>Petidin</h3><ul>
<li>İlk olarak antikolinerjik amaçla tasarlanan bu sentetik fenilpiperidinin analjezik etkisi sonradan gösterilmiştir. [[K3 s. 150]]</li>
<li>Tablet ve 10–50 mg/ml enjeksiyon çözeltisi bulunur. [[K3 s. 150]] Tüm opioidlerde olduğu gibi doz etkiye göre titre edilir. [[K3 s. 150]] İntravenöz veya intramüsküler doz 0.5–1.0 mg/kg’dır, 2–3 saatte bir tekrarlanabilir. [[K3 s. 150]]</li>
<li>Morfinden daha lipofiliktir ve daha hızlı etki eder, oral biyoyararlanımı %50’dir. [[K3 s. 150]]</li>
<li>Hepatik ester hidrolizi inaktif petidinik asidi, N-demetilasyon ise yarı güçte analjezik norpetidini oluşturur. [[K3 s. 150]] İki metabolit ve az miktarda değişmemiş petidin idrarla atılır. [[K3 s. 151]]</li>
<li>Morfinle ortak etkilere ek olarak antikolinerjik etkilerle ağız kuruluğu, bazen taşikardi, daha hafif miyozis ve olası midriyazis görülür. [[K3 s. 150]] Daha az safra yolu spazmı yaptığı söylenir, klinik önemi belirsizdir. [[K3 s. 150]]</li>
<li>Monoamin oksidaz inhibitörleri (MAOİ) amin yıkımını azaltır, petidin serotonin geri alımını engeller. [[K3 s. 150]] Birlikte kullanımda olası santral serotonerjik hiperaktivite komaya, labil dolaşıma, konvülziyonlara ve hiperpireksiye yol açabilir. [[K3 s. 150]]</li>
</ul></article><article class="card"><h3>Metadon</h3><ul>
<li>Görece düşük ilk geçiş, %75 oral biyoyararlanım sağlar. [[K3 s. 151]] Plazma yarı ömrü 18–36 saattir ve proteine %90 bağlanır. [[K3 s. 151]]</li>
<li>Opioid bağımlılığında dozun yavaş azaltıldığı programlarda kullanılır ve morfinden daha az sedasyon yapar. [[K3 s. 151]]</li>
<li>NMDA antagonizması gösterebilir, bu etkinin tipik opioidlere dirençli bazı nöropatik ağrılarda yararlı olabileceği düşünülür. [[K3 s. 151]]</li>
<li>%40’a kadarı değişmeden idrara geçer, asidik koşullar bu atılımı artırır. [[K3 s. 151]]</li>
</ul></article></div>
<div class="note plain"><b>Atlas notu.</b> Kitap petidin dışındaki opioidleri MAOİ ile güvenli sayar. Aynı bölümde tapentadol için 14 gün MAOİ uyarısı yer aldığından ve tramadol de MAOİ ile kontrendike olduğundan bu genelleme geçerli değildir.</div>
</section>

<section class="wrap blk ders-sec" id="a10b-tramadol">
<h2>Tramadol ve tapentadol</h2>
<p class="intro">Her iki ilaç µ agonizmasını noradrenalin geri alımının inhibisyonuyla birleştirir, serotonin üzerindeki etkileri farklıdır. [[K3 s. 151–152]]</p>
<div class="viz"><div class="viz-head"><h3>Analjeziye hangi yollar katılır?</h3></div><div data-viz="a10b_ikiliyol"></div><p class="viz-cap" aria-live="polite">Tramadol opioid reseptörlerini uyarırken noradrenalin ile 5-HT geri alımını azaltır ve presinaptik 5-HT salımını artırır. [[K3 s. 151]]</p><p class="viz-foot">Şematik/nitel mekanizma karşılaştırması. [[K3 s. 151–152]]</p></div>
<p>Tramadolde omuriliğin inen inhibitör yolları da analjeziye katılır. [[K3 s. 151]] Tapentadolün serotonerjik antidepresanlarla birlikte kullanımında serotonin sendromu bildirilmiştir. [[K3 s. 152]]</p>
<div class="a10b-karsilastir"><article class="card"><h3>Tramadol</h3><ul>
<li><b>Yapı ve potens.</b> Rasemik sikloheksanol türevinin enantiyomerleri özgül etkiler gösterir, analjezik potensi morfinin 1/5–1/10’u kadardır. [[K3 s. 151]]</li>
<li><b>Sunum.</b> Tablet, kapsül veya saşe (modifiye salımlı 50–400 mg) ve intravenöz/intramüsküler çözelti (2 ml’de 100 mg) bulunur. [[K3 s. 151]]</li>
<li><b>Etkiler.</b> Eşanaljezik dozda morfinden daha az konstipasyon ve solunum depresyonu yapar, diğer etkiler benzerdir. [[K3 s. 151]] Nalokson analjeziyi ve solunum depresyonunu geri döndürür. [[K3 s. 151]]</li>
<li><b>Nöbet.</b> Santral serotonin veya noradrenalin geri alımını engelleyen trisiklik antidepresanlar ve selektif serotonin geri alım inhibitörleri (SSRI) ile nöbet gelişebilir. [[K3 s. 151]] Epilepside kullanılmamalıdır. [[K3 s. 151]]</li>
<li><b>Kinetik.</b> Bağırsaktan iyi emilir, oral biyoyararlanım %70 iken tekrarlanan dozlarla %90’ı aşar. [[K3 s. 151]] Hepatik CYP2D6, CYP3A4 ve CYP2B6 ile metabolizmayı glukuronidasyon izler. [[K3 s. 151–152]] Ürünler idrarla atılır, yalnız O-desmetiltramadolün analjezisi gösterilmiştir. [[K3 s. 151–152]] Dağılım hacmi 4 l/kg, eliminasyon yarı ömrü 5–6 saattir. [[K3 s. 152]]</li>
</ul></article><article class="card"><h3>Tapentadol</h3><ul>
<li><b>Yapı ve kullanım.</b> Alkilbenzen yapısındaki dört stereoizomerden yalnız R,R tıbbi kullanımdadır. [[K3 s. 152]] Akut veya kronik, orta ya da şiddetli ağrıda başlangıç dozu 4–6 saatte bir 50 mg’dır. [[K3 s. 152]]</li>
<li><b>Sunum.</b> Hızlı salımlı 50–75 mg tablet, 20 mg/ml oral çözelti ve 50–250 mg sürekli salımlı preparat bulunur. [[K3 s. 152]]</li>
<li><b>Etkileşim.</b> Nöbet tetikleyebilir, epilepsi veya nöbet öyküsünde dikkat gerekir. [[K3 s. 152]] SSRI, trisiklik antidepresan ve antipsikotik gibi nöbet eşiğini düşüren ilaçlar riski artırabilir. [[K3 s. 152]] Noradrenalin geri alım inhibisyonu nedeniyle üretici MAOİ ile arasında 14 gün olmasını önerir. [[K3 s. 152]]</li>
<li><b>Kinetik.</b> Yoğun hepatik ilk geçiş biyoyararlanımı %30’a indirir. [[K3 s. 152]] Başlıca yol glukuronidasyondur, sınırlı bir kısmı ileri glukuronidasyon öncesinde CYP2C9, CYP2C19 ve CYP2D6 ile oksitlenir. [[K3 s. 152]] Metabolitler inaktiftir, atılım başlıca böbrektendir. [[K3 s. 152]] Proteine bağlanma %20, dağılım hacmi yaklaşık 550 litre, eliminasyon yarı ömrü 4 saattir. [[K3 s. 152]]</li>
</ul></article></div></section>

<section class="wrap blk ders-sec" id="a10b-antagonist">
<h2>Nalokson ve parsiyel agonistler</h2>
<p class="intro">Saf antagonist nalokson µ, κ ve δ reseptörlerindeki opioid etkilerini geri döndürür, en yüksek afinitesi µ reseptörünedir. [[K3 s. 152]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi reseptörde agonist, hangisinde antagonist?</h3></div><div data-viz="a10b_reseptor"></div><p class="viz-cap" aria-live="polite">Nalokson saf antagonisttir ve en yüksek afinitesi µ reseptörünedir. [[K3 s. 152]]</p><p class="viz-foot">Şematik/nitel reseptör profilleri. [[K3 s. 152–153]]</p></div>
<p>Parsiyel agonistler ağrı kontrolünde ve opioide bağlı solunum depresyonunu gidermede değişken başarı göstermiştir, kullanımları yaygın değildir. [[K3 s. 152]]</p>
<ul class="ozet">
<li><b>Nalokson.</b> Opioid doz aşımında tercih edilen intravenöz doz 1–4 µg/kg’dır. [[K3 s. 152]] Etkisi 30–40 dakika sürer, morfin veya yüksek doz fentanilin etkisi daha uzun olduğundan ek doz ya da infüzyon gerekebilir. [[K3 s. 152]] Bazen hipertansiyon, pulmoner ödem, kardiyak aritmi ve önceden opioid almamış kişilerde antianaljezi görülür. [[K3 s. 152]]</li>
<li><b>Pentazosin.</b> Çok az solunum depresyonuyla analjezi sağlar, ancak bulantı, kusma, halüsinasyon ve disfori nedeniyle nadiren kullanılır. [[K3 s. 153]]</li>
<li><b>Buprenorfin.</b> Yapısı morfine benzer, potensi daha yüksektir ve reseptöre bağlanması etkiyi 10 saate kadar uzatır. [[K3 s. 153]] Sublingual tablet ve transdermal yama olarak sunulur. [[K3 s. 153]] Düşük konsantrasyonda µ analjezisi görülürken doz arttıkça NOP etkisi baskınlaşır ve antianaljezi oluşur. [[K3 s. 153]] CYP3A4 metabolizmasını konjugasyon izler, %70’i safraya, kalanı idrara geçer. [[K3 s. 153]] Bulantı ve kusma şiddetli, uzun sürelidir. [[K3 s. 153]]</li>
<li><b>Nalbufin.</b> Morfinle eşpotenttir, hem solunum depresyonu hem analjezi tavan etkisi gösteriyor görünür. [[K3 s. 153]] Nalokson etkilerini geri döndürebilir. [[K3 s. 153]]</li></ul></section>

<section class="wrap blk ders-sec" id="a10b-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız yanıtlayın.</p>
<div class="viz"><div data-viz="mtf" data-q="far10b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far10b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far10b-3"></div></div></section>
<section class="wrap blk ders-sec" id="a10b-p2"><h2>Part II · SOE 2 (farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Fentanil ile alfentanilin etki başlangıcını karşılaştırın. İnfüzyon uzadığında bu iki ilacın ve remifentanilin etki süreleri nasıl değişir? Postoperatif analjezi ve antagonizma açısından sonuçları nelerdir?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Fentanil yüksek lipofilikliğiyle hızla etki eder, küçük intravenöz dozun etkisini dağılım sonlandırır. [[K3 s. 147]]</li>
<li>Alfentanilde pH 7.4’te noniyonize fraksiyonun yüksekliği, eşpotent dozlarda fentanilden hızlı başlangıcı açıklar. [[K3 s. 148]]</li>
<li>Fentanilde doku doygunluğu, alfentanilde sedasyon amaçlı infüzyon etki süresini uzatır. [[K3 s. 147–148]]</li>
<li>Remifentanil propofolle koindüksiyonda kullanılır, nonspesifik esterazlarla hızlı yıkıldığı için infüzyonun uzaması bağlama duyarlı yarılanma süresini anlamlı değiştirmez. [[K3 s. 149]]</li>
<li>Remifentanil kesilince analjezik katkı beklenmez, hiperaljezi gelişmişse postoperatif opioid gereksinimi artabilir. [[K3 s. 149]]</li>
<li>Yüksek doz fentanilin etkisi naloksonunkini aşabilir, antagonizma için ek doz veya infüzyon gerekebilir. [[K3 s. 152]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Üç paralel yol çizin. Fentanilde dağılım ve doku doygunluğunu, alfentanilde noniyonize fraksiyon ve infüzyon etkisini, remifentanilde esterazlarla yıkımı işaretleyin. [[K3 s. 147–149]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Midazolam alfentanilin eliminasyonunu nasıl değiştirir? [[K3 s. 148]] Remifentanilin kalp hızı ve kan basıncına etkisi nasıl geri döndürülür? [[K3 s. 149]]</div></div></section>
<section class="wrap blk ders-sec" id="a10b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Kodeinin CYP2D6 ile morfine dönüşümü analjezi ve toksisitedeki değişkenliği açıklar. [[K3 s. 146]]</li>
<li>Fentanilde doku doygunluğu etkiyi uzatır, remifentanilde esterazlar infüzyon uzasa da hızlı yıkımı sürdürür. [[K3 s. 147]] [[K3 s. 149]]</li>
<li>İlk geçiş metabolizması, oral oksikodon/nalokson kombinasyonunda sistemik analjezi ile bağırsaktaki antagonizmayı ayırır. [[K3 s. 149–150]]</li>
<li>Norpetidin böbrek yetmezliğinde birikir ve nöbetlerle ilişkilidir. [[K3 s. 150]]</li>
<li>Tramadol ve tapentadol için nöbet öyküsü ve eşlik eden antidepresanlar önemlidir. [[K3 s. 151–152]]</li>
<li>Naloksonun etki süresi, antagonize ettiği opioidinkinden kısa kalabilir. [[K3 s. 152]]</li>
</ul><div data-viz="tamam" data-modul="farmakoloji" data-bolum="10b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/10a">← 10a · Opioidler: fizyoloji, reseptörler ve morfin</a><a href="#/dersler/farmakoloji/10c">Sonraki: 10c · NSAİİ'ler: etki mekanizması, nonspesifik COX inhibitörleri ve parasetamol →</a></nav></section>`
};
