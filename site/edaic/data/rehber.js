/* Kitap rehberi (K4: How to Pass the EDAIC, OUP 2023). Metinler bu atlas için kendi cümlelerimizle yazılır;
   kitabın metni, soruları ve model yanıtları aktarılmaz. Sayfa numaraları kitabın PDF sürümünün fiziksel sayfalarıdır.
   Deneme soruları (VERI.sorular['htp-…']) bu atlas için yazılmıştır; kitaptaki hiçbir sorunun kökü ya da önermesi kullanılmaz. */
VERI.sorular = VERI.sorular || {};
VERI.rehber = {
  bolumler: [
    { no: 1, ad: 'Giriş', kisim: 1, kagit: 'Giriş', s: 23, son: 25, rota: 'sinav/genel',
      ozet: 'Diplomanın hangi eğitim ihtiyacından doğduğunu ve adayların yazılıya hazırlanırken kullanabileceği araçları tanıtır. [[K4 s. 23–25]]',
      odak: ['Avrupa’da ortak eğitim hedefi [[K4 s. 23–24]]', 'Diplomanın amaçları [[K4 s. 25]]', 'Çevrim içi öz değerlendirme (OLA) [[K4 s. 25]]'] },
    { no: 2, ad: 'EDAIC sınavının yapısı (Part I ve II)', kisim: 1, kagit: 'Giriş', s: 26, son: 30, rota: 'sinav/part1',
      ozet: 'Yazılı oturumların konu dağılımından başlayıp sözlü sınavın işleyişine ve değerlendirmenin nasıl yapıldığına geçer. [[K4 s. 26–30]]',
      odak: ['Temel bilimlerin kapsamı [[K4 s. 26–27]]', 'Klinik konu dağılımı [[K4 s. 27–28]]', 'Sözlüde puanlama [[K4 s. 30]]'] },
    { no: 3, ad: 'Çoktan seçmeli sorular (MCQ) nasıl yanıtlanır?', kisim: 1, kagit: 'Part I', s: 31, son: 40, rota: 'hazirlik/part1',
      ozet: 'Farklı test biçimlerini karşılaştırır. Örnekler üzerinden bir MTF kökünü okumayı ve yanıtları birkaç turda tamamlamayı ele alır. [[K4 s. 31–40]]',
      odak: ['Bağımsız önermeler [[K4 s. 32]]', 'Sorudaki varsayımlar [[K4 s. 34]]', 'İkinci okuma [[K4 s. 37–38]]'] },
    { no: 4, ad: 'Part II sınavı nasıl geçilir?', kisim: 1, kagit: 'Part II', s: 41, son: 51, rota: 'hazirlik/part2',
      ozet: 'Sözlü oturumların her birinde adaydan ne beklendiğini anlatır. Hazırlık notundan görüşmenin sonuna kadar prova önerileri verir. [[K4 s. 41–51]]',
      odak: ['Grafik hazırlığı [[K4 s. 43]]', 'Karşılıklı prova [[K4 s. 46–47]]', 'Görevlinin geri bildirimi [[K4 s. 50]]'] },
    { no: 5, ad: 'Fizyoloji', kisim: 2, kagit: 'Paper A', s: 54, son: 103, rota: 'dersler/fizyoloji',
      ozet: '45 MTF sorusu, organların tek tek işlevlerinden gebelikteki uyuma uzanır. Sorulardan sonra gerekçeler yer alır. [[K4 s. 54–103]]',
      odak: ['Solunumun denetimi [[K4 s. 54–55]]', 'Kalp döngüsü [[K4 s. 58–59]]', 'Gebelik fizyolojisi [[K4 s. 64]]'] },
    { no: 6, ad: 'Farmakoloji', kisim: 2, kagit: 'Paper A', s: 104, son: 137, rota: 'dersler/farmakoloji',
      ozet: '45 MTF sorusunda anestezikler, dolaşım ilaçları ve eşlik eden hastalıkların tedavisinde karşılaşılan ilaçlar ele alınır. [[K4 s. 104–137]]',
      odak: ['Vazoaktif ajanlar [[K4 s. 104–106]]', 'Nöromüsküler blok ve geri döndürme [[K4 s. 108–109]]', 'Diüretikler [[K4 s. 112]]'] },
    { no: 7, ad: 'Anatomi', kisim: 2, kagit: 'Paper A', s: 138, son: 151, rota: null,
      ozet: '10 MTF sorusu sinir yollarını, vücut bölgelerinin komşuluklarını ve organların damarlarını yoklar. [[K4 s. 138–151]]',
      odak: ['Omurilikte ağrı iletimi [[K4 s. 138]]', 'Larinksin sinirleri [[K4 s. 139]]', 'Uyluğun damar ve sinirleri [[K4 s. 140–141]]'] },
    { no: 8, ad: 'Fizik', kisim: 2, kagit: 'Paper A', s: 152, son: 181, rota: null,
      ozet: '25 MTF sorusu gaz davranışından ameliyathane donanımına geçer. Ölçüm araçları ve elektrik güvenliği de kapsamdadır. [[K4 s. 152–181]]',
      odak: ['Tüpte akış [[K4 s. 153]]', 'Vaporizatörler [[K4 s. 155]]', 'Elektriksel korunma [[K4 s. 156]]'] },
    { no: 9, ad: 'İstatistik', kisim: 2, kagit: 'Paper A', s: 182, son: 191, rota: null,
      ozet: '10 MTF sorusu veriyi betimleme, araştırma tasarımı ve istatistiksel çıkarım arasında bağlantı kurar. [[K4 s. 182–191]]',
      odak: ['Yayılım ölçüleri [[K4 s. 182]]', 'Körleme [[K4 s. 183]]', 'Test sonuçlarının yorumu [[K4 s. 184]]'] },
    { no: 10, ad: 'Genel anestezi', kisim: 3, kagit: 'Paper B', s: 194, son: 217, rota: null,
      ozet: '25 MTF sorusunda ameliyat öncesi değerlendirme, anestezi izlemi ve perioperatif komplikasyonlar birlikte ele alınır. [[K4 s. 194–217]]',
      odak: ['Hava yolu değerlendirmesi [[K4 s. 194]]', 'Kapnografi [[K4 s. 198]]', 'Kanama izlemi [[K4 s. 201]]'] },
    { no: 11, ad: 'Rejyonal anestezi', kisim: 3, kagit: 'Paper B', s: 218, son: 235, rota: null,
      ozet: '15 MTF sorusu periferik ve nöroaksiyel teknikleri, girişim bölgesinin anatomisini ve hastaya özgü riskleri işler. [[K4 s. 218–235]]',
      odak: ['Eklem cerrahisinde analjezi [[K4 s. 218]]', 'Lomber ultrason [[K4 s. 220]]', 'Üst ekstremite blokları [[K4 s. 222]]'] },
    { no: 12, ad: 'Özel anestezi', kisim: 3, kagit: 'Paper B', s: 236, son: 283, rota: null,
      ozet: '30 MTF sorusu farklı cerrahi uzmanlık alanlarını, obstetrik ve pediatrik anesteziyi, ayrıca kronik ağrıyı kapsar. [[K4 s. 236–283]]',
      odak: ['Peripartum sorunlar [[K4 s. 236–237]]', 'Akciğer izolasyonu [[K4 s. 239]]', 'Nöropatik ağrı [[K4 s. 244–245]]'] },
    { no: 13, ad: 'Yoğun bakım', kisim: 3, kagit: 'Paper B', s: 284, son: 327, rota: null,
      ozet: '22 MTF sorusunda ameliyat sonrası kötüleşmeden çoklu organ sorunlarına kadar kritik hastanın değerlendirilmesi tartışılır. [[K4 s. 284–327]]',
      odak: ['Şok tipleri [[K4 s. 285–286]]', 'Ventilatörden ayırma [[K4 s. 289]]', 'Beslenme ve deliryum [[K4 s. 291]]'] },
    { no: 14, ad: 'İç hastalıkları', kisim: 3, kagit: 'Paper B', s: 328, son: 347, rota: null,
      ozet: '15 MTF sorusu eşlik eden hastalıkları öykü, laboratuvar, EKG ve solunum testleriyle ilişkilendirir. [[K4 s. 328–347]]',
      odak: ['Elektrolitler ve EKG [[K4 s. 328]]', 'Solunum fonksiyon testleri [[K4 s. 329]]', 'Adrenal ve renal hastalıklar [[K4 s. 331]]'] },
    { no: 15, ad: 'Acil tıp', kisim: 3, kagit: 'Paper B', s: 348, son: 378, rota: null,
      ozet: '20 MTF sorusu akut başvurularda tanıyı ve ilk müdahaleyi ele alır. Travma ve zehirlenme de soru grupları arasındadır. [[K4 s. 348–378]]',
      odak: ['Göğüs ağrısı [[K4 s. 348–349]]', 'Toksikolojik aciller [[K4 s. 351]]', 'Gebede travma [[K4 s. 354]]'] },
    { no: 16, ad: 'Uygulamalı fizyoloji', kisim: 4, kagit: 'SOE', s: 381, son: 397, rota: 'dersler/fizyoloji',
      ozet: 'Beş sözlü soru dizisi oksijen taşınması, beyin, akciğer, böbrek ve kalsiyum dengesi etrafında ilerler. [[K4 s. 381–397]]',
      odak: ['Hemoglobin eğrileri [[K4 s. 381]]', 'Gaz değişimi [[K4 s. 382]]', 'Kalsiyum dengesi [[K4 s. 383]]'] },
    { no: 17, ad: 'Uygulamalı farmakoloji', kisim: 4, kagit: 'SOE', s: 398, son: 423, rota: 'dersler/farmakoloji',
      ozet: 'Beş SOE dizisi ilaçların moleküler etkisini klinik kullanımına bağlar. Reseptör davranışı ve anestezik seçimi ayrı dizilerde işlenir. [[K4 s. 398–423]]',
      odak: ['Lokal anesteziklerin özellikleri [[K4 s. 398]]', 'Doz–yanıt grafikleri [[K4 s. 399]]', 'Kas gevşeticiler [[K4 s. 401]]'] },
    { no: 18, ad: 'Uygulamalı anatomi', kisim: 4, kagit: 'SOE', s: 424, son: 449, rota: null,
      ozet: 'Beş sözlü dizisinde anatomik yapıyı tarif etme ve girişim sırasında karşılaşılan komşulukları açıklama pratiği yapılır. [[K4 s. 424–449]]',
      odak: ['Larinks [[K4 s. 424]]', 'Karın duvarı [[K4 s. 425]]', 'Lomber pleksus [[K4 s. 426]]'] },
    { no: 19, ad: 'Klinik ölçümler', kisim: 4, kagit: 'SOE', s: 450, son: 472, rota: null,
      ozet: 'Beş SOE dizisi monitörün hangi sinyali algıladığını, sonucun nerede yanıltabileceğini ve görüntüleme yöntemlerini tartışmaya açar. [[K4 s. 450–472]]',
      odak: ['Oksimetri [[K4 s. 450]]', 'Arter basıncı ölçümü [[K4 s. 451]]', 'Kas bloğunun izlemi [[K4 s. 452]]'] },
    { no: 20, ad: 'Genel anestezi', kisim: 4, kagit: 'SOE', s: 473, son: 487, rota: null,
      ozet: 'Üç klinik öykünün her biri iki aşamada ele alınır. Altı sözlü soru dizisi adaydan önce hastayı değerlendirmesini, ardından anestezi ve izlem planını savunmasını ister. [[K4 s. 473–487]]',
      odak: ['Robotik cerrahide izlem [[K4 s. 474]]', 'Obstetrik değerlendirme [[K4 s. 475]]', 'Çocukta acil cerrahi [[K4 s. 476]]'] },
    { no: 21, ad: 'Kritik olaylar', kisim: 4, kagit: 'SOE', s: 488, son: 511, rota: null,
      ozet: 'Beş olay çevresinde gelişen sözlü dizileri, yeni bilgiler geldikçe öncelikleri yeniden belirlemeyi ve ekip içinde karar vermeyi işler. [[K4 s. 488–511]]',
      odak: ['Ameliyatta solunum sorunu [[K4 s. 489]]', 'Bilinç değişikliği [[K4 s. 490]]', 'Anestezi sırasında farkındalık [[K4 s. 492]]'] },
    { no: 22, ad: 'Yoğun bakım tıbbı', kisim: 4, kagit: 'SOE', s: 512, son: 520, rota: null,
      ozet: 'Beş sözlü dizisi üç klinik konuya ayrılır. Solunum yetersizliği ve pankreatit iki aşamada ilerler, son dizi böbrek desteğine odaklanır. [[K4 s. 512–520]]',
      odak: ['ARDS’de ventilasyon [[K4 s. 512]]', 'Pankreatitin seyri [[K4 s. 513]]', 'Renal replasman [[K4 s. 513]]'] },
    { no: 23, ad: 'Görüntü yorumlama', kisim: 4, kagit: 'SOE', s: 521, son: 536, rota: null,
      ozet: 'Beş görüntü üzerinden yürüyen sözlü dizileri, bulguyu tarif etmekten klinik anlamını tartışmaya geçer. [[K4 s. 521–536]]',
      odak: ['Akciğer grafisi [[K4 s. 521–522]]', 'Kesitsel görüntüleme [[K4 s. 523–524]]', 'Ekokardiyografi [[K4 s. 524–525]]'] },
  ],
};

