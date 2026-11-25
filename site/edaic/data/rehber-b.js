/* Kitap rehberi · bölüm bölüm deneme soruları, paket B (Gemini): Part I bölüm 10–15 (Paper B) MTF + Part II bölüm 20–23 SOE.
   Sayfalar: SAYFALAR['rehber/sorular/NN']; sorular: VERI.sorular['htp-NN-k'].
   Bütün sorular bu atlas için yazılmıştır; kitaptaki hiçbir sorunun kökü, senaryosu ya da önermesi kullanılmaz. */
VERI.sorular = VERI.sorular || {};

VERI.sorular['htp-10-1'] = {
  no: 1, kagit: "Paper B · Genel anestezi",
  kok: "Ameliyat öncesi değerlendirmede sigara içmeyen, daha önce taşıt tutması yaşamış bir kadın hastaya ameliyat sonrası opioid planlanıyor. Ekip basitleştirilmiş Apfel puanını hesaplıyor.", kaynak: '[[K4 s. 214]]',
  onermeler: [
    { t: "Bu hastanın basitleştirilmiş Apfel puanı 4’tür.", d: true, n: "Kadın cinsiyet, sigara kullanmama, taşıt tutması öyküsü ve ameliyat sonrası opioid her biri 1 puandır. [[K4 s. 214]]" },
    { t: "Taşıt tutmasına ek olarak bir önceki ameliyatta kusma öğrenilirse puan 5 olur.", d: false, n: "İki öykü aynı ölçütü karşılar. Bu hastada öykü için zaten bir puan sayılmıştır. [[K4 s. 214]]" },
    { t: "Hesaplanan bu puana karşılık gelen öngörülen PONV riski %80’dir.", d: true, n: "Bu değer dört puanlı grup için yaklaşık risk tahminidir. [[K4 s. 214]]" },
    { t: "Postoperatif opioid yerine opioidsiz analjezi planlansaydı puan 2’ye düşerdi.", d: false, n: "Tek bir ölçüt kalktığında puan 4’ten 3’e iner. [[K4 s. 214]]" },
    { t: "Sıfır puan alan bir hastada PONV olasılığı %0 kabul edilir.", d: false, n: "Sıfır puanda bile taban risk %10’dur. [[K4 s. 214]]" },
  ],
};

VERI.sorular['htp-10-2'] = {
  no: 2, kagit: "Paper B · Genel anestezi",
  kok: "80 kg hastanın malign hipertermi olay kaydı inceleniyor. Ekip verilen miktarları K4’te aktarılan doz şemasıyla karşılaştırıyor ve sonraki anestezi için uyarı hazırlıyor.", kaynak: '[[K4 s. 204]]',
  onermeler: [
    { t: "İlk bolus olarak toplam 80 mg dantrolen hedef aralığa ulaşmak için yeterlidir.", d: false, n: "Başlangıç dozu 2–3 mg/kg olduğundan 80 kg için 160–240 mg gerekir. [[K4 s. 204]]" },
    { t: "Kayıtta 200 mg ilk bolus ve ardından 80 mg ek doz varsa iki miktar da kitaptaki şemaya uyar.", d: true, n: "Bu ağırlıkta ilk miktar 2,5 mg/kg, ikincisi 1 mg/kg eder. K4 ilk uygulama için 2–3 mg/kg, ek uygulama için 1 mg/kg verir. [[K4 s. 204]]" },
    { t: "Altıncı haftada alınan kas örneğinin sonucu, akut kas hasarından bağımsız yorumlanabilir.", d: false, n: "Hasarlı kasın test yanıtı güvenilmez olabilir. K4 biyopsi için ataktan sonra dört ay beklenmesini bildirir. [[K4 s. 204]]" },
    { t: "Aynı hastada sonraki bir girişimde süksinilkolinden de kaçınılmalıdır.", d: true, n: "Volatil anesteziklerin yanında süksinilkolin de bilinen tetikleyicidir. [[K4 s. 204]]" },
    { t: "Yatkınlıkla ilişkili bir varyant bulunamazsa bu erişkinin dosyasında ileri kas testi seçeneği açık kalır.", d: true, n: "Negatif genetik inceleme yatkınlığı tek başına dışlamaz. Uygun zamanda kas kontraktür testi değerlendirilebilir. [[K4 s. 204]]" },
  ],
};

VERI.sorular['htp-10-3'] = {
  no: 3, kagit: "Paper B · Genel anestezi",
  kok: "Bir eğitim kaydında üç farklı hastanın direkt laringoskopi görüntüleri karşılaştırılıyor. Birinci kayıtta glottis tam, ikincide glottisin yalnız arka kenarı seçiliyor, üçüncüde yalnızca epiglot görülüyor.", kaynak: '[[K4 s. 203]]',
  onermeler: [
    { t: "Birinci kayıtta buji kullanılmış olsa bile görünüm Derece 1 olarak kaydedilir.", d: true, n: "Derecelendirme görülebilen anatomiyi anlatır. Glottisin tamamı seçiliyorsa kullanılan araç dereceyi değiştirmez. [[K4 s. 203]]" },
    { t: "İkinci kayıttaki görünümde entübasyon için buji gibi bir yardımcı araç gerekebilir.", d: true, n: "Glottisin büyük bölümü örtülü kaldığında (Derece 2b) genellikle ek yardımcı gerekir. [[K4 s. 203]]" },
    { t: "Üçüncü kayıt modifiye sınıflamada Derece 4 olarak kodlanır.", d: false, n: "Yalnız epiglotun görüldüğü görünüm Derece 3’tür; Derece 4’te epiglot da seçilmez. [[K4 s. 203]]" },
    { t: "Yalnız epiglotun görüldüğü kaydı 2a olarak işaretlemek de aynı anatomik bulguyu tarif eder.", d: false, n: "2a kaydında glottisin bir bölümü görülür. Üçüncü kayıtta glottis görünmediği için bu etiket kullanılamaz. [[K4 s. 203]]" },
    { t: "İkinci ve üçüncü kayıtlar arasındaki ayrım glottik yapıların hiç görülüp görülmemesine dayanır.", d: true, n: "Derece 2b’de glottisin bir kısmı seçilebilirken Derece 3’te yalnız epiglot görünür. [[K4 s. 203]]" },
  ],
};

VERI.sorular['htp-10-4'] = {
  no: 4, kagit: "Paper B · Genel anestezi",
  kok: "Süksinilkolin sonrası derlenme süreleri farklı olan üç kardeşin laboratuvar sonuçları inceleniyor. A’nın dibukain sayısı 80, B’nin 60, C’nin 20 bulunmuş.", kaynak: '[[K4 s. 207]]',
  onermeler: [
    { t: "C’nin enzimi dibukain tarafından A’nınkinden daha yüksek oranda baskılanmıştır.", d: false, n: "Dibukain sayısı inhibisyon yüzdesidir; 20 sayısı yalnızca %20 inhibisyonu gösterir. [[K4 s. 207]]" },
    { t: "Blok süresi saatlerle ölçülen kardeşin C olması laboratuvar sıralamasıyla uyumludur.", d: true, n: "Üç sonuç arasında atipik homozigot enzimle en uyumlu olan C’ninkidir. K4 bu fenotipte 4–8 saatlik paralizi bildirir. [[K4 s. 207]]" },
    { t: "B’de dibukain eklendikten sonra başlangıçtaki enzim etkinliğinin yaklaşık %40’ı kalır.", d: true, n: "60 sayısı baskılanan yüzdeyi gösterir. Kalan etkinlik başlangıç değerinin %40’ıdır. [[K4 s. 207]]" },
    { t: "Edinsel nedenlerle kolinesteraz düzeyi düşen bir hastada dibukain sayısının da 20’ye inmesi gerekir.", d: false, n: "Enzim yapısı normal kaldığı için edinsel eksiklikte dibukain sayısı 80 olarak ölçülür. [[K4 s. 207]]" },
    { t: "A’da ayrıca düşük plazma kolinesteraz etkinliği ölçülürse iki laboratuvar sonucu birbiriyle bağdaşabilir.", d: true, n: "Toplam etkinlik ile dibukainin baskıladığı oran ayrı ölçümlerdir. Normal fenotipte edinsel enzim azalması olabilir. [[K4 s. 207]]" },
  ],
};

VERI.sorular['htp-10-5'] = {
  no: 5, kagit: "Paper B · Genel anestezi",
  kok: "Majör cerrahi sırasında ciddi kanaması olan 70 kg bir hastada plazma fibrinojeni 1,2 g/L ölçülüyor. Ekip K4’te aktarılan 2013 Avrupa kılavuzuna göre hedefe yönelik yerine koyma planlıyor.", kaynak: '[[K4 s. 217]]',
  onermeler: [
    { t: "Plazma fibrinojeni 1,5 g/L sınırının altına indiğinden fibrinojen konsantresi başlanması uygundur.", d: true, n: "ESAIC kılavuzu <1,5–2 g/L eşiğinde 20–50 mg/kg başlangıç dozu önerir. [[K4 s. 217]]" },
    { t: "Bu hastada 70 kg için 500 mg fibrinojen konsantresi önerilen başlangıç aralığının içindedir.", d: false, n: "20–50 mg/kg aralığı 70 kg’da 1400–3500 mg’a karşılık gelir. [[K4 s. 217]]" },
    { t: "Konsantre bulunmadığında bu hastada fibrinojen replasmanını ertelemek tek seçenektir.", d: false, n: "K4’ün aktardığı şemada kriyopresipitat bu durumda fibrinojen kaynağı olarak kullanılabilir. [[K4 s. 217]]" },
    { t: "Fibrinojen düzeyi düzelmiş, pıhtı hâlâ zayıf ve faktör XIII aktivitesi %60’ın altındaysa K4 şemasındaki 30 IU/kg bu hasta için 2100 IU eder.", d: true, n: "Faktör XIII fibrini stabilize eder. Kitaptaki dozla hesap 70 × 30 = 2100 IU’dur. [[K4 s. 217]]" },
    { t: "Kanayan varfarin kullanıcısında yalnız fibrinojeni düzeltmek K vitaminine bağımlı faktör eksikliğini de giderir.", d: false, n: "Fibrinojen ve varfarinin etkisini geri çevirmek ayrı tedavi hedefleridir. İkincisi için K4, K vitamini ile protrombin kompleksini birlikte verir. [[K4 s. 217]]" },
  ],
};

