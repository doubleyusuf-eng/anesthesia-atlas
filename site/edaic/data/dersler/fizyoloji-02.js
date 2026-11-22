/* ---------- Bölüm 2 · Hücrenin bileşenleri ve işlevi (K1 s. 6–8) ----------
   Metin, sorular ve animasyonlar bu atlas için yazılmıştır; kitaptan metin ya da şekil kopyalanmaz.
   Kitapta olmayan kısa açıklamalar ve kitaptaki düzeltmeler "Atlas notu" olarak işaretlidir. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz02-1'] = {
  no: 1, kok: 'Hücre çekirdeği için:', kagit: 'Paper A · fizyoloji, Bölüm 2', kaynak: '[[K1 s. 7]]',
  onermeler: [
    { t: 'Olgun eritrositler çekirdek içermez.', d: true, n: 'Doğru. Vücut hücrelerinin hemen hepsi tek çekirdeklidir; olgun eritrositler bu kuralın çekirdeksiz istisnasıdır. [[K1 s. 7]]' },
    { t: 'İskelet kası hücreleri tek çekirdeklidir.', d: false, n: 'Yanlış. İskelet kası hücreleri çok çekirdeklidir. Kaynaşmış makrofajların oluşturduğu dev hücreler de çok çekirdeklidir. [[K1 s. 7]]' },
    { t: 'Çekirdek zarfı tek katlı bir zardır.', d: false, n: 'Yanlış. Çekirdek zarfı çift katlıdır; üzerindeki çekirdek porları seçilmiş moleküllerin kontrollü geçişine izin verir. [[K1 s. 7]]' },
    { t: 'Büyük miktarda protein sentezleyen hücrelerde çekirdekçikler daha bol bulunur.', d: true, n: 'Doğru. Çekirdekçik, çekirdeğin RNA sentezlenen ve yoğun boyanan bölgesidir; çok protein sentezleyen hücrelerde daha bol bulunur. [[K1 s. 7]] Atlas notu: bu hücrelerde çekirdekçik özellikle büyük ve belirgindir.' },
    { t: "Çekirdekte, DNA'nın transkripsiyonuyla mRNA sentezlenir.", d: true, n: "Doğru. Çekirdek, DNA'nın transkripsiyonuyla mRNA'nın sentezlendiği yerdir; hücrenin etkinliklerini bu yolla yönetir. [[K1 s. 7]] Atlas notu: mtDNA'nın kodladığı az sayıdaki proteinin mRNA'sı ise mitokondride sentezlenir." },
  ],
};
VERI.sorular['fiz02-2'] = {
  no: 2, kok: 'Mitokondri için:', kagit: 'Paper A · fizyoloji, Bölüm 2', kaynak: '[[K1 s. 7]]',
  onermeler: [
    { t: 'Sitrik asit döngüsü zarlar arası boşlukta gerçekleşir.', d: false, n: "Yanlış. Sitrik asit döngüsü iç zarla çevrili matrikste yürür; kitap yağ asidi metabolizmasını ve üre döngüsünü de matriks süreçleri arasında sayar. Zarlar arası boşluk, ETZ'nin H⁺ pompaladığı bölmedir. [[K1 s. 7]]" },
    { t: 'Olgun eritrositlerde mitokondri bulunur.', d: false, n: "Yanlış. Mitokondriler hemen bütün hücrelerde bulunur; kitabın verdiği istisna, ATP'sini yalnızca glikolizle sağlayan olgun eritrositlerdir. [[K1 s. 7]]" },
    { t: 'Elektron taşıma zinciri iç mitokondri zarında bulunur.', d: true, n: 'Doğru. İç zara bağlı proteinler redoks tepkimelerine girer ve sonuçta ATP sentezlenir. [[K1 s. 7]]' },
    { t: "Dış mitokondri zarındaki porinlerden pirüvat gibi 5 kDa'dan küçük moleküller serbestçe difüze olur.", d: true, n: "Doğru. Porinler ortasında por bulunan transmembran proteinlerdir; pirüvat, amino asitler ve kısa zincirli yağ asitleri gibi 5 kDa'dan küçük çözünmüş maddeleri serbestçe geçirir. [[K1 s. 7]]" },
    { t: 'Uzun zincirli yağ asitleri mitokondriye karnitin mekiği olmadan girebilir.', d: false, n: 'Yanlış. Uzun zincirli yağ asitleri porinlerden serbestçe difüze olamaz; mitokondriye girmeleri için karnitin mekiği gerekir. [[K1 s. 7]] Bölüm 77\'deki şekle göre mekiğin geçirdiği asıl engel iç zardır. [[K1 s. 379]]' },
  ],
};
VERI.sorular['fiz02-3'] = {
  no: 3, kok: 'Endoplazmik retikulum (ER), Golgi aygıtı ve lizozomlar için:', kagit: 'Paper A · fizyoloji, Bölüm 2', kaynak: '[[K1 s. 8]]',
  onermeler: [
    { t: "Sarkoplazmik retikulum, kas hücrelerinde granüllü ER'nin aldığı addır.", d: false, n: "Yanlış. Kas hücrelerinde sarkoplazmik retikulum adını alan düz ER'dir; zar depolarizasyonunun ardından Ca²⁺ salan hücre içi Ca²⁺ deposudur. [[K1 s. 8]]" },
    { t: "Granüllü ER'nin granüllü görünümü ribozomlardan kaynaklanır.", d: true, n: "Doğru. Granüllü (pürüzlü) görünümü, amino asitlerin sırayla birleştirilip yeni proteinin kurulduğu ribozomlar verir. [[K1 s. 8]]" },
    { t: 'Adrenal korteks hücrelerinde düz ER özellikle boldur.', d: true, n: 'Doğru. Düz ER steroit ve lipit sentezinin yeridir; adrenal korteks gibi steroit hormon üreten hücrelerde özellikle boldur. [[K1 s. 8]]' },
    { t: 'Golgi aygıtında proteine fosfat grubu eklenmesine glikozilasyon denir.', d: false, n: 'Yanlış. Fosfat grubu eklenmesi fosforilasyondur; glikozilasyon karbonhidrat grubu eklenmesidir. [[K1 s. 8]]' },
    { t: 'Lizozomlar makrofaj ve nötrofillerde özellikle yaygındır.', d: true, n: 'Doğru. Lizozomlar fagositik hücrelerde (makrofaj ve nötrofil) özellikle yaygındır; sindirim enzimleri, asit ve serbest radikallerle fagosite edilen mikroorganizmaları yok eder. [[K1 s. 8]]' },
  ],
};

const D02_NAV = [['d02-plan', 'Temel plan'], ['d02-zar', 'Hücre zarı'], ['d02-cekirdek', 'Çekirdek'], ['d02-mito', 'Mitokondri'], ['d02-er', 'ER ve Golgi'], ['d02-lizozom', 'Lizozomlar'], ['d02-tip', 'Hücre tipleri'], ['d02-p1', 'Part I'], ['d02-p2', 'Part II'], ['d02-ozet', 'Özet']];

SAYFALAR['dersler/fizyoloji/02'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 1 · Temel bilgiler · Bölüm 2', baslik: 'Hücrenin bileşenleri ve işlevi',
  lede: 'Hücreler farklı işler için özelleşir ama planları ortaktır: bir zar, bir çekirdek ve organellerle dolu bir sitoplazma. Bu bölüm o planı ve her organelin ne iş yaptığını anlatır. [[K1 s. 6–8]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D02_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d02-plan">
  <h2>Hücrenin temel planı: zar, çekirdek, sitoplazma</h2>
  <p class="intro">Hücreler farklı işlere özelleşse de hepsi aynı üç parçalı planı paylaşır: hücre yüzey zarı, çekirdek ve sitoplazma. [[K1 s. 6–7]]</p>
  <div class="viz"><div data-viz="f02_hucre"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p><b>Zar</b> hücre içini hücre dışı sıvıdan (ECF) ayırır; <b>çekirdek</b> genetik materyali taşır. <b>Sitoplazma</b> hücre içinin çekirdek dışında kalan kısmıdır: jel kıvamındaki <b>sitozol</b>, hücreye biçim ve destek veren protein çatısı <b>hücre iskeleti</b> ve <b>organeller</b>. [[K1 s. 6–7]]</p>
    <p><b>Organel</b> ("küçük organ"), hücrenin kalıcı, özelleşmiş ve çoğunlukla kendi fosfolipit çift tabakalı zarıyla çevrili işlevsel birimidir; organın vücuttaki yeri neyse organelin hücredeki yeri odur. Hücrelerin çoğunda mitokondri, endoplazmik retikulum, Golgi aygıtı ve lizozom bulunur. [[K1 s. 7–8]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitabın Şekil 2.1'inde salgı veziküllerinin yanındaki "Lysozyme" etiketi <b>lizozom</b> (lysosome) olmalıdır; lizozim bir organel değil, bakteri duvarını parçalayan bir enzimdir. Aynı şekildeki "Christae" de krista (cristae) diye okunmalıdır. [[K1 s. 6]]</div>
</section>

<section class="wrap blk ders-sec" id="d02-zar">
  <h2>Hücre zarı: seçici bir engel</h2>
  <p class="intro">Hücre zarı hidrofilik maddeleri durduran, küçük ve lipofilik molekülleri geçiren seçici bir engeldir. [[K1 s. 6]]</p>
  <div class="viz"><div data-viz="f02_zar"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Zar, glikoproteinlerin denizdeki buzdağları gibi gömülü olduğu bir fosfolipit çift tabakadır. Yüklü fosfatlı başlar hidrofiliktir ve iki yüzde kararlı bir lipit–su ara yüzü kurar; ortadaki lipit kuyrukları hidrofilik maddelere hidrofobik bir engel oluşturur. [[K1 s. 6]]</p>
    <p>Zarın en önemli işi ECF ile hücre içi sıvı (ICF) arasındaki madde geçişine aracılık edip onu düzenlemektir. Küçük, gaz hâlindeki ve lipofilik maddeler lipit tabakadan düzenlenmeden geçer; büyük moleküller ya da yüklü parçacıklar çoğunlukla kanal ya da taşıyıcı olarak çalışan glikoproteinlere gerek duyar (Bölüm 4). [[K1 s. 6]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d02-cekirdek">
  <h2>Çekirdek: hücrenin kontrol merkezi</h2>
  <p class="intro">Çekirdek, hücrenin DNA'sının çoğunu taşır ve gen, dolayısıyla protein ekspresyonu yoluyla organellerin işini yönetir. [[K1 s. 7]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Çekirdeğin yapısı ve hücre başına çekirdek sayısı</h3></div>
    <div data-viz="f02_cekirdek"></div>
    <p class="viz-cap" aria-live="polite">Bir parçaya basın. Alt sırada tek, çekirdeksiz ve çok çekirdekli hücreler. [[K1 s. 7]]</p>
    <p class="viz-foot">Şematik çizim; boyutlar ölçekli değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Çekirdek genellikle sitoplazmanın ortasında küresel bir yapıdır. Çift katlı <b>çekirdek zarfı</b> onu sitoplazmadan ayırır; zarftaki <b>çekirdek porları</b>, hücre yüzey zarında olduğu gibi, seçilmiş moleküllerin nükleoplazmaya kontrollü geçişine izin verir. <b>Nükleoplazma</b> DNA'yı saran jeldir (sitoplazmanın çekirdekteki karşılığı). <b>Çekirdekçik</b> RNA'nın sentezlendiği, yoğun boyanan bölgedir; çok protein sentezleyen hücrelerde daha boldur. [[K1 s. 7]]</p>
    <p>DNA bireyin "genetik kodunu", yani bütün vücut proteinlerinin planını taşır; mRNA çekirdekte DNA'nın transkripsiyonuyla sentezlenir (Bölüm 3). Vücut hücrelerinin hemen hepsi tek çekirdeklidir; istisnalar çekirdeksiz olgun eritrosit ile çok çekirdekli iskelet kası hücresi ve kaynaşmış makrofajların oluşturduğu dev hücrelerdir. [[K1 s. 6–7]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d02-mito">
  <h2>Mitokondri: iki zar, iki bölme</h2>
  <p class="intro">Mitokondri aerobik metabolizmayla ATP üreten "hücrenin enerji santrali"dir; alışılmadık biçimde iki zarı ve bunların ayırdığı, her biri ayrı işli iki bölmesi vardır. [[K1 s. 7]]</p>
  <div class="viz"><div data-viz="f02_mito"></div></div>
  <div class="tbl-wrap" style="margin-top:14px"><table class="tbl">
    <thead><tr><th>Bileşen</th><th>Ne olur?</th></tr></thead>
    <tbody>
      <tr><th>Dış zar</th><td>Fosfolipit çift tabaka; porin denen por içeren transmembran proteinlerden 5 kDa'dan küçük maddeler (pirüvat, amino asitler, kısa zincirli yağ asitleri) serbestçe difüze olur. Uzun zincirli yağ asitleri karnitin mekiği ister (Bölüm 77). [[K1 s. 7]]</td></tr>
      <tr><th>Zarlar arası boşluk</th><td>Elektron taşıma zincirinin (ETZ) protein kompleksleri H⁺'yı buraya pompalar; oluşan elektrokimyasal gradyan ATP sentezinde kullanılır. [[K1 s. 7]]</td></tr>
      <tr><th>İç zar</th><td>ETZ'nin yeri: zara bağlı proteinler redoks tepkimelerine girer, sonuç ATP sentezidir. [[K1 s. 7]]</td></tr>
      <tr><th>Matriks</th><td>İç zarla çevrili, çok sayıda enzimli alan: sitrik asit döngüsü, yağ asidi metabolizması, üre döngüsü. [[K1 s. 7]]</td></tr>
    </tbody>
  </table></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Mitokondri elips biçimlidir; kırmızı iskelet kası gibi metabolik olarak çok etkin hücrelerde daha büyük ve daha çoktur. Her hücre ATP'ye muhtaç olduğundan hemen her hücrede bulunur; istisna ATP'sini yalnız glikolizden alan olgun eritrosittir. [[K1 s. 7]]</p>
    <p>Mitokondrinin az miktarda kendi DNA'sı vardır; bu, evrimde büyük hücrelere katılmadan önce bağımsız bir mikroorganizma olabileceğini düşündürür. Sitoplazma, dolayısıyla mitokondri, yalnız anneden gelir; mitokondriyal hastalıkların anneden kalıtılması bu yüzdendir. [[K1 s. 7–8]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Karnitin mekiğinin aştığı asıl engel iç zardır (Bölüm 77'deki şekil [[K1 s. 379]]). Matriksteki yağ asidi süreci β-oksidasyondur (sentez sitozoldedir); üre döngüsünün de yalnız ilk iki adımı matrikste, kalanı sitozolde yürür.</div>
</section>

<section class="wrap blk ders-sec" id="d02-er">
  <h2>Endoplazmik retikulum ve Golgi: üretim ve dağıtım hattı</h2>
  <p class="intro">Endoplazmik retikulum (ER) protein ve lipit üretir; Golgi aygıtı proteinleri değiştirip paketler ve yollar. [[K1 s. 8]]</p>
  <div class="viz"><div data-viz="f02_salgi"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>ER, sitozolün büyük kısmını kaplayan geniş bir vezikül ve tübül ağıdır (adı buradan gelir); birbirine bağlı iki tipi vardır. [[K1 s. 8]]</p>
  </div>
  <div class="cols" style="margin:12px 0 14px">
    <div class="card clin"><span class="tag clin">Protein</span><h3>Granüllü (pürüzlü) ER</h3><p>Protein sentezinin yeri. Granüllü görünümü, amino asitlerin sırayla birleştirildiği ribozomlardan gelir; sentez proteinin üç boyutlu yapısına katlanmasıyla biter. Endokrin hücrelerde ve antikor üreten plazma hücrelerinde belirgindir. [[K1 s. 8]]</p></div>
    <div class="card"><span class="tag ok">Steroit · lipit · Ca²⁺</span><h3>Düz ER</h3><p>Ribozomsuz olduğu için düz görünür; steroit ve lipit sentezinin yeridir, adrenal korteks gibi steroit hormon üreten hücrelerde boldur. Kasta adı <b>sarkoplazmik retikulumdur</b>: hücre zarı depolarize olunca Ca²⁺ salan hücre içi Ca²⁺ deposu. [[K1 s. 8]]</p></div>
  </div>
  <div class="blk-body">
    <p><b>Golgi aygıtı</b>, ER'nin yanında üst üste dizilmiş tübüllerdir ve hücrenin "postanesi" gibi çalışır: ER'den gelen proteine karbonhidrat (<b>glikozilasyon</b>) ya da fosfat (<b>fosforilasyon</b>) ekler, proteini varış yerine göre ayırıp etiketli veziküllere paketler. Veziküller hücrenin başka bölümlerine ya da hücre zarına gider; zarda içeriklerini dışarı vermelerine <b>ekzositoz</b> denir. [[K1 s. 8]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d02-lizozom">
  <h2>Lizozomlar: hücrenin sindirim ve temizlik birimi</h2>
  <p class="intro">Lizozomlar sindirim enzimleri, asit ve serbest radikal türleriyle dolu, hücrenin yıkım birimleridir. [[K1 s. 8]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Bir lizozom ve üç işi</h3></div>
    <div data-viz="f02_lizozom"></div>
    <p class="viz-cap" aria-live="polite">Bir işe basın: lizozomun neyi, nasıl parçaladığı görünür. [[K1 s. 8]]</p>
    <p class="viz-foot">Şematik çizim.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Lizozomlar bütün hücrelerde bulunur ama fagositik hücrelerde, yani makrofaj ve nötrofillerde özellikle çoktur. Üç işleri vardır: hücre bakımı (eski, bozuk ya da artık gereksiz proteinleri parçalamak), programlanmış hücre ölümü (apoptoz) ve fagosite edilen mikroorganizmaları yok etmek. [[K1 s. 8]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Olgun eritrositte lizozom dahil zarla çevrili hiçbir organel yoktur. Fagosite edilen mikroorganizmayı içeren vezikül (fagozom) bir lizozomla birleşerek fagolizozomu oluşturur; sindirim burada olur.</div>
</section>

<section class="wrap blk ders-sec" id="d02-tip">
  <h2>Yapı işlevi izler: hücre tiplerinin organel donanımı</h2>
  <p class="intro">Bir hücre hangi işi çok yapıyorsa o işin organeli belirginleşir; kitabın örnek verdiği hücreleri seçip karşılaştırın. [[K1 s. 7–8]]</p>
  <div class="viz"><div data-viz="f02_tip"></div></div>
</section>

<section class="wrap blk ders-sec" id="d02-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölümün MTF'ye uygun konuları "nerede olur?" ve "hangi hücrede?" türünden ayrıntılardır: hangi süreç mitokondrinin hangi bölmesinde yürür, hangi organel hangi hücrede belirgindir, hangi hücreler çekirdeksiz ya da çok çekirdeklidir, Golgi proteine ne yapar. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz02-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz02-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz02-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d02-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Tipik bir hücreyi çizerek bileşenlerini anlatın. Mitokondrinin yapısı işlevini nasıl destekler?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Ortak plan.</b> Hücreler özelleşir ama planları ortaktır: hücre yüzey zarı, çekirdek ve sitoplazma (sitozol, hücre iskeleti, organeller). [[K1 s. 6–7]]</li>
    <li><b>Hücre zarı.</b> Glikoproteinlerin gömülü olduğu fosfolipit çift tabaka; hidrofilik başlar dışa, hidrofobik kuyruklar içe. Küçük, gaz ve lipofilik maddeler düzenlenmeden geçer; büyük ya da yüklü olanlar çoğunlukla kanal ya da taşıyıcı ister. [[K1 s. 6]] [[K1 s. 13]]</li>
    <li><b>Çekirdek.</b> Çift katlı zarf ve porlar, nükleoplazma, çekirdekçik; mRNA transkripsiyonla burada sentezlenir. Tek çekirdek kuralı ve istisnaları: eritrosit, iskelet kası, dev hücre. [[K1 s. 7]]</li>
    <li><b>Mitokondri, çizerek.</b> Dış zar (porinler, 5 kDa'dan küçük moleküller; uzun zincirli yağ asitleri için karnitin mekiği), zarlar arası boşluk (H⁺ birikir), iç zar (ETZ, redoks), matriks (sitrik asit döngüsü, yağ asidi metabolizması, üre döngüsü). [[K1 s. 7]]</li>
    <li><b>Yapı–işlev bağı.</b> İç zardaki ETZ'nin H⁺'yı zarlar arası boşluğa pompalamasıyla kurulan elektrokimyasal gradyan ATP sentezini besler; metabolik olarak etkin hücrelerde mitokondri büyük ve çoktur. Mitokondriyal DNA anneden gelir; olgun eritrositte mitokondri yoktur, ATP yalnız glikolizden. [[K1 s. 7–8]]</li>
    <li><b>Öteki organeller.</b> Granüllü ER protein, düz ER steroit ve lipit (kasta sarkoplazmik retikulum, Ca²⁺ deposu); Golgi glikozilasyon, fosforilasyon, paketleme, ekzositoz; lizozomlar hücre bakımı, apoptoz, fagosite mikroorganizmalar. [[K1 s. 8]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada iki çizim yeter: zarı, çekirdeği ve başlıca organelleriyle bir hücre; yanına dört bileşeni etiketli bir mitokondri kesiti.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Hangi maddeler hücre zarını serbestçe geçer, hangileri protein ister? Eritrosit ATP'yi nasıl üretir? Mitokondriyal hastalıklar nasıl kalıtılır? Golgi aygıtı proteine ne yapar? Sarkoplazmik retikulum nedir? Cevapların hepsi yukarıda. [[K1 s. 6–8]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d02-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Her hücrede üç ana bölüm vardır: hücre yüzey zarı, çekirdek ve sitoplazma (sitozol, hücre iskeleti, organeller). [[K1 s. 6–7]]</li>
    <li>Zar, glikoproteinli bir fosfolipit çift tabakadır: küçük, gaz ve lipofilik maddeler düzenlenmeden geçer; büyük ya da yüklü olanlar çoğunlukla kanal ya da taşıyıcı glikoprotein ister. [[K1 s. 6]]</li>
    <li>Çekirdek: çift katlı zarf ve porlar, nükleoplazma, çekirdekçik; mRNA burada sentezlenir. Eritrosit çekirdeksiz; iskelet kası ve kaynaşmış makrofajlar çok çekirdekli. [[K1 s. 7]]</li>
    <li>Mitokondri: dış zar (porinler, 5 kDa'dan küçük moleküller), zarlar arası boşluk (H⁺ birikir), iç zar (ETZ), matriks (sitrik asit döngüsü, yağ asidi metabolizması, üre döngüsü). [[K1 s. 7]]</li>
    <li>Mitokondrinin kendi DNA'sı vardır ve anneden gelir; olgun eritrositte mitokondri yoktur, ATP yalnız glikolizden. [[K1 s. 7–8]]</li>
    <li>Granüllü ER protein (plazma ve endokrin hücreler), düz ER steroit ve lipit (adrenal korteks) üretir; kasta düz ER sarkoplazmik retikulumdur. [[K1 s. 8]]</li>
    <li>Golgi: glikozilasyon, fosforilasyon, ayırma, etiketli veziküller ve ekzositoz. Lizozom: hücre bakımı, apoptoz ve fagosite mikroorganizmaların yok edilmesi; fagositlerde çok. [[K1 s. 8]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="2"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/01">← Bölüm 1 · Vücudun genel organizasyonu</a>
    <a href="#/dersler/fizyoloji/03">Sonraki: Bölüm 3 · Genetik →</a>
  </nav>
</section>`,
};
