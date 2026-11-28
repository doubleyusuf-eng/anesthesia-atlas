VERI.sorular = VERI.sorular || {};
VERI.sorular['fk26-1'] = {
  no: 1, kok: 'İzotoplar ve bozunma', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 412–416]]',
  onermeler: [
    { t: 'Döteryum ile trityumun çekirdek yükleri farklıdır.', d: false, n: 'Her iki çekirdek de bir proton taşır; fark nötron sayısındadır. [[K6 s. 412–413]]' },
    { t: 'Trityumun beta bozunmasıyla kararlı helyum-3 oluşur.', d: true, n: 'Trityum bir elektron yayar ve kız çekirdek helyum-3’tür. [[K6 s. 413]]' },
    { t: 'Becquerel, saniyedeki çekirdek parçalanmalarını ifade eder.', d: true, n: 'Bir becquerel saniyede bir parçalanmadır. [[K6 s. 416]]' },
    { t: 'İki yarı ömür sonunda başlangıç çekirdeklerinin yarısı kalır.', d: false, n: 'Kalan miktar her yarı ömürde yeniden yarıya iner, iki yarı ömürde dörtte bir kalır. [[K6 s. 415–416]]' },
    { t: 'Bir çekirdeğin bozunma anı yarı ömründen hesaplanabilir.', d: false, n: 'Yarı ömür çok sayıda çekirdeğin toplu davranışını tanımlar. [[K6 s. 415]]' }
  ]
};
VERI.sorular['fk26-2'] = {
  no: 2, kok: 'Işınların maddeyle etkileşimi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 413–420]]',
  onermeler: [
    { t: 'Deri alfa parçacığını durdursa da yutulan bir alfa yayıcı ağır hasar verebilir.', d: true, n: 'Alfa parçacığının kısa menzili, kaynak vücuda alındığında koruma sağlamaz. [[K6 s. 414]]' },
    { t: 'Sievert, radyasyon türünün biyolojik etkisini hesaba katar.', d: true, n: 'Eşdeğer dozda soğurulan doz radyasyon türüne göre ağırlıklandırılır. [[K6 s. 417]]' },
    { t: 'Frenleme ışınımında foton, hedefteki elektronun üst enerji düzeyine çıkmasıyla oluşur.', d: false, n: 'Frenleme ışınımı, gelen elektronun metalde yavaşlamasıyla oluşur. [[K6 s. 419]]' },
    { t: 'Karakteristik X-ışınının frekansı hedef metale bağlıdır.', d: true, n: 'Boşalan enerji düzeyine daha yüksek düzeyden geçiş, hedefe özgü bir foton verir. [[K6 s. 419]]' },
    { t: 'Zayıflama yalnız soğurulmadan kaynaklanır.', d: false, n: 'Saçılma da demetin zayıflamasına katkıda bulunur. [[K6 s. 418]]' }
  ]
};
VERI.sorular['fk26-3'] = {
  no: 3, kok: 'Kesitsel ve işlevsel görüntüleme', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 421–424]]',
  onermeler: [
    { t: 'SPECT dedektörü, pozitronun yok oluşundan doğan foton çiftini eşleştirir.', d: false, n: 'SPECT gama yayıcı izleyicinin tek fotonlarını algılar; çiftleri eşleştiren yöntem PET’tir. [[K6 s. 421–422]]' },
    { t: 'PET’te eşzamanlı kayıt iki fotonun ortak kökenini destekler.', d: true, n: 'Yok oluşta zıt yönlere giden fotonlar karşı dedektörlerde eşzamanlı kaydedilir. [[K6 s. 422–423]]' },
    { t: 'Flor-18 ile işaretli fludeoksiglukoz bölgesel glukoz alımını yansıtır.', d: true, n: 'İzleyicinin dağılımı dokunun metabolik etkinliği hakkında bilgi verir. [[K6 s. 423]]' },
    { t: 'BT’de tüp ve karşısındaki dedektör birlikte döner.', d: true, n: 'Hasta halkaya göre ilerlerken tüp ile dedektörün dönüşü spiral taramayı sağlar. [[K6 s. 424]]' },
    { t: 'Stres sonrasında miyokart SPECT’i göreli bölgesel kan akımını gösterebilir.', d: true, n: 'İzleyicinin miyokarttaki dağılımı, bölgelerin birbirine göre kanlanmasını yansıtır. [[K6 s. 421]]' }
  ]
};

