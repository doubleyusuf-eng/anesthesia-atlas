VERI.sorular = VERI.sorular || {};
VERI.sorular['fk24-1'] = {
  no: 1, kok: 'Enerji düzeyleri ve ışığın güçlendirilmesi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 394–398]]',
  onermeler: [
    { t: 'Temel durum, elektronun bulunabileceği en yüksek enerji düzeyidir.', d: false, n: 'Temel durum izin verilen en düşük enerji düzeyidir. [[K6 s. 394]]' },
    { t: 'Kendiliğinden emisyonun zamanı her uyarılmış elektron için önceden bellidir.', d: false, n: 'Uyarılmış durumun ömrü yaklaşık bir mertebeyle tarif edilir, tek elektronun geçiş anı belirsizdir. [[K6 s. 396]]' },
    { t: 'Uyarılmış emisyonda yeni foton, gelen fotonla aynı fazdadır.', d: true, n: 'Geçen fotonun tetiklediği yayım iki fotonu faz bakımından eşler. [[K6 s. 397]]' },
    { t: 'Popülasyon terslenmesinde elektronların çoğu temel durumdadır.', d: false, n: 'Büyük enerji girişiyle elektronlar geri döndüklerinden hızlı yukarı çıkar ve çoğunluğu üst düzeylerde bulunur. [[K6 s. 397]]' },
    { t: 'Lazer tüpünün kısmen yansıtıcı aynası ışığın bir bölümünün çıkışına izin verir.', d: true, n: 'İçeride gidip gelen fotonların bir bölümü bu aynadan geçip demeti oluşturur. [[K6 s. 395]]' }
  ]
};
VERI.sorular['fk24-2'] = {
  no: 2, kok: 'Dalga boyu ve cerrahi uygulama', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 398–399]]',
  onermeler: [
    { t: 'Göz merceği argon iyon lazerinin ışığını retinaya odaklar.', d: true, n: 'Mavi-yeşil görünür ışığın retinada odaklanması, retina dekolmanının onarımında kullanılır. [[K6 s. 398–399]]' },
    { t: 'Nd:YAG ışığı dokuda zayıf soğurulur.', d: true, n: 'Bu ışığın ürettiği ısı geniş hacme yayılır ve koagülasyon sağlanabilir. [[K6 s. 399]]' },
    { t: 'XeF eksimer lazeri korneayı kızılötesi ışıkla yeniden şekillendirir.', d: false, n: 'XeF gaz lazeri korneayı hassas biçimde işlemek için morötesi ışık verir. [[K6 s. 398]]' },
    { t: 'Ho:YAG lazerinin ışığı cam optik lifle cerrahi alana taşınabilir.', d: true, n: 'Cam lif, holmiyum YAG lazerinin kızılötesi ışığını geçirir. [[K6 s. 399]]' },
    { t: 'CO₂ lazerinin kesme etkisi, ışığının dokuda zayıf soğurulmasına dayanır.', d: false, n: 'Dokuda güçlü soğurulma, odakta buharlaşma ve ablasyon sağlar. [[K6 s. 398]]' }
  ]
};
VERI.sorular['fk24-3'] = {
  no: 3, kok: 'Lazer kullanılan ameliyathanede güvenlik', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 399–401]]',
  onermeler: [
    { t: 'Sınıf 2 için göz kırpmanın sağladığı korunma görünmez demetlere de uygulanır.', d: false, n: 'Bu kaçınma yanıtına dayalı sınıf yalnız görünür demetler içindir. [[K6 s. 400]]' },
    { t: 'Sınıf 3B lazerin yansıyan demetine bakmak göz hasarına yol açabilir.', d: true, n: 'Kitap hem doğrudan hem de yansıyan demete bakıldığında hasarı olası görür. [[K6 s. 400]]' },
    { t: 'Koruyucu gözlüğün camı lazerin dalga boyuna göre seçilir.', d: true, n: 'Lens malzemelerinin soğurduğu dalga boyları farklıdır. [[K6 s. 399]]' },
    { t: 'Parlak cerrahi aletler demeti yansıtabilir.', d: true, n: 'Bu nedenle lazer cerrahisinde sıklıkla mat yüzeyli aletler kullanılır. [[K6 s. 400]]' },
    { t: 'Oksijen varlığında normalde yanmayan bazı malzemeler lazer ışınıyla tutuşabilir.', d: true, n: 'Oksijen tedavisi sırasında demete maruz kalan malzemelerin yanma riski gözetilir. [[K6 s. 400]]' }
  ]
};

