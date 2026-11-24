VERI.sorular = VERI.sorular || {};
VERI.sorular['far04-1'] = {
  no: 1, kok: 'Preparatlar, emilim ve dağılım', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 40–41]]',
  onermeler: [
    { t: 'Gliseril trinitrat için polivinil klorür set tercih edilir.', d: false, n: 'Polivinil klorür ilacı absorbe ettiğinden polietilen set tercih edilir. [[K3 s. 40]]' },
    { t: 'Migren sırasında metoklopramid, analjeziğin emilimini hızlandırabilir.', d: true, n: 'Metoklopramid gastrointestinal stazı azaltır. [[K3 s. 41]]' },
    { t: 'Bağırsaktaki P-glikoprotein ilaçları lümenden hücreye pompalar.', d: false, n: 'Pompanın taşıma yönü hücreden lümene doğrudur. [[K3 s. 41]]' },
    { t: 'Önceden verilen β-bloker, süksametonyum sonrası fasikülasyonun başlama zamanını etkileyebilir.', d: true, n: 'β-bloker kalp debisini azaltabilir ve kalp debisi fasikülasyona kadar geçen sürenin başlıca belirleyicisidir. [[K3 s. 41]]' },
    { t: 'Dikobalt edetat kurşun zehirlenmesinde kullanılan şelatördür.', d: false, n: 'Kurşunu sodyum kalsiyum edetat, siyanürü dikobalt edetat bağlar. [[K3 s. 41]]' },
  ],
};
VERI.sorular['far04-2'] = {
  no: 2, kok: 'Metabolizma ve atılım', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 41–43]]',
  onermeler: [
    { t: 'Amiodaron S-varfarinin CYP2C9 aracılı metabolizmasını inhibe eder.', d: true, n: 'Aktif varfarin düzeyi yükselebilir ve koagülopati gelişebilir. [[K3 s. 41]]' },
    { t: 'Deksametazon CYP3A4 indüksiyonuyla vekuronyumun etki süresini uzatır.', d: false, n: 'İndüksiyon yıkımı hızlandırır ve vekuronyumun etki süresini kısaltır. [[K3 s. 42]]' },
    { t: 'Greyfurt suyu CYP3A4 etkinliğini inhibe eder.', d: true, n: 'Greyfurt suyu bu izoenzimin inhibitörüdür. [[K3 s. 42]]' },
    { t: 'İdrarın alkalileşmesi aspirinin renal atılımını artırır.', d: true, n: 'Aspirin, alkali idrarda atılımı artan zayıf asitlerdendir. [[K3 s. 42]]' },
    { t: 'Probenesid penisilinin böbrekten atılımını hızlandırır.', d: false, n: 'Probenesid atılımı yavaşlatarak penisilinin etkisini artırır. [[K3 s. 43]]' },
  ],
};
VERI.sorular['far04-3'] = {
  no: 3, kok: 'Farmakodinamik etkileşimler ve eşit etki eğrileri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 42–44]]',
  onermeler: [
    { t: 'Neostigmin, nondepolarizan kas gevşeticiyi nikotinik reseptörden doğrudan uzaklaştırır.', d: false, n: 'Neostigmin asetilkolinesterazı inhibe eder ve reseptörde gevşeticiyle yarışan asetilkolin artar. [[K3 s. 43]]' },
    { t: 'Nalokson ile opioid arasındaki etkileşim kompetitif antagonizmadır.', d: true, n: 'Nalokson bu doğrudan etkileşimle opioid etkisini geri çevirir. [[K3 s. 42]]' },
    { t: 'Milrinon ve adrenalin hücre içi cAMP artışında birleşir.', d: true, n: 'Milrinon fosfodiesterazı inhibe eder, adrenalin G proteinine kenetli reseptörü uyarır. [[K3 s. 43]]' },
    { t: 'Sumasyonda her iki ilacın da bağımsız etkisi vardır.', d: true, n: 'Birlikte gözlenen etki bu bağımsız etkilerin toplamıdır. [[K3 s. 43]]' },
    { t: 'Tek başına etkili konsantrasyonların ½ ve ¼’üyle aynı hedefe ulaşılması sinerjizmi düşündürür.', d: true, n: 'A yarı düzeydeyken B’nin dörtte biri yeterlidir, nokta aditivite doğrusunun altında kalır. [[K3 s. 44]]' },
  ],
};

