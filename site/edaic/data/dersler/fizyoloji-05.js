/* ---------- Bölüm 5 · Enzimler (K1 s. 18–20) ----------
   Ders metni, sorular ve animasyonlar bu atlas için yazılmıştır; kitaptan metin ya da şekil kopyalanmaz.
   Kitapta olmayan kısa açıklamalar "Atlas notu" olarak işaretlidir. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz05-1'] = {
  no: 1, kok: 'Enzimler için:', kagit: 'Paper A · fizyoloji, Bölüm 5', kaynak: '[[K1 s. 18–19]]',
  onermeler: [
    { t: 'Katalizör tepkimede tüketilmediği için görece az sayıda katalizör molekülü yeterlidir.', d: true, n: 'Doğru. Katalizör kimyasal olarak değişmeden çıkar ve aynı molekül tepkimeye tekrar tekrar katılabilir. [[K1 s. 18]]' },
    { t: 'Enzimler tepkimenin aktivasyon enerjisini artırarak tepkimeyi hızlandırır.', d: false, n: 'Yanlış. Enzim substratları uygun yönelimde bağlayarak aktivasyon enerjisini düşürür; tepkime hızı bu yüzden çarpıcı biçimde artar. [[K1 s. 18]]' },
    { t: 'Aktif bölge aynı molekülün farklı stereoizomerlerini ayırt edebilir.', d: true, n: 'Doğru. Enzimin karmaşık üç boyutlu yapısı son derece özgül bir bağlanma bölgesi oluşturur; özgüllük stereoizomerleri ayırt edecek düzeydedir. [[K1 s. 18]]' },
    { t: 'Glikolizin hız sınırlayıcı basamağını kontrol eden enzim hekzokinazdır.', d: false, n: 'Yanlış. Glikolizde hız sınırlayıcı basamağı kontrol eden enzim fosfofruktokinazdır. Hekzokinaz kitapta Mg²⁺ içeren enzim örneği olarak geçer. [[K1 s. 18–19]]' },
    { t: 'Aktif bölgenin üç boyutlu biçimi örneğin sıcaklık artışıyla bozulursa enzimin işlevi bozulabilir ve tepkime yavaşlar.', d: true, n: 'Doğru. Aktif bölgenin biçimi kritik önemdedir; sıcaklık ya da pH biçimi değiştirirse tepkime yavaşlar. [[K1 s. 18]]' },
  ],
};
VERI.sorular['fiz05-2'] = {
  no: 2, kok: 'Karbonik anhidraz (CA) ve kofaktörler için:', kagit: 'Paper A · fizyoloji, Bölüm 5', kaynak: '[[K1 s. 18–19]]',
  onermeler: [
    { t: 'CA\'nın aktif bölgesinde bir çinko iyonu (Zn²⁺) bulunur.', d: true, n: 'Doğru. CA inorganik bir kofaktör olarak aktif bölgesinde Zn²⁺ taşır. [[K1 s. 18–19]]' },
    { t: 'Çinkoya bağlanan sudan H⁺ iyonunu komşu bir histidin kalıntısı uzaklaştırır; çinkoya bağlı, çok etkin bir OH⁻ kalır.', d: true, n: 'Doğru. Ardından aktif bölgedeki cebe oturan CO₂ bu OH⁻ ile çok yakın konumda olduğu için hızla tepkimeye girer. [[K1 s. 18]]' },
    { t: 'CA yalnızca CO₂ ile sudan H₂CO₃ oluşumunu katalizler; ters tepkimeyi katalizlemez.', d: false, n: 'Yanlış. Aynı enzim ters tepkimeyi de, yani H₂CO₃\'ün su ve CO₂\'ye dönüşümünü de katalizler. Tepkimenin net yönü Le Chatelier ilkesine uyar. [[K1 s. 18]]' },
    { t: 'Organik yapılı bir kofaktöre koenzim denir.', d: true, n: 'Doğru. Örnekler: açil grubu taşıyan koenzim A ve hidrür (H⁻) iyonu kabul eden NAD⁺. [[K1 s. 19]]' },
    { t: 'Sitokrom P450 grubundaki enzimler kofaktör olarak bakır içerir.', d: false, n: 'Yanlış. Sitokrom P450 enzimleri demir içerir (kitapta Fe²⁺). Kitabın listesinde bakır (Cu²⁺) içeren enzim süperoksit dismutazdır. [[K1 s. 19]]' },
  ],
};
VERI.sorular['fiz05-3'] = {
  no: 3, kok: 'Anestezide enzimler için:', kagit: 'Paper A · fizyoloji, Bölüm 5', kaynak: '[[K1 s. 20]]',
  onermeler: [
    { t: 'Atrakuryum ve sisatrakuryum esas olarak sitokrom P450 ile metabolize edilir.', d: false, n: 'Yanlış. İkisi esas olarak Hofmann eliminasyonuyla yıkılır (atrakuryumda ester hidrolizi de önemli bir yoldur; Atlas notu); anestezi ilaçlarının çoğunu metabolize eden P450 sisteminin kitapta sayılan istisnalarındandır. [[K1 s. 20]]' },
    { t: 'Psödokolinesteraz etkinliği azalmış bir hastada süksametonyumdan sonra kas paralizisi uzar.', d: true, n: 'Doğru. Plazma enzimi psödokolinesteraz süksametonyumu ve mivakuryumu yıkar. Enzimi olmayan ya da etkinliği azalmış hastalarda paralizi uzar: süksametonyum apnesi. [[K1 s. 20]]' },
    { t: 'Neostigmin asetilkolinesterazı geri dönüşümlü olarak inhibe eder.', d: true, n: 'Doğru. Sinaptik aralıkta ACh artar ve artan ACh nondepolarizan kas gevşeticileri reseptörlerinden kompetitif olarak uzaklaştırır. [[K1 s. 20]]' },
    { t: 'Esmolol esas olarak plazma psödokolinesterazıyla yıkılır.', d: false, n: 'Yanlış. Esmolol eritrosit esterazlarıyla hızla yıkılır; bu yüzden infüzyon kesilince etkisi çabuk biter. [[K1 s. 20]]' },
    { t: 'MAO inhibitörü kullanan bir hastada dolaylı etkili sempatomimetikler ölümcül olabilen bir hipertansif krize yol açabilir.', d: true, n: 'Doğru. Dolaylı etkili ilaçlar sinir ucundaki noradrenalini serbestleştirir; MAO inhibisyonu bu depoyu büyüttüğü için yanıt abartılı olur (Atlas notu). Gerekirse doğrudan etkili sempatomimetikler azaltılmış dozda kullanılabilir; bunlar COMT ile de yıkılır. [[K1 s. 20]]' },
  ],
};

{
  const NAV = [['d05-tanim', 'Katalizör'], ['d05-aktif', 'Aktif bölge'], ['d05-ca', 'Karbonik anhidraz'], ['d05-sinif', 'Sınıflar'], ['d05-kofaktor', 'Kofaktör ve koenzim'], ['d05-klinik', 'Klinik önem'], ['d05-p1', 'Part I'], ['d05-p2', 'Part II'], ['d05-ozet', 'Özet']];

  SAYFALAR['dersler/fizyoloji/05'] = {
    grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 1 · Temel bilgiler · Bölüm 5', baslik: 'Enzimler',
    lede: 'Enzimler metabolik tepkimeleri hızlandıran biyolojik katalizörlerdir. Bu bölüm enzimin nasıl çalıştığını, nasıl sınıflandığını ve anestezide kullandığımız birçok ilacın etkisini nasıl sonlandırdığını işler. [[K1 s. 18–20]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d05-tanim">
  <h2>Enzim: biyolojik katalizör</h2>
  <p class="intro">Enzimler metabolik tepkimeleri hızlandıran biyolojik katalizörlerdir: tepkimenin aktivasyon enerjisini düşürür, kendileri değişmeden çıkar. [[K1 s. 18]]</p>
  <div class="viz"><div data-viz="f05_enerji"></div></div>
  <div class="blk-body">
    <p><b>Katalizör</b>, kendisi kimyasal olarak değişmeden bir tepkimenin hızını artıran maddedir. Tüketilmediği için aynı molekül tekrar tekrar iş görür; görece az sayıda molekül yeter. Enzim substratları belirli bir yönelimde bağlar ve onları tepkimeye girecekleri en uygun konuma getirir; aktivasyon enerjisi düşer, hız çarpıcı biçimde artar. [[K1 s. 18]]</p>
    <p>Enzimler karmaşık, üç boyutlu proteinlerdir ve üç önemli özellikleri vardır: <b>kataliz</b>, <b>özgüllük</b> (aktif bölge, aşağıda) ve <b>düzenleme</b>. Biyokimyasal yollardaki (ör. glikoliz) birçok tepkime enzimsiz çok yavaştır; bu yüzden yolun hızı enzimlerin, özellikle hız sınırlayıcı basamağı kontrol eden enzimin etkinliği düzenlenerek denetlenir. Glikolizde bu enzim <b>fosfofruktokinazdır</b>. [[K1 s. 18]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Enzim başlangıç ile son durum arasındaki serbest enerji farkını (ΔG), dolayısıyla dengenin yerini değiştirmez; yalnızca dengeye ulaşma süresini kısaltır. Enerjice elverişsiz bir tepkime ancak ATP hidrolizi gibi elverişli bir tepkimeyle eşleşerek yürür (ligazlar, [[K1 s. 19]]).</div>
</section>

<section class="wrap blk ders-sec" id="d05-aktif">
  <h2>Aktif bölge: özgüllük ve biçim</h2>
  <p class="intro">Enzimin üç boyutlu yapısı substratlar için son derece özgül bir bağlanma bölgesi, <b>aktif bölgeyi</b>, oluşturur; bu bölgenin biçimi bozulursa enzim iş göremez. [[K1 s. 18]]</p>
  <div class="viz"><div data-viz="f05_aktif"></div></div>
  <p style="margin-top:12px">Özgüllük, aynı molekülün farklı stereoizomerlerini ayırt edecek düzeydedir. Aktif bölgenin biçimi örneğin sıcaklık artışı ya da pH değişikliğiyle bozulursa enzimin işlevi bozulabilir ve tepkime yavaşlar. [[K1 s. 18]] Bölüm 1'de geçtiği gibi enzimler dar bir pH ve sıcaklık aralığında verimli çalışır; uç pH proteinin üçüncül ya da dördüncül yapısını bozar (denatürasyon). [[K1 s. 2–3]]</p>
</section>

<section class="wrap blk ders-sec" id="d05-ca">
  <h2>Örnek: karbonik anhidraz ve iki yönlü kataliz</h2>
  <p class="intro">CO₂ ile suyun karbonik asit (H₂CO₃) oluşturduğu çok yavaş tepkimeyi, aktif bölgesinde bir çinko atomu bulunan <b>karbonik anhidraz</b> (CA) belirgin biçimde hızlandırır; aynı enzim ters tepkimeyi de katalizler. [[K1 s. 18]]</p>
  <div class="viz"><div data-viz="f05_ca"></div></div>
  <div class="blk-body">
    <p>Önce su çinkoya bağlanır; komşu bir histidin kalıntısı sudan H⁺ koparır ve çinkoda çok etkin bir OH⁻ kalır. CO₂ aktif bölgede kendisine tam uyan bir cebe oturur, OH⁻ ile yan yana geldiği için hızla tepkimeye girer. Ürün enzimden ayrılır; enzim kimyasal olarak değişmeden kalır. [[K1 s. 18]]</p>
    <p>CA ters tepkimeyi de (H₂CO₃ → H₂O + CO₂) hızlandırır. Gazlı içecekler kap açılınca oldukça yavaş, CA içeren tükürükle temas edince çok hızlı gaz kaybeder; kitap içeceğin dilde "köpürür" gibi gelmesini buna bağlar. [[K1 s. 18]]</p>
    <p>Net yönü <b>Le Chatelier ilkesi</b> belirler: dengedeki bir sistemde konsantrasyon ya da parsiyel basınç değişirse denge bu değişikliği karşılayacak yöne kayar ve yeni bir denge kurulur. Enzim yönü değil, dengeye ulaşma hızını belirler. [[K1 s. 18]] Kanda tepkime bu yüzden dokuda ileri, akciğerde ters yönde yürür (Bölüm 9). [[K1 s. 37–38]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d05-sinif">
  <h2>Enzim sınıfları</h2>
  <p class="intro">Enzimler katalizledikleri tepkimenin türüne göre altı sınıfa ayrılır. [[K1 s. 19]]</p>
  <div class="viz"><div data-viz="f05_sinif"></div></div>
  <p style="margin-top:12px"><b>Oksidoredüktazlar</b> redoks tepkimelerini katalizler. <b>Transferazlar</b> fonksiyonel bir grubu bir molekülden diğerine aktarır (ör. kinaz fosfat grubu aktarır). <b>Hidrolazlar</b> hidroliz tepkimelerini katalizler; <b>liyazlar</b> bağları hidroliz ve oksidasyon dışı yollarla koparır. <b>İzomerazlar</b> bir molekülün izomerleri arasında dönüşüm sağlar. <b>Ligazlar</b> ATP hidrolizinden gelen enerjiyle iki molekülü kovalent bağla birleştirir. [[K1 s. 19]] Şekilde örnek tepkimeler ve kitapta olmayan yedinci sınıf (translokazlar, IUBMB 2018) ayrıca işaretlidir.</p>
</section>

<section class="wrap blk ders-sec" id="d05-kofaktor">
  <h2>Kofaktör ve koenzim</h2>
  <p class="intro">Bazı enzimler yalnız proteinden oluşur ve tepkimeyi tek başına katalizler; diğerleri protein olmayan yardımcı moleküllere, <b>kofaktörlere</b>, gereksinim duyar. [[K1 s. 19]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Kofaktör: inorganik metal iyonu ya da organik koenzim</h3></div>
    <div data-viz="f05_kofaktor"></div>
    <p class="viz-cap" aria-live="polite">Bir kofaktöre dokunun: hangi enzimde bulunduğu ve ne iş gördüğü görünür. [[K1 s. 19]]</p>
  </div>
  <p style="margin-top:12px">Kofaktör inorganik ya da organiktir; organik kofaktöre <b>koenzim</b> denir. İnorganik kofaktörler aktif bölgedeki metal iyonlarıdır: CA'da Zn²⁺, sitokrom P450 grubunun tümünde Fe²⁺, B₁₂ vitamininde Co²⁺, süperoksit dismutazda Cu²⁺, hekzokinazda Mg²⁺. Koenzim örnekleri: birçok enzimin (ör. asetil-CoA karboksilaz) açil grubu aktarmak için kullandığı <b>koenzim A</b> (CoA) ve hidrür (H⁻) iyonu kabul eden, örneğin alkol dehidrogenazla birlikte iş gören <b>NAD⁺</b> (nikotinamid adenin dinükleotit). [[K1 s. 19]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · kitaptaki liste sadeleştirilmiştir.</b> P450'nin hem demiri dinlenimde Fe³⁺'tür ve katalitik döngüde Fe²⁺'ye indirgenir; B₁₂ (kobalamin) bir enzim değil, kobalt içeren bir kofaktördür (kararlı biçimlerinde Co³⁺) ve nitröz oksit bu kobaltı oksitleyerek metiyonin sentazı inaktive eder. Sitoplazmik süperoksit dismutaz bakırla birlikte çinko, mitokondriyal biçimi manganez içerir; hekzokinazda Mg²⁺ ATP ile kompleks (MgATP) hâlinde iş görür.</div>
</section>

<section class="wrap blk ders-sec" id="d05-klinik">
  <h2>Klinik önem: enzimler ve anestezist</h2>
  <p class="intro">Kullandığımız ilaçların birçoğunun etkisi bir enzimle sonlanır, bazıları doğrudan bir enzimi inhibe ederek etki eder; bazı hastalıklar da enzim etkinliğinin azalmasından kaynaklanır. [[K1 s. 20]]</p>
  <div class="viz"><div data-viz="f05_kolin"></div></div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Enzim</th><th>Ne yapar?</th><th>Klinik nokta</th></tr></thead>
      <tbody>
        <tr><th>Sitokrom P450 (süperaile)</th><td>Anestezi ilaçlarının çoğunu metabolize eder.</td><td>İstisnalar: atrakuryum ve sisatrakuryum (esas olarak Hofmann eliminasyonu), katekolaminler, süksametonyum, mivakuryum, remifentanil. [[K1 s. 20]]</td></tr>
        <tr><th>Monoamin oksidaz (MAO, mitokondriyal)</th><td>Monoamin katekolaminleri (adrenalin, dopamin, noradrenalin) yıkar.</td><td>MAO inhibitörleri antidepresandır: dolaylı etkili sempatomimetikler ölümcül olabilen hipertansif krize yol açabilir. Gerekirse doğrudan etkili sempatomimetikler azaltılmış dozda verilir; bunlar katekol-O-metil transferazla (COMT) da yıkılır. Petidin gibi serotonerjik ilaçlarla serotonin sendromu ortaya çıkabilir. [[K1 s. 20]]</td></tr>
        <tr><th>Psödokolinesteraz (plazma kolinesterazı, bütirilkolinesteraz)</th><td>Plazmada süksametonyum ve mivakuryumu yıkar.</td><td>Enzimi olmayan ya da etkinliği azalmış hastada bu ilaçlardan sonra kas paralizisi uzar: "süksametonyum apnesi". [[K1 s. 20]]</td></tr>
        <tr><th>Asetilkolinesteraz (AChE)</th><td>Nöromüsküler kavşağın sinaptik aralığında ACh'yi hidrolize eder, iletimi sonlandırır.</td><td>Geri dönüşümlü inhibitörü neostigmin aralıkta ACh'yi artırır; ACh nondepolarizan kas gevşeticileri reseptörlerinden kompetitif olarak uzaklaştırır. [[K1 s. 20]]</td></tr>
        <tr><th>Özgül olmayan doku ve plazma esterazları</th><td>Ultra kısa etkili opioid remifentanili hızla hidrolize eder.</td><td>Birikmez; bağlam duyarlı yarılanma süresi uzun infüzyondan sonra da 4 dk kalır. [[K1 s. 20]]</td></tr>
        <tr><th>Eritrosit esterazları</th><td>"Kardiyoselektif" β₁ antagonisti esmololü hızla yıkar.</td><td>Kesilince etkisi hızla biter; anestezide taşiaritmilerde, kalp cerrahisinde kalp hızı ve kan basıncı kontrolünde kullanılır. [[K1 s. 20]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · MAO ve serotonin.</b> Kitap "MAO inhibitörleri serotoninin yıkımında rol oynar" der; serotonini yıkan MAO'nun kendisidir, inhibitör bu yıkımı engeller. Serotonin sendromu riski serotoninin bu birikiminden gelir.</div>
</section>

<section class="wrap blk ders-sec" id="d05-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında tanımlar, sınıflar, kofaktör örnekleri ve özellikle klinik eşleştirmeler üzerinden sorulur: hangi ilacı hangi enzim yıkar, P450'nin istisnaları hangileridir, neostigmin nasıl etki eder, esmolol ve remifentanil neden kısa etkilidir. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz05-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz05-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz05-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d05-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Enzim nedir ve bir tepkimeyi nasıl hızlandırır? Anestezi pratiğinden örneklerle enzimlerin önemini anlatın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Enzim biyolojik bir katalizördür: tepkimeyi hızlandırır, kendisi değişmez ve tükenmez; az miktarı yeter. [[K1 s. 18]]</li>
    <li><b>Üç özellik.</b> Kataliz; özgüllük (aktif bölge, stereoizomer ayrımı); düzenleme (hız sınırlayıcı basamak, glikolizde fosfofruktokinaz). [[K1 s. 18]]</li>
    <li><b>Mekanizma, çizerek.</b> Substratı uygun yönelimde bağlar, aktivasyon enerjisi düşer. Aktif bölgenin biçimi kritiktir; sıcaklık ve pH bozarsa hız düşer. Enzim dengeye ulaşma hızını artırır, net yön Le Chatelier ilkesine uyar. [[K1 s. 18]]</li>
    <li><b>Örnek: karbonik anhidraz.</b> Zn²⁺'ye bağlanan su, H⁺'yı alan histidin, çinkoda etkin OH⁻, CO₂ cebi; iki yönlü kataliz. Dokuda ileri, akciğerde ters yön. [[K1 s. 18]] [[K1 s. 37–38]]</li>
    <li><b>Sınıflar ve kofaktörler.</b> Oksidoredüktaz, transferaz, hidrolaz, liyaz, izomeraz, ligaz. İnorganik kofaktör (Zn²⁺, Fe, Co, Cu²⁺, Mg²⁺) ve koenzim (CoA, NAD⁺). [[K1 s. 19]]</li>
    <li><b>Klinik bağlantıyla bitirin.</b> P450 ve istisnaları; MAO, MAO inhibitörleri ve COMT; psödokolinesteraz ve süksametonyum apnesi; AChE ve neostigmin; remifentanil ve esmolol esterazları. [[K1 s. 20]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim enerji profilidir: substrat ve ürün düzeyleri, enzimsiz yüksek ve enzimli alçak engel, değişmeyen ΔG.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Enzim dengenin yerini değiştirir mi? Süksametonyumun etkisi neden bazı hastalarda uzar? Neostigmin nondepolarizan bloğu nasıl geri çevirir? Remifentanil uzun infüzyondan sonra neden birikmez? MAO inhibitörü kullanan hastada hangi vazopresörü seçersiniz? Cevaplar yukarıda. [[K1 s. 18–20]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d05-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Enzim biyolojik katalizördür: tepkimeyi hızlandırır, değişmeden çıkar, az miktarı yeter. Üç özellik: kataliz, özgüllük, düzenleme (glikolizde fosfofruktokinaz). [[K1 s. 18]]</li>
    <li>Substratı uygun yönelimde bağlar, aktivasyon enerjisini düşürür. Aktif bölgenin biçimi kritiktir; sıcaklık ve pH bozabilir. [[K1 s. 18]]</li>
    <li>Karbonik anhidraz: Zn²⁺, histidin, çinkoda etkin OH⁻ ve CO₂ cebi. Aynı enzim iki yönü de katalizler; net yön Le Chatelier ilkesine uyar, enzim dengeye ulaşma hızını artırır. [[K1 s. 18]]</li>
    <li>Kitaptaki altı sınıf: oksidoredüktaz, transferaz, hidrolaz, liyaz, izomeraz, ligaz. [[K1 s. 19]] Güncel IUBMB sınıflamasında yedincisi translokazlardır (Atlas notu).</li>
    <li>Kofaktör: inorganik (Zn²⁺ CA, Fe P450, Co B₁₂, Cu²⁺ SOD, Mg²⁺ hekzokinaz) ya da organik, yani koenzim (CoA, NAD⁺). [[K1 s. 19]]</li>
    <li>P450 çoğu anestezi ilacını yıkar; istisnalar atrakuryum, sisatrakuryum, katekolaminler, süksametonyum, mivakuryum, remifentanil. [[K1 s. 20]]</li>
    <li>MAO inhibitörü + dolaylı etkili sempatomimetik: hipertansif kriz; petidinle serotonin sendromu. Psödokolinesteraz eksikliği: süksametonyum apnesi. Neostigmin AChE'yi geri dönüşümlü inhibe eder. Remifentanil (doku ve plazma esterazları, CSHT 4 dk) ve esmolol (eritrosit esterazları) kısa etkilidir. [[K1 s. 20]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="5"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/04">← Bölüm 4 · Hücre zarı</a>
    <a href="#/dersler/fizyoloji/06">Sonraki: Bölüm 6 · Üst hava yolları →</a>
  </nav>
</section>`,
  };
}