SAYFALAR['dersler/fizik/26'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 26', baslik: 'Nükleer fizik, radyasyon ve görüntüleme',
  lede: 'Radyografi ve BT’de dedektöre ulaşan ışın hastanın dışından gelir. [[K6 s. 420]] [[K6 s. 424]] SPECT ve PET’te sinyalin kaynağı vücuda verilen izleyicidir. [[K6 s. 421–423]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="fk26-izotop">İzotoplar</button>
  <button type="button" data-scroll="fk26-isin">Giricilik</button>
  <button type="button" data-scroll="fk26-yari">Yarı ömür</button>
  <button type="button" data-scroll="fk26-iyon">Doz</button>
  <button type="button" data-scroll="fk26-tedavi">Radyoterapi</button>
  <button type="button" data-scroll="fk26-rontgen">Röntgen</button>
  <button type="button" data-scroll="fk26-spect">SPECT</button>
  <button type="button" data-scroll="fk26-pet">PET</button>
  <button type="button" data-scroll="fk26-bt">BT</button>
  <button type="button" data-scroll="fk26-p1">Part I</button>
  <button type="button" data-scroll="fk26-p2">Part II</button>
  <button type="button" data-scroll="fk26-ozet">Özet</button>
</nav>

<section class="wrap blk ders-sec" id="fk26-izotop">
  <h2>Çekirdeğin kararlılığı</h2>
  <p class="intro">Atomun radyoaktif olup olmadığını çekirdeğinin kararlılığı belirler. [[K6 s. 412]]</p>
  <div class="viz"><div class="viz-head"><h3>Hidrojenin hangi özelliği değişiyor?</h3></div><div data-viz="fk26_izotop"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Aynı elementin atomları proton sayısını koruyup farklı sayıda nötron taşıyabilir; bunlar o elementin izotoplarıdır. [[K6 s. 412–413]] Çoğu elementin doğada bulunma oranları farklı birkaç izotopu vardır. [[K6 s. 412]]</p>
  <ul class="ozet">
    <li><b>Ana ve kız çekirdek.</b> Bozunan radyoaktif izotopa ana, bozunmayla oluşan radyojenik izotopa kız izotop denir. [[K6 s. 412]] Kararsız çekirdek alfa ya da beta parçacığı veya elektromanyetik enerji taşıyan gama ışını yayarak daha kararlı duruma geçebilir. [[K6 s. 412]]</li>
    <li><b>Ağır çekirdekler.</b> Atom numarası 92 olan uranyum gibi ağır çekirdekler genel olarak hafif çekirdeklerden daha kararsızdır; bozunmada kütle numarası, atom numarası veya her ikisi değişebilir. [[K6 s. 412]]</li>
    <li><b>Karbonla tarihleme.</b> Hafif bir elementin de kararsız izotopu olabilir: canlı maddede az miktarda bulunan karbon-14’ün yarı ömrü 5730 yıldır. [[K6 s. 412]] Organik arkeolojik örnekler, karbon-14 miktarının daha bol ve kararlı karbon-12’ye oranından yararlanılarak tarihlenir. [[K6 s. 412]]</li>
    <li><b>Hidrojen ailesi.</b> En yaygın hidrojenin çekirdeğinde tek proton bulunur; döteryumda bir nötron eklenir ve kütle yaklaşık iki katına çıkar. [[K6 s. 412]] Trityum iki nötron taşır ve kütle numarası üçtür. [[K6 s. 413]] Üç nötr atomun da bir elektronu vardır; çekirdek yükleri ve kimyasal özellikleri aynıdır. [[K6 s. 413]]</li>
    <li><b>Trityumun ürünü.</b> Döteryum kararlıdır, trityumun yarı ömrü ise 12,32 yıldır. [[K6 s. 413]] Trityum beta bozunmasıyla elektron yayar (<sup>3</sup><sub>1</sub>H → <sup>3</sup><sub>2</sub>He<sup>+</sup> + β<sup>−</sup>; üstteki sayı kütle, alttaki atom numarasıdır); oluşan helyum-3 çekirdeği kararlı, bir elektronu eksik olan helyum iyonu pozitif yüklüdür. [[K6 s. 413]]</li>
  </ul>
<h3>Bir bozunmayı parçacık sayarak okuyun</h3>
<p><b>Önce ana çekirdek.</b> ³H gösterimindeki 3, proton ile nötron sayılarının toplamıdır; trityum için bu toplam bir proton ve iki nötrondan gelir. [[K6 s. 412–413]] Çekirdek çevresinde bir elektron bulunduğundan başlangıçtaki atom elektriksel olarak nötrdür. [[K6 s. 412–413]]</p>
<p><b>Sonra kız çekirdek.</b> Bir nötronun protona dönüşmesini izleyin: ³He artık iki proton ve bir nötron taşır, kütle numarası yine üçtür. [[K6 s. 413–414]] Yayılan beta elektronu çekirdekteki dönüşümden gelir; başlangıçtaki yörünge elektronu tek başına iki protonun yükünü dengeleyemez. [[K6 s. 413–414]]</p>
</section>

<section class="wrap blk ders-sec" id="fk26-isin">
  <h2>Radyasyon ve giricilik</h2>
  <p class="intro">Radyasyon, dalga ya da hızlı parçacık biçiminde taşınan enerjidir. [[K6 s. 413–414]]</p>
  <div class="viz"><div class="viz-head"><h3>Hangi engelde durur?</h3></div><div data-viz="fk26_engel"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ul class="ozet">
    <li><b>Alfa (α).</b> İki proton ve iki nötrondan oluşan pozitif parçacık bir helyum çekirdeğidir. [[K6 s. 414]] Alfa bozunmasında yayılan parçacığı bir yaprak kâğıt veya derinin dış tabakası durdurabilir. [[K6 s. 413–414]] Ancak alfa yayıcının yutulması ağır radyasyon zehirlenmesine neden olabilir. [[K6 s. 414]]</li>
    <li><b>Beta eksi (β⁻).</b> Nötron/proton oranı fazla olduğunda bir nötron protona dönüşür; proton çekirdekte kalır, elektron dışarı çıkar. [[K6 s. 414]] Hızlı elektronun yükü negatiftir ve hızı enerjisine bağlıdır. [[K6 s. 414]] Alfa parçacığından daha ileri gidebilir, kimyasal bağları kırarak iyon oluşturabilir; birkaç milimetre kalınlığında alüminyum onu durdurabilir. [[K6 s. 413–414]]</li>
    <li><b>Beta artı (β⁺).</b> Bazı çekirdekler elektronun antimadde karşılığı olan pozitif yüklü, hızlı bir pozitron yayar. [[K6 s. 414]]</li>
    <li><b>Gama (γ).</b> Çekirdekten yayılan yüksek enerjili elektromanyetik ışın insan dokusu dâhil birçok maddeden geçebilir. [[K6 s. 412–414]] Üçü içinde giriciliği en yüksek olan gamayı zayıflatmak için kalın beton veya kurşun gerekir. [[K6 s. 413–414]] X-ışınları da birçok maddeden geçer ve benzer tehlikeler taşır, ancak çekirdek dışında üretilir. [[K6 s. 414–415]]</li>
  </ul>
  <aside class="note plain"><b>Atlas notu.</b> Kitap gama ışınlarını X-ışınlarından daha enerjik ve girici olarak tanımlar; doğrusu, enerji aralıkları örtüşebilir ve ayırım kökene dayanır. [[K6 s. 414]]</aside>
<h3>Kaynağın yerine göre tehlikeyi okuyun</h3>
<p>Elin dışına ulaşan alfa parçacığıyla, yutulan bir kaynaktan dokunun içine yayılan aynı parçacığı karşılaştırın. [[K6 s. 414]] İlk durumda derinin dış tabakası bir engeldir; ikinci durumda kaynak zaten bu engelin iç tarafındadır. [[K6 s. 414]] Bu yüzden kısa menzil tek başına biyolojik tehlikenin küçük olduğu anlamına gelmez. [[K6 s. 414]]</p>
<p>Bir beta elektronunun hızı için yalnız parçacığın adını bilmek yeterli değildir; aynı türdeki parçacıklar farklı enerji ve hızlara sahip olabilir. [[K6 s. 414]] Şekildeki durma noktaları bu nedenle tek tek parçacıkların dokuda kaç milimetre ilerleyeceğini değil, kitaptaki zırh karşılaştırmasını gösterir. [[K6 s. 413–414]]</p>
</section>

<section class="wrap blk ders-sec" id="fk26-yari">
  <h2>Bozunma, yarı ömür ve aktivite</h2>
  <p class="intro">Tek bir çekirdeğin ne zaman bozunacağı bilinemez, ama çok sayıda çekirdek içeren örnekte kalan miktar öngörülebilir. [[K6 s. 415]]</p>
  <div class="viz"><div class="viz-head"><h3>Bir yarı ömür daha geçerse ne kalır?</h3></div><div data-viz="fk26_yari"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Isıtılan mısır tanelerini düşünün: önce hangi tanenin patlayacağı belli değildir, ama koşullar biliniyorsa yarısının patlamasına kadar geçen süre tahmin edilebilir. [[K6 s. 415]] Patlama gibi radyoaktif bozunma da geri dönüşsüzdür. [[K6 s. 415]]</p>
  <ul class="ozet">
    <li><b>Üstel azalma.</b> Başlangıçta <i>N</i><sub>0</sub> çekirdek varsa <i>t</i> süre sonra beklenen sayı <b><i>N</i> = <i>N</i><sub>0</sub>·e<sup>−λt</sup></b> olur. [[K6 s. 415]] <i>N</i> ve <i>N</i><sub>0</sub> birimsiz sayılardır; bozunma sabiti λ izotopun radyoaktivitesinin ölçüsüdür, birimi, <i>t</i> için kullanılan zaman biriminin tersidir. [[K6 s. 415]]</li>
    <li><b>Yarı ömür.</b> Çekirdeklerin yarısının bozunmasına kadar geçen süre <b><i>T</i><sub>½</sub> = ln(2)/λ</b> olarak yazılır. [[K6 s. 415–416]] Burada ln, Euler sayısı e tabanındaki doğal logaritmadır. [[K6 s. 416]] Eşit zaman aralıklarında aynı oran kaybolur; kalan çekirdek sayısı azaldıkça aktivite de azalır. [[K6 s. 415]] Modelde eğri sıfıra yaklaşır; uzun süre sonra aktivite ölçülemeyecek kadar küçülür. [[K6 s. 415]]</li>
    <li><b>Aktivite birimi.</b> Bir saniyede bir parçalanma bir becquerel (Bq = s<sup>−1</sup>) eder. [[K6 s. 416]] Becquerel, eski curie biriminin büyük ölçüde yerini almıştır: 1 Ci = 3,7 × 10<sup>10</sup> Bq. [[K6 s. 416]]</li>
    <li><b>Zaman ve tehlike.</b> Aynı sayıda çekirdek için kısa yarı ömür, aynı sürede daha fazla radyasyon ve daha yakın tehlike demektir. [[K6 s. 416]] Bazı nükleer atıkların yarı ömrü on binlerce yıldır; bu kez sorun uzun süreli depolamadır. [[K6 s. 416]]</li>
  </ul>
  <aside class="fk26-hesap"><b>Flor-18 ile yarı ömür hesabı</b><p>Yarı ömrü 110 dakika olan flor-18 için başlangıç miktarını %100 alın. [[K6 s. 415–416]] [[K6 s. 423]] 110 dakika sonra %50, bir 110 dakika daha geçince başlangıcın %25’i kalır. [[K6 s. 415–416]] [[K6 s. 423]]</p></aside>
<h3>Grafikte iki farklı soruyu yanıtlayın</h3>
<p><b>Ne kadarı kaldı?</b> Yatay eksende geçen süreyi seçin ve eğri üzerindeki noktadan düşey eksene gidin; okuduğunuz değer başlangıçtaki çekirdek sayısının kalan yüzdesidir. [[K6 s. 415–416]] Örneğin 220 dakikada flor-18’in dörtte biri kalır; bozunan kısım ise başlangıçtaki çekirdeklerin dörtte üçüdür. [[K6 s. 415–416]] [[K6 s. 423]]</p>
<p><b>Yarı ömür grafikten nasıl bulunur?</b> Başlangıç düzeyinin yarısından eğriye yatay gidin, sonra zaman eksenine inin. [[K6 s. 415–416]] İkinci yarılanmayı ararken başlangıçtaki %100 düzeyini değil, ilk yarılanmanın sonunda kalan %50’yi esas alın. [[K6 s. 415–416]] Ardışık iki zaman aralığının süresi aynıdır; bu aralıklarda bozunan mutlak çekirdek sayıları ise farklıdır. [[K6 s. 415–416]]</p>
  <aside class="fk26-hesap"><b>Aynı hesabı trityum için kurun</b>
    <p>Üstel denklemde zamanı yıl olarak kullanacaksanız, trityumun 12,32 yıllık yarı ömründen hesapladığınız λ’yı yıl<sup>−1</sup> cinsinden yazın. [[K6 s. 413]] [[K6 s. 415]] Bir yarı ömürde üstteki −λ<i>t</i> çarpımı −ln(2) olur ve kalan çekirdek sayısı başlangıç değerinin yarısına iner. [[K6 s. 415–416]]</p>
    <p>Karbon-14 için de kalan oran aynı kurala uyar; fark, aynı yarılanma için 5730 yıl geçmesidir. [[K6 s. 412]] [[K6 s. 415–416]] Bu yüzden farklı izotopları karşılaştırırken yalnız kalan yüzdeyi değil, o yüzdeye kaç yılda ulaşıldığını da belirtin. [[K6 s. 412–413]] [[K6 s. 415–416]]</p>
  </aside>
</section>

<section class="wrap blk ders-sec" id="fk26-iyon">
  <h2>İyonlaşma ve doku dozu</h2>
  <p class="intro">İyonlaştırıcı radyasyon, geçtiği maddede iyon oluşturabilecek kadar enerji taşır. [[K6 s. 417]]</p>
  <div class="viz"><div class="viz-head"><h3>Bir fotondan hücre hasarına</h3></div><div data-viz="fk26_iyon"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Görünür ışığın retinada algılanıp beyinde görüntüye dönüşmesi, düşük enerjili dalgaların hücrede geri dönüşsüz değişiklik oluşturmadan etki edebilmesine örnektir. [[K6 s. 416]]</p>
  <ul class="ozet">
    <li><b>Fotonlar.</b> Gama ve X-ışını fotonları atomun dış kabuğundan elektron koparabilir; oluşan iyonlar dokuda başka kimyasal tepkimeler başlatabilir. [[K6 s. 417]]</li>
    <li><b>Yüklü parçacıklar.</b> Alfa ve beta da iyonlaştırıcıdır; hem elektrik yükleri hem de kinetik enerjileri sayesinde geçtikleri maddenin elektron düzenini bozabilirler. [[K6 s. 417]]</li>
    <li><b>Hücre ve DNA.</b> Hücre içi kimyasal değişiklikler işlev kaybına veya ölüme neden olabilir. [[K6 s. 417]] DNA zincirinin hasarı kansere yol açabilen zararlı mutasyonlar oluşturabilir. [[K6 s. 417]]</li>
    <li><b>Doğal maruziyet.</b> Kayalardaki uranyum-238’in bozunma ürünlerinden radon gazı mağara ve bodrumlarda birikebilir. [[K6 s. 417]] Radon ve kozmik ışınlar doğal arka plan radyasyonuna katkıda bulunur; iyonlaştırıcı radyasyon tehlikesi uluslararası uyarı simgesiyle gösterilir. [[K6 s. 417]]</li>
  </ul>
    <ul class="ozet">
    <li><b>Gray (Gy).</b> Soğurulan doz, doku kütlesi başına soğurulan enerjidir; bir kilogram dokuda bir joule soğurulması 1 Gy’dir. [[K6 s. 417]]</li>
    <li><b>Sievert (Sv).</b> Eşdeğer doz, soğurulan dozu radyasyon türünün biyolojik zararına göre ağırlıklandırır. [[K6 s. 417]] 1 Sv de 1 J·kg<sup>−1</sup> boyutundadır; biyolojik etkiyi hesaba katması bu ölçüyü klinik açıdan anlamlı kılar. [[K6 s. 417]]</li>
  </ul>
<h3>Ölçüm sorusunda önce hangi niceliğin istendiğini bulun</h3>
<ul class="ozet">
<li><b>Kaynakta bir saniyede kaç bozunma var?</b> Bu soru kaynağın aktivitesiyle ilgilidir; yanıtın birimi Bq’dur. [[K6 s. 416]]</li>
<li><b>Dokunun her kilogramı ne kadar enerji aldı?</b> Kaynaktan çıkan ışının tümü yerine dokuda soğurulan enerjiyi kullanın; bunu doku kütlesine böldüğünüzde Gy cinsinden dozu bulursunuz. [[K6 s. 417]]</li>
<li><b>Radyasyon türü hesaba katıldığında doz nedir?</b> Aynı enerji/kütle boyutuna sahip olsalar da Gy ile Sv farklı sorulara yanıt verir; Sv için radyasyonun dokuyu zedeleyici etkisi ağırlıklandırmaya girer. [[K6 s. 417]]</li>
</ul>
  <aside class="fk26-hesap"><b><span aria-hidden="true">☢</span> Uyarı işareti nasıl okunur?</b><p>Bu işaret bir iyonlaştırıcı radyasyon tehlikesini bildirir. [[K6 s. 417]] Maruziyetin dokuda neye yol açabileceğini açıklarken elektron düzenindeki değişiklikten başlayın, kimyasal tepkimeye ve hücrenin işlevini kaybetmesine doğru ilerleyin. [[K6 s. 417]] DNA zincirindeki değişiklik için ayrıca zararlı mutasyon olasılığını belirtin. [[K6 s. 417]]</p></aside>
</section>

<section class="wrap blk ders-sec" id="fk26-tedavi">
  <h2>Radyoterapide hedef</h2>
  <p class="intro">Radyoterapi, malign hücreleri öldürmek veya çoğalamayacak kadar hasara uğratmak için iyonlaştırıcı radyasyondan yararlanır. [[K6 s. 418]]</p>
  <div class="viz"><div class="viz-head"><h3>Demetler nerede kesişir?</h3></div><div data-viz="fk26_tedavi"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Radyasyona maruz kalan sağlıklı ve malign dokuda DNA hasarı oluşabilir. [[K6 s. 418]] Kitap, malign hücrelerin daha duyarlı oluşunu genetik hasarı normal hücreler gibi onaramamalarına bağlar. [[K6 s. 418]] Tedavide yüksek enerjili X-ışınları, elektron demetleri veya radyoaktif izotoplar kullanılabilir. [[K6 s. 418]]</p>
  <ul class="ozet">
    <li><b>Dıştan ışınlama.</b> Farklı açılardan yöneltilen demetler tümörde kesiştiğinde burada çevre dokudan daha yüksek bir doz soğurulur. [[K6 s. 418]] Tedavi genellikle haftalar boyunca günlük seanslar hâlinde verilir; seans sayısı toplam doz dâhil birçok etkene bağlıdır. [[K6 s. 418]]</li>
    <li><b>Sistemik tedavi.</b> Radyoizotop ağızdan verilebilir veya damar içine enjekte edilebilir. [[K6 s. 418]]</li>
    <li><b>Brakiterapi.</b> Kapalı radyoaktif kaynaklar (“tohumlar”) tümör içine ya da tümöre doğrudan temas edecek şekilde yerleştirilir. [[K6 s. 418]]</li>
    <li><b>Kitaptaki doz örnekleri.</b> Solid epitel tümöründe kür için tipik toplam doz 60–80 Gy, lenfomada tedavi dozu 20–40 Gy olarak verilir. [[K6 s. 418]]</li>
  </ul>
<h3>Bir demetin ve bütün demetlerin yolunu ayırın</h3>
<p>Şekilde önce tek yolu seçin: demet hem tümöre hem de o doğrultudaki sağlıklı dokuya ulaşır. [[K6 s. 418]] Sonra farklı açılardan gelen yolları açın ve yalnız bir yol üzerindeki çevre dokuyu, bütün yolların kesiştiği hedefle karşılaştırın. [[K6 s. 418]] Hedefte daha büyük doz elde edilmesinin geometrik nedeni bu kesişmedir. [[K6 s. 418]]</p>
<p>Doz örneğini açıklarken toplam doz ile seans sayısını ayırın: kitap bir tümör grubu için toplam doz aralığı verirken dıştan ışınlamanın günlere yayıldığını ayrıca belirtir. [[K6 s. 418]] Seans sayısı yalnız tümörün adından çıkarılamaz; planlanan toplam doz da hesaba katılır. [[K6 s. 418]]</p>
  <p>Bir hastanın radyoizotop aldığı söylendiğinde uygulamanın amacını sorun: sistemik radyoterapide hedef malign hücreye zarar vermek, sintigrafide ise yayılan ışınları algılayarak görüntü oluşturmaktır. [[K6 s. 418]] [[K6 s. 421]] Brakiterapiyi tarif ederken kaynağın kapalı olduğunu ve tümörün içine ya da doğrudan yüzeyine yerleştirildiğini söylemek, yöntemi hem sistemik uygulamadan hem dıştan ışınlamadan ayırır. [[K6 s. 418]]</p>
</section>

<section class="wrap blk ders-sec" id="fk26-rontgen">
  <h2>X-ışını tüpünden radyografiye</h2>
  <p class="intro">Tüpte hızlandırılan elektron metal hedefe çarpar; hastaya yöneltilen X-ışınlarının dokularda farklı ölçülerde zayıflaması görüntüde kontrast oluşturur. [[K6 s. 419–420]]</p>
  <div class="viz"><div class="viz-head"><h3>Katottan çıkış penceresine</h3></div><div data-viz="fk26_tup"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>X-ışınları, geçtikleri maddede iyonlaşmaya yol açabilen yüksek enerjili elektromanyetik dalgalardır. [[K6 s. 418]]</p>
  <aside class="note plain"><b>Atlas notu.</b> Kitap dalga boyunu (5–10) × 10<sup>−9</sup> m olarak verir; doğrusu, X-ışınları yaklaşık 0,01–10 nm aralığına yayılır ve tanısal X-ışınları bunun kısa (≈0,01–0,1 nm) ucundadır. [[K6 s. 418]]</aside>
  <ul class="ozet">
    <li><b>Elektron kaynağı.</b> Vakum tüpündeki tungsten filamanlı katot ısıtıldığında elektron salar; buna termiyonik emisyon denir. [[K6 s. 419]] Elektrik alanı elektronları pozitif anoda doğru hızlandırır. [[K6 s. 419]]</li>
    <li><b>Frenleme ışınımı.</b> Metalde yavaşlayan elektronun kinetik enerjisinin bir bölümü doğrudan elektromanyetik enerjiye dönüşür; Almanca Bremsstrahlung adı bu frenlemeyi anlatır. [[K6 s. 419]]</li>
    <li><b>Karakteristik X-ışını.</b> Gelen elektron hedef atomdaki bağlı bir elektronu çıkarabilir. [[K6 s. 419]] Boşalan enerji düzeyine daha yüksek düzeyden bir elektron geçtiğinde yayılan fotonun enerjisi ve frekansı hedef metale özgüdür. [[K6 s. 419]]</li>
    <li><b>Hedef ve soğutma.</b> Elektronlarla bombardıman edilen çoğu element X-ışını yayabilir; tungsten yüksek şiddette demet vermesi ve yüksek sıcaklığa dayanması nedeniyle uygundur. [[K6 s. 419]] Eğimli anot demeti incelenecek cisme yöneltir; açığa çıkan ısının uzaklaştırılması gerekir. [[K6 s. 419]]</li>
    <li><b>Zırh, pencere ve filtreler.</b> Kalın kurşun kılıf sızıntıyı sınırlamak için mekanizmayı sarar; dar demet küçük pencereden geçer ve çıkışta bir dizi filtreden süzülür. [[K6 s. 419]]</li>
    <li><b>Zayıflama ve geçiş.</b> Maddenin içinden değişmeden geçen dalga iletilmiştir; maddeyle etkileşerek güç kaybeden demet zayıflamıştır (atenüasyon). [[K6 s. 418–419]] Katıda hem soğurulma hem saçılma zayıflamaya katkı verir. [[K6 s. 418]] Kitap büyük hedefi vurma olasılığının yüksekliği benzetmesini, büyük atomlarla etkileşimi açıklamak için kullanır. [[K6 s. 418]]</li>
    <li><b>Görüntüyü okuma.</b> Kalınlık ve yoğunluk arttıkça demet daha fazla zayıflar; görece kalın ve yoğun kemik radyografide açık görünür. [[K6 s. 420]] Geleneksel yöntemde X-ışınına duyarlı film banyo edilir ve ışıklı panoda incelenir. [[K6 s. 420]] Film ve plakların yerini giderek monitörde görüntü sağlayan dijital alıcılar almıştır; benzer sistemler havaalanında bagaj tarar. [[K6 s. 420]]</li>
    <li><b>Çalışanın korunması.</b> Cihazın kullanımı sıkı biçimde denetlenir ve yeterli eğitim almış personele bırakılır. [[K6 s. 420]] Işınlama alanına yakın bulunması gereken çalışanlara kurşun önlük sağlanır; tiroit koruyucusu ek koruma sunar. [[K6 s. 420]] Bu giysiler ağırdır; daha düşük yoğunluklu kurşun kompozitleri ağırlığı azaltmıştır. [[K6 s. 420]]</li>
  </ul>
<h3>Filmin açık alanından tüpe doğru geri izleyin</h3>
<p>Bir radyografide kemiğin neden açık göründüğü sorulursa önce demetin yolunu düşünün. [[K6 s. 420]] Kemik düzeyinde daha fazla ışın zayıflar, dolayısıyla arkasındaki filme daha az ışın ulaşır ve film bu bölgede açık kalır. [[K6 s. 420]] Aynı malzemenin farklı kalınlıkları da demeti farklı ölçülerde zayıflatır; görüntüdeki tonu açıklarken yalnız yoğunluğu söylemek eksik kalır. [[K6 s. 420]]</p>
<p>Tüp kesitinde iki ayrı yolu izleyin: elektron yolu vakumdaki katottan metal hedefe uzanır, görüntü oluşturan demetin yolu ise hedeften pencereye ve hastaya doğrudur. [[K6 s. 419–420]] Katodun ısıtılması elektron elde etmeye yarar; hedefte oluşan ısının giderilmesi ise tüpün soğutma gereksinimini açıklar. [[K6 s. 419]]</p>
  <h3>Korunma sorusunda cihaz ile çalışanı ayrı düşünün</h3>
  <p>Tüpteki kalın kurşun zırhın görevi, ışınların belirlenmiş çıkış penceresi dışından çevreye sızmasını önlemeye çalışmaktır. [[K6 s. 419]] Pencereden çıkan demet ise hastaya ulaşmak üzere oluşturulmuştur; bu nedenle zırhlı tüp kullanılırken de yakın çevrede çalışması gereken personele koruyucu giysi sağlanır. [[K6 s. 419–420]]</p>
  <p>Önlük ile tiroit koruyucusunu tarif ederken korumanın ağırlıkla ilişkili pratik bedelini de hatırlayın: kurşun giysiler ağırdır ve kitap daha hafif kompozitlerin bu yükü azalttığını belirtir. [[K6 s. 420]]</p>
</section>

<section class="wrap blk ders-sec" id="fk26-spect">
  <h2>Sintigrafi ve SPECT</h2>
  <p class="intro">Sintigrafide hastaya verilen radyofarmasötiğin yaydığı gama ışınları dışarıdan algılanarak görüntü oluşturulur. [[K6 s. 421]]</p>
  <div class="viz"><div class="viz-head"><h3>İzleyicinin dağılımı ne anlatır?</h3></div><div data-viz="fk26_spect"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Gama yayıcı radyoizotop enjekte edilebilir, yutulabilir veya solunabilir. [[K6 s. 421]] Gama kamerası (sintilasyon kamerası veya Anger kamerası) çıkan fotonları algılar. [[K6 s. 421]] Aynı kamera düzlemsel görüntü alabilir veya tomografik kesit elde etmek için kullanılabilir; ikinci yönteme tek foton emisyon bilgisayarlı tomografisi (SPECT) denir. [[K6 s. 421]]</p>
  <ul class="ozet">
    <li><b>Beyin perfüzyonu.</b> Dokuya giren izleyicinin göreli miktarı bölgesel kan akımını yansıtır. [[K6 s. 421]] Sıklıkla kullanılan <sup>99m</sup>Tc-HMPAO’da gama yayıcı teknesyum-99m, heksametilpropilenamin oksime bağlanmıştır. [[K6 s. 421]] HMPAO ile bağlı izleyicinin beyne alınma hızı kan akımıyla orantılıdır. [[K6 s. 421]]</li>
    <li><b>Beyin SPECT’inin kullanımı.</b> Nöroloji ve psikiyatride tanı ve izlem amacıyla kullanılabilir; örnekleri demanslar, epilepsi, kafa travması, neoplaziler ve serebrovasküler hastalıklardır. [[K6 s. 421]]</li>
    <li><b>Miyokart perfüzyonu.</b> İskemik kalp hastalığını araştıran bu işlevsel incelemede teknesyum-99m içeren izleyici enjekte edilir ve egzersiz veya farmakolojik stres (adenozin ya da dobutamin) uygulanır. [[K6 s. 421]] Egzersiz stresinde hastalıklı miyokarda sağlıklı bölgeye göre daha az kan gelir. [[K6 s. 421]] Stres sonrası izleyicinin dağılımı, miyokart bölgelerinin göreli kanlanmasını gösterir. [[K6 s. 421]]</li>
  </ul>
  <aside class="note plain"><b>Atlas notu.</b> Kitap teknesyum-99m’nin yarı ömrünü uzun olarak niteler; doğrusu, yaklaşık 6 saatlik yarı ömrü kısadır. [[K6 s. 421]]</aside>
<h3>Görüntüdeki dağılımdan kan akımına geçin</h3>
<p>Beyin görüntüsünde kameranın doğrudan algıladığı olay izleyiciden gama fotonu çıkmasıdır. [[K6 s. 421]] Kan akımı yorumu bir ara basamağa dayanır: HMPAO’ya bağlı teknesyumun beyin dokusuna alınma hızı o dokunun kanlanmasıyla orantılıdır. [[K6 s. 421]] Bu nedenle iki bölgenin tutulumunu karşılaştırmak, göreli kanlanmalarını değerlendirmeye yardımcı olur. [[K6 s. 421]]</p>
<p>Miyokartta sorulan soru, stres sırasında bölgelerin birbirine göre ne kadar kanlandığıdır. [[K6 s. 421]] Kitapta izleyicinin verilmesini stresin oluşturulması, bunu da SPECT ile dağılımın okunması izler. [[K6 s. 421]] Egzersiz sırasında daha az kanlanan hastalıklı bir alan, çevresindeki miyokartla karşılaştırılarak değerlendirilebilir. [[K6 s. 421]]</p>
</section>

<section class="wrap blk ders-sec" id="fk26-pet">
  <h2>PET ve eşzamanlı algılama</h2>
  <p class="intro">Pozitron emisyon tomografisinde (PET) enjekte edilen izleyicinin bozunmasını, karşı yönlere giden bir foton çifti haber verir. [[K6 s. 421–423]]</p>
  <div class="viz"><div class="viz-head"><h3>Karşılıklı foton çiftini izleyin</h3></div><div data-viz="fk26_pet"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ul class="ozet">
    <li><b>Bozunma ve yok oluş.</b> Çekirdekten yayılan pozitif yüklü pozitron dokudaki bir elektronla karşılaşır. [[K6 s. 422]] Elektron ile karşı parçacığının yok oluşu (anihilasyon), birbirine zıt yönlerde ilerleyen iki gama fotonu oluşturur. [[K6 s. 422–423]]</li>
    <li><b>Koinsidans devresi.</b> Hastayı çevreleyen dedektörlerden ikisi fotonları aynı anda kaydederse devre bu iki sinyali eşleştirir. [[K6 s. 422]] Yok oluş bozunma noktasına çok yakın olduğundan, ortak kökenli çiftlerin algılanması izleyici dağılımının görüntülenmesini sağlar. [[K6 s. 422]]</li>
    <li><b>İşlevsel görüntü.</b> Beyindeki bölgesel kanlanma ve beyin hücrelerinin işaretli şeker alımı değerlendirilebilir; PET, BT veya MR ile giderek daha sık birlikte kullanılır. [[K6 s. 422]]</li>
    <li><b>Glukoz alımı.</b> Sık kullanılan fludeoksiglukoz, yarı ömrü 110 dakika olan flor-18 ile işaretlenmiş biyolojik olarak aktif bir glukoz analoğudur. [[K6 s. 423]] Bölgesel izleyici konsantrasyonu glukoz alımı üzerinden dokunun metabolik etkinliği hakkında fikir verir. [[K6 s. 423]]</li>
  </ul>
<h3>Tek kayıttan çift kayda geçin</h3>
<p>Şekilde merkez yok oluşu, halka hastayı çevreleyen alıcıları gösterir; yönü değiştirdiğinizde iki fotonun doğrultusu birlikte döner. [[K6 s. 422–423]] Tek kayıt seçiliyken ikinci foton da oluşur, ancak yalnız bir sinyal koinsidans devresinde bir çift oluşturamaz. [[K6 s. 422–423]] Eşzamanlı çift seçildiğinde karşılıklı alıcıların ikisi de işaretlenir. [[K6 s. 422]]</p>
<p>SPECT ve PET’i karşılaştırırken önce hastaya verilen maddeyi, sonra dedektörde beklenen olayı söyleyin. [[K6 s. 421–423]] Beyin SPECT’inde verilen izleyicinin gama yayması yeterliyken, PET’te verilen radyonüklidin önce bir pozitron yayması ve bu pozitronun dokuda bir elektronla karşılaşması gerekir. [[K6 s. 421–423]]</p>
  <p>Flor-18 ile işaretli glukoz analoğu örneğinde iki bilgi elde edilir: dedektör kayıtları izleyicinin nerede toplandığını, molekülün biyolojik özelliği ise bu dağılımın hangi işlevi yansıttığını açıklar. [[K6 s. 422–423]] Bu örnekte yorumlanan işlev bölgesel glukoz alımıdır; beyin kanlanmasını değerlendirmek de PET’in kitapta belirtilen ayrı bir kullanım alanıdır. [[K6 s. 422–423]]</p>
</section>

<section class="wrap blk ders-sec" id="fk26-bt">
  <h2>Bilgisayarlı tomografide kesit</h2>
  <p class="intro">Tomografi, bir cismin farklı açılardan elde edilen görünümlerini birleştirerek içinden geçen bir kesiti oluşturur. [[K6 s. 423–424]]</p>
  <div class="viz"><div class="viz-head"><h3>Halkanın iki tarafında hangi parçalar var?</h3></div><div data-viz="fk26_bt"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Bilgisayarlı tomografi (BT, İngilizce CT veya CAT), düzlemsel radyografinin gösteremediği derin yapıları ayrıntılı görüntüleyebilir. [[K6 s. 423]] Çok sayıda görünümü klinikte kullanılabilir bir kesite dönüştürmek yüksek işlem gücü gerektirir; bilgisayarların gelişimi bu gereksinimi büyük ölçüde karşılamıştır. [[K6 s. 423]]</p>
  <ul class="ozet">
    <li><b>Spiral tarama.</b> Hasta masadayken halka ile hasta birbirine göre ilerler; X-ışını tüpü ve karşısındaki dedektör halka üzerinde birlikte döner. [[K6 s. 424]] Sürekli spiral tarama vücudu birkaç saniyede tarayabilir ve radyasyon dozunu sınırlamaya yardımcı olur. [[K6 s. 424]]</li>
    <li><b>Kesitin kurulması.</b> Farklı açılardan alınan sürekli projeksiyon dizisi, geri izdüşüm ve karmaşık hesaplamalarla ekranda izlenen kesitlere dönüştürülür. [[K6 s. 424]] Bu verilerden vücudun iç yapısının üç boyutlu bir gösterimi de oluşturulabilir. [[K6 s. 424]]</li>
    <li><b>Klinik okuma.</b> Düz grafideki gibi kemik ve diğer yoğun yapılar açık tonlardadır. [[K6 s. 424]] Kafa travmasında BT, intrakraniyal kanama veya başka lezyonların yerini ve yaygınlığını gösterebilir. [[K6 s. 424]] Beyin tümörleri ve akciğer gibi başka organlardaki malign tümörler de saptanabilir. [[K6 s. 424]]</li>
  </ul>
<div class="viz"><div class="viz-head"><h3>Halkayı döndürerek projeksiyonu değiştirin</h3></div><div data-viz="fk26_tarama"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Halkanın aynı konumunda kalırsanız şemadaki küçük yapıya yalnız bir doğrultudan bakarsınız. [[K6 s. 423–424]] Tüp ile karşı dedektörü birlikte döndürdüğünüzde ışın aynı kesiti başka bir doğrultudan geçer; hesaplamaya katılacak yeni bir görünüm elde edilir. [[K6 s. 423–424]] Şema tek kesitte yön değişimini gösterir; spiral taramada buna hastanın halka boyunca göreli ilerlemesi de eklenir. [[K6 s. 424]]</p>
<p>Kafa travmasında kesitin klinik değeri, yalnız lezyonun varlığını görmekten öte, kanamanın yerini ve ne kadar alana yayıldığını değerlendirebilmektir. [[K6 s. 424]] Aynı kesitsel görüntüleme ilkesi akciğerdeki malign bir tümörün saptanmasında da kullanılabilir. [[K6 s. 424]]</p>
  <h3>Bir görüntüleme sorusunu kaynak ve alıcıyla çözün</h3>
  <dl class="fk26-yontem">
    <dt>Radyografi</dt><dd>Hastanın bir tarafındaki tüpte üretilen demeti karşı taraftaki film veya dijital alıcı kaydeder; alıcıya ulaşan ışın miktarı araya giren dokuyla değişir. [[K6 s. 419–420]]</dd>
    <dt>BT</dt><dd>Yine hastadan geçen X-ışınları ölçülür; fakat tek bir düzlemsel görünüm yerine farklı doğrultulardan alınan ölçümler bir kesitte birleştirilir. [[K6 s. 423–424]]</dd>
    <dt>SPECT</dt><dd>Kaynağı hastanın içinde arayın: verilmiş olan radyofarmasötik bozunurken çıkan gama ışınlarını kamera kaydeder ve dokudaki göreli dağılım kesitsel olarak görülebilir. [[K6 s. 421]]</dd>
    <dt>PET</dt><dd>Kaynak yine içeridedir, fakat alıcıların eşleştirdiği ışınlar izleyicinin yaydığı pozitron ile dokudaki elektronun karşılaşmasından doğar; iki kayıt birlikte değerlendirilir. [[K6 s. 422–423]]</dd>
  </dl>
</section>

<section class="wrap blk ders-sec" id="fk26-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önermeyi bağımsız değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="fk26-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk26-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk26-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk26-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><h3>Açılış sorusu</h3>
  <p>Kafa travması olan bir hasta BT’ye alınıyor. Dedektöre ulaşan sinyal nerede doğar, bir kesit nasıl elde edilir ve kanama açısından ne ararsınız?</p></div>
  <h3>Cevap iskeleti</h3>
  <ol class="iskelet">
    <li>Isıtılan katot elektron salar; elektrik alanıyla hızlanan elektronlar metal anoda çarptığında X-ışınları oluşur. [[K6 s. 419]]</li>
    <li>Demet hastadan geçerken kalınlık ve yoğunluğa bağlı olarak zayıflar; BT dedektörü tüpün karşısında yer alır. [[K6 s. 420]] [[K6 s. 424]]</li>
    <li>Halka üzerindeki tüp ve dedektör birlikte dönerken hasta halkanın içinden geçer ve sürekli spiral tarama elde edilir. [[K6 s. 424]]</li>
    <li>Farklı açılardan alınan projeksiyonlar bilgisayarda kesitlere dönüştürülür; yoğun kemik açık tonda izlenir. [[K6 s. 424]]</li>
    <li>Kesitlerde intrakraniyal kanamanın yerini, yaygınlığını ve eşlik eden diğer lezyonları değerlendiririm. [[K6 s. 424]]</li>
  </ol>
  <aside class="fk26-hesap"><b>Çizin.</b> Halkaya tüpü ve karşı dedektörü yerleştirin; ışının hastadan geçişini, çiftin dönme yönünü ve masanın ilerlemesini işaretleyin. [[K6 s. 424]]</aside>
  <h3>Ek sorular</h3><ul class="ozet">
    <li>Personeli nasıl korursunuz? Kurşun önlük ile tiroit koruyucusunun yerini açıklayın. [[K6 s. 420]]</li>
    <li>SPECT ve PET’te hastadan çıkan hangi sinyaller algılanır? Koinsidans devresinin işlevini açıklayın. [[K6 s. 421–423]]</li>
    <li>Bir tedavi dozunu Gy, bir eşdeğer dozu Sv ile ifade ederken hangi farkı gözetirsiniz? [[K6 s. 417]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="fk26-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Kararsız çekirdek parçacık veya elektromanyetik ışınım yayabilir; yarı ömür her geçtiğinde kalan çekirdek sayısı yeniden yarıya iner. [[K6 s. 412]] [[K6 s. 415–416]]</li>
    <li>İyonlaşma DNA’ya zarar verebilir; radyoterapi bu etkiyi tümöre yöneltir. [[K6 s. 417–418]]</li>
    <li>Radyografi ve BT’de dokudan geçen X-ışınları ölçülür; BT farklı açılardaki verilerden kesit oluşturur. [[K6 s. 419–420]] [[K6 s. 423–424]]</li>
    <li>SPECT izleyiciden çıkan tek gama fotonlarını, PET ise pozitron ile elektronun yok oluşunda doğan foton çiftlerini algılar. [[K6 s. 421–423]]</li>
  </ul>
  <div data-viz="tamam" data-modul="fizik" data-bolum="26"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/25">← Manyetik rezonans görüntüleme</a><a href="#/dersler/fizik/27">Sonraki: Temel matematik kavramlar: fonksiyonlar, kalkülüs, üstel büyüme ve azalma →</a></nav>
</section>`
};
