VERI.sorular = VERI.sorular || {};
VERI.sorular['an03b-1'] = {
  no: 1, kok: 'Sakrumun yüzey işaretleri ve sakral kanal için karar verin.', kagit: 'Part I · Anatomi', kaynak: '[[K5 s. 120–124]]',
  onermeler: [
    { t: 'S2 arka forameni arka üst iliak çıkıntının lateralindedir.', d: false, n: 'S2 yaklaşık 1 cm medialde ve aşağıdadır. [[K5 s. 122]]' },
    { t: 'Sakral kanaldaki epidural aralık arka sakral foramenlerle devamlıdır.', d: true, n: 'Arka sakral foramenler sakral kanaldaki epidural aralıkla devamlılık gösterir; bu foramenlerden küçük hacimli enjeksiyon segmental transsakral blok yapar. [[K5 s. 122]]' },
    { t: 'Sakrumun kama biçimini esas olarak lateral kitlelerin aşağıya doğru daralması belirler.', d: true, n: 'Ön foramen sıraları birbirine yakın paralellik gösterirken lateral kitleler hızla daralır. [[K5 s. 120]]' },
    { t: 'Sakral hiatusun alt sınırı S5 gövdesinin ön yüzüdür.', d: false, n: 'Alt sınırı S5 gövdesinin arka yüzü oluşturur. [[K5 s. 123]]' },
    { t: 'Dural kese sakral hiatusa kadar uzanır.', d: false, n: 'Dural kese S2 düzeyinde sonlanır, epidural aralık daha aşağıya uzanır. [[K5 s. 123]]' },
  ],
};
VERI.sorular['an03b-2'] = {
  no: 2, kok: 'Vertebral gelişim ve anomaliler için karar verin.', kagit: 'Part I · Anatomi', kaynak: '[[K5 s. 125–126]]',
  onermeler: [
    { t: 'Bir vertebra gövdesinin oluşumuna komşu iki somit katkıda bulunur.', d: true, n: 'İki komşu somitin yarıları birleşir ve gövde intersegmental gelişir. [[K5 s. 125]]' },
    { t: 'Meningoselde keseye omurilik veya kökler katılır.', d: false, n: 'Meningoselde yalnız meninksler dışarı çıkar, omurilik veya kök içeren kese miyelomeningoseldir. [[K5 s. 125]]' },
    { t: 'S1 lomberizasyonunda ilk sakral segment kısmen ayrı kalabilir.', d: true, n: 'S1 ile sakrumun geri kalanı arasındaki ayrılık kısmi veya tam olabilir. [[K5 s. 125]]' },
    { t: 'Sakral hiatusun tepesi S2 gövdesinin alt üçte birine ulaşabilir.', d: true, n: 'Klasik tepe S4 gövdesinin alt üçte biridir; insanların %45’inde tepe daha yukarıdadır ve S2’nin alt üçte birine kadar ulaşabilir. [[K5 s. 126]]' },
    { t: 'L5 spondilolistezisinde spinöz çıkıntı gövdeyle birlikte öne kayar.', d: false, n: 'L5 gövdesi öne kayarken spinöz çıkıntı ve laminalar sakruma bağlı kalır. [[K5 s. 126]]' },
  ],
};
VERI.sorular['an03b-3'] = {
  no: 3, kok: 'Bağların tutunma yerleri ve işlevleri için karar verin.', kagit: 'Part I · Anatomi', kaynak: '[[K5 s. 128–130]]',
  onermeler: [
    { t: 'Sarı bağ komşu spinöz çıkıntıların uçlarını birleştirir.', d: false, n: 'Sarı bağ laminaları, supraspinöz bağ ise spinöz çıkıntıların uçlarını birleştirir. [[K5 s. 128]]' },
    { t: 'Yaşlılarda supraspinöz bağın kemikleşmesi orta hat ponksiyonunu zorlaştırabilir.', d: true, n: 'C7 ile sakrum arasında uzanan bu fibröz sütun kemikleşebilir. [[K5 s. 128]]' },
    { t: 'Atlasın transvers bağı densi atlasın ön arkına bastırır.', d: true, n: 'Bağ, lateral kitlelerin medial yüzleri arasında gerilerek densi ön arkın arka fasetinde tutar. [[K5 s. 130]]' },
    { t: 'Alar bağlar başın aşırı rotasyonunu sınırlar.', d: true, n: 'Densin tepesinin yanlarını oksipital kondillerin medialine kısa, güçlü bağlar bağlar. [[K5 s. 130]]' },
    { t: 'Beşinci sakral sinir lateral sakrokoksigeal bağın örtüsü altında çıkar.', d: true, n: 'S5 siniri sakral ve koksigeal boynuzların arasından geçer. [[K5 s. 130]]' },
  ],
};

