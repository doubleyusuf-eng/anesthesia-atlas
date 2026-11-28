VERI.sorular = VERI.sorular || {};
VERI.sorular['fk02-1'] = {
  no: 1, kok: 'Kuvvet ve hareket', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 29–33]]',
  onermeler: [
    { t: 'Sürati sabit bir cisim ivmelenemez.', d: false, n: 'Virajda sürat değişmese de hızın yönü değişir ve cisim ivmelenir. [[K6 s. 30]]' },
    { t: 'Aynı net kuvvet daha büyük bir kütleye daha küçük ivme kazandırır.', d: true, n: 'İvme, net kuvvetin kütleye bölümüdür. [[K6 s. 30–31]]' },
    { t: 'Bir kişinin Ay’daki kütlesi Dünya’dakinden küçüktür.', d: false, n: 'Kütle aynı kalır, daha küçük çekim ivmesi ağırlığı azaltır. [[K6 s. 31–32]]' },
    { t: 'Yaya ait geri çağırıcı kuvvet yer değiştirmenin ters yönündedir.', d: true, n: 'Hooke denklemindeki eksi işareti yayın denge boyuna dönme eğilimini gösterir. [[K6 s. 32–33]]' },
    { t: 'Basınç, kuvvetin birim uzunluk başına düşen miktarıdır.', d: false, n: 'Basınç için kuvvet yüzey alanına bölünür. [[K6 s. 32]]' },
  ],
};
VERI.sorular['fk02-2'] = {
  no: 2, kok: 'Viskozite ve kan akımı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 33–35]]',
  onermeler: [
    { t: 'Suyun viskozitesi sabit sıcaklıkta akış hızından bağımsızdır.', d: true, n: 'Su, akış hızı değişirken viskozitesini koruyan Newton tipi sıvıya örnektir. [[K6 s. 33–34]]' },
    { t: 'Kan hızla akarken eritrositlerin kümelenmesi belirginleşir.', d: false, n: 'Kümelenme yavaş akımda görülür, hızlı akımda hücreler uzayıp hizalanır. [[K6 s. 34]]' },
    { t: 'Kan soğuduğunda viskozitesi artar.', d: true, n: 'Soğukta viskozitenin artması uç bölgelerde dolaşımı güçleştirir. [[K6 s. 34]]' },
    { t: 'Bir poise, 0,1 Pa·s değerindedir.', d: true, n: 'Poise cinsinden sayısal değer 0,1 ile çarpılarak Pa·s cinsine çevrilir. [[K6 s. 34]]' },
    { t: 'Belirgin polisitemi kılcal damarlarda tıkanmaya yol açabilir.', d: true, n: 'Hematokritteki belirgin artış viskoziteyi yükselterek küçük damarların açıklığını tehlikeye sokabilir. [[K6 s. 34–35]]' },
  ],
};
VERI.sorular['fk02-3'] = {
  no: 3, kok: 'Yüzey gerilimi, geometri ve alveol', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 35–41]]',
  onermeler: [
    { t: 'Aynı basınç farkı ve yarıçapta kürenin duvar gerilimi silindirinkinin iki katıdır.', d: false, n: 'Kürede T = ΔP·r/2, silindirde T = ΔP·r olduğundan küre için gereken gerilim yarısıdır. [[K6 s. 36–37]]' },
    { t: 'Surfaktan alveolü örten sıvının yüzey gerilimini düşürür.', d: true, n: 'Yüzey geriliminin düşmesi kompliyansı artırır ve solunum işini azaltır. [[K6 s. 37–38]]' },
    { t: 'Eşit yüzey geriliminde küçük alveolün iç basıncı daha yüksektir.', d: true, n: 'Aynı dış basınca açılan iki küresel kesede ΔP = 2T/r bağıntısı küçük yarıçap için daha büyük fark verir. [[K6 s. 38–39]]' },
    { t: 'Kritik kapanmada damardan geçen kan akımı durur.', d: true, n: 'Damar tümüyle çöktüğünde içinden kan geçemez. [[K6 s. 36–37]]' },
    { t: 'Camdaki cıvanın menisküsü içbükeydir.', d: false, n: 'Cıva atomlarının birbirine çekimi cama çekimden güçlüdür ve yüzey dışbükeydir. [[K6 s. 40–41]]' },
  ],
};

