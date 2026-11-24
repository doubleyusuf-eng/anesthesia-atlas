VERI.sorular = VERI.sorular || {};
VERI.sorular['far13a-1'] = {
  no: 1, kok: 'Otonom iletim ve reseptör sinyalleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 206–210]]',
  onermeler: [
    { t: 'Parasempatik ganglionlar omuriliğin lateral boynuzundadır.', d: false, n: 'Bu ganglionlar hedef organın yakınında ya da içindedir. [[K3 s. 206]]' },
    { t: 'Ter bezine ulaşan postganglionik sempatik lif asetilkolin salgılar.', d: true, n: 'Ter bezinin hem ganglion öncesi hem de ganglion sonrası ileticisi asetilkolindir. [[K3 s. 208–209]]' },
    { t: 'Adrenal medulladan dolaşıma verilen adrenalin hormon işlevi görür.', d: true, n: 'Preganglionik lif kromafin hücresini doğrudan uyarır ve adrenalin kana salınır. [[K3 s. 208]]' },
    { t: 'α₂ uyarısı adenilat siklazı aktive eder.', d: false, n: 'α₂, Gi üzerinden adenilat siklazı baskılar ve cAMP düzeyini düşürür. [[K3 s. 210]]' },
    { t: 'D₁ uyarısı mezenterik damarlarda vazodilatasyon oluşturur.', d: true, n: 'Periferik D₁ damar yanıtı böbrek ve mezenter dolaşımında görülür. [[K3 s. 210]]' }
  ]
};
VERI.sorular['far13a-2'] = {
  no: 2, kok: 'Adrenalin ve noradrenalin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 210–212]]',
  onermeler: [
    { t: 'Düşük doz adrenalin infüzyonunda β etkileri baskındır.', d: true, n: 'Düşük dozda debi ve miyokardın oksijen tüketimi artar. [[K3 s. 210–211]]' },
    { t: 'Adrenalin subkütan verildiğinde kastan daha hızlı emilir.', d: false, n: 'Kas içi emilim subkütan emilimden hızlıdır. [[K3 s. 211]]' },
    { t: 'Adrenalin pulmoner vasküler direnci düşürür.', d: false, n: 'Bronşlar genişlerken pulmoner vasküler direnç artar. [[K3 s. 211]]' },
    { t: 'Noradrenalin infüzyonu refleks bradikardiye yol açabilir.', d: true, n: 'Periferik vazokonstriksiyonla sistolik ve diyastolik basınç yükselirken nabız yavaşlayabilir. [[K3 s. 212]]' },
    { t: 'Endojen noradrenalin başlıca geri alım 2 ile etkisizleşir.', d: false, n: 'Başlıca mekanizma sinir terminaline aktif taşınma, yani geri alım 1’dir. [[K3 s. 212]]' }
  ]
};
VERI.sorular['far13a-3'] = {
  no: 3, kok: 'Dopaminin organ etkileri ve kinetiği', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 213]]',
  onermeler: [
    { t: 'Dopamin kan–beyin bariyerini geçer.', d: false, n: 'Bariyeri geçebilen öncül L-dopadır. [[K3 s. 213]]' },
    { t: 'Dopamin karotis cisimciğinin hipoksemiye yanıtını azaltır.', d: true, n: 'Dopamin infüzyonu sırasında karotis cisimciğinin düşük oksijene duyarlılığı azalır. [[K3 s. 213]]' },
    { t: 'Dopamin endojen noradrenalin salınımını uyarır.', d: true, n: 'Dopaminin dolaşım etkilerinde doğrudan reseptör uyarısına bu dolaylı etki de katılır. [[K3 s. 213]]' },
    { t: 'Dopamin hipofizden prolaktin salınımını baskılar.', d: true, n: 'Prolaktin salgısında azalma dopaminin merkezi etkilerindendir. [[K3 s. 213]]' },
    { t: 'Dopaminin yarı ömrü yaklaşık 3 dakikadır.', d: true, n: 'Yaklaşık 3 dakikalık yarı ömre karşılık klinik etki 10 dakika sürer. [[K3 s. 213]]' }
  ]
};

