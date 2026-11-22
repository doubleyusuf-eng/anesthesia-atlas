/* Fizyoloji Bölüm 14 · Hipoksi ve şantlar (K1 İngilizce baskı s. 63–67). Ders sayfası ve soruları.
   Metinler, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz14.md. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz14-1'] = {
  no: 1, kok: 'Hipoksi ve hipoksemi için:', kagit: 'Paper A · fizyoloji, Bölüm 14', kaynak: '[[K1 s. 63]]',
  onermeler: [
    { t: "Anemik hipokside PaO₂ düşüktür.", d: false, n: "Yanlış. Anemik hipokside PaO₂ normaldir; bozulan, kanın O₂ taşıma kapasitesidir. PaO₂'nin düşük olduğu tip hipoksemik hipoksidir. [[K1 s. 63]]" },
    { t: "Karbonmonoksit zehirlenmesi anemik hipoksiye örnektir.", d: true, n: "Doğru. Kitap anemik hipoksiye ağır anemiyi ve karbonmonoksit zehirlenmesini örnek verir: PaO₂ normal, O₂ taşıma kapasitesi azalmıştır. [[K1 s. 63]]" },
    { t: "Siyanür zehirlenmesi stagnan hipoksiye örnektir.", d: false, n: "Yanlış. Siyanür zehirlenmesi, ağır sepsisle birlikte, sitotoksik hipoksinin örneğidir: PaO₂, taşıma kapasitesi ve O₂ sunumu normaldir, mitokondri O₂'yi kullanamaz. Stagnan hipoksinin örnekleri kardiyojenik şok ve arteriyel emboli sonrası akut ekstremite iskemisidir. [[K1 s. 63]]" },
    { t: "Hipoventilasyon, alveoler PO₂'yi düşürerek hipoksemiye yol açar.", d: true, n: "Doğru. Hipoventilasyonda PaCO₂ yükselir; alveoler gaz denklemine göre PAO₂ düşer, alveol-kapiller bariyer boyunca O₂ gradyanı küçülür ve PaO₂ azalır. [[K1 s. 63]]" },
    { t: "Normal akciğerde alveoler PO₂ ile pulmoner kapiller PO₂, eritrosit kapillerin üçte birini geçmeden dengeye gelir.", d: true, n: "Doğru. Difüzyon kısıtlanmasının nadiren hipoksemi nedeni olmasının nedeni budur; kalınlaşmış bariyer, düşük inspire O₂ basıncı ya da bu durumlar hafifken egzersiz bu payı tüketebilir. [[K1 s. 63–64]]" },
  ],
};
VERI.sorular['fiz14-2'] = {
  no: 2, kok: 'Şantlar için:', kagit: 'Paper A · fizyoloji, Bölüm 14', kaynak: '[[K1 s. 64]]',
  onermeler: [
    { t: "Normal fizyolojik şantın yaklaşık yarısı anatomik, yarısı fonksiyonel şanttır.", d: true, n: "Doğru. Normal fizyolojik şant fraksiyonu %2–5'tir; yaklaşık yarısı anatomik (bronşiyal dolaşım, Thebesius venleri), yarısı fonksiyonel şanttır (akciğer tabanındaki yetersiz ventile alveoller). [[K1 s. 64]]" },
    { t: "Thebesius venleriyle sağ atriyuma boşalan koroner venöz kan anatomik şanta katkıda bulunur.", d: false, n: "Yanlış. Thebesius venleri kalbin dört boşluğuna da boşalır, ama yalnızca sol atriyuma ve sol ventriküle boşalan kan anatomik şanta katılır; sağ boşluklara boşalan kan olağan venöz dönüştür. [[K1 s. 64]]" },
    { t: "Ventriküler septal defektte kan normalde sağdan sola akar.", d: false, n: "Yanlış. Sol ventrikül basıncı normalde sağ ventrikülünkinden yüksek olduğu için akım soldan sağadır. Sağ ventrikül basıncı artarsa (Eisenmenger sendromu, Fallot tetralojisindeki sağ ventrikül çıkış yolu obstrüksiyonu) sağdan sola dönebilir ve patolojik şant olur. [[K1 s. 64]]" },
    { t: "Pulmoner arteriyovenöz malformasyonda kan sağdan sola akar.", d: true, n: "Doğru. Pulmoner arter basıncı pulmoner ven basıncından yüksek olduğu için kan kapillerleri atlayarak sağdan sola geçer: patolojik şant. Karaciğer sirozundaki çok sayıda AVM hepatopulmoner sendroma yol açar. [[K1 s. 64]]" },
    { t: "Patolojik şantların en sık nedeni intrakardiyak şantlardır.", d: false, n: "Yanlış. Patolojik şantların açık ara en sık nedeni intrapulmoner şantlardır: pulmoner ödem ya da pnömonide sıvıyla dolu alveoller, bronş obstrüksiyonu ya da tek akciğer ventilasyonunda proksimal hava yolu tıkanıklığı. [[K1 s. 64]]" },
  ],
};
VERI.sorular['fiz14-3'] = {
  no: 3, kok: 'Şant ve ventilasyon–perfüzyon uyumsuzluğu için:', kagit: 'Paper A · fizyoloji, Bölüm 14', kaynak: '[[K1 s. 65–67]]',
  onermeler: [
    { t: "Şanta bağlı hipoksemide ek O₂ verilmesi PaO₂'yi hiç artırmaz.", d: false, n: "Yanlış. Yanıt zayıftır ama sıfır değildir: şantlanan kan havalanan alveollere hiç uğramasa da ventile alveollerden geçen kanda çözünen az miktardaki ek O₂ PaO₂'yi biraz yükseltir. [[K1 s. 65]]" },
    { t: "V̇/Q̇ oranının 1'den büyük olduğu bölgelerde alveoler ölü boşluk artar.", d: true, n: "Doğru. Perfüzyona göre fazla olan ventilasyonun bir bölümü boşa gider; bu alveoler ölü boşluk artışıdır ve solunum işini artırır. Bu bölgelerden çıkan kanın PaO₂'si normaldir. [[K1 s. 65]]" },
    { t: "Şant varlığında PaCO₂ genellikle normal aralıkta kalır, çünkü alveoler ventilasyon artar.", d: true, n: "Doğru. Şantlanan kan CO₂'sini bırakamaz, ama solunum merkezi PaCO₂'deki her artışa V̇A'yı artırarak yanıt verir. [[K1 s. 65]]" },
    { t: "Şant denkleminde kapiller sonu kanın O₂ içeriği, pulmoner arter kateterinden alınan kan örneğinde ölçülür.", d: false, n: "Yanlış. Kapiller sonu kan doğrudan ölçülemez; satürasyonu %100, PO₂'si PAO₂'ye eşit kabul edilerek tahmin edilir (PAO₂, AGE'den PaCO₂ ile). Pulmoner arter kateteri, CvO₂ için miks venöz kanın kesin kaynağıdır. [[K1 s. 66]]" },
    { t: "Şant fraksiyonu arttıkça FiO₂ artışının PaO₂ üzerindeki etkisi azalır.", d: true, n: "Doğru. Ventile alveolleri atlayan kan verilen ek O₂ ile karşılaşmaz; şant büyüdükçe bu kanın payı artar ve yüksek FiO₂ PaO₂'yi giderek daha az etkiler. [[K1 s. 67]]" },
  ],
};

const D14_NAV = [
  ['d14-hipoksi', 'Hipoksi ve hipoksemi'], ['d14-nedenler', 'Hipokseminin nedenleri'], ['d14-sant', 'Şantlar'],
  ['d14-vq', 'Şant mı, uyumsuzluk mu?'], ['d14-co2', 'Şantta PaCO₂'], ['d14-denklem', 'Şant denklemi'],
  ['d14-fio2', 'Şant ve FiO₂'], ['d14-p1', 'Part I'], ['d14-p2', 'Part II'], ['d14-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/14'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 14', baslik: 'Hipoksi ve şantlar',
  lede: 'Hipoksi ile hipoksemi arasındaki fark, hipoksinin dört tipi ve hipokseminin dört nedeni; ardından şantlar: fizyolojik ve patolojik türleri, V̇/Q̇ uyumsuzluğundan farkı, şant denklemi ve şant büyüdükçe ek oksijenin neden etkisini yitirdiği. [[K1 s. 63–67]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D14_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d14-hipoksi">
  <h2>Hipoksi ve hipoksemi aynı şey değil</h2>
  <p class="intro"><b>Hipoksi</b>, dokuların aerobik metabolizma yapamamasıdır; <b>hipoksemi</b> yalnızca arteriyel O₂ basıncının (PaO₂) düşük olmasıdır ve hipoksinin nedenlerinden biridir. [[K1 s. 63]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Oksijen zinciri: hangi halka koptu?</h3></div>
    <div data-viz="f14_zincir"></div>
    <p class="viz-cap" aria-live="polite">Hücrenin O₂'yi kullanabilmesi için dört halka sağlam olmalıdır: akciğerden çıkan kan yeterince oksijenlenmiş (PaO₂), Hb konsantrasyonu yeterli (taşıma kapasitesi), kalp debisi ve arteriyel akım O₂'yi dokuya ulaştırıyor, mitokondri O₂'yi etkin kullanıyor. Bir tip seçin ya da “Tahmin” kipinde örneklerin hangi halkayı kopardığını bulun. [[K1 s. 63]]</p>
    <p class="viz-foot">Şematik; parçacık akışı nitel, iç eğri yalnız 8 kPa eşiğini gösterir. Koşullar, tipler ve örnekler [[K1 s. 63]]; siyanürde parlak kırmızı venöz kan Bölüm 8'den [[K1 s. 36]].</p>
  </div>
  <div class="blk-body">
    <p>Hipoksi, O₂'nin dokuya ulaştırılamamasından ya da kullanılamamasından doğar; tipi, kopan halkaya göre adlandırılır. Hipoksemik tipte PaO₂ 8 kPa'nın altına inince dissosiyasyon eğrisinin dik bölümüne girilir ve Hb satürasyonu hızla düşer (Bölüm 8, Şekil 8.2). [[K1 s. 63]]</p>
  </div>
  <div class="tbl-wrap" style="margin-bottom:14px">
    <table class="tbl">
      <thead><tr><th>Tip</th><th>Bozulan · normal kalan</th><th>Örnekler</th></tr></thead>
      <tbody>
        <tr><th>Hipoksemik</th><td>PaO₂ düşük</td><td>Dört nedeni aşağıda [[K1 s. 63]]</td></tr>
        <tr><th>Anemik</th><td>O₂ taşıma kapasitesi · PaO₂ normal</td><td>Ağır anemi, karbonmonoksit zehirlenmesi (Bölüm 8) [[K1 s. 63]]</td></tr>
        <tr><th>Stagnan</th><td>Dolaşım yetersiz, dokuya O₂ sunumu azalmış · PaO₂ ve [Hb] normal</td><td>Kardiyojenik şok, arteriyel emboli sonrası akut ekstremite iskemisi [[K1 s. 63]]</td></tr>
        <tr><th>Sitotoksik</th><td>Mitokondri O₂'yi kullanamıyor · PaO₂, taşıma kapasitesi ve O₂ sunumu normal</td><td>Ağır sepsis, siyanür zehirlenmesi [[K1 s. 63]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="note plain"><b>Atlas notu.</b> Kitap, 8 kPa altındaki satürasyon düşüşünün O₂ taşıma kapasitesini azalttığını yazar; kesin terimle azalan, kanın O₂ <b>içeriğidir</b>. Taşıma kapasitesi (1,34 × O₂ bağlayabilen Hb) yalnız anemik tipte düşer; hipoksemik tipi anemikten ayıran budur.</div>
</section>

<section class="wrap blk ders-sec" id="d14-nedenler">
  <h2>Hipokseminin dört nedeni</h2>
  <p class="intro">PaO₂'yi düşüren dört neden vardır: hipoventilasyon, difüzyon kısıtlanması, şant ve V̇/Q̇ uyumsuzluğu; ilk ikisi kendi bölümlerinde işlenir, son ikisi bu bölümün konusudur. [[K1 s. 63]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Dört neden, dört akciğer birimi</h3></div>
    <div data-viz="f14_nedenler"></div>
    <p class="viz-cap" aria-live="polite">Her panel bir alveol ve altındaki kapilleri gösterir; kapillerden çıkan kanın rengi ne kadar oksijenlendiğini anlatır. Difüzyon panelindeki eğri, kapiller PO₂'nin normalde kapillerin ilk üçte birinde PAO₂'ye ulaştığını gösterir. [[K1 s. 63–65]]</p>
    <p class="viz-foot">Şematik; kalınlıklar ve renk yoğunlukları nitel karşılaştırma içindir. Nedenler ve koşullar kitaptandır [[K1 s. 63–65]].</p>
  </div>
  <div class="blk-body">
    <p><b>Hipoventilasyon</b> (Bölüm 18): V̇A ile PaCO₂ ters orantılıdır (Bölüm 11), bu yüzden PaCO₂ yükselir. Alveoler gaz denklemine (AGE) göre PAO₂ düşer, bariyer boyunca O₂ gradyanı küçülür ve PaO₂ düşer. [[K1 s. 63]]</p>
    <p><b>Difüzyon kısıtlanması</b> (Bölüm 10) nadir bir nedendir, çünkü denge eritrosit kapillerin üçte birini geçmeden kurulur. Hipoksemi ancak bariyer kalınlaşınca (pulmoner fibrozis, ağır pulmoner ödem), inspire O₂ basıncı düşünce (yüksek irtifa; irtifa pulmoner ödem de yapabilir, Bölüm 87) ya da bunlar hafifken egzersizde ortaya çıkar. [[K1 s. 63–64]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d14-sant">
  <h2>Şant: fizyolojik ve patolojik</h2>
  <p class="intro"><b>Şant</b>, kanın gaz değişimine katılmadan kalbin sağından soluna geçmesidir: deoksijenize venöz kan arteriyel kana karışır ve PaO₂'yi düşürür. [[K1 s. 64]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Şant haritası: kan nerede gaz değişimini atlar?</h3></div>
    <div data-viz="f14_harita"></div>
    <p class="viz-cap" aria-live="polite">Bir şant yerine dokunun. 1–3 her sağlıklı insanda bulunan fizyolojik şantlardır; 4–7 patolojik şantlardır ve yerlerine göre sınıflanır. VSD ve PDA'da basıncı değiştirip akımın yönünü çevirin. [[K1 s. 64]]</p>
    <p class="viz-foot">Şematik; boşlukların, damarların boyutu ve akım miktarları ölçekli değildir. Şant yerleri, akım yönleri ve örnekler kitaptandır [[K1 s. 64]].</p>
  </div>
  <div class="blk-body">
    <p><b>Fizyolojik şant</b> normalde kalp debisinin %2–5'idir; yaklaşık yarısı anatomik, yarısı fonksiyoneldir. Anatomik şantın iki kaynağı vardır: büyük hava yollarının venöz kanının çoğu bronşiyal dolaşımdan doğrudan pulmoner venlere boşalır; koroner venöz kanın küçük bir bölümü Thebesius venleriyle kalbin dört boşluğuna açılır ve yalnız sol atriyum ile sol ventriküle (LV) boşalan kısmı şanttır. Fonksiyonel şant, akciğer tabanındaki yetersiz ventile alveollerden geçip tam oksijenlenmeyen kandır (yerel V̇/Q̇ uyumsuzluğu, Bölüm 15). [[K1 s. 64]]</p>
    <p>Fizyolojik şant, fizyolojik ölü boşluğun kan tarafındaki karşılığıdır: anatomik ölü boşluğa anatomik şant, alveoler ölü boşluğa fonksiyonel şant denk düşer. <b>Patolojik şant</b> yerine göre sınıflanır; kalp içi ve büyük damar bağlantılarında yönü iki taraf arasındaki basınç belirler. [[K1 s. 64]]</p>
  </div>
  <div class="tbl-wrap" style="margin-bottom:14px">
    <table class="tbl">
      <thead><tr><th>Yer</th><th>Örnek</th><th>Akımın yönü</th></tr></thead>
      <tbody>
        <tr><th>İntrakardiyak</th><td>Ventriküler septal defekt (VSD)</td><td>Normalde soldan sağa (LV basıncı sağ ventrikülden yüksek). Sağ ventrikül basıncı artarsa (Eisenmenger sendromu; Fallot tetralojisinde sağ ventrikül çıkış yolu obstrüksiyonu) sağdan sola: patolojik şant [[K1 s. 64]]</td></tr>
        <tr><th>Büyük damar</th><td>Pulmoner arteriyovenöz malformasyon (AVM): pulmoner arter → pulmoner ven</td><td>Hep sağdan sola (pulmoner arter basıncı pulmoner venden yüksek). Doğumsal ya da edinsel; sirozdaki çok sayıda AVM hepatopulmoner sendroma yol açar [[K1 s. 64]]</td></tr>
        <tr><th>Büyük damar</th><td>Patent duktus arteriyozus (PDA): pulmoner arter ↔ aort</td><td>Genellikle soldan sağa (aort basıncı yüksek). Pulmoner arteriyel hipertansiyonda, ör. yenidoğanda hipoksik pulmoner vazokonstriksiyonla, sağdan sola dönebilir [[K1 s. 64]]</td></tr>
        <tr><th>Büyük damar · iyatrojenik</th><td>Blalock–Taussig şantı (Fallot palyasyonu)</td><td>VSD'deki gibi basınç farkına bağlı [[K1 s. 64]]</td></tr>
        <tr><th>İntrapulmoner · açık ara en sık</th><td>Perfüze ama gaz değişimine katılamayan alveol</td><td>Alveol sıvıyla dolu (pulmoner ödem, pnömoni) ya da proksimal hava yolu tıkalı (bronş obstrüksiyonu, tek akciğer ventilasyonu) [[K1 s. 64]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="note plain"><b>Atlas notu.</b> Hilusa yakın büyük bronşların venöz kanı aslında azigos sistemine, yani sağ kalbe döner; şanta katılan, akciğer içi hava yollarının pulmoner venlere boşalan kanıdır. Hepatopulmoner sendromun temel lezyonu da ayrık AVM'lerden çok yaygın intrapulmoner damar genişlemesidir; Blalock–Taussig şantında kan subklavyen arterden pulmoner artere, soldan sağa akar.</div>
</section>

<section class="wrap blk ders-sec" id="d14-vq">
  <h2>Şant mı, ventilasyon–perfüzyon uyumsuzluğu mu?</h2>
  <p class="intro">Şantı ventilasyon–perfüzyon (V̇/Q̇) uyumsuzluğundan ayıran, ek oksijene verilen yanıttır. [[K1 s. 65]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Oksijen testi: birimden çıkan kan düzeliyor mu?</h3></div>
    <div data-viz="f14_vq"></div>
    <p class="viz-cap" aria-live="polite">Bir akciğer birimi seçin, sonra FiO₂'yi artırın. V̇/Q̇ &lt; 1 olan birimde alveoler O₂ yükselir ve çıkan kan düzelir; şantta (V̇/Q̇ = 0) alveole gaz girmediği için çıkan kan değişmez. [[K1 s. 65]]</p>
    <p class="viz-foot">Şematik: tek bir akciğer birimi; renk yoğunlukları ve ok kalınlıkları nitel karşılaştırma içindir. Yanıt örüntüleri kitaptandır [[K1 s. 65]].</p>
  </div>
  <div class="blk-body">
    <p>İdealde bir bölgenin ventilasyonu (V̇, L/dk) perfüzyonuna (Q̇, L/dk) yaklaşık eşittir ve V̇/Q̇ = 1'dir. <b>V̇/Q̇ &gt; 1</b> olan bölgede gaz değişimi olur, PaO₂ normaldir; ama fazla ventilasyonun bir bölümü boşa gider: alveoler ölü boşluk ve solunum işi artar. <b>V̇/Q̇ &lt; 1</b> olan bölgede kanın bir bölümü ventile olmayan alveollerden geçer; venöz kan arteriyel dolaşıma karışır (<b>venöz karışım</b>, venous admixture), PaO₂ düşer ve arteriyel kan desatüre olur. [[K1 s. 65]]</p>
  </div>
  <div class="tbl-wrap" style="margin-bottom:14px">
    <table class="tbl">
      <thead><tr><th>Neden</th><th>O₂'ye yanıt</th><th>Neden böyle?</th></tr></thead>
      <tbody>
        <tr><th>Patolojik şant</th><td>Zayıf</td><td>Şantlanan kan tanımı gereği havalanan alveolleri atlar. PaO₂'deki küçük artış, kanda çözünen az miktardaki ek O₂'den gelir. [[K1 s. 65]]</td></tr>
        <tr><th>Hafif uyumsuzluk</th><td>Var</td><td>FiO₂ artınca AGE'ye göre PAO₂ yükselir; yetersiz ventile alveolde difüzyon için daha çok O₂ olur ve PaO₂ artar. [[K1 s. 65]]</td></tr>
        <tr><th>Büyük uyumsuzluk <span class="num">(V̇/Q̇ → 0)</span></th><td>Zayıf</td><td>Sağdan sola şant gibi davranır. Fark büyük ölçüde akademiktir: klinikte ikisi de O₂ tedavisine yanıt vermez. [[K1 s. 65]]</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d14-co2">
  <h2>Şantta PaCO₂ neden yükselmez?</h2>
  <p class="intro">Şant PaO₂'yi düşürür ama PaCO₂ genellikle normal kalır; bunun bedeli artmış alveoler ventilasyondur (V̇A). [[K1 s. 65]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Solunum merkezi şantın CO₂'sini telafi eder</h3></div>
    <div data-viz="f14_co2"></div>
    <p class="viz-cap" aria-live="polite">(1) Şantlanan kan CO₂'sini bırakmadan arteriyel kana karışır ve (2) PaCO₂'yi yükseltme eğilimine girer. (3) Solunum merkezi V̇A'yı artırır; (4) ventile alveollerden daha çok CO₂ atılır ve PaCO₂ normal kalır. [[K1 s. 65]]</p>
    <p class="viz-foot">Şematik; akım ve ventilasyon miktarları ölçekli değildir. Mekanizma kitaptandır [[K1 s. 65]].</p>
  </div>
  <div class="blk-body">
    <p>PaCO₂ iki hıza bağlıdır: metabolizma hızının belirlediği CO₂ üretimi ve V̇A'ya bağlı CO₂ atılımı. Şantta CO₂ şantlanan kandan difüze olamaz, ama solunum merkezi PaCO₂'deki her artışa V̇A'yı artırarak yanıt verir (Bölüm 22). [[K1 s. 65]]</p>
  </div>
  <div class="note plain"><b>Atlas notu.</b> Aynı telafi O₂ için işlemez: CO₂ ayrışma eğrisi fizyolojik aralıkta neredeyse doğrusal olduğundan fazla ventilasyon ventile kanın PCO₂'sini düşürüp şantın fazlasını dengeler. Oksihemoglobin eğrisinin üstü ise düzdür; ventile alveollerden çıkan kan zaten neredeyse tam satüredir ve fazla ventilasyon ona çok az O₂ ekler.</div>
</section>

<section class="wrap blk ders-sec" id="d14-denklem">
  <h2>Şant denklemi</h2>
  <p class="intro">Şant denklemi, kalp debisinin venöz sistemden arteriyel sisteme şantlanan oranını (<b>şant fraksiyonu</b>) üç kanın O₂ içeriğinden hesaplar. [[K1 s. 65]]</p>
  <div class="card" style="margin-bottom:14px;text-align:center"><span class="tag gold">Temel denklem</span><p style="margin-top:10px;font-size:21px"><b>Q̇S / Q̇T = (CcO₂ − CaO₂) / (CcO₂ − CvO₂)</b></p><p class="small muted" style="margin-top:6px">Q̇S şanttan geçen, Q̇T toplam akım yani kalp debisi (L/dk); CcO₂, CaO₂, CvO₂ kapiller sonu, arteriyel ve miks venöz kanın O₂ içeriği (mL O₂/100 mL kan). [[K1 s. 65]]</p></div>
  <div class="viz">
    <div class="viz-head"><h3>Şant denklemi: türetin ve hesaplayın</h3></div>
    <div data-viz="f14_denklem"></div>
    <p class="viz-cap" aria-live="polite">Türetme kipinde denklemi iki kanallı şema üzerinde adım adım kurun: önce akımlar, sonra her kanalın taşıdığı O₂, sonra kütle dengesi. Hesap kipinde kitabın örneğiyle başlayın ve girdileri değiştirin. [[K1 s. 65–67]]</p>
    <p class="viz-foot">Denklemler, kabuller ve örnek değerler kitaptandır [[K1 s. 65–66]]. PAO₂, alveoler gaz denkleminden PB 101 kPa, su buharı basıncı 6,3 kPa ve R 0,8 ile hesaplanır [[K1 s. 66]].</p>
  </div>
  <div class="blk-body">
    <p><b>Türetme</b> O₂ dengesine dayanır: Q̇T'nin Q̇S kadarı ventile olmayan alveollerden CvO₂ ile, Q̇T − Q̇S kadarı ventile alveollerden CcO₂ ile geçer ve pulmoner vendeki O₂ ikisinin toplamıdır: Q̇T × CaO₂ = (Q̇T − Q̇S) × CcO₂ + Q̇S × CvO₂. Parantez açılıp Q̇S'li terimler bir yana toplanınca Q̇S (CcO₂ − CvO₂) = Q̇T (CcO₂ − CaO₂) çıkar; iki yan Q̇T (CcO₂ − CvO₂) ile bölünür. [[K1 s. 66–67]]</p>
  </div>
  <div class="tbl-wrap" style="margin-bottom:14px">
    <table class="tbl">
      <thead><tr><th>İçerik</th><th>Hesap</th><th>Nereden?</th></tr></thead>
      <tbody>
        <tr><th>CaO₂</th><td>[Hb] × 1,34 × SaO₂ + PaO₂ × 0,023</td><td>Periferik arteriyel kan gazı (O₂ içerik denklemi, Bölüm 8) [[K1 s. 65]]</td></tr>
        <tr><th>CvO₂</th><td>[Hb] × 1,34 × SvO₂ + PvO₂ × 0,023</td><td>Santral venöz kateter; miks venöz kan için kesin olarak pulmoner arter kateteri. SvO₂ ve PvO₂ venöz satürasyon ve O₂ basıncıdır [[K1 s. 65–66]]</td></tr>
        <tr><th>CcO₂</th><td>[Hb] × 1,34 × %100 + PAO₂ × 0,023</td><td>Ölçülemez: kan alveolden yeni çıktığı için satürasyon %100, PO₂ = PAO₂ kabul edilir; PAO₂, AGE'den PaCO₂ ile hesaplanır (Bölüm 18) [[K1 s. 66]]</td></tr>
      </tbody>
    </table>
  </div>
  <p style="max-width:80ch;margin-bottom:10px">Böylece şant fraksiyonu arteriyel ve santral venöz kan gazı ile Hb konsantrasyonundan hesaplanır. <b>Kitaptaki örnek:</b> [Hb] 15 g/dL; PaO₂ 13,0 kPa, SaO₂ %99; PvO₂ 5,3 kPa, venöz satürasyon %75; PaCO₂ 5,3 kPa; PB 101 kPa, suyun doymuş buhar basıncı 6,3 kPa, solunum katsayısı R 0,8; oda havası (FiO₂ 0,21). [[K1 s. 66]]</p>
  <div class="tbl-wrap" style="margin-bottom:14px">
    <table class="tbl">
      <thead><tr><th>Adım</th><th>Hesap ve sonuç</th></tr></thead>
      <tbody>
        <tr><th>CaO₂</th><td>15 × 1,34 × 0,99 + 13,0 × 0,023 = <b>20,2 mL/100 mL</b></td></tr>
        <tr><th>CvO₂</th><td>15 × 1,34 × 0,75 + 5,3 × 0,023 = <b>15,2 mL/100 mL</b></td></tr>
        <tr><th>PAO₂ (AGE)</th><td>0,21 × (101 − 6,3) − 5,3 / 0,8 = <b>13,3 kPa</b></td></tr>
        <tr><th>CcO₂</th><td>15 × 1,34 × 1,00 + 13,3 × 0,023 = <b>20,4 mL/100 mL</b></td></tr>
        <tr><th>Şant fraksiyonu</th><td>(20,4 − 20,2) / (20,4 − 15,2) × 100 = <b>≈ %4</b>: sağlıklı akciğer için oldukça tipik [[K1 s. 66]]</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d14-fio2">
  <h2>Şant büyüdükçe oksijen etkisini yitirir</h2>
  <p class="intro">Şant fraksiyonu arttıkça FiO₂ artışının PaO₂'yi yükseltme gücü giderek azalır. [[K1 s. 67]]</p>
  <div class="viz">
    <div class="viz-head"><h3>İzo-şant çizgileri: FiO₂ artışı PaO₂'yi ne kadar yükseltir?</h3></div>
    <div data-viz="f14_izosant"></div>
    <p class="viz-cap" aria-live="polite">Şant fraksiyonunu ve FiO₂'yi değiştirin. Şant yokken PaO₂, PAO₂ ile birlikte yükselir; şant büyüdükçe çizgiler yatıklaşır ve yüksek şantta %100 O₂ bile PaO₂'yi çok az artırır. [[K1 s. 67]]</p>
    <p class="viz-foot">Model: PAO₂ = FiO₂ × (101 − 6,3) − 5,3 / 0,8; [Hb] 15 g/dL; kapiller sonu PO₂ = PAO₂; arteriyel–miks venöz O₂ içerik farkı 5,0 mL/100 mL sabit (kitap örneğindeki 20,2 − 15,2) [[K1 s. 66]]. Satürasyon Hill denklemiyle (n = 2,7; P50 3,5 kPa) yaklaştırılır [[K1 s. 32]]. Yalnız gerçek şant modellenir; değerler şematiktir ve kitabın Şekil 14.2'sindeki örüntüyü verir [[K1 s. 67]].</p>
  </div>
  <div class="blk-body">
    <p>FiO₂ artınca AGE'ye göre PAO₂ yükselir, alveol-kapiller bariyer boyunca O₂ gradyanı büyür ve daha hızlı difüzyon PaO₂'yi artırır. Ventile alveolleri atlayan kan ise verilen ek O₂ ile hiç karşılaşmaz; şant büyüdükçe bu kanın payı artar (kitabın Şekil 14.2'si). [[K1 s. 67]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d14-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok tanımlar, sınıflamalar ve yönler üzerinden sorulur: dört hipoksi tipi ve örnekleri, hipokseminin dört nedeni, fizyolojik şantın bileşenleri ve %2–5'lik payı, VSD, PDA ve pulmoner AVM'de akımın yönü, patolojik şantın en sık nedeni, şant ile V̇/Q̇ uyumsuzluğunun oksijene yanıtı, şantta PaCO₂ ve şant denkleminin değişkenleri. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz14-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz14-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz14-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d14-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Şant nedir? Şantları sınıflandırın, şant denklemini türetin ve şantı olan bir hastada oksijen vermenin PaO₂'ye etkisini açıklayın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Çerçeveyle başlayın.</b> Hipoksi (dokular aerobik metabolizma yapamıyor) ile hipoksemi (PaO₂ düşük) farkı; dört hipoksi tipi: hipoksemik, anemik, stagnan, sitotoksik. Şant, hipokseminin dört nedeninden biridir (hipoventilasyon, difüzyon kısıtlanması, şant, V̇/Q̇ uyumsuzluğu). [[K1 s. 63]]</li>
    <li><b>Tanım.</b> Kanın gaz değişimine katılmadan kalbin sağından soluna geçmesi; deoksijenize kan arteriyel kanla karışır ve PaO₂'yi düşürür. [[K1 s. 64]]</li>
    <li><b>Fizyolojik şant.</b> Anatomik (bronşiyal dolaşım; sol atriyum ve ventriküle açılan Thebesius venleri) ve fonksiyonel (akciğer tabanında yetersiz ventile alveoller); toplam %2–5, yaklaşık yarı yarıya. Fizyolojik ölü boşlukla benzetme. [[K1 s. 64]]</li>
    <li><b>Patolojik şant, yerine göre.</b> İntrakardiyak (VSD; Eisenmenger ve Fallot'ta sağdan sola), büyük damarlar (pulmoner AVM hep sağdan sola, sirozda hepatopulmoner sendrom; PDA normalde soldan sağa, pulmoner hipertansiyonda dönebilir; Blalock–Taussig), intrapulmoner (en sık: pulmoner ödem, pnömoni, bronş obstrüksiyonu, tek akciğer ventilasyonu). [[K1 s. 64]]</li>
    <li><b>Şant denklemini çizip türetin.</b> İki kanallı şema: Q̇T − Q̇S ventile alveollerden (CcO₂), Q̇S şanttan (CvO₂). Q̇T × CaO₂ = (Q̇T − Q̇S) × CcO₂ + Q̇S × CvO₂ → Q̇S/Q̇T = (CcO₂ − CaO₂)/(CcO₂ − CvO₂). CcO₂ için %100 satürasyon ve PAO₂ (AGE); CvO₂ için ideal olarak pulmoner arter örneği. Sağlıklı akciğerde ≈ %4. [[K1 s. 65–67]]</li>
    <li><b>Oksijene yanıt.</b> FiO₂ artışı PAO₂'yi yükseltir ama şantlanan kan bu O₂ ile karşılaşmaz; şant büyüdükçe FiO₂'nin etkisi azalır (izo-şant çizgileri). Hafif V̇/Q̇ uyumsuzluğu ise O₂'ye yanıt verir; V̇/Q̇ sıfıra yaklaşınca şant gibi davranır. [[K1 s. 65, 67]]</li>
    <li><b>PaCO₂ ile bitirin.</b> Şantta PaCO₂ genellikle normaldir, çünkü solunum merkezi V̇A'yı artırır. [[K1 s. 65]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada iki çizim verimlidir: önce pulmoner arterden ayrılıp pulmoner vende birleşen iki kanallı şant şeması (akımları ve O₂ içeriklerini her kanalın üstüne yazın), sonra FiO₂–PaO₂ eksenlerinde birkaç izo-şant çizgisi (şant büyüdükçe yatıklaşan çizgiler, oda havası işaretli).</div>
    <div class="note plain"><b>Olası ek sorular.</b> Şantta PaCO₂ neden yükselmez? Thebesius venlerinin hangi bölümü şanttır? VSD'de akım ne zaman sağdan sola döner? Hepatopulmoner sendrom nedir? Kapiller sonu O₂ içeriği neden ölçülemez, nasıl tahmin edilir? Miks venöz kan nereden alınmalıdır? Ağır V̇/Q̇ uyumsuzluğu şanttan nasıl ayrılır? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 63–67]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d14-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Hipoksi: dokular aerobik metabolizma yapamaz; hipoksemi: PaO₂ düşüktür. Dört koşul (PaO₂, taşıma kapasitesi, kalp debisi ve akım, mitokondri) dört tipe karşılık gelir: hipoksemik, anemik (ağır anemi, CO), stagnan (kardiyojenik şok, arteriyel emboli), sitotoksik (ağır sepsis, siyanür). [[K1 s. 63]]</li>
    <li>Hipokseminin dört nedeni: hipoventilasyon (PaCO₂ yükselir, PAO₂ düşer), difüzyon kısıtlanması (nadir; denge kapillerin ilk üçte birinde kurulur; kalın bariyer, irtifa, egzersiz), şant, V̇/Q̇ uyumsuzluğu. [[K1 s. 63–64]]</li>
    <li>Şant: kanın gaz değişimine katılmadan sağdan sola geçmesi. Fizyolojik şant %2–5'tir: yaklaşık yarısı anatomik (bronşiyal dolaşım, sol boşluklara açılan Thebesius venleri), yarısı fonksiyonel (bazal yetersiz ventile alveoller); fizyolojik ölü boşluğun karşılığıdır. [[K1 s. 64]]</li>
    <li>Patolojik şant: intrakardiyak (VSD sağ basınç artınca sağdan sola), büyük damar (pulmoner AVM hep sağdan sola; PDA normalde soldan sağa, pulmoner hipertansiyonda dönebilir) ve en sık olarak intrapulmoner (ödem, pnömoni, bronş obstrüksiyonu, tek akciğer ventilasyonu). [[K1 s. 64]]</li>
    <li>V̇/Q̇ &gt; 1 alveoler ölü boşluğu ve solunum işini artırır; V̇/Q̇ &lt; 1 venöz karışım yapar ve PaO₂'yi düşürür. Hafif V̇/Q̇ uyumsuzluğu O₂'ye yanıt verir; şant ve V̇/Q̇ sıfıra yaklaşan uyumsuzluk zayıf yanıt verir. [[K1 s. 65]]</li>
    <li>Şantta PaCO₂ genellikle normaldir, çünkü solunum merkezi V̇A'yı artırır. [[K1 s. 65]]</li>
    <li>Q̇S/Q̇T = (CcO₂ − CaO₂)/(CcO₂ − CvO₂); CcO₂ için satürasyon %100 ve PO₂ = PAO₂ (AGE) kabul edilir; kitabın örneğinde 20,2, 15,2 ve 20,4 mL/100 mL ile ≈ %4. [[K1 s. 65–67]]</li>
    <li>Şant fraksiyonu arttıkça FiO₂ artışının PaO₂ üzerindeki etkisi azalır; yüksek şantta %100 O₂ bile PaO₂'yi çok az yükseltir. [[K1 s. 67]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="14"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/13">← Bölüm 13 · Spirometri</a>
    <a href="#/dersler/fizyoloji/15">Sonraki: Bölüm 15 · Ventilasyon–perfüzyon ilişkileri →</a>
  </nav>
</section>`,
};
