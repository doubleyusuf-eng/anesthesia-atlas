VERI.sorular = VERI.sorular || {};
VERI.sorular['far07a-1'] = {
  no: 1, kok: 'TİVA ve infüzyon pompaları', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 75]] [[K3 s. 78]]',
  onermeler: [
    { t: 'TİVA tanımı hipnotikle birlikte mutlaka bir analjezik infüzyonu gerektirir.', d: false, n: 'Tek başına hipnotik infüzyonuyla da indüksiyon ve idame sağlanabilir. [[K3 s. 75]]' },
    { t: 'Propofol ve remifentanili ayrı pompalarla vermek, birini diğerinden bağımsız ayarlamaya olanak tanır.', d: true, n: 'Her ilaç kendi pompasından verildiği için ayarlar bağımsızdır. [[K3 s. 75]]' },
    { t: 'Propofol ve alfentanil tek pompada karıştırıldığında alfentanil hedefi doğrudan kontrol edilebilir.', d: false, n: 'Karışım kısa olgularda kullanılmıştır ancak alfentanil için hedef konsantrasyon doğrudan kontrol edilemez. [[K3 s. 75]]' },
    { t: 'İdeal intravenöz anestezik plastik enjektörde stabil olmalıdır.', d: true, n: 'Plastik enjektörde stabilite, indüksiyon ve idame için aranan özelliklerdendir. [[K3 s. 75]]' },
    { t: 'TCI ekranındaki plazma konsantrasyonu hastada doğrudan ölçülür.', d: false, n: 'Cihaz bu değeri farmakokinetik model ve girilen hasta bilgileriyle hesaplar. [[K3 s. 78]]' }
  ]
};
VERI.sorular['far07a-2'] = {
  no: 2, kok: 'Propofol bolusundan sonra dağılım ve etki', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 76–77]]',
  onermeler: [
    { t: 'İndüksiyon dozunda propofolün %98’i albümine bağlıdır.', d: true, n: 'İntravenöz indüksiyon dozundan sonra albümine bağlanma %98’dir. [[K3 s. 76]]' },
    { t: 'Bolustan sonra uyanmayı başlıca terminal eliminasyon yarı ömrü belirler.', d: false, n: 'Beyindeki konsantrasyon periferik dağılımla birkaç dakikada düşer, terminal fazın bolus etkisinin sonlanmasına katkısı küçüktür. [[K3 s. 76]]' },
    { t: 'İndüksiyonda beyindeki konsantrasyon plazmadakinden düşüktür.', d: true, n: 'Propofolün beyne girişi geciktiğinden plazma düzeyi önce yükselir. [[K3 s. 76]]' },
    { t: 'Bolustan doruk etkiye kadar geçen süre modele göre değişir.', d: true, n: 'Modeller bu süreyi 1,7–3,9 dakika olarak verir. [[K3 s. 76]]' },
    { t: 'Etki kompartımanı modelde hacimsiz kabul edilir.', d: true, n: 'Hacimsiz etki kompartımanı santral kompartımanla dengelenir. [[K3 s. 77]]' }
  ]
};
VERI.sorular['far07a-3'] = {
  no: 3, kok: 'Remifentanil ve Bristol şeması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 77–78]]',
  onermeler: [
    { t: 'Remifentanilin metabolitleri belirgin farmakodinamik aktivite gösterir.', d: false, n: 'Metabolitlerin farmakodinamik aktivitesi çok azdır. [[K3 s. 77]]' },
    { t: 'Kas dokusundaki esterazlar remifentanil metabolizmasında önemlidir.', d: true, n: 'Ester bağını plazma esterazları ve özellikle kastaki nonspesifik doku esterazları hızla parçalar. [[K3 s. 77]]' },
    { t: 'Remifentanilin bağlama duyarlı yarılanma süresi 3–8 dakika arasında görece sabit kalır.', d: true, n: 'İnfüzyonun süresi etkinin hızla sonlanmasını pek az değiştirir. [[K3 s. 77]]' },
    { t: 'Bristol şemasında ikinci 10 dakikadaki propofol hızı 6 mg/kg/h’dir.', d: false, n: 'İkinci 10 dakikada hız 8 mg/kg/h’dir, ardından 6 mg/kg/h’ye düşer. [[K3 s. 78]]' },
    { t: 'Bristol şemasının geliştirildiği hastalarda nitröz oksit kullanılmıştır.', d: true, n: 'Şemaya nitröz oksit eklenmiş ve hastalar ventile edilmiştir. [[K3 s. 78]]' }
  ]
};

