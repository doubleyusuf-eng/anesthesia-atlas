VERI.sorular = VERI.sorular || {};
VERI.sorular['far02a-1'] = {
  no: 1, kok: 'Oral emilim ve biyoyararlanım', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 9–11]]',
  onermeler: [
    { t: 'Aspirinin büyük bölümü mideden emilir.', d: false, n: 'Midedeki hızlı başlangıca rağmen villusların sağladığı yüzey alanı nedeniyle emilimin çoğu ince bağırsakta gerçekleşir. [[K3 s. 9–10]]' },
    { t: 'Propranolol duodenumda mideye göre daha az iyonizedir.', d: true, n: 'Bu zayıf baz midede iyonizedir, duodenumda ise yüksüz fraksiyonu artar ve emilebilir. [[K3 s. 9]]' },
    { t: 'Eşit bolus dozlarda oral biyoyararlanım, intravenöz AUC’nin oral AUC’ye bölünmesiyle hesaplanır.', d: false, n: 'Payda intravenöz, pay ise oral konsantrasyon-zaman eğrisinin altında kalan alandır. [[K3 s. 10–11]]' },
    { t: 'Sütle birlikte alınan tetrasiklinin emilimi azalır.', d: true, n: 'Sütteki kalsiyum tetrasiklinin emilimini azaltır. [[K3 s. 10]]' },
    { t: 'Fenobarbital varfarinin oral biyoyararlanımını artırır.', d: false, n: 'Fenobarbital hepatik enzimleri indükler ve varfarinin biyoyararlanımını azaltır. [[K3 s. 10]]' }
  ]
};
VERI.sorular['far02a-2'] = {
  no: 2, kok: 'Hepatik ekstraksiyon ve doku perfüzyonu', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 11–13]]',
  onermeler: [
    { t: 'Michaelis sabiti, reaksiyon hızının maksimum hızın yarısına ulaştığı substrat konsantrasyonudur.', d: true, n: 'Bu konsantrasyonda enzim maksimum hızının %50’siyle çalışır. [[K3 s. 11]]' },
    { t: 'Lidokainin karaciğerde metabolize edilen miktarını büyük ölçüde hepatik kan akımı belirler.', d: true, n: 'Hızlı hücresel alım ve metabolizma gradyanı korur, bağlı ilaç serbest ilaçla hızla dengelenir. [[K3 s. 12]]' },
    { t: 'Fenitoin metabolizmasında enzim doyduğunda hepatik ekstraksiyon artar.', d: false, n: 'Hücre içi düzey yüksek kalınca konsantrasyon farkı küçülür ve ekstraksiyon azalır. [[K3 s. 12]]' },
    { t: 'Şok subkütan ilaç emilimini belirgin ölçüde azaltabilir.', d: true, n: 'Subkütan dokudan emilim lokal ve bölgesel kan akımına bağlıdır. [[K3 s. 13]]' },
    { t: 'İntramüsküler fenitoin, kas perfüzyonu yeterliyse uygun bir seçenektir.', d: false, n: 'Fenitoin intramüsküler verilemeyen ilaçlara örnektir. [[K3 s. 13]]' }
  ]
};
VERI.sorular['far02a-3'] = {
  no: 3, kok: 'İnhalasyon ve nöraksiyel uygulama', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 14–15]]',
  onermeler: [
    { t: 'İnhale nitrik oksit pulmoner dolaşıma geçmez.', d: false, n: 'Pulmoner dolaşıma geçer ve hemoglobine bağlandığı için yarılanma ömrü kısadır. [[K3 s. 14]]' },
    { t: 'Yüksek doz inhale salbutamol hipokalemiye yol açabilir.', d: true, n: 'Yüksek doz inhale β₂-agonistlerin sistemik etkileri arasında hipokalemi ve taşikardi bulunur. [[K3 s. 14]]' },
    { t: 'Epidural lokal anesteziğe bikarbonat eklemek bloğun başlamasını hızlandırır.', d: true, n: 'Çözeltinin pH’sı yükselir ve zarı geçebilen yüksüz fraksiyon artar. [[K3 s. 14–15]]' },
    { t: 'Epidural bupivakainin etki süresi lidokaininkinden uzundur.', d: true, n: 'Bloğun süresini dokuya bağlanma belirler ve bupivakain daha uzun süre etkilidir. [[K3 s. 15]]' },
    { t: 'Hiperbarik bupivakainle subaraknoid bloğun yayılımı hastanın pozisyonuyla sınırlanabilir.', d: true, n: 'Hiperbarik çözelti kullanıldığında uygun pozisyon bloğun yayılma derecesini sınırlayabilir. [[K3 s. 15]]' }
  ]
};

