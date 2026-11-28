VERI.sorular = VERI.sorular || {};
VERI.sorular['fk15a-1'] = {
  no: 1, kok: 'Kırılma ve kritik açı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 261–264]]',
  onermeler: [
    { t: 'Snell yasasında geliş açısı ara yüzey ile gelen ışın arasında ölçülür.', d: false, n: 'Her iki açı da yüzeye dik olan normale göre ölçülür. [[K6 s. 262]]' },
    { t: 'Kırılma indisi, ışığın vakumdaki hızının ortamdaki hızına oranıdır.', d: true, n: 'Camda ışık yavaşladığı için bu oran yaklaşık 1,5 olur. [[K6 s. 261]]' },
    { t: 'Sudan havaya geçen eğik bir ışın normale yaklaşır.', d: false, n: 'Su yüzeyinden havaya çıkan ışın normalden uzaklaşır. [[K6 s. 262–263]]' },
    { t: 'Kritik geliş açısında kırılma açısı 90° olur.', d: true, n: 'Kırılan ışın iki ortamın sınırı boyunca yönelir. [[K6 s. 263–264]]' },
    { t: 'Camdan havaya yönelen ışın kritik açının üstünde camı terk eder.', d: false, n: 'Bu koşulda ışın tam iç yansımayla cama geri döner. [[K6 s. 263]]' }
  ]
};
VERI.sorular['fk15a-2'] = {
  no: 2, kok: 'Optik lif ve kateter ucu basınç ölçümü', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 264–266]]',
  onermeler: [
    { t: 'Cam kaplamanın kırılma indisi çekirdeğinkinden düşüktür.', d: true, n: 'Bu indis farkı çekirdek sınırında tam iç yansımaya olanak verir. [[K6 s. 265]]' },
    { t: 'Birincil plastik koruyucu, kırılgan cam kaplamayı dıştan sarar.', d: true, n: 'Çekirdeğin üzerindeki cam kaplamayı koruyan üçüncü katman plastiktir. [[K6 s. 265]]' },
    { t: 'Damar içi fiberoptik sensörde basıncı dışarıdaki transdüsere iletmek için serum sütunu gerekir.', d: false, n: 'Sensör doğrudan damara yerleştirilerek basınç kateter ucunda algılanabilir. [[K6 s. 266]]' },
    { t: 'Yansıtıcı metal zarın biçim değiştirmesi dönen ışığın şiddetini değiştirir.', d: true, n: 'Monitör basıncı yansıyan ışık şiddetinden hesaplar. [[K6 s. 265]]' },
    { t: 'Kateter ucu fiberoptik basınç sensörünün kalibrasyonu kolaydır.', d: false, n: 'Kalibrasyon güçlüğü, yüksek maliyet ve hassas yapı kullanımını sınırlar. [[K6 s. 266]]' }
  ]
};
VERI.sorular['fk15a-3'] = {
  no: 3, kok: 'Fiberoptik bronkoskopun yapısı ve kullanımı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 266–267]]',
  onermeler: [
    { t: 'Aydınlatma demetinde liflerin iki uçtaki göreli konumlarının korunması gerekir.', d: false, n: 'Görüş alanını aydınlatmak için üretimi daha ucuz olan düzensiz demet kullanılır. [[K6 s. 266]]' },
    { t: 'Düzenli demette her lif görüntünün bir öğesini taşır.', d: true, n: 'Lif uçlarının dizilişi korunduğu için her lif bir piksele karşılık gelir. [[K6 s. 266]]' },
    { t: 'El parçasındaki tekerlek ince teller aracılığıyla distal ucu yönlendirebilir.', d: true, n: 'Teller esnek ucu bir doğrultuda veya birbirine dik iki doğrultuda büker. [[K6 s. 267]]' },
    { t: 'Aspirasyon kanalından biyopsi forsepsi geçirilebilir.', d: true, n: 'Aynı kanal sekresyonların uzaklaştırılmasına ve uygun cerrahi aletlerin ilerletilmesine yarar. [[K6 s. 267]]' },
    { t: 'Görüntü bir video sistemine aktarılıp kaydedilebilir.', d: true, n: 'Bronkoskop okülerden izlemeye veya ekranda izleme ve kayda olanak verir. [[K6 s. 267]]' }
  ]
};