VERI.sorular['htp-1'] = {
  no: 1, kagit: "Paper A · Fizyoloji",
  kok: "Bir saatte 90 mL idrar toplanıyor. X maddesinin idrardaki derişimi 40 mg/L, aynı süre boyunca plazmadaki derişimi 2 mg/L.", kaynak: '[[K4 s. 393]]',
  onermeler: [
    { t: "X’in idrarla atılma hızı 3,6 mg/saattir.", d: true, n: "Bir saatte atılan kütle 0,09 L × 40 mg/L ile bulunur. [[K4 s. 393]]" },
    { t: "Klirens hesabında 90 mL/dk idrar akımı kullanılmalıdır.", d: false, n: "Toplama süresi 60 dakikadır. Dakikadaki hacim 1,5 mL olur. [[K4 s. 393]]" },
    { t: "Bu ölçümler X için 30 mL/dk klirens verir.", d: true, n: "Dakikadaki idrar hacmi, idrar/plazma derişim oranı olan 20 ile çarpılır. [[K4 s. 393]]" },
    { t: "Plazma derişiminin ölçülmesi gereksizdir.", d: false, n: "Atılan kütleden arındırılmış plazma hacmine geçmek için plazmadaki derişim gerekir. [[K4 s. 393]]" },
    { t: "Bu sonuç tek başına hastanın glomerüler filtrasyon hızını verir.", d: false, n: "X’in tübüllerdeki taşınması bilinmiyor. Geri emilim ve sekresyon klirensi filtrasyondan farklılaştırabilir. [[K4 s. 393]]" },
  ],
};

