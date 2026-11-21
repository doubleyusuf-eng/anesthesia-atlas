/* Etkileşimli bileşenlerin verisi. Metinlerdeki [[S.. s. ..]] işaretleri data/kaynaklar.js'e bağlanır.
   Bu atlas için yazılmış örnekler (MTF sorusu, şematik grafi, puan senaryoları) öyle etiketlenir. */
window.VERI = {};

/* Giriş: tıp diplomasından EDAIC'e yol */
VERI.yol = [
  { k: 'Tıp diploması', s: 'başlangıç', h: 'Part I için tek koşul',
    t: 'Part I\'e tıp fakültesinden mezun her hekim, uyruğu ne olursa olsun girebilir. Kayıtta tıp diplomasının asıl dilindeki kopyası yüklenir. Diploma sınav dillerinden birinde değilse yeminli İngilizce çevirisi de istenir; Türkçe sınav dillerinden biri olduğu için Türkçe diploma için çeviri gerekmez. [[S7 s. 8]] [[S2]]' },
  { k: 'OLA / HOLA', s: 'Nisan · isteğe bağlı', h: 'Deneme sınavı',
    t: 'Part I ile aynı yapıda ve aynı puanlamayla yapılan bilgisayar tabanlı değerlendirmedir, her yıl Nisan\'da yapılır. Türkiye\'den adaylar evden girilen HOLA\'yı seçer. Rapor, kâğıt ve konu alanı bazında performansı aynı eğitim yılındaki adayların ulusal ve genel ortalamalarıyla karşılaştırır. [[S4]]' },
  { k: 'Part I', s: 'Eylül · yazılı', h: 'İki kâğıt, 120 soru, 600 önerme',
    t: 'Eğitimin herhangi bir aşamasında girilebilir. Sınav Komitesi başarı şansını artırmak için uzmanlık eğitiminin 3. yılından sonra girilmesini önerir. Part I başarısının süresi dolmaz. [[S6 s. 3]] [[S7 s. 9]]' },
  { k: 'Part II', s: 'Şubat–Aralık · sözlü', h: 'Tek günde dört sözlü sınav',
    t: 'Part I\'i geçtikten sonra girilir. Gereken: kısıtlamasız uygulama yetkisi veren anesteziyoloji uzmanlık belgesi ya da Dünya Sağlık Örgütü Avrupa Bölgesi\'ne üye bir ülkede (Türkiye dahil) veya Brezilya\'da eğitimin son yılında olmak. Komite 5. yıldan sonra girilmesini önerir. Kalan aday süre sınırı olmadan yeniden girebilir; Part I başarısı geçerli kalır. [[S7 s. 8–9]] [[S6 s. 13]]' },
  { k: 'Uzmanlık belgesi', s: 'son yıl asistanları için', h: 'Diploma belgeyle tamamlanır',
    t: 'Part II\'yi son yıl asistanıyken geçen adayın diploması, kısıtlamasız uygulama yetkisi veren uzmanlık belgesinin kopyası ESAIC\'e ulaşınca verilir. Belge alınır alınmaz gönderilmelidir. [[S7 s. 8]]' },
  { k: 'EDAIC', s: 'DESAIC unvanı', h: 'Dijital diploma',
    t: 'Başarılı adaylara blok zinciriyle doğrulanabilen dijital diploma e-postayla gönderilir. Diplomalılar DESAIC (Diplomate of the ESAIC) unvanını kullanır ve Euroanaesthesia kongresindeki diploma törenine indirimli katılabilir. [[S1]] [[S7 s. 6]]' },
];

