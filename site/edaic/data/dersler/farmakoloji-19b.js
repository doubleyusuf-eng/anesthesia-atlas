/* Farmakoloji · Bölüm 19 · Ders 19b: Antikolinerjikler, antihistaminikler ve diğer antiemetikler (K3 s. 300–305, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far19b-1'] = {
  no: 1, kok: 'Antikolinerjikler ve siklizin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 300–302]]',
  onermeler: [
    { t: 'Glikopirolat tersiyer amin yapısında olduğundan kan–beyin bariyerini kolayca geçer.', d: false, n: 'Yanlış. Glikopirolat yüklü bir kuaterner amindir ve kan–beyin bariyerini geçemediği için merkezi etkileri yoktur. [[K3 s. 300–301]]' },
    { t: 'Atropin ve hiyosin rasemik karışımlar olup yalnız l-izomerleri aktiftir.', d: true, n: 'Doğru. Yalnızca l-atropin ve l-hiyosin farmakolojik olarak aktiftir. [[K3 s. 300]]' },
    { t: 'Glikopirolatın oral biyoyararlanımı %5’in altındadır ve %80’i değişmeden idrarla atılır.', d: true, n: 'Doğru. Bağırsaktan emilimi ihmal edilebilir düzeydedir ve minimal metabolize edilir. [[K3 s. 301]]' },
    { t: 'Atropin alt özofagus sfinkterinin tonusunu artırarak reflü riskini azaltır.', d: false, n: 'Yanlış. Atropin alt özofagus sfinkter tonusunu azaltır; alt özofagus sfinkter tonusunu artıran siklizindir. [[K3 s. 301–302]]' },
    { t: 'Siklizinin parenteral preparatı pH 3,2’de laktik asitle hazırlandığından enjeksiyon ağrılı olabilir.', d: true, n: 'Doğru. Hem İM hem İV enjeksiyon özellikle ağrılı olabilir. [[K3 s. 302]]' },
  ],
};
VERI.sorular['far19b-2'] = {
  no: 2, kok: 'Ondansetron ve NK1 antagonistleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 302–303]]',
  onermeler: [
    { t: 'Ondansetron 5-HT₃ reseptörlerini hem periferik hem merkezi olarak antagonize eder.', d: true, n: 'Doğru. GİS enterokromafin kaynaklı periferik aktivasyonu ve VC’ye bağlanan vagal/merkezi 5-HT₃ iletimini bloke eder. [[K3 s. 303]]' },
    { t: 'Ondansetron hareket hastalığının ve dopamin agonistlerinin neden olduğu kusmada oldukça etkilidir.', d: false, n: 'Yanlış. Hareket hastalığının veya dopamin agonistlerinin neden olduğu kusmada etkisizdir. [[K3 s. 302]]' },
    { t: 'Ondansetron karaciğerde önemli ölçüde metabolize edildiğinden karaciğer yetmezliğinde doz azaltılmalıdır.', d: true, n: 'Doğru. Hidroksilasyon ve glukuronid konjugasyonuyla inaktif metabolitlere dönüşür; t½ 3 saattir. [[K3 s. 303]]' },
    { t: 'Fosaprepitant aprepitantın oral ön ilaç preparatıdır.', d: false, n: 'Yanlış. Aprepitant oral NK1 antagonisti, fosaprepitant ise onun intravenöz ön ilaç preparatıdır. [[K3 s. 303]]' },
    { t: 'Aprepitant ve fosaprepitant ondansetronun antiemetik etkisini azaltır.', d: false, n: 'Yanlış. Diğer antiemetiklerin (ondansetron ve deksametazon) etkilerini güçlendiriyor gibi görünürler. [[K3 s. 303]]' },
  ],
};
VERI.sorular['far19b-3'] = {
  no: 3, kok: 'Deksametazon, nabilon, lorazepam ve akupunktur', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 303–304]]',
  onermeler: [
    { t: 'Deksametazon başlamış olan postoperatif kusmanın acil tedavisinde ilk basamak ve çok etkilidir.', d: false, n: 'Yanlış. Deksametazon anestezinin başlangıcında PONV önlemede etkilidir; başlamış olan kusmada etkili değildir. [[K3 s. 303–304]]' },
    { t: 'Düşük doz deksametazon rejimlerinin (3,3 mg) daha yüksek dozlar kadar etkili olmadığı gösterilmiştir.', d: false, n: 'Yanlış. Düşük doz rejimleri (3,3 mg) daha yüksek dozlar kadar etkili görünmektedir. [[K3 s. 304]]' },
    { t: 'Tek seferlik düşük doz deksametazon kronik glukokortikoid kullanımının yaygın yan etkileriyle ilişkili değildir.', d: true, n: 'Doğru. Mekanizması prostaglandin antagonizması, endorfin salınımı veya GİS’te 5-HT salınımında azalmayı içerebilir. [[K3 s. 304]]' },
    { t: 'Lorazepam kemoterapi sırasında tekrarlayan dozlara bağlı beklenti bulantısını önleyebilir.', d: true, n: 'Doğru. Amnezik ve sedatif özellikleri yanında VC’ye olan merkezi bağlantıları değiştirebilir. [[K3 s. 304]]' },
    { t: 'PONV önlemede akupunktur uyanık hastada distal bilek kıvrımından yaklaşık 4 cm uzaklıkta uygulanmalıdır.', d: true, n: 'Doğru. Fleksör karpi radialis ve palmaris longus tendonları arasına uygulanır ve yan etkisi yoktur. [[K3 s. 304]]' },
  ],
};

const A19B_NAV = [
  ['antikolinerjik', 'Antikolinerjikler'], ['antihistaminik', 'Siklizin'],
  ['5ht3', 'Ondansetron'], ['nk1', 'Aprepitant'], ['diger', 'Diğer & Akupunktur'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/19b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 19 · Ders 19b', baslik: 'Antikolinerjikler, antihistaminikler ve diğer antiemetikler',
  lede: 'Kusma fizyolojisi ve dopamin antagonistlerinden sonra (bkz. <a href="#/dersler/farmakoloji/19a">19a</a>), antimuskarinikler, H₁ antagonisti siklizin, 5-HT₃ ve NK1 antagonistleri, deksametazon, nabilon, lorazepam ve akupunktur bu dersi oluşturur. [[K3 s. 300–304]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A19B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a19b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a19b-antikolinerjik">
  <h2>Antikolinerjikler: hiyosin, atropin ve glikopirolat</h2>
  <p class="intro">Normal dozlarda nikotinik aktivitesi çok az olan seçici muskarinik antagonistlerdir; doğal tersiyer aminler (atropin, hiyosin) kan–beyin bariyerini (KBB) geçerken yüklü kuaterner amin glikopirolat geçmez. [[K3 s. 300]]</p>
  <div class="viz"><div class="viz-head"><h3>Antikolinerjiklerde yapı, KBB geçişi ve etki profili</h3></div><div data-viz="a19b_antikol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Etki dereceleri Tablo 19.3’ten. [[K3 s. 300–301]]</p></div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Özellik</th><th>Hiyosin</th><th>Atropin</th><th>Glikopirolat</th></tr></thead>
    <tbody>
      <tr><td>Antiemetik potens</td><td>++</td><td>+</td><td>0</td></tr>
      <tr><td>Sedasyon / amnezi</td><td>+++</td><td>+</td><td>0</td></tr>
      <tr><td>Antisiyalogog etki</td><td>+++</td><td>+</td><td>++</td></tr>
      <tr><td>Midriyazis</td><td>+++</td><td>+</td><td>0</td></tr>
      <tr><td>Plasental geçiş</td><td>++</td><td>++</td><td>0</td></tr>
      <tr><td>Bronkodilatasyon</td><td>+</td><td>++</td><td>++</td></tr>
      <tr><td>Kalp hızı</td><td>+</td><td>+++</td><td>++</td></tr>
    </tbody>
  </table></div>
  <ul class="ozet" style="margin-top:14px">
    <li><b>Yapı ve izomerizm.</b> Atropin ve hiyosin tropik asit ile tropin/skopin esterleridir; rasemik karışım olup yalnız l-hiyosin ve l-atropin aktiftir. [[K3 s. 300]]</li>
    <li><b>Hiyosin.</b> İM opioidle premedikasyonda PONV’yi azaltır; sedatif ve amneziktir. Eksitasyon, ataksi, halüsinasyonlar, davranış anormallikleri ve uyuklamayla merkezi antikolinerjik sendrom yapabilir. Emilimi değişkendir, oral biyoyararlanımı %10–50’dir; transdermal uygulama düşük plazma düzeyine rağmen PONV ve hareket hastalığında etkilidir. Karaciğer esterazlarıyla yaygın metabolize edilir (küçük fraksiyon değişmeden idrarla), etki süresi atropinden kısadır. [[K3 s. 300]]</li>
    <li><b>Atropin.</b> Bradikardi, antisiyalogog ve antikolinesteraz yan etkilerini antagonize etmek için kullanılır; KVS etkileri nedeniyle PONV’de kullanılmaz. Hiyosinden az sedatiftir ve kitap ifadesiyle “merkezi kolinerjik kriz” olasılığı daha düşüktür. Küçük İV doz sonrası başlangıçta bradikardi yapabilir (vagal çekirdek veya kardiyak muskarinik parsiyel agonizm). [[K3 s. 301]] Hiyosinden daha belirgin bronkodilatasyon (ölü boşluk ↑), bronşiyal sekresyonlarda azalma, hiyosinden az etkili antisiyalogog etki, alt özofagus sfinkteri (AÖS) tonusunda düşüş, gastrik asit sekresyonunda küçük azalma, çocuklarda terleme inhibisyonuyla ateş ve topikalde göz içi basıncı artışı (glokomda kritik) yapar. Hızlı ama öngörülemez emilir, proteine %50 bağlanır, karaciğer esterazlarıyla yıkılıp yalnız çok küçük fraksiyonu değişmeden idrarla atılır. [[K3 s. 301]]</li>
    <li><b>Glikopirolat.</b> Antisiyalogog premedikasyon, bradikardi ve antikolinesteraz koruması için endikedir. Yüklü kuaterner yapısı nedeniyle oral biyoyararlanımı &lt;%5’tir, KBB’yi geçmez, minimal metabolize edilip %80 değişmeden idrarla atılır. [[K3 s. 301]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap atropin altında “merkezi kolinerjik kriz” ifadesini kullanır; atropin antimuskarinik bir ajan olduğundan doğru terim “merkezi antikolinerjik sendrom”dur.</div>
</section>

<section class="wrap blk ders-sec" id="a19b-antihistaminik">
  <h2>Antihistaminikler: siklizin</h2>
  <p class="intro">Piperazin türevi bir H₁ antagonisti olan siklizin, antiemetik etkisine önemli katkı yapabilen antikolinerjik özelliklere de sahiptir. [[K3 s. 302]]</p>
  <div class="viz"><div class="viz-head"><h3>Siklizinin etki mekanizması, AÖS ve preparat özellikleri</h3></div><div data-viz="a19b_siklizin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">pH ve biyoyararlanım kitaptan. [[K3 s. 302]]</p></div>
  <ul class="ozet">
    <li><b>Sunum ve kullanım.</b> Parenteral preparat pH 3,2’de laktik asitle hazırlanır; İM ve İV enjeksiyon özellikle ağrılı olabilir. Hareket hastalığı, radyoterapi, PONV, opioid kusması ve Ménière hastalığında kullanılır. [[K3 s. 302]]</li>
    <li><b>Etkiler ve kinetik.</b> Alt özofagus sfinkter tonusunu artırır; İV sonrası hafif kalp hızı artışı olabilir, EPS ve sedasyon nadiren komplike eder. Oral emilimi iyi olup oral biyoyararlanımı ~%75’tir; kinetiğinin geri kalanına ilişkin şaşırtıcı derecede az bilgi vardır. [[K3 s. 302]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a19b-5ht3">
  <h2>5-HT₃ antagonistleri: ondansetron</h2>
  <p class="intro">Karbazol yapısındaki ondansetron, 5-HT₃ reseptörlerini hem periferik hem merkezi olarak antagonize eder. [[K3 s. 302–303]]</p>
  <div class="viz"><div class="viz-head"><h3>Ondansetronun periferik ve merkezi 5-HT₃ blokajı</h3></div><div data-viz="a19b_5ht3"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Reseptör yolu ve zamanlama kitaptan. [[K3 s. 302–303]]</p></div>
  <ul class="ozet">
    <li><b>Sunum ve kullanım.</b> Tablet (4–8 mg), dilde çözünen çilek aromalı liyofilizat (4–8 mg), supozituvar (16 mg) ve yavaş İV için 2 mg/mL berrak çözelti halinde bulunur. Kemoterapi/radyoterapi ve perioperatif bulantı-kusmada endikedir; hareket hastalığı ve dopamin agonisti kusmasında etkisizdir. &gt;2 yaş çocukta ruhsatlıdır ve anesteziden uyanmadan hemen önce kullanılmalıdır. [[K3 s. 302]]</li>
    <li><b>Etkiler ve kinetik.</b> İyi tolere edilir; baş ağrısı, kızarma, kabızlık ve hızlı İV sonrası bradikardi yapabilir. GİS’ten iyi emilir (~%60 biyoyararlanım), proteine %75 bağlanır; hidroksilasyon ve glukuronid konjugasyonuyla inaktif metabolitlere dönüşür (t½ 3 saat). Karaciğer bozukluğunda doz azaltılmalıdır. [[K3 s. 303]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a19b-nk1">
  <h2>Nörokinin 1 antagonistleri: aprepitant ve fosaprepitant</h2>
  <p class="intro">NK1 antagonistleri dorsal vagal kompleksin beyin sapı çekirdeklerinde P maddesinin etkilerini bloke eder ve özellikle kemoterapiye bağlı gecikmiş bulantı-kusmada (CINV) yararlı görünür. [[K3 s. 303]]</p>
  <div class="viz"><div class="viz-head"><h3>Aprepitant ve fosaprepitant karşılaştırması</h3></div><div data-viz="a19b_nk1"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Mekanizma ve kinetik sayılar kitaptan. [[K3 s. 303]]</p></div>
  <ul class="ozet">
    <li><b>Kullanım ve kinetik.</b> Oral aprepitant ve İV ön ilaç fosaprepitant, CINV ve PONV’de kullanılır; ondansetron ve deksametazonun etkilerini güçlendiriyor görünürler. Oral biyoyararlanım ~%60, proteine bağlanma %97’dir; CYP3A4 ile idrar ve dışkıyla atılan zayıf aktiviteli metabolitlere dönüşür. [[K3 s. 303]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a19b-diger">
  <h2>Diğer antiemetikler ve akupunktur</h2>
  <p class="intro">Deksametazon, nabilon, lorazepam ve akupunktur farklı zamanlama ve etki mekanizmalarıyla antiemetik profilaksi veya tedavide yer alır. [[K3 s. 303–304]]</p>
  <div class="viz"><div class="viz-head"><h3>Antiemetiklerde uygulama yeri ve zamanlaması</h3></div><div data-viz="a19b_zamanlama"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Doz, konum ve zamanlama kitaptan. [[K3 s. 302–304]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag clin">Deksametazon (steroid)</span><ul class="ozet" style="margin-top:8px">
      <li>Sentetik glukokortikoiddir; anestezi başlangıcında PONV önlemede yerleşik rolü vardır, başlamış kusmada etkili değildir. Düşük doz rejimleri (3,3 mg) yüksek dozlar kadar etkili görünür. [[K3 s. 303–304]]</li>
      <li>Mekanizması tam bilinmese de prostaglandin antagonizması, endorfin salınımı (duygu durum/iştah artışı) ve antiinflamatuvar etkiyle GİS 5-HT salınımını azaltmayı içerebilir. Tek düşük doz, kronik glukokortikoid yan etkileriyle ilişkili değildir. [[K3 s. 304]]</li>
    </ul></div>
    <div class="card"><span class="tag basic">Nabilon, lorazepam ve akupunktur</span><ul class="ozet" style="margin-top:8px">
      <li><b>Kannabinoid (nabilon).</b> Kusma merkezinde etki gösterir ve kemoterapiden sonra antiemetik olarak kullanılmıştır. [[K3 s. 304]]</li>
      <li><b>Benzodiazepin (lorazepam).</b> Amnezik ve sedatiftir; kemoterapide VC’ye merkezi bağlantıları değiştirebilir ve beklenti bulantısını önleyebilir. [[K3 s. 304]]</li>
      <li><b>Akupunktur.</b> PONV önlemede etkilidir; distal el bileği deri kıvrımından ~4 cm uzaklıkta, fleksör karpi radialis ve palmaris longus tendonları arasına uyanık hastada uygulanır ve yan etkisi yoktur. [[K3 s. 304]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a19b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far19b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far19b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far19b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a19b-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>PONV riski yüksek bir hastada antimuskarinikler, siklizin, ondansetron ve deksametazon seçeneklerini değerlendiriyorsunuz. Tersiyer ve kuaterner antikolinerjikler arasındaki temel farkları, siklizinin alt özofagus sfinkterine etkisini ve ondansetron ile deksametazonun etki/zamanlama farklarını anlatın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Tersiyer aminler (atropin, hiyosin) KBB’yi geçip merkezi antikolinerjik sendrom yapabilir; yüklü kuaterner glikopirolat KBB’yi geçmez ve antiemetik değildir (%80 değişmeden idrarla). [[K3 s. 300–301]]</li>
    <li>Hiyosin güçlü antiemetik/sedatif/antisiyalogog iken, atropin bradikardi için kullanılır, KVS etkileri nedeniyle PONV’de verilmez ve AÖS tonusunu azaltır. [[K3 s. 300–301]]</li>
    <li>Siklizin (H₁ + antikolinerjik) AÖS tonusunu artırır, oral biyoyararlanımı ~%75’tir ve pH 3,2 laktik asitli parenteral formu enjeksiyonda ağrılı olabilir. [[K3 s. 302]]</li>
    <li>Ondansetron periferik ve merkezi 5-HT₃ blokajı yapar; uyanmadan hemen önce verilir (t½ 3 sa, KC yetmezliğinde doz ↓), hareket hastalığında etkisizdir. [[K3 s. 302–303]]</li>
    <li>Deksametazon (düşük doz 3,3 mg) anestezi başlangıcında PONV önlemede etkilidir ancak başlamış kusmada etkisizdir; mekanizması belirsizdir (prostaglandin antagonizması, endorfin salınımı, GİS’te 5-HT salınımında azalma olabilir). [[K3 s. 303–304]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Enterokromafin hücreden salınan 5-HT’nin periferik 5-HT₃, vagal aferent ve merkezi 5-HT₃/VC yolunu gösteren şemayı ve yanında tersiyer vs kuaterner aminlerin KBB geçişini çizin. [[K3 s. 300–301]] [[K3 s. 303]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Aprepitant ile fosaprepitant arasındaki fark nedir? PONV akupunktur noktası anatomik olarak nerededir ve ne zaman uygulanır? [[K3 s. 303–304]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a19b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Atropin ve hiyosin KBB’yi geçer (l-izomerleri aktif); yüklü kuaterner glikopirolat KBB’yi geçmez ve %80 değişmeden idrarla atılır. [[K3 s. 300–301]]</li>
    <li>Siklizin (H₁ + antikolinerjik) AÖS tonusunu artırır; pH 3,2 parenteral çözeltisi ağrılı olabilir. [[K3 s. 302]]</li>
    <li>Ondansetron periferik/merkezi 5-HT₃ antagonisti olup uyanmadan hemen önce verilir ve hareket hastalığında etkisizdir. [[K3 s. 302–303]]</li>
    <li>Aprepitant (oral) ve fosaprepitant (İV ön ilaç) dorsal vagal komplekste NK1/P maddesini bloke eder. [[K3 s. 303]]</li>
    <li>Deksametazon (3,3 mg) indüksiyonda PONV önler (başlamışta etkisiz); akupunktur uyanık hastada distal bilek kıvrımından ~4 cm uzaklıkta uygulanır. [[K3 s. 303–304]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="19b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/19a">← 19a · Bulantı-kusma fizyolojisi ve dopamin antagonistleri</a><a href="#/dersler/farmakoloji/20">Sonraki: 20 · Bağırsak üzerine etkili ilaçlar →</a></nav>
</section>`,
};
