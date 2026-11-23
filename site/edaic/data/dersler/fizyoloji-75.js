/* Fizyoloji Bölüm 75 · Bağışıklık sistemi (K1 İngilizce baskı s. 360–370).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz75-1'] = {
  no: 1, kok: 'Antijenler, doğal bağışıklık ve inflamasyon için:', kagit: 'Paper A · fizyoloji, Bölüm 75', kaynak: '[[K1 s. 360–362]]',
  onermeler: [
    { t: 'Hapten, taşıyıcı bir proteine bağlanmadan tek başına bağışıklık yanıtını uyarabilir.', d: false, n: 'Yanlış. Hapten küçük bir moleküldür ve yalnız büyük bir taşıyıcı proteine bağlıyken yanıt uyarır; oluşan antikorlar sonra serbest haptene de bağlanabilir. [[K1 s. 360]]' },
    { t: 'Bir nötrofil ölmeden önce yaklaşık 5–20 bakteri fagosite eder.', d: true, n: 'Doğru. Nötrofiller lökositlerin %60\'ıdır; makrofaj ise ölmeden 100 bakteriye dek fagosite edebilir. [[K1 s. 360–361]]' },
    { t: 'Postkapiller venüllerin geçirgenlik artışı, lökositlerin interstisyuma göçü için tek başına yeterli bir sinyaldir.', d: false, n: 'Yanlış. Endotel hücreleri ayrıca adezyon molekülleri göstermelidir; bunlar lökositi yavaşlatır ve transmigrasyonu sağlar, kemotaktik moleküller yön verir. [[K1 s. 361–362]]' },
    { t: 'Bradikinin, histamin gibi arteriyoler vazodilatasyon yapar ve postkapiller venül geçirgenliğini artırır.', d: true, n: 'Doğru. Akut inflamasyonda inaktif öncüllerin yıkımıyla oluşur ve periferik ağrı liflerini duyarlılaştırır. [[K1 s. 362]]' },
    { t: 'Kalp hızı 95/dk ve solunum hızı 24/dk olan hasta, kitaptaki tanıma göre SIRS ölçütlerini karşılar.', d: true, n: 'Doğru. Dört bulgudan (ateş > 38 °C ya da < 36 °C, kalp hızı > 90/dk, solunum hızı > 20/dk, lökosit > 12 ya da < 4 × 10⁹/L) ikisi yeterlidir. [[K1 s. 362]]' },
  ],
};
VERI.sorular['fiz75-2'] = {
  no: 2, kok: 'Kompleman, lenfoid doku ve antikor üretimi için:', kagit: 'Paper A · fizyoloji, Bölüm 75', kaynak: '[[K1 s. 362–365]]',
  onermeler: [
    { t: 'Komplemanın klasik yolu antikor–antijen kompleksiyle, alternatif yolu belirli bir bakteri hücre duvarıyla temasla etkinleşir.', d: true, n: 'Doğru. Kompleman 25 plazma proteininden oluşur; doğal bağışıklığın parçasıdır ama antikorların etkisini de tamamlar. [[K1 s. 362]]' },
    { t: 'Timusa gelen olgunlaşmamış T hücrelerinin yaklaşık %98\'i seçimi geçip dolaşıma çıkar.', d: false, n: 'Yanlış. Yaklaşık %98\'i apoptozla ölür; yalnız %2\'si olgunlaşır ama yine de ≈ 100 milyon farklı TCR kalır. [[K1 s. 363]]' },
    { t: 'T yardımcı hücreler APC üzerindeki MHC sınıf I molekülüyle CD8 reseptörü aracılığıyla etkileşir.', d: false, n: 'Yanlış. T yardımcı hücreler CD4+ hücrelerdir ve MHC sınıf II ile etkileşir; CD8–MHC sınıf I eşleşmesi sitotoksik T hücresine aittir. [[K1 s. 365–366]]' },
    { t: 'Bir plazma hücresi saniyede yaklaşık 2000 antikor molekülü üretir ve yaklaşık bir hafta yaşar.', d: true, n: 'Doğru. Antikor sentezi hücrenin kendi protein sentezini aksattığı için ömrü kısadır. [[K1 s. 365]]' },
    { t: 'Primer bağışıklık yanıtında plazma hücrelerinin ürettiği başlıca immünoglobulin IgG\'dir.', d: false, n: 'Yanlış. Primer yanıtta başlıca IgM, sonra biraz IgG üretilir; sekonder yanıtta IgG baskındır. [[K1 s. 365]]' },
  ],
};
VERI.sorular['fiz75-3'] = {
  no: 3, kok: 'İmmünoglobulinler, aşırı duyarlılık ve perioperatif bağışıklık için:', kagit: 'Paper A · fizyoloji, Bölüm 75', kaynak: '[[K1 s. 367–370]]',
  onermeler: [
    { t: 'IgA, plasentayı geçebilen tek immünoglobulindir.', d: false, n: 'Yanlış. Plasentayı geçen tek Ig, monomer IgG\'dir; dimer IgA mukozada, tükürükte, gözyaşında ve anne sütünde bulunur. [[K1 s. 367]]' },
    { t: 'Tip II aşırı duyarlılık antikor değil T hücre aracılıdır ve 2–3 günde gelişir.', d: false, n: 'Yanlış. Bu tanım tip IV (gecikmiş tip) içindir; tip II\'de antikorlar vücudun kendi hücre yüzey antijenlerine bağlanır. [[K1 s. 369]]' },
    { t: 'Goodpasture hastalığında IgG, glomerül ve alveol bazal membranındaki tip IV kollajene bağlanır.', d: true, n: 'Doğru. Sonuç akut böbrek hasarı ve akciğer kanamasıdır; tip II aşırı duyarlılık örneğidir. [[K1 s. 369]]' },
    { t: 'NAP6\'da perioperatif anafilaksi olgularının en büyük payı (%47) antibiyotiklere aitti.', d: true, n: 'Doğru. Kas gevşeticiler %33, antiseptikler (klorheksidin dahil) %9 ile izledi; anafilaksi genel anestezide 1/10 000 sıklıktaydı. [[K1 s. 369]]' },
    { t: 'Volatil anestezikler NK hücre işlevini etkilemez, propofol ise azaltır.', d: false, n: 'Yanlış. Tersine: volatil anestezikler NK hücre işlevini azaltır, propofolün NK etkinliğine etkisi yoktur. [[K1 s. 370]]' },
  ],
};

const D75_NAV = [
  ['d75-temel', 'Antijen, doğal ve kazanılmış'], ['d75-hucre', 'Doğal bağışıklık hücreleri'], ['d75-inflamasyon', 'İnflamasyon'],
  ['d75-sirs', 'SIRS'], ['d75-kompleman', 'Kompleman'], ['d75-lenfoid', 'Lenfoid doku ve timus'],
  ['d75-antikor', 'Antikor üretimi'], ['d75-yanit', 'Primer–sekonder yanıt, aşı'], ['d75-hucresel', 'Hücresel bağışıklık'],
  ['d75-ig', 'İmmünoglobulinler'], ['d75-hiper', 'Aşırı duyarlılık'], ['d75-yetmezlik', 'İmmün yetmezlik'],
  ['d75-anestezi', 'Anestezi ve cerrahi'],
  ['d75-p1', 'Part I'], ['d75-p2', 'Part II'], ['d75-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/75'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 7 · Bölüm 75', baslik: 'Bağışıklık sistemi',
  lede: 'Bağışıklık sistemi vücudu mikroorganizmalara, anormal konak hücrelerine, toksinlere ve yabancı maddelere karşı savunur: hızlı ama özgül olmayan doğal kol ilk saldırıyı karşılar, yavaş ama özgül ve bellekli kazanılmış kol işi bitirir. [[K1 s. 360]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D75_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d75-temel">
  <h2>Antijen, hapten, alerjen; doğal ve kazanılmış bağışıklık</h2>
  <p class="intro">Bağışıklık yanıtını başlatan maddeye antijen denir; yanıtı iki kol verir: doğuştan gelen (doğal, innate) ve sonradan kazanılan (adaptif) bağışıklık. [[K1 s. 360]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kim neyi tanır, kim neyle savunur?</h3></div>
    <div data-viz="f75_sistem"></div>
    <p class="viz-cap" aria-live="polite"><b>Antijen, hapten, alerjen.</b> Antijen protein ya da polisakkarittir; antikorlar ona özgül olarak bağlanır. Hapten yalnız taşıyıcı proteine bağlıyken yanıt uyarır. Alerjen, çoğu zaman zararsız olduğu hâlde şiddetli yanıt doğuran çevresel antijendir. Öteki sekmeleri açın. [[K1 s. 360]]</p>
    <p class="viz-foot">Şematik sınıflama haritası; kutuların boyutu önem ya da sayı belirtmez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Haptene karşı oluşan antikorlar aslında hapten–taşıyıcı kompleksine yöneliktir; yine de taşıyıcıdan ayrılmış serbest haptene de bağlanabilirler. [[K1 s. 360]]</p>
    <p><b>Doğal bağışıklık</b> ilk savunma hattıdır: anında ve özgül olmadan çalışır, önceki karşılaşma gerektirmez. Parçaları anatomik–biyokimyasal engeller (deri, solunum yolunun mukosiliyer yürüyen merdiveni, düşük mide pH'sı, peristaltizm ve safra salgısı; tükürük ve gözyaşındaki lizozim bakteri duvarını eritir, mukozadaki transferrin demiri azaltıp bakteri çoğalmasını önler), inflamasyon, kompleman, hücreler (nötrofil, makrofaj, NK hücresi, mast hücresi, bazofil, eozinofil) ve akut faz proteinleridir (C-reaktif protein, α1-antitripsin). [[K1 s. 360]]</p>
    <p><b>Kazanılmış bağışıklık</b> daha yavaştır ama saldıran mikroorganizmaya özgüldür ve <b>bellek</b> taşır: aynı mikrop ikinci kez gelince yanıt çok daha hızlıdır. Hücresel kolda sitotoksik T hücreleri hücre içi patojenlere ve anormal konak hücrelerine karşı savaşır; hümoral kolda B ve T yardımcı hücreler vücut sıvılarındaki patojenlere karşı antikor yanıtını yürütür. [[K1 s. 360]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-hucre">
  <h2>Doğal bağışıklığın hücreleri</h2>
  <p class="intro">Doğal yanıtı farklı lökosit türleri yürütür; her birinin hedefi ve kapasitesi ayrıdır. [[K1 s. 360–361]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Altı hücre, altı görev</h3></div>
    <div data-viz="f75_hucreler"></div>
    <p class="viz-cap" aria-live="polite"><b>Nötrofil.</b> Lökositlerin %60'ı; bakteri ve mantarları fagosite eder (yutar ve sindirir), ölmeden önce ≈ 5–20 bakteri. Başka bir hücre seçin. [[K1 s. 360]]</p>
    <p class="viz-foot">Şematik hücreler ve hızlar; nötrofil döngüsündeki 12 bakteri, kitaptaki ≈ 5–20 aralığından temsilî bir değerdir; makrofaj sayacı 100’de sonlanır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Monositler kandan dokuya geçip makrofaja dönüşür; makrofaj hem mikroorganizmaları hem hücre artıklarını yutar. Eozinofiller helmint ve parazit gibi çok hücreli canlıları öldürür; mast hücreleriyle birlikte alerji ve astımın oluşumunda rol alır ve ikisinde de serum eozinofil sayısı artar. [[K1 s. 361]]</p>
    <p>Bazofil en az bulunan lökosittir ve dolaşan bir mast hücresi gibi davranır: granüllerinde histamin ve heparin taşır, alerjide ve parazit savunmasında çalışır. NK (doğal öldürücü) hücreleri lenfosit sayılır ama B ve T hücrelerinin tersine özgül değildir; tümör hücrelerini ve virüslü hücreleri yok eder ve gebede annenin bağışıklığını baskılayıp fetüsü korumaya katıldığı düşünülür. [[K1 s. 361]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-inflamasyon">
  <h2>İnflamasyon</h2>
  <p class="intro">İnflamasyon, mikrop girişi ya da doku hasarıyla tetiklenen, özgül olmayan ve kalıplaşmış bir yanıttır; kızarıklık, ısı artışı, şişlik ve ağrı 2000 yılı aşkın süredir bilinen belirtileridir. [[K1 s. 361]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hasardan transmigrasyona: yerel inflamasyon adım adım</h3></div>
    <div data-viz="f75_inflamasyon"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Tanıma.</b> Travmada damar yırtılır ve mast hücreleri degranüle olur; enfeksiyonda doku makrofajı mikrobu tanır, yutar ve IL-1, IL-6, TNF-α salar. Adımları ilerletin. [[K1 s. 361]]</p>
    <p class="viz-foot">Şematik kesit: arteriyol → kapiller → postkapiller venül ve altında interstisyum; ölçek yok.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Üç süreç belirtileri açıklar: <b>vazodilatasyon</b> kan akımını artırır (kızarıklık, ısı); <b>damar geçirgenliği artışı</b> plazma proteinlerini dokuya sızdırır (ödem); <b>fagosit göçü</b> mikropları öldürür ve iyileşme için artıkları temizler. Başlatma mekanizmaları karmaşıktır ve tam anlaşılmamıştır; şekil basitleştirilmiş sırayı gösterir. [[K1 s. 361]]</p>
    <p>Başlatıcı ne olursa olsun yerel yanıt aynı sırayı izler. Arteriyoller histaminle genişler ve bölgeye lökosit ve plazma proteini taşır. Duvarı çok ince, kası ve bağ dokusu az olan postkapiller venüller TNF-α ve histaminle şişer, endotel hücreleri arasında aralıklar açılır; kompleman, pıhtılaşma proteinleri ve sonraları antikorlar gibi büyük moleküllerle birlikte bol plazma interstisyuma geçer. Kompleman burada mast hücrelerini daha da degranüle eder ve mikropları opsonize eder (kaplar). [[K1 s. 361]]</p>
    <p>Geçirgenlik artışı tek başına lökositi dokuya çekmeye yetmez: endotel hücreleri inflamatuvar aracılara yanıt olarak yüzeylerinde adezyon molekülleri gösterir. Bunlar dolaşan nötrofil ve makrofajları yavaşlatır, hücreler endotel hücrelerinin arasından geçer (<b>transmigrasyon</b>) ve kemotaktik moleküllerin çekimiyle odağa yönelir. [[K1 s. 361–362]]</p>
    <p>Travmada damar yırtığı trombositleri ve pıhtılaşma kaskadını etkinleştirir (Bölüm 72). Enfeksiyonda makrofaj sitokinleri mast hücrelerini degranüle ederek daha çok sitokin salınmasına yol açar. Ağır inflamasyonda ya da mikrop yerinden kaçınca sitokinler dolaşıma geçer: ateş (fagositozu artırır, bakteri çoğalmasını bozar), kemik iliğinden nötrofil salınımı ve karaciğerden akut faz proteinleri; plazma CRP düzeyi inflamasyonun derecesiyle koreledir. [[K1 s. 361–362]]</p>
  </div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><b>Eikozanoidler.</b> Araşidonik asitten türeyen, esas işi proinflamatuvar sitokinlik olan sinyal molekülleri: prostaglandinler, prostasiklinler, tromboksanlar ve lökotrienler. İlk üçünün sentezindeki enzimlerden biri siklooksijenazdır (COX, prostaglandin-endoperoksit sentaz); COX-1 ve COX-2 inflamasyon tedavisinin hedefidir. [[K1 s. 362]]</div>
    <div class="card"><b>Kininler.</b> İyi anlaşılmamıştır. Akut inflamasyonda bradikinin inaktif öncüllerin yıkımıyla oluşur; histamin gibi arteriyolleri genişletir, postkapiller venül geçirgenliğini artırır ve periferik ağrı liflerini duyarlılaştırır. [[K1 s. 362]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-sirs">
  <h2>Klinik önem: sistemik inflamatuvar yanıt sendromu (SIRS)</h2>
  <p class="intro">Ağır doku hasarı ya da enfeksiyondan sonra sitokinler dolaşıma taşarsa yerel inflamasyonun kalıbı bütün vücuda yayılır; bu "sitokin fırtınasının" klinik tablosu SIRS'tir. [[K1 s. 362]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dört bulgudan ikisi: SIRS hesaplayıcı</h3></div>
    <div data-viz="f75_sirs"></div>
    <p class="viz-cap" aria-live="polite"><b>0/4 ölçüt.</b> Ateş 37 °C, kalp hızı 80/dk, solunum hızı 14/dk, lökosit 8 × 10⁹/L: SIRS yok. Sürgüleri oynatın; iki ölçüt dolunca sistemik sonuçlar yanar. [[K1 s. 362]]</p>
    <p class="viz-foot">Eşikler kitaptaki tanımdır; sonuç zinciri şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yaygın vazodilatasyon sistemik hipotansiyona, sızdıran venüller damar içi sıvı kaybına yol açar. Nötrofiller uzak organlara göçer; pıhtılaşmaya eğilim mikrovasküler tromboz yapar. Miyokart, büyük olasılıkla sarkoplazmik retikulumun Ca²⁺ alım ve salımının gecikmesiyle baskılanır; mitokondri işlev bozukluğu oksidatif fosforilasyonu yetersiz bırakır. [[K1 s. 362]]</p>
    <p>Bu sonuçların çoğu dokuya O₂ sunumunu azalttığından SIRS çoklu organ işlev bozukluğuna ilerleyebilir; bozukluk genellikle makro- ve mikrovasküler iskeminin birleşimidir. En sık etkilenen organ akciğerdir: akut solunum sıkıntısı sendromu (ARDS). SIRS'i en sık ağır enfeksiyon (özellikle Gram-negatif) tetikler; akut pankreatit ve ağır travma gibi enfeksiyon dışı nedenler de yapar. [[K1 s. 362]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> 2016'daki Sepsis-3 uzlaşısı sepsisi, düzensiz konak yanıtının yol açtığı yaşamı tehdit eden organ işlev bozukluğu olarak tanımlar ve SIRS ölçütlerini tanımdan çıkarmıştır. SIRS kavramı inflamasyonun fizyolojisini anlatmak için yine yararlıdır.</div>
</section>

<section class="wrap blk ders-sec" id="d75-kompleman">
  <h2>Kompleman sistemi</h2>
  <p class="intro">Kompleman 25 plazma proteininden oluşan bir sistemdir; doğal bağışıklığa sayılır ama antikorların etkisini "tamamladığı" (complement) için kazanılmış bağışıklığa da katkı verir. [[K1 s. 362]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İki giriş kapısı, dört görev</h3></div>
    <div data-viz="f75_kompleman"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Etkinleşme.</b> Alternatif yol: belirli türde bir bakteri hücre duvarıyla temas. Klasik yol: antikor–antijen kompleksi. Adımları ilerletin. [[K1 s. 362]]</p>
    <p class="viz-foot">Şematik; kompleman proteinlerinin tek tek adları kitapta verilmez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Etkinleşen kompleman dört iş yapar. Birçok proteini birleşip <b>membran atak kompleksi</b> kurar ve bakteri zarını deler; su osmotik eğimle içeri girer, bakteri şişip patlar. <b>Opsonizasyonda</b> protein parçaları mikrobu kaplar ve nötrofil ile makrofaja tutunma yeri olur. <b>Kemotakside</b> dokuya geçmiş lökositleri enfeksiyon odağına yönlendirir. Son olarak mast hücrelerini degranüle edip histamin gibi vazoaktif aracılarla inflamasyonu artırır. [[K1 s. 363]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-lenfoid">
  <h2>Lenfoid doku ve timusta T hücre seçimi</h2>
  <p class="intro">Lenfoid doku lenfositi üreten (kemik iliği), işleyen (timus) ve depolayan (lenf düğümü, dalak, tonsil, apendiks, bağırsakla ilişkili lenfoid doku: Peyer plakları) dokuların ortak adıdır. [[K1 s. 363]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Timus elemesi: rastgele reseptör, sıkı sınav</h3></div>
    <div data-viz="f75_timus"></div>
    <p class="viz-cap" aria-live="polite"><b>Seçim sürüyor.</b> Her T hücresi rastgele bir TCR ile gelir; timus epiteli vücudun bütün proteinlerini gösterir ve kendi proteinine güçlü bağlanan hücre apoptozla ölür. Yaklaşık %98 elenir, %2 olgunlaşır. [[K1 s. 363]]</p>
    <p class="viz-foot">Model şematiktir: hücre akışı temsilîdir, yalnız %98/%2 oranı kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kemik iliği ortak lenfoid öncül kök hücrelerden naif B ve T lenfositleri üretir. B hücreleri iliğin içinde olgunlaşır; T hücreleri timusa göçüp orada olgunlaşır. Yalnız %2'si kurtulsa da ≈ 100 milyon farklı TCR'li T hücresi kalır. [[K1 s. 363]]</p>
    <p>Timusun önemi yokluğunda görülür: <b>DiGeorge sendromu</b>, genellikle timus aplazisini de içeren orta hat doğumsal kusuru yapan genetik bir hastalıktır; timussuz doğan çocuklarda ağır immün yetmezlik olur. B hücreleri de kemik iliğinde kendine tepki yönünden sınanır: kendi antijenine güçlü bağlanan BCR (hücre yüzeyine bağlı bir antikor) taşıyan hücre olgunlaşamaz ve apoptozla elenir; kalanlar olgunlaşıp dolaşıma çıkar ve lenfoid dokuda depolanır. [[K1 s. 363]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-antikor">
  <h2>Antikorlar ve antikor üretimi</h2>
  <p class="intro">Antikor (örneği immünoglobulin, Ig) kazanılmış bağışıklığın ürettiği, saldıran patojene özgül, Y biçimli bir proteindir; üretimi APC'den plazma hücresine uzanan bir zincirle olur. [[K1 s. 363–365]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Enfeksiyon odağından lenf düğümüne ve geri</h3></div>
    <div data-viz="f75_antikor"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Fagositoz.</b> Makrofaj ya da dendritik hücre (birlikte: antijen sunan hücre, APC) bakteriyi yutar ve küçük parçalarını (antijen) MHC sınıf II ile yüzeyinde gösterir. Adımları ilerletin. [[K1 s. 365]]</p>
    <p class="viz-foot">Şematik akış; hücre sayıları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Antikorun dört işi vardır. <b>Opsonizasyon:</b> patojeni etiketler; kuyruğu oluşturan Fc bölgesi patojenden dışa bakar ve lökosite tutunma yeri olur. <b>Aglütinasyon:</b> birden çok bağlanma yeri birkaç patojeni kümeleyip daha büyük hedef yapar. <b>İnaktivasyon:</b> mikrobun işlevi için önemli bir parçayı ya da salgıladığı toksini bağlayıp zararsızlaştırır. <b>Kompleman etkinleşmesi:</b> klasik yolu başlatır. [[K1 s. 363]]</p>
    <p>B hücresinin etkinleşmesi (genellikle) eşleşen T yardımcı hücrenin desteğini ister. Bu bir güvenlik düzeneğidir: APC antijeni hem bir T yardımcı hem bir B hücresiyle tam eşleşmelidir. Plazma hücresi saniyede ≈ 2000 antikor üretir; bunu kendi protein sentezi pahasına yaptığından ancak bir hafta kadar yaşar. [[K1 s. 365]]</p>
  </div>
  <p style="margin-top:12px">Zincirin halkaları şunlardır. APC antijeni enfeksiyon odağından yakındaki lenfoid dokuya, çoğu zaman bir lenf düğümüne taşır. Lenf düğümünde her biri farklı BCR ve TCR taşıyan çok sayıda B ve T yardımcı hücre bulunur; APC antijeni önünden geçen her hücreye sunar ve sonunda reseptörü tam eşleşenleri bulur. TCR'si eşleşen T yardımcı hücre (<b>CD4+</b>: CD4 reseptörü APC'nin MHC sınıf II molekülüyle etkileşir) blast hücresine dönüşür ve hızla çoğalıp aynı antijene özgül bir klon kurar; küçük bir kısmı, aynı patojen dönerse hızla etkinleşmek üzere uykuda bekleyen bellek T yardımcı hücresi olur. [[K1 s. 365]]</p>
  <p>Yüzey Ig'si (BCR) eşleşen ve T yardımcı desteğini alan B hücresi aynı zar Ig'sini taşıyan bir klon üretir; yavru hücrelerin çoğu plazma hücresine, kalanı bellek hücresine farklılaşır. Bellek hücreleri, aynı patojen yeniden gelirse hemen etkinleşmeye hazır uykudaki hücrelerdir. [[K1 s. 365]]</p>
</section>

<section class="wrap blk ders-sec" id="d75-yanit">
  <h2>Primer ve sekonder yanıt; aktif ve pasif bağışıklama</h2>
  <p class="intro">İlk karşılaşmadaki yanıt yavaştır; ikinci karşılaşmada bellek hücreleri sayesinde yanıt hem çok daha hızlı hem daha güçlüdür. [[K1 s. 365]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Antikor düzeyi–zaman: ilk ve ikinci karşılaşma</h3></div>
    <div data-viz="f75_yanit"></div>
    <p class="viz-cap" aria-live="polite"><b>Primer yanıt.</b> Patojen girişinden antikor üretimine ≈ 5 gün; başlıca IgM, sonra biraz IgG. Patojen yok edildikten sonraki 5 günde plazma ve T yardımcı hücrelerin çoğu ölür. "İkinci karşılaşma"yı seçin. [[K1 s. 365]]</p>
    <p class="viz-foot">Eğriler nitel ve başlangıçları yumuşatılmıştır; tepe yükseklikleri, genişlikler ve ikinci karşılaşmanın 20. günü temsilîdir. Yalnız ≈ 5 gün ve "saatler içinde" kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Sekonder yanıtta APC'ler antijeni yine lenf düğümüne taşır, ama bu kez primer yanıtın klonal çoğalmasında oluşmuş bellek T yardımcı ve bellek B hücreleri etkinleşir; saatler içinde antikor üretilir, çoğu IgG'dir. Patojen kişiyi hasta etmeden öldürülür: önceki karşılaşmaya dayanan bu korunmaya <b>aktif bağışıklık</b> denir. [[K1 s. 365]]</p>
    <p><b>Bağışıklama</b>, kişiyi bir enfeksiyona dirençli hâle getirmektir. Aktif bağışıklamada (aşı) virüs ya da bakterinin inaktif bir parçası, genellikle enjeksiyonla verilir; antikor ile bellek B ve T yardımcı hücreler oluşur ve gerçek patojen gelince hızlı sekonder yanıt doğar. Bunun için hastanın aşıya yanıt verebilmesi (immünokompetan olması) gerekir. [[K1 s. 365–366]]</p>
    <p>Pasif bağışıklamada hazır antikor verilir. Fizyolojik örnek: IgG plasentadan fetüse geçer, doğumdan sonra IgA anne sütüyle bebeğe ulaşır; bağışıklığı henüz yanıt veremeyen bebek böyle korunur. Klinik örnek: rekombinant antikorların parenteral verilmesi; risk altındaki gebeye fetüs enfeksiyonunu önlemek için varisella zoster Ig, ağır tetanosta toksini nötralize etmek için tetanos Ig. [[K1 s. 366]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-hucresel">
  <h2>Hücresel bağışıklık ve sitotoksik T hücreleri</h2>
  <p class="intro">Bazı patojenler (bazı virüsler, parazitler, mayalar ve <i>Mycobacterium tuberculosis</i> gibi bazı bakteriler) konak hücrenin içinde saklanır, onun protein sentezini kullanıp çoğalır; bunlara antikor ya da kompleman olmadan, sitotoksik T hücreleriyle karşı konur. [[K1 s. 366–367]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>MHC sınıf I vitrini ve devriye gezen Tc</h3></div>
    <div data-viz="f75_tc"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Vitrin.</b> Vücudun bütün hücreleri hücre içi proteinlerinden örnek alır, işler ve MHC sınıf I üzerinde zarında gösterir; enfekte hücrede yabancı protein de vitrine çıkar. Adımları ilerletin. [[K1 s. 366]]</p>
    <p class="viz-foot">Şematik; hücre ve virüs boyutları ölçeksiz.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Tc'ler vücutta devriye gezip hiçbir hücrenin yabancı madde göstermediğini denetler. TCR'si bir hücredeki yabancı proteine uyan Tc etkinleşir: hücrede apoptozu başlatır, patojen ölen hücrenin içinde kalır ve doku makrofajları ölü hücreyi yutarak hücre içi patojeni de öldürür. Etkin Tc hızla bölünüp aynı TCR'yi taşıyan çok sayıda yavru hücre üretir; bunlar dolaşımda başka enfekte hücre arar. [[K1 s. 366–367]]</p>
    <p>Sitotoksik T hücreleri (Tc) <b>CD8+</b> hücrelerdir: MHC sınıf I ile CD8 reseptörü etkileşir. Timustan yalnız TCR'si normal konak proteinlerine bağlanmayan Tc'ler çıkabildiğinden, Tc'nin bağlandığı her konak hücresi büyük olasılıkla enfektedir. Malign hücreler de zarlarında anormal protein gösterir ve Tc bunların da apoptozunu başlatır. [[K1 s. 366–367]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-ig">
  <h2>İmmünoglobulinin yapısı ve türleri</h2>
  <p class="intro">Antikor, disülfit köprüleriyle bağlı iki özdeş ağır ve iki özdeş hafif zincirden oluşan Y biçimli büyük bir proteindir; beş türün hepsi bu temel Y'yi taşır, bazıları polimer yapar. [[K1 s. 367]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Fab, Fc ve beş Ig türü</h3></div>
    <div data-viz="f75_ig"></div>
    <p class="viz-cap" aria-live="polite"><b>Temel yapı.</b> Değişken bölge (Fab) antijeni tanıyıp bağlar; her antikorun Fab'ı farklıdır. Sabit bölge (Fc) fagositlere ve komplemana bağlanır; aynı türdeki (IgG, IgM …) bütün antikorların Fc'si aynıdır. Bir Ig türü seçin. [[K1 s. 367]]</p>
    <p class="viz-foot">Şematik; molekül boyutları ölçekli değil.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <table class="tbl" style="margin-top:4px"><thead><tr><th>Tür</th><th>Yapı</th><th>Öne çıkan özellik</th></tr></thead><tbody>
      <tr><td>IgM</td><td>Pentamer (en büyük)</td><td>Primer yanıtta ilk üretilen; büyük antijenleri iyi bağlar. [[K1 s. 367]]</td></tr>
      <tr><td>IgG</td><td>Monomer</td><td>En bol Ig; plasentayı geçen tek Ig. [[K1 s. 367]]</td></tr>
      <tr><td>IgA</td><td>Dimer</td><td>Mukoza (solunum yolu, bağırsak), tükürük, gözyaşı, anne sütü. [[K1 s. 367]]</td></tr>
      <tr><td>IgE</td><td>Monomer</td><td>Mast hücresi yüzeyinde; antijen bağlanınca degranülasyon (tip I aşırı duyarlılık). Plazmada düşük; atopi (ör. astım), parazit enfeksiyonu ve aşırı duyarlılıkta artar. [[K1 s. 367]]</td></tr>
      <tr><td>IgD</td><td>Monomer</td><td>Naif B hücre zarında IgM'nin yanında; işlevi belirsiz. B hücresi etkinleşince kaybolur, zarı tümüyle IgM kaplar. [[K1 s. 367]]</td></tr>
    </tbody></table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-hiper">
  <h2>Aşırı duyarlılık ve türleri</h2>
  <p class="intro">Aşırı duyarlılık, rahatsızlık, doku hasarı, hatta ölüm yapan abartılı ya da uygunsuz bir bağışıklık yanıtıdır; dört türü vardır. [[K1 s. 368]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tip I–IV: kim hasar verir, ne kadar sürede?</h3></div>
    <div data-viz="f75_hiper"></div>
    <p class="viz-cap" aria-live="polite"><b>Tip I · anında.</b> İlk karşılaşmada alerjene özgül IgE oluşur ve mast hücrelerini kaplar; yeniden karşılaşmada alerjen IgE'ye bağlanır, mast hücresi hızla degranüle olup histamin, lökotrien ve prostaglandin salar. Öteki türleri seçin. [[K1 s. 368]]</p>
    <p class="viz-foot">Şematik mekanizmalar; zaman çubuğu nitel (yalnız tip IV'ün 2–3 günü kitaptandır).</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Tip I</b>in klinik görünümü mast hücrelerinin yerine ve alerjenin giriş yoluna bağlıdır. Astımda solunan alerjen bronş düz kasındaki mast hücrelerini degranüle eder; histamin ve lökotrienler bronkospazm yapar. Alerjik rinitte (saman nezlesi; ör. çimen poleni) nazofarenks mukozasında salınan histamin göz kaşıntısı, burun mukozasında inflamasyon ve mukus artışı yapar. Anafilakside alerjen dolaşıma ulaşır; yaygın degranülasyon yaşamı tehdit eden vazodilatasyon, bronkospazm ve sıvı ekstravazasyonu doğurur. Alerjen doğrudan dolaşıma enjekte edilince en ağırdır; anestezide en sık görülmesinin nedeni budur. [[K1 s. 368–369]]</p>
    <p><b>Tip II</b>de (sitotoksik) antikorlar vücudun kendi hücre yüzey antijenlerine bağlanır; kompleks komplemanı başlatır, inflamasyon ve makrofaj fagositozu izler. İdiyopatik trombositopenik purpurada IgG trombositleri ve öncülleri megakaryositleri kaplar, dalak ve karaciğer makrofajları onları yutar ve trombosit sayısı çok düşer. Goodpasture hastalığında IgG glomerül ve alveol bazal membranındaki tip IV kollajene bağlanır: akut böbrek hasarı ve akciğer kanaması. [[K1 s. 369]]</p>
    <p><b>Tip III</b>te (immün kompleks hastalığı) antikor (genellikle IgG) antijene bağlanır, ama kitaba göre özellikle antikor azken kompleksler komplemanı etkinleştirmeye yetmez; dolaşımdaki kompleksler küçük damarlara, eklemlere ve glomerüllere takılıp inflamasyon yapar. Örnekler: sistemik lupus eritematozus (antinükleer antikor + çekirdek antijeni; deri, glomerül, eklem) ve çiftçi akciğeri (solunan küf sporlarına karşı aşırı duyarlılık pnömoniti; kompleksler akciğere çöker). [[K1 s. 369]]</p>
    <p><b>Tip IV</b> (gecikmiş tip) antikor değil T hücre aracılıdır ve 2–3 günde gelişir: APC'nin sunduğu antijeni tanıyan T yardımcı hücreler çoğalıp sitokin salar; hasarı bu sitokinlerle etkinleşen makrofajlar verir. Klasik örnek tüberkülozdur: makrofajlar birleşip antijenin çevresinde dev hücreler kurar, merkez nekroze olabilir (kazeifiye granülom); T yardımcı hücresi olmayan AIDS hastaları <i>M. tuberculosis</i> gibi hücre içi patojenlere çok duyarlıdır. Kontakt dermatitte (ör. nikel) deri tepkisi gecikmelidir. [[K1 s. 369]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-yetmezlik">
  <h2>İmmün yetmezliğin sınıflaması</h2>
  <p class="intro">İmmün yetmezlikte bağışıklık sistemi bozuk ya da yoktur; sonuç hangi bileşenin etkilendiğine bağlıdır, ama genellikle fırsatçı enfeksiyon ve bazı kanserlerde artış görülür. [[K1 s. 367]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Primer ve sekonder immün yetmezlik ağacı</h3></div>
    <div data-viz="f75_yetmezlik"></div>
    <p class="viz-cap" aria-live="polite"><b>Primer.</b> Bağışıklık sisteminin gelişim kusuru: T hücre (DiGeorge), birleşik B ve T (ağır kombine immün yetmezlik), B hücre (X'e bağlı agamaglobulinemi), kompleman eksikliği. Bir dala dokunun. [[K1 s. 367]]</p>
    <p class="viz-foot">Şematik sınıflama ağacı; seçili dalın ayrıntıları gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>X'e bağlı agamaglobulinemide genetik olarak kusurlu B hücreleri antikor sentezleyemez. Kompleman eksikliğinde tek bir kompleman proteininin yokluğu enfeksiyona ya da otoimmün hastalığa yol açar. Sekonder nedenler: iyatrojenik (en sık steroidler, kemoterapi ilaçları, radyoterapi ve transplant reddini önleyen immünosupresifler), yaşlanma ve malnütrisyon (genel işlev azalması) ve özgül hastalıklar: kanser (özellikle lösemi ve miyelom gibi bağışıklık hücrelerini tutanlar) ve edinsel immün yetmezlik sendromu (AIDS). [[K1 s. 367]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-anestezi">
  <h2>Klinik önem: anestezi ve cerrahinin bağışıklığa etkileri</h2>
  <p class="intro">Perioperatif dönemde bağışıklık üç yoldan etkilenir: fizikokimyasal engeller bozulur, hasta alerjenlerle karşılaşır ve bağışıklık sistemi baskılanır. [[K1 s. 369–370]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Engel, alerjen, baskılanma</h3></div>
    <div data-viz="f75_anestezi"></div>
    <p class="viz-cap" aria-live="polite"><b>Alerjenler (NAP6).</b> Genel anestezide anafilaksi 1/10 000, olguların %4'ü ölümcül. Nedenler: antibiyotikler %47 (özellikle penisilinler, teikoplanin), kas gevşeticiler %33 (özellikle süksametonyum), antiseptikler %9 (klorheksidin emdirilmiş santral kateterler dahil). Öteki sekmeleri açın. [[K1 s. 369]]</p>
    <p class="viz-foot">Şematik gösterim; yüzdeler İngiltere 6. Ulusal Denetim Projesi'nin (NAP6) kitapta verilen değerleridir; gösterilen üç neden toplamın tamamı değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Engeller.</b> En belirgin giriş yolu deri ya da mukozanın açıldığı cerrahi alandır. Ayrıca endotrakeal entübasyon ve kuru gaz solutmak trakeobronşiyal silya işlevini bozar ve pnömoniye zemin hazırlar. <b>Seyrek alerjenler:</b> lateks, kolloidler, kan ürünleri, amid lokal anestezikler ve indüksiyon ajanları. [[K1 s. 369]]</p>
    <p><b>Baskılanma.</b> Cerrahiye stres yanıtı lenfosit işlevini ve fagositozu baskılar. Opioidler makrofaj, nötrofil ve NK hücre işlevini, lenfosit çoğalmasını ve sitokin salınımını bozar. NK hücreleri kanser cerrahisinde cerrahtan kaçan tümör hücrelerini öldürdükleri için önemlidir: küçük retrospektif çalışmalarda bölgesel anestezi (ör. meme cerrahisinde sistemik opioid yerine paravertebral blok) daha iyi sağkalımla ilişkili bulundu. Volatil anestezikler NK işlevini azaltır, propofolün etkisi yoktur; büyük bir retrospektif çalışmada kanser cerrahisinde TİVA nüksü belirgin azalttı. [[K1 s. 369–370]]</p>
    <p>Allojenik kan transfüzyonu bağışıklığı geçici olarak baskılar (transfüzyonla ilişkili immünomodülasyon, TRIM); bu bazen yararlıdır: böbrek nakli öncesi transfüzyon yapılan hastalarda greft sağkalımı daha iyidir. Perioperatif hipotermi hem doğal hem kazanılmış bağışıklığı baskılar ve kanser cerrahisinde sağkalımı azaltabilir. [[K1 s. 370]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Kitap ester lokal anesteziklerde alerjinin çok seyrek olduğunu yazar; doğrusu tersidir: PABA'ya yıkılan esterler alerjiyi amidlerden daha sık yapar, amid alerjisi çok seyrektir.</div>
  <div class="note plain" style="margin-top:10px"><b>Atlas notu.</b> Kitaptaki sağkalım verileri retrospektiftir. Sonraki büyük randomize çalışmada (Sessler ve ark., Lancet 2019, meme kanseri, n = 2108) paravertebral blok ve propofolle yapılan bölgesel anestezi, volatil anestezik ve opioide göre nüksü azaltmadı.</div>
</section>

<section class="wrap blk ders-sec" id="d75-p1">
  <h2>Part I'de (MTF)</h2>
  <p>Bu bölüm Part I'de antijen–hapten ayrımı, hücre sayıları (%60 nötrofil, 5–20 ve 100 bakteri, %98 timus elemesi, 2000 antikor/sn), SIRS eşikleri, Ig türlerinin özellikleri, aşırı duyarlılık türlerinin örnekleri ve NAP6 yüzdeleriyle sorulur. Her önermeyi tek başına doğru ya da yanlış diye işaretleyin. [[K1 s. 360–370]]</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz75-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz75-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz75-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d75-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Antibiyotik profilaksisi ve indüksiyondan birkaç dakika sonra hastanızda ağır hipotansiyon ve bronkospazm gelişti. Bu tablonun bağışıklık mekanizmasını, antikor yapısından başlayarak anlatın; öteki aşırı duyarlılık türlerinden nasıl ayrılır?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Çerçeve.</b> Doğal (hızlı, özgül değil) ve kazanılmış (yavaş, özgül, bellekli; hücresel ve hümoral) bağışıklık; alerjen = çoğu zaman zararsız ama şiddetli yanıt doğuran çevresel antijen. [[K1 s. 360]]</li>
    <li><b>Duyarlanma.</b> İlk karşılaşma: APC antijeni MHC II ile sunar; CD4+ T yardımcı ve B hücresi çift eşleşmeyle etkinleşir, plazma hücreleri alerjene özgül IgE yapar. [[K1 s. 365, 368]]</li>
    <li><b>Antikor yapısı.</b> İki ağır + iki hafif zincir, disülfit köprüleri; Fab antijeni bağlar, Fc hücrelere ve komplemana; IgE monomerdir ve mast hücresi yüzeyine oturur. [[K1 s. 367]]</li>
    <li><b>Tetiklenme.</b> Yeniden karşılaşmada alerjen mast hücresindeki IgE'ye bağlanır; hızlı degranülasyon: histamin, lökotrien, prostaglandin. [[K1 s. 368]]</li>
    <li><b>Klinik.</b> Damar içine verilen alerjen yaygın degranülasyon yapar: vazodilatasyon, bronkospazm, sıvı ekstravazasyonu; damar içi girişte en ağırdır, anestezide en sık görülmesinin nedeni de budur. [[K1 s. 368–369]]</li>
    <li><b>Perioperatif nedenler.</b> NAP6: 1/10 000, %4 ölümcül; antibiyotik %47 (penisilin, teikoplanin), kas gevşetici %33 (süksametonyum), antiseptik %9 (klorheksidin); seyrek lateks, kolloid, kan ürünü. [[K1 s. 369]]</li>
    <li><b>Ayırım.</b> Tip II: hücre yüzeyine antikor + kompleman (İTP, Goodpasture); tip III: immün kompleks birikimi (SLE, çiftçi akciğeri); tip IV: T hücre ve makrofaj, 2–3 gün (tüberküloz, nikel dermatiti). [[K1 s. 369]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Ortaya bir Y çizin: iki ağır, iki hafif zincir, kollarda Fab, gövdede Fc. Yanına Fc'siyle zara oturmuş IgE'leri taşıyan bir mast hücresi ekleyin; alerjen iki IgE'yi köprüleyince granüllerden histamin, lökotrien ve prostaglandin çıksın; oklarla vazodilatasyon, bronkospazm ve ödeme bağlayın. [[K1 s. 367–368]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Hapten nedir? Plasentayı hangi Ig geçer? Primer ve sekonder yanıt nasıl ayrılır? Kompleman nasıl etkinleşir, ne yapar? Timus neden bu kadar çok T hücresini öldürür? Opioidler ve volatil anestezikler NK hücrelerini nasıl etkiler? TRIM nedir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 360–370]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d75-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Antijen protein ya da polisakkarittir; hapten yalnız taşıyıcı proteine bağlıyken, alerjen zararsız olduğu hâlde şiddetli yanıt doğurur. Doğal bağışıklık hızlı ve özgül değildir; kazanılmış bağışıklık yavaş, özgül ve bellekli. [[K1 s. 360]]</li>
    <li>Nötrofil (%60, 5–20 bakteri), makrofaj (100 bakteri), eozinofil (helmint, alerji), bazofil (histamin, heparin) ve NK hücresi (tümör, virüslü hücre) doğal yanıtın hücreleridir. [[K1 s. 360–361]]</li>
    <li>İnflamasyon: histaminle arteriyoler vazodilatasyon, TNF-α ve histaminle venül sızıntısı, adezyon molekülleriyle transmigrasyon ve kemotaksis; sistemik taşma SIRS'e ve çoklu organ işlev bozukluğuna (en sık ARDS) gidebilir. [[K1 s. 361–362]]</li>
    <li>Kompleman (25 protein; alternatif ve klasik yol) bakteriyi deler, opsonize eder, lökositi çeker ve mast hücresini degranüle eder. [[K1 s. 362–363]]</li>
    <li>T hücrelerinin ≈ %98'i timusta elenir; antikor için APC'nin hem CD4+ T yardımcı hem B hücresiyle eşleşmesi gerekir; plazma hücresi saniyede 2000 antikor yapar, bir hafta yaşar. [[K1 s. 363–365]]</li>
    <li>Primer yanıt ≈ 5 gün ve IgM ağırlıklı, sekonder yanıt saatler içinde ve IgG ağırlıklıdır; aşı aktif, anne IgG'si ve IgA'sı ile Ig tedavisi pasif bağışıklamadır. Tc (CD8+) MHC I'de yabancı protein gösteren hücreyi apoptoza sokar. [[K1 s. 365–367]]</li>
    <li>IgM pentamer ve ilk; IgG en bol ve plasentayı geçen; IgA dimer ve mukozal; IgE mast hücresinde; IgD naif B hücresinde. Aşırı duyarlılık: I IgE–mast, II hücreye antikor, III immün kompleks, IV T hücre (2–3 gün). [[K1 s. 367–369]]</li>
    <li>Perioperatif dönemde engeller bozulur, anafilaksi riski doğar (antibiyotik %47, kas gevşetici %33, klorheksidin %9) ve stres, opioid, volatil ajan, transfüzyon (TRIM) ve hipotermi bağışıklığı baskılar. [[K1 s. 369–370]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="75"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/74">← Bölüm 74 · Anemi ve polisitemi</a>
    <a href="#/dersler/fizyoloji/ek75">Sonraki: Ek ders · Transplantasyon immünolojisi ve anestezinin bağışıklık işlevine etkisi →</a>
  </nav>
</section>`,
};