VERI.sorular['htp-11-1'] = {
  no: 1, kagit: "Paper B · Rejyonal anestezi",
  kok: "Tek taraflı beş kaburga kırığı için beş ardışık düzeyde interkostal sinir bloğu planlanıyor. Her düzeye 4 mL %0,25 bupivakain verilecek.", kaynak: '[[K4 s. 225]] [[K4 s. 487]]',
  onermeler: [
    { t: "Beş düzeye verilen toplam hacim 20 mL, toplam bupivakain kütlesi 50 mg’dır.", d: true, n: "Düzey başına 4 mL ile toplam 20 mL kullanılır; %0,25 çözeltinin mL’sinde 2,5 mg vardır. [[K4 s. 225]] [[K4 s. 487]]" },
    { t: "Bloktan sonra cilt ağrısı azalırsa eşlik eden karaciğer yaralanmasının visseral ağrısı da mutlaka maskelenir.", d: false, n: "Duvarın somatik duyusu ile organların visseral duyusu farklı yollardan taşınır. [[K4 s. 225]]" },
    { t: "İnterkostal aralıktan yüksek emilim hızı nedeniyle sistemik lokal anestezik toksisitesi yakından izlenmelidir.", d: true, n: "Çoklu düzey enjeksiyonları ve hızlı sistemik emilim toksisite riskini yükseltir. [[K4 s. 225]]" },
    { t: "İki taraflı uygulama yapıldığında pnömotoraks olasılığı ortadan kalkar.", d: false, n: "Bilateral blokta ağır sonuç doğurabilen iki taraflı pnömotoraks riski yüksektir. [[K4 s. 225]]" },
    { t: "Deri analjezisi yetersizse aynı beş düzeye aynı hacim tekrarlandığında toplam bupivakain yine 50 mg kalır.", d: false, n: "Tekrar edilen seri de 50 mg içerir. İki seride hastaya verilen toplam miktar 100 mg olur. [[K4 s. 225]] [[K4 s. 487]]" },
  ],
};

VERI.sorular['htp-11-2'] = {
  no: 2, kagit: "Paper B · Rejyonal anestezi",
  kok: "Morbid obez ve skolyozlu bir erişkinde spinal anestezi öncesi konveks probla lomber ultrason taraması yapılıyor. Uygulayıcı orta hattı ve hedef aralığı işaretliyor.", kaynak: '[[K4 s. 228–229]]',
  onermeler: [
    { t: "Proba cildi derinden bastırmak ligamentum flavum derinliğini olduğundan fazla ölçtürür.", d: false, n: "Yumuşak dokuyu sıkıştıran aşırı bası gerçek iğne derinliğini olduğundan az tahmin ettirir. [[K4 s. 228]]" },
    { t: "Tuffier çizgisinin palpasyonu tek başına L3/4 aralığını hatasız doğrulamaz.", d: true, n: "Kristalar arası çizgi sık yanılma payı taşır; hedeflenenden daha yüksek bir aralık seçilebilir. [[K4 s. 229]]" },
    { t: "Erişkin taramasında konus görülmese de alt lomber giriş için kemik işaretlerden yararlanılabilir.", d: true, n: "Sakrumdan başlayarak aralıkları saymak için konusun doğrudan görülmesi gerekmez. [[K4 s. 228]]" },
    { t: "Palpasyonla L3/4 olarak işaretlenen yer ultrasonda daha yukarıda bulunursa ilk işareti korumak güvenli düzeyi garanti eder.", d: false, n: "Kristalar arası çizgi yanıltabilir. Özellikle güç anatomide sakrumdan yukarı doğru aralıklar sayılarak giriş düzeyi doğrulanır. [[K4 s. 228–229]]" },
    { t: "Ağır spinal stenoz varsa aynı hacimde lokal anestezik beklenenden daha yüksek blok oluşturabilir.", d: true, n: "Dar kanal ve azalmış BOS hacmi ilacın daha yükseğe yayılmasına zemin hazırlar. [[K4 s. 229]]" },
  ],
};

VERI.sorular['htp-11-3'] = {
  no: 3, kagit: "Paper B · Rejyonal anestezi",
  kok: "Saat 22.00’de profilaktik düşük molekül ağırlıklı heparin (DMAH) yapılan bir hastaya ertesi gün epidural kateter planlanıyor. Postoperatif kateter çekildikten sonra DMAH yeniden başlanacak.", kaynak: '[[K4 s. 227]] [[K4 s. 230]]',
  onermeler: [
    { t: "Sabah saat 08.00’de epidural girişim yapmak önerilen bekleme süresinden erkendir.", d: true, n: "K4’te aktarılan şemada son profilaktik dozdan sonra 12 saatten uzun beklenir; 08.00’de yalnızca 10 saat dolmuştur. [[K4 s. 230]]" },
    { t: "Epidural kateter saat 14.00’te çekilirse saat 16.00’da ilk postoperatif DMAH dozu güvenle yapılabilir.", d: false, n: "Kateter çekilmesini izleyen en az 4 saat boyunca DMAH uygulanmamalıdır. [[K4 s. 230]]" },
    { t: "Gerekli bekleme süresi dolunca karar verme kapasitesi olan hastanın açıkça reddettiği epidural uygulanabilir.", d: false, n: "Antikoagülan zamanlamasının uygunluğu işlem için onamın yerini tutmaz. [[K4 s. 227]] [[K4 s. 230]]" },
    { t: "Kitle etkisine bağlı kafa içi basınç artışı da varsa DMAH açısından uygun saate ulaşmak spinal girişimi güvenli kılmaz.", d: true, n: "Basınç gradyanı varken dura ponksiyonu herniasyon riski taşır. Bu risk DMAH’nin son dozundan bağımsızdır. [[K4 s. 227]]" },
    { t: "Orta torasik düzeyde epidural yerleştirirken paramedyan yaklaşım orta hatta göre avantaj sağlayabilir.", d: true, n: "Orta torasik bölgede paramedyan teknik daha kolay ve güvenilir kabul edilir. [[K4 s. 230]]" },
  ],
};

VERI.sorular['htp-11-4'] = {
  no: 4, kagit: "Paper B · Rejyonal anestezi",
  kok: "Biri önkol, diğeri ayak bileği cerrahisi geçirecek iki obez hastada ultrason eşliğinde periferik blok planlanıyor. Birinci hastada aksiller, ikinci hastada popliteal siyatik yaklaşım seçiliyor.", kaynak: '[[K4 s. 233–234]]',
  onermeler: [
    { t: "Her iki hastada sinirler cilde yakın görülse bile yalnız vücut kitle indeksi nedeniyle lineer prob bırakılmalıdır.", d: false, n: "Prob seçiminde hedefin gerçek derinliği önemlidir. İki yaklaşımda da yüzeyel hedefler lineer probla görüntülenebilir. [[K4 s. 233–234]]" },
    { t: "Hafif pıhtılaşma bozukluğu varsa birinci hastada aksiller yaklaşım infraklaviküler yaklaşıma göre bası avantajı sunar.", d: true, n: "Aksiller damarlar klavikula arkasındaki subklavyen damarlara kıyasla komprese edilebilir. [[K4 s. 233]]" },
    { t: "Ayak sırtı uyuşmuşken medial malleol çevresinde duyunun korunması siyatik bloğun başarısız olduğunu kanıtlar.", d: false, n: "Medial ayak bileğine safen sinir de duyu verir. Siyatik bloğun dışında kalan bu alan ayrı değerlendirilir. [[K4 s. 234]]" },
    { t: "Birinci hastada önkolun anterolateral cildini uyuşturmak için muskülokütanöz sinirin ayrı hedeflenmesi gerekir.", d: true, n: "Aksiller kılıf içindeki ana dallar bloke edilse de muskülokütanöz sinir ayrı yakalanmalıdır. [[K4 s. 233]]" },
    { t: "Ayakta dorsifleksiyon görülmesi femoral sinirin uyarıldığını gösterir.", d: false, n: "Bu hareket siyatik sinirin ortak peroneal bileşeniyle uyumludur. Femoral sinir uyarısı diz ekstansiyonu oluşturur. [[K4 s. 234]]" },
  ],
};

VERI.sorular['htp-11-5'] = {
  no: 5, kagit: "Paper B · Rejyonal anestezi",
  kok: "Poliklinikte dört hastanın rejyonal anestezi uygunluğu tartışılıyor: doğum yapacak multipl sklerozlu hasta, ağır diyabetik polinöropatili hasta, yüksek servikal omurilik yaralanmalı hasta ve tiroid cerrahisi adayı hasta.", kaynak: '[[K4 s. 233]] [[K4 s. 235]]',
  onermeler: [
    { t: "Multipl sklerozlu gebede doğum epiduralinin hastalık nüksünü artırdığına ilişkin kanıt yoktur.", d: true, n: "Doğumda epidural analjezi alan multipl skleroz hastalarında nüks artışı gösterilmemiştir. [[K4 s. 235]]" },
    { t: "Servikal yaralanmalı hastada cerrahi uyaranın nöroaksiyel blokla kesilmesi otonom disrefleksi riskini azaltabilir.", d: true, n: "Yaralanmanın altından gelen uyarının bloke edilmesi intraoperatif disrefleksinin önlenmesine katkı sağlar. [[K4 s. 235]]" },
    { t: "Diyabetik nöropatisi olan kişide vazokonstriktör eklenmesi, sinirin kanlanması açısından koruyucu bir önlemdir.", d: false, n: "Endonöral mikrodolaşım zaten bozulmuş olabilir. K4 bu nedenle adrenalin eklemekten kaçınmayı önerir. [[K4 s. 235]]" },
    { t: "Tiroid cerrahisi sonrası yüzeyel servikal pleksus bloğu derin bloğa göre daha yüksek yaşamı tehdit eden komplikasyon riski taşır.", d: false, n: "Derin servikal blokta vertebral arter ponksiyonu, intratekal yayılım ve ciddi komplikasyon olasılığı daha yüksektir. [[K4 s. 233]]" },
    { t: "Boyun bloğu sonrası tek taraflı pitoz ve miyozis gelişmesi sempatik liflere yayılımla uyumludur.", d: true, n: "Stellat ganglionun etkilenmesi Horner sendromunu açıklayabilir. [[K4 s. 233]]" },
  ],
};

