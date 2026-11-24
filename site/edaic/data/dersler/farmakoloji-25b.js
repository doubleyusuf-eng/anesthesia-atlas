/* Farmakoloji · Bölüm 25 · Ders 25b: Oral antidiyabetikler ve diyabetik hastanın perioperatif bakımı (K3 s. 393–400, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far25b-1'] = {
  no: 1, kok: 'Akarboz, metformin ve MALA mekanizması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 393–394]]',
  onermeler: [
    { t: 'Akarboz sükraz üzerinde spesifik kompetitif α-glukozidaz inhibitörüdür ve hipoglisemi geliştiğinde hastaya polisakkarit değil oral glukoz verilmelidir.', d: true, n: 'Doğru. Polisakkaritlerin monosakkaritlere parçalanmasını önlediği için oral polisakkaritler hipoglisemiyi düzeltemez; ayrıca kolonik bakterilerle borborigmus, gaz, ishal ve geçici transaminaz artışı görülebilir. [[K3 s. 393]]' },
    { t: 'Metformin endojen insülinden tamamen bağımsız etki gösterdiğinden adacık işlevi tamamen yok olmuş ağır Tip 1 diyabette tek başına yeterlidir.', d: false, n: 'Yanlış. Periferik glukoz kullanımını artırmak için endojen insülin varlığına gereksinim duyar; bu nedenle yalnızca bir miktar işlevsel Langerhans adacığı olanlarda etkilidir. [[K3 s. 393]]' },
    { t: 'Metformin %60 oral biyoyararlanıma sahiptir, plazma proteinlerine yoğun bağlanır ve karaciğerde tamamen metabolize edildikten sonra safra ile atılır.', d: false, n: 'Yanlış. Plazma proteinlerine hiç bağlanmaz ve değişmeden idrarla atılır; dolayısıyla böbrek fonksiyon bozukluğu etkisini belirgin uzatır. [[K3 s. 394]]' },
    { t: 'Sağlıklı koşullarda da laktat/pirüvat oranı 10:1’dir; metformin hücresel glikolizi artırarak laktat üretimini çoğaltırken glukoneogenez inhibisyonuyla laktat klirensini azaltır.', d: true, n: 'Doğru. Sepsis/hipoperfüzyon, böbrek yetmezliği/hipovolemi, hepatik/renal laktat klirens bozukluğu ve pirüvat dehidrogenaz kofaktörü tiamin eksikliği MALA riskini artırır. [[K3 s. 393–394]]' },
    { t: 'Tiamin eksikliği (örneğin malnütrisyon veya alkolizmde), pirüvat dehidrogenaz basamağını kısıtlayarak laktat birikimini ağırlaştırabilir.', d: true, n: 'Doğru. Tiamin pirüvatın asetil KoA’ya dönüşümünde zorunlu kofaktördür; eksikliğinde Krebs döngüsüne yönlendirme kapasitesi azalır. [[K3 s. 394]]' },
  ],
};
VERI.sorular['far25b-2'] = {
  no: 2, kok: 'İnkretinler, meglitinidler, SGLT-2 inhibitörleri, sülfonilüreler ve TZD’ler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 394–397]]',
  onermeler: [
    { t: 'DPP-4 inhibitörleri arasında yer alan linagliptin böbrek yetmezliğinde genellikle doz ayarlaması gerektiren tek ajandır.', d: false, n: 'Yanlış. Sitagliptin ve alogliptin dahil grupta böbrek bozukluğunda genellikle doz ayarı gerekirken linagliptin bunun istisnasıdır. [[K3 s. 395]]' },
    { t: 'SGLT-2 inhibitörleri kullanan Tip 1 veya Tip 2 diyabetli bir hasta asidoz belirtileriyle başvurduğunda belirgin hiperglisemi olmasa bile keton testi yapılmalıdır.', d: true, n: 'Doğru. Öglisemik diyabetik ketoasidoz atipik seyrederek tanı karışıklığına ve gecikmeye yol açabilir. [[K3 s. 396]]' },
    { t: 'Repaglinid öğünlerden hemen önce alınır, β-hücre ATP bağımlı K⁺ kanallarını kapatır, %50 oral biyoyararlanıma, %98 protein bağlanmasına ve 1 saatlik t½’ye sahiptir.', d: true, n: 'Doğru. Hepatik CYP3A4 ile metabolize edildiğinden ilaç etkileşimlerine potansiyel olarak duyarlıdır. [[K3 s. 395]]' },
    { t: 'Pioglitazon tam glisemik etkisini saatler içinde gösterir ve kalp yetmezliği hastalarında sağkalım yararı için birinci basamakta verilir.', d: false, n: 'Yanlış. Nükleer PPARγ üzerinden gen düzenlediği için tam etki haftalar sürer; kalp yetmezliği riskinde artışla (özellikle insülinle) ilişkilidir ve kalp yetmezliğinde verilmemelidir. [[K3 s. 397]]' },
    { t: 'İkinci kuşak sülfonilüreler albümine noniyonik bağlandığından fenilbutazon, varfarin veya salisilat gibi anyonik ilaçlar tarafından tolbutamid kadar yerinden edilmez.', d: true, n: 'Doğru. Tolbutamid albümine iyonik bağlanır ve kolestatik sarılık, KCFT bozukluğu ile kan diskrazileriyle ilişkilendirilmiştir; simetidin metabolizmalarını inhibe eder. [[K3 s. 396]]' },
  ],
};
VERI.sorular['far25b-3'] = {
  no: 3, kok: 'Diyabetik hastanın perioperatif yönetimi', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 397–398]]',
  onermeler: [
    { t: 'İnsülin infüzyonları «kayan ölçek» (sliding scale) yerine «değişken hızlı intravenöz insülin infüzyonu» (VRIII) olarak adlandırılmalıdır.', d: true, n: 'Doğru. İlaç yönetimi yerleşik protokollere, atlanan öğün sayısına ve mevcut kontrole göre planlanır. [[K3 s. 397]]' },
    { t: 'Birden fazla öğün atlanacak uzun açlıkta hastaların çoğunda VRIII gerekir; hasta normalde uzun etkili insülin kullanıyorsa rebound hiperglisemiyi azaltmak için %20 doz azaltılarak VRIII ile sürdürülmelidir.', d: true, n: 'Doğru. Böylece VRIII sona erdiğinde ortaya çıkabilecek rebound hiperglisemi azaltılır. [[K3 s. 397]]' },
    { t: 'Ameliyat günü yalnızca bir öğün atlanacak kısa açlıkta sülfonilüreler ve SGLT-2 inhibitörleri ameliyat sabahı normal alınırken DPP-4 inhibitörlerine ara verilir.', d: false, n: 'Yanlış. Ameliyat günü 1 öğün atlanacaksa yalnızca GLP-1 agonistleri, DPP-4 inhibitörleri ve pioglitazon normal alınabilir; diğer insülin dışı ajanların tümüne ara verilir. [[K3 s. 397–398]]' },
    { t: 'VRIII infüzyonu başlandığında GLP-1 agonistleri dışındaki tüm insülin dışı glukoz düşürücü ilaçlara ara verilmelidir.', d: true, n: 'Doğru. Kitap VRIII kullanılıyorsa GLP-1 agonistleri hariç diğer insülin dışı ilaçların durdurulmasını belirtir. [[K3 s. 398]]' },
    { t: 'Metformin böbrek fonksiyonu bozuk ve İV kontrast alacak acil hastalarda bile tüm merkezlerce kesilmeden tam dozda sürdürülür.', d: false, n: 'Yanlış. Metformin tartışmalıdır: yalnızca böbrek fonksiyonu iyi ve İV kontrast almayan günübirlik cerrahi hastalarında azaltılmış dozla sürdürülebilir; birçok hastane tüm cerrahilerde ara verir. [[K3 s. 398]]' },
  ],
};

const A25B_NAV = [
  ['biguanid', 'Akarboz & Metformin'], ['inkretin', 'GLP-1 & DPP-4'], ['meg-sglt2', 'Meglitinid & SGLT-2'],
  ['su-tzd', 'SU & TZD'], ['periop', 'Perioperatif'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/25b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 25 · Ders 25b', baslik: 'Oral antidiyabetikler ve diyabetik hastanın perioperatif bakımı',
  lede: 'İnsülinlerin (<a href="#/dersler/farmakoloji/25a">25a</a>) ardından sekiz insülin dışı glukoz düşürücü sınıfın etki/toksisite profilleri ile diyabetik hastanın perioperatif VRIII ve oral ilaç yönetimi incelenir. [[K3 s. 393–398]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A25B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a25b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a25b-biguanid">
  <h2>Alfa glukozidaz inhibitörleri ve metformin (MALA)</h2>
  <p class="intro">Akarboz bağırsakta karbonhidrat sindirimini geciktirirken BK’deki tek biguanid olan metformin insülin duyarlılığını artırıp glukoneogenezi baskılar. [[K3 s. 393–394]]</p>
  <div class="viz"><div class="viz-head"><h3>Akarboz ve metformin: etki yolu ve laktik asidoz (MALA) dengesi</h3></div><div data-viz="a25b_biguanid"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Laktat fizyolojisi ve MALA risk faktörleri kitaptan. [[K3 s. 393–394]]</p></div>
  <ul class="ozet">
    <li><b>Akarboz.</b> Sükrazda spesifik, kompetitif intestinal α-glukozidaz inhibitörüdür; polisakkaritlerin emilebilir monosakkaritlere dönüşümünü önleyerek postprandiyal hiperglisemiyi azaltır. Anlamlı emilmez, sistemik etkisi azdır; kolona ulaşan karbonhidrat yükü borborigmus, flatulans ve diyare yapabilir, hepatik transaminazlar geçici yükselebilir. İnsülin ve diğer ilaçların hipoglisemisini artırabilir; <b>hipoglisemi tedavisinde polisakkarit değil oral glukoz kullanılmalıdır</b>. [[K3 s. 393]]</li>
    <li><b>Metformin ve kinetik.</b> Bağırsaktan glukoz alımını geciktirir, periferik insülin duyarlılığını ve glukoz kullanımını artırır ve hepatik ile renal glukoneogenezi inhibe eder; periferik etki için endojen insülin (işlevsel Langerhans adacığı) şarttır. Diyare dahil Gİ yakınmalar bazen görülür, genellikle hafiftir. Bağırsaktan yavaş emilir (%60 biyoyararlanım), plazma proteinlerine bağlanmaz ve değişmeden idrarla atılır (böbrek bozukluğu etkisini belirgin uzatır). [[K3 s. 393–394]]</li>
    <li><b>Metformin ilişkili laktik asidoz (MALA).</b> Pirüvat, LDH ile <b>10:1 laktat/pirüvat</b> oranında dengededir (normal üretim kitapta <code>20 mmol.kg.gün⁻¹</code>); pirüvat dehidrogenaz (PDH) kofaktörü <b>tiamin</b> ile asetil KoA → Krebs’e girer. Stres ve sempatik aktivasyonda glikoliz Krebs kapasitesini aşar; normalde beyin, böbrek ve karaciğer laktatı (glukoneogenez dahil) yüksek hızda tüketir. Metformin hücreye glukoz alımını artırarak laktat üretimini yükseltirken glukoneogenez inhibisyonuyla laktat klirensini düşürür. Dört MALA riski: kötü böbrek fonksiyonu (özellikle hipovolemi), bozulmuş hepatik/renal klirens, sepsis/hipoperfüzyon/metabolik stres ve tiamin eksikliği (malnütrisyon, alkol). [[K3 s. 393–394]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap laktat üretimini kg üzerinde ters üs olmadan <code>20 mmol.kg.gün⁻¹</code> şeklinde basar; standart boyutlu gösterim <code>20 mmol/kg/gün</code> (<code>mmol·kg⁻¹·gün⁻¹</code>)’dür. [[K3 s. 393]]</div>
</section>

<section class="wrap blk ders-sec" id="a25b-inkretin">
  <h2>GLP-1 reseptör agonistleri ve DPP-4 inhibitörleri</h2>
  <p class="intro">Bağırsak lümenindeki glukoz inkretin sistemi üzerinden GLP-1 salınımını uyarır; Tip 2 DM’de azalan bu yanıt iki sınıfla hedeflenir ve ikisi de iyileşmiş glisemik kontrol, kilo kaybı ve KV profil ile ilişkilendirilmiştir. [[K3 s. 394–395]]</p>
  <div class="viz"><div class="viz-head"><h3>İnkretin sistemi: GLP-1 reseptör agonistleri ve DPP-4 inhibitörleri</h3></div><div data-viz="a25b_inkretin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Etki yelpazesi, pankreatit uyarısı ve böbrek ayarları. [[K3 s. 394–395]]</p></div>
  <ul class="ozet">
    <li><b>Fizyoloji.</b> Kitabın «gastrik mukozadaki L hücreleri» diye belirttiği hücrelerden salınan GLP-1: β-hücrelerinden insülini artırır, alfa hücrelerinden glukagonu azaltır, gastrik boşalmayı geciktirir ve iştahı azaltıp tokluğu artırır; ardından DPP-4 tarafından hızla inaktive edilir. [[K3 s. 394–395]]</li>
    <li><b>GLP-1 agonistleri.</b> Dulaglutid, eksenatid, liraglutid ve liksisenatid; kitapta hepsinin endojen GLP-1’den çok daha uzun etkili olarak SC uygulandığı (bazıları haftalık, kesilince uzun süren etki) ve orta böbrek bozukluğunda kontrendike olduğu yazılıdır. Diğer ajanlarla hipoglisemiyi tetikleyebilir; bulantı sıktır ve pankreatitle ilişkilendirilmiştir. [[K3 s. 395]]</li>
    <li><b>DPP-4 inhibitörleri (gliptinler).</b> Sitagliptin, linagliptin ve alogliptin oral verilerek endojen GLP-1 etkisini uzatır (monoterapi veya kombinasyon). Genelde böbrek bozukluğunda doz değişikliği gerekir (<b>linagliptin hariç</b>) ve pankreatitle ilişkilendirilmiştir. [[K3 s. 395]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap L hücrelerini «gastrik mukoza», tüm GLP-1 agonistlerini SC ve orta böbrek yetmezliğinde kontrendike yazar; oysa L hücreleri bağırsak mukozasındadır (distal jejunum/ileum/kolon), oral semaglutid tableti mevcuttur ve dulaglutid gibi ajanlarda renal kısıtlama ilaca özgüdür. [[K3 s. 394–395]]</div>
</section>

<section class="wrap blk ders-sec" id="a25b-meg-sglt2">
  <h2>Meglitinidler ve SGLT-2 inhibitörleri</h2>
  <p class="intro">Öğün öncesi kısa etkili insülin salgılatıcı meglitinidler ile renal proksimal tübülde glukoz geri emilimini azaltan SGLT-2 inhibitörleri farklı klinik riskler taşır. [[K3 s. 395–396]]</p>
  <div class="viz"><div class="viz-head"><h3>Meglitinidler ve SGLT-2 inhibitörleri: öglisemik DKA uyarısı</h3></div><div data-viz="a25b_meg_sglt2"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Repaglinid CYP3A4 kinetiği ve SGLT-2 öglisemik ketoasidoz tanı kuralı. [[K3 s. 395–396]]</p></div>
  <ul class="ozet">
    <li><b>Meglitinidler (repaglinid, nateglinid).</b> Görece kısa etkilidir ve öğünlerden hemen önce alınarak özellikle düzensiz beslenenlerde yararlı olur. Pankreatik β-hücrelerinde K⁺ kanallarını bloke edip <b>ATP’ye bağımlı K⁺ kanallarını</b> kapatır, Ca²⁺ girişiyle insülin salgılatır. Repaglinid %50 oral biyoyararlanım ve %98 plazma protein bağlanması gösterir; karaciğerde <b>CYP3A4</b> ile metabolize edilir (etkileşime potansiyel duyarlı) ve eliminasyon t½’si <b>1 saattir</b>. [[K3 s. 395]]</li>
    <li><b>SGLT-2 inhibitörleri.</b> Glukoz serbestçe süzülür ve sağlıklı durumda hemen tamamı <b>proksimal kıvrımlı tübülde</b> SGLT-2 ile geri emilir; inhibitörleri geri emilimi ve kan glukozunu düşürür (beklenen yan etkiler poliüri, polidipsi, dehidratasyon). Tip 1 ve Tip 2 DM’de ciddi, bazen hayatı tehdit eden ve belirgin hiperglisemi olmadan geliştiği için tanısal karmaşaya yol açan <b>öglisemik diyabetik ketoasidoz</b> bildirilmiştir; asidoz belirtileriyle başvuranlarda tanı gecikmesini önlemek için <b>keton test edilmelidir</b>. [[K3 s. 396]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a25b-su-tzd">
  <h2>Sülfonilüreler ve tiyazolidindionlar</h2>
  <p class="intro">İnsülin salgılatan iki kuşak sülfonilüreler ile insülin duyarlılığını PPARγ üzerinden artıran pioglitazon etkileşim ve kalp yetmezliği açısından izlenir. [[K3 s. 396–397]]</p>
  <div class="viz"><div class="viz-head"><h3>Sülfonilüreler (1. ve 2. kuşak) ve tiyazolidindion (pioglitazon)</h3></div><div data-viz="a25b_su_tzd"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Albümin bağlanma farkı ve PPARγ / kalp yetmezliği riski. [[K3 s. 396–397]]</p></div>
  <ul class="ozet">
    <li><b>Sülfonilüreler.</b> Birinci kuşak <b>tolbutamid</b>; ikinci kuşak <b>glibenklamid, gliklazid, glipizid</b>dir. β-hücrelerinden insülini serbestleştirir (işlevsel β-hücresi yoksa etkisiz), glukagon ile hepatik insülinazı azaltır, β-hücre hiperplazisini indükleyebilir ve uzun sürede periferik direnci düşürür. Biyoyararlanım &gt;%80, yoğun albümin bağlanması vardır; önemli kısmı değişmeden (BY’de t½ uzar) veya hepatik inaktif metabolitler halinde (aktif metaboliti muhtemelen minör önemdeki glibenklamid hariç) idrarla atılır. <b>Simetidin</b> metabolizmayı inhibe edip güçlendirir; <b>tiyazidler, kortikosteroidler ve fenotiyazinler</b> antagonize eder. İkinci kuşaklar albümine <b>noniyonik</b> bağlandığından anyonik ilaçlar (fenilbutazon, varfarin, salisilat) tarafından iyonik bağlanan tolbutamid kadar yerinden edilmez (daha güvenli olabilir); tolbutamid kolestatik sarılık, bozuk KCFT ve kan diskrazileriyle ilişkilendirilmiştir. [[K3 s. 396]]</li>
    <li><b>Pioglitazon (TZD).</b> BK’de kalan tek TZD’dir (rosiglitazon Mİ ve inme ilişkisiyle çekilmiştir). Nükleer <b>PPARγ</b> reseptörünü aktive edip glukoz/lipit genlerini düzenler ve insülin duyarlılığını artırır; yüksek oral biyoyararlanımlıdır ancak tam etkinin yerleşmesi haftalar sürebilir. Hepatik CYP450 ile metabolize olur (bazı aktif metabolitler, dışkı/idrar). Özellikle yatkınlaştırıcı faktörleri bulunanlarda ve insülinle birlikte <b>kalp yetmezliği riskinde artışla</b> ilişkilidir; yakın izlenmeli ve kalp yetmezliği olanlara verilmemelidir. [[K3 s. 397]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a25b-periop">
  <h2>Diyabetik hastanın perioperatif bakımı</h2>
  <p class="intro">İnsülin infüzyonları «kayan ölçekler» (<i>sliding scales</i>) yerine <b>VRIII</b> olarak adlandırılmalı, ilaç yönetimi yerleşik kılavuzlara, atlanan öğün sayısına ve mevcut diyabet kontrolüne dayanmalıdır. [[K3 s. 397–398]]</p>
  <div class="viz"><div class="viz-head"><h3>Perioperatif diyabet yönetimi: açlık süresi, VRIII ve oral ajanlar</h3></div><div data-viz="a25b_periop"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Açlık süresine göre insülin ve insülin dışı ajanların planı. [[K3 s. 397–398]]</p></div>
  <ul class="ozet">
    <li><b>Açlık süresine göre insülin.</b> Yalnızca <b>bir öğün</b> atlanacaksa çoğu zaman VRIII gerekmez: uzun etkili insülinler bir gün önce <b>%20 azaltılarak</b> alınabilir, orta ve kısa etkililerde bir gün önce değişiklik gerekmez; ameliyat günü değişiklikler ameliyat saatine bağlıdır. <b>Birden fazla öğün</b> atlanacaksa hastaların çoğunda VRIII gerekir; hasta normalde uzun etkili insülin alıyorsa VRIII sona erince <b>rebound hiperglisemiyi azaltmak</b> için VRIII ile birlikte %20 azaltılmış dozda sürdürülür. [[K3 s. 397]]</li>
    <li><b>İnsülin dışı ajanlar.</b> Kitapta ameliyattan önceki gün hepsinin normal alınabileceği belirtilir. Ameliyat günü yalnızca bir öğün atlanacaksa <b>GLP-1 agonistleri, DPP-4 inhibitörleri ve pioglitazon</b> normal alınabilir; diğerlerinin tümüne ara verilir. <b>Metformin</b> tartışmalıdır (iyi böbrek fonksiyonlu, İV kontrast almayan günübirlik cerrahide azaltılmış dozla sürdürülebilir; birçok hastane tüm cerrahilerde ara verir). <b>VRIII</b> kullanılıyorsa GLP-1 agonistleri dışındaki tüm ilaçlara ara verilir. [[K3 s. 397–398]]</li>
  </ul>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Senaryo</th><th>VRIII / Uzun Etkili İnsülin</th><th>Orta / Kısa İnsülin</th><th>İnsülin Dışı Ajanlar</th></tr></thead>
    <tbody>
      <tr><td><b>1 öğün atlama</b></td><td>Çoğunlukla VRIII yok; uzun etkili 1 g önce −%20 olab.</td><td>1 g önce değişiklik yok; ameliyat saati belirler</td><td>Ameliyat günü: yalnız GLP-1, DPP-4, pioglitazon al; diğerleri kes (metformin tartışmalı)</td></tr>
      <tr><td><b>&gt;1 öğün atlama</b></td><td>Çoğunlukla VRIII gerekli; uzun etkili −%20 dozla birlikte</td><td>—</td><td>VRIII sırasında GLP-1 agonistleri dışında tümüne ara ver</td></tr>
    </tbody>
  </table></div>
  <div class="note plain"><b>Atlas notu.</b> Kitap ameliyattan önceki gün tüm insülin dışı ajanların normal alınabileceğini söyler; ancak bu genelleme SGLT-2 inhibitörleri için güvenli değildir (ör. ertugliflozin mümkünse cerrahi veya uzun açlıktan en az 4 gün önce kesilir). [[K3 s. 397]]</div>
</section>

<section class="wrap blk ders-sec" id="a25b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far25b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far25b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far25b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a25b-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Metformin, SGLT-2 inhibitörü ve günlük uzun etkili bazal insülin kullanan bir Tip 2 diyabetli hastada >1 öğün atlanacak majör bağırsak cerrahisi planlanıyor. Metformin ilişkili laktik asidoz mekanizmasını, SGLT-2 inhibitörünün öglisemik ketoasidoz tehlikesini ve hastanın perioperatif VRIII + bazal insülin + oral ajan planını açıklayın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Metformin %60 biyoyararlanımlı, proteinlere bağlanmayan ve değişmeden idrarla atılan biguaniddir; hücresel glikolizi artırıp laktat üretimini yükseltirken glukoneogenez inhibisyonuyla klirensi düşürür (riskler: KBY/hipovolemi, klirens bozukluğu, sepsis/stres, tiamin eksikliği). [[K3 s. 393–394]]</li>
    <li>SGLT-2 inhibitörleri proksimal kıvrımlı tübülde glukoz geri emilimini azaltır; belirgin hiperglisemi olmadan gelişebilen hayatı tehdit edici öglisemik DKA bildirilmiştir ve asidoz belirtisinde keton testi şarttır (Atlas notu: cerrahiden günler önce kesilmesi önerilir). [[K3 s. 396–397]]</li>
    <li>Birden fazla öğün atlanacağından «kayan ölçek» yerine VRIII gereklidir; normalde kullanılan uzun etkili bazal insülin, VRIII kesilince oluşabilecek rebound hiperglisemiyi azaltmak amacıyla %20 azaltılarak VRIII ile eşzamanlı sürdürülür. [[K3 s. 397]]</li>
    <li>VRIII kullanıldığında GLP-1 agonistleri dışındaki tüm insülin dışı ajanlara ara verilir (1 öğün atlanan küçük cerrahide ise yalnızca GLP-1, DPP-4 ve pioglitazon ameliyat günü sürdürülebilirdi; metformin tartışmalıdır: iyi böbrek fonksiyonlu, kontrastsız günübirlik cerrahide azaltılmış dozla sürdürülebilir). [[K3 s. 397–398]]</li>
    <li>Ek not: Hastada akarboz varsa hipoglisemi polisakkaritle değil oral glukozla düzeltilir; pioglitazon kullanıyorsa kalp yetmezliği riski (özellikle insülinle) açısından izlenir ve KY’de verilmez. [[K3 s. 393, 397]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Glikoliz → Pirüvat ↔ Laktat (10:1, LDH) ve PDH (+tiamin) → Krebs döngüsü üzerinde metforminin çift taraflı MALA etkisini (üretim ↑, glukoneogenez klirensi ↓) oklarla gösterin. [[K3 s. 393–394]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Sülfonilürelerden ikinci kuşak neden tolbutamidden daha güvenli olabilir? Repaglinidin yarılanma ömrü ve metabolizması nasıldır? [[K3 s. 395–396]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a25b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Akarboz hipoglisemisi oral glukozla (polisakkarit değil) tedavi edilir; metformin değişmeden idrarla atılır ve üretim ↑ / klirens ↓ yoluyla MALA’yı tetikleyebilir. [[K3 s. 393–394]]</li>
    <li>GLP-1 agonistleri ve DPP-4 inhibitörleri (linagliptin hariç BY doz ayarı) pankreatitle ilişkilendirilmiştir; repaglinid t½ 1 saat ve CYP3A4 yıkımlıdır. [[K3 s. 395]]</li>
    <li>SGLT-2 inhibitörleri öglisemik DKA (keton testi şart) yapabilir; ikinci kuşak sülfonilüreler albümine noniyonik bağlanır; pioglitazon PPARγ agonisti olup kalp yetmezliğinde verilmez. [[K3 s. 396–397]]</li>
    <li>Perioperatif uzun açlıkta VRIII + %20 azaltılmış uzun etkili insülin sürdürülür ve GLP-1 agonistleri dışındaki tüm insülin dışı ajanlara ara verilir. [[K3 s. 397–398]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="25b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/25a">← 25a · Diyabet ve insülinler</a><a href="#/dersler/farmakoloji/26a">Sonraki: 26a · Kortikosteroidler →</a></nav>
</section>`,
};
