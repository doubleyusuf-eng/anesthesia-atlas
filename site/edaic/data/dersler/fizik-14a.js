VERI.sorular = VERI.sorular || {};
VERI.sorular['fk14a-1'] = {
  no: 1, kok: 'Halka sistem ve karbondioksit emilimi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 239–243]]',
  onermeler: [
    {t:'Halka sistemin APL valfi inspirasyon kolunda bulunur.', d:false, n:'APL valfi fazla gazı ekspirasyon kolundan boşaltır. [[K6 s. 240]]'},
    {t:'Halkanın her kolunda bir tek yönlü valf bulunur.', d:true, n:'İki valf gazın halka içinde tek yönde ilerlemesini sağlar. [[K6 s. 240]]'},
    {t:'Soda kirecinde hızı sınırlayan basamak karbonik asit oluşumudur.', d:true, n:'CO₂’nin suyla birleşmesi üç basamağın en yavaşıdır. [[K6 s. 242]]'},
    {t:'Soda kirecinin indikatörü pH yükselip 10’u geçince tükenmeyi gösterir.', d:false, n:'Renk değişimi pH düşüp 10’un altına inince başlar. [[K6 s. 242]]'},
    {t:'Kuru absorbanla karbonmonoksit oluşumunda kitap en çok sevofluranı sorumlu tutar.', d:false, n:'Kitap karbonmonoksit açısından özellikle desfluranı, Bileşik A açısından sevofluranı vurgular. [[K6 s. 242–243]]'}
  ]
};
VERI.sorular['fk14a-2'] = {
  no: 2, kok: 'Mapleson devrelerinin yerleşimi ve verimi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 243–248]]',
  onermeler: [
    {t:'Lack devresi Magill ile aynı işlevi koaksiyel bir düzende sağlar.', d:true, n:'Lack, A sisteminin koaksiyel biçimidir ve APL ayarını makine ucuna taşır. [[K6 s. 245]]'},
    {t:'Mapleson A’da pozitif basınçlı inspirasyon taze gaz kaybını önler.', d:false, n:'Pozitif basınç APL’yi açarak taze gazın akciğere ulaşmadan kaçmasına yol açar. [[K6 s. 245]]'},
    {t:'Mapleson B’de torbayla birlikte devre hortumu da rezervuar oluşturur.', d:true, n:'Taze gaz girişinin konumu sayesinde gaz hem hortumda hem torbada depolanır. [[K6 s. 245]]'},
    {t:'Bain devresinde taze gaz iç hortumdan hastaya gider.', d:true, n:'İç hortum taze gazı taşır, dıştaki körüklü hortum ekspirasyon gazının dönüş yoludur. [[K6 s. 247]]'},
    {t:'Jackson-Rees devresi Mapleson’un ilk sınıflamasında yer alır.', d:false, n:'İlk sınıflama A–E’yi kapsar, açık uçlu torba eklenen T-parçası sonradan F adını almıştır. [[K6 s. 243]] [[K6 s. 248]]'}
  ]
};
VERI.sorular['fk14a-3'] = {
  no: 3, kok: 'Atık gaz ve ameliyathane havası', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 249–251]]',
  onermeler: [
    {t:'Pasif uzaklaştırmada gazı boru boyunca mekanik pompa çeker.', d:false, n:'Gazı ileri iten kuvvet solunum devresinde kalan pozitif basınçtır. [[K6 s. 250–251]]'},
    {t:'Cardiff Aldasorber uçucu ajan tuttukça ağırlaşır.', d:true, n:'Kartuşun kullanım süresi ağırlık artışından tahmin edilebilir. [[K6 s. 251]]'},
    {t:'Aktif uzaklaştırmada Venturi sistemi emiş sağlayabilir.', d:true, n:'Düşük negatif basınç fan, pompa veya Venturi sistemiyle elde edilir. [[K6 s. 251]]'},
    {t:'Aktif uzaklaştırma hortumunun çapı 19 mm’dir.', d:true, n:'Bu çap yanlışlıkla solunum devresine bağlanmasını önlemek için seçilmiştir. [[K6 s. 251]]'},
    {t:'Kitaptaki Birleşik Krallık sınırları genellikle sekiz saatlik zaman ağırlıklı ortalamaya uygulanır.', d:true, n:'Ortam konsantrasyonu ppm olarak ölçülür ve maruziyet genellikle sekiz saat üzerinden değerlendirilir. [[K6 s. 250]]'}
  ]
};

