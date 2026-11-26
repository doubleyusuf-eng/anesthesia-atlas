VERI.sorular = VERI.sorular || {};
VERI.sorular['an04b-1'] = {
  no: 1, kok: 'Köklerden kordlara', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 165–169]]',
  onermeler: [
    { t: 'Orta trunkus C6 ve C7 köklerinin birleşmesinden doğar.', d: false, n: 'C7 tek başına orta trunkus olarak devam eder. [[K5 s. 166]]' },
    { t: 'Postfikse pleksusta başlıca katkı C6–T2 düzeylerindendir.', d: true, n: 'Kök dağılımı aşağı kayar ve çoğunlukla birinci kosta anomalisi eşlik eder. [[K5 s. 165]]' },
    { t: 'Posterior kord üç trunkustan da lif alır.', d: true, n: 'Üç trunkusun arka bölümleri posterior kordda birleşir. [[K5 s. 168]]' },
    { t: 'Medial kord aksilla apeksinde arterin medialindedir.', d: false, n: 'Başlangıçta arterin arkasındadır. [[K5 s. 169]]' },
    { t: 'Median sinirin lateral başı posterior korddan ayrılır.', d: false, n: 'Lateral baş lateral korddan gelir ve C6–7 liflerini taşır. [[K5 s. 169]]' }
  ]
};
VERI.sorular['an04b-2'] = {
  no: 2, kok: 'Boyun kökünde komşuluklar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 166–173]]',
  onermeler: [
    { t: 'Alt trunkus birinci kostayı subklavyen arterin arkasında geçer.', d: true, n: 'Alt trunkus arter oluğunun arkasında ayrı bir iz bırakabilir. [[K5 s. 169]]' },
    { t: 'Ön fasyal yaprak ön skalen kasın ön yüzünü örter.', d: false, n: 'Ön tüberkülden uzanan yaprak ön skalenin arka yüzünü örter. [[K5 s. 166]]' },
    { t: 'Dış juguler ven arka üçgende trunkusları çaprazlar.', d: true, n: 'Yüzeyel trunkuslar dış juguler venin altındadır. [[K5 s. 169]]' },
    { t: 'Bölümler subklavius kasının gerisindedir.', d: true, n: 'Klavikula, subklavius ve supraskapular damarlar bölümlerin önündedir. [[K5 s. 169]]' },
    { t: 'Birinci kostayı dayanak almak pnömotoraks riskini ortadan kaldırır.', d: false, n: 'Dayanak riski azaltmayı amaçlar ancak plevra ponksiyonu hâlâ mümkündür. [[K5 s. 173]]' }
  ]
};
VERI.sorular['an04b-3'] = {
  no: 3, kok: 'Blok düzeyi ve beklenen dağılım', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 171–174]]',
  onermeler: [
    { t: 'El cerrahisinde interskalen blok alt trunkusu güvenilir biçimde kapsar.', d: false, n: 'Anestezik alt trunkusa sıklıkla ulaşmaz, bu da eldeki etkiyi sınırlar. [[K5 s. 172]]' },
    { t: 'Omuz cerrahisinde proksimal hedef seçimini supraskapular sinirin erken ayrılması açıklar.', d: true, n: 'Üst trunkustan çıkan bu sinir omuz eklemi innervasyonunun büyük bölümünü sağlar. [[K5 s. 171]]' },
    { t: 'Frenik sinir bloğu interskalen bloğa sık eşlik eder.', d: true, n: 'Kitap frenik, servikal pleksus ve servikal sempatik blokları sık eşlik eden bulgular arasında sayar. [[K5 s. 172]]' },
    { t: 'Aksiller yaklaşımda median, ulnar ve radial sinirler ayrı ayrı hedeflenebilir.', d: true, n: 'Çoklu enjeksiyon tekniğinde üç sinir tek tek saptanır. [[K5 s. 173–174]]' },
    { t: 'Muskülokütanöz sinir aksiller blok düzeyinden daha yukarıda ayrılabilir.', d: true, n: 'Bu sinir genellikle proksimalde ayrıldığı için sıklıkla ayrı bloke edilir. [[K5 s. 174]]' }
  ]
};