VERI.sorular['htp-2'] = {
  no: 2, kagit: "Paper A · Farmakoloji",
  kok: "Aynı dokuda X ve Y aynı reseptörü uyarıyor. Tam reseptör işgalinde yanıt X ile 80, Y ile 32 birim. Bu sistemde ulaşılabilen en büyük yanıt 80 birim.", kaynak: '[[K4 s. 405–408]]',
  onermeler: [
    { t: "Y’nin bu deneydeki en büyük etkisi X’inkinin %60’ıdır.", d: false, n: "32/80 oranı 0,40 eder. [[K4 s. 406]]" },
    { t: "Y, bu dokuda parsiyel agonist gibi davranır.", d: true, n: "Bütün reseptörler doluyken bile Y, dokunun verebildiği yanıtın ancak bir kısmını oluşturur. [[K4 s. 405]]" },
    { t: "İki tepe değerinden X’in reseptöre daha sıkı bağlandığı anlaşılır.", d: false, n: "Bağlanma gücünü gösteren afiniteyi ölçmek için yalnız etki büyüklüğü yeterli değildir. [[K4 s. 405]]" },
    { t: "Y’nin derişimini artırarak 80 birime çıkılması beklenmez.", d: true, n: "Reseptör işgali zaten tamken sınırı Y’nin oluşturabildiği en büyük etki belirler. [[K4 s. 408]]" },
    { t: "Y’nin etkisi nötr bir antagonistin tek başına oluşturacağı yanıtla eşdeğerdir.", d: false, n: "Y reseptörü uyarır. Nötr antagonistin kendine ait uyarıcı etkisi yoktur. [[K4 s. 405]]" },
  ],
};

