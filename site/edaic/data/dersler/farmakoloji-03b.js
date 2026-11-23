VERI.sorular = VERI.sorular || {};
VERI.sorular['far03b-1'] = {
  no: 1, kok: 'Bağlanma dengesi ve agonist yanıtı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 32–35]]',
  onermeler: [
    {t: 'Dengede ligandın reseptörden ayrılması durur.', d: false, n: 'Dengede birleşme ve ayrışma aynı hızda sürer. [[K3 s. 33]]'},
    {t: 'Denge birleşme sabiti, ayrışma sabitinin tersidir.', d: true, n: 'Kₐ = 1/Kᴅ olduğundan birimleri de birbirinin tersidir. [[K3 s. 33]]'},
    {t: 'Tüm reseptörleri işgal eden bir parsiyel agonist tam agonistin maksimum yanıtına ulaşır.', d: false, n: 'Reseptörlerin tümü dolsa bile parsiyel agonistin intrinsik aktivitesi tam yanıt için yetersizdir. [[K3 s. 34]]'},
    {t: 'Ters agonist reseptörün ligandsızken gösterdiği aktiviteyi azaltabilir.', d: true, n: 'Dengeyi inaktif biçime kaydırır ve kendiliğinden aktivasyonu azaltır. [[K3 s. 34–35]]'},
    {t: 'Antagonistin intrinsik aktivitesi negatiftir.', d: false, n: 'Antagonistin intrinsik aktivitesi sıfırdır. [[K3 s. 34]]'}
  ]
};
VERI.sorular['far03b-2'] = {
  no: 2, kok: 'Antagonizma ve allosterik modülasyon', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 36–38]]',
  onermeler: [
    {t: 'Geri dönüşümlü kompetitif blokta agonist dozu artırılarak başlangıçtaki maksimum yanıta ulaşılabilir.', d: true, n: 'Aynı bölge için yarışan agonist, konsantrasyonu yükseldikçe antagonistin yerini alabilir. [[K3 s. 36–37]]'},
    {t: 'pA₂, doz oranını ikiye çıkaran agonist konsantrasyonunun negatif logaritmasıdır.', d: false, n: 'Negatif logaritması alınan değer, bu doz oranını sağlayan antagonist konsantrasyonudur. [[K3 s. 37]]'},
    {t: 'Roküronyumun potensi vekuronyumun beşte biridir.', d: true, n: 'Eşdeğer etki için beş kat doz verilmesi, eşik reseptör işgaline ulaşmayı hızlandırır. [[K3 s. 37]]'},
    {t: 'Benzodiazepinler GABA’nın GABA-A reseptöründeki etkisini artırabilir.', d: true, n: 'Benzodiazepinler bu komplekste pozitif allosterik modülasyon yapar. [[K3 s. 38]]'},
    {t: 'Fenoksibenzaminin α-adrenoseptör blokajı katekolamin konsantrasyonu artırılarak aşılır.', d: false, n: 'Fenoksibenzaminin bağlanması geri dönüşümsüzdür. [[K3 s. 38]]'}
  ]
};
VERI.sorular['far03b-3'] = {
  no: 3, kok: 'Yedek reseptörler ve tekrarlanan ilaç uygulaması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 38–39]]',
  onermeler: [
    {t: 'Motor son plakta maksimal yanıt için asetilkolinin tüm reseptörleri işgal etmesi gerekir.', d: false, n: 'Reseptörlerin küçük bir bölümünün işgali maksimal yanıt için yeterlidir. [[K3 s. 38]]'},
    {t: 'Efedrin kısa aralıklarla verildiğinde noradrenalin depoları azalabilir.', d: true, n: 'Depolar yeniden dolamadan azaldığı için dolaylı sempatomimetik yanıt hızla zayıflar. [[K3 s. 38]]'},
    {t: 'Sürekli dobutamin varlığında miyokard hücre yüzeyindeki β-reseptör sayısı azalabilir.', d: true, n: 'Yüzey reseptörlerinin kaybı desensitizasyon örneğidir. [[K3 s. 39]]'},
    {t: 'Kronik opioid kullanımında reseptör afinitesinin azalması toleransa katkıda bulunabilir.', d: true, n: 'Merkezi reseptörlerin yoğunluğunda veya afinitesinde azalma olası mekanizmalardır. [[K3 s. 39]]'},
    {t: 'Sürekli nitrat infüzyonuna ara verilmesi sülfhidril gruplarının yenilenmesine olanak tanır.', d: true, n: 'Damar düz kasındaki bu gruplar yenilenince farmakolojik etki geri kazanılabilir. [[K3 s. 39]]'}
  ]
};

