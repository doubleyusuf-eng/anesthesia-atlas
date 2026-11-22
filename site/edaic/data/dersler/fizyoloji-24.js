/* Fizyoloji Bölüm 24 · Oksijen toksisitesi (K1 İngilizce baskı s. 102–103).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz24.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz24-1'] = {
  no: 1, kok: 'Oksijen toksisitesi için:', kagit: 'Paper A · fizyoloji, Bölüm 24', kaynak: '[[K1 s. 102–103]]',
  onermeler: [
    { t: 'Merkezi sinir sistemi toksisitesi Lorrain Smith etkisi olarak bilinir.', d: false, n: "Yanlış. MSS toksisitesinin adı Paul Bert etkisidir; Lorrain Smith etkisi akciğer toksisitesinin adıdır (kitapta ad 'Lorraine' diye yazılır, Atlas notu). [[K1 s. 102]]" },
    { t: 'Prematüre yenidoğanda O₂’nin akciğer toksisitesi bronkopulmoner displaziye yol açar.', d: true, n: "Doğru. Daha büyük çocukta ve erişkinde ise akciğer toksisitesi absorpsiyon atelektazisi ve ARDS olarak görülür. [[K1 s. 102]]" },
    { t: 'Retrolental fibroplazi, prematüre retinopatisinin öteki adıdır.', d: true, n: "Doğru. O₂'nin retinaya toksik etkisi yenidoğanda retrolental fibroplaziye, yani prematüre retinopatisine (ROP) yol açar. [[K1 s. 102]]" },
    { t: 'Hiperbarik O₂ solunması nöbetlere ve bilinç kaybına yol açabilir.', d: true, n: "Doğru. Bu MSS toksisitesidir (Paul Bert etkisi). Su altında bilinç kaybının sonuçları ağır olduğu için dalgıçlar bu toksisiteye özellikle duyarlıdır. [[K1 s. 102–103]]" },
    { t: 'Toksisite riski inspire edilen O₂ basıncıyla artar, maruziyet süresinden ise bağımsızdır.', d: false, n: "Yanlış. Risk, inspire O₂ parsiyel basıncı yükseldikçe ve maruziyet süresi uzadıkça artar; iki etken birlikte belirleyicidir. [[K1 s. 102]]" },
  ],
};
VERI.sorular['fiz24-2'] = {
  no: 2, kok: 'O₂ molekülü, reaktif oksijen türleri (ROS) ve antioksidanlar için:', kagit: 'Paper A · fizyoloji, Bölüm 24', kaynak: '[[K1 s. 102]]',
  onermeler: [
    { t: 'Hidrojen peroksit eşleşmemiş elektron taşımadığı için reaktif oksijen türlerinden sayılmaz.', d: false, n: "Yanlış. Kitap H₂O₂'yi süperoksit anyonu ve hidroksil radikaliyle birlikte ROS arasında sayar. H₂O₂ serbest radikal değildir ama reaktif bir ara üründür; demir varlığında hidroksil radikaline dönüşebilir (Atlas notu). [[K1 s. 102]]" },
    { t: 'O₂’nin iki molekül suya indirgenmesi dört elektron gerektirir ve O₂ bu elektronları birer birer alır.', d: true, n: "Doğru. Her elektronla bir oksidasyon basamağından geçer; bilinen ara ürünler süperoksit anyonu, hidrojen peroksit ve hidroksil radikalidir. [[K1 s. 102]]" },
    { t: 'Askorbik asit (C vitamini) vücudun en önemli endojen antioksidan sistemlerinden biridir.', d: false, n: "Yanlış. C vitamini besinle alınan ekzojen bir antioksidandır. En önemli endojen sistemler glutatyon, katalaz ve süperoksit dismutaz sistemleridir. [[K1 s. 102]]" },
    { t: 'Fagositlerin, ROS sentezleyip fagozoma salgılarken O₂ tüketmesine solunumsal patlama denir.', d: true, n: "Doğru. Nötrofiller ve makrofajlar fagosite ettikleri bakterileri, ROS sentezleyip fagozomun içine salgılayarak öldürür; bu süreçteki O₂ tüketimi solunumsal patlamadır. [[K1 s. 102]]" },
    { t: 'O₂’nin eşleşmemiş elektronları çok reaktif olduğundan O₂, elektron almak için metal iyonlarına gereksinim duymaz.', d: false, n: "Yanlış. O₂'nin eşleşmemiş elektronları oldukça az reaktiftir; O₂ elektron kabul edebilmek için metal iyonlarının (metalloproteinlerdekiler gibi) yardımına gereksinim duyar. Elektron taşıma zincirinde bu işi sitokrom c oksidaz (Kompleks IV) yapar. [[K1 s. 102]]" },
  ],
};
VERI.sorular['fiz24-3'] = {
  no: 3, kok: 'Güvenli O₂ sınırı, yoğun bakım ve bleomisin için:', kagit: 'Paper A · fizyoloji, Bölüm 24', kaynak: '[[K1 s. 102–103]]',
  onermeler: [
    { t: 'İnspire edilen O₂ parsiyel basıncının 50 kPa’nın altında olması güvenli kabul edilir.', d: true, n: "Doğru. Bu sınır atmosfer basıncında FiO₂ %50'ye karşılık gelir. Risk, inspire O₂ basıncı yükseldikçe ve süre uzadıkça artar. [[K1 s. 102]]" },
    { t: 'Sağlıklı gönüllülerde 24 saat %100 O₂ solunmasından sonra akciğer işlevinde azalma gösterilmiştir.', d: true, n: "Doğru. 48 saatlik %100 O₂ maruziyetinden sonra erken ARDS bulguları gelişebilir; ancak toksisite için gereken süre ve FiO₂ hastadan hastaya belirgin biçimde değişir. [[K1 s. 103]]" },
    { t: 'Hipoksemik bir hastada O₂ toksisitesinden korunmak için FiO₂ 0,5’in üstüne çıkılmamalıdır.', d: false, n: "Yanlış. Kılavuzlar FiO₂'yi mümkün olduğunda %50'nin altında tutmayı, daha yüksek FiO₂ gerekiyorsa maruziyet süresini kısaltmayı önerir; ama hipoksemik hastada yüksek konsantrasyonda O₂, toksisite korkusuyla asla esirgenmez. [[K1 s. 103]]" },
    { t: 'Bleomisin almış bir hastada O₂ kesinlikle gerekliyse SaO₂ %88–92’yi hedefleyecek biçimde titre edilir.', d: true, n: "Doğru. Bu hastalar uyarı kartı taşır: mümkünse O₂ verilmez, gerekiyorsa SaO₂ %88–92'ye titre edilir. [[K1 s. 103]]" },
    { t: 'Bleomisin demiri şelatlar; bleomisin–demir kompleksi O₂ ile tepkimeye girerek DNA’yı parçalayan ROS oluşturur.', d: true, n: "Doğru. Oluşan ROS süperoksit ve hidroksil radikalidir (kitapta 'hydroxide' yazar; doğrusu hidroksil radikalidir, Atlas notu). Bleomisin ile O₂'ye bağlı akciğer hasarı arasındaki bağlantı yine de tartışmalıdır ve mekanizma tam çözülmemiştir. [[K1 s. 103]]" },
  ],
};

const D24_NAV = [
  ['d24-tanim', 'Hedef organlar'], ['d24-ros', 'O₂ ve ROS'], ['d24-antioks', 'Antioksidanlar'],
  ['d24-yarar', 'Yararlı ROS'], ['d24-doz', 'Ne kadar O₂?'], ['d24-bleo', 'Bleomisin'],
  ['d24-p1', 'Part I'], ['d24-p2', 'Part II'], ['d24-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/24'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 24', baslik: 'Oksijen toksisitesi',
  lede: 'Yüksek parsiyel basınçta solunan O₂ zararlı olabilir. Bu bölüm hedef organları, zararın kaynağı olan reaktif oksijen türlerini ve savunmayı, güvenli sınırı, yoğun bakımdaki uygulamayı ve bleomisinle ilişkiyi işler. [[K1 s. 102–103]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D24_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d24-tanim">
  <h2>Oksijen toksisitesi nedir?</h2>
  <p class="intro">O₂'yi yüksek parsiyel basınçta solumak birçok organa zarar verebilir; en sık etkilenen üçü merkezi sinir sistemi (MSS), akciğerler ve retinadır. [[K1 s. 102]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Üç hedef organ, üç tablo</h3></div>
    <div data-viz="f24_organlar"></div>
    <p class="viz-cap">Bir organa dokunun: toksisitenin adı ve tablosu öne çıkar. [[K1 s. 102]]</p>
    <p class="viz-foot">Silüet şematiktir.</p>
  </div>
  <div class="blk-body">
    <p>MSS toksisitesi (<b>Paul Bert etkisi</b>) hiperbarik O₂ solunurken nöbet ve bilinç kaybı yapar. Akciğer toksisitesi (<b>Lorrain Smith etkisi</b>) yaşa göre değişir: prematüre yenidoğanda bronkopulmoner displazi, daha büyük çocukta ve erişkinde absorpsiyon atelektazisi ve akut solunum sıkıntısı sendromu (ARDS). Retinada yenidoğanda retrolental fibroplazi, yani prematüre retinopatisi (ROP) gelişir. [[K1 s. 102]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitapta "Lorraine Smith" yazar; akciğer toksisitesini 1899'da tanımlayan İskoç patoloğun adı James Lorrain Smith'tir.</div>
</section>

<section class="wrap blk ders-sec" id="d24-ros">
  <h2>O₂ molekülü ve reaktif oksijen türleri</h2>
  <p class="intro">Toksisite O₂ molekülünün kendine özgü yapısından doğar: O₂ suya indirgenirken dört elektronu birer birer alır ve yol üstünde reaktif ara ürünler oluşur. [[K1 s. 102]]</p>
  <div class="viz">
    <div class="viz-head"><h3>O₂'ye dört elektron: ara basamaklar ve kaçış</h3></div>
    <div data-viz="f24_elektron"></div>
    <p class="viz-cap" aria-live="polite">İleri ile O₂'ye birer elektron ekleyin. "Serbest" görünümde ara ürünler hedeflere kaçar; "Kompleks IV'te" elektronlar metal merkezde aktarılır. [[K1 s. 102]]</p>
    <p class="viz-foot">Proton dengeleri ve ara ürünlerin Kompleks IV'te bağlı kalması atlas eklemesidir. Çizimler şematiktir; nokta eşleşmemiş elektrondur.</p>
  </div>
  <div class="blk-body">
    <p>O₂'deki iki oksijen atomunun her birinin dış kabuğunda eşleşmemiş bir elektron vardır; O₂'yi <b>paramanyetik</b> yapan budur. Eşleşmemiş elektron taşıyan moleküller (<b>serbest radikaller</b>) genellikle çok reaktiftir; O₂'ninkiler ise oldukça az reaktiftir ve O₂ elektron kabul etmek için metal iyonlarına (ör. metalloproteinlerdeki) gereksinim duyar. Elektron taşıma zincirinin sonunda bu aktarımı bakır içeren <b>sitokrom c oksidaz (Kompleks IV)</b> yapar ve su oluşur. [[K1 s. 102]]</p>
    <p>O₂ → 2 H₂O yolunda bilinen ara ürünler <b>süperoksit anyonu (O₂•⁻)</b>, <b>hidrojen peroksit (H₂O₂)</b> ve <b>hidroksil serbest radikalidir (OH•)</b>; topluca <b>reaktif oksijen türleri (ROS)</b> denir. ROS iyonlaştırıcı radyasyonla da oluşur. Toksisitenin, ROS'un nükleik asitlere, yağ asitlerine, amino asitlere ve sülfhidril içeren enzimlere verdiği zarardan kaynaklandığı düşünülür. [[K1 s. 102]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> H₂O₂'nin eşleşmemiş elektronu yoktur, yani serbest radikal değildir. Yine de zarlardan kolayca geçer ve Fe²⁺ varlığında en reaktif ROS olan hidroksil radikaline dönüşür (Fenton tepkimesi).</div>
</section>

<section class="wrap blk ders-sec" id="d24-antioks">
  <h2>Vücudun antioksidan savunması</h2>
  <p class="intro">ROS'u antioksidan sistemler temizler; oksidatif stres dönemlerinde ROS bu sistemleri aşar ve hücre hasarı gelişir. [[K1 s. 102]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Üretim ve temizleme: denge ne zaman bozulur?</h3></div>
    <div data-viz="f24_denge"></div>
    <p class="viz-cap" aria-live="polite">FiO₂'yi ve ek kaynakları artırın, savunmaları kapatın: üretim temizlemeyi aşınca fazla ROS hedeflere ulaşır ve hasar birikir. [[K1 s. 102]]</p>
    <p class="viz-foot">Şematik model, birimler keyfîdir; kapasiteler, taşma 50 kPa sınırının hemen üstünde (FiO₂ ≈ 0,6) başlayacak biçimde seçildi [[K1 s. 102]]. SOD süperoksidi H₂O₂'ye, katalaz ve glutatyon H₂O₂'yi suya çevirir (atlas eklemesi); model üçünü süzgeç olarak çizer.</p>
  </div>
  <div class="blk-body">
    <p><b>Ekzojen</b> antioksidanlar besinle alınır; örneği askorbik asittir (C vitamini). Vücudun oksidatif strese karşı birçok <b>endojen</b> sistemi vardır; en önemlileri <b>glutatyon</b>, <b>katalaz</b> ve <b>süperoksit dismutaz (SOD)</b> sistemleridir. [[K1 s. 102]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d24-yarar">
  <h2>Vücut ROS'tan yararlanır mı?</h2>
  <p class="intro">Evet: olası toksisitelerine karşın ROS, vücudun normal işleyişi için de gereklidir. [[K1 s. 102]]</p>
  <div class="viz">
    <div class="viz-head"><h3>İki hücre, iki iş</h3></div>
    <div data-viz="f24_yarar"></div>
    <p class="viz-cap">Solda fagosit, sağda tiroit folikül hücresi; oklar O₂'nin ve ROS'un izlediği yolu gösterir. [[K1 s. 102]]</p>
    <p class="viz-foot">Hücre çizimleri şematiktir.</p>
  </div>
  <div class="blk-body">
    <p>Nötrofiller ve makrofajlar fagosite ettikleri bakterileri, ROS sentezleyip fagozoma salgılayarak öldürür; bu süreçteki O₂ tüketimine <b>solunumsal patlama</b> (respiratory burst) denir. Tiroit folikül hücreleri H₂O₂ sentezler ve onu iyodür anyonlarını (I⁻) iyoda (I₂) oksitlemekte kullanır (Bölüm 81). [[K1 s. 102]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d24-doz">
  <h2>Ne kadar oksijen zararlıdır?</h2>
  <p class="intro">Risk, inspire O₂ parsiyel basıncı yükseldikçe ve maruziyet süresi uzadıkça artar; <b>50 kPa'nın altı</b> (atmosfer basıncında FiO₂ %50) güvenli kabul edilir. [[K1 s. 102]]</p>
  <div class="viz">
    <div class="viz-head"><h3>İnspire O₂ basıncı: FiO₂, ortam basıncı ve süre</h3></div>
    <div data-viz="f24_doz"></div>
    <p class="viz-cap" aria-live="polite">FiO₂'yi, süreyi ve Dalış görünümünde derinliği değiştirin; hazır örnekler kitabın sayılarını yükler. [[K1 s. 102–103]]</p>
    <p class="viz-foot">İnspire O₂ = FiO₂ × ortam basıncı, su buharı düşülmeden [[K1 s. 102]]; deniz seviyesi 101,3 kPa [[K1 s. 77]], su altında her 10 m'de +100 kPa [[K1 s. 434]]. Risk gölgesi ve 101,3 kPa (hiperbarik) çizgisi şematiktir, eşik değildir. 13,7 m ve 5,5 m yalnız 50 kPa'nın aşıldığı derinliktir; dalışta kullanılan sınır ≈ 140 kPa'dır (atlas eklemesi).</p>
  </div>
  <div class="blk-body">
    <p>Dalgıçlar MSS toksisitesine özellikle duyarlıdır: gazı hiperbarik basınçta solurlar ve su altında bilinç kaybının sonuçları ağırdır. Bu yüzden azami O₂ maruziyet sürelerini dalışın derinliğine ve su altındaki toplam süreye göre hesaplarlar. [[K1 s. 103]]</p>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem · yoğun bakım ve oksijenasyon</span>
    <p style="margin-top:8px">Sağlıklı gönüllülerde 24 saat %100 O₂'den sonra akciğer işlevinde azalma, 48 saatten sonra erken ARDS bulguları görülebilir. Ancak toksisite için gereken süre ve FiO₂ hastadan hastaya belirgin biçimde değişir. [[K1 s. 103]]</p>
    <ul style="margin-top:8px">
      <li>Yoğun bakım kılavuzlarının çoğu FiO₂'yi mümkünse <b>%50'nin altında</b> tutar; daha yüksek FiO₂ gerekiyorsa <b>süre en aza</b> indirilir. [[K1 s. 103]]</li>
      <li>Hipoksemik hastada yüksek konsantrasyonda O₂, toksisite korkusuyla <b>asla esirgenmez</b>. [[K1 s. 103]]</li>
      <li>Anestezide %100 O₂'den kaçınılır: alveolü açık tutan N₂ yıkanınca kapanan küçük hava yollarının arkasındaki gaz kana geçer ve alveol söner (absorpsiyon atelektazisi, Bölüm 26). [[K1 s. 108–109]]</li>
    </ul>
  </div>
</section>

<section class="wrap blk ders-sec" id="d24-bleo">
  <h2>Bleomisin ve oksijen toksisitesi</h2>
  <p class="intro">Bleomisin almış ve sonradan ek O₂ gereken hastada (ör. pnömoni, genel anestezi) hızla gelişen, yaşamı tehdit eden pulmoner fibrozis riski artmış görünür; bu yüzden O₂ kısıtlanır. [[K1 s. 103]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Bleomisin, demir ve O₂: adım adım</h3></div>
    <div data-viz="f24_bleomisin"></div>
    <p class="viz-cap" aria-live="polite">Adımlarla bleomisin–demir kompleksinin ROS üretmesini izleyin; son adımda SaO₂'yi kaydırarak hedef aralığı bulun. [[K1 s. 103]]</p>
    <p class="viz-foot">Molekül, DNA ve akciğer çizimleri şematiktir. 5. adımdaki "ek O₂ → daha fazla ROS" bağlantısı kitapta da yalnız olası bir açıklamadır, kanıtlanmış bir mekanizma değildir. [[K1 s. 103]]</p>
  </div>
  <div class="blk-body">
    <p>Bleomisin, Hodgkin lenfoması ve testis karsinomunda kullanılan bir kemoterapi ilacıdır; en ciddi yan etkisi, genellikle tedavinin ilk 6 ayında gelişen pulmoner fibrozistir. Bu ilacı almış hastalar <b>uyarı kartı</b> taşır: mümkünse O₂ verilmez, kesinlikle gerekliyse <b>SaO₂ %88–92</b>'ye titre edilir. [[K1 s. 103]]</p>
    <p>Bleomisin ile O₂'ye bağlı akciğer hasarı arasındaki bağlantı tartışmalıdır ve mekanizma tam çözülmemiştir. Bilinen, bleomisinin demiri şelatlayarak etki ettiğidir: bleomisin–demir kompleksi O₂ ile tepkimeye girer ve DNA'yı kesen ROS (süperoksit ve hidroksil radikali) üretir. Verilen O₂'nin, koruyucu mekanizmaları aşan fazla ROS'a yol açması kesinlikle olasıdır. [[K1 s. 103]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap bu ROS'u "superoxide and hydroxide" diye sayar; doğrusu hidroksil radikalidir (OH•). Hidroksit iyonu (OH⁻) eşleşmemiş elektron taşımaz ve ROS değildir.</div>
</section>

<section class="wrap blk ders-sec" id="d24-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu kısa bölümde MTF için akılda tutulacaklar: Paul Bert ve Lorrain Smith etkileri, yaşa göre akciğer tabloları, ROS listesi (H₂O₂ dahil), dört elektron kuralı, ekzojen ve endojen antioksidanlar, solunumsal patlama, 50 kPa sınırı, 24 ve 48 saat verileri, hipoksemide O₂'yi esirgememe ilkesi ve bleomisinde SaO₂ %88–92. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz24-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz24-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz24-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d24-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Oksijen toksisitesi nedir ve nasıl oluşur? Anestezi ve yoğun bakım pratiğinizde bunu nasıl hesaba katarsınız?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım ve hedef organlar.</b> Yüksek parsiyel basınçta solunan O₂'nin zararlı etkileri. MSS (Paul Bert; hiperbarik O₂ ile nöbet ve bilinç kaybı), akciğer (Lorrain Smith; prematürede bronkopulmoner displazi, büyük çocukta ve erişkinde absorpsiyon atelektazisi ve ARDS), retina (retrolental fibroplazi, yani ROP). [[K1 s. 102]]</li>
    <li><b>Molekülün yapısı.</b> İki eşleşmemiş elektron ve paramanyetizma. Serbest radikaller çok reaktiftir, ama O₂'nin eşleşmemiş elektronları az reaktiftir: elektron almak için metal iyonları gerekir; elektron taşıma zincirinde sitokrom c oksidaz (Kompleks IV) O₂'yi suya indirger. [[K1 s. 102]]</li>
    <li><b>ROS'un oluşumu, çizerek.</b> 2 H₂O için dört elektron, birer birer: O₂ → O₂•⁻ → H₂O₂ → OH• → 2 H₂O. İyonlaştırıcı radyasyon da ROS üretir. Hedefler: nükleik asitler, yağ asitleri, amino asitler, sülfhidril içeren enzimler. [[K1 s. 102]]</li>
    <li><b>Savunma.</b> Ekzojen (C vitamini) ve endojen (glutatyon, katalaz, SOD) antioksidanlar; oksidatif streste kapasite aşılır ve hücre hasarı gelişir. [[K1 s. 102]]</li>
    <li><b>Doz: basınç ve süre.</b> İnspire O₂ &lt;50 kPa (1 atm'de FiO₂ 0,5) güvenli. %100 O₂ ile sağlıklı gönüllülerde 24 saatte akciğer işlevi azalır, 48 saatte erken ARDS bulguları; bireysel değişkenlik büyüktür. Dalgıçta ortam basıncı her 10 m'de 100 kPa artar; dalgıç azami maruziyet süresini derinliğe ve toplam süreye göre hesaplar. [[K1 s. 102–103, 434]]</li>
    <li><b>Pratik.</b> FiO₂ mümkünse &lt;0,5, daha yüksekse en kısa süre; hipoksemide O₂ asla esirgenmez; anestezide %100 O₂ absorpsiyon atelektazisini kolaylaştırır. Bleomisin: uyarı kartı, mümkünse O₂ yok, gerekirse SaO₂ %88–92; olası mekanizma bleomisin–demir kompleksinin O₂ ile ROS üretmesidir. [[K1 s. 103, 109]]</li>
    <li><b>Dengeyle bitirin.</b> ROS yalnız zararlı değildir: fagositlerde solunumsal patlama ve tiroitte H₂O₂ ile iyodürün iyoda oksitlenmesi. [[K1 s. 102]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim dört elektron merdivenidir: O₂ → O₂•⁻ → H₂O₂ → OH• → 2 H₂O; her okun üstüne "+e⁻", ara ürünlerin altına "ROS" yazın, yanına SOD, katalaz ve glutatyonun nerede devreye girdiğini ekleyin. Zaman kalırsa inspire O₂ basıncına karşı süre grafiğinde 50 kPa sınırını ve %100 O₂'de 24 ile 48 saat işaretlerini çizin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> O₂ neden paramanyetiktir? Absorpsiyon atelektazisi nasıl oluşur ve anestezide nasıl azaltılır? ROS vücutta hangi işlerde kullanılır? Bir dalgıçta inspire O₂ basıncını nasıl hesaplarsınız? Bleomisin almış bir hastaya O₂'yi nasıl verirsiniz? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 102–103]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d24-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>O₂ toksisitesi en sık üç sistemi etkiler: MSS (Paul Bert; hiperbarik O₂ ile nöbet ve bilinç kaybı), akciğer (Lorrain Smith; prematürede bronkopulmoner displazi, büyük çocukta ve erişkinde absorpsiyon atelektazisi ve ARDS) ve retina (retrolental fibroplazi, yani ROP). [[K1 s. 102]]</li>
    <li>O₂'nin iki eşleşmemiş elektronu onu paramanyetik yapar; bu elektronlar az reaktiftir ve O₂ elektron almak için metal iyonlarına gereksinim duyar (elektron taşıma zincirinde Kompleks IV). [[K1 s. 102]]</li>
    <li>2 H₂O için dört elektron birer birer alınır; ara ürünler süperoksit anyonu, H₂O₂ ve hidroksil radikalidir (ROS). İyonlaştırıcı radyasyon da ROS üretir. [[K1 s. 102]]</li>
    <li>ROS nükleik asitlere, yağ asitlerine, amino asitlere ve –SH içeren enzimlere zarar verir. Savunma ekzojen (C vitamini) ve endojen (glutatyon, katalaz, SOD) antioksidanlardır; oksidatif streste kapasiteleri aşılır. [[K1 s. 102]]</li>
    <li>ROS yararlıdır da: fagositlerde solunumsal patlama, tiroitte H₂O₂ ile I⁻ → I₂ oksidasyonu. [[K1 s. 102]]</li>
    <li>İnspire O₂ &lt;50 kPa (1 atm'de FiO₂ 0,5) güvenlidir; risk basınç ve süreyle artar. Dalgıçta ortam basıncı her 10 m'de 100 kPa artar; dalgıç azami O₂ maruziyet süresini derinlik ve toplam süreye göre hesaplar. [[K1 s. 102–103, 434]]</li>
    <li>%100 O₂ ile 24 saatte akciğer işlevi azalır, 48 saatte erken ARDS bulguları görülebilir. FiO₂ mümkünse &lt;0,5, daha yüksekse süre kısa tutulur; hipoksemide O₂ asla esirgenmez. [[K1 s. 103]]</li>
    <li>Bleomisin (Hodgkin lenfoması, testis karsinomu) pulmoner fibrozis yapar; sonradan ek O₂ alanlarda risk artmış görünür: uyarı kartı, mümkünse O₂ yok, gerekirse SaO₂ %88–92. Bleomisin–demir kompleksi O₂ ile DNA'yı parçalayan ROS üretir. [[K1 s. 103]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="24"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/23">← Bölüm 23 · Pulmoner dolaşım</a>
    <a href="#/dersler/fizyoloji/25">Sonraki: Bölüm 25 · Ventilatuvar yetmezlik →</a>
  </nav>
</section>`,
};