/* Part II: dört SOE */
VERI.soe = [
  { id: 1, grup: 'basic', yari: 'Sabah · temel bilim', bas: 'Fizyoloji ve anatomi',
    t: '10 dakika önce verilen fizyoloji sorusuyla başlar. Fizyoloji ve patofizyolojinin bütün konuları sorulabilir. En az bir soru anestezistle ilgili anatomidir. [[S6 s. 7]]' },
  { id: 2, grup: 'basic', yari: 'Sabah · temel bilim', bas: 'Farmakoloji ve klinik ölçüm',
    t: '10 dakika önce verilen farmakoloji sorusuyla başlar ve anestezistle ilgili uygulamalı farmakolojiyi kapsar. En az bir soru klinik ölçümdür. [[S6 s. 7]]' },
  { id: 3, grup: 'clin', yari: 'Öğleden sonra · klinik', bas: 'Anestezi ve kritik olay yönetimi',
    t: '10 dakika önce verilen anestezi senaryosuyla başlar. Ardından rejyonel anestezi ve anestezi yan dalları gibi konulara geçilir. En az bir soru hastayla ilgili bir kritik olayın yönetimidir. [[S6 s. 7]]' },
  { id: 4, grup: 'clin', yari: 'Öğleden sonra · klinik', bas: 'Yoğun bakım ve acil tıp',
    t: '10 dakika önce verilen yoğun bakım senaryosuyla başlar. Ardından senaryoyla ilişkili olabilecek bir dahiliye konusu, acil tıp ve anesteziyoloğu ya da yoğun bakımcıyı ilgilendiren genel konular gelir. Bu SOE\'de anestezi ve yoğun bakımla ilgili görüntü yorumlama sorulur. [[S6 s. 7]] [[S7 s. 6]]' },
];

/* Part I soru biçimi: bu atlas için yazılmış örnek (resmi soru değildir) */
VERI.mtf = {
  kok: 'Oksihemoglobin dissosiyasyon eğrisini sağa kaydırır:',
  kagit: 'Paper A · temel bilim (fizyoloji)',
  onermeler: [
    { t: 'Vücut sıcaklığının artması', d: true, n: 'Doğru. Sıcaklık arttıkça hemoglobinin oksijene afinitesi azalır; eğri sağa kayar ve dokuya oksijen bırakmak kolaylaşır.' },
    { t: 'Eritrositte 2,3-DPG düzeyinin artması', d: true, n: 'Doğru. 2,3-DPG deoksihemoglobine bağlanıp onu kararlı kılar, afiniteyi azaltır: sağa kayma.' },
    { t: 'Arteriyel pH\'ın 7,50\'ye yükselmesi', d: false, n: 'Yanlış. Alkaloz (H⁺ azalması) afiniteyi artırır ve eğriyi sola kaydırır (Bohr etkisi).' },
    { t: 'PaCO₂\'nin artması', d: true, n: 'Doğru. CO₂ artışı H⁺\'yı artırır ve karbamino bileşikleri oluşturur; afinite azalır, eğri sağa kayar (Bohr etkisi).' },
    { t: 'Fetal hemoglobin oranının artması', d: false, n: 'Yanlış. Fetal hemoglobin 2,3-DPG\'yi zayıf bağlar, afinitesi yüksektir; eğri sola kayar.' },
  ],
};

