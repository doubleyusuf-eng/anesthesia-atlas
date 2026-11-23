/* Fizyoloji Bölüm 62 · Tükürük, özofagus ve yutma (K1 İngilizce baskı s. 279–282).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz62-1'] = {
  no: 1, kok: 'Tükürük ve üretimi için:', kagit: 'Paper A · fizyoloji, Bölüm 62', kaynak: '[[K1 s. 279]]',
  onermeler: [
    { t: 'Erişkinde günde 500–1000 mL tükürük salgılanır.', d: true, n: 'Doğru. Parotis, submandibular ve sublingual bezler salgılar; tükürüğün %98\'i sudur. [[K1 s. 279]]' },
    { t: 'Tükürük plazmaya göre hipertoniktir ve Na⁺ derişimi plazmadan yüksektir.', d: false, n: 'Yanlış. Tükürük hipotoniktir: Na⁺ derişimi plazmadan düşük, K⁺ derişimi yüksektir. [[K1 s. 279]]' },
    { t: 'Tükürük α-amilazı en iyi pH 7\'de çalışır ve mide asidiyle denatüre olmadan önce nişastanın %75\'ine kadarını parçalayabilir.', d: true, n: 'Doğru. Pankreas amilazıyla aynı enzimdir. [[K1 s. 279]]' },
    { t: 'Akım hızı yüksekken tükürükte K⁺ ve Cl⁻ payı artar.', d: false, n: 'Yanlış. Yüksek akımda tükürük Na⁺ ve HCO₃⁻ yönünden zengindir; K⁺ ve Cl⁻ payı düşük akımda artar. [[K1 s. 279]]' },
    { t: 'Aldosteron tükürük kanallarında Na⁺ geri emilimini ve K⁺ salgısını artırır.', d: true, n: 'Doğru. Etkisi böbrektekine benzer. [[K1 s. 279]]' },
  ],
};
VERI.sorular['fiz62-2'] = {
  no: 2, kok: 'Tükürük bezlerinin innervasyonu ve yutma için:', kagit: 'Paper A · fizyoloji, Bölüm 62', kaynak: '[[K1 s. 279–280]]',
  onermeler: [
    { t: 'Parotis bezinin parasempatik lifleri fasiyal sinirden (VII) gelir ve submandibular gangliyonda sinaps yapar.', d: false, n: 'Yanlış. Parotisin parasempatik lifleri glossofaringeal sinirden (IX) gelir ve otik gangliyonda sinaps yapar; VII ve submandibular gangliyon submandibular ve sublingual bezlerin yoludur. [[K1 s. 280]]' },
    { t: 'Sempatik uyarı kısa süreli, çoğunlukla müköz ve amilazdan zengin bir tükürük artışı, ardından salgıda azalma yapar.', d: true, n: 'Doğru. Vazokonstriksiyon ve miyoepitelyal hücre kasılmasıyla olur. [[K1 s. 280]]' },
    { t: 'Oral evre yutmanın tek istemli evresidir.', d: true, n: 'Doğru. Faringeal ve özofageal evreler istemsizdir. [[K1 s. 280]]' },
    { t: 'Yutmada vokal kordları addükte eden laringeal kaslar süperior laringeal sinirle innerve edilir.', d: false, n: 'Yanlış. Lateral krikoaritenoid, oblik ve transvers aritenoid ile ariepiglottik kasların hepsi rekürren laringeal sinirle innerve edilir. [[K1 s. 280]]' },
    { t: 'Primer peristaltik dalga, lokmanın özofagus duvarını germesiyle başlar.', d: false, n: 'Yanlış. Primer dalgayı yutma sırasında medulladaki yutma merkezi başlatır ve lokmanın yeri ne olursa olsun LOS\'ye kadar ilerler; gerilmeyle başlayan dalga sekonder dalgadır. [[K1 s. 280]]' },
  ],
};
VERI.sorular['fiz62-3'] = {
  no: 3, kok: 'Alt özofagus sfinkteri (LOS) ve aspirasyon için:', kagit: 'Paper A · fizyoloji, Bölüm 62', kaynak: '[[K1 s. 281]]',
  onermeler: [
    { t: 'Bariyer basıncı LOS basıncı ile mide içi basınç arasındaki farktır.', d: true, n: 'Doğru. LOS basıncı normalde 20–30 mmHg, mide içi basınç 5–10 mmHg\'dir. [[K1 s. 281]]' },
    { t: 'Süksinilkolin LOS tonusunu azaltır.', d: false, n: 'Yanlış. Süksinilkolin, metoklopramid ve antikolinesterazlar (neostigmin, edrofonyum) LOS tonusunu artırır. [[K1 s. 281]]' },
    { t: 'Nondepolarizan kas gevşeticilerin LOS tonusuna anlamlı etkisi yoktur.', d: true, n: 'Doğru. [[K1 s. 281]]' },
    { t: 'pH\'sı 2,5\'in altında olan 25 mL\'den fazla mide sıvısının aspirasyonu ağır bir pnömonit için yeterli kabul edilir.', d: true, n: 'Doğru. Genel anesteziyle ilişkili bu pnömonit Mendelson sendromudur. [[K1 s. 281]]' },
    { t: 'Hiatus hernisi bariyer basıncını kısmen, özofagusun diyaframdan geçerken yaptığı dar açı kaybolduğu için düşürür.', d: true, n: 'Doğru. Öteki mekanizma: LOS diyafram açıklığıyla aynı hizada olmadığından diyafram artık LOS kasılmasına yardım edemez. [[K1 s. 281]]' },
  ],
};

const D62_NAV = [
  ['d62-tukuruk', 'Tükürüğün işlevleri'], ['d62-uretim', 'Tükürük üretimi'], ['d62-sinir', 'Bezlerin innervasyonu'],
  ['d62-yutma', 'Oral ve faringeal evre'], ['d62-ozofagus', 'Özofagus ve peristaltizm'], ['d62-bariyer', 'Bariyer basıncı ve reflü'],
  ['d62-aspirasyon', 'Aspirasyon'],
  ['d62-p1', 'Part I'], ['d62-p2', 'Part II'], ['d62-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/62'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 5 · Bölüm 62', baslik: 'Tükürük, özofagus ve yutma',
  lede: 'Tükürük lokmayı kayganlaştırır ve sindirimi başlatır; yutma onu hava yolunu kapatarak özofagusa geçirir; alt özofagus sfinkteri de mide içeriğinin geri kaçmasını engeller. Anestezide bu üçünün bozulması aspirasyon demektir. [[K1 s. 279–281]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D62_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d62-tukuruk">
  <h2>Tükürüğün bileşimi ve işlevleri</h2>
  <p class="intro">Günde 500–1000 mL tükürük salgılanır; %98'i sudur ve kalan %2'nin her bileşeni bir işleve karşılık gelir. [[K1 s. 279]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Bileşenden işleve</h3></div>
    <div data-viz="f62_islev"></div>
    <p class="viz-cap" aria-live="polite"><b>Müsin → kayganlaştırma.</b> Tükürüğün kayganlaştırıcı özelliği asıl müsinden gelir; lokma yutulurken farinks ve özofagus mukozası korunur. Bir bileşene dokunun. [[K1 s. 279]]</p>
    <p class="viz-foot">Şematik eşleştirme haritası.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Salgıyı parotis, submandibular ve sublingual bezler yapar; uyaran yiyeceğin düşüncesi, kokusu, tadı ve ağızda ya da midede bulunmasıdır. Tükürük <b>hipotoniktir</b>: Na⁺ plazmadan düşük, K⁺ yüksektir. İstirahat pH'sı 7,0'dır; HCO₃⁻ salgısı artınca 8,0'a çıkar. [[K1 s. 279]]</p>
    <p><b>Sindirim.</b> α-Amilaz pankreas amilazıyla aynı enzimdir: karbonhidrat polimerlerini parçalar, tükürüğün pH'sı olan 7'de en iyi çalışır ve mide asidinde denatüre olmadan önce nişastanın %75'ine kadarını yıkar. Lingual lipaz trigliserit sindirimini başlatır; pankreas lipazı olgunlaşmamış ve süt yağını iyi sindiremeyen yenidoğanda önemlidir. Haptokorrin B₁₂ vitaminine bağlanıp onu midenin düşük pH'sından korur. [[K1 s. 279]]</p>
    <p><b>Asit nötralizasyonu.</b> HCO₃⁻'lı tükürük, özofagusa reflü olan ya da kusmada ağza gelen mide asidini seyreltip nötralize eder; kusmadan hemen önce salgı belirgin artar ve diş minesini korur. <b>Antibakteriyel etki:</b> tiyosiyanat, lizozim, laktoferrin ve IgA'ya karşın insanda anlamlı bakteriyostatik etkiye kanıt azdır. [[K1 s. 279]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d62-uretim">
  <h2>Tükürük üretimi: asinüs ve kanal</h2>
  <p class="intro">Tükürük iki evrede yapılır: asinüs plazmaya yakın, izotonik bir birincil salgı üretir; kanal bunu hipotonik ikincil salgıya çevirir. [[K1 s. 279]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kanal boyunca iyon değişimi ve akım hızı</h3></div>
    <div data-viz="f62_kanal"></div>
    <p class="viz-cap" aria-live="polite"><b>Düşük akım.</b> Kanal Na⁺ ve Cl⁻'ü geri emip K⁺ ve HCO₃⁻ salgılar; ağza ulaşan tükürükte K⁺ ve Cl⁻ payı yüksektir. Akım hızını artırın ya da aldosteronu açın. [[K1 s. 279]]</p>
    <p class="viz-foot">Model: iyon düzeyleri nitel; kitap tükürük için derişim vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Bezler, çevresi kasılabilen miyoepitelyal hücrelerle sarılı asinüs ve kanallardan oluşur. Asiner hücreler elektrolitleri aktif taşır, su pasif izler. Kanalda geri emilim salgıdan hızlıdır; bu yüzden tükürük ilerledikçe hipotonikleşir. Akım hızlanınca tükürük Na⁺ ve HCO₃⁻ yönünden zenginleşir. Aldosteron, böbrekteki gibi, Na⁺ geri emilimini ve K⁺ salgısını artırır. [[K1 s. 279]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d62-sinir">
  <h2>Tükürük bezlerinin innervasyonu</h2>
  <p class="intro">Temel salgı birimi asinüstür; üç bezin asinüsleri hem parasempatik hem sempatik lif alır ve iki sistem farklı tükürük yaptırır. [[K1 s. 279–280]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Parasempatik yollar ve iki sistemin tükürüğü</h3></div>
    <div data-viz="f62_sinir"></div>
    <p class="viz-cap" aria-live="polite"><b>Parasempatik · parotis.</b> Glossofaringeal sinir (IX); preganglionik lifler otik gangliyonda sinaps yapar. Bir bez ya da sempatik uyarı seçin. [[K1 s. 280]]</p>
    <p class="viz-foot">Şematik yol haritası; anatomik konumlar ve salgı eğrisi temsilîdir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th></th><th>Parasempatik uyarı</th><th>Sempatik uyarı</th></tr></thead>
    <tbody>
      <tr><td><b>Asinüs damarları</b></td><td>Vazodilatasyon</td><td>Vazokonstriksiyon</td></tr>
      <tr><td><b>Miyoepitel</b></td><td colspan="2">Kasılma (ikisinde de)</td></tr>
      <tr><td><b>Tükürük</b></td><td>Çoğunlukla seröz, elektrolitten zengin</td><td>Kısa süre çoğunlukla müköz, amilazdan zengin; ardından salgı azalır</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">[[K1 s. 280]]</p>
</section>

<section class="wrap blk ders-sec" id="d62-yutma">
  <h2>Yutma: oral ve faringeal evre</h2>
  <p class="intro">Yutma refleksini medulla oblongatadaki yutma merkezi yönetir: lokma ağızdan farinks yoluyla özofagusa geçerken larinks kapanır ve pulmoner aspirasyon önlenir. [[K1 s. 280]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Lokmanın yolu, adım adım</h3></div>
    <div data-viz="f62_yutma"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Oral evre (istemli).</b> Dil lokmayı sert damağa iter; damaktan gelen duyu medullaya iletilir ve istemsiz evreleri başlatır (kitap glossofaringeal sinir der; aşağıdaki nota bakın). "İleri"ye basın. [[K1 s. 280]]</p>
    <p class="viz-foot">Şematik sagital kesit; apne çubuğu 1–2 s'lik süreyi gösterir, adımların süresi temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yutma üç evredir; yalnız oral evre istemlidir. Faringeal evrede medulla sırayla yumuşak damakla nazofarinksi kapatır, vokal kordları (lateral krikoaritenoid, oblik ve transvers aritenoid kaslar) ve ardından ariepiglottik kıvrımları (ariepiglottik kaslar) addükte eder; bu laringeal kasların hepsi <b>rekürren laringeal sinirle</b> çalışır. Digastrik ve stilohiyoid kaslar hiyoidi kaldırır, larinks yukarı ve öne gider; epiglot aşağı inip lokmayı larinksten uzağa, arka farinkse yönlendirir. [[K1 s. 280]]</p>
    <p>Süperior ve orta farinks konstriktörleri lokmayı aşağı iter; normalde kapalı olan inferior konstriktör (<b>krikofaringeus</b>, üst özofagus sfinkteri) gevşeyip yol verir. Larinks gerçek ve yalancı vokal kordlarla kapanıp epiglotla örtülür ve lokma geçene dek açılmaz: bu evrede soluk alınamaz, solunum merkezi 1–2 s'lik bir <b>apne</b> düzenler. [[K1 s. 280]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Sert damağın genel duyusu glossofaringeal sinirle değil, trigeminal sinirin maksiller dalıyla (V2; büyük palatin ve nazopalatin sinirler) taşınır. Faringeal evreyi asıl lokmanın orofarinks ve dil kökü ile teması başlatır; bu bölgenin duyusunu glossofaringeal sinir taşır.</div>
</section>

<section class="wrap blk ders-sec" id="d62-ozofagus">
  <h2>Özofagus ve özofageal evre</h2>
  <p class="intro">Özofagus, yiyeceği farinksten mideye taşıyan kaslı bir tüptür: lokma girince üst sfinkter kapanır, LOS kısmen gevşer ve peristaltizm lokmayı aşağı iter. [[K1 s. 280–281]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Primer ve sekonder peristaltik dalga</h3></div>
    <div data-viz="f62_peristalsis"></div>
    <p class="viz-cap" aria-live="polite"><b>Primer dalga.</b> Yutma merkezi başlatır; dalga özofagusun başından LOS'ye kadar, lokma nerede olursa olsun ilerler. "Yut"a basın ya da sekonder dalgayı seçin. [[K1 s. 280]]</p>
    <p class="viz-foot">Şematik; dalga hızı ve tüp oranları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Özofageal evre de istemsizdir. İki dalga tipini de enterik sinir sistemi yayar; <b>sekonder dalgayı</b> lokmanın özofagus duvarını germesi başlatır. Dalga LOS'ye vardığında sfinkter tamamen gevşemiş olur; lokma geçince LOS düz kası kasılıp reflüyü önler. [[K1 s. 280]]</p>
    <p>Üst üçte birde iskelet (çizgili), alt üçte ikide düz kas vardır; yine de peristaltizm tüm boyunca kesintisiz ilerler. Üst özofagus sfinkterinin istirahat basıncı yüksektir (100 mmHg'ye kadar). [[K1 s. 281]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kas geçişi keskin değildir: orta üçte bir çizgili ve düz kasın karışımıdır, saf düz kas yalnız alt üçte birdedir.</div>
</section>

<section class="wrap blk ders-sec" id="d62-bariyer">
  <h2>Bariyer basıncı ve gastroözofageal reflü</h2>
  <p class="intro">Reflüye karşı asıl engel <b>bariyer basıncıdır</b>: LOS basıncı (normalde 20–30 mmHg) eksi mide içi basınç (normalde 5–10 mmHg). [[K1 s. 281]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Bariyer basıncını ne düşürür?</h3></div>
    <div data-viz="f62_bariyer"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> LOS, diyafram hiatusundan geçen distal 2–4 cm'lik düz kasın tonik kasılmasıdır; diyafram kasılması ona yardım eder, dar giriş açısı da reflüyü azaltır. Bir durum ya da ilaç seçin. [[K1 s. 281]]</p>
    <p class="viz-foot">Model: normal aralıklar kitaptandır; durumların basınca etkisi temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Bariyer basıncı dört durumda azalır. <b>Yutma:</b> dalga gelince LOS gevşer. <b>Gebelik:</b> progesteron LOS tonusunu düşürür, gebe uterus karın içi basıncı artırır. <b>Hiatus hernisi:</b> LOS diyafram açıklığıyla aynı hizada olmadığından diyafram yardımı kaybolur ve dar açı ortadan kalkar. <b>İlaçlar:</b> tabloya bakın. [[K1 s. 281]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:12px"><table class="tbl">
    <thead><tr><th>LOS tonusunu azaltır</th><th>Artırır</th><th>Anlamlı etkisiz</th></tr></thead>
    <tbody><tr><td>Alkol, volatil anestezikler, propofol, tiyopental, opioidler, atropin, glikopirolat</td><td>Metoklopramid, süksinilkolin, antikolinesterazlar (neostigmin, edrofonyum)</td><td>Nondepolarizan kas gevşeticiler</td></tr></tbody>
  </table></div>
  <div class="blk-body" style="margin-top:12px">
    <p><b>Klinik önem: gastroözofageal reflü hastalığı.</b> Mide asidi özofagusa girer, mukozayı hasarlar ve retrosternal ağrı yapar. Nedenleri: artmış karın içi basınç (obezite, gebe uterus, akut batın), düşük bariyer basıncı ve hiatus hernisi. [[K1 s. 281]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d62-aspirasyon">
  <h2>Klinik önem: aspirasyon pnömonisi ve Mendelson sendromu</h2>
  <p class="intro">Aspirasyon pnömonisi, yabancı maddenin (çoğu zaman kusmuk, yiyecek, sıvı ya da ağız ve burun sekresyonları) trakeobronşiyal ağaca girip akciğerde enfeksiyon ve inflamasyon yapmasıdır. [[K1 s. 280–281]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Mendelson eşiği ve önlemler</h3></div>
    <div data-viz="f62_aspirasyon"></div>
    <p class="viz-cap" aria-live="polite"><b>Önlem yok.</b> Aspire edilen mide sıvısı 25 mL'den fazla ve pH'sı 2,5'ten düşükse ağır pnömonit için yeterli sayılır. Önlemleri tek tek açın. [[K1 s. 281]]</p>
    <p class="viz-foot">Model: yalnız 25 mL ve pH 2,5 eşikleri kitaptandır; önlemlerin noktayı ne kadar kaydırdığı temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Nedenler.</b> Öksürük refleksini baskılayan bilinç azalması (alkol zehirlenmesi, ilaç aşırı dozu, genel anestezi); özofagus hastalıkları (gastroözofageal reflü, darlık, trakeoözofageal fistül); yutma sorunları: faringeal kasların genel güçsüzlüğü (miyastenia gravis, motor nöron hastalığı, Guillain–Barré sendromu, kritik hastalık polinöropatisi) ya da yutma merkezinin veya bağlantılarının hasarı (multipl skleroz, inme). [[K1 s. 280–281]]</p>
    <p><b>Mendelson sendromu</b>, genel anesteziyle ilişkili mide içeriği aspirasyonunun yaptığı pnömonittir. Yüksek riskli hastada önleme çok yönlüdür: ameliyat öncesi açlık; bağırsak tıkanıklığında serbest drene olan ve indüksiyondan önce aspire edilen nazogastrik tüp; H₂ reseptör antagonisti (ör. ranitidin) ya da partikülsüz antasitle (ör. sodyum sitrat) asidin nötralizasyonu; krikoid basılı hızlı ardışık indüksiyon; yarı oturur pozisyonda indüksiyon. [[K1 s. 281]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Ranitidin, NDMA safsızlığı nedeniyle 2020'de birçok ülkede piyasadan çekildi; bugün yerine famotidin gibi başka bir H₂ antagonisti kullanılır.</div>
</section>

<section class="wrap blk ders-sec" id="d62-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: tükürüğün hacmi, bileşimi ve tonisitesi, enzimlerin işlevi, akım hızının bileşime etkisi, bezlerin parasempatik yolları, yutmanın evreleri ve laringeal kasların siniri, primer ve sekonder peristaltizm, bariyer basıncı ve LOS tonusunu değiştiren ilaçlar, Mendelson eşiği. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz62-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz62-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz62-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d62-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Mide içeriğinin özofagusa ve akciğere kaçmasını normalde ne engeller? Anestezi bu korumayı nasıl bozar, siz nasıl önlersiniz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>LOS.</b> Distal 2–4 cm düz kasın tonik kasılması, diyafram hiatusunda; diyafram yardımı ve dar giriş açısı. [[K1 s. 281]]</li>
    <li><b>Bariyer basıncı.</b> LOS (20–30 mmHg) − mide içi (5–10 mmHg). Azaltanlar: yutma, gebelik, hiatus hernisi, ilaçlar. [[K1 s. 281]]</li>
    <li><b>İlaçlar.</b> Azaltır: alkol, volatiller, propofol, tiyopental, opioidler, atropin, glikopirolat. Artırır: metoklopramid, süksinilkolin, neostigmin. Nondepolarizanlar etkisiz. [[K1 s. 281]]</li>
    <li><b>Hava yolu koruması.</b> Faringeal evrede vokal kord ve ariepiglottik kıvrım addüksiyonu (rekürren laringeal sinir), epiglot, 1–2 s apne; bilinç azalınca öksürük refleksi baskılanır. [[K1 s. 280–281]]</li>
    <li><b>Mendelson sendromu.</b> Genel anesteziyle ilişkili mide içeriği aspirasyonu; > 25 mL, pH < 2,5 ağır pnömonit. [[K1 s. 281]]</li>
    <li><b>Önlem.</b> Açlık; tıkanıklıkta NG tüp ve indüksiyon öncesi aspirasyon; H₂ antagonisti, sodyum sitrat; krikoid basılı hızlı ardışık indüksiyon; yarı oturur pozisyon. [[K1 s. 281]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Diyaframdan geçen özofagusu ve mideyi çizin; LOS'ye "20–30 mmHg", mideye "5–10 mmHg" yazın, aradaki farkı "bariyer basıncı" diye işaretleyin. Yanına hiatus hernisini çizip LOS'nin diyaframın üstüne çıktığını ve dar açının kaybolduğunu gösterin. [[K1 s. 281]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Gebe hastada reflü neden artar? Süksinilkolin reflüyü artırır mı? Yutarken neden soluk alamayız? Tükürük neden hipotoniktir? Yenidoğanda lingual lipaz neden önemlidir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 279–281]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d62-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Tükürük: günde 500–1000 mL, %98 su, hipotonik (düşük Na⁺, yüksek K⁺), pH 7,0–8,0; işlevleri kayganlaştırma, sindirim, asit nötralizasyonu. [[K1 s. 279]]</li>
    <li>Asinüs izotonik birincil salgı; kanal Na⁺/Cl⁻ alır, K⁺/HCO₃⁻ verir. Yüksek akım Na⁺ ve HCO₃⁻, düşük akım K⁺ ve Cl⁻ zengin; aldosteron Na⁺ tutar, K⁺ atar. [[K1 s. 279]]</li>
    <li>Parasempatik: seröz bol tükürük; parotis IX → otik gangliyon, submandibular ve sublingual VII → submandibular gangliyon → lingual sinir. Sempatik: kısa müköz, amilazlı artış, sonra azalma. [[K1 s. 280]]</li>
    <li>Yutma: oral (istemli), faringeal ve özofageal (istemsiz); larinks kapanır, 1–2 s apne; laringeal addüktörler rekürren laringeal sinirle çalışır. [[K1 s. 280]]</li>
    <li>Primer dalga yutma merkezinden, sekonder dalga duvar gerilmesinden başlar; üst sfinkter 100 mmHg'ye kadar, LOS distal 2–4 cm. [[K1 s. 280–281]]</li>
    <li>Bariyer basıncı = LOS (20–30) − mide içi (5–10 mmHg); yutma, gebelik, hiatus hernisi ve birçok anestezik düşürür; süksinilkolin, metoklopramid, neostigmin artırır. [[K1 s. 281]]</li>
    <li>Mendelson: > 25 mL, pH < 2,5 mide sıvısı; önlem açlık, NG tüp, H₂ antagonisti ve sodyum sitrat, krikoid basılı hızlı ardışık indüksiyon, yarı oturur pozisyon. [[K1 s. 281]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="62"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/61">← Bölüm 61 · Göz ve göz içi basınç</a>
    <a href="#/dersler/fizyoloji/63">Sonraki: Bölüm 63 · Mide ve kusma →</a>
  </nav>
</section>`,
};
