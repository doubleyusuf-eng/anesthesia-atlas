/* Fizyoloji modülü. Kaynak kitap: K1 = Chambers, Huang, Matthews. Basic Physiology for Anaesthetists, 2. baskı (2019).
   Bölüm sırası ve sayfa numaraları kitabın İngilizce özgün baskısını izler. Ders metinleri, örnek sorular ve
   animasyonlar bu atlas için yazılmıştır; kitaptan metin ya da şekil kopyalanmaz. Her bilgi [[K1 s. n]] ile sayfasına bağlanır. */
window.FIZYOLOJI = {
  kisimlar: [
    { no: 1, ad: 'Temel bilgiler', b: [[1, 'Vücudun genel organizasyonu', 1], [2, 'Hücrenin bileşenleri ve işlevi', 6], [3, 'Genetik', 9], [4, 'Hücre zarı', 13], [5, 'Enzimler', 18]] },
    { no: 2, ad: 'Solunum fizyolojisi', b: [[6, 'Üst hava yolları', 21], [7, 'Alt hava yolları', 24], [8, 'Oksijen taşınması', 30], [9, 'Karbondioksit taşınması', 37], [10, 'Alveoler difüzyon', 40], [11, 'Ventilasyon ve ölü boşluk', 45], [12, 'Statik akciğer hacimleri', 50], [13, 'Spirometri', 56], [14, 'Hipoksi ve şantlar', 63], [15, 'Ventilasyon–perfüzyon ilişkileri', 68], [16, 'Akciğerde ventilasyon–perfüzyon zonları', 71], [17, 'Oksijen sunumu ve gereksinimi', 74], [18, 'Alveoler gaz denklemi', 77], [19, 'Oksijen kaskadı', 80], [20, 'Akciğer kompliyansı', 82], [21, 'Solunum işi', 88], [22, 'Ventilasyonun kontrolü', 93], [23, 'Pulmoner dolaşım', 97], [24, 'Oksijen toksisitesi', 102], [25, 'Ventilatuvar yetmezlik', 104], [26, 'Anestezi ve akciğer', 107]] },
    { no: 3, ad: 'Kardiyovasküler fizyoloji', b: [[27, 'Kalbin anatomisi ve işlevi', 111], [28, 'Kardiyak siklus', 117], [29, 'Kalp debisi ve ölçümü', 121], [30, 'Starling yasası ve kardiyak işlev bozukluğu', 131], [31, 'Kardiyak basınç–hacim halkaları', 136], [32, 'Kardiyak iskemi', 141], [33, 'Sistemik dolaşım', 145], [34, 'Arteriyel sistem', 148], [35, 'Arteriyel basınç dalga biçimleri', 155], [36, 'Kapillerler ve endotel', 158], [37, 'Venöz sistem', 163], [38, 'Venöz basınç dalga biçimleri', 166], [39, 'Lenfatik sistem', 168], [40, 'Kardiyovasküler refleksler', 170], [41, 'Valsalva manevrası', 175], [42, 'Egzersiz fizyolojisi', 178], [43, 'Egzersiz testleri', 185]] },
    { no: 4, ad: 'Nörofizyoloji', b: [[44, 'Nöronun yapısı ve işlevi', 189], [45, 'Beyin', 192], [46, 'Beyin–omurilik sıvısı', 198], [47, 'Kan–beyin bariyeri', 200], [48, 'Serebral kan akımı', 202], [49, 'İntrakraniyal basınç ve kafa travması', 206], [50, 'Omurilik', 211], [51, 'İstirahat membran potansiyeli', 221], [52, 'Sinir aksiyon potansiyeli ve yayılması', 225], [53, 'Sinapslar ve nöromüsküler kavşak', 231], [54, 'İskelet kası', 239], [55, 'Kas iğcikleri ve Golgi tendon organları', 246], [56, 'Düz kas', 249], [57, 'Kalp kası', 252], [58, 'Elektrokardiyogram', 262], [59, 'Otonom sinir sistemi', 267], [60, 'Ağrı fizyolojisi', 272], [61, 'Göz ve göz içi basınç', 276]] },
    { no: 5, ad: 'Gastrointestinal sistem', b: [[62, 'Tükürük, özofagus ve yutma', 279], [63, 'Mide ve kusma', 283], [64, 'Gastrointestinal sindirim ve emilim', 289], [65, 'Karaciğer: anatomi ve kanlanma', 295], [66, 'Karaciğer işlevi', 299]] },
    { no: 6, ad: 'Böbrek ve vücut sıvıları', b: [[67, 'Böbrek işlevi, anatomisi ve kan akımı', 307], [68, 'Renal filtrasyon ve geri emilim', 313], [69, 'Su ve elektrolit dengesinin böbrekte düzenlenmesi', 318], [70, 'Asit–baz fizyolojisi', 329], [71, 'Miksiyon', 338]] },
    { no: 7, ad: 'Kan ve bağışıklık sistemi', b: [[72, 'Hemostaz', 341], [73, 'Transfüzyon', 350], [74, 'Anemi ve polisitemi', 356], [75, 'Bağışıklık sistemi', 360], [76, 'Plazma bileşenleri', 371]] },
    { no: 8, ad: 'Enerji dengesi', b: [[77, 'Metabolizma', 373], [78, 'Açlık', 384], [79, 'Stres yanıtı', 387]] },
    { no: 9, ad: 'Endokrin fizyoloji', b: [[80, 'Hipotalamus ve hipofiz', 391], [81, 'Tiroit, paratiroit ve adrenal bezler', 396]] },
    { no: 10, ad: 'Gelişim fizyolojisi', b: [[82, 'Gebelikte maternal fizyoloji', 405], [83, 'Fetal fizyoloji', 411], [84, 'Pediatrik fizyoloji', 418], [85, 'Yaşlanma fizyolojisi', 422], [86, 'Obezite fizyolojisi', 427]] },
    { no: 11, ad: 'Çevresel fizyoloji', b: [[87, 'İrtifa', 431], [88, 'Dalış', 434], [89, 'Sıcaklık düzenlenmesi', 436]] },
  ],
  // Hazır bölümler SAYFALAR['dersler/fizyoloji/NN'] var mı diye kendiliğinden bulunur (her bölüm kendi dosyasında: data/dersler/fizyoloji-NN.js).
  /* Ek dersler: Chambers'ta olmayan ya da kısa kalan konular, K2'den (Power & Kam, 3. baskı) ilgili bölümün ardına.
     Kaynak: kullanıcının "Chambers_Fizyoloji_Eki_Kam_Power_TR.pdf" seçkisi; s. = K2 özgün sayfaları. */
  ekler: [
    { sonra: 22, ad: 'Nefes tutma, egzersiz ve anestezik ajanların ventilasyon kontrolüne etkisi', s: '109–110' },
    { sonra: 37, ad: 'Venöz dönüş, ortalama sistemik dolum basıncı ve kalp debisiyle ilişkisi', s: '156–160' },
    { sonra: 45, ad: 'EEG, uyarılmış potansiyeller ve uyku', s: '63–65' },
    { sonra: 55, ad: 'Omurilik refleksleri, kas tonusu ve postür', s: '62–63' },
    { sonra: 60, ad: 'Ağrının periferik mekanizmaları', s: '399' },
    { sonra: 70, ad: 'Asit–baz kompansasyonu: hücre içi tamponlar, in vitro ve in vivo tampon doğruları', s: '257' },
    { sonra: 75, ad: 'Transplantasyon immünolojisi ve anestezinin bağışıklık işlevine etkisi', s: '320–323' },
    { sonra: 88, ad: 'İvmelenme, uzay yolculuğu ve kronik dağ hastalığı', s: '445–446' },
    { sonra: 89, ad: 'Termogenez, termonötral bölge ve hipotermiye yanıtlar', s: '384–385' },
  ],
};