/* Beklenen bilgi alanları ve sınandıkları yer. 1 = rehberde açıkça; 2 = rehberde dolaylı. [[S6 s. 4–9]] */
VERI.alanlar = [
  { id: 'fizyoloji', ad: 'Fizyoloji ve biyokimya', grup: 'basic', yer: { A: 1, s1: 1 },
    ozet: 'Normal ve patolojik fizyoloji ve biyokimya: solunum, kardiyovasküler ve nörofizyoloji; böbrek ve karaciğer fizyolojisi, endokrinoloji; gebelik, çocukluk ve yaşlanma fizyolojisi; koagülasyon ve asit–baz düzenlenmesi; fizyolojik ölçüm (kan basıncı, kalp debisi, akciğer, böbrek ve karaciğer fonksiyonu, kan gazı analizi, koagülasyon). [[S6 s. 4]]',
    p2: 'SOE 1, 10 dakika önce verilen fizyoloji sorusuyla başlar. Kardiyovasküler ve solunum fizyolojisi ayrıntılı sorulur. Nöro, böbrek ve karaciğer fizyolojisinin anestezi ve yoğun bakıma uygulanışı da iyi bilinmelidir. [[S6 s. 7]] [[S6 s. 9]]' },
  { id: 'anatomi', ad: 'Anatomi', grup: 'basic', yer: { A: 1, s1: 1 },
    ozet: 'Baş, boyun, toraks, omurga ve spinal kanal anatomisi; periferik sinir ve damar sistemi; ilgili yapıların yüzey işaretleri. [[S6 s. 4]]',
    p2: 'SOE 1\'de en az bir soru anestezistle ilgili anatomidir. İğne, kanül, endotrakeal ve endobronşiyal tüp yerleştirilen bölgelerin temel anatomisi ile kalbin ve akciğerin uygulamalı anatomisi beklenir. [[S6 s. 7]] [[S6 s. 9]]' },
  { id: 'farmakoloji', ad: 'Farmakoloji', grup: 'basic', yer: { A: 1, s2: 1 },
    ozet: 'İlaç etkisinin temel ilkeleri; farmakokinetik ve farmakodinamik; reseptör–ilaç etkileşimi; ilaçların fizikokimyasal özellikleri ve formülasyonları; ilaç etkileri ve toksisitesi; anestezide ve iç hastalıklarında kullanılan ilaçların farmakolojisi. [[S6 s. 4]]',
    p2: 'SOE 2, 10 dakika önce verilen farmakoloji sorusuyla başlar. Farmakokinetik ve farmakodinamik ilkeleri ayrıntılı sorulur. Anestezi ilaçlarının ve yoğun bakımda sık kullanılan ilaçların farmakolojisi ve toksikolojisi iyi bilinmelidir. [[S6 s. 7]] [[S6 s. 9]]' },
  { id: 'fizik', ad: 'Fizik ve ölçüm ilkeleri', grup: 'basic', yer: { A: 1, s2: 1 },
    ozet: 'SI birim sistemi; sıvıların, gazların ve buharların özellikleri; basınç göstergeleri, basınç regülatörleri, akım ölçerler, vaporizatörler ve solunum sistemlerine uygulanan gaz ve sıvı yasaları; ilgili elektrik, optik, spektrofotometri ve sıcaklık ölçümü; sık kullanılan anestezi ve monitörizasyon cihazlarının çalışma ilkeleri; ameliyathanede elektrik, yangın ve patlama tehlikeleri. [[S6 s. 4]]',
    p2: 'SOE 2\'de en az bir soru klinik ölçümdür. Monitörlerin çalışma ilkesi, sınırlılıkları, doğruluğu ve hata kaynakları; gaz ve buhar fiziği; elektrik güvenliği; anestezi makinesi ve ventilatörlerin çalışma ilkeleri, güvenlik özellikleri ve arıza nedenleri. [[S6 s. 7]] [[S6 s. 9]]' },
  { id: 'istatistik', ad: 'İstatistik', grup: 'basic', yer: { A: 1, s2: 2 },
    ozet: 'Veri işlemenin temel ilkeleri, olasılık kuramı, popülasyon dağılımı; parametrik ve parametrik olmayan anlamlılık testlerinin uygulanması. [[S6 s. 4]]',
    p2: 'Rehber, makalelerin değerini yargılayabilmek için araştırma protokollerinin ve istatistik yöntemlerin anlamının bilinmesi gerektiğini farmakoloji başlığı altında anar; istatistiği ayrıca bir SOE\'ye bağlamaz. [[S6 s. 9]]' },
  { id: 'klinik', ad: 'Klinik anesteziyoloji', grup: 'clin', yer: { B: 1, s3: 1 },
    ozet: 'Preoperatif değerlendirme ve eşlik eden hastalıklar; grafi, EKG, ultrason, PET ve MR gibi görüntülerin, solunum fonksiyon testlerinin, kalp kateterizasyonu verilerinin ve biyokimya sonuçlarının yorumu; ASA gibi skorlama sistemleri. Genel ve rejyonel anestezi teknikleri, ajanlar, ekipman, monitörizasyon, infüzyonlar ve komplikasyonlar; obstetrik anestezi ve analjezi; yenidoğan resüsitasyonu; pediatri, yaşlı, kardiyotorasik ve nöroşirürji gibi grupların özel gereksinimleri. Perioperatif bakım, perioperatif aciller, postoperatif analjezi; komplikasyon ve olay yönetimi. [[S6 s. 5]]',
    p2: 'SOE 3, anestezi senaryosuyla başlar; rejyonel anestezi ve yan dallar gibi konular izler; en az bir soru kritik olay yönetimidir. Pediatrik, nöro, kardiyak ve obstetrik anestezinin ilke ve uygulaması sorulur ama bu alanlarda geniş deneyim beklenmez. [[S6 s. 7]] [[S6 s. 9]]' },
  { id: 'yogun', ad: 'Yoğun bakım', grup: 'clin', yer: { B: 1, s4: 1 },
    ozet: 'Genel yoğun bakımda cerrahi ve medikal hastaların tanı ve yönetim ilkeleri, prognostik skorlar; dolaşım ve solunum yetmezliği, yapay ventilasyon; enfeksiyon, sepsis, antimikrobik ajanlar; sıvı–elektrolit dengesi, kristaloid ve kolloidler, kan ve kan ürünleri, parenteral ve enteral beslenme; asit–baz bozuklukları, diyabetik ketoasidoz, hiperozmolar sendrom ve akut zehirlenmeler; diyaliz ve sürekli venövenöz hemodiyafiltrasyon dahil böbrek yetmezliği; akut nöroşirürjik ve nörolojik durumlar; çoklu travma, yanık, çoklu organ yetmezliği; etik karar verme ilkeleri. [[S6 s. 5]]',
    p2: 'SOE 4, yoğun bakım senaryosuyla başlar; ardından senaryoyla ilişkili olabilecek bir dahiliye konusu, acil tıp ve genel ilgi soruları gelir. [[S6 s. 7]]' },
  { id: 'acil', ad: 'Resüsitasyon ve acil tıp', grup: 'clin', yer: { B: 1, s4: 1 },
    ozet: 'Kardiyopulmoner resüsitasyon; temel ve ileri yaşam desteği teknikleri. Acil tıp: hastane öncesi bakım; travma dahil tıbbi ve cerrahi acillerde ilk bakım. [[S6 s. 5]]',
    p2: 'Her yaş grubunda resüsitasyon ve yaşam desteği algoritmaları, hastane öncesi bakım, hastane içi ve hastaneler arası transport beklenir. Kritik durumlara gelişigüzel yaklaşmak ve ALS protokollerine uymamak sık başarısızlık nedenidir: değerlendirme ABCDE\'ye, CPR başladıktan sonra 4H ve 4T\'ye dayanmalı; uygun yerde ERC kılavuzları izlenmelidir. [[S6 s. 10]]' },
  { id: 'agri', ad: 'Ağrı', grup: 'clin', yer: { B: 1 },
    ozet: 'Ağrının fizyolojisi; ağrı tedavisinde kullanılabilecek yöntemler; ağrılı hastanın psikolojik yönetimi ve multidisipliner bakım kavramı; terminal dönemde ağrı ve semptom kontrolü. Paper B\'de ağrı, "özel anestezi" başlığı içinde yer alır. [[S6 s. 5]] [[S6 s. 6]]',
    p2: 'Part II\'de ağrı tıbbının her yönü sorulabilir: ağrı fizyolojisi, akut ve kronik ağrı farkı, farmakolojik tedavi, diğer yöntemler, psikolojik yönetim, multidisipliner bakım ve terminal dönem. Rehber ağrıyı belirli bir SOE\'ye bağlamaz. [[S6 s. 10]]' },
  { id: 'goruntu', ad: 'Görüntü yorumlama', grup: 'clin', yer: { B: 1, s4: 1 },
    ozet: 'Preoperatif değerlendirmede grafi, EKG, ultrason, PET ve MR gibi tıbbi görüntülerin yorumu klinik anesteziyoloji kapsamındadır. [[S6 s. 5]]',
    p2: 'SOE 4\'te anestezi ve yoğun bakım tedavisiyle ilgili görüntü yorumlama sorulur; klinik sözlülerde grafi, BT, MR ve ultrason görüntüleri kullanılır. Her türlü tıbbi görüntü beklenebilir; sistematik okumalı ve sisteminizi sınavcıya anlatabilmelisiniz. [[S6 s. 7]] [[S6 s. 11]] [[S7 s. 6]]' },
];

