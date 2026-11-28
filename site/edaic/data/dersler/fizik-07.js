VERI.sorular = VERI.sorular || {};
VERI.sorular['fk07-1'] = {
  no: 1, kagit: 'Paper A · Fizik', kok: 'Nem ölçümü', kaynak: '[[K6 s. 123–126]]',
  onermeler: [
    {t:'Mutlak nem, aynı sıcaklıktaki doyma değerinin yüzdesidir.', d:false, n:'Mutlak nem birim hacimdeki su buharı kütlesidir. [[K6 s. 123–124]]'},
    {t:'Yaş haznenin soğumasında buharlaşmanın gizli ısısı rol oynar.', d:true, n:'Islak fitilden buharlaşan su, gereken ısıyı termometre haznesinden alır. [[K6 s. 124]]'},
    {t:'Saçlı higrometrede temel ölçüm disülfür köprülerinin suyla uzamasıdır.', d:false, n:'Suya duyarlı olanlar hidrojen bağlarıdır. [[K6 s. 125]]'},
    {t:'Çiy noktası ortam sıcaklığına eşitse bağıl nem %100’dür.', d:true, n:'Örnek, mevcut sıcaklığında doymuştur. [[K6 s. 126]]'},
    {t:'Regnault higrometresinde çiy noktası eterin kaynamaya başladığı anda okunur.', d:false, n:'Okunan sıcaklık gümüş tüpün dışında ilk yoğuşmanın görüldüğü sıcaklıktır. [[K6 s. 126]]'}
  ]
};
VERI.sorular['fk07-2'] = {
  no: 2, kagit: 'Paper A · Fizik', kok: 'Solunum devresinde nemlendirme', kaynak: '[[K6 s. 128–130]]',
  onermeler: [
    {t:'Ekspirasyonda yoğuşan su, HMEF elemanını ısıtır.', d:true, n:'Yoğuşma sırasında açığa çıkan gizli ısı elemanda tutulur. [[K6 s. 128]]'},
    {t:'HMEF devrenin ölü boşluğunu artırır.', d:true, n:'Filtrenin iç hacmi solunum devresine eklenir. [[K6 s. 129]]'},
    {t:'Aktif su banyosunda termostat kullanılması su tutucuyu gereksiz kılar.', d:false, n:'Banyodan çıkan gaz hortumda soğuyup yoğuşabildiği için su tutucu gerekir. [[K6 s. 129–130]]'},
    {t:'Pasif su banyosu çalıştıkça buharlaşma banyoyu soğutabilir.', d:true, n:'Su buharlaşırken banyodan gizli ısı çeker. [[K6 s. 129]]'},
    {t:'Filtrede sekresyon birikimi solunum işini artırabilir.', d:true, n:'Filtre ve higroskopik eleman sekresyonun geçişini engelleyebilir. [[K6 s. 129]]'}
  ]
};
VERI.sorular['fk07-3'] = {
  no: 3, kagit: 'Paper A · Fizik', kok: 'Aerosoller ve solunum koruyucuları', kaynak: '[[K6 s. 132–134]]',
  onermeler: [
    {t:'Nebülizör sıvı ilacı gaz fazına geçirerek taşır.', d:false, n:'İlaç damlacık içinde kalır ve yapısını korumalıdır. [[K6 s. 132]]'},
    {t:'5–10 µm parçacıklar üst hava yollarında birikme eğilimindedir.', d:true, n:'Bu aralıkta üst hava yollarına çökelme daha olasıdır. [[K6 s. 132]]'},
    {t:'Çok küçük damlacıklar tedavi etkisi göstermeden dışarı verilebilir.', d:true, n:'Çap 1 µm’nin çok altına indiğinde damlacık ekspirasyonla atılabilir. [[K6 s. 132]]'},
    {t:'Cerrahi maske yüzle hava geçirmez bir bağlantı oluşturur.', d:false, n:'Cerrahi maske gevşek oturur ve sıçramalara karşı fiziksel engel oluşturur. [[K6 s. 133–134]]'},
    {t:'Motorlu respiratörde havayı filtreden bir fan geçirir.', d:true, n:'Motorlu sistemde filtre üzerinden hava akımını fan sağlar. [[K6 s. 134]]'}
  ]
};