const FK24_NAV = [['enerji','Enerji düzeyleri'],['emisyon','Foton çoğalması'],['tup','Lazer tüpü'],['doku','Doku ve atımlar'],['risk','Güvenlik'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/fizik/24'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 24', baslik: 'Lazerler',
  lede: 'Bir foton, uyarılmış bir atomdan kendisiyle aynı fazda ikinci bir foton çıkmasını sağlayabilir. [[K6 s. 397]] Bu olayın tüp içinde tekrarlanması, dokuda bir noktaya odaklanabilen dar bir ışık demeti oluşturur. [[K6 s. 395–398]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK24_NAV.map(([id, ad]) => `<button type="button" data-scroll="fk24-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk24-enerji">
  <h2>İki enerji düzeyi arasındaki fark</h2>
  <p>Bir atomun soğurabileceği fotonun enerjisini, elektronun çıkacağı basamak ile bulunduğu basamak arasındaki fark belirler. [[K6 s. 394–396]]</p>
  <div class="viz"><div class="viz-head"><h3>Dalga boyunu değiştirin, enerji farkını izleyin</h3></div><div data-viz="fk24_enerji"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kaydırıcı, boya lazerleri için verilen dalga boyu aralığını kullanır. [[K6 s. 398]] Çizimde düzeyler arası uzaklık enerjiyi göreli olarak gösterir. [[K6 s. 396]]</p></div>
  <p>Bir ipe tırmanan kişi herhangi bir yükseklikte durabilirken merdivende ancak bir basamağa basabilir. [[K6 s. 393–394]] Atom ya da moleküldeki elektron için de yalnız belirli enerji düzeylerine izin vardır. [[K6 s. 394]] Rutherford–Bohr modelinde bu kesikli düzeyler çekirdeğin çevresindeki elektron kabuklarına karşılık gelir. [[K6 s. 394]]</p>
  <ul><li><b>Soğurma.</b> En düşük düzey temel durumdur (<i>E</i><sub>1</sub>), daha üstteki <i>E</i><sub>2</sub> ise uyarılmış durumdur. [[K6 s. 394–395]] Geçişte soğurulan enerji <b>Δ<i>E</i> = <i>E</i><sub>2</sub> − <i>E</i><sub>1</sub></b> kadardır. [[K6 s. 395]] Işığın yanı sıra ısı ve elektrik yükü de atomu uyarabilir. [[K6 s. 395]]</li>
  <li><b>Yayım.</b> Elektron alt düzeye döndüğünde aynı enerji farkı bir foton, yani bir elektromanyetik enerji paketi olarak açığa çıkar. [[K6 s. 394–396]] Fark büyüdükçe yayılan fotonun dalga boyu ters orantılı olarak kısalır. [[K6 s. 396]]</li></ul>
  <div class="note"><b>Şekli okuyun.</b> Kaydırıcıyı önce 380 nm’ye, sonra boya lazeri aralığının öbür ucuna, 1,0 µm’ye getirin. [[K6 s. 398]] Solda alttaki çizgiyi başlangıç düzeyi olarak izleyin. İki çizgi birbirine yaklaşırken sağdaki dalganın tepeleri birbirinden uzaklaşır. [[K6 s. 396]] Şekil, farklı enerjilerdeki geçişleri karşılaştırır. [[K6 s. 394–396]] Tek bir atomdaki belirli iki düzey için, fotonun taşıdığı enerji o iki düzey arasındaki farka uymalıdır. [[K6 s. 395–396]]</div>
  <details class="card"><summary>Elektron alt düzeye döndüğünde enerjinin izini nasıl sürersiniz?</summary><p>Önce geçişin başlangıç ve bitiş çizgilerini okuyun. Elektron üst düzeyde başlıyorsa düzeyler arasındaki fark, atomdan uzaklaşan fotonun taşıdığı enerjidir. [[K6 s. 394–396]] Ok ters yönde çizildiğinde aynı fark bu kez atomun dışarıdan alması gereken enerjiye karşılık gelir. [[K6 s. 395–396]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk24-emisyon">
  <h2>Bir foton nasıl iki foton olur?</h2>
  <p>Uyarılmış elektron kendiliğinden alt düzeye inebilir ya da yanından geçen uygun enerjili bir foton bu geçişi tetikleyebilir. [[K6 s. 396–397]]</p>
  <div class="viz"><div class="viz-head"><h3>Gelen foton ile çıkan fotonları karşılaştırın</h3></div><div data-viz="fk24_emisyon"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="cols"><div class="card"><h3>Kendiliğinden emisyon</h3><p>Uyarılmış elektronun dönüş zamanı belirsizdir, süre 10<sup>−10</sup> s mertebesindedir. [[K6 s. 396]] Aynı iki düzey arasında geçiş yapan çok sayıda elektronun yaydığı fotonların dalga boyu aynıdır, ancak çıkış zamanları ve yönleri rastgeledir. [[K6 s. 396]] Floresan tüpteki ışık oluşumu kabaca buna benzer. [[K6 s. 396–397]]</p></div>
  <div class="card"><h3>Uyarılmış emisyon</h3><p>Gelen fotonun salınan elektrik alanı, atomdaki yüklü elektronları hafifçe titreştirir ve uyarılmış elektronun alt düzeye inmesini kolaylaştırır. [[K6 s. 397]] Geçiş sırasında yayılan foton ile gelen foton aynı dalga boyunda, aynı fazda ve aynı yönde yol alır. [[K6 s. 397–398]]</p></div></div>
  <p><b>Popülasyon terslenmesi.</b> Olağan koşullarda elektronlar zamanlarının çoğunu temel durumda ya da düşük enerjili düzeylerde geçirir. [[K6 s. 397]] Ortama yeterince ışık, ısı veya elektrik yükü verilirse elektronlar üst düzeylere, kendiliğinden geri döndüklerinden daha hızlı çıkar. [[K6 s. 397]] Üst düzeydekiler çoğunluğa geçtiğinde uygun enerjili bir foton yeni bir fotonun yayımını başlatabilir. [[K6 s. 397]] Yeni fotonlar da başka atomlarda yayımı tetikler ve ışık çığ gibi çoğalır. [[K6 s. 397–398]]</p>
  <div class="note"><b>İki kipte neyi saymalı?</b> Önce yalnızca atomdan çıkan fotonu sayın. Her iki kipte de elektron bir kez aşağı iner ve bu geçişte bir foton yayılır. [[K6 s. 396–397]] Sonra ortamdan uzaklaşan fotonların tümünü sayın. Uyarılmış emisyonda atomun yaydığı fotona geçişi başlatan foton da eşlik eder, böylece bir fotonla başlayan olay iki fotonla sonuçlanır. [[K6 s. 397]]</div>
  <p>Demetin düzenini anlamak için dalga boyu ile fazı ayrı değerlendirin. [[K6 s. 396–398]] Aynı geçişi kendiliğinden yapan atomlar da tek dalga boyunda ışık yayabilir. [[K6 s. 396]] Uyarılmış emisyonda ise dalga boyunun eşleşmesine zamanlama ve yön birliği de eklenir. [[K6 s. 397–398]] Şekildeki iki dalganın tepelerini soldan sağa izlediğinizde aynı hizada kalmaları bu faz birliğini gösterir. [[K6 s. 397–398]]</p>
  <details class="card"><summary>Kendiliğinden emisyon sürerken terslenme nasıl oluşabilir?</summary><p>Tek elektronun ne zaman döneceğini bilmek gerekmez. [[K6 s. 396–397]] Üst düzeylere çıkanlar ile aynı sürede kendiliğinden geri dönenleri karşılaştırın. [[K6 s. 397]] Enerji girişi yukarı geçişleri yeterince hızlandırırsa elektronların çoğu üst düzeylerde bulunabilir ve ortam ışığı güçlendirebilir. [[K6 s. 397]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk24-tup">
  <h2>Aynalar arasındaki etkin ortam</h2>
  <p>Lazer az sayıda başlangıç fotonundan yüksek enerjili bir demet üreten ışık yükseltecidir. [[K6 s. 394]]</p>
  <div class="viz"><div class="viz-head"><h3>Gaz lazerinde demetin çıkışını bulun</h3></div><div data-viz="fk24_tup"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p><i>Laser</i>, İngilizce <i>light amplification by stimulated emission of radiation</i> ifadesinin baş harflerinden gelir ve ışığın uyarılmış emisyonla güçlendirilmesini anlatır. [[K6 s. 393]] Kitabın tanımındaki lazer kontrollü, sürekli, tek renkli ve koherent bir ışık demeti verir. [[K6 s. 393]] Uygulamada çıkış sürekli olabileceği gibi atımlı da olabilir. [[K6 s. 399]]</p>
  <ul><li><b>Enerjiyi içeri verme.</b> Etkin ortam gaz, katı veya sıvı olabilir. [[K6 s. 394]] Gaz lazerinde tüpün iki ucuna elektrik akımı uygulanırken katı ve sıvı ortamlara yoğun ışık verilir. [[K6 s. 394–395]]</li>
  <li><b>Işığı çoğaltma.</b> Tüpün iki ucundaki aynalar fotonları etkin ortamdan tekrar tekrar geçirir ve her geçişte yeni emisyonlar tetiklenebilir. [[K6 s. 395–397]]</li>
  <li><b>Çıkışı alma.</b> Kısmen yansıtıcı aynadan geçen ışık tek dalga boyludur (monokromatik), ince bir demet hâlinde aynı yönde ilerler (kolime) ve fotonları aynı fazdadır (koherent). [[K6 s. 398]] Bu demet uygulamanın gerektirdiği yere odaklanır. [[K6 s. 395]]</li></ul>
  <p>Amerikalı fizikçi Theodore Maiman lazeri 1960’ta geliştirdiğinde belirgin bir kullanım alanı görülmüyordu. [[K6 s. 393]] Birkaç yıl içinde bilim ve mühendislikte yer edindi, 1970’lerin başına gelindiğinde cerrahide de kullanılıyordu. [[K6 s. 393]] İlk örneklerden biri ayrılmış retinanın lazerle yeniden tutturulmasıydı. [[K6 s. 393]] Tıpta ve tıp dışında binlerce uygulama alanı vardır ve araştırmalar sürmektedir. [[K6 s. 393]]</p>
  <div class="note"><b>Kesiti iki yönde okuyun.</b> Elektrik bağlantısından gaza doğru bakarken dış kaynağın ortama verdiği enerjiyi düşünün. [[K6 s. 394–395]] Ardından tüpün uzun eksenini izleyin. Aynalar arasındaki her gidiş dönüş, fotonlara uyarılmış atomlarla yeniden karşılaşma fırsatı verir. [[K6 s. 395–397]] Çıkış tarafında kısmen yansıtıcı ayna iki işi birlikte yürütür: bir bölüm ışığı yeniden ortama gönderirken bir bölümünü dışarı geçirir. [[K6 s. 395]] Hedefte kullanılacak ışık, tüpün bu ucunu geçen bölümdür. [[K6 s. 395]]</div>
</section>
<section class="wrap blk ders-sec" id="fk24-doku">
  <h2>Dalga boyu ve atım biçimi dokuyu nasıl etkiler?</h2>
  <p>Etkin ortam dalga boyunu belirler, dokuya ulaşan gücün ve ışığın ne ölçüde soğurulduğunun birlikte etkisi cerrahi sonucu belirler. [[K6 s. 398]]</p>
  <div class="viz"><div class="viz-head"><h3>Ablasyondan sonra doku ne zaman soğur?</h3></div><div data-viz="fk24_atim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Işının açık ve kapalı dönemleri şematiktir. [[K6 s. 399]]</p></div>
  <p>Her dalga boyunda soğurulan ışık ısı etkisi oluşturabilir, özellikle bazı kızılötesi dalga boyları dokuda güçlü biçimde soğurulur. [[K6 s. 398]] Çıkış gücü amaca göre seçilir, genel cerrahi lazerlerinin gücü 100 W’ın üzerindedir. [[K6 s. 398]] Kesme ve ameliyat sahasında ya da çevresinde termal koagülasyon başlıca cerrahi kullanımlardır. [[K6 s. 393]] Cerrahi dışı uygulamalar arasında fotodinamik tedavi ve dövme silme de yer alır. [[K6 s. 393]]</p>
  <div class="fk24-kartlar">
    <article class="card"><h3>CO₂ · Kesme</h3><p><b>Gaz, kızılötesi, 10,6 µm.</b> [[K6 s. 398]] Cerrahi keside kullanılan karbondioksit lazeri tıpta en sık kullanılan lazer olabilir. [[K6 s. 398]] Işık odakta çok güçlü soğurulur, açığa çıkan ısı dokuyu buharlaştırıp uzaklaştırır (ablasyon). [[K6 s. 398]] Çevreye yayılan ısı kesi hattını steril kılar ve damarları koterize ederek kanamayı azaltır. [[K6 s. 398]]</p></article>
    <article class="card"><h3>Nd:YAG · Koagülasyon</h3><p><b>Katı granat, kızılötesi, 1,06 µm.</b> [[K6 s. 398]] Etkin ortam neodimyum katkılı itriyum alüminyum granattır. [[K6 s. 399]] Dokuda zayıf soğurulma ısının geniş bir hacme dağılmasını sağlar, bu özellik hipertermi, fototerapi ve koagülasyona uygundur. [[K6 s. 398–399]]</p></article>
    <article class="card"><h3>Ho:YAG · Lif üzerinden kesme</h3><p><b>Katı granat, kızılötesi, 2,12 µm.</b> [[K6 s. 398]] Cam optik lifler holmiyum YAG lazerinin bu dalga boyundaki ışığını geçirir, böylece ışık kılavuzuyla kesilecek dokuya ulaşılır. [[K6 s. 399]]</p></article>
    <article class="card"><h3>Argon iyonu · Retina</h3><p><b>Argon gazı, görünür ışık, 488–514 nm.</b> [[K6 s. 398]] Göz merceği mavi-yeşil ışığı doğal olarak retinaya odaklar, bu özellik ayrılmış retinanın onarımında kullanılır. [[K6 s. 398–399]]</p></article>
    <article class="card"><h3>Eksimer · Kornea</h3><p><b>Soy gaz içeren ortam, morötesi, 130–350 nm.</b> [[K6 s. 398]] XeF eksimer lazerinin yüksek enerjili ve hassas demeti, görme kusurunu düzeltmek amacıyla korneayı yeniden şekillendirmeye uygundur. [[K6 s. 398]]</p></article>
    <article class="card"><h3>Boya · Dermatoloji</h3><p><b>Sıvı boya çözeltisi, görünürden kızılötesine, 380 nm–1,0 µm.</b> [[K6 s. 398]] Dalga boyu ayarlanabildiğinden kırmızı, sarı veya yeşil ışık elde edilebilir. [[K6 s. 399]] Dövme silmede, porto şarabı lekelerinde ve başka dermatolojik durumlarda kullanılır. [[K6 s. 399]]</p></article>
  </div>
  <p>Aynı güçteki cerrahi lazerler karşılaştırıldığında atımlı demet çevre dokuda sürekli demetten çok daha az ısı hasarı oluşturur. [[K6 s. 399]] Enerji tek bir atımda yoğunlaşır ve odaktaki doku ablasyonla uzaklaşır. [[K6 s. 399]] İki atım arasında buharlaşan doku ısıyı beraberinde taşır ve komşu doku yeni atımdan önce soğuyabilir. [[K6 s. 399]]</p>
  <h3>Hedefi değiştirerek lazer seçimini açıklayın</h3>
  <ul><li><b>Retina mı, kornea mı?</b> Ayrılmış retinayı yeniden tutturmak için ışığın gözün arkasındaki hedefe odaklanması gerekir. [[K6 s. 398–399]] Argon iyon lazerinde bunu gözün kendi merceği sağlar. [[K6 s. 399]] Kornea şeklini düzeltmekte ise hedef korneanın kendisidir ve XeF eksimer lazerinin hassas demetinden yararlanılır. [[K6 s. 398]]</li>
  <li><b>Odakta kesi mi, hacim içinde ısı mı?</b> CO₂ lazerinin ışığı cerrahi noktada dokuyu buharlaştıracak kadar güçlü soğurulur. [[K6 s. 398]] Nd:YAG ile koagülasyonun açıklaması ise soğurulmanın zayıf olması ve böylece oluşan ısının daha geniş bir doku hacmine dağılmasıdır. [[K6 s. 399]] Her ikisi de kızılötesi ışık kullandığı hâlde dokuda elde edilen etki farklıdır. [[K6 s. 398–399]]</li>
  <li><b>Işık hangi yoldan ulaşacak?</b> Cerrahi kesi için ışığın bir cam liften geçmesi isteniyorsa, lifin o lazerin ışığına geçirgen olması gerekir. [[K6 s. 399]] Ho:YAG lazerinde camın 2,12 µm dalga boyundaki ışığı geçirmesi, lifi cerrahi ışık kılavuzu olarak kullanmaya olanak verir. [[K6 s. 398–399]]</li></ul>
  <details class="card"><summary>Atımlı çıkışı seçince grafiğin hangi kısmı çevre dokuyu açıklar?</summary><p>Üst çizgide ışık hedefe ulaşır ve kısa sürede yoğun enerji aktarır. [[K6 s. 399]] Alt çizgide ışık kapalıdır, ancak önceki atımın ısısı buharlaşan dokuyla uzaklaşmayı sürdürebilir. [[K6 s. 399]] Bir sonraki yükselişe kadar olan bu aralık, cerrahi odağın çevresindeki dokunun soğuması için geçen zamandır. [[K6 s. 399]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk24-risk">
  <h2>Demetin izlediği yol ve risk sınıfı</h2>
  <p>Yüksek enerji yoğunluğu lazeri tehlikeli kılar, kızılötesi demetin gözle görülememesi riski artırır. [[K6 s. 399]]</p>
  <div class="viz"><div class="viz-head"><h3>Hangi yoldan göze ulaşabilir?</h3></div><div data-viz="fk24_risk"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Korneada, göz merceğinde ve retinada kısa süreli maruziyet bile kalıcı körlük dâhil ağır hasara yol açabilir. [[K6 s. 399]] Çok düşük güçlü lazerler de geri dönüşsüz göz hasarı yapabilir. [[K6 s. 399]] Güç risk düzeyini etkiler, her işlem için risk sınıflandırılmalı ve klinik ekip bu düzeyi bilmelidir. [[K6 s. 399–401]]</p>
  <dl class="fk24-sinif">
    <dt>1</dt><dd>Makul biçimde öngörülebilen kullanım koşullarında güvenlidir. [[K6 s. 400]]</dd>
    <dt>1M</dt><dd>Sınıf 1 koşulları geçerlidir, ancak lup ya da dürbün gibi optik araçlarla bakmak güvenli değildir. [[K6 s. 400]]</dd>
    <dt>2</dt><dd>Yalnız görünür demetler için göz kırpma ve başı çevirme gibi kaçınma yanıtları gözü korur. [[K6 s. 400]]</dd>
    <dt>2M</dt><dd>Sınıf 2 ile aynı kaçınma yanıtı geçerlidir, ancak optik araçlarla bakıldığında göz güvende değildir. [[K6 s. 400]]</dd>
    <dt>3R</dt><dd>Alt sınıflara göre göz hasarı daha olasıdır, üst sınıflara kıyasla daha az kontrol önlemi gerekir. [[K6 s. 400]]</dd>
    <dt>3B</dt><dd>Doğrudan demete veya yansımasına bakıldığında göz hasarı olasıdır. [[K6 s. 400]]</dd>
    <dt>4</dt><dd>Hem ana demet hem yansıması göz ve deride hasar oluşturabilir, yangın riski de artmıştır. [[K6 s. 400]]</dd>
  </dl>
  <ul><li><b>Gözü koruyun.</b> Koruyucu gözlük hemen her zaman gerekir ve lens malzemesi kullanılan dalga boyuna göre seçilir. [[K6 s. 399]] Kitaba göre sıradan cam CO₂ lazerinin kızılötesi ışığını tümüyle soğurur, ancak bu özellik diğer lazerlere genellenemez. [[K6 s. 399]] Her lazer için o lazere özgü göz koruması kullanılmalıdır. [[K6 s. 401]]</li>
  <li><b>Yansımayı hesaba katın.</b> Parlak cerrahi aletler demeti yansıtabildiğinden lazerle kullanılan aletlerin yüzeyi sıklıkla mattır. [[K6 s. 400]] Lazer tehlikesi için evrensel bir uyarı işareti vardır. [[K6 s. 400]]</li>
  <li><b>Yangın ve patlama riskini değerlendirin.</b> Yüksek enerjili demet yanıcı maddeleri tutuşturabilir ve patlama riskini artırır. [[K6 s. 400]] Oksijen alan hastada olağan koşullarda yanmayan birçok malzeme demete maruz kalınca tutuşabilir. [[K6 s. 400]] Lazer kullanılan ortamlar için ısıya dayanıklı özel oksijen hortumları üretilir. [[K6 s. 400]]</li></ul>
  <div class="note"><b>Bir sınıfı yorumlarken üç soruyu izleyin.</b> Önce, güvenli kabul edilen bakma koşulu nedir? Sınıf 1M ve 2M’de gözlem için lup kullanılması bu koşulu değiştirir. [[K6 s. 400]] Sonra, göze hangi demet ulaşabilir? Sınıf 3B’de ışığın önce bir aletten yansımış olması göz hasarı olasılığını ortadan kaldırmaz. [[K6 s. 400]] Son olarak, göz dışında ne tehlikededir? Sınıf 4’te ana demet kadar yansıyan demet de deriye zarar verebilir ve yangın riski artar. [[K6 s. 400]]</div>
  <p>Dalga boyunu bilmek hem cerrahi kullanım hem korunma açısından önemlidir. [[K6 s. 398–399]] Örneğin camın CO₂ lazerinin ışığını soğurması kitaptaki gözlük örneğini açıklar. [[K6 s. 399]] Buna karşılık cam optik lifin Ho:YAG ışığını geçirmesi, kızılötesi bölgede çalışan iki cihaz için bile aynı cam davranışının varsayılamayacağını gösterir. [[K6 s. 398–399]]</p>
  <details class="card"><summary>Görünür bir ışık noktası seçemediğinizde hangi iki riski değerlendirmelisiniz?</summary><p>Kızılötesi lazerlerde demetin görünmemesi tehlikeyi artırır. [[K6 s. 399]] Göz için hem ana demetin hem bir aletten yansıyan ışığın yolunu düşünün. [[K6 s. 399–400]] Oksijen verilen hastada ise demete maruz kalabilecek malzemeleri ayrıca değerlendirin, çünkü oksijen bunların tutuşmasına elverişli koşullar yaratabilir. [[K6 s. 400]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk24-p1"><h2>Part I · Doğru mu, yanlış mı?</h2>
  <div class="viz"><div data-viz="mtf" data-q="fk24-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk24-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk24-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk24-p2"><h2>Part II · SOE 2 · Klinik ekipman</h2>
  <div class="card soe-soru"><h3>Açılış sorusu</h3><p>Oksijen tedavisi alan bir hastada CO₂ lazeriyle kesi yapılacak. Demetin nasıl üretildiğini, dokuyu nasıl kestiğini ve ekip için hangi önlemlerin gerektiğini anlatın.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Gaz ortamına elektrik enerjisi verilerek üst enerji düzeylerindeki elektronların sayısı artırılır ve popülasyon terslenmesi sağlanabilir. [[K6 s. 394–397]]</li>
    <li>Uygun enerjili foton uyarılmış emisyonu tetikler, yeni foton gelenle aynı dalga boyunda, fazda ve yöndedir. [[K6 s. 397–398]]</li>
    <li>İki ayna arasında ışık çoğalır ve kısmen geçirgen uçtan çıkan demet hedefe odaklanır. [[K6 s. 395–398]]</li>
    <li>10,6 µm ışık odakta güçlü soğurulur, doku buharlaşırken çevrede damarlar koterize olur. [[K6 s. 398]]</li>
    <li>Riski sınıflandırıp ekibe bildirin, dalga boyuna uygun göz korumasını ve mat aletleri belirtin. [[K6 s. 399–401]]</li>
    <li>Oksijen varlığında artan tutuşma riskini ve ısıya dayanıklı özel oksijen hortumunu açıklayın. [[K6 s. 400]]</li></ol>
  <div class="note"><b>Çizin.</b> Tüpün iki ucuna aynaları yerleştirin, gaz ortamını, uyarma akımını, içerideki gidiş dönüşü ve kısmen yansıtıcı aynadan çıkan demeti işaretleyin. [[K6 s. 394–395]]</div>
  <h3>Olası ek sorular</h3><ul><li>Nd:YAG ile CO₂ lazeri ısıyı dokuda nasıl farklı dağıtır?</li><li>Atımlar arasındaki sürenin komşu doku için önemi nedir?</li><li>Optik lup kullanımı hangi risk sınıflarında değerlendirmeyi değiştirir?</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk24-ozet"><h2>Özet</h2><ul class="ozet">
  <li>Düzeyler arasındaki enerji farkı fotonun dalga boyunu belirler. [[K6 s. 396]]</li>
  <li>Popülasyon terslenmesi ve tekrarlanan uyarılmış emisyon, tek dalga boylu, koherent ve yönlü demeti oluşturur. [[K6 s. 397–398]]</li>
  <li>Kızılötesi lazerlerle kesme, ablasyon, koagülasyon ve fototerapi yapılabilir. [[K6 s. 401]]</li>
  <li>Görünür ışığın kullanım alanları arasında retina cerrahisi ve dermatolojik tedaviler vardır. [[K6 s. 401]]</li>
  <li>Atımlar arasındaki soğuma, çevre dokunun ısıl hasarını sınırlar. [[K6 s. 399]]</li>
  <li>Ekip risk sınıfını bilmeli ve yansıyan ışığa karşı da lazere uygun göz koruması kullanmalıdır. [[K6 s. 400–401]]</li></ul>
  <div data-viz="tamam" data-modul="fizik" data-bolum="24"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/23">← Ultrason</a><a href="#/dersler/fizik/25">Sonraki: Manyetik rezonans görüntüleme →</a></nav>
</section>`
};
