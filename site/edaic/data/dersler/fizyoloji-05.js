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
  const NAV = [['d05-tanim', 'Katalizör'], ['d05-mekanizma', 'Nasıl çalışır?'], ['d05-aktif', 'Aktif bölge'], ['d05-ca', 'Karbonik anhidraz'], ['d05-denge', 'Ters tepkime ve denge'], ['d05-sinif', 'Sınıflar'], ['d05-kofaktor', 'Kofaktör ve koenzim'], ['d05-klinik', 'Klinik önem'], ['d05-p1', 'Part I'], ['d05-p2', 'Part II'], ['d05-ozet', 'Özet']];

  SAYFALAR['dersler/fizyoloji/05'] = {
    grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 1 · Temel bilgiler · Bölüm 5', baslik: 'Enzimler',
    lede: 'Enzimler metabolik tepkimeleri hızlandıran biyolojik katalizörlerdir. Bu bölüm enzimin nasıl çalıştığını, nasıl sınıflandığını ve anestezide kullandığımız birçok ilacın etkisini nasıl sonlandırdığını işler. [[K1 s. 18–20]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d05-tanim">
  <h2>Katalizör ve enzim</h2>
  <div class="blk-body">
    <p><b>Katalizör</b>, kendisi kimyasal olarak değişmeden bir kimyasal tepkimenin hızını artıran maddedir. Tepkimede tüketilmediği için aynı molekül tepkimeye tekrar tekrar katılabilir; bu yüzden görece az sayıda katalizör molekülü yeterlidir. <b>Enzimler</b>, işlevi metabolik tepkimelerin hızını artırmak olan biyolojik katalizörlerdir. [[K1 s. 18]]</p>
    <p>Enzimler karmaşık, üç boyutlu proteinlerdir ve üç önemli özellikleri vardır. [[K1 s. 18]]</p>
  </div>
  <div class="cols cols-3" style="margin-top:16px">
    <div class="card basic"><span class="tag basic">1 · Kataliz</span><h3>Hızlandırır, tükenmez</h3><p>Enzimler biyolojik tepkimelerin katalizörüdür: tepkimeyi hızlandırır ve tepkimeden değişmeden çıkar. [[K1 s. 18]]</p></div>
    <div class="card basic"><span class="tag basic">2 · Özgüllük</span><h3>Aktif bölge</h3><p>Üç boyutlu yapı, tepkimeye giren moleküller (substratlar) için son derece özgül bir bağlanma bölgesi oluşturur: <b>aktif bölge</b>. Aktif bölge aynı molekülün farklı stereoizomerlerini bile ayırt edebilir. [[K1 s. 18]]</p></div>
    <div class="card basic"><span class="tag basic">3 · Düzenleme</span><h3>Hız sınırlayıcı basamak</h3><p>Biyokimyasal yollardaki (ör. glikolitik yol) birçok tepkime enzimsiz çok yavaştır. Bu yüzden yolun hızı, yol üzerindeki enzimlerin, özellikle hız sınırlayıcı basamağı kontrol eden enzimin etkinliği düzenlenerek denetlenir. Glikolizde bu enzim <b>fosfofruktokinazdır</b>. [[K1 s. 18]]</p></div>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Enzimlerin hemen hepsi proteindir. Bilinen istisna katalitik RNA molekülleridir (ribozimler); örneğin ribozomda peptit bağını kuran katalitik merkez ribozomal RNA'dan oluşur.</div>
</section>

<section class="wrap blk ders-sec" id="d05-mekanizma">
  <h2>Enzim nasıl çalışır?</h2>
  <p class="intro">Enzim substratları belirli bir yönelimde bağlar ve onları birbirleriyle tepkimeye girecekleri en uygun konuma getirir. Bu, kimyasal tepkimenin <b>aktivasyon enerjisini</b> düşürür ve tepkime hızını çarpıcı biçimde artırır. Aşağıdaki modelde enzimin aynı engeli hem ileri hem geri yönde alçalttığına, bu yüzden dengeye çok daha çabuk ulaşıldığına ama dengenin yerinin değişmediğine bakın. [[K1 s. 18]]</p>
  <div class="viz"><div data-viz="f05_enerji"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Enzim, başlangıç ve son durum arasındaki serbest enerji farkını (ΔG), dolayısıyla denge sabitini değiştirmez; yalnızca dengeye ulaşma süresini kısaltır. Enerjice elverişsiz bir tepkimeyi tek başına yürütemez; bunun için tepkimenin ATP hidrolizi gibi elverişli bir tepkimeyle eşleşmesi gerekir. Ligazların ATP hidrolizinden gelen enerjiyi kullanması [[K1 s. 19]] bunun örneğidir.</div>
</section>

<section class="wrap blk ders-sec" id="d05-aktif">
  <h2>Aktif bölge: biçim belirleyicidir</h2>
  <p class="intro">Aktif bölgenin üç boyutlu biçimi kritik önemdedir. Biçimi değişirse, örneğin sıcaklık artışı ya da pH değişikliğiyle, enzimin işlevi bozulabilir ve tepkime yavaşlar. [[K1 s. 18]] Bölüm 1'de de geçtiği gibi enzimler dar bir pH aralığında verimli çalışır; uç pH değerleri proteinlerin üçüncül ve dördüncül yapısını bozar (denatürasyon). Enzim kinetiğinin optimal sıcaklık aralığı da dardır. [[K1 s. 2–3]]</p>
  <div class="viz"><div data-viz="f05_aktif"></div></div>
</section>

<section class="wrap blk ders-sec" id="d05-ca">
  <h2>Örnek: karbonik anhidraz</h2>
  <p class="intro">CO₂ ile suyun karbonik asit (H₂CO₃) oluşturduğu tepkime kendiliğinden çok yavaştır. Aktif bölgesinde bir çinko atomu bulunan <b>karbonik anhidraz</b> (CA) karışıma eklenince tepkime belirgin biçimde hızlanır. Önce su çinkoya bağlanır; komşu bir histidin kalıntısı sudan bir H⁺ koparır ve çinkoya bağlı, çok etkin bir OH⁻ kalır. Aktif bölgede CO₂'nin tam oturduğu bir cep vardır: CO₂ ile OH⁻ yan yana gelince tepkime hızla gerçekleşir. Ürün enzimden ayrılır, enzim kimyasal olarak değişmeden kalır. [[K1 s. 18]]</p>
  <div class="viz"><div data-viz="f05_ca"></div></div>
  <p class="small muted" style="margin-top:10px">Kanda bu tepkime eritrositte hızla yürür: eritrosit sitoplazmasında bol miktarda CA vardır, plazmada yoktur. Ayrıntısı Bölüm 9'da (karbondioksit taşınması). [[K1 s. 37]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Mekanizma düzeyinde çinkodaki OH⁻'nin CO₂'ye bağlanmasıyla doğrudan bikarbonat (HCO₃⁻) oluşur; histidinin aldığı H⁺ ile birlikte bu, kitapta yazılan H₂CO₃'e eşdeğerdir [[K1 s. 18]]; H₂CO₃ zaten hemen hemen tamamen H⁺ ve HCO₃⁻'ye ayrışır [[K1 s. 37]]. Animasyonda ürün bu nedenle HCO₃⁻ ve H⁺ olarak gösterildi.</div>
</section>

<section class="wrap blk ders-sec" id="d05-denge">
  <h2>Ters tepkime ve Le Chatelier ilkesi</h2>
  <div class="blk-body">
    <p>Aynı enzim ters tepkimeyi de katalizleyebilir. CA için de durum budur: H₂CO₃'ü yeniden su ve CO₂'ye çevirir. Kitabın örneği gazlı içeceklerdir: kap açıldığında gazlarını oldukça yavaş kaybederler, CA içeren tükürükle temas edince ise çok hızlı kaybederler; kitap içeceğin dilde "köpürür" gibi hissedilmesini buna bağlar. [[K1 s. 18]]</p>
    <p>Tepkimenin net yönü <b>Le Chatelier ilkesine</b> uyar: dengedeki bir sistemde konsantrasyon ya da parsiyel basınç değişirse denge bu değişikliği karşılayacak yönde kayar ve yeni bir denge kurulur. Yönü enzim belirlemez; enzim dengeye ulaşılma hızını artırır. Yukarıdaki enerji modelinde "S ekle" düğmesiyle bunu deneyebilirsiniz. [[K1 s. 18]]</p>
  </div>
  <div class="cols" style="margin-top:16px">
    <div class="card clin"><span class="tag clin">Dokuda · ileri yön</span><h3>CO₂ + H₂O → H⁺ + HCO₃⁻</h3><p>Dokudan gelen CO₂ eritrositte CA ile H₂CO₃'e, o da hemen hemen tamamen H⁺ ve HCO₃⁻'ye dönüşür. HCO₃⁻ klorür kaymasıyla hücreden çıkar, H⁺ hemoglobindeki histidinlere bağlanır. Ürünler ortamdan uzaklaştırıldığı için tepkime ileri yönde sürer. [[K1 s. 37]]</p></div>
    <div class="card clin"><span class="tag clin">Akciğerde · ters yön</span><h3>H⁺ + HCO₃⁻ → CO₂ + H₂O</h3><p>Akciğerde oksijenlenen hemoglobin H⁺ bırakır. H⁺ ile HCO₃⁻ H₂CO₃ oluşturur ve CA'nın katalizlediği tepkimeyle CO₂ açığa çıkar. CO₂ alveollere difüze olup kandan uzaklaştıkça tepkime bu yönde sürer. [[K1 s. 38]] [[K1 s. 18]]</p></div>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Karbonasyon hissinde ileri tepkimenin de rolü gösterilmiştir. Farelerde yapılan deneysel çalışmalarda dildeki ekşi tat hücrelerinin yüzeyindeki bir CA izoenziminin CO₂'den H⁺ ürettiği ve bu H⁺'ın hücreleri uyardığı bulunmuştur. CA inhibitörü asetazolamid alan kişilerin (ör. yükseklik hastalığı profilaksisinde) gazlı içecekleri yavan bulması da CA'nın bu histeki payını gösterir. Sınav açısından akılda tutulacak nokta değişmez: CA iki yönü de katalizler.</div>
</section>

<section class="wrap blk ders-sec" id="d05-sinif">
  <h2>Enzim sınıfları</h2>
  <p class="intro">Enzimler katalizledikleri tepkimenin türüne göre sınıflandırılır. Kitap altı sınıf sayar. Bir sınıfa basınca o sınıfa ait örnek bir tepkime oynar; örnek tepkimeler ve bu bölümdeki enzimlerin sınıfları atlas notudur. [[K1 s. 19]]</p>
  <div class="viz"><div data-viz="f05_sinif"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · güncel sınıflama.</b> Kitaptaki altı sınıf, Uluslararası Biyokimya ve Moleküler Biyoloji Birliği'nin (IUBMB) EC 1–6 sınıflarıdır. IUBMB 2018'de yedinci sınıfı ekledi: <b>translokazlar</b> (EC 7), iyonların ya da moleküllerin zarlar boyunca taşınmasını katalizleyen enzimler (ör. Na⁺/K⁺-ATPaz). Bileşende bu sınıf ayrı işaretlidir.</div>
</section>

<section class="wrap blk ders-sec" id="d05-kofaktor">
  <h2>Kofaktör ve koenzim</h2>
  <p class="intro">Bazı enzimler yalnızca proteinden oluşur ve tepkimeyi tek başına katalizler. Diğerleri etkinlikleri için protein olmayan yardımcı moleküllere, <b>kofaktörlere</b>, gereksinim duyar. Kofaktör inorganik ya da organik olabilir; organik kofaktöre <b>koenzim</b> denir. [[K1 s. 19]]</p>
  <div class="cols">
    <div class="card basic"><span class="tag basic">İnorganik · metal iyonları</span><h3>Aktif bölgede metal</h3>
      <div class="f05-kof">
        <span><b>Zn²⁺</b>karbonik anhidraz</span>
        <span><b>Fe²⁺</b>sitokrom P450 grubunun tümü</span>
        <span><b>Co²⁺</b>B₁₂ vitamini</span>
        <span><b>Cu²⁺</b>süperoksit dismutaz</span>
        <span><b>Mg²⁺</b>hekzokinaz</span>
      </div>
      <p class="small muted" style="margin-top:10px">Kitaptaki liste. [[K1 s. 19]]</p>
    </div>
    <div class="card basic"><span class="tag basic">Organik · koenzim</span><h3>Grup ya da elektron taşıyıcısı</h3>
      <div class="f05-kof">
        <span><b>CoA</b>Koenzim A: açil grubu taşır; birçok enzim kullanır (ör. asetil-CoA karboksilaz)</span>
        <span><b>NAD⁺</b>Nikotinamid adenin dinükleotit: hidrür (H⁻) iyonu kabul eder; ör. alkol dehidrogenazla birlikte</span>
      </div>
      <p class="small muted" style="margin-top:10px">Kitaptaki örnekler. [[K1 s. 19]]</p>
    </div>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu · liste sadeleştirilmiştir.</b> <b>Sitokrom P450:</b> demir hem grubundadır; dinlenimdeki enzimde Fe³⁺ hâlindedir ve katalitik döngüde Fe²⁺'ye indirgenir. Adındaki 450, indirgenmiş enzimin karbon monoksit bağladığında 450 nm'de verdiği emilim tepesinden gelir. <b>B₁₂ vitamini</b> (kobalamin) bir enzim değil, kobalt içeren organik bir kofaktördür; kararlı biçimlerinde (ör. siyanokobalamin) kobalt Co³⁺ hâlindedir; metiyonin sentaz gibi enzimler onun koenzim biçimlerini kullanır. Nitröz oksit bu kobaltı oksitleyerek metiyonin sentazı inaktive eder. <b>Süperoksit dismutaz:</b> sitoplazmadaki biçimi bakır ve çinko, mitokondrideki biçimi manganez içerir. <b>Hekzokinaz:</b> Mg²⁺ asıl olarak ATP ile kompleks (MgATP) hâlinde iş görür.</div>
</section>

<section class="wrap blk ders-sec" id="d05-klinik">
  <h2>Klinik önem: enzimler ve anestezist</h2>
  <p class="intro">Enzimler anestezi pratiğinde çok önemlidir. Kullandığımız ilaçların birçoğunun etkisi enzimatik etkinlikle sonlanır; bazıları doğrudan bir enzimi inhibe ederek etki eder. Bazı hastalıklar da enzim etkinliğinin azalmasından kaynaklanır. [[K1 s. 20]]</p>
  <div class="cols cols-3">
    <div class="card clin"><span class="tag clin">Sitokrom P450</span><h3>Çoğu anestezi ilacı</h3><p>Bu enzim süperailesi anestezide kullanılan ilaçların çoğunun metabolizmasından sorumludur. Önemli istisnalar: atrakuryum ve sisatrakuryum (esas olarak Hofmann eliminasyonuyla yıkılır), katekolaminler, süksametonyum, mivakuryum ve remifentanil. [[K1 s. 20]]</p></div>
    <div class="card clin"><span class="tag clin">Monoamin oksidaz</span><h3>MAO ve MAO inhibitörleri</h3><p>Monoamin katekolaminler (adrenalin, dopamin, noradrenalin) bu mitokondriyal enzimle yıkılır. MAO inhibitörleri antidepresandır: dolaylı etkili sempatomimetikler ölümcül olabilen bir hipertansif krize yol açabilir. Gerekirse doğrudan etkili sempatomimetikler azaltılmış dozda kullanılabilir, çünkü bunlar katekol-O-metil transferazla (COMT) da yıkılır. Serotoninin yıkımında da MAO rol oynar; MAO inhibitörleri petidin gibi başka serotonerjik ilaçlarla birlikte kullanılırsa serotonin sendromu ortaya çıkabilir. [[K1 s. 20]]</p></div>
    <div class="card clin"><span class="tag clin">Psödokolinesteraz</span><h3>Süksametonyum apnesi</h3><p>Plazma kolinesterazı ya da bütirilkolinesteraz da denir. Süksametonyumu ve mivakuryumu yıkan bir plazma enzimidir. Bu enzimi olmayan ya da etkinliği azalmış hastalarda bir doz süksametonyum ya da mivakuryumdan sonra kas paralizisi uzar: "süksametonyum apnesi". [[K1 s. 20]]</p></div>
    <div class="card clin"><span class="tag clin">Asetilkolinesteraz</span><h3>AChE ve neostigmin</h3><p>Nöromüsküler kavşağın sinaptik aralığındadır; nörotransmiter ACh'yi hidrolize ederek iletimi sonlandırır. Geri dönüşümlü bir AChE inhibitörü olan neostigmin aralıktaki ACh'yi artırır; artan ACh nondepolarizan kas gevşeticileri reseptörlerinden kompetitif olarak uzaklaştırır. [[K1 s. 20]]</p></div>
    <div class="card clin"><span class="tag clin">Doku ve plazma esterazları</span><h3>Remifentanil</h3><p>Özgül olmayan doku ve plazma esterazları çok kısa etkili opioid remifentanili hızla hidrolize eder. Bu yüzden birikmez; bağlam duyarlı yarılanma süresi uzun süreli infüzyondan sonra bile 4 dakikada kalır. [[K1 s. 20]]</p></div>
    <div class="card clin"><span class="tag clin">Eritrosit esterazları</span><h3>Esmolol</h3><p>Anestezide taşiaritmilerin tedavisinde, kalp cerrahisinde kalp hızı ve kan basıncının kontrolünde kullanılan "kardiyoselektif" β₁ antagonisti esmolol eritrosit esterazlarıyla hızla yıkılır; ilaç kesilince etkisi hızla biter. [[K1 s. 20]]</p></div>
  </div>
  <div class="viz" style="margin-top:16px"><div data-viz="f05_kolin"></div></div>
  <div class="cols" style="margin-top:14px">
    <div class="note plain"><b>Atlas notu · MAO ve serotonin.</b> Kitaptaki "MAO inhibitörleri serotoninin yıkımında da rol oynar" cümlesinde kastedilen enzimin kendisidir: serotonini MAO yıkar, MAO inhibitörleri bu yıkımı engeller. Serotonin sendromu riski de buradan, yani serotoninin birikmesinden gelir. Dolaylı etkili sempatomimetikler sinir ucundaki noradrenalini serbestleştirerek etki eder; MAO inhibisyonu bu depoyu büyüttüğü için yanıt abartılı olur.</div>
    <div class="note plain"><b>Atlas notu · Hofmann eliminasyonu.</b> Hofmann eliminasyonu enzimatik değildir: vücut pH'ı ve sıcaklığında kendiliğinden yürüyen kimyasal bir yıkımdır; bu yüzden karaciğer ve böbrek işlevinden büyük ölçüde bağımsızdır. Atrakuryumda özgül olmayan esterazlarla ester hidrolizi de önemli bir yoldur; sisatrakuryumda Hofmann eliminasyonu baskındır.</div>
  </div>
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
