VERI.sorular = VERI.sorular || {};
VERI.sorular['an04c-1'] = {
  no: 1, kok: 'Kord dalları ve dirsek', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 174–178]]',
  onermeler: [
    { t: 'Bell sinirine C7 her zaman katılır.', d: false, n: 'Yanlış. C7 katkısı bulunmayabilir. [[K5 s. 174]]' },
    { t: 'Pektoralis minöre lateral pektoral sinirden de lif ulaşabilir.', d: true, n: 'Doğru. Lateral pektoral sinirin ince bağlantı dalı medial pektoral sinire katılır. [[K5 s. 175]]' },
    { t: 'Muskülokütanöz sinir ön kolun medial kutanöz siniri olarak sürer.', d: false, n: 'Yanlış. Antekübital fasyayı delen devamı lateral ön kol derisine gider. [[K5 s. 175]]' },
    { t: 'Ulnar sinir medial epikondilin arkasından geçer.', d: true, n: 'Doğru. Sinir bu kemik çıkıntısının arkasında palpe edilebilir. [[K5 s. 177]]' },
    { t: 'Ulnar sinirin ön koldaki eşlikçi arteri bileğe kadar medialinde kalır.', d: false, n: 'Yanlış. Ulnar arter sinire lateralden ulaşır ve lateralinde ilerler. [[K5 s. 178]]' },
  ],
};
VERI.sorular['an04c-2'] = {
  no: 2, kok: 'El bileği ve el', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 179–188]]',
  onermeler: [
    { t: 'Median sinirin palmar kutanöz dalı retinakulumun yüzeyinden geçer.', d: true, n: 'Doğru. Dal bileğin hemen üstünde derin fasyayı deler ve retinakulumun üzerinden avuca geçer. [[K5 s. 183]]' },
    { t: 'Tenar motor dal distal bilek çizgisinin yaklaşık 3 cm distalinde ayrılır.', d: true, n: 'Doğru. Median sinirin lateral terminal dalı bu düzeyde kısa, kalın bir tenar dal verir. [[K5 s. 184]]' },
    { t: 'Serçe parmağın tırnak yatağını ulnar sinirin dorsal dijital dalı uyarır.', d: false, n: 'Yanlış. Tırnak yatağına palmar dijital sinirin dorsal kollaterali ulaşır. [[K5 s. 179–180]]' },
    { t: 'Ulnar sinirin derin terminal dalı bileğe ince bir eklem dalı verir.', d: true, n: 'Doğru. Bu küçük duyusal dal derin terminal dalın motor ağırlıklı dağılımının istisnasıdır. [[K5 s. 179]]' },
    { t: 'Radiyal sinir bazen birinci dorsal interosseözü uyarır.', d: false, n: 'Yanlış. Bu kasa median lifler ulaşabilir, radiyal sinir intrinsik el kaslarını uyarmaz. [[K5 s. 188]]' },
  ],
};
VERI.sorular['an04c-3'] = {
  no: 3, kok: 'Radiyal sinir ve segmentler', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 187–190]]',
  onermeler: [
    { t: 'Yüzeyel radiyal sinir supinatörün motor dalını verir.', d: false, n: 'Yanlış. Supinatöre arka interosseöz dal lif verir, yüzeyel radiyal dal duyusaldır. [[K5 s. 187–188]]' },
    { t: 'Dirsek fleksörleri C5 ve C6 ile eşleşir.', d: true, n: 'Doğru. Dirsek fleksörlerinin segmental kaynağı C5–C6’dır. [[K5 s. 190]]' },
    { t: 'Proksimal medial kolun kutanöz segmenti T2’dir.', d: true, n: 'Doğru. T2 bu alana interkostobrakiyal sinirle ulaşır. [[K5 s. 190]]' },
    { t: 'Elin intrinsik kasları segmental olarak T1 ile eşleşir.', d: true, n: 'Doğru. İntrinsik el kasları için verilen segment T1’dir. [[K5 s. 190]]' },
    { t: 'Tek kök bloğundan sonra belirgin anestezinin görülmemesi dermatom örtüşmesiyle açıklanabilir.', d: true, n: 'Doğru. Komşu segmentlerin duyu alanları geniş ölçüde örtüşür. [[K5 s. 190]]' },
  ],
};

