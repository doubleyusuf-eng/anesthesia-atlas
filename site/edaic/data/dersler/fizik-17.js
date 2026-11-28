VERI.sorular = VERI.sorular || {};
VERI.sorular['fk17-1'] = {
  "no": 1,
  "kok": "Cihaz arızası ve güvenlik sınırları",
  "kagit": "Paper A · Fizik, Bölüm 17",
  "kaynak": "[[K6 s. 291–294]]",
  "onermeler": [
    {
      "t": "Servis tarihi geçen bir cihaz, çalışıyorsa bir sonraki bakıma kadar kullanılabilir.",
      "d": false,
      "n": "Cihaz bakım tamamlanıncaya kadar kullanımdan çekilir. [[K6 s. 291]]"
    },
    {
      "t": "Ayrı bir yerdeki oksijen tüp manifoldu, ana kaynağın arızasına karşı yedek sağlar.",
      "d": true,
      "n": "Vakum yalıtımlı evaporatörün kendisi tek hata noktasıdır; çoğu hastane bu yüzden ayrı konumda bir tüp manifoldu bulundurur. [[K6 s. 293]]"
    },
    {
      "t": "Pompanın katı akış sınırı, uyarı onaylanarak aşılabilir.",
      "d": false,
      "n": "Katı sınır, ilaç kütüphanesindeki veriye göre izin verilen en yüksek akışı kısıtlar. [[K6 s. 294]]"
    },
    {
      "t": "Klinik mühendisinin arızayı değerlendirebilmesi için arızanın ortaya çıktığı koşullar bildirilir.",
      "d": true,
      "n": "Arıza ayrıntıları uygun form veya bildirim sistemiyle klinik mühendisliğine iletilir. [[K6 s. 291]]"
    },
    {
      "t": "Bir cihazı kullanma eğitiminin verilmesi, yeterlik değerlendirmesinin yerini tutar.",
      "d": false,
      "n": "Yetkin eğitici, personele eğitim verdikten sonra cihazı doğru kullanabildiğini değerlendirir. [[K6 s. 292]]"
    }
  ]
};
VERI.sorular['fk17-2'] = {
  "no": 2,
  "kok": "Ölçüm sonuçlarını yorumlama",
  "kagit": "Paper A · Fizik, Bölüm 17",
  "kaynak": "[[K6 s. 295–296]]",
  "onermeler": [
    {
      "t": "Tekrarlanan ölçümler birbirine yakınken ortalamaları referans değerden uzak olabilir.",
      "d": true,
      "n": "Küçük saçılma yüksek kesinliği gösterir, buna sistematik hata eşlik edebilir. [[K6 s. 295]]"
    },
    {
      "t": "Ortam ışığını algılayan bir fotodedektörde sıfır kayması görülebilir.",
      "d": true,
      "n": "Ortam ışığı, girişten bağımsız sabit bir çıkış farkına yol açabilir. [[K6 s. 296]]"
    },
    {
      "t": "Duyarlılık kaymasında mutlak hata, giriş büyüklüğünden bağımsızdır.",
      "d": false,
      "n": "Duyarlılık kaymasının oluşturduğu hata giriş büyüklüğüyle orantılıdır. [[K6 s. 296]]"
    },
    {
      "t": "Gaz sensörünün kalibrasyonunda CO₂ derişimi bilinen bir karışım kullanılabilir.",
      "d": true,
      "n": "Kitaptaki referans karışım tam %5 CO₂ içerir. [[K6 s. 296]]"
    },
    {
      "t": "Aynı sensörde sıfır kayması ile duyarlılık kaymasının birlikte görülmesi beklenmez.",
      "d": false,
      "n": "İki kayma sıklıkla birlikte görülür. [[K6 s. 296]]"
    }
  ]
};
VERI.sorular['fk17-3'] = {
  "no": 3,
  "kok": "Dekontaminasyon ve yeniden kullanım",
  "kagit": "Paper A · Fizik, Bölüm 17",
  "kaynak": "[[K6 s. 297–300]]",
  "onermeler": [
    {
      "t": "Mukozaya temas eden endoskopta tek başına temizlik asgari işlemi karşılar.",
      "d": false,
      "n": "Yarı kritik endoskop için temizliğin ardından en az yüksek düzey dezenfeksiyon gerekir. [[K6 s. 297]]"
    },
    {
      "t": "Kaynatma, tüm mikroorganizmaların yok edilmesini güvenceye almaz.",
      "d": true,
      "n": "Kitap bu nedenle kaynatmayı sterilizasyon yöntemi saymaz. [[K6 s. 298]]"
    },
    {
      "t": "Gama ışınlarıyla steril edilen enjektör radyoaktif hâle gelmez.",
      "d": true,
      "n": "Işınlanan malzeme radyoaktif olmaz, korunma gereği sürekli ışın yayan kaynaktan doğar. [[K6 s. 299]]"
    },
    {
      "t": "Tek hasta için çoklu kullanım işareti aynı hastada birden çok işleme izin verir.",
      "d": true,
      "n": "Bu işaret yeniden kullanımı aynı hastayla sınırlar. [[K6 s. 300]]"
    },
    {
      "t": "Prionlar çoğu sterilizasyon işlemine dirençlidir.",
      "d": true,
      "n": "Kitap prionları çoğu sterilizasyon işlemine dirençli sayar; küçüklükleri paslanmaz çelik çukurcuklarına yerleşmelerini de sağlar. [[K6 s. 299]]"
    }
  ]
};

