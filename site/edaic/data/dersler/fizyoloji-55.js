/* Fizyoloji Bölüm 55 · Kas iğcikleri ve Golgi tendon organları (K1 İngilizce baskı s. 246–248).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz55-1'] = {
  no: 1, kok: 'Kas iğciği için:', kagit: 'Paper A · fizyoloji, Bölüm 55', kaynak: '[[K1 s. 246–247]]',
  onermeler: [
    { t: 'Kas iğciği kapsülü 20–30 intrafuzal lif içerir.', d: false, n: 'Yanlış. Kapsülde 3–12 özelleşmiş intrafuzal lif bulunur. [[K1 s. 246]]' },
    { t: 'İntrafuzal lifler ekstrafuzal liflere paralel dizilir; ekstrafuzal liflerin gerilmesi intrafuzal lif boyunu değiştirir.', d: true, n: 'Doğru. Paralel dizilim iğciğin kas boyunu algılamasını sağlar. [[K1 s. 246]]' },
    { t: 'Nükleer zincir lifinde çekirdekler lif boyunca dağılır; lifte merkezi genişleme yoktur.', d: true, n: 'Doğru. Nükleer torba lifinde ise çekirdekler ortadaki genişlemede toplanır. [[K1 s. 246]]' },
    { t: 'Tip II afferent lifler hem intrafuzal lif boyunu hem de boyun değişim hızını bildirir.', d: false, n: 'Yanlış. Tip II lifler yalnız statik boyu bildirir; boy ve değişim hızını birlikte bildiren tip Ia liflerdir. [[K1 s. 247]]' },
    { t: 'γ-motor nöronlar intrafuzal liflerin kasılabilen dış uçlarını innerve eder ve her biri birkaç iğciğe gider.', d: true, n: 'Doğru. Duyu lifleri ise kasılmayan orta bölüme sarılır. [[K1 s. 247]]' },
  ],
};
VERI.sorular['fiz55-2'] = {
  no: 2, kok: 'Golgi tendon organları, iğcik afferentleri ve α–γ koaktivasyonu için:', kagit: 'Paper A · fizyoloji, Bölüm 55', kaynak: '[[K1 s. 247]]',
  onermeler: [
    { t: 'Golgi tendon organı ekstrafuzal liflere paralel dizilir ve kas boyunu algılar.', d: false, n: 'Yanlış. Ekstrafuzal liflere seri dizilir ve kas gerimini algılar. [[K1 s. 247]]' },
    { t: 'Her Golgi tendon organı bir tip Ia afferent ve bir γ-motor nöronla innerve edilir.', d: false, n: 'Yanlış. Tek bir tip Ib afferent nöronla innerve edilir; motor innervasyonu yoktur. [[K1 s. 247]]' },
    { t: 'Golgi tendon organları iskelet kası ile tendonun birleşme yerinde bulunur.', d: true, n: 'Doğru. Bunlar kas–tendon kavşağındaki germe alıcılarıdır. [[K1 s. 247]]' },
    { t: 'İstemli kasılmada α- ve γ-motor nöronlar eşzamanlı uyarılır.', d: true, n: 'Doğru. İntrafuzal uçların kasılması, kas kısalırken iğciğin gevşemesini önler ve duyarlılığını korur. [[K1 s. 247]]' },
    { t: 'Tip Ia afferent lifler yalnız nükleer zincir liflerinden girdi alır.', d: false, n: 'Yanlış. Ia lifleri hem nükleer torba hem nükleer zincir liflerinden, tip II lifleri yalnız nükleer zincir liflerinden girdi alır. [[K1 s. 247]]' },
  ],
};
VERI.sorular['fiz55-3'] = {
  no: 3, kok: 'Refleksler ve kas tonusu için:', kagit: 'Paper A · fizyoloji, Bölüm 55', kaynak: '[[K1 s. 247–248]]',
  onermeler: [
    { t: 'Diz refleksinde tip Ia afferent ile α-motor nöron arasındaki sinaps uyarıcıdır ve nörotransmitteri glutamattır.', d: true, n: 'Doğru. Bu sinaps omuriliğin ön boynuzundadır. [[K1 s. 247]]' },
    { t: 'Diz refleksinde hamstring kasının inhibisyonu, Ia lifinin hamstring α-motor nöronuyla yaptığı doğrudan GABA\'erjik sinapsla olur.', d: false, n: 'Yanlış. Ia lifi bir inhibitör ara nöron üzerinden etki eder; bu sinapsın nörotransmitteri glisindir. [[K1 s. 247–248]]' },
    { t: 'Jendrassik manevrası γ-motor nöron ateşlemesini azaltarak diz refleksini belirginleştirir.', d: false, n: 'Yanlış. γ-motor ateşlemesini artırır; iğcikteki zemin gerimi yükselir ve refleks belirginleşir. [[K1 s. 248]]' },
    { t: 'Baroreseptör refleksi, sinyalini otonom sinir sisteminden alan refleks örneğidir.', d: true, n: 'Doğru. Diz refleksi periferik duyu afferentinden, öğürme refleksi kraniyal sinirden kaynaklanır. [[K1 s. 247]]' },
    { t: 'Akut omurilik hasarında kaslar önce hipotonik ya da flasktır; yaklaşık 2 hafta sonra tonus artar ve spastisite gelişir.', d: true, n: 'Doğru. İlk evre spinal şoktur; sonraki γ-motor etkinlik artışının mekanizması bilinmemektedir. [[K1 s. 248]]' },
  ],
};

const D55_NAV = [
  ['d55-igcik', 'Kas iğciği'], ['d55-yanit', 'Ia ve II lifleri'], ['d55-koakt', 'α–γ koaktivasyonu'], ['d55-golgi', 'Golgi tendon organı'],
  ['d55-refleks', 'Refleks yayı'], ['d55-diz', 'Diz refleksi'], ['d55-tonus', 'Tonus ve spinal şok'],
  ['d55-p1', 'Part I'], ['d55-p2', 'Part II'], ['d55-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/55'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Nörofizyoloji · Bölüm 55', baslik: 'Kas iğcikleri ve Golgi tendon organları',
  lede: 'Kas iğciği kasın boyunu, Golgi tendon organı gerimini ölçer. İkisi de propriosepsiyonun ve diz refleksi gibi refleks yaylarının duyu ucudur; kas tonusu iğciğin γ-motor siniriyle ayarlanır. [[K1 s. 246–248]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D55_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d55-igcik">
  <h2>Propriosepsiyon ve kas iğciğinin yapısı</h2>
  <p class="intro">Propriosepsiyon, vücudun uzaydaki konumu ve postür dengesiyle ilgili uyaranların algılanmasıdır: kas, eklem ve tendondaki mekanoreseptörler eklem konumu, hareket, titreşim ve basınç bilgisini MSS'ye taşır. Başlıca iki alıcı vardır: boy değişimini algılayan kas iğciği ve gerimi algılayan Golgi tendon organı. [[K1 s. 246]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kas iğciği: lifler ve sinirler</h3></div>
    <div data-viz="f55_igcik"></div>
    <p class="viz-cap" aria-live="polite"><b>Kapsül.</b> İçinde 3–12 intrafuzal lif vardır; ekstrafuzal liflere paralel durur. Bir parçaya dokunun. [[K1 s. 246]]</p>
    <p class="viz-foot">Şematik çizim; lif sayısı ve boyutlar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Her intrafuzal lifin ortası kasılmayan elastik bir bölüm, iki ucu kasılabilir. <b>Nükleer torba lifinde</b> çekirdekler ortadaki genişlemede toplanır; <b>nükleer zincir lifinde</b> genişleme yoktur, çekirdekler lif boyunca dizilir. [[K1 s. 246]]</p>
    <p>İğciğin kendine ait duyu ve motor sinirleri vardır. Duyu lifleri intrafuzal liflerin orta bölümüne sarılır; γ-motor nöronlar kasılabilen uçlara gider ve her biri birkaç iğciği innerve eder. [[K1 s. 246–247]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d55-yanit">
  <h2>Ia ve II lifleri: boy ve hız</h2>
  <p class="intro">Tip Ia lifi hem intrafuzal lifin statik boyunu hem de boyun değişim hızını bildirir; tip II lifi yalnız statik boyu bildirir. [[K1 s. 247]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Germe rampası ve iki afferentin yanıtı</h3></div>
    <div data-viz="f55_gerim"></div>
    <p class="viz-cap" aria-live="polite"><b>Rampa.</b> Kas gerilirken Ia ateşlemesi hıza göre yükselir; boy sabitlenince iki lif de yeni boya uyan düzeyde kalır. Germe hızını değiştirin. [[K1 s. 247]]</p>
    <p class="viz-foot">Model: ateşleme sıklıkları temsilîdir; kitap sayı vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Fark girdiden gelir: Ia lifleri hem nükleer torba hem nükleer zincir liflerinden, II lifleri yalnız nükleer zincir liflerinden uyarı alır. [[K1 s. 247]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d55-koakt">
  <h2>α–γ koaktivasyonu</h2>
  <p class="intro">İstemli kasılmada α- ve γ-motor nöronlar birlikte uyarılır; böylece iğcik, kas kısalırken de duyarlı kalır. [[K1 s. 247]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kas kısalırken iğcik gevşer mi?</h3></div>
    <div data-viz="f55_koakt"></div>
    <p class="viz-cap" aria-live="polite"><b>α + γ.</b> Ekstrafuzal lifler kısalırken intrafuzal uçlar da kasılır; orta bölüm gergin kalır, Ia ateşlemesi sürer. [[K1 s. 247]]</p>
    <p class="viz-foot">Şematik; "yalnız α" durumu, γ'nın neyi önlediğini göstermek için kurgulanmıştır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>İntrafuzal lifler paralel durduğu için kas kısalınca iğcik de kısalır ve gevşer. γ uyarısı bu gevşemeyi önler: iğciğin duyarlılığı kas kısalsa ve yükü değişse de korunur. [[K1 s. 246–247]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d55-golgi">
  <h2>Golgi tendon organı: seri bağlı gerim alıcısı</h2>
  <p class="intro">Golgi tendon organları kas–tendon kavşağındaki germe alıcılarıdır; ekstrafuzal liflere paralel değil seri dizildikleri için boyu değil gerimi algılar. [[K1 s. 247]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Paralel iğcik, seri tendon organı</h3></div>
    <div data-viz="f55_seri"></div>
    <p class="viz-cap" aria-live="polite"><b>Pasif germe.</b> Kas uzar: paralel iğcik de seri tendon organı da gerilir. "İzometrik kasılma"yı seçin. [[K1 s. 246–247]]</p>
    <p class="viz-foot">Model: dizilim mantığını gösterir; iğcik yanıtı γ uyarısı yokmuş gibi çizilmiştir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th></th><th>Kas iğciği</th><th>Golgi tendon organı</th></tr></thead>
    <tbody>
      <tr><td><b>Yer</b></td><td>Kas içinde, kapsüllü</td><td>Kas–tendon kavşağı</td></tr>
      <tr><td><b>Dizilim</b></td><td>Ekstrafuzal liflere paralel</td><td>Ekstrafuzal liflere seri</td></tr>
      <tr><td><b>Algıladığı</b></td><td>Boy (Ia: boy ve hız)</td><td>Gerim</td></tr>
      <tr><td><b>Duyu siniri</b></td><td>Ia ve II</td><td>Tek Ib lifi</td></tr>
      <tr><td><b>Motor sinir</b></td><td>γ-motor nöron</td><td>Yok</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">[[K1 s. 246–247]]</p>
</section>

<section class="wrap blk ders-sec" id="d55-refleks">
  <h2>Refleks yayı ve sınıflaması</h2>
  <p class="intro">Refleks, bir uyarana verilen otomatik, öngörülebilir ve genellikle istemle denetlenmeyen yanıttır. [[K1 s. 247]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Beş halkalı yay, iki sınıflama</h3></div>
    <div data-viz="f55_sinif"></div>
    <p class="viz-cap" aria-live="polite"><b>En basit yay:</b> duyu alıcısı → afferent nöron → bir ya da daha çok sinaps → efferent nöron → efektör organ. Bir sınıfa dokunun. [[K1 s. 247]]</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Sinaps sayısına göre:</b> monosinaptik (diz refleksi) ya da polisinaptik. Polisinaptik örnek çekme refleksidir: sıcak bir cisme değen uzuv, birçok kas grubunun eşgüdümlü kasılıp gevşemesiyle bütünüyle uzaklaşır. <b>Sinyalin kaynağına göre:</b> periferik duyu afferenti (diz refleksi), otonom sinir sistemi (baroreseptör refleksi), kraniyal sinir (öğürme refleksi). [[K1 s. 247]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d55-diz">
  <h2>Diz refleksi</h2>
  <p class="intro">Patellar tendona çekiçle vurmak kuadrisepsi kasıp dizi ekstansiyona getirir; bu diz (patellar) refleksi klasik olarak monosinaptik kabul edilir. [[K1 s. 247]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Vuruştan ekstansiyona, adım adım</h3></div>
    <div data-viz="f55_diz"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Vuruş.</b> Patellar tendona vurulunca kuadriseps, içindeki kas iğcikleriyle birlikte gerilir. "İleri"ye basın. [[K1 s. 247]]</p>
    <p class="viz-foot">Şematik omurilik kesiti ve bacak; sinyal hızları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yayın halkaları: alıcı kuadrisepsin iğcikleri; afferent tip Ia lifleri, gerilmenin derecesini arka kökten ön boynuza taşır; sinaps ön boynuzda α-motor nöronla doğrudan, uyarıcı ve glutamaterjiktir; efferent α-motor nöron spinal sinirle kuadrisepse gidip birkaç kas lifini innerve eder; efektör kasılan kuadrisepstir. [[K1 s. 247]]</p>
    <p>Yayda tek sinaps olduğundan iğciğin uyarılmasıyla kasılma arasındaki latent süre kısadır. Ia lifi ayrıca dallanır ve antagonist kasın (hamstring) α-motor nöronunu glisinerjik inhibitör ara nöronla baskılar; kuadriseps karşı konmadan kasılır. Kitabın dipnotuna göre bu gevşeme polisinaptik bir yolla olur; yani refleks bütünüyle monosinaptik değildir. [[K1 s. 247–248]]</p>
    <p>Beyinden inen girdiler refleksin şiddetini ayarlar. Tendona art arda hızla vurulursa refleks kaybolur. <b>Jendrassik manevrasında</b> hasta dişlerini sıkar ya da kenetlediği ellerini birbirinden ayırmaya çeker; γ-motor ateşlemesi artar, iğcikteki zemin gerimi yükselir ve refleks belirginleşir. [[K1 s. 248]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d55-tonus">
  <h2>Kas tonusu ve spinal şok</h2>
  <p class="intro">Kas tonusu, kasın sürekli taban kasılma düzeyidir; iğciklerin γ-motor nöronlarını uyaran inen ekstrapiramidal supraspinal nöronlarca denetlenir. [[K1 s. 248]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>γ döngüsü: normal, akut hasar, 2 hafta sonra</h3></div>
    <div data-viz="f55_tonus"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> γ uyarısı intrafuzal uçları kısaltır, orta bölümü gerer ve Ia ateşlemesini artırır; Ia monosinaptik yayla α-motor nöronları uyarır, ekstrafuzal lifler kasılır: tonus. [[K1 s. 248]]</p>
    <p class="viz-foot">Şematik; etkinlik düzeyleri temsilîdir, kitap sayı vermez (yalnız ≈ 2 hafta).</p>
  </div>
  <div class="card" style="margin-top:16px"><span class="tag clin">Klinik önem · spinal şok</span>
    <p style="margin-top:8px">Akut omurilik hasarında supraspinal yollar kesilir; γ-motor nöronlar susar, kaslar hipotonik ya da flask olur: <b>spinal şok</b>. Yaklaşık 2 hafta sonra γ-motor etkinlik aşırı artar ve tonus yükselir: <b>spastisite</b>. Bu artışın mekanizması bilinmemektedir. [[K1 s. 248]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Mikronörografi çalışmaları spastisitede γ (füzimotor) etkinliğinin belirgin artmadığını göstermiştir. Artan tonus bugün daha çok α-motor nöronların uyarılabilirliğinin ve omurilik ara nöron devrelerinin değişmesine bağlanır.</div>
</section>

<section class="wrap blk ders-sec" id="d55-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: intrafuzal lif sayısı ve iki tipi, Ia ve II liflerinin girdisi ve bildirdiği, γ-motor innervasyon ve koaktivasyon, Golgi tendon organının yeri, dizilimi ve siniri, refleks sınıflamaları, diz refleksinin sinapsları ve nörotransmitterleri, Jendrassik manevrası, spinal şok. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz55-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz55-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz55-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d55-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Kas iğciğinin yapısını anlatın. Diz refleksi nasıl oluşur ve akut omurilik hasarından sonra kas tonusuna ne olur?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Propriosepsiyon.</b> Konum ve postür dengesinin algılanması; iğcik boyu, Golgi tendon organı gerimi algılar. [[K1 s. 246]]</li>
    <li><b>İğciğin yapısı.</b> Kapsülde 3–12 intrafuzal lif, ekstrafuzal liflere paralel; ortası kasılmaz, uçları kasılır; nükleer torba ve nükleer zincir lifleri. [[K1 s. 246]]</li>
    <li><b>Sinirler.</b> Ia: torba + zincir, boy ve hız; II: yalnız zincir, yalnız boy; γ-motor: kasılan uçlar, birkaç iğciğe. α–γ koaktivasyonu duyarlılığı korur. [[K1 s. 247]]</li>
    <li><b>Golgi tendon organı.</b> Kas–tendon kavşağı, seri dizilim, gerim; tek Ib lifi, motor siniri yok. [[K1 s. 247]]</li>
    <li><b>Diz refleksi.</b> İğcik → Ia, arka kök → ön boynuzda α-motor nöronla uyarıcı glutamaterjik sinaps → kuadriseps; Ia dalı → glisinerjik ara nöron → hamstring gevşer. Hızlı tekrarda kaybolur, Jendrassik'le artar. [[K1 s. 247–248]]</li>
    <li><b>Tonus ve spinal şok.</b> İnen ekstrapiramidal yollar → γ → Ia → α → tonus. Akut hasarda γ susar, kaslar hipotonik ya da flask; ≈ 2 hafta sonra γ aşırı etkin, spastisite. [[K1 s. 248]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Kapsül içinde bir nükleer torba ve bir nükleer zincir lifi çizin; ortaya sarılan Ia ve II liflerini, uçlara giden γ-motor nöronu işaretleyin. Yanına diz refleksi yayını ekleyin: iğcik, Ia, arka kök gangliyonu, ön boynuzda "+" sinaps ve "−" ara nöron, kuadriseps ve hamstring. [[K1 s. 246–248]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> İğcik neden boyu, tendon organı neden gerimi algılar? Koaktivasyon olmasaydı ne olurdu? Diz refleksi gerçekten monosinaptik mi? Jendrassik manevrası nasıl etki eder? Polisinaptik refleks örneği verin. Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 246–248]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d55-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Kas iğciği paralel dizilir ve boyu algılar; Golgi tendon organı seri dizilir ve gerimi algılar. [[K1 s. 246–247]]</li>
    <li>İğcikte 3–12 intrafuzal lif vardır: çekirdekleri ortada toplanan nükleer torba, lif boyunca dizilen nükleer zincir. [[K1 s. 246]]</li>
    <li>Ia boy ve hız, II yalnız boy bildirir; γ-motor nöronlar kasılan uçları innerve eder, Golgi tendon organının motor siniri yoktur, duyu siniri tek bir Ib lifidir. [[K1 s. 247]]</li>
    <li>α–γ koaktivasyonu kas kısalırken iğciğin gevşemesini önler. [[K1 s. 247]]</li>
    <li>Refleksler sinaps sayısına (mono/polisinaptik) ve sinyalin kaynağına (periferik afferent, otonom, kraniyal sinir) göre sınıflanır. [[K1 s. 247]]</li>
    <li>Diz refleksi: Ia–α sinapsı uyarıcı (glutamat), antagoniste giden ara nöron inhibitör (glisin); Jendrassik artırır, hızlı tekrar söndürür. [[K1 s. 247–248]]</li>
    <li>Tonus, inen yolların γ-motor nöronlar üzerinden ayarladığı taban kasılmadır; spinal şokta flask, ≈ 2 hafta sonra spastik olur. [[K1 s. 248]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="55"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/54">← Bölüm 54 · İskelet kası</a>
    <a href="#/dersler/fizyoloji/ek55">Sonraki: Ek ders · Omurilik refleksleri, kas tonusu ve postür →</a>
  </nav>
</section>`,
};
