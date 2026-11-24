VERI.sorular = VERI.sorular || {};
VERI.sorular['far07b-1'] = {
  no: 1, kok: 'TCI pompasının hedefleme biçimleri ve propofol modelleri için:', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 79–84]]',
  onermeler: [
    { t: 'Plazma hedeflemesinde Modifiye Marsh, Marsh’tan daha büyük bir ilk bolus verir.', d: false, n: 'Plazma hedefi aynıysa iki modelin ilk bolusu ve doz–zaman profili aynıdır. [[K3 s. 79]]' },
    { t: 'Etki yeri hedeflemesinde ilk bolusu bir infüzyon duraklaması izler.', d: true, n: 'Pompa, plazma düzeyi düşerken etki yeri düzeyinin hedefe yükselmesini bekler. [[K3 s. 80]]' },
    { t: 'Paedfusor, çocuklar için geliştirilmiş bir propofol modelidir.', d: true, n: 'Çocukların kinetiği erişkinlerden farklı olduğundan pediyatrik modeller kullanılır. [[K3 s. 79]]' },
    { t: 'Schnider modelinde merkezi kompartıman hacmi vücut ağırlığıyla orantılıdır.', d: false, n: 'Schnider’de V₁ sabit 4,27 L’dir. [[K3 s. 83]]' },
    { t: 'Uygulanan toplam dozun zaman eğrisi, pompa durakladığında yatay seyreder.', d: true, n: 'Duraklamada zaman ilerlerken verilen toplam doz değişmez. [[K3 s. 84]]' },
  ],
};
VERI.sorular['far07b-2'] = {
  no: 2, kok: 'TİVA sırasında hedef seçimi, izlem ve güvenlik için:', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 84–86]]',
  onermeler: [
    { t: 'Aynı klinik etki için remifentanil hedefi yükseltilirken propofol hedefi düşürülebilir.', d: true, n: 'Aynı etkiyi sağlayan ilaç çiftleri izobologramdaki aynı eğri üzerinde yer alır. [[K3 s. 84–85]]' },
    { t: 'Pompanın gösterdiği plazma düzeyi hastanın kanında ölçülmüştür.', d: false, n: 'Ekran modelin tahminini gösterir ve bireysel kinetik farklılıklar sapmaya yol açabilir. [[K3 s. 85]]' },
    { t: 'Vaporizatörün anahtarlı dolum sisteminin bir eşdeğeri TİVA pompasında yanlış ilaç seçimini önler.', d: false, n: 'Kitapta anlatılan TİVA sisteminde bu koruma bulunmaz. [[K3 s. 86]]' },
    { t: 'TİVA ile anestezi ventilasyondan bağımsız sürdürülebilir.', d: true, n: 'İntravenöz yolla idame ventilasyona bağlı değildir. [[K3 s. 86]]' },
    { t: 'Pompanın azalma süresi, eşlik eden opioidlerin uyanmayı geciktirici etkisini de gösterir.', d: false, n: 'Gösterilen süre daha düşük bir plazma düzeyine ulaşma tahminidir ve eşlik eden opioidler uyanmayı geciktirebilir. [[K3 s. 85]]' },
  ],
};
VERI.sorular['far07b-3'] = {
  no: 3, kok: 'Bağlama duyarlı yarılanma süresi (CSHT) için:', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 86–88]]',
  onermeler: [
    { t: 'CSHT’de bağlam, infüzyon sonunda ulaşılan anestezi derinliğidir.', d: false, n: 'Bağlam, infüzyonun ne kadar sürdüğüdür. [[K3 s. 86]]' },
    { t: 'Kararlı durumda infüzyonun giriş hızı eliminasyon hızına eşittir.', d: true, n: 'Bu durumda kompartımanlar arasında net geçiş de kalmaz ve olası en uzun CSHT görülür. [[K3 s. 86]]' },
    { t: 'Fentanilin eliminasyon klirensi dağılım klirensinin yaklaşık beşte biridir.', d: true, n: 'Dağılım ağır basar ve infüzyon uzadıkça fentanilin CSHT’si hızla artar. [[K3 s. 86]]' },
    { t: 'Modellerde remifentanilin olası en uzun CSHT’si 8 dakikadır.', d: true, n: 'Eliminasyon baskın olduğundan remifentanilde CSHT çok az değişir. [[K3 s. 87]]' },
    { t: 'Propofol tek başına kullanıldığında uyanma ilk CSHT’den çok daha geç olabilir.', d: true, n: 'Uzun ve uyarıcı cerrahide uyanma için gereken düzey, son plazma düzeyinin yarısından çok daha düşük olabilir. [[K3 s. 88]]' },
  ],
};

