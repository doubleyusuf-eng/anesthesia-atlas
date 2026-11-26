VERI.sorular = VERI.sorular || {};
VERI.sorular['an07a-1'] = {
  no: 1, kok: 'Toraks girişinin kemik sınırları ve komşulukları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 295–297]]',
  onermeler: [
    {t:'Açıklığın ön-arka çapı transvers çapından büyüktür.', d:false, n:'Transvers çap yaklaşık 10 cm, ön-arka çap 5 cm’dir. [[K5 s. 295]]'},
    {t:'Manubriumun üst kenarı T2–T3 diski hizasındadır.', d:true, n:'Bu kenarın düzeyi sakin solunumda çok az değişir. [[K5 s. 295]]'},
    {t:'Subklavyen ven skalen tüberkülün arkasındaki oluktadır.', d:false, n:'Ven tüberkülün hemen önündeki oluğu kullanır. [[K5 s. 295–296]]'},
    {t:'Sibson fasyası C7 transvers çıkıntısından birinci kostaya uzanır.', d:true, n:'Fasya kostanın iç kenarına tutunarak servikal plevrayı örter. [[K5 s. 296]]'},
    {t:'Tam servikal kosta genellikle pleksusa bası yapar.', d:false, n:'Pleksus çoğu kez prefiksedir ve ek kostadan uzakta seyreder, bu nedenle bası nadirdir. [[K5 s. 297]]'}
  ]
};
VERI.sorular['an07a-2'] = {
  no: 2, kok:'Antekübital fossada yüzeyden derine', kagit:'Paper A · Anatomi', kaynak:'[[K5 s. 298–302]]',
  onermeler:[
    {t:'Brakiyoradialis fossanın inferolateral sınırıdır.', d:true, n:'Karşısındaki inferomedial sınırı pronator teres oluşturur. [[K5 s. 298]]'},
    {t:'Medyan sinir brakiyal arterin medialindedir.', d:true, n:'Medialden laterale önce medyan sinir, sonra brakiyal arter görülür. [[K5 s. 298]]'},
    {t:'Medyan kübital ven bisipital aponevrozun derinindedir.', d:false, n:'Ven yüzeyeldir ve aponevroz onu brakiyal arterden ayırır. [[K5 s. 298]] [[K5 s. 302]]'},
    {t:'Medial kutanöz sinir medyan kübital veni bazen derininden çaprazlar.', d:true, n:'Sinir çoğunlukla yüzeyelden çaprazlar ve ven ponksiyonunda yaralanabilir. [[K5 s. 298]]'},
    {t:'M örüntüsünde ikiye ayrılan damar sefalik vendir.', d:false, n:'Fossanın hemen distalinde medyan önkol veni iki dala ayrılır. [[K5 s. 302]]'}
  ]
};
VERI.sorular['an07a-3'] = {
  no:3, kok:'Damar erişimini etkileyen anatomik özellikler', kagit:'Paper A · Anatomi', kaynak:'[[K5 s. 300–303]]',
  onermeler:[
    {t:'Yüzeyel ulnar arter her zaman derin fasyanın altında kalır.', d:false, n:'Dirsekte veya proksimal önkolda deri altına çıkabilir. [[K5 s. 302]]'},
    {t:'Yüzeyel radial arter olguların yaklaşık %2’sinde görülür.', d:false, n:'Yüzeyel radial arter için oran %14, yüzeyel ulnar arter için %2’dir. [[K5 s. 302]]'},
    {t:'Yüzeyel ulnar arter varlığında ortak interosseöz arter genellikle radial arterden çıkar.', d:true, n:'Bu köken, yüzeyel ulnar artere yapılan enjeksiyonda önkol kaslarının ana kan kaynağının korunabilmesini açıklar. [[K5 s. 302–303]]'},
    {t:'Sefalik ven brakiyal arterin eşlikçi venleriyle birleşerek aksiller veni oluşturur.', d:false, n:'Eşlikçi venlerle birleşen damar bazilik vendir, sefalik ven aksiller vene açılır. [[K5 s. 300]]'},
    {t:'Arter kanülasyonu için tercihen uç arter seçilir.', d:false, n:'İdeal seçim, beslediği dokuda yeterli kollateral akım gösterilebilen bir arterdir. [[K5 s. 303]]'}
  ]
};

