VERI.sorular = VERI.sorular || {};
VERI.sorular['far10a-1'] = {
  no: 1, kok: 'Nosiseptif iletim ve opioid reseptörleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 139–141]]',
  onermeler: [
    {t:'Keskin ağrıyı miyelinsiz C lifleri taşır.', d:false, n:'Keskin ağrı küçük miyelinli Aδ lifleriyle, künt ağrı C lifleriyle taşınır. [[K3 s. 139]]'},
    {t:'Dokunma duyusunu taşıyan Aβ lifleri arka boynuzda inhibitör internöronları uyarır.', d:true, n:'Bu internöronlar C liflerinden gelen girdiyi baskılayarak kapıyı kapatır. [[K3 s. 139–140]]'},
    {t:'Opioid agonisti voltaja duyarlı kalsiyum kanallarını açar.', d:false, n:'İnhibitör G proteini üzerinden bu kanallar kapanır ve transmiter salımı azalır. [[K3 s. 140]]'},
    {t:'İlk klonlanan opioid reseptörü δ reseptörüdür.', d:true, n:'İlk klonlanan δ reseptörü merkezi sinir sisteminde µ reseptöründen daha dar bir dağılım gösterir. [[K3 s. 141]]'},
    {t:'Düşük doz nosiseptin, NOP üzerinden analjezi sağlar.', d:false, n:'Düşük dozda hiperaljezi, yüksek dozda analjezi görülür. [[K3 s. 141]]'}
  ]
};
VERI.sorular['far10a-2'] = {
  no: 2, kok: 'Morfinin sistemlere etkileri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 143–144]]',
  onermeler: [
    {t:'Morfin solunum sayısını tidal hacimden daha fazla azaltır.', d:true, n:'Solunum sayısındaki düşüş daha belirgindir ve beyin sapının karbondiokside duyarlılığı azalır. [[K3 s. 143]]'},
    {t:'Morfin kusma merkezindeki hücreleri uyararak bulantı yapar.', d:false, n:'Morfin kusma merkezini baskılar, kemoreseptör tetikleyici bölgeyi ise uyarır. [[K3 s. 143]]'},
    {t:'Morfinin oluşturduğu miyozis atropinle geri döndürülebilir.', d:true, n:'Miyozis Edinger–Westphal çekirdeğinin uyarılmasına bağlıdır. [[K3 s. 144]]'},
    {t:'Morfin antidiüretik hormon salımını azaltır.', d:false, n:'ADH salımı artar ve su atılımı bozulabilir. [[K3 s. 144]]'},
    {t:'Epidural morfine bağlı kaşıntı genellikle döküntüsüzdür.', d:true, n:'Nöraksiyal kaşıntı histamin salımından bağımsız görünür. [[K3 s. 143]]'}
  ]
};
VERI.sorular['far10a-3'] = {
  no: 3, kok: 'Morfin ve diamorfinin kinetiği', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 144–145]]',
  onermeler: [
    {t:'Morfinin oral biyoyararlanımı %70’tir.', d:false, n:'Hepatik ilk geçiş oral biyoyararlanımı %30 ile sınırlar. [[K3 s. 144]]'},
    {t:'Morfin 6-glukuronid böbrek yetmezliğinde birikir.', d:true, n:'Her iki başlıca glukuronid idrarla atılır ve böbrek yetmezliğinde birikir. [[K3 s. 144]]'},
    {t:'Yaşlılarda dağılım hacminin azalması morfinin doruk plazma düzeyini yükseltir.', d:true, n:'Dağılım hacmi azaldığında doruk plazma düzeyi daha yüksek olur. [[K3 s. 144]]'},
    {t:'Diamorfinin analjezisini aktif metabolitleri sağlar.', d:true, n:'Ön ilaçtır; ester hidroliziyle 6-monoasetilmorfin ve morfin oluşur. [[K3 s. 144–145]]'},
    {t:'Diamorfinin plazma yarı ömrü yaklaşık 5 dakikadır.', d:true, n:'Diamorfin hızla hidrolize olur ve ana bileşiğin plazma yarı ömrü yaklaşık 5 dakikadır. [[K3 s. 145]]'}
  ]
};

