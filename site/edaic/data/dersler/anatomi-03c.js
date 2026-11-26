VERI.sorular = VERI.sorular || {};
(function () {
  'use strict';
  const kagit = 'Paper A · Anatomi';
  VERI.sorular['an03c-1'] = {
    no: 1, kagit, kok: 'Spinal meninksler ve epidural aralık için her önermeyi değerlendirin.', kaynak: '[[K5 s. 130–135]]',
    onermeler: [
      {t:'Spinal dura, kraniyal duranın endosteal tabakasından devam eder.', d:false, n:'Spinal kanala uzanan kat meningeal kattır. [[K5 s. 130–131]]'},
      {t:'Dural kese S3 düzeyine kadar uzanabilir.', d:true, n:'Olağan sonlanma S2 olmakla birlikte L5 ve S3 uç değerlerdir. [[K5 s. 131]]'},
      {t:'Dentikülat bağın dişleri duradan köken alır.', d:false, n:'Üçgen dişler pianın yan uzantılarıdır ve tepeleri duraya tutunur. [[K5 s. 131–132]]'},
      {t:'Epidural venler pelvik ve serebral venler arasında bağlantı kurar.', d:true, n:'Kapaksız ven ağı bu iki bölge arasında yayılıma izin verebilir. [[K5 s. 135]]'},
      {t:'Komşu paravertebral aralıklar birbirine doğrudan açılır.', d:false, n:'Ardışık düzeyler arasındaki bağlantı epidural aralıktan geçer. [[K5 s. 133]]'}
    ]
  };
  VERI.sorular['an03c-2'] = {
    no: 2, kagit, kok: 'BOS dolaşımı ve konus düzeyi için her önermeyi değerlendirin.', kaynak:'[[K5 s. 136–139]]',
    onermeler:[
      {t:'Lateral ventrikül üçüncü ventriküle Monro forameniyle açılır.', d:true, n:'Tek taraflı Monro tıkanıklığı o tarafta hidrosefaliye yol açar. [[K5 s. 136]]'},
      {t:'Oturunca lomber BOS basıncı azalır.', d:false, n:'Otururken lomber basınç 350–550 mm BOS’a yükselir. [[K5 s. 137]]'},
      {t:'Spinal araknoid villuslar BOS emilimine katılır.', d:true, n:'Kalan beşte birin emiliminde spinal villuslar ve sinir kılıfları boyunca lenf yolları rol alır. [[K5 s. 136]]'},
      {t:'Yenidoğanda konus L3 alt kenarı hizasındadır.', d:true, n:'Vertebral kolonun daha hızlı büyümesiyle erişkindeki ortalama sonlanma L1–L2 diskine gelir. [[K5 s. 137]]'},
      {t:'Erişkin omuriliği nadiren T12 hizasında bitebilir.', d:true, n:'T12 ve L3, erişkin sonlanma düzeyinin seyrek uçlarıdır. [[K5 s. 137–138]]'}
    ]
  };
  VERI.sorular['an03c-3'] = {
    no: 3, kagit, kok:'Omurilik yolları, damarları ve lezyonları için her önermeyi değerlendirin.', kaynak:'[[K5 s. 140–146]]',
    onermeler:[
      {t:'Arka kolon lifleri omuriliğe girdikleri segmentte topluca çaprazlaşır.', d:false, n:'Liflerin çoğu aynı tarafta yükselir ve medulladaki çekirdeklerde sinapstan sonra çaprazlaşır. [[K5 s. 141]]'},
      {t:'Adamkiewicz arteri çoğunlukla sağdan gelir.', d:false, n:'Bu büyük ön radiküler arter çoğu olguda soldan gelir. [[K5 s. 144]]'},
      {t:'Hemiseksiyonda lezyonun altında karşı tarafta ağrı ve sıcaklık duyusu kaybolur.', d:true, n:'Kesilen spinotalamik lifler omurilikte karşıya geçmiş liflerdir. [[K5 s. 146]]'},
      {t:'Lateral piramidal traktus lateral spinotalamik traktusun arkasındadır.', d:true, n:'Kordotomide ağrı yolunun hemen arkasındaki motor yolu korumak amaçlanır. [[K5 s. 141]] [[K5 s. 146]]'},
      {t:'Siringomiyeli üst ekstremitelerde iki taraflı ağrı ve sıcaklık kaybıyla başlayabilir.', d:true, n:'Merkezdeki kistik değişiklik her iki taraftan gelip orta hattı geçen lifleri zedeler. [[K5 s. 146]]'}
    ]
  };

  const nav = [['zar','Meninksler'],['epidural','Epidural aralık'],['bos','BOS üretimi'],['akis','BOS dolaşımı'],['konus','Konus ve kökler'],['duzey','Konus düzeyi'],['kesit','Omurilik kesiti'],['yollar','İleti yolları'],['damar','Kanlanma'],['lezyon','Lezyonlar'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  function sekil(id, baslik) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="an03c_${id}"></div><p class="viz-cap" aria-live="polite"></p></div>`;
  }
  SAYFALAR['dersler/anatomi/03c'] = {
    grup:'dersler', eyebrow:'Anatomi · Bölüm 3 · Ders 03c', baslik:'Spinal meninksler, BOS ve omurilik',
    lede:'Epidural kateter dura dışında kalır, intratekal ilaç ise beyin omurilik sıvısına ulaşır. [[K5 s. 132–135]] Bir omurilik lezyonunda kaybın tarafını, kesilen yolun nerede çaprazlaştığı belirler. [[K5 s. 140–141]] [[K5 s. 146]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad],i)=>`<button type="button" data-scroll="an03c-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an03c-zar"><h2>Omuriliği hangi zarlar sarar?</h2>
<p class="intro">Dura dış kılıfı oluşturur, araknoid bu kılıfın iç yüzünü döşer, pia ise omuriliğin oluk ve fissürlerine kadar girer. [[K5 s. 130–131]]</p>
${sekil('katman','Dışarıdan içeriye zarları ve aralıkları izleyin')}
<p class="an03c-rehber">Kaldırılmış dura ile saydam araknoidin serbest kenarlarını karşılaştırın. [[K5 s. 130–132]]</p>
<h3>Dural kesenin tutunma noktaları</h3>
<p>Kafa içinde dura iki katlıdır ve venöz sinüsler bu katlar arasında yer alır. [[K5 s. 130]] Yoğun fibröz meningeal kat spinal dura olarak sürer. [[K5 s. 130–131]] Endosteal kat foramen magnumda kafatası periostuyla birleşir, aşağıda kanal duvarını vertebral periost döşer. [[K5 s. 131]]</p>
<ul class="ozet">
<li><b>Üstte</b> foramen magnum kenarına ve C2–C3 gövdelerinin arka yüzüne tutunur. [[K5 s. 131]]</li>
<li><b>Önde</b> ince fibröz lifler durayı arka longitudinal bağa bağlar. [[K5 s. 131]]</li>
<li><b>Yanda</b> ön ve arka kökler boyunca uzanan dural kılıflar birleşir ve spinal sinirin epinöryumuna karışır. [[K5 s. 131]]</li>
<li><b>Altta</b> kılıf filum terminaleyi sararak koksiksin arkasındaki periosta ulaşır. [[K5 s. 131]]</li>
<li><b>Arkada</b> kese serbesttir ve kanal içinde onu epidural yağ destekler. [[K5 s. 131]]</li></ul>
<p>Kese servikal ve lomber genişlemelere uyum sağlayacak biçimde genişler. [[K5 s. 131]] Alt ucu genellikle S2’ye gelir ancak L5 ile S3 arasında değişebilir. [[K5 s. 131]] Sakruma aşağı doğru uzanan kese, kaudal enjeksiyonda istemeden spinal ponksiyon yapılabilmesini açıklar. [[K5 s. 131]]</p>
<h3>Araknoid ve pianın uzantıları</h3>
<p>İnce araknoid her sinir kökü boyunca uzantılar gönderir. [[K5 s. 131]] Yukarıda beyni gevşekçe saran ve hemisferler arasındaki longitudinal fissüre giren serebral araknoidle birleşir. [[K5 s. 131]] Damarlı bağ dokusundan oluşan pia, beyin ve omurilik yüzeyine sıkıca yapışır. [[K5 s. 131]]</p>
<ul class="ozet">
<li><b>Ön orta hat.</b> Pia ön median fissür boyunca kalınlaşarak linea splendensi oluşturur. [[K5 s. 131]]</li>
<li><b>Yanlar.</b> Dentikülat bağın 21 üçgen dişi, spinal sinirler arasında uzanıp uçlarıyla duraya yapışır. [[K5 s. 132]] T12 ile L1 kökleri arasındaki son diş çatallıdır ve L1 kökü bu dişin üzerinden geçer. [[K5 s. 132]]</li>
<li><b>Arka orta hat.</b> Kesintili pial yaprak, arka median sulkustan duraya uzanan arka subaraknoid septumu oluşturur. [[K5 s. 132]]</li>
<li><b>Alt uç.</b> Pianın devamı olan filum terminale keseyi deler ve dural bir kılıf içinde koksikse ulaşır. [[K5 s. 132]]</li></ul>
<h3>İki zarın arasındaki fark</h3>
<p><b>Subaraknoid aralıkta</b> BOS bulunur, dentikülat bağ ve arka septum aralıktan geçer. [[K5 s. 132]] Omuriliğe giren pial damarların çevresindeki doku boşlukları bu aralıkla bağlantılıdır. [[K5 s. 132]] Tek tek nöronlara uzandığı bildirilen Virchow–Robin aralıkları, spinal anesteziğin dokuya giriş yolu olarak önerilmiştir. [[K5 s. 132]] Kitaba göre bu ince uzantıların varlığı tartışmalıdır ve fiksasyondaki büzüşmeye bağlı olmaları muhtemeldir. [[K5 s. 132]]</p>
<p><b>Subdural aralık</b> potansiyeldir, temas hâlindeki dura ve araknoidi yalnızca ince seröz sıvı ayırır. [[K5 s. 132]] Epidural girişimde kateter yanlışlıkla buraya yerleşebilir. [[K5 s. 132]] Subdural enjeksiyonun geniş alana yayılan, sıklıkla tek taraflı, yamalı blokla ilişkili olduğu düşünülür. [[K5 s. 132]]</p>
<details class="an03c-okuma"><summary>Kök kılıfını içeriden dışarıya nasıl izlersiniz?</summary><p>Araknoidin kök boyunca gönderdiği uzantıyı dural kılıfın içinde düşünün. [[K5 s. 131]] Ön ve arka köklere eşlik eden dural uzantılar spinal sinir oluşurken tek kılıfta birleşir. [[K5 s. 131]] Siniri foramenden dışarı izleyince epidural yağlı bağ dokusunun da ona manşet gibi eşlik ettiğini görürsünüz. [[K5 s. 133]] Böylece aynı kökün zarlarla ilişkisini kanaldan paravertebral aralığa kadar izleyebilirsiniz. [[K5 s. 131]] [[K5 s. 133]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-epidural"><h2>Epidural aralığın sınırları ve klinik karşılığı</h2>
<p class="intro">Kanalın dura dışında kalan bölümü foramen magnumdan sakrokoksigeal membrana uzanır, alt uçta aralığı döşeyen zarlar birleşir. [[K5 s. 132]]</p>
${sekil('epidural','Sarı bağdan epidural aralığa')}
<p class="an03c-rehber">Önce epidural kateterin, sonra kombine teknikteki spinal ilacın hangi zarın iç veya dış tarafında kaldığını gösterin. [[K5 s. 132–135]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Yön</th><th>Sınır veya içerik</th></tr></thead><tbody>
<tr><td>Arka</td><td>Laminalar ve sarı bağ arka sınırı oluşturur. [[K5 s. 132]] Kadavrada 2–5 mm kalınlığındaki bağın spinöz çıkıntılarla ayrılan iki parçası birer laminadan başlar. [[K5 s. 132]]</td></tr>
<tr><td>Yan</td><td>Pediküller ve intervertebral aralıklar [[K5 s. 132]]</td></tr>
<tr><td>Ön</td><td>Vertebra gövdeleri, diskler ve arka longitudinal bağ [[K5 s. 132]]</td></tr>
<tr><td>İçerik</td><td>Ekstradural ya da peridural adı da verilen aralıkta yağ, sinir kökleri, kan ve lenf damarları bulunur. [[K5 s. 132]]</td></tr></tbody></table></div>
<h3>Görüntüleme ile aralığın biçimi</h3>
<p>T8 düzeyindeki anatomik görünümde epidural yağ, omurilik, sempatik gangliyon ve geriye katlanmış pariyetal plevra seçilir. [[K5 s. 133]] Kontrastlı radyografi ve MRG segmentli bir yapı gösterir, kama biçimi orta hatta belirgindir. [[K5 s. 132]] Kontrast sonrası yan grafide aralık testere dişine benzer ve her segmentte kaudal bölümün sefalik bölümden 3–4 kat büyük olduğunu düşündürür. [[K5 s. 133]] MRG’de ise genişlik alt uçta yaklaşık 4 mm, üst uçta 6 mm’dir ve kadavra ölçümleriyle uyumludur. [[K5 s. 133]] Enjekte edilen sıvı aralığı genişleterek görünümü değiştirebilir. [[K5 s. 133]]</p>
<p>Arka durada tanımlanan <i>plica mediana dorsalis</i> MRG’de görülmez ve enjeksiyonla yükselen intratekal basınca bağlı bir artefakt olabilir. [[K5 s. 133]] Buna karşılık dura ile sarı bağ arasındaki düzensiz fibröz bantlar kateteri yönünden saptırabilir. [[K5 s. 133]]</p>
<h3>Hacim ve basınç neden değişir?</h3>
<p>Epidural kapasite aynı düzeydeki subaraknoid kapasiteden büyüktür. [[K5 s. 133]] Kitabın lomber segment karşılaştırmasında benzer blok yayılımı için epidural hacim 1,5–2,0 mL, subaraknoid hacim 0,3 mL’dir. [[K5 s. 133]] Spinal sinir foramenden çıkarken gevşek epidural yağlı dokuyu manşet biçiminde paravertebral aralığa taşır. [[K5 s. 133]] Enjeksiyon ve diseksiyonda ardışık düzeyler ve karşı taraf arasında bağlantı epidural aralıktan geçer. [[K5 s. 133]]</p>
<p>Toraksta paravertebral aralığı plevra boşluğundan yalnız pariyetal plevra ayırır. [[K5 s. 134]] Plevral basınç bu yolla epidural aralığa iletilebilir ve muhtemel negatif basıncı açıklayabilir. [[K5 s. 134]] Derin soluk basıncı daha negatif, öksürük pozitif yapar. [[K5 s. 134]] Torakstan uzaklaştıkça epidural yağ değişimleri tamponlar ve servikal ile sakral uçta negatif basınç kaydedilmez. [[K5 s. 134]] Künt iğnenin durayı çadırlaştırması da negatif ölçüme katkıda bulunabilir. [[K5 s. 134]]</p>
<h3>Giriş yolu ve damarlar</h3>
<p>Giriş laminalar arasından veya sakral hiatustan olabilir. [[K5 s. 134]] Kanal kabaca üçgen olduğundan aralık arka orta hatta en derindir. [[K5 s. 134]] Kitap lomber laminadan omuriliğin arka yüzüne uzaklığı yaklaşık 5 mm olarak verir. [[K5 s. 134]] Deri ile lomber epidural aralık arasındaki uzaklık 2–7 cm, çoğu hastada 3–5 cm’dir. [[K5 s. 134]]</p>
<ul class="ozet">
<li><b>Ven ağı.</b> T11 kesitinde ağın bazivertebral ven ve arka dış vertebral pleksuslarla ilişkisi görülür. [[K5 s. 134]] Dört ana gövdenin ikisi arka longitudinal bağın yanlarında, ikisi arkada vertebral arkların önünde dikey seyreder. [[K5 s. 134]] Her vertebradaki venöz halkalar bu gövdeleri birbirine, dış vertebral pleksuslar da iç ağı dış ağa bağlar. [[K5 s. 134]]</li>
<li><b>Gelen dallar.</b> Gövdelerin arkasından bazivertebral venler çıkar. [[K5 s. 135]] Vertebral, asendan servikal, derin servikal, interkostal, lomber, iliolomber ve lateral sakral venlerin dalları intervertebral ve sakral foramenlerden ağa katılır. [[K5 s. 135]]</li>
<li><b>Kapaksız bağlantı.</b> Kitap bu ağı “Bateson’un kapaksız vertebral venöz pleksusu” adıyla anar. [[K5 s. 135]] Pelvik ve serebral venleri birleştiren bu ağ bakteri ve malign hücrelerin yayılabileceği bir yoldur. [[K5 s. 135]] Öksürme ve ıkınmada toraks ve abdomen kanının ince duvarlı epidural venlere yönelmesi BOS basıncını artırır. [[K5 s. 135]] Genişleyen venler ponksiyonda kan gelme olasılığını yükseltir. [[K5 s. 135]]</li>
<li><b>Arterler.</b> Aynı adlı arterlerden gelen dalların epidural aralıktaki önemi görece azdır. [[K5 s. 135]] Bu dallar her intervertebral foramenden girer, ağırlıkla lateralde seyreder ve komşu vertebraları, bağları, omuriliği besler. [[K5 s. 135]]</li></ul>
<p>Sürekli epidural analjezi veya anestezi majör abdominotorasik cerrahide yaygındır. [[K5 s. 135]] Teknik omurganın herhangi bir bölümünde uygulanabilir ve kitap L4/L5 düzeyindeki kateteri örnekler. [[K5 s. 135]] Uzaması beklenen obstetrik girişimlerde kombine teknikte ince spinal iğne Tuohy içinden geçirilebilir. [[K5 s. 135]]</p>
<details class="an03c-okuma"><summary>Bir epidural enjeksiyonda sıvı nereye yayılabilir?</summary><p>Bir taraftaki paravertebral aralığa ulaşan sıvı için, komşu düzeylere doğrudan giden bir koridor çizmeyin. [[K5 s. 133]] Önce epidural aralığa dönün, ardından komşu düzeye veya karşı tarafa çıkan spinal sinirin manşetini izleyin. [[K5 s. 133]] Aynı bağlantı torakstaki plevra basıncının epidural aralığa nasıl yansıdığını da açıklar. [[K5 s. 134]] Kateterden sonra geniş, yamalı ve tek taraflı bir blok görülmesi, lokal anesteziğin yanlışlıkla subdural aralığa verilmiş olabileceğini düşündürür. [[K5 s. 132]]</p><p>Kateterin yön değiştirmesini açıklarken ise düzensiz fibröz bantlarla MRG’de doğrulanamayan arka orta hat kıvrımını birbirinden ayırın. [[K5 s. 133]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-bos"><h2>BOS nerede üretilir?</h2>
<p class="intro">Ventrikülleri ve subaraknoid aralığı dolduran berrak beyin omurilik sıvısının erişkindeki yaklaşık 150 mL’lik hacminin 25 mL kadarı spinal teka içindedir. [[K5 s. 136]]</p>
${sekil('ventrikuller','Ventriküllerin boşluk kalıbı')}
<p class="an03c-rehber">Kalıpta mavi alanlar sıvının bulunduğu boşlukları temsil eder. Lateral ventrikülden üçüncü ventriküle açılan interventriküler foramenle, üçüncü ve dördüncü ventrikülü bağlayan akueduktu birbirinden ayırın. [[K5 s. 136]] Burada sıvı yolunu izleyin, sıvıyı salgılayan koroid pleksuslar kalıpta gösterilmez.</p>
<p>BOS’u lateral, üçüncü ve dördüncü ventriküllerdeki koroid pleksuslar üretir. [[K5 s. 136]] Bunlar pianın içe uzanan damarlı kıvrımlarıdır ve yüzeyleri tek kat ependim epiteliyle örtülüdür. [[K5 s. 136]] Ameliyatta pleksustan sıvı sızdığı görülür. [[K5 s. 136]] Bir Monro forameni kapanınca o yanda hidrosefali gelişmesi ve pleksus önceden çıkarıldığında bunun görülmemesi üretim yerini destekler. [[K5 s. 136]]</p>
<p>BOS’un bileşimi basit bir plazma diyalizatından farklıdır ve birçok çözünür ilaç kan-beyin bariyerini aşamaz. [[K5 s. 136]] Bu gözlemler ependim hücrelerinde aktif salgılama ve seçici difüzyonu düşündürür. [[K5 s. 136]]</p>
</section>
<section class="wrap blk ders-sec" id="an03c-akis"><h2>BOS dolaşımı ve basıncı</h2>
${sekil('akis','Dördüncü ventrikülden geri emilime')}
<p class="an03c-rehber">İki çıkış kolunu ayrı ayrı izleyin. Kollar dördüncü ventrikülün farklı açıklıklarından geçse de her ikisi BOS’u beyin subaraknoid aralığına ulaştırır. [[K5 s. 136]] Çıkış açıklıklarından geçen akımı, venöz sinüslere komşu villuslarda gerçekleşen geri emilimden ayırın. [[K5 s. 136]]</p>
<ul class="ozet">
<li><b>Çıkış.</b> Ortadaki Magendie forameni serebellomedüller sisternaya, yanlardaki Luschka foramenleri pontin sisternaya açılır. [[K5 s. 136]]</li>
<li><b>Kraniyal emilim.</b> Yaklaşık beşte dört, venöz sinüs durasını delip endotelin hemen altında sonlanan araknoid villuslardan emilir. [[K5 s. 136]] Üst sagittal sinüs boyunca kümelenen villuslar erişkinde Pacchioni cisimciklerini oluşturur ve kalvaryanın iç yüzünde orta hattın iki yanında çukurcuk bırakır. [[K5 s. 136]]</li>
<li><b>Diğer yollar.</b> Kalan beşte bir spinal araknoid villuslardan veya sinir kılıfları boyunca lenf damarlarına geçer. [[K5 s. 136]] Pasif emilim için BOS’un hidrostatik basıncı venöz basıncı aşmalıdır. [[K5 s. 136]]</li></ul>
<p>Dolaşım yavaş ve süreklidir, intratekal maddeyi başa doğru taşır. [[K5 s. 136]] Lomber intratekal opioid torakal ve servikal analjezi sağlayabilir. [[K5 s. 137]] İlaç medulla oblongataya ulaşırsa enjeksiyondan 16 saat sonrasına kadar geç solunum depresyonu görülebilir. [[K5 s. 137]]</p>
<h3>Basıncı yorumlarken konumu belirtin</h3>
<p>Kapaksız bir hidrostatik sistem gibi davranan tekada yan yatan hastanın normal BOS basıncı yaklaşık 70–180 mm BOS’tur. [[K5 s. 137]] Oturunca lomber basınç 350–550 mm BOS’a yükselirken ventrikül basıncı atmosfer basıncının altına iner. [[K5 s. 137]]</p>
<p>Öksürme, ıkınma veya juguler ven kompresyonu (Queckenstedt testi) serebral ve vertebral venlerde dolgunluk oluşturur ve tampon görevi gören BOS’un basıncını hızla yükseltir. [[K5 s. 137]] Öksürme ve ıkınmada kanın epidural venöz sinüslere yönelmesi de bu artışa katılır. [[K5 s. 135]] [[K5 s. 137]]</p>
<details class="an03c-okuma"><summary>Aynı hastada basınç iki farklı yolla nasıl yükselebilir?</summary><p>Hasta yan yatıştan oturmaya geçtiğinde birbirine bağlı sıvı boşlukları arasındaki yükseklik farkı değişir. [[K5 s. 137]] Aynı anda lomber tekada basınç yükselirken ventrikül basıncının düşmesi bu hidrostatik ilişkiyle açıklanır. [[K5 s. 137]]</p><p>Hasta öksürdüğünde ise açıklama venöz sistemdedir. [[K5 s. 135–137]] Torakal ve abdominal venlerden spinal epidural venlere kan yönelir, venöz dolgunluk BOS’a yansır. [[K5 s. 135]] [[K5 s. 137]] Bu nedenle basınç değerini aktarırken ölçüm yerini ve hastanın pozisyonunu birlikte belirtin. [[K5 s. 137]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-konus"><h2>Konus, filum ve kauda ekuina</h2>
<p class="intro">Omurilik konus medullarise doğru incelirken lomber ve sakral kökler kendi foramenlerine ulaşmak üzere aşağıya uzanır. [[K5 s. 137]]</p>
${sekil('konus','Konusun ucundan filumu ve kökleri izleyin')}
<p class="an03c-rehber">Önce omuriliğin giderek daralan gövdesini aşağıya doğru izleyin. Merkezde konusun ucuyla devamlılık gösteren parlak ipliği seçin, ardından iki yanda kendi çıkış düzeylerine inen köklere geçin. [[K5 s. 137]] Dura kaldırılmıştır, vertebralar ve koksiksteki tutunma bu görünümün dışındadır.</p>
<p>Erişkin omuriliği yaklaşık 45 cm’dir, bu uzunluk femurun ve vas deferensin uzunluğuna ve dudaklardan özofagogastrik bileşkeye uzaklığa karşılık gelir. [[K5 s. 137]] Genel biçimi silindiriktir ve özellikle lomber bölümde önden arkaya hafif yassılaşır. [[K5 s. 137]] Servikal ve lomber genişlemeler sırasıyla brakiyal ve lumbosakral pleksusların kökenlerine karşılık gelir. [[K5 s. 137]]</p>
</section>
<section class="wrap blk ders-sec" id="an03c-duzey"><h2>Konus hangi vertebra düzeyinde biter?</h2>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Yaş</th><th>Omuriliğin alt ucu</th></tr></thead><tbody>
<tr><td>Fetüs</td><td>Üçüncü aya dek kanalın bütün uzunluğunu kaplar. [[K5 s. 137–138]]</td></tr>
<tr><td>Yenidoğan</td><td>Vertebralar omurilikten daha hızlı büyür ve doğumda konus L3 gövdesinin alt kenarına gelir. [[K5 s. 137–138]]</td></tr>
<tr><td>Erişkin</td><td>Ortalama L1–L2 diskinde, sıklıkla L1 veya L2 gövdesi hizasında, nadiren T12 ya da L3 hizasında biter. [[K5 s. 137–138]]</td></tr></tbody></table></div>
${sekil('duzey','Yenidoğanda ve erişkinde konusun kemik işareti')}
<p class="an03c-rehber">Her iki konusun ucundan öne doğru aynı hizada ilerleyip karşısına gelen kemik işaretini bulun. [[K5 s. 137–138]]</p>
<p>Servikal kökler kanal içinde hemen hemen yana gider, üst torakal kökler hafif eğimlidir. [[K5 s. 137]] Alt köklerin boyca uzaması kauda ekuinayı oluşturur. [[K5 s. 137]] Konustan koksikse uzanan parlak filumun üst bölümünde santral kanalın kısa bir devamı bulunur. [[K5 s. 137]]</p>
<h3>Segment ile gövdeyi eşleştirin</h3>
<p>Segment ile vertebra gövdesi arasındaki yaklaşık fark servikal bölgede bir, üst toraksta iki, alt toraksta üç, lomber ve sakral bölgede dört veya beş segmenttir. [[K5 s. 139]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Omurilik segmenti</th><th>Yaklaşık vertebra gövdesi</th></tr></thead><tbody>
<tr><td>C8</td><td>C7 [[K5 s. 139]]</td></tr><tr><td>T6</td><td>T4 [[K5 s. 139]]</td></tr><tr><td>T12</td><td>T9 [[K5 s. 139]]</td></tr><tr><td>L5</td><td>T12 [[K5 s. 139]]</td></tr><tr><td>Sakral segmentler</td><td>L1 [[K5 s. 139]]</td></tr></tbody></table></div>
<p>İntratekal sıvının dağılımını kısmen kanalın eğriliği belirler ve hiperbarik çözelti yerçekimiyle en alçaktaki noktalara yönelir. [[K5 s. 139]] Sırtüstü gebe olmayan erişkinde lomber ve torakal eğrilerin en alçak noktaları L4 ve T8, gebede L4–5 ve T6 düzeyleridir. [[K5 s. 139]] Kitap T6’yı aynı zamanda sezaryende rejyonel anestezi için ideal dermatom düzeyi olarak verir. [[K5 s. 139]]</p>
<details class="an03c-okuma"><summary>L1 düzeyi dendiğinde hangi yapıyı tarif ediyoruz?</summary><p>L1 vertebra gövdesini gösteren bir kesitte sakral omurilik segmentleri bulunabilir. [[K5 s. 139]] Aynı düzeyi, L1 omurilik segmenti ya da L1 kökünün çıkış forameni olarak okumayın. [[K5 s. 137–139]] Kemik ve sinir dokusunun büyüme hızları ayrıldıkça alt köklerin çıkışlarına kadar katetmesi gereken mesafe uzar. [[K5 s. 137]] Konusu geçtikten sonra görülen uzun kök demeti ile ortadaki ince filum bu nedenle ayrı ayrı gösterilir. [[K5 s. 137–138]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-kesit"><h2>Omurilik kesitinde yön bulma</h2>
<p class="intro">Ön yüzde median fissürü, arka yüzde sığ median sulkusu bulun ve ortadaki H biçimli gri cevheri çevresindeki beyaz cevherden ayırın. [[K5 s. 139–140]]</p>
${sekil('kesit','Enine kesitte gri ve beyaz cevher')}
<p class="an03c-rehber">Ön median fissür ile arka median sulkusu karşılaştırarak kesitin yönünü doğrulayın. [[K5 s. 139–140]]</p>
<p>Arka median sulkustan giren glial septum omurilik kalınlığının yaklaşık yarısına iner. [[K5 s. 139–140]] İki yandaki posterolateral sulkuslar arka köklerin çıkış çizgisini gösterir. [[K5 s. 140]] Ön köklerin küçük demetler hâlinde çıktığı yerde belirgin bir oluk bulunmaz. [[K5 s. 140]]</p>
<ul class="ozet">
<li><b>Santral kanal.</b> Dördüncü ventrikülden başlayan, silyalı ependimle döşeli dar BOS kanalı omurilik boyunca uzanır, konusta biraz genişleyip filumda kısa süre devam eder. [[K5 s. 140]]</li>
<li><b>Gri komissür.</b> H’nin iki yarısını birleştiren enine koldur. [[K5 s. 140]] Kısa, geniş ön boynuz büyük motor hücreler taşır, ince ve sivri arka boynuzun tepesini substantia gelatinosa örter. [[K5 s. 140]] Kesitte boynuz denen bu yapılar uzunlamasına birer kolondur. [[K5 s. 140]]</li>
<li><b>Lateral gri kolon.</b> Torakal ve en üst lomber segmentlerde ön ve arka boynuzların birleşiminden yana taşar, sempatik çıkışın hücrelerini içerir. [[K5 s. 140]]</li>
<li><b>Beyaz kolonlar.</b> Büyük ölçüde uzunlamasına miyelinli liflerden oluşan beyaz cevher gri cevhere göre ön, yan ve arka kolonlara ayrılır. [[K5 s. 140]] Gri komissürün hemen önündeki dar beyaz komissür iki ön kolonu birleştirir. [[K5 s. 140]]</li></ul>
<p>Servikale doğru daha çok aferent lif birikir, aşağıya inildikçe eferent lifler ayrılır ve beyaz cevher miktarı azalır. [[K5 s. 140]] Ekstremite motor sinirlerinin çıktığı servikal ve lomber genişlemelerde gri cevher artar. [[K5 s. 140]] Kitap torakal kesiti C5 ve L3 örnekleriyle karşılaştırır, torakal kesitte pia, dentikülat bağ, ön ve arka kök ile spinal gangliyonu gösterir. [[K5 s. 139]]</p>
<details class="an03c-okuma"><summary>Arka orta hatta iki ayrı septumu nasıl ayırırsınız?</summary><p>Başlangıç noktası ikisinde de arka median sulkustur. [[K5 s. 132]] [[K5 s. 139–140]] Buradan arkaya, BOS içinden duraya doğru gidiyorsanız izlediğiniz yapı kesintili pial septumdur. [[K5 s. 132]]</p><p>Ters yönde, omuriliğin içine doğru ilerliyorsanız izlediğiniz yapı glial septumdur. [[K5 s. 139–140]] Kesitte arka kökü bulmak için orta hattan yana kayın ve posterolateral oluğu izleyin. [[K5 s. 140]] Ön yüzde kök demetlerinin çıkışında buna karşılık gelen belirgin bir oluk aramayın. [[K5 s. 140]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-yollar"><h2>İleti yolları nerede çaprazlaşır?</h2>
<p class="intro">Motor korteksten inen lateral piramidal yol medullada, ağrı ve sıcaklık lifleri ise sinapstan sonra omurilikte karşı tarafa geçer. [[K5 s. 140–141]]</p>
${sekil('yollar','İleti yollarının kesitteki yerleri')}
<p class="an03c-rehber">Arka kökten gelen ince dokunma ve ağrı bilgilerini karşılaştırın. Hangi yol omurilikte, hangisi medullada taraf değiştirir? [[K5 s. 141]]</p>
<h3>İnen motor yollar</h3>
<p><b>Lateral serebrospinal traktus</b> başlıca motor yoldur ve lateral beyaz kolonun arka kısmında seyreder. [[K5 s. 140]] Motor korteksin piramidal hücrelerinden çıkan lifler internal kapsül, orta beyindeki serebral pedinkül ve pons üzerinden medulla piramidine ulaşır. [[K5 s. 140]] [[K5 s. 142]] Piramidal çaprazdan sonra lifler karşı tarafta iner ve her segmentte ön boynuz motor hücrelerine dallar verir. [[K5 s. 140]] Böylece üst motor nöron alt motor nörona bağlanır ve traktus aşağıya doğru küçülür. [[K5 s. 140]]</p>
<p><b>Ön serebrospinal traktus</b> ön median fissüre komşu küçük bir demettir ve doğrudan piramidal yol olarak da adlandırılır. [[K5 s. 141]] Motor korteksten gelen lifler medullada çapraz yapmadan iner, segmentte ayrılan dallar karşı ön boynuzun motor hücrelerine ulaşır. [[K5 s. 141]] Torakal kesitte inen ekstrapiramidal yollar da gösterilir. [[K5 s. 141]]</p>
<h3>Çıkan duyu yolları</h3>
<ul class="ozet">
<li><b>Arka kolon.</b> Medialde Goll’un fasikulus grasilisi, lateralde Burdach’ın fasikulus kuneatusu ince dokunma ve propriyosepsiyon liflerini çoğunlukla aynı tarafta taşır. [[K5 s. 141]] Lifler medulladaki grasil ve kuneat çekirdeklerde sinaps yapar, duysal çaprazdan sonra medial lemniskusla talamusa ve oradan duyu korteksine ulaşır. [[K5 s. 141–143]] Bazı lifler medulladan alt serebellar pedinkülle serebelluma gider. [[K5 s. 141]]</li>
<li><b>Spinotalamik yollar.</b> Ağrı, sıcaklık ve bazı dokunma aferentleri arka kökten girer, bir veya iki segment yükselip substantia gelatinosa’da sinaps yapar. [[K5 s. 141]] Sonraki lifler omurilikte çaprazlaşır ve karşı tarafta yükselerek spinal lemniskus üzerinden talamusa, oradan duyu korteksine ulaşır. [[K5 s. 141]] [[K5 s. 143]] Lateral spinotalamik traktus piramidal yolun önünde ağrı ve sıcaklığı, ön spinotalamik traktus ön boynuz ucunun hemen önünde dokunmayı taşır. [[K5 s. 141]]</li>
<li><b>Spinoserebellar yollar.</b> Ön ve arka traktuslar lateral beyaz cevherin dış kenarında proprioseptif lifleri taşır. [[K5 s. 141]] Kitabın tarifinde bu lifler çapraz yapmadan yükselir ve ön yol üst, arka yol alt serebellar pedinkülle serebelluma girer. [[K5 s. 141]]</li></ul>
<details class="an03c-okuma"><summary>Sağ elden gelen iki duyu omurilikte hangi taraftadır?</summary><p>İnce dokunma ve pozisyon bilgisini sağ arka kolondan başlayarak izleyin. [[K5 s. 141]] Liflerin çoğu medulladaki çekirdeğe kadar sağda kalır ve ancak buradaki sinapstan sonra karşıya geçer. [[K5 s. 141]]</p><p>Sağdan gelen ağrı bilgisinde ise ilk lif arka kökten girer ve kısa bir yükselişten sonra arka boynuzda sonlanır. [[K5 s. 141]] Buradan çıkan lif sol lateral spinotalamik traktusa katılır. [[K5 s. 141]] Her iki uyarı talamus üzerinden duyu korteksine gider, ancak omurilikte yükselirken aynı tarafta değildir. [[K5 s. 141–143]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-damar"><h2>Omuriliğin kanlanması ve venöz dönüşü</h2>
<p class="intro">Foramen magnumdan inen ön ve arka spinal arterlere, sinir kökleri boyunca gelen segmental damarlar katılır. [[K5 s. 142–145]]</p>
${sekil('damar','Spinal arterlerin kökeni ve dağılımı')}
<p class="an03c-rehber">Önden görünümde hastanın solu resmin sağına düşer. Büyük radiküler arteri kökten orta hatta kadar izleyin. [[K5 s. 144–145]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Damar</th><th>Köken, seyir ve beslenme alanı</th></tr></thead><tbody>
<tr><td>Ön spinal arter</td><td>Foramen magnumda iki vertebral arterden birer dal birleşir ve ön median fissür üzerinde daha büyük tek bir orta hat damarı oluşur. [[K5 s. 142]] Arka gri kolonların önünde kalan dokuyu besler. [[K5 s. 142]] Çapı boyunca değişir ve kısa bir kesimde tamamen kaybolabilir. [[K5 s. 142–143]]</td></tr>
<tr><td>Arka spinal arterler</td><td>Her yanda arka alt serebellar arterden bir veya iki damar çıkar, arka gri ve beyaz kolonları besler. [[K5 s. 143]]</td></tr>
<tr><td>Segmental destek</td><td>Vertebral, derin servikal, interkostal, lomber, iliolomber ve lateral sakral arterlerin spinal dalları foramenden girer ve eşlik ettikleri ön ve arka kökleri besler. [[K5 s. 143–144]] Alt dallar kauda ekuinaya dağılır. [[K5 s. 144]]</td></tr>
<tr><td>Radiküler arterler</td><td>Ön radiküler dalların çoğu küçüktür, genellikle alt servikal, alt torasik ve üst lomber bölgelerdeki daha iri 4–9 dal ön spinal artere katılır. [[K5 s. 144]] Arka radiküler dalların sayısı ve boyutu değişir, büyük radiküler arterle birlikte arka spinal arteri desteklerler. [[K5 s. 144–145]]</td></tr>
</tbody></table></div>
<p><b>Adamkiewicz arteri</b> iri bir ön radiküler arterin adıdır ve çoğu kez tek, soldan gelen bir damardır. [[K5 s. 144]] Çıkış düzeyi değişmekle birlikte genellikle alt torasik veya üst lomber bölgededir. [[K5 s. 144]] Omuriliğe ulaştığında ön ve arka spinal arterlerle birleşen bir dal verir, alt üçte ikinin kanlanmasının büyük bölümünü sağlayabilir. [[K5 s. 144–145]]</p>
<p>Ön ve arka spinal arterler omurilik içinde anastomoz yapmaz, trombozları infarktüse yol açar. [[K5 s. 144]] Nispeten hafif travmayı kendiliğinden tıkanma izleyebilir. [[K5 s. 144]] Torasik aort klempi veya aort diseksiyonu, epidural anestezide vazokonstriktör kullanımı ve kasıtlı ya da istemsiz hipotansiyon kanlanmayı tehlikeye sokabilir. [[K5 s. 144]]</p>
<p><b>Venöz dönüş.</b> Ön ve arka spinal venlerin pleksusu kökleri izleyerek intervertebral foramenlerden segmental venlere boşalır ve foramen magnumda medüller venlerle bağlantı kurar. [[K5 s. 144]] Drenaj boyunda vertebral, toraksta azigos, abdomende lomber, pelviste lateral sakral venler üzerinden gerçekleşir. [[K5 s. 144]]</p>
<details class="an03c-okuma"><summary>Bir damarın omuriliğe gelişini ve dokuyu beslemesini ayırın</summary><p>İntervertebral foramende bir radiküler dalı bulun ve eşlik ettiği sinir kökü boyunca omuriliğe doğru izleyin. [[K5 s. 144–145]] Burada segmental bir kaynaktan boyuna uzanan spinal arterlere gelen desteği görürsünüz. [[K5 s. 143–145]] Sonra kesite dönüp ön ve arka spinal arterlerin beslediği gri ve beyaz cevher alanlarını ayırın. [[K5 s. 142–145]] Büyük radiküler arterin her iki sisteme dal verebilmesi, ön ve arka spinal arterler arasında omurilik dokusu içinde bir anastomoz bulunduğu anlamına gelmez. [[K5 s. 144]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-lezyon"><h2>Lezyondan klinik bulguya</h2>
<p class="intro">Omuriliğin bir yarısı kesildiğinde lezyonun altında motor kayıp aynı tarafta, ağrı ve sıcaklık kaybı karşı tarafta gelişir. [[K5 s. 144]] [[K5 s. 146]]</p>
${sekil('lezyon','Sol hemiseksiyonda hangi işlev kaybolur?')}
<p class="an03c-rehber">Lezyonun tarafını solda sabit tutup incelenen işlevi değiştirin. Piramidal yol ile arka kolon farklı işlev taşısa da ikisinin kesilmesi lezyon altındaki sol ekstremitede bulgu verir. [[K5 s. 146]] Ağrı ve sıcaklık duyusuna geçtiğinizde kaybın neden sağa geçtiğini traktusun çapraz yeriyle açıklayın. [[K5 s. 141]] [[K5 s. 146]]</p>
<ul class="ozet">
<li><b>Tam transeksiyon.</b> Lezyonun altındaki segmentlerin alanında bütün duyular kaybolur. [[K5 s. 144]] Spinal şokta başlangıçtaki flask paraliziyi alt ekstremitelerde spastisite izler. [[K5 s. 144]] İstemli sfinkter denetimi kaybolur ancak sakral merkezler sağlamsa refleks mesane ve rektum boşalması dönebilir. [[K5 s. 144]] C4 segmentini tutan yüksek lezyonlar frenik paralizi nedeniyle genellikle ölümcüldür. [[K5 s. 144]]</li>
<li><b>Brown–Séquard sendromu.</b> Travma veya hastalıkla gelişen hemiseksiyonda piramidal yol kesintisi aynı tarafta paralizi yapar. [[K5 s. 144]] [[K5 s. 146]] Arka kolon kesintisi paralize ekstremitede pozisyon, hareket duyusu ve dokunsal ayırt etmeyi ortadan kaldırır. [[K5 s. 146]] Önceden çaprazlaşmış spinotalamik liflerin kesilmesi karşıdaki paralize olmayan ekstremitede ağrı ve sıcaklık kaybını açıklar. [[K5 s. 146]]</li>
<li><b>Siringomiyeli.</b> Üst omuriliğin merkezindeki kistik dejenerasyon başlangıçta orta hattı geçen spinotalamik lifleri iki taraflı hasarlar. [[K5 s. 146]] Her iki üst ekstremitede ağrı ve sıcaklık kaybı, fark edilmeyen yaralanmalara, belirgin skarlaşma ve doku hasarına yol açabilir. [[K5 s. 146]]</li></ul>
<h3>Ağrı cerrahisinde iki anatomik hedef</h3>
<p><b>Kordotomide</b> hedef karşı alt ekstremite, pelvis veya gövdeden şiddetli, tedaviye dirençli tek taraflı ağrıyı taşıyan lateral spinotalamik traktustur. [[K5 s. 146]] En umut verici sonuçlar tek taraflı kanser ağrısında bildirilir. [[K5 s. 146]] Genellikle perkütan girişte BT veya görüntü yoğunlaştırıcı rehberliğinde radyofrekans elektroduyla konum doğrulanır, ardından termal lezyon oluşturulur. [[K5 s. 146]] Hedefin hemen arkasındaki piramidal yol korunmalıdır. [[K5 s. 146]] Nosiseptif girdinin bir kısmı ventral boynuzdan geldiği için ağrı tam kaybolmayabilir veya haftalar içinde dönebilir. [[K5 s. 146]]</p>
<p><b>Dorsal kök giriş bölgesi (DREZ) lezyonunda</b> radyofrekans elektrodu dorsal boynuza yerleştirilir ve kök girişinde termal lezyon oluşturulur. [[K5 s. 146]] Çeşitli kronik ağrı sendromlarında denenmiş bu yöntem özellikle brakiyal pleksus avülsiyonunda etkili bulunmuştur. [[K5 s. 146]]</p>
<details class="an03c-okuma"><summary>Ağrı yolu hasarında neden iki farklı duyu kaybı görülür?</summary><p>Merkezden başlayan üst omurilik lezyonunda sağdan ve soldan gelen lifler henüz orta hattı geçerken birlikte hasarlanabilir. [[K5 s. 146]] İlk bulgunun iki üst ekstremitede ağrı ve sıcaklık kaybı olması bu yerleşimle uyumludur. [[K5 s. 146]]</p><p>Lezyonu merkezden bir omurilik yarısına taşıdığınızda ise o tarafta yükselen spinotalamik lifler karşıdan gelmiştir. [[K5 s. 146]] Aynı kesitte arka kolondaki lifler hâlâ geldikleri tarafta olduğundan iki duyu grubunun kaybı karşılıklı ekstremitelere dağılır. [[K5 s. 146]]</p></details></section>

<section class="wrap blk ders-sec" id="an03c-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="an03c-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an03c-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an03c-3"></div></div></section>
<section class="wrap blk ders-sec" id="an03c-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><b>Açılış sorusu</b><p>Bir erişkinde lomber kombine spinal-epidural girişimi bir kesit üzerinde açıklayın. İki iğnenin uçları nerede kalır? Konus ile dural kesenin sonlanma düzeyleri bu resmi nasıl değiştirir?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Sarı bağın önünde epidural aralığı gösterin; deriden uzaklık 2–7 cm, çoğu hastada 3–5 cm’dir. [[K5 s. 134]] Tuohy ağzı bağdan çıkınca serum fizyolojiğe karşı direnç azalır ve ince kateter bu aralıkta ilerler. [[K5 s. 135]]</li>
<li>İnce spinal iğne Tuohy içinden geçirilerek dura ve araknoidin iç tarafındaki BOS’a ulaşır. [[K5 s. 131–132]] [[K5 s. 135]]</li>
<li>Konusun erişkinde ortalama L1–L2 diskine, dural kesenin ise çoğunlukla S2’ye geldiğini belirtin. [[K5 s. 131]] [[K5 s. 137]]</li>
<li>Konusun altında kendi foramenlerine inen kökler kauda ekuinayı oluşturur, filum ise koksikse uzanır. [[K5 s. 137]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Sagittal düzlemde konusu, kauda ekuinayı, filumu ve dural kesenin ucunu gösterin. Yanına epidural ve subaraknoid hedefleri yerleştirin. [[K5 s. 131–132]] [[K5 s. 137–138]]</div>
<div class="note plain"><b>Ek sorular</b><ul><li>Yenidoğanda konus nerededir?</li><li>Öksürükte ponksiyonda kan gelme olasılığı neden artar?</li><li>Solda hemiseksiyon gelişse hangi duyular sağda kaybolur?</li></ul></div></div></section>
<section class="wrap blk ders-sec" id="an03c-ozet"><h2>Özet</h2><ul class="ozet">
<li>Epidural aralık damar ve yağ içerir, subdural aralık potansiyeldir, subaraknoid aralıkta BOS vardır. [[K5 s. 132]]</li>
<li>BOS dördüncü ventrikülden sisternalara çıkar ve büyük bölümü kraniyal araknoid villuslardan pasif olarak emilir. [[K5 s. 136]]</li>
<li>Konus yenidoğanda L3 alt kenarında, erişkinde ortalama L1–L2 diskindedir. [[K5 s. 137]]</li>
<li>Adamkiewicz arteri çoğunlukla soldan gelir ve alt omuriliğin beslenmesine büyük katkı sağlayabilir. [[K5 s. 144]]</li>
<li>Hemiseksiyonda lezyon altında paralizi ve arka kolon kaybı aynı tarafta, ağrı ve sıcaklık kaybı karşı taraftadır. [[K5 s. 146]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="03c"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/03b">← Sakrum, omur anomalileri ve omurlar arası bağlar</a><a href="#/dersler/anatomi/04a">Sonraki: Spinal sinirler, servikal pleksus ve stellat gangliyon →</a></nav></section>`
  };
})();
