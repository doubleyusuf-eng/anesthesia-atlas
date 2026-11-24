VERI.sorular = VERI.sorular || {};
VERI.sorular['far08a-1'] = {
  no: 1, kagit: 'Paper A · Farmakoloji', kok: 'Biyolojik yapı taşları', kaynak: '[[K3 s. 90–91]]',
  onermeler: [
    { t: 'GABA bir α-amino asittir.', d: false, n: 'GABA’da amin ve karboksil, bütil iskeletinin karşıt uçlarındadır. [[K3 s. 90]]' },
    { t: 'Glutamat santral nörotransmitter olarak görev yapar.', d: true, n: 'Glutamat ve glisin santral sinir sisteminde doğrudan haberci olarak işlev görür. [[K3 s. 90]]' },
    { t: 'Guanozin bir nükleotiddir.', d: false, n: 'Guanozin bir nükleoziddir ve fosfat eklenince nükleotid oluşur. [[K3 s. 90]]' },
    { t: 'Riboz bir pentozdur.', d: true, n: 'Riboz için (CH₂O)ₙ formülünde n değeri 5’tir. [[K3 s. 91]]' },
    { t: 'Urasil bir pürindir.', d: false, n: 'Urasil pirimidinler arasında yer alır. [[K3 s. 90]]' },
  ],
};
VERI.sorular['far08a-2'] = {
  no: 2, kagit: 'Paper A · Farmakoloji', kok: 'Katekolaminler, barbitüratlar ve benzodiazepinler', kaynak: '[[K3 s. 91–93]]',
  onermeler: [
    { t: 'Katekolaminin β-karbonu doğrudan katekol halkasına bağlıdır.', d: true, n: 'Etilamin zincirinde β-karbon halkaya, α-karbon amin grubuna komşudur. [[K3 s. 91]]' },
    { t: 'Sekonder amin olan adrenalin MAO substratı olabilir.', d: true, n: 'MAO primer aminleri tercih etse de adrenalini de metabolize eder. [[K3 s. 91–92]]' },
    { t: 'Pentobarbiton, kısa etkili bir tiyobarbitürattır.', d: false, n: 'Pentobarbiton oksijen taşır ve orta etkilidir. [[K3 s. 92]]' },
    { t: 'Midazolam plazmaya ulaştığında halka kapanır.', d: true, n: 'Kapalı halka biçimi yağda daha iyi çözünür. [[K3 s. 93]]' },
    { t: 'Klobazam bir 1,4-benzodiazepindir.', d: false, n: 'Klobazam 1,5-benzodiazepin grubundadır. [[K3 s. 93]]' },
  ],
};
VERI.sorular['far08a-3'] = {
  no: 3, kagit: 'Paper A · Farmakoloji', kok: 'Kas gevşeticiler ve opioidlerde yapı–etki ilişkisi', kaynak: '[[K3 s. 93–95]]',
  onermeler: [
    { t: 'Atrakuryum ve mivakuryumun ester bağları aynı yönde uzanır.', d: false, n: 'Esterlerin yönelimi iki ilaçta birbirinin tersidir. [[K3 s. 93]]' },
    { t: 'Pankuronyum biskuaterner yapıdadır.', d: true, n: 'Pankuronyum iki kuaterner azot taşır. [[K3 s. 94]]' },
    { t: 'Morfinin 6-glukuronid metaboliti aktiftir.', d: true, n: '6-glukuronid aktivitesini korur, 3-glukuronid ise inaktiftir. [[K3 s. 94]]' },
    { t: 'Kodeinde 3 konumundaki metillenme yağda çözünürlüğü artırır.', d: true, n: 'Bu değişiklik kodeinin yağda çözünürlüğünü artırırken aktivitesini azaltır. [[K3 s. 95]]' },
    { t: 'Morfinin amin grubundaki değişiklik antagonist bir türev verebilir.', d: true, n: 'Reseptör bağlanmasında rol alan amindeki sübstitüsyona nalokson örnektir. [[K3 s. 95]]' },
  ],
};

