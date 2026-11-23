/* Fizyoloji Bölüm 56 · Düz kas (K1 İngilizce baskı s. 249–251).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz56-1'] = {
  no: 1, kok: 'Düz kasın tipleri ve yapısı için:', kagit: 'Paper A · fizyoloji, Bölüm 56', kaynak: '[[K1 s. 249]]',
  onermeler: [
    { t: 'Çok üniteli düz kasın hücreleri gap junction\'larla bağlıdır ve tabaka hâlinde eşzamanlı kasılır.', d: false, n: 'Yanlış. Çok üniteli düz kasta gap junction yoktur; tek bir otonom sinir dallanıp birçok hücreyi ayrı ayrı innerve eder. Gap junction\'lı, eşzamanlı kasılan tip tek üniteli düz kastır. [[K1 s. 249]]' },
    { t: 'Tek üniteli düz kasta otonom sinir tabakadaki tek bir hücreyi innerve eder; aksiyon potansiyeli komşu hücrelere gap junction\'larla yayılır.', d: true, n: 'Doğru. Bu yüzden tabaka sinsityal bir birim gibi eşzamanlı kasılır. [[K1 s. 249]]' },
    { t: 'Trakea ve iris düz kası çok üniteli tiptedir.', d: true, n: 'Doğru. Büyük elastik arterler de çok ünitelidir; iç organlar ve öteki damarlar tek ünitelidir. [[K1 s. 249]]' },
    { t: 'Düz kasta ne tropomiyozin ne troponin bulunur.', d: false, n: 'Yanlış. Tropomiyozin her iki kasta da vardır; düz kasta eksik olan troponindir. [[K1 s. 249]]' },
    { t: 'Düz kasta T tübülü yoktur; onun yerine yüzey alanı/hacim oranını artıran sığ kaveolalar vardır.', d: true, n: 'Doğru. Kaveolalar Ca²⁺ girişini de kolaylaştırır. [[K1 s. 249–250]]' },
  ],
};
VERI.sorular['fiz56-2'] = {
  no: 2, kok: 'Düz kasın uyarılması ve uyarılma–kasılma eşleşmesi için:', kagit: 'Paper A · fizyoloji, Bölüm 56', kaynak: '[[K1 s. 250]]',
  onermeler: [
    { t: 'Arter düz kasının gerilmeyle kasılmasına miyojenik yanıt denir ve kan akımının otoregülasyonunu sağlar.', d: true, n: 'Doğru. GİS\'te de lümen içeriğinin bağırsak duvarını germesi peristaltizmi tetikleyebilir. [[K1 s. 250]]' },
    { t: 'Kolonda dakikadaki pacemaker döngüsü sayısı duodenumdakinden fazladır.', d: false, n: 'Yanlış. Kitaba göre duodenumda dakikada ≈ 12, kolonda yalnız 3 kez. [[K1 s. 250]]' },
    { t: 'Düz kasta sarkoplazmik Ca²⁺ troponin C\'ye bağlanarak kasılmayı başlatır.', d: false, n: 'Yanlış. Düz kasta troponin yoktur; Ca²⁺ kalmoduline bağlanır. [[K1 s. 250]]' },
    { t: 'Ca²⁺–kalmodulin kompleksi miyozin hafif zincir kinazını (MLCK) aktive eder; MLCK miyozin hafif zincirlerini fosforile eder.', d: true, n: 'Doğru. Fosforile miyozin aktinle çapraz köprü kurabilir. [[K1 s. 250]]' },
    { t: 'Çok üniteli düz kas, tek üniteli gibi pacemaker etkinliğiyle ve gerilmeyle de uyarılabilir.', d: false, n: 'Yanlış. Kitaba göre çok üniteli düz kas, iskelet kası gibi yalnız sinir impulsuyla uyarılır; pacemaker ve germe yolları tek üniteli düz kasa özgüdür. [[K1 s. 250]]' },
  ],
};
VERI.sorular['fiz56-3'] = {
  no: 3, kok: 'Düz kasın kasılma hızı ve enerji ekonomisi için:', kagit: 'Paper A · fizyoloji, Bölüm 56', kaynak: '[[K1 s. 251]]',
  onermeler: [
    { t: 'Düz kasın ürettiği gerim iskelet kasınınkinin yaklaşık onda biridir.', d: false, n: 'Yanlış. Düz kas daha yavaş kasılır ama ürettiği gerim iskelet kasınınkine eşittir. [[K1 s. 251]]' },
    { t: 'Düz kasta kasılma 10 kata kadar daha yavaş olur ve 30 kata kadar daha uzun sürer.', d: true, n: 'Doğru. Yavaş aksiyon potansiyeli, fosforilasyon gereksinimi ve yavaş çapraz köprü döngüsü bunun nedenleridir. [[K1 s. 251]]' },
    { t: 'Miyozin aktine bağlıyken defosforile edilirse çapraz köprü yerinde kalır; buna mandal köprüsü denir.', d: true, n: 'Doğru. Gerim yüksek kalırken ek ATP harcanmaz. [[K1 s. 251]]' },
    { t: 'Mandal köprüsü, uzun süre tonik etkin kalması gereken sfinkterlerde yaygındır.', d: true, n: 'Doğru. Sfinkter denetimi kitabın verdiği örnektir. [[K1 s. 251]]' },
    { t: 'Düz kasın yavaş gevşemesi, etkin bir SR olmadığı için Ca²⁺\'nın sarkoplazmadan yavaş uzaklaştırılmasına bağlıdır.', d: true, n: 'Doğru. Ca²⁺ yavaş yükselir ve yavaş düşer. [[K1 s. 251]]' },
  ],
};

const D56_NAV = [
  ['d56-tip', 'Yeri ve iki tipi'], ['d56-fark', 'İskelet kasından farkı'], ['d56-uyari', 'Uyarılma'],
  ['d56-eck', 'Uyarılma–kasılma'], ['d56-hiz', 'Yavaş kasılma'], ['d56-latch', 'Mandal köprüsü'],
  ['d56-p1', 'Part I'], ['d56-p2', 'Part II'], ['d56-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/56'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Bölüm 56', baslik: 'Düz kas',
  lede: 'Düz kas içi boş organların ve damarların istemsiz, çizgisiz kasıdır. İskelet kasıyla aynı aktin–miyozin döngüsünü kullanır ama Ca²⁺\'yı kalmodulinle okur, yavaş kasılır ve gerimi az ATP ile uzun süre korur. [[K1 s. 249–251]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D56_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d56-tip">
  <h2>Nerede bulunur, iki tipi</h2>
  <p class="intro">Düz kas otonom sinir sistemince innerve edilen istemsiz, çizgisiz kastır; içi boş organların ve tüplerin duvarındadır. Hücrelerin birbirine bağlanma biçimine göre iki tipe ayrılır. [[K1 s. 249]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tek üniteli ve çok üniteli düz kas</h3></div>
    <div data-viz="f56_tip"></div>
    <p class="viz-cap" aria-live="polite"><b>Tek üniteli.</b> Sinir tabakadaki tek bir hücreyi uyarır; aksiyon potansiyeli gap junction'larla komşu hücrelere hızla yayılır ve tabaka eşzamanlı kasılır. "Uyar"a basın. [[K1 s. 249]]</p>
    <p class="viz-foot">Şematik; hücre sayısı ve yayılma hızı temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Tek üniteli (single-unit)</b> düz kas iç organlarda ve büyük elastik arterler dışındaki damarlardadır. <b>Çok üniteli (multi-unit)</b> düz kas büyük elastik arterlerde, trakeada ve iristedir; gap junction yoktur, tek bir otonom sinir dallanıp birçok hücreyi ayrı ayrı innerve eder: iskelet kasındaki motor üniteye benzer. [[K1 s. 249]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:12px"><table class="tbl">
    <thead><tr><th>Yer</th><th>Düz kas kasılmasının sonucu</th></tr></thead>
    <tbody>
      <tr><td><b>Uterus</b> (büyük kısmı düz kas)</td><td>Doğumda itici güç; doğumdan hemen sonra uterus hemostazı</td></tr>
      <tr><td><b>Arterler</b> (tunika media)</td><td>Damar yarıçapı küçülür, akıma direnç artar</td></tr>
      <tr><td><b>Solunum yolu</b></td><td>Bronşiyol kasılması: bronkokonstriksiyon</td></tr>
      <tr><td><b>GİS</b> (longitudinal ve sirküler tabaka)</td><td>Eşgüdümlü segmentasyon ve peristaltizm: içerik karışır ve ilerler</td></tr>
    </tbody>
  </table></div>
  <div class="card" style="margin-top:12px"><span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px">Doğumdan sonra uterus kasılamazsa (<b>uterus atonisi</b>) hemostaz sağlanamaz; atoni doğum sonu kanamanın sık bir nedenidir. [[K1 s. 249]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d56-fark">
  <h2>İskelet kasından farkı</h2>
  <p class="intro">Düz kas hücresi küçük, tek çekirdekli ve çizgisizdir; iskelet kasındaki uyarılma–kasılma donanımının bir kısmı ya yoktur ya da zayıftır. [[K1 s. 249]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İki hücre yan yana</h3></div>
    <div data-viz="f56_hucre"></div>
    <p class="viz-cap" aria-live="polite"><b>Boyut.</b> İskelet kası hücresi kasın boyunca uzanan büyük bir silindirdir; düz kas hücresi çok daha küçük, iğ biçimlidir ve tabakalar (sinsityum) hâlinde dizilir. Bir özelliğe dokunun. [[K1 s. 249]]</p>
    <p class="viz-foot">Şematik; boyutlar ölçekli değildir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th></th><th>İskelet kası</th><th>Düz kas</th></tr></thead>
    <tbody>
      <tr><td><b>Hücre</b></td><td>Büyük, silindirik, çok çekirdekli</td><td>Küçük, iğ biçimli, tek çekirdekli</td></tr>
      <tr><td><b>Aktin / miyozin</b></td><td>Sarkomerlerde düzenli: çizgili</td><td>Sarkomer yok: çizgisiz</td></tr>
      <tr><td><b>Tropomiyozin / troponin</b></td><td>İkisi de var</td><td>Tropomiyozin var, troponin yok</td></tr>
      <tr><td><b>Zar girintisi</b></td><td>T tübülleri</td><td>Sığ kaveolalar</td></tr>
      <tr><td><b>SR</b></td><td>Gelişmiş (Bölüm 54)</td><td>Az gelişmiş</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">İki kasta da asıl işlev kasılmadır; aktin ince, miyozin kalın filamanları oluşturur. Kaveolalar yüzey alanı/hacim oranını artırır. [[K1 s. 249]]</p>
</section>

<section class="wrap blk ders-sec" id="d56-uyari">
  <h2>Düz kas nasıl uyarılır</h2>
  <p class="intro">Uyarıcı sinyaller zarı depolarize, inhibitör sinyaller hiperpolarize eder; net etki zarı eşik potansiyeline getirirse kasılma olur. Çok üniteli düz kas, iskelet kası gibi yalnız sinirle uyarılır; tek üniteli düz kasın dört yolu vardır. [[K1 s. 250]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Zar potansiyeli: dört girdi, bir eşik</h3></div>
    <div data-viz="f56_uyari"></div>
    <p class="viz-cap" aria-live="polite"><b>Pacemaker.</b> Zar potansiyeli kendiliğinden salınır (yavaş dalga); eşiği aşan her tepede aksiyon potansiyeli ve kasılma olur. Duodenumda dakikada ≈ 12, kolonda 3. Bir girdi seçin. [[K1 s. 250]]</p>
    <p class="viz-foot">Model: zar potansiyeli değerleri ve dalga biçimi temsilîdir; kitap yalnız dakikadaki sıklıkları verir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Otonom sinir:</b> tek üniteli düz kas çoğu kez hem sempatik (noradrenalin) hem parasempatik (asetilkolin) lif alır; bu iki girdi genellikle zıttır, biri uyarır öteki baskılar. <b>Dolaşan moleküller:</b> O₂, CO₂, NO, adrenalin, noradrenalin, histamin, prostaglandinler ve serotonin uyarabilir ya da baskılayabilir. [[K1 s. 250]]</p>
    <p><b>Germe:</b> arterlerde buna miyojenik yanıt denir ve kan akımının otoregülasyonunu sağlar (Bölüm 34); bağırsakta lümen içeriğinin duvarı germesi peristaltizmi başlatabilir. <b>Pacemaker:</b> GİS'teki Cajal interstisyel hücrelerinin zarı kalpteki gibi kendiliğinden depolarize olur. [[K1 s. 250]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap yavaş dalga sıklığını aksiyon potansiyeli sayısı gibi yazar. Yavaş dalga aksiyon potansiyeli değildir; yalnız eşiği aşan tepelerin üzerinde diken biçimli aksiyon potansiyelleri ve kasılma oluşur.</div>
</section>

<section class="wrap blk ders-sec" id="d56-eck">
  <h2>Uyarılma–kasılma eşleşmesi</h2>
  <p class="intro">Düz kası da hücre içi Ca²⁺ artışı kasar; ama Ca²⁺ çoğunlukla dışarıdan girer ve troponin yerine kalmoduline bağlanır. [[K1 s. 250]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Ca²⁺'dan çapraz köprüye, adım adım</h3></div>
    <div data-viz="f56_eck"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Yayılma.</b> Aksiyon potansiyeli hücreler arasında gap junction'larla hızla yayılır, ama T tübülü olmadığı için hücrenin içine doğrudan iletilmez. "İleri"ye basın. [[K1 s. 250]]</p>
    <p class="viz-foot">Şematik hücre kesiti; molekül sayıları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Ca²⁺ üç tür kanaldan girer: voltaj kapılı, ligand kapılı ve gerilmeye duyarlı. Kaveolalar yüzey alanını artırarak girişi kolaylaştırır; işlevsel SR'si olan hücreler ek Ca²⁺ salar. [[K1 s. 250]]</p>
    <p>Ca²⁺–kalmodulin üç yolla etki eder: <b>MLCK</b> miyozin hafif zincirlerini fosforile eder ve miyozin aktine bağlanabilir; <b>kaldesmon</b>, iskelet kasında troponinin yaptığı gibi tropomiyozini bağlanma yerinin üzerinde tutar, kompleks onun biçimini değiştirince tropomiyozin kayar; <b>kalponin</b> miyozin başının ATPaz etkinliğini baskılar ve kitaba göre Ca²⁺–kalmodulinle ya da doğrudan Ca²⁺ ile etkinleşir. Bu fazla düzenleme noktası hormon ve nörotransmitterlerin düz kastaki büyük rolünü yansıtır. [[K1 s. 250–251]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kalponin için yerleşik görüş tersidir: Ca²⁺–kalmodulin (ve kalponinin fosforilasyonu) kalponinin ATPaz üzerindeki baskısını kaldırır. Yani Ca²⁺ artınca kalponin kasılmayı daha az frenler.</div>
</section>

<section class="wrap blk ders-sec" id="d56-hiz">
  <h2>Aynı döngü, daha yavaş kasılma</h2>
  <p class="intro">Çapraz köprü döngüsü iskelet kasındakiyle aynıdır: ATP miyozin başına bağlanır, hidroliz olur, güç vuruşu gelir, ADP ve inorganik fosfat ayrılır, yeni ATP bağlanır (Bölüm 54). Fark hızdadır. [[K1 s. 251]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tek bir kasılmanın zaman seyri</h3></div>
    <div data-viz="f56_zaman"></div>
    <p class="viz-cap" aria-live="polite"><b>Karşılaştırma.</b> Düz kas 10 kata kadar daha yavaş kasılır ve kasılması 30 kata kadar uzun sürer; tepe gerim iskelet kasınınkine eşittir. "Oynat"a basın. [[K1 s. 251]]</p>
    <p class="viz-foot">Model: zaman ekseni nitel; oranlar kitabın "10 kata kadar" ve "30 kata kadar" üst sınırlarından.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kasılma üç nedenle yavaştır: aksiyon potansiyeli yavaş ve uzundur, bu yüzden Ca²⁺ yavaş yükselip yavaş düşer; miyozin aktine bağlanmadan önce enzimle fosforile edilmelidir; çapraz köprü döngüsü de yavaştır. Gevşeme de yavaştır, çünkü etkin bir SR olmadan Ca²⁺ sarkoplazmadan yavaş uzaklaştırılır. [[K1 s. 251]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d56-latch">
  <h2>Enerji tasarrufu: mandal köprüsü</h2>
  <p class="intro">Düz kas gerimi uzun süre ve az enerjiyle korumalıdır; bunu yavaş kasılarak ve mandal köprüsü kurarak başarır. [[K1 s. 251]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Fosforilasyon düşer, gerim kalır</h3></div>
    <div data-viz="f56_latch"></div>
    <p class="viz-cap" aria-live="polite"><b>Döngü.</b> Fosforile miyozin aktine bağlanır, çeker, ayrılır; her döngü bir ATP harcar. "Defosforile et"e basın. [[K1 s. 251]]</p>
    <p class="viz-foot">Şematik; ATP ve gerim değerleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yavaş kasılma enerji tasarrufu sağlar: kasılmanın gücü kuvvet ile hızın çarpımıdır. Miyozin aktine bağlıyken defosforile edilirse çapraz köprü yerinde kalır: <b>mandal köprüsü</b> (latch bridge). Gerim ek ATP harcanmadan yüksek kalır; uzun süre tonik etkin kalması gereken sfinkterlerde yaygındır. [[K1 s. 251]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d56-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: iki tipin yeri ve gap junction farkı, iskelet kasından yapısal farklar (troponin, T tübülü, kaveola, SR), tek üniteli düz kasın dört uyarı yolu ve yavaş dalga sıklıkları, Ca²⁺ kanalları, kalmodulin, MLCK, kaldesmon ve kalponin, kasılma hızı ve mandal köprüsü. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz56-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz56-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz56-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d56-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Düz kas iskelet kasından nasıl ayrılır? Düz kasta uyarılma–kasılma eşleşmesini anlatın ve sfinkterlerin gerimi az enerjiyle nasıl koruduğunu açıklayın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım ve yer.</b> Otonom innervasyonlu, istemsiz, çizgisiz; uterus, arterler, solunum yolu, GİS. Klinik: uterus atonisi doğum sonu kanamaya yol açar. [[K1 s. 249]]</li>
    <li><b>İki tip.</b> Tek üniteli: iç organlar ve çoğu damar, gap junction, eşzamanlı kasılma. Çok üniteli: büyük elastik arterler, trakea, iris; gap junction yok, motor üniteye benzer. [[K1 s. 249]]</li>
    <li><b>Yapı farkları.</b> Küçük, iğ biçimli, tek çekirdek; sarkomer ve troponin yok, tropomiyozin var; T tübülü yerine kaveola; SR az gelişmiş. [[K1 s. 249]]</li>
    <li><b>Uyarılma.</b> Net depolarizasyon eşiğe ulaşırsa kasılma. Tek üniteli: otonom sinir (sempatik/parasempatik, zıt), dolaşan moleküller, germe (miyojenik yanıt, peristaltizm), pacemaker (Cajal hücreleri; duodenum ≈ 12/dk, kolon 3/dk). [[K1 s. 250]]</li>
    <li><b>Uyarılma–kasılma eşleşmesi.</b> Ca²⁺ voltaj, ligand ve gerilme kapılı kanallardan girer, SR katkısı az. Ca²⁺–kalmodulin → MLCK (hafif zincir fosforilasyonu), kaldesmon (tropomiyozin kayar), kalponin (ATPaz baskısı). [[K1 s. 250]]</li>
    <li><b>Hız.</b> Aynı çapraz köprü döngüsü; 10 kata kadar yavaş, 30 kata kadar uzun, gerim eşit. Nedenleri: yavaş AP ve Ca²⁺, fosforilasyon gereksinimi, yavaş döngü; gevşeme yavaş Ca²⁺ uzaklaştırılmasıyla. [[K1 s. 251]]</li>
    <li><b>Enerji ekonomisi.</b> Güç = kuvvet × hız: yavaş kasılma ucuzdur. Mandal köprüsü: bağlıyken defosforile miyozin yerinde kalır, gerim ATP harcanmadan sürer; sfinkterler. [[K1 s. 251]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Bir düz kas hücresi çizin: zarda kaveolalar ve üç tür Ca²⁺ kanalı, içeride küçük bir SR. Ca²⁺ → kalmodulin → MLCK → fosforile miyozin → aktin oklarını; yanına kaldesmon ve kalponin dallarını ekleyin. Altına iskelet ve düz kasın gerim–zaman eğrilerini çizin: aynı tepe, düz kasta yavaş ve uzun. [[K1 s. 250–251]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Düz kasta troponinin işini ne yapar? Arterlerde miyojenik yanıt nedir? Tek ve çok üniteli düz kas nerede bulunur? Düz kas neden yavaş gevşer? Mandal köprüsü neden ATP harcamaz? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 249–251]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d56-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Tek üniteli düz kas gap junction'larla eşzamanlı kasılır; çok ünitelide her hücreye sinir dalı gider. [[K1 s. 249]]</li>
    <li>Düz kasta sarkomer, troponin ve T tübülü yoktur; kaveola vardır, SR zayıftır. [[K1 s. 249]]</li>
    <li>Tek üniteli düz kası sinir, dolaşan moleküller, germe ve pacemaker uyarır; çok üniteliyi yalnız sinir. [[K1 s. 250]]</li>
    <li>Ca²⁺ çoğunlukla dışarıdan girer ve kalmoduline bağlanır; MLCK, kaldesmon ve kalponin üzerinden etki eder. [[K1 s. 250]]</li>
    <li>Kasılma 10 kata kadar yavaş, 30 kata kadar uzun; gerim iskelet kasıyla eşit. [[K1 s. 251]]</li>
    <li>Mandal köprüsü gerimi ATP harcamadan korur; sfinkterler böyle çalışır. [[K1 s. 251]]</li>
    <li>Uterus atonisi doğum sonu kanamanın sık nedenidir. [[K1 s. 249]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="56"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/ek55">← Ek ders · Omurilik refleksleri, kas tonusu ve postür</a>
    <a href="#/dersler/fizyoloji/57">Sonraki: Bölüm 57 · Kalp kası →</a>
  </nav>
</section>`,
};
