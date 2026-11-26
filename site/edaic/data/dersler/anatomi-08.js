VERI.sorular = VERI.sorular || {};
VERI.sorular['an08-1'] = {
  no: 1, kok: 'Periferden omuriliğe', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 324–328]]',
  onermeler: [
    { t: 'İlk 50 ms içinde duyulan hızlı ağrıyı C lifleri taşır.', d: false, n: 'Bu ilk, keskin ağrıyı Aδ lifleri taşır. [[K5 s. 324–325]]' },
    { t: 'Derideki C liflerinin yaklaşık %95’i polimodal nosiseptördür.', d: true, n: 'Bu oran kutanöz C liflerine özgüdür. [[K5 s. 325]]' },
    { t: 'Visseral afferentler dorsal kök liflerinin çoğunluğunu oluşturur.', d: false, n: 'Dorsal kökteki payları %10’un altındadır. [[K5 s. 326]]' },
    { t: 'Aδ lifleri Lissauer traktusunda giriş düzeyinden bir veya iki segment ilerleyebilir.', d: true, n: 'Bu kısa seyir hem rostral hem kaudal yönde olabilir. [[K5 s. 328]]' },
    { t: 'Periostun zararlı uyarana yanıt eşiği görece yüksektir.', d: false, n: 'Periost düşük eşiklidir, kasın C uçlarının mekanik stres eşiği ise yüksektir. [[K5 s. 326]]' },
  ],
};
VERI.sorular['an08-2'] = {
  no: 2, kok: 'Çıkan nosiseptif yollar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 327–329]]',
  onermeler: [
    { t: 'Spinotalamik aksonlar ventral beyaz komissürden geçebilir.', d: true, n: 'Çapraz genellikle bir veya iki segment içinde gerçekleşir. [[K5 s. 328]]' },
    { t: 'Sakral lifler spinotalamik traktusun en medialinde seyreder.', d: false, n: 'Sakral lifler lateraldedir, yeni lifler mediale eklenir. [[K5 s. 328]]' },
    { t: 'Spinoretiküler lifler spinotalamik liflere göre daha ince ve yavaştır.', d: true, n: 'Spinoretiküler sistem ayrıca polisinaptiktir. [[K5 s. 329]]' },
    { t: 'Spinotalamik traktusun kesilmesi her olguda karşı tarafta hipoaljezi yapar.', d: false, n: 'Karşı tarafta hipoaljezi olguların %80–90’ında görülür. [[K5 s. 328–329]]' },
    { t: 'İnsula hem duyusal ayrımda hem ağrının duygusal boyutunda rol oynuyor görünür.', d: true, n: 'İnsula medial ve lateral sistemlerin işlevlerine katılıyor görünür. [[K5 s. 329]]' },
  ],
};
VERI.sorular['an08-3'] = {
  no: 3, kok: 'İnen denetim, spinal kapı ve plastisite', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 330–333]]',
  onermeler: [
    { t: 'Büyük çaplı dokunma liflerinin etkinliği spinal kapıyı açma eğilimindedir.', d: false, n: 'Yoğun dokunma ve basınç girdisi küçük liflerden gelen nosiseptif iletimi baskılayabilir. [[K5 s. 332]]' },
    { t: 'Doğrudan hipotalamospinal sistemin spinal uçları I ve X. laminalarda yoğunlaşır.', d: true, n: 'Bu sistem medullanın dorsal boynuzuna da ulaşır. [[K5 s. 331]]' },
    { t: 'PAG uyarımı başka duyusal ya da motor etki oluşturmadan analjezi sağlayabilir.', d: true, n: 'PAG’nin elektrikle uyarılması güçlü analjezi oluşturabilir. [[K5 s. 330]]' },
    { t: 'Santral duyarlılaşmanın geç evresinde protein üretimi değişir.', d: true, n: 'Erken evrede spinal sinaptik bağlantılar değişir. [[K5 s. 332]]' },
    { t: 'Mesaneye giden parasempatik sinirler afferent lif içerebilir.', d: true, n: 'Mesanenin hem sempatik hem parasempatik sinirlerinde afferent lifler gösterilmiştir. [[K5 s. 333]]' },
  ],
};