/* Part II puan senaryoları: her SOE için 5 konu × 2 sınavcı (bu atlas için örnek) */
(function () {
  const all = (v) => Array.from({ length: 10 }, () => v);
  const mix = (twos, ones) => Array.from({ length: 10 }, (_, i) => (i < twos ? 2 : i < twos + ones ? 1 : 0));
  VERI.puanSenaryo = [
    { id: 'ust', ad: 'Hepsi "geçer"', p: [all(2), all(2), all(2), all(2)] },
    { id: 'esik', ad: 'Eşikte geçen', p: [mix(5, 5), mix(5, 5), mix(5, 5), mix(5, 5)] },
    { id: 'kotu', ad: 'Bir SOE kötü geçti', p: [all(2), mix(0, 5), all(2), all(2)] },
    { id: 'dengesiz', ad: 'Sabah parlak, öğleden sonra sınırda', p: [all(2), all(2), all(1), all(1)] },
    { id: 'sinirda', ad: 'Hepsi "sınırda"', p: [all(1), all(1), all(1), all(1)] },
  ];
})();

/* Hazırlık: klinik senaryo yapısı (rehberdeki örnek üzerinden) [[S6 s. 10]] */
VERI.senaryo = {
  vaka: '67 yaşında, 100 kg, 1,67 m boyunda erkek hasta; 10 cm\'lik abdominal aort anevrizması için elektif onarım planlanıyor. Altı ay önce miyokard enfarktüsü geçirmiş, 10 yılı aşkın süredir insüline bağımlı olmayan diyabeti var. "Bu olgunun anestezi yönetimini tartışın."',
  adimlar: [
    { k: 'Sorunları tanımlayın', t: 'Birincil sorun anevrizma ve onarımıdır: ameliyat neleri gerektirecek? İkincil sorunlar: hasta obez (VKİ ≈ 35,9 kg/m²), kardiyovasküler sorunları henüz sayısallaştırılmamış ve diyabetik.', ex: 'Anestezi yönetimi serviste başlar.' },
    { k: 'Öykü, muayene, tetkik', t: 'Bu sorunlara odaklanan tam bir tıbbi öykü; olası komplikasyonları ortaya koyacak uygun muayene ve tetkikler.', ex: 'Neyi neden istediğinizi söyleyin.' },
    { k: 'Teknik seçimi', t: 'Anestezi tekniğinin seçimi ve gerekçesi.', ex: 'Kendi kurumunuzda olağan olan, iyi bildiğiniz yöntemlere dayanın; sınavcının duymak istediğini sandığınız bilmediğiniz yollara sapmayın.' },
    { k: 'Monitörizasyon', t: 'Olguya uygun monitörizasyon.', ex: 'Sınavcı bir monitörü kontrol ettiğinizi varsayamaz: söylemeniz gerekir.' },
    { k: 'Komplikasyon yönetimi', t: 'Beklenen komplikasyonların önlenmesi ve yönetimi.', ex: 'Sınavcı tutumunuzdan emin olup olmadığınızı görmek için cevabınızı sorgulayabilir; kanıta dayanan, gerekçeli görüş kabul edilir.' },
    { k: 'Postoperatif analjezi', t: 'Ameliyat sonrası ağrı kontrolü.', ex: 'Bu konu tek başına sürenin çoğunu alabilir; sınavcı konuyu birden kesip başka bir konuya geçebilir. Bu, cevaptan memnun olmadığı anlamına gelmez.' },
  ],
};

