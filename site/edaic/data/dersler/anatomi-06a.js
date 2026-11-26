VERI.sorular = VERI.sorular || {};
VERI.sorular['an06a-1'] = {
  no: 1, kok: 'Koku yolu ve çekirdek sütunları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 245–248]]',
  onermeler: [
    { t: 'I. sinirin lifleri periferik bir duyu gangliyonunda başlar.', d: false, n: 'Gövde, olfaktör mukozadaki reseptör hücresindedir. [[K5 s. 247–248]]' },
    { t: 'Brankiyal efferent sütunun omurilikte karşılığı yoktur.', d: true, n: 'Bu sütun başın brankiyal ark kökenli kaslarına motor lif verir. [[K5 s. 245]]' },
    { t: 'Koku lifleri kribriform plağı geçtikten sonra mitral hücrelerle sinaps yapar.', d: true, n: 'Bulbustaki mitral hücrelerin dendritleri reseptör aksonlarını alır. [[K5 s. 248]]' },
    { t: 'VII’nin tat lifleri üst salivator çekirdekte sonlanır.', d: false, n: 'Korda timpani tat liflerini soliter traktus çekirdeğine taşır. [[K5 s. 246]]' },
    { t: 'Olfaktör traktusta arkaya giden lifler reseptör hücresinin aksonlarıdır.', d: false, n: 'Traktustaki aksonlar mitral hücrelere aittir. [[K5 s. 248]]' },
  ],
};
VERI.sorular['an06a-2'] = {
  no: 2, kok: 'Optik sinir ve görme alanı', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 249–250]]',
  onermeler: [
    { t: 'Siliyer gangliyon orbitada optik sinirin lateralindedir.', d: true, n: 'Gangliyon orbital yağ içinde seyreden sinirin lateral komşusudur. [[K5 s. 250]]' },
    { t: 'Retinanın santral damarları optik sinire superolateralden girer.', d: false, n: 'Damarlar intraorbital seyrin ortasında inferomedialden girer. [[K5 s. 250]]' },
    { t: 'Temporal alanı taşıyan retina lifleri kiazmada çaprazlaşır.', d: true, n: 'Temporal alan medial retinaya yansır ve buranın lifleri karşı traktusa geçer. [[K5 s. 250]]' },
    { t: 'Optik sinirin meningeal kılıfları sklerayla birleşir.', d: true, n: 'Meninkslerin devamı göz küresinde skleral bağ dokusuna katılır. [[K5 s. 249]]' },
    { t: 'Üst retina kalkarin fissürün alt dudağında temsil edilir.', d: false, n: 'Üst retina üst dudakta temsil edilir. [[K5 s. 250]]' },
  ],
};
VERI.sorular['an06a-3'] = {
  no: 3, kok: 'Orbita girişinde III ve IV', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 251–254]]',
  onermeler: [
    { t: 'IV, rektusların ortak tendinöz halkasının içinden geçer.', d: false, n: 'IV fissürden halkanın lateralinde geçer. [[K5 s. 253–254]]' },
    { t: 'III’ün üst dalı levator palpebrae superiorise gider.', d: true, n: 'Aynı dal superior rektusu da uyarır. [[K5 s. 252]]' },
    { t: 'III’ün inferior oblik dalı siliyer gangliyona parasempatik lif taşır.', d: true, n: 'Pregangliyonik lifler alt dalın inferior oblik kasa giden kolunu izler. [[K5 s. 251–252]]' },
    { t: 'IV’ün lifleri superior medüller velumda çaprazlaşır.', d: true, n: 'Lifler akuaduktusun çevresinden dorsale döndükten sonra çaprazlaşır. [[K5 s. 253]]' },
    { t: 'III’ün kesilmesi diverjan şaşılığa yol açabilir.', d: true, n: 'Lateral rektus ve superior oblik kasın etkisi karşılıksız kalır. [[K5 s. 253]]' },
  ],
};

