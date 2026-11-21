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
    { t: 'Elektron taşıma zinciri iç mitokondri zarında bulunur.', d: true, n: 'Doğru. İç zara bağlı proteinler redoks tepkimelerine girer ve sonuçta ATP sentezlenir. [[K1 s. 7]]' },
    { t: 'Sitrik asit döngüsü zarlar arası boşlukta gerçekleşir.', d: false, n: "Yanlış. Sitrik asit döngüsü iç zarla çevrili matrikste yürür; kitap yağ asidi metabolizmasını ve üre döngüsünü de matriks süreçleri arasında sayar. Zarlar arası boşluk, ETZ'nin H⁺ pompaladığı bölmedir. [[K1 s. 7]]" },
    { t: 'Olgun eritrositlerde mitokondri bulunur.', d: false, n: "Yanlış. Mitokondriler hemen bütün hücrelerde bulunur; kitabın verdiği istisna, ATP'sini yalnızca glikolizle sağlayan olgun eritrositlerdir. [[K1 s. 7]]" },
    { t: "Dış mitokondri zarındaki porinlerden pirüvat gibi 5 kDa'dan küçük moleküller serbestçe difüze olur.", d: true, n: "Doğru. Porinler ortasında por bulunan transmembran proteinlerdir; pirüvat, amino asitler ve kısa zincirli yağ asitleri gibi 5 kDa'dan küçük çözünmüş maddeleri serbestçe geçirir. [[K1 s. 7]]" },
    { t: 'Uzun zincirli yağ asitleri mitokondriye karnitin mekiği olmadan girebilir.', d: false, n: 'Yanlış. Uzun zincirli yağ asitleri porinlerden serbestçe difüze olamaz; mitokondriye girmeleri için karnitin mekiği gerekir. [[K1 s. 7]] Bölüm 77\'deki şekle göre mekiğin geçirdiği asıl engel iç zardır. [[K1 s. 379]]' },
  ],
};
VERI.sorular['fiz02-3'] = {
  no: 3, kok: 'Endoplazmik retikulum (ER), Golgi aygıtı ve lizozomlar için:', kagit: 'Paper A · fizyoloji, Bölüm 2', kaynak: '[[K1 s. 8]]',
  onermeler: [
    { t: "Granüllü ER'nin granüllü görünümü ribozomlardan kaynaklanır.", d: true, n: "Doğru. Granüllü (pürüzlü) görünümü, amino asitlerin sırayla birleştirilip yeni proteinin kurulduğu ribozomlar verir. [[K1 s. 8]]" },
    { t: 'Adrenal korteks hücrelerinde düz ER özellikle boldur.', d: true, n: 'Doğru. Düz ER steroit ve lipit sentezinin yeridir; adrenal korteks gibi steroit hormon üreten hücrelerde özellikle boldur. [[K1 s. 8]]' },
    { t: "Sarkoplazmik retikulum, kas hücrelerinde granüllü ER'nin aldığı addır.", d: false, n: "Yanlış. Kas hücrelerinde sarkoplazmik retikulum adını alan düz ER'dir; zar depolarizasyonunun ardından Ca²⁺ salan hücre içi Ca²⁺ deposudur. [[K1 s. 8]]" },
    { t: 'Golgi aygıtında proteine fosfat grubu eklenmesine glikozilasyon denir.', d: false, n: 'Yanlış. Fosfat grubu eklenmesi fosforilasyondur; glikozilasyon karbonhidrat grubu eklenmesidir. [[K1 s. 8]]' },
    { t: 'Lizozomlar makrofaj ve nötrofillerde özellikle yaygındır.', d: true, n: 'Doğru. Lizozomlar fagositik hücrelerde (makrofaj ve nötrofil) özellikle yaygındır; sindirim enzimleri, asit ve serbest radikallerle fagosite edilen mikroorganizmaları yok eder. [[K1 s. 8]]' },
  ],
};