/* Hazırlık: akciğer grafisi okuma sistemi [[S6 s. 11]]; çizim şematik, gerçek grafi değildir */
VERI.grafi = [
  { k: 'İşaret ve projeksiyon', hl: ['hl-mark'], t: 'Önce taraf işaretini (R/L) ve projeksiyonu (PA, AP, yatarak) okuyun. Bu şemada AP, yatarak çekilmiş bir yoğun bakım grafisi var; AP grafide kalp gölgesi olduğundan büyük görünür.' },
  { k: 'Kalite', hl: ['hl-rot', 'hl-pen', 'hl-insp'], t: 'Penetrasyon, rotasyon ve inspirasyon. Yaygın ölçütler: klavikula iç uçları spinöz çıkıntıya eşit uzaklıktaysa rotasyon yoktur; vertebralar kalp gölgesinin arkasında seçilebiliyorsa penetrasyon yeterlidir; diyafram üstünde yaklaşık 6 ön ya da 10 arka kaburga görülüyorsa inspirasyon yeterlidir.' },
  { k: 'Bölgeler', hl: ['hl-soft', 'hl-bone', 'hl-lung', 'hl-heart', 'hl-med', 'hl-dia', 'hl-abd'], seq: true, t: 'Sırayla: toraks dışı yumuşak dokular, kemikler, akciğerler, kalp, mediasten, diyafram ve görülebilen batın. Hep aynı sırayı izlemek bir alanı atlamanızı önler.' },
  { k: 'Cihazlar ve artefaktlar', hl: ['hl-dev'], t: 'Cerrah ya da anestezistin yerleştirdiği her şeyi tek tek adlandırın: endotrakeal tüp, santral venöz kateter, nazogastrik sonda, EKG elektrotları. Her birinin ucunu bulun.' },
  { k: 'Tanı önerisi', hl: ['hl-dx'], t: 'Bu şemada endotrakeal tüpün ucu karina düzeyinde: tüp fazla ilerlemiş, sağ ana bronşa girme riski var. (Erişkinde uç, baş nötraldeyken genellikle karinanın birkaç santimetre üstünde istenir.)' },
  { k: 'Klinik etki', hl: ['hl-dx'], t: 'Bulgunun yönetime etkisini tartışın: tek akciğer ventilasyonu, sol akciğerde atelektazi ve hipoksemi riski; tüpü geri çekip iki taraflı solunum seslerini ve kapnografiyi yeniden değerlendirmek, gerekirse grafiyi tekrarlamak.' },
];

