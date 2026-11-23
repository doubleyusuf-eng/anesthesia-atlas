/* Fizyoloji Bölüm 64 · Gastrointestinal sindirim ve emilim (K1 İngilizce baskı s. 289–294).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz64-1'] = {
  no: 1, kok: 'İnce bağırsağın yapısı ve karbonhidrat emilimi için:', kagit: 'Paper A · fizyoloji, Bölüm 64', kaynak: '[[K1 s. 289–290]]',
  onermeler: [
    { t: "B12 vitamini ve safra tuzları duodenumda emilir.", d: false, n: "Yanlış. İkisi de terminal ileumda emilir; duodenumda emilen demirdir. [[K1 s. 289]]" },
    { t: "Mikrovilluslar fırçamsı kenar görünümünü oluşturur; ince bağırsağın emilim yüzeyi 250 m²'yi aşar.", d: true, n: "Doğru. Yüzeyi valvulae conniventes, villuslar ve mikrovilluslar büyütür; bağırsak yalnız 7 m uzunluğundadır. [[K1 s. 289]]" },
    { t: "Glukoz ve galaktoz enterosite SGLT1 aracılığıyla ikincil aktif taşınmayla girer.", d: true, n: "Doğru. SGLT1, bazolateral Na⁺/K⁺-ATPaz'ın sağladığı düşük hücre içi Na⁺ derişimine gereksinir. [[K1 s. 290]]" },
    { t: "Fruktoz enterosite Na⁺ ile birlikte taşınarak girer.", d: false, n: "Yanlış. Fruktoz kolaylaştırılmış difüzyonla girer, Na⁺ birlikte taşınmasıyla değil; pentozlar basit difüzyonla girer. [[K1 s. 290]]" },
    { t: "Her villustaki tek venül kanı torasik kanala taşır.", d: false, n: "Yanlış. Venül kanı portal venle karaciğere götürür; torasik kanala şilomikronları lakteal taşır. [[K1 s. 289–290]]" },
  ],
};
VERI.sorular['fiz64-2'] = {
  no: 2, kok: 'Protein ve yağların sindirimi ve emilimi için:', kagit: 'Paper A · fizyoloji, Bölüm 64', kaynak: '[[K1 s. 290–291]]',
  onermeler: [
    { t: "Tripsin ve kimotripsin polipeptitleri tek amino asitlere kadar parçalar.", d: false, n: "Yanlış. Dipeptit ve tripeptitlere kadar parçalar; tek amino aside ayırma işini fırçamsı kenar peptidazları yapar. [[K1 s. 290–291]]" },
    { t: "Dipeptit ve tripeptitler H⁺ bağlantılı birlikte taşımayla emilir ve enterosit içinde amino asitlere ayrılır.", d: true, n: "Doğru. Bu da ikincil aktif taşınmadır; amino asitler hücreyi bazolateral zardan kolaylaştırılmış difüzyonla terk eder. [[K1 s. 291]]" },
    { t: "Pankreas lipazı yalnız lipit damlacıklarının yüzeyinde etki eder.", d: true, n: "Doğru. Safra tuzlarının büyük damlacıkları küçüklere bölmesi bu yüzden gereklidir: lipazın çalışacağı yüzey büyür. [[K1 s. 291]]" },
    { t: "Safra tuzları misel içindeki lipitle birlikte enterosite emilir.", d: false, n: "Yanlış. Lipit enterosite basit difüzyonla geçer, safra tuzları lümende kalır ve terminal ileumda emilip karaciğere döner. [[K1 s. 291]]" },
    { t: "Şilomikronlar lakteallere salınır ve torasik kanaldan sistemik dolaşıma geçer.", d: true, n: "Doğru. Enterositte trigliserit yeniden yapılır, kolesterol, fosfolipit ve apolipoproteinle paketlenir. [[K1 s. 291]]" },
  ],
};
VERI.sorular['fiz64-3'] = {
  no: 3, kok: 'Pankreas salgısı ve ince bağırsak motilitesi için:', kagit: 'Paper A · fizyoloji, Bölüm 64', kaynak: '[[K1 s. 291–294]]',
  onermeler: [
    { t: "Duodenumdaki enterokinaz tripsinojeni tripsine çevirir.", d: true, n: "Doğru. Tripsin sonra kimotripsinojeni ve daha çok tripsinojeni etkinleştirir (otokataliz). [[K1 s. 291–292]]" },
    { t: "Sekretin kanal hücrelerinden HCO₃⁻ salgısını, kolesistokinin asiner hücrelerden enzim salgısını uyarır.", d: true, n: "Doğru. Sekretini asitli kimus, CCK'yi yağ ya da protein içeren kimus salgılatır; ikisi de mide boşalmasını yavaşlatır. [[K1 s. 293]]" },
    { t: "Kistik fibroziste işlevi bozuk olan CFTR, kanal hücresinin bazolateral Na⁺/H⁺ değiştiricisidir.", d: false, n: "Yanlış. CFTR lümen zarındaki Cl⁻ kanalıdır; HCO₃⁻–Cl⁻ değişimi için Cl⁻'u lümene geri döndürür. [[K1 s. 292–293]]" },
    { t: "Göç eden motor kompleks tokluk durumunda 90 dakikada bir görülür.", d: false, n: "Yanlış. Açlıkta görülür; tokluktaki kasılmalar segmental ve propulsif kasılmalardır. [[K1 s. 293]]" },
    { t: "Eritromisin motilin agonisti olduğu için yoğun bakımda prokinetik olarak kullanılır.", d: true, n: "Doğru. Motilin açlıkta 90 dakikada bir duodenum mukozasından salınır ve göç eden motor kompleksi başlatır. [[K1 s. 294]]" },
  ],
};

const D64_NAV = [
  ['d64-yapi', 'İnce bağırsağın yapısı'], ['d64-kh', 'Karbonhidratlar'], ['d64-protein', 'Proteinler'], ['d64-yag', 'Yağlar'],
  ['d64-pankreas', 'Pankreas enzimleri'], ['d64-hco3', 'HCO₃⁻ salgısı'], ['d64-kontrol', 'Salgının kontrolü'],
  ['d64-motilite', 'Tokluk ve açlık'], ['d64-dalga', 'Motilitenin kontrolü'],
  ['d64-p1', 'Part I'], ['d64-p2', 'Part II'], ['d64-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/64'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 5 · Bölüm 64', baslik: 'Gastrointestinal sindirim ve emilim',
  lede: 'Sindirim, büyük besin moleküllerini emilebilecek yapı taşlarına ayırmaktır: karbonhidrat monosakkaritlere, protein amino asit ve kısa peptitlere, trigliserit yağ asidi ve monogliseride. Emilimin çoğu, yüzeyi 250 m²\'yi aşan ince bağırsakta olur. [[K1 s. 289–291]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D64_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d64-yapi">
  <h2>Sindirim kanalı ve ince bağırsağın yapısı</h2>
  <p class="intro">Sindirim kanalı ağızdan anüse uzanan yaklaşık 9 m'lik bir tüptür; emilimin çoğu, 7 m uzunluğundaki ama katlantılarla yüzeyi 250 m²'yi aşan ince bağırsakta olur. [[K1 s. 289]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kanaldan mikrovillusa: dört yakınlaştırma</h3></div>
    <div data-viz="f64_yapi"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Kanal.</b> Ağız, özofagus, mide, ince ve kalın bağırsak. Yardımcı organlar: dişler ve dil yiyeceği tükürükle karıştırır; tükürük bezleri, karaciğer, safra kesesi ve pankreas kimyasal ve enzimatik parçalama için salgı yapar. Bir bölüme dokunun ya da yakınlaştırın. [[K1 s. 289]]</p>
    <p class="viz-foot">Şematik çizim; oranlar temsilîdir. Uzunluk ve yüzey değerleri kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Üç bölüm, farklı emilim yerleri.</b> İnce bağırsak duodenum, jejunum ve ileumdur. Besinlerin çoğu jejunumda emilir; demir duodenumda, B12 vitamini ve safra tuzları terminal ileumda, yağ ve su ise bağırsağın her yerinde emilir. [[K1 s. 289]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:12px"><table class="tbl">
    <thead><tr><th>Tabaka (dıştan içe)</th><th>İçeriği ve işi</th></tr></thead>
    <tbody>
      <tr><td><b>Adventisya</b></td><td>Gevşek bağ dokusu.</td></tr>
      <tr><td><b>Muskularis eksterna</b></td><td>Dışta longitudinal, içte sirküler düz kas; koordineli kasılmaları peristaltizmi oluşturur. Aradaki <b>miyenterik pleksus</b> (enterik sinir sistemi) kasılmayı koordine eder.</td></tr>
      <tr><td><b>Submukoza</b></td><td><b>Meissner pleksusu</b> (ikincil enterik pleksus), kan ve lenf damarları, elastik bağ dokusu.</td></tr>
      <tr><td><b>Mukoza</b></td><td><b>Muskularis mukoza:</b> mukozayı sürekli çalkalar, içerikle teması artırır, yapışmayı önler. <b>Lamina propria:</b> damarlar ve bağışıklık hücreleri; ileumda Peyer plakları denen lenfoid nodüller. <b>Epitel:</b> emici hücreler, enterositler.</td></tr>
    </tbody>
  </table></div>
  <div class="blk-body" style="margin-top:12px">
    <p><b>Yüzeyi büyütenler.</b> Valvulae conniventes lümene uzanan mukoza katlantılarıdır; üzerlerinde parmak benzeri villuslar, villusların üstünde mikroskopik mikrovilluslar vardır. Mikrovillusların villus üzerindeki tüylü görünümü "fırçamsı kenar" adını verir. Villuslar arasında mukus salgılayan goblet hücreleri ve fırçamsı kenar enzimlerini salgılayan, kök hücre barındıran kriptler bulunur. [[K1 s. 289]]</p>
    <p><b>Her villusta üç damar.</b> Tek arteriyol uçta kapiller ağ yapar; ağ tek venüle boşalır ve kan portal venle karaciğere gider. Tek lenf kapilleri, lakteal, emilen yağı şilomikron olarak torasik kanala taşır. [[K1 s. 289–290]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d64-kh">
  <h2>Karbonhidratlar</h2>
  <p class="intro">Üç ana besin sınıfı (karbonhidrat, amino asit/protein, yağ) çok farklı yollarla sindirilip emilir; karbonhidrat polimerleri (ör. nişasta) emilmeden önce monosakkaritlere ayrılmalıdır. [[K1 s. 290]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Nişastadan kana: karbonhidratın yolu</h3></div>
    <div data-viz="f64_kh"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Ağız.</b> Tükürük amilazı karmaşık karbonhidratları daha küçük polimerlere ve monosakkaritlere ayırır. İleri'ye basın. [[K1 s. 290]]</p>
    <p class="viz-foot">Şematik enterosit; taşıyıcı sayıları ve hızlar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Duodenumda pankreas amilazı parçalamayı sürdürür. Son adımı villuslara bağlı integral membran proteinleri olan fırçamsı kenar enzimleri (sükraz, maltaz, laktaz) yapar: ör. sükraz sükrozu glukoz ve fruktoza ayırır. Enzimi eksik olan o şekeri sindiremez; laktoz intoleransının nedeni laktaz eksikliğidir. Selülozu ayıracak enzim insanda yoktur, kanaldan değişmeden geçer. [[K1 s. 290]]</p>
    <p>Lümen zarında üç yol vardır. Glukoz ve galaktoz <b>yalnız</b> SGLT1 (Na⁺–glukoz bağlantılı taşıyıcı) ile ikincil aktif taşınır; bunun için hücre içi Na⁺ düşük olmalıdır ve bunu bazolateral Na⁺/K⁺-ATPaz sağlar. Fruktoz kolaylaştırılmış difüzyonla, pentozlar basit difüzyonla girer. Hücre içinde glukoz ve galaktoz derişim farkıyla bazolateral zardan GLUT-2 üzerinden (kolaylaştırılmış difüzyon) kapillere geçer; monosakkaritler ozmotik olarak aktif olduğundan su da emilir. [[K1 s. 290]]</p>
  </div>
  <div class="card" style="margin-top:12px"><span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px"><b>Oral rehidratasyon tedavisi (ORT).</b> Dünyada 5 yaş altı çocuklarda ishal ikinci en sık ölüm nedenidir; öldüren ishalin kendisi değil dehidratasyondur. ORT, orta ve ağır dehidratasyonda damar yolu sıvısı gereğini azaltır. Çözelti esasen su, NaCl ve glukozdur: Na⁺–glukoz birlikte taşınması büyük miktarda suyu da içeri çeker ve kaybedilen Na⁺'un bir kısmını yerine koyar. Kitaba göre ORT potasyum içermez; uzun ishal ve oral tedaviden sonra hipokalemi gelişebilir. [[K1 s. 290]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Standart DSÖ oral rehidratasyon çözeltisi 20 mmol/L potasyum içerir; "potasyum içermez" ifadesi ancak ev yapımı tuz–şeker çözeltileri için doğrudur.</div>
</section>

<section class="wrap blk ders-sec" id="d64-protein">
  <h2>Proteinler</h2>
  <p class="intro">Proteinler emilmeden önce tek amino asitlere, dipeptit ve tripeptitlere ayrılmalıdır; sindirim midede başlar, duodenumda ve fırçamsı kenarda tamamlanır. [[K1 s. 290–291]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Proteinden amino aside: dört istasyon</h3></div>
    <div data-viz="f64_protein"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Mide.</b> Esas hücreler pepsinojen salgılar; düşük pH onu pepsine çevirir. Pepsin peptit bağlarını keserek daha kısa polipeptitler yapar. İleri'ye basın. [[K1 s. 290]]</p>
    <p class="viz-foot">Şematik; zincir uzunlukları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Duodenumda en önemli iki peptidaz pankreas kaynaklı tripsin ve kimotripsindir; polipeptitleri dipeptit ve tripeptitlere kadar keser, tek amino aside kadar değil. Son kesimi villuslara bağlı fırçamsı kenar peptidazları yapar. [[K1 s. 290–291]]</p>
    <p>Tek amino asitler glukoz gibi Na⁺ bağlantılı birlikte taşımayla girer; nötr, bazik ve asidik amino asitlerin ayrı taşıyıcıları vardır. İki-üç amino asitlik kısa peptitler H⁺ bağlantılı birlikte taşımayla (yine ikincil aktif) girer ve hücre içinde amino asitlere ayrılır. Amino asitler bazolateral zardan kolaylaştırılmış difüzyonla çıkar; ozmotik olarak aktif olduklarından su da onlarla emilir. [[K1 s. 291]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d64-yag">
  <h2>Yağlar</h2>
  <p class="intro">Diyet yağının çoğu trigliserittir (gliserol iskeletine bağlı üç yağ asidi), az miktarda fosfolipit, kolesterol ve yağda çözünen vitamin de vardır; suda çözünmediği için trigliserit önce küçük damlacıklara bölünmeli, sonra parçalanmalıdır. [[K1 s. 291]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Damlacık boyu ve lipaz: emülsifikasyondan şilomikrona</h3></div>
    <div data-viz="f64_yag"></div>
    <p class="viz-cap" aria-live="polite"><b>Emülsifikasyon.</b> Trigliserit sulu ortamda büyük damlacıklarda toplanır; safra asitleri damlacıkları kaplayıp giderek küçük damlacıklara böler. Safra tuzunu artırın. [[K1 s. 291]]</p>
    <p class="viz-foot">Model: aynı yağ hacmi küçük damlacıklara bölündükçe toplam yüzey artar; lipaz hızı yüzeyle orantılı çizilir. Sayılar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Safra asitleri karaciğerde yapılır, safra kesesinde depolanıp duodenuma salınır. Pankreas lipazı her trigliseriti iki serbest yağ asidi ve bir 2-monogliseride ayırır, ama yalnız damlacık yüzeyinde çalışır; damlacıkları bölmek lipazın yüzeyini büyütür. Açığa çıkan yağ asitleri ve monogliseritler safra tuzlarıyla küçük karma kürecikler, <b>miseller</b> oluşturur. [[K1 s. 291]]</p>
    <p>Misel enterosite değince lipit basit difüzyonla emilir. Safra tuzları lümende kalır, terminal ileumda emilip karaciğere döner ve yeniden kullanılır. Enterositte yağ asitleri ve monogliseritler endoplazmik retikulumda yeniden trigliserit olur; kolesterol, fosfolipit ve hücresel bir etiket olan apolipoproteinle paketlenip <b>şilomikron</b> olur. Şilomikronlar lakteale, lenf yoluyla da torasik kanaldan sistemik dolaşıma geçer. [[K1 s. 291]]</p>
  </div>
  <div class="card" style="margin-top:12px"><span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px"><b>Lipaz inhibitörleri.</b> Kilo verdiren orlistat dil ve pankreas lipazını inhibe eder: trigliserit yağ asidi ve monogliseride ayrılamaz, sindirilmeden dışkıyla atılır, steatore olur. Pankreas yetmezliğinin başlıca belirtisi de steatoredir. [[K1 s. 291]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d64-pankreas">
  <h2>Pankreas: enzimler ve akut pankreatit</h2>
  <p class="intro">Pankreas hem endokrin hem ekzokrin bir bezdir; dokusunun çoğu günde 1,5 L pankreas sıvısı yapar ve bu sıvı pankreas kanalıyla duodenuma boşalır. Peptidazlar proenzim olarak salgılanır ve ancak duodenumda etkinleşir. [[K1 s. 291–292]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tripsin çağlayanı: duodenumda ve pankreas içinde</h3></div>
    <div data-viz="f64_tripsin"></div>
    <p class="viz-cap" aria-live="polite"><b>Duodenum.</b> Enterokinaz tripsinojeni tripsine çevirir; tripsin kimotripsinojeni ve daha çok tripsinojeni etkinleştirir. Tripsinin tripsin yapması (otokataliz) etkinliği üssel artırır. Oynat'a basın. [[K1 s. 291–292]]</p>
    <p class="viz-foot">Model: otokataliz basit üssel artış olarak çizilir; zaman ve miktar eksenleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Endokrin kısım:</b> kitlenin yalnız %1–2'sini oluşturan Langerhans adacıkları glukagonun (α hücreleri), insülinin (β) ve pankreatik polipeptidin (PP hücreleri) tek kaynağı, somatostatinin (δ) de başlıca kaynaklarından biridir. <b>Ekzokrin kısım:</b> asiner hücreler sindirim enzimlerini, kanal (duktal) hücreleri HCO₃⁻ ve su salgılar. [[K1 s. 291]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:12px"><table class="tbl">
    <thead><tr><th>Asiner ürün</th><th>Etkinleşme</th><th>İşi</th></tr></thead>
    <tbody>
      <tr><td><b>Tripsinojen</b> → tripsin</td><td>Duodenumda enterokinaz; sonra otokataliz</td><td>Güçlü peptidaz; kimotripsinojeni, profosfolipaz A2'yi ve proelastazı etkinleştirir</td></tr>
      <tr><td><b>Kimotripsinojen</b> → kimotripsin</td><td>Tripsin</td><td>Peptidaz</td></tr>
      <tr><td><b>Pankreas α-amilazı</b></td><td>—</td><td>Büyük polisakkaritleri küçük polimerlere (nişasta → maltoz); selüloza etkisiz</td></tr>
      <tr><td><b>Pankreas lipazı</b></td><td>—</td><td>Trigliserit → serbest yağ asidi + 2-monogliserit</td></tr>
    </tbody>
  </table></div>
  <div class="card" style="margin-top:12px"><span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px"><b>Akut pankreatit</b>, hafif ve kendini sınırlayan hastalıktan çoklu organ yetmezliğine uzanan bir pankreas inflamasyonudur; en sık nedenleri alkol ve safra taşlarıdır. Neden ne olursa olsun sorun, proenzimlerin pankreas içinde uygunsuz etkinleşmesidir. Şiddetli pankreatitin ayırt edici bulgularından biri hemorajik nekrozdur: fosfolipaz A2 hücre zarı fosfolipitlerini sindirir (nekroz), elastaz damar duvarını sindirir (kanama). Sindirilen hücrelerden salınan aracılar (özellikle TNF-α ve IL-1) ağır sistemik inflamatuvar yanıt sendromu yapar; interstisyuma geçen lipazın retroperitoneal yağı sindirmesi Grey Turner (yanlarda) ve Cullen (göbek çevresinde) renk değişikliğine yol açar. [[K1 s. 292]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d64-hco3">
  <h2>Kanal hücresi: HCO₃⁻ salgısı</h2>
  <p class="intro">Pankreas sıvısının inorganik kısmını kanal hücreleri yapar; HCO₃⁻ duodenuma gelen mide asidini nötralize eder, yoksa pek çok pankreas enzimi asitte denatüre olurdu. [[K1 s. 292]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kanal hücresinde HCO₃⁻ yapımı</h3></div>
    <div data-viz="f64_hco3"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · CO₂ girer.</b> CO₂ kandan kanal hücresine difüzyonla geçer. İleri'ye basın. [[K1 s. 293]]</p>
    <p class="viz-foot">Şematik hücre; iyon sayıları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Düzen mide asidi salgısına benzer ve karbonik anhidraz (KA) kullanır. KA'nın katalizlediği tepkimede CO₂ ile su H₂CO₃ olur, o da H⁺ ve HCO₃⁻'a ayrılır; iki iyon ayrı yollara gider. HCO₃⁻ derişim farkıyla lümen zarından Cl⁻ ile değişerek kanal lümenine geçer; Cl⁻ ayrı bir Cl⁻ kanalından, <b>CFTR</b>'den lümene geri döner. Kistik fibroziste işlevi bozuk olan kanal budur. [[K1 s. 292–293]]</p>
    <p>H⁺ bazolateral zardan Na⁺ ile değişerek kapillere atılır; bu değişimi, pek çok hücresel süreçte olduğu gibi, Na⁺/K⁺-ATPaz'ın yarattığı düşük hücre içi Na⁺ sürer. HCO₃⁻ ozmotik olarak aktif olduğundan kanala su da geçer. [[K1 s. 293]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d64-kontrol">
  <h2>Pankreas salgısının kontrolü</h2>
  <p class="intro">Öğün arasında pankreas sıvısı çok az salgılanır; yiyecek mideye, özellikle kimus duodenuma girince salgı güçlü biçimde uyarılır. Kontrol hem sinirsel hem hormonaldir. [[K1 s. 293]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Öğünün evresine göre pankreasa giden sinyaller</h3></div>
    <div data-viz="f64_kontrol"></div>
    <p class="viz-cap" aria-live="polite"><b>Öğün arası.</b> Pankreas sıvısı çok az salgılanır. Bir evre seçin. [[K1 s. 293]]</p>
    <p class="viz-foot">Şematik; salgı çubuklarının yüksekliği nitel karşılaştırmadır, kitap sayı vermez.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Uyarı</th><th>Kaynak ve tetik</th><th>Pankreasa etkisi</th><th>Başka etkileri</th></tr></thead>
    <tbody>
      <tr><td><b>Vagus</b></td><td>Sefalik evre (öğün beklentisi)</td><td>Asiner etkinlikte küçük artış</td><td>—</td></tr>
      <tr><td><b>Gastrin</b></td><td>Midenin G hücreleri; mide gerilmesi</td><td>Asiner enzim salgısı: karbonhidrat, protein ve yağın gelişine hazırlık</td><td>Pariyetal hücrelerden asit salgısı</td></tr>
      <tr><td><b>Kolesistokinin (CCK)</b></td><td>Duodenum mukoza hücreleri; yağ ya da protein içeren kimus</td><td>Asiner enzim salgısı</td><td>Karaciğerde safra yapımı artar, safra kesesi kasılır, mide boşalması yavaşlar</td></tr>
      <tr><td><b>Sekretin</b></td><td>Duodenum mukozası; asitli kimus</td><td>Kanal hücrelerinden HCO₃⁻ (kimusu nötralize eder)</td><td>Mide boşalması yavaşlar</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">[[K1 s. 293]]</p>
</section>

<section class="wrap blk ders-sec" id="d64-motilite">
  <h2>Tokluk ve açlıkta ince bağırsak motilitesi</h2>
  <p class="intro">Tokken ince bağırsak iki iş yapar: kimusu enzimler ve safra tuzlarıyla karıştırmak ve kalın bağırsağa doğru itmek; iki işe iki kasılma tipi karşılık gelir. Açlıkta ise ayrı bir düzen, göç eden motor kompleks çalışır. [[K1 s. 293]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Segmental, propulsif ve göç eden motor kompleks</h3></div>
    <div data-viz="f64_motilite"></div>
    <p class="viz-cap" aria-live="polite"><b>Segmental kasılma.</b> Kimus karışır ama ilerlemez. Bir kasılma tipi seçin. [[K1 s. 293]]</p>
    <p class="viz-foot">Şematik bağırsak kesiti; açlık döngüsü zamanı sıkıştırılarak gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Segmental:</b> komşu segmentlerin sirküler kası bir bağırsak bölmesini kapatır, ardından longitudinal kas sürekli kasılıp gevşer; kimus ilerlemeden enzimlerle karışır ve fırçamsı kenarla teması artar, emilim kolaylaşır. <b>Propulsif:</b> bolusun arkasındaki sirküler kas ile longitudinal kas çok koordineli kasılır ve kimusu iter; her peristaltik dalga yalnız birkaç saniye sürer, saniyede birkaç santimetre ilerler. [[K1 s. 293]]</p>
    <p><b>Açlık:</b> kasılmalar seyrek ve düzensizdir; ama 90 dakikada bir duodenumdan ileoçekal valve yayılan yoğun, koordineli bir kasılma dönemi, <b>göç eden motor kompleks (GMK)</b>, ince bağırsağı boydan boya süpürür ve sindirilmemiş kimusu kolona taşır. [[K1 s. 293]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d64-dalga">
  <h2>Motilitenin kontrolü: yavaş dalga, sinirler, hormonlar</h2>
  <p class="intro">Düz kas, zar potansiyeli eşiği aşınca kasılır; yavaş dalgalar tek başına eşiğe ulaşmaz, ama bolusun yaptığı küçük depolarizasyon üstüne binince sivri uçlu potansiyel ve kasılma olur. [[K1 s. 293–294]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yavaş dalga, gerilme ve sivri uçlu potansiyel</h3></div>
    <div data-viz="f64_dalga"></div>
    <p class="viz-cap" aria-live="polite"><b>Bolus yok.</b> Yavaş dalgalar eşiğin altında kalır; kasılma olmaz. Bolusu ekleyin. [[K1 s. 294]]</p>
    <p class="viz-foot">Model: dinlenim potansiyeli ve yavaş dalga sıklığı kitaptandır; dalga genliği, eşik düzeyi ve otonom etkinin büyüklüğü temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>İnce bağırsak düz kasının dinlenim zar potansiyeli, sinir hücrelerinde olduğu gibi negatiftir (–40 ile –70 mV). Eşik aşılınca voltaj kapılı kanallardan Na⁺ ve Ca²⁺ girer, zar depolarize olur, kasılma başlar. Zar potansiyeli normalde dakikada 20–30 kez dalgalanır (yavaş dalga); bu dalgalar depolarizasyon ve kasılmaları koordine eder. Bolus duvarı gerince nörotransmiter salınır, küçük bir depolarizasyon olur ve bir sonraki yavaş dalga eşiği aşar. [[K1 s. 293–294]]</p>
    <p><b>Enterik sinir sistemi</b> GI kanalı yöneten yaygın bir sistemdir: afferent ve efferent nöronlar miyenterik (Auerbach) ve submukozal (Meissner) pleksusta toplanır. Yarı özerk çalışır, otonom girdi alır. Sempatik sistem prevertebral gangliyonlardaki sinapslarla enterik sistemi inhibe eder, motiliteyi ve salgıyı azaltır, splanknik vazokonstriksiyonla bağırsak kan akımını düşürür. Parasempatik sistem vagusla motiliteyi ve salgıyı artırır; bu yüzden "dinlen ve sindir" sistemi denir. [[K1 s. 294]]</p>
    <p><b>Hormonlar.</b> CCK ve sekretin mide motilitesini değiştirir; bağırsak motilitesinin endokrin kontrolü daha az bilinir. <b>Motilin</b> açlıkta 90 dakikada bir duodenum mukozasından salınır ve GMK'yi başlatır; salınım uyaranı bilinmez. Eritromisin motilin agonistidir; yoğun bakımda prokinetik olarak bu yüzden kullanılır. <b>Vazoaktif intestinal peptit (VIP)</b> ince bağırsakta su ve elektrolit salgısını artırır, motiliteyi uyarır; VIP fazlası yapan VIPoma bu yüzden genellikle sulu ishalle başvurur. [[K1 s. 294]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> İnsan ince bağırsağında yavaş dalga sıklığı dakikada 20–30 değildir: duodenumda ≈ 12, terminal ileumda ≈ 8/dk'dır ve aşağı doğru azalır.</div>
</section>

<section class="wrap blk ders-sec" id="d64-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: ince bağırsağın bölümleri ve emilim yerleri (demir, B12, safra tuzları), duvar tabakaları ve yüzeyi büyüten yapılar, villusun damarları, SGLT1–GLUT-2 ve fruktozun yolu, ORT, peptidazların nereye kadar kestiği, misel ve şilomikron, orlistat, tripsinojenin etkinleşmesi, pankreatitte enzim hasarı, kanal hücresi ve CFTR, gastrin–CCK–sekretin, segmental/propulsif kasılma ve GMK, yavaş dalga, motilin ve VIP. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz64-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz64-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz64-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d64-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Diyetle alınan yağ nasıl sindirilir ve emilir? Pankreas yetmezliği olan ya da orlistat kullanan hastada neden steatore olur?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Ne sindirilir?</b> Diyet yağının çoğu trigliserit (gliserol + üç yağ asidi); az miktarda fosfolipit, kolesterol, yağda çözünen vitamin. Suda çözünmez, büyük damlacıklarda toplanır. [[K1 s. 291]]</li>
    <li><b>Emülsifikasyon.</b> Karaciğerde yapılan, safra kesesinden salınan safra asitleri damlacıkları kaplayıp küçük damlacıklara böler. [[K1 s. 291]]</li>
    <li><b>Lipaz.</b> Pankreas lipazı trigliseriti iki serbest yağ asidi + 2-monogliseride ayırır; yalnız damlacık yüzeyinde çalışır, bu yüzden safra gerekir. [[K1 s. 291]]</li>
    <li><b>Misel ve emilim.</b> Yağ asidi + monogliserit + safra tuzu = misel; lipit enterosite basit difüzyonla geçer, safra tuzları terminal ileumda emilip karaciğere döner. [[K1 s. 291]]</li>
    <li><b>Enterositte.</b> Endoplazmik retikulumda yeniden trigliserit; kolesterol, fosfolipit, apolipoproteinle şilomikron; lakteal → lenf → torasik kanal → sistemik dolaşım. [[K1 s. 289–291]]</li>
    <li><b>Steatore.</b> Orlistat dil ve pankreas lipazını inhibe eder; pankreas yetmezliğinde lipaz azdır: trigliserit parçalanmaz, emilmez, dışkıyla atılır. [[K1 s. 291]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Lümenden lenfe tek şerit çizin: büyük damlacık → safrayla küçük damlacıklar → lipaz (yüzeyde) → misel → enterosit (difüzyon; ER'de trigliserit; şilomikron) → lakteal → torasik kanal. Safra tuzu için lümende kalıp terminal ileuma giden ayrı bir ok ekleyin. [[K1 s. 291]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Glukoz ve amino asitler hangi taşıyıcılarla emilir? ORT nasıl çalışır? Tripsinojen nerede, nasıl etkinleşir, pankreas içinde etkinleşirse ne olur? Kanal hücresi HCO₃⁻'u nasıl salgılar, kistik fibrozis neyi bozar? Sekretin ve CCK neyi uyarır? Göç eden motor kompleks nedir, eritromisin neden prokinetiktir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 290–294]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d64-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>İnce bağırsak (7 m; duodenum, jejunum, ileum) besinlerin çoğunu jejunumda emer; demir duodenumda, B12 ve safra tuzları terminal ileumda; katlantı, villus ve mikrovillusla yüzey 250 m²'yi aşar. [[K1 s. 289]]</li>
    <li>Villusta arteriyol → kapiller → venül → portal ven; lakteal → torasik kanal. [[K1 s. 289–290]]</li>
    <li>Karbonhidrat: amilazlar + fırçamsı kenar enzimleri; glukoz/galaktoz SGLT1 (Na⁺, ikincil aktif), fruktoz kolaylaştırılmış, pentoz basit difüzyon; çıkış GLUT-2; su izler (ORT'nin temeli). [[K1 s. 290]]</li>
    <li>Protein: pepsin → tripsin/kimotripsin (di-/tripeptide kadar) → fırçamsı kenar peptidazları; amino asit Na⁺ ile, kısa peptit H⁺ ile girer. [[K1 s. 290–291]]</li>
    <li>Yağ: safrayla emülsifikasyon → yüzeyde lipaz → misel → difüzyon → ER'de trigliserit → şilomikron → lakteal; orlistat ve pankreas yetmezliği steatore yapar. [[K1 s. 291]]</li>
    <li>Pankreas: 1,5 L/gün; enterokinaz → tripsin → otokataliz; pankreas içinde erken etkinleşme = akut pankreatit (PLA2 nekroz, elastaz kanama, lipaz retroperitoneal yağ). [[K1 s. 291–292]]</li>
    <li>Kanal hücresi: KA ile HCO₃⁻, lümende Cl⁻ ile değişim ve CFTR (kistik fibrozis), bazolateral Na⁺/H⁺; sekretin HCO₃⁻'u, CCK ve gastrin enzimleri uyarır. [[K1 s. 292–293]]</li>
    <li>Toklukta segmental (karıştırır) ve propulsif (iter) kasılma; açlıkta 90 dakikada bir motilinle GMK; yavaş dalga + gerilme → sivri uçlu potansiyel; sempatik azaltır, vagus artırır. [[K1 s. 293–294]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="64"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/63">← Bölüm 63 · Mide ve kusma</a>
    <a href="#/dersler/fizyoloji/65">Sonraki: Bölüm 65 · Karaciğer: anatomi ve kanlanma →</a>
  </nav>
</section>`,
};