const A08A_NAV = [
  ['tasarim', 'İlaç tasarımı'], ['taslar', 'Yapı taşları'], ['katekol', 'Katekolaminler'],
  ['barbiturat', 'Barbitüratlar'], ['bdz', 'Benzodiazepinler'], ['gevsetici', 'Kas gevşeticiler'],
  ['opioid', 'Opioidler'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];
SAYFALAR['dersler/farmakoloji/08a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 8 · Ders 08a', baslik: 'Kimyasal yapılar ve ilaç sınıfları',
  lede: 'Yapı–etki ilişkisi (SAR), akraba ilaçların yapılarındaki farkların davranışlarına nasıl yansıdığını açıklar. [[K3 s. 89]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A08A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a08a-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a08a-tasarim">
  <h2>Öncü bileşikten ilaca</h2>
  <p class="intro">Bir türevi ana ilaçla karşılaştırırken eklenen grubun hem hedefteki etkiyi hem de vücuttaki davranışı nasıl değiştirebileceğini düşünün. [[K3 s. 89]]</p>
  <div class="viz a08a-sekiller"><div class="viz-head"><h3>İlaç tasarımında ne seçilir?</h3></div><div data-viz="a08a_tasarim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 89]]</p></div>
  <p>Yapısal gruplar bir türevin agonist veya antagonist davranışını öngörmeye yardım eder. [[K3 s. 89]] Yağda ve suda çözünürlük, pKₐ ve zayıf asit ya da baz niteliği de farmakokinetiği anlamak için ipucudur. [[K3 s. 89]]</p>
  <ul class="ozet"><li><b>Karbon iskeleti.</b> Organik kimya karbon bileşiklerini inceler. [[K3 s. 89]] Grup IV’teki karbon, periyodik tablonun iki ucundaki elementlerle de kovalent bağ kurabilir. [[K3 s. 89]]</li>
  <li><b>Suyla etkileşim.</b> İnorganik kimyada iyonik bağlar yaygındır. [[K3 s. 89]] Kitap, kovalent bağları daha güçlü olarak niteler ve suyla etkileşimin zayıflığını birçok organik molekülün suda çözünmemesiyle ilişkilendirir. [[K3 s. 89]] Hidroksil (–OH) veya amin (–NH₂) eklenmesi suda çözünmeyi sağlayabilir. [[K3 s. 89]]</li>
  <li><b>Fizyolojik hedef.</b> DNA, yapısal proteinler ve kimyasal haberciler organik moleküllerdir. [[K3 s. 89]] Bu yapılar ve sinyal sistemleri, ilaçların fizyolojik süreçleri moleküler düzeyde nasıl değiştirdiğini anlamaya yardım eder. [[K3 s. 89]]</li></ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap suda çözünmezliği kovalent bağların gücüne bağlar. Asıl belirleyici, molekülün apolar olması ve suyla hidrojen bağı kuramamasıdır.</div>
</section>

<section class="wrap blk ders-sec" id="a08a-taslar">
  <h2>Amino asit, nükleotid ve şeker</h2>
  <p class="intro">Bir yapı taşını tanırken hangi grupları taşıdığına ve bunların iskeletin neresine bağlandığına bakın. [[K3 s. 90–91]]</p>
  <div class="viz a08a-sekiller"><div class="viz-head"><h3>Bazdan DNA ve RNA’nın yapı taşına</h3></div><div data-viz="a08a_nukleotid"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 90]]</p></div>
  <ul class="ozet">
  <li><b>Amino asit.</b> α-amino asitte hidrokarbon iskeletinin uçtaki α-karbonu amin ve karboksil gruplarını birlikte taşır. [[K3 s. 90]] Kitap, protein sentezine katılan 20 yaygın α-amino asitten beşini sentezlenemeyen, esansiyel amino asit olarak sayar. [[K3 s. 90]]</li>
  <li><b>Haberci veya öncü.</b> Her amino asit peptit ya da proteine katılmaz. [[K3 s. 90]] Fenilalanin tirozine dönüşebilir ve tirozin adrenerjik nörona girerek katekolamin sentezine katılır. [[K3 s. 90]] Glisin ve glutamat doğrudan santral nörotransmitterdir. [[K3 s. 90]] İnhibitör haberci GABA (γ-aminobütirik asit) α değil γ-amino asittir: bütil iskeletinin karşıt uçlarında amin ve karboksil taşır. [[K3 s. 90]]</li>
  <li><b>Baz ve fosfat.</b> Pürinler adenin ve guanin, pirimidinler sitozin, urasil ve timindir. [[K3 s. 90]] Nükleozidler önemli metabolik ara ürünlerdir ve yüksek enerjili fosfatlarla birleştiklerinde hücre içi metabolik ve katabolik süreçlerde kofaktör işlevi görebilirler. [[K3 s. 90]] Birçok antikanser ilaç nükleik asit veya nükleotid analoğudur. [[K3 s. 90]]</li></ul>
  <div class="cols"><div class="note plain"><b>Atlas notu.</b> Kitap beş esansiyel amino asit sayar. İnsan beslenmesinde kabul edilen sayı dokuzdur.</div>
  <div class="note plain"><b>Atlas notu.</b> Kitap, nükleozidin şekere bağlanan bileşenine “nükleik asit” der. Bu bileşen azotlu bazdır.</div></div>
  <p><b>Şekerler.</b> Bu doğal karbonhidratların genel formülü (CH₂O)ₙ’dir. [[K3 s. 91]]</p>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>n</th><th>Şeker sınıfı</th><th>Kitaptaki örnek</th></tr></thead><tbody>
  <tr><td>3</td><td>Trioz</td><td>Gliseraldehit [[K3 s. 91]]</td></tr><tr><td>4</td><td>Tetroz</td><td>— [[K3 s. 91]]</td></tr>
  <tr><td>5</td><td>Pentoz</td><td>Riboz [[K3 s. 91]]</td></tr><tr><td>6</td><td>Heksoz</td><td>Glukoz [[K3 s. 91]]</td></tr>
  </tbody></table></div><p>Pentozlar ve heksozlar vücutta halkalı biçimde bulunur. [[K3 s. 91]] Dokudaki oksidatif solunum glukozu karbondioksit ve suya dönüştürür. [[K3 s. 91]]</p>
