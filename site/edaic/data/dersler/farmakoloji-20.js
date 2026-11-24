/* Farmakoloji · Bölüm 20: Bağırsak üzerine etkili ilaçlar (K3 s. 306–312, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far20-1'] = {
  no: 1, kok: 'Antasitler ve H₂ reseptör antagonistleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 306–308]]',
  onermeler: [
    { t: 'Sezaryen öncesi kullanılan 30 mL 0,3 M sodyum sitratın etki süresi sınırlı olduğundan cerrahiye 10 dakikadan az süre kala verilmelidir.', d: true, n: 'Doğru. Gastrik asiditeyi azaltmak için sıklıkla ranitidinle birlikte kullanılır ve hızlı etkilidir. [[K3 s. 306]]' },
    { t: 'Alüminyum içeren antasitler diyareye, magnezyum içeren antasitler ise konstipasyona neden olur.', d: false, n: 'Yanlış. Tersi geçerlidir: alüminyum içerenler konstipasyona (ve daha yavaş etkiye), magnezyum içerenler diyareye neden olur. [[K3 s. 306]]' },
    { t: 'Simetidin hepatik sitokrom P450’yi inhibe ederek lidokain, diazepam ve varfarin metabolizmasını yavaşlatır.', d: true, n: 'Doğru. Propranolol, fenitoin, TCA’lar ve aminofilinin metabolizmasını da yavaşlatır. [[K3 s. 307]]' },
    { t: 'Simetidin alt özofagus sfinkter tonusunu belirgin şekilde artırır.', d: false, n: 'Yanlış. Gastrik boşalma süresinde veya alt özofagus sfinkter tonusunda değişiklik olmaz. [[K3 s. 307]]' },
    { t: 'Ranitidin de simetidin gibi belirgin antiandrojenik yan etkilere neden olur.', d: false, n: 'Yanlış. Antiandrojenik etkileri yoktur; jinekomasti, impotans ve sperm sayısında düşüş simetidinin özelliğidir. [[K3 s. 307–308]]' },
  ],
};
VERI.sorular['far20-2'] = {
  no: 2, kok: 'Proton pompası inhibitörleri (omeprazol)', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 308–309]]',
  onermeler: [
    { t: 'Omeprazol gastrik asitte stabil olduğundan koruyucu kaplama olmaksızın midede hızla emilir.', d: false, n: 'Yanlış. Gastrik asitte parçalandığından emilimin ince bağırsakta gerçekleşmesi için enterik kaplı granüller içeren kapsül olarak hazırlanır. [[K3 s. 309]]' },
    { t: 'Omeprazol pariyetal hücre membranındaki K⁺/H⁺ ATPazı geri dönüşümsüz olarak bloke eder.', d: true, n: 'Doğru. Gastrik asit sekresyonunun son ortak yolunu bloke ederek tam aklorhidri sağlar. [[K3 s. 308]]' },
    { t: 'Esomeprazol omeprazolün yalnızca R-enantiomerini içeren saf preparattır.', d: false, n: 'Yanlış. Esomeprazol yalnızca S-enantiomerini içerir; omeprazol ise R- ve S-enantiomerlerinin rasemik karışımıdır. [[K3 s. 308]]' },
    { t: 'CYP2C19*17 ultra hızlı metabolize edenlerde omeprazol tedavisinin etkisiz kalma olasılığı vardır.', d: true, n: 'Doğru. Asyalıların %20’sine kadarında ise yavaş metabolize eden CYP2C19*3 görülür. [[K3 s. 309]]' },
    { t: 'Omeprazol klopidogrelin aktif forma metabolize edilmesini olumsuz etkileyerek antitrombosit etkisini azaltabilir.', d: true, n: 'Doğru. Tüm PPİ’ler arasında en potent CYP2C19 inhibitörüdür. [[K3 s. 309]]' },
  ],
};
VERI.sorular['far20-3'] = {
  no: 3, kok: 'Prokinetikler ve mukoza koruyucular', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 309–311]]',
  onermeler: [
    { t: 'Metoklopramidin gastrik muskarinik reseptörleri uyarması atropin tarafından bloke edilemez.', d: false, n: 'Yanlış. Periferik D₂ antagonizması yanında gastrik muskarinik reseptörleri selektif uyarır ve bu etki atropinle bloke edilebilir. [[K3 s. 309]]' },
    { t: 'Metoklopramid in vitro olarak plazma kolinesteraz aktivitesini artırır.', d: false, n: 'Yanlış. İn vitro olarak plazma kolinesteraz aktivitesini inhibe eder ve bu enzimle metabolize olan ilaçların etkilerini uzatabilir. [[K3 s. 309–310]]' },
    { t: 'Metoklopramid feokromositomalı hastalarda akut hipertansiyona yol açabilir.', d: true, n: 'Doğru. Ayrıca hızlı İV uygulamadan sonra akut ileti bozuklukları gelişebilir. [[K3 s. 309]]' },
    { t: 'Sukralfat doğrudan bağlanma yoluyla siprofloksasin, varfarin, fenitoin ve H₂ antagonistlerinin emilimini azaltabilir.', d: true, n: 'Doğru. Böbrek bozukluğu veya diyaliz hastalarında ise alüminyum emilimi artar. [[K3 s. 310]]' },
    { t: 'Misoprostol uterus tonusunu artırır ve düşüğü tetikleyebilir.', d: true, n: 'Doğru. PGE₁ analoğu olan misoprostolde menoraji ve vajinal kanama da bildirilmiştir. [[K3 s. 310–311]]' },
  ],
};

const A20_NAV = [
  ['antasit', 'Antasitler & Fizyoloji'], ['h2', 'H₂ Antagonistleri'],
  ['ppi', 'PPİ (Omeprazol)'], ['prokinetik', 'Prokinetikler'],
  ['mukoza', 'Mukoza Koruyucular'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/20'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 20', baslik: 'Bağırsak üzerine etkili ilaçlar',
  lede: 'Gastrik asiditeyi nötralize eden antasitler, asit salgısını azaltan H₂ reseptör antagonistleri ile proton pompası inhibitörleri, gastrik motilite ilaçları ve mukoza koruyucular bu bölümde ele alınır. [[K3 s. 306–311]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A20_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a20-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a20-antasit">
  <h2>Antasitler ve gastrik sekresyon fizyolojisi</h2>
  <p class="intro">Pariyetal hücreler gastrin ve ACh ile doğrudan ve parakrin histamin üzerinden uyarılır; başlıca uyarı ise cAMP’yi yükselten histamindir. [[K3 s. 306]]</p>
  <div class="viz"><div class="viz-head"><h3>Pariyetal hücrede asit sekresyonu ve ilaç hedefleri</h3></div><div data-viz="a20_pariyetal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel sekresyon yolları. [[K3 s. 306–308]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag basic">Antasit grupları</span><ul class="ozet" style="margin-top:8px">
      <li>Gastrik asiditeyi nötralize ederek dispepsi ve GÖR belirtilerini hafifletirler; ülser iyileşmesini destekleseler de diğer tedavilerden az etkilidirler. [[K3 s. 306]]</li>
      <li><b>Alüminyum ve magnezyum içerenler.</b> Anlamlı emilmezler ve düşük suda çözünürlükleriyle midede kaldıkları sürece uzun etkilidirler. Alüminyum daha yavaş etkilidir, konstipasyon yapar ve tetrasiklin gibi ilaçlarla kompleks oluşturarak emilimini azaltır; magnezyum ise diyareye neden olur. [[K3 s. 306]]</li>
      <li><b>Sodyum bikarbonat ve sodyum sitrat.</b> Suda çözünürler ve Al/Mg antasitlerden hızlı başlarlar; sistemik emilirler ve aşırı alımda metabolik alkaloza yol açabilirler. Sodyum bikarbonat asitle CO₂ açığa çıkarıp geğirmeye neden olur. [[K3 s. 306]]</li>
      <li><b>Sezaryen öncesi.</b> Gastrik asiditeyi azaltmak için sıklıkla ranitidinle birlikte 30 mL 0,3 M sodyum sitrat kullanılır; etki süresi sınırlı olduğundan cerrahiye 10 dakikadan az süre kala verilmelidir. [[K3 s. 306]]</li>
    </ul></div>
    <div class="card"><span class="tag clin">Gastrik sekresyon fizyolojisi</span><ul class="ozet" style="margin-top:8px">
      <li>Antral mukoza G hücrelerinden salgılanan gastrin ve parasempatik postganglionik liflerden salgılanan ACh, pariyetal hücreyi gastrin ve muskarinik reseptörlerle H⁺ salgılaması için uyarır. [[K3 s. 306]]</li>
      <li>Gastrin ve ACh ayrıca komşu parakrin hücreleri histamin üretip salmaları için uyarır. [[K3 s. 306]]</li>
      <li>Asit sekresyonu için başlıca uyarı histamin reseptörünün aktive edilmesidir; histamin pariyetal hücrede cAMP’yi ve asit sekresyonunu artırır. [[K3 s. 306]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a20-h2">
  <h2>H₂ reseptör antagonistleri</h2>
  <p class="intro">Simetidin ve ranitidin pariyetal hücre H₂ reseptörlerini bloke ederek gastrik pH’ı yükseltir ve sekresyon hacmini azaltır (AÖS ve boşalma değişmez); nizatidin ve famotidin potensleri artmış daha yeni ajanlardır. [[K3 s. 307–308]]</p>
  <div class="viz"><div class="viz-head"><h3>H₂ reseptör antagonistlerinin karşılaştırması</h3></div><div data-viz="a20_h2_kars"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Özellikler ve kinetik sayılar kitaptan. [[K3 s. 307–308]]</p></div>
  <ul class="ozet">
    <li><b>Ortak kullanım.</b> Peptik ülser, reflü özofajiti, Zollinger–Ellison sendromu ve aspirasyon riskinde preoperatif kullanılırlar; aktif hematemezde simetidinin yararlı olduğu gösterilmemiştir. [[K3 s. 307–308]]</li>
    <li><b>Simetidin.</b> İmidazol yapılı tek H₂ antagonistidir. Hızlı İV sonrası bradikardi ve hipotansiyon gelişir. Konfüzyon, halüsinasyon ve nöbet genellikle yalnız böbrek bozukluğu yüksek plazma düzeyine yol açtığında görülür. [[K3 s. 307]] Asit ortamı kalkmış gastrik içeriğin düşük dereceli aspirasyonu, ventile kritik hastalarda nozokomiyal pulmoner enfeksiyonları artırır. Antiandrojenik etkiyle erkeklerde jinekomasti, impotans ve sperm düşüşü yapar; CYP450’yi inhibe ederek lidokain, propranolol, diazepam, fenitoin, TCA’lar, varfarin ve aminofilin metabolizmasını yavaşlatır. Oralde %60’a kadar CYP450 ile metabolize olur. [[K3 s. 307]]</li>
    <li><b>Ranitidin, nizatidin, famotidin.</b> Ranitidin simetidinden potenttir, CYP450’yi inhibe etmediğinden sıklıkla tercih edilir; <i>H. pylori</i> eradikasyonunda antibiyotiklerle ve doğum eyleminde fetüs ya da eylemin ilerlemesi üzerine görünürde zararlı etki olmaksızın yaygın kullanılır. [[K3 s. 307–308]] Hızlı İV’de aritmi yapabilir; kesin kanıt yoksa da porfiride kaçınılmalıdır. Antiandrojenik etkisi yoktur; nadiren trombositopeni, lökopeni, geri dönüşümlü KCFT bozukluğu ve anafilaksi yapar. Nizatidin ve famotidin potensleri artmış, CYP450’yi inhibe etmeyen yeni ajanlardır. [[K3 s. 308]]</li>
  </ul>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Parametre</th><th>Simetidin</th><th>Ranitidin</th></tr></thead>
    <tbody>
      <tr><td>Oral biyoyararlanım</td><td>~%60 (ince bağırsaktan iyi emilim)</td><td>~%50 (iyi emilim, daha fazla ilk geçiş)</td></tr>
      <tr><td>Hepatik metabolizma</td><td>Kısmen (oralde %60’a kadar, CYP450)</td><td>Kısmen</td></tr>
      <tr><td>Proteine bağlanma</td><td>%20</td><td>%15</td></tr>
      <tr><td>CYP450 inhibisyonu</td><td>Var</td><td>Yok</td></tr>
      <tr><td>İdrarla değişmeden atılım</td><td>~%50</td><td>%50</td></tr>
    </tbody>
  </table></div>
  <div class="note plain"><b>Atlas notu.</b> Kitap ranitidini yaygın kullanım içinde anlatır; NDMA safsızlığı kaygıları nedeniyle geçmişte önceki ranitidin ürünleri piyasadan kaldırılmıştır ve ruhsat durumu ülke ile zamana göre değişmektedir.</div>
</section>

<section class="wrap blk ders-sec" id="a20-ppi">
  <h2>Proton pompası inhibitörleri: omeprazol</h2>
  <p class="intro">Bir kiral merkeze sahip omeprazol R/S rasemik karışımı olarak ya da yalnız S-enantiomerini içeren esomeprazol olarak uygulanır. [[K3 s. 308]]</p>
  <div class="viz"><div class="viz-head"><h3>Omeprazolün aktivasyonu, etkisi ve metabolizması</h3></div><div data-viz="a20_ppi"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Metabolik yollar ve oranlar kitaptan. [[K3 s. 308–309]]</p></div>
  <ul class="ozet">
    <li><b>Kullanım ve mekanizma.</b> Ranitidin endikasyonlarına ek olarak H₂ blokajının yetersiz kaldığı durumlarda oral veya İV verilir. K⁺/H⁺ ATPazı geri dönüşümsüz bloke ederek tam aklorhidri sağlar; AÖS tonusu ve gastrik boşalma değişmez. [[K3 s. 308]]</li>
    <li><b>Etkileşimler ve yan etkiler.</b> Sınırlı CYP450 inhibisyonu vardır; varfarin ve fenitoinle yakın izlem önerilse de etkileri nadiren potansiyalize olur, diazepam etkileri artabilir. Döküntü ve GİS rahatsızlık nadirdir. En potent CYP2C19 inhibitörü olarak klopidogrel aktivasyonunu azaltabilir; kitap pantoprazol ve esomeprazolü alternatif sayar. [[K3 s. 308–309]]</li>
    <li><b>Kinetik.</b> Midede parçalandığından enterik kaplı granül kapsüldür; pariyetal hücrede aktifleşen bir ön ilaçtır. CYP2C19 (az ölçüde CYP3A4) ile %80 idrar, %20 safrayla atılan inaktif metabolitlere dönüşür; CYP2C19*17 ultra hızlı (tedavi etkisiz kalabilir) ve CYP2C19*3 yavaş (Asyalıların %20’sine kadar) polimorfizmleri vardır. [[K3 s. 309]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap klopidogrel etkileşiminde alternatif olarak esomeprazolü de sayar; klinik pratikte klopidogrel ile hem omeprazol hem esomeprazolden kaçınılıp pantoprazol tercih edilir.</div>
</section>

<section class="wrap blk ders-sec" id="a20-prokinetik">
  <h2>Gastrik motiliteyi etkileyen ilaçlar</h2>
  <p class="intro">Metoklopramid ve domperidon dopamin antagonistleridir; metoklopramidin santral bulantı–kusma etkileri <a href="#/dersler/farmakoloji/19a">Ders 19a</a>’da işlenmiştir. [[K3 s. 309–310]]</p>
  <div class="viz"><div class="viz-head"><h3>Prokinetikler: metoklopramid ve domperidon</h3></div><div data-viz="a20_motilite"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Etki yerleri ve preparat farkları kitaptan. [[K3 s. 309–310]]</p></div>
  <ul class="ozet">
    <li><b>Metoklopramid mekanizması.</b> Lokal anestezik özelliği olmasa da prokainamidle yapısal benzerlik taşır. Periferik D₂ antagonizması yanında atropinle bloke edilebilen gastrik muskarinik reseptörleri seçici uyarır; AÖS tonusu artar, pilor gevşer, gastrik sekresyon değişmez. [[K3 s. 309]]</li>
    <li><b>Metoklopramid etkileri ve kinetiği.</b> Akinezi ve okülojirik kriz en sık EPS belirtileridir; kitap bunların yalnız yüksek dozda, böbrek bozukluğunda, yaşlı ve gençlerde görüldüğünü yazar ve antikolinerjik prosiklidinle tedavi edilebildiğini ekler. Bir miktar sedasyon yapabilir, antidepresan etkisini artırabilir ve NMS tetikleyebilir. Hızlı İV sonrası akut ileti bozukluğu, feokromositomada akut hipertansiyon gelişir; hiperprolaktinemi/galaktore yapabilir, porfiride kaçınılmalı ve in vitro plazma kolinesteraz inhibisyonuyla bu yoldan yıkılan ilaçları uzatabilir. İyi emilir ancak ilk geçiş değişkenliğiyle oral biyoyararlanım %30–90’dır; İV verilebilir, karaciğerde konjuge edilip değişmemiş ilaçla idrarla atılır. [[K3 s. 309–310]]</li>
    <li><b>Domperidon.</b> KBB’yi geçmediğinden EPS olasılığı daha düşüktür; çocukta kullanımı kemoterapi/radyoterapi kusmasıyla sınırlıdır. Prolaktini artırıp galaktore ve jinekomasti yapabilir; yüksek dozda ciddi aritmilerle İV formu kaldırılmış olup yalnız tablet veya supozituvar bulunur. [[K3 s. 310]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap metoklopramid EPS’sinin yalnız belirli doz ve gruplarda görüldüğünü yazar; olağan erişkin doz aralığında da akut distonik reaksiyonlar ortaya çıkabilir.</div>
</section>

<section class="wrap blk ders-sec" id="a20-mukoza">
  <h2>Mukoza koruyucular ve prostaglandin analogları</h2>
  <p class="intro">Sukralfat lümen bariyeri oluştururken, sentetik PGE₁ analoğu misoprostol hem asit sekresyonunu azaltır hem mukus yapımını artırır. [[K3 s. 310–311]]</p>
  <div class="viz"><div class="viz-head"><h3>Mukoza koruyucular: sukralfat ve misoprostol</h3></div><div data-viz="a20_koruma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Etki profili ve uyarılar kitaptan. [[K3 s. 310–311]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag basic">Sukralfat</span><ul class="ozet" style="margin-top:8px">
      <li>Özellikle ülserli bölgelerde yaygın sitoprotektif bariyer oluşturur; bakteriyostatik etkiler bildirilse de gastrik pH, motilite ve AÖS tonusunu değiştirmez. [[K3 s. 310]]</li>
      <li>Hemen hemen hiç emilmediğinden MSS ve kardiyorespiratuvar sistem üzerinde etkisi yoktur; hafif gastrik rahatsızlık yapabilir. [[K3 s. 310]]</li>
      <li>Böbrek bozukluğu veya diyaliz hastalarında alüminyum emilimi artar; doğrudan bağlanmayla siprofloksasin, varfarin, fenitoin ve H₂ antagonistlerinin emilimini azaltabilir. [[K3 s. 310]]</li>
    </ul></div>
    <div class="card"><span class="tag clin">Misoprostol</span><ul class="ozet" style="margin-top:8px">
      <li>NSAİİ’lerin neden olduğu ülserlerin önlenmesi ve tedavisinde kullanılır; asit sekresyonunu inhibe eder ve mukusu artırır. [[K3 s. 310–311]]</li>
      <li>Uterus tonusunu artırır ve düşüğü tetikleyebilir; menoraji, vajinal kanama ve şiddetli diyare bildirilmiştir. [[K3 s. 311]]</li>
      <li>Normal dozda hipotansiyon olasılığı düşüktür ancak serebrovasküler veya KVS hastalıkta dikkat edilmelidir. GİS’ten hızla emilir; vücuttaki yağ asidi oksitleyen sistemlerle metabolize olur ve kitap böbrek/karaciğer bozukluğunda doz değişikliği gerekmediğini belirtir. [[K3 s. 311]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a20-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far20-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far20-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far20-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a20-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Acil sezaryene alınacak gebe bir hastada aspirasyon riskini azaltmak için hangi farmakolojik yaklaşımlar kullanılabilir? Antasitlerin, H₂ antagonistlerinin, proton pompası inhibitörlerinin ve metoklopramidin etki mekanizmalarını ve önemli yan etkilerini açıklayın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Sodyum sitrat (30 mL 0,3 M) suda çözünür ve hızlı başlar; etki süresi sınırlı olduğundan cerrahinin başlamasına 10 dakikadan az süre kala sıklıkla ranitidinle birlikte verilir; sistemik emildiğinden aşırı alımda metabolik alkaloz yapabilir. [[K3 s. 306]]</li>
    <li>Ranitidin pariyetal hücre H₂ reseptörünü bloke ederek pH’ı yükseltir ve hacmi azaltır; CYP450’yi inhibe etmez ve doğum eyleminde fetüs üzerinde görünürde zararlı etki olmadan kullanılmıştır (simetidin ise lidokain, varfarin gibi birçok ilacın metabolizmasını yavaşlatır ve antiandrojeniktir). [[K3 s. 307–308]]</li>
    <li>Omeprazol pariyetal hücrede aktifleşip K⁺/H⁺ ATPazı geri dönüşümsüz bloke ederek tam aklorhidri sağlar; CYP2C19 inhibisyonuyla klopidogrel aktivasyonunu azaltabilir. [[K3 s. 308–309]]</li>
    <li>H₂ antagonistleri ve PPİ’ler AÖS tonusunu ve gastrik boşalma süresini değiştirmez; buna karşılık metoklopramid periferik D₂ antagonizması ve muskarinik uyarımla AÖS tonusunu artırıp piloru gevşetir. [[K3 s. 307–309]]</li>
    <li>Metoklopramid akinezi, okülojirik kriz (prosiklidinle tedavi edilebilir), hızlı İV ileti bozukluğu, feokromositomada hipertansiyon ve plazma kolinesteraz inhibisyonu riskleri taşır. [[K3 s. 309–310]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Pariyetal hücre şemasını çizin: gastrin ve ACh reseptörleri, komşu parakrin hücreden histamin salınımı, H₂ reseptörü → cAMP ↑ ve son ortak yol K⁺/H⁺ ATPaz üzerinde simetidin/ranitidin ile omeprazolün etki yerleri. [[K3 s. 306–308]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> CYP2C19*17 ve CYP2C19*3 polimorfizmleri omeprazolü nasıl etkiler? Sukralfat ve misoprostolün başlıca uyarıları ve etkileşimleri nelerdir? [[K3 s. 309–311]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a20-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Alüminyum antasitler konstipasyon ve ilaç bağlanması, magnezyum antasitler diyare yapar; 30 mL 0,3 M Na-sitrat cerrahiden &lt;10 dk önce verilir. [[K3 s. 306]]</li>
    <li>Simetidin CYP450’yi inhibe eder ve antiandrojeniktir; ranitidin, nizatidin ve famotidin CYP450’yi inhibe etmez. [[K3 s. 307–308]]</li>
    <li>Omeprazol K⁺/H⁺ ATPazı geri dönüşümsüz bloke eder; enterik kaplı ön ilaçtır ve en potent CYP2C19 inhibitörü olarak klopidogrel aktivasyonunu azaltabilir. [[K3 s. 308–309]]</li>
    <li>Metoklopramid AÖS tonusunu artırıp piloru gevşetir (prosiklidinle düzelen EPS ve feokromositomada hipertansiyon uyarısı); domperidon KBB’yi geçmez. [[K3 s. 309–310]]</li>
    <li>Sukralfat emilmeden bariyer oluşturur (pH/AÖS değişmez, ilaçları bağlar); misoprostol PGE₁ analoğudur (asit ↓, mukus ↑, uterus tonusu ↑). [[K3 s. 310–311]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="20"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/19b">← 19b · Antikolinerjikler, antihistaminikler ve diğer antiemetikler</a><a href="#/dersler/farmakoloji/21a">Sonraki: 21a · Sıvı kompartımanları ve kristalloidler →</a></nav>
</section>`,
};
