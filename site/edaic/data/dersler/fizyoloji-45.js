/* Fizyoloji Bölüm 45 · Beyin (K1 İngilizce baskı s. 192–197).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz45-1'] = {
  no: 1, kok: 'Beynin makroskopik anatomisi için:', kagit: 'Paper A · fizyoloji, Bölüm 45', kaynak: '[[K1 s. 192–193]]',
  onermeler: [
    { t: 'Beyin istirahat kalp debisinin yaklaşık %5\'ini alır.', d: false, n: 'Yanlış. Beyin istirahat kalp debisinin %15\'ini alır; bu, ağırlığından beklenenden çok fazladır. [[K1 s. 192]]' },
    { t: 'Serebellum beyin hacminin yaklaşık %10\'u olduğu hâlde beyindeki nöronların yarısından fazlasını içerir.', d: true, n: 'Doğru. Bu, hareketin inceltilmesindeki merkezî rolünü yansıtır. [[K1 s. 193]]' },
    { t: 'Koku nöronları dışındaki duyusal afferentler kortekse ulaşmadan önce lateral talamik çekirdeklerde sinaps yapar.', d: true, n: 'Doğru. Talamus duyusal bilginin aktarım istasyonudur; koku yolu bunun dışında kalır. [[K1 s. 192]]' },
    { t: 'Sağ serebellar hemisferin hasarı sol ekstremitelerde ataksiye yol açar.', d: false, n: 'Yanlış. Serebellar hasar aynı taraf (ipsilateral) ataksisi yapar; sol hemipleji sağ motor korteks hasarında görülür. [[K1 s. 193]]' },
    { t: 'Piramidal sistemin inen motor yollarının çoğu medullada, piramit denen kabartılarda çaprazlaşır.', d: true, n: 'Doğru. Dorsal kolon–medial lemniskus yolunun çıkan duyusal lifleri de medullada çaprazlaşır. [[K1 s. 193]]' },
  ],
};
VERI.sorular['fiz45-2'] = {
  no: 2, kok: 'Meninksler, nöroglia ve venöz drenaj için:', kagit: 'Paper A · fizyoloji, Bölüm 45', kaynak: '[[K1 s. 194–195]]',
  onermeler: [
    { t: 'Subdural hematomda kan, bir köprü veninin yırtılmasıyla dura ile araknoid arasında birikir.', d: true, n: 'Doğru. Subdural aralık dura ile araknoid arasındaki potansiyel bir aralıktır. [[K1 s. 194]]' },
    { t: 'Subaraknoid aralık dura ile araknoid arasında yer alır.', d: false, n: 'Yanlış. Subaraknoid aralık araknoid ile pia arasındadır ve beyin-omurilik sıvısı içerir. [[K1 s. 194]]' },
    { t: 'Nöroglia hücreleri de nöronlar gibi yaşam boyu bölünemez.', d: false, n: 'Yanlış. Nöronlar çoğalamaz; nöroglia ise yaşam boyu bölünmeyi sürdürür. [[K1 s. 194]]' },
    { t: 'Dural venöz sinüsler kapaksızdır ve kollabe olmaz; bu, nöroşirurjide hava embolisi riskinin yüksekliğini kısmen açıklar.', d: true, n: 'Doğru. Sinüsler duradan oluştukları için öteki venlerden farklıdır. [[K1 s. 195]]' },
    { t: 'Spinal epidural aralık foramen magnumdan ikinci lomber vertebra düzeyine kadar uzanır.', d: false, n: 'Yanlış. Epidural aralık sakrokoksigeal membrandan foramen magnuma kadar uzanır. [[K1 s. 194]]' },
  ],
};
VERI.sorular['fiz45-3'] = {
  no: 3, kok: 'Serebral dolaşım, inme ve EEG için:', kagit: 'Paper A · fizyoloji, Bölüm 45', kaynak: '[[K1 s. 194–197]]',
  onermeler: [
    { t: 'Serebral kanın yaklaşık üçte ikisi internal karotis arterlerden gelir.', d: true, n: 'Doğru. Kalanını iki vertebral arter getirir. [[K1 s. 194]]' },
    { t: 'Posterior serebral arterler internal karotis arterlerin uç dallarıdır.', d: false, n: 'Yanlış. PCA\'lar baziler arterin ikiye ayrılmasıyla oluşur; ICA\'ya PCom ile bağlanır. [[K1 s. 194]]' },
    { t: 'Laküner enfarktüs üst düzey serebral işlev bozukluğu yapmaz ve prognozu anterior ya da posterior dolaşım enfarktüsünden çok daha iyidir.', d: true, n: 'Doğru. Bulgular (ör. motor hemiparezi) enfarktın küçüklüğüyle orantısız olabilir, ama korteks tutulmaz. [[K1 s. 196]]' },
    { t: 'α dalgalarının frekansı 8–13 Hz\'dir.', d: true, n: 'Doğru. δ 0–4, θ 4–8, α 8–13, β > 13 Hz. [[K1 s. 196]]' },
    { t: 'Ketamin, öteki anestezik ajanların aksine EEG etkinliğini ve BIS sayısını artırır.', d: true, n: 'Doğru. Bu, BIS kullanımının sorunlarından biridir; N₂O ve opioidler ise BIS sayısını değiştirmez. [[K1 s. 196]]' },
  ],
};

const D45_NAV = [
  ['d45-bolge', 'Beş bölge'], ['d45-serebrum', 'Serebrum'], ['d45-dien', 'Diensefalon'], ['d45-sap', 'Beyin sapı'],
  ['d45-serebellum', 'Serebellum'], ['d45-meninks', 'Meninksler'], ['d45-glia', 'Nöroglia'], ['d45-willis', 'Willis poligonu'],
  ['d45-ven', 'Venöz drenaj'], ['d45-inme', 'İnme'], ['d45-eeg', 'EEG'], ['d45-ssep', 'SSEP'], ['d45-bis', 'BIS'],
  ['d45-p1', 'Part I'], ['d45-p2', 'Part II'], ['d45-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/45'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Nörofizyoloji · Bölüm 45', baslik: 'Beyin',
  lede: 'Beynin bölgeleri, zarları, destek hücreleri ve damarları; klinikte inme, EEG, uyarılmış potansiyeller ve anestezi derinliği izlemi. [[K1 s. 192–197]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D45_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d45-bolge">
  <h2>Beynin beş bölgesi</h2>
  <p class="intro">Beyin duyusal, motor ve üst düzey işlevleri yürütür ve öteki sistemleri eşgüdümler; metabolizması yüksektir ve ağırlığından beklenenden çok fazla, istirahat kalp debisinin %15'ini alır. [[K1 s. 192]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Orta hat kesitinde beş bölge</h3></div>
    <div data-viz="f45_bolgeler"></div>
    <p class="viz-cap" aria-live="polite"><b>Telensefalon (serebrum).</b> En büyük bölüm; ön ve orta kraniyal fossayı doldurur. Bir bölgeye dokunun. [[K1 s. 192]]</p>
    <p class="viz-foot">Şematik orta hat (sagital) kesiti; oranlar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Beş bölge: telensefalon (serebrum), diensefalon, mezensefalon (orta beyin), serebellum ve rombensefalon (pons ve medulla oblongata). Medulla, pons ve orta beyin birlikte beyin sapı adını alır. [[K1 s. 192–193]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-serebrum">
  <h2>Serebrum: hemisferler, loblar, derin çekirdekler</h2>
  <p class="intro">Telensefalonun üç alt bölgesi vardır: sağ ve sol serebral hemisferler, derindeki bazal gangliyonlar ve limbik sistem. [[K1 s. 192]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dört lob ve dominant hemisfer</h3></div>
    <div data-viz="f45_loblar"></div>
    <p class="viz-cap" aria-live="polite"><b>Frontal lob.</b> Büyük bölümü üst düzey işlevlerdedir; arka kısmındaki premotor ve primer motor korteks hareketi planlar ve başlatır. Bir loba dokunun ya da hemisferi değiştirin. [[K1 s. 192]]</p>
    <p class="viz-foot">Şematik lateral görünüm; lob sınırları yaklaşıktır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Hemisferler bellek, düşünme, planlama ve dili yürütür; duyusal algı ve istemli hareketin başlatılması için de gereklidir. İki hemisferi kalın, miyelinli bir akson demeti olan korpus kallozum bağlar. Dış katman olan korteks hücre gövdesi bol olduğu için gri cevher, derin katmanlar miyelinli akson oranı yüksek olduğu için beyaz cevherdir; korteksin geniş yüzeyi girus (kabartı) ve sulkuslarla (oluk) katlanmıştır. [[K1 s. 192]]</p>
    <p>Bazal gangliyonlar hemisferlerin derinindeki çekirdeklerdir; klasik olarak ince motor kontrolü, kas tonusunu ve postürü eşgüdümleyen ekstrapiramidal sistemin parçası sayılır. Talamusun iki yanındaki limbik sistem uzun süreli bellek, duygu ve davranışta rol alır. [[K1 s. 192]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap Wernicke alanını temporal ve frontal loblar arasına koyar; klasik yeri dominant hemisferde superior temporal girusun arka kısmıdır. Primer işitme korteksi de yalnız solda değil, her iki temporal lobda bulunur.</div>
</section>

<section class="wrap blk ders-sec" id="d45-dien">
  <h2>Diensefalon: talamus ve hipotalamus</h2>
  <p class="intro">Talamus duyusal bilginin kortekse giden aktarım istasyonudur; hipotalamus otonom işlevleri düzenler ve sinir sistemini endokrin sisteme bağlar. [[K1 s. 192–193]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Duyu yolu talamustan geçer, koku geçmez</h3></div>
    <div data-viz="f45_aktarim"></div>
    <p class="viz-cap" aria-live="polite"><b>Dokunma.</b> Afferent lif lateral talamik çekirdekte sinaps yapar, oradan postsantral girustaki primer somatosensoriyel kortekse gider. Bir duyu seçip oynatın. [[K1 s. 192]]</p>
    <p class="viz-foot">Şematik yol çizimi.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Talamusun medial yapıları ağrı algısı, farkındalık ve uyku düzenlemesinde rol alır. Metatalamusun lateral genikulat çekirdeği optik sinirden gelen görme bilgisini primer görme korteksine, medial genikulat çekirdeği işitme bilgisini primer işitme korteksine aktarır. Subtalamustaki subtalamik çekirdeğin bazal gangliyonlara ait olduğu düşünülür. [[K1 s. 192–193]]</p>
    <p>Hipotalamus büyük bir endokrin bez olan hipofizi denetler (Bölüm 80); iştah ve tokluk, susama ve osmolarite kontrolü, termoregülasyon ve sirkadiyen ritimde de rolü vardır. [[K1 s. 193]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-sap">
  <h2>Beyin sapı: orta beyin, pons, medulla</h2>
  <p class="intro">Beyin sapı hemisferleri omuriliğe ve serebelluma bağlar; yaşam için en temel merkezler medulladadır. [[K1 s. 193]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Beyin sapının üç katı ve içerdikleri</h3></div>
    <div data-viz="f45_sap"></div>
    <p class="viz-cap" aria-live="polite"><b>Orta beyin.</b> Arka beyni hemisferlere bağlar; içindeki Sylvius akuaduktu üçüncü ventrikülü dördüncü ventriküle bağlar (Bölüm 46). Bir düzeye dokunun. [[K1 s. 193]]</p>
    <p class="viz-foot">Şematik ön görünüm; çekirdeklerin yeri yaklaşık düzeydir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Orta beyinde okülomotor (III) ve troklear (IV) sinir çekirdekleri ile serebellum ve korteksten gelen ekstrapiramidal yolları omuriliğe aktaran kırmızı çekirdekler bulunur. Pons ("köprü") serebellumu beyin sapına, medullayı orta beyne bağlar ve V–VIII. kraniyal sinir çekirdeklerini taşır; solunum merkezinin parçası olan pnömotaksik ve apnöstik merkezler pons–medulla sınırındadır. [[K1 s. 193]]</p>
    <p>Medulla beyni omuriliğe bağlar. Piramidal sistemin inen motor yollarının çoğu piramit denen kabartılarda, dorsal kolon–medial lemniskus yolunun çıkan duyusal lifleri de medullada çaprazlaşır. Solunum ve vazomotor merkezler, kalbin otonom yolla dış düzenlenmesi ve kusma, yutma, hapşırma, öğürme, öksürük gibi kalıp refleksler medullaya bağlıdır. [[K1 s. 193]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-serebellum">
  <h2>Serebellum: hareketi başlatmaz, düzeltir</h2>
  <p class="intro">Serebellum beyin hacminin yalnız %10'u olduğu hâlde nöronların %50'sinden fazlasını içerir; hareketi motor korteks başlatır, serebellum onu akıcı, eşgüdümlü ve isabetli kılar. [[K1 s. 193]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Lezyon hangi tarafı etkiler?</h3></div>
    <div data-viz="f45_capraz"></div>
    <p class="viz-cap" aria-live="polite"><b>Sağ motor korteks.</b> Piramidal yol medullada karşı tarafa geçtiği için hasar sol hemipleji yapar. Lezyonun yerini seçin. [[K1 s. 193]]</p>
    <p class="viz-foot">Şematik ön görünüm; yollar sadeleştirilmiştir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Serebellum deneyime dayanarak çevrenin bir "çalışma modelini" kurar ve motor öğrenmeyi yürütür; bu yüzden hasarı felç değil, ataksi ve bozuk motor öğrenme yapar. Ortadaki vermis gövdenin motor ve postüral kontrolünü, iki yandaki hemisferler ekstremitelerin eşgüdümünü üstlenir. [[K1 s. 193]]</p>
    <p>Her yanda üç pedinkül serebellumla beyin sapı arasında afferent ve efferent uyarı taşır: kitaba göre superior ve orta pedinkül ponsa, inferior pedinkül medullaya bağlanır. [[K1 s. 193]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Superior serebellar pedinkül serebellumu ponsa değil orta beyne bağlar; ponsa bağlanan orta pedinküldür.</div>
</section>

<section class="wrap blk ders-sec" id="d45-meninks">
  <h2>Meninksler ve aralıklar</h2>
  <p class="intro">Beyin ve omuriliği dıştan içe üç zar örter: dura mater, araknoid mater ve pia mater. [[K1 s. 193–194]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kafatasında ve omurgada zarlar ve aralıklar</h3></div>
    <div data-viz="f45_meninks"></div>
    <p class="viz-cap" aria-live="polite"><b>Beyin.</b> Dura iki katlıdır; dural venöz sinüsler bu iki katın arasında uzanır. Bir katmana dokunun ya da omuriliğe geçin. [[K1 s. 194]]</p>
    <p class="viz-foot">Şematik kesit; kalınlıklar ölçekli değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kalın dura dışta periostal, içte meningeal kattan oluşur ve içe dört kıvrım yapar: hemisferleri ayıran falx cerebri, oksipital lobları serebellumdan ayıran tentorium cerebelli, tentoriumun altında serebellar hemisferleri ayıran falx cerebelli ve sella turcicadaki hipofizi saran halka biçimli diaphragma sellae. Araknoid ince, örümcek ağı görünümlü bir zardır; pia çok ince ve damardan zengindir, beyin ve omurilik yüzeyine yapışır. Omurilik bittikten sonra pia filum terminale olarak sürer ve durayla birlikte omuriliği koksikse bağlar. [[K1 s. 194]]</p>
    <p>Dura ile araknoid arasında potansiyel bir aralık olan subdural aralık vardır; araknoid ile pia arasındaki subaraknoid aralıkta beyin-omurilik sıvısı (BOS) bulunur. Omurilikte dura, ligamenta flavadan ve vertebra gövdesi, pedikül ve laminaların periostundan epidural (ekstradural) aralıkla ayrılır; bu aralık lenfatikler, spinal sinir kökleri, gevşek bağ dokusu ve epidural venöz pleksus içerir ve sakrokoksigeal membrandan foramen magnuma uzanır. [[K1 s. 194]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-glia">
  <h2>Nöroglia: dört destek hücresi</h2>
  <p class="intro">MSS nöronlarını dört tip hücre, yani nöroglia destekler; çoğalamayan nöronların aksine nöroglia yaşam boyu bölünür. [[K1 s. 194]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Nöronun çevresindeki dört glia hücresi</h3></div>
    <div data-viz="f45_glia"></div>
    <p class="viz-cap" aria-live="polite"><b>Astrosit.</b> En bol glia hücresi; nöronları kan damarlarına bağlar ve kan–beyin bariyerini kurarak nörona sabit bir dış ortam sağlar (Bölüm 47). Bir hücreye dokunun. [[K1 s. 194]]</p>
    <p class="viz-foot">Şematik çizim.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Oligodendrositler periferdeki Schwann hücreleri gibi aksonları elektriksel yalıtkan olan miyelinle sarar (Bölüm 52). Ependim hücreleri ventriküllerin ve omurilik santral kanalının epitel örtüsünü yapar. Mikroglia MSS'nin özelleşmiş makrofajlarıdır. [[K1 s. 194]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-willis">
  <h2>Arteriyel kanlanma ve Willis poligonu</h2>
  <p class="intro">Beyin dört arterden beslenir: iki internal karotis arter (ICA) ve iki vertebral arter; kanın üçte ikisi ICA'lardan gelir. Serebral dolaşımın kendine özgü yanı, bu damarları tabanda birleştiren Willis poligonudur. [[K1 s. 194]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Willis poligonu: bir damarı tıkayın</h3></div>
    <div data-viz="f45_willis"></div>
    <p class="viz-cap" aria-live="polite"><b>Tam poligon.</b> ICA'lar anterior, vertebral–baziler sistem posterior dolaşımı besler; ACom iki ACA'yı, PCom'lar iki dolaşımı birleştirir. Bir damara dokunarak tıkayın. [[K1 s. 194–195]]</p>
    <p class="viz-foot">Şematik alttan görünüm; kollateral akımın yeterliliği temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>ACA'lar ICA dallarıdır, hemisferlerin superior ve medial kısmını besler; küçük anterior kommünikan arter (ACom) iki ACA'yı bağlar. MCA'lar ICA'dan çıkar ve hemisferlerin lateral yüzünü besler. İki vertebral arter birleşip tek baziler arteri yapar; dalları beyin sapını besler. Baziler arter ikiye ayrılarak PCA'ları verir; bunlar oksipital lobları ve temporal lobların medial kısmını besler. Posterior kommünikan arterler (PCom) her yanda PCA'yı ICA'ya bağlar. [[K1 s. 194]]</p>
    <p>ICA'dan beslenenler (ACA, ACom, MCA) anterior, vertebral arterlerden beslenenler (baziler arter, PCA, PCom) posterior dolaşımdır. Poligon kuramsal olarak tıkanan damara kollateral akım sağlamalıdır; ama sıklıkla anatomik olarak eksiktir ve inme Birleşik Krallık'ta üçüncü ölüm nedenidir. [[K1 s. 195–196]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-ven">
  <h2>Venöz drenaj</h2>
  <p class="intro">Serebral venler yüzeyel ve derin iki sisteme ayrılır; kan sonunda iki internal juguler vene boşalır. [[K1 s. 195]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dural sinüsler: kapaksız, kollabe olmayan kanallar</h3></div>
    <div data-viz="f45_ven"></div>
    <p class="viz-cap" aria-live="polite"><b>Venöz akım.</b> Yüzeyel ve derin venlerden gelen kan dural sinüslerden internal juguler venlere akar. Akımı izleyin ya da duvarı açın. [[K1 s. 195]]</p>
    <p class="viz-foot">Şematik yan görünüm; sinüslerin yeri yaklaşıktır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yüzeyel sistemi dura materin iki katı arasındaki dural venöz sinüsler oluşturur (superior ve inferior sagittal, kavernöz, transvers, sigmoid). Duradan yapıldıkları için kapakları yoktur ve kollabe olmazlar; nöroşirurjide hava embolisi riskinin yüksek olması kısmen bundandır. Derin sistem beynin derin yapılarını boşaltan klasik venlerdir; bunlar birleşip Galen venini yapar, kitaba göre Galen veni inferior sagittal sinüse açılır. [[K1 s. 194–195]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Galen veni inferior sagittal sinüse boşalmaz; onunla birleşip düz sinüsü (sinus rectus) oluşturur, düz sinüs de sinüslerin birleşim yerine açılır.</div>
</section>

<section class="wrap blk ders-sec" id="d45-inme">
  <h2>Klinik önem: inme ve Bamford sınıflaması</h2>
  <p class="intro">Bamford sınıflaması iskemik inmeyi etkilenen dolaşıma göre üçe ayırır: anterior dolaşım, posterior dolaşım ve laküner enfarkt. [[K1 s. 195–196]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tıkanan dolaşım, enfarkt alanı ve bulgular</h3></div>
    <div data-viz="f45_bamford"></div>
    <p class="viz-cap" aria-live="polite"><b>Anterior dolaşım enfarktı (ACI).</b> Trombüs ya da emboli anterior dolaşımı tıkar ve geniş kortikal enfarkt olur; en sık tutulan damar MCA'dır. Bir inme tipi seçin. [[K1 s. 195]]</p>
    <p class="viz-foot">Şematik; enfarkt alanları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>ACI (total ya da parsiyel diye alt sınıflanır) hemisferlerin medial, superior ve lateral kısımlarını etkiler ve üç grup bulgu verir: motor korteks tutulursa kontralateral güçsüzlük, optik trakt tutulursa homonim hemianopi ve dominant ya da nondominant parietal lobun tutulmasına göre disfazi ya da görsel-mekânsal bozukluk gibi üst düzey işlev bozukluğu. [[K1 s. 195]]</p>
    <p>Posterior dolaşım enfarktında vertebrobaziler tıkanma serebellar işlev bozukluğu (ataksi, nistagmus), beyin sapı tutulumuyla kraniyal sinir felçleri ya da bilinç kaybı ve oksipital lob tutulumuyla homonim hemianopi yapar. Laküner enfarktta küçük bir subkortikal damar tıkanır; lateral talamus ya da internal kapsülün arka bacağı gibi motor ya da duyusal aksonların geçtiği derin yapılar etkilendiği için bulgu (ör. motor hemiparezi) enfarktın küçüklüğüyle orantısızdır. Üst düzey işlev bozukluğu yapmaz ve prognozu ACI ile POCI'den çok daha iyidir. [[K1 s. 196]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-eeg">
  <h2>EEG: frekans bantları ve klinik kullanım</h2>
  <p class="intro">Elektroensefalogram (EEG) beynin elektriksel etkinliğini 19 saçlı deri elektroduyla kaydeder; tek nöronun potansiyeli saçlı deriden saptanamayacak kadar küçük olduğundan kaydedilen, nöron gruplarının eşzamanlı depolarizasyonudur. [[K1 s. 196]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>EEG bantları ve klinik örüntüler</h3></div>
    <div data-viz="f45_eeg"></div>
    <p class="viz-cap" aria-live="polite"><b>β dalgası (> 13 Hz).</b> Uyanıklığın hızlı, küçük genlikli izi. Bir bant ya da klinik örüntü seçin. [[K1 s. 196]]</p>
    <p class="viz-foot">Model: izler sentetiktir; frekans aralıkları kitaptandır [[K1 s. 196]], genlikler temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>EKG'nin atriyum, sonra ventrikül miyositlerinin eşzamanlı depolarizasyonunu kaydetmesi gibidir; ama beynin etkinliği çok karmaşık olduğu için yorumu zordur. Etkinlik frekansa göre sınıflanır: δ 0–4, θ 4–8, α 8–13, β &gt; 13 Hz. [[K1 s. 196]]</p>
    <p>Anestezideki kullanımlar: <b>epilepsi tanısı</b> (nöbette nöronların düzenli, eşzamanlı etkinliği; yoğun bakımda sedasyona ara verilince uyanmayan hastada konvülsif olmayan status epileptikus önemli ayırıcı tanıdır), <b>ensefalopati tanısı</b> (yavaş dalga etkinliğinde giderek artış), <b>beyin ölümünde yardımcı test</b> (izoelektrik EEG; Birleşik Krallık yasasında gerekmez, başka ülkelerde doğrulamada kullanılır) ve ameliyathane ile yoğun bakımda <b>anestezi derinliği</b> (ör. barbitürat komasında burst supresyon). [[K1 s. 196]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-ssep">
  <h2>Somatosensoriyel uyarılmış potansiyeller (SSEP)</h2>
  <p class="intro">SSEP izlemi spinal cerrahide omurilik hasarı riskini azaltmak için kullanılır; genellikle motor uyarılmış potansiyellerle birlikte uygulanır. [[K1 s. 196]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Periferik uyarı, kortikal yanıt</h3></div>
    <div data-viz="f45_ssep"></div>
    <p class="viz-cap" aria-live="polite"><b>Bazal yanıt.</b> Periferik sinir uyarılır; yanıt somatosensoriyel korteksin üstüne yerleştirilen saçlı deri elektrotlarından alınır. Uyarın, sonra omuriliği zorlayın. [[K1 s. 196]]</p>
    <p class="viz-foot">Model: dalga biçimi ve sayılar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Spinal cerrahi sırasında SSEP sinyalinin genliğinin düşmesi ya da latansının uzaması nörolojik hasarı düşündürür. [[K1 s. 196]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-bis">
  <h2>Klinik önem: anestezi derinliği ve BIS</h2>
  <p class="intro">Genel anestezide ham EEG uyanıklığın hızlı, küçük genlikli β izinden yavaş, büyük genlikli δ örüntüsüne kayar. [[K1 s. 196]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Ajan ve doz: EEG ve BIS sayısı</h3></div>
    <div data-viz="f45_bis"></div>
    <p class="viz-cap" aria-live="polite"><b>Propofol.</b> Doz arttıkça EEG yavaşlar ve BIS düşer: doz–yanıt ilişkisi vardır. Ajanı ve dozu değiştirin. [[K1 s. 196]]</p>
    <p class="viz-foot">Model: eğriler temsilîdir; 0, 100 ve 40–60 değerleri kitaptandır [[K1 s. 196]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Bispektral indeks (BIS) çok karmaşık EEG'yi boyutsuz tek bir sayıya indirmeye çalışır; amaç anestezi derinliğini değerlendirmeye yardım etmek ve intraoperatif farkındalığı önlemektir. Frontal EEG 0 (beyinde elektriksel etkinlik yok) ile 100 (tam uyanık) arasında bir sayıya çevrilir; cerrahi için 40–60 uygun sayılır. [[K1 s. 196]]</p>
    <p>Sorunlar: BIS propofol, inhalasyon ajanları ve midazolamla doz–yanıt ilişkisi gösterir; ama klinikte sinerjik olan N₂O ve opioidler sayıyı değiştirmez, ketamin ise EEG etkinliğini ve BIS'i artırır. Çalışmalar çelişkilidir: B-Aware'de BIS rehberliği hatırlanan farkındalık riskini %82 azaltmış, B-Unaware'de end-tidal volatil konsantrasyonu izlemekten daha fazla azaltmamıştır. [[K1 s. 196–197]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: kalp debisinin %15'i, beş bölge, lobların işlevi ve dominant hemisfer (%97 sol), talamik aktarım ve koku istisnası, hipotalamusun görevleri, beyin sapı çekirdekleri ve medulladaki çaprazlaşma, serebellumun %10/%50'si ve ipsilateral ataksi, dura kıvrımları ve aralıklar, glia tipleri, Willis poligonu ve dolaşımlar, sinüslerin özellikleri, Bamford tipleri, EEG bantları ve kullanımları, SSEP, BIS ve çalışmaları. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz45-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz45-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz45-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d45-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Willis poligonunu çizip anlatır mısınız? Bir damar tıkanırsa ne olur; Bamford sınıflamasına göre iskemik inme tipleri ve bulguları nelerdir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Giriş.</b> Beyin istirahat kalp debisinin %15'ini alır; dört arterden beslenir: iki ICA (kanın üçte ikisi) ve iki vertebral arter. [[K1 s. 192, 194]]</li>
    <li><b>Poligonun damarları.</b> ACA'lar (ICA dalı; superior ve medial hemisfer), ACom, MCA'lar (lateral yüz), baziler arter (iki vertebralin birleşimi; beyin sapı), PCA'lar (baziler çatallanması; oksipital ve medial temporal), PCom'lar (PCA–ICA). [[K1 s. 194]]</li>
    <li><b>Anterior ve posterior dolaşım.</b> ACA, ACom, MCA anterior; baziler, PCA, PCom posterior. [[K1 s. 195]]</li>
    <li><b>Kollateral.</b> Poligon kuramsal olarak tıkanmada kollateral akım sağlar, ama sıklıkla eksiktir; inme Birleşik Krallık'ta üçüncü ölüm nedenidir. [[K1 s. 196]]</li>
    <li><b>ACI.</b> Total ya da parsiyel; en sık MCA; geniş kortikal enfarkt: kontralateral güçsüzlük, homonim hemianopi, disfazi ya da görsel-mekânsal bozukluk. [[K1 s. 195]]</li>
    <li><b>POCI ve laküner enfarkt.</b> POCI: ataksi, nistagmus, kraniyal sinir felçleri ya da bilinç kaybı, homonim hemianopi. LACI: küçük subkortikal damar, lateral talamus ya da internal kapsül arka bacağı; orantısız bulgu (ör. motor hemiparezi), üst düzey işlev bozukluğu yok, prognoz daha iyi. [[K1 s. 195–196]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Alttan görünümde altıgen bir halka çizin: önde iki ACA ve aralarında ACom, yanlarda ICA'dan çıkan MCA'lar, arkada baziler arterin çatallanmasından PCA'lar, iki yanda PCom; aşağıya iki vertebral arterin birleşip baziler arteri yapmasını ekleyin. Anterior ve posterior dolaşımı iki renkle ayırın. [[K1 s. 194–195]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Beynin venöz drenajı nasıldır, sinüsler neden hava embolisine yatkındır? Meninksler ve subdural hematom? Serebellar hasar neden aynı tarafta bulgu verir? EEG bantları ve anestezide kullanımı? BIS'in sınırlılıkları nelerdir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 193–197]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d45-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Beyin kalp debisinin %15'ini alır; beş bölgesi telensefalon, diensefalon, mezensefalon, serebellum ve rombensefalondur; orta beyin, pons ve medulla beyin sapını oluşturur. [[K1 s. 192–193]]</li>
    <li>Frontal lob planlama ve hareket, parietal lob duyu bütünleştirme, temporal lob işitme, dil ve bellek, oksipital lob görme; dominant hemisfer (%97 sol) yapı ve düzen, nondominant hemisfer mekânsal farkındalık. [[K1 s. 192]]</li>
    <li>Talamus koku dışındaki duyuların aktarım istasyonu, hipotalamus otonom ve endokrin denetimdir; medullada piramidal çaprazlaşma, yaşamsal merkezler ve kalıp refleksler bulunur. [[K1 s. 192–193]]</li>
    <li>Serebellum hareketi düzeltir ve öğrenir; hasarı aynı tarafta ataksi yapar, motor korteks hasarı karşı tarafta hemipleji. [[K1 s. 193]]</li>
    <li>Dura (dört kıvrım), araknoid, pia; subdural hematom köprü veninden, BOS subaraknoid aralıkta; glia: astrosit, oligodendrosit, ependim, mikroglia. [[K1 s. 194]]</li>
    <li>Willis poligonu iki ICA ve vertebrobaziler sistemi birleştirir ama sıklıkla eksiktir; dural sinüsler kapaksız ve kollabe olmaz (hava embolisi). [[K1 s. 194–196]]</li>
    <li>Bamford: ACI (en sık MCA), POCI, laküner enfarkt (orantısız bulgu, iyi prognoz). [[K1 s. 195–196]]</li>
    <li>EEG bantları δ 0–4, θ 4–8, α 8–13, β &gt; 13 Hz; SSEP'te genlik düşüşü ya da latans uzaması hasarı düşündürür; BIS 40–60 hedeflenir, N₂O ve opioidleri göstermez, ketaminle yükselir. [[K1 s. 196–197]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="45"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/44">← Bölüm 44 · Nöronun yapısı ve işlevi</a>
    <a href="#/dersler/fizyoloji/ek45">Sonraki: Ek ders · EEG, uyarılmış potansiyeller ve uyku →</a>
  </nav>
</section>`,
};