/* Hazırlık: çevrim içi Part II için donanım ve oda [[S10 s. 3–5]] [[S6 s. 11]] */
VERI.ekipman = [
  { t: 'Kimsenin girmeyeceği, kapısı kapalı, sessiz ve iyi aydınlatılmış özel bir oda. Ana ışık kaynağı (örneğin pencere) arkanızda ya da yanınızda olmamalı.', r: '[[S10 s. 4]]' },
  { t: 'Dahili kameralı dizüstü bilgisayar (tablet ve telefon kabul edilmez). Kamera yüzünüzü ve göğsünüzün üst kısmını, kimlik fotoğrafındaki gibi göstermeli.', r: '[[S10 s. 4]]' },
  { t: 'Kablolu internet ya da kararlı Wi-Fi. Bağlantıyı haftalar önceden test edin; rahat bir Zoom görüşmesi için en az 10–20 Mbps kararlı hız önerilir.', r: '[[S10 s. 4]]' },
  { t: 'Mikrofonlu, kablolu, iyi bir kulaklık. Bluetooth önerilmez; bilgisayarın dahili hoparlörü ve mikrofonu kullanılamaz.', r: '[[S10 s. 4]]' },
  { t: 'Sınav bilgisayarında Zoom\'un son sürümü kurulu ve hesap myESAIC\'te kullandığınız e-postayla açılmış.', r: '[[S10 s. 4]]' },
  { t: 'Masada yalnızca bilgisayar, fare, birkaç boş beyaz kâğıt, birkaç standart siyah kalem ve bir bardak su. Grafik çizebilmek için çok ince yazmayan siyah kalemler.', r: '[[S10 s. 3]] [[S6 s. 11]]' },
  { t: 'Telefon açık ama sessizde ya da titreşimde, uzanamayacağınız bir yerde (tercihen başka bir odada); görevli istediğinde gösterilecek.', r: '[[S10 s. 3–4]]' },
  { t: 'Görevli istediğinde oda kamerayla gösterilecek, ekran paylaşılacak ve Zoom\'un "kontrol ver" özelliğiyle bilgisayarın kontrolü verilecek.', r: '[[S10 s. 4–5]]' },
  { t: 'Her oturumdan önce kâğıt ve kalem görevliye gösterilecek; sorular ve notlar her oturumdan hemen sonra yırtılıp atılacak.', r: '[[S10 s. 3]] [[S10 s. 5]]' },
  { t: 'Prova (mock-test) oturumuna katılın. Sınav çoğunlukla hafta sonudur; evdeki bant genişliğini başkaları da kullanabilir, hastanenizin bağlantısı daha iyi olabilir.', r: '[[S6 s. 11]]' },
];