const A02A_NAV = [
  ['oral', 'Yol seçimi ve oral emilim'], ['ilk', 'Biyoyararlanım'], ['er', 'Ekstraksiyon'],
  ['mukoza', 'Mukozal yollar'], ['kan', 'Kas ve subkütan doku'], ['deri', 'Deri'],
  ['akciger', 'İnhalasyon'], ['blok', 'Nöraksiyel yollar'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet']
];
SAYFALAR['dersler/farmakoloji/02a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 2 · Ders 02a', baslik: 'Emilim ve uygulama yolları',
  lede: 'Bir ilacı hangi yoldan vereceğimizi hedef doku ve eldeki preparat belirler. [[K3 s. 9]] Seçilen yolda emilimin hızını ve miktarını hem ilacın hem hastanın özellikleri değiştirir. [[K3 s. 9]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A02A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a02a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a02a-oral">
<h2>Yol seçimi ve oral emilim</h2>
<p class="intro">Midede emilimin hızlı başlaması, dozun çoğunun burada emileceği anlamına gelmez. [[K3 s. 9–10]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi ilaç mukozayı geçer?</h3></div><div data-viz="a02a_oral"></div><p class="viz-cap" aria-live="polite">İlacı seçin ve iyonizasyon değiştiğinde emilim yerinin nasıl değiştiğini izleyin. Aspirin midede hızla emilmeye başlar. [[K3 s. 9–10]]</p><p class="viz-foot">Şematik/nitel. [[K3 s. 9–10]]</p></div>
<p>Anestezide inhalasyon, İV, oral, İM, rektal, epidural ve intratekal yollar sık kullanılır, transdermal, subkütan ve sublingual yollar da seçenekler arasındadır. [[K3 s. 9]]</p>
<p>Oral ilacın dolaşıma ulaşmak için mukozayı aşması gerekir. [[K3 s. 9]] Özgül taşıyıcısı yoksa lipit zarı kolay geçen kısım yüksüz fraksiyondur. [[K3 s. 9]] Emilim yerini ilacın özellikleriyle birlikte sindirim kanalı boyunca değişen pH belirler. [[K3 s. 9]]</p>
<ul class="ozet">
<li><b>Asitler.</b> Asidik midede aspirin yüksüzdür ve bazlardan daha hızlı emilir. [[K3 s. 9]] Etki erken başlar, gastrointestinal stazda bile emilim sürer. [[K3 s. 10]] Villuslar geniş bir yüzey sağladığından asidik ilaçların bile çoğu ince bağırsaktan emilir. [[K3 s. 10]]</li>
<li><b>Zayıf baz ve kalıcı yük.</b> Propranolol midede iyonizedir, duodenumda görece yüksüz kaldığı için oradan emilir. [[K3 s. 9]] Vekuronyum ve glikopirolatın tuzları ise yüklerini korur ve gastrointestinal kanaldan emilmez. [[K3 s. 9]]</li>
<li><b>Hedef lokal olabilir.</b> Psödomembranöz kolitte oral vankomisin ve midede antasitler dolaşıma geçmeden etki gösterir. [[K3 s. 9]] Sistemik emilim bu durumda yan etki doğurabilir. [[K3 s. 9]]</li>
<li><b>Hedef dolaşımsa.</b> İntravenöz (İV) yol doğrudan ve daha güvenilirdir. [[K3 s. 9]] Emilim basamağı bulunmadığından plazma düzeyi gastrointestinal emilimden ve deri ya da kas perfüzyonundan bağımsızdır. [[K3 s. 9]]</li>
<li><b>İV yolun bedeli.</b> Preparat genellikle oral eşdeğerinden pahalıdır. [[K3 s. 9]] Bazı ilaçların yüksek başlangıç düzeyi yan etki doğurabilir, santral venöz erişim de ayrıca risk taşır. [[K3 s. 9]] Yoğun bakım ilaçlarının çoğu yine de İV infüzyonla verilir. [[K3 s. 9]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a02a-ilk">
<h2>Oral dozun ne kadarı dolaşıma ulaşır?</h2>
<p class="intro">Biyoyararlanım, dozun sistemik dolaşıma ulaşan fraksiyonunu aynı İV dozla karşılaştırarak ifade eder. [[K3 s. 10]]</p>
<div class="viz"><div class="viz-head"><h3>Oral dozdan sistemik dolaşıma</h3></div><div data-viz="a02a_ilk"></div><p class="viz-cap" aria-live="polite">Önce dozun ne kadarının emildiğini, ardından bağırsak duvarından ve karaciğerden ne kadarının kaldığını izleyin. [[K3 s. 10]]</p><p class="viz-foot">Şematik/nitel. [[K3 s. 10–11]]</p></div>
<p>Bağırsaktan emilen ilaç portal venle karaciğere gider, bukkal ve rektal mukoza bu yolun istisnalarıdır. [[K3 s. 10]] İlk geçiş kaybı karaciğere ulaşmadan da başlayabilir: örneğin GTN bağırsak duvarında metabolize olur. [[K3 s. 10]]</p>
<p><b>F<sub>B</sub> = F<sub>A</sub> × F<sub>G</sub> × F<sub>H</sub>.</b> [[K3 s. 10]] Yüksek oral biyoyararlanım için ilaç sindirim kanalında stabil kalmalı, iyi emilmeli ve ilk geçişte az metabolize edilmelidir. [[K3 s. 10]]</p>
<div class="viz"><div class="viz-head"><h3>Biyoyararlanım için hangi alan ölçülür?</h3></div><div data-viz="a02a_alan"></div><p class="viz-cap" aria-live="polite">Oral ve İV seçenekleriyle payı ve paydayı ayrı inceleyin. Her biri aynı bolus dozdan sonra ölçülen konsantrasyon-zaman eğrisinin altında kalan alandır. [[K3 s. 10–11]]</p><p class="viz-foot">Şematik/nitel. Eğriler ölçüm verisi içermez. [[K3 s. 10–11]]</p></div>
<p>Eşit oral ve İV boluslardan sonra konsantrasyon-zaman eğrilerinin altında kalan alanları (AUC) karşılaştırın: <b>F<sub>B</sub> = AUC<sub>oral</sub> / AUC<sub>İV</sub></b>. [[K3 s. 10–11]] Biyoyararlanım genellikle oral yolda en düşüktür, dolayısıyla İV doza yakın bir oral doz yeterli plazma düzeyini sağlamayabilir. [[K3 s. 10]]</p>
<ul class="ozet">
<li><b>Preparat.</b> Sıvılar ve küçük partiküller hızla dağılır. [[K3 s. 10]] Büyük partiküller veya midede çözünmeyi engelleyen bağlayıcılar (örneğin enterik kaplama) emilimi geciktirebilir. [[K3 s. 10]]</li>
<li><b>Besin ve ilaçlar.</b> Birlikte alınan maddeler ilacı bağlayabilir veya etkisizleştirebilir. [[K3 s. 10]] Sütteki Ca²⁺ tetrasiklin emilimini azaltır. [[K3 s. 10]]</li>
<li><b>Hasta.</b> Doğuştan veya edinsel malabsorpsiyon emilimi değiştirir, örnekleri çölyak ve tropikal sprue’dur. [[K3 s. 10]] Travma ya da ilaçlara bağlı gastrik staz bağırsaktan geçiş süresini uzatır. [[K3 s. 10]]</li>
<li><b>Enzim etkinliği.</b> Fenobarbital hepatik enzimleri indükler, ilk geçişi artırarak varfarinin biyoyararlanımını azaltır. [[K3 s. 10]] İnhibisyon ters yönde etkileyebilir: simetidin propranololün biyoyararlanımını artırabilir. [[K3 s. 10–11]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a02a-er">
<h2>Karaciğer kandan ne kadar ilaç uzaklaştırır?</h2>
<p class="intro">Ekstraksiyon oranı (ER), karaciğerin kandan uzaklaştırdığı ilaç fraksiyonudur. [[K3 s. 11]]</p>
<div class="viz"><div class="viz-head"><h3>Ekstraksiyonu hangi basamak sınırlar?</h3></div><div data-viz="a02a_er"></div><p class="viz-cap" aria-live="polite">Propofol ve lidokainde hücreye alım ve metabolizma hızlıdır. [[K3 s. 12]] Diğer grupları seçip sınırlayıcı basamağı karşılaştırın.</p><p class="viz-foot">Şematik/nitel. [[K3 s. 11–12]]</p></div>
<p>Üç belirleyiciyi birlikte düşünün: hepatik kan akımı, hepatosite alım ve hücrenin enzim kapasitesi. [[K3 s. 11]] Michaelis sabiti (Kₘ), enzimin maksimum hızının %50’sine ulaştığı substrat konsantrasyonudur. [[K3 s. 11]] Kitabın sınıflamasında Kₘ, yüksek kapasiteli enzimlerde klinik konsantrasyonların çok üstünde, düşük kapasitelilerde bu konsantrasyonlara yakındır. [[K3 s. 11]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap yüksek metabolik kapasiteyi yüksek Kₘ ile ilişkilendirir. Enzimin maksimum metabolizma hızını Vₘₐₓ gösterir, Kₘ tek başına kapasiteyi belirlemez.</div>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>İlaç grubu</th><th>Ekstraksiyonu açıklayan mekanizma</th></tr></thead><tbody>
<tr><th>Hızlı alım, yüksek kapasite<br>Propofol, lidokain</th><td>Serbest ilaç hızla alınırken bağlı ilaç ayrışır ve dengeyi korur. [[K3 s. 12]] Hızlı metabolizma plazma-hücre gradyanını sürdürür. [[K3 s. 12]] Metabolize edilen toplam miktar bağlanmadan bağımsızdır, büyük ölçüde kan akımına bağlıdır. [[K3 s. 12]]</td></tr>
<tr><th>Düşük kapasite, yüksek bağlanma (&gt;%90)<br>Fenitoin, diazepam</th><td>Ekstraksiyonu metabolik kapasite sınırlar. [[K3 s. 12]] Bağlanma için yarışma serbest konsantrasyonu belirgin artırır, başlangıçta alım ve metabolizma hızlanınca serbest plazma düzeyi anlamlı değişmez. [[K3 s. 12]] Doygunlukta hücre içi düzey yüksek kalır, gradyan küçülür, alım ve ER düşer. [[K3 s. 12]]</td></tr>
<tr><th>Düşük kapasite, düşük bağlanma</th><td>Metabolize edilen toplam miktar, kan akımı ve protein bağlanmasındaki değişikliklerden etkilenmez. [[K3 s. 12]]</td></tr>
</tbody></table></div>
<p>Yüksek bağlanmalı, düşük kapasiteli grupta bağlanmanın değişmesi, kan akımının değişmesinden daha önemlidir. [[K3 s. 12]] Terapötik indeksi dar ilaçlarda doygunluk belirgin toksisite doğurabilir, bu yüzden özellikle eşlik eden tedavi değiştiğinde plazma düzeyi düzenli izlenmelidir. [[K3 s. 12]]</p>
</section>
<section class="wrap blk ders-sec" id="a02a-mukoza">
<h2>Sublingual, nazal, bukkal ve rektal yollar</h2>
<p class="intro">Portal dolaşımı atlamak biyoyararlanımı artırabilir, ancak mukozadan emilim her bölgede aynı hızda gerçekleşmez. [[K3 s. 10–12]]</p>
<div class="viz"><div class="viz-head"><h3>Mukoza seçimi etkiyi nasıl değiştirir?</h3></div><div data-viz="a02a_mukoza"></div><p class="viz-cap" aria-live="polite">Dilaltı, nazal ve bukkal uygulamada etki hızla başlar ve portal dolaşım atlanır. [[K3 s. 12]] Rektal uygulamayı seçip yüzey alanının önemini inceleyin.</p><p class="viz-foot">Şematik/nitel. [[K3 s. 12]]</p></div>
<ul class="ozet">
<li><b>Hızlı etki.</b> Kitap anjinada gliseril trinitrat (GTN) spreyi ve yüksek kan basıncının nispeten hızlı kontrolü için sublingual nifedipini örnek verir. [[K3 s. 12]]</li>
<li><b>Oral yol kullanılamıyorsa.</b> Rektal uygulama düşünülebilir: inflamatuvar bağırsak hastalığında steroidler lokal, diklofenak supozituvarları ise sistemik analjezik etki için verilebilir. [[K3 s. 12]] Rektal yolun oral yoldan daha etkili olduğuna ilişkin kanıt azdır. [[K3 s. 12]]</li>
</ul>
<div class="note plain"><b>Atlas notu.</b> Kitap hızlı tansiyon kontrolüne sublingual nifedipini örnek verir. Kan basıncını öngörülemez biçimde düşürebildiği için kısa etkili nifedipinin bu amaçla dilaltı kullanımı önerilmez.</div>
</section>
<section class="wrap blk ders-sec" id="a02a-kan">
<h2>Kas ve subkütan dokuda perfüzyon</h2>
<p class="intro">Enjeksiyondan sonra etki geciktiğinde, dozun dokuda bekliyor olabileceğini hesaba katın. [[K3 s. 12–13]]</p>
<div class="viz"><div class="viz-head"><h3>Kan akımı geri döndüğünde</h3></div><div data-viz="a02a_kan"></div><p class="viz-cap" aria-live="polite">Perfüzyon yetersizse kas içinde kalan ilaç zamanında etki göstermeyebilir. [[K3 s. 12–13]] Akımın geri dönüşünü izleyin.</p><p class="viz-foot">Şematik/nitel. [[K3 s. 12–13]]</p></div>
<div class="cols"><div class="card"><h3>İntramüsküler (İM)</h3><ul>
<li>Oral yolun emilim sorunlarını aşar, biyoyararlanım 1’e yaklaşır. [[K3 s. 12]] Etki genellikle oral yoldan erken başlar, bazı ilaçlarda İV yola yaklaşır. [[K3 s. 12]]</li>
<li>Emilim yerel perfüzyona bağlı olduğundan iyi kanlanan deltoid, kuadriseps ya da gluteus tercih edilir. [[K3 s. 12–13]] Perfüzyon kuşkuluysa İV yol tercih edilir. [[K3 s. 13]]</li>
<li>Fenitoin İM verilemez, siklizin enjeksiyonu ağrılı olabilir. [[K3 s. 13]] Lokal apse, hematom ve yanlışlıkla damar içine enjeksiyon riski vardır. [[K3 s. 13]] Pıhtılaşma bozukluğunda İM enjeksiyondan kaçınılmalıdır. [[K3 s. 13]]</li>
</ul></div><div class="card"><h3>Subkütan</h3><ul>
<li>Bazı ilaçlar iyi emilir ve düşük doz heparinde bu yol tercih edilir. [[K3 s. 13]]</li>
<li>Tedaviye uyum güçse depo preparat yararlı olabilir, antipsikotikler ve bazı kontraseptifler bu şekilde kullanılmıştır. [[K3 s. 13]]</li>
<li>Çinko veya protaminle hazırlanan insülinin emilimi birkaç saate yayılabilir. [[K3 s. 13]]</li>
<li>Lokal ve bölgesel kan akımı azaldığında, özellikle şokta, emilim belirgin azalabilir. [[K3 s. 13]]</li>
</ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a02a-deri">
<h2>Deride etki ve deriden sistemik geçiş</h2>
<p class="intro">Deride lokal etki hedeflenebildiği gibi ilk geçiş atlanarak sistemik biyoyararlanım da artırılabilir. [[K3 s. 13]]</p>
<div class="viz"><div class="viz-head"><h3>Deriden uygulamada hedef neresi?</h3></div><div data-viz="a02a_deri"></div><p class="viz-cap" aria-live="polite">Deride lokal etki için steroid kullanılabilir, sistemik etki içinse fentanil ve nitratlar transdermal verilebilir. [[K3 s. 13]] Hedefi değiştirin.</p><p class="viz-foot">Şematik/nitel. [[K3 s. 13–14]]</p></div>
<p>Yüksek lipit çözünürlüğü ve iyi bölgesel kanlanma transdermal emilimi kolaylaştırır, bu nedenle ekstremiteler yerine toraks ve abdomen tercih edilir. [[K3 s. 13]] Bant yavaş ve sabit salımla daha düzgün bir kinetik profil sağlar. [[K3 s. 13]] Bir defada az ilaç salındığından sistemik etki için potent ilaçlar daha uygundur. [[K3 s. 13]]</p>
<p>Ven ponksiyonu, deri grefti ve küçük cerrahi girişimler öncesinde deri anestezisi için en sık kullanılan iki topikal preparatı karşılaştırın. [[K3 s. 13]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Preparat</th><th>Uygulama yerinde etki</th></tr></thead><tbody>
<tr><th>EMLA</th><td>Lidokain ve prilokainin ötektik karışımıdır, kitap jel fazını iki ajanın birbirinin kaynama noktasını düşürmesiyle açıklar. [[K3 s. 13]] Deride vazokonstriksiyon görülür. [[K3 s. 13]]</td></tr>
<tr><th>Ametokain</th><td>Ester bağlı lokal anesteziktir, hafif lokal histamin salınımıyla vazodilatasyon yapabilir. [[K3 s. 13–14]] Venodilatasyon ponksiyon öncesinde yararlı olabilir. [[K3 s. 14]]</td></tr>
</tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap ötektik karışım için kaynama noktasının düştüğünü söyler. Ötektik karışımda düşen sıcaklık erime noktasıdır.</div>
</section>
<section class="wrap blk ders-sec" id="a02a-akciger">
<h2>İnhalasyonla ilaç nereye ulaşır?</h2>
<p class="intro">Uygulama yöntemi ve damlacık çapı, ilacın hava yolu mukozasında kalmasını veya alveole ulaşmasını belirler. [[K3 s. 14]]</p>
<div class="viz"><div class="viz-head"><h3>Damlacığın izlediği yol</h3></div><div data-viz="a02a_akciger"></div><p class="viz-cap" aria-live="polite">Küçük damlacığın alveole nasıl ulaşabildiğini izleyin, ardından büyük damlacığın ulaştığı bölgeyi karşılaştırın. [[K3 s. 14]]</p><p class="viz-foot">Şematik/nitel. [[K3 s. 14]]</p></div>
<p>Erişkin akciğerindeki 70 m² emilim alanı, sistemik konsantrasyonun hızla yükselmesini ve uzaktaki hedefte etkinin erken başlamasını sağlayabilir. [[K3 s. 14]] Volatil anestezikler inhalasyonla verilir, son hedefleri santral sinir sistemidir (kinetikleri Bölüm 9’da ele alınır). [[K3 s. 14]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>İlaç ve hedef</th><th>Emilimin sonucu</th></tr></thead><tbody>
<tr><th>Bronkodilatör</th><td>İnhale veya nebülize bronkodilatör bronşları hedefler. [[K3 s. 14]] Yüksek doz inhale β₂-agonist (örneğin salbutamol) taşikardi ve hipokalemi yapabilir. [[K3 s. 14]]</td></tr>
<tr><th>İnhale steroid</th><td>Kronik kullanım Cushingoid yan etkilere yol açabilir. [[K3 s. 14]]</td></tr>
<tr><th>Nebülize adrenalin</th><td>Stridora neden olan üst hava yolu ödeminde kullanılır. [[K3 s. 14]] Akciğer katekolaminleri kolay metabolize etse de emilen adrenalin belirgin taşikardi, aritmi ve hipertansiyon yapabilir. [[K3 s. 14]]</td></tr>
<tr><th>Topikal lidokain</th><td>Fiberoptik entübasyon öncesinde yeterli miktarda emilirse sistemik toksisite gelişebilir. [[K3 s. 14]]</td></tr>
<tr><th>İnhale nitrik oksit</th><td>Alveole ulaşarak pulmoner damarları genişletir. [[K3 s. 14]] Pulmoner dolaşıma geçse de hemoglobine bağlanması yarılanma ömrünü kısaltır, böylece istenmeyen sistemik etki oluşturmaz. [[K3 s. 14]]</td></tr>
</tbody></table></div>
</section>
<section class="wrap blk ders-sec" id="a02a-blok">
<h2>Epidural ve intratekal uygulama</h2>
<p class="intro">Epidural lokal anestezide başlangıcı zarı geçebilen fraksiyon, bloğun süresini ise dokuya bağlanma belirler. [[K3 s. 14–15]]</p>
<div class="viz"><div class="viz-head"><h3>Epidural bloğun hangi özelliği değişir?</h3></div><div data-viz="a02a_blok"></div><p class="viz-cap" aria-live="polite">Sodyum bikarbonat ve vazokonstriktör seçeneklerini karşılaştırın. İlki blok başlangıcını hızlandırır, ikincisi etkiyi uzatır. [[K3 s. 15]]</p><p class="viz-foot">Şematik/nitel. [[K3 s. 14–15]]</p></div>
<p>Lokal anestezikler pKa’sı 7,4’ten büyük bazlardır ve fizyolojik pH’da çoğunlukla iyonizedir. [[K3 s. 14]] Lidokainin pKa’sı bupivakaininkinden düşüktür, daha az iyonizedir ve bloğu daha hızlı başlatır. [[K3 s. 14–15]] Bu yüzden ameliyat öncesinde mevcut epidurali ek dozla pekiştirmek için sıklıkla lidokain seçilir. [[K3 s. 15]] Bupivakainin etkisi ise daha uzun sürer. [[K3 s. 15]]</p>
<ul class="ozet">
<li><b>Epidural kullanım.</b> Rejyonal analjezi ve anestezi sağlar. [[K3 s. 14]] Akut ağrıda lokal anestezikler, opioidler, ketamin ve klonidin kullanılmıştır, kronik ağrıda ise steroidler tanı ve tedavi amacıyla verilir. [[K3 s. 14]]</li>
<li><b>Uygulama ve emilim.</b> Tek bolus uygulanabilir, kateterden tekrarlayan boluslar veya infüzyon verilebilir. [[K3 s. 14]] Özellikle infüzyonda önemli miktarda ilaç sistemik dolaşıma geçebilir. [[K3 s. 15]] Sık kullanılan epidural opioidler ve lokal anestezikler toksik sistemik düzeylerde ciddi morbiditeye neden olur. [[K3 s. 15]]</li>
<li><b>İntratekal yol.</b> Epidurale kıyasla çok az ilaç yeterlidir, dolaşıma geçen miktar küçüktür ve istenmeyen sistemik etkiler seyrektir. [[K3 s. 15]] Subaraknoid bloğun yayılımını çözeltinin hacmi ve türü belirler. [[K3 s. 15]] Hiperbarik (“ağır”) bupivakainle uygun hasta pozisyonu yayılımı sınırlayabilir. [[K3 s. 15]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a02a-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin ve gerekçenizi açıklamayla karşılaştırın.</p>
<div class="viz"><div data-viz="mtf" data-q="far02a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far02a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far02a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a02a-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Aynı bolus doz oral ve intravenöz verildiğinde biyoyararlanımı nasıl karşılaştırırsınız? Oral dozun izlediği yolu ve kayıpları açıklayın.</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>İV doz doğrudan dolaşıma girer ve emilim basamağını atlar. [[K3 s. 9]]</li>
<li>Her iki yol için konsantrasyonu zamana karşı izleyip eğri altı alanları hesaplayın, oral alanı İV alana bölün. [[K3 s. 10–11]]</li>
<li>F<sub>A</sub>, dozun emilen fraksiyonudur, preparat ve besinle etkileşim bu basamağı etkileyebilir. [[K3 s. 10]]</li>
<li>Bağırsak mukozasındaki metabolizmadan kalan fraksiyon F<sub>G</sub>’dir, GTN bu kayba örnektir. [[K3 s. 10]]</li>
<li>Portal kanla karaciğere gelen ilacın hepatik metabolizmadan kalan fraksiyonu F<sub>H</sub>’dir, üç fraksiyonun çarpımı F<sub>B</sub>’yi verir. [[K3 s. 10]]</li>
</ol>
<div class="cols"><div class="note"><b>Çizin.</b> Oral dozdan sistemik dolaşıma kadar üç fraksiyonu sırayla işaretleyin, yanına İV yolun doğrudan girişini ve AUC oranını ekleyin. [[K3 s. 9–11]]</div><div class="note plain"><b>Olası ek sorular.</b> Fenobarbital varfarinin biyoyararlanımını nasıl değiştirir? [[K3 s. 10]] Fenitoin için protein bağlanması neden önemlidir? [[K3 s. 12]] Kas perfüzyonu geri döndüğünde hangi risk doğar? [[K3 s. 13]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a02a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Oral emilimde iyonizasyon kadar ince bağırsağın geniş yüzey alanı da önemlidir. [[K3 s. 9–10]]</li>
<li>Emilen miktarın bir bölümü bağırsak duvarında ve karaciğerde ilk geçişte kaybedilebilir. [[K3 s. 10–11]]</li>
<li>Propofolde metabolize edilen miktarı hepatik kan akımı, fenitoinde ekstraksiyonu metabolik kapasite ve bağlanma belirler. [[K3 s. 12]]</li>
<li>Perfüzyon geri geldiğinde dokuda bekleyen doz hızla dolaşıma geçebilir. [[K3 s. 13]]</li>
<li>Hava yolunda lokal etki hedeflense bile sistemik toksisite gelişebilir. [[K3 s. 14]]</li>
<li>Epidural infüzyonda sistemik emilim belirgin olabilir, intratekal uygulamada ise dolaşıma az ilaç geçer. [[K3 s. 15]]</li>
</ul><div data-viz="tamam" data-modul="farmakoloji" data-bolum="02a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/01">← 1 · İlaçların hücre zarından geçişi</a><a href="#/dersler/farmakoloji/02b">Sonraki: 02b · Dağılım ve metabolizma →</a></nav></section>`
};