VERI.sorular['htp-12-1'] = {
  no: 1, kagit: "Paper B · Özel anestezi",
  kok: "Doğumdan 6 saat sonra taşikardisi gelişen bir lohusada dışarıdan görülen vajinal kanama azdır. Aynı klinikte ağır preeklampsili başka bir gebeye magnezyum infüzyonu başlanmıştır.", kaynak: '[[K4 s. 249]] [[K4 s. 251]]',
  onermeler: [
    { t: "İlk hastanın kan kaybı yalnız pedlerdeki miktardan hesaplanırsa uterus içinde biriken kan da hesaba katılmış olur.", d: false, n: "Atonik uterus kanı içinde tutabilir. Dışarıdan görülen miktar taşikardiye yol açan gerçek kaybı olduğundan az gösterebilir. [[K4 s. 251]]" },
    { t: "Altıncı saatte hipovolemi bulgularına yol açan uterin kan kaybı primer postpartum kanama sayılır.", d: true, n: "Hem klinik açıdan anlamlı kayıp vardır hem de başlangıç doğumdan sonraki ilk 24 saate düşer. [[K4 s. 251]]" },
    { t: "Preeklampside trombosit sayısı normal sınırlara yakın olsa bile trombosit işlevi bozulmuş olabilir.", d: true, n: "Preeklampsi trombosit sayısından bağımsız olarak trombosit disfonksiyonuna yol açabilir. [[K4 s. 249]]" },
    { t: "Görme bozukluğu gelişen ikinci hastada posterior beyin bölgelerinde vazojenik ödem görülmesi preeklampsiyle bağdaşmaz.", d: false, n: "Posterior dolaşımda otoregülasyon bozulabilir. Bu bulgular PRES ile uyumludur. [[K4 s. 249]]" },
    { t: "Rh-D negatif bir gebede yıkanmış ve lökosit filtresinden geçirilmiş kan kurtarma (cell salvage) kullanıldığında anti-D immünoglobulin ile alloimmünizasyon önlenebilir.", d: true, n: "Yıkama ve lökosit filtresi zararlı parçacıkları uzaklaştırır; fetal eritrositlere karşı anti-D koruma sağlar. [[K4 s. 251]]" },
  ],
};

VERI.sorular['htp-12-2'] = {
  no: 2, kagit: "Paper B · Özel anestezi",
  kok: "20 kg çocukta nabızlı dar kompleks taşikardi için senkronize kardiyoversiyon hazırlanıyor. Ekip enerji seçimini K4’ün aktardığı AHA 2020 şemasına göre kontrol ediyor.", kaynak: '[[K4 s. 257]] [[K4 s. 372]]',
  onermeler: [
    { t: "İlk senkronize kardiyoversiyon için 10–20 J, başarısız olursa ikinci girişim için 40 J ayarlanması uygundur.", d: true, n: "Çocukta ilk enerji 0,5–1 J/kg (10–20 J), ikinci doz 2 J/kg’dır (40 J). [[K4 s. 257]]" },
    { t: "İlk girişimde 20 J kullanıldıysa aynı enerjiyi tekrarlamak şemanın ikinci basamağındaki kilogram başına enerjiyi sağlar.", d: false, n: "20 J bu çocukta 1 J/kg eder. İkinci basamaktaki 2 J/kg için 40 J gerekir. [[K4 s. 257]]" },
    { t: "Ritim daha sonra üç şoka dirençli nabızsız VT’ye dönerse ağırlığa göre hesaplanan amiodaron miktarı 100 mg’dır.", d: true, n: "Bu ayrı arrest senaryosunda 5 mg/kg ile 20 kg çarpılır. [[K4 s. 257]] [[K4 s. 372]]" },
    { t: "Nabız kaybolduğunda polimorfik VT için nabızlı SVT’deki senkronizasyon ayarı korunmalıdır.", d: false, n: "Nabızsız polimorfik VT şoklanabilir arrest ritmidir ve senkronizasyon beklenmeden defibrilasyon gerekir. [[K4 s. 257]] [[K4 s. 372]]" },
    { t: "Etkili ventilasyon sağlayan trakeal tüp yerindeyken her soluk için kompresyonlara ara vermek gerekir.", d: false, n: "İleri hava yolu ile soluklar devam eden kompresyonlar sırasında verilebilir. [[K4 s. 257]]" },
  ],
};

VERI.sorular['htp-12-3'] = {
  no: 3, kagit: "Paper B · Özel anestezi",
  kok: "Torasik cerrahi ve zor hava yolu atölyesinde iki fizyolojik mekanizma tartışılıyor: tek akciğer ventilasyonunda (OLV) pulmoner damar direnci ve açık hava yolunda apneik oksijenasyon.", kaynak: '[[K4 s. 260]] [[K4 s. 264]]',
  onermeler: [
    { t: "Apne sırasında dakikada 230 mL oksijen tüketilirken alveole 20 mL CO₂ geçtiğinde oluşan 210 mL/dk net fark oksijeni trakeadan aşağı çeker.", d: true, n: "Üretilen CO₂’nin çoğu tamponlandığından alveollerde net gaz azalması basınç gradyanı doğurur. [[K4 s. 264]]" },
    { t: "OLV sırasında hipoksemiyi sınırlamak için ventile edilmeyen akciğerde PVR yüksek, ventile edilen akciğerde düşük tutulmalıdır.", d: true, n: "Kan akımının gaz değişimi yapan akciğere yönlenmesi bu direnç farkıyla sağlanır. [[K4 s. 260]]" },
    { t: "Ventile edilen akciğeri aşırı şişirmek damar direncini sürekli azaltır.", d: false, n: "Alveoler kapillerlerin gerilmesi direnci yükseltebilir. Pulmoner damar direnci fonksiyonel rezidüel kapasite civarında en düşüktür. [[K4 s. 260]]" },
    { t: "Preoksijenasyonda %100 oksijenle azotun uzaklaştırılması atelektazi oluşumunu önler.", d: false, n: "Düşük çözünürlüklü azotun yerini hızla emilen oksijen alınca absorpsiyon atelektazisi kolaylaşır. [[K4 s. 264]]" },
    { t: "Ventile edilmeyen akciğer yeniden açıldığında reperfüzyon hasarı gelişebilir.", d: true, n: "Kollaps dönemini izleyen kanlanma ve ventilasyon, ameliyat edilen akciğerde de hasara yol açabilir. [[K4 s. 260]]" },
  ],
};

VERI.sorular['htp-12-4'] = {
  no: 4, kagit: "Paper B · Özel anestezi",
  kok: "Ağır travmatik beyin hasarı nedeniyle izlenen bir hastada ortalama arter basıncı (OAB) 85 mmHg, intrakraniyal basınç (İKB) 20 mmHg ölçülüyor. Ekip serebral perfüzyon basıncını (SPB) ve PaCO₂ hedefini gözden geçiriyor.", kaynak: '[[K4 s. 266]]',
  onermeler: [
    { t: "Bu değerlerle hesaplanan SPB 65 mmHg olup önerilen 60–70 mmHg hedef aralığındadır.", d: true, n: "SPB = OAB − İKB = 85 − 20 = 65 mmHg’dir. K4’te erişkin için verilen hedef 60–70 mmHg’dir. [[K4 s. 266]]" },
    { t: "Sıvı ve vazopresörlerle SPB’yi rutin olarak 70 mmHg’nin üzerine zorlamak solunum açısından ek risk taşımaz.", d: false, n: "SPB’yi agresif biçimde >70 mmHg tutma girişimleri erişkin solunum yetersizliği riski taşır. [[K4 s. 266]]" },
    { t: "Bu hastada herniasyon bulgusu yokken ilk gün rutin hiperventilasyon serebral perfüzyonu daha da azaltabilir.", d: true, n: "Erken dönemde beyin kan akımı düşük olabilir. Profilaktik hipokapni bu riski artırır. [[K4 s. 266]]" },
    { t: "İKB’yi düşürmek amacıyla uzun süreli profilaktik PaCO₂ ≤25 mmHg (3,3 kPa) hedeflenmelidir.", d: false, n: "İKB kontrolü amacıyla PaCO₂’yi ≤25 mmHg (3,3 kPa) düzeyinde tutan uzamış profilaktik hiperventilasyondan kaçınılır. [[K4 s. 266]]" },
    { t: "OAB değişmeden İKB yükselirse hesaplanan perfüzyon basıncı azalır.", d: true, n: "SPB hesabında İKB çıkarılır. Basınç farkının daralması herniasyon tanısını tek başına koydurmaz. [[K4 s. 266]]" },
  ],
};

VERI.sorular['htp-12-5'] = {
  no: 5, kagit: "Paper B · Özel anestezi",
  kok: "Çölyak pleksus girişiminden sonra taburculuk görüşmesinde hasta iki yakınmasını ayırmak istiyor. Üst batın tümörüne bağlı derin ağrısı azalmış, önceden tanı konmuş ağrılı diyabetik nöropatisi ise sürüyor.", kaynak: '[[K4 s. 281]] [[K4 s. 283]]',
  onermeler: [
    { t: "Bu girişimi izleyen ishal, sempatik liflerin etkilenmiş olmasına karşı bir bulgudur.", d: false, n: "Çölyak bloktan sonra sempatik etkinliğin azalması bağırsak hareketlerini artırabilir. [[K4 s. 281]]" },
    { t: "Girişim sonrası baş dönmesine düşük kan basıncı eşlik ediyorsa sempatik blok olası açıklamalardandır.", d: true, n: "Çölyak pleksusa yönelik girişim sempatik tonusu azaltarak hipotansiyona yol açabilir. [[K4 s. 281]]" },
    { t: "Ayak ağrısının sürmesi çölyak girişiminin üst batındaki hedefe ulaşmadığını gösterir.", d: false, n: "Üst batının visseral ağrısı ile diyabetik sinir hasarı farklı mekanizmalara dayanır. Çölyak blok ayak nöropatisini tedavi etmez. [[K4 s. 281]] [[K4 s. 283]]" },
    { t: "Ayak ağrısı için pregabalin veya duloksetin birinci basamak seçenekler arasındadır.", d: true, n: "Ağrılı diyabetik nöropatide pregabalin ve duloksetin ilk basamak tedavilerdir. [[K4 s. 283]]" },
    { t: "Girişim sonrası nadir de olsa Adamkiewicz arteri hasarına bağlı parapleji ve plevra komşuluğu nedeniyle pnömotoraks bildirilmiştir.", d: true, n: "İğnenin plevraya yakınlığı pnömotoraksa, Adamkiewicz arteri hasarı nadiren paraplejiye yol açabilir. [[K4 s. 281]]" },
  ],
};