const A07B_NAV = [
  ['hedef', 'Pompa ve hedef'], ['model', 'Model ve ağırlık'], ['idame', 'İndüksiyon ve idame'],
  ['guvenlik', 'Güvenlik'], ['sure', 'İnfüzyon sonrası'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];
SAYFALAR['dersler/farmakoloji/07b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 7 · Ders 07b',
  baslik: 'Hedef kontrollü infüzyon ve bağlama duyarlı yarılanma süresi',
  lede: 'Pompa seçilen hedefe ulaşmak için infüzyon hızını hesaplar. [[K3 s. 79]] İnfüzyon durduğunda plazma düzeyinin ne hızla düşeceği, ilaca ve infüzyonun süresine bağlıdır. [[K3 s. 86–87]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A07B_NAV.map(([id, ad]) => `<button type="button" data-scroll="a07b-${id}">${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a07b-hedef">
  <h2>Pompa hangi konsantrasyonu hedefler?</h2>
  <p>Hedef kontrollü infüzyonda (TCI) mikroişlemcili pompa, plazmada ya da etki yerinde seçilen konsantrasyona ulaşmak için infüzyon hızını değiştirir. [[K3 s. 79]]</p>
  <div class="viz"><div class="viz-head"><h3>Bolustan sonra pompa ne yapar?</h3></div><div data-viz="a07b_hedef"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. İki modda da aynı hedef seçilmiştir. [[K3 s. 79–80]]</p></div>
  <p>Şekilde düz çizgi plazmayı, kesikli çizgi etki yerini izler. [[K3 s. 80]] Plazma hedefinde bolusu, düzeyi hedefte tutan infüzyon izler. [[K3 s. 80]] Etki yeri hedefinde ise pompa ilk bolustan sonra beklerken verilen toplam dozun zaman eğrisi yataylaşır. [[K3 s. 84]]</p>
  <div class="cols">
    <div class="card"><h3>Pompanın girdileri</h3><p>Pompa değişken hızı hesaplarken ilacın üç kompartımanlı farmakokinetik modelini, enjektördeki ilaç konsantrasyonunu ve enjektör tipini kullanır. [[K3 s. 79]]</p></div>
    <div class="card"><h3>İlaca ve hastaya uygun model</h3><p>Erişkin propofol TCI’sinde Marsh ve Schnider yaygındır. [[K3 s. 79]] Çocuklarda farklı kinetik nedeniyle Paedfusor gibi pediyatrik modeller gerekir. [[K3 s. 79]] Minto yalnız remifentanil içindir. [[K3 s. 79]]</p></div>
  </div>
  <p><b>Hangi eğri hedefi aşar?</b> Etki yeri hedeflendiğinde bolusun ardından hedefin üstünde kalan plazma düzeyidir. [[K3 s. 80–81]] Pompa dururken de etki yerindeki düzey yükselmeye devam eder ve iki eğri tam hedefte birleşir. [[K3 s. 80]] Böylece pompa yeniden çalıştığında etki yerinde bir aşım beklenmez. [[K3 s. 80]]</p>
  <p>Eleveld’in farmakokinetik–farmakodinamik algoritması propofolü yenidoğandan yaşlıya ve morbid obez hastaya kadar geniş bir grupta tanımlar. [[K3 s. 79]] Karmaşık hesabı, indüksiyonda ve sonrasında hedefi değiştirme gereksinimini azaltabilir. [[K3 s. 79]] Her hastada anestezikler yine klinik etkiye göre titre edilir. [[K3 s. 79]]</p>
</section>

<section class="wrap blk ders-sec" id="a07b-model">
  <h2>Aynı hedef, farklı bolus</h2>
  <p>Bir propofol hedefini yorumlamak için merkezi kompartıman hacmini (V₁), etki yeriyle dengelenme hızını (kₑ₀) ve hangi kompartımanın hedeflendiğini birlikte okumak gerekir. [[K3 s. 79–83]]</p>
  <div class="viz"><div class="viz-head"><h3>Ağırlık değişince V₁ ne olur?</h3></div><div data-viz="a07b_hacim"></div><p class="viz-cap"></p><p class="viz-foot">Çubuklar modeldeki V₁ değerlerini aynı litre ölçeğinde gösterir. [[K3 s. 82–83]]</p></div>
  <p>Marsh, V₁’i 0,228 L/kg alır. [[K3 s. 82]] Aynı başlangıç hedefi için daha hafif hasta daha az, daha ağır hasta daha çok propofol alır. [[K3 s. 82]] Normal vücut oranlarında anlamlı olan bu hesap, yağ dokusu orantısız arttığında V₁’i fazla tahmin eder ve tipik hedefler aşırı doza yol açar. [[K3 s. 82]]</p>
  <p>Şekildeki 70 kg seçeneğinde Marsh için hesaplanan 15,96 L, Schnider’in 4,27 L değerinin yaklaşık dört katıdır. [[K3 s. 82–83]] 140 kg seçeneğinde yalnız Marsh çubuğu uzar ve hacim 31,92 L olur. [[K3 s. 82–83]] Bu karşılaştırma hacim hesabını gösterir, ilk bolusu yorumlamak için hedefleme moduna da bakmak gerekir. [[K3 s. 83–84]]</p>
  <h3>Modelin hangi parametresi değişir?</h3>
  <div class="tbl-wrap"><table class="tbl a07b-table"><thead><tr><th>Parametre</th><th>Marsh / Modifiye Marsh</th><th>Schnider</th><th>Kaynak</th></tr></thead><tbody>
    <tr><th>V₁</th><td>Ağırlıkla</td><td>Sabit, 4,27 L</td><td>[[K3 s. 83]]</td></tr>
    <tr><th>V₂ / V₃</th><td>İkisi de ağırlıkla</td><td>V₂ yaşla, V₃ sabit</td><td>[[K3 s. 83]]</td></tr>
    <tr><th>k₁₂ / k₂₁</th><td>Sabit</td><td>Yaşla</td><td>[[K3 s. 83]]</td></tr>
    <tr><th>k₁₃ / k₃₁</th><td>Sabit</td><td>Sabit</td><td>[[K3 s. 83]]</td></tr>
    <tr><th>kₑ₀ (min⁻¹)</th><td>0,26 / 1,21</td><td>0,456</td><td>[[K3 s. 83]]</td></tr>
    <tr><th>Klirens</th><td>Ağırlıkla</td><td>Ağırlık ve boyla</td><td>[[K3 s. 83]]</td></tr>
  </tbody></table></div>
  <p>Tabloyu sütun boyunca okuyun: her iki Marsh modelinde ağırlık üç hacmi ve klirensi etkiler. [[K3 s. 83]] Schnider’de yaş ikinci kompartımanın hacmiyle bu kompartımana gidiş ve dönüş katsayılarını etkiler, buna karşılık V₁ ve V₃ sabittir. [[K3 s. 83]]</p>
  <p>Aşağıdaki karşılaştırmada ortalama bir erişkin için aynı sayısal hedef kullanılır. [[K3 s. 79–81]] Klinikte anestezist hedefi hastaya, modele, indüksiyon için uygun süreye ve klinik koşullara göre seçer. [[K3 s. 81]]</p>
  <div class="cols">
    <div class="card"><h3>Marsh ve Modifiye Marsh</h3><p>Marsh esas olarak plazma hedeflemesi için geliştirilmiştir. [[K3 s. 82]] Plazma hedefinde kₑ₀ değeri 0,26 yerine 1,2 min⁻¹ olduğunda model daha hızlı dengelenme öngörür. [[K3 s. 81]] Algoritma propofolün doğasını değiştirmez; iki model aynı doz–zaman profilini verdiğinden bu fark gerçek indüksiyonu hızlandırmaz. [[K3 s. 79]]</p><p>Modifiye Marsh’ta 1,21 min⁻¹ etki yeri hedeflemesini kolaylaştırır. [[K3 s. 82]] Bu modda biraz daha büyük ilk bolus indüksiyonu hızlandırabilir, fakat görece büyük kₑ₀ nedeniyle plazma doruğu hedefi yalnızca biraz aşar. [[K3 s. 80–81]]</p></div>
    <div class="card"><h3>Schnider ve Eleveld</h3><p>Schnider özellikle etki yeri hedeflemesi için tasarlanmıştır. [[K3 s. 82]] Küçük V₁ ve şekil örneğindeki 0,45 min⁻¹ kₑ₀, Marsh’a benzer ilk dozla yüksek bir plazma doruğu verir. [[K3 s. 81]] Yüksek doruk, Modifiye Marsh’ın etki yeri modundan daha büyük doz verildiğini göstermez. [[K3 s. 80–81]]</p><p>Eleveld örneğinde kₑ₀ 0,146 min⁻¹ olduğundan büyük bir ilk doz gerekir. [[K3 s. 81]] V₁’in 6,28 L olması yüksek plazma doruğunu ancak kısmen dengeler. [[K3 s. 81]]</p></div>
  </div>
  <p><b>Doruk mu, doz mu?</b> Aynı sayısal hedefle karşılaştırma yaparken konsantrasyon–zaman eğrisi plazmada ulaşılan düzeyi, doz–zaman eğrisi ise pompanın o ana kadar verdiği miktarı gösterir. [[K3 s. 80–84]] Başlangıçtaki dik doz eğrisi hızlı infüzyona, ardından görülen yatay kesim etki yeri hedeflemesindeki beklemeye karşılık gelir. [[K3 s. 84]]</p>
  <h3>Hacim farkı verilen doza nasıl yansır?</h3>
  <ul>
    <li><b>Hedefleme modu.</b> Schnider’de yalnız V₁ belirleyici olsaydı farklı ağırlıklarda aynı hedef için bolus aynı kalır ve Marsh’tan çok daha küçük olurdu. [[K3 s. 83]] Tipik etki yeri hedefini Schnider’in plazma moduna girmek, güvenilir indüksiyon için yetersiz doz verir. [[K3 s. 83]]</li>
    <li><b>Başlangıç ve idame.</b> Etki yeri hedefli Schnider bolusu, plazma hedefli Marsh’ın hızlı başlangıç fazındaki doza yaklaşır (varsayılan hız 1200 mL/saat). [[K3 s. 83–84]] Tipik 70 kg hastada aynı hedefte idame hızları da benzerdir. [[K3 s. 84]]</li>
    <li><b>Ağırlık arttığında.</b> Başlangıç dozu iki algoritmada da artar, artış Marsh’ta daha büyüktür. [[K3 s. 83–84]] İdamede Marsh’ın hız artışı daha belirgin olduğundan birikimli dozlar zamanla birbirinden uzaklaşır. [[K3 s. 83–84]]</li>
    <li><b>Pratikte.</b> Bu farkı karşılamak için sıklıkla gerçek ağırlıktan küçük bir değer girilir. [[K3 s. 84]] Uygun değeri belirlemek için ağırlık ölçekleri veya fazla ağırlığın bir oranı önerilmiştir ve bu durumda anestezi derinliğini izlemek özellikle yararlıdır. [[K3 s. 84]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a07b-idame">
  <h2>İndüksiyondan idameye hedef seçimi</h2>
  <p>Total intravenöz anestezide (TİVA) indüksiyon bolusunu sağlayan yüksek hedefi, idameyi sağlayan daha düşük bir hedef izler. [[K3 s. 84]]</p>
  <div class="viz"><div class="viz-head"><h3>Aynı etkiyi veren ilaç çiftleri</h3></div><div data-viz="a07b_sinerji"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel izobologram. Eğri üzerindeki noktalar aynı klinik etkiyi temsil eder. [[K3 s. 84–85]]</p></div>
  <p>İzobologramı okurken eksenlerde iki ayrı ilacın hedeflerini, eğri üzerinde ise bu hedeflerin birlikte sağladığı etkiyi izleyin. [[K3 s. 84–85]] Noktayı remifentanil ağırlıklı uca kaydırmak propofol gereksinimini azaltır, en güçlü sinerji ise içe bükülen bölgededir. [[K3 s. 84–85]]</p>
  <p>Volatil anestezide de indüksiyon için genellikle yüksek konsantrasyon seçilir, bazen hastayı kokuya alıştırmak için konsantrasyon kademeli artırılır. [[K3 s. 84]] Ardından yaklaşık 1 MAC düzeyinde idameye geçilir. [[K3 s. 84]] Onlarca yıldır indüksiyonların büyük çoğunluğu yalnız intravenöz ilaçlarla yapılmaktadır. [[K3 s. 84]]</p>
  <ul>
    <li><b>İndüksiyon.</b> Model, eşlik eden ilaçlar, hasta ve klinik durum başlangıç hedefini belirler. [[K3 s. 84]] Pompasız uygulamada olduğu gibi büyük başlangıç dozu indüksiyonu hızlandırır ama kardiyovasküler instabilite riskini artırır, küçük dozda bunun tersi beklenir. [[K3 s. 84]]</li>
    <li><b>Birlikte idame.</b> Kitaptaki tipik hedefler propofol için <b>2,5–4 mcg/mL</b>, remifentanil için <b>3–6 ng/mL</b> düzeyindedir. [[K3 s. 84]] Bir ajanın hedefini yükseltip diğerini azaltmak aynı etkiyi sağlayabilir, ancak yüksek hedef yan etki riskini artırır ve sinerjiyi azaltır. [[K3 s. 84]]</li>
    <li><b>Dengeyi seçmek.</b> Çoğu olguda izobologramın en konkav bölümüne yakın bir çift, ilaç tüketimini en aza indirebilir. [[K3 s. 85]] Seçim, analjezi ve hipnoz gereksinimlerinden hangisinin baskın olduğuna bağlıdır. [[K3 s. 85]] Uzun ameliyatta remifentanilin kısa ve az değişen yarılanma süresi nedeniyle remifentanil hedefini daha yüksek, propofol hedefini düşük tutmak tercih edilebilir. [[K3 s. 84–85]]</li>
  </ul>
  <p>Hastalar arasındaki kinetik farklar nedeniyle gerçek kan düzeyi hedeften sapabilir. [[K3 s. 85]] Çalışmalar, ekrandaki plazma düzeyinin genellikle gerçek konsantrasyonun %25’lik sapma aralığında kaldığını düşündürür. [[K3 s. 85]] Hedef cerrahinin her aşamasına uygun olmayabilir, bu yüzden infüzyon vaporizatör ayarı gibi klinik etkiye göre değiştirilir. [[K3 s. 85]]</p>
</section>

<section class="wrap blk ders-sec" id="a07b-guvenlik">
  <h2>İlacın hastaya ulaştığını nasıl anlarsınız?</h2>
  <p>TİVA’da pompa ekranı, yeterli ilacın hastaya ulaştığını doğrulayamaz. [[K3 s. 86]]</p>
  <div class="viz"><div class="viz-head"><h3>İlaç iletimi kesilirse</h3></div><div data-viz="a07b_iletim"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. İki uygulama yolunda iletim kesintisinin nasıl fark edilebildiğini karşılaştırın. [[K3 s. 86]]</p></div>
  <p>Volatil anestezide solunum devresi arızalanırsa ekshale gazın analizi ajanın verilemediğini ortaya çıkarabilir. [[K3 s. 86]] Propofol hattı ayrıldığında benzer bir ölçüm yoktur: modelin gösterdiği düzey, ilacın damar yolundan geçtiğine ilişkin güvence sağlamaz. [[K3 s. 85–86]]</p>
  <div class="cols"><div class="card"><h3>Kurulum ve programlama</h3><p>Başlıca güçlükler TCI pompası, uygun uygulama seti ve derinlik monitörünün temini ile kurulumun standartlaştırılmasıdır. [[K3 s. 84]] İnhalasyon düzenine göre ek donanımın kontrolü gerekir. [[K3 s. 86]] Vaporizatörde doğru ajanla dolumu sağlayan anahtarlı sistemin TİVA’da eşdeğeri yoktur. [[K3 s. 86]] Pompa yanlış ilaçla veya doğru ilacın yanlış konsantrasyonuyla programlanabilir. [[K3 s. 86]]</p></div>
  <div class="card"><h3>İzlem ve süreklilik</h3><p>Kas gevşeticiyle birlikte TİVA uygulanırken anestezi derinliği monitörü kullanılması önerilmiştir. [[K3 s. 86]] İndüksiyon ve idamede aynı ajanı kullanmak, ilk ajanın etkisi bitip ikincininki henüz başlamadığında doğan boşluğu önler. [[K3 s. 86]] Bu üstünlük propofol ve volatil ajan için ortaktır, ayrıca TİVA ventilasyondan bağımsız sürdürülebilir. [[K3 s. 86]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="a07b-sure">
  <h2>İnfüzyon durunca ilk yarılanma ve uyanma</h2>
  <p>Sabit bir plazma düzeyini koruyan infüzyon kesilince düzeyin yarıya inmesine kadar geçen zaman, bağlama duyarlı yarılanma süresidir (CSHT). [[K3 s. 86]]</p>
  <div class="viz"><div class="viz-head"><h3>Bir düşüş eğrisinde iki ayrı süre</h3></div><div data-viz="a07b_yarilanma"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. Noktaların zamandaki yeri, belirli bir hasta için dakika tahmini vermez. [[K3 s. 87–88]]</p></div>
  <p>Burada bağlam, infüzyonun süresidir. [[K3 s. 86]] Sık kullanılan terminal eliminasyon yarı ömrünün klinik etki sürelerini karşılaştırmadaki değeri sınırlıdır. [[K3 s. 86]] En uzun CSHT kararlı durumda görülür: kompartımanlar arası net geçiş kalmaz ve giriş hızı eliminasyon hızına eşittir. [[K3 s. 86]]</p>
  <p>Şeklin ilk iki adımında aynı düşüş eğrisi üzerinde ilerleyin. [[K3 s. 87–88]] İlk adımın başlangıcı pompanın durduğu an, ikinci adımın başlangıcı ise konsantrasyonun ilk kez yarıya indiği andır. [[K3 s. 86–88]] Her aralıkta düzey kendi başlangıcına göre yarılanır, fakat yatay eksende okunan süreler farklıdır. [[K3 s. 87–88]]</p>
  <p>Dağılım klirensinin eliminasyon klirensine oranı büyüdükçe infüzyon süresine bağlı CSHT değişimi genel olarak genişler. [[K3 s. 86]]</p>
  <div class="tbl-wrap"><table class="tbl a07b-table"><thead><tr><th>İlaç</th><th>İnfüzyon süresinin etkisi</th><th>Modelde olası en uzun CSHT</th></tr></thead><tbody>
    <tr><th>Fentanil</th><td>Propofolden çok daha hızlı yeniden dağılır. [[K3 s. 86]] Eliminasyon klirensi dağılım klirensinin yaklaşık beşte biri olduğundan infüzyon uzadıkça CSHT hızla artar. [[K3 s. 86]]</td><td>300 dakika [[K3 s. 87]]</td></tr>
    <tr><th>Propofol</th><td>Eliminasyon klirensi ikinci kompartımana dağılım klirensine yakındır. [[K3 s. 86]] Plazma düzeyinin hızla düşmesinde eliminasyonun katkısı büyük, dağılımınki daha küçüktür. [[K3 s. 86]]</td><td>Yaklaşık 25 dakika [[K3 s. 87–88]]</td></tr>
    <tr><th>Remifentanil</th><td>Dağılım/eliminasyon klirensi oranı birden küçüktür. [[K3 s. 87]] Eliminasyon hep baskındır, dolayısıyla CSHT çok az değişir. [[K3 s. 87]]</td><td>8 dakika [[K3 s. 87]]</td></tr>
  </tbody></table></div>
  <p><b>Neden bir CSHT daha sayamayız?</b> İlk dağılımdan sonra daha yavaş yeniden dağılım ve metabolizma fazları ağırlık kazanır. [[K3 s. 87]] Sabit yarı ömrün aksine sonraki yarılanma süresi değişir ve muhtemelen çok daha uzundur. [[K3 s. 87]]</p>
  <p><b>Pompadaki azalma süresi neyi gösterir?</b> Bazı pompalar, plazma düzeyinin uyanmanın beklendiği daha düşük bir değere inmesi için gereken süreyi tahmin eder. [[K3 s. 85]] Propofolde bu değer çoğu zaman 1,2 µg/mL seçilir. [[K3 s. 85]] Eşlik eden hipnotik veya analjezik ilaçlar, özellikle opioidler, gerçek uyanmayı geciktirebilir. [[K3 s. 85]]</p>
  <p>Uzun ve uyarıcı cerrahide yüksek hızlı propofol infüzyonu sonrası uyanma için gereken düzey, son konsantrasyonun yarısından çok daha düşük olabilir. [[K3 s. 88]] Bu nedenle propofol tek başına kullanılsa bile uyanma CSHT’den çok daha uzun sürebilir ve pompa azalma süresini gösterir. [[K3 s. 88]]</p>
</section>

<section class="wrap blk ders-sec" id="a07b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin ve gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far07b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far07b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far07b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a07b-p2">
  <h2>Part II · SOE 2 (farmakoloji)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Propofolle etki yeri hedefli indüksiyonda pompa neden duraklar? Uzun bir ameliyatın sonunda pompanın azalma süresini ve hastanın uyanmasını nasıl yorumlarsınız?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Pompa modelden, ilaç konsantrasyonundan ve enjektör tipinden değişken hızlı infüzyonu hesaplar. [[K3 s. 79]]</li>
    <li>Bolustan sonra plazma hedefin üzerine çıkar, etki yeri düzeyi geriden yükselir. [[K3 s. 80–81]] Pompa duraklar ve iki düzey hedefte buluştuğunda idameye geçer. [[K3 s. 80]]</li>
    <li>İnfüzyonun süresi CSHT’nin bağlamıdır ve CSHT yalnız ilk yarılanmayı tanımlar. [[K3 s. 86–87]]</li>
    <li>Sonraki yarılanmayı daha yavaş fazlar belirler, bu nedenle süreyi ikiye katlayarak sonraki düşüşü öngöremeyiz. [[K3 s. 87]]</li>
    <li>Uyanma için gereken düzey infüzyon sonundaki düzeyin yarısından çok daha düşük olabilir. [[K3 s. 88]] Pompa seçilen alt düzeye inişi tahmin eder ve eşlik eden opioidler uyanmayı geciktirebilir. [[K3 s. 85]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Zaman ekseninde plazma ve etki yeri eğrilerini hedefte buluşturun ve pompanın duraklamasını işaretleyin. [[K3 s. 80]] Ayrı bir düşüş eğrisinde ilk yarıya ve daha düşük uyanma düzeyine ulaşma zamanlarını gösterin. [[K3 s. 86–88]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Schnider’de yüksek doruk neden büyük bolus anlamına gelmez? [[K3 s. 80–81]] Fentanil ve remifentanilde infüzyon süresinin etkisi neden farklıdır? [[K3 s. 86–87]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a07b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Etki yeri hedefinde pompa ilk bolustan sonra iki düzey hedefte buluşana kadar bekler. [[K3 s. 80]]</li>
    <li>Marsh’ta V₁ ağırlıkla artar, Schnider’de sabittir. [[K3 s. 82–83]]</li>
    <li>Propofol ve remifentanil hedeflerinin dengesi hipnoz ve analjezi gereksinimine göre değişir. [[K3 s. 84–85]]</li>
    <li>TİVA pompası hastaya ulaşan ilacı doğrudan izlemez. [[K3 s. 86]]</li>
    <li>İlk yarılanma, sonraki yarılanma ve uyanma ayrı zaman noktalarıdır. [[K3 s. 85–88]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="07b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/07a">← 07a · Propofol, remifentanil ve manuel TİVA</a><a href="#/dersler/farmakoloji/08a">Sonraki: 08a · Kimyasal yapılar ve ilaç sınıfları →</a></nav>
</section>`,
};