/* ---------- Bölüm 1 · Vücudun genel organizasyonu (K1 s. 1–5) ---------- */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz01-1'] = {
  no: 1, kok: 'Üç germ yaprağından gelişen yapılar için:', kagit: 'Paper A · fizyoloji, Bölüm 1', kaynak: '[[K1 s. 1]]',
  onermeler: [
    { t: 'Kan hücreleri endodermden gelişir.', d: false, n: 'Yanlış. Kan hücreleri mezodermden gelişir (bağ dokusu, kemik ve kemik iliği, kıkırdak, yağ ve kasla birlikte). [[K1 s. 1]]' },
    { t: 'Sinir sistemi ektodermden gelişir.', d: true, n: 'Doğru. Sinir sistemi ve epidermis ektodermden gelişir. [[K1 s. 1]]' },
    { t: 'Akciğerlerin ve gastrointestinal sistemin epitel örtüsü endodermden gelişir.', d: true, n: 'Doğru. Endoderm karaciğer, pankreas ve mesanenin yanı sıra akciğerlerin ve Gİ sistemin epitel örtüsünü oluşturur. [[K1 s. 1]]' },
    { t: 'Epidermis mezodermden gelişir.', d: false, n: 'Yanlış. Epidermis ektodermden gelişir. [[K1 s. 1]]' },
    { t: 'Kemik iliği ve yağ dokusu mezodermden gelişir.', d: true, n: 'Doğru. Mezodermden gelişenler: bağ dokusu, kan hücreleri, kemik ve kemik iliği, kıkırdak, yağ ve kas. [[K1 s. 1]]' },
  ],
};
VERI.sorular['fiz01-2'] = {
  no: 2, kok: 'Aşağıdakiler pozitif geri bildirim örneğidir:', kagit: 'Paper A · fizyoloji, Bölüm 1', kaynak: '[[K1 s. 4–5]]',
  onermeler: [
    { t: 'Doğum eyleminde serviksin gerilmesinin oksitosin salınımını artırması', d: true, n: 'Doğru. Kasılmalar bebeğin başını serviks üzerine iter, gerilme daha fazla oksitosin salınımına yol açar; döngü doğuma kadar sürer. [[K1 s. 4]]' },
    { t: 'PaCO₂ artışının alveoler ventilasyonu artırması', d: false, n: 'Yanlış. Bu negatif geri bildirimdir: yanıt (ventilasyon artışı) değişkeni (PaCO₂) ayar noktasına geri götürür. [[K1 s. 3–4]]' },
    { t: 'Midede pepsinin, pepsinojeni parçalayarak daha fazla pepsin oluşturması', d: true, n: 'Doğru. Düşük pH ile etkinleşen az miktardaki pepsin, öncülünü parçalayarak daha fazla pepsin oluşturur. [[K1 s. 4]]' },
    { t: 'Aksiyon potansiyelinin depolarizasyon fazında voltaj kapılı Na⁺ kanallarının açılması', d: true, n: 'Doğru. Depolarizasyon Na⁺ kanallarını açar, içeri giren Na⁺ daha fazla depolarizasyon ve daha fazla kanal açılması demektir. Kanalların kısa sürede inaktive olması döngüyü sınırlar. [[K1 s. 4–5]]' },
    { t: 'Hücre dışı Na⁺ konsantrasyonunun sıkı biçimde düzenlenmesi', d: false, n: 'Yanlış. Hücre dışı Na⁺ konsantrasyonu homeostatik olarak, yani değişkeni ayar noktasında tutan negatif geri bildirimle sıkı kontrol edilir. [[K1 s. 2–3]]' },
  ],
};
VERI.sorular['fiz01-3'] = {
  no: 3, kok: 'Homeostatik kontrol mekanizmaları için:', kagit: 'Paper A · fizyoloji, Bölüm 1', kaynak: '[[K1 s. 3–4]]',
  onermeler: [
    { t: 'Parakrin sinyalde haberci, kan yoluyla uzak organlara taşınır.', d: false, n: 'Yanlış. Parakrin haberci komşu hücrelere etki eder. Kanla taşınıp çoğu zaman uzaktaki hücreleri düzenleyen haberciler hormonlardır (endokrin sistem). [[K1 s. 2–3]]' },
    { t: 'Otokrin sinyalde kimyasal haberci, onu salgılayan hücrenin kendisine etki eder.', d: true, n: 'Doğru. Otokrin: aynı hücre; parakrin: komşu hücreler. İkisi de organ içindeki (intrinsik) kontroldür. [[K1 s. 3]]' },
    { t: 'PaCO₂ artışını algılayan merkezi kemoreseptörler hipotalamustadır.', d: false, n: 'Yanlış. Merkezi kemoreseptörler de kontrol merkezi olan solunum merkezi de medulla oblongatadadır. [[K1 s. 3–4]]' },
    { t: 'Çalışan kasta K⁺, AMP ve H⁺ birikimi kası besleyen damarlarda vazodilatasyona yol açar.', d: true, n: 'Doğru. Bu yerel (intrinsik) kontrolün kitaptaki örneğidir: kan akımı ve O₂ sunumu artar. [[K1 s. 3]]' },
    { t: 'Ekstrinsik kontrol, birçok organın eşgüdümlü düzenlenmesine ve ileri beslemeli kontrole olanak verir.', d: true, n: 'Doğru. Ekstrinsik mekanizmalar uzak bir bölgede, sinir ya da endokrin sistem aracılığıyla çalışır. [[K1 s. 3]]' },
  ],
};

