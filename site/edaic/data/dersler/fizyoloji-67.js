/* Fizyoloji Bölüm 67 · Böbrek işlevi, anatomisi ve kan akımı (K1 İngilizce baskı s. 307–312).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz67-1'] = {
  no: 1, kok: 'Böbreğin işlevleri ve anatomisi için:', kagit: 'Paper A · fizyoloji, Bölüm 67', kaynak: '[[K1 s. 307–308]]',
  onermeler: [
    { t: 'Sağ renal arter soldakinden kısadır, çünkü aorta orta hattın biraz solundadır.', d: false, n: 'Yanlış. Aorta orta hattın solunda olduğundan sağ renal arter daha uzundur; IVC sağda olduğu için de sol renal ven daha uzundur. [[K1 s. 307]]' },
    { t: 'Böbrek önemli bir glukoneogenez organıdır.', d: true, n: 'Doğru. Kitap glukoneogenezi kan bileşiminin homeostazı başlığında sayar. [[K1 s. 307]]' },
    { t: 'Her böbrekte yaklaşık 100 000 nefron bulunur.', d: false, n: 'Yanlış. Her böbrekte yaklaşık 1 000 000 nefron vardır. [[K1 s. 307]]' },
    { t: 'Vasa recta efferent arteriyollerden çıkar ve medullayı besler.', d: true, n: 'Doğru. Henle kulpuyla ters yönde akan bu damarlar karşı akım düzeni oluşturur. [[K1 s. 308]]' },
    { t: 'Makula densa hücreleri afferent arteriyolün duvarında yer alır ve renin salgılar.', d: false, n: 'Yanlış. Renini afferent arteriyol duvarındaki granüler hücreler salgılar; makula densa, DCT ile kalın çıkan kolun birleşim yerinde tübüler Na⁺ ve Cl⁻ derişimini algılar. [[K1 s. 308]]' },
  ],
};
VERI.sorular['fiz67-2'] = {
  no: 2, kok: 'Renal kan akımı ve otoregülasyon için:', kagit: 'Paper A · fizyoloji, Bölüm 67', kaynak: '[[K1 s. 309–310]]',
  onermeler: [
    { t: 'Böbrekler vücut ağırlığının yaklaşık %1\'i olduğu hâlde kalp debisinin yaklaşık %20\'sini alır.', d: true, n: 'Doğru. Bu yaklaşık 1000 mL/dk demektir; metabolik gereksinimin çok üzerindedir, çünkü işlev süzmedir. [[K1 s. 309]]' },
    { t: 'İç medullanın kan akımı glomerüle giden akımdan fazladır.', d: false, n: 'Yanlış. Glomerül yaklaşık 500, dış medulla 100, iç medulla yalnız 20 mL/100 g/dk alır. [[K1 s. 309]]' },
    { t: 'Efferent arteriyolün daralması glomerüler kapiller hidrostatik basıncı artırır ve GFR\'yi yükseltir.', d: true, n: 'Doğru. Kan glomerülde birikir; ama toplam renal direnç arttığı için RBF azalır. [[K1 s. 309]]' },
    { t: 'Tübüloglomerüler geri bildirimde makula densadan salınan ikincil haberci adenozin A1 reseptörleri üzerinden afferent arteriyolü genişletir.', d: false, n: 'Yanlış. A1 uyarımı afferent arteriyolü daraltır, mezangiyal hücreleri kasar ve renin salınımını baskılar; sonuçta RBF ve GFR azalır. [[K1 s. 310]]' },
    { t: 'Miyojenik yanıtta gerilen arteriyol düz kasında mekanik kapılı, seçici olmayan katyon kanalları açılır.', d: true, n: 'Doğru. Membran depolarize olur ve düz kas kasılır; direnç artar, akım sabit kalır. [[K1 s. 309]]' },
  ],
};
VERI.sorular['fiz67-3'] = {
  no: 3, kok: 'Renin–anjiyotensin sistemi, akut böbrek hasarı ve RBF ölçümü için:', kagit: 'Paper A · fizyoloji, Bölüm 67', kaynak: '[[K1 s. 310–311]]',
  onermeler: [
    { t: 'Renin doğrudan damar düz kasını kasarak kan basıncını yükseltir.', d: false, n: 'Yanlış. Renin damarları kendisi etkilemeyen proteolitik bir enzimdir; anjiyotensinojeni anjiyotensin I\'e ayırır. [[K1 s. 310]]' },
    { t: 'Sempatik uyarı renin salınımını β1-adrenoseptörler üzerinden artırır.', d: true, n: 'Doğru. Öteki iki uyaran makula densanın algıladığı azalmış tübüler akım ve düşük afferent arteriyol basıncıdır. [[K1 s. 310]]' },
    { t: 'Prerenal akut böbrek hasarı, glomerül ve tübül işlevi sağlam kaldığı için potansiyel olarak geri döndürülebilir.', d: true, n: 'Doğru. İntrinsik renal hasarda ise yapısal hasar vardır; neden ortadan kalkınca hemen düzelmez. [[K1 s. 311]]' },
    { t: 'Goodpasture hastalığında glomerülonefrit podositler üzerinde yoğunlaşır.', d: false, n: 'Yanlış. Goodpasture hastalığı bazal membranı tutar; podositler minimal değişiklik hastalığında tutulur. [[K1 s. 311]]' },
    { t: 'PAH klirensi renal plazma akımını değil, doğrudan renal kan akımını verir.', d: false, n: 'Yanlış. PAH klirensi RPF\'yi verir; RBF = RPF / (1 − hematokrit). [[K1 s. 311]]' },
  ],
};

const D67_NAV = [
  ['d67-islev', 'İşlevler'], ['d67-anatomi', 'Anatomi'], ['d67-nefron', 'Nefron ve kanlanması'], ['d67-jga', 'Jukstaglomerüler aygıt'],
  ['d67-rbf', 'Renal kan akımı'], ['d67-arteriyol', 'Afferent ve efferent tonus'], ['d67-mekanizma', 'Otoregülasyon mekanizması'],
  ['d67-raas', 'Renin–anjiyotensin–aldosteron'], ['d67-pg', 'Eikozanoidler'], ['d67-aki', 'Akut böbrek hasarı'], ['d67-olcum', 'RBF ölçümü'],
  ['d67-p1', 'Part I'], ['d67-p2', 'Part II'], ['d67-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/67'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 6 · Bölüm 67', baslik: 'Böbrek işlevi, anatomisi ve kan akımı',
  lede: 'Böbrek kanı süzerek bileşimini düzenler ve hormon yapar. Bunun için vücut ağırlığına göre çok büyük, sıkı denetlenen bir kan akımı alır. [[K1 s. 307–309]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D67_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d67-islev">
  <h2>Böbreğin işlevleri</h2>
  <p class="intro">Böbreğin işleri iki grupta toplanır: kan bileşiminin homeostazı ve endokrin roller. [[K1 s. 307]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İki grupta sekiz işlev</h3></div>
    <div data-viz="f67_islev"></div>
    <p class="viz-cap" aria-live="polite"><b>Böbreğin işlevleri.</b> Bir işleve dokunun: nerede yapıldığı ve hangi bölümde ayrıntılandığı görünür. [[K1 s. 307]]</p>
    <p class="viz-foot">Sınıflama haritası; kutuların boyutu önem sırası göstermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Homeostaz:</b> plazma hacmi ve elektrolit derişimi, plazma ozmolaritesi, atık ürünlerin ve ilaçların (ya da metabolitlerinin) atılımı, glukoneogenez (böbrek önemli bir glukoneogenez organıdır) ve asit–baz dengesinin metabolik yanı. <b>Endokrin:</b> alyuvar yapımını denetleyen eritropoietin, D vitamininin 1,25-dihidroksikolekalsiferole aktivasyonu ve renin–anjiyotensin–aldosteron ekseninin ilk hormonu olan renin. [[K1 s. 307]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-anatomi">
  <h2>Böbreğin anatomisi ve damarları</h2>
  <p class="intro">Böbrekler T12–L3 düzeyinde, fasulye biçimli, retroperitoneal solid organlardır; dışta korteks, içte medulla ve hilusa doğru toplayıcı sistem bulunur. [[K1 s. 307]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kesit, kılıflar ve büyük damarlar</h3></div>
    <div data-viz="f67_anatomi"></div>
    <p class="viz-cap" aria-live="polite"><b>Kesit.</b> Korteks dışta, medulla içte; korteksin uzantıları olan renal kolonlar medullanın derinine girer. Katmanlar ve damarlar arasında geçin. [[K1 s. 307]]</p>
    <p class="viz-foot">Şematik; boyutlar ve damar uzunluk farkları abartılıdır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>İçten dışa kılıflar: renal kapsül, perirenal yağ, renal fasya ve pararenal katman. İç bükey medial kenarın ortasındaki hilustan sinirler, damarlar ve lenfatikler girer. Minör kaliksler birleşip majör kaliksleri, onlar da renal pelvisi yapar; pelvis üretere devam eder. [[K1 s. 307]]</p>
    <p>Renal arterler doğrudan aortadan çıkan çift arterlerdir; bazen ek (aksesuar) arterler de bulunur. Aorta orta hattın biraz solunda olduğu için sağ renal arter daha uzundur. Renal venler doğrudan IVC'ye açılır; IVC orta hattın sağında olduğu için sol renal ven daha uzundur. [[K1 s. 307]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap renal fasyanın dışındaki katmanı "pararenal fasya" diye yazar; yerleşik adı pararenal yağdır.</div>
</section>

<section class="wrap blk ders-sec" id="d67-nefron">
  <h2>Nefron ve kanlanması</h2>
  <p class="intro">İşlevsel birim nefrondur (her böbrekte yaklaşık 1 000 000); süzüntü glomerülden toplayıcı kanala bir dizi tüpten geçer ve kanı da sıra dışı bir arteriyol düzeninden gelir. [[K1 s. 307–308]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Süzüntünün ve kanın yolu</h3></div>
    <div data-viz="f67_nefron"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Glomerül.</b> Kortekste, plazmayı süzen kapiller yumağı; süzüntü Bowman kapsülünde toplanır. "İleri"ye basın ya da "Kan yolu"na geçin. [[K1 s. 307]]</p>
    <p class="viz-foot">Şematik tek nefron; segment uzunlukları ve vasa recta düzeni temsilîdir. Ayrıntılar: Bölüm 68–69.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Tübül.</b> Kıvrımlı PCT kortekste kalır ve süzülen maddelerin çoğunu geri emer. Henle kulpu (LOH) medullaya inen ince kol, saç tokası dönüşü, ince ve kalın çıkan kollardan oluşur; esas işi medullada uzunlamasına bir ozmotik gradyan kurmaktır. DCT kortekste denetlenen geri emilimin yeridir; toplayıcı kanal (CD) önemli bir su geri emilimi yeridir ve minör kalikse açılır. [[K1 s. 307]]</p>
    <p><b>Kan.</b> Afferent arteriyol glomerül kapillerlerine ayrılır, bunlar efferent arteriyolde birleşir. İki arteriyolün göreli direnci, filtrasyonun ana itici gücü olan glomerüler kapiller hidrostatik basıncı ve böylece GFR'yi ayarlar. Efferent arteriyolden çıkan vasa recta medullayı besler ve kulpla ters yönde akar (karşı akım). Sonuç: korteks iyi, medulla zayıf kanlanır; bu, su geri emilimi için gereken medüller solütlerin yıkanmasını önler. [[K1 s. 308]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Medüller gradyanı Henle kulpunun karşı akım çoğaltıcısı kurar; vasa recta karşı akım değiştiricisi olarak yalnız onu korur (Bölüm 69). Kitabın "gradyanı oluşturmak için gerekli" ifadesi bu iş bölümünü bulanıklaştırır.</div>
</section>

<section class="wrap blk ders-sec" id="d67-jga">
  <h2>Jukstaglomerüler aygıt</h2>
  <p class="intro">DCT kendi glomerülüne geri kıvrılır; değdiği yerdeki üç özel hücre grubu jukstaglomerüler aygıtı (JGA) oluşturur ve RBF ile GFR'yi düzenler. [[K1 s. 308–309]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Üç bileşen, tek sinyal zinciri</h3></div>
    <div data-viz="f67_jga"></div>
    <p class="viz-cap" aria-live="polite"><b>Jukstaglomerüler aygıt.</b> Bir bileşene dokunun. [[K1 s. 308]]</p>
    <p class="viz-foot">Şematik; hücre boyutları ölçekli değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Granüler hücreler</b> afferent arteriyol duvarındadır ve renin salgılar. <b>Makula densa</b> hücreleri DCT ile LOH'un kalın çıkan kolunun birleşim yerindedir; tübüler Na⁺ ve Cl⁻ derişimini algılar. <b>Ekstraglomerüler mezangiyal hücreler</b> makula densayla pürinerjik sinyalle konuşur ve granüler hücreleri ve afferent arteriyol düz kasını denetler. [[K1 s. 308–309]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-rbf">
  <h2>Renal kan akımı ve otoregülasyon</h2>
  <p class="intro">Böbrekler vücut ağırlığının %1'i kadardır ama kalp debisinin %20'sini, yaklaşık 1000 mL/dk alır; bu akım geniş bir basınç aralığında sabit tutulur. [[K1 s. 309]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Ortalama arter basıncını değiştirin</h3></div>
    <div data-viz="f67_otoreg"></div>
    <p class="viz-cap" aria-live="polite"><b>OAB 100 mmHg.</b> Otoregülasyon aralığındasınız (75–165 mmHg); GFR yaklaşık 125 mL/dk'da sabit. Kaydırıcıyı sürükleyin. [[K1 s. 309]]</p>
    <p class="viz-foot">Eğri kitaptaki şekle göre şematiktir; aralık dışındaki eğim temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Böbrek, iskelet kası gibi dokuların tersine, metabolik gereksiniminden çok daha fazla kan alır: görevi kanı süzmektir. Akım eşit dağılmaz: glomerül yaklaşık 500, dış medulla 100, iç medulla 20 mL/100 g/dk alır. [[K1 s. 309]]</p>
    <p>Akım çok yüksekse yüksek basınç uç organ hasarı yapar ve tübüllerde geri emilime zaman kalmaz: basınç diürezi. Çok düşükse iskemi gelişir; en çok zayıf kanlanan medulla ve metabolik olarak etkin PCT etkilenir, süzme azaldığı için kanda toksik metabolitler birikir. Bu yüzden RBF, OAB 75–165 mmHg arasında sabit kalır: renal otoregülasyon (Bölüm 34). [[K1 s. 309]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-arteriyol">
  <h2>Afferent ve efferent arteriyol tonusu</h2>
  <p class="intro">RBF ve GFR iki arteriyolün tonusuyla ayarlanır; ikisi ayrı denetlendiği için RBF ve GFR birbirinden bağımsız belirlenebilir. [[K1 s. 309]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İki musluk: RBF, glomerül basıncı ve GFR</h3></div>
    <div data-viz="f67_arteriyol"></div>
    <p class="viz-cap" aria-live="polite"><b>İki arteriyol de bazal tonusta.</b> Afferent ya da efferent arteriyolü daraltın. [[K1 s. 309]]</p>
    <p class="viz-foot">Yön modeli: oklar değişimin yönünü gösterir, büyüklükleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Hangisi daralırsa daralsın toplam renal damar direnci artar ve RBF düşer. GFR'de ise iki arteriyol zıt çalışır: afferent daralma glomerüle gelen basıncı düşürür, GFR azalır; efferent daralma kanı glomerülde biriktirir, basınç ve GFR artar. [[K1 s. 309]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-mekanizma">
  <h2>Otoregülasyonun mekanizmaları: miyojenik ve tübüloglomerüler</h2>
  <p class="intro">Mekanizma tam aydınlatılmamıştır; iki bileşeni vardır: afferent arteriyolün gerilmeye yanıtı ve makula densanın akım algısıyla çalışan tübüloglomerüler geri bildirim (TGF). [[K1 s. 309–310]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Perfüzyon basıncı artınca: adım adım</h3></div>
    <div data-viz="f67_tgf"></div>
    <p class="viz-cap" aria-live="polite"><b>Miyojenik · 1.</b> Perfüzyon basıncı artar, afferent arteriyol gerilir. "İleri"ye basın ya da basınç düşüşüne geçin. [[K1 s. 309]]</p>
    <p class="viz-foot">Şematik; ikincil habercinin ATP, ADP ya da AMP olduğu kesin değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Miyojenik.</b> Basınç artınca gerilen afferent arteriyol kasılır, çapı küçülür, direnç artar ve akım sabit kalır; basınç düşünce gevşer. Gerilme düz kasta mekanik kapılı, seçici olmayan katyon kanallarını açar; membran depolarize olur ve kas kasılır. [[K1 s. 309]]</p>
    <p><b>TGF.</b> JGA, DCT'den geçen akımı izler. Basınç artınca glomerül basıncı ve filtrasyon artar, makula densaya ulaşan Na⁺ ve Cl⁻ artar. Makula densa iyonları kendi Na⁺/K⁺/2Cl⁻ ko-transporteriyle alır; peşinden giren su hücreyi GFR ile orantılı şişirir. Şişmeyle orantılı salınan adenozin temelli ikincil haberci JGA'daki adenozin A1 reseptörlerine bağlanır: afferent arteriyol daralır (RBF ↓), glomerüler mezangiyal hücreler kasılıp filtrasyon yüzeyini küçültür (GFR ↓), granüler hücrelerin renin salgısı baskılanır. Basınç düşünce her şey tersine döner. [[K1 s. 309–310]]</p>
    <p>Habercinin kaynağı için bir olasılık: şişmeyi gidermek için bazolateral Na⁺/K⁺-ATPaz hızlanır, hücre içi ATP azalır, ADP ve AMP artıp hücreden sızar. [[K1 s. 310]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-raas">
  <h2>Renin–anjiyotensin–aldosteron ekseni</h2>
  <p class="intro">Düşük perfüzyonda renin salınır; oluşan anjiyotensin II sistemik basıncı ve dolayısıyla renal perfüzyon basıncını dört yoldan yükseltir. [[K1 s. 310]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Uyarandan dört hedefe</h3></div>
    <div data-viz="f67_raas"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Uyaranlar.</b> Granüler hücreler renini üç uyaranla salar. "İleri"ye basın. [[K1 s. 310]]</p>
    <p class="viz-foot">Akış şeması; ok kalınlıkları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Uyaranlar:</b> makula densanın algıladığı azalmış tübüler akım; düşük afferent arteriyol basıncı (granüler hücreler "böbrek içi baroreseptör"dür); β1-adrenoseptörler üzerinden sempatik uyarı. Renin damarı kendisi etkilemez: karaciğerin yaptığı anjiyotensinojeni anjiyotensin I'e ayırır, ACE onu anjiyotensin II'ye çevirir. Hızı belirleyen, düzenlenen basamak renin adımıdır. [[K1 s. 310]]</p>
    <p><b>Böbrekte</b> anjiyotensin II iki arteriyolü de daraltır, ama bazal çapı küçük olan efferentte etkisi büyüktür: sistemik basınç artar, glomerül basıncı ve GFR görece korunur. Çok yüksek düzeyde ise mezangiyal hücreleri kasar, filtrasyon alanı küçülür ve GFR belirgin düşer. <b>Sistemik damarlarda</b> güçlü veno- ve vazokonstriktördür. <b>Adrenalde</b> zona glomerulozadan aldosteron salgılatır; aldosteron DCT ve CD'de Na⁺ ve su geri emilimini artırıp plazma hacmini genişletir (Bölüm 69). <b>Beyinde</b> hipotalamusta susamayı ve arka hipofizden ADH salınımını artırır (ADH CD'de su geri emilimini artırır); sempatik nöronlarda noradrenalin salınımını doğrudan artırarak arteriyol vazokonstriksiyonu yapar. [[K1 s. 310]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-pg">
  <h2>Eikozanoidler ve NSAİİ</h2>
  <p class="intro">Vazopresörler uzun süre yüksek kalınca böbrek kendi vazodilatör prostaglandinleriyle karşı koyar; NSAİİ bu emniyet mekanizmasını kaldırır. [[K1 s. 310–311]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kanama ya da sepsiste arteriyol dengesi</h3></div>
    <div data-viz="f67_pg"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> Vazopresörler düşük; arteriyoller açık. Bir durum seçin. [[K1 s. 310]]</p>
    <p class="viz-foot">Yön modeli; RBF çubuğunun boyu temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kanama ve sepsiste noradrenalin ve anjiyotensin II sürekli yüksektir; afferent ve efferent arteriyolün uzun süreli daralması RBF'yi belirgin düşürür. Böbrek buna yerel olarak PGE₂ ve PGI₂ üreterek yanıt verir; bunlar vazokonstriktörlere karşı koyup RBF ve GFR'yi artırmaya çalışır. NSAİİ prostaglandin yapımı için gereken siklooksijenazı inhibe eder; bu hastalar emniyet mekanizmasından daha az yararlanır. [[K1 s. 310–311]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-aki">
  <h2>Klinik önem: akut böbrek hasarının patofizyolojisi</h2>
  <p class="intro">Akut böbrek hasarı (ABH, AKI), serum kreatinininin yükselmesi ya da idrar çıkışının azalmasıyla belirlenen hızlı (&lt; 48 sa) böbrek işlevi kaybıdır; nedenleri üç gruptadır. [[K1 s. 311]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Prerenal, intrinsik renal, postrenal</h3></div>
    <div data-viz="f67_aki"></div>
    <p class="viz-cap" aria-live="polite"><b>Akut böbrek hasarı.</b> Bir neden grubuna dokunun: hasarın nefronda nereye vurduğu ve GFR'yi nasıl düşürdüğü görünür. [[K1 s. 311]]</p>
    <p class="viz-foot">Şematik nefron üzerinde sınıflama haritası.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Prerenal:</b> ağır hipovolemi ve hipotansiyon RBF'yi bozar, glomerül basıncı düşer, GFR azalır. Glomerül ve tübül sağlam olduğu için potansiyel olarak geri döndürülebilir. <b>Postrenal:</b> idrar akımı tıkanır; artan tübüler basınç filtrasyon basıncını ve GFR'yi düşürür. [[K1 s. 311]]</p>
    <p><b>İntrinsik renal:</b> iskemik, sitotoksik ya da inflamatuvar etken glomerül ya da tübülde yapısal hasar yapar; bu yüzden neden ortadan kalkınca hemen düzelmez. Yere göre: <b>akut tübüler nekroz</b> (ATN; en sık; yüksek metabolizma ve zayıf kanlanma tübülü iskemiye duyarlı kılar, uzamış hipoperfüzyon tübül hücresini öldürür; toksinler: rabdomiyolizde miyoglobin, aminoglikozitler); <b>glomerülonefrit</b> (podosit: minimal değişiklik hastalığı; bazal membran: Goodpasture; mezangiyum: IgA birikimiyle IgA nefropatisi; glomerül kapilleri: SLE ve romatoid artritte antijen–antikor kompleksi birikimi); <b>akut interstisyel nefrit</b> (NSAİİ, penisilinler, allopürinole aşırı duyarlılık). [[K1 s. 311]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-olcum">
  <h2>Renal kan akımının ölçülmesi</h2>
  <p class="intro">RBF ölçmek için hem serbestçe süzülen hem aktif salgılanan bir madde gerekir: böylece renal artere gelen maddenin tamamı idrara geçer, venöz kanda hiç kalmaz. Bu ölçüte en yakın madde para-aminohipürik asittir (PAH). [[K1 s. 311]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>PAH klirensinden RPF ve RBF</h3></div>
    <div data-viz="f67_pah"></div>
    <p class="viz-cap" aria-live="polite"><b>RPF = 550 mL/dk, RBF = 1000 mL/dk.</b> İdrar akımını, PAH derişimlerini ve hematokriti değiştirin. [[K1 s. 311]]</p>
    <p class="viz-foot">Başlangıç değerleri örnektir (kitap sayı vermez), RBF ≈ 1000 mL/dk'ya göre seçilmiştir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>PAH (194 Da) serbestçe süzülecek kadar küçüktür ve organik anyon taşıyıcısı OAT1 ile tübüle salgılanır. Böbreğe giren PAH idrardaki PAH'a eşitse RPF, PAH klirensine eşittir. Bir X maddesinin klirensi, birim zamanda X'ten tamamen temizlenen plazma hacmidir (Bölüm 69): idrar hacmi/zaman × [X]idrar / [X]plazma. Yöntem RBF'yi değil RPF'yi verir: RBF = RPF / (1 − hematokrit). [[K1 s. 311]]</p>
    <p>Renal arter ve vene kanül koyup ikisinde PAH ölçmek ve Fick ilkesini uygulamak daha doğrudur, ama rutin için fazla invazivdir. Kitaba göre PAH her iki yolda da RBF'yi düşük tahmin eder: RBF'nin yalnız %90'ı glomerüle gider, kalanı parankimi besler ve tübüle salgılanamaz. [[K1 s. 311]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Düşük tahmin yalnız idrar klirensi yönteminde geçerlidir: renal ven örneği ekstraksiyon oranını (≈ %90) hesaba kattığı için Fick yöntemi RBF'yi düşük tahmin etmez.</div>
</section>

<section class="wrap blk ders-sec" id="d67-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: böbreğin işlevleri, renal damarların uzunluk farkları, nefron segmentleri ve sayısı, vasa recta, JGA'nın üç bileşeni, RBF değerleri ve otoregülasyon aralığı, afferent ve efferent daralmanın etkileri, TGF, renin uyaranları ve anjiyotensin II etkileri, NSAİİ, ABH sınıflaması ve PAH klirensi. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz67-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz67-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz67-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d67-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Renal otoregülasyon nedir? Hangi mekanizmalarla sağlanır ve anestezide neden önemlidir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Rakamlar.</b> Vücut ağırlığının %1'i, kalp debisinin %20'si (≈ 1000 mL/dk); glomerül 500, dış medulla 100, iç medulla 20 mL/100 g/dk. [[K1 s. 309]]</li>
    <li><b>Tanım.</b> OAB 75–165 mmHg arasında RBF (ve GFR) sabit kalır. Neden gerekli: yüksek akım → basınç hasarı ve basınç diürezi; düşük akım → medulla ve PCT iskemisi, toksik metabolit birikimi. [[K1 s. 309]]</li>
    <li><b>Efektörler.</b> Afferent ya da efferent daralma RBF'yi düşürür; afferent daralma GFR'yi düşürür, efferent daralma artırır; böylece RBF ve GFR bağımsız ayarlanır. [[K1 s. 309]]</li>
    <li><b>Miyojenik yanıt.</b> Gerilme → mekanik kapılı katyon kanalları → depolarizasyon → afferent arteriyol kasılır; basınç düşünce gevşer. [[K1 s. 309]]</li>
    <li><b>TGF.</b> ↑ GFR → makula densaya ↑ Na⁺/Cl⁻ → NKCC ile alım, hücre şişer → adenozin temelli haberci → A1: afferent daralma, mezangiyal kasılma, renin baskısı. [[K1 s. 309–310]]</li>
    <li><b>Hormonlar.</b> Renin (azalmış tübüler akım, düşük afferent basınç, β1) → anjiyotensin II efferenti daha çok daraltır, GFR korunur; vazopresörler uzun süre yüksekse PGE₂/PGI₂ RBF'yi korur, NSAİİ bunu engeller. [[K1 s. 310–311]]</li>
    <li><b>Klinik.</b> Otoregülasyon aralığı altındaki hipotansiyon ve hipovolemi prerenal ABH yapar; uzarsa ATN'ye gider. [[K1 s. 311]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. x ekseni OAB (mmHg; 75 ve 165 işaretli), y ekseni akım; iki işaret arasında düz plato, dışında eğimli bölümler. Yanına glomerülü çizin: afferent ve efferent arteriyol, aralarında glomerül kapilleri, DCT'nin değdiği yerde makula densa ve afferent duvarında granüler hücreler. [[K1 s. 308–309]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> JGA'nın bileşenleri nelerdir? Anjiyotensin II neden GFR'yi korur? Kanamalı hastada NSAİİ neden tehlikelidir? ABH nasıl sınıflanır? RBF nasıl ölçülür ve PAH neden kullanılır? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 308–311]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d67-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>İşlevler: plazma hacmi, elektrolit ve ozmolarite, atılım, glukoneogenez, metabolik asit–baz; endokrin olarak eritropoietin, aktif D vitamini, renin. [[K1 s. 307]]</li>
    <li>T12–L3, retroperitoneal; sağ renal arter ve sol renal ven daha uzun; her böbrekte ≈ 1 000 000 nefron. [[K1 s. 307]]</li>
    <li>Afferent → glomerül → efferent → vasa recta: korteks iyi, medulla zayıf kanlanır ve medüller solütler yıkanmaz. [[K1 s. 308]]</li>
    <li>JGA: granüler hücre (renin), makula densa (Na⁺/Cl⁻ algısı), ekstraglomerüler mezangiyal hücre (pürinerjik sinyal). [[K1 s. 308–309]]</li>
    <li>RBF ≈ 1000 mL/dk (%20 kalp debisi); OAB 75–165 mmHg arasında sabit; mekanizma miyojenik + TGF (adenozin, A1). [[K1 s. 309–310]]</li>
    <li>Efferent daralma GFR'yi artırır, afferent daralma azaltır; anjiyotensin II efferenti daha çok daraltır; PGE₂/PGI₂ vazopresörlere karşı koyar, NSAİİ bunu engeller. [[K1 s. 309–311]]</li>
    <li>ABH (&lt; 48 sa): prerenal (geri dönebilir), intrinsik (ATN en sık; GN; interstisyel nefrit), postrenal (tıkanma). [[K1 s. 311]]</li>
    <li>RPF = PAH klirensi (194 Da, OAT1); RBF = RPF / (1 − Hct). [[K1 s. 311]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="67"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/66">← Bölüm 66 · Karaciğer işlevi</a>
    <a href="#/dersler/fizyoloji/68">Sonraki: Bölüm 68 · Renal filtrasyon ve geri emilim →</a>
  </nav>
</section>`,
};
