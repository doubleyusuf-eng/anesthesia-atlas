/* Fizyoloji Bölüm 71 · Miksiyon (K1 İngilizce baskı s. 338–340).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz71-1'] = {
  no: 1, kok: 'Alt üriner sistemin yapısı ve depolama evresi için:', kagit: 'Paper A · fizyoloji, Bölüm 71', kaynak: '[[K1 s. 338]]',
  onermeler: [
    { t: 'Detrüsörün sempatik innervasyonu pelvik splanknik sinirlerle gelir.', d: false, n: 'Yanlış. Sempatik lifler hipogastrik sinirle, parasempatik lifler pelvik splanknik sinirlerle gelir; detrüsör bu yüzden istemsiz denetim altındadır. [[K1 s. 338]]' },
    { t: 'İnternal üretral sfinkter detrüsör düz kasının bir uzantısıdır ve sempatik denetim altındadır.', d: true, n: 'Doğru. IUS üretrayı mesaneyle birleştiği yerde sarar. [[K1 s. 338]]' },
    { t: 'Eksternal üretral sfinkter çizgili kastır ve pudendal sinirle istemli denetim altındadır.', d: true, n: 'Doğru. Kadında IUS\'nin, erkekte prostatın distalinde üretrayı sarar. [[K1 s. 338]]' },
    { t: 'Depolama evresinde fundus ve gövdedeki β3-adrenoseptörlerin uyarılması detrüsörü gevşetir.', d: true, n: 'Doğru. Pontin depolama merkezi sempatik çıkışı artırır; detrüsör gevşerken IUS kasılır ve mesane kaçırmadan dolar. [[K1 s. 338]]' },
    { t: 'Mesane boynundaki α1-adrenerjik reseptörlerin uyarılması IUS\'yi gevşetir.', d: false, n: 'Yanlış. α1 uyarısı IUS\'nin tonik kasılmasını sağlar; gevşeyen detrüsördür (β3). [[K1 s. 338]]' },
  ],
};
VERI.sorular['fiz71-2'] = {
  no: 2, kok: 'Mesanenin dolması ve miksiyon refleksi için:', kagit: 'Paper A · fizyoloji, Bölüm 71', kaynak: '[[K1 s. 338–339]]',
  onermeler: [
    { t: 'Mesane hacmi 400 mL\'yi aşınca duvar kompliyansı belirgin olarak artar.', d: false, n: 'Yanlış. Kompliyans düşük hacimlerde yüksektir; 400 mL\'nin üzerinde belirgin olarak azalır ve basınç hızla yükselir. [[K1 s. 338]]' },
    { t: 'Gerilme reseptörleri intravezikal basınç yaklaşık 10 cmH₂O\'yu, hacim yaklaşık 200 mL\'yi aşınca etkinleşir.', d: true, n: 'Doğru. İlk işeme isteği de yaklaşık 200 mL\'de duyulur. [[K1 s. 338–339]]' },
    { t: 'Koruyucu (guarding) refleks, geçici detrüsör kasılmaları sırasında EUS\'nin refleks gevşemesidir.', d: false, n: 'Yanlış. Koruyucu refleks EUS\'nin refleks kasılmasıdır ve bu kasılmalar sırasında idrar kaçmasını önler. [[K1 s. 339]]' },
    { t: 'Mesane yaklaşık 350–400 mL\'de ağrılı hâle gelir.', d: false, n: 'Yanlış. 350–400 mL\'de "rahatsız edici derecede dolu" hissedilir; ağrı yaklaşık 700 mL\'de başlar. [[K1 s. 339]]' },
    { t: 'Miksiyon refleksi S2–S4 kaynaklı parasempatik kolinerjik nöronlarla yürür ve kendini yeniden üretir.', d: true, n: 'Doğru. Detrüsör kasılması gerilme reseptörlerini daha çok uyarır, bu da daha çok kasılma doğurur. [[K1 s. 338]]' },
  ],
};
VERI.sorular['fiz71-3'] = {
  no: 3, kok: 'Omurilik yaralanması ve ameliyat sonrası üriner retansiyon (POUR) için:', kagit: 'Paper A · fizyoloji, Bölüm 71', kaynak: '[[K1 s. 339–340]]',
  onermeler: [
    { t: 'Detrüsör–sfinkter dissinerjisi boşalmayı eksik bırakır ve üriner sistem enfeksiyonu riskini artırır.', d: true, n: 'Doğru. Hiperrefleksi evresinde detrüsör kasılmaları sürmez ve EUS refleks olarak kasılır. [[K1 s. 339]]' },
    { t: 'Spinal şokun akut evresinde mesanenin dolu olduğu bilinçli olarak algılanmaya devam eder.', d: false, n: 'Yanlış. Mesane atonik olur ve dolu mesanenin bilinçli algısı kaybolur; sonuç akut retansiyon ve taşma inkontinansıdır. [[K1 s. 339]]' },
    { t: 'POUR cerrahi girişimlerin yaklaşık %15\'ini komplike eder.', d: true, n: 'Doğru. Standart tanımı yoktur; klinik ölçütler ve >500 mL dolu mesane kanıtı kullanılır. [[K1 s. 339]]' },
    { t: 'POUR\'da kateterizasyon genellikle mesane hacmi 400 mL\'yi aşınca yapılır.', d: false, n: 'Yanlış. Standart tedavi olan kateterizasyon genellikle hacim 600 mL\'yi aşınca yapılır. [[K1 s. 340]]' },
    { t: 'Opioid kullanımı POUR riskini yaklaşık 1,5 kat artırır.', d: true, n: 'Doğru. Öteki risk etkenleri: alt üriner sistem semptomu öyküsü, anorektal ve inguinal herni cerrahisi, 750 mL\'yi aşan sıvı ve nöraksiyel blok. [[K1 s. 339–340]]' },
  ],
};

const D71_NAV = [
  ['d71-yapi', 'Mesane ve sfinkterler'], ['d71-depo', 'Kontinans ve depolama'], ['d71-dolum', 'Dolum ve basınç'],
  ['d71-refleks', 'Refleksler ve istemli işeme'], ['d71-spinal', 'Omurilik yaralanması'], ['d71-pour', 'POUR'],
  ['d71-p1', 'Part I'], ['d71-p2', 'Part II'], ['d71-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/71'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 6 · Bölüm 71', baslik: 'Miksiyon',
  lede: 'Mesane, çıkış direnci içerideki basıncı aştıkça idrarı tutar. Bu dengeyi iki pontin merkez, sempatik ve parasempatik sistem ve istemli bir sfinkter birlikte yönetir; anestezi bu düzeni kolayca bozar. [[K1 s. 338–340]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D71_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d71-yapi">
  <h2>Mesane, detrüsör ve iki sfinkter</h2>
  <p class="intro">Mesane pelviste duran, idrarı depolayıp boşaltan kaslı bir kesedir: idrar böbrekten üreterle gelir, üretrayla çıkar; çıkışı iki sfinkter tutar. [[K1 s. 338]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kim, hangi sinirle, istemli mi?</h3></div>
    <div data-viz="f71_yapi"></div>
    <p class="viz-cap" aria-live="polite"><b>Detrüsör.</b> Spiral, longitudinal ve sirküler demetlerden oluşan düz kas. Sempatik lifler hipogastrik sinirle, parasempatik lifler pelvik splanknik sinirlerle gelir: istemsiz denetim. Başka bir yapıya dokunun. [[K1 s. 338]]</p>
    <p class="viz-foot">Şematik kesit; kadın ve erkek üretrası arasındaki fark yalnız EUS'nin konumu için gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Üreterleri, mesaneyi ve üretrayı <b>ürotelyum</b> döşer; iyon, çözünen madde ve su geçişine karşı çok geçirimsiz bir engeldir. <b>İnternal üretral sfinkter (IUS)</b> detrüsörün mesane boynundaki uzantısıdır ve sempatik denetimdedir. <b>Eksternal üretral sfinkter (EUS)</b> ise çizgili kastır: pudendal sinirle istemli denetlenir. [[K1 s. 338]]</p>
    <p>Detrüsörün kompliyansı olağan dışı yüksektir: mesane doldukça kas gevşeyip gerilir, basınç az artar. Bu özelliğe <b>viskoelastisite</b> denir. [[K1 s. 338]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Kitap ürotelyumun renal toplayıcı kanal ve renal pelvisi döşeyen epitelle aynı olduğunu yazar. Renal pelvis ürotelyumla döşelidir, toplayıcı kanal ise tek katlı kübik–prizmatik epitelle. [[K1 s. 338]]</div>
</section>

<section class="wrap blk ders-sec" id="d71-depo">
  <h2>Kontinans ve depolama evresi</h2>
  <p class="intro">Kontinans, idrarı uygun zamana dek kaçırmadan tutabilmektir: çıkış direnci intravezikal basıncı aştığı sürece idrar kaçmaz. [[K1 s. 338]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Depolama: gevşeyen kese, kapanan boyun</h3></div>
    <div data-viz="f71_depo"></div>
    <p class="viz-cap" aria-live="polite"><b>Sempatik çıkış açık.</b> β3 uyarısı fundus ve gövdede detrüsörü gevşetir, α1 uyarısı mesane boynunda IUS'yi tonik kasar: çıkış direnci basıncın üstünde, idrar kaçmaz. Sempatik çıkışı kapatıp farkı görün. [[K1 s. 338]]</p>
    <p class="viz-foot">Model şematiktir: basınç ve direnç çubukları nitel; kitap bu dengeyi sayıyla vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kontinansı iki pontin merkez yönetir: <b>depolama merkezi</b> ve <b>miksiyon merkezi</b>. Depolama evresinde depolama merkezi sempatik çıkışı artırır; detrüsörün gevşemesi ile IUS'nin kasılması eşgüdümlüdür ve mesane kaçırmadan dolar. [[K1 s. 338]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d71-dolum">
  <h2>Mesane dolarken basınç ve his</h2>
  <p class="intro">Mesane uzun süre düşük basınçta dolar; 400 mL'nin üstünde duvar sertleşir ve basınç hızla yükselir. [[K1 s. 338]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hacim–basınç eğrisi ve doluluk hissi</h3></div>
    <div data-viz="f71_dolum"></div>
    <p class="viz-cap" aria-live="polite"><b>100 mL.</b> Kompliyans yüksek, basınç 10 cmH₂O'nun altında; gerilme reseptörleri sessiz. Hacmi artırın. [[K1 s. 338]]</p>
    <p class="viz-foot">Eğrinin biçimi şematiktir. Kitaptan: 10 cmH₂O ≈ 200 mL eşiği, 400 mL'de kompliyans düşüşü ve his eşikleri (200, 350–400, 700 mL).</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yarıçap büyüdükçe <b>Laplace yasası</b> gereği duvar gerilimi artar (Bölüm 20). Basınç 10 cmH₂O'yu (yaklaşık 200 mL) aşınca duvardaki gerilme reseptörleri etkinleşir; üst beyin merkezleri bu sinyali doluluk hissi olarak yorumlar. Mesane doldukça miksiyon refleksi daha sık gelir, detrüsör daha güçlü kasılır. [[K1 s. 338–339]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d71-refleks">
  <h2>Miksiyon refleksi, koruyucu refleks ve istemli denetim</h2>
  <p class="intro">Mesane gerilince omurilik iki refleks başlatır: biri boşaltmaya, öteki tutmaya çalışır; hangisinin kazanacağını beyin seçer. [[K1 s. 338–339]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Gerilmeden işemeye: devre adım adım</h3></div>
    <div data-viz="f71_devre"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Gerilme.</b> Basınç 10 cmH₂O'yu aşınca duvardaki gerilme reseptörleri ateşlenir; afferent sinyal hipogastrik sinirle lomber omuriliğe gider. İleri düğmesine basın. [[K1 s. 338]]</p>
    <p class="viz-foot">Şematik devre; kitabın tarif ettiği yollar gösterilir, nöron sayısı ve uzaklıklar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Miksiyon refleksi</b> S2–S4 kaynaklı parasempatik kolinerjik nöronları ateşler; detrüsör geçici olarak kasılır. Refleks kendini yeniden üretir: kasılma gerilme reseptörlerini daha çok uyarır, o da daha çok kasılma doğurur. <b>Koruyucu (guarding) refleks</b> bu geçici kasılmalar sırasında EUS'yi refleks olarak kasıp kaçırmayı önler. [[K1 s. 338–339]]</p>
    <p>Refleks yeterince güçlenince, üst merkezler engellemezse EUS'yi refleks olarak açar: <b>istemsiz miksiyon</b>. Pontin miksiyon merkezi olgunlaşmamış bebek ve küçük çocukta durum budur. [[K1 s. 339]]</p>
    <p><b>İstemli erteleme:</b> işemek uygun değilse frontal korteks pontin merkezlere sempatik çıkışı artırıp parasempatik çıkışı azaltmasını söyler; detrüsör gevşer, IUS kasılır. Refleks güçlendikçe pons EUS'yi de tonik kastırır; kişi EUS'yi istemli olarak da sıkabilir. <b>İstemli işeme:</b> karın kasları kasılıp mesane içi basıncı artırır ve duvarı gerer; pontin miksiyon merkezi aynı anda refleksi tetikler ve EUS'yi inhibe eder. [[K1 s. 339]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Miksiyon refleksinin başlıca afferent yolu pelvik sinirlerle sakral omuriliğe ulaşır; hipogastrik–lomber yol yardımcıdır. Koruyucu refleksin efferenti de sakral kökenli pudendal sinirdir.</div>
</section>

<section class="wrap blk ders-sec" id="d71-spinal">
  <h2>Klinik önem: omurilik yaralanması ve nörojenik mesane</h2>
  <p class="intro">Tam kontinans ve tam boşalma sağlam otonom girdiye bağlıdır; sakral düzeyin üstündeki tam omurilik yaralanması bu yolları keser. [[K1 s. 339]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yaralanmadan sonra mesane: iki evre</h3></div>
    <div data-viz="f71_spinal"></div>
    <p class="viz-cap" aria-live="polite"><b>Sağlam omurilik.</b> Sempatik ve parasempatik girdi açık, beyin–pons bağlantısı sağlam: mesane kaçırmadan dolar ve tam boşalır. Evreleri sırayla seçin. [[K1 s. 339]]</p>
    <p class="viz-foot">Zaman ekseni nitel; kitap spinal şoku yalnız "yaralanmayı izleyen haftalar" diye tanımlar.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Spinal şok</b> (ilk haftalar): yaralanma düzeyinin altında flask paralizi ve refleks kaybı. Mesane iki otonom girdisini de yitirip atonik olur, doluluk algısı kaybolur; EUS etkinliği ise belirgin artar. Sonuç akut retansiyondur; çok dolan mesanede yüksek basınç çıkış direncini aşar ve <b>taşma inkontinansı</b> olur. Akut böbrek hasarını önlemek için kateter takılır; bu hasar eskiden akut omurilik yaralanmasında başlıca ölüm nedeniydi. [[K1 s. 339]]</p>
    <p><b>Hiperrefleksi ve spastisite</b>: detrüsör gerilmeye güçlü refleks kasılmayla yanıt verir; mesane kendiliğinden dolup boşalır (<b>otomatik mesane</b>). Kasılmalar sürmediği ve EUS refleks kasıldığı için (<b>detrüsör–sfinkter dissinerjisi</b>) boşalma eksik kalır, enfeksiyon riski artar. [[K1 s. 339]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d71-pour">
  <h2>Klinik önem: ameliyat sonrası üriner retansiyon</h2>
  <p class="intro">POUR, ameliyattan sonra mesane doluyken işeyememektir ve cerrahi girişimlerin yaklaşık %15'ini komplike eder. [[K1 s. 339]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tanı eşiği, risk etkenleri, kateter</h3></div>
    <div data-viz="f71_pour"></div>
    <p class="viz-cap" aria-live="polite"><b>Ultrasonla 350 mL.</b> Dolu mesane kanıtı için eşik >500 mL'dir. Hacmi artırın ve risk etkenlerini açın. [[K1 s. 339]]</p>
    <p class="viz-foot">Risk göstergesi nitel; kitabın verdiği tek risk oranı opioidin 1,5 katıdır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Standart tanımı yoktur; çoğunlukla iki ölçüt birlikte kullanılır: <b>klinik</b> (doluluk hissi, suprapubik ağrı, ele gelen mesane) ve <b>dolu mesane kanıtı</b> (ultrasonla tahmini hacim ya da kateter sonrası rezidü >500 mL). [[K1 s. 339]]</p>
    <p><b>Risk etkenleri:</b> hastada önceden alt üriner sistem semptomları; anorektal ve inguinal herni cerrahisi; 750 mL'yi aşan intraoperatif intravenöz sıvı; nöraksiyel blok; opioid analjezi (risk 1,5 kat). [[K1 s. 339–340]]</p>
    <p>Spinal anestezi, özellikle intratekal opioidle, genel anesteziye göre riski belirgin artırır: detrüsöre otonom sinyal kesilir, omurilik yaralanmasına benzer bir durum oluşur. Düşük dozlu ya da kısa etkili (ör. prilokain) intratekal lokal anestezik riski azaltır. Standart tedavi, genellikle hacim 600 mL'yi aşınca kateterizasyondur; rahatsızlığı giderir, böbrek hasarı ve enfeksiyonu önler. [[K1 s. 340]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d71-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: detrüsör ve sfinkterlerin innervasyonu, β3 ve α1 etkileri, 10 cmH₂O / 200 mL eşiği, 400 mL'de kompliyans düşüşü, his eşikleri, miksiyon ve koruyucu refleks, spinal şok ile hiperrefleksi, POUR'un sıklığı, tanı ve kateter eşikleri, risk etkenleri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz71-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz71-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz71-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d71-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Mesanenin depolama ve boşaltma denetimini anlatın. Spinal anesteziyle inguinal herni onarımı yapılan bir hasta altı saattir işeyemiyor: neden ve ne yaparsınız?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Yapı.</b> Detrüsör (düz kas; sempatik hipogastrik, parasempatik pelvik splanknik), IUS (detrüsör uzantısı, sempatik), EUS (çizgili, pudendal, istemli). [[K1 s. 338]]</li>
    <li><b>Kontinans.</b> Çıkış direnci > intravezikal basınç; pontin depolama ve miksiyon merkezleri. [[K1 s. 338]]</li>
    <li><b>Depolama.</b> Sempatik çıkış: β3 detrüsörü gevşetir, α1 IUS'yi kasar; viskoelastisite sayesinde basınç düşük kalır, 400 mL üstünde kompliyans düşer. [[K1 s. 338]]</li>
    <li><b>Refleksler.</b> 10 cmH₂O / 200 mL'de gerilme reseptörleri; S2–S4 parasempatik miksiyon refleksi (kendini yeniden üretir) ve EUS'yi kasan koruyucu refleks; his eşikleri 200, 350–400, 700 mL. [[K1 s. 338–339]]</li>
    <li><b>İstemli denetim.</b> Ertelemede frontal korteks → pons: sempatik artar, parasempatik azalır, EUS tonik kasılır. İşemede karın kasları basıncı artırır, pontin merkez refleksi tetikleyip EUS'yi inhibe eder. [[K1 s. 339]]</li>
    <li><b>Olgu.</b> POUR: klinik ölçüt + ultrasonla >500 mL. Risk: inguinal herni cerrahisi, spinal anestezi (intratekal opioidle daha çok), 750 mL üstü sıvı, opioid (×1,5), alt üriner sistem semptomu öyküsü. [[K1 s. 339–340]]</li>
    <li><b>Tedavi.</b> Genellikle >600 mL'de kateterizasyon; önlemek için düşük dozlu ya da kısa etkili (prilokain) intratekal lokal anestezik. [[K1 s. 340]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Mesaneyi bir daire, altına IUS ve EUS'yi iki halka olarak çizin. Sola omurilik sütunu: lomberden hipogastrik sinir (sempatik: β3 detrüsör gevşer, α1 IUS kasılır), S2–S4'ten pelvik sinir (parasempatik: detrüsör kasılır), sakraldan pudendal sinir (EUS). Üste pons ve korteks kutusu. Yanına hacim–basınç eğrisini 200 / 400 / 700 mL işaretleriyle ekleyin. [[K1 s. 338–339]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Detrüsörün kompliyansı neden yüksek? Koruyucu refleks ne işe yarar? Bebek neden istemsiz işer? Spinal şokta neden hem retansiyon hem inkontinans olur? Detrüsör–sfinkter dissinerjisi nedir? Spinal anestezi neden POUR yapar? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 338–340]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d71-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Detrüsör ve IUS düz kastır ve otonom (istemsiz) denetimdedir; EUS çizgilidir ve pudendal sinirle istemlidir. [[K1 s. 338]]</li>
    <li>İdrar, çıkış direnci intravezikal basıncı aştıkça kaçmaz; depolamada sempatik çıkış β3 ile detrüsörü gevşetir, α1 ile IUS'yi kasar. [[K1 s. 338]]</li>
    <li>Viskoelastik mesane 400 mL'ye dek düşük basınçta dolar; 10 cmH₂O (≈200 mL) gerilme reseptörü ve ilk işeme isteği eşiğidir, 350–400 mL rahatsız edici, 700 mL ağrılıdır. [[K1 s. 338–339]]</li>
    <li>Miksiyon refleksi (S2–S4, parasempatik kolinerjik) kendini yeniden üretir; koruyucu refleks EUS'yi kasarak geçici kasılmalarda kaçırmayı önler. [[K1 s. 338–339]]</li>
    <li>Ertelemeyi korteks–pons ekseni ve EUS'nin istemli kasılması sağlar; işemede karın kasları ve pontin miksiyon merkezi birlikte çalışır. Bebekte pons olgunlaşmadığı için işeme istemsizdir. [[K1 s. 339]]</li>
    <li>Sakral üstü tam omurilik yaralanması: önce atonik mesane, retansiyon ve taşma inkontinansı (kateter, böbrek hasarını önler); sonra otomatik mesane ve detrüsör–sfinkter dissinerjisi. [[K1 s. 339]]</li>
    <li>POUR cerrahinin ≈%15'inde; tanıda >500 mL, tedavide genellikle >600 mL kateter; spinal anestezi, opioid (×1,5), 750 mL üstü sıvı, anorektal ve inguinal herni cerrahisi riski artırır. [[K1 s. 339–340]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="71"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/ek70">← Ek ders · Asit–baz kompansasyonu: hücre içi tamponlar, in vitro ve in vivo tampon doğruları</a>
    <a href="#/dersler/fizyoloji/72">Sonraki: Bölüm 72 · Hemostaz →</a>
  </nav>
</section>`,
};
