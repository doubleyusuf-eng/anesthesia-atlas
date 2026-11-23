/* Fizyoloji Bölüm 49 · İntrakraniyal basınç ve kafa travması (K1 İngilizce baskı s. 206–210).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz49-1'] = {
  no: 1, kok: 'İntrakraniyal basınç (ICP) ve ölçümü için:', kagit: 'Paper A · fizyoloji, Bölüm 49', kaynak: '[[K1 s. 206]]',
  onermeler: [
    { t: 'Eksternal ventriküler dren (EVD), CSF drene edilirken aynı anda ICP\'yi doğru ölçer.', d: false, n: 'Yanlış. ICP ölçmek için EVD klemplenmelidir; ölçüm sırasında CSF drene edilemez. [[K1 s. 206]]' },
    { t: 'Dinlenen, sırtüstü yatan normal erişkinde ICP 5–15 mmHg\'dır.', d: true, n: 'Doğru. ICP kalp ve solunum döngüleri boyunca da dalgalanır. [[K1 s. 206]]' },
    { t: 'Subaraknoid ve subdural problar EVD\'den daha doğru ölçer ama enfeksiyon oranları yüksektir.', d: false, n: 'Yanlış. Enfeksiyon oranları düşüktür; ama daha az doğrudurlar, tıkanmaya eğilimlidirler, düzenli yıkama gerektirirler ve artık büyük ölçüde terk edilmiştir. [[K1 s. 206]]' },
    { t: 'Normal beyinde öksürme, ıkınma ve hapşırma ICP\'yi geçici olarak 50 mmHg\'ya dek yükseltebilir.', d: true, n: 'Doğru. Bu yükselmeler geçicidir. [[K1 s. 206]]' },
    { t: 'İntraparankimal prob, uzun kullanımda kayma olursa yerinde yeniden sıfırlanabilir.', d: false, n: 'Yanlış. Prob yerleştirilirken sıfırlanır ve yerinde yeniden kalibre edilemez; yalnız bulunduğu dokunun basıncını ölçer. [[K1 s. 206]]' },
  ],
};
VERI.sorular['fiz49-2'] = {
  no: 2, kok: 'Monro–Kellie hipotezi ve ICP artışı için:', kagit: 'Paper A · fizyoloji, Bölüm 49', kaynak: '[[K1 s. 206–208]]',
  onermeler: [
    { t: 'Beyin dokusu (≈ 1400 g) intrakraniyal hacmin yaklaşık %80\'ini oluşturur.', d: true, n: 'Doğru. CSF (≈ 150 mL) ve kan (≈ 150 mL) yaklaşık %10\'ar paya sahiptir. [[K1 s. 206]]' },
    { t: 'Kafa içi hacim arttığında ilk kompansasyon CSF üretiminin belirgin azalmasıdır.', d: false, n: 'Yanlış. CSF üretim hızı yaklaşık aynı kalır; CSF spinal subaraknoid aralığa itilir ve araknoid villuslardan emilimi artar. [[K1 s. 207]]' },
    { t: 'Kafa içi basınç artınca dural venöz sinüsler sıkışır ve venöz kan internal juguler vene itilir.', d: true, n: 'Doğru. Bu, kafa içi kan hacmini azaltan ikinci kompansasyon yoludur. [[K1 s. 207]]' },
    { t: 'Yükselmiş ICP\'de en sık görülen kraniyal sinir felci, uzun kafa içi seyri nedeniyle abdusens (VI) felcidir.', d: true, n: 'Doğru. Pupil dilatasyonu ise okülomotor sinirin (III) basısıyla olur. [[K1 s. 207]]' },
    { t: 'Cushing yanıtındaki bradikardi, beyin sapı iskemisinin vagus çekirdeklerini doğrudan uyarmasıyla oluşur.', d: false, n: 'Yanlış. İskemi vazomotor alandan sempatik çıkışı artırır; sistemik hipertansiyona yanıt olarak arteriyel baroreseptörler refleks bradikardi yapar. [[K1 s. 207]]' },
  ],
};
VERI.sorular['fiz49-3'] = {
  no: 3, kok: 'Travmatik beyin hasarı (TBI) için:', kagit: 'Paper A · fizyoloji, Bölüm 49', kaynak: '[[K1 s. 209–210]]',
  onermeler: [
    { t: 'Penetran kafa travması, dura sağlam kalırsa kapalı olabilir.', d: false, n: 'Yanlış. Penetran kafa travması tanım gereği açıktır; kapalı/açık ayrımı künt travma içindir. [[K1 s. 209]]' },
    { t: 'Resüsitasyon sonrası GCS 9–12 orta TBI\'dır ve mortalitesi yaklaşık %10\'dur.', d: true, n: 'Doğru. Hafif TBI\'da (13–15) mortalite %0,1, ağır TBI\'da (3–8) yaklaşık %50\'dir. [[K1 s. 209]]' },
    { t: 'Primer beyin hasarında kan damarları nöronlardan daha kolay zarar görür.', d: false, n: 'Yanlış. Nöron dokusu damarlardan daha duyarlıdır; bu yüzden damar yırtılması olan yaralanmalara sıklıkla diffüz aksonal hasar eşlik eder. [[K1 s. 209]]' },
    { t: 'TBI\'da hipoksemi PaO₂ < 8 kPa diye tanımlanır ve daha kötü sonuçla ilişkilidir.', d: true, n: 'Doğru. Hipoksemi CBF\'yi ve dolayısıyla ICP\'yi artırır. [[K1 s. 210]]' },
    { t: 'TBI sonrası hiperglisemi daha kötü sonuçla ilişkilidir; insülin tipik olarak 11 mmol/L plazma glukozunda başlanır.', d: true, n: 'Doğru. Hiperglisemi travmanın stres yanıtıyla sık görülür. [[K1 s. 210]]' },
  ],
};

const D49_NAV = [
  ['d49-icp', 'ICP ve ölçümü'], ['d49-monro', 'Monro–Kellie'], ['d49-bulgu', 'Belirti ve bulgular'], ['d49-cushing', 'Cushing ve konizasyon'],
  ['d49-azalt', 'ICP\'yi azaltmak'], ['d49-sinif', 'Sınıflama'], ['d49-hasar', 'Primer ve sekonder hasar'], ['d49-yonetim', 'TBI yönetimi'],
  ['d49-p1', 'Part I'], ['d49-p2', 'Part II'], ['d49-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/49'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Nörofizyoloji · Bölüm 49', baslik: 'İntrakraniyal basınç ve kafa travması',
  lede: 'Kafatası katı bir kutudur: içindekilerden biri büyüyünce kompansasyon kısa sürede tükenir, ICP yükselir ve beyin perfüzyonu tehlikeye girer. Kafa travmasında amaç bu zinciri, yani sekonder beyin hasarını önlemektir. [[K1 s. 206–210]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D49_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d49-icp">
  <h2>İntrakraniyal basınç nedir, nasıl ölçülür?</h2>
  <p class="intro">ICP, kafatası içindeki hidrostatik basınçtır; CSF'nin ve beyin parankiminin basıncını yansıtır. Dinlenen, sırtüstü normal erişkinde 5–15 mmHg'dır ve tahmin edilemez, yalnız invaziv ölçülür. [[K1 s. 206]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Üç ölçüm yolu ve ICP eğrisi</h3></div>
    <div data-viz="f49_olcum"></div>
    <p class="viz-cap" aria-live="polite"><b>Eksternal ventriküler dren (EVD).</b> Lateral ventriküle giren kateter; altın standarttır. Ölçmek için klemplenir, o sırada CSF drene edilemez. Bir yöntem seçin ya da "Öksür"e basın. [[K1 s. 206]]</p>
    <p class="viz-foot">Şematik koronal kesit; eğrinin biçimi temsilîdir. 5–15 ve 50 mmHg kitaptandır [[K1 s. 206]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>ICP kalp ve solunum döngüleriyle dalgalanır; normal beyinde bile öksürme, ıkınma ve hapşırma onu geçici olarak 50 mmHg'ya dek çıkarır. [[K1 s. 206]]</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Yöntem</th><th>Üstünlük</th><th>Sakınca</th></tr></thead>
      <tbody>
        <tr><td><b>EVD</b></td><td>Altın standart; tanı ve tedavi için CSF boşaltır (ICP'yi düşürür), intratekal ilaç verilir</td><td>Ventrikül küçük ya da yer değiştirmişse takması zor; sık tıkanır; enfeksiyon riski %5'e dek</td></tr>
        <tr><td><b>İntraparankimal prob</b></td><td>Küçük burr deliğinden fiberoptik uçlu kateter; takması EVD'den çok daha kolay, ventrikül basılıysa da olur; doğruluğu EVD'ye yakın, enfeksiyon çok daha az</td><td>Takılırken sıfırlanır, yerinde yeniden kalibre edilemez (5 günde kayma 1 mmHg kadar az bulunmuştur); yalnız bulunduğu dokunun basıncını ölçer, global ICP'yi yansıtmayabilir</td></tr>
        <tr><td><b>Subaraknoid / subdural prob</b></td><td>Enfeksiyon oranı düşük</td><td>Büyük ölçüde terk edildi: daha az doğru, tıkanır, düzenli yıkama ister</td></tr>
      </tbody>
    </table></div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Optik sinir kılıfı çapının ultrasonla ölçümü ve transkraniyal Doppler gibi noninvaziv yöntemler ICP artışını kestirmede kullanılır. Ancak ICP değerini ölçmek için invaziv ölçümün yerini tutmazlar.</div>
</section>

<section class="wrap blk ders-sec" id="d49-monro">
  <h2>Monro–Kellie hipotezi: sabit kutu, sınırlı kompansasyon</h2>
  <p class="intro">Kafatası sabit hacimli katı bir kutudur: içindekilerden birinin hacmi artarsa, ötekilerden biri ya da ikisi aynı ölçüde küçülmedikçe ICP yükselir. [[K1 s. 206]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Büyüyen kitle: kompansasyon, dekompansasyon, herniasyon</h3></div>
    <div data-viz="f49_monro"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> Beyin ≈ 1400 g (%80), CSF ≈ 150 mL (%10), arteriyel ve venöz kan ≈ 150 mL (%10). Kitleyi büyütün. [[K1 s. 206]]</p>
    <p class="viz-foot">Model: eğri ve hacim ekseni şematiktir (Şekil 49.1'den esinlenilmiştir); bölme oranları kitaptandır [[K1 s. 206–207]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Hacmi artan bölme: <b>beyin dokusu</b> yerel (tümör, apse) ya da yaygın (serebral ödem); <b>CSF</b> hidrosefalide (Bölüm 46); <b>kan</b> kanamada (ekstradural, subdural, intraparankimal) ya da venöz sinüs trombozunda. [[K1 s. 206]]</p>
    <p>Eğrinin düz kısmı iki küçük kompansasyondur: CSF spinal subaraknoid aralığa itilir (üretim aynı kalır, araknoid villuslardan emilim artar) ve sıkışan dural venöz sinüsler kanı internal juguler vene gönderir. Bunlar tükenince ICP hızla yükselir; geriye yıkıcı iki seçenek kalır: arteriyel kan hacminin azalması ya da parankimin foramen magnumdan itilmesi. [[K1 s. 207]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d49-bulgu">
  <h2>Yükselmiş ICP'nin belirti ve bulguları</h2>
  <p class="intro">Önce baş ağrısı ve kusma gelir; basınç arttıkça bilinç bozulur, beyin yer değiştirdikçe kraniyal sinir ve beyin sapı bulguları eklenir. [[K1 s. 207]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Baştan beyin sapına: hangi bulgu nereden?</h3></div>
    <div data-viz="f49_bulgu"></div>
    <p class="viz-cap" aria-live="polite"><b>Baş ağrısı.</b> Sabah kötüdür; ıkınma ve düz yatmayla artar. Bir bulguya dokunun. [[K1 s. 207]]</p>
    <p class="viz-foot">Şematik sagittal kesit.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Belirtiler:</b> sabah kötüleşen, ıkınma ve düz yatmayla artan baş ağrısı; bulantı ve kusma. <b>Bulgular:</b> yenidoğan ve bebekte gergin, kabarık fontanel; papil ödemi; bilinç değişikliği. [[K1 s. 207]]</p>
    <p>Ağır intrakraniyal hipertansiyonda beyin yer değiştirir: en sık abdusens (VI) felci olur, çünkü kafa içi seyri uzundur; okülomotor (III) sinir basısı pupili genişletir; sonunda Cushing triadı çıkar: sistemik hipertansiyon, bradikardi, anormal solunum paterni. [[K1 s. 207]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d49-cushing">
  <h2>Cushing triadı ve konizasyon</h2>
  <p class="intro">Cushing yanıtı artan ICP'ye geç bir yanıttır: CPP = MAP − ICP olduğundan, ICP yükselirken beyin sapını perfüze etmenin tek yolu MAP'yi yükseltmektir. [[K1 s. 207]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>ICP yükselirken MAP, CPP ve kalp hızı</h3></div>
    <div data-viz="f49_cushing"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Başlangıç.</b> ICP normal, CPP = MAP − ICP yeterli; otoregülasyon CBF'yi sabit tutar. Adım adım ilerletin. [[K1 s. 207]]</p>
    <p class="viz-foot">Model: MAP, ICP ve kalp hızı değerleri temsilîdir; 50 mmHg CPP eşiği ve 50 mL/100 g/dk CBF kitaptandır [[K1 s. 207]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>CPP 50 mmHg'nın altına inince serebral arterioller en geniş hâldedir, otoregülasyon çöker ve CBF 50 mL/100 g/dk'lık "normal" değerin altına düşer (Bölüm 48). Beyin sapı iskemiye girince vazomotor alan sempatik çıkışı çok artırır; yoğun sistemik arteriyol vazokonstriksiyonu hipertansiyon yapar ve beyin sapı akımını geri getirir. Arteriyel baroreseptörler bu hipertansiyona refleks bradikardiyle yanıt verir. [[K1 s. 207]]</p>
    <p>ICP yükselmeye devam ederse serebellar tonsiller foramen magnumdan itilir (tonsiller herniasyon, konizasyon) ve beyin sapını ezer: solunum merkezi basısıyla düzensiz solunum ve apne, bilinç kaybı (GCS genellikle 3–5), vazomotor merkez basısıyla hipotansiyon. Cushing refleksi CPP'yi korumak için çaresiz bir girişimdir; hızlı müdahale edilmezse (çoğu kez edilse bile) beyin sapı ölümü kaçınılmazdır. [[K1 s. 207–208]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> 50 mL/100 g/dk ortalama normal CBF'dir; altına inmek hemen iskemi demek değildir. Nöronal işlev genellikle ≈ 20 mL/100 g/dk'nın, hücre ölümü ≈ 10 mL/100 g/dk'nın altında başlar.</div>
</section>

<section class="wrap blk ders-sec" id="d49-azalt">
  <h2>ICP nasıl azaltılır?</h2>
  <p class="intro">Monro–Kellie'nin tersi: üç bölmeden birinin ya da birkaçının hacmi küçültülürse ICP düşer. [[K1 s. 208]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hangi bölme, hangi müdahale?</h3></div>
    <div data-viz="f49_azalt"></div>
    <p class="viz-cap" aria-live="polite"><b>CSF: EVD'den boşaltma.</b> Hidrosefali neden olmasa da işe yarar; birkaç mililitre CSF bile ICP'yi belirgin düşürür. Bir müdahale seçin. [[K1 s. 208]]</p>
    <p class="viz-foot">Model: şema yükselmiş ICP'nin bütün nedenlerini (hematom, tümör, apse, ödem, geniş ventriküller) bir arada gösterir; ICP düşüşleri temsilîdir, müdahalelerin etkinliğini karşılaştırmaz.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Kan.</b> Neden hematomsa acilen boşaltılır. Venöz ve arteriyel kan ayrı düşünülür. Venöz kanın kafa içinde işi yoktur, boşalmalıdır: dural sinüslerin kapağı olmadığından akım yalnız sinüsler ile sağ atriyum arasındaki basınç farkına bağlıdır. Bu farkı baş nötr pozisyonda, boyunluk ve sıkı ETT bağları çıkarılmış (juguler ven bükülmesin), 30° baş yukarı ve en düşük PEEP korur; pozitif intratorasik basınç farkı azaltır, bu yüzden PEEP yeterli oksijenasyonu sağlayan en düşük değere indirilir. Kas gevşetici, intratorasik basıncı geçici yükselten öksürme ve ıkınmayı önler. [[K1 s. 208]]</p>
    <p>Arteriyel kan beynin metabolik ihtiyacını karşılamalıdır; fazlası yalnız ICP'yi artırır, hedef "tam yetecek kadar" CBF'dir. Akım–metabolizma eşleşmesi nedeniyle CMR'yi düşürmek CBF'yi düşürür: nöbet CMR'yi çok artırır, benzodiazepin ve antiepileptikle hızla durdurulur; propofol, tiyopental ya da midazolam CMR'yi normalin altına indirir. Hipoksemi ve hiperkapni arteriyol dilatasyonu yapar: PaO₂ &gt; 10 kPa, PaCO₂ 4,5–5,0 kPa tutulur. [[K1 s. 208]]</p>
    <p><b>Parankim.</b> Mannitol ya da hipertonik salinle ozmoterapi beyin hücre dışı sıvısını azaltıp ağır ICP artışını geçici düşürür; tümör çevresindeki ödem deksametazonla küçültülür ya da tümör çıkarılır; apse drene edilir ve antibiyotik verilir. Her şey başarısızsa dekompresif kraniyektomi yapılır: kemik flebi çıkarılır, deri kapatılır ve beyin defektten yukarı doğru genişler. [[K1 s. 208–209]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d49-sinif">
  <h2>Kafa travması nasıl sınıflanır?</h2>
  <p class="intro">Kafa travması, beyin hasarı olsun olmasın başa gelen her travmadır; mekanizmaya ve eşlik eden yaralanmalara, travmatik beyin hasarı (TBI) varsa ayrıca şiddete ve alana göre sınıflanır. [[K1 s. 209]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Sınıflama ağacı ve GCS'ye göre şiddet</h3></div>
    <div data-viz="f49_sinif"></div>
    <p class="viz-cap" aria-live="polite"><b>Mekanizma.</b> Künt (trafik kazası, düşme), penetran (ateşli silah, bıçak) ya da askerî ortamda patlama. Bir dala ya da GCS değerine dokunun. [[K1 s. 209]]</p>
    <p class="viz-foot">Şiddet sınırları ve mortalite oranları kitaptandır [[K1 s. 209]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Künt travma kapalı (dura sağlam) ya da açıktır (dura yırtık; beyin ve CSF çevredeki mikroorganizmalara açılır); penetran travma tanım gereği açıktır. Kafa travması tek başına ya da başka yaralanmalarla birlikte olabilir. [[K1 s. 209]]</p>
    <p>TBI'nin şiddeti hastaneye gelişte resüsitasyon sonrası GCS ile belirlenir: hafif 13–15 (mortalite %0,1, prognoz iyi), orta 9–12 (≈ %10), ağır 3–8 (≈ %50); sağ kalanların birçoğu ağır özürlü kalır. Alana göre hasar yerel (ekstradural hematom, kontüzyon) ya da diffüzdür (diffüz aksonal hasar, hipoksik beyin hasarı); ikisi sıklıkla bir aradadır. [[K1 s. 209]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d49-hasar">
  <h2>Primer ve sekonder beyin hasarı</h2>
  <p class="intro">Primer hasar çarpma anında olur ve geri dönmez; sekonder hasar saatler–günler içinde gelişir ve tıbbi ve cerrahi çabanın hedefidir. [[K1 s. 209]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Çarpmadan günlere: hasarın zaman çizelgesi</h3></div>
    <div data-viz="f49_hasar"></div>
    <p class="viz-cap" aria-live="polite"><b>Çarpma anı.</b> Mekanik kuvvetler nöron ve damar dokusunu gerer ve keser: primer hasar. Zamanı ilerletin. [[K1 s. 209]]</p>
    <p class="viz-foot">Şematik zaman ekseni; nöron sayıları ve sekonder halkanın büyüklüğü temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Nöron dokusu damarlardan daha kolay zarar görür; bu yüzden ekstradural hematom ya da travmatik subaraknoid kanama gibi damar yırtılan yaralanmalara sıklıkla diffüz aksonal hasar eşlik eder. Sekonder hasarda yaralı hücreler inflamasyonu başlatır, ödem ve ICP artışı gelişir; mekanizmalar kan–beyin bariyeri hasarı, serebral ödem, ICP artışı, nöbet, iskemi ve enfeksiyondur. [[K1 s. 209]]</p>
    <p>Primer hasarı azaltmanın yolu önlemedir: hız sınırları, güvenli sürüş, hava yastığı, emniyet kemeri, bisikletli ve motosikletliler için kask. Tedavi ise sekonder hasarı önleyip olabildiğince çok nöronu korumaya yöneliktir. [[K1 s. 209]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d49-yonetim">
  <h2>TBI'li hastaya yaklaşım ve tıbbi yönetim</h2>
  <p class="intro">TBI'li hastada çoğu kez daha acil hayatı tehdit eden yaralanmalar vardır: acilde de hastane öncesinde de multidisipliner ekip ABCDE yaklaşımıyla, omurgayı sabitleyerek, önce hayatı tehdit edeni tedavi eder; resüsitasyondan sonra hasta yönetimi yönlendirecek beyin görüntülemesine hızla taşınır. [[K1 s. 209–210]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Beş "normal" hedef: değer kayınca ne olur?</h3></div>
    <div data-viz="f49_hedef"></div>
    <p class="viz-cap" aria-live="polite"><b>Bütün değerler hedefte.</b> Tıbbi yönetim sekonder beyin hasarını önlemek ve ICP'yi düşürmek için normoksi, normotansiyon, normokapni, normoglisemi ve normotermiyi korur. Bir değeri kaydırın. [[K1 s. 210]]</p>
    <p class="viz-foot">Hedef sınırlar kitaptandır [[K1 s. 210]]; ICP monitörlü durumda ICP 20 mmHg varsayılır (temsilî). Hipoglisemi sınırı 4 mmol/L ve MAP üst sınırı 110 mmHg temsilîdir; iç grafik Bölüm 48'in CBF–PaCO₂ modelidir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Normoksi.</b> Hipoksemi (PaO₂ &lt; 8 kPa) CBF ve ICP üzerinden sonucu kötüleştirir; nedenleri hava yolu tıkanıklığı, göğüs yaralanması, aspirasyon pnömonisidir. İlk aşamada her travma hastasına yüksek akımlı O₂ verilir, hipoksemi gelişebilecek hasta (ör. GCS düşük) erken entübe edilir. [[K1 s. 210]]</p>
    <p><b>Normotansiyon.</b> CPP &lt; 50 mmHg otoregülasyonu bozar, CBF düşer, iskemi gelişir. ICP ölçülen yoğun bakımda CPP &gt; 60 mmHg tutulur; gelişte ICP monitörü olmadığından AAGBI MAP &gt; 80 mmHg önerir: önce sıvıyla, kanama düşünülüyorsa kanla. Tek bir sistolik &lt; 90 mmHg atağı bile sonucu kötüleştirir. Hipertansiyon da zararlıdır: laringoskopiye yanıt MAP'yi otoregülasyonun üst sınırının üstüne çıkarıp CBF'yi ve ICP'yi artırır; entübasyonda sempatik yanıt baskılanır (ör. güçlü opioidle ön tedavi). [[K1 s. 210]]</p>
    <p><b>Normokapni.</b> CBF PaCO₂ ile doğrusal değişir (Bölüm 48): hiperkapni CBF'yi 50 mL/100 g/dk'nın üstüne çıkarıp ICP'yi artırır, hipokapni altına indirip iskemi yapar; AAGBI PaCO₂ 4,5–5,0 kPa önerir. <b>Normoglisemi.</b> Beyin normalde yalnız glukoz kullanır; stres hiperglisemisi kötü sonuçla ilişkilidir, insülin tipik olarak 11 mmol/L'de başlanır. Hipoglisemi TBI'nin doğrudan sonucu nadiren olur, ama insüline bağımlı diyabetlide kazanın nedeni olabilir; hücresel asidozu artırır, uzarsa nöron ölümü yapar. [[K1 s. 210]]</p>
    <p><b>Normotermi.</b> Ateş (vücut iç ısısı &gt; 37,6 °C) CMR, CBF ve ICP'yi artırır; antipiretik (parasetamol) ve dış soğutmayla hemen tedavi edilir. <b>Venöz drenaj:</b> 30° baş yukarı, nötr baş, gevşek ETT bağları, en düşük PEEP. [[K1 s. 210]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d49-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: normal ICP ve geçici yükselmeleri, ölçüm yöntemlerinin üstünlük ve sakıncaları, Monro–Kellie oranları ve kompansasyon yolları, belirti ve bulgular (VI ve III. sinir), Cushing triadının mekanizması, konizasyon, ICP'yi azaltma yolları ve hedef değerler, GCS'ye göre şiddet ve mortalite, primer ve sekonder hasar, TBI'de beş "normal". Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz49-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz49-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz49-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d49-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Monro–Kellie hipotezini açıklayın. Ağır kafa travmalı bir hastada ICP neden yükselir, yükselince ne olur ve nasıl düşürürsünüz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım ve ölçüm.</b> Kafa içindeki hidrostatik basınç; normal 5–15 mmHg, öksürmeyle geçici 50'ye dek. Yalnız invaziv: EVD altın standart (klemplenmeli, %5'e dek enfeksiyon), intraparankimal prob (kolay, yerinde kalibre edilemez, yerel). [[K1 s. 206]]</li>
    <li><b>Monro–Kellie.</b> Katı kutu: beyin %80, CSF %10, kan %10. Biri artınca öteki azalmazsa ICP artar; kompansasyon: CSF spinal aralığa, venöz kan juguler vene. Sonra eğri dikleşir. [[K1 s. 206–207]]</li>
    <li><b>Belirti ve bulgular.</b> Sabah baş ağrısı, kusma; papil ödemi, bilinç bozulması, bebekte fontanel; VI felci, III basısıyla midriyazis. [[K1 s. 207]]</li>
    <li><b>Cushing ve konizasyon.</b> CPP = MAP − ICP; CPP &lt; 50'de otoregülasyon çöker; beyin sapı iskemisi → sempatik hipertansiyon → baroreseptör bradikardisi; tonsiller herniasyonda apne, GCS 3–5, hipotansiyon. [[K1 s. 207–208]]</li>
    <li><b>ICP'yi düşürmek.</b> CSF: EVD. Kan: hematom boşaltma; venöz drenaj (30°, nötr baş, gevşek bağlar, en düşük PEEP, kas gevşetici); arteriyel: CMR düşür (nöbet tedavisi, propofol, tiyopental, midazolam), PaO₂ &gt; 10, PaCO₂ 4,5–5,0 kPa. Parankim: mannitol/hipertonik salin, deksametazon, apse drenajı. Son çare dekompresif kraniyektomi. [[K1 s. 208–209]]</li>
    <li><b>TBI'de sekonder hasarı önlemek.</b> ABCDE, omurga sabitleme, görüntüleme. Normoksi (PaO₂ &lt; 8 kPa kötü), normotansiyon (MAP &gt; 80, CPP &gt; 60, laringoskopi yanıtını baskıla), normokapni, normoglisemi (insülin 11 mmol/L), normotermi (&gt; 37,6 °C tedavi). [[K1 s. 209–210]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Yatay eksene kitle hacmini, dikey eksene ICP'yi (mmHg) koyun: uzun düz bir bölümden sonra dikleşen eğri çizin, dirsekte "dekompansasyon noktası", yukarıda yerel ve global iskemi düzeylerini işaretleyin. Yanına üç bölmeli kafatası kutusu (beyin %80, CSF %10, kan %10) ekleyin. [[K1 s. 206–207]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> EVD neden ölçüm sırasında klemplenir? Cushing triadında bradikardi neden olur? PEEP ICP'yi nasıl etkiler? Hiperventilasyon neden zararlı olabilir? Penetran travma neden hep açıktır? Primer hasar önlenebilir mi? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 206–210]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d49-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Normal ICP 5–15 mmHg; ancak invaziv ölçülür: EVD altın standart ve tedavi edicidir, intraparankimal prob kolay ama yerel ve yeniden kalibre edilemez. [[K1 s. 206]]</li>
    <li>Monro–Kellie: beyin, CSF ve kan sabit bir kutuyu paylaşır; CSF ve venöz kanın yer değiştirmesi tükenince ICP hızla artar. [[K1 s. 206–207]]</li>
    <li>Cushing triadı (hipertansiyon, bradikardi, anormal solunum) beyin sapı iskemisine geç bir yanıttır; konizasyonu apne, derin koma ve hipotansiyon izler. [[K1 s. 207–208]]</li>
    <li>ICP bölmeler küçültülerek düşürülür: CSF drenajı, venöz akımın kolaylaştırılması, CMR ve PaCO₂ kontrolü, ozmoterapi; son çare dekompresif kraniyektomi. [[K1 s. 208–209]]</li>
    <li>TBI şiddeti resüsitasyon sonrası GCS'yle belirlenir: 13–15, 9–12, 3–8; mortalite %0,1, ≈ %10, ≈ %50. [[K1 s. 209]]</li>
    <li>Primer hasar geri dönmez, en iyi yöntem önlemedir; tedavinin hedefi sekonder hasardır. [[K1 s. 209]]</li>
    <li>TBI'de beş "normal": hipoksemi (PaO₂ &lt; 8 kPa) yok, MAP &gt; 80 (ICP ölçülüyorsa CPP &gt; 60) mmHg, PaCO₂ 4,5–5,0 kPa, glukoz 11 mmol/L'yi aşarsa insülin, ateş (&gt; 37,6 °C) tedavisi; venöz drenaj korunur. [[K1 s. 210]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="49"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/48">← Bölüm 48 · Serebral kan akımı</a>
    <a href="#/dersler/fizyoloji/50">Sonraki: Bölüm 50 · Omurilik →</a>
  </nav>
</section>`,
};
