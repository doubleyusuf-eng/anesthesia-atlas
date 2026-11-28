VERI.sorular = VERI.sorular || {};
VERI.sorular['fk12-1'] = {
  no: 1, kok: 'Buhar ve doygunluk', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 211–212]] [[K6 s. 217–219]]',
  onermeler: [
    { t: 'Soğuk havada soluğu görünür kılan, gaz fazındaki sudur.', d: false, n: 'Görülen bulutu, su buharının yoğuşmasıyla oluşan sıvı damlacıkları oluşturur. [[K6 s. 211–212]]' },
    { t: 'Kapalı kapta sıvıyla dengedeki buharın parsiyel basıncı doymuş buhar basıncıdır.', d: true, n: 'Sıvı ve gaz fazları dengeye geldiğinde buharın toplam basınca katkısı bu değere ulaşır. [[K6 s. 212]]' },
    { t: 'Aynı sıcaklıkta atmosfer basıncının azalması doymuş buhar basıncını düşürür.', d: false, n: 'Belirleyici değişken sıcaklıktır. [[K6 s. 219]]' },
    { t: '20 °C’de sevofluranın doymuş buhar basıncı izofluranınkinden yüksektir.', d: false, n: 'Sevofluran için değer 21 kPa, izofluran için 33 kPa’dır. [[K6 s. 216–217]]' },
    { t: 'Membrandan difüzyonu belirleyen, iki taraftaki parsiyel basınç farkıdır.', d: true, n: 'Bu nedenle klinik açıdan buharın parsiyel basıncı önem taşır. [[K6 s. 219]]' },
  ],
};
VERI.sorular['fk12-2'] = {
  no: 2, kok: 'Değişken baypaslı vaporizatör', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 213–217]]',
  onermeler: [
    { t: 'Fitil, buharlaşmaya açık sıvı yüzeyini genişletir.', d: true, n: 'Sıvıyı emen fitil, gaz ile temas eden ıslak yüzeyi büyütür. [[K6 s. 214]]' },
    { t: 'Bölünme oranının payında baypas akımı vardır.', d: false, n: 'Payda baypas akımı, pay ise hazneye giren taşıyıcı gaz akımıdır. [[K6 s. 214]]' },
    { t: 'Buharlaşma sürerken geride kalan sıvı soğuyabilir.', d: true, n: 'Yüksek enerjili moleküllerin ayrılması geride kalanların ortalama enerjisini düşürür. [[K6 s. 215]]' },
    { t: 'Hazne ısındığında sıcaklık telafisi gazın daha büyük bölümünü baypasa yöneltir.', d: true, n: 'Doymuş buhar basıncı yükseldiğinde aynı çıkış için daha küçük bir bölünme oranı gerekir. [[K6 s. 215]]' },
    { t: 'Bimetalik şeridi aynı genleşme katsayısına sahip iki metal büker.', d: false, n: 'Bükülme iki metalin farklı ölçüde genleşmesinden doğar. [[K6 s. 216]]' },
  ],
};
VERI.sorular['fk12-3'] = {
  no: 3, kok: 'Ajan sunumu ve çıkışın denetlenmesi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 217–219]]',
  onermeler: [
    { t: 'Çift devreli desfluran vaporizatöründe basınç düzeltme valfini yalnız sıcaklık belirler.', d: false, n: 'Transdüser taze gaz ile çıkan buharın basınç farkını ölçer ve bu bilgiyle valf ayarlanır. [[K6 s. 218]]' },
    { t: 'Doğrudan enjeksiyonda taze gaz akımı artınca püskürtme de artar.', d: true, n: 'Böylece çıkış konsantrasyonu sabit tutulur. [[K6 s. 218]]' },
    { t: 'Çift devreli desfluran vaporizatörü kullanımdan önce ısınma süresi gerektirir.', d: true, n: 'Sıcaklığı 39 °C’de denetlenen cihaz kullanımdan önce ısınmak için zaman gerektirir. [[K6 s. 218]]' },
    { t: 'Aralıklı pozitif basınçlı ventilasyon vaporizasyon haznesinde geri akıma neden olabilir.', d: true, n: 'Vaporizatörden sonraki akım kısıtlayıcı valf genellikle geri akımı önler veya sınırlar. [[K6 s. 217]]' },
    { t: 'Solunum sistemindeki kızılötesi analizör inspiryum ajan konsantrasyonunu her solukta ölçebilir.', d: true, n: 'Bu ölçüm vaporizatör çıkışının bağımsız denetimini sağlar. [[K6 s. 217]]' },
  ],
};

