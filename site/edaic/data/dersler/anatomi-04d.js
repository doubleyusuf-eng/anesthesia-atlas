VERI.sorular = VERI.sorular || {};
VERI.sorular['an04d-1'] = {
  no: 1, kok: 'Torakal sinirleri izleyin', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 190–192]]',
  onermeler: [
    { t: 'Tipik interkostal sinir kosta açısında internal ve en iç interkostal kaslar arasındadır.', d: true, n: 'Sinir posterior interkostal membran ile plevra arasındaki plandan kosta açısında kaslar arasına geçer. [[K5 s. 190–191]]' },
    { t: 'Birinci interkostal sinir belirgin bir lateral kutanöz dal verir.', d: false, n: 'T1 lateral kutanöz dal vermez. [[K5 s. 191]] Anterior kutanöz dalı varsa küçüktür. [[K5 s. 191]]' },
    { t: 'İnterkostobrakiyal sinir T2’nin lateral kutanöz dalıdır.', d: true, n: 'Bu dal aksillayı geçerek proksimal kolun medial derisine ulaşır. [[K5 s. 191]]' },
    { t: 'Göbek çevresinin duyusu T9’dan gelir.', d: false, n: 'Göbek bölgesini T10 innerve eder. [[K5 s. 192]]' },
    { t: 'Subkostal sinirin lateral kutanöz dalı ön ve arka dallara ayrılır.', d: false, n: 'Bu dal bölünmeden aşağı iner ve lateral kalça derisine ulaşır. [[K5 s. 192]]' },
  ],
};
VERI.sorular['an04d-2'] = {
  no: 2, kok: 'Psoas ve lomber pleksus', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 192–198]]',
  onermeler: [
    { t: 'Genitofemoral sinir psoasın medial kenarından çıkar.', d: false, n: 'Psoası delip L3’ün alt kenarı düzeyinde ön yüzüne çıkar. [[K5 s. 195]]' },
    { t: 'L1’in üst bölümü ilioinguinal ve iliohipogastrik sinirleri verir.', d: true, n: 'L1’in alt bölümü ise L2 katkısıyla genitofemoral siniri oluşturur. [[K5 s. 193]]' },
    { t: 'Lateral kutanöz sinir inguinal bağı delebilir.', d: true, n: 'Bağ içindeki fasiküller siniri sıkıştırırsa meraljia parestetika gelişebilir. [[K5 s. 198]]' },
    { t: 'Femoral sinir L2–L4’ün ventral bölümlerinden gelişir.', d: false, n: 'Femoral sinir dorsal, obturator sinir ventral bölümlerden gelişir. [[K5 s. 193]]' },
    { t: 'Lomber pleksus uyarısında kuadratus lumborumun kasılması iğnenin fazla lateralde olduğunu düşündürür.', d: true, n: 'Kitap kuadratus lumborum yanıtını fazla lateral, psoas yanıtını fazla derin yerleşimle ilişkilendirir. [[K5 s. 195]]' },
  ],
};
VERI.sorular['an04d-3'] = {
  no: 3, kok: 'Femoral, safen ve obturator sinirler', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 198–201]]',
  onermeler: [
    { t: 'Safen sinir femoral sinirin ön bölümünden ayrılır.', d: false, n: 'Safen sinir arka bölümün tek kutanöz dalıdır. [[K5 s. 199]]' },
    { t: 'Safen sinir addüktör kanalda arteri önden çaprazlar.', d: true, n: 'Kanal içinde arterin lateralinden medialine geçer. [[K5 s. 199]]' },
    { t: 'Obturator sinirin dallarını addüktör brevis ayırır.', d: true, n: 'Ön dal brevisin önünde, arka dal brevis ile magnus arasında ilerler. [[K5 s. 200]]' },
    { t: 'Aksesuar obturator sinir kalça eklemine dal verir.', d: true, n: 'Pubisin üst dalını geçip pektineus ile kalça eklemine ulaşır. [[K5 s. 201]]' },
    { t: 'Femoral blokta kuadriseps yanıtı patellayı oynatır.', d: true, n: 'Femoral sinir uyarıldığında kuadrisepsin kasılması patellada seğirme oluşturur. [[K5 s. 200]]' },
  ],
};

