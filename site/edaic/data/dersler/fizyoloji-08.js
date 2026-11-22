/* Fizyoloji Bölüm 08 · Oksijen taşınması (K1 İngilizce baskı s. 30–36).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz08-1'] = {
  no: 1, kok: 'Oksijenin kanda taşınması için:', kagit: 'Paper A · fizyoloji, Bölüm 8', kaynak: '[[K1 s. 30]]',
  onermeler: [
    { t: 'Tam satüre hemoglobinin her gramı yaklaşık 1,34 mL oksijen bağlar.', d: true, n: 'Doğru. Bu değer Hüfner sabitidir (37 °C, tipik erişkin kanı). Kaynaklarda 1,31–1,39 mL/g arası değerler de geçer; hesapta kitabın 1,34 değerini kullanın (Atlas notu). [[K1 s. 30]]' },
    { t: 'Plazmada çözünmüş oksijen hacmi, oksijenin parsiyel basıncıyla doğru orantılıdır.', d: true, n: 'Doğru. Henry yasası: çözünmüş gaz hacmi parsiyel basınçla orantılıdır. İçerik denklemindeki 0,023 × PO₂ terimi bunu verir. [[K1 s. 30]]' },
    { t: 'Dokulara difüzyon doğrudan hemoglobine bağlı oksijenden gerçekleşir.', d: false, n: 'Yanlış. Fick difüzyon yasasına göre difüzyon bir basınç gradyanı boyunca olur; dokulara geçen oksijen plazmada çözünmüş bölümden difüze olur. Plazma PO₂\'si düştükçe Hb\'den O₂ ayrılarak çözünmüş bölümü yeniden besler. [[K1 s. 30]]' },
    { t: 'Hemoglobine bağlı oksijen, kanın oksijen parsiyel basıncına katkıda bulunmaz.', d: true, n: 'Doğru. Kanın PO₂\'sini çözünmüş oksijen belirler; Hb\'ye bağlı oksijen parsiyel basınç oluşturmaz, plazma PO₂\'si düştükçe Hb\'den ayrılarak çözünmüş bölümü yeniden besler. [[K1 s. 30]]' },
    { t: 'Kanın taşıdığı oksijenin yaklaşık %20\'si plazmada çözünmüş durumdadır.', d: false, n: 'Yanlış. Çözünmüş bölüm yaklaşık %2\'dir; oksijenin %98\'i hemoglobine bağlı taşınır. Kitabın arteriyel örneğinde 19,8 mL\'nin yalnızca 0,30 mL\'si çözünmüştür. [[K1 s. 30]]' },
  ],
};
VERI.sorular['fiz08-2'] = {
  no: 2, kok: 'Oksihemoglobin dissosiyasyon eğrisi için:', kagit: 'Paper A · fizyoloji, Bölüm 8', kaynak: '[[K1 s. 32–33]]',
  onermeler: [
    { t: '2,3-difosfogliserat konsantrasyonundaki artış eğriyi sola kaydırır.', d: false, n: 'Yanlış. 2,3-DPG artışı eğriyi sağa kaydırır (CADETS). 2,3-DPG deoksihemoglobinin β zincirlerine bağlanıp bu yapıyı kararlı kılar ve afiniteyi azaltır. [[K1 s. 32–33]]' },
    { t: 'P50, hemoglobinin %50\'sinin oksijene bağlı olduğu PO₂ değeridir.', d: true, n: 'Doğru. Eğrinin konumu P50 ile tanımlanır. [[K1 s. 32]]' },
    { t: 'Sağa kayma, belirli bir PO₂ için satürasyonun daha düşük olması demektir.', d: true, n: 'Doğru. Sağa kayma afiniteyi azaltır: oksijen daha kolay bırakılır, aynı PO₂\'de SaO₂ daha düşüktür. [[K1 s. 32]]' },
    { t: 'Hipotermi eğriyi sola kaydırır.', d: true, n: 'Doğru. Sıcaklık düşüşü, düşük PCO₂, alkaloz ve azalmış 2,3-DPG eğriyi sola kaydırır. [[K1 s. 33]]' },
    { t: 'Fetal hemoglobin eğriyi sağa kaydırarak plasentadan oksijen alınmasını kolaylaştırır.', d: false, n: 'Yanlış. HbF eğriyi sola kaydırır; afinitesi maternal Hb\'den yüksek olduğu için plasentada oksijeni maternal oksihemoglobinden alabilir. Ayrıca 2,3-DPG yalnızca β zincirlerine bağlandığından fetal γ zincirine bağlanamaz ve afinite daha da artar. [[K1 s. 33]]' },
  ],
};
VERI.sorular['fiz08-3'] = {
  no: 3, kok: 'Anormal hemoglobinler ve zehirlenmeler için:', kagit: 'Paper A · fizyoloji, Bölüm 8', kaynak: '[[K1 s. 34–36]]',
  onermeler: [
    { t: 'Orak hücre hastalığı otozomal resesif kalıtılır.', d: true, n: 'Doğru. Semptomatik hastalık homozigotlarda (HbSS) görülür; HbS için heterozigot olanlar (HbAS) orak hücre taşıyıcısıdır ve normalde asemptomatiktir. HbSC gibi bileşik heterozigotlar da hastalık gösterir (Atlas notu). [[K1 s. 34]]' },
    { t: 'Methemoglobinin varlığı, kalan normal hemoglobinin dissosiyasyon eğrisini sağa kaydırır.', d: false, n: 'Yanlış. Eğri sola kayar; dokulara daha az oksijen bırakılır ve doku hipoksisi ağırlaşır. [[K1 s. 35]]' },
    { t: 'Karbonmonoksitin hemoglobine bağlanma afinitesi oksijeninkinin yaklaşık 250 katıdır.', d: true, n: 'Doğru. Bu nedenle Hb, oksihemoglobin yerine tercihen COHb oluşturur ve taşıma kapasitesi azalır. [[K1 s. 35]]' },
    { t: 'Siyanür zehirlenmesinde miks venöz hemoglobin satürasyonu düşer.', d: false, n: 'Yanlış. Satürasyon yükselir: mitokondriyal sitokrom c oksidaz inhibe olduğu için doku kapiller ağından oksijen bırakılmadan geçilir; venöz kan parlak kırmızıdır ve anaerobik metabolizma nedeniyle laktik asidoz gelişir. [[K1 s. 36]]' },
    { t: 'Ağır methemoglobinemide nabız oksimetresi yaklaşık %85 gösterir.', d: true, n: 'Doğru. MetHb nabız oksimetresi tarafından yanlış okunur ve okuma %85 dolayında kalır; doğru ölçüm CO-oksimetreyle yapılır. [[K1 s. 35]] (Atlas notu: düşük MetHb düzeylerinde okuma MetHb arttıkça %85\'e doğru iner.)' },
  ],
};

const D8_NAV = [
  ['d08-tasima', 'Taşıma ve içerik'], ['d08-depo', 'Depolar ve apne'], ['d08-hb', 'Eritrosit ve Hb'],
  ['d08-koop', 'Kooperatif bağlanma'], ['d08-egri', 'Eğri ve miyoglobin'], ['d08-kayma', 'Kaymalar ve Bohr'],
  ['d08-formlar', 'Hb biçimleri'], ['d08-orak', 'Orak hücre'], ['d08-zehir', 'MetHb, CO, siyanür'],
  ['d08-p1', 'Part I'], ['d08-p2', 'Part II'], ['d08-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/08'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 8', baslik: 'Oksijen taşınması',
  lede: 'Oksijen akciğerlerden dokulara iki biçimde taşınır: hemoglobine bağlı (%98) ve plazmada çözünmüş (%2). Bu bölüm içerik denklemini, oksijen depolarının küçüklüğünü, kooperatif bağlanmayı, dissosiyasyon eğrisini ve eğriyi kaydıran etkenleri, anormal hemoglobinleri ve miyoglobini işler. [[K1 s. 30–36]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D8_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d08-tasima">
  <h2>İki taşıma yolu ve oksijen içeriği denklemi</h2>
  <p class="intro">Kanın oksijeninin %98'i hemoglobine bağlı, %2'si plazmada çözünmüş taşınır; içerik denklemi bu iki bölümü toplar. [[K1 s. 30]]</p>
  <div class="viz"><div data-viz="f08_icerik"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Oksijen dolaşımda akciğerlerden dokulara iki biçimde taşınır. Birincisi <b>hemoglobine bağlı</b> biçimdir ve kanın taşıdığı oksijenin %98'ini oluşturur: tam satüre hemoglobinin her gramı 1,34 mL oksijen bağlar; bu değer <b>Hüfner sabiti</b> olarak bilinir. İkincisi <b>plazmada çözünmüş</b> biçimdir ve yalnızca %2'sini oluşturur: çözünmüş oksijen hacmi, Henry yasası uyarınca oksijenin parsiyel basıncıyla doğru orantılıdır. Kanın toplam oksijen hacmi bu ikisinin toplamıdır. [[K1 s. 30]]</p>
    <p>Çözünmüş bölümün küçük olması onu önemsiz kılmaz. Kanın oksijen parsiyel basıncını belirleyen, plazmada çözünmüş oksijen miktarıdır; hemoglobine bağlı oksijen parsiyel basınca katkıda bulunmaz. Fick difüzyon yasasına göre difüzyon bir basınç gradyanı boyunca gerçekleşir; bu nedenle dokulara geçen oksijen hemoglobinin kendisinden değil, plazmada çözünmüş bölümden difüze olur. Plazma PO₂'si düştükçe hemoglobinden oksijen ayrılır ve çözünmüş bölümü yeniden besler. [[K1 s. 30]]</p>
    <p>Kanın oksijen içeriği bu iki bölümün toplamıdır: <b>100 mL kandaki O₂ = (1,34 × [Hb] × SaO₂/%100) + 0,023 × PO₂</b>. Burada 1,34 mL/g Hüfner sabiti (37 °C, tipik erişkin kanı), [Hb] hemoglobin konsantrasyonu (g/dL), SaO₂ yüzde satürasyon, 0,023 oksijenin çözünürlük katsayısı (mL O₂·dL⁻¹·kPa⁻¹) ve PO₂ kanın oksijen parsiyel basıncıdır (kPa). [[K1 s. 30]]</p>
  </div>
  <div class="tbl-wrap" style="margin:14px 0">
    <table class="tbl">
      <thead><tr><th>Kan</th><th class="num">[Hb]</th><th class="num">SaO₂</th><th class="num">PO₂</th><th class="num">Hb'ye bağlı</th><th class="num">Çözünmüş</th><th class="num">Toplam</th></tr></thead>
      <tbody>
        <tr><th>Arteriyel (CaO₂)</th><td class="num">15 g/dL</td><td class="num">%97</td><td class="num">13,0 kPa</td><td class="num">19,50 mL</td><td class="num">0,30 mL</td><td class="num">19,8 mL</td></tr>
        <tr><th>Venöz (CvO₂)</th><td class="num">15 g/dL</td><td class="num">%75</td><td class="num">5,3 kPa</td><td class="num">15,08 mL</td><td class="num">0,12 mL</td><td class="num">15,2 mL</td></tr>
      </tbody>
    </table>
  </div>
  <p class="small muted" style="margin-bottom:14px">Kitabın çözümlü örneği: her 100 mL arteriyel kanda yaklaşık 20 mL, her 100 mL venöz kanda 15 mL oksijen taşınır; aradaki ≈4,6 mL/100 mL fark dokulara bırakılan oksijendir. Hemoglobin, plazmada çözünmüş oksijenden çok daha verimli bir taşıma yoludur; yine de çözünmüş bölüm önemsiz değildir. [[K1 s. 30]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap, oksijenin tamamı hemoglobine bağlı olduğu için eritrosit içindeki PO₂'nin düşük olduğunu yazar; bu doğru değildir. Oksijen eritrosit zarından serbestçe geçer, dengede eritrosit içindeki PO₂ plazmanınkine eşittir ve hemoglobinin satürasyonunu belirleyen de bu PO₂'dir.</div>
</section>

<section class="wrap blk ders-sec" id="d08-depo">
  <h2>Oksijen depoları tüketimin yanında ne kadar küçük?</h2>
  <p class="intro">Vücudun oksijen deposu, tüketiminin yalnızca birkaç dakikasına yeter; bu yüzden apne hızla hipoksiye yol açar. [[K1 s. 30]]</p>
  <div class="viz"><div data-viz="f08_depo"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Oksijen akciğerlerde (fonksiyonel rezidüel kapasite içinde), kanda (plazmada çözünmüş ve hemoglobine bağlı) ve kasta (miyoglobine bağlı) depolanır. Erişkinin istirahat oksijen tüketimi ≈250 mL/dk'dır: anlamlı hücresel hipoksi için apnenin birkaç dakika sürmesi yeter. Taşıma kapasitesi azaldığında (anemi, karbonmonoksit zehirlenmesi) ya da tüketim hızlandığında (ör. çocuklarda) hipoksik hasar daha da çabuk gelişir. [[K1 s. 30]]</p>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Minimal akımlı anestezi</h3>
    <p>Düşük ve minimal akımlı anestezi, genel anestezinin maliyetini ve çevresel etkisini azaltmak için kullanılan yeniden soluma teknikleridir: taze gaz akımı alveoler ventilasyonun altına ayarlanır, ekshale edilen gazlar CO₂ uzaklaştırıldıktan sonra yeniden kullanılır. Düşük akım &lt;1000 mL/dk, minimal akım &lt;500 mL/dk'dır. Teknik için kapalı ya da yarı kapalı bir devre (genellikle halka sistemi), CO₂ absorbanı, halka dışı vaporizatör ve gaz analizörü gerekir. [[K1 s. 30–31]]</p>
    <p>Düşük akımda anestezist, hastanın absorbe ettiği gazların (oksijen ve volatil ajan) yerine konduğundan emin olmalıdır. İstirahat oksijen tüketimi 250 mL/dk olduğundan gereken en az oksijen sunum hızı 250 mL/dk'dır; çoğu anestezist hipoksemiyi tümüyle önlemek için biraz daha yüksek, 300–500 mL/dk verir. [[K1 s. 31]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-hb">
  <h2>Eritrosit ve hemoglobin</h2>
  <p class="intro">Eritrosit çekirdeksiz ve mitokondrisiz bir "hemoglobin torbası"dır; içindeki hemoglobin, her biri bir oksijen bağlayan dört alt birimden oluşur. [[K1 s. 31]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Eritrositten hem grubuna</h3></div>
    <div data-viz="f08_yapi"></div>
    <p class="viz-cap" aria-live="polite"><b>Üç ölçek.</b> Eritrosit, içindeki HbA molekülü ve tek bir hem grubu; bir parçaya dokunun. [[K1 s. 31]]</p>
    <p class="viz-foot">Şematik çizim, ölçekler orantılı değildir; ölçüler, zincir bileşimi ve bağ tipi kitaptandır [[K1 s. 31]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Eritrositler küçük, esnek, bikonkav disklerdir (çap 6–8 µm) ve en küçük kapillerlerden (yaklaşık 3 µm) sıkışarak geçebilmek için biçim değiştirebilirler. Hücre zarının dış yüzeyinde transfüzyon tıbbı açısından önemli antijenler bulunur: ABO sistemi hücre yüzeyindeki karbonhidrat yapılı antijenlerden, rhesus sistemi ise transmembran proteinlerden oluşur. [[K1 s. 31]]</p>
    <p>Eritrositler çekirdek ve mitokondri taşımamaları bakımından benzersizdir; işlevsel olarak birer hemoglobin torbası sayılabilirler. Blast hücreleri eritropoezin son evresi olan retikülositlere dönüştüğünde çekirdek DNA'sı kaybedilmiştir; retikülositlerde onun yerine ağ benzeri bir ribozomal RNA ağı bulunur (ad buradan gelir). Retikülositler normalde dolaşımdaki eritrositlerin %1'ini oluşturur; kemik iliğinde eritropoez çok aktifse (hemolitik anemi, kanama sonrası) bu oran artar. [[K1 s. 31]]</p>
    <p>Mitokondri olmadığı için aerobik metabolizma mümkün değildir: eritrositler, enerji için tümüyle glukoza ve glikolitik yola bağımlı tek hücre tipidir. Beyin bile açlıkta keton cisimlerini kullanmaya uyum sağlayabilirken eritrositin böyle bir seçeneği yoktur. [[K1 s. 31]]</p>
    <p>Hemoglobin, eritrositlerin içinde bulunan, demir içeren büyük bir proteindir. Erişkinde en yaygın biçim HbA'dır ve dolaşımdaki hemoglobinin %95'inden fazlasını oluşturur. Kuaterner yapısı, yaklaşık tetrahedral bir düzende dört polipeptit globin alt biriminden (iki α ve iki β zinciri) oluşur; zincirler zayıf elektrostatik kuvvetlerle bir arada tutulur. Her globin zincirinin, demiri ferröz durumda (Fe²⁺) bulunan demir içeren bir porfirin halkası olan kendi hem grubu vardır. Oksijen molekülleri her hem grubuna Fe²⁺ iyonuyla kurulan zayıf bir koordinasyon bağıyla geri dönüşümlü olarak bağlanır: her hemoglobin molekülüne, her hem grubu için bir tane olmak üzere toplam dört oksijen molekülü bağlanabilir. [[K1 s. 31]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-koop">
  <h2>Kooperatif bağlanma</h2>
  <p class="intro">Bağlanan her oksijen sonrakinin afinitesini artırır; bu yüzden hemoglobin pratikte ya tam satüredir (oksihemoglobin) ya da tam desatüre (deoksihemoglobin). [[K1 s. 32]]</p>
  <div class="viz"><div data-viz="f08_koop"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>İlk molekül görece güç bağlanır: gereken konformasyon değişikliği için güçlü elektrostatik yüklerin aşılması gerekir. β zincirlerinin birbirinden uzak olduğu bu yapı <b>gergin</b> konformasyondur. İlk molekül bağlandıktan sonra konformasyon değişir, β zincirleri yaklaşır ve ikinci molekülün afinitesi yükselir; bu böyle sürer, dördüncü molekül birincisinden yaklaşık 300 kat daha kolay bağlanır. Dördüncüden sonra hemoglobin <b>gevşemiş</b> konformasyondadır. [[K1 s. 32]]</p>
  </div>
  <p class="small muted" style="margin-top:10px">Kooperatif bağlanmanın gerçek moleküler mekanizması kitapta da tartışmalı olarak verilir: oksijenin Fe²⁺'ye bağlanmasının eşzamanlı olarak bir histidin kalıntısının yerini değiştirdiği ve konformasyon değişikliğini bunun başlattığı öne sürülmüştür. [[K1 s. 32]]</p>
</section>

<section class="wrap blk ders-sec" id="d08-egri">
  <h2>Dissosiyasyon eğrisi ve miyoglobin</h2>
  <p class="intro">Oksihemoglobin dissosiyasyon (ayrışma) eğrisi satürasyonla kanın oksijen parsiyel basıncı arasındaki ilişkiyi tanımlar; sigmoid biçimi kooperatif bağlanmadan gelir. [[K1 s. 32]]</p>
  <div class="viz"><div data-viz="f08_egri"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Eğrinin konumunu <b>P50</b> verir: hemoglobinin %50'sinin oksijene bağlı olduğu PO₂. Kitabın şeklindeki başlıca noktalar P50 ≈ 3,5 kPa, venöz kan 5,3 kPa'da %75 ve arteriyel kan 13,3 kPa'da yaklaşık %97'dir (bu satürasyon kitabın çözümlü örneğinden). [[K1 s. 30, 32]]</p>
    <p>Sigmoid biçimin önemli klinik sonuçları vardır. <b>Düz üst bölümde</b> PaO₂ biraz düşse bile satürasyon hemen hemen değişmez; ancak PaO₂'si patolojik olarak düşük bir hasta (ör. solunum hastalığı) eğrinin çok daha dik bir yerindedir ve orada küçük bir PaO₂ azalması büyük desatürasyon demektir. <b>Dik orta bölüm</b> PO₂'nin düşük olduğu periferik dokularda önemlidir: PO₂'de küçük bir azalma karşılığında büyük miktarda oksijen bırakılır. [[K1 s. 32]]</p>
    <p><b>Miyoglobin</b> de hemoglobin gibi oksijen bağlayan, demir içeren büyük bir proteindir, ama yalnızca bir globin zinciri ve bir hem grubu taşır. Görevi oksijen depolamaktır; bu yüzden oksijen gereksiniminin yüksek olduğu iskelet kasında bulunur ve kırmızı etin rengini miyoglobinin Fe²⁺ pigmentleri verir. Tek zincir kooperatif bağlanmaya izin vermez: oksimiyoglobin eğrisi hiperboliktir ve oksihemoglobin eğrisinin belirgin solundadır. P50'si hemoglobininkinden çok daha düşüktür; oksijenin oksihemoglobinden miyoglobine aktarılabilmesi bunu gerektirir (şekilde "Miyoglobin eğrisi" düğmesi). [[K1 s. 36]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-kayma">
  <h2>Kaymalar, Bohr etkisi ve 2,3-DPG</h2>
  <p class="intro">Eğri sağa kaydığında oksijenin hemoglobine afinitesi azalır: oksijen daha kolay bırakılır, yani belirli bir PO₂ için satürasyon daha düşüktür. Sola kayma ise afiniteyi artırır. [[K1 s. 32–33]]</p>
  <div class="cols" style="margin-bottom:14px">
    <div class="card"><span class="tag crit">Sağa · CADETS</span><h3 style="margin-top:8px">Afinite azalır, P50 artar</h3><p>PCO₂ artışı, asidoz, 2,3-difosfogliserat (DPG) artışı, egzersiz, sıcaklık artışı ve orak hücre hastalığında HbS varlığı. Anımsatıcı CADETS, İngilizce baş harflerden gelir: CO₂, acidosis, DPG, exercise, temperature, sickle cell disease. [[K1 s. 32]]</p></div>
    <div class="card"><span class="tag basic">Sola</span><h3 style="margin-top:8px">Afinite artar, P50 düşer</h3><p>Yukarıdakilerin tersi (düşük PCO₂, alkaloz, azalmış 2,3-DPG, hipotermi) ile karboksihemoglobin (COHb), methemoglobin (MetHb) ve fetal hemoglobin (HbF). [[K1 s. 33]]</p></div>
  </div>
  <div class="viz"><div data-viz="f08_bohr"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Sağa kayma önemli bir fizyolojik mekanizmadır. <b>Bohr etkisi:</b> metabolik olarak aktif dokular CO₂, ısı ve H⁺ üretir; kan bu kapillerlere ulaştığında eğri sağa kayar ve oksijen en çok gereksinim duyulduğu yerde bırakılır. <b>Anaerobik metabolizma:</b> hücresel PO₂ bir eşik değerin altına düştüğünde anaerobik metabolizma baskınlaşır; glukozun pirüvata parçalanmasıyla (glikoliz) enerji üretilir, pirüvat laktata dönüşür ve glikolitik yolun ara ürünlerinden biri yan bir yolda 2,3-DPG'ye dönüştürülür; bunu büyük olasılıkla oksijene duyarlı bir glikoliz enzimi, fosfofruktokinaz denetler. Anaerobik metabolizma arttıkça 2,3-DPG konsantrasyonu da artar. 2,3-DPG özgül olarak deoksihemoglobinin β zincirlerine bağlanıp bu yapıyı kararlı kılar ve hemoglobinin oksijen afinitesini azaltır; böylece anaerobik metabolizma yapan hücrelere ek oksijen bırakılır. [[K1 s. 32–33]]</p>
    <p><b>Akciğerde yüklenme:</b> kan akciğerlere ulaştığında CO₂ atılır ve pH normale döner; P50 merkezi konumuna geri gider, yani afinite artar. Çözünmüş oksijen hemoglobine bağlanır, bu da kanın oksijen parsiyel basıncını düşürerek alveol–kapiller bariyerden difüzyonu kolaylaştırır. [[K1 s. 33]]</p>
    <p><b>Fetal yaşam:</b> HbF'nin maternal oksihemoglobinden oksijen alabilmesi için afinitesinin maternal hemoglobinden yüksek olması gerekir. Bu iki mekanizmayla sağlanır: HbF eğriyi sola kaydırır ve fetal eritrositlerde 2,3-DPG bulunsa da HbF'ye bağlanamaz, çünkü 2,3-DPG yalnızca β-globin zincirlerine bağlanır, fetal γ zincirine bağlanmaz. [[K1 s. 33]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> 2,3-DPG dokuda değil eritrositin kendi glikolizinde (Rapoport–Luebering yan yolu) yapılır ve düzeyi saniyeler değil saatler içinde değişir. Bu yüzden kapiller geçişindeki hızlı sağa kaymayı CO₂ ve H⁺ (Bohr etkisi) ile ısı yapar; 2,3-DPG süregen hipoksiye (anemi, yüksek irtifa) uyumdur.</div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Kan transfüzyonu</h3>
    <p>Depolanmış kanda eritrosit 2,3-DPG konsantrasyonu hızla azalır ve 1–2 haftalık depolamadan sonra hemen hemen sıfırdır. Düşük 2,3-DPG eğriyi sola kaydırır ve oksijen bağlanmasını artırır; transfüzyondan sonra eritrosit 2,3-DPG'sinin normale dönmesi 24 saate kadar sürer. Bu nedenle transfüze edilen kan, oksijen bırakmada hastanın kendi kanı kadar etkili değildir. Hücre kurtarma yöntemiyle geri kazanılan kan ise 2,3-DPG'sinin hemen hemen tamamını korur; afinite ve oksijen bırakılması etkilenmez. [[K1 s. 33]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-formlar">
  <h2>Başka hangi hemoglobin biçimleri var?</h2>
  <p class="intro">Hemoglobin biçimleri fizyolojik (HbA, HbA₂, HbF) ve patolojik (HbS, MetHb, COHb, siyanohemoglobin) olarak sınıflanır. [[K1 s. 34]]</p>
  <div class="viz"><div data-viz="f08_dishb"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Fizyolojik biçimler globin zincirleriyle ayrılır: HbA α₂β₂, erişkinin öteki normal varyantı HbA₂ α₂δ₂ (toplam Hb'nin %2–3'ü) ve fetal yaşamın varyantı HbF α₂γ₂. HbF'nin oksijen afinitesi HbA'dan yüksektir, bu yüzden plasentada maternal kandan oksijen alabilir. Kitaba göre HbF 3 aylık yaşa kadar üretilir, sonra γ-globin sentezi erişkin β-globine geçer ve 6 aylık yaşta HbF'nin yerini erişkin varyantları almış olmalıdır; β-globin sentezi bozuksa (ör. β-talasemi) HbF sürebilir. [[K1 s. 34]]</p>
    <p>Patolojik biçimlerde ya globin zinciri ya hem grubu değişir. HbS'de β-globinin altıncı konumundaki glutamat valinle yer değiştirmiştir. MetHb'de hem demiri ferrik duruma (Fe³⁺) oksitlenmiştir ve Fe³⁺ oksijen bağlayamaz, yani MetHb taşınmaya katılmaz. COHb solunan karbonmonoksit, siyanohemoglobin ise siyanür iyonlarının bağlanmasıyla oluşur. [[K1 s. 34]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-orak">
  <h2>Orak hücre hastalığı: tek nokta mutasyonu nasıl hastalık yapar?</h2>
  <p class="intro">β-globindeki tek amino asit değişikliği, hipoksik koşullarda hemoglobinin kümelenip eritrositi oraklaştırmasına yol açar; hastalık iki yoldan ortaya çıkar. [[K1 s. 34]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Mutasyondan klinik tabloya</h3></div>
    <div data-viz="f08_orak"></div>
    <p class="viz-cap" aria-live="polite"><b>β6 glutamat → valin.</b> Zincirdeki adımlardan birine dokunun: o adımda ne olduğu ve neye yol açtığı görünür. [[K1 s. 34]]</p>
    <p class="viz-foot">Şematik akış şeması; bütün sayılar kitaptandır [[K1 s. 34]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Orak hücre hastalığı otozomal resesif kalıtılır. Kitaba göre semptomatik hastalık yalnızca homozigot kişilerde, yani her iki β-globin zincirinde de amino asit nokta mutasyonu bulunduğunda görülür. Heterozigotlar orak hücre taşıyıcısıdır, normalde asemptomatiktir ve taşıyıcılık sıtmaya karşı direnç sağlar. HbS'de β-globin zincirinin altıncı konumundaki glutamat valinle yer değiştirmiştir. [[K1 s. 34]]</p>
    <p>Tek bir amino asidin değişmesi molekülün davranışını belirgin biçimde etkiler: hipoksik koşullarda hemoglobin molekülleri kümelenir ve eritrositi orak biçimine sokar. Normal venöz kanın oksijen parsiyel basıncı, özellikle dalaktaki yavaş akımda oraklaşmaya yol açacak kadar düşük olabilir. Eritrositler arteriyel oksijen basınçlarından venöz düzeylere ve yeniden arteriyel düzeylere geçerken yinelenen kümelenme ve dağılma, zar esnekliğini azaltır. [[K1 s. 34]]</p>
  </div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><span class="tag crit">1. mekanizma</span><h3 style="margin-top:8px">Vasküler oklüzyon</h3><p>Esnekliği azalmış oraklaşmış hücreler dar kapillerlerden geçerken daha az biçim değiştirir; viskozite artar, venöz tromboz ve iskemi gelişir. Kapiller ve venöz oklüzyonlar tüm organ enfarktüsü riski doğurur: iskemik ağrı ve organ işlev bozukluğu. Çocuklukta sık görülen dalak enfarktüsü, meningokok septisemisi ve salmonella osteomiyeliti gibi kapsüllü bakteri enfeksiyonlarına yatkınlık bırakır. Vazo-oklüzif krizler hidrasyon, analjezi ve kan değişimi transfüzyonuyla yönetilir. [[K1 s. 34]]</p></div>
    <div class="card"><span class="tag crit">2. mekanizma</span><h3 style="margin-top:8px">Eritrosit yaşam süresinin kısalması</h3><p>Eritrositler normalde dolaşımda 100–120 gün yaşarken orak hücre hastalığında kronik hemoliz nedeniyle yalnızca 10–20 gün yaşar; sonuçta retikülositozla birlikte hemoglobin 7–11 g/dL olur. Aplastik krizlere yatkınlık vardır: parvovirüs B19 enfeksiyonu eritrosit öncüllerini yok ederek eritropoezi kısa bir süre (kitaba göre 2–3 gün) durdurur. Normalde klinik önemi olmayan bu kısa duraklama, yaşam süresi kısa olan bu hastalarda derin anemiye yol açabilir. [[K1 s. 34]]</p></div>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Orak hücre hastalığında anestezi</h3>
    <ul style="margin-top:8px">
      <li><b>Tanı konmamış hastalığın belirlenmesi.</b> Hasta durumunu bilmiyor olabilir; risk altındaki etnik kökenlerden gelen hastalar test edilmelidir. Standart tarama hemoglobin elektroforezidir; acilde hızlı "sickledex" testi kullanılabilir, ancak bu test taşıyıcılığı hastalıktan ayıramaz. [[K1 s. 34–35]]</li>
      <li><b>Preoperatif optimizasyon.</b> Uç organ işlev bozukluğu belirlenip düzeltilir; hipoksi, asidoz, hipotermi ve hipotansiyon gibi anormal fizyoloji ele alınır. Majör elektif cerrahi öncesinde bazen kan değişimi transfüzyonu yapılır, acil cerrahide buna nadiren zaman vardır. [[K1 s. 35]]</li>
      <li><b>İntraoperatif yönetim.</b> Bilinen oraklaşma tetikleyicilerinden (hipoksi, asidoz, hipotermi, hipotansiyon) kaçınılır. Turnikelerden geleneksel olarak kaçınılır, yararı riskten ağır basıyorsa zaman zaman kullanılır. Rejyonal anestezinin genel anesteziye göre birçok üstünlüğü vardır, ancak nöroaksiyel blokaj hipotansiyon riski taşır. [[K1 s. 35]]</li>
      <li><b>Postoperatif yönetim.</b> Hasta ara yoğun bakımda izlenir, ilave oksijen alır, sıcak ve iyi hidrate tutulur. Hastalar nadiren opiyat naif olduğundan analjezi güç olabilir. [[K1 s. 35]]</li>
    </ul>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-zehir">
  <h2>Hemoglobini ve mitokondriyi bağlayan zehirler: MetHb, CO ve siyanür</h2>
  <p class="intro">Methemoglobin, karbonmonoksit ve siyanür oksijen taşınmasını farklı noktalardan bozar; üçünde de eğri sola kayar ya da oksijen hiç kullanılamaz. [[K1 s. 35–36]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Üç zehir, üç duraklama noktası</h3></div>
    <div data-viz="f08_zehir"></div>
    <p class="viz-cap" aria-live="polite"><b>Oksijenin yolu.</b> Bir zehri seçin: yolun hangi basamağında durduğu, nabız oksimetresinin ne gösterdiği ve tedavisi görünür. [[K1 s. 35–36]]</p>
    <p class="viz-foot">Şematik çizim; mekanizmalar, eşikler ve tedaviler kitaptandır [[K1 s. 35–36]].</p>
  </div>
  <h3 style="margin:18px 0 8px">Methemoglobin</h3>
  <div class="blk-body">
    <p>Methemoglobin normalde toplam hemoglobin konsantrasyonunun %1'inden azını oluşturur. Bu düzey iki mekanizmayla düşük tutulur: <b>glutatyon/NADPH sistemi</b>, eritrosit içindeki oksitleyici ajanları hem grubundaki Fe²⁺'yi Fe³⁺'ye oksitlemeden önce indirger; pentoz fosfat yolu, glutatyonu indirgenmiş biçimine döndüren NADPH'yi sağladığı için bu sürecin ayrılmaz parçasıdır. <b>MetHb redüktaz/NADH sistemi</b> ise oluşan MetHb'nin Fe³⁺ iyonunu yeniden Fe²⁺'ye indirger. [[K1 s. 35]]</p>
    <p>Methemoglobinemi, oksitleyici ajanların glutatyon sisteminin kapasitesini aşmasıyla (sülfonamid antibiyotikler, nitrik oksit ve amid tipi lokal anestezik prilokain; prilokain Bier bloğunda ve topikal EMLA'nın bileşeni olarak kullanılır) ya da koruyucu indirgenme sisteminin yetersizliğiyle (ör. pentoz fosfat yolundaki genetik kusurun indirgenmiş glutatyon eksikliğine yol açtığı G6PD eksikliği) oluşur. [[K1 s. 35]]</p>
    <p>Klinik sorun iki yönlüdür: MetHb oksijen bağlayamaz, yani toplam oksijen içeriği azalır ("fonksiyonel anemi"); ayrıca kalan normal hemoglobinin afinitesi değişir ve eğri sola kayarak dokulara daha az oksijen bırakılır. Nabız oksimetreleri MetHb'yi yanlış okur: kitaba göre konsantrasyondan bağımsız olarak yaklaşık %85 gösterirler. Doğru ölçüm CO-oksimetreyle yapılır. Tedavi hafif olgularda ilave oksijen, ağır olgularda metilen mavisidir. [[K1 s. 35]]</p>
  </div>
  <h3 style="margin:18px 0 8px">Karbonmonoksit</h3>
  <div class="blk-body">
    <p>Karbonmonoksit oksijene çok benzeyen bir moleküldür ve hemoglobinin Fe²⁺ iyonuna benzer biçimde geri dönüşümlü bağlanır; ancak afinitesi oksijeninkinin 250 katıdır. Karbonmonoksit varlığında hemoglobin tercihen COHb oluşturur ve taşıma kapasitesi azalır. Methemoglobinemide olduğu gibi, eğrinin sola kayması dokulara oksijen bırakılmasını azaltarak doku hipoksisini ağırlaştırır. [[K1 s. 35]]</p>
    <p>Normalde kandaki COHb oranı %2'nin altındadır. Afinitenin yüksekliği nedeniyle düşük düzeylere maruz kalan bir hastada bile anlamlı COHb bulunabilir; ağır sigara içicilerinde %9'a çıkabilir. Arızalı gazlı cihazlar, ev yangınları ve araç egzoz dumanının solunması daha yüksek düzeylere yol açabilir. Belirtiler COHb düzeyiyle ağırlaşır: %15–20'de baş ağrısı ve konfüzyon; daha yüksek düzeylerde güçsüzlük, baş dönmesi, bulantı ve kusma; %60'ın üstünde konvülziyon, koma ve ölüm. [[K1 s. 35–36]]</p>
    <p>Taşıma kapasiteleri azalmış olsa da bu hastalar siyanotik görünmez: siyanoz ancak en az 5 g/dL deoksihemoglobin varken klinik olarak belirginleşir ve karbonmonoksit bağlamamış hemoglobin genellikle oksijenle tam satüredir. Nadiren deri ve mukozalarda kiraz kırmızısı renk değişikliği olur. Tedavi, yüksek bir PaO₂ sağlayarak (yüksek FiO₂ ya da hiperbarik oda) geri dönüşümlü bağlanmış karbonmonoksitin hemoglobinden kompetitif olarak uzaklaştırılmasıdır. [[K1 s. 36]]</p>
  </div>
  <h3 style="margin:18px 0 8px">Siyanür</h3>
  <div class="blk-body">
    <p>Siyanürün toksisitesi iki mekanizmanın sonucudur. Birincisi oksijen taşıma kapasitesinin azalmasıdır: kitaba göre siyanür, karbonmonoksitin tersine hemoglobine geri dönüşümsüz bağlanır ve oksijenle tedavi edilemeyen bir fonksiyonel anemi yapar. İkincisi ve başlıca toksik etki, mitokondriyal elektron taşıma zincirindeki sitokrom c oksidazın (Kompleks IV) inhibisyonudur. Böylece yalnızca taşıma kapasitesi azalmakla kalmaz, mitokondriler kendilerine ulaşan oksijeni de kullanamaz. Klinik belirtilerden biri venöz kanın parlak kırmızı olmasıdır: kan doku kapiller ağından oksijen bırakmadan geçmiştir, yani miks venöz satürasyon yükselmiştir; anaerobik metabolizma nedeniyle laktik asidoz vardır. [[K1 s. 36]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap siyanürün hemoglobinin Fe²⁺ iyonundaki oksijen bağlanma bölgesine bağlandığını yazar. Siyanürün yüksek afinitesi aslında ferrik demire (Fe³⁺) karşıdır: methemoglobinle siyanomethemoglobin oluşturur ve sodyum nitritin siyanür zehirlenmesinde kullanılması (kasıtlı methemoglobinemi oluşturup siyanürü mitokondriden uzaklaştırma) tam olarak buna dayanır. Zehirlenmeyi öldürücü kılan da taşıma kapasitesindeki azalma değil, sitokrom c oksidaz inhibisyonudur.</div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Siyanür zehirlenmesi</h3>
    <p>Siyanür, kısmen öldürücü dozunun yalnızca 1 mg/kg olması nedeniyle kurmaca eserlerde sık kullanılan bir ölüm biçimi olsa da gerçek yaşamda görece nadirdir. Endüstriyel ortamda ve sodyum nitroprussid uygulamasından sonra görülebilir; en sık ev yangınlarında yanan naylon malzemelerden çıkan dumanın solunmasıyla ortaya çıkar. [[K1 s. 36]]</p>
    <p>Yönetim yakın zamanda değişmiştir: olağan destekleyici önlemlere ek olarak yüksek dozda hidroksokobalamin (B₁₂a vitamini) verilir. Hidroksokobalaminin kobalt katyonu siyanür iyonlarını bağlayarak toksik olmayan ve böbrekten atılan siyanokobalamini (B₁₂ vitamini) oluşturur. Önemli olan, hidroksokobalaminin mitokondriye girebilmesidir: orada siyanürü geri dönüşümsüz bağlayarak oksidatif metabolizmayı yeniden sağlar. [[K1 s. 36]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sayılar ve yönler üzerinden sorulur: Hüfner sabiti ve içerik denklemi, çözünmüş bölümün payı ve işlevi, depo hacimleri ve istirahat tüketimi, P50 ve kaymaların yönü (CADETS), 2,3-DPG'nin bağlandığı zincir, HbF'nin iki mekanizması, zincir bileşimleri (α₂β₂, α₂δ₂, α₂γ₂), HbS mutasyonunun yeri, karbonmonoksitin 250 kat afinitesi, siyanoz için gereken 5 g/dL deoksihemoglobin ve oksimetrenin MetHb'de gösterdiği değer. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz08-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz08-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz08-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d08-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Oksijen kanda nasıl taşınır? Oksihemoglobin dissosiyasyon eğrisini çizin; eğriyi kaydıran etkenleri ve bunun fizyolojik önemini anlatın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>İki biçim, sayılarla.</b> Hemoglobine bağlı %98 (Hüfner sabiti 1,34 mL/g) ve plazmada çözünmüş %2 (Henry yasası). İçerik denklemi: (1,34 × [Hb] × SaO₂/%100) + 0,023 × PO₂. Arteriyel ≈19,8, venöz ≈15,2 mL/100 mL; fark ≈4,6 mL/100 mL. [[K1 s. 30]]</li>
    <li><b>Çözünmüş bölüm neden önemli?</b> Kanın PO₂'sini belirleyen odur; difüzyon basınç gradyanı boyunca (Fick) çözünmüş bölümden olur ve plazma PO₂'si düştükçe hemoglobinden oksijen ayrılıp yerine geçer. [[K1 s. 30]]</li>
    <li><b>Hemoglobin ve kooperativite.</b> α₂β₂, zincir başına bir hem ve Fe²⁺, molekül başına dört oksijen. Gergin konformasyonda β zincirleri uzak; bağlanan her molekül afiniteyi artırır, dördüncü birinciden ≈300 kat kolay bağlanır; gevşemiş konformasyon. Sigmoid biçim buradan gelir. [[K1 s. 31–32]]</li>
    <li><b>Eğriyi çizin.</b> Eksenler (PO₂ kPa, SaO₂ %), sigmoid eğri, P50 ≈ 3,5 kPa; venöz 5,3 kPa'da %75, arteriyel 13,3 kPa'da ≈%97. Düz üst bölümün ve dik orta bölümün klinik sonuçlarını söyleyin. [[K1 s. 30, 32]]</li>
    <li><b>Kaymalar.</b> Sağa: PCO₂ artışı, asidoz, 2,3-DPG artışı, egzersiz, sıcaklık artışı, HbS (CADETS). Sola: bunların tersi ile COHb, MetHb, HbF. [[K1 s. 32–33]]</li>
    <li><b>Fizyolojik önemi.</b> Bohr etkisi; 2,3-DPG'nin deoksihemoglobinin β zincirlerine bağlanması (eritrosit glikolizinde yapılır, süregen hipoksiye uyumdur; Atlas notu); akciğerde P50'nin merkeze dönmesi ve çözünmüş oksijenin bağlanmasıyla difüzyonun kolaylaşması; HbF'nin iki mekanizması. [[K1 s. 32–33]]</li>
    <li><b>Klinik bağlantıyla bitirin.</b> Depolanmış kanda 2,3-DPG 1–2 haftada neredeyse sıfıra iner, eğri sola kayar ve transfüzyondan sonra normale dönmesi 24 saate kadar sürer (hücre kurtarma kanı korunur); COHb ve MetHb hem kapasiteyi azaltır hem eğriyi sola kaydırır. [[K1 s. 33, 35]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim dissosiyasyon eğrisidir: eksenleri adlandırın, sigmoidi çizin, P50 ile venöz ve arteriyel noktaları işaretleyin, sonra sağa ve sola kayma oklarını ekleyip etkenleri yanına yazın. İstenirse hiperbolik miyoglobin eğrisini de aynı eksenlere ekleyin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Anemik bir hastada içerik ne olur, satürasyon neden normal görünür? 2,3-DPG tam olarak nereye bağlanır ve neden fetal hemoglobine bağlanamaz? Karbonmonoksit zehirlenmesinde hasta neden siyanotik değildir? Siyanür zehirlenmesinde venöz kan neden parlak kırmızıdır? Apne sırasında hipoksi neden bu kadar çabuk gelişir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 30–36]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d08-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Oksijen hemoglobine bağlı (%98; Hüfner sabiti 1,34 mL/g) ve plazmada çözünmüş (%2; Henry yasası) olarak taşınır; içerik = (1,34 × [Hb] × SaO₂/%100) + 0,023 × PO₂. [[K1 s. 30]]</li>
    <li>Arteriyel kan ≈19,8, venöz kan ≈15,2 mL O₂/100 mL taşır; kanın PO₂'sini ve difüzyonu belirleyen, küçük olan çözünmüş bölümdür. [[K1 s. 30]]</li>
    <li>Toplam depo ≈1550 mL (kan 850, miyoglobin 250, hava solurken akciğer 450) ve istirahat tüketimi 250 mL/dk: apne birkaç dakikada hücresel hipoksi yapar; minimal akımlı anestezide en az 250 mL/dk oksijen sunulmalıdır (uygulamada 300–500). [[K1 s. 30–31]]</li>
    <li>HbA α₂β₂, zincir başına bir hem ve Fe²⁺, molekül başına dört oksijen; kooperatif bağlanma gergin konformasyondan gevşemiş konformasyona geçişle afiniteyi artırır (dördüncü molekül ≈300 kat kolay) ve eğriyi sigmoid yapar. [[K1 s. 31–32]]</li>
    <li>P50 (≈3,5 kPa) eğrinin konumunu verir; sağa kayma CADETS ile olur ve oksijen bırakılmasını kolaylaştırır, sola kayma afiniteyi artırır (COHb, MetHb, HbF, hipotermi, alkaloz, düşük 2,3-DPG). [[K1 s. 32–33]]</li>
    <li>Bohr etkisi dokuda oksijen bırakılmasını, akciğerde P50'nin merkeze dönmesi yüklenmeyi kolaylaştırır; 2,3-DPG deoksihemoglobinin yalnızca β zincirlerine bağlanır; fetal γ zincirine bağlanamaz. [[K1 s. 32–33]]</li>
    <li>Orak hücre hastalığı otozomal resesiftir (β6 glutamat→valin); vasküler oklüzyon ve eritrosit yaşam süresinin 10–20 güne inmesiyle hastalık yapar; anestezide hipoksi, asidoz, hipotermi ve hipotansiyondan kaçınılır. [[K1 s. 34–35]]</li>
    <li>MetHb (Fe³⁺) ve COHb (afinite O₂'nin 250 katı) hem taşıma kapasitesini azaltır hem eğriyi sola kaydırır; oksimetre ağır methemoglobinemide ≈%85 gösterir, CO zehirlenmesinde hasta siyanotik görünmez (siyanoz için 5 g/dL deoksihemoglobin gerekir). Siyanürün başlıca etkisi sitokrom c oksidaz inhibisyonudur. Miyoglobin tek zincirlidir: hiperbolik eğri, çok düşük P50. [[K1 s. 35–36]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="8"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/07">← Bölüm 7 · Alt hava yolları</a>
    <a href="#/dersler/fizyoloji/09">Sonraki: Bölüm 9 · Karbondioksit taşınması →</a>
  </nav>
</section>`,
};
