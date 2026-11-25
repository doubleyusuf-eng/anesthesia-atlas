VERI.sorular = VERI.sorular || {};
VERI.sorular['far10d-1'] = {
  no: 1, kok: 'NSAİİ’lerin etkilerini ve kinetiğini değerlendirin.', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 161–163]]',
  onermeler: [
    { t: 'Diklofenakın inaktif metabolitlerinin çoğu safrayla atılır.', d: false, n: 'İdrarın payı %60, safranın payı %40’tır. [[K3 s. 161]]' },
    { t: 'Ketorolakın analjezik etkisi güçlüdür.', d: true, n: 'Analjezik ve antipiretik etkileri güçlü, antiinflamatuvar etkisi sınırlıdır. [[K3 s. 161]]' },
    { t: 'İbuprofenin aktif enantiyomeri R biçimidir.', d: false, n: 'Aktif biçim S-deksibuprofendir. [[K3 s. 162]]' },
    { t: 'Tenoksikamın uzun eliminasyon yarı ömrü günde tek doza olanak verir.', d: true, n: 'Eliminasyon yarı ömrü 72 saattir. [[K3 s. 162]]' },
    { t: 'Meloksikam bağırsaktan hızla emilir.', d: false, n: 'Emilim yavaş ve hemen hemen tamdır. [[K3 s. 163]]' },
  ],
};
VERI.sorular['far10d-2'] = {
  no: 2, kok: 'Spesifik COX-2 inhibitörlerini karşılaştırın.', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 163–166]]',
  onermeler: [
    { t: 'Selekoksibin COX-1:COX-2 inhibisyon oranı 1:30’dur.', d: true, n: 'Kitap selekoksib için 1:30 oranını verir. [[K3 s. 163]]' },
    { t: 'Parekoksibin kendisi farmakolojik olarak aktiftir.', d: false, n: 'Etki, ön ilacın valdekoksibe dönüşmesiyle ortaya çıkar. [[K3 s. 164–165]]' },
    { t: 'Valdekoksibin eliminasyon yarı ömrü 8 saattir.', d: true, n: 'Valdekoksib için 8 saat, parekoksib için 20 dakika bildirilir. [[K3 s. 166]]' },
    { t: 'Etorikoksibin metabolizmasında başlıca izoenzim CYP3A4’tür.', d: true, n: 'Karaciğerdeki oksidasyona en büyük katkıyı CYP3A4 verir. [[K3 s. 166]]' },
    { t: 'Etorikoksibin yarı ömrü izole böbrek yetmezliğinde uzar.', d: false, n: 'Yarı ömür izole böbrek yetmezliğinde değişmez, karaciğer yetmezliğinde uzar. [[K3 s. 166]]' },
  ],
};
VERI.sorular['far10d-3'] = {
  no: 3, kok: 'Antiromatizmal ilaçların mekanizmalarını ve izlemini değerlendirin.', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 167–168]]',
  onermeler: [
    { t: 'Romatoid artritte sülfasalazinin etkin bileşeni 5-ASA’dır.', d: false, n: 'Romatoid artritte sülfapiridin, inflamatuvar bağırsak hastalığında 5-ASA etkindir. [[K3 s. 168]]' },
    { t: 'Metotreksatın romatolojik kullanımında doz aralığı bir haftadır.', d: true, n: 'Oral ya da parenteral metotreksat haftalık verilir. [[K3 s. 167]]' },
    { t: 'Uzun süre hidroksiklorokin kullananlarda retina taraması önerilir.', d: true, n: 'Retina taraması uzun süreli kullanımın izlemine girer. [[K3 s. 168]]' },
    { t: 'Biyolojik DMARD’lar latent tüberkülozun reaktivasyonuna yol açabilir.', d: true, n: 'Latent enfeksiyonlar yeniden etkinleşebilir ve yeni enfeksiyonlara yatkınlık artabilir. [[K3 s. 168]]' },
    { t: 'Tosilizumab kullananlarda postoperatif enfeksiyon sırasında CRP artışı gecikebilir.', d: true, n: 'Enfeksiyon başladığında CRP yanıtı henüz belirginleşmemiş olabilir. [[K3 s. 168]]' },
  ],
};

