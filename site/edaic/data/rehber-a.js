/* Kitap rehberi · bölüm bölüm deneme soruları, paket A (Codex): Part I bölüm 5–9 (Paper A) MTF + Part II bölüm 16–19 SOE.
   Sayfalar: SAYFALAR['rehber/sorular/NN']; sorular: VERI.sorular['htp-NN-k'].
   Bütün sorular bu atlas için yazılmıştır; kitaptaki hiçbir sorunun kökü, senaryosu ya da önermesi kullanılmaz. */
VERI.sorular = VERI.sorular || {};

VERI.sorular['htp-05-1'] = {
  no: 1, kagit: "Paper A · Fizyoloji",
  kok: "Bir akciğer modelinde her iki bölmeye de gaz giriyor. Bölmelerden birinin kan girişi kapatılıyor. Soluk hacmi, frekans ve bağlantı hortumları sabit tutuluyor.", kaynak: '[[K4 s. 72]]',
  onermeler: [
    { t: "Kan girişi kesilen bölmeye verilen gazın tamamı ölü boşluk ventilasyonuna katılır.", d: true, n: "Bölme havalanır, ancak gaz alışverişine katılacak kan gelmez. [[K4 s. 72]]" },
    { t: "Bu değişiklik iletici hava yollarının iç hacmini artırır.", d: false, n: "Değiştirilen bölüm damar yatağıdır. Hava yolunun geometrisi korunmuştur. [[K4 s. 72]]" },
    { t: "Modelin dakika ventilasyonu değişmeden gaz alışverişine katılan ventilasyon azalabilir.", d: true, n: "Dakikada verilen gazın daha büyük bölümü perfüzyonsuz alana gider. [[K4 s. 72]]" },
    { t: "Anatomik ölü boşluğu ölçmek bu değişimin büyüklüğünü tek başına gösterir.", d: false, n: "Aranan değişim alveoler bileşendedir. [[K4 s. 72]]" },
    { t: "Perfüzyonsuz bölme fizyolojik ölü boşluk hesabından çıkarılmalıdır.", d: false, n: "Hesap hem iletici yolları hem de perfüzyona katılmayan alveolleri içerir. [[K4 s. 72]]" },
  ],
};

VERI.sorular['htp-05-2'] = {
  no: 2, kagit: "Paper A · Fizyoloji",
  kok: "Aynı kandan alınan iki örnekte PO₂, oksijen ayrışma eğrisinin eğimli bölümünde aynı değerde tutuluyor. Yalnızca ikinci örnek ısıtılıyor. Başlangıçta pH ve 2,3-DPG düzeyleri eşit ve deney boyunca sabit.", kaynak: '[[K4 s. 75]]',
  onermeler: [
    { t: "İkinci örnekte hemoglobin oksijeni daha sıkı tutar.", d: false, n: "Isınma hemoglobinin oksijene ilgisini azaltır. [[K4 s. 75]]" },
    { t: "İkinci örneğin satürasyonu ilk örneğinkinden düşük olur.", d: true, n: "Sağa kayan eğride aynı PO₂ daha düşük doygunluğa karşılık gelir. [[K4 s. 75]]" },
    { t: "İki örneği aynı satürasyona getirmek için sıcak örneğin PO₂ değeri düşürülmelidir.", d: false, n: "Sıcak örnekte aynı doluluğa ulaşmak için daha yüksek oksijen basıncı gerekir. [[K4 s. 75]]" },
    { t: "Isıtılan örnekte pH da düşürülseydi bu iki etki aynı yönde olurdu.", d: true, n: "Hem ısınma hem asitleşme oksijenin ayrılmasını kolaylaştırır. [[K4 s. 75]]" },
    { t: "Sıcak örneği başlangıç sıcaklığına soğutmak, diğer koşullar korunursa sıcaklığa bağlı kaymayı geri alır.", d: true, n: "Sıcaklık farkı ortadan kalkınca bu iki eğri arasındaki fark da kalkar. [[K4 s. 75]]" },
  ],
};

VERI.sorular['htp-05-3'] = {
  no: 3, kagit: "Paper A · Fizyoloji",
  kok: "Sağlam mitral ve aort kapakları olan bir kalbin kaydında aorttan ileri akım henüz bitmiş. Kısa bir süre ventrikül basıncı düşüyor, hacim eğrisi ise yatay seyrediyor.", kaynak: '[[K4 s. 82]] [[K4 s. 84]]',
  onermeler: [
    { t: "İleri akımın sonu ile mitral akımın başlaması arasında bir aralık vardır.", d: true, n: "Aort kapağının kapanmasını izleyen gevşeme evresi, mitral kapak açılıncaya kadar sürer. [[K4 s. 82]]" },
    { t: "Bu aralıkta hacmin sabit kalması sürmekte olan bir gevşemeyle uyumludur.", d: true, n: "Kas gevşerken kapalı kapaklar ventriküle net kan girişini ve çıkışını önler. [[K4 s. 82]]" },
    { t: "Yatay bölüm atriyumun ventriküle aktif kan aktardığı evreyi işaretler.", d: false, n: "Atriyumun kasılması doluşun sonunda, mitral kapak açıkken katkı verir. [[K4 s. 82]]" },
    { t: "İzleyen erken doluş için ventrikül basıncının atriyum basıncını aşması gerekir.", d: false, n: "Kan atriyumdan ventriküle, basıncın yüksek olduğu taraftan düşük olduğu tarafa geçer. [[K4 s. 82]]" },
    { t: "Ventrikül sertleşirse aynı hastada atriyal fibrilasyonun başlaması doluşu daha fazla bozabilir.", d: true, n: "Düşük kompliyansta geç diyastolde atriyumun sağladığı katkı önem kazanır. [[K4 s. 82]]" },
  ],
};

VERI.sorular['htp-05-4'] = {
  no: 4, kagit: "Paper A · Fizyoloji",
  kok: "Bir dolaşım modelinde iki damar yatağından aynı debi geçiyor. X yatağının giriş ve çıkış basınçları arasındaki fark Y yatağındakinin iki katı.", kaynak: '[[K4 s. 86]] [[K4 s. 163]]',
  onermeler: [
    { t: "X yatağının direnci Y yatağınınkinin iki katıdır.", d: true, n: "Direnç basınç farkının debiye bölümüdür. Payda iki yatak için aynıdır. [[K4 s. 163]]" },
    { t: "Akım eşit olduğuna göre iki yatağın direnci eşittir.", d: false, n: "Eşit debi için daha büyük basınç farkı gerektiren yol daha dirençlidir. [[K4 s. 163]]" },
    { t: "Çıkış basınçları bilinmeden yalnızca giriş basınçlarını karşılaştırmak aynı hesabı verir.", d: false, n: "Akımı belirleyen iki uç arasındaki farktır. [[K4 s. 163]]" },
    { t: "Y yatağının direnci sabitken basınç farkı iki katına çıkarsa debisi de iki katına çıkar.", d: true, n: "Aynı dirençte akım, uygulanan basınç farkıyla orantılıdır. [[K4 s. 163]]" },
    { t: "Normal pulmoner dolaşım, sistemik dolaşıma göre modeldeki yüksek dirençli yatağa karşılık gelir.", d: false, n: "Akciğer dolaşımı kalp debisini daha küçük bir basınç farkıyla taşır. [[K4 s. 86]]" },
  ],
};