/* Hazırlık listem (tarayıcıda saklanır) */
VERI.liste = [
  { g: 'Başvurudan önce', m: [
    { id: 'uygun', t: 'Part I\'e kaydolmadan önce uzmanlık belgenizin Part II\'ye uygun olduğunu ESAIC\'in ülke listesinden kontrol edin. Uygunluğu kontrol etmek adayın sorumluluğudur.', r: '[[S11]] [[S2]]' },
    { id: 'hesap', t: 'Kayıt açılmadan myESAIC hesabınıza girebildiğinizi kontrol edin; exam@esaic.org ve info@esaic.org adreslerini güvenilir gönderenlere ekleyin.', r: '[[S2]]' },
    { id: 'dil', t: 'Sınav dilini ve merkezi baştan doğru seçin: değişiklik kaydı iptal ettirir (50 € işlem ücreti) ve kayıt bitiminden sonra hiç yapılamaz.', r: '[[S2]] [[S3]]' },
    { id: 'erken', t: 'Kaydı erken yapın: merkezlerin ve Part II dillerinin yer sayısı sınırlıdır, dolan merkez için bekleme listesi yoktur.', r: '[[S2]] [[S3]]' },
    { id: 'kural', t: 'Aday kurallarını okuyun ve kabul edin (Part I kuralları, Part II aday sözleşmesi, iptal politikası).', r: '[[S2]] [[S10]]' },
    { id: 'vize', t: 'Yurt dışında sınava girecekseniz vize başvurusunu kayıtla aynı anda yapın; vize reddinde ücret iade edilmez.', r: '[[S2]] [[S3]]' },
  ] },
  { g: 'Part I hazırlığı', m: [
    { id: 'plan', t: 'Beklenen bilgi listesini bir çalışma planına dönüştürün: Paper A temel bilimler, Paper B klinik konular.', r: '[[S6 s. 4–6]]' },
    { id: 'hola', t: 'Nisan\'daki HOLA\'ya girin ve konu alanı raporuna göre zayıf alanlarınızı belirleyin.', r: '[[S4]]' },
    { id: 'strateji', t: 'Bir MTF stratejisi seçin ve deneme sınavında süre tutarak uygulayın.', r: '[[S6 s. 6]]' },
    { id: 'aktar', t: 'Kâğıt sınavda cevapları optik forma aktarmak için yaklaşık 30 dakika ayırmayı planlayın.', r: '[[S6 s. 6]]' },
    { id: 'ornek', t: 'ESAIC\'in örnek sorularını (Türkçesi de var) ve EDAIC Trainer uygulamasını kullanın.', r: '[[S5]] [[S13]]' },
  ] },
  { g: 'Part II hazırlığı', m: [
    { id: 'sunum', t: 'Eğitmenlerinizle ve arkadaşlarınızla vaka sunma ve tartışma pratiği yapın. Sınava anadilinizde girmiyorsanız bu daha da önemlidir.', r: '[[S6 s. 10]] [[S6 s. 13]]' },
    { id: 'yapi', t: 'Klinik senaryoyu hep aynı yapıyla anlatmayı çalışın: sorunlar, değerlendirme, teknik, monitörizasyon, komplikasyonlar, postoperatif analjezi.', r: '[[S6 s. 10]]' },
    { id: 'goruntu', t: 'Görüntüleri (ör. akciğer grafisi) sistematik okumayı ve sisteminizi yüksek sesle anlatmayı çalışın.', r: '[[S6 s. 11]]' },
    { id: 'cizim', t: 'Sık kullanılan grafik ve diyagramları değerleriyle çizmeyi çalışın (ör. oksihemoglobin dissosiyasyon eğrileri, farmakokinetik ve farmakodinamik eğriler).', r: '[[S6 s. 11]]' },
    { id: 'als', t: 'Her yaş grubu için resüsitasyon algoritmalarını ve ERC kılavuzlarını güncel tutun; kritik durumu ABCDE ile ele alın.', r: '[[S6 s. 10]]' },
    { id: 'vivac', t: 'Sınav düzenine alışmak için VIVAC kursunu ve Part II deneme sınavı atölyesini değerlendirin.', r: '[[S5]]' },
  ] },
  { g: 'Sınav günü', m: [
    { id: 'kimlik', t: 'Davet mektubunu ve geçerli bir kimliği (tercihen pasaport) yanınıza alın; kimliği doğrulanamayan aday sınava alınmaz.', r: '[[S6 s. 11]] [[S8]]' },
    { id: 'p1saat', t: 'Part I\'de her kâğıttan 30 dakika önce hazır olun; geç kalan o kâğıda alınmaz ve Part I\'den kalır.', r: '[[S8]]' },
    { id: 'p2saat', t: 'Part II\'de her SOE\'den en az 15 dakika (çevrim içinde 30 dakika) önce yerinizde olun.', r: '[[S6 s. 12]] [[S10 s. 2–3]]' },
    { id: 'cihaz', t: 'Saat dahil hiçbir cihazı hazırlık odasına ve sınav salonuna sokmayın; kapalı ya da uçak modunda olsa bile diskalifiye nedenidir.', r: '[[S10 s. 2]]' },
    { id: 'anonim', t: 'Kendinizi yalnızca aday numaranızla tanıtın; adınızı ve hastanenizi söylemeyin.', r: '[[S10 s. 2]]' },
  ] },
];