const A04_NAV = [['tur','Etkileşim türleri'],['dagilim','Emilim ve dağılım'],['metabolizma','Metabolizma ve atılım'],['yanit','Reseptör ve yanıt'],['esetki','Eşit etki'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/04'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 4', baslik: 'İlaç etkileşimi',
  lede: 'Bir ilaç diğerinin etkisini artırabilir veya azaltabilir. [[K3 s. 40]] Bu değişim istenmeyen bir etkiye yol açabileceği gibi tedavide de kullanılabilir. [[K3 s. 40]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A04_NAV.map(([id,ad]) => `<button type="button" data-scroll="a04-${id}">${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a04-tur">
<h2>Etkileşim nerede başlıyor?</h2>
<p class="intro">Etkileşimi sınıflandırmak için neyin değiştiğine bakın: preparatın özelliği, vücudun ilacı işleme biçimi veya ilacın oluşturduğu yanıt. [[K3 s. 40]]</p>
<div class="viz"><div class="viz-head"><h3>Preparattan yanıta</h3></div><div data-viz="a04_tur"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 40–42]]</p></div>
<p>İlaç sayısıyla birlikte anlamlı etkileşim olasılığı belirgin artar, eşlik eden hastalık ise sonuçları sıklıkla ağırlaştırır. [[K3 s. 40]] Geçmişte altı ilaç çizelgesinden birine kadarında anlamlı etkileşim saptanırken bugün elektronik reçete sistemleri uyarı verebilir. [[K3 s. 40]]</p>
<p>Komplikasyonsuz genel anestezide bile on veya daha fazla ajan kullanılabilir. [[K3 s. 40]] Bunlar kendi aralarında veya daha sık olarak hastanın zaten kullandığı ilaçlarla etkileşebilir. [[K3 s. 40]]</p>
<h3>Farmasötik geçimsizlik nasıl fark edilir?</h3>
<div class="tbl-wrap"><table class="tbl a04-tablo"><thead><tr><th>Bir araya gelenler</th><th>Fiziksel veya kimyasal sonuç</th></tr></thead><tbody>
<tr><th>Sodyum bikarbonat ve kalsiyum</th><td>Aynı setten birlikte verildiklerinde kalsiyum karbonat çöker. [[K3 s. 40]]</td></tr>
<tr><th>İnsülin ve dekstroz çözeltisi</th><td>Görünür değişiklik olmadan insülin denatüre olabilir ve etkisini kaybedebilir. [[K3 s. 40]]</td></tr>
<tr><th>Paraldehit ve enjektör</th><td>İlaç ekipmanla reaksiyona girebildiğinden paraldehit cam enjektörle uygulanır. [[K3 s. 40]]</td></tr>
<tr><th>Gliseril trinitrat ve set</th><td>Polivinil klorür ilacı absorbe eder, bu nedenle polietilen set tercih edilir. [[K3 s. 40]]</td></tr>
</tbody></table></div></section>