VERI.sorular['htp-05-5'] = {
  no: 5, kagit: "Paper A · Fizyoloji",
  kok: "Hızlı soluyan bir gönüllüde pH yükselirken ellerde kasılma başlıyor. Laboratuvar önce yalnızca toplam plazma kalsiyumunu bildiriyor.", kaynak: '[[K4 s. 96]] [[K4 s. 395–396]]',
  onermeler: [
    { t: "Toplam kalsiyumun düşmemesi kalsiyumla ilişkili spazmı dışlar.", d: false, n: "Toplam değer, bağlı ve serbest fraksiyonları ayrı ayrı göstermez. [[K4 s. 395]]" },
    { t: "İyonize kalsiyum ölçümü belirtilerle daha doğrudan ilişkilidir.", d: true, n: "Uyarılabilir dokular açısından etkin olan havuz serbest kalsiyumdur. [[K4 s. 395–396]]" },
    { t: "pH yükseldiğinde proteinler üzerinde kalsiyum bağlayabilecek negatif yükler artar.", d: true, n: "Proteinlerden proton ayrılması bağlanma için daha fazla yer açar. [[K4 s. 96]]" },
    { t: "Bu mekanizmanın çalışması için önce vücut kalsiyum depolarının azalması gerekir.", d: false, n: "Serbest ve bağlı havuzlar arasında yer değiştirme tek başına yeterlidir. [[K4 s. 96]]" },
    { t: "İyonize kalsiyumun azalması sinir ve kasın uyarılmasını güçleştirerek spazm yapar.", d: false, n: "Serbest kalsiyum düştüğünde uyarılabilirlik artar ve tetani gelişebilir. [[K4 s. 96]]" },
  ],
};

VERI.sorular['htp-06-1'] = {
  no: 1, kagit: "Paper A · Farmakoloji",
  kok: "Kararlı durumda çalışan bir infüzyon pompasının şırıngası değiştiriliyor. Yeni çözeltide aynı ilaç iki kat derişik. Amaç birim zamanda verilen ilaç miktarını korumak.", kaynak: '[[K4 s. 128]]',
  onermeler: [
    { t: "Pompanın hacim hızını korumak yeterlidir.", d: false, n: "Her mililitre artık iki kat ilaç taşıdığından kütle hızı artar. [[K4 s. 128]]" },
    { t: "Hacim hızını yarıya indirmek önceki kütle hızını sağlar.", d: true, n: "Derişimin iki katı ile hacim hızının yarısının çarpımı değişmez. [[K4 s. 128]]" },
    { t: "Pompanın mL/saat göstergesi tek başına verilen kütleyi bildirir.", d: false, n: "Kütle hesabında çözeltinin derişimi ve uygulama süresi de gerekir. [[K4 s. 128]]" },
    { t: "Değişimden hemen önce eliminasyon hızı ilacın giriş hızına eşittir.", d: true, n: "Kararlı durumda vücuttaki toplam miktar zamanla artmaz. [[K4 s. 128]]" },
    { t: "Aynı sürede aynı kütleyi vermek için yeni şırıngadan eskiyle eşit hacim harcanmalıdır.", d: false, n: "Derişim ikiye katlandığında aynı kütle yarı hacimde bulunur. [[K4 s. 128]]" },
  ],
};

VERI.sorular['htp-06-2'] = {
  no: 2, kagit: "Paper A · Farmakoloji",
  kok: "Bir deneyde özdeş iki sinir lifine aynı lokal anestezik uygulanıyor. İlaç derişimi ve ortam pH’sı sabitken bir lif sık, diğeri seyrek uyarılıyor.", kaynak: '[[K4 s. 129]] [[K4 s. 403]]',
  onermeler: [
    { t: "Sık uyarılan lifte bloğun daha hızlı gelişmesi beklenir.", d: true, n: "Tekrarlanan kanal açılmaları ilacın bağlanma bölgesine erişimini kolaylaştırır. [[K4 s. 129]]" },
    { t: "Bu farkı açıklamak için uyarı sıklığının ilacın pKa değerini değiştirdiğini varsaymak gerekir.", d: false, n: "Kullanıma bağımlı blok, ilacın asit ayrışma sabiti aynı kalırken de oluşur. [[K4 s. 129]]" },
    { t: "İlaç hücrenin içine ulaştıktan sonra yüklü biçimi kanalın iç yüzünden etki edebilir.", d: true, n: "Zardan geçiş ve kanal içindeki bağlanma farklı basamaklardır. [[K4 s. 129]]" },
    { t: "Deney asidik ortamda tekrarlanırsa her iki lifte zarı geçebilecek ilaç fraksiyonu azalır.", d: true, n: "Zayıf bazın protonlanması yüksüz fraksiyonu küçültür. [[K4 s. 403]]" },
    { t: "Lifleri aynı sıklıkta uyarmak, ortam pH’sının ilacın dağılımı üzerindeki etkisini ortadan kaldırır.", d: false, n: "İyonizasyon dengesini pH ile pKa belirler. [[K4 s. 403]]" },
  ],
};

VERI.sorular['htp-06-3'] = {
  no: 3, kagit: "Paper A · Farmakoloji",
  kok: "Klopidogrel alan bir kişide omeprazol başlandıktan sonra aktif ilaç metaboliti azalıyor. Ekip, laboratuvar bulgusunu trombosit üzerindeki hedeflerle ilişkilendiriyor.", kaynak: '[[K4 s. 131]]',
  onermeler: [
    { t: "Bulguyu açıklayan ilk basamak omeprazolün trombosit P2Y₁₂ reseptörünü işgal etmesidir.", d: false, n: "Omeprazol klopidogrelin etkinleşmesine katılan CYP2C19 enzimini baskılar. [[K4 s. 131]]" },
    { t: "Aynı miktarda klopidogrel verilmesi etkin metabolit miktarının aynı kalacağını garanti etmez.", d: true, n: "Ön ilacın dönüşümü yavaşlarsa etkin ürüne maruziyet azalabilir. [[K4 s. 131]]" },
    { t: "Bu etkileşim, etkin molekül oluşmadan önceki bir basamağı etkiler.", d: true, n: "Etkileşimin yeri trombosit reseptöründen önceki metabolik dönüşümdür. [[K4 s. 131]]" },
    { t: "Aspirinin trombosit üzerindeki hedefini göstermek için P2Y₁₂ reseptörü işaretlenmelidir.", d: false, n: "Aspirin trombosit siklooksijenazını kalıcı biçimde etkisizleştirir. [[K4 s. 131]]" },
    { t: "Hedefe göre sınıflandırıldığında tikagrelor ile prasugrel aynı başlığa girer.", d: true, n: "Her ikisi de ADP aracılı P2Y₁₂ sinyalini engeller. [[K4 s. 131]]" },
  ],
};

VERI.sorular['htp-06-4'] = {
  no: 4, kagit: "Paper A · Farmakoloji",
  kok: "Tiyazid başlanan bir hastanın izleminde plazma potasyumu düşerken ürik asit yükseliyor. Bu iki değişiklik için bir nefron şeması hazırlanıyor.", kaynak: '[[K4 s. 134]]',
  onermeler: [
    { t: "Sodyum ve klorür geri emilimindeki ilk değişiklik distal kıvrımlı tübülün erken kesimine işaretlenmelidir.", d: true, n: "Tiyazidin doğrudan etkilediği taşıma bu kesimdedir. [[K4 s. 134]]" },
    { t: "Daha distale ulaşan sodyumun geri alınması potasyum kaybını açıklamaya yardım eder.", d: true, n: "Distal sodyum taşınmasına artmış potasyum sekresyonu eşlik edebilir. [[K4 s. 134]]" },
    { t: "Üratın tübül lümenine daha kolay salgılanması plazmadaki yükselmeyi açıklar.", d: false, n: "Tiyazidle sekresyon için yarışan üratın renal uzaklaştırılması azalır. [[K4 s. 134]]" },
    { t: "Bu hastada ürik asit yükselmesi gut eğilimini azaltır.", d: false, n: "Ürat birikimi gut atağına zemin hazırlar. [[K4 s. 134]]" },
    { t: "Glukozun yükselmesi de aynı ilacın metabolik etkileriyle uyumlu olabilir.", d: true, n: "Tiyazidler insülin salınımını azaltabilir. [[K4 s. 134]]" },
  ],
};

