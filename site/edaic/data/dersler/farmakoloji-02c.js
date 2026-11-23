VERI.sorular = VERI.sorular || {};
VERI.sorular['far02c-1'] = {
  no: 1, kok: 'İlacın böbrekten geçişi', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 21–22]]',
  onermeler: [
    { t: 'Glomerüler filtrasyon geride kalan plazmadaki serbest ilaç konsantrasyonunu düşürür.', d: false, n: 'Geriye kalan plazmada serbest ilaç konsantrasyonu filtre edilen fraksiyondakiyle aynıdır. [[K3 s. 21]]' },
    { t: 'Proteine yüksek oranda bağlanan bir ilaç aktif sekresyonla atılabilir.', d: true, n: 'Protein bağlanması filtrasyonla uzaklaştırılan miktarı sınırlar, ancak tübüler sekresyonla atılım mümkündür. [[K3 s. 21]]' },
    { t: 'Asidik ve bazik ilaçlar proksimal tübülde aynı taşıyıcının kapasitesini paylaşır.', d: false, n: 'İki ilaç sınıfı için ayrı, sınırlı kapasiteli taşıma sistemleri vardır. [[K3 s. 21–22]]' },
    { t: 'Probenesid penisilinin tübüler sekresyonunu hızlandırır.', d: false, n: 'Probenesid penisilinin sekresyonunu engeller. [[K3 s. 22]]' },
    { t: 'Bazik bir ilaç asidik idrarda katyon olarak tutulabilir.', d: true, n: 'Katyonun geri emilememesi bazik ilacın asidik idrarla atılmasını kolaylaştırır. [[K3 s. 22]]' },
  ],
};
VERI.sorular['far02c-2'] = {
  no: 2, kok: 'Safra ile atılım ve organ yetmezliği', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 22–23]]',
  onermeler: [
    { t: 'Hepatositten safra kanalikülüne ilaç taşınması enerji gerektirir.', d: true, n: 'Sekresyon konsantrasyon gradyanına karşı gerçekleşir. [[K3 s. 22]]' },
    { t: 'Bağırsakta bir glukuronidin hidrolizi aktif ilacın tekrar emilmesini sağlayabilir.', d: true, n: 'Bakteriyel glukuronidaz lipitte çözünen aktif ilacı açığa çıkarabilir. [[K3 s. 22]]' },
    { t: 'Böbrek yetmezliğinde dağılım hacmi aynı kalsa da yükleme dozu azaltılır.', d: false, n: 'Dağılım hacmi değişmemişse yükleme dozu korunur. [[K3 s. 22]]' },
    { t: 'Portokaval şant hepatik klirensi azaltabilir.', d: true, n: 'Portokaval şant hepatik klirensi düşürerek biyoyararlanımı artırır. [[K3 s. 23]]' },
    { t: 'Yüksek transaminaz düzeyi tek başına ağır sentez kaybını gösterir.', d: false, n: 'Belirgin inflamasyona rağmen karaciğerin sentez işlevi korunmuş olabilir. [[K3 s. 23]]' },
  ],
};
VERI.sorular['far02c-3'] = {
  no: 3, kok: 'Yenidoğan ve yaşlıda ilaç kinetiği', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 23–24]]',
  onermeler: [
    { t: 'Yenidoğanda ekstraselüler suyun göreli payı erişkindekinden küçüktür.', d: false, n: 'Yenidoğanda hem toplam su oranı hem de ekstraselüler suyun göreli payı yüksektir. [[K3 s. 23–24]]' },
    { t: 'Yenidoğanda plazma kolinesteraz düzeyi düşüktür.', d: true, n: 'Plazma kolinesterazı azalmıştır ve hepatik P450 aktivitesi belirgin düşüktür. [[K3 s. 24]]' },
    { t: 'Yenidoğanda ağırlık başına kreatinin klirensi erişkin değerinin %10’undan düşüktür.', d: true, n: 'Karşılaştırma birim vücut ağırlığı başına klirens içindir. [[K3 s. 24]]' },
    { t: 'Yaşla birlikte kreatinin klirensi düşer.', d: true, n: 'Klirensteki sürekli düşüş böbrek işlevindeki azalmayı yansıtır. [[K3 s. 24]]' },
    { t: 'Yaşlıda çoklu ilaç kullanımı farmakodinamik yanıtı değiştirebilir.', d: true, n: 'İlaç etkileşimleri hem kinetiği hem de farmakodinamik yanıtı değiştirebilir. [[K3 s. 24]]' },
  ],
};
const A02C_NAV = [
  ['renal','Renal atılım'], ['safra','Safra ve bağırsak'], ['bobrek','Böbrek hastalığı'],
  ['karaciger','Karaciğer hastalığı'], ['yas','Yaşamın uç dönemleri'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];
SAYFALAR['dersler/farmakoloji/02c'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 2 · Ders 02c',
  baslik: 'Atılım, hastalık ve yaşamın uç dönemleri',
  lede: 'Bir ilaç dağılımla plazmadan uzaklaşabilir. [[K3 s. 21]] Atılım ise ilacın vücudu terk etmesidir. [[K3 s. 21]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A02C_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a02c-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a02c-renal">
  <h2>İlaç idrara nasıl geçer?</h2>
  <p class="intro">Glomerülde serbest ilaç süzülür, proksimal tübülde taşıyıcılar ilacı idrara aktarabilir, distalde ise ilaç geri emilebilir. [[K3 s. 21–22]]</p>
  <div class="viz"><div class="viz-head"><h3>Distal tübülde hangi ilaç tutulur?</h3></div><div data-viz="a02c_idrar"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · İdrarın asitliğini değiştirin. [[K3 s. 22]]</p></div>
  <ul class="iskelet">
    <li><b>Filtrasyon.</b> Küçük, proteine bağlanmayan, suda kolay ve lipitte az çözünen ilaçlar ultrafiltrata geçer. [[K3 s. 21]] Yalnız süzülen plazma fraksiyonundaki serbest ilaç uzaklaşır. [[K3 s. 21]] Kalan plazmada serbest ilaç konsantrasyonu süzülen fraksiyondakiyle aynıdır ve bağlanma oranı değişmez. [[K3 s. 21]]</li>
    <li><b>Sekresyon.</b> Proteine sıkı bağlanan ilaçlar az süzülür, ancak proksimal kıvrımlı tübülde aktif olarak atılabilir. [[K3 s. 21]] Taşıyıcılar enerji harcayarak çeşitli molekülleri gradyana karşı taşır. [[K3 s. 21]] Bir asidik ilaç taşıyıcı kapasitesini doldurursa başka bir asidik ilacın klirensi azalır, bazik ilaç ayrı sistemi kullanır. [[K3 s. 21–22]] Probenesid penisilin sekresyonunu engeller. [[K3 s. 22]]</li>
    <li><b>Geri emilim.</b> Distal tübülde ilaç, konsantrasyon gradyanı yönünde pasif difüzyonla geri dönebilir. [[K3 s. 22]]</li>
  </ul>
  <h3>Atılım yolunu ne belirler?</h3>
  <p>Eliminasyon plazmadan uzaklaşmayı kapsar ve dağılım ile metabolizmayı içerir. [[K3 s. 21]] İlacın yapısı ve molekül ağırlığı atılım yollarının göreli katkısını belirler. [[K3 s. 21]]</p>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Yol</th><th>Örnek ve ayırt edici özellik</th></tr></thead><tbody>
  <tr><td>İdrar</td><td>Başlıca yollardandır, kalıcı yüklü pankuronyumun önemli bir bölümü değişmeden atılabilir. [[K3 s. 21]]</td></tr>
  <tr><td>Safra → bağırsak</td><td>Diğer ana yoldur, &gt;30.000 Da bileşikler genellikle böbrekten süzülmez veya sekrete edilmez ve ağırlıkla safraya geçer. [[K3 s. 21]]</td></tr>
  <tr><td>Akciğer</td><td>Volatil anesteziklerin başlıca çıkış yoludur. [[K3 s. 21]] Metabolitleri idrarda bulunabilir ve metoksifluranınkiler böbrek işlevini önemli ölçüde etkileyebilir. [[K3 s. 21]]</td></tr>
  <tr><td>Gözyaşı ve anne sütü</td><td>Eser miktarda ilaç saptanabilir. [[K3 s. 21]]</td></tr>
  </tbody></table></div>
</section>
<section class="wrap blk ders-sec" id="a02c-safra">
  <h2>Safraya atılan ilacın geri dönüşü</h2>
  <p class="intro">Safraya geçen bir konjugat ince bağırsakta parçalanırsa aktif ilaç portal kanla karaciğere dönebilir. [[K3 s. 22]]</p>
  <div class="viz"><div class="viz-head"><h3>Enterohepatik dolaşımı izleyin</h3></div><div data-viz="a02c_dongu"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Karaciğere dönen ilacın iki olası yolunu izleyin. [[K3 s. 22]]</p></div>
  <p>Hepatositten safra kanalikülüne sekresyon gradyana karşı enerji gerektirir, taşıma için yarışma ve inhibisyon görülebilir. [[K3 s. 22]]</p>
  <ul class="iskelet"><li>Steroid yapılı kas gevşeticiler, yüksek molekül ağırlıklı ilaçların safra ile atılımına örnektir. [[K3 s. 22]]</li><li>Rifampisin safraya değişmeden geçerken morfin metabolitleri glukuronid konjugatları halinde atılır. [[K3 s. 22]]</li></ul>
  <aside class="note plain"><b>Atlas notu.</b> Kitapta, geniş spektrumlu antibiyotik kullanırken oral kontraseptifin etkisiz kalması, bağırsak florasının ve buna bağlı olarak östrojen ile progesteronun enterohepatik dolaşımının azalmasına bağlanmıştır. [[K3 s. 22]] Çoğu geniş spektrumlu antibiyotik kombine hormonal kontraseptiflerin etkinliğini azaltmaz, ancak rifampisin ve rifabutin gibi enzim indükleyiciler ayrı değerlendirilir.</aside>
</section>
<section class="wrap blk ders-sec" id="a02c-bobrek">
  <h2>Böbrek hastalığında yükleme ve idame dozu</h2>
  <p class="intro">Renal atılıma bağımlılık arttıkça böbrek yetmezliğinde birikim önem kazanır, klirensi tümüyle renal olan ilacın tek dozu bile uzun etkili olabilir. [[K3 s. 22]]</p>
  <div class="viz"><div class="viz-head"><h3>Dağılım hacmi değişirse hangi doz etkilenir?</h3></div><div data-viz="a02c_doz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Her iki durumda da renal klirens azalmıştır. [[K3 s. 22–23]]</p></div>
  <p>Renal atılıma büyük ölçüde bağımlı bir ilaç zorunluysa doz azaltılmalıdır. [[K3 s. 22]] Kreatinin klirensi bu azaltımın yaklaşık büyüklüğünü tahmin etmeyi sağlar. [[K3 s. 23]]</p>
  <p class="note a02c-formul"><b>Gerekli doz ≈ olağan doz × (bozulmuş klirens / normal klirens)</b> [[K3 s. 23]]</p>
  <ul class="iskelet"><li>British National Formulary tabloları hafif, orta ve ağır böbrek işlev bozukluğuna göre doz azaltımına yol gösterir. [[K3 s. 23]]</li><li>Nondepolarizan kas gevşetici gallamin böbrek yetmezliğinde öyle uzun etkiliydi ki plazma düzeyini düşürüp etkisini geri çevirmek için diyaliz veya hemofiltrasyon gerekirdi. [[K3 s. 22]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a02c-karaciger">
  <h2>Karaciğer hastalığında kinetik ve analjezi</h2>
  <p class="intro">Böbrek işlevindeki kreatinin klirensine benzer bir karaciğer işlev ölçütü yoktur. [[K3 s. 23]]</p>
  <div class="viz"><div class="viz-head"><h3>Test hangi işlevi gösterir?</h3></div><div data-viz="a02c_test"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Test grubunu seçin. [[K3 s. 23]]</p></div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Değişiklik</th><th>İlaç kinetiğine etkisi</th></tr></thead><tbody>
    <tr><td>Protein sentezi azalır</td><td>Plazma protein düzeyi ve ilacın proteine bağlanması azalır. [[K3 s. 23]]</td></tr>
    <tr><td>Faz I ve II reaksiyonları etkilenir</td><td>İlaç metabolizması azalır. [[K3 s. 23]]</td></tr>
    <tr><td>Asit (karında sıvı birikimi) gelişir</td><td>Dağılım hacmi artar. [[K3 s. 23]]</td></tr>
    <tr><td>Portokaval şant oluşur</td><td>Hepatik klirens azalır, biyoyararlanım artar. [[K3 s. 23]]</td></tr>
  </tbody></table></div>
  <h3>Ensefalopati analjeziyi nasıl sınırlar?</h3>
  <ol class="iskelet"><li>Ağır yetmezlikte amonyak ve diğer moleküller temizlenemediğinde hepatik ensefalopati gelişebilir. [[K3 s. 23]]</li>
  <li>Bu hastalar benzodiazepinlere ve opioidlere çok duyarlıdır, mümkünse bu ilaçlardan kaçınılır. [[K3 s. 23]]</li>
  <li>Perioperatif güçlü analjezi gerektiğinde koagülopati çoğu kez rejyonal tekniği engeller. [[K3 s. 23]] Kalan az sayıdaki seçenekten biri, ensefalopatiyi tetikleme riskini gözeterek intravenöz opioidi dikkatle titre etmektir. [[K3 s. 23]]</li></ol>
</section>
<section class="wrap blk ders-sec" id="a02c-yas">
  <h2>Yenidoğan, süt çocuğu ve yaşlı</h2>
  <p class="intro">Yenidoğan ve küçük bebekte anatomik ve fizyolojik farklar hem nicel hem niteldir, yaşlıda ise vücut bileşimi ve organ işlevlerindeki değişimler kinetiği etkiler. [[K3 s. 23–24]]</p>
  <div class="viz"><div class="viz-head"><h3>Yaşla birlikte renal klirens</h3></div><div data-viz="a02c_yas"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Dönemi seçerek klirensin neden değiştiğini okuyun. [[K3 s. 24]]</p></div>
  <div class="cols">
  <div class="card"><h3>Yenidoğan ve küçük bebek</h3><ul>
    <li><b>Su.</b> Toplam su oranı ve suyun ekstraselüler payı yüksektir, doğumu izleyen saatler ve günlerde diürezle hacim azalır. [[K3 s. 23–24]]</li>
    <li><b>Organlar.</b> Göreli organ boyutları ve bölgesel kan akımları erişkinden farklıdır. [[K3 s. 24]] Karaciğer görece büyük olsa da metabolizma kapasitesi düşük olabilir ve erişkin kadar verimli çalışmayabilir. [[K3 s. 24]]</li>
    <li><b>Bağlanma.</b> Plazma protein düzeyi ve bağlanma düşüktür. [[K3 s. 24]] Kan pH’sı düşük olma eğilimindedir, bu da iyonize ve iyonize olmayan ilaç oranını değiştirir. [[K3 s. 24]] Böylece kan bileşimi ve asit–baz durumu bağlanmayı birlikte etkiler. [[K3 s. 24]]</li>
    <li><b>Enzimler.</b> Bazı sistemler doğumda erişkin düzeyindedir, çoğu ancak birkaç ayda olgunlaşır. [[K3 s. 24]] Plazma kolinesteraz düzeyi düşük, hepatik sitokrom P450 aktivitesi belirgin azalmıştır. [[K3 s. 24]]</li>
    <li><b>Doz.</b> Kinetik değişikliklerin çoğu öngörülebilse de kesin dozlar büyük ölçüde klinik deneyimle belirlenmiştir. [[K3 s. 24]] Uzun süredir güvenle kullanılan ve doz ayarlaması ampirik olarak bilinen ilaçlar tercih edilir. [[K3 s. 24]] Aynı postkonsepsiyonel yaşta bile bireyler arasında geniş değişkenlik vardır. [[K3 s. 24]]</li>
  </ul></div>
  <div class="card"><h3>Yaşlı</h3><ul>
    <li><b>Dağılım.</b> Kas kütlesinin göreli kaybı yağ oranını artırır ve dağılım hacmini değiştirir. [[K3 s. 24]]</li>
    <li><b>Remifentanil.</b> Metabolizmasına kas esterazları önemli katkı verdiğinden kas kaybı remifentanil duyarlılığında önemlidir. [[K3 s. 24]]</li>
    <li><b>Karaciğer.</b> Hepatik enzim aktivitesi yaşla azalır, ilaçların hepatik klirensi görece düşer. [[K3 s. 24]]</li>
    <li><b>Eşlik eden hastalıklar.</b> Birden çok hastalık daha olasıdır ve bu hastalıklar ilaç kinetiğini doğrudan değiştirebilir. [[K3 s. 24]]</li>
    <li><b>Polifarmasi.</b> İlaç etkileşimleri hem farmakokinetiği hem de farmakodinamik yanıtı değiştirebilir. [[K3 s. 24]]</li>
  </ul></div></div>
  <aside class="note plain"><b>Atlas notu.</b> Kitap, nefron sayısı ve işlevinin doğumdan sonraki birkaç ayda olgunlaştığını birlikte belirtir. [[K3 s. 24]] Zamanında doğanlarda nefron oluşumu genellikle yaklaşık 36. gebelik haftasında tamamlanır ve işlev doğumdan sonra olgunlaşır, prematürelerde ise nefron oluşumu sürebilir.</aside>
</section>
<section class="wrap blk ders-sec" id="a02c-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <div class="viz"><div data-viz="mtf" data-q="far02c-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far02c-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far02c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a02c-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Renal atılıma bağımlı bir ilacın böbrekten geçişini açıklayın. Böbrek yetmezliğinde yükleme ve idame dozlarını nasıl değerlendirirsiniz?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Glomerülde serbest ilaç süzülür, proksimal tübülde asidik ve bazik ilaçlar ayrı aktif taşıyıcılarla sekrete edilebilir. [[K3 s. 21–22]]</li>
    <li>Distalde pasif geri emilim iyonizasyona bağlıdır, asidik ilaç alkali idrarda, bazik ilaç asidik idrarda tutulur. [[K3 s. 22]]</li>
    <li>Yükleme dozunu dağılım hacmiyle ilişkilendirin. Hacim korunursa doz korunur, sıvı retansiyonuyla hacim artarsa daha yüksek yükleme gerekebilir. [[K3 s. 22]]</li>
    <li>Azalan klirens tekrarlanan dozların azaltılmasını ve doz aralığının uzatılmasını gerektirebilir. [[K3 s. 22]] Yaklaşık doz için olağan dozu bozulmuş/normal kreatinin klirensi oranıyla çarpın. [[K3 s. 23]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Glomerüler filtrasyonu, proksimal sekresyonu ve distal geri emilimi yönlü oklarla gösterin. [[K3 s. 21–22]] Yanına yükleme dozu için dağılım hacmini, tekrarlanan doz için klirensi yazın. [[K3 s. 22–23]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Safraya atılan bir ilaç dolaşıma nasıl döner? [[K3 s. 22]] Ağır karaciğer yetmezliğinde perioperatif analjezi neden güçleşir? [[K3 s. 23]] Yaşlıda remifentanil duyarlılığını hangi doku değişikliği etkiler? [[K3 s. 24]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a02c-ozet">
  <h2>Özet</h2><ul class="ozet">
  <li>Atılımın başlıca yolları idrar ve safradır, volatil anesteziklerde akciğer öne çıkar. [[K3 s. 21]]</li>
  <li>Distal tübülde iyon tuzaklanması atılımı, bağırsakta glukuronid hidrolizi ise geri emilimi kolaylaştırabilir. [[K3 s. 22]]</li>
  <li>Böbrek hastalığında yükleme dozunu dağılım hacmiyle, idameyi renal klirensle değerlendirin. [[K3 s. 22–23]]</li>
  <li>Transaminaz yüksekliğine rağmen hepatik sentez işlevi korunabilir. [[K3 s. 23]]</li>
  <li>Yenidoğanda enzimlerin geç olgunlaşması, yaşlıda kas kaybı, azalan klirens ve çoklu ilaç kullanımı ilaç yanıtını etkiler. [[K3 s. 24]]</li>
  </ul><div data-viz="tamam" data-modul="farmakoloji" data-bolum="02c"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/02b">← 02b · Dağılım ve metabolizma</a><a href="#/dersler/farmakoloji/03a">Sonraki: 03a · Etki mekanizmaları ve reseptör türleri →</a></nav>
</section>`,
};
