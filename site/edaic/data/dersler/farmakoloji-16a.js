VERI.sorular = VERI.sorular || {};
VERI.sorular['far16a-1'] = {
  no: 1, kok: 'Sodyum nitroprussid ve metabolitleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 257–259]]',
  onermeler: [
    { t: 'SNP, kalp debisini doğrudan pozitif inotropiyle korur.', d: false, n: 'Debiyi refleks taşikardi korur. [[K3 s. 257]] SNP kontraktiliteyi doğrudan etkilemez. [[K3 s. 257]]' },
    { t: 'Siyanür toksisitesinde mikst venöz oksijen satürasyonu yükselebilir.', d: true, n: 'Sitokrom oksidaza bağlanan siyanür dokuların oksijen kullanımını bozar. [[K3 s. 258]]' },
    { t: 'Tiyosiyanatın çoğu eritrositlerde yeniden siyanüre dönüşür.', d: false, n: 'Eritrositte geri dönüş mümkündür, ancak SCN’nin çoğu idrarla atılır. [[K3 s. 258]]' },
    { t: 'Dikobalt edetat siyanür iyonlarını şelatlar.', d: true, n: 'Dikobalt edetatın hedefi CN⁻ iyonudur. [[K3 s. 258]]' },
    { t: 'Sodyum tiyosülfatın başlıca etkisi methemoglobin oluşturmaktır.', d: false, n: 'Tiyosülfat, tiyosiyanat üretimi için sülfhidril grubu sağlar. [[K3 s. 259]]' },
  ],
};
VERI.sorular['far16a-2'] = {
  no: 2, kok: 'Gliseril trinitrat ve izosorbid nitratları', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 259–261]]',
  onermeler: [
    { t: 'GTN ağırlıklı olarak venöz kapasitans damarlarını genişletir.', d: true, n: 'Venöz etki baskındır ve önyük azalır. [[K3 s. 259]]' },
    { t: 'GTN infüzyonunda polivinil klorür set tercih edilir.', d: false, n: 'Polivinil klorür GTN’yi absorbe ettiği için polietilen set tercih edilir. [[K3 s. 259]]' },
    { t: 'Sublingual GTN’nin etkisi 30–60 dakika sürer.', d: true, n: 'Etki 3 dakika içinde başlar ve 30–60 dakika sürer. [[K3 s. 260]]' },
    { t: 'İzosorbid dinitrat hepatik ilk geçişten kaçar.', d: false, n: 'ISDN yaygın ilk geçişle iki mononitrata dönüşür. [[K3 s. 260]]' },
    { t: 'İzosorbid 5-mononitratın oral biyoyararlanımı %100’dür.', d: true, n: 'ISMN hepatik ilk geçiş metabolizmasına uğramaz. [[K3 s. 261]]' },
  ],
};
VERI.sorular['far16a-3'] = {
  no: 3, kok: 'Nikorandilin etkileri ve eliminasyonu', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 261–262]]',
  onermeler: [
    { t: 'Nikorandil arteriyollerde ATP’ye duyarlı potasyum kanallarını kapatır.', d: false, n: 'Nikorandil bu kanalları hem arteriyollerde hem kalpte açar. [[K3 s. 261]]' },
    { t: 'Nikorandilin nitrat grubu venöz düz kasta cGMP’yi artırır.', d: true, n: 'Nitrat grubu guanilat siklazı uyararak venöz gevşeme sağlar. [[K3 s. 261]]' },
    { t: 'Uzun süreli nikorandil uygulaması toleransla ilişkili değildir.', d: true, n: 'Nitratlardan farklı olarak uzun süreli uygulama toleransla ilişkili değildir. [[K3 s. 261]]' },
    { t: 'Nikorandilin eliminasyon yarılanma ömrü 1 saattir.', d: true, n: 'Yarılanma ömrü 1 saat olsa da etki 12 saate kadar sürebilir. [[K3 s. 262]]' },
    { t: 'Böbrek fonksiyon bozukluğunda nikorandilin etki süresi uzamaz.', d: true, n: 'Böbrek fonksiyon bozukluğu etki süresini veya yarılanma ömrünü uzatmaz. [[K3 s. 262]]' },
  ],
};