VERI.sorular['htp-06-5'] = {
  no: 5, kagit: "Paper A · Farmakoloji",
  kok: "Bir kalp preparatında dobutamin verildikten sonra kasılma kuvveti artıyor. Deney raporunda kalpteki gözlem ile bütün organizmada beklenen damar yanıtı ayrı değerlendiriliyor.", kaynak: '[[K4 s. 119]]',
  onermeler: [
    { t: "Kalpteki gözlem doğrudan adrenerjik reseptör uyarısıyla açıklanabilir.", d: true, n: "Dobutaminin pozitif inotrop etkisinde β₁ uyarısı baskındır. [[K4 s. 119]]" },
    { t: "Daha kuvvetli kasılma miyokardın oksijen gereksiniminin azalmasını öngörür.", d: false, n: "Artan kontraktilite kalbin oksijen tüketimini yükseltir. [[K4 s. 119]]" },
    { t: "İzole kalpte kuvvet artışı, sistemik damar direncinin arttığını da gösterir.", d: false, n: "Bu düzenek sistemik damar yatağını ölçmez. Dobutaminin β₂ etkisi damar direncini azaltabilir. [[K4 s. 119]]" },
    { t: "Damar düz kasındaki β₂ yanıtı kalpteki inotropiyle aynı anda görülebilir.", d: true, n: "Aynı molekülün farklı dokulardaki reseptörleri uyarması bu birlikteliği açıklar. [[K4 s. 119]]" },
    { t: "İlacın etkisinin sonlanmasını yalnızca değişmeden idrara geçişe bağlamak yeterlidir.", d: false, n: "Dobutamin bir katekolamindir ve COMT ile hızla metabolize edilir. [[K4 s. 119]]" },
  ],
};

VERI.sorular['htp-07-1'] = {
  no: 1, kagit: "Paper A · Anatomi",
  kok: "Bir orbita modelinde göz küresi arkaya doğru uzatılıyor. Orbita kenarı ve optik kanal yerinde kalıyor. Ekip, aynı modelde göz kapağının duyusunu ve hareketini de işaretliyor.", kaynak: '[[K4 s. 142]]',
  onermeler: [
    { t: "Aynı dış kemik ölçüleri göz küresinin aynı aks uzunluğunda olduğunu göstermez.", d: true, n: "Miyopide küre uzayabilir. Kemik sınır ile kürenin arka yüzü ayrı referanslardır. [[K4 s. 142]]" },
    { t: "Daha kısa bir iğne seçmek, uzamış göz küresinde perforasyon olasılığını sıfıra indirir.", d: false, n: "Kısaltma riski azaltabilir. Kürenin biçimi ve yerleşimi hâlâ önemlidir. [[K4 s. 142]]" },
    { t: "Optik sinirin kılıfı, orbita içindeki bir enjeksiyonun merkezi etkileri için anatomik bir yol sunar.", d: true, n: "Optik sinirin çevresindeki meninksler kafa içindeki örtülerle süreklidir. [[K4 s. 142]]" },
    { t: "Üst kapak duyusunu taşıyan supraorbital sinir, kapağın aktif kapanmasını da sağlar.", d: false, n: "Kapanmayı sağlayan kasın motor siniri fasiyaldir. [[K4 s. 142]]" },
    { t: "Modelde optik kanala doğru ilerleyen kişi piramidin tabanına yaklaşır.", d: false, n: "Orbitanın geniş tabanı önde, tepe noktası arkadadır. [[K4 s. 142]]" },
  ],
};

VERI.sorular['htp-07-2'] = {
  no: 2, kagit: "Paper A · Anatomi",
  kok: "Bir koroner anjiyogramda posterior interventriküler dalın sirkumfleks arterden çıktığı görülüyor. Asistan, arter haritası üzerine venöz dönüşü de çiziyor.", kaynak: '[[K4 s. 147]]',
  onermeler: [
    { t: "Bu bulgu sağ koroner dominansı gösterir.", d: false, n: "Posterior interventriküler dal sol koroner sistemden çıktığı için bu kalp sol dominanttır. [[K4 s. 147]]" },
    { t: "Dominansı belirlerken damar çaplarını ölçmek zorunlu değildir.", d: true, n: "Belirleyici olan ilgili dalın kökenidir. [[K4 s. 147]]" },
    { t: "Arterler arasındaki bağlantıları görmek akut tıkanmanın iskemi yapmayacağını kanıtlar.", d: false, n: "Kollateraller kronik darlıkta gelişebilir. Ani tıkanmada koruma yetersiz kalabilir. [[K4 s. 147]]" },
    { t: "Koroner sinüs haritada venöz tarafa yerleştirilmelidir.", d: true, n: "Miyokarttan dönen venöz kanın büyük bölümü burada toplanır. [[K4 s. 147]]" },
    { t: "Haritada bazı küçük kalp venlerinden doğrudan kalp boşluklarına ok çizilebilir.", d: true, n: "Thebesius venleri koroner sinüse uğramadan boşalabilir. [[K4 s. 147]]" },
  ],
};

VERI.sorular['htp-07-3'] = {
  no: 3, kagit: "Paper A · Anatomi",
  kok: "Karaciğer naklinden sonra portal akım sürüyor, hepatik arter akımı kayboluyor. Ultrason bulguları ile safra yollarında sonradan gelişen hasar birlikte değerlendiriliyor.", kaynak: '[[K4 s. 148]]',
  onermeler: [
    { t: "Portal vende akım görülmesi safra yollarının arteriyel beslenmesini doğrulamaz.", d: true, n: "Safra yolları kanını hepatik arter dallarından alır. [[K4 s. 148]]" },
    { t: "Portal venin taşıdığı kan karaciğerin oksijen gereksinimine katkıda bulunur.", d: true, n: "Parankimin oksijen kaynağını portal akım ile hepatik arter birlikte oluşturur. [[K4 s. 148]]" },
    { t: "Bir portosistemik şantın hepatik ven ucu karaciğere arteriyel kan getirir.", d: false, n: "Hepatik ven sistemik venöz dönüşe açılan çıkış yoludur. [[K4 s. 148]]" },
    { t: "Portal basınç yükselirse alt özofagustaki venöz genişleme bu dolaşımla ilişkisizdir.", d: false, n: "Buradaki portosistemik bağlantılar yüksek portal basınçta genişleyebilir. [[K4 s. 148]]" },
    { t: "Göbek çevresi ile alt özofagustaki genişlemiş venlerin ortak bir hemodinamik açıklaması olabilir.", d: true, n: "Her iki bölgede de portal ve sistemik venler arasında geçiş yolları bulunur. [[K4 s. 148]]" },
  ],
};