const AN08_NAV = [
  ['deri', 'Periferik uç'], ['vissera', 'Visseral ağrı'], ['boynuz', 'Dorsal boynuz'],
  ['yol', 'Çıkan yollar'], ['matriks', 'Ağrı matriksi'], ['inhibisyon', 'İnen denetim'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/anatomi/08'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 8', baslik: 'Ağrının anatomisi',
  lede: 'Bir yaralanmanın yerini nasıl buluruz ve aynı uyarıyı başka bir anda neden daha şiddetli hissederiz? Periferik sinir ucundan dorsal boynuza, talamusa ve kortekse uzanan bağlantılar, ağrının hem yerini hem de insanda uyandırdığı duyguyu biçimlendirir. [[K5 s. 323]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${AN08_NAV.map(([id, ad], i) => `<button type="button" data-scroll="an08-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="an08-deri">
<h2>Serbest sinir ucundan ilk ağrıya</h2>
<p class="intro">Parmağımızı incittiğimizde önce kısa, keskin bir ağrı, ardından daha uzun süren bir yanma hissedebiliriz. [[K5 s. 324–325]]</p>
<div class="viz"><div class="viz-head"><h3>Deride bir primer afferentin uç dalları</h3></div><div data-viz="an08_deri"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Primer afferent akson dallandıkça perinöral kılıfı kaybolur ve serbest sinir uçları ortaya çıkar. [[K5 s. 324]] Mekanik, termal veya kimyasal enerjinin bu nosiseptörleri uyarmasına <b>nosisepsiyon</b> denir. [[K5 s. 324]] Hücre hasarıyla açığa çıkan mediyatörler primer afferentte elektriksel etkinlik başlatır. [[K5 s. 323]]</p>
<div class="tbl-wrap"><table class="tbl"><caption>Afferent liflerin karşılaştırılması</caption><thead><tr><th>Özellik</th><th>Aδ</th><th>C</th></tr></thead><tbody>
<tr><th>Çap ve hız</th><td>1–4 µm, 5–30 m/s. [[K5 s. 325]]</td><td>1,5 µm’den ince, 0,5–2 m/s. [[K5 s. 325]]</td></tr>
<tr><th>Yanıt</th><td>Yaklaşık dörtte biri nosiseptiftir. [[K5 s. 324–325]] Mekanik veya termal tehlikede ilk 50 ms içindeki hızlı ağrıya ve koruyucu reflekse katılır. [[K5 s. 324–325]]</td><td>Nosiseptif lif oranı değişkendir. [[K5 s. 324–325]] Lifleri miyelinsizdir. [[K5 s. 326]] C lifleri ilk yanıtı güçlendirir, hasarlı veya inflame dokudan uyarı almaya devam eder. [[K5 s. 325–326]]</td></tr>
<tr><th>Duyarlılaşmayla ilişkili maddeler</th><td>Siklik adenozin monofosfat, protein kinaz A, bradikinin, prostaglandinler, sinir büyüme faktörü ve lökotrienler. [[K5 s. 325]]</td><td>Lökotrienler, prostaglandin ve P maddesi. [[K5 s. 325]]</td></tr>
</tbody></table></div>
<h3>Hangi doku, hangi uyaran?</h3>
<ul><li><b>Deri, deri altı ve fasya.</b> Mekanik uyarana seçici uçlar, mekanik ve termal uyarana yanıt veren uçlar ve bunlara ek olarak kimyasal uyarıyı da algılayan polimodal uçlar bulunur. [[K5 s. 325]] Aδ ısı reseptörleri ile Aδ ve C soğuk reseptörleri de vardır. [[K5 s. 325]] Derideki C liflerinin %95’i polimodal nosiseptördür. [[K5 s. 325]] Nosiseptif olmayan Aδ ve C lifleri düşük şiddetli uyaranlara yanıt verir. [[K5 s. 324]]</li>
<li><b>Kas.</b> Aδ ve C uçları bulunur, fakat kas ağrısının çoğunu mekanik stres eşiği yüksek, iskemiye duyarlı C uçları taşır. [[K5 s. 325–326]]</li>
<li><b>Periost ve eklem.</b> İkisinde de Aδ ve C afferentleri vardır, ancak periost görece düşük eşiklidir. [[K5 s. 326]] Eklemde bazı uçlar burulmaya duyarlı özelleşmiş reseptörlere gider, çoğu ise eklem boşluğunda serbest uçlardan bir ağ kurar. [[K5 s. 326]]</li></ul>
<h3>Yara çevresi neden hassaslaşır?</h3>
<p>Vazodilatasyon, şişlik ve inflamatuvar mediyatörlerin etkinleşmesi, doku hasarına verilen birbiriyle bağlantılı yanıtlardır. [[K5 s. 323]] Akut yanıttan sonra prostanoidler, bradikinin ve serotonin C liflerini uyarabilir ve duyarlılaştırabilir. [[K5 s. 325]] Sinir büyüme faktörü ve sitokinler de periferik reseptör duyarlılığını etkileyebilir. [[K5 s. 325]]</p>
<p>Mediyatörler, uyaranı elektriksel sinyale dönüştüren transdüksiyon proteinlerini etkileyip eşiği düşürür. [[K5 s. 325]] Erken dönemde mevcut proteinler, geç dönemde üretilen proteinler değişir ve iyon kanallarının etkinliği farklılaşabilir. [[K5 s. 325]] Nörotrofinler akson boyunca dorsal kök gangliyonuna taşınarak duyu hücresinin kimyasını ve işlevini değiştirir. [[K5 s. 323]] Süregelen periferik girdi omurilikte aşırı uyarılabilirliğe zemin hazırlayabilir. [[K5 s. 325]]</p>
<aside class="an08-okuma"><p><b>İki zaman ölçeğini ayırın.</b> Birincisi, zararlı uyaranın hemen ardından hangi lifin sinyali önce taşıdığıdır. [[K5 s. 324–325]] İkincisi, yaralanma sürdükçe aynı sinir ucunu uyarmak için gereken uyaranın nasıl değiştiğidir. [[K5 s. 325]] Hızlı ağrının zamanlamasını Aδ lifinin iletimi, yara çevresindeki hassasiyeti ise transdüksiyon eşiğinin düşmesi açıklar. [[K5 s. 324–325]]</p></aside>
<details class="an08-okuma"><summary>Nosiseptörlerin oranını hangi payda ile okuyorsunuz?</summary><p>Aδ için yaklaşık %25, tüm Aδ lifleri içinde nosiseptör etkinleşmesine özellikle yanıt verenlerin payıdır. [[K5 s. 324]] Tabloda C lifleri için tek bir yüzde verilmez, çünkü oran değişkendir. [[K5 s. 325]] Deride kullanılan %95 ise farklı bir soruyu yanıtlar: kutanöz C liflerinin ne kadarı polimodal nosiseptördür? [[K5 s. 325]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an08-vissera">
<h2>Visseral ağrının yerini bulmak</h2>
<p class="intro">Apandisitte hasta önce karın ortasını gösterirken pariyetal periton inflame olduğunda sağda McBurney noktasını gösterebilir. [[K5 s. 326]]</p>
<div class="viz"><div class="viz-head"><h3>Apandisitte ağrının kaynağı</h3></div><div data-viz="an08_vissera"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Deride, ağız veya anüs mukozasında yüzeyel hasar keskin, yeri iyi seçilen ağrı oluşturur. [[K5 s. 324]] Derin somatik ağrı genellikle künt ve sızlayıcıdır, ancak hasta ilgili segmenti gösterebilir. [[K5 s. 324]] Visseral ağrı da derin, künt ve sızlayıcıdır, fakat yeri belirsizdir ve başka bir bölgede hissedilebilir. [[K5 s. 326]]</p>
<p>Organa özgü nosiseptörler mesanede gösterilmiştir. [[K5 s. 326]] İçi boş organın genişlemesi, gerilmesi veya yırtılması, çekilme, bası, inflamasyon ve iskemi mediyatörleri açığa çıkararak nosisepsiyonu başlatabilir. [[K5 s. 326]]</p>
<ul><li><b>Toraks.</b> Visseral duyu lifleri sempatik afferentlerle birlikte servikotorakal gangliyonlardan geçer. [[K5 s. 326]]</li>
<li><b>Karın ve pelvis.</b> Karın organlarından gelen uyarılar çölyak pleksustan, pelvis organlarından gelenler inferior hipogastrik pleksustan geçer. [[K5 s. 326]]</li>
<li><b>Omurilik.</b> Visseral lifler dorsal kökteki liflerin %10’undan azını oluşturur ve birden çok segmentte dorsal boynuz nöronlarında birleşir. [[K5 s. 326]] Bir kökün visseral duyu alanı bir kutanöz sinirinkinden daha geniştir. [[K5 s. 326]]</li></ul>
<p><b>Yansıyan ağrı için üç açıklama.</b> Visseral ve kutanöz girdiler V–VIII. laminalardaki aynı ikinci sıra nöronuna ulaşırsa beyin kaynağı somatik alana atfedebilir. [[K5 s. 326]] Visseral etkinliğin somatik duyuların iletimini kolaylaştırması veya yansımanın talamus düzeyinde ortaya çıkması da önerilmiştir. [[K5 s. 326]]</p>
<p><b>Klinik karşılık.</b> Ön bağırsak kökenli malignitelerde çölyak pleksus bloğu ağrıyı güvenilir biçimde giderebilir, ancak sempatik bloğun analjezi mekanizması tartışmalıdır. [[K5 s. 333]] Mesanenin hem sempatik hem parasempatik sinirlerinde bulunan afferentler bir açıklama sunar. [[K5 s. 333]] Sempatik trunkusla birlikte giden somatik liflerin bloktan etkilenmesi de olasıdır. [[K5 s. 333]]</p>
<aside class="an08-okuma"><p><b>Yansıma mı, yeni bir doku mu?</b> Yansıyan ağrıda hasta visseral girdiyi somatik bir alanda hissedebilir. [[K5 s. 326]] Apandisitte ağrının sağa yerleşmesinin açıklaması farklıdır. [[K5 s. 326]] İnflamasyon somatik innervasyonu olan pariyetal peritona ulaştığında, hastanın daha doğru yer gösterebildiği yeni bir duyu alanı sürece katılır. [[K5 s. 326]]</p></aside>
<details class="an08-okuma"><summary>Geniş bir ağrı alanı, yaygın bir lezyon olduğunu gösterir mi?</summary><p>Visseral afferentlerin dorsal kökte az yer kaplamasına rağmen tek bir köke ait organ duyu alanı geniştir. [[K5 s. 326]] Üstelik visseral girdi birden fazla spinal segmentteki nöronlara dağılır. [[K5 s. 326]] Bu dağılım, iç organdaki uyaranı tarif eden hastanın neden geniş bir bölge gösterebildiğini açıklar. [[K5 s. 326]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an08-boynuz">
<h2>Dorsal kökten Rexed laminalarına</h2>
<p class="intro">Birinci sıra nöronunun gövdesi dorsal kök gangliyonundadır ve merkezi uzantısı omuriliğe girerken dallanabilir. [[K5 s. 326–327]]</p>
<div class="viz"><div class="viz-head"><h3>Omurilik kesitinde afferent giriş ve gri madde</h3></div><div data-viz="an08_boynuz"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Periferik sinirde kalın ve ince lifler karışıktır, dorsal kökte ince C liflerinin çoğu lateralde toplanır. [[K5 s. 326]] Giriş bölgesinde medialdeki ince lifler de dorsolateral Lissauer traktusuna yönelir. [[K5 s. 326]] Kalın A liflerinin çoğu medialde arka kolona girer, bir kısmı Lissauer traktusuna katılır. [[K5 s. 326–327]]</p>
<p>Aksonlar giriş öncesinde veya girişte dallandığından merkezi uzantı sayısı gangliyon hücrelerinden yaklaşık %40 fazladır. [[K5 s. 327]] Bazı nosiseptif liflerin ventral kökten girip dorsale dönmesi, dorsal rizotomiye rağmen ağrının sürmesini açıklayabilir. [[K5 s. 327]] Şekil altyazısı %12 verse de ana metne göre bu liflerin oranı bilinmemektedir. [[K5 s. 327]]</p>
<div class="tbl-wrap"><table class="tbl"><caption>Kesitte on lamina</caption><thead><tr><th>Yer</th><th>Hücre grupları</th></tr></thead><tbody>
<tr><th>Dorsal boynuz</th><td>I–VI. laminaları içerir. [[K5 s. 327]] I marjinal tabakadır, II substantia gelatinozadır ve dış (IIo) ile iç (IIi) kısımlara ayrılır. [[K5 s. 327]] II–IV birlikte nukleus propriusu oluşturur. [[K5 s. 327]]</td></tr>
<tr><th>Ventral boynuz</th><td>VII–IX. laminaları kapsar. [[K5 s. 327]]</td></tr>
<tr><th>Merkezi kanal çevresi</th><td>X. lamina kanalı sarar. [[K5 s. 327]]</td></tr>
</tbody></table></div>
<p>Laminalar omurilik boyunca uzanarak medullanın dorsal boynuzuyla devam eder. [[K5 s. 327–328]] Lissauer traktusunda Aδ ve C liflerinin birer çıkan ve inen dalı vardır. [[K5 s. 328]]</p>
<ul><li><b>Aδ.</b> Her yönde bir ya da iki segment ilerler, lateralden dorsal boynuza girer ve I, IIo, V, X. laminalarda sonlanır. [[K5 s. 328]]</li>
<li><b>C.</b> Girişin üç veya daha fazla segment üstüne ve altına ulaşır, I, IIo ve V. laminalarda sonlanır. [[K5 s. 328]]</li>
<li><b>Mekanoreseptif girdi.</b> III ve IV. laminalarda sonlanma gösterilir. [[K5 s. 327]]</li>
<li><b>Kas ve visseral afferentler.</b> Başlıca I ve V’e gider, sempatik Aδ ve C afferentleri ayrıca lateral hücre çekirdeğinin anteromedial kısmında sonlanır. [[K5 s. 328]] Visseral ve kutanöz girdiyi birleştiren I ve V nöronları çoğunlukla karşı anterolateral fasikülüse uzanır. [[K5 s. 328]]</li></ul>
<details class="an08-okuma"><summary>Kaynakta iki farklı etiket görürseniz</summary><p>Şekil 237’nin altyazısında substantia gelatinoza için III yazılıdır, aynı sayfanın lamina tarifinde ise II açıkça dış ve iç bölümleriyle tanımlanır. [[K5 s. 327]] Şekil 238’in altyazısındaki Aα ve Aδ adları da şeklin üzerindeki mekanoreseptif ve nosiseptif lif adlarıyla uyuşmaz. [[K5 s. 327]] Sonlanmaları izlerken ana metindeki dağılımı kullanın: nosiseptif Aδ için I, IIo, V ve X, C için I, IIo ve V. [[K5 s. 328]]</p></details>
<p>Dorsal boynuz hücreleri çıkan yollara, aynı segmentteki ve diğer segmentlerdeki hücrelere bağlanır. [[K5 s. 328]] Dorsolateral funikulustan gelen inen aksonlar burada iletimi baskılayabilir veya kolaylaştırabilir. [[K5 s. 328]]</p>
<aside class="an08-okuma"><p><b>Segment ile laminayı ayırın.</b> Üç segment yukarı çıkan bir C lifini izlerken omuriliğin uzun ekseni boyunca hareket edersiniz. [[K5 s. 328]] Aynı lifin IIo’da sonlandığını söylerken kesit içinde, substantia gelatinozanın dış kısmındaki konumunu tarif edersiniz. [[K5 s. 327–328]] Dolayısıyla giriş segmentini bilmek tek başına sinapsın hangi düzeyde veya gri maddenin neresinde kurulacağını söylemez. [[K5 s. 327–328]]</p></aside>
</section>

<section class="wrap blk ders-sec" id="an08-yol">
<h2>İkinci sıra nöronu nerede çapraz yapar?</h2>
<p class="intro">İkinci sıra nöronunun aksonu ventral beyaz komissürden karşıya geçer, lateral spinotalamik traktusta yükselir ve talamusta kortekse giden üçüncü sıra nöronuyla bağlantı kurar. [[K5 s. 328]]</p>
<div class="viz"><div class="viz-head"><h3>Omurilikte çapraz, talamusta aktarım</h3></div><div data-viz="an08_yol"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Dorsal boynuzdan üst merkezlere başlıca lateral ve ventral spinotalamik traktuslar bilgi taşır. [[K5 s. 328]] Spinotalamik, spinoretiküler ve spinomezensefalik traktuslar birlikte anterolateral fasikülüsü oluşturur. [[K5 s. 328]] Dorsal kolondaki postsinaptik spinomedüller sistem de nosiseptif bilgi iletir. [[K5 s. 328]] Bazı araştırmacılar spinomezensefalik ve spinoretiküler traktusları işlev bakımından ayırt edemez. [[K5 s. 328]]</p>
<h3>Spinotalamik sistemde başlangıç ve hedef</h3>
<ul><li><b>Köken.</b> Hücre gövdeleri I ve V–IX. laminalara dağılır. [[K5 s. 328]] Çapraz, bir ya da iki segment içinde gerçekleşir. [[K5 s. 328]]</li>
<li><b>I ve V.</b> Ventrobazal ve posterior talamusa giden nöronlar burada yoğunlaşır. [[K5 s. 328]] Ventroposterolateral çekirdek ve medial posterior talamustaki sonraki nöron somatosensöriyel kortekse uzanır. [[K5 s. 328]]</li>
<li><b>Derin laminalar.</b> Medial talamusa projeksiyonların çoğu VI–IX’dan, bir kısmı I’den gelir. [[K5 s. 328]] Derin laminaların hedefleri hipotalamus, periakuaduktal gri madde (PAG), medulla oblongata, pons ve mezensefalonun retiküler formasyonu ile talamusun medial ve intralaminar çekirdekleridir. [[K5 s. 328]] Bu bağlantılar internöronlar üzerinden limbik sisteme ve ön beyine ulaşır. [[K5 s. 328]]</li>
<li><b>Yer ve şiddet.</b> Hem traktusta hem talamusta vücut bölgelerinin topografik temsili vardır. [[K5 s. 328]] Sakral lifler lateralde kalır, yukarı çıkıldıkça yeni lifler mediale eklenir. [[K5 s. 328]]</li></ul>
<p>Lateral spinotalamik yol evrimsel olarak daha yenidir ve insanda diğer primatlara göre çok daha büyüktür. [[K5 s. 329]] Kalın lifleri, az sayıda sinapsı ve hızlı iletimiyle uyaranın yerini ve büyüklüğünü ayırt etmeye katkı sağlıyor görünür. [[K5 s. 328–329]] Kesildiğinde olguların %80–90’ında karşı tarafta ağrı duyusu azalır, kalan olgularda çapraz yapmayan lifler iletimi sürdürüyor olabilir. [[K5 s. 328–329]]</p>
<h3>Retiküler ve kraniyal bağlantılar</h3>
<p>Spinoretiküler hücreler muhtemelen VII ve VIII’dedir, aksonları çapraz yapıp spinotalamik traktusun medialinden yükselir. [[K5 s. 329]] İnce ve görece yavaş lifler, çok sinapslı bağlantılarla beyin sapının retiküler çekirdeklerine ve talamusun küçük intralaminar çekirdeklerine ulaşır. [[K5 s. 329]] İnsanda başlıca iki nosiseptif yol spinotalamik ve spinoretiküler yollardır. [[K5 s. 329]]</p>
<p>Spinoretiküler ve spinomezensefalik yollar beynin evrimsel olarak eski bölgeleriyle bağlantılıdır ve refleksler, endokrin yanıt, motivasyon, korku ve ıstırapla ilişkilidir. [[K5 s. 329]] Duyusal kraniyal sinirlerin nosiseptif girdisini bulbotalamik lifler taşır. [[K5 s. 329]] Kitap, trigeminal çekirdekten geçen bu sistemin spinotalamik sistemle ortak dağılımını ve ikinci–üçüncü servikal vertebra düzeyine kadar uzanımını tarif eder. [[K5 s. 329]]</p>
<aside class="an08-okuma"><p><b>Bir kesiyi yorumlayın.</b> Resimdeki birinci noktada hücre gövdesini, ikinci noktada aynı hücrenin karşıya geçen aksonunu, üçüncü noktada ise yükseldiği beyaz maddeyi düşünün. [[K5 s. 328]] Son noktada bir kesi varsa etkilenen lifin girdisi kesinin karşı tarafından gelmiştir. [[K5 s. 328–329]] Talamustaki sinapstan sonra kortekse uzanan akson başka bir hücreye aittir. [[K5 s. 328]]</p></aside>
<details class="an08-okuma"><summary>Uyaranın yeri ile uyandırdığı tepkiyi hangi yollar açıklar?</summary><p>Lateral spinotalamik traktustaki düzen, sakral girdilerin nerede bulunduğunu ve daha üst segmentlerin liflerinin nereye eklendiğini öngörmeye izin verir. [[K5 s. 328]] Talamusta da korunan bu düzen ve somatosensöriyel korteks bağlantısı, yer bildirimiyle ilişkilidir. [[K5 s. 328–329]] Korkuyu ve motivasyonel yanıtı açıklarken ise retiküler ve mezensefalik bağlantıları hesaba katın. [[K5 s. 329]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an08-matriks">
<h2>Ağrının yerini bulmak ve ağrıdan etkilenmek</h2>
<p class="intro">Talamustan çıkan uyarılar, ağrının yerini seçmeye ve onun duygusal etkisini yaşamaya katılan farklı beyin bölgelerine dağılır. [[K5 s. 329]]</p>
<div class="viz"><div class="viz-head"><h3>Medial yüzden ağrı matriksine bakış</h3></div><div data-viz="an08_matriks"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Descartes’ın 1644’te perifer ile beyni bağlayan ince iplikçikler önermesi, üç yüzyıllık ağrı yolu ve merkezi arayışını başlattı. [[K5 s. 323]] Bugünkü bilgiler hayvan deneyleri, sinir sistemi hasarlı insanlardaki klinik gözlemler, nörofizyoloji ve işlevsel görüntülemeden gelir. [[K5 s. 323]] PET’te yerel beyin kan akımındaki değişiklikler sinaptik etkinliği yansıtır, fMRI sinyali de kan akımıyla orantılı değişir. [[K5 s. 323]]</p>
<p>Ağrı organizmayı hasara karşı uyarır, ancak gerçek veya olası doku hasarıyla ilişkilendirilen bu hoş olmayan deneyim hem duyusal hem duygusal ve kişiye özgüdür. [[K5 s. 323]] Ağrıyı anlatırken seçilen sıfatlar nedeni hakkında ipucu verebilir. [[K5 s. 323]] Aynı uyaranın farklı algılanmasında üst merkezlerin özellikle duygusal bileşeni değiştirebilmesi önemlidir. [[K5 s. 323]]</p>
<ul><li><b>Lateral talamik sistem.</b> Primer ve sekonder somatosensöriyel kortekse uzanan bu sistem, uyaranı ayırt etme ve yerini belirlemeyle ilişkili görünür. [[K5 s. 329]]</li>
<li><b>Medial sistem.</b> Ağrının duygusal bileşeniyle ilişkilidir, insula ise her iki işleve de katılıyor görünür. [[K5 s. 329]]</li>
<li><b>Matriksin diğer üyeleri.</b> Anterior singulat korteks, amigdala ve opioid reseptörlerinden zengin PAG de ağda yer alır. [[K5 s. 329]] Frontal operkulumun elektrikle uyarılması ağrı hissi doğurabilir. [[K5 s. 329]]</li></ul>
<p>Ayrı bir ağrı merkezi yoktur ve bağlantıların işlevi hasar veya inflamasyonla değişebilir. [[K5 s. 323]] Kronik ağrısı olan kişilerde fMRI etkinlik örüntüsü sağlıklı kontrollerden farklıdır. [[K5 s. 329–330]] Bazı kronik ağrılarda mevcut yöntemlerle dokuda veya sinir sisteminde patoloji gösterilemez. [[K5 s. 324]]</p>
<p><b>Nosiseptif ve nöropatik ağrı.</b> Ameliyat sonrası travmada periferik uçlar etkinleşebilir, omurilik yaralanması veya periferik nöropatide ise ağrı işleyen sistemin kendisi hasarlıdır. [[K5 s. 323–324]] Sinir sistemi işlev bozukluğu, periferik nosiseptör etkinleşmeden ve doku hasarı olmadan da ağrıya yol açabilir. [[K5 s. 324]]</p>
<p>Genellikle nosiseptif ağrının opioidlere, nöropatik ağrının antikonvülzan veya antidepresanlara daha iyi yanıt verdiği düşünülür, ancak opioid yanıtı iki grubu kesin olarak ayırmaz. [[K5 s. 324]]</p>
<aside class="an08-okuma"><p><b>Hastaya iki ayrı soru sorun.</b> “Nerede ve ne kadar şiddetli?” sorusu lateral sistemin uzamsal ve niceliksel ayrım işlevine karşılık gelir. [[K5 s. 329]] “Bu ağrı size ne hissettiriyor?” sorusu medial sistemin katıldığı duygusal boyutu açar. [[K5 s. 329]] İnsulanın iki işlevde de rol oynuyor görünmesi, bu ayrımın neden yaklaşık olduğunu anlamaya yardım eder. [[K5 s. 329]]</p></aside>
<details class="an08-okuma"><summary>Bir görüntüleme bulgusu neyi gösterir?</summary><p>PET ve fMRI ağrıyla birlikte değişen yerel kan akımı üzerinden etkinlik hakkında bilgi verir. [[K5 s. 323]] Kronik ağrı ile sağlıklı durum arasındaki fark birden çok bölgenin etkinlik örüntüsünde görülebilir. [[K5 s. 329–330]] Ağrının nerede hissedildiği, şiddeti ve uyandırdığı duygusal tepki bu ağın farklı bağlantılarıyla ilişkilidir. [[K5 s. 329]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an08-inhibisyon">
<h2>İnen denetim ve dorsal boynuzdaki kapı</h2>
<p class="intro">Dorsal boynuza gelen aynı periferik girdinin etkisi, beyin sapından inen denetime ve birlikte etkinleşen liflerin çapına göre değişebilir. [[K5 s. 331–332]]</p>
<div class="viz"><div class="viz-head"><h3>Mezensefalondan omuriliğe inen denetim</h3></div><div data-viz="an08_inhibisyon"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>PAG frontal korteks ve diğer bilişsel alanlardan, limbik sistemden, talamus ve hipotalamustan girdi alır. [[K5 s. 330–331]] Endorfinlerin ve opioid reseptörlerinin yoğun olduğu PAG’nin elektrikle uyarılması, başka duyusal ya da motor etki olmaksızın güçlü analjezi sağlayabilir. [[K5 s. 330]]</p>
<ol><li><b>Beyin sapı üzerinden.</b> Anterolateral fasikülüsteki çıkan uyarılar medüller ve mezensefalik çekirdeklere, özellikle nükleus rafe magnusa ve medulla, pons, mezensefalon retiküler formasyonuna ulaşır. [[K5 s. 331]] Nükleus kuneiformis üzerinden PAG’ye de ulaşır. [[K5 s. 331]] PAG’den çıkan inhibitör lifler pons üzerinden dorsal boynuza gider veya rafe magnusta sinaps yapıp dorsolateral funikulustan iner. [[K5 s. 331]] Tüm laminalarda, özellikle I, IIo ve V’te sonlanırlar. [[K5 s. 331]] Medial ve lateral retiküler formasyon da inen düzenlemeye katılır. [[K5 s. 331]]</li>
<li><b>Doğrudan hipotalamospinal yol.</b> Medullanın ve omuriliğin dorsal boynuzuna gider, spinal uçları I ve X’ta yoğunlaşır. [[K5 s. 331]]</li>
<li><b>Doğrudan PAG–spinal yol.</b> Bazal çekirdeklere uğramadan medullanın boynuzuna ve spinal I, IIo, V, X. laminalara ulaşır. [[K5 s. 331]]</li></ol>
<p>Bu yolların anatomileri ve ileticileri farklıdır, başlıca ileticilerin serotonin (5-hidroksitriptamin) ve norepinefrin olduğu düşünülür. [[K5 s. 331–332]] İnen inhibitör yollar işlevsel plastisite gösterir. [[K5 s. 332]]</p>
<h3>Dokunma ve basınç ağrıyı nasıl değiştirebilir?</h3>
<p>Melzack ve Wall’ın kapı modeli, uyarı ile bildirilen ağrı şiddeti arasındaki ilişkinin fizyolojik ve psikolojik koşullara göre değişmesini açıklar. [[K5 s. 332]] Büyük ve küçük çaplı lifler hem substantia gelatinozaya (II. lamina) hem iletim hücrelerine girdi verir. [[K5 s. 332]] Hangi grubun etkinliği ağır basarsa kapının davranışı ona göre değişir. [[K5 s. 332]]</p>
<p>Küçük lif etkinliği kapıyı açma, büyük lif etkinliği iletimi baskılama eğilimindedir. [[K5 s. 332]] Büyük lifin nosiseptif olması gerekmez, yoğun kutanöz dokunma ve basınç girdisi küçük liflerin iletimini azaltabilir. [[K5 s. 332]] Güncellenmiş modelde beyin sapından inen denetim ve substantia gelatinozadan iletim hücresine hem uyarıcı hem baskılayıcı bağlantılar vardır. [[K5 s. 332]] Modelde diğer bağlantılar uyarıcıdır, baskılanma presinaptik, postsinaptik veya her iki düzeyde olabilir. [[K5 s. 332]]</p>
<h3>Kalıcı ağrıya geçiş</h3>
<p>Artmış periferik girdi ve başka mekanizmalar, merkezi nöronların etkinliğini artırıp eşiğini düşürebilir. [[K5 s. 332]] Bu <b>santral duyarlılaşmada</b> sistemin kazancı yükselir, daha önce ağrısız olan uyarı ağrı doğurabilir. [[K5 s. 332]] Erken evrede spinal sinaptik bağlantılar, geç evrede protein üretimi değişir. [[K5 s. 332]]</p>
<p>Mezensefalon ve beyin sapından inen, duygusal, otonom ve kaçınma yanıtlarıyla ilişkili sistemler de değişir ve bunların serotonerjik olduğu düşünülür. [[K5 s. 332–333]] Periferik duyarlılaşmaya eşlik eden geri dönüşümlü fizyolojik ve farmakolojik değişiklikler, girdi ile algı arasındaki ilişkiyi değiştirerek kalıcı ağrıya zemin hazırlar. [[K5 s. 333]]</p>
<h3>Stres, duygu ve otonom sistem</h3>
<p>Savaşta veya spor yaralanmasında yoğun heyecan, güçlü motivasyon ve dikkatin başka yöne çevrilmesi ağrıyı azaltabilir, hatta ortadan kaldırabilir. [[K5 s. 330]] Savaş ya da kaç yanıtındaki bu süzme etkisine endorfin salınımının katkıda bulunduğu düşünülür. [[K5 s. 330]] Dikkatin yönlendirilmesi ve dışarıdan verilen opioidler ağrı matriksinin etkinliğini değiştirebilir, trisiklik antidepresanlar ise inen sistemler üzerinden analjezi sağlar. [[K5 s. 330]]</p>
<p>Anksiyete ve depresyon ağrı algısını artırma eğilimindedir, bunda inen inhibitör deşarjın azalması veya kortikal işlemenin değişmesi rol oynayabilir. [[K5 s. 330]] Nöraksisin birçok düzeyinde sempatik ve parasempatik sistemler ağrıyla etkileşir görünür, sempatik katkı daha baskın olabilir. [[K5 s. 333]]</p>
<p>Beyinde sempatik etkinleşme genellikle ağrıyı baskılar. [[K5 s. 333]] Hem ağrıda hem sempatik uyarıda etkinleşen anterior singulat korteks, insula ve amigdalada çok sayıda μ-opioid reseptörü bulunur. [[K5 s. 333]] Sempatik analjezi, stres sırasında endojen opioid salınımı ve inen inhibitör yolların etkinleşmesiyle ilişkili olabilir. [[K5 s. 333]]</p>
<aside class="an08-okuma"><p><b>Uyarının arttığı yeri bulun.</b> Periferik duyarlılaşmada hasarlı dokudaki uç daha düşük eşikte yanıt verir ve omuriliğe daha fazla girdi ulaşır. [[K5 s. 325]] Santral duyarlılaşmada değişen, merkezi nöronların bu girdiye verdiği yanıttır. [[K5 s. 332]] Kapı modelinde ise belirleyici olan, aynı anda gelen büyük ve küçük çaplı liflerin göreli etkinliği ile inen denetimdir. [[K5 s. 332]]</p></aside>
<details class="an08-okuma"><summary>İki doğrudan inen yol nasıl ayırt edilir?</summary><p>Her iki yol için önce çıkış yerini söyleyin, sonra medulladaki ve omurilikteki hedefleri ayırın. [[K5 s. 331]] Hipotalamustan gelen uçlar için spinal I ve X öne çıkar, doğrudan PAG kökenli projeksiyon için bunlara IIo ve V de eklenir. [[K5 s. 331]] Rafe magnustaki ara sinaps ise PAG’den gelen diğer iniş seçeneğine aittir. [[K5 s. 331]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an08-p1">
<h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="an08-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an08-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an08-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an08-p2">
<h2>Part II · SOE 1</h2>
<div class="card soe-soru"><b>Açılış sorusu</b><p>Bir hastada tek taraflı lateral spinotalamik traktus kesisi sonrası ağrı duyusunu değerlendiriyorsunuz. Derideki uyarandan başlayarak üç nöronu izleyin. Hangi tarafta nasıl bir değişiklik beklersiniz?</p></div>
<h3>Cevap iskeleti</h3>
<ol class="iskelet"><li>Serbest uçta başlayan uyarıyı Aδ veya C lifi taşır, birinci sıra nöronunun gövdesi dorsal kök gangliyonundadır. [[K5 s. 324–326]]</li>
<li>Lissauer traktusundaki kısa seyirden sonra dorsal boynuzda sinaps gerçekleşir, I ve V. laminalar talamusa giden önemli çıkış yerleridir. [[K5 s. 328]]</li>
<li>İkinci nöronun aksonu bir ya da iki segment içinde ventral beyaz komissürden karşı tarafa geçer ve anterolateral beyaz maddede yükselir. [[K5 s. 328]]</li>
<li>Talamustaki üçüncü sıra nöronu somatosensöriyel kortekse uzanır, lateral sistem uyaranın yerinin ayrımına katılır. [[K5 s. 328–329]]</li>
<li>Kesi karşı tarafta hipoaljezi yapabilir, bu bulgu olguların %80–90’ında görülür ve çapraz yapmayan lifler farklılığı açıklayabilir. [[K5 s. 328–329]]</li></ol>
<div class="note"><b>Çizin.</b> Enine omurilik kesitinde dorsal boynuzu ve merkezi kanalı bulun. Bir taraftaki dorsal boynuzdan başlayıp kanalın ventralinden karşı anterolateral beyaz maddeye geçin. [[K5 s. 328]] Aynı çizgiyi talamusta bitirin ve kortekse yeni bir nöronla devam edin. [[K5 s. 328]]</div>
<p><b>Olası ek sorular</b></p><ul><li>Dorsal rizotomi neden her hastada ağrıyı ortadan kaldırmayabilir?</li><li>Spinoretiküler yolun lifleri, hızı ve hedefleri nasıl farklılaşır?</li><li>Apandisitte ağrının yerinin belirginleşmesini hangi doku açıklar?</li><li>Bir yaralanmadan sonra hafif dokunma hangi mekanizmayla ağrılı hissedilebilir?</li></ul>
</section>
<section class="wrap blk ders-sec" id="an08-ozet">
<h2>Özet</h2>
<ul class="ozet"><li>Aδ lifleri ilk keskin ağrıya, C lifleri süren yanıcı ağrıya aracılık eder. [[K5 s. 324–325]]</li>
<li>Visseral girdi birçok segmente dağılır, pariyetal periton tutulduğunda ağrının yeri belirginleşebilir. [[K5 s. 326]]</li>
<li>Dorsal boynuzdan çıkan spinotalamik akson ventral beyaz komissürde çapraz yapar ve talamusta kortekse giden nöronla sinaps kurar. [[K5 s. 328]]</li>
<li>İletimi spinal kapı ve inen sistemler değiştirir, duyusal ayrım ve duygusal tepki birden çok beyin bölgesinin etkinliğine dayanır. [[K5 s. 329–332]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="08"></div>
<nav class="ders-gec" aria-label="Ders geçişi"><a href="#/dersler/anatomi/07c">← Karın duvarı</a><a href="#/dersler/anatomi">İçindekiler →</a></nav>
</section>`,
};