SAYFALAR['dersler/fizik/17'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 17',
  baslik: 'Ekipman yönetimi: kalibrasyon, temizlik ve sterilizasyon',
  lede: 'Bir cihazın güvenli kullanımı, satın alma kararından son kullanıma kadar bakım, ölçüm güvenilirliği ve enfeksiyon kontrolüne bağlıdır. [[K6 s. 290–292]] [[K6 s. 296–300]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste"><button type="button" data-scroll="fk17-yonetim">Bir cihazın kullanım ömrü</button>
<button type="button" data-scroll="fk17-guvenlik">Tek arıza hastaya nasıl ulaşır?</button>
<button type="button" data-scroll="fk17-kalibrasyon">Kalibrasyon ve ölçüm hatası</button>
<button type="button" data-scroll="fk17-temizlik">Temas yerine göre dekontaminasyon</button>
<button type="button" data-scroll="fk17-sterilizasyon">Sterilizasyon yöntemini seçmek</button>
<button type="button" data-scroll="fk17-ambalaj">Yeniden kullanım ve ambalaj işaretleri</button>
<button type="button" data-scroll="fk17-p1">Part I</button>
<button type="button" data-scroll="fk17-p2">Part II</button>
<button type="button" data-scroll="fk17-ozet">Özet</button></nav>
<section class="wrap blk ders-sec" id="fk17-yonetim">
<h2>Bir cihazın kullanım ömrü</h2><p class="intro">İyi ekipman uygulaması, satın almadan elden çıkarmaya kadar cihazın bütün yaşam döngüsü boyunca güvenli ve güvenilir kullanımını sağlar. [[K6 s. 290]]</p>
<div class="viz"><div class="viz-head"><h3>Arızadan yeniden kullanıma</h3></div><div data-viz="fk17_ariza"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Anestezistler eskiden yeni düzenekleri anestezi odasında veya ameliyathanede denerdi. [[K6 s. 290]] Bugün kullanılan bazı solunum sistemleri böyle ortaya çıktı. [[K6 s. 290]] Protokollerin ve hukuki sorumlulukların ağırlık kazanmasıyla geliştirme işi büyük ölçüde sanayinin araştırma birimlerine geçti. [[K6 s. 290]]</p>
<h3>Satın almadan hizmete</h3><ul>
<li><b>Standardizasyon.</b> Anestezide ve diğer alanlarda cihaz kullanımı arttıkça büyük hastaneler, örneğin tek tip enjektör pompası temini için ihaleye çıkabilir. [[K6 s. 290]] Aynı tip cihazla çalışmak eğitimi ve bakımı kolaylaştırabilir, güvenlik ve maliyet açısından yarar sağlayabilir. [[K6 s. 290]]</li>
<li><b>Şartname ve deneme.</b> İstenen özellikleri tanımlayın, üreticilerden aday cihazları isteyin ve kısa listeyi önceden belirlenen ölçütlerle deneyin. [[K6 s. 292]] Bakım, servis ve kalibrasyonun sıklığını ve niteliğini karşılaştırın. [[K6 s. 292]]</li>
<li><b>Gerçek maliyet.</b> Fiyatı performansla birlikte değerlendirin. [[K6 s. 292]] Kullanım ömrünü, işletme giderlerini, cihaza özgü sarfları, yedek parça, ikame donanım ve sarf bulunabilirliğini hesaba katın. [[K6 s. 292]] Amaç kurum için uygun mali koşullarla en iyi klinik cihazı edinmektir. [[K6 s. 292]]</li>
<li><b>Yetki ve yeterlik.</b> Yerel kurallar ulusal veya uluslararası protokollere uymalıdır. [[K6 s. 290]] Protokol, cihazı kimin, ne zaman ve nasıl kullanabileceğini belirtir. [[K6 s. 291]] Yetkin bir eğitici uygulamayı öğretir ve değerlendirir. [[K6 s. 292]] Eğitimi alanlar kaydedilir, eğitim belgelendirilir ve uygun aralıklarla güncellenip gözden geçirilir. [[K6 s. 292]]</li></ul>
<h3>Hizmette izlem</h3><ul>
<li><b>Koruyucu bakım.</b> Klinik mühendisliği, karmaşık veya kritik cihazlarda ise üretici, belirli aralıklarla servis yapar. [[K6 s. 291]] Cihaza kimlik numarası verilir, servis kaydı tutulur ve bakım tarihi geçmiş cihaz servis tamamlanana kadar kullanım dışına alınır. [[K6 s. 291]] Bakımın aksaması arıza, cihazın gerektiğinde bulunamaması ve hasta ya da çalışanın zarar görmesi riskini artırır. [[K6 s. 291]]</li>
<li><b>Elektrik güvenliği.</b> Rutin serviste klinik mühendisliği veya üretici elektrik güvenliğini ölçer. [[K6 s. 291]] Kitap, Birleşik Krallık’ta iş ekipmanının sağlanması ve kullanımına ilişkin düzenlemeyi (1988) ve İş Sağlığı ve Güvenliği Yasası’nı (1974) örnek verir. [[K6 s. 291]] Bu kapsam, personel odasındaki su ısıtıcısı gibi klinik dışı elektrikli cihazları da içerir. [[K6 s. 291]]</li>
<li><b>Kalibrasyon.</b> Bazı cihazlar için rutin serviste kalibrasyon yeterliyken bazılarında klinik personelin her gün veya her kullanımdan önce kalibrasyon yapması gerekebilir. [[K6 s. 291]] Sıklığı üretici talimatı ve yerel protokol belirler. [[K6 s. 300]]</li>
<li><b>Veri güvenliği.</b> Her cihazda üretilen verinin nasıl yönetildiği, erişimin nasıl korunduğu ve veri bütünlüğünün nasıl sağlandığı değerlendirilir. [[K6 s. 292]] Hasta gizliliği korunmalıdır. [[K6 s. 292]]</li>
<li><b>Uyarı ve geri çağırma.</b> Kurumun tıbbi cihaz güvenliği sorumlusu (MDSO) güvenli kullanımı destekler ve düzenleyici kuruluşlarla bağlantıyı sağlar. [[K6 s. 292]] MHRA (ilaç ve sağlık ürünleri düzenleme kurumu) ve MIMS (aylık tıbbi uzmanlıklar indeksi) gibi kuruluşlar olası sorunları ve kullanımdan çekilen cihazları klinisyenlere ve mühendislere bildirir. [[K6 s. 292]]</li></ul>
<p><b>Ömür sonunda</b> arıza olasılığı artıp güvenilirlik azalabileceğinden tasarım ömrünü aşmış cihaz tercihen kalıcı olarak hizmetten çekilir. [[K6 s. 292]] Bertaraf sırasında çevre ve dekontaminasyon kurallarına uyulur. [[K6 s. 292]] Geri dönüşüm veya başka ülkede yeniden kullanım mümkün olabilir. [[K6 s. 292]] Yeniden kullanılacak cihazda saklanan veriler için uygun düzenleme yapılmalıdır. [[K6 s. 292]]</p>
<h3>İki kaydı birbirinden ayırın</h3><p><b>Cihaz kaydı</b> servis ve arıza geçmişini izlemek içindir. [[K6 s. 291]] <b>Eğitim kaydı</b> ise o cihazı kullanma eğitimi alan kişileri gösterir. [[K6 s. 292]] İlki cihazın teknik durumuna, ikincisi cihazı kullanacak personelin hazırlığına ilişkin soruyu yanıtlar. [[K6 s. 291–292]] Cihaz türü standartlaştırılsa bile yetkin bir eğiticinin kullanımı öğretmesi ve personeli değerlendirmesi gerekir. [[K6 s. 290–292]]</p>
<h3>Servis dosyasından üç karar</h3><dl class="fk17-vaka">
<dt>Pompanın üzerindeki kimlik numarası okunuyor, bakım tarihi geçmiş. Çalıştırma denemesi yeterli mi?</dt>
<dd>Kararı cihazın o anda çalışması belirlemez. [[K6 s. 291]] Klinik mühendisliğinin veya ilgili üreticinin planlı servisi tamamlaması gerekir. [[K6 s. 291]] Cihazın üzerindeki kimlik numarası ve tutulan servis kaydı, hangi pompanın bakımdan geçtiğini izlemeyi sağlar. [[K6 s. 291]]</dd>
<dt>Hemşire arızayı yalnızca “pompa çalışmadı” diye bildirdi. Bildirime ne eklenmeli?</dt>
<dd>Mühendisin sorunu değerlendirebilmesi için arızanın ortaya çıktığı koşullar ve ilgili ayrıntılar kaydedilmelidir. [[K6 s. 291]] Bildirim, cihazı hizmetten çekmenin yerini tutmaz. [[K6 s. 291]] Üreticiye gönderme ve elden çıkarma da olası sonuçlardır. [[K6 s. 291]]</dd>
<dt>Tedarikçi düşük bir satın alma bedeli önerdi. Teklifleri neye göre karşılaştırırsınız?</dt>
<dd>Kısa listedeki cihazların istenen klinik özelliklerini aynı ölçütlerle sınayın. [[K6 s. 292]] Her teklif için yalnız satın alma bedelini değil, cihaz ömrü boyunca gerekecek sarf ve servis giderlerini de değerlendirin. [[K6 s. 292]] Parçanın veya ikame cihazın temin edilebilirliği de seçimin bir parçasıdır. [[K6 s. 292]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="fk17-guvenlik">
<h2>Tek arıza hastaya nasıl ulaşır?</h2><p class="intro">Bir infüzyon pompasının basınç sensörü bozulursa infüzyonun sürmesi ekstravazasyon hasarına, durması ise anestezist fark etmezse hastada farkındalığa yol açabilir. [[K6 s. 293]]</p>
<div class="viz"><div class="viz-head"><h3>Pompanın akış sınırını aşmayı deneyin</h3></div><div data-viz="fk17_pompa"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Arızası yaralanma veya ölümle sonuçlanabilen sistem güvenlik açısından kritiktir. [[K6 s. 293]] Özellikle anestezi ve yoğun bakımdakiler olmak üzere hastane cihazlarının çoğu bu kapsamdadır. [[K6 s. 293]] Tasarım hem ağır arızayı önlemeyi hem de arıza olduğunda sistemi zararı en aza indiren bir duruma geçirmeyi hedefler. [[K6 s. 293]]</p>
<h3>Oksijen kaynağında iki ayrı soru</h3><ol>
<li><b>Tank boşalırsa kim fark eder?</b> Hastane oksijeni genellikle vakum yalıtımlı evaporatörden (VIE) sağlanır. [[K6 s. 293]] Kalan oksijeni tartan düzenek bozulursa boş tank gözden kaçabilir ve hastaların yaşamı tehlikeye girebilir. [[K6 s. 293]] Miktarı birbirinden bağımsız iki cihazla izlemek, kritik sistemi koruyan çoklu yedekliliğe (multiple redundancy) örnektir. [[K6 s. 293]]</li>
<li><b>Evaporatör çalışmazsa gaz nereden gelir?</b> İki ölçer de sağlam olsa kaynağın kendisi tek hata noktası olarak kalır. [[K6 s. 293]] Çoğu hastane farklı bir fiziksel konumda oksijen tüplerine bağlı ayrı bir manifold bulundurur. [[K6 s. 293]]</li></ol>
<p>Hava yolu arabasında iki laringoskop bulundurma ve uçağın iki pilotla kalkması aynı yedeklilik ilkesine örnektir. [[K6 s. 293]] Uçaklar, otomobiller, asansörler ve trafik ışıkları da arızası insan yaşamını tehlikeye sokabilen sistemlerdir. [[K6 s. 293–294]] Klinik örnekler arasında defibrilatör, infüzyon pompası, anestezi cihazı, kalp kapağı ve ventilatör bulunur. [[K6 s. 294]]</p>
<p><b>Tasarımı veya kullanımı değerlendirirken</b> arızanın sonucunu, hangi arıza biçiminin en az zarara yol açacağını ve güvenlik payını sorgulayın. [[K6 s. 293]] Güvenilirliği değerlendirirken işlevi, malzemeyi, üretim kalitesini ve sarf malzemelerini birlikte düşünün. [[K6 s. 293]]</p>
<div class="viz"><div class="viz-head"><h3>Oksijen kaynağındaki arızayı seçin</h3></div><div data-viz="fk17_oksijen"></div><p class="viz-cap" aria-live="polite"></p></div>
<p><b>Bir arızada hangi zarar daha olası?</b> Basınç sensörü örneğinde pompanın çalışmaya devam etmesi ile kendiliğinden durması farklı klinik sonuçlar doğurur. [[K6 s. 293]] Tasarımcı hangi sonucun hasta için daha az zararlı olacağını, kullanıcı ise cihaz arızalandığında bunun hastayı nasıl etkileyeceğini düşünmelidir. [[K6 s. 293]] Burada farkındalık riski, infüzyonun durduğunun anestezistin dikkatinden kaçması koşuluna bağlıdır. [[K6 s. 293]]</p>
<h3>Yedekleme ile sınır koyma hangi hataları karşılar?</h3><dl class="fk17-vaka">
<dt>Yedek donanımın bağımsızlığı</dt><dd>Tankı tartan düzenekteki bir arıza, kalan miktarın yanlış değerlendirilmesine ve oksijenin haber verilmeden tükenmesine yol açabilir. [[K6 s. 293]] İkinci ölçerin görevi bu bilginin tek bir cihaza bağlı kalmasını önlemektir. [[K6 s. 293]] Asıl tehlike evaporatörün kendisinden kaynaklandığında ise yedek ölçer oksijen sağlayamaz. [[K6 s. 293]] Bu kez güvenlik, ayrı konumdaki tüp manifolduna dayanır. [[K6 s. 293]]</dd>
<dt>Pompa yazılımının hangi kararı kullanıcıya bıraktığı</dt><dd>Pompanın ilaç kütüphanesi katı sınır için en yüksek akış hızını tanımlar ve yazılım bu değerin aşılmasını engeller. [[K6 s. 294]] Yumuşak sınırda ise bir uyarı vardır ve kullanıcı bu uyarıyı geçerek sınırın üzerinde bir akış seçebilir. [[K6 s. 294]] Bu iki sınır pompanın çalışma aralığını tanımlamaya yardım eder. [[K6 s. 294]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="fk17-kalibrasyon">
<h2>Kalibrasyon ve ölçüm hatası</h2><p class="intro">Aynı büyüklüğü tekrar tekrar ölçerken iki ayrı soruyu yanıtlarız. [[K6 s. 295]] Ortalama referansa ne kadar yakın ve ölçümler birbirine ne kadar yakın? [[K6 s. 295]]</p>
<div class="viz"><div class="viz-head"><h3>Okçunun hedefinde doğruluk ve kesinlik</h3></div><div data-viz="fk17_hedef"></div><p class="viz-cap" aria-live="polite"></p></div>
<p><b>Doğruluk</b> sistematik hatayı yansıtır. [[K6 s. 295]] Tekrarlanan ölçümlerin ortalaması gerçek değere yakınsa tek tek ölçümler geniş bir aralığa dağılsa da ölçüm doğrudur. [[K6 s. 295]] Gerçek değer önceden bilinir veya bir referans yöntemle belirlenir. [[K6 s. 295]] <b>Kesinlik</b> rastgele hatayı yansıtır. [[K6 s. 295]] Okların hedef merkezinden uzakta ama birbirine çok yakın toplanması, kesinliği yüksek ve doğruluğu düşük ölçüme karşılık gelir. [[K6 s. 295]]</p>
<h3>Giriş değiştiğinde hata nasıl davranır?</h3><div class="viz fk17-kayma"><div data-viz="fk17_kayma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kesikli çizgi referans yanıtı, düz çizgi kaymış yanıtı gösterir. [[K6 s. 296]] Eksenler ve kaydırıcı nitel karşılaştırma içindir.</p></div>
<ul><li><b>Duyarlılık kayması.</b> Giriş arttıkça hata onunla orantılı büyür. [[K6 s. 296]] Örneğin termistör içeren köprü devresinin besleme gerilimi değişebilir. [[K6 s. 296]] Kitap bu kaymanın ölçüm aralığı boyunca doğruluğu ve kesinliği azalttığını belirtir. [[K6 s. 296]]</li>
<li><b>Sıfır kayması.</b> Fotodedektörün ortam ışığını algılaması gibi bir nedenle çıkış bütün giriş değerlerinde aynı miktarda kayabilir. [[K6 s. 296]] Bu durumda yalnız doğruluk azalır. [[K6 s. 296]] Sıfır ve duyarlılık kaymaları sıklıkla birlikte görülür. [[K6 s. 296]]</li></ul>
<p><b>Referansla ayar.</b> Kalibrasyon ölçüm sistemini bu değişimlere göre ayarlar. [[K6 s. 296]] Örneğin gaz sensörüne derişimi tam %5 olan bir CO₂ karışımı sunulur. [[K6 s. 296]] Çoğu cihazda kalibrasyon kipinde alınan bu ölçüm, daha sonra bilinmeyen değerleri hesaplarken kullanılan sinyal işlemeyi düzeltir. [[K6 s. 296]]</p>
<p>Bazı sensörlerin ölçümü kullanım ömrü boyunca fiziksel değişimlerden etkilenmez ve üretim sırasındaki tek kalibrasyon yeterli olabilir. [[K6 s. 296]] Kitap puls oksimetre probu ve tek kullanımlık basınç transdüserini örnek verir. [[K6 s. 296]] Daha sık karşılaşılan durum sensör özelliklerinin zamanla değişmesidir. [[K6 s. 296]]</p>
<h3>Ölçümü okuyun</h3><dl class="fk17-vaka">
<dt>Aynı gaz karışımında okumalar birbirine çok yakın. Tek başına bu gözlem ne söyler?</dt>
<dd>Yakın sonuçlar, tekrarlanan ölçümlerde rastgele hatanın küçük olduğunu düşündürür. [[K6 s. 295]] Doğruluğu değerlendirmek için ortalamayı derişimi bilinen karışımın değeriyle karşılaştırmak gerekir. [[K6 s. 295–296]] Ortalamanın referanstan uzak çıkması, birbirine çok yakın okumalarla da mümkündür. [[K6 s. 295]]</dd>
<dt>Ölçülen giriş büyüdüğünde hata da büyüyor. Grafikte neye bakarsınız?</dt>
<dd>Aynı giriş için referans ve sensör yanıtları arasındaki düşey uzaklığı izleyin. [[K6 s. 296]] Duyarlılık kaymasında yanıtın eğimi değişir ve fark giriş büyüklüğüne bağlıdır. [[K6 s. 296]] Sıfır kaymasında başlangıçtan itibaren bir fark vardır ve girişin artırılması bu farkı değiştirmez. [[K6 s. 296]] Her iki değişim birden görüldüğünde başlangıçtaki sapmaya eğim değişikliği eklenir. [[K6 s. 296]]</dd>
<dt>Kalibrasyon kipinde referansı ölçtükten sonra ne değişir?</dt>
<dd>Bilinen derişimin ölçümü cihaz için bir dayanak sağlar. [[K6 s. 296]] Cihaz sonraki ölçümlerde bilinmeyen derişimi bildirirken sinyali bu kalibrasyonu dikkate alarak işler. [[K6 s. 296]] Üretimde yapılan ayarın yeterli olup olmadığı sensörün özelliklerinin kullanım ömrü boyunca değişip değişmemesine bağlıdır. [[K6 s. 296]]</dd></dl>
<div class="note plain"><b>Atlas notu.</b> Kitap duyarlılık kaymasının kesinliği de azalttığını söyler. [[K6 s. 296]] Doğrusu, sabit bir girişte sabit kalan bir eğim hatası tek başına tekrarlı okumaların saçılmasını artırmak zorunda değildir.</div>
</section>
<section class="wrap blk ders-sec" id="fk17-temizlik">
<h2>Temas yerine göre dekontaminasyon</h2><p class="intro">Philadelphia’da Earl Spaulding, 1939’da yeniden kullanılacak malzemelerin temas yerine göre sınıflandırılmasını önerdi. [[K6 s. 296]] Daha sonra geliştirdiği bu ölçütleri FDA da kullanır. [[K6 s. 296]]</p>
<div class="viz"><div class="viz-head"><h3>Temas yerini seçin, gereken asgari işlemi izleyin</h3></div><div data-viz="fk17_temas"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul><li><b>Kritik olmayan malzeme.</b> Mukoza yerine sağlam deriye temas eder. [[K6 s. 297]] Deri çoğu mikroorganizmaya karşı etkili bir engel oluşturduğundan sterilite şart değildir. [[K6 s. 297]] Hasta bakımında kullanılan tansiyon manşonu, yürüme yardımcısı ve hasta kontrollü analjezi pompası bu gruptadır. [[K6 s. 297]] Yatak korkuluğu, zemin ve cihaz kasası gibi çevresel yüzeyler ikincil bulaş zincirinde bir halka olabilir. [[K6 s. 297]]</li>
<li><b>Yarı kritik malzeme.</b> Endoskop gibi mukozaya temas eden araçlar temizlenir ve ardından yüksek düzey dezenfeksiyon uygulanır. [[K6 s. 297]] Bazı durumlarda sterilizasyon da gerekebilir. [[K6 s. 297]]</li>
<li><b>Kritik malzeme.</b> Deriyi delen veya steril vücut boşluğuna giren cerrahi aletler ve implantlarda herhangi bir mikroorganizma bulaş açısından yüksek risk oluşturur. [[K6 s. 297]] Yeniden kullanılacak kritik alet her kullanım arasında temizlenip steril edilir. [[K6 s. 297]]</li></ul>
<h3>Temizlik neyi uzaklaştırır, dezenfeksiyon neyi öldürür?</h3>
<p><b>Temizlik</b> bütün yabancı maddelerin uzaklaştırılmasıdır. [[K6 s. 297]] Genellikle su, deterjan ve mekanik etki birlikte kullanılır. [[K6 s. 297]] Tıbbi yıkama makinesi veya ultrasonik banyo kullanılabilir. [[K6 s. 297]] Hassas aletler ya da mekanik yıkama olanağının bulunmadığı durumlar için elle temizlik tercih edilir. [[K6 s. 297–298]]</p>
<p><b>Dezenfeksiyon</b> patojenleri yok etmeyi amaçlar ve mikroorganizmaların çoğunu öldürür. [[K6 s. 297–298]] Etki kapsamı kullanılan düzeye bağlıdır. [[K6 s. 298]]</p>
<ul><li><b>Düşük düzey.</b> Tüberküloz etkeni dışındaki vejetatif bakterilere, bazı mantar ve virüslere etkilidir, endosporları öldürmez. [[K6 s. 298]] Kitaptaki örnekler klorheksidin, %70 alkol ve sodyum hipoklorittir. [[K6 s. 298]]</li>
<li><b>Yüksek düzey.</b> Vejetatif bakterileri, mantarları ve virüsleri öldürür, ancak tüm endosporları ortadan kaldırmaz. [[K6 s. 298]] Yeterince uzun temas sterilizasyon sağlayabilir. [[K6 s. 298]] Glutaraldehit ve perasetik asit bu gruba örnektir. [[K6 s. 298]]</li></ul>
<h3>Üç malzemeyi yeniden kullanıma hazırlayın</h3><dl class="fk17-vaka">
<dt>Tansiyon manşonu ile yatak korkuluğu aynı grupta olabilir mi?</dt><dd>Manşon hastanın sağlam derisine değer ve hasta bakım malzemesidir. [[K6 s. 297]] Korkuluk ise çevresel yüzeydir ve ikincil bulaşa aracılık edebilir. [[K6 s. 297]] İkisi de kritik olmayan gruba girer, temizlenmeleri gerekir ve duruma göre düşük düzey dezenfeksiyon eklenebilir. [[K6 s. 297]]</dd>
<dt>Muayenede mukozaya değen endoskop yıkandı. Asgari işlem tamamlandı mı?</dt><dd>Yıkama yabancı maddeleri uzaklaştırır. [[K6 s. 297]] Endoskop mukozaya temas ettiği için temizlikten sonra yüksek düzey dezenfeksiyon gerekir. [[K6 s. 297]] Bu düzeyde mantar ve virüsler öldürülürken bazı endosporlar canlı kalabilir. [[K6 s. 298]]</dd>
<dt>Cerrahi alet bir sonraki işlemde steril bir boşluğa girecek. Hangi basamak değişir?</dt><dd>Temizlik ilk basamak olarak kalır. [[K6 s. 297]] Ardından sterilizasyon gerekir, çünkü kritik malzeme üzerinde herhangi bir mikroorganizmanın kalması bile enfeksiyonun iletilmesi açısından yüksek risk taşır. [[K6 s. 297]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="fk17-sterilizasyon">
<h2>Sterilizasyon yöntemini seçmek</h2><p class="intro">Sterilizasyon bakteriler, virüsler, sporlar ve mantarlar dahil mikrobiyal yaşamın bütün biçimlerini yok eder. [[K6 s. 298]] Kaynatma ve aleve tutma tüm mikroorganizmaları öldürmediğinden bu tanımı karşılamaz. [[K6 s. 298]]</p>
<div class="viz"><div class="viz-head"><h3>Otoklav kesitinde suyu, buharı ve kapalı hazneyi bulun</h3></div><div data-viz="fk17_otoklav"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul><li><b>Basınçlı buhar.</b> Otoklavda kapalı sistemde kaynayan sudan yaklaşık 35 psi (241 kPa) basınçta, yaklaşık 137 °C buhar elde edilir. [[K6 s. 298]] Etkili, ucuz ve toksik olmayan bu yöntem tozlar, merhemler, yağlar ve ısıya veya neme duyarlı cihazlar için uygun değildir. [[K6 s. 298]]</li>
<li><b>Kuru sıcak hava.</b> Etüvde 140–180 °C’ye ulaşılır ve işlem 3 saate kadar sürebilir. [[K6 s. 298]] Toz, yağ ve cam için kullanılabilir, paslanmayı ve korozyonu hızlandırmaz. [[K6 s. 298]] İşlem uzundur ve yüksek sıcaklık bazı cihazlara zarar verebilir. [[K6 s. 298]]</li>
<li><b>Gaz.</b> Kitap, etilen oksit (ETO) ve hidrojen peroksit gaz plazmasını bu başlıkta sayar. [[K6 s. 298]] Sanayide yaygın kullanılan ETO, 50–60 °C’de kauçuk ve plastiklere zarar vermeden uygulanabilir. [[K6 s. 298]] ETO çok toksik ve patlayıcı olduğundan işlemden sonra gaz giderme (de-gassing) yapılmalıdır. [[K6 s. 298]] Sürecin tamamlanması günler alabilir. [[K6 s. 298]]</li>
<li><b>Gama ışınları.</b> Tek kullanımlık enjektörler, iğneler ve intravenöz setler sıklıkla gama ışınlarıyla steril edilir. [[K6 s. 299]] Malzeme radyoaktif hâle gelmez, ancak çalışanları korumak için güçlü zırhlama gerekir. [[K6 s. 299]] Saklanması gereken radyoizotop, genellikle kobalt-60, sürekli gama ışını yayar ve kapatılamaz. [[K6 s. 299]]</li></ul>
<h3>Prionlar neden ayrı değerlendirilir?</h3><p>Prionlar bulaşabilir süngerimsi ensefalopatilere yol açan küçük proteinlerdir. [[K6 s. 299]] Bu gruptaki varyant Creutzfeldt–Jakob hastalığı (vCJD) özellikle kaygı uyandırmıştır. [[K6 s. 299]] Prionlar çoğu sterilizasyon işlemine dirençlidir ve küçüklükleri nedeniyle paslanmaz çeliğin yüzeyindeki çukurcuklara yerleşebilir. [[K6 s. 299]]</p>
<p>Prion yoğunluğu en yüksek olan beyin, omurilik ve gözün arka bölümüne değen yeniden kullanılabilir aletlere özel dikkat gerekir. [[K6 s. 299]] vCJD nedeniyle ölen hastaların otopsilerinde bademcik, apendiks, dalak ve gastrointestinal lenf düğümlerinde de yüksek düzeyler bulunmuştur. [[K6 s. 299]] Buna karşılık 63.007 anonim bademcik örneğini inceleyen kesitsel çalışmada vCJD prionu saptanmaması, toplumda hastalığın son derece seyrek olabileceğini düşündürür. [[K6 s. 299]]</p>
<p><b>Doku bulgusunu toplum sıklığından ayırın.</b> Otopsi bulgusu hastalık nedeniyle ölen kişilerin hangi dokularında yüksek prion düzeyi bulunabileceğini gösterir. [[K6 s. 299]] Anonim bademcik örneklerinin incelenmesi ise toplumda bu bulguyla ne sıklıkta karşılaşılabileceği sorusuna yöneliktir. [[K6 s. 299]] Geniş örneklemde pozitif sonuç çıkmaması, riskli dokularla temas eden yeniden kullanılabilir aletlere özel dikkat gösterilmesi gereğiyle birlikte değerlendirilir. [[K6 s. 299]]</p>
<h3>Malzeme ve yöntemi eşleştirin</h3><dl class="fk17-vaka">
<dt>Toz veya yağ için hangi ısı yöntemi düşünülebilir?</dt><dd>Kitap kuru sıcak havayı her iki malzeme için de seçenek olarak verir. [[K6 s. 298]] Basınçlı buhar etkili bir yöntem olsa da tozları, yağları ve merhemleri bu yöntemle steril etmek mümkün değildir. [[K6 s. 298]] Kuru sıcak seçildiğinde ise uzun işlem süresi ve ekipmanın ısıyla zarar görebilmesi hesaba katılmalıdır. [[K6 s. 298]]</dd>
<dt>Plastik ve kauçuk için ETO seçildiğinde işlem neden uzun sürebilir?</dt><dd>ETO bu malzemeleri bozmadan steril edebilir, ancak sterilizasyon bittiğinde gazın uzaklaşması için ek süre gerekir. [[K6 s. 298]] Güvenlik açısından belirleyici olan gazın yüksek toksisitesi ve patlayıcılığıdır. [[K6 s. 298]]</dd>
<dt>Işınlanan intravenöz set mi, ışın kaynağı mı korunma gerektirir?</dt><dd>Setin kendisi radyoaktif olmaz. [[K6 s. 299]] Korunma gereği, işlemi yapan kişilerin kaynağın yaydığı gama ışınlarına maruz kalabilmesinden doğar. [[K6 s. 299]] Kaynağı kapatmak mümkün olmadığından zırhlama ve radyoizotopun saklanması birlikte düşünülür. [[K6 s. 299]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="fk17-ambalaj">
<h2>Yeniden kullanım ve ambalaj işaretleri</h2><p class="intro">Evrensel önlemler, her hastanın enfeksiyon kaynağı olabileceği kabulüne dayanır. [[K6 s. 299]] Amaç hem çalışan ile hasta arasında hem de hastadan hastaya kan, diğer vücut sıvıları, bütünlüğü bozulmuş deri ve mukozayla korunmasız teması önlemektir. [[K6 s. 299]]</p>
<div class="viz"><div class="viz-head"><h3>Etiket hangi kullanıma izin veriyor?</h3></div><div data-viz="fk17_ambalaj"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Bu anlayış tek kullanımlık ekipmana yönelimi artırmıştır. [[K6 s. 299]] Fiberoptik endoskoplar ve özel cerrahi aletler gibi pahalı araçların yeniden kullanılması gerektiğinde yeniden işleme özellikle dikkat edilir. [[K6 s. 299]]</p>
<p><b>İki tarihi ayırın.</b> Cihazın ne zaman temizlendiği, dezenfekte veya steril edildiği belirtilmelidir. [[K6 s. 299]] Sterilizasyonun hangi tarihe kadar geçerli olduğunu gösteren bir son kullanma tarihi de bulunmalıdır. [[K6 s. 299]]</p>
<h3>Ambalajı okurken dört ayrı karar</h3><ul>
<li><b>Aynı hastada yeni bir işlem.</b> “Tek hasta, çoklu kullanım” ifadesi, aynı hastada birden fazla girişimde kullanıma izin verir. [[K6 s. 300]] Bu izin başka bir hastaya geçildiğinde geçerli değildir. [[K6 s. 300]]</li>
<li><b>Tek işlem.</b> “Yeniden kullanmayın” işareti bir kullanımı veya tek bir hastadaki tek işlemi belirtir. [[K6 s. 300]] Aynı hastaya ikinci bir girişim yapılacak olması bu işareti çoklu kullanım iznine dönüştürmez. [[K6 s. 300]]</li>
<li><b>İşlemden geçmiş olma.</b> “Steril” işareti cihazın bir sterilizasyon işlemine tabi tutulduğunu bildirir. [[K6 s. 300]] Tekrar kullanım izni ise ambalajda ayrı bir anlam taşır. [[K6 s. 300]]</li>
<li><b>Kullanım süresi.</b> Son kullanma işareti, belirtilen tarihten sonra cihazın kullanılmaması gerektiğini bildirir. [[K6 s. 300]] Yeniden işlenen malzemede işlem tarihini ve sterilizasyonun geçerlilik süresini gösteren tarihi birlikte okuyun. [[K6 s. 299]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk17-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk17-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk17-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk17-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk17-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Ameliyathanedeki gaz analizörünün CO₂ ölçümünden kuşkulanıyorsunuz. Cihazı hangi referansla kontrol edersiniz? Ölçümler arasındaki farkları nasıl yorumlar, arıza düşündüğünüzde ne yaparsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Bilinen bir derişimle başlayın. [[K6 s. 296]] Kitaptaki örnekte referans gaz tam %5 CO₂ içerir. [[K6 s. 296]]</li><li>Tekrarlanan ölçümlerin ortalamasını referansla, tek tek ölçümleri birbiriyle karşılaştırın. [[K6 s. 295]]</li><li>Giriş değiştiğinde sabit kalan hata sıfır kaymasını, girişle orantılı değişen hata duyarlılık kaymasını düşündürür. [[K6 s. 296]]</li><li>Arızalı cihazı hemen çekin, koşulları kayda geçirip klinik mühendisliğine bildirin. [[K6 s. 291]] Onarım ve mühendislik kontrolü tamamlanmadan cihaz yeniden kullanılamaz. [[K6 s. 291]]</li></ol>
<div class="note plain"><b>Çizin.</b> Yatay eksende giriş, düşey eksende çıkış olacak şekilde referans yanıtını çizin. Sıfır kaymasını paralel ötelenmeyle, duyarlılık kaymasını eğim değişimiyle gösterin. [[K6 s. 296]]</div>
<h3>Ek sorular</h3><ul><li>İki bağımsız miktar ölçeri bulunan oksijen tankında hangi tek hata noktası kalır?</li><li>Bir infüzyon pompasındaki yumuşak sınır, katı sınırdan nasıl ayrılır?</li><li>Mukozaya değen bir endoskop için temizlikten sonraki asgari işlem nedir?</li></ul></section>
<section class="wrap blk ders-sec" id="fk17-ozet"><h2>Özet</h2><ul class="ozet"><li>Servis tarihi, arıza koşulları ve personelin yeterliği izlenebilir olmalıdır. [[K6 s. 291–292]]</li><li>Tek hata noktasını ararken hem ölçümün hem kaynağın arızalanmasını düşünün. [[K6 s. 293]]</li><li>Kalibrasyonda bilinen bir giriş kullanılır, sıfır ve duyarlılık kaymaları birlikte bulunabilir. [[K6 s. 296]]</li><li>Sağlam deri, mukoza ve steril boşlukla temas, yeniden işlemenin asgari düzeyini belirler. [[K6 s. 297]]</li><li>Basınçlı buhar, ETO ve gama ışınları farklı malzemeler için sterilizasyon seçenekleridir. [[K6 s. 298–299]] [[K6 s. 301]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="17"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/16">← Kan akımı ölçümü: indikatör dilüsyonu, termodilüsyon ve Doppler</a><a href="#/dersler/fizik/18">Sonraki: Elektriğin temelleri ve Wheatstone köprüsü →</a></nav></section>`
};
