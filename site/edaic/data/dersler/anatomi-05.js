VERI.sorular = VERI.sorular || {};
VERI.sorular['an05-1'] = {
  no: 1, kok: 'Spinal sinir ile sempatik zincir arasındaki bağlantılar', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 228–230]]',
  onermeler: [
    { t: 'Her spinal sinir zincire beyaz bağlantı dalı verir.', d: false, n: 'Beyaz dal yalnız T1–L2 düzeylerinde bulunur. [[K5 s. 229]]' },
    { t: 'Beyaz daldan gelen bir lif ilk gangliyonu sinaps yapmadan geçebilir.', d: true, n: 'Lif zincirde başka düzeye ilerleyebilir veya periferik visseral gangliyona ulaşabilir. [[K5 s. 229]]' },
    { t: 'Gri bağlantı dalının deriye giden lifleri miyelinlidir.', d: false, n: 'Gri dal, miyelinsiz postgangliyonik aksonları spinal sinire taşır. [[K5 s. 229]]' },
    { t: 'Bir spinal sinir birden fazla gri bağlantı dalı alabilir.', d: true, n: 'Her spinal sinire bir ya da daha çok gri dal katılır. [[K5 s. 229]]' },
    { t: 'Adrenal medullaya giden sempatik lifler çölyak gangliyonda sinaps yapar.', d: false, n: 'Pregangliyonik lifler buradan kesintisiz geçip kromafin hücrelerde sonlanır. [[K5 s. 230]]' },
  ],
};
VERI.sorular['an05-2'] = {
  no: 2, kok: 'Zincir ve pleksusların komşulukları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 229–237]]',
  onermeler: [
    { t: 'Sempatik zincir toraksa birinci kaburga boynunun önünden girer.', d: true, n: 'Boyundan inen zincir kaburga boynunun önünü geçip üst kaburga başlarına ulaşır. [[K5 s. 229]]' },
    { t: 'Orta servikal gangliyon her zaman bulunur.', d: false, n: 'C6 hizasındaki küçük gangliyon bazı kişilerde bulunmaz. [[K5 s. 232]]' },
    { t: 'Sağ lomber zincirin önünde inferior vena kava bulunur.', d: true, n: 'Sağ zinciri vena kava, sol zinciri aort örter. [[K5 s. 233]]' },
    { t: 'Derin kardiyak pleksus karinanın önündedir.', d: true, n: 'Pleksus aort kavsinin arkasında, trakea bifurkasyonunun önündedir. [[K5 s. 236]]' },
    { t: 'Hipogastrik pleksus ana iliak arterlerin arasında bulunur.', d: true, n: 'Pleksus bu arterler arasındaki aralıkta, promontoryum ve sol ana iliak ven üzerinde yer alır. [[K5 s. 237]]' },
  ],
};
VERI.sorular['an05-3'] = {
  no: 3, kok: 'Parasempatik yollar ve visseral duyu', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 239–241]]',
  onermeler: [
    { t: 'Parotisin sekretomotor lifleri submandibular gangliyondan çıkar.', d: false, n: 'Parotise giden liflerin sinapsı IX. sinirin otik gangliyonundadır. [[K5 s. 240]]' },
    { t: 'Siliyer gangliyondan çıkan parasempatik lifler akomodasyona katılır.', d: true, n: 'III. sinirin bu yolu siliyer kası ve pupilla sfinkterini uyarır. [[K5 s. 240]]' },
    { t: 'Vagal visseral afferentlerin hücre gövdeleri nodöz gangliyondadır.', d: true, n: 'Kalp, akciğer ve sindirim kanalından gelen yol buradan dorsal vagal çekirdeğe ulaşır. [[K5 s. 241]]' },
    { t: 'Pelvik splanknik lifler mesanenin iç sfinkterini kasar.', d: false, n: 'Sakral parasempatik çıkış detrüsörü uyarır ve iç sfinkteri inhibe eder. [[K5 s. 241]]' },
    { t: 'Sakral visseral ağrı uyluk arkasına yansıyabilir.', d: true, n: 'Pelvik organların afferentleri ile bu deri alanının duyusu benzer sakral segmentlere ulaşır. [[K5 s. 241]]' },
  ],
};

