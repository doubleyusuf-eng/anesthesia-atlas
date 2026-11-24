VERI.sorular = VERI.sorular || {};
VERI.sorular['far11b-1'] = {
  no: 1, kok: 'Lidokain, prilokain ve EMLA', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 177–179]]',
  onermeler: [
    { t: 'Kardiyak yetmezlik lidokain klirensini artırır.', d: false, n: 'Kardiyak veya hepatik yetmezlikte klirens azalır. [[K3 s. 177]]' },
    { t: 'EMLA oda sıcaklığında yağ halinde bir lokal anestezik karışımı içerir.', d: true, n: 'İki kristal baz birlikte daha düşük sıcaklıkta erir. [[K3 s. 177]]' },
    { t: 'Prilokain metabolizması karaciğerle sınırlıdır.', d: false, n: 'Böbrek ve akciğer de prilokaini metabolize eder. [[K3 s. 179]]' },
    { t: 'EMLA ile birlikte fenitoin kullanımı methemoglobinemi riskini artırır.', d: true, n: 'Fenitoin ve sülfonamidler bu riski artıran ilaçlardandır. [[K3 s. 178]]' },
    { t: 'Prilokainin maksimum dozu felipressinle birlikte 6 mg/kg’dır.', d: false, n: 'Maksimum doz tek başına 6 mg/kg, felipressinle 8 mg/kg’dır. [[K3 s. 179]]' },
  ],
};
VERI.sorular['far11b-2'] = {
  no: 2, kok: 'Bupivakain, levobupivakain ve ropivakain', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 178–179]]',
  onermeler: [
    { t: 'Bupivakain, R ve S enantiyomerlerini içerir.', d: true, n: 'Bupivakain rasemik karışımdır. [[K3 s. 178]]' },
    { t: 'Levobupivakain için önerilen maksimum tek doz 400 mg’dır.', d: false, n: 'Tek doz sınırı 150 mg, 24 saatlik sınır 400 mg’dır. [[K3 s. 178]]' },
    { t: 'Ropivakainin lipit çözünürlüğü bupivakaininkinden düşüktür.', d: true, n: 'Bu fark büyük miyelinli liflere başlangıçtaki geçişi azaltabilir. [[K3 s. 179]]' },
    { t: 'Ropivakainin R enantiyomeri S enantiyomerinden daha potenttir.', d: false, n: 'R formunun potensi daha düşük, toksisitesi daha yüksektir. [[K3 s. 179]]' },
    { t: 'Sürekli ropivakain infüzyonunda Aβ ve C liflerinin blok dereceleri birbirine yaklaşır.', d: true, n: 'İnfüzyon sürerken başlangıçta görece korunan büyük lifler de bloke olur. [[K3 s. 179]]' },
  ],
};
VERI.sorular['far11b-3'] = {
  no: 3, kok: 'Ester lokal anestezikler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 180]]',
  onermeler: [
    { t: 'Kokainin mukozal emilimi iyidir.', d: true, n: 'Kokain mukozadan iyi emilir ve yaklaşık %95 oranında proteine bağlanır. [[K3 s. 180]]' },
    { t: 'Kokain uptake 1’i ve MAO’yu inhibe eder.', d: true, n: 'Bu iki etkiye merkezi sinir sistemi uyarılması eşlik eder. [[K3 s. 180]]' },
    { t: 'Ametokain krem uygulandığı deride vazokonstriksiyon oluşturur.', d: false, n: 'Ametokain bir miktar vazodilatasyon ve eritem yapar. [[K3 s. 180]]' },
    { t: 'Kloroprokainle derlenme bupivakainden daha kısadır.', d: true, n: 'Hızlı derlenme günübirlik cerrahide avantaj sağlayabilir. [[K3 s. 180]]' },
    { t: 'Ametokain göz damlası ilk uygulamada yanma yapabilir.', d: true, n: 'İlk damlatmada yanma hissi görülebilir. [[K3 s. 180]]' },
  ],
};

