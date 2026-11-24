VERI.sorular = VERI.sorular || {};
VERI.sorular['far17-1'] = {
  no: 1, kok: 'Renin–anjiyotensin sistemi ve blokajı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 269–273]]',
  onermeler: [
    { t: 'Makula densada sodyum azalması renin salınımını baskılar.', d: false, n: 'Yanlış. Makula densada sodyum azalınca renin salınımı uyarılır. [[K3 s. 269]]' },
    { t: 'ACE, bradikinini inaktive eder.', d: true, n: 'Doğru. ACE hem anjiyotensin II oluşturur hem bradikinini parçalar. [[K3 s. 269]]' },
    { t: 'Ramipril önyükü artyükten daha fazla azaltır.', d: false, n: 'Yanlış. Artyükteki düşüş daha büyüktür. [[K3 s. 271]]' },
    { t: 'Losartan AT₁ blokajıyla renin salınımını artırır.', d: true, n: 'Doğru. Anjiyotensin II’nin renin üzerindeki negatif geri bildirimi kesilir. [[K3 s. 272]]' },
    { t: 'Lisinopril karaciğerde etkinleşen bir ön ilaçtır.', d: false, n: 'Yanlış. Lisinopril aktiftir ve metabolize edilmeden idrarla atılır. [[K3 s. 271]]' },
  ],
};
VERI.sorular['far17-2'] = {
  no: 2, kok: 'Adrenerjik sinir ucunda sentez, geri alım ve salınım', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 273–274]]',
  onermeler: [
    { t: 'Noradrenalin etkisini sonlandıran başlıca yol alım 1’dir.', d: true, n: 'Doğru. Yüksek afiniteli taşıyıcı noradrenalini sinir terminaline geri alır. [[K3 s. 273]]' },
    { t: 'Trisiklik antidepresanlar guanetidinin nörona girişini kolaylaştırır.', d: false, n: 'Yanlış. Alım 1’i bloke ederek guanetidinin girişini engellerler. [[K3 s. 274]]' },
    { t: 'Guanetidin adrenal medulladan katekolamin sekresyonunu değiştirmez.', d: true, n: 'Doğru. Salınım blokajı adrenerjik sinir terminalindedir. [[K3 s. 274]]' },
    { t: 'Guanetidin kan–beyin bariyerini geçer.', d: false, n: 'Yanlış. Guanetidin bu bariyeri geçmez. [[K3 s. 274]]' },
    { t: 'Metirozin tirozin hidroksilazı kompetitif olarak inhibe eder.', d: true, n: 'Doğru. Bu yolla katekolamin sentezini önleyebilir. [[K3 s. 274]]' },
  ],
};
VERI.sorular['far17-3'] = {
  no: 3, kok: 'Santral etkili ilaçlar ve α₂ antagonizması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 275–277]]',
  onermeler: [
    { t: 'Metildopa idrarda VMA ölçümünü yalancı yüksek gösterir.', d: false, n: 'Yanlış. Katekolamin ölçümü yalancı yüksek çıkabilir, VMA ölçümü etkilenmez. [[K3 s. 275]]' },
    { t: 'Klonidin atriyoventriküler nodal iletiyi baskılar.', d: true, n: 'Doğru. PR aralığı uzar. [[K3 s. 276]]' },
    { t: 'Klonidinin α₂ sinyali hücre içi cAMP’yi azaltır.', d: true, n: 'Doğru. Reseptör Gi ile eşleşir ve potasyum kanalları da aktive olur. [[K3 s. 276]]' },
    { t: 'Klonidinle insülin salınımı baskılansa da kan şekeri nadiren yükselir.', d: true, n: 'Doğru. İnsülin salınımındaki azalmaya çoğu zaman kan şekeri artışı eşlik etmez. [[K3 s. 277]]' },
    { t: 'Atipamezol deksmedetomidinle ilişkili sedasyonu tersine çevirir.', d: true, n: 'Doğru. Beyne geçen bu selektif α₂ antagonisti analjeziyi de tersine çevirir. [[K3 s. 277]]' },
  ],
};