VERI.sorular['htp-07-4'] = {
  no: 4, kagit: "Paper A · Anatomi",
  kok: "Orbita çevresindeki enfeksiyonun ardından göz hareketleri bozulan bir hastada kavernöz sinüs inceleniyor. Radyolog aynı kesitte bir arter lümenini de gösteriyor.", kaynak: '[[K4 s. 149]]',
  onermeler: [
    { t: "Arter lümeni izlenmesi kavernöz sinüsün yanlış tanımlandığını kanıtlar.", d: false, n: "İnternal karotis arter bu venöz yapının içinden seyreder. [[K4 s. 149]]" },
    { t: "Orbital venler enfeksiyonun bu bölgeye ulaşabileceği bir yol oluşturur.", d: true, n: "Oftalmik venlerin bağlantıları kanın ve enfeksiyonun kavernöz sinüse ulaşmasına olanak verir. [[K4 s. 149]]" },
    { t: "Göz hareketlerindeki bozukluğa alın bölgesinde duyu kaybı eşlik edebilir.", d: true, n: "Kavernöz sinüs komşuluğunda hem göz hareketleriyle ilgili sinirler hem de trigeminal dallar etkilenebilir. [[K4 s. 149]]" },
    { t: "Kavernöz sinüs içindeki arter baziler arter olarak etiketlenmelidir.", d: false, n: "Bu komşuluk internal karotise aittir. Baziler arter arka dolaşımın bir parçasıdır. [[K4 s. 149]]" },
    { t: "Dural sinüslerden gelen kanın kafatasından temel çıkış yolu internal karotis arterdir.", d: false, n: "Venöz kan juguler yoldan döner. Karotis ise arteriyel giriş sağlar. [[K4 s. 149]]" },
  ],
};

VERI.sorular['htp-07-5'] = {
  no: 5, kagit: "Paper A · Anatomi",
  kok: "Kasıkta inguinal ligamanın hemen altından enine bir ultrason kesiti alınıyor. Prob daha sonra femoral üçgenin tepesine doğru kaydırılıyor. Görüntüdeki yönler hastaya göre tanımlanıyor.", kaynak: '[[K4 s. 150–151]]',
  onermeler: [
    { t: "İlk kesitte femoral arterin hemen medialindeki büyük damar femoral venle uyumludur.", d: true, n: "Ven üçgenin üst kısmında arterin iç yanında bulunur. [[K4 s. 150]]" },
    { t: "Üst kesitte arterin lateralinde görülen femoral sinir damarlarla aynı femoral kılıf içindedir.", d: false, n: "Kılıfın içinde proksimal damarlar bulunur. Femoral sinir dışarıda seyreder. [[K4 s. 150]]" },
    { t: "Üçgenin tepesinde venin artere göre konumu ilk kesittekiyle aynı kalmalıdır.", d: false, n: "Tepeye doğru ven arterin arkasına geçer. [[K4 s. 150]]" },
    { t: "İlk kesitteki femoral sinir ile ayağın medial kenarının duyusu arasında anatomik bağlantı vardır.", d: true, n: "Safen sinir femoral sinirin duyu dalıdır ve medial ayağa ulaşır. [[K4 s. 151]]" },
    { t: "Fibula boynundaki sinir basısı bu kesitteki femoral sinirin gövdesine doğrudan bası anlamına gelir.", d: false, n: "Fibula boynunu dolanan sinir ortak peroneal sinirdir. [[K4 s. 151]]" },
  ],
};

VERI.sorular['htp-08-1'] = {
  no: 1, kagit: "Paper A · Fizik",
  kok: "Bir pompa deneyinde aynı sıvı iki düz ve sert tüpten geçiriliyor. Akım laminer. İkinci tüp birincinin iki katı uzunlukta ve iç yarıçapı da iki katı. Uçlar arasındaki basınç farkları aynı.", kaynak: '[[K4 s. 163–164]]',
  onermeler: [
    { t: "İkinci tüpte ilkine göre sekiz kat debi beklenir.", d: true, n: "Yarıçap değişimi debiyi 16 ile çarpar. Uzunluk değişimi bu kazancı ikiye böler. [[K4 s. 163–164]]" },
    { t: "İki geometrik değişiklik birbirini tam olarak dengeler.", d: false, n: "Uzunluk denkleme birinci kuvvetten, yarıçap dördüncü kuvvetten girer. [[K4 s. 163–164]]" },
    { t: "İkinci tüpün direnci ilkinin sekiz katına çıkar.", d: false, n: "Eşit basınç farkında debinin sekiz katına çıkması direncin sekizde bire inmesi demektir. [[K4 s. 163–164]]" },
    { t: "İkinci tüpte ilk tüpün debisini elde etmek için daha küçük bir basınç farkı yeterlidir.", d: true, n: "Aynı debi için gereken basınç farkı dirençle orantılıdır. [[K4 s. 163–164]]" },
    { t: "İki tüpte de viskozite aynı oranda artırılırsa debilerin birbirine oranı korunur.", d: true, n: "Viskozite her iki debiyi aynı katsayıyla azaltır. [[K4 s. 163–164]]" },
  ],
};

VERI.sorular['htp-08-2'] = {
  no: 2, kagit: "Paper A · Fizik",
  kok: "Isı kaybını inceleyen bir laboratuvarda sıcak bir metal model kullanılıyor. Model önce soğuk bir yüzeye konuyor, sonra askıya alınıyor. Yüzeyin sıcaklığı aynı tutuluyor.", kaynak: '[[K4 s. 165]]',
  onermeler: [
    { t: "Model askıdayken çevresindeki soğuk yüzeye enerji aktaramaz.", d: false, n: "Arada temas olmasa da ışınımla enerji aktarımı sürer. [[K4 s. 165]]" },
    { t: "Model askıya alındığında modelden soğuk desteğe temas yoluyla ısı aktarımı kesilir.", d: true, n: "İletim için iki yüzeyin fiziksel teması gerekir. [[K4 s. 165]]" },
    { t: "Modelin üzerinden daha hızlı serin hava geçirmek taşınımla ısı kaybını artırabilir.", d: true, n: "Hareket eden hava modelden aldığı enerjiyi uzaklaştırır. [[K4 s. 165]]" },
    { t: "Modelin üzerindeki suyun buharlaşması modele ısı kazandırır.", d: false, n: "Faz değişimi için gereken enerji sıcak yüzeyden alınır. [[K4 s. 165]]" },
    { t: "Işınımı incelerken çevredeki yüzeylerin sıcaklığını sabit tutmak anlamlıdır.", d: true, n: "Net ışınımla enerji alışverişi karşılıklı yüzeylerin sıcaklıklarına bağlıdır. [[K4 s. 165]]" },
  ],
};

VERI.sorular['htp-08-3'] = {
  no: 3, kagit: "Paper A · Fizik",
  kok: "Kapalı bir deney kabında hava başlangıçta su buharına doymamış. Kabın hacmi sabit. Soğutma sırasında ilk su damlası görülene kadar dışarıdan su eklenmiyor.", kaynak: '[[K4 s. 167]]',
  onermeler: [
    { t: "İlk yoğuşmaya kadar kaptaki buhar kütlesi aynı kalır.", d: true, n: "Kapalı kapta faz değişimi başlamadan su buharı ne eklenir ne uzaklaşır. [[K4 s. 167]]" },
    { t: "Bağıl nemi bulmak için sadece kaptaki su buharı kütlesini bilmek yeterlidir.", d: false, n: "Aynı hacmin o sıcaklıktaki doygunluk kapasitesi de gerekir. [[K4 s. 167]]" },
    { t: "İlk damlanın belirdiği sıcaklık çiy noktasını belirlemekte kullanılabilir.", d: true, n: "Soğutulan yüzeyde yoğuşmanın başlangıcı çiy noktası yönteminin temelidir. [[K4 s. 167]]" },
    { t: "İlk damla oluştuğunda yanındaki hava başlangıçtakinden daha düşük bağıl nemdedir.", d: false, n: "Yoğuşmanın başladığı yüzeyde hava doygunluğa ulaşmıştır. [[K4 s. 167]]" },
    { t: "Bağıl nemin yükselmesi deney kabına dışarıdan su girdiğini kanıtlar.", d: false, n: "Sıcaklığın düşmesi tek başına doygunluğa yaklaşılmasını sağlar. [[K4 s. 167]]" },
  ],
};