{
  const nav = [
    ['denge','Buhar ve çiy'], ['oran','Mutlak ve bağıl nem'], ['olcum','Higrometreler'],
    ['vucut','Ter ve solunum'], ['filtre','HMEF'], ['banyo','Su banyoları'],
    ['damla','Nebülizörler'], ['korunma','Aerosol ve korunma'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
  ];
  const sekil = (ad, baslik) => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk07_${ad}"></div><p class="viz-cap" aria-live="polite"></p></div>`;
  SAYFALAR['dersler/fizik/07'] = {
    grup:'dersler', eyebrow:'Fizik · Bölüm 7', baslik:'Nem, nemlendirme ve nebülizörler',
    lede:'Solunan gaza su ve ilaç iki ayrı biçimde katılabilir. [[K6 s. 128–132]] Nemlendirici solunan gaza su buharı kazandırırken nebülizör sıvı ilacı damlacıklar hâlinde taşır. [[K6 s. 128–132]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad]) => `<button type="button" data-scroll="fk07-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk07-denge">
<h2>Su hangi sıcaklıkta yoğuşur?</h2>
<p class="intro">Nem, havadaki su buharı miktarıdır. [[K6 s. 121]] Belirli bir sıcaklıkta sıvısıyla dengedeki buharın uygulayabileceği en yüksek basınca <b>doymuş buhar basıncı</b> denir. [[K6 s. 121]]</p>
${sekil('bulut','Su yüzeyinden buluta')}
<p>Suyun sıcaklığı arttıkça moleküllerin enerjisi artar, sıvıdan ayrılmaları kolaylaşır ve doymuş buhar basıncı yükselir. [[K6 s. 121–122]] “Sıcak hava daha çok su tutar” ifadesindeki belirleyici sıcaklık suyun sıcaklığıdır. [[K6 s. 122]] Su buharı havanın küçük bir bileşeni olduğundan ikisinin sıcaklıkları birbirine çok yakındır. [[K6 s. 122]]</p>
<p>Nemli hava soğuduğunda moleküllerin enerjisi azalır ve <b>çiy noktasında</b> su buharı doymuş hâle gelir. [[K6 s. 122]] [[K6 s. 126]] Daha fazla soğutulduğunda yoğuşma buharlaşmayı aşar ve sıvı damlaları belirir. [[K6 s. 122]] [[K6 s. 126]] Soğuk günde soluğun görünür olması ve sıcak odaya girince gözlük camlarının buğulanması aynı olayın iki örneğidir. [[K6 s. 122]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap atmosferin payını yaklaşık %1 verir. [[K6 s. 121]] Gerçekte atmosfer, Dünya’daki toplam suyun %1’inden çok daha azını içerir.</div>
<ol class="iskelet"><li>Güneşten gelen kızılötesi ışınım yüzey suyunu ısıtır, buharlaşma artar ve okyanus üzerinde hava o sıcaklığa ait doyma basıncına ulaşabilir. [[K6 s. 122–123]]</li>
<li>Su buharının kısmi basıncı arttığında hava daha az yoğun olur ve yükselir. [[K6 s. 123]] Yükseldikçe üzerindeki hava sütununun basıncı azalır, moleküller birbirinden uzaklaşır ve genişlemek için enerji harcayan hava soğur. [[K6 s. 123]]</li>
<li>Doymuş hava soğurken su, toz ve başka higroskopik parçacıkların üzerinde yoğuşur ve görünür bulut damlacıkları oluşur. [[K6 s. 123]] Su buharı azaldıkça hava yoğunlaşır, yükseliş durur ve bulut ile çevresindeki hava arasında buharlaşma–yoğuşma dengesi kurulur. [[K6 s. 123]]</li></ol>
<div class="note"><b>Çiy noktasını okuyun.</b> Soğuk camda ilk damla belirdiğinde camın hemen yanındaki hava, içerdiği suyla o sıcaklıkta doyuma ulaşmıştır. [[K6 s. 122]] [[K6 s. 126]] Camın dışında gördüğünüz su, daha önce gazın içinde buhar hâlindeydi. [[K6 s. 122]] Bulutta da gözle görünür hâle gelen, toz parçacıklarında yoğuşan sudur. [[K6 s. 123]]</div>
</section>
<section class="wrap blk ders-sec" id="fk07-oran">
<h2>Aynı gaz örneğini iki biçimde tanımlamak</h2>
<p class="intro">Mutlak nem birim hacimdeki su kütlesini, bağıl nem ise o sıcaklıkta doyma için gereken miktarın yüzde kaçına ulaşıldığını bildirir. [[K6 s. 123–124]]</p>
${sekil('oran','Doygunluğa ne kadar kaldı?')}
<div class="cols"><div class="card"><h3>Mutlak nem</h3><p><i>H</i> = <i>m</i> / <i>V</i> bağıntısında <i>m</i> su buharı kütlesi (g), <i>V</i> gaz örneğinin hacmi (m³), <i>H</i> ise mutlak nemdir (g·m<sup>−3</sup>). [[K6 s. 123–124]]</p><p>Bir metreküp havayı kapatıp içindeki suyun tamamını yoğuşturarak tartarsanız gram cinsinden sonuç o örneğin metreküp başına su içeriğini verir. [[K6 s. 123]] [[K6 s. 134]] Doğrudan ölçüm güçtür ve aynı su içeriğinin etkisi ortam sıcaklığına göre değişir. [[K6 s. 123]]</p></div>
<div class="card"><h3>Bağıl nem</h3><p><i>BN</i> (%) = 100 × <i>H</i> / <i>H</i><sub>doy</sub> bağıntısında pay gerçek buhar yoğunluğu (mevcut mutlak nem), payda aynı sıcaklıktaki doymuş buhar yoğunluğudur. [[K6 s. 123–124]] İki değer aynı birimle ifade edildiği için oran birimsizdir ve yüzde olarak verilir. [[K6 s. 123–124]]</p><p>Su içeriği değişmese bile sıcaklık değişince doyma için gereken miktar ve dolayısıyla bağıl nem değişir. [[K6 s. 122–123]] Bağıl nem %100 olduğunda gaz su buharına doymuştur. [[K6 s. 123]]</p></div></div>
<div class="note"><b>Hesap kartı · Büyük bronşta.</b> Tam doygunlukta 44 mg·L<sup>−1</sup> su içeren gaz için <i>BN</i> = 100 × 44 / 44 = %100 bulunur. [[K6 s. 123–124]] [[K6 s. 127]]</div>
<div class="card"><h3>Hesap kartı · Yüzdeden su miktarına dönün</h3>
<p>Grafikteki gaz örneğinde sıcaklığı sabit tutup bağıl nemin %50 olmasını istediğinizi düşünün, yani doyma için gereken suyun yarısını alın. [[K6 s. 123–124]] [[K6 s. 127]] Bağıntıyı su içeriği için düzenlerseniz <i>H</i> = (<i>BN</i> / 100) × <i>H</i><sub>doy</sub> elde edersiniz. [[K6 s. 123–124]] Doyma değeri 44 mg/L olduğunda 0,5 × 44 = 22 mg/L bulunur ve aynı sıcaklıkta doymaya ulaşmak için litre başına 22 mg daha su gerekir. [[K6 s. 123–124]] [[K6 s. 127]]</p></div>
<details class="card"><summary>Grafikte su eklemek ile örneği soğutmak arasındaki farkı açıklayın.</summary>
<p>Kaydırıcıda su içeriğini artırdığınızda doyma değeri sabit kalır, bu yüzden bağıl nem doğru boyunca yükselir. [[K6 s. 123–124]] Soğutma deneyinde ise başlangıçta örneğe su eklenmez, sıcaklık düşerken doyma için gereken su miktarı azalır. [[K6 s. 122–123]] İlk damla görüldüğünde pay ile payda birbirine eşittir. [[K6 s. 123]] [[K6 s. 126]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk07-olcum">
<h2>Higrometre gerçekte neyi ölçer?</h2>
<p class="intro">Nem ölçümüyle ilgilenen alan psikrometri, ölçüm aracı higrometredir. [[K6 s. 124]] Suyu doğrudan ölçmek güç olduğundan cihazlar sıcaklık farkı, tel uzunluğu veya yüzeyde ilk yoğuşma gibi gözlenebilir bir değişikliği kullanır. [[K6 s. 124–126]]</p>
${sekil('higrometre','Yaş ve kuru hazneleri karşılaştırın')}
<dl class="fk07-liste"><dt>Yaş–kuru hazneli higrometre</dt><dd>İki cam termometreden kuru olan ortam sıcaklığını ölçer, diğerinin haznesi suya doymuş fitille sarılıdır. [[K6 s. 124]] Hazne çevresinden düzenli ve sabit hava geçerken fitildeki suyun buharlaşma hızı ortam sıcaklığına ve bağıl neme bağlıdır. [[K6 s. 124]] Buharlaşma için gereken gizli ısı hazneden çekilir, bu nedenle yaş termometrenin sıcaklığı düşer. [[K6 s. 124]] Dengeye gelindiğinde kuru hazne sıcaklığı ve iki hazne arasındaki fark psikrometrik çizelgede buluşturulur. [[K6 s. 124]] Çizelge, bu iki ölçümden bağıl nemi bulmak için gereken hesabın grafik karşılığıdır. [[K6 s. 124]] Yöntem görece basit ve orta doğruluktadır. [[K6 s. 134–135]]</dd>
<dt>Gerilmiş saç teli</dt><dd>Saç sitokeratininde güçlü disülfür köprüleri ve hidrojen bağları bulunur. [[K6 s. 125]] Su disülfür bağlarını etkilemezken hidrojen bağlarının gevşeyip uzamasına yol açar. [[K6 s. 125]] Saçın nemlenince düzenli biçimde uzadığı on sekizinci yüzyıldan beri bilinir. [[K6 s. 125]] Gerilim altındaki telin su alması ortamın bağıl nemine bağlı olduğundan uzunluk değişimi bağıl neme göre kalibre edilebilir. [[K6 s. 125]] Puro saklama kutularındaki analog göstergeler bu basit yöntemi kullanır ve üç yöntem arasında doğruluğu en düşük olan budur. [[K6 s. 125]] [[K6 s. 134–135]]</dd>
<dt>Çiy noktası</dt><dd>Çiy noktası ile ortam sıcaklığı birbirine ne kadar yakınsa bağıl nem o kadar yüksektir, eşitlikte bağıl nem %100’dür. [[K6 s. 126]] Ortam sıcaklığı ve o sıcaklıktaki doymuş buhar basıncı biliniyorsa ölçülen çiy noktasından psikrometrik çizelgeyle bağıl nem bulunur. [[K6 s. 126]]</dd>
<dt>Regnault düzeneğinden soğutulmuş aynaya</dt><dd>On dokuzuncu yüzyıl ortalarındaki Regnault higrometresinde ısıyı iyi ileten gümüş tüpte eter bulunur. [[K6 s. 126]] Eterden hava kabarcıkları geçirilince eter buharlaşır, gizli ısı çekilir ve tüp soğur. [[K6 s. 126]] Tüpün <b>dış yüzeyindeki ilk çiy</b> görüldüğünde okunan sıcaklık çiy noktasıdır. [[K6 s. 126]] Elektronik aygıtta aynı olayı soğutulmuş ayna üzerindeki yoğuşmayı algılayan sensör saptar. [[K6 s. 126]] Çiy noktası yöntemi daha karmaşıktır ve üç yöntem içinde en doğru ölçümü sağlar. [[K6 s. 134–135]]</dd>
<dt>Uydu ölçümü</dt><dd>Uydular, troposferdeki suyun kızılötesi ışınımı soğurmasından mutlak nemi belirler. [[K6 s. 126]] Meteorolojide atmosferin su içeriği hava tahmininde, sıcaklıkla birlikte bağıl nem ise sıcak havada hissedilen sıcaklığın hesabında kullanılır. [[K6 s. 126]]</dd></dl>
${sekil('ciy','Regnault higrometresinde hangi sıvı nerede?')}
<div class="cols"><div class="card"><h3>Tüpün içinde</h3><p>Kabarcıkların geçtiği sıvı eterdir. [[K6 s. 126]] Tüpün içindeki buharlaşma soğumayı sağlar ve gümüşün ısıl iletkenliği sayesinde tüpün dış yüzeyinin sıcaklığı da düşer. [[K6 s. 126]] Soğutma için kullanılan eterin sıcaklık değişimini, havadaki su buharının tüpün dışında geçirdiği faz değişiminden ayırın. [[K6 s. 126]]</p></div>
<div class="card"><h3>Tüpün dışında</h3><p>Görülen ilk damla eter değil, çevredeki nemli havadan ayrılan sudur. [[K6 s. 126]] Ortam zaten doymuşsa çiy noktası ortam sıcaklığına eşittir, bu iki sıcaklık birbirinden uzaklaştıkça örnek doygunluktan uzaklaşır. [[K6 s. 126]] Soğutulmuş aynalı aygıtta tüpün dış yüzeyinin yerini ayna, ilk damlayı gözlemleyen kişinin yerini elektronik algılayıcı alır. [[K6 s. 126]]</p></div></div>
<div class="card"><h3>Ölçümden sonuca</h3><ul class="ozet"><li><b>İki sıcaklık okuyorsanız</b> önce kuru termometreden ortam sıcaklığını, sonra yaş termometreden buharlaşmayla oluşan farkı belirleyin. [[K6 s. 124]] Karşılaştırma, fitil ıslakken, etrafında düzenli hava akımı varken ve sıcaklıklar dengeye geldiğinde anlam taşır. [[K6 s. 124]]</li>
<li><b>Tek bir soğutulmuş yüzeye bakıyorsanız</b> kaydedilecek olay ilk damlanın oluşmasıdır. [[K6 s. 126]] Ortam ile çiy noktası sıcaklıklarını birlikte değerlendirin, çünkü çiy noktası tek başına bir sıcaklık, istenen bağıl nem ise bir yüzdedir. [[K6 s. 123–124]] [[K6 s. 126]]</li></ul></div>
</section>
<section class="wrap blk ders-sec" id="fk07-vucut">
<h2>Deride buharlaşma, hava yolunda nemlenme</h2>
<p class="intro">Deride ter buharlaşırken vücuttan ısı çeker, solunan gaz ise burundan büyük bronşlara ilerlerken ısı ve su kazanır. [[K6 s. 127–128]]</p>
${sekil('ter','Aynı oda sıcaklığı neden farklı hissedilir?')}
<div class="note"><b>Hesap kartı · Hissedilen sıcaklık.</b> Kitabın 24 °C’lik oda örneğinde bağıl nem %0 iken hissedilen sıcaklık 21 °C, %100 iken 27 °C’dir. [[K6 s. 127]] İki uç arasındaki fark 27 − 21 = 6 °C’dir, oysa kuru termometrenin gösterdiği ortam sıcaklığı iki durumda da aynıdır. [[K6 s. 124]] [[K6 s. 127]]</div>
<p><b>Terleme.</b> Derideki ter bezlerinin salgısı ağırlıklı olarak sudur ve terleme insanın başlıca soğuma mekanizmasıdır. [[K6 s. 127]] Buharlaşma için gereken gizli ısıyı deri sağlar, terin buharlaşma hızı çevrenin bağıl nemine bağlıdır. [[K6 s. 127]] Doymuş ortamda bu soğutma yolu işlemez ve en rahat hissedilen bağıl nem aralığı %45–55’tir. [[K6 s. 127]]</p>
<ol class="iskelet"><li><b>Burun ve bronşlar.</b> Soğuk hava alt konkalar üzerinden geçerken 36 °C’ye kadar ısınır ve nemli burun mukozasından su buharı alır. [[K6 s. 127]] Büyük bronşlara ulaştığında gaz doymuştur, su içeriği 44 mg·L<sup>−1</sup> ve su buharının kısmi basıncı yaklaşık 6 kPa’dır. [[K6 s. 127]]</li>
<li><b>Anestezide iki değişiklik.</b> Valf ve regülatörlerin buzdan ya da sudan zarar görmesini önlemek için tıbbi gazlar olabildiğince kuru üretilir. [[K6 s. 127]] Endotrakeal tüp veya laringeal maske burundaki doğal nemlendirme yolunu devre dışı bırakır. [[K6 s. 127]]</li>
<li><b>Sekresyon ve silyalar.</b> Uzun süre kuru gaz solunduğunda sekresyon koyulaşıp zor taşınır, mukus tıkacı ve ardından hipoventilasyon gelişebilir. [[K6 s. 127]] Gazın epitelden su çekmesi mukozayı soğutarak silyaların çalışmasını baskılar. [[K6 s. 127]] Uzamış maruziyet mukozada keratinizasyona ve silyaların tamamen kaybına yol açar. [[K6 s. 127]]</li></ol>
<div class="note"><b>İki ölçüm yerini ayırın.</b> Alt konkalar için verilen 36 °C havanın ısınmasını, büyük bronşlar için verilen 44 mg/L ise gazın ulaştığı su içeriğini tarif eder. [[K6 s. 127]] Aynı bronş gazı için yaklaşık 6 kPa denildiğinde ölçülen büyüklük su buharının karışımdaki kısmi basıncıdır. [[K6 s. 127]] Dolayısıyla birimlere bakarak sıcaklığı, birim hacimdeki kütleyi ve su buharının basıncını ayırt edebilirsiniz. [[K6 s. 123–124]] [[K6 s. 127]]</div>
<div class="card"><h3>Solunumla ısı kaybının iki bileşeni</h3>
<p>Gazı ısıtmak için <i>Q̇</i><sub>ısı</sub> = <i>V̇</i> × <i>c</i><sub>hava</sub> × Δ<i>T</i>, kuru gazı nemlendirmek için <i>Q̇</i><sub>nem</sub> = <i>V̇</i> × Δ<i>H</i> × <i>L</i><sub>v</sub> gerekir. [[K6 s. 128]]</p>
<p>Hacimsel ventilasyon <i>V̇</i> (L/dk) kullanıldığında <i>c</i><sub>hava</sub> bir litre havayı bir derece ısıtmak için gereken ısıdır (J·L<sup>−1</sup>·°C<sup>−1</sup>), Δ<i>T</i> sıcaklık artışıdır (°C). [[K6 s. 128]] Δ<i>H</i> litre başına eklenecek su (g/L), <i>L</i><sub>v</sub> suyun özgül buharlaşma gizli ısısıdır (J/g) ve her iki çarpım ısı kaybı hızını (J/dk) verir. [[K6 s. 128]]</p>
<p>Anestezi altındaki erişkinde bu iki kayıp birlikte toplam ısı kaybının yaklaşık %10’udur, radyasyon, konveksiyon ve buharlaşmayla kayıp daha önemlidir. [[K6 s. 128]] Yenidoğanda yüksek ventilasyon hızı ve büyük yüzey alanı/hacim oranı nedeniyle solunumsal kayıp önem kazanır. [[K6 s. 128]]</p></div>
<details class="card"><summary>Isı kaybı hesabında hangi büyüklük hangi soruya yanıt verir?</summary><p>İlk çarpımda birim zamanda solunan hava hacmini, bu havanın ısı kapasitesini ve kaç derece ısındığını izleyin. [[K6 s. 128]] İkinci çarpımda aynı hacim için gereken su miktarını bulun, ardından bu kadar suyu buhara çevirmek için gereken ısıyı hesaplayın. [[K6 s. 128]] Gazın yalnız sıcaklık artışını hesaba katmak, suyun faz değiştirmesi için harcanan ısıyı dışarıda bırakır. [[K6 s. 128]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk07-filtre"><h2>Isı ve nem değiştirici filtre (HMEF)</h2>
<p class="intro">Hasta ucuna yakın yerleştirilen HMEF, ekspirasyon gazındaki suyu ve ısıyı tutar, bir sonraki inspirasyonda bunları kuru gaza geri verir. [[K6 s. 128]]</p>
${sekil('hmef','Gazın geçtiği iki eleman')}
<div class="cols"><div class="card"><h3>Bir solukta depola, diğerinde geri ver</h3><p>Kapalı gövdenin içindeki higroskopik malzeme kalsiyum klorür veya silika jel olabilir. [[K6 s. 128]] Ekspirasyonda ılık ve nemli gaz yüzeyle karşılaşınca su yoğuşur, açığa çıkan gizli ısı elemanı ısıtır. [[K6 s. 128]] İnspirasyonda soğuk ve kuru gaz aynı yüzeyden geçerken su buharlaşır, gaz hastaya ısınmış ve nemlenmiş ulaşır. [[K6 s. 128]]</p></div>
<div class="card"><h3>Verim ve filtreleme</h3><p>Rutin anestezide en sık kullanılan nemlendiricidir, pasif ve ucuzdur, tek kullanımlıktır ve kuru gazları 24 saate kadar yeterli düzeyde nemlendirebilir. [[K6 s. 128]] Uygun malzeme ve tasarımla değişim verimi yaklaşık %80’dir. [[K6 s. 129]] Geri kazanım tam olmadığı için hasta zaman içinde az miktarda ısı ve su kaybeder. [[K6 s. 129]] Kitap, 0,2 µm filtrenin bakteri ve virüs geçişini engelleyerek ventilatör ile devreyi kontaminasyondan koruduğunu belirtir. [[K6 s. 129]]</p></div></div>
${sekil('cevrim','Soluk yönünü değiştirin')}
<ul class="ozet"><li><b>Ölü boşluk.</b> Filtrenin eklediği hacim pediatrik HMEF’de 8 mL’den erişkin HMEF’de 100 mL’ye kadar değişebilir. [[K6 s. 129]]</li><li><b>Direnç.</b> Kitap ek direnci 2,0 cmH₂O’ya kadar bildirir. [[K6 s. 129]] Ek hacim ve direnç çoğu hastada belirgin sorun yaratmasa da yenidoğanda veya solunum mekaniği ağır bozulmuş hastada önemli olabilir. [[K6 s. 129]]</li><li><b>Sekresyon.</b> Higroskopik malzeme ve filtre sekresyonu tutup geçişi güçleştirirse solunum işi belirgin artabilir. [[K6 s. 129]] Bu sık karşılaşılan sorun fark edildiğinde filtre değiştirilir. [[K6 s. 129]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap ek direnci cmH₂O ile verir. [[K6 s. 129]] Bu bir basınç farkı birimidir, direnç için basınç farkı ölçümdeki akıma bölünür.</div>
<details class="card"><summary>HMEF verimi ile gazın bağıl nemi aynı yüzdeyi mi anlatır?</summary><p>Bağıl nemde karşılaştırma, gazın mevcut su içeriği ile o sıcaklıkta doyma için gereken miktar arasındadır. [[K6 s. 123–124]] HMEF için verilen yaklaşık %80 ise ekspirasyonda tutulan ısı ve nemin geri kazanılmasını tanımlayan bir verimdir. [[K6 s. 128–129]] İnspirasyon gazının doymaya ne kadar yaklaştığını belirlemek için gazın sıcaklığını ve su içeriğini ayrıca değerlendirmek gerekir. [[K6 s. 123–124]]</p></details>
<div class="note"><b>Hasta ucunda iki ayrı yük.</b> Yenidoğanda filtre seçimini değerlendirirken önce cihazın eklediği iç hacmi düşünün. [[K6 s. 129]] Daha sonra gazın elemandan geçmesi için gereken basınç farkını ve sekresyon birikiminin bu geçişi nasıl güçleştirebileceğini değerlendirin. [[K6 s. 129]] HMEF’nin nemi iyi geri kazanması, eklediği ölü boşluk veya akıma gösterdiği direnç hakkında tek başına bilgi vermez. [[K6 s. 129]]</div>
</section>
<section class="wrap blk ders-sec" id="fk07-banyo"><h2>Su banyosundan hasta ucuna</h2>
<p class="intro">Pasif banyoda nemlendirmeyi suyun sıcaklığı sınırlar, aktif banyoda ısıtıcı ve termostat buharlaşmayla kaybedilen ısıyı karşılar. [[K6 s. 129]]</p>
${sekil('banyo','Gaz ve yoğuşan su hangi yolu izler?')}
<dl class="fk07-liste"><dt>Pasif su banyosu</dt><dd>İnspirasyon gazı haznedeki sudan kabarcıklar hâlinde geçirilerek doyurulur. [[K6 s. 129]] Kabarcık büyüklüğünü ayarlayan düzenekler gazın suyla temas yüzeyini artırır. [[K6 s. 129]] Gaz ancak banyo sıcaklığının izin verdiği kadar su alabilir ve buharlaşma gizli ısı çekerek banyoyu soğuttukça ulaşılabilir nem daha da düşer. [[K6 s. 129]]</dd>
<dt>Aktif su banyosu</dt><dd>Isıtma elemanı ve termostat suyu 40–60 °C’de tutar, böylece gaz daha fazla ısınır ve taşıyabileceği su miktarı artar. [[K6 s. 129]] Sistem yüksek akımlarda bile 37 °C’de tam doymuş gaz verebilir, %100 verime erişebilir ve hastayı ısıtmak için de kullanılabilir. [[K6 s. 129]] HMEF’ye göre hacimli ve karmaşık olduğundan genellikle uzun süreli ventilasyon veya oksijen tedavisinde tercih edilir. [[K6 s. 129]]</dd>
<dt>Hortumdaki su</dt><dd>Banyodan uzaklaşan gaz soğuduğunda devrede su yoğuşur, özellikle aktif sistemlerde bu olay belirgindir. [[K6 s. 129–130]] Sarkan hortum kıvrımında biriken su hastaya ulaşıp boğulmaya yol açabilir. [[K6 s. 130]] Bu nedenle her su banyosunda su tutucu bulunur ve hortumun ısıtılması yoğuşma riskini azaltabilir. [[K6 s. 129–131]]</dd>
<dt>Yanık ve mikrobiyal çoğalma</dt><dd>Yaklaşık 40 °C’de hava yolunun sıcak gazla yanma riski azalır, ancak banyo mikroorganizmaların çoğalmasına elverişli olabilir. [[K6 s. 130]] Suyu 60 °C’ye ısıtmak bakteriyel kontaminasyon riskini azaltır, bu kez gaz sıcaklığının dikkatle izlenmesi gerekir. [[K6 s. 130]] Hastaya giden gazın sıcaklığını algılayan termistör, geri beslemeyle termostatı ve dolayısıyla banyo sıcaklığını ayarlayarak hava yolunu yanıktan koruyabilir. [[K6 s. 130]]</dd></dl>
${sekil('sicaklik','Banyonun ayarını değiştirin')}
<div class="note"><b>Hangi sıcaklığı okuyorsunuz?</b> Kaydırıcı suyun sıcaklığını gösterir. [[K6 s. 129–130]] Banyo için verilen 40–60 °C aralığını, hastaya verilebilen doymuş gazın 37 °C değeriyle karıştırmayın. [[K6 s. 129]] Gaz banyodan çıktıktan sonra sıcaklığı değişebildiği için geri besleme devresinde hastaya giden gazın sıcaklığını izlemek önemlidir. [[K6 s. 129–130]]</div>
<div class="card"><h3>Şemada üç ayrı yolu izleyin</h3><ol class="iskelet">
<li><b>Gaz yolu.</b> Su haznesinden çıkan gaz hasta ucuna ilerlerken sıcaklığı düşebilir. [[K6 s. 129–130]] Banyoda doymuş hâle gelmiş gazın taşıdığı suyun bir bölümü bu sırada hortumun içinde sıvıya dönebilir. [[K6 s. 129–130]]</li>
<li><b>Sıvı yolu.</b> Su tutucu, gazın içindeki buharı ölçmek için değil, soğumayla ayrılmış sıvının devrede birikmesini önlemek için kullanılır. [[K6 s. 129–131]]</li>
<li><b>Sinyal yolu.</b> Aktif seçenekte termistörden geri dönen bilgi sıcaklıktır. [[K6 s. 130]] Bu yolun sonunda termostat suyun sıcaklığını ayarlar, böylece hastaya ulaşan gazın sıcaklığı da değişir. [[K6 s. 130]]</li></ol></div>
</section>
<section class="wrap blk ders-sec" id="fk07-damla"><h2>İlacı taşıyan damlacık</h2>
<p class="intro">Aerosol, taşıyıcı gaz içinde asılı sıvı damlacıkları veya katı parçacıklardır. [[K6 s. 131–132]] Sis görünür bir örnektir, toz ve polen gibi aerosoller ise çoğu zaman görülmez. [[K6 s. 133]] Bakteriler, mayalar, su damlaları ve duman parçacıkları da aerosol oluşturabilir. [[K6 s. 131]]</p>
${sekil('damla','Çap değişince birikim yeri nasıl değişir?')}
<p>Parçacık boyutu hem gaz içinde asılı kalma kararlılığını hem de solunduğunda ne kadar derine ulaşacağını belirler. [[K6 s. 132]] Sıvı ilacın alveole varması için damlacığın terminal bronşiyol çapından küçük olması gerekir. [[K6 s. 132]] Çap genellikle mikrometreyle verilir (1 µm = 1 × 10<sup>−6</sup> m) ve kitap 0,005–50 µm aralığını bildirir. [[K6 s. 132]]</p>
<ul class="ozet"><li>5–10 µm parçacıklar üst hava yollarında birikme eğilimindedir. [[K6 s. 132]]</li><li>5 µm’nin altında yerçekiminin etkisi ihmal edilebilir ve parçacıklar akciğerin derinlerine ilerler. [[K6 s. 132]]</li><li>3 µm’nin altındaki damlacıklar alveole ulaşarak tedavi etkisi sağlayabilir. [[K6 s. 132]] Kitap 1 µm’nin altını ideal olarak niteler, ancak bundan çok daha küçük damlacıklar etkisiz biçimde ekshale edilebilir. [[K6 s. 132]]</li></ul>
${sekil('jet','Jet nebülizörde gaz jeti ve kapiller ağız')}
<div class="cols"><div class="card"><h3>Jet veya gazla çalışan nebülizör</h3><p>Atomizerde basınçlı gaz küçük bir açıklıktan geçerek sıvıya daldırılmış kapiller tüpün ağzı üzerinden yüksek hızla akar. [[K6 s. 132]] Venturi etkisiyle oluşan düşük basınç sıvıyı yukarı çeker ve damlacıklar gaza katılır. [[K6 s. 132]] Düzenek basit ve ucuzdur, fakat gaz akımındaki küçük değişiklikler hastaya ulaşan aerosol miktarını tutarsızlaştırabilir. [[K6 s. 132]]</p></div>
<div class="card"><h3>Ultrasonik nebülizör</h3><p>Ultrasonik cihazlar jet tipe göre daha tutarlı parçacık boyutu üretme eğilimindedir, bu da akciğere daha fazla sıvı birikimi sağlar. [[K6 s. 132]] Uzun süreli kullanımda biriken sıvının alveollerde yüzey geriliminin kararlılığını etkileyebileceğine ilişkin kaygı bildirilmiştir. [[K6 s. 132]]</p></div></div>
<div class="note"><b>Çapı yorumlama.</b> 5–10 µm için üst hava yolunda birikme bir eğilimdir. [[K6 s. 132]] “5 µm’den küçük” bilgisi tek başına alveole ulaşmayı söylemek için yeterli değildir, kitap alveole giriş için 3 µm altını ayrıca belirtir. [[K6 s. 132]] Aynı nedenle “daha küçük” ifadesini “her zaman daha etkili” diye okumayın, çap 1 µm’nin çok altına inerse ekshalasyon tedavi etkisini ortadan kaldırabilir. [[K6 s. 132]]</div>
<p><b>Fazı ayırt edin.</b> Vaporizatör buhar üretir, nebülizör ise ilacı akciğere taşımak üzere sıvı mikrodamlacık veya katı parçacık aerosolleri oluşturur. [[K6 s. 132]] Sıvı ilaç gaz fazına geçmemeli, yapısı korunmalı ve üretilen aerosolün sıcaklığı 37 °C’yi aşmamalıdır. [[K6 s. 132]]</p>
<details class="card"><summary>Nemlendirici ile nebülizörü çizimde nasıl ayırırsınız?</summary>
<p>Su banyosunda gazın kazandığı su, buharlaşarak gaz fazına geçen sudur. [[K6 s. 129]] Jet nebülizör çiziminde ise kapillerden yükselen sıvının gazla buluştuğu yere bakın, burada birbirinden ayrı ilaç damlacıkları gaz içinde asılı kalır. [[K6 s. 131–132]] Tedavide ulaşılacak bölgeyi tartışırken bu damlacıkların çapı önem kazanır, çünkü çok küçük olanlar akciğere ulaşsa bile yeniden dışarı verilebilir. [[K6 s. 132]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk07-korunma"><h2>Aerosol oluşturan işlemler ve solunum koruyucuları</h2>
<p class="intro">Aerosol oluşturan işlem, havaya potansiyel olarak patojen taşıyan parçacık veya solunum damlacıkları çıkaran sağlık girişimidir. [[K6 s. 133]]</p>
${sekil('koruma','Solunan hava nereden gelir?')}
<p>Öksürme ve hapşırma balgam, mukus ve başka kalıntılardan aerosol oluşturur. [[K6 s. 133]] İşlem sırasında ortaya çıkan aerosol hem mikro hem makrodamlacıklar içerebilir, nebülizörün oluşturduğu sis ise ağırlıklı olarak mikrodamlacıklardan oluşur. [[K6 s. 133]]</p>
<p>Enfeksiyöz aerosol, patojen taşıyan damlacık ve kalıntıların duyarlı bir kişiye ulaşması veya onun tarafından solunmasıyla risk oluşturur. [[K6 s. 133]] Kitap koronavirüs, norovirüs, tüberküloz basili, influenza ve Ebola için bulaş riskinin değerlendirilmesini ister. [[K6 s. 133]]</p>
<h3>Hangi girişimlerde maruziyet düşünülür?</h3>
<ul class="ozet"><li>Açık aspirasyon, manuel ventilasyon, entübasyon ve ekstübasyon. [[K6 s. 133]]</li><li>Trakeotomi veya trakeostomiye yönelik girişimler, bu yoldan entübasyon ve ekstübasyon. [[K6 s. 133]]</li><li>Bronkoskopi ve solunum yolu aspirasyonu içeren üst hava yolu KBB girişimleri. [[K6 s. 133]]</li><li>BiPAP ve CPAP dâhil noninvaziv ventilasyon, ayrıca yüksek akımlı nazal oksijen (HFNO). [[K6 s. 133]]</li></ul>
<dl class="fk07-liste"><dt>Maske</dt><dd>Gevşek oturur, ağız ve burun ile kirleticiler arasında fiziksel bir engel oluşturur. [[K6 s. 133]] Kitap, üretim standardına bağlı olmayan yüz örtülerinin klinik ortamda koruma sağlamadığını belirtir. [[K6 s. 134]] Cerrahi maske tanınmış bir standarda göre üretilir, sıvı damlacıklarına ve sıçramalara dayanır, ancak yüzü sızdırmaz biçimde kapatmaz. [[K6 s. 134]]</dd>
<dt>Filtreli respiratör</dt><dd>Kirleticileri filtreyle uzaklaştırır. [[K6 s. 134]] Yüze sıkı oturan filtreli yüz parçası (FFP), kişinin inspirasyon işiyle havayı filtreden çektiği negatif basınçlı respiratördür ve damlacıklarla diğer parçacıkların solunmasına karşı koruma amaçlar. [[K6 s. 133–134]] Motorlu respiratörde filtre üzerinden kullanıcıya hava akışını fan sağlar. [[K6 s. 134]]</dd>
<dt>Bağımsız hava beslemeli solunum cihazı</dt><dd>Solunabilir nitelikteki havayı çevreden bağımsız bir kaynaktan, örneğin boru hattından, basınçlı hava tüpünden veya kompresörden alır. [[K6 s. 134]]</dd></dl>
<h3>Kitabın FFP karşılaştırması</h3>
<p>Kitap sınıfları 0,3 µm çaplı parçacıkların tutulan en düşük yüzdesiyle karşılaştırır ve baş bandı rengi ile parçacık örnekleri verir. [[K6 s. 134]]</p>
<div class="fk07-kartlar"><div class="card"><h4>FFP1</h4><p>En az %80, sarı bant. [[K6 s. 134]] Tuğla tozu, polen, selüloz, çimento, alçı ve kömür tozu. [[K6 s. 134]]</p></div><div class="card"><h4>FFP2</h4><p>En az %95, mavi veya beyaz bant. [[K6 s. 134]] Fren tozu, kuru ot ve kurşun tozu. [[K6 s. 134]]</p></div><div class="card"><h4>FFP3</h4><p>En az %99, kırmızı bant. [[K6 s. 134]] Asbest, bakteriler, virüsler ve radyoaktif parçacıklar. [[K6 s. 134]]</p></div></div>
<div class="note"><b>Yüzdeyi okurken paydayı söyleyin.</b> Bu karşılaştırmada yüzde, kitapta belirtilen çaptaki parçacıkların filtre tarafından tutulan bölümünü ifade eder. [[K6 s. 134]] Örneğin FFP3 satırındaki %99, 0,3 µm çaplı parçacıklar için bildirilen en düşük tutma oranıdır. [[K6 s. 134]] Yüz parçasının sıkı oturması ve kullanıcının havayı filtreden çekmesi ise aygıtın nasıl çalıştığını tarif eder. [[K6 s. 133–134]]</div>
<div class="note plain"><b>Atlas notu.</b> Kitap FFP2 için en az %95 verir. [[K6 s. 134]] Avrupa FFP2 sınıfında filtre verimi için alt sınır %94’tür.</div>
<details class="card"><summary>Koruyucuları tarif ederken hangi üç soruyu sorarsınız?</summary>
<ol class="iskelet"><li>Yüz parçası gevşek bir sıçrama engeli mi, yoksa havayı filtreden geçirecek biçimde yüze sıkı oturuyor mu? [[K6 s. 133–134]]</li>
<li>Hava filtreden geçiyorsa bunu sağlayan kullanıcının inspirasyonu mu, yoksa motorlu bir fan mı? [[K6 s. 133–134]]</li>
<li>Solunan hava ortam havasından mı elde ediliyor, yoksa boru hattı, tüp ya da kompresör gibi bağımsız bir kaynak mı kullanılıyor? [[K6 s. 134]]</li></ol></details>
</section>
<section class="wrap blk ders-sec" id="fk07-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi önce kendiniz yanıtlayın, ardından gerekçesini açın.</p>
<div class="viz"><div data-viz="mtf" data-q="fk07-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk07-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk07-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk07-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Entübe bir hastada uzun süreli ventilasyon planlıyorsunuz. Solunan gazı neden ve nasıl nemlendirirsiniz? Devrenin hasta ucunda hangi iki tehlikeyi önlemek istersiniz?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Kuru tıbbi gaz ve burnun devre dışı kalması sekresyonların koyulaşmasına, tıkaçlara ve silya işlevinin kaybına yol açabilir. [[K6 s. 127]]</li>
<li>HMEF ekspirasyonda su ve ısı tutar, inspirasyonda bunları geri verir, ancak direnç ve ölü boşluk ekler. [[K6 s. 128–129]]</li>
<li>Uzun süreli ventilasyonda aktif banyo yüksek akımda 37 °C’de doymuş gaz sağlayabilir. [[K6 s. 129]]</li>
<li>Yoğuşan su için devreye su tutucu konur, ısıtılmış hortum yoğuşmayı azaltabilir. [[K6 s. 129–131]] Gaz sıcaklığını algılayan termistörün termostata geri beslemesi hava yolu yanığını önlemeye yardım eder. [[K6 s. 130]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Su banyosundan hasta ucuna gaz yolunu izleyin, alçak noktadaki su tutucuyu ve termistörden termostata geri beslemeyi işaretleyin. [[K6 s. 129–131]]</div>
<div class="note plain"><b>Ek sorular.</b> HMEF tıkanırsa solunum işi nasıl değişir? [[K6 s. 129]] Çiy noktasını nasıl ölçersiniz? [[K6 s. 126]] Jet nebülizörde sıvıyı kapiller boyunca yükselten nedir? [[K6 s. 132]]</div></div></section>
<section class="wrap blk ders-sec" id="fk07-ozet"><h2>Özet</h2><ul class="ozet">
<li>Mutlak nemi kütle/hacim olarak, bağıl nemi aynı sıcaklıktaki doyma değerinin yüzdesi olarak ifade edin. [[K6 s. 123–124]]</li>
<li>Yaş ve kuru hazne sıcaklık farkı, saç uzunluğu ve çiy noktası nem ölçümünde kullanılan üç göstergedir. [[K6 s. 124–126]]</li>
<li>HMEF hastanın ekspirasyon ısısını ve suyunu geri kazandırır, aktif banyo ise dışarıdan ısı sağlayarak tam doygunluğa ulaşabilir. [[K6 s. 128–130]]</li>
<li>Nebülizörde damlacığın çapı akciğerde ulaşabileceği bölgeyi etkiler. [[K6 s. 132]] Aerosol oluşturan işlemlerde personelin maruziyeti ve uygun solunum koruyucusu değerlendirilir. [[K6 s. 133–135]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="07"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/06b">← Kan basıncı: noninvaziv ve invaziv ölçüm</a><a href="#/dersler/fizik/08a">Sonraki: Akım: laminer ve türbülanslı akım →</a></nav>
</section>`
  };
}