const D2_NAV = [['d02-plan', 'Temel plan'], ['d02-zar', 'Hücre zarı'], ['d02-cekirdek', 'Çekirdek'], ['d02-mito', 'Mitokondri'], ['d02-er', 'ER ve Golgi'], ['d02-lizozom', 'Lizozomlar'], ['d02-tip', 'Hücre tipleri'], ['d02-klinik', 'Klinik bağlantılar'], ['d02-p1', 'Part I'], ['d02-p2', 'Part II'], ['d02-ozet', 'Özet']];

SAYFALAR['dersler/fizyoloji/02'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 1 · Temel bilgiler · Bölüm 2', baslik: 'Hücrenin bileşenleri ve işlevi',
  lede: 'Hücreler farklı işler için özelleşir ama planları ortaktır: bir zar, bir çekirdek ve organellerle dolu bir sitoplazma. Bu bölüm o planı ve her organelin ne iş yaptığını anlatır. [[K1 s. 6–8]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D2_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d02-plan">
  <h2>Hücrenin temel planı: zar, çekirdek, sitoplazma</h2>
  <p class="intro">Her hücrenin kendine özgü işleri vardır, ama birçok yapısal özellik bütün hücrelerde ortaktır. Her hücre üç ana bölümden oluşur: hücreyi hücre dışı sıvıdan (ECF) ayıran <b>hücre yüzey zarı</b>, genetik materyali taşıyan <b>çekirdek</b> ve hücre içinin çekirdek dışında kalan kısmı olan <b>sitoplazma</b>. [[K1 s. 6–7]]</p>
  <div class="cols cols-3" style="margin-bottom:14px">
    <div class="card"><span class="tag gold">Sınır</span><h3>Hücre yüzey zarı</h3><p>İçine glikoproteinlerin yerleştiği bir fosfolipit çift tabaka. En önemli görevi ECF ile hücre içi sıvı (ICF) arasındaki madde geçişine aracılık etmek ve bunu düzenlemektir. [[K1 s. 6]]</p></div>
    <div class="card"><span class="tag basic">Yönetim</span><h3>Çekirdek</h3><p>Deoksiribonükleik asidin (DNA) bulunduğu yer. DNA'dan transkripsiyonla haberci RNA (mRNA) burada sentezlenir; çekirdek hücrenin etkinliklerini bu yolla yönetir. [[K1 s. 6–7]]</p></div>
    <div class="card"><span class="tag">Hücre içi</span><h3>Sitoplazma</h3><p>Üç bileşeni vardır: jel kıvamındaki <b>sitozol</b>, hücreye biçim ve destek veren protein çatısı olan <b>hücre iskeleti</b> ve her biri belirli bir iş yapan küçük, ayrı yapılar olan <b>organeller</b>. [[K1 s. 7]]</p></div>
  </div>
  <div class="blk-body">
    <p><b>Organel</b> (sözcük anlamıyla "küçük organ"), hücrenin kalıcı ve özelleşmiş bir bileşenidir; çoğu kendi fosfolipit çift tabakalı zarıyla çevrilidir. Organın vücuttaki yeri neyse organelin hücredeki yeri odur: hücre içinde işlevsel bir birim. Hücrelerin çoğunda bulunan başlıca organeller mitokondriler, endoplazmik retikulum, Golgi aygıtı ve lizozomlardır. [[K1 s. 7–8]]</p>
  </div>
  <div class="viz" style="margin-top:16px"><div data-viz="f02_hucre"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitaptaki hücre şemasında (Şekil 2.1) salgı veziküllerinin yanındaki yapı "Lysozyme" diye etiketlenmiştir; doğrusu <b>lizozom</b> (lysosome) olmalıdır. Lizozim (lysozyme) bir organel değil, bakteri hücre duvarını parçalayan bir enzimdir; gözyaşında, tükürükte ve nötrofil granüllerinde bulunur. Aynı şekildeki "Christae" de "cristae" (krista) diye okunmalıdır. [[K1 s. 6]]</div>
</section>

<section class="wrap blk ders-sec" id="d02-zar">
  <h2>Hücre zarı: seçici bir engel</h2>
  <div class="blk-body">
    <p>Zarın iskeleti fosfolipit çift tabakadır. Fosfolipitlerin fosfat içeren yüklü başları hidrofiliktir ve suya döner; böylece zarın iki yüzünde kararlı bir lipit–su ara yüzü oluşur. Lipit kuyrukları ise tabakanın ortasında toplanır ve hidrofilik maddelerin geçemediği hidrofobik bir engel kurar. Glikoproteinler bu lipit tabakanın içine gömülüdür; kitap onları denizde yüzen buzdağlarına benzetir. [[K1 s. 6]] [[K1 s. 13]]</p>
    <p>Zarın en önemli işi ECF ile ICF arasındaki geçişi düzenlemektir. Küçük, gaz hâlindeki ve lipofilik maddeler (ör. O₂, CO₂, steroit hormonlar) lipit tabakadan düzenlenmeden, kendi gradyanları yönünde geçer. Büyük ya da yüklü hidrofilik maddelerin (ör. elektrolitler, glukoz) geçişi ise çoğunlukla kanal ya da taşıyıcı olarak çalışan glikoproteinlere bağlıdır. Taşıma biçimlerinin ayrıntısı Bölüm 4'tedir. [[K1 s. 6]] [[K1 s. 14–15]]</p>
  </div>
  <div class="viz" style="margin-top:16px"><div data-viz="f02_zar"></div></div>
</section>

<section class="wrap blk ders-sec" id="d02-cekirdek">
  <h2>Çekirdek: hücrenin kontrol merkezi</h2>
  <p class="intro">Hücrenin genetik materyalinin çoğu çekirdekte DNA olarak bulunur. Çekirdek gen ekspresyonunu, dolayısıyla protein ekspresyonunu yöneterek organellerin işlevini düzenler. Genellikle sitoplazmanın ortasında yer alan küresel bir yapıdır. Her çekirdekteki DNA bireyin "genetik kodunu", yani vücuttaki bütün proteinlerin üretildiği planı taşır (Bölüm 3). [[K1 s. 7]]</p>
  <div class="cols cols-3" style="margin-bottom:14px">
    <div class="card basic"><h3>Çekirdek zarfı</h3><p>Çekirdeği sitoplazmadan ayıran <b>çift katlı</b> zar. Üzerindeki çekirdek porları, hücre yüzey zarında olduğu gibi, seçilmiş moleküllerin kontrollü geçişine izin verir. [[K1 s. 7]]</p></div>
    <div class="card basic"><h3>Nükleoplazma</h3><p>DNA'yı saran jel kıvamında madde; sitoplazmanın çekirdekteki karşılığı. [[K1 s. 7]]</p></div>
    <div class="card basic"><h3>Çekirdekçik (nükleol)</h3><p>Çekirdeğin yoğun boyanan, RNA sentezlenen bölgesi. Çok protein sentezleyen hücrelerde çekirdekçikler daha bol bulunur. [[K1 s. 7]]</p></div>
  </div>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Hücre</th><th>Çekirdek</th></tr></thead>
    <tbody>
      <tr><th>Vücut hücrelerinin hemen hepsi</th><td>Tek çekirdek [[K1 s. 7]]</td></tr>
      <tr><th>Olgun eritrosit</th><td>Çekirdek yok (çekirdeksiz) [[K1 s. 7]]</td></tr>
      <tr><th>İskelet kası hücresi</th><td>Çok çekirdekli [[K1 s. 7]]</td></tr>
      <tr><th>Kaynaşmış makrofajlar</th><td>Çok çekirdekli dev hücre [[K1 s. 7]]</td></tr>
    </tbody>
  </table></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> İki ayrıntı kitapta kısa geçer. (1) Çekirdek porlarından trafik iki yönlüdür: proteinler (ör. transkripsiyon faktörleri) çekirdeğe girer, mRNA ve ribozom alt birimleri çekirdekten sitoplazmaya çıkar. Kitabın genetik bölümü de mRNA'nın çekirdekten çıkıp granüllü ER ribozomlarına gittiğini anlatır. [[K1 s. 10]] (2) Çekirdekçikte sentezlenen RNA esas olarak ribozomal RNA'dır (rRNA) ve ribozom alt birimleri burada birleştirilir; mRNA ise nükleoplazmada transkribe edilir. Çok protein yapan hücrelerde çekirdekçiğin belirgin olması bu yüzdendir.</div>
</section>

<section class="wrap blk ders-sec" id="d02-mito">
  <h2>Mitokondri: iki zar, iki bölme</h2>
  <p class="intro">Mitokondriler aerobik metabolizmayla ATP ürettikleri için "hücrenin enerji santrali" diye anılır. Elips biçimlidir; kırmızı iskelet kası gibi metabolik olarak çok etkin hücrelerde hem daha büyük hem daha çok sayıdadır. Alışılmadık bir özellikleri vardır: bir dış, bir de iç zarları bulunur ve bu iki zar, her birinin kendi görevi olan iki bölme (zarlar arası boşluk ve matriks) oluşturur. [[K1 s. 7]]</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Bileşen</th><th>Yapı</th><th>Ne olur?</th></tr></thead>
    <tbody>
      <tr><th>Dış zar</th><td>Mitokondriyi sitoplazmadan ayıran fosfolipit çift tabaka; porin denen, ortasında por bulunan transmembran proteinler içerir.</td><td>5 kDa'dan küçük çözünmüş maddeler (pirüvat, amino asitler, kısa zincirli yağ asitleri) porinlerden serbestçe difüze olur; uzun zincirli yağ asitleri karnitin mekiğine gereksinim duyar (Bölüm 77). [[K1 s. 7]]</td></tr>
      <tr><th>Zarlar arası boşluk</th><td>Dış ve iç zarın arasındaki bölme.</td><td>Elektron taşıma zincirinin (ETZ) protein kompleksleri H⁺'yı buraya pompalar; oluşan elektrokimyasal gradyan ATP sentezinde kullanılır. [[K1 s. 7]]</td></tr>
      <tr><th>İç zar</th><td>ETZ'nin yeri.</td><td>Zara bağlı proteinler redoks tepkimelerine girer; sonuç ATP sentezidir. [[K1 s. 7]]</td></tr>
      <tr><th>Matriks</th><td>İç zarla çevrili, çok sayıda enzim içeren alan (iç mitokondri matriksi).</td><td>Sitrik asit döngüsü, yağ asidi metabolizması ve üre döngüsü burada yürür. [[K1 s. 7]]</td></tr>
    </tbody>
  </table></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Her hücre yaşamak için ATP üretmek zorunda olduğundan mitokondriler vücudun hemen bütün hücrelerinde bulunur; kitabın verdiği istisna, ATP'sini yalnızca glikolizden sağlayan eritrositlerdir. Mitokondriler az miktarda kendi DNA'larını da taşır; bu, mitokondrinin evrim sürecinde daha büyük hücrelere katılmadan önce bağımsız bir mikroorganizma olmuş olabileceğini düşündürür. Sitoplazma, dolayısıyla mitokondriler, yalnızca anneden gelir; mitokondriyal hastalıkların anneden kalıtılmasının nedeni budur. [[K1 s. 7–8]]</p>
  </div>
  <div class="viz" style="margin-top:16px"><div data-viz="f02_mito"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> (1) Uzun zincirli yağ asitlerinin önündeki asıl engel iç zardır: açil-KoA dış zardaki karnitin palmitoiltransferaz 1 (CPT-1) ile açilkarnitine çevrilir, iç zardaki bir translokazla matrikse geçer ve orada CPT-2 ile yeniden açil-KoA'ya dönüşür. Bu bölüm mekiği dış zarla birlikte anar (Bölüm 77'deki şekil iç zarı gösterir [[K1 s. 379]]); mekik iki zarı birlikte ilgilendirir. (2) İç zarın matrikse doğru yaptığı kıvrımlara krista denir; ETZ'nin yerleştiği yüzeyi genişletir. (3) Anneden kalıtım yalnızca mitokondriyal DNA'daki (mtDNA) mutasyonlar için geçerlidir. Mitokondri proteinlerinin büyük çoğunluğu çekirdek DNA'sında kodlanır (mtDNA yalnızca 13 protein kodlar); çekirdek genlerindeki mutasyonlarla oluşan mitokondriyal hastalıklar Mendel kalıtımı gösterir. (4) Kitabın matriks listesi kısaltmadır: yağ asidi metabolizmasından matrikste yürüyen β-oksidasyondur (yağ asidi sentezi sitozoldedir); üre döngüsünün ilk iki adımı (karbamoil fosfat sentetaz I, ornitin transkarbamilaz) matrikste, kalanı sitozolde yürür. (5) Eritrositten başka, göz merceğinin olgun lif hücreleri de farklılaşırken mitokondrilerini kaybeder.</div>
