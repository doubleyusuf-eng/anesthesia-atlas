VERI.sorular = VERI.sorular || {};
VERI.sorular['fk20-1'] = {
  no: 1, kok: 'Elektrik çarpması, topraklama ve koruma cihazları', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 329–336]]',
  onermeler: [
    { t: 'Vücudun elektriksel direncinin büyük bölümü dış deri tabakalarından kaynaklanır.', d: true, n: 'İç dokular ve kan iyonlu çözeltiler olduğu için direnci çok düşüktür; kuru dış deri ise ciddi direnç oluşturur. [[K6 s. 329]]' },
    { t: 'Artık akım cihazı (RCD), canlı ve nötr tellerindeki akım farkını izleyerek toprak teli kopukken de toprağa kaçağı algılayabilir.', d: true, n: 'Kirchhoff’un birinci yasasına göre giren ve dönen akım eşit olmalıdır; fark oluşunca akımın kaçtığını algılayıp gücü keser. [[K6 s. 336]]' },
    { t: 'Fiş kablolarında toprak teli, çekilme durumunda en önce kopması için faz ve nötrden kısa kesilir.', d: false, n: 'Toprak teli tam tersine en son kopması ve sigortanın atmasına zaman tanıması için canlı ve nötr tellerden daha uzun kesilir. [[K6 s. 335–336]]' },
    { t: 'İzolasyon transformatörünün sekonder sargısı primere doğrudan elektriksel bağlantıyla bağlıdır.', d: false, n: 'Sekonder ve primer sargılar arasında doğrudan bağlantı yoktur; bu sayede hasta şebekeden izole (yüzer) kalır. [[K6 s. 330]]' },
    { t: 'Kapasitif kuplaj nedeniyle AC ile çalışan bir cihazın gövdesine dokunulduğunda yalıtım sağlam görünse bile küçük kaçak akım akabilir.', d: true, n: 'AC telleri ile gövde iki plaka, aradaki yalıtım dielektrik gibi davranarak I_L kaçak akımına yol açabilir. [[K6 s. 334–335]]' },
  ],
};
VERI.sorular['fk20-2'] = {
  no: 2, kok: 'Mikroşok, elektrik güvenliği sınıfları ve statik elektrik', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 337–339]]',
  onermeler: [
    { t: 'Doğrudan kalple temasta ventriküler fibrilasyon oluşturabilen en küçük akım 50 mA’dır.', d: false, n: 'Kalple doğrudan temasta ventriküler fibrilasyon için gereken en küçük akım 50 μA’dır; izin verilen en yüksek kaçak ise 10 μA’dır. [[K6 s. 337]]' },
    { t: 'Sınıf II tıbbi cihazlar çift veya güçlendirilmiş yalıtıma sahip oldukları için topraklama gerektirmez.', d: true, n: 'Tek bir arızada çarpma olasılığını ortadan kaldıran çift yalıtım nedeniyle Sınıf II cihazlarda topraklama gerekmez. [[K6 s. 338]]' },
    { t: 'Tip BF sınıfı kaçak akım korumasına sahip ekipman kalple doğrudan veya dolaylı bağlantı için uygundur.', d: false, n: 'Tip BF kalple bağlantıya uygun değildir; kalple dolaylı bağlantı için kitap Tip CF’yi uygun görür. [[K6 s. 338]]' },
    { t: 'Ameliyathane ayakkabılarının 75 kΩ ile 10 MΩ arasındaki empedansı hem şoktan korur hem de statik yükün sızmasına izin verir.', d: true, n: 'Orta-yüksek empedans şebeke çarpmasına karşı koruma sağlarken statik yükün toprağa yavaşça akmasına olanak tanır. [[K6 s. 339]]' },
    { t: 'Statik elektrik birikimi nemli havada kuru havaya kıyasla daha tehlikeli düzeylere çıkar.', d: false, n: 'Nemli havadaki su içeriği havayı iletkenleştirip yükü yavaşça dağıtırken kuru koşullar statik birikimi artırır. [[K6 s. 339]]' },
  ],
};
VERI.sorular['fk20-3'] = {
  no: 3, kok: 'Akım yoğunluğu ve cerrahi diyatermi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 339–343]]',
  onermeler: [
    { t: 'Cerrahi diyatermide 0,4–3 MHz radyo frekansı kullanılması sinir ve kas hücrelerinin uyarılmasını önler.', d: true, n: 'Voltaj kapılı iyon kanallarının yanıt süresi sınırlıdır; 50 Hz uyarırken diyatermi frekanslarında kas ve sinir hücrelerinin bu yolla uyarılması önlenir. [[K6 s. 340]]' },
    { t: 'Unipolar diyaterminin dönüş plağı, ısının uzaklaştırılabilmesi için iyi kanlanan dokuya yerleştirilir.', d: true, n: 'Kemik çok kötü bir iletkendir; plak iyi kanlanan, geniş temas alanı sağlayan dokuya konmalı ve kemik çıkıntılardan kaçınılmalıdır. [[K6 s. 341]]' },
    { t: 'Bipolar diyatermide akım gövdeden geçerek kalçaya yapıştırılan ayrı bir dönüş plağı üzerinden döner.', d: false, n: 'Bipolar diyatermide akım yalnızca forsepsin iki ucu arasındaki kısa mesafede akar ve dönüş plağı gerekmez. [[K6 s. 342]]' },
    { t: 'Kesme (cutting) kipi sürekli sinüs dalgası kullanırken COAG kipi kısa sinüs dalgası patlamaları kullanır.', d: true, n: 'Kesme kipi sürekli sinüs dalgasıyla hücre içeriğini kaynatır; COAG ise desikasyon veya fulgurasyon biçiminde darbeli patlamalar verir. [[K6 s. 342–343]]' },
    { t: 'Cerrahi dumandaki (plume) küçük partikülleri tutmak için genel ameliyathane aspirasyonu yerine özel filtreli aspirasyon gerekir.', d: true, n: 'Genel aspirasyon viral DNA, bakteri ve toksik partikülleri süzemediğinden özel partikül filtreli aspirasyon zorunludur. [[K6 s. 343]]' },
  ],
};

