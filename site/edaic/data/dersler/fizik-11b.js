VERI.sorular = VERI.sorular || {};

VERI.sorular['fk11b-1'] = {
  no: 1, kok: 'Paramanyetik oksijen ölçümünü değerlendirin.', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 199–201]]',
  onermeler: [
    { t: 'Oksijen molekülünün dış kabuğundaki elektronların tümü eşleşmiştir.', d: false, n: 'Oksijenin manyetik alana çekilmesi eşleşmemiş elektronlarıyla ilişkilidir. [[K6 s. 199]]' },
    { t: 'Oksijen, azot dolu kürelerin mıknatıstan uzaklaşmasına yol açar.', d: true, n: 'Alan oksijeni çekince zayıf diyamanyetik azot içeren küreler yer değiştirir ve kol döner. [[K6 s. 200]]' },
    { t: 'Sıfır sapmalı analizör soluk içindeki hızlı değişimleri izlemeye uygundur.', d: false, n: 'Yaklaşık 10 saniyelik yanıt süresi bu kullanımı sınırlar. [[K6 s. 200]]' },
    { t: 'Darbeli alanlı analizörde referans gaz genellikle oda havasıdır.', d: true, n: 'Devreden çekilen gaz analizör içinde genellikle oda havasıyla karışır. [[K6 s. 201]]' },
    { t: 'Darbeli alanlı analizörün ölçtüğü sinyal aynadan yansıyan ışıktır.', d: false, n: 'Çift taraflı basınç dönüştürücüsü, örnek ile referans arasındaki oksijen kısmi basınç farkını algılamayı sağlar. [[K6 s. 201]]' },
  ],
};

VERI.sorular['fk11b-2'] = {
  no: 2, kok: 'Yakıt hücresi ve kan gazı elektrotları için karar verin.', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 202–207]]',
  onermeler: [
    { t: 'Galvanik yakıt hücresi ölçüm akımını kendisi üretir.', d: true, n: 'Oksijenin katottaki tepkimesiyle dış besleme gerekmeksizin akım elde edilir. [[K6 s. 202]]' },
    { t: 'Clark elektrodunun katodu altın ağdan yapılır.', d: false, n: 'Clark katodu platindir. [[K6 s. 204]]' },
    { t: 'Clark elektroduna yaklaşık 0,6 V sabit gerilim uygulanır.', d: true, n: 'Bu gerilim platin katot ile Ag/AgCl anot arasına uygulanır. [[K6 s. 204]]' },
    { t: 'Sanz elektrodunun referans elektrodu doymuş potasyum klorür çözeltisindedir.', d: true, n: 'Referans elektrot bu çözeltiye daldırılmış Ag/AgCl elektrodudur. [[K6 s. 205]]' },
    { t: 'Severinghaus elektrodu karbondioksiti ölçerken pH değişiminden yararlanır.', d: true, n: 'Cam elektrot bikarbonat tamponundaki hidrojen iyonu değişimini algılar. [[K6 s. 206–207]]' },
  ],
};

VERI.sorular['fk11b-3'] = {
  no: 3, kok: 'Gaz karışımlarının analizini değerlendirin.', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 208–209]]',
  onermeler: [
    { t: 'Kromatogramda pik yüksekliği bileşiğin kolondan geçiş süresini verir.', d: false, n: 'Geçiş süresini pikin zaman eksenindeki yeri, derişimi ise yüksekliği gösterir. [[K6 s. 208]]' },
    { t: 'Kütle spektrometresinde iyonlaşan örnek gaz hastaya geri verilebilir.', d: false, n: 'Gaz iyonlaştırıldığı için hastaya geri verilemez. [[K6 s. 208]]' },
    { t: 'Kütle spektrometresi iyonları yük/kütle oranlarına göre ayırır.', d: true, n: 'Elektrik alanında hızlanan iyonlar manyetik alanda farklı ölçülerde sapar. [[K6 s. 208]]' },
    { t: 'Raman saçılmasında çıkan fotonun enerjisi gelen fotonunkinden farklıdır.', d: true, n: 'Elektron başlangıçtakinden farklı bir enerji düzeyine döner. [[K6 s. 209]]' },
    { t: 'Raman spektroskobunda saçılan ışık lazer demetine dik yönde ölçülür.', d: true, n: 'Örnek haznesinden geçen tek renkli argon lazerinin doğrultusuyla algılama doğrultusu dik açı yapar. [[K6 s. 209]]' },
  ],
};

