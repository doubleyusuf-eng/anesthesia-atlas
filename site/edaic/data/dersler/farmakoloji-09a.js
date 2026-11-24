VERI.sorular = VERI.sorular || {};
VERI.sorular['far09a-1'] = {
  no: 1, kok: 'Anatomik hedefler ve lipit kuramları', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 105–106]]',
  onermeler: [
    { t: 'Uyarılmış potansiyel verileri birincil hedef olarak limbik sistemi öne çıkarır.', d: false, n: 'Verilerin işaret ettiği en olası birincil hedef talamustur. [[K3 s. 105]]' },
    { t: 'Ketamin lipitte çözünürlük ile potens arasındaki korelasyondan belirgin biçimde sapar.', d: true, n: 'Ketaminin bu özelliği, bütün ajanları lipit etkileşimiyle açıklamayı güçleştirir. [[K3 s. 105]]' },
    { t: 'Pertürbasyon kuramı belirli kanalları çevreleyen lipitlerde bozulma öngörür.', d: true, n: 'Kuram, özgül kanallarla ilişkili ve bileşimi çift tabakadan farklı olan anüler lipitlerde bozulma öne sürer. [[K3 s. 106]]' },
    { t: 'Sıcaklığın 1 °C artması membranı kalınlaştırarak anesteziyi güçlendirir.', d: false, n: 'Benzer kalınlaşmaya karşın sıcaklık artışının anestezi üzerindeki etkisi ters yöndedir. [[K3 s. 106]]' },
    { t: 'S-etomidatın klinik etkisizliği lipitte R-etomidattan daha az çözünmesiyle açıklanır.', d: false, n: 'İki izomerin lipitte çözünürlüğü aynıdır. [[K3 s. 105]]' },
  ],
};
VERI.sorular['far09a-2'] = {
  no: 2, kok: 'GABAₐ reseptörü ve glisin kanalı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 106–108]]',
  onermeler: [
    { t: 'GABAₐ reseptöründe GABA için iki agonist bölgesi bulunur.', d: true, n: 'Kanal kompleksinde GABA iki bölgeye bağlanabilir. [[K3 s. 108]]' },
    { t: 'Benzodiazepinlerin modülatör bölgesi β alt birimidir.', d: false, n: 'Benzodiazepin bölgesi α/γ arayüzündedir. [[K3 s. 106]]' },
    { t: 'Etomidata duyarlılık β2 ve β3 alt birimlerinde β1’e göre daha yüksektir.', d: true, n: 'Alt birim bileşimi değiştiğinde etomidata duyarlılık da değişir ve β1 daha az duyarlıdır. [[K3 s. 107]]' },
    { t: 'Propofol glisin kanalının açık kalma süresini uzatır.', d: true, n: 'Bu ek etki propofolü GABAₐ için seçici olan etomidattan ayırır. [[K3 s. 107]]' },
    { t: 'Volatil anesteziklerin glisin üzerindeki etkisinde stereoseçicilik gösterilmiştir.', d: false, n: 'Volatil ajanlar glisinin etkisini güçlendirir ancak stereoseçicilik için kanıt yoktur. [[K3 s. 107]]' },
  ],
};
VERI.sorular['far09a-3'] = {
  no: 3, kok: 'Eksitatör iletim ve ajanların reseptör profilleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 107–108]]',
  onermeler: [
    { t: 'Ketamin NMDA reseptörünü kompetitif olarak inhibe eder.', d: false, n: 'Ketaminin NMDA inhibisyonu nonkompetitiftir. [[K3 s. 108]]' },
    { t: 'Magnezyum NMDA reseptörünü modüle eder.', d: true, n: 'Reseptörü glutamat aktive ederken magnezyum yanıtı modüle eder. [[K3 s. 108]]' },
    { t: 'Ksenon ve nitröz oksit NMDA üzerinden eksitatör iletimi azaltır.', d: true, n: 'Her iki ajan da NMDA reseptörünü nonkompetitif biçimde inhibe eder. [[K3 s. 108]]' },
    { t: 'İzofluran santral nikotinik asetilkolin reseptöründe iletimi azaltır.', d: true, n: 'İzofluranın nöronal nikotinik etkisi inhibitördür. [[K3 s. 107]]' },
    { t: 'Propofol 5-HT₃ reseptöründe inhibitördür.', d: true, n: 'Propofol hem nöronal nikotinik reseptörde hem de 5-HT₃ reseptöründe inhibisyon yapar. [[K3 s. 107]]' },
  ],
};

