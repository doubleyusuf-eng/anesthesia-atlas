VERI.sorular = VERI.sorular || {};
VERI.sorular['an06c-1'] = {
  no: 1, kok: 'Mandibular sinirin kökleri ve dalları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 268–271]]',
  onermeler: [
    { t: 'Motor ve duyu kökleri foramen ovaleye tek trunkus halinde girer.', d: false, n: 'İki kök foramen ovaleden ayrı geçer ve çıktıktan hemen sonra birleşir. [[K5 s. 268]]' },
    { t: 'Nervus spinozus orta meningeal artere eşlik eder.', d: true, n: 'Sinir arterle birlikte foramen spinozumdan döner ve komşu duraya dağılır. [[K5 s. 270]]' },
    { t: 'Bukkal sinir arka trunkustan çıkar.', d: false, n: 'Bukkal sinir küçük ön trunkusun duysal dalıdır. [[K5 s. 270]]' },
    { t: 'Masseterik sinir temporomandibular ekleme de dal verir.', d: true, n: 'Massetere giden sinirden ekleme ince bir dal ayrılır. [[K5 s. 271]]' },
    { t: 'Aurikülotemporal sinirin iki kökü maksiller arteri çevreler.', d: false, n: 'Köklerin arasından orta meningeal arter geçer. [[K5 s. 271]]' },
  ],
};
VERI.sorular['an06c-2'] = {
  no: 2, kok: 'Ağız tabanı ve mandibular kanal', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 271–273]]',
  onermeler: [
    { t: 'Lingual sinir öne giderken submandibular kanalın altından dolanır.', d: true, n: 'Sinir kanalın lateralinden altına, oradan medialine geçer. [[K5 s. 272]]' },
    { t: 'Dilin ön üçte ikisinden tat lifleri lingual sinirde taşınır.', d: true, n: 'Bu lifler lingual sinirle seyreder ve korda timpaniye aittir. [[K5 s. 272]]' },
    { t: 'Milohiyoid dal mandibular kanalın içinden çıkar.', d: false, n: 'Dal, inferior alveolar sinir mandibular foramene girmeden ayrılır. [[K5 s. 273]]' },
    { t: 'İnsiziv dal kanin ve kesici dişlere ulaşır.', d: true, n: 'Bu dal premolar kökleri arasındaki ayrımdan öne devam eder. [[K5 s. 272]]' },
    { t: 'Mental dal molar dişleri inerve eder.', d: false, n: 'Molar dallar mandibular kanal içinde ayrılırken mental dal çeneye ve alt dudağa yayılır. [[K5 s. 272]]' },
  ],
};
VERI.sorular['an06c-3'] = {
  no: 3, kok: 'Blok alanları ve tükürük bezleri', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 269–274]]',
  onermeler: [
    { t: 'Mandibular trunkus bloğunda çiğneme kaslarının gücü korunur.', d: false, n: 'Başarılı blok duyu kaybına ek olarak çiğneme kaslarında paralizi oluşturur. [[K5 s. 270]]' },
    { t: 'İnferior alveolar bloktan sonra dilin yanında duyu kaybı gelişebilir.', d: true, n: 'Anestezik komşu lingual sinire sıklıkla yayılır. [[K5 s. 273]]' },
    { t: 'Parotise giden sekretomotor lifler otik gangliyonda sinaps yapar.', d: true, n: 'Lifler sinapstan sonra aurikülotemporal sinirle parotise ulaşır. [[K5 s. 274]]' },
    { t: 'Submandibular gangliyonun sempatik lifleri fasiyal arter pleksusuyla gelir.', d: true, n: 'Superior servikal gangliyon kaynaklı bu lifler bezlerde vazokonstriksiyon sağlar. [[K5 s. 273]]' },
    { t: 'Otik gangliyonla ilişkili motor lifler tensor timpaniye ulaşır.', d: true, n: 'Medial pterigoid sinirinden gelen motor liflerin hedefleri tensor timpani ve tensor veli palatinidir. [[K5 s. 274]]' },
  ],
};

