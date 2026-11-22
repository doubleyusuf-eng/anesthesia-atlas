/* Fizyoloji Bölüm 18 · Alveoler gaz denklemi (K1 İngilizce baskı s. 77–79).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz18-1'] = {
  no: 1, kok: 'Basitleştirilmiş alveoler gaz denklemi ve solunum katsayısı için:', kagit: 'Paper A · fizyoloji, Bölüm 18', kaynak: '[[K1 s. 77–78]]',
  onermeler: [
    { t: 'Alveoler O₂ parsiyel basıncı (PAO₂) arter kan gazı analizinde doğrudan ölçülür.', d: false, n: "Yanlış. PAO₂ doğrudan ölçülemez; alveoler gaz denklemiyle kolayca ölçülen değişkenlerden tahmin edilir. Arter kan gazı arteriyel PO₂'yi (PaO₂) ölçer. [[K1 s. 77–78]]" },
    { t: 'Denklemde kullanılan suyun doymuş buhar basıncı vücut sıcaklığında 6,3 kPa’dır.', d: true, n: "Doğru. İnspire edilen hava karinaya ulaştığında su buharıyla tam olarak doymuştur; vücut sıcaklığında bu buharın basıncı 6,3 kPa'dır ve PB'den çıkarılır. [[K1 s. 77]]" },
    { t: 'Yalnız karbonhidratla beslenen bir kişide solunum katsayısı 1,0’dır.', d: true, n: "Doğru. Glukozun aerobik metabolizmasında (C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O) tüketilen her altı O₂ molekülüne karşılık altı CO₂ üretilir: R = 6/6 = 1,0. [[K1 s. 77]]" },
    { t: 'Aynı PaCO₂ için solunum katsayısı yükseldikçe hesaplanan PAO₂ düşer.', d: false, n: "Yanlış. Denklemde çıkarılan terim PaCO₂/R'dir: R yükseldikçe bu terim küçülür ve PAO₂ artar. PaCO₂ 5,3 kPa için R 0,7'de PAO₂ ≈ 12,3 kPa, R 1,0'da ≈ 14,6 kPa çıkar (kitabın denklemiyle hesaplanmıştır). [[K1 s. 77]]" },
    { t: 'Deniz seviyesinde oda havası soluyan, PaCO₂’si 5,3 kPa ve R’si 0,8 olan bir hastada hesaplanan PAO₂ yaklaşık 13,3 kPa’dır.', d: true, n: "Doğru. PAO₂ = %20,93 × (101,325 − 6,3) − 5,3/0,8 = 19,9 − 6,6 ≈ 13,3 kPa. [[K1 s. 78]]" },
  ],
};
VERI.sorular['fiz18-2'] = {
  no: 2, kok: 'Alveoler–arteriyel (A–a) O₂ gradyanı için:', kagit: 'Paper A · fizyoloji, Bölüm 18', kaynak: '[[K1 s. 78]]',
  onermeler: [
    { t: 'Sağlıklı genç bir erişkinde normal A–a gradyanı 1,5 kPa’dan küçüktür.', d: true, n: "Doğru. Normal A–a gradyanı genç, sağlıklı erişkinde <1,5 kPa kabul edilir; yaşla, yaşlanan akciğerde V̇/Q̇ eşleşmesi bozulduğu için artar. [[K1 s. 78]]" },
    { t: 'V̇/Q̇ eşleşmesi kusursuz olan normal bir akciğerde PaO₂, PAO₂’ye eşittir.', d: false, n: "Yanlış. PaO₂ her zaman PAO₂'den düşüktür: V̇/Q̇ eşleşmesi kusursuz olsa bile bronşiyal ve Thebesius venlerinin oluşturduğu küçük bir anatomik şant küçük bir A–a gradyanı yaratır. [[K1 s. 78]]" },
    { t: 'Opioide bağlı solunum depresyonu gibi saf alveoler hipoventilasyon A–a gradyanını artırır.', d: false, n: "Yanlış. Alveoler hipoventilasyonda A–a gradyanı normaldir: denklem alveoler ventilasyonu PaCO₂ üzerinden zaten hesaba katar, PAO₂ ile birlikte PaO₂ de düşer. [[K1 s. 78]]" },
    { t: 'Arızalı bir anestezi cihazından hipoksik gaz karışımı solunması A–a gradyanını artırır.', d: false, n: "Yanlış. Hipoksik karışımlarda A–a gradyanı normaldir: düşük olan inspire O₂'dir, akciğerin O₂ aktarımı bozulmamıştır. [[K1 s. 78]]" },
    { t: 'V̇/Q̇ uyumsuzluğu, artmış A–a gradyanının açık ara en sık nedenidir.', d: true, n: "Doğru. Örnekler pnömoni, ARDS ve atelektazidir. Diğer nedenler sağdan sola şant (pulmoner AVM, intrakardiyak şant) ve ağır difüzyon bozukluğudur (son dönem pulmoner fibrozis). [[K1 s. 78]]" },
  ],
};
VERI.sorular['fiz18-3'] = {
  no: 3, kok: 'Yüksek irtifa, hiperventilasyon ve O₂ verilmesi için:', kagit: 'Paper A · fizyoloji, Bölüm 18', kaynak: '[[K1 s. 77–79]]',
  onermeler: [
    { t: 'Yüksek irtifada solunan havadaki O₂ fraksiyonu deniz seviyesindekinden düşüktür.', d: false, n: "Yanlış. Havadaki O₂ oranı yükseklikte de aynıdır (FiO₂ değişmez); düşen barometrik basınçtır. [[K1 s. 78]]" },
    { t: 'PB’nin 65 kPa olduğu bir yükseklikte PaCO₂ 5,3 kPa’da kalırsa, hesaplanan PAO₂ yaklaşık 5,7 kPa’dır.', d: true, n: "Doğru. PAO₂ = %20,93 × (65 − 6,3) − 5,3/0,8 = 12,3 − 6,6 ≈ 5,7 kPa. Fizyolojik şant PaO₂'yi bunun da altına indirir: belirgin hipoksemi. [[K1 s. 78]]" },
    { t: 'Aynı yükseklikte hiperventilasyonla PaCO₂ 3,0 kPa’ya inerse hesaplanan PAO₂ yaklaşık 8,5 kPa’ya yükselir.', d: true, n: "Doğru. PAO₂ = %20,93 × (65 − 6,3) − 3,0/0,8 = 12,3 − 3,8 ≈ 8,5 kPa. Hiperventilasyon yükseklikte yaşamaya yetecek PAO₂ sağlar. [[K1 s. 78–79]]" },
    { t: 'Yükseklikte süregen hiperventilasyonun bedeli kronik solunumsal alkalozdur.', d: true, n: "Doğru. Hiperventilasyon PAO₂'yi yükseklikte yaşamaya yetecek düzeye çıkarır, ancak kronik solunumsal alkaloz pahasına. [[K1 s. 79]]" },
    { t: 'PAO₂’yi yükseltmede hiperventilasyon, ilave O₂ vermekten çok daha etkilidir.', d: false, n: "Yanlış, tersidir. V̇A ile PaCO₂ arasındaki hiperbolik ilişki nedeniyle yaklaşık 10 L/dk'nın ötesinde V̇A'yı artırmak PaCO₂'yi az düşürür ve PAO₂ platoya ulaşır; O₂ vermek ise PAO₂'yi (ve PaO₂'yi) çok daha fazla artırır. [[K1 s. 79]]" },
  ],
};

const D18_NAV = [
  ['d18-denklem', 'Denklem'], ['d18-uc', 'Üç değişken'], ['d18-rq', 'Solunum katsayısı'], ['d18-aa', 'A–a gradyanı'],
  ['d18-vent', 'Hipoventilasyon ve irtifa'], ['d18-p1', 'Part I'], ['d18-p2', 'Part II'], ['d18-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/18'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 18', baslik: 'Alveoler gaz denklemi',
  lede: 'Alveoldeki O₂ basıncı doğrudan ölçülemez; alveoler gaz denklemi onu kolayca ölçülen değerlerden tahmin eder. Bu bölüm denklemi ve terimlerini, solunum katsayısını, A–a gradyanıyla hipokseminin ayırıcı tanısını, hipoventilasyonu, irtifaya uyumu ve hiperventilasyonun sınırını işler. [[K1 s. 77–79]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D18_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d18-denklem">
  <h2>PAO₂ ölçülemez, hesaplanır: alveoler gaz denklemi</h2>
  <p class="intro">Alveoler O₂ parsiyel basıncı (PAO₂) doğrudan ölçülemez; <b>alveoler gaz denklemi</b> (alveolar gas equation, AGE) onu kolayca ölçülen değişkenlerden tahmin eder. [[K1 s. 77]]</p>
  <div class="card basic f18-denklem" role="img" aria-label="PAO₂ eşittir FiO₂ çarpı PB eksi PSVP su, eksi PaCO₂ bölü R" style="margin-bottom:14px">
    <span class="tag basic">Temel denklem · basitleştirilmiş AGE</span>
    <p style="margin-top:10px;font:700 clamp(18px,2.4vw,24px)/1.3 var(--f-mono)">PAO₂ = FiO₂ × (PB − PSVP su) − PaCO₂ / R</p>
  </div>
  <div class="viz">
    <div class="viz-head"><h3>Denklemi basamak basamak çözün</h3></div>
    <div data-viz="f18_basamak"></div>
    <p class="viz-cap" aria-live="polite">Barometrik basınçtan başlayın: su buharının payı düşülür, O₂ fraksiyonu alınır, PaCO₂/R çıkarılır. Kitabın dört çözümlü örneği arasında geçebilirsiniz. [[K1 s. 77–78]]</p>
    <p class="viz-foot">Değerler kitaptandır [[K1 s. 77–78]]; PIO₂ ara değeri Bölüm 19'dandır [[K1 s. 80]]. Çubuklar basınçla orantılıdır; O₂ kısmı büyütülmüş ölçekte gösterilir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Terim</th><th>Anlamı</th><th class="num">Değer</th></tr></thead>
      <tbody>
        <tr><th>FiO₂</th><td>İnspire O₂ fraksiyonu, kuru hava [[K1 s. 77]]</td><td class="num">%20,93</td></tr>
        <tr><th>PB</th><td>Barometrik basınç, deniz seviyesi [[K1 s. 77]]</td><td class="num">101,325 kPa</td></tr>
        <tr><th>PSVP su</th><td>Suyun doymuş buhar basıncı, vücut sıcaklığı [[K1 s. 77]]</td><td class="num">6,3 kPa</td></tr>
        <tr><th>PaCO₂</th><td>Arteriyel CO₂ parsiyel basıncı (kPa), tipik hasta [[K1 s. 77–78]]</td><td class="num">5,3 kPa</td></tr>
        <tr><th>R</th><td>Solunum katsayısı (respiratory quotient) [[K1 s. 77]]</td><td class="num">genellikle 0,8</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>İnspire hava karinaya ulaştığında su buharıyla tam doymuştur; O₂ fraksiyonu bu yüzden su buharı payı düşülmüş basınca uygulanır. İlk terim karinadaki nemlenmiş gazın PO₂'sidir (PIO₂; deniz seviyesinde 19,9 kPa). [[K1 s. 77, 80]] Oda havası soluyan, normal beslenen tipik hastada: PAO₂ = 19,9 − 5,3/0,8 = <b>13,3 kPa</b> (≈100 mmHg). [[K1 s. 78]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d18-uc">
  <h2>PAO₂'yi belirleyen üç değişken</h2>
  <p class="intro">AGE'ye göre PAO₂ esas olarak üç değişkene bağlıdır: FiO₂, barometrik basınç ve alveoler ventilasyon. [[K1 s. 77]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Üç değişken: PAO₂'yi ne yükseltir, ne düşürür?</h3></div>
    <div data-viz="f18_uc"></div>
    <p class="viz-cap" aria-live="polite">Bir değişkene dokunun: denklemdeki terimi ve PAO₂ ile O₂ difüzyonuna etkisi vurgulanır. [[K1 s. 77]]</p>
    <p class="viz-foot">Şematik çizim. Örnek PAO₂ değerleri kitaptandır; FiO₂ 0,3 değeri kitabın denklemiyle hesaplanmıştır [[K1 s. 77–78]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Alveol ile pulmoner kapiller arasındaki O₂ basınç farkı, O₂'nin alveol–kapiller bariyerden difüzyon hızının temel belirleyicilerinden biridir (Bölüm 10); üç değişken PAO₂ üzerinden bu farkı değiştirir. [[K1 s. 77]]</p>
    <p>FiO₂ artınca PAO₂ ve gradyan büyür, Fick yasası uyarınca O₂ difüzyonu hızlanır. PB yükseklikle üstel olarak düşer (Bölüm 87); PAO₂ ve difüzyon hızı azalır. PaCO₂ alveoler ventilasyonla (V̇A) ters orantılıdır (Bölüm 11): hiperventilasyon PaCO₂'yi düşürüp PAO₂'yi ve difüzyonu artırır, hipoventilasyon tersini yapar. [[K1 s. 77]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d18-rq">
  <h2>Solunum katsayısı: neden besine göre değişir?</h2>
  <p class="intro">Solunum katsayısı R, CO₂ üretim hızının O₂ tüketim hızına oranıdır (<b>R = üretilen CO₂ / tüketilen O₂</b>) ve yağ, protein ve karbonhidrat için farklıdır. [[K1 s. 77]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Solunum katsayısı: tüketilen O₂, üretilen CO₂</h3></div>
    <div data-viz="f18_rq"></div>
    <p class="viz-cap" aria-live="polite">Bir substrat seçin: hücreye giren O₂ ile çıkan CO₂ sayılır, oran R'yi verir. Alttaki şerit, R'nin hesaplanan PAO₂'yi nasıl değiştirdiğini gösterir. [[K1 s. 77–78]]</p>
    <p class="viz-foot">R değerleri ve glukoz tepkimesi kitaptandır [[K1 s. 77–78]]; diğer substratlarda jetonlar oranı gösteren şematik 10 O₂'lik paketlerdir. PAO₂ oda havasında, PaCO₂ 5,3 kPa ile kitabın denklemiyle hesaplanmıştır [[K1 s. 77]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>R her substrat için aerobik metabolizmanın genel tepkimesinin kimyasal formülünden hesaplanır. Glukozda (C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O) altı O₂'ye altı CO₂ düşer: yalnız karbonhidratla beslenmede R = 1,0'dır; yalnız yağla 0,7, yalnız proteinle 0,9. Denklemde dengeli Batı tipi diyetin değeri 0,8 kullanılır. [[K1 s. 77–78]]</p>
    <p>PaCO₂ R'ye bölündüğü için R küçüldükçe çıkarılan terim büyür ve aynı PaCO₂'de PAO₂ düşer. [[K1 s. 77]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap proteinin R'sini 0,9 verir; fizyoloji kaynaklarının çoğu protein için yaklaşık 0,8 kullanır. Karbonhidrat (1,0) ve yağ (0,7) değerleri tartışmasızdır.</div>
</section>

<section class="wrap blk ders-sec" id="d18-aa">
  <h2>Klinik önem: alveoler–arteriyel (A–a) gradyan</h2>
  <p class="intro">A–a gradyanı, AGE ile hesaplanan PAO₂ ile arter kan gazında ölçülen PaO₂ arasındaki farktır; klinikte hipokseminin nedenini ayırmak için kullanılır. [[K1 s. 78]]</p>
  <div class="viz">
    <div class="viz-head"><h3>A–a gradyanıyla hipokseminin nedenini ayırın</h3></div>
    <div data-viz="f18_aa"></div>
    <p class="viz-cap" aria-live="polite">Bir olgu seçin ya da kan gazı değerlerini kaydırın: A–a gradyanı hesaplanır ve tanı akışında ilgili dal yanar. [[K1 s. 78]]</p>
    <p class="viz-foot">Normal sınır, neden grupları ve örnek hastalıklar kitaptandır; opioid olgusunun PaCO₂'si (9 kPa) kitabın örneğidir [[K1 s. 78]]. Diğer PaO₂ değerleri ve hipoksik karışımın FiO₂'si (0,14) atlas örnekleridir; hesap deniz seviyesinde, R 0,8 ile yapılır [[K1 s. 77]]. "PaCO₂ yüksek" eşiği olarak normalin üst sınırı 6,0 kPa alınmıştır.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Normal akciğerde PAO₂ ile pulmoner kapiller PO₂ yaklaşık eşittir: eritrosit kapilleri geçmeden bariyerin iki yanı dengelenir (Bölüm 10). Yine de PaO₂ her zaman PAO₂'den düşüktür, çünkü V̇/Q̇ eşleşmesi kusursuz olsa bile bronşiyal ve Thebesius venleri küçük bir anatomik şant oluşturur (Bölüm 14). Genç sağlıklı erişkinde normal gradyan &lt;1,5 kPa'dır; yaşlanan akciğerde V̇/Q̇ eşleşmesi bozulduğu için yaşla artar. [[K1 s. 78]]</p>
    <p>Artmış gradyan, alveoldeki O₂'nin arteriyel kana tam aktarılamadığını gösterir: V̇/Q̇ uyumsuzluğu (açık ara en sık neden; pnömoni, ARDS, atelektazi), sağdan sola şant (pulmoner AVM, intrakardiyak şant) ya da ağır difüzyon bozukluğu (son dönem pulmoner fibrozis). [[K1 s. 78]]</p>
    <p>Hipoksik karışımda (ör. arızalı anestezi cihazı) ve alveoler hipoventilasyonda (hava yolu obstrüksiyonu, nöromüsküler hastalık, ilaca bağlı solunum depresyonu) gradyan normaldir, çünkü düşük FiO₂ ya da yüksek PaCO₂ hesaplanan PAO₂'ye zaten yansır. [[K1 s. 78]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> 1,5 kPa sınırı oda havası içindir; FiO₂ arttıkça normal akciğerde bile gradyan büyür. Yüksek FiO₂ alan hastada bu sınırla yorum yapılamaz.</div>
</section>

<section class="wrap blk ders-sec" id="d18-vent">
  <h2>Klinik önem: hipoventilasyon, irtifa ve hiperventilasyonun sınırı</h2>
  <p class="intro">V̇A, PaCO₂ üzerinden PAO₂'yi iki yönde değiştirir: hipoventilasyon düşürür, hiperventilasyon yükseltir ama ancak bir sınıra kadar. [[K1 s. 77–79]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Ventilasyon mu, O₂ mi? PAO₂ platosu</h3></div>
    <div data-viz="f18_ventilasyon"></div>
    <p class="viz-cap" aria-live="polite">V̇A'yı kaydırın ya da kitabın noktalarını seçin: üstte PaCO₂ hiperbol boyunca düşer, altta PAO₂ platoya yaklaşır. "Kıyasla", V̇A'yı ikiye katlamakla FiO₂'yi 0,3'e çıkarmayı yan yana koyar. [[K1 s. 77–79]]</p>
    <p class="viz-foot">Model: PaCO₂ = 5,3 kPa × 5/V̇A; metabolizma sabitken V̇A'yı ikiye katlamak PaCO₂'yi yarıya indirir [[K1 s. 46–47]]. Normal V̇A 5 L/dk şematiktir; PAO₂ kitabın denklemiyle hesaplanır [[K1 s. 77]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p><b>Opioid aşırı dozu.</b> Bilinen bir intravenöz madde kullanıcısı opioid aşırı dozundan sonra bilinci kapalı getirilir: Hb satürasyonu %91, PaCO₂ 9 kPa. Opiat medulladaki solunum merkezini baskılar, V̇A azalır ve PaCO₂ yükselir. Oda havasında AGE: PAO₂ = 19,9 − 9/0,8 = 8,6 kPa, yaklaşık %91 SaO₂'ye karşılık gelir. [[K1 s. 78]]</p>
    <p><b>İrtifa.</b> Yükseklikte havadaki O₂ oranı aynıdır (FiO₂ değişmez), PB düşer: dünyanın yaşanılan en yüksek yerlerinden Tibet Platosu'nda 65 kPa. PaCO₂ 5,3 kPa'da kalsa PAO₂ 5,7 kPa olur; fizyolojik şant PaO₂'yi daha da indirir ve belirgin hipoksemi gelişir. Önemli bir fizyolojik mekanizma olan hiperventilasyon PaCO₂'yi örneğin 3,0 kPa'ya indirince PAO₂ 8,5 kPa'ya çıkar: yükseklikte yaşamaya yeter, bedeli kronik solunumsal alkalozdur. [[K1 s. 78–79]]</p>
    <p><b>Sınır.</b> V̇A ile PaCO₂ arasındaki ilişki hiperboliktir (Bölüm 11): V̇A'daki ılımlı bir artışın ötesinde (yaklaşık 10 L/dk) PaCO₂'yi biraz düşürmek için V̇A'yı çok artırmak gerekir ve PAO₂ platoya ulaşır. Bu yüzden O₂ vermek PAO₂'yi (ve PaO₂'yi) hiperventilasyondan çok daha fazla artırır (Şekil 18.1). [[K1 s. 79]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitabın Şekil 18.1'indeki FiO₂ 0,3 ve 0,4 eğrileri kendi denkleminin verdiğinden alçaktır: normal PaCO₂'de denklem ≈ 21,9 ve 31,4 kPa verir; şekli eğrilerin biçimi (plato) için okuyun. Ayrıca şeklin yatay ekseni dakika ventilasyonu, metindeki 10 L/dk ise alveoler ventilasyondur.</div>
</section>

<section class="wrap blk ders-sec" id="d18-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sayılar ve yönler üzerinden sorulur: denklemin değerleri (FiO₂ %20,93, PB 101,325 kPa, PSVP 6,3 kPa, R 0,8) ve 13,3 kPa sonucu; substratlara göre R; R, FiO₂, PB ve V̇A değişince PAO₂'nin yönü; A–a gradyanının normal değeri ve hangi hipoksemi nedenlerinde arttığı; irtifada FiO₂'nin değişmediği. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz18-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz18-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz18-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d18-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Alveoler gaz denklemini yazın ve terimlerini açıklayın. Hipoksemik bir hastayı değerlendirirken bu denklemden nasıl yararlanırsınız?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Neden gerekli?</b> Alveol–kapiller O₂ gradyanı difüzyon hızının temel belirleyicilerinden biridir; PAO₂ doğrudan ölçülemez, AGE ile kolayca ölçülen değişkenlerden tahmin edilir. [[K1 s. 77]]</li>
    <li><b>Denklem ve değerler.</b> PAO₂ = FiO₂ × (PB − PSVP su) − PaCO₂/R. Kuru havada FiO₂ %20,93, deniz seviyesinde PB 101,325 kPa, karinada tam nemlenme ve PSVP 6,3 kPa, R 0,8. Tipik hasta (PaCO₂ 5,3 kPa): 13,3 kPa. [[K1 s. 77–78]]</li>
    <li><b>Üç belirleyici.</b> FiO₂ (artınca PAO₂ artar), PB (yüksekte üstel düşer), V̇A (PaCO₂ ile ters orantılı: hiperventilasyon PAO₂'yi yükseltir, hipoventilasyon düşürür). [[K1 s. 77]]</li>
    <li><b>Solunum katsayısı.</b> Üretilen CO₂ / tüketilen O₂. Glukoz tepkimesinden R = 1,0; yağ 0,7; protein 0,9 (kitap); Batı diyeti 0,8. [[K1 s. 77–78]]</li>
    <li><b>A–a gradyanı.</b> Hesaplanan PAO₂ − ölçülen PaO₂. Normalde küçüktür (bronşiyal ve Thebesius venleri), genç erişkinde &lt;1,5 kPa, yaşla artar. Artmış: V̇/Q̇ uyumsuzluğu (en sık), sağdan sola şant, ağır difüzyon bozukluğu. Normal: hipoksik karışım, alveoler hipoventilasyon. [[K1 s. 78]]</li>
    <li><b>Klinik örnekler.</b> Opioid aşırı dozu: PaCO₂ 9 kPa → PAO₂ 8,6 kPa, A–a normal. Tibet Platosu (PB 65 kPa): PaCO₂ 5,3'te 5,7 kPa, hiperventilasyonla PaCO₂ 3,0'da 8,5 kPa; bedeli kronik solunumsal alkaloz. [[K1 s. 78–79]]</li>
    <li><b>Sınırla bitirin.</b> V̇A–PaCO₂ ilişkisi hiperbolik: yaklaşık 10 L/dk'nın ötesinde PAO₂ platoya ulaşır; PAO₂'yi yükseltmede O₂ vermek hiperventilasyondan çok daha etkilidir. [[K1 s. 79]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim, yatay eksende alveoler ventilasyon, dikey eksende PAO₂ olan grafiktir: FiO₂ 0,21 eğrisi 13,3 kPa'dan geçip 19,9 kPa tavanının altında platoya yatar, FiO₂ 0,3 eğrisi bütünüyle daha yukarıdadır. İkinci çizim olarak PB'den PIO₂'ye (19,9 kPa), PAO₂'ye (13,3 kPa) ve PaO₂'ye inen basamakları, son basamağı A–a gradyanı diye işaretleyerek gösterin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> PAO₂ neden ölçülemez? Su buharı basıncı neden PB'den çıkarılır? R neden diyetle değişir ve PAO₂'yi nasıl etkiler? A–a gradyanı neden sıfır değildir, neden yaşla artar? Hangi iki hipoksemi nedeninde A–a gradyanı normaldir? Opioid aşırı dozunda hipoksemiyi nasıl açıklarsınız? Yükseklikte hiperventilasyon neyi kazandırır, bedeli nedir? Hiperventilasyonun kazancı neden sınırlıdır? Cevapların hepsi yukarıda. [[K1 s. 77–79]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d18-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>PAO₂ ölçülmez, AGE ile hesaplanır; PaO₂ arter kan gazında ölçülür. [[K1 s. 77–78]]</li>
    <li>PAO₂ = FiO₂ × (PB − PSVP su) − PaCO₂/R. FiO₂ %20,93, PB 101,325 kPa, PSVP 6,3 kPa (karinada tam nemlenme), R 0,8; tipik hastada PAO₂ 13,3 kPa. [[K1 s. 77–78]]</li>
    <li>PAO₂'yi esas olarak FiO₂, PB ve PaCO₂ üzerinden alveoler ventilasyon belirler. [[K1 s. 77]]</li>
    <li>R = üretilen CO₂ / tüketilen O₂: karbonhidrat 1,0, protein 0,9 (kitabın değeri), yağ 0,7, Batı tipi diyet 0,8. [[K1 s. 77–78]]</li>
    <li>A–a gradyanı = hesaplanan PAO₂ − ölçülen PaO₂; genç erişkinde &lt;1,5 kPa, yaşla artar. Artmış: V̇/Q̇ uyumsuzluğu (en sık), sağdan sola şant, ağır difüzyon bozukluğu. Normal: hipoksik karışım, alveoler hipoventilasyon. [[K1 s. 78]]</li>
    <li>Opioid aşırı dozunda PaCO₂ 9 kPa, PAO₂ 8,6 kPa: hipoksemi akciğer hastalığı olmadan, normal A–a gradyanıyla açıklanabilir. [[K1 s. 78]]</li>
    <li>Yükseklikte FiO₂ aynı, PB düşüktür. PB 65 kPa'da PaCO₂ 5,3 kPa iken PAO₂ 5,7 kPa, hiperventilasyonla (PaCO₂ 3,0 kPa) 8,5 kPa'dır; bedeli kronik solunumsal alkaloz. [[K1 s. 78–79]]</li>
    <li>V̇A yaklaşık 10 L/dk'yı aşınca PAO₂ platoya ulaşır; O₂ vermek PAO₂'yi hiperventilasyondan çok daha fazla artırır. [[K1 s. 79]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="18"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/17">← Bölüm 17 · Oksijen sunumu ve gereksinimi</a>
    <a href="#/dersler/fizyoloji/19">Sonraki: Bölüm 19 · Oksijen kaskadı →</a>
  </nav>
</section>`,
};