VERI.sorular['htp-13-1'] = {
  no: 1, kagit: "Paper B · Yoğun bakım",
  kok: "Yedi gündür kontrollü mekanik ventilasyondaki bir hastaya spontan solunum denemesi yapılıyor. Solunum sıklığı 30/dk, ortalama tidal hacim 250 mL (0,25 L) ölçülüyor. Solunum yolu sekresyonları yoğun ve öksürük zayıf.", kaynak: '[[K4 s. 312]]',
  onermeler: [
    { t: "Bu ölçümde hızlı yüzeyel solunum indeksi 120 soluk/dk/L bulunur ve ayırmada güçlük olasılığını destekler.", d: true, n: "30’un 0,25’e bölümü 120’dir. K4’te çalışmalara göre 80–105 arasında değişen kesim değerleri bildirilir. [[K4 s. 312]]" },
    { t: "Aynı solunum sıklığında tidal hacim iki katına çıkarsa f/VT de iki katına çıkar.", d: false, n: "Oranın paydası büyür. Tidal hacim 0,5 L olursa indeks 60’a iner. [[K4 s. 312]]" },
    { t: "Sonraki denemede indeks düşse bile zayıf öksürük ve yoğun sekresyon ekstübasyon kararını etkiler.", d: true, n: "Solunum paterni ile hava yolunu temizleyebilme farklı işlevlerdir. Sekresyon retansiyonu ekstübasyon başarısızlığı riskini artırır. [[K4 s. 312]]" },
    { t: "Tidal hacmi 250 mL olarak doğrudan paydaya yazıp bulduğumuz 0,12’yi kitaptaki kesim değerleriyle karşılaştırabiliriz.", d: false, n: "Bu eşikler tidal hacim litre olarak kullanıldığında geçerlidir. Birim dönüşümü yapılmazsa indeks bin kat küçük görünür. [[K4 s. 312]]" },
    { t: "Uzun süreli steroid, nöromüsküler bloker ve aminoglikozid maruziyeti kritik hastalık nöromiyopatisiyle ilişkilidir.", d: true, n: "Bu ilaç gruplarının uzun kullanımı yoğun bakımda edinilmiş kas güçsüzlüğüne katkıda bulunur. [[K4 s. 312]]" },
  ],
};

VERI.sorular['htp-13-2'] = {
  no: 2, kagit: "Paper B · Yoğun bakım",
  kok: "CTPA’da bilateral pulmoner emboli saptanan bir hastada sistolik kan basıncı 135 mmHg’den 85 mmHg’ye düşmüş ve 20 dakikadır düzelmiyor. Eşlik eden yeni aritmi, sepsis veya hipovolemi yok. Santral venöz basınç (CVP) giderek yükseliyor.", kaynak: '[[K4 s. 300–301]]',
  onermeler: [
    { t: "Bu hastada CVP yükselirken kalp debisinin de yükseldiği sonucuna varılabilir.", d: false, n: "Emboliye bağlı sağ ventrikül yetersizliği dolum basıncını yükseltirken ileri akımı azaltabilir. [[K4 s. 300]]" },
    { t: "Hem 85 mmHg’lik son değer hem de 50 mmHg’lik düşüş, verilen süre ve dışlamalarla birlikte kalıcı hipotansiyon ölçütünü karşılar.", d: true, n: "Diğer nedenler dışlandığında 15 dakikayı aşan sistolik hipotansiyon doğrulanmış emboliyi yüksek risk grubuna alır. [[K4 s. 300]]" },
    { t: "Sağ ventrikül dekompanse olduğunda pulmoner arter basıncı düşerken CVP yükselmeyi sürdürebilir.", d: true, n: "PVR kompansasyon eşiğini aştığında kalp debisi ve PAP düşer, CVP artmaya devam eder. [[K4 s. 300]]" },
    { t: "Troponin sonucu normal gelirse süren hipotansiyona rağmen hasta düşük riskli sayılır.", d: false, n: "Görüntüleme tanıyı doğrulamıştır. Hemodinamik bozulma varken normal bir biyobelirteç yüksek risk sınıfını değiştirmez. [[K4 s. 300–301]]" },
    { t: "Basınç düşüşü aynı süreyle devam etse ama kan kaybına bağlansa, yalnız bu gözlem emboliyi yüksek riskli saymaya yetmez.", d: true, n: "Hipovolemi, kalıcı hipotansiyonun PE’ye bağlanabilmesi için dışlanması gereken nedenlerdendir. [[K4 s. 300]]" },
  ],
};

VERI.sorular['htp-13-3'] = {
  no: 3, kagit: "Paper B · Yoğun bakım",
  kok: "Elektif girişim öncesi oral alımı azalan bir kişi bazal insülinini atlamış, empagliflozine devam etmiş. Kan gazında metabolik asidoz, kanda keton artışı ve glukoz 180 mg/dL saptanıyor. Üre ile kreatinin aynı molar birime çevrildiğinde oran 130:1 bulunuyor.", kaynak: '[[K4 s. 315]] [[K4 s. 317]]',
  onermeler: [
    { t: "Kan glukozunun 250 mg/dL’nin altında olması bu hastada diyabetik ketoasidozu dışlamaz.", d: true, n: "SGLT-2 inhibitörü kullananlarda normal veya hafif yüksek glukozla öglisemik DKA gelişebilir. [[K4 s. 317]]" },
    { t: "Oral alım azalınca insülini atlamış olması bu asit–baz bozukluğunu açıklamaya yardımcıdır.", d: true, n: "SGLT-2 inhibitörü kullanırken insülinin aksaması ve besin alımının azalması ketozis riskini artırır. [[K4 s. 317]]" },
    { t: "Glukoz çok yüksek olmadığı için saptanan keton artışını asidozun ayırıcı tanısından çıkarmak gerekir.", d: false, n: "İdrarla glukoz kaybı serum glukozunu sınırlayabilir. Keton artışı ve asidoz yine birlikte yorumlanmalıdır. [[K4 s. 317]]" },
    { t: "130:1 düzeyindeki yüksek üre/kreatinin oranı ağır karaciğer yetersizliğinin tipik bulgusudur.", d: false, n: "Üre karaciğerde sentezlendiğinden ağır karaciğer disfonksiyonunda oran yükselmez, düşük olabilir. [[K4 s. 315]]" },
    { t: "Dehidratasyona bağlı renal hipoperfüzyon üre geri emilimini artırarak üre/kreatinin oranını yükseltebilir.", d: true, n: "Her iki derişim aynı molar birimdeyken referans oran 40:1 ile 100:1 arasındadır; hacim eksikliğinde üre orantısız biçimde yükselir. [[K4 s. 315]]" },
  ],
};

VERI.sorular['htp-13-4'] = {
  no: 4, kagit: "Paper B · Yoğun bakım",
  kok: "Yoğun bakım devir tesliminde iki işlem ertelenmiş. Bir hastada şok ağırlaşırken gastrik beslenme planlanmış. Diğerinde ise soğutma ve kas gevşetici uygulamasının ardından nörolojik ölüm muayenesi istenmiş.", kaynak: '[[K4 s. 321–322]]',
  onermeler: [
    { t: "Kontrolsüz şok ve asidoz sürerken enteral beslenme geciktirilmeden derhâl başlatılmalıdır.", d: false, n: "Avrupa yoğun bakım beslenme rehberleri (ESICM/ESPEN) şok ve asidoz denetlenene kadar enteral beslenmenin bekletilmesini tavsiye eder. [[K4 s. 321]]" },
    { t: "İlk hasta stabilize olduktan sonra gastrik intolerans için başlanan eritromisinin yararı günler içinde azalabilir.", d: true, n: "K4 prokinetik yanıttaki belirgin azalmayı 72 saat sonrasında bildirir. Şok düzelmeden beslenmeyi başlatmak ayrı bir karardır. [[K4 s. 321]]" },
    { t: "Aktif soğutma sürerken alınan yanıtsız muayene, hipoterminin etkisinden bağımsız yorumlanabilir.", d: false, n: "Hipotermi nörolojik yanıtları baskılar. Uygun ısınma ve diğer ön koşullar sağlanmadan muayene kesin tanı için kullanılamaz. [[K4 s. 322]]" },
    { t: "Hasta ısınsa bile etkisi süren kas gevşetici, motor yanıtsızlığın yorumunu engeller.", d: true, n: "Farmakolojik paralizi hastanın hareketsiz görünmesine neden olabilir. Muayeneden önce bu etki dışlanır. [[K4 s. 322]]" },
    { t: "Kan basıncını ölçmek sedatif ilaç etkisinin geçtiğini göstermek için yeterlidir.", d: false, n: "Hemodinami ve sedatif etki ayrı değerlendirilir. İlaçların muayeneyi baskılamadığı gösterilmelidir. [[K4 s. 322]]" },
  ],
};

VERI.sorular['htp-13-5'] = {
  no: 5, kagit: "Paper B · Yoğun bakım",
  kok: "Entübe bir yoğun bakım hastası seslenildiğinde gözlerini açıp 5 saniye göz teması kuruyor. Kritik Bakım Ağrı Gözlem Aracı (CPOT) puanı 4 hesaplanıyor. Ekip CAM-ICU taraması ve sedasyon planı yapıyor.", kaynak: '[[K4 s. 323]]',
  onermeler: [
    { t: "Beş saniyelik göz teması RASS −2 ile uyumludur ve bu hastada deliryum taramasına geçilebilir.", d: true, n: "Sesle kısa göz teması hafif sedasyonu gösterir. Tarama sonucunu belirlemek için ayrıca CAM-ICU uygulanır. [[K4 s. 323]]" },
    { t: "CPOT 4 bulunması CAM-ICU sonucunun da pozitif olduğunu gösterir.", d: false, n: "CPOT ağrı davranışlarını ölçer. Bu puan ağrıya yönelik müdahaleyi gerektirir, deliryum sonucunu vermez. [[K4 s. 323]]" },
    { t: "Hasta RASS −4 düzeyinde olsaydı CAM-ICU ile deliryum güvenle dışlanabilirdi.", d: false, n: "RASS −4 ve −5 koma/stupor düzeyidir; bu derinlikte CAM-ICU uygulanamaz. [[K4 s. 323]]" },
    { t: "Hasta ertesi gün yalnız sesle göz açar, hiç göz teması kurmazsa RASS kaydı önceki günden daha derin sedasyonu gösterir.", d: true, n: "Bu yanıt −3’e, ilk günkü kısa göz teması ise −2’ye karşılık gelir. [[K4 s. 323]]" },
    { t: "CAM-ICU pozitifleşirse rutin sedasyon için seçilen ilacı yeniden değerlendirmek değiştirilebilir bir riske yönelir.", d: true, n: "Benzodiazepin maruziyeti deliryumla ilişkili etkenlerdendir. Sedasyon ihtiyacı ve alternatifleri gözden geçirilir. [[K4 s. 323]]" },
  ],
};