VERI.sorular['htp-3'] = {
  no: 3, kagit: "Paper A · Anatomi",
  kok: "Bir eğitim ekranında kasığın enine kesiti gösteriliyor. Düzey inguinal bağın hemen altı, ekranın sol kenarı hastanın mediali. Tipik anatomide ortadaki işaret femoral arteri gösteriyor.", kaynak: '[[K4 s. 150]]',
  onermeler: [
    { t: "Arterin solundaki komşu damar femoral venle uyumludur.", d: true, n: "Bu düzeyde ven medialde kaldığı için ekranın solunda görünür. [[K4 s. 150]]" },
    { t: "Femoral siniri bulmak için arterden sola ilerlenir.", d: false, n: "Sinir arterin lateralinde kalır. Verilen ekran yönünde bu taraf sağdır. [[K4 s. 150]]" },
    { t: "Femoral kılıfın dış sınırı çizilirse sinir de çizginin içinde kalır.", d: false, n: "Kılıf proksimal damarları çevreler. Sinir ayrı bir komşuluktadır. [[K4 s. 150]]" },
    { t: "Görüntü yatay olarak aynalanırsa femoral sinir arterin solunda görünür.", d: true, n: "Aynalama ekranın sağını ve solunu değiştirir, sinirin lateral komşuluğu korunur. [[K4 s. 150]]" },
    { t: "Uylukta daha distalde alınan kesitte veni aynı ekran koordinatında aramak yanıltabilir.", d: true, n: "Üçgenin tepesine doğru venin arterle ilişkisi değişir ve ven arkaya geçer. [[K4 s. 150]]" },
  ],
};

VERI.sorular['htp-4'] = {
  no: 4, kagit: "Paper A · Fizik",
  kok: "Bir tezgâhta aynı sıvı iki rijit silindirik borudan kararlı laminer akıyor. P borusu 12 cm, R borusu 36 cm. İç yarıçaplar eşit. Başlangıçta uçlar arasındaki basınç farkı ikisinde de aynı.", kaynak: '[[K4 s. 163]]',
  onermeler: [
    { t: "R’deki debi P’dekinin üç katıdır.", d: false, n: "Uzunluk üç katına çıktığında aynı basınç farkı ancak üçte bir debi oluşturur. [[K4 s. 163]]" },
    { t: "P’den 9 mL/s geçiyorsa R’den 3 mL/s geçer.", d: true, n: "Eşit yarıçap ve viskozitede debi oranı uzunluk oranının tersidir. [[K4 s. 163]]" },
    { t: "R’deki basınç farkını üç katına çıkarmak iki debiyi eşitler.", d: true, n: "Basınç farkının artışı uzun borunun üç katlık direncini dengeler. [[K4 s. 163]]" },
    { t: "R’nin uzunluğu korunup yarıçapı %10 artırılırsa direnci de %10 artar.", d: false, n: "Direnç yarıçapın dördüncü kuvvetiyle ters yönde değişir. [[K4 s. 163]]" },
    { t: "Başlangıçtaki P ve R uç uca eklenirse aynı toplam basınç farkında debi, P tek başınayken ölçülenin dörtte biri olur.", d: true, n: "Eşit çaplı seri hattın toplam uzunluğu 48 cm’dir. Bu, P uzunluğunun dört katıdır. [[K4 s. 163]]" },
  ],
};