const FK15A_NAV = [
  ['kirilma', 'Kırılma'], ['kritik', 'Kritik açı'], ['lif', 'Optik lif'], ['basinc', 'Basınç ölçümü'],
  ['demet', 'Görüntü iletimi'], ['bronkoskop', 'Bronkoskop'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet']
];
SAYFALAR['dersler/fizik/15a'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 15 · Ders 15a', baslik: 'Kırılma, optik lifler ve fiberoptik endoskoplar',
  lede: 'Bir ışını izleyerek başlayın. O ışını lifin içinde ne tutar? Lifler yan yana geldiğinde bronştan gelen görüntü gözünüze nasıl ulaşır?',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK15A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="fk15a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk15a-kirilma">
  <h2>Işık havadan cama geçerken</h2>
  <p class="intro">Işık bir saydam ortamdan diğerine eğik geçtiğinde doğrultusu değişir. [[K6 s. 261–262]] Bir akvaryuma farklı açılardan bakınca balığın yer değiştirmiş gibi görünmesi, havuzun sığ, bardaktaki pipetin bükülmüş görünmesi kırılmanın sonuçlarıdır. [[K6 s. 261]]</p>
  <div class="viz"><div class="viz-head"><h3>Geliş açısını değiştirin</h3></div><div data-viz="fk15a_snell"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kesikli çizgi, yüzeye dik olan normaldir. [[K6 s. 262]]</p></div>
  <div class="fk15a-kartlar">
    <div class="card"><h3>Kırılma indisi</h3><p><i>n</i> = <i>c</i>/<i>v</i>. [[K6 s. 261]] Burada <i>c</i> ışığın vakumdaki, <i>v</i> ise incelenen ortamdaki hızıdır (m/s). [[K6 s. 261]] Aynı birimde iki hızın oranı olan <i>n</i> boyutsuzdur. [[K6 s. 261]]</p></div>
    <div class="card"><h3>Hızdan indise</h3><p>Camda ışığın hızı vakumdaki hızın yaklaşık üçte ikisidir. [[K6 s. 261]] <i>v</i> ≈ 2<i>c</i>/3 olduğundan <i>n</i> ≈ <i>c</i>/(2<i>c</i>/3) = 1,5 bulunur. [[K6 s. 261]] Havada ışık vakumdakinden çok az yavaştır, dolayısıyla <i>n</i> yaklaşık 1’dir. [[K6 s. 261]]</p></div>
  </div>
  <p><b>Snell yasası</b> &nbsp; <i>n</i><sub>1</sub> sin <i>θ</i><sub>1</sub> = <i>n</i><sub>2</sub> sin <i>θ</i><sub>2</sub>. [[K6 s. 262]] İlk indis ışının geldiği, ikincisi geçtiği ortama aittir. [[K6 s. 262]] <i>θ</i><sub>1</sub> gelen ışının, <i>θ</i><sub>2</sub> kırılan ışının normalle yaptığı açıdır (°). [[K6 s. 262]] Hava ve camın indisleri bilindiğinde ilk açıdan ikincisi hesaplanabilir. [[K6 s. 262]] Işın cama eğik girdiğinde daha küçük bir açıyla ilerler, yani normale yaklaşır. [[K6 s. 262]]</p>
  <div class="note"><b>Kaydırıcıdaki ışını hesaplayın.</b> Geliş açısını 30° seçin. Camdaki açıyı bulmak için önce sin <i>θ</i><sub>2</sub> ≈ (1/1,5) × sin 30° = 1/3 yazılır. [[K6 s. 261–262]] Ardından ters sinüs alınır ve <i>θ</i><sub>2</sub> ≈ 19,5° bulunur. [[K6 s. 261–262]] Işının normale yaklaşmasını şekildeki kesikli çizgiden kontrol edin. Kaydırıcıyı sıfıra indirdiğinizde ise her iki açı da sıfır olur ve ışın doğrultusunu korur. [[K6 s. 262]]</div>
</section>

<section class="wrap blk ders-sec" id="fk15a-kritik">
  <h2>Işın hangi açıda dışarı çıkamaz?</h2>
  <p class="intro">Su altında maskeyle tam yukarı bakan bir dalgıç gökyüzünü görür. [[K6 s. 263]] Uzağa baktığında ise su yüzeyi ayna gibi davranır, deniz tabanındaki cisimleri yansıtabilir. [[K6 s. 263]]</p>
  <div class="viz"><div class="viz-head"><h3>Camdan havaya giden ışını izleyin</h3></div><div data-viz="fk15a_esik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şekildeki açılar cam ve hava için yaklaşık indislerden Snell yasasıyla hesaplanır. [[K6 s. 261–264]]</p></div>
  <ol class="iskelet"><li><b>Kritik açının altında.</b> Suyun içinden yüzeye dik doğrultuya yakın gelen ışın havaya çıkar. [[K6 s. 262–263]] Eğik gelen ışın sudan havaya geçerken normalden uzaklaşır. [[K6 s. 262]]</li>
    <li><b>Kritik açıda.</b> Kırılma açısı 90° olduğunda kırılan ışın ara yüzey boyunca yönelir. [[K6 s. 263]] Tam bu durumu sağlayan geliş açısına kritik açı (<i>θ</i><sub>k</sub>) denir. [[K6 s. 263]]</li>
    <li><b>Kritik açının üstünde.</b> Işın bütünüyle geldiği ortama döner (tam iç yansıma). [[K6 s. 261–263]] Bu durum camdan veya kırılma indisi havanınkinden büyük başka bir ortamdan havaya yönelen ışıkta da görülebilir. [[K6 s. 263]]</li></ol>
  <div class="note"><b>Kritik açıyı bulun.</b> Snell bağıntısında <i>θ</i><sub>2</sub> = 90° alınırsa sin <i>θ</i><sub>k</sub> = <i>n</i><sub>2</sub>/<i>n</i><sub>1</sub> elde edilir (<i>n</i><sub>1</sub> &gt; <i>n</i><sub>2</sub>). [[K6 s. 263–264]] Camdan havaya geçişte <i>θ</i><sub>k</sub> ≈ arcsin(1/1,5) ≈ 41,8° olur. [[K6 s. 261–264]]</div>
  <div class="viz"><div class="viz-head"><h3>Havadaki açıdan camdaki açıyı bulun</h3></div><div data-viz="fk15a_egri"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Nokta seçilen açı çiftini, eğrinin sağ ucu ise kırılmanın sınırını gösterir. [[K6 s. 262–264]]</p></div>
  <p>Önce havadaki açıyı seçin ve noktanın yatay eksendeki karşılığını okuyun. Kaydırıcıyı 90° konumuna getirdiğinizde, havadaki ışın yüzeye paralelken camdaki ışın hâlâ yüzeyle açı yapar. [[K6 s. 263–264]] Geliş açısı bu değerin üzerine çıktığında havaya geçen bir ışın kalmaz. [[K6 s. 263–264]]</p>
</section>

<section class="wrap blk ders-sec" id="fk15a-lif">
  <h2>Optik lif ışığı nasıl taşır?</h2>
  <p class="intro">Işık, lifin ekseniyle küçük açı yapacak biçimde girmelidir. [[K6 s. 265]] Böylece çekirdeğin yan duvarına normale göre büyük açıyla gelir ve art arda tam iç yansımalarla uzun mesafe ilerler. [[K6 s. 263–265]]</p>
  <div class="viz"><div class="viz-head"><h3>Üstte enine, altta boyuna kesit</h3></div><div data-viz="fk15a_lif"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Katman kalınlıkları ve ışın yolu şematiktir. [[K6 s. 264–265]]</p></div>
  <ul class="ozet"><li><b>Çekirdek.</b> Son derece saf ve saydam silika camdan üretilir. [[K6 s. 264]] Çıplak çekirdek de ışık taşıyabilir, ancak yüzeyindeki kir veya yağ dış ortamın indisini yükseltip ışık kaybına yol açabilir. [[K6 s. 265]]</li>
    <li><b>Cam kaplama.</b> Çekirdeği dıştan sarar ve indisi daha düşüktür. [[K6 s. 265]] Böylece ışığın yansıdığı sınırda yüksek indisli taraf çekirdek olarak kalır. [[K6 s. 265]]</li>
    <li><b>Birincil koruyucu (primary buffer).</b> En dıştaki plastik tabaka, cam kaplamayı mekanik hasardan korur. [[K6 s. 265]]</li></ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap dış ortamın indisi artınca kritik açının küçüldüğünü söyler. [[K6 s. 265]] Doğrusu, çekirdek indisi sabitken sin <i>θ</i><sub>k</sub> = <i>n</i><sub>dış</sub>/<i>n</i><sub>çekirdek</sub> bağıntısı gereği kritik açının büyümesi ve tam iç yansıma koşulunun zorlaşmasıdır. [[K6 s. 264–265]]</div>
  <div class="viz"><div class="viz-head"><h3>Bir telefon konuşmasının yolu</h3></div><div data-viz="fk15a_iletim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Her durakta üst kutu gelen sinyali, alt kutu bir sonraki bölüme aktarılan sinyali gösterir. [[K6 s. 264]]</p></div>
  <p>Verici, konuşmayı taşıyan analog elektrik sinyalini kızılötesi lazer ışığının sayısal darbelerine dönüştürür. [[K6 s. 264]] Darbeler liften geçer, alıcıdaki ışık dedektörü bunları yeniden elektrik sinyaline çevirir. [[K6 s. 264]] Sinyal yol boyunca zayıfladığı için uzun kabloda yaklaşık her 200 km’de bir lazer tekrarlayıcıyla güçlendirilir. [[K6 s. 264]] Okyanusları aşan bu lifler, bakır tellere göre binlerce kat fazla bilgi taşıyabilir. [[K6 s. 264]]</p>
  <p><b>Tıpta kullanım.</b> Optik lifler endoskoplara ışık taşır, cerrahi lazerin kızılötesi ışığını hedefe iletebilir ve fotodinamik tedavide kullanılabilir. [[K6 s. 264]] Özel olarak tasarlanan lif sensörleriyle fizyolojik ölçüm de yapılabilir. [[K6 s. 264–265]]</p>
</section>

<section class="wrap blk ders-sec" id="fk15a-basinc">
  <h2>Kateter ucunda basınç ölçümü</h2>
  <p class="intro">Ölçülen büyüklük geri dönen ışığın şiddetidir. [[K6 s. 265]] Dış basınç kateter ucundaki yansıtıcı metal zarı büker, monitör yansıyan ışık şiddetindeki değişimden basıncı hesaplar. [[K6 s. 265]]</p>
  <div class="viz"><div class="viz-head"><h3>Lif demetini ve karşısındaki zarı bulun</h3></div><div data-viz="fk15a_transduser"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ul class="ozet"><li><b>Yerleşim.</b> Fiberoptik transdüser intrakraniyal basıncı ölçmek için kullanılır. [[K6 s. 266]] Damarın içine doğrudan yerleştirildiğinde basıncı dış transdüsere taşıyacak serum dolu bir katetere gerek kalmaz. [[K6 s. 266]]</li>
    <li><b>Dalga biçimi.</b> Hızlı yanıt verir. [[K6 s. 266]] Rezonans ve sönüm sorunları olmadığından arter basınç dalgası monitörde aslına uygun biçimde izlenebilir. [[K6 s. 266]]</li>
    <li><b>Sınırlamalar.</b> Pahalı ve narin bir sensördür, kalibrasyonu güçtür. [[K6 s. 266]] Bu yüzden kan basıncı ölçümünde dış transdüserler daha sık kullanılır. [[K6 s. 266]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="fk15a-demet">
  <h2>Görüntüyü taşıyan liflerin sırası neden önemli?</h2>
  <p class="intro">Endoskopta dış kaynaktan çıkan ışık görüş alanına giderken orada oluşan görüntü ayrı bir demetle gözlemciye döner. [[K6 s. 266]] Yalnız görüntüyü taşıyan demette her lifin iki uçtaki göreli konumu korunmalıdır. [[K6 s. 266]]</p>
  <div class="viz"><div class="viz-head"><h3>Aynı deseni iki demetten geçirin</h3></div><div data-viz="fk15a_demet"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Noktalar, göreli konumları izlenebilen örnek lif uçlarıdır. [[K6 s. 266]]</p></div>
  <div class="fk15a-kartlar"><div class="card"><h3>Görüntü · düzenli demet</h3><p>Tipik bir fiberoptik bronkoskopta 5.000–40.000 lif düzenli (koherent) bir demet oluşturur. [[K6 s. 266]] Görüntü distal uç üzerine odaklanır, her lif bilgisayar ekranındaki bir piksel gibi görüntünün bir öğesini gözlemciye taşır. [[K6 s. 266]]</p></div>
    <div class="card"><h3>Aydınlatma · düzensiz demet</h3><p>Örneğin bir halojen lambadan gelen ışık düzensiz (inkoherent) lif demetiyle görüş alanına iletilir. [[K6 s. 266]] Bu görevde lif sırasını korumak gerekmediğinden üretimi çok daha ucuz olan demet seçilir. [[K6 s. 266]]</p></div></div>
  <p>1950’lerin ortalarında kullanıma giren esnek fiberoptik endoskoplarla, uyanık veya sedasyon altındaki hastalarda daha önce erişilemeyen yerler görülebilmiştir. [[K6 s. 266]] Önceki kuşak rijit endoskoplar sınırlı bölgelerde kullanılabilir ve yerleştirilmeleri hastada travmaya yol açabilir. [[K6 s. 266]]</p>
</section>

<section class="wrap blk ders-sec" id="fk15a-bronkoskop">
  <h2>Bronkoskopun ucundan el parçasına</h2>
  <p class="intro">Bronkoskop hava yollarını görmek üzere tasarlanmış bir endoskoptur. [[K6 s. 267]] Tipik dış çapı 4–5 mm olan esnek, su geçirmez kılıfın içinde görüntü ve aydınlatma demetleriyle aspirasyon kanalı birlikte ilerler. [[K6 s. 267]]</p>
  <div class="viz"><div class="viz-head"><h3>Distal uçta hangi yol nereye açılır?</h3></div><div data-viz="fk15a_bronkoskop"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ul class="ozet">
    <li><b>Gövde.</b> Distal uçla proksimal ucu birleştirir, ışık kılavuzunu, görüntü demetini ve yardımcı tüpleri bir arada tutar. [[K6 s. 266]] Sıklıkla kullanılan çelik örgü gövdeye sertlik kazandırır ve narin iç parçaları korur. [[K6 s. 266]] Ağız koruyucusu da bronkoskopun hassas gövdesini korur. [[K6 s. 267]]</li>
    <li><b>Yönlendirme.</b> Bazı endoskoplarda distal bölüm daha esnektir. [[K6 s. 266–267]] El parçasındaki tekerlek çevrilince gövdeden geçen ince teller ucu bir doğrultuda veya birbirine dik iki doğrultuda bükebilir. [[K6 s. 267]] Böylece hekim bakış yönünü değiştirebilir ve örneğin bronş ağacında seçtiği dala ilerleyebilir. [[K6 s. 267]]</li>
    <li><b>Görüş ve girişim.</b> Görüntü okülerden izlenebilir veya video sistemiyle ekrana aktarılıp kaydedilebilir. [[K6 s. 267]] Tükürük, mukus ve birikintiler görüşü kapatabilir, aspirasyon ve yıkama görüşü iyileştirir. [[K6 s. 267]] Aspirasyon kanalından biyopsi forsepsi gibi özel aletler de ilerletilebilir. [[K6 s. 267]]</li>
    <li><b>Sızdırmazlık ve bakım.</b> Biyolojik olarak inert plastik dış kılıf gövdeyi sızdırmaz biçimde kapatır. [[K6 s. 267]] Böylece vücut sıvıları iç parçalara zarar vermez ve cihaz kullanım sonrası temizlenip sterilize edilebilir. [[K6 s. 267]] Hastalar arasında bu işlem zaman alır ve özel ekipman gerektirir. [[K6 s. 267]]</li>
    <li><b>Ömür ve maliyet.</b> Düzenli demetleri üretmenin teknik güçlüğü fiberoptik endoskopları pahalı kılar. [[K6 s. 267]] Tekrarlanan kullanım ve sterilizasyonla liflerde küçük çatlaklar oluşur, lifler giderek bozulur. [[K6 s. 267]] Kitap, küçük sayısal fotodedektör dizilerindeki gelişmelerle fiberoptik endoskopların yerini giderek bu teknolojinin almaya başladığını belirtir. [[K6 s. 267]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="fk15a-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önermeyi bağımsız değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="fk15a-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk15a-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk15a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk15a-p2"><h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Fiberoptik bronkoskopla bir bronş dalına bakıyorsunuz. Işığın lambadan bronşa, görüntünün bronştan gözünüze izlediği yolları anlatın. Mukus görüşü kapatırsa hangi kanalı kullanırsınız?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Işık yüksek indisli çekirdekten düşük indisli kaplamaya kritik açının üzerinde geldiğinde tam iç yansımayla lifte ilerler. [[K6 s. 263–265]]</li>
    <li>Lambadan gelen ışığı düzensiz demet bronşa taşır. [[K6 s. 266]] Bronştaki görüntü düzenli demetin distal ucuna odaklanır ve liflerin göreli konumu korunduğundan okülerde yeniden görülebilir. [[K6 s. 266–267]]</li>
    <li>El parçasındaki tekerlek ve teller distal ucu seçilen dala yönlendirir. [[K6 s. 267]] Mukus aspirasyon kanalından uzaklaştırılır, yıkama da görüşü iyileştirir. [[K6 s. 267]]</li></ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Bir lif boyunca çekirdek ve kaplamayı, sınıra dik normali ve tam iç yansıyan ışını gösterin. [[K6 s. 262–265]] Bronkoskop ucunun kesitini ekleyip ışık, görüntü ve aspirasyon yollarını işaretleyin. [[K6 s. 266–267]]</div>
  <div class="note plain"><b>Ek sorular</b><ul><li>Kateter ucundaki metal zar basıncı ölçülebilir bir optik değişime nasıl dönüştürür? [[K6 s. 265]]</li><li>Bu sensörün arter dalgasını izlemedeki üstünlüğü ve kullanımını sınırlayan özellikleri nelerdir? [[K6 s. 266]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="fk15a-ozet"><h2>Özet</h2><ul class="ozet">
  <li>Snell yasasında açıların referansı yüzey normalidir. [[K6 s. 262]] Yüksek indisten düşük indise yönelen ışın kritik açıda sınır boyunca gider, daha büyük geliş açısında bütünüyle geri yansır. [[K6 s. 263–264]]</li>
  <li>Optik lifte cam kaplama çekirdekten düşük indislidir, plastik dış katman kaplamayı korur. [[K6 s. 265]]</li>
  <li>Kateter ucu transdüseri, basıncı yansıtıcı zardan geri dönen ışığın şiddetinden hesaplar. [[K6 s. 265]]</li>
  <li>Bronkoskopta düzensiz demet alanı aydınlatır, düzenli demet görüntüyü taşır, aspirasyon kanalı aspirasyona ve biyopsiye olanak verir. [[K6 s. 266–267]]</li></ul>
  <div data-viz="tamam" data-modul="fizik" data-bolum="15a"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/14b">← Ventilatörler ve ventilasyon modları</a><a href="#/dersler/fizik/15b">Sonraki: Beer yasası, hemoglobin spektrumları, puls oksimetri, NIRS ve CO-oksimetri →</a></nav>
</section>`
};