VERI.sorular['htp-08-4'] = {
  no: 4, kagit: "Paper A · Fizik",
  kok: "Bir teknisyen, konik tüp içinde bobin biçimli şamandıra bulunan bir akımölçeri inceliyor. Tüpün üzerindeki gaz adı silinmiş, skala okunabiliyor.", kaynak: '[[K4 s. 168]]',
  onermeler: [
    { t: "Skalanın okunabilmesi cihazın oksijen için doğru değer vereceğini kanıtlar.", d: false, n: "Kalibrasyon belirli bir gazın akış özelliklerine göre yapılır. [[K4 s. 168]]" },
    { t: "Şamandıra yükseldikçe gazın çevresinden geçebileceği kesit büyür.", d: true, n: "Tüp yukarıya doğru genişler. [[K4 s. 168]]" },
    { t: "Skala yukarı doğru artıyorsa bobinin alt hizasını kaydetmek okumayı yüksek gösterir.", d: false, n: "Referans bobinin tepesidir. Alt hizayı seçmek daha küçük bir değer kaydettirir. [[K4 s. 168]]" },
    { t: "Kalibrasyon incelenirken düşük ve yüksek debilerde aynı akım rejimi varsayılmamalıdır.", d: true, n: "Düşük debide laminer davranış baskınken yüksek debide türbülans önem kazanır. [[K4 s. 168]]" },
    { t: "Bobin cama tutunmuşsa aynı çizgide kalması, debinin sabit kaldığına güvenilir kanıttır.", d: false, n: "Gösterge ancak bobin serbestçe hareket ederse akımı izler. Tüpte iletken kaplama statik yüklenmeyi sınırlar. [[K4 s. 168]]" },
  ],
};

VERI.sorular['htp-08-5'] = {
  no: 5, kagit: "Paper A · Fizik",
  kok: "Bir eğitim düzeneğinde önce bipolar pens, sonra monopolar aktif elektrot ile geniş dönüş plağı kullanılıyor. Ekip her düzende akımın hangi temaslardan geçtiğini çiziyor.", kaynak: '[[K4 s. 174]] [[K4 s. 177]]',
  onermeler: [
    { t: "Bipolar düzende hedef doku iki pens ucu arasındaki devreyi tamamlar.", d: true, n: "Uçlar hem gidiş hem dönüş temasını sağlar. [[K4 s. 174]]" },
    { t: "Monopolar çizimde aktif uçtan dönüş plağına uzanan bir hasta yolu gösterilmelidir.", d: true, n: "Akım giriş yerinden uzaktaki dönüş elektroduna vücut üzerinden ulaşır. [[K4 s. 174]]" },
    { t: "Monopolar plağın kısmen ayrılması, cihaz çalışmaya devam ediyorsa ısıl risk oluşturmaz.", d: false, n: "Temasın daralması akımı daha küçük alanda yoğunlaştırarak yanığa yol açabilir. [[K4 s. 174]] [[K4 s. 177]]" },
    { t: "Bipolar pens için uzak dönüş plağı zorunludur.", d: false, n: "Dönüş yolu pensin diğer ucundadır. [[K4 s. 174]]" },
    { t: "Monopolar devrede plağın cilde temasını değerlendirmek, aktif uçtan uzakta gelişen yanığı araştırmanın bir parçasıdır.", d: true, n: "Dönüş temasının yetersizliği plak bölgesinde doku hasarını açıklayabilir. [[K4 s. 174]]" },
  ],
};

VERI.sorular['htp-09-1'] = {
  no: 1, kagit: "Paper A · İstatistik",
  kok: "Bir derlenme ünitesinin veri formunda kullanılan maske modeli, titremenin şiddeti (yok, hafif, ağır), titreme ataklarının sayısı ve vücut sıcaklığı ayrı sütunlara kaydediliyor.", kaynak: '[[K4 s. 189]]',
  onermeler: [
    { t: "Maske modeli için verilen sayısal kodlar kategorilere kendiliğinden bir sıra kazandırmaz.", d: true, n: "Kodlar yalnızca modelleri birbirinden ayıran etiketlerdir. [[K4 s. 189]]" },
    { t: "Şiddeti yoktan ağıra sıralamak hafif ile ağır arasındaki farkı sayısal olarak tanımlar.", d: false, n: "Sıralı kategoriler büyüklük sırasını gösterir. Aralarındaki mesafe tanımlanmamıştır. [[K4 s. 189]]" },
    { t: "Atak sayısı kesikli bir değişkendir.", d: true, n: "Tamamlanmış olaylar tam sayı olarak sayılır. [[K4 s. 189]]" },
    { t: "Termometrenin sıcaklığı yuvarlayarak yazması, altta yatan sıcaklık değişkeninin sürekli niteliğini değiştirmez.", d: true, n: "Ölçüm aracının çözünürlüğü kayda geçen basamakları sınırlar. [[K4 s. 189]]" },
    { t: "Hafif ve ağır titreme kodlarının aritmetik ortalaması mutlaka tanımlı bir klinik sınıftır.", d: false, n: "Sıralı kodlara verilen sayılar eşit aralıklı bir ölçüm oluşturmaz. [[K4 s. 189]]" },
  ],
};

VERI.sorular['htp-09-2'] = {
  no: 2, kagit: "Paper A · İstatistik",
  kok: "İki bağımsız örneklemi gösteren grafikte hata çubuklarının ortalamanın standart hatası olduğu belirtilmiş. İkinci örneklem dört kat büyük. İki grupta örneklem standart sapmaları eşit.", kaynak: '[[K4 s. 186–187]] [[K4 s. 189]]',
  onermeler: [
    { t: "İkinci grubun hata çubuğu ilk grubunkiyle aynı uzunlukta olmalıdır.", d: false, n: "Standart hata, standart sapmanın örneklem sayısının kareköküne bölünmesiyle bulunur. [[K4 s. 187]]" },
    { t: "İkinci grubun standart hatası ilkinin yarısıdır.", d: true, n: "Örneklem sayısını dörtle çarpmak formülün paydasını iki katına çıkarır. [[K4 s. 187]]" },
    { t: "Daha kısa çubuk ikinci gruptaki bireylerin birbirine daha çok benzediğini gösterir.", d: false, n: "Bireysel yayılımı gösteren standart sapmalar bu örnekte eşittir. [[K4 s. 187]]" },
    { t: "İki grupta standart hata yerine standart sapma çizilseydi çubuk uzunlukları eşit olurdu.", d: true, n: "Grupların bireysel ölçümleri aynı standart sapmaya sahiptir. [[K4 s. 187]]" },
    { t: "Bu hata çubukları ortalama çevresindeki bireysel gözlemlerin yüzde 95’ini kapsamak üzere tasarlanmıştır.", d: false, n: "Standart hata ortalama tahmininin değişkenliğini ölçer. [[K4 s. 186–187]]" },
  ],
};