VERI.sorular['htp-14-1'] = {
  no: 1, kagit: "Paper B · İç hastalıkları",
  kok: "Ameliyat öncesi solunum fonksiyon testinde iki hastanın verileri karşılaştırılıyor. Hasta X’te FEV₁ 1,8 L ve FVC 3,6 L; Hasta Y’de (ileri kifoskolyozlu) FEV₁ 1,6 L ve FVC 2,0 L ölçülmüş.", kaynak: '[[K4 s. 338]]',
  onermeler: [
    { t: "Hasta X’in FEV₁/FVC oranı %50 olup obstrüktif bir paternle uyumludur.", d: true, n: "1,8 / 3,6 = 0,50 (%50) düşüktür; obstrüktif hastalıklarda FEV₁/FVC azalır. [[K4 s. 338]]" },
    { t: "Hasta Y’nin %80 çıkan oranı kifoskolyozda beklenen restriktif paternle bağdaşır.", d: true, n: "Kifoskolyoz restriktif patern oluşturur; 1,6 / 2,0 = %80 ile oran düşmez. [[K4 s. 338]]" },
    { t: "Ek akciğer hastalığı olmayan bir pnömonektomili hastada da Hasta X’teki gibi düşük FEV₁/FVC beklenir.", d: false, n: "Tek başına pnömonektomi toplam akciğer kapasitesini düşürerek restriktif bir tablo yaratır; FEV₁/FVC oranını azaltmaz. [[K4 s. 338]]" },
    { t: "Hasta Y’nin oranı tek başına toplam akciğer kapasitesinin ölçülmüş ve düşük bulunmuş olduğunu gösterir.", d: false, n: "FEV₁ ve FVC zorlu ekspirasyondan elde edilir. Korunmuş oran restriksiyonla bağdaşsa da toplam kapasitenin değerini vermez. [[K4 s. 338]]" },
    { t: "Astım ve KOAH, Hasta X’teki düşük oranı açıklayabilecek hastalıklar arasındadır.", d: true, n: "Her iki hastalıkta da hava akımı kısıtlılığına bağlı olarak FEV₁/FVC düşer. [[K4 s. 338]]" },
  ],
};

VERI.sorular['htp-14-2'] = {
  no: 2, kagit: "Paper B · İç hastalıkları",
  kok: "Son dönem böbrek yetmezliği nedeniyle diyalize giren bir hastanın kan potasyumu 6,8 mmol/L geliyor. Ameliyat öncesi EKG ve kanama riski değerlendiriliyor.", kaynak: '[[K4 s. 334]] [[K4 s. 345]]',
  onermeler: [
    { t: "Önceki EKG’deki belirgin U dalgası, bugünkü yüksek potasyumun o gün de var olduğunu kanıtlar.", d: false, n: "U dalgası daha çok düşük potasyumla ilişkilidir. Tek bir eski kayıt bugünkü elektrolit sonucunun süresini göstermez. [[K4 s. 334]]" },
    { t: "PR aralığında uzama, QRS genişlemesi ve dal blokları hiperkaleminin ileti üzerindeki etkileriyle uyumludur.", d: true, n: "Potasyum fazlalığı atriyal ve ventriküler iletimi yavaşlatarak değişik düzeylerde ileti blokları doğurabilir. [[K4 s. 334]]" },
    { t: "Trombosit sayısı normal kalsa bile üremiye bağlı trombosit işlev bozukluğu kanama zamanını uzatabilir.", d: true, n: "Böbrek yetersizliğinde trombosit adezyon ve agregasyonu bozulur. [[K4 s. 345]]" },
    { t: "Böbrekte aktif D vitamini sentezinin azalması bu hastada tipik olarak hiperkalsemiye neden olur.", d: false, n: "1,25-dihidroksikolekalsiferol azalışı hipokalsemiye, bu da sekonder hiperparatiroidiye yol açar. [[K4 s. 345]]" },
    { t: "Eşlik eden diyabet varsa bu hastada otonom ve periferik nöropati daha sık ve ağır seyreder.", d: true, n: "Kronik böbrek hastalığında nöropati sıktır ve diyabet varlığında ağırlaşır. [[K4 s. 345]]" },
  ],
};

VERI.sorular['htp-14-3'] = {
  no: 3, kagit: "Paper B · İç hastalıkları",
  kok: "Acil servise 72 saattir süren yeni başlangıçlı atriyal fibrilasyonla (AF) başvuran bir hastada kardiyoversiyon ve ilaç seçimi tartışılıyor. Ekip, EKG’de preeksitasyon saptandığında stratejinin nasıl değişeceğini de inceliyor.", kaynak: '[[K4 s. 336]]',
  onermeler: [
    { t: "Bu stabil hastada atriyal trombüs görüntülemeyle dışlanmayacaksa, üç hafta terapötik antikoagülasyon sonrası planlı kardiyoversiyon ve ardından en az dört hafta antikoagülasyon uygun bir yoldur.", d: true, n: "72 saatlik atakta işlem öncesi ve sonrası dönemlerin ikisi de tromboemboli planına girer. Daha uzun tedavi gereksinimi ayrıca değerlendirilir. [[K4 s. 336]]" },
    { t: "Preeksite AF saptanırsa ventrikül hızını yavaşlatmak için digoksin veya verapamil ilk seçenektir.", d: false, n: "WPW’li AF’de digoksin, verapamil ve adenozin ventrikül yanıtını tehlikeli biçimde hızlandırabileceğinden kontrendikedir. [[K4 s. 336]]" },
    { t: "Mitral darlığı ve tiroit işlev bozuklukları yeni başlangıçlı AF’nin araştırılması gereken nedenlerindendir.", d: true, n: "Atriyal dilatasyon yapan kapak hastalıkları ile hipotiroidi ve hipertiroidi AF’ye yol açabilir. [[K4 s. 336]]" },
    { t: "WPW sendromlu AF’de sınıf Ia ajan olan prokainamid kesinlikle kullanılmamalıdır.", d: false, n: "Hemodinamik olarak stabil preeksite AF’de prokainamid bir seçenektir. [[K4 s. 336]]" },
    { t: "Kardiyoversiyon acil olarak yapılırsa işlem sonrasında antikoagülasyona gerek kalmaz.", d: false, n: "Acil kardiyoversiyonda da antikoagülasyona en kısa sürede başlanır ve en az 4 hafta sürdürülür. [[K4 s. 336]]" },
  ],
};

VERI.sorular['htp-14-4'] = {
  no: 4, kagit: "Paper B · İç hastalıkları",
  kok: "Endokrinoloji konsültasyonu istenen iki hastadan birinde yeni tanı Addison hastalığı, diğerinde uzun süreli diyabet (HbA1c %8,2) bulunuyor.", kaynak: '[[K4 s. 341]] [[K4 s. 343–344]]',
  onermeler: [
    { t: "Addison hastalığının erken evresinde rutin üre ve elektrolit testlerinin normal çıkması tanıyı dışlar.", d: false, n: "Kademeli adrenal yıkımın erken döneminde rutin elektrolitler normal kalabilir; bulgular bezin >%90’ı etkilendiğinde belirginleşir. [[K4 s. 343–344]]" },
    { t: "İndüksiyon ilacının adrenal rezerv üzerindeki etkisi tartışılırken etomidatın kortizol sentezini baskılaması dikkate alınmalıdır.", d: true, n: "Sentezdeki geçici baskılanma önceden adrenal yetersizliği bulunan hasta için önemlidir. [[K4 s. 344]]" },
    { t: "İkinci hastanın HbA1c sonucu, anestezi sırasında yeni gelişen miyokart iskemisinin mutlaka göğüs ağrısı yapacağını gösterir.", d: false, n: "HbA1c bir iskemi bulgusu değildir. Diyabetik otonom nöropati varsa miyokart iskemisi ağrısız seyredebilir. [[K4 s. 341]]" },
    { t: "Diyabetli hastada otonom nöropati hem sessiz miyokart iskemisine hem de gastropareziye bağlı aspirasyon riskine yol açabilir.", d: true, n: "Otonom disfonksiyon göğüs ağrısız iskemiye ve gecikmiş mide boşalmasına neden olur. [[K4 s. 341]]" },
    { t: "Kompanse olmayan Addison hastalığında hiperpigmentasyon, postüral hipotansiyon ve hipermagnezemi saptanabilir.", d: true, n: "Hipovolemi, postüral hipotansiyon, hiperpigmentasyon, hiponatremi, hiperkalemi ve hipermagnezemi bildirilen bulgulardır. [[K4 s. 344]]" },
  ],
};

VERI.sorular['htp-14-5'] = {
  no: 5, kagit: "Paper B · İç hastalıkları",
  kok: "Akut intermittan porfirisi olan hasta ameliyat listesinin sonuna kaydırılıyor. Önceki atağında karın ağrısı geçtikten sonra ayak bileği güçsüzlüğü sürmüş. Ekip açlık planını ve derlenme muayenesini gözden geçiriyor.", kaynak: '[[K4 s. 343]]',
  onermeler: [
    { t: "Kalori kısıtlaması atağı tetikleyebileceğinden ameliyat öncesi açlık süresi en aza indirilmelidir.", d: true, n: "Açlık akut porfiri krizini kolaylaştırır; yeterli hidrasyon ve karbonhidrat desteği önemlidir. [[K4 s. 343]]" },
    { t: "Önceki atağa eşlik eden güçsüzlük öyküsü, bu kez sıvı ve karbonhidrat alımını kısıtlamak için gerekçedir.", d: false, n: "Kalori açığı atağı kolaylaştırabilir. Tetikleyicilerin giderilmesi ile uygun sıvı ve karbonhidrat desteği aynı amaca hizmet eder. [[K4 s. 343]]" },
    { t: "Derlenmede karın ağrısının kaybolmasını motor muayenenin de normale döndüğünün kanıtı olarak kaydetmek uygundur.", d: false, n: "Ağrı ve parezi farklı hızlarda düzelebilir. Motor güç ayrıca muayene edilmelidir. [[K4 s. 343]]" },
    { t: "Anestezi kaydında sevofluran görülmesi tek başına porfiriye uygunsuz ajan seçildiğini göstermez.", d: true, n: "K4 sevofluranı akut porfiri açısından kullanılabilen inhalasyon ajanları arasında sayar. [[K4 s. 343]]" },
    { t: "Ailesinde aynı ağırlıkta atak geçiren kimse olmaması bu hastanın kalıtsal tanısını dışlar.", d: false, n: "Akut intermittan porfiri otozomal dominant kalıtılır. Klinik ifadenin değişkenliği ailede farklı tablolarla sonuçlanabilir. [[K4 s. 343]]" },
  ],
};