const A13A_NAV = [['otonom','Otonom yollar'],['reseptor','Reseptörler'],['adrenalin','Adrenalin'],['noradrenalin','Noradrenalin'],['dopamin','Dopamin'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/13a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 13 · Ders 13a',
  baslik: 'Adrenerjik fizyoloji ve doğal katekolaminler',
  lede: 'Noradrenalin bir sinir ucundan salındığında kalbi hızlandırır, sistemik infüzyonda ise nabız yavaşlayabilir. [[K3 s. 212]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A13A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a13a-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a13a-otonom">
<h2>Otonom sinir hedefe nasıl ulaşır?</h2>
<p class="intro">Sempatik ve parasempatik yolların ilk lifi aynı ileticiyi kullanır, ancak ganglionun yeri ve hedefe ulaşan sinyal değişir. [[K3 s. 206–209]]</p>
<div class="viz"><div class="viz-head"><h3>Gangliondan hedefe iletici seçimi</h3></div><div data-viz="a13a_yollar"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 206–209]]</p></div>
<p>Otonom sistem iç ortamı istem dışı düzenler ve anatomik olarak somatik sistemden ayrılır. [[K3 s. 206]] Efferent kol organları ve düz kası yönetir, afferent kol visseral duyuyu bazen somatik sinirlerle taşır ve refleks arkına katılabilir. [[K3 s. 206]]</p>
<p>Merkezi bütünleştirici hipotalamusu neokorteks denetler. [[K3 s. 206]] Bağırsak salgıları yerel olarak düzenlenir, bazı refleksler omurilikte, yaşamsal baroreseptör yanıtları medullada işlenir. [[K3 s. 206]]</p>
<div class="cols"><div class="card"><h3>Parasempatik çıkış</h3><ul>
<li>III, VII, IX ve X. kraniyal sinirler göz, tükürük bezleri, kalp, bronşlar, splenik fleksuraya kadar sindirim kanalı ve üreterlere ulaşır. [[K3 s. 206]]</li>
<li>S2–S4 lifleri distal bağırsak, mesane ve genital organlara gider. [[K3 s. 206]]</li>
<li>Her iki çıkışta ganglion organın içinde veya yakınındadır, postganglionik iletici asetilkolindir (ACh). [[K3 s. 206]]</li>
<li>Antikolinerjikler ve antikolinesterazlar bu sistemi modüle eder. [[K3 s. 206]]</li></ul></div>
<div class="card"><h3>Sempatik çıkış</h3><ul>
<li>T1–L2 lateral boynuzundan çıkan lif anterior primer ramusa, oradan beyaz ramus communicans ile sempatik zincire ulaşır. [[K3 s. 206]]</li>
<li>Sinaps aynı ya da komşu düzeyde kurulabilir veya lif splanknik sinirle öne ilerleyip prevertebral ganglionda sonlanabilir. [[K3 s. 206]]</li>
<li>Zincirden komşu spinal sinire dönen miyelinsiz postganglionik lif gri ramus communicans’tan geçer ve noradrenalinle adrenoseptörleri uyarır. [[K3 s. 206–207]]</li></ul></div></div>
<p><b>Anatomi şemasındaki kısaltmalar.</b> DRG dorsal kök ganglionu, APR anterior primer ramuslar, WRC ve GRC beyaz ve gri ramus communicans, PVG prevertebral ganglion, SC sempatik zincirdir. [[K3 s. 207]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap parasempatik postganglionik ACh etkisini nikotinik reseptöre bağlar. Hedef organdaki reseptör muskarinik, otonom gangliondaki reseptör nikotiniktir.</div>
</section>
<section class="wrap blk ders-sec" id="a13a-reseptor">
<h2>Reseptörden ikinci haberciye</h2><p class="intro">Doğrudan etkili sempatomimetikler adrenoseptöre veya dopamin reseptörüne bağlanır, dolaylı etkili olanlar noradrenalin salınımını uyarır. [[K3 s. 208]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi reseptör hangi sinyali başlatır?</h3></div><div data-viz="a13a_sinyal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 210]]</p></div>
<p>Sempatomimetiklerin benzen halkasında C1’e amin yan zinciri bağlanır. [[K3 s. 208]] C3 ve C4’te hidroksil bulunması katekolü (3,4-dihidroksibenzen), dolayısıyla katekolamin yapısını tanımlar. [[K3 s. 208]]</p>
<p>Kitap doğal katekolaminleri, sentetik ajanları ve diğer inotropları ayrı gruplar. [[K3 s. 208]] Doğal gruptaki dopamin, noradrenalin ve adrenalinin sentez yolları bağlantılıdır. [[K3 s. 208–209]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Reseptör</th><th>Yer ve uyarılma yanıtı</th></tr></thead><tbody>
<tr><th>α₁</th><td>Damar düz kası kasılır. [[K3 s. 210]]</td></tr><tr><th>α₂</th><td>Sinir sisteminde yaygındır, sedasyon ve analjezi sağlar, sempatik yanıtları zayıflatır. [[K3 s. 210]]</td></tr>
<tr><th>β₁</th><td>Kalpte kasılma gücü ve hız artar. [[K3 s. 210]]</td></tr>
<tr><th>β₂</th><td>Bronş, damar ve uterus düz kası gevşer, reseptör kalpte de bulunur. [[K3 s. 210]]</td></tr>
<tr><th>β₃</th><td>Yağ dokusunda lipoliz artar. [[K3 s. 210]]</td></tr>
<tr><th>D₁</th><td>Merkezde ekstrapiramidal aktiviteyi düzenler, periferde renal ve mezenterik damarları genişletir. [[K3 s. 210]]</td></tr>
<tr><th>D₂</th><td>Merkezde hipofiz hormonu salınımını, periferde ise ileri noradrenalin salınımını baskılar. [[K3 s. 210]]</td></tr></tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitabın çeviri tablosunda trombosit agregasyonu β₁ satırında görünür. Trombosit agregasyonuna aracılık eden adrenerjik reseptör α₂’dir.</div>
</section>
<section class="wrap blk ders-sec" id="a13a-adrenalin">
<h2>Adrenalin</h2><p class="intro">Adrenalinin dolaşım etkisini doz belirler, düşük infüzyon hızında β etkileri, yüksek dozda α₁ etkisi öne çıkar. [[K3 s. 210–211]]</p>
<div class="viz"><div class="viz-head"><h3>Doz değişince dolaşım yanıtı</h3></div><div data-viz="a13a_adrenalin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 210–211]]</p></div>
<h3>Üç doğal katekolaminin preparatları ve kullanım alanları</h3>
<div class="tbl-wrap"><table class="tbl a13a-preparat"><thead><tr><th>İlaç ve berrak çözeltinin içeriği</th><th>Kullanım</th></tr></thead><tbody>
<tr><td><b>Adrenalin</b><br>0.1–1 mg.ml⁻¹. [[K3 s. 208]]</td><td>Asistoli veya anafilakside bolus, dolaşım yetmezliği olan kritik hastada infüzyon (0.01–0.5 µg.kg⁻¹.min⁻¹). [[K3 s. 208]]</td></tr>
<tr><td><b>Noradrenalin</b><br>0.2–2 mg.ml⁻¹ asit tartrat, 0.1–1 mg.ml⁻¹ baza eşdeğerdir, koruyucu sodyum metabisülfittir. [[K3 s. 211]]</td><td>Sistemik vasküler direnci artırmak için intravenöz infüzyon (0.05–0.5 µg.kg⁻¹.min⁻¹). [[K3 s. 211]]</td></tr>
<tr><td><b>Dopamin</b><br>5 ml suda 200 veya 800 mg dopamin ve sodyum metabisülfit bulunur. [[K3 s. 212]]</td><td>Hemodinamiyi ve idrar çıkışını iyileştirmek için kullanılır. [[K3 s. 212]]</td></tr></tbody></table></div>
<h3>Adrenalinin diğer uygulamaları</h3><ul>
<li>Akut üst hava yolu obstrüksiyonunda nebülize adrenalin vazokonstriksiyonla şişliği geçici olarak azaltır. [[K3 s. 208]]</li>
<li>Kitap açık açılı glokom için %1 oftalmik çözeltiyi, böcek sokması veya ilaçla ilişkili anafilaksi için 280 µg veren ölçülü doz inhaleri tarif eder. [[K3 s. 208]]</li>
<li>Lokal anestezikle 80000–200000’de 1 konsantrasyonda sunulur ve sıklıkla diseksiyondan önce vazokonstriksiyon için kullanılır. [[K3 s. 208]] [[K3 s. 211]]</li>
<li>Kitap halotanla aritmiyi önlemek için dozu 10 dakikada 100 µg ile sınırlar ve perfüzyonu korumak için uç arter bölgelerine infiltrasyondan kaçınır. [[K3 s. 211]]</li>
<li>Ekstravazasyon doku nekrozuna yol açabilir. [[K3 s. 211]]</li></ul>
<div class="cols"><div class="card"><h3>Solunum, sinir sistemi ve böbrek</h3><ul>
<li>Bronkodilatasyon güçlüdür, dakika ventilasyonu hafif artar, sekresyonlar koyulaşıp yapışkanlaşabilir. [[K3 s. 211]]</li>
<li>Pulmoner vasküler direnç artar. [[K3 s. 211]]</li>
<li>Minimum alveoler konsantrasyon (MAC) ve periferik ağrı eşiği yükselir. [[K3 s. 211]]</li>
<li>Böbrek kan akımı orta derecede azalır, mesane sfinkter tonusu arttığında işeme güçleşebilir. [[K3 s. 211]]</li></ul></div>
<div class="card"><h3>Metabolizma ve elektrolitler</h3><ul>
<li>Bazal metabolizma hızlanır, karaciğer ve kas glikojenolizi, lipoliz ve glukoneogenez uyarılır, plazma glukozu yükselir. [[K3 s. 211]]</li>
<li>Başta β₂ insülin salgısını artırır, sıklıkla ardından α etkisi salgıyı baskılayıp glukoz artışını belirginleştirir. [[K3 s. 211]]</li>
<li>Glukagon ve laktat yükselir, lipazla açığa çıkan serbest yağ asitleri karaciğerde oksidasyonu ve ketogenezi artırır. [[K3 s. 211]] Bu etkiler özellikle diyabette kullanımı sınırlar. [[K3 s. 211]]</li>
<li>Tübüler taşınmanın doğrudan uyarılması ve renin–aldosteron üretiminin artması Na⁺ geri emilimini artırır. [[K3 s. 211]]</li>
<li>K⁺ önce karaciğerden salınarak geçici olarak yükselir, ardından β₂ uyarısıyla hücre içine taşınır. [[K3 s. 211]]</li></ul></div></div>
<h3>Emilim ve yıkım</h3><p>Oral adrenalin inaktive olur, subkütan emilim intramüsküler emilimden yavaştır. [[K3 s. 211]] Trakeal emilim düzensizdir, kitap bu yolu acilde damar erişimi sağlanamadığında anar. [[K3 s. 211]]</p>
<p>Karaciğer, böbrek ve kanda mitokondriyal monoamin oksidaz (MAO) ve katekol O-metiltransferaz (COMT) adrenalini hızla metabolize eder, yarı ömür yaklaşık 2 dakikadır. [[K3 s. 211]] İnaktif 3-metoksi-4-hidroksimandelik asit (vanilmandelik asit, VMA) ve glukuronik asit veya sülfatla konjuge edilen metadrenalin idrarla atılır. [[K3 s. 211]]</p>
</section>
<section class="wrap blk ders-sec" id="a13a-noradrenalin">
<h2>Noradrenalin</h2><p class="intro">Noradrenalin başlıca α₁’i, ayrıca β reseptörlerini uyarır, kalp hızı ve debi yanıtı ise endojen salınım ile sistemik infüzyonda farklıdır. [[K3 s. 212]]</p>
<div class="viz"><div class="viz-head"><h3>Sinir ucundan salınım mı, infüzyon mu?</h3></div><div data-viz="a13a_noradrenalin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 212]]</p></div>
<div class="cols"><div class="card"><h3>İnfüzyon sırasında</h3><ul>
<li>Miyokardın oksijen tüketimi artar, koroner vazodilatasyonla koroner akım yükselir. [[K3 s. 212]]</li>
<li>Venokonstriksiyon venöz dönüşü artırır, pulmoner vasküler direnç artabilir. [[K3 s. 212]]</li>
<li>Vazokonstriksiyon böbrek ve karaciğer kan akımını azaltır. [[K3 s. 212]]</li>
<li>Gebe uterusta azalan kan akımı fetal bradikardiye, uterusu kasabilmesi de fetal asfiksiye yol açabilir. [[K3 s. 212]]</li></ul></div>
<div class="card"><h3>Aşırı etki ve etkileşim</h3><ul>
<li>Fazlası hipertansiyon, bradikardi, baş ağrısı ve şiddetli periferik vazokonstriksiyon yapar, bazen ekstremite iskemisi ve gangren gelişir. [[K3 s. 212]]</li>
<li>Damar dışına kaçış doku nekrozuna neden olabilir. [[K3 s. 212]]</li>
<li>Doğrudan etkili olmasına karşın MAO inhibitörü kullananlarda etkisi şiddetlenip uzayabilir, dikkat gerekir. [[K3 s. 212]]</li></ul></div></div>
<h3>Salınan noradrenalin nereye gider?</h3><ul>
<li><b>Geri alım 1.</b> Başlıca sonlanma yolu sinir ucuna aktif geri taşınmadır. [[K3 s. 212]] Burada noradrenalin yeniden kullanılır veya MAO ile yıkılır, sempatik sinirde COMT bulunmaz. [[K3 s. 212]]</li>
<li><b>Geri alım 2.</b> Daha az önemli olan bu yolda noradrenalin sinirden uzağa difüzyonla dolaşıma ulaşır. [[K3 s. 212]] COMT yoluyla oluşan inaktif VMA ve glukuronik asit veya sülfatla konjuge edilen normetadrenalin idrarla atılır. [[K3 s. 212]]</li>
<li><b>Akciğer ve yarı ömür.</b> Akciğer geçişinde adrenalinden ve dopaminden farklı olarak %25’e kadarı tutulur, hızlı metabolizmayla yarı ömrü yaklaşık 2 dakikadır. [[K3 s. 212]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a13a-dopamin">
<h2>Dopamin</h2><p class="intro">Dopamin α, β, D₁ ve D₂ reseptörlerine etki eder, dolaşım yanıtı infüzyon hızıyla ve hastadan hastaya değişir. [[K3 s. 213]]</p>
<div class="viz"><div class="viz-head"><h3>İnfüzyon hızı hangi etkiyi öne çıkarır?</h3></div><div data-viz="a13a_dopamin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 213]]</p></div>
<p>Bazı beyin hücreleri ve otonom ganglion internöronları dopamini noradrenaline çevirmeden iletici olarak salar. [[K3 s. 212]] İlaç olarak dopamin doğrudan reseptör etkisine ek olarak endojen noradrenalin salınımını uyarır. [[K3 s. 213]]</p>
<ul><li><b>Dolaşım.</b> Diğer inotroplarda olduğu gibi taşikardiyi sınırlamak için yeterli önyük gerekir. [[K3 s. 213]] Dopamin adrenalinden daha az aritmojeniktir, ekstravazasyonu doku nekrozuna yol açabilir. [[K3 s. 213]]</li>
<li><b>Solunum.</b> Karotis cisimciğinin hipoksemiye yanıtı azalır, pulmoner vasküler direnç artar. [[K3 s. 213]]</li>
<li><b>Splanknik dolaşım ve diürez.</b> D₁ aracılığıyla mezenterik vazodilatasyon gösterilmiştir. [[K3 s. 213]] İdrar çıkışındaki düzelme tümüyle proksimal tübülde Na⁺ geri emiliminin baskılanmasına ve debi ile kan basıncındaki düzelmeye bağlı olabilir. [[K3 s. 213]]</li>
<li><b>Merkezi etkiler.</b> Dopamin ekstrapiramidal hareketleri düzenler ve prolaktin salgısını baskılar. [[K3 s. 213]] Kan–beyin bariyerini öncülü L-dopa geçer, dopamin geçemez. [[K3 s. 213]]</li>
<li><b>Sindirim.</b> Kemoreseptör tetik bölgenin uyarılması bulantı ve kusma yapar, gastrik geçiş süresi uzar. [[K3 s. 213]]</li>
<li><b>Etkileşim.</b> Doğrudan etkili bu aminin etkileri MAO inhibitörü altında belirgin biçimde güçlenip uzayabilir. [[K3 s. 213]]</li></ul>
<h3>Uygulama ve kinetik</h3><p>Yalnız intravenöz verilir, tercihen santral ven kullanılır. [[K3 s. 213]] Etki 5 dakika içinde başlar, 10 dakika sürer, yarı ömür yaklaşık 3 dakikadır. [[K3 s. 213]] Dozun yaklaşık %25’i sempatik sinir uçlarında noradrenaline dönüşür. [[K3 s. 213]]</p>
<p>Karaciğer, böbrek ve plazmada MAO ile COMT inaktif 3,4-dihidroksifenilasetik asit ve homovanilik asit (HVA) oluşturur. [[K3 s. 213]] Metabolitler sülfat ve glukuronid konjugatları halinde idrarla atılır. [[K3 s. 213]]</p>
</section>
<section class="wrap blk ders-sec" id="a13a-p1"><h2>Part I · MTF</h2><p>Her önermeyi doğru veya yanlış olarak işaretleyin.</p>
<div class="viz"><div data-viz="mtf" data-q="far13a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far13a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far13a-3"></div></div></section>
<section class="wrap blk ders-sec" id="a13a-p2"><h2>Part II · SOE 2 (Farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Üç doğal katekolamini dolaşım etkileri üzerinden karşılaştırın. Reseptör seçimi, verilme biçimi ve infüzyon hızı farkları nasıl açıklar?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>α₁ uyarısı düz kasta hücre içi Ca²⁺ miktarını artırıp vazokonstriksiyon yapar. [[K3 s. 210]]</li>
<li>β₁ kalbin hızını ve kasılma gücünü artırır, β₂ damar düz kasını gevşetir. [[K3 s. 210]]</li>
<li>Adrenalinde düşük dozla debi artar, diyastolik basınç düşebilir, yüksek dozda α₁ sistemik direnci yükseltir. [[K3 s. 210–211]]</li>
<li>Noradrenalin infüzyonunda vazokonstriksiyon ve basınç artışına refleks bradikardi eşlik edebilir, endojen salınım ise taşikardi yapar. [[K3 s. 212]]</li>
<li>Dopaminde düşük hızda β₁, daha yüksek hızda çoğunlukla α yanıtı öne çıkar, ayrıca endojen noradrenalin salınır. [[K3 s. 213]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Adrenalin için düşük ve yüksek dozdan, noradrenalin için sinir ucu ve infüzyondan, dopamin için iki infüzyon hızından ilgili dolaşım yanıtına ok çekin. [[K3 s. 210–213]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Noradrenalinin geri alım yolları nasıl ayrılır? [[K3 s. 212]] Dopaminle diürez artışının olası açıklamaları nelerdir? [[K3 s. 213]]</div></div></section>
<section class="wrap blk ders-sec" id="a13a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Otonom ganglionda miyelinli preganglionik lif ACh salgılar, nikotinik reseptör uyarılır. [[K3 s. 208]]</li>
<li>α₁ sinyalinde IP₃ ve Ca²⁺, β sinyalinde cAMP artar, α₂ ve D₂ sinyalinde cAMP azalır. [[K3 s. 210]]</li>
<li>Adrenalinde doz yükseldikçe damar direncini artıran α₁ etkisi öne çıkar. [[K3 s. 210–211]]</li>
<li>Noradrenalin infüzyonu kan basıncını yükseltirken kalp debisi düşebilir. [[K3 s. 212]]</li>
<li>Dopaminde 10 µg.kg⁻¹.min⁻¹’ye kadar β₁ etkileri baskındır, daha yüksek hızlarda α etkileri baskın olma eğilimindedir. [[K3 s. 213]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="13a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/12d">← 12d · Geri döndürücü ajanlar</a><a href="#/dersler/farmakoloji/13b">Sonraki: 13b · Sentetik sempatomimetikler →</a></nav></section>`
};
