/* Fizyoloji Bölüm 69 · Su ve elektrolit dengesinin böbrekte düzenlenmesi (K1 İngilizce baskı s. 318–328).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz69-1'] = {
  no: 1, kok: 'Vücut sıvı bölmeleri ve ozmolarite için:', kagit: 'Paper A · fizyoloji, Bölüm 69', kaynak: '[[K1 s. 318–320]]',
  onermeler: [
    { t: '70 kg bir erkekte hücre içi sıvı yaklaşık 14 L\'dir.', d: false, n: 'Yanlış. Toplam vücut suyu 42 L; üçte ikisi (28 L) hücre içi, üçte biri (14 L) hücre dışı sıvıdır. [[K1 s. 318]]' },
    { t: 'Hücre dışı sıvı hacmini ölçmek için kapiller endotelden geçen ama hücre zarından geçemeyen tiyosülfat gibi bir indikatör gerekir.', d: true, n: 'Doğru. Plazma hacmi için endotelden geçmeyen (işaretli albümin), toplam vücut suyu için her yere dağılan (döteryumlu su) indikatör kullanılır. [[K1 s. 318]]' },
    { t: 'Ozmolalite, çözücünün kilogramı başına ozmol sayısıdır ve sıcaklıktan bağımsızdır.', d: true, n: 'Doğru. Çözücü kütlesi sıcaklıkla değişmez; ozmolalite laboratuvarda donma noktası alçalmasıyla ölçülür. [[K1 s. 319]]' },
    { t: '1 mol glukoz suda çözündüğünde 2 Osmol ozmotik etkin parçacık verir.', d: false, n: 'Yanlış. Glukoz iyonlarına ayrışmaz, 1 Osmol verir; 1 mol NaCl ise tamamen ayrışarak 2 Osmol verir. [[K1 s. 319]]' },
    { t: 'Metanol ve etilen glikol zehirlenmesi ozmolar açığı yükseltir.', d: true, n: 'Doğru. Ozmolar açık = ölçülen ozmolalite − hesaplanan ozmolarite; alkol, hipertrigliseridemi, metanol ve etilen glikol ölçülmeyen ozmotik etkin parçacık ekler. [[K1 s. 319]]' },
  ],
};
VERI.sorular['fiz69-2'] = {
  no: 2, kok: 'ADH, medüller ozmolar gradyan ve ilgili bozukluklar için:', kagit: 'Paper A · fizyoloji, Bölüm 69', kaynak: '[[K1 s. 320–323]]',
  onermeler: [
    { t: 'ADH ön hipofizde sentezlenir ve oradan salgılanır.', d: false, n: 'Yanlış. ADH hipotalamusta sentezlenir, sinir aksonlarıyla arka hipofize taşınıp granüllerde depolanır ve oradan salgılanır. [[K1 s. 320]]' },
    { t: 'ADH toplayıcı kanalda V2 reseptörüne bağlanır ve cAMP aracılığıyla lümen zarına aquaporin 2 yerleştirir.', d: true, n: 'Doğru. ADH yokken toplayıcı kanalın lümen duvarı suya geçirgen değildir; aquaporin 2 suyun yüksek ozmolariteli medüllaya geçmesini sağlar. [[K1 s. 320]]' },
    { t: 'Henle kulpunun ince inen kolu iyonlara geçirgen, suya geçirgen değildir.', d: false, n: 'Yanlış. İnce inen kol suya geçirgen, iyon ve üreye görece geçirgen değildir; iki çıkan kol suya geçirgen değildir. [[K1 s. 320]]' },
    { t: 'Vasa rektayı terk eden kanın ozmolaritesi yaklaşık 1200 mOsmol/L\'dir.', d: false, n: 'Yanlış. Firkete düzeni ve yavaş akım neredeyse tam dengelenmeyi sağlar; vasa rektadan çıkan kan neredeyse normaldir (yaklaşık 320 mOsmol/L), gradyan yıkanmaz. [[K1 s. 323]]' },
    { t: 'Nefrojenik diyabet insipitte idrar ozmolaritesi uygunsuz derecede düşük, plazma ozmolaritesi yüksektir.', d: true, n: 'Doğru. Bulgular santral DI ile aynıdır; fark mekanizmadadır: toplayıcı kanal dolaşan ADH\'ye yanıt vermez (ör. lityum). [[K1 s. 323]]' },
  ],
};
VERI.sorular['fiz69-3'] = {
  no: 3, kok: 'Böbrekte Na⁺ ve K⁺ işlenmesi için:', kagit: 'Paper A · fizyoloji, Bölüm 69', kaynak: '[[K1 s. 323–328]]',
  onermeler: [
    { t: 'Süzülen Na⁺\'un yaklaşık %60\'ı proksimal tübülde, %30\'u Henle kulpunda geri emilir.', d: true, n: 'Doğru. Filtrat DKT\'ye ulaştığında Na⁺\'un yaklaşık %90\'ı geri emilmiştir; DKT %5, toplayıcı kanal %1–2 emer. [[K1 s. 323–324]]' },
    { t: 'Tiyazidler kalın çıkan koldaki Na⁺/K⁺/2Cl⁻ kotransporterini bloke eder.', d: false, n: 'Yanlış. Bu kıvrım diüretiklerinin (furosemid, bumetanid) etkisidir; tiyazidler erken DKT\'deki Na⁺/Cl⁻ kotransporterini bloke eder. [[K1 s. 325]]' },
    { t: 'Böbrek günde yaklaşık 600 mOsmol atık atmak zorunda olduğundan en düşük günlük idrar hacmi yaklaşık 500 mL\'dir.', d: true, n: 'Doğru. İdrar en çok 1200 mOsmol/L yoğunlaşabilir: 600 / 1200 = 0,5 L. Hissedilmeyen kayıplarla birlikte günde en az 1000 mL su alınmalıdır. [[K1 s. 325]]' },
    { t: 'β₂-adrenoseptör uyarımı K⁺\'u hücre içine sokar.', d: true, n: 'Doğru. Akut stres yanıtında ve salbutamol kullanımında hipokalemi görülmesinin bir nedeni budur; α-adrenoseptör uyarımı ise hücreden K⁺ çıkarır. [[K1 s. 326]]' },
    { t: 'Plazma K⁺ düzeyi esas olarak distal tübül ve toplayıcı kanaldaki K⁺ sekresyonuyla ayarlanır.', d: true, n: 'Doğru. Süzülen K⁺\'un neredeyse tamamı vücut K⁺\'u ne olursa olsun PKT ve Henle kulpunda geri emilir; ayar distalde yapılır. [[K1 s. 326]]' },
  ],
};

const D69_NAV = [
  ['d69-bolme', 'Sıvı bölmeleri'], ['d69-hacim', 'Plazma hacmi ve Na⁺'], ['d69-osmol', 'Ozmolarite'], ['d69-tonisite', 'Tonisite'],
  ['d69-adh', 'Ozmolarite ve ADH'], ['d69-carpan', 'Karşı akım çoğaltıcı'], ['d69-vasa', 'Vasa rekta ve üre'], ['d69-di', 'DI ve SIADH'],
  ['d69-na', 'Na⁺ atılımı'], ['d69-diuretik', 'Diüretikler'], ['d69-hipo', 'Düşük plazma hacmi'], ['d69-oncelik', 'Ozmolarite mi hacim mi?'],
  ['d69-hiper', 'Yüksek plazma hacmi'], ['d69-k', 'K⁺ dengesi'], ['d69-kbobrek', 'Böbrekte K⁺'], ['d69-kklinik', 'Hiper- ve hipokalemi'],
  ['d69-p1', 'Part I'], ['d69-p2', 'Part II'], ['d69-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/69'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 6 · Bölüm 69', baslik: 'Su ve elektrolit dengesinin böbrekte düzenlenmesi',
  lede: 'Vücutta su pompası yoktur: böbrek su hacmini Na⁺ ile, ozmolariteyi ADH ve medüllanın yoğun gradyanıyla, K⁺\'u distal sekresyonla ayarlar. Anestezist için sonuçları hipovolemi, diüretikler, hiponatremi ve potasyum bozukluklarıdır. [[K1 s. 318–328]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D69_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d69-bolme">
  <h2>Vücut suyu nasıl dağılır ve nasıl ölçülür?</h2>
  <p class="intro">Su vücudun en bol bileşenidir: ortalama vücut ağırlığının %60'ı; bu oran cinsiyet, vücut yapısı ve yaşla değişir. [[K1 s. 318]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>70 kg erkekte bölmeler ve indikatör seçimi</h3></div>
    <div data-viz="f69_bolme"></div>
    <p class="viz-cap" aria-live="polite"><b>Toplam vücut suyu 42 L.</b> 28 L hücre içi, 14 L hücre dışı (10 L interstisyel, 3 L plazma, 1 L transsellüler). Bir indikatör seçin. [[K1 s. 318]]</p>
    <p class="viz-foot">Kutu alanları hacimle orantılıdır; değerler kitabın yuvarlak sayılarıdır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>1 kg su 1 L olduğundan 70 kg erkekte toplam vücut suyu 42 L'dir. Hücre dışı sıvının (HDS) beşte biri plazma, küçük bir kısmı beyin omurilik sıvısı, göz ve eklem sıvısı gibi transsellüler sıvıdır; geri kalan interstisyel sıvıda kapillerler ile hücreler besin ve atık alışverişi yapar. [[K1 s. 318]]</p>
    <p>Bölmeler <b>indikatör seyreltme</b> yöntemiyle ölçülür: bilinen miktarda madde verilir, bölmeye dağılması beklenir, derişimi ölçülür. Kilit nokta, yalnız istenen bölmeye girecek geçirgenlikte indikatör seçmektir. Hücre içi sıvı (HİS) ve interstisyel hacim doğrudan ölçülemez; farktan hesaplanır: interstisyel = HDS − plazma, HİS = toplam su − HDS. [[K1 s. 318]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-hacim">
  <h2>Plazma hacmi Na⁺ ile düzenlenir</h2>
  <p class="intro">Vücut suyu bölmeler arasında doğrudan taşıyamaz, su pompası yoktur; bu yüzden HDS hacmi, suyu peşinden sürükleyen Na⁺'un hareketi denetlenerek ayarlanır. [[K1 s. 318–319]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Na⁺ dengesi ve HDS hacmi</h3></div>
    <div data-viz="f69_nadenge"></div>
    <p class="viz-cap" aria-live="polite"><b>Denge.</b> Alınan Na⁺, böbrek dışı kayıp ve böbrek atılımı eşit; HDS hacmi sabit. Böbrek atılımını değiştirin. [[K1 s. 319]]</p>
    <p class="viz-foot">Şematik terazi; Na⁺ miktarları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Damar içi hacmin iki yönü de zararlıdır. Az kan hacmi venöz dönüşü, ön yükü ve kalp debisini düşürür; sistemik hipotansiyon ve organ iskemisi gelir. Fazla hacim kalp kası hücrelerini gerip sol ventrikül yetmezliğini tetikleyebilir ve böbrek, kalp, retina gibi organlara zarar veren hipertansiyon yapar. [[K1 s. 318]]</p>
    <p>Na⁺, HDS'nin başlıca katyonudur; eşlik eden anyonuyla birlikte vücudun ozmotik etkinliğinin %90'ından fazlasını oluşturur. Na⁺ derişimi diyet ya da damar yoluyla alım, böbrek dışı kayıp (terleme, dışkı) ve böbrek atılımının dengesidir. Böbrek Na⁺ atılımını geniş ölçüde değiştirebildiği için plazma ve HDS hacmini esas olarak o ayarlar: net böbrek Na⁺ kaybı HDS'yi küçültür, net kazanç büyütür. [[K1 s. 318–319]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-osmol">
  <h2>Molarite, ozmolarite, ozmolalite ve ozmolar açık</h2>
  <p class="intro">Ozmolarite birim hacimdeki, ozmolalite birim kütledeki ozmotik etkin parçacık sayısıdır; ikisinin farkı ölçülmeyen bir maddeyi ele verir. [[K1 s. 319]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yatak başı ozmolarite ve ozmolar açık</h3></div>
    <div data-viz="f69_osmol"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> Na⁺ 140, K⁺ 4, glukoz 5, üre 5 mmol/L → hesaplanan ozmolarite 298 mOsmol/L; ölçülen ozmolalite buna yakın, açık yok. Değerleri ya da bir senaryoyu değiştirin. [[K1 s. 319]]</p>
    <p class="viz-foot">Formül kitaptandır; örnek değerler ve senaryolardaki ek ozmol miktarı temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Molarite</b> litre çözeltide çözünmüş madde molüdür, yani derişimdir. <b>Ozmolarite</b> litre çözeltide ozmotik basınç yapabilen parçacık molüdür (ozmol). 1 mol NaCl tamamen Na⁺ ve Cl⁻'a ayrışarak 2 Osmol, ayrışmayan 1 mol glukoz 1 Osmol verir. Yatak başı tahmin: ozmolarite = 2[Na⁺] + 2[K⁺] + [glukoz] + [üre] (mmol/L); katyonlar, bir kısmı rutin ölçülmeyen eş anyonları için ikiyle çarpılır. [[K1 s. 319]]</p>
    <p>Ozmolaritenin sorunu, çözücü hacminin sıcaklıkla ve çözünen eklenince değişmesidir. <b>Ozmolalite</b> (kilogram çözücü başına ozmol) çözücü kütlesine dayandığı için sıcaklıktan ve çözünenin ağırlığından bağımsızdır; laboratuvarda donma noktası alçalmasıyla ölçülür. Normal hastada ikisi sayıca yakındır ve birbirinin yerine kullanılır. <b>Ozmolar açık</b> = ölçülen ozmolalite − hesaplanan ozmolarite; yüksekse plazmada hesaba girmeyen ozmotik etkin parçacık vardır: alkol zehirlenmesi, hipertrigliseridemi, metanol ve etilen glikol zehirlenmesi. [[K1 s. 319]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-tonisite">
  <h2>Tonisite: ozmolarite neden sıkı tutulur?</h2>
  <p class="intro">Tonisite, hücre içi suyun çevredeki HDS ozmolaritesine verdiği yanıttır: hücreyi küçültür ya da şişirir. [[K1 s. 319]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Alyuvar hangi çözeltide ne olur?</h3></div>
    <div data-viz="f69_tonisite"></div>
    <p class="viz-cap" aria-live="polite"><b>İzotonik HDS.</b> Su giriş ve çıkışı dengede; hücre boyutu değişmez. Bir çözelti seçin. [[K1 s. 319]]</p>
    <p class="viz-foot">Şematik hücre; şişme ölçeği ve hipertonik/hipotonik ortam değerleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>HDS izotonikse hücre aynı kalır; hipertonikse su ozmozla dışarı çıkar ve hücre büzülür; hipotonikse su içeri girer ve hücre şişer. [[K1 s. 319]]</p>
    <p><b>Klinik önem.</b> Periferik vene steril su vermek venöz kanın ozmolaritesini akut düşürür; alyuvarlar hipotonik ortamda su alıp şişer ve sınırlı fazla suyu aşınca hemolize olur. Bu yüzden steril su yerine %5 dekstroz verilir: ozmolaritesi 278 mOsmol/L'dir (plazma 285–295 mOsmol/L), yani yaklaşık izotoniktir. Glukoz metabolize olunca etkisi serbest su vermekle aynıdır, ama ozmolarite akut düşmez. [[K1 s. 319–320]]</p>
    <p>Ağır hiponatremiye çoğunlukla plazma ozmolaritesinin düşmesi eşlik eder ve bütün hücreler şişer. En tehlikelisi sert kafatası içindeki beyindir: beyin ödemi kafa içi basınç artışı, nöbet, bilinç değişikliği ve beyin sapı herniasyonu yapabilir. [[K1 s. 320]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-adh">
  <h2>Plazma ozmolaritesi ADH geribildirimiyle denetlenir</h2>
  <p class="intro">Ozmolarite, algılayıcısı hipotalamusta olan bir geribildirim döngüsüyle sabit tutulur; böbrekteki etkisi ADH'nin toplayıcı kanalı suya geçirgen yapmasıdır. [[K1 s. 320]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Plazma ozmolaritesinden idrara: ADH döngüsü</h3></div>
    <div data-viz="f69_adh"></div>
    <p class="viz-cap" aria-live="polite"><b>Ayar noktası (290 mOsmol/L).</b> Ozmoreseptörler sakin; ADH bazal, toplayıcı kanalda az aquaporin 2. Plazma ozmolaritesini değiştirin. [[K1 s. 320]]</p>
    <p class="viz-foot">Şematik; ADH düzeyi ve aquaporin sayısı temsilîdir, ayar noktası 285–295 mOsmol/L kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Döngü.</b> Algılayıcılar, hipotalamusta lamina terminalisin organum vasculosumu ve subfornikal organdaki ozmoreseptörlerdir; plazma ozmolaritesindeki %1'lik değişikliği bile fark eder. Kontrol merkezi hipotalamustur; ayar noktası 285–295 mOsmol/L'dir. Ozmolarite yükselince iki etkileyici çalışır: susuzluk su alımını artırır, böbrek su atılımını azaltır. ADH (arginin-vazopressin) hipotalamusta sentezlenir, sinir aksonlarıyla arka hipofize taşınıp granüllerde depolanır ve oradan dolaşıma salgılanır. Ozmolarite düşerse susuzluk azalır, ADH baskılanır, daha çok su atılır. [[K1 s. 320]]</p>
    <p><b>Toplayıcı kanalda.</b> Normalde toplayıcı kanalın lümen duvarı suya geçirgen değildir; DKT'den buraya gelen filtrat idrar olur. ADH V2 reseptörüne bağlanır, cAMP ikinci habercisi lümen zarına aquaporin 2 su kanalı yerleştirir; su, düşük ozmolariteli filtrattan yüksek ozmolariteli medüllaya ozmozla geçer ve daha az su atılır. Bunun anahtarı, Henle kulpunun karşı akım düzeneği ve üre döngüsüyle yaratılan çok yüksek medüller ozmolaritedir. [[K1 s. 320–321]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap ozmoreseptör duyarlılığını burada %1, öncelik bölümünde %2–3 olarak verir. İkisi de "hacim algılayıcılarından çok daha duyarlı" anlamındadır; sınavda tek bir rakam sorulursa %1–3 aralığını bilmek yeter.</div>
</section>

<section class="wrap blk ders-sec" id="d69-carpan">
  <h2>Medüller ozmolar gradyan: karşı akım çoğaltıcı</h2>
  <p class="intro">Henle kulpunun iki kolunun suya farklı geçirgenliği ve kalın çıkan kolun iyon pompası, medüllada kortekste 300'den uçta 1200 mOsmol/L'ye çıkan bir gradyan yaratır. [[K1 s. 320–321]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Gradyan altı adımda nasıl kurulur?</h3></div>
    <div data-viz="f69_carpan"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Başlangıç.</b> PKT su, iyon, amino asit ve glukozu birlikte emdiği için kulpa giren sıvı plazmayla aynı ozmolaritededir: her yerde 300 mOsmol/L. "İleri"ye basın. [[K1 s. 321]]</p>
    <p class="viz-foot">Ara adımlardaki sayılar kitabın şeklindeki örnek değerlerdir (mOsmol/L); 300 ve 1200 gerçek uç değerlerdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Henle kulpu medüllada PKT'yi DKT'ye bağlar ve üç işlevsel parçası vardır. <b>İnce inen kol</b> suya geçirgen, iyon ve üreye görece geçirgen değildir. <b>İnce çıkan kol</b> iyon ve üreye geçirgen, suya geçirgen değildir; böylece iyon ve su hareketi ayrılır. <b>Kalın çıkan kol</b> da suya geçirgen değildir, ayrıca iyonları lümendeki Na⁺/K⁺/2Cl⁻ kotransporteriyle taşır; enerjiyi bazolateral Na⁺/K⁺-ATPaz verir (sekonder aktif taşıma). [[K1 s. 320–321]]</p>
    <p>Çıkan kollar su geçirmediği için iyon pompası iki sonuç doğurur: DKT'ye giren filtrat hipo-ozmolar, medüller interstisyum hiper-ozmolar olur. İnen koldaki su bu yoğun interstisyuma çekilir, kalan filtrat yoğunlaşır; döngü tekrarlandıkça fark kulp boyunca çoğalır. [[K1 s. 321]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-vasa">
  <h2>Vasa rekta gradyanı korur, üre yarısını sağlar</h2>
  <p class="intro">Metabolik olarak çok etkin Henle kulpu iyi kanlanmalıdır; ama medülladan düz geçen bir damar çözünenleri taşıyıp gradyanı yıkardı. [[K1 s. 321]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Düz damar mı, firkete mi?</h3></div>
    <div data-viz="f69_vasa"></div>
    <p class="viz-cap" aria-live="polite"><b>Firkete (vasa rekta).</b> İnen damar iyon alıp su verir, çıkan damar su alıp iyon verir; kan medülladan yaklaşık 320 mOsmol/L ile çıkar ve gradyan bozulmaz. Düz damarı deneyin. [[K1 s. 321–323]]</p>
    <p class="viz-foot">Şematik; ara ozmolarite değerleri temsilîdir, 300, 1200 ve 320 mOsmol/L kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Çözüm özel kanlanmadır. Vasa rekta eferent arteriyollerin dallarıdır; Henle kulpunu medüllanın derinine kadar izler, firkete yapıp geri çıkar: kan "karşı akımla" akar. Kan yeterince yavaş aktığı için interstisyumla neredeyse tam dengelenir; medüller gradyan çok az bozulur. [[K1 s. 321–323]]</p>
    <p><b>Üre.</b> Azot metabolizmasının son ürünü olarak karaciğerde yapılır, glomerülde serbestçe süzülür ve tübül boyunca geri emilir. Süzülen ürenin yaklaşık %40'ı idrarla atılır; kalan üre medüller interstisyum ozmolaritesinin yaklaşık yarısını sağlar. [[K1 s. 323]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-di">
  <h2>Klinik önem: diyabet insipit ve SIADH</h2>
  <p class="intro">Ozmolariteyi algılayan ve ADH salgısını tetikleyen hipotalamus, örneğin kafa travmasından sonra bozulabilir; sonuç ya ADH eksikliği ya da fazlalığıdır. [[K1 s. 323]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>ADH ekseninde nerede sorun var?</h3></div>
    <div data-viz="f69_di"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> Arka hipofiz ihtiyaca göre ADH salgılar; plazma ve idrar ozmolaritesi uyumlu. Bir durum seçin. [[K1 s. 323]]</p>
    <p class="viz-foot">Şematik; oklar yalnız değişimin yönünü gösterir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Santral diyabet insipit (DI):</b> arka hipofiz yeterli ADH salgılamaz, toplayıcı kanal su emmez. Klinikte büyük miktarda aşırı seyreltik idrar ve hipovolemi bulguları; biyokimyada hipernatremi, yüksek plazma ozmolaritesi ve uygunsuz düşük idrar ozmolaritesi görülür. <b>Nefrojenik DI</b> (ör. lityum tedavisi) klinik ve biyokimyada aynıdır, ama toplayıcı kanal dolaşan ADH'ye yanıt vermez. [[K1 s. 323]]</p>
    <p><b>Uygunsuz ADH salgısı sendromu (SIADH):</b> dolaşan ADH, normal ozmolariteyi korumak için gerekenden fazladır; kaynak arka hipofiz ya da küçük hücreli akciğer kanseri gibi ektopik bir odaktır. Fazla su geri emilir. Klinik tablo hiponatremidir (baş ağrısı, bulantı, konfüzyon, nöbet, koma), bazen sıvı yüklenmesiyle birlikte; biyokimyada hiponatremi ve düşük plazma ozmolaritesine karşın idrar ozmolaritesi uygunsuz yüksektir. [[K1 s. 323]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-na">
  <h2>Böbrek Na⁺ atılımını nasıl ayarlar?</h2>
  <p class="intro">Böbrek günde 180 L Na⁺ içeren plazma süzer, oysa idrar yaklaşık 1,5 L/gündür; Na⁺'un ve onunla suyun çoğu geri emilir, atılım iki yolla ayarlanır. [[K1 s. 323]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Nefron boyunca Na⁺: kim ne kadar emer?</h3></div>
    <div data-viz="f69_nefron"></div>
    <p class="viz-cap" aria-live="polite"><b>Süzülen Na⁺ = %100.</b> Bir nefron parçasına dokunun ya da "Oynat" ile filtratı izleyin. [[K1 s. 323–324]]</p>
    <p class="viz-foot">Şematik nefron; yüzdeler kitaptandır, kalan Na⁺ çubuğu ölçeklidir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>GFR değişikliği.</b> Plazma hacmi yüksekse GFR artar, nefrona daha çok Na⁺ gelir ve atılır. Belki daha önemlisi, hacim düşükken GFR azalarak Na⁺ korunur. <b>Geri emilim değişikliği</b> ise övolemide çalışan ana düzenektir. [[K1 s. 323]]</p>
    <p><b>Toplu emilim (PKT ve kulp).</b> PKT'de süzülen Na⁺'un yaklaşık %60'ı emilir; bazolateral Na⁺/K⁺-ATPaz hücre içi Na⁺'u düşük tutar, Na⁺ lümenden pasif difüzyon, glukoz gibi moleküllerle kotransport ve H⁺ ile karşı taşıma (Bölüm 70) yoluyla girer. Yaklaşık %30'u Henle kulpunda Na⁺/K⁺/2Cl⁻ kotransporteriyle emilir; DKT'ye varıldığında %90 emilmiştir. [[K1 s. 323]]</p>
    <p><b>İnce ayar (DKT ve toplayıcı kanal).</b> Burada da hücre içi Na⁺ bazolateral pompayla düşük tutulur; lümen zarından geçişi aldosteron iki yolla denetler. DKT'de %5, lümendeki Na⁺/Cl⁻ kotransporteriyle emilir; aldosteron kotransporter sayısını belirler. Geç DKT ve toplayıcı kanalda (%1–2) aldosteron Na⁺ ve su emilimini, esas hücrelerde K⁺, interkale hücrelerde H⁺ sekresyonuyla takas ettirir. Atılan Na⁺ değişkendir; ağır hipovolemide idrar Na⁺'u 20 mmol/L'nin altına iner. [[K1 s. 323–324]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-diuretik">
  <h2>Klinik önem: diüretikler nerede etki eder?</h2>
  <p class="intro">Diüretik idrar yapımını artıran ilaçtır; sınıfları nefronun farklı yerlerinde etki eder ve etkileri o noktanın işinden çıkarılabilir. [[K1 s. 325]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Beş diüretik sınıfı, beş hedef</h3></div>
    <div data-viz="f69_diuretik"></div>
    <p class="viz-cap" aria-live="polite">Bir diüretik sınıfı seçin; nefronda etki yeri ve atılımdaki değişiklik görünür. [[K1 s. 324–325]]</p>
    <p class="viz-foot">Şematik nefron (Na⁺ haritasıyla aynı); ok yönleri değişimin yönünü gösterir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Sınıf (örnek)</th><th>Etki yeri ve düzenek</th></tr></thead>
      <tbody>
        <tr><td><b>Ozmotik</b> (mannitol)</td><td>Glomerülde serbestçe süzülür, geri emilmez; filtrat ozmolaritesi artar, daha az su emilir, idrar hacmi artar.</td></tr>
        <tr><td><b>Karbonik anhidraz inhibitörü</b> (asetazolamid)</td><td>PKT'deki KA, HCO₃⁻ geri emilimi için gerekir (Bölüm 70); inhibisyon HCO₃⁻ atılımını artırır.</td></tr>
        <tr><td><b>Kıvrım</b> (furosemid, bumetanid)</td><td>Kalın çıkan koldaki Na⁺/K⁺/2Cl⁻ kotransporteri bloke; Na⁺, K⁺, Cl⁻ emilmez ve medüller gradyanı kuran karşı akım düzeneği de bozulur: çok etkili.</td></tr>
        <tr><td><b>Tiyazid</b> (bendroflumetiyazid)</td><td>Erken DKT'deki Na⁺/Cl⁻ kotransporteri bloke.</td></tr>
        <tr><td><b>K⁺ tutucu</b> (spironolakton, amilorid)</td><td>Spironolakton DKT ve toplayıcı kanalda aldosteron reseptörünü bloke eder: Na⁺ atılımı artar, H⁺ ve K⁺ atılımı azalır. Amilorid aynı yerde Na⁺ kanallarını bloke eder; biyokimyasal etkisi benzerdir.</td></tr>
      </tbody>
    </table></div>
    <p style="margin-top:10px">Kaynak: [[K1 s. 325]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-hipo">
  <h2>Düşük plazma hacmine yanıt</h2>
  <p class="intro">Hipovolemide düşük basınç reseptörleri susuzluğu ve üç "hipovolemi hormonunu" (noradrenalin, ADH, renin) devreye sokar; hepsi böbrekte Na⁺ ve su tutar. [[K1 s. 324]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hipovolemi zinciri adım adım</h3></div>
    <div data-viz="f69_hipo"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Algılama.</b> Kalp atriyumlarında ve pulmoner damarlarda gerilmeyi izleyen düşük basınç mekanoreseptörleri, azalan venöz dönüşle daha az gerilir. "İleri"ye basın. [[K1 s. 324]]</p>
    <p class="viz-foot">Şematik akış; son adımın hesabı kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Sağ atriyum gerilme reseptörlerinin uyarısı azalınca ANP ve BNP salgısı düşer; afferent sinir uyarıları medulla oblongata ve hipotalamusa gider. <b>Noradrenalin</b> afferent ve eferent arteriyolleri büzer; böbrek kan akımı, GFR ve Na⁺ atılımı azalır. <b>Renin</b>, medulla oblongatadan gelen sempatik uyarıyla ve jukstaglomerüler aygıtın algıladığı düşük filtrat Na⁺'uyla salınır; anjiyotensin II ve aldosteron yapımına yol açar (Bölüm 68). Anjiyotensin II PKT'de Na⁺ emilimini artırır, afferent ve eferent arteriyolleri büzerek GFR'yi düşürür. Aldosteron DKT ve toplayıcı kanalda Na⁺ ve su emilimini, K⁺ ve H⁺ sekresyonunu artırır. <b>ADH</b> toplayıcı kanalı suya geçirgen yapar, medüller gradyan su emiliminde kullanılır. [[K1 s. 324–325]]</p>
    <p>Sonuç, böbrek Na⁺ atılımı azaltılarak sıvının korunmasıdır. Ama bir taban vardır: idrar en çok iç medülla kadar, 1200 mOsmol/L yoğunlaşabilir ve günde yaklaşık 600 mOsmol ozmotik etkin atık atılmalıdır; en az idrar 600 / 1200 = 500 mL/gün'dür. Terleme, dışkı ve solunumla günde yaklaşık 500 mL daha kaybedilir (hissedilmeyen kayıplar); övolemi için günde en az 1000 mL su alınmalıdır. [[K1 s. 325]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-oncelik">
  <h2>ADH için öncelik: ozmolarite mi, hacim mi?</h2>
  <p class="intro">ADH hem ozmolariteyi hem plazma hacmini düzenler; ikisi çatışınca küçük sapmalarda ozmolarite, büyük hacim kayıplarında hacim kazanır. [[K1 s. 325]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hangi uyarı ADH'yi önce açar?</h3></div>
    <div data-viz="f69_oncelik"></div>
    <p class="viz-cap" aria-live="polite"><b>İki eşik.</b> Ozmoreseptörler %2–3'lük ozmolarite değişikliğine, hacim ve baroreseptörler ancak %7–10'luk kan hacmi değişikliğine yanıt verir. Kaydırıcıları oynatın. [[K1 s. 325]]</p>
    <p class="viz-foot">Şematik yanıt eğrileri; yalnız eşikler kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Plazmanın hacmini ve bileşimini tam denetlemek için ikisi ayrı düzenlenmeliydi, ama düzenekler örtüşür. Ozmolaritedeki küçük değişiklik bile kapalı kafatasında beyin hücrelerini şişirerek felakete yol açabilir; hacimdeki küçük değişiklik ise kan deposu gibi çalışan yüksek kompliyanslı venöz dolaşım sayesinde iyi tolere edilir. [[K1 s. 325]]</p>
    <p>Bu yüzden önce ozmolarite korunur, hacmi bozsa bile: damardan hipertonik salin verilince hacim artmasına karşın ADH salgılanır ve ozmolariteyi düzeltmek için su tutulur. Kayıp %7'yi aşınca doku iskemisi tehlikesi nedeniyle hacim düzenlemesi öne geçer. [[K1 s. 325]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-hiper">
  <h2>Yüksek plazma hacmine yanıt</h2>
  <p class="intro">Hipervolemide gerilen atriyum ve pulmoner damar reseptörleri hipovolemi hormonlarını kısar, kalp natriüretik peptitleri salar; sonuç daha çok Na⁺ ve su atılımıdır. [[K1 s. 325–326]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>ANP ve BNP'nin dört böbrek etkisi</h3></div>
    <div data-viz="f69_anp"></div>
    <p class="viz-cap" aria-live="polite">Bir etkiye dokunun; glomerül ve nefronda yeri vurgulanır. Hepsi Na⁺ atılımını artırır. [[K1 s. 326]]</p>
    <p class="viz-foot">Şematik glomerül ve nefron.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Gerilme reseptörlerinin medulla oblongataya giden afferent çıktısı azalır, noradrenalin, ADH ve renin salınımı düşer; idrarla daha çok Na⁺ ve su atılır. Hacim artışı plazma proteinlerini göreceli seyrelterek onkotik basıncı düşürür; glomerül kapillerindeki Starling kuvvetleri filtrasyon fraksiyonunu artıracak yönde değişir. [[K1 s. 325–326]]</p>
    <p>ANP atriyumlardan, BNP ventriküllerden gerilmeye yanıt olarak salınır. Etkileri: afferent arteriyol dilatasyonu ile eferent arteriyol konstriksiyonu (glomerül kapiller hidrostatik basıncı ve GFR artar); mezangiyal hücre gevşemesi (filtrasyon yüzeyi ve GFR artar); DKT ve toplayıcı kanalda Na⁺ kanal inhibisyonu (Na⁺ emilimi doğrudan azalır); granüler hücrelerden renin ve adrenalden aldosteron salgısının inhibisyonu. [[K1 s. 326]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-k">
  <h2>K⁺ dengesi: alım ve hücre içi–dışı kayma</h2>
  <p class="intro">K⁺ hücre içi iyondur; böbrek toplam dengeyi sağlar ama yavaştır, plazma K⁺'undaki hızlı değişiklikler K⁺'un HİS ile HDS arasında kaymasıyla karşılanır. [[K1 s. 326]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>K⁺'u hücreye sokan ve çıkaranlar</h3></div>
    <div data-viz="f69_kkayma"></div>
    <p class="viz-cap" aria-live="polite"><b>Dağılım.</b> Total vücut K⁺'unun %98'i HİS'te (150 mmol/L), %2'si HDS'de (3,5–5,5 mmol/L). Bir etkeni seçin. [[K1 s. 326]]</p>
    <p class="viz-foot">Şematik hücre; ok kalınlıkları ve metredeki değerler temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Başlıca hücre içi iyon olarak K⁺ hücre içi ozmotik basıncı belirler; HİS–HDS arasındaki büyük derişim farkı istirahat zar potansiyelinin (RMP) kaynağıdır (Bölüm 51). Plazma K⁺'u alım, bölmeler arası kayma ve atılımın dengesidir. [[K1 s. 326]]</p>
    <p><b>Alım.</b> Batı diyeti günde 70 mmol K⁺ içerir (gerekenin 10 katı) ve neredeyse tamamı emilir. Yemekten sonra beklenebilecek K⁺ sıçramasını, glukoza yanıt salınan insülin önler: bazolateral Na⁺/K⁺-ATPazı uyarıp hücreye K⁺ alır. <b>Kayma.</b> İnsülin Na⁺/K⁺-ATPaz yoluyla K⁺'u içeri sokar. α-adrenoseptör uyarımı hücreden K⁺ çıkarır; çalışan kasta yerel hiperkalemi glikojenoliz ve vazodilatasyonu uyarır. β₂ uyarımı K⁺'u içeri alır; akut stres yanıtında ve salbutamolla hipokalemi görülmesinin bir nedeni budur. Metabolik asidozda fazla H⁺'un çoğu hücre içinde tamponlanır, hücre içi asidoz Na⁺/K⁺-ATPazı bozar ve K⁺ dışarı sızar: hiperkalemi (Bölüm 70). Metabolik alkalozda tersi olur. [[K1 s. 326]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-kbobrek">
  <h2>Böbrekte K⁺: ayar distal sekresyondadır</h2>
  <p class="intro">K⁺ serbestçe süzülür ve vücut K⁺'u yüksek de olsa düşük de olsa neredeyse tamamı PKT ve kulpta geri emilir; plazma K⁺'u DKT ve toplayıcı kanaldaki sekresyonla ayarlanır. [[K1 s. 326]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Düşük ve normal/yüksek K⁺'ta nefron</h3></div>
    <div data-viz="f69_kbobrek"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal/yüksek K⁺.</b> PKT %60, kulp %30 emer; DKT %10–50, toplayıcı kanal %5–30 salgılar; süzülenin %80'e kadarı atılır. Durumu değiştirin. [[K1 s. 326–327]]</p>
    <p class="viz-foot">Yüzdeler kitabın şeklindendir (süzülen K⁺'a göre).</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Proksimal emilim PKT'de difüzyonla, kulpta Na⁺/K⁺/2Cl⁻ kotransporteriyle olur. Plazma K⁺'u düşükken böbrek olabildiğince K⁺ tutar: DKT'de ek K⁺, muhtemelen H⁺/K⁺-ATPaz ile emilir ve toplamda %99'a kadarı geri kazanılır. Plazma K⁺'u yüksekken adrenal korteks doğrudan uyarılıp aldosteron salgılar; aldosteron DKT ve toplayıcı kanalda Na⁺ ve suyu emerken K⁺ ve H⁺ salgılatır. [[K1 s. 326]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-kklinik">
  <h2>Klinik önem: hiperkalemi ve hipokalemi</h2>
  <p class="intro">Her iki bozukluk da RMP'yi değiştirir: hiperkalemi zarı depolarize edip ölümcül aritmiye, hipokalemi hiperpolarize edip kas güçsüzlüğüne yol açar. [[K1 s. 326–327]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Plazma K⁺'u, EKG ve tedavi</h3></div>
    <div data-viz="f69_kklinik"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal (4,5 mmol/L).</b> EKG olağan. K⁺'u değiştirin ya da hiperkalemide bir tedavi seçin. [[K1 s. 326–328]]</p>
    <p class="viz-foot">Şematik EKG; eşikler (&gt; 6 ve &lt; 3 mmol/L) kitaptandır, dalga değişimlerinin K⁺ değerine göre dizilişi temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Hiperkalemi</b> (anlamlı: K⁺ &gt; 6 mmol/L) ventrikül fibrilasyonu gibi aritmiler yapabilir; klasik EKG uzun sivri T, sonra geniş QRS'tir. Sık nedenleri akut böbrek yetmezliği ve ağır metabolik asidozdur; ilaçlar (spironolakton, süksametonyum), Addison hastalığı ve hücre yıkımı (hemoliz, rabdomiyoliz) da yapar. [[K1 s. 326–327]]</p>
    <p><b>Tedavi</b> kısmen K⁺'u hücreye kaydırmaktır. Kalsiyum (ör. %10 kalsiyum klorürden 10 mL) kardiyoproteksiyon için verilir: Ca²⁺ zarın dış yüzüne bağlanıp yerel pozitif yük yoğunluğu yaratır, hücre içi voltaj göreceli daha negatif olur ve RMP stabilleşir (Bölüm 51). İnsülin/dekstroz hücresel K⁺ alımını, salbutamol β₂ etkisiyle hücre içine geçişi artırır. Hiperkalemi ile metabolik asidoz birlikteyse sodyum bikarbonat yararlı olabilir: HDS pH'ı yükselince hücrede tutulan H⁺ dışarı çıkar, K⁺ içeri girer. Son üçü total vücut K⁺'unu değiştirmez; uzun dönemde K⁺ kalsiyum rezonyum (iyon değiştirici reçine) ya da hemodiyaliz/hemofiltrasyonla vücuttan atılmalıdır. [[K1 s. 327]]</p>
    <p><b>Hipokalemi</b> (anlamlı: K⁺ &lt; 3 mmol/L) zarın depolarize olmasını güçleştirir: kas güçsüzlüğü ve miyalji, ağırsa flask paralizi ve solunum yetmezliği. EKG'de düzleşmiş ya da ters T, uzamış PR, U dalgası ve ST çökmesi görülür. Ayırıcı tanı geniştir: az alım, ishal, alkaloz, Conn sendromu (aldosteron salgılayan tümör). Anestezist çoğunlukla ağır güçsüzlükte ya da santral venden K⁺ gerektiğinde çağrılır. [[K1 s. 327–328]]</p>
    <p>K⁺ enteral ya da intravenöz verilir; hızlı intravenöz verilişi ventriküler taşiaritmi riski taşır. Güvenli hız periferik vende 10 mmol/sa, uygun monitörizasyonla santral vende 20 mmol/sa'e kadardır. Anlamlı hipokalemili hastaların yarısında anlamlı hipomagnezemi de vardır (kayıp düzenekleri benzer); Mg²⁺ Na⁺/K⁺-ATPazın normal çalışması için gerektiğinden hipomagnezemi varken hipokalemi tedaviye direnir, ikisi de tedavi edilmelidir. [[K1 s. 328]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Hiperkalemide kalsiyumun koruyucu etkisi bugün çoğunlukla eşik potansiyelini yükseltip RMP ile eşik arasındaki farkı geri getirmesiyle açıklanır; RMP'nin kendisi belirgin değişmez. Kalsiyum K⁺'u düşürmez, yalnız zaman kazandırır.</div>
</section>

<section class="wrap blk ders-sec" id="d69-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: 70 kg erkekte bölme hacimleri ve indikatörler, ozmolarite–ozmolalite ayrımı ve ozmolar açık nedenleri, tonisite ve %5 dekstroz, ADH'nin sentez yeri ve V2/aquaporin 2 düzeneği, Henle kulpu parçalarının geçirgenliği, vasa rekta, DI ve SIADH biyokimyası, nefron boyunca Na⁺ yüzdeleri, diüretiklerin etki yeri, en az idrar hacmi, K⁺ kayması ve hiper/hipokalemi. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz69-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz69-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz69-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d69-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Plazma ozmolaritesi nasıl düzenlenir? Böbrek yoğun idrarı nasıl yapar?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Ozmolarite = litre çözeltide ozmol; yatak başı 2[Na⁺] + 2[K⁺] + [glukoz] + [üre]; normal 285–295 mOsmol/L. Neden önemli: tonisite, hiponatremide beyin ödemi. [[K1 s. 319–320]]</li>
    <li><b>Geribildirim döngüsü.</b> Algılayıcı: OVLT ve subfornikal organdaki ozmoreseptörler (%1 değişiklik). Merkez: hipotalamus. Etkileyiciler: susuzluk ve ADH. [[K1 s. 320]]</li>
    <li><b>ADH.</b> Hipotalamusta sentez, aksonla arka hipofize taşınma, granülde depolanma, ozmolarite artınca salgı. [[K1 s. 320]]</li>
    <li><b>Toplayıcı kanal.</b> V2 → cAMP → lümen zarına aquaporin 2; su medüllaya geçer, idrar yoğunlaşır. ADH yoksa kanal suya geçirgen değildir. [[K1 s. 320]]</li>
    <li><b>Medüller gradyan.</b> İnen kol suya geçirgen, çıkan kollar değil; kalın çıkan kolda Na⁺/K⁺/2Cl⁻ → interstisyum 300'den 1200 mOsmol/L'ye; üre ozmolaritenin yarısı; vasa rekta firketesi gradyanı korur (çıkış ≈ 320). [[K1 s. 320–323]]</li>
    <li><b>Sınır ve öncelik.</b> En çok 1200 mOsmol/L idrar → 600 mOsmol atık için en az 500 mL/gün. Küçük değişikliklerde ozmolarite (%2–3), &gt; %7 hacim kaybında hacim önceliklidir. [[K1 s. 325]]</li>
    <li><b>Klinik.</b> Santral ve nefrojenik DI (seyreltik idrar, hipernatremi); SIADH (hiponatremi, uygunsuz yoğun idrar). [[K1 s. 323]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Kortikomedüller sınırı yatay çizgiyle ayırın; Henle kulpunu firkete olarak çizin, interstisyuma yukarıdan aşağı 300, 600, 900, 1200 yazın. İnen kola "H₂O dışarı", kalın çıkan kola "Na⁺/K⁺/2Cl⁻ dışarı, su geçmez" okları ekleyin; yanına toplayıcı kanalı çizip "ADH → aquaporin 2 → H₂O" okunu gösterin. [[K1 s. 320–322]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Ozmolalite ozmolariteden nasıl farklıdır, ozmolar açık nedir? Neden steril su değil %5 dekstroz verilir? Kıvrım diüretikleri neden bu kadar etkilidir? Hipovolemide hangi hormonlar salınır? Hiperkalemiyi nasıl tedavi edersiniz? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 319–327]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d69-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>70 kg erkek: toplam su 42 L = HİS 28 + HDS 14 (interstisyel 10, plazma 3, transsellüler 1); indikatörler albümin (plazma), tiyosülfat (HDS), ²H₂O (toplam). [[K1 s. 318]]</li>
    <li>Su pompası yok: HDS hacmi böbreğin Na⁺ atılımıyla ayarlanır; Na⁺ ve anyonu ozmotik etkinliğin %90'ından fazlası. [[K1 s. 318–319]]</li>
    <li>Ozmolarite litre çözeltide, ozmolalite kg çözücüde (sıcaklıktan bağımsız, donma noktası); açık: alkol, trigliserit, metanol, etilen glikol. %5 dekstroz 278 mOsmol/L. [[K1 s. 319–320]]</li>
    <li>Ozmoreseptör (OVLT, subfornikal) → hipotalamus → susuzluk + ADH; V2 → cAMP → aquaporin 2. DI: seyreltik idrar + hipernatremi; SIADH: hiponatremi + yoğun idrar. [[K1 s. 320–323]]</li>
    <li>Karşı akım çoğaltıcı 300 → 1200 mOsmol/L; vasa rekta firketesi korur (çıkış ≈ 320); üre medüller ozmolaritenin yarısı, süzülenin %40'ı atılır. [[K1 s. 320–323]]</li>
    <li>Na⁺: PKT %60, kulp %30, DKT %5, toplayıcı kanal %1–2; hedefler: KA inhibitörü PKT, kıvrım kalın çıkan kol, tiyazid erken DKT, K⁺ tutucu DKT/toplayıcı kanal. [[K1 s. 323–325]]</li>
    <li>Hipovolemi: noradrenalin, ADH, renin; en az idrar 500 mL/gün, en az alım 1000 mL/gün. Ozmolarite %2–3'te, hacim %7–10'da algılanır; &gt; %7 kayıpta hacim öne geçer. Hipervolemide ANP/BNP Na⁺ atar. [[K1 s. 324–326]]</li>
    <li>K⁺ %98 hücre içinde; insülin ve β₂ içeri, α ve asidoz dışarı; ayar distal sekresyonda. Hiperkalemi &gt; 6: Ca²⁺, insülin/dekstroz, salbutamol, bikarbonat, sonra rezonyum/diyaliz. Hipokalemi &lt; 3: periferik 10, santral 20 mmol/sa; Mg²⁺'u düzeltin. [[K1 s. 326–328]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="69"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/68">← Bölüm 68 · Renal filtrasyon ve geri emilim</a>
    <a href="#/dersler/fizyoloji/70">Sonraki: Bölüm 70 · Asit–baz fizyolojisi →</a>
  </nav>
</section>`,
};