<section class="wrap blk ders-sec" id="a04-dagilim">
<h2>Emilim ve dağılım</h2>
<p class="intro">Bir ilaç bağırsaktan kana ulaşırken lümende bağlanma, bağırsak hareketleri ve hücreden lümene geri taşınma emilimi değiştirebilir. [[K3 s. 40–41]]</p>
<div class="viz"><div class="viz-head"><h3>Bağırsakta geri taşıma değişirse</h3></div><div data-viz="a04_pgp"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 41]]</p></div>
<ul class="ozet">
<li><b>Lümende bağlanma.</b> Buharla aktivasyon kömürde çatlaklar açarak yüzey alanını genişletir. [[K3 s. 40–41]] Kömür midedeki ilaçları yüzeyine adsorbe ederek emilmelerini önleyebilir. [[K3 s. 40]]</li>
<li><b>Geçiş hızı.</b> Migrenle gelişen gastrointestinal stazı azaltan metoklopramid, birlikte verilen analjeziğin emilimini hızlandırarak tedaviye yardımcı olur. [[K3 s. 41]]</li>
<li><b>Geri taşıma.</b> P-glikoprotein (PGP), bağırsak boyunca hücrelerin lümene bakan zarında bulunan bir efluks taşıyıcısıdır. [[K3 s. 41]] Birçok ilacı lümene geri pompalar ve böylece oral biyoyararlanımı düşürür. [[K3 s. 41]]</li>
</ul>
<h3>Kana geçen ilacın dağılımını ne değiştirir?</h3>
<div class="cols"><div class="card"><h4>Kan akımı</h4><p>β-blokerlerle kalp debisi düşerse emilmiş ilacı etki yerine taşıyan kan akımı azalır. [[K3 s. 41]] Süksametonyumdan ilk fasikülasyona kadar geçen süreyi başlıca kalp debisi belirler, bu nedenle önceden verilen bir β-blokerin etkisi önemlidir. [[K3 s. 41]]</p><p>Bölgesel akımlar aynı ölçüde değişmeyebilir: karaciğer akımındaki görece büyük düşüş eliminasyonu yavaşlatabilir. [[K3 s. 41]]</p></div>
<div class="card"><h4>Şelasyon</h4><p>Şelatör toksik elementi bağlayarak doku hasarını önler ve doz aşımında veya hemokromatozdaki demir yüklenmesinde kullanılabilir. [[K3 s. 41]]</p><ul><li>Kurşun zehirlenmesinde sodyum kalsiyum edetat yavaş intravenöz infüzyonla verilir. [[K3 s. 41]]</li><li>Dikobalt edetat siyanür iyonlarını bağlar ve uzun sodyum nitroprussid infüzyonundan sonra gelişebilen siyanür zehirlenmesinde kullanılır. [[K3 s. 41]]</li></ul></div></div>
<h3>Protein bağlanması mı, metabolizma mı?</h3>
<p>Bağlanma yerleri için yarışmanın birçok etkileşimi açıkladığı öne sürülmüştür, ancak bu genellikle doğru değildir. [[K3 s. 41]] Yalnızca proteinlere yüksek oranda bağlanan ve terapötik düzeyde metabolik enzimleri doygunluğa yaklaşan ilaçlarda önemlidir. [[K3 s. 41]]</p>
<ul class="ozet"><li><b>Fenitoin.</b> Terapötik aralığın üst ucunda başka bir ilaç fenitoini yerinden ederse bağlanma %10 azalarak %90’dan %81’e düşebilir. [[K3 s. 41]] Serbest fenitoin neredeyse iki katına çıkar. [[K3 s. 41]] Hepatositler metabolizmayı artırsa da enzimler kolayca doyar, sıfırıncı derece kinetiğe geçilir ve plazma düzeyi yüksek kalır. [[K3 s. 41]]</li>
<li><b>Varfarin.</b> Protein bağlanmasına atfedilen etkileşimlerin çoğunda asıl değişen, ilacın metabolize edilme kapasitesidir. [[K3 s. 41]] Pratikte en sık örnek, varfarin tedavisine amiodaron eklenmesidir. [[K3 s. 41]] Amiodaron S-varfarinin CYP2C9 aracılı yıkımını baskılar, aktif formun düzeyi belirgin artabilir ve iyatrojenik koagülopati gelişebilir. [[K3 s. 41]] Bir nonsteroid antiinflamatuvar olan fenilbutazon da benzer etkileşim gösterir. [[K3 s. 41]]</li></ul></section>

