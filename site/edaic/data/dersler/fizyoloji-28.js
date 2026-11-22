/* Fizyoloji Bölüm 28 · Kardiyak siklus (K1 İngilizce baskı s. 117–120).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz28.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz28-1'] = {
  no: 1, kok: 'Kardiyak siklusun evreleri ve olayları için:', kagit: 'Paper A · fizyoloji, Bölüm 28', kaynak: '[[K1 s. 117]]',
  onermeler: [
    { t: 'Diyastol dört evreden oluşur: izovolümetrik gevşeme, hızlı ventriküler doluş, yavaş ventriküler doluş ve atriyal kasılma.', d: true, n: 'Doğru. Sistol ise iki evreden oluşur: izovolümetrik kasılma ve ejeksiyon. [[K1 s. 117]]' },
    { t: 'Diyastolün kısaldığı egzersizde atriyal kasılma ventrikül doluşunun %40\'ına kadarını sağlayabilir.', d: true, n: 'Doğru. İstirahatte atriyal "itki" doluşun yalnız %10\'udur, %90\'ı pasif akar; egzersizde payı %40\'a kadar çıkar. [[K1 s. 117]]' },
    { t: 'Birinci kalp sesi (S1), ventrikül basıncı aort basıncını aşıp semilüner kapaklar açılırken duyulur.', d: false, n: 'Yanlış. S1, ventrikül basıncı atriyal basıncı aşınca AV kapakların kapanmasıyla oluşur; mitral kapak triküspitten biraz önce kapandığı için S1 çiftlenir. Semilüner kapaklar kapanınca S2 oluşur. [[K1 s. 117–118]]' },
    { t: 'İzovolümetrik kasılma, AV kapakların kapanmasından semilüner kapakların açılmasına kadar süren, ventrikül basıncının hacim değişmeden yükseldiği evredir.', d: true, n: 'Doğru. Bu evre EKG\'de QRS kompleksinin ardından gelir; uyarı AV düğümden geçip His–Purkinje sistemiyle ventriküllere yayılmıştır. [[K1 s. 117]]' },
    { t: 'Atriyal kasılmanın oluşturduğu basınç, venae cavae ve pulmoner venlerde kapak bulunmadığı için bu venlere geri iletilir.', d: true, n: 'Doğru. Bu basınç atriyal basınç eğrisinde a dalgası olarak görülür. Atriyal kasılmanın sonundaki ventrikül hacmi diyastol sonu hacmidir. [[K1 s. 117]]' },
  ],
};
VERI.sorular['fiz28-2'] = {
  no: 2, kok: 'Atriyal basınç dalgası ve kalp sesleri için:', kagit: 'Paper A · fizyoloji, Bölüm 28', kaynak: '[[K1 s. 118–119]]',
  onermeler: [
    { t: 'x inişi, AV kapaklar açılınca kanın atriyumdan ventriküle akmasıyla atriyal basıncın düşmesidir.', d: false, n: 'Yanlış. Bu y inişidir. x inişi ejeksiyonda oluşur: sağ ventrikül kasılması triküspit kapağı aşağı çeker, sağ atriyum uzar, basıncı sıfıra düşer ve atriyum hızla dolar. [[K1 s. 118–119]]' },
    { t: 'c dalgası, izovolümetrik kasılmada artan ventrikül basıncının triküspit kapağı sağ atriyuma doğru bombeleştirmesine karşılık gelir.', d: true, n: 'Doğru. Sol tarafta da artan sol ventrikül basıncı mitral kapağı sol atriyuma doğru bombeleştirir. [[K1 s. 118]]' },
    { t: 'v dalgası, geç sistol ve izovolümetrik gevşeme boyunca akciğerlerden ve venae cavae\'den gelen venöz dönüşle atriyal basıncın yavaşça yükselmesidir.', d: true, n: 'Doğru. v dalgası AV kapaklar açılana kadar yükselir; açılınca y inişi başlar. [[K1 s. 119]]' },
    { t: 'İnspirasyon, pulmoner kapağın aort kapağından önce kapanmasına yol açarak fizyolojik S2 çiftlenmesini oluşturur.', d: false, n: 'Yanlış. Aort kapağı normalde pulmoner kapaktan biraz önce kapanır; inspirasyon bu farkı, özellikle gençlerde, belirginleştirir: fizyolojik S2 çiftlenmesi. [[K1 s. 118]]' },
    { t: 'Aort basınç eğrisindeki dikrotik çentik, mitral kapağın açılmasını gösterir.', d: false, n: 'Yanlış. Dikrotik çentik aort kapağının kapanmasını gösterir; kitaba göre kapağın ve aortun elastik geri tepmesinin yaptığı pozitif bir sapmadır. [[K1 s. 118]]' },
  ],
};
VERI.sorular['fiz28-3'] = {
  no: 3, kok: 'Atım hacmi, kalp hızı ve kapak hastalığı için:', kagit: 'Paper A · fizyoloji, Bölüm 28', kaynak: '[[K1 s. 119–120]]',
  onermeler: [
    { t: 'LVEDV 120 mL ve LVESV 50 mL olan bir kişide ejeksiyon fraksiyonu yaklaşık %42\'dir.', d: false, n: 'Yanlış. SV = 120 − 50 = 70 mL; EF = SV / LVEDV = 70 / 120 ≈ %58. Normal EF aralığı %55–70\'tir. [[K1 s. 119]]' },
    { t: 'Kalp hızı 200/dk olduğunda bir kardiyak siklus yaklaşık 0,3 s sürer ve diyastol yaklaşık 0,15 s\'ye kısalır.', d: true, n: 'Doğru. Sistol de 0,15 s sürer. İstirahatte (HR 75/dk) siklus 0,8 s, sistol 0,3 s, diyastol 0,5 s\'dir; bu kadar kısa diyastol doluşu kısıtlar. [[K1 s. 119]]' },
    { t: 'HRmax = 208 − (0,7 × yaş) formülüne göre 80 yaşındaki bir kişinin maksimal kalp hızı 152/dk\'dır.', d: true, n: 'Doğru. 20 yaşında 194/dk\'dır. Yaşla LV kompliyansı azaldığından hızlı doluş evresinde doluş hızı düşer ve maksimal hız azalır. [[K1 s. 120]]' },
    { t: 'Aort darlığında hedef kalp hızı 90–110/dk\'dır; kısa diyastol stenotik kapaktan ejeksiyonu kolaylaştırır.', d: false, n: 'Yanlış. Aort darlığında hedef düşük/normal hızdır (50–70/dk): stenotik kapaktan sistolik ejeksiyon için zaman tanır. 90–110/dk hedefi aort ve mitral yetersizliği içindir. [[K1 s. 120]]' },
    { t: 'Mitral darlığı olan hastada ameliyat sırasında AF gelişirse acil kardiyoversiyon endikedir.', d: true, n: 'Doğru. Mitral darlığında sinüs ritmi korunmalıdır; düşük/normal hız (50–70/dk) stenotik kapaktan LV doluşuna zaman tanır. [[K1 s. 120]]' },
  ],
};

const D28_NAV = [
  ['d28-tanim', 'Evreler'], ['d28-olaylar', 'Olaylar'], ['d28-dalga', 'Dalgalar ve sesler'],
  ['d28-hacim', 'SV ve EF'], ['d28-hiz', 'Kalp hızı ve yaş'], ['d28-kapak', 'Kapak hastalığı'],
  ['d28-p1', 'Part I'], ['d28-p2', 'Part II'], ['d28-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/28'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 3 · Kardiyovasküler fizyoloji · Bölüm 28', baslik: 'Kardiyak siklus',
  lede: 'Kardiyak siklus, bir kalp atımının başlangıcından bir sonrakinin başlangıcına kadar kalpte olan fizyolojik olayların tüm dizisidir. Bu bölüm evreleri, basınç eğrilerini ve kalp seslerini, atım hacmi ile ejeksiyon fraksiyonunu, kalp hızının ve yaşın doluşa etkisini ve kapak hastalığında hemodinamik hedefleri işler. [[K1 s. 117–120]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D28_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d28-tanim">
  <h2>İki faz, altı evre</h2>
  <p class="intro">Siklus iki fazdan oluşur: ventriküllerin gevşeyip kanla dolduğu diyastol ve kasılıp kanı aorta ve pulmoner artere attığı sistol. [[K1 s. 117]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Siklusun saati: 0,8 saniyede altı evre</h3></div>
    <div data-viz="f28_halka"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat, HR 75/dk.</b> Bir siklus 0,8 s sürer: sistol 0,3 s, diyastol 0,5 s. Bir evreye dokunun: kapakların durumu ve ventrikül hacminin değişimi görünür. [[K1 s. 119]]</p>
    <p class="viz-foot">Sistol ve diyastol süreleri kitaptan [[K1 s. 119]]; evrelerin kendi süreleri şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Diyastolün dört evresi vardır: izovolümetrik gevşeme, hızlı ventriküler doluş, yavaş ventriküler doluş ve atriyal kasılma. Sistolün iki evresi vardır: izovolümetrik kasılma ve ejeksiyon. İki izovolümetrik evrede bütün kapaklar kapalıdır: ventrikülün basıncı değişir, hacmi değişmez. [[K1 s. 117–119]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d28-olaylar">
  <h2>Olaylar adım adım: basınçlar, kapaklar, EKG</h2>
  <p class="intro">Siklus geleneksel olarak geç diyastolden, atriyumlar ve ventriküller gevşemiş ve atriyoventriküler (AV) kapaklar açıkken anlatılır; her kapak, iki yanındaki basıncın sırası değiştiği anda açılır ya da kapanır. [[K1 s. 117–119]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Kardiyak siklus diyagramı: altı evreyi izleyin</h3></div>
    <div data-viz="f28_wiggers"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Yavaş ventriküler doluş.</b> Atriyal basınç ventrikül basıncından biraz yüksektir; AV kapaklar açıktır ve kan atriyumdan ventriküle yavaşça akar. İleri düğmesiyle evreleri izleyin. [[K1 s. 117]]</p>
    <p class="viz-foot">Şematik model: siklus 0,8 s (HR 75/dk) [[K1 s. 119]]; basınç ölçeği kitaptaki şekle benzer, atriyal eğri sağ atriyumdur [[K1 s. 118]]; hacimler LVEDV 120 mL, LVESV 50 mL [[K1 s. 119]].</p>
  </div>
  <div class="tbl-wrap" style="margin:14px 0">
    <table class="tbl">
      <thead><tr><th>Evre</th><th>Başlatan olay</th><th>Kapaklar</th><th>Ventrikül hacmi</th><th>EKG, ses, dalga</th></tr></thead>
      <tbody>
        <tr><th>Yavaş doluş</th><td>atriyal basınç ventrikülünkinden biraz yüksek</td><td>AV açık</td><td>yavaşça artar</td><td>—</td></tr>
        <tr><th>Atriyal kasılma</th><td>SA düğümden çıkan uyarı atriyumlara yayılır</td><td>AV açık</td><td>son katkı → diyastol sonu hacmi</td><td>P; a dalgası</td></tr>
        <tr><th>İzovolümetrik kasılma</th><td>ventrikül basıncı &gt; atriyal → AV kapanır</td><td>hepsi kapalı</td><td>sabit</td><td>QRS; S1; c dalgası</td></tr>
        <tr><th>Ejeksiyon</th><td>ventrikül basıncı &gt; aort ve pulmoner arter → semilüner kapaklar açılır</td><td>semilüner açık</td><td>önce hızlı, sonra yavaş azalır → sistol sonu hacmi</td><td>T; x inişi</td></tr>
        <tr><th>İzovolümetrik gevşeme</th><td>ventrikül basıncı &lt; aort ve pulmoner arter → semilüner kapanır</td><td>hepsi kapalı</td><td>sabit</td><td>S2; dikrotik çentik; v dalgası</td></tr>
        <tr><th>Hızlı doluş</th><td>atriyal basınç &gt; ventrikül → AV açılır</td><td>AV açık</td><td>hızla artar</td><td>y inişi; (S3)</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body">
    <p>Uyarı, SA düğümündeki pacemaker hücrelerinin kendiliğinden depolarizasyonuyla doğar (Bölüm 57), atriyumlara hızla yayılır, AV düğümden geçer ve His–Purkinje sistemiyle ventriküllere iletilir. Atriyal kasılma ("itki") atriyumda kalan kanın çoğunu ventriküle atar, ama istirahatte doluşun yalnız %10'unu sağlar; %90 pasif akar. Diyastolün kısaldığı egzersizde payı %40'a çıkabilir. [[K1 s. 117]]</p>
    <p>İzovolümetrik kasılmada basınç hızla yükselir; şekildeki bu yükselişin eğimi kontraktiliteyi yansıtır. Ejeksiyonun başında akım hızlıdır, miyositler repolarize olmaya başlayınca kasılma kuvveti azalır. Semilüner kapaklar kapandıktan sonra ventrikülün basıncının atriyumunkinin altına inmesi kısa bir süre alır. Hızlı doluşta ventrikül hâlâ gevşediği için basıncı düşmeyi sürdürür ve kan hızla akar. [[K1 s. 117–119]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d28-dalga">
  <h2>Atriyal basınç dalgası ve kalp sesleri</h2>
  <p class="intro">Atriyal basınç eğrisinin üç dalgası (a, c, v), iki inişi (x, y) ve kalp sesleri, kapakların ve ventrikülün mekanik olaylarına birebir karşılık gelir. [[K1 s. 117–119]]</p>
  <div class="viz">
    <div class="viz-head"><h3>a, c, x, v, y ve S1, S2, S3: hangi olay?</h3></div>
    <div data-viz="f28_dalga"></div>
    <p class="viz-cap" aria-live="polite"><b>a dalgası.</b> Atriyal kasılmanın basıncı, kapakları olmadığı için venae cavae ve pulmoner venlere geri iletilir. Başka bir dalgaya ya da sese dokunun. [[K1 s. 117]]</p>
    <p class="viz-foot">Şematik eğri; genlikler ve aralıklar ölçeksizdir. Kitaptaki şekil sağ atriyal basıncı gösterir [[K1 s. 118]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p><b>c dalgası:</b> izovolümetrik kasılmada artan sağ ventrikül basıncı triküspit kapağı sağ atriyuma doğru bombeleştirir (solda mitral kapak sol atriyuma). <b>x inişi:</b> ejeksiyonda sağ ventrikül triküspit kapağı aşağı çeker; uzayan sağ atriyumun basıncı sıfıra düşer ve atriyum hızla dolar. <b>v dalgası:</b> geç sistol ve izovolümetrik gevşeme boyunca akciğerlerden ve venae cavae'den gelen kan atriyal basıncı yavaşça yükseltir. <b>y inişi:</b> AV kapaklar açılınca atriyal basınç düşer. [[K1 s. 118–119]]</p>
    <p><b>S1</b> AV kapakların kapanmasıdır; mitral triküspitten biraz önce kapandığından S1 çiftlenir. <b>S2</b> semilüner kapakların kapanmasıdır; aort kapağı pulmonerden biraz önce kapanır, inspirasyon bu farkı (özellikle gençlerde) artırır: fizyolojik S2 çiftlenmesi. Aort kapağının kapanması aort eğrisinde <b>dikrotik çentik</b> olarak görülür; kitaba göre kapağın ve aortun elastik geri tepmesinin yaptığı pozitif bir sapmadır. [[K1 s. 117–118]]</p>
    <p>Doluş normalde sessizdir. Artmış atriyal kan hacmi (ör. mitral yetersizlik) kompliyansı düşük bir sol ventriküle (LV; ör. miyokard enfarktüsünden sonra ya da dilate kardiyomiyopatide) akınca ventrikül duvarı titreşir: <b>S3</b>. [[K1 s. 119]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Aort basınç eğrisinde kapak kapanırken kısa bir geri akım önce küçük bir çukur (insizura) yapar; kitabın sözünü ettiği pozitif sapma bunun hemen ardından gelen, geri tepmeye bağlı küçük dalgadır.</div>
</section>

<section class="wrap blk ders-sec" id="d28-hacim">
  <h2>Atım hacmi ve ejeksiyon fraksiyonu</h2>
  <p class="intro">Atım hacmi (SV), LV'nin her atımda attığı kan hacmidir: kasılmadan önceki hacim (sol ventrikül diyastol sonu hacmi, LVEDV) eksi kasılmadan sonra kalan hacim (sol ventrikül sistol sonu hacmi, LVESV). [[K1 s. 119]]</p>
  <div class="viz">
    <div class="viz-head"><h3>LVEDV ve LVESV'yi değiştirin: SV ve EF</h3></div>
    <div data-viz="f28_hacim"></div>
    <p class="viz-cap" aria-live="polite"><b>Tipik değerler, 70 kg erkek.</b> LVEDV 120 mL, LVESV 50 mL: SV = 120 − 50 = 70 mL; EF = 70 / 120 ≈ %58. Kaydırıcıları oynatın; değer normal aralığın dışına çıkınca renk değiştirir. [[K1 s. 119]]</p>
    <p class="viz-foot">Ventrikül çizimi şematiktir; hesaplar kitaptaki iki denklemle yapılır [[K1 s. 119]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Sık kullanılan ejeksiyon fraksiyonu (EF), LV'deki kanın her atımda atılan oranıdır: EF = SV / LVEDV. SV'nin normal aralığı 55–100 mL'dir, ama kişinin vücut büyüklüğüne bağlıdır; EF'nin normal aralığı %55–70'tir. [[K1 s. 119]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d28-hiz">
  <h2>Klinik önem: kalp hızı, yaş ve doluş</h2>
  <p class="intro">Kalp debisi CO = HR × SV olduğundan (Bölüm 29) hız arttıkça debinin artması beklenir; ama hız diyastolü kısaltır ve LV yalnız diyastolde, basıncı düşük ve mitral kapak açıkken dolar. [[K1 s. 119]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Kalp hızı ve yaş: diyastole ne kadar zaman kalır?</h3></div>
    <div data-viz="f28_hiz"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat, HR 75/dk.</b> Siklus 0,8 s: sistol 0,3 s, diyastol 0,5 s. Hızı artırın, yaşı değiştirin ya da AF'yi açın. [[K1 s. 119]]</p>
    <p class="viz-foot">Sistol ve diyastol süreleri kitaptaki iki noktadan (HR 75 ve 200) doğrusal ara değerle çizilir; atriyal pay ve debi bandı şematik/nitelikseldir [[K1 s. 119–120]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Maksimal egzersizdeki genç bir sporcuda HR 200/dk olabilir: siklus 0,3 s, sistol ve diyastol 0,15'er s. Bu kadar kısa diyastol doluşu kısıtlar, SV ve CO düşer. HR 40/dk'nın altına inince de, uzayan doluş süresiyle SV orta derecede (80–90 mL'ye) artsa bile CO düşer. Çoğu kişide en uygunu 50–150/dk arası sinüs ritmidir. [[K1 s. 119]]</p>
    <p>Yaşla aortun kompliyansı azalır ve ard yük artar; LV buna hipertrofiyle yanıt verir ve kompliyansı düşer. Diyastolik gevşeme de verimsizleşir, kompliyans daha da düşer ve hızlı doluş evresinde doluş hızı azalır. Bu yüzden maksimal hız yaşla düşer: HR<sub>max</sub> = 208 − (0,7 × yaş); 20 yaşında 194, 80 yaşında 152/dk. [[K1 s. 119–120]]</p>
    <p>Atriyal fibrozis atriyal fibrilasyona (AF) yatkınlık yaratır. Yaş ilerledikçe atriyal kasılma LVEDV'nin %40'ına kadarını sağlar; atriyal kasılmanın olmadığı AF başlayınca CO belirgin düşebilir ve önceden iyi tolere edilen kalp yetersizliği dekompanse olabilir. [[K1 s. 119–120]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d28-kapak">
  <h2>Klinik önem: kapak hastalığı ve anestezi</h2>
  <p class="intro">Kapak hastalığında perioperatif yönetim, değişen kardiyovasküler fizyolojiyi ve anestezik ilaçlarla pozitif basınçlı ventilasyonun etkilerini anlamayı gerektirir; en çok kaygı verenler darlıklardır, çünkü CO görece sabittir ve SVR değişiklikleri kompanse edilemez. [[K1 s. 120]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Dört lezyon, dört hedef seti</h3></div>
    <div data-viz="f28_kapak"></div>
    <p class="viz-cap" aria-live="polite"><b>Aort darlığı.</b> Kan dar kapaktan sistolde atılır: sistolik ejeksiyona zaman tanıyan düşük/normal hız, sinüs ritmi ve SVR'yi korumak hedeftir. Başka bir lezyon seçin. [[K1 s. 120]]</p>
    <p class="viz-foot">Şematik kalp; akım okları yalnız yönü gösterir. Dört lezyonda da normovolemi korunur [[K1 s. 120]].</p>
  </div>
  <div class="tbl-wrap" style="margin:14px 0">
    <table class="tbl">
      <thead><tr><th></th><th>Kalp hızı</th><th>Ritim</th><th>SVR</th><th>Ayrıca</th></tr></thead>
      <tbody>
        <tr><th>Aort darlığı</th><td>düşük/normal, 50–70/dk: stenotik kapaktan sistolik ejeksiyona zaman</td><td>sinüs: AF LV doluşunu ağır bozar, kötü tolere edilir</td><td>ani düşüşlerden kaçın: CO görece sabit, hipotansiyon koroner perfüzyonu bozabilir</td><td>kitaba göre nöroaksiyel blok kontrendike; ilaçlar dikkatle titre edilir</td></tr>
        <tr><th>Mitral darlığı</th><td>düşük/normal, 50–70/dk: stenotik kapaktan LV doluşuna zaman</td><td>sinüs: intraoperatif AF'de acil kardiyoversiyon</td><td>koru: CO görece sabit</td><td>hiperkarbi, asidoz, hipoksiden kaçın (pulmoner hipertansiyon)</td></tr>
        <tr><th>Aort yetersizliği<br><span class="small muted">"dolu, hızlı, ileri"</span></th><td>yüksek/normal, 90–110/dk: kısa diyastol regürjitan fraksiyonu azaltır</td><td>—</td><td>düşük: ileri akım artar, regürjitan fraksiyon azalır</td><td>kontraktiliteyi koru</td></tr>
        <tr><th>Mitral yetersizliği</th><td>yüksek/normal, 90–110/dk: kitaba göre kısa diyastol regürjitan fraksiyonu azaltır</td><td>—</td><td>düşük: ileri akım korunur, regürjitan fraksiyon azalır</td><td>hiperkarbi, asidoz, hipoksiden kaçın (pulmoner hipertansiyon)</td></tr>
      </tbody>
    </table>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Güncel uygulamada aort darlığında nöroaksiyel blok mutlak kontrendikasyon sayılmaz: ani SVR düşüşü yapan tek doz spinalden kaçınılır, yavaş titre edilen epidural ya da kombine spinal–epidural dikkatle kullanılabilir.</div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Mitral yetersizliğinde geri akım diyastolde değil sistolde olur; yüksek/normal hızın yararı, bradikardide uzayan doluşla LV'nin aşırı genişleyip regürjitan hacmin artmasını önlemesidir.</div>
</section>

<section class="wrap blk ders-sec" id="d28-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sıralar ve sayılar üzerinden sorulur: diyastolün dört ve sistolün iki evresi, her kapağın açılıp kapandığı basınç sırası, atriyal kasılmanın istirahatte ve egzersizde doluşa katkısı, a, c, x, v, y dalgalarının ve S1, S2, S3'ün kaynağı, fizyolojik çiftlenme, dikrotik çentik, SV ve EF denklemleri ile tipik değerleri, HR 75 ve 200'de siklusun süreleri, HR<sub>max</sub> formülü, yaşın etkileri ve dört kapak lezyonunun hedefleri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz28-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz28-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz28-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d28-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Kardiyak siklusu bir diyagram çizerek anlatın. Kapaklar ne zaman açılır ve kapanır, kalp sesleri ve atriyal basınç dalgaları nereden gelir? Kalp hızı arttığında ventrikül doluşuna ne olur?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Bir atımın başından bir sonrakinin başına kadarki olayların tüm dizisi; diyastol (izovolümetrik gevşeme, hızlı doluş, yavaş doluş, atriyal kasılma) ve sistol (izovolümetrik kasılma, ejeksiyon). İstirahatte 0,8 s: sistol 0,3 s, diyastol 0,5 s. [[K1 s. 117, 119]]</li>
    <li><b>Geç diyastolden başlayın.</b> Yavaş doluşta AV kapaklar açık; SA düğüm uyarısı (P) atriyal kasılmayı başlatır: istirahatte doluşun %10'u, egzersizde %40'a kadar; a dalgası; sonunda diyastol sonu hacmi. [[K1 s. 117]]</li>
    <li><b>Sistol.</b> QRS, ventrikül basıncı atriyumunkini aşar: AV kapaklar kapanır (S1, mitral önce), izovolümetrik kasılma (c dalgası; yükseliş eğimi kontraktilite). Basınç aort ve pulmoner arteri aşınca semilüner kapaklar açılır: ejeksiyon, x inişi; repolarizasyonla kuvvet azalır. [[K1 s. 117–118]]</li>
    <li><b>Sistolün sonu ve diyastol.</b> Ventrikül basıncı aortunkinin altına inince semilüner kapaklar kapanır (S2, aort önce; inspirasyonda fizyolojik çiftlenme; dikrotik çentik), sistol sonu hacmi. İzovolümetrik gevşeme ve v dalgası; AV kapaklar açılınca hızlı doluş ve y inişi; S3 nedenleri. [[K1 s. 118–119]]</li>
    <li><b>Hacimler.</b> SV = LVEDV − LVESV = 120 − 50 = 70 mL (normal 55–100); EF = SV / LVEDV ≈ %58 (normal %55–70). [[K1 s. 119]]</li>
    <li><b>Kalp hızı ve yaş.</b> HR 200'de siklus 0,3 s, diyastol 0,15 s: doluş kısıtlanır, SV ve CO düşer; HR &lt; 40'ta SV 80–90 mL'ye çıksa da CO düşer; en uygunu 50–150/dk sinüs ritmi. Yaşla kompliyans azalır, HR<sub>max</sub> = 208 − 0,7 × yaş, atriyal kasılmanın payı %40'a kadar çıkar, AF debiyi düşürür. [[K1 s. 119–120]]</li>
    <li><b>Klinik bağ.</b> Darlıklarda düşük/normal hız ve sinüs ritmi (aort darlığında SVR'yi koru, mitral darlığında pulmoner hipertansiyonu tetikleyenlerden kaçın); yetersizliklerde yüksek/normal hız ve düşük SVR. [[K1 s. 120]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada beklenen çizim kardiyak siklus diyagramıdır: ortak zaman ekseninde aort, sol ventrikül ve atriyal basınç, altında EKG ve kalp sesleri. Kapakların açılıp kapandığı dört kesişme noktasını işaretleyin, iki izovolümetrik evreyi taralı gösterin, atriyal eğride a, c, x, v, y'yi ve aort eğrisinde dikrotik çentiği adlandırın.</div>
    <div class="note plain"><b>Olası ek sorular.</b> İzovolümetrik kasılmada hangi kapaklar açıktır? S2 neden inspirasyonda çiftlenir? x inişi nasıl oluşur? EF nasıl hesaplanır, normali nedir? HR 200'de neden CO düşer? Yaşlı bir hastada AF neden kalp yetersizliğini dekompanse eder? Aort darlığı ve aort yetersizliğinde hız hedefleri neden zıttır? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 117–120]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d28-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Kardiyak siklus bir atımın başından bir sonrakinin başına kadarki olaylardır: diyastol dört evre (izovolümetrik gevşeme, hızlı doluş, yavaş doluş, atriyal kasılma), sistol iki evre (izovolümetrik kasılma, ejeksiyon). [[K1 s. 117]]</li>
    <li>Kapaklar basınç sırası değişince açılıp kapanır: AV kapakların kapanması S1, semilüner kapakların kapanması S2 ve dikrotik çentiktir; arada kalan iki izovolümetrik evrede hacim sabittir. [[K1 s. 117–118]]</li>
    <li>Atriyal kasılma istirahatte doluşun %10'unu, egzersizde ve ileri yaşta %40'a kadarını sağlar; AF bu katkıyı kaldırır. [[K1 s. 117, 120]]</li>
    <li>Atriyal eğri: a atriyal kasılma, c triküspit bombeleşmesi, x ejeksiyonda kapağın aşağı çekilmesi, v venöz dönüşle dolum, y AV kapakların açılması. S3, artmış atriyal hacmin kompliyansı düşük LV'ye akmasıyla duyulur. [[K1 s. 117–119]]</li>
    <li>SV = LVEDV − LVESV (tipik 120 − 50 = 70 mL; normal 55–100 mL); EF = SV / LVEDV (≈ %58; normal %55–70). [[K1 s. 119]]</li>
    <li>HR 75'te siklus 0,8 s (diyastol 0,5 s), HR 200'de 0,3 s (diyastol 0,15 s); çok yüksek ve 40/dk'nın altındaki hızlarda CO düşer, 50–150/dk sinüs ritmi en uygunudur. HR<sub>max</sub> = 208 − (0,7 × yaş). [[K1 s. 119–120]]</li>
    <li>Darlıklarda (aort, mitral) düşük/normal hız (50–70/dk) ve sinüs ritmi; yetersizliklerde (aort, mitral) yüksek/normal hız (90–110/dk) ve düşük SVR hedeflenir; hepsinde normovolemi korunur. [[K1 s. 120]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="28"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/27">← Bölüm 27 · Kalbin anatomisi ve işlevi</a>
    <a href="#/dersler/fizyoloji/29">Sonraki: Bölüm 29 · Kalp debisi ve ölçümü →</a>
  </nav>
</section>`,
};
