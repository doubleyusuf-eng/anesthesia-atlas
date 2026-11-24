VERI.sorular = VERI.sorular || {};
VERI.sorular['far09d-1'] = {
  no: 1, kok: 'Minimum alveoler konsantrasyon (MAK) için aşağıdaki önermeleri değerlendirin.',
  kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 119–120]]',
  onermeler: [
    {t: 'MAK tanımında esas alınan basınç arteriyel kan basıncıdır.', d: false, n: 'Tanımdaki bir atmosfer, ortam basıncıdır. [[K3 s. 119]]'},
    {t: 'Standart cerrahi uyaran olarak deri insizyonu kullanılır.', d: true, n: 'Bir atmosferde ve kararlı durumda deri insizyonuna yanıtın deneklerin yarısında önlendiği konsantrasyon ölçülür. [[K3 s. 119]]'},
    {t: 'Kronik amfetamin alımı MAK’ı artırır.', d: false, n: 'Amfetamin akut alındığında MAK artar, kronik alındığında azalır. [[K3 s. 120]]'},
    {t: 'Gebelik MAK’ı azaltır.', d: true, n: 'Gebelik, ilerleyen yaş ve hipotansiyon MAK’ı düşüren etkenler arasındadır. [[K3 s. 119]]'},
    {t: 'Hipertiroidizm MAK’ı azaltır.', d: false, n: 'MAK hipertiroidizmde artar, hipotiroidizmde azalır. [[K3 s. 120]]'}
  ]
};
VERI.sorular['far09d-2'] = {
  no: 2, kok: 'İnhalasyon ajanlarının çevresel etkisi için aşağıdaki önermeleri değerlendirin.', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 120–121]]',
  onermeler: [
    {t: 'CO₂ için GWP₁₀₀ değeri 1 kabul edilir.', d: true, n: 'Gazların ısınma potansiyeli CO₂ referans alınarak ifade edilir. [[K3 s. 120]]'},
    {t: 'Desfluranın atmosferik ömrü izofluranınkinden kısadır.', d: false, n: 'Atmosferik ömür desfluranda 14 yıl, izofluranda 3,2 yıldır. [[K3 s. 121]]'},
    {t: 'Bir gazın CO₂ eşdeğerini bulmak için kütlesi ilgili zaman aralığındaki GWP ile çarpılır.', d: true, n: 'Çarpım, o zaman aralığında aynı ısınmaya yol açacak CO₂ miktarını verir. [[K3 s. 121]]'},
    {t: 'N₂O emisyonlarında tıbbi kullanımın payı %4’ten azdır.', d: true, n: 'Tıbbi kullanım küçük bir pay oluşturur ve emisyonların çoğu tarımsal kökenlidir. [[K3 s. 121]]'},
    {t: 'Yaygın volatil ajanlar kızılötesi ışınımı 7–10 µm bandında soğurur.', d: true, n: 'Ajanların bu banttaki özgül soğurma profilleri ışınımsal etkinliklerini belirler. [[K3 s. 121]]'}
  ]
};
VERI.sorular['far09d-3'] = {
  no: 3, kok: 'İnhalasyon ajanlarının kinetiği ve metabolizması için aşağıdaki önermeleri değerlendirin.',
  kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 121–123]]',
  onermeler: [
    {t: 'Kararlı durumda beyindeki ve alveoldeki parsiyel basınçlar farklıdır.', d: false, n: 'Kararlı durumda alveol, arter kanı ve beyin parsiyel basınçları dengededir. [[K3 s. 121]]'},
    {t: 'Büyük fonksiyonel rezidüel kapasite inspire edilen gazı daha fazla seyreltir.', d: true, n: 'Daha fazla seyrelme alveoler parsiyel basıncın yükselişini ve indüksiyonu yavaşlatır. [[K3 s. 122]]'},
    {t: 'Kanda az çözünen ajanlarda kardiyak debinin indüksiyona etkisi daha küçüktür.', d: true, n: 'Debi değişiklikleri kanda daha çok çözünen ajanların dengeye yaklaşma hızını daha fazla etkiler. [[K3 s. 122]]'},
    {t: 'Karbon–flor bağı karbon–iyot bağından daha kolay metabolize edilir.', d: false, n: 'C–F çok az metabolize edilirken C–I sıralamada en kolay metabolize edilen bağdır. [[K3 s. 123]]'},
    {t: 'Desfluranın metabolize edilen oranı %0,02’dir.', d: true, n: 'Desfluranın %0,02’si metabolize edilir ve trifloroasetik asit oluşur. [[K3 s. 123]]'}
  ]
};