VERI.sorular['htp-09-3'] = {
  no: 3, kagit: "Paper A · İstatistik",
  kok: "İki etkin yöntemin karşılaştırıldığı bir çalışmada katılımcılar hangi yöntemi aldığını bilmiyor. Semptom puanını görüşmeyle belirleyen kişi ise atamayı görüyor.", kaynak: '[[K4 s. 188]] [[K4 s. 191]]',
  onermeler: [
    { t: "Puanlayıcının atamayı bilmesi sonucun ölçümünde yanlılık kaynağı olabilir.", d: true, n: "Değerlendiricinin beklentisi görüşmeyi ya da puanlamayı etkileyebilir. [[K4 s. 188]]" },
    { t: "Karşılaştırma grubunda etkin bir yöntem kullanılması körlemeyle bağdaşır.", d: true, n: "Standart tedavi kontrol kolunu oluşturabilir. Körleme atamanın kimden saklandığıyla ilgilidir. [[K4 s. 188]]" },
    { t: "Katılımcının kör olması puanlayıcının da kör olduğunu gösterir.", d: false, n: "İki kişinin atamaya erişimi ayrı ayrı değerlendirilir. [[K4 s. 188]]" },
    { t: "Hangi analizin birincil olacağına sonuçları gördükten sonra karar vermek önceden planlamayla eşdeğerdir.", d: false, n: "Sonuçlar görüldükten sonra seçilen analiz, önceden tanımlanmış sınama gibi yorumlanamaz. [[K4 s. 191]]" },
    { t: "Küçük bir çalışmada tamamlanan dengeli bloklarla atama yapmak grup büyüklüklerinin ayrışmasını sınırlayabilir.", d: true, n: "Blok içindeki dağılım plana bağlanır. Bağımsız yazı tura atışları böyle bir dengeyi güvenceye almaz. [[K4 s. 191]]" },
  ],
};

VERI.sorular['htp-09-4'] = {
  no: 4, kagit: "Paper A · İstatistik",
  kok: "Bir ekip aynı araştırma tasarımını bilgisayarda iki koşulda tekrarlıyor. İlk koşulda gerçek tedavi farkı yok. İkincisinde tasarımda öngörülen fark gerçekten var.", kaynak: '[[K4 s. 190]]',
  onermeler: [
    { t: "İlk koşulda bir fark saptandığını bildirmek Tip II hatadır.", d: false, n: "Doğru sıfır hipotezinin reddi Tip I hatadır. [[K4 s. 190]]" },
    { t: "İkinci koşulda farkı saptayan tekrarların oranı testin gücünü tahmin eder.", d: true, n: "Güç, belirtilen gerçek etki varken sıfır hipotezini reddetme olasılığıdır. [[K4 s. 190]]" },
    { t: "İkinci koşulda farkı kaçıran tekrarlar β tahminine katkı verir.", d: true, n: "Gerçek fark varken sıfır hipotezini reddedememek Tip II hatadır. [[K4 s. 190]]" },
    { t: "İlk koşulda sıfır hipotezini reddetmeyen tekrarların oranı testin gücüdür.", d: false, n: "Güç gerçek bir etki altında değerlendirilir. Burada sıfır hipotezi doğrudur. [[K4 s. 190]]" },
    { t: "İkinci koşulda β büyürse güç de büyür.", d: false, n: "Güç ile β toplamı birdir. [[K4 s. 190]]" },
  ],
};

VERI.sorular['htp-09-5'] = {
  no: 5, kagit: "Paper A · İstatistik",
  kok: "Bir basınç sensörünün kalibrasyon yazılımı bütün ölçümlere aynı pozitif sabiti ekliyor. Hiçbir gözlem silinmiyor ve yuvarlama yapılmıyor.", kaynak: '[[K4 s. 186–187]] [[K4 s. 189]]',
  onermeler: [
    { t: "Düzeltilmiş ortalama aynı sabit kadar artar.", d: true, n: "Her terime eşit miktar eklemek toplamı gözlem sayısı çarpı bu miktar kadar artırır. [[K4 s. 187]]" },
    { t: "Her bir gözlemin kendi grup ortalamasından farkı büyür.", d: false, n: "Ölçümle ortalama birlikte kaydığı için farkları korunur. [[K4 s. 189]]" },
    { t: "Varyansın birimi bu düzeltmeyle basınç birimine dönüşür.", d: false, n: "Varyans kareli sapmalardan hesaplanır. Ölçümlerin birimi değişmediği için karesinin birimi de değişmez. [[K4 s. 189]]" },
    { t: "Medyan da eklenen sabit kadar yükselir.", d: true, n: "Sıra değişmez ve merkezdeki değerler aynı miktarda kayar. [[K4 s. 189]]" },
    { t: "Başlangıçtaki dağılım simetrikse ötelemeden sonra da simetriktir.", d: true, n: "Merkezin iki yanındaki uzaklıklar korunur. [[K4 s. 186–187]]" },
  ],
};

