VERI.sorular = VERI.sorular || {};
VERI.sorular['far15a-1'] = {
  no: 1, kagit: 'Paper A · Farmakoloji', kok: 'Aksiyon potansiyeli ve aritmi mekanizmaları', kaynak: '[[K3 s. 238–240]]',
  onermeler: [
    { t: 'SA düğümünde −40 mV’de yavaş L tipi kanallar açılır.', d: true, n: 'Bu eşikte depolarizasyonu Ca²⁺ girişi sağlar. [[K3 s. 238]]' },
    { t: 'Kontraktil hücrenin faz 2 platosunda daha güçlü bir uyarı yeni depolarizasyon başlatır.', d: false, n: 'Plato mutlak refrakter dönem içindedir. [[K3 s. 238]]' },
    { t: 'AV nodal re-entry modelinde yavaş yolun refrakter dönemi hızlı yolunkinden uzundur.', d: false, n: 'Yavaş yol daha erken toparlanır. [[K3 s. 240]]' },
    { t: 'İskemik miyokartta ardıl potansiyel eşiğe ulaşırsa taşiaritmi başlayabilir.', d: true, n: 'İskemi membran potansiyelinde eşiğe ulaşabilen salınımlar oluşturabilir. [[K3 s. 239]]' },
    { t: 'WPW’de Kent demeti AV düğüm içindedir.', d: false, n: 'Kent demeti AV düğümden ayrı bir aksesuar yoldur. [[K3 s. 240]]' },
  ],
};
VERI.sorular['far15a-2'] = {
  no: 2, kagit: 'Paper A · Farmakoloji', kok: 'Digoksinin etkileri ve toksisitesi', kaynak: '[[K3 s. 241–243]]',
  onermeler: [
    { t: 'Digoksin AV düğümün refrakter dönemini kısaltır.', d: false, n: 'Doğrudan ve vagal etkiler refrakter dönemi uzatır. [[K3 s. 241]]' },
    { t: 'Hipokalemi digoksinin kardiyak toksisitesini artırır.', d: true, n: 'Hipokaleminin düzeltilmesi toksisite tedavisinin bir parçasıdır. [[K3 s. 243]]' },
    { t: 'Digoksin kullanan kişide karakteristik ST depresyonu tek başına toksisiteyi gösterir.', d: false, n: 'Bu EKG değişikliği digoksinin toksisite olmadan görülebilen etkilerindendir. [[K3 s. 242]]' },
    { t: 'Böbrek yetmezliği digoksinin eliminasyon yarı ömrünü uzatır.', d: true, n: 'Digoksin büyük ölçüde değişmeden böbrekten atılır. [[K3 s. 242]]' },
    { t: 'Fab digoksini reseptöründen daha yüksek afiniteyle bağlar.', d: true, n: 'Bu afinite farkı digoksini etki yerinden uzaklaştırır. [[K3 s. 243]]' },
  ],
};
VERI.sorular['far15a-3'] = {
  no: 3, kagit: 'Paper A · Farmakoloji', kok: 'SVT ilaçlarının ayırt edici özellikleri', kaynak: '[[K3 s. 243–246]]',
  onermeler: [
    { t: 'Adenozin atriyal flutterı sinüs ritmine çevirir.', d: false, n: 'Flutter devresi AV düğüme bağımlı değildir ve adenozin ventrikül yanıtını yavaşlatır. [[K3 s. 243]]' },
    { t: 'Dipiridamol adenozin alımını engelleyerek etkisini artırabilir.', d: true, n: 'Alımın engellenmesi adenozinin etkisini güçlendirebilir. [[K3 s. 244]]' },
    { t: 'Verapamilin oral biyoyararlanımı ilk geçiş metabolizması nedeniyle yaklaşık %25’tir.', d: true, n: 'Bağırsaktan emilim yaklaşık %90 olsa da ilk geçiş kaybı yüksektir. [[K3 s. 245]]' },
    { t: 'Esmolol eritrosit esterazlarıyla hızla hidrolize olur.', d: true, n: 'Bu metabolizma eliminasyon yarı ömrünü 10 dakikayla sınırlar. [[K3 s. 246]]' },
    { t: 'Kinidin depolarizan kas gevşeticilerin etkisini artırır.', d: true, n: 'Hem depolarizan hem nondepolarizan gevşeticilerin etkisi artar. [[K3 s. 246]]' },
  ],
};