const A09D_NAV = [['mak','MAK ve ideal ajan'], ['cevre','Çevresel etki'], ['kinetik','Alveolden beyne'],
  ['metabolizma','Metabolizma'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']];

SAYFALAR['dersler/farmakoloji/09d'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 9 · Ders 09d',
  baslik: 'İnhalasyon ajanları: MAK, fiziksel özellikler ve kinetik',
  lede: 'MAK bir ajanın potensini gösterir. [[K3 s. 119]] Etkinin başlama hızı ise ajanın beyindeki parsiyel basıncının ne kadar hızlı yükseldiğine bağlıdır. [[K3 s. 121–123]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A09D_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a09d-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a09d-mak">
  <h2>MAK neyi ölçer?</h2>
  <p class="intro">Minimum alveoler konsantrasyon (MAK), bir atmosfer basınçta deri insizyonuna yanıtı deneklerin %50’sinde önleyen kararlı durum alveol konsantrasyonudur. [[K3 s. 119]]</p>
  <div class="viz"><div class="viz-head"><h3>MAK hangi yönde değişir?</h3></div><div data-viz="a09d_mak"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Bir madde seçip akut ve kronik kullanımı karşılaştırın. [[K3 s. 120]]</p></div>
  <p>Anestezilerin çoğu yaklaşık bir atmosferde verilir ve belirleyici olan ajanın parsiyel basıncıdır. [[K3 s. 119]] Bu basınçta (yaklaşık 100 kPa) ajanın yüzde konsantrasyonu ile kPa cinsinden parsiyel basıncı sayısal olarak birbirine çok yakındır. [[K3 s. 119]] Ajanlar birlikte verildiğinde MAK katkıları toplanır. [[K3 s. 119]]</p>
  <div class="cols">
    <div class="card"><h3>MAK’ı artıranlar</h3><ul class="a09d-liste">
      <li>Bebeklik [[K3 s. 119]]</li><li>Hipertermi, hipertiroidizm, hipernatremi [[K3 s. 120]]</li><li>Katekolaminler ve sempatomimetikler [[K3 s. 120]]</li><li>Kronik opioid veya alkol kullanımı, akut amfetamin alımı [[K3 s. 120]]</li>
    </ul></div>
    <div class="card"><h3>MAK’ı azaltanlar</h3><ul class="a09d-liste">
      <li>Yenidoğan dönemi, ilerleyen yaş, gebelik, hipotansiyon [[K3 s. 119]]</li><li>Hipotermi, hipotiroidizm [[K3 s. 120]]</li><li>α₂-agonistler, sedatifler, lityum [[K3 s. 120]]</li><li>Akut opioid veya alkol alımı, kronik amfetamin kullanımı [[K3 s. 120]]</li>
    </ul></div>
  </div>
  <h3>İdeal ajandan ne beklenir?</h3>
  <p>İnhalasyon ajanları arasında nitröz oksit (N₂O) ile volatil sıvılar olan izofluran, sevofluran, desfluran, halotan ve enfluran bulunur. [[K3 s. 119]] Ksenonun yararlı özelliklerine karşın atmosferden elde edilmesinin maliyeti klinik kullanımını sınırlar. [[K3 s. 119]]</p>
  <p>Mevcut ajanların hiçbiri ideal özelliklerin tümünü taşımaz. [[K3 s. 119]] Epileptojenik olmama gibi beklentiler, kullanılan ajanlarda görülen yan etkileri yansıtır. [[K3 s. 119]]</p>
  <div class="cols"><div class="card"><h3>Fiziksel özellikler</h3><ul class="a09d-liste">
    <li>Işığa ve ısıya dayanıklı, metal, kauçuk ve soda lime ile temasta inert [[K3 s. 120]]</li>
    <li>Koruyucu içermeyen, yanmayan ve patlamayan [[K3 s. 120]]</li>
    <li>Hoş kokulu, ucuz ve sera gazı etkisi olmayan [[K3 s. 120]]</li></ul></div>
    <div class="card"><h3>Biyokimyasal özellikler</h3><ul class="a09d-liste">
    <li>Yüksek yağ:gaz ve düşük kan:gaz partisyon katsayısı, düşük MAK [[K3 s. 120]]</li>
    <li>Metabolize edilmeyen ve toksisite göstermeyen [[K3 s. 120]]</li>
    <li>Yalnız merkezi sinir sistemini etkileyen, epileptojenik olmayan ve bir miktar analjezi sağlayan [[K3 s. 120]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a09d-cevre">
  <h2>Çevresel etki nasıl karşılaştırılır?</h2>
  <p class="intro">İnhalasyon ajanları alt atmosferden uzaklaşacak kızılötesi ışınımı soğurarak sera gazı etkisi gösterir. [[K3 s. 120]]</p>
  <div class="viz"><div class="viz-head"><h3>Bir gaz ne kadar süre kalır, ne kadar ısı tutar?</h3></div><div data-viz="a09d_cevre"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Her ölçütte çubukları aynı birimde karşılaştırın. [[K3 s. 121]]</p></div>
  <p>Önce izofluran ve desfluranı ışınımsal etkinlik bakımından karşılaştırın, sonra atmosferik ömre geçin. İki ajanın ışınımsal etkinliği yakınken desfluran atmosferde yaklaşık beş kat uzun kalır ve GWP₁₀₀’ü çok daha büyüktür. [[K3 s. 121]]</p>
  <p>İntravenöz ajanların kullanımı artsa da genel anestezi idamesinde en sık inhalasyon ajanları kullanılır. [[K3 s. 120]] Toplam etkiyi hesaplamayı güçleştiren, yaşam döngüsünün tamamını değerlendirme gereğidir. [[K3 s. 120]] Bu değerlendirme kaynakların çıkarılmasından üretime, taşımaya, klinik uygulamaya ve bertarafa kadar uzanır. [[K3 s. 120]]</p>
  <ul class="ozet">
    <li><b>Işınımsal etkinlik (RE).</b> Yaygın volatil ajanların 7–10 µm bandındaki özgül soğurma profili, atmosferin aldığı ve kaybettiği enerji üzerindeki etkilerini belirler. [[K3 s. 121]]</li>
    <li><b>Küresel ısınma potansiyeli (GWP).</b> Tutulan ısı CO₂’ye göre ifade edilir ve CO₂’nin GWP₁₀₀ değeri 1 kabul edilir. [[K3 s. 120]] N₂O dışındaki ajanların atmosferik ömrü görece kısa olduğu için 20 yıllık değer kullanılabilir, ancak 100 yıllık değer daha yaygındır. [[K3 s. 120]] RE, atmosferik ömürle ağırlıklandırıldığında GWP₁₀₀’ü belirler. [[K3 s. 121]]</li>
    <li><b>CO₂ eşdeğeri (CO₂e).</b> Aynı süre içinde aynı ısınmaya yol açacak CO₂ miktarı, salınan gazın kütlesiyle o süreye ait GWP’nin çarpımıdır. [[K3 s. 121]]</li>
  </ul>
  <div class="cols"><div class="card"><h3>Desfluran</h3>
    <p>Volatil ajanlar içinde potensi en düşük olduğu için anestezide daha büyük miktar gerekir. [[K3 s. 121]] Küresel salım kütleleri kabaca benzer olsa da volatil ajanların toplam CO₂e’sinin yaklaşık %80’i desflurana aittir. [[K3 s. 121]]</p></div>
    <div class="card"><h3>Nitröz oksit</h3><p>Daha yüksek MAK, uzun atmosferik ömür ve doğumda yüksek hacimli kullanım nedeniyle CO₂e en fazla N₂O’dadır. [[K3 s. 121]] N₂O emisyonlarının %4’ten azı tıbbi kullanımdan gelir, çoğu tarımsal kökenlidir. [[K3 s. 121]] Doğal kaynakların katkısı insan kaynaklı katkının iki katı olabilir. [[K3 s. 121]]</p></div></div>
  <h3>Ozon tabakasına etki</h3>
  <p>Ozon tabakası zararlı ultraviyole ışınıma karşı koruma sağlar. [[K3 s. 121]] Birçok insan yapımı bileşiğin ozonu tüketme gücü öncelikle klor içeriğine bağlıdır. [[K3 s. 121]] Çevre karşılaştırmasındaki volatil ajanlardan yalnız izofluran bu potansiyeli taşır ve kısa atmosferik ömrü nedeniyle etkisi çok küçüktür. [[K3 s. 121]]</p>
  <p>N₂O üst stratosferde fotolizle oksijen atomu açığa çıkarır, böylece O₃ parçalanır ve O₂ oluşur. [[K3 s. 121]] Kitapta aktarılan çalışmalar, N₂O’nun ozonu tüketen başlıca madde olduğunu ve 21. yüzyıl boyunca öyle kalabileceğini düşündürür. [[K3 s. 121]]</p>
</section>
<section class="wrap blk ders-sec" id="a09d-kinetik">
  <h2>Alveolden beyne dengeye yaklaşma</h2>
  <p class="intro">Kararlı durumda alveol (P<sub>A</sub>), arter kanı (P<sub>a</sub>) ve beyin (P<sub>B</sub>) parsiyel basınçları dengelenir. [[K3 s. 121]]</p>
  <div class="viz"><div class="viz-head"><h3>Fonksiyonel rezidüel kapasite (FRC) değişirse</h3></div><div data-viz="a09d_kinetik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. F<sub>A</sub>/F<sub>I</sub>, alveoler konsantrasyonun inspire edilen konsantrasyona oranıdır ve dengeye yaklaşırken 1’e yönelir. [[K3 s. 122]]</p></div>
  <p>İnspire edilen gaz büyük bir FRC içinde daha fazla seyrelir ve P<sub>A</sub> daha yavaş yükselir. [[K3 s. 122]] Küçük FRC’de aynı gazı seyreltecek hacim daha küçüktür, bu yüzden anestezi daha çabuk başlar. [[K3 s. 122]]</p>
  <p>P<sub>A</sub>, P<sub>B</sub> için dolaylı bir ölçüdür. [[K3 s. 121]] Çoğu ajanda dengeye ulaşmak saatler sürebildiğinden klinikte kararlı duruma seyrek erişilir. [[K3 s. 121]]</p>
  <ul class="ozet">
    <li><b>Ventilasyon.</b> Alveoler ventilasyon arttığında önce P<sub>A</sub>, ardından P<sub>B</sub> daha hızlı yükselir ve anestezi daha çabuk başlar. [[K3 s. 122]]</li>
    <li><b>İnspire edilen konsantrasyon.</b> Yüksek konsantrasyon P<sub>A</sub> artışını ve indüksiyonu hızlandırır. [[K3 s. 122]]</li>
    <li><b>Kardiyak debi.</b> Yüksek debi, alveol ile pulmoner kan arasındaki gradyanı koruma eğilimindedir ve P<sub>A</sub> yavaş yükselir. [[K3 s. 122]] Düşük debide dengeye yaklaşma ve indüksiyon hızlanır. [[K3 s. 122]] Kanda az çözünen modern ajanlarda debinin etkisi çok daha küçüktür. [[K3 s. 122]]</li>
  </ul>
  <h3>Kanda çözünen miktar ile parsiyel basınç</h3>
  <p>Kan:gaz partisyon katsayısı, eşit hacimdeki kan ve gaz 37 °C’de eşit basınçta dengedeyken kandaki anestezik miktarının gazdakine oranıdır. [[K3 s. 122]] Katsayı yüksekse kan büyük miktarda ajan almasına rağmen parsiyel basınç düşük kalır. [[K3 s. 123]]</p>
  <p>Etkiyi ajanın kanda ve ardından beyinde oluşturduğu parsiyel basınç belirler. [[K3 s. 123]] Düşük katsayıda parsiyel basınç çabuk yükselir, etki daha hızlı başlar ve sonlanır. [[K3 s. 123]] MAK ve solunum yolu irritasyonu da indüksiyon hızını değiştirebilir. [[K3 s. 123]]</p>
  <p>Kitaptaki karşılaştırmada F<sub>A</sub>/F<sub>I</sub> oranı N₂O, desfluran, sevofluran, izofluran ve halotanda 1’e farklı hızlarda yaklaşır. [[K3 s. 122]] Volatil ajanlar arasında oran desfluranda en hızlı yükselir, onu sevofluran, izofluran ve halotan izler. [[K3 s. 122]] N₂O için iki eğri gösterilir. [[K3 s. 122]] Konsantrasyon ve ikinci gaz etkisi için <a href="#/dersler/farmakoloji/09e">nitröz oksit dersine</a> geçebilirsiniz. [[K3 s. 123]]</p>
</section>
<section class="wrap blk ders-sec" id="a09d-metabolizma">
  <h2>Metabolizma ve açığa çıkan ürünler</h2>
  <p class="intro">Karaciğerde sitokrom P450 enzimi CYP2E1, karbon–halojen bağını parçalayarak halojen iyonlarını açığa çıkarır. [[K3 s. 123]]</p>
  <div class="viz"><div class="viz-head"><h3>Hangi bağ daha kolay parçalanır?</h3></div><div data-viz="a09d_bag"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Ok, metabolizmanın kolaylaşma yönünü gösterir. [[K3 s. 123]]</p></div>
  <p>Serbestleşen F⁻, Cl⁻ ve Br⁻ iyonları karaciğer veya böbrek hasarına neden olabilir. [[K3 s. 123]]</p>
  <table class="a09d-tablo"><caption>Metabolize edilen pay ve ajana özgü ürünler [[K3 s. 123]]</caption>
  <thead><tr><th scope="col">Ajan</th><th scope="col">Pay (%)</th><th scope="col">Ürünler</th></tr></thead><tbody>
    <tr><th scope="row">Halotan</th><td>20</td><td>Trifloroasetik asit, Cl⁻, Br⁻ [[K3 s. 123]]</td></tr>
    <tr><th scope="row">Sevofluran</th><td>3,5</td><td>İnorganik ve organik florürler [[K3 s. 123]]</td></tr>
    <tr><th scope="row">Enfluran</th><td>2</td><td>İnorganik ve organik florürler [[K3 s. 123]]</td></tr>
    <tr><th scope="row">İzofluran</th><td>0,2</td><td>Trifloroasetik asit, F⁻ [[K3 s. 123]]</td></tr>
    <tr><th scope="row">Desfluran</th><td>0,02</td><td>Trifloroasetik asit [[K3 s. 123]]</td></tr>
    <tr><th scope="row">N₂O</th><td>&lt; 0,01</td><td>N₂ [[K3 s. 123]]</td></tr>
  </tbody></table>
  <p>Sevofluran için soda lime ve ısı varlığında Bileşik A oluşumu da bildirilir, ayrıca B, C, D ve E bileşikleri anılır. [[K3 s. 123]]</p>
</section>
<section class="wrap blk ders-sec" id="a09d-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin ve gerekçenizi kontrol edin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far09d-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far09d-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far09d-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a09d-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Bir inhalasyon ajanının potensini nasıl tanımlarsınız? İndüksiyon sırasında alveoldeki ve beyindeki parsiyel basınçların yükselme hızını neler belirler?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>MAK, bir atmosferde deri insizyonuna yanıtı deneklerin yarısında önleyen kararlı durum alveol konsantrasyonudur. [[K3 s. 119]] Asıl ölçüt parsiyel basınçtır ve birlikte verilen ajanların MAK değerleri toplanır. [[K3 s. 119]]</li>
    <li>Alveol, arter kanı ve beyin parsiyel basınçları dengelenince P<sub>A</sub>, P<sub>B</sub>’yi dolaylı olarak gösterir. [[K3 s. 121]]</li>
    <li>Artmış alveoler ventilasyon, küçük FRC ve yüksek inspire edilen konsantrasyon P<sub>A</sub> artışını hızlandırır. [[K3 s. 122]]</li>
    <li>Yüksek debi alveol–kan gradyanını sürdürerek P<sub>A</sub> artışını yavaşlatır, bu etki kanda az çözünen ajanlarda daha küçüktür. [[K3 s. 122]]</li>
    <li>Kanda çok çözünen ajan büyük miktarda alınsa da parsiyel basınç düşük kalabilir. [[K3 s. 123]] Düşük kan:gaz katsayısı hızlı başlangıcı destekler, ancak MAK ve hava yolu irritasyonu da hızı etkileyebilir. [[K3 s. 123]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Alveol, arter kanı ve beyni sıralayıp kararlı durum basınçlarını işaretleyin. [[K3 s. 121]] Altına F<sub>A</sub>/F<sub>I</sub>’nin zamana karşı 1’e yaklaşmasını çizin ve küçük ve büyük FRC eğrilerini etiketleyin. [[K3 s. 122]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Akut ve kronik alkol alımında MAK nasıl değişir? [[K3 s. 120]] İzofluran ve desfluranın RE değerleri yakınken GWP₁₀₀ neden farklıdır? [[K3 s. 121]] Halotanın metabolizmasıyla hangi ürünler açığa çıkar? [[K3 s. 123]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a09d-ozet"><h2>Özet</h2><ul class="ozet">
  <li>MAK tanımının iki dayanağı bir atmosfer basınç ve deri insizyonuna %50 yanıtsızlıktır. [[K3 s. 119]]</li>
  <li>Akut ve kronik opioid, alkol ve amfetamin kullanımının MAK’a etkileri ters yönlüdür. [[K3 s. 120]]</li>
  <li>Bir ajanın toplam CO₂ eşdeğerini hem GWP’si hem de salınan kütlesi belirler. [[K3 s. 121]]</li>
  <li>Küçük FRC’de daha az seyrelme, düşük kardiyak debide daha hızlı dengelenme indüksiyonu hızlandırır. [[K3 s. 122]]</li>
  <li>Düşük kan:gaz katsayısı hızlı başlangıç ve sonlanmayla ilişkilidir. [[K3 s. 123]]</li>
  <li>Halojenli ajanlarda metabolize edilen pay ve oluşan ürünler ajana göre değişir. [[K3 s. 123]]</li>
  </ul><div data-viz="tamam" data-modul="farmakoloji" data-bolum="09d"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/09c">← 09c · Ketamin ve etomidat</a><a href="#/dersler/farmakoloji/09e">Sonraki: 09e · İnhalasyon ajanlarının farmakolojisi ve tek tek ajanlar →</a></nav>
</section>`
};
