/* Fizyoloji Bölüm 66 · Karaciğer işlevi (K1 İngilizce baskı s. 299–306).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz66-1'] = {
  no: 1, kok: 'Karaciğerin metabolik ve ekzokrin işlevleri için:', kagit: 'Paper A · fizyoloji, Bölüm 66', kaynak: '[[K1 s. 299–300]]',
  onermeler: [
    { t: 'Karaciğer glikojen olarak yaklaşık 1000 g glukoz depolayabilir.', d: false, n: 'Yanlış. Karaciğer glikojen biçiminde en çok yaklaşık 100 g glukoz depolar. [[K1 s. 299]]' },
    { t: 'Glukagon hem glikojenolizi hem de amino asit, laktat ve gliserolden glukoneogenezi uyarır.', d: true, n: 'Doğru. Öğün aralarında glukoz düşünce insülin azalır, glukagon salınır; karaciğer glikojeni yıkar ve karbonhidrat olmayan öncüllerden glukoz yapar. [[K1 s. 299]]' },
    { t: 'Deaminasyonda açığa çıkan amonyak karaciğerde üreye ya da glutamine çevrilerek detoksifiye edilir.', d: true, n: 'Doğru. Deaminasyonun öteki ürünü olan keto asit enerji, başka bir amino asit ya da glukoneogenez için kullanılır. [[K1 s. 300]]' },
    { t: 'Safra kesesi safrayı yaklaşık yarı hacmine yoğunlaştırır.', d: false, n: 'Yanlış. Hepatositler günde yaklaşık 1000 mL safra yapar; kese onu hacminin beşte birine yoğunlaştırır. [[K1 s. 300]]' },
    { t: 'Esansiyel amino asitler karaciğerde transaminasyonla keto asitlerden sentezlenebilir.', d: false, n: 'Yanlış. Transaminasyonla yalnız esansiyel olmayan amino asitler yapılır; esansiyel amino asitler vücutta sentezlenemez, yalnız diyetle alınır. [[K1 s. 300]]' },
  ],
};
VERI.sorular['fiz66-2'] = {
  no: 2, kok: 'Bilirubin metabolizması ve sarılık için:', kagit: 'Paper A · fizyoloji, Bölüm 66', kaynak: '[[K1 s. 300–302]]',
  onermeler: [
    { t: 'Konjuge olmayan bilirubin suda çözünmez ve kanda albümine bağlı taşınır.', d: true, n: 'Doğru. Bu yüzden glomerülden süzülmez. [[K1 s. 300–301]]' },
    { t: 'Bilirubini glukuronik asite bağlayan enzim glukuronosiltransferazdır; Gilbert sendromunda etkinliği azalmıştır.', d: true, n: 'Doğru. Gilbert sendromu ve yenidoğan sarılığında (olgunlaşmamış enzim) plazmada konjuge olmayan bilirubin yükselir. [[K1 s. 300–301]]' },
    { t: 'Pre-hepatik sarılıkta idrar dipstick testi bilirubin için pozitiftir.', d: false, n: 'Yanlış. Fazla olan konjuge olmayan bilirubindir; suda çözünmediği için süzülmez ve dipstick negatiftir. [[K1 s. 301]]' },
    { t: 'Dışkıya kahverengi rengini ürobilinojen verir.', d: false, n: 'Yanlış. Rengi, ürobilinojenin oksitlenmesiyle oluşan sterkobilin verir; geri emilip böbrekten atılan ürobilinojen idrara sarı rengini verir. [[K1 s. 300–301]]' },
    { t: 'Koledok taşına bağlı sarılıkta dışkı soluk renklidir.', d: true, n: 'Doğru. Konjuge bilirubin bağırsağa ulaşmadığı için ürobilinojen ve sterkobilin oluşmaz; idrar dipstick testi ise pozitiftir. [[K1 s. 301–302]]' },
  ],
};
VERI.sorular['fiz66-3'] = {
  no: 3, kok: 'İlaç metabolizması ve karaciğer işlev testleri için:', kagit: 'Paper A · fizyoloji, Bölüm 66', kaynak: '[[K1 s. 303–305]]',
  onermeler: [
    { t: 'Faz 1 tepkimelerinin ürünleri her zaman farmakolojik olarak etkisizdir.', d: false, n: 'Yanlış. Faz 1 metabolitleri etkin olabilir, bazen ana ilaçtan daha da etkindir. [[K1 s. 303]]' },
    { t: 'Fenitoin, karbamazepin ve rifampisin karaciğer enzimlerini indükler.', d: true, n: 'Doğru. İndükleyiciler: fenitoin, karbamazepin, barbitüratlar, rifampisin, kronik alkol, sigara (PC BRAS). [[K1 s. 303]]' },
    { t: 'Eritromisin siklosporin metabolizmasını hızlandırarak düzeyini düşürür.', d: false, n: 'Yanlış. Eritromisin enzim inhibitörüdür; siklosporin metabolizmasını yavaşlatır ve toksisiteye yol açabilir. [[K1 s. 303]]' },
    { t: 'Akut karaciğer hasarında PT, serum albümininden daha iyi bir sentez işlevi göstergesidir.', d: true, n: 'Doğru. PT\'yi belirleyen faktörlerin yarı ömrü 24 saatten kısadır; albüminin yarı ömrü 30 gündür. [[K1 s. 304–305]]' },
    { t: 'Serum NH₃ düzeyi hepatik ensefalopatinin klinik ağırlığıyla yakından ilişkilidir.', d: false, n: 'Yanlış. NH₃ ensefalopatiden sorumlu tutulur ama serum düzeyi klinik ağırlıkla pek iyi ilişkili değildir. [[K1 s. 305]]' },
  ],
};

const D66_NAV = [
  ['d66-rezerv', 'Rezerv ve rejenerasyon'], ['d66-metab', 'Metabolik işlevler'], ['d66-safra', 'Safra'], ['d66-bilirubin', 'Bilirubin'],
  ['d66-sarilik', 'Sarılık'], ['d66-endokrin', 'Endokrin ve bağışıklık'], ['d66-sentez', 'Sentez'], ['d66-ilac', 'İlaç metabolizması'],
  ['d66-ilacklinik', 'İlaç metabolizmasını etkileyenler'], ['d66-diger', 'Diğer işlevler'], ['d66-siroz', 'Siroz'], ['d66-kft', 'İşlev testleri'],
  ['d66-kings', "King's College ölçütleri"],
  ['d66-p1', 'Part I'], ['d66-p2', 'Part II'], ['d66-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/66'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 5 · Bölüm 66', baslik: 'Karaciğer işlevi',
  lede: 'Karaciğer çok sayıda molekülü sentezleyen ve ortadan kaldıran stratejik bir biyokimya organıdır. Anestezist için en önemlisi ilaç metabolizması, pıhtılaşma faktörleri, bilirubin ve siroz fizyolojisidir. [[K1 s. 299–305]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D66_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d66-rezerv">
  <h2>Büyük rezerv, rejenerasyon ve işlevlerin sınıflaması</h2>
  <p class="intro">Sağlıklı karaciğerin iki ayırt edici özelliği vardır: dokunun çoğu kaybedilse de işini sürdürür ve kaybedilen kütleyi yeniden yapar. [[K1 s. 299]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Rezeksiyondan sonra karaciğer</h3></div>
    <div data-viz="f66_rejen"></div>
    <p class="viz-cap" aria-live="polite"><b>Rezeksiyon yok.</b> Karaciğer kütlesinin tamamı yerinde. Çıkarılan oranı artırın ya da canlı donör naklini oynatın. [[K1 s. 299]]</p>
    <p class="viz-foot">Şematik; %80, dörtte üç, %50–60 ve 6–8 hafta kitaptandır, büyüme eğrisinin biçimi temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Rezerv.</b> Karaciğerin %80'i çıkarılsa bile kalan doku bütün fizyolojik işlevleri sürdürebilir. <b>Rejenerasyon.</b> Diğer organlardan farklı olarak dörtte üçüne kadarı rezeke edilen karaciğer, aktif mitozla normal kütlesine döner. [[K1 s. 299]]</p>
    <p>Bu yetenek canlı donör naklinde kullanılır: sağ lobun dört segmenti (karaciğer kütlesinin %50–60'ı) donörden alıcıya aktarılır. Donörde kalan karaciğer 6–8 haftada tam boyuta ulaşır, alıcıda biraz daha uzun sürer; sonunda ikisinin de normal boyutlu, tam işlevli karaciğeri olur. [[K1 s. 299]]</p>
    <p>İşlevler kabaca yedi grupta toplanır: <b>metabolik, ekzokrin, endokrin, bağışıklık, sentez, ilaçların hepatik klirensi</b> ve <b>diğer</b> işlevler. Aşağıdaki bölümler bu sırayı izler. [[K1 s. 299]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-metab">
  <h2>Metabolik işlevler: karbonhidrat, yağ ve protein</h2>
  <p class="intro">Karaciğer plazma glukozunu sabit tutar, yağı yakar, yapar ve paketler, amino asitleri yıkıp azotu zararsız hâle getirir; tokluk ve açlıkta yönü insülin ile glukagon belirler. [[K1 s. 299–300]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hepatositte tokluk, açlık ve protein yolu</h3></div>
    <div data-viz="f66_metab"></div>
    <p class="viz-cap" aria-live="polite"><b>Tokluk.</b> Plazma glukozu yükselir, pankreas insülin salar; hepatosit fazla glukozu glikojene çevirir, kalanından trigliserit yapar. Bir durum seçin. [[K1 s. 299]]</p>
    <p class="viz-foot">Şematik hepatosit; ok kalınlıkları temsilîdir. Ayrıntılı biyokimya: Bölüm 77.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Karbonhidrat.</b> Her hücre gibi hepatosit de glukozu pirüvata çevirerek enerji üretir (glikoliz). Yemekten sonra insülin, fazla glukozun glikojen olarak depolanmasını uyarır (glikojenez); bu yolla en çok yaklaşık 100 g glukoz saklanır. Öğün aralarında insülin azalır, glukagon artar: karaciğer glikojeni yıkar (glikojenoliz) ve amino asit, laktat, gliserol gibi karbonhidrat olmayan öncüllerden glukoz yapar (glukoneogenez). [[K1 s. 299]]</p>
    <p><b>Yağ.</b> Lipit vücudun en verimli enerji deposudur. Serbest yağ asitleri hepatosit mitokondrisinde β-oksidasyonla yakılır. Karaciğer fazla glukozdan trigliserit ve kolesterol yapar; kolesterol hücre zarının yapı taşı, steroid hormonların ve safra tuzlarının öncülüdür. Burada yapılan apolipoproteinler kolesterol ve trigliseridi LDL, VLDL ve HDL olarak paketler. [[K1 s. 299]]</p>
    <p><b>Protein.</b> Deaminasyon amino asidin amino grubunu çıkarır; kalan karbon iskeleti (keto asit) sitrik asit döngüsünde enerjiye, başka bir amino aside ya da glukoneogenez substratına dönüşür, öteki ürün amonyak (NH₃) ise üre ya da glutamin yapılarak detoksifiye edilir. Transaminasyon, bir amino asidin amino grubunu keto aside aktararak esansiyel olmayan amino asitleri yapar; esansiyel amino asitler yalnız diyetle gelir. Karaciğer, immünoglobulinler ve bazı hormonlar dışında plazma proteinlerinin çoğunu sentezler. [[K1 s. 300]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-safra">
  <h2>Ekzokrin işlev: safra ve yağın emilimi</h2>
  <p class="intro">Karaciğerin ekzokrin ürünü safradır; içindeki safra tuzları olmadan diyet yağı sindirilemez. [[K1 s. 300]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Safra tuzları yağı nasıl emilir hâle getirir?</h3></div>
    <div data-viz="f66_misel"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Safra.</b> Hepatositler günde yaklaşık 1000 mL safra yapar; safra kesesi onu hacminin beşte birine yoğunlaştırır. "İleri"ye basın. [[K1 s. 300]]</p>
    <p class="viz-foot">Şematik; damlacık ve misel boyutları ölçekli değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Safranın başlıca bileşenleri su, elektrolitler, safra tuzları, safra pigmenti, kolesterol ve fosfolipitlerdir. Safra asitleri kolesterolün oksidasyonuyla oluşur; safra tuzları bunların Na⁺ ve K⁺ tuzlarıdır. [[K1 s. 300]]</p>
    <p>Anahtar özellik amfipatik yapıdır: safra tuzunun bir ucu hidrofobik, öteki hidrofiliktir. Bu sayede büyük yağ damlalarını küçük damlacıklara böler ve miseller oluşturur; misel olmadan pankreatik lipaz çekirdekteki yağa ulaşamaz. Yağda çözünen A, D, E ve K vitaminleri de aynı misel yoluyla emilir. [[K1 s. 300]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-bilirubin">
  <h2>Bilirubin metabolizması</h2>
  <p class="intro">Safra, hemoglobin yıkım ürünü bilirubinin (safra pigmenti) ana atılım yoludur; karaciğerin işi suda çözünmeyen bilirubini konjuge ederek atılabilir hâle getirmektir. [[K1 s. 300–301]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Alyuvardan dışkı ve idrara: on bir adım</h3></div>
    <div data-viz="f66_bilirubin"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Hb yıkımı.</b> Yaşlı ya da hasarlı alyuvarlar dalakta tutulur ve hemoglobinleri yıkılır. "İleri"ye basın ya da bir adım seçin. [[K1 s. 300]]</p>
    <p class="viz-foot">Şematik organ haritası; adım numaraları kitabın şekliyle aynıdır, miktarlar gösterilmez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Hemoglobinin yararlı parçaları geri kazanılır: globin amino asitlerine yıkılır, demir transferrine bağlanıp eritropoez için kemik iliğine gider (Bölüm 74). Porfirin halkası ise yeniden kullanılamaz; dalak makrofajlarında biliverdine oksitlenir, sonra bilirubine indirgenir. [[K1 s. 300]]</p>
    <p>Kilit adım konjugasyondur. Konjuge olmayan bilirubin suda çözünmez, albüminle taşınır ve glomerülden süzülmez. Hepatosit onu <b>glukuronosiltransferaz</b> ile glukuronik aside bağlayınca suda çözünür olur ve safraya atılabilir. Kalın bağırsakta bakteriler ürobilinojen yapar: oksitlenen kısmı sterkobilin olarak dışkıya kahverengi, geri emilip karaciğerden kaçan kısmı böbrekten atılarak idrara sarı rengini verir. [[K1 s. 300–301]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap ince bağırsaktaki konjuge bilirubinin neredeyse tamamının geri emildiğini yazar; oysa polar konjuge bilirubin bağırsaktan çok az emilir, enterohepatik dolaşıma giren esas olarak ürobilinojendir. Ayrıca hemden çıkan demir transferrine Fe²⁺ olarak değil, Fe³⁺ olarak bağlanır (kitap da s. 302'de bunu söyler).</div>
</section>

<section class="wrap blk ders-sec" id="d66-sarilik">
  <h2>Klinik önem: sarılık</h2>
  <p class="intro">Sarılık plazma bilirubininin 30 µmol/L'yi aşmasıdır; nedeni ya aşırı alyuvar yıkımı ya da atılım yolunun herhangi bir yerinde bozukluktur. [[K1 s. 301]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Sarılığın tipi: yol nerede tıkandı?</h3></div>
    <div data-viz="f66_sarilik"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> Bilirubin dalaktan karaciğere, safrayla bağırsağa akar; plazmada birikmez. Bir sarılık tipi seçin. [[K1 s. 300–301]]</p>
    <p class="viz-foot">Şematik; laboratuvar satırlarında yalnız kitabın belirttiği bulgular gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Bütün tabloyu tek kural açıklar: yalnız suda çözünen <b>konjuge</b> bilirubin glomerülden süzülür ve idrar dipstick testini pozitif yapar. [[K1 s. 301–302]]</p>
    <p><b>Pre-hepatik:</b> kan transfüzyonuna bağlı hemolitik anemi, orak hücre krizi ya da sıtmada üretilen bilirubin karaciğerin konjugasyon kapasitesini çok aşar; konjuge olmayan bilirubin yükselir, dipstick negatiftir. Anatomik olarak karaciğerde olsa da <b>konjugasyon bozuklukları</b> çoğu zaman bu gruba katılır: yenidoğan sarılığı (olgunlaşmamış glukuronosiltransferaz) ve Gilbert sendromu (enzim etkinliğinin azaldığı sık görülen genetik bozukluk). [[K1 s. 301]]</p>
    <p><b>Post-hepatik:</b> koledoğu tıkayan taş gibi nedenlerle safraya atılamayan konjuge bilirubin sistemik dolaşıma geçer; idrarda bilirubin pozitiftir, bağırsağa ulaşmadığı için ürobilinojen ve sterkobilin oluşmaz ve dışkı solar. <b>Hepatosellüler:</b> sirozda, akut viral hepatitte ve parasetamol toksisitesinde hepatosit nekrozu ve safra ağacının bozulması hem konjugasyonu hem atılımı azaltır; hangi bilirubinin baskın olacağı iki hasarın göreli derecesine bağlıdır. [[K1 s. 301–302]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap sarılık eşiğini (&gt; 30) ve King's College ölçütündeki kreatinini (&gt; 300) "pmol/L" diye yazar; doğru birim µmol/L'dir. Bu derste µmol/L kullanılır.</div>
</section>

<section class="wrap blk ders-sec" id="d66-endokrin">
  <h2>Endokrin ve bağışıklık işlevleri</h2>
  <p class="intro">Bağırsaktan ve pankreastan gelen kan sistemik dolaşıma girmeden önce karaciğerden geçer: karaciğer bu kandaki mikroorganizmaları süzer ve hormonları salgılar, etkinleştirir ya da yıkar. [[K1 s. 302]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Portal kan karaciğerden geçerken</h3></div>
    <div data-viz="f66_kapi"></div>
    <p class="viz-cap" aria-live="polite"><b>Mikroorganizmalar.</b> Bağırsaktan portal vene geçen bakteri, virüs ve parazitler sinüzoidleri döşeyen Kupffer hücrelerince fagosite edilir. "İnsülin"i seçin. [[K1 s. 302]]</p>
    <p class="viz-foot">Şematik sinüzoid; parçacık sayıları temsilîdir, yalnız "yarısına kadar" oranı kitaptandır.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Endokrin rol</th><th>Örnekler</th></tr></thead>
    <tbody>
      <tr><td><b>Hormon salgılama</b></td><td>Anjiyotensinojen, trombopoietin, hepsidin (Bölüm 74), insülin benzeri büyüme faktörü 1 (IGF-1)</td></tr>
      <tr><td><b>Hormon bağlayıcı protein yapımı</b></td><td>Tiroksin bağlayıcı globulin, seks hormonu bağlayıcı globulin</td></tr>
      <tr><td><b>Hormon etkinleştirme</b></td><td>T₄ → etkin T₃ ya da etkisiz ters T₃ (Bölüm 81); D vitamini aktivasyonunun ilk adımı (kolekalsiferolün 25-hidroksilasyonu)</td></tr>
      <tr><td><b>Hormon yıkımı</b></td><td>Aldosteron, ADH, östrojen; pankreasın portal vene saldığı insülinin yarısına kadarı</td></tr>
    </tbody>
  </table></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kupffer hücreleri sinüzoidleri döşeyen özelleşmiş makrofajlardır (Bölüm 65). Diğer makrofajlar gibi proinflamatuvar sitokin salgılayarak inflamasyonu da başlatırlar. Karaciğer ayrıca doğal bağışıklığın kilit parçasıdır: kompleman proteinlerini ve C-reaktif proteini sentezler. [[K1 s. 302]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-sentez">
  <h2>Sentez işlevi: pıhtılaşma ve taşıyıcı proteinler</h2>
  <p class="intro">Karaciğerin yapmadığı maddeleri saymak yaptıklarını saymaktan kısadır; anestezi için en önemlileri pıhtılaşma faktörleri ve ilaç bağlayan proteinlerdir. [[K1 s. 302]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Karaciğerin yaptığı plazma proteinleri</h3></div>
    <div data-viz="f66_sentez"></div>
    <p class="viz-cap" aria-live="polite"><b>Hemostaz.</b> Faktör I (fibrinojen), II (protrombin), V, VII, IX, X ve XI, antitrombin III, protein C ve protein S karaciğerde yapılır. Bir proteine dokunun ya da "K vitamini yok"u seçin. [[K1 s. 302]]</p>
    <p class="viz-foot">Şematik sınıflama haritası.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>K vitaminine bağımlı faktörler</b> II, VII, IX, X, protein C ve protein S'dir: sentezlerindeki γ-karboksilasyonda K vitamini kofaktördür. [[K1 s. 302]]</p>
    <p><b>Taşıyıcılar:</b> albümin (Bölüm 76); α-globulinlerden haptoglobin (hemolizde serbest Hb'yi bağlar), seruloplazmin (bakır) ve tiroksin bağlayıcı globulin; β-globulinlerden transferrin (Fe³⁺) ve seks hormonu bağlayıcı globulin (androjen, östrojen); bazik ve nötr ilaçları taşıyan α₁-asit glikoprotein. γ-globulinlerin en önemli alt grubu olan <b>immünoglobulinler</b> karaciğerde değil, plazma hücrelerinde yapılır (Bölüm 75). [[K1 s. 302]]</p>
    <p><b>α₁-antitripsin</b> bir serin proteaz inhibitörüdür; dokuları etkinleşmiş inflamatuvar hücrelerin saldığı nötrofil elastaz gibi enzimlerden korur. Genetik eksikliğinde elastaz akciğerde elastik dokuyu yıkar ve sigara içilmese de KOAH gelişir; karaciğerde süregen inflamasyon siroza ilerler. [[K1 s. 302–303]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-ilac">
  <h2>İlaç metabolizmasının üç evresi</h2>
  <p class="intro">Karaciğer yağda çözünen ilaçları adım adım suda çözünür hâle getirip atar: faz 1 değiştirir, faz 2 bağlar, faz 3 dışarı pompalar. [[K1 s. 303]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Bir ilaç molekülünün hepatositteki yolu</h3></div>
    <div data-viz="f66_faz"></div>
    <p class="viz-cap" aria-live="polite"><b>Giriş.</b> Yağda çözünen ilaç hepatosite girer; bu hâliyle idrar ya da safrayla atılamaz. "İleri"ye basın. [[K1 s. 303]]</p>
    <p class="viz-foot">Şematik molekül; polarlık rengi temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Faz 1 (değiştirme):</b> sitokrom P450 enzimleri oksidasyon, redüksiyon ve hidrolizle ilacı daha polar (hidrofilik) yapar. Metabolit etkin, hatta ana ilaçtan daha etkin olabilir; yeterince suda çözünürse burada atılır, değilse faz 2'ye geçer. [[K1 s. 303]]</p>
    <p><b>Faz 2 (konjugasyon):</b> ilaç ya da faz 1 ürünü glukuronik asit, asetat ya da sülfata bağlanır (glukuronidasyon, asetilasyon, sülfatasyon); ürün safra ya da idrarla atılmaya hazır, suda çözünür bir metabolittir. <b>Faz 3 (atılım):</b> yakın zamanda tanımlanan bu evrede metabolitler ATP'ye bağımlı olarak safraya atılır. [[K1 s. 303]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-ilacklinik">
  <h2>Klinik önem: ilaç metabolizmasını etkileyenler</h2>
  <p class="intro">Aynı ilaç hastadan hastaya çok farklı hızda yıkılır; başlıca iki neden faz 1 ve faz 2 enzimlerindeki genetik farklar ve P450'yi uyaran ya da baskılayan diğer ilaçlardır. [[K1 s. 303]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Genotip ve ilaç etkileşimi plazma düzeyini nasıl değiştirir?</h3></div>
    <div data-viz="f66_cyp"></div>
    <p class="viz-cap" aria-live="polite"><b>Kodein · normal metabolizör.</b> Ön ilaç kodein CYP2D6 ile morfine çevrilir; morfin düzeyi analjezik aralığa çıkar. Bir fenotip ya da etkileşim seçin. [[K1 s. 303]]</p>
    <p class="viz-foot">Model: eğriler temsilîdir; yalnız oranlar (%6, %1–2) kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Kodein.</b> Beyaz ırktan hastaların yaklaşık %6'sında CYP2D6 etkisiz ya da işlevsizdir: kodeinden analjezi görmezler ama bulantı ve kabızlık çoğu zaman yine olur. %1–2'si ultra hızlı metabolizördür ve plazma morfini hızla yükselir; böyle bir annenin emzirdiği bebek sütle opioid doz aşımına uğrayabilir, bu yüzden kodein emziren annelerde artık önerilmez. [[K1 s. 303]]</p>
    <p><b>Asetilasyon.</b> Hastalar hızlı ve yavaş asetilleyici olarak ikiye ayrılır; izoniazid gibi asetillenen ilaçların yarı ömrü buna göre çok farklıdır. <b>Alkol</b> iki faz 1 oksidasyonuyla (alkol dehidrogenaz, asetaldehit dehidrogenaz) yıkılır; Çin kökenli kişilerin yaklaşık %50'sinde etkin asetaldehit dehidrogenaz yoktur, bu yüzden yavaş etanol yıkımına bağlı akut sarhoşluk ve yüksek asetaldehite bağlı yüz kızarması sık görülür. [[K1 s. 303]]</p>
  </div>
  <div class="cols" style="margin-top:12px">
    <div class="card"><h3>İndükleyiciler · "PC BRAS"</h3><p>Fenitoin, karbamazepin, barbitüratlar (özellikle fenobarbiton), rifampisin, alkol (kronik kullanım), sigara (olanzapin ve aminofilini yıkan CYP1A2'yi indükler). Örnek: enzim indükleyici alan hastada oral kontraseptif hızla yıkılır, gebelik riski doğar. [[K1 s. 303]]</p></div>
    <div class="card"><h3>İnhibitörler · "OA DEVICES"</h3><p>Omeprazol, allopürinol, disülfiram, eritromisin, valproat, izoniazid, simetidin, etanol (akut alkol alımı), sülfonamidler. Örnek: yoğun bakımda prokinetik amaçla eritromisin verilen hastada siklosporin yıkımı yavaşlar, toksisite gelişebilir. [[K1 s. 303]]</p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-diger">
  <h2>Diğer işlevler: depo, kan yapımı, kan rezervuarı</h2>
  <p class="intro">Karaciğer bunlara ek olarak depo organı, fetüste kan yapım yeri ve sempatik uyarıyla boşalan bir kan rezervuarıdır. [[K1 s. 304]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Üç ek görev</h3></div>
    <div data-viz="f66_diger"></div>
    <p class="viz-cap" aria-live="polite"><b>Depo.</b> Glikojenin yanında demir, bakır ve yağda çözünen vitaminlerin başlıca depolandığı yer karaciğerdir. Bir göreve dokunun. [[K1 s. 304]]</p>
    <p class="viz-foot">Şematik; yalnız 250 mL kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Gebeliğin ilk üç ayında eritropoezin ana yeri fetal karaciğerdir. Erişkinde Kupffer hücreleri yaşlı ya da hasarlı alyuvarları dolaşımdan temizler, ama bu işin çoğunu dalak yapar. Sempatik uyarıda karaciğer sistemik dolaşıma 250 mL'ye kadar venöz kan verebilir (Bölüm 65). [[K1 s. 304]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-siroz">
  <h2>Siroz ve portal hipertansiyon</h2>
  <p class="intro">Nedeni ne olursa olsun süregen inflamasyon ve skar, karaciğeri fibroz ile rejenerasyonun düzensiz karışımına, siroza çevirir; sonuç hem işlev kaybı hem de portal hipertansiyondur. [[K1 s. 304]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Fibroz arttıkça portal basınç ve sonuçları</h3></div>
    <div data-viz="f66_portal"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal karaciğer.</b> Portal ven düşük basınçlı bir sistemdir: 5–10 mmHg. Fibrozu artırın. [[K1 s. 304]]</p>
    <p class="viz-foot">Model: fibroz–basınç ilişkisi temsilîdir; 5–10 mmHg ve &gt; 12 mmHg eşiği kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Nedenler:</b> viral hepatit, alkol, steatohepatit, metabolik hastalıklar (Wilson hastalığı, hemokromatoz), biliyer hastalıklar (primer biliyer siroz, primer sklerozan kolanjit) ve otoimmün hepatit. [[K1 s. 304]]</p>
    <p><b>İşlev kaybı:</b> karbonhidrat metabolizması bozulur (hiper- ya da hipoglisemi); protein sentezi azalır (pıhtılaşma bozukluğu, ödeme yatkınlık yapan ve ilaçların proteine bağlanmasını değiştiren hipoalbüminemi); ilaç metabolizması belirgin yavaşlayabilir; NH₃ yeterince temizlenmez ve hepatik ensefalopati gelişir. [[K1 s. 304]]</p>
    <p><b>Portal hipertansiyon</b> (&gt; 12 mmHg): fibroz sinüzoidleri bozup tıkar, akıma direnç artar. Yüksek venöz hidrostatik basınç sıvıyı periton boşluğuna süzer (asit); durgun sıvı ve görece immünsüpresyon nedeniyle asitin enfeksiyon riski yüksektir. Dalak kanı portal vene boşaldığından dalak göllenir ve büyür; fazla trombosit ve alyuvar tutulur, trombositopeni ve anemi gelişir. Portal ve sistemik dolaşım arasındaki kollateraller açılır: özofagus ve rektum varisleri, kaput medusa. Özellikle özofagus varisleri mekanik hasarla felaket boyutunda kanayabilir; azotlu moleküller karaciğeri atlayıp sistemik dolaşıma geçtiği için ensefalopati riski de artar. [[K1 s. 304]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-kft">
  <h2>Karaciğer işlev testleri</h2>
  <p class="intro">Karaciğer işlev testleri (KİT) karaciğer hastalığını tanımaya ve izlemeye yarar; ama büyük rezerv yüzünden işlev belirgin azalana dek normal kalabilir. Üç grupta toplanır: sentez, klirens ve enzim testleri. [[K1 s. 304–305]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Akut hasarda hangi sentez testi önce bozulur?</h3></div>
    <div data-viz="f66_kft"></div>
    <p class="viz-cap" aria-live="polite"><b>0. gün.</b> Akut hasar başlar, sentez durur. Zamanı ilerletin: kısa ömürlü pıhtılaşma faktörleri hemen düşer, albümin yavaş düşer. [[K1 s. 304–305]]</p>
    <p class="viz-foot">Model: sentezin tamamen durduğu varsayılır; 30 gün ve &lt; 24 saat yarı ömürleri kitaptandır, PT eğrisi temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Sentez testleri: albümin ve protrombin zamanı (PT).</b> Albüminin plazma yarı ömrü 30 gündür; hipoalbüminemi süregen hastalıkta yararlı bir ölçüdür, ama uzun yarı ömür, kapiller kaçak ve protein yıkımı yüzünden akut hastalıkta zayıf bir göstergedir. PT ekstrinsik yolu test eder (Bölüm 72) ve hepsi karaciğerde yapılan faktör II, V, VII, X ile fibrinojene bağlıdır; yarı ömürleri 24 saatten kısa olduğu için akut yetmezlikte etkili bir ölçüdür. [[K1 s. 304–305]]</p>
    <p><b>Klirens testleri: bilirubin ve NH₃.</b> Normalde karaciğerde üreye çevrilen NH₃, ağır işlev bozukluğunda serumda yükselir. Küçük, yüksüz ve osmotik olarak etkin NH₃ kan–beyin bariyerini geçerek beyin ödemi ve ensefalopatiye yol açar; ama serum düzeyi ensefalopatinin klinik ağırlığıyla pek iyi ilişkili değildir. [[K1 s. 305]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:12px"><table class="tbl">
    <thead><tr><th>Enzim</th><th>Nerede bulunur</th><th>Ne düşündürür</th></tr></thead>
    <tbody>
      <tr><td><b>ALP</b></td><td>Hepatositin biliyer kanalikül zarı; ayrıca böbrek, kemik, plasenta</td><td>Biliyer hastalık; normalin 3 katından fazlası intra- ya da ekstrahepatik biliyer tıkanma</td></tr>
      <tr><td><b>γ-GT</b></td><td>Kanalikülleri çevreleyen hepatositler; ALP ile benzer dokular, ama kemikte çok az</td><td>Biliyer tıkanma; yüksek ALP'nin kemikten mi karaciğerden mi geldiğini ayırır. ALP ya da ALT'ye göre orantısız yüksek γ-GT alkol kötüye kullanımını düşündürür</td></tr>
      <tr><td><b>ALT</b></td><td>Hepatosit sitozolü</td><td>Yaygın hepatosellüler hasar; örneğin parasetamol zehirlenmesindeki sentrilobüler nekroz</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">Enzim testleri hepatik işlev bozukluğunun kesin tanısına yardım eder. [[K1 s. 305]]</p>
</section>

<section class="wrap blk ders-sec" id="d66-kings">
  <h2>Klinik önem: King's College ölçütleri</h2>
  <p class="intro">Parasetamol zehirlenmesi sıktır ve karaciğer nakli ömür boyu immünsüpresyon demektir; bu yüzden hangi hastanın kötüleşip hayat kurtarıcı nakle ihtiyaç duyacağını öngörmek gerekir. [[K1 s. 305]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Parasetamol zehirlenmesi: nakil düşünülmeli mi?</h3></div>
    <div data-viz="f66_kcc"></div>
    <p class="viz-cap" aria-live="polite"><b>Ölçüt karşılanmıyor.</b> Arteriyel pH 7,3 ve üstünde; üçlü ölçütün hiçbiri yok. Değerleri değiştirin. [[K1 s. 305]]</p>
    <p class="viz-foot">Eşikler kitaptandır; kaydırıcı aralıkları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>King's College ölçütleri parasetamol zehirlenmesinden sonra kötü sonuç riski taşıyan hastaları belirler ve KİT bu öngörünün parçasıdır. Nakil, ya arteriyel pH &lt; 7,3 ise ya da şu üçü birlikte varsa düşünülür: PT &gt; 100 s (INR &gt; 6,5), serum kreatinini &gt; 300 µmol/L ve III–IV. derece hepatik ensefalopati. [[K1 s. 305]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: karaciğerin rezervi ve rejenerasyonu, glukoz ve protein metabolizması, safra tuzları ve miseller, bilirubin adımları ve sarılık tipleri, karaciğerde yapılan ve yapılmayan proteinler, K vitaminine bağımlı faktörler, ilaç metabolizması evreleri, enzim indükleyici ve inhibitörleri, portal hipertansiyon, KİT ve King's College ölçütleri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz66-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz66-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz66-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d66-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Bilirubinin vücuttaki yolunu anlatın. Sarılıklı bir hastada idrar ve dışkı bulguları sarılığın tipini nasıl ayırt ettirir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Kaynak.</b> Yaşlı alyuvarlar dalakta yıkılır: globin → amino asit, demir → transferrin → kemik iliği; porfirin halkası → biliverdin → bilirubin. [[K1 s. 300]]</li>
    <li><b>Taşınma.</b> Konjuge olmayan bilirubin suda çözünmez, albüminle karaciğere gider, glomerülden süzülmez. [[K1 s. 300–301]]</li>
    <li><b>Konjugasyon.</b> Hepatositte glukuronosiltransferaz ile glukuronik aside bağlanır, suda çözünür olur, safrayla ince bağırsağa atılır. [[K1 s. 300]]</li>
    <li><b>Bağırsak ve böbrek.</b> Kolon bakterileri ürobilinojen yapar: sterkobilin dışkıya kahverengi, geri emilip karaciğerden kaçan ürobilinojen idrara sarı rengini verir. [[K1 s. 300–301]]</li>
    <li><b>Tanım ve tipler.</b> Sarılık: bilirubin &gt; 30 µmol/L. Pre-hepatik (hemoliz; konjugasyon bozukluğu: yenidoğan, Gilbert) → konjuge olmayan, dipstick negatif. [[K1 s. 301]]</li>
    <li><b>Post-hepatik ve hepatosellüler.</b> Koledok taşı → konjuge, dipstick pozitif, soluk dışkı. Siroz, viral hepatit, parasetamol → karışık; baskın tip hepatosit ve safra yolu hasarının göreli derecesine bağlı. [[K1 s. 301–302]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Dört kutu çizin: dalak, karaciğer, bağırsak, böbrek. Dalaktan karaciğere "konjuge olmayan + albümin", karaciğerden bağırsağa "konjuge (safra)", kolonda "ürobilinojen → sterkobilin (dışkı)", bağırsaktan portal vene ve böbreğe "ürobilinojen (idrar)" oklarını çizin; sonra her sarılık tipinin tıkadığı yere çarpı koyun. [[K1 s. 300–302]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Gilbert sendromu neden pre-hepatik sayılır? Akut karaciğer yetmezliğinde neden albümin yerine PT bakılır? Hangi pıhtılaşma faktörleri K vitaminine bağımlıdır? Hangi ilaçlar P450'yi indükler? Portal hipertansiyonun sonuçları nelerdir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 301–305]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d66-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>%80'i çıkarılsa da işlev sürer; dörtte üçü rezeke edilse de rejenere olur; canlı donörde kalan karaciğer 6–8 haftada tam boyuta ulaşır. [[K1 s. 299]]</li>
    <li>İnsülin glikojenezi (≤ 100 g), glukagon glikojenoliz ve glukoneogenezi uyarır; NH₃ üre ya da glutamine çevrilir; immünoglobulinler dışında plazma proteinlerinin çoğu karaciğerdendir. [[K1 s. 299–300]]</li>
    <li>Safra 1000 mL/gün, kesede beşte bire yoğunlaşır; amfipatik safra tuzlarının yaptığı miseller lipaz etkisi ve A, D, E, K emilimi için zorunludur. [[K1 s. 300]]</li>
    <li>Bilirubin: dalakta oluşur, albüminle taşınır, glukuronosiltransferazla konjuge edilir; sterkobilin dışkıyı, ürobilinojen idrarı renklendirir. Yalnız konjuge bilirubin idrara geçer. [[K1 s. 300–302]]</li>
    <li>K vitaminine bağımlı: II, VII, IX, X, protein C, protein S. α₁-antitripsin eksikliği KOAH ve siroz yapar. [[K1 s. 302–303]]</li>
    <li>Faz 1 P450 (oksidasyon, redüksiyon, hidroliz), faz 2 konjugasyon, faz 3 ATP'ye bağımlı safra atılımı. İndükleyiciler PC BRAS, inhibitörler OA DEVICES; CYP2D6 kodeini morfine çevirir. [[K1 s. 303]]</li>
    <li>Portal basınç normalde 5–10 mmHg, portal hipertansiyon &gt; 12 mmHg: asit, splenomegali, varisler, ensefalopati. [[K1 s. 304]]</li>
    <li>Akut hasarda PT (faktör yarı ömrü &lt; 24 sa), süregen hastalıkta albümin (30 gün); King's: pH &lt; 7,3 ya da PT &gt; 100 s + kreatinin &gt; 300 µmol/L + III–IV. derece ensefalopati. [[K1 s. 304–305]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="66"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/65">← Bölüm 65 · Karaciğer: anatomi ve kanlanma</a>
    <a href="#/dersler/fizyoloji/67">Sonraki: Bölüm 67 · Böbrek işlevi, anatomisi ve kan akımı →</a>
  </nav>
</section>`,
};
