/* Fizyoloji Ek ders (Bölüm 22 ardından) · Nefes tutma, egzersiz ve anestezik ajanların ventilasyon kontrolüne etkisi
   (K2 = Power & Kam, Principles of Physiology for the Anaesthetist, 3. baskı, İngilizce özgün s. 109–110).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi kaynak sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fizek22.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fizek22-1'] = {
  no: 1, kok: 'Nefes tutma için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 22 ardından', kaynak: '[[K2 s. 109–110]]',
  onermeler: [
    { t: 'Hava yolu tıkalıysa alveoler PO₂ bir dakika içinde yaklaşık miks venöz PO₂ düzeyine iner.', d: true, n: 'Doğru. Tıkalı hava yoluyla nefes tutmada alveolden kana oksijen geçişi sürer ama yerine gaz konmaz; alveol gazı hızla miks venöz kanla dengeye yaklaşır. [[K2 s. 109]]' },
    { t: 'Hava solunduktan sonra nefes tutmada PCO₂ dakikada yaklaşık 0,4–0,8 kPa (3–6 mmHg) yükselir.', d: true, n: 'Doğru. Apnede CO₂ üretimi sürer; K1 de apnede aynı artış hızını verir. [[K2 s. 109]] [[K1 s. 39]]' },
    { t: 'Hava solunduktan sonra kırılma noktası yaklaşık 8 kPa PCO₂ değerinde ortaya çıkar.', d: false, n: 'Yanlış. Kırılma noktası yaklaşık 6,7 kPa (50 mmHg) PCO₂ değerindedir. Bu değer PCO₂\'nin baskın etken olduğu anlamına da gelmez: eşlik eden hipoksi büyük olasılıkla daha önemlidir. [[K2 s. 110]]' },
    { t: 'Nefes tutma süresi, nefesin tutulmaya başlandığı akciğer hacmiyle orantılıdır.', d: true, n: 'Doğru. Büyük akciğer hacmi hem daha büyük oksijen deposu demektir hem de akciğer ve göğüs duvarından gelen sinir afferentleri üzerinden süreyi uzatır. [[K2 s. 110]]' },
    { t: 'Nefes tutmadan önce oksijen solumak kırılma noktasını öne çeker.', d: false, n: 'Yanlış. Önceden oksijen solumak hipoksinin başlamasını geciktirdiği için nefes tutma süresini uzatır. Hiperventilasyon ve preoksijenasyonla çok uzun süreler elde edilebilir. [[K2 s. 110]]' },
  ],
};
VERI.sorular['fizek22-2'] = {
  no: 2, kok: 'Egzersizde ventilasyonun kontrolü için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 22 ardından', kaynak: '[[K2 s. 109]]',
  onermeler: [
    { t: 'Egzersiz sırasında sistemik venöz PCO₂ düşer.', d: false, n: 'Yanlış. Egzersizde sistemik venöz PCO₂ yükselir ve venöz PO₂ düşer; arteriyel değerler orta şiddette egzersizde hemen hemen değişmez. [[K2 s. 109]]' },
    { t: 'Orta şiddette egzersizde ventilasyon, arteriyel kan gazlarında anlamlı değişiklik olmadan doku metabolik gereksinimiyle birlikte artar.', d: true, n: 'Doğru. Ventilasyonun metabolik gereksinime bu kadar iyi uyduğu hâlde arteriyel PCO₂, PO₂ ve hidrojen iyonu konsantrasyonunun değişmemesi, egzersizdeki ventilasyon kontrolünün hangi sinyalle yürüdüğünün hâlâ açık olmamasının nedenidir. [[K2 s. 109]]' },
    { t: 'Uzuv hareketini algılayan eklem ve kas reseptörleri medullaya afferent bilgi göndererek ventilasyonu artırır.', d: true, n: 'Doğru. Bu, egzersizde ventilasyonu artırdığı düşünülen mekanizmalardan biridir; K1 egzersize ventilatuvar yanıtın kas iğciği etkinliğiyle başlatıldığının düşünüldüğünü yazar. [[K2 s. 109]] [[K1 s. 95]]' },
    { t: 'Ağır egzersizde arteriyel PCO₂\'nin düşmesinin nedeni, düşük PO₂ ve artmış hidrojen iyonu konsantrasyonunun periferik kemoreseptörler üzerinden yaptığı ek ventilasyon uyarısıdır.', d: true, n: 'Doğru. Ağır egzersizde iskelet kası enerjinin bir bölümünü anaerobik metabolizmayla sağlar; açığa çıkan laktik asit ve hidrojen iyonları periferik kemoreseptörleri uyarır ve ventilasyon metabolik gereksinimin ötesine geçerek arteriyel PCO₂\'yi düşürür. [[K2 s. 109]]' },
    { t: 'Egzersizde oksijen tüketimi istirahat değerinin en çok iki katına çıkabilir.', d: false, n: 'Yanlış. Oksijen tüketimi istirahatteki 250 mL/dk değerinden sporcularda 3–4 L/dk\'ya kadar çıkar; dakika ventilasyonu da 120 L/dk\'ya ulaşır. [[K2 s. 109]]' },
  ],
};
VERI.sorular['fizek22-3'] = {
  no: 3, kok: 'Anestezik ajanların ve opioidlerin ventilasyon kontrolüne etkisi için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 22 ardından', kaynak: '[[K2 s. 109]]',
  onermeler: [
    { t: 'Volatil anestezik ajanlar hipoksik ventilatuvar yanıt eğrisini yalnızca yüksek konsantrasyonlarda baskılar.', d: false, n: 'Yanlış. Volatil ajanlar hipoksik (PO₂/ventilasyon) yanıt eğrisini çok düşük konsantrasyonlarda bile baskılar. [[K2 s. 109]]' },
    { t: 'Hiperventilasyondan sonra spontan solunumun yeniden başladığı arteriyel PCO₂ değeri (apneik eşik) anestezik ajanlarla yükselir.', d: true, n: 'Doğru. Volatil ajanlar, barbitüratlar ve opioid analjezikler hem dakika ventilasyonunun PCO₂ ile artış hızını azaltır hem de apneik eşiği yükseltir. [[K2 s. 109]]' },
    { t: 'Opioidler CO₂ yanıt eğrisini sağa kaydırır.', d: true, n: 'Doğru. K1, opioidlerin periferik ya da merkezi kemoreseptörlerin hipoksemi ve hiperkapni yanıtını etkilemediğini, bunun yerine medulladaki solunum merkezini belirgin biçimde baskıladığını ve sonuçta CO₂ yanıt eğrisinin sağa kaydığını yazar. [[K1 s. 96]]' },
    { t: 'Bu ajanların ventilatuvar yanıtlar üzerindeki baskılayıcı etkisi anestezinin sonlanmasıyla birlikte biter.', d: false, n: 'Yanlış. Etkiler erken postoperatif döneme uzanır ve hipoksi gelişme riskini artırır. [[K2 s. 109]]' },
    { t: 'Solunum uyarıcısı doksapram periferik kemoreseptörler üzerinde etki eder.', d: true, n: 'Doğru. K1 doksapramın periferik kemoreseptörlerde etki ettiğini, ancak mekanizmanın açık olmadığını yazar. [[K1 s. 96]]' },
  ],
};

const DEK22_NAV = [
  ['dek22-tutma', 'Nefes tutma'], ['dek22-kirilma', 'Kırılma noktası'], ['dek22-egzersiz', 'Egzersiz'],
  ['dek22-ajan', 'Anestezik ajanlar'], ['dek22-p1', 'Part I'], ['dek22-p2', 'Part II'], ['dek22-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/ek22'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Ek ders · Bölüm 22 ardından', baslik: 'Nefes tutma, egzersiz ve anestezik ajanların ventilasyon kontrolüne etkisi',
  lede: 'Bölüm 22\'nin kontrol döngüsü üç durumda: nefes tutulunca kan gazlarına ne olur ve nefes tutmayı ne bitirir, egzersizde ventilasyonu ne artırır, anestezik ajanlar bu kontrolü nasıl zayıflatır? [[K2 s. 109–110]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${DEK22_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="dek22-tutma">
  <h2>Nefes tutma: alveol gazında ve kan gazlarında ne olur?</h2>
  <p class="intro">Nefes tutulunca ventilasyon durur ama metabolizma sürer; kan gazlarının seyrini hava yolunun açık olup olmadığı ve ortam gazının bileşimi belirler. [[K2 s. 109]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Nefes tutma: üç senaryoda alveol gazı</h3></div>
    <div data-viz="fek22_apne"></div>
    <p class="viz-cap" aria-live="polite">Bir senaryo seçip zamanı ilerletin: solda PO₂ ile PCO₂'nin seyrini, sağdaki sütunda alveol gazının bileşimini izleyin. [[K2 s. 109–110]]</p>
    <p class="viz-foot">Şematik model; ara değerler kitabın uç değerlerini birleştirir. Gaz sütunu PB 101 kPa, su buharı 6,3 kPa ve miks venöz PO₂ 5,3 kPa ile çizilir [[K1 s. 66]]. K1 çapaları: havada 2. dakikada SaO₂ %70 (PO₂ 5,0 kPa); denitrojenizasyondan sonra oksijen deposu 3 L'nin üstünde, 5. dakikada SaO₂ %100, PaCO₂ ≈ 10 kPa [[K1 s. 39]]; oksijenle dolu FRC'de 1800 mL O₂ [[K1 s. 52]]. Modelin SaO₂'si (P50 3,5 kPa) 5,0 kPa'da %72'dir. [[K1 s. 30, 32]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Hava solunduktan sonra alveol gazı birkaç dakikada miks venöz kanla dengeye ulaşır. Dakikada ≈ 250 mL oksijen tüketilip 200 mL karbondioksit üretilmeye devam ettiği için PCO₂ üç durumda da dakikada 0,4–0,8 kPa (3–6 mmHg) yükselir; ayrışan oksijendir. [[K2 s. 109]] [[K1 s. 39]]</p>
  </div>
  <div class="tbl-wrap" style="margin:12px 0 0">
    <table class="tbl">
      <thead><tr><th>Durum</th><th>Alveolde ne olur?</th><th>Sonuç</th></tr></thead>
      <tbody>
        <tr><th>1 · Hava yolu tıkalı</th><td>Oksijen kana geçmeye devam eder, yerine gaz gelmez.</td><td>PAO₂ bir dakika içinde ≈ miks venöz PO₂'ye (5,3 kPa) iner. [[K2 s. 109]] [[K1 s. 66]]</td></tr>
        <tr><th>2 · Açık hava yolu, ortam gazı hava</th><td>İlk değişiklikler aynıdır; ama oksijen alımı karbondioksit çıkışından büyük olduğu için akciğer hacmi küçülür, aradaki fark kadar ortam havası içeri çekilir ve havanın azotu alveolde birikir.</td><td>Yaklaşık iki dakika sonra hipoksi. [[K2 s. 109]]</td></tr>
        <tr><th>3 · Açık hava yolu, ortam gazı oksijen</th><td>Alınan oksijenin yerine kütlesel akımla oksijen çekilir; alveol gazına azot eklenmez.</td><td>PAO₂ yalnız PCO₂'nin yükseldiği hızda (0,4–0,8 kPa/dk) düşer; birkaç dakika ciddi hipoksi olmaz, PCO₂ ise yükselmeye devam eder. [[K2 s. 110]]</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek22-kirilma">
  <h2>Kırılma noktası: nefes tutmayı ne bitirir, süreyi ne uzatır?</h2>
  <p class="intro">Kırılma noktası, soluk alma uyarısının nefesi tutmaya yönelik istemli çabayı aştığı andır. [[K2 s. 110]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Kırılma noktası: istemli çaba ile soluk alma uyarısı</h3></div>
    <div data-viz="fek22_kirilma"></div>
    <p class="viz-cap" aria-live="polite">Başlangıç koşulunu değiştirin: PCO₂ ve hipoksi paylarından oluşan uyarının istemli çaba çizgisini kestiği an, yani kırılma noktası, nasıl kayıyor? [[K2 s. 110]] [[K1 s. 95]]</p>
    <p class="viz-foot">Şematik çizim: zaman ve uyarı payları birimsizdir; kitap yalnız hava solunduktan sonraki kırılma noktasını sayıyla verir (PCO₂ 6,7 kPa). [[K2 s. 110]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Serebral korteks solunum merkezine giden girdileri istemli olarak bir süre bastırabilir; hipoksemi ya da hiperkapninin kemoreseptörleri uyarması sonunda bu kontrolü aşar. [[K1 s. 95]] Hava solunduktan sonra bu an PCO₂ ≈ 6,7 kPa'dır (50 mmHg); yine de baskın etken PCO₂ değildir, eşlik eden hipoksi büyük olasılıkla daha önemlidir. [[K2 s. 110]]</p>
    <p>Önceden oksijen solumak hipoksiyi geciktirdiği için süreyi uzatır. Süre, tutmanın başındaki akciğer hacmiyle de orantılıdır: büyük hacim oksijen deposunu büyütür, akciğer ve göğüs duvarından gelen sinir afferentleri de etki eder. En uzun süreler hiperventilasyon ile preoksijenasyon birlikte yapılınca elde edilir. [[K2 s. 110]]</p>
    <p>Anestezideki karşılığı preoksijenasyondur: geleneksel olarak 3 dakika %100 oksijen solutulur. Sırtüstü erişkinde oksijenle dolu FRC (≈ 1800 mL O₂) hava yolunu güvenceye almak için ≈ 8 dakika verir; hava solurken bu süre 1 dakikadan biraz uzundur. [[K1 s. 52]]</p>
  </div>
  <div class="note warn" style="margin-top:12px"><b>Atlas notu.</b> Hiperventilasyon tek başına PCO₂'yi düşürüp kırılma noktasını geciktirir ama oksijen deposunu büyütmez; bu yüzden hipoksi, soluk alma uyarısı güçlenmeden bilinç kaybı yapabilir (serbest dalışta su içinde bilinç kaybı). K1 de nefes tutarak dalışta hızlı yüzeye çıkışta alveoler PO₂'nin düştüğünü, serebral hipoksi ve bilinç kaybı gelişebileceğini yazar. [[K1 s. 435]]</div>
</section>

<section class="wrap blk ders-sec" id="dek22-egzersiz">
  <h2>Egzersizde ventilasyonu ne kontrol eder?</h2>
  <p class="intro">Egzersizde ventilasyon metabolik gereksinimle adım adım artar; orta şiddette arteriyel kan gazları anlamlı değişmediği için bunu neyin yönettiği açık değildir. [[K2 s. 109]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Egzersizde ventilasyon: hangi sinyal ne zaman?</h3></div>
    <div data-viz="fek22_egzersiz"></div>
    <p class="viz-cap" aria-live="polite">Egzersiz şiddetini artırın: V̇<sub>E</sub> ile V̇O₂ birlikte yükselirken arteriyel ve venöz kan gazlarını ve devreye giren sinyalleri izleyin. [[K2 s. 109]]</p>
    <p class="viz-foot">Şematik model; şiddet ekseni birimsizdir (K1 de yalnız "istirahat · hafif · orta · yoğun" der [[K1 s. 181]]). Kitap sayıları: V̇O₂ 250 mL/dk → 3–4 L/dk, V̇<sub>E</sub> 120 L/dk'ya kadar, [H⁺] 40 → 46 nmol/L'de V̇<sub>E</sub> ≈ 5 → 15 L/dk [[K2 s. 109]]; V̇<sub>E</sub> 5 → 100 L/dk (20 kat), kalp debisi 5 kat [[K1 s. 181]]. Anaerobik eşiğin yeri, sinyal aralıkları ve venöz değerler şematiktir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Oksijen tüketimi istirahatteki 250 mL/dk'dan sporcularda 3–4 L/dk'ya çıkar, kasın karbondioksit üretimi de artar; dakika ventilasyonu 120 L/dk'ya yükselerek daha çok oksijen sunar, daha çok karbondioksit atar. [[K2 s. 109]] Solunumun rezervi kalbinkinden büyüktür (V̇<sub>E</sub> 20 kat, kalp debisi 5 kat); sağlıklı akciğerde egzersizi genellikle solunum sınırlamaz. [[K1 s. 181]]</p>
    <p>Normal aerobik egzersizde arteriyel PCO₂ hafifçe düşer, PO₂ ve hidrojen iyonu konsantrasyonu değişmez; değişen venöz kandır: PCO₂ yükselir, PO₂ düşer. Ağır egzersizde arteriyel PO₂ düşebilir; kas enerjinin bir kısmını anaerobik metabolizmayla sağlar ve kana laktik asit ile hidrojen iyonu verir (K1 bu noktaya <b>anaerobik eşik</b> der [[K1 s. 182]]). Düşük PO₂ ve artan hidrojen iyonunun periferik kemoreseptörler üzerinden yaptığı ek uyarı ventilasyonu artırır ve arteriyel PCO₂ düşer. [[K2 s. 109]] Kitabın eğrisinde kan [H⁺] 40'tan 46 nmol/L'ye (pH 7,40 → ≈ 7,34) çıkınca dakika ventilasyonu ≈ 5'ten 15 L/dk'ya yükselir. [[K2 s. 109]]</p>
    <p>Ventilasyonu artırdığı düşünülen öteki sinyaller: [[K2 s. 109]]</p>
    <ul>
      <li><b>Motor korteksten inen uyarılar</b> medulladaki solunum merkezini uyarır; egzersizin başındaki ani artışı bu açıklayabilir.</li>
      <li><b>Eklem ve kas reseptörleri</b> uzuv hareketini algılayıp medullaya afferent bilgi gönderir (K1'e göre yanıtı kas iğciklerinin başlattığı düşünülür [[K1 s. 95]]).</li>
      <li><b>Periferik kemoreseptörler</b>, tidal hacim büyüdüğü için solunum döngüsü içinde genişleyen arteriyel PCO₂ salınımını algılayabilir.</li>
      <li><b>Adrenalin ve noradrenalin salınımı</b> ile <b>kan sıcaklığının yükselmesi</b>.</li>
    </ul>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> K2 ağır egzersizde arteriyel PO₂'nin düşebileceğini yazar [[K2 s. 109]]; K1 ise deniz düzeyinde normal akciğerde oksijen geçişi difüzyonla sınırlanmadığı için PaO₂'nin yoğun egzersizde bile normal kaldığını söyler [[K1 s. 182]]. Yerleşik bilgi K1'in yanındadır: egzersize bağlı arteriyel hipoksemi elit sporcularda ve akciğer hastalığında görülen bir istisnadır.</div>
</section>

<section class="wrap blk ders-sec" id="dek22-ajan">
  <h2>Anestezik ajanlar ventilasyonun kontrolünü nasıl değiştirir?</h2>
  <p class="intro">Volatil anestezikler, barbitüratlar ve opioid analjezikler hiperkarbiye, hipoksiye ve asidoza ventilatuvar yanıtı baskılar. [[K2 s. 109]]</p>

  <div class="viz">
    <div class="viz-head"><h3>CO₂ ve hipoksi yanıt eğrileri: ajan eğriyi nasıl değiştirir?</h3></div>
    <div data-viz="fek22_yanit"></div>
    <p class="viz-cap" aria-live="polite">Bir ajan ve doz seçin: CO₂ görünümünde eğimi ve eğrinin yatay ekseni kestiği apneik eşiği, hipoksi görünümünde hipoksik yanıtın büyüklüğünü normalle karşılaştırın. [[K2 s. 109]]</p>
    <p class="viz-foot">Şematik model. Kitaptan: CO₂ yanıtının 5–10 kPa arasında doğrusal olması ve derin hiperkapnide azalması (hayvan deneyleri), PaO₂ 8 kPa'nın altında ventilasyonun belirgin artması [[K1 s. 95–96]]; eğimin azalması, apneik eşiğin yükselmesi, hipoksik yanıtın eser volatil konsantrasyonda bile baskılanması [[K2 s. 109]]. Eğim (normal 4,5 L·dk⁻¹·kPa⁻¹), apneik eşik (≈ 4,0 kPa) ve doz etkilerinin büyüklüğü şematiktir; hipoksi görünümünde istirahat V̇<sub>E</sub> karşılaştırma için 6 L/dk'da sabittir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>CO₂ yanıt eğrisinin eğimi azalır, yani dakika ventilasyonu yükselen PCO₂ ile daha yavaş artar; <b>apneik eşik</b> (hiperventilasyondan sonra spontan solunumun yeniden başladığı arteriyel PCO₂) yükselir. Volatil ajanlar hipoksik (PO₂/ventilasyon) yanıt eğrisini çok düşük konsantrasyonlarda bile baskılar. [[K2 s. 109]]</p>
    <p>K1'e göre anestezik ajanlar hem solunum merkezini hem periferik kemoreseptörleri baskılar ve CO₂ yanıt eğrisi sağa kayar. Opioidler kemoreseptör yanıtını etkilemez, medulladaki solunum merkezini baskılar; sonuç yine sağa kaymadır. Solunum uyarıcısı doksapram periferik kemoreseptörlerde etkir, mekanizması açık değildir. [[K1 s. 96]]</p>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px">Bu etkiler erken postoperatif döneme uzanır ve hipoksi riskini artırır. [[K2 s. 109]] Derlenmede hipoksiye yanıt eser volatil ajanla bile zayıftır, hiperventilasyondan sonra spontan solunum da geç döner. Ventilasyonu büyük ölçüde hipoksemik dürtüyle süren kronik hiperkapnili KOAH hastasında bu dürtünün zayıflaması daha da önemlidir. [[K1 s. 94]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek22-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu ek dersin MTF'de en çok sorulan noktaları: nefes tutmada PCO₂'nin artış hızı (0,4–0,8 kPa/dk), üç senaryonun ayrımı (tıkalı hava yolu, açık hava yolu + hava, açık hava yolu + oksijen), kırılma noktasının değeri (6,7 kPa) ve hipoksinin daha önemli olması, nefes tutma süresini uzatan etkenler, egzersizdeki sayılar (V̇O₂ 250 mL/dk → 3–4 L/dk, V̇E 120 L/dk) ve orta şiddette egzersizde arteriyel kan gazlarının değişmemesi, egzersizde ventilasyonu artırdığı düşünülen sinyaller, ajanların CO₂ yanıt eğrisinin eğimine ve apneik eşiğe etkisi, volatil ajanların hipoksik yanıtı çok düşük konsantrasyonlarda bile baskılaması ve etkilerin postoperatif döneme uzanması. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fizek22-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek22-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek22-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="dek22-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Bir hasta nefesini tuttuğunda alveol gazında ve kan gazlarında ne olur? Nefes tutmayı bitiren nedir ve süresini ne uzatır? Anestezik ajanlar ventilasyonun kontrolünü nasıl değiştirir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Metabolizma sürer.</b> Apnede dakikada yaklaşık 250 mL oksijen tüketilir, 200 mL karbondioksit üretilir; alveol gazı birkaç dakika içinde miks venöz kanla dengeye yaklaşır ve PCO₂ dakikada 0,4–0,8 kPa (3–6 mmHg) yükselir. [[K2 s. 109]] [[K1 s. 39]]</li>
    <li><b>Üç senaryoyu ayırın.</b> Hava yolu tıkalı: alveoler PO₂ bir dakikada yaklaşık miks venöz PO₂'ye iner. Açık hava yolu + oda havası: akciğer hacmi küçüldüğü için hava çekilir, azot alveolde birikir, yaklaşık iki dakikada hipoksi gelişir. Açık hava yolu + oksijen: azot eklenmediği için PO₂ yalnızca PCO₂'nin yükseldiği hızda düşer, birkaç dakika ciddi hipoksi olmaz. [[K2 s. 109–110]]</li>
    <li><b>Grafikle gösterin ve sayıları verin.</b> Hava solurken SaO₂ iki dakikada %70'e (PO₂ 5,0 kPa) iner; denitrojenizasyondan sonra depo 3 L'nin üstündedir, 5 dakikada SaO₂ %100 kalır ve PaCO₂ 10 kPa'ya yaklaşır. Sırtüstü erişkinde oksijenle dolu FRC ≈ 1800 mL, yaklaşık 8 dakika kazandırır; hava solurken aynı FRC 1 dakikadan biraz uzun dayanır. [[K1 s. 39]] [[K1 s. 52]]</li>
    <li><b>Kırılma noktası.</b> Soluk alma uyarısının istemli çabayı aştığı nokta; hava solunduktan sonra yaklaşık 6,7 kPa (50 mmHg) PCO₂'de olur, ama baskın etken PCO₂ değildir: eşlik eden hipoksi büyük olasılıkla daha önemlidir. K1'de aynı olay, kortikal istemli kontrolün kemoreseptör uyarısıyla aşılmasıdır. [[K2 s. 110]] [[K1 s. 95]]</li>
    <li><b>Süreyi uzatanlar.</b> Önceden oksijen solumak (hipoksiyi geciktirir), büyük akciğer hacminde başlamak (daha büyük depo + akciğer ve göğüs duvarı afferentleri), hiperventilasyon ile preoksijenasyonun birlikteliği. Anestezideki karşılığı preoksijenasyondur; hiperventilasyonun tek başına yanıltıcı ve tehlikeli olduğunu ekleyin (Atlas notu). [[K2 s. 110]] [[K1 s. 52]]</li>
    <li><b>Egzersizle karşıtlık kurun.</b> Egzersizde V̇O₂ 250 mL/dk'dan 3–4 L/dk'ya, V̇E 120 L/dk'ya çıkar; buna karşın orta şiddette egzersizde arteriyel kan gazları hemen hemen değişmez: kontrolün hangi sinyalle yürüdüğü açık değildir. Motor korteksten inen uyarılar, eklem ve kas reseptörleri, PCO₂ salınımının algılanması, katekolaminler ve kan sıcaklığı sayılır; anaerobik eşiğin üstünde hidrojen iyonu karotis cisimciklerini uyarır. [[K2 s. 109]] [[K1 s. 182]]</li>
    <li><b>Ajanlarla bitirin.</b> Volatil ajanlar, barbitüratlar ve opioidler hiperkarbi, hipoksi ve asidoz yanıtını baskılar: CO₂ yanıt eğrisinin eğimi azalır, eğri sağa kayar, apneik eşik yükselir; volatil ajanlar hipoksik yanıtı çok düşük konsantrasyonlarda bile bastırır ve etkiler erken postoperatif döneme uzanarak hipoksi riskini artırır. Opioidlerin etkisi kemoreseptörlerde değil medulladaki solunum merkezindedir; doksapram periferik kemoreseptörlerde etkir. [[K2 s. 109]] [[K1 s. 96]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim, nefes tutma sırasında alveol gazının zaman eğrisidir: yatay eksen zaman (dakika), dikey eksen parsiyel basınç (kPa); yükselen tek bir PCO₂ doğrusu (0,4–0,8 kPa/dk) ve üç ayrı PO₂ eğrisi (tıkalı hava yolu, açık hava yolu + hava, açık hava yolu + oksijen). 6,7 kPa'ya kırılma noktası çizgisini, 8 kPa'ya hipoksemi çizgisini ekleyin. Ajanlar sorulursa ikinci çizim CO₂ yanıt eğrisidir: yatay eksen PaCO₂ (kPa), dikey eksen dakika ventilasyonu; normal eğriyi 5–10 kPa arasında doğrusal çizin, ajanlı eğriyi daha yatık ve sağda gösterin, yatay eksenle kesiştiği noktayı apneik eşik diye işaretleyin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Hava yolu açıkken %100 oksijen verilen apneik bir hastada neden hipoksi gecikir, karbondioksite ne olur? Preoksijenasyon güvenli apne süresini ne kadar uzatır? Nefes tutma süresi akciğer hacmiyle neden orantılıdır? Orta şiddette egzersizde arteriyel PCO₂ değişmiyorsa ventilasyonu ne artırıyor? Anaerobik eşiğin üstünde arteriyel PCO₂ neden düşer? Apneik eşik nedir, ameliyat sonunda neden önemlidir? Kronik hiperkapnili bir KOAH hastasında volatil ajan hangi dürtüyü zayıflatır? Cevapların hepsi yukarıdaki bölümlerde. [[K2 s. 109–110]] [[K1 s. 94]] [[K1 s. 96]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek22-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Hava solunduktan sonra nefes tutulduğunda alveol gazı birkaç dakikada miks venöz kanla dengeye ulaşır ve PCO₂ dakikada 0,4–0,8 kPa (3–6 mmHg) yükselir; apnede 250 mL/dk oksijen tüketilmeye, 200 mL/dk karbondioksit üretilmeye devam eder. [[K2 s. 109]] [[K1 s. 39]]</li>
    <li>Kan gazlarının seyri hava yolunun açıklığına ve ortam gazına bağlıdır: tıkalı hava yolunda alveoler PO₂ bir dakikada yaklaşık miks venöz düzeye iner; açık hava yolu + oda havasında azot alveolde birikir ve yaklaşık iki dakikada hipoksi gelişir; açık hava yolu + oksijende PO₂ yalnızca PCO₂'nin yükseldiği hızda düşer ve birkaç dakika ciddi hipoksi olmaz. [[K2 s. 109–110]]</li>
    <li>Hava solurken apnede SaO₂ iki dakikada %70'e (PO₂ 5,0 kPa) iner; denitrojenizasyondan sonra depo 3 L'yi aşar, 5 dakikada SaO₂ %100 kalır ve PaCO₂ 10 kPa'ya yaklaşır. Sırtüstü erişkinde oksijenle dolu FRC (≈1800 mL) yaklaşık 8 dakika, hava solurken aynı FRC 1 dakikadan biraz uzun süre verir. [[K1 s. 39]] [[K1 s. 52]]</li>
    <li>Kırılma noktası, soluk alma uyarısının istemli çabayı aştığı noktadır; hava solunduktan sonra PCO₂ ≈ 6,7 kPa'da (50 mmHg) ortaya çıkar, ancak baskın etken PCO₂ değil büyük olasılıkla eşlik eden hipoksidir. Süreyi önceden oksijen solumak, büyük akciğer hacminde başlamak ve hiperventilasyonla preoksijenasyonun birlikteliği uzatır. [[K2 s. 110]] [[K1 s. 95]]</li>
    <li>Egzersizde oksijen tüketimi 250 mL/dk'dan sporcularda 3–4 L/dk'ya, dakika ventilasyonu 120 L/dk'ya çıkar; solunum sistemi rezervi kalp debisinin rezervinden büyüktür (V̇E 20 kat, kalp debisi 5 kat). [[K2 s. 109]] [[K1 s. 181]]</li>
    <li>Egzersizde ventilasyonu neyin kontrol ettiği açık değildir: orta şiddette egzersizde arteriyel PCO₂, PO₂ ve hidrojen iyonu konsantrasyonu anlamlı değişmez (venöz PCO₂ yükselir, venöz PO₂ düşer). Motor korteksten inen uyarılar, eklem ve kas reseptörleri, solunum döngüsü içindeki PCO₂ salınımının algılanması, katekolaminler ve kan sıcaklığı öne sürülen mekanizmalardır. [[K2 s. 109]]</li>
    <li>Ağır egzersizde anaerobik metabolizma laktik asit ve hidrojen iyonu bırakır; periferik kemoreseptör uyarısı ventilasyonu metabolik gereksinimin ötesine taşıyarak arteriyel PCO₂'yi düşürür. Hidrojen iyonu 40 → 46 nmol/L (pH 7,40 → ≈7,34) olduğunda ventilasyon yaklaşık 5 → 15 L/dk yükselir. [[K2 s. 109]] [[K1 s. 182]]</li>
    <li>Volatil ajanlar, barbitüratlar ve opioidler hiperkarbi, hipoksi ve asidoz yanıtını baskılar: CO₂ yanıt eğrisinin eğimi azalır, eğri sağa kayar, apneik eşik yükselir; volatil ajanlar hipoksik yanıtı çok düşük konsantrasyonlarda bile bastırır. Etkiler erken postoperatif döneme uzanır ve hipoksi riskini artırır. Opioidlerin etkisi solunum merkezindedir, doksapram ise periferik kemoreseptörlerde etkir. [[K2 s. 109]] [[K1 s. 96]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="ek22"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/22">← Bölüm 22 · Ventilasyonun kontrolü</a>
    <a href="#/dersler/fizyoloji/23">Sonraki: Bölüm 23 · Pulmoner dolaşım →</a>
  </nav>
</section>`,
};