VERI.sorular['htp-5'] = {
  no: 5, kagit: "Paper A · İstatistik",
  kok: "Bir araştırmada birbirinden bağımsız 36 ölçümün ortalaması 70 ms, örneklem standart sapması 12 ms. Ekip grafikte ortalamanın bir standart hatasını gösterecek.", kaynak: '[[K4 s. 187]]',
  onermeler: [
    { t: "Hata çubuğu ortalamadan her iki yöne 2 ms uzanır.", d: true, n: "12 ms, 36’nın karekökü olan 6’ya bölünür. [[K4 s. 187]]" },
    { t: "68–72 ms aralığı bireysel ölçümlerin yaklaşık %95’ini kapsar.", d: false, n: "Bu çubuk ortalamanın belirsizliğini anlatır. Tek tek ölçümlerin kapsanma oranı buradan çıkmaz. [[K4 s. 187]]" },
    { t: "Bağımsız ölçüm sayısı 144’e çıkar ve standart sapma aynı kalırsa yeni standart hata 1 ms olur.", d: true, n: "Karekök paydası 12’ye yükselir. [[K4 s. 187]]" },
    { t: "Bütün ölçümlere 5 ms eklemek ilk hata çubuğunu genişletir.", d: false, n: "Sabit eklemek ortalamayı kaydırır. Yayılım ve örneklem büyüklüğü aynı kalır. [[K4 s. 187]]" },
    { t: "Grafikte standart sapma seçilseydi ilk çubuğun yarı uzunluğu 6 ms olurdu.", d: false, n: "Standart sapma doğrudan kullanılırsa ortalamadan her yöne 12 ms gösterilir. [[K4 s. 187]]" },
  ],
};

VERI.sorular['htp-6'] = {
  no: 6, kagit: "Paper B · Genel anestezi",
  kok: "Cihaz değişiminde iki kapnograf deneniyor. K gazı ince bir hatla uzaktaki analizöre çekiyor. L’nin ölçüm başlığı solunum devresinde. İkisine de aynı test akciğeri bağlı.", kaynak: '[[K4 s. 465]]',
  onermeler: [
    { t: "K’de örnek alma hattı kıvrılırsa test akciğeri ventile edilirken CO₂ eğrisi kaybolabilir.", d: true, n: "Gaz analizöre ulaşmayınca örnek akışı kesilir. [[K4 s. 465]]" },
    { t: "K’deki örnek taşıma süresi, gazın kaynaktan çekilme hızından bağımsızdır.", d: false, n: "Belirli bir hat hacminin taşınma süresi örnek akımına bağlıdır. [[K4 s. 465]]" },
    { t: "L’de sinyal oluşturmak için gazı K’ninki gibi ayrı bir hortumdan çekmek gerekir.", d: false, n: "L ana akım ölçümü yapar. Optik başlık gazı devrede inceler. [[K4 s. 465]]" },
    { t: "K’de eğri silinince ana solunum devresinin ayrıldığı sonucu tek başına çıkarılamaz.", d: true, n: "Örnek hattındaki su veya tıkanma da sinyali bozabilir. [[K4 s. 465]]" },
    { t: "L’nin optik penceresinde kir bulunması iki cihazın sonuçları arasındaki farkı açıklayabilir.", d: true, n: "Penceredeki kir, gazdan geçen ışığın algılanmasını etkiler. [[K4 s. 465]]" },
  ],
};

VERI.sorular['htp-7'] = {
  no: 7, kagit: "Paper B · Rejyonal anestezi",
  kok: "Bir blok eğitiminde hasta kullanılmadan iki enjektör hazırlanıyor. A’da 8 mL %0,25, B’de 3 mL %0,5 bupivakain var. Etiketler kütle/hacim yüzdesini gösteriyor.", kaynak: '[[K4 s. 487]]',
  onermeler: [
    { t: "A’da 2 mg ilaç bulunur.", d: false, n: "Her mL’de 2,5 mg vardır. Sekiz mL toplam 20 mg içerir. [[K4 s. 487]]" },
    { t: "B, A’dan daha yüksek derişimde olmasına rağmen daha az ilaç içerir.", d: true, n: "B’de 3 × 5 = 15 mg, A’da 20 mg vardır. [[K4 s. 487]]" },
    { t: "İkisi bir kapta toplanırsa toplam kütle 35 mg olur.", d: true, n: "Karışımda başlangıçtaki 20 mg ile 15 mg birlikte bulunur. [[K4 s. 487]]" },
    { t: "A’ya 8 mL ilaçsız seyreltici eklenince içindeki toplam ilaç 10 mg’a iner.", d: false, n: "Seyreltici hacmi artırır. Kayıp olmadığında ilaç kütlesi 20 mg kalır. [[K4 s. 487]]" },
    { t: "B’den alınan 1 mL ile A’dan alınan 2 mL aynı ilaç kütlesini taşır.", d: true, n: "Her iki örnekte de derişim ile hacmin çarpımı 5 mg’dır. [[K4 s. 487]]" },
  ],
};

