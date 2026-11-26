VERI.sorular = VERI.sorular || {};
VERI.sorular['an06e-1'] = {
  no: 1, kok: 'Glossofaringeal sinir', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 281–283]]',
  onermeler: [
    { t: 'Stilofaringeus kasına giden motor lifler alt salivator çekirdekten çıkar.', d: false, n: 'Bu kasın motor lifleri rostral nükleus ambiguustan çıkar. [[K5 s. 281]]' },
    { t: 'Timpanik dal juguler foramen içinde ayrılır.', d: true, n: 'IX, timpanik dalını kafa tabanını terk etmeden verir. [[K5 s. 282]]' },
    { t: 'Karotis cisimciği internal karotis başlangıcındaki genişlemedir.', d: false, n: 'Genişleme sinüstür, cisimcik ise bifurkasyonun derinindeki kemoreseptördür. [[K5 s. 283]]' },
    { t: 'Karotis sinüsünün uyarılması kalp hızını yavaşlatır.', d: true, n: 'Basınç reseptörü refleksi kalp hızını ve kan basıncını düşürür. [[K5 s. 283]]' },
    { t: 'Tek taraflı IX bloğu sonrasında disfoni gelişmesi vagusun korunduğunu gösterir.', d: false, n: 'Disfoni ve taşikardi vagus bloğunu düşündürebilir. [[K5 s. 283]]' },
  ],
};

VERI.sorular['an06e-2'] = {
  no: 2, kok: 'Vagusun seyri ve dalları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 285–288]]',
  onermeler: [
    { t: 'Sol rekürren laringeal dal aort arkının alt kenarında ayrılır.', d: true, n: 'Sol vagus rekürren dalını arkın alt kenarında verir. [[K5 s. 286]]' },
    { t: 'Üst vagal gangliyon juguler foramenin içindedir.', d: true, n: 'Alt gangliyon ise çıkışta bulunur. [[K5 s. 285]]' },
    { t: 'Sol alt servikal kardiyak dal derin kardiyak pleksusa katılır.', d: false, n: 'Arkın önünden geçerek yüzeyel kardiyak pleksusa gider. [[K5 s. 288]]' },
    { t: 'Posterior vagal trunkus yalnız sağ vagusun liflerini taşır.', d: false, n: 'Posterior özofageal pleksusa sol taraftan da lifler katılır. [[K5 s. 286]]' },
    { t: 'Epiglottisin tat lifleri superior laringeal sinirin iç dalında ilerler.', d: true, n: 'Bu yol soliter traktus çekirdeğinin arka bölümüne ulaşır. [[K5 s. 285]]' },
  ],
};

VERI.sorular['an06e-3'] = {
  no: 3, kok: 'Aksesuar ve hipoglossal sinirler', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 289–291]]',
  onermeler: [
    { t: 'Aksesuar sinir spinal kanaldan juguler foramen yoluyla kafatasına girer.', d: false, n: 'Spinal lifler foramen magnumdan kafatasına girer, sonra juguler foramene ulaşır. [[K5 s. 289]]' },
    { t: 'Aksesuar sinir trapezin derin yüzüne girer.', d: true, n: 'Giriş noktası klavikulanın yaklaşık 5 cm üzerindedir. [[K5 s. 290]]' },
    { t: 'Hipoglossal sinir çekirdeği somatik efferent kolondadır.', d: true, n: 'Çekirdek dördüncü ventrikül tabanında yer alır. [[K5 s. 290]]' },
    { t: 'Geniohiyoid kasına giden C1 lifleri hipoglossal sinirle taşınır.', d: true, n: 'C1 liflerinin bir bölümü XII ile geniohiyoid ve tirohiyoide ulaşır. [[K5 s. 291]]' },
    { t: 'Hipoglossal çekirdek lezyonunda dil dışarı çıkarıldığında lezyon tarafına sapar.', d: true, n: 'Aynı taraftaki dil kaslarında paralizi ve atrofi gelişir. [[K5 s. 291]]' },
  ],
};

