VERI.sorular = VERI.sorular || {};
VERI.sorular['far12d-1'] = {
  no: 1, kok: 'Edrofonyum ve neostigmin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 199–202]]',
  onermeler: [
    { t: 'Edrofonyum AChE ile kovalent bağ kurar.', d: false, n: 'Gerçek kovalent bağ oluşmaz; hidroksil grubunun hidrojen bağı kompleksi stabilize eder ve asetilkolin enzim için yarışabilir. [[K3 s. 199–200]]' },
    { t: 'Edrofonyum asetilkolin salınımını da artırır.', d: true, n: 'Edrofonyum hem asetilkolinin hidrolizini yavaşlatır hem de salınımını artırır. [[K3 s. 199–200]]' },
    { t: 'Edrofonyumun etkisi neostigminden daha geç başlar.', d: false, n: 'Edrofonyumun etki başlangıcı neostigminden daha hızlıdır. [[K3 s. 200]]' },
    { t: 'Neostigmin süksametonyumun etkisini uzatabilir.', d: true, n: 'Neostigmin plazma kolinesterazını da inhibe eder. [[K3 s. 200]]' },
    { t: 'Neostigminin oral biyoyararlanımı yüksektir.', d: false, n: 'Neostigmin bağırsaktan zayıf emildiği için oral biyoyararlanımı düşüktür. [[K3 s. 202]]' }
  ]
};
VERI.sorular['far12d-2'] = {
  no: 2, kok: 'Karbamatlar ve organofosforlu bileşikler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 200–203]]',
  onermeler: [
    { t: 'Karbamillenmiş AChE, asetillenmiş AChE’den daha yavaş hidrolize olur.', d: true, n: 'Karbamillenmiş enzim daha uzun süre işlevsiz kalır. [[K3 s. 200]]' },
    { t: 'Piridostigminin etkisi neostigminden daha uzun sürer.', d: true, n: 'Daha uzun etki ve daha az otonom etki miyastenia graviste piridostigminin tercih nedenleridir. [[K3 s. 202]]' },
    { t: 'Fizostigmin kuaterner amindir.', d: false, n: 'Fizostigmin tersiyer amindir ve kan-beyin bariyerini geçer. [[K3 s. 202]]' },
    { t: 'Organofosforlu bileşikler AChE’nin anyonik bölgesini fosforiller.', d: false, n: 'Fosforillenen yer enzimin esteratik bölgesidir. [[K3 s. 202]]' },
    { t: 'Pralidoksim fosforillenmiş AChE’nin reaktivasyonunu sağlar.', d: true, n: 'Pralidoksim kompleksin hidrolizini destekler. [[K3 s. 203]]' }
  ]
};
VERI.sorular['far12d-3'] = {
  no: 3, kok: 'Sugammadeksin seçiciliği, dozu ve atılımı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 203–204]]',
  onermeler: [
    { t: 'Sugammadeks bir β siklodekstrindir.', d: false, n: 'Sugammadeks sekiz şekerli γ siklodekstrin ailesindendir. [[K3 s. 203]]' },
    { t: 'Sugammadeks vekuronyuma bağlı bloğu geri döndürebilir.', d: true, n: 'Ruhsatlı kullanım hem vekuronyum hem de rokuronyum bloğunu kapsar. [[K3 s. 203]]' },
    { t: 'Dörtlü uyarıda T2 göründüğünde rutin sugammadeks dozu 2 mg.kg⁻¹’dir.', d: true, n: 'T2 yanıtı için doz 2 mg.kg⁻¹, bir miktar posttetanik seğirme aktivitesi olan blokta 4 mg.kg⁻¹’dir. [[K3 s. 203]]' },
    { t: 'Sugammadeks terapötik dozlarda doğrusal kinetik gösterir.', d: true, n: 'Kinetiği terapötik aralıkta doğrusaldır ve dağılım hacmi 11–14 litredir. [[K3 s. 204]]' },
    { t: 'Sugammadeks metabolize olmadan böbreklerden atılır.', d: true, n: 'Eliminasyon yalnız böbrek yoluyla gerçekleşir ve etkin yarı ömür 2,5 saattir. [[K3 s. 204]]' }
  ]
};