const AN06C_NAV = [
  ['kok', 'Kökler'], ['dallar', 'Trunkusların dalları'], ['blok', 'Mandibular blok'], ['kulak', 'Kulak ve şakak'],
  ['dil', 'Lingual sinir'], ['alveol', 'Mandibular kanal'], ['agiz', 'Ağız içi blok'],
  ['bez', 'Gangliyonlar'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/anatomi/06c'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 6 · Ders 06c', baslik: 'Mandibular sinir ve ilişkili bloklar',
  lede: 'Trigeminal sinirin en büyük ve en geniş alana dağılan dalı V₃’tür. [[K5 s. 268]] Alt çeneden duyu taşıyan bu dal, çiğneme kaslarını da çalıştırır. [[K5 s. 268]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${AN06C_NAV.map(([id, ad]) => `<button type="button" data-scroll="an06c-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an06c-kok">
  <h2>Foramen ovaleden çıkan iki kök</h2>
  <p class="intro">Trigeminal sinirin yalnız üçüncü dalında motor lifler bulunur ve bunlar duyu lifleriyle foramen ovalenin hemen dışında birleşir. [[K5 s. 268]]</p>
  <div class="viz"><div data-viz="an06c_kok"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Kısa ortak gövde lateral pterigoidin derinindedir ve tensor veli palatinin üzerinde uzanır. [[K5 s. 268]] Tensor veli palatini gövdeyi işitme tüpünden ayırır. [[K5 s. 268]] Otik gangliyon gövdenin hemen medialinde, orta meningeal arter hemen arkasındadır. [[K5 s. 268]]</p>
  <ul class="ozet">
    <li><b>Duyu alanı.</b> Şakak, tragus, heliksin ön yüzü, mandibula üzerindeki deri, alt dudak, dilin ön üçte ikisi ve ağız tabanı mukozası. [[K5 s. 268]]</li>
    <li><b>Motor alan.</b> Çiğneme kasları, tensor timpani, tensor veli palatini, milohiyoid ve digastrik kasın ön karnı. [[K5 s. 268]]</li>
  </ul>
  <h3>Ortak gövdeden ne ayrılır?</h3>
  <p>Duysal nervus spinozus orta meningeal arterle foramen spinozumdan kafatasına döner. [[K5 s. 270]] Arter gibi ön ve arka dala ayrılarak komşu durayı inerve eder. [[K5 s. 270]] Motor dal medial pterigoide derin yüzünden girer ve otik gangliyon üzerinden iki tensör kasa lif gönderir. [[K5 s. 270]]</p>
</section>
<section class="wrap blk ders-sec" id="an06c-dallar">
  <h2>Ön ve arka trunkusun dallarını ayırt edin</h2>
  <p class="intro">Ön trunkusun bukkal dalı yanağa duyu taşırken arka trunkusun iki büyük inen dalı ağız tabanına ve mandibular kanala yönelir. [[K5 s. 270–272]]</p>
  <div class="viz"><div data-viz="an06c_dallar"></div><p class="viz-cap" aria-live="polite"></p></div>
  <h3>Küçük ön trunkusun dört dalı</h3>
  <dl class="an06c-dallar">
    <dt>Bukkal sinir · duysal</dt><dd>Lateral pterigoidin iki başı arasından geçer, temporalisin derininde iner ve ramusun ön kenarında yanak deri altına ulaşır. [[K5 s. 271]] Ön yanak derisine dağılır. [[K5 s. 271]] Buksinatörü delen lifleri iç yanak mukozasına ve alt molarlara komşu diş etinin lateral yüzüne gider. [[K5 s. 271]]</dd>
    <dt>Masseterik sinir · motor</dt><dd>Lateral pterigoidin üst kenarını aşar, mandibular çentikten laterale dönerek massetere ulaşır ve temporomandibular ekleme ince bir dal verir. [[K5 s. 271]]</dd>
    <dt>Derin temporal sinirler · motor</dt><dd>Ön ve arka dallar, bazen de orta dal, lateral pterigoidin üst kenarından temporal kasa yükselir. [[K5 s. 271]]</dd>
    <dt>Lateral pterigoid siniri · motor</dt><dd>Doğrudan lateral pterigoid kasa girer. [[K5 s. 271]]</dd>
  </dl>
  <p>Daha büyük arka trunkusun aurikülotemporal ve lingual dalları duysal, inferior alveolar dalı miksttir. [[K5 s. 270]] Bu dallara otik ve submandibular gangliyonların dağılım dalları eklenir. [[K5 s. 270]]</p>
</section>
<section class="wrap blk ders-sec" id="an06c-blok">
  <h2>Mandibular blokta yüzey işaretinden hedefe</h2>
  <p class="intro">Yüzeydeki işaret zigomatik arkın altındaki çentik, derindeki hedef foramen ovaleden çıkan mandibular sinirdir. [[K5 s. 269]]</p>
  <div class="viz"><div data-viz="an06c_blok"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ol class="iskelet">
    <li><b>Giriş.</b> Maksiller bloğa benzer biçimde iğne, zigomatik arkın altında koronoid çentiğin orta noktasından girer. [[K5 s. 269]]</li>
    <li><b>Kemik teması.</b> Kafa tabanına dik doğrultuda yaklaşık 3,5–5,0 cm ilerleyince lateral pterigoid laminaya ulaşılır. [[K5 s. 269]]</li>
    <li><b>Yön değişikliği.</b> İğne geri çekilip arkaya ve yukarıya yöneltilir. [[K5 s. 269]] Laminanın arka yüzünü geçince foramen ovale çıkışındaki sinire ulaşır. [[K5 s. 269]]</li>
  </ol>
  <p>Bu noktada orta meningeal arter, maksiller arter ve pterigoid venöz pleksus sinire yakındır. [[K5 s. 269]] Kitap, yaklaşımda genellikle görüntü yoğunlaştırıcı kullanıldığını belirtir. [[K5 s. 270]]</p>
  <p>Başarılı blokta alt çene, dilin yan yüzü ve mandibula üzerindeki deri duyusunu kaybeder, çiğneme kaslarında paralizi gelişir. [[K5 s. 270]]</p>
</section>
<section class="wrap blk ders-sec" id="an06c-kulak">
  <h2>Aurikülotemporal siniri kulak önünde bulun</h2>
  <p class="intro">Kulak önünde yüzeyel temporal arterin nabzı, hemen arkasında yükselen aurikülotemporal sinirin yerini gösterir. [[K5 s. 271]]</p>
  <div class="viz"><div data-viz="an06c_kulak"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>İki kök, arka trunkusun başlangıcına yakın arka yüzünden çıkar ve orta meningeal arteri çevreleyip birleşir. [[K5 s. 271]] Sinir arkaya ilerlerken önce lateral pterigoidin, sonra mandibula boynunun derininden geçer. [[K5 s. 271]]</p>
  <p>Burada sinir kemikle sfenomandibular bağ arasındadır. [[K5 s. 271]] İnce bağ, sfenoid dikeninden mandibular foramenin hemen önündeki lingulaya uzanır. [[K5 s. 271]] Aynı aralıkta lateral pterigoidin tutunma yeri, maksiller damarlar, inferior alveolar sinir ve damarlar ile parotisin derin bir lobülü bulunur. [[K5 s. 271]]</p>
  <p>Sinir eklemin hemen altında mandibula boynunun arkasından çıkar. [[K5 s. 271]] Burada parotisin derinindedir, sonra kulak önünde yüzeyel temporal damarların hemen arkasından zigomatik arkı aşar. [[K5 s. 271]]</p>
  <ul class="ozet">
    <li><b>Auriküler dallar</b> tragus derisine ve heliksin komşu lateral kesimine dağılır. [[K5 s. 271]]</li>
    <li><b>Yüzeyel temporal dal</b> şakak derisini ve saçlı derinin yan yüzünü inerve eder. [[K5 s. 271]]</li>
    <li><b>Dış akustik meatus dalları</b> genellikle ikidir ve dış kulak yolu derisiyle timpanik membrana ulaşır. [[K5 s. 271]]</li>
    <li><b>Eklem dalı</b> temporomandibular ekleme gider. [[K5 s. 271]]</li>
    <li><b>Parotis dalı</b> beze sekretomotor, sempatik ve duysal lifler taşır. [[K5 s. 271]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="an06c-dil">
  <h2>Lingual sinirin Wharton kanalıyla kesişmesi</h2>
  <p class="intro">Lingual sinir dilin yanına ilerlerken submandibular kanalın lateralinden altına döner, ardından medialine geçer. [[K5 s. 272]]</p>
  <div class="viz"><div data-viz="an06c_dil"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ol class="iskelet">
    <li><b>Başlangıç.</b> Tensor veli palatini ile lateral pterigoid arasında fasiyal sinirin korda timpani dalını alır. [[K5 s. 271]]</li>
    <li><b>Ramustan ağız tabanına.</b> Lateral pterigoidin alt kenarında ramus ile medial pterigoid arasından öne geçer. [[K5 s. 271]] Üst faringeal konstriktörün mandibuladaki başlangıcının altından ağız tabanına girer. [[K5 s. 271]] Mandibulanın iç yüzünde, diş eti mukozasının hemen altında, üçüncü molar köklerinin düzeyinin hemen altında yer alır. [[K5 s. 271–272]]</li>
    <li><b>Dile yaklaşırken.</b> Sırayla stiloglossus, hiyoglossus ve geniyoglossusun lateral yüzünü çaprazlar. [[K5 s. 272]] Milohiyoidin derininde, submandibular bezin derin parçasının üstünde seyreder. [[K5 s. 272]] Kanalı dolandıktan sonra uç dalları dil mukozasının hemen altına yayılır. [[K5 s. 272]]</li>
  </ol>
  <p>Lingual sinir ağız yan duvarı, ağız tabanı ve dilin ön üçte ikisinin mukozasından genel duyu taşır. [[K5 s. 272]] Birlikte seyreden korda timpani lifleri dilin ön üçte ikisinden tat alır ve submandibular ile sublingual bezlere sekretomotor innervasyon sağlar. [[K5 s. 272]]</p>
</section>
<section class="wrap blk ders-sec" id="an06c-alveol">
  <h2>İnferior alveolar siniri kanala girerken ve çıkarken izleyin</h2>
  <p class="intro">V₃’ün en büyük dalı olan inferior alveolar sinir, lingual sinirin hemen arkasından iner ve mandibular foramenden kemiğe girer. [[K5 s. 272]]</p>
  <div class="viz"><div data-viz="an06c_alveol"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ul class="ozet">
    <li><b>Foramene yaklaşım.</b> Sinir medial ve lateral pterigoid kaslar arasından iner. [[K5 s. 272]] Lateral pterigoidin alt kenarında inferior alveolar damarlarla birlikte sfenomandibular bağ ile ramus arasından foramene ulaşır. [[K5 s. 272]]</li>
    <li><b>Kanaldan önceki motor dal.</b> Milohiyoid dal, medial pterigoidle mandibulanın iç yüzü arasında öne ve aşağı ilerler, kemikte milohiyoid oluğu oluşturur. [[K5 s. 273]] Milohiyoidi delerek bu kası ve digastrik kasın ön karnını inerve eder. [[K5 s. 273]]</li>
    <li><b>Kanal içindeki dallar.</b> Her molar ve premolar dişe bir dal ulaşır. [[K5 s. 272]] Birinci ve ikinci premolar kökleri arasında hem kanal hem sinir ikiye ayrılır. [[K5 s. 272]]</li>
    <li><b>İnsiziv dal.</b> İnsiziv kanal kanin ve kesici dişlerin altından öne uzanır, içindeki sinir bu dişleri inerve eder. [[K5 s. 272]]</li>
    <li><b>Mental dal.</b> Mental kanal yukarı, dışa ve arkaya dönerek mental foramene açılır. [[K5 s. 272]] Sinir çeneye, alt dudağın derisine ve mukozasına yelpaze gibi yayılır. [[K5 s. 272]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="an06c-agiz">
  <h2>Ağız içi inferior alveolar blok ile mental bloğun alanları</h2>
  <p class="intro">İnferior alveolar sinirin ağız içindeki blok yeri, sfenomandibular bağın lateralinde ve mandibula ramusunun medialindedir. [[K5 s. 273]]</p>
  <div class="viz"><div data-viz="an06c_agiz"></div><p class="viz-cap" aria-live="polite"></p></div>
  <ol class="iskelet">
    <li><b>İşaretleri bulun.</b> Giriş ramusun ön kenarının hemen medialinde, üçüncü moların oklüzal yüzeyinden yaklaşık 1 cm yukarıdadır. [[K5 s. 273]]</li>
    <li><b>Doğrultuyu tarif edin.</b> Enjektör mandibula gövdesine ve oklüzal yüzeylere paraleldir. [[K5 s. 273]] Tercih edilen yol ağız içidir ve ağız açıkken karşı taraftan yaklaşmak daha kolaydır. [[K5 s. 273]] Kitap, tarif ettiği kartuşlu dental enjektörlerle aspirasyon yapılamadığına dikkat çeker. [[K5 s. 273]]</li>
    <li><b>Duyu alanını açıklayın.</b> Alt dişler ile alt dudağın deri ve mukozasında anestezi oluşur. [[K5 s. 273]] Solüsyon lingual sinire yayıldığından dilin yanında da sıklıkla duyu kaybı görülür. [[K5 s. 273]]</li>
  </ol>
  <p>Yalnız alt dudakta anestezi istenirse hedef mental foramendir. [[K5 s. 273]] Foramen ikinci premoların altında, mandibulanın üst ve alt kenarları arasındaki mesafenin ortasındadır. [[K5 s. 273]]</p>
</section>
<section class="wrap blk ders-sec" id="an06c-bez">
  <h2>İki gangliyon, üç tükürük bezi</h2>
  <p class="intro">Submandibular gangliyon lingual sinirin alt yüzüne asılıdır, otik gangliyon ise foramen ovalenin hemen altında V₃’ün medialine komşudur. [[K5 s. 273–274]]</p>
  <div class="viz"><div data-viz="an06c_bez"></div><p class="viz-cap" aria-live="polite"></p></div>
  <h3>Submandibular gangliyon</h3>
  <p>Lingual sinir hiyoglossusun yüzeyel yüzünü geçerken altında yer alan gangliyonun üç bağlantısı vardır. [[K5 s. 273]]</p>
  <ul class="ozet">
    <li><b>Parasempatik.</b> VII’nin superior salivator çekirdeğinden çıkan lifler nervus intermedius ile fasiyal sinirin ana gövdesine katılır. [[K5 s. 273]] Korda timpaniyle lingual sinire geçerek submandibular ve sublingual bezlere sekretomotor lif sağlar. [[K5 s. 273]]</li>
    <li><b>Sempatik.</b> Superior servikal gangliyondan fasiyal arter pleksusuyla gelen lifler iki bezde de vazokonstriksiyon yapar. [[K5 s. 273]]</li>
    <li><b>Duysal.</b> Lifler lingual sinirden gelir ve her iki bez ile ağız tabanı mukozasına dağılır. [[K5 s. 273]]</li>
  </ul>
  <h3>Otik gangliyon</h3>
  <p>Trigeminal sinirle ilişkili dört gangliyon arasında parasempatik, sempatik ve duysal bağlantıların yanında motor bileşen taşıyan tek gangliyon otik gangliyondur. [[K5 s. 274]]</p>
  <ul class="ozet">
    <li><b>Parasempatik.</b> IX’un inferior salivator çekirdeğinden gelen lifler önce timpanik dala, sonra küçük petrozal sinire geçer. [[K5 s. 274]] Bu sinir foramen ovaleden veya foramen spinozumun medialindeki kanalikulus innominatustan gangliyona ulaşır. [[K5 s. 274]] Burada sinaps yapan lifler aurikülotemporal sinirle parotise giderek salgıyı uyarır. [[K5 s. 274]]</li>
    <li><b>Sempatik.</b> Superior servikal gangliyondan orta meningeal arterin çevresindeki pleksusla gelen lifler parotiste vazokonstriksiyon sağlar. [[K5 s. 274]]</li>
    <li><b>Duysal.</b> Parotisin duysal lifleri aurikülotemporal sinirden gelir. [[K5 s. 274]]</li>
    <li><b>Motor.</b> Medial pterigoid sinirinden gangliyona geçen lifler tensor timpani ve tensor veli palatini kaslarına ulaşır. [[K5 s. 274]]</li>
  </ul>
  <div class="note plain"><b>Lezyonu yerleştirin.</b> Tek bir trigeminal bölümün lezyonunda duyu kaybı o bölümün dağılım alanındadır. [[K5 s. 274]] V bütünüyle kesilirse aynı tarafta yüz, ön saçlı deri ve kulak kepçesi derisiyle burun, ağız ve dilin ön üçte ikisinin mukozasında anestezi gelişir. [[K5 s. 274]] Çiğneme kasları paraliziye ve atrofiye uğrar. [[K5 s. 274]]</div>
</section>
<section class="wrap blk ders-sec" id="an06c-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı yanıtlayın ve gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="an06c-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an06c-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an06c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an06c-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Alt molar girişimi için ağız içi blok uygulanan hasta alt dudağını ve dilinin yanını hissedemiyor. Hangi sinir hedeflenmiştir? İki bulguyu ramus çevresindeki anatomiyle açıklayın.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Hedef, V₃’ün arka trunkusundan gelen mikst inferior alveolar sinirdir. [[K5 s. 270]]</li>
    <li>Sinir lingual sinirin hemen arkasından iner ve damarlarla birlikte bağ ile ramus arasından mandibular foramene girer. [[K5 s. 272]]</li>
    <li>Ağız içinde ramusun ön kenarının hemen medialini ve üçüncü moların oklüzal yüzeyinin yaklaşık 1 cm üstünü gösterin. [[K5 s. 273]]</li>
    <li>Kanal içindeki dental dalların blokajı alt dişlerdeki, mental dalın blokajı alt dudaktaki anesteziyi açıklar. [[K5 s. 272–273]]</li>
    <li>Dilin yanındaki duyu kaybını lokal anesteziğin komşu lingual sinire yayılmasıyla ilişkilendirin. [[K5 s. 273]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Ramusun medial yüzüne lingulayı ve mandibular forameni yerleştirin. [[K5 s. 271]] İnferior alveolar siniri, önündeki lingual siniri ve foramenden önce ayrılan milohiyoid dalı ekleyin. [[K5 s. 272–273]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Yalnız alt dudak için hangi forameni hedeflersiniz? [[K5 s. 273]] Foramen ovale çıkışındaki blokta hangi damarlar yakındır? [[K5 s. 269]] Hangi kas işlevi etkilenir? [[K5 s. 270]]</div></div>
</section>
<section class="wrap blk ders-sec" id="an06c-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>V₃’ün iki kökü foramen ovaleyi ayrı geçer, hemen altında birleşir. [[K5 s. 268]]</li>
    <li>Ön trunkusun duysal dalı bukkal sinirdir, arka trunkusun motor da taşıyan dalı inferior alveolar sinirdir. [[K5 s. 270]]</li>
    <li>Aurikülotemporal sinirin kökleri orta meningeal arteri sarar, ortak dal kulak önünde yüzeyel temporal damarların hemen arkasından zigomatik arkı aşar. [[K5 s. 271]]</li>
    <li>Lingual sinir Wharton kanalını alttan dolanır ve dilin ön üçte ikisinden hem genel duyu hem de korda timpaniye ait tat liflerini taşır. [[K5 s. 272]]</li>
    <li>Mandibular trunkus bloğu çiğneme kaslarını da etkilerken inferior alveolar blok alt dişleri ve alt dudağı uyuşturur. [[K5 s. 270]] [[K5 s. 273]]</li>
    <li>Submandibular ve sublingual bezlere sekretomotor lifler VII’den, parotise gidenler IX’dan gelir. [[K5 s. 273–274]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="06c"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/06b">← Trigeminal sinir: gangliyon, oftalmik ve maksiller dallar</a><a href="#/dersler/anatomi/06d">Sonraki: Abdusens, fasiyal ve vestibülokoklear sinirler →</a></nav>
</section>`,
};
