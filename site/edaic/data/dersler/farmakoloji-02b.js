VERI.sorular = VERI.sorular || {};
VERI.sorular['far02b-1'] = {
  no: 1, kok: 'Dokulara dağılım ve kan-beyin bariyeri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 15–16]]',
  onermeler: [
    { t: 'Dekstran 70, molekül büyüklüğü nedeniyle plazmada kalır.', d: true, n: 'Damar endotelini geçemeyecek kadar büyüktür. [[K3 s. 15]]' },
    { t: 'Nondepolarizan kas gevşeticilerin etki göstermesi için kas hücresine girmesi gerekir.', d: false, n: 'Kas kapillerlerinden dokuya çıkar ve hücre dışında etki gösterirler. [[K3 s. 15]]' },
    { t: 'Perfüzyona dayalı dağılım modelinde ilaç yağa kastan önce ulaşır.', d: false, n: 'Yağın kan akımı kasınkinden düşüktür ve yağ son gruptadır. [[K3 s. 15–16]]' },
    { t: 'Menenjitte penisilinin beyne geçişi artar.', d: true, n: 'İnflamasyon bariyerin geçirgenliğini artırarak tedavi için geçiş sağlar. [[K3 s. 16]]' },
    { t: 'Glikopirolat kan-beyin bariyerini kolayca geçer.', d: false, n: 'Kuaterner azotun taşıdığı yük geçişi güçleştirir. [[K3 s. 16]]' },
  ],
};
VERI.sorular['far02b-2'] = {
  no: 2, kok: 'Plasental geçiş ve fetüste ilaç düzeyleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 16–18]]',
  onermeler: [
    { t: 'Annede proteine bağlanmanın artması plasentadan geçişi hızlandırır.', d: false, n: 'Anne kanında serbest ilaç azalınca geçiş yavaşlar. [[K3 s. 16]]' },
    { t: 'Fetal pH düştüğünde fetüsteki iyonize bupivakain fraksiyonu artar.', d: true, n: 'Yüklü formun geri geçişi kısıtlanır ve fetal düzey yükselebilir. [[K3 s. 17]]' },
    { t: 'Petidin ve norpetidinin yarılanma ömrü fetüste üç kata kadar uzayabilir.', d: true, n: 'Fetüste her iki bileşiğin de klirensi azalmıştır. [[K3 s. 17]]' },
    { t: 'Tiyopental için 30 saniye içinde saptanma bulgusu umbilikal artere aittir.', d: false, n: 'Bu ilk saptama umbilikal vendedir. [[K3 s. 17]] Arterdeki tepe düzey maternal enjeksiyondan sonraki 3 dakika içindedir. [[K3 s. 17]]' },
    { t: 'Annenin süksametonyumu metabolize edememesi fetüse geçen miktarı artırabilir.', d: true, n: 'Kalıtsal enzim eksikliği annenin ilaç düzeyini yüksek tutabilir. [[K3 s. 18]]' },
  ],
};
VERI.sorular['far02b-3'] = {
  no: 3, kok: 'Metabolik yollar, kalıtsal farklılıklar ve etkileşimler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 18–21]]',
  onermeler: [
    { t: 'Hidroliz bir faz II reaksiyonudur.', d: false, n: 'Hidroliz, oksidasyon ve redüksiyonla birlikte faz I içinde yer alır. [[K3 s. 18]]' },
    { t: 'Birden fazla işlevsel CYP2D6 gen kopyası kodeinin morfine dönüşümünü hızlandırabilir.', d: true, n: 'Kopyaların tümü ifade edildiğinde morfin hızla oluşur ve yan etkiler öne çıkar. [[K3 s. 19]]' },
    { t: 'İzoniazidin asetilasyon hızı NAT2 izoenzimine bağlıdır.', d: true, n: 'Kalıtsal NAT2 farklılıkları hızlı ve yavaş asetilleyici fenotiplerini oluşturur. [[K3 s. 20]]' },
    { t: 'Sisatrakuryumun Hofmann yıkımı sıcaklığa ve pH’ya bağlıdır.', d: true, n: 'Plazmadaki bu parçalanma kendiliğinden gerçekleşir. [[K3 s. 19]]' },
    { t: 'Simetidin hepatik mikrozomal enzimleri inhibe eder.', d: true, n: 'İmidazol yapılı simetidin inhibisyon yoluyla ilaç düzeylerini yükseltebilir. [[K3 s. 20–21]]' },
  ],
};

