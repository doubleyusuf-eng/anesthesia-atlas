/* Fizyoloji Bölüm 77 · Metabolizma (K1 İngilizce baskı s. 373–383).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz77-1'] = {
  no: 1, kok: 'Glikoliz ve sitrik asit döngüsü için:', kagit: 'Paper A · fizyoloji, Bölüm 77', kaynak: '[[K1 s. 373–375]]',
  onermeler: [
    { t: 'Karaciğerde glukozu glukoz-6-fosfata çeviren enzim heksokinazdır.', d: false, n: 'Yanlış. Karaciğerde glukokinaz, öteki dokularda heksokinaz bu adımı katalizler; bir ATP harcanır. [[K1 s. 373]]' },
    { t: 'Glikoliz O₂ tüketmez ve CO₂ üretmez; bu yüzden aerobik ve anaerobik koşulda yürür.', d: true, n: 'Doğru. Glikoliz sitoplazmadadır; glukozu iki piruvata çevirirken net 2 ATP ve 2 NADH verir. [[K1 s. 373–374]]' },
    { t: 'Anaerobik koşulda piruvat, laktat dehidrojenazla NADH tarafından laktata indirgenir; böylece NAD⁺ yenilenir.', d: true, n: 'Doğru. NAD⁺ yenilenmezse glikoliz durur; laktat sonra karaciğerde piruvata ya da glukoza (Cori döngüsü) çevrilir. [[K1 s. 374]]' },
    { t: 'Sitrik asit döngüsü O₂ tüketmediği için mitokondriyal PO₂ 0,4 kPa\'nın altına düşse de çalışmayı sürdürür.', d: false, n: 'Yanlış. Döngü O₂ tüketmez ama NAD⁺ ve FAD\'ı yenileyen elektron taşıma zinciri O₂\'ye bağlıdır; PO₂ < 0,4 kPa\'da döngü durur. [[K1 s. 375]]' },
    { t: 'Süksinil-KoA\'dan oksaloasetata dek olan basamaklarda CO₂ çıkmaz.', d: true, n: 'Doğru. Karbon sayısı 4\'te kalır; bu aşama birer ATP, NADH ve FADH₂ üretir. CO₂ izositrat–α-ketoglutarat ve α-ketoglutarat–süksinil-KoA adımlarında çıkar. [[K1 s. 375]]' },
  ],
};
VERI.sorular['fiz77-2'] = {
  no: 2, kok: 'Elektron taşıma zinciri, ATP verimi ve yağ metabolizması için:', kagit: 'Paper A · fizyoloji, Bölüm 77', kaynak: '[[K1 s. 376–378]]',
  onermeler: [
    { t: 'Siyanür kompleks III\'ün hem grubuna bağlanarak elektron akışını durdurur.', d: false, n: 'Yanlış. Siyanür kompleks IV\'ün (sitokrom c oksidaz) hem grubuna bağlanır ve O₂ bağlanmasını engeller. [[K1 s. 376]]' },
    { t: 'Kahverengi yağ dokusunda H⁺ kompleks V\'i atlayarak matrikse döner ve enerji ATP yerine ısıya dönüşür.', d: true, n: 'Doğru. Buna ayrışma (uncoupling) denir; yenidoğanda önemli bir ısı üretme yoludur. [[K1 s. 377]]' },
    { t: 'Kitabın hesabına göre bir glukoz molekülü aerobik metabolizmayla 36 ATP verir.', d: true, n: 'Doğru. 4 ATP + 10 NADH × 3 + 2 FADH₂ × 1 = 36; anaerobik koşulda yalnız 2 ATP. [[K1 s. 377–378]]' },
    { t: 'Uzun zincirli yağ asitleri mitokondri zarını taşıyıcı olmadan geçer.', d: false, n: 'Yanlış. Kısa ve orta zincirliler doğrudan girer; uzun zincirliler karnitin mekiğine bağlanmak zorundadır. [[K1 s. 378]]' },
    { t: 'Eritrositler uzun açlıkta keton cisimlerini enerji kaynağı olarak kullanabilir.', d: false, n: 'Yanlış. Eritrositte mitokondri yoktur; tamamen glikolize bağımlıdır ve keton cisimlerini kullanamaz. [[K1 s. 378]]' },
  ],
};
VERI.sorular['fiz77-3'] = {
  no: 3, kok: 'Depolama, hormonlar ve bazal metabolizma hızı için:', kagit: 'Paper A · fizyoloji, Bölüm 77', kaynak: '[[K1 s. 380–383]]',
  onermeler: [
    { t: 'Kas glikojeni glukoz-6-fosfataz olmadığı için dolaşıma glukoz veremez.', d: true, n: 'Doğru. Bu adım yalnız karaciğerde vardır; kas glikojeni (≈200 g) yalnız kasın kendi metabolizmasına kullanılır. [[K1 s. 380–381]]' },
    { t: 'β-hücrelerine giden sempatik sinirler α2 reseptörleri aracılığıyla insülin salınımını inhibe eder.', d: true, n: 'Doğru. Doğrudan sempatik innervasyon α2 ile salınımı baskılar. Kitap dolaşımdaki adrenalinin β2 ile salınımı artırdığını da yazar; net etkisi ise çoğunlukla α2 baskınlığıyla baskılamadır (Atlas notu). [[K1 s. 382]]' },
    { t: 'Beyin hücrelerindeki GLUT-1 glukoz taşıyıcısı insüline bağımlıdır.', d: false, n: 'Yanlış. Beyindeki GLUT-1 ve karaciğerdeki GLUT-2 insüline bağımlı değildir; insüline bağımlı olan yağ, iskelet kası ve kalpteki GLUT-4\'tür. [[K1 s. 382]]' },
    { t: 'Gebelikte bazal metabolizma hızı yaklaşık %20 artar.', d: true, n: 'Doğru. Fetüs ve plasentanın metabolizması, uterus ve memelerin büyümesi nedeniyle. [[K1 s. 383]]' },
    { t: 'Metformin hepatik glukoneogenezi inhibe ederek laktik asidozu ağırlaştırabilir.', d: true, n: 'Doğru. Karaciğer laktatı glukoneogenezde substrat olarak kullanır; metformin karaciğerin laktat alımını azaltır. [[K1 s. 375]] [[K1 s. 381]]' },
  ],
};

const D77_NAV = [
  ['d77-genel', 'Hücresel solunum'], ['d77-glikoliz', 'Glikoliz'], ['d77-laktik', 'Laktik asidoz'],
  ['d77-krebs', 'Sitrik asit döngüsü'], ['d77-etz', 'Elektron taşıma zinciri'], ['d77-atp', 'Glukozdan kaç ATP?'],
  ['d77-yag', 'Yağ metabolizması'], ['d77-keton', 'Keton cisimleri'], ['d77-protein', 'Protein yıkımı'],
  ['d77-depo', 'Depolama'], ['d77-glukoneo', 'Glukoneogenez'], ['d77-ppp', 'Pentoz fosfat yolu'],
  ['d77-hormon', 'İnsülin ve glukagon'], ['d77-dka', 'Diyabetik ketoasidoz'], ['d77-bmh', 'BMH ve MET'],
  ['d77-p1', 'Part I'], ['d77-p2', 'Part II'], ['d77-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/77'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 8 · Bölüm 77', baslik: 'Metabolizma',
  lede: 'Karbonhidrat, yağ ve protein aynı ortak yola akar: asetil-KoA, sitrik asit döngüsü ve elektron taşıma zinciri. Bu yolları, depoları ve onları yöneten insülin–glukagon dengesini bilen, laktik asidozu, DKA\'yı ve ameliyat öncesi MET değerlendirmesini anlar. [[K1 s. 373–383]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D77_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d77-genel">
  <h2>Metabolizma ve hücresel solunum</h2>
  <p class="intro">Metabolizma canlıdaki bütün biyokimyasal tepkimelerdir: küçük molekülden büyüğünü kuran <b>anabolizma</b> ve büyüğü parçalayıp enerji çıkaran <b>katabolizma</b>. [[K1 s. 373]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Üç besin, tek ortak yol</h3></div>
    <div data-viz="f77_harita"></div>
    <p class="viz-cap" aria-live="polite"><b>Glukoz.</b> Sitoplazmada glikolizle piruvata, mitokondride asetil-KoA'ya döner; glikoliz aerobik ve anaerobik koşulda yürür. Başka bir besine dokunun. [[K1 s. 373]]</p>
    <p class="viz-foot">Şematik harita; ara ürünler yalnız ana durak olarak gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Hücresel solunum</b>, karbonhidrat, yağ ve proteinin bir dizi redoks tepkimesiyle ATP'ye dönüştürüldüğü katabolik süreçtir; son oksitleyici O₂'dir. O₂ doğrudan kullanılamayacak kadar reaktif olduğundan elektronları ara taşıyıcılar aktarır: <b>NAD⁺</b> (nikotinamid adenin dinükleotit) ve <b>FAD</b> (flavin adenin dinükleotit). [[K1 s. 373]]</p>
    <p>Dört aşama vardır: <b>glikoliz</b> (glukoz → piruvat), <b>lipoliz</b> (serbest yağ asidi → asetil-KoA), <b>protein yıkımı</b> (oksidatif deaminasyonla keto asit; amino grubu üre döngüsüne) ve hepsinin ulaştığı <b>sitrik asit döngüsü</b>. Döngünün NADH, FADH₂ ve H⁺'sini mitokondri iç zarındaki <b>elektron taşıma zinciri</b> O₂'ye aktarır; açığa çıkan enerjiyle pompalanan H⁺ gradyanı ATP yapar. [[K1 s. 373]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-glikoliz">
  <h2>Glikoliz</h2>
  <p class="intro">Glikoliz (Embden–Meyerhof yolu) sitoplazmada glukozu iki piruvata çevirir ve net iki ATP, iki NADH verir. [[K1 s. 373]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Glukozdan piruvata: harcanan ve kazanılan ATP</h3></div>
    <div data-viz="f77_glikoliz"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Fosforilasyon.</b> Glukoz bir ATP harcanarak glukoz-6-fosfata, glukozun "etkin" biçimine döner: karaciğerde glukokinaz, öteki dokularda heksokinaz. İleri düğmesine basın. [[K1 s. 373]]</p>
    <p class="viz-foot">Basitleştirilmiş yol; yedi ara üründen yalnız ana duraklar çizilir. Toplam denklem: C₆H₁₂O₆ + 2 NAD⁺ + 2 ADP + 2 Pᵢ → 2 piruvat + 2 H⁺ + 2 ATP + 2 H₂O + 2 NADH (kitapta NAD⁺ katsayısı 1 yazılmış; doğrusu 2). [[K1 s. 374]]</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Glukozu hemen fosforlamak sitoplazmadaki glukozu düşük tutar; böylece hücre dışından içeri difüzyon gradyanı korunur. Glukoz-6-fosfat glikojenin glikojen fosforilazla yıkımından da gelir. Altı karbonlu molekül yedi ara üründen geçip iki üç karbonlu piruvata bölünür; yolda bir ATP daha harcanır, dört ATP kazanılır. O₂ tüketilmez, CO₂ üretilmez. [[K1 s. 373–374]]</p>
    <p>Glikolizin sürmesi için NAD⁺ gerekir; aerobik ve anaerobik koşulun ayrıldığı yer burasıdır. <b>Aerobik</b> koşulda NADH elektronlarını mitokondri duvarı boyunca NAD⁺ ya da FAD ile değiş tokuş eder, piruvat mitokondriye girip döngüye katılır. <b>Anaerobik</b> koşulda zincir çalışmaz; piruvat <b>laktat dehidrojenazla</b> laktata indirgenir ve NAD⁺ yenilenir. Laktat, PO₂ düzelince piruvata geri oksitlenir ya da dolaşımla karaciğere gidip piruvata ya da glukoneogenezle glukoza döner: <b>Cori döngüsü</b>. Karaciğeri olmayan maya NAD⁺'yı fermantasyonla, laktatı etanole çevirerek yeniler. [[K1 s. 374]]</p>
    <p>Ara ürün <b>1,3-bisfosfogliserat</b>, deoksihemoglobine sıkı bağlanan <b>2,3-DPG</b>'ye izomerleşir. PO₂ düşünce O₂'ye duyarlı fosfofruktokinaz glikolizi hızlandırır; artan 2,3-DPG O₂'nin Hb'den bırakılmasını kolaylaştırır (Bölüm 8). [[K1 s. 375]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-laktik">
  <h2>Klinik önem: laktik asidoz</h2>
  <p class="intro">Laktik asidoz çoğunlukla bölgesel ya da genel O₂ sunumunun azalmasından doğar, ama tek nedeni bu değildir. [[K1 s. 375]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Laktat nerede birikir? Üretim ve temizlenme</h3></div>
    <div data-viz="f77_laktik"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> Dokuda oluşan laktatı karaciğer alır ve glukoneogenezde kullanır: üretim ile temizlenme dengede. Bir neden seçin. [[K1 s. 375]]</p>
    <p class="viz-foot">Akış genişlikleri nitel; kitap laktat değeri vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Azalmış O₂ sunumu:</b> ekstremite ve mezenter iskemisi, kardiyak arrest, ağır şok (septik, kardiyojenik vb.). <b>Azalmış laktat temizlenmesi:</b> karaciğer ya da böbrek işlev bozukluğu; biguanid <b>metformin</b> hepatik glukoneogenezi azaltır, karaciğerin laktat alımı düşer ve asidoz ağırlaşır. <b>Sitotoksik hipoksi:</b> siyanür gibi zehirler zinciri durdurur; hücre O₂'yi kullanamaz ve ATP için glikolize kalır. [[K1 s. 375]]</p>
    <p>Tedavi tanı ve nedenin düzeltilmesidir: cerrahi ya da organ desteği (O₂, sıvı, inotrop, hemofiltrasyon vb.). Derin asidoza bağlı kardiyovasküler bozulma ya da eşlik eden ağır hiperkalemi varsa nadiren sodyum bikarbonat verilir. [[K1 s. 375]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-krebs">
  <h2>Sitrik asit döngüsü</h2>
  <p class="intro">Sitrik asit (Krebs, trikarboksilik asit) döngüsü mitokondri matriksinde asetil grubunu CO₂'ye yakar ve enerjiyi NADH ile FADH₂'ye yükler. [[K1 s. 375]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Döngüyü bir tur çevirin: karbon sayısını izleyin</h3></div>
    <div data-viz="f77_krebs"></div>
    <p class="viz-cap" aria-live="polite"><b>Giriş.</b> Piruvat (3C), KoA-SH ve NAD⁺ ile asetil-KoA'ya (2C) döner; bir CO₂ ve bir NADH çıkar. İleri düğmesine basın. [[K1 s. 375–376]]</p>
    <p class="viz-foot">Şematik döngü: sekiz ara ürün adlandırılır. Giriş tepkimesinin ürünleri döngü sayacından ayrıdır; geniş ve dar ekranda dikdörtgen halka kullanılır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Döngünün başlıca yakıtı <b>asetil-KoA</b>'dır: iki karbonlu asetil grubu, B vitamininden türeyen koenzim A taşıyıcısına bağlıdır. Asetil-KoA piruvattan ya da yağ asitlerinin β-oksidasyonundan gelir; amino asit deaminasyonundan doğan keto asitler gibi başka maddeler döngüye farklı noktalardan girer. [[K1 s. 375]]</p>
    <p>Asetil-KoA (2C) oksaloasetatla (4C) birleşip sitratı (6C) yapar; sitrat döngünün başlangıcıdır ve geleneksel olarak saat 12'de çizilir. Sitrat bir ara ürün üzerinden α-ketoglutarata (5C), o da KoA ile süksinil-KoA'ya (4C) dekarboksile olur; her adımda bir NADH ve bir CO₂ çıkar. Süksinil-KoA'dan oksaloasetata dek karbon 4'te kalır, CO₂ çıkmaz; bu kısım birer ATP, NADH ve FADH₂ verir. [[K1 s. 375]]</p>
    <p>Her asetil grubu için toplam: asetil-KoA + 3 NAD⁺ + FAD + ADP + Pᵢ + 2 H₂O → KoA-SH + 3 NADH + FADH₂ + 3 H⁺ + ATP + 2 CO₂. Döngü O₂ tüketmez ama NAD⁺ ve FAD'ı yenileyen zincir O₂'ye bağlı olduğundan mitokondriyal <b>PO₂ &lt; 0,4 kPa</b>'da durur. [[K1 s. 375]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-etz">
  <h2>Elektron taşıma zinciri ve oksidatif fosforilasyon</h2>
  <p class="intro">Zincir, mitokondri iç zarının iç yüzündeki beş protein kompleksidir: elektronları NADH ve FADH₂'den O₂'ye aktarır, bu enerjiyle H⁺ pompalar ve geri dönen H⁺ ile ATP yapar. [[K1 s. 376]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Elektron akışı, H⁺ gradyanı, ATP sentazı</h3></div>
    <div data-viz="f77_etz"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal (eşleşmiş).</b> NADH elektronlarını kompleks I'e, FADH₂ kompleks II'ye verir; koenzim Q III'e, sitokrom c IV'e taşır; IV elektronları O₂'ye verip su yapar. Pompalanan H⁺ kompleks V'ten dönerek ATP üretir. Durumu değiştirin. [[K1 s. 376–377]]</p>
    <p class="viz-foot">Şematik zar kesiti: iki sıra aynı iç zardır, matriks aradadır, zarlar arası boşluk dışta; pompalanan H⁺ sayısı temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Koenzim Q</b> (ubikinon) elektronları kompleks I ve II'den III'e, <b>sitokrom c</b> III'ten IV'e taşır. <b>Kompleks IV</b> (sitokrom c oksidaz) elektronları O₂'ye verip su oluşturur; <b>siyanür</b> onun hem grubuna bağlanıp O₂ bağlanmasını engeller. Elektron aktarımında açığa çıkan enerji H⁺'yı matriksten zarlar arası boşluğa pompalar ve elektrokimyasal gradyan doğar. [[K1 s. 376]]</p>
    <p>Son aşama ATP sentezidir: <b>kompleks V</b> (ATP sentaz) iç zarda bir kanaldır; H⁺ buradan matrikse dönerken ATP yapılır. Buna <b>oksidatif fosforilasyon</b> denir ve normalde <b>eşleşmiştir</b>. Kahverengi yağ dokusunda açılan kanallar H⁺'yı kompleks V'i atlatarak geri getirir: <b>ayrışma</b> (uncoupling); enerji ATP yerine ısıya döner, yenidoğanda önemli bir termogenez yoludur. Zincirde bir NADH 3 ATP, bir FADH₂ 1 ATP verir. [[K1 s. 376–377]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-atp">
  <h2>Bir glukozdan kaç ATP?</h2>
  <p class="intro">Anaerobik metabolizma bir glukozdan 2 ATP, aerobik metabolizma 36 ATP çıkarır. [[K1 s. 377–378]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>ATP defteri: aşama aşama toplayın</h3></div>
    <div data-viz="f77_atp"></div>
    <p class="viz-cap" aria-live="polite"><b>Glikoliz.</b> Bir glukoz 2 ATP, 2 piruvat ve 2 NADH verir. O₂ yoksa defter burada kapanır: 2 NADH kullanılamaz, verim 2 ATP. İleri düğmesine basın. [[K1 s. 377]]</p>
    <p class="viz-foot">Kitabın dönüşüm katsayıları: NADH = 3 ATP, FADH₂ = 1 ATP [[K1 s. 377–378]]. Klasik öğretide FADH₂ 2 ATP sayılır; ölçülen P/O oranlarıyla (NADH ≈ 2,5, FADH₂ ≈ 1,5) gerçek verim ≈ 30–32 ATP'dir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Her piruvat asetil-KoA'ya dönerken bir NADH, döngüde her asetil-KoA 3 NADH, 1 FADH₂ ve 1 ATP verir. Toplam 4 ATP, 10 NADH ve 2 FADH₂ eder; zincirde 10 × 3 + 2 × 1 = 32 ATP eklenir ve sonuç 36 ATP'dir. [[K1 s. 377–378]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-yag">
  <h2>Yağ metabolizması: lipoliz ve β-oksidasyon</h2>
  <p class="intro">Yağ, aynı kütledeki karbonhidrat ya da proteinin iki katından çok ATP verir; yağ asitleri mitokondride β-oksidasyonla iki karbonluk asetil-KoA parçalarına ayrılır. [[K1 s. 378]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Trigliseritten asetil-KoA'ya</h3></div>
    <div data-viz="f77_yag"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Lipoliz.</b> Yağ dokusundaki trigliserit lipazlarla üç serbest yağ asidine ve gliserole ayrılır; yağ asitleri albümine bağlı dolaşır, gliserol karaciğere gider. İleri düğmesine basın. [[K1 s. 378–379]]</p>
    <p class="viz-foot">Şematik; 12 karbonlu örnekte taşıyıcı sayıları aşağıdaki nota göre düzeltilmiştir. Albüminle taşıma yağ asitlerine aittir; gliserol için kitaptaki albümin oku kullanılmaz. ≈ 100 ATP klasik yaklaşık hesaptır, önceki şeklin 3/1 katsayılarıyla birleştirilmez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yağ asitleri, gliserolle esterleşmiş üç yağ asidi olan <b>trigliserit</b> biçiminde depolanır. Gliserol karaciğerde glukoneogenezle glukoza döner, dolaşımdaki glukozu hücreler ATP için kullanır. Kısa ve orta zincirli yağ asitleri mitokondriye doğrudan girer; uzun zincirliler önce koenzim A ile etkinleşir (yağ açil-KoA), sonra <b>karnitin mekiği</b> ile iç zarı geçer; karnitin geri döner. Matrikste her β-oksidasyon turu bir iki karbonluk parçayı asetil-KoA olarak koparır; asetil-KoA döngüye girer. [[K1 s. 378–379]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Kitabın şekli 12 karbonlu yağ asidi için 7 NADH ve 7 FADH₂ yazar; beş β-oksidasyon turu 6 asetil-KoA, 5 NADH ve 5 FADH₂ verir. Yaklaşık 100 ATP sonucu klasik katsayılarla (≈ 95) yine kabaca doğrudur.</div>
</section>

<section class="wrap blk ders-sec" id="d77-keton">
  <h2>Klinik önem: keton cisimleri ve dokuların yakıtı</h2>
  <p class="intro">Karbonhidrat azaldığında (açlık) ya da hücreye giremediğinde (DKA) asıl enerji kaynağı yağ olur; mitokondride biriken asetil-KoA'dan keton cisimleri doğar. [[K1 s. 378]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hangi doku ne yakıyor?</h3></div>
    <div data-viz="f77_yakit"></div>
    <p class="viz-cap" aria-live="polite"><b>Tokluk.</b> Beyin yalnız glukoz, kalp çoğunlukla yağ asidi, eritrosit yalnız glukoz (glikoliz) kullanır; keton cisimleri yok denecek kadar azdır. Durumu değiştirin. [[K1 s. 378]]</p>
    <p class="viz-foot">Oranlar nitel; kitabın tek sayısı uzun açlıkta beynin enerji gereksiniminin %70'e dek keton cisimlerinden karşılanmasıdır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Asetil-KoA yükselince iki molekülü kendiliğinden yoğunlaşıp keton cisimlerini yapar: <b>aseton, asetoasetik asit, β-hidroksibütirik asit</b>. Açlıkta olağandır, diyabetik ketoasidozda patolojiktir. Kitaba göre karaciğer keton cisimlerini asetil-KoA'ya geri çevirip döngüye sokar; kalp açlıkta yağ asidinin yanında keton kullanır; beyin normalde yağ asidi kullanmaz, açlıkta ketona uyum sağlar. Mitokondrisi olmayan eritrosit glikolize bağımlıdır, keton kullanamaz. [[K1 s. 378]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Karaciğer keton cisimlerini yapar ama kullanamaz: asetoasetatı yeniden etkinleştiren enzim (süksinil-KoA:3-ketoasit KoA transferaz) karaciğerde yoktur. Ketonları yakan başlıca dokular beyin, kalp, iskelet kası ve böbrektir.</div>
</section>

<section class="wrap blk ders-sec" id="d77-protein">
  <h2>Protein yıkımı</h2>
  <p class="intro">Protein vücudun yapı taşıdır; enerji için yalnız amino asit bolken ya da açlıkta kullanılır ve verimsizdir: 1 g karbonhidratın enerjisi için 1,75 g protein gerekir. [[K1 s. 378]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Amino grubunu çıkarmanın iki yolu</h3></div>
    <div data-viz="f77_protein"></div>
    <p class="viz-cap" aria-live="polite"><b>Oksidatif deaminasyon.</b> Karaciğerde deaminazlar amino grubunu koparır: keto asit ve amonyak (NH₃) çıkar. Yolu değiştirin. [[K1 s. 378]]</p>
    <p class="viz-foot">Şematik; amino asit iskeleti tek blokla gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Protein önce amino asitlerine yıkılır; amino asit ancak amino grubu çıkarılınca işe yarar. <b>Oksidatif deaminasyonun</b> keto asidi döngüye girer: enerji, glukoneogenez ya da başka bir amino asit veya yağ asidi sentezi için kullanılır. Toksik NH₃, <b>üre (ornitin) döngüsünde</b> toksik olmayan üreye çevrilir; her üre için 3 ATP harcanır. Glutamat ise böbrekte de deamine edilir ve NH₃'ü hemen idrara atılır: üre döngüsüne enerji harcamadan. [[K1 s. 378]]</p>
    <p><b>Transaminasyonda</b> aminotransferazlar amino grubunu bir keto aside ya da başka bir amino aside aktarıp yeni bir amino asit yapar. Dokuz <b>esansiyel amino asit</b> böyle yapılamaz, besinle gelmelidir: fenilalanin, valin, treonin, triptofan, izolösin, metiyonin, lösin, lizin, histidin. [[K1 s. 378]] [[K1 s. 380]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-depo">
  <h2>Karbonhidrat, yağ ve protein nasıl depolanır?</h2>
  <p class="intro">İnsan aralıklı yer ama ATP'yi sürekli üretmelidir; bu yüzden besin depolanır ve yavaş yavaş salınır. [[K1 s. 380]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Glikojenez ve glikojenoliz: karaciğer ve kas</h3></div>
    <div data-viz="f77_depo"></div>
    <p class="viz-cap" aria-live="polite"><b>Tokluk (insülin).</b> Glukoz → glukoz-6-fosfat → glukoz-1-fosfat (fosfoglukomutaz) → glikojen (glikojen sentaz); insülin bu enzimi artırır. Durumu değiştirin. [[K1 s. 380–381]]</p>
    <p class="viz-foot">Şematik; depo miktarları kitabın yuvarlak değerleridir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Glikojen</b>, bitkideki nişastaya benzeyen bir glukoz polimeridir. Karaciğerde ≈ 100 g bulunur, glukoz olarak dolaşıma verilir ve plazma glukozunu yalnız ≈ 24 saat korur; sonra glukoneogenez öne geçer. Kasta ≈ 200 g vardır ama dolaşıma verilemez, yalnız kasın içinde kullanılır. Glukoz düşünce glikojen fosforilaz glikojeni yıkar (<b>glikojenoliz</b>); bunu glukagon ve adrenalin, iskelet kasında büyüme hormonu uyarır. Yeniden oluşan glukoz-6-fosfat glikolize ya da pentoz fosfat yoluna gider; glukoz-6-fosfataz yalnız karaciğerde olduğundan kan glukozuna dönüş yalnız orada olur. [[K1 s. 380–381]]</p>
    <p><b>Trigliserit</b> vücudun ana enerji deposudur, çoğu yağ hücresindedir. Besindeki trigliseridi enterositler <b>şilomikronlara</b> paketler; şilomikronlar dokulara ekzojen trigliserit bırakır, fazlası yağ dokusuna gider (Bölüm 64). Karaciğer de trigliserit yapar (<b>lipogenez</b>): yemekten sonra insülin yüksektir, glikojen deposu dolunca fazla karbonhidrat ve amino asit yağ asidi ile gliserole çevrilip esterleşir ve <b>VLDL</b> olarak dolaşıma verilir; VLDL dokulara endojen trigliserit dağıtır. <b>Protein</b> yapısaldır, ama kas açlıkta yıkılabilecek bir amino asit deposudur. [[K1 s. 380]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-glukoneo">
  <h2>Glukoneogenez</h2>
  <p class="intro">Glukoneogenez, glukozu karbonhidrat olmayan öncüllerden enerji harcayarak kuran anabolik yoldur; plazma glukozunun fazla düşmesini glikojenolizle birlikte önler. [[K1 s. 380]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hangi öncül nereden girer?</h3></div>
    <div data-viz="f77_glukoneo"></div>
    <p class="viz-cap" aria-live="polite"><b>Laktat.</b> Kastan ve eritrositten gelen laktat karaciğerde piruvata, oradan oksaloasetata ve glukoza döner: Cori döngüsü. Başka bir öncüle dokunun. [[K1 s. 374]] [[K1 s. 380]]</p>
    <p class="viz-foot">Şematik; yol glikolizin tersi olarak değil, oksaloasetattan başlayan ayrı bir yol olarak çizilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Çoğu karaciğerde, az bir kısmı böbrekte olur. Karaciğerin enerji harcayıp başka dokuların yakacağı glukozu yapması garip görünebilir; ama beyin çoğunlukla, eritrosit tamamen glukoza bağımlıdır. Substratlar: laktat, piruvat, gliserol, amino asitler ve döngünün bütün ara ürünleri. Yol glikolizin tersi değil, ayrı bir yoldur; dört karbonlu <b>oksaloasetattan</b> başlar. Glukoz düşünce salınan <b>glukagon</b> yolu yönetir; <b>metformin</b> glukoneogenezi inhibe ederek etki eder. [[K1 s. 380–381]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-ppp">
  <h2>Pentoz fosfat yolu</h2>
  <p class="intro">Pentoz fosfat yolu (heksoz monofosfat şantı) iki iş yapan anabolik bir karbonhidrat yoludur: nükleik asit için pentoz şekerleri ve hücre içi indirgeme tepkimeleri için NADPH üretir. [[K1 s. 381]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>G6PD kapısı: NADPH'tan Fe²⁺'ya</h3></div>
    <div data-viz="f77_ppp"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal G6PD.</b> NADP⁺ yükselince G6PD etkinleşir, glukoz-6-fosfat yola girer; NADPH glutatyonu indirger, glutatyon Hb'yi Fe²⁺ durumunda tutar. Durumu değiştirin. [[K1 s. 381]]</p>
    <p class="viz-foot">Şematik; kitabın tek sayısı hücrenin NADPH gereksiniminin ≈ %60'ı.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yol glukozun etkin biçimi glukoz-6-fosfatla başlar. Molekülün glikolize mi bu yola mı gideceğini ilk adımın enzimi <b>glukoz-6-fosfat dehidrogenaz (G6PD)</b> belirler; NADP⁺ yükseldikçe daha etkindir. Yol hücrenin NADPH'ının ≈ %60'ını sağlar; NADPH reaktif oksijen türlerinin hasarını önleyen antioksidan <b>glutatyonu</b> indirger (Bölüm 24). <b>G6PD eksikliğinde</b> yol kullanılamaz, indirgeme gücü kaybolur ve metHb (Fe³⁺) oluşumuna yatkınlık doğar (Bölüm 8). [[K1 s. 381]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-hormon">
  <h2>İnsülin ve glukagon</h2>
  <p class="intro">Dinlenmede plazma glukozu 3,5–5,5 mmol/L'de sıkı tutulur: insülin düşürür, glukagon yükseltir. [[K1 s. 381]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kan şekerine göre iki hormon ve hedefleri</h3></div>
    <div data-viz="f77_hormon"></div>
    <p class="viz-cap" aria-live="polite"><b>Glukoz 4,5 mmol/L.</b> Normal aralıkta iki hormon dengede. Kaydırıcıyla glukozu değiştirin. [[K1 s. 381]]</p>
    <p class="viz-foot">Şematik; hormon çubukları nitel, bir salınım denklemi veya mutlak aç/kapa modeli değildir. Kitap yalnız 3,5–5,5 mmol/L aralığını verir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>İnsülin</b> vücudun ana anabolik hormonudur; pankreasta Langerhans adacıklarının β-hücrelerinde yapılan bir peptittir. Öncülü <b>proinsülin</b>, iki disülfit köprüsüyle bağlı A ve B zincirleri ile C-peptitten oluşur; endopeptidazlar C-peptidi kesince insülin oluşur ve serbest C-peptitle aynı veziküllerde bekler. Ekzositozun başlıca tetikleyicisi plazma glukozunun artmasıdır. Salınım <b>iki evrelidir</b>: önce hazır insülinli veziküller boşalır ve plazma insülini hızla yükselir; veziküller bitince β-hücreleri insülini yapıldıkça salar. Sempatik sinirler doğrudan α2 ile salınımı inhibe eder; kitap, adrenal medulladan salınan adrenalinin β2 ile salınımı artırdığını ve bunun egzersizde (kas glukozu insüline bağımlı GLUT-4 ile alır) önemli olduğunu yazar. Atlas notu: β2 etkisi vardır, ama dolaşımdaki adrenalinin net etkisi α2 baskınlığıyla çoğunlukla baskılamadır; egzersizde plazma insülini düşer. [[K1 s. 381–382]]</p>
    <p>İnsülinin üç ana etkisi: <b>glukoz alımı</b> (GLUT-4: yağ dokusu, iskelet kası, kalp; beyindeki GLUT-1 ve karaciğerdeki GLUT-2 insüline bağımlı değil); <b>depolama</b> (hepatik glikojenez, karaciğerde yağ asidi sentezi, yağ dokusunda esterleşme); <b>endojen glukoz yapımının baskılanması</b> (lipoliz, glikojenoliz, glukoneogenez). İnsülin amino asit alımını (protein sentezi) ve K⁺ alımını da artırır. K⁺ etkisi yemek sonrası hiperkalemiye karşı ileri beslemedir: glukoz artışı beslenmeyi ve K⁺ gelişini haber verir; hiperkalemide insülin–dekstroz infüzyonu bunu kullanır. [[K1 s. 382]]</p>
    <p><b>Glukagon</b> α-hücrelerinin peptididir. Kitaba göre α-hücrelerinde glukoz algılayıcı yoktur; salınımı hipoglisemiyle artan otonom etkinlik ve dolaşımdaki adrenalin uyarır; insülin, somatostatin ve yüksek serbest yağ asidi ile keton düzeyi inhibe eder. Glukagon glukoneogenezi ve glikojenolizi artırır, karaciğerde glikolizi baskılar (ara ürünler glukoneogeneze kalır). Açlıkta özellikle önemlidir, çünkü beyin glukoza çok bağımlıdır (Bölüm 78). [[K1 s. 382–383]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-dka">
  <h2>Klinik önem: diyabetik ketoasidoz</h2>
  <p class="intro">Tip 1 diyabette β-hücrelerinin otoimmün yıkımı mutlak insülin eksikliği yapar; dışarıdan verilen insülin yetmezse (akut hastalık, tedaviye uyumsuzluk) DKA gelişir. [[K1 s. 382]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İnsülin eksikliğinden Kussmaul solunumuna</h3></div>
    <div data-viz="f77_dka"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · İnsülin yetmez.</b> Hücrelere glukoz alımı azalır, hepatik glikojenoliz ve glukoneogenez artar: plazma glukozu yükselir. İleri düğmesine basın. [[K1 s. 382]]</p>
    <p class="viz-foot">Şematik zincir; kitap DKA için sayı vermez. K⁺ kaybı ile plazma K⁺ düzeyi aynı şey değildir; şekilde hipokalemi olası sonuç olarak gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Düşük insülin lipoliz ve β-oksidasyonu açar; karaciğerde asetil-KoA yükselir ve keton cisimleri yapılır. Hiperglisemi <b>ozmotik diürezle</b> belirgin hipovolemi ve renal elektrolit kaybı yapar; özellikle belirgin <b>hipokalemi</b> gelişebilir. Ketonlar asidemi doğurur; karotis cisimleri solunum merkezini uyarır, VT artar: <b>Kussmaul solunumu</b>. Ağır hipovolemide laktik asit asidozu ağırlaştırır. Paradoks: plazma glukozu yüksekken GLUT-4 çalışmadığı için hücrelerin çoğu glukoz açlığındadır. [[K1 s. 382]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-bmh">
  <h2>Bazal metabolizma hızı ve metabolik eşdeğer</h2>
  <p class="intro">Bazal metabolizma hızı (BMH), zihinsel ve fiziksel dinlenmede, rahat bir ortamda, yemekten 12 saat sonra birim zamanda harcanan enerjidir; yaş ve vücut yüzey alanına göre düzeltilir. [[K1 s. 383]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>BMH'yi oynatan etkenler ve MET merdiveni</h3></div>
    <div data-viz="f77_bmh"></div>
    <p class="viz-cap" aria-live="polite"><b>Erişkin BMH.</b> ≈ 200 kJ m⁻² sa⁻¹ (40 kcal m⁻² sa⁻¹). Bir etken seçin ya da MET merdivenine geçin. [[K1 s. 383]]</p>
    <p class="viz-foot">Şematik; yalnız kitabın verdiği büyüklükler yazılır (gebelik %20, yenidoğan ≈ 2 kat, yaş %2/on yıl). Kitaptaki 200 kJ ve 40 kcal değerleri tam birim eşdeğeri değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Artıranlar:</b> egzersiz; stres dahil yüksek katekolamin; hipertiroidi (tiroit hormonları bazal hızın ana düzenleyicisi); gebelik (fetüs ve plasenta metabolizması, uterus ve meme büyümesiyle ≈ %20) ve emzirme (süt yapımı; emzirme doğum sonrası kilo kaybı için önerilir); yüksek ya da düşük ortam sıcaklığı ve ateş; yemek (büyük yemekten sonra 6 saat, çoğu karaciğerde amino asitlerin oksidatif deaminasyonundan); çocukluk (büyüme ve ısı düzenleme; yenidoğanda erişkinin ≈ 2 katı, Bölüm 84). <b>Azaltanlar:</b> hipotiroidi; açlık (yağ ve protein depolarını korumak için); yaş (on yılda ≈ %2). Eskiden kadında düşük sanılırdı; yağsız vücut kütlesi hesaba katılınca cinsiyet farkı yoktur. [[K1 s. 383]]</p>
    <p><b>MET</b> bir etkinliğin enerji maliyetini BMH'nin katları olarak verir: 1 MET uyanık, dinlenmede ve 12 saatten uzun açken; 3 MET düz yolda orta hızda yürüme; 4 MET durmadan iki kat merdiven çıkma; 8 MET hafif koşu; 10 MET ağır egzersiz. Ameliyat öncesi değerlendirmede 4 MET'in altındaki fonksiyonel kapasite zayıf fizyolojik rezerv ve daha yüksek perioperatif kardiyak olay riski demektir (Bölüm 43). [[K1 s. 383]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: glikolizin yeri, enzimleri ve verimi, aerobik–anaerobik ayrımı ve laktatın yazgısı, 2,3-DPG, laktik asidozun nedenleri, döngünün karbon sayıları ve 0,4 kPa eşiği, kompleksler ve siyanür, ayrışma, 36 ve 2 ATP, karnitin mekiği, keton cisimleri ve eritrosit, protein yıkımı ve esansiyel amino asitler, glikojen depoları, glukoneogenez ve metformin, G6PD, insülin salınımı ve GLUT tipleri, glukagon, DKA, BMH etkenleri ve 4 MET eşiği. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz77-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz77-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz77-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d77-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Bir glukoz molekülünden ATP nasıl elde edilir? Septik şoktaki bir hastada laktat neden yükselir, başka hangi nedenler laktik asidoz yapar?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Hücresel solunum: besinlerin redoks tepkimeleriyle ATP'ye yıkımı; son oksitleyici O₂, ara taşıyıcılar NAD⁺ ve FAD. [[K1 s. 373]]</li>
    <li><b>Glikoliz.</b> Sitoplazma; glukokinaz/heksokinaz; 2 ATP harcanır, 4 kazanılır: net 2 ATP, 2 NADH, 2 piruvat; O₂ tüketmez. [[K1 s. 373–374]]</li>
    <li><b>Aerobik yol.</b> Piruvat → asetil-KoA (NADH, CO₂); döngüde her asetil-KoA 3 NADH, 1 FADH₂, 1 ATP, 2 CO₂; PO₂ &lt; 0,4 kPa'da durur. [[K1 s. 375]]</li>
    <li><b>Zincir.</b> I, II → Q → III → sitokrom c → IV → O₂; H⁺ gradyanı ve kompleks V; NADH 3, FADH₂ 1 ATP; toplam 36 ATP. [[K1 s. 376–378]]</li>
    <li><b>Anaerobik yol.</b> NAD⁺ yenilenmesi için LDH ile piruvat → laktat; verim 2 ATP; laktat karaciğerde piruvata ya da glukoza (Cori). [[K1 s. 374]] [[K1 s. 377]]</li>
    <li><b>Laktik asidoz.</b> Azalmış O₂ sunumu (şok, iskemi, arrest); azalmış temizlenme (karaciğer, böbrek, metformin); sitotoksik hipoksi (siyanür, kompleks IV). [[K1 s. 375–376]]</li>
    <li><b>Tedavi.</b> Neden: kaynak kontrolü, O₂, sıvı, inotrop, hemofiltrasyon; bikarbonat yalnız derin asidozla kardiyovasküler bozulma ya da ağır hiperkalemide. [[K1 s. 375]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Solda sitoplazma kutusu: glukoz → G6P → 2 piruvat (−2 / +4 ATP, 2 NADH), aşağı dal LDH → laktat. Sağda mitokondri: asetil-KoA, saat 12'de sitratla başlayan döngü (6C → 5C → 4C, iki CO₂), altına iç zarda I–V kompleksleri, H⁺ okları ve ATP sentaz. Kenara defter: 4 ATP + 10 × 3 + 2 × 1 = 36. [[K1 s. 374–377]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> 2,3-DPG nereden gelir? Siyanür neden laktat yükseltir? Ayrışma nedir, yenidoğanda neden önemli? Eritrosit neden keton kullanamaz? Kas glikojeni neden kan glukozuna katkı vermez? İnsülin K⁺'yı nasıl düşürür? DKA'da neden hipokalemi ve Kussmaul solunumu olur? Hangi etkenler BMH'yi değiştirir, 4 MET neden önemli? [[K1 s. 375–383]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d77-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Katabolizmanın dört basamağı (glikoliz, lipoliz, protein yıkımı, sitrik asit döngüsü) elektron taşıma zincirinde birleşir; O₂ son elektron alıcısıdır. [[K1 s. 373]]</li>
    <li>Glikoliz sitoplazmada O₂'siz yürür; NAD⁺ aerobik koşulda mitokondriyle değiş tokuşla, anaerobik koşulda laktat yapımıyla yenilenir. [[K1 s. 373–374]]</li>
    <li>Laktik asidozun üç kökü: O₂ sunumu azalması, temizlenme azalması (karaciğer, böbrek, metformin), sitotoksik hipoksi (siyanür). [[K1 s. 375]]</li>
    <li>Döngü 6C → 5C → 4C ile iki CO₂ çıkarır, asetil başına 3 NADH, 1 FADH₂, 1 ATP verir ve PO₂ &lt; 0,4 kPa'da durur. [[K1 s. 375]]</li>
    <li>Kompleks IV'ü siyanür bloke eder; kahverengi yağda ayrışma ısı üretir; aerobik verim 36, anaerobik 2 ATP. [[K1 s. 376–378]]</li>
    <li>Uzun zincirli yağ asidi karnitin mekiğiyle girer; asetil-KoA birikince keton cisimleri doğar; beyin uzun açlıkta enerjisinin %70'e dek ketondan alır, eritrosit yalnız glukoz kullanır. [[K1 s. 378]]</li>
    <li>Karaciğer glikojeni ≈ 100 g (≈ 24 sa), kas ≈ 200 g (dolaşıma verilmez); glukoneogenez oksaloasetattan başlar, glukagonla açılır, metforminle baskılanır; G6PD eksikliği metHb'ye yatkınlık yapar. [[K1 s. 380–381]]</li>
    <li>İnsülin iki evrede salınır, GLUT-4'ü çalıştırır ve K⁺'yı hücreye sokar; yokluğu DKA'da hiperglisemi, ketoz, hipokalemi ve Kussmaul solunumu yapar. BMH ≈ 40 kcal m⁻² sa⁻¹; 4 MET altı zayıf rezervdir. [[K1 s. 381–383]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="77"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/76">← Bölüm 76 · Plazma bileşenleri</a>
    <a href="#/dersler/fizyoloji/78">Sonraki: Bölüm 78 · Açlık →</a>
  </nav>
</section>`,
};