const AN07A_SEKILLER = (() => {
  const sekiller = {};
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  function gorunum(dosya, ad, boy, noktalar, kirp) {
    return { ad, resim: 'img/anatomi/07a-' + dosya + '.webp', en: 1024, boy, noktalar, kirp };
  }

  sekiller.giris = {
    baslik: 'Toraks girişinin kemik sınırları',
    giris: 'Arkada T1 gövdesinden başlayıp iki yandaki kostaları önde manubriuma kadar izleyin. [[K5 s. 295]]',
    gorunumler: [gorunum('giris', 'Üstten', 683, [
      nokta(510, 249, 'T1 gövdesi', 'Gövdenin öne doğru kabarıklığı açıklığın arka kenarını içeri çeker. [[K5 s. 295]]'),
      nokta(905, 305, 'Birinci kosta', 'İki birinci kosta ve bunların kıkırdakları girişin yan sınırlarını oluşturur. [[K5 s. 295]]'),
      nokta(304, 557, 'Kostal kıkırdak', 'Birinci kostanın kıkırdağı ön tarafta kemik sınırı manubriuma kadar tamamlar. [[K5 s. 295]]'),
      nokta(522, 545, 'Manubriumun üst kenarı', 'Ön sınır arka sınırdan 4 cm aşağıdadır ve T2–T3 diskine karşılık gelir. [[K5 s. 295]]')
    ])]
  };

  sekiller.servikal = {
    baslik: 'Rudimenter servikal kosta ve fibröz devamı',
    giris: 'Kısa kemik çıkıntının ucundan birinci kostaya uzanan bandı ve üzerinden geçen pleksusu izleyin. [[K5 s. 297]]',
    gorunumler: [gorunum('servikal', 'Boyun kökü', 683, [
      nokta(363, 294, 'Kostal çıkıntı', 'En sık biçimde C7’nin büyümüş kostal çıkıntısının devamını fibröz bir bant oluşturur. [[K5 s. 297]]'),
      nokta(482, 345, 'Fibröz bant', 'Bant skalen tüberkülün hemen ötesinde birinci kostaya ulaşır ve pleksusun alt bölümünü sıkıştırabilir. [[K5 s. 297]]'),
      nokta(602, 379, 'Brakiyal pleksus', 'Bandın üzerindeki bası önkol ve elin ulnar kenarında paresteziye, küçük el kaslarında güçsüzlük ve atrofiye neden olabilir. [[K5 s. 297]]'),
      nokta(409, 556, 'Birinci kosta', 'İç kenarı supraplevral membranın tutunma yeridir. [[K5 s. 296]]'),
      nokta(395, 471, 'Plevra kubbesi', 'Klavikulanın medial üçte birinin yaklaşık 4 cm üzerine çıkan apeks, brakiyal pleksus bloğunda ve subklavyen ven kanülasyonunda delinebilir. [[K5 s. 296]]')
    ])]
  };

  sekiller.fossa = {
    baslik: 'Sağ antekübital fossanın derin yapıları',
    giris: 'Resmin sağından soluna doğru medyan siniri, arteri, tendonu ve radial siniri sıralayın. [[K5 s. 298]]',
    gorunumler: [gorunum('fossa', 'Önden', 1536, [
      nokta(698, 438, 'Medyan sinir', 'Kas duvarları aralandığında dört derin yapı içinde en medialde görülür. [[K5 s. 298]]'),
      nokta(604, 578, 'Brakiyal arter', 'Medyan sinirin lateralinde, biseps tendonunun medialinde seyreder ve radius boynu düzeyinde iki terminal dal verir. [[K5 s. 298]]'),
      nokta(434, 699, 'Biseps tendonu', 'Tendonun bir yanında brakiyal arter, diğer yanında radial sinir vardır. [[K5 s. 298]]'),
      nokta(218, 661, 'Radial sinir', 'En lateraldeki derin yapıdır ve posterior interosseöz dalını verir. [[K5 s. 298]]'),
      nokta(162, 996, 'Brakiyoradialis', 'Fossanın inferolateral sınırını oluşturur. [[K5 s. 298]]'),
      nokta(731, 1128, 'Pronator teres', 'Üçgenin inferomedial sınırını oluşturur. [[K5 s. 298]]')
    ])]
  };

  sekiller.ven = {
    baslik: 'Dirseğin yüzeyel venleri',
    giris: 'Önkolun ortasındaki veni yukarı doğru izleyerek iki örüntüyü ayırt edin. [[K5 s. 301–302]]',
    gorunumler: [
      gorunum('ven', 'Eğik H', 683, [
        nokta(146, 311, 'Sefalik ven', 'Lateral epikondilin yaklaşık 2,5 cm distalinde genellikle medyan kübital veni verir. [[K5 s. 301]]'),
        nokta(253, 337, 'Medyan kübital ven', 'Sefalik ve bazilik venler arasında yukarı ve mediale yönelen bağlantıdır. [[K5 s. 301]]'),
        nokta(357, 174, 'Bazilik ven', 'Medyan kübital ven buna dirsek kıvrımının yaklaşık 2,5 cm üzerinde katılır. [[K5 s. 301]]')
      ], [0, 0, 500, 683]),
      gorunum('ven', 'M varyasyonu', 683, [
        nokta(753, 506, 'Medyan önkol veni', 'Dirseğin hemen distalinde ikiye ayrılan bu damar M biçiminin merkezindedir. [[K5 s. 302]]'),
        nokta(697, 399, 'Sefalik vene giden dal', 'Ayrılan dallardan biri önkolun lateralindeki sefalik vene ulaşır. [[K5 s. 300]] [[K5 s. 302]]'),
        nokta(810, 394, 'Bazilik vene giden dal', 'Diğer dal önkolun ulnar tarafını drene eden bazilik vene katılır. [[K5 s. 300]] [[K5 s. 302]]')
      ], [512, 0, 512, 683])
    ]
  };

  sekiller.arter = {
    baslik: 'Dirsekte ven ile arteri ayıran aponevroz',
    giris: 'Derindeki brakiyal arterle yüzeyel venin arasındaki yelpaze biçimli aponevrozu bulun. [[K5 s. 302]]',
    gorunumler: [gorunum('arter', 'Önden', 1121, [
      nokta(451, 636, 'Medyan kübital ven', 'Ven bisipital aponevrozla güçlenen fasyal tavanın üzerinde seyreder. [[K5 s. 298]]'),
      nokta(598, 693, 'Bisipital aponevroz', 'Distal biseps ve tendonundan aşağı ve mediale açılarak fleksör başlangıçlarını örten derin fasyaya karışır. [[K5 s. 302]]'),
      nokta(561, 410, 'Brakiyal arter', 'Aponevrozun altına giren arteri yüzeyel venden ayıran bu tabaka kan alma sırasında kalkan görevi görür. [[K5 s. 302]]'),
      nokta(462, 455, 'Biseps tendonu', 'Aponevrozun başlangıcına tendon da katılır. [[K5 s. 302]]')
    ])]
  };

  sekiller.kosta = {
    baslik: 'Birinci kostanın üst yüzünde önden arkaya sıra',
    giris: 'Yakın görünümde soldaki venden başlayarak venle arteri ayıran tendonun kemiğe ulaştığı yeri bulun. [[K5 s. 295–296]]',
    gorunumler: [gorunum('kosta', 'Üst yüz ayrıntısı', 683, [
      nokta(124, 405, 'Subklavyen ven', 'Ön skalen tendonunun hemen önündeki olukta kemiği çaprazlar. [[K5 s. 295–296]]'),
      nokta(275, 301, 'Ön skalen tendonu', 'Kasın tendonu birinci kostanın iç kenarındaki skalen tüberküle tutunur. [[K5 s. 295]]'),
      nokta(412, 413, 'Subklavyen arter', 'Tüberkülün arkasındaki olukta yer alır ve kostayı pleksusun hemen önünde çaprazlar. [[K5 s. 296]] [[K5 s. 298]]'),
      nokta(589, 378, 'Pleksusun alt trunkusu', 'C8 ve T1 liflerini taşıyan alt trunkus arterle aynı oluktadır. [[K5 s. 296]]'),
      nokta(845, 214, 'Orta skalen', 'Tutunma alanı arter ile alt trunkusun paylaştığı oluğun hemen arkasındadır. [[K5 s. 296]]')
    ])]
  };
  return sekiller;
})();

