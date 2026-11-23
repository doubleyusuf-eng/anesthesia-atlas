VERI.sorular = VERI.sorular || {};
VERI.sorular['far01-1'] = {
  no: 1, kok: 'Zar yapısı ve iyon kanalları', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 1–3]]',
  onermeler: [
    { t: 'Fosfolipitlerin hidrofilik başları çift tabakanın ortasında karşılaşır.', d: false, n: 'Ortada lipofilik zincirler karşılaşır, başlar iki yüzeye bakar. [[K3 s. 1]]' },
    { t: 'Sıkı bağlantılar glikoproteinlerin zar içindeki yanal hareketini sınırlar.', d: true, n: 'Bu sınır, özelleşmiş taşıyıcıların iş gördükleri yüzeyde kalmasına yardım edebilir. [[K3 s. 2]]' },
    { t: 'Asetilkolin reseptörünün kanalı Na⁺ iyonuna özgüdür.', d: false, n: 'Kanal küçük katyonlara seçicidir ve Na⁺ dışındaki küçük katyonları da geçirir. [[K3 s. 2]]' },
    { t: 'Olgun nöromüsküler kavşakta ε alt birimi fetal γ alt biriminin yerini alır.', d: true, n: 'Reseptördeki bu değişim doğumdan sonra kavşağın olgunlaşmasıyla gerçekleşir. [[K3 s. 3]]' },
    { t: 'Lokal anestezikler hızlı Na⁺ kanalının dış yüzeyine bağlanır.', d: false, n: 'İç yüzeye bağlanarak kanalın açılması için gereken biçim değişikliğini engellerler. [[K3 s. 3]]' },
  ],
};
VERI.sorular['far01-2'] = {
  no: 2, kok: 'Taşıyıcılar, aktif taşıma ve pinositoz', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 3–5]]',
  onermeler: [
    { t: 'Glukozun kolaylaştırılmış difüzyonunda SLC ailesi 2 taşıyıcıları görev alır.', d: true, n: 'Bu taşıyıcılar polar glukozun gradyanı boyunca geçişini hızlandırır. [[K3 s. 3]]' },
    { t: 'Na⁺/K⁺ ATPaz bir simport örneğidir.', d: false, n: 'İyonlar karşıt yönlerde taşındığından bu pompa bir antiport örneğidir. [[K3 s. 4]]' },
    { t: 'Na⁺/amino asit simportunda Na⁺ kendi gradyanı yönünde ilerler.', d: true, n: 'Na⁺ taşıyıcıya bağlanıp gradyanı boyunca ilerlediğinde amino asit de zarı geçer. [[K3 s. 4]]' },
    { t: 'Verapamil dabigatranın biyoyararlanımını artırır.', d: true, n: 'Verapamil P-glikoproteini inhibe eder ve bu taşıyıcının substratı olan dabigatranla kanama riski artar. [[K3 s. 4]]' },
    { t: 'Pinositozla alınan molekülün vakuolden hücre içine salınması zorunludur.', d: false, n: 'Molekül karşı yüzde ters süreçle bırakılana dek vakuolde de kalabilir. [[K3 s. 5]]' },
  ],
};
VERI.sorular['far01-3'] = {
  no: 3, kok: 'Difüzyon ve serbest ilaç', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 5–8]]',
  onermeler: [
    { t: 'pH, pKa değerinin altındayken zayıf bazın yüksüz biçimi baskındır.', d: false, n: 'Bu koşulda zayıf bazın proton almış, pozitif yüklü biçimi baskındır. [[K3 s. 6]]' },
    { t: 'Serbest ilacın plazma ile etki yeri arasındaki konsantrasyon farkının büyümesi etki başlangıcını hızlandırır.', d: true, n: 'Fick yasasına göre gradyan büyüyünce zardan geçiş hızlanır. [[K3 s. 5]]' },
    { t: 'Fizyolojik pH’da alfentanilin yüksüz fraksiyonu fentanilinkinden büyüktür.', d: true, n: 'İkisi de zayıf bazdır ve alfentanilin pKa değeri daha düşüktür. [[K3 s. 7]]' },
    { t: 'Fenitoinde proteine bağlanmanın azalması serbest ilaç düzeyini toksik aralığa çıkarabilir.', d: true, n: 'Yüksek oranda bağlanan fenitoinin metabolizması doygunluğa yakın olduğunda serbest ilaç artışını karşılayamayabilir. [[K3 s. 7]]' },
    { t: 'Ağır hipoalbüminemide aynı dozun farmakolojik etkisi belirgin biçimde artabilir.', d: true, n: 'Bağlanmamış ilaç oranı yükselir ve etkinin büyüklüğünü önceden kestirmek güç olabilir. [[K3 s. 8]]' },
  ],
};