const A17_NAV = [
  ['raas', 'Renin ve anjiyotensin'], ['ace', 'ACE inhibitörleri'], ['ara', 'Losartan'],
  ['nor', 'Adrenerjik nöron'], ['metil', 'Metildopa'], ['klon', 'Klonidin ve atipamezol'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/17'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 17', baslik: 'Antihipertansifler',
  lede: 'Kan basıncını düşürmek için anjiyotensin II’nin oluşumu veya etkisi engellenebilir, adrenerjik sinir ucundan noradrenalin salınımı ya da santral sempatik çıkış azaltılabilir. [[K3 s. 270–276]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A17_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a17-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a17-raas">
<h2>Böbrekten damara renin–anjiyotensin sinyali</h2>
<p class="intro">Böbrek perfüzyonunda veya makula densada Na⁺ azalması, ayrıca renal sempatik liflerin β₁ üzerinden uyarılması renin salınımını başlatır. [[K3 s. 269]]</p>
<div class="viz"><div class="viz-head"><h3>Reninden geri bildirime</h3></div><div data-viz="a17_raas"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel dönüşüm ve geri bildirim. [[K3 s. 269–270]]</p></div>
<h3>Renini hangi hücre salar?</h3>
<ul><li><b>Jukstaglomerüler hücreler</b> glomerüle giren afferent arteriyol duvarındadır ve sempatik innervasyon alır. [[K3 s. 269]] Prorenini sistemik dolaşıma vermeden önce asit proteaz renine dönüştürürler. [[K3 s. 269]]</li>
<li><b>Makula densa</b> aynı nefronda distal kıvrımlı tübülün başlangıcında, jukstaglomerüler hücrelerin komşusundadır. [[K3 s. 269]]</li>
<li><b>Agranüler lacis hücreleri</b> glomerül yanında afferent ve efferent arteriyoller arasındadır. [[K3 s. 269]]</li></ul>
<p>Reninin yarılanma ömrü 80 dakikadır. [[K3 s. 269]] Substratı anjiyotensinojen karaciğerde sentezlenir ve plazmanın α₂-globulin fraksiyonunda dolaşır. [[K3 s. 269]] Böbrek ve karaciğer, anjiyotensin II’yi inaktif metabolitlere ve kısmen etkin anjiyotensin III’e parçalar. [[K3 s. 269]]</p>
<h3>Anjiyotensin II’nin etkileri</h3>
<ul><li><b>Damar ve sinir.</b> İki reseptöründen G-proteiniyle eşleşmiş AT₁’e afinitesi AT₂’den yüksektir. [[K3 s. 269]] Vazokonstriksiyonu noradrenalinin yaklaşık beş katıdır, arteriyole doğrudan ve merkezi mekanizmalarla dolaylı etki eder. [[K3 s. 269]] Sempatik sistemi aktive eder ve noradrenalinin sinir ucuna geri alımını (alım 1) engeller. [[K3 s. 269]]</li>
<li><b>Merkez ve böbrek.</b> Susama, ADH ve ACTH salınımı artar, glomerüler filtrasyon hızı azalır. [[K3 s. 270]]</li>
<li><b>İlaç hedefleri.</b> ACE inhibitörleri ve anjiyotensin II reseptör antagonistleri hipertansiyonda yaygın kullanılır. [[K3 s. 270]] β-blokerlerin antihipertansif etkisine sempatik renin salınımındaki azalma katkıda bulunur. [[K3 s. 270]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a17-ace">
<h2>ACE inhibitörleri ve böbrek perfüzyonu</h2>
<p class="intro">Ramiprilin aktif ürünü ramiprilat ACE’yi kompetitif olarak inhibe eder, böylece anjiyotensin II oluşumu ve etkileri önlenir. [[K3 s. 271]]</p>
<div class="viz"><div class="viz-head"><h3>Ramipril verildiğinde perfüzyon neyi değiştirir?</h3></div><div data-viz="a17_perfuzyon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel renal yanıt. [[K3 s. 271]]</p></div>
<p>Her derecede kalp yetmezliğinde ve sol ventrikül disfonksiyonlu miyokart enfarktüsünde ACE inhibitörleri prognozu iyileştirir. [[K3 s. 270]] Hipertansiyonda özellikle nefropatili, insüline bağımlı diyabetiklerde kullanılır. [[K3 s. 270]] Siyah hastalarda hipertansiyon görece dirençlidir ve diüretik eklenmesi gerekebilir. [[K3 s. 270]]</p>
<p>Çoğu ilaç perioperatif dönemde sürdürülürken, hipotansiyon sıklığı arttığından ACE inhibitörlerine ve anjiyotensin II reseptör antagonistlerine sıklıkla ara verilir. [[K3 s. 270]]</p>
<h3>Benzer etkiler, farklı kinetik</h3>
<table class="a17-kinetik"><thead><tr><th scope="col">Grup ve ilaç</th><th scope="col">Aktivasyon ve eliminasyon</th></tr></thead><tbody>
<tr><th scope="row">1 · Kaptopril</th><td>Aktif ilaçtır, kitap metabolitlerini de aktif olarak sınıflar. [[K3 s. 270]]</td></tr>
<tr><th scope="row">2 · Ramipril</th><td>Ön ilaç bağırsaktan hızla emilir, karaciğer esterazları neredeyse tamamını aktif diasit ramiprilata dönüştürür. [[K3 s. 271–272]] Ramiprilatın oral biyoyararlanımı %50’dir. [[K3 s. 272]] Yüksek dozda ACE doyar, yarılanma ömrü yaklaşık 15 saattir ve düşük dozda daha uzundur. [[K3 s. 272]] Başlıca renal atılım böbrek yetmezliğinde bozulur. [[K3 s. 272]]</td></tr>
<tr><th scope="row">2 · Enalapril</th><td>Oral ön ilaç karaciğer ve böbrekte aktif diasit enalaprilata hidrolize olur, enalaprilat intravenöz verilebilir. [[K3 s. 271–272]] Eliminasyon yarılanma ömrü 4–8 saatten uzun tedavide 11 saate çıkar, etki yaklaşık 20 saat sürer. [[K3 s. 272]]</td></tr>
<tr><th scope="row">3 · Lisinopril</th><td>Aktif olarak verilir, metabolize olmadan idrarla atılır. [[K3 s. 271]]</td></tr></tbody></table>
<div class="note"><b>Atlas notu.</b> Kitap kaptopril metabolitlerini aktif sayar. Başlıca disülfit metabolitleri inaktiftir.</div>
<h3>Ramipril başlanırken</h3>
<p>Tabletler 1.25–10 mg’dır, 1.25 mg ile başlanıp endikasyona göre doz artırılır. [[K3 s. 271]] Başlangıçta geçici hipotansiyon olabileceğinden tedavi uzman gözetiminde başlatılabilir. [[K3 s. 271]]</p>
<ul><li><b>Dolaşım.</b> Sistemik vasküler direnç belirgin azalır ve basınç düşer. [[K3 s. 271]] Artyük önyükten fazla azalır, özellikle kalp yetmezliğinde debi artabilir. [[K3 s. 271]] Barorefleks korunur, kalp hızı genellikle değişmez fakat artabilir. [[K3 s. 271]]</li>
<li><b>Böbrek.</b> Bilateral renal arter stenozu ve tek işlevsel böbreğin arterindeki stenoz kontrendikasyondur. [[K3 s. 271]]</li>
<li><b>Metabolizma.</b> Aldosteron azalınca negatif geri bildirim bozulur ve renin yükselir. [[K3 s. 271]] Özellikle hafif renal işlev kaybında bile hiperkalemi, üre ve kreatinin artışı görülebilir. [[K3 s. 271]]</li>
<li><b>Etkileşim.</b> Hiperkalemi nedeniyle potasyum tutucu diüretiklerle birlikte kullanılmamalıdır. [[K3 s. 271]] Tip I ve II diyabette açıklanamayan hipoglisemi bildirilmiştir, bu etkiler genellikle tedavi sürdükçe hafifler. [[K3 s. 271]] Nonsteroid antiinflamatuvarlar antihipertansif etkiyi azaltır ve böbrek yetmezliğini tetikleyebilir. [[K3 s. 271]]</li>
<li><b>Tolerans.</b> Bradikinin birikimi inatçı kuru öksürüğü açıklayabilir. [[K3 s. 271]] Anjiyoödem (%0.2), agranülositoz ve trombositopeni nadir fakat ciddidir. [[K3 s. 271]] Tat kaybı, döküntü, kaşıntı, ateş ve aftöz ülserasyon daha sık, özellikle yüksek dozda veya renal işlev bozukluğunda görülür. [[K3 s. 271–272]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a17-ara">
<h2>Losartan ve AT₁ blokajı</h2>
<p class="intro">Losartan, ACE inhibitörüne bağlı kuru öksürüğü tolere edemeyen hipertansif hastalarda kullanılır. [[K3 s. 272]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı sistemde iki ilaç hedefi</h3></div><div data-viz="a17_hedef"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel hedef karşılaştırması. [[K3 s. 271–273]]</p></div>
<p>Losartan tüm vücutta AT₁’i seçici biçimde bloke eder. [[K3 s. 272]] Renin üzerindeki negatif geri bildirim kalkınca renin ve anjiyotensin II yükselir, ancak yaygın AT₁ blokajı artışın etkisini sınırlar. [[K3 s. 272]]</p>
<ul><li><b>Karşılaştırma.</b> ACE dışı yollar da anjiyotensin II oluşturabildiğinden, kalp yetmezliği ve hipertansiyondaki olumsuz etkilerini en seçici biçimde AT₁ blokajı önler. [[K3 s. 273]] Kardiyoprotektif olabilecek AT₂ korunur. [[K3 s. 273]] Etkiler genel olarak ACE inhibitörlerine benzer, ancak öksürük ve anjiyoödem çok daha seyrek, uyum daha iyidir. [[K3 s. 272–273]] Bu özellikler reseptör antagonistlerinin kullanımını yaygınlaştırabilir. [[K3 s. 273]]</li>
<li><b>Preparat.</b> 25–50 mg tablet ve hidroklorotiyazidle kombinasyon bulunur. [[K3 s. 272]] Gebelik ve bilateral renal arter stenozu her iki grup için kontrendikasyondur. [[K3 s. 273]]</li>
<li><b>Aktivasyon.</b> Sübstitüe imidazol olan losartan sınırlı etkilidir, metaboliti reseptörde 40 kata kadar güçlü olduğundan esasen ön ilaçtır. [[K3 s. 272]] İyi bağırsak emilimini belirgin ilk geçiş izler, nonkompetitif etkili aktif karboksilik asit ve birkaç inaktif metabolit oluşur. [[K3 s. 273]]</li>
<li><b>Dağılım ve atılım.</b> Oral biyoyararlanım %30, plazma proteinlerine bağlanma %99’dur. [[K3 s. 273]] Eliminasyon yarılanma ömürleri losartan için 2 saat, aktif metabolit için 7 saattir. [[K3 s. 273]] %10’dan azı idrara aktif ve değişmeden geçer, inaktif metabolitler safra ve idrarla atılır. [[K3 s. 273]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a17-nor">
<h2>Adrenerjik sinir ucunda iki hedef</h2>
<p class="intro">Guanetidin noradrenalin salınımını engeller, metirozin ise katekolamin sentezini azaltabilir. [[K3 s. 273–274]]</p>
<div class="viz"><div class="viz-head"><h3>İntravenöz guanetidinin üç evresi</h3></div><div data-viz="a17_guan"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel basınç yanıtı. [[K3 s. 274]]</p></div>
<p>Sinir ucunda tirozinden sentezlenen noradrenalin veziküllerde depolanır, nöronal aralığa salınıp adrenoseptörleri etkiler. [[K3 s. 273]]</p>
<dl class="a17-karsilastir"><dt>Alım 1 · nörona</dt><dd>Başlıca sonlandırma yolu yüksek afiniteli geri alımdır. [[K3 s. 273]] Noradrenalin yeniden veziküle taşınır, sitoplazmadaki bir bölümü MAO ile deamine olabilir. [[K3 s. 273]]</dd>
<dt>Alım 2 · nöron dışına</dt><dd>Difüzyonla dolaşıma geçen noradrenalini karaciğer dahil ekstranöronal dokular alır ve katekol-O-metiltransferaz (COMT) metabolize eder. [[K3 s. 273]]</dd></dl>
<h3>Guanetidin</h3>
<ul><li><b>Sunum ve kullanım.</b> Tablet ve 10 mg.ml⁻¹ renksiz enjeksiyon çözeltisi vardır. [[K3 s. 273]] Eski antihipertansif uygulamada 10 mg.gün⁻¹ ile başlanıp 30–50 mg.gün⁻¹ idameye çıkılırdı. [[K3 s. 273]] Kitap güncel kullanımı sempatik aracılı kronik ağrıyla sınırlar, intravenöz rejyonal blokta 20 mg verilir ve genellikle blok tekrarlanır. [[K3 s. 273–274]]</li>
<li><b>Uygulama yolu.</b> Guanetidin alım 1 ile nörona girer. [[K3 s. 274]] Oral başlangıç çok daha yavaş olduğundan üç evre görülmez, adrenal medullada katekolamin sekresyonu değişmez. [[K3 s. 274]]</li>
<li><b>İstenmeyen etkiler.</b> Temel etki hipotansiyondur, telafi edici sempatik yanıt engellendiğinden postüral hipotansiyon sıktır. [[K3 s. 274]] Sıvı retansiyonu ve ödem gelişebilir, diyare sık görülür ve ejakülasyon gerçekleşmeyebilir. [[K3 s. 274]]</li>
<li><b>Etkileşim.</b> Trisiklik antidepresanlar ve kokain alım 1’i bloke eder, guanetidinin nörona girişini ve noradrenalin deposunu bozmasını engelleyerek etkisini antagonize eder. [[K3 s. 274]] Uzun kullanımda adrenoseptörlerin yukarı regülasyonu doğrudan etkili sempatomimetik aminlere belirgin duyarlılık yaratır. [[K3 s. 274]]</li>
<li><b>Kinetik.</b> Oral emilim değişken ve eksiktir, hepatik ilk geçiş sonrası biyoyararlanım %50’dir. [[K3 s. 274]] Plazma proteinlerine bağlanmaz, kan–beyin bariyerini geçmez. [[K3 s. 274]] Eliminasyon yarılanma ömrü birkaç gündür, karaciğerde metabolize edilir ve hem değişmemiş ilaç hem metabolitler idrarla atılır. [[K3 s. 274]]</li></ul>
<h3>Metirozin</h3>
<p>Tirozin hidroksilazı kompetitif olarak inhibe eder, kullanımı yalnız feokromositomaya bağlı hipertansiyonun kontrolüyle sınırlıdır. [[K3 s. 274]] Ağır diyare, sedasyon, ekstrapiramidal etkiler ve aşırı duyarlılık gelişebilir. [[K3 s. 274]]</p>
</section>
<section class="wrap blk ders-sec" id="a17-metil">
<h2>Metildopa ve santral negatif geri bildirim</h2>
<p class="intro">Metildopanın beyinde oluşan aktif ürünü sempatik tonusu azaltır, sistemik vasküler direnç ve kan basıncı düşer. [[K3 s. 275]]</p>
<div class="viz"><div class="viz-head"><h3>Beyne geçişten basınç yanıtına</h3></div><div data-viz="a17_metil"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel santral etki. [[K3 s. 275]]</p></div>
<p>Özellikle gebelikle ilişkili hipertansiyonda günde üç kez 250 mg kullanılır, en fazla 3 g.gün⁻¹’ye çıkılır. [[K3 s. 275]] Film kaplı tablet 125–500 mg, oral süspansiyon 50 mg.ml⁻¹’dir. [[K3 s. 275]] Seyrek kullanılan renksiz intravenöz preparat 50 mg.ml⁻¹ içerir, koruyucusu sodyum metabisülfittir. [[K3 s. 275]]</p>
<ul><li><b>Dolaşım.</b> Göreli bradikardiye rağmen kalp debisi korunur, bazen postüral hipotansiyon olur. [[K3 s. 275]] Ani kesilmede rebound hipertansiyon klonidine göre daha seyrektir. [[K3 s. 275]]</li>
<li><b>Merkezi sinir sistemi.</b> Sedasyon sık, baş dönmesi, depresyon, kâbus ve bulantı daha seyrektir. [[K3 s. 275]] Volatil anesteziklerin minimum alveoler konsantrasyonu (MAC) azalır. [[K3 s. 275]]</li>
<li><b>Kan ve bağışıklık.</b> Direkt Coombs testi %10–20 oranında pozitiftir, trombositopeni ve lökopeni nadirdir. [[K3 s. 275]] Otoimmün hemolitik anemi, ilk haftalarda bazen ateşle birlikte eozinofili ve aşırı duyarlılığa bağlı miyokardit gelişebilir. [[K3 s. 275]]</li>
<li><b>İdrar ve karaciğer.</b> İlaç veya metabolitleri parçalandığında idrar havayla temasta koyulaşabilir. [[K3 s. 275]] Uzun tedavide karaciğer işlevi bozulabilir, ölümcül hepatik nekroz bildirilmiştir. [[K3 s. 275]]</li>
<li><b>Ölçüm.</b> Katekolaminlerle aynı dalga boylarında floresans veren metildopa, idrar katekolaminlerini yalancı yüksek gösterebilir, VMA ölçümü etkilenmez. [[K3 s. 275]]</li>
<li><b>Diğer.</b> Konstipasyon ve jinekomasti görülebilir. [[K3 s. 275]]</li>
<li><b>Kinetik.</b> Düzensiz bağırsak emilimiyle oral biyoyararlanım çok değişkendir, etki yavaş başlar. [[K3 s. 275]] Hepatik ilk geçişte O-sülfat oluşur, proteinlere bağlanma %20’den azdır ve yaklaşık %50’si idrarla değişmeden atılır. [[K3 s. 275–276]]</li></ul>
<div class="note"><b>Atlas notu.</b> Kitap etkinleşmeyi tek dekarboksilasyonla özetler, oysa önce α-metildopamin oluşur, ardından dopamin-β-hidroksilaz α-metilnoradrenalini oluşturur. Kitap jinekomastiyi prolaktin baskılanmasına bağlar, ancak metildopayla prolaktin düzeyi artabilir.</div>
</section>
<section class="wrap blk ders-sec" id="a17-klon">
<h2>Klonidin ve atipamezol</h2>
<p class="intro">Klonidinin α₂’ye afinitesi α₁’e göre 200 kat yüksektir, bazı çalışmalar bu α-agonisti parsiyel agonist olarak tanımlar. [[K3 s. 276]]</p>
<div class="viz"><div class="viz-head"><h3>α₂ uyarısının yeri neyi değiştirir?</h3></div><div data-viz="a17_klon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel merkezi etkiler. [[K3 s. 276]]</p></div>
<p>α₂ reseptörü Gi ile eşleşir, hücre içi cAMP azalır ve K⁺ kanalları açılır. [[K3 s. 276]]</p>
<dl class="a17-karsilastir"><dt>Sunum</dt><dd>25–300 μg tablet, 150 μg.ml⁻¹ renksiz enjeksiyon çözeltisi ve terapötik düzeye 48 saatte ulaşan transdermal yama bulunur. [[K3 s. 276]]</dd>
<dt>Kullanım</dt><dd>Hipertansiyon, akut ve kronik ağrı, opioid yoksunluk belirtilerinin baskılanması ve ventilasyondaki kritik hastada sedasyonun güçlendirilmesi. [[K3 s. 276]]</dd></dl>
<h3>Dolaşımdaki yanıt</h3>
<ul><li>İntravenöz uygulamada periferik α₁ uyarısıyla basınç önce yükselebilir, ardından daha uzun süre düşer. [[K3 s. 276]] Doz artışıyla α₁ uyarısı artar ve tavan etkisi görülür. [[K3 s. 276]]</li>
<li>Bradikardiye rağmen debi iyi korunur, PR uzar ve atriyoventriküler düğüm iletisi baskılanır. [[K3 s. 276]] Barorefleks duyarlılığı arttığından aynı basınç artışında kalp hızı daha düşüktür. [[K3 s. 276]]</li>
<li>Koroner etkiler karmaşıktır, doğrudan vazokonstriksiyonu sempatik tonustaki azalma ve lokal nitrik oksit salınımı dengeleyebilir. [[K3 s. 276]] Perioperatif uyaranlara kardiyovasküler yanıtlar daha kararlı olur. [[K3 s. 276]]</li>
<li>Yüksek dozun aniden kesilmesinde rebound hipertansiyon daha sıktır. [[K3 s. 276]] Periferik vazokonstriksiyon ve plazma katekolaminlerindeki artıştan kaynaklanır, β-blokaj vazokonstriksiyonu karşılıksız bırakarak ağırlaştırabilir. [[K3 s. 276]]</li></ul>
<div class="note"><b>Atlas notu.</b> Kitap ani kesilme için “1.2 g.gün⁻¹’den fazla” yazar. Olası birim hatası nedeniyle bu sayı doğrulanmış bir eşik veya doz önerisi olarak kullanılamaz.</div>
<h3>Santral etkiler ve diğer sistemler</h3>
<ul><li><b>Sedasyon.</b> Klonidin sedasyon oluşturur ve volatil ajanların MAC değeri %50’ye kadar azalır, düşük doz anksiyolitik, yüksek doz anksiyojeniktir. [[K3 s. 276]]</li>
<li><b>Analjezi.</b> Subaraknoid ve epidural klonidin motor veya duyusal blok oluşturmadan uzun analjezi sağlar, eşzamanlı opioidlerle sinerjik görünür. [[K3 s. 276]] Opioidlerin aksine belirgin solunum depresyonu yapmaz, intravenöz uygulama postoperatif opioid ihtiyacını azaltıyor görünmektedir. [[K3 s. 276–277]]</li>
<li><b>Renal ve endokrin.</b> Diürezi açıklamak için önerilen mekanizmalardan biri ADH salınımının inhibisyonudur. [[K3 s. 277]] Cerrahi stres yanıtı ve insülin salınımı baskılanır, kan şekeri nadiren yükselir. [[K3 s. 277]]</li>
<li><b>Trombositler.</b> α₂ reseptörleri taşımalarına rağmen terapötik dozda agregasyon artmaz, sempatoliz adrenalinin uyardığı agregasyonu engeller. [[K3 s. 277]]</li></ul>
<h3>Kinetik ve antagonizma</h3>
<p>Klonidin oral yolla hızla, neredeyse tamamen emilir, biyoyararlanımı yaklaşık %100’dür. [[K3 s. 277]] Proteinlere bağlanma %20, dağılım hacmi yaklaşık 2 l.kg⁻¹, eliminasyon yarılanma ömrü 9–18 saattir. [[K3 s. 277]] Yaklaşık %50’si karaciğerde inaktif metabolitlere dönüşür, kalanı değişmeden idrarla atılır ve böbrek işlevi bozulduğunda doz azaltılmalıdır. [[K3 s. 277]]</p>
<p><b>Atipamezol</b> kan–beyin bariyerini geçen selektif α₂ antagonistidir, klonidin ve deksmedetomidinin sedasyon ve analjezisini geri çevirir. [[K3 s. 277]] Eliminasyon yarılanma ömrünün (2 saat) deksmedetomidininkine benzemesi klinik yarar sağlar. [[K3 s. 277]]</p>
<p class="note plain">Diğer antihipertansif gruplardan diüretikler Bölüm 22’de, adrenoseptör antagonistleri Bölüm 14’te, kalsiyum kanal antagonistleri Bölüm 16’da ele alınır. [[K3 s. 277]]</p>
</section>
<section class="wrap blk ders-sec" id="a17-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far17-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far17-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far17-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a17-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Hipertansiyonda ramipril ile losartanı nasıl karşılaştırırsınız? Hedeflerinden başlayıp kuru öksürüğü, renal riski ve perioperatif yaklaşımı açıklayın.</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Ramiprilat ACE’yi kompetitif inhibe eder, losartan AT₁’i bloke eder ve AT₂’yi korur. [[K3 s. 271–273]]</li>
<li>ACE inhibisyonuyla bradikinin birikmesi kuru öksürüğü açıklayabilir, losartanla bradikinin yıkımı sürer. [[K3 s. 271–272]]</li>
<li>Perfüzyon düşükse efferent arteriyol basıncının korunması anjiyotensin II’ye bağlıdır, bu desteğin kaybı böbrek yetmezliğine götürebilir. [[K3 s. 271]] Bilateral renal arter stenozu her iki ilaç için kontrendikasyondur. [[K3 s. 273]]</li>
<li>Perioperatif hipotansiyon sıklığı arttığından her iki gruba sıklıkla ara verilir. [[K3 s. 270]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Anjiyotensinojenden AT₁’e giden yolu ve ACE’nin bradikinin kolunu çizin, iki ilacın hedeflerini işaretleyin. [[K3 s. 269–273]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Losartan altında renin neden yükselir? [[K3 s. 272]] Potasyum tutucu bir diüretik ramiprille hangi riski taşır? [[K3 s. 271]] Klonidinin aniden kesilmesi basıncı nasıl etkileyebilir? [[K3 s. 276]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a17-ozet">
<h2>Özet</h2><ul class="ozet">
<li>ACE anjiyotensin II oluşturur ve bradikinini inaktive eder, losartan AT₁’i bloke eder. [[K3 s. 269]] [[K3 s. 272]]</li>
<li>Ramiprille artyük önyükten fazla azalır, düşük renal perfüzyonda efferent arteriyol desteği kaybolur. [[K3 s. 271]]</li>
<li>Guanetidinin nörona girişi alım 1’e bağlıdır, metirozin tirozin hidroksilazı inhibe eder. [[K3 s. 274]]</li>
<li>Metildopa ve klonidin santral sempatik tonusu azaltır, klonidinin spinal etkisi analjeziye katkı verir. [[K3 s. 275–276]]</li>
<li>Atipamezol klonidin ve deksmedetomidinin sedatif ve analjezik etkilerini geri çevirir. [[K3 s. 277]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="17"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/16b">← 16b · Kalsiyum kanal antagonistleri ve diğer vazodilatörler</a><a href="#/dersler/farmakoloji/18a">Sonraki: 18a · Hipnotikler ve anksiyolitikler →</a></nav>
</section>`,
};
