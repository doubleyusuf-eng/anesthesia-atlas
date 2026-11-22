/* Fizyoloji Bölüm 23 · Pulmoner dolaşım (K1 İngilizce baskı s. 97–101).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır (komşu bölümlerden alınan sayılar kendi sayfalarıyla). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz23-1'] = {
  no: 1, kok: 'Pulmoner dolaşım ve pulmoner vasküler direnç (PVR) için:', kagit: 'Paper A · fizyoloji, Bölüm 23', kaynak: '[[K1 s. 97–98]]',
  onermeler: [
    { t: 'Kitabın tipik değerleriyle PVR, sistemik vasküler direncin (SVR) yaklaşık yarısıdır.', d: false, n: 'Yanlış. PVR, SVR\'nin yaklaşık onda biridir: tipik değerlerle PVR 160, SVR 1568 dyn·s·cm⁻⁵ olarak hesaplanır. [[K1 s. 98]]' },
    { t: 'MPAP 15 mmHg, PCWP 5 mmHg ve kalp debisi 5 L/dk iken PVR 160 dyn·s·cm⁻⁵ olarak hesaplanır.', d: true, n: 'Doğru. PVR = 80 × (MPAP − PCWP) / CO = 80 × (15 − 5) / 5 = 160 dyn·s·cm⁻⁵; 80, birim dönüşümüyle ilgili bir sabittir. [[K1 s. 98]]' },
    { t: 'PVR hesabı için gereken değerlerin hepsi pulmoner arter kateteriyle ölçülebilir.', d: true, n: 'Doğru. MPAP, PCWP ve kalp debisi PAC ile ölçülür. PVR ve SVR hesabında gereken değerlerden yalnızca ortalama arter basıncı (MAP) PAC ile ölçülemez. [[K1 s. 98]]' },
    { t: 'Ortalama pulmoner arter basıncı yükseldikçe PVR de artar.', d: false, n: 'Yanlış. MPAP artışı PVR\'yi belirgin biçimde azaltır: düşük basınçta kapalı kapillerler yeniden açılır (recruitment), yüksek basınçta açık kapillerler genişler (distansiyon). [[K1 s. 98]]' },
    { t: 'İletici hava yollarını besleyen bronşiyal dolaşımın venöz kanının bir bölümü pulmoner venlere boşalır ve anatomik şanta katkıda bulunur.', d: true, n: 'Doğru. Bu oksijeni azalmış kan pulmoner venlerde oksijenli kanla karışır ve sistemik dolaşıma girer; anatomik şantın nedenlerinden biridir. [[K1 s. 97]]' },
  ],
};
VERI.sorular['fiz23-2'] = {
  no: 2, kok: 'Pulmoner vasküler direnci etkileyen etkenler için:', kagit: 'Paper A · fizyoloji, Bölüm 23', kaynak: '[[K1 s. 98–100]]',
  onermeler: [
    { t: 'PVR fonksiyonel rezidüel kapasitede (FRK) en düşüktür.', d: true, n: 'Doğru. Tidal solunum FRK çevresinde gerçekleştiği için PVR zamanın büyük bölümünde düşüktür ve sağ ventrikülün iş yükü azalır. [[K1 s. 99]]' },
    { t: 'Yüksek akciğer hacminde PVR artışının başlıca nedeni ekstra-alveoler damarlardaki dirençtir.', d: false, n: 'Yanlış. Yüksek hacimde gerilip biçimi bozulan alveoler kapillerlerin direnci artar; ekstra-alveoler damarlar ise radyal çekimle genişler ve dirence az katkıda bulunur. Ekstra-alveoler damarların direnci düşük akciğer hacminde baskındır. [[K1 s. 99]]' },
    { t: 'Düşük MPAP\'de PVR düşüşünün en önemli mekanizması açık kapillerlerin genişlemesidir (distansiyon).', d: false, n: 'Yanlış. Düşük MPAP\'de en önemli mekanizma kapalı kapillerlerin yeniden açılmasıdır (recruitment); distansiyon yüksek MPAP\'de öne çıkar. [[K1 s. 98]]' },
    { t: 'Tek akciğer ventilasyonunda alttaki akciğere fazla PEEP uygulanması kanı üstteki akciğere yönlendirerek hipoksemiyi ağırlaştırabilir.', d: true, n: 'Doğru. PEEP alveoler basıncı artırır, alveoler kapillerleri sıkıştırır ve alttaki akciğerin PVR\'sini yükseltir; kan ventile edilmeyen üst akciğere kayar ve V̇/Q̇ uyumsuzluğu artar. [[K1 s. 100]]' },
    { t: 'Ekstra-alveoler damarlar alveoler basınç arttığında sıkışır.', d: false, n: 'Yanlış. Alveoler basınca maruz kalan ve onun artışıyla sıkışan damarlar alveoler kapillerlerdir. Ekstra-alveoler damarlar alveoler basınca maruz kalmaz; çevredeki parankimin radyal çekimiyle açık tutulur. [[K1 s. 99]]' },
  ],
};
VERI.sorular['fiz23-3'] = {
  no: 3, kok: 'Hipoksik pulmoner vazokonstriksiyon (HPV) için:', kagit: 'Paper A · fizyoloji, Bölüm 23', kaynak: '[[K1 s. 99–100]]',
  onermeler: [
    { t: 'Otonom sinir sistemi aracılığıyla oluşur; nakledilmiş (denerve) akciğerde kaybolur.', d: false, n: 'Yanlış. HPV denerve akciğerde, yani akciğer naklinden sonra da sürer; ekstrinsik (nöral) aracılı değildir. [[K1 s. 99]]' },
    { t: 'Vazokonstriksiyonun başlıca yeri pulmoner arteriyollerdir; küçük pulmoner venüller de daha az ölçüde katkıda bulunur.', d: true, n: 'Doğru. Küçük pulmoner venüllerin venokonstriksiyonu HPV\'ye arteriyollerden daha az ölçüde katılır. [[K1 s. 99]]' },
    { t: 'N₂O\'nun HPV\'ye etkisi azdır; intravenöz anestezik ajanların ise etkisi yoktur.', d: true, n: 'Doğru. Anestezikler arasında HPV\'yi inhibe edenler volatil ajanlardır; N₂O\'nun etkisi az, intravenöz ajanların etkisi yoktur. [[K1 s. 100]]' },
    { t: 'Başlıca belirleyicisi düşük alveoler PO₂\'dir; düşük miks venöz PO₂ yanıtın yaklaşık beşte birine katkıda bulunur.', d: true, n: 'Doğru. Yanıt ağırlıklı olarak alveoler hipoksiyle başlar; miks venöz PO₂\'nin payı yaklaşık beşte birdir. [[K1 s. 99]]' },
    { t: 'Yaygın kullanılan volatil anesteziklerle belirgin HPV inhibisyonu yalnızca 1 MAC\'ın üzerinde ortaya çıkar.', d: true, n: 'Doğru. Volatil ajanlar HPV\'yi inhibe eder ve pnömonili hastada belirgin şant ile hipoksemiye yol açabilir; ancak belirgin inhibisyon 1 MAC\'ın üzerinde görülür. [[K1 s. 100]]' },
  ],
};

const D23_NAV = [
  ['d23-ozellik', 'Özellikler ve bronşiyal dolaşım'], ['d23-direnc', 'PVR ve SVR'], ['d23-basinc', 'Açılma ve genişleme'],
  ['d23-hacim', 'Akciğer hacmi'], ['d23-hpv', 'HPV'], ['d23-ornek', 'HPV klinikte'], ['d23-tav', 'Anestezi ve tek akciğer'],
  ['d23-pac', 'Pulmoner arter kateteri'], ['d23-p1', 'Part I'], ['d23-p2', 'Part II'], ['d23-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/23'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 23', baslik: 'Pulmoner dolaşım',
  lede: 'Pulmoner dolaşım kalp debisinin tamamını yalnızca 15 mmHg\'lik ortalama pulmoner arter basıncıyla taşır. Bölüm bu düşük dirençli sistemin yapısını, PVR\'yi belirleyen üç etkeni, HPV\'nin klinik ve anestezik önemini ve pulmoner arter kateterini işler. [[K1 s. 97–101]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D23_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d23-ozellik">
  <h2>Pulmoner dolaşımı kendine özgü kılan nedir?</h2>
  <p class="intro">Pulmoner dolaşım <b>düşük basınçlı, düşük dirençli ve yüksek akımlıdır</b>: kalp debisinin tamamı (5 L/dk) ortalama pulmoner arter basıncı (MPAP) yalnızca 15 mmHg iken akciğerlerden geçer. [[K1 s. 97]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Yapı: dallanma, kapiller ve bronşiyal dolaşım</h3></div>
    <div data-viz="f23_yapi"></div>
    <p class="viz-cap" aria-live="polite"><b>Dallanma.</b> Her akciğere bir pulmoner arter girer, her akciğerden ikişer, toplam en az dört pulmoner ven çıkar. Arter, ven ve bronş önce yan yana seyreder ve aynı noktalarda dallanır; çevrede ayrılırlar: arter ve bronş lobülün merkezine gider, ven lobüller arasından geçer. Öbür iki panele dokunun. [[K1 s. 97]]</p>
    <p class="viz-foot">Durağan şema; boyutlar orantılı değildir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p><b>Basınç düşük olabilir:</b> sistemik dolaşımın tersine pulmoner dolaşım, hipoksik pulmoner vazokonstriksiyon (HPV) dışında, kanı bir bölgeden ötekine yönlendirmek zorunda değildir; kanı apekslere ulaştırmak yeter. [[K1 s. 97]]</p>
    <p><b>Basınç düşük olmalıdır:</b> pulmoner kapillerler neredeyse bütünüyle alveol gazıyla çevrilidir; çok dar (7–10 µm, eritrosit ancak sıkışarak geçer), kırılgan ve bağ dokusu az olduğundan kolay genişler ya da çöker. Kapillerden alveole sıvı geçişi (pulmoner ödem) kısmen transmural basınca, yani kapiller ile alveol arasındaki basınç farkına bağlıdır. Alveoler basınç çok düşük olduğundan ödemden korunmak için kapiller basınç da düşük olmalıdır; sürfaktan da sıvı geçişini önlemeye katkıda bulunur. [[K1 s. 97]]</p>
    <p><b>Bronşiyal dolaşım:</b> iletici hava yollarının kendi kanlanması vardır ve kalp debisinin %3–5'ini alır. Oksijeni azalmış bronşiyal kanın bir bölümü pulmoner venlere dökülür, oksijenli kanla karışıp sistemik dolaşıma girer: anatomik şantın nedenlerinden biridir (Bölüm 14). [[K1 s. 97]]</p>
  </div>
  <div class="card clin" style="margin-top:12px">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Akciğer nakli ve bronşiyal dolaşım</h3>
    <p>Akciğer naklinde donörün bronşiyal arteri eskiden yeniden bağlanmazdı; greftlerin çoğu yaşadığı için bronşiyal dolaşım gereksiz sayıldı. Ancak bazı hastalarda bronşiyal dolaşımın kaybına bağlanan iskemik bronşiyolitis obliterans gelişir; bugün doğrudan bronşiyal arter revaskülarizasyonuna doğru bir eğilim vardır. [[K1 s. 97]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d23-direnc">
  <h2>Pulmoner ve sistemik vasküler direnç</h2>
  <p class="intro">Direnç, Ohm yasasının (V = IR) damar karşılığı olan <b>Darcy yasasıyla</b> hesaplanır: basınç farkı = toplam akım × vasküler direnç. Aynı akımı taşıyan pulmoner dolaşımın direnci sistemik dolaşımınkinin yaklaşık onda biridir. [[K1 s. 97–98]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Aynı akım, onda bir direnç</h3></div>
    <div data-viz="f23_direnc"></div>
    <p class="viz-cap" aria-live="polite"><b>PVR = 80 × (MPAP − PCWP) / CO</b> = 80 × (15 − 5) / 5 = 160 dyn·s·cm⁻⁵. <b>SVR ≈ 80 × (MAP − ortalama sağ atriyum basıncı) / CO</b> = 80 × (100 − 2) / 5 = 1568 dyn·s·cm⁻⁵. Basınçlar mmHg, CO L/dk; 80 birim dönüşüm sabitidir. [[K1 s. 98]]</p>
    <p class="viz-foot">Durağan şema; değerler kitabın tipik değerleridir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>İki devrede akım aynıdır (5 L/dk); farkı basınç düşüşü yapar: sistemik devrede 98, pulmoner devrede yalnızca 10 mmHg. PCWP pulmoner kapiller kama basıncı, MAP ortalama arter basıncıdır. PVR ve SVR hesabındaki değerlerin hepsi, MAP dışında, pulmoner arter kateteriyle (PAC) ölçülebilir. [[K1 s. 98]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d23-basinc">
  <h2>Basınç artınca direnç düşer: açılma ve genişleme</h2>
  <p class="intro">PVR'yi üç ana etken belirler: pulmoner arter basıncı, akciğer hacmi ve HPV. Birincisinde MPAP yükseldikçe PVR belirgin biçimde azalır. [[K1 s. 98]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Kalp debisi artınca: kapillerler önce açılır, sonra genişler</h3></div>
    <div data-viz="f23_acilma"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat.</b> Kalp debisi 5 L/dk, MPAP 15 mmHg, PCWP 5 mmHg: PVR = 80 × (15 − 5) / 5 = 160 dyn·s·cm⁻⁵. Kapillerlerin bir bölümü kapalıdır. Kalp debisini artırın: önce kapalı kapillerler açılır, hepsi açıldıktan sonra açık kapillerler genişler; PVR düştüğü için MPAP yalnızca ılımlı yükselir. [[K1 s. 98]]</p>
    <p class="viz-foot">Şematik model. İstirahat değerleri kitaptandır [[K1 s. 98]]; egzersizdeki sayılar yalnız yönü gösterir. Kesikli çizgi, direnç sabit kalsaydı MPAP'nin ne olacağını gösterir; yarıçap artışı abartılmıştır.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>İki mekanizma vardır: düşük MPAP'de kapanmış kapillerlerin yeniden açılması (<b>recruitment</b>), yüksek MPAP'de açık kapillerlerin daha da genişlemesi (<b>distansiyon</b>). Egzersizde kalp debisi çok artarken MPAP'nin yalnızca ılımlı yükselmesi bundandır. [[K1 s. 98]]</p>
    <p>Bu yedeğin bir sınırı vardır: yarış atlarında sınıra orta egzersizde ulaşılır; ağır egzersiz çok yüksek MPAP ve pulmoner kanama yapabilir. İnsanda bu sık değildir. [[K1 s. 99]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d23-hacim">
  <h2>Akciğer hacmi: alveoler ve ekstra-alveoler damarlar</h2>
  <p class="intro">İşlevsel olarak iki tür pulmoner damar vardır ve akciğer hacmi değiştikçe biçimleri ters yönde değişir; bu yüzden PVR, FRK'de en düşük olan U biçimli bir eğri çizer. [[K1 s. 99]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Akciğer hacmi ve PVR: U biçimli eğri</h3></div>
    <div data-viz="f23_hacim"></div>
    <p class="viz-cap" aria-live="polite"><b>FRK (3,0 L).</b> İki damar grubunun toplam direnci en düşüktür. Hacmi azaltın: ekstra-alveoler damarlar daralır ve PVR yükselir. Hacmi artırın: alveoler kapillerler gerilip yassılaşır ve PVR yine yükselir. [[K1 s. 99]]</p>
    <p class="viz-foot">Şematik model; dirençler göreli birimdir (FRK'deki toplam = 100). Hacimler kitabın 70 kg'lık erişkin değerleridir (RV 1,5, FRK 3,0, TLC 6,0 L, tidal hacim 0,5 L) [[K1 s. 50]]; sırtüstü yatışta FRK ≈ 1 L azalır [[K1 s. 51]]. Eğrilerin yönü kitabın şeklini izler [[K1 s. 98–99]].</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p><b>Alveoler kapillerler</b> bağ dokusu çok az olan, alveoler basınca maruz damarlardır: alveoler basınç yükselince sıkışır; yüksek hacimde gerilip biçimleri bozulur ve dirençleri belirgin artar. <b>Ekstra-alveoler damarlar</b> alveoler basınca maruz kalmaz; çevredeki parankimin radyal çekimiyle açılır; hacim büyüdükçe yarıçapları artar ve dirence katkıları azalır. [[K1 s. 99]]</p>
    <p>Düşük hacimde PVR'yi çok dar ekstra-alveoler damarlar, yüksek hacimde gerilmiş alveoler kapillerler yükseltir. Tidal solunum FRK çevresinde olduğundan PVR zamanın çoğunda düşüktür ve sağ ventrikülün iş yükü azalır: yararlı bir tasarım. [[K1 s. 99]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d23-hpv">
  <h2>Hipoksik pulmoner vazokonstriksiyon (HPV)</h2>
  <p class="intro">Sistemik damarlar doku hipoksisinde genişleyip perfüzyonu yerel metabolizmaya uydururken, pulmoner damarlar alveoler O₂ basıncı düşünce (<b>PAO₂ &lt; 8 kPa</b>) daralır ve kanı daha iyi ventile olan bölgelere yönlendirir. [[K1 s. 99]]</p>

  <div class="viz">
    <div class="viz-head"><h3>HPV: kan iyi ventile olan alveole yönelir</h3></div>
    <div data-viz="f23_hpv"></div>
    <p class="viz-cap" aria-live="polite"><b>İki birim de normal ventile.</b> PAO₂ iki birimde de 13 kPa; kan akımı eşit bölünür ve arteriyel kan iyi oksijenlenir. B biriminin PAO₂'sini 8 kPa'nın altına indirin ya da bir hazır durum seçin: HPV, B'ye giden arteriyolü daraltır ve kanı A'ya yönlendirir. [[K1 s. 99]]</p>
    <p class="viz-foot">Şematik iki birimli model. Eşik (8 kPa) ve hipoksik bölgenin akımının yarıya inmesi kitaptandır [[K1 s. 99]]; "azalmış" ve "güçlenmiş" HPV'nin büyüklüğü örnektir. Satürasyonlar standart oksihemoglobin eğrisinden hesaplanır; ventile edilmeyen birimde PAO₂ miks venöz PO₂'ye (5,3 kPa) eşit alınır [[K1 s. 30]].</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Hipoksik alveollere komşu <b>pulmoner arteriyoller</b> daralarak yerel direnci artırır; küçük pulmoner venüllerin venokonstriksiyonu daha az katkıda bulunur. Yanıt saniyeler içinde başlar, bir lobun kan akımı dakikalar içinde yarıya inebilir; hipoksi uzarsa yavaş ve sürekli bir ikinci faz gelir. [[K1 s. 99]]</p>
    <p>Kesin mekanizma bilinmiyor. Başlıca belirleyici düşük alveoler PO₂'dir; düşük miks venöz PO₂ yanıtın yaklaşık beşte birini sağlar. HPV denerve akciğerde (nakilden sonra) de sürdüğü için nöral aracılı değildir. En olası aracılar ikidir: [[K1 s. 99]]</p>
  </div>
  <div class="cols" style="margin-top:10px">
    <div class="card"><span class="tag">Endotel</span><h3 style="margin-top:8px">Nitrik oksit (NO)</h3><p>Güçlü bir pulmoner arteriyoler vazodilatatördür; PAO₂ 9,3 kPa'nın üzerindeyken pulmoner endotelde sentezlenir. Alveoler hipoksi NO yapımını azaltır ve arteriyol daralır. [[K1 s. 99]]</p></div>
    <div class="card"><span class="tag">Düz kas</span><h3 style="margin-top:8px">O₂'ye duyarlı K⁺ kanalları</h3><p>Kitaba göre alveoler hipoksi bu kanalları uyarır, arteriyol zarı depolarize olur, Ca²⁺ kanalları açılır ve arteriyol daralır. [[K1 s. 99]]</p></div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> K⁺ kanallarının açılması zarı hiperpolarize eder, depolarize etmez. Yerleşik görüşe göre hipoksi düz kastaki O₂'ye duyarlı voltaj kapılı K⁺ (Kv) kanallarını <b>inhibe eder</b>: K⁺ çıkışı azalır, zar depolarize olur, L tipi Ca²⁺ kanalları açılır ve kas kasılır.</div>
</section>

<section class="wrap blk ders-sec" id="d23-ornek">
  <h2>HPV klinikte: bölgesel yönlendirme, yaygın daralma</h2>
  <p class="intro">HPV birçok fizyolojik ve patolojik durumda belirleyicidir: hipoksi bölgeselse kanı daha iyi ventile olan alanlara yönlendirir, yaygınsa bütün akciğerde PVR'yi yükseltir. [[K1 s. 99–100]]</p>

  <div class="viz">
    <div class="viz-head"><h3>HPV'nin iki yüzü: bölgesel ve yaygın</h3></div>
    <div data-viz="f23_klinik"></div>
    <p class="viz-cap" aria-live="polite">Solda bölgesel hipoksi: kan iyi ventile olan alana yönelir. Sağda yaygın hipoksi: bütün akciğerde damarlar daralır ve PVR yükselir. Alttaki şerit HPV'yi güçlendiren ve azaltan etkenlerdir. Bir duruma dokunun. [[K1 s. 99–100]]</p>
    <p class="viz-foot">Durağan sınıflama şeması.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p><b>Bölgesel.</b> Pnömonide HPV hipoksik alveollerin yakınındaki arteriyollerin direncini artırır ve V̇/Q̇ uyumsuzluğunu azaltır. Sol ventrikül yetmezliğinde sol ventrikülün diyastol sonu basıncı ve pulmoner venöz basınç yükselir; West zonlarının etkisiyle venöz basınç tabanlarda daha yüksektir ve orada ödem yapar. Bazal alveoller hipoksik olunca HPV kanı apekslere yönlendirir: kardiyojenik ödemde <b>üst loblara yönelme</b>. [[K1 s. 100]]</p>
    <p><b>Yaygın.</b> Fetusta akciğerler açılmamıştır, PAO₂ sıfırdır: yaygın HPV nedeniyle fetal kalp debisinin yalnızca %10'u akciğerlerden geçer, kan duktus arteriyozusa yönelir. İlk solukla alveollere O₂ girer, PVR çarpıcı biçimde düşer ve pulmoner akım artar. [[K1 s. 99]] Yenidoğanın solunum sıkıntısı sendromunda sürfaktan eksikliği yüzey gerilimini artırır, yaygın atelektazi yapar ve ilk soluğu çok güçleştirir; HPV ile yüksek kalan PVR alveol perfüzyonunu bozar ve pnömositler ölür. Nekrotik pnömositlerin oluşturduğu bariyer (histopatolojik görünümünden ötürü hiyalen membran) difüzyonu bozar ve HPV'yi artırır: kısır döngü. [[K1 s. 99–100]]</p>
    <p>Yüksek irtifada düşük barometrik basınç bütün akciğerde vazokonstriksiyon ve venokonstriksiyon yapar; venokonstriksiyonun yüksek irtifa pulmoner ödeminde rolü vardır (Bölüm 87). HPV'nin bir bölümü arteriyel hipoksemiye de yanıttır: kronik akciğer hastalığına (pulmoner fibrozis, KOAH) bağlı arteriyel hipoksemisi olan bazı hastalarda yaygın HPV'ye bağlanan pulmoner arteriyel hipertansiyon ve sağ ventrikül yetmezliği (kor pulmonale) gelişir. [[K1 s. 100]]</p>
    <p><b>Değiştiren etkenler.</b> Asidoz ve hiperkapni HPV'yi artırır; alkaloz, hipokapni, vazodilatatörler (nitratlar, sodyum nitroprussid, NO), bronkodilatatörler ve volatil anestezikler azaltır. [[K1 s. 100]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d23-tav">
  <h2>Anestezide HPV, PEEP ve tek akciğer ventilasyonu</h2>
  <p class="intro">HPV kanı hipoksik alveollerden uzaklaştırarak V̇/Q̇ uyumsuzluğunu azaltır; anestezide HPV inhibe edilirse ya da PEEP kanı ventile edilmeyen akciğere iterse V̇/Q̇ uyumsuzluğu ve hipoksemi ortaya çıkar. [[K1 s. 100]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Tek akciğer ventilasyonu: PEEP ve CPAP kanı nereye gönderir?</h3></div>
    <div data-viz="f23_tak"></div>
    <p class="viz-cap" aria-live="polite"><b>PEEP yok.</b> Lateral pozisyonda alttaki akciğer ventile edilir, üstteki edilmez. Üst akciğerden geçen kan şanttır; alttaki akciğerin atelektatik kesiminden geçen kan da şanta katılır. PEEP'i adım adım artırın, sonra üst akciğere CPAP ekleyin. [[K1 s. 100]]</p>
    <p class="viz-foot">Şematik model. Kan akımı dağılımı (yerçekimi ve HPV nedeniyle alttaki akciğer lehine), PEEP'in etki büyüklüğü ve KOAH'taki 5 cmH₂O'luk intrinsik PEEP örnek sayılardır; kitap yalnız yönleri verir [[K1 s. 68, 100]]. CPAP'ın üst akciğerdeki kanı oksijenlendirme etkisi (aşağıdaki not) modelde yoktur.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>PEEP ve pozitif basınçlı ventilasyon alveoler basıncı artırır, alveoler kapillerleri sıkıştırır ve PVR'yi yükseltir. Lateral pozisyonda mediasten ve üstteki (bağımlı olmayan) akciğerin ağırlığı, ventile edilen alttaki (bağımlı) akciğerin hacmini azaltır; düşük hacimde kolaylaşan atelektazi V̇/Q̇ uyumsuzluğu ve hipoksemi yapar. [[K1 s. 100]]</p>
    <p>Alttaki akciğere PEEP atelektaziyi önler; fazlası ise bu akciğerin PVR'sini yükseltip kanı üst akciğere kaydırır ve hipoksemiyi ağırlaştırır. Üst akciğere aynı basınçta (ör. 5 cmH₂O) CPAP onun PVR'sini de artırıp kanı geri yönlendirir; sakıncası şişen üst akciğerin cerrahı rahatsız edebilmesidir (kitaba göre iki akciğer ventilasyonuna dönmekten yine de az). Paradoks olarak spirometrisi iyi hastalar KOAH'lılardan daha sık desatüre olur; kanıtlanmamış olası neden, KOAH'ta hava hapsinin intrinsik PEEP oluşturması, alttaki akciğerin hacmini artırıp atelektaziyi azaltması ve V̇/Q̇ uyumunu iyileştirmesidir. [[K1 s. 100]]</p>
    <p><b>Anestezik ajanlar.</b> Volatil anestezikler HPV'yi inhibe eder: pnömonili hastada bu ameliyat sırasında belirgin şant ve hipoksemi yapabilir. Neyse ki yaygın volatil ajanlarla belirgin inhibisyon ancak 1 MAC'ın üzerinde görülür; N₂O'nun etkisi azdır, intravenöz ajanların yoktur. HPV olmasaydı tek akciğer ventilasyonu büyük bir V̇/Q̇ uyumsuzluğu yaratırdı: HPV kanı ventile edilmeyen akciğerden ventile edilene yönlendirir (HPV bileşeninde "Tek akciğer ventilasyonu"). [[K1 s. 100]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Klinik kaynaklar, üst akciğere oksijenle uygulanan CPAP'ın asıl yararını bu akciğerin alveollerini açık ve oksijenle dolu tutarak oradan geçen kanın da oksijen almasına bağlar. Kitabın anlattığı kanın alt akciğere yönlenmesi buna eşlik eden bir etkidir.</div>
</section>

<section class="wrap blk ders-sec" id="d23-pac">
  <h2>Pulmoner arter kateteri</h2>
  <p class="intro">Akımla yönlendirilen, balon uçlu pulmoner arter kateteri (PAC, Swan–Ganz kateteri) ilerletilirken ucundaki basınç transdüsere iletilir; dalga biçimi ucun nerede olduğunu gösterir. [[K1 s. 101]]</p>

  <div class="viz">
    <div class="viz-head"><h3>PAC'ı yüzdürmek: uç ilerledikçe basınç dalgası</h3></div>
    <div data-viz="f23_pac"></div>
    <p class="viz-cap" aria-live="polite"><b>Sağ atriyum.</b> Düşük basınçlı atriyum dalgası: a, c ve v dalgaları, ortalama yaklaşık 2 mmHg. Balonu şişirin ve kateteri adım adım ilerletin. [[K1 s. 98, 101, 166]]</p>
    <p class="viz-foot">Şematik dalga biçimleri; kalp hızı 60/dk. Sağ atriyum 2 ve PCWP 5 mmHg [[K1 s. 98]], pulmoner arter 25/8 mmHg (ortalama 15) [[K1 s. 146]] kitaptandır; sağ ventrikül basıncı, dalga ayrıntıları ve derinlikler yaklaşıktır.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Kitaba göre 150 cm'lik kateter genellikle sağ internal juguler vendeki bir kılıftan sokulur; sağ ventriküle (yaklaşık 20 cm) ulaşınca balon şişirilir. Ucu kan akımı pulmoner kapaktan pulmoner artere taşır ve sonunda bir dala kama olur: okunan basınç PCWP'dir. [[K1 s. 101]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Yaygın erişkin PAC'larının kullanılabilir uzunluğu 110 cm'dir. Uygulamada balon, uç sağ atriyumdayken şişirilir ve triküspit kapaktan şişik balonla geçilir; sağ internal juguler yoldan tipik derinlikler sağ atriyum 20–25, sağ ventrikül 30–35, pulmoner arter 40–45, kama 45–55 cm'dir.</div>
  <div class="card clin" style="margin-top:12px">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Kullanımları ve neden azaldığı</h3>
    <p>PAC tanıda (ör. pulmoner hipertansiyon, akut solunum sıkıntısı sendromu), hemodinamik ölçümde (ör. kalp debisi, miks venöz O₂ satürasyonu) ve tedavide (ör. hava embolisinin aspirasyonu) kullanılır. Kritik hastalıkta geniş uygulamasına karşın kullanımı azalmıştır: genel erişkin yoğun bakım topluluğunda mortaliteyi azalttığı gösterilmemiştir; kateter enfeksiyonu, pulmoner enfarktüs ve pulmoner arter rüptürü gibi ciddi komplikasyonları vardır. [[K1 s. 101]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d23-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sayılar ve yönler üzerinden sorulur: PVR ve SVR'nin tipik değerleri ve hesabı, MPAP ile akciğer hacminin PVR'yi hangi yönde değiştirdiği, alveoler ve ekstra-alveoler damarların farkı, HPV'nin eşiği, yeri, uyaranı ve onu değiştiren etkenler, anestezik ajanların HPV'ye etkisi, tek akciğer ventilasyonunda PEEP. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz23-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz23-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz23-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d23-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Pulmoner dolaşımı sistemik dolaşımla karşılaştırın. Pulmoner vasküler direnci hangi etkenler belirler? Tek akciğer anestezisinde hipoksik pulmoner vazokonstriksiyonun önemi nedir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Çerçeve.</b> Düşük basınç, düşük direnç, yüksek akım: kalp debisinin tamamı (5 L/dk) MPAP 15 mmHg ile geçer; pulmoner arter basıncı 25/8, sistemik 140/80 mmHg. Basınç düşük olabilir (kanı yönlendirmek gerekmez, apekslere ulaşmak yeter) ve düşük olmalıdır (kırılgan, alveol gazıyla çevrili kapiller; transmural basınç ve ödem). [[K1 s. 97, 146]]</li>
    <li><b>Sayılarla.</b> Darcy yasası: direnç = basınç farkı / akım. PVR = 80 × (MPAP − PCWP) / CO = 160 dyn·s·cm⁻⁵; SVR = 80 × (MAP − sağ atriyum basıncı) / CO = 1568 dyn·s·cm⁻⁵; PVR SVR'nin yaklaşık onda biri; MAP dışındaki bütün değerler PAC ile ölçülür. [[K1 s. 98]]</li>
    <li><b>Etken 1, pulmoner arter basıncı.</b> MPAP arttıkça PVR düşer: düşük basınçta açılma (recruitment), yüksek basınçta genişleme (distansiyon); egzersizde MPAP yalnızca ılımlı yükselir. Sınırı vardır: yarış atlarında ağır egzersizde pulmoner kanama. [[K1 s. 98–99]]</li>
    <li><b>Etken 2, akciğer hacmi.</b> Alveoler kapillerler alveoler basınçla sıkışır ve yüksek hacimde gerilir; ekstra-alveoler damarlar radyal çekimle açılır, düşük hacimde daralır. Sonuç U biçimli eğridir: PVR FRK'de en düşüktür ve sağ ventrikülün iş yükü azalır. [[K1 s. 99]]</li>
    <li><b>Etken 3, HPV.</b> PAO₂ &lt; 8 kPa'da arteriyoller (daha az venüller) daralır; saniyelerde başlar, lob akımı dakikalarda yarıya inebilir, uzun hipokside ikinci faz gelir. Uyaran ağırlıklı olarak alveoler PO₂'dir (miks venöz PO₂ yaklaşık beşte bir); nöral değildir; olası aracılar NO ve O₂'ye duyarlı K⁺ kanallarıdır (hipoksi Kv kanallarını inhibe eder, Atlas notu). Asidoz ve hiperkapni artırır; alkaloz, hipokapni, vazodilatatörler, bronkodilatatörler ve volatil ajanlar azaltır. [[K1 s. 99–100]]</li>
    <li><b>HPV klinikte.</b> Fetal dolaşım ve ilk soluk; yenidoğanın solunum sıkıntısı sendromunda kısır döngü; pnömonide V̇/Q̇ uyumunun korunması; yüksek irtifada yaygın HPV ve ödem; kardiyojenik ödemde kanın üst loblara yönelmesi; kronik hipoksemide pulmoner hipertansiyon ve kor pulmonale. [[K1 s. 99–100]]</li>
    <li><b>Tek akciğer anestezisiyle bitirin.</b> HPV kanı ventile edilmeyen akciğerden uzaklaştırır ve hipoksemiyi sınırlar. Volatil ajanlar belirgin inhibisyonu ancak 1 MAC'ın üstünde yapar; N₂O'nun etkisi az, intravenöz ajanların yoktur. Alttaki akciğere PEEP atelektaziyi önler, fazlası kanı üst akciğere kaydırır; üstteki akciğere aynı basınçta CPAP kanı geri yönlendirir. Normal akciğerli hastalar KOAH'lılardan daha sık desatüre olur (olası neden intrinsik PEEP). [[K1 s. 100]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim PVR–akciğer hacmi grafiğidir: yatay eksende rezidüel volüm, FRK ve TLC; alveoler damar direnci hacimle yükselen, ekstra-alveoler damar direnci hacimle düşen bir eğri, toplam PVR ise ikisinin toplamı olan ve FRK'de en düşük noktaya inen U biçimli eğri. Yanına PVR–MPAP grafiğini ekleyin: MPAP arttıkça düşen bir eğri; sol kesimini "açılma", sağ kesimini "genişleme" diye adlandırın.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Bronşiyal dolaşım şanta nasıl katılır, akciğer naklinde neden önemlidir? Fetal dolaşımda PVR neden yüksektir, ilk solukta ne olur? HPV'yi hangi ilaçlar ve durumlar azaltır? "Normal" akciğerli hasta tek akciğer ventilasyonunda neden daha sık desatüre olur? PAC ilerletilirken basınç dalgası nasıl değişir? Cevapların hepsi yukarıda. [[K1 s. 97–101]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d23-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Pulmoner dolaşım düşük basınçlı, düşük dirençli ve yüksek akımlıdır: kalp debisinin tamamı MPAP 15 mmHg ile geçer; düşük kapiller basınç ödemi önlemek için zorunludur. [[K1 s. 97]]</li>
    <li>Bronşiyal dolaşım (CO'nun %3–5'i) iletici hava yollarını besler; venöz kanının bir bölümü pulmoner venlere boşalıp anatomik şanta katılır; nakilde kaybı iskemik bronşiyolitis obliteransla ilişkilendirilir. [[K1 s. 97]]</li>
    <li>PVR = 80 × (MPAP − PCWP) / CO ≈ 160 dyn·s·cm⁻⁵, SVR ≈ 1568 dyn·s·cm⁻⁵: PVR SVR'nin yaklaşık onda biridir. [[K1 s. 98]]</li>
    <li>MPAP arttıkça PVR düşer: düşük basınçta açılma, yüksek basınçta genişleme; egzersizde MPAP yalnızca ılımlı yükselir. [[K1 s. 98]]</li>
    <li>PVR FRK'de en düşüktür; düşük hacimde ekstra-alveoler, yüksek hacimde alveoler damarların direnci baskındır. [[K1 s. 99]]</li>
    <li>HPV: PAO₂ &lt; 8 kPa'da arteriyoller daralır ve kan iyi ventile olan bölgelere yönelir; saniyelerde başlar, nöral değildir; asidoz ve hiperkapni artırır, alkaloz, hipokapni, vazodilatatörler, bronkodilatatörler ve volatil ajanlar azaltır. [[K1 s. 99–100]]</li>
    <li>Volatil ajanlar HPV'yi belirgin olarak ancak 1 MAC'ın üstünde inhibe eder; N₂O'nun etkisi az, intravenöz ajanların yoktur. Tek akciğer ventilasyonunda fazla PEEP kanı üst akciğere kaydırır, üst akciğere aynı basınçta CPAP geri yönlendirir. [[K1 s. 100]]</li>
    <li>PAC'ın yeri uçtaki basınç dalgasıyla izlenir (sağ atriyum, sağ ventrikül, pulmoner arter, kama); mortaliteyi azalttığı gösterilmemiştir ve ciddi komplikasyonları vardır. [[K1 s. 101]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="23"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/ek22">← Ek ders · Nefes tutma, egzersiz ve anestezik ajanların ventilasyon kontrolüne etkisi</a>
    <a href="#/dersler/fizyoloji/24">Sonraki: Bölüm 24 · Oksijen toksisitesi →</a>
  </nav>
</section>`,
};