VERI.sorular['htp-15-1'] = {
  no: 1, kagit: "Paper B · Acil tıp",
  kok: "Acil serviste serum potasyumu 5,7 mmol/L olan bir hastanın EKG’sinde sivri T dalgaları saptanıyor. Ekip %10 kalsiyum glukonat (10 mL’de 2,3 mmol Ca²⁺) ile %10 kalsiyum klorür (10 mL’de 6,8 mmol Ca²⁺) preparatlarını ve diğer tedavileri değerlendiriyor.", kaynak: '[[K4 s. 371]]',
  onermeler: [
    { t: "10 mL %10 kalsiyum klorürün sağladığı elementer kalsiyuma yakın miktara ulaşmak için yaklaşık 30 mL %10 kalsiyum glukonat gerekir.", d: true, n: "6,8 / 2,3 ≈ 2,96 olduğundan eşit kalsiyum için yaklaşık üç kat hacim kalsiyum glukonat gerekir. [[K4 s. 371]]" },
    { t: "Bu hastada yalnız laboratuvar sonucunun hafif aralıkta olmasına bakılarak yeni EKG değişikliği göz ardı edilebilir.", d: false, n: "Sivri T dalgaları kardiyak etkilenmeyi düşündürür. Değerlendirme sayısal potasyum aralığıyla sınırlanamaz. [[K4 s. 371]]" },
    { t: "İki preparattan da eşit hacim çekilirse klorürlü enjektör yaklaşık üç kat fazla elementer kalsiyum içerir.", d: true, n: "Aynı hacimdeki içerik oranı 6,8/2,3’tür. Yüzde etiketlerinin aynı olması elementer miktarları eşitlemez. [[K4 s. 371]]" },
    { t: "Bu iki ampul arasında hacim dönüşümü yapılınca hastanın serum potasyumunun kaç mmol/L düşeceği de hesaplanmış olur.", d: false, n: "Dönüşüm yalnız verilen kalsiyumu karşılaştırır. Potasyumu hücre içine yönlendiren veya vücuttan uzaklaştıran tedaviler ayrıca planlanır. [[K4 s. 371]]" },
    { t: "Ciddi hiperkalemide (potasyum ≥6,5 mmol/L) salbutamol ve insülin-glukoz protokolünün yanına oral potasyum bağlayıcı olarak sodyum zirkonyum siklosilikat eklenebilir.", d: true, n: "Potasyum ≥6,5 mmol/L düzeyindeyken insülin-glukoz ve salbutamole eklenen oral bağlayıcılar arasında sodyum zirkonyum siklosilikat ile patiromer sayılır. [[K4 s. 371]]" },
  ],
};

VERI.sorular['htp-15-2'] = {
  no: 2, kagit: "Paper B · Acil tıp",
  kok: "60 kg ağırlığındaki bir erişkin, 12 saat içinde dört ayrı seferde toplam 10 g parasetamol almış. Son dozdan 8 saat sonra acil serviste karaciğer enzimleri normal ölçülüyor.", kaynak: '[[K4 s. 359]]',
  onermeler: [
    { t: "8. saatte ALT ve AST’nin normal çıkması klinik olarak anlamlı karaciğer hasarını dışlar.", d: false, n: "Rutin karaciğer enzimleri aşırı dozdan sonraki ilk 18 saat boyunca normal kalabilir; sonraki ölçümlerde ALT, AST ve INR’nin seyri değerlendirilir. [[K4 s. 359]]" },
    { t: "Alınan toplam doz 167 mg/kg’a ulaştığı için aralıklı alımda asetilsistein tedavisi endikedir.", d: true, n: "10.000 mg / 60 kg ≈ 167 mg/kg; son 24 saatte ≥150 mg/kg aralıklı alımda asetilsistein verilmelidir. [[K4 s. 359]]" },
    { t: "Birden çok doza yayılmış bu alımda tek seferlik tedavi nomogramı güvenilir değildir.", d: true, n: "Nomogram yalnızca tek seferde akut aşırı doz alımında geçerlidir; aralıklı veya modifiye salımlı alımlarda güvenilmezdir. [[K4 s. 359]]" },
    { t: "Parasetamol zehirlenmesinde akut böbrek yetersizliği yalnızca ağır karaciğer yetersizliği geliştiğinde ortaya çıkar.", d: false, n: "Doğrudan renal tübüler toksisite nedeniyle karaciğer hasarı olmaksızın da akut böbrek yetersizliği görülebilir. [[K4 s. 359]]" },
    { t: "Bu hastada laboratuvara yalnız son dozun saatini bildirmek, tek doz nomogramını kullanılabilir hâle getirir.", d: false, n: "Son dozun saati önceki dozları temsil etmez. Tek alım varsayımı sağlanmadığı için bir düzeyi nomograma işaretlemek yanıltabilir. [[K4 s. 359]]" },
  ],
};

VERI.sorular['htp-15-3'] = {
  no: 3, kagit: "Paper B · Acil tıp",
  kok: "Nöbet devrinde amitriptilin alan bir hastanın seri EKG’lerinde QRS genişliğinin 90 ms’den 120 ms’ye çıktığı bildiriliyor. İkinci hastada ise tinnitus, hızlı solunum ve asit–baz bozukluğu var. Hangi çıkarımlar doğrudur?", kaynak: '[[K4 s. 370]]',
  onermeler: [
    { t: "İlk hastanın ikinci EKG’si, ilk kayda göre toksik ileti bozukluğu açısından daha kaygı vericidir.", d: true, n: "Trisiklikler sodyum kanallarını baskılar. Sürenin 100 ms’yi aşması nörolojik ve kardiyak komplikasyon riskine işaret eder. [[K4 s. 370]]" },
    { t: "İlk hastanın ikinci EKG’sinde 120 ms olarak bildirilen süre, QTc’nin de ölçülmüş olduğunu gösterir.", d: false, n: "QRS ve düzeltilmiş QT farklı aralıklardır. Trisiklik toksisitesinde bu ölçümler ayrı değerlendirilir. [[K4 s. 370]]" },
    { t: "İkinci hastada respiratuvar alkaloz saptanması, eşzamanlı metabolik asidoz varsa salisilat olasılığını dışlar.", d: false, n: "Salisilatlar hiperventilasyonla birlikte metabolik asidoza da neden olabilir. İki bozukluk aynı tabloda görülebilir. [[K4 s. 370]]" },
    { t: "İkinci hastanın işitme yakınması ve taşipnesi ortak bir toksik nedenle açıklanabilir.", d: true, n: "Tinnitus ve hiperventilasyon salisilat toksisitesinde birlikte görülebilir. [[K4 s. 370]]" },
    { t: "İkinci hastada yeni konfüzyon eklenirse bunu yalnız kulak çınlamasının verdiği huzursuzluğa bağlamak sakıncalıdır.", d: true, n: "Salisilat toksisitesinde nörolojik kötüleşme serebral ödemin habercisi olabilir. [[K4 s. 370]]" },
  ],
};

VERI.sorular['htp-15-4'] = {
  no: 4, kagit: "Paper B · Acil tıp",
  kok: "İleri gebelikte travmatik arrest tatbikatında ekip göğüs kompresyonlarını, uterusun konumunu ve hastanın bulunduğu yerde girişim hazırlığını eş zamanlı planlıyor.", kaynak: '[[K4 s. 376]]',
  onermeler: [
    { t: "Uterusu elle sola itmenin amacı bası yapan uterusu yerinde tutup yalnız annenin omuzlarını çevirmektir.", d: false, n: "Manevra uterusu büyük damarlardan uzaklaştırır. Gövdenin kompresyon için uygun konumu korunabilir. [[K4 s. 376]]" },
    { t: "Toraks girişiminin yeri planlanırken yükselmiş diyafram nedeniyle batın organlarına yakınlık hesaba katılmalıdır.", d: true, n: "Gebelikte anatomik komşuluk değişir. K4 lateral toraks girişimi için alışılmış düzeyden daha kraniyal bir yer tarif eder. [[K4 s. 376]]" },
    { t: "Histerotomi ekibi hazırsa hastayı başka bir birime nakletmek hazırlığın zorunlu bir parçasıdır.", d: false, n: "Endikasyon varsa ekip arrest yerinde girişime hazırlanır. Nakil için geçen süre müdahaleyi geciktirir. [[K4 s. 376]]" },
    { t: "Gebelikte 20. haftadan sonra supin pozisyonda aortokaval bası hemodinamiyi bozabilir.", d: true, n: "Büyüyen uterus 20. haftadan itibaren aortokaval basıya yol açar. [[K4 s. 376]]" },
    { t: "Bu tatbikatta uterus deplasmanı yalnız fetüsün dolaşımına yöneliktir, annenin venöz dönüşüne etkisi beklenmez.", d: false, n: "Büyük damarlara basının azalması annenin dolaşımını destekler. [[K4 s. 376]]" },
  ],
};

VERI.sorular['htp-15-5'] = {
  no: 5, kagit: "Paper B · Acil tıp",
  kok: "Acil servis eğitim toplantısında iki ayrı acil uygulama gözden geçiriliyor: stabil spontan pnömotoraksın takibi ve 6 yaşında (20 kg) bir çocuğun kardiyopulmoner resüsitasyonu.", kaynak: '[[K4 s. 356]] [[K4 s. 372]]',
  onermeler: [
    { t: "Hipoksemik pnömotoraks hastasında oksijen verildikten sonra satürasyonun yükselmesi plevral havanın tamamen kaybolduğunu göstermez.", d: true, n: "Oksijenlenme düzelebilirken plevral hava hâlâ mevcut olabilir. Klinik yanıt ve pnömotoraks boyutu ayrı değerlendirilir. [[K4 s. 356]]" },
    { t: "6 yaşındaki çocuğun göğsünde erişkin AED pedleri birbirine değiyorsa ön–arka yerleşim seçilebilir.", d: true, n: "8 yaşından küçük çocuklarda standart anterolateral yerleşimde pedler değebileceğinden ön göğüs ve sırt konumu kullanılır. [[K4 s. 372]]" },
    { t: "Grafide küçük bir pnömotoraks tarif edilmesi ciddi dispnenin mutlaka başka bir nedeni olduğunu kanıtlar.", d: false, n: "Radyografik boyut ile dispne birebir örtüşmez. Ayakta çekilmiş grafi hava miktarını düşük de gösterebilir. [[K4 s. 356]]" },
    { t: "Çocukta üç şoka dirençli VF’de 100 mg amiodaron (5 mg/kg) intraosseöz yoldan kesinlikle verilmemelidir.", d: false, n: "5 mg/kg (en çok 300 mg) amiodaron intraosseöz yoldan güvenle uygulanabilir. [[K4 s. 372]]" },
    { t: "Çocukta spontan dolaşım döndükten (ROSC) sonra hiperoksiden kaçınmak için verilen oksijen, satürasyon %94–98 olacak şekilde ayarlanabilir.", d: true, n: "Gereksiz yüksek oksijen düzeyi serbest oksijen radikallerini artırarak reperfüzyon kaynaklı doku hasarını tetikleyebilir. [[K4 s. 372]]" },
  ],
};