</section>

<section class="wrap blk ders-sec" id="a08a-katekol">
  <h2>Katekolaminlerde halka ve yan zincir</h2>
  <p class="intro">Katekolamin sentezinde tirozin hidroksillenir (–OH eklenir) ve dekarboksillenir (–COOH uzaklaşır). [[K3 s. 91]]</p>
  <div class="viz a08a-sekiller"><div class="viz-head"><h3>Halka mı, amin ucu mu?</h3></div><div data-viz="a08a_katekol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 91–92]]</p></div>
  <p>İki karbonlu etilamin zincirini amin ucundan okuyun. [[K3 s. 91]] α-karbon amine, β-karbon katekol halkasına kovalent bağla bağlıdır. [[K3 s. 91]]</p>
  <ul class="ozet"><li><b>Reseptör seçimi.</b> Terminal amin ve α-karbondaki grupların boyutu ve niteliği, α/β-adrenoseptör seçimini ve agonist/antagonist davranışı belirler. [[K3 s. 91]]</li>
  <li><b>Metabolizma.</b> Katekol-O-metiltransferaz (COMT) yalnız katekol yapısını tanır, dolayısıyla bu yapıyı taşımayan türevler daha uzun etkili olabilir. [[K3 s. 91]] Monoamin oksidaz (MAO) yalnız tek amin grubu taşıyan ilaçları, tercihen primer aminleri yıkar; sekonder amin olan adrenalin de substrattır. [[K3 s. 91–92]]</li></ul>
  <p>İlaçların birçoğu organik moleküldür ve sıklıkla bitkilerden elde edilir. [[K3 s. 91]] Buradaki seçilmiş iskeletleri Kısım II–IV’teki ilaç etkileriyle birlikte değerlendirin. [[K3 s. 89]]</p>
</section>