function an07aResimAnahtari(id) {
  const gorunumler = AN07A_SEKILLER[id].gorunumler;
  const listeler = gorunumler.map(g => {
    const ad = gorunumler.length > 1 ? '<h4>' + g.ad + '</h4>' : '';
    const maddeler = g.noktalar.map(n => '<li><b>' + n.ad + '.</b> ' + n.metin + '</li>').join('');
    return ad + '<ol>' + maddeler + '</ol>';
  });
  return '<details class="an07a-ayrinti"><summary>Resmi metinle oku</summary>' + listeler.join('') + '</details>';
}

SAYFALAR['dersler/anatomi/07a'] = {
  sekiller: AN07A_SEKILLER,
  grup:'dersler', eyebrow:'Anatomi · Bölüm 7 · Ders 07a', baslik:'Toraks girişi ve antekübital fossa',
  lede:'Supraklaviküler bölgede pleksusun plevraya yakınlığı ve dirsekte venin altındaki aponevroz girişim riskini nasıl etkiler? [[K5 s. 296]] [[K5 s. 302]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${[['giris','Toraks girişi'],['kosta','Birinci kosta'],['servikal','Servikal kosta'],['fossa','Dirsek önü'],['ven','Venler'],['arter','Arterler'],['p1','Part I'],['p2','Part II'],['ozet','Özet']].map(([id,ad])=>'<button type="button" data-scroll="an07a-'+id+'">'+ad+'</button>').join('')}</nav>
<section class="wrap blk ders-sec" id="an07a-giris">
<h2>Toraks girişinin sınırları</h2>
<p class="intro">T1 gövdesi arkadan açıklığa doğru çıkıntı yapar ve toraks girişine böbrek biçimini verir. [[K5 s. 295]]</p>
<div class="viz"><div class="viz-head"><h3>Üstten bakışta kemik halka</h3></div><div data-viz="an07a_giris"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Girişin iki kenarı aynı yükseklikte değildir. [[K5 s. 295]] Üstten görünümde enine ve ön-arka çapları, yandan düşünürken T1 gövdesi ile manubrium arasındaki yükseklik farkını karşılaştırın. [[K5 s. 295]]</p></div>
${an07aResimAnahtari('giris')}
<ul class="ozet">
<li><b>Sınırlar.</b> Arkada T1 gövdesini, yanlarda birinci kostaları ve kıkırdaklarını izleyince önde manubriumun üst kenarına ulaşılır. [[K5 s. 295]]</li>
<li><b>Boyut ve eğim.</b> Açıklık enine yaklaşık 10 cm, ön-arka yönde 5 cm’dir. [[K5 s. 295]] Düzlemi öne doğru alçalır, yatayla yaklaşık 60° açı yapar ve ön kenar arkadakinden 4 cm aşağıda kalır. [[K5 s. 295]]</li>
<li><b>Solunum.</b> Manubriumun üst kenarı T2–T3 diski hizasında olup sakin solunumda hemen hemen sabittir. [[K5 s. 295]] Zorlu inspirasyon ve ekspirasyonda her iki yönde yaklaşık bir vertebra gövdesi yüksekliği kadar yer değiştirebilir. [[K5 s. 295]]</li>
</ul>
<div class="an07a-kartlar"><div><h3>Bu dar açıklıktan neler geçer?</h3>
<p>Akciğer apeksleri, trakea ve özofagus burada brakiyosefalik arter ve venlerle, sol ortak karotid ve sol subklavyen arterlerle komşudur. [[K5 s. 295]] Vaguslar, servikal sempatik zincirler, frenik sinirler ve torasik kanal da girişten geçer. [[K5 s. 295]]</p></div>
<div><h3>Boyun kökünde hangi girişimler yapılır?</h3><p>İki yanda, girişin arkasında brakiyal pleksus ön ve orta skalen kaslar arasındadır. [[K5 s. 295]] Pleksus ve stellat gangliyon blokları ile internal veya eksternal juguler ven kanülasyonu bu bölgenin komşuluklarını bilmeyi gerektirir. [[K5 s. 295]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="an07a-kosta">
<h2>Birinci kostada önden arkaya</h2>
<p class="intro">Ön skalen tendonunun iç kenara tutunduğu skalen tüberkül, üst yüzdeki ven oluğu ile arter oluğunu birbirinden ayırır. [[K5 s. 295–296]]</p>
<div class="viz"><div class="viz-head"><h3>Kostayı çaprazlayan yapılar</h3></div><div data-viz="an07a_kosta"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kasların kemiğe tutunduğu yerleri ve aralarından geçen damar ile siniri ayırt edin. [[K5 s. 295–296]] Arter nabzı bu bölgede pleksusun önünde hissedilir. [[K5 s. 298]]</p></div>
${an07aResimAnahtari('kosta')}
<ul class="ozet">
<li><b>Kemiği tanıyın.</b> En kısa, en yassı ve en kıvrımlı kosta budur, üst ve alt yüzleri geniş, iç ve dış kenarları keskindir. [[K5 s. 295]] Yuvarlak başındaki tek faset T1 gövdesiyle, uzun boynun ucundaki belirgin tüberkül ise T1 transvers çıkıntısıyla eklemleşir. [[K5 s. 295]]</li>
<li><b>Boynu medialden laterale okuyun.</b> Sempatik trunkusu, kostoservikal trunkustan çıkan superior interkostal arteri ve T1 ön primer dalının pleksusa katılan büyük dalını sırasıyla bulun. [[K5 s. 295]]</li>
<li><b>Üst yüz.</b> Tüberkülün hemen önündeki olukta subklavyen ven, girişin eğimi nedeniyle klavikulanın belirgin biçimde altında ve arkasında kalır. [[K5 s. 295–296]] Arkadaki oluğu subklavyen arter ile alt trunkus (C8, T1) paylaşır, hemen arkalarına orta skalen tutunur. [[K5 s. 296]] Postfikse pleksusta T2 katkısı büyük olduğunda arka oluk özellikle belirgindir. [[K5 s. 296]]</li>
<li><b>Diğer tutunmalar.</b> Subklavius üst yüzün ön ucundan klavikulanın altına uzanır. [[K5 s. 297]] Serratus anterior ve ilk aralıktaki interkostal kaslar lateral kenara tutunur, alt yüz servikal plevraya bakar. [[K5 s. 297]]</li>
<li><b>Plevrayı örten çadır.</b> Sağlam supraplevral membran (Sibson fasyası) C7 transvers çıkıntısından birinci kostanın iç kenarına gerilir. [[K5 s. 296]] Plevra apeksi klavikulanın medial üçte birini yaklaşık 4 cm aşar ve pleksus bloğunda ya da subklavyen ven kanülasyonunda delinebilir. [[K5 s. 296]]</li>
</ul>
</section>

<section class="wrap blk ders-sec" id="an07a-servikal">
<h2>Servikal kosta ve supraklaviküler yüzey işaretleri</h2>
<p class="intro">Yaklaşık %0,5 sıklıktaki servikal kosta çoğunlukla sessizdir, ancak kemiğin veya fibröz uzantısının üzerinden geçen sinir ve damarlar basıya uğrayabilir. [[K5 s. 297]]</p>
<div class="viz"><div class="viz-head"><h3>Kısa kosta, fibröz bant ve pleksus</h3></div><div data-viz="an07a_servikal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kısa kemik çıkıntı sonlandığında bandı izlemeyi sürdürün. [[K5 s. 297]] Sinir basısını açıklayan bölüm bu fibröz devam olabilir. [[K5 s. 297]]</p></div>
${an07aResimAnahtari('servikal')}
<ol class="ozet">
<li><b>En sık biçim.</b> C7’nin uzamış kostal çıkıntısı fibröz bantla devam eder ve birinci kostaya skalen tüberkülün hemen ötesinde ulaşır. [[K5 s. 297]]</li>
<li><b>Gerçek servikal kosta.</b> Fasetleriyle C7 gövdesine ve transvers çıkıntısına eklemleşir, birinci kostaya fibröz bağlantıyla tutunur. [[K5 s. 297]]</li>
<li><b>Tam servikal kosta.</b> Birinci kostanın ön bölümüyle eklemleşebilir veya kaynaşabilir ve skalen kasların tutunma yeri olur. [[K5 s. 297]]</li>
</ol>
<div class="an07a-kartlar"><div><h3>Sinir basısının dağılımı</h3><p>Tam servikal kostada pleksus sıklıkla prefiksedir (başlıca C4–C8) ve kemikten uzakta kaldığından bası nadirdir. [[K5 s. 297]] Postfikse pleksus (C6–T2) ise birinci torakal kostanın rudimenter kalıp yerini fibröz banda bırakmasına eşlik edebilir. [[K5 s. 297]]</p>
<p>Normal pleksusun alt kordu eksik servikal kostanın bandı üzerinde sıkışabilir. [[K5 s. 297]] Önkol ve elin ulnar kenarında C8–T1 parestezisi, özellikle tenarda olmak üzere elin küçük kaslarında güçsüzlük ve atrofi görülebilir. [[K5 s. 297]]</p></div>
<div><h3>Damar basısının sonucu</h3><p>Tam kostayı aşan subklavyen arter supraklaviküler fossada belirginleşip anevrizma sanılabilir. [[K5 s. 297]] Darlığın ilerisinde genişleme ve tromboz, ardından emboliler gelişebilir. [[K5 s. 297]] Kolda soğukluk, siyanoz, nabız kaybı ve kladikasyona parmak gangreni eklenebilir. [[K5 s. 297]]</p></div></div>
<h3>Pleksus yüzeyden nasıl bulunur?</h3>
<p>Subklavyen perivasküler ve Kulenkampff supraklaviküler yaklaşımlarında trunkuslar deriyle birinci kosta arasında en küçük hacimde toplanır, zayıf kişilerde parmak altında yuvarlanabilir. [[K5 s. 297]] Görece az lokal anestezik tüm kol için yeterli olabilir, ancak subklavyen arter, ven ve plevra yakındır. [[K5 s. 297–298]] Pleksus bloğunun ayrıntısı kitabın s. 171’indedir. [[K5 s. 298]]</p>
<p>Kosta çoğu kişide palpe edilemez. [[K5 s. 298]] Klavikula orta noktasının hemen üstü ve subklavyen nabzı hisseden parmağın hemen laterali aynı bölgeyi gösterir. [[K5 s. 298]] Arter skalenler arasından çıkarak kostayı pleksusun hemen önünde çaprazlar. [[K5 s. 298]]</p>
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=supraklavikuler">Sinir Bloğu Atlası · Supraklaviküler blok</a>
</section>

<section class="wrap blk ders-sec" id="an07a-fossa">
<h2>Antekübital fossa: sınırlar, tavan ve derin içerik</h2>
<p class="intro">Dirseğin önündeki üçgen, damar ve sinirlerin önkola geçiş yeridir. [[K5 s. 298]]</p>
<div class="viz"><div class="viz-head"><h3>Sağ dirsekte derin diseksiyon</h3></div><div data-viz="an07a_fossa"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Önce iki kas kenarını bulun, ardından biseps tendonunu işaretleyin. [[K5 s. 298]] Tendonu referans aldığınızda radial sinir ile brakiyal arterin karşı taraflarda kaldığını görebilirsiniz. [[K5 s. 298]]</p></div>
${an07aResimAnahtari('fossa')}
<ul class="ozet">
<li><b>Üç sınır.</b> Taban iki humerus epikondilini birleştiren çizgidir, inferomedial kenarı pronator teres, inferolateral kenarı brakiyoradialis çizer. [[K5 s. 298]]</li>
<li><b>Tavan.</b> Bisipital aponevrozun desteklediği derin fasya üzerinde medyan kübital ven bulunur. [[K5 s. 298]] Önkolun medial kutanöz siniri bu veni çoğunlukla yüzeyelden, bazen derinden çaprazlar ve ponksiyonda zedelenebilir. [[K5 s. 298]] Lateralde sefalik venle önkolun lateral kutanöz siniri, medialde bazilik ven seyreder. [[K5 s. 298]]</li>
<li><b>Kas duvarları aralandığında.</b> Medialden laterale sıra medyan sinir, brakiyal arter, biseps tendonu, radial sinirdir. [[K5 s. 298]] Brakiyal arter radius boynunda radial ve ulnar dallara ayrılır, radial sinir posterior interosseöz dalını verir. [[K5 s. 298]]</li>
<li><b>Klinik kullanım.</b> Dirsek travması brakiyal arteri tehlikeye sokabilir. [[K5 s. 298]] Burada yüzeyel ven aranması, arter kanülasyonu ve önkola giden dört sinirin bloğu mümkündür, ven girişiminde yanlışlıkla arter veya sinir içine enjeksiyon riski vardır. [[K5 s. 298]]</li>
</ul>
<details class="an07a-ayrinti"><summary>Derin diseksiyon ve apeks kesitinde başka hangi yapılar seçilir?</summary>
<p>Diseksiyonda biseps ve brakiyalis, medialde ortak fleksör başlangıcı ve ulnar sinir de izlenir. [[K5 s. 299]]</p>
<p>Apeksin enine kesitinde radius ve ulna çevresinde supinatör, pronator teres, brakiyoradialis, biseps tendonu, medyan ve ulnar sinirler, posterior interosseöz sinir ile radial ve ulnar arterler görülür. [[K5 s. 300]]</p>
<p>Kesitte ayrıca el bileğinin radial ve ulnar fleksörleri, yüzeyel ve derin parmak fleksörleri, uzun radial el bileği ekstansörü, ulnar el bileği ekstansörü ve parmak ekstansörü seçilir. [[K5 s. 300]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an07a-ven">
<h2>Dirsek önündeki yüzeyel venler</h2>
<p class="intro">Sefalik ve bazilik venler arasında eğik bir bağlantı H görünümü verirken, medyan önkol veninin ikiye ayrılması M örüntüsünü oluşturabilir. [[K5 s. 301–302]]</p>
<div class="viz"><div class="viz-head"><h3>H ve M örüntülerini karşılaştırın</h3></div><div data-viz="an07a_ven"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Dirsek önündeki bir venin adını belirlerken hangi damardan ayrıldığını ve nereye katıldığını izleyin. [[K5 s. 301–302]] İki görünümde de dıştaki damar sefalik, içteki damar bazilik vendir. [[K5 s. 299–301]]</p></div>
${an07aResimAnahtari('ven')}
<div class="an07a-kartlar"><div><h3>Sefalik ven · radial taraftan aksillaya</h3>
<p>Önkolun radial yanından kan toplayarak fossanın lateralinden yükselir, bisepsin lateral oluğunu izler. [[K5 s. 300]] Pektoralis majörün alt kenarında derin fasya altına geçer, deltopektoral olukta ilerler, klavipektoral fasyayı delip aksiller vene açılır. [[K5 s. 300]]</p>
<p>Deltopektoral oluk, superior vena kava yoluyla infüzyon için venin cerrahi olarak açığa çıkarılabileceği, kolay seçilen bir yerdir. [[K5 s. 300]] Fasyadan geçişteki keskin dönüş ve birleşimde sıklıkla bulunan kapak, kateterin aksiller vene ve superior vena kavaya ilerlemesini çoğu kez engeller. [[K5 s. 300]] Sağ sefalik yoldan başarı oranının daha yüksek olduğu bildirilmiştir. [[K5 s. 300]]</p></div>
<div><h3>Bazilik ven · ulnar taraftan aksillaya</h3><p>Önkolun ulnar yanını drene eder, bisepsin medialinden yükselir ve kol ortasında derin fasyayı deler. [[K5 s. 300]] Aksillanın alt kenarında brakiyal arterin eşlikçi venleriyle birleşerek aksiller veni oluşturur. [[K5 s. 300]]</p></div></div>
<ul class="ozet">
<li><b>H bağlantısı.</b> Medyan kübital ven (medyan bazilik veya medyan sefalik ven) genellikle lateral epikondilin yaklaşık 2,5 cm distalinde sefalik venden ayrılır. [[K5 s. 301]] Yukarı ve mediale yönelerek dirsek kıvrımının 2,5 cm üzerinde bazilik vene katılır. [[K5 s. 301]]</li>
<li><b>Derin bağlantı.</b> Önkolun ön yüzünden çok sayıda yan dal alan medyan kübital ven, fasyal tavanı delip brakiyal arterin eşlikçi venlerine açılan derin medyan veni verir. [[K5 s. 302]]</li>
<li><b>M varyasyonu.</b> Fossanın hemen distalinde medyan önkol veninden ayrılan iki dalın biri sefalik, diğeri bazilik vene gider. [[K5 s. 302]]</li>
</ul></section>

<section class="wrap blk ders-sec" id="an07a-arter">
<h2>Bisipital aponevroz ve arter varyasyonları</h2>
<p class="intro">Bisipital aponevroz normalde medyan kübital veni brakiyal arterden ayırır, fakat deri altından geçen yüzeyel ulnar arter bu korumanın dışında kalır. [[K5 s. 302]]</p>
<div class="viz"><div class="viz-head"><h3>Ven, aponevroz ve arterin katmanları</h3></div><div data-viz="an07a_arter"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Önkol fleksiyonda ve supinasyondayken ele gelen aponevroz kenarını, yüzeyel ven ve derindeki arterle birlikte okuyun. [[K5 s. 302]]</p></div>
${an07aResimAnahtari('arter')}
<p>Yassı aponevroz distal bisepsin medial kenarından ve tendonundan çıkar, aşağı ve mediale açılarak önkol fleksörlerinin başlangıcını örten derin fasyaya karışır. [[K5 s. 302]] Hafif kalın üst kenarı önkol fleksiyon ve supinasyondayken kolay palpe edilir. [[K5 s. 302]] Dirsek venlerinden kan alan berber-cerrahlar, alttaki arteri koruyan bu tabakaya <i>grâce à Dieu</i> (“Tanrı’ya şükür”) fasyası derdi. [[K5 s. 302]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Üst kolda ayrılan damar</th><th scope="col">Seyir ve klinik anlam</th></tr></thead><tbody>
<tr><th scope="row">Yüzeyel brakiyal arter · %1 [[K5 s. 302]]</th><td>Ayrılma aksillaya kadar yükselebilir. [[K5 s. 302]] Ana gövde önkolda ortak interosseöz arter olarak sürer, yüzeyel brakiyal arter ise değişken bir düzeyde radial ve ulnar dallara ayrılan ortak köktür. [[K5 s. 302]]</td></tr>
<tr><th scope="row">Yüzeyel radial arter · %14 [[K5 s. 302]]</th><td>Normal radial arterin seyrini izlediği için pratik önemi azdır. [[K5 s. 302]]</td></tr>
<tr><th scope="row">Yüzeyel ulnar arter · %2 [[K5 s. 302]]</th><td>Hemen her zaman ortak fleksör başlangıcının yüzeyelinden iner, fleksör karpi ulnarisin lateral kenarına kıvrılıp distal önkolda olağan komşuluklarına döner. [[K5 s. 302]] Seyri boyunca derin fasya altında kalabilir veya dirsekte ya da proksimal önkolda deri altına çıkabilir. [[K5 s. 302]]</td></tr>
</tbody></table></div>
<p>Deri altındaki varyant medyan kübital venin hemen altında yer alır, aponevroz onu korumaz ve yanlışlıkla arter ponksiyonu riski en yüksek varyanttır. [[K5 s. 302]] Ortak interosseöz dal bu durumda genellikle radial arterden çıkar, dolayısıyla yüzeyel ulnar artere enjeksiyonda önkol kaslarının ana kan kaynağı çoğunlukla korunur. [[K5 s. 302–303]]</p>
<h3>Arter kanülasyonu için bölge seçimi</h3>
<ul class="ozet"><li><b>Amaç.</b> Sürekli basınç izlemi, tekrarlayan arteriyel kan örneklemesi veya noninvaziv ölçümün yapılamaması kanülasyon gerekçeleridir. [[K5 s. 303]]</li>
<li><b>Akım.</b> Küçük kanülü alabilecek arter cerrahi alandan ve hastalık odağından uzak olmalı, akımı işlemden veya hastalıktan etkilenmemelidir. [[K5 s. 303]] Emboli tehlikesi nedeniyle doğrudan beyni besleyen arterden kaçınılır, tercihen uç arter seçilmez ve dokunun yeterli kollateral akımı gösterilebilir olmalıdır. [[K5 s. 303]]</li>
<li><b>Seçenekler.</b> En sık el bileğinde radial arter veya ayak sırtında dorsalis pedis seçilir, ulnar ve posterior tibial arterler de kullanılabilir. [[K5 s. 303]] Daha distal seçenek kalmadığında brakiyal, aksiller veya femoral arter gibi büyük uç arterler kabul edilebilir. [[K5 s. 303]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="an07a-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="an07a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an07a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an07a-3"></div></div></section>
<section class="wrap blk ders-sec" id="an07a-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Dirsek önünde venöz girişim planlıyorsunuz. Yüzeydeki damarları nasıl tanırsınız? Seçtiğiniz venin altında hangi yapılar bulunabilir?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Epikondiller arası çizgiyi taban alıp brakiyoradialisi lateralde, pronator teresi medialde gösterin. [[K5 s. 298]]</li>
<li>H düzeninde medyan kübital ven sefalik venden bazilik vene doğru yükselir, M düzeninde medyan önkol veni iki yana dal verir. [[K5 s. 301–302]]</li>
<li>Medial kutanöz sinir medyan kübital veni üstten veya alttan çaprazabildiği için ponksiyonda risk altındadır. [[K5 s. 298]]</li>
<li>Aponevrozun derininde brakiyal arter yer alır, arterin medialinde medyan sinir, lateralinde biseps tendonu bulunur. [[K5 s. 298]] [[K5 s. 302]]</li>
<li>Yüzeyel ulnar arter deri altında seyrederse venin hemen altında kalabilir ve arada koruyucu aponevroz bulunmaz. [[K5 s. 302]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Bir dirsek önü üçgeni çizin, medyan kübital ven, aponevroz ve brakiyal arteri yüzeyden derine yerleştirin. [[K5 s. 298]] [[K5 s. 302]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Sefalik kateter aksiller vene geçerken neden takılabilir? [[K5 s. 300]] Supraklaviküler bölgede nabız ile pleksus arasındaki ilişki nedir? [[K5 s. 298]] Plevra kubbesi klavikulaya göre nerededir? [[K5 s. 296]]</div></div></section>
<section class="wrap blk ders-sec" id="an07a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Toraks girişini arkadan öne izlerken T1’den yaklaşık 4 cm aşağıdaki manubriuma inilir. [[K5 s. 295]]</li>
<li>Birinci kostada ön skalen tutunmasının önünde ven, arkasında arter ve alt trunkus bulunur. [[K5 s. 295–296]]</li>
<li>Fibröz bant alt pleksusu sıkıştırabilir, servikal kosta üzerinden geçen arterin darlığı ise distal embolilere zemin hazırlayabilir. [[K5 s. 297]]</li>
<li>Dirsek önünde biseps tendonunun medialinde önce brakiyal arter, sonra medyan sinir yer alır. [[K5 s. 298]]</li>
<li>Venin altındaki aponevroz brakiyal arteri örter, deri altından seyreden yüzeyel ulnar arter ise ponksiyona açıktır. [[K5 s. 302]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="07a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/06e">← Glossofaringeal, vagus, aksesuar ve hipoglossal sinirler</a><a href="#/dersler/anatomi/07b">Sonraki: Orbita ve içeriği →</a></nav></section>`
};
