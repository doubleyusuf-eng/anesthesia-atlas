/* Fizyoloji Bölüm 21 · Solunum işi (K1 İngilizce baskı s. 88–92).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz21.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz21-1'] = {
  no: 1, kok: 'Solunum işi ve bileşenleri için:', kagit: 'Paper A · fizyoloji, Bölüm 21', kaynak: '[[K1 s. 88]]',
  onermeler: [
    { t: 'Sakin tidal solunumun enerji gereksinimi bazal metabolizma hızının yaklaşık %10’udur.', d: false, n: "Yanlış. Sakin tidal solunum çok verimlidir: gereken enerji genellikle bazal metabolizma hızının %2'sinden azdır. Akciğer hastalığında bu pay BMR'nin %30'una kadar çıkabilir. [[K1 s. 88]]" },
    { t: '“Solunum işi” terimi çoğu zaman işin yapılma hızını anlatır; bu yüzden aslında bir güçtür ve watt ile ölçülür.', d: true, n: "Doğru. Terim genellikle tek bir soluğun işi değil, birim zamanda yapılan iştir; doğru adı solunum gücüdür, birimi watt (J/s). [[K1 s. 88]]" },
    { t: 'Normal akciğerde toplam solunum işinin büyük bölümünü rezistif iş oluşturur.', d: false, n: "Yanlış. Normal akciğerde işin büyük bölümü, yaklaşık %65'i, elastik iştir. [[K1 s. 88]]" },
    { t: 'Elastik işin bir bölümü potansiyel enerji olarak depolanır ve ekspirasyonda kullanılır.', d: true, n: "Doğru. Elastik kuvvetlere karşı yapılan işin tamamı ısıya gitmez; bir kısmı potansiyel enerji olarak depolanır ve ekspirasyonu sağlar. Rezistif işin enerjisi ise ısı (ve ses) olarak dağılır. [[K1 s. 88]]" },
    { t: 'Pulmoner fibrozis hem elastik işi hem de doku direncine karşı yapılan rezistif işi artırır.', d: true, n: "Doğru. Fibrozis parankimin kompliyansını azaltarak elastik işi, interstisyel doku miktarını artırarak doku direncine karşı yapılan rezistif işi artırır. [[K1 s. 88]]" },
  ],
};
VERI.sorular['fiz21-2'] = {
  no: 2, kok: 'Hava yolu direnci ve gaz akımı için:', kagit: 'Paper A · fizyoloji, Bölüm 21', kaynak: '[[K1 s. 88–90]]',
  onermeler: [
    { t: 'Reynolds sayısı gazın yoğunluğu arttıkça azalır.', d: false, n: "Yanlış. Re = vρd/η; yoğunluk (ρ) kesrin paydasında değil payındadır: yoğunluk arttıkça Re artar ve türbülan akım olasılığı büyür. Derin dalışta türbülansın artmasının nedeni budur. [[K1 s. 89]]" },
    { t: 'Helioksun düşük yoğunluğu Reynolds sayısını düşürür ve üst hava yolu obstrüksiyonunda türbülan akımı azaltır.', d: true, n: "Doğru. Obstrüksiyonun çevresinde artan gaz hızı türbülansa yol açar; helyum–O₂ karışımının düşük yoğunluğu Re'yi ve türbülansı azaltır. [[K1 s. 89]]" },
    { t: 'Laminer akımda bir hava yolunun yarıçapı yarıya inerse direnci 16 katına çıkar.', d: true, n: "Doğru. Hagen–Poiseuille denklemine göre R = 8ηl/πr⁴; direnç yarıçapın dördüncü kuvvetiyle ters orantılıdır: (1/0,5)⁴ = 16. [[K1 s. 89]]" },
    { t: 'Hava yolu direncinin esas oluştuğu yer, yarıçapları en küçük olan terminal bronşiyollerdir.', d: false, n: "Yanlış. Terminal bronşiyoller tek tek dar olsa da çok sayıdadır ve paraleldir; toplam kesit alanları çok büyüktür. Direncin esas oluştuğu yer lober bronşlar ile subsegmental bronşlar arasıdır. [[K1 s. 89]]" },
    { t: 'Zorlu ekspirasyonda dinamik hava yolu kompresyonu en çok kıkırdak desteği olan büyük bronşları daraltır.', d: false, n: "Yanlış. Pozitif intraplevral basınç kıkırdak desteği olmayan hava yollarını, özellikle bronşiyolleri sıkıştırır. KOAH'ta elastik doku yıkımı radyal çekimi azalttığı için bu hastalar özellikle yatkındır. [[K1 s. 89–90]]" },
  ],
};
VERI.sorular['fiz21-3'] = {
  no: 3, kok: 'Basınç–hacim halkası, akciğer hastalığı ve anestezi için:', kagit: 'Paper A · fizyoloji, Bölüm 21', kaynak: '[[K1 s. 90–91]]',
  onermeler: [
    { t: 'İnspirasyon grafiğinde üçgen biçimli X alanı elastik iştir ve potansiyel enerji olarak depolanır.', d: true, n: "Doğru. Kesikli diyagonal ile sınırlanan X üçgeni elastik iştir ve depolanır; geri kalan Y alanı ısı olarak dağılan rezistif iştir. [[K1 s. 90]]" },
    { t: 'Restriktif akciğer hastalığında ekspiratuvar rezistif iş depolanan potansiyel enerjiyi aşar ve ekspirasyon aktifleşir.', d: false, n: "Yanlış. Restriktif hastalıkta artan elastik iştir; hava yolu direnci değişmediği için rezistif iş normale benzer ve potansiyel enerji alanının içinde kalır. Ekspirasyon pasif kalır. [[K1 s. 90]]" },
    { t: 'Obstrüktif akciğer hastalığında hem inspiratuvar hem ekspiratuvar iş artar ve basınç–hacim halkası genişler.', d: true, n: "Doğru. Artmış hava yolu direncini yenmek için iki fazın işi de artmalıdır; grafikte bu daha geniş bir halkadır. Direnç yeterince yüksekse ekspirasyon eğrisi sola bombeleşir. [[K1 s. 90–91]]" },
    { t: 'Ekstrinsik PEEP, akciğer hacmini artırıp radyal çekimle hava yolu yarıçapını büyüterek direnci azaltır.', d: true, n: "Doğru. Anestezide direnci azaltan üç yoldan biridir; diğerleri volatil anesteziklerin bronkodilatasyonu ve faringeal kollapsa yatkın hastada LMA'dır. [[K1 s. 91]]" },
    { t: 'Yüksek konsantrasyondaki volatil anestezikler gaz karışımının yoğunluğunu artırır ve viskozitesini biraz azaltır; iki etki de türbülansı ve direnci artırır.', d: true, n: "Doğru. Re = vρd/η'de yoğunluk kesrin payında, viskozite paydasındadır: yoğunluğun artması da viskozitenin azalması da Re'yi yükseltir; türbülans ve direnç artar. Volatillerin bronkodilatör etkisi bunu kısmen dengeler. [[K1 s. 89, 91]]" },
  ],
};

const D21_NAV = [
  ['d21-tanim', 'Tanım ve bileşenler'], ['d21-turbulans', 'Türbülans'], ['d21-yaricap', 'Yarıçap'],
  ['d21-artiran', 'Yarıçapı küçültenler'], ['d21-grafik', 'Basınç–hacim halkası'], ['d21-hastalik', 'Restriktif ve obstrüktif'],
  ['d21-anestezi', 'Anestezi'], ['d21-p1', 'Part I'], ['d21-p2', 'Part II'], ['d21-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/21'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 21', baslik: 'Solunum işi',
  lede: 'Solunum kasları her solukta neye karşı çalışır ve harcanan enerji nereye gider? Bu bölüm elastik ve rezistif işi, hava yolu direncini belirleyen türbülansı ve yarıçapı, işin basınç–hacim halkasındaki yerini, restriktif ve obstrüktif hastalığı ve anestezinin hava yolu direncine etkisini işler. [[K1 s. 88–92]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D21_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d21-tanim">
  <h2>Solunum işi ve iki bileşeni</h2>
  <p class="intro">Solunum işi, solunum kaslarının solunum döngüsü boyunca tükettiği enerjidir; elastik iş ile rezistif işten oluşur. [[K1 s. 88]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Kasların enerjisi nereye gider?</h3></div>
    <div data-viz="f21_bilesen"></div>
    <p class="viz-cap" aria-live="polite">Normal akciğerde işin ≈%65'i elastik iştir ve bir kısmı potansiyel enerji olarak ekspirasyona saklanır; rezistif iş ısı (ve ses) olarak dağılır. Bir hastalığa dokunun: artırdığı kuvvet vurgulanır. [[K1 s. 88]]</p>
  </div>
  <div class="blk-body">
    <p>Tek bir soluğun işi basınç × hacimdir. "Solunum işi" ise çoğu zaman işin yapılma hızını anlatır; doğru adı <b>solunum gücüdür</b> ve watt (J/s) ile ölçülür. Sakin tidal solunum verimlidir: bazal metabolizma hızının (BMR) %2'sinden azını harcar. Akciğer hastalığında bu pay BMR'nin %30'una kadar çıkabilir; solunum kası yorgunluğu ve solunum yetmezliği gelişebilir. [[K1 s. 88]]</p>
    <p><b>Elastik iş</b> inspirasyonda göğüs duvarının (dışa), akciğer parankiminin (içe) ve alveoler yüzey geriliminin (içe) elastik kuvvetlerine karşı yapılır. Her birini artıran bir hastalık vardır: obezite göğüs duvarının dışa geri çekilmesine karşı koyar, pulmoner fibrozis parankimin kompliyansını azaltır, yenidoğanın solunum sıkıntısı sendromunda sürfaktan yetersizliği alveoler yüzey gerilimini artırır. [[K1 s. 88]]</p>
    <p><b>Rezistif iş</b> sürtünmeye karşı yapılır; enerjisi ısı ve ses olarak dağıldığı için "boşa" gider. Doku direnci, akciğer şişip sönerken dokuların birbirine sürtünmesidir; rezistif işin ≈%10'unu oluşturur ve pulmoner fibrozis gibi interstisyel dokuyu artıran durumlarda artar. Öbürü hava yolu direncidir: gaz molekülleri birbirine ve hava yolu duvarlarına sürtünür. [[K1 s. 88]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap denklemi İş (J) = Basınç (Pa) × Hacim (L) diye yazar; bu birimlerle sonuç milijouledür, joule için basınç kPa ya da hacim m³ alınmalıdır (1 kPa × 1 L = 1 J). Klinik birimlerle 1 cmH₂O × 1 L ≈ 0,098 J'dür.</div>
</section>

<section class="wrap blk ders-sec" id="d21-turbulans">
  <h2>Hava yolu direnci (1): türbülans ve Reynolds sayısı</h2>
  <p class="intro">Hava yolu direncini iki etken belirler, türbülans ve yarıçap; türbülan akım laminer akımdan çok daha dirençlidir. [[K1 s. 88]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Reynolds sayısı: laminer mi, türbülan mı?</h3></div>
    <div data-viz="f21_reynolds"></div>
    <p class="viz-cap" aria-live="polite">Gazı, akımı ve hava yolu çapını değiştirin: ortalama hız ve Reynolds sayısı hesaplanır, tüpteki akım çizgileri kitabın eşiklerine göre düzenli ya da girdaplı görünür. Hazır durumlar kitaptaki örneklere karşılık gelir. [[K1 s. 88–89]]</p>
    <p class="viz-foot">Re formülü ve 200/2000 eşikleri kitaptandır [[K1 s. 89]]. Gaz yoğunluk ve viskoziteleri, çaplar ve akımlar atlas için seçilmiş yaklaşık değerlerdir (desfluranda viskozitenin küçük azalması modelde yok); ortalama hız = akım / kesit alanı, bu yüzden aynı akımda çap büyüyünce hız ve Re düşer. Akım görünümü şematiktir.</p>
  </div>
  <div class="card basic" role="img" aria-label="Reynolds sayısı eşittir hız çarpı yoğunluk çarpı çap bölü viskozite" style="margin:14px 0">
    <span class="tag basic">Temel denklem · Reynolds sayısı</span>
    <p style="margin-top:10px;font:700 clamp(18px,2.4vw,24px)/1.3 var(--f-mono)">Re = v · ρ · d / η</p>
    <p class="small" style="margin-top:6px">Akımın laminerden türbülana geçtiği noktayı tahmin eder. v gaz akımının hızı, ρ gazın yoğunluğu, d hava yolunun çapı, η gazın viskozitesi. Re 2000'de akımın türbülan olma olasılığı %80, Re 200'de laminer olma olasılığı %80'dir. [[K1 s. 89]]</p>
  </div>
  <div class="blk-body">
    <p>Normal tidal solunumda akım genellikle yalnız trakeada türbülandır; tepe inspiratuvar akımda büyük bronşlarda da türbülanlaşabilir. Türbülansı artıranlar: [[K1 s. 88–89]]</p>
    <ul>
      <li><b>Yüksek RR:</b> gaz hızlanır; büyük bronşlarda akım döngünün daha uzun bölümünde türbülan olur ve direnç artar. [[K1 s. 88–89]]</li>
      <li><b>Geniş hava yolu:</b> türbülans trakea gibi büyük üst hava yollarında sıktır; bu yüzden üzerlerinde bronşiyal solunum sesi fizyolojik olarak duyulur. Sempatik bronkodilatasyon daha yüksek alveoler ventilasyona izin verir ama türbülan akımı da artırır. [[K1 s. 89]]</li>
      <li><b>Üst hava yolu obstrüksiyonu</b> (laringeal ödem, yabancı cisim): daralmanın çevresinde gaz hızlanır. Helyum–O₂ karışımı olan helioksun düşük yoğunluğu Re'yi düşürür; tedavide bazen kullanılır. [[K1 s. 89]]</li>
      <li><b>Derin dalış:</b> derinlikle barometrik basınç ve havanın yoğunluğu artar; Re türbülansı daha düşük gaz hızında öngörür ve normal tidal solunumda bile bronşlarda akım türbülanlaşır. Dalgıçların He–O₂ karışımı laminer akımı kolaylaştırır ve solunum işini azaltır. [[K1 s. 89]]</li>
    </ul>
  </div>
</section>

<section class="wrap blk ders-sec" id="d21-yaricap">
  <h2>Hava yolu direnci (2): yarıçap ve direncin yeri</h2>
  <p class="intro">Hagen–Poiseuille denklemine göre direnç yarıçapın dördüncü kuvvetiyle ters orantılıdır; yarıçaptaki küçük bir azalma direnci çok artırır. [[K1 s. 89]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Yarıçapın dördüncü kuvveti: tüp, ETT ve paralel dallar</h3></div>
    <div data-viz="f21_yaricap"></div>
    <p class="viz-cap" aria-live="polite">Yarıçapı kaydırın, bir tüp boyutu seçin ya da paralel dal sayısını değiştirin: laminer akımda direnç R = 8ηl/πr⁴ ile hesaplanır ve başlangıca göre kaç kat değiştiği gösterilir. [[K1 s. 89]]</p>
    <p class="viz-foot">Uzunluk ve viskozite sabit, değerler görecelidir [[K1 s. 89]]. Paralel dal modelinde her dal ana tüpün yarısı yarıçapta ve aynı uzunluktadır (şematik); gerçek tüplerde bağlantılar ve türbülans direnci daha da artırır.</p>
  </div>
  <div class="cols" style="margin:14px 0">
    <div class="card basic" role="img" aria-label="Delta P eşittir 8 çarpı akım çarpı viskozite çarpı uzunluk bölü pi çarpı yarıçapın dördüncü kuvveti">
      <span class="tag basic">Hagen–Poiseuille</span>
      <p style="margin-top:10px;font:700 clamp(18px,2.4vw,23px)/1.3 var(--f-mono)">ΔP = 8 Q̇ η l / π r⁴</p>
      <p class="small" style="margin-top:6px">ΔP tüp boyunca basınç düşüşü, Q̇ akım, η viskozite, l tüp uzunluğu, r yarıçap. [[K1 s. 89]]</p>
    </div>
    <div class="card clin" role="img" aria-label="Delta P eşittir akım çarpı direnç; direnç eşittir 8 çarpı viskozite çarpı uzunluk bölü pi çarpı yarıçapın dördüncü kuvveti">
      <span class="tag clin">Darcy yasası · direnç</span>
      <p style="margin-top:10px;font:700 clamp(18px,2.4vw,23px)/1.3 var(--f-mono)">ΔP = Q̇ × R → R = 8 η l / π r⁴</p>
      <p class="small" style="margin-top:6px">Ohm yasasının karşılığı: potansiyel farkı = akım × direnç. [[K1 s. 89]]</p>
    </div>
  </div>
  <div class="blk-body">
    <p>Denkleme tek başına bakılırsa en yüksek direnç en dar yollarda, terminal bronşiyollerde beklenir. Oysa terminal bronşiyoller çok sayıda ve paraleldir; toplam kesit alanları proksimal hava yollarınınkinden çok büyüktür. Direncin esas yeri <b>lober bronşlar ile subsegmental bronşlar arasıdır</b>. [[K1 s. 89]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap bir cümlede direncin r⁴ ile "orantılı" olduğunu yazar; kendi denkleminin gösterdiği gibi direnç r⁴ ile ters orantılıdır (R ∝ 1/r⁴). Yarıçap %10 azalırsa direnç ≈ %50, yarıya inerse 16 kat artar.</div>
</section>

<section class="wrap blk ders-sec" id="d21-artiran">
  <h2>Yarıçapı küçültenler: bronkokonstriksiyon, akciğer hacmi, dinamik kompresyon</h2>
  <p class="intro">Hava yolu yarıçapını üç durum küçültür ve direnci artırır: bronkokonstriksiyon, düşük akciğer hacmi ve dinamik hava yolu kompresyonu. [[K1 s. 89–90]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Radyal çekim ve dinamik hava yolu kompresyonu</h3></div>
    <div data-viz="f21_cekim"></div>
    <p class="viz-cap" aria-live="polite">Bir durum seçin ya da akciğer hacmini kaydırın, zorlu ekspirasyonu ve KOAH'ı açıp kapatın: kıkırdaksız küçük hava yolunun yarıçapı ve buna bağlı direnci değişir, kıkırdak destekli bronş açık kalır. [[K1 s. 89–90]]</p>
    <p class="viz-foot">Şematik model: yarıçap ve direnç FRC'deki sağlıklı küçük hava yoluna göre görecelidir, direnç 1/r⁴ ile hesaplanır [[K1 s. 89]]; hacim, çekim ve sıkışma katsayıları ölçüm değil, atlas seçimidir.</p>
  </div>
  <div class="blk-body">
    <p><b>Bronkokonstriksiyon</b> küçük hava yollarını fizyolojik olarak parasempatik aktivasyonda, patolojik olarak astım ve kronik obstrüktif akciğer hastalığında (KOAH) daraltır. [[K1 s. 89]]</p>
    <p><b>Akciğer hacmi</b> radyal çekimle yarıçapı belirler: inspirasyonda parankim hava yollarını açar, ekspirasyonda yarıçap küçülür ve direnç artar. Astım ve KOAH hastalarının ekspirasyonda inspirasyondan daha çok zorlanmasının bir nedeni budur. [[K1 s. 89]]</p>
    <p><b>Dinamik hava yolu kompresyonu:</b> zorlu ekspirasyonda kaslar pozitif intraplevral basınç oluşturur ve kıkırdak desteği olmayan hava yollarını, özellikle bronşiyolleri, sıkıştırır. KOAH'ta parankimin destekleyici elastik dokusu yıkıldığı için radyal çekim azalır; bu hastalar dinamik kompresyona özellikle yatkındır. [[K1 s. 89–90]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d21-grafik">
  <h2>İşin grafikteki yeri: basınç–hacim halkası</h2>
  <p class="intro">İş = basınç × hacim olduğu için bir soluğun işi basınç–hacim grafiğinde bir alandır. [[K1 s. 90]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Bir soluğun işi: halkayı adım adım okuyun</h3></div>
    <div data-viz="f21_halka"></div>
    <p class="viz-cap" aria-live="polite">İleri düğmesiyle bir tidal solukta ilerleyin: önce ideal çizgi, sonra inspirasyon ve X ile Y alanları, ardından ekspirasyon ve Z alanı. Yandaki enerji çubukları her alanın nereye gittiğini gösterir. [[K1 s. 90]]</p>
    <p class="viz-foot">Kitabın Şekil 21.1'inden esinlenen şematik çizim: FRC'de intraplevral basınç −5 cmH₂O [[K1 s. 27]], VT 0,5 L, kompliyans 0,2 L/cmH₂O [[K1 s. 82]]; X:Y oranı %65 elastik paya göre ayarlı [[K1 s. 88]]. Eğri biçimi ve mJ değerleri modeldir (1 cmH₂O·L ≈ 0,098 J); yatay eksen intraplevral basınç olduğundan göğüs duvarının payı yoktur.</p>
  </div>
  <div class="blk-body">
    <p>Halka histerezis gösterir: inspirasyon ve ekspirasyon eğrileri farklı yollar izler (Bölüm 20) ve aradaki alan dirence harcanıp ısıya giden enerjidir. Kesikli diyagonal, direncin olmadığı ideal akciğerdir; gerçek eğrinin ondan sapması akciğerin şişmesine karşı direnci gösterir. [[K1 s. 85, 90]]</p>
    <p>İnspirasyonda <b>X</b> üçgeni elastik iştir ve potansiyel enerji olarak depolanır; kalan <b>Y</b> alanı ısıya giden rezistif iştir. Ekspirasyonda X'in enerjisi kullanılır ve rezistif iş <b>Z</b> bundan karşılanır: Z, X'in içinde kaldıkça ekspirasyon pasiftir. Ekspirasyon sonunda kullanılmayan potansiyel enerji ısı olarak boşa gider. [[K1 s. 90]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d21-hastalik">
  <h2>Restriktif ve obstrüktif hastalıkta halka</h2>
  <p class="intro">Restriktif hastalık halkanın eğimini azaltıp elastik işi, obstrüktif hastalık halkayı genişletip rezistif işi artırır. [[K1 s. 90–91]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Kompliyans ve direnç: halkayı kendiniz değiştirin</h3></div>
    <div data-viz="f21_hastalik"></div>
    <p class="viz-cap" aria-live="polite">Bir hasta tipi seçin ya da kompliyansı ve hava yolu direncini kaydırın: halka yeniden çizilir, X, Y, Z ve gerekirse A alanları hesaplanır ve ekspirasyonun pasif mi aktif mi olduğu yazılır. [[K1 s. 90–91]]</p>
    <p class="viz-foot">Şematik model (Şekil 21.1 ve 21.2'den esinlenmiştir), temel değerler yukarıdaki halkayla aynı. Elastik iş X = VT² / 2C, rezistif alanlar direnç çarpanıyla orantılı; hazır durumların değerleri, mJ ve güç (12 soluk/dk) atlas modelidir. Z, X'in içinde kaldıkça ekspirasyon pasif sayılır [[K1 s. 90]].</p>
  </div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><span class="tag warn">Restriktif akciğer hastalığı</span>
      <p style="margin-top:8px">Akciğer kompliyansı azalmıştır: 500 mL'lik VT için daha yüksek (daha negatif) intraplevral basınç gerekir ve elastik iş artar. Hava yolu direnci değişmediğinden rezistif iş normale benzer ve potansiyel enerji alanının içinde kalır: ekspirasyon pasiftir. [[K1 s. 90]]</p>
    </div>
    <div class="card"><span class="tag crit">Obstrüktif akciğer hastalığı</span>
      <p style="margin-top:8px">Hava yolu direnci artmıştır: inspiratuvar ve ekspiratuvar iş artar, halka genişler. Direnç yeterince yüksekse ekspiratuvar iş depolanan enerjiyi aşar ve ekspirasyon eğrisi sola bombeleşir. KOAH'taki gibi kompliyans da artmışsa (genişleme az iş gerektirdiği için az enerji depolanır [[K1 s. 82]]) ekspirasyon aktifleşir; gölgeli <b>A</b> alanı ekspiratuvar kasların işidir. [[K1 s. 90–91]]</p>
    </div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d21-anestezi">
  <h2>Klinik önem: anestezi ve hava yolu direnci</h2>
  <p class="intro">Genel anestezi gaz akımına karşı direnci kaçınılmaz olarak artırır; nedenlerin bir kısmı yarıçapı küçültür, bir kısmı türbülansı artırır. [[K1 s. 91]]</p>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Etken</th><th>Ne olur?</th><th>Yol</th></tr></thead>
      <tbody>
        <tr><td colspan="3" class="small muted"><b>Direnci artıranlar</b> [[K1 s. 91]]</td></tr>
        <tr><th>Düşük akciğer hacmi</th><td>Solunum kası tonusunun kaybı, sırtüstü pozisyon ve fizyolojik PEEP'in kaybı. [[K1 s. 91]]</td><td>Radyal çekim ↓, yarıçap ↓</td></tr>
        <tr><th>Faringeal direnç</th><td>Entübe olmayan bazı hastalarda farinks kaslarının gevşemesi kısmi ya da tam üst hava yolu obstrüksiyonu yapar. [[K1 s. 91]]</td><td>Üst hava yolu daralır</td></tr>
        <tr><th>Hava yolu gereçleri</th><td>ETT trakeaya sığmak için dardır. Küçük çocuklarda solunum işi çok arttığından entübeyken çoğu zaman spontan solumalarına izin verilmez; kritik hastalar, ventilatörden ayırmada direnç düşük olsun diye olabildiğince geniş ETT ile entübe edilir. [[K1 s. 91]]</td><td>Yarıçap ↓ (1/r⁴)</td></tr>
        <tr><th>Anestezi devreleri</th><td>Direnci ihmal edilebilirden belirgine artırır: körüklü hortum, dirsek parçası ve yüksek gaz akımı türbülans yapar; ısı-nem değiştirici (HME) ve APL valfi direnci daha da artırır. [[K1 s. 91]]</td><td>Türbülans, ek direnç</td></tr>
        <tr><th>Artmış inspiratuvar akım</th><td>Gereçler ve devreler mekanik ölü boşluğu artırır; V̇A'yı korumak için V̇E ve inspiratuvar akım artar. [[K1 s. 91]]</td><td>Türbülans</td></tr>
        <tr><th>Volatil anestezikler</th><td>Özellikle yüksek konsantrasyonda gaz karışımının yoğunluğunu belirgin artırır, viskozitesini biraz azaltır. [[K1 s. 91]]</td><td>Re ↑ (ρ ↑, η ↓): türbülans</td></tr>
        <tr><td colspan="3" class="small muted"><b>Direnci azaltanlar</b> [[K1 s. 91–92]]</td></tr>
        <tr><th>Bronkodilatasyon</th><td>Güncel volatillerin hepsi güçlü bronkodilatördür; anestezinin akciğer hacmine ve volatillerin gaz yoğunluğuna etkisini kısmen dengeler. Halotan vagal tonus etkisiyle özellikle güçlüdür. [[K1 s. 91]]</td><td>Küçük hava yolu yarıçapı ↑</td></tr>
        <tr><th>Ekstrinsik PEEP</th><td>Akciğer hacmini artırır. [[K1 s. 91]]</td><td>Radyal çekim ↑, yarıçap ↑</td></tr>
        <tr><th>Laringeal maske (LMA)</th><td>Faringeal kollapsa yatkın hastada farinks dokularını açık tutar (stentler). [[K1 s. 91–92]]</td><td>Üst hava yolu açılır</td></tr>
      </tbody>
    </table>
  </div>
  <p style="margin-top:14px">Genel anestezide spontan soluyacak hastada hava yolu direnci olabildiğince azaltılmalıdır; LMA'lar bunun için tasarlanmıştır, tüpleri geniştir. [[K1 s. 92]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap güncel volatillerin hepsini güçlü bronkodilatör sayar; desfluran ise hava yolunu irrite eder ve özellikle sigara içenlerde, yüksek konsantrasyonda direnci azaltmayabilir, artırabilir. Reaktif hava yolunda bronkodilatasyon için tercih edilen volatil sevoflurandır.</div>
</section>

<section class="wrap blk ders-sec" id="d21-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sayılar, yönler ve sınıflamalar üzerinden sorulur: sakin solunumun BMR içindeki payı ve %65'lik elastik pay; elastik ve rezistif işi artıran hastalıklar; Reynolds sayısındaki değişkenlerin yönü; direncin yarıçapın dördüncü kuvvetiyle ters orantılı olması ve esas olarak nerede oluştuğu; dinamik kompresyonun hangi hava yollarını sıkıştırdığı; basınç–hacim halkasındaki alanlar ve restriktif ile obstrüktif hastalıktaki farkları; anestezinin direnci artıran ve azaltan etkenleri. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz21-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz21-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz21-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d21-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Solunum işi nedir, hangi bileşenlerden oluşur? Normal bir soluğun işini basınç–hacim grafiğinde gösterin. Obstrüktif ve restriktif hastalıkta grafik nasıl değişir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Solunum kaslarının solunum döngüsü boyunca tükettiği enerji; tek soluk için iş = basınç × hacim. Terim çoğu zaman işin hızını anlatır: aslında güçtür (W). Sakin solunumda BMR'nin &lt;%2'si, akciğer hastalığında %30'una kadar; sonuç kas yorgunluğu ve solunum yetmezliği olabilir. [[K1 s. 88]]</li>
    <li><b>İki bileşen.</b> Elastik iş (≈%65): göğüs duvarı, parankim, yüzey gerilimi; bir kısmı potansiyel enerji olarak depolanır (obezite, fibrozis, yenidoğanın solunum sıkıntısı sendromu artırır). Rezistif iş: sürtünme, ısı ve ses; doku direnci (≈%10, fibrozis artırır) ve hava yolu direnci. [[K1 s. 88]]</li>
    <li><b>Hava yolu direncini ne belirler?</b> Türbülans: Re = vρd/η, Re 2000'de %80 türbülan. Yarıçap: Hagen–Poiseuille, R = 8ηl/πr⁴; direnç 1/r⁴. Paralel düzen nedeniyle direncin esas yeri lober ile subsegmental bronşlar arasıdır. [[K1 s. 88–89]]</li>
    <li><b>Direnci artıranlar.</b> Türbülans: yüksek RR, geniş hava yolu, üst hava yolu obstrüksiyonu (helioks azaltır), dalış. Yarıçap: bronkokonstriksiyon, düşük akciğer hacmi (radyal çekim), dinamik kompresyon (KOAH). [[K1 s. 89–90]]</li>
    <li><b>Grafiği çizin.</b> Yatay eksen intraplevral basınç, dikey eksen hacim. Kesikli diyagonal ideal akciğerdir; inspirasyonda X üçgeni elastik iş (depolanır), Y rezistif iş (ısı). Ekspirasyonda Z, X'in içinde kaldıkça ekspirasyon pasiftir; kullanılmayan enerji ısıya gider. İki eğri arasındaki histerezis alanı ısıya giden rezistif iştir. [[K1 s. 90]]</li>
    <li><b>Hastalıkta değişim.</b> Restriktif: eğim azalır, daha negatif basınç, elastik iş artar, rezistif iş aynı, ekspirasyon pasif. Obstrüktif: halka genişler; direnç yüksekse ekspirasyon eğrisi sola bombeleşir; KOAH'ta kompliyans da arttığı için ekspirasyon aktifleşir (A alanı). [[K1 s. 90–91]]</li>
    <li><b>Anesteziyle bitirin.</b> Genel anestezi direnci artırır: düşük akciğer hacmi, farinks, ETT, devre, artmış akım, gaz yoğunluğu. Azaltanlar: volatillerin bronkodilatasyonu, ekstrinsik PEEP, LMA. Spontan solunumda direnç en aza indirilmeli; çocuklarda ve ventilatörden ayırmada geniş ETT. [[K1 s. 91–92]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim iki basınç–hacim grafiğidir. Birincisi normal soluk: FRC'den VT'ye kesikli diyagonal, sağında inspirasyon eğrisi (Y), solunda ekspirasyon eğrisi (Z), diyagonalin üst-solunda X üçgeni. İkincisi aynı eksende restriktif (daha yatık diyagonal, daha büyük X) ve obstrüktif (geniş halka, sola taşan ekspirasyon eğrisi ve A alanı) eğriler.</div>
    <div class="note plain"><b>Olası ek sorular.</b> İş neden basınç × hacimdir, birimi nedir? Reynolds sayısındaki değişkenler nelerdir, helioks neden işe yarar? ETT yarıçapını küçültmek direnci nasıl değiştirir? Neden en dar hava yolları en çok direnci oluşturmaz? Astımlı hasta neden ekspirasyonda daha çok zorlanır? Dinamik hava yolu kompresyonu nedir, KOAH'ta neden belirgindir? Küçük çocukların entübeyken spontan soluması neden istenmez? Volatil anestezikler hava yolu direncini hangi yollarla etkiler? Cevapların hepsi yukarıda. [[K1 s. 88–92]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d21-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Solunum işi, solunum kaslarının solunum döngüsü boyunca tükettiği enerjidir; iş = basınç × hacim, ama terim çoğu zaman gücü (W) anlatır. Sakin solunumda BMR'nin &lt;%2'si, hastalıkta %30'una kadar. [[K1 s. 88]]</li>
    <li>Elastik iş (≈%65): göğüs duvarı, parankim, yüzey gerilimi; bir kısmı depolanır. Rezistif iş: doku (≈%10) ve hava yolu direnci; ısı olarak dağılır. [[K1 s. 88]]</li>
    <li>Türbülan akım laminerden çok daha dirençlidir; Re = vρd/η. Normal tidal solunumda türbülans genellikle yalnız trakeadadır. [[K1 s. 88–89]]</li>
    <li>Laminer akımda R = 8ηl/πr⁴: direnç yarıçapın dördüncü kuvvetiyle ters orantılıdır. Direncin esas yeri lober ile subsegmental bronşlar arasıdır. [[K1 s. 89]]</li>
    <li>Direnci artıranlar: yüksek RR, geniş hava yolu, üst hava yolu obstrüksiyonu (helioks azaltır), dalış; bronkokonstriksiyon, düşük akciğer hacmi, dinamik hava yolu kompresyonu (KOAH). [[K1 s. 89–90]]</li>
    <li>Basınç–hacim grafiğinde X elastik iştir ve depolanır, Y ve Z rezistif iştir; Z X'in içinde kaldıkça ekspirasyon pasiftir. [[K1 s. 90]]</li>
    <li>Restriktif hastalıkta elastik iş artar, ekspirasyon pasif kalır; obstrüktif hastalıkta halka genişler, KOAH'ta ekspirasyon aktifleşir (A alanı). [[K1 s. 90–91]]</li>
    <li>Genel anestezi direnci artırır (akciğer hacmi, farinks, ETT, devre, akım, yoğunluk); volatiller, ekstrinsik PEEP ve LMA azaltır. [[K1 s. 91–92]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="21"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/20">← Bölüm 20 · Akciğer kompliyansı</a>
    <a href="#/dersler/fizyoloji/22">Sonraki: Bölüm 22 · Ventilasyonun kontrolü →</a>
  </nav>
</section>`,
};
