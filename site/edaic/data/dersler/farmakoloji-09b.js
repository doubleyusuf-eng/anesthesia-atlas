VERI.sorular = VERI.sorular || {};
(function () {
  const kagit = 'Paper A · Farmakoloji';
  VERI.sorular['far09b-1'] = {
    no: 1, kagit, kok: 'Tiyopentalin hazırlanması ve dağılımı', kaynak: '[[K3 s. 109–112]]',
    onermeler: [
      {t:'Alkali ortam tiyopentalin keto formunu destekler.', d:false, n:'Alkali pH, suda daha iyi çözünen enol formunu destekler. [[K3 s. 110]]'},
      {t:'Plazmadaki toplam tiyopentalin %12’si hem serbest hem iyonize olmamış haldedir.', d:true, n:'Serbest %20’lik payın %60’ı iyonize değildir. [[K3 s. 111–112]]'},
      {t:'Tek bolustan sonra erken uyanmayı başlıca hepatik oksidasyon açıklar.', d:false, n:'Erken uyanmayı dokulara yeniden dağılım açıklar. [[K3 s. 112]]'},
      {t:'Nonsteroid antiinflamatuvar ilaçlar serbest tiyopental fraksiyonunu artırabilir.', d:true, n:'Kullanılabilir protein bağlanma yerleri azalabilir. [[K3 s. 112]]'},
      {t:'Tiyopentalin metabolitlerinin tümü inaktiftir.', d:false, n:'Metabolitlerin çoğu inaktiftir ancak pentobarbital aktif bir metabolittir. [[K3 s. 112]] [[K3 s. 115]]'}
    ]
  };
  VERI.sorular['far09b-2'] = {
    no: 2, kagit, kok: 'Propofolün klinik etkileri ve kinetiği', kaynak: '[[K3 s. 113–114]]',
    onermeler: [
      {t:'Propofolle öksürük ve laringospazm seyrek görülür.', d:true, n:'Bu özellik supraglottik hava yolu yerleştirilmesini kolaylaştırır. [[K3 s. 113]]'},
      {t:'Opioidle birlikte verildiğinde bradikardi görülebilir.', d:true, n:'Propofol özellikle opioid eşliğinde bradikardiyle ilişkilidir. [[K3 s. 113]]'},
      {t:'Distonik hareketler genellikle kortikal nöbet aktivitesini gösterir.', d:false, n:'Kitap olası açıklama olarak subkortikal eksitasyon ve inhibisyon arasındaki dengesizliği verir. [[K3 s. 113]]'},
      {t:'Propofolün klirensi hepatik kan akımını aşar.', d:true, n:'Yaklaşık 2.2 l.dk⁻¹ klirens, ekstrahepatik metabolizmaya işaret eder. [[K3 s. 114]]'},
      {t:'Uzayan infüzyonda bağlama duyarlı yarılanma süresi kısalır.', d:false, n:'Bu süre uzar, ancak dikkatli titrasyonla uyanma görece hızlı olabilir. [[K3 s. 114]]'}
    ]
  };
  VERI.sorular['far09b-3'] = {
    no: 3, kagit, kok: 'Propofol infüzyon sendromu ve uygulama güvenliği', kaynak: '[[K3 s. 115–116]]',
    onermeler: [
      {t:'Propofol infüzyon sendromu yalnız çocuklarda bildirilmiştir.', d:false, n:'Erişkinlerde de yoğun bakım sedasyonu sırasında bildirilmiştir. [[K3 s. 115]]'},
      {t:'Brugada benzeri EKG değişiklikleri kardiyak işlev bozukluğundan önce görülebilir.', d:true, n:'EKG değişiklikleri yeni başlayan asidoz ve kardiyak bozulmayı önceleyebilir. [[K3 s. 115]]'},
      {t:'Sepsis ve yanık yüksek riskle ilişkilidir.', d:true, n:'Her ikisi de kitapta yüksek riskli durumlar arasında sayılır. [[K3 s. 116]]'},
      {t:'Derin subkutan enjeksiyon ilk kez indüksiyon başarısız olunca fark edilebilir.', d:true, n:'Enjeksiyon başlangıçta belirgin ağrı vermeyebilir. [[K3 s. 116]]'},
      {t:'Kullanılmamış propofol yakılmak üzere ayrılır.', d:true, n:'Çevresel kontaminasyonu önlemek için atık ayrı kapta toplanır. [[K3 s. 116]]'}
    ]
  };

  const nav = [['ajan','Ajan seçimi'],['flakon','Tiyopental flakonu'],['etki','Klinik etkiler'],['kinetik','Dağılım ve klirens'],['risk','Propofol güvenliği'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  const sekil = (id, ad, dip) => `<div class="viz"><div class="viz-head"><h3>${ad}</h3></div><div data-viz="a09b_${id}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${dip}</p></div>`;
  SAYFALAR['dersler/farmakoloji/09b'] = {
    grup:'dersler', eyebrow:'Farmakoloji · Kısım 2 · Bölüm 9 · Ders 09b', baslik:'İntravenöz anestezikler: barbitüratlar ve propofol',
    lede:'Bir kol–beyin dolaşım süresinde bilinç kaybı, intravenöz anesteziklerin ortak tanımıdır. [[K3 s. 108]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad])=>`<button type="button" data-scroll="a09b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a09b-ajan"><h2>İdeal ajandan ne bekleriz?</h2>
<p class="intro">İdeal ajan hızla etki etmeli, uzun infüzyonda birikmeden hızlı derlenme sağlamalıdır. [[K3 s. 109]]</p>
${sekil('ideal','Bir ajanı hangi aşamada değerlendiriyoruz?','Şematik/nitel · İdeal ajanın özellikleri. [[K3 s. 109]]')}
<p>Kitap, güncel ajanları barbitürat (tiyopental) ve barbitürat olmayanlar (propofol, ketamin, etomidat) olarak ayırır. [[K3 s. 109]] GABA<sub>A</sub> reseptöründe barbitüratlar ve propofolün genel anestezik bölgesindeki etkisi için <a href="#/dersler/farmakoloji/09a">09a dersine</a> bakın. [[K3 s. 108]]</p>
<ul class="a09b-liste">
<li><b>Barbitüratlar.</b> 1930’larda hızlı başlayan ve görece kısa süren etkileriyle öne çıktılar. [[K3 s. 108]] Kullanıma giriş sırası heksobarbiton, tiyopental ve metoheksitondur. [[K3 s. 108]]</li>
<li><b>Diğer seçenekler.</b> Ciddi psikotomimetik reaksiyonlar fensiklidinin (melek tozu) kullanımını sonlandırdı, kimyasal akrabası ketamin ise kullanılmaya devam etti. [[K3 s. 108]] İmidazol esteri etomidat dolaşım stabilitesi sağlar, ancak yan etkileri kullanımını sınırlar. [[K3 s. 108]]</li>
<li><b>Propofol ve steroidler.</b> Hazır preparatı, derlenme profili ve hedef kontrollü infüzyona (TCI) uygunluğu fenolik propofolü en yaygın ajan haline getirmiştir. [[K3 s. 108]] Pregnalolonun düşük çözünürlüğü ve altezinin çözücüsü kremofor EL ile ilişkili anafilaksi steroid ajanların terk edilmesine yol açmıştır. [[K3 s. 108]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09b-flakon"><h2>Tiyopental neden alkali hazırlanır?</h2>
<p class="intro">Barbitüratlar nötr pH’da suda güç çözünür, alkali ortam ise keto–enol dengesini suda çözünen enol yönüne kaydırır. [[K3 s. 109–110]]</p>
${sekil('ortam','Flakondan damara geçince ne değişir?','Şematik/nitel · Konsantrasyon ve pH değerleri çeviriden. [[K3 s. 110]] [[K3 s. 112]]')}
<p>Flakondaki soluk sarı toz tiyopentalin sodyum tuzudur. [[K3 s. 109]] Ağırlıkça %6 sodyum karbonat suyla tepkimeye girer: Na₂CO₃ + H₂O → NaHCO₃ + Na⁺ + OH⁻. [[K3 s. 109–110]]</p>
<ul class="a09b-liste"><li><b>Neden azot?</b> Havadaki CO₂ suyla bikarbonat ve H⁺ oluşturabilir, alkaliniteyi azaltıp keto formunu artırabilir. [[K3 s. 110]] Flakonda hava yerine azot kullanılır. [[K3 s. 109–110]] %2.5’lik çözelti günlerce stabildir ve alkali pH nedeniyle bakteriyostatik olması beklenir. [[K3 s. 110]]</li>
<li><b>Yapı.</b> Üre ile malonik asidin kondensasyonu barbitürik asit ve su verir. [[K3 s. 109–110]] C2’de oksijenin yerini kükürt alınca oksibarbitürattan tiyobarbitürat oluşur. [[K3 s. 109]] Tiyopental, pentobarbitalin kükürtlü analoğudur. [[K3 s. 109]]</li>
<li><b>Yapının sonucu.</b> Tiyobarbitüratlar genellikle lipitte çok çözünür, proteine güçlü bağlanır ve karaciğerde tamamen metabolize edilir. [[K3 s. 109]] Oksibarbitüratlarda lipit çözünürlüğü ve bağlanma daha düşüktür, bazıları neredeyse bütünüyle değişmeden idrara geçer. [[K3 s. 109]]</li>
<li><b>Arteriyel enjeksiyon.</b> Kitaba göre tedavi hemen başlar ve intraarteriyel papaverin veya prokain, analjezi, ekstremiteye sempatik blok ve antikoagülasyon içerebilir. [[K3 s. 112]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09b-etki"><h2>İndüksiyondan sonra ne değişir?</h2>
<p class="intro">Her iki ilaç sistemik vasküler direnci düşürür, ancak kalp hızının yanıtı farklı olabilir. [[K3 s. 111]] [[K3 s. 113]]</p>
${sekil('dolasim','İlacı değiştirin ve kalp hızı yanıtını izleyin','Şematik/nitel · Oklar değişimin yönünü gösterir. [[K3 s. 111]] [[K3 s. 113]]')}
<h3>Tiyopental</h3><ul class="a09b-liste">
<li><b>Kullanım.</b> İntravenöz 3–7 mg.kg⁻¹ ile indüksiyon hızlıdır, tek dozun etkisi yaklaşık 5–10 dakika sürer. [[K3 s. 111]] Eskiden kullanılan rektal yolda başlangıç yavaştır. [[K3 s. 111]]</li>
<li><b>Beyin.</b> Serebral oksijen tüketimi, kan akımı, kan hacmi ve beyin omurilik sıvısı basıncı azalır. [[K3 s. 111]] Çok düşük dozda antianaljeziktir. [[K3 s. 111]] Bazen status epileptikusta kullanılır. [[K3 s. 111]] Sürekli infüzyonla daha kolay korunan yeterli plazma düzeyinde izoelektrik EEG, serebral oksijen gereksiniminin en düşük düzeye indiğini gösterir. [[K3 s. 111]] Bu dozlarda yeterli serebral perfüzyon için inotropik destek gerekebilir. [[K3 s. 111]]</li>
<li><b>Solunum ve böbrek.</b> Solunum depresyonu doza bağlıdır, laringospazm ve bronkospazm gelişebilir. [[K3 s. 111]] Düşük kardiyak debi ve santral depresyona ikincil artan antidiüretik hormon salınımı idrar çıkışını azaltabilir. [[K3 s. 111]]</li>
<li><b>Anafilaksi ve porfiri.</b> Ciddi anafilaksi yaklaşık 20000 uygulamada 1 görülür. [[K3 s. 111]] Akut krizi tetikleyebildiğinden tiyopental porfiride kesin kontrendikedir. [[K3 s. 111]] Kitap diğer olası tetikleyiciler arasında diğer barbitüratları, etomidat, halotan, kokain, lidokain, prilokain, klonidin, metoklopramid, hiyosin, diklofenak ve ranitidini sayar, bupivakaini güvenli olarak niteler. [[K3 s. 111]]</li></ul>
<h3>Propofol</h3><ul class="a09b-liste">
<li><b>Emülsiyon.</b> 2,6-diizopropilfenol lipitte iyi, suda güç çözündüğü için %1 veya %2 lipit–su emülsiyonu halinde sunulur. [[K3 s. 112]] Jeneriklerin yardımcı maddeleri değişse de soya fasulyesi yağı, yumurta lesitini ve gliserol ortaktır. [[K3 s. 112–113]] Orta zincirli trigliserit eklenmesinin amacı serbest propofolü ve enjeksiyon ağrısını azaltmaktır. [[K3 s. 113]] Zayıf organik asittir (pKa 11), pH 7.4’te neredeyse tümü iyonize olmamıştır. [[K3 s. 113]]</li>
<li><b>Kullanım.</b> Genel anestezi indüksiyon dozu 1–2 mg.kg⁻¹, idame plazma konsantrasyonu 4–8 µg.ml⁻¹’dir. [[K3 s. 113]] Yoğun bakımda ventilasyon uygulanan hastaların sedasyonunda da kullanılır. [[K3 s. 113]]</li>
<li><b>Hava yolu.</b> Apneye varan solunum depresyonu sıktır. [[K3 s. 113]] Öksürük ve laringospazm seyrek olduğundan supraglottik hava yolu yerleştirmek için sıklıkla seçilir. [[K3 s. 113]]</li>
<li><b>Hareketler.</b> Hastaların %10’una kadarında koreiform bileşenli distoni ve opistotonus gibi eksitatör etkiler görülebilir. [[K3 s. 113]] Olası açıklama kortikal nöbetten çok subkortikal eksitatör ve inhibitör merkezler arasındaki dengesizliktir. [[K3 s. 113]] Propofol status epileptikus kontrolünde de kullanılmıştır. [[K3 s. 113]]</li>
<li><b>Bulantı ve ağrı.</b> İndüksiyon, idame veya ameliyat sonrası subhipnotik dozlarda antiemetik etki için kanıt sınırlıdır, olası mekanizma dopamin D₂ antagonizmasıdır. [[K3 s. 113]] Küçük vene enjeksiyon ağrısını propofolle lidokain karıştırmak veya venöz drenaj için ekstremiteyi yükseltmek azaltabilir. [[K3 s. 114]]</li>
<li><b>Diğer etkiler.</b> Uzun infüzyonu hiperlipidemi ve kalp, karaciğer, böbrek, akciğerde yağ infiltrasyonuyla seyreden yağ yüklenmesi izleyebilir. [[K3 s. 114]] İdrar ve saç yeşile boyanabilir. [[K3 s. 114]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09b-kinetik"><h2>Başlangıç, uyanma ve eliminasyon</h2>
<p class="intro">Tek bolustan sonra erken uyanmayı anlamak için ilacın önce hangi dokuya ulaştığını, ardından nereye dağıldığını izleyin. [[K3 s. 112]] [[K3 s. 114]]</p>
${sekil('fraksiyon','Tiyopentalin ne kadarı hemen kullanılabilir?','Çubuklar toplam plazma tiyopentalinin paylarını gösterir. [[K3 s. 111–112]]')}
<p>Proteine bağlı ve serbest tiyopental dinamik dengededir. [[K3 s. 111]] Lipit çözünürlüğü ve beynin kardiyak debiden aldığı büyük pay, küçük kullanılabilir fraksiyona rağmen başlangıcı hızlandırır. [[K3 s. 111]]</p>
<ul class="a09b-liste"><li><b>Bağlanma değişirse.</b> Kritik hastada asidoz iyonize olmayan payı artırır, azalan protein bağlanmasıyla birlikte indüksiyon için daha küçük doz gerekir. [[K3 s. 111–112]] Nonsteroid antiinflamatuvarlar bağlanma yerlerini azaltıp serbest payı artırabilir. [[K3 s. 112]]</li>
<li><b>Tiyopentalin üç üslü düşüşü.</b> Önce iyi perfüze beyin ve karaciğere, sonra kas ve deriye dağılım olur. [[K3 s. 112]] Erken uyanma yeniden dağılımla, son düşüş hepatik oksidasyonla açıklanır. [[K3 s. 112]] Metabolitlerin çoğu inaktiftir, pentobarbital aktif istisnadır. [[K3 s. 112]] [[K3 s. 115]] İnfüzyonda hepatik enzimler doyarsa metabolizma sıfırıncı dereceye geçebilir, tek doz bile karma işlevli oksidaz sistemini (sitokrom P450) indükler. [[K3 s. 112]]</li>
<li><b>Propofolün başlangıcı.</b> Başlıca albümine ve ayrıca eritrositlere güçlü bağlanır, plazmada %1–2 serbesttir. [[K3 s. 114]] Kan–beyin bariyerini kolay geçtiği için indüksiyon hızını başlıca kardiyak debi ve uygulama hızı belirler. [[K3 s. 114]] İyi perfüze dokulara dağılım bolus sonrası plazma düzeyini hızla düşürür ve etkiyi kısaltır. [[K3 s. 114]]</li></ul>
<h3>İndüksiyon ajanlarının kinetik değerleri</h3>
<div class="tbl-wrap a09b-tablo"><table class="tbl"><thead><tr><th scope="col">Özellik</th><th scope="col">Tiyopental</th><th scope="col">Propofol</th><th scope="col">Ketamin</th><th scope="col">Etomidat</th></tr></thead><tbody>
<tr><th>Doz (mg.kg⁻¹) [[K3 s. 114]]</th><td>3–7</td><td>1–2</td><td>1–2</td><td>0.3</td></tr>
<tr><th>Dağılım hacmi (l.kg⁻¹) [[K3 s. 114]]</th><td>2.5</td><td>4.0</td><td>3.0</td><td>3.0</td></tr>
<tr><th>Klirens (ml.kg⁻¹.min⁻¹) [[K3 s. 114]]</th><td>3.5</td><td>30–60</td><td>17</td><td>10–20</td></tr>
<tr><th>Eliminasyon yarı ömrü (h) [[K3 s. 115]]</th><td>6–15</td><td>5–12</td><td>2</td><td>1–4</td></tr>
<tr><th>Proteine bağlanma (%) [[K3 s. 115]]</th><td>80</td><td>98</td><td>25</td><td>75</td></tr>
<tr><th>Metabolit [[K3 s. 115]]</th><td>Aktif olan var</td><td>İnaktif</td><td>Aktif</td><td>İnaktif</td></tr>
</tbody></table></div>
<h3>Propofolü plazmadan ne uzaklaştırır?</h3>
<ul class="a09b-liste"><li><b>Depolar.</b> Yüksek lipit çözünürlüğü propofolün dağılım hacmini indüksiyon ajanları arasında en yüksek düzeye çıkarır. [[K3 s. 114]] Yağdan dönüş metabolizma ve atılıma göre yavaş olduğundan uzun uygulamadan sonra bile etki görece hızlı sonlanır. [[K3 s. 114]]</li>
<li><b>İki metabolizma yolu.</b> Başlıca karaciğerde yaklaşık %70 doğrudan propofol glukuronide konjuge olur. [[K3 s. 114–115]] %30’u faz 1’de CYP2B6 ve CYP2C9 ile 4-hidroksipropofole dönüşür. [[K3 s. 114]] Ardından 4-hidroksipropofol-sülfat, 4-hidroksipropofol-glukuronid ve 1-hidroksipropofol-glukuronid oluşur. [[K3 s. 114–115]] Başlıca metabolitler hipnotik değildir, konjugatlar idrara geçer ve propofolün %1’den azı değişmeden atılır. [[K3 s. 114]]</li>
<li><b>Ekstraksiyon ve klirens.</b> Hepatik ekstraksiyon %90’dır, karaciğer kan akımı azalırsa metabolizma yavaşlar. [[K3 s. 114]] Yaklaşık 2.2 l.dk⁻¹ klirens hepatik kan akımını aşar, ekstrahepatik metabolizma %40’a ulaşabilir. [[K3 s. 114]] Böbreklerin metabolizmadaki payı %30’a kadar çıkabilir. [[K3 s. 114]] Yüksek klirens nedeniyle ilk dağılımdan sonra plazma konsantrasyonu tiyopentalden hızlı düşer. [[K3 s. 114]]</li>
<li><b>Örnekleme süresi.</b> Terminal yarı ömür 5–12 saattir, ancak 24 saati aşan örneklemede 60 saate yaklaşabileceği öne sürülmüştür. [[K3 s. 114]] Bu, yağdan yavaş salınımı yansıtabilir. [[K3 s. 114]] Uzun infüzyonda bağlama duyarlı yarılanma süresi artsa da dikkatli titrasyonla uyanma görece hızlı olabilir. [[K3 s. 114]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09b-risk"><h2>Propofol infüzyon sendromunu nasıl tanırız?</h2>
<p class="intro">Propofol infüzyon sendromu (PRIS) ilk kez çocuklarda tanımlanmış, daha sonra yoğun bakım sedasyonu alan erişkinlerde de bildirilmiştir. [[K3 s. 115]]</p>
${sekil('pris','Enerji üretiminden kas hasarına','Şematik/nitel · Hayvan ve insan modellerinde tarif edilen mekanizma. [[K3 s. 115]]')}
<ul class="a09b-liste"><li><b>Klinik örüntü.</b> Genellikle sedasyonun 3. gününden sonra belirir ve diğer sedatiflere kıyasla daha yüksek mortaliteyle ilişkilidir. [[K3 s. 115]] En sık yeni metabolik asidoz ve kardiyak işlev bozukluğuyla belirir, bunlardan önce Brugada benzeri (ama onunla sınırlı olmayan) EKG değişiklikleri görülür. [[K3 s. 115]] Kas nekrozunda CK > 10000 ünite.l⁻¹ olabilir. [[K3 s. 115]]</li>
<li><b>Kitabın tanımı.</b> Asistoliye ilerleyen akut dirençli bradikardiye şu bulgulardan en az biri eşlik eder: metabolik asidoz (kitapta BE > −10 mmol.l⁻¹), rabdomiyoliz veya miyoglobinüri, lipemik plazma, büyümüş veya yağlı karaciğer. [[K3 s. 115]]</li></ul>
<aside class="note plain"><b>Atlas notu</b><p>Kitap metabolik asidoz için BE &gt; −10 mmol.l⁻¹ yazar. Ağır metabolik asidozda doğrusu BE &lt; −10 mmol.l⁻¹ (baz açığı &gt; 10 mmol.l⁻¹) olmalıdır.</p></aside>
<ul class="a09b-liste"><li><b>İzlem.</b> Kitap, sedasyonda 48 saatten uzun süre 4 mg.kg⁻¹.saat⁻¹ dozunun aşılmamasını ve CK (kreatin kinaz), laktat, trigliseritlerin düzenli izlenmesini belirtir. [[K3 s. 116]] Sepsis, yanık, travma, pankreatit ve nörolojik yaralanma yüksek riskle ilişkilidir. [[K3 s. 116]] Yoğun bakım sedasyonu için 16 yaş ve altında kontrendikedir. [[K3 s. 116]]</li></ul>
<h3>Diğer güvenlik soruları</h3>
<ul class="a09b-liste"><li><b>Gıda alerjisi.</b> Yumurta alerjili bir hastada kaşıntı ve propofol sonrası iki bronkospazm bildirimi soya yağı ve yumurta sarısı lesitinini şüpheli kılmıştır. [[K3 s. 116]] Yumurta ve yer fıstığına alerjisi olan, soyaya alerjisi olmayan bir çocukta hipotansiyon ve bronkospazm bildirilmiştir. [[K3 s. 116]] Bu bildirimlerde alerji testi yoktur. [[K3 s. 116]]</li>
<li><b>Kanıtın sınırı.</b> Yumurta, soya veya yer fıstığı alerjili daha büyük kohortların analizinde propofol güvenli bulunmuştur. [[K3 s. 116]] Çocuklarda soya ve yer fıstığı alerjisinde güvensizliği gösteren ikna edici kanıt yoktur, yumurta alerjisinde ise güvenliği değerlendirmek için daha fazla kanıt gerekir. [[K3 s. 116]]</li>
<li><b>Kanülün yeri.</b> Arter içine propofolde başlangıç gecikir, başka olumsuz etki görülmüyor gibidir. [[K3 s. 116]] Ucu yüzeyel vende olmayan periferik kanülde derin subkutan enjeksiyon belirgin ağrı vermeyebilir ve ancak başarısız indüksiyonla fark edilebilir. [[K3 s. 116]] İzleyen 24 saatte eritem, ağrı ve şişlik doza bağlı görünür. [[K3 s. 116]]</li>
<li><b>Çevre.</b> Propofolün doğrudan küresel ısınma potansiyeli yoktur. [[K3 s. 116]] Üretim, taşıma ve pompa elektriği hesaba katıldığında ısınma potansiyeli inhalasyon ajanlarından dört büyüklük mertebesi düşüktür. [[K3 s. 116]] Sucul organizmalar için toksik ve çevrede orta derecede kalıcıdır, ancak genel risk düşüktür. [[K3 s. 116]] Kullanılmayan propofol lavaboya dökülmez, yakılmak üzere ayrı kapta toplanır. [[K3 s. 116]]</li></ul></section>
<section class="wrap blk ders-sec" id="a09b-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız olarak doğru veya yanlış işaretleyin.</p>
<div class="viz"><div data-viz="mtf" data-q="far09b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far09b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far09b-3"></div></div></section>
<section class="wrap blk ders-sec" id="a09b-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Tiyopental ve propofolle indüksiyonu karşılaştırın. Tek bolustan sonra hasta neden erken uyanır ve infüzyon uzadığında yanıt nasıl değişir?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li><b>Preparat ve doz.</b> Tiyopental alkali sodyum tuzu olarak intravenöz 3–7 mg.kg⁻¹, propofol lipit emülsiyonu olarak 1–2 mg.kg⁻¹ verilir. [[K3 s. 109–113]]</li>
<li><b>Başlangıç.</b> Tiyopentalde lipit çözünürlüğünü ve beyin perfüzyonunu, propofolde kardiyak debiyi ve uygulama hızını açıklayın. [[K3 s. 111]] [[K3 s. 114]]</li>
<li><b>Dolaşım yanıtı.</b> Tiyopental kompansatuvar taşikardiye yol açabilir, propofolde özellikle opioidle bradikardi görülebilir. [[K3 s. 111]] [[K3 s. 113]]</li>
<li><b>Bolus.</b> Her iki ajan için erken plazma düşüşünde doku dağılımını gösterin. [[K3 s. 112]] [[K3 s. 114]]</li>
<li><b>İnfüzyon.</b> Tiyopentalde enzimler doyabilir, propofolde bağlama duyarlı yarılanma süresi artsa da yüksek klirens ve dikkatli titrasyonla uyanma görece hızlı olabilir. [[K3 s. 112]] [[K3 s. 114]]</li></ol>
<p class="note"><b>Çizin.</b> Tiyopental için beyin ve karaciğerden kas ve deriye dağılım sırasını gösterin. [[K3 s. 112]] Propofol için yağ deposundan yavaş dönüşü, hepatik ve ekstrahepatik metabolizmayı ekleyin. [[K3 s. 114]]</p>
<h3>Olası ek sorular</h3><ul><li>Tiyopental arter içine verilirse ağrı ve iskemiyi nasıl açıklarsınız?</li><li>Propofolde bradikardiye hangi bulgular eşlik ederse PRIS düşünürsünüz?</li><li>Terminal yarı ömür ile bolus etki süresini nasıl ayırırsınız?</li></ul></section>
<section class="wrap blk ders-sec" id="a09b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Tiyopentalin alkali flakonunda enol formu, arter kanında ise kristalleşebilen keto formu öne çıkar. [[K3 s. 110]] [[K3 s. 112]]</li>
<li>Propofol indüksiyonunda kardiyak debi ve uygulama hızı etki başlangıcını belirler. [[K3 s. 114]]</li>
<li>Tiyopentalin plazmadaki yalnız %12’si hemen kullanılabilir, ancak beyne erişimi hızlıdır. [[K3 s. 111–112]]</li>
<li>Bolus sonrası erken derlenmede dağılım, propofolün sonraki plazma düşüşünde yüksek klirens belirleyicidir. [[K3 s. 112]] [[K3 s. 114]]</li>
<li>Propofol sedasyonu sırasında yeni asidoz ve kardiyak bozulma PRIS açısından önemlidir. [[K3 s. 115]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="09b"></div>
<nav class="ders-gec a09b-gecis" aria-label="Ders geçişi"><a href="#/dersler/farmakoloji/09a">← 09a · Genel anestezik etkinin mekanizmaları</a><a href="#/dersler/farmakoloji/09c">Sonraki: 09c · Ketamin ve etomidat →</a></nav></section>`
  };
})();