<section class="wrap blk ders-sec" id="a08a-barbiturat">
  <h2>Barbitüratlarda hangi grup değişir?</h2>
  <p class="intro">Malonik asit ile ürenin kondenzasyonu sırasında su ve barbitüratların ana bileşiği olan barbitürik asit oluşur. [[K3 s. 92]]</p>
  <div class="viz a08a-sekiller"><div class="viz-head"><h3>Üç barbitüratın etki süreleri</h3></div><div data-viz="a08a_barbiturat"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 92]]</p></div>
  <p>Barbitüratlar zayıf asittir, ancak imino grupları da taşır. [[K3 s. 92]] Etki süresini karşılaştırırken 5. karbona bağlı hidrokarbon gruplarının türüne bakın. [[K3 s. 92]]</p>
  <ul class="ozet"><li><b>Keto veya tiyo.</b> Oksibarbitüratın =O grubu tiyobarbitüratta yerini =S grubuna bırakır. [[K3 s. 92]]</li>
  <li><b>Karaciğer.</b> Oksibarbitürat, karşılık gelen tiyobarbitürattan daha az hepatik metabolizmaya uğrar. [[K3 s. 92]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a08a-bdz">
  <h2>Benzodiazepinlerde halka ve çözünürlük</h2>
  <p class="intro">Benzodiazepinler altı ve yedi üyeli halkalar taşıyan heterosiklik bileşiklerdir, bazılarında ayrıca beş üyeli bir halka bulunur. [[K3 s. 93]]</p>
  <div class="viz a08a-sekiller"><div class="viz-head"><h3>Midazolam ampulden plazmaya geçtiğinde</h3></div><div data-viz="a08a_midazolam"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 93]]</p></div>
  <p>Karbon içeren halkalar benzodiazepinlerin suda çözünmesini güçleştirir. [[K3 s. 93]] Hidrokarbon gruplarında ve pH’ta değişiklik, yedi üyeli halkanın açık olduğu başka bir tautomerik biçime olanak verir. [[K3 s. 93]]</p>
  <ul class="ozet">
  <li><b>1,4-benzodiazepinler.</b> Diazepam, temazepam ve lorazepam bu gruptadır. [[K3 s. 93]] İntravenöz diazepam için özel bir lipit emülsiyonu (Diazemuls) gerekir. [[K3 s. 93]] Diazepamın metabolitleri arasında oksazepam ve temazepam bulunur. [[K3 s. 93]]</li>
  <li><b>Heterosiklik alt grup.</b> Midazolam ampulde suda çözünür, plazmada halka kapanınca yağda daha iyi çözünür. [[K3 s. 93]]</li>
  <li><b>1,5-benzodiazepinler.</b> Bu grubun örneği klobazamdır. [[K3 s. 93]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a08a-gevsetici">
  <h2>Nondepolarizan kas gevşeticiler</h2>
  <p class="intro">Bu ilaçlar iskeletlerine göre bis-benzilizokinolinyumlar ve aminosteroidler olarak ayrılır. [[K3 s. 93–94]]</p>
  <div class="viz a08a-sekiller"><div class="viz-head"><h3>Ester yönelimi ve Hofmann yıkımı</h3></div><div data-viz="a08a_ester"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 93]]</p></div>
  <h3>Bis-benzilizokinolinyum iskeleti</h3>
  <p>Doğal tübokürarinin yapısına dayanan bu iskelette iki izokinolinyum birimini iki ester bağı taşıyan bir karbon zinciri birleştirir. [[K3 s. 93]] İzokinolinyum yapısı düz kas gevşeticisi papaverinle ilişkilidir. [[K3 s. 93]]</p>
  <ul class="ozet"><li><b>Yük ve sunum.</b> Her iki birimde de kuaterner azot bulunduğundan yük kalıcıdır ve ilaçlar tuz biçiminde sunulur. [[K3 s. 93]] Çok sayıda izomerin aktiviteleri farklıdır. [[K3 s. 93]]</li>
  <li><b>Atrakuryum.</b> Heterosiklik halkalar hacimlidir ve kuaterner azotlar arasında yaklaşık 1 nm bulunur. [[K3 s. 93]]</li></ul>
  <h3>Aminosteroid iskeleti</h3>
  <p>Çok halkalı hidrokarbon çekirdeğinin görece rijitliği, steroidi birçok ilaç için elverişli bir iskelet yapar. [[K3 s. 94]] Aminosteroid kas gevşeticiler, intravenöz althesin ve kortikosteroid hormonlar bu çekirdeği paylaşır. [[K3 s. 94]]</p>
  <ul class="ozet"><li><b>Konum.</b> Karbon numaraları metabolitleri ve sübstitüsyonları tanımaya yardım eder. [[K3 s. 94]] Azotlar arası uzaklık ve 3 ile 17 konumlarına ester bağıyla tutunan asetil grupları önemlidir. [[K3 s. 94]]</li>
  
  <li><b>Sunum.</b> Steroid çekirdeğinin suda kolay çözünmesi için hidrofilik sübstitüsyon gerekir ve ailede suda güç çözünen ilaçlar vardır. [[K3 s. 94]] Vekuronyum stabilite için liyofilize sunulur: hızla dondurulan ürün yüksek vakum altında kurutulur. [[K3 s. 94]]</li></ul>
  <div class="tbl-wrap"><table class="tbl a08a-tablo"><thead><tr><th>İlaç</th><th>Azotların durumu</th></tr></thead><tbody>
  <tr><td>Pankuronyum</td><td>İki kuaterner azot taşır (biskuaterner). [[K3 s. 94]]</td></tr>
  <tr><td>Vekuronyum ve roküronyum</td><td>Tek kuaterner azot taşırlar (monokuaterner). [[K3 s. 94]] 2 konumundaki azot pH 7,4’te protonlanır. [[K3 s. 94]]</td></tr></tbody></table></div>
</section>