const A03B_NAV = [['denge','Bağlanma'],['agonist','Agonizm'],['blok','Antagonizm'],['yedek','Yedek reseptörler'],['tekrar','Tekrarlanan dozlar'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/03b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 3 · Ders 03b',
  baslik: 'İlaç–reseptör etkileşimi: agonizm, antagonizm, tolerans',
  lede: 'Bir ilaç reseptöre güçlü bağlandığı halde yanıt oluşturmayabilir. [[K3 s. 33–34]] Aynı dozun etkisi, ilaç tekrarlandığında da değişebilir. [[K3 s. 38]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A03B_NAV.map(([id,ad],i)=>`<button type="button" data-scroll="a03b-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a03b-denge">
<h2>Ligand ve reseptör hangi koşulda dengededir?</h2>
<p class="intro">Ligand (L) ile serbest reseptör (R) birleşerek LR kompleksini oluşturur ve kompleks yeniden ayrışabilir. [[K3 s. 32–33]]</p>
<div class="viz"><div class="viz-head"><h3>İki yönün hızını karşılaştırın</h3></div><div data-viz="a03b_denge"></div><p class="viz-cap" aria-live="polite">Birleşme yönünde serbest ligand ile serbest reseptörün konsantrasyonlarını çarpın ve k₁ ile ağırlıklandırın. [[K3 s. 33]] Ayrışma yönünde hız yalnız bağlı kompleksin konsantrasyonuna ve k₂’ye bağlıdır. [[K3 s. 33]]</p><p class="viz-foot">Şematik/nitel bağlanma modeli. [[K3 s. 32–33]]</p></div>
<p>Kütle etkisi yasasına göre her yöndeki hız, o yönde tepkimeye girenlerin konsantrasyonlarıyla orantılıdır. [[K3 s. 33]] Köşeli parantezler konsantrasyonu, k₁ birleşmenin, k₂ ayrışmanın hız sabitini gösterir. [[K3 s. 33]]</p>
<div class="cols"><div class="card"><h3>Ayrışma sabiti</h3><p>Dengede iki hızı eşitleyince Kᴅ = [L] × [R] / [LR] = k₂/k₁ bulunur. [[K3 s. 33]] Kᴅ’nin birimi mmol·L⁻¹’dir. [[K3 s. 33]]</p></div>
<div class="card"><h3>Birleşme sabiti</h3><p>Kₐ = 1/Kᴅ bağlanmanın gücünü gösterir ve birimi L·mmol⁻¹’dir. [[K3 s. 33]] Afinite, anahtarın kilide uyumu gibi, ligandın reseptöre ne kadar güçlü bağlandığını anlatır. [[K3 s. 33]]</p></div></div>
<p>Ariëns’in yanıtı reseptör işgaliyle orantılı kabul eden görüşü farmakodinamik modellemeye temel oldu. [[K3 s. 33]] Parsiyel ve ters agonistleri, ayrıca yedek reseptörleri açıklamak için işgalin ötesine bakmak gerekir. [[K3 s. 33]]</p>
</section>

<section class="wrap blk ders-sec" id="a03b-agonist">
<h2>Agonizm ve doz–yanıt eğrisi</h2>
<p class="intro">İntrinsik aktivite (IA, efikasite), ilaç bağlandıktan sonra ne büyüklükte bir etki oluşturabildiğini gösterir. [[K3 s. 33]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı tavan mı, aynı doz mu?</h3></div><div data-viz="a03b_agonist"></div><p class="viz-cap" aria-live="polite">Dozu doğrusal eksende artırırken önce yanıtın yükselişini, sonra eğrinin yataylaşmasını izleyin. [[K3 s. 35]] Aynı ilişki logaritmik eksende çizildiğinde eğri S biçimini alır. [[K3 s. 35]]</p><p class="viz-foot">Şematik/nitel eğriler. Düz çizgi tam agonist A’yı, kesikli çizgi seçilen karşılaştırmayı gösterir. [[K3 s. 34–36]]</p></div>
<ul><li><b>Yatay okuyun.</b> Aynı yanıt düzeyinde A ve B eğrilerini kesen dozları karşılaştırın. [[K3 s. 35]] B’de daha fazla doz gerekir ama her iki tam agonist de aynı maksimuma ulaşır. [[K3 s. 35]]</li>
<li><b>Dikey okuyun.</b> A ve C’nin yüksek dozdaki yanıtlarına bakın. [[K3 s. 34–35]] C’nin düşük tavanı, dozu artırmakla giderilemeyen efikasite farkını gösterir. [[K3 s. 34–35]]</li></ul>
<p>Reseptörün farklı biçimleri dengededir ve agonist yokken inaktif biçim baskındır. [[K3 s. 33]] Agonist dengeyi aktif biçime kaydırınca etkiyi doğuran moleküler olaylar başlar. [[K3 s. 33]]</p>
<div class="tbl-wrap"><table class="tbl a03b-tablo"><thead><tr><th>Ligand</th><th>Bağlandıktan sonra ne olur?</th></tr></thead><tbody>
<tr><th>Tam agonist<br>IA = 1</th><td>Yüksek afinite ve tam intrinsik aktivite sayesinde reseptörden alınabilecek en büyük yanıtı oluşturur. [[K3 s. 34]]</td></tr>
<tr><th>Parsiyel agonist<br>0 &lt; IA &lt; 1</th><td>Aktif biçim bütünüyle baskın olamaz. [[K3 s. 34]] Aktivasyonun etkiye dönüşmesi sınırlıdır. [[K3 s. 34]] Tek başına agonisttir, fakat yüksek dozda bütün reseptörleri doldursa bile yanıtı tam agonistinkinden küçüktür. [[K3 s. 34]] Buprenorfin μ-opioid reseptöründe böyle davranır. [[K3 s. 34]]</td></tr>
<tr><th>Antagonist<br>IA = 0</th><td>Afinitesi yüksek olabilir. [[K3 s. 33]] Aktif ve inaktif biçimlere eşit bağlanır, dengeyi değiştirmeden daha etkin bir ligandın bağlanmasını önleyebilir. [[K3 s. 33–35]]</td></tr>
<tr><th>Ters agonist<br>−1 ≤ IA &lt; 0</th><td>Bazı reseptörler ligandsızken de seyrek olarak aktif biçime geçer ve ölçülebilir bir bazal aktivite gösterir. [[K3 s. 34]] Orta veya yüksek afiniteli ters agonist inaktif biçimi yeğler, kendiliğinden aktivasyonu azaltır ve endojen agonistin tersi yönde etki gösterebilir. [[K3 s. 34–35]] Ters agonizm tam ya da parsiyel olabilir. [[K3 s. 34]]</td></tr></tbody></table></div>
<ul><li><b>Potens.</b> Kitabın basit bağlanma modelinde düşük Kᴅ daha yüksek potense karşılık gelir. [[K3 s. 34]] ED₅₀ maksimum yanıtın %50’sini oluşturan dozdur ve kitap birçok ilaçta bunun Kᴅ’ye karşılık geldiğini belirtir. [[K3 s. 34]]</li>
<li><b>Birlikte kullanım.</b> Sabit, submaksimal dozda parsiyel agonist C, düşük doz tam agonist A’nın etkisine eklenir. [[K3 s. 34–36]] A dozu yükselirken eğriler kesişir ve karışımın yanıtı tek başına A’nın altında kalır. [[K3 s. 36]] Tam yanıta yeniden ulaşmak için A’nın aynı reseptörlerden C’yi uzaklaştırması gerekir. [[K3 s. 34]]</li>
<li><b>Ters agonizm örnekleri.</b> İlk tanımlandığı yer benzodiazepin bağlanma bölgesidir ve burada etkili konvülzan ajanların klinik önemi yoktur. [[K3 s. 35]] Ketanserin 5-HT₂C reseptöründe ters agonisttir. [[K3 s. 35]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a03b-blok">
<h2>Agonist artırılınca blok aşılır mı?</h2>
<p class="intro">Antagonistin bağlanması geri dönüşümlü ya da geri dönüşümsüz olabilir. [[K3 s. 37–38]]</p>
<div class="viz"><div class="viz-head"><h3>Geri dönüşümlü blokta eğrinin yeri ve tavanı</h3></div><div data-viz="a03b_blok"></div><p class="viz-cap" aria-live="polite">Kompetitif antagonist varken aynı yanıt için daha fazla agonist gerekir. [[K3 s. 37]] Eğri sağa paralel kayar, erişilebilen en yüksek yanıt korunur. [[K3 s. 36]]</p><p class="viz-foot">Şematik/nitel log(doz)–yanıt eğrileri. Düz çizgi agonisti tek başına, kesikli çizgi antagonist varlığında gösterir. [[K3 s. 36–37]]</p></div>
<div class="cols"><div class="card"><h3>Kompetitif antagonizma</h3><p>İki molekül aynı bağlanma yeri için yarışır. [[K3 s. 37]] Reseptör işgalindeki payları göreli miktarlarına ve afinitelerine bağlıdır. [[K3 s. 37]]</p><p><b>Doz oranı (DR)</b> eşit yanıt için gereken agonist konsantrasyonunun antagonist varken kaç katına çıktığını gösterir. [[K3 s. 37]]</p><p><b>pA₂</b> doz oranını 2 yapan antagonist konsantrasyonunun negatif logaritmasıdır. [[K3 s. 37]] Aynı reseptörde farklı kompetitif antagonistlerin etkinliğini karşılaştırır. [[K3 s. 37]]</p></div>
<div class="card"><h3>Nonkompetitif antagonizma</h3><p>Antagonist ayrı bir bölgeye bağlanıp reseptörün biçimini değiştirerek aktivasyonu engeller. [[K3 s. 37]] Klasik modelde agonistin bağlanması ve Kᴅ değişmez, agonisti artırmak blokajı aşamaz. [[K3 s. 36–37]]</p><p>Ayrıntılı incelemede bu inhibitörlerin çoğu agonistin bağlanmasını da değiştirir. [[K3 s. 37]] Bu nedenle güncel sınıflandırma bunları negatif allosterik modülatörlerle birlikte gruplar. [[K3 s. 37]]</p></div></div>
<p>Geri dönüşümlü etkilerin bir kısmını allosterik modülasyon açıklar. [[K3 s. 37–38]] Modülatör uzaktaki bir bölgeye bağlanarak agonistin bağlanma özelliklerini değiştirir. [[K3 s. 37–38]] Kendi başına belirgin etki göstermeden, aynı agonist dozunun yanıtını artırabilir (pozitif) veya azaltabilir (negatif). [[K3 s. 38]]</p>
<p>Geri dönüşümsüz antagonist agonistin bağlandığı yeri de uzak bir bölgeyi de tutabilir. [[K3 s. 38]] Her iki durumda da agonisti artırmak bağlı antagonisti uzaklaştıramaz. [[K3 s. 38]]</p>
<div class="tbl-wrap"><table class="tbl a03b-tablo"><thead><tr><th>İlaç veya grup</th><th>Hedef ve etkileşim</th></tr></thead><tbody>
<tr><th>Nondepolarizan kas gevşeticiler</th><td>Nöromüsküler kavşakta nikotinik reseptörün kolinerjik bölgeleri için asetilkolinle yarışırlar. [[K3 s. 37]]</td></tr>
<tr><th>β-blokerler</th><td>Kalpte β-adrenerjik reseptörlerde noradrenalinle yarışırlar. [[K3 s. 37]]</td></tr>
<tr><th>Ketamin</th><td>Merkezi sinir sisteminde (MSS) NMDA reseptöründe glutamatın etkisini nonkompetitif olarak antagonize eder. [[K3 s. 37]]</td></tr>
<tr><th>Benzodiazepinler</th><td>GABA-A reseptör kompleksinde GABA’nın etkisini pozitif allosterik modülasyonla güçlendirirler. [[K3 s. 38]]</td></tr>
<tr><th>Fenoksibenzamin</th><td>α-adrenoseptörlere geri dönüşümsüz bağlanarak katekolaminlerin etkisini engeller. [[K3 s. 38]]</td></tr>
<tr><th>Klopidogrel</th><td>Antitrombosit bir ön ilaçtır. [[K3 s. 38]] Aktif metaboliti Gᵢ proteinine kenetli ADP reseptörüne geri dönüşümsüz bağlanır. [[K3 s. 38]]</td></tr></tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap klopidogrelin hedefini “PY2Y12” olarak yazar. Reseptörün doğru adı P2Y₁₂’dir.</div>
<p><b>Bowman ilkesi.</b> Nöromüsküler kavşakta daha zayıf antagonistin etkisi genellikle daha hızlı başlar. [[K3 s. 37]] Roküronyumun potensi vekuronyumun beşte biridir ve aynı etki için beş kat doz gerekir. [[K3 s. 37]] Böylece kavşağa daha çok molekül ulaşır ve tam etki için gereken reseptör işgaline daha çabuk erişilir; bu belirgin bir klinik yarardır. [[K3 s. 37]]</p>
</section>

<section class="wrap blk ders-sec" id="a03b-yedek">
<h2>Yedek reseptörler ve motor son plak</h2>
<p class="intro">Asetilkolin (ACh) nöromüsküler kavşaktaki reseptörlerine bağlandığında motor son plak depolarize olur. [[K3 s. 38]]</p>
<div class="viz"><div class="viz-head"><h3>Geri dönüşümsüz blok arttıkça ACh yanıtı</h3></div><div data-viz="a03b_yedek"></div><p class="viz-cap" aria-live="polite">Az miktarda geri dönüşümsüz inhibitör verildiğinde ACh eğrisi sağa kayar. [[K3 s. 38]] Kullanılabilir reseptörler yeterli olduğu sürece daha yüksek ACh dozu eski maksimumu oluşturabilir. [[K3 s. 38]]</p><p class="viz-foot">Şematik/nitel. Düz eğri bloksuz yanıtı, kesikli eğri seçilen blok düzeyini gösterir. [[K3 s. 38]]</p></div>
<p>Az miktarda ACh reseptörlerin küçük bir bölümünü işgal ederek maksimum yanıt oluşturabilir. [[K3 s. 38]] Geri kalan yedek reseptörler toksin varlığında iletim kaybına karşı bir miktar koruma sağlar. [[K3 s. 38]]</p>
<ul><li><b>Yedek varken</b> geri dönüşümsüz inhibitör bazı reseptörleri devre dışı bırakır. [[K3 s. 38]] Eski yanıtı elde etmek için ACh’nin kullanılabilir reseptörlerin daha büyük bir bölümünü doldurması gerekir. [[K3 s. 38]]</li>
<li><b>Yedek tükenince</b> reseptörlerin dörtte üçünden fazlası geri dönüşümsüz bloke edilmiştir. [[K3 s. 38]] ACh dozu ne kadar artarsa artsın başlangıçtaki maksimuma ulaşılamaz ve eğim azalır. [[K3 s. 38]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a03b-tekrar">
<h2>Tekrarlanan dozlarda yanıt neden değişir?</h2>
<p class="intro">Tekrarlanan uygulamada aynı dozun oluşturduğu yanıt artabilir veya azalabilir. [[K3 s. 38]]</p>
<div class="viz"><div class="viz-head"><h3>Yanıt kaybının kaynağını izleyin</h3></div><div data-viz="a03b_tekrar"></div><p class="viz-cap" aria-live="polite">Efedrin sık aralıklarla verildiğinde noradrenalin depoları yeniden dolmaya fırsat bulamaz. [[K3 s. 38]] Aynı ilacın bir sonraki dozu daha küçük bir yanıt oluşturur. [[K3 s. 38]]</p><p class="viz-foot">Şematik/nitel neden–sonuç dizileri. [[K3 s. 38–39]]</p></div>
<div class="cols"><div class="card"><h3>Taşifilaksi</h3><p>Kısa aralıklarla yinelenen dozların etkisi hızla azalır. [[K3 s. 38]] En sık neden, transmiterin yeniden sentezlenmesine fırsat kalmadan depoların azalmasıdır. [[K3 s. 38]] Efedrin dolaylı etkili sempatomimetik bir amindir. [[K3 s. 38]]</p></div>
<div class="card"><h3>Desensitizasyon</h3><p>Yanıt daha uzun sürede, kronik olarak kaybolur. [[K3 s. 39]] Reseptörün yapısı değişebilir veya reseptör sayısı gerçekten azalabilir. [[K3 s. 39]] Terim sıklıkla taşifilaksiyle eş anlamlı kullanılır. [[K3 s. 39]]</p></div></div>
<p><b>Toleransta</b> önceki etkiye ulaşmak için daha yüksek doz gerekir. [[K3 s. 39]] Kronik opioid kullanımında veya kötüye kullanımında MSS reseptörlerinin opioidlere duyarlılığı değişir. [[K3 s. 39]]</p>
<p>Uzun süreli, kesintisiz nitrat infüzyonunda damar düz kasındaki sülfhidril grupları tükenir. [[K3 s. 39]] Vazodilatasyon gereksiniminin muhtemelen en düşük olduğu gece saatlerinde birkaç saatlik ara, bu grupların yenilenmesine ve etkinin geri gelmesine olanak tanır. [[K3 s. 39]]</p>
</section>

<section class="wrap blk ders-sec" id="a03b-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far03b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far03b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far03b-3"></div></div></section>
<section class="wrap blk ders-sec" id="a03b-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir tam agonistin log(doz)–yanıt eğrisini nasıl okursunuz? Parsiyel agonist, geri dönüşümlü kompetitif antagonist ve nonkompetitif antagonist eklenirse eğri nasıl değişir?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Eksenlere log(doz) ve yanıtı yazın. Tam agonistin sigmoid eğrisi maksimum yanıta ulaşır. [[K3 s. 34–35]]</li>
<li>Eğrinin yatay konumunu potens, eriştiği tavanı maksimum etki açısından yorumlayın. [[K3 s. 34–35]]</li>
<li>Parsiyel agonistin tek başına tavanı düşüktür. [[K3 s. 34]] Eklendiğinde düşük tam agonist dozunda yanıtı artırır, ardından aynı yer için yarışarak yanıtı tek başına tam agonistinkinin altına çeker. [[K3 s. 34–36]]</li>
<li>Kompetitif antagonistle paralel sağa kaymayı gösterin ve aynı yanıttaki agonist konsantrasyonlarından doz oranını tarif edin. [[K3 s. 36–37]]</li>
<li>Klasik nonkompetitif blokta Kᴅ korunur ama aktivasyon engellenir ve tavan düşer. [[K3 s. 36–37]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Ayrı eksen takımlarında tam agonisti referans alın. İlkine parsiyel agonisti ve karışımı ekleyin, diğer ikisinde kompetitif ve nonkompetitif blokta tavanları karşılaştırın. [[K3 s. 34–37]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Ters agonist bazal aktiviteyi nasıl etkiler? [[K3 s. 34–35]] Yedek reseptörler geri dönüşümsüz blokta eğriyi nasıl değiştirir? [[K3 s. 38]] Efedrin ve nitrat örneklerinde ne tükenir? [[K3 s. 38–39]]</div></div></section>
<section class="wrap blk ders-sec" id="a03b-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Afinitenin ölçüleri Kᴅ ve Kₐ’dır. [[K3 s. 33]] Bağlanmanın yanıta nasıl yansıdığını intrinsik aktivite belirler. [[K3 s. 33–34]]</li>
<li>Parsiyel agonistin yanıtı tam işgalde bile sınırlıdır, ters agonist ise konstitütif aktiviteyi azaltır. [[K3 s. 34–35]]</li>
<li>Geri dönüşümlü kompetitif blokta tavan korunur, klasik nonkompetitif blokta düşer. [[K3 s. 36–37]]</li>
<li>Motor son plakta yedek reseptörler, bir miktar geri dönüşümsüz bloka rağmen maksimum yanıta ulaşılmasını sağlar. [[K3 s. 38]]</li>
<li>Taşifilakside yanıt hızla azalır, desensitizasyonda kayıp daha uzun sürede gelişir, toleransta eşdeğer etki için gereken doz artar. [[K3 s. 38–39]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="03b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/03a">← 03a · Etki mekanizmaları ve reseptör türleri</a><a href="#/dersler/farmakoloji/04">Sonraki: 4 · İlaç etkileşimi →</a></nav></section>`
};