SAYFALAR['rehber/sorular/05'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 5 · Paper A',
  baslik: 'Fizyoloji · deneme soruları',
  lede: 'Ölü boşluğu, oksijen taşınmasını ve kalp döngüsünü deney kayıtlarından yorumlayın. Damar direncini hesaplayıp pH değişimini kas uyarılabilirliğiyle ilişkilendirin. [[K4 s. 54–103]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-05-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-05-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-05-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-05-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-05-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/dersler/fizyoloji/11">Ventilasyon ve ölü boşluk</a> · <a href="#/dersler/fizyoloji/08">Oksijen taşınması</a> · <a href="#/dersler/fizyoloji/28">Kardiyak siklus</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/06">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/06'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 6 · Paper A',
  baslik: 'Farmakoloji · deneme soruları',
  lede: 'İnfüzyonda verilen ilaç miktarını hesaplayın. Sinir bloğu, trombosit inhibisyonu, diürez ve inotropi örneklerinde gözlemi ilacın etki yeriyle eşleştirin. [[K4 s. 104–137]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-06-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-06-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-06-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-06-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-06-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/dersler/farmakoloji/06b">Kompartıman modelleri</a> · <a href="#/dersler/farmakoloji/11a">Lokal anestezikler</a> · <a href="#/dersler/farmakoloji/22">Diüretikler</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/07">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/07'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 7 · Paper A',
  baslik: 'Anatomi · deneme soruları',
  lede: 'Orbitadan femoral üçgene uzanan beş olguda damar ve sinirlerin komşuluklarını izleyin. Görüntüdeki yerleşimden hareketle hangi işlevin etkilenebileceğine karar verin. [[K4 s. 138–151]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-07-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-07-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-07-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-07-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-07-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/sinav/part1">Part I sınav biçimi</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/08">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/08'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 8 · Paper A',
  baslik: 'Fizik · deneme soruları',
  lede: 'Akım, ısı ve nem deneylerindeki değişimleri öngörün. Ardından akımölçerin skalasını ve elektrocerrahi devresindeki temas noktalarını yorumlayın. [[K4 s. 152–181]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-08-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-08-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-08-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-08-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-08-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/sinav/part1">Part I sınav biçimi</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/09">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/09'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 9 · Paper A',
  baslik: 'İstatistik · deneme soruları',
  lede: 'Bir veri formunu, hata çubuklarını ve klinik çalışma tasarımını inceleyin. Ölçümlerin yayılımıyla ortalama tahmininin belirsizliğini ayırın. [[K4 s. 182–191]]',
  html: `
<section class="wrap blk">
<div class="viz" data-viz="mtf" data-q="htp-09-1"></div>
<div class="viz" data-viz="mtf" data-q="htp-09-2"></div>
<div class="viz" data-viz="mtf" data-q="htp-09-3"></div>
<div class="viz" data-viz="mtf" data-q="htp-09-4"></div>
<div class="viz" data-viz="mtf" data-q="htp-09-5"></div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part1">Part I çalışma planı</a> · <a href="#/sinav/part1">Part I sınav biçimi</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/10">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/16'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 16 · SOE',
  baslik: 'Uygulamalı fizyoloji · sözlü prova',
  lede: 'Kitle büyürken kafa içi basıncının seyrini çizin. İkinci provada akciğerin iki bölgesinden çıkan kanın neden farklı oksijenlendiğini açıklayın. [[K4 s. 381–397]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-16-1">
<h3>Aynı hacim artışı, farklı basınç yanıtı</h3>
<p><b>Açılış sorusu.</b> Kapalı kafatasında yavaş büyüyen bir kitle izleniyor. Ardışık iki incelemede kitle hacmi eşit miktarda artıyor. İlk aralıkta kafa içi basıncı pek değişmezken ikinci aralıkta hızla yükseliyor. Bunu bir eğri çizerek nasıl açıklarsınız?</p>
<h4>Ek sorular</h4>
<ol>
<li>Çizimde eksenlere ne yazarsınız?</li>
<li>Başlangıçta hangi içerikler yer değiştirerek kitleye yer açar?</li>
<li>Beyin düzeyindeki ortalama arter basıncı sabitse ikinci aralıkta perfüzyon basıncı nasıl değişir?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Yatay eksen eklenen hacmi, dikey eksen kafa içi basıncını gösterir. Başlangıçtaki yatık bölüm korunmuş hacim rezervine karşılık gelir. [[K4 s. 388–389]]</li>
<li>Sert kafatasında kitlenin kapladığı yer, başlangıçta BOS ve intrakraniyal kan hacminde azalmayla karşılanabilir. [[K4 s. 388]]</li>
<li>Rezerv tükendikçe eğri dikleşir. Aynı hacim artışı artık daha büyük bir basınç artışı yaratır. [[K4 s. 389]]</li>
<li>Beyin düzeyindeki ortalama arter basıncından kafa içi basıncı çıkarılır. Arter basıncı sabitken fark küçülür. [[K4 s. 389]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-16-2">
<h3>İki akciğer bölgesinde farklı gaz değişimi</h3>
<p><b>Açılış sorusu.</b> Bir deneyde ilk akciğer bölgesinin hava girişi tümüyle kapanıyor, kan akımı sürüyor. İkinci bölgede hem hava hem kan akımı korunurken alveol ile kapiller arasındaki doku kalınlaşıyor. İki bölgeden çıkan kanın oksijenlenmesini hangi mekanizmalar sınırlar?</p>
<h4>Ek sorular</h4>
<ol>
<li>İlk bölgeye giden kan arter kanına karışınca ne olur?</li>
<li>İlk bölgeye kan akımını azaltabilecek yerel yanıt nedir?</li>
<li>İkinci bölgede zar kalınlığı ve gazın çözünürlüğü dengeye ulaşma hızını nasıl etkiler?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>İlk bölgede ventilasyon sıfırken perfüzyon sürer. Bu kan havalanmış alveolle karşılaşmadan çıkar ve şant oluşturur. [[K4 s. 390–391]]</li>
<li>Oksijenlenmeden geçen kanın çıkışta diğer kanla karışması arteriyel PO₂’yi düşürür. [[K4 s. 391]]</li>
<li>Alveoler hipoksi küçük pulmoner arterleri daraltır. Akımın bir kısmı havalanan bölgelere yönelir. [[K4 s. 392]]</li>
<li>İkinci bölgede gazın aşacağı mesafe uzamıştır. Aynı basınç farkında çözünürlüğü daha yüksek olan CO₂, oksijene göre daha hızlı dengelenir. [[K4 s. 391]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/dersler/fizyoloji/49">İntrakraniyal basınç</a> · <a href="#/dersler/fizyoloji/14">Hipoksi ve şantlar</a> · <a href="#/dersler/fizyoloji/10">Alveoler difüzyon</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/17">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/17'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 17 · SOE',
  baslik: 'Uygulamalı farmakoloji · sözlü prova',
  lede: 'Bir uçucu ajanın etki hızını potensinden ayırın. Uzayan nöromüsküler blokta ilaç kaydının ve yıkım yolunun yorumunuzu nasıl değiştirdiğini anlatın. [[K4 s. 398–423]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-17-1">
<h3>Etiketi silinen iki ajan eğrisi</h3>
<p><b>Açılış sorusu.</b> Bir simülatörde iki uçucu ajan aynı inspiryum parsiyel basıncında veriliyor. Ventilasyon ve kalp debisi eşitken X’in alveoler basıncı hedefe daha çabuk yaklaşıyor. Bir asistan bu gözlemden X’in daha potent olduğunu çıkarıyor. Bu çıkarımı nasıl değerlendirirsiniz?</p>
<h4>Ek sorular</h4>
<ol>
<li>Kanda daha fazla çözünen ajan alveolden nasıl alınır?</li>
<li>Potensi karşılaştıracak ikinci deneyde hangi sonlanımı seçersiniz?</li>
<li>Opioid alan hastaları yalnızca X grubuna koymak bu karşılaştırmayı nasıl etkiler?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Kinetik deney, hedef parsiyel basınca ulaşma hızını gösterir. Hız tek başına potensin ölçüsü değildir. [[K4 s. 411–412]]</li>
<li>Daha fazla çözünen ajan aynı parsiyel basınçta kanda daha çok birikir. Kanın ajanı alması alveoler basıncın yükselişini yavaşlatır. [[K4 s. 411]]</li>
<li>Aynı koşullarda standart cerrahi uyarı verilir. Hastaların yarısının hareketsiz kaldığı alveoler konsantrasyon her ajan için belirlenir. Daha düşük MAK daha yüksek potense karşılık gelir. [[K4 s. 412]]</li>
<li>Opioid MAK gereksinimini azaltır. Gruplar arasındaki farkın bir bölümü eşlik eden ilaca ait olabilir. [[K4 s. 412]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-17-2">
<h3>Uzayan blokta ilaç kaydının önemi</h3>
<p><b>Açılış sorusu.</b> Uzun bir girişimin sonunda hastanın sıcaklığı düşük, kan gazında asidoz var. Kas gevşeticinin son dozundan sonra beklenen derlenme görülmüyor. Devir notunda atrakuryum ile rokuronyum adları karışmış. Bu ayrımı neden açıklığa kavuşturursunuz?</p>
<h4>Ek sorular</h4>
<ol>
<li>Atrakuryum verilmişse sıcaklık ve pH kaydı neyi açıklar?</li>
<li>Rokuronyum verilmişse sugammadeks serbest ilacı nasıl azaltır?</li>
<li>Neostigmin kullanıldığında kalp hızını etkileyebilen hangi mekanizma devreye girer?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Hipotermi ve asidoz, atrakuryumun kendiliğinden Hofmann yıkımını yavaşlatır. Blok daha uzun sürebilir. [[K4 s. 420]] [[K4 s. 422]]</li>
<li>Atrakuryum benzilizokinolinyum, rokuronyum aminosteroiddir. Sugammadeksin bağlayacağı ilacı belirlemek için uygulama kaydı doğrulanır. [[K4 s. 419–421]]</li>
<li>Sugammadeks rokuronyumu boşluğunda tutar. Böylece serbest rokuronyum azalır. [[K4 s. 421]]</li>
<li>Neostigmin asetilkolin yıkımını azaltır. Muskarinik uyarı bradikardi yapabildiği için antimuskarinik eşlik eder. [[K4 s. 420–421]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/dersler/farmakoloji/09d">İnhalasyon ajanlarının kinetiği</a> · <a href="#/dersler/farmakoloji/12c">Nondepolarizan kas gevşeticiler</a> · <a href="#/dersler/farmakoloji/12d">Geri döndürücü ajanlar</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/18">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/18'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 18 · SOE',
  baslik: 'Uygulamalı anatomi · sözlü prova',
  lede: 'Hemidiyafram hareketinden sinir lezyonuna, karın duvarı kesitinden duyu dağılımına giderek anatomik yerleşimi sesli tarif edin. [[K4 s. 424–449]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-18-1">
<h3>Boyundaki lezyon ve hemidiyafram</h3>
<p><b>Açılış sorusu.</b> Boynun sağındaki bir lezyondan sonra ultrason sağ hemidiyaframın inspirasyonda yeterince hareket etmediğini gösteriyor. Hasta aynı tarafta diyafram çevresinden kaynaklanabilecek ağrı da tarif ediyor. Motor bulgu ile duyu bulgusunu anatomik olarak nasıl ayırırsınız?</p>
<h4>Ek sorular</h4>
<ol>
<li>Motor kaybı hangi sinir ve köklerle eşleştirirsiniz?</li>
<li>Lezyon tek taraflıysa karşı kubbenin hareketi neden korunabilir?</li>
<li>Diyafram kenarından gelen ağrı için aynı siniri varsayar mısınız?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Sağ frenik sinirin motor lifleri sağ kubbeye ulaşır. Boyundaki hasar toraksta motor bulgu verebilir. [[K4 s. 438]]</li>
<li>Frenik sinir C3–C5 köklerinden lif alır. Bu liflerin başlıca kaynağı C4 köküdür. [[K4 s. 438]]</li>
<li>Her kubbenin motor innervasyonu kendi tarafındandır. İzole sağ frenik lezyon sol taraftaki motor yolu kesmez. [[K4 s. 438]]</li>
<li>Merkezdeki diyafram örtülerinden duyu frenikle taşınır. Periferik bölümün duyusunda alt interkostal ve subkostal sinirler rol alır. [[K4 s. 438–439]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-18-2">
<h3>Karın duvarında iki farklı kesit</h3>
<p><b>Açılış sorusu.</b> Bir asistan anterior karın duvarının enine ultrason kesitlerini karıştırıyor. Birinde orta hatta iki rektus kası birbirine komşu, diğerinde lateral kas tabakaları üst üste. Sinirlerin seyrini kullanarak görüntüleri nasıl etiketlersiniz?</p>
<h4>Ek sorular</h4>
<ol>
<li>İki rektusu ayıran hat ile rektusun lateral kenarını hangi adlarla işaretlersiniz?</li>
<li>Lateral kesitte torakoabdominal sinirleri hangi iki kas arasında ararsınız?</li>
<li>Suprapubik ciltteki duyu değişikliği hangi L1 dalıyla uyumludur?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>İki rektus arasında aponevrozların birleştiği linea alba bulunur. Lateral rektus kenarı linea semilunaris ile izlenir. [[K4 s. 441]]</li>
<li>Lateral kesitte en yüzeyel kas eksternal oblik, en derin kas transversus abdoministir. Aralarında internal oblik yer alır. [[K4 s. 440–442]]</li>
<li>Torakoabdominal sinirlerin lateral seyri internal oblik ile transversus arasındadır. Daha mediale ilerleyen dallar rektus kılıfına ulaşır. [[K4 s. 442–443]]</li>
<li>Suprapubik alan iliohipogastrik sinirle ilişkilidir. L1 kökenli ilioinguinal dal ise dış genital bölgenin bir kısmına ve komşu uyluğa duyu verir. [[K4 s. 443]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part2">Sözlü sınava hazırlık</a> · <a href="#/sinav/part2">Part II sınav biçimi</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/19">Sonraki bölüm →</a></p></section>`,
};