const A10A_NAV = [['agri','Ağrı yolları'],['reseptor','Reseptörler'],['morfin','Morfin ve uygulama yolu'],['etki','Sistem etkileri'],['diamorfin','Diamorfin ve karşılaştırmalar'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
function A10A_tablo(baslik, sutunlar, satirlar, sayfa) {
  return `<div class="tbl-wrap a10a-tablo"><table class="tbl"><caption>${baslik} [[K3 s. ${sayfa}]]</caption>
    <thead><tr>${sutunlar.map(s => `<th scope="col">${s}</th>`).join('')}</tr></thead>
    <tbody>${satirlar.map(([ad,...degerler]) => `<tr><th scope="row">${ad}</th>${degerler.map(d => `<td>${d}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
SAYFALAR['dersler/farmakoloji/10a'] = {
 grup:'dersler', eyebrow:'Farmakoloji · Kısım 2 · Bölüm 10 · Ders 10a', baslik:'Opioidler: fizyoloji, reseptörler ve morfin',
 lede:'Ağrı, gerçek ya da olası doku hasarıyla ilişkili, hoş olmayan duyusal ve duygusal bir deneyimdir. [[K3 s. 139]] Öznel niteliği nedeniyle hastanın ağrı olarak tarif ettiği deneyim esas alınabilir. [[K3 s. 139]]',
 html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${A10A_NAV.map(([id,ad]) => `<button type="button" data-scroll="a10a-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a10a-agri">
<h2>Ağrı sinyali arka boynuzdan nasıl geçer?</h2>
<p class="intro">Nosiseptörden merkezi sinir sistemindeki algıya kadar ağrı iletimi değiştirilebilir. [[K3 s. 139]]</p>
<div class="viz"><div class="viz-head"><h3>Substantia gelatinosa’da kapıyı ne kapatır?</h3></div><div data-viz="a10a_kapi"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Arka boynuzda C lifi girdisinin denetimi. [[K3 s. 139–140]]</p></div>
<p>Substantia gelatinosa (Rexed lamina II) girdileri bütünleştirir. [[K3 s. 139]] İkinci sıra nöronlar karşı tarafta yükselerek spinotalamik ve spinoretiküler yolları oluşturur. [[K3 s. 139]]</p>
${A10A_tablo('Primer aferent lifleri karşılaştırın',['Lif','Ağrı','Çap','Hız','Arka boynuz'],[
 ['Aδ · küçük, miyelinli','Keskin','2–5 µm','40 m.s⁻¹','II ve V'],['C · miyelinsiz','Künt','&lt; 2 µm','2 m.s⁻¹','II']
],139)}
<div class="cols"><div class="card"><h3>Ağrının kaynağı ve süresi</h3><ul>
<li>Zararlı uyaranın nosiseptörü etkinleştirmesi nosiseptif ağrıya, sinir sistemindeki işlev bozukluğu nöropatik ağrıya yol açar. [[K3 s. 139]]</li>
<li>İki mekanizma karma ağrıda birleşebilir. [[K3 s. 139]] Safra taşı ağrısı visseral ağrının tipik örneğidir. [[K3 s. 139]]</li>
<li>Akut ağrıdan kronik ağrıya geçiş için yaklaşık 12 hafta ya da ilk hasarla ilişkinin artık kurulamadığı zaman önerilmiştir. [[K3 s. 139]]</li></ul></div>
<div class="card"><h3>Nosiseptörü ne uyarır?</h3><ul>
<li>Hasar kimyasal, mekanik veya termal olabilir. [[K3 s. 139]]</li>
<li><b>Etkinleştirenler</b> · H⁺, K⁺, asetilkolin, histamin, serotonin (5-HT) ve bradikinin. [[K3 s. 139]]</li>
<li><b>Duyarlılaştıranlar</b> · Prostaglandinler, lökotrienler, P maddesi, nörokinin A ve kalsitonin geniyle ilişkili peptit. [[K3 s. 139]]</li></ul></div></div>
<p>Analjezikler üç grupta ele alınır: opioidler ve ilişkili ilaçlar, nonsteroid antiinflamatuvarlar (NSAİİ) ve diğer analjezikler. [[K3 s. 139]]</p>
</section>
<section class="wrap blk ders-sec" id="a10a-reseptor"><h2>Bir reseptörden sinaptik yanıta</h2>
<p class="intro">Klasik opioid reseptörleri ve NOP, zarı yedi kez geçen ve inhibitör G proteinine bağlanan reseptörlerdir. [[K3 s. 140]]</p>
<div class="viz"><div class="viz-head"><h3>µ agonisti sinir uçlarında neyi değiştirir?</h3></div><div data-viz="a10a_sinyal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Agonistten sinaptik yanıta. [[K3 s. 140]]</p></div>
<p>Opiat, morfin benzeri doğal maddelerin adıdır. [[K3 s. 140]] Opioidler bazik aminlerdir ve bu daha geniş grup, reseptöre afinitesi olan sentetik maddeleri de içerir. [[K3 s. 140]]</p>
<ul class="iskelet"><li><b>MOP (µ, mü).</b> Adını morfinden alır ve merkezi sinir sistemine yayılmıştır. [[K3 s. 140]] Kortekste, bazal gangliyonlarda, arka boynuzdaki primer aferentlerin presinaptik uçlarında ve inen inhibitör yolun başladığı periakuaduktal gri maddede bulunur. [[K3 s. 140]]</li>
<li>µ uyarısı analjezi, öfori, miyozis, bradikardi ve kardiyovasküler depresyon oluşturur. [[K3 s. 140–141]] Kemoreseptörlerin CO₂ duyarlılığının azalması solunumu baskılar, bağırsakta sekresyon ve peristaltizmin azalması konstipasyona yol açar. [[K3 s. 140–141]]</li>
<li><b>KOP (κ, kappa).</b> Adı ilk agonisti ketosiklazosinden gelir. [[K3 s. 140–141]] Analjezi, sedasyon ve miyozis oluşturur. [[K3 s. 140]] Solunum depresyonu görülmemesi avantajdır, ancak κ agonistlerinin µ antagonisti gibi davranması kullanımlarını sınırlıyor görünmektedir. [[K3 s. 141]]</li>
<li><b>DOP (δ, delta).</b> Adı vas deferensten gelir. [[K3 s. 140]] İlk klonlanan reseptördür, merkezi dağılımı daha sınırlıdır ve µ gibi transmiter salımını baskılar. [[K3 s. 141]] Analjezi ve solunum depresyonuyla ilişkilidir, duygudurum ve harekette rol oynayabilir. [[K3 s. 140–141]]</li>
<li><b>NOP.</b> Klonlama sırasında keşfedilen klasik dışı nosiseptin/orfanin FQ reseptörü anksiyete, depresyon ve iştahın düzenlenmesiyle ilişkilidir. [[K3 s. 140]] Nosiseptin/orfanin FQ’nun µ uyarısına benzer etkileri vardır, ancak spinal ve supraspinal etkisi düşük dozda hiperaljezi, yüksek dozda analjezidir. [[K3 s. 141]] NOP antagonistleri uzun süreli analjezi sağlar ve morfin toleransını önler, bu nedenle gelecekte yararlı olabilir. [[K3 s. 141]]</li></ul>
${A10A_tablo('Ligandların reseptör afinitesi (+ ile +++ arası, çizgi afinite yok)',['Ligand','µ','κ','δ','NOP'],[
 ['Endorfinler','+++','+++','+++','—'],['Enkefalinler','+','—','+++','—'],['Dinorfinler','+','+++','—','—'],['N/OFQ','—','—','—','+++'],['Morfin','+++','+','+','—'],['Fentanil','+++','+','—','—'],['Nalokson','+++','++','++','—']
],143)}
</section>
<section class="wrap blk ders-sec" id="a10a-morfin"><h2>Morfinin uygulama yolu ve kinetiği</h2>
<p class="intro">Doğal, karmaşık yapılı bir fenantren türevi olan morfin, µ agonistidir ve diğer opioidler için karşılaştırma ölçütüdür. [[K3 s. 141]]</p>
<div class="viz"><div class="viz-head"><h3>Uygulama yolu değişince</h3></div><div data-viz="a10a_yol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Uygulama yolları, doz ve etki zamanı. [[K3 s. 141]] [[K3 s. 144]]</p></div>
<p>Tablet, süspansiyon, supozituvar, yavaş salımlı kapsül ve granüller çeşitli dozlarda bulunur. [[K3 s. 141]] IV veya IM preparat 10–30 mg.ml⁻¹ içerir. [[K3 s. 141]] Kitaptaki dozlar yol göstericidir, daha sık uygulama veya doz artışı gerekebilir. [[K3 s. 141]]</p>
<div class="cols"><div class="card"><h3>Oral ve parenteral morfin</h3><ul>
<li>Oral doz 4 saatte bir 5–20 mg’dır. [[K3 s. 141]] Hepatik ilk geçiş nedeniyle oral biyoyararlanım %30’dur. [[K3 s. 144]]</li>
<li>IM doz 4 saatte bir 0.1–0.2 mg.kg⁻¹’dir, IV yolda benzer toplam doz etkiye göre titre edilir. [[K3 s. 141]]</li>
<li>IV enjeksiyonda doruk etkiye 10, IM enjeksiyonda 30 dakikada ulaşılır ve her iki yolda etki 3–4 saat sürer. [[K3 s. 144]]</li></ul></div>
<div class="card"><h3>Nöraksiyal morfin</h3><p>Kitapta epidural 2–4 mg, intratekal 0.2–1.0 mg bildirilir. [[K3 s. 144]] Her iki yolda düşük lipit çözünürlüğü nedeniyle gecikmiş solunum depresyonu gelişebilir. [[K3 s. 141]]</p></div></div>
<ul class="iskelet"><li><b>Emilim.</b> Zayıf baz olan morfin (pKa 8.0) asidik midede iyonizedir, bu nedenle emilim görece alkali ince bağırsakta noniyonize hâle gelinceye kadar gecikir. [[K3 s. 144]]</li>
<li><b>Dağılım.</b> Düşük lipit çözünürlüğü subkutan emilimi yavaşlattığı için bu yoldan genellikle kaçınılır. [[K3 s. 141]] Beyin konsantrasyonu da yavaş düşer, plazma düzeyi etkiyle korelasyon göstermez. [[K3 s. 144]]</li>
<li><b>Dönüşüm.</b> Metabolizma ağırlıkla karaciğerde, kısmen böbrekte gerçekleşir ve glukuronidasyon yanında N-demetilasyon da görülür. [[K3 s. 144]]</li>
<li><b>Morfin 3-glukuronid.</b> Morfinin %70’e kadarı bu metabolite dönüşür, uyanıklığı etkiliyor görünür ve muhtemelen µ antagonistidir. [[K3 s. 144]]</li>
<li><b>Morfin 6-glukuronid.</b> Morfinden 13 kat daha potenttir ve etki süresi benzerdir. [[K3 s. 144]] Her iki glukuronid idrarla atılır ve böbrek yetmezliğinde birikir. [[K3 s. 144]]</li>
<li><b>Yaş.</b> Karaciğerin konjugasyon kapasitesi düşük olduğundan yenidoğan erişkinden daha duyarlıdır. [[K3 s. 144]] Yaşlıda daha küçük dağılım hacmi daha yüksek doruk plazma düzeyiyle sonuçlanır. [[K3 s. 144]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a10a-etki"><h2>Morfinin sistemlere etkileri</h2>
<p class="intro">Morfin özellikle visseral ağrıyı giderir, keskin veya yüzeyel ağrıda etkisi daha sınırlıdır. [[K3 s. 143]]</p>
<div class="viz"><div class="viz-head"><h3>Solunum merkezine hangi uyaran ulaşır?</h3></div><div data-viz="a10a_solunum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Morfin sonrası solunum yanıtı. [[K3 s. 143]]</p></div>
<p>Zaman zaman gereken doz artışı genellikle bağımlılıktan çok patofizyolojideki bir değişikliğe bağlıdır. [[K3 s. 143]]</p>
<div class="cols"><div class="card"><h3>Solunum ve dolaşım</h3><ul>
<li>Solunum sayısı tidal hacimden daha fazla azalır, öksürük baskılanır. [[K3 s. 143]]</li>
<li>Histamin salımı bronkospazm yapabilir. [[K3 s. 143]] Histamin ve azalan sempatik tonus hafif bradikardi ve hipotansiyona yol açabilir, doğrudan miyokard depresyonu yoktur. [[K3 s. 143]]</li>
<li>Yavaş uygulama histamine bağlı hipotansiyon ve bronkospazmı sınırlayabilir. [[K3 s. 143]]</li></ul></div>
<div class="card"><h3>Bulantı ve bağırsak</h3><ul>
<li>5-HT₃ ve dopamin reseptörleri üzerinden kemoreseptör tetikleyici bölge uyarılır, bulantı ve kusma gelişebilir. [[K3 s. 143]] Kusma merkezindeki hücreler ise baskılanır. [[K3 s. 143]]</li>
<li>Bağırsak sfinkterleri kasılır, spastik hareketsizlik konstipasyon yapar. [[K3 s. 143]] Oddi sfinkterinin kasılması safra yolu basıncını artırır, klinik önemi belirsizdir. [[K3 s. 143]]</li></ul></div>
<div class="card"><h3>Kaşıntının iki görünümü</h3><ul>
<li>Histaminle ilişkili döküntü ve kaşıntı naloksonla geri döndürülebilir. [[K3 s. 143]]</li>
<li>En belirgin kaşıntı intratekal veya epidural uygulamadan sonradır, genellikle döküntüsüzdür ve histaminden bağımsız görünür. [[K3 s. 143]] Antihistaminikler muhtemelen sedasyon yoluyla yarar sağlayabilir. [[K3 s. 143]]</li></ul></div>
<div class="card"><h3>Sinir sistemi, göz ve kas</h3><ul>
<li>Artan dozlarla sedasyon, öfori ve disfori görülür. [[K3 s. 143]]</li>
<li>Morfin ve diğer opioidlerle bazen göğüs duvarı rijiditesi gelişir, substantia nigra ve striatumdaki dopaminerjik ve GABA yollarıyla opioid reseptörlerinin etkileşimi sorumlu olabilir. [[K3 s. 143]]</li>
<li>Edinger–Westphal çekirdeğinin uyarılması miyozis yapar, atropin bunu geri çevirebilir. [[K3 s. 144]]</li></ul></div>
<div class="card"><h3>Hormonlar ve idrar yolları</h3><ul>
<li>ACTH (adrenokortikotrofik hormon), prolaktin ve gonadotrofik hormon salımı azalır. [[K3 s. 144]] Antidiüretik hormon (ADH) artışı su atılımını bozup hiponatremiye yol açabilir. [[K3 s. 144]]</li>
<li>Detrüsör ve mesane sfinkterinin tonus artışı üriner retansiyonu tetikleyebilir, üreter tonusu da artar. [[K3 s. 144]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a10a-diamorfin"><h2>Diamorfin ve opioidlerin karşılaştırılması</h2>
<p class="intro">Diasetillenmiş morfin türevi diamorfin reseptöre afinite göstermeyen bir ön ilaçtır, analjezi ve diğer etkiler aktif metabolitlerinden gelir. [[K3 s. 144–145]]</p>
<div class="viz"><div class="viz-head"><h3>İki opioidin metabolitlerini izleyin</h3></div><div data-viz="a10a_metabolit"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Morfin ve diamorfinin metabolik yolları. [[K3 s. 144–145]]</p></div>
<ul class="iskelet"><li><b>Sunum.</b> Diamorfin 10 mg tablet veya kolay çözünen beyaz enjeksiyonluk hidroklorür tozu (5, 10, 30, 100 veya 500 mg) olarak bulunur. [[K3 s. 144]]</li>
<li><b>Kullanım.</b> Şiddetli ağrı ve pulmoner ödemle ilişkili dispnede parenteral doz 2.5–10 mg’dır. [[K3 s. 144]] Analjezi için intratekal 0.1–0.4 mg veya epidural 1–3 mg kullanılır. [[K3 s. 144]]</li>
<li><b>Lipit çözünürlüğü.</b> Morfinden daha yüksek olması, nöraksiyal uygulamada gecikmiş solunum depresyonu olasılığını teorik olarak azaltır. [[K3 s. 144]] Subkutan yol etkilidir ve bağırsaktan iyi emilir, ancak yoğun ilk geçiş oral biyoyararlanımı düşük tutar. [[K3 s. 145]]</li>
<li><b>Plazma.</b> Proteine bağlanma %40, pKa 7.6 ve pH 7.4’te noniyonize fraksiyon %37’dir. [[K3 s. 145]] Ana bileşiğin plazma yarı ömrü yaklaşık 5 dakikadır. [[K3 s. 145]]</li>
<li><b>Potens ve öfori.</b> Diamorfinin morfinden yaklaşık iki kat potent olduğu belirtilir. [[K3 s. 144]] Opioidler arasında en belirgin öforiyi oluşturması kötüye kullanımıyla ilişkilidir. [[K3 s. 145]]</li></ul>
${A10A_tablo('Eliminasyon ve dağılım',['Opioid','Yarı ömür (dk)','Klirens (ml.min⁻¹.kg⁻¹)','Dağılım hacmi (l.kg⁻¹)'],[
 ['Morfin','170','16','3.5'],['Petidin','210','12','4.0'],['Fentanil','190','13','4.0'],['Alfentanil','100','6','0.6'],['Remifentanil','10','40','0.3']
],145)}
${A10A_tablo('Plazma ve lipit çözünürlüğü',['Opioid','Proteine bağlı (%)','pKa','Noniyonize (%), pH 7.4','Göreli lipit çözünürlüğü¹'],[
 ['Morfin','35','8.0','23','1'],['Petidin','60','8.7','5','30'],['Fentanil','83','8.4','9','600'],['Alfentanil','90','6.5','89','90'],['Remifentanil','70','7.1','68','20']
],145)}
<p>¹ Göreli çözünürlük oktanol/su katsayısına dayanır. [[K3 s. 145]]</p>
${A10A_tablo('10 mg oral morfine karşılık gelen dozlar',['İlaç','Yol','Oral morfine göre potens','Eşdeğer doz'],[
 ['Morfin','Oral','1','10 mg'],['Morfin','IM / IV / SC','2','5 mg'],['Diamorfin','IM / IV / SC','3.3','3 mg'],['Kodein fosfat','Oral','0.1','100 mg'],['Dihidrokodein','Oral','0.1','100 mg'],['Tramadol','Oral','0.15','67 mg'],['Tapentadol','Oral','0.4','25 mg'],['Oksikodon','Oral','1.5','6.6 mg']
],145)}
</section>
<section class="wrap blk ders-sec" id="a10a-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far10a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far10a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far10a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a10a-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Morfinin visseral ağrıyı nasıl giderdiğini anlatın. Uygulama yolu ve böbrek işlevi etkisini nasıl değiştirir?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Morfin özellikle visseral ağrıda etkilidir. [[K3 s. 143]] Arka boynuzdaki primer aferent uçlarda ve inen inhibitör yolun başlangıcında µ reseptörleri bulunur. [[K3 s. 140]]</li>
<li>µ uyarısıyla voltaja duyarlı Ca²⁺ kanalları kapanır, K⁺ çıkışı membranı hiperpolarize eder, adenilat siklaz inhibisyonu cAMP’yi azaltır ve transmiter salımı baskılanır. [[K3 s. 140]]</li>
<li>Oral morfinin ilk geçiş nedeniyle biyoyararlanımı %30’dur. [[K3 s. 144]] Doruk etki IV yolda 10, IM yolda 30 dakikada görülür. [[K3 s. 144]]</li>
<li>Düşük lipit çözünürlüğü subkutan emilimi yavaşlatır ve nöraksiyal uygulama sonrası gecikmiş solunum depresyonuyla ilişkilidir. [[K3 s. 141]]</li>
<li>İdrarla atılan iki glukuronid böbrek yetmezliğinde birikir, bunlardan morfin 6-glukuronid morfinden 13 kat daha potenttir. [[K3 s. 144]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Arka boynuzdaki µ reseptöründen transmiter salımına uzanan şemada Ca²⁺ kanalını, K⁺ akımını ve cAMP’yi işaretleyin. [[K3 s. 140]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Ek oksijen morfin sonrası solunumu nasıl etkileyebilir? Nöraksiyal kaşıntıyı nasıl tanırsınız? Diamorfinin etkisini hangi metabolitler sağlar?</div></div>
</section>
<section class="wrap blk ders-sec" id="a10a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Aβ lifleri ve inen yollar arka boynuzdaki inhibitör internöronları uyararak C lifi girdisini baskılar. [[K3 s. 139–140]]</li>
<li>Opioid agonistinin sinaptik etkisi transmiter salımının azalmasıdır. [[K3 s. 140]]</li>
<li>Morfinle beyin sapının CO₂’ye duyarlılığı azalır, hipoksiye yanıt görece korunur. [[K3 s. 143]]</li>
<li>Morfinde plazma düzeyi etkiyi yansıtmaz, böbrek yetmezliğinde iki başlıca glukuronid de birikir. [[K3 s. 144]]</li>
<li>Diamorfin hızla 6-monoasetilmorfin ve morfine dönüşür. [[K3 s. 145]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="10a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/09f">← 09f · Ksenon ve anestezik olmayan tıbbi gazlar</a><a href="#/dersler/farmakoloji/10b">Sonraki: 10b · Diğer opioidler ve opioid antagonistleri →</a></nav>
</section>`
};