VERI.sorular['htp-8'] = {
  no: 8, kagit: "Paper B · Özel anestezi",
  kok: "Toraks cerrahisi provasında tek akciğer ventilasyonu bir modelle gösteriliyor. Sağ akciğere gaz gitmiyor. Başlangıçta toplam pulmoner kan akımının %30’u sağa gidiyor, sol akciğerde gaz değişimi normal.", kaynak: '[[K4 s. 390–392]]',
  onermeler: [
    { t: "Modelde sağ akciğerden gelen kan arteriyel karışıma oksijenlenmeden katılır.", d: true, n: "Ventilasyonun sıfır olduğu bölgede perfüzyon sürerse kan alveol gazından oksijen alamaz. [[K4 s. 390]]" },
    { t: "Sağ akciğerin bu durumunu alveoler ölü boşluk olarak adlandırmak uygundur.", d: false, n: "Ölü boşlukta gazın ulaştığı bölgeye yeterli kan gelmez. Burada kesilen akım havadır. [[K4 s. 391]]" },
    { t: "Sağa giden pay %10’a inerse modeldeki şant payı 20 yüzde puanı azalır.", d: true, n: "Ventile edilmeyen taraftaki akım toplamın %30’undan %10’una düşmüştür. [[K4 s. 391]]" },
    { t: "Sağdaki hipoksik vazokonstriksiyon, kanı özellikle ventilasyonsuz tarafa yönlendirir.", d: false, n: "Yerel direnç artışı akımı gaz alan tarafa yöneltir. [[K4 s. 392]]" },
    { t: "Sağa giden kanın payını bilmek, karışımın oksijen içeriğini tek başına hesaplamaya yeter.", d: false, n: "Karışım hesabı için iki taraftan gelen kanın oksijen içeriği de gerekir. [[K4 s. 391]]" },
  ],
};

VERI.sorular['htp-9'] = {
  no: 9, kagit: "Paper B · Yoğun bakım",
  kok: "Ventilatör izleminde PEEP her iki ölçümde 8 cmH₂O. Sabah PaO₂ 72 mmHg ve FiO₂ %40, öğlen PaO₂ 84 mmHg ve FiO₂ %60. P/F oranını karşılaştırın.", kaynak: '[[K4 s. 514]]',
  onermeler: [
    { t: "Sabah hesabında payda 40 alınır.", d: false, n: "FiO₂ kesir olarak girilir. %40 için payda 0,40’tır. [[K4 s. 514]]" },
    { t: "Sabah P/F değeri 180 mmHg’dir.", d: true, n: "72/0,40 işlemi 180 verir. [[K4 s. 514]]" },
    { t: "Öğlen PaO₂ arttığı için P/F oranı da yükselmiştir.", d: false, n: "Öğlen daha yüksek oksijen desteğiyle 84/0,60 = 140 mmHg elde edilir. [[K4 s. 514]]" },
    { t: "ARDS tanısı diğer ölçütlerle doğrulanmışsa iki ölçüm de Berlin tanımında orta derecede oksijenlenme bozukluğuna uyar.", d: true, n: "Her iki oran da 100’ün üzerinde ve 200’ün altındadır. PEEP koşulu da karşılanır. [[K4 s. 514]]" },
    { t: "Bu iki kan gazı tek başına ARDS’nin başladığını kanıtlar.", d: false, n: "Zamanlama, görüntüleme ve ödemin olası kaynağı da değerlendirilir. [[K4 s. 514]]" },
  ],
};

VERI.sorular['htp-10'] = {
  no: 10, kagit: "Paper B · Acil tıp",
  kok: "Acilde iki hastanın ilk troponin sonucu laboratuvarın üst referans sınırının üç katıdır. Birinde eforla göğüs baskısı, diğerinde ateş ve yeni gelişen nefes darlığı vardır.", kaynak: '[[K4 s. 357–358]]',
  onermeler: [
    { t: "Eşit değerler, iki hastada aynı koroner lezyonu gösterir.", d: false, n: "Troponin miyokart hasarını bildirir. Hasarın yeri ve nedeni bu sayıdan okunamaz. [[K4 s. 357]]" },
    { t: "İkinci hastada miyokardit olasılığı bu laboratuvar sonucu ile bağdaşır.", d: true, n: "Kalp kasındaki inflamasyon da troponin salınmasına yol açabilir. [[K4 s. 358]]" },
    { t: "İlk hastanın iskemik belirtileri, troponin sonucunun yorumunu etkilemez.", d: false, n: "Kardiyak hasarı açıklamak için yakınmanın niteliği ve EKG birlikte değerlendirilir. [[K4 s. 357]]" },
    { t: "Akciğer embolisi ikinci hastadaki yüksekliği açıklayabilecek tanılar arasındadır.", d: true, n: "Pulmoner embolide kalbin yükü artabilir ve miyokart hasarı gelişebilir. [[K4 s. 358]]" },
    { t: "Tek örnek, iki hastada da troponinin son saatlerde yükseldiğini gösterir.", d: false, n: "Bir düzeyin yüksek olması değişimin yönünü vermez. Bunun için zaman içindeki ölçümler karşılaştırılır. [[K4 s. 357]]" },
  ],
};

