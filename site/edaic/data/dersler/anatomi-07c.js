VERI.sorular = VERI.sorular || {};
VERI.sorular['an07c-1'] = {
  no: 1, kok: 'Yüzey işaretleri ve kaslar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 314–318]]',
  onermeler: [
    { t: 'Subkostal düzlem L1 gövdesinden geçer.', d: false, n: 'Subkostal düzlem L3, transpilorik düzlem L1 hizasındadır. [[K5 s. 315]]' },
    { t: 'Rektusun fibröz ara hatları ön kılıfa tutunur.', d: true, n: 'Bu bağlantılar ön kompartımanda lokal anesteziğin yayılmasını sınırlar. [[K5 s. 315]]' },
    { t: 'Piramidalis, rektusun arkasında yer alır.', d: false, n: 'Bulunduğunda pubisten linea albaya rektusun önünde uzanır. [[K5 s. 315]]' },
    { t: 'Kretin yukarısında internal oblik lifleri yukarı ve mediale yönelir.', d: true, n: 'Bu düzeyde eksternal oblik aşağı ve mediale, internal oblik yukarı ve mediale uzanır. [[K5 s. 317]]' },
    { t: 'Zorlu ekspirasyonda karın kasları alt kaburgaları yukarı çeker.', d: false, n: 'Alt kaburgaları aşağı ve mediale çekerken karın içi basıncını yükseltirler. [[K5 s. 318]]' },
  ],
};
VERI.sorular['an07c-2'] = {
  no: 2, kok: 'Rektus kılıfı ve epigastrik damarlar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 315–319]]',
  onermeler: [
    { t: 'Kostal kenarın üzerinde rektus doğrudan kostal kıkırdaklara oturur.', d: true, n: 'Bu düzeyde ön örtüyü yalnız eksternal oblik aponevrozu yapar. [[K5 s. 315]]' },
    { t: 'Douglas çizgisinin altında transversus aponevrozu rektusun arkasından geçer.', d: false, n: 'Bu düzeyde her üç aponevroz rektusun önüne geçer. [[K5 s. 316]]' },
    { t: 'Rektus kılıfı bloğunda hedef arka kılıfın hemen önüdür.', d: true, n: 'Lokal anesteziğin kılıf içinde rektusun arkasına bırakılması amaçlanır. [[K5 s. 318]]' },
    { t: 'İnferior epigastrik arter iç inguinal halkanın medialinden döner.', d: true, n: 'Eksternal iliak arterden ayrılır ve halkanın medialinden arkuat çizginin altına yönelir. [[K5 s. 319]]' },
    { t: 'Süperior epigastrik arter internal torasik arterin terminal dalıdır.', d: true, n: 'Yedinci kostal kıkırdağın arkasından kılıfa girer. [[K5 s. 319]]' },
  ],
};
VERI.sorular['an07c-3'] = {
  no: 3, kok: 'Segmentler ve kasık sinirleri', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 319–320]]',
  onermeler: [
    { t: 'Göbek derisinin segmental karşılığı T7’dir.', d: false, n: 'T7 ksifoid, T10 göbek derisine karşılık gelir. [[K5 s. 319]]' },
    { t: 'T12’nin lateral kutanöz dalı kalçanın üst lateraline iner.', d: true, n: 'Subkostal ve iliohipogastrik sinirlerin lateral dalları ayrılmadan bu deriye ulaşır. [[K5 s. 320]]' },
    { t: 'İlioinguinal sinir inguinal kanalda spermatik kordun arkasındadır.', d: false, n: 'Kanalı kordun ön yüzünde geçer. [[K5 s. 320]]' },
    { t: 'L1, kuadratus lumborumun önünde iliohipogastrik ve ilioinguinal sinirlere ayrılır.', d: true, n: 'Her iki dal transversusu delerek internal oblik ile transversus arasına girer. [[K5 s. 320]]' },
    { t: 'İliohipogastrik sinirin son dalları suprapubik deriye ulaşır.', d: true, n: 'Sinir inguinal kanalın üstünde, eksternal oblik kasın derininde ilerler. [[K5 s. 320]]' },
  ],
};