</section>

<section class="wrap blk ders-sec" id="d02-er">
  <h2>Endoplazmik retikulum ve Golgi: üretim ve dağıtım hattı</h2>
  <p class="intro">Endoplazmik retikulum (ER) hücrenin protein ve lipit üreten aygıtıdır: sitozolün büyük kısmını kaplayan, veziküller ve tübüllerden oluşan geniş bir ağ (adı da buradan gelir). Birbiriyle bağlantılı iki tipi vardır. [[K1 s. 8]]</p>
  <div class="cols" style="margin-bottom:14px">
    <div class="card clin"><span class="tag clin">Protein</span><h3>Granüllü (pürüzlü) ER</h3><p>Protein sentezinin yeri. Granüllü görünümünü yüzeyindeki ribozomlar verir; ribozomlarda amino asitler sırayla birleştirilerek yeni protein kurulur. Sentez, proteinin üç boyutlu yapısına katlanmasıyla tamamlanır. Çok protein üreten hücrelerde, ör. endokrin hücrelerde ve antikor üreten plazma hücrelerinde, özellikle belirgindir. [[K1 s. 8]]</p></div>
    <div class="card"><span class="tag ok">Steroit · lipit · Ca²⁺</span><h3>Düz ER</h3><p>Ribozomu olmadığı için düz görünür; steroit ve lipit sentezinin yeridir. Adrenal korteks hücreleri gibi steroit hormon üreten hücrelerde boldur. Kas hücrelerinde adı <b>sarkoplazmik retikulumdur</b>: kas hücresi zarı depolarize olunca Ca²⁺ salan hücre içi Ca²⁺ deposu. [[K1 s. 8]]</p></div>
  </div>
  <div class="blk-body">
    <p><b>Golgi aygıtı</b> proteinleri salgılanmaya hazırlar. ER'nin yanında üst üste dizilmiş zar yapılarından oluşur ve hücrenin "postanesi" gibi çalışır: ER'den gelen proteini alır, üzerine karbonhidrat ya da fosfat grubu ekleyerek değiştirir (sırasıyla <b>glikozilasyon</b> ve <b>fosforilasyon</b>), varış yerine göre ayırır ve etiketli veziküllere paketler. Veziküller hücrenin başka bölümlerine ya da hücre zarına gider; zarla birleşip içeriklerini dışarı vermelerine <b>ekzositoz</b> denir. [[K1 s. 8]]</p>
  </div>
  <div class="viz" style="margin-top:16px"><div data-viz="f02_salgi"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap Golgi aygıtını üst üste dizilmiş tübüller olarak tanımlar. Histoloji kaynaklarında Golgi, yassı zar keselerinden (sisterna) oluşan bir yığındır: ER'ye bakan bir giriş (cis) yüzü ve veziküllerin ayrıldığı bir çıkış (trans) yüzü vardır. N-bağlı glikozilasyon granüllü ER'de başlar, Golgi'de değiştirilip tamamlanır. Fosforilasyonun iyi bilinen bir örneği, lizozom enzimlerine Golgi'de eklenen ve onları lizozomlara yönlendiren mannoz-6-fosfat etiketidir.</div>