(() => {
  const konular = [
    ['cikis', 'Otonom çıkış'], ['ramuslar', 'Beyaz ve gri dallar'], ['boyun', 'Boyun ve toraks'],
    ['lomber', 'Lomber zincir'], ['kalp', 'Kardiyak pleksuslar'], ['colyak', 'Çölyak pleksus'],
    ['kraniyal', 'Kraniyal çıkış'], ['sakral', 'Sakral çıkış'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  const sekil = (ad, baslik, aciklama) => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="an05_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${aciklama}</p></div>`;
  SAYFALAR['dersler/anatomi/05'] = {
    grup: 'dersler', eyebrow: 'Anatomi · Bölüm 5', baslik: 'Otonom sinir sistemi',
    lede: 'Bir sinir lifini merkezden hedef organa izlerken iki soru sorun. Gangliyon nerede, sinapstan sonra lif nereye gidiyor? [[K5 s. 225–226]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${konular.map(([id, ad]) => `<button type="button" data-scroll="an05-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an05-cikis">
<h2>İç organlara giden yol nerede kesilir?</h2>
<p class="intro">Somatik motor nöronun aksonu merkezden kasa kesintisiz giderken, otonom motor yol periferik bir gangliyonda ikinci nörona geçer. [[K5 s. 225–226]]</p>
${sekil('cikis','Merkezden hedef organa','Sempatik çıkış torakolomber, parasempatik çıkış kraniyal ve sakraldir. [[K5 s. 225]]')}
<p>Serebrospinal sistem beyin, omurilik, kraniyal ve spinal sinirlerle dış ortama yanıt verir. [[K5 s. 225]] Otonom (visseral, vejetatif ya da istemsiz) sistem iç ortamı gangliyon ve sinirleriyle düzenler. [[K5 s. 225]] Otonom lifler bütün periferik sinirlerde ve bazı kraniyal sinirlerde taşınır, iki sistemin etkinliği beyin ve omurilikte bütünleşir. [[K5 s. 225]]</p>
<p>Miyelinli pregangliyonik lif beyinden veya omurilikten çıkar, periferde sinaps yapar ve ince miyelinsiz postgangliyonik lif hedefe ulaşır. [[K5 s. 225–226]] Hedefler kalp, damar, bronş, bağırsak, genitoüriner sistem ve göz kasları ile sindirim bezleri ve eklentileri, ter bezleri ve adrenal medulladır. [[K5 s. 225]]</p>
<h3>Aynı organda iki çıkışın etkisi</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Hedef</th><th>Sempatik uyarı</th><th>Parasempatik uyarı</th></tr></thead><tbody>
<tr><th>Göz ve bezler</th><td>Pupilla genişler, lakrimal ve tükürük bezlerinde damarlar daralır. [[K5 s. 227]]</td><td>Pupilla daralır, lens akomodasyonu ve her iki bezin salgısı artar. [[K5 s. 227]]</td></tr>
<tr><th>Kalp ve akciğer</th><td>Hız, kasılma gücü, iletim, uyarılabilirlik ve oksijen tüketimi artar, bronşlar genişler. [[K5 s. 225–227]]</td><td>Kalbin hızı, gücü, iletimi ve uyarılabilirliği azalır, bronşlar daralır ve mukus salgısı artar. [[K5 s. 227]]</td></tr>
<tr><th>Deri ve dolaşım</th><td>Deri arteriyolleri daralır, kıllar dikleşir, terleme artar ve periferik vazokonstriksiyon kanı yaşamsal organlara yönlendirir. [[K5 s. 225–227]]</td><td>Deri arteriyolleri için parasempatik bir karşı yol tarif edilmez. [[K5 s. 227]]</td></tr>
<tr><th>Sindirim ve metabolizma</th><td>Peristaltizm azalır, sfinkter tonusu, karaciğerde glikojenoliz ve adrenal medulla salgısı artar. [[K5 s. 225]]</td><td>Peristaltizm artar, sfinkterler gevşer, mide asidi, pankreas ve diğer sindirim salgıları artar. [[K5 s. 226–227]]</td></tr>
<tr><th>Mesane ve uterus</th><td>Detrüsör gevşer, iç sfinkter kasılır, uterusta kasılma ve vazokonstriksiyon görülür. [[K5 s. 225–227]]</td><td>Detrüsör kasılır, iç sfinkter gevşer ve uterus damarları genişler. [[K5 s. 226–227]]</td></tr>
</tbody></table></div>
<p>Strese verilen sempatik yanıt yayılma eğilimindeyken parasempatik yanıt genellikle yereldir. [[K5 s. 225–226]] Refleks bradikardide vagal etkinlik artarken sempatik etkinlik azalır, böylece iki sistem aynı sonuca katkı verir. [[K5 s. 227]] Adrenal medullanın innervasyonu yalnız sempatiktir, midenin nörojenik salgısı ise bütünüyle vagus denetimindedir. [[K5 s. 227]]</p>
<p>Koroner akım artışının doğrudan sempatik etkiden mi kaynaklandığı belirsizdir. [[K5 s. 226]] Daha güçlü kasılma, kısa sistol, görece uzun diyastol ve yerel vazodilatör ya da metabolit birikimi de akımı artırabilir. [[K5 s. 226]]</p>
<p>K5 sempatik postgangliyonik uçlarda epinefrin ve norepinefrin salımını tarif eder. [[K5 s. 227]] Ter bezlerine giden sempatik uçlar, bütün parasempatik postgangliyonik uçlar gibi asetilkolin salgılar. [[K5 s. 227]]</p>
<div class="note plain"><b>Gözde iki ayrı hareketi ayırın.</b> Pupillanın genişliği iris kaslarının yanıtıyla, akomodasyon ise siliyer kasın etkinliğiyle değişir. [[K5 s. 232]] [[K5 s. 239–240]] Sempatik yol internal karotis çevresinden pupillayı genişleten kasa, III. sinirin parasempatik yolu ise siliyer gangliyondan pupilla sfinkteri ve siliyer kasa ulaşır. [[K5 s. 231–232]] [[K5 s. 240]]</div>
</section>
<section class="wrap blk ders-sec" id="an05-ramuslar">
<h2>Bir beyaz daldan üç ayrı yol</h2>
<p class="intro">T1–L2 lateral gri sütunundaki nöronun küçük miyelinli aksonu, ön kök ve ön primer dal üzerinden beyaz bağlantı dalına, oradan sempatik zincire ulaşır. [[K5 s. 226–229]]</p>
${sekil('ramuslar','Spinal sinir ve paravertebral gangliyon','Beyaz dal zincire pregangliyonik lif getirir, gri dal postgangliyonik lifi spinal sinire taşır. [[K5 s. 228–230]]')}
<ol class="iskelet"><li><b>Aynı düzey.</b> Beyaz dalın doğrudan girdiği T1–L2 gangliyonunda sinaps olur. [[K5 s. 229]]</li>
<li><b>Başka düzey.</b> Lif ilk gangliyondan kesintisiz geçer, zincirde yükselir veya alçalır ve başka gangliyonda sinaps yapar. [[K5 s. 229]]</li>
<li><b>Zincirin ötesi.</b> Lif zincirde sinaps yapmaz, splanknik sinirle periferik visseral gangliyona gider. [[K5 s. 229–230]]</li></ol>
<p>Tek beyaz daldaki liflerin bu dağılımı yaygın sempatik yanıtı açıklar. [[K5 s. 229–230]] Gelişimde her periferik sinire bir gangliyon karşılık gelirken birleşmelerle sayı azalır. [[K5 s. 229]] İnsanda sayı üç servikal, on iki veya daha az torakal, iki ila dört lomber ve dört sakral gangliyona iner. [[K5 s. 229]]</p>
<p>Her spinal sinir bir veya birkaç gri dal alır. [[K5 s. 229]] Spinal sinirle deriye dönen bu miyelinsiz liflerin üç farklı hedefi vardır. [[K5 s. 229–230]] Arteriyole giden lif vazokonstriktör, ter bezine giden sudomotor, kıl kaldırıcı kasa giden ise pilomotordur. [[K5 s. 229–230]] Baş, boyun ve toraks organlarına giden postgangliyonik liflerin hücre gövdeleri zincirin kendisindedir. [[K5 s. 230]] Başa giden lifleri internal karotis ve vertebral arter boyunca yukarı, toraksa gidenleri ise kardiyak, pulmoner ve özofageal pleksuslara doğru aşağı izleyin. [[K5 s. 230]] Karın ve pelvis organlarında düzen değişir. [[K5 s. 230]] Bu organlara ulaşan postgangliyonik lifler, hücre gövdeleri çölyak, hipogastrik veya pelvik pleksusun periferik gangliyonlarında bulunan nöronlardan çıkar. [[K5 s. 230]]</p>
<h3>Hangi segment hangi bölgeye katkı verir?</h3>
<p>Sınırlar kesin bilinmez, kitap yaklaşık bir dağılım verir. [[K5 s. 228]]</p>
<div class="an05-pairs"><ul class="ozet"><li>Baş ve boyun · T1–T2 [[K5 s. 228]]</li><li>Üst ekstremite · T2–T5 [[K5 s. 228]]</li><li>Toraks organları · T1–T4 [[K5 s. 228]]</li></ul><ul class="ozet"><li>Karın organları · T4–L2 [[K5 s. 228]]</li><li>Pelvik organlar · T10–L2 [[K5 s. 228]]</li><li>Alt ekstremite · T11–L2 [[K5 s. 228]]</li></ul></div>
<div class="note plain"><b>Baş ve boyun satırı nasıl okunur?</b> T1–T2, başa giden sempatik yolun yaklaşık spinal kökenini belirtir. [[K5 s. 228]] Başa ulaşacak pregangliyonik lif toraksta zincire girer, boyunda sinaps yapar ve postgangliyonik lif arter çevresinde yükselir. [[K5 s. 229–231]] Bu yüzden üst servikal gangliyonun C2–C3 hizasındaki yeriyle, içinden geçen yolun omurilikteki başlangıç düzeyi farklıdır. [[K5 s. 228]] [[K5 s. 231]]</div>
<h3>Afferent dönüş yolu</h3>
<p>Refleks ve ağrı afferentleri aynı organın efferentleriyle yol paylaşır. [[K5 s. 227–228]] İç organlardan gelenler otonom pleksuslarda, vücut duvarından gelenler periferik spinal sinirlerde ilerler. [[K5 s. 228]] Hücre gövdeleri dorsal kök veya ilgili kraniyal duyu gangliyonundadır ve lifler otonom gangliyonlarda sinaps yapmaz. [[K5 s. 228]] [[K5 s. 241]]</p>
<p>Merkezi yol hipotalamusa, oradan tam bilinmeyen bağlantılarla orbital ve frontal giruslara ulaşır. [[K5 s. 228]] Genellikle algılanmayan impulslar eşiği aşınca koroner iskemi, intermittan kladikasyon veya bağırsak koliğinde olduğu gibi ağrı duyulur. [[K5 s. 228]]</p>
</section>
<section class="wrap blk ders-sec" id="an05-boyun">
<h2>Karotis kılıfından birinci kaburga boynuna</h2>
<p class="intro">Kafa tabanından koksikse inen iki zincir omurgayı yakından izler ve orta hattan yaklaşık 2,5 cm uzakta seyreder. [[K5 s. 228–229]]</p>
${sekil('boyun','Servikal sempatik zincir','Boyunda zinciri karotis kılıfının hemen arkasında, vertebraların transvers çıkıntılarının önünde arayın. [[K5 s. 229]]')}
<p>Servikal gangliyonlar T1–T5’ten pregangliyonik lif alır. [[K5 s. 231]] Sinapstan çıkan lifler baş, boyun ve üst ekstremiteye spinal sinirler, karotis ve dalları ya da vertebral arter çevresindeki pleksuslarla ulaşır. [[K5 s. 230–231]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Gangliyon</th><th>Oluşum ve yer</th><th>Dağılım</th></tr></thead><tbody>
<tr><th>Üst servikal</th><td>C1–C4 gangliyonları birleşir, oluşan gangliyon C2–C3 hizasında ve en az 2,5 cm uzunluğundadır. [[K5 s. 231]]</td><td>Gri dallar C1–C4 ve VII, IX, X, XII. sinirlere gider. [[K5 s. 231–232]] Üst kardiyak sinir solda yüzeyel, sağda derin kardiyak pleksusa iner. [[K5 s. 232]]</td></tr>
<tr><th>Orta servikal</th><td>C5 ve C6 gangliyonlarının birleşmesiyle oluşan küçük gangliyon C6 hizasındadır ve bazen bulunmaz. [[K5 s. 232]]</td><td>Gri dallar C5–C6 ön dallarına, tiroid dalı inferior tiroid arteriyle beze, orta kardiyak sinir derin pleksusa gider. [[K5 s. 232]]</td></tr>
<tr><th>Alt servikal</th><td>C7–C8 gangliyonlarının birleşmesiyle C7–T1 diski hizasında oluşur ve kişilerin %80’inde T1 gangliyonuyla birleşip stellat gangliyonu oluşturur. [[K5 s. 232]]</td><td>Gri dallar C7–C8’e, vertebral arter pleksusu beyne, alt kardiyak sinir derin pleksusa uzanır. [[K5 s. 232]]</td></tr>
</tbody></table></div>
<p><b>Üst gangliyonun iki karotis yolu.</b> İnternal karotis pleksusundan derin petrozal sinir pterigopalatin gangliyona, bir kök siliyer gangliyon üzerinden pupilla dilatatörüne, diğer lifler serebral damarlar ve hipofize gider. [[K5 s. 231–232]] Eksternal karotis ve dallarını izleyen lifler otik ve submandibular gangliyonlara ulaşarak tükürük bezlerinin damar tonusunu düzenler. [[K5 s. 232]]</p>
<p><b>Subklavyen ansa.</b> Alt ve orta gangliyonları zincire ek olarak bir sinir halkası bağlar. [[K5 s. 232]] Halka subklavyen arterin alt kenarını dolaşır, arterin önünden orta gangliyona yükselir. [[K5 s. 232]]</p>
<div class="note plain"><b>Üst ekstremiteye giden lifi izleyin.</b> T2–T5 segmentlerinden gelen pregangliyonik lifler önce beyaz dala, sonra sempatik zincire geçer. [[K5 s. 228–229]] Boyunda sinaps yapan liflerin devamı gri dallarla alt servikal spinal sinirlere katılır ve brakiyal pleksus yoluyla üst ekstremiteye dağılır. [[K5 s. 231–232]] Böylece başa yönelen periarteriyel dallarla kola yönelen spinal dallar aynı servikal zincirden farklı yollarla ayrılır. [[K5 s. 230–232]]</div>
<h3>Toraksta seyir ve dallar</h3>
<p>Zincir birinci kaburga boynunun önünden toraksa girer, üst kaburga başları üzerinden son üç ya da dört torakal vertebra gövdesinin yanına iner. [[K5 s. 229]] Plevra zinciri örter, interkostal damarlar her aralıkta zincirin arkasından geçer. [[K5 s. 229]]</p>
<p>Genellikle on iki torakal gangliyon vardır, sayı en sık T1’in alt servikal gangliyonla birleşmesiyle azalır. [[K5 s. 232]] Her gangliyon kendi interkostal sinirine beyaz ve gri dallarla bağlıdır. [[K5 s. 232]] T2–T4’ten çıkan dallar kardiyak, posterior pulmoner ve özofageal pleksuslara katılır. [[K5 s. 232]] Torakal zincir ayrıca aort duvarına lif verir. [[K5 s. 232]]</p>
<ul class="ozet"><li><b>Büyük splanknik.</b> Alttaki sekiz gangliyondan çıkan splanknik sinirlerden biridir, T5–T9’dan, bazen T10’a kadar olan gangliyonlardan çıkar. [[K5 s. 232]] Azigos ya da hemiazigos veninin lateralinde, vertebra gövdelerinin yanından öne ve aşağı iner, diyafram krusunu delip çölyak gangliyona gelir. [[K5 s. 232]]</li>
<li><b>Küçük splanknik.</b> T9–T10 ya da T10–T11 kaynaklı lifler krusu delip çölyak gangliyona ulaşır. [[K5 s. 232]]</li>
<li><b>En alt splanknik.</b> En alttaki mevcut torakal gangliyondan renal pleksusa giderken krusu deler veya medial arkuat bağın arkasından geçer. [[K5 s. 233]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="an05-lomber">
<h2>Lomber zincir ve sempatik blok</h2>
<p class="intro">Zincir medial arkuat bağın arkasından karna girer ve psoas major ile lomber vertebra gövdesi arasındaki oluğa yerleşir. [[K5 s. 229]]</p>
${sekil('lomber','Aksiyel kesitte hedefin iki komşusu','Gangliyonlar vertebra gövdesinin anterolateralinde, sağda vena kavanın ve solda aortun arkasındadır. [[K5 s. 233–234]]')}
<p>Gevşek retroperitoneal areolar dokudaki gangliyonları kemikten kalın anterior bağ ayırır. [[K5 s. 233]] Lomber arterler zincirin arkasında kalır, lomber venler zinciri çaprazlayabilir. [[K5 s. 229]] Genellikle dört lomber gangliyon bulunur ve üstteki ikisi karşılık gelen lomber sinirden beyaz dal alır. [[K5 s. 233]]</p>
<ul class="ozet"><li><b>Spinal dağılım.</b> Gri dallar lomber sinirlere katılır. [[K5 s. 233]]</li><li><b>Visseral dağılım.</b> Dallar aortik pleksusa gider, başka lifler ortak iliak damarlar üzerinden hipogastrik pleksusa iner. [[K5 s. 233]]</li>
<li><b>Zincirin devamı.</b> Zincir ortak iliak damarların arkasından sakrum kanadının önüne geçer, ön sakral deliklerin medialinde seyreder. [[K5 s. 229]] Genellikle dört sakral gangliyon sakral sinirlere ve pelvik pleksuslara gri dal verir, iki zincir koksiksin önünde impar gangliyonda birleşir. [[K5 s. 229]] [[K5 s. 236]]</li></ul>
<h3>Bloğun klinik karşılığı</h3>
<p>Lokal anestezikle gangliyon iletimi geçici olarak kesilir. [[K5 s. 234]] Fenol, alkol veya radyofrekans lezyonu aylar sürebilen yarı kalıcı bir blok sağlayabilir, K5 bu işlemi lomber sempatektomi olarak adlandırır. [[K5 s. 234]] Geçici blok kısa süreli analjezi için veya çoğu kez sempatektomi yanıtını öngörmek için kullanılmıştır. [[K5 s. 234]] Bloğa verilen yanıt perfüzyondaki değişikliklerle orantılı değildir, kan akımındaki değişiklikler sonraki aylarda normale döner. [[K5 s. 234]]</p>
<ul class="ozet"><li>Semptomatik vazospazm ya da istirahat ağrısı, sınırlı ülser veya yüzeyel gangrenle seyreden inoperabl arteriyel tıkanıklık. [[K5 s. 234]]</li>
<li>Alt ekstremitede tip I ve II kompleks bölgesel ağrı, fantom ekstremite veya güdük ağrısı. [[K5 s. 234]]</li>
<li>Alt ekstremite dermatomlarında akut zona veya postherpetik nevralji, ayrıca akut ya da kronik renal kolik. [[K5 s. 234]]</li></ul>
<div class="note plain"><b>Kesiti hastanın tarafından tarif edin.</b> Bir tarafta psoas kasından gövdeye doğru ilerlediğinizde, gangliyonun bulunduğu oluğa gelirsiniz. [[K5 s. 229]] Buradan öne geçerseniz sağ tarafta venöz, sol tarafta arteriyel bir büyük damarla karşılaşırsınız. [[K5 s. 233–234]] Bu nedenle kesitte görülen kırmızı veya mavi damarı adlandırmak, aynı taraftaki hedefin hangi yüzünde kaldığını söylemekle tamamlanır. [[K5 s. 233–234]]</div>
<h3>Görüntülemede hedef ve kontrast</h3>
<ol class="iskelet"><li><b>Hedef.</b> Pron veya lateral hastada radyografik görüntü güçlendirici, bazen BT kullanılır. [[K5 s. 234–235]] Giriş orta hattın yaklaşık 10–12 cm lateralindedir. [[K5 s. 235]] İğnenin hedefi L2 veya L3 vertebra gövdesinin anterolateral kenarıdır. [[K5 s. 235]]</li>
<li><b>Komşuluk.</b> Kemik temasında iğne geri çekilip daha öne yönlendirilir ve gövde kenarından kaydırılır. [[K5 s. 235]] Psoas fasyası geçilip retroperitona girildiğinde hafif bir atlama hissedilebilir. [[K5 s. 235]]</li>
<li><b>Dağılım.</b> Damar içi konumu dışlamak için aspirasyonun ardından gerçek zamanlı görüntülemede 0,5–2,0 mL radyoopak kontrast verilir. [[K5 s. 235]] Enjeksiyon kolay olmalı ve kontrast gövdelerin hemen önünde kraniyal ve kaudal yönde yayılmalıdır. [[K5 s. 235–236]]</li>
<li><b>Blok türü.</b> Dağılım doğrulanınca lokal anestezik verilebilir, kitap epinefrinli %0,25 bupivakain 15–20 mL örneğini verir. [[K5 s. 236]] Nöroliz için kontrastla birlikte yaklaşık 10 mL %10 fenol tarif eder. [[K5 s. 236]] Görüşler farklı olsa da çok düzeyli nörolitik enjeksiyonun tek enjeksiyona üstünlüğü gösterilmemiştir. [[K5 s. 236]] Radyofrekans lezyonu L2, L3 ve L4 düzeylerinde uygulanır. [[K5 s. 236]]</li></ol>
</section>
<section class="wrap blk ders-sec" id="an05-kalp">
<h2>Aort kavsinin iki yanında kardiyak pleksuslar</h2>
<p class="intro">Yüzeyel pleksus aort kavsinin konkavitesinde, derin pleksus kavsin arkasında yer alır ve ikisi birbirine bağlıdır. [[K5 s. 236]]</p>
${sekil('kalp','Kavis, pulmoner arter ve karina','Yüzeyel ağ pulmoner arterin, derin ağ trakea bifurkasyonunun önündedir. [[K5 s. 236]]')}
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Pleksus</th><th>Gelen dallar</th><th>Giden dallar</th></tr></thead><tbody>
<tr><th>Yüzeyel</th><td>Sol üst servikal gangliyonun üst kardiyak siniri ve sol vagusun alt kardiyak dalı. [[K5 s. 236]]</td><td>Derin kardiyak, sol anterior pulmoner ve sağ koroner arter pleksusları. [[K5 s. 236]]</td></tr>
<tr><th>Derin</th><td>Sağdaki tüm servikal, soldaki orta ve alt servikal gangliyonlar, üst dört torakal gangliyon ve her iki vagusun kardiyak dalları. [[K5 s. 236]]</td><td>Her iki hilustaki pulmoner pleksuslar ile sağ ve sol koroner arterlere eşlik eden pleksuslar. [[K5 s. 236]]</td></tr>
</tbody></table></div>
<p>Toraks ve karın organlarına giden otonom lifler kardiyak, çölyak ve hipogastrik pleksuslar boyunca dağılır. [[K5 s. 236]] Parasempatik lifler de bu ağlardan geçer, ancak sinapsları organ duvarındaki gangliyonlardadır. [[K5 s. 236]]</p>
<div class="note plain"><b>Sol üst kardiyak sinirden başlayın.</b> Bu sinir üst servikal gangliyondan ayrıldıktan sonra aşağıya inerek yüzeyel ağa katılır. [[K5 s. 232]] [[K5 s. 236]] Buradan derin pleksusa geçiş bulunduğu gibi, sağ koroner arteri izleyen liflere de bağlantı vardır. [[K5 s. 236]] Sağ üst servikal gangliyondan başlarsanız ilk varış yeri değişir ve doğrudan derin pleksusa ulaşırsınız. [[K5 s. 232]] [[K5 s. 236]]</div>
<h3>Kalp yanıtı merkezde nasıl düzenlenir?</h3>
<p>Sempatik çıkışın üst merkezleri beyin sapı, hipotalamus ve kortekstedir. [[K5 s. 239]] Vazomotor merkez, pons ve dördüncü ventrikül tabanında orta hatta yakın yerleşen beyin sapı merkezlerine örnektir. [[K5 s. 239]]</p>
<p>Kortikal ve hipotalamik merkezler birbirine yakından bağlıdır ve limbik sistem adını alır. [[K5 s. 239]] Limbik sistemi medial korteksteki singulat ve hipokampal giruslar ile unkus, anterior talamik çekirdek, amigdala ve hipotalamus oluşturur. [[K5 s. 239]] Omuriliğin lateral gri sütunundan çıkan lifler medulla oblongatadan geçip limbik alana kadar izlenebilir. [[K5 s. 239]] Kitap limbik alanı otonom işlevlerin en üst denetim düzeyi olarak tanımlar. [[K5 s. 239]] Bu alanın uyarılması kalp hızı, bağırsak hareketleri ve pupilla yanıtlarında belirgin değişikliklere yol açar. [[K5 s. 239]]</p>
</section>
<section class="wrap blk ders-sec" id="an05-colyak">
<h2>Çölyak arter kökünden pelvise</h2>
<p class="intro">En büyük sempatik pleksus olan çölyak pleksus, L1 düzeyinde çölyak arterin aorttan çıkışını sarar. [[K5 s. 236]]</p>
${sekil('colyak','Çölyak gangliyonları nerede aranır?','Lif ağı, diyafram krusları üzerindeki yaklaşık 2,5 cm çaplı sağ ve sol gangliyonlarda yoğunlaşır. [[K5 s. 236]]')}
<ul class="ozet"><li><b>Ön komşular.</b> Sağ gangliyonun önünde inferior vena kava, sol gangliyonun önünde pankreas ve splenik arter bulunur. [[K5 s. 236]]</li>
<li><b>Gelen lifler.</b> Büyük ve küçük splanknik sinirler ile sağ vagusun çölyak dalı pleksusa ulaşır. [[K5 s. 236]]</li>
<li><b>Adrenal yol.</b> Çok sayıda pregangliyonik lif çölyak gangliyonu sinapssız geçip adrenal medullanın kromafin hücrelerinde sonlanır. [[K5 s. 230]] [[K5 s. 236]] Uçlardan salınan asetilkolin, diğer otonom gangliyonlardaki ileticiyle aynıdır ve kromafin hücrelerden epinefrin ile norepinefrin salgılatır. [[K5 s. 230]]</li></ul>
<p>Kromafin hücreleri, aksonu gelişmemiş postgangliyonik sempatik hücreler gibi düşünülebilir. [[K5 s. 230–231]] Adrenal medulla ve sempatik sinirlerin embriyolojik kökeni nöral kresttir. [[K5 s. 231]]</p>
<h3>Abdominal aort boyunca dağılım</h3>
<ol class="iskelet"><li>Çölyak pleksusun devamı abdominal aortun önünde aortik pleksusu oluşturur ve lomber gangliyonlardan lif alır. [[K5 s. 236]] Aort dallarına eşlik eden ağlar frenik, hepatik, splenik, sol gastrik, renal, mezenterik ve testiküler pleksuslardır. [[K5 s. 236–237]]</li>
<li>Aortik pleksus ve lomber trunkuslardan inen presakral sinirler hipogastrik pleksusu oluşturur. [[K5 s. 237]] Bu ağı ana iliak arterlerin arasında, sakral promontoryum ve sol ana iliak ven üzerinde arayın. [[K5 s. 237]]</li>
<li>Lifler iki tarafta internal iliak arterleri izleyerek sağ ve sol pelvik pleksusları oluşturur. [[K5 s. 237]] Pelvik splanknik sinirlerin parasempatik katkısı burada eklenir ve ortak ağ organlara dağılır. [[K5 s. 237]]</li></ol>
<div class="note plain"><b>Hangi lif gangliyonda durur?</b> Torakstan inen bir splanknik lif için çölyak gangliyon, buradan abdominal organa gidecek ikinci nöronun bulunduğu yerdir. [[K5 s. 230]] Adrenal medullaya giden lif ise aynı bölgeden geçip asetilkolini doğrudan hedef hücrede salar. [[K5 s. 230]] Sağ vagusun çölyak dalıyla gelen parasempatik lif de bu ağdan geçebilir, ancak onun sinapsı ilgili organın duvarındadır. [[K5 s. 236]]</div>
<h3>Çölyak pleksus bloğunda anatomiyi okuyun</h3>
<p>Blok, sempatik sinirlerle dönen ağrı afferentlerinin iletimini kesebilir. [[K5 s. 237]] Kitap lokal anestezik bloğu akut ve kronik pankreatitte, ayrıca alt interkostal blokla birlikte intraabdominal cerrahide rejyonel anestezi için tarif eder. [[K5 s. 237]] Nörolitik bloğun sık kullanım alanı üst gastrointestinal malignite ağrısıdır. [[K5 s. 237]]</p>
<ul class="ozet"><li><b>Pozisyon ve dolaşım.</b> Visseral sempatik blok vazodilatasyon ve hipotansiyon yapabildiğinden kitapta genellikle önceden IV sıvı verildiği belirtilir. [[K5 s. 238]] Pron hastada IV sedasyon ve yüzeyel lokal infiltrasyonla, görüntü güçlendirici veya BT eşliğinde genellikle iki taraflı enjeksiyon tarif edilir. [[K5 s. 238]]</li>
<li><b>Kemik işaretleri.</b> L2’den geçen enine çizgi üzerinde giriş noktaları orta hattın yaklaşık 8–10 cm lateralindedir. [[K5 s. 238]] İğneler 12. kostanın çevresinden ve altından, koronal düzleme yaklaşık 45° açıyla hafif sefalik yönde L1 gövdesine ilerler. [[K5 s. 238]] Kemik temasından sonra geri çekilerek gövdenin anterolateral kenarına yöneltilir. [[K5 s. 238]]</li>
<li><b>İki uç neden farklı yerde?</b> Sol uç aortun hemen arkasında kalır ve aort pulsasyonu iğneye iletilebilir. [[K5 s. 238]] Sağ uç biraz daha ileride, aortun hemen anterolateralindedir. [[K5 s. 238]] İğnelere yakın yapılar arasında büyük damarlar, böbrekler, karaciğer ve pankreas bulunur. [[K5 s. 238]]</li>
<li><b>Kontrast.</b> Damar içi yerleşimi dışlamak üzere aspirasyon yapılır. [[K5 s. 238]] Kontrast L1 çevresinde toplanır ve psoas fasyası boyunca arka sınırı düzgün görünür. [[K5 s. 238]]</li>
<li><b>Etki.</b> Kitap her yana 10 mL lokal anestezik, nöroliz için fenol ya da %50 alkol tarif eder. [[K5 s. 238]] Bilateral bloktan sonra geçici postüral hipotansiyon gelişebilir ve hastaya bu olasılık bildirilir. [[K5 s. 238]] Transaortik yaklaşım da tanımlanmıştır. [[K5 s. 238]]</li></ul>
<p>Yaygın lif ağı çölyak pleksusu radyofrekans lezyonuna daha az elverişli kılar. [[K5 s. 238]] K5, çölyak pleksusa yönelik nörodestrüktif işlemlere alternatif olarak görüntü güçlendirici eşliğinde splanknik sinirlerde radyofrekans lezyonunun giderek daha sık tarif edildiğini aktarır. [[K5 s. 238]]</p>
<details class="an05-okuma"><summary>İki blokta aynı vertebra işareti nasıl okunur?</summary>
<p>Bir görüntüde kontrastı vertebra gövdesinin yanında gördüğünüzü düşünün. Hangi bloğun amaçlandığını belirlemek için önce düzeye, sonra kontrastın biçimine ve büyük damarlarla ilişkisine bakın. [[K5 s. 235–236]] [[K5 s. 238]]</p>
<ul class="ozet"><li><b>Lomber sempatik zincir hedeflenmişse</b> L2 veya L3 gövdesinin kenarı ve yanındaki psoas major hedefi birlikte sınırlar. [[K5 s. 233–235]] İğne psoas fasyasını geçtikten sonra retroperitoneal dokuya ulaşır. [[K5 s. 235]] Kontrastın tek noktada birikmesi yerine gövdelerin önünden hem yukarı hem aşağı ilerlemesi beklenir. [[K5 s. 236]]</li>
<li><b>Çölyak pleksus hedeflenmişse</b> sırtta giriş için kullanılan L2 çizgisi ile kontrastın toplanması beklenen L1 düzeyini ayırın. [[K5 s. 238]] İki uç aynı derinlikte değildir, çünkü biri aortun arkasında kalırken diğeri onun anterolateraline ulaşır. [[K5 s. 238]] Burada düzgün posterior kontrast sınırını veren yapı psoas fasyasıdır. [[K5 s. 238]]</li></ul></details>
</section>
<section class="wrap blk ders-sec" id="an05-kraniyal">
<h2>Kraniyal çıkışta sinaps nerede?</h2>
<p class="intro">Kraniyal çıkışı III, VII, IX ve X. sinirler taşır, en geniş dağılım vagustadır. [[K5 s. 239–240]]</p>
${sekil('bagirsak','Vagusun bağırsak duvarındaki hedefi','Organ duvarında sinaps yapan uzun pregangliyonik liften sonra hedef hücreye yalnız kısa bir yol kalır. [[K5 s. 239–240]]')}
<p>Parasempatik pregangliyonik lif miyelinlidir ve gangliyon organın yakınında ya da duvarındadır. [[K5 s. 239]] Kısa postgangliyonik yol, uyarının bölgesel kalmasını açıklar. [[K5 s. 239–240]] Başta III, VII ve IX’un lifleri dört gangliyonda sinaps yapar, benzer hedeflere giden sempatik ve duyusal lifler bu gangliyonlardan sinapssız geçer. [[K5 s. 239]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sinir</th><th>Gangliyon</th><th>Hedef ve yanıt</th></tr></thead><tbody>
<tr><th>III · Okülomotor</th><td>Siliyer [[K5 s. 240]]</td><td>Pupilla sfinkteri pupillayı daraltır, siliyer kas lensin akomodasyonunu sağlar. [[K5 s. 240]]</td></tr>
<tr><th>VII · Fasiyal</th><td>Pterigopalatin ve submandibular [[K5 s. 240]]</td><td>İlki lakrimal bezin, ikincisi submandibular ve sublingual bezlerin salgısını uyarır. [[K5 s. 240]]</td></tr>
<tr><th>IX · Glossofaringeal</th><td>Otik [[K5 s. 240]]</td><td>Parotise sekretomotor lif verir. [[K5 s. 240]]</td></tr>
<tr><th>X · Vagus</th><td>Visseral duvar gangliyonları [[K5 s. 240]]</td><td>Kalp, akciğer ve sindirim kanalına kardiyak, pulmoner ve sindirim pleksuslarıyla ulaşır. [[K5 s. 239–240]]</td></tr>
</tbody></table></div>
<p>Vagal efferentler alt medulla oblongatanın merkezi gri cevherindeki dorsal vagal çekirdekten çıkar. [[K5 s. 240]] Göz ile tükürük ve lakrimal bezlerin dışındaki kraniyal parasempatik işlevleri vagus üstlenir. [[K5 s. 239–240]]</p>
<ul class="ozet"><li><b>Kalp.</b> İmpuls oluşumu, iletim, uyarılabilirlik ve kasılma baskılanır, hız ve kasılma gücü azalır. [[K5 s. 239]]</li>
<li><b>Akciğer.</b> Bronşlar daralır ve mukus bezlerinin salgısı artar, damarlar üzerinde vazodilatör etki olasıdır. [[K5 s. 239]]</li>
<li><b>Sindirim.</b> Splenik fleksuraya kadar bağırsak kası uyarılır, pilor sfinkteri inhibe edilir, mide ve bağırsak bezleriyle eklentilerinin salgısı artar. [[K5 s. 239]] Bağırsak duvarındaki küçük gangliyonlar Meissner’in submukozal ve Auerbach’ın miyenterik pleksuslarını oluşturur. [[K5 s. 240]]</li></ul>
<p>Kalp, akciğer ve sindirim kanalından dönen afferentler vagusta ilerler, hücre gövdeleri nodöz gangliyondadır ve merkezi uzantıları dorsal vagal çekirdeğe ulaşır. [[K5 s. 241]]</p>
<div class="note plain"><b>Parotise giden iki yolu karşılaştırın.</b> Salgıyı artıran yol IX. sinirden otik gangliyona gelir ve burada sinaps yaptıktan sonra beze dağılır. [[K5 s. 240]] Damar tonusunu düzenleyen yol ise üst servikal gangliyondan çıktıktan sonra eksternal karotis dallarını izleyerek otik gangliyona ulaşır. [[K5 s. 232]] Bu sempatik lifler otik gangliyondan yeni bir sinaps yapmadan geçer. [[K5 s. 239]]</div>
<details class="an05-okuma"><summary>Sinapsın yerini hedef organdan geriye doğru bulun</summary>
<p><b>Lakrimal bezden başlayın.</b> Bezde salgıyı artıran kısa yolun hücre gövdesi pterigopalatin gangliyondadır. [[K5 s. 239–240]] Bu gangliyona merkezden parasempatik lif taşıyan kraniyal sinir VII’dir. [[K5 s. 240]] Aynı gangliyona internal karotis pleksusundan derin petrozal sinirle sempatik lif de ulaşır ve buradan sinaps yapmadan geçer. [[K5 s. 231]] [[K5 s. 239]]</p>
<p><b>Sonra bağırsak duvarından başlayın.</b> Burada ikinci nöronu aramak için boyuna ya da karın arka duvarına dönmek gerekmez, gangliyon hedef organın kendisindedir. [[K5 s. 239–240]] Merkeze doğru izlendiğinde vagal yol, sindirim pleksuslarından vagusun dorsal çekirdeğine kadar uzanır. [[K5 s. 240]] İki örnekte de kısa olan, gangliyondan efektör hücreye kadar olan son yoldur. [[K5 s. 239–240]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an05-sakral">
<h2>Sakral çıkış ve pelvik organlar</h2>
<p class="intro">S2 ve S3’ün, bazen S4’ün ön primer dallarından çıkan pelvik splanknik sinirler (nervi erigentes) pelvik pleksusa katılır. [[K5 s. 241]]</p>
${sekil('pelvis','Mesane ile rektum arasındaki sinir ağı','Pelvik pleksustan organa ulaşan parasempatik liflerin sinapsı organ duvarındaki küçük gangliyonlardadır. [[K5 s. 241]]')}
<ul class="ozet"><li><b>Defekasyon.</b> Sakral çıkış rektum kaslarını ve muhtemelen alt kolon kaslarını uyarır, iç anal sfinkteri inhibe eder. [[K5 s. 241]]</li>
<li><b>Miksiyon.</b> Detrüsör kasılırken iç mesane sfinkteri gevşer, bu iki organ yanıtı sakral çıkışın “boşaltma” işlevini gösterir. [[K5 s. 241]]</li>
<li><b>Erektil dokular.</b> Penis ve klitorisin kavernöz sinüslerine vazodilatör lifler gider. [[K5 s. 241]]</li></ul>
<p>Mesane, prostat, rektum ve uterustan ağrı taşıyan afferentler S2–S4 pelvik splanknik sinirlerinde seyreder. [[K5 s. 241]] Sakral deri, kalça ve uyluk arkasının benzer segmentlere bağlanması ağrının bu alanlara yansımasını açıklar. [[K5 s. 241]] Buradaki S2–S4 dağılımı ağrıyı geri getiren lifleri tanımlar. [[K5 s. 241]] Aynı bölgeden çıkan motor lifler S2 ve S3’ten, bazen S4’ten gelir. [[K5 s. 241]] Duyu lifi periferden beyne uzanırken sempatik ya da parasempatik siniri iletim yolu olarak kullanır ve otonom gangliyonlarda sinaps yapmaz. [[K5 s. 241]]</p>
<div class="note plain"><b>Mesanede yönü tersine çevirin.</b> Mesaneye doğru izlediğiniz motor yolun son nöronu organ duvarındadır ve uyarıldığında detrüsör kasılır. [[K5 s. 226]] [[K5 s. 241]] Ağrıyı mesaneden omuriliğe doğru izlediğinizde pelvik splanknik sinirlerle birlikte dönen ayrı bir afferent lif bulursunuz. [[K5 s. 241]] Bu lif duvar gangliyonunda sinaps yapmadan sakral duyu gangliyonundaki hücre gövdesine ulaşır. [[K5 s. 241]]</div>
</section>
<section class="wrap blk ders-sec" id="an05-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="an05-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an05-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an05-3"></div></div></section>
<section class="wrap blk ders-sec" id="an05-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Lomber sempatik blok için bir aksiyel kesiti inceliyorsunuz. Hedefi iki tarafta gösterin. Hangi komşuluklar konumu doğrulamanıza yardımcı olur?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Önce vertebra gövdesini ve iki psoas major kasını bulun, sonra her gövdenin anterolateral kenarı ile kas arasındaki oluğu gösterin. [[K5 s. 229]] [[K5 s. 233]]</li>
<li>Gangliyonlar retroperitoneal areolar dokudadır, önlerinde sağda inferior vena kava, solda aort bulunur. [[K5 s. 233]]</li>
<li>L2 ya da L3 hizasında hedef gövdenin anterolateral kenarıdır, psoas fasyasının geçişi hafifçe hissedilebilir. [[K5 s. 235]]</li>
<li>Kontrastın gövdelerin önünde yukarı ve aşağı yayılması beklenir. [[K5 s. 235–236]]</li></ol>
<div class="note"><b>Çizin.</b> Aksiyel kesitte ön yönü ve hastanın sağını işaretleyin, vertebra, iki psoas, gangliyonlar, aort ve vena kavayı yerleştirin. [[K5 s. 233–234]]</div>
<h3>Ek sorular</h3><ul class="ozet"><li>Çölyak blokta sağ ve sol iğne uçları aorta göre nerede kalır? [[K5 s. 238]]</li><li>Birinci kaburga boynuyla zincirin ilişkisi nedir ve stellat gangliyon hangi birleşmeyle oluşur? [[K5 s. 229]] [[K5 s. 232]]</li><li>Pelvik splanknik sinirin çölyak gangliyona giden büyük splanknik sinirden farkı nedir? [[K5 s. 232]] [[K5 s. 241]]</li></ul></section>
<section class="wrap blk ders-sec" id="an05-ozet"><h2>Özet</h2><ul class="ozet"><li>Beyaz dal T1–L2’den zincire girer, gri dal ise her spinal sinire ulaşır. [[K5 s. 228–229]]</li>
<li>Boyunda birinci kaburga boynu, lomber bölgede psoas ile gövde arasındaki oluk, zincirin izlenebileceği işaretlerdir. [[K5 s. 229]]</li>
<li>Çölyak gangliyonları L1’de arter kökünün iki yanındadır, hipogastrik pleksus ise ana iliak arterlerin arasındadır. [[K5 s. 236–237]]</li>
<li>Parasempatik lifler hedefe yakın sinaps yapar, visseral afferentler otonom gangliyonları sinapssız geçer. [[K5 s. 239–241]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="05"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/04f">← Popliteal fossa, bacak–ayak sinirleri ve alt ekstremite dermatomları</a><a href="#/dersler/anatomi/06a">Sonraki: Kraniyal sinirlere giriş ve I–IV. sinirler →</a></nav>
</section>`,
  };
})();