(() => {
  const nav = [['kok','Kök ve trunkus'],['oluk','İnterskalen oluk'],['kosta','Birinci kosta'],['kord','Kord ve dallar'],['aksilla','Aksiller blok'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  const resim = (id, ad) => `<div class="viz"><div class="viz-head"><h3>${ad}</h3></div><div data-viz="an04b_${id}"></div><p class="viz-cap" aria-live="polite"></p></div>`;
  SAYFALAR['dersler/anatomi/04b'] = {
    grup:'dersler', eyebrow:'Anatomi · Bölüm 4 · Ders 04b', baslik:'Brakiyal pleksus: oluşum, komşuluk ve blok yaklaşımları',
    lede:'Brakiyal pleksus üst ekstremitenin motor innervasyonunu ve duyusunun hemen tamamını sağlar. [[K5 s. 165]] Boyundan aksillaya doğru blok düzeyi değiştikçe lokal anesteziğin ulaşabileceği sinirler de değişir. [[K5 s. 171–174]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="an04b-${id}"><span>${i+1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an04b-kok">
<h2>Beş kökten üç trunkusa</h2><p class="intro">C5–C8 ön dalları ile T1 ön dalının büyük bölümü, ön ve orta skalen kaslar arasında üç trunkus oluşturur. [[K5 s. 165–166]]</p>
${resim('kok','Boyun kökünde pleksusun başlangıcı')}
<ul class="ozet">
<li><b>Köklerin yolu.</b> Beş kök intervertebral foramenlerden çıkar. [[K5 s. 165]] C5–C7 kökleri, vertebral damarları taşıyan transvers foramenin arkasından geçip kendi transvers çıkıntılarının ön ve arka tüberkülleri arasındaki oluğa oturur. [[K5 s. 165]] Skalen kaslar arasında kökler subklavyen arterin ikinci bölümünün üzerindedir. [[K5 s. 168]]</li>
<li><b>Birleşme.</b> C5 ile C6 üst trunkusta, C8 ile T1 alt trunkusta birleşir, C7 ise orta trunkus olarak yoluna devam eder. [[K5 s. 166]]</li>
<li><b>Varyasyon.</b> C4 ve T2 sıkça ek lif verir. [[K5 s. 165]] Esas katkı C4–C8 ise prefikse pleksusa çoğunlukla servikal kosta, C6–T2 ise postfikse pleksusa çoğunlukla anormal birinci kosta eşlik eder. [[K5 s. 165]]</li>
<li><b>Sempatik bağlantı.</b> Gri bağlantı dalları C5–C6’ya orta servikal gangliondan, C7–C8’e alt servikal gangliondan, T1’e kendi ganglionundan gelir. [[K5 s. 169]]</li>
<li><b>Boyunda ayrılan dallar.</b> Kökler longus servisis ve skalen kaslara (C5–C8), romboidlere (C5), serratus anteriora (C5–C7) dal verir, C5 frenik sinire de katılır. [[K5 s. 169]] Trunkus düzeyinde subklavius siniri ile supraskapular sinir ayrılır, her ikisi de C5–C6 lifleri taşır. [[K5 s. 169]] Kök ve trunkus dalları supraklavikülerdir, pleksusun dağılımının büyük bölümünü ise infraklaviküler dallar üstlenir. [[K5 s. 170]]</li>
<li><b>Romboid siniri (C5).</b> C5 kökünden çıkar, orta skaleni deler, levator scapulae’nin derin yüzünden geçerek romboid kasları innerve eder. [[K5 s. 174]]</li>
<li><b>Serratus anteriorun siniri (Bell siniri, C5–C7).</b> C5 ve C6 lifleri orta skaleni deler, C7 lifleri kasın ön yüzünden geçer. C7 katkısı her zaman bulunmaz. [[K5 s. 174]] Üç kök birleşir. Ortak gövde birinci kostanın üzerinden, aksilla medial duvarında serratus anteriorun üzerinden inerek kasın her dişini innerve eder. [[K5 s. 174]]</li>
<li><b>Supraskapular sinir (C5–C6).</b> Üst trunkustan çıkar, arka üçgeni geçip trapezin derininden ilerler ve supraskapular bağın köprülediği çentikten geçer. [[K5 s. 174]] Supraspinatus ve infraspinatusun derininden inerek ikisini de innerve eder, ayrıca omuz ekleminin duyusunu sağlar. [[K5 s. 174]]</li>
<li><b>Subklavius siniri (C5–C6).</b> Üst trunkustan çıkan küçük sinirdir. Pleksusun ve subklavyen arterin üçüncü bölümünün önünden, subklavyen venin arkasından inerek subklavius kasını innerve eder. [[K5 s. 174]] Bazen frenik sinire katkıda bulunur. [[K5 s. 174]]</li>
</ul>
<details class="note plain"><summary>Şekli okuyun · C7’yi iki yönde izleyin</summary>
<p>Önce orta trunkusu bulun ve omurgaya doğru izleyin. [[K5 s. 166]] Burada tek bir köke, C7’ye dönersiniz. [[K5 s. 166]] Aynı izlemi üst trunkustan başlatırsanız C5 ve C6’ya, alt trunkustan başlatırsanız C8 ve T1’e ulaşırsınız. [[K5 s. 166]] T1’in ön dalını izlerken birinci interkostal siniri de hesaba katın, çünkü dalın yalnız büyük bölümü pleksusa girer. [[K5 s. 165–166]]</p>
<p>Şimdi C7’yi ekstremiteye doğru takip edin. [[K5 s. 166–168]] Orta trunkusun ön bölümü lateral korda, arka bölümü posterior korda katılır. [[K5 s. 168]] Böylece tek kökten gelen liflerin iki ayrı kordda nasıl bulunabildiğini çizim üzerinde açıklayabilirsiniz. [[K5 s. 166–168]]</p></details></section>
<section class="wrap blk ders-sec" id="an04b-oluk">
<h2>İnterskalen oluk ve omuz analjezisi</h2><p class="intro">Omuz ekleminin innervasyonunda büyük payı olan supraskapular sinir, üst trunkustan erken ayrılır. [[K5 s. 171]] Bu nedenle omuz cerrahisinde pleksus proksimalden hedeflenir. [[K5 s. 171]]</p>
${resim('oluk','C6 düzeyinde skalen kaslar arasındaki aralık')}
<ul class="ozet">
<li><b>Kılıfı iki yüz arasında izleyin.</b> Tüberküller arasındaki oluktan çıkan kökler, iki fibröz yaprak arasındaki yağlı bağ dokusuna girer. [[K5 s. 166–167]] Ön yaprak ön tüberküllerden ön skalenin arka yüzüne, arka yaprak arka tüberküllerden orta skalenin ön yüzüne uzanır. [[K5 s. 166]] Kılıf lateralde pleksusu sarar ve kuramsal olarak aksillaya kadar kesintisizdir. [[K5 s. 166]] Tek enjeksiyonun mantığı, çözeltinin kılıf içinde kalarak o düzeydeki sinirlerin tümüne ulaşabilmesidir. [[K5 s. 166]]</li>
<li><b>Hedef ve etki.</b> C6 düzeyindeki olukta kökler ve proksimal trunkuslar bulunur. [[K5 s. 171–172]] Kitabın döneminde omuz cerrahisinde rutin kullanılan interskalen yaklaşım omuzda, kolun dış yüzünde ve distal klavikulada çok iyi analjezi sağlar. [[K5 s. 171–172]] Alt trunkusa sıklıkla yeterli anestezik ulaşmadığından elde etkisi daha zayıftır. [[K5 s. 172]]</li>
<li><b>Kitaptaki teknik tarif.</b> Klasik tarifte iğne tüm düzlemlerde cilde dik ilerlerken, kitap daha kaudale yönelen açının da sık önerildiğini gösterir. [[K5 s. 171–172]] Gerçek zamanlı ultrasonda düzlem içi yaklaşımda iğnenin tüm uzunluğu görülmeli, düzlem dışında ise ilerleme doku hareketinden anlaşılmalıdır. [[K5 s. 172]] Ekojenik iğne görünürlüğü artırmak için geliştirilmiştir, ultrason kullanımı daha az iğne geçişi ve daha kısa blok başlangıcıyla ilişkilidir. [[K5 s. 171]]</li>
<li><b>Sinire yakınlığın değerlendirilmesi.</b> Ultrasonla yer saptandıktan sonra stimülasyon iğnesiyle deltoid veya biseps brakii kasılması aranabilir. [[K5 s. 171–172]] K5, 30 mL’ye kadar lokal anestezik kullanımını, süreyi uzatmak için klonidin veya deksametazon eklenmesini ve kateter tekniklerini aktarır. [[K5 s. 172]]</li>
<li><b>Yakın komşular.</b> Servikal pleksus, servikal sempatik zincir ve frenik sinirin blokajı sık eşlik eden bulgulardır. [[K5 s. 172]] Vertebral artere veya dış juguler vene enjeksiyon ciddi sonuç doğurabilir. [[K5 s. 172]] İğnenin nöraksise ulaşması epidural ya da subaraknoid enjeksiyon olasılığı nedeniyle özellikle kaygı vericidir. [[K5 s. 172]]</li></ul>
<details class="note plain"><summary>Sözlü sınavda · Blok düzeyinden etki alanına</summary><p>Omuz ile eli ayrı değerlendirin. [[K5 s. 171–172]] Omuz için belirleyici soru, çözeltinin supraskapular sinir üst trunkustan ayrılmadan önce pleksusa ulaşıp ulaşmadığıdır. [[K5 s. 171]] El içinse aynı proksimal enjeksiyonun alt trunkusa yayılması önemlidir. [[K5 s. 172]] Omuzda güçlü analjezi varken elde yetersiz blok görülmesini bu iki anatomik ilişki birlikte açıklar. [[K5 s. 171–172]]</p></details></section>
<section class="wrap blk ders-sec" id="an04b-kosta">
<h2>Arka üçgenden birinci kostaya</h2><p class="intro">Skalen aralıktan çıkan üç trunkus birbirine yakın seyreder, aşağı ve dışa yönelerek önce arka üçgenin tabanını, sonra birinci kostayı aşar. [[K5 s. 168]]</p>
${resim('kosta','Subklavyen damarlar, pleksus ve birinci kosta')}
<ul class="ozet">
<li><b>Yüzeyden derine.</b> Arka üçgende prevertebral fasya kılıfındaki trunkusları deri, platizma ve derin fasya örter. [[K5 s. 168–169]] Omohiyoidin alt karnı, dış juguler ven, transvers servikal arter ve supraklaviküler sinirler trunkusları çaprazlar. [[K5 s. 169]] Zayıf kişilerde trunkuslar palpasyonda parmak altında yuvarlanabilir. [[K5 s. 169]]</li>
<li><b>Kosta üzerinde.</b> Üst ve orta trunkuslar subklavyen arterin üstünde, alt trunkus arkasındadır. [[K5 s. 169]] Alt trunkus arter oluğunun hemen gerisinde kostaya iz bırakabilir. [[K5 s. 169]]</li>
<li><b>Yaklaşım seçimi.</b> Skalen aralık ile birinci kosta arasında supraklaviküler, intersternokleidomastoid ve subklavyen perivasküler yaklaşımlar tanımlanmıştır. [[K5 s. 168]] Periklaviküler bloklarda amaç, pleksusun bütünü klavikula arkasından geçerken lokal anesteziği sinirlerin çevresine ulaştırmaktır. [[K5 s. 171]] Seçimde istenen analjezi alanı ve plevra ponksiyonuna bağlı pnömotoraks riski öne çıkar. [[K5 s. 171–173]]</li>
<li><b>Subklavyen perivasküler yaklaşım.</b> Kitaptaki tarif C6’daki oluğu aşağıya, skalenlerin birinci kostaya tutunduğu yere kadar izler. [[K5 s. 173]] Arter nabzı alınabiliyorsa hedef hemen posteriorundadır. [[K5 s. 173]] İğne çoğunlukla ultrasonla klavikula ekseninde, düzlem içinde ilerletilir. [[K5 s. 173]] Stimülasyonda önkol veya el kasları kasılır, tarif edilen hacim 30 mL’ye kadardır. [[K5 s. 173]]</li>
<li><b>Kapsam ve risk.</b> Tüm kolda analjezi amaçlanabilse de ulnar alanda etki bazen yetersizdir. [[K5 s. 173]] Kosta dayanak alınarak plevranın delinme riski azaltılmaya çalışılır. [[K5 s. 173]] Deneyimli ellerde sıklığının düşük olması beklense de pnömotoraks gelişebilir, yakın subklavyen damarlar da intravasküler enjeksiyona zemin hazırlar. [[K5 s. 173]]</li></ul></section>
<section class="wrap blk ders-sec" id="an04b-kord">
<h2>Klavikula arkasındaki bölümler ve aksilladaki kordlar</h2><p class="intro">Birinci kostanın lateral kenarında her trunkus ön ve arka bölüme ayrılır. [[K5 s. 168–169]] Altı bölümün aksilla apeksinde oluşturduğu üç kord, aksiller artere göre adlandırılır. [[K5 s. 168–169]]</p>
${resim('kord','Aksiller arter çevresinde kordlar ve median sinirin başları')}
<p>Bölümler klavikulanın, subklaviusun ve klavikula arkasındaki supraskapular damarların gerisinden aksillaya iner. [[K5 s. 169]] Apekste medial kord arterin arkasında, lateral ve posterior kordlar arterin lateralindedir. [[K5 s. 169]] Kordlar adlarına uyan konuma pektoralis minörün arkasında gelir. [[K5 s. 169]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Kord</th><th>Hangi bölümler birleşir?</th><th>Hangi sinirler ayrılır?</th></tr></thead><tbody>
<tr><th>Lateral</th><td>Üst ve orta trunkusun ön bölümleri (C5–C7). [[K5 s. 168]]</td><td>Lateral pektoral ve müskülokütanöz sinirler (C5–C7), median sinirin lateral başı (C6–C7). [[K5 s. 169]]</td></tr>
<tr><th>Medial</th><td>Alt trunkusun ön bölümü (C8–T1). [[K5 s. 168]]</td><td>Medial pektoral sinir, kol ve önkolun medial kutanöz sinirleri, median sinirin medial başı (her biri C8–T1) ve ulnar sinir (C7–C8, T1). [[K5 s. 170]]</td></tr>
<tr><th>Posterior</th><td>Her üç trunkusun arka bölümleri (C5–T1). [[K5 s. 168]]</td><td>Üst ve alt subskapular sinirler (C5–C6), aralarında torakodorsal sinir (latissimus dorsi, C6–C8), aksiller sinir (C5–C6) ve radial sinir (C5–T1). [[K5 s. 166]] [[K5 s. 170]]</td></tr></tbody></table></div>
<details class="note plain"><summary>Diseksiyonu okuyun · Kordları adlandırmak için düzeyi seçin</summary>
<p>Arteri aksilla apeksinden pektoralis minörün arkasına doğru izleyin. [[K5 s. 169]] Apekste arterin lateralinde gördüğünüz sinir dokusu hem posterior hem lateral korda ait olabilir. [[K5 s. 169]] Aynı yerde arterin arkasındaki kord medial korddur. [[K5 s. 169]] Bu nedenle bir kordun konumunu anlatırken önce damarın hangi düzeyine baktığınızı belirtin. [[K5 s. 169]]</p>
<p>K5’in üst kol diseksiyonunda trapez, deltoid, pektoralis majör ve minör kasları ile birinci kosta işaretlenir. [[K5 s. 170]] Pektoralis majör geriye çevrildiğinde lateral ve medial pektoral sinirler, serratus anterior ve latissimus dorsi sinirleri ile alt subskapular sinir ayırt edilir. [[K5 s. 170]] Damar işaretleri arasında akromiyotorasik trunkus, lateral torasik arter, sefalik ven ve distalde brakiyal arter ile ven bulunur. [[K5 s. 170]]</p></details>
<p>Pektoralis minörün lateral kenarında lateral ve medial kordlar median sinirin iki başını verir. [[K5 s. 168]] Bu kenarın ötesinde lateral kord müskülokütanöz, medial kord ulnar, posterior kord radial ve aksiller sinirlerle sonlanır. [[K5 s. 168]]</p>
<p>Birinci kosta ile aksilla arasında infraklaviküler, vertikal infraklaviküler ve korakoid yaklaşımlar tanımlanmıştır. [[K5 s. 168]] İnfraklaviküler ve aksiller yaklaşımlarda amaç önkol ve eli innerve eden sinirlere ulaşmaktır. [[K5 s. 171]]</p></section>
<section class="wrap blk ders-sec" id="an04b-aksilla">
<h2>Aksiller yaklaşımda hangi sinirler kalır?</h2><p class="intro">Üst aksillada median, ulnar ve radial sinirler humerus boyunca aksiller arter ve vene eşlik eder. [[K5 s. 173]] Aksiller blok bu üç terminal siniri hedefler. [[K5 s. 173]]</p>
${resim('aksilla','Üst kolda damar ve sinir demeti')}
<ul class="ozet">
<li><b>Dağılım.</b> Omuz ve üst kola giden dallar bu düzeyin üzerinde ayrılmıştır, bu nedenle blok özellikle dirsek, önkol ve el için uygundur. [[K5 s. 174]] Müskülokütanöz sinir de genellikle daha proksimalde ayrılır ve sıklıkla ayrıca bloke edilir. [[K5 s. 174]]</li>
<li><b>Yüzey işareti.</b> K5’teki tarifte kol gövdeyle 90° yapacak biçimde abdüksiyona alınır ve aksiller nabız olabildiğince proksimalde aranır. [[K5 s. 174]] Arterin yanından girişte elde parestezi, stimülatör kullanılırsa hedef sinirlerden birinin kaslarında kasılma aranır. [[K5 s. 174]]</li>
<li><b>Yayılım.</b> Tek enjeksiyon, sinir ve damarları ortak bir fasya kılıfının sardığı görüşüne dayanır. [[K5 s. 174]] Kitap bu teknikte 30–60 mL, üç sinirin ayrı ayrı bulunduğu çoklu enjeksiyonda ise sinir başına 10 mL lokal anestezik tarif eder. [[K5 s. 174]]</li></ul>
<details class="note plain"><summary>Yaklaşımları karşılaştırın · Ulnar alanda analjezi</summary><p>İnterskalen bloktan sonra elde yetersiz analjezi varsa çözeltinin alt trunkusa ulaşmamış olabileceğini düşünün. [[K5 s. 172]] Birinci kosta düzeyinde trunkuslar bir arada olsa da subklavyen perivasküler blokta ulnar sinirin alanında analjezi bazen eksik kalabilir. [[K5 s. 168]] [[K5 s. 173]] Aksillaya geldiğinizde ise ulnar sinir, median ve radial sinirle birlikte tek tek saptanabilecek üç hedeften biridir. [[K5 s. 173–174]]</p></details>
<h3>Sinir Bloğu Atlası</h3><nav class="an04b-atlas" aria-label="Sinir Bloğu Atlası">
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=interskalen">İnterskalen blok</a>
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=supraklavikuler">Supraklaviküler blok</a>
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=infraklavikuler">İnfraklaviküler blok</a>
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=aksiller">Aksiller blok</a></nav></section>
<section class="wrap blk ders-sec" id="an04b-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="an04b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an04b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an04b-3"></div></div></section>
<section class="wrap blk ders-sec" id="an04b-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Omuz cerrahisi için interskalen yaklaşımı neden seçersiniz? Aynı hastada girişim el cerrahisi olsaydı hedefiniz nasıl değişirdi?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Omuz ekleminin başlıca sinirlerinden supraskapular sinir üst trunkustan erken ayrılır. [[K5 s. 171]]</li><li>C6 düzeyinde ön ve orta skalenler arasındaki kök ve proksimal trunkuslara ulaşılır. [[K5 s. 171–172]]</li><li>İnterskalen blokta alt trunkus sıklıkla eksik tutulur ve el analjezisi sınırlı kalır. [[K5 s. 172]]</li><li>Aksillada median, radial ve ulnar sinirler damarların yanında hedeflenebilir, müskülokütanöz sinir ise genellikle daha yukarıda ayrılmıştır. [[K5 s. 173–174]]</li></ol>
<div class="note"><b>Çizin.</b> Beş kökü, üç trunkusu, altı bölümü ve üç kordu çizip birinci kosta, klavikula ve aksiller arteri ekleyin. [[K5 s. 165–169]]</div>
<div class="note plain"><b>Ek sorular.</b> Birinci kosta düzeyinde hangi trunkus arterin arkasındadır? Pektoralis minörün arkasına gelince medial kordun konumu nasıl değişir? İnterskalen blokta hangi sinir blokları sık eşlik eder? [[K5 s. 169]] [[K5 s. 172]]</div></section>
<section class="wrap blk ders-sec" id="an04b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Skalen aralıkta C5–T1 kökleri üç trunkusta toplanır, klavikula arkasındaki altı bölüm aksillada üç korda dönüşür. [[K5 s. 165–168]]</li>
<li>Omuz için proksimal hedefi supraskapular sinirin erken ayrılması, el için distal hedefi alt trunkusun interskalen blokta sıklıkla korunması açıklar. [[K5 s. 171–172]]</li>
<li>Birinci kosta perivasküler yaklaşımda dayanak sağlar, yakın plevra ve subklavyen damarlar komplikasyon riskini belirler. [[K5 s. 173]]</li>
<li>Aksiller yaklaşımda median, ulnar ve radial sinirler aranır, müskülokütanöz sinir ayrıca değerlendirilir. [[K5 s. 173–174]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="04b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/04a">← Spinal sinirler, servikal pleksus ve stellat gangliyon</a><a href="#/dersler/anatomi/04c">Sonraki: Brakiyal pleksus dalları ve üst ekstremite segmental innervasyonu →</a></nav></section>`
  };
})();