const D1_NAV = [['d1-ic', 'İç ortam'], ['d1-gelisim', 'Gelişim'], ['d1-sistem', '11 sistem'], ['d1-homeo', 'Homeostaz'], ['d1-kontrol', 'Kontrol'], ['d1-neg', 'Negatif geri bildirim'], ['d1-poz', 'Pozitif geri bildirim'], ['d1-p1', 'Part I'], ['d1-p2', 'Part II'], ['d1-ozet', 'Özet']];

SAYFALAR['dersler/fizyoloji/01'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 1 · Temel bilgiler · Bölüm 1', baslik: 'Vücudun genel organizasyonu',
  lede: 'Organlar nasıl gelişir, 11 sistem nasıl birlikte çalışır ve vücut iç ortamı hangi geri bildirim döngüleriyle en uygun düzeyde tutar. [[K1 s. 1–5]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D1_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d1-ic">
  <h2>Fizyoloji: sabit değil, en uygun iç ortam</h2>
  <p class="intro">Fizyoloji vücudun, organlarının ve hücrelerinin işlevlerini inceler; amacı sabit bir durumu değil, değişen koşullara uyum sağlayan <b>en uygun (optimal) iç ortamı</b> sürdürmektir. [[K1 s. 1]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Değişen koşullar, optimal iç ortam ve anestezi</h3></div>
    <svg viewBox="0 0 320 318" style="display:block;width:100%;max-width:440px;margin:0 auto;height:auto" role="img" aria-label="Gelişim ve çevresel zorlanmalar altında optimal iç ortamın korunması">
      <defs>
        <marker id="f01-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker>
      </defs>
      <rect x="10" y="8" width="300" height="52" rx="12" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.6"/>
      <text x="160" y="30" text-anchor="middle" font-family="var(--f-display)" font-weight="700" font-size="14" fill="var(--ink)">Gelişimsel değişim</text>
      <text x="160" y="50" text-anchor="middle" font-family="var(--f-display)" font-size="12.5" fill="var(--muted)">Çocukluk · Gebelik · Yaşlanma</text>
      <rect x="10" y="68" width="300" height="52" rx="12" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.6"/>
      <text x="160" y="90" text-anchor="middle" font-family="var(--f-display)" font-weight="700" font-size="14" fill="var(--ink)">Çevresel zorlanmalar</text>
      <text x="160" y="110" text-anchor="middle" font-family="var(--f-display)" font-size="12.5" fill="var(--muted)">İrtifa · Dalış · Egzersiz</text>
      <path d="M160 122 L160 144" stroke="var(--muted)" stroke-width="1.8" marker-end="url(#f01-ok)" fill="none"/>
      <rect x="10" y="146" width="300" height="42" rx="12" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="1.6"/>
      <text x="160" y="172" text-anchor="middle" font-family="var(--f-display)" font-weight="700" font-size="14" fill="var(--ink)">Dinamik en uygun (optimal) iç ortam</text>
      <path d="M160 190 L160 212" stroke="var(--muted)" stroke-width="1.8" marker-end="url(#f01-ok)" fill="none"/>
      <rect x="10" y="214" width="300" height="42" rx="12" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.6"/>
      <text x="160" y="240" text-anchor="middle" font-family="var(--f-display)" font-weight="700" font-size="14" fill="var(--ink)">Bozulması → Hastalık</text>
      <rect x="10" y="264" width="300" height="46" rx="12" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>
      <text x="160" y="292" text-anchor="middle" font-family="var(--f-display)" font-weight="700" font-size="14" fill="var(--ink)">Anestezi ve YBÜ → bilinçli yönlendirme</text>
    </svg>
    <p class="viz-foot">Şematik özet; normal fizyoloji gelişim ve çevreyle değişir [[K1 s. 1]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Normal fizyoloji sabit kalmaz; çocukluk, gebelik ve yaşlanmayla, ayrıca yüksek irtifa, dalış ve egzersiz gibi zorlanmalarla uyarlanır. Pek çok hastalık bu optimal ortamın bozulmasıyla ilişkilidir; anestezist cerrahi ve yoğun bakım yönetimini kolaylaştırmak için bu fizyolojiyi bilinçli biçimde yönlendirir. [[K1 s. 1]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d1-gelisim">
  <h2>Organlar nasıl gelişir?</h2>
  <p class="intro">Yaklaşık 100 trilyon hücreden oluşan insan vücudu, her hücre tipine farklılaşabilen tek bir <b>totipotent</b> embriyonik hücrenin bölünüp üç germ yaprağını oluşturmasıyla gelişir. [[K1 s. 1]]</p>
  <div class="viz" style="margin-top:14px"><div data-viz="germ"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Her organ, ortak bir işlev için birlikte çalışan farklı dokulardan oluşur. Örneğin kalp; kalp kası, Purkinje liflerini içeren ileti dokusu ve kan damarlarının uyumuyla kanı damar yatağına pompalar. [[K1 s. 1]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap üç germ yaprağının ikinci haftanın sonunda oluştuğunu yazar [[K1 s. 1]]. Embriyoloji kaynaklarında ikinci haftanın sonunda iki tabakalı disk vardır; üç tabakalı disk üçüncü haftada gastrulasyonla oluşur.</div>
</section>

<section class="wrap blk ders-sec" id="d1-sistem">
  <h2>Organlardan sistemlere: 11 fizyolojik sistem</h2>
  <p class="intro">Organlar işlevsel olarak 11 fizyolojik sistemde örgütlenir ve hiçbir sistem diğerlerinden kopuk çalışmaz. [[K1 s. 1–2]]</p>
  <div class="viz" style="margin-top:14px"><div data-viz="sistemler"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Örneğin arteriyel kan basıncı kardiyovasküler, üriner, sinir ve endokrin sistemlerin etkileşiminin ortak sonucudur. Şemadaki her sistem düğmesi ilgili organları ve temel alt ayrımları (sistemik–pulmoner devreler; merkezi–periferik, afferent–efferent, somatik, otonom ve enterik sinir sistemi; doğal ve adaptif bağışıklık) gösterir. [[K1 s. 1–2]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d1-homeo">
  <h2>Homeostaz: iç ortamın düzenlenmesi</h2>
  <p class="intro">Homeostaz, hücreleri çevreleyen hücre dışı sıvının (ECF) kararlı, görece sabit ve hücreler için en uygun düzeyde tutulmasıdır. [[K1 s. 2]]</p>
  <div class="viz" style="margin-top:14px"><div data-viz="homeostaz"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Amip gibi tek hücrelilerde dış ortamdaki küçük sıcaklık, pH, ozmotik ya da iyonik dalgalanmalar hücre ölümüne yol açabilirken, insan hücrelerinin büyük çoğunluğu dış ortamla temas etmez ve bileşimi deniz suyunu andıran ECF içinde korunur. Homeostaz dinamiktir: ECF'de sürekli küçük düzeltmeler yapılır, büyük bir bozulmadan sonra ise geniş fizyolojik değişiklikler gerekir. [[K1 s. 2–3]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d1-kontrol">
  <h2>Kontrol: yerel mi, uzaktan mı?</h2>
  <p class="intro">Homeostatik kontrol mekanizmaları organın kendi içinde (intrinsik) ya da uzak bir düzenleyici merkezden (ekstrinsik) işler. [[K1 s. 3]]</p>
  <div class="viz" style="margin-top:14px"><div data-viz="yerel"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p><b>İntrinsik (yerel) kontrol</b> aynı hücreye etki eden <b>otokrin</b> ya da komşu hücrelere etki eden <b>parakrin</b> kimyasal sinyallerle yürür; çalışan kasta düşen O₂ basıncı ve biriken K⁺, AMP, H⁺ metabolitlerinin damarları genişleterek kan akımını ve O₂ sunumunu artırması bunun örneğidir. <b>Ekstrinsik (sistemik) kontrol</b> ise sinir veya endokrin sistemle uzaktan çalışır; birçok organın eşgüdümlü düzenlenmesine ve <b>ileri beslemeli (feedforward)</b> kontrole olanak tanır. [[K1 s. 3]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d1-neg">
  <h2>Negatif geri bildirim</h2>
  <p class="intro">Sinir ve endokrin sistemin homeostatik mekanizmalarının çok büyük bölümü, ölçülen değişkeni bir ayar noktasıyla karşılaştırıp sapmayı düzelten negatif geri bildirime dayanır. [[K1 s. 3]]</p>
  <div class="viz" style="margin-top:14px"><div data-viz="geribildirim"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Döngü üç bileşen ister: değişimi saptayan <b>algılayıcı</b>, sinyalleri bütünleştirip yanıt gönderen <b>kontrol merkezi</b> ve değişkeni ayar noktasına döndüren <b>efektör</b>. PaCO₂ yükseldiğinde medulladaki merkezi kemoreseptörler bunu algılar, medulladaki solunum merkezi solunum kaslarını uyarır ve artan alveoler ventilasyon PaCO₂'yi ayar noktasına indirir. [[K1 s. 3–4]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d1-poz">
  <h2>Pozitif geri bildirim</h2>
  <p class="intro">Pozitif geri bildirim sinyali büyütür: değişkendeki küçük bir artış, aynı değişkende giderek daha büyük artışları tetikler. [[K1 s. 4]]</p>
  <div class="viz" style="margin-top:14px"><div data-viz="pozitif"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Vücut öncelikle homeostazı koruduğundan pozitif döngüler çok daha az görülür ve fizyolojide genellikle eşzamanlı bir negatif kontrolle sınırlanır (ör. aksiyon potansiyelinde voltaj kapılı Na⁺ kanallarının kısa sürede inaktive olması). Fizyolojik örnekler: damar hasarında açığa çıkan az miktarda subendotelin yoğun trombin üretmesi (<b>hemostaz</b>), serviks gerildikçe artan oksitosinle güçlenen <b>doğum kasılmaları</b>, midede düşük pH ile etkinleşen az miktarda <b>pepsinin</b> pepsinojeni parçalayarak çoğalması, <b>aksiyon potansiyeli depolarizasyonu</b> ve sistolde giren Ca²⁺'un sarkoplazmik retikulumdan yoğun Ca²⁺ saldırdığı <b>kalpte uyarılma–kasılma eşleşmesidir</b>. [[K1 s. 4–5]]</p>
    <p>Patolojide kontrolsüz bir kısır döngü doğabilir: <b>dekompanse kanamada</b> kan basıncı düşüşü organ perfüzyonunu azaltıp doku hipoksisi yapar; gelişen vazodilatasyon basıncı daha da düşürerek ölümcül olabilir. [[K1 s. 5]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d1-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok tanımlar ve sınıflamalar üzerinden sorulur: hangi germ yaprağından ne gelişir, hangi örnek pozitif hangisi negatif geri bildirimdir, otokrin, parakrin ve endokrin sinyal nasıl ayrılır, algılayıcı ve kontrol merkezi nerededir. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz01-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz01-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz01-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d1-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Homeostaz nedir? Bir fizyolojik örnek üzerinden negatif geri bildirimi anlatın. Pozitif geri bildirim fizyolojide nerede karşımıza çıkar?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Hücrelerin çevresindeki iç ortamın (ECF) kararlı, görece sabit ve en uygun düzeyde tutulması. Sabit değil, dinamik; gelişim ve çevresel zorlanmalarla değişir. [[K1 s. 1–3]]</li>
    <li><b>Ne düzenlenir, neden?</b> O₂ ve besinler (plazma glukozu), CO₂ ve atıklar, pH (protein yapısı), su ve elektrolitler (ozmotik olarak etkin Na⁺), sıcaklık (enzim kinetiği, zar akışkanlığı). [[K1 s. 2–3]]</li>
    <li><b>Kontrol düzeyleri.</b> İntrinsik (otokrin, parakrin; çalışan kasta metabolik vazodilatasyon) ve ekstrinsik (sinir ve endokrin sistem; eşgüdüm ve ileri besleme). [[K1 s. 3]]</li>
    <li><b>Negatif geri bildirim, çizerek.</b> Algılayıcı → kontrol merkezi → efektör; ayar noktası. PaCO₂ örneği: medulladaki merkezi kemoreseptörler, medulladaki solunum merkezi, solunum kasları (tidal hacim ve solunum sayısı artar, alveoler ventilasyon artar, PaCO₂ düşer). [[K1 s. 3–4]]</li>
    <li><b>Pozitif geri bildirim.</b> Sinyali büyütür. Örnekler: hemostaz, doğumda oksitosin, pepsin, aksiyon potansiyelinin depolarizasyonu, kalpte Ca²⁺ salınımı. Genellikle bir negatif döngüyle sınırlanır (Na⁺ kanal inaktivasyonu). [[K1 s. 4–5]]</li>
    <li><b>Klinik bağlantıyla bitirin.</b> Patolojik pozitif geri bildirim: dekompanse kanamada basınç düşüşü, hipoksi ve vazodilatasyonun kısır döngüsü. [[K1 s. 5]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim, PaCO₂ örneğiyle negatif geri bildirim döngüsüdür: dört kutu, dört ok, ayar noktası.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Otokrin ile parakrin sinyalin farkı nedir? Pozitif geri bildirim neden kontrolden çıkmaz? Arteriyel kan basıncını hangi sistemler birlikte belirler? Cevapların hepsi yukarıda. [[K1 s. 2–5]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d1-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Fizyoloji "sabit" değil, en uygun iç ortamı korur; gelişim ve çevreyle değişir. [[K1 s. 1]]</li>
    <li>Ektoderm: sinir sistemi, epidermis. Mezoderm: bağ dokusu, kan, kemik ve ilik, kıkırdak, yağ, kas. Endoderm: karaciğer, pankreas, mesane; akciğer ve Gİ epitel örtüsü. [[K1 s. 1]]</li>
    <li>11 sistem tek başına çalışmaz; arteriyel basınç dört sistemin ortak sonucudur. [[K1 s. 1–2]]</li>
    <li>Düzenlenen başlıca değişkenler: O₂ ve besin, CO₂ ve atık, pH, su ve elektrolit, sıcaklık. [[K1 s. 2–3]]</li>
    <li>Kontrol intrinsik (otokrin, parakrin) ya da ekstrinsik (sinir, endokrin) olabilir. [[K1 s. 3]]</li>
    <li>Negatif geri bildirim: algılayıcı, kontrol merkezi, efektör, ayar noktası. Pozitif geri bildirim büyütür, genellikle sınırlanır; patolojide kısır döngü olur. [[K1 s. 3–5]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="1"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji">← Fizyoloji modülü</a>
    <a href="#/dersler/fizyoloji/02">Sonraki: Bölüm 2 · Hücrenin bileşenleri ve işlevi →</a>
  </nav>
</section>`,
};