SAYFALAR['rehber/sorular/10'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 10 · Paper B',
  baslik: 'Genel anestezi · deneme soruları',
  lede: 'PONV risk puanı, dantrolen dozu, laringoskopi derecelendirmesi, dibukain sayısı ve perioperatif koagülasyon yerine koyma kararlarını beş bağımsız olguyla sınayın. [[K4 s. 194–217]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-10-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-10-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-10-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-10-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-10-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/sinav/part1">Part I sınav biçimi</a> · <a href="#/dersler/farmakoloji/12b">Depolarizan kas gevşeticiler</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/11">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/11'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 11 · Paper B',
  baslik: 'Rejyonal anestezi · deneme soruları',
  lede: 'İnterkostal blok doz hesabı, lomber ultrason derinliği, DMAH zamanlaması, üst–alt ekstremite blok sınırları ve nörolojik hastalıklarda nöroaksiyel kararları değerlendirin. [[K4 s. 218–235]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-11-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-11-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-11-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-11-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-11-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/dersler/farmakoloji/11a">Lokal anestezikler</a> · <a href="#/dersler/farmakoloji/24b">Heparinler ve antikoagülanlar</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/12">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/12'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 12 · Paper B',
  baslik: 'Özel anestezi · deneme soruları',
  lede: 'Obstetrik kanama ve preeklampsi, pediatrik ritim bozukluğu, tek akciğer ventilasyonu, kafa travmasında perfüzyon basıncı ve kronik ağrı tedavisi üzerinden karar verin. [[K4 s. 236–283]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-12-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-12-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-12-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-12-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-12-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/dersler/fizyoloji/82">Gebelikte maternal fizyoloji</a> · <a href="#/dersler/fizyoloji/84">Pediatrik fizyoloji</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/13">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/13'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 13 · Paper B',
  baslik: 'Yoğun bakım · deneme soruları',
  lede: 'Ventilatörden ayırma göstergelerini, yüksek riskli pulmoner emboliyi, öglisemik ketoasidozu, beslenme–beyin ölümü ön koşullarını ve deliryum değerlendirmesini gözden geçirin. [[K4 s. 284–327]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-13-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-13-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-13-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-13-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-13-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/sinav/part1">Part I sınav biçimi</a> · <a href="#/dersler/farmakoloji/25b">Diyabetin perioperatif bakımı</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/14">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/14'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 14 · Paper B',
  baslik: 'İç hastalıkları · deneme soruları',
  lede: 'Spirometri oranlarını, kronik böbrek hastalığı ve hiperkalemi bulgularını, WPW eşlikli atriyal fibrilasyonu, Addison hastalığını ve akut porfiri yönetimini yorumlayın. [[K4 s. 328–347]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-14-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-14-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-14-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-14-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-14-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/dersler/farmakoloji/26a">Kortikosteroidler</a> · <a href="#/dersler/fizyoloji/81">Endokrin bezler</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/15">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/15'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 15 · Paper B',
  baslik: 'Acil tıp · deneme soruları',
  lede: 'Hiperkalemi preparatlarının eşdeğerliğini, aralıklı parasetamol dozunu, acil toksikoloji bulgularını, gebe travmasını ve pediatrik resüsitasyon önceliklerini çözün. [[K4 s. 348–378]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-15-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-15-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-15-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-15-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-15-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/sinav/part1">Part I sınav biçimi</a> · <a href="#/dersler/farmakoloji/10c">Parasetamol ve NSAİİ’ler</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/16">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/20'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 20 · SOE',
  baslik: 'Genel anestezi · sözlü prova',
  lede: 'Laparoskopi sonrası ekstübasyon kararını ve doğum sonrası trombositleri düşen hastanın anestezi planını gerekçelendirin. [[K4 s. 473–487]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-20-1">
<h3>Solunum değerleri düzelen hastada ekstübasyon kararı</h3>
<p><b>Açılış sorusu.</b> Laparoskopi sonrası devirde PaCO₂’nin normale döndüğü bildiriliyor. Hasta artık yatay pozisyonda, fakat göz kapakları ödemli ve tüpün kafı indirildiğinde belirgin hava kaçağı duyulmuyor. Ekstübasyon kararında bu bulgulara nasıl ağırlık verirsiniz?</p>
<h4>Ek sorular</h4>
<ol>
<li>PaCO₂’nin düzelmesi hangi işlev hakkında bilgi verir?</li>
<li>Ameliyatta oksijenlenme ile CO₂ atılımı neden farklı müdahaleler gerektirmiş olabilir?</li>
<li>Kaf indirme bulgusunu devralan ekibe nasıl bildirirsiniz?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>PaCO₂ ventilasyonu yansıtır. Ameliyatta emilen CO₂’yi atmak için dakika ventilasyonunu artırmak gerekebilir. Normalleşen kan gazı, üst hava yolunun açıklığını göstermez. [[K4 s. 479–480]]</li>
<li>Baş aşağı pozisyonda bazal akciğer bölgelerinin sıkışması şantı artırabilir. Atelektazi düşünüldüğünde oksijen desteğinin yanında uygun PEEP ve tolere edilen akciğer açma manevrası değerlendirilir. [[K4 s. 479]]</li>
<li>Yüz ödemine hava yolu ödemi eşlik edebilir. Kaf sönükken kaçağın duyulmaması olası daralma açısından uyarıcıdır. Güvenli ekstübasyon koşulları yeniden değerlendirilir. [[K4 s. 480]]</li>
<li>Devirde pozisyonu, kan gazının seyrini, ödemi ve kaçak testini birlikte aktarırım. Yakın izlem ve hava yolunun yeniden değerlendirilmesi için plan belirtirim. [[K4 s. 479–480]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-20-2">
<h3>Doğum sonrası yeni baş ağrısı ve kanama riski</h3>
<p><b>Açılış sorusu.</b> Vajinal doğumdan sonra perine onarımı bekleyen bir hastanın baş ağrısı artıyor. Kan basıncı ağır hipertansiyon düzeyinde, trombositleri önceki örneğe göre düşmüş. İstemde spinal anestezi ve ameliyat sonrası NSAİİ var. Hangi bulgular planı değiştirir?</p>
<h4>Ek sorular</h4>
<ol>
<li>Önceki trombosit sayısıyla yetinmek hangi riski gözden kaçırır?</li>
<li>Kan basıncı yüksekliği ile nöbet riskini hangi ayrı tedavilerle ele alırsınız?</li>
<li>Onarım sonrası kanama ve analjezi planını nasıl devredersiniz?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Süren baş ağrısı ve ağır hipertansiyon postpartum preeklampsi açısından acil değerlendirme gerektirir. Hasta izleme alınır, damar yolu ve kan basıncı takibi sağlanır. [[K4 s. 249]] [[K4 s. 481–483]]</li>
<li>Trombosit eğilimi, klinik kanama, karaciğer testleri ve girişimin aciliyeti birlikte değerlendirilir. Düşen sayıyla eski sonuca dayanarak spinal girişime geçilmez. [[K4 s. 480–483]]</li>
<li>Ağır hipertansiyon için IV labetalol veya hidralazin değerlendirilir. Magnezyum sülfatın buradaki amacı nöbeti önlemektir. [[K4 s. 483]]</li>
<li>Trombositopeni ve kanama eğilimi sürdüğü için NSAİİ istemi yeniden değerlendirilir. Karaciğer etkilenmişse parasetamol dozu da gözden geçirilir. Kanama ve tansiyon izlem planı devredilir. [[K4 s. 483–484]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part2">Sözlü sınava hazırlık</a> · <a href="#/sinav/part2">Part II sınav biçimi</a> · <a href="#/dersler/fizyoloji/82">Gebelikte maternal fizyoloji</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/21">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/21'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 21 · SOE',
  baslik: 'Kritik olaylar · sözlü prova',
  lede: 'Lokal anestezik sistemik toksisitesinde kilograma göre lipid tedavisini ve kas gevşeticili TIVA altında farkındalık yönetimini acil adımlarla sunun. [[K4 s. 488–511]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-21-1">
<h3>Brakiyal pleksus bloğunda metalik tat ve aritmi</h3>
<p><b>Açılış sorusu.</b> Omuz cerrahisi öncesi uyanık blok yapılan 70 kg hastada işlem bitiminde kulak çınlaması, ağızda metalik tat ve ardından bilinç kaybı ile düzenli geniş QRS’li taşikardi gelişiyor. Nabız alınıyor, ancak kan basıncı hızla düşüyor. Hangi müdahaleleri eş zamanlı başlatırsınız?</p>
<h4>Ek sorular</h4>
<ol>
<li>70 kg hasta için %20 lipid emülsiyonunun ilk bolus hacmini, tekrar koşullarını, infüzyon hızını ve üst sınırını nasıl hesaplarsınız?</li>
<li>Taşiaritmi sürerse lidokain yerine hangi antiaritmiği seçersiniz?</li>
<li>Kardiyak arrest gelişirse canlandırma süresi ve yoğun bakım izleminde hangi özellikler beklenir?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Enjeksiyon durdurulur, yardım çağrılır, hava yolu korunup oksijen verilir ve nöbet gerekirse benzodiazepinle kontrol edilir. [[K4 s. 498–499]]</li>
<li>%20 lipid emülsiyonu 1,5 mL/kg (105 mL) K4 şemasında 1 dakikada bolus verilir; instabilite sürerse 5 dakika arayla en çok 2 ek bolus yapılır. Başlangıç infüzyonu 15 mL/kg/saattir. İnstabilite beş dakika sonra da sürüyorsa 30 mL/kg/saat hızına geçilebilir; toplam tavan 12 mL/kg (840 mL) aşılmaz. [[K4 s. 499]]</li>
<li>Nabızlı, hemodinamiyi bozan düzenli geniş kompleks taşikardide senkronize kardiyoversiyon geciktirilmez. Antiaritmik gerekiyorsa amiodaron seçilir. [[K4 s. 499]]</li>
<li>Lokal anesteziğe bağlı arrestte dolaşım dönüşü 1 saatten uzun sürebileceğinden uzamış CPR gerekebilir. Lipid verilirken toplam doz sınırı korunur; hasta yoğun bakımda pankreatit açısından izlenir. [[K4 s. 499]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-21-2">
<h3>Acil travmada TIVA altında farkındalık şüphesi</h3>
<p><b>Açılış sorusu.</b> Kas gevşetici ve total intravenöz anestezi (TIVA) alan acil travma hastasında ameliyat ortasında açıklanamayan taşikardi, hipertansiyon, terleme ve göz yaşarması fark ediliyor. Ertesi gün hasta cerrahi konuşmaları duyduğunu ve hareket edemediğini bildiriyor. Hem intraoperatif hem postoperatif yönetim nasıl olmalıdır?</p>
<h4>Ek sorular</h4>
<ol>
<li>TIVA, kas gevşetici ve acil travma kombinasyonu neden farkındalık riskini artırır?</li>
<li>Riski azaltmak için hangi ekipman kontrollerini ve derinlik monitörizasyonunu kullanırsınız?</li>
<li>Ameliyat sonrasında hastayla görüşme, kayıt ve yönlendirme adımlarınız nelerdir?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Hemodinamik instabiliteye bağlı düşük doz hipnotik, kas gevşeticiyle hareket yanıtının maskelenmesi ve TIVA pompa/hat ayrılmaları başlıca risk etkenleridir. [[K4 s. 505–506]]</li>
<li>Pompadan kanüle kadar hattı ve damar yolu açıklığını hemen kontrol ederim. İletim kesilmişse güvenilir yoldan hipnotik sunumunu yeniden sağlar, dozu dolaşıma göre ayarlarım. İşlenmiş EEG takibi değerlendirmeye yardımcıdır. [[K4 s. 506]]</li>
<li>Hasta empatiyle dinlenir, anestezi kaydı ve ilaç zamanlaması incelenerek belirtilere açıklama getirilir ve ayrıntılı dosya kaydı tutulur. [[K4 s. 506–507]]</li>
<li>Bölüm başkanı, sorumlu anesteziyolog ve servis ekibi bilgilendirilir; hasta psikolog veya psikiyatrist ile düzenli takibe yönlendirilir. [[K4 s. 507]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part2">Sözlü sınava hazırlık</a> · <a href="#/sinav/part2">Part II sınav biçimi</a> · <a href="#/dersler/farmakoloji/11a">Lokal anestezikler</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/22">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/22'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 22 · SOE',
  baslik: 'Yoğun bakım tıbbı · sözlü prova',
  lede: 'Pankreatitte artan karın içi basıncı ve oligüriyi, ardından farklı klinik tablolardaki akut böbrek hasarında diyaliz seçimini tartışın. [[K4 s. 512–520]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-22-1">
<h3>Pankreatit sonrası devirde şiş karın ve sıvı dengesi</h3>
<p><b>Açılış sorusu.</b> Pankreatit nedeniyle bol sıvı almış bir hastanın karın gerginliği artıyor ve idrarı azalıyor. Plevral sıvı önceki incelemeyle aynı, oksijen gereksinimi değişmemiş. Ekip yeni bir sıvı bolusu ve toraks dreni öneriyor. Bu kararları hangi verilerle yeniden değerlendirirsiniz?</p>
<h4>Ek sorular</h4>
<ol>
<li>Karındaki basınç artışı için hangi ölçümü istersiniz?</li>
<li>Oligürinin değerlendirilmesinde hangi geri döndürülebilir nedeni yatak başında kontrol edersiniz?</li>
<li>İzlemde CRP yüksek kalırsa bunu ve BT bulgularını nasıl kullanırsınız?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Tekrar sıvı vermeden önce dolaşımı ve sıvı dengesini değerlendiririm. Karın gerginliğiyle birlikte organ işlevinin bozulması abdominal kompartman sendromunu düşündürür. Karın içi basıncı ölçerim. [[K4 s. 516–517]]</li>
<li>Sonda tıkanması görünürde oligüriye yol açabilir. Drenajı kontrol eder, gerekirse üst üriner sistemde tıkanmayı ultrasonla araştırırım. [[K4 s. 518–519]]</li>
<li>Solunumu bozmayan, değişmemiş plevral sıvı tek başına drenaj gerekçesi değildir. Solunum işi ve oksijen gereksinimiyle birlikte izlerim. [[K4 s. 516–517]]</li>
<li>İnflamasyon CRP’yi yüksek tutabilir. Tek sonucu enfeksiyon kanıtı saymam. Klinik gidiş ve seri değerlerle birlikte, kötüleşme varsa BT’de nekroz veya koleksiyon ararım. [[K4 s. 517–518]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-22-2">
<h3>İki farklı ABH olgusunda renal replasman seçimi</h3>
<p><b>Açılış sorusu.</b> Yoğun bakımda iki hastada akut böbrek hasarı gelişiyor. Hasta A septik şokta, noradrenalin altında ve belirgin sıvı yükü var; Hasta B hemodinamik olarak stabil ancak metformin birikimiyle ağır metabolik asidoz ve 7,1 mmol/L potasyum saptanıyor. İki hasta için renal replasman ve tetkik planınızı nasıl ayırırsınız?</p>
<h4>Ek sorular</h4>
<ol>
<li>Kas kütlesi düşük yoğun bakım hastalarında şiddeti izlerken kreatinin neden tek başına yetersiz kalır?</li>
<li>Diyalize başlama kararı hangi laboratuvar ve klinik ölçütlere dayanır?</li>
<li>Hasta A ve Hasta B arasında sürekli (CRRT) ve aralıklı hemodiyaliz (IHD) seçimini nasıl yaparsınız?</li>
<li>Geri döndürülebilir nedenleri saptamak için ilk hangi görüntüleme ve ilaç düzeyi testlerini istersiniz?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Kas kaybı olan hastalarda serum kreatinini şiddeti olduğundan düşük gösterebilir; üre, potasyum ve kan gazındaki metabolik asidoz daha yol göstericidir. [[K4 s. 519]]</li>
<li>Acil kararda hiperkaleminin ve asidozun ağırlığı, tedaviye yanıt ve klinik sıvı yükü birlikte değerlendirilir. [[K4 s. 518]] [[K4 s. 519]]</li>
<li>Hasta A’da sürekli sıvı yönetimi ve daha az hipotansiyon riski nedeniyle CRRT uygundur; Hasta B’de ağır hiperkalemiyi hızla düzeltmek ve metformini uzaklaştırmak için başlangıçta aralıklı hemodiyaliz tercih edilir. [[K4 s. 519]]</li>
<li>Obstrüktif üropatiyi dışlamak için böbrek ultrasonografisi, gerekirse BT ve kullanıldıysa vankomisin/aminoglikozid plazma düzeyleri istenir. [[K4 s. 519]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part2">Sözlü sınava hazırlık</a> · <a href="#/sinav/part2">Part II sınav biçimi</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/23">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/23'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 23 · SOE',
  baslik: 'Görüntü yorumlama · sözlü prova',
  lede: 'Pnömonide grafi ve BT bulgularını, serebellar inme sonrasında ise seri MRG ve eski eko raporlarını klinik değişimle birlikte yorumlayın. [[K4 s. 521–536]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-23-1">
<h3>Grafide tek taraflı opasite, BT’de bölmeli sıvı</h3>
<p><b>Açılış sorusu.</b> Pnömoni tedavisi gören hastanın yatak başı grafisinde sağ bazalde opasite var. İlk yorum atelektazi. Ateş sürerken çekilen BT’de sağ plevral yapraklar arasında bölmeli sıvı tarif ediliyor. Bulguları birleştirince yalnız solunum fizyoterapisiyle izlem kararınız nasıl değişir?</p>
<h4>Ek sorular</h4>
<ol>
<li>Grafide hacim kaybını hangi mediasten bulgusu destekler?</li>
<li>BT’deki koleksiyonun yerini ve tarafını nasıl doğrularsınız?</li>
<li>Enfekte plevral sıvının bölmeli olması tedaviyi nasıl etkiler?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Grafide trakeayı, mediasteni ve akciğer alanlarını sırayla incelerim. Mediastenin opak tarafa çekilmesi hacim kaybını destekler. [[K4 s. 339]] [[K4 s. 526]]</li>
<li>Aksiyel BT’de yön işaretini kontrol edip iki hemitoraksı karşılaştırırım. Kalınlaşmış plevra yaprakları arasında sıvı görülmesi koleksiyonu plevral boşluğa yerleştirir. [[K4 s. 530]]</li>
<li>Ateş ve pnömoni eşliğinde bu görünüm ampiyemi düşündürür. Atelektazi eşlik edebilse de tek başına plevral koleksiyonu açıklamaz. [[K4 s. 530–532]]</li>
<li>Antibiyotik tedavisini mikrobiyolojiye göre düzenlerim. Bölmeli enfekte sıvıda dren yolunu görüntülemeyle planlar ve hangi bölmelerin boşaldığını değerlendiririm. [[K4 s. 532]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-23-2">
<h3>Devirde iki görüntü raporunun sınırları</h3>
<p><b>Açılış sorusu.</b> Yoğun bakıma devredilen hasta yakın zamanda serebellar inme geçirmiş. İlk MRG raporunda dördüncü ventrikül açık, son raporda ise komşu ödemle daralmış. Şimdi bilinci kötüleşiyor. Devir notunda ayrıca önceki bir ekoda küçük perikard efüzyonu bildiriliyor. Hangi değişikliği acil olarak araştırırsınız?</p>
<h4>Ek sorular</h4>
<ol>
<li>Seri MRG’de hangi sıvı boşluklarını karşılaştırırsınız?</li>
<li>Standart T1 ve T2 kesitlerini karşılaştırırken BOS sinyalini nasıl kullanırsınız?</li>
<li>Eski eko karesinden bugünkü dolaşım hakkında hangi sonuca varamazsınız?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Dördüncü ventrikülün yeni daralması BOS akımını engelleyebilir. Bilinçte kötüleşme ile birlikte obstrüktif hidrosefali açısından acil değerlendirme gerekir. [[K4 s. 533]]</li>
<li>Önceki incelemeyle ventrikül genişliklerini karşılaştırırım. Hidrosefali gelişmişse nöroşirürjiyle ventriküler drenaj gereksinimini görüşürüm. [[K4 s. 533]]</li>
<li>Standart T2 kesitte BOS parlak, T1 kesitte koyudur. Farklı sekanslardaki parlaklık farkını tek başına ödem artışı olarak yorumlamam. [[K4 s. 532]]</li>
<li>Eski apikal kesitte sıvı ve boşluklarda bası olup olmadığı tarif edilebilir. O kayıttaki küçük efüzyon bugünkü tamponadı ne kanıtlar ne de dışlar. Güncel klinik ve eko gerekir. [[K4 s. 534–535]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part2">Sözlü sınava hazırlık</a> · <a href="#/sinav/part2">Part II sınav biçimi</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a></p></section>`,
};