const FK11B_NAV = [["denge","Burulma terazisi"],["darbe","Darbeli alan"],["hucre","Yakıt hücresi"],["ornek","Arter kanı"],["clark","Clark"],["cam","Sanz ve Severinghaus"],["kolon","Kromatografi"],["kutle","Kütle spektrometrisi"],["raman","Raman"],["p1","Part I"],["p2","Part II"],["ozet","Özet"]];
SAYFALAR['dersler/fizik/11b'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 11 · Ders 11b',
  baslik: 'Paramanyetik oksijen analizörü, elektrokimyasal hücreler ve kan gazı elektrotları',
  lede: 'Oksijen, gaz örneğinde manyetik etkisiyle veya bir hücrede ürettiği akımla ölçülebilir. [[K6 s. 199–203]] Kan gazı analizöründe ise oksijen, karbondioksit ve pH için ayrı elektrotlar bulunur. [[K6 s. 204]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK11B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="fk11b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk11b-denge">
<h2>Oksijen terazinin kolunu nasıl döndürür?</h2><p class="intro">Oksijen molekülünün dış kabuğundaki eşleşmemiş elektronlar, gaz hâlindeki oksijenin manyetik alana zayıfça çekilmesini sağlar. [[K6 s. 199]]</p>
<div class="viz"><div class="viz-head"><h3>Burulma terazisinin parçalarını bulun</h3></div><div data-viz="fk11b_terazi"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kürelerden birini seçin, sonra ayna ile askıyı bulun. Mıknatısın çektiği gaz örnekteki oksijendir, kolla birlikte yer değiştiren gaz ise kürelerin içindeki azottur. [[K6 s. 199–200]]</p></div>
<p>Oksijen −183 °C’de sıvı hâlde bulunur ve paramanyetik etkisi manyetik alanda asılı kalmasına yetecek kadar güçlenir. [[K6 s. 199]] Oda sıcaklığında bu etki zayıftır, ancak havanın diğer ana bileşenlerinde görülmediği için gaz karışımındaki oksijen derişimini ölçmeye elverişlidir. [[K6 s. 199–200]]</p>
<ol class="iskelet"><li><b>Başlangıç konumu.</b> Örnek haznesindeki burulma terazisinde bir kolun uçlarına azot dolu iki küre bağlanmıştır. [[K6 s. 200]] Oksijen yokken küreler güçlü mıknatısın kutupları üzerinde dengede kalır. [[K6 s. 200]]</li>
<li><b>Örnekte oksijen varken.</b> Manyetik alana çekilen oksijen, zayıf diyamanyetik azot içeren küreleri kutuplardan uzaklaştırır ve kol döner. [[K6 s. 200]]</li>
<li><b>Optik okuma.</b> Kola bağlı ayna da döndüğünden aynadan ölçeğe yansıyan ışık noktası yer değiştirir. [[K6 s. 200]] Kullanıcı oksijen derişimini bu ölçekten okur. [[K6 s. 200]]</li></ol>
<p><b>Kullanım sınırı.</b> Sıfır sapmalı analizörün doğruluğu yüksektir, ancak su buharı, titreşim ve özellikle yüksek akımlardaki ventilasyon basıncı değişimleri okumayı bozabilir. [[K6 s. 200]] Yaklaşık 10 saniyelik yavaş yanıtı nedeniyle gerçek zamanlı ekspiryum gazı izlemine uygun değildir; kullanımı solunum gazı beslemesindeki oksijenin ölçümüyle sınırlıdır. [[K6 s. 200]]</p>
</section>

<section class="wrap blk ders-sec" id="fk11b-darbe">
<h2>Darbeli manyetik alan</h2><p class="intro">Darbeli alanlı analizör de oksijenin paramanyetik özelliğinden yararlanır, ancak ölçülen sinyal iki gaz arasındaki basınç farkıdır. [[K6 s. 200–201]]</p>
<div class="viz"><div class="viz-head"><h3>Referansla örneği karşılaştırın</h3></div><div data-viz="fk11b_darbe"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Aynı örnek için alanı kapatıp açın. Ardından alan açıkken referansın üzerindeki oksijen miktarını değiştirin. Gösterge, oksijenin alanda birikmesinin doğurduğu basınç farkını göreli olarak gösterir. [[K6 s. 201]]</p></div>
<p>Solunum devresinden çekilen gaz, analizör içinde genellikle oda havası olan referans gazla karışır. [[K6 s. 201]] Manyetik alan açıldığında oksijen alana çekilir ve burada birikir. [[K6 s. 201]] Çift taraflı basınç dönüştürücüsünün bir yüzünde basıncın yükselmesi, örnek ve referans gazlarının oksijen kısmi basınçları arasındaki farkı yansıtır. [[K6 s. 201]]</p>
<p>Uygulamada manyetik alan art arda açılıp kapanır ve tipik olarak yaklaşık 100 Hz frekansında değişen bir basınç oluşturur. [[K6 s. 201]] Bu hızlı yanıt, solunum döngüsü boyunca oksijen derişiminin izlenmesini sağlar. [[K6 s. 209]]</p>
<details class="card"><summary>Bir analizörde titreşim, diğerinde basınç neden önemlidir?</summary><p>Burulma terazisinde ölçülen şey, askıdaki kolun konumudur. [[K6 s. 200]] Titreşimin veya ventilasyon basıncındaki değişimin oynattığı kol da aynadaki ışık noktasını kaydırabilir. [[K6 s. 200]] Darbeli analizörde ise alanın açılıp kapanmasıyla ortaya çıkan basınç değişimi ölçümün kendisidir. [[K6 s. 201]] Bu nedenle iki cihazı karşılaştırırken önce hangi hareketin algılandığını belirleyin.</p></details>
</section>

<section class="wrap blk ders-sec" id="fk11b-hucre">
<h2>Kimyasal tepkimeden ölçüm akımına</h2><p class="intro">Elektrokimyasal hücre, bir kimyasal tepkimeyle elektrik akımı üretir. [[K6 s. 201]] Galvanik yakıt hücresinde tepkimenin başlaması için gereken bileşen oksijendir. [[K6 s. 202]]</p>
<div class="viz"><div class="viz-head"><h3>Altın ağdan kurşun anoda</h3></div><div data-viz="fk11b_yakit"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Üstteki ağdan başlayarak sıvı tabakayı ve alttaki metali seçin. Ölçüm sırasında oksijen katotta alınırken hücrenin ömrünü sınırlayan madde anotta tüketilir. [[K6 s. 202–203]]</p></div>
<div class="viz"><div class="viz-head"><h3>Genel hücrede akım ile katyonun yolları</h3></div><div data-viz="fk11b_devre"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Önce ampulün bağlı olduğu metal yolu, sonra elektrolitin içindeki yolu izleyin. Ok, seçilen yola göre dış devredeki konvansiyonel akımı veya çözeltideki pozitif iyonların hareketini gösterir. [[K6 s. 201]]</p></div>
<p><b>Yük nasıl taşınır?</b> Proton ve elektron sayısı farklı bir tanecik iyondur. [[K6 s. 201–202]] Pozitif yüklü iyona katyon, negatif yüklü iyona anyon denir. [[K6 s. 201–202]] Genel bir hücrede devre kapanınca anot metali elektron kaybederek yükseltgenir ve oluşan katyonlar katoda yönelir. [[K6 s. 201]] Dış devrede konvansiyonel akım katottan ampul üzerinden anoda gider. [[K6 s. 201]]</p>
<p>Metaller ve elektrolitler değiştikçe farklı hücreler elde edilir. [[K6 s. 201]] Kurşun-asitli otomobil aküsü, alkalin pil ve şarj edilebilir nikel-kadmiyum pil bu çeşitliliğe örnektir. [[K6 s. 201]]</p>
<ol class="iskelet"><li><b>Katot.</b> Altın ağ katotta oksijenin tepkimeye girmesiyle hidroksit iyonları oluşur. [[K6 s. 202]]</li><li><b>Elektrolit.</b> İki elektrodu ayıran potasyum hidroksit çözeltisindeki hidroksit iyonları kurşun anoda göç eder. [[K6 s. 202–203]]</li><li><b>Anot.</b> Anottaki tepkime elektron akışı sağlar ve kurşun zamanla tüketilir. [[K6 s. 203]]</li></ol>
<p class="fk11b-denklem">Katot: O<sub>2</sub> + 4e<sup>−</sup> + 2H<sub>2</sub>O → 4OH<sup>−</sup> [[K6 s. 202–203]]<br>Anot: Pb + 2OH<sup>−</sup> → PbO + H<sub>2</sub>O + 2e<sup>−</sup> [[K6 s. 203]]</p><p>Pb kurşunu, PbO kurşun oksidi gösterir; anotta açığa çıkan elektronların akışı ölçüm akımını oluşturur. [[K6 s. 203]]</p>
<p>Hücrenin ürettiği akım katotta alınan oksijen miktarıyla doğru orantılıdır. [[K6 s. 202]] Henry yasası uyarınca bu ilişki örnek gazın oksijen kısmi basıncı için de geçerlidir. [[K6 s. 202]] Oksijeni algılaması yönünden Clark elektroduna benzeyen hücre, ölçüm için dış güç kaynağı gerektirmez. [[K6 s. 202]]</p>
<div class="card"><h3>Doğru orantıyı okuyun</h3><p class="fk11b-denklem"><i>I</i> ∝ <i>P</i><sub>O₂</sub> [[K6 s. 202]]</p><p><i>I</i> hücrenin ürettiği elektrik akımını (amper), <i>P</i><sub>O₂</sub> örnek gazdaki oksijenin kısmi basıncını (örneğin kPa) gösterir. [[K6 s. 202]] Oksijenin kısmi basıncı aynı oranda artarsa katottaki alım ve buna bağlı akım da o oranda artar. [[K6 s. 202]] Böylece hücre, örnekte oksijenin bulunup bulunmadığını göstermenin yanı sıra miktarı hakkında da bilgi verir. [[K6 s. 202]]</p></div>
<ul class="ozet"><li><b>Yanıt ve sıcaklık.</b> Yanıt süresi 30 saniyeye kadar uzayabilir. [[K6 s. 203]] Bir termistör, sıcaklığın akımda oluşturduğu değişimi telafi eder. [[K6 s. 203]]</li><li><b>Hücre ömrü.</b> Kurşun anotun giderek küçülmesi kullanım ömrünü sınırlar. [[K6 s. 203]]</li>
<li><b>Azot protoksit.</b> Hücreye difüze olan N₂O kurşunla tepkimeye girip azot oluşturabilir. [[K6 s. 203]] Bunun sonucunda kısmi basınçlar değişebilir ve hücre zarar görebilir. [[K6 s. 203]] Yalnız N₂O verildiğinde kullanılan, bu gaza uyarlanmış yakıt hücreleri vardır. [[K6 s. 203]]</li>
<li><b>Kullanım.</b> Anestezi cihazında besleme gazının oksijen derişimini rutin olarak izler. [[K6 s. 203]] Hafif, güvenilir ve taşınabilir olması tüplü dalışta da kullanımını kolaylaştırır. [[K6 s. 203–204]]</li></ul>
<details class="card"><summary>Termistörün düzelttiği değişken hangisidir?</summary><p>Ölçüm akımı oksijen alımına bağlıdır, ancak sıcaklık değişince akım da değişebilir. [[K6 s. 202–203]] Termistörün görevi bu sıcaklık etkisini telafi etmektir. [[K6 s. 203]] N₂O hücreye girince farklı bir sorun ortaya çıkar: kurşunla kimyasal tepkime sonucunda gazın kısmi basınçları değişebilir ve hücre hasar görebilir. [[K6 s. 203]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk11b-ornek">
<h2>Arter kanı örneği ve ölçüm hataları</h2><p class="intro">Kan gazı analizörü, sensörleri, elektrolit çözeltilerini ve elektronik devreleri bir araya getirerek plazmadaki gaz kısmi basınçlarını ve pH’ı hızlı ve görece doğru ölçer. [[K6 s. 204]]</p>
<div class="viz"><div class="viz-head"><h3>Ölçüm zincirindeki hatayı bulun</h3></div><div data-viz="fk11b_ornek"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Bir hata kaynağı seçip hangi basamağın etkilendiğini inceleyin. Kabarcık örnekte ölçülecek gazı değiştirirken protein birikimi sensörün kanla temas eden yüzeyinde sorun yaratır. [[K6 s. 204]]</p></div>
<ul class="ozet"><li><b>Enjektör.</b> Arter kanı enjektöründeki heparin veya benzeri antikoagülan, analizör içinde tıkanmaya yol açabilecek pıhtıların oluşmasını önler. [[K6 s. 204]]</li><li><b>Örnek.</b> Kan kabarcıksız alınmalı ve alındıktan hemen sonra analiz edilmelidir. [[K6 s. 204]] Kabarcık kalırsa kan gazları kabarcığın içindeki havayla hızla dengeye gelir ve ölçüm hatalı çıkar. [[K6 s. 204]]</li>
<li><b>Sıcaklık.</b> Standart analiz hasta sıcaklığından bağımsız olarak 37 °C’de yapılır. [[K6 s. 204]] Kitap bu yaklaşımı α-stat, hastanın gerçek sıcaklığındaki ölçümü pH-stat olarak adlandırır. [[K6 s. 204]]</li>
<li><b>Koruyucu yüzey.</b> Membran ve cam, kan proteinlerinin elektrotları kaplayarak işlevlerini engellemesini önler. [[K6 s. 204]] Zamanla membranın kendisi proteinle kaplanıp sonucu bozabildiğinden sensör membranları düzenli değiştirilir. [[K6 s. 204]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap α-stat ile pH-stat ayrımını ölçüm sıcaklığı üzerinden anlatır. [[K6 s. 204]] Bunlar asit–baz yönetim stratejileridir: pH-stat yaklaşımında 37 °C’de ölçülen değerler hastanın sıcaklığına göre düzeltilebilir.</div>
</section>

<section class="wrap blk ders-sec" id="fk11b-clark">
<h2>Clark elektrodu ile oksijen kısmi basıncı</h2><p class="intro">Clark elektrodu, kanda oksijenin kısmi basıncını katotta oluşan elektrokimyasal akım üzerinden ölçer. [[K6 s. 204–205]]</p>
<div class="viz"><div class="viz-head"><h3>Oksijen arttığında akım ne olur?</h3></div><div data-viz="fk11b_akim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kaydırıcıyla oksijen kısmi basıncını değiştirin, sonra aynı konumda hücreyi değiştirin. Eksenler her hücrenin kendi göreli ölçeğindedir. İki cihazın ortak özelliği akımın oksijene bağlı olmasıdır. [[K6 s. 202–205]]</p></div>
<p>Polarografik elektrot adıyla da bilinen bu sensör, adını kalp cerrahisi için ilk kabarcıklı oksijenatörü geliştirirken elektrodu tasarlayan Leland Clark’tan alır. [[K6 s. 204]]</p>
<ul class="ozet"><li><b>Anot ve katot.</b> Anot, üzeri gümüş klorürle kaplı gümüş telden oluşur. [[K6 s. 204]] Platin katot ile anot arasındaki iyonik bağlantıyı potasyum klorür çözeltisi sağlar. [[K6 s. 204]]</li><li><b>Gerilim.</b> Elektrotlar arasına yaklaşık 0,6 V sabit gerilim uygulanır. [[K6 s. 204]]</li><li><b>Sinyal.</b> Katotta oksijen, elektronlar ve su tepkimeye girerek yük taşıyan hidroksit iyonlarını oluşturur. [[K6 s. 204–205]] Bu iyonların oluşması katoda ulaşan oksijene bağlı olduğundan akım örnekteki oksijen kısmi basıncını yansıtır. [[K6 s. 205]]</li></ul>
<p class="fk11b-denklem">O<sub>2</sub> + 2H<sub>2</sub>O + 4e<sup>−</sup> → 4OH<sup>−</sup> [[K6 s. 204–205]]</p><p>Burada O₂ oksijeni, H₂O suyu, e⁻ elektronu ve OH⁻ hidroksit iyonunu gösterir. [[K6 s. 204–205]]</p>
<details class="card"><summary>İki oksijen sensörünü hangi ayrıntılarla ayırırsınız?</summary><p>Önce katodu ve elektroliti eşleştirin. Yakıt hücresindeki altın ağ, potasyum hidroksit çözeltisiyle temas eder. [[K6 s. 202]] Clark elektrodunda platin ile Ag/AgCl arasında potasyum klorür çözeltisi vardır. [[K6 s. 204]] Ardından enerjinin kaynağını belirleyin. Besleme gazını ölçen yakıt hücresi kimyasal tepkimeden kendi akımını üretir. [[K6 s. 202–203]] Arter kanını ölçen Clark elektrodunda ise dış devre elektrotlar arasındaki gerilimi sabit tutar. [[K6 s. 204]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk11b-cam">
<h2>Sanz ve Severinghaus elektrotları</h2><p class="intro">Sanz elektrodu kanın pH’ını ölçer. [[K6 s. 205]] Severinghaus elektrodu ise bir tampondaki pH değişiminden kanın karbondioksit kısmi basıncını belirler. [[K6 s. 206–207]]</p>
<div class="viz"><div class="viz-head"><h3>Cam elektrot hangi ortamı algılıyor?</h3></div><div data-viz="fk11b_cam"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Her sensörde camın hangi çözeltiyi gördüğünü izleyin. Sanz elektrodunda örnek kanalındaki H⁺, Severinghaus elektrodunda ise CO₂’nin geçişiyle tamponda oluşan H⁺ değişimi ölçüme yansır. [[K6 s. 205–207]]</p></div>
<h3>Sanz elektrodu</h3>
<p>Örnek kanalındaki kan ile ölçüm elektrodunun tampon çözeltisi arasında hidrojene duyarlı bir cam bulunur. [[K6 s. 205]] Kitap, elektronsuz tek bir proton olan H⁺ iyonunun küçüklüğü nedeniyle camdan geçebildiğini, diğer iyon, atom ve moleküllerin geçemediğini belirtir. [[K6 s. 205]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap H⁺ iyonlarının camı geçtiğini söyler. [[K6 s. 205]] pH’a duyarlı potansiyel, camın hidratlanmış yüzeylerinde çözeltideki H⁺ ile camdaki iyonların değişiminden doğar.</div>
<p>İç tampon hidrojen iyonu derişimini sabit tutar. [[K6 s. 205]] Böylece camdaki potansiyel farkının değişimi, kan kanalındaki hidrojen iyonu derişimine bağlıdır. [[K6 s. 205]] Referans elektrot, doymuş potasyum klorür çözeltisine daldırılmış gümüş/gümüş klorür elektrodudur. [[K6 s. 205]] İki elektrot arasındaki potansiyel farkından örnekteki hidrojen iyonu derişimi belirlenir. [[K6 s. 205]]</p>
<h3>Severinghaus elektrodu</h3>
<p>Örnekten membranı geçen CO₂, seyreltik bikarbonat tamponundaki suyla birleşerek karbonik asit oluşturur. [[K6 s. 206]] Karbonik asit bikarbonat ve hidrojen iyonlarına ayrışır. [[K6 s. 206]]</p>
<p class="fk11b-denklem">CO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> ⇌ H<sup>+</sup> + HCO<sub>3</sub><sup>−</sup> [[K6 s. 206]]</p>
<p>Tampondaki pH değişimi kanda çözünmüş karbondioksit derişimiyle ilişkilidir. [[K6 s. 207]] Cam elektrot H⁺ değişimini Ag/AgCl referans elektroduna göre ölçer ve CO₂ kısmi basıncı dolaylı olarak belirlenir. [[K6 s. 207]]</p>
<p><b>Diğer iyonlar.</b> Aynı referans elektrodu koruyup ölçüm elektrodunu hedef iyona duyarlı bir elektrotla değiştirerek potasyum, kalsiyum veya sodyum derişimi de ölçülebilir. [[K6 s. 207]]</p>
<details class="card"><summary>İki tampondan hangisinde pH değişimi ararsınız?</summary><p>Sanz düzeneğinde iç tamponun görevi ölçüm elektrodu tarafındaki hidrojen iyonu derişimini sabit tutmaktır. [[K6 s. 205]] Severinghaus düzeneğinde membranın arkasındaki seyreltik bikarbonat tamponu ise örnekteki CO₂ ile ölçüm elektrodu arasındaki kimyasal bağlantıyı kurar. [[K6 s. 206–207]] Bu ara basamak sayesinde elektrodun algıladığı iyon H⁺ olduğu hâlde ölçüm sonucu CO₂ kısmi basıncı olarak verilebilir. [[K6 s. 206–207]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk11b-kolon">
<h2>Gaz kromatografisi</h2><p class="intro">Kromatografi, gaz veya sıvı karışımdaki bileşikleri analizden önce bir kolonda ayırır. [[K6 s. 207]] Ayırma, bileşiklerin hareketli faz ile sabit faz arasında farklı oranlarda dağılmasına dayanır. [[K6 s. 208]]</p>
<div class="viz"><div class="viz-head"><h3>Kromatogramda pikin yerini ve yüksekliğini okuyun</h3></div><div data-viz="fk11b_kolon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Aynı bileşiğin derişimini değiştirirken pikin zaman eksenindeki yerine bakın. Ardından sabit faza ilgiyi değiştirin. Şematik pikte konum bileşiği tanımaya, yükseklik ise miktarını değerlendirmeye yarar. [[K6 s. 208]]</p></div>
<p><b>Örneğin yolculuğu.</b> Uçucu örnek, kolondan geçirilen inert taşıyıcı gaza enjekte edilir ve ikisi birlikte ilerler. [[K6 s. 208]] Hareketli fazın taşıyıcısı genellikle helyum, hidrojen veya azottur. [[K6 s. 208]] Kolon sıcaklığı sıkı biçimde denetlenir. [[K6 s. 208]] Sabit faza ilgisi fazla olan bileşik daha yavaş ilerler ve kolon sonundaki dedektöre daha geç ulaşır. [[K6 s. 208]]</p>
<div class="fk11b-kartlar"><div class="card"><h3>Dolgulu kolon</h3><p>Kaolin, alümina, silika veya aktif kömür gibi ince taneli, inert katı bir destek sıvı sabit fazla kaplanır. [[K6 s. 208]] Çoğu dolgulu kolon birkaç metre uzunluğunda ve 2–5 mm iç çapındadır. [[K6 s. 208]]</p></div>
<div class="card"><h3>Kapiler kolon</h3><p>Çapı dolgulu kolonunkinin yaklaşık onda biridir. [[K6 s. 208]] Sıvı sabit faz iç duvarı ince bir film olarak örter. [[K6 s. 208]] Başka bir tasarımda sıvı faz, duvardaki ince destek tabakasına adsorbe edilir. [[K6 s. 208]]</p></div></div>
<p><b>Kromatogramı okuma.</b> Kolon sonundaki dedektör, taşıyıcı gaz dışındaki bileşikleri algılar. [[K6 s. 208]] Pikin zaman eksenindeki konumu bileşiğe özgü geçiş süresini, yüksekliği ise derişimi gösterir. [[K6 s. 208]]</p>
<ul class="ozet"><li><b>Ne ölçülebilir?</b> Gaz karışımının tüm bileşenleri, ameliyathane havasındaki eser maddeler ve steroid, fenotiyazin veya benzodiazepin gibi ilaçların derişimleri ölçülebilir. [[K6 s. 207–208]] Çözeltideki ilaçlar analizden önce uçucu bir bileşikle karıştırılır. [[K6 s. 207]]</li><li><b>Klinik sınır.</b> Çok düşük derişimleri saptayabilir, ancak analiz zaman alır, sürekli örnekleme yapılamaz ve gaz hastaya geri verilemez. [[K6 s. 208]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="fk11b-kutle">
<h2>Kütle spektrometrisi</h2><p class="intro">Kütle spektrometresi, gaz moleküllerinden oluşturduğu pozitif iyonları yük/kütle oranlarına göre ayırarak düşük derişimleri ölçebilir. [[K6 s. 208]]</p>
<div class="viz"><div class="viz-head"><h3>İyonun manyetik alandaki yolunu izleyin</h3></div><div data-viz="fk11b_sapma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Yükü aynı tutarak önce hafif, sonra ağır iyonun ulaştığı dedektörü bulun. Yollar şematiktir. Dedektörün konumu ayrımı, dedektörde toplanan iyonların göreli bolluğu ise karışımın bileşimini değerlendirmeyi sağlar. [[K6 s. 208]]</p></div>
<ol class="iskelet"><li><b>İyonlaştırma.</b> Hızlı elektronlar gaz moleküllerine çarparak atomların dış kabuklarından elektron koparır ve pozitif iyonlar oluşturur. [[K6 s. 208]]</li><li><b>Hızlandırma.</b> İyonlar bir elektrik alanından geçirilerek hızlandırılır. [[K6 s. 208]]</li><li><b>Saptırma.</b> Güçlü ve sabit bir manyetik alan iyonların yolunu büker. [[K6 s. 208]] Aynı yükte daha ağır iyon daha az sapar. [[K6 s. 208]]</li><li><b>Algılama.</b> Farklı doğrultulara sapan iyonlar bir dedektör dizisinde toplanır ve göreli bollukları kaydedilir. [[K6 s. 208]] Yük/kütle oranı moleküllerin tanınmasına olanak verir. [[K6 s. 208]]</li></ol>
<p>Tüm gazları yüksek doğrulukla ölçebilir, ancak iyonlaşan örnek hastaya geri verilemez. [[K6 s. 208–209]] Cihazlar hantal ve hasara açıktır. [[K6 s. 209]] Geçmişte ameliyathanede de kullanılan bu yöntemin günümüzde başlıca kullanım yeri araştırma laboratuvarıdır. [[K6 s. 208]]</p>
</section>

<section class="wrap blk ders-sec" id="fk11b-raman">
<h2>Raman spektroskopisi</h2><p class="intro">Fotonların çoğu atoma çarptığında enerjisini, frekansını ve dalga boyunu korur. [[K6 s. 209]] Yaklaşık on milyonda bir fotonun enerjisinin değişmesi ise gazın tanınmasını sağlar. [[K6 s. 209]]</p>
<div class="viz"><div class="viz-head"><h3>Elastik ve Raman saçılmasını karşılaştırın</h3></div><div data-viz="fk11b_raman"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Aynı gelen ışık için saçılma türünü değiştirin. Çıkan fotonun enerji değişimini izleyin. Raman ölçümünde örnek haznesini geçen lazer demeti ile dedektöre giden saçılmış ışık birbirine diktir. [[K6 s. 209]]</p></div>
<ul class="ozet"><li><b>Elastik saçılma.</b> Duvardan enerji kaybetmeden seken bir lastik top gibi foton yön değiştirir, çarpışma sonunda atomun ve fotonun enerjisi aynı kalır. [[K6 s. 209]]</li><li><b>Raman saçılması.</b> Atom fotonu kısa süreliğine soğurunca elektronlarından biri daha yüksek enerji düzeyine çıkar. [[K6 s. 209]] Elektron başlangıçtakinden farklı bir düzeye döner ve farklı enerjide bir foton yayılır. [[K6 s. 209]] Bu olay inelastik saçılmadır. [[K6 s. 209]]</li></ul>
<p><b>Ölçüm geometrisi.</b> Argon lazerinden çıkan tek renkli ışık örnek haznesinden geçirilir. [[K6 s. 209]] Saçılan ışık, gelen demete dik yönde ölçülür. [[K6 s. 209]] Enerji düzeyleri atom türüne özgü olduğu için yayılan dalga boyları moleküllere özgü izler taşır. [[K6 s. 209]] Bu dalga boylarının analizi Raman spektrumunu verir. [[K6 s. 209]]</p>
<p>Özellikle CO₂ ve N₂O saptamaya uygundur. [[K6 s. 209]] Küçük, taşınabilir ve kullanımı kolaydır, az bakım gerektirir ve kalibrasyonu kararlıdır. [[K6 s. 209]] Daha ucuz kızılötesi analizörlerin yaygınlaşmasıyla kullanımı azalmıştır. [[K6 s. 209]]</p>
<details class="card"><summary>Bilinmeyen bir gazı hangi sinyalden tanırsınız?</summary><ul class="ozet"><li>Kromatogramda kolon sonundaki tek dedektörün bir bileşiği ne zaman algıladığına bakılır. [[K6 s. 208]]</li><li>Kütle spektrometresinde iyonlar farklı yörüngelere ayrılır, yük/kütle oranına göre farklı yönlere sapan iyonları bir dedektör dizisi toplar. [[K6 s. 208]]</li><li>Raman spektroskobunda ise ölçülen, örnek haznesinden saçılan ışığın dalga boylarıdır. [[K6 s. 209]] Gelen ışık tek renkli olduğundan saçılan fotonların enerji değişimi gazın ayırt edilmesinde kullanılabilir. [[K6 s. 209]]</li></ul></details>
</section>
<section class="wrap blk ders-sec" id="fk11b-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk11b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk11b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk11b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk11b-p2">
<h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir hastada her solukta oksijeni izlemek ve ardından arter kanında oksijen, karbondioksit ve pH ölçmek istiyorsunuz. Hangi sensörleri seçersiniz? Ölçümün güvenilirliğini nasıl korursunuz?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Darbeli alanda örnek ile referansın oksijen kısmi basınç farkı, çift taraflı dönüştürücüde değişken basınç sinyali oluşturur. [[K6 s. 201]] Hızlı yanıtı soluk içi izlemeye uygundur. [[K6 s. 209]]</li>
<li>Antikoagülan içeren enjektöre kabarcıksız kan alıp örneği hemen analiz ederim. [[K6 s. 204]] Proteinle kaplanabilen sensör membranlarının düzenli değişimi ölçüm hatasını önler. [[K6 s. 204]]</li>
<li>Clark elektrodu oksijen kısmi basıncını, sabit gerilim altında katotta oksijen indirgenirken oluşan akımdan belirler. [[K6 s. 204–205]]</li>
<li>Sanz elektrodu pH için örnekteki H⁺ derişimine bağlı potansiyel farkını ölçer. [[K6 s. 205]] Severinghaus elektrodunda ise CO₂’nin tampona geçişi pH’ı değiştirir. [[K6 s. 206–207]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Bir Clark elektrodu çizip platin katodu, Ag/AgCl anodu, KCl çözeltisini ve gerilim kaynağını gösterin. [[K6 s. 204–205]] Yanına Severinghaus elektrodunu çizip CO₂’nin membrandan tampona kadar izlediği yolu işaretleyin. [[K6 s. 206–207]]</div><div class="note plain"><b>Ek sorular</b><ul><li>Besleme gazını izleyen yakıt hücresi neden zamanla değiştirilir?</li><li>Kan örneğindeki hava kabarcığı sonucu nasıl etkiler?</li><li>Sanz elektrodunu sodyuma duyarlı hâle getirirken hangi elektrodu korursunuz?</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="fk11b-ozet"><h2>Özet</h2>
<ul class="ozet"><li>Solunum gazlarında en sık kızılötesi absorpsiyon kullanılır, ancak oksijen bu yolla kolayca algılanamaz. [[K6 s. 209]] Paramanyetik ölçümde burulma terazisi besleme gazına, hızlı darbeli alan yöntemi soluk içi izlemeye uygundur. [[K6 s. 200–201]] [[K6 s. 209]]</li>
<li>Yakıt hücresi kendi akımını üretir, Clark elektrodu ise dışarıdan sabit gerilim gerektirir. [[K6 s. 202–205]]</li>
<li>Sanz elektrodu kanın pH’ını, Severinghaus elektrodu tamponun pH değişiminden CO₂ kısmi basıncını ölçer. [[K6 s. 205–207]]</li>
<li>Kromatografi, kütle spektrometrisi ve Raman saçılması rutin anestezide büyük ölçüde yerini başka tekniklere bırakmıştır. [[K6 s. 210]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="11b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/11a">← Solunum gazı izlemi, kızılötesi spektroskopi ve kapnografi</a><a href="#/dersler/fizik/12">Sonraki: Vaporizatörler →</a></nav></section>`,
};