<section class="wrap blk ders-sec" id="a04-metabolizma">
<h2>Metabolizma ve atılım</h2>
<p class="intro">Bir enzimi baskılamanın sonucu, enzimin ilacı inaktive etmesine veya aktif metaboliti oluşturmasına bağlıdır. [[K3 s. 42]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı enzim değişikliği, hangi sonuç?</h3></div><div data-viz="a04_enzim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 42]]</p></div>
<div class="tbl-wrap"><table class="tbl a04-tablo"><thead><tr><th>Etken</th><th>Enzim ve sonuç</th></tr></thead><tbody>
<tr><th>Antikonvülzanlar ve deksametazon</th><td>CYP3A4 indüksiyonu vekuronyumun etkisini kısaltır. [[K3 s. 42]]</td></tr>
<tr><th>Rifampisin</th><td>CYP2B6, 2C9, 2D6 ve 3A4’ü indükleyebilir. [[K3 s. 42]]</td></tr>
<tr><th>Simetidin ve ranitidin</th><td>Simetidin CYP1A2, 2D6 ve 3A4 inhibisyonunda ranitidinden çok daha güçlüdür. [[K3 s. 42]]</td></tr>
<tr><th>Omeprazol ve klopidogrel</th><td>Öne sürülen mekanizmada omeprazol CYP2C19’u inhibe eder, klopidogrelin aktivasyonunu engeller ve antiagregan etkiyi azaltır. [[K3 s. 42]]</td></tr>
<tr><th>Yiyecek ve içecekler</th><td>Greyfurt suyu CYP3A4’ü baskılar, brokoli CYP1A2’yi ve etanol CYP2E1’i indükler. [[K3 s. 42]]</td></tr>
</tbody></table></div>
<p>Kitap losartanı da klopidogrel gibi sitokrom P450 ile aktivasyon gerektiren ön ilaçlar arasında sayar. [[K3 s. 42]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap losartanı aktivasyon gerektiren bir ön ilaç olarak tanımlar. Losartanın kendisi de başlıca aktif metaboliti de AT₁ reseptörünü antagonize eder.</div>
<p><b>Renal atılım.</b> Sodyum bikarbonatla idrar alkalileştiğinde aspirin ve barbitüratlar gibi zayıf asitlerin atılımı artar. [[K3 s. 42]] Aspirin doz aşımında diürez için sıvı infüzyonu, renal aspirin atılımını artırmak için de sodyum bikarbonat kullanılmıştır. [[K3 s. 42]]</p></section>

<section class="wrap blk ders-sec" id="a04-yanit">
<h2>Reseptörden klinik yanıta</h2>
<p class="intro">Doğrudan etkileşim aynı reseptör sisteminde gelişir, dolaylı etkileşimde farklı mekanizmalar aynı sonuca ulaşır. [[K3 s. 42]]</p>
<div class="viz"><div class="viz-head"><h3>Neostigmin kas gevşeticinin etkisini nasıl çözer?</h3></div><div data-viz="a04_kavsak"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 43]]</p></div>
<p>Anestezi ve yoğun bakımda yararlı etkileşimleri ve istenmeyen etkileri fark etmek için reçetedeki her ilacın mekanizmasını gözden geçirin. [[K3 s. 43]]</p>
<div class="tbl-wrap"><table class="tbl a04-tablo"><thead><tr><th>İlaçlar</th><th>Etkileşim yolu ve klinik sonuç</th></tr></thead><tbody>
<tr><th>Flumazenil veya nalokson</th><td>Doz aşımında kompetitif antagonizma ile flumazenil benzodiazepin, nalokson opioid etkisini geri çevirir. [[K3 s. 42]]</td></tr>
<tr><th>Fenilefrin ve α₁-blokerler</th><td>Benign prostat hiperplazisinde kullanılan alfuzosin, doksazosin, indoramin, prazosin, tamsulosin ve terazosin bu gruptadır. [[K3 s. 42]] Sık görülen ama gözden kaçabilen bu doğrudan etkileşim nedeniyle anesteziye bağlı hipotansiyonda α-agonist etkisiz kalabilir. [[K3 s. 42]]</td></tr>
<tr><th>Monoamin oksidaz inhibitörleri (MAOİ)</th><td>Petidin geri alımı baskılayarak MAOİ’nin oluşturduğu noradrenalin artışını dolaylı yoldan güçlendirir. [[K3 s. 42]] MAOİ serotonini de artırdığından selektif serotonin geri alım inhibitörleriyle veya yüksek doz fentanille serotonin sendromu tetiklenebilir. [[K3 s. 42]]</td></tr>
<tr><th>Milrinon ve adrenalin</th><td>Milrinon hücre içinde fosfodiesterazı inhibe eder, adrenalin G proteinine kenetli reseptörü uyarır. [[K3 s. 43]] İki pozitif inotrop da hücre içi cAMP’yi artırır ve birlikte kontraktiliteyi artırabilir. [[K3 s. 43]]</td></tr>
<tr><th>Ramipril ve β-bloker</th><td>Renin–anjiyotensin sistemi ve adrenoseptörler üzerinden kan basıncını aditif biçimde düşürürler. [[K3 s. 43]]</td></tr>
<tr><th>Diüretikler ve digoksin</th><td>Diüretikler potasyum düzeyini değiştirerek digoksin toksisitesine yol açabilir. [[K3 s. 43]]</td></tr>
</tbody></table></div></section>