<section class="wrap blk ders-sec" id="a08a-opioid">
  <h2>Opioidlerde değişikliğin yeri</h2>
  <p class="intro">Ana bileşik morfinin karmaşık halkalı yapısında, 3 konumundaki fenolik –OH morfin benzeri aktivite için zorunludur, 6 konumundaki sikloheksanol –OH ise zorunlu değildir. [[K3 s. 94]]</p>
  <div class="viz a08a-sekiller"><div class="viz-head"><h3>Morfinde iki hidroksil, iki farklı sonuç</h3></div><div data-viz="a08a_morfin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 94]]</p></div>
  <p>Morfin benzeri ilaçlarda fenolik halkanın özel önemini, aynı değişikliğin hangi konumda yapıldığına bakarak görebilirsiniz. [[K3 s. 94–95]]</p>
  <ul class="ozet"><li><b>Diamorfin.</b> Hem 3 hem 6 konumunda asetilasyon bu ön ilacı oluşturur. [[K3 s. 94–95]] Yağda çözünürlük artar, etki daha hızlı başlar ve aktivite için yalnız 3 konumunda deasetilasyon gerekir. [[K3 s. 95]]</li>
  <li><b>Kodein ve 6-keto türevleri.</b> Kodeinde 3 konumundaki –OH metillendiği için yağda çözünürlük artar ancak aktivite azalır. [[K3 s. 95]] 6-keto türevlerinde aktivite artar. [[K3 s. 95]]</li>
  <li><b>Amin ve halkalar.</b> Amin grubu reseptöre bağlanmak için gereklidir ve buradaki sübstitüsyon nalokson gibi antagonistler verebilir. [[K3 s. 95]] Aktivite için bütün halkalar gerekmez, en önemlisi fenolik halkadır. [[K3 s. 95]] Çeşitli halkaların kaybına fentanil ve türevleri örnektir. [[K3 s. 95]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a08a-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin ve gerekçenizi açıklamayla karşılaştırın.</p>
<div class="viz"><div data-viz="mtf" data-q="far08a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far08a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far08a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a08a-p2"><h2>Part II · SOE 2 (farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Morfinin 3 ve 6 konumlarını karşılaştırın. Bu iki konum diamorfinin, kodeinin ve morfin glukuronidlerinin özelliklerini nasıl açıklar?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>3 konumunda fenolik –OH, 6 konumunda sikloheksanol –OH bulunur. [[K3 s. 94]]</li>
<li>Morfin benzeri aktivite için 3 konumundaki fenolik –OH gerekir. [[K3 s. 94]]</li>
<li>3-glukuronid inaktifken 6-glukuronid aktiftir. [[K3 s. 94]]</li>
<li>Her iki konumu asetillenmiş diamorfin daha lipofiliktir ve etkisi daha hızlı başlar. [[K3 s. 94–95]] Aktivite için 3 konumundaki asetilin ayrılması gerekir. [[K3 s. 95]]</li>
<li>Kodeinde 3 konumundaki metillenme yağda çözünürlüğü artırır, aktiviteyi azaltır. [[K3 s. 95]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Morfinden 3 ve 6 konumlarına iki dal çıkarın. Glukuronidlerin aktivitelerini ve kodeindeki metil grubunun yerini işaretleyin. [[K3 s. 94–95]] Diamorfindeki iki asetili ekleyip aktivite için ayrılması gerekeni daire içine alın. [[K3 s. 94–95]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Amin grubundaki değişim reseptör etkisini nasıl değiştirebilir? [[K3 s. 95]] Midazolamın ampul ve plazmadaki biçimleri nasıl ayrılır? [[K3 s. 93]]</div></div></section>
<section class="wrap blk ders-sec" id="a08a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Bir fonksiyonel grup hedef seçimini, çözünürlüğü veya her ikisini değiştirebilir. [[K3 s. 89]]</li>
<li>Nükleozide fosfat eklenince nükleotid oluşur. [[K3 s. 90]]</li>
<li>COMT için komşu iki halka hidroksili gerekir, MAO için amin yapısı önemlidir. [[K3 s. 91–92]]</li>
<li>Barbitüratın etki süresinde 5. karbondaki gruplar belirleyicidir. [[K3 s. 92]]</li>
<li>Midazolamın açık ve kapalı halka biçimleri farklı ortamlarda çözünür. [[K3 s. 93]]</li>
<li>Esterlerin yönelimi Hofmann yıkımının atrakuryumda görülüp mivakuryumda görülmemesini açıklar. [[K3 s. 93]]</li>
<li>Morfinin 3 ve 6 konumlarında glukuronidasyon farklı aktivitelerde metabolitler verir. [[K3 s. 94]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="08a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/07b">← 07b · Hedef kontrollü infüzyon ve bağlama duyarlı yarılanma süresi</a><a href="#/dersler/farmakoloji/08b">Sonraki: 08b · Medisinal kimya mini sözlüğü →</a></nav></section>`,
};