SAYFALAR['dersler/anatomi/04d'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 4 · Ders 04d', baslik: 'Torakal sinirler ve lomber pleksus',
  lede: 'Kosta oluğundan karın duvarına, psoastan uyluğa uzanan sinirleri izleyin. Bir bloğun etki alanını sinirin geçtiği kas, damar ve fasya üzerinden açıklayın.',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste"><button type="button" data-scroll="an04d-interkostal"><span>01</span>Kosta oluğu</button><button type="button" data-scroll="an04d-karin"><span>02</span>Karın duvarı</button><button type="button" data-scroll="an04d-psoas"><span>03</span>Psoas</button><button type="button" data-scroll="an04d-kasik"><span>04</span>Kasık</button><button type="button" data-scroll="an04d-femoral"><span>05</span>Femoral üçgen</button><button type="button" data-scroll="an04d-safen"><span>06</span>Safen sinir</button><button type="button" data-scroll="an04d-obturator"><span>07</span>Obturator kanal</button><button type="button" data-scroll="an04d-p1"><span>08</span>Part I</button><button type="button" data-scroll="an04d-p2"><span>09</span>Part II</button><button type="button" data-scroll="an04d-ozet"><span>10</span>Özet</button></nav>
<section class="wrap blk ders-sec" id="an04d-interkostal">
  <h2>Torakal ön dallar ve kosta oluğu</h2>
  <p class="intro">On iki çift torakal ön dalın üstteki 11 çifti interkostal, 12. çift subkostal sinirdir. [[K5 s. 190]]</p>
  <div class="viz"><div class="viz-head"><h3>Kosta oluğunda hangi yapı en altta?</h3></div><div data-viz="an04d_interkostal"></div><p class="viz-cap" aria-live="polite">Kosta oluğunda en üstte ven, onun altında arter ve sinir bulunur. [[K5 s. 191]] İnterkostal aralıkta önce veni, sonra arteri, en altta siniri bulun. [[K5 s. 191]]</p></div>
  <dl class="an04d-bulgular">
    <dt>İnnervasyon</dt><dd>Bu dallar interkostal kasları ve ön karın duvarı kaslarını çalıştırır. [[K5 s. 190]] Duyu alanları üst kolun medialini ve Louis açısından kasığın hemen üstüne kadar gövdenin ön ve yan yüzlerini kapsar. [[K5 s. 190]] Her dal, kendi torakal sempatik gangliyonuna bir beyaz ve bir gri bağlantı dalıyla bağlanır. [[K5 s. 190]]</dd>
    <dt>Tipik seyir</dt><dd>T3–T6 bütünüyle tipiktir, diğerleri bu plandan az ya da çok ayrılır. [[K5 s. 190]] Tipik sinir üst kostotransvers bağın önünden interkostal aralığa girer ve damarların altında ilerler. [[K5 s. 190]] Önce posterior interkostal membran ile plevra arasında yer alır. [[K5 s. 190]] Kosta açısında sinir internal ve en iç interkostal kaslar arasına girer. [[K5 s. 190–191]]</dd>
    <dt>Sternum kenarı</dt><dd>Sinir internal torasik damarların ve transvers toraks kasının önünden geçer. [[K5 s. 191]] İç interkostal kası, anterior interkostal membranı (dış interkostal kasın fibröz ön bölümü) ve pektoralis majoru delerek anterior kutanöz sinir olur. [[K5 s. 191]]</dd>
    <dt>Üç dal</dt><dd>Kas dalları interkostal kaslara gider. [[K5 s. 191]] Kollateral dal aralığın alt kenarında ilerler, ana sinire tekrar katılabilir veya ayrı bir anterior kutanöz dal olarak sonlanabilir. [[K5 s. 191]] Lateral kutanöz dal orta aksiller çizgide yüzeye çıkar, ön ve arka dallara ayrılır. [[K5 s. 191]]</dd>
    <dt>T1</dt><dd>Büyük dal birinci kosta boynunun önünden, superior interkostal arterin lateralinden brakiyal pleksusa gider. [[K5 s. 191]] Küçük dal birinci interkostal sinirdir. [[K5 s. 191]] Lateral kutanöz dal vermez, anterior kutanöz dalı varsa küçüktür. [[K5 s. 191]]</dd>
    <dt>T2</dt><dd>Lateral kutanöz dal interkostobrakiyal sinir olarak aksillayı geçip üst kolun proksimal medial derisine ulaşır. [[K5 s. 191]] Diğer özellikler tipiktir. [[K5 s. 191]] Kitap, radikal mastektomide sinirin kaçınılmaz olarak zedelendiğini ve burada uyuşukluk geliştiğini belirtir. [[K5 s. 191]] Aksiller lenf nodu biyopsisinde de sinir risk altındadır. [[K5 s. 191]]</dd>
    <dt>Sempatik zincir</dt><dd>Üst dorsal sempatektomide zincir T3 gangliyonunun hemen altında kesilir. [[K5 s. 192]] Yukarı doğru diseksiyonda bağlantılar ayrılırken stellat gangliyon ve T1 beyaz bağlantı dalı korunur. [[K5 s. 192]] Böylece kola giden T2–T7 çıkışı pregangliyonik düzeyde kesilir. [[K5 s. 192]] Baş-boynun T1 üzerinden ana innervasyonu korunarak Horner sendromu önlenir. [[K5 s. 192]] Torakoskopi üst zinciri iyi gösterir ve iki tarafın aynı seansta ameliyatına olanak verir. [[K5 s. 192]]</dd>
    <dt>Kuntz siniri</dt><dd>Bazı lifler zincirden T1 gangliyonunun altında ayrılıp doğrudan brakiyal pleksusa gidebilir. [[K5 s. 192]] T2 gangliyonundan birinci torakal sinire uzanan Kuntz demeti oldukça düzenli görülür. [[K5 s. 192]] Tam sempatektomi için aranıp kesilir. [[K5 s. 192]]</dd>
  </dl>
  <details class="note plain"><summary>Koltuk altı cerrahisinden sonra üst kolun iç yüzünde uyuşukluk gelişiyor. Duyu kaybını göğüs duvarından kola kadar nasıl izlersiniz?</summary><p>Duyu kaybını önce yerleştirin. İnterkostobrakiyal sinirin alanı kolun medialinde ve proksimalindedir. [[K5 s. 191]] Buraya ulaşmak için aksillayı geçen dal interkostobrakiyal sinirdir. [[K5 s. 191]] Bu dalı geriye doğru izlediğinizde T2’nin lateral kutanöz dalına ulaşırsınız. [[K5 s. 191]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04d-karin">
  <h2>Kostal kenardan karın duvarına</h2>
  <p class="intro">T7–T11, diyafram ile transvers karın kasının birbirine geçen lifleri arasından karın duvarına ulaşır. [[K5 s. 191–192]]</p>
  <div class="viz"><div class="viz-head"><h3>Kostal kenar ile rektus kılıfı arasında</h3></div><div data-viz="an04d_karin"></div><p class="viz-cap" aria-live="polite">Rektus kılıfına ulaşan T7–T8 ile önce iç oblik ve transvers karın kasları arasında ilerleyen T9–T11’i karşılaştırın. [[K5 s. 191–192]]</p></div>
  <dl class="an04d-bulgular">
    <dt>T7 ve T8</dt><dd>Karın içindeki kısa yolları yukarı ve mediale yönelir. [[K5 s. 192]] Doğrudan rektus kılıfının arka yaprağına girerler. [[K5 s. 192]] Rektus abdominisi ve kılıfın ön yaprağını geçip üzerlerindeki deride sonlanırlar. [[K5 s. 192]]</dd>
    <dt>T9–T11</dt><dd>Transvers karın kası ile iç oblik arasından rektus kılıfına gelir, arka yaprağı, rektusu ve ön yaprağı delerek deriye çıkarlar. [[K5 s. 192]] T9 yaklaşık yatay, T10 ve T11 aşağı doğru seyreder. [[K5 s. 192]] Göbek bölgesinin duyusu T10’a aittir. [[K5 s. 192]]</dd>
    <dt>Ortak dallar</dt><dd>T7–T11’in kas dalları interkostal kaslarla birlikte karın kaslarına da gider. [[K5 s. 192]] Her birinin kollateral (ek anterior kutanöz) ve lateral kutanöz dalları vardır. [[K5 s. 192]] Duyu lifleri diyaframın periferine de ulaşır. [[K5 s. 192]]</dd>
    <dt>T12</dt><dd>Subkostal sinir on ikinci kaburganın alt kenarında subkostal damarların altında, lateral arkuat bağın arkasında ilerler. [[K5 s. 192]] Kuadratus lumborumun önünden, böbrekle kolonun arkasından geçip transvers kasla iç oblik arasına girer. [[K5 s. 192]] Sonraki dağılımı alt interkostal sinirlere benzer. [[K5 s. 192]]</dd>
    <dt>T12’nin ayırt edici dalları</dt><dd>Lateral kutanöz dal bölünmeden aşağı iner ve kalçanın lateral derisine ulaşır. [[K5 s. 192]] Motor dal rektus kılıfının en altındaki piramidalis kasını innerve eder. [[K5 s. 192]]</dd>
  </dl>
  <details class="note plain"><summary>T8 ile T11’in deri ucundan kostal kenara doğru geriye gidin. Hangi katmanlara ikisinde de, hangi kas aralığına yalnız T11’de rastlarsınız?</summary><p>Her ikisinde de deri ucundan derine doğru ön kılıf, rektus kası ve arka kılıf sıralanır. [[K5 s. 192]] T11 için arka kılıftan sonra iç oblik ile transvers kas arasındaki yolu da anlatmak gerekir. [[K5 s. 192]] T8’in karın içindeki yolu kısadır ve sinir doğrudan arka kılıfa girer. [[K5 s. 192]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04d-psoas">
  <h2>Lomber pleksusu psoas üzerinden okuyun</h2>
  <p class="intro">Lomber pleksus, lomber transvers çıkıntıların önünde, psoas majorun içinde oluşur. [[K5 s. 193]]</p>
  <div class="viz"><div class="viz-head"><h3>Psoasın yüzü ve iki kenarı</h3></div><div data-viz="an04d_psoas"></div><p class="viz-cap" aria-live="polite">Lateral kenardaki dalları yukarıdan aşağıya izleyin. Genitofemoral siniri bulmak için kasın ön yüzüne, obturator siniri bulmak için medial kenarına geçin. [[K5 s. 194–196]]</p></div>
  <dl class="an04d-bulgular">
    <dt>Kökler</dt><dd>L1–L3 ön dalları ile L4 ön dalının bir bölümü pleksusu oluşturur. [[K5 s. 192–193]] L4 lumbosakral trunkusa da katkı verir. [[K5 s. 192–193]] Yaklaşık yarısında L1’e T12’den lif katılır. [[K5 s. 193]] En alt katkı L3 ise pleksus prefikse, L5 ise postfiks kabul edilir. [[K5 s. 193]]</dd>
    <dt>L1’in iki bölümü</dt><dd>Üst bölüm iliohipogastrik ve ilioinguinal sinirleri verir. [[K5 s. 193]] Alt bölüm L2’nin bir dalıyla birleşerek genitofemoral siniri yapar. [[K5 s. 193]] Kitap, iliohipogastrik ve ilioinguinal sinirlerin ayrıntılı seyri için karın duvarı anlatımına (s. 320) yönlendirir. [[K5 s. 195]]</dd>
    <dt>Dorsal ve ventral bölümler</dt><dd>L2’nin kalanı, L3 ve L4’ün pleksusa katılan lifleri dorsal ve ventral bölümlere ayrılır. [[K5 s. 193]] Dorsal liflerden uyluğun lateral kutanöz siniri (L2–L3) ve femoral sinir (L2–L4) çıkar. [[K5 s. 193]] Ventral lifler obturator siniri (L2–L4) ve bazen aksesuar obturator siniri (L3–L4) oluşturur. [[K5 s. 193–194]]</dd>
    <dt>Kas dalları ve çıkışlar</dt><dd>Pleksus psoas major, psoas minör, iliakus ve kuadratus lumboruma dal verir. [[K5 s. 194]] Psoas minör majorun üzerindedir. [[K5 s. 194]] Şekil 153 dördüncü lomber sempatik gangliyonu da gösterir. [[K5 s. 194]] Obturator ve varsa aksesuar obturator sinir medialden çıkar. [[K5 s. 194–195]] Genitofemoral sinir kası delerek öne gelir. [[K5 s. 194–195]] Diğer dallar lateral kenarda yukarıdan aşağıya iliohipogastrik, ilioinguinal, lateral kutanöz ve femoral sinir sırasıyla görülür. [[K5 s. 194–196]]</dd>
    <dt>Lomber pleksus bloğu</dt><dd>Elektif anestezide seyrek kullanılan blok, kalça cerrahisinde tam anestezi, seçilmiş hastalarda aralıklı veya sürekli analjezi sağlayabilir. [[K5 s. 195]] Kateter ilerletmek çoğu kez güçtür. [[K5 s. 195]]</dd>
    <dt>Yüzey işaretleri</dt><dd>Hedef taraf üstte ve dizler bükülü olarak yan yatan hastada spinöz çıkıntıların orta hattı işaretlenir. [[K5 s. 195]] İki iliak kretin palpe edilen en yüksek noktalarını birleştiren çizgiyle kesişimin yaklaşık 4 cm laterali giriş yeridir. [[K5 s. 195]] Kitap en az 10 cm’lik iğnenin cilde dik ilerletilmesini, transvers çıkıntıya temasta hafif sefalik veya kaudal açıyla çıkıntının geçilmesini tarif eder. [[K5 s. 195]]</dd>
    <dt>Uyarıyı yorumlama</dt><dd>Kuadriseps kasılması patellayı oynatır. [[K5 s. 195]] Bu yanıtla lokal anestezik verildiğinde femoral, obturator ve lateral kutanöz sinirlerin blokajı beklenir. [[K5 s. 195]] Psoas uyarısıyla kalça fleksiyonu fazla derini, kuadratus lumborum kasılması fazla laterali düşündürür. [[K5 s. 195]]</dd>
  </dl>
  <details class="note plain"><summary>İğne sinir stimülatörüne bağlıyken hastanın kalçası bükülüyor. Bu yanıtı diz kapağındaki hareketten nasıl ayırırsınız?</summary><p>Önce hangi eklemin hareket ettiğine bakın. Kalçanın fleksiyonu psoas uyarısına bağlıdır ve kitap bunu fazla derin yerleşimle ilişkilendirir. [[K5 s. 195]] Diz kapağının oynaması ise kuadriseps kasılmasını gösterir ve aranan yanıttır. [[K5 s. 195]] Karın arka duvarında kuadratus lumborumun kasılması farklı bir konum hatasına, fazla lateralde kalındığına işaret eder. [[K5 s. 195]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04d-kasik">
  <h2>Kasıkta genitofemoral ve lateral kutanöz sinirler</h2>
  <p class="intro">Genitofemoral sinir psoasın önünde inerken uyluğun lateral kutanöz siniri iliakusu çaprazlayarak inguinal bağın lateral ucuna yönelir. [[K5 s. 195–196]]</p>
  <div class="viz"><div class="viz-head"><h3>Ön üst iliak diken ve inguinal bağ</h3></div><div data-viz="an04d_kasik"></div><p class="viz-cap" aria-live="polite">Ön üst iliak dikeni bulun, bağın lateral ucunun altından geçen siniri sartoriusun başlangıcına kadar izleyin. [[K5 s. 196–198]]</p></div>
  <dl class="an04d-bulgular">
    <dt>Genitofemoral sinir</dt><dd>L1–L2 lifleri psoasın ön yüzüne L3’ün alt kenarında çıkar. [[K5 s. 195]] Periton ve üreterin arkasından inguinal bağın hemen üstüne iner. [[K5 s. 195]] Burada iki terminal dala ayrılır. [[K5 s. 195]] Ayrım kökene yakınsa psoastan iki ayrı sinir çıkabilir. [[K5 s. 195]]</dd>
    <dt>Genital dal</dt><dd>Eksternal iliak arterin sonunu çaprazlayıp derin inguinal halkaya girer. [[K5 s. 195]] Erkekte kordon içinde kanaldan geçer, kremastere motor dal verir. [[K5 s. 195]] Dış halkadan çıkıp skrotum ve komşu uyluk derisine ulaşır. [[K5 s. 195]] Kadında yuvarlak bağla ilerler, labium majusun ön kısmı ile mons veneris derisine dağılır. [[K5 s. 195]]</dd>
    <dt>Femoral dal</dt><dd>Eksternal iliak arter üzerinde ilerleyip inguinal bağın altından geçer. [[K5 s. 195]] Femoral arter başlangıcının hemen lateralinde derin fasyayı deler. [[K5 s. 195]] Kasık kıvrımının hemen altında bir el büyüklüğündeki deri alanını innerve eder. [[K5 s. 195]] Çocukta aktif olan kremaster refleksinde üst uyluk derisinin hafifçe uyarılması testisi yukarı çeker. [[K5 s. 195]]</dd>
    <dt>Lateral kutanöz sinir</dt><dd>L2–L3 kökenli sinir psoasın lateralinden ilioinguinal sinirin hemen altında çıkar. [[K5 s. 196]] İliakusu geçer, inguinal bağın lateral ucunun altından uyluğa girer ve sartorius başlangıcı üzerinde ikiye ayrılır. [[K5 s. 196]]</dd>
    <dt>Duyu alanları</dt><dd>Ön dal anterolateral uyluk derisine dize kadar ulaşır. [[K5 s. 196–198]] İntermediyer kutanöz sinir ve safenin infrapatellar dalıyla patellar pleksusa katılır. [[K5 s. 196–198]] Arka dal fasya latayı deler. [[K5 s. 198]] Büyük trokanterden uyluk ortasına kadar lateral deriyi innerve eder. [[K5 s. 198]]</dd>
    <dt>Meraljia parestetika</dt><dd>Sinir bazen femoral sinirden çıkar. [[K5 s. 198]] Bazen de inguinal bağı deler. [[K5 s. 198]] Bağ fasikülleri arasında sıkışması dağılım alanında ağrı, uyuşma ve parestezi yapabilir. [[K5 s. 198]] Derin fasikülün cerrahi kesisi ağrıyı giderir. [[K5 s. 198]] Uygunsuz fıtık bağı basısı, intraabdominal inflamasyon veya malign tutulum benzer yakınmalar doğurabilir. [[K5 s. 198]]</dd>
    <dt>Blok işareti</dt><dd>Kitap ön üst iliak dikenin bir parmak mediali ve inferiorunu giriş noktası olarak verir. [[K5 s. 198]] İnguinal bağın hemen derinine yelpaze biçiminde dağıtılan yaklaşık 10–15 mL lokal anesteziğin siniri bloke etmesi beklenir. [[K5 s. 198]]</dd>
  </dl>
  <details class="note plain"><summary>Kasık kıvrımının altında sınırlı bir duyu alanı ile dize kadar uzanan bir duyu alanı aynı sinire mi aittir?</summary><p>Kasık kıvrımının hemen altındaki yaklaşık el büyüklüğündeki alan genitofemoral sinirin femoral dalına aittir. [[K5 s. 195]] Dize kadar izlenen anterolateral deri alanı ise uyluğun lateral kutanöz sinirinin ön dalına aittir. [[K5 s. 196–198]] Bu ikinci sinirin arka dalını ararken dize gitmek yerine büyük trokanter ile uyluk ortası arasında kalın. [[K5 s. 198]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04d-femoral">
  <h2>Femoral üçgen ve terminal dallar</h2>
  <p class="intro">Lomber pleksusun en büyük dalı olan femoral sinir (L2–L4), ön uyluk kaslarını ve derisini innerve eder. [[K5 s. 198]]</p>
  <div class="viz"><div class="viz-head"><h3>Femoral kılıf ile sinirin ilişkisi</h3></div><div data-viz="an04d_femoral"></div><p class="viz-cap" aria-live="polite">Önce inguinal bağı, ardından altından geçen damarları bulun. Femoral üçgenin tabanında sinir, arterin bir parmak genişliği lateralinde iliakusun üzerinde yer alır. [[K5 s. 198]]</p></div>
  <dl class="an04d-bulgular">
    <dt>Kasıkta yerleşim</dt><dd>Psoasın lateralinden çıkan sinir psoas–iliakus oluğunda iner, iki kasa da dal verir ve inguinal bağın altından geçer. [[K5 s. 198]] Üçgenin tabanında iliakus üzerinde, arterin bir parmak lateralindedir. [[K5 s. 198]] Arada psoasın bir parçası vardır. [[K5 s. 198]] Üçgene girer girmez ön ve arka bölümlerin terminal dallarına ayrılır. [[K5 s. 198]]</dd>
    <dt>Ön bölümün kas dalları</dt><dd>Pektineus dalı, femoral arter ve veni içeren kılıfın arkasından geçip kasa ön yüzünden girer. [[K5 s. 198–199]] Bazen aksesuar obturator sinir de pektineusu innerve eder. [[K5 s. 198–199]] Sartorius dalı intermediyer kutanöz sinirden veya onunla ortak kökten çıkar. [[K5 s. 199]] Kasın üst üçte birine medial yüzden girer. [[K5 s. 199]]</dd>
    <dt>Ön bölümün deri dalları</dt><dd>İntermediyer kutanöz sinirin iki dalı ön uyluk derisini dize kadar innerve eder. [[K5 s. 199]] Medial kutanöz sinir damarları mediale doğru çaprazlayıp ön ve arka dallarına ayrılır. [[K5 s. 199]] Ön dal distal üçte birde derin fasyayı delerek alt uyluğun medial derisine dize kadar ulaşır ve patellar pleksusla birleşir. [[K5 s. 199]]</dd>
    <dt>Medial kutanöz sinirin arka dalı</dt><dd>Sartoriusun arka kenarında deriye dallar verir, obturator ve safen sinirlerle bağlantı kurar. [[K5 s. 199]] Dizde derin fasyayı geçip bacağın medialinde obturator katkıyla ters orantılı bir deri alanını innerve eder. [[K5 s. 199]] Lateral, intermediyer ve medial kutanöz sinirlerin fasyadan çıkışları sartoriusun eğik hattı boyunca kademelenir. [[K5 s. 199]]</dd>
    <dt>Arka bölüm</dt><dd>Motor dallar kuadrisepsin dört başına, kutanöz dal safen sinire, eklem dalları kalça ve dize gider. [[K5 s. 198]] Rektus femoris dalı kasın başlangıcına yakın derin yüzden girer. [[K5 s. 199]] Kuadriseps içinde hem kalçaya hem dize etki eden tek baş rektus femoristir. [[K5 s. 199]] Yalnız onun siniri kalça eklemine dal verir (Hilton yasası). [[K5 s. 199]]</dd>
    <dt>Vastus dalları</dt><dd>Vastus medialis dalı kasa ulaşmak için Hunter kanalına girer. [[K5 s. 199]] Vastus intermedius dalı iki veya üçe ayrılabilir ve kasa önden girer. [[K5 s. 199]] İnce bir lif kası boydan boya geçerek onun ayrı bölümü olan artikülaris genuya ulaşır. [[K5 s. 199]] Bu kas ekstansiyonda dizin sinovyal membranını tepesinden yukarı çeker. [[K5 s. 199]] Vastus lateralis dalı rektus femorisin derininde, profunda femoristen gelen lateral sirkumfleks femoral arterin inen dalıyla birlikte ilerler. [[K5 s. 199]] Üç vastus dalının her biri dize ince bir eklem dalı verir. [[K5 s. 199]]</dd>
    <dt>Femoral blok alanı</dt><dd>İnguinal bağın hemen altında görece kolay uygulanan blok ön uyluğun tamamında, femur ve diz ekleminin büyük bölümünde anestezi sağlar. [[K5 s. 200]] Safen sinir aracılığıyla diz altındaki medial bacak derisi de etkilenir. [[K5 s. 200]]</dd>
    <dt>Kitaptaki stimülasyon tekniği</dt><dd>Femoral arterin 1–2 cm lateralinden 50 mm yalıtımlı iğne başa doğru 45° yönlendirilir. [[K5 s. 200]] Fasya lata ve iliopektineal fasyadan geçerken iki ayrı atlama hissedilir. [[K5 s. 200]] Kuadriseps yanıtı patellayı oynatır. [[K5 s. 200]] Yaklaşık 10–20 mL lokal anestezik femoral siniri bloke eder. [[K5 s. 200]]</dd>
    <dt>Üçü bir arada blok</dt><dd>Hacim 30–40 mL’ye çıkarılıp distale parmak basısı uygulanırsa obturator ve lateral kutanöz sinirler de bloke olabilir. [[K5 s. 200]]</dd>
  </dl>
  <details class="note plain"><summary>Ön uyluk için yapılan bir blok, dizin altındaki deri duyusunu ve kalça eklemine giden bir dalı nasıl etkileyebilir?</summary><p>Terminal dalları kas, deri ve eklem hedeflerine göre ayırın. Safen sinir femoral sinirin arka bölümünden gelir. [[K5 s. 199–200]] Bu yüzden bloktan sonra değişen duyu dizin altında medial bacakta da izlenebilir. [[K5 s. 199–200]] Kalçaya giden eklem dalını bulmak için rektus femorisin sinirini izleyin. [[K5 s. 199]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04d-safen">
  <h2>Safen siniri kanaldan ayak bileğine izleyin</h2>
  <p class="intro">Safen sinir femoral sinirin en büyük deri dalı ve arka bölümünün tek kutanöz dalıdır. [[K5 s. 199]]</p>
  <div class="viz"><div class="viz-head"><h3>Addüktör kanaldan medial malleole</h3></div><div data-viz="an04d_safen"></div><p class="viz-cap" aria-live="polite">İlk görünümde safen siniri femoral arterin lateralinden medialine izleyin. [[K5 s. 199]] İkinci görünümde büyük safen ven ile sinirin medial malleolün önünden birlikte geçişini bulun. [[K5 s. 199]]</p></div>
  <dl class="an04d-bulgular">
    <dt>Üçgen ve kanal</dt><dd>Femoral üçgende ayrılan safen sinir önce arterin lateralinden iner. [[K5 s. 199]] Hunter addüktör kanalında arterin önünden medialine geçer. [[K5 s. 199]] Kanalın alt bölümünden sartorius ile grasilis arasından çıkar. [[K5 s. 199]]</dd>
    <dt>Diz dalı</dt><dd>Kanaldan çıkar çıkmaz ayrılan infrapatellar dal sartoriusu deler. [[K5 s. 199]] Patellar pleksusa katılarak dizin hemen altındaki deriye dağılır. [[K5 s. 199]] Safen sinir dizde, tibianın üst ucu düzeyinde medialden cilt altı lokal anestezik infiltrasyonuyla bloke edilebilir. [[K5 s. 200]]</dd>
    <dt>Ayak bileği</dt><dd>Ana sinir tibianın medial kenarında büyük safen venin hemen arkasından iner. [[K5 s. 199]] İkisi medial malleolün önünden geçer. [[K5 s. 199]] Sinir ayak başparmağının tabanına kadar izlenebilir. [[K5 s. 199]] Diz, bacak, ayak bileği ve ayağın medialinde geniş bir deri alanının duyusunu taşır. [[K5 s. 199]] Venin ayak bileğinde cerrahi olarak açığa çıkarılması sırasında sinir zedelenebilir. [[K5 s. 199]]</dd>
  </dl>
  <details class="note plain"><summary>Diz iç yanında safen siniri düşünürken infrapatellar dal ile ana gövdeyi nasıl ayırırsınız?</summary><p>Çıkış noktasını addüktör kanalın alt ucunda bulun. Ana gövde sartorius ve grasilis arasından çıktıktan sonra tibia boyunca venle birlikte ayak bileğine iner. [[K5 s. 199]] İnfrapatellar dal ise kanaldan çıkışın hemen ardından ayrılır, sartoriusu deler ve dizin hemen altındaki deriye gider. [[K5 s. 199]] Bu kısa dalın patellar pleksusa katılmasını ana sinirin ayaktaki dağılımından ayrı tarif edin. [[K5 s. 199]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04d-obturator">
  <h2>Obturator kanal ve addüktörler</h2>
  <p class="intro">Obturator sinirin kanalda ayrılan iki dalı, uylukta addüktör brevisin karşılıklı yüzlerinde ilerler. [[K5 s. 200]]</p>
  <div class="viz"><div class="viz-head"><h3>İki dalın arasındaki kas</h3></div><div data-viz="an04d_obturator"></div><p class="viz-cap" aria-live="polite">Ön dalı addüktör brevisin yüzeyinde izleyin. Brevisin derinindeki arka dal, addüktör magnusun üzerinde aşağı iner. [[K5 s. 197]] [[K5 s. 200]]</p></div>
  <dl class="an04d-bulgular">
    <dt>Pelvik yol</dt><dd>L2–L4’ten gelen sinir pelvis girişinde psoasın medialinden çıkar, giriş kenarını aşağı ve öne çaprazlar. [[K5 s. 200]] Pelvis yan duvarında internal iliak damarların ve üreterin lateralinde seyreder. [[K5 s. 200]] İnternal iliak kökenli obturator damarların üstünden ve önünden kanala girer. [[K5 s. 200]]</dd>
    <dt>Ön dal</dt><dd>Obturator eksternusun üstünden uyluğa girer. [[K5 s. 200]] Brevisin önünde önce pektineusun, sonra addüktör longusun arkasından iner. [[K5 s. 200]] Longusu, grasilisi ve sıklıkla brevisi innerve eder. [[K5 s. 200]] Kalçaya eklem dalı verir ve femoral arter boyunca ince bir dal olarak sonlanır. [[K5 s. 197]] [[K5 s. 200]]</dd>
    <dt>Subsartoryal pleksus</dt><dd>Longusun alt kenarında ön dal, femoral sinirin medial kutanöz dalı ve safen sinirle birleşir. [[K5 s. 200]] Oluşan ağdan medial uyluk derisine ince dallar gider. [[K5 s. 200]]</dd>
    <dt>Arka dal</dt><dd>Obturator eksternusu deler ve innerve eder. [[K5 s. 200]] Obturator internusun innervasyonu sakral pleksustandır. [[K5 s. 200]] Brevisin arkasında, addüktör magnusun üzerinde iner. [[K5 s. 200]] Magnusa ve ön dalın beslemediği durumlarda brevise motor dal verir. [[K5 s. 200]] Magnus ayrıca siyatik sinirden lif alır. [[K5 s. 200]] Addüktör kanaldan popliteal fossaya uzanan terminal dal diz eklemine gider. [[K5 s. 197]] [[K5 s. 200]]</dd>
    <dt>Aksesuar obturator</dt><dd>Yaklaşık üç kişiden birinde L3–L4 kökenli aksesuar sinir psoasın medialinden çıkar. [[K5 s. 200]] Pubisin üst dalını çaprazlar, pektineusa ve kalça eklemine dallar verir. [[K5 s. 200–201]] Bağlantı dalı obturator sinirin ön bölümüne ulaşır. [[K5 s. 200–201]]</dd>
    <dt>Blok endikasyonları</dt><dd>Kalça eklem ağrısında veya hemipleji ve paraplejiye eşlik eden addüktör spazmında bazen obturator blok uygulanır. [[K5 s. 201]] Kitap, lomber pleksus bloklarının gelişmesiyle anestezide kullanımının azaldığını belirtir. [[K5 s. 201]]</dd>
    <dt>Pubik işaretler ve motor yanıt</dt><dd>Kitabın tarifinde giriş pubik tüberkülün 2 cm altı ve 2 cm lateralidir. [[K5 s. 201]] İğne arkaya ilerletildiğinde pubisin üst dalının alt kenarına temas eder. [[K5 s. 201]] Hafif geri çekilip laterale yöneltilerek kenar geçilir. [[K5 s. 201]] 2 cm daha ilerledikten sonra uyarıyla addüktör kasılmasının görülmesi konumu doğrular. [[K5 s. 201]]</dd>
  </dl>
  <details class="note plain"><summary>Addüktör brevisin iki yüzünde birer sinir dalı görüyorsunuz. Hangi dalı izlerseniz kalçaya, hangisini izlerseniz diz eklemine ulaşırsınız?</summary><p>Ön yüzdeki dalı izlediğinizde kalça eklemine giden bir dal bulursunuz. [[K5 s. 200]] Brevisin arkasındaki dal magnus üzerinde ilerler ve addüktör kanal üzerinden diz eklemine uzanır. [[K5 s. 200]] Yalnız brevisin motor innervasyonundan yola çıkarak iki dalı ayırmak güçtür. [[K5 s. 200]] Brevisi sıklıkla ön dal, o innerve etmiyorsa arka dal besler. [[K5 s. 200]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04d-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önerme için kararınızı verin, ardından gerekçesini açın.</p>
  <div class="viz"><div data-viz="mtf" data-q="an04d-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an04d-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an04d-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an04d-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Kalça cerrahisi için lomber pleksus bloğunu anlatın. Psoası kılavuz alarak hedef dalları, yüzey işaretlerini ve beklediğiniz uyarı yanıtını gösterin.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>L1–L3 ve L4’ün bir bölümünden gelen lifler transvers çıkıntıların önünde, psoas major içinde birleşir. [[K5 s. 192–193]]</li>
    <li>Femoral ve lateral kutanöz sinirler lateralden, obturator sinir medialden çıkar. [[K5 s. 194–196]] Genitofemoral sinir psoasın ön yüzünde izlenir. [[K5 s. 194–196]]</li>
    <li>Hasta hedef taraf üstte olacak şekilde yan yatar. [[K5 s. 195]] Dizler fleksiyondadır. [[K5 s. 195]] Giriş, interkristal çizgiyle spinöz orta hattın kesişiminden yaklaşık 4 cm lateraldedir. [[K5 s. 195]]</li>
    <li>Kuadriseps uyarısı patellayı oynatır. [[K5 s. 195]] Kalça fleksiyonu fazla derin, kuadratus lumborum kasılması fazla lateral konumla uyumludur. [[K5 s. 195]]</li>
    <li>Femoral, obturator ve lateral kutanöz sinirlerde blok beklenir. [[K5 s. 195]]</li>
  </ol>
  <div class="note"><b>Çizin.</b> Psoas ve iliakusu çizin. Femoral siniri iki kasın oluğundan femoral üçgene, safen dalı ise arterin lateralinden addüktör kanala ve arterin önünden medialine kadar izleyin. [[K5 s. 198–199]]</div>
  <h3>Olası ek sorular</h3><ul class="ozet"><li>Femoral üçgende sinir, arter ve kılıf birbirine göre nerededir?</li><li>Obturator sinirin iki dalını hangi kas ayırır ve hangi dal dize ulaşır?</li><li>Diz altında hangi duyu alanı femoral bloktan etkilenir?</li></ul>
</section>
<section class="wrap blk ders-sec" id="an04d-ozet">
  <h2>Özet</h2>
  <ul class="ozet"><li>Tipik interkostal sinir damarların altındadır. [[K5 s. 190–192]] T7–T11 karın duvarına dağılır, T10 göbeğe ulaşır. [[K5 s. 190–192]]</li><li>Psoasın ön yüzünde genitofemoral sinir, lateral kenarında femoral sinir, medialinde obturator sinir seçilir. [[K5 s. 194–198]]</li><li>Safen sinir addüktör kanalda femoral arteri önden çaprazlar. [[K5 s. 199–200]] Obturator sinirin dalları ise addüktör brevisin iki yanında ilerler. [[K5 s. 200]]</li></ul>
  <h3>Sinir Bloğu Atlası</h3>
  <ul class="an04d-baglar">
    <li><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=femoral">Femoral sinir bloğu</a></li>
    <li><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=fasyailiaka">Suprainguinal fasya iliaka bloğu</a></li>
    <li><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=peng">PENG (perikapsüler) bloğu</a></li>
    <li><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=adduktor">Addüktör kanal bloğu</a></li>
    <li><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=tap">Lateral TAP bloğu</a></li>
    <li><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=ql">Transmüsküler kuadratus lumborum bloğu</a></li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="04d"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/04c">← Brakiyal pleksus dalları ve üst ekstremite segmental innervasyonu</a><a href="#/dersler/anatomi/04e">Sonraki: Sakral pleksus ve siyatik sinir →</a></nav>
</section>`,
};