const A15A_NAV = [
  ['potansiyel','Aksiyon potansiyeli'], ['devre','Aritmiler'], ['sinif','Sınıflama'], ['digoksin','Digoksin'],
  ['adenozin','Adenozin'], ['verapamil','Verapamil'], ['beta','β-blokerler'], ['kinidin','Kinidin'],
  ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];

SAYFALAR['dersler/farmakoloji/15a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 15 · Ders 15a',
  baslik: 'Aritmiler, sınıflama ve supraventriküler taşiaritmi ilaçları',
  lede: 'Atriyoventriküler (AV) düğümde iletinin yavaşlaması, bu düğüme bağımlı taşikardiyi sonlandırabilir. [[K3 s. 243]] Atriyal fibrilasyonda ise aynı düğüm ventrikül hızını kontrol etmek için hedeflenir. [[K3 s. 242]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A15A_NAV.map(([id, ad],i) => `<button type="button" data-scroll="a15a-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a15a-potansiyel">
<h2>Kalbin ritmini hangi hücre belirler?</h2>
<p class="intro">Sağ atriyumdaki sinoatriyal (SA) düğüm en hızlı spontan depolarize olan dokudur ve kalp hızını belirler. [[K3 s. 238]]</p>
<div class="viz"><div class="viz-head"><h3>Düğüm potansiyelinden miyositin beş fazına</h3></div><div data-viz="a15a_potansiyel"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel eğriler, zaman ölçeği kullanılmamıştır. [[K3 s. 238–239]]</p></div>
<p>Uyarı üreten, ileten ve kasılan dokuların farklı aksiyon potansiyelleri kalbin eşgüdümlü çalışmasını sağlar. [[K3 s. 238]] Düğümde ön potansiyel yavaşça eşiğe tırmanırken kontraktil hücrenin istirahati yaklaşık −80 mV’de daha kararlıdır. [[K3 s. 238]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap faz 1’de Cl⁻ çıkışı tarif eder. Erken repolarizasyonun başlıca akımı geçici dışa doğru K⁺ akımıdır.</div>
</section>
<section class="wrap blk ders-sec" id="a15a-devre">
<h2>Uyarı nasıl bir döngüye girer?</h2>
<p class="intro">AV düğümün anatomik ve fizyolojik olarak farklı iki yolunda hızlı ileten kol geç, yavaş ileten kol erken toparlanır. [[K3 s. 240]]</p>
<div class="viz"><div class="viz-head"><h3>Normal atımdan kendi kendini sürdüren taşikardiye</h3></div><div data-viz="a15a_devre"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Oklar impuls yönünü gösterir. [[K3 s. 240]]</p></div>
<ul class="ozet">
<li><b>Re-entry.</b> Aksiyon potansiyelini refrakter dönem izler ve geri dönen impuls toparlanmış dokuyu bulursa döngü ektopik odak gibi davranabilir. [[K3 s. 239–240]] Wolff–Parkinson–White (WPW) sendromundaki benzer döngünün aksesuar yolu, Kent demeti, AV düğümden ayrıdır. [[K3 s. 240]]</li>
<li><b>Artmış otomatisite.</b> İskemi veya hipokalemide kontraktil dokunun istirahat potansiyeli kararsızlaşabilir ve doku SA düğümünden önce eşiğe ulaşabilir. [[K3 s. 239]]</li>
<li><b>Ardıl potansiyeller.</b> İskemik miyokartta membran potansiyelindeki salınımlar eşiğe ulaşarak taşiaritmiyi tetikleyebilir. [[K3 s. 239]]</li>
<li><b>Bradiaritmi.</b> Kitap, SA düğümünden çevre dokuya iletinin aksamasını tarif eder. [[K3 s. 240]] İkinci ve üçüncü derece blok klinik önem taşır, atropin, β uyarımı veya pacing gerekebilir. [[K3 s. 240]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a15a-sinif">
<h2>Etki mekanizması ve klinik kullanım</h2>
<p class="intro">Vaughan–Williams sınıflaması ilaçları etki mekanizmalarına göre ayırır, ancak digoksin ve adenozini kapsamaz. [[K3 s. 240–241]]</p>
<div class="viz"><div class="viz-head"><h3>Na⁺ kanalı bloke olduğunda refrakter dönem</h3></div><div data-viz="a15a_sinif"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 241]]</p></div>
<p>Sınıf I’in alt gruplarını refrakter döneme etkileri ayırır. [[K3 s. 241]] Sınıflar örtüşebilir, örneğin kitap sotalole I, II ve III. sınıf aktivite atfeder. [[K3 s. 240]]</p>
<div class="cols"><div class="card"><h3>Diğer sınıflar</h3><ul>
<li><b>II · β-adrenoseptör blokajı.</b> Propranolol, atenolol, esmolol. [[K3 s. 241]]</li>
<li><b>III · K⁺ kanal blokajı.</b> Amiodaron, bretilyum, sotalol. [[K3 s. 241]]</li>
<li><b>IV · Ca²⁺ kanal blokajı.</b> Verapamil, diltiazem. [[K3 s. 241]]</li></ul></div>
<div class="card"><h3>Kullanıma göre gruplar</h3><ul>
<li><b>Supraventriküler taşiaritmi (SVT).</b> Digoksin, adenozin, verapamil, β-blokerler, kinidin. [[K3 s. 240]]</li>
<li><b>Ventriküler taşiaritmi (VT).</b> Lidokain, meksiletin. [[K3 s. 240]]</li>
<li><b>SVT ve VT.</b> Amiodaron, flekainid, prokainamid, disopiramid, propafenon, sotalol. [[K3 s. 240]]</li>
<li><b>Digoksin toksisitesi.</b> Fenitoin. [[K3 s. 240]]</li></ul></div></div></section>
<section class="wrap blk ders-sec" id="a15a-digoksin">
<h2>Digoksin · kasılma kuvveti ve ventrikül yanıtı</h2>
<p class="intro">Digoksin miyokardın kasılma kuvvetini ve uyarılabilirliğini artırırken AV iletisini yavaşlatır. [[K3 s. 241]]</p>
<div class="viz"><div class="viz-head"><h3>Pompa, ileti dokusu ve vagal etki</h3></div><div data-viz="a15a_digoksin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 241]]</p></div>
<div class="note plain"><b>Atlas notu.</b> Kitap, Na⁺ artışının dışarıdaki Ca²⁺ ile değişimi artırdığını söyler. Hücre içi Na⁺ artınca Na⁺/Ca²⁺ değiştiricisiyle Ca²⁺ atılımı azalır ve hücrede Ca²⁺ birikir.</div>
<p>Atriyal fibrilasyonda (AF) atriyum hızı 1:1 ventrikül yanıtına izin vermez. [[K3 s. 242]] AV iletinin yavaşlatılması ventrikül hızını düşürür, koroner kan akımı için süre uzar, ventrikül doluşu ve kalp debisi artar. [[K3 s. 242]]</p>
<div class="cols"><div class="card"><h3>Preparat ve doz</h3><ul>
<li>Digitalis lanata (yüksükotu) yaprağından elde edilen glikozit, 62,5–250 µg tablet, 50 µg/ml eliksir ve 100–250 µg/ml intravenöz (İV) preparat olarak sunulur. [[K3 s. 241]]</li>
<li>İntramüsküler emilim değişkendir, enjeksiyon ağrı ve doku nekrozuyla ilişkilidir. [[K3 s. 241]]</li>
<li>Yükleme 24 saatte bölünmüş dozlarla 1,0–1,5 mg, idame günde 125–500 µg, terapötik aralık 1–2 µg/l’dir. [[K3 s. 241]]</li></ul></div>
<div class="card"><h3>Kullanım</h3><ul><li>AF ve flutterda yaygın kullanılır, normal kalpte etkisi çok azdır. [[K3 s. 241]]</li>
<li>Kalp yetmezliğinde başlangıçtaki debi artışı sürmeyebilir ve başka ilaçlar daha iyi sonuç verebilir. [[K3 s. 241]]</li>
<li>Ventriküler ekstrasistol veya VT’de artan uyarılabilirlik ventriküler fibrilasyonu tetikleyebileceğinden digoksinden kaçınılır. [[K3 s. 241]]</li></ul></div></div>
<h3>EKG değişikliği ne zaman toksisite düşündürür?</h3>
<ul class="ozet"><li><b>Beklenen EKG.</b> PR uzaması, karakteristik ST depresyonu, T düzleşmesi ve QT kısalması tek başına toksisite göstermez. [[K3 s. 242]]</li>
<li><b>Kardiyak yan etkiler.</b> Terapötik oran düşüktür ve yan etkiler sık görülür. [[K3 s. 242]] Ventriküler erken atım, bigemini, üçüncü derece dahil her tür AV blok, kavşak ritmi, atriyal veya ventriküler taşikardi gelişebilir. [[K3 s. 242]] Hipokalemi, hiperkalsemi ve pH değişikliği bunları tetikleyebilir. [[K3 s. 242]]</li>
<li><b>DC kardiyoversiyon.</b> Toksik düzeylerde şok ağır ventriküler aritmi başlatabilir. [[K3 s. 242]] Kitap elektif kardiyoversiyondan 24 saat önce digoksinin kesilmesini önerir. [[K3 s. 242]]</li>
<li><b>Kalp dışı etkiler.</b> İştahsızlık, bulantı, kusma, diyare ve letarji görülebilir. [[K3 s. 242]] Kırmızı–yeşil ayrımında bozulma dahil görme sorunları ve baş ağrısı sıktır. [[K3 s. 242]] Uzun kullanımda jinekomasti, nadiren eozinofilinin eşlik edebildiği döküntü gelişir. [[K3 s. 242]]</li></ul>
<h3>Digoksin düzeyini hangi ilaçlar değiştirir?</h3>
<ul class="ozet"><li><b>Artıranlar.</b> Amiodaron, kaptopril, eritromisin, karbenoksolon ve verapamil. [[K3 s. 242]]</li>
<li><b>Azaltanlar.</b> Antasitler, kolestiramin, fenitoin ve metoklopramid. [[K3 s. 242]]</li>
<li><b>Değişken etki.</b> Nifedipin ve diltiazem düzeyi değiştirmeyebilir veya hafifçe yükseltebilir. [[K3 s. 242]]</li></ul>
<h3>Toksisiteyi değerlendirme ve tedavi</h3>
<p>Plazmada 2,5 µg/l üzeri toksisiteyle ilişkilidir, 10 µg/l altında ağır sorunlar seyrektir. [[K3 s. 242]] Düzey ile klinik şiddet arasındaki ilişki zayıftır. [[K3 s. 242]] Kitap 30 mg üzerindeki dozları, özgül antikor fragmanı (Fab) kullanılmadığında daima ölümle ilişkilendirir. [[K3 s. 242]]</p>
<ul class="ozet"><li><b>Lavaj.</b> Vagal tonusu artırarak bradikardiyi ağırlaştırabileceği veya arreste yol açabileceği için dikkat gerektirir. [[K3 s. 243]]</li>
<li><b>Potasyum.</b> Pompa inhibisyonuyla gelişebilen hiperkalemi de kardiyak toksisiteyi artıran hipokalemi de düzeltilir. [[K3 s. 243]]</li>
<li><b>Ritim.</b> Semptomatik bradikardide katekolamin infüzyonu ek aritmileri tetikleyebildiğinden atropin veya pacing tercih edilir. [[K3 s. 243]] Ventriküler aritmide lidokain veya fenitoin kullanılabilir. [[K3 s. 243]]</li>
<li><b>Özgül Fab.</b> Düzeyin 20 µg/l’yi aşması, yaşamı tehdit eden aritmi veya kontrol edilemeyen hiperkalemi endikasyondur. [[K3 s. 243]] IgG fragmanı digoksini reseptöründen daha güçlü bağlayarak etki yerinden uzaklaştırır. [[K3 s. 243]] İnaktif kompleks böbrekten atılır, yeniden maruziyette aşırı duyarlılık veya anafilaksi gelişebilir. [[K3 s. 243]]</li></ul></section>
<section class="wrap blk ders-sec" id="a15a-adenozin">
<h2>Adenozin · kısa etkili nodal blok</h2>
<p class="intro">Adenozinle ventrikül hızının geçici olarak düşmesi, taşiaritminin mekanizmasını ayırt etmeye yardım eder. [[K3 s. 243]]</p>
<div class="viz"><div class="viz-head"><h3>Hız mı yavaşlar, devre mi kesilir?</h3></div><div data-viz="a15a_adenozin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. AF: atriyal fibrilasyon. [[K3 s. 243]]</p></div>
<p>Tüm hücrelerde bulunan bu doğal pürin nükleozidi, adenin bazı ile pentoz şekeri D-ribozdan oluşur. [[K3 s. 243]] Kitap etkisini kalpte SA ve AV düğüme özgü A₁ reseptörleriyle açıklar. [[K3 s. 243]] K⁺ kanallarının açılması membranı hiperpolarize eder, Gᵢ proteinleri cAMP’yi azaltır ve AV düğümde belirgin hız yavaşlaması görülür. [[K3 s. 243]]</p>
<ul class="ozet"><li><b>Uygulama.</b> Renksiz, 3 mg/ml flakon oda sıcaklığında saklanır. [[K3 s. 243]] İV bolus 3–12 mg arasında artırılarak tercihen santral kanülden verilir. [[K3 s. 244]]</li>
<li><b>Ritim.</b> Kısa yarı ömrü nedeniyle yan etkiler kısa sürse de hasta için çok sıkıntılı olabilir. [[K3 s. 243]] Atriyal refrakter dönemi kısaltarak AF veya flutter başlatabilir. [[K3 s. 243]] İkinci veya üçüncü derece AV blokta ve hasta sinüs sendromunda kontrendikedir. [[K3 s. 243]]</li>
<li><b>Kalp dışı etkiler.</b> Göğüste rahatsızlık, dispne ve yüzde kızarma görülebilir. [[K3 s. 244]] Bronkospazm riski astımda dikkat gerektirir. [[K3 s. 244]]</li>
<li><b>Etkileşim.</b> Dipiridamol hücreye alımı engelleyerek etkiyi artırabilir, metilksantinler özellikle aminofilin etkiyi antagonize edebilir. [[K3 s. 244]]</li></ul></section>
<section class="wrap blk ders-sec" id="a15a-verapamil">
<h2>Verapamil · L tipi kanalın üç etki yeri</h2>
<p class="intro">Verapamil kompetitif bir Ca²⁺ kanal antagonistidir ve etkisi kalp dokusunda görece belirgindir. [[K3 s. 244]]</p>
<div class="viz"><div class="viz-head"><h3>Düğüm, miyosit ve damar</h3></div><div data-viz="a15a_verapamil"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 244]]</p></div>
<ul class="ozet"><li><b>Preparat.</b> Film kaplı ve modifiye salınımlı tabletleri, ayrıca 2,5 mg/ml İV çözeltisi vardır. [[K3 s. 244]]</li>
<li><b>Kullanım.</b> SVT’de hızı yavaşlatabilir veya sinüs ritmini geri getirebilir, AF ve flutterda da kullanılır. [[K3 s. 244]] Diğer kullanım alanları anjina profilaksisi ve hipertansiyondur. [[K3 s. 244]]</li>
<li><b>Aksesuar yol.</b> WPW’ye eşlik eden SVT’de aksesuar yoldan iletim artıp VT tetiklenebilir. [[K3 s. 244]] Sol ventrikül işlevi bozuksa kalp yetmezliği gelişebilir. [[K3 s. 244]]</li>
<li><b>Birlikte kullanım.</b> Digoksin, β-blokerler veya halotanla AV iletisindeki yavaşlama ağır bradikardi ve AV blokla sonuçlanabilir. [[K3 s. 244]] Verapamil serum digoksinini artırabilir. [[K3 s. 244]] Greyfurt suyunun verapamil düzeyini artırdığı bildirilmiştir ve tedavi sırasında tüketiminden kaçınılır. [[K3 s. 244]]</li></ul></section>
<section class="wrap blk ders-sec" id="a15a-beta">
<h2>β-blokerler ve esmolol · hız kontrolü</h2>
<p class="intro">Katekolamin etkisini antagonize eden β-blokerler hem uyarı oluşumunu hem AV iletiyi yavaşlatır. [[K3 s. 245]]</p>
<div class="viz"><div class="viz-head"><h3>β-blokajın hız, ileti ve kasılmaya etkisi</h3></div><div data-viz="a15a_beta"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 245]]</p></div>
<ul class="ozet"><li><b>Sınıf etkileri.</b> Bazılarının sınıf I membran stabilizasyonu gösteren etkisi klinikte muhtemelen sınırlıdır. [[K3 s. 245]] Sotalol ayrıca K⁺ kanallarını bloke ederek repolarizasyonu uzatır (sınıf III). [[K3 s. 245]]</li>
<li><b>Ritim.</b> Antiaritmik kullanım paroksismal SVT, AF ve katekolamin yüksekliğine bağlı sinüs taşikardisinde hız kontrolüyle sınırlıdır. [[K3 s. 245]] Akut miyokart infarktüsü sonrasında aritmileri azaltabilir ve yeni infarktüsleri önleyebilirler. [[K3 s. 245]]</li>
<li><b>Diğer kullanımlar.</b> Hipertansiyon, anjina, miyokart infarktüsü, tirotoksikoz, anksiyete, migren profilaksisi ve glokomda topikal tedavi. [[K3 s. 245]]</li></ul>
<div class="cols"><div class="card"><h3>Esmololün yeri ve preparatı</h3>
<p>Etkisi hızla başlayıp biten görece kardiyoselektif esmolol, perioperatif taşikardi ve hipertansiyonun kısa süreli tedavisinde ve akut SVT’de kullanılır. [[K3 s. 245]] İntrinsik sempatomimetik veya membran stabilize edici aktivitesi yoktur. [[K3 s. 245]]</p>
<ul><li>Berrak 2,5 g/10 ml preparat infüzyondan önce seyreltilir, doz 50–200 µg.kg⁻¹.min⁻¹’dır. [[K3 s. 245]]</li><li>100 mg/10 ml preparat etkiye göre 10 mg boluslarla titre edilir. [[K3 s. 245]]</li></ul></div>
<div class="card"><h3>Esmololün yan etkileri</h3><ul><li>Yüksek dozda β₂ blokajı nedeniyle astımda dikkat gerekir. [[K3 s. 245]]</li><li>Diğer β-blokerler gibi kalp yetmezliği başlatabilir, kısa etki süresi bu yan etkilerin süresini sınırlar. [[K3 s. 245]]</li><li>Venleri irrite eder, ekstravazasyon doku nekrozuna yol açabilir. [[K3 s. 245]]</li></ul></div></div></section>
<section class="wrap blk ders-sec" id="a15a-kinidin">
<h2>Kinidin · refrakter dönem ve vagal tonus</h2>
<p class="intro">Yan etkileri daha az olan seçenekler kinidin kullanımını azaltmıştır, ancak AF ve flutter dahil SVT’de ve ventriküler ektopik atımlarda hâlâ kullanılabilir. [[K3 s. 246]]</p>
<div class="viz"><div class="viz-head"><h3>Faz 0 ve AV ileti üzerindeki etkileri</h3></div><div data-viz="a15a_kinidin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 246]]</p></div>
<div class="note plain"><b>Atlas notu.</b> Kitap kinidinin aksiyon potansiyeli süresini değiştirmediğini söyler. Kinidinin K⁺ kanal blokajı repolarizasyonu ve aksiyon potansiyeli süresini uzatabilir.</div>
<p>AF veya flutterda kinidinden önce β-bloker, Ca²⁺ kanal antagonisti veya digoksinle AV ileti yavaşlatılır. [[K3 s. 246]] Aksi halde AV ileti artabilir ve ventrikül hızı atriyal hıza eşitlenebilir. [[K3 s. 246]]</p>
<ul class="ozet"><li><b>Kalp ve dolaşım.</b> Yan etkiler sıktır ve hastaların %30’una kadarında kabul edilemez düzeydedir. [[K3 s. 246]] Kalp bloğu, vagolitik sinüs taşikardisi ve ventriküler aritmiler oluşabilir. [[K3 s. 246]] EKG’de PR ve QT uzayabilir, QRS genişleyebilir. [[K3 s. 246]] α-blokaj veya hiperkalemiyle ağırlaşan doğrudan miyokart depresyonu hipotansiyon yapabilir. [[K3 s. 246]]</li>
<li><b>Sinkonizm.</b> Merkezî sinir sistemi toksisitesi tinnitus, bulanık görme, işitme bozukluğu, baş ağrısı ve konfüzyonla kendini gösterir. [[K3 s. 246]]</li>
<li><b>Etkileşimler.</b> Kinidin digoksini bağlanma yerlerinden uzaklaştırarak serum düzeyini yükseltir. [[K3 s. 246]] Hepatik enzimleri indükleyen fenitoin kinidin düzeyini düşürürken inhibitör simetidin yükseltir. [[K3 s. 246]] Depolarizan ve nondepolarizan kas gevşeticilerin etkisi artar. [[K3 s. 246]]</li></ul>
<h3>İlaçların kinetiğini karşılaştırın</h3>
<div class="tbl-wrap"><table class="tbl a15a-kinetik"><thead><tr><th>İlaç</th><th>Emilim ve dağılım</th><th>Eliminasyon</th></tr></thead><tbody>
<tr><th scope="row">Digoksin</th><td>Bağırsaktan emilim formülasyona bağlı, oral biyoyararlanım &gt;%70, proteine bağlanma ≈%25, dağılım hacmi 5–10 l/kg’dır. [[K3 s. 242]] Hacim tirotoksikozda belirgin artar, hipotiroidizmde azalır. [[K3 s. 242]]</td><td>Hepatik metabolizma çok azdır, çoğu değişmeden glomerüler filtrasyon ve aktif tübüler sekresyonla atılır. [[K3 s. 242]] Yarı ömür ≈35 saattir ve böbrek yetmezliğinde belirgin uzar. [[K3 s. 242]]</td></tr>
<tr><th scope="row">Adenozin</th><td>İV bolus sonrası eritrositler tarafından alınır. [[K3 s. 244]]</td><td>Plazmada hızla deamine edilir, yarı ömrü 10 saniyeden kısadır. [[K3 s. 244]]</td></tr>
<tr><th scope="row">Verapamil</th><td>Oral emilim ≈%90, güçlü ilk geçiş nedeniyle biyoyararlanım ≈%25, protein bağlanması ≈%90, dağılım hacmi 3–5 l/kg’dır. [[K3 s. 245]]</td><td>Karaciğerde oluşan en az 12 inaktif metabolit idrarla atılır. [[K3 s. 245]] Yarı ömür 3–7 saattir, yüksek dozlarda hepatik enzimlerin doygunluğuyla uzar. [[K3 s. 245]]</td></tr>
<tr><th scope="row">Esmolol</th><td>Yalnız İV kullanılır, %60’ı proteine bağlanır, dağılım hacmi 3,5 l/kg’dır. [[K3 s. 246]]</td><td>Eritrosit esterazları uzun yarı ömürlü inaktif asit metaboliti ve metil alkol oluşturur, esmololün yarı ömrü 10 dakikadır. [[K3 s. 246]] Esterazlar plazma kolinesterazından farklı olduğundan süksametonyumun etkisi uzamaz. [[K3 s. 246]]</td></tr>
<tr><th scope="row">Kinidin</th><td>Bağırsaktan iyi emilir, oral biyoyararlanım ≈%75 ve protein bağlanması ≈%90’dır. [[K3 s. 246]]</td><td>Hepatik metabolitleri aktiftir ve başlıca idrarla atılır, eliminasyon yarı ömrü 5–9 saattir. [[K3 s. 246]]</td></tr>
</tbody></table></div></section>
<section class="wrap blk ders-sec" id="a15a-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far15a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far15a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far15a-3"></div></div></section>
<section class="wrap blk ders-sec" id="a15a-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>AV düğümü içeren re-entry taşikardisinde ve atriyal flutterda adenozin verdikten sonra ne görmeyi beklersiniz? Farkı devre, reseptör ve ilacın kinetiği üzerinden açıklayın.</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Erken atriyal impuls hızlı yolu refrakter bulduğunda yavaş yoldan iner. [[K3 s. 240]]</li>
<li>Toparlanan hızlı yoldan geri dönerek refrakter dönemi kısa olan yavaş yola tekrar girebilir. [[K3 s. 240]]</li>
<li>Düğümlerde A₁ aktivasyonu K⁺ kanallarını açar, hiperpolarizasyon gelişir ve Gᵢ üzerinden cAMP azalır. [[K3 s. 243]]</li>
<li>AV düğümü içeren devre kesildiğinde sinüs ritmi geri gelebilir. [[K3 s. 243]]</li>
<li>Flutter devresi AV düğüme bağımlı olmadığı için sürer, ancak ventrikül yanıtının yavaşlaması EKG tanısına yardım eder. [[K3 s. 243]]</li>
<li>İV bolusun etkisi kısadır, plazmadaki deaminasyon ve eritrositlere alım nedeniyle yarı ömür 10 saniyenin altındadır. [[K3 s. 244]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> İki nodal yolu, erken uyarının inişini ve geri dönüşünü işaretleyin. [[K3 s. 240]] Yanına flutterda süren atriyal ritmi ve adenozinle yavaşlayan ventrikül yanıtını yerleştirin. [[K3 s. 243]]</div><div class="note plain"><b>Olası ek sorular.</b> Dipiridamol veya aminofilin yanıtı nasıl değiştirir? [[K3 s. 244]] WPW’de verapamil hangi riski taşır? [[K3 s. 244]]</div></div></section>
<section class="wrap blk ders-sec" id="a15a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Erken uyarı hızlı yolu refrakter, yavaş yolu açık bulursa re-entry başlayabilir. [[K3 s. 240]]</li>
<li>Sınıf I alt gruplarında refrakter dönem sırasıyla uzar (Ia), kısalır (Ib) veya aynı kalır (Ic). [[K3 s. 241]]</li>
<li>Digoksin AF’de ventrikül hızını düşürerek doluşa zaman kazandırır. [[K3 s. 242]]</li>
<li>Adenozin AV düğüme bağımlı taşikardiyi sonlandırabilir, flutterda ise ventrikül yanıtını yavaşlatır. [[K3 s. 243]]</li>
<li>Verapamil L kanallarını, β-blokerler katekolamin etkisini hedefler. [[K3 s. 244–245]]</li>
<li>AF ve flutterda AV ileti önceden yavaşlatılmazsa kinidinle ventrikül hızı atriyal hıza ulaşabilir. [[K3 s. 246]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="15a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/14b">← 14b · β-adrenoseptör antagonistleri</a><a href="#/dersler/farmakoloji/15b">Sonraki: 15b · Ventriküler ve karma etkili antiaritmikler →</a></nav></section>`,
};
