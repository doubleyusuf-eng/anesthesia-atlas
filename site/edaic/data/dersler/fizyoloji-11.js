/* Fizyoloji Bölüm 11 · Ventilasyon ve ölü boşluk (K1 İngilizce baskı s. 45–49).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz11-1'] = {
  no: 1, kok: 'Ölü boşluk için:', kagit: 'Paper A · fizyoloji, Bölüm 11', kaynak: '[[K1 s. 45–46]]',
  onermeler: [
    { t: 'Sırtüstü pozisyon, akciğer hacmini azaltıp hava yolu çapını küçülterek anatomik ölü boşluğu azaltır.', d: true, n: 'Doğru. Sırtüstü yatışta akciğer hacmi azalır, hava yolları daralır ve anatomik ölü boşluk küçülür. Tersine, yüksek akciğer hacminde radyal çekim hava yollarını genişletir. [[K1 s. 45]]' },
    { t: 'Alveoler ölü boşluk Fowler yöntemiyle doğrudan ölçülür.', d: false, n: 'Yanlış. Alveoler ölü boşluk doğrudan ölçülemez. Fizyolojik ölü boşluk Bohr denklemiyle, anatomik ölü boşluk Fowler yöntemiyle ölçülür; alveoler ölü boşluk ikisinin farkı olarak hesaplanır. [[K1 s. 45]]' },
    { t: 'Bronkokonstriksiyon anatomik ölü boşluğu artırır.', d: false, n: 'Yanlış. Bronkokonstriksiyon hava yolu çapını küçültür, anatomik ölü boşluk azalır. Artıran bronkodilatasyondur. [[K1 s. 45]]' },
    { t: 'Düşük pulmoner arter basıncı, akciğer apekslerinde yüksek V̇/Q̇ oranı oluşturarak alveoler ölü boşluğu artırır.', d: true, n: 'Doğru. Örneğin sağ ventrikül debisi azaldığında apeksler yetersiz perfüze olur; dik postürde olduğu gibi V̇/Q̇ yükselir ve alveoler ölü boşluk artar. [[K1 s. 45]]' },
    { t: 'Pulmoner emboli, tıkanan arterin distalindeki alveollerin perfüze olup ventile olmamasına yol açar.', d: false, n: 'Yanlış. Tersi doğrudur: distaldeki alveoller ventile olur ama perfüze olmaz; bu yüzden alveoler ölü boşluk artar. Emboli trombüs, gaz, yağ ya da amniyon sıvısı kaynaklı olabilir. [[K1 s. 46]]' },
  ],
};
VERI.sorular['fiz11-2'] = {
  no: 2, kok: 'Ventilasyon, PaCO₂ ve mekanik ölü boşluk için:', kagit: 'Paper A · fizyoloji, Bölüm 11', kaynak: '[[K1 s. 46–47]]',
  onermeler: [
    { t: 'Anatomik ölü boşluğu 150 mL olan iki hastadan VT 250 mL ve solunum sayısı 30/dk olanın alveoler ventilasyonu, VT 500 mL ve 15/dk olanınkine eşittir.', d: false, n: 'Yanlış. Dakika ventilasyonları eşittir (7500 mL/dk), alveoler ventilasyonları değildir: (250 − 150) × 30 = 3000 mL/dk, (500 − 150) × 15 = 5250 mL/dk. Hızlı ve yüzeyel soluyan hastanın PaCO₂\'si daha yüksektir. [[K1 s. 47]]' },
    { t: 'Halka sistemi, CO₂ absorbe edilip O₂ yerine konduğu için gazların yeniden solunmasına izin verecek biçimde tasarlanmıştır.', d: true, n: 'Doğru. Halka sisteminde CO₂ absorbanla (ör. soda lime) uzaklaştırılır ve O₂ eklenir. Bain devresi (Mapleson D) ise spontan solunumda yüksek taze gaz akımıyla kullanılmış gazı süpürür. [[K1 s. 47]]' },
    { t: 'Metabolizma hızı alveoler ventilasyonda telafi edici bir artış olmadan yükselirse hiperkapni gelişir.', d: true, n: 'Doğru. Kitabın örneği, ventile edilen malign hipertermi (malign hiperpireksi) hastasında giderek yükselen end-tidal CO₂\'dir. [[K1 s. 47]]' },
    { t: 'PaCO₂\'yi belirleyen temel etken dakika ventilasyonudur.', d: false, n: 'Yanlış. Temel etken alveoler ventilasyondur: PaCO₂ = K × V̇CO₂ / V̇A. Dakika ventilasyonu ölü boşluk ventilasyonunu hesaba katmaz. [[K1 s. 46–47]]' },
    { t: 'Mekanik ölü boşluk tidal hacmi aşarsa kişi yalnızca kullanılmış gaz solur ve giderek daha hipoksemik olur.', d: true, n: 'Doğru. Ekspirasyon sonunda şnorkel (mekanik ölü boşluk) alveoler gazla doludur ve sonraki soluğun başında ilk solunan odur. Hacmi tidal hacmi aşınca solunan gazın tamamı kullanılmış gazdır. [[K1 s. 47]]' },
  ],
};
VERI.sorular['fiz11-3'] = {
  no: 3, kok: 'Ölü boşluğun ölçümü için:', kagit: 'Paper A · fizyoloji, Bölüm 11', kaynak: '[[K1 s. 47–49]]',
  onermeler: [
    { t: 'Fowler eğrisinde anatomik ölü boşluk, Faz 3 platosunun başladığı noktadan okunur.', d: false, n: 'Yanlış. Anatomik ölü boşluk Faz 2 eğrisinin orta noktasıdır: A ve B alanlarının eşit olduğu hacim. [[K1 s. 48]]' },
    { t: 'Fowler yönteminde Faz 1\'de ekspire edilen gaz N₂ içermez.', d: true, n: 'Doğru. Faz 1, anatomik ölü boşluğu dolduran ve yalnızca O₂ içeren gazdır; gaz değişimine katılmamıştır. [[K1 s. 48]]' },
    { t: 'Fowler eğrisinin Faz 4\'ündeki keskin N₂ artışı, bağımlı bölgelerin küçük hava yolları kapandığında apikal alveollerin N₂\'den zengin gazının gelmesini yansıtır.', d: true, n: 'Doğru. O₂ soluğunun çoğu daha kompliyan bazal alveollere girer ve oradaki N₂\'yi daha çok seyreltir. Bazal küçük hava yolları kapanınca yalnızca apikal alveoller boşalır ve N₂ birden yükselir. [[K1 s. 48]]' },
    { t: 'Normal tidal solunumda fizyolojik ölü boşluğun tidal hacme oranı (VD/VT) yaklaşık 0,2–0,35\'tir.', d: true, n: 'Doğru. Bohr denklemi bu oranı verir. Değer, karışık ekspire gazın PCO₂\'siyle hesaplanan orandır (Bohr yöntemi kısmındaki Atlas notuna bakın). [[K1 s. 48]]' },
    { t: 'Bohr denklemi, ekspire edilen CO₂\'nin bir bölümünün ölü boşluktan geldiği varsayımına dayanır.', d: false, n: 'Yanlış. Denklem, CO₂\'nin tamamının hem ventile hem perfüze alveollerden geldiği, ölü boşluktan hiç gelmediği ilkesine dayanır: ölü boşluk gazının CO₂ fraksiyonu sıfırdır (FD = 0). [[K1 s. 48–49]]' },
  ],
};

const D11_NAV = [
  ['d11-tanim', 'Tanım ve tipler'], ['d11-etken', 'Etkenler'], ['d11-vent', 'Ventilasyon ve PaCO₂'], ['d11-mekanik', 'Klinik: mekanik ölü boşluk'],
  ['d11-fowler', 'Fowler yöntemi'], ['d11-bohr', 'Bohr yöntemi'], ['d11-p1', 'Part I'], ['d11-p2', 'Part II'], ['d11-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/11'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 11', baslik: 'Ventilasyon ve ölü boşluk',
  lede: 'Her soluğun bir bölümü gaz değişimine hiç katılmaz. Bu bölüm ölü boşluğun tiplerini ve onu değiştiren etkenleri, dakika ve alveoler ventilasyonu, alveoler ventilasyonla PaCO₂ arasındaki ters ilişkiyi, anestezide mekanik ölü boşluğu ve ölü boşluğun Fowler ve Bohr yöntemleriyle ölçümünü işler. [[K1 s. 45–49]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D11_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d11-tanim">
  <h2>Ölü boşluk: tanım ve üç tip</h2>
  <p class="intro">Tidal hacmin (V<sub>T</sub>) perfüze alveollere ulaşan bölümü alveoler hacimdir (V<sub>A</sub>); gaz değişiminde hiçbir rol oynamayan, iletici hava yollarında ya da perfüze olmayan alveollerde kalan bölümü ise ölü boşluktur (V<sub>D</sub>): <b>V<sub>T</sub> = V<sub>A</sub> + V<sub>D</sub></b>. [[K1 s. 45]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Bir soluk nereye gider? Ölü boşluğun tipleri ve ölçümü</h3></div>
    <div data-viz="f11_tanim"></div>
    <p class="viz-cap" aria-live="polite"><b>500 mL'lik bir soluk.</b> Bir bölgeye dokunun: o ölü boşluğun ne olduğu, ne kadar olduğu ve nasıl ölçüldüğü görünür. [[K1 s. 45, 47]]</p>
    <p class="viz-foot">Şematik çizim; sayılar 70 kg'lık erkek içindir [[K1 s. 45, 47]]. Kitapta alveoler ölü boşluğun tanım satırında simge yanlışlıkla V<sub>D</sub><sup>Anat</sup> basılmıştır; doğrusu V<sub>D</sub><sup>Alv</sup>'dir.</p>
  </div>
  <div class="blk-body">
    <p><b>Anatomik ölü boşluk</b> (V<sub>D</sub><sup>Anat</sup>) üst hava yolları ile trakeobronşiyal ağacın iletici hava yollarını oluşturan ilk 16 kuşağının hacmidir (Bölüm 6 ve 7). 70 kg'lık erkekte tipik değeri 150 mL'dir: ≈2 mL/kg, normal V<sub>T</sub>'nin (7 mL/kg) yaklaşık üçte biri. [[K1 s. 45]]</p>
    <p><b>Alveoler ölü boşluk</b> (V<sub>D</sub><sup>Alv</sup>) ventile olduğu hâlde yetersiz perfüzyon (V̇/Q̇ uyumsuzluğu; Bölüm 15) yüzünden gaz değişimine katılamayan alveollerin toplam hacmidir. Normal akciğerde ventilasyon ve perfüzyon iyi eşleştiği için ihmal edilebilir. <b>Fizyolojik ölü boşluk</b> toplam ölü boşluktur: V<sub>D</sub><sup>Phys</sup> = V<sub>D</sub><sup>Anat</sup> + V<sub>D</sub><sup>Alv</sup>. [[K1 s. 45]]</p>
    <p>Anatomik ölü boşluk Fowler yöntemiyle, fizyolojik ölü boşluk Bohr denklemiyle ölçülür; alveoler ölü boşluk doğrudan ölçülemez, ikisinin farkından hesaplanır. Anestezide bunlara ekipmanın mekanik ölü boşluğu eklenir. [[K1 s. 45, 47]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d11-etken">
  <h2>Ölü boşluğu ne değiştirir?</h2>
  <p class="intro">Anatomik ölü boşluk hava yollarının boyutu ve çapıyla değişir; alveoler ölü boşluk ise ventile alveollerin perfüzyonu ya da gaz değişim yüzeyi azaldığında artar. [[K1 s. 45–46]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Ölü boşluk haritası: etkenleri deneyin</h3></div>
    <div data-viz="f11_tipler"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal akciğer.</b> 500 mL'lik bir soluğun yaklaşık 150 mL'si iletici hava yollarında kalır (anatomik ölü boşluk); ventilasyon ve perfüzyon iyi eşleştiği için alveoler ölü boşluk ihmal edilebilir. Bir etken seçin: hangi ölü boşluğu, hangi yönde değiştirir? [[K1 s. 45, 47]]</p>
    <p class="viz-foot">Şematik çizim: yalnız 150 mL ve 500 mL kitaptandır [[K1 s. 45, 47]]; çizim değişimin yalnız yönünü gösterir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Etken</th><th>Değişim</th><th>Mekanizma</th></tr></thead>
      <tbody>
        <tr><th>Büyük hasta</th><td>Anatomik ↑</td><td>Akciğerler büyüdükçe büyür. [[K1 s. 45]]</td></tr>
        <tr><th>Yüksek akciğer hacmi</th><td>Anatomik ↑</td><td>Hava yolu duvarlarına binen radyal çekim çapı artırır. [[K1 s. 45]]</td></tr>
        <tr><th>Sırtüstü pozisyon</th><td>Anatomik ↓</td><td>Akciğer hacmi azalır, hava yolu çapı küçülür. [[K1 s. 45]]</td></tr>
        <tr><th>Bronkokonstriksiyon / bronkodilatasyon</th><td>Anatomik ↓ / ↑</td><td>Hava yolu çapı küçülür / artar. [[K1 s. 45]]</td></tr>
        <tr><th>Dik postür</th><td>Alveoler ↑</td><td>Yer çekimi yüzünden kan apeksleri ancak perfüze eder (West zon 2; Bölüm 16): apikal alveoller iyi ventile, yetersiz perfüzedir. [[K1 s. 45]]</td></tr>
        <tr><th>Düşük pulmoner arter basıncı<br><span class="small muted">ör. sağ ventrikül debisi ↓</span></th><td>Alveoler ↑</td><td>Dik postürdeki gibi apeksler yetersiz perfüze olur, V̇/Q̇ yükselir. [[K1 s. 45]]</td></tr>
        <tr><th>PEEP ve pozitif basınçlı ventilasyon</th><td>Alveoler ↑</td><td>Alveoler basınç artar, apikal kapillerler sıkışır (West zon 1); artan intratorasik basınç venöz dönüşü, dolayısıyla pulmoner arter basıncını düşürür. [[K1 s. 45–46]]</td></tr>
        <tr><th>Pulmoner emboli<br><span class="small muted">trombüs, gaz, yağ, amniyon sıvısı</span></th><td>Alveoler ↑</td><td>Tıkanan arterin distalindeki alveoller ventile olur ama perfüze olmaz. [[K1 s. 46]]</td></tr>
        <tr><th>KOAH</th><td>Alveoler ↑</td><td>Septum yıkımı hava boşluklarını genişletir, gaz değişim yüzeyi azalır; giren havanın çoğu gaz değişimine katılamaz. [[K1 s. 46]]</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d11-vent">
  <h2>Dakika ventilasyonu, alveoler ventilasyon ve PaCO₂</h2>
  <p class="intro">Ventilasyon havanın akciğerlere girip çıkmasıdır; dakika ventilasyonunun yalnız alveoler bölümü gaz değişimine katılır ve PaCO₂'yi o belirler. [[K1 s. 46–47]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Dakika ventilasyonu, alveoler ventilasyon ve PaCO₂</h3></div>
    <div data-viz="f11_dakika"></div>
    <p class="viz-cap" aria-live="polite"><b>Hasta 1.</b> 500 mL × 15/dk: V̇<sub>E</sub> 7500, V̇<sub>A</sub> 5250 mL/dk; her soluğun 150 mL'si (%30) ölü boşlukta kalır. Hasta 2'ye geçin: V̇<sub>E</sub> aynı kalır, nokta hiperbol üzerinde yukarı kayar. [[K1 s. 47]]</p>
    <p class="viz-foot">Model: anatomik ölü boşluk 150 mL [[K1 s. 45]]; PaCO₂ = 0,115 × V̇CO₂ / V̇<sub>A</sub> (kPa; katsayı için aşağıdaki nota bakın); istirahat V̇CO₂ 200 mL/dk [[K1 s. 39]], 300 ve 400 mL/dk örnek değerdir. Mutlak PaCO₂ değerleri şematiktir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Ventilasyon</th><th>Tanım</th><th>Denklem</th></tr></thead>
      <tbody>
        <tr><th>Dakika ventilasyonu</th><td>Dakikada inspire edilen hava (V̇<sub>E</sub>)</td><td>V̇<sub>E</sub> = V<sub>T</sub> × RR [[K1 s. 46]]</td></tr>
        <tr><th>Alveoler ventilasyon</th><td>V̇<sub>E</sub>'nin gaz değişimine katılan bölümü (V̇<sub>A</sub>)</td><td>V̇<sub>A</sub> = V<sub>A</sub> × RR = (V<sub>T</sub> − V<sub>D</sub>) × RR [[K1 s. 46]]</td></tr>
        <tr><th>Ölü boşluk ventilasyonu</th><td>V̇<sub>E</sub>'nin gaz değişimine katılamayan bölümü (V̇<sub>D</sub>)</td><td>V̇<sub>D</sub> = V<sub>D</sub> × RR = (V<sub>T</sub> − V<sub>A</sub>) × RR [[K1 s. 46]]</td></tr>
        <tr><th>Toplam</th><td>V soluk başına hacim (mL), V̇ dakikadaki hacim, RR dakikadaki soluk sayısı</td><td>V̇<sub>E</sub> = V̇<sub>A</sub> + V̇<sub>D</sub> [[K1 s. 46]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>V̇<sub>A</sub> arttıkça alveoler gaz atmosfer havasıyla daha çok değişir. Atmosfer havasında CO₂ ihmal edilebilir olduğundan alveoler PCO₂ (PACO₂) düşer; bu, CO₂'nin alveol-kapiller bariyerden difüzyonunu kolaylaştırır ve arteriyel PCO₂ (PaCO₂) de düşer. Sonuç, şekildeki hiperbol gibi ters bir ilişkidir: [[K1 s. 46]]</p>
  </div>
  <div class="card basic" style="margin:10px 0 14px">
    <span class="tag basic">Temel denklem · PaCO₂ denklemi</span>
    <p style="font-size:20px;margin-top:6px"><b>PaCO₂ = K × V̇CO₂ / V̇<sub>A</sub></b></p>
    <p class="small muted" style="margin-top:6px">V̇CO₂: metabolizmayla CO₂ üretim hızı (mL/dk) · V̇<sub>A</sub> (L/dk) · K: bu birimleri PaCO₂'ninkiyle eşleyen düzeltme katsayısı. [[K1 s. 46–47]]</p>
  </div>
  <div class="blk-body"><ul>
    <li>Metabolizma hızı sabitken V̇<sub>A</sub>'yı iki katına çıkarmak PaCO₂'yi yarıya indirir. [[K1 s. 46–47]]</li>
    <li>Metabolizma hızı V̇<sub>A</sub>'da telafi edici artış olmadan yükselirse hiperkapni gelişir: ventile edilen malign hipertermi (malign hiperpireksi) hastasında giderek yükselen end-tidal CO₂. [[K1 s. 47]]</li>
    <li>PaCO₂'yi belirleyen temel etken V̇<sub>A</sub>'dır; V̇<sub>E</sub> ölü boşluk ventilasyonunu hesaba katmaz. [[K1 s. 47]]</li>
  </ul></div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem · hiperventilasyon</span>
    <h3 style="margin-top:8px">Aynı dakika ventilasyonu, farklı PaCO₂</h3>
    <p>Akciğerleri normal iki hastanın V̇<sub>E</sub>'si 7500 mL/dk'dır: Hasta 1 500 mL × 15/dk, Hasta 2 250 mL × 30/dk solur. Anatomik ölü boşluk ikisinde de ≈150 mL olduğundan V̇<sub>A</sub> Hasta 1'de (500 − 150) × 15 = 5250, Hasta 2'de (250 − 150) × 30 = 3000 mL/dk'dır. PaCO₂'ler eşit olmaz: V̇<sub>A</sub>'sı yüksek olan Hasta 1'inki daha düşüktür. [[K1 s. 47]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap PaCO₂ kPa cinsindeyken K = 0,015 verir; verilen birimlerle (V̇CO₂ mL/dk, V̇<sub>A</sub> L/dk) doğru değer ≈ <b>0,115</b>'tir (mmHg için 0,863). Sağlaması: istirahat V̇CO₂'si ≈ 200 mL/dk [[K1 s. 39]] ve V̇<sub>A</sub> 4,3 L/dk ile 0,115 × 200 / 4,3 ≈ 5,3 kPa bulunur; 0,015 ile sonuç fizyolojik olmayan 0,7 kPa olurdu.</div>
</section>

<section class="wrap blk ders-sec" id="d11-mekanik">
  <h2>Klinik önem: anestezi ve mekanik ölü boşluk</h2>
  <p class="intro">Anesteziye özgü üçüncü tip ekipmanın ölü boşluğudur: <b>mekanik ölü boşluk</b>, solunum sisteminin ekspirasyon sonunda ekshale edilmiş gaz içeren bölümüdür ve bir sonraki soluğun başında yeniden solunur. [[K1 s. 47]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Şnorkel: mekanik ölü boşluk ve yeniden soluma</h3></div>
    <div data-viz="f11_yeniden"></div>
    <p class="viz-cap" aria-live="polite"><b>Şnorkel yok.</b> Ekspirasyonun ilk bölümü gaz değişimine uğramamış ölü boşluk gazı, kalanı CO₂ ve su buharı içeren, PO₂'si düşük alveoler gazdır. Şnorkel hacmini artırın ve bir sonraki soluğun başında ne solunduğuna bakın. [[K1 s. 47]]</p>
    <p class="viz-foot">Şematik piston modeli: gaz karışmadan sırayla ilerler. Erişkinde V<sub>T</sub> 500 mL ve anatomik ölü boşluk 150 mL [[K1 s. 45, 47]]; 10 kg'lık çocuğun değerleri kitabın 7 mL/kg ve 2 mL/kg oranlarından türetilmiştir [[K1 s. 45]]. Araç ve şnorkel hacimleri örnektir.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Bain devresi, halka sistemi ya da yalnızca bir Hudson maskesi olsun, her hava yolu aracı mekanik ölü boşluğu kaçınılmaz olarak artırır. Şnorkelle soluyan birinde ekspirasyon sonunda şnorkelin tamamı alveoler gazla doludur ve sonraki soluğun başında atmosferden taze gaz gelmeden önce bu gaz solunur: <b>yeniden soluma</b>. [[K1 s. 47]]</p>
    <p>Yeniden solunan gazın PO₂'si atmosfer havasınınkinden düşük, PCO₂'si yüksektir: hipoksemi ve hiperkapni riski. Mekanik ölü boşluk büyüdükçe yeniden soluma artar; V<sub>T</sub>'yi aşarsa kişi yalnızca "kullanılmış" gaz solur ve giderek daha hipoksemik olur. Devreler bu yüzden yeniden solumayı önleyecek biçimde tasarlanır: [[K1 s. 47]]</p>
  </div>
  <div class="cols" style="margin:10px 0 14px">
    <div class="card"><span class="tag basic">Süpürerek önler</span><h3 style="margin-top:8px">Bain devresi (Mapleson D)</h3><p>Spontan solunumda yüksek taze gaz akımı gerekir: kullanılmış gaz ekspiratuvar duraklamada tüp boyunca süpürülür. [[K1 s. 47]]</p></div>
    <div class="card"><span class="tag clin">Zararsız kılar</span><h3 style="margin-top:8px">Halka sistemi</h3><p>Yeniden solumaya izin verecek biçimde tasarlanmıştır: CO₂ absorbe edilir (ör. soda lime ile), O₂ yerine konur. [[K1 s. 47]]</p></div>
  </div>
  <div class="card clin">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Pediatrik anestezide mekanik ölü boşluk</h3>
    <p>Hasta ile devre arasındaki araç ve tüplerin hacmi yüzünden bir miktar yeniden soluma kaçınılmazdır; eklenen ölü boşluk ventilasyonu nedeniyle V̇<sub>A</sub>'nın aynı kalması için V̇<sub>E</sub> artmalıdır. Mekanik ölü boşluğun fizyolojik ölü boşluğun önemli bir bölümünü oluşturabildiği çocuklarda bu özellikle önemlidir; mekanik ölü boşluk en aza indirilir: endotrakeal tüpler keserek kısaltılır, kateter bağlantısı (catheter mount) kısaltılır, dirsek bağlantı parçaları az kullanılır. [[K1 s. 47]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d11-fowler">
  <h2>Fowler yöntemi: anatomik ölü boşluğun ölçümü</h2>
  <p class="intro">Fowler yöntemi tek soluk azot (N₂) yıkamasıdır: saf O₂ soluğundan sonra ekspire edilen gazın N₂ içermeyen ilk bölümü anatomik ölü boşluktan gelir; aynı eğri kapanma kapasitesini (CC; Bölüm 12) de verir. [[K1 s. 47–48]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Fowler eğrisi: tek soluk N₂ yıkama</h3></div>
    <div data-viz="f11_fowler"></div>
    <p class="viz-cap" aria-live="polite"><b>Hazırlık.</b> Hasta oda havasını tidal hacimlerle solur; alveollerde N₂ vardır. Adımları izleyin: O₂ soluğu, yavaş ekspirasyon ve eğrinin dört fazı. Faz 2'de dikey çizgiyi sürükleyerek A ve B alanlarını eşitleyin. [[K1 s. 48]]</p>
    <p class="viz-foot">Şematik eğri; N₂ ekseni göreli çizilmiştir (kitabın şeklinde ölçek %0–40) [[K1 s. 48]]. Anatomik ölü boşluk 150 mL [[K1 s. 45]], vital kapasite 4500 mL [[K1 s. 50]]; kapanma hacmi şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Hasta oda havasını tidal hacimlerle solur; normal bir tidal ekspirasyonun sonunda (FRK) %100 O₂ ile bir vital kapasite soluğu alır, sonra bir ağızlığa maksimal ekspirasyona (rezidüel hacim, RV) kadar yavaşça soluk verir. Ağızlığa bağlı spirometre ekspire edilen hacmi, hızlı N₂ analizörü N₂ konsantrasyonunu ölçer; ekspire hacme karşı N₂ grafiğinin dört fazı vardır. [[K1 s. 48]]</p>
  </div>
  <div class="tbl-wrap" style="margin:14px 0">
    <table class="tbl">
      <thead><tr><th>Faz</th><th>Ekspire edilen gaz</th><th>Eğride</th></tr></thead>
      <tbody>
        <tr><th>Faz 1</th><td>Anatomik ölü boşluk gazı: yalnızca O₂</td><td>N₂ yok [[K1 s. 48]]</td></tr>
        <tr><th>Faz 2</th><td>Ölü boşluk gazı ile alveoler gazın karışımı</td><td>N₂ hızla yükselir; orta nokta (A alanı = B alanı) anatomik ölü boşluktur [[K1 s. 48]]</td></tr>
        <tr><th>Faz 3</th><td>Yalnızca alveoler gaz</td><td>N₂ platosu, hafif yukarı eğimli [[K1 s. 48]]</td></tr>
        <tr><th>Faz 4</th><td>Apikal alveollerin N₂'den zengin gazı</td><td>CC'de, yani bağımlı bölgelerin en küçük hava yollarının ekspirasyonda kapanmaya başladığı akciğer hacminde N₂ keskin biçimde artar [[K1 s. 48]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body">
    <p>Faz 4'ün nedeni bölgeseldir: bazal alveoller apikallerden daha kompliyan olduğu için O₂ soluğunun çoğu onlara girer ve N₂'lerini daha çok seyreltir. Ekspirasyonda önce bazal alveoller boşalır; alt hava yolları kapanınca yalnız apikal alveollerin N₂'den zengin gazı gelir ve ekspire N₂ birden yükselir. [[K1 s. 48]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitaptaki "FRK'den vital kapasite soluğu" çelişkilidir: FRK'den alınan soluk en çok inspiratuvar kapasite kadardır; standart tek soluk N₂ testinde hasta önce RV'ye kadar verir, sonra TLC'ye kadar %100 O₂ alır. Eğride Faz 4'ün başlangıcından RV'ye kadar verilen hacim kapanma hacmidir (CV), kapanma kapasitesi ise RV + CV'dir [[K1 s. 55]]; Faz 3'ün hafif eğimi ventilasyonun homojen olmamasındandır (N₂'si yüksek birimler daha geç boşalır).</div>
</section>

<section class="wrap blk ders-sec" id="d11-bohr">
  <h2>Bohr yöntemi: fizyolojik ölü boşluğun ölçümü</h2>
  <p class="intro">Bohr denklemi fizyolojik ölü boşluğun tidal hacme oranını, V<sub>D</sub>/V<sub>T</sub>'yi verir; tidal solunumda "normal" değer 0,2–0,35'tir. [[K1 s. 48]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Bohr denklemi: ekspire edilen CO₂ nereden gelir?</h3></div>
    <div data-viz="f11_bohr"></div>
    <p class="viz-cap" aria-live="polite"><b>1. adım.</b> Tidal hacim, alveoler hacim ile ölü boşluğun toplamıdır: V<sub>T</sub> = V<sub>A</sub> + V<sub>D</sub>, yani V<sub>A</sub> = V<sub>T</sub> − V<sub>D</sub>. [[K1 s. 48]]</p>
    <p class="viz-foot">Model: perfüze alveollerde PACO₂ = PaCO₂ = 5,3 kPa [[K1 s. 39]]; ölü boşluk gazında CO₂ yoktur [[K1 s. 49]]. PaCO₂ sabit tutulur; sayılar şematiktir.</p>
  </div>
  <div class="card basic" style="margin:14px 0">
    <span class="tag basic">Temel denklem · Bohr denklemi</span>
    <p style="font-size:20px;margin-top:6px"><b>V<sub>D</sub>/V<sub>T</sub> = (PACO₂ − PĒCO₂) / PACO₂</b></p>
    <p class="small muted" style="margin-top:6px">PACO₂: alveoler, PĒCO₂: ekspire edilen (karışık) gazın CO₂ parsiyel basıncı. Ölçüm kolaylığı için PACO₂ yerine PaCO₂ konur; arteriyel kan gazı ekspire CO₂ ölçümüyle aynı anda alınır. [[K1 s. 48–49]]</p>
  </div>
  <div class="blk-body">
    <p>Denklem tek ilkeye dayanır: CO₂'nin tamamı alveoler gazdan, yani hem ventile hem perfüze alveollerden gelir; ölü boşluktan hiç gelmez. F<sub>A</sub>, F<sub>E</sub> ve F<sub>D</sub> alveoler, ekspire ve ölü boşluk gazındaki CO₂ fraksiyonlarıysa ekspire CO₂ iki kaynağın toplamıdır: V<sub>T</sub> × F<sub>E</sub> = V<sub>A</sub> × F<sub>A</sub> + V<sub>D</sub> × F<sub>D</sub>. [[K1 s. 48–49]]</p>
    <p>F<sub>D</sub> = 0 ve V<sub>A</sub> = V<sub>T</sub> − V<sub>D</sub> konup parantez açılınca V<sub>D</sub> × F<sub>A</sub> = V<sub>T</sub> × (F<sub>A</sub> − F<sub>E</sub>), yani V<sub>D</sub>/V<sub>T</sub> = (F<sub>A</sub> − F<sub>E</sub>) / F<sub>A</sub> bulunur. Parsiyel basınçlar konsantrasyonlarla orantılı olduğundan bu, Bohr denklemidir. [[K1 s. 49]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap PĒCO₂ yerine end-tidal PCO₂ koyup "basitleştirilmiş" denklemi (PaCO₂ − PETCO₂) / PaCO₂ diye verir; bu doğru değildir, çünkü F<sub>E</sub> bütün ekspire gazın (Douglas torbası ya da volümetrik kapnografi) <b>karışık</b> CO₂ fraksiyonudur, end-tidal gaz ise alveoler gazdır ve bu oran başlıca alveoler ölü boşluğu yansıtır. 0,2–0,35 aralığı karışık ekspire PCO₂ ile hesaplanan orana aittir; sınavda Bohr–Enghoff denklemini V<sub>D</sub>/V<sub>T</sub> = (PaCO₂ − PĒCO₂) / PaCO₂ diye yazın.</div>
</section>

<section class="wrap blk ders-sec" id="d11-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok tanımlar, yönler ve denklemler üzerinden sorulur: üç ölü boşluk tipi ve 150 mL ≈ 2 mL/kg; hangi etkenin anatomik ölü boşluğu artırıp hangisinin azalttığı; alveoler ölü boşluğu artıran durumlar ve mekanizmaları (zon 2, zon 1, emboli, KOAH); V̇<sub>E</sub>, V̇<sub>A</sub> ve V̇<sub>D</sub> denklemleri; V̇<sub>A</sub> ile PaCO₂'nin ters ilişkisi; mekanik ölü boşluk ve yeniden soluma; Fowler eğrisinin dört fazı ve Bohr denkleminin varsayımı. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz11-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz11-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz11-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d11-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Ölü boşluk nedir, nasıl sınıflanır? Anatomik ve fizyolojik ölü boşluğu nasıl ölçersiniz? Alveoler ventilasyonun PaCO₂ ile ilişkisini anlatın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> V<sub>T</sub> = V<sub>A</sub> + V<sub>D</sub>. Ölü boşluk, inspire edilen havanın gaz değişimine katılmayan bölümüdür: iletici hava yollarında kalan ya da perfüze olmayan alveollere giden hava. [[K1 s. 45]]</li>
    <li><b>Üç tip, sayılarla.</b> Anatomik: üst hava yolları ve ilk 16 kuşak; 70 kg'da 150 mL, ≈2 mL/kg, V<sub>T</sub>'nin üçte biri. Alveoler: ventile ama yeterince perfüze olmayan alveoller; normalde ihmal edilebilir. Fizyolojik = anatomik + alveoler. Anestezide bunlara mekanik ölü boşluk eklenir. [[K1 s. 45, 47]]</li>
    <li><b>Etkenler.</b> Anatomik: büyük hasta, yüksek akciğer hacmi (radyal çekim) ve bronkodilatasyon artırır; sırtüstü pozisyon ve bronkokonstriksiyon azaltır. Alveoler: dik postür (zon 2), düşük pulmoner arter basıncı, PEEP ve pozitif basınçlı ventilasyon (zon 1 ve venöz dönüşün azalması), pulmoner emboli, KOAH artırır. [[K1 s. 45–46]]</li>
    <li><b>Ventilasyon denklemleri.</b> V̇<sub>E</sub> = V<sub>T</sub> × RR; V̇<sub>A</sub> = (V<sub>T</sub> − V<sub>D</sub>) × RR; V̇<sub>D</sub> = V<sub>D</sub> × RR; V̇<sub>E</sub> = V̇<sub>A</sub> + V̇<sub>D</sub>. Örnek: 500 × 15 ve 250 × 30 aynı V̇<sub>E</sub>'yi (7500 mL/dk) verir, ama V̇<sub>A</sub> 5250'ye karşı 3000 mL/dk'dır. [[K1 s. 46–47]]</li>
    <li><b>Alveoler ventilasyon ve PaCO₂.</b> PaCO₂ = K × V̇CO₂ / V̇<sub>A</sub>: hiperbolik ilişki. V̇<sub>A</sub> iki katına çıkınca PaCO₂ yarıya iner; V̇<sub>A</sub> artmadan metabolizma artarsa hiperkapni gelişir (malign hipertermide yükselen end-tidal CO₂); PaCO₂'yi V̇<sub>E</sub> değil V̇<sub>A</sub> belirler. [[K1 s. 46–47]]</li>
    <li><b>Ölçüm.</b> Anatomik: Fowler yöntemi (tek soluk N₂ yıkama; dört faz; Faz 2'de A = B orta noktası; Faz 4 küçük hava yollarının kapanması). Fizyolojik: Bohr denklemi, V<sub>D</sub>/V<sub>T</sub> = (PaCO₂ − PĒCO₂) / PaCO₂, normal 0,2–0,35; arteriyel kan gazı ve ekspire edilen CO₂ aynı anda. Alveoler: ikisinin farkı. [[K1 s. 45, 47–49]]</li>
    <li><b>Klinik bağlantıyla bitirin.</b> Mekanik ölü boşluk yeniden solumaya (PO₂ düşer, PCO₂ yükselir) yol açar; V̇<sub>A</sub>'yı korumak için V̇<sub>E</sub> artmalıdır. Pediatride özellikle önemlidir: tüpü kısaltın, kateter bağlantısını kısaltın, dirsek parçalarını azaltın. Bain yüksek taze gaz akımıyla kullanılmış gazı süpürür; halka sistemi CO₂'yi absorbe ederek yeniden solumaya izin verir. [[K1 s. 47]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada iki çizim verimlidir. Birincisi Fowler eğrisidir: eksenleri (ekspire edilen hacim, N₂ konsantrasyonu) adlandırın, dört fazı çizin, Faz 2'de A ve B alanlarını eşitleyen dikey çizgiyi anatomik ölü boşluk diye işaretleyin ve Faz 4'ün başladığı noktayı gösterin. İkincisi PaCO₂–V̇<sub>A</sub> hiperbolüdür: V̇<sub>A</sub> iki katına çıkınca PaCO₂'nin yarıya indiğini gösterin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Anatomik ölü boşluğu hangi etkenler değiştirir? PEEP alveoler ölü boşluğu hangi iki yolla artırır? Pulmoner emboli ölü boşluğu nasıl etkiler? Aynı dakika ventilasyonuyla iki hastanın PaCO₂'si neden farklı olur? Malign hipertermide end-tidal CO₂ neden yükselir? Bohr denklemini türetin. Faz 4 neden oluşur? Bebekte mekanik ölü boşluğu nasıl azaltırsınız? Cevapların hepsi yukarıda. [[K1 s. 45–49]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d11-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>V<sub>T</sub> = V<sub>A</sub> + V<sub>D</sub>. Ölü boşluk, inspire edilen havanın gaz değişimine katılmayan bölümüdür: iletici hava yolları ve perfüze olmayan alveoller. [[K1 s. 45]]</li>
    <li>Anatomik ölü boşluk üst hava yolları ve ilk 16 kuşaktır: 70 kg'da 150 mL, ≈2 mL/kg, V<sub>T</sub>'nin üçte biri. Büyük hastada, yüksek akciğer hacminde ve bronkodilatasyonda artar; sırtüstü pozisyonda ve bronkokonstriksiyonda azalır. [[K1 s. 45]]</li>
    <li>Alveoler ölü boşluk ventile ama yeterince perfüze olmayan alveollerdir; normalde ihmal edilebilir, doğrudan ölçülemez, fizyolojik ile anatomik ölü boşluğun farkı olarak hesaplanır. Dik postür, düşük pulmoner arter basıncı, PEEP ve pozitif basınçlı ventilasyon, pulmoner emboli ve KOAH artırır. [[K1 s. 45–46]]</li>
    <li>Fizyolojik ölü boşluk = anatomik + alveoler; Bohr denklemiyle V<sub>D</sub>/V<sub>T</sub> normalde 0,2–0,35'tir. [[K1 s. 45, 48]]</li>
    <li>V̇<sub>E</sub> = V<sub>T</sub> × RR = V̇<sub>A</sub> + V̇<sub>D</sub>; V̇<sub>A</sub> = (V<sub>T</sub> − V<sub>D</sub>) × RR. Aynı V̇<sub>E</sub>'de hızlı ve yüzeyel soluma alveoler ventilasyonu düşürür (5250'ye karşı 3000 mL/dk). [[K1 s. 46–47]]</li>
    <li>PaCO₂ = K × V̇CO₂ / V̇<sub>A</sub>: V̇<sub>A</sub> iki katına çıkarsa PaCO₂ yarıya iner; V̇<sub>A</sub> artmadan metabolizma artarsa hiperkapni gelişir. PaCO₂'yi V̇<sub>E</sub> değil V̇<sub>A</sub> belirler (kPa için K ≈ 0,115; Atlas notu). [[K1 s. 46–47]]</li>
    <li>Mekanik ölü boşluk yeniden solumaya yol açar; tidal hacmi aşarsa yalnızca kullanılmış gaz solunur. Bain devresi yüksek taze gaz akımıyla kullanılmış gazı süpürür, halka sistemi CO₂'yi absorbe ederek yeniden solumaya izin verir; pediatride mekanik ölü boşluk en aza indirilmelidir. [[K1 s. 47]]</li>
    <li>Fowler yöntemi (tek soluk N₂ yıkama): Faz 1 yalnızca O₂, Faz 2'nin orta noktası (A = B) anatomik ölü boşluk, Faz 3 alveoler plato, Faz 4 bağımlı bölgelerde küçük hava yollarının kapanması. Bohr denklemi ölü boşluktan CO₂ gelmediği varsayımına dayanır. [[K1 s. 48–49]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="11"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/10">← Bölüm 10 · Alveoler difüzyon</a>
    <a href="#/dersler/fizyoloji/12">Sonraki: Bölüm 12 · Statik akciğer hacimleri →</a>
  </nav>
</section>`,
};