const A11B_NAV = [
  ['amid', 'Lidokain ve prilokain'], ['deri', 'EMLA ve ametokain'],
  ['epidural', 'Epidural ajanlar'], ['ester', 'Kokain ve kloroprokain'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/11b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 11 · Ders 11b', baslik: 'Tek tek lokal anestezikler',
  lede: 'Lidokain ventriküler taşiaritmilerde de kullanılırken prilokain özellikle büyük hacimde lokal anestezik gerektiğinde kullanılır. [[K3 s. 177–179]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A11B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a11b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a11b-amid">
  <h2>Lidokain ve prilokain</h2>
  <p class="intro">Bu iki amidin kullanım alanları benzerdir, ancak metabolitleri farklı riskler taşır. [[K3 s. 177–179]]</p>
  <div class="viz"><div class="viz-head"><h3>Metabolizma hangi klinik etkiye bağlanır?</h3></div><div data-viz="a11b_metabolizma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel metabolizma yolları. [[K3 s. 177–179]]</p></div>
  <div class="cols a11b-kartlar">
    <div class="card"><h3>Lidokain</h3><ul>
      <li><b>Kalp.</b> Sınıf Ib antiaritmik etkisiyle ventriküler taşiaritmilerin kontrolünde kullanılır. [[K3 s. 177]]</li>
      <li><b>Hidroklorür preparatları.</b> Renksiz %0.5–2 çözelti adrenalinsiz veya adrenalinli (80000–200000’de 1) hazırlanır. [[K3 s. 177]]</li>
      <li><b>Topikal biçimler.</b> %2 jel, %5 merhem, doz başına 10 mg sprey ve mukozaya yönelik %4 çözelti bulunur. [[K3 s. 177]]</li>
      <li><b>Kinetik.</b> α1-asit glikoproteine bağlanma %70’tir. [[K3 s. 177]] Karaciğer veya kalp yetmezliğinde klirens düşer. [[K3 s. 177]]</li>
      <li><b>Karaciğerde dönüşüm.</b> Yaygın dealkilasyonla monoetilglisin-ksilidid ve asetaldehit oluşur. [[K3 s. 177]] Kitap ilk ürünün hidrolizini, ikincisinin hidroksilasyonuyla da idrardaki ana metabolit olan 4-hidroksi-2,6-ksilidinin oluştuğunu bildirir. [[K3 s. 177]]</li>
    </ul><aside class="note"><b>Atlas notu.</b> Kitap 4-hidroksi-2,6-ksilidini asetaldehitten türetir; doğrusu, bu metabolit asetaldehitten değil ksilidid tarafındaki ürünlerden oluşur. İdrarda başlıca konjugatı (4-hidroksi-2,6-dimetilanilin) olarak atılır.</aside></div>
    <div class="card"><h3>Prilokain</h3><ul>
      <li><b>Çözelti.</b> %0.5–2.0 olarak sunulur ve çoğunlukla büyük hacim gerektiğinde kullanılır. [[K3 s. 179]]</li>
      <li><b>Dental.</b> %3 çözelti 0.03 ünite/ml felipressin içerir. [[K3 s. 179]] Maksimum doz tek başına 6 mg/kg, felipressinle 8 mg/kg’dır. [[K3 s. 179]]</li>
      <li><b>Spinal.</b> Hiperbarik %2 çözeltinin sık kullanılan 40–60 mg (2–3 ml) dozunda motor işlev spinal bupivakaine göre daha hızlı döner. [[K3 s. 179]]</li>
      <li><b>Methemoglobinemi.</b> Yenidoğanda eritrosit methemoglobin redüktaz eksikliği riski artırır. [[K3 s. 179]] Tedavide indirgeyici olarak askorbik asit veya metilen mavisi gerekebilir. [[K3 s. 179]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a11b-deri">
  <h2>Deride topikal anestezi</h2>
  <p class="intro">Ametokain krem EMLA’ya benzer biçimde uygulanır ve deriyi daha hızlı uyuşturur. [[K3 s. 180]]</p>
  <div class="viz"><div class="viz-head"><h3>Kanülasyon öncesinde ne kadar beklenir?</h3></div><div data-viz="a11b_bekleme"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Deriye uygulama süreleri. [[K3 s. 177]] [[K3 s. 180]]</p></div>
  <p><b>Ötektik karışım</b> tek bir fiziksel özellikler kümesi gösterir. [[K3 s. 177]] EMLA’da %2.5 lidokain ve %2.5 prilokain kristal bazlarının karışması erime noktasını düşürür. [[K3 s. 177]] Bileşenler tek başına kristal katıyken karışım oda sıcaklığında yağdır ve %5’lik beyaz yağ-su emülsiyonunda bulunur. [[K3 s. 177]]</p>
  <div class="cols a11b-kartlar"><div class="card"><h3>EMLA</h3><ul>
    <li><b>Sunum.</b> 5 g veya 30 g tüpler, vasküler kanülasyon ya da deri grefti alınması öncesinde kullanılır. [[K3 s. 177]]</li>
    <li><b>Methemoglobinemi.</b> Prilokainin o-toluidin metaboliti bu reaksiyonu kremle de tetikleyebilir. [[K3 s. 178–179]] Konjenital veya idiyopatik methemoglobinemide ve methemoglobin oluşturan ilaç kullanan 12 aydan küçük bebeklerde kremden kaçınılır. [[K3 s. 178]]</li>
    <li><b>Etkileşim.</b> Sülfonamidler ve fenitoin methemoglobinemi riskini artırır. [[K3 s. 178]] Sınıf I antiaritmiklerle (tokainid, meksiletin) toksisite aditif, hatta sinerjistik olabileceğinden dikkat gerekir. [[K3 s. 178]]</li>
    <li><b>Mukoza.</b> Kitap hızlı sistemik emilim nedeniyle mukozaya uygulamadan kaçınılmasını söyler. [[K3 s. 178]]</li>
  </ul><aside class="note"><b>Atlas notu.</b> Kitap mukoza için genel bir kısıtlama bildirir. Erişkinlerde ve 12 yaş ve üzeri ergenlerde genital mukozanın topikal anestezisi, sağlık mesleği mensubunun uygulaması veya gözetimiyle bu kurala istisnadır.</aside></div>
  <div class="card"><h3>Ametokain</h3><ul>
    <li><b>Deri.</b> Bu topikal ester, bir miktar vazodilatasyon ve eritem yaparak venöz kanülasyonu kolaylaştırabilir. [[K3 s. 180]]</li>
    <li><b>Göz.</b> %0.5 ve %1 damlalar lokal anestezik blok öncesinde veya lens cerrahisinde tek ajan olarak kullanılabilir. [[K3 s. 180]] İlk damlada yanma olabilir. [[K3 s. 180]]</li>
  </ul></div></div>
</section>

<section class="wrap blk ders-sec" id="a11b-epidural">
  <h2>Bupivakain, levobupivakain ve ropivakain</h2>
  <p class="intro">Kardiyak toksisite kaygısına ve iki yeni ajana karşın, doğumda ve ameliyat sonrasında epidural infüzyonun temel ajanı bupivakaindir. [[K3 s. 178]]</p>
  <div class="viz"><div class="viz-head"><h3>Ropivakain infüzyonu sürerken hangi lifler bloke olur?</h3></div><div data-viz="a11b_lif"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel lif karşılaştırması. [[K3 s. 179]]</p></div>
  <p>Eşdeğer dozda ropivakainin motor bloğu bupivakaine göre daha geç başlar, daha hafiftir ve daha kısa sürer. [[K3 s. 179]] Duyusal ve motor blok arasındaki ayrım ve daha yüksek klirens, ropivakaini epidural infüzyona teorik olarak daha uygun kılabilir. [[K3 s. 179]]</p>
  <aside class="note"><b>Atlas notu.</b> Kitap büyük miyelinli motor lifleri Aβ olarak adlandırır; motor lifler Aα grubundadır, Aβ lifleri dokunma ve basıncı taşır.</aside>
  <div class="tbl-wrap"><table class="tbl a11b-tablo"><thead><tr><th>Ajan</th><th>Preparat ve doz</th></tr></thead><tbody>
    <tr><th scope="row">Bupivakain</th><td>%0.25 ve %0.5 çözeltiler, adrenalinsiz veya 1:200000 adrenalinli. [[K3 s. 178]] Subaraknoid blok için %0.5 çözeltide 80 mg/ml glukoz bulunur (özgül ağırlık 1.026). [[K3 s. 178]] Bildirilen maksimum doz 2 mg/kg’dır. [[K3 s. 178]]</td></tr>
    <tr><th scope="row">Levobupivakain</th><td>2.5, 5 ve 7.5 mg/ml çözeltilerin kullanım alanları bupivakaine benzer. [[K3 s. 178]] Önerilen üst sınır tek dozda 150 mg, 24 saatte 400 mg’dır. [[K3 s. 178]]</td></tr>
    <tr><th scope="row">Ropivakain</th><td>2, 7.5 ve 10 mg/ml çözeltiler, 10 ve 100 ml hacimlerde sunulur. [[K3 s. 179]] Vazokonstriktör, etki süresini veya dokulardan alımı değiştirmediğinden preparata eklenmez. [[K3 s. 179]]</td></tr>
  </tbody></table></div>
  <ul class="a11b-liste">
    <li><b>Bupivakain.</b> Başlangıcı orta hızda veya yavaştır, lidokaininkinden belirgin olarak daha geçtir. [[K3 s. 178]] Amidler içinde proteine en yüksek oranda bağlanır. [[K3 s. 178]] Karaciğerde dealkilasyonla pipekolik asit ve pipekolilksilidin oluşur. [[K3 s. 178]]</li>
    <li><b>Levobupivakain.</b> Rasemik (S + R) bupivakainin S enantiyomeridir ve tek üstünlüğü daha düşük toksisite potansiyelidir. [[K3 s. 178]] Hayvan verileri ve sınırlı gönüllü çalışmaları, kardiyak K⁺ kanallarının blokajıyla miyokard depresyonu için bupivakainden daha yüksek doz gerekebileceğini düşündürür. [[K3 s. 178–179]] Merkezi sinir sistemi uyarılması veya konvülsiyonlar bupivakainle daha düşük dozda görülebilir. [[K3 s. 179]]</li>
    <li><b>Ropivakain.</b> Bu amid saf S formunda sunulur ve toksisite profili bupivakainden daha elverişlidir. [[K3 s. 179]] R formu daha az potent, daha toksiktir. [[K3 s. 179]] Piperidin azotundaki grup ropivakainde propil, bupivakainde bütil, mepivakainde metildir. [[K3 s. 179]] Karaciğerde aromatik hidroksilasyon başlıca 3-hidroksi-ropivakain, ayrıca 4-hidroksi-ropivakain oluşturur. [[K3 s. 179]] İki metabolit de bir miktar lokal anestezik etkinlik taşır. [[K3 s. 179]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a11b-ester">
  <h2>Kokain ve kloroprokain</h2>
  <p class="intro">Kokain topikal anestezi ve lokal vazokonstriksiyon sağlar, ultra kısa etkili kloroprokain ise nöroaksiyel anestezide kullanılmıştır. [[K3 s. 180]]</p>
  <div class="viz"><div class="viz-head"><h3>Kokainin hangi etkileri birlikte görülür?</h3></div><div data-viz="a11b_kokain"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel etki şeması. [[K3 s. 180]]</p></div>
  <div class="cols a11b-kartlar"><div class="card"><h3>Kokain</h3><ul>
    <li><b>Köken.</b> Bolivya ve Peru’ya özgü <i>Erythroxylon coca</i> yapraklarından elde edilen bir esterdir. [[K3 s. 180]]</li>
    <li><b>Nazal kullanım.</b> Moffatt çözeltisi (2 ml %8 kokain, 2 ml %1 sodyum bikarbonat, 1 ml 1:1000 adrenalin) yan etki olasılığı nedeniyle daha az tercih edilir. [[K3 s. 180]]</li>
    <li><b>Sunum ve doz.</b> %1–4 pat olarak da hazırlanır. [[K3 s. 180]] Kitabın önerdiği maksimum doz 1.5 mg/kg veya 100 mg’dır. [[K3 s. 180]]</li>
    <li><b>Kinetik.</b> Mukozadan iyi emilir, proteinlere yaklaşık %95 bağlanır. [[K3 s. 180]] Diğer esterlerden farklı olarak karaciğerde önemli ölçüde hidrolize uğrar ve inaktif ürünleri idrarla atılır. [[K3 s. 180]]</li>
  </ul></div>
  <div class="card"><h3>Kloroprokain</h3><ul>
    <li><b>Preparatın geçmişi.</b> Bu ester 1952’de kullanıma girdi. [[K3 s. 180]] Sodyum bisülfit eklenmesinden sonra yüksek epidural doz alan kadınlarda nörolojik hasar bildirilince kullanımı bırakıldı. [[K3 s. 180]]</li>
    <li><b>Kısa cerrahi.</b> Güncel preparatlar koruyucusuzdur. [[K3 s. 180]] %1 veya %2 çözeltiden 30–60 mg, 60 dakikadan kısa işlemlerde yararlı görünür. [[K3 s. 180]] Bupivakainden hızlı derlenme günübirlik uygulamada yarar sağlayabilir. [[K3 s. 180]]</li>
  </ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a11b-p1">
  <h2>Part I · MTF</h2><p>Her önermeyi ayrı ayrı doğru veya yanlış olarak işaretleyin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far11b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far11b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far11b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a11b-p2">
  <h2>Part II · SOE 2 (Farmakoloji)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bupivakain, levobupivakain ve ropivakaini epidural infüzyon açısından karşılaştırın. Enantiyomer seçimi ve infüzyonun sürmesi bu karşılaştırmayı nasıl etkiler?</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Rasemik bupivakain, kardiyak toksisite kaygısına rağmen doğumda ve postoperatif epidural infüzyonda temel ajandır. [[K3 s. 178]]</li>
    <li>S enantiyomeri levobupivakainle miyokard depresyonu veya merkezi uyarılma için daha yüksek doz gerekebilir. [[K3 s. 178–179]]</li>
    <li>Ropivakain saf S formundadır, R formunun potensi daha düşük ve toksisitesi daha yüksektir. [[K3 s. 179]]</li>
    <li>Ropivakainin düşük lipit çözünürlüğü başlangıçta büyük motor liflere geçişi sınırlayabilir. [[K3 s. 179]] Sürekli infüzyonda Aβ ve C liflerinin blok dereceleri benzer hale gelir. [[K3 s. 179]]</li>
    <li>Başlangıçtaki duyusal/motor ayrım ve yüksek klirens epidural infüzyonda teorik avantaj sağlar. [[K3 s. 179]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Bupivakaini R ve S dallarına ayırıp levobupivakaini işaretleyin. [[K3 s. 178]] Yanına saf S ropivakaini koyup Aβ ve C liflerinin başlangıçtaki ve sürekli infüzyondaki bloklarını gösterin. [[K3 s. 179]]</div>
  <div class="note plain"><b>Olası ek sorular</b><ul><li>Levobupivakainin tek doz sınırı ile 24 saatlik doz sınırı nedir? [[K3 s. 178]]</li><li>Ropivakaine neden vazokonstriktör eklenmez? [[K3 s. 179]]</li><li>Prilokain hangi metabolitiyle yenidoğanda özel risk oluşturur? [[K3 s. 179]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a11b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Kalp veya karaciğer yetmezliği lidokain klirensini düşürür. [[K3 s. 177]]</li>
    <li>Prilokainin o-toluidin metaboliti EMLA kullanımı sırasında da methemoglobinemiye yol açabilir. [[K3 s. 178–179]]</li>
    <li>Sağlam deride EMLA en az 60 dakika kalmalıdır, ametokain 30 dakikada iyi anestezi sağlar. [[K3 s. 177]] [[K3 s. 180]]</li>
    <li>Bupivakain rasemiktir, levobupivakain ve ropivakain saf S formundadır. [[K3 s. 178–179]]</li>
    <li>Kokain hipertansiyon ve aritmiyi tetikleyebilir. [[K3 s. 180]] Kloroprokain kısa derlenmesiyle günübirlik cerrahide yararlı olabilir. [[K3 s. 180]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="11b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/11a">← 11a · Lokal anesteziklerin fizyolojisi, etkisi ve toksisitesi</a><a href="#/dersler/farmakoloji/12a">Sonraki: 12a · Nöromüsküler kavşak ve blok monitörizasyonu →</a></nav>
</section>`,
};