const FK02_NAV = [
  ['hareket','Hareket'], ['agirlik','Ağırlık'], ['basinc','Basınç'], ['yay','Yay'],
  ['kan','Viskozite'], ['yuzey','Yüzey gerilimi'], ['laplace','Laplace'],
  ['alveol','Surfaktan'], ['meniskus','Menisküs'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];

SAYFALAR['dersler/fizik/02'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 2',
  baslik: 'Basit mekanik: kuvvet, basınç, viskozite ve yüzey gerilimi',
  lede: 'Solunum devresinin dirseğinde gazın yönünü kuvvet değiştirir. [[K6 s. 30]] Alveolde ise hava ile sıvının sınırındaki gerilim, keseyi açık tutmak için gereken basıncı belirler. [[K6 s. 37–39]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK02_NAV.map(([id, ad], i) => `<button type="button" data-scroll="fk02-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk02-hareket">
  <h2>Sürat sabitken hız nasıl değişir?</h2>
  <p class="intro">Bir otomobil dönel kavşağı 20 km/sa süratle alırken hız göstergesi aynı değerde kalır, fakat hareketin yönü sürekli değişir. [[K6 s. 30]]</p>
  <div class="viz"><div class="viz-head"><h3>Kavşakta hız vektörü</h3></div><div data-viz="fk02_hareket"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p><b>Sürat</b> yalnız büyüklüğü olan bir skalerdir, <b>hız</b> ise süratle birlikte hareket yönünü de bildiren bir vektördür. [[K6 s. 30]] Bir kütlenin hızını değiştirebilen etkiye kuvvet denir. [[K6 s. 29]] İvme, hızın zamana göre değişimidir ve sürat, yön ya da her ikisi birlikte değiştiğinde ortaya çıkar. [[K6 s. 30]]</p>
  <div class="fk02-kartlar">
    <article class="card"><h3>Birinci yasa · Hareketi koruma</h3><p>Net kuvvet yokken duran cisim durur, hareketli cisim ise aynı doğrultuda sabit süratle ilerler. [[K6 s. 29–30]] Cam üzerinde yuvarlanan bilyeye çok az sürtünme etki ettiğinden hızı neredeyse sabit kalır. [[K6 s. 29]]</p><p>Kitabın uzay örneğinde Voyager 1, Güneş Sistemi’nin dış bölgesinden 63 000 km/sa süratle uzaklaşır ve bir yıldızın ya da başka bir cismin yakınına gelmedikçe bu hareketi sürdürür. [[K6 s. 29]]</p></article>
    <article class="card"><h3>İkinci yasa · Hızdaki değişim</h3><p><i>F</i> = <i>m</i>·<i>a</i> bağıntısına göre aynı kütleye uygulanan net kuvvet artarsa ivme de aynı oranda artar. [[K6 s. 30–31]] Dolu alışveriş arabasına boş arabayla aynı ivmeyi kazandırabilmek için daha büyük kuvvet gerekir. [[K6 s. 30]]</p><p>Hız <i>v</i> için birim m·s<sup>−1</sup>, ivme <i>a</i> için m·s<sup>−2</sup>, kütle <i>m</i> için kg’dır. [[K6 s. 31]] 1 kg kütleye 1 m·s<sup>−2</sup> ivme kazandıran kuvvet 1 newtondur (<i>F</i>, N = kg·m·s<sup>−2</sup>). [[K6 s. 31]]</p></article>
    <article class="card"><h3>Üçüncü yasa · Etki ve tepki</h3><p>Bir cisim diğerine kuvvet uyguladığında aynı büyüklükte, ters yönlü bir kuvvetle karşılaşır. [[K6 s. 31]] Kitabın geri tepme örneğinde öne itilen saçmaya uygulanan kuvvetin karşılığı tüfeğe geriye doğru etki eder. [[K6 s. 31]]</p></article>
  </div>
  <div class="note"><b>Birimi kullanarak ikinci yasayı okuyun.</b> Bir newtonun tanımındaki 1 kg kütleye 1 N net kuvvet uygulandığında ivme 1 m·s<sup>−2</sup> olur. [[K6 s. 31]] Aynı kuvveti kitabın 70 kg kütlesine uygularsanız ivme 1/70 m·s<sup>−2</sup> olur. [[K6 s. 30–31]] Buna karşılık 70 kg kütleye 1 m·s<sup>−2</sup> ivme kazandırmak için 70 N net kuvvet gerekir. [[K6 s. 30–31]] Bu iki hesabın birinde kuvveti, diğerinde ivmeyi sabit tutarak dolu ve boş araba örneğindeki farkı sayıyla görebilirsiniz. [[K6 s. 30–31]]</div>
  <h3>Yönü değiştiren kuvveti bulun</h3>
  <p>İpe bağlı tenis topunu çember üzerinde döndürürken ip topu merkeze doğru çeker ve sürati değişmese bile top ivmelenir. [[K6 s. 30]] Dünya’nın Güneş çevresindeki hareketinde ipin görevini kütle çekimi üstlenir. [[K6 s. 30]] Newton’un düşen elmayla ilişkilendirilen gözlemi, kütlelerin birbirini çekmesiyle hem elmanın düşüşünü hem de Ay’ın Dünya çevresindeki yörüngesini açıklar. [[K6 s. 29]]</p>
  <p>Solunum devresinin her kıvrımında gazın yönü değişir. [[K6 s. 30]] Bir T-parçasında yön değiştiren gaz ya da sıvı da aynı nedenle kuvvet etkisinde ivmelenir. [[K6 s. 30]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap, dalda asılı elmanın ağırlığı ile sapın elmaya uyguladığı kuvveti üçüncü yasa altında ele alır. [[K6 s. 31]] Bu iki kuvvet aynı elmayı dengeler; sapın elmaya uyguladığı kuvvetin tepki eşi elmanın sapa uyguladığı kuvvettir. [[K6 s. 31]]</div>
  <p>Başlangıçta duran elmayı sap ağırlığı kadar yukarı çekerse elma dengede kalır. [[K6 s. 31]] Yukarı çekiş ağırlığı aşarsa elma yukarı, ağırlığın altında kalırsa aşağı doğru ivmelenir. [[K6 s. 30–31]]</p>
  <details class="fk02-okuma"><summary>Kavşaktan çıkmadan önce kendinizi sınayın</summary>
  <p>Hız okunu kavşağın iki karşı noktasında karşılaştırın. Okların eşit uzunlukta olması hangi niceliğin sabit kaldığını gösterir? Aracın iki noktadaki hızı için de aynı şeyi söyleyebilir misiniz?</p>
  <p>Ok uzunluğu sürati temsil eder; karşı noktalarda uzunluklar eşitken okların yönleri birbirine terstir. [[K6 s. 30]] Kuvvet okunun ise merkeze yönelmesi, ipin tenis topuna uyguladığı çekişin kavşaktaki karşılığıdır. [[K6 s. 30]] Kuvvet ortadan kalksaydı birinci yasaya göre cisim o andaki hızının doğrultusunda düz bir yol izlerdi. [[K6 s. 29–30]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk02-agirlik">
  <h2>Kütle aynı kalırken ağırlık</h2>
  <p class="intro">Ağırlık, bir cisme etki eden kütle çekim kuvvetidir ve newtonla ölçülür. [[K6 s. 31]]</p>
  <div class="viz"><div class="viz-head"><h3>Aynı kütleyi Dünya ve Ay’da tartın</h3></div><div data-viz="fk02_agirlik"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Gündelik dilde “70 kilo ağırlığında” dediğimiz kişinin 70 kg olan özelliği kütlesidir. [[K6 s. 31]] Kilogram ve libre kütle birimleridir, ağırlık ise gezegenin büyüklüğüne ve kişinin gezegene uzaklığına göre değişir. [[K6 s. 31]]</p>
  <div class="card"><h3>Hesap · 70 kg için çekim kuvveti</h3><p><i>w</i> = <i>m</i>·<i>g</i> bağıntısında <i>w</i> ağırlık (N), <i>m</i> kütle (kg), <i>g</i> yerel çekim ivmesidir (m·s<sup>−2</sup>). [[K6 s. 31–32]] Dünya’da <i>g</i> = 9,81 m·s<sup>−2</sup> olduğundan 70 × 9,81 = 686,7 N, yani yaklaşık 700 N bulunur. [[K6 s. 31–32]]</p>
  <p>Ay’da aynı kişinin kütlesi yine 70 kg’dır, ancak çarpımda kullanılan ivme 1,62 m·s<sup>−2</sup> olur. [[K6 s. 31–32]] Derin uzayda ağırlıksız kabul edilen kişi de kütlesini korur, dolayısıyla onu ivmelendirmek için hâlâ kuvvet gerekir. [[K6 s. 32]]</p></div>
  <div class="note plain"><b>Atlas notu.</b> Kitap Ay’daki ağırlığı 177 N verir, ancak kendi çekim ivmesi kullanıldığında doğru sonuç 70 × 1,62 = 113,4 N’dur. [[K6 s. 31–32]]</div>
  <details class="fk02-okuma"><summary>Grafikte hangi karşılaştırma kütleyi sabit tutar?</summary>
  <p>Kaydırıcıyı hareket ettirmeden, aynı düşey doğrultudaki iki noktayı okuyun. Her iki noktada yatay eksenden okunan kütle aynıdır, düşey ayrım ise iki farklı çekim ivmesinden kaynaklanır. [[K6 s. 31–32]] Şimdi kütleyi azaltın: seçilen her kütlede daha dik olan Dünya doğrusunun ağırlık değeri daha büyüktür. [[K6 s. 31–32]]</p>
  <p>Birim denetimi de aynı sonucu verir: kg ile m·s<sup>−2</sup> çarpıldığında kg·m·s<sup>−2</sup>, yani N elde edilir. [[K6 s. 31]] Çekim kuvveti azaldığında kişiyi aynı ivmeyle yana doğru hızlandırmak için gereken net kuvvet değişmez, çünkü ikinci yasadaki kütle değişmemiştir. [[K6 s. 30–32]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk02-basinc">
  <h2>Aynı kuvvet, farklı temas alanı</h2>
  <p class="intro">Raptiyeyi tahtaya bastırırken başparmak geniş başa dayanır, tahta ise kuvveti sivri ucun çok küçük temas alanında karşılar. [[K6 s. 32]]</p>
  <div class="viz"><div class="viz-head"><h3>Raptiyede kuvvetin iletimi</h3></div><div data-viz="fk02_raptiye"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Basınç, yüzeye uygulanan kuvvetin yüzey alanına bölümüdür: <i>P</i> = <i>F</i>/<i>A</i>. [[K6 s. 32]] Kuvvet <i>F</i> newton, temas alanı <i>A</i> metrekare ile yazılırsa basınç <i>P</i> için birim N·m<sup>−2</sup> (Pa) olur. [[K6 s. 31–32]]</p>
  <p>Üçüncü yasaya göre ucun tahtaya uyguladığı kuvvet başparmağın kuvvetine eşittir; buna karşın uç, tahtayı şekil değiştirecek kadar yüksek basınca maruz bırakır. [[K6 s. 32]] Ekmek keserken de keskin ağız, küçük temas alanıyla aynı işi kolaylaştırır. [[K6 s. 32]] Kör bıçağın daha geniş ağzıyla aynı basıncı elde etmek için daha büyük kuvvet uygulamak gerekir. [[K6 s. 32]]</p>
  <div class="viz"><div class="viz-head"><h3>Temas alanını küçültün, kuvveti sabit tutun</h3></div><div data-viz="fk02_alan"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">İki eksen de başlangıç değerine oranı gösterir; eğri P = F/A bağıntısından hesaplanmıştır. [[K6 s. 32]]</p></div>
  <p>Sağ uçta her iki oran da birdir. [[K6 s. 32]] Şimdi temas alanını başlangıç alanının yarısına indirin: aynı kuvvet yarı alana dağıldığı için basınç iki katına çıkar. [[K6 s. 32]] Raptiyenin ucunda yüksek basınç oluşması için parmağın uyguladığı kuvvetten daha büyük bir kuvvet üretmek gerekmez. [[K6 s. 32]]</p>
  <p>Karşılaştırmayı tersinden de okuyabilirsiniz: tahtaya aynı basıncı uygulamayı hedefleyip alanı büyüttüğünüzde kuvveti alanla aynı oranda artırmanız gerekir. [[K6 s. 32]] Kör bıçak örneğinde sabit tutulan hedef büyüklük basınçtır; raptiyede baş ile uç arasında karşılaştırılan büyüklük ise aynı kuvvetin iki yüzeydeki etkisidir. [[K6 s. 32]]</p>
</section>
<section class="wrap blk ders-sec" id="fk02-yay">
  <h2>Hooke yasası ve yaylı basınç valfi</h2>
  <p class="intro">Bir yayı ya da elastik şeridi denge boyundan uzaklaştırdığınızda onu başlangıç boyuna döndürecek bir kuvvet doğar. [[K6 s. 32–33]]</p>
  <div class="viz"><div class="viz-head"><h3>Yayı sıkıştırın veya uzatın</h3></div><div data-viz="fk02_yay"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Boy ve kuvvet oku göreli ölçektedir, model elastik sınırlar içindir. [[K6 s. 32–33]]</p></div>
  <p><i>F</i> = −<i>k</i>·<i>x</i> denkleminde <i>x</i> yayın ucunun denge konumundan yer değiştirmesi (m), <i>k</i> yay sabiti (N·m<sup>−1</sup>), <i>F</i> yayın geri çağırıcı kuvvetidir (N). [[K6 s. 32–33]] Uzama pozitif, sıkışma negatif yer değiştirmedir. [[K6 s. 33]] Eksi işareti, kuvvetin her iki durumda da denge konumuna yöneldiğini gösterir. [[K6 s. 33]]</p>
  <p>Elastik sınırlar içinde yer değiştirmeyi iki katına çıkarmak için uygulanan kuvveti de iki katına çıkarmak gerekir. [[K6 s. 32–33]] Yay sabiti büyüdükçe yay sertleşir ve aynı uzamayı elde etmek güçleşir. [[K6 s. 33]] Yay yüklü diyaframlı basınç valfleri bu kuvvet–uzama ilişkisinden yararlanır. [[K6 s. 33]]</p>
  <div class="viz"><div class="viz-head"><h3>Diyafram ile yayın temas ettiği yer</h3></div><div data-viz="fk02_valf"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kesit, valfin yay ve diyafram bölgesini gösterir. [[K6 s. 33]]</p></div>
  <p>Kesiti okurken önce diyaframın yüzeyini bulun. Bu yüzeye etki eden basınç farkı, alanla çarpıldığında yaya karşı etki eden kuvveti verir. [[K6 s. 32–33]] Yayın aynı miktarda sıkışmasına karşı gösterdiği kuvvet yay sabitine bağlıdır, bu yüzden aynı yer değiştirmeyi yorumlarken hangi yayın kullanıldığı önemlidir. [[K6 s. 33]]</p>
  <p>Şemadaki kesikli çizgiyi başlangıç konumu olarak alın. Kaydırıcıyı denge konumunun iki yanında eşit uzaklığa götürün. Kuvvet oklarının eşit uzunlukta fakat zıt yönde olması, kuvvetin büyüklüğünü belirleyen <i>k</i>·|<i>x</i>| çarpımı ile yönünü belirleyen eksi işaretini ayrı ayrı gösterir. [[K6 s. 32–33]]</p>
</section>
<section class="wrap blk ders-sec" id="fk02-kan">
  <h2>Viskozite · Akan kanın iç sürtünmesi</h2>
  <p class="intro">Kan yavaş akarken eritrositler kümelenmeye eğilimlidir, akım hızlanınca hücrelerin biçimi ve dizilişi değişir. [[K6 s. 33–34]]</p>
  <div class="viz"><div class="viz-head"><h3>Aynı damar kesitinde iki akım durumu</h3></div><div data-viz="fk02_kan"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Hücrelerin biçim ve dizilişi şematiktir. [[K6 s. 34]]</p></div>
  <p>Bir sürahiden dökülen süt kolay akar, akçaağaç şurubu ise akmaya daha fazla direnç gösterir. [[K6 s. 33]] Bu direncin ölçüsü <b>viskozite</b>dir ve gazların da viskozitesi vardır. [[K6 s. 33]] Akışkanı, birbiri üzerinden kayan tabakalar halinde düşünün: tabakalar arasındaki iç sürtünme kayma gerilmesine yol açar. [[K6 s. 33]]</p>
  <div class="fk02-kartlar">
    <article class="card"><h3>Newton tipi · Su</h3><p>Su küçük ve birbirine benzer H₂O moleküllerinden oluşur. [[K6 s. 33]] Akış hızı değiştiğinde viskozitesi sabit kalır ve bu özellik Newton tipi akışkanı tanımlar. [[K6 s. 33]]</p></article>
    <article class="card"><h3>Newton tipi olmayan · Kan</h3><p>Kan bol su içerir, ancak hacminin yaklaşık beşte ikisini eritrositler oluşturur. [[K6 s. 33–34]] Yavaş akımda birbirine tutunan hücreler, komşu tabakaların kaymasını güçleştirir. [[K6 s. 34]] Hızlı akımda uzayıp akış yönünde sıralanınca tabakalar daha kolay kayar ve viskozite düşer. [[K6 s. 34]]</p><p>Newton tipi olmayan akışkanlarda belirleyici özellik viskozitenin akış hızıyla değişmesidir, bazı akışkanlarda akım hızlanınca viskozite artabilir. [[K6 s. 33–34]]</p></article>
  </div>
  <h3>Sıcaklık, hücre oranı ve dolaşım</h3>
  <ul>
    <li><b>Soğuma.</b> Soğuk şurubu dökmek oda sıcaklığındaki şurubu dökmekten daha uzun sürer, çünkü soğurken viskozitesi artar. [[K6 s. 34]] Su ve kanın viskozitesi de sıcaklık düştüğünde artar. [[K6 s. 34]]</li>
    <li><b>Donma yaralanması.</b> Uç bölgelerde kandan ısı kaybı viskoziteyi artırır ve dolaşımı güçleştirir. [[K6 s. 34]] Bu kişiler sıklıkla dehidratedir, bu da kanın koyulaşmasına katkıda bulunur. [[K6 s. 34]] Kan çamur kıvamını andıracak ölçüde koyulaşınca etkilenen dokudan geçişi güçleşir. [[K6 s. 34]]</li>
    <li><b>Hematokrit.</b> Hematokrit, kan hacminin eritrositlere ait payını gösterir. [[K6 s. 34]] Hücre oranı arttıkça viskozite artar ve kan akımı güçleşir. [[K6 s. 34]] Venöz staz pıhtılaşmayı kolaylaştırdığından eritropoietini (EPO) kötüye kullanan sporcularda tromboembolik olay riski artar. [[K6 s. 34]]</li>
    <li><b>Polisitemi.</b> Hematokritte orta dereceli değişiklikler iyi tolere edilebilir. [[K6 s. 34–35]] Polisitemideki belirgin artış ise viskoziteyi arteriyoller ve kılcal damarlarda tıkanmaya yol açabilecek kadar yükseltebilir. [[K6 s. 34–35]]</li>
  </ul>
  <div class="note"><b>Birim dönüşümü.</b> Dinamik viskozitenin SI birimi pascal saniyedir (Pa·s, poiseuille). [[K6 s. 34]] Kitapta daha sık kullanıldığı belirtilen poise, dyn·s·cm<sup>−2</sup> olarak yazılır ve 1 poise = 0,1 Pa·s’dir. [[K6 s. 34]]</div>
  <details class="fk02-okuma"><summary>Akım hızını, sıcaklığı ve hematokriti ayrı değerlendirin</summary>
  <p>Önce yalnız akım hızını değiştirin. Şemada aynı hücreler iki durumda da görünür; hızlı akımda azalan direnç, eritrositlerin uzayıp akıma paralel dizilmesinden kaynaklanır. [[K6 s. 33–34]] Hücre oranındaki bir artış ise ayrı bir değişikliktir ve akımı güçleştiren yönde etki eder. [[K6 s. 34]]</p>
  <p>Şimdi suyu düşünün: su için akım hızının viskoziteyi değiştirmemesi, sıcaklık düştüğünde de viskozitenin sabit kalacağı anlamına gelmez. [[K6 s. 33–34]] Donma yaralanmasında da iki etkiyi ayrı izleyin: uç bölgedeki kanın soğuması viskoziteyi yükseltir ve eşlik eden sıvı kaybı kanı daha da koyulaştırabilir. [[K6 s. 34]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk02-yuzey">
  <h2>Bir damla neden küreye yaklaşır?</h2>
  <p class="intro">Damlanın içindeki molekülü komşuları her yandan çeker, serbest yüzeydeki molekülün ise dış tarafta su komşusu yoktur. [[K6 s. 35–36]]</p>
  <div class="viz"><div class="viz-head"><h3>Suyun içinden yüzeyine</h3></div><div data-viz="fk02_yuzey"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Su molekülünde oksijen, elektronları iki hidrojen atomundan daha güçlü çeker. [[K6 s. 36]] Bu eşitsiz paylaşım oksijen tarafında kısmi negatif, iki hidrojen tarafında kısmi pozitif yük bölgeleri (dipoller) oluşturur. [[K6 s. 36]] Elektronu oksijene doğru çekilen hidrojeni, protonu kısmen açıkta kalmış gibi düşünebilirsiniz. [[K6 s. 36]]</p>
  <p>Bir molekülün kısmi pozitif hidrojeni ile komşusunun kısmi negatif oksijeni arasındaki elektrostatik çekim <b>hidrojen bağını</b> oluşturur. [[K6 s. 36]] Moleküller arasında etkili olan bu bağ, molekülün kendi içindeki kovalent bağdan çok daha zayıftır. [[K6 s. 36]]</p>
  <p>Yüzeyde bağ kurulabilecek komşu sayısı azalır ve mevcut komşular arasındaki çekim molekülleri birbirine yaklaştırır. [[K6 s. 35–36]] Sıvının serbest yüzeyi boyunca etkili olan <b>yüzey gerilimi</b> bu moleküller arası çekimden doğar ve yüzeye paralel etkir. [[K6 s. 35–36]]</p>
  <ul>
    <li><b>Sıvı damlası.</b> Yerçekimi olmadığında su damlası belirli hacmi en küçük yüzey alanıyla çevreleyen şekle, yani küreye yaklaşır. [[K6 s. 35]] Asılı damlayı yerçekimi aşağı çeker, böylece damla düşey yönde uzayarak elipsoide yaklaşır. [[K6 s. 35]]</li>
    <li><b>Suyun üzerinde.</b> Sudan yoğun bazı küçük cisimler yüzeyde kalabilir ve su üzerinde yürüyen böcekler de yüzeyin bu özelliğinden yararlanır. [[K6 s. 35]]</li>
    <li><b>Sıvı içinde gaz.</b> Bir gaz kabarcığını çevreleyen sıvının yüzey gerilimi, kabarcığı küre biçimine çeker ve içindeki gazı biraz sıkıştırır. [[K6 s. 36]] Bu nedenle kabarcığın gaz basıncı onu çevreleyen sıvının basıncından yüksektir. [[K6 s. 36]]</li>
  </ul>
  <details class="fk02-okuma"><summary>Molekülün çekildiği yön ile yüzey geriliminin yönünü ayırın</summary>
  <p>İçteki molekülü seçtiğinizde okların onu çevreleyen komşulara doğru yayıldığını görün. Yüzeydeki moleküle geçince sıvının dış tarafındaki oklar kaybolur. Şemadaki bu fark, suyun iç kısmına doğru moleküler çekimle ilgilidir. [[K6 s. 35–36]]</p>
  <p>Yüzey gerilimini tarif ederken ise serbest yüzey boyunca bir uzunluk düşünün: bu uzunluk başına yüzeye paralel bir kuvvet düşer. [[K6 s. 36]] Bir su damlasında içeride sıvı, sıvı içindeki bir kabarcıkta içeride gaz vardır; her ikisinde de arayüzün küçülme eğilimi küresel şekli destekler. [[K6 s. 35–36]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk02-laplace">
  <h2>Laplace yasası · Geometri duvardaki yükü değiştirir</h2>
  <p class="intro">Belirli bir iç–dış basınç farkını karşılamak için yarıçap büyüdükçe duvarda daha fazla gerilim gerekir. [[K6 s. 35–37]]</p>
  <div class="viz"><div class="viz-head"><h3>Aynı yarıçapta küre ve silindir</h3></div><div data-viz="fk02_laplace"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Eğriler, örnek alveolün yüzey gerilimi sabit tutularak hesaplanır; silindir eğrisi aynı değerle yapılan geometrik karşılaştırmadır. [[K6 s. 36–37]] [[K6 s. 39–40]]</p></div>
  <p><b>Duvar gerilimi</b>, sıvı yüzeyindeki gerilimin elastik katı bir duvardaki karşılığıdır. [[K6 s. 35]] Her ikisi de birim uzunluğa düşen kuvvetle ifade edilir: gerilim <i>T</i> için SI birimi N·m<sup>−1</sup>’dir. [[K6 s. 36]] Pierre-Simon Laplace, kabarcığın içi ile dışı arasındaki basınç farkını yüzey gerilimi ve yarıçapla ilişkilendirmiştir. [[K6 s. 36]]</p>
  <div class="fk02-kartlar">
    <article class="card"><h3>Küresel yüzey</h3><p><b>Δ<i>P</i> = 2<i>T</i>/<i>r</i>.</b> Burada Δ<i>P</i> iç basınçtan dış basınç çıkarılınca bulunan fark (Pa), <i>r</i> yarıçap (m), <i>T</i> yüzey ya da duvar gerilimidir (N·m<sup>−1</sup>). [[K6 s. 36–37]] Aynı gerilim korunursa küçük kürenin içindeki basınç farkı daha büyük olur. [[K6 s. 36–38]]</p></article>
    <article class="card"><h3>Silindirik damar</h3><p><b>Δ<i>P</i> = <i>T</i>/<i>r</i>.</b> Damarda <i>T</i>, yüzey gerilimiyle elastik duvarın gerilimini birlikte içerir. [[K6 s. 36]] Denklemi gerilim için yazarsak silindirde <i>T</i> = Δ<i>P</i>·<i>r</i>, kürede <i>T</i> = Δ<i>P</i>·<i>r</i>/2 bulunur. [[K6 s. 36–37]]</p></article>
  </div>
  <div class="viz"><div class="viz-head"><h3>Damar kapanınca akım yoluna ne olur?</h3></div><div data-viz="fk02_kapanma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Boyuna kesit şematiktir; iki görünüm açıklığı ve tam kapanmayı karşılaştırır. [[K6 s. 36–37]]</p></div>
  <p>Önce damarın içinden geçen yolu bir uçtan ötekine izleyin. Sonra kritik kapanmayı seçin ve karşılıklı duvarların birleştiği yeri bulun. Kitabın tanımında aranan nokta, lümenin tamamen kapandığı ve damardan kan geçişinin durduğu andaki kan basıncıdır. [[K6 s. 36–37]]</p>
  <p>İç ve dış basıncı karşılaştırırken kanın duvarın hangi yüzüne etki ettiğini düşünün. [[K6 s. 36–37]] Kitap bu örneği dış basıncın iç basıncı aştığı durumla açıklar ve kapanma basıncını değerlendirirken damar düz kasının tonusunu, kanın viskozitesini ve yüzey gerilimini de dikkate alır. [[K6 s. 37]]</p>
  <h3>Bu ilişki klinikte nerede görülür?</h3>
  <ul>
    <li><b>Kritik kapanma basıncı</b>, damarın bütünüyle çöküp içindeki kan akımının durduğu kan basıncıdır. [[K6 s. 36–37]] Kitabın tarifinde bu noktada damar dışındaki basınç damar içindekini aşar. [[K6 s. 37]] Yüzey gerilimi belirleyicidir, kan viskozitesi ve damar düz kasının tonusu da rol oynar. [[K6 s. 37]] Yüzey gerilimi düşükse kritik kapanma basıncı azalır. [[K6 s. 37]]</li>
    <li><b>Dilate kardiyomiyopati.</b> Genişlemiş sol ventrikülün ejeksiyonda yine aynı basıncı oluşturması gerekir. [[K6 s. 37]] Küre modeliyle bakıldığında artmış yarıçap, ventrikül duvarının üretmesi gereken gerilimi artırır ve kalbin kanı pompalamasını güçleştirir. [[K6 s. 37]] Etkin yarıçapı azaltmak üzere ventrikülün cerrahi olarak yeniden şekillendirilmesi tedavi seçeneklerinden biridir. [[K6 s. 37]]</li>
    <li><b>Aort anevrizması.</b> Arter duvarının zayıf bir kesimi dışa bombeleşirse yerel yarıçap artar. [[K6 s. 37]] Basınç aynı kaldığında artan gerilim duvarı daha fazla zorlar ve genişleme kendini besler. [[K6 s. 37]] Aynı basınç farkı ve yarıçapta küresel duvar için silindire gereken gerilimin yarısı yeterlidir; kitap anevrizmaların sıklıkla küresel bir çıkıntı oluşturmasını bu ilişkiyle açıklar. [[K6 s. 37]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap tam kapanma için dış basıncın damar içi basıncı aşmasını gerekli sayar. [[K6 s. 36–37]] Aktif düz kas tonusu olan bir damar, iç basınç dış basınçtan hâlâ yüksekken de kapanabilir. [[K6 s. 37]]</div>
  <details class="fk02-okuma"><summary>Basınç mı, gerilim mi sabit tutuluyor?</summary>
  <p>Grafiği soldan sağa izlerken sabit tutulan büyüklük <i>T</i>’dir. [[K6 s. 36–37]] Büyük alveolün örnek gerilimiyle küre eğrisinin iki ucunu hesaplayın: 2 × 0,02 / 0,00005 = 800 Pa ve 2 × 0,02 / 0,00010 = 400 Pa. [[K6 s. 36]] [[K6 s. 39–40]] Aynı yarıçaplarda silindir bağıntısı kullanıldığında sırasıyla 400 ve 200 Pa bulunur. [[K6 s. 36–37]] [[K6 s. 39–40]]</p>
  <p>Ventrikül ve anevrizma örneklerinde ise soru değişir: korunması gereken büyüklük verilen basınç farkıdır. [[K6 s. 37]] Bu kez yarıçap arttıkça aynı basıncı taşıyacak duvarın gerilimini artırmak gerekir. [[K6 s. 35–37]] Dolayısıyla eğride basıncın azalması ile genişleyen kalpte gereken gerilimin artması aynı denklemin iki farklı okunuşudur. [[K6 s. 36–37]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk02-alveol">
  <h2>Surfaktan · İki farklı alveol nasıl yan yana açık kalır?</h2>
  <p class="intro">Aynı yüzey gerilimine sahip, birbirine açık iki küresel alveolde küçük kesenin basıncı daha yüksektir ve hava büyük keseye yönelir. [[K6 s. 38–39]]</p>
  <div class="viz"><div class="viz-head"><h3>Alveollerde basınç dengesini kurun</h3></div><div data-viz="fk02_alveol"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Alveolün iç yüzünü örten sıvının başlıca bileşeni sudur ve bu tabakanın yüzey gerilimi akciğeri kollapsa çeker. [[K6 s. 37]] Küçük yarıçapta bu etki belirgindir; yarı şişmiş bir balonu biraz daha şişirmeye göre boş balonu ilk kez şişirmek daha güçtür. [[K6 s. 37]] Akciğerde çok sayıda küçük alveolün toplam yüzey gerilimi solunuma ciddi bir yük getirebilir. [[K6 s. 38]]</p>
  <p>Bir sıvının yüzey gerilimini düşüren bileşiğe <b>surfaktan</b> denir. [[K6 s. 38]] Sağlıklı akciğerde alveol hücrelerinden salgılanan pulmoner surfaktan yüzey sıvısına karışır, gerilimi azaltır ve akciğer kompliyansını artırarak solunum işini düşürür. [[K6 s. 37–38]] Surfaktan varken bile yüzey geriliminin etkisi bağ dokusunun ürettiği elastik kuvvetlerden büyüktür. [[K6 s. 37]]</p>
  <h3>Yarıçapı değiştirince gerekli şişirme basıncı</h3>
  <div class="fk02-kartlar">
    <article class="card"><h3>Küçük kese · 0,005 mm</h3><p>Surfaktan yoksa yaklaşık 15 mmHg gerekir; surfaktan varlığında yaklaşık 1 mmHg yeterlidir. [[K6 s. 38]]</p></article>
    <article class="card"><h3>Büyük kese · 0,01 mm</h3><p>Surfaktan yoksa yaklaşık 7,5 mmHg gerekir; surfaktan varlığında burada da yaklaşık 1 mmHg yeterlidir. [[K6 s. 38]]</p></article>
  </div>
  <p>Surfaktan yokken yarıçapı küçük olan kesenin daha yüksek basıncı, komşu büyük keseye hava geçişini destekler. [[K6 s. 38–39]] Küçük keselerde surfaktanın daha yüksek oranda bulunması yüzey gerilimini daha fazla düşürür. [[K6 s. 38–40]] Böylece farklı yarıçaplarda şişirme basınçları dengelenebilir ve iki kese birlikte işlev görebilir. [[K6 s. 38–39]]</p>
  <div class="note"><b>Prematüre yenidoğan.</b> İnfant respiratuvar distres sendromunda gelişimini tamamlamamış akciğerde surfaktan eksiktir. [[K6 s. 38]] Bebek alveollerdeki yüzey gerilimini aşmakta zorlanır. [[K6 s. 38]]</div>
  <div class="card fk02-hesap"><h3>Çözümlü örnek · Küçük kesede hangi gerilim gerekir?</h3>
  <ol><li>Büyük kesenin yarıçapı 0,10 mm ve yüzey gerilimi 0,02 N·m<sup>−1</sup>, komşu küçük kesenin yarıçapı ise 0,05 mm’dir. [[K6 s. 39]]</li>
  <li>Önce yarıçapları metreye çevirin: <i>r</i><sub>b</sub> = 0,00010 m ve <i>r</i><sub>k</sub> = 0,00005 m. [[K6 s. 39–40]]</li>
  <li>Her alveolü bir küre kabul edip basınç farklarını eşitleyin: 2<i>T</i><sub>k</sub>/<i>r</i><sub>k</sub> = 2<i>T</i><sub>b</sub>/<i>r</i><sub>b</sub>. [[K6 s. 39–40]]</li>
  <li>Küçük kesede <i>T</i><sub>k</sub> = <i>T</i><sub>b</sub> × <i>r</i><sub>k</sub>/<i>r</i><sub>b</sub> = 0,02 × (0,00005/0,00010) = <b>0,01 N·m<sup>−1</sup></b> gerekir. [[K6 s. 39–40]]</li></ol>
  <p>Yarıçap yarıya inince gerilim de yarıya inerse iki alveolün basınçları eşit kalır; küçük kesedeki daha yüksek surfaktan oranı bunu sağlar. [[K6 s. 39–40]]</p></div>
  <details class="fk02-okuma"><summary>Bulduğunuz sonucu iki basıncı hesaplayarak sınayın</summary>
  <p>Büyük kesede 2 × 0,02 / 0,00010 = 400 Pa bulunur. [[K6 s. 36]] [[K6 s. 39–40]] Küçük keseye hesaplanan 0,01 N/m değerini yerleştirince 2 × 0,01 / 0,00005 = 400 Pa elde edilir. [[K6 s. 36]] [[K6 s. 39–40]] Her iki yarıçapı da metre kullandığınız için yüzey geriliminin birimi N/m, basınç farkının birimi N/m² olur. [[K6 s. 32]] [[K6 s. 36]] [[K6 s. 39–40]]</p>
  <p>Bu hesap kartında aranan, küçük alveolün gerilimidir; yukarıdaki şişirme basıncı kartlarında ise iki farklı yarıçap için surfaktan varken ve yokken gereken basınçlar karşılaştırılır. [[K6 s. 38–40]] İki örneği birbirine bağlayan nokta, küçük kesenin basıncını büyük keseninkine indirmek için küçük kesede yüzey geriliminin de düşmesi gereğidir. [[K6 s. 38–40]]</p></details>
</section>
<section class="wrap blk ders-sec" id="fk02-meniskus">
  <h2>Menisküs · Sıvının kapla buluştuğu yüzey</h2>
  <p class="intro">Sıvının serbest yüzeyi olan menisküsün şekli, sıvı taneciklerinin birbirini ve kabın yüzeyini ne kadar güçlü çektiğine bağlıdır. [[K6 s. 40–41]]</p>
  <div class="viz"><div class="viz-head"><h3>Cam kenarında su ve cıva</h3></div><div data-viz="fk02_meniskus"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Menisküs düz, içbükey veya dışbükey olabilir. [[K6 s. 40]] Su molekülleriyle cam arasındaki çekim, su moleküllerinin birbirine uyguladığı çekimden daha güçlüdür; su cam boyunca yükselir ve ortası kenarlarından alçakta kalan içbükey bir yüzey oluşur. [[K6 s. 40–41]]</p>
  <p>Cıva atomları birbirini cama göre daha güçlü çeker. [[K6 s. 40]] Bu kez cam kenarındaki yüzey ortadan alçakta kalır ve cıvanın menisküsü dışbükey görünür. [[K6 s. 40–41]]</p>
  <p>Şekli okurken gözünüzü önce kaba temas eden kenara, sonra ortadaki serbest yüzeye götürün. Cam aynı kaldığı halde su ile cıva arasında biçimin tersine dönmesi, kabın malzemesi kadar sıvı tanecikleri arasındaki çekimin de önemli olduğunu gösterir. [[K6 s. 40–41]]</p>
</section>
<section class="wrap blk ders-sec" id="fk02-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin ve gerekçenizi kontrol edin.</p>
  <div class="viz"><div data-viz="mtf" data-q="fk02-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk02-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk02-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk02-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Yay yüklü diyaframlı bir basınç valfini düşünün. Diyaframa etki eden basıncı ve yayın karşı kuvvetini nasıl ilişkilendirirsiniz? Alveolü şişirmek için gereken basıncı hangi ilişkiyle açıklarsınız?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
  <li>Basınç birim yüzeye uygulanan kuvvettir, dolayısıyla belirli bir alana etki eden basınçtan kuvvet <i>F</i> = <i>P</i>·<i>A</i> ile bulunur. [[K6 s. 32]]</li>
  <li>Yay yüklü diyaframlı valfte elastik sınırlar içinde yayın karşı kuvveti, yer değiştirmeyle doğru orantılıdır. [[K6 s. 32–33]]</li>
  <li>Yay sabiti arttığında aynı yer değiştirme için gereken kuvvet büyür. [[K6 s. 33]]</li>
  <li>Alveolün hava–sıvı yüzeyini küre kabul edince Δ<i>P</i> = 2<i>T</i>/<i>r</i> olur. [[K6 s. 36–39]]</li>
  <li>Yüzey gerilimleri aynıysa küçük keseye daha yüksek şişirme basıncı gerekir. [[K6 s. 38–39]]</li>
  <li>Küçük kesede surfaktanın daha yüksek oranda bulunması iki kesedeki basıncı dengeleyebilir. [[K6 s. 38–40]]</li></ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Birbirine açık, yarıçapları farklı iki küresel alveol çizin. Önce gerilimleri eşit tutup havanın gideceği yönü gösterin, sonra basınçların eşit olacağı yüzey gerilimlerini işaretleyin. [[K6 s. 38–40]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Yay sıkışınca geri çağırıcı kuvvetin yönü ne olur? [[K6 s. 33]] Damarın kritik kapanma basıncı neyi ifade eder? [[K6 s. 36–37]] Dilate ventrikülde aynı ejeksiyon basıncına ulaşmak neden güçtür? [[K6 s. 37]]</div></div>
</section>
<section class="wrap blk ders-sec" id="fk02-ozet"><h2>Özet</h2><ul class="ozet">
  <li>Eğri yol izleyen cisim ya da yön değiştiren gaz akımı, sürati değişmese de ivmelenir ve bunun için net kuvvet gerekir. [[K6 s. 29–30]]</li>
  <li>Ağırlık kütle ile çekim ivmesinin çarpımı, basınç ise kuvvetin temas alanına bölümüdür. [[K6 s. 31–32]]</li>
  <li>Yayın geri çağırıcı kuvveti elastik sınırlar içinde yer değiştirmeyle orantılı ve ters yönlüdür. [[K6 s. 32–33]]</li>
  <li>Kan hızlı akımda daha az viskozdur, soğuma ve hematokrit artışı viskoziteyi yükseltir. [[K6 s. 34]]</li>
  <li>Yüzey gerilimi damlanın yüzeyini küçültür ve moleküller arası çekimden doğar. [[K6 s. 35–36]]</li>
  <li>Laplace bağıntısında aynı basınç farkını taşıyan duvarda yarıçap büyüdükçe gereken gerilim artar. [[K6 s. 35–37]]</li>
  <li>Pulmoner surfaktan, alveol sıvısının gerilimini düşürerek kompliyansı artırır ve solunum işini azaltır. [[K6 s. 37–38]]</li>
  </ul><div data-viz="tamam" data-modul="fizik" data-bolum="02"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/01">← Atomlar ve madde</a><a href="#/dersler/fizik/03">Sonraki: Enerji ve güç: solunum ve kalbin yaptığı iş →</a></nav>
</section>`,
};