const A01_NAV = [
  ['zar', 'Zar yapısı'], ['kanal', 'İyon kanalları'], ['tasima', 'Taşıma yolları'],
  ['hiz', 'Difüzyon hızı'], ['ph', 'pH ve pKa'], ['lipit', 'Lipitte çözünürlük'],
  ['protein', 'Proteine bağlanma'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/01'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 1', baslik: 'İlaçların hücre zarından geçişi',
  lede: 'Birçok ilaç etki yerine ulaşırken bir ya da birkaç hücre zarını aşar. [[K3 s. 1]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A01_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a01-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a01-zar">
<h2>Zarın hangi kısmından geçilir?</h2>
<p class="intro">Yaklaşık 10 nm kalınlığındaki fosfolipit çift tabakanın iki yüzü hidrofilik, ortası hidrofobiktir. [[K3 s. 1]]</p>
<div class="viz"><div class="viz-head"><h3>Çift tabakayı dıştan içe okuyun</h3></div><div data-viz="a01_zar"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel, ölçekli çizilmemiştir. [[K3 s. 1]]</p></div>
<p>Glikoproteinler zarı boydan boya geçebilir veya iç ya da dış yaprakçığa tutunabilir. [[K3 s. 1]] Zarda taşıyıcılar, enzimler, G proteinleri, G proteinine kenetli reseptörler ve ligand veya voltaj kapılı iyon kanalları bulunabilir. [[K3 s. 1]]</p>
<p>Fosfogliseritler ve glikoproteinler yer değiştirebildiği için zar bir “akıcı mozaik”tir. [[K3 s. 1]] G proteinleri ara haberci görevi görebilir. [[K3 s. 1]] Motor sinir ucunun karşısında dizilen postsinaptik reseptörler bu hareketliliğin sınırlı olduğu bir örnektir. [[K3 s. 1]]</p>
<ul class="ozet">
<li><b>Kapiller fenestra.</b> Endotel hücresinin iki zarı arada sitozol kalmadan birleşir ve özellikle sıvı hücrenin içinden hızla geçebilir. [[K3 s. 1]]</li>
<li><b>Glomerüler yarık.</b> Komşu endotel hücreleri arasındaki açıklıklar filtrasyon sırasında daha büyük moleküllere geçit verir. [[K3 s. 1–2]]</li>
<li><b>Sıkı bağlantı.</b> Beyin damarlarında endotel hücreleri arasındaki bu bağlantılar kan-beyin bariyerini oluşturur. [[K3 s. 2]] Bağırsak mukozasında ve böbrek tübüllerinde de bulunan bağlantılar polar moleküllerin geçişini ve glikoproteinlerin yanal hareketini sınırlar. [[K3 s. 2]] Böylece bağırsakta taşıyıcıların lümene bakan yüzde kalmasına yardım edebilirler. [[K3 s. 2]]</li>
</ul></section>

<section class="wrap blk ders-sec" id="a01-kanal">
<h2>Pasif difüzyon ve iyon kanalları</h2>
<p class="intro">En yaygın geçiş yolu pasif difüzyondur: moleküller enerji harcamadan yüksek konsantrasyondan düşük konsantrasyona ilerler. [[K3 s. 2]]</p>
<div class="viz"><div class="viz-head"><h3>Asetilkolin bağlanınca kanal nasıl açılır?</h3></div><div data-viz="a01_ach"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 2–3]]</p></div>
<p>Birçok ilaç zayıf asit veya bazdır. [[K3 s. 2]] Yüksüz biçim lipit tabakada çözünerek kolayca geçer, bu yüzden pH ve ilacın pKa değeri geçiş hızını etkiler. [[K3 s. 2]]</p>
<p>Seçici kanallar açıldığında iyonlar birkaç milisaniye boyunca büyük konsantrasyon ve elektrik gradyanları yönünde hızla akar. [[K3 s. 2]] Bu özellik ligand veya voltaj kapılı kanalları sinir ve kasta aksiyon potansiyelinin yayılmasına elverişli kılar. [[K3 s. 2]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Reseptör</th><th>Yapı ve seçicilik</th></tr></thead><tbody>
<tr><th>Asetilkolin (ACh)</th><td>Beş alt birim ortadaki kanalı çevreler ve iki α alt birimi özdeştir. [[K3 s. 2]] Açık kanaldan Na⁺ dâhil küçük katyonlar yaklaşık 10⁷ s⁻¹ hızla geçer. [[K3 s. 2]] Akış eşiğe ulaşırsa depolarizasyon impuls iletimini sağlar. [[K3 s. 2]] Doğumdan sonra kavşak olgunlaşırken fetal γ yerini ε alt birimine bırakır. [[K3 s. 3]]</td></tr>
<tr><th>GABA<sub>A</sub></th><td>Ligand kapılı pentamer anyonları, özellikle Cl⁻ iyonunu geçirir. [[K3 s. 2]]</td></tr>
<tr><th>NMDA</th><td>N-metil D-aspartat reseptörü başka bir kanal ailesindendir ve zar depolarizasyonuna aracılık eden katyon olarak Ca²⁺’u tercih eder. [[K3 s. 2]] Kitap yapıyı “dimer” diye tanımlar. [[K3 s. 2]]</td></tr>
</tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap NMDA reseptörüne dimer der. İşlevsel reseptör iki heterodimerden oluşan bir heterotetramerdir.</div>
<p>Endojen bileşikler ve ilaçlar kanal geçirgenliğini değiştirebilir. [[K3 s. 3]]</p>
<ul class="ozet"><li><b>Lokal anestezik:</b> Hızlı Na⁺ kanalının iç yüzüne bağlanır ve aktivasyon için gerekli biçim değişimini engeller. [[K3 s. 3]]</li>
<li><b>Nondepolarizan kas gevşetici:</b> Bağlanma yerinde ACh ile yarışarak reseptör aktivasyonunu önler. [[K3 s. 3]]</li></ul></section>

<section class="wrap blk ders-sec" id="a01-tasima">
<h2>Taşıyıcı, pompa veya vakuol</h2>
<p class="intro">Taşıyıcıyla geçişte önce yöne bakın: kolaylaştırılmış difüzyon gradyanı izler, aktif taşıma maddeyi enerji kullanarak gradyanına karşı götürür. [[K3 s. 3]]</p>
<div class="viz"><div class="viz-head"><h3>Amino asidi taşıyan enerji nereden gelir?</h3></div><div data-viz="a01_pompa"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 3–4]]</p></div>
<ul class="ozet"><li><b>Kolaylaştırılmış difüzyon.</b> Molekül zardaki taşıyıcıya bağlanır ve kompleks gradyan boyunca ilerleyerek geçişi hızlandırır. [[K3 s. 3]] Örneğin polar glukozun tek başına yavaş kalacak emilimini solüt taşıyıcı (SLC) ailesi 2 hızlandırır. [[K3 s. 3]]</li>
<li><b>Sinaptik taşıyıcılar.</b> Kitap SLC ailesi 6 içinde dopamini SLC6A3, serotonini SLC6A4, noradrenalini SLC6A5 ile eşleştirir. [[K3 s. 3]] Bu taşıyıcıları hedefleyen antidepresanlardan seçici serotonin geri alım inhibitörleri (SSRI) SLC6A4’ü inhibe eder. [[K3 s. 3]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap noradrenalin taşıyıcısını SLC6A5 olarak verir. Güncel adlandırmada noradrenalin taşıyıcısı (NET) SLC6A2, glisin taşıyıcısı GlyT2 ise SLC6A5’tir.</div>
<p>Aktif taşıma bağırsak mukozasında, karaciğerde, böbrek tübüllerinde ve kan-beyin bariyerinde yaygındır. [[K3 s. 4]]</p>
<ul class="ozet"><li><b>Primer aktif taşıma.</b> Na⁺/K⁺ ATPaz, ATP’nin yüksek enerjili fosfat bağının hidrolizini iki iyonun kendi gradyanlarına karşı taşınmasına doğrudan bağlar. [[K3 s. 4]] İyonların yönü zıt olduğundan bu bir antiporttur. [[K3 s. 4]]</li>
<li><b>Sekonder aktif taşıma.</b> İnce bağırsak mukozasında ve proksimal böbrek tübülünün lümene bakan yüzünde amino asit, Na⁺ taşıyıcıya bağlanıp gradyanı boyunca ilerlediğinde geçer. [[K3 s. 4]] İkisi aynı yöne gider (simport) ve enerji, pompanın sürdürdüğü Na⁺ gradyanından dolaylı gelir. [[K3 s. 3–4]]</li>
<li><b>Pinositoz.</b> Zar, genellikle başka yolla kolay geçemeyecek kadar büyük bir molekülün çevresine çökerek bir vakuol oluşturur. [[K3 s. 5]] Molekül hücre içine bırakılabilir veya vakuolde karşı yüze taşınıp orada ters süreçle salınabilir. [[K3 s. 5]]</li></ul>
<h3>P-glikoprotein ve dabigatran</h3>
<p>Primer aktif taşıyıcılardan ABC (ATP bağlayan kaset) ailesi temel besinleri içeri, toksinleri dışarı taşır. [[K3 s. 4]] Bu aileden çoklu ilaç direnci taşıyıcısı P-glikoprotein (PGP), bağırsak mukozası ve kan-beyin bariyerinde bulunur. [[K3 s. 4]] Substratı olan birçok sitotoksik, antimikrobiyal ve başka ilaç kan-beyin bariyerini geçemez. [[K3 s. 4]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Birlikte verilen ilaç</th><th>PGP substratı olan antikoagülan dabigatrana etkisi</th></tr></thead><tbody>
<tr><th>Amiodaron, verapamil</th><td>PGP inhibisyonu biyoyararlanımı ve kanama riskini artırır. [[K3 s. 4]]</td></tr>
<tr><th>Rifampisin</th><td>PGP indüksiyonu biyoyararlanımı azaltır ve antikoagülasyon yetersiz kalır. [[K3 s. 4]]</td></tr></tbody></table></div>
<p>PGP inhibitörleri ve indükleyicileri genellikle CYP3A4’ü de aynı yönde etkiler ve her ikisinin substratı olan ilaçlarla güçlü etkileşir. [[K3 s. 5]]</p></section>

<section class="wrap blk ders-sec" id="a01-hiz">
<h2>Difüzyon hızı: boyut ve gradyan</h2>
<p class="intro">Küçük moleküller daha kolay geçer, serbest ilacın iki taraf arasındaki konsantrasyon farkı büyüdükçe de geçiş hızlanır. [[K3 s. 5]]</p>
<div class="viz"><div class="viz-head"><h3>Gradyan büyüyünce akış nasıl değişir?</h3></div><div data-viz="a01_gradyan"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel, noktalar konsantrasyon ölçümü değildir. [[K3 s. 5]]</p></div>
<ul class="ozet"><li><b>Graham yasası.</b> Pasif difüzyon hızı moleküler boyutun kareköküyle ters orantılıdır. [[K3 s. 5]] Anesteziklerin görece küçük molekül ağırlığı lipit zarı hızla geçip etki göstermelerine elverir. [[K3 s. 5]]</li>
<li><b>Fick yasası.</b> Geçiş hızı konsantrasyon gradyanıyla doğru orantılıdır. [[K3 s. 5]] Plazmada bağlanmamış ilaç konsantrasyonunu yükseltmek geçişi ve farmakolojik etkinin başlangıcını hızlandırır. [[K3 s. 5]]</li>
<li><b>Bowman ilkesi.</b> Potensi düşük nondepolarizan kas gevşeticiyle aynı etki için daha fazla ilaç gerekir. [[K3 s. 5]] Böylece plazma ile etki yeri arasındaki gradyan büyür ve etki daha hızlı başlar. [[K3 s. 5]]</li></ul></section>

<section class="wrap blk ders-sec" id="a01-ph">
<h2>pH ve pKa: hangi biçim geçebilir?</h2>
<p class="intro">Lipit tabakadan yalnız yüksüz fraksiyon geçebilir ve bu fraksiyonu ilacın moleküler yapısı ile ortam pH’sı belirler. [[K3 s. 6]]</p>
<div class="viz"><div class="viz-head"><h3>Zayıf asit ile zayıf bazı aynı pH’da karşılaştırın</h3></div><div data-viz="a01_iyon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 6]]</p></div>
<p>pKa, moleküllerin %50’sinin iyonize olduğu pH’dır: yüklü ve yüksüz biçimler eşit konsantrasyondadır. [[K3 s. 6]] pKa moleküler yapıya bağlıdır ve tek başına ilacın asit ya da baz olduğunu göstermez. [[K3 s. 6]]</p>
<div class="note"><b>Henderson–Hasselbalch denklemi.</b> pH = pKa + log([proton alıcısı]/[proton vericisi]). [[K3 s. 6]] Oranı proton alan ve veren biçimlerle kurmak, pH ve pKa’dan iyonizasyonu bulmayı kolaylaştırır. [[K3 s. 6]]</div>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Molekül</th><th>Denklem ve klinik örnek</th></tr></thead><tbody>
<tr><th>Zayıf asit</th><td>pH = pKa + log([X⁻]/[XH]), yüklü biçim X⁻’dir. [[K3 s. 6]] Aspirin (pKa 3,0) fizyolojik pH’da neredeyse tümüyle yüklüdür. [[K3 s. 6]] Asidik midede yüksüz biçim baskındır ve emilim hızlanır. [[K3 s. 6]] Midenin yüzey alanı sınırlı olduğundan toplamda daha fazla aspirin ince bağırsakta emilir. [[K3 s. 6]]</td></tr>
<tr><th>Zayıf baz</th><td>pH = pKa + log([X]/[XH⁺]), yüklü biçim XH⁺’dır. [[K3 s. 6]] Bupivakainin piperidin halkasındaki tersiyer amin azotu proton alabilir. [[K3 s. 6]] pKa değeri 8,1 olan bupivakain fizyolojik pH’da %83 iyonizedir. [[K3 s. 6]]</td></tr></tbody></table></div></section>

<section class="wrap blk ders-sec" id="a01-lipit">
<h2>Lipitte çözünürlük ve etki başlangıcı</h2>
<p class="intro">Lipitte çözünürlük yalnız yüksüz biçim için tanımlanır, bu nedenle pKa’dan bağımsızdır ve tek başına etkinin ne hızla başlayacağını belirlemez. [[K3 s. 7]]</p>
<div class="viz"><div class="viz-head"><h3>Alfentanil neden daha hızlı etki eder?</h3></div><div data-viz="a01_opioid"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel karşılaştırma. [[K3 s. 7]]</p></div>
<p>Her iki ilaç da zayıf bazdır. [[K3 s. 7]] Alfentanilin lipitte çözünürlüğü fentanilinkinden yaklaşık yedi kat düşüktür, ancak daha düşük potensi ve daha küçük dağılım hacmi başlangıçtaki plazma–etki yeri gradyanını büyütür. [[K3 s. 7]] Alfentanilin pKa’sı 6,5, fentanilinki 8,4 olduğundan fizyolojik pH’da alfentanilin zarı geçebilen fraksiyonu daha büyüktür. [[K3 s. 7]]</p>
<p>Lipitte çözünürlük uygulama yerinden emilim hızını da etkiler. [[K3 s. 7]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Uygulama</th><th>Çözünürlüğün sonucu</th></tr></thead><tbody>
<tr><th>Transdermal fentanil</th><td>Lipitte yüksek çözünürlük deriden etkin geçiş sağlar. [[K3 s. 7]]</td></tr>
<tr><th>İntratekal diamorfin</th><td>Bölgedeki lipit dokularda kolay çözünür ve bu dokulara bağlanır. [[K3 s. 7]]</td></tr>
<tr><th>İntratekal morfin</th><td>Daha az lipofilik olduğundan beyin-omurilik sıvısında daha uzun kalır ve kraniyale yayılmaya yatkındır, bu da solunum depresyonu riskini artırır. [[K3 s. 7]]</td></tr></tbody></table></div></section>

<section class="wrap blk ders-sec" id="a01-protein">
<h2>Proteine bağlanma: serbest ilaç ne zaman artar?</h2>
<p class="intro">Plazmadan zarı serbestçe geçebilen kısım bağlanmamış ilaçtır ve proteine bağlanma derecesi ilaçlar arasında büyük farklılık gösterir. [[K3 s. 7]]</p>
<div class="viz"><div class="viz-head"><h3>Bağlanma azaldığında iki olası sonuç</h3></div><div data-viz="a01_serbest"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 7]]</p></div>
<p>Bağlanma derecesi pratikte yalnız %90’dan fazla bağlanan ilaçlarda önemlidir: bağlı kısımdaki küçük değişim serbest miktarı büyük ölçüde değiştirebilir. [[K3 s. 7]]</p>
<ul class="ozet"><li><b>Albümin.</b> Genellikle nötr veya asidik ilaçları bağlar (örneğin barbitüratlar). [[K3 s. 7]] İki önemli bağlanma yeri varfarin ve diazepamın adını taşır. [[K3 s. 7]]</li>
<li><b>Globülinler.</b> Özellikle α₁-asit glikoprotein morfin gibi bazik ilaçları bağlar. [[K3 s. 7]] Diğer globülinler özgül iyon ve molekülleri, özellikle metalleri bağlar: demir β₁-globüline, bakır α₂-globüline bağlanır. [[K3 s. 7]]</li>
<li><b>Bağlanma yerleri.</b> Albümin ve globülinlerin çok sayıda bağlanma yerinin sayısı ve özellikleri plazma pH’sına bağlıdır. [[K3 s. 7]] Bağlanma genellikle kolayca tersine döner ve aynı yer için yarışan ilaçların aktif, serbest fraksiyonları değişebilir. [[K3 s. 7]] Başka bir yere bağlanma proteinin şeklini değiştirerek varfarin ve diazepam bölgelerini dolaylı etkileyebilir. [[K3 s. 7]]</li></ul>
<p>Metabolizmanın hızlanması çoğunlukla yeni bir denge kurar. [[K3 s. 7]] Fenitoin gibi yüksek oranda bağlanan az sayıda ilaçta metabolizma doygunluğa yakınsa bu denge kurulamaz ve serbest ilaç toksik düzeylere ulaşabilir. [[K3 s. 7]]</p>
<p>Akut enfeksiyon ve inflamasyonda plazma proteinlerinin göreli oranları değişir ve albümin düşer. [[K3 s. 8]] Bu düşüş protein kaybından kaynaklanmaz ve karaciğerin sentez kapasitesindeki azalmadan bağımsızdır. [[K3 s. 8]]</p>
<p>Yanıklarda veya son dönem sirozda ağır hipoalbüminemi serbest fraksiyonu belirgin artırabilir. [[K3 s. 8]] Aynı doz çok daha güçlü etki gösterebilir ve etkinin büyüklüğü güç kestirildiğinden doz klinik etkiye göre titre edilir. [[K3 s. 8]]</p></section>

<section class="wrap blk ders-sec" id="a01-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far01-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far01-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far01-3"></div></div></section>
<section class="wrap blk ders-sec" id="a01-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Plazmadaki bir ilacın etki yerine pasif difüzyonla ulaşmasını hangi özellikler belirler? Alfentanil ve fentanili karşılaştırarak açıklayın.</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Plazmada proteine bağlanmamış fraksiyonu belirleyin. [[K3 s. 7]]</li>
<li>Lipit tabakadan geçiş için yüksüz biçimi arayın: iyonizasyonu pH ve pKa birlikte belirler. [[K3 s. 6]]</li>
<li>Küçük molekül daha kolay geçer ve serbest konsantrasyon gradyanı büyüdükçe geçiş hızlanır. [[K3 s. 5]]</li>
<li>Yüksüz fentanil lipitte daha iyi çözünür, ancak alfentanilin düşük potensi ve küçük dağılım hacmi başlangıç gradyanını büyütür. [[K3 s. 7]]</li>
<li>Alfentanilin pKa’sı daha düşük olduğundan fizyolojik pH’da yüksüz kısmı daha büyüktür ve etkisi fentanilden hızlı başlar. [[K3 s. 7]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Plazma ve etki yeri arasına bir çift tabaka çizin. Plazmada bağlı ve serbest fraksiyonları ayırın. Serbest ilacın yüksüz biçimini ve yüksekten düşüğe geçiş okunu işaretleyin. [[K3 s. 2]] [[K3 s. 7]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Aspirinin midede emilim hızı ile emilen toplam miktarı nasıl ayırırsınız? [[K3 s. 6]] Fenitoinde bağlanma azalınca metabolizma serbest ilaç artışını neden karşılayamayabilir? [[K3 s. 7]]</div></div></section>
<section class="wrap blk ders-sec" id="a01-ozet"><h2>Özet</h2><ul class="ozet">
<li>Pasif difüzyon gradyanı izler, iyon kanalı açıldığında seçtiği iyonları geçirir. [[K3 s. 2]]</li>
<li>Kolaylaştırılmış difüzyon taşıyıcı kullanır, aktif taşıma ise enerjiyi doğrudan veya iyon gradyanından alır. [[K3 s. 3–4]]</li>
<li>Pinositoz büyük molekülü vakuol içinde taşır. [[K3 s. 5]]</li>
<li>pH, pKa’nın altındayken zayıf asidin, üzerindeyken zayıf bazın yüksüz biçimi baskındır. [[K3 s. 6]]</li>
<li>Alfentanilde büyük başlangıç gradyanı ve yüksek yüksüz fraksiyon etki başlangıcını hızlandırır. [[K3 s. 7]]</li>
<li>Ağır hipoalbüminemide aynı dozla etki artabilir. [[K3 s. 8]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="01"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji">← İçindekiler</a><a href="#/dersler/farmakoloji/02a">Sonraki: 02a · Emilim ve uygulama yolları →</a></nav>
</section>`,
};