</section>

<section class="wrap blk ders-sec" id="d02-lizozom">
  <h2>Lizozomlar: hücrenin sindirim ve temizlik birimi</h2>
  <p class="intro">Lizozomlar bütün hücrelerde bulunur ama fagositik hücrelerde, yani makrofajlarda ve nötrofillerde özellikle çoktur. İçlerinde sindirim enzimleri, asit ve serbest radikal türleri vardır. [[K1 s. 8]]</p>
  <div class="cols cols-3">
    <div class="card"><h3>Hücre bakımı</h3><p>Eski, bozuk ya da artık gereksiz proteinleri parçalar. [[K1 s. 8]]</p></div>
    <div class="card"><h3>Apoptoz</h3><p>Programlanmış hücre ölümünde rol oynar. [[K1 s. 8]]</p></div>
    <div class="card"><h3>Savunma</h3><p>Fagosite edilen mikroorganizmaları yok eder. [[K1 s. 8]]</p></div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap lizozomların bütün hücrelerde bulunduğunu yazar; olgun eritrositte ise lizozom dahil zarla çevrili hiçbir organel yoktur (kitaptaki mitokondri istisnasıyla tutarlı olarak). Fagosite edilen mikroorganizmayı içeren vezikül (fagozom) bir lizozomla birleşerek fagolizozomu oluşturur; sindirim burada olur.</div>