const A12D_NAV = [
  ['enzim','Edrofonyum'], ['karbamat','Karbamatlar'], ['fosfat','Organofosforlar'],
  ['halka','Siklodekstrinler'], ['doz','Sugammadeks dozu'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
];

SAYFALAR['dersler/farmakoloji/12d'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 12 · Ders 12d', baslik: 'Geri döndürücü ajanlar',
  lede: 'Nondepolarizan bloğu geri döndürmek için eskiden yalnız antikolinesterazlar kullanılırdı. [[K3 s. 199]] Sugammadeks ise kas gevşeticiyi doğrudan bağlar. [[K3 s. 203]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A12D_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a12d-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a12d-enzim">
<h2>Asetilkolinin yıkımı ve edrofonyum</h2>
<p class="intro">Antikolinesterazlar asetilkolinesterazı (AChE) inhibe eder, böylece nöromüsküler kavşakta asetilkolinin (ACh) yıkımı yavaşlar ve miktarı artar. [[K3 s. 199]]</p>
<div class="viz"><div class="viz-head"><h3>Edrofonyum aktif bölgeyi nasıl kapatır?</h3></div><div data-viz="a12d_enzim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 199–200]]</p></div>
<p>AChE kavşak dışında da bulunur. [[K3 s. 199]] Bu yüzden bradikardiyi ve aşırı tükürük salgısını önlemek için antikolinesteraza sıklıkla glikopirolat veya atropin eklenir. [[K3 s. 199]]</p>
<p>Üç inhibisyon biçimi vardır. [[K3 s. 199]] Kolayca geri dönen inhibisyonun tek örneği edrofonyumdur, diğer iki grubu karbamillenmiş kompleks oluşturanlar ve geri dönüşümsüz inaktivatörler oluşturur. [[K3 s. 199–202]]</p>
<div class="cols">
<div class="card"><h3>Krizde kas gücü</h3><p>Fenolik kuaterner amin olan edrofonyum intravenöz 2–10 mg verildiğinde iki krizi hızla ayırt eder. [[K3 s. 199]] Miyastenik krizde güç artar, kolinerjik krizde tablo kötüleşir. [[K3 s. 199]]</p></div>
<div class="card"><h3>Emilim ve atılım</h3><p>Kuaterner yapı yağda çözünürlüğü sınırlar, oral emilim olmaz ve ilaç kan-beyin bariyerini ya da plasentayı geçmez. [[K3 s. 200]] İdrarla değişmeden atılan oran %65’e kadardır, kalan kısım karaciğerde glukuronidasyon sonrası safraya geçer. [[K3 s. 200]]</p></div></div>
<p>Edrofonyumun muskarinik etkileri hafiftir, yine de bradikardi ve tükürük salgısı görülebilir. [[K3 s. 200]]</p>
</section>
<section class="wrap blk ders-sec" id="a12d-karbamat">
<h2>Karbamatlar enzimi ne kadar süre meşgul eder?</h2>
<p class="intro">Neostigmin, piridostigmin ve fizostigmin AChE’yi karbamiller ve asit aktaran veya zamana bağımlı inhibitörler diye anılırlar. [[K3 s. 200]]</p>
<div class="viz"><div class="viz-head"><h3>Enzimin yeniden kullanılabilir hâle gelmesi</h3></div><div data-viz="a12d_karbamat"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 200]]</p></div>
<p>Neostigmin ayrıca plazma kolinesterazını inhibe ettiğinden süksametonyumun etkisini uzatabilir. [[K3 s. 200]]</p>
<div class="a12d-ilaclar">
<article class="card"><h3>Neostigmin</h3><ul>
<li>Kuaterner amin, tablet veya intravenöz çözelti olarak sunulur, glikopirolatla kombine preparatı da vardır. [[K3 s. 201]]</li>
<li>Nondepolarizan bloğun geri döndürülmesinde intravenöz 0,05 mg.kg⁻¹ kullanılır. [[K3 s. 201]] Miyastenia graviste oral 15–30 mg ile etki 4 saate kadar sürer. [[K3 s. 201]] Üriner retansiyon da kullanım alanıdır. [[K3 s. 201]]</li>
<li>Tek başına bradikardiyi tetikler, supraventriküler taşikardi tedavisindeki yeri sınırlıdır. [[K3 s. 201]] Astımda bronkospazmı tetikleyebilir. [[K3 s. 202]] Tükürük salgısı ve bağırsak motilitesi artar, karın krampları gelişebilir. [[K3 s. 202]]</li>
<li>Bağırsaktan zayıf emilir, oral biyoyararlanımı ve dağılım hacmi düşüktür, proteine çok az bağlanır. [[K3 s. 202]] Kan-beyin bariyerini geçmez, kısmen karaciğerde metabolize olur ve yaklaşık %55’i idrarla değişmeden atılır. [[K3 s. 202]]</li></ul></article>
<article class="card"><h3>Piridostigmin</h3><ul><li>Kuaterner amindir ve kan-beyin bariyerini geçmez. [[K3 s. 202]]</li><li>Neostigminden yavaş başlar, daha uzun sürer ve otonom etkileri daha azdır. [[K3 s. 202]] Son iki özellik başlıca kullanımı olan miyastenia graviste tercih edilmesini sağlar. [[K3 s. 202]]</li><li>Böbrek yoluyla eliminasyona neostigminden daha bağımlıdır. [[K3 s. 202]]</li></ul></article>
<article class="card"><h3>Fizostigmin</h3><ul><li>Tersiyer amin olduğundan bağırsaktan iyi emilir ve kan-beyin bariyerini geçer. [[K3 s. 202]]</li><li>Geçmişte antikolinerjik zehirlenme tedavisinde kullanılmıştır. [[K3 s. 202]]</li></ul></article></div>
<div class="tbl-wrap"><table class="tbl a12d-kiyas"><caption>Etki başlangıcı ve değişmeden idrarla atılım</caption>
<thead><tr><th scope="col">İlaç</th><th scope="col">Neostigmine göre başlangıç</th><th scope="col">Atılan oran</th></tr></thead>
<tbody><tr><th scope="row">Edrofonyum</th><td>Daha hızlı [[K3 s. 200]]</td><td>%65’e kadar [[K3 s. 200]]</td></tr>
<tr><th scope="row">Neostigmin</th><td>Karşılaştırma ilacı</td><td>Yaklaşık %55 [[K3 s. 202]]</td></tr>
<tr><th scope="row">Piridostigmin</th><td>Daha yavaş [[K3 s. 202]]</td><td>%75 [[K3 s. 202]]</td></tr></tbody></table></div>
</section>
<section class="wrap blk ders-sec" id="a12d-fosfat">
<h2>Organofosforlu bileşikler</h2>
<p class="intro">Organofosforlar AChE’nin esteratik bölgesini fosforilleyerek hidrolize ve reaktivasyona dirençli bir kompleks oluşturur. [[K3 s. 202]]</p>
<div class="viz"><div class="viz-head"><h3>Fosforillenmeden enzim işlevinin geri kazanılmasına</h3></div><div data-viz="a12d_fosfat"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 202–203]]</p></div>
<ul class="ozet"><li>Bu çok toksik bileşikler arasında insektisit tetraetilpirofosfat (TEPP) ve sinir gazı sarin (GB) bulunur. [[K3 s. 202]] Yağda iyi çözünür, deriden hızla emilir ve plazma kolinesterazını da inhibe ederler. [[K3 s. 202]]</li>
<li>Zehirlenmede nikotinik ve muskarinik etkilerle otonom instabilite görülür, başlangıçtaki santral uyarılmayı depresyon, koma ve apne izleyebilir. [[K3 s. 202]]</li>
<li>Oksimlerin yanında atropin, antikonvülzanlar ve ventilasyon gerekebilir. [[K3 s. 203]]</li>
<li>Ekotiyopat iyodür glokomda kullanılmıştır, kitap trabeküler drenajdaki iyileşmeyi siliyer kasın gevşemesine bağlar. [[K3 s. 202]]</li></ul>
<div class="cols"><div class="note plain"><b>Atlas notu.</b> Kitap ekotiyopatın siliyer kası gevşettiğini söyler. Doğrusu, endojen asetilkolinin etkisini artırarak siliyer kasın kasılmasını ve akomodasyonu güçlendirmesidir.</div>
<div class="note plain"><b>Atlas notu.</b> Kitap oksimin adını “obidoksin” olarak verir. Doğru ad obidoksimdir.</div></div>
</section>
<section class="wrap blk ders-sec" id="a12d-halka">
<h2>Siklodekstrin halkası neyi yakalar?</h2>
<p class="intro">Siklodekstrinlerin dış yüzeyi hidrofilik, iç boşluğu görece hidrofobiktir. [[K3 s. 203]]</p>
<div class="viz"><div class="viz-head"><h3>Halka büyüklüğü ve sugammadeksin hedefi</h3></div><div data-viz="a12d_halka"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Halkalar şematiktir, şeker sayıları kaynaktaki değerlerdir. [[K3 s. 203]]</p></div>
<ul class="ozet"><li>Kompleks oluşumu hidrofobik ilaçların çözünürlüğünü ve biyoyararlanımını artırır. [[K3 s. 203]] Kolesterol halkaya alınır ve kompleks uzaklaştırılarak kolesterolsüz ürün hazırlanır. [[K3 s. 203]] Koku maddeleri ve toksinler de salınımları ve tüketilmeleri için kompleks hâline getirilebilir. [[K3 s. 203]]</li>
<li>Selektif gevşetici bağlayıcı ajan (SRBA) sugammadeks, aminosteroidlerden rokuronyum ve vekuronyumu enkapsüle ederek plazmadan ve nöromüsküler kavşaktan uzaklaştırır. [[K3 s. 203]] Ruhsatı bu iki ajanın bloğunu kapsar ve antikolinesterazların beklenen yan etkileri genellikle görülmez. [[K3 s. 203]]</li>
<li>Avrupa’da 2008’de, ABD’de aşırı duyarlılık kaygıları nedeniyle 2015’te onaylanmıştır. [[K3 s. 203]] Şüpheli rokuronyum anafilaksisinde kullanılmıştır, ancak kitap bu kullanımın onaylanmış anafilaksi kılavuzlarında yer almadığını belirtir. [[K3 s. 203]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a12d-doz">
<h2>Sugammadeks dozunu blok derinliğiyle eşleştirin</h2>
<p class="intro">Rutin geri döndürmede gereken sugammadeks dozunu posttetanik seğirme ve dörtlü uyarı (TOF) yanıtıyla ayırt edebilirsiniz. [[K3 s. 203]]</p>
<div class="viz"><div class="viz-head"><h3>Uyarı yanıtından doza</h3></div><div data-viz="a12d_doz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Rutin dozlar rokuronyum ve vekuronyum, acil doz belirtilen rokuronyum uygulaması içindir. [[K3 s. 203–204]]</p></div>
<p>Çözelti 100 mg.ml⁻¹ derişiminde, 2 veya 5 ml flakonlarda sunulur ve raf ömrü 3 yıldır. [[K3 s. 203]] Acil geri döndürmede çok sayıda flakon gerekir. [[K3 s. 204]]</p>
<div class="cols"><div class="card"><h3>Yerinden çıkarma</h3><p>Flukloksasilin, diklofenak, fusidik asit ve selektif östrojen reseptör modülatörü toremifen bağlı rokuronyum veya vekuronyumu yerinden çıkarabilir, blok tekrarlayabilir. [[K3 s. 204]]</p></div>
<div class="card"><h3>Yakalama</h3><p>Başka ilaçların halkaya girmesi etkilerini azaltabilir. [[K3 s. 204]] Oral kontraseptif kullananlarla olası etkinlik kaybı görüşülmeli ve sugammadeksten sonraki yedi gün ek kontrasepsiyon önerilmelidir. [[K3 s. 204]]</p></div></div>
<ul class="ozet"><li><b>Kinetik.</b> Terapötik dozlarda kinetiği doğrusaldır, dağılım hacmi 11–14 litredir. [[K3 s. 204]] Metabolize olmadan yalnız böbreklerden atılır ve etkin yarı ömrü 2,5 saattir. [[K3 s. 204]]</li>
<li><b>Yan etkiler.</b> Aşırı duyarlılık kaygısı sürmektedir, NAP6’da sugammadekse bağlı tek bir anafilaksi olgusu saptanmıştır. [[K3 s. 204]] Şiddetli bradikardi çok nadirdir. [[K3 s. 204]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a12d-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far12d-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far12d-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far12d-3"></div></div></section>
<section class="wrap blk ders-sec" id="a12d-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Rokuronyum bloğunu geri döndürürken neostigmin ve sugammadeks nasıl etki eder? Dozlarını ve beklenen yan etkileri karşılaştırın.</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Neostigminin AChE’yi karbamillemesi kavşakta ACh yıkımını yavaşlatır. [[K3 s. 199–201]]</li>
<li>Nondepolarizan blokta intravenöz doz 0,05 mg.kg⁻¹’dir. [[K3 s. 201]] Bradikardi, astımda bronkospazm, tükürük salgısı ve bağırsak motilitesinde artış beklenir. [[K3 s. 201–202]] Bradikardi ve aşırı salgıyı önlemek için sıklıkla glikopirolat veya atropin eklenir. [[K3 s. 199]]</li>
<li>Sugammadeks rokuronyumu γ siklodekstrin halkasının içine alır. [[K3 s. 203]]</li>
<li>Posttetanik seğirmede 4 mg.kg⁻¹, TOF’ta T2 göründüğünde 2 mg.kg⁻¹ kullanılır. [[K3 s. 203]] Acil durumda 1,2 mg.kg⁻¹ rokuronyumun hemen ardından sugammadeks dozu 16 mg.kg⁻¹’dir. [[K3 s. 204]]</li>
<li>Sugammadeksle tipik antikolinesteraz etkileri genellikle görülmez. [[K3 s. 203]] Aşırı duyarlılık ve çok nadiren şiddetli bradikardi görülebilir. [[K3 s. 204]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Bir yanda AChE’nin karbamillenmesiyle kavşakta kalan ACh’yi, diğer yanda rokuronyumu içine alan sugammadeks halkasını gösterin. [[K3 s. 199–200]] [[K3 s. 203]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Hangi etkileşim bloğun tekrarlamasına yol açabilir? Oral kontraseptif kullanan biriyle ne görüşürsünüz? [[K3 s. 204]]</div></div></section>
<section class="wrap blk ders-sec" id="a12d-ozet"><h2>Özet</h2><ul class="ozet">
<li>Edrofonyum ACh ile aktif bölge için yarışır ve ACh salınımını artırır. [[K3 s. 199–200]]</li>
<li>Karbamil grubu enzimin yeniden işlev kazanmasını geciktirir. [[K3 s. 200]]</li>
<li>Organofosforlar esteratik bölgeyi fosforiller, düzelme pratikte yeni enzim sentezine bağlıdır. [[K3 s. 202]]</li>
<li>Sugammadeks rokuronyum ve vekuronyumu seçici olarak bağlar. [[K3 s. 203]]</li>
<li>Sugammadeks dozunu seçerken rutin geri döndürmedeki uyarı yanıtını acil rokuronyum geri döndürmesinden ayırın. [[K3 s. 203–204]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="12d"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/12c">← 12c · Nondepolarizan kas gevşeticiler</a><a href="#/dersler/farmakoloji/13a">Sonraki: 13a · Adrenerjik fizyoloji ve doğal katekolaminler →</a></nav></section>`
};