SAYFALAR['rehber/genel'] = {
  grup: 'rehber', eyebrow: 'Kitap rehberi · How to Pass the EDAIC', baslik: 'EDAIC Sınavı Nasıl Geçilir?',
  lede: 'How to Pass the EDAIC (Oxford University Press, 2023), yazılı ve sözlü sınava adayın karşılaşacağı soru biçimleri üzerinden hazırlık sağlar. Editörleri Andrey Varvinskiy, Mario Zerafa ve Sue Hill, EDAIC sınavlarında görev almış ve sınav komitelerine başkanlık etmiş hekimlerdir. [[K4 s. 6–7]]',
  html: `
<section class="wrap blk"><h2>Kitabın dört kısmı</h2>
<p class="intro">İlk kısım sınavın mantığını anlatır. İkinci kısımda temel bilimleri Paper A, üçüncüde klinik kararları Paper B sorularıyla çalışırsınız. Dördüncü kısımda aynı bilgiyi yapılandırılmış sözlü sınavda (SOE) kullanırsınız. [[K4 s. 23]] [[K4 s. 11–12]]</p>
<div data-viz="bolumharita" data-kisim="1"></div></section>
<section class="wrap blk"><h2>Atlasla nasıl çalışılır?</h2>
<p>Giriş bölümünde iki hazırlık olanağı öne çıkar. OLA ile yazılının soru biçimini önceden deneyebilir, temel ve klinik bilimler kursuyla eksiklerinizi çalışabilirsiniz. Editörler okumayı sözlü prova ve ESAIC eğitim materyalleriyle birleştirmeyi önerir. [[K4 s. 25]] [[K4 s. 6]]</p>
<ol><li>Bir temel konu seçin. <a href="#/dersler/fizyoloji">Fizyoloji</a> veya <a href="#/dersler/farmakoloji">farmakoloji</a> dersinden sonra kitabın ilgili soru grubunu çözün.</li>
<li>Kararsız kaldığınız bir önermeyi seçin. Gerekçenizi yazıp kitaptaki açıklamayla karşılaştırın. <a href="#/hazirlik/part1">Part I hazırlığı</a> ile süre tutarak yeniden deneyin.</li>
<li>Aynı konuyu bir meslektaşınıza sesli anlatın. <a href="#/hazirlik/part2">Part II hazırlığı</a> ile yanıtınızı düzenleyin, ardından <a href="#/rehber/sorular">atlasın özgün sorularıyla</a> prova yapın.</li></ol></section>
<section class="wrap blk"><div data-viz="yerelkitap"></div></section>`,
};

SAYFALAR['rehber/part1'] = {
  grup: 'rehber', eyebrow: 'Kitap rehberi · How to Pass the EDAIC', baslik: 'Part I bölümleri',
  lede: 'Kitabın 2. bölümü iki oturumda neyin ölçüldüğünü, 3. bölümü ise bir önermeyi okurken hangi ayrıntıların kararı değiştirdiğini gösterir. [[K4 s. 26–32]]',
  html: `
<section class="wrap blk"><h2>Bir MTF setini çözerken</h2><div class="cols">
<article class="card"><h3>İki oturumu ayrı değerlendirin</h3><p>Denemeden sonra temel bilim ve klinik puanlarınızı ayrı çıkarın. Kitapta tarif edilen puanlamada her oturum kendi geçme sınırına göre değerlendirilir. [[K4 s. 29]]</p></article>
<article class="card"><h3>Kökü her maddeyle yeniden okuyun</h3><p>Kökteki koşulu beş önermeye de taşıyın. Bir önceki maddede verdiğiniz karar, sıradakinin doğru olma olasılığına ilişkin bir ipucu vermez. [[K4 s. 32]]</p></article>
<article class="card"><h3>Hangi hastadan söz ediliyor?</h3><p>Bir fizyoloji sorusunda yaş, hastalık veya anestezi belirtilmiş mi diye bakın. Özel bir koşul verilmemişse kitabın başlangıç varsayımı uyanık, sağlıklı erişkindir. [[K4 s. 34]]</p></article>
<article class="card"><h3>Tereddüde dönüş zamanı ayırın</h3><p>İlk geçişte emin olduklarınızı kaydedin. İkinci geçişte işlem veya akıl yürütme isteyenlere dönün. Son turda boşları tarayın. Kitabın puanlama örneğinde yanlış seçim puan eksiltmez. [[K4 s. 37–40]]</p></article>
</div></section>
<section class="wrap blk"><h2>Temel bilimler ve klinik bölümler</h2><div data-viz="bolumharita" data-kisim="2,3"></div></section>`,
};

SAYFALAR['rehber/part2'] = {
  grup: 'rehber', eyebrow: 'Kitap rehberi · How to Pass the EDAIC', baslik: 'Part II bölümleri',
  lede: 'Bir sorunun yanıtını bildiğinizi düşünüyorsanız kitabı kapatıp anlatmayı deneyin. Dördüncü bölüm, sessiz tekrardan karşılıklı sözlü provaya nasıl geçileceğini ele alır. [[K4 s. 42–47]]',
  html: `
<section class="wrap blk"><h2>Sözlü provada deneyin</h2><div class="cols">
<article class="card"><h3>Çizimi konuşmadan önce kurun</h3><p>Hazırlık sırasında açıklamanızı kolaylaştıracak grafiği seçin. Eksenlerin adlarını yazın ve kâğıdı karşınızdaki kişinin rahatça okuyabileceği ölçekte kullanın. [[K4 s. 43]]</p></article>
<article class="card"><h3>Olguyu bir kararla açın</h3><p>İlk cümlenizde planınızı değiştiren bulguyu söyleyin. Ardından hangi olasılığı araştıracağınızı ve sonucun yönetiminizi nasıl etkileyeceğini belirtin. [[K4 s. 43–44]]</p></article>
<article class="card"><h3>Dinleyiciye bir görev verin</h3><p>Bir meslektaşınızla önceden konu seçin. Beş dakikalık provada takıldığınız yeri not etmesini isteyin. Geri bildirimi alınca aynı açıklamayı sınav dilinde yeniden yapın. [[K4 s. 46–47]]</p></article>
<article class="card"><h3>Bir sorudan diğerine geçin</h3><p>Hatırlayamadığınız ayrıntıyı açıkça söyleyin. Görevlinin yüz ifadesinden puan çıkarmaya çalışmak sonraki soruya ayıracağınız dikkati dağıtır. [[K4 s. 48–50]]</p></article>
</div></section>
<section class="wrap blk"><h2>Sözlü prova için konular</h2><div data-viz="bolumharita" data-kisim="4"></div></section>`,
};