const A16A_NAV = [['damar', 'Damar yanıtı'], ['siyanur', 'SNP metabolizması'], ['nitrat', 'Nitratlar'], ['kanal', 'Nikorandil'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet']];
SAYFALAR['dersler/farmakoloji/16a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 16 · Ders 16a',
  baslik: 'Nitrovazodilatörler ve potasyum kanal aktivatörleri',
  lede: 'Sodyum nitroprussid arterleri ve venleri genişletirken gliseril trinitratın etkisi venlerde baskındır. [[K3 s. 257]] [[K3 s. 259]] Nikorandil, nitrat grubunun etkisine potasyum kanalı aktivasyonunu ekler. [[K3 s. 261]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A16A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a16a-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a16a-damar">
  <h2>Sodyum nitroprussid ve damar yanıtı</h2>
  <p class="intro">Sodyum nitroprussid (SNP) inorganik bir kompleks ve ön ilaçtır. [[K3 s. 257]] Gliseril trinitrat (GTN) ise organik bir nitrattır. [[K3 s. 259]]</p>
  <div class="viz"><div class="viz-head"><h3>Aynı hücresel yol, farklı damar yanıtı</h3></div><div data-viz="a16a_damar"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel karşılaştırma. [[K3 s. 257]] [[K3 s. 259]]</p></div>
  <p>SNP ile arter ve venlerin birlikte genişlemesi kalp yetmezliğinde hem artyükü hem önyükü azaltır. [[K3 s. 257]]</p>
  <ul class="ozet">
    <li><b>Kalp debisi.</b> Debiyi refleks taşikardi korur, fakat kalp yetmezliğinde yüklerin azalmasıyla debi kalp hızı artmadan yükselir. [[K3 s. 257]]</li>
    <li><b>Miyokart.</b> Ventrikül duvar gerilimi ve oksijen tüketimi azalır, kontraktilite doğrudan etkilenmez. [[K3 s. 257]] Bazı hastalarda mekanizması belirsiz taşifilaksi gelişir. [[K3 s. 257]]</li>
    <li><b>Akciğer.</b> Hipoksik pulmoner vazokonstriksiyonun baskılanması şantı artırabilir, ek oksijen yararlı olabilir. [[K3 s. 257]]</li>
    <li><b>Beyin.</b> Serebral vazodilatasyon ve artan kan akımı intrakraniyal basıncı yükseltir. [[K3 s. 257]] İnfüzyon sırasında otoregülasyon normal basınç sınırlarının çok altında bile korunur. [[K3 s. 257]]</li>
    <li><b>Uygulama.</b> Oral emilim yoktur. [[K3 s. 257]] Genellikle %0.005–0.02 (50–200 μg/ml) intravenöz infüzyon kullanılır ve 0.5–6 μg.kg−1.dk−1 doz etkiye göre titre edilir. [[K3 s. 257]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a16a-siyanur">
  <h2>SNP metabolizması ve toksisite</h2>
  <p class="intro">SNP’nin yarılanma ömrü kısa, etkisi 10 dakikadan kısadır. [[K3 s. 257]] Tiyosiyanat da toksiktir, ancak başlıca tehlike serbest siyanürdür. [[K3 s. 258]]</p>
  <div class="viz"><div class="viz-head"><h3>Eritrositte oluşan siyanürün akıbeti</h3></div><div data-viz="a16a_siyanur"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel metabolizma yolları. [[K3 s. 257–258]]</p></div>
  <p>Rodanaz yolunun ürünü SCN’nin çoğu idrarla atılır, eritrositteki tiyosiyanat oksidaz ise SCN’yi yeniden CN⁻’ye çevirebilir. [[K3 s. 258]] SCN’nin eliminasyon yarılanma ömrü 2 gündür ve böbrek fonksiyon bozukluğunda 7 güne çıkabilir. [[K3 s. 258]]</p>
  <h3>Siyanür toksisitesinde yaklaşım</h3>
  <p>SNP infüzyonu durdurulur ve dokulara oksijen sunumu optimize edilir. [[K3 s. 258]]</p>
  <ul class="ozet">
    <li><b>Dikobalt edetat</b> CN⁻ iyonlarını şelatlar. [[K3 s. 258]]</li>
    <li><b>Sodyum tiyosülfat</b> ek sülfhidril grupları sağlayarak CN⁻’nin SCN’ye dönüşümünü kolaylaştırır, bazen profilakside kullanılır. [[K3 s. 259]]</li>
    <li><b>Sodyum nitrit veya amil nitrit</b> oksihemoglobini methemoglobine dönüştürür. [[K3 s. 259]] Methemoglobinin CN⁻’ye afinitesi sitokrom oksidazınkinden yüksektir. [[K3 s. 259]]</li>
  </ul>
  <p>B₁₂ vitamini siyanokobalamin oluşumu için gereklidir, ancak akut tabloda değeri sınırlıdır ve bazen profilakside kullanılır. [[K3 s. 259]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap B₁₂’nin akut değerinin az olduğunu söyler; güncel uygulamada hidroksokobalamin, akut siyanür zehirlenmesinde ilk seçilen antidotlardandır.</div>
</section>
<section class="wrap blk ders-sec" id="a16a-nitrat">
  <h2>GTN ve izosorbid nitratları</h2>
  <p class="intro">GTN dil altından da bağırsaktan da hızla emilir, ancak karaciğerden ilk geçiş ağızdan alınan dozun biyoyararlanımını düşürür. [[K3 s. 260]]</p>
  <div class="viz"><div class="viz-head"><h3>Uygulama yolunu ve nitratı karşılaştırın</h3></div><div data-viz="a16a_nitrat"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel yollar, süreler ve oranlar çeviriden. [[K3 s. 260–261]]</p></div>
  <p>İzosorbid dinitrat (ISDN) ile izosorbid 5-mononitrat (ISMN) anjina profilaksisinde kullanılır. [[K3 s. 261]] ISMN’nin yarılanma ömrü ISDN’ninkinden çok daha uzundur (4.5 saat). [[K3 s. 260]] ISDN preparatına patlama riskini azaltmak için laktoz ve mannitol katılır. [[K3 s. 260]]</p>
  <h3>GTN preparatları</h3>
  <div class="tbl-wrap a16a-tablo"><table class="tbl"><thead><tr><th scope="col">Yol</th><th scope="col">Preparat ve uygulama</th></tr></thead><tbody>
    <tr><th scope="row">Dil altı</th><td>Gerektiğinde ölçülü aerosol sprey (400 μg/doz) veya 300–600 μg tablet. [[K3 s. 259]]</td></tr>
    <tr><th scope="row">Bukkal</th><td>1–5 mg değiştirilmiş salımlı tablet üst dudakla diş eti arasına yerleştirilir, en çok günde üç kez 5 mg verilir. [[K3 s. 259]]</td></tr>
    <tr><th scope="row">Oral</th><td>2.6–10 mg değiştirilmiş salımlı tablet yutulur, en çok günde üç kez 12.8 mg verilir. [[K3 s. 259]]</td></tr>
    <tr><th scope="row">Transdermal</th><td>Yama 5–15 mg/24 saat salıverir ve her uygulamada göğsün farklı bir yerine yapıştırılır. [[K3 s. 259]] GTN ısıtıldığında patladığı için yama DC kardiyoversiyon öncesi çıkarılır. [[K3 s. 259]]</td></tr>
    <tr><th scope="row">İntravenöz</th><td>Berrak, renksiz 1–5 mg.ml−1 çözelti %0.01’e (100 μg/ml) seyreltilir ve pompayla 10–200 μg.dk−1 verilir. [[K3 s. 259]] Polivinil klorür GTN’yi absorbe ettiğinden özel polietilen set tercih edilir. [[K3 s. 259]]</td></tr>
  </tbody></table></div>
  <div class="cols">
    <div class="card"><h3>Kullanım alanları</h3><ul>
      <li>Anjina tedavisi ve profilaksisi. [[K3 s. 259]]</li>
      <li>Miyokart enfarktüsüne eşlik eden sol ventrikül yetmezliği ve kalp cerrahisi sonrası kullanım. [[K3 s. 259]]</li>
      <li>İntraoperatif kan basıncı kontrolünde ve özofagus spazmında da kullanılmıştır. [[K3 s. 259]]</li></ul></div>
    <div class="card"><h3>Venöz dönüş azalınca</h3><p>Ventrikül duvar gerilimi ve oksijen gereksinimi düşer, subendokardiyal kan akımı artar. [[K3 s. 259–260]] Bu etkiler iskemik kalp hastalığı ve kalp yetmezliğinde kullanımını açıklar. [[K3 s. 259–260]]</p><p>Önyük azalınca debi düşebilir, ancak kalp yetmezliğinde artabilir. [[K3 s. 260]] Postüral hipotansiyon görülebilir. [[K3 s. 260]]</p></div>
  </div>
  <ul class="ozet">
    <li><b>Yüksek doz.</b> Sistemik direnç düştüğünde basınç daha da azalır, miyokardın iş yükü ve koroner perfüzyon basıncı düşer. [[K3 s. 260]] Taşikardi perfüzyon süresini kısaltır, ancak koroner vazodilatasyon akımı doğrudan artırabilir. [[K3 s. 260]]</li>
    <li><b>Tolerans.</b> 48 saat içinde gelişir ve damar düz kasındaki sülfhidril gruplarının tükenmesine bağlı olabilir. [[K3 s. 260]] Her gün birkaç saat ilaçsız kalmak toleransı önler. [[K3 s. 260]] Asetilsistein infüzyonunun sülfhidril sağlayarak toleransı önleyebileceği ileri sürülmüştür. [[K3 s. 260]]</li>
    <li><b>Beyin ve sindirim sistemi.</b> Serebral vazodilatasyon intrakraniyal basınç artışına ve baş ağrısına yol açabilir, bunlar çoğunlukla tedavi başlangıcında sorun olur. [[K3 s. 260]] GTN, Oddi sfinkteri dahil gastrointestinal sfinkterleri gevşetir. [[K3 s. 260]]</li>
    <li><b>Metabolizma ve kan.</b> Karaciğerde nitrat redüktaz, doku tiyolleri (R-SH) yardımıyla GTN’den gliserol dinitrat ve nitrit (NO₂⁻) üretir. [[K3 s. 260]] Nitritten etkin aracı NO oluşur. [[K3 s. 260]] Nitrit belirli koşullarda Fe²⁺’yi Fe³⁺’ye oksitleyerek oksihemoglobini methemoglobine çevirebilir, GTN nadiren methemoglobinemi yapar. [[K3 s. 260]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a16a-kanal">
  <h2>Nikorandil</h2>
  <p class="intro">Nikorandili (nikotinamidoetil nitrat) diğer potasyum kanalı aktivatörlerinden ayıran özellik nitrat grubu taşımasıdır. [[K3 s. 261]]</p>
  <div class="viz"><div class="viz-head"><h3>Kanal ne zaman açılır, nitrat grubu nerede etkili olur?</h3></div><div data-viz="a16a_kanal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel kanal ve damar yanıtları. [[K3 s. 261]]</p></div>
  <p>Arteriyel ve venöz genişleme artyükü, önyükü, kan basıncını ve sol ventrikül diyastol sonu basıncını düşürür. [[K3 s. 261]]</p>
  <div class="cols"><div class="card"><h3>Uygulama</h3><ul>
    <li>Japonya’da 1984’ten beri kullanılır, Birleşik Krallık’ta 1994’te piyasaya çıkmıştır. [[K3 s. 261]]</li>
    <li>Olağan tablet dozu günde iki kez 10–30 mg’dır. [[K3 s. 261]] İntravenöz yolla deneysel olarak kullanılmıştır. [[K3 s. 261]]</li>
    <li>Anjina tedavisi ve profilaksisi, konjestif kalp yetmezliği ve hipertansiyon tedavisi. [[K3 s. 261]]</li></ul></div>
    <div class="card"><h3>Kinetik</h3><ul>
    <li>Gastrointestinal emilim iyi, ilk geçiş ve plazma proteinlerine bağlanma önemsizdir. [[K3 s. 262]]</li>
    <li>Başlıca yol denitrasyondur, %20’si idrarda metabolit olarak atılır. [[K3 s. 262]]</li>
    <li>Eliminasyon yarılanma ömrü 1 saat, etki süresi 12 saate kadardır. [[K3 s. 262]] Böbrek fonksiyon bozukluğunda bu süreler uzamaz. [[K3 s. 262]]</li></ul></div></div>
  <ul class="ozet">
    <li><b>Koroner dolaşım.</b> Normal ve kollateral koroner akım iyileşir, bunda çalma fenomeni oluşturmayan koroner vazodilatasyonun payı vardır. [[K3 s. 261]] İskemik kalp hastalığı ve kalp yetmezliğinde debi artar. [[K3 s. 261]]</li>
    <li><b>Ritim ve ileti.</b> Uzamış QT ile ilişkili torsades de pointes’i baskılar. [[K3 s. 261]] İn vitro yüksek konsantrasyonda repolarizasyonu hızlandırarak aksiyon potansiyelini kısaltır. [[K3 s. 261]] Kontraktilite ve atriyoventriküler ileti değişmez. [[K3 s. 261]]</li>
    <li><b>Deneysel iskemi.</b> İskeminin boyutu küçülür, ancak mekanizma belirsizdir ve henüz tanımlanmamış başka bir kardiyoprotektif yol öne sürülmüştür. [[K3 s. 261]]</li>
    <li><b>Uzun süreli kullanım.</b> Toleransla ilişki görülmez, baş ağrısı genellikle tedavi sürdükçe düzelir. [[K3 s. 261]] Dev oral aftöz ülserler bildirilmiştir. [[K3 s. 261]]</li>
    <li><b>Metabolizma ve trombosit.</b> Diğer antihipertansiflerden farklı olarak lipit profili ve glukoz kontrolü değişmez. [[K3 s. 261]] Nitratlar gibi nikorandil de in vitro ADP ile uyarılan agregasyonu baskılar ve bu etki trombosit içi cGMP artışıyla ilişkilidir. [[K3 s. 261]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a16a-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin ve gerekçenizi kontrol edin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far16a-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far16a-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far16a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a16a-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>SNP, GTN ve nikorandilin damar etkilerini karşılaştırın. SNP infüzyonu sırasında metabolik asidozla birlikte mikst venöz oksijen satürasyonunun yükselmesini nasıl açıklar ve yönetirsiniz?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>SNP ve GTN’de NO, guanilat siklaz ve cGMP üzerinden sitoplazmik Ca²⁺’yi düşürür. [[K3 s. 257]] [[K3 s. 259]]</li>
    <li>SNP arter ve venleri genişletir, GTN’de venöz etki ve önyük azalması baskındır. [[K3 s. 257]] [[K3 s. 259]]</li>
    <li>Nikorandil kalpte ve arteriyollerde K⁺ kanallarını açar, venlerde nitrat grubu üzerinden gevşeme sağlar. [[K3 s. 261]]</li>
    <li>SNP’den açığa çıkan CN⁻ sitokrom oksidaza bağlanabilir. [[K3 s. 257–258]] Aerobik metabolizma bozulduğunda asidoz gelişir, dokular oksijeni kullanamadıkça mikst venöz satürasyon yükselir. [[K3 s. 258]]</li>
    <li>İnfüzyon kesilir, dokuya oksijen sunumu optimize edilir. [[K3 s. 258]] Dikobalt edetat CN⁻’yi şelatlar. [[K3 s. 258]] Tiyosülfat SCN oluşumunu destekler, nitritler CN⁻ bağlayabilen methemoglobin oluşturur. [[K3 s. 259]]</li>
  </ol>
  <div class="note"><b>Çizin.</b> SNP ve GTN için NO–cGMP yolunu, nikorandil için K⁺ kanalı ve nitrat dallarını gösterin. [[K3 s. 257]] [[K3 s. 259]] [[K3 s. 261]] SNP’den çıkan CN⁻’nin rodanaz ve sitokrom oksidaz yollarını ekleyin. [[K3 s. 257–258]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> GTN toleransı nasıl önlenir? [[K3 s. 260]] ISDN ile ISMN’nin ilk geçişi nasıl farklılaşır? [[K3 s. 260–261]] Böbrek fonksiyon bozukluğu SCN ve nikorandilin yarılanma ömürlerini nasıl etkiler? [[K3 s. 258]] [[K3 s. 262]]</div>
</section>
<section class="wrap blk ders-sec" id="a16a-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>SNP ile kalp yetmezliğinde önyük ve artyük azalırken debi taşikardi olmadan artar. [[K3 s. 257]]</li>
    <li>Siyanür dokunun oksijen kullanımını bozar, SCN’nin yarılanma ömrü böbrek fonksiyon bozukluğunda 2 günden 7 güne çıkabilir. [[K3 s. 258]]</li>
    <li>GTN’nin venöz etkisi duvar gerilimini ve oksijen gereksinimini düşürür. [[K3 s. 259–260]]</li>
    <li>ISDN’nin ilk geçişinde aktif mononitratlar oluşur, ISMN’nin oral biyoyararlanımı %100’dür. [[K3 s. 260–261]]</li>
    <li>Nikorandil arteriyolde K⁺ kanalına, vende nitrat grubuna dayanan iki yolla yükü azaltır. [[K3 s. 261]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="16a"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/15b">← 15b · Ventriküler ve karma etkili antiaritmikler</a><a href="#/dersler/farmakoloji/16b">Sonraki: 16b · Kalsiyum kanal antagonistleri ve diğer vazodilatörler →</a></nav>
</section>`,
};
