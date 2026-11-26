VERI.sorular = VERI.sorular || {};
VERI.sorular['an01f-1'] = {
  no: 1, kok: 'Tutunmalar ve geçiş yolları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 72–74]]',
  onermeler: [
    { t: 'Sol krus üçüncü lomber vertebra gövdesine kadar tutunur.', d: false, n: 'Sol krus L1 ve L2 gövdelerinden başlar. [[K5 s. 72]]' },
    { t: 'Median arkuat bağ iki krusu birleştirir.', d: true, n: 'Bu fibröz yay kruslar arasında uzanır. [[K5 s. 72]]' },
    { t: 'Sempatik trunkus lateral arkuat bağın arkasından geçer.', d: false, n: 'Sempatik trunkusun geçtiği yer medial arkuat bağın arkasıdır. [[K5 s. 74]]' },
    { t: 'Vagus sinirleri özofagusa T10 düzeyinde eşlik eder.', d: true, n: 'Bu açıklıktan ayrıca sol gastrik damarların özofageal dalları geçer. [[K5 s. 74]]' },
    { t: 'Azigos ven sol krusu delerek geçer.', d: false, n: 'Sol krustan hemiazigos ven geçer, azigos ven ise T12’de aorta eşlik eder. [[K5 s. 74]]' },
  ],
};
VERI.sorular['an01f-2'] = {
  no: 2, kok: 'Frenik sinir ve kubbe hareketi', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 74–75]]',
  onermeler: [
    { t: 'Frenik sinir diyafram merkezinden propriyoseptif lifler taşır.', d: true, n: 'Merkezin propriyosepsiyonu frenik sinirle taşınır. [[K5 s. 75]]' },
    { t: 'Sol frenik sinir son dallarını kasın torasik yüzüne verir.', d: false, n: 'Her iki frenik sinirin terminal lifleri kasa abdominal yüzden ulaşır. [[K5 s. 75]]' },
    { t: 'Yan yatışta üstteki kubbenin hareketi görece azalır.', d: true, n: 'Üstte kalan kubbe daha aşağıda durur ve daha az hareket eder. [[K5 s. 75]]' },
    { t: 'İnspirasyonda kubbeler santral tendondan daha fazla yer değiştirir.', d: true, n: 'İniş kubbelerde daha belirgindir. [[K5 s. 75]]' },
    { t: 'Zorlu ekspirasyonda karın kaslarının kasılması diyaframı aşağı iter.', d: false, n: 'Artan karın içi basınç gevşemiş diyaframı yukarı iter. [[K5 s. 75]]' },
  ],
};
VERI.sorular['an01f-3'] = {
  no: 3, kok: 'Bileşke, gelişim ve herniler', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 76–78]]',
  onermeler: [
    { t: 'Morgagni hernisi arka plevroperitoneal kanaldan gelişir.', d: false, n: 'Bu kanal Bochdalek hernisinin yeridir. [[K5 s. 78]]' },
    { t: 'Santral tendon septum transversumdan gelişir.', d: true, n: 'Santral tendona dönüşen öncül septum transversumdur. [[K5 s. 76]]' },
    { t: 'Heller ameliyatında özofagus kasının kesilmesi alt özofagustaki yüksek basınç bölgesini ortadan kaldırır.', d: true, n: 'Bu gözlem fizyolojik sfinkterin kasla ilişkisini destekler. [[K5 s. 76]]' },
    { t: 'Paraözofageal hernide kardiya olağan yerinde kalır.', d: true, n: 'Fundus yukarı çıkarken kardiyoözofageal bileşke korunur. [[K5 s. 78]]' },
    { t: 'Fizyolojik sfinkter yeterliyse kayan hernide regürjitasyon görülmeyebilir.', d: true, n: 'Krural askı kapanmaya katkıda bulunur, ancak yeterli bir fizyolojik sfinkter geri kaçışı önleyebilir. [[K5 s. 76]]' },
  ],
};

