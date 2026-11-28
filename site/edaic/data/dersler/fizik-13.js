VERI.sorular = VERI.sorular || {};
(() => {
  const soru = (no, kok, kaynak, onermeler) => ({
    no, kok, kaynak, kagit: 'Paper A · Fizik', onermeler: onermeler.map(([t, d, n]) => ({t, d, n}))
  });
  VERI.sorular['fk13-1'] = soru(1, 'Tüpün kimliği ve içeriği', '[[K6 s. 222–228]]', [
    ['Pin indeks sisteminin pimleri tüp valfindedir.', false, 'Pimler cihazın boyunduruğunda, karşılık gelen delikler tüp valfindedir. [[K6 s. 222]]'],
    ['Bodok contası neoprenden yapılır.', true, 'Tüp ile boyunduruk arasında gaz sızdırmazlığı sağlayan pul neoprendir. [[K6 s. 222]]'],
    ['Dara, suyla dolu tüpün kütlesidir.', false, 'Tüpe damgalanan dara boş tüpün ağırlığıdır. [[K6 s. 227]]'],
    ['Sabit sıcaklıkta sıvı N₂O azalırken manometre aynı basıncı gösterebilir.', true, 'Sıvı kaldığı sürece gösterge doymuş buhar basıncını okur. [[K6 s. 227]]'],
    ['Oksijen oda sıcaklığında 137 bar basınçta sıvıdır.', false, 'Tabloda oksijen bu koşulda gaz hâlindedir. [[K6 s. 224]]']
  ]);
  VERI.sorular['fk13-2'] = soru(2, 'Merkezi gaz ve vakum', '[[K6 s. 230–234]]', [
    ['Manifoldda etkin tüp grubunun basıncı düşünce diğer gruba otomatik geçilebilir.', true, 'Etkin sıradaki tüpler boşalırken basınç düşüşü yedek sıraya geçişi başlatır. [[K6 s. 231]]'],
    ['VIE iç kabuğu paslanmaz çeliktir.', true, 'İç kap paslanmaz çelikten, dış kap karbon çeliğinden yapılır. [[K6 s. 232]]'],
    ['Pnömatik cerrahi aletler için hava çıkışı 4 bardır.', false, 'Alet çıkışı 7 bar, ventilasyon çıkışı 4 bardır. [[K6 s. 233]]'],
    ['Aspirasyon hortumunda düşük kompliyans istenir.', true, 'Görece sert hortum negatif basınç altında çökmeye dirençlidir. [[K6 s. 234]]'],
    ['Schrader probunun oturması çekme testiyle kontrol edilir.', true, 'Yerine kilitlenen bağlantı hafifçe çekilerek denetlenir. [[K6 s. 230]]']
  ]);
  VERI.sorular['fk13-3'] = soru(3, 'Entonox ve yangın güvenliği', '[[K6 s. 228–236]]', [
    ['Entonox hazırlanırken tüpe önce oksijen konur.', false, 'Önce N₂O konur, ardından ters çevrilen tüpte oksijen kabarcıklar hâlinde geçirilir. [[K6 s. 228]]'],
    ['Tabakalaşan Entonox tüpünde sıvının üstündeki gaz başlangıçta oksijence zengindir.', true, 'N₂O sıvılaşırken üstte oksijen oranı yüksek bir gaz fazı kalır. [[K6 s. 229]]'],
    ['Dip borusu geç dönemde hipoksik karışım riskini ortadan kaldırır.', false, 'Dip borusu riski geciktirir, sıvı bitince hipoksik karışım verilebilir. [[K6 s. 229]]'],
    ['N₂O oksitleyici olarak yanmayı destekler.', true, 'Oksijen ve N₂O kendileri yanmadan oksitleyici olarak yangını destekler. [[K6 s. 235]]'],
    ['Kapalı alanda biriken alkol buharı yangın riski taşır.', true, 'Yüzey temizliğinde kullanılan uçucu alkolün buharı dar alanlarda birikerek patlama tehlikesi oluşturabilir. [[K6 s. 236]]']
  ]);

  const nav = [['tup','Tüp ve valf'],['kimlik','Gaz kartları'],['faz','Basınç ve faz'],['entonox','Entonox'],['merkez','Merkezi gaz'],['vie','Sıvı oksijen'],['vakum','Vakum'],['yangin','Yanma riski'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  const sekil = (id, baslik, dip) => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk13_${id}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${dip}</p></div>`;
  const gazlar = [
    ['Oksijen · O₂','Siyah (ABD’de yeşil)','Beyaz','−118 °C / 50 bar','137 bar · gaz','224'],
    ['Karbondioksit · CO₂','Gri','Gri','31 °C / 73,8 bar','50 bar · sıvı ve buhar','224–225'],
    ['Nitröz oksit · N₂O','Mavi','Mavi','36,5 °C / 71,7 bar','44 bar · sıvı ve buhar','225'],
    ['Tıbbi hava','Gri (ABD’de sarı)','Beyaz ve siyah çeyrekler','Verilmemiş','137 bar · gaz','225'],
    ['Entonox · O₂ ve N₂O','Mavi','Beyaz ve mavi çeyrekler','Verilmemiş','137 bar · gaz','225'],
    ['Heliox · O₂ ve helyum','Kahverengi','Beyaz ve kahverengi çeyrekler','Verilmemiş','137 bar · gaz','225']
  ];
  SAYFALAR['dersler/fizik/13'] = {
    grup:'dersler', eyebrow:'Fizik · Bölüm 13', baslik:'Tıbbi gaz kaynakları: tüpler, merkezi sistem, vakum ve yanma riski',
    lede:'Oksijen manifoldunda basınç düşüşü yedek tüplere geçişi başlatırken sıvı içeren bir N₂O tüpünde aynı gösterge kalan miktarı bildirmez. [[K6 s. 227]] [[K6 s. 231]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad])=>`<button type="button" data-scroll="fk13-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk13-tup">
<h2>Tüpü tanıma ve cihaza bağlama</h2>
<p class="intro">Bir tüpe daha fazla gaz basıldığında sabit hacimde moleküller birbirine yaklaşır, yoğunluk ve basınç artar. [[K6 s. 221]]</p>
${sekil('valf','Valf yüzünde hangi açıklık ne işe yarar?','Deliklerin düzeni şematiktir, bu çizimden gaza özgü pim konumu okunmaz. [[K6 s. 222–223]]')}
<p>Gaz tüpü, içeriğini atmosfer basıncının üzerinde tutan bir kaptır. [[K6 s. 221]] Kitap, sıkıştırma ile basınç artışı arasındaki ilişkiyi Boyle yasasıyla açıklar. [[K6 s. 221]] CO₂ ve N₂O’da yakınlaşan moleküller arasındaki çekim sıvı faz oluşmasına izin verir ve valf açıldığında sıvının üstündeki buhar çıkar. [[K6 s. 221]]</p>
<h3>Bağlantı sırası</h3><ol>
<li><strong>Mührü kontrol et.</strong> Kitap, mühür sağlamsa tüpü cihaza takmadan önce valfin kısa süre açılmasını, çıkan gazın toz ve üretim artıklarını uzaklaştırmasını tarif eder. [[K6 s. 222]]</li>
<li><strong>Boyunduruğu eşleştir.</strong> Regülatör ya da anestezi cihazının boyunduruğundaki pimler, yalnız o gaza özgü konumdaki deliklere oturur. [[K6 s. 222]] Yanlış tüpte pimler yüzeylerin birleşmesini engeller ve sızdırmaz bağlantı kurulamaz. [[K6 s. 222]]</li>
<li><strong>Contayı ayırt et.</strong> Pimler gazı seçerken tüp ile boyunduruk arasındaki neopren Bodok pulu sızdırmazlığı sağlar. [[K6 s. 222]]</li>
<li><strong>Akışı aç.</strong> Kitap, tüp cihaza bağlandıktan sonra valfin tam açılması için sola iki tur çevrilmesini tarif eder. [[K6 s. 222]] Yetersiz açılma, özellikle tüp boşalmaya yakınken akışı sınırlayabilir. [[K6 s. 222]]</li>
<li><strong>Basıncı düşür ve valfi koru.</strong> Regülatör tüpün yüksek basıncını kullanım düzeyine indirir. [[K6 s. 222]] Valf sağa, saat yönünde kapatılır ve hasarı önlemek için gereğinden fazla kuvvet uygulanmaz. [[K6 s. 222]]</li></ol>
<details class="fk13-kart"><summary>Valf, pim, conta ve regülatör hangi dört soruya cevap verir?</summary>
<dl><dt>Akış var mı?</dt><dd>Valfin açık konumu gazın çıkışına izin verir, ancak kısmen açılmış bir valf özellikle tüp boşalırken istenen akışı sağlayamayabilir. [[K6 s. 222]]</dd>
<dt>Doğru gaz mı?</dt><dd>Boyunduruğun pimleri regülatöre veya anestezi cihazına aittir, tüpte aranan yapı bu pimleri kabul eden deliklerdir. [[K6 s. 222]]</dd>
<dt>Birleşim gaz kaçırır mı?</dt><dd>Doğru eşleşmede gaz geçirmez yüzeyi oluşturan parça, valf ile boyunduruk arasına yerleştirilen neopren puldur. [[K6 s. 222]]</dd>
<dt>Basınç cihaza uygun mu?</dt><dd>Bu soruyu regülatör yanıtlar, çünkü tüpte depolama için kullanılan yüksek basıncı cihazın kullanabileceği basınca indiren parça odur. [[K6 s. 222]]</dd></dl></details>
<h3>İmalat ve bakım</h3>
${sekil('dayanim','Dolum basıncı ile gövdenin tasarım basıncını karşılaştırın','Her noktada tasarım basıncı, seçilen dolum basıncının %66 üzerindedir. [[K6 s. 221]]')}
<p><strong>İki basıncı ayırın.</strong> Yatay eksende tüpteki gaz için belirtilen dolum basıncı, düşey eksende gövdenin dayanacak şekilde tasarlandığı basınç bulunur. [[K6 s. 221]] İlişkiyi yazarken <i>P</i><sub>tasarım</sub> = <i>P</i><sub>dolum</sub> + 0,66 × <i>P</i><sub>dolum</sub> alınır, iki basınç da aynı birimle ifade edilir. [[K6 s. 221]]</p>
<p>Oksijen kartındaki 137 bar değerini seçin: 137 barın %66’sı 90,42 bardır ve tasarım basıncının hesaplanan karşılığı 227,42 bardır. [[K6 s. 221]] [[K6 s. 224]] Bu örnekte tüp için belirtilen dolum basıncı hâlâ 137 bardır, dayanım payı gövdenin mekanik özelliğini anlatır. [[K6 s. 221]] [[K6 s. 224]]</p><ul>
<li>Tüp, içindeki gaza özgü dolum basıncının %66 üzerindeki basınca dayanacak biçimde tasarlanır. [[K6 s. 221]] Yangın ve patlama yanında temas yanığı, bağlı donanımın donması ve yanlış manometre okuması da olası tehlikelerdir. [[K6 s. 221]]</li>
<li>Çelik gövde, zayıf birleşme noktalarını azaltmak için dikişsiz yapılır ve sıklıkla az miktarda molibden gibi metallerle güçlendirilir. [[K6 s. 223–224]] Duvar kalınlığı artırılırken dayanım kazancı ile taşıma ağırlığı dengelenir. [[K6 s. 224]]</li>
<li>Küçük taşıma tüpleri alüminyumdan veya karbon lifli kompozitten yapılabilir, bu seçenekler daha hafif ve daha pahalıdır. [[K6 s. 224]]</li>
<li>Boyut sınıfları en küçük A’dan en büyük J’ye uzanır, üretim ve gereksinimler çeşitlendikçe AV ve AZ gibi alt sınıflar doğmuştur. [[K6 s. 224]] Çoğu anestezi cihazına takılan standart boy E’dir ve kesin teknik veriler üreticinin çizelgesinden okunur. [[K6 s. 224]]</li>
<li>Kitap, çatlak ve korozyonu aramak için her beş yılda bir endoskopla iç muayene tarif eder. [[K6 s. 223]] Boyundaki plastik diskin rengi ve biçimi üretim ve son bakım yıllarını kodlar. [[K6 s. 223]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk13-kimlik"><h2>Gazı tanıma ve tüpleri depolama</h2>
<p class="intro">Omuz rengi hızlı tanımaya yardım eder, valfteki kazınmış kimyasal formül, son kullanma tarihi ve güvenlik uyarılı standart etiket tüpün denetimini tamamlar. [[K6 s. 223–224]]</p>
${sekil('gaz','Oda sıcaklığında tüpte hangi faz bulunur?','Basınçlar kitaptaki oda sıcaklığı tablosuna aittir. [[K6 s. 224–225]]')}
<div class="fk13-kartlar">${gazlar.map(([ad,govde,omuz,kritik,hal,s])=>`<article><h3>${ad}</h3><p>Gövde: ${govde} · Omuz: ${omuz}. [[K6 s. ${s}]]</p><p>Kritik sıcaklık / basınç: ${kritik}. [[K6 s. ${s}]]</p><p>Oda sıcaklığında: ${hal}. [[K6 s. ${s}]]</p></article>`).join('')}</div>
<p>Bir bar 100 kPa’dır. [[K6 s. 225]] Kitap Avrupa standardına geçişte gövdelerin beyaz olacağını, omuz renklerinin ise büyük ölçüde korunacağını belirtir. [[K6 s. 224]]</p>
<p>Büyük tüplerde pin indeks bulunmaz, yanıcı olmayan gazlarda sağ dişli, yanıcı gazlarda sol dişli valf kullanılır. [[K6 s. 223]] Bazı tüplerde Schrader soketi hazır takılıdır. [[K6 s. 223]]</p>
<details class="fk13-kart"><summary>İki gri gövde veya iki mavi gövde gördüğünüzde neye bakarsınız?</summary>
<p>Kitaptaki renk düzeninde gri gövdeli tüp karbondioksit de tıbbi hava da içerebilir. [[K6 s. 224–225]] Gri omuz karbondioksiti, beyaz ve siyah çeyreklerden oluşan omuz tıbbi havayı gösterir. [[K6 s. 224–225]]</p>
<p>Mavi gövde için de aynı ayrım gerekir: N₂O tüpünün omzu mavi, Entonox tüpünün omzu ise beyaz ve mavi çeyrekler hâlindedir. [[K6 s. 225]] Bu iki mavi tüp içerik bakımından da ayrılır, oda sıcaklığı tablosunda biri sıvı ve buhar, diğeri gaz içerir. [[K6 s. 225]]</p>
<p>Son kontrol için gazın kimyasal formülünü pin indeksin üzerinde, standart tanımlama etiketini tüpün gövdesinde arayın. [[K6 s. 223]] Boyundaki renkli plastik diskin işlevi farklıdır, rengini ve biçimini birlikte okumak üretim ve son servis yılı hakkında bilgi verir. [[K6 s. 223]]</p></details>
<h3>Depoda düzen</h3><ul><li>Tercihen kapalı, kuru ve sıcaklığı sabit bir alanda, tüpleri dik tutan raf ve taşıma arabaları kullanılır. [[K6 s. 224]]</li><li>Dolu tüpler boşlardan ayrı tutulur ve dönüşümlü kullanılır, tıbbi tüpler klinik dışı tüplerden ayrı saklanır. [[K6 s. 224]]</li><li>Oksijen, N₂O ve oksijenli karışımlar yanmayı desteklediğinden Heliox ve Entonox da dâhil olmak üzere bu tüpler yanıcı gazlarla birlikte depolanmaz. [[K6 s. 224]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk13-faz"><h2>N₂O tüpünde basınç ve faz</h2>
<p class="intro">Sabit sıcaklıkta tüpte sıvı kaldığı sürece manometrenin gösterdiği değer, kalan sıvı miktarından bağımsız olarak doymuş buhar basıncıdır. [[K6 s. 227]]</p>
${sekil('izoterm','Sıkıştırırken neden bir basınç platosu görülür?','İzotermler hacim ölçeği verilmeden nitel olarak çizilmiştir. [[K6 s. 225–226]]')}
<p>Gerçek gazlar atmosfer basıncına yakınken ideal gaz modeline yaklaşır, yüksek basınçta bu modelden sapabilir. [[K6 s. 225]] İzoterm üzerinde sağdan sola gidildikçe aynı sıcaklıkta hacim küçülür. [[K6 s. 225]]</p>
<ul><li><strong>40 °C.</strong> N₂O kritik sıcaklığın üstündedir, basınç ne kadar artırılırsa artırılsın gaz kalır ve basınç düzgün biçimde yükselir. [[K6 s. 225]]</li><li><strong>Kritik izoterm.</strong> Kitabın izoterm anlatımı geçişi 36,6 °C ve 72 bar ile gösterir, gaz tablosunda ise kritik çift 36,5 °C ve 71,7 bardır. [[K6 s. 225]]</li><li><strong>20 °C.</strong> Basınç 52 bara ulaşınca buharın bir bölümü yoğuşur. [[K6 s. 226]] Hacim küçülmeye devam ederken sıvı payı artar, fakat basınç aynı kalır. [[K6 s. 226]] Son buhar da yoğuşunca hacmi biraz daha küçültmek büyük bir basınç artışı gerektirir, çünkü sıvı çok az sıkıştırılabilir. [[K6 s. 226]]</li></ul>
<details class="fk13-kart"><summary>İzotermi kalemle nasıl izlersiniz?</summary><p>20 °C eğrisinin sağ ucundan başlayın ve sıcaklığı değiştirmeden hacmi küçültün. Önce gaz bölgesinde basınç yükselir, 52 bara ulaştığınızda ilk sıvı oluşur. [[K6 s. 225–226]] Parmağınızı sola doğru plato boyunca kaydırdığınızda değişen büyüklük basınç değil, sıvıya dönüşen buhar miktarıdır. [[K6 s. 226]]</p>
<p>Platonun sol ucunda bütün buhar sıvıya dönüşmüştür. [[K6 s. 226]] Eğrinin burada dikleşmesi, aynı hacim azalması için sıvı bölgede çok daha büyük bir basınç değişikliği gerektiğini gösterir. [[K6 s. 226]] Şimdi 40 °C izotermini seçin: sıkıştırma boyunca basınç artar, fakat sıcaklık kritik değerin üzerinde olduğu için yoğuşma platosuna ulaşılmaz. [[K6 s. 225]]</p></details>
<p><strong>Gaz kartındaki 44 bar ile 52 barı nasıl okursunuz?</strong> Birinci değer kitabın oda sıcaklığındaki tüpleri karşılaştıran tablosunda N₂O için verdiği depolama basıncıdır. [[K6 s. 225]] İkincisi, sıcaklığın özellikle 20 °C olarak belirtildiği izotermdeki doymuş buhar basıncıdır. [[K6 s. 226]] Bu nedenle grafikteki platoyu anlatırken hem 52 bar değerini hem de bu değerin ait olduğu sıcaklığı söyleyin. [[K6 s. 226]]</p>
<h3>Boşalma sırasında manometre</h3>
${sekil('bosalma','Son sıvı kaybolunca gösterge nasıl değişir?','Plato ve sonraki üstel düşüş nitel olarak çizilmiştir, zaman ve sıvı düzeyi ölçekli değildir. [[K6 s. 227–228]]')}
<p>Valften buhar çekildiğinde yüzeyden ayrılan moleküller buhar fazını yeniler. [[K6 s. 227]] Sıcaklık sabitse aynı manometre okuması çok farklı sıvı miktarlarına karşılık gelebilir. [[K6 s. 227]] Son damla buharlaştıktan sonra gaz molekülleri tüpten ayrıldıkça basınç üstel olarak azalır. [[K6 s. 228]]</p>
<h3>Dolum neden kütleyle yapılır?</h3><p>Tüp %100 sıvıyla doluysa küçük bir sıcaklık artışı bile sıvıyı genleştirerek basıncı hızla yükseltebilir ve tüp yırtılabilir ya da patlayabilir. [[K6 s. 226]] Üstte buhar boşluğu bırakılırsa genleşen sıvı buharı sıkıştırır, buharın bir kısmı yoğuşur ve ani basınç artışı sınırlanır. [[K6 s. 226]]</p>
<p><strong>Dolum oranı</strong> = tüpe doldurulan gazın kütlesi / aynı tüpü tamamen dolduran suyun kütlesi. [[K6 s. 226–227]] İki kütle aynı birimle yazıldığında oran birimsizdir ve yaklaşık üçte iki, 0,67 veya %67 olarak gösterilebilir. [[K6 s. 227]] Kitap Birleşik Krallık için en çok 0,75, sıcak iklimler için öneri olarak 0,67 verir. [[K6 s. 227]] Boş tüpün üzerine damgalanan dara, içeriğin tartıyla belirlenmesine temel olur. [[K6 s. 227]]</p>
 ${sekil('dolum','Aynı su kapasitesinde izin verilen gaz kütlesini karşılaştırın','Birim su kütlesine ölçeklenen çizginin eğimi seçilen dolum oranıdır. [[K6 s. 226–227]]')}
<p>Şekilde önce su kapasitesini sabit bırakın ve sıcak iklim seçeneğine geçin. Aynı tüp için izin verilen gaz kütlesi azalır, çünkü payda değişmezken dolum oranı 0,75’ten 0,67’ye iner. [[K6 s. 227]] Şimdi oranı sabit tutarak su kapasitesini değiştirin: aynı dolum oranı uygulanıyorsa kapasite ile gaz kütlesi birlikte ve doğru orantılı değişir. [[K6 s. 227]]</p>
<details class="fk13-kart"><summary>Hesap kartı · Tartıda hangi kütleyi kullanırsınız?</summary>
<p>Önce dolu tüpün tartımından tüpe damgalanmış darayı çıkarın, böylece metal kabı değil, içeriğin kütlesini hesaba katarsınız. [[K6 s. 227]] Payda için gereken büyüklük boş kabın kütlesi değil, o kabı tamamen doldurabilecek suyun kütlesidir. [[K6 s. 227]]</p>
<p>Örneği birim su kütlesi üzerinden okuyun: her 1 kg su kapasitesi için 0,75 oranı 0,75 kg, 0,67 oranı ise yaklaşık 0,67 kg gaz dolumuna karşılık gelir. [[K6 s. 227]] Bu bir kütle oranı olduğundan %67 ifadesini tüp hacminin %67’sinin sıvı olduğu şeklinde okumayın. [[K6 s. 226–227]]</p></details>
<aside class="fk13-kart"><h3>Çözümlü örnek · Bir saat yüksek akım sonrası kırağı</h3><p>Kritik sıcaklığın (örnekte 36,5 °C) altında dolu N₂O tüpünde sıvı ve buhar birlikte bulunur. [[K6 s. 229]] Bir saat yüksek akımla çekilen buharın yerini sıvıdan kaçan yüksek enerjili moleküller alır. [[K6 s. 229]] Moleküller arası bağları kırmak için gereken enerji içerikten çekildiğinden tüp soğur. [[K6 s. 229]] Havadaki su buharı dış yüzeyde yoğuşur ve yüzey 0 °C’nin altına inerse donar. [[K6 s. 229]]</p></aside></section>
<section class="wrap blk ders-sec" id="fk13-entonox"><h2>Entonox soğuduğunda hastaya ne gider?</h2>
<p class="intro">Entonox normalde eşit oranlarda O₂ ve N₂O içerir, fakat tüpün soğuması hastaya ulaşan karışımın bileşimini değiştirebilir. [[K6 s. 228–229]]</p>
${sekil('entonox','Tabakalaşmış tüpte gaz fazını ve dip borusunu bulun','Şematik kesitte üst gaz fazı ile dip borusunun ulaştığı sıvı farklı renklerle gösterilir. [[K6 s. 229–230]]')}
<ol><li><strong>Hazırlama.</strong> Önce N₂O doldurulur, ardından tüp ters çevrilir ve oksijen içerikten kabarcıklar hâlinde geçirilir. [[K6 s. 228]] Son karışım %50 oksijen ve %50 N₂O içerir ve 13 700 kPa (137 bar) basınçta gaz olarak saklanır. [[K6 s. 228]]</li>
<li><strong>Soğuma.</strong> Tüp, psödokritik sıcaklığı olan −5,5 °C’nin üzerinde tutulmalıdır. [[K6 s. 228–229]] Bunun altında N₂O sıvılaşır ve karışım kısmen ayrılır, bu olaya tabakalaşma ya da Poynting etkisi denir. [[K6 s. 229]]</li>
<li><strong>Hastaya ulaşan gaz.</strong> Sıvı N₂O içinde yaklaşık %20 oksijen çözünürken üstte oksijence zengin gaz kalır. [[K6 s. 229]] Başlangıçta analjezi zayıflayabilir ve sıvı azaldıkça üstteki gazın yerini oksijence fakir buhar aldığında hipoksi gelişebilir. [[K6 s. 229]]</li>
<li><strong>Dipten örnekleme.</strong> Büyük tüplerde dip borusu alttaki sıvıdan örnek alarak hipoksik karışım verilmesini geciktirir, ancak sıvı bitince risk sürer. [[K6 s. 229–230]] Tabakalaşmayı gidermek için tüp yeniden ısıtılır ve içerik tüpün tekrar tekrar ters çevrilmesiyle karıştırılır. [[K6 s. 229]]</li></ol>
<div class="note plain"><b>Atlas notu.</b> Kitap tabakalaşmayı Poynting etkisi olarak da adlandırır. [[K6 s. 229]] Doğrusu, Poynting etkisi sıvı N₂O içinden geçirilen oksijenin sıvıyı buharlaştırıp gaz karışımı oluşturmasıdır, yani hazırlama aşamasını anlatır; tabakalaşma bu karışımın soğukta ayrışmasıdır.</div>
<details class="fk13-kart"><summary>Entonox için 137 bar bilgisi tek başına neden yetmez?</summary>
<p>Normal depolama koşullarında hem oksijen hem Entonox 137 barda gaz hâlindedir, ancak Entonox’un sıcaklık öyküsü hastaya ulaşacak bileşimi anlamak için ayrıca önemlidir. [[K6 s. 224–225]] [[K6 s. 228–229]]</p>
<p>Tabakalaşmış tüpte ilk gaz oksijen bakımından zengin olduğundan hastada ilk beklenen değişiklik analjezinin azalmasıdır. [[K6 s. 229]] Daha sonra oksijeni az olan buharın payı arttıkça klinik sorun değişir, artık hipoksi ortaya çıkabilir. [[K6 s. 229]] Şekilde parmağınızı dip borusunun alt ağzından valfe doğru yürütün: büyük tüpte hangi fazdan örnek alındığı değişince tehlikenin ortaya çıkış zamanı da değişir. [[K6 s. 229–230]]</p></details></section>
<section class="wrap blk ders-sec" id="fk13-merkez"><h2>Hastane hattı ve otomatik tüp değişimi</h2>
<p class="intro">Küçük hastanede merkezi oksijen kaynağı iki tüp grubundan oluşabilir, bir grubun basıncı düşünce diğer grup hattı beslemeye başlar. [[K6 s. 231]]</p>
${sekil('manifold','Etkin tüp sırası boşalmaya başladığında hattı izleyin','Vurgulu yol, etkin tüp sırasından basınç düşürücü üzerinden merkezi hatta uzanır. [[K6 s. 231–232]]')}
<p>Her gruptaki tüp sayısı hastanenin tahmini ihtiyacına göre seçilir ve ideal olarak tek bir grup en az iki gün yetmelidir. [[K6 s. 231]] Dolu oksijen tüpünde 137 bar olan basınç, indirgeme valfinden sonra hatta 4 bardır. [[K6 s. 231–232]] Oda sıcaklığında basıncı artırmak oksijeni sıvılaştırmaz, bunun için önce kritik sıcaklığı olan −118 °C’nin altına soğutmak gerekir. [[K6 s. 232]]</p>
<details class="fk13-kart"><summary>Bir sıranın basıncı düştüğünde hangi basınç değişmemelidir?</summary>
<p>Tüp grupları ile cihazlara giden oksijen hattını şeklin iki ayrı tarafında izleyin. Birinci grubun basıncı azaldığında bu değişim grubun boşalmakta olduğunu bildirir ve besleme diğer gruba aktarılır. [[K6 s. 231]]</p>
<p>Hattın görevi yüksek depolama basıncını hastaneye aynen taşımak değildir: seçilen gruptaki gazın basıncı hatta girmeden düşürülür ve hat için verilen değer 4 bardır. [[K6 s. 231–232]] Böylece sıranın değişmesi ile basıncın düşürülmesi, aynı şemada izlenen iki ayrı işlevdir. [[K6 s. 231–232]]</p></details>
<h3>Gazın hastaya kadar izlediği yol</h3><ul>
<li>Yüksek miktarda tüketilen oksijen, N₂O, oksijenle karıştırılan tıbbi hava ve pnömatik aletleri çalıştıran basınçlı hava genellikle borularla taşınır. [[K6 s. 230]] Kitabın tarif ettiği sistemde CO₂ ve ksenon ayrı tüplerden sağlanır. [[K6 s. 230]]</li>
<li>Gaz hattı ile merkezi vakum birlikte PMGV (merkezi tıbbi gaz ve vakum sistemi) adını alır. [[K6 s. 230]] Cihaza giden hortumun probu ile duvardaki Schrader soketi renk kodludur ve birbirlerine yalnız ilgili gaz için uyar. [[K6 s. 230]] Prob kilitlendikten sonra hafifçe çekilerek yerine oturması denetlenir. [[K6 s. 230]]</li>
<li>Oksijen ilaç kabul edilir ve tedavisi reçetelenmelidir. [[K6 s. 230]] Tüp kullanımını azaltmak için mümkün olduğunda merkezi hat tercih edilir. [[K6 s. 231]]</li>
<li>Hastane rezervi azaldığında ekip, kullandığı solunum destek cihazlarının oksijen tüketimini bilmelidir. [[K6 s. 231]] Çoğu duvar tipi sürekli pozitif hava yolu basıncı sistemi (CPAP), yüksek akımlı nazal oksijen (HFNO), ventilatörler ve anestezi cihazları 10 L/dk üzerinde tüketebilen örneklerdir. [[K6 s. 231]]</li></ul>
<h3>Oksijenin üretimi</h3><ul><li><strong>Fraksiyonel damıtma.</strong> Sıvı havanın bileşenleri ayrılarak %99,6 saflıkta oksijen elde edilir. [[K6 s. 231]] Oksijenin kritik basıncı 50 bar, atmosfer basıncındaki kaynama sıcaklığı −182,5 °C’dir. [[K6 s. 231]]</li><li><strong>Moleküler elek.</strong> Zeolit tanecikleri oda havasının azotunu tutar, ev tipi konsantratörlerde oksijen oranı %90–95’e ulaşabilir. [[K6 s. 231]] Kompresörün değişken basınçla hava vermesi elek yüzeyinden yararlanmayı artırır. [[K6 s. 231]] Basınç salınımlı bu sistem evde kullanılabilecek veya anestezi cihazına yerleştirilebilecek boyutta yapılabilir ve yeni ev modelleri 10 L/dk’ya kadar debi sağlayabilir. [[K6 s. 231]]</li><li><strong>Elektroliz.</strong> Denizaltılarda oksijen üretim yollarından biri suyun elektrolizidir. [[K6 s. 231]]</li></ul>
<details class="fk13-kart"><summary>10 L/dk değerini okurken önce hangi cihazı sormalısınız?</summary>
<p>Ev konsantratöründe verilen değer cihazın üretebildiği debidir: bazı yeni cihazlarda üst sınır 10 L/dk’ya ulaşır. [[K6 s. 231]] Duvar tipi CPAP ve yüksek akımlı nazal oksijen örneklerinde ise soru, cihazın hastane rezervinden bir dakikada ne kadar oksijen tüketebildiğidir. [[K6 s. 231]]</p>
<p>Bu yüzden bir hastanenin rezervini değerlendirirken yalnız depoyu tarif etmek yetmez, o rezervden beslenen solunum destek cihazlarının tüketimi de bilinmelidir. [[K6 s. 231]] Her tüp sırasının hedeflenen kullanım süresi de o hastanenin tahmini gereksinimi üzerinden belirlenir. [[K6 s. 231]]</p></details>
<p><strong>Üretim, depolama ve dağıtım.</strong> “Oksijen nereden geliyor?” sorusuna verilen yanıtın hangi aşamayı anlattığına dikkat edin. Sıvı havanın fraksiyonel damıtılması, oksijenin endüstriyel olarak nasıl elde edildiğini açıklar. [[K6 s. 231]] VIE bu oksijeni büyük miktarda ve sıvı hâlde hastanede tutan depodur. [[K6 s. 232]] Schrader soketi ise gazın hortuma geçtiği bağlantıdır. [[K6 s. 230]]</p>
<p>Ev konsantratöründe yol farklıdır: oksijen kaynağı oda havasıdır ve kompresörün elekten geçirdiği havanın azotu zeolit taneciklerinde tutulur. [[K6 s. 231]] Burada verilen %90–95, çıkıştaki oksijen oranını, L/dk ise cihazın birim zamanda sağladığı gaz hacmini ifade eder. [[K6 s. 231]]</p>
<h3>Hangi hava çıkışı?</h3><p>Hava bir pompayla tüpe sıkıştırılabilir veya merkezi kompresörden boru hattına verilebilir, klinikte daha yüksek debi için taşınabilir pompa da kullanılabilir. [[K6 s. 233]] Tıbbi havanın oksijen oranı doğru olmalı ve kompresörden gelen yağ sisi filtreyle uzaklaştırılmalıdır. [[K6 s. 233]] Yağ sisinin solunması hastaya zarar verebilir ve sistemde bulunması patlama tehlikesini artırabilir. [[K6 s. 233]]</p>
<ul><li><strong>Ventilasyon:</strong> 400 kPa (4 bar) hava sağlayan Schrader çıkışı kullanılır. [[K6 s. 233]]</li><li><strong>Cerrahi alet:</strong> 700 kPa (7 bar) için ayrı Schrader çıkışı bulunur. [[K6 s. 233]]</li></ul>
<details class="fk13-kart"><summary>4 bar ve 7 bar etiketleri gazı tanımak için yeterli mi?</summary>
<p>Merkezi oksijen hattı ile ventilasyon için kullanılan tıbbi hava hattı aynı basınçta çalışır: oksijen manifoldu çıkışında ve düşük basınçlı hava çıkışında değer 4 bardır. [[K6 s. 231–233]] Bu nedenle bağlanacak gazı tanırken basınç bilgisinin yanında gaza özgü prob ve soket eşleşmesini de izlemek gerekir. [[K6 s. 230]] [[K6 s. 233]]</p>
<p>7 bar değerini gördüğünüzde ölçümün nerede yapıldığına bakın. Pnömatik alet için ayrılan hava çıkışında bu değer cihazı besleyen basınçtır, VIE’de ise yaklaşık aynı değer düşük sıcaklıktaki sıvı oksijenin depolanma basıncıdır. [[K6 s. 232–233]]</p></details></section>
<section class="wrap blk ders-sec" id="fk13-vie"><h2>Sıvı oksijenden merkezi hatta</h2>
<p class="intro">Oksijen tüketimi yüksek bir hastanede sıvı depolama, küçük bir depo hacminden büyük miktarda gaz elde edilmesini sağlar. [[K6 s. 232]]</p>
${sekil('vie','Vakum yalıtımlı evaporatörün (VIE) depo kesiti','Depodaki oksijeni kullanım için oda sıcaklığına getiren elektrikli ısıtıcı bu kesitte gösterilmemiştir. [[K6 s. 232–233]]')}
<p>Sıvı oksijen (LOX) yaklaşık 700 kPa (7 bar) basınçta, −180 ile −150 °C arasında tutulur. [[K6 s. 232]] Büyük bir termos gibi çalışan depoda paslanmaz çelik iç kap ile karbon çeliği dış kabuk arasındaki vakum ısı yalıtımı sağlar. [[K6 s. 232–233]]</p>
${sekil('verim','Sıvı hacmini değiştirip STP’de gaz karşılığını okuyun','Çizgi, standart sıcaklık ve basınçta (STP) sıvı oksijenin gaz hacmine dönüşümünden hesaplanır. [[K6 s. 232]]')}
<p><strong>Hesap kartı.</strong> Standart sıcaklık ve basınçta <i>V</i><sub>gaz</sub> = 842 × <i>V</i><sub>sıvı</sub> olup iki hacim de litre cinsindendir. [[K6 s. 232]] Depodaki 1 L sıvı oksijenin karşılığı bu koşullarda 842 L oksijen gazıdır. [[K6 s. 232]]</p>
<details class="fk13-kart"><summary>Hacim dönüşümünü ileri ve geri okuyun</summary>
<p>Kaydırıcıyı 1 L’den yarım litreye çekin. Gazın karşılığı STP’de 842 L’den 421 L’ye iner, çünkü aynı koşullarda gaz hacmi sıvı hacmine doğru orantılıdır. [[K6 s. 232]] Ters yönde düşünürseniz STP’de istenen gaz hacmini 842’ye bölmek o miktara karşılık gelen sıvı oksijen hacmini verir. [[K6 s. 232]]</p>
<p>Bu grafikteki iki eksen de hacimdir. [[K6 s. 232]] Depolama basıncı olan yaklaşık 7 bar ile hastane oksijen hattındaki 4 bar iki ayrı noktaya aittir ve hacim dönüşümündeki 842 sayısının birimi bar değildir. [[K6 s. 231–232]]</p></details>
<p>Elektrikli ısıtıcı oksijeni oda sıcaklığına getirir ve büyük akut bakım hastanelerinde boruyla bağlanmış ikinci VIE beslemenin sürekliliğine yardım eder. [[K6 s. 232]] Merkezi sıvı oksijen kullanılırken tüp manifoldu yedek kaynak olarak korunur. [[K6 s. 231]]</p></section>
<section class="wrap blk ders-sec" id="fk13-vakum"><h2>Vakum kaynağından aspirasyon ucuna</h2>
<p class="intro">Klinik aspirasyonda sıvı veya katıyı uzaklaştıran etken, ortam ile daha düşük basınçlı kaynak arasındaki basınç farkıdır. [[K6 s. 234]]</p>
${sekil('vakum','Aspiratta ve gazda yollar nerede ayrılır?','Seçilen yolun elemanları akış sırasıyla gösterilir. [[K6 s. 234]]')}
<p>Fizikte tam vakum madde içermez ve duvara çarpacak molekül bulunmadığı için mutlak basıncı sıfırdır. [[K6 s. 233–234]] Aristoteles’in “doğa boşluktan hoşlanmaz” sözünün işaret ettiği gibi oluşturulması ve korunması güç olan bu duruma doğada en yakın örnek, metreküpte yalnız birkaç molekül bulunabilen uzaydır. [[K6 s. 233–234]] Klinik vakum için mutlak sıfır basınç gerekmez, ortam basıncından yeterince aşağıya inilmesi bir basınç gradyanı oluşturur. [[K6 s. 234]]</p>
<ul><li><strong>Kaynak.</strong> Negatif basınç mekanik pompa, merkezi vakum hattı veya tüp gazıyla çalışan Venturi düzeneğiyle oluşturulabilir. [[K6 s. 234]] Merkezi duvar aspirasyonunun Schrader valfi sarıdır. [[K6 s. 234]]</li>
<li><strong>Performans.</strong> Kitaba göre aspirasyon sistemi ortama göre en az 400 mmHg basınç düşüşü oluşturabilmelidir. [[K6 s. 234]] Cerrahi aspiratörün on saniye içinde −500 mmHg’ye ulaşması ve 25 L/dk uzaklaştırabilmesi beklenir. [[K6 s. 234]]</li>
<li><strong>Birimi yorumlama.</strong> Duvar vakumu için söylenen “negatif” sözcüğünün referansı çevre basıncıdır, manometredeki değer gaz moleküllerinin tümünün uzaklaştığını göstermez. [[K6 s. 233–234]] Tam vakumda duvarla çarpışma olmayacağı için mutlak basınç sıfır olurken klinik sistemde aspirasyon için bir basınç farkı yeterlidir. [[K6 s. 233–234]]</li>
<li><strong>Hortum.</strong> Düşük kompliyanslı, görece sert duvar negatif basınçta hortumun çökmesini önler ve geniş lümen akış direncini azaltır. [[K6 s. 234]]</li>
<li><strong>Toplama ve filtreler.</strong> Rezervuar aspire edilen materyali toplar, hat üzerindeki filtre kaynağı korur ve atmosfere atılan gaz için bakteri filtresi gerekir. [[K6 s. 234]]</li>
<li><strong>Basınç ile debiyi ayırın.</strong> −500 mmHg kaynağın ortama göre ulaşması gereken basıncı, on saniye bu basınca ulaşma süresini, 25 L/dk ise birim zamanda uzaklaştırılabilen hacmi bildirir. [[K6 s. 234]] Bu ölçütlerden yalnız basınç değerini bildirmek, cerrahi aspiratörün çekebileceği hacmi tarif etmez. [[K6 s. 234]]</li>
<li><strong>Manometre.</strong> Göstergede negatif basınç yönü saat yönünün tersi, pozitif basınç yönü saat yönüdür. [[K6 s. 234]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk13-yangin"><h2>Ameliyathanede yanma riskini tanıma</h2>
<p class="intro">Oksijen ve N₂O yanıcı değildir, ancak ikisi de oksitleyici olarak yanmayı desteklediğinden ameliyathane ve anestezi odalarında yangın riski artar. [[K6 s. 235]]</p>
${sekil('yangin','Yangın üçgeninde hangi öğe denetleniyor?','Her köşe ayrı bir önleme yaklaşımına karşılık gelir. [[K6 s. 235–236]]')}
<p>Yanma ve patlama ekzotermik oksidasyondur, yeni bileşiklerle birlikte başlıca ısı ve sıklıkla ışık, ses ve basınç açığa çıkar. [[K6 s. 235]] Yanabilir maddeler yüksek sıcaklıkta oksijenle tepkimeye girerek ısı verir. [[K6 s. 235]]</p>
<p><strong>Stokiyometrik bileşim</strong>, tam yanma sonunda yakıtın da oksijenin de artmadığı hava-yakıt bileşimidir. [[K6 s. 235]] Tepkime denklemi tam sayılı mol oranlarını belirler ve kitap bu bileşimi patlama açısından en tehlikeli karışım olarak niteler. [[K6 s. 235]]</p>
<p>Mol oranı ile kütle oranı aynı biçimde okunmaz: kitap etanolün tam yanması için hava kütlesinin yakıt kütlesine oranını 9:1 olarak verir. [[K6 s. 235]]</p>
<details class="fk13-kart"><summary>Risk bölgesini cihaz üzerinde nasıl tarif edersiniz?</summary>
<p>Ölçümün başlangıç noktası yalnız cihazın merkezi değildir: kitap, anestezi düzeneğinin herhangi bir parçasının çevresini esas alır. [[K6 s. 235]] Bir devre kaçağıyla ortama oksijen karışırsa yakın çevredeki oksijen oranı yükselebilir. [[K6 s. 235–236]]</p>
<p>Kapalı devre seçimi ve atık gazın uzaklaştırılması, oksijenin odaya yayılmasını azaltmaya yöneliktir. [[K6 s. 235–236]] Ameliyathane havalandırması ise ortama ulaşan oksijenin birikmesini azaltır. [[K6 s. 236]] Üçgende oksitleyici köşesini seçin ve bu önlemleri alkol buharı ile sıcak koterin oluşturduğu diğer iki riskten ayırın. [[K6 s. 235–236]]</p></details>
<h3>Ortamı koruma</h3><ul><li>Kitap risk bölgesini anestezi cihazının herhangi bir parçasının çevresindeki 25 cm olarak tanımlar, çünkü devre kaçağı yerel oksijen oranını yükseltebilir. [[K6 s. 235–236]]</li>
<li>Ortama yayılan oksijeni azaltmak için kapalı devre, atık gaz tahliyesi ve ameliyathanenin yeterli havalandırılması önemlidir. [[K6 s. 235–236]] Kitap açık maskeyle anestezi bağlamında entübasyona değinir ve diatermi ile günümüzde seyrek kullanılan eter için özel dikkat ister. [[K6 s. 236]]</li>
<li>Klinik alanda açık alev kullanılmamalıdır. [[K6 s. 236]] Ampul filamanları, halojen lambalar, koter, sıcak plakalar ve ekmek kızartıcısı gibi sıcak nesneler tutuşturma kaynağı olabilir. [[K6 s. 236]]</li>
<li>Arızalı elektrikli cihazlar ark ya da kıvılcım oluşturabilir, bir anahtarı açmak, fişi hızla çekmek veya statik elektrik boşalması da tehlike yaratabilir. [[K6 s. 236]]</li></ul>
<p><strong>Bir güvenlik değerlendirmesinde üç ayrı soru sorun.</strong> Temizlikte kullanılan uçucu bir sıvı veya buharı alanda kalmış olabilir mi? Devre kaçağıyla ortam oksijence zenginleşebilir mi? Yakında sıcak bir yüzey ya da elektrik kıvılcımı kaynağı var mı? Bu sorular sırasıyla yakıtı, oksitleyiciyi ve tutuşturma kaynağını değerlendirir. [[K6 s. 235–236]]</p>
<h3>Yakıtı gözden kaçırmamak</h3><ul><li>Büyük ölçüde kullanımdan kalkmış diyetil eter havada kıvılcımla kolay tutuşmazken oksijen veya N₂O varlığında patlama tehlikesi artar. [[K6 s. 236]] Eterin alevi görünmeyebilir, sıcak yüzeyler de tutuşturma kaynağı olabilir. [[K6 s. 236]] Tarihsel anestezik etil klorür daha kolay yanar ve havada bile patlama tehlikesi taşır. [[K6 s. 236]]</li>
<li>Cilt veya yüzey temizliğinde kullanılan alkol uçucu ve yanıcıdır, alevi görünmeyebilir ve buharı dar bir alanda birikebilir. [[K6 s. 236]]</li>
<li>Bağırsak gazının başlıca bileşenlerinden metan ile propan ve bütan hava ile karıştığında patlama tehlikesi taşır. [[K6 s. 236]] İzofluran ve desfluran yanıcı değildir. [[K6 s. 236]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk13-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="fk13-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk13-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk13-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk13-p2"><h2>Part II · SOE 2 · Klinik ölçüm ve ekipman</h2>
<p><strong>Açılış.</strong> N₂O manometresi uzun süre aynı basıncı gösteriyor, fakat tüp tartıldığında hafiflemiş. Bu iki bulguyu nasıl uzlaştırırsınız?</p>
<h3>Cevap iskeleti</h3><ol><li>Önce sıcaklığı ve fazları belirtin. Sıvı ve buhar birlikteyken sabit sıcaklıktaki basıncı doymuş buhar basıncı belirler. [[K6 s. 227]]</li><li>Valften çekilen buharı sıvıdan kaçan moleküller yeniler, bu sırada tartılan kütle azalır. [[K6 s. 227]]</li><li>Dara boş tüpün ağırlığıdır ve sıvı kaldığı sürece tartım, manometreden farklı olarak içerik hakkında bilgi verir. [[K6 s. 227]]</li><li>Son sıvı buharlaştığında artık basınç da azalmaya başlar. [[K6 s. 227–228]]</li></ol>
<p><strong>Çizin.</strong> Düşey eksene basıncı, yatay eksene zamanı yerleştirin. Sıvı varken platoyu, son damlanın kaybolduğu noktayı ve ardından üstel düşüşü gösterin. [[K6 s. 227–228]]</p>
<h3>Ek sorular</h3><ul><li>Yüksek akımda tüp dışındaki kırağı nereden gelir?</li><li>Manifoldun hangi basınç değişimi yedek sıraya geçişi başlatır?</li><li>Ventilasyon ve cerrahi alet hava çıkışlarını nasıl ayırırsınız?</li><li>Aspirasyon göstergesinde −500 mmHg okursanız bunu hangi referansa göre yorumlarsınız?</li></ul></section>
<section class="wrap blk ders-sec" id="fk13-ozet"><h2>Özet</h2><ul>
<li>Boyut ve renk tanımaya yardım eder, pin indeks yanlış gazın cihaza sızdırmaz biçimde bağlanmasını engeller. [[K6 s. 222–224]]</li>
<li>Sıvı N₂O varsa manometre doymuş buhar basıncını gösterir, dolumda buhar boşluğu bırakılması ısıl genleşmeye karşı korur. [[K6 s. 226–227]]</li>
<li>Oksijen hattı tüp sıralarından ya da sıvı oksijen deposundan beslenebilir, aspirasyon ise ortamdan daha düşük bir basınçla sağlanır. [[K6 s. 231–232]] [[K6 s. 234]]</li>
<li>Oksijen ve N₂O bulunan alanlarda yakıt, oksitleyici ve tutuşturma kaynağı birlikte değerlendirilir. [[K6 s. 235–236]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="13"></div>
<nav class="fk13-gecis" aria-label="Ders geçişi"><a href="#/dersler/fizik/12">← Vaporizatörler</a><a href="#/dersler/fizik/14a">Sonraki: Solunum devreleri: halka sistem ve Mapleson sınıflaması →</a></nav></section>`
  };
})();