</section>

<section class="wrap blk ders-sec" id="d02-tip">
  <h2>Yapı işlevi izler: hücre tiplerinin organel donanımı</h2>
  <p class="intro">Kitap organelleri anlatırken aynı ilkeye döner: bir hücre hangi işi çok yapıyorsa o işin organeli belirginleşir. Aşağıda kitabın örnek verdiği hücre tiplerini seçin ve donanımlarını karşılaştırın. [[K1 s. 7–8]]</p>
  <div class="viz"><div data-viz="f02_tip"></div></div>
</section>

<section class="wrap blk ders-sec" id="d02-klinik">
  <h2>Klinik bağlantılar</h2>
  <p class="intro">Bu bölümde ayrı bir "klinik önem" başlığı yoktur; ama metindeki birkaç ayrıntı anestezi pratiğinin temel kavramlarına bağlanır. Kartlar bu bölümdeki bilgiyi, alttaki not ise bu bölümün dışından klinik bağlantıları verir.</p>
  <div class="cols">
    <div class="card clin"><span class="tag clin">Eritrosit</span><h3>Mitokondrisiz hücre, yalnız glikoliz</h3><p>Olgun eritrositte çekirdek de mitokondri de yoktur; ATP'nin tamamı glikolizden gelir. [[K1 s. 7]]</p></div>
    <div class="card clin"><span class="tag clin">Kalıtım</span><h3>Mitokondriyal hastalıklar</h3><p>Mitokondriler kendi DNA'larını taşır ve sitoplazmayla birlikte yalnızca anneden gelir; mitokondriyal hastalıkların anneden kalıtılması buna dayanır. [[K1 s. 7–8]]</p></div>
    <div class="card clin"><span class="tag clin">Kas</span><h3>Sarkoplazmik retikulum</h3><p>Kas hücresinin düz ER'si hücre içi Ca²⁺ deposudur ve zar depolarize olunca Ca²⁺ salar. [[K1 s. 8]]</p></div>
    <div class="card clin"><span class="tag clin">Enerji</span><h3>ATP üretiminin yeri</h3><p>Mitokondride ATP sentezi, ETZ'nin H⁺'yı zarlar arası boşluğa pompalamasıyla kurulan elektrokimyasal gradyana dayanır. [[K1 s. 7]]</p></div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> <b>Malign hipertermi:</b> duyarlı kişilerde (en sık RYR1 geni mutasyonu) volatil anestezikler ve süksinilkolin sarkoplazmik retikulumdan kontrolsüz Ca²⁺ salınımını tetikler; dantrolen sarkoplazmik retikulumdan Ca²⁺ salınımını azaltır. [[K1 s. 242]] <b>Siyanür:</b> ETZ'nin kompleks IV'ünü (sitokrom c oksidaz) inhibe eder; O₂ vardır ama kullanılamaz, hücre glikolize döner ve laktik asidoz gelişir. Sodyum nitroprussidin yıkımında siyanür açığa çıkar. [[K1 s. 36]] [[K1 s. 376]] Mitokondri animasyonundaki "O₂ yok" ve "Siyanür" seçenekleri bu farkı gösterir. <b>Eritrosit:</b> mitokondrisi olmadığı için taşıdığı O₂'yi kendi enerji üretiminde kullanmaz; glikolizin son ürünü laktattır.</div>
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