const AN01F_NAV = [
  ['kas', 'Tutunmalar'], ['gecit', 'Açıklıklar'], ['solunum', 'Solunum hareketi'], ['frenik', 'Frenik sinir'], ['kardiya', 'Kardiya'],
  ['herni', 'Gelişim ve herniler'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];
SAYFALAR['dersler/anatomi/01f'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 1 · Ders 01f', baslik: 'Diyafram',
  lede: 'Toraksı karından ayıran bu geniş kas bölmesi memelilerin ayırt edici özelliklerindendir. [[K5 s. 72]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${AN01F_NAV.map(([id, ad], i) => `<button type="button" data-scroll="an01f-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an01f-kas">
  <h2>Santral tendon ve tutunmalar</h2>
  <p class="intro">Çevredeki kas lifleri, güçlü demetleri birbirine örülmüş yonca biçimli santral tendonda buluşur. [[K5 s. 72]]</p>
  <div class="viz"><div class="viz-head"><h3>Alttan bakış · abdominal yüz</h3></div><div data-viz="an01f_kubbeler"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Santral tendon üstte fibröz perikardla birleşir, çevresinde ise diyaframın kas bölümü yer alır. [[K5 s. 72]]</p>
  <dl class="an01f-cift">
    <dt>Arkada · kruslar</dt><dd>Daha büyük olan sağ krus L1–L3, sol krus L1–L2 vertebra gövdelerinden başlar. [[K5 s. 72]]</dd>
    <dt>Arkada · üç bağ</dt><dd>Median arkuat bağ iki krusu fibröz bir yayla birleştirir. [[K5 s. 72]] Medial arkuat bağ psoas major üzerindeki kalınlaşmış fasyadır. [[K5 s. 72–73]] Lateral arkuat bağ kuadratus lumborum fasyasının yoğunlaşmasıyla oluşur ve dışta 12. kaburganın ucuna yakın sonlanır. [[K5 s. 72]]</dd>
    <dt>Yanlarda · kostal kenar</dt><dd>Kas lifleri son altı kostal kıkırdağın uçlarından başlar. [[K5 s. 72]]</dd>
    <dt>Önde · ksifoid</dt><dd>Ksifoidin arka yüzü iki kas demetine başlangıç verir. [[K5 s. 72]]</dd>
  </dl>
</section>
<section class="wrap blk ders-sec" id="an01f-gecit">
  <h2>Hangi yapı nereden geçer?</h2>
  <p class="intro">Diyaframdaki üç ana geçişi yukarıdan aşağı vena kava inferior, özofagus ve aort sırasıyla izleyin. [[K5 s. 72–74]]</p>
  <div class="viz"><div class="viz-head"><h3>Düzeyi seçin, eşlik eden yapıları bulun</h3></div><div data-viz="an01f_gecit"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Özofageal hiatusu genellikle sağ krustan gelen kas lifleri askı gibi sarar. [[K5 s. 74]] Sol krusun askıya katılması nadir değildir, bazen bütün askıyı sol krus oluşturur. [[K5 s. 74]]</p>
  <h3>Diğer geçiş yolları</h3>
  <dl class="an01f-cift">
    <dt>Medial arkuat bağın arkası</dt><dd>Sempatik trunkus buradan geçer. [[K5 s. 74]]</dd>
    <dt>Krusların içi</dt><dd>Sağ ve sol splanknik sinirler krusları deler, hemiazigos ven sol krustan geçerek drene olur. [[K5 s. 73–74]]</dd>
    <dt>Ksifoid ve kostal lifler arası</dt><dd>Superior epigastrik damarlar bu aralıktan posterior rektus kılıfına ulaşır. [[K5 s. 74]]</dd>
    <dt>Kostal kas demetleri arası</dt><dd>Alt interkostal sinirler ve damarlar, diyafram ile transversus abdominis liflerinin iç içe geçtiği yerden karın ön duvarına girer. [[K5 s. 74]]</dd>
    <dt>Lenf yolları</dt><dd>Retroperitoneal dokulardan gelen lenfatikler diyaframı aşarak mediastene varır. [[K5 s. 74]]</dd>
  </dl>
  <p>Abdominal yüzden komşulukları incelerken arka karın duvarında iliohipogastrik sinir de görülür. [[K5 s. 73]]</p>
</section>
<section class="wrap blk ders-sec" id="an01f-solunum">
  <h2>Solunumda diyafram hareketi</h2>
  <p class="intro">Diyaframın hareket açıklığı sakin solunumda 1,5 cm, derin solunumda 7–13 cm’dir. [[K5 s. 75]]</p>
  <div class="viz"><div class="viz-head"><h3>Kubbelerin hareket yönü</h3></div><div data-viz="an01f_hareket"></div><p class="viz-cap" aria-live="polite"></p></div>
  <h3>Yatak başında kubbenin konumu</h3>
  <ul class="ozet">
    <li>Kubbenin tepesi midklaviküler çizgide 5. kaburga hizasına, meme başının yaklaşık 2,5 cm altına kadar çıkar. [[K5 s. 75]] Sağ hemidiyafram soldakinden biraz daha yüksektir. [[K5 s. 75]] Yatay konumda iki kubbe de biraz yükselir. [[K5 s. 75]] Yan yatışta üstteki kubbe daha aşağıda kalır ve hareketi görece azalır. [[K5 s. 75]]</li>
    <li>Geç gebelik, belirgin asit, obezite, pnömoperiton ve büyük abdominal tümörler diyaframı yükselterek solunumu bir ölçüde kısıtlar. [[K5 s. 75]]</li>
    <li>Diyaframın tidal hacmin yaklaşık %60–75’ini sağladığı tahmin edilir ve bazı kişilerde sakin inspirasyonun tek aktif kası olabilir. [[K5 s. 75]]</li>
    <li>Akciğerler görece normalse iki frenik sinirin kesintisine bağlı tam diyafram paralizisi çok az solunum güçlüğüne yol açabilir. [[K5 s. 75]]</li>
  </ul>
  <p>Diyafram ayrıca dışkılama, işeme, kusma ve doğum sırasında karın içi basıncın artmasına yardım eder. [[K5 s. 75]]</p>
</section>
<section class="wrap blk ders-sec" id="an01f-frenik">
  <h2>Frenik sinir</h2>
  <p class="intro">Kasın motor uyarısı frenik sinirden (C3–C5) gelir, kruslara T11 ve T12’den küçük bir katkı ulaşır. [[K5 s. 74–75]]</p>
  <div class="viz"><div class="viz-head"><h3>İki frenik sinirin geçiş yolları</h3></div><div data-viz="an01f_frenik"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Merkezin propriyosepsiyonunu frenik sinir, çevredeki kasın duyusunu alt torasik sinirler taşır. [[K5 s. 75]] Frenik sinir kesilirse aynı taraftaki hemidiyafram tam atrofiye uğrar. [[K5 s. 75]]</p>
</section>
<section class="wrap blk ders-sec" id="an01f-kardiya">
  <h2>Kardiyayı ne kapalı tutar?</h2>
  <p class="intro">Kardiyoözofageal bileşke yiyecek ve sıvıyı mideye geçirir, baş aşağı konumda bile geri kaçışı sınırlar ve geğirme ya da kusma için gevşeyebilir. [[K5 s. 75–76]]</p>
  <div class="viz"><div class="viz-head"><h3>Özofagustan fundusa · normal bileşke</h3></div><div data-viz="an01f_kardiya"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Kapanmanın tam mekanizması belirsizdir, beş öğenin birlikte etkili olduğu düşünülür. [[K5 s. 76]]</p>
  <ol class="iskelet">
    <li><b>Fizyolojik sfinkter.</b> Diseksiyonda ayrı bir anatomik sfinkter gösterilemez, ancak alt özofagusta yüksek basınçlı bir bölge bulunur. [[K5 s. 76]] Akalazyada yapılan Heller ameliyatında özofagus kası kesilince bu bölge kaybolur. [[K5 s. 76]]</li>
    <li><b>Mukoza.</b> Kardiya kıvrımları kas halkasının içine oturan bir tıkaç gibi davranır. [[K5 s. 76]]</li>
    <li><b>Açı.</b> Özofagusun mideye eğik girişi kapak etkisi oluşturabilir. [[K5 s. 76]]</li>
    <li><b>Krural askı.</b> Kardiyayı diyafram altında tutar ve tam inspirasyonda alt özofagusu kıskaç gibi sıkıyor görünür. [[K5 s. 76]]</li>
    <li><b>Karın içi basınç.</b> Pozitif basınç, özofagusun karın içindeki bölümünün duvarlarını birbirine yaklaştırma eğilimindedir. [[K5 s. 76]]</li>
  </ol>
  <p>Tam inspirasyonda toraks içi basınç en düşük, karın içi basınç en yüksek düzeydedir ve sıvının yukarı itilmesi kolaylaşır. [[K5 s. 76]] Zorlu inspirasyonda mide ile özofagus arasındaki yaklaşık 80 mmHg basınç farkına karşın kapanma korunabilir. [[K5 s. 76]]</p>
  <p>Diyafram bu mekanizmanın önemli ama vazgeçilmez olmayan bir parçasıdır: fizyolojik sfinkter yeterliyse kayan hernide regürjitasyon olmayabilir. [[K5 s. 76]] Hiatus normal görünse de muhtemelen fizyolojik sfinkter kusuruna bağlı serbest regürjitasyon görülebilir. [[K5 s. 76]]</p>
</section>
<section class="wrap blk ders-sec" id="an01f-herni">
  <h2>Gelişim ve herniler</h2>
  <p class="intro">Doğumsal defektleri yerleriyle, edinilmiş hiatus hernilerini ise yukarı çıkan mide bölümüyle ayırt edin. [[K5 s. 77–78]]</p>
  <div class="viz"><div class="viz-head"><h3>Hiatus hernisinde bileşke nerede?</h3></div><div data-viz="an01f_herni"></div><p class="viz-cap" aria-live="polite"></p></div>
  <h3>Dört embriyonik katkı</h3>
  <ul class="ozet">
    <li>Baş ucunun önündeki mezodermden gelişen septum transversum santral tendonu oluşturur. [[K5 s. 76]] Baş kıvrılırken ventrale ve kaudale taşınarak diyaframın ön bölümüne yerleşir. [[K5 s. 76]]</li>
    <li>Özofagusun dorsal mezenteri, vücut duvarından gelen periferik kenar ve iki plevroperitoneal membran diğer katkılardır. [[K5 s. 76–77]] Membranlar plevra ve periton boşlukları arasındaki ilkel bağlantıları kapatır. [[K5 s. 76]]</li>
    <li>Gelişim kesitinde arkada omurilik, vertebra ve kaburga, iç bölgede aort, özofagus ve vena kava inferior yön buldurur. [[K5 s. 77]]</li>
    <li>Göç sırasında servikal miyotomlar kasa, servikal sinirler innervasyona katkı verir. [[K5 s. 76]] Frenik sinirin boyundan diyaframa kadar uzanan uzun yolu böyle açıklanır. [[K5 s. 76–78]]</li>
  </ul>
  <h3>Doğumsal herni nereden gelişebilir?</h3>
  <dl class="an01f-cift">
    <dt>Morgagni forameni</dt><dd>Önde, ksifoid ve kostal başlangıçların arasındadır. [[K5 s. 78]]</dd>
    <dt>Bochdalek forameni</dt><dd>Arkada, plevroperitoneal kanal bölgesindedir. [[K5 s. 78]]</dd>
    <dt>Santral tendon</dt><dd>Tendonun tümü eksik olabilir, bu bölgede görülen bir herni bazen travmatik kökenlidir. [[K5 s. 78]]</dd>
    <dt>Özofageal hiatus</dt><dd>Açıklık doğuştan geniş olabilir. [[K5 s. 78]]</dd>
  </dl>
  <p>Kayan ve paraözofageal hernileri gösteren kesitlerde periton da izlenebilir. [[K5 s. 77]]</p>
  <p>Karmaşık gelişimine karşın diyaframın doğumsal anomalileri seyrektir. [[K5 s. 78]] Edinilmiş hiatus hernileri çok daha sıktır ve genellikle hiatusun zayıflayıp genişlediği orta yaşta ortaya çıkar. [[K5 s. 78]]</p>
</section>
<section class="wrap blk ders-sec" id="an01f-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <div class="viz"><div data-viz="mtf" data-q="an01f-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an01f-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an01f-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an01f-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Hiatus hernisi olan bir hastada midenin hangi bölümünün toraksa geçtiğini nasıl tarif edersiniz? Yanıtınıza normal hiatusun kas desteğinden başlayın.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>T10’daki hiatustan özofagus, vaguslar ve sol gastrik damarların özofageal dalları geçer. [[K5 s. 74]]</li>
    <li>Genellikle sağ krusun oluşturduğu askı bileşkeyi diyafram altında tutar ve kapanmasına katkıda bulunabilir. [[K5 s. 74]] [[K5 s. 76]]</li>
    <li>Kayma tipinde alt özofagus ve üst mide birlikte çıkar, özofagogastrik açı düzleşir. [[K5 s. 76]] [[K5 s. 78]]</li>
    <li>Paraözofageal tipte kardiya yerini korurken fundus özofagusun önünden toraksa geçer. [[K5 s. 78]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> İki hiatus çizip her birine özofagusu, kardiyayı ve fundusu yerleştirin. Kayma tipiyle paraözofageal tipte yükselen bölümü işaretleyin. [[K5 s. 77–78]]</div>
  <div class="note plain"><b>Ek sorular.</b> Sağ ve sol krus hangi vertebralardan başlar? Sağ ve sol frenik sinir diyaframı nerede deler? Morgagni ve Bochdalek defektlerini nasıl ayırırsınız?</div></div>
</section>
<section class="wrap blk ders-sec" id="an01f-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Sağ krus L1–L3’ten, sol krus L1–L2’den başlar. [[K5 s. 72]]</li>
    <li>Vena kava inferior T8’de, özofagus T10’da, aort T12’de geçer. [[K5 s. 72–74]]</li>
    <li>Frenik sinirler C3–C5 kökenlidir ve kasa abdominal yüzünden dağılır. [[K5 s. 74–75]]</li>
    <li>Kayma tipinde bileşke yer değiştirir, paraözofageal tipte bileşke yerinde kalırken fundus yükselir. [[K5 s. 78]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="01f"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/01e">← Mediasten ve akciğerler</a><a href="#/dersler/anatomi/02a">Sonraki: Perikard ve kalp →</a></nav>
</section>`,
};
