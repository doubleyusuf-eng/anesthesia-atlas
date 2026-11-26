VERI.sorular = VERI.sorular || {};
(function () {
  'use strict';
  VERI.sorular['an04a-1'] = {
    no: 1, kagit: 'Paper A · Anatomi', kok: 'Spinal sinirler ve arka primer dallar', kaynak: '[[K5 s. 149–154]]',
    onermeler: [
      { t: 'Ön kökte duyu gangliyonu bulunur.', d: false, n: 'Gangliyon duyusal arka köktedir. [[K5 s. 149]]' },
      { t: 'C8 siniri C7 ile T1 arasından çıkar.', d: true, n: 'C8, yedi servikal omurun sonuncusunun altından çıkar. [[K5 s. 150]]' },
      { t: 'T6 arka dalının kutanöz lifleri lateral dalda taşınır.', d: false, n: 'T6 dahil üst segmentlerde deri liflerini medial dal taşır. [[K5 s. 151]]' },
      { t: 'C2 arka dalının medial dalı vertekse kadar uzanır.', d: true, n: 'Büyük oksipital sinir oksipital arterin medialinden yükselerek vertekse ulaşır. [[K5 s. 153]]' },
      { t: 'L5 arka dalı komşu gluteal deriyi innerve eder.', d: false, n: 'L4–L5 arka dalları kutanöz lif taşımaz. [[K5 s. 151]]' }
    ]
  };
  VERI.sorular['an04a-2'] = {
    no: 2, kagit: 'Paper A · Anatomi', kok: 'Servikal pleksusun dalları ve blok alanı', kaynak: '[[K5 s. 156–159]]',
    onermeler: [
      { t: 'C1 lifleri hipoglossal sinirle tirohiyoid kasa ulaşır.', d: true, n: 'XII ile ilerleyen C1 lifleri tirohiyoid ve geniohiyoid kaslara gider. [[K5 s. 156–157]]' },
      { t: 'Küçük oksipital sinir kulağın medial yüzünün alt üçte ikisini besler.', d: false, n: 'Küçük oksipital üst üçte biri, büyük auriküler alt üçte ikiyi innerve eder. [[K5 s. 157–158]]' },
      { t: 'Boynun ön kutanöz siniri dış juguler venin derininden geçer.', d: true, n: 'Sinir sternokleidomastoid yüzeyinde yatay ilerlerken venin altından geçer. [[K5 s. 158]]' },
      { t: 'Supraklaviküler sinirlerin kökleri C3 ve C4’tür.', d: true, n: 'Pleksusun inen kutanöz dalları C3–C4 lifleri taşır. [[K5 s. 157]]' },
      { t: 'Derin servikal pleksus bloğunda frenik sinir genellikle korunur.', d: false, n: 'Frenik blok sık görülür. [[K5 s. 159]]' }
    ]
  };
  VERI.sorular['an04a-3'] = {
    no: 3, kagit: 'Paper A · Anatomi', kok: 'Stellat gangliyon ve frenik sinir', kaynak: '[[K5 s. 161–165]]',
    onermeler: [
      { t: 'Alt servikal gangliyon krikoid kıkırdak hizasındadır.', d: false, n: 'Alt servikal gangliyon C7–T1 diski hizasındadır. [[K5 s. 161]]' },
      { t: 'Stellat bloktan sonra aynı tarafın pupillası küçülebilir.', d: true, n: 'Pupilla dilatatörünün sempatik iletisi kesildiğinde miyozis görülür. [[K5 s. 161–163]]' },
      { t: 'Kuntz dalı T2 gangliyonunu birinci torakal sinire bağlar.', d: true, n: 'Bu bağlantı üst ekstremiteye giden lifler için zincir dışında bir yol sağlayabilir. [[K5 s. 162]]' },
      { t: 'Sağ frenik sinir sağ atriyumun lateralinden iner.', d: true, n: 'Sinir ile sağ atriyum arasına perikard girer. [[K5 s. 165]]' },
      { t: 'Sol frenik sinir sol akciğer kökünün önünden geçer.', d: true, n: 'Sol frenik sinir kökün önünden sol ventrikül üzerindeki perikarda iner. [[K5 s. 165]]' }
    ]
  };

  const nav = [["kok","Kökler ve foramen"],["oksipital","Arka dallar"],["ansa","Servikal halkalar"],["deri","Kutanöz dallar"],["blok","Blok işaretleri"],["stellat","Stellat gangliyon"],["horner","Sempatik blok"],["frenik","Frenik sinir"],["p1","Part I"],["p2","Part II"],["ozet","Özet"]];
  SAYFALAR['dersler/anatomi/04a'] = {
    grup: 'dersler', eyebrow: 'Anatomi · Bölüm 4 · Ders 04a',
    baslik: 'Spinal sinirler, servikal pleksus ve stellat gangliyon',
    lede: 'Bir spinal siniri kökünden deri alanına kadar izleyin. Boyunda lokal anesteziğin yayılımına göre omuz derisinde analjezi, frenik blok veya miyozis görülebilir. [[K5 s. 157–159]] [[K5 s. 161–165]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="an04a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="an04a-kok">
<h2>Spinal sinir nasıl oluşur?</h2>
<p class="intro">Ön kök motor, arka kök duyusaldır. [[K5 s. 149]] Arka kökteki gangliyonun hemen distalinde birleşerek spinal siniri oluştururlar. [[K5 s. 149]]</p>
<div class="viz"><div class="viz-head"><h3>Ön ve arka kökler</h3></div><div data-viz="an04a_kok"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Omurilikten vücut duvarına</h3>
<ul class="ozet">
  <li><b>Kökçükler.</b> Ön gri kolondan çıkan motor kökçükler demetler halinde toplanır. [[K5 s. 149]] Duyusal kökçükler arka gri kolon hizasında posterolateral oluktan omuriliğe girer. [[K5 s. 149]]</li>
  <li><b>Aksesuar sinirin spinal kökü.</b> Üst dört ila altı servikal segmentteki ince lateral kökçükler birleşir. [[K5 s. 149]] Oluşan kök omuriliğin yanından yükselip foramen magnumdan geçer. [[K5 s. 149]]</li>
  <li><b>Zarların sonlandığı yer.</b> Pia ve araknoid her iki köke eşlik eder ve köklerin durayı ayrı ayrı deldiği yerde sonlanır. [[K5 s. 149]] Dural manşet köklerin birleşimine kadar sürer ve burada sinir kılıfına karışır. [[K5 s. 149]]</li>
  <li><b>İlk dal.</b> Küçük meningeal dal intervertebral kanala geri dönerek komşu damar ve bağlara gider. [[K5 s. 149]] Spinal sinir hemen aynı bölgede ön ve arka primer dallarına ayrılır. [[K5 s. 149]]</li>
  <li><b>Tipik torakal sinir.</b> Arka dal transvers çıkıntılar arasından geçer. [[K5 s. 149]] Medial ve lateral dalları komşu vertebral kaslara, bu iki daldan biri de deriye gider. [[K5 s. 149]] Bu tipik düzen yalnızca torakal segmentlerde görülür; diğer bölgelerde, özellikle ön dallardan pleksus oluşan yerlerde değişir. [[K5 s. 149]]</li>
  <li><b>Ön dal.</b> Beyaz ve gri bağlantı dalları ön dalı sempatik zincire bağlar. [[K5 s. 149]] Ön dal gövde duvarındaki yolunun yaklaşık yarısında lateral kutanöz dalı verir. [[K5 s. 149]] Bu dal öne ve arkaya ayrılır. [[K5 s. 149]] Ana dal önde orta hatta komşu deriye ulaşan ön kutanöz dal olarak sonlanır. [[K5 s. 149]]</li>
</ul>
<h3>Hangi sinir hangi omurun hizasından çıkar?</h3>
<p>Sekiz servikal, on iki torakal, beş lomber, beş sakral ve bir koksigeal olmak üzere 31 çift spinal sinir vardır. [[K5 s. 149]]</p>
<ul class="ozet">
  <li><b>C1–C7.</b> Suboksipital sinir (C1) oksiput ile atlasın arka arkı arasından çıkar. [[K5 s. 150]] C2–C7 de adlarını aldıkları omurun üstünden geçer. [[K5 s. 150]]</li>
  <li><b>C8 ve aşağısı.</b> C8, C7 ile T1 arasından geçer. [[K5 s. 150]] Bundan sonraki sinirler kendi omurlarının altından çıkar. [[K5 s. 150]] Erişkinde omurilik ortalama olarak L1–L2 diski hizasında biter. [[K5 s. 150]] Bu nedenle alt düzeylere inildikçe köklerin çıkış deliğine ulaşmak için katettiği yol uzar. [[K5 s. 150]]</li>
  <li><b>Gangliyonlar.</b> Arka kök gangliyonunun olağan yeri intervertebral foramendir. [[K5 s. 149]] C1 ve C2 gangliyonları kendi omurlarının arka arkları üzerinde, sakral ve koksigeal gangliyonlar ise sakral kanal içindedir. [[K5 s. 150]]</li>
</ul>
<h3>Paravertebral aralık</h3>
<p>Vertebral kanalın dışında uzanan bu potansiyel aralıkta sinir köklerine epidural ya da subaraknoid aralığa girmeden ulaşılabilir. [[K5 s. 150–151]]</p>
<ul class="ozet">
  <li><b>Medial sınır.</b> Pediküller ve intervertebral foramenler aralığın vertebral kanal tarafını belirler. [[K5 s. 150]]</li>
  <li><b>Lateral komşular.</b> Toraksta plevra ve akciğerler, lomber bölgede psoasın başlangıç lifleriyle birlikte sakrospinalis kası yer alır. [[K5 s. 151]]</li>
  <li><b>İçerik.</b> Gevşek yağ ve areolar bağ dokusu içinde spinal sinir kökleri ve damarlar bulunur. [[K5 s. 151]]</li>
  <li><b>Yayılım.</b> Lokal anestezik iki ila dört segmenti tutan tek taraflı blok oluşturabilir. [[K5 s. 151]] Servikal uygulama üst ekstremitede, torakal uygulama toraks, meme, böbrek ve safra yolu cerrahilerinde analjezi sağlayabilir. [[K5 s. 151]] Lomber uygulama alt abdomen, kalça ve bacak cerrahisinde kullanılır. [[K5 s. 151]]</li>
  <li><b>Aralığı belirleme.</b> Kitap direnç kaybını, stimülasyonla ilgili kökün dağılımında kas yanıtı aranmasını ve bu yöntemlerle ultrasonun birlikte kullanılmasını anlatır. [[K5 s. 151]] Kateter, ameliyattan sonra sürekli paravertebral analjeziye olanak verir ve kullanımı giderek yaygınlaşmaktadır. [[K5 s. 151]]</li>
</ul>
<nav class="an04a-atlas" aria-label="Sinir Bloğu Atlası"><b>Sinir Bloğu Atlası</b>
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=paravertebral">Torasik paravertebral blok</a>
<a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=esp">Erektör spina plan bloğu</a></nav>
<details class="an04a-okuma"><summary>Kök, gangliyon ve dalı kesitte ayırın</summary>
<p>Omurilikten dışa doğru önce kökçükleri, sonra iki ayrı kökü izleyin. [[K5 s. 149]] Gangliyonu gördüğünüz taraftan merkeze dönerseniz duyusal liflerin giriş oluğuna ulaşırsınız. [[K5 s. 149]] Aynı noktadan dışa ilerlediğinizde ön kökün katılımıyla önce ortak sinir, ardından iki primer dal karşınıza çıkar. [[K5 s. 149]] Bu nedenle bir yapının “arka” diye adlandırılması, taşıdığı lifleri tek başına tanımlamaz. [[K5 s. 149]] Arka kök duyusaldır, fakat arka primer dalın hem deriye hem komşu sırt kaslarına giden lifleri vardır. [[K5 s. 149]]</p>
<p>Torakal gövde duvarındaki tipik sinirde iki ayrı dallanmayı birbirinden ayırın. [[K5 s. 149]] Omurga yanında ayrılan ön primer dal, daha ileride gövde duvarının yan tarafına bir deri dalı verir. [[K5 s. 149]] Bu lateral kutanöz dalın ön ve arka kolları, omurganın yanındaki ön ve arka primer dallardan farklı bir dallanma düzeyidir. [[K5 s. 149]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-oksipital">
<h2>Arka primer dallar ve oksipital sinirler</h2>
<p class="intro">Arka dallar sırt derisi ve kaslarına segmental lif verir. [[K5 s. 151]] Alanlar aşağı ve dışa eğimlidir ve örtüşür. [[K5 s. 151]] Bu yüzden tek sinirin kesilmesi veya bloğu ilgili deri şeridinde güvenilir anestezi sağlamaz. [[K5 s. 151]]</p>
<div class="viz"><div class="viz-head"><h3>Suboksipital üçgende C1 ve C2</h3></div><div data-viz="an04a_oksipital"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Arka dallar pleksus oluşturmaz ve ekstremitelere uzanmaz. [[K5 s. 151]] C1 ve C2 dışında aynı düzeydeki ön daldan küçüktürler. [[K5 s. 151]] C1, S4, S5 ve Co1 dışında dorsal kas kitlesinde medial ve lateral dallara ayrılırlar. [[K5 s. 151]]</p>
<p>Deriye giden lifleri T6 dahil daha yukarıda medial dal, T6 altında lateral dal taşır. [[K5 s. 151–152]] C1, C6–C8 ve L4–L5 arka dallarında kutanöz lif bulunmaz. [[K5 s. 151–152]]</p>
<h3>Enseyi katman katman okuyun</h3>
<ul class="ozet">
  <li><b>C1.</b> Ön dalından büyük olan bu motor dal ikiye ayrılmaz. [[K5 s. 151–153]] Atlasın arka arkı ile vertebral arter arasından suboksipital üçgene girer. [[K5 s. 151–153]] Üçgeni çevreleyen üst ve alt oblik kaslarla rectus capitis posterior majoru innerve eder; rectus capitis posterior minor ve semispinalis capitise de dal verir. [[K5 s. 151–153]]</li>
  <li><b>C2.</b> Servikal arka dalların en büyüğü atlas arka arkı ile aksis laminası arasından çıkar. [[K5 s. 153]] Alt oblik kasın alt kenarını dönerken kasa dal verir, ardından büyük medial ve küçük lateral dala ayrılır. [[K5 s. 153]]</li>
  <li><b>Büyük oksipital sinir.</b> C2’nin medial dalı semispinalis capitisi, ardından trapezi deler ve C3 medial dalından ince bir lif alır. [[K5 s. 153]] Oksipital arterin medialinden vertekse yükselir. [[K5 s. 153]] Önde küçük oksipital sinirin deri alanıyla örtüşür ve semispinalise kas dalı verir. [[K5 s. 153]]</li>
  <li><b>Servikojenik baş ağrısı.</b> Büyük oksipital sinir bazen ağrıya katılır ve infiltrasyon analjezi sağlayabilir. [[K5 s. 153]] C2 ağrısı trigeminal alana yansıyabilir. [[K5 s. 153]] Blok işareti, oksipital çıkıntı ile mastoid arasındaki uzaklığın üçte biri hizasında, oksipital arterin hemen medialidir. [[K5 s. 153–154]]</li>
  <li><b>C2–C8.</b> C2’nin lateral dalı yalnız motordur ve arka servikal kaslara katılır. [[K5 s. 154]] C3 medial dalı üçüncü oksipital sinir olarak alt oksiput derisine, lateral dalı arka servikal kaslara gider. [[K5 s. 154]] C4–C8’in iki dalı da bu kaslara giderken C4 ve C5 medial dalları üzerlerindeki deriye de ulaşır. [[K5 s. 154]]</li>
  <li><b>Trapez.</b> Ana motor kaynağı aksesuar sinirdir ve ayrıca C3–C4 ön dallarından küçük dallar alır. [[K5 s. 154]]</li>
</ul>
<h3>Sırttan koksikse</h3>
<ul class="ozet">
  <li><b>Torakal.</b> Her iki dal sırt kaslarını innerve eder. [[K5 s. 154]] Üst altı medial dal spinöz çıkıntı yanındaki deriye ulaşır, alt altı lateral dal hem kas hem deri lifi taşır. [[K5 s. 154]]</li>
  <li><b>Deri alanının düzeyi.</b> Kutanöz dalın iniş mesafesi kaudale doğru artar. [[K5 s. 154]] T1 kendi omurunun hemen altına, T10–T11 bel derisine, T12 ise iliak krest boyunca ilerleyerek üst gluteal deriye ulaşır. [[K5 s. 154]]</li>
  <li><b>Lomber.</b> Tüm medial ve lateral dallar lomber kaslara dağılır. [[K5 s. 154]] İlk üç lateral dal spina iliaca posterior superior üzerindeki deriye ve komşu gluteal bölgeye uzanır. [[K5 s. 154]]</li>
  <li><b>Sakral.</b> S1–S4 arka sakral foramenlerden çıkar. [[K5 s. 154]] S5, ana sinir sakral ve koksigeal boynuzlar arasından çıktıktan sonra ayrılır. [[K5 s. 154]] Aşağı doğru küçülen bu dalların hepsi sakrospinalisi innerve eder. [[K5 s. 154]] Yalnız üst üçü sakrum derisine lateral dal verir. [[K5 s. 154]]</li>
  <li><b>Koksigeal.</b> Küçük Co1 dallanmadan koksiks üzerindeki deriye ulaşır. [[K5 s. 154]]</li>
</ul>
<details class="an04a-okuma"><summary>Oksiput derisinden köke geri dönün</summary>
<p>Verteks yakınındaki deriden geriye doğru izlenen büyük oksipital sinir önce trapez, sonra semispinalis capitis katmanından geçerek C2 arka dalına ulaşır. [[K5 s. 153]] Mastoidin hemen arka ve üstündeki deri için izlenen küçük oksipital sinir ise sternokleidomastoidin arka kenarı boyunca C2 ön dalına döner. [[K5 s. 153]] [[K5 s. 157]] Alt oksiput derisine ise C3 arka dalının medial kolundan gelen üçüncü oksipital sinir ulaşır. [[K5 s. 154]]</p>
<p>Aynı yaklaşımı sırta uygularken derideki noktanın hizası ile omur düzeyini eş tutmayın. [[K5 s. 154]] Örneğin üst gluteal deri için hem iliak krest boyunca ilerleyen T12 dallarını hem de üst üç lomber arka dalın lateral kollarını hesaba katın. [[K5 s. 154]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-ansa">
<h2>Servikal pleksusun halkaları ve kas dalları</h2>
<p class="intro">Ön primer dallar ekstremitelere ve boyun, toraks ve abdomenin ön-yan bölümlerine motor ve duysal lif taşır. [[K5 s. 154–155]] Gövdede büyük ölçüde segmental torakal dallar, boyun ve ekstremitelerde ise servikal, brakiyal, lomber ve sakral pleksuslar görev alır. [[K5 s. 154–155]]</p>
<div class="viz"><div class="viz-head"><h3>Karotis kılıfı üzerinde servikal ansa</h3></div><div data-viz="an04a_ansa"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>C1–C4 ön dalları sternokleidomastoidin derininde, orta skalen ve levator scapulae üzerinde üç halka kurar. [[K5 s. 156]] Komşu çiftler C1–C2, C2–C3 ve C3–C4’tür. [[K5 s. 156]] Sıklıkla dördüncü halka brakiyal pleksusa bağlanır. [[K5 s. 156]] Servikal pleksus boyun kasları ve derisiyle diyaframa lif taşır. [[K5 s. 156]]</p>
<ul class="ozet">
  <li><b>C1’in yolu.</b> Tümüyle motor ön dal, atlasın üst eklem faseti arkasındaki olukta arka ark ile vertebral arter arasından geçer. [[K5 s. 156]] Lateral kitlenin dışından öne dönerken transvers foramenden çıkan arterin medialinde kalır. [[K5 s. 156]]</li>
  <li><b>İlk halka.</b> C1, rectus capitis lateralis, rectus capitis anterior ve longus capitise küçük dallar verir. [[K5 s. 156]] Ardından aşağı dönerek atlas transvers çıkıntısının önünde C2’nin çıkan dalıyla birleşir. [[K5 s. 156]] Halkanın liflerinin çoğu atlas düzeyinde öne geçip hipoglossal sinire katılır. [[K5 s. 156]]</li>
  <li><b>XII ile taşınan lifler.</b> C1 lifleri geniohiyoid ve tirohiyoide gider. [[K5 s. 156–157]] Hipoglossusun inen dalı omohiyoidin ön karnına dal verir. [[K5 s. 156–157]] C2–C3’ün inen servikal dalıyla birleştiğinde karotis kılıfı üzerinde servikal ansa oluşur. [[K5 s. 156–157]] Ansa sternohiyoid, sternotiroid ve omohiyoidin arka karnına lif gönderir. [[K5 s. 156–157]]</li>
  <li><b>C2 ve altındaki kökler.</b> C2 ön dalı aksisin üst eklem çıkıntısı arkasından çıkar, vertebral arterin lateralinden ilerler ve C1’e çıkan, C3’e inen dallara ayrılır. [[K5 s. 157]] Diğer servikal ön dallar foramenden eklem sütununun önünde ve vertebral arterin lateralinde çıkar. [[K5 s. 157]] Her kök üst servikal gangliyondan gri bağlantı dalı alır. [[K5 s. 157]]</li>
  <li><b>Dört dal grubu.</b> Bağlantı dalları XII’ye, vagusa ve servikal sempatik zincire ulaşır. [[K5 s. 157]] Yüzeyel dallar deriye, derin dallar kaslara, frenik sinir ise diyaframa gider. [[K5 s. 157]] Anestezi açısından yüzeyel dallar ve frenik sinir özellikle önemlidir. [[K5 s. 157]]</li>
  <li><b>Derin kas dalları.</b> Başın rektus kasları, longus capitis ve longus cervicis bu dallardan lif alır. [[K5 s. 159]] Pleksus orta skalenin innervasyonuna katılır, ancak skalenlerin ana kaynağı brakiyal pleksus kökleridir. [[K5 s. 159]] Levator scapulae C3–C4’ten lif alır. [[K5 s. 159]] Sternokleidomastoid (C2–C3) ve trapez (C3–C4) de esas motor kaynakları olan spinal aksesuar sinire ek olarak pleksustan dal alır. [[K5 s. 159]]</li>
</ul>
<details class="an04a-okuma"><summary>Bir kas dalını kaynağına kadar izleyin</summary>
<p>Tirohiyoid kasa ulaşan liflerin boyunda XII ile taşınması, bu liflerin segmental kökenini değiştirmez, C1’den gelirler. [[K5 s. 156–157]] Omohiyoid sorulduğunda önce hangi karnın kastedildiğini belirleyin. [[K5 s. 157]] Ön karna giden dal hipoglossusun inen dalından ayrılırken arka karna giden lifler ansadan çıkar. [[K5 s. 157]] Bu ayrımı çizmek için karotis kılıfı üzerine bir halka yerleştirin, C1 ile gelen üst kolu ve C2–C3 ile gelen inen servikal kolu ayrı izleyin. [[K5 s. 156–157]]</p>
<p>Pleksusun üç kök halkası ile ansanın yerini de ayırın. [[K5 s. 156–157]] Kök halkaları sternokleidomastoidin altında, orta skalen ile levator scapulae üzerinde bulunur. [[K5 s. 156]] Ansa ise infrahiyoid kaslara lif dağıtan ve karotis kılıfına komşu olan halkadır. [[K5 s. 157]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-deri">
<h2>Yüzeyel servikal pleksusun deri alanları</h2>
<p class="intro">Küçük oksipital ve büyük auriküler sinirler yükselir, boynun ön kutanöz siniri öne geçer, supraklaviküler dallar aşağı iner. [[K5 s. 157]] C1’in kutanöz dalı yoktur. [[K5 s. 157]]</p>
<div class="viz"><div class="viz-head"><h3>Kulaktan omuza dört kutanöz dal</h3></div><div data-viz="an04a_deri"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet">
  <li><b>Küçük oksipital (C2).</b> Spinal aksesuar siniri dolanıp sternokleidomastoidin arka kenarından yükselir ve arka üçgenin üstünde derin fasyayı deler. [[K5 s. 157]] Auriküler dal kulağın medial yüzünün üst üçte birine, mastoid dal mastoid derisine, oksipital dal mastoidin hemen üstündeki ve arkasındaki oksipital bölgeye gider. [[K5 s. 157]]</li>
  <li><b>Büyük auriküler (C2–C3).</b> En büyük kutanöz daldır. [[K5 s. 157–158]] Kasın arka kenarının ortasından dönüp kas üzerinde mandibula açısına yönelir ve burada üç uç dal verir. [[K5 s. 157–158]] Auriküler dal medial kulak yüzünün alt üçte ikisini ve lobülün lateral yüzünü besler. [[K5 s. 157–158]] Mastoid dal mastoid derisine, fasiyal dal masseter ve parotis üzerindeki deriye gider. [[K5 s. 157–158]]</li>
  <li><b>Boynun ön kutanöz siniri (C2–C3).</b> Büyük auriküler sinirin hemen altından çıkar. [[K5 s. 157–158]] Sternokleidomastoid üzerinde yatay ilerlerken dış juguler venin derininden (bazen yüzeyelinden) geçer. [[K5 s. 157–158]] Kasın ön kenarında derin fasyayı delerek boynun bütün ön yüz derisine dağılır. [[K5 s. 157–158]]</li>
  <li><b>Supraklaviküler sinirler (C3–C4).</b> Ortak gövde diğer kutanöz dalların hemen altında kasın arkasından çıkar. [[K5 s. 157–159]] Medial, orta ve lateral dallar klavikula üstünde derin fasyayı delip kemik üzerinden geçer. [[K5 s. 157–159]] Üst sternum, üst göğüs duvarı (3. kaburgaya kadar) ve deltoidin üst bölümündeki deriye ulaşırlar. [[K5 s. 157–159]]</li>
</ul>
<p>Supraklaviküler dallar klavikulanın ön kenarında parmak altında yuvarlanabilir. [[K5 s. 159]] İnterskalen yaklaşımda sıklıkla etkilenmeleri, lokal anesteziğin paravertebral bölgede kraniyale yayılmasıyla açıklanabilir. [[K5 s. 159]]</p>
<details class="an04a-okuma"><summary>Kulak ve omuz derisinden dalı bulun</summary>
<p>Kulak kepçesinin medial yüzünde önce yüksekliği değerlendirin. [[K5 s. 157–158]] Üst üçte birlik alan küçük oksipital sinire, onun altındaki üçte ikilik alan büyük auriküler sinire götürür. [[K5 s. 157–158]] Kulak memesinin lateral yüzü ile mandibula açısına komşu parotis üzerindeki deri birlikte soruluyorsa her ikisine de büyük auriküler sinirin ayrı uç dalları ulaşır. [[K5 s. 158]]</p>
<p>Omuz üstündeki bir duyu değişikliğini yorumlarken sinirin hangi pleksustan çıktığı ile lokal anesteziğin nereye yayıldığını ayrı düşünün. [[K5 s. 159]] Deltoidin üst kısmını örten deriye servikal pleksusun inen dalları gelir. [[K5 s. 158–159]] İnterskalen girişimde bu alanın da etkilenmesi, supraklaviküler dalların kökeniyle değil muhtemel kraniyal yayılımla açıklanır. [[K5 s. 159]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-blok">
<h2>Servikal blokta yüzey ve derinlik</h2>
<p class="intro">Karotis endarterektomisi gibi ön üçgen ameliyatlarında yüzeyel ve derin pleksus blokları birlikte kullanılabilir. [[K5 s. 159]] Beklenen alan oksiput, boyun, omuz ve üst pektoral bölgedir. [[K5 s. 159]]</p>
<div class="viz"><div class="viz-head"><h3>Mastoid ile klavikula arasındaki işaretler</h3></div><div data-viz="an04a_blok"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet">
  <li><b>Yüzeyel hedef.</b> Sternokleidomastoidin arka kenarının ortasında yüzeyel dallar bir arada bulunur. [[K5 s. 159]] Kitap, bu noktadaki 5–10 mL lokal anesteziğin ön üçgen derisinde genellikle analjezi sağladığını bildirir. [[K5 s. 159]]</li>
  <li><b>Derin hedef.</b> Sırtüstü hastada baş karşı tarafa çevrildiğinde mastoid uç ile krikoid hizasındaki C6 transvers çıkıntısı belirlenir. [[K5 s. 159–160]] C6, servikal transvers çıkıntıların en belirginidir. [[K5 s. 159–160]] C2–C4 kökleri bu iki işareti birleştiren çizginin altında yer alır. [[K5 s. 159–160]]</li>
  <li><b>Üç düzey.</b> C2 transvers çıkıntısı mastoid ucunun 1,5–2,0 cm distalindedir. [[K5 s. 159–160]] C4 mastoid ile klavikula arasının yaklaşık ortasındadır. [[K5 s. 159–160]] C3 için C2 ve C4 arasının ortası alınır. [[K5 s. 159–160]]</li>
  <li><b>İğne ucu ile kemik arasındaki ilişki.</b> Kitabın tarifinde cilt altı infiltrasyonunu takiben dik ilerletilen iğne genellikle 1–2 cm’de C2 transvers çıkıntısına değer. [[K5 s. 159]] Kemik temasından 1 mm geri çekilerek damar içi ve subaraknoid konum açısından aspirasyon yapılır. [[K5 s. 159]] C2’ye 3–5 mL verilir ve C3 ile C4’te işlem tekrarlanır. [[K5 s. 159]]</li>
  <li><b>Komşu sinirler.</b> Frenik blok sık görülür ve kitap iki taraflı derin bloktan kaçınılmasını söyler. [[K5 s. 159]] Servikal sempatik blok Horner sendromu yapabilir, bazen vagus da etkilenir. [[K5 s. 159]]</li>
</ul>
<details class="an04a-okuma"><summary>Aynı boyunda iki farklı hedefi gösterin</summary>
<p>Yüzeyel blok sorulduğunda elinizi kasın arka kenarındaki orta noktaya götürün, burada kutanöz dallar birbirine yakındır. [[K5 s. 157–159]] Derin blok sorulduğunda ise önce iki yüzey işareti arasındaki çizgiyi belirleyin, sonra üç ayrı transvers çıkıntının düzeyini gösterin. [[K5 s. 159–160]] Mastoid hem çizginin üst ucudur hem de C2’ye uzaklığı tahmin etmek için kullanılır. [[K5 s. 159–160]] C4 için alt referans klavikuladır. [[K5 s. 159–160]]</p>
<p>Blok alanını değerlendirirken boynun ön derisindeki analjeziyi beklenen duyu alanı içinde, diyafram hareketinin etkilenmesini ise komşu frenik sinirin tutulumu olarak açıklayın. [[K5 s. 159]] Sempatik zincirin veya vagusun etkilenmesi de derin uygulamanın aynı bölgede ulaşabildiği başka sinir yapılarını gösterir. [[K5 s. 159]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-stellat">
<h2>Stellat gangliyon ve Horner sendromu</h2>
<p class="intro">Alt servikal gangliyon yaklaşık %80 oranında ilk torakal gangliyonla birleşir. [[K5 s. 161]] Stellat adı, gangliyonlar ayrı kaldığında da ikisi için birlikte kullanılabilir. [[K5 s. 161]]</p>
<div class="viz"><div class="viz-head"><h3>Boyun kökünde sempatik zincir</h3></div><div data-viz="an04a_stellat"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet">
  <li><b>Alt servikal gangliyon.</b> C7–T1 diski hizasında, C8 ön dalının önünde ve vertebral damarların arkasındadır. [[K5 s. 161]] Subklavyen arter yüksek kavis yapıyorsa gangliyon arterin üst kenarının hemen arkasında kalır. [[K5 s. 161]]</li>
  <li><b>Birinci torakal gangliyon.</b> Plevranın arkasında birinci kosta boynuna dayanır. [[K5 s. 161]] Alt servikal gangliyon orta servikal gangliyona hem sempatik zincirle hem de subklavyen arterin alt kenarını dolanıp yükselen ansa subklavyayla bağlanır. [[K5 s. 161]]</li>
  <li><b>Baş ve boyuna giden yol.</b> T1–T2 pregangliyonik lifleri zincirde yükselir ve çoğunlukla üst servikal gangliyonda sinaps yapar. [[K5 s. 161]]</li>
  <li><b>Üst ekstremiteye giden yol.</b> T2–T7 lifleri başlıca T1–T2 ile alt ve orta servikal gangliyonlarda sinaps yapar. [[K5 s. 161]] Gri bağlantı dalları lifleri brakiyal pleksus köklerine taşır. [[K5 s. 161]]</li>
</ul>
<details class="an04a-okuma"><summary>Baş ve kola giden sempatik lifleri ayırın</summary>
<p>Spinal segment ile sempatik gangliyon aynı sözcüklerle anılabildiği için önce lifin çıktığı segmenti, sonra sinaps yaptığı gangliyonu belirtin. [[K5 s. 161]] Baş-boyun yolunda T1 ve T2’den çıkan lifler yukarı taşınır ve çoğunlukla üst servikal gangliyona ulaşır. [[K5 s. 161]] Kola giden yolda ise giriş T2–T7 segmentlerindendir ve sinapslar üst torakal ya da alt ve orta servikal gangliyonlarda gerçekleşir. [[K5 s. 161]] Bundan sonraki bağlantı gri dallarla brakiyal pleksusa kurulur. [[K5 s. 161]]</p>
<p>Bu iki yolu üst dorsal sempatektomiye uygulayın. [[K5 s. 162]] T1’in beyaz bağlantı dalı ile stellat gangliyon korunabildiğinde baş-boyuna giden ana yol korunur. [[K5 s. 162]] Kola giden lifler için ise zincirin dışında T2 gangliyonundan birinci torakal sinire uzanan Kuntz dalı ayrıca aranır. [[K5 s. 162]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-horner">
<h2>Sempatik blok ve Horner bulguları</h2>
<p class="intro">Brakiyal pleksus infiltrasyonunda solüsyon komşu alt servikal zincir ve stellat gangliyona yayılabilir. [[K5 s. 161]] Baş-boyun sempatik bloğu sık görülür. [[K5 s. 161]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı yüzde iki pupillayı karşılaştırın</h3></div><div data-viz="an04a_horner"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet">
  <li><b>Horner bulguları.</b> Pupilla dilatatörünün felci miyozis, üst kapağı kaldıran kasın sempatik innervasyon kaybı pitoz yapar. [[K5 s. 161–162]] Yüzün aynı tarafında vazodilatasyon ve anhidroz gelişir. [[K5 s. 161–162]] Vazodilatasyon aynı tarafta burun tıkanıklığına da yol açar. [[K5 s. 161–162]] Gerçek enoftalmi oluştuğu kuşkuludur. [[K5 s. 161–162]]</li>
  <li><b>Üst dorsal sempatektomi.</b> T3 gangliyonunun hemen altından kesilen zincir boyunca yukarı diseksiyonla bağlantılar ayrılır. [[K5 s. 162]] Stellat gangliyon ile T1 beyaz bağlantı dalı korunur. [[K5 s. 162]] Böylece kolun T2–T7 pregangliyonik iletisi kesilirken baş-boynun T1 üzerinden ana innervasyonu korunur ve Horner sendromu önlenir. [[K5 s. 162]] Torakoskopi üst zincirin görülmesini ve aynı seansta iki tarafın tedavisini sağlar. [[K5 s. 162]]</li>
  <li><b>Kuntz siniri.</b> Bazı kol lifleri T1 gangliyonunun altında zincirden ayrılıp doğrudan brakiyal pleksusa ulaşabilir. [[K5 s. 162]] T2 gangliyonundan birinci torakal sinire giden oldukça sabit Kuntz dalı, tam sempatektomi için bulunup kesilmelidir. [[K5 s. 162]]</li>
</ul>
<h3>Stellat blokta C6 neden önemlidir?</h3>
<ul class="ozet">
  <li><b>Endikasyonlar.</b> Kitap refrakter anjina, kolda kompleks bölgesel ağrı, fantom ağrısı, postherpetik nevralji ve omuz-el sendromunu sayar. [[K5 s. 162]] Soğuk ısırması, Raynaud sendromu, travma, emboli, skleroderma veya obliteratif hastalığa bağlı akut ya da kronik kol dolaşım yetersizliği de yarar görebilir. [[K5 s. 162]]</li>
  <li><b>Pozisyon ve yüzey işareti.</b> Hasta sırtüstü, boyun ekstansiyonda, ağız boyun kaslarını gevşetmek için hafif açıktır. [[K5 s. 162–163]] Hastadan konuşmaması ve boynunu oynatmaması istenir. [[K5 s. 162–163]] Krikoid düzeyinde C6 transvers çıkıntısı (Chassaignac tüberkülü) aranır. [[K5 s. 162–163]] Palpasyon için karotis ve sternokleidomastoidin laterale alınması gerekebilir. [[K5 s. 162–163]]</li>
  <li><b>C6’daki kemik teması.</b> Kitaptaki tarifte ciltte lokal anestezik kabarıklığı oluşturulur ve arkaya dik ilerlenen iğne C6 transvers çıkıntısına değer. [[K5 s. 162]] Derinlik vücut yapısına göre 3 cm’ye ulaşabilir. [[K5 s. 162]] Kemik temasından 1–2 mm geri çekilen iğnenin ağzı kaudale bakar. [[K5 s. 162]]</li>
  <li><b>Konumun değerlendirilmesi.</b> Obezite, çok kısa boyun veya değişmiş anatomide kitap görüntü yoğunlaştırıcı önerir. [[K5 s. 162]] Floroskopi, ultrason veya BT iğne konumunu gösterebilir. [[K5 s. 162]] Yardımcının komutla aspirasyon ve enjeksiyon yapması uygulayıcının iğneyi sabit tutmasını sağlar. [[K5 s. 162]]</li>
  <li><b>Kontrast paterni.</b> Damar dışındaki kontrastın sefalik ve kaudal yayılımı beklenir. [[K5 s. 162–163]] Damar içinde hızla kaybolur, kas içinde ise belirgin yayılmaz. [[K5 s. 162–163]] Damar içi ve subaraknoid konum açısından ayrıca aspirasyon yapılır. [[K5 s. 162–163]]</li>
  <li><b>Test dozunun sınırı.</b> Kitapta 0,5 mL test dozu anlatılır ancak vertebral arter içinde bu miktarla bile nöbet gelişebileceği için yararı sorgulanır. [[K5 s. 163]] Hasta göz kırparak veya parmağını oynatarak istenmeyen etki hissetmediğini bildirir. [[K5 s. 163]]</li>
  <li><b>Enjeksiyon ve klinik yanıt.</b> Kaynak, intravenöz yerleşimi değerlendirmek için 2–3 mL epinefrinli lokal anestezikten söz eder. [[K5 s. 163]] Kalan hacmin (10–15 mL’ye kadar) tekrarlanan aspirasyon ve sürekli görsel iletişimle bölünerek verilmesini tarif eder. [[K5 s. 163]] Aynı tarafta Horner bulgularının gelişmesini uygun yerleşim lehine yorumlar. [[K5 s. 163]]</li>
</ul>
<details class="an04a-okuma"><summary>Kemik işaretini, yayılımı ve bulguyu eşleştirin</summary>
<p>Stellat blok sorusunun üç farklı anatomik karşılığı vardır. [[K5 s. 161–163]] Palpe edilen kemik işareti C6 transvers çıkıntısıdır, alt servikal gangliyon ise C7–T1 diski hizasında bulunur. [[K5 s. 161–162]] Beklenen kontrast görüntüsü enjeksiyon bölgesinden hem başa hem ayağa doğru uzanan yayılımdır. [[K5 s. 162–163]] Pupilla ve kapaktaki değişiklikler ise enjeksiyonun yüzey işaretini değil sempatik iletinin kesildiği tarafı gösterir. [[K5 s. 161–163]]</p>
<p>Resimde iki pupillayı aynı ışıkta karşılaştırın ve ardından küçük pupillanın bulunduğu taraftaki üst kapağa bakın. Aynı tarafta yüzde terleme kaybı ve burun tıkanıklığı da beklenebilir. [[K5 s. 162]] Gözün geriye çekilmiş görünmesini gerçek enoftalmi olarak kesinleştirmeyin. [[K5 s. 162]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-frenik">
<h2>Frenik siniri boyundan diyaframa izleyin</h2>
<p class="intro">Frenik sinirin başlıca kökü C4’tür, C3 ve C5 de katılır. [[K5 s. 164]] T11–T12’nin kruslara klinik açıdan önemsiz katkısı dışında diyaframın motor siniridir. [[K5 s. 164]] Merkezden propriyoseptif lifler taşır ve plevra ile perikarda ince dallar verir. [[K5 s. 164]]</p>
<div class="viz"><div class="viz-head"><h3>Sağ ve sol frenik sinirin torakstaki yolları</h3></div><div data-viz="an04a_frenik"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet">
  <li><b>Boyun.</b> Üç kök anterior skalenin lateral kenarında birleşir. [[K5 s. 164]] Sinir kasın ön yüzünde aşağı ve mediale inerken prevertebral fasyanın altından seçilebilir. [[K5 s. 164]] Önde internal juguler ven ve sternokleidomastoid yer alır. [[K5 s. 164]] Omohiyoidin alt karnı, transvers servikal ve supraskapular damarlar siniri çaprazlar. [[K5 s. 164]] Solda torasik kanal da üzerinden geçer. [[K5 s. 164]]</li>
  <li><b>Toraks girişi.</b> Sinir subklavyen arterin ilk bölümünün üzerinden ve subklavyen venin arkasından geçer. [[K5 s. 165]] İnternal torasik arteri arkadan, lateralden mediale çaprazlar. [[K5 s. 165]] Bu arterin perikardiyofrenik dalı toraks içindeki seyri boyunca sinire eşlik eder. [[K5 s. 165]]</li>
  <li><b>Sağ.</b> Siniri büyük venler boyunca izleyin. [[K5 s. 165]] Sağ brakiyosefalik venin, üst ana venin, perikardla ayrıldığı sağ atriyumun ve alt ana venin intratorasik bölümünün lateralinden iner. [[K5 s. 165]] Lateral komşusu mediastinal plevradır. [[K5 s. 165]]</li>
  <li><b>Sol.</b> Daha uzun ve eğik yol sol subklavyen ile sol ortak karotis arterleri arasında başlar. [[K5 s. 165]] Sinir vagusun önünde aort arkını çaprazlar. [[K5 s. 165]] Akciğer kökünün önünden inip sol ventrikülü örten perikard üzerinde ilerler. [[K5 s. 165]] Lateralinde mediastinal plevra vardır. [[K5 s. 165]]</li>
  <li><b>Diyaframa giriş.</b> Sağ frenik sinir, alt ana ven açıklığının hemen lateralinde santral tendonu deler. [[K5 s. 165]] Bazı lifler vene eşlik ederek aynı açıklıktan geçebilir. [[K5 s. 165]] Sol sinir, fibröz perikardın tutunma yerinin 1 cm lateralinden diyaframı deler. [[K5 s. 165]] İki sinir de kası abdominal yüzünden innerve eder. [[K5 s. 165]]</li>
  <li><b>Aksesuar frenik.</b> C5 katkısı bazen ayrı bir sinir olarak doğrudan C5’ten çıkıp ön skaleni çaprazlar veya subklaviusa giden sinirden ayrılır. [[K5 s. 165]] İkinci yolda ince dal subklavyen venin önünden, bazen arkasından geçer ve birinci kosta kıkırdağının arkasında ana frenik gövdeye katılır. [[K5 s. 165]]</li>
</ul>
<details class="an04a-okuma"><summary>Sözlü sınavda seyri üç durakta anlatın</summary>
<p>İlk durak anterior skalenin lateral kenarıdır, burada birleşen kökler kasın önünde tek sinir olarak aşağı ve mediale döner. [[K5 s. 164]] İkinci durak toraks girişidir, sinir subklavyen venin arkasından geçer ve internal torasik arterle çaprazlaşır. [[K5 s. 165]] Üçüncü durakta sağ ve sol yolları ayrı tarif edin. [[K5 s. 165]] Sağda üst ana venden sağ atriyum yanına, oradan alt ana ven açıklığının lateraline geçin. [[K5 s. 165]] Solda arkus aortadan akciğer kökünün önüne, oradan sol ventrikül üzerindeki perikarda ilerleyin. [[K5 s. 165]]</p>
<p>Son olarak diyaframın hangi yüzünden motor lif aldığını ve merkezden hangi duyunun taşındığını belirtin. [[K5 s. 164–165]] Sinirler diyaframı deldikten sonra abdominal yüzde dağılırken merkezden gelen propriyoseptif lifler yine frenik sinirle taşınır. [[K5 s. 164–165]]</p>
</details>
</section>

<section class="wrap blk ders-sec" id="an04a-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="an04a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an04a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an04a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an04a-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><b>Açılış sorusu</b><p>Karotis endarterektomisi için servikal pleksus bloğu planlanıyor. Boyun üzerinde yüzeyel ve derin hedefleri gösterin. Diyafram hareketi ve pupilla hangi anatomik ilişkiler nedeniyle etkilenebilir?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Ön üçgenin deri analjezisi için sternokleidomastoidin arka kenarının ortasından çıkan yüzeyel dalları gösterin. [[K5 s. 158–159]]</li>
<li>Mastoid uç ve krikoid hizasındaki C6 çıkıntısını bulun. [[K5 s. 159–160]] C2 mastoidin 1,5–2,0 cm distalinde, C4 mastoid ile klavikulanın ortasında, C3 ise C2 ile C4’ün ortasındadır. [[K5 s. 159–160]]</li>
<li>Ana kökü C4 olan frenik sinir anterior skalen üzerinde seyreder ve diyaframı hareket ettirir. [[K5 s. 164]] Derin blokta sık etkilenmesi iki taraflı uygulamadan kaçınma gerekçesidir. [[K5 s. 159]]</li>
<li>Sempatik blok pupilla dilatatörünün iletisini keserek ipsilateral miyozis oluşturabilir. [[K5 s. 159]] [[K5 s. 161–162]]</li></ol>
<p class="note"><b>Çizin.</b> Mastoid ve klavikula arasına sternokleidomastoidi yerleştirin. Yüzeyel dalların çıkışını, C2–C4 derin hedeflerini ve anterior skalen üzerindeki frenik siniri işaretleyin. [[K5 s. 157–160]] [[K5 s. 164]]</p>
<h3>Ek sorular</h3><ul><li>Kepçenin medial yüzündeki üst ve alt alanları hangi sinirler paylaşır?</li><li>Stellat gangliyon ile Chassaignac tüberkülünün düzeyleri nasıl ayrılır?</li><li>Sağ ve sol frenik sinirlerin diyaframa giriş yerleri nerelerdir?</li></ul></section>
<section class="wrap blk ders-sec" id="an04a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Duyusal gangliyon arka köktedir, sinir iki kökün birleşiminden sonra primer dallarına ayrılır. [[K5 s. 149]]</li>
<li>Büyük oksipital sinir C2’nin arka dalından, küçük oksipital sinir C2’nin ön dalından gelir. [[K5 s. 153]]</li>
<li>Boynun yüzeyel dallarını sternokleidomastoidin arka kenarı, derin pleksus köklerini C2–C4 transvers çıkıntıları üzerinden bulun. [[K5 s. 157–160]]</li>
<li>Alt servikal gangliyon C7–T1 diski düzeyindedir, blok için kullanılan kemik işareti ise C6’dadır. [[K5 s. 161–162]]</li>
<li>Frenik sinir boyunda anterior skalenin önünde, toraksta perikard ile mediastinal plevra komşuluğundadır. [[K5 s. 164–165]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="04a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/03c">← Spinal meninksler, BOS ve omurilik</a><a href="#/dersler/anatomi/04b">Sonraki: Brakiyal pleksus: oluşum, komşuluk ve blok yaklaşımları →</a></nav>
</section>`
  };
})();