const A09A_NAV = [
  ['yer', 'Anatomik hedefler'], ['lipit', 'Lipit kuramları'], ['gaba', 'GABAₐ'], ['profil', 'Reseptör profilleri'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/09a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 9 · Ders 09a', baslik: 'Genel anestezik etkinin mekanizmaları',
  lede: 'Bir mekanizma, hem bilinçli farkındalığın hem de zararlı uyaranlara yanıtın kaybını (antinosisepsi) açıklamalıdır. [[K3 s. 105]] Aynı mekanizma bu etkilerin nasıl geri dönebildiğini de açıklayabilmelidir. [[K3 s. 105]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A09A_NAV.map(([id, ad]) => `<button type="button" data-scroll="a09a-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a09a-yer">
  <h2>Farkındalık, bellek ve hareketsizlik</h2>
  <p class="intro">Genel anesteziklerin beyin ve omurilikteki etkileri bilinç kaybını, açık belleğin baskılanmasını ve nosisepsiyona verilen fizyolojik yanıttaki değişimi açıklar. [[K3 s. 105]]</p>
  <div class="viz a09a-sekil"><div class="viz-head"><h3>Hangi bulgu hangi bölgeye işaret eder?</h3></div><div data-viz="a09a_yer"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel bölge haritası. [[K3 s. 105]] [[K3 s. 107]]</p></div>
  <p>İşitsel ve duyusal uyarılmış potansiyeller en olası birincil hedef olarak talamusu düşündürür. [[K3 s. 105]] Bellekle ilişkili limbik sistem ve belirli kortikal alanlar önemli ikincil hedeflerdir. [[K3 s. 105]]</p>
  <p>Omurilikteki etki halojenli volatil ajanlarda intravenöz ajanlara göre daha belirgin görünür. [[K3 s. 105]] Buradaki etkinlik farkındalıktan çok hareketsizlikle ilişkilidir. [[K3 s. 107]]</p>
</section>
<section class="wrap blk ders-sec" id="a09a-lipit">
  <h2>Lipitte çözünürlük neyi açıklar?</h2>
  <p class="intro">Yirminci yüzyılın başında Meyer ve Overton, birbirlerinden bağımsız olarak, yapıları çok farklı anesteziklerde lipitte çözünürlükle potens arasında doğrusal bir ilişki saptadı. [[K3 s. 105]]</p>
  <div class="viz a09a-sekil"><div class="viz-head"><h3>Korelasyonu iki gözlemle sınayın</h3></div><div data-viz="a09a_lipit"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel karşılaştırma. [[K3 s. 105–106]]</p></div>
  <p>Yağ:gaz partisyon katsayısı arttıkça MAC düşer. [[K3 s. 106]] İlişki iki logaritmik eksende doğrusal görünür. [[K3 s. 106]] Kitaptaki örnekler nitröz oksit, ksenon, desfluran, sevofluran, enfluran, izofluran, halotan ve metoksiflurandır. [[K3 s. 106]]</p>
  <p>İlk yorum, lipofilik bir ortamda özgül olmayan etkiydi. [[K3 s. 105]] Lipitçe zengin hücre membranında çift tabaka ve anüler lipitler aday bölgeler arasındadır. [[K3 s. 105–106]]</p>
  <div class="cols">
    <div class="card"><h3>Çift tabaka · kritik hacim</h3><p>Kurama göre çift tabakaya giren ajan fosfolipitlerin düzenini değiştirir, membranı genişletir ve içinden geçen kanalların işlevini bozar. [[K3 s. 106]] Hipotez, genişleme için gereken anestezik hacminin hesabına dayanır. [[K3 s. 106]]</p></div>
    <div class="card"><h3>Anüler lipitler · pertürbasyon</h3><p>İyon kanalını halka gibi çevreleyen fosfolipitlerin bileşimi, çift tabakanın geri kalanından farklıdır. [[K3 s. 106]] Pertürbasyon kuramı, belirli kanalların çevresindeki bu lipitlerin düzeninin bozulduğunu öne sürer. [[K3 s. 106]]</p></div>
  </div>
  <p>Şekildeki sıcaklık adımı, hipotezin öngörüsünü sınar: 1 °C artış membranı volatil ajan kadar kalınlaştırır, oysa anestezik etki zayıflar. [[K3 s. 106]] İzomer karşılaştırmasında ise lipitte çözünürlük sabit kalır, anestezik etki değişir. [[K3 s. 105]]</p>
  <p>Ketamin, çözünürlük–potens ilişkisinden belirgin biçimde sapar. [[K3 s. 105]] Merkezi sinir sisteminde reseptör proteinlerinin tanımlanması başka bir açıklama getirmiştir: korelasyon, özgül protein bağlanma bölgelerinin lipofilik niteliğini yansıtıyor olabilir. [[K3 s. 106]]</p>
</section>
<section class="wrap blk ders-sec" id="a09a-gaba">
  <h2>GABAₐ kanalından hiperpolarizasyona</h2>
  <p class="intro">Genel anesteziklere duyarlılık ligand kapılı kanallarda voltaj kapılı kanallardan yüksektir. [[K3 s. 106]] GABAₐ ve nikotinik asetilkolin reseptörleri beş alt birimli ligand kapılı kanal ailesindendir. [[K3 s. 106]]</p>
  <div class="viz a09a-sekil"><div class="viz-head"><h3>Bağlanma bölgesinden klorür akımına</h3></div><div data-viz="a09a_gaba"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel kanal modeli. [[K3 s. 106–108]]</p></div>
  <p>Şeklin ortasındaki klorür kanalı daha uzun süre açık kaldığında hücreye daha fazla Cl⁻ girer ve membran hiperpolarize olur. [[K3 s. 107]] Etomidat, propofol ve barbitüratlar bu etkiyi halojenli volatil ajanlarla paylaşır. [[K3 s. 107]]</p>
  <ul>
    <li><b>GABA.</b> Gama aminobütirik asit için α alt birimleriyle ilişkili iki agonist bölgesi bulunur. [[K3 s. 106]] [[K3 s. 108]]</li>
    <li><b>Benzodiazepin bölgesi.</b> Diazepam, temazepam ve midazolam α/γ arayüzünde agonist, flumazenil antagonisttir. [[K3 s. 106]] [[K3 s. 108]]</li>
    <li><b>Genel anestezik bölgesi.</b> Etomidat, propofol, barbitüratlar ve halojenli volatil ajanlar β ile ilişkili bölgede agonisttir. [[K3 s. 106–108]] Her iki modülatör bölgedeki agonistler pozitif allosterik modülasyon sağlar. [[K3 s. 108]]</li>
  </ul>
  <p>Alt birim bileşimine göre en az 30 GABAₐ reseptör tipi vardır. [[K3 s. 107]] Etomidata β2 ve β3, β1’den daha duyarlıdır. [[K3 s. 107]] Etomidat saf R(+) izomeri olarak sunulur. [[K3 s. 106–107]] S(−) izomeri klinik olarak etkisizdir ve GABAₐ aktivitesinde izomerler arasında 30 kat fark vardır. [[K3 s. 107]] Bu stereoözgüllük protein hedefini destekler. [[K3 s. 106–107]]</p>
</section>
<section class="wrap blk ders-sec" id="a09a-profil">
  <h2>İnhibitör ve eksitatör kanallarda ajan profilleri</h2>
  <p class="intro">Anestezikler inhibitör iletimi güçlendirerek veya eksitatör iletimi azaltarak nöronal sinyali baskılayabilir. [[K3 s. 107–108]]</p>
  <div class="viz a09a-sekil"><div class="viz-head"><h3>Ajanı seçin, dört reseptördeki etkisini okuyun</h3></div><div data-viz="a09a_profil"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel gösterim. Artıların sayısı güçlenmenin göreli derecesini, eksi azalmayı, sıfır etki görülmediğini gösterir. [[K3 s. 107]]</p></div>
  <div class="cols">
    <div class="card"><h3>Glisin</h3><p>Omurilik ve beyin sapının başlıca inhibitör ileticisi glisin, GABAₐ’dakine benzer bir klorür kanalı üzerinden etki eder. [[K3 s. 107]] Tüm volatil anestezikler glisinin etkisini belirgin biçimde güçlendirir. [[K3 s. 107]] Bu etkide stereoseçicilik gösterilmemiştir. [[K3 s. 107]]</p></div>
    <div class="card"><h3>NMDA</h3><p>Glutamat NMDA reseptörünü aktive eder, magnezyum ise modüle eder. [[K3 s. 108]] Bu reseptör öğrenme ve bellekle ilişkili uzun süreli sinyal güçlenmesine katılır. [[K3 s. 108]] Ketamin, nitröz oksit ve ksenonun nonkompetitif NMDA inhibisyonu, anesteziye glutamat üzerinden katkıda bulunur. [[K3 s. 108]]</p></div>
  </div>
  <h3>Profilleri karşılaştırın</h3>
  <ul>
    <li><b>Tiyopental ve R-etomidat:</b> GABAₐ sütununda ikisi de beş artı alır. [[K3 s. 107]] Tiyopental ayrıca glisin yanıtını güçlendirir ve nikotinik yanıtı azaltır. [[K3 s. 107]]</li>
    <li><b>İzofluran ve propofol:</b> GABAₐ etkileri aynı derecede gösterilirken glisin üzerindeki güçlenme izofluranda daha belirgindir. [[K3 s. 107]]</li>
    <li><b>Ketamin, nitröz oksit ve ksenon:</b> Dört hedef arasında yalnız NMDA sütununda etki gösterirler. [[K3 s. 107]]</li>
  </ul>
  <p>Etomidat GABAₐ için seçicidir. [[K3 s. 107]] Propofol ayrıca glisin kanalının açık kalma süresini uzatır, nöronal nikotinik asetilkolin ve 5-HT₃ reseptörlerini inhibe eder. [[K3 s. 107]] Barbitüratlar glutamatın etkisini de azaltabilir, ancak bu etkideki potensleri GABAₐ üzerindeki potenslerinden düşüktür. [[K3 s. 108]]</p>
  <div class="note plain"><b>Atlas notu</b><p>Kitap son karşılaştırmada barbitüratların GABAₐ işlevini inhibe ettiğini söyler. Doğrusu, barbitüratların kanalın açık kalma süresini uzatarak GABA aracılı inhibisyonu güçlendirmesidir.</p></div>
</section>
<section class="wrap blk ders-sec" id="a09a-p1">
  <h2>Part I · Çoklu doğru/yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
  <div data-viz="mtf" data-q="far09a-1"></div><div data-viz="mtf" data-q="far09a-2"></div><div data-viz="mtf" data-q="far09a-3"></div>
</section>
<section class="wrap blk ders-sec" id="a09a-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><h3>Açılış sorusu</h3><p>Genel anesteziyi hangi anatomik etkilerle açıklarsınız? Lipit kuramlarını etomidat örneğiyle sınayın ve iki farklı reseptör mekanizmasını anlatın.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Farkındalık ve zararlı uyarana yanıt kaybolur, etkiler geri dönüşümlüdür. [[K3 s. 105]]</li>
    <li>Talamus olası birincil hedeftir, limbik ve kortikal alanlar da katkıda bulunur. [[K3 s. 105]] Spinal etki özellikle hareketsizlikle ilişkilidir. [[K3 s. 107]]</li>
    <li>Kritik hacim hipotezi çift tabakanın genişlemesine, pertürbasyon kuramı kanal çevresindeki lipitlere dayanır. [[K3 s. 106]]</li>
    <li>R ve S-etomidat lipitte eşit çözünür, ancak yalnız R izomeri anesteziktir. [[K3 s. 105]] Bu ayrım özgül protein etkileşimini destekler. [[K3 s. 106–107]]</li>
    <li>GABAₐ kanalının daha uzun açık kalması klorür girişini artırır ve hiperpolarizasyona yol açar. [[K3 s. 107]]</li>
    <li>Ketamin, nitröz oksit ve ksenon NMDA reseptörünü nonkompetitif inhibe ederek eksitatör yolu baskılar. [[K3 s. 108]]</li>
  </ol>
  <div class="note"><b>Çizin</b><p>Beyin ve omurilik hedeflerini ayırın. [[K3 s. 105]] Yanına çift tabakayı ve anüler lipitleri işaretleyin. [[K3 s. 105–106]] GABAₐ için klorür girişini, NMDA için glutamat yanıtının baskılanmasını gösterin. [[K3 s. 107–108]]</p></div>
  <p><b>Olası ek sorular</b> Sıcaklık bulgusu kritik hacim hipotezini nasıl sınar? [[K3 s. 106]] Glisin kanalı üzerinden propofolü etomidattan nasıl ayırırsınız? [[K3 s. 107]]</p>
</section>
<section class="wrap blk ders-sec" id="a09a-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Talamus olası birincil hedeftir, spinal etkinlik hareketsizlikle ilişkilidir. [[K3 s. 105]] [[K3 s. 107]]</li>
    <li>Benzer membran kalınlaşmasına rağmen sıcaklık artışı anesteziyi güçlendirmez. [[K3 s. 106]]</li>
    <li>Etomidatın izomerleri arasındaki klinik fark, eşit lipit çözünürlüğüne rağmen ortaya çıkar. [[K3 s. 105]]</li>
    <li>GABAₐ kanalının açık kalma süresinin uzaması hiperpolarizasyona yol açar. [[K3 s. 107]]</li>
    <li>Volatil ajanlar glisinin inhibitör etkisini güçlendirir. [[K3 s. 107]] Ketamin, nitröz oksit ve ksenon eksitatör NMDA yolunu baskılar. [[K3 s. 108]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="09a"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/08b">← 08b · Medisinal kimya mini sözlüğü</a><a href="#/dersler/farmakoloji/09b">Sonraki: 09b · İntravenöz anestezikler: barbitüratlar ve propofol →</a></nav>
</section>`,
};
