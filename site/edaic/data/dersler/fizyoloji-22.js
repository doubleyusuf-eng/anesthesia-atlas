/* Fizyoloji Bölüm 22 · Ventilasyonun kontrolü (K1 İngilizce baskı s. 93–96).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz22.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz22-1'] = {
  no: 1, kok: 'Solunum merkezi ve ventilasyonun geri bildirim döngüsü için:', kagit: 'Paper A · fizyoloji, Bölüm 22', kaynak: '[[K1 s. 93–95]]',
  onermeler: [
    { t: 'Dorsal solunum grubu öncelikle diyaframı kontrol eder ve normal tidal inspirasyondan sorumludur.', d: true, n: 'Doğru. Solunum merkezinin dört bölgesinden biri olan dorsal solunum grubu (DRG), diyaframı kontrol ederek normal tidal inspirasyonu sağlar. [[K1 s. 93]]' },
    { t: 'Solunumun ritim oluşturucusu olduğu düşünülen pre-Bötzinger kompleksi dorsal solunum grubunun içindedir.', d: false, n: 'Yanlış. Pre-Bötzinger kompleksi ventral solunum grubunun (VRG) içindedir. VRG ayrıca interkostal kasları kontrol eder, zorlu ekspirasyonu başlatır ve inspirasyonun gücünü artırır. [[K1 s. 93]]' },
    { t: 'Pnömotaksik merkez, DRG impulslarını değiştirerek inspirasyon derinliğini artırır.', d: false, n: 'Yanlış. Pnömotaksik merkez inspirasyon derinliğini azaltır ve solunum örüntüsünün ince ayarını yapar; solunum sayısını ise artırabilir. [[K1 s. 93]]' },
    { t: 'Apnöstik merkez, akciğerlerin aşırı genişlemesini önlemek için DRG nöronlarının etkinliğini değiştirir.', d: true, n: 'Doğru. Apnöstik merkezin işlevi budur; akciğer gerilme reseptörlerinin vagusla taşınan impulsları da bu merkeze ulaşır (Hering–Breuer refleksi). [[K1 s. 93, 95]]' },
    { t: 'Ventilasyonun geri bildirim döngüsünde efektörler beyin sapındaki solunum çekirdekleridir.', d: false, n: 'Yanlış. Beyin sapındaki solunum çekirdekleri kontrol merkezidir; efektörler solunum kaslarıdır. Algılayıcılar ise merkezi ve periferik kemoreseptörler, pulmoner gerilme reseptörleri, J-reseptörleri, irritan reseptörler ve eklem propriyoseptörleridir. [[K1 s. 93]]' },
  ],
};
VERI.sorular['fiz22-2'] = {
  no: 2, kok: 'Periferik kemoreseptörler için:', kagit: 'Paper A · fizyoloji, Bölüm 22', kaynak: '[[K1 s. 93–94]]',
  onermeler: [
    { t: 'Karotis cisimciklerinin afferent impulsları vagus siniriyle taşınır.', d: false, n: 'Yanlış. Karotis cisimciklerinin afferentleri glossofaringeal sinirle taşınır; vagusla taşınanlar aort cisimciklerinin afferentleridir. [[K1 s. 93]]' },
    { t: 'Aort ve karotis cisimcikleri, vücutta hipoksemiye yanıt veren tek kemoreseptörlerdir.', d: true, n: 'Doğru. Merkezi kemoreseptörler hipoksemiyle uyarılmaz; hipoksemiyi algılayan yalnız periferik kemoreseptörlerdir. [[K1 s. 93–94]]' },
    { t: 'Ağır anemide kanın oksijen içeriği düştüğü için periferik kemoreseptörler uyarılır.', d: false, n: 'Yanlış. Periferik kemoreseptörleri uyaran düşük arteriyel oksijen parsiyel basıncıdır, düşük oksijen içeriği değil; anemi ve karbonmonoksit zehirlenmesi kemoreseptörleri uyarmaz. [[K1 s. 93]]' },
    { t: 'Vücudun hiperkapniye ventilatuvar yanıtının yaklaşık %20\'sinden periferik kemoreseptörler sorumludur.', d: true, n: 'Doğru. Kalan %80\'den merkezi kemoreseptörler sorumludur. Buna karşılık en hızlı yanıt verenler periferik kemoreseptörlerdir: 1–3 saniye. [[K1 s. 93]]' },
    { t: 'Periferik kemoreseptörlerden asidemiyle (pH < 7,35) uyarılanlar yalnızca karotis cisimcikleridir.', d: true, n: 'Doğru. Aort cisimcikleri asidemiyle uyarılmaz. Derin metabolik asidozda (ör. diyabetik ketoasidoz) ventilasyonun karotis cisimcikleri yoluyla uyarılması Kussmaul solunumuna yol açar. [[K1 s. 93–94]]' },
  ],
};
VERI.sorular['fiz22-3'] = {
  no: 3, kok: 'Merkezi kemoreseptörler, ventilatuvar yanıtlar ve ilaçlar için:', kagit: 'Paper A · fizyoloji, Bölüm 22', kaynak: '[[K1 s. 94–96]]',
  onermeler: [
    { t: 'Solunumsal asidoz merkezi kemoreseptörleri metabolik asidozdan daha fazla uyarır.', d: true, n: 'Doğru. CO₂ kan–beyin bariyerini geçebilir, H⁺ iyonları geçemez. Derin metabolik asidozda ventilasyonu uyaran yol karotis cisimcikleridir. [[K1 s. 94]]' },
    { t: 'Plazma pH\'sındaki değişiklikler merkezi kemoreseptörleri doğrudan uyarır.', d: false, n: 'Yanlış. H⁺ ve HCO₃⁻ iyonları kan–beyin bariyerini geçemez, bu yüzden plazma pH\'sı ventilasyonu doğrudan etkilemez. Bariyeri geçen CO₂\'dir; kemoreseptörleri uyaran, CO₂\'nin orada oluşturduğu H⁺\'dır. [[K1 s. 94]]' },
    { t: 'BOS\'un protein konsantrasyonunun düşük olması, pH\'sını PCO₂\'deki küçük değişikliklere plazmadan daha duyarlı kılar.', d: true, n: 'Doğru. BOS\'ta tamponlama çok azdır; bu yüzden PCO₂\'deki küçük bir artış BOS pH\'sını plazmadakinden daha çok düşürür. [[K1 s. 94]]' },
    { t: 'Hiperkapni kronikleştiğinde BOS\'a HCO₃⁻ salgılanması BOS pH\'sını normale döndürür, ama dakika ventilasyondaki artış sürer.', d: false, n: 'Yanlış. V̇E\'deki artış sürdürülemez ve normale yakın düzeye döner: BOS pH\'sı normale dönünce merkezi kemoreseptörler artık uyarılmaz, böbreğin daha fazla HCO₃⁻ geri emmesi de arteriyel pH\'yı normale döndürüp karotis cisimciklerinden gelen uyarıyı azaltır. Sonuç CO₂\'ye duyarlılığın kaybıdır. [[K1 s. 94]]' },
    { t: 'Opioidler CO₂ yanıt eğrisini sağa kaydırır.', d: true, n: 'Doğru. Opioidlerin medüller solunum merkezi üzerindeki belirgin baskılayıcı etkisi hem hipoksemiye hem hiperkapniye yanıtı köreltir ve CO₂ yanıt eğrisini sağa kaydırır. Anestezik ajanlar da eğriyi sağa kaydırır. [[K1 s. 96]]' },
  ],
};

const D22_NAV = [
  ['d22-dongu', 'Geri bildirim döngüsü'], ['d22-merkez', 'Solunum merkezi'], ['d22-periferik', 'Periferik kemoreseptörler'],
  ['d22-merkezi', 'Merkezi kemoreseptörler'], ['d22-kronik', 'Kronik hiperkapni'], ['d22-mekano', 'Mekanoreseptörler'],
  ['d22-diger', 'Diğer girdiler'], ['d22-hipoksi', 'Hipoksemi yanıtı'], ['d22-co2', 'Hiperkapni yanıtı'],
  ['d22-ilac', 'İlaçlar'], ['d22-p1', 'Part I'], ['d22-p2', 'Part II'], ['d22-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/22'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 22', baslik: 'Ventilasyonun kontrolü',
  lede: 'Ventilasyon, algılayıcıları, beyin sapındaki kontrol merkezi ve solunum kaslarıyla çalışan nöronal geri bildirim döngülerinin sonucudur. Bu bölüm solunum merkezinin dört bölgesini, periferik ve merkezi kemoreseptörleri, mekanoreseptörlerle öbür girdileri, hipoksemiye ve hiperkapniye ventilatuvar yanıtı ve ilaçların bu yanıtları nasıl değiştirdiğini işler. [[K1 s. 93–96]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D22_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d22-dongu">
  <h2>Ventilasyon bir geri bildirim döngüsüyle kontrol edilir</h2>
  <div class="blk-body">
    <p>Ventilasyon nöronal geri bildirim döngüleriyle kontrol edilir. Her geri bildirim döngüsünde üç öğe bulunur: değişikliği saptayan <b>algılayıcılar</b>, sinyalleri bütünleştiren <b>kontrol merkezi</b> ve yanıtı uygulayan <b>efektörler</b>. Ventilasyonda algılayıcılar merkezi ve periferik kemoreseptörler, pulmoner gerilme reseptörleri, J-reseptörleri, irritan reseptörler ve eklem propriyoseptörleridir; kontrol merkezi beyin sapındaki solunum çekirdekleridir; efektörler solunum kaslarıdır. [[K1 s. 93]]</p>
    <p>Solunum merkezine gelen başlıca girdiler <b>periferik kemoreseptörler</b>, <b>merkezi kemoreseptörler</b>, <b>mekanoreseptörler</b> ve <b>bronşiyal irritan reseptörlerdir</b>. Bölümün büyük kısmı bu girdileri ve hipoksemiyle hiperkapniye verilen yanıtı işler. [[K1 s. 93]]</p>
  </div>
  <div class="cols cols-3" style="margin-top:16px">
    <div class="card basic"><span class="tag basic">Algılayıcılar</span><h3 style="margin-top:8px">Ne algılanır?</h3><p>Periferik kemoreseptörler arteriyel kanın durumunu (düşük PaO₂, yüksek PaCO₂, pH), merkezi kemoreseptörler BOS pH'sının düşmesini bildirir; akciğer gerilme reseptörleri akciğerin aşırı şişmesini, J-reseptörleri ve irritan reseptörler alveol duvarı ile hava yolundaki uyaranları algılar. Eklem propriyoseptörleri de algılayıcılar arasında sayılır. [[K1 s. 93–95]]</p></div>
    <div class="card"><span class="tag">Kontrol merkezi</span><h3 style="margin-top:8px">Beyin sapı</h3><p>Beyin sapındaki solunum çekirdekleri dört anatomik bölgeye ayrılır ve her birinin işlevi farklıdır: DRG, VRG, apnöstik merkez ve pnömotaksik merkez. [[K1 s. 93]]</p></div>
    <div class="card clin"><span class="tag clin">Efektörler</span><h3 style="margin-top:8px">Solunum kasları</h3><p>Solunum merkezinin uyarısıyla inspirasyonun sayısı ve derinliği artar; V̇<sub>E</sub> ile alveoler ventilasyon artar ve PaCO₂ düşer. Değişkeni ayar noktasına geri götüren budur. [[K1 s. 93, 104]]</p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-merkez">
  <h2>Solunum merkezinin dört bölgesi</h2>
  <p class="intro">Solunum merkezinin dört ana anatomik bölgesi vardır ve her birinin işlevi ayrıdır. <b>Dorsal solunum grubu (DRG)</b> öncelikle diyaframı kontrol eder; normal tidal inspirasyondan sorumlu olan bölge budur. <b>Ventral solunum grubu (VRG)</b> interkostal kasları kontrol eder; işlevi zorlu ekspirasyonu başlatmak ve inspirasyonun gücünü artırmaktır. VRG ayrıca, solunumun ritim oluşturucusu olduğu düşünülen nöron kümesi olan <b>pre-Bötzinger kompleksini</b> içerir. <b>Apnöstik merkez</b>, akciğerlerin aşırı genişlemesini önlemek için DRG nöronlarının etkinliğini değiştirir. <b>Pnömotaksik merkez</b> ise DRG impulslarını değiştirerek inspirasyon derinliğini azaltır, solunum örüntüsünün ince ayarını yapar ve solunum sayısını artırabilir. [[K1 s. 93]]</p>
  <p class="small muted" style="margin-bottom:14px">Kitabın dipnotu: pre-Bötzinger nöronları, sinoatriyal düğümün ritim oluşturucu hücrelerindekilerle aynı olan, hiperpolarizasyonla etkinleşen siklik nükleotit kapılı kanalları eksprese eder. [[K1 s. 93]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Döngü ve dört bölge: hangi bölge neyi yapar?</h3></div>
    <div data-viz="f22_devre"></div>
    <p class="viz-cap" aria-live="polite"><b>Döngü.</b> PaCO₂ artışı algılayıcılarda saptanır, beyin sapındaki solunum çekirdeklerinde bütünleştirilir, solunum kaslarına iletilir; artan alveoler ventilasyon PaCO₂'yi ayar noktasına geri götürür. Bölge düğmeleriyle dört bölgenin solunum örüntüsüne katkısını görün. [[K1 s. 93, 104]]</p>
    <p class="viz-foot">Şematik çizim: beyin sapı ve kaslar gerçek anatomiyi değil işlev ilişkisini gösterir. Solunum örüntüsü eğrileri de şematiktir; kitap bölgelerin tidal hacim ya da solunum sayısı üzerindeki etkisini sayıyla vermez. Dört bölgenin işlevleri [[K1 s. 93]], gerilme reseptörlerinin apnöstik merkeze vagusla ulaşması [[K1 s. 95]].</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Dört bölgeli bu şema, klasik beyin sapı kesme deneylerinden gelir ve sınavda kitaptaki biçimiyle bilinmesi gerekir. Güncel solunum nörofizyolojisinde ponstaki yapılar <b>pontin solunum grubu</b> (pnömotaksik merkezin karşılığı; Kölliker–Fuse çekirdeği ve parabrakiyal bölge) diye adlandırılır; "apnöstik merkez" ayrı bir çekirdek olarak tanımlanmaz. Ritim oluşumunda da pre-Bötzinger kompleksinin yanında, etkin ekspirasyonla ilişkili parafasiyal bölge (pFRG) sayılır. Dipnottaki HCN kanalları pre-Bötzinger nöronlarında gerçekten bulunur, ama ritim için zorunlu değildir: ritmin oluşumunda kalıcı Na⁺ akımı, Ca²⁺ ile etkinleşen katyon akımı ve nöronlar arası ağ etkileşimi öne çıkar.</div>
</section>

<section class="wrap blk ders-sec" id="d22-periferik">
  <h2>Periferik kemoreseptörler</h2>
  <div class="blk-body">
    <p>Periferik kemoreseptörler iki yerde bulunur. <b>Karotis cisimcikleri</b> karotis arterinin bifurkasyonundadır; afferent impulsları <b>glossofaringeal sinirle</b> taşınır ve solunumsal yanıtlar için en önemli periferik kemoreseptörlerdir. <b>Aort cisimcikleri</b> aort kavsindedir; afferent impulsları <b>vagus siniriyle</b> taşınır ve kardiyovasküler yanıtlarda daha önemli bir rol oynar. İkisinin de ağırlıklarına oranla kan akımı çok yüksektir. [[K1 s. 93]]</p>
  </div>
  <div class="cols" style="margin:14px 0">
    <div class="card basic"><span class="tag basic">Karotis cisimciği</span><h3 style="margin-top:8px">Glossofaringeal sinir</h3><p>Karotis bifurkasyonunda. Solunumsal yanıtlar için en önemli periferik kemoreseptördür; periferik kemoreseptörlerden asidemiyle uyarılan yalnız budur. [[K1 s. 93]]</p></div>
    <div class="card"><span class="tag">Aort cisimciği</span><h3 style="margin-top:8px">Vagus siniri</h3><p>Aort kavsinde. Düşük PaO₂ ve yüksek PaCO₂ ile uyarılır, ama kardiyovasküler yanıtlarda daha önemli bir rol oynar. [[K1 s. 93]]</p></div>
  </div>
  <h3>Neyle uyarılırlar?</h3>
  <div class="tbl-wrap" style="margin:12px 0 14px">
    <table class="tbl">
      <thead><tr><th>Uyaran</th><th>Hangi cisimcik?</th><th>Ayrıntı</th></tr></thead>
      <tbody>
        <tr><th>Düşük PaO₂</th><td>Karotis ve aort</td><td>Vücutta hipoksemiye yanıt veren tek kemoreseptörlerdir. Uyaran düşük arteriyel O₂ <b>parsiyel basıncıdır</b>, düşük O₂ içeriği değil: anemi ve karbonmonoksit zehirlenmesi bu reseptörleri uyarmaz. [[K1 s. 93]]</td></tr>
        <tr><th>Yüksek PaCO₂</th><td>Karotis ve aort</td><td>Vücudun hiperkapniye yanıtının yalnız %20'sinden sorumludurlar; kalan %80 merkezi kemoreseptörlerindir. Buna karşılık en hızlı yanıt verenler bunlardır: 1–3 saniye. [[K1 s. 93]]</td></tr>
        <tr><th>Asidemi (pH &lt; 7,35)</th><td>Yalnız karotis</td><td>Aort cisimcikleri asidemiyle uyarılmaz. [[K1 s. 93]]</td></tr>
        <tr><th>Hipotansiyon</th><td>Karotis ve aort</td><td>Perfüzyonun azalması nöronal çıktıyı artırır. Septik şok gelişirken gaz değişimi hiç bozulmamış olsa bile solunum sayısının artması bununla açıklanır. [[K1 s. 94]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="viz">
    <div class="viz-head"><h3>Periferik kemoreseptörler: uyaranı seçin, yanıtı izleyin</h3></div>
    <div data-viz="f22_periferik"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat.</b> Karotis ve aort cisimciklerinden bazal bir impuls akışı gelir. Bir uyaran seçin: hangi cisimciğin uyarıldığını, afferentin hangi sinirle gittiğini ve yanıtın hızını görün. [[K1 s. 93–94]]</p>
    <p class="viz-foot">Şematik çizim ve şematik impuls hızları: kitap boşalım sıklığı için sayı vermez. Kitaptan gelen sayılar: hiperkapni yanıtının %20'si periferik, %80'i merkezi kemoreseptörlerden; periferik yanıt süresi 1–3 s; asidemi eşiği pH &lt; 7,35. [[K1 s. 93–94]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Septik şokta solunum sayısının artışını kitap karotis ve aort cisimciklerinin hipoperfüzyonuna bağlar. Bu mekanizma doğrudur ama tek değildir: laktik asidoz (karotis cisimcikleri yoluyla), ateş ve inflamatuvar mediyatörler de solunum merkezini uyarır. Sınavda kitabın verdiği açıklama beklenir; klinikte takipnenin tek bir nedene bağlanmaması gerekir.</div>
</section>

<section class="wrap blk ders-sec" id="d22-merkezi">
  <h2>Merkezi kemoreseptörler</h2>
  <div class="blk-body">
    <p>Merkezi kemoreseptörler medullanın ventral yüzeyinde, VRG nöronlarına yakın ama onlardan ayrı bir yerde bulunur. Periferik kemoreseptörlerin tersine yalnızca <b>BOS pH'sındaki düşüşle</b> uyarılırlar. Ama H⁺ ve HCO₃⁻ iyonları kan–beyin bariyerini geçemediği için plazma pH'sındaki değişiklikler ventilasyonu doğrudan etkilemez. Olaylar şu sırayla gelişir: CO₂ kandan BOS'a, oradan merkezi kemoreseptörleri çevreleyen hücre dışı sıvıya (ECF) serbestçe difüze olur; CO₂ suyla tepkimeye girip H₂CO₃ oluşturur; H₂CO₃ H⁺ ve HCO₃⁻'ye ayrışır; H⁺ kemoreseptör dokusuna difüze olup reseptörleri doğrudan uyarır ve solunum merkezini etkinleştirir. Böylece kemoreseptör ECF'sinin pH'sı arteriyel PaCO₂'nin dolaylı bir ölçüsü olur: PaCO₂ arttıkça merkezi kemoreseptörler uyarılır ve V̇<sub>E</sub> artar. [[K1 s. 94]]</p>
  </div>
  <div class="viz" style="margin-top:16px">
    <div class="viz-head"><h3>CO₂ nasıl sinyale dönüşür? Kan, BOS ve kemoreseptör</h3></div>
    <div data-viz="f22_merkezi"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · CO₂ geçer.</b> CO₂ kan–beyin bariyerini serbestçe geçer; H⁺ ve HCO₃⁻ geçemez. Adımlarla tepkimeyi, uyarılmayı, asidoz tipinin farkını ve kronik hiperkapnideki uyumu izleyin. [[K1 s. 94]]</p>
    <p class="viz-foot">Şematik kesit; bölmeler ve bariyer gerçek ölçekte değildir. Normal BOS pH'sı 7,32 ve plazma pH'sı 7,4 kitabın BOS tablosundan [[K1 s. 199]]; hiperkapni, metabolik asidoz ve kronik uyum adımlarındaki pH ve V̇<sub>E</sub> değerleri yönü göstermek için seçilmiş şematik değerlerdir (kitap sayı vermez). Olay sırası, bariyerin geçirgenliği, asidoz tiplerinin farkı ve kronik hiperkapni mekanizması kitaptandır. [[K1 s. 94]]</p>
  </div>
  <h3 style="margin:22px 0 10px">Merkezi kemoreseptörlerle ilgili önemli noktalar</h3>
  <div class="cols" style="margin-bottom:14px">
    <div class="card basic"><span class="tag basic">Tamponlama</span><h3 style="margin-top:8px">BOS neden daha duyarlı?</h3><p>BOS'un protein konsantrasyonu plazmanınkinden çok daha düşüktür, bu yüzden CO₂ çok az tamponlanır. Sonuç: BOS pH'sı PCO₂'deki küçük değişikliklere plazmadan daha duyarlıdır. [[K1 s. 94]]</p></div>
    <div class="card"><span class="tag">Asidoz tipi</span><h3 style="margin-top:8px">Solunumsal mı, metabolik mi?</h3><p>Solunumsal asidoz merkezi kemoreseptörleri metabolik asidozdan daha fazla uyarır: CO₂ bariyeri geçebilir, H⁺ geçemez. Derin metabolik asidozda (diyabetik ketoasidoz) ventilasyon karotis cisimcikleri yoluyla uyarılır ve Kussmaul solunumu görülür. [[K1 s. 94]]</p></div>
    <div class="card"><span class="tag">Kan akımı</span><h3 style="margin-top:8px">Serebral vazodilatasyon</h3><p>Kitaba göre hiperkapniye eşlik eden serebral vazodilatasyon medullaya kan akımını artırır ve merkezi kemoreseptör mekanizmasını güçlendirir. Bu ifadenin düzeltmesi aşağıdaki Atlas notunda. [[K1 s. 94]]</p></div>
    <div class="card clin"><span class="tag crit">Hipoksemi</span><h3 style="margin-top:8px">Merkezi kemoreseptörler hipoksemiyle uyarılmaz</h3><p>Dahası, periferik kemoreseptörler yoksa hipoksemi solunum merkezini <b>baskılar</b>. [[K1 s. 94]]</p></div>
  </div>
  <div class="note"><b>Sinerji.</b> Periferik ve merkezi kemoreseptör girdileri sinerjiktir: hipoksemi periferik, hiperkapni merkezi kemoreseptörlerce algılanırsa ortaya çıkan ventilatuvar yanıt iki etkinin toplamından büyüktür. Bunu aşağıdaki hipoksemi eğrisi bileşeninde sayıyla görebilirsiniz. [[K1 s. 94]]</div>
  <div class="note plain" style="margin-top:10px"><b>Atlas notu.</b> Kitap merkezi kemoreseptörlerin "yalnızca BOS pH'sıyla" uyarıldığını yazar, ardından mekanizmayı doğru biçimde reseptörleri çevreleyen ECF'nin pH'sı üzerinden anlatır. Uyaran, kemoreseptör hücresinin yakın çevresindeki H⁺'dır; BOS bu çevrenin iyi bir göstergesidir, uyaranın kendisi değildir. Güncel çalışmalarda merkezi kemoreseptör işlevi tek bir noktaya değil, başta retrotrapezoid çekirdek olmak üzere birkaç beyin sapı bölgesine atfedilir.</div>
  <div class="note plain" style="margin-top:10px"><b>Atlas notu · serebral vazodilatasyon.</b> Kitaptaki "kan akımı artışı merkezi kemoreseptör mekanizmasını güçlendirir" ifadesi deneysel bilgiyle ters yöndedir. Beyin dokusu CO₂'yi kendi metabolizmasıyla da üretir ve doku PCO₂'si arteriyel PCO₂'nin üzerindedir. Kan akımı arttığında bu CO₂ daha hızlı uzaklaştırılır (yıkanma, <i>washout</i>); kemoreseptör çevresindeki PCO₂ ve H⁺ artışı sınırlanır, yani merkezi uyarı güçlenmez, körelir. Serebral damarların CO₂ yanıtı ilaçla (ör. indometazin) azaltıldığında CO₂'ye ventilatuvar yanıtın arttığı gösterilmiştir. Serebral damar tepkiselliği bu nedenle merkezi kemorefleksi sönümleyen bir negatif geri bildirim olarak düşünülmelidir.</div>
</section>

<section class="wrap blk ders-sec" id="d22-kronik">
  <h2>Hiperkapni kronikleşirse ne olur?</h2>
  <div class="blk-body">
    <p>Kronik obstrüktif akciğer hastalığı (KOAH) olan hastaların bir alt grubunda görüldüğü gibi hiperkapni kronikleşirse, V̇<sub>E</sub>'deki artış sürdürülemez ve V̇<sub>E</sub> normale yakın düzeye döner. Altta yatan mekanizma şöyledir: pH değişimini tamponlamak için BOS'a etkin biçimde HCO₃⁻ salgılanır; BOS pH'sı normale döner, merkezi kemoreseptörler artık uyarılmaz ve solunum merkezinin etkinliği azalır; böbrekler de daha fazla HCO₃⁻ geri emerek arteriyel pH'yı normale döndürür ve karotis cisimciklerinin solunum merkezini uyarması azalır. [[K1 s. 94]]</p>
    <p>Bu telafi mekanizmalarının sonucu <b>CO₂'ye duyarlılığın kaybıdır</b>: bu hastalar yalnızca hipoksemik solunum dürtüsüne bağımlı hale gelir. Kitap bu nedenle kronik hiperkapnili KOAH hastalarına oksijen verilirken dikkatli olunmasını söyler; teorik olarak bu hastaların solunumunun durması riski vardır. [[K1 s. 94]]</p>
  </div>
  <p class="small muted" style="margin-top:10px">Yukarıdaki <b>merkezi kemoreseptör bileşeninin 5. adımı</b> bu uyumu adım adım gösterir. [[K1 s. 94]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kronik hiperkapnili hastada oksijen verilmesiyle PaCO₂'nin yükselmesi gerçek bir olaydır, ama nedeni yalnız hipoksemik dürtünün ortadan kalkması değildir: hipoksik pulmoner vazokonstriksiyonun gevşemesiyle ventilasyon–perfüzyon uyumsuzluğunun artması ve Haldane etkisi de katkıda bulunur. Uygulamada doğru yaklaşım oksijeni esirgemek değil, titre ederek vermektir: bu hastalarda hedef satürasyon aralığı tipik olarak %88–92'dir. Hipoksemiye izin vermek, PaCO₂'nin bir miktar yükselmesinden daha büyük bir tehlikedir.</div>
</section>

<section class="wrap blk ders-sec" id="d22-mekano">
  <h2>Mekanoreseptörler</h2>
  <div class="blk-body">
    <p>Mekanoreseptörlerin ventilasyonun uyarılmasına katkısı tartışmalıdır. Kitabın dipnotu bu tartışmanın nedenini verir: bir dizi mekanoreseptörün ventilasyonun kontrolüne katkıda bulunduğu düşünülüyordu, ancak denervasyonlu nakledilmiş akciğerlerin normal bir ventilatuvar yanıt gösterdiğinin ortaya konması bu görüşü sorgulanır kıldı. [[K1 s. 94]]</p>
    <p><b>Akciğer gerilme reseptörleri</b> bronşiyal düz kasta bulunur. Akciğerin aşırı şişmesi bu reseptörleri uyarır; impulsları vagus siniriyle apnöstik merkeze taşınır ve inspirasyon derinliği azalır. Buna <b>Hering–Breuer refleksi</b> denir. Normal fizyolojik solunum sırasında refleksi tetikleyecek kadar gerilme oluşması pek olası değildir; ancak gerilme yanıtları yenidoğanlarda ve ventilatöre bağlı hastalarda önemli olabilir. <b>Kas iğciklerinin</b> ise egzersize ventilatuvar yanıtı başlattığı düşünülür. [[K1 s. 94–95]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Hering–Breuer refleksinin vagal afferentleri beyin sapına nucleus tractus solitarius (DRG bölgesi) üzerinden girer; kitabın "apnöstik merkeze taşınır" ifadesi klasik şemanın kısaltmasıdır. Erişkinde refleksin eşiği yüksektir (yaklaşık 1–1,5 L tidal hacim), bu yüzden istirahat solunumunda rol oynamaz; mekanik ventilasyonda büyük tidal hacimlerle ve yenidoğanda belirir. Egzersiz hiperpnesinin mekanizması da yerleşmiş değildir: kas iğciklerinin yanında merkezi komut ve kastan gelen grup III/IV afferentleri sayılır.</div>
</section>

<section class="wrap blk ders-sec" id="d22-diger">
  <h2>Solunum merkezine gelen öbür girdiler</h2>
  <p class="intro">Solunum merkezi periferik ve merkezi sinir sisteminden başka girdiler de alır. [[K1 s. 95]]</p>
  <div class="cols cols-3" style="margin:14px 0">
    <div class="card clin"><span class="tag clin">J-reseptörleri</span><h3 style="margin-top:8px">Jukstakapiller reseptörler</h3><p>Alveol duvarlarındaki miyelinsiz C lifleridir. Etkinleşmeleri ventilasyonda artışa, dispne hissine, bradikardiye ve hipotansiyona yol açar. Pulmoner ödem ve pulmoner embolilerle uyarıldıkları düşünülür. [[K1 s. 95]]</p></div>
    <div class="card"><span class="tag">İrritan reseptörler</span><h3 style="margin-top:8px">Hava yolu epiteli</h3><p>Zararlı gazların varlığında bronkokonstriksiyona yol açar ve ventilasyonu uyarır. [[K1 s. 95]]</p></div>
    <div class="card"><span class="tag">Ağrı</span><h3 style="margin-top:8px">Ağrı reseptörleri</h3><p>Etkinleşmeleri ventilasyonu uyarır. [[K1 s. 95]]</p></div>
    <div class="card"><span class="tag">Talamus</span><h3 style="margin-top:8px">Çekirdek sıcaklık</h3><p>Çekirdek vücut sıcaklığındaki artış ventilasyonu uyarır. [[K1 s. 95]]</p></div>
    <div class="card"><span class="tag">Limbik sistem</span><h3 style="margin-top:8px">Duygu durumu</h3><p>Aşırı duygusal durumlar solunum merkezini uyarır ve hiperventilasyona yol açar. [[K1 s. 95]]</p></div>
    <div class="card basic"><span class="tag basic">Serebral korteks</span><h3 style="margin-top:8px">İstemli kontrol ve kırılma noktası</h3><p>Öbür girdilerin hepsi istemli düşünceyle geçici olarak baskılanabilir. Ama kişi sonsuza kadar nefesini tutamaz: kısa bir apne döneminden sonra hipoksemi ya da hiperkapninin kemoreseptörleri uyarması istemli kontrolü aşar. Buna <b>kırılma noktası</b> denir. [[K1 s. 95]]</p></div>
  </div>
  <p class="small muted">Kitap nefes tutmayı kırılma noktasıyla, egzersizi kas iğcikleriyle, anestezik ajanları da CO₂ yanıt eğrisinin sağa kaymasıyla kısaca geçer [[K1 s. 95–96]]; bu üç konu, bu bölümün ardından gelen ek derste ayrıntılı işlenir.</p>
</section>

<section class="wrap blk ders-sec" id="d22-hipoksi">
  <h2>Hipoksemiye ventilatuvar yanıt</h2>
  <div class="blk-body">
    <p>PaO₂ <b>8 kPa'nın</b> altına düştüğünde periferik kemoreseptörler solunum merkezini hızla uyarır ve V̇<sub>E</sub> belirgin biçimde artar. Bu ventilatuvar yanıt hiperkapni varlığında daha da güçlenir. Ancak şiddetli ve uzun süreli hipokseminin solunum merkezi üzerinde baskılayıcı etkisi vardır ve apneye yol açar. [[K1 s. 95]]</p>
  </div>
  <div class="viz" style="margin-top:16px">
    <div class="viz-head"><h3>Hipoksemiye ventilatuvar yanıt: 8 kPa eşiği ve sinerji</h3></div>
    <div data-viz="f22_hipoksi"></div>
    <p class="viz-cap" aria-live="polite"><b>Normokapni.</b> PaCO₂ 5,3 kPa iken PaO₂ 8 kPa'nın üstünde V̇<sub>E</sub> neredeyse değişmez; 8 kPa'nın altında dik bir artış başlar. Hiperkapni eğrisini ekleyerek sinerjiyi görün. [[K1 s. 95]]</p>
    <p class="viz-foot">Eğriler kitabın şeklinin niteliksel biçimini (8 kPa'da keskinleşen artış, hiperkapniyle yükselen ve dikleşen eğri) veren şematik bir modelden çizilir; eksenlerdeki birimler ve 8 kPa eşiği kitaptandır, ara değerler sayısal olarak kitapta yoktur. Normokapni 5,3 kPa, hiperkapni 8 kPa kitabın şeklindeki değerlerdir. [[K1 s. 95]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-co2">
  <h2>Hiperkapniye ventilatuvar yanıt</h2>
  <div class="blk-body">
    <p>Hiperkapnide solunum merkezi üç yolla uyarılır: her iki periferik kemoreseptör grubunu etkinleştiren <b>yüksek PaCO₂</b>; karotis cisimciklerini etkinleştiren <b>düşük arteriyel pH</b>; merkezi kemoreseptörleri çevreleyen ECF'nin pH'sını düşürerek bu reseptörleri etkinleştiren <b>yüksek BOS PCO₂'si</b>. [[K1 s. 95–96]]</p>
    <p>Ventilasyonun CO₂'ye yanıtı normal klinik sınırlar içinde, yani <b>PaCO₂ 5–10 kPa</b> arasında doğrusaldır. Hayvan deneyleri, ileri derecede hiperkapnide V̇<sub>E</sub>'nin azaldığını göstermiştir: eğrinin yüksek PaCO₂ ucunda solunum depresyonu vardır. [[K1 s. 96]]</p>
  </div>
  <div class="viz" style="margin-top:16px">
    <div class="viz-head"><h3>CO₂ yanıt eğrisi: doğrusal bölge, depresyon ve sağa kayma</h3></div>
    <div data-viz="f22_co2"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal yanıt.</b> PaCO₂ 5–10 kPa arasında V̇<sub>E</sub> ile PaCO₂ arasındaki ilişki doğrusaldır; daha yüksek PaCO₂ değerlerinde yanıt tepe yapıp düşer. Anestezik ajan ve opioid düğmeleriyle eğrinin sağa kaymasını görün. [[K1 s. 96]]</p>
    <p class="viz-foot">Şematik model: eğrinin eğimi, tepe değeri ve yüksek PaCO₂'deki düşüşün biçimi kitabın şeklindeki eksen ölçeğini izler; ölçülmüş normal değerler değildir ve kitapta sayı olarak yoktur. Kitaptan gelenler: doğrusal aralık 5–10 kPa, ileri hiperkapnide V̇<sub>E</sub>'nin azalması (hayvan deneyleri) ve anestezik ajanlarla opioidlerin eğriyi sağa kaydırması. Kaymanın büyüklüğü (1,5 ve 2,5 kPa) şematiktir; kitap eğimin değiştiğini söylemediği için eğri biçimi korunur. [[K1 s. 95–96]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-ilac">
  <h2>Klinik önem: ilaçlar ve ventilasyonun kontrolü</h2>
  <div class="card clin">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Anestezik ajanlar, opioidler ve doksapram</h3>
    <p><b>Bütün anestezik ajanlar</b> hem solunum merkezi hem periferik kemoreseptörler üzerinde baskılayıcı etkiye sahiptir; hem hiperkapniye hem hipoksemiye ventilatuvar yanıt azalır. Grafik olarak anestezik ajanlar CO₂ yanıt eğrisini sağa kaydırır. [[K1 s. 96]]</p>
    <p><b>Opioidlerin</b> kitaba göre periferik ya da merkezi kemoreseptörlerin hipoksemiye veya hiperkapniye yanıtı üzerinde etkisi yoktur; buna karşılık medüller solunum merkezi üzerinde belirgin baskılayıcı etkileri vardır. Böylece hem hipoksemiye hem hiperkapniye ventilatuvar yanıt körelir ve CO₂ yanıt eğrisi sağa kayar. [[K1 s. 96]]</p>
    <p>Solunum uyarıcısı <b>doksapram</b> periferik kemoreseptörlerde etki gösterir; kitap mekanizmanın belirsiz olduğunu yazar. [[K1 s. 96]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> İki noktada kitabın anlatımı güncel bilgiyle örtüşmez. Opioidler yalnız beyin sapı solunum ağını (pre-Bötzinger kompleksi, Kölliker–Fuse çekirdeği) baskılamakla kalmaz; karotis cisimciğinde de µ-opioid reseptörleri vardır ve periferik kemorefleks de körelir. Doksapramın etkisi de artık belirsiz değildir: karotis cisimciği glomus hücrelerindeki TASK ailesinden potasyum kanallarını inhibe ederek hücreyi depolarize eder; yüksek dozlarda merkezi etkisi de vardır. Sınavda kitabın ifadeleri beklenir, ama mekanizma sorulursa bu ayrımı bilmek işe yarar.</div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><span class="tag">Bağlantı · Bölüm 25</span><h3 style="margin-top:8px">Ventilatuvar yetmezlik</h3><p>Tip 2 solunum yetmezliğinin nedenlerinden biri solunum merkezinin uygun yanıtı verememesidir: opioidler ya da genel anestezi ile merkezin baskılanması, ya da solunum kası yorgunluğunu önlemek üzere merkezin yüksek PaCO₂'ye refleks duyarsızlaşması. [[K1 s. 104]]</p></div>
    <div class="card"><span class="tag">Bağlantı · Bölüm 26</span><h3 style="margin-top:8px">Anestezi ve akciğer</h3><p>Volatil ajanlar solunum sayısını artırıp tidal hacmi azaltır ve hiperkapniye yanıtı köreltir (N₂O'nun etkisi yoktur). Propofolün periferik kemoreseptörlerin hipoksemiye yanıtını ortadan kaldırdığı düşünülür. Opioidler solunum sayısını azaltır ve hiperkapni yanıtını köreltir. [[K1 s. 107]]</p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok eşleştirmeler ve sayılar üzerinden sorulur: dört beyin sapı bölgesi ve işlevleri, pre-Bötzinger kompleksinin yeri, hangi cisimciğin afferentinin hangi sinirle gittiği, hipoksemiye yanıt veren tek kemoreseptör grubu, parsiyel basınç–içerik ayrımı (anemi ve karbonmonoksit uyarmaz), %20–%80 bölüşümü ve 1–3 saniyelik yanıt süresi, asidemiyle yalnız karotis cisimciklerinin uyarılması, kan–beyin bariyerinin CO₂'yi geçirip H⁺'yı geçirmemesi, BOS'un düşük tamponlama kapasitesi, kronik hiperkapnideki HCO₃⁻ uyumu, 8 kPa eşiği, 5–10 kPa doğrusal aralığı ve ilaçların eğriyi sağa kaydırması. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz22-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz22-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz22-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d22-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Ventilasyon nasıl kontrol edilir? Hiperkapniye ventilatuvar yanıtı çizin ve anestezik ajanlarla opioidlerin bu eğriyi nasıl değiştirdiğini anlatın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Çerçeveyi kurun.</b> Ventilasyon nöronal geri bildirim döngüleriyle kontrol edilir: algılayıcılar (merkezi ve periferik kemoreseptörler, pulmoner gerilme reseptörleri, J-reseptörleri, irritan reseptörler, eklem propriyoseptörleri), kontrol merkezi (beyin sapındaki solunum çekirdekleri) ve efektörler (solunum kasları). [[K1 s. 93]]</li>
    <li><b>Kontrol merkezini dört bölgeyle anlatın.</b> DRG: diyafram, normal tidal inspirasyon. VRG: interkostal kaslar, zorlu ekspirasyon ve inspirasyon gücü; pre-Bötzinger kompleksi ritim oluşturucudur. Apnöstik merkez: aşırı genişlemeyi önler. Pnömotaksik merkez: inspirasyon derinliğini azaltır, örüntüyü ince ayarlar, solunum sayısını artırabilir. [[K1 s. 93]]</li>
    <li><b>Periferik kemoreseptörler.</b> Karotis cisimcikleri (bifurkasyon, glossofaringeal sinir, solunumsal yanıtların başlıcası) ve aort cisimcikleri (aort kavsi, vagus, daha çok kardiyovasküler). Uyaranlar: düşük PaO₂ (parsiyel basınç, içerik değil), yüksek PaCO₂ (yanıtın %20'si, ama 1–3 s ile en hızlısı), asidemi (yalnız karotis), hipotansiyon. [[K1 s. 93–94]]</li>
    <li><b>Merkezi kemoreseptörler.</b> Medullanın ventral yüzeyi, VRG'ye yakın ama ondan ayrı. CO₂ bariyeri geçer, H⁺ ve HCO₃⁻ geçemez; CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻; H⁺ reseptörü uyarır. BOS'ta tamponlama azdır, bu yüzden duyarlılık yüksektir. Solunumsal asidoz metabolik asidozdan daha güçlü uyarır; hipoksemiyle uyarılmazlar ve periferik kemoreseptörler yoksa hipoksemi merkezi baskılar. Girdiler sinerjiktir. Serebral vazodilatasyon sorulursa kitabın "güçlendirir" ifadesini ve yukarıdaki Atlas notundaki yıkanma etkisini birlikte söyleyin. [[K1 s. 94]]</li>
    <li><b>Öbür girdileri kısa geçin.</b> Mekanoreseptörlerin katkısı tartışmalıdır (nakledilmiş denervasyonlu akciğerlerde yanıt normaldir); Hering–Breuer refleksi, kas iğcikleri; J-reseptörleri, irritan reseptörler, ağrı, talamus (sıcaklık), limbik sistem, serebral korteks ve kırılma noktası. [[K1 s. 94–95]]</li>
    <li><b>İki yanıtı tanımlayın.</b> Hipoksemi: PaO₂ 8 kPa'nın altında periferik kemoreseptörler hızla uyarır, hiperkapni yanıtı güçlendirir, şiddetli ve uzun süreli hipoksemi merkezi baskılayıp apneye yol açar. Hiperkapni: yüksek PaCO₂, düşük arteriyel pH ve yüksek BOS PCO₂'si uyarır; yanıt 5–10 kPa arasında doğrusaldır, ileri hiperkapnide azalır. [[K1 s. 95–96]]</li>
    <li><b>İlaçlarla ve klinikle bitirin.</b> Bütün anestezik ajanlar solunum merkezini ve periferik kemoreseptörleri baskılar; opioidler esas olarak medüller merkezi baskılar; ikisi de CO₂ yanıt eğrisini sağa kaydırır. Doksapram periferik kemoreseptörlerde etkir. Kronik hiperkapnide (bir alt grup KOAH hastası) BOS'a HCO₃⁻ salgılanması ve böbrek uyumu CO₂ duyarlılığını kaybettirir; hasta hipoksemik dürtüye bağımlı kalır ve oksijen verilirken dikkat gerekir. [[K1 s. 94, 96]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada iki çizim verimlidir. Birincisi döngü şemasıdır: algılayıcılar → kontrol merkezi (dört bölgeyi kutu içinde adlandırın) → solunum kasları → alveoler ventilasyon → PaCO₂, geri bildirim okuyla algılayıcılara. İkincisi CO₂ yanıt eğrisidir: yatay eksen PaCO₂ (kPa), dikey eksen V̇<sub>E</sub> (L/dk); 5–10 kPa arasını düz bir doğru olarak çizin, yüksek PaCO₂ ucunda eğriyi tepe yaptırıp düşürün ("solunum depresyonu") ve yanına sağa kaymış kesikli bir eğri ekleyip "anestezik ajanlar ve opioidler" diye adlandırın. İstenirse yanına hipoksemi eğrisini çizin: 8 kPa'da keskinleşen artış, üstünde hiperkapniyle yükselmiş ikinci eğri. [[K1 s. 95–96]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Karotis ve aort cisimciklerinin afferentleri hangi sinirlerle gider? Anemik bir hastada periferik kemoreseptörler neden uyarılmaz? Plazma pH'sı düştüğünde ventilasyon nasıl artar, hangi reseptör üzerinden? Diyabetik ketoasidozda Kussmaul solunumunun yolu nedir? Kronik hiperkapnili KOAH hastasına oksijen verirken neye dikkat edersiniz? Hiperkapnide serebral kan akımının artması merkezi yanıtı nasıl etkiler? Nefes tutmanın kırılma noktasını ne belirler? Doksapram nerede etki eder? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 93–96]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Ventilasyon geri bildirim döngüleriyle kontrol edilir: algılayıcılar (merkezi ve periferik kemoreseptörler, pulmoner gerilme reseptörleri, J-reseptörleri, irritan reseptörler, eklem propriyoseptörleri), kontrol merkezi (beyin sapı solunum çekirdekleri) ve efektörler (solunum kasları). [[K1 s. 93]]</li>
    <li>Dört bölge: DRG diyaframı ve normal tidal inspirasyonu; VRG interkostal kasları, zorlu ekspirasyonu ve inspirasyon gücünü (içinde ritim oluşturucu pre-Bötzinger kompleksi); apnöstik merkez aşırı genişlemenin önlenmesini; pnömotaksik merkez derinliğin azaltılmasını ve örüntünün ince ayarını sağlar. [[K1 s. 93]]</li>
    <li>Karotis cisimcikleri (glossofaringeal sinir) solunumsal yanıtların başlıca algılayıcısıdır; aort cisimcikleri (vagus) daha çok kardiyovasküler yanıtlarda rol oynar. [[K1 s. 93]]</li>
    <li>Periferik kemoreseptörler düşük PaO₂, yüksek PaCO₂, asidemi (yalnız karotis) ve hipotansiyonla uyarılır; uyaran parsiyel basınçtır, içerik değil (anemi ve CO zehirlenmesi uyarmaz). Hiperkapni yanıtının %20'sinden sorumludurlar ama 1–3 saniyeyle en hızlı yanıtı verirler. [[K1 s. 93–94]]</li>
    <li>Merkezi kemoreseptörler medullanın ventral yüzeyindedir ve yalnız BOS pH'sının düşmesiyle uyarılır: CO₂ bariyeri geçer, H⁺ ve HCO₃⁻ geçemez. BOS'un düşük protein içeriği tamponlamayı azaltır ve duyarlılığı artırır; solunumsal asidoz metabolik asidozdan daha güçlü uyarır (derin metabolik asidozda yol karotis cisimcikleridir: Kussmaul solunumu). [[K1 s. 94]]</li>
    <li>Merkezi kemoreseptörler hipoksemiyle uyarılmaz; periferik kemoreseptörler yoksa hipoksemi solunum merkezini baskılar. Periferik ve merkezi girdiler sinerjiktir. [[K1 s. 94]]</li>
    <li>Kronik hiperkapnide BOS'a HCO₃⁻ salgılanması ve böbreğin HCO₃⁻ geri emmesi pH'ları normale döndürür; CO₂ duyarlılığı kaybolur, hasta hipoksemik dürtüye bağımlı kalır ve oksijen verilirken dikkat gerekir. [[K1 s. 94]]</li>
    <li>PaO₂ 8 kPa'nın altında periferik kemoreseptörler V̇<sub>E</sub>'yi hızla artırır (hiperkapni bu yanıtı güçlendirir); şiddetli ve uzun süreli hipoksemi apneye yol açar. CO₂ yanıtı 5–10 kPa arasında doğrusaldır, ileri hiperkapnide azalır; anestezik ajanlar ve opioidler eğriyi sağa kaydırır, doksapram periferik kemoreseptörlerde etkir. [[K1 s. 95–96]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="22"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/21">← Bölüm 21 · Solunum işi</a>
    <a href="#/dersler/fizyoloji/ek22">Sonraki: Ek ders · Nefes tutma, egzersiz ve anestezik ajanların ventilasyon kontrolüne etkisi →</a>
  </nav>
</section>`,
};
