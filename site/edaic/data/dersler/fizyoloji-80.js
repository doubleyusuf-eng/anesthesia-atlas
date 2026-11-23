/* Fizyoloji Bölüm 80 · Hipotalamus ve hipofiz (K1 İngilizce baskı s. 391–395).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz80-1'] = {
  no: 1, kok: 'Hormonlar ve hipotalamusun işlevleri için:', kagit: 'Paper A · fizyoloji, Bölüm 80', kaynak: '[[K1 s. 391–392]]',
  onermeler: [
    { t: 'Steroit hormonlar sentezlendikten sonra salgı granüllerinde depolanır.', d: false, n: 'Yanlış. Steroit ve eikozanoitler gerektiğinde sentezlenip hemen salınır, depolanmaz; granülde depolanan peptit hormonlardır. [[K1 s. 391]]' },
    { t: 'LH, FSH ve TSH, protein zincirine karbonhidrat grupları bağlı glikopeptit hormonlardır.', d: true, n: 'Doğru. Kısa peptit zincirine örnek TRH, ADH, ACTH ve insülin; uzun protein zincirine örnek GH ve PRL\'dir. [[K1 s. 391]]' },
    { t: 'Tiroksin, katekolaminler gibi hücre zarı reseptörleri üzerinden etki eder.', d: false, n: 'Yanlış. Üçü de tek bir amino asitten türese de tiroksin hücre çekirdeğindeki reseptörlere bağlanır ve tiroglobulin içinde tutulur. [[K1 s. 391]]' },
    { t: 'Anterior hipotalamusun uyarılması uyku, posterior hipotalamusun uyarılması uyanıklık yapar.', d: true, n: 'Doğru. Sirkadiyen ritimlerin de hipotalamustan kaynaklandığı düşünülür. [[K1 s. 392]]' },
    { t: 'Hipofizin posterior lobu hipotalamik hormonların uzun portal vene salgılanmasıyla denetlenir.', d: false, n: 'Yanlış. Portal yol anterior lobu denetler; posterior lob hipotalamustan gelen doğrudan sinirsel bağlantılarla denetlenir. [[K1 s. 392]]' },
  ],
};
VERI.sorular['fiz80-2'] = {
  no: 2, kok: 'Hipofizin anatomisi ve kanlanması için:', kagit: 'Paper A · fizyoloji, Bölüm 80', kaynak: '[[K1 s. 392–393]]',
  onermeler: [
    { t: 'Kavernöz sinüs içinde III, IV, VI. kranial sinirler, V1, V2 ve internal karotit arter bulunur.', d: true, n: 'Doğru. Kavernöz sinüs hipofizin iki yanındadır; üstünde sap, optik kiazma ve üçüncü ventrikül vardır. [[K1 s. 392]]' },
    { t: 'Adenohipofiz hipotalamustan aşağı uzanan nöral ektodermden gelişir.', d: false, n: 'Yanlış. Adenohipofiz farenksteki oral ektoderm çöküntüsünden (Rathke kesesi) gelişir; nöral ektodermden gelişen nörohipofizdir. [[K1 s. 392]]' },
    { t: 'Anterior lob kanının çoğunu uzun portal venlerden alır.', d: true, n: 'Doğru. Uzun portal venler alt hipotalamus ve sapın kapiller ağını anterior lobun kapiller ağına bağlar; hipotalamik hormonlar böylece doğrudan anterior loba ulaşır. [[K1 s. 392]]' },
    { t: 'Posterior lob superior hipofizyal arterden beslenir.', d: false, n: 'Yanlış. Posterior lobu ICA dalı inferior hipofizyal arter besler; superior hipofizyal arter anterior lobu besler. [[K1 s. 392–393]]' },
    { t: 'İki lobun venöz kanı juguler bulbusa doğrudan boşalır.', d: false, n: 'Yanlış. Anterior ve posterior lobun venöz kanı kavernöz sinüslere boşalır. [[K1 s. 393]]' },
  ],
};
VERI.sorular['fiz80-3'] = {
  no: 3, kok: 'Hipofiz hormonları ve hipofiz adenomu için:', kagit: 'Paper A · fizyoloji, Bölüm 80', kaynak: '[[K1 s. 393–395]]',
  onermeler: [
    { t: 'GH\'nin etkilerinin çoğu karaciğerden salınan IGF-1 aracılığıyla oluşur.', d: true, n: 'Doğru. Doğrudan etkisi yağ hücresi GH reseptörleri üzerinden lipolizdir; IGF-1 ayrıca hipofizden GH salgısını baskılar. [[K1 s. 393–394]]' },
    { t: 'Hipofiz sapının basısı dopaminin anterior hipofize ulaşmasını engelleyerek prolaktini artırır.', d: true, n: 'Doğru. PRL\'nin uyarıcı hipotalamik hormonu yoktur; tonik dopamin onu baskılar. [[K1 s. 394]]' },
    { t: 'ADH ve oksitosin posterior lob hücrelerinde sentezlenir.', d: false, n: 'Yanlış. İkisi de hipotalamusta sentezlenir, aksonlarla posterior loba taşınır ve sinir uçlarındaki granüllerde depolanır. [[K1 s. 394]]' },
    { t: 'Alkol ADH salgısını uyararak idrar hacmini azaltır.', d: false, n: 'Yanlış. Alkol ADH salgısını baskılar ve diüreze yol açar. [[K1 s. 395]]' },
    { t: 'Akromegali hipertansiyon ve diyabetin yanı sıra kardiyomiyopati ve uyku apnesiyle ilişkilidir.', d: true, n: 'Doğru. Makrognati, makroglossi ve üst hava yolu yumuşak doku artışı entübasyonu da zorlaştırabilir. [[K1 s. 395]]' },
  ],
};

const D80_NAV = [
  ['d80-hormon', 'Hormon türleri'], ['d80-hipotalamus', 'Hipotalamusun işlevleri'], ['d80-anatomi', 'Hipofiz: yapı ve kan'],
  ['d80-eksen', 'Hipotalamik hormonlar ve eksen'], ['d80-on', 'Anterior lob hormonları'], ['d80-arka', 'Posterior lob'],
  ['d80-adenom', 'Hipofiz adenomu'], ['d80-p1', 'Part I'], ['d80-p2', 'Part II'], ['d80-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/80'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 9 · Bölüm 80', baslik: 'Hipotalamus ve hipofiz',
  lede: 'Hipotalamus beyni, otonom sinir sistemini ve endokrin sistemi birbirine bağlar; altındaki hipofiz bu komutları kana taşır. Bu derste hormon türleri, hipofizin yapısı ve kanlanması, iki lobun hormonları ve hipofiz adenomunun anestezi sorunları var. [[K1 s. 391–395]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D80_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d80-hormon">
  <h2>Hormon nedir, hangi türleri var?</h2>
  <p class="intro">Hormon, bir hücre, bez ya da organın kana saldığı ve vücudun başka yerindeki dokulara sinyal taşıyan maddedir; kimyasal yapısına göre üç sınıfa ayrılır. [[K1 s. 391]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Üç sınıf: nerede depolanır, nerede bağlanır?</h3></div>
    <div data-viz="f80_tur"></div>
    <p class="viz-cap" aria-live="polite"><b>Peptit hormonlar.</b> Granülde depolanır, ekzositozla salınır, hücre yüzeyi reseptörüne bağlanır. Başka bir sınıf seçin. [[K1 s. 391]]</p>
    <p class="viz-foot">Şematik hedef hücre; ok yolları yalnız depolama ve reseptör yerini gösterir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Peptit hormonlar</b> en sık türdür: kısa peptit zincirleri (TRH, ADH, ACTH, insülin), uzun protein zincirleri (GH, prolaktin) ve karbonhidrat grupları bağlı <b>glikopeptitler</b> (LH, FSH, TSH). [[K1 s. 391]]</p>
    <p><b>Lipit ve fosfolipit kökenliler</b> iki alt türdür. <b>Steroitler</b> (aldosteron, testosteron, östrojen, kortizol) kolesterolden türer; yağda çok çözündükleri için zardan geçer, sitozolik reseptöre bağlanır, kompleks çekirdekte gen transkripsiyonunu etkiler. <b>Eikozanoitler</b> (prostaglandinler, tromboksanlar, lökotrienler) hücre zarının fosfolipit katmanından türer; işlevleri geniş, mekanizmaları karmaşıktır. İkisi de gerektiğinde sentezlenip hemen salınır. [[K1 s. 391]]</p>
    <p><b>Monoamin türevleri</b> tek bir amino asitten türer: katekolaminler fenilalanin ya da tirozinden, serotonin triptofandan, tiroksin tirozinden. Davranışları farklıdır: katekolamin ve serotonin granülde depolanıp zar reseptörüne bağlanır; tiroksin tiroglobulin içinde tutulur (Bölüm 81) ve çekirdek reseptörüne bağlanır. [[K1 s. 391]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d80-hipotalamus">
  <h2>Hipotalamusun işlevleri</h2>
  <p class="intro">Talamusun altında, diensefalonun ventral kısmını oluşturan küçük hipotalamus çok sayıda vücut işlevini denetler. [[K1 s. 391]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Sekiz işlev, bir merkez</h3></div>
    <div data-viz="f80_islev"></div>
    <p class="viz-cap" aria-live="polite"><b>Otonom.</b> Limbik sistemden gelen girdiyi medulla oblongataya aktarır; korku gibi duygusal stres sempatik yanıt başlatır. Başka bir işleve dokunun. [[K1 s. 391–392]]</p>
    <p class="viz-foot">Şematik harita; merkezlerin konumu temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Isı düzenleme:</b> periferik ve santral termoreseptör sinyallerini birleştirir, ısı kaybı ve ısı kazanma merkezlerini dengeler (Bölüm 89). <b>Açlık:</b> beslenme ve tokluk merkezlerini hipotalamik glukoz, gastrointestinal hormonlar (kolesistokinin, glukagon) ve yağ dokusunun salgıladığı leptin etkiler. <b>Vücut suyu</b> (Bölüm 69): susama merkezi su alımını, ozmoreseptörler ADH aracılığıyla böbrekten su atılımını denetler. [[K1 s. 392]]</p>
    <p><b>Uyku–uyanıklık:</b> anterior hipotalamusun uyarılması uyku, posterior hipotalamusun uyarılması uyanıklık yapar; sirkadiyen ritimlerin buradan kaynaklandığı düşünülür. <b>Davranış:</b> "ceza" ve "ödül" merkezleri. <b>Cinsel işlev:</b> gonadotropinlerin pulsatil salınımı ve ovülasyonu başlatan ani yükselişi. <b>Hipofiz:</b> anterior lobu uzun portal vene salgılanan hormonlarla, posterior lobu doğrudan sinir bağlantılarıyla yönetir. [[K1 s. 392]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d80-anatomi">
  <h2>Hipofiz: konum, loblar ve kanlanma</h2>
  <p class="intro">Bezelye büyüklüğündeki hipofiz, sfenoit kemikteki sella tursikada, hipotalamusun hemen altında durur ve ona hipofiz sapıyla bağlanır. [[K1 s. 392]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Komşular, loblar ve portal dolaşım adım adım</h3></div>
    <div data-viz="f80_kan"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Konum.</b> Hipofiz sella tursikada; üstünü dura katlantısı diafragma sella örter, sap ortadaki boşluktan geçer. İleri düğmesine basın. [[K1 s. 392]]</p>
    <p class="viz-foot">Şematik sagital/koronal kesit; boyutlar ölçekli değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Komşular:</b> üstte hipofiz sapı, optik kiazma ve üçüncü ventrikül; yanlarda III, IV, VI. kranial sinirleri, V1, V2 ve internal karotit arteri (ICA) içeren kavernöz sinüs. [[K1 s. 392]]</p>
    <p><b>Loblar</b> farklı kökenlidir. Büyük <b>anterior lob (adenohipofiz)</b> embriyo farenksindeki oral ektoderm çöküntüsünden, <b>Rathke kesesinden</b> gelişir. <b>Posterior lob (nörohipofiz)</b> hipotalamustan aşağı uzanan nöral ektodermdir ve hipotalamustan hiç ayrılmaz: uzantı hipofiz sapı olarak kalır. Aradaki çok ince <b>pars intermedia</b> da Rathke kesesinden gelir, çoğu zaman anterior lobdan sayılır ve insanda iyi gelişmemiştir. [[K1 s. 392]]</p>
    <p><b>Kanlanma</b> karmaşıktır. Anterior lob ICA dalı superior hipofizyal arterden, kanının çoğunu da <b>uzun portal venlerden</b> alır; portal ven iki kapiller ağı birleştirir. <b>Kısa portal venler</b> posterior lobdan bir miktar kanı anterior loba taşır. Posterior lobu ICA dalı inferior hipofizyal arter besler. İki lobun venleri kavernöz sinüslere boşalır. [[K1 s. 392–393]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d80-eksen">
  <h2>Hipotalamik hormonlar ve hipotalamus–hipofiz ekseni</h2>
  <p class="intro">Hipotalamus uzun portal vene altı hormon salgılayarak anterior lobu yönetir; eksen iki negatif geri bildirim halkasıyla kendini sınırlar. [[K1 s. 393]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kısa ve uzun halka: periferik hormonu değiştirin</h3></div>
    <div data-viz="f80_geri"></div>
    <p class="viz-cap" aria-live="polite"><b>Denge.</b> Hipotalamik hormon anterior lobu, anterior lob hormonu periferik bezi uyarır; periferik hormon iki üst basamağı baskılar. Periferik bez salgısını değiştirin. [[K1 s. 393–394]]</p>
    <p class="viz-foot">Şematik nitel model; kaydırıcı periferik hormon düzeyini doğrudan belirler, üst basamaklar ters yönde değişir. Sayılar fizyolojik ölçüm değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Altı hipotalamik hormon: <b>TRH</b> TSH'yi, <b>GnRH</b> FSH ve LH'yi, <b>CRH</b> ACTH'yi, <b>GHRH</b> GH'yi uyarır; <b>somatostatin</b> GH'yi baskılar, TSH'yi de orta derecede baskılar; <b>dopamin</b> prolaktini baskılar. [[K1 s. 393]]</p>
    <p><b>Hipotalamus–hipofiz ekseni</b>, hipotalamus, anterior lob ve hedef organ arasındaki etkileşimlerin bütünüdür. <b>Kısa halka:</b> anterior lob hormonu kendi hipotalamik hormonunun salınımını baskılar. <b>Uzun halka:</b> anterior lob hormonuna yanıtla salınan periferik hormon (ör. ACTH'ye yanıtla adrenal korteksin kortizolü) hem hipofiz hem hipotalamus salgısını baskılar. [[K1 s. 393]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d80-on">
  <h2>Anterior lobun hormonları</h2>
  <p class="intro">Anterior lob altı hormon salgılar: ikisi (PRL, GH) dokulardaki kendi reseptörlerine doğrudan etki eder, dördü (TSH, FSH, LH, ACTH) bir endokrin bezi uyarır. [[K1 s. 393]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Her hormon: uyaran, baskılayan, hedef, etki</h3></div>
    <div data-viz="f80_on"></div>
    <p class="viz-cap" aria-live="polite"><b>TSH.</b> Glikoprotein; tiroitte aktif T3'ün ve öncülü T4'ün sentez ve salınımını artırır. TRH uyarır, dolaşımdaki T3 negatif geri bildirimle baskılar. Başka bir hormon seçin. [[K1 s. 393]]</p>
    <p class="viz-foot">Şematik eksen kartları; ACTH ve α-MSH çizimi aşağıdaki Atlas notuyla uyumludur.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Uyarıcı hormonların eksenleri: <b>hipotalamus–hipofiz–tiroit</b>, <b>–gonat</b> ve <b>–adrenal</b>. FSH ve LH birlikte <b>gonadotropin</b> diye anılır; pulsatil GnRH uyarır, testosteron ya da östrojen baskılar. LH kadında hızla yükselince ovülasyonu başlatır, sonra korpus luteumu geliştirir; erkekte Leydig hücrelerinde testosteron yaptırır. FSH kadında östrojen sentezini ve folikül gelişimini, erkekte sperm olgunlaşmasını destekler. [[K1 s. 393]]</p>
    <p><b>ACTH</b> küçük bir peptittir; CRH uyarır, kortizol baskılar; zona fasikülatadan kortizol salgılatır. Zamanla parçalanıp α-MSH oluşturur; Addison hastalığında yüksek ACTH ile görülen deri pigmentasyonu buna bağlanır. Pars intermedia yedinci hormon olarak α-MSH salgılar; gebelik ve Addison pigmentasyonundan artmış α-MSH sorumludur. [[K1 s. 393–394]]</p>
    <p><b>GH</b> anabolik bir proteindir. Doğrudan etkisi yağ hücresindeki GH reseptörleri üzerinden lipoliz ve yağ asidi artışıdır; etkilerinin çoğu ise karaciğerin GH'ye yanıtla saldığı ve hücre büyümesini sağlayan <b>IGF-1</b> ile olur. Pulsatil, özellikle gece salınır; GHRH uyarır, somatostatin ve IGF-1 baskılar. Plazma düzeyi genellikle çok düşüktür; fizyolojik stres, hipoglisemi ve egzersizde artar. [[K1 s. 393–394]]</p>
    <p><b>Prolaktin</b> gebelikte meme gelişimini, doğumdan sonra süt yapımını sağlar. Uyarıcı hipotalamik hormonu yoktur: tonik dopamin onu baskılar. Emzirme, cinsel ilişki, stres ve epileptik nöbet PRL'yi artırır; tümör hem salgıyla (adenom) hem sap basısıyla (dopamin ulaşamaz) artırabilir. [[K1 s. 394]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Erişkin insanda pars intermedia neredeyse yoktur; α-MSH ve ACTH aynı öncül molekülden (POMC) kesilir. Addison pigmentasyonunun başlıca nedeni artmış ACTH'nin melanositlerdeki melanokortin reseptörlerini uyarmasıdır.</div>
</section>

<section class="wrap blk ders-sec" id="d80-arka">
  <h2>Posterior lob: ADH ve oksitosin</h2>
  <p class="intro">Posterior lob iki hormon salar ama ikisini de yapmaz: ADH ve oksitosin hipotalamusta sentezlenir, sinir uçlarında depolanır. [[K1 s. 394]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Sentezden salınıma, sonra ADH geri bildirimi</h3></div>
    <div data-viz="f80_arka"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Sentez.</b> ADH ve oksitosin hipotalamustaki nöronlarda yapılır ve küçük veziküllere paketlenir. İleri düğmesine basın. [[K1 s. 394]]</p>
    <p class="viz-foot">Şematik nöron ve nefron; ozmolarite çubuğu nitel.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Veziküller aksonlarla posterior loba taşınır; hipotalamustan gelen aksiyon potansiyeli granülleri sistemik dolaşıma boşaltır. [[K1 s. 394]]</p>
    <p><b>ADH</b> küçük bir peptittir. <b>Antidiüretik etki:</b> toplayıcı kanal hücre zarına su kanalları (akuaporinler) ve üre taşıyıcıları (UT-A1) yerleştirip su geri emilimini artırır (Bölüm 69). Başlıca uyaranı plazma ozmolaritesindeki artıştır; geri emilim ozmolariteyi düşürür, bu da ADH'yi azaltır. <b>Vazokonstriksiyon</b> (adı: vazopressin): normal düzeyde arteriol tonusuna katkısı azdır, yüksek düzeyde güçlü vazokonstriktördür; hipovolemik şokta ADH'nin çarpıcı artışı kan basıncını korumada önemli bir kompansasyondur. Fizyolojik streste de salınır; alkol baskılar ve diürez yapar. [[K1 s. 394–395]]</p>
    <p><b>Oksitosin</b> yapıca ADH'ye çok benzeyen küçük bir peptittir. Doğumda fetüs başının serviksi germesine yanıtla uterus düz kasını kastırır; emzirmede emmeye yanıtla meme miyoepitel hücrelerini kasıp sütü kanallara sıkar (süt boşaltma refleksi). Anne–bebek bağında ve erişkinler arası güvende rol oynar; "sarılma hormonu" diye anılır. [[K1 s. 395]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d80-adenom">
  <h2>Klinik önem: hipofiz adenomu</h2>
  <p class="intro">Anterior lob tümörleri genellikle iyi huyludur ama dört biçimde belirti verir ve anestezistin karşısına üç sorunla çıkar. [[K1 s. 395]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tümör büyüdükçe: salgı, yetmezlik, bası</h3></div>
    <div data-viz="f80_adenom"></div>
    <p class="viz-cap" aria-live="polite"><b>Küçük salgılayan tümör.</b> Hormon fazlalığının etkisiyle erken fark edilir; ör. PRL fazlası galaktore yapar. Tümör boyutunu artırın. [[K1 s. 395]]</p>
    <p class="viz-foot">Şematik koronal kesit; boyut kaydırıcısı nitel, kitap tümör boyutu için sayı vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Dört sunum: <b>hipersekresyon</b> (salgılayan tümör küçükken belirti verir), <b>hiposekresyon</b> (büyük tümörler çoğu zaman salgılamaz, normal hücreleri sıkıştırıp hipotiroidi, adrenokortikal yetmezlik ya da infertilite yapar), <b>kitle etkisi</b> (optik kiazma: klasik bitemporal hemianopi; kranial sinir felci; üçüncü ventrikül: obstrüktif hidrosefali) ve BT ya da MR'da <b>rastlantısal bulgu</b>. [[K1 s. 395]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:12px"><table class="tbl">
    <thead><tr><th>Anestezi sorunu</th><th>Ne beklenir</th></tr></thead>
    <tbody>
      <tr><td>Cerrahinin doğası</td><td>Debulking çoğunlukla transsfenoidal yolla: ortak hava yolu, en az hemodinamik dalgalanma, sorunsuz ekstübasyon. [[K1 s. 395]]</td></tr>
      <tr><td>Eşlik eden hastalıklar</td><td>Cushing hastalığı (ACTH salgılayan adenom): hipertansiyon, diabetes mellitus. Akromegali (GH salgılayan adenom): bunlara ek olarak kardiyomiyopati ve uyku apnesi. [[K1 s. 395]]</td></tr>
      <tr><td>Hava yolu</td><td>Akromegalide makrognati, makroglossi ve üst hava yolu yumuşak doku artışı entübasyonu zorlaştırabilir. [[K1 s. 395]]</td></tr>
    </tbody>
  </table></div>
</section>

<section class="wrap blk ders-sec" id="d80-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: hormon sınıfları ve reseptör yerleri, hipotalamusun işlevleri, hipofizin komşuları, embriyolojisi ve kanlanması, altı hipotalamik hormon, kısa ve uzun halka, anterior lob hormonlarının denetimi, PRL'nin dopaminle baskılanması, posterior lob hormonları, adenomun sunumları ve anestezi sorunları. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz80-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz80-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz80-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d80-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Hipofizin anatomisini ve hipotalamusla ilişkisini anlatın. Akromegalili bir hasta transsfenoidal hipofiz cerrahisine geliyor: fizyolojiden yola çıkarak hangi sorunları beklersiniz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Konum ve komşular.</b> Sella tursika, diafragma sella, sap; üstte optik kiazma ve üçüncü ventrikül, yanlarda kavernöz sinüs (III, IV, VI, V1, V2, ICA). [[K1 s. 392]]</li>
    <li><b>Loblar.</b> Anterior: Rathke kesesi (oral ektoderm); posterior: nöral ektoderm, sapla hipotalamusa bağlı; pars intermedia ince. [[K1 s. 392]]</li>
    <li><b>Kanlanma.</b> Superior hipofizyal arter + uzun portal venler (kanın çoğu) + kısa portal venler → anterior; inferior hipofizyal arter → posterior; venler kavernöz sinüse. [[K1 s. 392–393]]</li>
    <li><b>Denetim.</b> Altı hipotalamik hormon portal yolla anterior loba; posterior loba sinir yoluyla. Kısa ve uzun negatif halka. [[K1 s. 392–393]]</li>
    <li><b>Hormonlar.</b> Anterior: PRL, GH (doğrudan) ve TSH, FSH, LH, ACTH (uyarıcı); posterior: hipotalamusta yapılan ADH ve oksitosin. [[K1 s. 393–394]]</li>
    <li><b>GH ve akromegali.</b> GH lipoliz ve IGF-1 ile anabolik; GHRH uyarır, somatostatin ve IGF-1 baskılar. Akromegali: hipertansiyon, diyabet, kardiyomiyopati, uyku apnesi; makrognati ve makroglossi ile zor entübasyon. [[K1 s. 393–395]]</li>
    <li><b>Cerrahi.</b> Transsfenoidal yol: ortak hava yolu, hemodinamik kararlılık, sorunsuz ekstübasyon; büyük tümörde hiposekresyon ve kitle etkisi (bitemporal hemianopi, hidrosefali). [[K1 s. 395]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Sagital kesitte hipotalamus, altında sap ve iki lob; anterior loba superior hipofizyal arter ve uzun portal ven, posterior loba sinir aksonları ve inferior hipofizyal arter. Yanına hipotalamus → anterior lob → periferik bez kutularını, kısa ve uzun halkayı "−" oklarıyla çizin. [[K1 s. 392–394]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Prolaktini hangi hormon baskılar ve sap basısı neden PRL'yi artırır? ADH'nin iki etkisi nedir, hipovolemik şokta rolü ne? Hipofiz tümörü neden bitemporal hemianopi yapar? Addison'da pigmentasyon neden olur? Steroit ve peptit hormon etkisi nasıl ayrılır? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 391–395]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d80-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Peptitler granülde depolanır ve zar reseptörüne bağlanır; steroit ve eikozanoitler depolanmaz, steroitler sitozolik reseptörle çekirdeğe gider; monoaminlerden tiroksin çekirdekte etkilidir. [[K1 s. 391]]</li>
    <li>Hipotalamus otonom yanıtı, ısıyı, açlığı, vücut suyunu, uykuyu, davranışı, cinsel işlevi ve hipofizi yönetir. [[K1 s. 391–392]]</li>
    <li>Adenohipofiz Rathke kesesinden, nörohipofiz nöral ektodermden gelişir; anterior lobun kanının çoğu uzun portal venlerden gelir, venler kavernöz sinüse boşalır. [[K1 s. 392–393]]</li>
    <li>TRH, GnRH, CRH, GHRH uyarır; somatostatin GH'yi (ve biraz TSH'yi), dopamin PRL'yi baskılar; kısa ve uzun negatif halka ekseni sınırlar. [[K1 s. 393]]</li>
    <li>GH'nin etkisinin çoğu IGF-1 iledir ve stres, hipoglisemi, egzersizde artar; PRL'nin uyarıcı hipotalamik hormonu yoktur, sap basısı onu artırır. [[K1 s. 393–394]]</li>
    <li>ADH (akuaporin, UT-A1, yüksek düzeyde vazokonstriksiyon) ve oksitosin (uterus, süt boşaltma) hipotalamusta yapılır, posterior lobdan salınır; alkol ADH'yi baskılar. [[K1 s. 394–395]]</li>
    <li>Adenom: küçük salgılayan, büyük salgılamayan tümör, kitle etkisi (bitemporal hemianopi), rastlantısal bulgu; transsfenoidal cerrahi, Cushing ve akromegali eşlik eden hastalıkları, akromegalide zor hava yolu. [[K1 s. 395]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="80"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/79">← Bölüm 79 · Stres yanıtı</a>
    <a href="#/dersler/fizyoloji/81">Sonraki: Bölüm 81 · Tiroit, paratiroit ve adrenal bezler →</a>
  </nav>
</section>`,
};
