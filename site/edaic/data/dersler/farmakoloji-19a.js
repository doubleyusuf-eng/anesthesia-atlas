/* Farmakoloji · Bölüm 19 · Ders 19a: Bulantı-kusma fizyolojisi ve dopamin antagonistleri (K3 s. 295–300, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far19a-1'] = {
  no: 1, kok: 'Bulantı–kusma fizyolojisi ve fenotiyazinler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 295–298]]',
  onermeler: [
    { t: 'Kemoreseptör tetikleme bölgesi (CTZ) işlevsel olarak kan–beyin bariyerinin dışında yer alır.', d: true, n: 'Doğru. Dördüncü ventrikül tabanındaki area postremadadır; D₂ ve 5-HT reseptörlerinden zengindir. [[K3 s. 295]]' },
    { t: 'Kusma merkezi medullada keskin sınırlı, tek ve ayrı bir anatomik çekirdektir.', d: false, n: 'Yanlış. Ayrı bir anatomik yerleşimi yoktur; medulladaki efektör nöronlardan oluşan bir topluluk olarak düşünülebilir. [[K3 s. 295]]' },
    { t: 'Proklorperazin fenotiyazinlerin propilamin alt grubunda yer alır.', d: false, n: 'Yanlış. Propilamin grubunda klorpromazin yer alır; proklorperazin ve perfenazin piperazin, tiyoridazin ise piperidin grubundadır. [[K3 s. 296]]' },
    { t: 'Klorpromazin hipotalamik dopamin blokajıyla prolaktin salınımını artırır.', d: true, n: 'Doğru. Dopamin prolaktin salınımını inhibe eden faktördür; klorpromazin prolaktini artırır ve GH’yi azaltır. [[K3 s. 297]]' },
    { t: 'Klorpromazin yaygın hepatik ilk geçiş metabolizması nedeniyle yaklaşık %30 oral biyoyararlanıma sahiptir.', d: true, n: 'Doğru. GİS’ten emilimi iyidir ancak yaygın ilk geçiş nedeniyle sıklıkla parenteral verilir. [[K3 s. 297]]' },
  ],
};
VERI.sorular['far19a-2'] = {
  no: 2, kok: 'Droperidol ve domperidon', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 298–299]]',
  onermeler: [
    { t: 'Droperidol kan–beyin bariyerini geçemediği için ekstrapiramidal yan etkiye neden olmaz.', d: false, n: 'Yanlış. Ekstrapiramidal etkileri yüksek dozla artar ve uygulamadan >12 saat sonra gelişebilir; KBB’yi geçmeyen domperidondur. [[K3 s. 298–299]]' },
    { t: 'Droperidol periferik α-adrenoseptör blokajı sonucunda hipotansiyona yol açabilir.', d: true, n: 'Doğru. Ayrıca QT uzaması ve VT kaygısı nedeniyle bir süre çekilmiş, düşük doz (0,625–1,25 mg) PONV için BK ruhsatını yeniden almıştır. [[K3 s. 298–299]]' },
    { t: 'Domperidon yalnızca tablet veya supozituvar halinde bulunur; intravenöz preparatı piyasadan çekilmiştir.', d: true, n: 'Doğru. Yüksek dozların uygulanması sırasında ortaya çıkan ciddi aritmilerden sonra İV preparatı piyasadan çekilmiştir. [[K3 s. 299]]' },
    { t: 'Domperidon çocuklarda cerrahi sonrası rutin PONV tedavisinde sınırsız ruhsata sahiptir.', d: false, n: 'Yanlış. Çocuklarda kullanımı kemoterapi veya radyoterapi sonrasındaki bulantı ve kusmayla sınırlıdır. [[K3 s. 299]]' },
    { t: 'Droperidol büyük ölçüde değişmeden idrarla atılır.', d: false, n: 'Yanlış. Karaciğerde yaygın olarak metabolize edilir; yalnızca %1’i değişmemiş ilaç halinde idrarla atılır. [[K3 s. 299]]' },
  ],
};
VERI.sorular['far19a-3'] = {
  no: 3, kok: 'Metoklopramid ve dopamin antagonistlerinin karşılaştırması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 298–300]]',
  onermeler: [
    { t: 'Metoklopramid antiemetik etkisini yalnız CTZ’deki D₂ antagonizmasıyla gösterir ve 5-HT₃ reseptörlerine etki etmez.', d: false, n: 'Yanlış. Başlıca CTZ D₂ antagonizması yanında 5-HT₃ reseptörlerini de bloke eder (antiemetik etkinin bir kısmını açıklayabilir). [[K3 s. 299]]' },
    { t: 'Metoklopramid indüksiyon yerine anestezinin sonunda 20 mg verildiğinde en etkili görünmektedir.', d: true, n: 'Doğru. Klinik çalışmaların yaklaşık yarısında plasebo metoklopramid kadar etkili bulunmuştur. [[K3 s. 299]]' },
    { t: 'Metoklopramide bağlı ekstrapiramidal etkiler yaşlı erkeklerde genç kadınlardan çok daha sıktır.', d: false, n: 'Yanlış. Ekstrapiramidal etkiler genç kadınlarda daha sıktır (5000’de 1) ve 72 saate kadar ortaya çıkabilir. [[K3 s. 299]]' },
    { t: 'Hızlı intravenöz metoklopramid uygulamasından sonra hipotansiyon, taşikardi ve bradikardi bildirilmiştir.', d: true, n: 'Doğru. İM premedikasyon (10–20 mg) sonrası da ara sıra ajitasyon görülür. [[K3 s. 299]]' },
    { t: 'Metoklopramidin oral biyoyararlanımı değişken ilk geçiş metabolizması nedeniyle %30–90 aralığındadır.', d: true, n: 'Doğru. Karaciğerde konjuge edilir ve değişmemiş ilaçla birlikte idrarla atılır. [[K3 s. 299–300]]' },
  ],
};

const A19A_NAV = [
  ['fizyoloji', 'Kusma Fizyolojisi'], ['fenotiyazin', 'Fenotiyazinler'],
  ['butirofenon', 'Droperidol & Domperidon'], ['metoklopramid', 'Metoklopramid'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/19a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 19 · Ders 19a', baslik: 'Bulantı-kusma fizyolojisi ve dopamin antagonistleri',
  lede: 'Postoperatif bulantı ve kusma (PONV) yeni ajanlara karşın tamamen ortadan kaldırılamamıştır; tedavi kusma merkezine ulaşan aferent girdiyi azaltmayı amaçlar ve dopamin antagonistleri kullanılan sınıfların ilkidir. [[K3 s. 295]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A19A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a19a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a19a-fizyoloji">
  <h2>Bulantı–kusma fizyolojisi ve PONV ilkeleri</h2>
  <p class="intro">İlaçlar, hareket hastalığı, korku, gebelik, vestibüler hastalık ve migren kusmaya yol açar; yeni anesteziklerle ve daha agresif tedaviyle insidans azalmıştır. [[K3 s. 295]]</p>
  <div class="viz"><div class="viz-head"><h3>Kusma refleksinin nöral girdi ve çıkışları</h3></div><div data-viz="a19a_refleks"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik; nöral yollar ve reseptör grupları kitaptan. [[K3 s. 295]]</p></div>
  <ul class="ozet">
    <li><b>Merkezi organizasyon.</b> Kusma merkezi (VC) ayrı anatomik yerleşimi olmayan bir medulla efektör nöron topluluğudur; vagus, frenik sinirler ve karın kaslarını innerve eden spinal motor nöronlara projekte olarak kusma refleksini oluşturur. [[K3 s. 295]]</li>
    <li><b>CTZ ve vestibüler girdiler.</b> Dördüncü ventrikül tabanındaki area postremada ve işlevsel olarak KBB dışında yer alan CTZ, D₂ ile 5-HT reseptörlerinden zengindir. Vestibüler aparattan gelen iletimde ACh önemlidir. [[K3 s. 295]]</li>
    <li><b>Anestezik ilkeler.</b> Amaç VC’ye ulaşan aferent girdiyi azaltmaktır; NSAİİ kullanımıyla opioid en aza indirilmeli, gereksiz antikolinesterazdan kaçınılmalı ve opioid sınırlı küçük cerrahide idamede propofol PONV insidansını azaltabilir. [[K3 s. 295]]</li>
    <li><b>Altı antiemetik sınıfı.</b> Dopamin antagonistleri, antikolinerjikler, antihistaminikler, 5-HT₃ antagonistleri, nörokinin (NK) antagonistleri ve diğerleri kullanılır (sonraki beş grup <a href="#/dersler/farmakoloji/19b">19b</a>’dedir). [[K3 s. 295]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a19a-fenotiyazin">
  <h2>Fenotiyazinler: klorpromazin, proklorperazin ve perfenazin</h2>
  <p class="intro">Fenotiyazinler antipsikotik (nöroleptik) ilaçların ana grubudur; kusmada sınırlı rol oynar ve kimyasal yapıya göre propilamin (klorpromazin), piperidin (tiyoridazin) ve piperazin (proklorperazin, perfenazin) olarak üç gruba ayrılırlar. [[K3 s. 296]]</p>
  <div class="viz"><div class="viz-head"><h3>Dopamin antagonistlerinin yan etki profili</h3></div><div data-viz="a19a_etkiler"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Düzeyler (0 / + / ++ / +++) Tablo 19.2’den. [[K3 s. 298]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag basic">Klorpromazin (“Largactil”)</span><ul class="ozet" style="margin-top:8px">
      <li><b>Kullanım.</b> Şizofrenide (RAS’ı aferentlerden yalıtarak sedasyon, dış uyaranlara kayıtsızlık ve azalmış motor aktivite = nörolepsi oluşturduğu düşünülür), terminal bakımda başarısız olunan kusma/ağrıda, PONV önlemede ve ara sıra hıçkırıkta kullanılır. [[K3 s. 296–297]]</li>
      <li><b>Mekanizma.</b> D₂, muskarinik, α₁, α₂, H₁ ve 5-HT reseptörlerini antagonize eder; membran stabilizasyonu ve sempatik NA alım 1 blokajı yapar. [[K3 s. 297]]</li>
      <li><b>Etkiler.</b> Merkezi D₂ blokajıyla ekstrapiramidal etkiler ve nadiren NMS gelişebilir; hipotalamusta GH azalır, prolaktin artar, sıcaklık düzenlenmesi değişip hipotermi olabilir. α blokajıyla vazodilatasyon, hipotansiyon ve ısı kaybı artışı; orta derecede antikolinerjik etki; iştah ve kilo artışı (hareketsizlikle şiddetlenir) görülür. Yeterli bir antiemetik olsa da diğer etkileri bu rolünü sınırlamıştır. [[K3 s. 297]]</li>
      <li><b>Diğer ve kinetik.</b> Temas duyarlanması nedeniyle doğrudan temastan kaçınılmalıdır; kolestatik sarılık, agranülositoz, lökopeni, lökositoz ve hemolitik anemi bildirilmiştir. GİS emilimi iyidir ancak yaygın hepatik ilk geçişle oral biyoyararlanımı ~%30 olduğundan sıklıkla parenteral verilir; çok sayıda metaboliti idrar/safrayla, küçük değişken fraksiyon değişmeden idrarla atılır. [[K3 s. 297]]</li>
    </ul></div>
    <div class="card"><span class="tag clin">Proklorperazin ve perfenazin</span><ul class="ozet" style="margin-top:8px">
      <li><b>Proklorperazin kullanım.</b> PONV ve vertigo önleme/tedavisinde, şizofreni ve diğer psikozlarda etkilidir. [[K3 s. 297]]</li>
      <li><b>Proklorperazin etkiler.</b> Bu sınıfta ekstrapiramidal etkiler daha sıktır (en sık akut distoniler ve akatizi; çocuklar ve genç erişkinler en çok etkilenir). Perioperatif yalnız hafif sedasyon yapar, derlenmeyi uzatabilir ama belirgin değildir. [[K3 s. 297]] Gruba özgü olarak kolestatik sarılık, hematolojik anormallikler, deri duyarlanması, hiperprolaktinemi ve nadiren NMS gelişebilir. [[K3 s. 298]]</li>
      <li><b>Proklorperazin kinetik.</b> Oral emilim düzensiz, yaygın ilk geçiş nedeniyle oral biyoyararlanım çok düşüktür; supozituvar, İV veya İM verilebilir. [[K3 s. 298]]</li>
      <li><b>Perfenazin.</b> Endikasyonları ve kinetiği proklorperazine benzer, PONV’de etkilidir; daha yüksek ekstrapiramidal insidans ve artmış postoperatif sedasyonla ilişkilidir. [[K3 s. 298]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a19a-butirofenon">
  <h2>Butirofenonlar: droperidol ve domperidon</h2>
  <p class="intro">Droperidol anestezide kullanılan tek butirofenon olup KBB’yi geçerken, D₂ antagonisti domperidon KBB’yi geçmediğinden ekstrapiramidal etki riski daha düşüktür. [[K3 s. 298–299]]</p>
  <div class="viz"><div class="viz-head"><h3>Kan–beyin bariyeri geçişi ve ekstrapiramidal risk</h3></div><div data-viz="a19a_kbb"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik; etki yerleri ve zaman aralıkları kitaptan. [[K3 s. 298–299]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag clin">Droperidol</span><ul class="ozet" style="margin-top:8px">
      <li><b>Kullanım ve mekanizma.</b> 0,25–5 mg dozlarda PONV önleme/tedavide (yan etki insidansı dozla artar), nörolept analjezide ve mani kontrolünde kullanılır; CTZ’de merkezi D₂ antagonisti olarak etki eder. [[K3 s. 298]]</li>
      <li><b>Etkiler.</b> Fenotiyazinlerinkine benzer; sedasyon onlara kıyasla daha belirgindir, yeterli doz nörolepsi yapar, hiperprolaktinemi olabilir. Ekstrapiramidal etkilerin gerçek insidansı bilinmez, yüksek dozla artar ve uygulamadan &gt;12 saat sonra gelişebilir; hastaların %25’e varan bölümü 48 saate kadar anksiyete yaşayabilir. Periferik α blokajıyla hipotansiyon olabilir; QT uzaması ve VT kaygısı sonrası artık düşük doz (0,625–1,25 mg) PONV için BK ruhsatını yeniden almıştır. [[K3 s. 298–299]]</li>
      <li><b>Kinetik.</b> İM kolay emilmesine karşın genelde İV verilir; proteine ~%90 bağlanır ve karaciğerde metabolize olup idrarla atılır (%1’i değişmeden). [[K3 s. 299]]</li>
    </ul></div>
    <div class="card"><span class="tag basic">Domperidon</span><ul class="ozet" style="margin-top:8px">
      <li><b>KBB ve kullanım.</b> KBB’yi geçmediğinden ekstrapiramidal etkilere yol açma olasılığı daha düşüktür; çocuklarda kullanımı kemoterapi veya radyoterapi sonrası bulantı-kusmayla sınırlıdır. [[K3 s. 299]]</li>
      <li><b>Etkiler ve preparat.</b> Prolaktin düzeylerini artırarak galaktore ve jinekomasti yapabilir. İV preparatı yüksek dozda ciddi aritmilerden sonra piyasadan çekilmiştir; yalnızca tablet veya supozituvar halinde bulunur. [[K3 s. 299]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a19a-metoklopramid">
  <h2>Benzamidler: metoklopramid</h2>
  <p class="intro">Metoklopramid antiemetik ve prokinetik olarak kullanılır; indüksiyonda değil, anestezinin sonunda 20 mg verildiğinde en etkili gibi görünmektedir. [[K3 s. 299]]</p>
  <div class="viz"><div class="viz-head"><h3>Metoklopramidin zamanlama ve güvenlik profili</h3></div><div data-viz="a19a_meto"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Doz, görülme sıklığı ve kinetik aralıklar kitaptan. [[K3 s. 299–300]]</p></div>
  <ul class="ozet">
    <li><b>Etkinlik ve mekanizma.</b> Çalışmaların yaklaşık yarısı plasebonun metoklopramid kadar etkili olduğunu göstermiştir. Mide üzerindeki prokinetik etkileri (bkz. Bölüm 20) yanında başlıca CTZ’de D₂ antagonizmasıyla etki eder ve 5-HT₃ reseptörlerini de bloke eder. [[K3 s. 299]]</li>
    <li><b>MSS ve KVS etkileri.</b> KBB’yi geçer ve 72 saate kadar ekstrapiramidal etki (genç kadınlarda 5000’de 1) ile nadiren NMS tetikleyebilir; uzun süreli kullanımda sedasyon daha sıktır ve 10–20 mg İM premedikasyon sonrası ara sıra ajitasyon görülür. Hızlı İV sonrası hipotansiyon, taşikardi ve bradikardi bildirilmiştir. [[K3 s. 299]]</li>
    <li><b>Kinetik.</b> GİS’ten iyi emilir, değişken ilk geçişle oral biyoyararlanım %30–90 aralığındadır; İV verilebilir, karaciğerde konjuge edilip değişmemiş ilaçla birlikte idrarla atılır. [[K3 s. 299–300]]</li>
  </ul>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>İlaç</th><th>Oral biyoyararlanım / yol</th><th>Sedasyon</th><th>Antikolinerjik</th><th>Ekstrapiramidal</th></tr></thead>
    <tbody>
      <tr><td><b>Klorpromazin</b></td><td>~%30 [[K3 s. 297]]</td><td>+++</td><td>++</td><td>++ [[K3 s. 298]]</td></tr>
      <tr><td><b>Proklorperazin</b></td><td>Çok düşük [[K3 s. 298]]</td><td>+</td><td>+</td><td>+++ [[K3 s. 298]]</td></tr>
      <tr><td><b>Droperidol</b></td><td>Genelde İV (İM emilimi kolay) [[K3 s. 299]]</td><td>+</td><td>0</td><td>++ [[K3 s. 298]]</td></tr>
      <tr><td><b>Domperidon</b></td><td>Tablet / supozituvar [[K3 s. 299]]</td><td>+</td><td>0</td><td>0 [[K3 s. 298]]</td></tr>
      <tr><td><b>Metoklopramid</b></td><td>%30–90 [[K3 s. 299]]</td><td>+</td><td>0</td><td>++ [[K3 s. 298]]</td></tr>
    </tbody>
  </table></div>
</section>

<section class="wrap blk ders-sec" id="a19a-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far19a-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far19a-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far19a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a19a-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Postoperatif bulantı ve kusmayı önlemek için dopamin antagonistlerinden yararlanmak istiyorsunuz. Kusma refleksinin fizyolojisini ve droperidol, domperidon, proklorperazin ile metoklopramid arasındaki başlıca farkları anlatın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Medulladaki efektör nöron topluluğu olan VC; vagus, frenik sinirler ve karın kasları spinal motor nöronlarıyla kusma refleksini oluşturur; CTZ (KBB dışında, D₂/5-HT) ve vestibüler aparat (ACh) buraya girdi sağlar. [[K3 s. 295]]</li>
    <li>Genel yaklaşım NSAİİ ile opioidleri en aza indirmek, gereksiz antikolinesterazdan kaçınmak ve uygun küçük olgularda propofol kullanmaktır. [[K3 s. 295]]</li>
    <li>Piperazin fenotiyazinlerinde ekstrapiramidal etkiler daha sıktır: proklorperazin +++ (akut distoni, akatizi; en çok çocuklar ve genç erişkinler), perfenazinde insidans daha da yüksektir. [[K3 s. 297–298]]</li>
    <li>Droperidol CTZ D₂ antagonistidir (PONV için düşük doz 0,625–1,25 mg); uygulamadan &gt;12 saat sonra da gelişebilen EPS, 48 saate kadar anksiyete ve QT uzaması kaygısı taşır; domperidon KBB’yi geçmediğinden EPS olasılığı daha düşüktür, İV formu aritmilerle çekilmiştir. [[K3 s. 298–299]]</li>
    <li>Metoklopramid D₂ + 5-HT₃ blokajı yapar ve anestezi sonunda 20 mg verildiğinde en etkili görünür; 72 saate kadar EPS (genç kadınlarda 5000’de 1) ve hızlı İV ile hemodinamik yan etki riski taşır. [[K3 s. 299]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Kusma refleksi şemasını çizin: area postrema’daki CTZ (KBB dışında, D₂ ve 5-HT) ve vestibüler aparat (ACh) → medulladaki kusma merkezi → vagus, frenik ve karın kası spinal motor nöron çıkışları. [[K3 s. 295]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Klorpromazinin prolaktin, ısı ve alfa reseptörleri üzerindeki etkileri nelerdir? Perfenazinin proklorperazinden farkı nedir? [[K3 s. 297–298]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a19a-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Kusma merkezi medullada vagus, frenik ve spinal motor nöronlara projekte olur; KBB dışındaki CTZ (D₂, 5-HT) ve vestibüler aparat (ACh) başlıca girdilerdir. [[K3 s. 295]]</li>
    <li>Klorpromazin çoklu reseptör blokajıyla sedasyon, hipotansiyon, hipotermi ve hiperprolaktinemi yapabilir (~%30 oral biyoyararlanım). [[K3 s. 297]]</li>
    <li>Proklorperazin ve perfenazin yüksek ekstrapiramidal yan etki riski taşır; çocuklarda ve genç erişkinlerde distoni/akatizi sıktır. [[K3 s. 297–298]]</li>
    <li>Droperidol (PONV için düşük doz 0,625–1,25 mg) KBB’yi geçerken, domperidon KBB’yi geçmez ve İV formu aritmiler nedeniyle çekilmiştir. [[K3 s. 298–299]]</li>
    <li>Metoklopramid (D₂ + 5-HT₃ + prokinetik) anestezi sonu 20 mg’da en etkili görünür; 72 saate kadar EPS ve hızlı İV sonrası KVS etkileri yapabilir. [[K3 s. 299]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="19a"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/18c">← 18c · Antikonvülzanlar</a><a href="#/dersler/farmakoloji/19b">Sonraki: 19b · Antikolinerjikler, antihistaminikler ve diğer antiemetikler →</a></nav>
</section>`,
};
