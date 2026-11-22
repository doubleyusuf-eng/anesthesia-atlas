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
  ['d22-merkez', 'Döngü ve solunum merkezi'], ['d22-periferik', 'Periferik kemoreseptörler'],
  ['d22-merkezi', 'Merkezi kemoreseptörler'], ['d22-girdiler', 'Öbür girdiler'],
  ['d22-hipoksi', 'Hipoksemi yanıtı'], ['d22-co2', 'Hiperkapni ve ilaçlar'],
  ['d22-p1', 'Part I'], ['d22-p2', 'Part II'], ['d22-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/22'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 22', baslik: 'Ventilasyonun kontrolü',
  lede: 'Solunum merkezi, kemoreseptörler ve öbür girdiler; hipoksemiye ve hiperkapniye ventilatuvar yanıt ve ilaçların bu yanıtı nasıl değiştirdiği. [[K1 s. 93–96]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D22_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d22-merkez">
  <h2>Geri bildirim döngüsü ve solunum merkezi</h2>
  <p class="intro">Ventilasyon nöronal geri bildirim döngüleriyle kontrol edilir: algılayıcılar → beyin sapındaki solunum çekirdekleri (kontrol merkezi) → solunum kasları (efektörler). [[K1 s. 93]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Döngü ve dört bölge: hangi bölge neyi yapar?</h3></div>
    <div data-viz="f22_devre"></div>
    <p class="viz-cap" aria-live="polite"><b>Döngü.</b> Algılayıcı → kontrol merkezi → solunum kasları; artan alveoler ventilasyon PaCO₂'yi düşürür. Bölge düğmeleriyle dört bölgenin katkısını görün. [[K1 s. 93]]</p>
    <p class="viz-foot">Şematik çizim; solunum örüntüsü eğrileri de şematiktir (kitap sayı vermez). [[K1 s. 93, 95]]</p>
  </div>
  <div class="blk-body">
    <p>Algılayıcılar: merkezi ve periferik kemoreseptörler, pulmoner gerilme reseptörleri, J-reseptörleri, irritan reseptörler ve eklem propriyoseptörleri. Merkeze gelen başlıca girdiler periferik ve merkezi kemoreseptörler, mekanoreseptörler ve bronşiyal irritan reseptörlerdir. [[K1 s. 93]]</p>
    <ul>
      <li><b>Dorsal solunum grubu (DRG):</b> öncelikle diyaframı kontrol eder; normal tidal inspirasyon.</li>
      <li><b>Ventral solunum grubu (VRG):</b> interkostal kaslar; zorlu ekspirasyonu başlatır, inspirasyon gücünü artırır. İçinde ritim oluşturucu olduğu düşünülen <b>pre-Bötzinger kompleksi</b> vardır (dipnot: bu nöronlar sinoatriyal düğümdeki gibi hiperpolarizasyonla etkinleşen siklik nükleotit kapılı kanallar taşır).</li>
      <li><b>Apnöstik merkez:</b> DRG etkinliğini değiştirerek akciğerin aşırı genişlemesini önler.</li>
      <li><b>Pnömotaksik merkez:</b> DRG impulslarını değiştirip inspirasyon derinliğini azaltır, örüntüyü ince ayarlar; solunum sayısını artırabilir. [[K1 s. 93]]</li>
    </ul>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-periferik">
  <h2>Periferik kemoreseptörler</h2>
  <p class="intro">Periferik kemoreseptörler arteriyel kanı izleyen en hızlı algılayıcılardır ve hipoksemiye yanıt veren tek kemoreseptörlerdir. [[K1 s. 93]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Periferik kemoreseptörler: uyaranı seçin, yanıtı izleyin</h3></div>
    <div data-viz="f22_periferik"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat.</b> Karotis ve aort cisimciklerinden bazal impuls akışı gelir. Bir uyaran seçin. [[K1 s. 93–94]]</p>
    <p class="viz-foot">Şematik impuls hızları; kitap boşalım sıklığı vermez. [[K1 s. 93–94]]</p>
  </div>
  <div class="blk-body">
    <p><b>Karotis cisimcikleri</b> karotis bifurkasyonundadır, afferentleri <b>glossofaringeal sinirle</b> gider; solunumsal yanıtlarda en önemlileridir. <b>Aort cisimcikleri</b> aort kavsindedir, afferentleri <b>vagusla</b> gider; kardiyovasküler yanıtlarda daha önemlidir. Ağırlıklarına oranla kan akımları çok yüksektir. [[K1 s. 93]]</p>
    <p>Uyaranlar: <b>düşük PaO₂</b> (uyaran parsiyel basınçtır, içerik değil: anemi ve karbonmonoksit zehirlenmesi uyarmaz); <b>yüksek PaCO₂</b> (hiperkapni yanıtının yalnız %20'si, kalan %80 merkezi; ama en hızlısı, 1–3 s); <b>asidemi</b> (pH &lt; 7,35; yalnız karotis); <b>hipotansiyon</b> (perfüzyon azalınca çıktı artar; septik şok gelişirken gaz değişimi bozulmadan solunum sayısının artması bundandır). [[K1 s. 93–94]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-merkezi">
  <h2>Merkezi kemoreseptörler ve kronik hiperkapni</h2>
  <p class="intro">Merkezi kemoreseptörler CO₂'yi, onun beyin sapında oluşturduğu H⁺ üzerinden algılar ve hiperkapni yanıtının çoğunu (%80) sağlar. [[K1 s. 93–94]]</p>
  <div class="viz">
    <div class="viz-head"><h3>CO₂ nasıl sinyale dönüşür? Kan, BOS ve kemoreseptör</h3></div>
    <div data-viz="f22_merkezi"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · CO₂ geçer.</b> CO₂ kan–beyin bariyerini serbestçe geçer; H⁺ ve HCO₃⁻ geçemez. Adımları izleyin. [[K1 s. 94]]</p>
    <p class="viz-foot">Şematik kesit. Normal BOS pH'sı 7,32, plazma 7,4 [[K1 s. 199]]; öbür pH ve V̇<sub>E</sub> değerleri şematiktir. [[K1 s. 94]]</p>
  </div>
  <div class="blk-body">
    <p>Reseptörler medullanın ventral yüzeyinde, VRG'ye yakın ama ondan ayrıdır ve yalnız BOS pH'sının düşmesiyle uyarılır. H⁺ ve HCO₃⁻ bariyeri geçemediği için plazma pH'sı ventilasyonu doğrudan etkilemez. CO₂ kandan BOS'a ve reseptörü çevreleyen ECF'ye geçer; CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻; H⁺ reseptörü uyarır. ECF pH'sı böylece PaCO₂'nin dolaylı ölçüsüdür: PaCO₂ arttıkça V̇<sub>E</sub> artar. [[K1 s. 94]]</p>
    <ul>
      <li>BOS'ta protein az, tamponlama az: BOS, PCO₂'deki küçük değişikliklere plazmadan duyarlıdır.</li>
      <li>Solunumsal asidoz metabolik asidozdan daha güçlü uyarır (CO₂ geçer, H⁺ geçemez). Derin metabolik asidozda (diyabetik ketoasidoz) yol karotis cisimcikleridir: Kussmaul solunumu.</li>
      <li>Kitaba göre hiperkapnideki serebral vazodilatasyon medulla kan akımını artırarak mekanizmayı güçlendirir.</li>
      <li>Hipoksemiyle uyarılmazlar; periferik kemoreseptörler yoksa hipoksemi merkezi <b>baskılar</b>.</li>
      <li>Periferik ve merkezi girdiler sinerjiktir: hipoksemi + hiperkapni yanıtı iki etkinin toplamından büyüktür. [[K1 s. 94]]</li>
    </ul>
    <p><b>Kronik hiperkapni</b> (KOAH hastalarının bir alt grubu, şekilde 5. adım): BOS'a etkin HCO₃⁻ salgılanır ve BOS pH'sı normale döner; böbrekler de HCO₃⁻ geri emip arteriyel pH'yı normale getirir, karotis uyarısı azalır. V̇<sub>E</sub> artışı sürmez, normale yakın döner; CO₂ duyarlılığı kaybolur ve hasta hipoksemik dürtüye bağımlı kalır. Kitap bu yüzden oksijen verirken dikkat ister: teorik olarak solunum durabilir. [[K1 s. 94]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · serebral vazodilatasyon.</b> Deneysel bilgi tersini gösterir: artan kan akımı dokuda üretilen CO₂'yi yıkar (<i>washout</i>), kemoreseptör çevresindeki H⁺ artışını sınırlar ve merkezi yanıtı köreltir. Serebral damar yanıtı ilaçla (indometazin) azaltılınca CO₂'ye ventilatuvar yanıt artar.</div>
  <div class="note plain" style="margin-top:10px"><b>Atlas notu · KOAH'ta oksijen.</b> Oksijenle PaCO₂ yükselmesinde hipoksik pulmoner vazokonstriksiyonun gevşemesi (V/Q uyumsuzluğu) ve Haldane etkisi de rol oynar. Doğru yaklaşım oksijeni esirgemek değil, titre etmektir (hedef SpO₂ tipik olarak %88–92).</div>
</section>

<section class="wrap blk ders-sec" id="d22-girdiler">
  <h2>Mekanoreseptörler ve öbür girdiler</h2>
  <p class="intro">Kemoreseptörlerin dışında solunum merkezi akciğerden, kaslardan ve beynin üst merkezlerinden de girdi alır; çoğu ventilasyonu artırır. [[K1 s. 94–95]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Solunum merkezine gelen öbür girdiler</h3></div>
    <div data-viz="f22_girdiler"></div>
    <p class="viz-cap">Bir girdiye dokunun: yeri, yolu ve ventilasyona etkisi. [[K1 s. 94–95]]</p>
    <p class="viz-foot">Şematik çizim; konumlar anatomik değildir.</p>
  </div>
  <div class="blk-body">
    <p><b>Mekanoreseptörlerin</b> katkısı tartışmalıdır: denervasyonlu nakledilmiş akciğerler normal ventilatuvar yanıt gösterir. <b>Akciğer gerilme reseptörleri</b> bronşiyal düz kastadır; aşırı şişme vagusla apnöstik merkeze iletilir ve inspirasyon derinliği azalır (<b>Hering–Breuer refleksi</b>). Normal solunumda tetiklenmesi pek olası değildir; yenidoğanda ve ventilatördeki hastada önemli olabilir. <b>Kas iğciklerinin</b> egzersize ventilatuvar yanıtı başlattığı düşünülür. [[K1 s. 94–95]]</p>
    <p><b>J-reseptörleri</b> alveol duvarındaki miyelinsiz C lifleridir: ventilasyon artışı, dispne, bradikardi ve hipotansiyon yapar; pulmoner ödem ve emboliyle uyarıldıkları düşünülür. <b>İrritan reseptörler</b> (hava yolu epiteli) zararlı gazlarda bronkokonstriksiyon yapar ve ventilasyonu uyarır. <b>Ağrı</b>, <b>talamus</b> (kitabın ifadesi; çekirdek sıcaklık artışı, sıcaklık merkezi hipotalamustur) ve <b>limbik sistem</b> (aşırı duygu → hiperventilasyon) ventilasyonu uyarır. <b>Serebral korteks</b> öbür girdileri istemli olarak geçici bastırabilir; ama kısa bir apneden sonra hipoksemi ya da hiperkapninin kemoreseptör uyarısı istemli kontrolü aşar: <b>kırılma noktası</b>. [[K1 s. 95]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-hipoksi">
  <h2>Hipoksemiye ventilatuvar yanıt</h2>
  <p class="intro">PaO₂ <b>8 kPa'nın</b> altına düşünce periferik kemoreseptörler solunum merkezini hızla uyarır ve V̇<sub>E</sub> belirgin artar. [[K1 s. 95]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Hipoksemiye ventilatuvar yanıt: 8 kPa eşiği ve sinerji</h3></div>
    <div data-viz="f22_hipoksi"></div>
    <p class="viz-cap" aria-live="polite"><b>Normokapni.</b> PaCO₂ 5,3 kPa iken 8 kPa'nın üstünde V̇<sub>E</sub> neredeyse değişmez, altında dik artar. Hiperkapni eğrisini ekleyin. [[K1 s. 95]]</p>
    <p class="viz-foot">Şematik model; 8 kPa eşiği, normokapni 5,3 ve hiperkapni 8 kPa kitabın şeklinden. [[K1 s. 95]]</p>
  </div>
  <p style="margin-top:12px">Hiperkapni bu yanıtı güçlendirir (eğri yükselir). Şiddetli ve uzun süreli hipoksemi ise solunum merkezini baskılar ve apneye yol açar. [[K1 s. 95]]</p>
</section>

<section class="wrap blk ders-sec" id="d22-co2">
  <h2>Hiperkapniye yanıt ve ilaçlar</h2>
  <p class="intro">Ventilasyonun CO₂'ye yanıtı normal klinik sınırlarda (PaCO₂ <b>5–10 kPa</b>) doğrusaldır; anestezik ajanlar ve opioidler bu eğriyi sağa kaydırır. [[K1 s. 96]]</p>
  <div class="viz">
    <div class="viz-head"><h3>CO₂ yanıt eğrisi: doğrusal bölge, depresyon ve sağa kayma</h3></div>
    <div data-viz="f22_co2"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal yanıt.</b> 5–10 kPa arası doğrusal; daha yukarıda yanıt tepe yapıp düşer. İlaç düğmeleriyle sağa kaymayı görün. [[K1 s. 96]]</p>
    <p class="viz-foot">Şematik model; eğim, tepe ve kayma büyüklüğü (1,5 ve 2,5 kPa) kitapta sayı olarak yoktur. [[K1 s. 95–96]]</p>
  </div>
  <div class="blk-body">
    <p>Hiperkapnide merkez üç yolla uyarılır: <b>yüksek PaCO₂</b> (her iki periferik kemoreseptör), <b>düşük arteriyel pH</b> (karotis) ve <b>yüksek BOS PCO₂'si</b> (ECF pH'sı düşer, merkezi kemoreseptörler). Hayvan deneylerinde ileri hiperkapnide V̇<sub>E</sub> azalır. [[K1 s. 95–96]]</p>
    <p><b>Bütün anestezik ajanlar</b> solunum merkezini ve periferik kemoreseptörleri baskılar; hiperkapni ve hipoksemi yanıtları azalır. <b>Opioidler</b> kitaba göre kemoreseptörlerin yanıtını etkilemez ama medüller merkezi belirgin baskılar; iki yanıt da körelir. Solunum uyarıcısı <b>doksapram</b> periferik kemoreseptörlerde etkir; kitaba göre mekanizması belirsizdir. [[K1 s. 96]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Karotis cisimciğinde µ-opioid reseptörleri vardır; opioidler periferik kemorefleksi de köreltir. Doksapram glomus hücrelerindeki TASK potasyum kanallarını inhibe ederek etkir; yüksek dozda merkezi etkisi de vardır.</div>
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
    <li><b>Kontrol merkezini dört bölgeyle anlatın.</b> DRG: diyafram, normal tidal inspirasyon. VRG: interkostal kaslar, zorlu ekspirasyon ve inspirasyon gücü; pre-Bötzinger kompleksinin ritim oluşturucu olduğu düşünülür. Apnöstik merkez: aşırı genişlemeyi önler. Pnömotaksik merkez: inspirasyon derinliğini azaltır, örüntüyü ince ayarlar, solunum sayısını artırabilir. [[K1 s. 93]]</li>
    <li><b>Periferik kemoreseptörler.</b> Karotis cisimcikleri (bifurkasyon, glossofaringeal sinir, solunumsal yanıtların başlıcası) ve aort cisimcikleri (aort kavsi, vagus, daha çok kardiyovasküler). Uyaranlar: düşük PaO₂ (parsiyel basınç, içerik değil), yüksek PaCO₂ (yanıtın %20'si, ama 1–3 s ile en hızlısı), asidemi (yalnız karotis), hipotansiyon. [[K1 s. 93–94]]</li>
    <li><b>Merkezi kemoreseptörler.</b> Medullanın ventral yüzeyi, VRG'ye yakın ama ondan ayrı. CO₂ bariyeri geçer, H⁺ ve HCO₃⁻ geçemez; CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻; H⁺ reseptörü uyarır. BOS'ta tamponlama azdır, bu yüzden duyarlılık yüksektir. Solunumsal asidoz metabolik asidozdan daha güçlü uyarır; hipoksemiyle uyarılmazlar ve periferik kemoreseptörler yoksa hipoksemi merkezi baskılar. Girdiler sinerjiktir. Serebral vazodilatasyon sorulursa kitabın "güçlendirir" ifadesini ve yukarıdaki Atlas notundaki yıkanma etkisini birlikte söyleyin. [[K1 s. 94]]</li>
    <li><b>Öbür girdileri kısa geçin.</b> Mekanoreseptörlerin katkısı tartışmalıdır (nakledilmiş denervasyonlu akciğerlerde yanıt normaldir); Hering–Breuer refleksi, kas iğcikleri; J-reseptörleri, irritan reseptörler, ağrı, talamus (sıcaklık), limbik sistem, serebral korteks ve kırılma noktası. [[K1 s. 94–95]]</li>
    <li><b>İki yanıtı tanımlayın.</b> Hipoksemi: PaO₂ 8 kPa'nın altında periferik kemoreseptörler hızla uyarır, hiperkapni yanıtı güçlendirir, şiddetli ve uzun süreli hipoksemi merkezi baskılayıp apneye yol açar. Hiperkapni: yüksek PaCO₂, düşük arteriyel pH ve yüksek BOS PCO₂'si uyarır; yanıt 5–10 kPa arasında doğrusaldır, ileri hiperkapnide azalır. [[K1 s. 95–96]]</li>
    <li><b>İlaçlarla ve klinikle bitirin.</b> Bütün anestezik ajanlar solunum merkezini ve periferik kemoreseptörleri baskılar; opioidler esas olarak medüller merkezi baskılar; ikisi de CO₂ yanıt eğrisini sağa kaydırır. Doksapram periferik kemoreseptörlerde etkir. Kronik hiperkapnide (bir alt grup KOAH hastası) BOS'a HCO₃⁻ salgılanması ve böbrek uyumu CO₂ duyarlılığını kaybettirir; hasta hipoksemik dürtüye bağımlı kalır ve oksijen verilirken dikkat gerekir. [[K1 s. 94, 96]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada iki çizim verimlidir. Birincisi döngü şemasıdır: algılayıcılar → kontrol merkezi (dört bölgeyi kutu içinde adlandırın) → solunum kasları → alveoler ventilasyon → PaCO₂, geri bildirim okuyla algılayıcılara. İkincisi CO₂ yanıt eğrisidir: yatay eksen PaCO₂ (kPa), dikey eksen V̇<sub>E</sub> (L/dk); 5–10 kPa arasını düz bir doğru olarak çizin, yüksek PaCO₂ ucunda eğriyi tepe yaptırıp düşürün ("solunum depresyonu") ve yanına sağa kaymış kesikli bir eğri ekleyip "anestezik ajanlar ve opioidler" diye adlandırın. İstenirse yanına hipoksemi eğrisini çizin: 8 kPa'nın altında keskinleşen artış ve hiperkapniyle yukarı kaymış ikinci bir eğri. [[K1 s. 95–96]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Karotis ve aort cisimciklerinin afferentleri hangi sinirlerle gider? Anemik bir hastada periferik kemoreseptörler neden uyarılmaz? Plazma pH'sı düştüğünde ventilasyon nasıl artar, hangi reseptör üzerinden? Diyabetik ketoasidozda Kussmaul solunumunun yolu nedir? Kronik hiperkapnili KOAH hastasına oksijen verirken neye dikkat edersiniz? Hiperkapnide serebral kan akımının artması merkezi yanıtı nasıl etkiler? Nefes tutmanın kırılma noktasını ne belirler? Doksapram nerede etki eder? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 93–96]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d22-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Ventilasyon geri bildirim döngüleriyle kontrol edilir: algılayıcılar (merkezi ve periferik kemoreseptörler, pulmoner gerilme reseptörleri, J-reseptörleri, irritan reseptörler, eklem propriyoseptörleri), kontrol merkezi (beyin sapı solunum çekirdekleri) ve efektörler (solunum kasları). [[K1 s. 93]]</li>
    <li>Dört bölge: DRG diyaframı ve normal tidal inspirasyonu; VRG interkostal kasları, zorlu ekspirasyonu ve inspirasyon gücünü (içinde ritim oluşturucu olduğu düşünülen pre-Bötzinger kompleksi); apnöstik merkez aşırı genişlemenin önlenmesini; pnömotaksik merkez derinliğin azaltılmasını ve örüntünün ince ayarını sağlar. [[K1 s. 93]]</li>
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