/* Yıllık takvim (2026–2027 döngüsü, 21 Kasım 2026'da ESAIC sayfalarında yazan tarihler) */
VERI.takvim = [
  { ay: 0, c: 'ola kayit', k: 'HOLA kaydı açılır', t: 'Bireysel kayıt 6 Ocak 2027, 13:30 CET\'te açılır, 10 Mart 2027\'de kapanır. [[S4]]' },
  { ay: 1, c: 'ola kayit', k: 'HOLA grup kaydı biter', t: 'Eğitim sorumlularının toplu (grup) kaydı 5 Şubat 2027, 13:30 CET\'te kapanır. [[S4]]' },
  { ay: 1, c: 'p2', k: 'Part II başlar', t: 'Part II Şubat–Aralık arasında farklı merkezlerde yapılır. 2027\'nin ilk oturumu 19–21 Şubat, çevrim içi (Fransızca/İngilizce). [[S3]]' },
  { ay: 2, c: 'ola kayit', k: 'HOLA kaydı biter', t: 'Bireysel kayıt 10 Mart 2027\'de kapanır. [[S4]]' },
  { ay: 2, c: 'p2', k: 'Part II Ankara', t: '19–21 Mart 2027. Aday merkezde bulunur; sınavcılar Zoom ile bağlanır. [[S3]]' },
  { ay: 3, c: 'ola', k: 'OLA · HOLA', t: 'OLA 16 Nisan 2027 (yalnız Moldova, Slovenya ve Fransızca konuşulan Belçika için); HOLA 22 Nisan–4 Mayıs 2027 arasında evden. [[S4]]' },
  { ay: 5, c: 'p1 kayit', k: 'Part I kaydı biter', t: '2026\'da kayıt 11 Haziran 23:59\'da kapandı. 2027 kayıt dönemi henüz duyurulmadı. [[S2]]' },
  { ay: 6, c: 'p2', k: 'Part II İzmir', t: '2–4 Temmuz 2027. Aday merkezde bulunur; sınavcılar Zoom ile bağlanır. [[S3]]' },
  { ay: 8, c: 'p1', k: 'Part I', t: '11 Eylül 2027, Cumartesi. Avrupa\'da Paper A sabah, Paper B öğleden sonra. [[S2]] [[S6 s. 6]]' },
  { ay: 9, c: 'p2', k: 'Part II İstanbul', t: '9–10 Ekim 2027. [[S3]]' },
  { ay: 10, c: 'p2 kayit', k: 'Part II kaydı açılır', t: '2027 sınavları için kayıt 17 Kasım 2026\'da açıldı. 2 Aralık\'ta kalan yerler herkese açılır; 15 Aralık\'ta İngilizce, Portekizce ve Türkçe için sınırlı sayıda ek yer açılır. [[S3]]' },
  { ay: 11, c: 'p2 kayit', k: 'Part II kaydı biter', t: '21 Aralık 2026, 23:59 CET. Bu tarihten sonra kayıt yapılamaz. [[S3]]' },
];