SAYFALAR['rehber/sorular'] = {
  grup: 'rehber', eyebrow: 'Kitap rehberi · How to Pass the EDAIC', baslik: 'Deneme soruları',
  lede: 'Bu sayfadaki sorular bu atlas için yazılmıştır, kitaptaki sorular değildir. Her MTF’de beş önermeyi ayrı ayrı işaretleyin. Puanladıktan sonra gerekçeleri ve ilgili K4 sayfalarını inceleyin.',
  html: `
<section class="wrap blk"><h2>Paper A · Temel bilimler</h2>
<div class="viz" data-viz="mtf" data-q="htp-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-5"></div></section>
<section class="wrap blk"><h2>Paper B · Klinik uygulama</h2>
<div class="viz" data-viz="mtf" data-q="htp-6"></div>
<div class="viz" data-viz="mtf" data-q="htp-7"></div>
<div class="viz" data-viz="mtf" data-q="htp-8"></div>
<div class="viz" data-viz="mtf" data-q="htp-9"></div>
<div class="viz" data-viz="mtf" data-q="htp-10"></div></section>
<section class="wrap blk"><h2>İki sözlü prova</h2><p class="intro">Açılış sorusunu sesli yanıtlayın. Bir arkadaşınız ek soruları sırayla sorsun. Sonunda yanıt başlıklarını birlikte açın.</p>
<div class="cols"><article class="card soe-soru"><h3>Kritik olay · Nakil sırasında oksijen alarmı</h3>
<p><b>Açılış sorusu.</b> Entübe hastayı tomografiye götürürken transport ventilatörü oksijen besleme basıncı alarmı veriyor. SpO₂ %98. İlk dakika içinde ekibin işlerini nasıl paylaştırırsınız?</p>
<h4>Ek sorular</h4><ol><li>Hasta başındaki kişi ventilasyonun sürdüğünü nasıl değerlendirir?</li><li>Tüp manometresi basınç gösterirken ventilatöre gaz ulaşmamasını hangi bağlantılar açıklayabilir?</li><li>Nakle yeniden başlamadan önce neyi doğrularsınız?</li></ol>
<details><summary>Beklenen yanıtın başlıkları</summary><ul class="iskelet"><li>Nakli durdurma, yardım çağırma ve hasta başında görev paylaşımı.</li><li>Göğüs hareketi, hava yolu açıklığı, kapnogram ve oksijenlenmenin birlikte kontrolü. [[K4 s. 493]]</li><li>Gerektiğinde bağımsız oksijen kaynağı ve kendiliğinden şişen balonla ventilasyon. Tüp vanası, regülatör ve besleme hattının kontrolü. [[K4 s. 493]]</li><li>Yeterli oksijen rezervi, çalışan ventilatör ve stabil hasta ile nakle devam. [[K4 s. 166]] [[K4 s. 493]]</li></ul></details></article>
<article class="card soe-soru"><h3>Klinik ölçüm · Masa yükselince değişen basınç</h3>
<p><b>Açılış sorusu.</b> Ameliyat masası 20 cm yükseltiliyor. Arter transdüseri duvarda sabit. Arter hattında ortalama basınç birden yükselirken kalp düzeyindeki manşonun ölçümü değişmiyor. Bu farkı nasıl sınarsınız?</p>
<h4>Ek sorular</h4><ol><li>Yatak hareketi tek başına hangi yönde ve yaklaşık kaç mmHg fark yaratır?</li><li>Transdüseri atmosfere açıp sıfırlamak tek başına yeter mi?</li><li>Seviyeyi düzelttikten sonra dalga tepesi hâlâ küntse hatta ne ararsınız?</li></ol>
<details><summary>Beklenen yanıtın başlıkları</summary><ul class="iskelet"><li>Hastanın dolaşımını ve bağımsız ölçümü birlikte değerlendirme.</li><li>Kalbin aşağısında kalan transdüserde yaklaşık 15 mmHg fazla okuma. [[K4 s. 460]]</li><li>Transdüseri referans düzeyine getirme, sıfırı denetleme ve ölçümleri tekrarlama. [[K4 s. 460]]</li><li>Aşırı sönümleme açısından hava kabarcığı, pıhtı ve kıvrılma kontrolü. [[K4 s. 461]]</li></ul></details></article></div></section>`,
};