const A10D_NAV = [
  ['agri','Diklofenak ve diğer NSAİİ’ler'], ['oksikam','Oksikamlar'], ['cox','COX-2 seçiciliği'],
  ['pare','Parekoksib'], ['dmard','Geleneksel DMARD’lar'], ['ameliyat','Perioperatif yönetim'],
  ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];
SAYFALAR['dersler/farmakoloji/10d'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 10 · Ders 10d',
  baslik: "Tek tek NSAİİ'ler ve COX-2 inhibitörleri",
  lede: 'Ketorolak güçlü analjezi sağlar, ancak inflamasyon üzerindeki etkisi sınırlıdır. [[K3 s. 161]] Antiromatizmal ilaçlar ise hastalığın seyrini değiştirerek ağrıyı azaltabilir. [[K3 s. 167]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A10D_NAV.map(([id, ad]) => `<button type="button" data-scroll="a10d-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a10d-agri">
  <h2>Diklofenak, ketorolak, fenilbutazon ve ibuprofen</h2>
  <p class="intro">Analjezi gücü, antiinflamatuvar etki ve toksisite bu dört ilaçta farklı ağırlık taşır. [[K3 s. 161–162]]</p>
  <div class="viz"><div class="viz-head"><h3>İlaç seçimi ağrı ve inflamasyon profilini nasıl değiştirir?</h3></div><div data-viz="a10d_profil"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel karşılaştırma. [[K3 s. 161–162]]</p></div>
  <h3>Diklofenak</h3>
  <ul class="ozet">
    <li><b>Kullanım.</b> Bu fenilasetik asit türevi hafif–orta postoperatif ağrıda tek başına, şiddetli ağrıda opioid gereksinimini azaltmak için kullanılabilir. [[K3 s. 161]] Özellikle renal kolikte yararlıdır. [[K3 s. 161]]</li>
    <li><b>Sunum ve doz.</b> Oral, rektal veya parenteral verilir. [[K3 s. 161]] Erişkinde üst sınır bölünmüş dozlarda 150 mg/gün, çocukta minör cerrahi ağrısında (tonsillektomi, inguinal herniyotomi) günde üç kez 1 mg/kg’dır. [[K3 s. 161]]</li>
    <li><b>Organ etkileri.</b> Majör cerrahide yan etkiler kullanımı sınırlar, özellikle böbrek işlevi bozulabilir. [[K3 s. 161]] Kronik kullanımda koroner olay riskindeki artış COX-2 inhibitörlerine benzediğinden kitap ilk seçenek olarak kullanımını önermez. [[K3 s. 161]] Gastrik irritasyon indometazin ve aspirinden daha azdır. [[K3 s. 161]]</li>
    <li><b>Enjeksiyon.</b> İrritan preparatın kas içi enjeksiyonu çok ağrılı olabilir ve kas hasarıyla ilişkilidir. [[K3 s. 161]] İntravenöz enjeksiyon lokal tromboza yol açar. [[K3 s. 161]]</li>
    <li><b>Etkileşim.</b> Lityum ve digoksin düzeyleri yükselebilir. [[K3 s. 161]] Oral antikoagülanlar ve oral hipoglisemikler genellikle etkilenmez, ancak tekil bildirimler yakın izlemi destekler. [[K3 s. 161]]</li>
    <li><b>Kinetik.</b> Bağırsaktan iyi emilir, proteine %99 bağlanır ve dağılım hacmi küçüktür (0,15 L/kg). [[K3 s. 161]] Karaciğerde hidroksilasyon ve konjugasyonla oluşan inaktif metabolitlerin %60’ı idrarla, %40’ı safrayla atılır. [[K3 s. 161]]</li>
  </ul>
  <div class="cols">
    <div class="card"><h3>Ketorolak</h3><p>Güçlü analjezik ve antipiretik, ancak sınırlı antiinflamatuvar etkili bir asetik asit türevidir. [[K3 s. 161]] Oral veya parenteral verilebilir ve etkisi 6 saate kadar sürer. [[K3 s. 161–162]] Yan etkileri NSAİİ sınıfıyla ortaktır. [[K3 s. 162]]</p></div>
    <div class="card"><h3>Fenilbutazon</h3><p>Agranülositoz ve aplastik anemi riski kullanımı hastanede tedavi edilen ankilozan spondilit hastalarıyla sınırlar. [[K3 s. 162]] Proteinlere belirgin bağlanır ve yüksek oranda bağlanan diğer ilaçlarla etkileşir. [[K3 s. 162]] Karaciğer işlev bozukluğu, döküntü ve sodyum-su retansiyonu gelişebilir. [[K3 s. 162]]</p></div>
  </div>
  <h3>İbuprofen</h3><ul class="ozet">
    <li><b>Etkin biçim.</b> Diğer propiyonatlar gibi bir kiral merkezli, iki enantiyomerli rasemattır. [[K3 s. 162]] Bağırsak ve karaciğerdeki izomeraz, inaktif R biçiminin büyük bölümünü aktif S-deksibuprofene dönüştürür. [[K3 s. 162]]</li>
    <li><b>Kullanım ve sunum.</b> Diğer NSAİİ’lerin advers etkileri belirginleştikçe ibuprofen kullanımı artmıştır. [[K3 s. 162]] Kitap tablet, oral süspansiyon ve topikal preparatları sayar, parenteral ve rektal form bulunmadığını belirtir. [[K3 s. 162]]</li>
    <li><b>Doz.</b> Erişkinde günde üç kez 400 mg, gerekirse günde üç kez 800 mg verilir. [[K3 s. 162]] Çocuk dozu günde üç kez 10 mg/kg’dır. [[K3 s. 162]]</li>
    <li><b>Etki ve risk.</b> Düşük doz, NSAİİ reçeteleme yaklaşımını değiştiren protrombotik olaylarda artışla ilişkili değildir. [[K3 s. 162]] Birçok NSAİİ’ye göre yan etkileri daha az, antiinflamatuvar etkisi daha zayıftır ve 1,2 g/gün altında kronik inflamatuvar hastalıklarda yetersiz kalabilir. [[K3 s. 162]]</li>
    <li><b>Kinetik.</b> Bağırsaktan hızla emilir ve proteinlere yüksek oranda bağlanır. [[K3 s. 162]] Karaciğerde P450 ile inaktif hidroksi ve karboksi metabolitleri oluşur, glukuronidasyonun payı küçüktür. [[K3 s. 162]] Tüm metabolitler böbrekten atılır. [[K3 s. 162]]</li></ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap ibuprofenin parenteral ve rektal preparatının bulunmadığını söyler. İntravenöz ve rektal ibuprofen preparatları vardır, bulunabilirlik ülkeye göre değişir.</div>
</section>
<section class="wrap blk ders-sec" id="a10d-oksikam">
  <h2>Tenoksikam ve meloksikam</h2>
  <p class="intro">Tenoksikamın perioperatif avantajı hızlı intravenöz başlangıç ve uzun etkidir, meloksikamın ayırt edici özelliği ise COX-2’yi tercihli inhibe etmesidir. [[K3 s. 162–163]]</p>
  <div class="viz"><div class="viz-head"><h3>İnaktif metabolitler hangi yoldan atılır?</h3></div><div data-viz="a10d_atilim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çubuklar atılım yüzdelerini aynı ölçekte gösterir. [[K3 s. 163]]</p></div>
  <div class="cols"><div class="card"><h3>Tenoksikam</h3><ul>
    <li>Diğer NSAİİ’lerle birçok özelliği ortaktır. [[K3 s. 162]] İntravenöz uygulamada hızla etkir, 72 saatlik eliminasyon yarı ömrü uzun etki ve günde tek doz sağlar. [[K3 s. 162]] Yan etkiler belirginleştiğinde uzun etki dezavantaj olabilir. [[K3 s. 162]]</li>
    <li>Bağırsaktan iyi emilir, oral biyoyararlanımı yüksektir ve plazma proteinlerine %99 bağlanır. [[K3 s. 163]] Doz 20 mg/gün’dür. [[K3 s. 163]]</li></ul></div>
  <div class="card"><h3>Meloksikam</h3><ul>
    <li>Tablet veya supozituvarla başlangıç dozu 7,5 mg/gün’dür ve iki katına çıkarılabilir. [[K3 s. 163]] COX-2’ye karşı potensinin 3–50 kat yüksek olduğu bildirilir, seçiciliği sınırlıdır. [[K3 s. 163]]</li>
    <li>Renal yan etkiler diğer NSAİİ’lere benzer görünür, ancak 7,5 mg/gün dozunda gastrointestinal profil diklofenaktan daha olumludur. [[K3 s. 163]]</li>
    <li>Yavaş ve hemen hemen tam emilir, oral biyoyararlanımı %90’dır. [[K3 s. 163]] Başlıca albümine olmak üzere proteinlere %99 bağlanır ve eliminasyon yarı ömrü 20 saattir. [[K3 s. 163]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a10d-cox">
  <h2>Spesifik COX-2 inhibitörleri</h2>
  <p class="intro">COX-2 seçiciliğiyle umulan gastrointestinal kazanç sınırlı kaldı ve majör vasküler olaylar belirginleşti. [[K3 s. 163]]</p>
  <div class="viz"><div class="viz-head"><h3>COX-1’e göre COX-2 inhibisyonu</h3></div><div data-viz="a10d_oran"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">COX-1:COX-2 inhibisyon oranları. [[K3 s. 163–164]] [[K3 s. 166]]</p></div>
  <p>COX-2’nin 1988’deki keşfi, gastrointestinal yan etkileri olmayan bir NSAİİ beklentisi doğurdu. [[K3 s. 163]] İlk ruhsatlı ajan rofekoksib, beş yılda 80 milyon hastaya reçete edildi ve yılda 2,5 milyar ABD doları gelir getirdi. [[K3 s. 163]] İlaç 2004’te çekildi, üretici tazminat, uzlaşma ve cezalara yüz milyonlarca dolar ödedi. [[K3 s. 163]]</p>
  <div class="note"><b>Vasküler risk.</b> Kitabın aktardığı İlaç Güvenliği Komitesi, iskemik kalp hastalığı, serebrovasküler hastalık, hafif kalp yetmezliği ve periferik damar hastalığını kontrendikasyon sayar. [[K3 s. 163]] Hipertansiyon, hiperlipidemi, diyabet ve sigara kullanımı tedaviden önce dikkatle değerlendirilmelidir. [[K3 s. 163]]</div>
  <h3>Selekoksib</h3><ul class="ozet">
    <li><b>Kullanım.</b> Kitapta 100 mg tablet olarak geçer. [[K3 s. 163]] Osteoartrit ve romatoid artrite bağlı kronik ağrıda en çok günde iki kez 200 mg kullanılır, postoperatif dönemde de etkili bulunmuştur. [[K3 s. 163]]</li>
    <li><b>CLASS.</b> Ülser komplikasyonları nonspesifik NSAİİ’lerle benzer sıklıktaydı, ancak eşzamanlı aspirin sonucu etkilemiş olabilir. [[K3 s. 164]] İnme ve miyokart enfarktüsü artmazken sınıfı inceleyen meta-analizler koroner olaylarda artış gösterdi. [[K3 s. 164]] Kitap iskemik kalp veya serebrovasküler hastalığı olanlarda ve risk taşıyanlarda selekoksibden kaçınılmasını önerir. [[K3 s. 164]]</li>
    <li><b>Kinetik.</b> Plazma doruğu 2–3 saatte, eliminasyon yarı ömrü 8–12 saattir. [[K3 s. 164]] Proteine bağlanma %97, dağılım hacmi 5,7 L/kg’dır. [[K3 s. 164]] Hepatik CYP2C9 inaktif metabolitler oluşturur, idrarda az miktarda değişmemiş ilaç bulunur. [[K3 s. 164]]</li>
    <li><b>Etkileşim ve alerji.</b> Kitap CYP2C9 inhibisyonuyla düzey artışına omeprazolü, indüksiyonla düşüşe karbamazepini örnek verir. [[K3 s. 164]] Sülfonamid grubu içerdiğinden kitap sülfonamid alerjisinde kullanılmamasını belirtir. [[K3 s. 164]]</li></ul>
  <h3>Etorikoksib</h3><ul class="ozet">
    <li><b>Profil.</b> COX-2’ye çok seçici bir metilsülfondur ve COX-1 inhibitörleriyle karşılaştırıldığında etkili analjezi sağlamıştır. [[K3 s. 166]] Kitap Birleşik Krallık’ta ruhsatlı olduğunu, ABD’de onaylanmadığını bildirir. [[K3 s. 166]]</li>
    <li><b>Kinetik.</b> İyi emilir, oral biyoyararlanımı &gt;%95, dağılım hacmi 1,5 L/kg ve proteine bağlanması %90’dır. [[K3 s. 166]] Eliminasyon yarı ömrü 22 saattir, karaciğer yetmezliğinde uzar ve izole böbrek yetmezliğinde değişmez. [[K3 s. 166]]</li>
    <li><b>Enzimler.</b> Hepatik P450 oksidasyonunda CYP3A4 baskındır, özgül inhibisyonunda diğer izoenzimlerin katkısı artabilir. [[K3 s. 166]] Etorikoksib CYP2D6, CYP3A ve CYP2C9’u zayıf inhibe eder. [[K3 s. 166]]</li>
    <li><b>Güvenlilik.</b> Gastrik irritasyon plaseboya benzer ve COX-1 inhibitörlerinden anlamlı ölçüde azdır, ancak 9–12 ayı aşan tedavide bu avantaj azalır. [[K3 s. 166]] Sınırlı veri, majör vasküler olay riskinin diklofenaka benzediğini düşündürür. [[K3 s. 166]]</li></ul>
  <div class="note plain"><b>Atlas notu.</b> Kitabın Şekil 10.6’sı etorikoksibde sülfonamid grubu gösterir. Doğru yapı, metinde de belirtildiği gibi metilsülfon içerir.</div>
</section>
<section class="wrap blk ders-sec" id="a10d-pare">
  <h2>Parekoksibden valdekoksibe</h2>
  <p class="intro">Parenteral parekoksib etkisiz bir ön ilaçtır ve etkisi karaciğerde valdekoksibe dönüşmesine bağlıdır. [[K3 s. 164–165]]</p>
  <div class="viz"><div class="viz-head"><h3>Ön ilaç, aktif bileşik ve metabolitler</h3></div><div data-viz="a10d_hidroliz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel dönüşüm basamakları. [[K3 s. 164–166]]</p></div>
  <ul class="ozet">
    <li><b>Hazırlama ve doz.</b> Parenteral COX-2 antagonisti parekoksib %0,9 salinle sulandırılır. [[K3 s. 164]] Başlangıçta 40 mg, ardından 6–12 saatte bir 20–40 mg verilir, üst sınır 80 mg/gün’dür. [[K3 s. 164]]</li>
    <li><b>Organ işlevi.</b> Hepatik eliminasyon nedeniyle böbrek işlev bozukluğu kinetiği etkilemez, ağır karaciğer işlev bozukluğunda kullanım önerilmez. [[K3 s. 165]]</li>
    <li><b>Birlikte verilen ilaçlar.</b> Flukonazol CYP2C9’u inhibe ettiğinden doz azaltılır. [[K3 s. 165]] Ketokonazolle veya CYP3A4 substratı midazolamla birlikte doz ayarı gerekmez. [[K3 s. 165]]</li>
    <li><b>Valdekoksibin etkilediği ilaçlar.</b> CYP2D6 inhibisyonuyla flekainid ve metoprololün, CYP2C19 inhibisyonuyla omeprazol, fenitoin ve diazepamın plazma düzeyleri yükselebilir. [[K3 s. 165–166]]</li>
    <li><b>Deri reaksiyonları.</b> Valdekoksib ciddi dermatolojik yan etkiler nedeniyle Nisan 2005’te piyasadan çekildi. [[K3 s. 164]] Kullanımı süren parekoksible benzer bir ilişki saptanmaması kısa süreli kullanıma bağlı olabilir. [[K3 s. 164]]</li>
    <li><b>Duyarlılık.</b> Sülfonamide duyarlı kişilerde valdekoksible eksfolyatif dermatit, Stevens–Johnson sendromu, toksik dermal nekroliz ve anjiyoödem bildirilmiştir. [[K3 s. 166]] Genel bildirim sıklığı yaklaşık milyonda sekizdir ve valdekoksib bu hasta grubunda kontrendikedir. [[K3 s. 166]]</li>
    <li><b>Yapı.</b> Parekoksibin aromatik olmayan sülfonamid grubu furosemid ve tolbutamiddeki gruba benzer. [[K3 s. 166]] Kitap, furosemid ve tolbutamidin sülfonamid duyarlılığında kontrendike olmadığını belirtir. [[K3 s. 166]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a10d-dmard">
  <h2>Geleneksel antiromatizmal ilaçlar</h2>
  <p class="intro">Hastalığı modifiye eden antiromatizmal ilaçlar (DMARD’lar) bağışıklığı baskılar ve ağrılı hastalığın seyrini değiştirerek ağrıyı azaltır. [[K3 s. 167]]</p>
  <div class="viz"><div class="viz-head"><h3>Sülfasalazinde hastalığa göre etkin bileşen</h3></div><div data-viz="a10d_bilesen"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 168]]</p></div>
  <p>DMARD’ların kullanım alanları romatoid artrit, vaskülit ve inflamatuvar bağırsak hastalığını içerir. [[K3 s. 167]] Metotreksat, leflunomid, hidroksiklorokin ve sülfasalazin uzun süredir kullanılan geleneksel ajanlardır, siklofosfamid, siklosporin ve takrolimus da bu gruptadır. [[K3 s. 167]]</p>
  <h3>Metotreksat</h3><ul class="ozet">
    <li><b>Uygulama.</b> Oral veya parenteral doz haftalıktır, reçeteleme hataları geçmişte ciddi ilaç hatalarına yol açmıştır. [[K3 s. 167]]</li>
    <li><b>Folat yolu.</b> Folata yapısal benzerliği sayesinde dihidrofolatla dihidrofolat redüktaza bağlanmak için yarışır. [[K3 s. 167]] Pürin ve pirimidin metabolizması, amino asit ve poliamin sentezi için kullanılabilir aktif folat azalır. [[K3 s. 167]]</li>
    <li><b>Adenozin.</b> Hücre dışında adenin nükleozidlerinin defosforilasyonu güçlü antiinflamatuvar adenozinin hücre dışı düzeyini artırır. [[K3 s. 167]] Metotreksatın T hücreleri ve mononükleer hücreler üzerinde de yaygın etkileri vardır. [[K3 s. 167]]</li>
    <li><b>Gebelik ve organ toksisitesi.</b> Teratojenite nedeniyle gebelikte ve gebelik planlarken kaçınılmalıdır. [[K3 s. 167]] Doğrudan embriyotoksik etkisi ektopik gebelik tedavisinde kullanılmıştır. [[K3 s. 167]] Böbrek hastalığında kontrendikedir, akciğer ve karaciğer toksisitesi görülebilir. [[K3 s. 167]]</li>
    <li><b>İzlem.</b> Ani kemik iliği baskılanması nedeniyle düzenli kan testleri gerekir. [[K3 s. 167]] Enfeksiyon bulguları, morarma, ağız ülseri ve nefes darlığı bildirilmelidir, bunlar ilik baskılanması, enfeksiyon veya gastrointestinal mukoza sorunlarının işareti olabilir. [[K3 s. 167–168]] Folat desteği dozun etkinliğini düşürmeden belirtileri hafifletebilir. [[K3 s. 168]]</li></ul>
  <div class="cols"><div class="card"><h3>Sülfasalazin</h3><p>Etki mekanizması tam aydınlatılmamıştır. [[K3 s. 168]] Uykusuzluk, tat bozukluğu ve tinnitus sık görülür. [[K3 s. 168]] Nadir fakat ciddi agranülositoz nedeniyle kan sayımı düzenli izlenir, açıklanamayan morarma, kanama ve enfeksiyon belirtilerinin bildirilmesi istenir. [[K3 s. 168]]</p></div>
  <div class="card"><h3>Hidroksiklorokin</h3><p>Romatoid artrit ve sistemik lupusta da yararlı bir antimalaryaldir. [[K3 s. 168]] Karın ağrısı, diyare ve duygusal labilite sıktır, uzun kullanımda retina taraması önerilir. [[K3 s. 168]]</p>
  <p>Aşırı doz son derece toksiktir. [[K3 s. 168]] Sodyum kanalı blokajı koma dahil nörolojik bulgulara ve erken kardiyak bulgulara (QTc uzaması, Torsades des Pointes, kardiyak arrest) yol açar. [[K3 s. 168]] Toksisitenin şiddeti alınan dozla ve başvurudaki hipokaleminin derecesiyle yakından ilişkilidir. [[K3 s. 168]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="a10d-ameliyat">
  <h2>Biyolojik ajanlar ve perioperatif yönetim</h2>
  <p class="intro">DMARD kullanan hastada ameliyat sonrası yeniden başlama kararı, yara iyileşmesine ve enfeksiyon bulgularına bağlıdır. [[K3 s. 168]]</p>
  <div class="viz"><div class="viz-head"><h3>İkinci haftada yeniden başlanabilir mi?</h3></div><div data-viz="a10d_yara"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel karar ağacı, kitabın yaklaşımı. [[K3 s. 168]]</p></div>
  <ul class="ozet">
    <li><b>Hedefler.</b> Yeni biyolojik DMARD’lar bağışıklığın özgül basamaklarını hedefler. [[K3 s. 168]] Sitokinlerin işlevi, sinyal iletimi veya üretimine müdahale edebilir, T hücresi aktivasyonunu baskılayabilir ya da B hücrelerini tüketebilirler. [[K3 s. 168]]</li>
    <li><b>Riskler.</b> Tümünde yaşamı tehdit edebilen miyelosupresyon ve buna bağlı belirtiler, latent enfeksiyonların (tüberküloz dahil) reaktivasyonu ve yeni enfeksiyonlara yatkınlık görülebilir. [[K3 s. 168]] Yara iyileşmesi bozulabilir. [[K3 s. 168]]</li>
    <li><b>Ameliyat öncesi.</b> Kitabın şeması belirli ilaçların kesilme sürelerini hafta cinsinden verir, yüksek riskli abdominal cerrahi ve revizyon artroplastisinde bu süreleri 2,5 ile çarpar. [[K3 s. 167]]</li>
    <li><b>Enfeksiyon izlemi.</b> Kitap, tosilizumabın CRP üretimi için önemli IL-6’nın üretimini baskıladığını yazar ve CRP’yi “C reaktif peptit” olarak açar. [[K3 s. 168]] Postoperatif enfeksiyonda CRP yükselişi gecikebilir. [[K3 s. 168]]</li></ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap tosilizumabın IL-6 üretimini baskıladığını söyler ve CRP’yi peptit olarak adlandırır. Tosilizumab çözünür ve membrana bağlı IL-6 reseptörleri üzerinden sinyali engeller, CRP ise C-reaktif proteindir.</div>
</section>

<section class="wrap blk ders-sec" id="a10d-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far10d-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far10d-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far10d-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a10d-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Parenteral parekoksibi hazırlamadan eliminasyona kadar anlatın. Organ işlevi ve eşzamanlı ilaçlar kararınızı nasıl etkiler?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>%0,9 salinle sulandırılır, ilk doz 40 mg’dır. [[K3 s. 164]] Ardından 6–12 saatte bir 20–40 mg verilir, toplam 80 mg/gün aşılmaz. [[K3 s. 164]]</li>
    <li>Etkisiz ön ilacın plazma yarı ömrü 20 dakikadır, hepatik hidroliz aktif valdekoksibi oluşturur. [[K3 s. 164–165]]</li>
    <li>Valdekoksibin eliminasyon yarı ömrü 8 saattir. [[K3 s. 166]] CYP2C9, CYP3A4 ve glukuronidasyonla oluşan metabolitlerden biri COX-2 antagonistidir. [[K3 s. 165]]</li>
    <li>Böbrek işlev bozukluğu kinetiği etkilemez, ağır karaciğer işlev bozukluğunda kullanım önerilmez. [[K3 s. 165]]</li>
    <li>Flukonazolle doz azaltılır, ketokonazol veya midazolamla doz değişikliği gerekmez. [[K3 s. 165]]</li>
    <li>Valdekoksib CYP2D6 ve CYP2C19 inhibisyonuyla birlikte alınan bazı ilaçların düzeylerini yükseltebilir. [[K3 s. 165–166]]</li>
  </ol>
  <div class="note"><b>Çizin.</b> Parekoksibden valdekoksibe hepatik hidroliz oku çizin, iki yarı ömrü işaretleyin ve metabolitler arasında COX-2’ye etkili olanı ayırın. [[K3 s. 164–166]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Valdekoksib neden piyasadan çekildi? [[K3 s. 164]] Sülfonamid duyarlılığında hangi reaksiyonlar bildirilmiştir? [[K3 s. 166]] CLASS çalışmasında ülser sonuçlarının yorumunu ne güçleştirdi? [[K3 s. 164]]</div>
</section>
<section class="wrap blk ders-sec" id="a10d-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Diklofenak renal kolikte yararlıdır, ancak majör cerrahide böbrek işlevini bozabilir. [[K3 s. 161]]</li>
    <li>İbuprofende R biçiminin büyük bölümü aktif S biçimine dönüşür. [[K3 s. 162]]</li>
    <li>Tenoksikamda 72 saatlik yarı ömür, yan etki geliştiğinde dezavantaja dönüşebilir. [[K3 s. 162]]</li>
    <li>COX-2 seçiciliği vasküler riskin değerlendirilmesini gerektirir. [[K3 s. 163–164]]</li>
    <li>Parekoksib hepatik hidrolizle aktif valdekoksibe dönüşür. [[K3 s. 165]]</li>
    <li>DMARD’a yeniden başlamak için yara iyileşmesi ve enfeksiyon bulguları birlikte değerlendirilir. [[K3 s. 168]]</li></ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="10d"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/10c">← 10c · NSAİİ'ler: etki mekanizması, nonspesifik COX inhibitörleri ve parasetamol</a><a href="#/dersler/farmakoloji/11a">Sonraki: 11a · Lokal anesteziklerin fizyolojisi, etkisi ve toksisitesi →</a></nav>
</section>`,
};