(() => {
  const bolumler = [
    ['sakrum', 'Sakrumun yüzleri'], ['hiatus', 'Hiatus ve kaudal blok'], ['anomali', 'Gelişim ve anomaliler'],
    ['bag', 'Diskler ve bağlar'], ['ust', 'Kafatası ile bağlantılar'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  const sekil = (ad, baslik) => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="an03b_${ad}"></div><p class="viz-cap" aria-live="polite"></p></div>`;
  SAYFALAR['dersler/anatomi/03b'] = {
    grup: 'dersler', eyebrow: 'Anatomi · Bölüm 3 · Ders 03b', baslik: 'Sakrum, omur anomalileri ve omurlar arası bağlar',
    lede: 'Sakrumun arka yüzünde iki ayrı giriş bulunur. [[K5 s. 120–123]] Arka foramenler segmental bloğa, boynuzlar arasındaki hiatus ise kaudal epidural bloğa yol verir. [[K5 s. 122–124]]',
    html: `<nav class="wrap ders-nav" aria-label="Bu derste">${bolumler.map(([id,ad],i) => `<button type="button" data-scroll="an03b-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an03b-sakrum">
<h2>Sakrumun iki yüzünü nasıl ayırt edersiniz?</h2>
<p class="intro">Beş vertebranın kaynaşmasıyla oluşan sakrumun içbükey ön yüzünde gövde sınırları, dışbükey arka yüzünde ise kanalı örten arkların izleri görülür. [[K5 s. 120]]</p>
${sekil('kemik','Ön ve arka yüzde kemik işaretleri')}
<h3>Ön yüzden arka yüze</h3>
<ul class="ozet">
<li><b>Ön yüz.</b> Dört enine çizginin uçlarında ön sakral foramenler yer alır. [[K5 s. 120]] Delikler yaklaşık paralel iki sıra oluşturur, kamanın aşağı doğru daralmasını asıl belirleyen ise dışlarındaki lateral kitlelerin hızla küçülmesidir. [[K5 s. 120]] İlk dört sakral sinirin ön primer dalları buradan çıkar ve lateral kitleler üzerinde oluk bırakır. [[K5 s. 120]]</li>
<li><b>Arka yüz.</b> Kanala tavan yapan kaynaşmış arkların ortasında küçük spinöz tüberküller, iki yanında kaynaşmış laminalar bulunur. [[K5 s. 120]] Dışa doğru önce eklem fasetlerinin tüberküllü kresti, sonra ön deliklerin karşısındaki dört arka foramen, en dışta da lateral kitlenin arka yüzü görülür. [[K5 s. 120–122]] Kaynaşmış transvers çıkıntılar lateral kresti, uçları bu krestin tüberküllerini oluşturur. [[K5 s. 122]]</li>
<li><b>Taban.</b> Üst yüz değişime uğramış bir vertebrayı andırır. [[K5 s. 123]] Oval gövdenin öndeki kenarı promontoryumu yapar, çok kısa pediküller ve uzun laminalar kanala üçgen bir kesit verir. [[K5 s. 123]] Lateral kitlenin üstündeki kanatta (ala), sakral pleksusa katılan L4–5 lumbosakral kordonun oluğu bulunur. [[K5 s. 123]]</li>
<li><b>Eklem yüzleri.</b> Lateral kitlenin üst dışındaki geniş kulaksı yüz iliumla eklemleşir, arkasındaki geniş pürtüklü alana güçlü arka sakroiliak bağ tutunur. [[K5 s. 122–123]] S1 üst faseti arkaya ve mediale bakarak L5 alt fasetini karşılar. [[K5 s. 123]]</li>
</ul>
<div class="note plain"><b>Atlas notu.</b> Kitap L5 ile eklemleşen yüz için “superior auricular facet” der. [[K5 s. 123]] Çeviri notunda düzeltildiği üzere doğrusu S1’in üst eklem fasetidir. [[K5 s. 123]]</div>
<h3>Arka foramenler yüzeyde nereye düşer?</h3>
<p>Sakral çukurcuğun derinindeki arka üst iliak çıkıntıyı bulun ve dikey foramen sırasını izleyin. [[K5 s. 122]] Komşu delikler arasında yaklaşık 2 cm vardır. [[K5 s. 122]]</p>
<dl class="an03b-dizi">
<dt>S1</dt><dd>Çukurcuğun yaklaşık 1 cm üstünde ve medialinde. [[K5 s. 122]]</dd>
<dt>S2</dt><dd>En kolay bulunan foramendir, iliak çıkıntının yaklaşık 1 cm altında ve 1 cm medialindedir. [[K5 s. 122]]</dd>
<dt>S3 ve S4</dt><dd>S2’den dikey olarak sırasıyla 2 ve 4 cm aşağıdadır. [[K5 s. 122]]</dd></dl>
<p>Arka foramenlerden çıkan küçük arka dallar, sakrum ve koksiks üzerindeki dar bir deri alanına duyu verir. [[K5 s. 122]] Bu delikler sakral epidural aralıkla bağlantılıdır ve kesin lokalizasyon için görüntü yoğunlaştırıcı önerilir. [[K5 s. 122]]</p>
<div class="note"><b>Transsakral blok.</b> Küçük hacimde lokal anestezik segmental, tek taraflı blok oluşturur ve kök irritasyonu veya basısına bağlı ağrıyı geçici olarak hafifletebilir. [[K5 s. 122]] Maligniteye bağlı ağrıda bu şekilde geçici rahatlama sağlanmışsa nörolitik blok uygulanabilir. [[K5 s. 122]]</div>
</section>
<section class="wrap blk ders-sec" id="an03b-hiatus">
<h2>Hiatus, koksiks ve kaudal epidural aralık</h2>
<p class="intro">S2’de dural kese sonlanır, ancak epidural aralık sakral hiatusa kadar sürer. [[K5 s. 123]]</p>
${sekil('kaudal','Yüzeyden sakral kanala')}
<h3>Üçgen açıklığın sınırları</h3>
<p>S5 laminalarının birleşmemesi, sakrumun alt arka yüzünde eğik bir açıklık bırakır. [[K5 s. 123]] Bazen birden çok ark eksiktir. [[K5 s. 120]] [[K5 s. 123]]</p>
<dl class="an03b-dizi"><dt>Üst</dt><dd>S4’ün birleşmiş laminaları ve aynı düzeydeki spinöz çıkıntı bulunur, daha büyük defektte sınır daha yukarıdadır. [[K5 s. 123]]</dd>
<dt>Yanlar</dt><dd>S5’in eksik laminalarının kenarları aşağıda iki sakral boynuz taşır, eklem krestleri burada biter. [[K5 s. 120–123]]</dd>
<dt>Alt</dt><dd>Açıklığın tabanında S5 gövdesinin arka yüzü görülür. [[K5 s. 123]]</dd>
<dt>Örtü</dt><dd>Dıştan içe deri, deri altı yağ dokusu ve yaklaşık 1–3 mm kalınlığında arka sakrokoksigeal bağ bulunur. [[K5 s. 123]] Yağ tabakası kalınlaştıkça palpasyon güçleşir. [[K5 s. 123]]</dd></dl>
<p>Hiatus genellikle intergluteal oluğun üst ucunun hemen derininde, koksiks ucundan yaklaşık 5 cm yukarıdadır. [[K5 s. 123]] Zayıf hastada yan yana hissedilen boynuzların arasındaki çöküntüyü doğrudan palpe etmek en iyi yüzey kılavuzudur. [[K5 s. 123–124]]</p>
<h3>Koksiks ile bağlantılar</h3>
<p>Dört rudimenter vertebra kaynaşarak koksiksi oluşturur, ancak ilk segment sıklıkla ayrı kalır. [[K5 s. 123]] Bu segmentin transvers çıkıntıları az gelişmiştir, üst eklem çıkıntıları koksigeal boynuzları oluşturur. [[K5 s. 123]]</p>
<ul class="ozet"><li><b>Disk ve ön bağ.</b> Karşılıklı sakral ve koksigeal yüzler arasında ince bir fibrokıkırdak disk, ön yüzler arasında birkaç zayıf uzunlamasına lif vardır. [[K5 s. 130]]</li>
<li><b>Arka bağ.</b> İki kemiğin boynuzlarını birleştiren bağ yayılarak hiatusu örter ve kanalın alt açıklığını kapatır. [[K5 s. 130]]</li>
<li><b>Lateral bağ.</b> Her yanda sakrumun alt dış köşesini koksiksin transvers çıkıntısına bağlar, boynuzlar arasından çıkan S5 sinirini örter. [[K5 s. 130]]</li></ul>
<h3>Kaudal bloğun anatomik karşılığı</h3>
<p>Yan veya yüzüstü pozisyonda iki arka üst iliak çıkıntıdan aşağıya doğru yaklaşık eşkenar bir üçgen kurulur. [[K5 s. 123]] Üçgenin alt köşesi hiatusun beklenen yerini, iki boynuz arasındaki çöküntü ise doğrudan giriş bölgesini gösterir. [[K5 s. 123–124]]</p>
<p>Kitaptaki tarifte sıklıkla 21 G hipodermik iğne kullanılır. [[K5 s. 124]] İğne başlangıçta deriyle yaklaşık 45° açı yapar, arka sakrokoksigeal bağı geçince göbeği indirilir. [[K5 s. 124]] Bu yön değişikliği iğneyi deri yüzeyine daha paralel hale getirir ve kanal içinde yukarı doğru ilerlemesine olanak tanır. [[K5 s. 124]]</p>
<p>Hiatustan epidural aralığa verilen lokal anestezik önce sakral kökleri etkiler, perinede anestezi veya analjezi sağlar. [[K5 s. 123]] Daha büyük hacim alt lomber köklere ulaşır. [[K5 s. 123]] Çocuklarda bu yoldan kateter bazen lomber, hatta torakal bölgeye ilerletilir, teknik erişkinlerde de tarif edilmiştir. [[K5 s. 123]]</p>
<p>Boyuna kesitte dural kesenin altında ekstradural aralıkta filum terminale görülür. [[K5 s. 124]] İğne deri altında, kanal içinde veya dışında periost altında ya da epidural vende kalabilir, fazla ilerletilirse durayı geçebilir. [[K5 s. 124]]</p>
<p>Kitap, enjeksiyon öncesi damar içi veya subaraknoid yerleşimi araştırmak için aspirasyonu ve enjeksiyonun kolaylığını kontrol etmeyi vurgular. [[K5 s. 124]] Görüntü yoğunlaştırıcı kullanılırken konum sıklıkla radyopak kontrastla doğrulanır. [[K5 s. 124]]</p>
</section>
<section class="wrap blk ders-sec" id="an03b-anomali">
<h2>Gelişim kusuru hangi yapıyı etkiler?</h2>
<p class="intro">Vertebra gövdesinin oluşumu, nöral arkın kapanması ve segmentlerin ayrılması farklı aşamalardır, bu aşamalardaki anomaliler spinal veya epidural bloğu zorlaştırabilir, hatta olanaksız kılabilir. [[K5 s. 125]]</p>
${sekil('defekt','Ark defektinde kesenin içeriği')}
<p>Mezodermal somitler notokord ve nöral tüp çevresinde yoğunlaşır. [[K5 s. 125]] Komşu iki somitin birer yarısı birleştiğinden vertebra gövdesi intersegmentaldir. [[K5 s. 125]] Primer kemikleşme merkezleri arkın iki yanında birer tane ve gövdede bir tanedir, bazen gövdede birleşmeden kalan iki komşu merkez vardır. [[K5 s. 125]]</p>
<ul class="ozet"><li><b>Gövde oluşumu.</b> Ek vertebra ya da konjenital skolyoza yol açan hemivertebra gelişebilir. [[K5 s. 125]] Gövdenin iki merkezinin ayrı kalması özellikle servikal ve lomber bölgede anterior spina bifidaya neden olur. [[K5 s. 125]] Vertebralar eksik olabilir, alt sakrum ve koksiksin yokluğuna sıklıkla rektal ve üriner inkontinans eşlik eder. [[K5 s. 125]]</li>
<li><b>Segmentlerin birleşmesi.</b> İki veya daha çok vertebra kısmen ya da bütünüyle kaynaşabilir, bu özellikle sakral bölgede görülür. [[K5 s. 125]] L5’in sakruma katılması sakralizasyon, S1’in sakrumdan ayrı kalması lomberizasyondur ve her ikisi de tam ya da kısmi olabilir. [[K5 s. 125]]</li>
<li><b>Nöral ark.</b> İki ark merkezinin birleşmemesi spina bifidaya yol açar. [[K5 s. 125]] Gizli biçimde nörolojik anormallik genellikle görülmez, ancak çukurcuk, lipom veya kıl demeti alttaki kusurun ipucu olabilir. [[K5 s. 125]] Daha seyrek olarak bir veya birkaç arkta belirgin defekt vardır, omurilik ya da kılıfları dışarı çıkar. [[K5 s. 125]]</li></ul>
${sekil('gecis','L5 mi sakruma katılıyor, S1 mi ayrılıyor?')}
<p>Spina bifida her düzeyde görülebilir, büyük çoğunluğu L5 veya üst sakral bölgededir. [[K5 s. 125]] Kaynak L5 için %6, üst iki sakral segment için %11 sıklık bildirir. [[K5 s. 125]]</p>
<h3>Ark defektinin üzerinde ne görülür?</h3>
<dl class="an03b-dizi"><dt>Spina bifida occulta</dt><dd>Kemik ark ayrık kalır, meninksler ve sinir dokusu normaldir. [[K5 s. 125]]</dd>
<dt>Meningosel</dt><dd>Arka defektten dışarı uzanan keseyi meninksler oluşturur, sinir dokusu keseye katılmaz. [[K5 s. 125]]</dd>
<dt>Miyelomeningosel</dt><dd>Kesenin içinde omurilik veya kökler bulunur, nöral doku kese duvarına yapışabilir. [[K5 s. 125]]</dd>
<dt>Miyelosel (raşişizis)</dt><dd>Nöral tüpün kapanmadığı yerde kırmızı, granüler bir spinal plak açıktadır. [[K5 s. 125]] Merkezinden beyin omurilik sıvısı sızan bu tabloyu kitap yaşamla bağdaşmaz olarak tanımlar. [[K5 s. 125]]</dd></dl>
<h3>Hiatusun tepesini her hastada aynı düzeyde bekler misiniz?</h3>
<dl class="an03b-dizi"><dt>%35</dt><dd>Klasik yerleşimde tepe S4 gövdesinin alt üçte birindedir. [[K5 s. 126]]</dd><dt>%20</dt><dd>Tepe daha aşağıdadır, S5’in alt kenarına inebilir. [[K5 s. 126]]</dd><dt>%45</dt><dd>Tepe daha yukarıdadır, S2 gövdesinin alt üçte birine ulaşabilir. [[K5 s. 126]]</dd></dl>
<p>Arka duvar nadiren boydan boya açıktır. [[K5 s. 126]] Üst ve alt sınırlar arasında orta hatta, tek yanda ya da iki yanda açıklık kalabilir. [[K5 s. 126]] Hiatus olağan görünse bile üst sakral laminalar ve spinöz çıkıntılar kusurlu olabilir. [[K5 s. 126]]</p>
<p>Kanal kısmen ya da tamamen üç yolla kapanabilir. [[K5 s. 126]] Arka duvarda enine kıvrıma aynı düzeyde gövdenin öne çıkıntısı eşlik edebilir, sakral gövde dorsale doğru kanala taşabilir veya aşırı kemik büyümesi hiatusu örtebilir. [[K5 s. 126]]</p>
<h3>Spondilolistezis</h3>
<p>L5 nöral arkındaki defekt iki kemik grubunu ayırır, bazen L4 etkilenir. [[K5 s. 126]] Olası açıklamaya göre iki kemikleşme merkezi kaynaşmaz, aralarında kalan fibröz doku zamanla gerilerek öne kaymaya izin verebilir. [[K5 s. 126]]</p>
<dl class="an03b-dizi"><dt>Öne kayan</dt><dd>Omurga, L5 gövdesi, pedikülleri ve üst eklem çıkıntılarıyla birlikte sakrum üzerinde öne yer değiştirir. [[K5 s. 126–127]]</dd><dt>Geride kalan</dt><dd>L5 laminaları, spinöz çıkıntısı ve alt eklem çıkıntıları sakruma bağlı kalır. [[K5 s. 126]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="an03b-bag">
<h2>Diskler ve omurlar arası bağlar</h2>
<p class="intro">Komşu omurların faset ve bağları az miktarda fleksiyon, ekstansiyon ve rotasyona izin verir, bu küçük hareketlerin toplamı omurgaya esneklik kazandırır. [[K5 s. 127–128]]</p>
${sekil('baglar','Hangi bağ hangi iki yüzü birleştirir?')}
<h3>Bir diski merkezden çevreye okuyun</h3>
<p>Gövde aralarındaki başlıca bağlantı olan diskler, omurga boyunun yaklaşık %25’ini oluşturur. [[K5 s. 128]]</p>
<dl class="an03b-dizi"><dt>Çekirdek</dt><dd>Nucleus pulposus yumuşak, jel kıvamında ve elastiktir, embriyonik notokorddan kalır. [[K5 s. 128]]</dd>
<dt>Halka</dt><dd>Annulus fibrosusta fibröz doku ve fibrokıkırdak, çekirdeğin çevresinde iç içe halkalar oluşturur. [[K5 s. 128]]</dd>
<dt>Tutunma</dt><dd>Disk üstte ve altta komşu gövdenin hiyalin eklem kıkırdağına, önde ve arkada ilgili longitudinal bağa tutunur. [[K5 s. 128]]</dd></dl>
<p>Torakal disklerin kalınlığı eşittir, eğriliği omur gövdelerinin biçimi belirler. [[K5 s. 128]] Servikal ve lomber eğrilere ise kama biçimli diskler önemli katkıda bulunur, bu özellik özellikle L5/S1’de belirgindir. [[K5 s. 128]] Yaşlılıkta disk atrofisi ile vertebral osteoporoz birlikte boy kısalmasına ve kifotik deformiteye yol açar. [[K5 s. 128]]</p>
<h3>Spinöz uçtan gövdeye doğru</h3>
<dl class="an03b-dizi"><dt>Spinöz çıkıntı</dt><dd>Uçları C7’den sakruma kadar supraspinöz bağ birleştirir. [[K5 s. 128]] İki çıkıntının gövdeleri arasına geçildiğinde interspinöz bağ görülür, bu bağlar özellikle servikal bölgede narindir. [[K5 s. 128]]</dd>
<dt>Lamina</dt><dd>Komşu laminaların arasını sarı bağ kapatır. [[K5 s. 128]]</dd>
<dt>Gövde ve disk</dt><dd>Ön longitudinal bağ C2’den üst sakruma inerken genişler, her diskin önüne ve komşu gövdelerin kenarlarına yapışır. [[K5 s. 128]] Arka longitudinal bağ gövdelerin arkasında seyreder ve karşılık gelen disk yüzü ile gövde kenarlarına tutunur. [[K5 s. 128]]</dd></dl>
<h3>Bağ dokusunun yaşla değişmesi ponksiyonu nasıl etkiler?</h3>
<ul class="ozet"><li><b>Sarı bağ.</b> Laminalar arasındaki dikey elastik lifler aşağıya doğru kalınlaşır. [[K5 s. 128]] İğne bağ içindeyken enjektörde hissedilen elastik geri tepme bu nedenle lomber bölgede torakale göre daha belirgindir. [[K5 s. 128]] Yaşlılıkta elastikiyet azalma eğilimindedir ve bağ kalsifiye olabilir. [[K5 s. 128]]</li>
<li><b>Supraspinöz bağ.</b> Yaşla kemikleşebilen bu güçlü fibröz sütun, orta hattan spinal ponksiyona engel oluşturabilir. [[K5 s. 128]]</li>
<li><b>Ense bağı.</b> Supraspinöz bağın yüzeyel devamı C7’den dış oksipital çıkıntıya uzanır. [[K5 s. 128]] Buradan ayrılan fibröz tabaka oksipital kemiğe ve servikal spinöz çıkıntılara tutunur. [[K5 s. 128]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="an03b-ust">
<h2>Oksiput, atlas ve aksis</h2>
<p class="intro">“Evet” hareketi atlanto-oksipital eklemde, “hayır” hareketi atlanto-aksiyal eklemde gerçekleşir. [[K5 s. 128–129]]</p>
${sekil('dens','Densi yerinde tutan bağlantılar')}
<p>Oksiput, atlas ve aksisin karşılıklı fasetlerine dens ile atlasın ön arkı arasındaki eklem eklenir. [[K5 s. 128]] Atlanto-oksipital eklemde baş bir miktar yana da eğilebilir. [[K5 s. 129]] Hareket eksenine yakın bağlar kısa ve güçlüdür, çevrede arklar ile eklem çıkıntılarını bağlayanlar daha zayıftır. [[K5 s. 129]]</p>
<h3>Densi hangi bağlar tutar?</h3>
<ul class="ozet"><li><b>Transvers ve çapraz bağ.</b> Atlasın iki lateral kitlesinin medial yüzleri arasındaki yatay bant, densi ön arkın arka yüzündeki fasete bastırır. [[K5 s. 130]] Bu banttan yukarıda oksiputa, aşağıda aksis gövdesine daha zayıf lifler ayrılır, üç bölüm birlikte çapraz bağı oluşturur. [[K5 s. 130]]</li>
<li><b>Alar ve aksesuar alar bağlar.</b> Dens tepesinin iki yanından oksipital kondillerin medialine giden kısa, güçlü alar bağlar aşırı baş rotasyonunu sınırlar. [[K5 s. 130]] Aksesuar alar bağın alt ucu aksis gövdesinde, üst ucu atlasın lateral kitlesindedir. [[K5 s. 130]]</li>
<li><b>Apikal bağ.</b> İnce bir lif demeti densin ucunu foramen magnumun ön kenarına bağlar. [[K5 s. 130]] Apikal bağ notokordun yukarı uzanan bölümünün kalıntısıdır. [[K5 s. 130]]</li></ul>
<h3>Omurgadan kafatasına uzanan membranlar</h3>
<dl class="an03b-dizi"><dt>Tektoryal membran</dt><dd>Arka longitudinal bağ aksisten oksiputa güçlü bir membran olarak uzanır ve atlası örter. [[K5 s. 130]]</dd>
<dt>Ön atlanto-oksipital membran</dt><dd>Ön longitudinal bağ orta hatta kordon biçiminde oksiputa çıkar, yanlarda ise yayılarak ince bir membrana dönüşür. [[K5 s. 130]]</dd>
<dt>Arka atlanto-oksipital membran</dt><dd>Sarı bağın karşılığı olan bu membran, atlasın arka arkını oksiputa bağlar. [[K5 s. 130]] Vertebral arter foramen magnuma doğru öne ve yukarı ilerlerken membranı deler. [[K5 s. 130]]</dd></dl>
<p>Arkadan görünümde atlasın arka arkı, C1’in dorsal dalı, vertebral arter ve atlanto-aksiyal membran ayırt edilir. [[K5 s. 129]] Üst servikal laminalar ve oksiputun arka bölümü kaldırıldığında derindeki bağlar incelenebilir. [[K5 s. 129]]</p>
</section>
<section class="wrap blk ders-sec" id="an03b-p1"><h2>Part I · Çoklu doğru/yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçesini açın.</p>
<div class="viz"><div data-viz="mtf" data-q="an03b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an03b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an03b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an03b-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Kaudal blok için sakral hiatusu nasıl bulursunuz? İğnenin hedefini ve yanlış yerleşebileceği kompartımanları bir kesitte gösterin.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Yan veya yüzüstü konumda iki arka üst iliak çıkıntı ile hiatus yaklaşık eşkenar bir üçgen oluşturur. [[K5 s. 123]]</li>
<li>İntergluteal oluğun üst ucunda boynuzlar arasındaki çöküntü palpe edilir. [[K5 s. 123–124]]</li>
<li>Deri ve yağ tabakasının derininde hiatusu örten arka sakrokoksigeal bağ vardır. [[K5 s. 123]]</li>
<li>Kitaptaki tarifte deriye yaklaşık 45° ile girilir, bağ geçilince iğne göbeği indirilerek iğne kanala daha paralel yönlendirilir. [[K5 s. 124]]</li>
<li>Hedef sakral epidural aralıktır, S2’de sonlanan dural kese fazla ilerletilen iğnenin yoluna girebilir. [[K5 s. 123–124]]</li>
<li>Deri altı, kanal içi veya dışı subperiostal, venöz ve durayı geçen yerleşimler olasıdır. [[K5 s. 124]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Arkadan görünümde boynuzları ve aralarındaki hiatusu, boyuna kesitte bağın altındaki kanalı ve S2’de dural kesenin ucunu işaretleyin. [[K5 s. 123–124]]</div>
<div class="note plain"><b>Ek sorular.</b> Hiatusun tepesi ne kadar yukarıda olabilir? Transsakral blokla kaudal blokta hedefe giriş noktaları nasıl farklılaşır? Sarı bağdaki geri tepme hangi bölgede daha belirgindir? [[K5 s. 122–124]] [[K5 s. 126]] [[K5 s. 128]]</div></div></section>
<section class="wrap blk ders-sec" id="an03b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Ön sakral foramenlerden ön dallar, arka sakral foramenlerden arka dallar çıkar. [[K5 s. 120–122]]</li>
<li>Kaudal giriş boynuzların arasındadır, epidural aralık dural kesenin sonundan daha aşağıya uzanır. [[K5 s. 123]]</li>
<li>Spina bifidada kemik kusuruna meninkslerin veya sinir dokusunun katılıp katılmadığı alt tipleri ayırır. [[K5 s. 125]]</li>
<li>Spondilolisteziste öne kayan L5 gövdesine pediküller ve üst eklem çıkıntıları eşlik eder. [[K5 s. 126]]</li>
<li>Spinöz uçları supraspinöz bağ, komşu laminaları sarı bağ birleştirir. [[K5 s. 128]]</li>
<li>Atlasın transvers bağı densi atlasın ön arkına bastırır, alar bağlar kafatasının aşırı dönüşünü sınırlar. [[K5 s. 130]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="03b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/03a">← Servikal, torasik ve lomber vertebralar</a><a href="#/dersler/anatomi/03c">Sonraki: Spinal meninksler, BOS ve omurilik →</a></nav>
</section>`,
  };
})();