(function () {
  const nav = [
    ['carpma', 'Çarpma ve şiddet'], ['izolasyon', 'Yüzer devre'], ['toprak', 'Toprak ve kaçak'], ['koruma', 'Sigorta ve RCD'],
    ['mikrosok', 'Mikroşok ve sınıf'], ['statik', 'Statik elektrik'], ['yogunluk', 'Akım yoğunluğu'], ['diyatermi', 'Diyatermi'],
    ['dalga', 'Kipler ve duman'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  function sekil(ad, baslik, alt) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk20_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  }
  SAYFALAR['dersler/fizik/20'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 20', baslik: 'Elektrik çarpması, topraklama, mikroşok ve elektrocerrahi',
    lede: 'Elektrik çarpmasında hasarı devreden geçen akım ve akım yoğunluğu belirler. [[K6 s. 329]] [[K6 s. 339–340]] Topraklama, izolasyon ve RCD hastayı korurken yüksek frekanslı diyatermi yüksek akım yoğunluğunu cerrahi kesme ve koagülasyon için kontrollü kullanır. [[K6 s. 330–342]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk20-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk20-carpma">
<h2>Elektrik çarpması, direnç ve temas süresi</h2>
<p class="intro">“Öldüren akımdır” sözü doğrudur; ancak Ohm yasasına göre akımı belirleyen etkenler uygulanan potansiyel fark ile ortamın direncidir. [[K6 s. 329]]</p>
${sekil('akim', 'Gerilim ve direnç değiştikçe vücuttan geçen akım', 'Direnci seçip gerilimi değiştirin ve hesaplanan akımı aşağıdaki temas tablosuyla karşılaştırın. [[K6 s. 329–331]]')}
<p>Canlı bir tele parmakla dokunulduğunda akım genelde parmaktan girip ayaklardan toprağa çıkar; ana ekstremiteler arası tipik insan direnci (AC’de empedans) kabaca <b>1500 Ω</b>’dur. [[K6 s. 329]] İç dokular ve kan iyonlu çözeltiler olduğu için direnci çok düşüktür; direncin çoğu dış deri tabakalarındadır ve kuru deri ıslak ya da delinmiş deriden çok daha dirençlidir. [[K6 s. 329]] Ameliyathanede yalıtkan ayakkabı giymek etkin empedansı yaklaşık <b>240 000 Ω</b>’a çıkarır. [[K6 s. 329]]</p>
<div class="cols">
<div class="card fk20-hesap"><h3>Hesap · Çıplak ayakla su birikintisinde</h3><p>Ohm yasası: akım = gerilim / empedans (<i>I</i> = <i>V</i> / <i>R</i>; A, V, Ω). [[K6 s. 329]] 240 V’luk arızalı gitar amfisine su birikintisinde çıplak ayakla dokunan kişide <i>I</i> = 240 V / 1500 Ω = <b>0,16 A (160 mA)</b> akım geçer; bu büyük olasılıkla öldürücü bir düzeydir. [[K6 s. 329–330]]</p></div>
<div class="card fk20-hesap"><h3>Hesap · Ameliyathane ayakkabısıyla</h3><p>Aynı arızalı cihaza yalıtkan ameliyathane ayakkabısıyla dokunan anestezistte <i>I</i> = 240 V / 240 000 Ω = <b>0,001 A (1 mA)</b> akım geçer; bu ancak fark edilebilen bir karıncalanma yapabilir. [[K6 s. 330]]</p></div>
</div>
<p><b>Hesabı kurarken.</b> Gerilimi volt (V), direnci ohm (Ω) cinsinden yazdığımızda bölümün birimi amperdir (A). [[K6 s. 329–330]] Alternatif akımda yolun akıma karşı gösterdiği toplam karşı koymayı empedans olarak ifade ederiz. [[K6 s. 329–330]] Ayakkabılı ve çıplak ayaklı kişilerin karşılaştırmasında değişen büyüklük uygulanan gerilim değil, temas noktasından toprağa kadar olan yolun etkin empedansıdır. [[K6 s. 329–330]]</p>

<p><b>Şok şiddetini belirleyenler:</b> (1) kaynak gerilimi; (2) vücut direnci (temas niteliği, deri durumu, nem, vücut kitle indeksi, akım yolu); (3) klinik VF yatkınlığı ve şokun kalp döngüsündeki zamanlaması. [[K6 s. 330–331]]</p>
<div class="tbl-wrap"><table class="tbl fk20-tablo"><caption>Tablo 20.1 · Akım büyüklüklerinin 1 s temastaki fizyolojik etkileri [[K6 s. 331]]</caption><thead><tr><th>Akım (1 s)</th><th>Fizyolojik etki</th><th>Yüksek direnç (10 000 Ω)*</th><th>Düşük direnç (1000 Ω)*</th></tr></thead><tbody>
<tr><td>1 mA</td><td>Hissetme eşiği, karıncalanma [[K6 s. 331]]</td><td>10 V</td><td>1 V</td></tr>
<tr><td>5 mA</td><td>Yaklaşık en yüksek zararsız akım [[K6 s. 331]]</td><td>500 V*</td><td>10 V*</td></tr>
<tr><td>10–20 mA</td><td>“Bırakamama” akımı, sürekli kas kasılması [[K6 s. 331]]</td><td>1000 V*</td><td>100 V*</td></tr>
<tr><td>100–300 mA</td><td>Ventriküler fibrilasyon [[K6 s. 331]]</td><td>10 000 V*</td><td>1000 V*</td></tr>
<tr><td>6 A</td><td>Geçici solunum felci, yanıklar olası [[K6 s. 331]]</td><td>600 000 V*</td><td>6000 V</td></tr>
</tbody></table></div>
<aside class="note plain"><b>Atlas notu.</b> Kitabın yıldızlı gerilimleri satırdaki akım ve dirençle uyuşmaz. [[K6 s. 331]] <i>V</i> = <i>I</i> · <i>R</i> ile yüksek/düşük direnç sütunlarında sırasıyla 5 mA için 50/5 V, 10–20 mA için 100–200/10–20 V, 100–300 mA için 1000–3000/100–300 V ve 6 A için 60 000/6000 V bulunur. [[K6 s. 329–331]]</aside>
<p><b>Tabloyu nasıl okuyalım?</b> Önce temas süresini kontrol edin. [[K6 s. 329–331]] Buradaki etkiler bir saniyelik temas için verilmiştir. [[K6 s. 329–331]] Sonra akımı okuyun ve aynı satırda iki farklı direnç için gereken gerilimleri karşılaştırın. [[K6 s. 329–331]] Örneğin hissetme eşiğindeki 1 mA akımı oluşturmak için 10 000 Ω dirençte 10 V gerekirken, 1000 Ω dirençte 1 V yeterlidir. [[K6 s. 329–331]]</p>
<p><b>Akım yolunun direnci.</b> Parmağa uygulanan gerilim aynı kalsa bile zemine kadar uzanan yolun direnci değişebilir. [[K6 s. 329]] Derinin dış tabakası bu yolun önemli bir bölümünü oluşturur. [[K6 s. 329]] Deri delindiğinde akım, direnci düşük olan iyonlardan zengin dokulara daha kolay ulaşır. [[K6 s. 329]] Bu nedenle bir kişide kuru ciltle yapılan değerlendirmeyi ıslak ciltle temas eden başka bir kişiye doğrudan aktaramayız. [[K6 s. 329]]</p>
<p><b>Klinik yorum.</b> Tablodaki akım, olası yaralanmanın ağırlığı için kaba bir göstergedir. [[K6 s. 330–331]] Sürekli kas kasılmasında kişi kabloyu bırakamayabilir. [[K6 s. 330–331]] Ventriküler fibrilasyon olasılığını yorumlarken akımın izlediği yolu, kişinin fibrilasyona yatkınlığını ve temasın kalp döngüsündeki zamanını da hesaba katmak gerekir. [[K6 s. 330–331]]</p>
</section>

<section class="wrap blk ders-sec" id="fk20-izolasyon">
<h2>Hasta devresi şebekeden nasıl ayrılır?</h2>
<p class="intro">Hastaya doğrudan temas edecek bir cihazda hem besleme geriliminin büyüklüğü hem de hastayı içeren bir akım yolunun oluşup oluşmadığı önemlidir. [[K6 s. 330]]</p>
${sekil('izolasyon', 'Pil ve transformatörle besleme', 'Beslemeyi seçin ve hasta tarafındaki devreyi izleyin. [[K6 s. 330]]')}
<p><b>Pil ile besleme.</b> Pil, hasta yanında taşınabilen düşük gerilimli bir kaynaktır. [[K6 s. 330]] Aynı direnç için gerilim azaldıkça hastadan geçebilecek akım da azalır. [[K6 s. 330]] Bu seçimin pratik karşılığı bakım gereksinimidir. [[K6 s. 330]] Pilin düzenli aralıklarla değiştirilmesi ya da yeniden şarj edilmesi gerekir. [[K6 s. 330]]</p>
<p><b>Alternatif besleme.</b> Şebekeye bağlı primer sargı ile cihazı besleyen sekonder sargı arasında iletken bağlantı bulunmaz. [[K6 s. 330]] Bu ayrım sayesinde hasta cihazına giden hat şebekenin doğrudan uzantısı olmaz. [[K6 s. 330]] İzole sistem çevresiyle etkileşmez: hasta üzerinden akımın akabileceği bir yol yoksa hasta izoledir; bu, topraklanmanın karşıtıdır. [[K6 s. 330]] Şemadaki aralık bu iletken bağlantının bulunmadığını gösterir. [[K6 s. 330]]</p>
<p><b>Arıza ve toprak teması birlikte olursa.</b> Yalıtımın sağladığı yararı değerlendirirken gerilimin azaltılmasını ayrıca düşünün. [[K6 s. 330]] Kitaptaki düzende transformatör hasta tarafındaki gerilimi de düşürür. [[K6 s. 330]] Hasta toprakla temas eder ve cihaz arızalanırsa akımı sürecek potansiyel fark şebeke geriliminden çok daha küçük kalır. [[K6 s. 330]] Kitap bu koşulda oluşabilecek yaralanmanın sınırlı kalacağını belirtir. [[K6 s. 330]]</p>
</section>
<section class="wrap blk ders-sec" id="fk20-toprak">
<h2>Topraklama, paratoner ve kaçak akım</h2>
<p class="intro">Toprak (earth/ground), devrede diğer gerilimlerin ölçüldüğü 0 V referans noktası ve akım için ortak, çok düşük dirençli dönüş yoludur. [[K6 s. 332]]</p>
${sekil('toprak', 'Topraklı gövde neden korur, kapasitif kaçak nasıl oluşur?', 'Üç durumu seçerek akım yolunu izleyin. [[K6 s. 332–335]]')}
<p>Üzerine canlı kablo düşen arabadaki sürücü yalıtkan lastikler nedeniyle akım akacak yol olmadığından hayatta kalabilir; ancak bir ayağını yere basıp metal gövdeye dokunursa akım sürücü üzerinden toprağa akar. [[K6 s. 331–332]] Büyük bir elektron deposu olan yerküreye toprağa gömülü metal kazık/levhayla bağlanmak (denize kova su dökmek gibi) akımı neredeyse sınırsızca emer. [[K6 s. 332]]</p>
<ul>
<li><b>Şok “sandviçi”.</b> Elektrik çarpması yalnızca üç koşul bir araya gelirse olur: (1) erişilebilir bir nesnenin arızayla canlı olması; (2) başka bir erişilebilir nesnenin topraklı olması; (3) kişinin ikisi arasında temas kurması. [[K6 s. 333]]</li>
<li><b>Lambada koruyucu toprak.</b> Topraklı lamba gövdesi canlı olsa bile düşük dirençli koruma yolu, topraklı yatak çerçevesine değen hastanın çarpılma riskini azaltır; topraksız eski lambada ise hasta toprağa giden yolu tamamlar. [[K6 s. 332–333]]</li>
<li><b>Paratoner.</b> Bulutun altındaki negatif yük yüksek nesnelerde pozitif yük indükler; yıldırımda yüksek dirençli tuğla/taş/cam yapılar <i>P</i> = <i>I</i>²<i>R</i> ile aşırı ısınıp yanabilirken paratoner gömülü metal levhaya düşük dirençli güvenli yol açar. [[K6 s. 333–334]]</li>
<li><b>Doğrudan ve kapasitif kaçak.</b> Kaçak akım arızalı kabloyla doğrudan oluşabileceği gibi, AC cihazlarda tellerin ve metal gövdenin bir kapasitörün karşılıklı plakaları, yalıtımın ise dielektrik gibi davranmasıyla (<b>kapasitif kuplaj</b>) veya AC taşıyan yalıtımlı tele dokunmayla (<i>I</i><sub>L</sub>) dolaylı da doğabilir. [[K6 s. 334–335]] Hafif karıncalanma tek belirti olabilir ama akım mikroşok yapabilir; bu nedenle tıbbi cihaz gövdeleri topraklanır. [[K6 s. 335]]</li>
</ul>
<p><b>Devre toprağı ile gerçek toprak.</b> Bir gerilim değeri verebilmek için önce karşılaştırma noktası seçilir. [[K6 s. 332]] Bu noktanın gerilimi genellikle sıfır kabul edilir. [[K6 s. 332]] İngiltere’de kullanılan “earth” ve Amerika Birleşik Devletleri’nde kullanılan “ground” sözcükleri aynı kavramı karşılar. [[K6 s. 332]] Devredeki ortak dönüş noktası fiziksel olarak yerküreye de bağlanabilir. [[K6 s. 332]]</p>
<p><b>Fişteki üçüncü bağlantı.</b> İngiltere’deki tipik ev tipi fişte faz ve nötr, cihazın çalışma akımını taşır. [[K6 s. 332]] Üçüncü tel ise istenmeyen akım için önceden belirlenmiş, direnci çok düşük bir yol sağlar. [[K6 s. 332]] Metal gövde bu tele bağlıysa cihazın içinde gevşeyen bir faz iletkeninin gövdeye değmesiyle oluşan arıza akımı toprak yoluna yönelir. [[K6 s. 332]]</p>
<p><b>Yatak başındaki lamba.</b> Hasta bir eliyle metal lamba gövdesine, diğer eliyle topraklanmış yatak çerçevesine dokunsun. [[K6 s. 332–333]] Gövde topraklıysa koruyucu telin direnci hastanın direncinden çok daha düşüktür. [[K6 s. 332–333]] Eski bir cihazda ya da fişi yanlış bağlanmış lambada bu bağlantı bulunmayabilir. [[K6 s. 332–333]] O zaman yatakla temas eden hasta, gerilim altındaki gövdeden toprağa giden yolu kendisi tamamlar. [[K6 s. 332–333]]</p>
<p><b>Fırtına bulutundan yere.</b> Fırtına öncesinde bulutun üst kısmında pozitif, alt kısmında negatif yük birikir. [[K6 s. 333–334]] Bulut yakınındaki ağaç veya yüksek yapı üzerinde pozitif yük indüklenebilir. [[K6 s. 333–334]] Yıldırım sırasında pozitif iyonların akışı yapıdan buluta doğru, negatif yükün akışı ise buluttan yapıya doğrudur. [[K6 s. 333–334]] Bina içinden büyük akım geçerse dirençte açığa çıkan ısı yangına ve yapısal hasara yol açabilir. [[K6 s. 333–334]]</p>
<p><b>Direnç ile ısı arasındaki bağlantı.</b> Isı olarak harcanan güç için <i>P</i> = <i>I</i>² · <i>R</i> yazılır. [[K6 s. 333–334]] Burada <i>P</i> güç (watt), <i>I</i> akım (amper), <i>R</i> dirençtir (ohm). [[K6 s. 333–334]] Aynı akımda direnç arttıkça harcanan güç artar. [[K6 s. 333–334]] Paratonerin ucundaki geniş metal levhanın toprağa gömülmesi iletkenle gerçek toprak arasında iyi elektriksel temas sağlar. [[K6 s. 333–334]]</p>
<p><b>Yalıtımlı AC telde kaçak.</b> Parmakla iletken arasında yalıtım bulunduğunda gözle görülen bir metal teması yoktur. [[K6 s. 334–335]] Buna rağmen alternatif gerilim altında bu düzenek bir kapasitör gibi davranabilir. [[K6 s. 334–335]] Parmaktan toprağa doğru çok küçük bir kaçak akım oluşabilir. [[K6 s. 334–335]] Gövdede biriken yükü uzaklaştırmak ve istenmeyen akıma dönüş yolu sağlamak, toprak bağlantısının işlevlerinden biridir. [[K6 s. 334–335]]</p>
</section>

<section class="wrap blk ders-sec" id="fk20-koruma">
<h2>Sigortalar, RCD ve klinik kırılganlık</h2>
<p class="intro">Aşırı akımı eriyerek kesen sigortanın aksine artık akım cihazı (RCD), faz ve nötr arasındaki akım farkını algılar. [[K6 s. 335–336]]</p>
${sekil('rcd', 'Toprak teli koptuğunda sigorta mı, RCD mi korur?', 'Arıza senaryosunu değiştirip kesme mekanizmasını karşılaştırın. [[K6 s. 335–336]]')}
<p><b>Sigorta</b>, kopma akımına ulaşıldığında <i>P</i> = <i>I</i>²<i>R</i> ısısıyla eriyip devreyi açan ince teldir; ancak kablo çekilip hem canlı tel gövdeye değer hem toprak teli koparsa hastadan geçen küçük akım sigortayı eritmeyebilir. [[K6 s. 335]] Bu yüzden <b>toprak teli her zaman canlı ve nötrden daha uzun kesilir</b>; böylece toprak teli kopmadan arızanın sigortayı attırmasına zaman kalır. [[K6 s. 336]]</p>
<p><b>Artık akım cihazı (RCD)</b>, Kirchhoff’un birinci yasasıyla canlı ve nötr tellerindeki akımı karşılaştırır; arada fark varsa akım toprağa kaçıyordur ve RCD toprak arızasında bile gücü keser. [[K6 s. 336]]</p>
<div class="cols">
<div class="card fk20-hesap"><h3>Vaka · Cihaza salin dökülmesi</h3><p>Normal salin içindeki Na⁺ ve Cl⁻ iyonları sızdığı devrede geçici kablo gibi davranarak hasara, arızaya, kısa devreye ve elektrik çarpmasına yol açabilir. [[K6 s. 336]]</p></div>
<div class="card fk20-hesap"><h3>Vaka · Anestezi altındaki hasta</h3><p>Bilinçsiz hasta rahatsız edici uyarıyı bildiremez ve kaçınamaz; ayrıca kanül, pacing teli ve monitörlere bağlı olması ve kan/sıvıların iyi iletkenliği mikroşok ve makroşok riskini artırır. [[K6 s. 336]]</p></div>
</div>
<p><b>Sigortanın boyutları.</b> Devreye seri yerleştirilen ince telin uzunluğu ve kesit alanı, dolayısıyla direnci, istenen kopma akımına göre seçilir. [[K6 s. 335]] Gövdeye değen faz telinin yol açtığı büyük akım bu ince telde ısı açığa çıkarır. [[K6 s. 335]] Tel eridiği anda devrenin sürekliliği bozulur ve cihaza güç aktarımı kesilir. [[K6 s. 335]]</p>
<p><b>Aynı lambada iki arıza.</b> Birinin lamba kablosuna takılması halinde fişten çıkan kablo gerilebilir. [[K6 s. 335–336]] Faz ve toprak telleri birlikte gevşer, yalnızca faz teli gövdeye değerse gövde gerilim altında kalır. [[K6 s. 335–336]] Hasta dokunana kadar burada sağlam bir toprak bağlantısı yoktur. [[K6 s. 335–336]] Hasta üzerinden kapanan yoldaki akım öldürücü olabilse bile sigortayı attıracak büyüklüğe ulaşmayabilir. [[K6 s. 335–336]]</p>
<p><b>RCD neyi karşılaştırır?</b> Kirchhoff’un birinci yasasında düğüme giren ve çıkan akımların işaretli toplamı sıfırdır. [[K6 s. 336]] İzlenen düğüm tek bir lamba olabileceği gibi bütün bir ev de olabilir. [[K6 s. 336]] Normal çalışmada faz iletkeninden giren akımın tamamı nötr iletkeninden geri döner. [[K6 s. 336]] Dönüş akımı daha küçükse fark, akımın bir bölümünün başka bir yoldan toprağa geçtiğini gösterir. [[K6 s. 336]]</p>
<p><b>Neden hastanede kullanılır?</b> Karşılaştırma için koruyucu toprak telinden geçen akımın ölçülmesi gerekmez. [[K6 s. 336]] Faz ile nötr arasında fark saptandığında cihazın içindeki otomatik anahtarlar beslemeyi ayırır. [[K6 s. 336]] Kitap RCD’lerin ev tipi sigorta kutularında giderek yaygınlaştığını ve küçük kaçakların bile ciddi sonuç doğurabildiği hastanelerde sık kullanıldığını belirtir. [[K6 s. 336]]</p>
<p><b>İki vakayı birbirine bağlayan nokta.</b> Salin dökülmesi cihazın içinde daha önce bulunmayan bir iletim yolu açabilir. [[K6 s. 336]] Bilinci açık bir kişi rahatsız edici uyarıyı hissedip temasını kesmeye çalışabilir. [[K6 s. 336]] Anestezi altındaki hastada bu uyarı personelin dikkatine sunulamaz. [[K6 s. 336]] Üstelik hastaya bağlı her elektrikli cihaz, mikroşok veya makroşok için ayrı bir olası kaynak oluşturur. [[K6 s. 336]]</p>
</section>

<section class="wrap blk ders-sec" id="fk20-mikrosok">
<h2>Mikroşok ve elektriksel güvenlik standartları</h2>
<p class="intro">Mikroşok, küçük bir akımın istemeden doğrudan kalbe veya kalbin yakınına ulaşmasıdır ve ölümcül olabilir. [[K6 s. 337]]</p>
${sekil('sinif', 'Parmak teması ve santral kateter yolu', 'Giriş yerini değiştirip akımın kalbe yaklaşabildiği yolu inceleyin. [[K6 s. 337–338]]')}
<p>Akım iki parmak arasından geçtiğinde daha az tehlikeliyken santral venöz kateterden girip parmaktan çıkarsa büyük olasılıkla kalpten geçer. [[K6 s. 337]] Pacing telleri, santral kateterler ve hatta mesane sondaları bu iç yolu açar. [[K6 s. 337]] Kalp döngüsünde en duyarlı an T dalgasının başlangıcıdır; kalple doğrudan temasta <b>50 μA</b> ventriküler fibrilasyon oluşturabilir, bu yüzden izin verilen en yüksek kaçak <b>10 μA</b>’dır. [[K6 s. 337]]</p>
<ul>
<li><b>Mevzuat ve sınıflar.</b> Electricity at Work Regulations (1989) ve Health and Safety at Work Act (1974) cihazları üçe ayırır: <b>Sınıf I</b> (erişilebilir gövde topraklı, arızada sigorta atar), <b>Sınıf II</b> (çift/güçlendirilmiş yalıtım, topraklama gerekmez) ve <b>Sınıf III</b> (SELV: transformatörle ayrılmış ekstra düşük gerilimli yüzer devre). [[K6 s. 337–338]]</li>
<li><b>Defibrilatöre dayanıklı cihaz.</b> Defibrilasyon sırasında hastaya bağlı kalabilir ve deşarj enerjisinden hasar görmez. [[K6 s. 338]]</li>
</ul>
<div class="tbl-wrap"><table class="tbl fk20-tablo"><caption>Tablo 20.2 · Kaçak akım sınıflandırması (B = Body, F = Floating, C = Cardiac) [[K6 s. 338]]</caption><thead><tr><th>Sınıf</th><th>Teknik bilgi</th><th>Yorum</th></tr></thead><tbody>
<tr><td>Tip B</td><td>Kitapta basılı değer: 100 mA · Sınıf I, II veya III olabilir</td><td>Genel kullanım · mikroşok riski [[K6 s. 338]]</td></tr>
<tr><td>Tip BF</td><td>Kitapta basılı değer: 100 mA · devreler diğer parçalardan izole</td><td>Kalple bağlantı için uygun değil [[K6 s. 338]]</td></tr>
<tr><td>Tip CF</td><td>Kitapta basılı değer: 10 mA · yüzer kardiyak devre</td><td>Kalple dolaylı bağlantı için uygun [[K6 s. 338]]</td></tr>
</tbody></table></div>
<aside class="note plain"><b>Atlas notu.</b> Kitap T dalgasının başlangıcını ventrikül depolarizasyonuyla ilişkilendirir. [[K6 s. 337]] T dalgası ventrikül repolarizasyonunu gösterir. [[K6 s. 337]]</aside>
<aside class="note plain"><b>Atlas notu.</b> Tablo 20.2, B ve BF için 100 mA, CF için 10 mA basar; doğrusu mikroamperdir (B/BF 100 μA, CF 10 μA), kitap da kalp için en yüksek kaçağı 10 μA verir. [[K6 s. 337–338]] Kitap CF’yi kalple dolaylı bağlantıya uygun sayar; CF kalbe doğrudan uygulanan parçalar için tasarlanmış tiptir. [[K6 s. 338]]</aside>
<p><b>Aynı çıkış, farklı giriş.</b> İki örnekte de akımın sol işaret parmağından çıktığını düşünün. [[K6 s. 337]] Giriş sol başparmak olduğunda akımın izlediği yol, girişin santral venöz kateter olduğu durumdan farklıdır. [[K6 s. 337]] Kateterle oluşan yolda akım kalbin yakınından ya da içinden geçebilir. [[K6 s. 337]] Deriye temasla algılanamayacak kadar küçük bir akım bu yoldan ventriküler fibrilasyona ve ölüme yol açabilir. [[K6 s. 337]]</p>
<p><b>Cihaz sınıfının yanıtladığı soru.</b> Kitap işyerinde elektrik güvenliğini ele alırken çarpma ve yanık yanında elektrik arkı, elektriksel patlama ve elektrik enerjisinin başlattığı yangın ya da patlama riskini de sayar. [[K6 s. 337]] Sınıf I cihazda yalnız gövdenin değil, kullanıcı tarafından erişilebilen kısımların da topraklanması gerekir. [[K6 s. 337]] Birleşik Krallık fişinin üçüncü pimi bu koruma yolunun parçasıdır. [[K6 s. 337]]</p>
<p><b>Tek bir arızaya karşı yaklaşım.</b> Sınıf II cihazın erişilebilir parçalarında güçlendirilmiş yalıtım bulunur. [[K6 s. 338]] Koruma, tek bir arızanın kullanıcıya kadar iletken yol oluşturmasını engelleyecek biçimde düzenlenmiştir. [[K6 s. 338]] Sınıf III’te ise transformatörün şebekeden ayırdığı düşük gerilimli hasta devresinde kullanıcıdan toprağa iletken bir yol bulunmaz. [[K6 s. 338]]</p>
<p><b>Hasta bağlantısının yanıtladığı soru.</b> Kaçak akım tipini okurken önce uygulamanın vücuda mı yoksa kalple ilişkili bir bağlantıya mı yönelik olduğuna bakın. [[K6 s. 338]] B harfi vücudu, C harfi kalbi, sona eklenen F harfi ise devrenin yüzer olduğunu belirtir. [[K6 s. 338]] Tip B bir cihazın aynı zamanda Sınıf I, II veya III olabilmesi, iki sınıflamanın farklı özellikleri anlattığını gösterir. [[K6 s. 338]]</p>
<p><b>Kalple bağlantı ve defibrilasyon.</b> BF tipinde devreler cihazın diğer parçalarından ayrılmıştır, ancak kitap bu tipi kalple bağlantı için uygun görmez. [[K6 s. 338]] CF tipi için verilen kullanım kalple dolaylı bağlantıdır. [[K6 s. 338]] Defibrilatöre dayanıklılık ise ayrı bir özelliktir ve hastaya deşarj uygulanırken bağlı cihazın bu enerjiden zarar görmemesini anlatır. [[K6 s. 338]]</p>
</section>

<section class="wrap blk ders-sec" id="fk20-statik">
<h2>Statik elektrik ve ameliyathanede önlenmesi</h2>
<p class="intro">Statik elektrik, en az biri yalıtkan olan iki farklı yüzey sürtündüğünde elektron aktarımıyla yüzeyde yük birikmesidir. [[K6 s. 338–339]]</p>
${sekil('statik', 'Kuru ve nemli havada yüzey yükü', 'Ortamı seçip yüzey yükünün kuru ve nemli havadaki dağılımını karşılaştırın. [[K6 s. 339]]')}
<p>Naylon halıda yürüyüp kapı koluna dokununca hissedilen küçük şok gibi biriken yük topraklamayla dağılır; kuru havada birikim artarken nemli havadaki su havayı iletkenleştirip yükü yavaşça azaltır. [[K6 s. 338–339]] Klinik ortamdaki başlıca tehlike yanıcı gazları ateşleyebilecek bir kıvılcımdır. [[K6 s. 339]]</p>
<ul>
<li><b>Önlemler.</b> Antistatik tabanlı ameliyathane ayakkabıları, antistatik ameliyathane zemini ve havanın çok kurumasını önlemek için nemin <b>%30–40’ın üzerinde</b> tutulması gerekir. [[K6 s. 339]]</li>
<li><b>Ayakkabı empedansı.</b> Ameliyathane ayakkabı ve terlikleri, şebeke çarpmasına karşı iyi koruma sağlarken statik yükün toprağa sızmasına izin verecek orta-yüksek bir empedansta (<b>75 kΩ – 10 MΩ</b>) tasarlanır. [[K6 s. 339]]</li>
</ul>
<p><b>Yük neden iki yüzeye ayrılır?</b> Sürtünen iki yüzeyin atomları, dış kabuklarındaki elektronları aynı kuvvetle tutmaz. [[K6 s. 339]] Elektronlar bir yüzeyden ötekine geçince elektron alan yüzey net negatif, elektron kaybeden yüzey net pozitif yük taşır. [[K6 s. 339]] Böylece iki farklı yüzey arasında potansiyel fark doğar. [[K6 s. 339]] Yalıtkanın yüzeyinde biriken yük, toprağa bir iletim yolu sağlandığında dağılır. [[K6 s. 339]]</p>
<p><b>Kapı kolundan ameliyathaneye.</b> Naylon halı üzerinde yürüdükten sonra kapı koluna dokununca hissedilen kısa şok, yükün birikip sonra boşalmasına örnektir. [[K6 s. 339]] Ameliyathanede önem taşıyan sonuç, bu boşalmada oluşabilecek kıvılcımın yanıcı gazı tutuşturabilmesidir. [[K6 s. 339]] Havadaki su miktarının artması iletkenliği artırır ve yükün birikip ani bir boşalma oluşturması yerine yavaş yavaş dağılmasına yardım eder. [[K6 s. 339]]</p>
<p><b>Taban nasıl iki iş görür?</b> Ayakkabının şebeke akımına karşı koruma sağlaması için empedansı yeterince yüksek olmalıdır. [[K6 s. 339]] Öte yandan statik yükün yere sızabilmesi için tabanın bir miktar iletkenliği bulunmalıdır. [[K6 s. 339]] Antistatik tabanla antistatik zeminin birlikte kullanılması ve havanın aşırı kurumasının önlenmesi aynı yük birikimi sorununa farklı noktalardan etki eder. [[K6 s. 339]]</p>
</section>

<section class="wrap blk ders-sec" id="fk20-yogunluk">
<h2>Akımın geçtiği alan ve yerel hasar</h2>
<p class="intro">Dokudaki ısıl hasarı toplam akımdan çok birim kesit alandan geçen akım, yani akım yoğunluğu (<i>J</i> = <i>I</i> / <i>A</i>) belirler. [[K6 s. 339–340]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı akım ne kadar alana yayılıyor?</h3></div><div data-viz="fk20_yogunluk"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Yatay eksen, temas alanının başlangıç alanına oranıdır. [[K6 s. 339–341]]</p></div>
<p>Gitaristin parmağından ve ayaklarından aynı akım geçtiği hâlde kesit alanı küçük olduğu için parmağı yanar; güç akımın karesiyle (<i>I</i>²) orantılıdır. [[K6 s. 339]] Akım yoğunluğu <i>J</i> (A·m⁻², küçük alanlarda A·mm⁻²) 1 mA·mm⁻² altında çoğu dokuda zararsızdır, ≈5 mA·mm⁻² yanık oluşturabilir ve diyatermide kesme, koagülasyon ve desikasyon için tipik olarak <b>100 mA·mm⁻²</b> üretilir. [[K6 s. 340]]</p>
<div class="card fk20-hesap"><h3>Alanı değiştirerek yoğunluğu hesaplayın</h3>
<p>Başlangıçtaki akım yoğunluğunu diyatermi için verilen tipik değer olan 100 mA·mm⁻² alın. [[K6 s. 340]] Aynı akım başlangıcın 20 katı alana dağılırsa yeni yoğunluk 100 / 20 = 5 mA·mm⁻² olur. [[K6 s. 339–340]] Bu sonuç, kitapta yanık oluşturabilecek yaklaşık yoğunluk olarak belirtilen değerle çakışır. [[K6 s. 340]]</p>
<p>Alanı başlangıcın 100 katına çıkarınca yoğunluk 1 mA·mm⁻² olur. [[K6 s. 339–340]] Kitabın çoğu dokuda zararsız olarak tanımladığı bölge bu değerin altındadır. [[K6 s. 340]] Bu karşılaştırma alanın etkisini gösterir, bir hastanın plağı için gerekli mutlak büyüklüğü vermez. [[K6 s. 339–341]]</p></div></section>
<section class="wrap blk ders-sec" id="fk20-diyatermi">
<h2>Unipolar ve bipolar diyatermi</h2>
<p class="intro">Elektrocerrahi veya cerrahi diyatermi, dokuyu kesmek ve koagüle etmek için yüksek frekanslı akım kullanır. [[K6 s. 340]]</p>
${sekil('diyatermi', 'Unipolar ve bipolar diyatermi bileşenleri', 'Numaralı noktalara dokunarak aktif uç, dönüş plağı ve forseps farkını inceleyin. [[K6 s. 340–342]]')}
<p>Sinir ve kas zarlarındaki voltaj kapılı iyon kanalları 50 Hz şebekeye kolayca yanıt verse de yanıt süreleri sınırlı olduğundan frekans yükseldikçe duyarlılık düşer; diyatermideki <b>0,4–3 MHz</b> (genelde <b>1 MHz</b>) radyo frekansı (RF) sinir ve kas zarlarını uyaracak kadar yavaş değişmez; böylece spazm ya da kalp durması oluşmaz. [[K6 s. 340]]</p>
<div class="cols">
<div class="card"><h3>Unipolar diyatermi ve dönüş plağı</h3><p>Hasta devrenin parçasıdır; uçla temas eden hücrelerin sıcaklığı 1000 °C’yi aşar, doku suyu kaynar, doku kesilir ve damarlar koterize olur. [[K6 s. 340]] Dönüş plağı iyi kanlanan dokuya tam temas etmeli, alanı geniş olmalı, kemik çıkıntıya konmamalı (kemik kötü iletkendir) ve hasta metal masaya değmemelidir. [[K6 s. 341]]</p>
</div>
<div class="card"><h3>Bipolar diyatermi</h3><p>Aktif ve dönüş elektrodu yalıtımlı sapla ayrılmış forsepsin iki koludur; akım yalnızca iki uç arasında kısa bir yoldan akar ve dönüş plağı gerekmez. [[K6 s. 342]] Periferik bölgelerde, mikrokoagülasyonda ve kalp piline kritik bağımlı hastalarda daha az elektriksel girişim oluşturduğu için kullanılabilir; ancak daha yerel akım yoğunluğu nedeniyle bazı cerrahlarca unipolardan daha az güçlü görülür. [[K6 s. 342]]</p></div>
</div>
<p><b>Yoğunluk hesabında hangi alan kullanılır?</b> <i>J</i> = <i>I</i> / <i>A</i> bağıntısındaki <i>A</i>, akımın geçtiği kesitin alanıdır. [[K6 s. 339–340]] Akımı amper, alanı metrekare alırsak sonuç A·m⁻² olur. [[K6 s. 339–340]] Küçük temas yüzeylerinde alanı milimetrekare ile ifade etmek daha kullanışlıdır. [[K6 s. 339–340]] Amper kullanıldığında A·mm⁻², miliamper kullanıldığında mA·mm⁻² elde edilir. [[K6 s. 339–340]]</p>
<p><b>Akım yolu boyunca ısı.</b> Unipolar düzende alternatif akım kaynağı, aktif elektrot, hasta dokusu ve dönüş elektrodu bir devre oluşturur. [[K6 s. 340–341]] Aktif uçta kesitin küçük olması yerel ısınmayı cerrahi amaçla kullanmayı sağlar. [[K6 s. 340–341]] Akım aynı hastadan geri alınırken bu kez geniş bir alana yayılması istenir. [[K6 s. 340–341]] İyi kanlanan doku, dönüş elektrodu altında oluşan ısının uzaklaştırılmasına yardım eder. [[K6 s. 340–341]]</p>
<p><b>Plak tam yapışmazsa.</b> Plağın görünen büyüklüğü ile hastaya gerçekten temas eden alan farklı olabilir. [[K6 s. 341]] Bir kenar ayrılırsa akım geriye kalan daha küçük temas alanından dönmek zorunda kalır. [[K6 s. 341]] Bu bölgede akım yoğunluğu artar ve ciltte ağır yanık gelişebilir. [[K6 s. 341]] Metal implant çevresinde yerel yoğunluk artışı ve EKG elektrotları çevresinde yanıklar da bildirilmiştir. [[K6 s. 341]]</p>
<p><b>Doğrudan temas gerektirmeyen etkiler.</b> Cerrah kanamayı hızlı durdurup dokuyu oldukça hassas kesebilirken elektromanyetik girişim EKG’yi ve diğer hasta monitörlerini bozabilir. [[K6 s. 341–342]] Kalp pilinin işlevi de kesintiye uğrayabilir. [[K6 s. 341–342]] Yakındaki metal cisimlerde, özellikle ameliyat masasının metal desteklerinde kapasitif kaçak oluşabilir. [[K6 s. 341]] Minimal invaziv ve endoskopik cerrahide dar alanda yakın çalışan aletler arasında temas olmadan kapasitif kuplajla akım aktarılabilir. [[K6 s. 341–342]]</p>
<p><b>Forsepsle noktasal çalışma.</b> Bipolar düzende dönüş elektrodu, aktif elektrodun hemen karşısındaki koldur. [[K6 s. 342]] Böylece etki iki ucun çevresindeki küçük bölgeyle sınırlanır. [[K6 s. 342]] Bu kısa yol nedeniyle yöntem daha güvenli kabul edilir. [[K6 s. 342]] Öte yandan bazı cerrahlar tam da bu yerel akım dağılımı nedeniyle bipolar tekniği unipolar tekniğe göre daha az etkili bulur. [[K6 s. 342]]</p>
</section>

<section class="wrap blk ders-sec" id="fk20-dalga">
<h2>Diyatermi kipleri ve cerrahi duman (plume)</h2>
<p class="intro">Verilen akımın dalga biçimi dokuda kesme, kurutma-koagülasyon veya ikisinin karışımını üretir; oluşan duman özel filtreyle uzaklaştırılmalıdır. [[K6 s. 342–343]]</p>
${sekil('dalga', 'Kesme, desikasyon, fulgurasyon ve karma kip', 'Zaman ve genlik ölçekleri şematiktir. [[K6 s. 342–343]]')}
<div class="tbl-wrap"><table class="tbl fk20-tablo"><caption>Tablo 20.3 · Diyatermi türleri ve etkileri [[K6 s. 342–343]]</caption><thead><tr><th>Kip</th><th>Dalga biçimi</th><th>Ayrıntı / Güç</th><th>Etki</th></tr></thead><tbody>
<tr><td>COAG · Desikasyon</td><td>Kısa sinüs patlamaları (darbeli)</td><td>Düşük güç · kıvılcım yok</td><td>Dokuların yavaş kuruması [[K6 s. 342–343]]</td></tr>
<tr><td>COAG · Fulgurasyon</td><td>Kısa sinüs patlamaları (darbeli)</td><td>Yüksek güç</td><td>Hücrelerin aralıklı ısıtılması, hızlı kuruma [[K6 s. 342–343]]</td></tr>
<tr><td>Kesme (Cutting)</td><td>Sürekli sinüs dalgası</td><td>COAG’dan yüksek akım / düşük gerilim, hızlı yüksek <i>J</i></td><td>Yoğun ısı, hücre içeriğinin kaynamasıyla hücre patlaması [[K6 s. 343]]</td></tr>
<tr><td>Karma (Blend)</td><td>COAG + kesme birleşimi</td><td>Birleşik enerji aktarımı</td><td>Hem kesme hem hemostaz gerektiğinde [[K6 s. 343]]</td></tr>
</tbody></table></div>
<p><b>Cerrahi duman (surgical plume).</b> Elektrocerrahi (ayrıca lazer ve ultrasonik cerrahi) sırasında çıkan duman ve buhar toksik kimyasallar, kömürleşmiş doku, kan parçacıkları, viral DNA ve bakteri içerebilir. [[K6 s. 343]] Genel ameliyathane aspirasyonu bu küçük partikülleri süzemediğinden özel partikül filtreli aspirasyon sistemi kullanılmalıdır. [[K6 s. 343]]</p>
<p><b>Dalga biçimini okuma.</b> Sürekli sinüs dalgasında enerji hızla ve yüksek akım yoğunluğuyla dokuya aktarılır. [[K6 s. 342–343]] Kesme kipinde COAG kipine göre akım daha yüksek, gerilim daha düşüktür. [[K6 s. 342–343]] Hücre içeriği kaynadığında hücreler parçalanır. [[K6 s. 342–343]] COAG kipinde ise kısa sinüs dizileri arasında aralık bulunur ve kullanılan güç dokunun kuruma biçimini değiştirir. [[K6 s. 342–343]]</p>
<p><b>Kurutma mı, hemostazla kesme mi?</b> Düşük güçlü desikasyonda doku yavaş kurur ve kıvılcım oluşmaz. [[K6 s. 343]] Daha yüksek güçlü fulgurasyonda hücreler aralıklı olarak ısınır ve hızla kurur. [[K6 s. 343]] Cerrahın aynı işlemde hem kesme hem de kanamayı durdurma etkisine ihtiyacı olduğunda karma kip bu iki etkiyi birleştirir. [[K6 s. 343]]</p>
<p><b>Dumanın uzaklaştırılması.</b> Cerrahi duman yalnız gaz veya su buharından oluşmaz. [[K6 s. 343]] Doku üzerinde kullanılan cihazın açığa çıkardığı küçük parçacıklar arasında kan ve kömürleşmiş doku da bulunabilir. [[K6 s. 343]] Genel aspirasyonun sınırlılığı bu parçacıkları süzememesidir. [[K6 s. 343]] Bu nedenle dumanın uzaklaştırılmasında, içindeki küçük parçacıkları tutabilecek filtreye sahip özel aspirasyon gerekir. [[K6 s. 343]]</p>
</section>

<section class="wrap blk ders-sec" id="fk20-p1"><h2>Part I · Doğru mu, yanlış mı?</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div data-viz="mtf" data-q="fk20-1"></div><div data-viz="mtf" data-q="fk20-2"></div><div data-viz="mtf" data-q="fk20-3"></div></section>

<section class="wrap blk ders-sec" id="fk20-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><h3>Klinik ölçüm ve ekipman</h3><p>Ameliyathanede santral venöz kateteri olan bir hastada mikroşok riskini neden göze almayız? Tip CF cihaz ile unipolar diyatermi kullanımında hastayı termal ve elektriksel hasardan korumak için hangi önlemler alınır? [[K6 s. 337–342]]</p></div>
<ol class="iskelet">
<li><b>Mikroşok mekanizması.</b> Santral kateter veya pacing teli yüksek dirençli deriyi baypas ederek akımı kalbin yakınından geçirebilir; 50 μA bile ventriküler fibrilasyonu tetikleyebilir, izin verilen en yüksek kaçak 10 μA’dır. [[K6 s. 337]]</li>
<li><b>Ekipman sınıfları.</b> Sınıf I topraklı, Sınıf II çift yalıtımlı, Sınıf III SELV yüzer devrelidir; kalple dolaylı bağlantıda yüzer Tip CF uygundur. [[K6 s. 337–338]]</li>
<li><b>RCD ve topraklama.</b> Toprak teli faz/nötrden uzun kesilir; RCD ise canlı–nötr farkını yakalayarak toprak arızasında bile gücü keser. [[K6 s. 335–336]]</li>
<li><b>Diyatermi frekansı ve dönüş plağı.</b> 0,4–3 MHz RF kas/siniri uyarmaz; unipolar plak geniş, iyi kanlanan dokuya tam yapıştırılır, kemik ve metal masadan kaçınılır. [[K6 s. 340–341]]</li>
<li><b>Bipolar ve duman.</b> Kalp pili bağımlı hastada kısa akım yollu bipolar teknik kullanılabilir; cerrahi duman özel filtreli aspirasyonla çekilir. [[K6 s. 342–343]]</li>
</ol>
<p class="note"><b>Çizin.</b> Şebekeden izolasyon transformatörüyle ayrılmış yüzer (floating) hasta devresini ve unipolar diyatermide aktif kalem → hasta → geniş dönüş plağı akım yolunu çizin. [[K6 s. 330]] [[K6 s. 340–341]]</p>
<p><b>Ek sorular.</b> Elektrik çarpması “sandviçi”nin üç koşulu nelerdir? Kapasitif kuplaj hem şebeke cihazlarında hem laparoskopide nasıl risk yaratır? Kesme ve COAG dalgalarını karşılaştırın. [[K6 s. 333–335]] [[K6 s. 341–343]]</p></section>

<section class="wrap blk ders-sec" id="fk20-ozet"><h2>Özet</h2><ul class="ozet">
<li>Doku hasarını akım ve akım yoğunluğu (<i>J</i> = <i>I</i> / <i>A</i>) belirler; kuru derinin direnci ıslak veya delinmiş deriden yüksektir, ameliyathane ayakkabısı empedansı ~240 000 Ω’a çıkarır. [[K6 s. 329]] [[K6 s. 339–340]]</li>
<li>Topraklama kaçak akıma düşük dirençli yol açar; RCD faz–nötr farkını ölçerek toprak teli kopukken de toprağa kaçağı algılayabilir. [[K6 s. 332]] [[K6 s. 336]]</li>
<li>Mikroşok deriyi baypas eder; kalpte 50 μA VF yapabilir, kitabın kalple doğrudan temas için verdiği en yüksek kaçak 10 μA’dır. [[K6 s. 337–338]]</li>
<li>Ameliyathanede antistatik zemin/ayakkabı (75 kΩ–10 MΩ) ve %30–40 üzeri nem kıvılcım riskini azaltır. [[K6 s. 339]]</li>
<li>Diyatermi 0,4–3 MHz RF ve ~100 mA·mm⁻² ile çalışır; unipolarda geniş ve iyi kanlanan dönüş plağı, kalp piline bağımlı hastada bipolar teknik kullanılabilir. [[K6 s. 340–342]]</li>
<li>Cerrahi duman özel partikül filtreli aspirasyon gerektirir. [[K6 s. 343]]</li>
</ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="20"></div>
<nav class="ders-gec"><a href="#/dersler/fizik/19">← Elektromanyetizma, alternatif akım ve transformatörler</a><a href="#/dersler/fizik/21a">Sonraki: Kapasitans ve defibrilatörler →</a></nav></section>`,
  };
})();