const AN07C_NAV = [
  ['yuzey', 'Yüzey işaretleri'], ['rektus', 'Rektus'], ['kilif', 'Kılıfın katları'],
  ['katman', 'Yan duvar'], ['damar', 'Damarlar'], ['kesit', 'Rektus bloğu'],
  ['kasik', 'Kasık sinirleri'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/anatomi/07c'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 7 · Ders 07c', baslik: 'Karın duvarı',
  lede: 'Karın duvarında blok yerini seçerken yüzeydeki işareti, derindeki kas katını ve o katta seyreden sinirleri birlikte değerlendirmek gerekir. [[K5 s. 314–320]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${AN07C_NAV.map(([id, ad], i) => `<button type="button" data-scroll="an07c-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an07c-yuzey">
  <h2>Yüzeyden vertebra düzeyine</h2>
  <p class="intro">Ksifoid, kostal kenar ve iliak kretler derin yapıların düzeyini kestirmeye yardım eder. [[K5 s. 314–315]]</p>
  <div class="viz"><div data-viz="an07c_yuzey"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an07c-satir">
    <dt>Ksifoid</dt><dd>T9 gövdesi hizasındadır. [[K5 s. 314]]</dd>
    <dt>Transpilorik düzlem</dt><dd>Suprasternal çentik ile pubisin ortasından, L1 düzeyinden geçer. [[K5 s. 315]] Ksifoidin yaklaşık bir el genişliği altından bulunabilir. [[K5 s. 315]]</dd>
    <dt>Subkostal düzlem</dt><dd>Kostal kenar ksifoidden aşağı ve dışa, 10. kaburganın alt kenarına uzanır. [[K5 s. 315]] Alt sınır L3 hizasındadır, kısa olan 11. ve 12. kaburgalar kostal kenara ulaşmaz. [[K5 s. 315]]</dd>
    <dt>Göbek</dt><dd>Genellikle L3–L4 aralığına karşılık gelir, çocuklarda, obezlerde ve gebelerde daha aşağıdadır. [[K5 s. 315]]</dd>
    <dt>Kretler arası çizgi</dt><dd>İliak kretlerin en yüksek noktalarını birleştirince çizgi genellikle L4’ten geçer. [[K5 s. 315]] Erişkinde omurilik çoğunlukla L1–L2 birleşiminde sonlandığından bu çizgi lomber ponksiyon için güvenli bir düzeyi gösterebilir. [[K5 s. 315]]</dd>
  </dl>
</section>
<section class="wrap blk ders-sec" id="an07c-rektus">
  <h2>Ön duvar ve rektus abdominis</h2>
  <p class="intro">Rektus, pubisten yukarı doğru genişler ve kostal kıkırdaklara tutunur. [[K5 s. 315]]</p>
  <div class="viz"><div data-viz="an07c_rektus"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="cols"><div class="card"><h3>Yüzeyel fasya</h3>
  <p>Gövdeyi saran bir derin fasya yoktur, böyle bir örtü derin solunumu ve karnın genişlemesini engellerdi. [[K5 s. 315]] Alt karında yüzeyel fasyanın yağlı kısmına Camper, derine doğru fibrözleşen kısmına Scarpa denir. [[K5 s. 315]] Aralarında keskin bir sınır bulunmaz. [[K5 s. 315]]</p></div>
  <div class="card"><h3>Tutunma ve orta hat</h3>
  <p>Rektusun pubik kret ve simfizdeki başlangıcı 2,5 cm, 5–7. kostal kıkırdaklardaki tutunması 7,5 cm genişliğindedir. [[K5 s. 315]] Kılıf aponevrozları orta hatta birleşerek pubisten ksifoide uzanan, neredeyse damarsız linea albayı oluşturur. [[K5 s. 317]] Bu hat aşağıda dar ve güç seçilir, göbeğin üzerinde genişler. [[K5 s. 317]]</p></div></div>
  <p>Segmental embriyonik kökenden kalan üç fibröz ara hat ksifoidde, göbekte ve ikisinin ortasındadır. [[K5 s. 315]] Bazen göbek altında dördüncü hat görülür. [[K5 s. 315]] Yalnız ön yüzdeki bu hatlar ön kılıfa yapışır, dolayısıyla lokal anestezik önde bölmeler arasında serbestçe yayılamazken arkada yayılabilir. [[K5 s. 315]]</p>
  <p>Her zaman bulunmayan küçük üçgen piramidalis, rektusun önünde pubisten linea albaya uzanır. [[K5 s. 315]]</p>
</section>
<section class="wrap blk ders-sec" id="an07c-kilif">
  <h2>Rektusun arkasında ne var?</h2>
  <p class="intro">Rektusun arka yatağı yukarıdan aşağıya kıkırdak, kas, aponevroz ve gevşek areolar doku olarak izlenir. [[K5 s. 316]]</p>
  <div class="viz"><div data-viz="an07c_kilif"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ol class="iskelet">
    <li><b>Kostal kenarın üstü.</b> Rektus doğrudan kıkırdağa oturur. [[K5 s. 315]] İnternal oblik ve transversus kostal kenarın üzerine çıkmadığından önde yalnız eksternal oblik aponevrozu vardır. [[K5 s. 315]]</li>
    <li><b>Üst epigastrium.</b> Kostal kenarın 5–8 cm altına kadar transversusun kas lifleri orta hatta yaklaşır ve kılıfın arka duvarında seçilir. [[K5 s. 315–316]]</li>
    <li><b>Kılıfın büyük bölümü.</b> İnternal oblik aponevrozu rektusu saracak biçimde iki yaprağa ayrılır. [[K5 s. 315]] Öndeki yaprağı eksternal oblik, arkadakini transversus aponevrozu güçlendirir. [[K5 s. 315]]</li>
    <li><b>Douglas’ın arkuat çizgisinin altı.</b> Göbek ile pubisin ortasındaki bu çizginin altında üç aponevroz da rektusun önündedir. [[K5 s. 316]] Kasın arkasında sırasıyla transversalis fasyası, ekstraperitoneal yağ ve periton kalır. [[K5 s. 316]]</li>
  </ol>
</section>
<section class="wrap blk ders-sec" id="an07c-katman">
  <h2>Yan duvarın üç kası ve sinir düzlemi</h2>
  <p class="intro">Yan duvarda sinirleri ararken yüzeyden ikinci ve üçüncü kas arasındaki düzlemi izleyin. [[K5 s. 319]]</p>
  <div class="viz"><div data-viz="an07c_katman"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Üç kasın alanını önde rektus, arkada lomber kaslar, üstte kostal kenar, altta iliak kret sınırlar. [[K5 s. 317]] Medial uzantıları rektus kılıfına katılır ve linea albada birleşir. [[K5 s. 317]]</p>
  <dl class="an07c-satir">
    <dt>İliak kretin üzerinde</dt><dd>Eksternal oblik lifleri aşağı ve mediale, internal oblik lifleri yukarı ve mediale, transversus lifleri enine uzanır. [[K5 s. 317]]</dd>
    <dt>Kretin altında</dt><dd>Üç kas da aponevrotiktir, lifleri aşağı ve mediale yönelerek inguinal kanalın yapısına katılır. [[K5 s. 317]]</dd>
    <dt>Solunumda</dt><dd>Zorlu ekspirasyonda ve öksürürken karın kasları karın içi basıncını yükseltir, alt kaburgaları aşağı ve mediale çeker. [[K5 s. 318]] Elektromiyografide inspirasyona katılım gösterilmemiştir. [[K5 s. 318]]</dd>
  </dl>
  <h3>Torakstan karın derisine</h3>
  <p>Karın duvarını T7–L1 ön primer dalları inerve eder. [[K5 s. 319]] T7–T11 interkostal sinirleri ve T12 subkostal siniri, diyafram ile transversusun birbirine geçen kas uzantıları arasından duvara girer. [[K5 s. 319]] Toraksta internal ve en içteki interkostal kas arasında seyreden sinirler, karında internal oblik ile transversus arasında ilerler. [[K5 s. 319]] Rektusun arkasına doğru mediale gider, kası delip üzerindeki deriye ulaşırlar. [[K5 s. 319]]</p>
  <p><b>Deri işaretleri.</b> Ksifoid T7, göbek T10, kasık L1’e karşılık gelir. [[K5 s. 319]]</p>
  <p>Katları bir diseksiyonda izlemek için ön kılıf mediale katlanabilir, eksternal oblik kaldırıldığında internal oblik açığa çıkar. [[K5 s. 316]] Kitabın daha derin diseksiyonunda rektus kaldırılarak arka kılıf, internal oblikte pencere açılarak transversus üzerindeki alt interkostal, subkostal ve birinci lomber sinirler gösterilir. [[K5 s. 317]] Göğüs duvarında yüzeyel diseksiyon internal interkostallere ulaşır, daha derin görünümde en iç interkostal kat ve plevra seçilir. [[K5 s. 316–317]]</p>
  <h3>Lateral kutanöz dallar</h3>
  <ul><li>İlioinguinal hariç her sinir orta aksiller çizgide lateral kutanöz dal verir. [[K5 s. 320]]</li>
  <li>T7–T11’in lateral dalları ön ve arka dallara ayrılır, rektusun dış kenarından erektor spinaya kadar deriyi inerve eder. [[K5 s. 320]]</li>
  <li>T12 ve iliohipogastrik sinirin lateral dalları bölünmeden aşağı iner ve kalçanın üst dış yüzüne ulaşır. [[K5 s. 320]]</li>
  <li>T7–T12’nin her birine küçük, paralel bir kollateral dal eşlik eder. [[K5 s. 320]] Kitap ilioinguinal siniri iliohipogastrik sinirin kollaterali olarak değerlendirir ve lateral kutanöz dalının olmayışını böyle açıklar. [[K5 s. 320]]</li></ul>
  <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=tap">Sinir Bloğu Atlası · Lateral TAP bloğu</a>
</section>
<section class="wrap blk ders-sec" id="an07c-damar">
  <h2>Epigastrik damarları izleyin</h2>
  <p class="intro">Karın duvarının zengin damar ağı içinde rektus bloğu için özellikle önemli olanlar arka kılıftaki inferior ve süperior epigastrik damarlardır. [[K5 s. 319]]</p>
  <div class="viz"><div data-viz="an07c_damar"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an07c-satir">
    <dt>Aşağıdan yukarıya</dt><dd>İnferior epigastrik arter eksternal iliaktan ayrılır, iç inguinal halkanın medialinden döner ve arkuat çizginin altından arka kılıfa girer. [[K5 s. 319]]</dd>
    <dt>Yukarıdan aşağıya</dt><dd>Daha küçük olan süperior epigastrik arter internal torasik arterin terminal dalıdır. [[K5 s. 319]] Yedinci kostal kıkırdağın arkasından kılıfa girer ve dikey inerek inferior epigastrikle anastomoz yapar. [[K5 s. 319]]</dd>
  </dl>
  <p>Yüzey izdüşümünü kasıktaki femoral nabızdan başlatın, hafif bir kavisle göbeğin bir parmak dışına, oradan dikey olarak kostal kenara uzatın. [[K5 s. 319]] Seyir belirgin değişkenlik gösterebilir, arka kılıfta sıklıkla süperomediale giden büyük arter dalları bulunur. [[K5 s. 319]] İğne veya izleyici alet bu dallardan herhangi birini yırtabilir. [[K5 s. 319]]</p>
</section>
<section class="wrap blk ders-sec" id="an07c-kesit">
  <h2>Rektus kılıfı bloğunda hedef</h2>
  <p class="intro">Ön karın duvarı insizyonunda analjezi için lokal anestezik, kılıfın içinde arka yaprağın hemen önüne bırakılabilir. [[K5 s. 318]]</p>
  <div class="viz"><div data-viz="an07c_kesit"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ol class="iskelet">
    <li><b>Yüzey işareti.</b> Kitap, farklı uygulamalar arasında göbeğin hem üstünde hem altında, göbeğin 2–5 cm lateraline yapılan çoklu enjeksiyonları anlatır. [[K5 s. 318–319]]</li>
    <li><b>Ön kılıf.</b> Sağlam ön duvar tüm uzunluğu boyunca iğneye belirgin direnç gösterir. [[K5 s. 316]] Kısa eğimli uçlu veya küntleştirilmiş iğneyle kılıf geçilirken bir “pop” hissedilebilir. [[K5 s. 319]]</li>
    <li><b>Arka kılıf.</b> İğnenin ileri geri hareketiyle alınan çizilme hissi arka kılıfı tanımaya yardım edebilir. [[K5 s. 319]] Üst epigastriumdaki yumuşak kas ve pubis üzerinde aponevrotik arka duvarın eksikliği bu ayrımı güçleştirir. [[K5 s. 316]]</li>
  </ol>
  <p>Birden fazla enjeksiyonda, özellikle alt karın insizyonu için rektus ve ilioinguinal bloklar birlikte uygulandığında, toplam lokal anestezik dozu gözetilir. [[K5 s. 319]]</p>
  <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=rektus">Sinir Bloğu Atlası · Rektus kılıfı bloğu</a>
</section>
<section class="wrap blk ders-sec" id="an07c-kasik">
  <h2>L1’den kasığa</h2>
  <p class="intro">L1 kuadratus lumborumun önünde ikiye ayrılır, iliohipogastrik ve ilioinguinal sinirler transversusu delerek internal oblik ile transversus arasına girer. [[K5 s. 320]]</p>
  <div class="viz"><div data-viz="an07c_kasik"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an07c-satir"><dt>İliohipogastrik</dt><dd>Spina iliaka anterior superiorun hemen üstünde ve önünde internal obliği deler. [[K5 s. 320]] İnguinal kanalın hemen üzerinde, eksternal obliğin derininde ilerleyip suprapubik deriye ulaşır. [[K5 s. 320]]</dd>
  <dt>İlioinguinal</dt><dd>İnternal obliği deldikten sonra inguinal kanalı spermatik kordun önünden geçer. [[K5 s. 320]] Dış halkadan veya komşu eksternal oblik aponevrozundan çıkarak skrotum ya da labium majus ile bitişik üst uyluk derisini inerve eder. [[K5 s. 320]]</dd></dl>
  <h3>İnguinal herni onarımı</h3>
  <p>Bu iki sinirin bloğu inguinal herni onarımında anestezi ya da ameliyat sonrası analjezi sağlayabilir, anestezi gerekiyorsa genitofemoral sinirin genital dalı da bloke edilmelidir. [[K5 s. 320]]</p>
  <ol class="iskelet">
    <li><b>Giriş.</b> Kitabın tarifinde kısa eğimli uçlu veya küntleştirilmiş iğne, spina iliaka anterior superiorun 2 cm medialinden ve 2 cm altından pubise doğru 45–60° açıyla ilerletilir. [[K5 s. 320]]</li>
    <li><b>Birinci enjeksiyon.</b> Eksternal oblik aponevrozunun geçişi “pop” veya ani direnç kaybıyla anlaşılabilir, burada 7–10 mL lokal anestezik verilir. [[K5 s. 320]]</li>
    <li><b>İkinci enjeksiyon.</b> İnternal obliğin daha yumuşak direnci içinde 1–2 cm daha ilerlenerek 7–10 mL daha verilir. [[K5 s. 320]]</li>
    <li><b>Genital dal.</b> İnguinal bağın altında, pubik tüberkülün hemen lateralinde 10 mL lokal anestezik ile bloke edilebilir. [[K5 s. 320]]</li>
  </ol>
  <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=ql">Sinir Bloğu Atlası · Transmüsküler kuadratus lumborum bloğu</a>
</section>
<section class="wrap blk ders-sec" id="an07c-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önerme için karar verin, sonra gerekçeyi açın.</p>
  <div class="viz"><div data-viz="mtf" data-q="an07c-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an07c-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an07c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an07c-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Göbek çevresinde bir insizyon için rektus kılıfı bloğu düşünüyorsunuz. Hedefi bir kesit üzerinde nasıl gösterirsiniz? Kesi pubise yaklaştıkça tanıdığınız katlar nasıl değişir?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
  <li>Göbeği yaklaşık L3–L4 aralığı ve T10 deri alanıyla ilişkilendiririm. [[K5 s. 315]] [[K5 s. 319]]</li>
  <li>İnternal oblik aponevrozunun rektusu saran iki yaprağını, önde eksternal oblik ve arkada transversus katkısını gösteririm. [[K5 s. 315]]</li>
  <li>Hedefi arka kılıfın hemen önünde işaretlerim, ön kompartımanda yayılmayı fibröz ara hatların sınırladığını açıklarım. [[K5 s. 315]] [[K5 s. 318]]</li>
  <li>Arka kılıfta epigastrik damarları ve iğneyle karşılaşabilecek süperomedial dalları gösteririm. [[K5 s. 319]]</li>
  <li>Göbek–pubis mesafesinin ortasındaki arkuat çizginin altında üç aponevrozun da öne geçtiğini belirtirim. [[K5 s. 316]]</li>
  <li>Burada rektusun arkasında transversalis fasyasını, ekstraperitoneal yağı ve peritonu sıralarım. [[K5 s. 316]]</li></ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Arkuat çizginin üstünden ve altından birer enine kesit çizin. Aponevrozları yandaki üç kastan orta hatta kadar izleyin ve üst kesitte blok hedefini işaretleyin. [[K5 s. 315–316]] [[K5 s. 318]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Torakstan gelen sinir hangi iki kas arasındadır? [[K5 s. 319]] İlioinguinal ve iliohipogastrik sinirleri kanal ve kordla ilişkilerinden nasıl ayırırsınız? [[K5 s. 320]]</div></div>
</section>
<section class="wrap blk ders-sec" id="an07c-ozet">
  <h2>Özet</h2><ul class="ozet">
  <li>Ksifoidin kemik düzeyi T9, aynı bölgenin deri segmenti T7’dir. [[K5 s. 314]] [[K5 s. 319]]</li>
  <li>Göbek düzeyini tahmin ederken yaş, obezite ve gebelikle konumunun değişebildiğini hatırlayın. [[K5 s. 315]]</li>
  <li>Rektusun arkasındaki doku düzeye bağlıdır, arkuat çizginin altında aponevrotik kılıf bulunmaz. [[K5 s. 316]]</li>
  <li>Rektus bloğunda arka kılıfın önünü hedeflerken epigastrik damarlar ve dallarıyla karşılaşılabilir. [[K5 s. 318–319]]</li>
  <li>Torakoabdominal sinirler ile L1 dallarının ortak geçiş düzlemi internal oblik ve transversus arasıdır. [[K5 s. 319–320]]</li>
  <li>Kasıkta iliohipogastrik siniri kanalın üstünde, ilioinguinal siniri kanal içinde kordun önünde arayın. [[K5 s. 320]]</li></ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="07c"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/07b">← Orbita ve içeriği</a><a href="#/dersler/anatomi/08">Sonraki: Ağrının anatomisi →</a></nav>
</section>`,
};