SAYFALAR['dersler/anatomi/06e'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 6 · Ders 06e',
  baslik: 'Glossofaringeal, vagus, aksesuar ve hipoglossal sinirler',
  lede: 'IX, X ve XI juguler foramenden çıkar. [[K5 s. 285]] XII, dil kaslarına ulaşmak üzere hipoglossal kanaldan geçer. [[K5 s. 290]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an06e-farenks"><span>01</span>IX ve farenks</button>
  <button type="button" data-scroll="an06e-karotis"><span>02</span>Karotis ve blok</button>
  <button type="button" data-scroll="an06e-boyun"><span>03</span>X ve boyun</button>
  <button type="button" data-scroll="an06e-toraks"><span>04</span>Toraks</button>
  <button type="button" data-scroll="an06e-mide"><span>05</span>Mide</button>
  <button type="button" data-scroll="an06e-aksesuar"><span>06</span>XI ve boyun</button>
  <button type="button" data-scroll="an06e-dil"><span>07</span>XII ve dil</button>
  <button type="button" data-scroll="an06e-p1"><span>08</span>Part I</button>
  <button type="button" data-scroll="an06e-p2"><span>09</span>Part II</button>
  <button type="button" data-scroll="an06e-ozet"><span>10</span>Özet</button>
</nav>
<section class="wrap blk ders-sec" id="an06e-farenks">
  <h2>IX · Farenkse ulaşan sinir</h2>
  <p class="intro">Dilin arka üçte birinde hem genel duyuyu hem tadı IX taşır. [[K5 s. 281]] Aynı sinirin motor hedefi stilofaringeus, salgı hedefi parotistir. [[K5 s. 281]]</p>
  <div class="viz"><div class="viz-head"><h3>Stilofaringeus ve farenks duvarı</h3></div><div data-viz="an06e_farenks"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Önce sarı siniri stiloid çıkıntının derininden farenks duvarına kadar izleyin. [[K5 s. 282]] Ardından juguler foramen görünümüne geçin. Önden arkaya ilerlerken önce IX’un tek başına geçtiği kılıfı, sonra X ile XI’i bir arada tutan ikinci kılıfı bulun. [[K5 s. 285]]</p>
  <h3>Dört çekirdek, dört işlev</h3>
  <dl class="an06e-liste">
    <dt>Motor</dt><dd>Üçüncü brankiyal arktan gelişen stilofaringeusa giden brankiyal efferent lifler, vagusla paylaşılan nükleus ambiguusun rostral ucundan çıkar. [[K5 s. 281]]</dd>
    <dt>Salgı</dt><dd>Genel visseral efferent kolondaki alt salivator çekirdek, vagusun dorsal motor çekirdeğinin hemen rostralindedir. [[K5 s. 281]] Parotisin parasempatik sekretomotor lifleri buradan başlar. [[K5 s. 281]]</dd>
    <dt>Tat</dt><dd>Dilin arka üçte birindeki tat tomurcuklarından gelen lifler, özel visseral afferent kolondaki soliter traktus çekirdeğine gider. [[K5 s. 281]] VII’nin korda timpani dalı ve X da bu çekirdeğe tat bilgisi getirir. [[K5 s. 281]]</dd>
    <dt>Genel duyu</dt><dd>Tonsil, farenks ve dilin arka üçte birinden gelen lifler vagusun dorsal duyu çekirdeğinde, genel visseral afferent kolonda sonlanır. [[K5 s. 281]]</dd>
  </dl>
  <h3>Medulladan dile</h3>
  <dl class="an06e-liste">
    <dt>Çıkış</dt><dd>Üst medullada oliva ile inferior serebellar pedinkül arasından dört ya da beş kökçük çıkar. [[K5 s. 281]] IX öne ve dışa ilerler, keskin biçimde aşağı dönerek juguler foramenden kafatasını terk eder. [[K5 s. 281]]</dd>
    <dt>Foramen</dt><dd>IX’un kendi dura kılıfı vardır. [[K5 s. 281]] Üst ve alt gangliyonlarının ikisi de foramendedir ve tat ile genel duyunun birinci nöron gövdelerini içerir. [[K5 s. 282]]</dd>
    <dt>Boyun</dt><dd>Stiloid çıkıntı ve kaslarının derininde, internal karotis ile internal juguler ven arasından aşağı ve öne iner. [[K5 s. 282]] İki karotis arteri arasından öne kıvrılır, stilofaringeusu çaprazlar ve üst ile orta konstriktör arasından farenkse girer. [[K5 s. 282]]</dd>
    <dt>Uç dallar</dt><dd>Dilin arka üçte birine tat ve genel duyu, tonsil ve farenks mukozasına duyu taşır. [[K5 s. 282]]</dd>
    <dt>Timpanik dal</dt><dd>Foramen içinde ayrılır, timpanik boşluğu inerve eder ve küçük petrozal sinir olarak sürer. [[K5 s. 282]] Parotise gidecek pregangliyonik lifleri otik gangliyona ulaştırır. [[K5 s. 282]]</dd>
  </dl>
  <h3>Karotis çevresinde yön bulma</h3>
  <p>K5’in boyun görünümünde IX, vagus, vagusun faringeal ve superior laringeal dalları, XI ve XII aynı damar bölgesinde izlenir. [[K5 s. 282]] Ortak karotis ve internal juguler ven aşağıdaki kılavuz yapılardır. [[K5 s. 282]]</p>
  <p>Arterleri ayırt etmek için şekildeki superior tiroid, lingual, fasiyal, asendan faringeal, oksipital ve posterior auriküler arterleri, yukarıda maksiller ve yüzeyel temporal arterleri bulun. [[K5 s. 282]] XII’nin inen dalı ve ansa hipoglossi de bu görünümde yer alır. [[K5 s. 282]]</p>
</section>
<section class="wrap blk ders-sec" id="an06e-karotis">
  <h2>IX · Karotis refleksleri ve blok anatomisi</h2>
  <p class="intro">Karotis dalı kafatasının hemen altında IX’dan ayrılır ve internal karotis boyunca iki farklı reseptöre iner. [[K5 s. 282–283]]</p>
  <div class="viz"><div class="viz-head"><h3>Karotis bifurkasyonunun derin yüzü</h3></div><div data-viz="an06e_karotis"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Çatala aşağıdan yaklaşın. Sinüs, internal karotisin kendi duvarındaki genişlemedir. [[K5 s. 283]] Cisimcik ise iki damarın ayrıldığı yerde, derinde seçilen küçük oval yapıdır. [[K5 s. 283]] Kemik görünümünde mastoid çıkıntı ve mandibula açısıyla yüzeydeki hattı kurun, sonra stiloid çıkıntıyı bulun. [[K5 s. 283]]</p>
  <h3>Basınç mı, kan kimyası mı?</h3>
  <dl class="an06e-liste">
    <dt>Karotis sinüsü</dt><dd>İnternal karotisin başlangıcındaki ince duvarlı genişleme, IX’dan yoğun lif alır ve vücudun başlıca basınç reseptörüdür. [[K5 s. 283]] Uyarıldığında afferent sinyal IX ile taşınır, kan basıncı ve kalp hızı refleks olarak düşer. [[K5 s. 283]]</dd>
    <dt>Karotis cisimciği</dt><dd>Ortak karotis bifurkasyonunun derinindeki yaklaşık 5 mm’lik oval, kızıl kahverengi cisim bir kemoreseptördür. [[K5 s. 283]] Aort cisimciğiyle birlikte özellikle O₂ ve CO₂ parsiyel basınçlarındaki değişikliklere ve H⁺ artışına duyarlıdır. [[K5 s. 283]]</dd>
    <dt>Mikroyapı</dt><dd>Çok yüzlü hücreler arasında dağınık kromafin hücreler, bol sinüzoid ve yoğun IX dallanması bulunur. [[K5 s. 283]] Doku gramı başına kan akımı tüm organlar arasında en yüksektir, böylece H⁺ ve O₂ değişimleri izlenebilir. [[K5 s. 283]]</dd>
  </dl>
  <h3>Duyu kaybından nevraljiye</h3>
  <dl class="an06e-liste">
    <dt>Tam kesi</dt><dd>Farenks duyusu, dil kökünde tat ve genel duyu, parotis salgısı kaybolur. [[K5 s. 283]] Farenks kaslarında kısmi güçsüzlük olur. [[K5 s. 283]] Vagus veya çekirdekleri sıklıkla birlikte etkilendiği için izole IX lezyonu seyrektir ve tanınması güçtür. [[K5 s. 283]]</dd>
    <dt>Nevralji</dt><dd>Tonsil bölgesindeki şiddetli ağrıyı esneme, ileri olgularda çiğneme tetikler. [[K5 s. 283]] Glossofaringeal blok nevraljide ve baş-boyun malignitelerinin palyatif bakımında kullanılır. [[K5 s. 283]]</dd>
    <dt>Kitaptaki blok tarifi</dt><dd>Hedef, juguler çıkışla IX’un stiloid çıkıntının derinine geçtiği yer arasındadır. [[K5 s. 283]] Mastoid çıkıntı ile mandibula açısını birleştiren çizginin ortasında cilde dik ilerleyen iğnenin 3 cm içinde stiloide ulaşması beklenir. [[K5 s. 283]] Kaynak, kemiği arkaya doğru izleyip temas kaybolur kaybolmaz enjeksiyonu tarif eder. [[K5 s. 283]]</dd>
    <dt>Komşu sinirler</dt><dd>Anestezik hemen her zaman yayılır ve X, XI, XII etkilenebilir. [[K5 s. 283]] Hastada genellikle az rahatsızlık olur, seyrek olarak sternokleidomastoid ve trapez güçsüzlüğü görülür. [[K5 s. 283]] Taşikardi ve disfoni vagus bloğunu düşündürebilir. [[K5 s. 283]] İki taraflı blok denenmemelidir. [[K5 s. 283]]</dd>
  </dl>
</section>
<section class="wrap blk ders-sec" id="an06e-boyun">
  <h2>X · Çekirdekler, juguler foramen ve boyun</h2>
  <p class="intro">Kraniyal sinirlerin en büyüğü, en geniş dağılımlısı ve asimetrik olanı olan vagus, boyunda karotis kılıfı içinde ilerler. [[K5 s. 284–285]]</p>
  <div class="viz"><div class="viz-head"><h3>Karotis kılıfında vagusu bulun</h3></div><div data-viz="an06e_boyun"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Önce ven ve arterin kesitlerini bulun. İkisinin arasında, arkaya yakın duran küçük sarı kesit vagustur. [[K5 s. 285]] Arkaya doğru ilerlediğinizde ikinci bir sinirle karşılaşırsınız. [[K5 s. 285]] Bu sempatik zincirdir ve onu vagustan ayıran işaret karotis kılıfının dışında kalmasıdır. [[K5 s. 285]]</p>
  <h3>Hangi lif nereye gider?</h3>
  <dl class="an06e-liste">
    <dt>Motor</dt><dd>Larinks, bronş kası ve splenik fleksuraya kadar sindirim kanalına lif verir. [[K5 s. 284]] Kalpte etkisi yavaşlatıcıdır. [[K5 s. 284]]</dd>
    <dt>Duyu</dt><dd>Dura, dış kulak yolu, solunum yolu, kalp ve çıkan kolona kadar sindirim kanalından duyu, epiglottisten tat alır. [[K5 s. 284]]</dd>
    <dt>Sekretomotor</dt><dd>Bronş mukus bezlerine, sindirim kanalına ve ilişkili organlara gider. [[K5 s. 284]]</dd>
  </dl>
  <h3>Medullada üç merkez</h3>
  <dl class="an06e-liste">
    <dt>Dorsal çekirdek</dt><dd>Kaudal medullanın merkezi gri maddesinde, dördüncü ventrikül tabanının altındadır. [[K5 s. 284]] Kitap bu çekirdeği karma genel visseral merkez olarak tanımlar. [[K5 s. 284–285]] Kalp, bronş ve sindirim kanalına giden motor nöronları barındırır, larinks, akciğer, farenks, sindirim kanalı ve kalpten duyu alır. [[K5 s. 285]]</dd>
    <dt>Nükleus ambiguus</dt><dd>Retiküler formasyonun derinindeki brankiyal efferent merkezdir. [[K5 s. 285]] Klasik tanımda farenks, larinks ve damağın brankiyal kökenli istemli kaslarına IX, X ve XI ile motor lif gönderir. [[K5 s. 285]]</dd>
    <dt>Soliter traktus çekirdeği</dt><dd>Merkezi gri maddedeki özel afferent çekirdeğin ön bölümüne korda timpani, ortasına IX, arkasına X ulaşır. [[K5 s. 285]] X’un tat lifleri epiglottis ve vallekulalardan superior laringeal sinirin iç dalıyla gelir. [[K5 s. 285]]</dd>
  </dl>
  <h3>Juguler çıkıştan karotis kılıfına</h3>
  <dl class="an06e-liste">
    <dt>Kökçükler</dt><dd>X’un yaklaşık on kökçüğü, IX ile aynı hizada, oliva ile inferior serebellar pedinkül arasındaki posterolateral oluktan çıkar ve tek gövdede toplanır. [[K5 s. 285]]</dd>
    <dt>Önden arkaya</dt><dd>Juguler foramende sıra inferior petrozal sinüs, IX, X, XI ve internal juguler vendir. [[K5 s. 285]] X ve XI ortak dura kılıfındadır, fibröz septum IX’u ayırır. [[K5 s. 285]]</dd>
    <dt>Gangliyonlar</dt><dd>Üst gangliyon foramende, alt gangliyon çıkışındadır. [[K5 s. 285]] İkisi de spinal arka kök gangliyonlarına benzer biçimde tek uzantılı duyu nöronlarının gövdelerini taşır. [[K5 s. 285]] Üst gangliyon IX ve üst servikal sempatik gangliyonla, alt gangliyon XII ve C1–C2 halkasıyla bağlantılıdır. [[K5 s. 285]]</dd>
    <dt>Boyunda kesit</dt><dd>Üstte vagus, internal karotisle internal juguler ven arasında ve biraz arkalarındadır. [[K5 s. 285]] Daha aşağıda vagus, internal juguler ven ile ortak karotis arter arasındadır. [[K5 s. 285]] Sempatik zincir kılıfın arkasındadır, prevertebral fasya kılıfı longus capitis ve longus cervicis kaslarından ayırır. [[K5 s. 285]]</dd>
  </dl>
  <h3>Juguler fossadan kulağa, boyundan damağa</h3>
  <dl class="an06e-liste">
    <dt>Meningeal dal</dt><dd>Üst gangliyondan çıkar ve juguler foramenden arkaya geçerek duraya ulaşır. [[K5 s. 288]]</dd>
    <dt>Auriküler dal</dt><dd>Üst gangliyondan juguler fossanın lateral duvarındaki kanala girer, mastoid çıkıntı ile timpanik lamina arasından çıkar. [[K5 s. 288]] Petröz kemikte VII ile, kemikten çıktıktan sonra VII’nin posterior auriküler dalıyla bağlantı kurar. [[K5 s. 288]] Kepçenin medial yüzüne, dış kulak yoluna ve zarın dış yüzüne duyu verir. [[K5 s. 288]]</dd>
    <dt>Kulaktan gelen uyaran</dt><dd>“Belediye meclisi üyesi siniri” adı, dış kulağa soğuk su veya başka uyaranların iştahı artırdığı söylemine dayanır. [[K5 s. 288]] Önerilen açıklama, dış kulak ile mide salgısı ve boşalmasının vagal innervasyonu paylaşmasıdır. [[K5 s. 288]] Zar irritasyonu belki vagal refleksle kusmaya yol açabilir, çocuklarda akut otit karın ağrısıyla belirebilir. [[K5 s. 288]]</dd>
    <dt>Faringeal dal</dt><dd>Alt gangliyondan iki karotis arasına girer, aşağı ve öne ilerleyerek orta konstriktörde faringeal pleksusa katılır. [[K5 s. 288]] Klasik tarif liflerin çoğunu kraniyal XI’e bağlar, kitaptaki çalışma ise alt ambiguustan dört veya beş kökçükle çıkan vagal lifler saptamıştır. [[K5 s. 288]]</dd>
    <dt>Faringeal pleksus</dt><dd>IX’un faringeal dalı ve üst servikal sempatik gangliyon da pleksusa katılır. [[K5 s. 288]] Pleksus farenks mukozasına duyu, üst, orta ve alt konstriktörlere motor lif verir. [[K5 s. 288]] Damakta palatoglossus, palatofaringeus ve levator palati buradan, tensor palati ise V’in mandibular dalından innervasyon alır. [[K5 s. 288]]</dd>
  </dl>
  <h3>Medulla kesitini okuma</h3>
  <p>K5’teki enine kesit dördüncü ventrikülün kaudal bölümünden geçer ve X ile XII’nin çekirdeklerini aynı düzlemde gösterir. [[K5 s. 284]] Soliter traktus, X’un dorsal çekirdeği ve derindeki ambiguus, bu kesitte duyu ile visseral ve brankiyal motor yolları ayırt etmeye yardım eder. [[K5 s. 284–285]]</p>
  <p>Çıkış yerini tarif ederken oliva, piramit ve inferior serebellar pedinkülü kullanın. [[K5 s. 284–285]] Kesitte diğer yol işaretleri medial lemniskus, olivoserebellar traktus, V’in spinal traktusu ve spinotalamik traktustur. [[K5 s. 284]]</p>
</section>
<section class="wrap blk ders-sec" id="an06e-toraks">
  <h2>X · Toraks girişi ve rekürren dallar</h2>
  <p class="intro">Sağ rekürren laringeal sinir boyun kökünde, sol rekürren laringeal sinir ise toraksta vagustan ayrılır. [[K5 s. 285–287]]</p>
  <div class="viz"><div class="viz-head"><h3>Önden toraks girişi ve arkus aorta</h3></div><div data-viz="an06e_toraks"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Her iki tarafta sarı dalı ana gövdeden ayrıldığı damara kadar izleyin. [[K5 s. 285–286]] İki dönüşü aynı yatay çizgiye yerleştirmeye çalışırsanız sağdaki dalı fazla aşağıda ararsınız. [[K5 s. 285–287]] Sağ için subklavyen arteri, sol için aort arkını başlangıç işareti alın. [[K5 s. 285–286]]</p>
  <h3>İki tarafı damarlar üzerinden izleyin</h3>
  <dl class="an06e-liste">
    <dt>Sağ</dt><dd>Vagus subklavyen arterin ilk bölümünü çaprazlar, rekürren dal arterin alt kenarında ayrılır. [[K5 s. 285–286]] Ana gövde sağ brakiyosefalik ven arkasından toraksa girer ve trakeanın lateraline yaslanır. [[K5 s. 285]] Burada vagusu çaprazlayan azigos veni, siniri akciğer ve plevradan ayıran tek yapıdır. [[K5 s. 285]]</dd>
    <dt>Sol</dt><dd>Vagus sol karotis ile sol subklavyen arasından, sol brakiyosefalik venin arkasından toraksa girer. [[K5 s. 286]] Arkus aortayı frenik sinirden daha lateral ve posteriorda çaprazlar, iki sinirin arasında sol superior interkostal ven bulunur. [[K5 s. 286]] Rekürren dal arkın alt kenarında ayrılır. [[K5 s. 286]]</dd>
    <dt>Asimetri</dt><dd>Aort arkının ve dallarının gelişimi, boyun kökünde vagusun iki tarafta farklı komşuluklar kurmasını ve rekürren laringeal sinirlerin farklı seyrini açıklar. [[K5 s. 287]]</dd>
  </dl>
  <h3>Kalp ve akciğere ulaşan dallar</h3>
  <dl class="an06e-liste">
    <dt>Boyun dalları</dt><dd>Faringeal ve superior laringeal dallara, sağ rekürren laringeal sinir ve servikal kardiyak dallar eklenir. [[K5 s. 287]] Kardiyak dalların genellikle biri üst vagustan, diğeri boyun kökünden çıkar. [[K5 s. 288]]</dd>
    <dt>Derin kardiyak pleksus</dt><dd>Sağ servikal dallar subklavyenin arkasından trakea boyunca iner. [[K5 s. 288]] Solda dallar vagusla toraksa girer, üst dal trakeayı izleyerek derin pleksusa ulaşır. [[K5 s. 288]] Mediastende vagustan ve iki rekürren sinirden çıkan diğer kardiyak dalların tümü de derin pleksusa gider. [[K5 s. 289]]</dd>
    <dt>Yüzeyel kardiyak pleksus</dt><dd>Sol alt servikal kardiyak dal aort arkının önünden geçerek yüzeyel pleksusa katılır. [[K5 s. 288]]</dd>
    <dt>Pulmoner pleksuslar</dt><dd>Her vagus kendi akciğer kökünün arkasında dallanarak posterior pulmoner pleksusa katılır, dallar hilumdan akciğere girer. [[K5 s. 285–286]] Hilusun hemen üzerinden çıkan iki ya da üç ön dal anterior pleksusa, daha iri ve çok sayıdaki arka dallar posterior pleksusa gider. [[K5 s. 289]] İki pleksus da sempatik lifler içerir. [[K5 s. 289]]</dd>
    <dt>Diğer torasik dallar</dt><dd>Sol rekürren, kardiyak ve pulmoner dalların yanı sıra toraksta perikardiyal ve özofageal dallar çıkar. [[K5 s. 287–288]]</dd>
  </dl>
  <h3>Boyun kökünde aynı düzlemdeki yapılar</h3>
  <p>Kitabın boyun kökü görünümünde ortak karotis, subklavyen arter ve ven ile vertebral arter ayırt edilir. [[K5 s. 286]] Ön skalen, frenik sinir, brakiyal pleksus, plevra kubbesi ve torasik kanal da bu bölgenin işaretleridir. [[K5 s. 286]] Orta hatta trakea özofagusun, sternohiyoid de sternotiroidin önünde gösterilir. [[K5 s. 286]]</p>
</section>
<section class="wrap blk ders-sec" id="an06e-mide">
  <h2>X · Özofagus pleksuslarından mideye</h2>
  <p class="intro">Özofagus üzerinde sağ ve sol vagusun lifleri karışır. [[K5 s. 286]]</p>
  <div class="viz"><div class="viz-head"><h3>Kardiya ve küçük kurvaturda anterior vagus</h3></div><div data-viz="an06e_mide"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Özofagustan kardiyaya doğru inen ön trunkusu bulun. [[K5 s. 286–287]] Bu görünümde küçük kurvatura yönelen gastrik dalları, hepatik dalın ayrıldığı yerden ayırt edin. [[K5 s. 287]] Ön trunkusu izliyor olmanız, gördüğünüz bütün liflerin boyundaki sol vagustan geldiği anlamına gelmez. [[K5 s. 286]]</p>
  <h3>Pleksuslarda lifler nasıl yeniden toplanır?</h3>
  <dl class="an06e-liste">
    <dt>Arkada</dt><dd>Sağ posterior pulmoner pleksustan çıkan iki veya daha fazla kordon özofagusun arkasına ulaşır. [[K5 s. 286]] Sol vagustan katılan liflerle posterior özofageal pleksus, ardından iki tarafın liflerini içeren sağ vagal trunkus oluşur. [[K5 s. 286]]</dd>
    <dt>Önde</dt><dd>Sol posterior pulmoner pleksustan en az iki kordon özofagusun önüne iner. [[K5 s. 286]] Sağ vagustan ince dallar alan anterior özofageal pleksustan tek bir anterior trunkus çıkar. [[K5 s. 286]]</dd>
    <dt>Neden sol önde?</dt><dd>Küçük periton kesesi oluşurken midenin sol yan yüzü dönerek ön duvarı oluşturur. [[K5 s. 287]] Bu rotasyon sol vagusu öne, sağ vagusu arkaya taşır. [[K5 s. 287]]</dd>
  </dl>
  <h3>Hiatustan sonra</h3>
  <dl class="an06e-liste">
    <dt>Posterior trunkus</dt><dd>Diyaframın özofagus hiatusunda özofagusun sağında ve belirgin biçimde gerisindedir. [[K5 s. 286]] Mide gövdesinin üst kısmında her iki yüze dal verir. [[K5 s. 286]] Liflerin çoğu çölyak dalı oluşturur, sol gastrik arteri izleyerek çölyak gangliyonlara ulaşır. [[K5 s. 286]] Buradan bağırsaklar, ilişkili organlar, böbrekler ve adrenal bezlere dağılır. [[K5 s. 286]]</dd>
    <dt>Anterior trunkus</dt><dd>Hiatusta özofagusun ön yüzüne çok yakın geçer, kardiya ve küçük kurvatura dallar verir. [[K5 s. 286–287]] Büyük hepatik dalından çıkan pilorik dal (Latarjet siniri) pilorun üst kenarına ve antruma ulaşır. [[K5 s. 287]]</dd>
    <dt>Bağlantıları birleştirin</dt><dd>Kitap vagusun gövde ve gangliyon bağlantıları arasında IX, XI, XII, üst servikal sempatik gangliyon, C1 ve C2’yi sayar. [[K5 s. 289]] Auriküler dal VII ile, faringeal pleksus IX ve üst servikal gangliyonla bağlantılıdır. [[K5 s. 289]] Kardiyak, pulmoner, özofageal ve gastrik dallar iç organlara giden sempatik liflerle bağlantı kurar. [[K5 s. 289]]</dd>
  </dl>
</section>
<section class="wrap blk ders-sec" id="an06e-aksesuar">
  <h2>XI · Posterior üçgende aksesuar sinir</h2>
  <p class="intro">Posterior üçgen diseksiyonunda aksesuar sinirin kaybı, sternokleidomastoid ve trapez kaslarında pareziyle sonuçlanabilir. [[K5 s. 290]]</p>
  <div class="viz"><div class="viz-head"><h3>Tragustan trapeze yüzey anatomisi</h3></div><div data-viz="an06e_aksesuar"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Sarı siniri sternokleidomastoidin arka kenarında bulun ve trapezin altına girdiği yere kadar izleyin. [[K5 s. 290]] Yüzeydeki iki işaret farklı amaç taşır. [[K5 s. 290]] Tragus çizginin başlangıcını, klavikula ise trapezin ön kenarındaki bitiş noktasının yüksekliğini belirler. [[K5 s. 290]]</p>
  <h3>Kraniyal kök tartışması</h3>
  <dl class="an06e-liste">
    <dt>Klasik tarif</dt><dd>Oliva ile inferior serebellar pedinkül arasından çıkan medüller kökçüklerin spinal XI’e kısa süre katıldığı kabul edilirdi. [[K5 s. 289]] Bu tarife göre kraniyal lifler juguler foramende ayrılıp vagusla damak, farenks ve larinkse gider. [[K5 s. 289]]</dd>
    <dt>Diseksiyon bulgusu</dt><dd>Kitapta aktarılan çalışmada IX’a katılmayan medüller kökçüklerin tamamı foramende X’a katılmıştır. [[K5 s. 289]] XI kökçükleri olivanın kaudalinden çıkmış ve foramende XI–X bağlantısı gösterilememiştir. [[K5 s. 289]] Yazarlar bu bulguyla XI’i yalnız spinal kökten oluşan bir sinir olarak tanımlar. [[K5 s. 289]] Servikal kökenine rağmen kafatasındaki bir foramenden çıkması “kraniyal sinir” adını kullanmaya olanak verir. [[K5 s. 290]]</dd>
  </dl>
  <h3>Omurilikten trapeze</h3>
  <dl class="an06e-liste">
    <dt>Çıkış</dt><dd>Üst beş servikal segmentin ön boynuzundaki uzun çekirdekten çıkan lifler, ön ve arka köklerin tam ortasından omuriliği terk eder. [[K5 s. 289]] Birleşerek foramen magnumdan kafatasına yükselirler. [[K5 s. 289]] XI, yaklaşan vagus kökçükleriyle ortak dural kılıfta juguler foramene girer, IX ise önde ayrı kılıftadır. [[K5 s. 289]]</dd>
    <dt>Boyun</dt><dd>XI, internal juguler venin çoğunlukla yüzeyinden, daha seyrek derininden arkaya geçer. [[K5 s. 290]] Atlasın transvers çıkıntısını aşar, oksipital arter siniri çaprazlar. [[K5 s. 290]] Sternokleidomastoidi delerek inerve eder, posterior üçgeni geçer ve klavikulanın yaklaşık 5 cm üstünde trapezin derin yüzüne girer. [[K5 s. 290]]</dd>
    <dt>Yüzey çizgisi</dt><dd>Tragusu, klavikulanın 5 cm üstünde trapezin ön kenarına birleştirin. [[K5 s. 290]] Çizgi atlasın transvers çıkıntısını ve sternokleidomastoidin arka kenarında üst ve orta üçte birin birleşimini keser. [[K5 s. 290]]</dd>
    <dt>Lezyon</dt><dd>Spinal liflerin kesisi veya motor hücrelerinin lezyonu her iki kasta parezi yapar. [[K5 s. 290]] Kitap buna örnek olarak blok boyun lenf nodu diseksiyonunu verir; posterior üçgen temizlenirken sinir feda edilir. [[K5 s. 290]] Klasik “kraniyal kök” lezyonu seyrek izoledir, vagusla birlikte tutulumda farinks ve larinks parezisi disfaji ve disfoniye yol açar. [[K5 s. 290]]</dd>
  </dl>
</section>
<section class="wrap blk ders-sec" id="an06e-dil">
  <h2>XII · Dil kasları ve eşlik eden C1 lifleri</h2>
  <p class="intro">Hipoglossal sinir, palatoglossus dışında dilin tüm intrinsik ve ekstrinsik kaslarını inerve eder. [[K5 s. 290]]</p>
  <div class="viz"><div class="viz-head"><h3>Ağız tabanında hipoglossal sinir</h3></div><div data-viz="an06e_dil"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Sarı siniri kas liflerinin yön değiştirdiği yerde izleyin. Hiyoglossus üzerinde görülen XII öne, genioglossusa doğru ilerler. [[K5 s. 290]] Dil dışarı çıkarıldığında sapmanın yönünü yorumlarken kas hacmini de karşılaştırın. [[K5 s. 291]] Çekirdek ya da sinir lezyonunda atrofi beklenir, supranükleer lezyonda karşı taraf paretiktir ve atrofi gelişmez. [[K5 s. 291]]</p>
  <h3>Medulladan ağız tabanına</h3>
  <dl class="an06e-liste">
    <dt>Çekirdek ve kanal</dt><dd>Somatik efferent çekirdek dördüncü ventrikül tabanındadır. [[K5 s. 290]] Yaklaşık bir düzine kökçük medullada piramit ile oliva arasından çıkar, birleşip hipoglossal kanaldan (anterior kondiler kanal) geçer. [[K5 s. 290]]</dd>
    <dt>Karotisler</dt><dd>XII önce internal karotis ve juguler venin derinindedir, sonra aralarından mandibula açısının hemen üstüne iner. [[K5 s. 290]] İki karotis arterinin üzerinden öne geçer, lingual arterin kıvrımını çaprazlar. [[K5 s. 290]]</dd>
    <dt>Dil kökü</dt><dd>Hiyoglossus üzerinde öne ve yukarı ilerlerken digastrik tendon, stilohiyoid ve milohiyoidin derininden geçer. [[K5 s. 290]] Burada submandibular bezin derin yüzüne komşudur, sonra submandibular kanal ile lingual sinirin altında yer alır. [[K5 s. 290]] Genioglossus üzerine geçerek dil kaslarına dağılır. [[K5 s. 290]]</dd>
  </dl>
  <h3>XII ile taşınan servikal lifler</h3>
  <dl class="an06e-liste">
    <dt>Atlas düzeyi</dt><dd>C1 ön primer dalı XII’ye katılır. [[K5 s. 290]] Bu liflerin çoğu, XII internal karotisi çaprazlarken ayrılan desendens hipoglossiye geçer. [[K5 s. 290–291]]</dd>
    <dt>Ansa hipoglossi</dt><dd>Desendens hipoglossi karotis kılıfı üzerinde iner, C2–C3 kökenli desendens servikalisle birleşerek halkayı oluşturur. [[K5 s. 291]] Halkadan omohiyoid, sternotiroid ve sternohiyoide dallar gider. [[K5 s. 291]]</dd>
    <dt>Ayrı hedefler</dt><dd>Diğer C1 lifleri XII ile tirohiyoid ve geniohiyoide ulaşır. [[K5 s. 291]]</dd>
  </dl>
  <h3>Dili dışarı çıkarma muayenesi</h3>
  <dl class="an06e-liste">
    <dt>Çekirdek veya sinir</dt><dd>Kesi karotis endarterektomisinde istemeden de olabilir. Aynı tarafta paralizi ve atrofi gelişir, dışarı çıkarılan dil lezyon tarafına sapar. [[K5 s. 291]]</dd>
    <dt>Supranükleer</dt><dd>Kortikobulber yol tutulduğunda karşı dil yarısında atrofi olmadan parezi gelişir. [[K5 s. 291]]</dd>
  </dl>
  <p>Kitabın distal seyir görünümünde hiyoglossus ve genioglossusa ek olarak stiloglossus, stilohiyoid ve geniohiyoid de seçilir. [[K5 s. 291]] Lingual arter ile internal juguler ven damar işaretlerini, desendens hipoglossi ve tirohiyoide giden dal ise servikal liflerin yollarını gösterir. [[K5 s. 291]]</p>
</section>
<section class="wrap blk ders-sec" id="an06e-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önermeyi ayrı yanıtlayın, ardından gerekçenizi kaynak sayfasıyla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="an06e-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an06e-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an06e-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an06e-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Glossofaringeal nevralji için tek taraflı blok yapılan bir hastada disfoni ve taşikardi gelişiyor. Hedef sinirin seyrini kullanarak bu iki bulguyu nasıl açıklarsınız?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>IX juguler foramende ayrı kılıftadır, hemen arkasında ortak kılıfta X ve XI bulunur. [[K5 s. 285]]</li>
    <li>Hedef, IX’un foramenden çıkışı ile stiloidin derinine dönüşü arasındadır. [[K5 s. 283]]</li>
    <li>Yüzeyde mastoid çıkıntı ve mandibula açısını, derinde stiloid çıkıntıyı gösterin. [[K5 s. 283]]</li>
    <li>Komşu X’a yayılan anestezik disfoni ve taşikardiyi açıklayabilir. [[K5 s. 283]] Vagus larinkse motor, kalbe yavaşlatıcı lifler taşır. [[K5 s. 284]]</li>
    <li>XI ve XII de etkilenebilir, sternokleidomastoid ve trapez güçsüzlüğü seyrektir. [[K5 s. 283]] Kitap iki taraflı bloğu kesin olarak dışlar. [[K5 s. 283]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Juguler foramende önden arkaya inferior petrozal sinüsü, IX’u, X’u, XI’i ve internal juguler veni yerleştirin. [[K5 s. 285]] Ayrı ve ortak dural kılıfları gösterin. [[K5 s. 285]]</div>
  <div class="note plain"><b>Ek sorular</b><ul><li>Karotis sinüsü ile cisimciğinin afferent yolu ve uyaranları nelerdir? [[K5 s. 282–283]]</li><li>Sağ ve sol rekürren dalları hangi damarların altında ararsınız? [[K5 s. 285–286]]</li><li>Boyun diseksiyonu sonrası XI hasarını ve XII çekirdek lezyonunu kas bulgularıyla nasıl ayırırsınız? [[K5 s. 290–291]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="an06e-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>IX, dil kökünün genel duyusu ve tadını, stilofaringeusun motor ve parotisin sekretomotor innervasyonunu taşır. [[K5 s. 281]]</li>
    <li>X’un rekürren dalı sağda subklavyen arterin, solda aort arkının alt kenarında ayrılır. [[K5 s. 285–286]]</li>
    <li>Özofageal pleksuslarda lifler karışır, bu yüzden hem anterior hem posterior trunkus iki vagustan da lif taşır. [[K5 s. 286–287]]</li>
    <li>Posterior üçgende XI’in kesilmesi sternokleidomastoid ve trapezi zayıflatır. [[K5 s. 290]]</li>
    <li>XII çekirdeği veya siniri hasarlandığında dil dışarı çıkarılırken atrofik tarafa sapar. [[K5 s. 291]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="06e"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/06d">← Abdusens, fasiyal ve vestibülokoklear sinirler</a><a href="#/dersler/anatomi/07a">Sonraki: Toraks girişi ve antekübital fossa →</a></nav>
</section>`,
};