SAYFALAR['dersler/anatomi/06a'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 6 · Ders 06a', baslik: 'Kraniyal sinirlere giriş ve I–IV. sinirler',
  lede: 'Koku kaybından görme alanı kusuruna ve çift görmeye, muayene bulgusunu açıklayan anatomik yolu izleyin.',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an06a-taban">Beyin tabanı</button>
  <button type="button" data-scroll="an06a-lamina">Çekirdekler</button>
  <button type="button" data-scroll="an06a-koku">Koku</button>
  <button type="button" data-scroll="an06a-retina">Retina</button>
  <button type="button" data-scroll="an06a-kiazma">Kiazma</button>
  <button type="button" data-scroll="an06a-okulomotor">Mezensefalon</button>
  <button type="button" data-scroll="an06a-kavernoz">Orbita girişi</button>
  <button type="button" data-scroll="an06a-troklear">Troklear</button>
  <button type="button" data-scroll="an06a-p1">Part I</button>
  <button type="button" data-scroll="an06a-p2">Part II</button>
  <button type="button" data-scroll="an06a-ozet">Özet</button>
</nav>

<section class="wrap blk ders-sec" id="an06a-taban">
<h2>Beyin tabanında sinir kökleri</h2>
<p class="intro">On iki çift kraniyal sinir beyinden, spinal sinirler omurilikten çıkar. [[K5 s. 245]] İlk iki çiftin yapısı farklıdır. [[K5 s. 245]]</p>
<div class="viz"><div class="viz-head"><h3>Beyin tabanında sinir kökleri</h3></div><div data-viz="an06a_taban"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>I. sinir, duyu hücrelerinin miyelinsiz merkezi uzantılarından oluşur. [[K5 s. 245]] II. sinir ise göz gelişirken beyinden dışarı uzanan bir traktustur. [[K5 s. 245]] Geri kalan on çifti anlamak için liflerin hangi hücre sütunlarına bağlandığına bakın. [[K5 s. 245–247]]</p>
<p><b>Damarları izleyin.</b> K5’in beyin tabanı görünümünde sinir köklerine komşu Willis poligonu, internal karotis, anterior, orta ve posterior serebral arterler ile anterior ve posterior komünikan arterler seçilir. [[K5 s. 246]] Beyin sapı tarafında vertebral, baziler, anterior spinal, superior serebellar, anterior inferior ve posterior inferior serebellar arterler gösterilir. [[K5 s. 246]]</p>
<h3>Bir sinirin başlangıcını tarif ederken</h3>
<p>Birinci sinirde “başlangıç” için burun mukozasındaki reseptör hücresini, ikinci sinirde ise retinanın gangliyon hücresini göstermek gerekir. [[K5 s. 247–249]] I. sinirin ince demetleri bulbusa kadar gelir, bulbusun arkasında görülen uzun yapı olfaktör traktustur. [[K5 s. 248]] II. sinirde ise gözden kiazmaya kadar olan parçaya optik sinir, kiazmadan sonra arkaya uzanan parçaya optik traktus denir. [[K5 s. 250–251]]</p>
</section>
<section class="wrap blk ders-sec" id="an06a-lamina">
<h2>İlkel arka beyinden çekirdek sütunlarına</h2>
<p class="intro">İlkel arka beynin duyu ve motor alanlarını ayıran oluk, erişkindeki çekirdek gruplarını anlamak için bir başlangıç noktasıdır. [[K5 s. 245–247]]</p>
<div class="viz"><div class="viz-head"><h3>Arka beyin tüpünün enine kesiti</h3></div><div data-viz="an06a_lamina"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Kitap “gerçek” kraniyal sinirlerin çekirdeklerini pons ve medullada tarif eder. [[K5 s. 245]] Omurilikte duyu lifleri arka gri sütuna gelir, postsinaptik efferent lifler ön gri sütun hücrelerinden çıkar. [[K5 s. 245]] Tüp biçimindeki ilkel arka beyinde de duyu hücreleri dorsaldeki alar laminada, motor hücreler ventraldeki bazal laminadadır. [[K5 s. 245]] İki laminanın sınırını sulkus limitans çizer. [[K5 s. 245]]</p>
<p>Gelecekteki pons düzeyinde pontin fleksura oluşurken tavan gerilir, boşluk yassılaşır ve dördüncü ventrikül şekillenir. [[K5 s. 245]] Pons ve medullanın gelişimi sırasında iki lamina işlevsel kimliğini korur. [[K5 s. 245–247]]</p>
<h3>Bazal laminanın üç kesintili motor sütunu</h3>
<dl class="an06a-liste">
<dt>Somatik efferent</dt><dd>En ventral sütundur ve omurilik ön boynuzuna karşılık gelir. [[K5 s. 245]] III, IV, VI ve XII. sinirler miyotom kökenli dış göz ve dil kaslarına buradan ulaşır. [[K5 s. 245]]</dd>
<dt>Brankiyal efferent</dt><dd>Biraz daha dorsaldedir ve omurilikte karşılığı yoktur. [[K5 s. 245]] Ark kökenli kaslar sırayla V (1. ark), VII (2. ark), IX (3. ark) ve X’un nukleus ambiguusu (4. ve 6. arklar) tarafından uyarılır. [[K5 s. 245]]</dd>
<dt>Genel visseral efferent</dt><dd>En dorsal motor sütun, omuriliğin lateral gri sütunu gibi otonom işlev görür. [[K5 s. 246]] Kraniyal parasempatik çıkışın kaynakları III’ün Edinger–Westphal, VII’nin üst salivator, IX’un alt salivator ve X’un dorsal motor çekirdekleridir. [[K5 s. 246]]</dd></dl>
<h3>Alar laminanın dört duyu sütunu</h3>
<ol class="ozet"><li><b>Özel somatik afferent.</b> En dorsaldeki işitsel-vestibüler sütun, koklea ve vestibüler aygıttan gelen sinyallerin sinaptik aktarma yeridir. [[K5 s. 246–247]]</li>
<li><b>Genel somatik afferent.</b> Bir sonraki sütunda V’in yüzden duyu alan çekirdekleri bulunur. [[K5 s. 246–247]]</li>
<li><b>Özel visseral afferent.</b> Medullanın merkezi gri maddesindeki soliter traktus çekirdeğine VII’nin korda timpanisiyle ve IX–X ile tat lifleri gelir. [[K5 s. 246]]</li>
<li><b>Genel visseral afferent.</b> Medullanın ekvatoruna en yakın sütun, iç organ duyusunu alır ve vagusun dorsal çekirdeğinin duyu bileşeniyle temsil edilir. [[K5 s. 246]]</li></ol>

<h3>Bir sinir birden fazla sütunda nasıl yer alır?</h3>
<p>Sütun adı, lifin yönünü ve hedefini tanımlar. [[K5 s. 245–247]] Örneğin VII’nin ikinci ark kaslarına giden lifleri brankiyal efferent, üst salivator çekirdekten çıkan lifleri genel visseral efferent, korda timpaniden gelen tat lifleri özel visseral afferent gruptadır. [[K5 s. 245–247]]</p>
<p>III’te aynı ayrımı göz üzerinde yapabilirsiniz. [[K5 s. 245–246]] [[K5 s. 251]] Dış göz kaslarına giden komut miyotom kökenli çizgili kasa ulaşır, pupilla sfinkterine giden komut ise Edinger–Westphal çekirdeği ve siliyer gangliyon üzerinden ilerler. [[K5 s. 245–246]] [[K5 s. 251–252]]</p>
</section>

<section class="wrap blk ders-sec" id="an06a-koku">
<h2>I · Koku mukozasından bulbusa</h2>
<p class="intro">Koku yolunda ilk nöronun gövdesi doğrudan mukozadaki reseptör hücresindedir. [[K5 s. 247–248]]</p>
<div class="viz"><div class="viz-head"><h3>Burun tavanında koku lifleri</h3></div><div data-viz="an06a_koku"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Tipik kraniyal duyu sinirinde gövde gangliyondadır ve reseptöre periferik uzantı gider. [[K5 s. 247–248]] Koku sinirini ise üst konka ve septumun üst bölümündeki reseptörlerin merkezi uzantıları oluşturur. [[K5 s. 247–248]]</p>
<ol class="ozet"><li>Yaklaşık 20 küçük demet yukarı çıkar ve etmoidin kribriform plağındaki deliklerden geçer. [[K5 s. 248]]</li>
<li>İlk sinaps bulbusta, mitral hücrelerin dendritlerindedir. [[K5 s. 248]] Bu hücrelerin aksonları olfaktör traktus içinde arkaya, unkus korteksine ve anterior perfore alan bölgesine uzanır. [[K5 s. 248]]</li>
<li>K5 sonraki seyri belirsiz olarak tanımlar ve hipokampus–forniks sisteminin kokuyla doğrudan bağlantısı olmadığını belirtir. [[K5 s. 248]]</li></ol>
<h3>Koku kaybını yerleştirmek</h3><p>İnsanda görece az gelişmiş olan koku duyusu, soğuk algınlığı gibi mukozayı yaygın etkileyen durumlarda kolay bozulur. [[K5 s. 248]] Tek taraflı anosmi frontal lob tümörünü düşündürebilir. [[K5 s. 248]] Unkus tümörlerinde koku halüsinasyonu, bilinç bozukluğu ve istemsiz çiğneme hareketleriyle unkinat nöbet gelişebilir. [[K5 s. 248–249]]</p>
<p>Kafa travmasından sonra, özellikle ön kraniyal fossa kırığında, I. sinirin bütünlüğünün bozulmasına bağlı iki taraflı anosmi sık görülür. [[K5 s. 249]] Kribriform plakta demetleri saran meningeal kılıf dışta nörilemmayla birleşir. [[K5 s. 249]] Enfeksiyon burundan subaraknoid aralığa bu yoldan yayılabilir. [[K5 s. 249]]</p>
<p><b>Aynı geçit, iki klinik sonuç.</b> Ön fossa kırığından sonra kokunun neden kaybolduğunu açıklarken kribriform deliklerdeki aksonları gösterin. [[K5 s. 248–249]] Nazal enfeksiyonun kraniyal boşluğa nasıl ulaşabileceği sorulduğunda ise dikkati aynı demetleri saran kılıfa ve subaraknoid aralıkla devamlılığına çevirin. [[K5 s. 249]]</p>
</section>

<section class="wrap blk ders-sec" id="an06a-retina">
<h2>II · Retina ve optik sinir</h2>
<p class="intro">Retinanın bütün bölgelerinden gelen gangliyon hücresi aksonları optik diskte birleşir ve sklerayı geçerek optik siniri oluşturur. [[K5 s. 249]]</p>
<div class="viz"><div class="viz-head"><h3>Retinada hücre tabakaları</h3></div><div data-viz="an06a_retina"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Görme siniri ve retina ön beynin lateral divertikülünden gelişir. [[K5 s. 249]] Optik sinir serebrumun uzantısıdır ve lifleri nörilemma taşımadığından kesildiklerinde diğer beyin dokuları gibi yenilenemez. [[K5 s. 249]]</p>
<p><b>Retinada üç işlevsel durak.</b> Çubuk ve koniler reseptör tabakasını oluşturur, ortadaki bipolar hücreler gangliyon hücrelerine bağlanır. [[K5 s. 249]] Vitreustan koroide doğru iç limitan membran, optik sinir lifleri, gangliyon hücreleri, iç pleksiform, bipolar hücrelerin iç nükleer ve dış pleksiform tabakaları izlenir. [[K5 s. 249]] Daha dışta çubuk ve koniler, pigment hücreleri ve koroid yer alır. [[K5 s. 249]]</p>
<p><b>Papilödemin anatomisi.</b> Meninksler ve subaraknoid aralık optik siniri sarar, meninksler önde skleranın bağ dokusuyla birleşir. [[K5 s. 249]] Artmış beyin omurilik sıvısı basıncı bu aralık boyunca sinire iletilip venöz drenajı sıkıştırdığında papilödem gelişebilir. [[K5 s. 249]]</p>
<dl class="an06a-liste"><dt>Orbita içinde · yaklaşık 2,5 cm</dt><dd>Sinir, rektus kaslarının çevrelediği orbital yağ içinde arkaya ve mediale yönelir. [[K5 s. 250]] Siliyer gangliyon sinirin lateralindedir. [[K5 s. 250]] Retina santral arteri ve veni bu seyrin ortasında inferomedialden sinire girer ve merkezinde öne ilerler. [[K5 s. 250]]</dd>
<dt>Optik foramen</dt><dd>Sinir, oftalmik arterin superomedialinden geçer ve sfenoid gövdesinin dorsal yüzündeki optik oluğa ulaşır. [[K5 s. 250]]</dd>
<dt>Kafatası içinde · 1,25 cm</dt><dd>Optik sinir internal karotis arterinin medialinden kiazmaya ilerler. [[K5 s. 250]]</dd></dl>
<p><b>İki arter ilişkisini ayırt edin.</b> Optik sinirin ortasına girip onun içinde öne giden damar retinanın santral arteridir ve yanında santral ven bulunur. [[K5 s. 250]] Oftalmik arterin konumunu tarif etmek içinse sinirin içini değil, optik foramendeki komşuluğunu düşünün. [[K5 s. 250]]</p>
</section>

<section class="wrap blk ders-sec" id="an06a-kiazma">
<h2>II · Kiazma ve görme alanları</h2>
<p class="intro">Kiazmada bir lifin çapraz yapıp yapmayacağını hangi retina yarısından geldiği belirler. [[K5 s. 250]]</p>
<div class="viz"><div class="viz-head"><h3>İki gözden optik traktuslara</h3></div><div data-viz="an06a_kiazma"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Temporal görme alanının görüntüsü medial retinaya düşer ve bu yarının bütün lifleri karşı optik traktusa geçer. [[K5 s. 250]] Nazal alanın görüntüsünü alan lateral retina yarısının lifleri ise aynı taraftaki traktusta kalır. [[K5 s. 250]]</p>
<p><b>Görme korteksine.</b> Liflerin çoğu talamusun altı tabakalı lateral genikulat cisminde sinaps yapar. [[K5 s. 250]] Buradan çıkan optik radyasyon laterale ve arkaya kavis çizerek oksipital kortekste kalkarin fissürün iki yanındaki striat alana ulaşır. [[K5 s. 250]] Üst retina fissürün üst dudağında, alt retina alt dudağında temsil edilir. [[K5 s. 250]] Merkezi retinanın korteksteki payı periferinkinden çok daha geniştir ve bu fark makulanın yüksek görme keskinliğiyle ilişkilidir. [[K5 s. 250]]</p>
<p><b>Refleks bağlantıları.</b> Daha küçük bir lif grubu lateral genikulat cisme uğramadan superior kollikulusa gider. [[K5 s. 250]] K5 burada III, IV, VI ve XI’e aktarımla baş ve gözlerin refleks hareketlerini, ışık ve pupilla yanıtlarını birlikte gösterir. [[K5 s. 251]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Lezyon yeri</th><th>Görme alanında beklenen kayıp</th></tr></thead><tbody>
<tr><td>Retina veya optik sinir</td><td>İlgili bölümde tek taraflı kayıp. [[K5 s. 250]]</td></tr>
<tr><td>Optik kiazma</td><td>Örneğin büyüyen hipofiz tümörü çaprazlaşan lifleri etkilerse iki temporal alan kaybolur (bitemporal hemianopi). [[K5 s. 250]]</td></tr>
<tr><td>Optik traktus veya daha merkezi yol</td><td>Her iki gözün görme alanında aynı tarafta kayıp (homonim defekt). [[K5 s. 250]]</td></tr></tbody></table></div>
<h3>Bir lif üzerinden tarafı belirleyin</h3>
<p>Sağ gözün temporal alanından gelen görüntü sağ medial retinaya düşer, lif sağ optik sinirde ilerler ve kiazmada sol traktusa geçer. [[K5 s. 250]] Aynı traktusa sol gözün lateral retinasından çaprazlaşmadan gelen lifler de katılır. [[K5 s. 250]] Böylece sol optik traktus lezyonunda sağ gözün temporal alanı ile sol gözün nazal alanı birlikte etkilenir. [[K5 s. 250]]</p>
<p>Hipofiz tümörü kiazmadaki çaprazı etkilediğinde ise iki gözün de medial retinasından gelen bilgi kesilir. [[K5 s. 250]] Bu nedenle kaybın adı retina yarılarına göre değil, hastanın göremediği iki temporal alana göre konur. [[K5 s. 250]]</p>
</section>

<section class="wrap blk ders-sec" id="an06a-okulomotor">
<h2>III · Mezensefalondaki çıkış ve göz hareketlerinin denetimi</h2>
<p class="intro">III. sinirin somatik motor çekirdeği ile komşu parasempatik Edinger–Westphal çekirdeği superior kollikulus düzeyinde akuaduktus tabanındadır. [[K5 s. 251]]</p>
<div class="viz"><div class="viz-head"><h3>Beyin sapında kollikulus düzeyleri</h3></div><div data-viz="an06a_okulomotor"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>III, lateral rektus ve superior oblik dışındaki tüm dış göz kaslarını uyarır. [[K5 s. 251]] İki çekirdekten gelen lifler tegmentumu dikey geçer ve serebral pedinkülün hemen medialinden çıkar. [[K5 s. 251]] K5’in bu düzeydeki kesitinde tektum ve akuaduktus, daha ventralde kırmızı çekirdek, substansiya nigra ve piramidal traktusu taşıyan pedinkül görülür. [[K5 s. 252]]</p>
<p>K5 bu düzeyde medial lemniskusu, rubrospinal traktus çaprazını ve mamiller cismi de komşu yapılar olarak gösterir. [[K5 s. 252]]</p>
<h3>III, IV ve VI nasıl birlikte çalışır?</h3><p>Bu üç sinirin somatik efferent çekirdekleri aynı santral bağlantıları paylaşır. [[K5 s. 251]]</p>
<dl class="an06a-liste"><dt>İstemli bakış</dt><dd>Komut karşı motor korteksten gelir ve piramidal traktusta iner. [[K5 s. 251]]</dd><dt>Görsel refleks hareketleri</dt><dd>Oksipital görme korteksi, superior kollikulus ve tektobulber traktus üzerinden göz hareketi çekirdeklerine bağlanır. [[K5 s. 251]]</dd><dt>Vestibüler refleks hareketleri</dt><dd>VIII’in vestibüler bölümünden gelen uyarılar medial longitudinal demet üzerinden bu çekirdeklere ulaşır. [[K5 s. 251]]</dd></dl>
<div class="note plain"><b>Atlas notu.</b> Kitap optik sinirden Edinger–Westphal çekirdeğine giden ışık refleksi liflerini superior kollikulus üzerinden tarif eder. [[K5 s. 251]] Pupilla ışık refleksindeki ara istasyon pretektal bölgedir.</div>
<p><b>Çekirdek ile yüzeye çıkışı ayrı tarif edin.</b> Akuaduktus ve superior kollikulus, III’ün hücre gövdelerini kesitte yerleştirmeye yarar. [[K5 s. 251–252]] Serebral pedinkül ise lifler tegmentumu geçtikten sonra sinirin beyin sapından hangi tarafta göründüğünü tarif etmek için kullanılır. [[K5 s. 251]] IV için aynı iki sorunun yanıtı inferior kollikulus düzeyi ve kollikulusun hemen arkasındaki dorsal çıkıştır. [[K5 s. 253]]</p>
</section>

<section class="wrap blk ders-sec" id="an06a-kavernoz">
<h2>III · Kavernöz sinüsten orbitaya</h2>
<p class="intro">III. sinir, posterior serebral ve superior serebellar arterler arasından öne ilerler, durayı deler ve kavernöz sinüsün lateral duvarına girer. [[K5 s. 252]]</p>
<div class="viz"><div class="viz-head"><h3>Orbita apeksinde iki geçit</h3></div><div data-viz="an06a_kavernoz"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Kavernöz sinüsün lateral duvarında yukarıdan aşağıya III, IV, V₁ ve V₂ sıralanır. [[K5 s. 252]] VI ile internal karotis kavernöz sinüsün içinde, hipofiz medialde, sfenoid sinüs aşağıdadır. [[K5 s. 252]]</p>
<p>III, superior orbital fissüre ulaşmadan iki dala ayrılır. [[K5 s. 252]] İki dal da fissürden geçerken rektusların ortak tendinöz halkasının içinden orbitaya girer. [[K5 s. 252]] Orbita girişinde levator palpebrae, superior oblik, superior, medial, inferior ve lateral rektus kasları görülür. [[K5 s. 250]] Üst ve alt oftalmik venler ile V’in lakrimal, frontal ve nazosiliyer dalları da komşudur. [[K5 s. 250]]</p>
<dl class="an06a-liste"><dt>Üst dal</dt><dd>Optik sinirin lateralinden ilerler ve superior rektus ile üst göz kapağını kaldıran levator palpebrae superiorisi uyarır. [[K5 s. 252]]</dd><dt>Alt dal</dt><dd>Medial rektus, inferior rektus ve inferior oblik kasa gider. [[K5 s. 252]] İnferior oblik kas dalı, pupilla sfinkteri ve siliyer kasa yönelik pregangliyonik parasempatik lifleri siliyer gangliyona taşır. [[K5 s. 251–252]]</dd></dl>
<h3>III tamamen kesilirse</h3>
<ul class="ozet"><li>Levatorun felci üst göz kapağını düşürür (pitoz). [[K5 s. 253]]</li><li>Lateral rektus ve superior oblik etkinliğini sürdürür, göz dışa döner ve diverjan şaşılık gelişir. [[K5 s. 251–253]]</li><li>Sempatik dilatatör etki karşılıksız kaldığından pupilla genişler. [[K5 s. 253]]</li><li>Akomodasyon–konverjans ve ışık refleksleri kaybolur, hasta çift görür. [[K5 s. 253]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap akomodasyon–konverjans ve ışık refleksi kaybını birlikte siliyer kas felcine bağlar. [[K5 s. 253]] Yakına bakışta siliyer kas akomodasyonu, medial rektuslar konverjansı sağlar ve ışığa yanıt olarak pupillayı sfinkter daraltır.</div>
<p><b>Muayeneyi dallara bağlayın.</b> Üst kapağın kaldırılması üst dalın somatik motor işlevini, pupillanın ışıkta daralması ise alt dalla taşınan parasempatik liflerin işlevini sınar. [[K5 s. 251–253]] Tam keside bu iki işlev birlikte kaybolurken göz küresinde III dışındaki sinirlerden uyarı alan kasların çekişi sürer. [[K5 s. 251–253]]</p>
</section>

<section class="wrap blk ders-sec" id="an06a-troklear">
<h2>IV · Dorsal çıkıştan superior oblik kasa</h2>
<p class="intro">En ince kraniyal sinir olan IV’ün tek kas hedefi superior oblik kastır. [[K5 s. 253]]</p>
<div class="viz"><div class="viz-head"><h3>Orbita tavanından superior oblik kas</h3></div><div data-viz="an06a_troklear"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Somatik efferent çekirdek, III’ünkine benzer biçimde akuaduktusun hemen altında, ancak inferior kollikulus düzeyindedir. [[K5 s. 253]] Merkezi bağlantılarını III ve VI ile paylaşır. [[K5 s. 251–253]]</p>
<ol class="ozet"><li><b>Çapraz.</b> Lifler akuaduktusun çevresinden dorsale döner ve superior medüller velumda çaprazlaşır. [[K5 s. 253]] Bu düzeyin kesitinde V’in mezensefalik çekirdeği, medial longitudinal demet, lateral ve medial lemniskuslar, superior serebellar pedinkül çaprazı ve pons gösterilir. [[K5 s. 253]]</li>
<li><b>Beyin sapından çıkış.</b> Sinir inferior kollikulusun hemen arkasından çıkar, serebral pedinkülü dolanır ve posterior serebral ile superior serebellar arterler arasından öne geçip durayı deler. [[K5 s. 253]]</li>
<li><b>Kavernöz sinüs.</b> Lateral duvarda III ile oftalmik sinir arasında ilerler. [[K5 s. 253]]</li>
<li><b>Orbita.</b> Superior orbital fissürde ortak tendinöz halkanın lateralinden geçer, optik sinirin üzerinden mediale yönelir ve superior oblik kasa girer. [[K5 s. 253–254]]</li></ol>
<div class="note plain"><b>Atlas notu.</b> Kitap IV lezyonundaki superior oblik felcine bağlı diplopiyi aşağı ve dışa bakışta tarif eder. [[K5 s. 254]] Superior oblik kasın aşağı döndürme etkisi addüksiyonda en belirgin olduğundan aşağı ve içe bakış kusuru ortaya çıkarır.</div>
<p><b>III ile IV’ü yol boyunca karşılaştırın.</b> İki sinir de aynı arter çifti arasından geçer ve kavernöz sinüsün lateral duvarını izler. [[K5 s. 252–253]] Orbita girişinde hangi siniri izlediğinizi, ortak tendinöz halkaya göre konumundan ayırt edebilirsiniz. [[K5 s. 252–254]] Orbita içinde de III’ün üst dalı optik sinirin lateralinden giderken IV, optik sinirin üstünden mediale geçer. [[K5 s. 252–254]]</p>
</section>

<section class="wrap blk ders-sec" id="an06a-p1">
<h2>Part I · Çoklu doğru–yanlış</h2>
<p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="an06a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an06a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an06a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an06a-p2">
<h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir hastada üst göz kapağı düşük, pupilla geniş ve göz dışa dönük. Hangi sinirin tam lezyonu bu üç bulguyu bir araya getirir? Siniri çekirdekten orbitaya izleyin.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>III. sinirin somatik ve Edinger–Westphal çekirdekleri superior kollikulus düzeyindedir. [[K5 s. 251]]</li>
<li>Lifler pedinkülün medialinden çıkar, posterior serebral ve superior serebellar arterler arasından kavernöz sinüsün lateral duvarına geçer. [[K5 s. 251–252]]</li>
<li>Her iki dal superior orbital fissürdeki ortak tendinöz halkadan geçer. [[K5 s. 252]] Üst dalın levator innervasyonunu kaybetmesi pitozu açıklar. [[K5 s. 252–253]]</li>
<li>Pupilla sfinkterinin parasempatik girdisi kesilir ve pupilla genişler. [[K5 s. 251–253]] Etkileri süren lateral rektus ve superior oblik gözü dışa döndürür. [[K5 s. 253]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Orbita apeksinde optik forameni, superior orbital fissürü ve tendinöz halkayı işaretleyin. II ile oftalmik arteri foramene, III’ün dallarını halkanın içine, IV’ü lateraline yerleştirin. [[K5 s. 250–254]]</div>
<div class="note plain"><b>Ek sorular</b><ul><li>Kiazmaya bası hangi görme alanlarını etkiler?</li><li>Optik siniri çevreleyen aralık papilödemi nasıl açıklar?</li><li>Ön fossa kırığı koku kaybına nasıl yol açabilir?</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="an06a-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Koku yolunda reseptör aksonları kribriform plağı geçip bulbusta mitral hücrelere ulaşır. [[K5 s. 248]]</li>
<li>Görme kaybını yerleştirirken tek gözde kaybı, iki temporal alanın kaybını ve homonim defekti ayırt edin. [[K5 s. 250]]</li>
<li>III’ün iki dalı halkanın içinden geçer, IV ise halkayı lateralden geçerek superior oblik kasa gider. [[K5 s. 252–254]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="06a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/05">← Otonom sinir sistemi</a><a href="#/dersler/anatomi/06b">Sonraki: Trigeminal sinir: gangliyon, oftalmik ve maksiller dallar →</a></nav>
</section>`,
};