SAYFALAR['rehber/sorular/19'] = {
  grup: 'rehber', sekme: 'rehber/sorular', eyebrow: 'Kitap rehberi · Bölüm 19 · SOE',
  baslik: 'Klinik ölçümler · sözlü prova',
  lede: 'Nabız oksimetresi ve sinir stimülatörü kayıtlarını yorumlayın. Her cihazın hangi büyüklüğü ölçtüğünü ve ekrandaki değerden hangi sonucu çıkarabileceğinizi açıklayın. [[K4 s. 450–472]]',
  html: `
<section class="wrap blk">
<div class="cols">
<article class="card soe-soru" id="htp-19-1">
<h3>Sabit satürasyonla değişen kan gazı</h3>
<p><b>Açılış sorusu.</b> Oksijen alan, anemik bir hastanın izleminde parmak probu düzenli bir dalga ve yüksek SpO₂ gösteriyor. Arter kan gazında ise CO₂ giderek yükseliyor. Bu üç bulgunun nasıl bir arada bulunabileceğini açıklayın.</p>
<h4>Ek sorular</h4>
<ol>
<li>Probun verdiği yüzde hangi büyüklüğü tahmin eder?</li>
<li>Bu yüzde oksijen taşıma kapasitesi hakkında hangi bilgiyi vermez?</li>
<li>Parmak soğuduğunda dalga zayıflarsa yeni okumaya güveniniz nasıl değişir?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Prob, hemoglobinin oksijenlenme oranını kırmızı ve kızılötesi ışığın farklı soğurulmasından tahmin eder. [[K4 s. 453–455]]</li>
<li>Yüksek satürasyon, hemoglobin miktarının yeterli olduğunu göstermez. Anemide aynı satürasyonda kanın oksijen içeriği daha düşüktür. [[K4 s. 384]] [[K4 s. 456]]</li>
<li>Oksijen desteği altında satürasyon korunurken ventilasyon yetersiz kalabilir. CO₂ birikimi için kan gazı ayrı bilgi sağlar. [[K4 s. 456]]</li>
<li>Periferik vazokonstriksiyon atımlı sinyali küçültür. Dalga zayıfken ekrandaki yüzdeyi güvenilir bir arteriyel ölçüm saymak güçleşir. [[K4 s. 456]]</li>
</ul></details>
</article>
<article class="card soe-soru" id="htp-19-2">
<h3>Eşit sayıda kasılma, farklı derlenme</h3>
<p><b>Açılış sorusu.</b> Bir simülatör, rokuronyumdan derlenen iki hastanın dörtlü uyarı kayıtlarını gösteriyor. Her iki kayıtta da dört kasılma var. İlkinde son kasılma ilkinin yarısı, diğerinde dört kasılmanın genliği eşit. Aynı yanıt sayısına rağmen kayıtları neden farklı yorumlarsınız?</p>
<h4>Ek sorular</h4>
<ol>
<li>Her kayıtta dörtlü uyarı oranını nasıl hesaplarsınız?</li>
<li>Hangi kayıtta sönme vardır?</li>
<li>Bu karşılaştırma için ilaçtan önceki bir tekli kasılma ölçümüne gerek var mı?</li>
</ol>
<details><summary>Beklenen yanıtın başlıkları</summary>
<ul class="iskelet">
<li>Sayı kaç yanıtın görüldüğünü söyler. Oran için aynı dizideki son yanıtın genliği ilk yanıtın genliğine bölünür. [[K4 s. 470]]</li>
<li>İlk kayıtta oran 0,5’tir. Ardışık yanıtlardaki sönme, dört yanıt geri dönmüş olsa da rezidüel nondepolarizan blokla uyumludur. [[K4 s. 470–471]]</li>
<li>İkinci kayıtta oran 1’dir. Bu dizide sönme yoktur ve iki kayıttan daha ileri nöromüsküler derlenmeyi gösteren budur. [[K4 s. 470–471]]</li>
<li>Dörtlü dizide ilk kasılma diğerleri için referanstır. Tek uyarı yönteminde ise genliği yorumlamak için blok öncesi kontrol gerekir. [[K4 s. 470]]</li>
</ul></details>
</article>
</div>
</section>
<section class="wrap blk"><h2>Atlasta çalışın</h2>
<p><a href="#/hazirlik/part2">Sözlü sınava hazırlık</a> · <a href="#/sinav/part2">Part II sınav biçimi</a></p>
<p class="small"><a href="#/rehber/sorular">← Bütün bölümler</a> · <a href="#/rehber/sorular/20">Sonraki bölüm →</a></p></section>`,
};