(function () {
  const nav = [
    ['buhar', 'Buhar basıncı'], ['devre', 'Devredeki yer'], ['plenum', 'Akım bölünmesi'],
    ['boyle', 'Boyle şişesi'], ['isi', 'Sıcaklık telafisi'], ['ayar', 'Kalibrasyon'],
    ['sunum', 'Enjeksiyon ve çift devre'], ['atmosfer', 'Atmosfer basıncı'],
    ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  const sekil = (ad, baslik, aciklama) => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk12_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${aciklama}</p></div>`;
  SAYFALAR['dersler/fizik/12'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 12', baslik: 'Vaporizatörler',
    lede: 'Bir vaporizatörün amacı, koşullar değişirken de hastaya bilinen ve tutarlı bir anestezik buhar konsantrasyonu sunmaktır. [[K6 s. 212]] [[K6 s. 219]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk12-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk12-buhar">
<h2>Sıvının üzerindeki buhar ne kadar basınç oluşturur?</h2>
<p class="intro">Kapalı bir kapta sıvı ile buhar dengeye ulaştığında, buharın oluşturduğu parsiyel basınca <b>doymuş buhar basıncı</b> (SVP) denir. [[K6 s. 212]]</p>
${sekil('denge', 'Şişenin kapağı açıkken ve kapalıyken', 'Sıvı yüzeyi ve üzerindeki buhar şematik gösterilmiştir. [[K6 s. 211–212]]')}
<p>Sirke şişesinin kapağı açıldığında sıvı oda sıcaklığında kalır, ancak kokusu çevreye yayılır. [[K6 s. 211]] Sıvıdaki moleküllerin enerjileri farklıdır ve sıcaklık bu enerjilerin ortalamasını yansıtır. [[K6 s. 212]] Yüzeyde yeterli enerjiye sahip moleküller, kendilerini sıvıda tutan moleküller arası bağları aşar ve gaz fazına geçer. [[K6 s. 211–212]] Havada difüzyonla yayılan sirke molekülleri koku reseptörlerini uyarır. [[K6 s. 211]]</p>
<p><b>Buhar</b>, bir maddenin kritik sıcaklığının altındaki gaz fazıdır. [[K6 s. 211]] Kritik sıcaklığın üzerinde basınç ne kadar artırılırsa artırılsın madde gaz olarak kalır. [[K6 s. 211]] Su için bu sıcaklık 374 °C (647 K) olduğundan, bunun altındaki gaz hâlindeki suya su buharı denir. [[K6 s. 211]]</p>
<p>Akciğerlerde hava su buharıyla doymuştur. [[K6 s. 211]] Soğuk bir günde soluk dışarı verildiğinde buhar hızla yoğuşur ve görülen bulutu çok küçük sıvı su damlacıkları oluşturur. [[K6 s. 211–212]] Deniz seviyesinde sıvı yüzeyine etkiyen toplam atmosfer basıncı 101,3 kPa’dır ve yüzeyin üzerindeki buhar bu toplamın yalnız bir bölümünü sağlar. [[K6 s. 212]] [[K6 s. 219]]</p>
<div class="note"><b>Basınç ile yüzdeyi ayırın.</b> Sıvı yüzeyinin üzerindeki toplam basınç, yalnızca o sıvının buharından doğmaz. [[K6 s. 212]] Örneğin kapalı haznede ajan buharının dengeye ulaşıp ulaşmadığını değerlendirirken bakılacak büyüklük, ajan moleküllerinin bu toplama yaptığı katkıdır. [[K6 s. 212–214]] Aynı katkıyı karışımın yüzdesi olarak ifade etmek için ise toplam basıncı da bilmek gerekir. [[K6 s. 219]]</div>
</section>
<section class="wrap blk ders-sec" id="fk12-devre">
<h2>Buhar solunum sistemine nerede katılır?</h2>
<p class="intro">Taze gazın hastanın solunum sistemine girdiği yeri bulun ve buharın akıma bu sınırdan önce mi sonra mı katıldığını izleyin. [[K6 s. 212–213]]</p>
${sekil('konum', 'Devre içi ve devre dışı yerleşim', 'Sıralama, taze gazın solunum sistemine girişine göredir. [[K6 s. 212–213]]')}
<dl class="fk12-terimler">
<dt>Schimmelbusch maskesi</dt><dd>İlk vaporizatör örneğinde metal bir çerçeve emici malzemeyi taşırdı. [[K6 s. 212]] Üzerine damlatılan eter, oda sıcaklığındaki yüksek SVP’si nedeniyle kolayca buharlaşır ve hasta bu buharı solurdu. [[K6 s. 212]] Hasta kıpırdamaya başlayınca anestezist şişeden yeniden eter damlatırdı. [[K6 s. 212]]</dd>
<dt>Oxford Miniature Vaporizer (OMV)</dt><dd>Bu maskenin günümüzdeki en yakın karşılığı, askerî Tri-Service düzeneğinde kullanılan çekişli (draw-over) vaporizatördür. [[K6 s. 212]] Hafiftir ve iç direnci çok düşük olduğu için doğrudan solunum sistemine yerleştirilebilir. [[K6 s. 212]] Kadran ölçeği kullanılan ajana göre değiştirilirse aynı cihaz farklı uçucu ajanlarla çalışabilir. [[K6 s. 212]] Kitaba göre OMV, kullanımda kalan devre içi vaporizatörlerin muhtemelen tek örneğidir. [[K6 s. 212]]</dd></dl>
<p>İki cihazı karşılaştırırken önce buharın katıldığı yeri, sonra gazı cihazın içinden geçiren koşulları belirleyin. [[K6 s. 212–214]] OMV’nin düşük direnci devre içine yerleşime izin verirken, makinenin basınçlı taze gazıyla çalışan yüksek dirençli plenum için bu yerleşim uygun değildir. [[K6 s. 212–214]]</p>
</section>
<section class="wrap blk ders-sec" id="fk12-plenum">
<h2>Değişken baypaslı vaporizatörde iki gaz yolu</h2>
<p class="intro">Plenum vaporizatöründe taze gazın bir bölümü ajanın bulunduğu hazneden geçer, kalanı hazneyi baypas eder ve iki akım çıkışta birleşir. [[K6 s. 213–214]]</p>
${sekil('kesit', 'Kesitte baypas kanalını ve fitili bulun', 'Kesit akım yollarını ve buharlaşma yüzeyini gösterir. [[K6 s. 213–215]]')}
${sekil('bolunme', 'Bölünme oranını değiştirip iki koldaki payları izleyin', 'Yüzdeler girişteki taze gazın bölünme oranından hesaplanır ve ok kalınlıkları şematiktir. [[K6 s. 213–214]]')}
<p>Anestezi makinesindeki pozitif basınç, taşıyıcı gazı hazneden geçirir ve uçucu ajan bu gaz akımına buhar olarak katılır. [[K6 s. 214]] Plenum tipi güvenilir ve makul ölçüde doğrudur, ancak yüksek iç direnci nedeniyle devre içine yerleştirmeye uygun değildir. [[K6 s. 213–214]]</p>
<div class="card"><h3>Bölünme oranını okuyun</h3><p><i>r</i> = <i>Q</i><sub>hazne</sub> / <i>Q</i><sub>baypas</sub>. [[K6 s. 214]] Pay hazneye giren taşıyıcı gaz akımı, payda hazneyi atlayan gaz akımıdır. [[K6 s. 214]] İki akım aynı birimle (L·dk<sup>−1</sup>) ifade edildiğinde oran birimsizdir. [[K6 s. 214]] [[K6 s. 217]]</p></div>
<details class="card"><summary>İki koldan eşit akım geçerse kadran nasıl yorumlanır?</summary><p>Şekilde bölünme oranını bire getirin. [[K6 s. 214]] Hazne akımı baypas akımına eşit olduğu için giren taze gazın yarısı ajana uğrar ve yarısı doğrudan çıkışa yönelir. [[K6 s. 213–214]] Buradaki yüzde taşıyıcı gazın izlediği yolu tarif eder, çıkıştaki ajan yüzdesini bulmak için haznede gaza katılan buharı da hesaba katmak gerekir. [[K6 s. 213–214]]</p></details>
<p>Ayarın doğruluğu, taşıyıcı gaz geçerken haznede doymuş buhar basıncının korunmasına bağlıdır. [[K6 s. 214]] Yüksek taşıyıcı gaz akımında yüzeyden uzaklaştırılan buharın sıvı rezervuarından hızla yenilenmesi gerekir. [[K6 s. 214]]</p>
<ul><li><b>Fitilli hazne.</b> Yaygın tasarımda fitiller ajanı emer ve buharlaşmanın gerçekleştiği ıslak yüzeyi genişletir. [[K6 s. 214]]</li>
<li><b>Kabarcıklı hazne.</b> Alternatif tasarımda gaz sıvı yüzeyinin altından verilir ve sıvının içinde kabarcıklar hâlinde yükselir. [[K6 s. 214]]</li></ul>
<div class="note"><b>Hazne çıkışı ile hasta çıkışını ayırın.</b> Fitilin genişlettiği yüzey, hazneden geçen gazın ajan buharıyla doymasına yardım eder. [[K6 s. 214]] Hastaya giden karışımı bulmak için hazneden çıkan gazla birlikte, ajana hiç temas etmeden geçen baypas gazını da hesaba katmak gerekir. [[K6 s. 213–214]]</div>
</section>
<section class="wrap blk ders-sec" id="fk12-boyle">
<h2>Boyle şişesinde elle ayar</h2>
<p class="intro">İlk plenum tipi olan Boyle şişesinde anestezist pistonu hareket ettirerek gelen gazı sıvı yüzeyine yaklaştırır veya yüzeyden uzaklaştırırdı. [[K6 s. 214]]</p>
${sekil('boyle', 'Pistondan sıvı yüzeyine kadar düzeneği izleyin', 'Yönlendirici başlığın konumu elle ayarlanır. [[K6 s. 214–215]]')}
<p>Henry Boyle’un geliştirdiği şişe, yaygın olarak ilk anestezi makinesi kabul edilen Boyle makinesinin bir parçasıydı. [[K6 s. 214]] Başlık, gazı şişedeki sıvı anesteziğin yüzeyi üzerinden geçirirdi ve bölünme oranını bütünüyle kullanıcının piston ayarı belirlerdi. [[K6 s. 214]]</p>
<p>Özellikle buharlaşma sırasında sıvının ısı kaybetmesi, şişenin sıcaklık değişimlerine karşı başlıca zayıflığıydı. [[K6 s. 214–215]] Şişeyi ılık su banyosuna koymak ısı kaybını karşılamaya yardım ederdi. [[K6 s. 214–215]] Hem banyoyu izlemek hem de istenen konsantrasyon için başlığı yeniden konumlandırmak sık ayar ve yakın gözlem gerektirirdi. [[K6 s. 215]]</p>
</section>
<section class="wrap blk ders-sec" id="fk12-isi">
<h2>Isı deposu ve sıcaklık telafisi</h2>
<p class="intro">Isı deposu buharlaşan sıvının soğumasını sınırlar, otomatik sıcaklık telafisi ise hazne sıcaklığı değiştiğinde akımın nasıl bölüneceğini ayarlar. [[K6 s. 215–216]]</p>
${sekil('telafi', 'Isınmaya yanıt veren üç mekanizma', 'Çubuk, körük ve şeridin hareketi şematiktir. [[K6 s. 215–216]]')}
<p><b>Buharlaşmayla soğuma.</b> Yüzeyden ayrılması en kolay olanlar enerjisi en yüksek moleküllerdir. [[K6 s. 215]] Taşıyıcı gaz bu molekülleri götürdüğünde sıvıda kalanların ortalama enerjisi ve dolayısıyla sıcaklığı düşer. [[K6 s. 215]] Birim kütlede sıvıyı buhara dönüştürmek için gereken enerjiye <b>gizli buharlaşma ısısı</b> denir. [[K6 s. 215]]</p>
<p><b>Isı deposu.</b> Katı veya sıvı bir ısı deposu, akışkana ısı aktararak sıcaklık dalgalanmalarını azaltır. [[K6 s. 215]] Vaporizatörde bunun için özgül ısı kapasitesi yüksek ve ısıyı iyi ileten bir malzeme kullanılır. [[K6 s. 215]] Cihazın ağırlığının büyük bölümü ısı deposundan gelir, metal gövde ise çevreden ajana ısı iletir. [[K6 s. 215]]</p>
<p><b>Otomatik ayar.</b> Akım bölünmesi değişmezse haznenin ısınması SVP’yi ve hastaya giden ajan konsantrasyonunu artırır. [[K6 s. 215]] Bunu dengelemek için cihaz, ısınan hazneye giren gaz payını azaltır ve baypas payını artırır. [[K6 s. 215]] En sık kullanılan mekanizma bimetalik şerittir. [[K6 s. 216]]</p>
<dl class="fk12-terimler"><dt>Metal çubuk</dt><dd>En basit tasarımda sıcaklık yükselince çubuk uzar ve ucu taşıyıcı gaz girişini daraltır. [[K6 s. 215]]</dd><dt>Sıvı dolu körük</dt><dd>Aynı ayar başka bir tasarımda, içindeki sıvı ısınınca genleşen körükle sağlanır. [[K6 s. 215–216]]</dd><dt>Bimetalik şerit</dt><dd>Birbirine bağlı iki metalin ısıl genleşme katsayıları farklıdır, dolayısıyla aynı sıcaklık değişimi şeridin eğriliğini değiştirir. [[K6 s. 216]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="fk12-ayar">
<h2>Fabrika kalibrasyonu ve çıkışın doğrulanması</h2>
<p class="intro">Ajanlar aynı sıcaklıkta farklı doymuş buhar basınçlarına ulaştığından vaporizatör genellikle tek bir ajan için kalibre edilir. [[K6 s. 216–217]]</p>
${sekil('ajan', 'Ajanı seçip 20 °C’deki buhar basıncını karşılaştırın', 'Çubuk uzunluğu doymuş buhar basıncıyla orantılıdır; her ajanın SVP’si sıcaklıkla artar. [[K6 s. 215–217]]')}
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ajan</th><th>20 °C’de SVP</th><th>Kaynama noktası</th></tr></thead><tbody>
<tr><td>Sevofluran</td><td>21 kPa</td><td>58,6 °C [[K6 s. 216–217]]</td></tr>
<tr><td>Halotan</td><td>32 kPa</td><td>50,2 °C [[K6 s. 216–217]]</td></tr>
<tr><td>İzofluran</td><td>33 kPa</td><td>48,5 °C [[K6 s. 216–217]]</td></tr>
<tr><td>Desfluran</td><td>88,5 kPa</td><td>22,8 °C [[K6 s. 216–217]]</td></tr></tbody></table></div>
${sekil('doygunluk', 'Haznedeki doygun gazın yüzde kaçı ajan buharıdır?', 'Kaydırıcının iki ucu 20 °C’deki en düşük ve en yüksek tablo değeridir, doğru üzerindeki yüzdeler ise 101,3 kPa için hesaplanır. [[K6 s. 216–217]] [[K6 s. 219]]')}
<div class="card"><h3>Hesap kartı · Haznede sevofluran</h3><p>20 °C’de dengeye ulaşmış haznede sevofluranın parsiyel basıncı 21 kPa’dır. [[K6 s. 212]] [[K6 s. 216–217]] Toplam basınç 101,3 kPa ise haznedeki buhar yüzdesi 100 × 21 / 101,3 ≈ %20,7 olarak hesaplanır. [[K6 s. 216–217]] [[K6 s. 219]] Baypas gazıyla birleşme bu hesapta henüz gerçekleşmemiştir ve hastaya sunulan karışım daha seyreltiktir. [[K6 s. 213–214]]</p></div>
<details class="card"><summary>Aynı sıcaklıkta desfluran aynı ayarla verilebilir mi?</summary><p>Sevoflurandan desflurana geçildiğinde 20 °C’de sıvının üzerinde oluşan doymuş buhar basıncı 21 kPa’dan 88,5 kPa’ya çıkar. [[K6 s. 216–217]] Bir ajan için belirlenen baypas ayarını başka bir ajana uygulamak, aynı çıkış konsantrasyonunu sağlamaz. [[K6 s. 213–216]] Desfluranın ayrıca kaynama noktasının oda sıcaklığına yakın olması özel vaporizatör tasarımını gerektirir. [[K6 s. 216–218]]</p></details>
<ul><li><b>Düşük akım.</b> Taze gaz akımı değiştiğinde çıkış konsantrasyonu özellikle düşük akımlarda sıklıkla doğrusal davranmaz. [[K6 s. 217]] Sapma cihaza özgüdür ve erken Tec serisinde 1 L·dk<sup>−1</sup> ve altındaki akımlarda belirgindi. [[K6 s. 217]]</li>
<li><b>Geri akım.</b> Aralıklı pozitif basınçlı ventilasyon haznede geri akım oluşturabilir. [[K6 s. 217]] Vaporizatör çıkışından sonraki akım kısıtlayıcı valf bu etkiyi genellikle önler veya sınırlar. [[K6 s. 217]]</li>
<li><b>Bağımsız ölçüm.</b> Hastanın solunum sistemindeki kızılötesi anestezik gaz analizörü, inspire edilen buhar konsantrasyonunu her solukta ölçer. [[K6 s. 217]] Ölçülen değer, sunulan anestezinin derinliği hakkında da bilgi verir. [[K6 s. 217]]</li></ul>
<details class="card"><summary>Kadran aynı kaldığı hâlde inspiryum ölçümü değişirse neyi araştırırsınız?</summary><p>Önce değişimin taze gaz akımıyla ilişkisine bakın. [[K6 s. 217]] Özellikle düşük akımda sapmanın büyüklüğü vaporizatörün kendi özelliklerine bağlıdır. [[K6 s. 217]] Sonra değişimin aralıklı pozitif basınçlı ventilasyonla ilişkisini ve vaporizatörden sonraki valfin geri akım üzerindeki etkisini değerlendirin. [[K6 s. 217]] Hastaya ulaşan konsantrasyonu belirlerken kadran ayarıyla solunum sisteminde her inspiryumda ölçülen değeri ayrı ayrı ifade edin. [[K6 s. 217]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk12-sunum">
<h2>Doğrudan enjeksiyon ve çift devreli desfluran vaporizatörü</h2>
<p class="intro">Doğrudan enjeksiyon sıvı anesteziği taze gaza püskürtürken, çift devreli desfluran cihazı ayrı bir hazneden çıkan buharın akımını düzenler. [[K6 s. 218–219]]</p>
${sekil('sunum', 'Ajanı gaz akımına hangi düzenek katar?', 'Şema, her tasarımda denetlenen akımı gösterir. [[K6 s. 218–219]]')}
<h3>Gaz akımıyla eşleşen püskürtme</h3>
<p>Bazı anestezi makinelerinde düzenek, otomobildeki yakıt enjeksiyonu gibi çalışır. [[K6 s. 218]] Dereceli bir kısma valfi girişteki taze gaz akımını ayarlar ve ajan bu gaz akımına basınç altında püskürtülür. [[K6 s. 218]] Gaz akımı enjeksiyonu sürer, böylece akım artarken püskürtme de artar ve sunulan konsantrasyon sabit kalır. [[K6 s. 218]]</p>
<p>Bu tasarım, buhar basıncının sıcaklıkla değişmesinden doğan sorunları önler. [[K6 s. 218]] Bazı modellerde akım ve basınç sensörlerinden geri bildirim alan mikroişlemci, değişken püskürtme memesini ayarlayarak konsantrasyonu denetler. [[K6 s. 218]]</p>
<p>Bu düzende gaz akımının ayarlandığı yer ile anesteziğin sisteme katıldığı yeri ayrı izleyin. [[K6 s. 218]] Girişteki kısma valfi taze gazı düzenlerken, değişken memeli bir sistemde sensörlerin bildirdiği akım ve basınca göre püskürtülen ajan miktarını mikroişlemci denetler. [[K6 s. 218]]</p>
<details class="card"><summary>Gaz akımı değişirken hangi iki mekanizma çıkış konsantrasyonunu korumaya çalışır?</summary><p>Plenumda gazın yalnız bir bölümü sıvı ajanın bulunduğu hazneye girer ve çıkış, bu akımın baypas gazıyla karışmasıyla oluşur. [[K6 s. 213–214]] Doğrudan enjeksiyonda ise artan gaz akımına karşılık püskürtülen sıvı ajan miktarı da artırılır. [[K6 s. 218]] İlk düzende izlenecek büyüklük hazne ve baypas akımlarının oranı, ikinci düzende ise gaz akımıyla birlikte değişen püskürtme hızıdır. [[K6 s. 214]] [[K6 s. 218]]</p></details>
<h3>Desfluran neden ayrı bir devre gerektirir?</h3>
<p>Desfluran çok uçucudur ve 22,8 °C’de kaynar. [[K6 s. 216–218]] Sıcak bir yaz gününde ortam sıcaklığı sıvıyı kaynatmaya yetebilir ve hastaya zarar verebilecek bir doz ulaşabilir. [[K6 s. 218]]</p>
<ol><li><b>Hazneyi hazırla.</b> Desfluran 39 °C’de ve yaklaşık iki atmosfer basıncına karşılık gelen 200 kPa’da tutulur. [[K6 s. 218]] Sıcaklık denetimi ve elektrikli bileşenler cihazı standart vaporizatörden karmaşık kılar ve kullanım öncesinde ısınma süresi gerekir. [[K6 s. 218]]</li>
<li><b>Basınç farkını ölç.</b> Transdüser, taze gazın basıncını vaporizatörden çıkan buharın basıncıyla karşılaştırır. [[K6 s. 218]]</li>
<li><b>Buhar akımını ayarla.</b> Ölçülen fark, basınç düzeltme valfinin ayarını ve böylece hazneden çıkan buhar akımını belirler. [[K6 s. 218]]</li></ol>
</section>
<section class="wrap blk ders-sec" id="fk12-atmosfer">
<h2>İrtifada ve hiperbarik ortamda kadran nasıl okunur?</h2>
<p class="intro">Sabit sıcaklıkta SVP değişmez, fakat aynı parsiyel basınç düşük atmosfer basıncında karışımın daha büyük bir yüzdesine karşılık gelir. [[K6 s. 219]]</p>
${sekil('basinc', 'Sabit parsiyel basınçta yüzde nasıl değişir?', 'Eğri, deniz seviyesindeki konsantrasyona göre hesaplanan bağıl değeri gösterir. [[K6 s. 219]]')}
<p>Everest’e tırmanırken atmosfer basıncı azalır, hiperbarik odada ise artar. [[K6 s. 219]] Kadran ayarı yüzdeyle ifade edilse de klinik açıdan önemli büyüklük <b>parsiyel basınçtır</b>, çünkü Fick yasasına göre bir membrandan difüzyonu iki taraf arasındaki parsiyel basınç farkı belirler. [[K6 s. 219]]</p>
<p>Konsantrasyon (%) = 100 × <i>p</i> / <i>P</i> bağıntısında <i>p</i> ajan buharının parsiyel basıncı, <i>P</i> ortamın toplam basıncıdır ve ikisi de kPa ile ifade edilir. [[K6 s. 219]] SVP’ye dayanan vaporizatörde sıcaklık sabitken cihaz aynı parsiyel basıncı sunar. [[K6 s. 219]] Bu nedenle deniz seviyesi için kalibre edilmiş kadranın gösterdiği yüzde, ortam basıncı 101,3 kPa’dan saptığında sunulan yüzdeyle örtüşmez. [[K6 s. 219]]</p>
<div class="card"><h3>Aynı kadranla iki ortam</h3><ul><li><b>İrtifada</b> payda küçülür ve sunulan yüzde yükselir. [[K6 s. 219]]</li><li><b>Hiperbarik odada</b> payda büyür ve sunulan yüzde düşer. [[K6 s. 219]]</li></ul><p>Bir seçenek, vaporizatörü çalışacağı atmosfer basıncına göre fabrikada kalibre ettirmektir. [[K6 s. 219]]</p></div>
<details class="card"><summary>İrtifada yüzde yükselirse difüzyonu belirleyen basınç da yükselmiş midir?</summary><p>Yüzdedeki artışın hangi büyüklükten geldiğini belirlemek için önce sıcaklığı, sonra toplam basıncı düşünün. [[K6 s. 219]] K6’nın ele aldığı SVP’ye dayalı düzende sıcaklık değişmediyse haznedeki SVP ve hastaya sunulan buharın parsiyel basıncı aynı kalır. [[K6 s. 219]] Ortam basıncı düştüğü için ölçülen yüzde büyür ve tek başına bu değişim membrandan difüzyonu yorumlamaya yetmez. [[K6 s. 219]]</p></details>
<p><b>Eğriyi okuyun.</b> Her iki eksende de referans, deniz seviyesindeki değerdir. [[K6 s. 219]] Ortam basıncı deniz seviyesindekinin iki katına çıktığında aynı buhar basıncının toplamdaki payı yarıya iner. [[K6 s. 219]] Tersine, ortam basıncı yarıya inerse aynı parsiyel basıncı sağlayan yüzde iki katına çıkar. [[K6 s. 219]]</p>
</section>
<section class="wrap blk ders-sec" id="fk12-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin, sonra gerekçeyi açın.</p>
<div class="viz"><div data-viz="mtf" data-q="fk12-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk12-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk12-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk12-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Klinik ölçüm ve ekipman</span><p><b>Bir plenum vaporizatöründe kadranı sabit bırakıyorsunuz. Hazne ısınırsa cihaz çıkışı nasıl dengeler? Hastanın soluduğu konsantrasyonu nasıl doğrularsınız?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Taze gazın hazne ve baypas kollarına ayrıldığını, çıkışta yeniden birleştiğini gösterin. [[K6 s. 213–214]]</li>
<li>Fitille genişletilen ıslak yüzeyi ve haznede doygunluğun korunmasını açıklayın. [[K6 s. 214]]</li>
<li>Sıvı buharlaştıkça soğur; ısı deposu ve çevreden ısı ileten metal gövde değişimi sınırlar. [[K6 s. 215]]</li>
<li>Isınma SVP’yi yükselttiğinde otomatik düzenek hazneye giren gaz payını azaltır. [[K6 s. 215]]</li>
<li>Hastanın solunum sisteminde kızılötesi analizörle inspiryum konsantrasyonunu soluk soluk ölçün. [[K6 s. 217]]</li></ol>
<p class="note"><b>Çizin.</b> Girişteki ayrımı, fitilli hazneyi, baypası ve çıkıştaki birleşmeyi işaretleyin. [[K6 s. 213–214]] Isınma sırasında hangi kolun daha çok gaz aldığını okla gösterin. [[K6 s. 215]]</p>
<h3>Olası ek sorular</h3><ul><li>Aralıklı pozitif basınçlı ventilasyonda geri akımı hangi parça sınırlar?</li><li>İrtifada yüzde ile parsiyel basınç arasında nasıl bir ayrım yaparsınız?</li><li>Çift devreli desfluran cihazında transdüser neyi ölçer ve hangi valfi denetler?</li></ul></section>
<section class="wrap blk ders-sec" id="fk12-ozet"><h2>Özet</h2><ul class="ozet">
<li>Ajanın sıcaklığı SVP’yi, SVP ise haznede doygun taşıyıcı gaza katılabilecek buharı belirler. [[K6 s. 214–216]]</li>
<li>Baypas kolu, hazneden gelen buharla zenginleşmiş gazı çıkışta seyreltir. [[K6 s. 213–214]]</li>
<li>Isı deposu soğumayı sınırlar ve en sık kullanılan sıcaklık telafi elemanı bimetalik şerittir. [[K6 s. 215–216]]</li>
<li>Enjeksiyonda püskürtme gaz akımıyla artar, çift devreli desfluran cihazında ise 39 °C ve 200 kPa’daki hazneden buhar sunulur. [[K6 s. 218–220]]</li>
<li>SVP’ye dayanan cihazda ortam basıncı değiştiğinde aynı parsiyel basınç farklı bir yüzdeye karşılık gelir. [[K6 s. 219]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="12"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/11b">← Paramanyetik oksijen analizörü, elektrokimyasal hücreler ve kan gazı elektrotları</a><a href="#/dersler/fizik/13">Sonraki: Tıbbi gaz kaynakları: tüpler, merkezi sistem, vakum ve yanma riski →</a></nav>
</section>`,
  };
})();
