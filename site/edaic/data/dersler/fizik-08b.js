VERI.sorular = VERI.sorular || {};
(function () {
  const onerme = (t, d, n) => ({ t, d, n });
  VERI.sorular['fk08b-1'] = {
    no: 1, kok: 'Gaz jetleri ve oksijen sunumu', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 146–150]]',
    onermeler: [
      onerme('Dar kesitte hızlanan gazın duvara uyguladığı basınç artar.', false, 'Kinetik enerji artarken basınca bağlı enerji ve duvar basıncı azalır. [[K6 s. 146–147]]'),
      onerme('Venturi valfinde hava girişinin kısmen kapanması oksijen yüzdesini yükseltebilir.', true, 'Jete katılan hava azalınca oksijen daha az seyrelir. [[K6 s. 148]]'),
      onerme('Kırmızı valf için belirtilen %40 değeri bütün oksijen akımlarında geçerlidir.', false, 'Kırmızı valfin %40 değeri 10 L·dk⁻¹ oksijen akımı için verilmiştir. [[K6 s. 149]]'),
      onerme('Dışbükey yüzeye teğet gelen jet yüzeyi izleyebilir.', true, 'Coanda etkisinde jet yüzeye doğru sapar. [[K6 s. 150]]'),
      onerme('Akım yönlendiren Coanda valfinde inspirasyonda açık tahliye ağzı mekanik olarak kapanır.', false, 'Gaz duvarı izleyerek açık ağzın yanından hastaya geçer. [[K6 s. 150]]')
    ]
  };
  VERI.sorular['fk08b-2'] = {
    no: 2, kok: 'Bir akımölçerin sinyalini yorumlama', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 150–155]]',
    onermeler: [
      onerme('Küresel şamandıralı rotametrede okuma kürenin merkezinden yapılır.', true, 'Düz tepeli şamandırada üst kenar, kürede merkez esas alınır. [[K6 s. 151]]'),
      onerme('Ağızda ölçülen akımın zaman integrali hacim değişimini verir.', true, 'Spirometre solunum hacmini akım sinyalinin alanından hesaplayabilir. [[K6 s. 151–152]]'),
      onerme('Pnömotakografta elek gözeneklerinin suyla tıkanması direnci azaltır.', false, 'Su geçiş için açık alanı küçültür ve direnci artırır. [[K6 s. 154]]'),
      onerme('Pitot tüpünün sensöre giden kolunda sürekli gaz akması gerekir.', false, 'Ölçüm kollarında akım yoktur, akıma bakan ağızdaki gaz sıkışır. [[K6 s. 155]]'),
      onerme('Türbinli ölçerde ışık demetinin kesilmesi elektrik sinyaline çevrilir.', true, 'Elde edilen gerilim hacimsel akımla orantılıdır. [[K6 s. 153]]')
    ]
  };
  VERI.sorular['fk08b-3'] = {
    no: 3, kok: 'Tepe akımı ve doğrudan hacim ölçümü', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 155–157]]',
    onermeler: [
      onerme('Wright ölçer ekspirasyon boyunca çıkan toplam hacmi kaydeder.', false, 'Kayar işaretçi en yüksek ekspiratuvar akımı gösterir. [[K6 s. 155]]'),
      onerme('Wright ölçerde diyafram ilerledikçe gazın çıkabileceği bir yarık açılır.', true, 'Yarıktan kaçan gaz diyafram üzerindeki basıncı azaltır. [[K6 s. 155]]'),
      onerme('Benedict–Roth çanının hareketi bir yer değiştirme sensörüyle kaydedilebilir.', true, 'Geleneksel kayıt dönen tamburdur, ancak herhangi bir yer değiştirme sensörü de kullanılabilir. [[K6 s. 156]]'),
      onerme('Benedict–Roth spirometresinde kuru sızdırmazlık da kullanılabilir.', true, 'Hareketli çan ile sabit taban arasındaki sızdırmazlık çoğunlukla suyla sağlanır, kuru tipleri de vardır. [[K6 s. 156]]'),
      onerme('Spirometrede ekspirasyon havasının soğuması ölçülen hacmi küçültebilir.', true, 'Gazın büzülmesi ve su buharının yoğuşması ekspirasyon hacminin düşük ölçülmesine katkıda bulunur. [[K6 s. 157]]')
    ]
  };

  const nav = [['bernoulli','Bernoulli'],['venturi','Venturi'],['coanda','Coanda'],['rotametre','Rotametre'],['solunum','Akımdan hacme'],['turbin','Türbin'],['basinc','Basınç farkı'],['wright','Tepe akımı'],['can','Doğrudan hacim'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  SAYFALAR['dersler/fizik/08b'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 8 · Ders 08b',
    baslik: 'Bernoulli, Venturi ve Coanda etkileri; hacim ve akım ölçümü',
    lede: 'Bir maskede oksijen jeti çevreden hava çekerken bir akımölçerde gazın hareketi ölçülebilir bir basınç farkı yaratır. [[K6 s. 148]] [[K6 s. 153–155]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad]) => `<button type="button" data-scroll="fk08b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk08b-bernoulli"><h2>Dar kesitte duvar basıncı neden düşer?</h2>
<p class="intro">Hızla hareket eden akışkan, borunun duvarına durgun ya da yavaş hareket eden akışkandan daha az basınç uygular. [[K6 s. 146]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı akım, farklı kesit</h3></div><div data-viz="fk08b_darlik"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Akışkanın kinetik enerjisi hızından, basınca bağlı potansiyel enerjisi ise duvara uyguladığı basınçtan gelir. [[K6 s. 146–147]] Daralan kesitte aynı akımın sürmesi için hız artar. [[K6 s. 148]] Toplam enerji korunduğundan kinetik enerjideki artışa potansiyel enerjide azalma eşlik eder. [[K6 s. 147]]</p>
<ul><li><b>Uçak kanadı.</b> Kanadın üstünden geçen hava daha hızlıdır ve üst yüzeyde basınç daha düşüktür. [[K6 s. 147]] Alt ve üst yüzey arasındaki basınç farkı kaldırma kuvveti doğurur. [[K6 s. 147]]</li>
<li><b>Kamyonu geçerken.</b> Araçlar arasındaki dar aralıktan geçen hava hızlanır ve basıncı düşer. [[K6 s. 147]] Dış yüzeylerdeki daha yüksek basınç araçları birbirine doğru iter. [[K6 s. 147]]</li></ul>
<div class="note"><b>Kesit oranından hız oranına.</b> Birim zamanda girişten geçen hacim boğazdan da geçer. [[K6 s. 148]] Boğaz kesit alanını girişin yarısına getirirseniz aynı hacmi taşımak için hız iki katına çıkar: <i>v</i><sub>boğaz</sub>/<i>v</i><sub>giriş</sub> = <i>A</i><sub>giriş</sub>/<i>A</i><sub>boğaz</sub> = 1/0,5 = 2. [[K6 s. 148]] Burada <i>A</i> kesit alanı (m²), <i>v</i> hızdır (m·s⁻¹); gösterilen iki oran da birimsizdir. [[K6 s. 148]]</div>
<p class="note"><b>Şekli okuyun.</b> Önce boğazı girişle aynı kesite getirin, sonra yalnız boğazı daraltın. Geçen gaz miktarını birim zamanda sabit tuttuğunuz için kesitteki azalmayı hızdaki artış karşılar. [[K6 s. 148]] Boğazın içinde uzayan ok bu hızı gösterir; duvara yandan uygulanan basınç ise azalır. [[K6 s. 146–147]]</p></section>

<section class="wrap blk ders-sec" id="fk08b-venturi"><h2>Venturi valfi oksijene ne kadar hava katar?</h2>
<p class="intro">Dar kesitteki basınç atmosfer basıncının altına inerse, buraya açılan bir delikten dış hava jete katılabilir; buna jet sürüklenmesi (jet entrainment) denir. [[K6 s. 147–148]]</p>
<div class="viz"><div class="viz-head"><h3>Valfi seçin, besleme akımını ve karışımı okuyun</h3></div><div data-viz="fk08b_valf"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Venturi maskesi, tüpten veya başka bir kaynaktan gelen %100 oksijeni karmaşık bir karıştırıcı gerektirmeden belirli bir konsantrasyonda hastaya verir. [[K6 s. 148]] Plastik hortumdan gelen oksijen, kalıplanmış plastik valfin ortasındaki dar ağızdan hızlanarak çıkar. [[K6 s. 148]] Dar ağzın yanındaki açıklıklardan içeri çekilen hava oksijene karışır. [[K6 s. 148]] Bu düzenek, oksijenle zenginleştirilmiş yüksek hava akımı sağlayan <b>HAFOE</b> valfidir. [[K6 s. 148]] Yararlandığı Venturi etkisi, Bernoulli ilkesinin özel bir durumudur. [[K6 s. 148]]</p>
<p class="fk08b-formul"><b>Sürüklenme oranı</b> = jete katılan hava akımı / jeti oluşturan oksijen akımı. [[K6 s. 148]] İki akım aynı birimle (L·dk⁻¹) ifade edildiğinde oran birimsizdir. [[K6 s. 148–149]]</p>
<p>Karışımdaki oksijen yüzdesini en çok hava deliklerinin büyüklüğü, daha az ölçüde oksijenin besleme akımı belirler. [[K6 s. 149]] Sürüklenme oranı bütün akımlarda sabit kalmaz. [[K6 s. 148]] Delik kısmen kapanırsa jete daha az hava katılır ve hastaya ulaşan oksijen yüzdesi yükselebilir. [[K6 s. 148]]</p>
<div class="tbl-wrap"><table class="tbl"><caption>Her valf için belirtilen yüzde yalnız karşısındaki oksijen akımında geçerlidir. [[K6 s. 149]]</caption><thead><tr><th>Valf</th><th>O₂ akımı (L·dk⁻¹)</th><th>Verilen O₂</th></tr></thead><tbody>
<tr><td>Mavi · en geniş açıklık</td><td>2</td><td>%24 [[K6 s. 149]]</td></tr><tr><td>Beyaz</td><td>4</td><td>%28 [[K6 s. 149]]</td></tr>
<tr><td>Turuncu</td><td>6</td><td>%31 [[K6 s. 149]]</td></tr><tr><td>Sarı</td><td>8</td><td>%35 [[K6 s. 149]]</td></tr>
<tr><td>Kırmızı</td><td>10</td><td>%40 [[K6 s. 149]]</td></tr><tr><td>Yeşil · en dar açıklık</td><td>15</td><td>%60 [[K6 s. 149]]</td></tr></tbody></table></div>
<ul><li><b>Nebülizatör.</b> Hızlı gaz jeti sıvıyı sürükler ve küçük damlacıklara ayırır, bu yolla örneğin bronkodilatör verilebilir. [[K6 s. 147–148]]</li>
<li><b>Karbüratör.</b> Hızlı hava akımı yakıtı içine çeker, ortaya çıkan karışım motorda ateşlenir. [[K6 s. 148]]</li></ul>
<details><summary>Maskede iki farklı akımı nasıl ayırt edersiniz?</summary>
<p>Tablodaki litre/dakika değeri, kaynaktan plastik hortuma ve oradan valfe gönderilen saf oksijene aittir. [[K6 s. 148–149]] Hastaya doğru ilerleyen akım ise hem bu oksijeni hem de yan açıklıklardan giren havayı içerir. [[K6 s. 148]] Dolayısıyla besleme akımı ile karışımın oksijen yüzdesi farklı büyüklüklerdir. [[K6 s. 148–149]]</p>
<p>Örneğin %40 için önce kırmızı valfi, sonra bu valfe karşılık gelen 10 L·dk⁻¹ besleme akımını bulun. [[K6 s. 149]] Aynı valfin hava girişini kısmen örterseniz sürüklenme oranının payı küçülür ve oksijen daha az seyrelir. [[K6 s. 148]] Bu durumda renk kodundan tek başına hastanın aldığı yüzdeyi çıkaramazsınız. [[K6 s. 148–149]]</p></details></section>

<section class="wrap blk ders-sec" id="fk08b-coanda"><h2>Coanda etkisiyle akımın yön değiştirmesi</h2>
<p class="intro">Dışbükey bir yüzeye teğet yönelen sıvı veya gaz jeti yüzeyin eğrisini izleyerek belirgin ölçüde sapabilir. [[K6 s. 149–150]]</p>
<div class="viz"><div class="viz-head"><h3>Hareketli parçası olmayan ventilatör valfi</h3></div><div data-viz="fk08b_coanda"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Musluktan akan su, çevresindeki havayı sürükler. [[K6 s. 150]] Akıma kısmen sokulan kaşık, kendi tarafında suya katılabilecek havanın yolunu keser. [[K6 s. 149–150]] O tarafta basınç düşünce su kaşığa doğru sapar ve kaşığın dışbükey yüzeyini izler. [[K6 s. 150]]</p>
<details><summary>Venturi maskesiyle kaşık örneğinde hangi akımı izlersiniz?</summary>
<p>Maskede, hızlı oksijenin yanındaki basınç düşüşünün dış hava için ne anlama geldiğini izleyin. [[K6 s. 147–148]] Dar kesit atmosferden düşük basınçtaysa hava açıklıktan içeri girer ve asıl jete katılır. [[K6 s. 147–148]] Kaşıkta ise bu kez asıl jetin nereye gittiğini izleyin. [[K6 s. 149–150]] Su açık tarafta havayı sürüklemeyi sürdürürken kaşık tarafında sürüklenmenin kısıtlanması, jetin iki yanında farklı koşullar yaratır. [[K6 s. 150]] Görünür sonuç, suyun başlangıçtaki doğrultusundan sapmasıdır. [[K6 s. 149–150]]</p></details>
<ul><li><b>Çatallanma.</b> Gaz bir duvarı izlemeye eğilim gösterdiğinde iki kola eşit dağılmayabilir. [[K6 s. 150]] Solunan gazın alveollere düzensiz dağılımı bunun bir örneği olabilir. [[K6 s. 150]] Görünüşte normal koroner arterlerde de kan akımının eşitsiz dağılımı iskemiye yol açabilir. [[K6 s. 150]]</li>
<li><b>Valf.</b> İnspirasyonda oksijen kaynağı veya ventilatörden gelen gaz duvarı izler, karşıdaki açık tahliye ağzını geçerek hastaya ulaşır. [[K6 s. 150]] Ekspirasyonda besleme jetinin basıncı hastadan dönen gazı karşı tarafa, tahliye ağzına yöneltir. [[K6 s. 150]] Bu “akışkan mantığı” ile çalışan valf hareketli parça gerektirmediğinden güvenilirdir ve ucuza üretilebilir. [[K6 s. 150]]</li></ul>
<p class="note"><b>Valfi çizerken.</b> Her iki solunum fazında da tahliye ağzını açık bırakın. [[K6 s. 150]] İnspirasyon okunu kaynaktan başlatıp duvar boyunca hastaya götürün. [[K6 s. 150]] Ekspirasyon için başlangıç noktası hastadır; bu kez besleme gazının basıncı dönen akımı tahliyeye saptırır. [[K6 s. 150]] Yön değişimini açıklayan unsur valfin geometrisi ve gaz jetidir. [[K6 s. 150]]</p></section>

<section class="wrap blk ders-sec" id="fk08b-rotametre"><h2>Rotametreyi hangi hizadan okursunuz?</h2>
<p class="intro">Değişken açıklıklı akımölçer (Rotameter), oksijenin ve diğer gazların akımını elektrik beslemesine gerek duymadan sürekli ve güvenilir biçimde gösterir. [[K6 s. 150]]</p>
<div class="viz"><div class="viz-head"><h3>Rotametrenin kesiti</h3></div><div data-viz="fk08b_rotametre"></div><p class="viz-cap" aria-live="polite"></p></div>
<ol><li><b>Akımı ayarlayın.</b> Kontrol düğmesi iğneli valfi hareket ettirerek gaz akımının hassas biçimde ayarlanmasını sağlar. [[K6 s. 150]] Gaz buradan yukarı doğru genişleyen dikey cam tüpe girer. [[K6 s. 150–151]]</li>
<li><b>Dengeyi bulun.</b> Akım başlayınca şamandıra yükselir. [[K6 s. 150–151]] Yükseldikçe çevresindeki geçit genişler, gaz daha kolay geçer ve yukarı iten kuvvet azalır. [[K6 s. 151]] Bu kuvvet ağırlığı dengelediğinde şamandıra, akıma karşılık gelen yükseklikte durur. [[K6 s. 151]]</li>
<li><b>Ölçeği okuyun.</b> Tepesi düz şamandırada üst kenarı, küresel şamandırada merkezi ölçekle hizalayın. [[K6 s. 151]] Şamandıranın yivleri gaz geçerken dönmesini sağlayarak duvara yapışma riskini azaltır. [[K6 s. 151]]</li></ol>
<p>Şamandıranın konumunu gazın hem yoğunluğu hem viskozitesi etkilediğinden ölçek belirli bir gaz için kalibre edilir. [[K6 s. 151]] Geniş bir akım aralığını kapsamak için tüp boyunca genişleme açısı değiştirilebilir veya düşük ve yüksek akım ölçerleri seri bağlanabilir. [[K6 s. 151]]</p>
<details><summary>Düğmeyi açtığınızda şamandıra neden tavana kadar yükselmez?</summary>
<p>Eski denge konumunda artan gaz akımı şamandırayı yukarı iter. [[K6 s. 150–151]] Şamandıra daha geniş bir kesite ulaştıkça gazın çevresinden geçebildiği açıklık artar. [[K6 s. 151]] Yukarı yönlü kuvvet yeniden ağırlığa eşitlendiğinde şamandıra yeni bir yükseklikte dengelenir. [[K6 s. 151]] Ölçekte okunan konum bu kuvvet dengesinin sonucudur; bu yüzden gazın özellikleri değişirse aynı ölçeğe güvenilemez. [[K6 s. 151]]</p></details></section>

<section class="wrap blk ders-sec" id="fk08b-solunum"><h2>Bir solukta hacim ile akım arasında geçiş</h2>
<p class="intro">Hacim–zaman eğrisinin bir andaki eğimi o andaki akımı, akım–zaman eğrisinin iki an arasındaki işaretli alanı ise hacim değişimini verir. [[K6 s. 151–152]]</p>
<div class="viz"><div class="viz-head"><h3>Zorlu inspirasyondan ekspirasyona</h3></div><div data-viz="fk08b_soluk"></div><p class="viz-cap" aria-live="polite"></p></div>
<p class="fk08b-formul"><i>Q</i> = d<i>V</i>/d<i>t</i> &nbsp; · &nbsp; Δ<i>V</i> = ∫ <i>Q</i> d<i>t</i>. [[K6 s. 152]] Hacim <i>V</i> litre, zaman <i>t</i> dakika alınırsa hacimsel akım <i>Q</i> litre/dakika olarak ifade edilir. [[K6 s. 149]] [[K6 s. 152]]</p>
<p>Solunum fonksiyon testlerinde özel soluma manevraları sırasındaki akım, obstrüksiyon veya restriksiyonu değerlendirmeye yardım eder. [[K6 s. 151]] Modern spirometreler ağızdaki akım sinyalini elektronik olarak kaydeder ve bilgisayar bu sinyali gerçek zamanlı olarak sayısal integrasyonla hacme çevirir. [[K6 s. 151–152]] Böylece aynı zaman ekseninde hem akım hem hacim izlenebilir. [[K6 s. 152–153]]</p>
<div class="note"><b>İki eğriyi birlikte okuyun.</b> İmleci inspirasyonun ortasından sonuna doğru taşıyın. Hacim artmaya devam ederken eğimin azalması, içeri doğru akımın yavaşladığını gösterir. [[K6 s. 152]] En yüksek hacimde eğri yataylaşır ve akım yön değiştirmek üzere sıfırdan geçer. [[K6 s. 152–153]]</div>
<p>Ekspirasyonda aynı zaman noktasında iki farklı okuma yapılabilir. [[K6 s. 152–153]] Hacim eğrisine çizilen teğet o andaki akımı verir; ekspirasyon başlangıcından o ana kadarki akım eğrisinin altında kalan alanın büyüklüğü ise çıkarılan gaz hacmini verir. [[K6 s. 152]] Şekilde zaman ve genlik ölçekleri şematiktir; iki çizgi aynı örnek soluktan türetilmiştir. [[K6 s. 152–153]]</p>
</section>
<section class="wrap blk ders-sec" id="fk08b-turbin"><h2>Türbinin dönüşünden elektrik sinyaline</h2><p class="intro"> Solunum akımı ölçümünde iki yaygın yöntem, türbinin dönüşünü ve basınç farkını algılamaktır. [[K6 s. 152–153]]</p>
<div class="viz"><div class="viz-head"><h3>Bir kanadın ışık demetinden geçişi</h3></div><div data-viz="fk08b_turbin"></div><p class="viz-cap" aria-live="polite"></p></div><ol><li>Akım yoluna yerleştirilen küçük türbin gaz geçerken döner ve kanatları bir ışık demetini aralıklı olarak keser. [[K6 s. 153]]</li>
<li>Algılayıcı bu kesintileri akımla orantılı gerilime dönüştürür ve akım sürekli gösterilir. [[K6 s. 153]] Sinyalin zaman integrali alınarak içeri veya dışarı geçen hacim bulunur. [[K6 s. 153]]</li>
<li>Kanadın küçük fakat etkili eylemsizliği nedeniyle kitap en doğru ölçümün düşük solunum akımlarında elde edildiğini belirtir. [[K6 s. 153]] Bu düzenek solunum fonksiyon cihazlarının ağızlıklarında sık kullanılır. [[K6 s. 153]]</li></ol>
<p><b>Atlas notu.</b> Kitap kanatlı ölçerin en doğru sonucu düşük akımlarda verdiğini söyler. [[K6 s. 153]] Kanadın eylemsizliği nedeniyle bu ölçerler genellikle düşük akımlarda olduğundan az, yüksek akımlarda olduğundan fazla ölçer; en doğru sonuç orta akım aralığındadır.</p>
<p><b>Okuma zinciri.</b> Ağızlıktaki gaz türbini döndürür, türbinin dönüşü optik bir kesinti dizisine, bu dizi de ekranda sürekli izlenen bir akım sinyaline çevrilir. [[K6 s. 153]] Soluk hacmini öğrenmek için bu son sinyalin hangi zaman aralığında toplandığı önemlidir: inspirasyon boyunca integral içeri alınan, ekspirasyon boyunca integral dışarı verilen hacmi gösterir. [[K6 s. 152–153]]</p></section>

<section class="wrap blk ders-sec" id="fk08b-basinc"><h2>Basınç farkını okumak: elek ve Pitot tüpü</h2>
<p class="intro">Pnömotakograf küçük bir direncin iki yanındaki basıncı örnekler, Pitot ölçer ise ayrı bir direnç elemanı kullanmadan akıma bakan ve ters yöne açılan uçlardan basınç alır. [[K6 s. 153–155]]</p>
<div class="viz"><div class="viz-head"><h3>Eleğin iki yanından sensörlere</h3></div><div data-viz="fk08b_pnomotakograf"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul><li><b>Elek ve sensörler.</b> Dairesel tüpün içindeki ince metal elek akıma küçük bir direnç oluşturur. [[K6 s. 153]] Eleğin iki yanındaki duvar deliklerinden çıkan ince tüpler iki basınç sensörüne gider. [[K6 s. 153]] Hareketli parça gerektirmeyen bu düzenek güvenilirdir. [[K6 s. 154]]</li>
<li><b>Laminer akım koşulu.</b> Ölçüm kesitinin geniş tutulması gazın hızını düşürür ve Reynolds sayısı ilişkisinin öngördüğü gibi laminer akımı destekler. [[K6 s. 154]] Bu koşulda Ohm yasasının akıma uyarlaması <i>Q</i> = Δ<i>P</i>/<i>R</i> geçerlidir. [[K6 s. 154]] Basınç farkı Δ<i>P</i> paskal ve akım <i>Q</i> litre/dakika alınırsa direnç <i>R</i> birimi Pa·dk·L⁻¹ olur. [[K6 s. 149]] [[K6 s. 154]]</li>
<li><b>Yoğuşma hatası.</b> Sıvı su kılcal tüpleri ve elek gözeneklerini tıkayabilir. [[K6 s. 154]] Açık alan küçülüp direnç arttığında aynı akım için basınç farkı büyür. [[K6 s. 154]] Direnç elemanının çevresine genellikle elektrikli bir ısıtıcı yerleştirilerek yoğuşma önlenir. [[K6 s. 154]]</li></ul>
<details><summary>Akım sabitken eleğin iki yanında ölçülen fark neden büyüyebilir?</summary>
<p>Gazın geçebildiği açık gözenekler azalırsa aynı akım, daha büyük bir direnci aşmak zorunda kalır. [[K6 s. 154]] Akım ile basınç farkı arasındaki orantı eleğin direncine bağlı olduğundan, kuru eleğin direnciyle hesap yapmaya devam etmek artan farkı hatalı olarak daha büyük bir akıma bağlar. [[K6 s. 154]] Isıtıcının amacı buradan anlaşılır: ölçümü etkileyen suyun oluşmasını önleyerek gözenekleri açık tutmak. [[K6 s. 154]]</p></details>
<div class="viz"><div class="viz-head"><h3>Pitot tüpünde hız ve basınç farkı</h3></div><div data-viz="fk08b_pitot"></div><p class="viz-cap" aria-live="polite"></p></div>
<p class="viz-foot">Grafikte her iki eksen de aynı gaz için seçilen referans değere bölünmüştür; sayılar kitabın hızın karesine dayanan ilişkisinden hesaplanır. [[K6 s. 155]]</p>
<p><b>Pitot tüpü.</b> Klasik tüpün yanı sıra çift yönlü ölçüme ve gaz akımına uyarlanmış biçimleri vardır. [[K6 s. 155]] Simetrik düzende akım eksenine paralel iki ağız zıt yönlere bakar, bu nedenle her iki akım yönünde de ölçüm yapılabilir. [[K6 s. 154–155]]</p>
<p>Sensöre uzanan kollarda akım yoktur. [[K6 s. 155]] Akıma bakan uçtaki gaz sıkışır, kinetik enerjisi basınca bağlı potansiyel enerjiye dönüşür. [[K6 s. 155]] Kinetik enerji hızın karesiyle değiştiği için basınç farkı da karesel değişir. [[K6 s. 155]]</p>
<p><b>Atlas notu.</b> Kitap basınç farkının hızın karesine eşit olduğunu söyler. [[K6 s. 155]] Doğrusu, sabit yoğunlukta Δ<i>P</i> ∝ <i>v</i><sup>2</sup> olmasıdır; basınç farkı (Pa) ile hızın (m·s⁻¹) karesi farklı birimler taşır. [[K6 s. 155]]</p>
<p>Pitot tüpü hacimsel akımı doğrudan ölçmez. [[K6 s. 155]] Hız kesit boyunca değiştiğinden sabit bir noktada ölçülen yerel hızın toplam hacimsel akımla orantılı olduğu varsayılır. [[K6 s. 155]]</p>
<details><summary>Gazın yönü tersine döndüğünde hangi ağızda basınç artar?</summary>
<p>Önce gazın geliş yönünü işaretleyin ve hangi tüp ağzının bu akımı karşıladığını bulun. [[K6 s. 154–155]] Basınç artışı, gelen gazın sıkıştığı bu ağızda ortaya çıkar. [[K6 s. 155]] Akım yön değiştirdiğinde akımı karşılayan ağız da değişir; simetrik probun inspirasyon ve ekspirasyonda kullanılabilmesi bu geometriye dayanır. [[K6 s. 154–155]] Sensör bağlantıları boyunca gaz geçtiğini varsaymaya gerek yoktur, ölçüm kollarındaki gaz durgundur. [[K6 s. 155]]</p></details>
<div class="tbl-wrap"><table class="tbl"><caption>Basınç bilgisinden akıma giden iki yol</caption><thead><tr><th>Soru</th><th>Pnömotakograf</th><th>Pitot</th></tr></thead><tbody>
<tr><th>Örnek nereden alınır?</th><td>Gazın içinden geçtiği eleğin iki yanından. [[K6 s. 153]]</td><td>Akıma karşı ve akımla aynı yöne bakan iki uçtan. [[K6 s. 154–155]]</td></tr>
<tr><th>Farkı ne doğurur?</th><td>Gazın eleğin küçük direncini aşması. [[K6 s. 153–154]]</td><td>Akıma bakan uçta gazın durması ve sıkışması. [[K6 s. 155]]</td></tr>
<tr><th>Hangi koşulu ararsınız?</th><td>Laminer akım ve direncini koruyan açık bir elek. [[K6 s. 154]]</td><td>Örnekleme noktasındaki hız ile toplam akım arasında orantı. [[K6 s. 155]]</td></tr></tbody></table></div>
<p class="note"><b>Şekildeki karesel ilişki.</b> Referans hıza dönüp basınç farkını okuyun. Hızı iki katına çıkardığınızda aynı referansa göre basınç farkı dört katına çıkar. [[K6 s. 155]] Eksenler oran gösterdiği için bu sonuç belirli bir boruda kaç paskal ölçüleceğini söylemez. [[K6 s. 155]]</p></section>

<section class="wrap blk ders-sec" id="fk08b-wright"><h2>Wright ölçer en yüksek akımı nasıl kaydeder?</h2>
<p class="intro">Basit ve düşük maliyetli Wright tepe akım ölçerinde ekspirasyonla ilerleyen diyafram, kayar işaretçiyi ulaşılan en yüksek akıma taşır. [[K6 s. 155–156]]</p>
<div class="viz"><div class="viz-head"><h3>Diyafram, çıkış yarığı ve yay</h3></div><div data-viz="fk08b_wright"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Hastanın üflediği hava diyaframı akım yönünde iterken yay bu harekete karşı koyar. [[K6 s. 155]] Diyafram ilerledikçe dar bir çıkış yarığı açılır ve dışarı kaçan hava diyaframa uygulanan basıncı azaltır. [[K6 s. 155]] Yay kuvveti havanın itişine üstün gelene kadar diyafram işaretçiyi ileri taşır. [[K6 s. 155]]</p>
<p><b>Sonuç nasıl yorumlanır?</b> Türbinli ölçer soluk boyunca değişen akımı sürekli gösterirken Wright ölçer tek bir ekspirasyonda ulaşılmış en yüksek akımı kaydeder. [[K6 s. 153]] [[K6 s. 155]] İşaretçinin son konumu üflemenin tamamı boyunca ne kadar gaz çıktığını vermez; hacmi akımdan hesaplamak için zaman içindeki akım değerleri gerekir. [[K6 s. 152]] [[K6 s. 155]]</p></section>

<section class="wrap blk ders-sec" id="fk08b-can"><h2>Benedict–Roth spirometresi hacmi doğrudan ölçer</h2>
<p class="intro">Hava yolu ağzından geçen gaz bir haznede toplanırsa hacim değişimi, haznenin hareketinden doğrudan okunabilir. [[K6 s. 156]]</p>
<div class="viz"><div class="viz-head"><h3>Çan, karşı ağırlık ve su contası</h3></div><div data-viz="fk08b_spirometre"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Bu toplama yöntemi 19. yüzyıldan beri kullanılır. [[K6 s. 156]] “Spirometri” terimi zamanla, akımölçer ve integratör dahil hangi teknik kullanılırsa kullanılsın, akciğer fonksiyonunu incelemek için hacim değişikliklerinin ölçülmesini kapsar hâle gelmiştir. [[K6 s. 156]]</p>
<ul><li><b>Hazne.</b> Sabit taban ile karşı ağırlıkla statik olarak dengelenmiş rijit, hareketli çan arasındaki dinamik conta genellikle sudur; kuru conta da kullanılabilir. [[K6 s. 156]] Çan serbestçe yükselip alçaldığından iç basınç atmosfer basıncına yakın kalır. [[K6 s. 156]]</li>
<li><b>Kayıt.</b> İç hacimdeki değişim Δ<i>V</i><sub>s</sub> çanın yer değiştirmesiyle orantılıdır. [[K6 s. 156]] Çanın hareketi geleneksel olarak dönen bir tambura kaydedilir, herhangi bir yer değiştirme sensörü de kullanılabilir. [[K6 s. 156]]</li>
<li><b>Ölçüm hatası.</b> Ekspire edilen hava haznede soğurken büzülür, içerdiği su buharının bir bölümü de yoğuşur. [[K6 s. 157]] Bu nedenle cihaz genellikle ekspirasyon hacmini olduğundan düşük gösterir. [[K6 s. 157]]</li></ul>
<details><summary>Basınç atmosfere yakınsa nasıl bir sinyal kaydedilir?</summary>
<p>Haznede toplanan gazın hacmi değişirken hareket serbestliği olan çanın konumu da değişir. [[K6 s. 156]] Aranan sinyal bu yer değiştirmedir. [[K6 s. 156]] Su contası hareketli ve sabit parçalar arasındaki bağlantıyı sızdırmaz tutar, karşı ağırlık ise çanı dengeler. [[K6 s. 156]] Dönen kayıt tamburunun yerine başka bir yer değiştirme sensörünün kullanılabilmesi, her ikisinin de aynı mekanik hareketi izlemesine dayanır. [[K6 s. 156]]</p></details>
<p class="note"><b>İki hacim ölçümünü ayırın.</b> Ağızda akım ölçülüyorsa bilgisayar geçen gazı zaman içinde toplar. [[K6 s. 151–152]] Çanlı spirometrede ise gazın kendisi toplanır ve hacimdeki değişim hareketli haznenin konumundan okunur. [[K6 s. 156]] Dolayısıyla burada hata kaynağını ararken yalnız çanın hareketine değil, ölçüm sırasında toplanan gazın soğumasına da bakılır. [[K6 s. 156–157]]</p></section>

<section class="wrap blk ders-sec" id="fk08b-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="fk08b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk08b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk08b-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk08b-p2"><h2>Part II · SOE 2 · Klinik ölçüm ve ekipman</h2>
<p class="intro">Ağızlıkta ince metal elek bulunan bir solunum ölçeri görüyorsunuz. Bir zorlu soluk sırasında akımı ve hacmi nasıl elde edersiniz? Elek ıslanırsa ölçüm nasıl etkilenir?</p>
<details><summary>Cevap iskeleti</summary><ol>
<li>Eleğin önünden ve arkasından basınç alınır. [[K6 s. 153]] Geniş kesitte düşük hız laminer akımı destekler ve sabit dirençte basınç farkı akımla orantılıdır. [[K6 s. 154]]</li>
<li>Akımın zaman integrali hacim değişimini verir. [[K6 s. 151–152]]</li>
<li>Yoğuşma gözenekleri daraltıp direnci artırır; elektrikli ısıtıcı bu hatayı önlemeye yardımcı olur. [[K6 s. 154]]</li></ol></details>
<p><b>Çizin.</b> Eleği ve iki basınç bağlantısını yerleştirin. [[K6 s. 153–154]] Altına aynı zaman ekseninde inspirasyon ve ekspirasyon için hacim ve akım eğrilerini çizip bir eğimi ve ona karşılık gelen akımı işaretleyin. [[K6 s. 152–153]]</p>
<p><b>Ek sorular.</b> Pitot tüpünde uçların yönü niçin önemlidir? Benedict–Roth spirometresinde ekspirasyon hacmi hangi iki nedenle düşük ölçülebilir? Venturi valfinin hava girişini kısmen kapatırsanız verilen oksijen yüzdesi nasıl değişebilir?</p></section>
<section class="wrap blk ders-sec" id="fk08b-ozet"><h2>Özet</h2>
<p>Bernoulli ilkesi hızlanan gazın duvar basıncındaki düşüşü açıklar; Venturi valfi bu düşüşle karışıma hava katar. [[K6 s. 146–149]] Coanda etkisinde jet dışbükey yüzeyi izler ve valf içinde hastaya ya da tahliyeye yönlendirilebilir. [[K6 s. 149–150]] Kitap her iki etkiyi de Bernoulli ilkesine bağlar; ikisi de anestezi cihazlarında kullanılır. [[K6 s. 158]]</p>
<p>Düşük hızda pürüzsüz tüpte akım çoğunlukla laminerdir; engeller ve çatallanmalar girdap ya da türbülans oluşturabilir. [[K6 s. 157]] Reynolds sayısı hız, yarıçap, yoğunluk ve viskoziteye bağlıdır; 2000 altında laminer, 4000 üzerinde türbülanslı akım baskındır. [[K6 s. 157]] Laminer akım sürücü basınçla, türbülanslı akım onun kareköküyle orantılıdır. [[K6 s. 157]]</p>
<p>Solunum akımı türbin, pnömotakograf veya Pitot ölçerle izlenebilir. [[K6 s. 158]] Hacim için akım zamana göre integre edilir ya da Benedict–Roth spirometresinde çanın hareketi ölçülür. [[K6 s. 156–158]]</p>
<div data-viz="tamam" data-modul="fizik" data-bolum="08b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/08a">← Akım: laminer ve türbülanslı akım</a><a href="#/dersler/fizik/09a">Sonraki: İdeal gaz, Avogadro yasası ve kısmi basınç →</a></nav></section>`
  };
})();