<section class="wrap blk ders-sec" id="a04-esetki">
<h2>Birleşik etkiyi okumak</h2>
<p class="intro">İzobologram iki ilacın hangi konsantrasyonlarda birlikte aynı hedef etkiyi sağladığını gösterir. [[K3 s. 43–44]]</p>
<div class="viz"><div class="viz-head"><h3>A yarı düzeydeyken ne kadar B gerekir?</h3></div><div data-viz="a04_izobol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Eğriler şematiktir, işaretli konsantrasyon kesirleri kitaptaki örnektir. [[K3 s. 44]]</p></div>
<p>Adı Yunancada “eşit” (isos) ve “etki” (bolus) sözcüklerinden gelir. [[K3 s. 43]] A ve B tek başlarına hedefe sırasıyla a ve b mmol.L⁻¹ düzeyinde ulaşır. [[K3 s. 43–44]] Her eksendeki 1 o ilacın tek başına etkili konsantrasyonunu gösterir. [[K3 s. 44]]</p>
<p>İki eksendeki 1 noktalarını birleştiren doğru aditiviteyi gösterir, eğri doğrusal değilse ilaçlar etkileşmektedir. [[K3 s. 44]] Aynı yanıt için a/2 yanında b/2 yerine b/4 yeterliyse eğri konkavdır ve sinerjizmi düşündürür. [[K3 s. 44]] b/2’den fazlası gerekiyorsa eğri konvekstir ve antagonizmi düşündürür. [[K3 s. 44]]</p>
<div class="tbl-wrap"><table class="tbl a04-tablo"><thead><tr><th>Birleşik etki</th><th>Nasıl ayırt edilir?</th></tr></thead><tbody>
<tr><th>Sumasyon</th><td>Her ilaç tek başına etkilidir ve etkileri toplanır. [[K3 s. 43]] Kitap, anestezi indüksiyonunda midazolam ve propofol birlikte verildiğinde aynı etki için daha az propofol gerekmesini örnek verir. [[K3 s. 43]]</td></tr>
<tr><th>Potansiyalizasyon</th><td>Tek başına ilgili etkiyi göstermeyen ilaç, aktif ilacın etkisini güçlendirir. [[K3 s. 43]] Antibiyotik etkisi olmayan probenesid renal atılımı azaltarak bir doz penisilinin etkisini artırır. [[K3 s. 43]]</td></tr>
<tr><th>Sinerjizm</th><td>Birlikte etki beklenen toplamı aşar, sıklıkla farklı mekanizmalar benzer etkilere ulaşır. [[K3 s. 43]] Anestezi idamesinde propofol ve remifentanil buna örnektir. [[K3 s. 43]]</td></tr>
</tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap midazolam ve propofolü sumasyona örnek verir. İndüksiyonda sinerji gösterilmiştir ve propofol gereksinimindeki azalma tek başına aditiviteyi kanıtlamaz.</div>
<p>Tek ilacın tam dozunda advers etki kabul edilemezse beklenenden düşük birleşik etki bile yararlı olabilir. [[K3 s. 44]] Kitap, bazı hipertansiyon hastalarında ACE inhibitörü ile anjiyotensin II reseptör antagonistinin birlikte kullanılmasını örnek verir. [[K3 s. 44]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap ikili blokajı hipertansiyonda yararlı bir örnek olarak verir. Böbrek işlev bozukluğu, hiperkalemi ve hipotansiyon riski nedeniyle bu kombinasyon genellikle önerilmez, zorunlu seçilmiş durumlarda uzman gözetimi ve yakın izlem gerekir.</div></section>

<section class="wrap blk ders-sec" id="a04-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin ve gerekçenizi kontrol edin.</p>
<div class="viz"><div data-viz="mtf" data-q="far04-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far04-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far04-3"></div></div></section>
<section class="wrap blk ders-sec" id="a04-p2"><h2>Part II · SOE 2 (Farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>İlaç etkileşimlerini örneklerle sınıflandırın. İki ilacın aynı anestezik etkiye katkısını izobologramla nasıl değerlendirirsiniz?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Farmasötik geçimsizliğe örnek olarak aynı sette kalsiyum ve bikarbonatla oluşan çökeltiyi gösterin. [[K3 s. 40]]</li>
<li>Farmakokinetik etkileşim emilim, dağılım, metabolizma veya atılımı değiştirir. [[K3 s. 40–42]] Örneğin amiodaron S-varfarinin yıkımını yavaşlatır. [[K3 s. 41]]</li>
<li>Farmakodinamik etkileşimde nalokson opioid etkisini doğrudan antagonize eder, neostigmin ise asetilkolini artırarak nondepolarizan bloğu dolaylı yoldan çözer. [[K3 s. 42–43]]</li>
<li>Sumasyonda bağımsız etkiler toplanır, sinerjide toplam aşılır, potansiyalizasyonda ilaçlardan biri ilgili etkiyi tek başına göstermez. [[K3 s. 43]]</li>
<li>Hedef yanıtı sabit tutun ve A’nın konsantrasyon kesri ½ iken gereken B kesrini aditivite doğrusu ile karşılaştırın. [[K3 s. 44]]</li>
</ol><div class="note"><b>Çizin.</b> A ve B kesirlerini eksenlere yerleştirin, eksenlerdeki 1 noktalarını birleştirin. [[K3 s. 44]] A = ½ için B = ¼, ½ ve ¾ noktalarından geçen sinerjistik, aditif ve antagonistik eşit etki eğrilerini çizin. [[K3 s. 44]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Fenitoinin serbest düzeyi neden yüksek kalabilir? [[K3 s. 41]] Probenesid örneğinde potansiyalizasyonu hangi özellik ayırt ettirir? [[K3 s. 43]]</div></section>
<section class="wrap blk ders-sec" id="a04-ozet"><h2>Özet</h2><ul class="ozet">
<li>Farmasötik geçimsizlik görünür çökelti oluşturmadan da ilacı etkisizleştirebilir. [[K3 s. 40]]</li>
<li>PGP indüksiyonu duyarlı ilaçların oral biyoyararlanımını azaltabilir. [[K3 s. 41]]</li>
<li>Enzim inhibisyonu aktif ilacın yıkımını veya ön ilacın aktivasyonunu azaltabilir. [[K3 s. 42]]</li>
<li>Farklı mekanizmalar aynı klinik yanıta katkıda bulunabilir. [[K3 s. 42–43]]</li>
<li>İzobologramda aynı etki aditivite doğrusunun altındaki bir noktada sağlanıyorsa sinerji düşünülür. [[K3 s. 44]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="04"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/03b">← 03b · İlaç–reseptör etkileşimi: agonizm, antagonizm, tolerans</a><a href="#/dersler/farmakoloji/05">Sonraki: 5 · İzomerizm →</a></nav></section>`,
};