const A07A_NAV = [['tiva','TİVA'], ['propofol','Propofol'], ['remifentanil','Remifentanil'], ['bristol','Bristol modeli'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/07a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 7 · Ders 07a', baslik: 'Propofol, remifentanil ve manuel TİVA',
  lede: 'Propofol bolusundan sonra uyanmayı ve remifentanil infüzyonu kesildiğinde analjezinin kaybolmasını hangi süreçler açıklar? Bristol şemasında infüzyon hızını zamanla nasıl değiştirirsiniz?',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A07A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a07a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a07a-tiva">
  <h2>TİVA’da hangi ilaç, hangi pompa?</h2>
  <p class="intro">Total intravenöz anestezide (TİVA) indüksiyon ve idame yalnız intravenöz infüzyonlarla sağlanır, solunum gazı olarak oksijen/hava karışımı kullanılır. [[K3 s. 75]] [[K3 s. 78]]</p>
  <div class="viz"><div class="viz-head"><h3>Hipnoz ve analjezinin ayarlanması</h3></div><div data-viz="a07a_pompa"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel pompa düzenleri. [[K3 s. 75]]</p></div>
  <p>İndüksiyon ve idame için hipnotik tek başına veya bir analjezikle verilebilir. [[K3 s. 75]] En sık kullanılan ikili propofol ve remifentanildir. [[K3 s. 75]] Nitröz oksit yardımcı ajan olarak kullanılmıştır, ancak TİVA deneyimi ve çevresel etkisine ilişkin bilgi arttıkça kullanımı seyrekleşmiştir. [[K3 s. 78]]</p>
  <h3>İdeal intravenöz ilaçtan ne beklenir?</h3>
  <ul class="ozet">
    <li><b>Öngörülebilirlik.</b> Bilinen bir model plazma konsantrasyonunu öngörebilmeli, kinetik ile farmakodinamik etki arasındaki ilişki de öngörülebilir olmalıdır. [[K3 s. 75]]</li>
    <li><b>Zaman.</b> Etki hızla başlamalı ve hızla sonlanmalıdır. [[K3 s. 75]]</li>
    <li><b>Metabolit ve preparat.</b> Aktif metaboliti olmamalı ve plastik enjektörde stabil kalmalıdır. [[K3 s. 75]]</li>
  </ul>
  <p>İnfüzyon manuel olarak ayarlanabilir veya hedef kontrollü infüzyon (TCI) kullanılabilir. [[K3 s. 78]] Kompartıman modelleri plazma konsantrasyonunu öngörür, uygun kinetiğe sahip ilaçlar için geliştirilen ticari pompalar da ilaca özgü algoritmalarla TİVA uygulamasını geliştirmiştir. [[K3 s. 75]]</p>
  <p>TCI pompası plazmada veya etki yerinde (beyinde) sabit bir hedef konsantrasyonu korumak üzere infüzyon yapar. [[K3 s. 75]] [[K3 s. 78]] Propofol ve remifentanil için inhalasyon ajanlarının end-tidal ölçümüne karşılık gelen bir ölçüm yoktur. [[K3 s. 78]] Ekrandaki plazma değeri, modelin ağırlık, boy, yaş ve cinsiyet bilgilerinin bir kısmını veya tamamını kullanarak hesapladığı tahmindir. [[K3 s. 78]]</p>
</section>
<section class="wrap blk ders-sec" id="a07a-propofol">
  <h2>Propofol bolusundan sonra hasta neden erken uyanır?</h2>
  <p class="intro">Propofolün elverişli uyanma profili hem indüksiyonda hem idamede kullanılmasını sağlar. [[K3 s. 75]] Bolus vermek için kinetiğini bilmek şart olmasa da infüzyonu akılcı biçimde yönetmek için dağılımını ve eliminasyonunu anlamak gerekir. [[K3 s. 75]]</p>
  <div class="viz"><div class="viz-head"><h3>Plazma ve beyin aynı anda mı doruğa ulaşır?</h3></div><div data-viz="a07a_bolus"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel düzeyler her evrede beyni plazmayla karşılaştırır. [[K3 s. 76]]</p></div>
  <p>İndüksiyon dozunun %98’i albümine bağlanır. [[K3 s. 76]] Bolustan sonra lipofilik ilaç merkezi sinir sisteminin yağdan zengin dokusuna hızla girer ve bilinç kaybı gelişir. [[K3 s. 76]] Birkaç dakika içinde periferik dağılım beyindeki düzeyi düşürür, ek doz veya başka anestezik verilmezse hasta uyanır. [[K3 s. 76]]</p>
  <ul class="ozet">
    <li><b>Erken düşüş.</b> Dağılım yarı ömrünün 1–2 dakika olması kısa etkiyi ve plazmadaki hızlı düşüşü açıklar. [[K3 s. 76]] Karaciğerde ve karaciğer dışında çok hızlı metabolizma da bu düşüşe önemli katkı sağlar. [[K3 s. 76]]</li>
    <li><b>Terminal faz.</b> Eliminasyon yarı ömrü 5–12 saattir, çünkü yağdan plazmaya dönüş yavaştır. [[K3 s. 76]] Bu fazın tek bolustan sonra etkinin sonlanmasındaki payı küçüktür. [[K3 s. 76]]</li>
  </ul>
  <h3>Yağ dokusu neden önemlidir?</h3>
  <p>Propofol sterik engelli bir fenoldür. [[K3 s. 75]] İzopropil gruplarının ((CH₃)₂CH–) elektron bulutları hidroksil grubunu (–OH) korur ve reaktivitesini azaltır. [[K3 s. 75]] Fenolden farklı olarak suda çözünmez, yağda çok iyi çözünür ve lipit emülsiyonu halinde hazırlanır. [[K3 s. 75–76]]</p>
  <p>Fenolik hidroksil propofolü zayıf asit yapar, anlamlı iyonizasyon ancak pH 10’un üzerinde görülür. [[K3 s. 76]] Yüksek yağ çözünürlüğü uzun infüzyonda yağda birikme riski doğurur ve düşük iyonizasyonla birlikte yağdan plazmaya yeniden dağılımı yavaşlatır. [[K3 s. 76]]</p>
  <p>Çok büyük dağılım hacminin başlıca kaynağı üçüncü kompartımandır. [[K3 s. 76]] Buraya miligram olarak çok ilaç geçse bile konsantrasyon yavaş yükselir. [[K3 s. 76]]</p>
  <h3>Gecikme modele nasıl girer?</h3>
  <p>Beyne giriş ve beyinden çıkış zaman aldığından etki plazma düzeyini geriden izler, bolustan doruk etkiye kadar geçen süre modele göre 1,7–3,9 dakikadır. [[K3 s. 76]] Dengede plazma düzeyi etkiyle ilişkilidir, denge öncesindeki gecikmenin ayrıca modellenmesi gerekir. [[K3 s. 76]]</p>
  <p>Modelleme için beyin konsantrasyonu anestezi derinliği monitörüyle, genellikle bispektral monitörle (BIS), dolaylı değerlendirilir. [[K3 s. 76]] İndüksiyon ve idamede kullanılabilen üç kompartımanlı modele santral kompartımanla dengelenen hacimsiz bir etki kompartımanı eklenir. [[K3 s. 77]] Burada k<sub>e0</sub> eliminasyon hız sabiti, t<sub>½ke0</sub> ise dengelenme yarı ömrüdür. [[K3 s. 77]]</p>
</section>
<section class="wrap blk ders-sec" id="a07a-remifentanil">
  <h2>Remifentanil kesilince analjeziye ne olur?</h2>
  <p class="intro">Remifentanil, saf µ agonisti bir fentanil türevidir, infüzyon uzasa bile klinik etkisi hızla sonlanır. [[K3 s. 77]]</p>
  <div class="viz"><div class="viz-head"><h3>Cerrahiden derlenmeye analjezi</h3></div><div data-viz="a07a_analjezi"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel klinik seyir. [[K3 s. 77]]</p></div>
  <p>Plazma esterazları ve özellikle kasta bulunan nonspesifik doku esterazları remifentanilin ester bağını çok hızlı parçalar. [[K3 s. 77]] Yaşla kas kitlesinin azalması metabolizma hızını önemli ölçüde etkiler. [[K3 s. 77]]</p>
  <div class="tbl-wrap"><table class="tbl a07a-karsilastirma"><caption>Propofol ve remifentanilin kinetik farkları</caption><thead><tr><th>Özellik</th><th>Propofol</th><th>Remifentanil</th></tr></thead><tbody>
  <tr><th>Metabolit</th><td>Aktif metaboliti yoktur. [[K3 s. 76]]</td><td>Metabolitleri çok az farmakodinamik aktivite gösterir. [[K3 s. 77]]</td></tr>
  <tr><th>Uzun infüzyon</th><td>Yağda birikebilir. [[K3 s. 76]]</td><td>Diğer opioidlerde görülen anlamlı birikim olmadan uzun süre cerrahi analjezi sağlayabilir. [[K3 s. 77]]</td></tr>
  </tbody></table></div>
  <p>Remifentanilin bağlama duyarlı yarılanma süresi 3–8 dakika arasında görece sabittir, etkinin sonlanması infüzyon süresinden pek az etkilenir. [[K3 s. 77]] Ameliyat biter bitmez ağrı önemli bir sorun olabilir. [[K3 s. 77]]</p>
  <p>Kesilmeden önce yeterli analjezi sağlanmaması hiperaljeziyle ilişkili olabilir. [[K3 s. 77]] Derlenmede bu ağrıyı gidermek için başka opiatların yüksek dozları gerekebilir ve bu dozların olumsuz sonuçları olabilir. [[K3 s. 77]]</p>
</section>
<section class="wrap blk ders-sec" id="a07a-bristol">
  <h2>Manuel propofol infüzyonu · Bristol modeli</h2>
  <p class="intro">Bristol şeması, bolusu izleyen infüzyon hızını basamak basamak azaltarak 2 dakika içinde yaklaşık 3 µg/ml kan konsantrasyonuna ulaşmayı ve cerrahi boyunca bu düzeyi korumayı hedefler. [[K3 s. 78]]</p>
  <div class="viz"><div class="viz-head"><h3>Bolustan sonra 10–8–6</h3></div><div data-viz="a07a_bristol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çubukları soldan sağa okuyun. İlk 10 dakikada hız 10 mg/kg/h, sonraki 10 dakikada 8 mg/kg/h, daha sonra 6 mg/kg/h’dir. [[K3 s. 78]]</p></div>
  <ul class="ozet">
    <li><b>Şemanın dayanağı.</b> Plazma konsantrasyonları temazepam premedikasyonu alan sağlıklı hastalarda ölçülmüştür. [[K3 s. 78]] İndüksiyonda 3 µg/kg fentanilin ardından 1 mg/kg propofol bolusu verilmiştir. [[K3 s. 78]]</li>
    <li><b>Eşlik eden uygulama.</b> Hastalara nitröz oksit verilmiş ve ventilasyon uygulanmıştır. [[K3 s. 78]]</li>
    <li><b>Daha yüksek düzey gerekirse.</b> Yeterli anestezi için 10–8–6 hızları ayarlanır veya remifentanil infüzyonu gibi intravenöz destek eklenir. [[K3 s. 78]]</li>
  </ul>
  <p>Manuel uygulamayla karşılaştıran çalışmalarda TCI ile daha düşük toplam propofol dozu kullanılmış, daha iyi hemodinamik stabilite ve daha hızlı uyanma görülmüştür. [[K3 s. 79]]</p>
</section>
<section class="wrap blk ders-sec" id="a07a-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
  <div class="viz"><div data-viz="mtf" data-q="far07a-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far07a-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far07a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a07a-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bristol şemasının hangi koşullarda geliştirildiğini ve bolustan sonra propofol hızının nasıl değiştiğini anlatın. Remifentanil kullanıyorsanız ameliyat sonundaki analjeziyi nasıl planlarsınız?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Sağlıklı hastalarda temazepam premedikasyonunu 3 µg/kg fentanil ve 1 mg/kg propofol bolusu izlemiş, nitröz oksit ve ventilasyon kullanılmıştır. [[K3 s. 78]]</li>
    <li>Yaklaşık 3 µg/ml kan düzeyine 2 dakikada ulaşmak ve bunu sürdürmek hedeflenmiştir. [[K3 s. 78]] İlk 10 dakika 10 mg/kg/h, sonraki 10 dakika 8 mg/kg/h, ardından 6 mg/kg/h uygulanmıştır. [[K3 s. 78]]</li>
    <li>Remifentanil etkisi uzun infüzyondan sonra da hızla kaybolur, kesilmeden önce analjezi yetersizse hiperaljezi gelişebilir. [[K3 s. 77]] Kesmeden önce analjezi sağlamak için rejyonal teknik kullanılabilir veya cerrahi bitmeden uzun etkili bir opioid verilebilir. [[K3 s. 77]]</li>
  </ol>
  <div class="note"><b>Çizin.</b> Yatay eksene zamanı, düşey eksene propofol infüzyon hızını koyun ve 10–8–6 basamaklarını ilk ve ikinci 10 dakikayı ayırarak çizin. [[K3 s. 78]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Bolus propofolden sonra erken uyanmayı hangi yarı ömür açıklar? [[K3 s. 76]] Remifentanilin metabolizması kas kitlesiyle nasıl ilişkilidir? [[K3 s. 77]] Pompadaki plazma değeri nasıl elde edilir? [[K3 s. 78]]</div>
</section>
<section class="wrap blk ders-sec" id="a07a-ozet"><h2>Özet</h2><ul class="ozet">
  <li>Ayrı pompalar hipnoz ve analjezi için bağımsız ayar sağlar. [[K3 s. 75]]</li>
  <li>Propofol bolusunun etkisi periferik dağılımla kısa sürer, yağdan geri dönüş saatler süren terminal fazı açıklar. [[K3 s. 76]]</li>
  <li>Remifentanil kesilince analjezi hızla kaybolur, ameliyat sonrası ağrı önceden planlanmalıdır. [[K3 s. 77]]</li>
  <li>Bristol modelinde bolusu 10–8–6 mg/kg/h hızları izler. [[K3 s. 78]]</li>
  </ul><div data-viz="tamam" data-modul="farmakoloji" data-bolum="07a"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/06c">← 06c · Kompartımansız modeller ve parametrelerin ölçülmesi</a><a href="#/dersler/farmakoloji/07b">Sonraki: 07b · Hedef kontrollü infüzyon ve bağlama duyarlı yarılanma süresi →</a></nav>
</section>`
};
