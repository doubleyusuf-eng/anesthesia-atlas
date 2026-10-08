/* Mekanik Ventilasyon Atlası — çoktan seçmeli sorular. Kaynak: content-src/paket (kaynak numaraları paket genelindedir). */
window.MVA_QUIZ = [
  {
    id: "m-vc-cmv", mode: "vc-cmv", topic: "mod",
    q: "VC-CMV'de aynı VT ve inspiratuvar akım korunurken hava yolu direnci (R) artarsa ekranda öncelikle ne beklenir?",
    o: [
      "Tepe basınç (Ppeak) artar; basınç mekaniğe göre oluşur",
      "Cihaz basıncı sabit tuttuğu için verilen VT azalır",
      "İnspiratuvar akım dalgası kendiliğinden azalan biçime döner",
      "Pplat ve ΔP, direnç artışıyla orantılı biçimde düşer"
    ],
    a: 0,
    ex: "VC'de seçilen hacim/akım düzeni uygulanır, gereken basınç hastanın mekaniğine göre oluşur. Aynı VT ve akımda R artışı tepe basıncı, C azalması elastik basıncı artırır.",
    src: [1, 3, 16, 38]
  },
  {
    id: "m-pc-cmv", mode: "pc-cmv", topic: "mod",
    q: "PC-CMV'de basınç ayarı değişmeden kompliyans iyileşir ya da hasta güçlü efor gösterirse ne olabilir?",
    o: [
      "Cihaz VT'yi sabit tutmak için inspiratuvar basıncı düşürür",
      "VT değişmez; yalnızca tepe basınç belirgin biçimde azalır",
      "VT büyüyebilir; basınç sınırlama hacim sınırlama değildir",
      "Soluk akım eşiğine ulaşınca zamanından önce sonlanır"
    ],
    a: 2,
    ex: "PC'de basınç ve süre belirlenir; hacim C, R, Ti ve hasta çabasının sonucudur. C iyileştiğinde veya güçlü efor geldiğinde VT büyüyebilir; basınç sınırlama, hacim veya transpulmoner gerilim sınırlamasıyla aynı değildir.",
    src: [1, 3, 16]
  },
  {
    id: "m-vc-simv", mode: "vc-simv", topic: "mod",
    q: "VC-SIMV'de hasta zorunlu solukların arasında spontan soluyor. Bu durumla ilgili doğru yorum hangisidir?",
    o: [
      "Hastanın arada spontan soluması yükün yeterince desteklendiğini gösterir",
      "Spontan soluklardaki efor zorunlu soluklardakinden farklı olabilir",
      "Aradaki spontan soluklar da ayarlı zorunlu VT ile verilir",
      "Zorunlu sıklığı azaltmak günlük SBT değerlendirmesinin yerini tutar"
    ],
    a: 1,
    ex: "SIMV'de zorunlu ve spontan soluklar farklı kontrol kurallarıyla oluşur; iki soluk tipindeki efor farklı olabilir. Ayırmada zorunlu sıklığı azaltmak güncel günlük SBT değerlendirmesinin yerine konmamalıdır.",
    src: [1, 15, 16, 11]
  },
  {
    id: "m-pc-simv", mode: "pc-simv", topic: "mod",
    q: "PC-SIMV kullanılırken aşağıdakilerden hangisi kartta belirtilen sık bir hatadır?",
    o: [
      "Zorunlu basınç, Ti ve sıklığı PS'den ayrı ayarlamak",
      "PEEP ve FiO₂'yi iki soluk tipi için ortak zemin saymak",
      "Aradaki spontan solukların VT'sini ayrıca izlemek",
      "PS düzeyini zorunlu inspiratuvar basınçla aynı saymak"
    ],
    a: 3,
    ex: "PC-SIMV'de zorunlu soluklar basınç ve süreyle, aradaki spontan soluklar varsa ayrı PS ile desteklenir. PS düzeyini zorunlu inspiratuvar basınçla karıştırmak ve aradaki solukların VT'sini güvenli sanmak sık hatadır.",
    src: [1, 15, 16, 11]
  },
  {
    id: "m-prvc", mode: "prvc", topic: "mod",
    q: "PRVC ailesinde güçlü hasta eforuyla ölçülen VT hedefin üzerine çıkarsa algoritmanın olası yanıtı ve bunun doğru yorumu nedir?",
    o: [
      "Basıncı artırır; hedef VT her solukta garanti altına alınır",
      "Sabit akımlı VC soluklarına geçerek hacmi sabitler",
      "Basıncı azaltabilir; bu, hastanın artan işini gizleyebilir",
      "Basınç değişmez; yalnızca sonraki soluğun Ti'si kısalır"
    ],
    a: 2,
    ex: "PRVC'de anlık kontrol basınçtır, geri besleme hedefi hacimdir. Kuvvetli eforla VT artınca algoritma basıncı azaltabilir; hastanın işinin arttığını fark etmeden 'daha az basınç iyi' denmez ve hedef her solukta garanti değildir.",
    src: [15, 16, 18, 19]
  },
  {
    id: "m-prvc-simv", mode: "prvc-simv", topic: "mod",
    q: "Hacim hedefli adaptif basınçlı SIMV'de hedef VT'ye göre basınç uyarlaması hangi soluklara aittir?",
    o: [
      "Zorunlu soluklara; spontan PS solukları ayrı desteklenir",
      "Hem zorunlu hem spontan soluklara aynı ölçüde uygulanır",
      "Yalnızca hasta tetiklemeli spontan PS soluklarına aittir",
      "Hiçbirine; hedef VT yalnızca bir alarm eşiği olarak çalışır"
    ],
    a: 0,
    ex: "Hedef VT'ye göre uyarlama zorunlu soluklara aittir; spontan PS soluklarının aynı hacme ulaşması beklenmez. 'Ekranda hedef VT var, her soluk o hacimde' hatasından kaçınmak için toplam hacim ve her soluk türü ayrı izlenir.",
    src: [15, 16, 18]
  },
  {
    id: "m-psv", mode: "psv", topic: "mod",
    q: "PSV'de inspirasyonun sonlanması ve VT ile ilgili hangisi doğrudur?",
    o: [
      "Ayarlı Ti ile sonlanır; VT ayarlanan değere sabitlenir",
      "Ayarlı VT'ye ulaşınca sonlanır; basınç mekaniğe göre oluşur",
      "Basınç alarm sınırına ulaşınca sonlanır; VT yalnızca PEEP düzeyine bağlıdır",
      "Genellikle akım eşiğiyle sonlanır; VT efor ve mekanikle değişir"
    ],
    a: 3,
    ex: "PSV'de hasta soluğu başlatır, cihaz PEEP üzerinde basınç yardımı verir ve inspirasyon genellikle akım eşiğiyle biter. Sabit yardım basıncı sabit hacim anlamına gelmez; apnede etkin yedek destek yoksa yeterli ventilasyon sağlamaz.",
    src: [1, 6, 16, 11]
  },
  {
    id: "m-cpap", mode: "cpap", topic: "mod",
    q: "Saf CPAP ile ilgili hangisi doğrudur?",
    o: [
      "Apnede cihaz ayarlı sıklıkta zamanlı yedek soluk verir",
      "Belirlenmiş VT veya zorunlu sıklık yoktur; tidal iş hastadadır",
      "Her inspirasyonda basınç zemininin üzerine sabit PS ekler",
      "CO₂ eliminasyonu üzerinde hiçbir koşulda etkisi olamaz"
    ],
    a: 1,
    ex: "CPAP tüm solunum çevriminde pozitif basınç zemini sağlar; saf CPAP'ta ek PS, belirlenmiş VT veya zorunlu sıklık yoktur. 'CPAP CO₂'yi hiç etkileyemez' de 'apnede soluk verir' de yanlış genellemedir.",
    src: [10, 16, 41]
  },
  {
    id: "m-volume-support", mode: "volume-support", topic: "mod",
    q: "Volume Support (VS) ile zorunlu PRVC arasındaki temel fark hangisidir?",
    o: [
      "VS'de basınç sabit kalır, yalnızca Ti hedef VT'ye göre değişir",
      "VS'de soluklar hasta tetiklemelidir ve çoğunlukla akımla sonlanır",
      "VS'de cihaz zamanla tetiklenen zorunlu soluklar verir",
      "VS hacim yerine dakika ventilasyonunu hedefler ve tamamlar"
    ],
    a: 1,
    ex: "VS, spontan soluklarda hedef VT'ye yaklaşmak için PS düzeyini soluktan soluğa uyarlar; soluklar hasta tetiklemelidir ve çoğunlukla akımla sonlanır. Zorunlu PRVC ile aynı soluk dizisi değildir; yüksek efor ve kaçak uyarlamayı yanıltabilir.",
    src: [18, 19]
  },
  {
    id: "m-bilevel", mode: "bilevel", topic: "mod",
    q: "İnvaziv iki basınç düzeyli ventilasyonda (ör. Dräger BIPAP) kartta belirtilen sık hata hangisidir?",
    o: [
      "Her iki basınç düzeyinde spontan solunuma izin vermek",
      "PS'nin hangi basınç düzeyine göre tanımlandığını kontrol etmek",
      "Basınç farkını ve süreleri zorunlu hacmin belirleyicisi saymak",
      "Üst düzeydeki spontan hacmi zorunlu VT'ye eklemeyi unutmak"
    ],
    a: 3,
    ex: "Basınç farkı ve düzeylerde kalma süresi zorunlu hacim bileşenini oluşturur; spontan soluklar bunun üzerine eklenir. Üst düzeydeki spontan hacmi hesaba katmamak veya bunu otomatik APRV saymak hatadır; Dräger BIPAP maskeli BiPAP S/T ile aynı kavram değildir.",
    src: [16, 17]
  },
  {
    id: "m-aprv", mode: "aprv", topic: "mod",
    q: "APRV'de Plow ayarının düşük olmasıyla ilgili doğru yorum hangisidir?",
    o: [
      "Alveoler PEEP'in de aynı düzeyde olduğu anlamına gelmez",
      "Kısa Tlow'da alveoler basıncın Plow'a indiğini gösterir",
      "Salıverme hacminin yalnızca Plow ile belirlendiğini gösterir",
      "Hiperinflasyon riskinin ortadan kalktığını gösterir"
    ],
    a: 0,
    ex: "APRV'de salıverme hacmi basınç farkı, süre ve mekanikle değişir. Plow'un düşük olması alveoler PEEP'in aynı olduğu anlamına gelmez; büyük spontan VT, aşırı efor, hiperinflasyon ve hemodinamik etki gözden kaçabilir.",
    src: [14, 17, 8]
  },
  {
    id: "m-mmv", mode: "mmv", topic: "mod",
    q: "MMV'de hasta hızlı yüzeyel solunumla hedef dakika ventilasyonunu dolduruyorsa ne beklenir?",
    o: [
      "Cihaz alveoler ventilasyonu ölçüp zorunlu soluk ekler",
      "Zorunlu soluk sıklığı otomatik olarak artırılır",
      "Hedef VE dolsa da etkili ventilasyon yetersiz kalabilir",
      "VE hedefi dolduğundan CO₂ izlemine gerek kalmaz"
    ],
    a: 2,
    ex: "MMV'de denetlenen toplam dakika hacmidir; aynı VE farklı VT/sıklık dağılımlarında farklı alveoler ventilasyon yaratabilir. Hızlı yüzeyel solunum hedef VE'yi doldururken etkili ventilasyon yetersiz kalabilir; hedef VE'nin dolması CO₂ ve efor izleminin yerine geçmez.",
    src: [17, 44]
  },
  {
    id: "m-pav-plus", mode: "pav-plus", topic: "mod",
    q: "PAV+ ile ilgili hangisi doğrudur?",
    o: [
      "Her solukta ayarlanan sabit basınç yardımını verir",
      "Apneik hastada da hasta dürtüsü olmadan tam ve güvenli destek sağlar",
      "PROMIZING 2025'te ayırma süresini PSV'ye göre kısalttı",
      "Hastanın yükünün seçilen bir bölümünü üstlenir; dürtü gerekir"
    ],
    a: 3,
    ex: "PAV+ akım ve hacimle tahmin edilen R/E yükünden gerekli desteği hesaplar ve yükün seçilen bölümünü üstlenir; hasta dürtüsüne ihtiyaç vardır. PROMIZING 2025, PSV'ye göre ventilatörden ayrılma süresinde anlamlı fark göstermedi.",
    src: [19, 21, 54]
  },
  {
    id: "m-pps", mode: "pps", topic: "mod",
    q: "PPS'de Flow Assist ve Volume Assist bileşenleri sırasıyla hangi yükü karşılamayı amaçlar?",
    o: [
      "Elastik yükü ve direnç yükünü",
      "Direnç yükünü ve elastik yükü",
      "İntrinsik PEEP'i ve direnç yükünü",
      "Tetikleme gecikmesini ve elastik yükü"
    ],
    a: 1,
    ex: "Akımla orantılı destek direnç yükünü, hacimle orantılı destek elastik yükü karşılamayı amaçlar. Bu ayarlar PAV+ yardım yüzdesiyle aynı değildir; yanlış kazanç aşırı yardım veya yetersiz destek yaratabilir.",
    src: [17, 54]
  },
  {
    id: "m-nava", mode: "nava", topic: "mod",
    q: "NAVA'da desteğin zamanlaması ve büyüklüğü öncelikle neye göre belirlenir?",
    o: [
      "Hava yolu basıncındaki tetikleme düşüşüne",
      "Özofagus basıncıyla ölçülen kas kuvvetine",
      "Diyaframın elektriksel aktivitesine (Edi)",
      "Ayarlı cmH₂O cinsinden PS düzeyine"
    ],
    a: 2,
    ex: "NAVA'da özofageal elektrotlu kateterden alınan Edi sinyali yardımın zamanlamasını ve büyüklüğünü yönlendirir; sinirsel uyarı basınç üretimiyle aynı değildir. NAVA düzeyi klasik cmH₂O PS değildir; sinyal yoksa yedek ventilasyon kritiktir.",
    src: [20, 29, 54]
  },
  {
    id: "m-niv-nava", mode: "niv-nava", topic: "mod",
    q: "Noninvaziv NAVA ile ilgili hangisi doğrudur?",
    o: [
      "Edi ile tetikleme, kaçağın fizyolojik etkisini ortadan kaldırmaz",
      "Nöral tetikleme sekresyon ve aspirasyon riskini çözer",
      "Kaçak olduğunda hacim ölçümü daha güvenilir hâle gelir",
      "Genel NIV endikasyonlarını tüm erişkinlere genişletmiştir"
    ],
    a: 0,
    ex: "Edi ile zamanlama, kaçak olduğunda pnömatik tetiklemeye bağımlılığı azaltabilir; ancak kaçağın fizyolojik etkisini ortadan kaldırmaz. Üst hava yolu açıklığı, sekresyon ve aspirasyon riski nöral tetiklemeyle çözülmez.",
    src: [20, 29, 49]
  },
  {
    id: "m-asv-adaptive-support", mode: "asv-adaptive-support", topic: "mod",
    q: "Hamilton ASV (Adaptive Support Ventilation) ile ilgili hangisi doğrudur?",
    o: [
      "Hedef dakika ventilasyonu için VT ve sıklık bileşimini seçer",
      "Uyku tıbbındaki adaptif servo ventilasyonla aynı algoritmadır",
      "Temel hâliyle SpO₂'ye göre oksijen ayarını otomatik yapar",
      "Hesaplarında hastanın gerçek vücut ağırlığını kullanır"
    ],
    a: 0,
    ex: "Hamilton ASV, hedef dakika ventilasyonu için VT ve sıklık bileşimini mekanik özelliklere göre seçer; ağırlık boy/cinsiyetten türetilir. Uyku tıbbındaki adaptif servo ventilasyonla aynı değildir ve temel ASV otomatik oksijenasyon kontrolüyle eş tutulmaz.",
    src: [16, 15]
  },
  {
    id: "m-intellivent-asv", mode: "intellivent-asv", topic: "mod",
    q: "INTELLiVENT-ASV'nin kontrol girdisi olan ölçümlerle ilgili kartta vurgulanan sınırlama hangisidir?",
    o: [
      "PetCO₂, arteriyel CO₂'nin değişmez bir eşdeğeri kabul edilir",
      "SpO₂ sinyali periferik perfüzyon bozukluğundan etkilenmez",
      "PaCO₂–PetCO₂ farkı büyüyebilir; perfüzyon SpO₂'yi bozabilir",
      "Ölçüm hatalı olsa bile algoritma doğru ayara ulaşır"
    ],
    a: 2,
    ex: "INTELLiVENT-ASV, ASV'ye PetCO₂ ve SpO₂ geri beslemesi ekler. PaCO₂–PetCO₂ farkı büyüyebilir, periferik perfüzyon SpO₂'yi bozabilir; yanlış sinyal yanlış ayara yol açabilir.",
    src: [22, 23]
  },
  {
    id: "m-automode", mode: "automode", topic: "mod",
    q: "Automode kullanılırken kartta belirtilen sık hata hangisidir?",
    o: [
      "Seçilen mod çiftinin ayarlarını ayrı ayrı kontrol etmek",
      "Oto-tetiklemeyi gerçek spontan solunum sanmak",
      "Apne aralığı davranışını cihaza göre doğrulamak",
      "Otomatik geçişi ekstübasyon kararından ayırmak"
    ],
    a: 1,
    ex: "Automode, tetiklemeyi ve apne aralığını değerlendirerek eşlenmiş kontrollü ve destekli modlar arasında geçer. Oto-tetikleme gerçek spontan solunum sanılabilir; Automode otomatik PS azaltma protokolüyle de karıştırılmamalıdır.",
    src: [18]
  },
  {
    id: "m-smartcare", mode: "smartcare", topic: "mod",
    q: "SmartCare/PS gibi otomatik ayırma protokolleri için hangisi doğrudur?",
    o: [
      "Algoritmanın önerisi ekstübasyon kararının yerine geçer",
      "Hava yolu korumasını ve sekresyon yönetimini doğrular",
      "PS yerine zorunlu hacim solukları vererek ayırma yapar",
      "PS soluk fiziğini değiştirmez; destek düzeyini uyarlar"
    ],
    a: 3,
    ex: "SmartCare/PS bir mod değil otomasyon katmanıdır: PS'nin temel soluk fiziği değişmez, ölçülen sıklık, hacim ve CO₂ gibi değişkenlere göre destek düzeyi protokol içinde uyarlanır. Algoritma önerisi klinik değerlendirme olmadan ekstübasyon emri sayılmaz.",
    src: [17, 11]
  },
  {
    id: "m-variable-ps", mode: "variable-ps", topic: "mod",
    q: "Variable PS'de yardımın soluktan soluğa değişmesi nasıl yorumlanmalıdır?",
    o: [
      "PAV/NAVA'daki gibi hastanın eforuyla orantılı bir yardımdır",
      "Bu değişkenlik cihaz arızasının göstergesi kabul edilir",
      "Önceden belirlenen aralıkta değişimdir; efora orantılı değildir",
      "Ortalama değer yüksek VT oluşumunu güvenle dışlar"
    ],
    a: 2,
    ex: "Variable PS, yardım büyüklüğünü önceden belirlenen değişkenlik içinde değiştirir; bu, PAV/NAVA'daki gibi efora orantılı olmak demek değildir. Değişkenlik içinde oluşan yüksek VT veya basıncı ortalama değer gizleyebilir.",
    src: [52, 54]
  },
  {
    id: "m-niv-s", mode: "niv-s", topic: "mod",
    q: "İki düzeyli noninvaziv destekte saf S (spontan) modu için hangisi doğrudur?",
    o: [
      "Hasta her soluğu tetikler; zamanlı yedek soluk beklenmez",
      "Apnede cihaz ayarlı sıklıkta zamanlı soluk verir",
      "Basınç desteği doğrudan IPAP değerinin kendisidir",
      "Tasarlanmış ekshalasyon portu kaçak sayılıp kapatılır"
    ],
    a: 0,
    ex: "S modunda hasta her soluğu tetikler; inspirasyonda IPAP, ekspirasyonda EPAP uygulanır ve basınç desteği IPAP−EPAP farkıdır. Saf S modunda zamanlı yedek soluk varmış gibi davranılmaz; tek hortumlu devrede tasarlanmış ekshalasyon portu kapatılmaz.",
    src: [10, 24, 49]
  },
  {
    id: "m-niv-st", mode: "niv-st", topic: "mod",
    q: "Akut asidotik KOAH alevlenmesinde S/T modunda iki düzeyli NIV alan hastanın bilinci ve gaz değişimi kötüleşiyor. İçerikle uyumlu yaklaşım hangisidir?",
    o: [
      "Yalnızca IPAP ve yedek sıklığı artırarak NIV'yi sürdürmek",
      "Zamanlı yedek solukları kapatıp saf S moduna geçmek",
      "Güçlü kılavuz desteği nedeniyle NIV'yi değiştirmemek",
      "İnvaziv destek gereksinimini geciktirmeden değerlendirmek"
    ],
    a: 3,
    ex: "Akut asidotik KOAH alevlenmesinde iki düzeyli NIV güçlü kılavuz desteğine sahiptir, ancak hava yolu koruması ve yakın yanıt izlemi gerekir. Bilinç, dolaşım veya gaz değişimi kötüleşirken NIV'yi yalnız ayar artırarak sürdürmek invaziv desteği geciktirebilir.",
    src: [10, 16, 24]
  },
  {
    id: "m-niv-t-pc", mode: "niv-t-pc", topic: "mod",
    q: "Noninvaziv T / PC uygulamasında devre seçimiyle ilgili kartta vurgulanan risk hangisidir?",
    o: [
      "Zamanlı soluklarda kaçak kompanzasyonunun tümüyle gereksiz olması",
      "Yanlış devrenin CO₂'nin yeniden solunmasına yol açabilmesi",
      "T ve PC modlarının bütün cihazlarda aynı davranması",
      "Süre kontrollü soluklarda Ti'nin cihazca belirlenememesi"
    ],
    a: 1,
    ex: "T/PC uygulamasında inspirasyon süresi daha doğrudan cihaz tarafından belirlenebilir, ancak T ve PC bütün cihazlarda aynı davranmaz. Devre, ekshalasyon valfi ve maske uyumu cihaz modelinin IFU'suna göre doğrulanmalıdır; yanlış devre CO₂ yeniden solunmasına yol açabilir.",
    src: [24, 25, 16]
  },
  {
    id: "m-avaps", mode: "avaps", topic: "mod",
    q: "Obezitesi olan kronik hipoventilasyonlu hastada AVAPS hedefi belirlenirken hangisi kartın uyarısıyla çelişir?",
    o: [
      "Basınç üst sınırına ulaşılıp ulaşılmadığını izlemek",
      "Hedef hacmi gerçek (obez) kilo üzerinden büyütmek",
      "Kaçağın hedefi yakalamayı engelleyebileceğini bilmek",
      "Adaptasyon hızının cihaza göre değişebildiğini bilmek"
    ],
    a: 1,
    ex: "AVAPS, hedef VT'ye yaklaşmak için izin verilen aralıkta inspiratuvar basıncı zaman içinde ayarlar; basınç sınırı veya kaçak nedeniyle hedef yakalanamayabilir. Hacim hedefi gerçek obez kilo üzerinden büyütülmemelidir.",
    src: [24, 26, 53]
  },
  {
    id: "m-avaps-ae", mode: "avaps-ae", topic: "mod",
    q: "AVAPS-AE alan hastada destek trendleri izlenirken hangisi doğrudur?",
    o: [
      "EPAP sabittir; yalnızca IPAP trendini izlemek yeterlidir",
      "'Auto' özellikleri hava yolu güvenliğini otomatik değerlendirir",
      "Otomatik EPAP, yardım farkını her koşulda sabit tutar",
      "IPAP ile birlikte EPAP da değişebilir; tek trend yetmez"
    ],
    a: 3,
    ex: "AVAPS-AE hacim hedefli desteğe otomatik EPAP ve başka otomatik zamanlama özellikleri ekler; IPAP ve EPAP zaman içinde değişebilir, yalnız IPAP trendine bakmak yetersizdir. 'Auto' ifadesi tanı veya hava yolu güvenliği değerlendirmesini otomatikleştirmez.",
    src: [24, 26]
  },
  {
    id: "m-ivaps", mode: "ivaps", topic: "mod",
    q: "iVAPS'ın hedef olarak kullandığı büyüklük için hangisi doğrudur?",
    o: [
      "Boydan tahmini ölü boşlukla hesaplanan alveoler ventilasyon",
      "Kan gazındaki PaCO₂'den doğrudan ölçülen alveoler ventilasyon",
      "Yalnızca ayarlanan VT; solunum sıklığı hesaba katılmaz",
      "Volümetrik kapnografiyle ölçülen fizyolojik ölü boşluk"
    ],
    a: 0,
    ex: "iVAPS, anatomik ölü boşluğu boydan tahmin edip sıklığı dikkate alarak tahmini alveoler ventilasyonu hedefler; bu doğrudan alveoler ventilasyon veya PaCO₂ ölçümü değildir. Patolojik fizyolojik ölü boşluk, boydan tahmin edilenden farklı olabilir.",
    src: [24, 25]
  },
  {
    id: "m-sleep-asv", mode: "sleep-asv", topic: "mod",
    q: "Uyku tıbbında kullanılan adaptif servo ventilasyon için hangisi doğrudur?",
    o: [
      "Hamilton ASV ile aynı dakika hacmi algoritmasını kullanır",
      "Düşük EF'li kalp yetmezliğinde koşulsuz önerilen tedavidir",
      "Santral olaylarda değişken yardım ve yedek soluk kullanır",
      "Amacı yoğun bakımdaki dakika hacmi optimizasyonudur"
    ],
    a: 2,
    ex: "Uyku ASV'si periyodik solunum ve santral olaylara karşı değişken basınç yardımı ve yedek soluk kullanır; Hamilton ASV'den farklıdır. AASM 2025 belirli santral apne nedenlerinde koşullu öneriler verir; düşük EF'li kalp yetmezliğinde deneyimli merkez ve yakın izlem vurgulanır.",
    src: [35, 53]
  },
  {
    id: "m-apap", mode: "apap", topic: "mod",
    q: "APAP ile ilgili hangisi doğrudur?",
    o: [
      "Hedef VT'ye ulaşmak için inspiratuvar basıncı uyarlar",
      "Akut hiperkapnik pompa yetmezliğinin otomatik çözümüdür",
      "Klasik PS gibi her inspirasyonda PEEP üzerine ek basınç yardımı verir",
      "Obstrüktif olay işaretlerine göre CPAP düzeyini değiştirir"
    ],
    a: 3,
    ex: "APAP, obstrüktif olay işaretlerine göre CPAP düzeyini belirlenen aralıkta değiştiren bir uyku cihazı yaklaşımıdır; hacim kontrollü ventilasyon veya klasik PS değildir. Akut hiperkapnik pompa yetmezliğinin otomatik çözümü sayılmaz; AVAPS/ASV ile aynı değildir.",
    src: [57, 41, 53]
  },
  {
    id: "m-neonatal-tcpl", mode: "neonatal-tcpl", topic: "mod",
    q: "Yenidoğanda zaman çevrimli basınç sınırlı ventilasyonda surfaktan sonrası kompliyans hızla düzelirse ne beklenir?",
    o: [
      "Basınç sınırı nedeniyle VT değişmeden kalır",
      "Aynı basınç daha büyük VT üretebilir",
      "Ti otomatik kısalarak VT'yi sabit tutar",
      "Bias akım VT artışını kendiliğinden engeller"
    ],
    a: 1,
    ex: "Bu yöntemde basınç ve inspirasyon süresi belirlenir; VT küçük akciğerin mekaniğiyle değişir. Surfaktan sonrası C hızla düzelirse aynı basınç daha büyük VT üretebilir.",
    src: [28, 29, 50]
  },
  {
    id: "m-neonatal-ac-sippv", mode: "neonatal-ac-sippv", topic: "mod",
    q: "Yenidoğanda senkronize assist-control (SIPPV) için hangisi doğrudur?",
    o: [
      "Erişkin VCV ile aynı, sabit akımlı zorunlu soluk dizisidir",
      "Neonatal SIMV ile aynıdır; yalnızca üretici adı farklıdır",
      "Uygun çabalar zorunlu solukla desteklenir; apnede yedek sıklık var",
      "Hacim hedefi (VG) her uygulamada otomatik olarak içindedir"
    ],
    a: 2,
    ex: "SIPPV'de algılanan uygun hasta çabaları zorunlu solukla desteklenir, apnede yedek sıklık devrededir; senkronizasyon bir zamanlama özelliğidir. VG eklenip eklenmediği ayrıca belirtilmeli; SIPPV erişkin VCV veya neonatal SIMV ile aynı kabul edilmez.",
    src: [28, 29]
  },
  {
    id: "m-neonatal-vg", mode: "neonatal-vg", topic: "mod",
    q: "Yenidoğanda hacim hedefli ventilasyon (VTV/VG) için hangisi doğrudur?",
    o: [
      "Temel moda eklenir; ölçülen VT'ye göre basıncı uyarlar",
      "Hedef VT, erişkin PBW formülüyle hesaplanır",
      "Sensör ölü boşluğu ve tüp kaçağı ölçümü etkilemez",
      "Her solukta hedef hacmin verilmesini garanti eder"
    ],
    a: 0,
    ex: "VG, temel soluk dizisine eklenen ve ölçülen küçük VT'ye göre basıncı uyarlayan bir hedefleme özelliğidir. Sensörün ölü boşluğu ve tüp kaçağı önemlidir; erişkin PBW hesapları yenidoğana uygulanmaz.",
    src: [28, 29, 50]
  },
  {
    id: "m-ncpap", mode: "ncpap", topic: "mod",
    q: "Prematürede nazal CPAP ile ilgili hangisi doğrudur?",
    o: [
      "Bubble sistemdeki titreşim HFOV ile eşdeğer değildir",
      "Bubble ve variable-flow ayrı zorunlu soluk algoritmalarıdır",
      "Apne veya artan eforda CPAP'ı sürdürmek yeterlidir",
      "Burun/cilt ve mide distansiyonu izlemi gerektirmez"
    ],
    a: 0,
    ex: "Nazal CPAP spontan solunum sırasında sürekli distansiyon basıncı sağlar; bubble/variable-flow basınç üretim yöntemleridir ve bubble titreşimi HFOV ile eşit değildir. Apne, artan efor veya oksijen ihtiyacında eskalasyon gereksinimi değerlendirilir.",
    src: [28, 50]
  },
  {
    id: "m-nippv", mode: "nippv", topic: "mod",
    q: "NIPPV sırasında ekranda görülen inspiratuvar basınç darbeleri için doğru yorum hangisidir?",
    o: [
      "Her darbe akciğere eşit hacim geçtiğini gösterir",
      "Glottis ve kaçak, verilen akciğer hacmini etkilemez",
      "Darbe görülmesi aynı hacmin geçtiğini kanıtlamaz",
      "Tüm iki düzeyli nazal cihazlar aynı NIPPV'yi uygular"
    ],
    a: 2,
    ex: "NIPPV nazal basınç zemini üzerine aralıklı destek darbeleri ekler; kaçak ve glottis akciğere verilen hacmi etkiler. Ekranda darbe olması akciğere aynı hacmin geçtiğini kanıtlamaz; iki düzeyli nazal cihazların hepsi aynı uygulama değildir.",
    src: [28, 29]
  },
  {
    id: "m-hfov", mode: "hfov", topic: "mod",
    q: "HFOV'da frekans artırıldığında CO₂ eliminasyonu için doğru ifade hangisidir?",
    o: [
      "Her zaman artar; frekans tek belirleyicidir",
      "Her zaman artmaz; osilatuvar VT değişebilir",
      "Değişmez; CO₂ yalnızca ortalama basınca bağlıdır",
      "Göğüs titreşimi arttıkça yeterli kabul edilir"
    ],
    a: 1,
    ex: "HFOV'da ortalama distansiyon basıncı üzerine küçük, hızlı iki yönlü salınımlar bindirilir. Frekansı artırınca CO₂ her zaman daha iyi atılmaz, osilatuvar VT değişebilir; göğüs titreşimi tek başına yeterli gaz değişimi ölçüsü değildir.",
    src: [28, 27, 8, 29]
  },
  {
    id: "m-hfov-vg", mode: "hfov-vg", topic: "mod",
    q: "Hacim hedefli HFOV'da geri besleme hangi ayarı uyarlar?",
    o: [
      "Ortalama distansiyon basıncını",
      "Oksijen fraksiyonunu (FiO₂)",
      "Konvansiyonel VG'deki tidal hacim hedefini",
      "Osilatuvar hacim için amplitüdü"
    ],
    a: 3,
    ex: "HFOV-VG, osilatuvar hacim hedefini korumak için amplitüdü (basınç salınımını) uyarlar. Konvansiyonel VG hedefleri buraya kopyalanmaz; çok küçük hacmin ölçümü, kaçak ve sensör doğruluğu kritiktir.",
    src: [28, 51]
  },
  {
    id: "m-hfjv", mode: "hfjv", topic: "mod",
    q: "HFJV'de ekspirasyonla ilgili kritik güvenlik noktası hangisidir?",
    o: [
      "Ekspirasyon aktif olduğundan çıkış yolu önemsizdir",
      "Jet sürücü basıncı alveoler basınçla aynı kabul edilebilir",
      "Çıkış engellenirse ciddi hava hapsi/barotravma olabilir",
      "Klasik VT eğrileri her platformda güvenilir izlenir"
    ],
    a: 2,
    ex: "HFJV'de dar kanülden kısa jetler verilir ve ekspirasyon çoğunlukla pasif çıkış yoluna bağlıdır. Ekspiratuvar çıkış engellenirse ciddi hava hapsi/barotravma gelişebilir; jet kaynağının basıncı alveoler basınçla aynı değildir.",
    src: [30]
  },
  {
    id: "m-hfpv", mode: "hfpv", topic: "mod",
    q: "HFPV'nin temel soluk mekanizması hangisidir?",
    o: [
      "Yavaş solunum çevrimlerine bindirilmiş küçük hızlı darbeler",
      "Ortalama basınç etrafında aktif inspirasyonlu ve ekspirasyonlu salınım",
      "Dar bir kanülden verilen, pasif çıkışlı kısa gaz jetleri",
      "Ekspiratuvar akımın da aktif kontrol edildiği sabit akım"
    ],
    a: 0,
    ex: "HFPV daha yavaş solunum çevrimleri üzerine yüksek frekanslı küçük gaz darbeleri ekler; konvansiyonel ve yüksek frekanslı bileşenleri birleştirir. HFOV ve HFJV ile aynı değildir; çalışmalar heterojendir.",
    src: [31]
  },
  {
    id: "m-nhfov", mode: "nhfov", topic: "mod",
    q: "Nazal yüksek frekanslı osilatuvar destek (nHFOV) için hangisi doğrudur?",
    o: [
      "Entübe HFOV ile aynı basınç aktarımını sağlar",
      "CPAP ve NIPPV ile aynı yöntemin farklı adıdır",
      "Her merkez için geçerli tek bir ayar şablonu tanımlanmıştır",
      "Üst hava yolu ve kaçak osilasyon iletimini değiştirir"
    ],
    a: 3,
    ex: "nHFOV'da üst hava yolu ve kaçak, osilasyonların akciğere iletimini değiştirir; entübe HFOV ile aynı aktarım yoktur. CPAP, NIPPV ve nHFOV aynı yöntem değildir ve her merkeze tek ayar şablonu verilemez.",
    src: [28]
  },
  {
    id: "m-fcv", mode: "fcv", topic: "mod",
    q: "Akım kontrollü ventilasyonu (FCV) klasik VC'den ayıran temel özellik hangisidir?",
    o: [
      "İnspiratuvar akımın kare dalga biçiminde sabit verilmesi",
      "Ekspiratuvar akımın da aktif olarak kontrol edilmesi",
      "Ekspirasyonun tümüyle pasif bırakılması",
      "Basınç hedefinin soluktan soluğa uyarlanması"
    ],
    a: 1,
    ex: "FCV'de inspirasyonun yanında ekspiratuvar akım da aktif olarak kontrol edilir; klasik VC'deki pasif ekspirasyondan farklıdır. Standart ventilatörde yalnız kare akım seçmek FCV değildir; klinik kanıt sınırlı ve heterojendir.",
    src: [32, 33, 34]
  },
  {
    id: "m-mouthpiece", mode: "mouthpiece", topic: "mod",
    q: "Ağızlıkla ventilasyon (MPV) ile ilgili hangisi doğrudur?",
    o: [
      "Kendine özgü zorunlu soluk algoritması olan ayrı bir moddur",
      "Uygulama yöntemidir; aralıklı bağlantı alarm mantığını değiştirir",
      "Maskeli NIV ile aynı alarm ve devre davranışını gösterir",
      "Bilinç ve bulber işlevden bağımsız olarak uygulanabilir"
    ],
    a: 1,
    ex: "MPV bir arayüz/uygulama yöntemidir; uygun ventilatörde hacim veya basınç soluklarıyla uygulanır ve bağlantının aralıklı olması kaçak ve alarm mantığını değiştirir. Bilinç, bulber işlev ve ağızlığa erişim önemlidir.",
    src: [24]
  },
  {
    id: "m-negative-pressure", mode: "negative-pressure", topic: "mod",
    q: "Negatif basınçlı ventilasyonun mekanizması ve sınırı için hangisi doğrudur?",
    o: [
      "Ağızdan pozitif basınçla iter ve hava yolunu korur",
      "Rutin yoğun bakımda varsayılan destek yöntemidir",
      "Hava yolu basınç eğrisi pozitif basınç modlarıyla birebir aynıdır",
      "Dış basıncı düşürür; üst hava yolu kollapsı sorun olabilir"
    ],
    a: 3,
    ex: "Negatif basınçlı ventilasyon pozitif basınçla itmek yerine göğüs dışındaki basıncı düşürür. Üst hava yolu kollapsı ve arayüz uyumu sorun olabilir; hava yolu koruma ihtiyacını çözmez ve rutin yoğun bakım varsayılanı değildir.",
    src: [48]
  },
  {
    id: "m-vaps-intrabreath", mode: "vaps-intrabreath", topic: "mod",
    q: "Soluk içi dual kontrol (VAPS) ile AVAPS arasındaki ayrım hangisidir?",
    o: [
      "VAPS aynı soluk içinde, AVAPS zaman içinde uyarlar",
      "İkisi de soluklar arası basınç uyarlaması yapar",
      "VAPS soluklar arası, AVAPS aynı soluk içinde uyarlar",
      "İkisi de yalnızca sabit akımlı hacim soluğu verir"
    ],
    a: 0,
    ex: "VAPS'ta soluk basınç yardımıyla başlar, hacim hedefi sağlanmazsa aynı solukta kontrol davranışı değişebilir; AVAPS ise basıncı zaman içinde uyarlar. VAPS adı görüldüğünde uyarlamanın soluk içi mi soluklar arası mı olduğu belirlenmelidir.",
    src: [59, 60]
  },
  {
    id: "m-independent-lung", mode: "independent-lung", topic: "mod",
    q: "Bağımsız akciğer ventilasyonu (ILV) için hangisi doğrudur?",
    o: [
      "İki tarafa tek ayarla eşit yük veren ayrı bir zorunlu soluk modudur",
      "Asimetrik hastalıkta rutin ve kanıtı güçlü ilk seçenektir",
      "Mod algoritması değil, iki akciğeri ayrı yöneten stratejidir",
      "İki tarafın eğrileri birleşik tek eğri olarak yorumlanır"
    ],
    a: 2,
    ex: "ILV, farklı C/R veya kaçak nedeniyle tek ayarın iki tarafa farklı yük vermesi sorununu hedefleyen bir uygulama stratejisidir; ayrı bir zorunlu soluk algoritması değildir. Her tarafın eğri ve kaçak verileri ayrı yorumlanır; kanıt ve deneyim sınırlıdır.",
    src: [58]
  },
  {
    id: "e01", mode: null, topic: "ekran",
    q: "Sabit akımlı VC'de Ppeak artarken Pplat benzer kalıyorsa ilk düşünülecek mekanizma hangisidir?",
    o: [
      "Kompliyans azalması veya hava hapsi",
      "Kaçak ya da sensör/devre kompanzasyon sorunu",
      "PEEP veya VT ayarının artırılması",
      "Direnç artışı veya inspiratuvar akım artışı"
    ],
    a: 3,
    ex: "Ppeak–Pplat farkı akıma karşı harcanan basıncı yansıtır; Pplat değişmeden Ppeak artışı direnç veya akım artışını düşündürür. Tüp kıvrımı/ısırma, sekresyon, filtre, bronkospazm ve ayar değişikliği kontrol edilir.",
    src: [3]
  },
  {
    id: "e02", mode: null, topic: "ekran",
    q: "Sürücü basınç (driving pressure, ΔP) hangi bağıntıyla ve hangi koşulda anlamlıdır?",
    o: [
      "Ppeak − PEEPset; her solukta otomatik okunur",
      "Pplat − PEEPtotal; statik/pasif koşulda",
      "Ppeak − Pplat; sabit akımlı VC'de",
      "Pmean − PEEPset; spontan solukta"
    ],
    a: 1,
    ex: "ΔP = Pplat − PEEPtotal'dır ve statik ölçüm gerektirir; Ppeak−PEEP değildir. Pasif/statik bağlamda anlamlıdır ve evrensel tek kesim noktası yoktur.",
    src: [3, 4, 46]
  },
  {
    id: "e03", mode: null, topic: "ekran",
    q: "VTi ile VTe arasında belirgin fark var ve akım–hacim döngüsü kapanmıyor. İlk düşünülecek neden hangisidir?",
    o: [
      "Dinamik hiperinflasyon ve intrinsik PEEP",
      "Kompliyans azalmasına bağlı elastik yük",
      "Kaçak veya sensör/kompanzasyon sorunu",
      "Sabit akımlı VC'de akım açlığı"
    ],
    a: 2,
    ex: "VTi–VTe farkı ve kapanmayan döngü kaçak veya hacim ölçüm/kompanzasyon sorununu düşündürür. Kaf, bağlantı, devre ve bronkoplevral kaçak olasılığı kontrol edilir.",
    src: [5, 16]
  },
  {
    id: "e04", mode: null, topic: "ekran",
    q: "Ventile edilen hastada EtCO₂ belirgin biçimde düşüyor. İçerikle uyumlu yorum hangisidir?",
    o: [
      "Perfüzyon azalması, kaçak veya örnekleme sorunu da olabilir",
      "Her durumda hiperventilasyonun kesin göstergesidir",
      "PaCO₂'nin de aynı ölçüde düştüğünü kanıtlar",
      "Yalnızca ayarlı cihaz sıklığının fazla olduğunu gösterir"
    ],
    a: 0,
    ex: "EtCO₂ düşüşü yalnız hiperventilasyonu göstermez: dolaşım/perfüzyon azalması, ölü boşluk değişimi, kaçak veya örnekleme sorunu olabilir. Kan gazı ile EtCO₂ farkının sabit olduğu varsayılmaz.",
    src: [44]
  },
  {
    id: "e05", mode: null, topic: "ekran",
    q: "Ekranda görülen P0.1 değeri için hangisi doğrudur?",
    o: [
      "Solunum dürtüsüne yaklaşımdır; kas gücüyle birebir aynı değildir",
      "Diyaframın elektriksel aktivitesini μV cinsinden gösterir",
      "Araştırma eşikleri tüm cihazlarda otomatik tedavi kuralıdır",
      "Tam oklüzyonda ölçülen en yüksek inspiratuvar kuvvettir"
    ],
    a: 0,
    ex: "P0.1, hava yolu oklüdeyken inspiratuvar çabanın ilk 100 ms’sinde oluşan basınç düşüşüdür ve solunum dürtüsüne yaklaşım sağlar; kas gücü ve eforla birebir aynı değildir. Araştırmalarda kullanılan eşikler cihazdan bağımsız kesin tedavi eşikleri değildir.",
    src: [42]
  },
  {
    id: "a01", mode: null, topic: "asenkroni",
    q: "Basınç eğrisinde aşağı yönlü çentik ve ekspiratuvar akımda sapma görülüyor, ancak destekli soluk gelmiyor. Bu örüntü nedir?",
    o: [
      "Oto-tetikleme",
      "Geç çevrim",
      "Etkisiz çaba",
      "Ters tetikleme"
    ],
    a: 2,
    ex: "Etkisiz çabada hasta çabalar, basınçta çentik ve akımda sapma olabilir ama soluk gelmez. İntrinsik PEEP, zayıf efor, aşırı destek veya duyarsız tetikleme düşünülür; çözüm her durumda daha fazla sedasyon değildir.",
    src: [6, 7]
  },
  {
    id: "a02", mode: null, topic: "asenkroni",
    q: "Oto-tetikleme şüphesinde ilk yapılacak karşılaştırma hangisidir?",
    o: [
      "Ppeak ile Pplat değerleri",
      "Gerçek hasta sıklığı ile cihaz sıklığı",
      "Ayarlı VT ile ölçülen VTi",
      "EtCO₂ ile arteriyel PaCO₂"
    ],
    a: 1,
    ex: "Oto-tetiklemede hastanın çabası olmadan cihaz soluk başlatır; kaçak, devrede su, kalp kaynaklı titreşim ve aşırı hassas tetikleme neden olabilir. Önce gerçek hasta sıklığı ile cihaz sıklığı karşılaştırılır.",
    src: [6, 49]
  },
  {
    id: "a03", mode: null, topic: "asenkroni",
    q: "Sabit akımlı VC'de hastanın inspiratuvar talebi verilen akımı aşarsa (akım açlığı) basınç–zaman eğrisinde ne görülür?",
    o: [
      "Ekspiratuvar akım sonraki soluğa kadar sıfıra dönmez",
      "İnspirasyonun sonunda basınçta ek yükselme olur",
      "Kapnogram dalgası tabana geri dönmez",
      "İnspiratuvar basınç eğrisi içe doğru çöker"
    ],
    a: 3,
    ex: "Akım açlığında hastanın talebi verilen akımı aşar ve inspiratuvar basınç eğrisi içe çöker. Talebin ağrı, asidoz veya hipoksemi gibi nedenleri araştırılır; akım ve Ti ilişkisi değerlendirilir.",
    src: [7]
  },
  {
    id: "a04", mode: null, topic: "asenkroni",
    q: "Önce makine soluğu, ardından hastanın bağlantılı inspiratuvar çabası geliyor. Bu örüntü ve olası karışıklık hangisidir?",
    o: [
      "Erken çevrim; tetikleme gecikmesiyle karışabilir",
      "Etkisiz çaba; oto-tetiklemeyle karışır",
      "Ters tetikleme; çift tetiklemeyle karışabilir",
      "Geç çevrim; akım açlığıyla karışabilir"
    ],
    a: 2,
    ex: "Ters tetiklemede önce makine soluğu, ardından hastanın refleks/bağlantılı inspiratuvar çabası gelir; hasta tetikledi sanılarak sıradan çift tetiklemeyle karıştırılabilir. Gerektiğinde Edi/Pes ile ileri değerlendirme yapılır.",
    src: [7]
  },
  {
    id: "f01", mode: null, topic: "fizik",
    q: "Varsayımsal örnek: pasif hastada VT = 0,42 L, Pplat = 22 cmH₂O, PEEPtotal = 8 cmH₂O. Cstat kaçtır?",
    o: [
      "0,030 L/cmH₂O",
      "0,019 L/cmH₂O",
      "0,053 L/cmH₂O",
      "0,014 L/cmH₂O"
    ],
    a: 0,
    ex: "Cstat = VT / (Pplat − PEEPtotal) = 0,42 / 14 = 0,030 L/cmH₂O. Bu bir hesap örneğidir; normal değer veya hasta hedefi değildir.",
    src: [3]
  },
  {
    id: "f02", mode: null, topic: "fizik",
    q: "Aynı varsayımsal örnekte Ppeak = 30, Pplat = 22 cmH₂O ve sabit akım 0,5 L/s ise inspiratuvar direnç tahmini kaçtır?",
    o: [
      "8 cmH₂O·s/L",
      "44 cmH₂O·s/L",
      "60 cmH₂O·s/L",
      "16 cmH₂O·s/L"
    ],
    a: 3,
    ex: "R ≈ (Ppeak − Pplat) / akım = 8 / 0,5 = 16 cmH₂O·s/L; formül sabit akımlı VC içindir. Basınç farkını L/dk cinsinden akıma doğrudan bölmek hesabı yanlış yapar.",
    src: [3]
  },
  {
    id: "f03", mode: null, topic: "fizik",
    q: "Ölü boşluk varsayımsal olarak 150 mL sabitken 500 mL × 12/dk ile 250 mL × 24/dk soluma düzenleri için hangisi doğrudur?",
    o: [
      "Hem VE hem VA iki düzende eşittir",
      "VE eşittir (6 L/dk); VA 4,2 ve 2,4 L/dk'dır",
      "İkinci düzende hem VE hem VA daha yüksektir",
      "VE farklıdır; VA iki düzende de 4,2 L/dk'dır"
    ],
    a: 1,
    ex: "VE = VT × f iki düzende de 6 L/dk'dır; VA = (VT − VD) × f ise 4,2 ve 2,4 L/dk olur. Bu, hızlı yüzeyel solunumun neden verimsiz olabileceğini açıklar; gerçek VD hasta ve devreyle değişir.",
    src: [44]
  },
  {
    id: "f04", mode: null, topic: "fizik",
    q: "Doğrusal tek bölmeli modelde R = 10 cmH₂O·s/L ve C = 0,05 L/cmH₂O iken τ = 0,5 s'dir. R iki katına çıkarsa ne olur?",
    o: [
      "τ 0,25 s'ye iner; boşalma hızlanır",
      "τ 1 s olur; aynı Te'de daha çok gaz kalabilir",
      "τ değişmez; yalnızca C belirleyicidir",
      "τ 2 s olur; hava hapsi riski tümüyle ortadan kalkar"
    ],
    a: 1,
    ex: "τ = R × C olduğundan R iki katına çıkınca τ 1 saniye olur ve aynı ekspirasyon süresinde daha fazla gaz içeride kalabilir. Obstrüksiyonda heterojenlik tek bir τ ile açıklanamayabilir.",
    src: [4, 55]
  },
  {
    id: "k01", mode: null, topic: "klinik",
    q: "Erişkin ARDS'de mod seçimiyle ilgili içerikle uyumlu ifade hangisidir?",
    o: [
      "APRV, ARDS'de kanıtlanmış üstün standart moddur",
      "PC kullanıldığında barotravma gelişmez",
      "Rutin erişkin HFOV kullanımı önerilir",
      "Mod adından tek başına sağkalım çıkarılamaz"
    ],
    a: 3,
    ex: "ARDS'de VC-A/C, PC-A/C veya hacim hedefli adaptif basınç kullanılabilir; amaç hacim/basınç, efor ve gaz değişimini koruyucu sınırlarda tutmaktır ve mod adından sağkalım çıkarılamaz. 'ARDS=APRV' ve 'PC'de barotravma olmaz' ezberleri yanlıştır; rutin erişkin HFOV önerilmez.",
    src: [8, 14, 60]
  },
  {
    id: "k02", mode: null, topic: "klinik",
    q: "Ağır astımda invaziv ventilasyon altındaki hastada Ppeak çok yüksek, Pplat belirgin olarak daha düşük. Doğru yorum hangisidir?",
    o: [
      "Bu fark ağırlıklı olarak direnç yükünü düşündürür",
      "Elastik basınç da Ppeak kadar yüksek kabul edilir",
      "Kompliyans azalmasının kesin kanıtıdır",
      "Ölçüm hatasıdır; Pplat güvenle göz ardı edilir"
    ],
    a: 0,
    ex: "Ppeak–Pplat farkı direnç yükünü düşündürür; yalnız Ppeak'e bakarak akciğerin elastik basıncını aynı derecede yüksek varsaymak yanlıştır. Astımda Te, hava hapsi, VT ve Pplat birlikte izlenir.",
    src: [3, 13]
  },
  {
    id: "k03", mode: null, topic: "klinik",
    q: "AARC 2024 SBT kılavuzuna göre hangisi doğrudur?",
    o: [
      "SBT yalnızca desteksiz T-parçası ile yapılmalıdır",
      "Başarılı SBT ekstübasyon için tek başına yeterlidir",
      "SBT'ye hazır oluş için RSBI hesabı zorunlu değildir",
      "Deneme sırasında gerekirse FiO₂ artırılması önerilir"
    ],
    a: 2,
    ex: "AARC 2024'e göre SBT'ye hazır oluşu belirlemek için RSBI zorunlu değildir ve deneme PS ile veya olmadan yapılabilir; FiO₂ artırarak başarısızlığı maskelemek önerilmez. Ekstübasyon kararında ayrıca hava yolu koruması, öksürük/sekresyon ve üst hava yolu açıklığı değerlendirilir.",
    src: [11]
  },
  {
    id: "k04", mode: null, topic: "klinik",
    q: "Obez erişkin hastada yüksek Pplat ölçülüyor. İçerikle uyumlu yorum hangisidir?",
    o: [
      "Yüksek Pplat tamamen ve yalnızca akciğer sertliğini yansıtır",
      "VT, gerçek vücut ağırlığına göre artırılmalıdır",
      "Her obez hastaya aynı yüksek PEEP uygulanır",
      "Bir kısmı göğüs duvarı ve karın yükünden kaynaklanabilir"
    ],
    a: 3,
    ex: "Obezite veya yüksek karın basıncında yüksek plato basıncının bir kısmı göğüs duvarından kaynaklanabilir; Pes uygun teknikle plevral basınca yaklaşım sağlar. VT gerçek kiloya göre büyütülmez, erişkinde boy temelli PBW kullanılır.",
    src: [3, 37, 42]
  },
  {
    id: "p01", mode: null, topic: "pediatri",
    q: "PALICC-2'ye göre pediatrik ARDS'de konvansiyonel mod seçimi için hangisi doğrudur?",
    o: [
      "PC modu, VC'ye göre üstün bulunmuştur",
      "Bir modun üstünlüğü için yeterli sonuç kanıtı yoktur",
      "Erişkin ARDS mod önerileri aynen uygulanır",
      "HFOV, ilk basamak rutin mod olarak önerilir"
    ],
    a: 1,
    ex: "PALICC-2, belirli bir konvansiyonel modun diğerine tercih edilmesi için yeterli sonuç kanıtı olmadığını belirtir. Pediatrik öneriler kendi bağlamında yorumlanır; erişkin önerileri doğrudan taşınmaz.",
    src: [27]
  },
  {
    id: "p02", mode: null, topic: "pediatri",
    q: "Erişkin ARDSNet PBW formülü ve erişkin hacim bandının çocuk/yenidoğanda kullanımı için hangisi doğrudur?",
    o: [
      "Kilogram küçültülerek yenidoğana da uygulanır",
      "Yalnızca prematürelerde düzeltilerek kullanılır",
      "Otomatik uygulanmaz; yaşa özgü hedefler gerekir",
      "Cihazda mod bulunuyorsa her yaşta geçerlidir"
    ],
    a: 2,
    ex: "PBW formülü çocuk ve yenidoğana otomatik uygulanmaz; erişkin ARDS hedeflerini kilogram küçülterek yenidoğana taşımak doğru değildir. Neonatal sensör, kaçak ve yaşa özgü hedefler gerekir.",
    src: [47, 28, 50]
  },
  {
    id: "p03", mode: null, topic: "pediatri",
    q: "Küçük çocukta cihazın gösterdiği VT ile hastaya ulaşan hacim neden farklı olabilir?",
    o: [
      "Ölçüm yeri, devre kompliyansı ve kaçak",
      "Çocukta Boyle yasasının geçerli olmaması",
      "Pediatrik cihazlarda VTe ölçümünün olmaması",
      "Küçük hacimlerde kaçağın etkisinin ihmal edilmesi"
    ],
    a: 0,
    ex: "Ölçüm yeri, devrede gazın sıkışması ve kaçak, cihazda ölçülen VT ile hastaya ulaşan hacim arasında fark oluşturabilir. Devre kompliyansı kompanzasyonu ve sensör doğruluğu kontrol edilir. Sensörün eklediği ölü boşluk ise aynı VT’de etkili alveoler ventilasyonu azaltabilir; bu, hacim ölçüm hatasından farklıdır.",
    src: [50]
  }
];