(function () {
  const nav = [['dagilim','Dağılım'],['beyin','Kan-beyin bariyeri'],['fetus','Fetüse geçiş'],['faz1','Faz I'],['faz2','Faz II ve kalıtım'],['enzim','Enzim etkileşimleri'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  function sekil(ad, baslik, kaynak) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="a02b_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel gösterim. ${kaynak}</p></div>`;
  }
  function tablo(basliklar, satirlar) {
    return `<div class="tbl-wrap"><table class="tbl a02b-tablo"><thead><tr>${basliklar.map(b => `<th scope="col">${b}</th>`).join('')}</tr></thead><tbody>${satirlar.map(([ad, metin]) => `<tr><th scope="row">${ad}</th><td>${metin}</td></tr>`).join('')}</tbody></table></div>`;
  }
  SAYFALAR['dersler/farmakoloji/02b'] = {
    grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 2 · Ders 02b', baslik: 'Dağılım ve metabolizma',
    lede: 'Bir ilacın plazma düzeyi, dokulara dağıldıkça düşebilir. [[K3 s. 15–16]] Metabolit ana ilaç kadar etkinse ana ilacın plazma düzeyi etkinin ne kadar süreceğini göstermez. [[K3 s. 18]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="a02b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a02b-dagilim">
  <h2>İlaç hangi dokuya önce ulaşır?</h2>
  <p class="intro">Dağılımı bölgesel kan akımı ile ilacın zardan geçişini belirleyen molekül büyüklüğü, lipit çözünürlüğü, iyonizasyon ve proteine bağlanma birlikte belirler. [[K3 s. 15]]</p>
  ${sekil('perfuzyon','Kan akımına göre dağılım sırası','[[K3 s. 15–16]]')}
  <p>Şekildeki üç doku grubu, plazmadan çıkabilen ilaçların uygulamadan sonra plazma düzeylerinin neden düştüğünü açıklayan bir modeldir. [[K3 s. 15–16]]</p>
  ${tablo(['Dağılım','Sınırı ne belirler?'],[
    ['Plazmayla sınırlı','Dekstran 70 damar endotelini geçemeyecek kadar büyüktür. [[K3 s. 15]] Varfarinin proteine bağlı fraksiyonu öylesine büyüktür ki dolaşımdan çıkabilecek serbest miktar ölçülemeyecek kadar küçüktür. [[K3 s. 15]]'],
    ['Dağılımı sınırlı','Hacimli, polar ve lipitte az çözünen nondepolarizan kas gevşeticiler kasın fenestralı kapillerlerinden çıkar. [[K3 s. 15]] Hücre zarını geçmeden hücre dışında etki ederler. [[K3 s. 15]]'],
    ['Yaygın','Genellikle lipit çözünürlüğü yüksektir. [[K3 s. 15]] Molekül küçükse zayıf ilaç-protein etkileşimleri dağılımı sınırlamaz. [[K3 s. 15]] Yağ dokusu amiodaronu, tiroid iyodu, kemik tetrasiklinleri tutarak dolaşımdan uzaklaştırır. [[K3 s. 15]]']
  ])}
</section>
<section class="wrap blk ders-sec" id="a02b-beyin">
  <h2>Kan-beyin bariyerini ne geçer?</h2>
  <p class="intro">Kan-beyin bariyeri, dolaşımla santral sinir sistemini hem anatomik hem işlevsel olarak ayırır. [[K3 s. 16]]</p>
  ${sekil('bariyer','Aynı bariyerde üç farklı geçiş örüntüsü','[[K3 s. 16]]')}
  <p>Sağlıklı bariyerde geçişin başlıca yolları aktif taşıma ve kolaylaştırılmış difüzyondur. [[K3 s. 16]] Kitap, glukoz ve insülini aktif, taşıyıcı aracılı geçişe örnek verir. [[K3 s. 16]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap glukozun aktif taşındığını söyler. Glukoz kan-beyin bariyerini GLUT1 aracılığıyla kolaylaştırılmış difüzyonla geçer.</div>
  <ul>
    <li><b>Yük.</b> Glikopirolatın yüklü kuaterner azotu geçişi güçleştirir. [[K3 s. 16]] Tersiyer amin olan atropin ise konfüzyon veya santral yolla paradoksal bradikardi yapabilir. [[K3 s. 16]]</li>
    <li><b>Taşıyıcı ve enzim.</b> ABC taşıyıcıları beyni toksinlerden, bazı antibiyotiklerden ve sitotoksiklerden korur. [[K3 s. 16]] Bariyerdeki monoamin oksidaz, geçiş sırasında monoaminleri inaktif metabolitlere dönüştürür. [[K3 s. 16]]</li>
    <li><b>Fiziksel hasar.</b> Bariyer bozulursa santral nörotransmiterler kana karışabilir. [[K3 s. 16]] Bu durum kafa travması ve subaraknoid kanamadaki belirgin dolaşım bozukluğunu kısmen açıklayabilir. [[K3 s. 16]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a02b-fetus">
  <h2>Plasentadan fetüse geçiş</h2>
  <p class="intro">Maternal ve fetal serbest ilaç konsantrasyonları arasındaki fark ile plasental kan akımı, iki dolaşımın ne hızla dengeye geldiğini belirler. [[K3 s. 16]]</p>
  ${sekil('plasenta','Protein bağlanması hangi tarafta artıyor?','[[K3 s. 16]]')}
  <p>İki kanı başlangıçta komşu sinsityotrofoblast ve fetal kapiller zarları ayırır, sonra bu zarlar birleşir. [[K3 s. 16]] Fosfolipit zar lipitte çözünen molekülleri polarlardan daha kolay geçirir. [[K3 s. 16]]</p>
  <p>Plasenta kan-beyin bariyerinden daha az seçicidir. [[K3 s. 16]] Lipitte orta derecede çözünen ilaçlar bile kolay geçiyor görünür ve kordon kanında önemli miktarda bulunabilir. [[K3 s. 16]] Fetal pH daha düşüktür, bu nedenle proteinlere bağlanma farklı olabilir. [[K3 s. 16]] Fetüs bazı ilaçları metabolize eder ve metabolizma hızı olgunlaşmayla artar. [[K3 s. 16]]</p>
  <h3>Gebelikte risk hangi döneme ait?</h3>
  <ul>
    <li><b>Organogenez.</b> Özellikle ilk trimesterin erken dönemindeki etkileri doğum sırasındaki etkilerden ayırın. [[K3 s. 17]] Tür farkları nedeniyle hayvan çalışmaları insanda ciddi teratojenisite olasılığını dışlayamayabilir. [[K3 s. 17]]</li>
    <li><b>Gecikmiş etki.</b> Teratojenik etki yıllarca belirgin olmayabilir. [[K3 s. 17]] Kitap, gebelikte stilböstrol kullanımını kız çocuklarında pubertede over kanserine yatkınlık örneği olarak verir. [[K3 s. 17]]</li>
    <li><b>Tedavi kararı.</b> Kitap her ilacın güvenliliğinin değerlendirilmesini, mümkünse gebelik boyunca ilaçtan kaçınılmasını ve gerektiğinde uzun güvenli kullanım geçmişi olan ilacın seçilmesini önerir. [[K3 s. 17]] Epilepside nöbete bağlı fetal hipoksik hasar riski antiepileptik tedavinin, yapay kalp kapağı ise risklerine rağmen antikoagülasyonun sürdürülmesini gerektirir. [[K3 s. 17]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap stilböstrol örneğinde over kanserini anar. Rahim içi maruziyetle klasik ilişki, kız çocuklarında vajina veya serviksin berrak hücreli adenokarsinomudur.</div>
  <h3>Doğumda ilaçları karşılaştırın</h3>
  <p>Yenidoğanın dolaşımındaki ilaçlar analjezi türüne ve operatif doğuma bağlıdır. [[K3 s. 17]] Küçük, lipitte çözünen ilaçlar büyük polar moleküllerden daha yüksek konsantrasyona ulaşır. [[K3 s. 17]]</p>
  ${tablo(['İlaç','Geçiş ve klinik anlamı'],[
    ['Bupivakain','Epidural analjezide en yaygın lokal anesteziktir. [[K3 s. 17]] pKa’sı lidokaininkinden yüksektir, dolayısıyla fizyolojik pH’da daha çok iyonlaşır ve plasentayı daha zor geçer. [[K3 s. 17]] Plasental yetmezlikle fetal pH daha da düşerse yüklü fraksiyon artar ve geri dönemez. [[K3 s. 17]] Bu iyon tuzaklanması doğumda fetal düzeyi toksisiteye yaklaştırabilir. [[K3 s. 17]]'],
    ['Petidin','Doğum analjezisinde yaygın kullanılan petidin lipitte iyi çözünür ve önemli miktarda fetüse geçer. [[K3 s. 17]] Daha az lipofilik metaboliti norpetidin fetüste birikebilir ve düzeyler ilk maternal intramüsküler dozdan yaklaşık 4 saat sonra zirveye ulaşır. [[K3 s. 17]] Fetal klirensin düşük olması her iki bileşiğin yarılanma ömrünü üç kata kadar uzatır. [[K3 s. 17]]'],
    ['Tiyopental','Deneysel ölçümde maternal enjeksiyondan sonra umbilikal vende 30 saniye içinde saptanmıştır. [[K3 s. 17]] Seri örneklerde umbilikal arterde ve dolayısıyla fetüste tepe düzeye maternal enjeksiyondan sonraki 3 dakika içinde ulaşılmıştır. [[K3 s. 17]] Annede uyku oluşturan dozdan doğuma kadar geçen süre 20 dakikaya kadar olduğunda fetal sonucun etkilendiğini gösteren kanıt yoktur. [[K3 s. 17]]'],
    ['Nondepolarizanlar','Büyük ve polar oldukları için esas olarak plasentayı geçmezler ve fetal nöromüsküler kavşağı etkilemezler. [[K3 s. 18]]'],
    ['Süksametonyum','Çok azı geçer ve genellikle etkisi küçüktür. [[K3 s. 18]] Annenin kalıtsal enzim eksikliği metabolizmayı engellerse anne kanında düzey yüksek kalabilir ve geçiş belirginleşebilir. [[K3 s. 18]] Fetüs de defekti taşırsa kavşakta bir miktar depolarizan blok gelişebilir. [[K3 s. 18]]']
  ])}
</section>
<section class="wrap blk ders-sec" id="a02b-faz1">
  <h2>Metabolizma ve faz I</h2>
  <p class="intro">Metabolizma genellikle etkinliği azaltır ve ilacı başlıca atılım yolları olan safra veya idrara geçebilen, daha polar ve suda çözünür bir ürüne dönüştürür. [[K3 s. 18]]</p>
  ${sekil('etkinlik','Dönüşümden sonra etkinlik','[[K3 s. 18]]')}
  <p>Ön ilaçta dönüşüm tedavinin amaçlanan parçasıdır. [[K3 s. 18]] Enalaprilden enalaprilat, diamorfinden 6-monoaçilmorfin, parekoksibden valdekoksib oluşur. [[K3 s. 18]]</p>
  <h3>Faz I enzimlerini adlarından okumak</h3>
  <p>Fonksiyonelleştirme olarak da adlandırılan sentetik olmayan faz I, oksidasyon, redüksiyon ve hidrolizi kapsar. [[K3 s. 18]] Özellikle oksidasyonda, karaciğer endoplazmik retikulumunun özgül olmayan karma işlevli oksidazları görev alır. [[K3 s. 18]] İndirgenmiş enzim karbonmonoksitle birleştiğinde ışığı en güçlü 450 nm dalga boyunda soğurur. [[K3 s. 18]] P450 adı bu dalga boyundan gelir. [[K3 s. 18]]</p>
  <p>Ortak amino asit dizisi ailede %40, alt ailede %55’tir. [[K3 s. 18]] İlk sayı aileyi (CYP1, CYP2), harf alt aileyi (CYP1A, CYP1B), son sayı izoformu (CYP1A1, CYP1A2) gösterir. [[K3 s. 18]]</p>
  <p>P450 enzimleri bağırsak mukozası, akciğer, beyin ve böbrekte de bulunur. [[K3 s. 18]] Böbrekte CYP2E1’in metoksiflurandan oluşturduğu yüksek lokal florür konsantrasyonu bu ilaca bağlı böbrek yetmezliğini açıklar. [[K3 s. 18]]</p>
  ${tablo(['İzoenzim','Metabolize ettiği ilaçlar'],[
    ['CYP2B6','Propofol [[K3 s. 19]]'],
    ['CYP2C9','S-varfarin, losartan, parekoksib, propofol [[K3 s. 19]]'],
    ['CYP2C19','Klopidogrel, omeprazol, fenitoin, diazepam, losartan [[K3 s. 19]]'],
    ['CYP2D6','Metoprolol, flekainid, kodein [[K3 s. 19]]'],
    ['CYP2E1','Parasetamol, izofluran, halotan, sevofluran [[K3 s. 19]]'],
    ['CYP3A4','Vekuronyum, lidokain, alfentanil, fentanil, midazolam, temazepam, diazepam [[K3 s. 19]]'],
    ['CYP3A5','Diazepam [[K3 s. 19]] ve midazolam [[K3 s. 18]]']
  ])}
  <p>Bir ilacı birden çok izoenzim metabolize edebilir. [[K3 s. 18]] Midazolam için hem CYP3A4 hem CYP3A5 satırına bakın. [[K3 s. 18]]</p>
  <h3>P450 dışındaki yollar</h3>
  ${tablo(['Yer ve yol','Substrat, ürün veya sonuç'],[
    ['Mitokondri · monoamin oksidaz','Adrenalin, noradrenalin ve dopamini yıkar. [[K3 s. 19]] Genetik farklılıklar veya dışarıdan alınan inhibitörler dolaşımdaki monoaminleri yükseltebilir ve ciddi kardiyovasküler etkilere neden olabilir. [[K3 s. 19]]'],
    ['Sitoplazma · alkol dehidrogenaz','Etanol asetaldehide dönüşür, ardından asetaldehit asetik aside oksitlenir. [[K3 s. 19]] Alkol dehidrogenaz kolay doyar, bu yüzden alım sürdükçe plazma etanolü hızla yükselir. [[K3 s. 19]]'],
    ['Doku sitoplazması · esterazlar','Karaciğer ve kas dahil çeşitli dokularda etomidat, aspirin, atrakuryum ve remifentanil gibi esterleri metabolize ederler. [[K3 s. 19]]'],
    ['Akciğer · anjiyotensin dönüştürücü enzim','Anjiyotensin I’i anjiyotensin II’ye çevirir ve bradikinini de parçalayabilir. [[K3 s. 19]]'],
    ['Plazma','Sisatrakuryum, pH ve sıcaklığa bağlı Hofmann yıkımıyla kendiliğinden parçalanır. [[K3 s. 19]] Süksametonyumu plazma kolinesterazı hidrolize eder. [[K3 s. 19]]']
  ])}
</section>
<section class="wrap blk ders-sec" id="a02b-faz2">
  <h2>Faz II ve kalıtsal farklılıklar</h2>
  <p class="intro">Faz II (konjugasyon veya sentetik faz) ilacın ya da metabolitin suda çözünürlüğünü artırarak safra veya idrarla atılımını kolaylaştırır. [[K3 s. 19–20]]</p>
  ${sekil('konjugasyon','Konjugasyona hangi molekül girer?','[[K3 s. 19–20]]')}
  <p>Reaksiyonlar çoğunlukla karaciğer endoplazmik retikulumunda gerçekleşir, akciğer de katkıda bulunabilir. [[K3 s. 20]] Özellikle asetilasyon akciğer ve dalakta da görülür. [[K3 s. 20]] Karaciğer yetmezliğinde genellikle önce faz I etkilendiğinden, ağırlıkla faz II’ye uğrayan lorazepam daha az etkilenir. [[K3 s. 20]]</p>
  ${tablo(['Konjugasyon','Örnek'],[
    ['Glukuronidasyon','Morfin ve propofol [[K3 s. 19]]'],
    ['Sülfatlama','Propofolün kinol metaboliti [[K3 s. 19]]'],
    ['Asetilasyon','İzoniazid ve sülfonamidler [[K3 s. 19]]'],
    ['Metilasyon','Noradrenalin gibi katekol bileşikleri [[K3 s. 19]]']
  ])}
  <h3>Aynı ilaca yanıt neden değişir?</h3>
  <p>Enzim yapısındaki kalıtsal farklılıklar metabolizmayı değiştirir. [[K3 s. 20]] Anestezide özellikle CYP2D6, plazma kolinesterazı ve asetilasyondaki farklılıklar önem taşır. [[K3 s. 20]]</p>
  <ul>
    <li><b>Kodein.</b> Başka sitokromların da varyantları vardır, ancak CYP2D6, CYP2C9 ve CYP2C19 polimorfizmleri klinik açıdan öne çıkar. [[K3 s. 18–19]] Bazı CYP2D6 varyantlarında kodeinin metabolizması kusurludur. [[K3 s. 19]] Birden çok gen kopyasının tümü ifade edilirse ultra hızlı metabolize edici kişi kodeini hızla morfine çevirir ve beklenen analjezi yerine morfinin yan etkilerini yaşayabilir. [[K3 s. 19]]</li>
    <li><b>Süksametonyum.</b> Plazma kolinesterazı nispeten az özgüldür. [[K3 s. 20]] Bazı otozomal resesif varyantlarda hidroliz yavaşlar ve kas paralizisi uzayabilir. [[K3 s. 20]] Varyantları ayırt etmek için in vitro florür veya lokal anestezik dibukainle inhibisyon derecesi karşılaştırılır. [[K3 s. 20]]</li>
    <li><b>Hidralazin ve izoniazid.</b> Karaciğerde bu ilaçları N-asetiltransferaz tip 2 (NAT2) asetiller. [[K3 s. 20]] Kalıtsal izoenzim farkları hızlı veya yavaş asetilasyona yol açar ve böylece hem farmakokinetik hem farmakodinamik profili belirler. [[K3 s. 20]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a02b-enzim">
  <h2>Enzim indüksiyonu ve inhibisyonu</h2>
  <p class="intro">Karaciğerin mikrozomal enzim etkinliği değiştiğinde ilaçların plazma düzeyleri de değişebilir. [[K3 s. 20]]</p>
  ${sekil('etkilesim','Alkolün kullanım biçimini değiştirin','[[K3 s. 20–21]]')}
  <p>İndüksiyon, indükleyici ilacın kendisinin ve başka ilaçların metabolizmasını hızlandırır. [[K3 s. 20]] İnhibisyon özellikle simetidin gibi imidazol yapılı ilaçlarda görülür. [[K3 s. 20]]</p>
  ${tablo(['İlaç grubu veya etken','Mikrozomal enzimlere etkisi'],[
    ['Antibiyotikler','Rifampisin indükler. [[K3 s. 21]] Metronidazol, izoniazid ve kloramfenikol inhibe eder. [[K3 s. 21]]'],
    ['Alkol','Kronik kötüye kullanım indükler, akut kullanım inhibe eder. [[K3 s. 21]]'],
    ['İnhalasyon anestezikleri','Enfluran ve halotan indükler. [[K3 s. 21]]'],
    ['Barbitüratlar','Fenobarbital ve tiyopental indükler. [[K3 s. 21]]'],
    ['Antikonvülzanlar','Fenitoin ve karbamazepin indükler. [[K3 s. 21]]'],
    ['Hormonlar','Glukokortikoidler indükler. [[K3 s. 21]]'],
    ['MAO inhibitörleri','Fenelzin ve tranilsipromin inhibe eder. [[K3 s. 21]]'],
    ['H₂ antagonistleri','Simetidin inhibe eder. [[K3 s. 21]]'],
    ['Diğer etkenler','Sigara içme indükler. [[K3 s. 21]] Amiodaron ve greyfurt suyu inhibe eder. [[K3 s. 21]]']
  ])}
</section>
<section class="wrap blk ders-sec" id="a02b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin ve gerekçenizi kontrol edin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far02b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far02b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far02b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a02b-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Anneye verilen süksametonyumdan başlayarak proteine bağlanmanın, plasental geçişin ve kalıtsal metabolizma farklarının fetal blok riskini nasıl etkilediğini anlatın.</b></p></div>
  <h3>Cevap iskeleti</h3>
  <ol class="iskelet">
    <li>Genel geçiş ilkesini kurun. Plasental akım ve iki taraftaki serbest ilaç gradyanı dengeye ulaşma hızını belirler. [[K3 s. 16]]</li>
    <li>Bağlanmanın tarafını belirtin. Annede yüksek bağlanma geçişi yavaşlatır, fetüste yüksek bağlanma geçişi artırır. [[K3 s. 16]]</li>
    <li>İlaca dönün. Süksametonyum plazma kolinesterazıyla hidrolize olur, olağan koşullarda fetüse çok az geçer. [[K3 s. 18–19]]</li>
    <li>Anne enzimi kusurluysa hidroliz yavaşlayabilir, anne kanında yüksek kalan düzey plasental geçişi artırabilir. [[K3 s. 18]] [[K3 s. 20]]</li>
    <li>Fetüs de kusuru kalıtsal olarak almışsa fetal nöromüsküler kavşakta depolarizan blok gelişebilir. [[K3 s. 18]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Anne kanı, plasenta ve fetal kanı çizin. Serbest ilacın geçişini okla gösterin. Kalıtsal enzim kusurunun iki taraftaki sonuçlarını okun ilgili ucuna ekleyin. [[K3 s. 16]] [[K3 s. 18]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Dibukain hangi enzim farkını ayırt eder? [[K3 s. 20]] Fetal pH düşünce bupivakainin geri geçişi nasıl değişir? [[K3 s. 17]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a02b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Plazmadan çıkabilen ilaç önce kan akımı yüksek organlara, sonra kasa, en son yağa dağılır. [[K3 s. 15–16]]</li>
    <li>Kan-beyin bariyerinde molekülün boyutu, lipit çözünürlüğü ve bariyerin bütünlüğü geçişi etkiler. [[K3 s. 16]]</li>
    <li>Plasentada geçişi serbest ilaç farkı yönlendirir, fetal asidoz bupivakaini iyonize halde tutabilir. [[K3 s. 16–17]]</li>
    <li>Metabolizma ön ilacı etkinleştirebilir. [[K3 s. 18]] Konjugasyon bazı ilaçlarda faz I olmaksızın gerçekleşir. [[K3 s. 19–20]]</li>
    <li>Kalıtsal enzim farkı kodeinden morfin oluşumunu hızlandırabilir veya süksametonyumun hidrolizini yavaşlatabilir. [[K3 s. 19–20]]</li>
    <li>İndüksiyon plazma ilaç düzeyini düşürebilir, inhibisyon yükseltebilir. [[K3 s. 20]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="02b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/02a">← 02a · Emilim ve uygulama yolları</a><a href="#/dersler/farmakoloji/02c">Sonraki: 02c · Atılım, hastalık ve yaşamın uç dönemleri →</a></nav>
</section>`
  };
})();