const FK14A_NAV = [
  ['parca','Devre parçaları'], ['halka','Halka sistem'], ['emilim','CO₂ emilimi'], ['sinif','Mapleson A–F'],
  ['akis','Solunum döngüsü'], ['bain','Bain kontrolü'], ['atik','Atık gaz'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
];

SAYFALAR['dersler/fizik/14a'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 14 · Ders 14a',
  baslik: 'Solunum devreleri: halka sistem ve Mapleson sınıflaması',
  lede: 'Soluk verirken alveolden çıkan gaz nereye gider? Halka sistemde CO₂ emilir, Mapleson devrelerinde ise alveol gazının yeniden solunmasını önlemek için uygun taze gaz akımı gerekir. [[K6 s. 240–241]] [[K6 s. 243–248]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK14A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="fk14a-${id}"><span>${i+1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk14a-parca">
<h2>Gazı taşıyan, depolayan ve boşaltan parçalar</h2>
<p class="intro">Solunum devresi, hasta hava yolunu ventilatöre veya anestezi makinesine bağlayan ve hastanın içinden soluduğu parçaların bütünüdür. [[K6 s. 238]]</p>
<div class="viz"><div class="viz-head"><h3>Halka sistem üzerinde parçaları bulun</h3></div><div data-viz="fk14a_cihaz"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Oksijen, hava ve anestezik buharın maliyeti, bunları koruyan çok düşük akımlı sistemlerin geliştirilmesini teşvik etmiştir. [[K6 s. 238]] Devrenin verimi, alveol gazının yeniden solunmasını önlemek için gereken taze gaz debisiyle ifade edilir. [[K6 s. 238]]</p>
<dl class="fk14a-kartlar">
<dt>Taze gaz ve hortum</dt><dd>Henüz solunmamış gaz devreye atmosfer basıncının oldukça üstünde, merkezi gaz hattı basıncının ise oldukça altında bir basınçla girer. [[K6 s. 239]] Körüklü yapı hortumun katlanmasını önler, geniş iç çap akıma direnci azaltır. [[K6 s. 239]]</dd>
<dt>Ayarlanabilir basınç sınırlayıcı valf (APL)</dt><dd>Ekspirasyon valfi olarak da adlandırılan APL, solukla çıkan gazı ve fazla taze gazı boşaltarak basınç birikimini sınırlar. [[K6 s. 238–239]] Atmosfere göre basınç arttıkça yay Hooke yasasına uygun olarak orantılı biçimde sıkışır. [[K6 s. 239]] Yay yeterince sıkışınca disk gazın çıkmasına izin verir, yayın yüksekliğini değiştirmek açılma basıncını ayarlar. [[K6 s. 239]] Düzenek basit ve güvenilirdir, ancak disk açık veya kapalı konumda takılabilir. [[K6 s. 239]]</dd>
<dt>Rezervuar torbası</dt><dd>İnspirasyon için taze gaz biriktiren, boşalırken sönebilen torba kısmi destek veya tam ventilasyon için elle sıkılabilir. [[K6 s. 239]] Torbanın hareketinden spontan solunumun varlığı ve paterni izlenebilir. [[K6 s. 239]]</dd>
</dl>
<p>Elipsoit torbanın genişleyebilmesi devrede basıncın hızla yükselmesini sınırlar. [[K6 s. 239]] Kitap bunu küre için Laplace ilişkisiyle açıklar: <i>ΔP</i> = 2<i>T</i>/<i>r</i> (<i>ΔP</i> duvar boyunca basınç farkı, Pa; <i>T</i> duvar gerilimi, N/m; <i>r</i> yarıçap, m). [[K6 s. 239]]</p>
<div class="viz"><div class="viz-head"><h3>Laplace ilişkisi · Yarıçap artınca ne değişir?</h3></div><div data-viz="fk14a_laplace"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Küre ve sabit duvar gerilimi varsayımıyla hesaplanan eğri; eksenler referans değerlerine göre birimsiz oranları gösterir. [[K6 s. 239]]</p></div>
<div class="card"><h3>Hesap · Aynı gerilimde iki yarıçap</h3><p>Başlangıç yarıçapına <i>r</i>₀, bu noktadaki basınç farkına Δ<i>P</i>₀ deyin. Aynı duvar geriliminde iki Laplace ifadesini böldüğünüzde Δ<i>P</i>/Δ<i>P</i>₀ = <i>r</i>₀/<i>r</i> elde edilir. [[K6 s. 239]] Yarıçap referansın iki katına geldiğinde bu modelde basınç farkı yarıya iner. [[K6 s. 239]] Kaydırıcıdaki noktayı sağa taşırken eğrinin neden aşağı indiğini bu oranla açıklayabilirsiniz. [[K6 s. 239]]</p></div>
<p>Balonu şişirirken olduğu gibi, torba hemen hemen boşken yarıçapı artırmak daha fazla basınç gerektirir. [[K6 s. 239]] Torba genişlerken basıncın 40–60 cmH₂O’nun üzerine çıkmaması beklenir, ancak aşırı gerilmiş torba sonunda patlayabilir. [[K6 s. 239]]</p>
<p>Küre modeli yarıçapın etkisini tek başına incelemeyi sağlar; kitaptaki gerçek torba elipsoittir ve basınçla genişleyebilmesi kompliyansına bağlıdır. [[K6 s. 239]] Bu nedenle kaydırıcıdan okunan basınç oranı, torbanın hangi basınçta patlayacağını vermez. [[K6 s. 239]] Kitap, iyice gerilmiş torbanın basınç artışını yarıçapında büyük bir artış olmadan karşılayabildiğini, ancak bu genişleme kapasitesinin sınırlı olduğunu belirtir. [[K6 s. 239]]</p>
<h3>Torba dolarken APL’yi nasıl düşünmeli?</h3>
<p>Torba ile APL aynı basınç artışına farklı biçimlerde yanıt verir: torba hacim kazanabilir, valf ise ayarlanan basınca gelindiğinde devreden gaz çıkmasına izin verir. [[K6 s. 239]] Bu yüzden torbanın giderek şişmesi ile gazın APL’den çıkmaya başlaması, solunum döngüsünde farklı anları gösterebilir. [[K6 s. 239]] [[K6 s. 244]]</p>
<p>Torbanın dolup boşalmasını izlerken önce hangi kuvvetin gazı hareket ettirdiğine bakın. Spontan solukta hasta depolanmış gazı çekerken, elle ventilasyonda torbayı sıkan kişi gazı akciğere doğru iter. [[K6 s. 239–240]] Aynı torba böylece hem inspirasyonda kullanılacak gazın deposu hem de solunumu izleme veya destekleme aracı olur. [[K6 s. 239]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14a-halka">
<h2>Halka sistemde bir soluğun yolu</h2>
<p class="intro">Neredeyse ideal ve yaygın kullanılan halka sistemde iki kol ve her kolda bir tek yönlü valf, gazın devreyi tek yönde dolaşmasını sağlar. [[K6 s. 240]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi kol gaz taşıyor?</h3></div><div data-viz="fk14a_halka"></div><p class="viz-cap" aria-live="polite"></p></div>
<ol class="iskelet"><li><b>Bağlamadan önce.</b> Devredeki azotu uzaklaştırmak için önce taze gazla yıkama yapılır. [[K6 s. 240–241]]</li>
<li><b>İnspirasyonda.</b> Soda kireci kabından geçen gaz taze gazla birleşir, taze gaz girişi inspirasyon valfinin önündedir. [[K6 s. 240]] Rezervuar torbası bu girişle hasta arasında, inspirasyon tarafında yer alır. [[K6 s. 240]] Ventilatörün itmesi veya spontan soluyan hastanın oluşturduğu negatif basınç, gazı inspirasyon valfinden akciğere taşır. [[K6 s. 240]]</li>
<li><b>Ekspirasyonda.</b> İnspirasyon kolundaki basınç tek yönlü valfi kapatır ve soluk ekspirasyon koluna yönelir. [[K6 s. 241]] Geri dönen gaz torbada toplanabilir, ayarlanan basınca ulaşıldığında fazlası ekspirasyon kolundaki APL’den çıkar. [[K6 s. 240–241]]</li></ol>
<p>Şemada hasta ucundan geri yürüyerek iki valfin işini ayırın. İnspirasyon sırasında akciğere doğru olan yolun açık olması gerekir; inspirasyon gazını harekete geçiren basınç farkı spontan solukta hastadan, kontrollü solukta ventilatörden doğar. [[K6 s. 240]] Ekspirasyonda aynı yola ters yönde basınç uygulanınca valf kapanır, böylece CO₂ içeren gaz diğer kola yönelir. [[K6 s. 241]]</p>
<p>Ekspirasyon valfi denince iki ayrı parçayı ayırt edin. Ekspirasyon kolundaki tek yönlü valf gazın halka içindeki yönünü belirler; aynı koldaki APL ise basınç ayarına göre gazın halkadan çıkmasını sağlar. [[K6 s. 239–241]]</p>
<h3>Akımı ne kadar azaltabiliriz?</h3>
<div class="viz"><div class="viz-head"><h3>Oksijen sunumu tüketimi karşılıyor mu?</h3></div><div data-viz="fk14a_denge"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">İdeal, kaçaksız halka ve tam CO₂ emilimi için oksijen dengesi. [[K6 s. 240]]</p></div>
<p>Absorban %100 verimle çalışıyor ve devre kaçırmıyorsa taze gazla yalnız bazal oksijen tüketimini karşılamak yeterlidir, bu tipik olarak 250–500 mL/dk’dır. [[K6 s. 240]] Düşük akımda sağlanan oksijen tüketimi karşılamayabilir. [[K6 s. 241]]</p>
<p>Standart makinede vaporizatör halka dışındadır (VOC) ve ajan taze gazla girer, halka içi vaporizatörle (VIC) günümüzde seyrek karşılaşılır. [[K6 s. 241]] VOC ayarı değiştiğinde yeni konsantrasyon hastaya hemen ulaşmaz, çünkü taze gaz toplam solunan karışımın küçük bir bölümüdür. [[K6 s. 241]]</p>
<p>Kitap, düşük iç akımda VOC çıkış konsantrasyonunun azalabildiğini ve geçmişte hastanın aldığı konsantrasyonun ajan tutulumu, dağılımı ve tablolarla tahmin edildiğini anlatır. [[K6 s. 241]] Anestezi sırasında farkındalığı önlemek için yakın klinik izlem gerekirdi, inspirasyon ve ekspirasyon gazlarının ölçümü hipoksi ve farkındalık riskini önemli ölçüde azaltmıştır. [[K6 s. 241]]</p>
<div class="card"><h3>Hesap · Bazal oksijen dengesi</h3>
<p>Kaçaksız devre ve tam emilim varsayımıyla, tüketime eşit oksijen girişinde net fark sıfırdır. [[K6 s. 240]] Şekildeki giriş ve tüketimi ayrı değiştirin; her ikisi de mL/dk cinsinden oksijen miktarıdır. [[K6 s. 240–241]]</p>
<p>Kitaptaki aralığın iki ucunu ele alalım: giriş 250 mL/dk, tüketim 500 mL/dk olursa <b>250 − 500 = −250 mL/dk</b> bulunur. [[K6 s. 240–241]] Negatif işaret, verilen oksijenin dakikada 250 mL eksik kaldığını gösterir. [[K6 s. 240–241]] Giriş de 500 mL/dk’ya getirildiğinde bu örnekte oksijen açığı kapanır. [[K6 s. 240]]</p></div>
<p>Oksijen dengesini kurduktan sonra uçucu ajanın değişimini ayrı değerlendirin. Hastanın inspirasyonda aldığı gaz, geri dönen gazla yeni eklenen taze gazın karışımıdır. [[K6 s. 240–241]] VOC kadranında seçilen yeni değer ilk anda yalnız taze gazla gelen kısmı etkiler. [[K6 s. 241]] Bu pay küçükken kadranda değişikliği görmek kolaydır, ancak devredeki etkisini görmek zaman alır. [[K6 s. 241]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14a-emilim">
<h2>Soda kireci CO₂’yi nasıl tutar?</h2>
<p class="intro">Ekspirasyon gazındaki CO₂ absorban yatağında kalsiyum karbonata dönüşür, açığa çıkan su inspirasyon gazının nemlenmesine katkıda bulunur. [[K6 s. 241–242]]</p>
<div class="viz"><div class="viz-head"><h3>Karbonun izini sürün</h3></div><div data-viz="fk14a_kimya"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="note plain"><b>Atlas notu.</b> Kitap ikinci basamağın ürün tarafında yalnız NaHCO₃ gösterir; atomları dengelemek için sağ tarafa H₂O da yazılır. [[K6 s. 242]]</div>
<p>Net tepkime <b>CO₂ + Ca(OH)₂ → CaCO₃ + H₂O (+ ısı)</b> biçimindedir, basamaklardan birinde açığa çıkan ısı devrenin ısı kaybını da kısmen karşılar. [[K6 s. 241–242]] Soda kireci denizaltı ve uzay araçlarının atmosferinden de CO₂ uzaklaştırır. [[K6 s. 241]]</p>
<div class="tbl-wrap"><table class="tbl"><caption>Ticari soda kirecinin tipik bileşimi</caption><thead><tr><th>Bileşen</th><th>Oran ve görev</th></tr></thead><tbody>
<tr><td>Kalsiyum hidroksit</td><td>%94, karbonat oluşurken tüketilir. [[K6 s. 242]]</td></tr>
<tr><td>Sodyum hidroksit</td><td>%5, yeniden oluşarak katalizör görevi görür. [[K6 s. 242]]</td></tr>
<tr><td>Potasyum hidroksit</td><td>İsteğe bağlı, %0,1’den az; karbonik asit için alternatif yol sağlar. [[K6 s. 242]]</td></tr>
<tr><td>Silika</td><td>%0,2, granüllerde bağlayıcıdır. [[K6 s. 242]]</td></tr>
<tr><td>İndikatör boya</td><td>Eser miktarda, pH 10’un altına inince renk değiştirmeye başlar. [[K6 s. 242]]</td></tr>
</tbody></table></div>
<p>Soda kirecinin en güçlü alkali bileşeni olan NaOH başlangıçta pH’ı 10’un üzerinde tutar. [[K6 s. 242]] Ca(OH)₂ tükendikçe NaOH yenilenmesi aksar ve pH düşer. [[K6 s. 242]] Düşük pH, CO₂ ve sudan karbonik asit oluşmasını yavaşlatır, böylece emilim verimi azalır. [[K6 s. 242]] İndikatörün rengi kullanılan boya karışımına göre değişebilir. [[K6 s. 242]]</p>
<p>Üreticiler özellikle çok düşük akımda karşılaşılan sorunlar için farklı absorbanlar geliştirmiştir, bunlar arasında güçlü alkali içermeyen ve çevre açısından daha elverişli seçenekler vardır. [[K6 s. 242]] Kitap ABD’de kullanılan alternatifler arasında esas olarak baryum hidroksit içeren Baralyme ile kalsiyum klorür içeren Amsorb Plus’ı sayar. [[K6 s. 242]]</p>
<div class="cols"><div class="card"><h3>Bileşik A</h3><p>Sevofluran soda kireciyle temas ettiğinde, özellikle sıcaklık yüksek veya granüller kuruysa Bileşik A oluşur. [[K6 s. 242]] Sıçanlarda halkada ulaşılamayan yüksek konsantrasyonlar öldürücüdür, düşük akımda ulaşılabilen 20–50 ppm ise nefrotoksiktir. [[K6 s. 242–243]] İnsanlarda aynı etki ikna edici biçimde gösterilememiştir, ancak kitap sevofluranla 1 L/dk altındaki akımları önermez. [[K6 s. 243]]</p></div>
<div class="card"><h3>Karbonmonoksit</h3><p>Birçok makinede oksijen düğmesi kapalıyken bile 250 mL/dk oksijen akar. [[K6 s. 243]] Kapalı devrede gece boyunca dolaşan kuru gaz granülleri kurutabilir. [[K6 s. 243]] Kurumuş soda kireci CHF₂ grubu taşıyan ajanla karşılaşınca karbonmonoksit açığa çıkabilir, en belirgin örnek desflurandır. [[K6 s. 243]] Bebeklerde karboksihemoglobin düzeyi önemli ölçüde yükselebilir. [[K6 s. 243]]</p></div></div>
<p>Şekilde ikinci basamaktan üçüncüye geçmeden önce hangi maddenin iki satırda birden geçtiğini bulun. İkinci satırın ürünü olan sodyum bikarbonat sonraki satırda kalsiyum hidroksitle birleşir. [[K6 s. 242]] Böylece geçici ara ürün olan bikarbonatla, CO₂ tutulduktan sonra granülde kalan kalsiyum karbonatı birbirinden ayırabilirsiniz. [[K6 s. 242]]</p>
<h3>Tükenmeyi tepkimeden okuyun</h3>
<ol class="iskelet"><li><b>Karbonun son durağı.</b> Karbonu izleyince gazdaki CO₂’den önce karbonik aside, ardından bikarbonata ve sonunda kalsiyum karbonata ulaşırsınız. [[K6 s. 242]] Net tepkimede tüketilen hidroksitin hangisi olduğu böylece görülebilir. [[K6 s. 242]]</li>
<li><b>Katalizörün dönüşü.</b> İkinci basamak NaOH kullanır, üçüncü basamak NaOH’yi geri verir; bu yüzden toplam eşitlikte NaOH yer almaz. [[K6 s. 242]] Son basamak için gerekli Ca(OH)₂ azalınca geri kazanım da aksar. [[K6 s. 242]]</li>
<li><b>Rengin anlamı.</b> Boya granüllerdeki alkaliliğin azalmasına yanıt verir; rengi açıklarken kalsiyum hidroksit tüketimi ile sodyum hidroksit yenilenmesi arasındaki bağı kurmak gerekir. [[K6 s. 242]]</li></ol>
<p>Düşük akımın iki kimyasal tehlikesini ayırt etmek için oluşan üründen başlayın. Sıçandaki böbrek etkisi ve ppm aralığı sevofluranın Bileşik A’sına aittir. [[K6 s. 242–243]] Gece boyunca kuru gaz geçen granüllerle ertesi gün CHF₂ içeren ajan arasındaki ilişki ise karbonmonoksit ve karboksihemoglobin açısından önemlidir. [[K6 s. 243]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14a-sinif">
<h2>Mapleson sınıflamasını bağlantılardan okuyun</h2>
<p class="intro">Tıbbi fizikçi William Mapleson, gazı ekonomik kullanırken yeniden solumayı önleme koşullarını incelemiş ve beş yarı kapalı devreyi A’dan E’ye sınıflandırmıştır. [[K6 s. 243]]</p>
<div class="viz"><div class="viz-head"><h3>Hasta ucundan başlayarak devreyi tanıyın</h3></div><div data-viz="fk14a_sinif"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Mapleson’un BJA’da yayımlanan çalışmasında düzeni belirleyen parçalar taze gaz girişi, maske, APL (taşma valfi), hortum ve torbadır; bunlar yalnız beş işlevsel düzende dizilebilir. [[K6 s. 243]] Küçük bir örnekleme dayanan hesapların dört varsayımı vardır. [[K6 s. 243]]</p>
<ol class="iskelet"><li>Solunum düzenli bir patern izler. [[K6 s. 243]]</li><li>Soluk hacmi, ekspirasyon gazını torbaya kadar itip taze gazla karıştıracak kadar büyük değildir. [[K6 s. 243]]</li><li>Ölü boşluk gazı ile alveol gazı arasında keskin bir sınır vardır. [[K6 s. 243]]</li><li>Gaz hortum içinde ilerlerken bu sınır korunur. [[K6 s. 243]]</li></ol>
<h3>A, B ve C · Torba hastaya gelen kolda</h3>
<p>Afferent düzenlerde torba içeri akım koluna bağlanır ve maskeye en yakın valf APL’dir. [[K6 s. 243–244]] Soluk boyunca gazın nereye gideceğini torbanın, APL’nin ve hastanın gösterdiği dirençler belirler. [[K6 s. 244]]</p>
<dl class="fk14a-kartlar"><dt>A · Magill ve Lack</dt><dd>Magill, gazla indüksiyonun yaygın olduğu dönemde sık kullanılmıştır. [[K6 s. 244]] Koaksiyel Lack aynı işlevi görür, ancak APL torba ve makine ucunda olduğu için oturan anestezist ayara kolayca ulaşabilir. [[K6 s. 245]]</dd>
<dt>B · Hortum da rezervuar</dt><dd>Taze gaz, hasta tarafından bakıldığında APL’nin ötesinde girer; hem hortum hem torba gaz depolar. [[K6 s. 245]] Hasta ucundaki hacimli düzen ve hem spontan hem kontrollü ventilasyonda dakika ventilasyonunun iki katı akım gerektirmesi klinik kullanımını sınırlamıştır. [[K6 s. 245]]</dd>
<dt>C · Waters</dt><dd>Yoğun bakımda sık karşılaşılan Waters devresinde çok yüksek akımlar kullanılır, bu yüzden anestezik gaz vermek için kullanımı çok seyrektir. [[K6 s. 245–246]] Kitap resüsitasyon arabasındaki balon-valf-maskeyi de C’nin bir çeşidi olarak tanımlar. [[K6 s. 246]]</dd></dl>
<h3>D, E ve F · Ekspirasyon tarafını izleyin</h3>
<dl class="fk14a-kartlar"><dt>D · Hasta ucunda taze gaz</dt><dd>İlk efferent düzende torba ekspirasyon kolundan ayrılır; kitap D’yi anestezik gaz vermek için yaygın kullanımı süren tek yarı kapalı devre olarak tanımlar. [[K6 s. 246]]</dd>
<dt>E · Ayre T-parçası</dt><dd>1937’de yarık dudak ve damak ameliyatı geçiren bebekler için geliştirilmiştir. [[K6 s. 248]] Spontan solunuma çok az direnç gösterir ve çıkan uçucu ajanı cerrahtan uzağa taşır. [[K6 s. 248]] Her iki ventilasyon biçiminde de yeniden solumayı önlemek için dakika ventilasyonunun yaklaşık 2–3 katı akım gerekir. [[K6 s. 248]]</dd>
<dt>F · Jackson-Rees</dt><dd>Gordon Jackson-Rees, T-parçasına ucunda delik bulunan bir rezervuar torbası eklemiştir; bu düzen ilk sınıflamadan sonra F adını almıştır. [[K6 s. 248]] Direnç düşük kalırken torba hareketi spontan soluğu gösterir; gerektiğinde uçtaki delik parmakla kapatılarak kontrollü ventilasyon sağlanabilir. [[K6 s. 248]]</dd></dl>
<h3>Bir çizimden sınıfa nasıl gidilir?</h3>
<ol class="iskelet"><li><b>Hasta bağlantısını sabit tutun.</b> A çiziminden B’ye geçerken maskenin yanında yine APL’yi bulursunuz; yer değiştiren parça taze gaz girişidir. [[K6 s. 244–245]] Giriş torba ucundan APL’nin gerisine geldiğinde hortumun içindeki hacim de torbayla birlikte rezervuara katılır. [[K6 s. 245]]</li><li><b>Gaz girişini izleyin.</b> D’de taze gaz hastaya yakın girerken torbanın uzak uçta olması, ekspirasyonda iki gazın neden aynı hortum boyunca ilerlediğini açıklar. [[K6 s. 246]] Torbanın hangi kola bağlandığı, düzeneği afferent veya efferent diye adlandırırken kullanılan özelliktir. [[K6 s. 243–244]] [[K6 s. 246]]</li><li><b>Serbest ucu inceleyin.</b> E’de ekspirasyon gazı açık koldan çıkar; F’de bu yolun sonunda yine atmosfere açık olan bir torba vardır. [[K6 s. 248–249]] T-parçasına torba eklenmesi hem solunumun gözle izlenmesini hem de gerektiğinde torba ucunun kapatılmasını mümkün kılar. [[K6 s. 248]]</li></ol>
<p>Koaksiyel düzeni tanırken yalnız APL düğmesinin elinize yakın olmasına bakmayın. Lack’in işlevi A, Bain’in işlevi D ile aynıdır; her ikisinde de torba ve ayar elemanlarına makine ucundan erişilebilir. [[K6 s. 245]] [[K6 s. 247]] Bu yüzden gazın hasta ucuna nasıl ulaştığını izlemek, dış görünüşleri benzer devreleri ayırmaya yardım eder. [[K6 s. 245–247]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14a-akis">
<h2>A ve D’de solunum döngüsü</h2>
<p class="intro">A devresi spontan solunumda, D devresi ise kontrollü ventilasyonda daha az taze gazla alveol gazının yeniden solunmasını sınırlar. [[K6 s. 245–247]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı solunum evresini iki devrede karşılaştırın</h3></div><div data-viz="fk14a_faz"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Magill’de önce hangi gaz geri döner?</h3>
<p>İnspirasyonda negatif basınç APL’yi kapatır, hasta hem önceden taze gazla dolmuş devreden hem torbadan gaz çeker. [[K6 s. 244]] İnspirasyon bitince taze gaz kısmen sönmüş torbayı doldurmaya başlarken hasta ilk 150 mL’lik CO₂ içermeyen ölü boşluk gazını hortuma verir. [[K6 s. 244]]</p>
<p>Torba doldukça direnci artar; yaklaşık olarak alveol gazının gelişinde torba ve hastanın direnci APL’nin açılmasına yetecek düzeye gelir. [[K6 s. 244]] Böylece CO₂ içeren gaz dışarı çıkar. [[K6 s. 244]] Ekspirasyon sonu beklemede hastaya doğru direnç yüksek kalır ve taze gaz, APL yakınındaki CO₂ içerebilen gazı dışarı süpürür. [[K6 s. 244]]</p>
<p>Düzenli solunumda ve soluk hacminin devre hacmine oranı uygunken, dakika ventilasyonu kadar taze gaz yeniden solumayı önleyebilir. [[K6 s. 244–245]] Sıcak, nemli ve CO₂ içermeyen ölü boşluk gazı yeniden solunabiliyorsa deneylerle de desteklenen gereksinim yaklaşık alveoler ventilasyon, yani dakika ventilasyonunun %70’idir. [[K6 s. 245]]</p>
<p>Kontrollü inspirasyonda ventilatörün pozitif basıncı APL’yi açar ve taze gazın bir kısmı akciğere varmadan kaybolur. [[K6 s. 245]] Ekspirasyonda basınç yeterince hızlı yükselmezse alveol gazı valften atılmadan yeniden solunur; bunu önlemek yaklaşık 20 L/dk gerektirdiğinden A bu kullanımda verimsizdir. [[K6 s. 245]]</p>
<div class="note"><b>Magill’de evreyi basınçtan çıkarın.</b> Spontan inspirasyonda devredeki basıncı düşüren hasta olduğundan APL kapalı kalır ve torba işe yarar bir rezervuardır. [[K6 s. 244]] Aynı devreye pozitif basınçlı soluk verildiğinde akciğeri doldurması beklenen basınç APL’yi de açar. [[K6 s. 245]] Devrenin parçaları değişmediği hâlde spontan ve kontrollü ventilasyondaki akım gereksinimlerinin birbirinden bu kadar farklı olmasının nedenlerinden biri budur. [[K6 s. 244–245]]</div>
<h3>D’de bekleme süresi neyi değiştirir?</h3>
<p>Taze gazla dolu D devresinde spontan inspirasyon torbayı söndürür. [[K6 s. 246]] Ekspirasyon gazı geri dönerken hasta ucundan taze gaz girişi sürer; torba dolarken uzak uçta ölü boşluk, alveol ve taze gaz karışır. [[K6 s. 246]] Basınç APL eşiğini aşınca karışımın fazlası atılır. [[K6 s. 246]]</p>
<p>Beklemede taze gaz körüklü hortumu süpürerek karışımı APL’ye iter, ancak spontan solunumda alveol gazının yeniden solunmasını önlemek için 100–150 mL/kg/dk gerekir. [[K6 s. 246]] Kontrollü ventilasyonda inspirasyon/ekspirasyon süre oranı genellikle 1:2 veya 1:3 olur; uzayan ekspiratuvar aralık yıkanmaya daha çok zaman bırakır. [[K6 s. 247]]</p>
<p>Daha büyük soluk hacimleri akciğere daha fazla gaz taşır; yeniden alınan alveol gazı artsa bile daha fazla taze gazla seyreldiğinden solunan karışımdaki payı azalır. [[K6 s. 247]] Böylece kontrollü D’de 70 mL/kg/dk yeterli olabilir. [[K6 s. 247]] A ve D’nin her ikisinde de ventilasyon biçimi ne olursa olsun halkanın çok düşük akımlarından daha yüksek akım gerekir; karıştırılmaları tehlikeli yeniden solumaya yol açabilir. [[K6 s. 247]]</p>
<div class="card"><h3>Hesap · Hangi akımlar doğrudan karşılaştırılabilir?</h3>
<p>Dakika ventilasyonunu <i>V̇</i><sub>E</sub>, taze gaz debisini <i>Q</i> ile gösterin; ikisi de L/dk cinsinden yazılabilir. [[K6 s. 244–246]] A’da düzenli spontan solunum için başlangıç karşılaştırması <i>Q</i> = <i>V̇</i><sub>E</sub> iken, ölü boşluk gazı korunursa <i>Q</i> ≈ 0,70 × <i>V̇</i><sub>E</sub> olur. [[K6 s. 244–245]]</p>
<p>Aynı dakika ventilasyonunda B için <i>Q</i> ≈ 2 × <i>V̇</i><sub>E</sub>, E için <i>Q</i> ≈ (2–3) × <i>V̇</i><sub>E</sub> alınır; bu iki karşılaştırma her iki ventilasyon biçimi için de geçerlidir. [[K6 s. 245]] [[K6 s. 248]] A için verilen yaklaşık 20 L/dk ise kontrollü ventilasyondaki mutlak debidir. [[K6 s. 245]]</p>
<p>D’nin sayıları farklı okunur: 100–150 ve 70 değerleri hastanın kilogramı başına dakikadaki mililitrelerdir. [[K6 s. 246–247]] Toplam taze gazı mL/dk olarak ifade etmek için spontan ya da kontrollü ventilasyona karşılık gelen özgül debiyi vücut kütlesiyle (kg) çarparsınız. [[K6 s. 246–247]]</p></div>
<p>Şekilde iki devreyi geç ekspirasyon anında durdurun. Magill’de CO₂ içeren gaz, hastaya yakın APL’ye ulaştığı sırada torbanın dolmuş olması boşaltımı kolaylaştırır. [[K6 s. 244]] D’de ise uzak uçtaki APL açılmadan önce torba tarafında çoktan bir karışım oluşmuştur. [[K6 s. 246]] Bir sonraki soluğa hazırlık için geçen sürenin uzaması özellikle bu karışımın hortumdan süpürülmesine yardım eder. [[K6 s. 246–247]]</p>
<p>Verimi açıklarken önce hangi gazın yeniden solunduğunu belirtin. Magill’de CO₂ içermeyen ölü boşluk gazının korunması ısı ve nemin de korunmasına izin verir. [[K6 s. 245]] D’de ise ekspirasyon sırasında taze gaz alveol gazıyla karıştığından, bir sonraki inspirasyondan önce hortumun yıkanmasına ne kadar zaman kaldığı önem taşır. [[K6 s. 246–247]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14a-bain">
<h2>Bain’de görünmeyen ayrılma</h2>
<p class="intro">Bain ve Spoerel’in 1972’de tanıttığı koaksiyel D devresinde taze gaz iç hortumdan hastaya gider, ekspirasyon gazı dıştaki körüklü hortumdan geri döner. [[K6 s. 247]]</p>
<div class="viz"><div class="viz-head"><h3>İç hortumun bağlantısını değiştirin</h3></div><div data-viz="fk14a_bain"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Lack’te olduğu gibi koaksiyel yerleşim devrenin kapladığı alanı azaltır ve makine tarafındaki ayarlara otururken erişim sağlar. [[K6 s. 247]] Bain, örneğin manyetik rezonans görüntülemede makinenin hastadan uzakta durduğu anesteziler için özellikle elverişlidir. [[K6 s. 247]]</p>
<p>İç hortum makine ucunda taze gaz girişi ve APL’nin bulunduğu bölümden ayrılırsa iki gaz daha hastaya ulaşmadan uzak uçta karışır. [[K6 s. 247]] Dış hortum sağlam görünebilir, ancak oluşan büyük ölü boşluğu çok yüksek akım bile telafi edemez. [[K6 s. 247]]</p>
<ol class="iskelet"><li><b>Akımölçerle kontrol.</b> Kitapta tarif edilen ilk yöntemde 2 mL’lik enjektörün pistonu çıkarılır ve iç hortumu tıkamak için kullanılır. [[K6 s. 247]] Geri basınç artışı, akımölçer şamandırasının aşağı inmesiyle anlaşılır. [[K6 s. 247]]</li><li><b>Oksijen yıkamasıyla kontrol.</b> Kitabın tercih ettiği yöntemde yaklaşık 5 L/dk akım başlatılır, ardından oksijen yıkama düğmesine basılır. [[K6 s. 247–248]] Dar iç hortumda hızlanan akım Venturi etkisiyle dış koldan gaz çeker; torbanın sönmesi beklenen gözlemdir. [[K6 s. 248]]</li></ol>
<p>Oksijen yıkaması sırasında torbayı hangi akımın söndürdüğünü basamaklara ayırın. Başlangıçta devreye akım verilir; yıkama düğmesine basılmasıyla hızlanan gaz dar iç hortumdan çıkar. [[K6 s. 247–248]] Bu jetin oluşturduğu Venturi etkisi dış hortumdan da gaz çektiği için gözlem yeri iç hortumun ağzı değil, rezervuar torbasıdır. [[K6 s. 248]]</p>
<p>Bu iki kontrolde gözlenen parçalar farklıdır. İlkinde iç hortumu geçici olarak tıkayarak oluşturduğunuz geri basıncı makinedeki akımölçer üzerinden okursunuz. [[K6 s. 247]] İkincisinde iç hortumdan geçen hızlı oksijenin dış koldaki gaza etkisini torbanın hacmindeki azalmadan okursunuz. [[K6 s. 247–248]]</p>
<p>Devreyi değerlendirirken makine ucundan ayrılan iç hortumu, dış hortumdan bütünüyle ayrılan bir hasta bağlantısından ayırın. İç bağlantı ayrıldığında sorun, taze gazın ekspirasyon gazına hasta ucuna gelmeden karışmasıdır. [[K6 s. 247]] Bu nedenle dış hortumu görmenin ötesinde iç gaz yolunun bütünlüğünü sınamak gerekir. [[K6 s. 247–248]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14a-atik">
<h2>Atık gaz devreden çıktıktan sonra</h2>
<p class="intro">Ameliyathane maruziyetini azaltmak için ajan kullanımını azaltmak, gazı devrede tutmak ve çıkan gazı uzaklaştırmak birlikte ele alınır. [[K6 s. 250]]</p>
<div class="viz"><div class="viz-head"><h3>Atık gazı hangi basınç hareket ettirir?</h3></div><div data-viz="fk14a_atik"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Uçucu ajanların çalışanlara olası zararı nedeniyle kitap, Birleşik Krallık COSHH düzenlemeleri kapsamında risk değerlendirmesi, azaltma planı ve maruziyet izlemini tarif eder. [[K6 s. 249]] İşverenin düzeyleri kontrol etme ve izleme yükümlülüğünü 1996 tarihli Health and Safety Commission’a dayandırır. [[K6 s. 249–250]]</p>
<div class="tbl-wrap"><table class="tbl"><caption>Kitaptaki Birleşik Krallık üst sınırları, genellikle 8 saatlik zaman ağırlıklı ortalama [[K6 s. 250]]</caption><thead><tr><th>Ortamda ölçülen ajan</th><th>Milyonda bir kısım (ppm)</th></tr></thead><tbody><tr><td>Halotan</td><td>10 [[K6 s. 250]]</td></tr><tr><td>Enfluran / izofluran</td><td>Her biri 50 [[K6 s. 250]]</td></tr><tr><td>Azot protoksit (N₂O)</td><td>100 [[K6 s. 250]]</td></tr></tbody></table></div>
<p>Kitabın aktardığı deneyimde önlemlerle birlikte örneklemeler sürekli kabul edilebilir düzeyler gösterdiğinden izlem daha seyrek yapılır olmuştur. [[K6 s. 250]]</p>
<ul class="ozet"><li><b>Kullanımı azaltın.</b> Düşük akımlı teknikler daha az uçucu ajan tüketir; vaporizatör doldurulurken özen gösterilir. [[K6 s. 250]]</li><li><b>Gazı devrede tutun.</b> Kaçaksız halka sistem ve uygun olduğunda düşük taze gaz akımı kullanılır. [[K6 s. 250]]</li><li><b>İki ayrı yerden uzaklaştırın.</b> Oda havası havalandırma veya iklimlendirmeyle yenilenir, solunum devresindeki atık ise anestezik gaz uzaklaştırma sistemiyle (AGSS) alınır. [[K6 s. 250]]</li></ul>
<p>Ameliyathanede ideal olarak pozitif basınçlı, havayı geri dolaştırmayan bir sistem saatte 15–20 hava değişimi sağlamalıdır. [[K6 s. 250]] Entonox kullanılan doğum ünitesi gibi alanlarda saatte en az beş hacim değişimi verilir. [[K6 s. 250]]</p>
<dl class="fk14a-kartlar"><dt>Pasif uzaklaştırma</dt><dd>Devrede kalan pozitif basınç gazı bir borudan ameliyathane ortamının dışına iter; mekanik yardım gerekmez. [[K6 s. 250–251]] Sistem basit ve düşük maliyetlidir, ancak devre akımındaki değişiklikler uzaklaştırmayı etkisiz kılabilir. [[K6 s. 251]]</dd>
<dt>Cardiff Aldasorber</dt><dd>Bu pasif filtrede aktif kömür uçucu ajanları tutar, azot protoksiti tutmaz. [[K6 s. 251]] Başlangıçta 1 kg olan kartuş ağırlaştıkça kullanım ömrü tahmin edilebilir; düzenek basit ve ucuzdur. [[K6 s. 251]]</dd>
<dt>Aktif uzaklaştırma</dt><dd>Fan, pompa veya Venturi sistemi düşük negatif basınç oluşturur; atık gaz hortum ve borulardan geçip klinik alanın dışındaki çıkışa taşınır. [[K6 s. 251]] Rezervuardaki açıklıklar emniyet valfi gibi çalışır, bakteri filtresi solunum devresini dış egzozdan ayırır. [[K6 s. 251]] Hortum çapının 19 mm seçilmesi, solunum devresine yanlış bağlantıyı önler. [[K6 s. 251]]</dd></dl>
<div class="note"><b>Aktif kömür ile aktif uzaklaştırmayı ayırın.</b> Cardiff kartuşunun içinde “aktif” kömür bulunması, gazı sistemden bir pompanın çektiği anlamına gelmez; kitap bu cihazı pasif sistemler arasında sınıflandırır. [[K6 s. 251]] Kartuşun ağırlık artışı tuttuğu uçucu ajandan gelir, bu gözlem azot protoksitin de uzaklaştırıldığını göstermez. [[K6 s. 251]] Aktif AGSS’yi tanımlayan özellik gazın hangi maddeden geçtiği değil, gaz akımını oluşturan mekanik negatif basınçtır. [[K6 s. 251]]</div>
<p>Maruziyet tablosunu okurken ölçümün nerede yapıldığını ve hangi süreyi temsil ettiğini belirtin. Buradaki ppm değerleri çalışanların bulunduğu ortamda ölçülen ajan konsantrasyonlarına aittir ve genellikle sekiz saatlik zaman ağırlıklı ortalama olarak ele alınır. [[K6 s. 249–250]] Saatteki hava değişimi ise aynı ortamda havanın hangi hızla yenilenmesinin istendiğini anlatır. [[K6 s. 250]]</p>
<p>Gazın devreden çıktıktan sonraki yolunu çizdiğinizde iki önlemin neden birlikte yer aldığı görülür. AGSS doğrudan devrenin egzozundan gelen gazı alır, ameliyathane havalandırması ise genel ortam havasını yeniler. [[K6 s. 250–251]] Aktif sistemdeki rezervuar açıklıkları basınç açısından güvenlik sağlarken bakteri filtresi dış çıkış ile solunum devresi arasındaki ayrımı sağlar. [[K6 s. 251]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14a-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk14a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk14a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk14a-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk14a-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu · Ekipman</span><p>MR odasında Bain devresiyle kontrollü ventilasyon planlıyorsunuz. Gazın yolunu anlatın. Hasta bağlanmadan önce görünmeyen bir ayrılmayı nasıl araştırırsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Bain, D’nin koaksiyel biçimidir; az yer kaplar ve makine uzaktayken kullanılabilir. [[K6 s. 247]]</li>
<li>İç hortum taze gazı hasta ucuna getirir, ekspirasyon karışımı dış koldan torba ve APL’ye döner. [[K6 s. 246–247]]</li>
<li>Kontrollü solunumda daha uzun ekspirasyon aralığı hortumun yıkanmasına, daha büyük soluk hacmi alveol gazının seyrelmesine katkıda bulunur. [[K6 s. 247]]</li>
<li>İç hortumun makine ucunda ayrılması büyük bir ölü boşluk oluşturur; akımı artırmak bunu gidermez. [[K6 s. 247]]</li>
<li>Yaklaşık 5 L/dk akım başlatıp oksijen yıkaması uygulandığında sağlam iç hortumdaki hızlı akım dış koldan gaz çekerek torbayı söndürür. [[K6 s. 247–248]]</li>
<li>Diğer kontrolde iç hortum 2 mL enjektör pistonuyla tıkandığında geri basınç akımölçer şamandırasını aşağı iter. [[K6 s. 247]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Bain devresinin iç ve dış hortumlarını, hasta ucunu, torbayı ve APL’yi çizip gazların yönlerini okla gösterin. [[K6 s. 246–248]]</div><div class="note plain"><b>Olası ek sorular.</b> Spontan soluyacak hastada Magill’in avantajı nedir? [[K6 s. 244–245]] Halka sisteme geçerseniz akımı azaltmayı hangi iki varsayım mümkün kılar? [[K6 s. 240]]</div></div></section>
<section class="wrap blk ders-sec" id="fk14a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Halkada gaz tek yönde döner; işleyen absorban ve sızdırmaz devre bazal oksijen tüketimine yakın akımları mümkün kılar. [[K6 s. 240]]</li>
<li>Soda kirecinde kalsiyum hidroksit tüketilir, sodyum hidroksit yenilenir ve pH düşünce indikatör renk değiştirir. [[K6 s. 242]]</li>
<li>A’yı tanımak için maskeye yakın APL’yi, D’yi tanımak için hasta ucundaki taze gaz girişini bulun. [[K6 s. 244]] [[K6 s. 246]]</li>
<li>A’da pozitif basınç taze gazı erkenden dışarı atarken D’de ekspirasyon sonu bekleme karışmış gazın atılmasına zaman kazandırır. [[K6 s. 245–247]]</li>
<li>Bain’de dışarıdan sağlam görünen hortumun içinde ayrılma olabilir; oksijen yıkamasındaki torba hareketi iç yolu sınar. [[K6 s. 247–248]]</li>
<li>Pasif uzaklaştırmada devrenin artık basıncı iter, aktif uzaklaştırmada mekanik negatif basınç çeker. [[K6 s. 250–251]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="14a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/13">← Tıbbi gaz kaynakları: tüpler, merkezi sistem, vakum ve yanma riski</a><a href="#/dersler/fizik/14b">Sonraki: Ventilatörler ve ventilasyon modları →</a></nav></section>`
};