SAYFALAR['dersler/anatomi/04c'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 4 · Ders 04c',
  baslik: 'Brakiyal pleksus dalları ve üst ekstremite segmental innervasyonu',
  lede: 'Bir siniri omuzdan parmağa izleyin, sonra aynı bölgeyi kök düzeyinde değerlendirin.',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an04c-skapula"><span>01</span>Skapula</button>
  <button type="button" data-scroll="an04c-kord"><span>02</span>Kord dalları</button>
  <button type="button" data-scroll="an04c-ulnar"><span>03</span>Ulnar</button>
  <button type="button" data-scroll="an04c-median"><span>04</span>Median</button>
  <button type="button" data-scroll="an04c-arka"><span>05</span>Aksiller</button>
  <button type="button" data-scroll="an04c-radial"><span>06</span>Radiyal</button>
  <button type="button" data-scroll="an04c-bilek"><span>07</span>Distal bloklar</button>
  <button type="button" data-scroll="an04c-segment"><span>08</span>Segmentler</button>
  <button type="button" data-scroll="an04c-p1"><span>09</span>Part I</button>
  <button type="button" data-scroll="an04c-p2"><span>10</span>Part II</button>
  <button type="button" data-scroll="an04c-ozet"><span>11</span>Özet</button>
</nav>
<section class="wrap blk ders-sec" id="an04c-skapula">
  <h2>Klavikula üstünde dört dal</h2>
  <p class="intro">Romboid ve serratus anterior sinirleri köklerden, supraskapular sinir ve subklavius siniri üst trunkustan ayrılır. [[K5 s. 174]]</p>
  <div class="viz"><div data-viz="an04c_skapula"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Romboid kaslar</dt><dd>Siniri C5 kökünden itibaren izleyin. [[K5 s. 174]] İlk geçtiği kas orta skalendir, ardından levator skapulanın derin yüzü boyunca ilerler. [[K5 s. 174]] Bu yolun sonunda motor dalların ulaştığı kaslar romboidlerdir. [[K5 s. 174]]</dd></div>
    <div><dt>Serratus anterior</dt><dd>Bell sinirine C5 ve C6 ön dalları orta skaleni delerek katılır, bazen bulunmayan C7 katkısı ise kasın önünden geçer. [[K5 s. 174]] Lifler orta skalenin ötesinde tek bir gövde halinde birleşir ve birinci kostanın üzerinden geçer. [[K5 s. 174]] Bu ortak gövdeyi aksillanın medial duvarında ararken duvarın görece arka bölümünü izleyin. [[K5 s. 174]] Sinir serratus anteriorun yüzeyinde ilerledikçe kasın her bir dişine ayrı lifler verir. [[K5 s. 174]]</dd></div>
    <div><dt>Supraskapular sinir</dt><dd>C5–C6 lifleri posterior üçgeni geçer, trapezin derininden supraskapular çentiğe ulaşır ve supraskapular bağın köprülediği çentikten geçer. [[K5 s. 174]] Supraspinatus ile infraspinatusa derin yüzlerinden motor dallar, omuz eklemine duyu dalı verir. [[K5 s. 174]]</dd></div>
    <div><dt>Subklavius siniri</dt><dd>Üst trunkusun bu küçük C5–C6 dalı pleksusun ve subklavyen arterin üçüncü bölümünün önünden, subklavyen venin arkasından iner. [[K5 s. 174]] Klavikulanın alt oluğundaki subklaviusa ulaşır ve bazen frenik sinire katkı verir. [[K5 s. 174]]</dd></div>
  </dl>
  <details class="an04c-okuma"><summary>Orta skalenin iki yüzünü düşünün</summary><p>Romboidlere giden C5 lifini izlerken önce kası delen noktayı, sonra levator skapulanın derin yüzünü arayın. [[K5 s. 174]] Aynı kasın içinden serratus anterior için de lifler geçer, fakat burada delici liflerin kökleri C5 ve C6’dır. [[K5 s. 174]] C7 katkısı varsa onu kasın ön yüzünde izlemek gerekir. [[K5 s. 174]]</p></details>
  <details class="an04c-okuma"><summary>Aynı trunkustan çıkan iki farklı yol</summary><p>Supraskapular siniri arkaya doğru takip ettiğinizde posterior üçgenden skapula çentiğine ve oradan iki kasın derin yüzüne ulaşırsınız. [[K5 s. 174]] Subklavius sinirini aşağı doğru takip ettiğinizde ise arterle ven arasındaki plandan klavikulanın alt oluğuna varırsınız. [[K5 s. 174]] Üst trunkusa kadar izlenebilen bu ikinci yol, frenik sinire katılabilecek ek lifler bakımından önemlidir. [[K5 s. 174]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an04c-kord">
  <h2>Pektoral kaslardan kol ve ön kol derisine</h2>
  <p class="intro">Pektoralis minörün alt kenarında lateral kord median sinire bir baş verir ve muskülokütanöz sinir olarak sürer. [[K5 s. 175]]</p>
  <div class="viz"><div data-viz="an04c_kord"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Lateral pektoral sinir · C5–C7</dt><dd>Lateral korddan çıkan bu sinirin hedefi pektoralis majördür. [[K5 s. 175]] Kasa ulaşmadan önce iki ilişki kurar, önce aksiller damarları çaprazlar, sonra klavipektoral fasyayı deler. [[K5 s. 175]] İnce bir dal damarların önünden medial pektoral sinire katılır ve böylece pektoralis minöre de lif taşır. [[K5 s. 175]]</dd></div>
    <div><dt>Klavipektoral fasya</dt><dd>Pektoralis minörü saran bu sağlam zar yukarıda klavikulaya uzanır ve subklaviusu kılıf içine alır. [[K5 s. 175]] Aksiller vene dökülen sefalik ven, aksiller arterin akromiyotorasik trunkusu ve lenf damarları da zarı deler. [[K5 s. 175]]</dd></div>
    <div><dt>Medial pektoral sinir · C8–T1</dt><dd>Aksilla tepesinde medial korddan çıkar, arterle ven arasından öne geçerken lateral pektoral dalı alır. [[K5 s. 175]] Damarlar arasından öne çıkan sinir pektoralis minörü deler ve o kasın motor innervasyonuna katılır. [[K5 s. 175]] Liflerin bir bölümü burada sonlanır, bir bölümü daha yüzeydeki pektoralis majöre kadar devam eder. [[K5 s. 175]]</dd></div>
    <div><dt>Muskülokütanöz sinir · C5–C7</dt><dd>Aksiller arterin lateralinden korakobrakiyal kasa ulaşır, önce kası uyarır, sonra deler. [[K5 s. 175]] Biseps ile brakiyalis arasında aşağı ve dışa ilerleyerek ikisine de dal verir, brakiyalis ayrıca radiyal sinirden lif alır. [[K5 s. 175]]</dd></div>
    <div><dt>Dirsekten sonra</dt><dd>Biseps tendonu ile brakiyoradiyalis arasından yüzeye çıkan sinir antekübital fossa derin fasyasını deler ve ön kolun lateral kutanöz siniri olur. [[K5 s. 175]] Ön dal anterolateral ön koldan tenar kabartının tabanına, arka dal posterolateral ön koldan bileğe ulaşır. [[K5 s. 175]]</dd></div>
    <div><dt>Hilton yasası</dt><dd>Muskülokütanöz sinirin ince dirsek dalı, bir eklemi hareket ettiren kasların, tutunma yerleri üzerindeki derinin ve eklem içinin ortak sinir kaynağını örnekler. [[K5 s. 175]]</dd></div>
    <div><dt>Kolun medial kutanöz siniri · C8–T1</dt><dd>Pleksusun en küçük dalı aksiller arterle ven arasında başlar, veni önden veya arkadan çaprazlar ve kolun medial yüzü boyunca ilerler, bu seyri izleyen tek sinirdir. [[K5 s. 175]] İkinci interkostal sinirin lateral kutanöz dalıyla (interkostobrakiyal sinir) bağlantı kurar, kol ortasında derin fasyayı deler ve dirseğe kadar uzanan distal medial kol derisinin duyusunu taşır. [[K5 s. 175]]</dd></div>
    <div><dt>Ön kolun medial kutanöz siniri · C8–T1</dt><dd>Aksiller damarlar arasından brakiyal arterin medialine geçer, kol ortasında derin fasyayı deler ve ikiye ayrılır. [[K5 s. 175–176]] Ön dal median kübital veni genellikle önden, bazen arkadan çaprazlayarak bileğe kadar anteromedial deriye dağılır. [[K5 s. 176]] Arka dal bazilik venin medialinden ön kolun arkasına geçer ve bileğe kadar posteromedial deriye duyu dalları verir. [[K5 s. 176]]</dd></div>
  </dl>
  <nav class="an04c-atlas" aria-label="Sinir Bloğu Atlası"><b>Sinir Bloğu Atlası</b>
    <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=pecs">PECS II</a>
    <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=aksiller">Aksiller</a>
    <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=infraklavikuler">İnfraklaviküler</a>
    <a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=serratus">Serratus</a>
  </nav>
  <details class="an04c-okuma"><summary>Kutanöz dalı damardan tanıyın</summary><p>Aksillada arterle ven arasında başlayan ince dalı kol ortasına kadar izleyin. [[K5 s. 175]] Bu dalın duyu alanı dirsekte sonlanır, oysa arterin medialinde inip ikiye ayrılan diğer dalın duyu alanı bileğe kadar uzanır. [[K5 s. 175–176]] İkincisinin ön dalını bulmak için antekübital fossada median kübital veni, arka dalını bulmak için bazilik venin medialini arayın. [[K5 s. 176]]</p></details>
  <details class="an04c-okuma"><summary>Kasla ilişkisi değişen sinir</summary><p>Muskülokütanöz sinirin korakobrakiyalisi deldiği yerden başlayın. [[K5 s. 175]] Siniri distale izlediğinizde iki kas karnının arasından bir kas ile bir tendonun arasına geçtiğini görürsünüz. [[K5 s. 175]] İlk aralık biseps ile brakiyalis, ikinci aralık brakiyoradiyalis ile biseps tendonu arasındadır. [[K5 s. 175]] İkinci aralıktan yüzeye çıkan lifler, lateral ön kolun hem ön hem arka yüzüne ulaşır. [[K5 s. 175]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an04c-ulnar">
  <h2>Ulnar sinir · medial epikondilden parmaklara</h2>
  <p class="intro">Medial kordun iki yolunu ayırın. Median sinire katılan lifler medial başı oluşturur, kordun devamı ise ulnar sinirdir. [[K5 s. 176–177]] Ulnar sinir genellikle C7, C8 ve T1 liflerini taşır, ancak olguların yaklaşık %15’inde C7 katkısı bulunmaz. [[K5 s. 176–177]]</p>
  <div class="viz"><div data-viz="an04c_ulnar"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Kol</dt><dd>Aksiller arterle ven arasından brakiyal arterin medialine geçer, korakobrakiyalisin tutunma düzeyinde medial intermüsküler septumu delerek arkaya döner. [[K5 s. 177]] Trisepsin medial başının önünde iner, medial epikondilin arkasında kemiğe karşı parmakla yuvarlanabilir. [[K5 s. 177]] Buradan fleksör karpi ulnarisin iki başı arasına girerken dirsek kapsülünün medial yüzüne yaslanır. [[K5 s. 177]]</dd></div>
    <div><dt>Pozisyon ve bası</dt><dd>Aksiller diseksiyonda veya meme cerrahisinde kolun gövdeden 90°’yi aşan abdüksiyonu ulnar ve median sinirleri gerebilir. [[K5 s. 177–178]] Kitap anestezi altında bu açının aşılmamasını ve abdüksiyonda gerilmeyi azaltmak için elin pronasyonda tutulmasını önerir. [[K5 s. 178]] Masa kenarı, sabitleme kayışı veya klips epikondil düzeyinde sinire basabilir. [[K5 s. 178]]</dd></div>
    <div><dt>Dirsekte damar ve uyarı</dt><dd>Brakiyal arterin ulnar kollateral dalı kolun arka kompartımanında ve dirsek arkasında sinire eşlik ederek dirsek anastomozuna katılır. [[K5 s. 178]] Kemik işaretleri blok ve nöromüsküler iletinin iğne elektrotla değerlendirilmesi için siniri bulmayı kolaylaştırır. [[K5 s. 178]] Epikondil çevresinde sinir içine veya yakınına enjeksiyonun nörit sıklığını artırabileceği düşünülür, kitapta çoğu anestezistin hedefi 1–3 cm daha proksimaldedir. [[K5 s. 178]]</dd></div>
    <div><dt>Ön kol</dt><dd>Üst kolda dal çıkmaz, dirseğin hemen altında fleksör karpi ulnaris ile derin parmak fleksörünün medial yarısına motor dallar ayrılır. [[K5 s. 178]] Derin fleksörün lateral yarısını median sinirin ön interosseöz dalı uyarır. [[K5 s. 178]] Sinir derin parmak fleksörünün üstünde, proksimalde fleksör karpi ulnarisin örtüsü altında ilerler, kasın tendonlaştığı distal kesimde yüzeyelleşir ve üzerini yalnız deri ile derin fasya örter. [[K5 s. 178]] K5’in ön kol seyri tarifinde kasın tendonlaşan kısmı sinirin lateralinde yer alır. [[K5 s. 178]] Arteri dirsekten distale doğru takip ederken sinire hangi taraftan yaklaştığına dikkat edin. [[K5 s. 178]] İkisi dirsekten yaklaşık bir el genişliği aşağıda buluşur, bu noktadan el bileğine kadar arter sinirin lateralindedir. [[K5 s. 178]]</dd></div>
    <div><dt>Guyon kanalı</dt><dd>Fleksör retinakulumu izlediğinizde ulnar siniri pisiformun hemen radiyalinde, retinakulumun üzerinde bulursunuz. [[K5 s. 178]] Bu noktada sinirle deri arasında retinakuluma ait birkaç yüzeyel lif vardır. [[K5 s. 178]] Guyon kanalını oluşturan bu liflerin altında ulnar sinir zaman zaman sıkışabilir. [[K5 s. 178]] Hamatın kancasını çaprazlarken kemiğe bastırılması künt ağrı doğurabilir, ardından yüzeyel ve derin terminal dallar ayrılır. [[K5 s. 178]] Dirsek ve bilek eklemleri de ulnar sinirden dal alır. [[K5 s. 178]]</dd></div>
    <div><dt>Olağan deri alanı</dt><dd>Elin medial kenarıyla medial bir buçuk parmağın hem avuç hem sırt tarafının duyusu ulnar sinirle taşınır. [[K5 s. 178]] Aynı parmakta proksimal dorsal deri ile tırnak yatağına farklı dallar ulaşır. [[K5 s. 179–180]]</dd></div>
    <div><dt>Palmar kutanöz dal</dt><dd>Ön kol ortasında ayrılır, ulnar arterin önünde iner, bileğin proksimalinde derin fasyayı deler ve retinakulumu aşarak hipotenar deriye ulaşır. [[K5 s. 178–179]]</dd></div>
    <div><dt>Dorsal dal</dt><dd>Bilek çizgisinin 5,0–7,5 cm üstünde ayrılır, fleksör karpi ulnaris tendonunun altından arkaya geçer ve bilek proksimalinde fasyayı delerek el sırtının ulnar kenarına ulaşır. [[K5 s. 179]] İlk dijital dal serçe parmağın ulnar yüzüne, metakarp başında çatallanan ikinci dal yüzük ve serçe parmakların birbirine bakan dorsal yüzlerine gider. [[K5 s. 179]] Bazen üçüncü dal orta ve yüzük parmaklarının komşu yüzlerine uzanarak radiyal sinirin alanına girer. [[K5 s. 179]]</dd></div>
    <div><dt>Tırnak yatağı</dt><dd>Dorsal dijital dallar distal falanks sırtına erişmez, buraya palmar dijital sinirlerin kollateralleri ulaşır. [[K5 s. 179]] Serçe parmak ve yüzük parmağının ulnar yarısında kaynak ulnar, yüzük parmağının radiyal yarısında mediandır. [[K5 s. 179]]</dd></div>
    <div><dt>Yüzeyel terminal dal</dt><dd>Palmaris brevise küçük bir motor dal verir, ardından palmar aponevroz altında iki duyusal dijital dala ayrılır. [[K5 s. 179–180]] Dallar yüzeyel palmar arkın dijital arterlerinden derinde ilerler, medial dal serçe parmağın ulnar kenarına, çatallanan lateral dal yüzük ve serçe parmakların komşu yüzlerine gider. [[K5 s. 180]]</dd></div>
    <div><dt>Parmak kesiti</dt><dd>Parmak boyunca dijital arter sinirin arkasında, sinir fleksör kılıfın yanında ve falanksın hemen önündedir. [[K5 s. 180]] Parmak yanından doğrudan kemiğe ilerleyen insizyon damar ve sinirden uzak kalır, dijital blok için tarif edilen yer falanksın anterolateral kenarının hemen önüdür. [[K5 s. 180]]</dd></div>
    <div><dt>Derin terminal dal</dt><dd>Ulnar arterin derin dalıyla birlikte hipotenara girer, küçük parmağın fleksör ve abdüktör kasları arasından geçip opponensini deler. [[K5 s. 180]] Derin palmar arkla avucu kat eden sinirin izdüşümü tam ekstansiyondaki başparmağın doğrultusundadır. [[K5 s. 180]] Üç hipotenar kası, iki medial lumbrikali, interosseözleri ve en sonda başparmak addüktörünü uyarır, küçük duyu dalı bilek eklemine gider. [[K5 s. 179–180]]</dd></div>
    <div><dt>Nöromüsküler izlem</dt><dd>El bileği ile avuç arasındaki çizgide pisiformun hemen radiyalinden uyarı, hipotenar kaslarda ve başparmak addüktöründe kasılma oluşturur. [[K5 s. 180]] Başparmak addüktörünün yanıtı nöromüsküler bloğun izlenmesinde kullanılır. [[K5 s. 180]]</dd></div>
  </dl>
  <details class="an04c-okuma"><summary>Serçe parmağın üç yüzünü ayırın</summary><p>Avuç tarafında parmağın ulnar kenarını yüzeyel terminal dalın medial dijital siniri, yüzük parmağına bakan kenarını ise lateral dijital sinirin bir kolu innerve eder. [[K5 s. 180]] Parmağı sırta çevirince proksimalde ulnar sinirin ön kolda ayrılmış dorsal dalının iki ayrı dijital dalıyla karşılaşırsınız. [[K5 s. 179]] Tırnak yatağına ilerleyince kaynak yeniden değişir, buraya avuç tarafından dönen kollateral lifler ulaşır. [[K5 s. 179–180]]</p></details>
  <details class="an04c-okuma"><summary>Aynı kesitte damar ve sinir</summary><p>Avuçta yüzeyel palmar arktan çıkan dijital arter dalının derininde dijital siniri arayın. [[K5 s. 180]] Parmağın yanındaki enine kesitte ise falanksı ve fleksör tendonları içeren kılıfı bulun, sinir kılıfın yanında ve kemiğin hemen önündedir. [[K5 s. 180]] Kemiğe doğrudan yandan ilerleyen bir kesi, hem sinirin hem de parmak boyunca sinirin arkasında seyreden dijital arterin uzağında kalır. [[K5 s. 180]] Buna karşılık dijital siniri hedefleyen tarifte esas alınan işaret falanksın tam yanı değil, anterolateral kenarının hemen önüdür. [[K5 s. 180]]</p></details>
  <details class="an04c-okuma"><summary>Pisiformdan avuca</summary><p>Pisiform yanında uyarılan bir sinirden başparmak yanıtı alınmasını, derin terminal dalın seyri açıklar. [[K5 s. 178–180]] Dalın avuca girişi küçük parmak tarafındadır, fakat uzanımı tam ekstansiyondaki başparmağın çizgisini izler ve en son başparmak addüktörüne ulaşır. [[K5 s. 180]] Böylece aynı uyarıyla hem hipotenar kaslarda hem de avucun karşı tarafındaki addüktörde kasılma gözlenebilir. [[K5 s. 180]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an04c-median">
  <h2>Median sinir · arter çaprazından karpal tünele</h2>
  <p class="intro">Aksiller arterin üçüncü bölümünün önünde birleşen lateral (C5–C7) ve medial (C8–T1) başlar, median sinire pleksusun bütün köklerinden lif taşır. [[K5 s. 181]]</p>
  <div class="viz"><div data-viz="an04c_median"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Brakiyal arterle seyir</dt><dd>Sinir kolda önce arterin lateralinde, sonra medialindedir, çaprazlaşma korakobrakiyalisin tutunduğu kol orta düzeyindedir. [[K5 s. 181]] Arteri önden geçişin arkadan geçişe oranı 7:1’dir, seyrek görülen yüksek bifürkasyonda sinir radiyal ve ulnar arterlerin başlangıçları arasından geçer. [[K5 s. 181]]</dd></div>
    <div><dt>Kol ortasında altı komşuluk</dt><dd>Medialde korakobrakiyalis, lateralde deltoidin en alt lifleri humerusa tutunur, derin brakiyal arterden gelen besleyici arter kemiğe girer. [[K5 s. 181]] Bazilik ven yukarı, ön kolun medial kutanöz siniri aşağı giderken derin fasyayı deler, ulnar sinir kollateral arteriyle medial septumdan arkaya geçer. [[K5 s. 181]]</dd></div>
    <div><dt>Dirsek</dt><dd>Median sinir brakiyalis üzerinde, bisipital aponevroz ve median kübital venin derininde dirseğin önünü geçer. [[K5 s. 181]] Pronator teresin iki başı arasındayken derin ulnar baş onu ulnar arterden ayırır. [[K5 s. 181]] Arter, ön kolun distal üçte ikisinde ulnar sinire eşlik etmek üzere median sinirin derininden lateralden mediale geçer. [[K5 s. 181]]</dd></div>
    <div><dt>Ön kol</dt><dd>Median sinir yüzeyel ve derin parmak fleksörlerinin kas karınları arasında iner, yüzeyel fleksörün arka yüzüne sıkı tutunması cerrahide tanınmasını kolaylaştırır. [[K5 s. 181]] Yanındaki ince damar ulnar arterin ön interosseöz dalından çıkan median daldır. [[K5 s. 181]] Yüzeyel fleksör tendonlaştığında sinirin üzerinde deri ve derin fasya kalır. [[K5 s. 181]]</dd></div>
    <div><dt>Bilek çizgisi</dt><dd>Fleksör karpi radiyalis tendonu lateralde, yüzeyel parmak fleksörü ile palmaris longus tendonları medialdedir, palmaris longus sinirin üzerine uzanır. [[K5 s. 181]] Palmaris longus bulunmayabilir. [[K5 s. 182]] Uzatılmış orta parmaktan proksimale çizilen hat bilek kıvrımının orta noktasındaki siniri gösterir. [[K5 s. 181]]</dd></div>
    <div><dt>Karpal tünel</dt><dd>Ön koldan avuca geçen lifler karpal tünelde hâlâ tek bir ana gövde içindedir. [[K5 s. 181]] Sinir tünelin tavanındaki fleksör retinakuluma çok yakın seyreder ve bu dar geçitte kolayca sıkışabilir. [[K5 s. 181]] İki terminal dalı görmek için bakışınızı tünelin çıkışına taşıyın, medial ve lateral terminal dallar retinakulumun hemen distalinde ayrılır. [[K5 s. 181–182]]</dd></div>
    <div><dt>Kas ve eklem dalları</dt><dd>Pronator teres dalı genellikle dirsek üstünde ayrılır ve median sinirin ön koldan önce verdiği tek daldır. [[K5 s. 183]] Ön kolda dirseğe en yakın motor dalları izlediğinizde üç kasla karşılaşırsınız. [[K5 s. 182–183]] Bunlar fleksör karpi radiyalis, palmaris longus ve yüzeyel parmak fleksörüdür, dalları dirseğin hemen distalinde ayrılır. [[K5 s. 183]] Eklem duyusuna giden lifleri de hesaba katın, hem dirsek hem de el bileği eklemi median sinirden dal alır. [[K5 s. 182–183]] Deri dalları tenar kabartıya, radiyal üç parmağın ön yüzüne ve bu parmakların distal falankslarının dorsal derisine gider. [[K5 s. 183]]</dd></div>
    <div><dt>Ön interosseöz sinir</dt><dd>Median sinir pronator teres başları arasından çıkarken ayrılır, aynı adlı arterle radius ve ulna arasındaki membranın ön yüzünden iner. [[K5 s. 183]] Uzun başparmak fleksörünü, derin parmak fleksörünün radiyal yarısını ve pronator kuadratusu uyarır, bilek eklemine giden dal olarak sonlanır. [[K5 s. 182–183]]</dd></div>
    <div><dt>Palmar kutanöz dal</dt><dd>Distal ön kolda ayrılır, bileğin hemen üzerinde derin fasyayı deler ve retinakulumun yüzeyinden geçer. [[K5 s. 183]] Lateral dal tenar deriye, medial dal avuç derisine dağılır. [[K5 s. 183]]</dd></div>
    <div><dt>Retinakulum yüzeyindeki beş yapı</dt><dd>Palmaris longus, eşlikçi venleriyle ulnar arter, ulnar sinir ve hem ulnar hem median sinirin palmar kutanöz dalları bu düzlemdedir. [[K5 s. 184]]</dd></div>
    <div><dt>Lateral terminal dal</dt><dd>Distal bilek çizgisinden 3 cm ötede, retinakulumun hemen distalinde kısa ve kalın tenar dal ayrılır. [[K5 s. 184]] Kısa başparmak abdüktörü, opponensi ve kısa fleksörüne giden bu dalı yalnız ince tenar fasya örter, kazara veya cerrahi kesiyle yaralanabilir. [[K5 s. 184]] Üç palmar dijital dal başparmağın iki yanına ve işaret parmağının radiyal yanına gider, sonuncusu birinci lumbrikali de uyarır. [[K5 s. 184]]</dd></div>
    <div><dt>Medial terminal dal</dt><dd>Medial terminal daldan ayrılan iki palmar dijital siniri avuçtan parmak aralıklarına doğru izleyin. [[K5 s. 184]] İki sinir de kendi parmak aralığında çatallanır. [[K5 s. 184]] Birincinin lifleri işaret ve orta parmakların, ikincinin lifleri orta ve yüzük parmaklarının birbirine bakan yüzlerine dağılır. [[K5 s. 184]] Daha lateraldeki sinir ikinci lumbrikali de uyarır. [[K5 s. 184]] Dijital dalların kollateralleri ilgili distal falanksların dorsal derisine ulaşır ve dijital arterlerle komşulukları ulnar dallardaki gibidir. [[K5 s. 183–184]]</dd></div>
  </dl>
  <details class="an04c-okuma"><summary>Üç arter ilişkisini yerleştirin</summary><p>Aksillada iki başın birleşme yerini arıyorsanız üçüncü bölümün önüne bakın. [[K5 s. 181]] Kol ortasında tek gövdeyi arıyorsanız brakiyal arteri hangi yönden çaprazladığını değerlendirin, iki olasılıktan sık olanı önden geçiştir. [[K5 s. 181]] Dirseğin distalinde ise çaprazlayan yapı ulnar arterdir, derin pronator başının ötesinde sinirin derininden mediale ilerler. [[K5 s. 181]]</p></details>
  <details class="an04c-okuma"><summary>Tenar bölgede duyu ve hareket</summary><p>Tenar deriye giden lifler ön kolda ana gövdeden ayrılır ve retinakulumun üzerinden geçer. [[K5 s. 183]] Aynı bölgedeki kısa abdüktör, opponens ve kısa fleksöre giden lifler ise ana gövdeyle tünelden geçtikten sonra lateral terminal daldan ayrılır. [[K5 s. 181–184]] Avuçta kısa bir kesi değerlendirilirken motor dalın yüzeye ne kadar yakın olduğu önemlidir, dal ile yüzey arasında yalnızca ince tenar fasya vardır. [[K5 s. 184]]</p></details>
  <details class="an04c-okuma"><summary>İki lumbrikal için iki ayrı yol</summary><p>İşaret parmağının radiyal kenarına giden palmar dijital siniri proksimale izlediğinizde lateral terminal dala ulaşırsınız, birinci lumbrikal de bu yoldan lif alır. [[K5 s. 184]] İkinci lumbrikalin lifleri ise medial terminal dalın iki dijital sinirinden daha lateralde olanıyla gelir. [[K5 s. 184]] Bu iki kas, eldeki olağan motor dağılımda ulnar sinirin innerve ettiği medial iki lumbrikali tamamlar. [[K5 s. 178]] [[K5 s. 180]] [[K5 s. 184]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an04c-arka">
  <h2>Posterior kord ve aksiller sinir</h2>
  <p class="intro">Posterior kord üst ve alt subskapular sinirlerle torakodorsal siniri verdikten sonra pektoralis minörün hemen ötesinde aksiller ve radiyal sinirlere ayrılır. [[K5 s. 184]]</p>
  <div class="viz"><div data-viz="an04c_arka"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Subskapular sinirler · C5–C6</dt><dd>Her iki dal arkaya yönelerek subskapularise girer, alt dal ayrıca teres majörü uyarır. [[K5 s. 184]]</dd></div>
    <div><dt>Torakodorsal sinir · C6–C8</dt><dd>İki subskapular sinir arasından çıkar, aksillanın arka duvarında subskapular damarlarla birlikte latissimus dorsi kasına ulaşır. [[K5 s. 184]]</dd></div>
    <div><dt>Aksiller sinir · C5–C6</dt><dd>Aksiller arterin arkasından ve subskapularisin önünden laterale yönelir, kasın alt kenarında dörtgen aralıktan arkaya geçer. [[K5 s. 184]] Aksiller damarların posterior sirkumfleks humeral dalları da bu geçidi kullanır. [[K5 s. 184]]</dd></div>
    <div><dt>Dörtgen aralık</dt><dd>Üst sınırı subskapularis ve teres minör, alt sınırı teres majör oluşturur. [[K5 s. 184]] Medialde trisepsin uzun başı, lateralde humerusun cerrahi boynu yer alır. [[K5 s. 184]]</dd></div>
    <div><dt>Ön bölüm</dt><dd>Aksiller sinir daha ikiye ayrılmadan omuz eklemine bir dal gönderir. [[K5 s. 184]] Ayrımdan sonra ön bölümü akromiyondan yaklaşık bir el genişliği aşağıda, humerusun cerrahi boynunu dolanırken izleyebilirsiniz. [[K5 s. 184]] Buradan deltoidin derin yüzüne ulaşan lifler kasın motor innervasyonuna katılır. [[K5 s. 184–185]] Birkaç ince lif deltoidi delerek üzerindeki deriye çıkar. [[K5 s. 185]]</dd></div>
    <div><dt>Arka bölüm</dt><dd>Daha büyük olan bu bölüm teres minöre ve deltoidin arka kısmına dal verir, teres minör dalı üzerinde bir psödoganglion görülebilir. [[K5 s. 184–185]] Deltoidin arka kenarını dolanan devamı kolun üst lateral kutanöz siniridir ve deltoidin arka yüzünün alt üçte ikisini örten deriye dağılır. [[K5 s. 185]]</dd></div>
    <div><dt>Keside bulgu</dt><dd>Komşu duyu alanlarının örtüşmesi nedeniyle belirgin anestezi lateral deltoid üzerindeki küçük “çavuş yaması” ile sınırlıdır. [[K5 s. 185]] Deltoid paralizisi kol abdüksiyonunu zayıflatır. [[K5 s. 185]]</dd></div>
  </dl>
  <details class="an04c-okuma"><summary>Geçidi iki yönden okuyun</summary><p>Önden bakıldığında aksiller siniri arterin arkasında ve subskapularis kasının önünde arayın. [[K5 s. 184]] Arkadan bakıldığında ise aynı siniri, teres minörün altında ve teres majörün üstünde damarlarla birlikte bulun. [[K5 s. 184]] Cerrahi boyuna doğru ilerletilen iz, aralığın lateral kenarından deltoidin derin yüzüne uzanan ön bölümü gösterir. [[K5 s. 184–185]]</p></details>
  <details class="an04c-okuma"><summary>Kas alanı ile duyu kaybının büyüklüğü</summary><p>Arka bölüm deltoidin arka kısmına motor lif verir ve aynı kasın kenarından dönüp deri dalı olarak sürer. [[K5 s. 185]] Deri dalının anatomik dağılımı, tek başına sinir kesildiğinde belirgin duyu kaybı kalan alandan geniştir. [[K5 s. 185]] Bu nedenle muayenede küçük bir lateral duyu kaybıyla birlikte kol abdüksiyonunda zayıflık bulunması aynı sinirle açıklanabilir. [[K5 s. 185]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an04c-radial">
  <h2>Radiyal sinir · spiral oluk ve iki terminal dal</h2>
  <p class="intro">Bütün pleksus köklerinden (C5–T1) lif alan radiyal sinir, humerusun arkasını dolanır ve lateral epikondilin önünde iki terminal dala ayrılır. [[K5 s. 185–186]]</p>
  <div class="viz"><div data-viz="an04c_radial"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Aksilla</dt><dd>Aksiller arterin üçüncü bölümünün arkasından sırasıyla subskapularis, teres majör ve latissimus dorsiyi çaprazlar. [[K5 s. 185]] Son kasın parlak tutunma tendonu aksilla diseksiyonunda siniri tanımayı kolaylaştırır. [[K5 s. 185]]</dd></div>
    <div><dt>Spiral oluk</dt><dd>Trisepsin uzun ve medial başları arasından derin brakiyal damarlarla arka kompartımana girer, humerusun arkasında oblik olarak aşağı iner. [[K5 s. 185]] Üzerinde önce uzun, sonra lateral baş, derininde ise medial baş bulunur. [[K5 s. 185–186]]</dd></div>
    <div><dt>Öne dönüş</dt><dd>Dirseğin bir el genişliği üzerinde humerusun lateral kenarına varır ve lateral intermüsküler septumu delerek brakiyalis ile brakiyoradiyalis arasına girer. [[K5 s. 186]] Kola çok distalde yerleştirilen arteriyel turnike bu düzeyde bası yaralanmasına yol açabilir. [[K5 s. 186]]</dd></div>
    <div><dt>Kas dalları</dt><dd>Aksillada çıkan medial grup trisepsin uzun ve medial başlarına, spiral oluktaki arka grup medial ve lateral başlarla ankoneusa gider. [[K5 s. 187]] Lateral gruptaki kasları izlerken brakiyoradiyalisi ve uzun radiyal el bileği ekstansörünü bulun. [[K5 s. 187]] Bu grubun bir başka hedefi brakiyalistir. [[K5 s. 187]] Brakiyalisin innervasyonunu tek sinire bağlamayın, bu kas hem muskülokütanöz hem de radiyal sinirden motor lifler alır. [[K5 s. 187]] Dirseğe eklem dalları da gider. [[K5 s. 187]]</dd></div>
    <div><dt>Humerusa değen dört sinir</dt><dd>Aksiller, radiyal ve ulnar sinirler üst ekstremite travmasında sık etkilenebilir, ankoneus dalının kemikle teması ise pratikte önem taşımaz. [[K5 s. 187]] Ankoneus dalı kasa girmeden hemen önce humerus cisminin distal arka yüzüne değer. [[K5 s. 187]]</dd></div>
    <div><dt>Üç deri dalı</dt><dd>Kolun arka kutanöz siniri aksillada ayrılır ve arka kolun proksimal üçte birine dağılır. [[K5 s. 187]] Ön kolun arka kutanöz siniri spiral oluktan çıkar, triseps lateral başını deler ve lateralden bileğe inerek posterolateral ön kol derisine dağılır. [[K5 s. 187]] Bundan çıkan kolun alt lateral kutanöz siniri de lateral başı deler ve dirseğin hemen üzerindeki lateral kol derisine dağılır. [[K5 s. 187]]</dd></div>
    <div><dt>Arka interosseöz dal</dt><dd>Terminal ayrımdan sonra supinatöre girer, kas içinde radius cisminin lateralini dolanıp arka kompartımana ulaşır. [[K5 s. 187]] İnce eklem dalları dışında motordur, arka interosseöz membran üzerinde bileğe kadar inen ince bir eklem dalı vardır. [[K5 s. 187]]</dd></div>
    <div><dt>Supinatörden önce ve sonra</dt><dd>Kasa girmeden supinatör ve kısa radiyal el bileği ekstansörüne dallar verir. [[K5 s. 187]] Çıkışta parmak ekstansörü, küçük parmak ekstansörü, ulnar el bileği ekstansörü, başparmağın uzun ve kısa ekstansörleri, işaret parmağı ekstansörü ve uzun başparmak abdüktörünü uyarır. [[K5 s. 187]]</dd></div>
    <div><dt>Yüzeyel radiyal dal</dt><dd>Tamamen duyusaldır, brakiyoradiyalis altında radiyal arterin radiyal tarafını izler. [[K5 s. 188]] Bilekten yaklaşık 7,5 cm önce kasın altından arkaya döner ve dorsal dijital dallarına ayrılır. [[K5 s. 188]] Başparmak tabanının sırtı, el sırtının radiyal kesimi ve başparmaktan yüzük parmağının radiyal yarısına kadar parmak sırtları distal interfalangeal eklemler düzeyine dek bu dallardan duyu alır. [[K5 s. 188]]</dd></div>
  </dl>
  <details class="an04c-okuma"><summary>Oluktan önce mi, sonra mı?</summary><p>Trisepsin medial başına giden dalları sayarken iki düzey düşünün, bir dal grubu aksilladan, diğeri spiral oluktan gelir. [[K5 s. 187]] Uzun baş aksilladan, lateral baş ise spiral oluktan lif alır. [[K5 s. 187]] Dirseğe yaklaşınca siniri artık trisepsin içinde aramayın, lateral septumu geçen gövde brakiyalis ile brakiyoradiyalis arasına ulaşmıştır. [[K5 s. 186]]</p></details>
  <details class="an04c-okuma"><summary>İki terminal dalı birlikte izleyin</summary><p>Lateral epikondilin önünde derine yönelen dal supinatörün içine girer, radiusun dış yanını dolanır ve ön kol ekstansörlerine ulaşır. [[K5 s. 186–187]] Bileğe kadar uzanan ince eklem dalı, arka interosseöz sinirin işlevi tarif edilirken korunması gereken istisnadır. [[K5 s. 187]] Yüzeyel dalı izlediğinizde ise brakiyoradiyalis altında radiyal arterle birlikte distale inersiniz, el sırtına geçiş ancak bileğe yaklaşınca olur. [[K5 s. 188]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an04c-bilek">
  <h2>Distal bloklar ve elde değişken dağılım</h2>
  <p class="intro">Dirsek veya bilekte terminal sinir bloğu, pleksus bloğundan sonra duyusu korunmuş bir alanı tamamlayabilir, ancak etkisi pleksus bloğundan daha kısa sürer. [[K5 s. 189]]</p>
  <div class="viz"><div data-viz="an04c_bilek"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Kullanım</dt><dd>Ulnar, median ve radiyal sinir blokları el cerrahisinde anestezi veya pansuman değişiminde analjezi için de kullanılabilir. [[K5 s. 189]]</dd></div>
    <div><dt>Dirsek işaretleri</dt><dd>Üç sinir stimülatörle belirlenebilir, ulnar hedef sinirin medial epikondili arkadan döndüğü yerin 1–3 cm kraniyalindedir. [[K5 s. 189]] Median sinir brakiyal arterin hemen medialinde, radiyal sinir biseps tendonunun yaklaşık 2 cm lateralindedir. [[K5 s. 189]] Biseps tendonu ile lateral epikondil arasındaki deri altı infiltrasyonu muskülokütanöz sinirin kutanöz dallarını bloke edebilir. [[K5 s. 189]]</dd></div>
    <div><dt>Bilekte ulnar sinir</dt><dd>Kitap fleksör karpi ulnaris tendonunun hemen lateralinden veya hemen arkasından yaklaşımı tarif eder. [[K5 s. 189]] Pisiform, hem blok hem de nöromüsküler iletinin değerlendirilmesi için elle bulunabilen kemik işaretidir. [[K5 s. 178]] El bileği çizgisinde bu kemiğin hemen radiyaline geçtiğinizde ulnar sinirin izdüşümüne ulaşırsınız. [[K5 s. 180]]</dd></div>
    <div><dt>Bilekte median sinir</dt><dd>Distal transvers deri kıvrımının orta noktasında, retinakulumun proksimalinde ve palmaris longus tendonunun lateralinde tarif edilir. [[K5 s. 182]] Tendon varsa fleksör karpi radiyalis ile palmaris longus arasındaki aralık kullanılır. [[K5 s. 189]]</dd></div>
    <div><dt>Bilekte radiyal dallar</dt><dd>Başparmak tabanında deri altı infiltrasyonu radiyal sinirin kutanöz dallarını kapsar. [[K5 s. 189]]</dd></div>
    <div><dt>Kitabın dönemindeki uygulama</dt><dd>Kalın, kısa eğimli stimülasyon iğnesinin bilekte siniri zedeleyebileceği kaygısıyla, o dönemde çoğu anestezist 60° eğimli 27 G hipodermik iğneyle parestezi arıyordu. [[K5 s. 189]]</dd></div>
    <div><dt>Motor varyasyon</dt><dd>Alışılmış düzende median sinir üç tenar kası ve iki lateral lumbrikali, ulnar sinir diğer intrinsik kasları uyarır. [[K5 s. 178]] [[K5 s. 182]] Ulnar sinir tenar kasların bir kısmını veya hepsini üstlenebilir, median sinir başparmak addüktörüne ve birinci dorsal interosseöze de lif verebilir. [[K5 s. 188]] Radiyal sinir intrinsik el kaslarını hiçbir zaman uyarmaz. [[K5 s. 188]]</dd></div>
    <div><dt>Duyu varyasyonu</dt><dd>El sırtında radiyal ve ulnar alanların sınırı her iki yönde kayabilir, bazen ulnar alan tümüyle kaybolur. [[K5 s. 188]] Avuç tarafında ulnar alan yüzük parmağının tamamına, hatta orta parmağın ulnar yanına ulaşabilir ya da tek başına serçe parmakla sınırlanabilir. [[K5 s. 188]]</dd></div>
  </dl>
  <details class="an04c-okuma"><summary>Damar, tendon veya kemik?</summary><p>Dirsekte median siniri ararken brakiyal arteri, radiyal siniri ararken biseps tendonunu esas alın. [[K5 s. 189]] Ulnar sinirin dirsekteki ve bilekteki iki işareti ise kemiktir, bir uçta medial epikondil ve diğer uçta pisiform bulunur. [[K5 s. 178]] [[K5 s. 180]] Üçünün birden bilekte değerlendirilmesi gerektiğinde median sinirin orta hat izdüşümünü, ulnar sinirin fleksör karpi ulnaris komşuluğunu ve radiyal dalların başparmak tabanındaki dağılımını ayrı ayrı tarif edin. [[K5 s. 181–182]] [[K5 s. 189]]</p></details>
  <details class="an04c-okuma"><summary>Hangi dağılım değişebilir?</summary><p>Bir elde yüzük parmağının tamamından ulnar duyu alınması palmar dağılımdaki değişkenliğe uyar, başka bir elde aynı sinirin palmar alanı yalnız serçe parmağa sınırlanabilir. [[K5 s. 188]] El sırtında ulnar ve radiyal alanlar arasındaki sınır da yer değiştirebilir. [[K5 s. 188]] Motor değerlendirmede soru farklıdır, tenar kaslara median ve ulnar katkı değişse de intrinsik kaslar için radiyal sinir katkısı beklenmez. [[K5 s. 188]]</p></details>
</section>

<section class="wrap blk ders-sec" id="an04c-segment">
  <h2>Bir parmak, iki harita · dermatom ve periferik sinir</h2>
  <p class="intro">Serçe parmak duyusunu periferik sinir düzeyinde ulnar sinir, segment düzeyinde C8 ile eşleştirin. [[K5 s. 178–179]] [[K5 s. 190]]</p>
  <div class="viz"><div data-viz="an04c_segment"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an04c-dallar">
    <div><dt>Deri haritasını okuyun</dt><dd>Üst omuz derisi supraklaviküler sinirlerle C3–C4’ten, deltoid bölge ve lateral kol C5’ten duyu alır. [[K5 s. 190]] Lateral ön kol ve başparmak C6, el ve ortadaki üç parmak C7 alanındadır. [[K5 s. 190]]</dd></div>
    <div><dt>Medial kenarı izleyin</dt><dd>C8 serçe parmağı, medial eli ve distal ön kolun medialini kapsar. [[K5 s. 190]] T1 distal kol ile proksimal ön kolun medialinde, T2 interkostobrakiyal sinir aracılığıyla proksimal kolun medialindedir. [[K5 s. 190]]</dd></div>
    <div><dt>Tek kök bloğunu yorumlayın</dt><dd>Haritadaki her noktayı geniş bir deri alanının örneği olarak okuyun, komşu köklerin kutanöz alanları geniş ölçüde örtüşür. [[K5 s. 190]] Bu örtüşme klinik yanıtın yorumunu değiştirir. [[K5 s. 190]] Yalnız bir sinir kökü bloke edildiğinde, ameliyat sonrasında o kökle eşleşen bütün alanda belirgin anestezi görülmesi beklenmez. [[K5 s. 190]]</dd></div>
    <div><dt>Omuz hareketleri</dt><dd>Abdüksiyon ve dış rotasyon C5, addüksiyon ve iç rotasyon C6–C8 ile ilişkilidir. [[K5 s. 190]]</dd></div>
    <div><dt>Dirsek ve ön kol</dt><dd>Dirsek fleksörleri C5–C6, ekstansörleri C7–C8’den lif alır, ön kolun pronasyon ve supinasyonunda C6 öne çıkar. [[K5 s. 190]]</dd></div>
    <div><dt>Bilek ve parmaklar</dt><dd>Bileğin uzun fleksör ve ekstansörleri C6–C7, parmakların uzun fleksör ve ekstansörleri C7–C8, elin intrinsik kasları T1 ile eşleşir. [[K5 s. 190]]</dd></div>
  </dl>
  <details class="an04c-okuma"><summary>Omuzdan ele hareketle ilerleyin</summary><p>Omuz abdüksiyonunu ve dış rotasyonu aynı kökle, C5 ile eşleştirin. [[K5 s. 190]] Omuz addüksiyonu ile iç rotasyona geçerken artık üç kökü, C6, C7 ve C8’i birlikte düşünün. [[K5 s. 190]] Dirsekte fleksiyondan ekstansiyona geçişte ise eşleşme üstteki C5–C6 çiftinden alttaki C7–C8 çiftine kayar. [[K5 s. 190]] Ön kolu kendi ekseni etrafında çevirdiğinizde hem pronasyon hem supinasyon için verilen segment C6’dır. [[K5 s. 190]]</p></details>
  <details class="an04c-okuma"><summary>Aynı parmakta iki ayrı soru</summary><p>Serçe parmakta bir duyu bulgusunu tarif ederken önce hangi yüzü ve distal falanksın etkilenip etkilenmediğini belirtin. [[K5 s. 179–180]] Bu ayrıntı periferik dalı ayırt etmeye yardım eder, çünkü parmak sırtına giden dorsal dal tırnak yatağına kadar ulaşmaz. [[K5 s. 179]] Segment sorulduğunda aynı parmağı C8 ile, medial ön kolun proksimalini ise T1 ile ilişkilendirin. [[K5 s. 190]] Hareket sorulduğunda uzun parmak fleksör ve ekstansörleri için C7–C8, intrinsik el kasları için T1 yanıtı verilir. [[K5 s. 190]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an04c-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önermeyi ayrı değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="an04c-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an04c-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an04c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an04c-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><b>Açılış sorusu</b><p>Pleksus bloğundan sonra hastanın serçe parmağında duyu sürüyor. Bu alanı hangi terminal sinirle ilişkilendirirsiniz? Siniri dirsekte ve bilekte nasıl bulursunuz?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Serçe parmak ulnar alandadır, tırnak yatağına da palmar dijital kollateral ulaşır. [[K5 s. 179–180]]</li>
    <li>Dirsekte sinir medial epikondilin arkasındadır, kitap blok için bu geçişin 1–3 cm proksimalini tarif eder. [[K5 s. 178]] [[K5 s. 189]]</li>
    <li>Bilekte pisiformu palpe edin, sinir hemen radiyalinde, ulnar arter ise sinirin lateralindedir. [[K5 s. 178]] [[K5 s. 180]]</li>
    <li>Bilekte uyarıyla başparmak addüktörü ve hipotenar kasların yanıtı gözlenebilir. [[K5 s. 180]]</li>
    <li>Segment olarak C8 serçe parmak yanında distal ön kolun medialini de içerir, tek kök bloğunun etkisini komşu dermatomların örtüşmesi sınırlar. [[K5 s. 190]]</li>
  </ol>
  <p class="note"><b>Çizin.</b> Bileğin palmar yüzünde pisiformu, ulnar siniri ve arteri yerleştirin. Retinakulumun derininden geçen median siniri ekleyin. [[K5 s. 178]] [[K5 s. 181]]</p>
  <p class="note plain"><b>Ek sorular.</b> Ulnar sinirin dorsal dalı bileğin ne kadar proksimalinde ayrılır? Tenar deriye giden median dal tünelle nasıl ilişkilidir? Hangi sinir intrinsik el kaslarına hiç lif vermez?</p>
</section>
<section class="wrap blk ders-sec" id="an04c-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Supraskapular sinir iki skapular kas ve omuz eklemine, aksiller sinir deltoid ve teres minörle birlikte omuz eklemine dal verir. [[K5 s. 174]] [[K5 s. 184–185]]</li>
    <li>Dirsekte ulnar sinirin işareti medial epikondil, median sinirinki brakiyal arter, radiyal sinirinki biseps tendonudur. [[K5 s. 189]]</li>
    <li>Bilekte median sinir retinakulumun derininden, ulnar sinir ve median palmar kutanöz dal yüzeyinden geçer. [[K5 s. 181]] [[K5 s. 183–184]]</li>
    <li>Başparmak, ortadaki üç parmak ve serçe parmak sırasıyla C6, C7 ve C8 ile eşleşir, intrinsik kasların segmenti T1’dir. [[K5 s. 190]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="04c"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/04b">← Brakiyal pleksus: oluşum, komşuluk ve blok yaklaşımları</a><a href="#/dersler/anatomi/04d">Sonraki: Torakal sinirler ve lomber pleksus →</a></nav>
</section>`,
};
