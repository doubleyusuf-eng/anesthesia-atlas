VERI.sorular = VERI.sorular || {};
VERI.sorular['far05-1'] = {
  no: 1, kok: 'Yapısal izomerizm, tautomerizm ve geometrik izomerizm', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 46–47]]',
  onermeler: [
    { t: 'Yapısal izomerlerin atomları aynı sırayla bağlanır.', d: false, n: 'Bağların sırası farklıdır, ortak olan molekül formülüdür. [[K3 s. 46]]' },
    { t: 'Midazolam fizyolojik pH’da iyonize olmayan yedi üyeli bir halka oluşturur.', d: true, n: 'pH 7,4’te oluşan bu yapı lipitte çözünür. [[K3 s. 46]]' },
    { t: 'Metoksamin başlıca β-adrenoseptörler üzerinden etki eder.', d: false, n: 'Metoksaminin etkisine başlıca α-adrenoseptörler aracılık eder. [[K3 s. 46]]' },
    { t: 'Trans düzeninde karşılaştırılan gruplar düzlemin aynı tarafındadır.', d: false, n: 'Aynı taraf cis, karşı taraflar trans düzenine karşılık gelir. [[K3 s. 47]]' },
    { t: 'Mivakuryumdaki en büyük pay trans-trans izomerinindir.', d: true, n: 'Trans-trans payı %58, cis-trans payı %36, cis-cis payı %6’dır. [[K3 s. 47]]' }
  ]
};
VERI.sorular['far05-2'] = {
  no: 2, kok: 'Kiral merkez ve enantiyomerler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 48–49]]',
  onermeler: [
    { t: 'Dört farklı grup taşıyan kuaterner azot kiral merkez olabilir.', d: true, n: 'Dört grubun bağları tetrahedronun köşelerine yönelir. [[K3 s. 48]]' },
    { t: 'S simgesi düzlem polarize ışığın sola döneceğini gösterir.', d: false, n: 'S mutlak konfigürasyonu belirtir, ışık her iki yönden birine dönebilir. [[K3 s. 48]]' },
    { t: 'Bir enantiyomer çifti, üst üste çakıştırılamayan iki ayna görüntüsünden oluşur.', d: true, n: 'Çiftin üyeleri birbirinin çakıştırılamayan ayna görüntüleridir. [[K3 s. 48]]' },
    { t: 'Etomidat enantiyomerlerinin potensleri belirgin biçimde farklıdır.', d: true, n: 'Kitap benzer potens için izofluranı, büyük fark için etomidatı örnek verir. [[K3 s. 49]]' },
    { t: 'Atrakuryumun dört kiral merkezi de karbondur.', d: false, n: 'İkisi karbon, ikisi kuaterner azottur. [[K3 s. 49]]' }
  ]
};
VERI.sorular['far05-3'] = {
  no: 3, kok: 'İzomerlerin ilaç preparatlarındaki yeri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 49–50]]',
  onermeler: [
    { t: 'Propofol rasemik karışıma örnektir.', d: false, n: 'Propofolde kiral merkez ve geometrik izomerizm sağlayan yapı bulunmaz. [[K3 s. 49]]' },
    { t: 'Rasemik bir karışımda iki enantiyomer eşit miktardadır.', d: true, n: 'Rasemik karışımı tanımlayan özellik iki enantiyomerin eşit payıdır. [[K3 s. 50]]' },
    { t: 'Saflaştırma sırasında rasemizasyon görülebilir.', d: true, n: 'Atropin preparatında her iki izomerin bulunması buna örnektir. [[K3 s. 50]]' },
    { t: 'Levobupivakain S-bupivakaindir.', d: true, n: 'Enantiyomerik saf preparatta bupivakainin S biçimi bulunur. [[K3 s. 50]]' },
    { t: 'Çoklu izomer karışımlarında bileşen oranları sentez sürecine bağlıdır.', d: true, n: 'Sentez, preparatta bulunan izomerlerin göreli paylarını belirler. [[K3 s. 50]]' }
  ]
};

const A05_NAV = [['yapi','Yapı ve pH'],['geometri','Cis ve trans'],['kiralite','R ve S'],['preparat','Preparatlar'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];

SAYFALAR['dersler/farmakoloji/05'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 5', baslik: 'İzomerizm',
  lede: 'Aynı molekül formülü, farklı atom düzenlerine ve bazen çok farklı ilaç etkilerine karşılık gelebilir. [[K3 s. 46]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A05_NAV.map(([id,ad],i) => `<button type="button" data-scroll="a05-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a05-yapi">
  <h2>Yapısal izomerizm ve tautomerizm</h2>
  <p class="intro">İzomerlerin molekül formülü aynıdır. [[K3 s. 46]] Yapısal izomerlerde atomların bağlanma sırası, stereoizomerlerde ise bağlar korunurken üç boyutlu yerleşim değişir. [[K3 s. 46]]</p>
  <div class="viz"><div class="viz-head"><h3>pH değiştiğinde midazolam</h3></div><div data-viz="a05_ph"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 46]]</p></div>
  <p><b>Tautomerizm</b>, aynı molekülün iki formu arasındaki dinamik dönüşümdür. [[K3 s. 46]] Bunu çoğu zaman fiziksel ortamdaki bir değişiklik tetikler. [[K3 s. 46]] Midazolamda halka oluşumu lipitte çözünürlüğü artırır, kan-beyin bariyerinden geçişi kolaylaştırır ve merkezi sinir sistemindeki etki yerine ulaşmayı hızlandırır. [[K3 s. 46]] Morfin ve tiyopentalde ise keto-enol dönüşümü görülür. [[K3 s. 46]]</p>
  <p>Yapısal benzerliğin derecesine göre iki izomerin etkileri aynı da olabilir, çok farklı da olabilir. [[K3 s. 46]]</p>
  <div class="tbl-wrap"><table class="tbl a05-tablo"><thead><tr><th>Yapısal izomer çifti</th><th>Farmakolojik karşılaştırma</th></tr></thead><tbody>
    <tr><td>İzofluran ve enfluran<br>C₃H₂ClF₅O [[K3 s. 47]]</td><td>Her ikisi de volatil anesteziktir. [[K3 s. 46]]</td></tr>
    <tr><td>Prednizolon ve aldosteron</td><td>Prednizolon hem glukokortikoid hem mineralokortikoid etki gösterir. [[K3 s. 46]] Aldosteronda mineralokortikoid etki ağır basar. [[K3 s. 46]]</td></tr>
    <tr><td>İzoprenalin ve metoksamin</td><td>Kardiyovasküler etkileri ayrılır. [[K3 s. 46]] İzoprenalin β-adrenoseptörler, metoksamin başlıca α-adrenoseptörler üzerinden etkilidir. [[K3 s. 46]]</td></tr>
    <tr><td>Dihidrokodein ve dobutamin<br>C₁₈H₂₃NO₃ [[K3 s. 47]]</td><td>Ortak formüle karşın farmakolojik etkileri birbirinden çok uzaktır. [[K3 s. 46]]</td></tr>
  </tbody></table></div>
</section>
<section class="wrap blk ders-sec" id="a05-geometri">
  <h2>Geometrik izomerizm</h2>
  <p class="intro">Stereoizomerizm geometrik veya optik olabilir. [[K3 s. 46]] Geometrik izomerizmde çift bağ ya da halka, bağlı grupların serbestçe dönmesini kısıtlar. [[K3 s. 47]]</p>
  <div class="viz"><div class="viz-head"><h3>Mivakuryumun iki halkasını okuyun</h3></div><div data-viz="a05_halka"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel yan görünüm. Çizgi halka düzlemini, noktalar karşılaştırılan grupları gösterir. [[K3 s. 47]]</p></div>
  <p>Farklı grupları taşıyan iki atom çoğu kez karbondur. [[K3 s. 47]] Gruplar çift bağın veya halkanın belirlediği düzlemin aynı tarafındaysa <b>cis</b>, karşı taraflarındaysa <b>trans</b> düzeni vardır. [[K3 s. 47]]</p>
  <p>Mivakuryum gibi bis-benzilizokinolinyum kas gevşeticilerde ester içeren karbon zinciri, iki özdeş heterosiklik grubu birbirine bağlar. [[K3 s. 47]] Her grupta bir düzlemsel halka bulunduğundan, her halkanın düzenini ayrı bir ön ekle belirtiriz. [[K3 s. 47]] Şekilde ilk ön eki soldaki halkadan, ikincisini sağdaki halkadan okuyun. Mivakuryumda trans-trans %58, cis-trans %36 ve cis-cis %6 paya sahiptir. [[K3 s. 47]] Sisatrakuryum cis-cis düzenine örnektir. [[K3 s. 47]]</p>
</section>
<section class="wrap blk ders-sec" id="a05-kiralite">
  <h2>Optik izomerizm ve kiral merkezler</h2>
  <p class="intro">Dört farklı kimyasal grup bir karbona veya kuaterner azota bağlandığında, bağlar bir tetrahedronun köşelerine yönelir. [[K3 s. 48]] Bu kiral merkezin iki düzeni, üst üste çakışmayan ayna görüntüleridir. [[K3 s. 48]]</p>
  <div class="viz"><div class="viz-head"><h3>Atom numaralarını izleyerek R ve S’yi ayırın</h3></div><div data-viz="a05_yon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Atom numarası en küçük olan grup gözlemciden uzağa bakar. [[K3 s. 48]]</p></div>
  <p>Şekilde önce en küçük atom numaralı grubu arkaya alın. [[K3 s. 48]] Kalan üç atomu büyükten küçüğe izlerken saat yönünde ilerliyorsanız R, ters yönde ilerliyorsanız S biçimine bakıyorsunuz. [[K3 s. 48]]</p>
  <p>Tek kiral merkezde <b>R (rectus)</b> ve <b>S (sinister)</b> mutlak uzaysal düzeni tanımlar. [[K3 s. 48]] Bu iki biçim birbirinin enantiyomeridir. [[K3 s. 48]] Eski dextro (d, +) ve laevo (l, −) adları düzlem polarize ışığın sağa veya sola dönüşünü bildirir. [[K3 s. 48]] S biçimi ışığı her iki yönden birine döndürebilir. [[K3 s. 48]]</p>
  <ul>
    <li><b>Tek merkezli ilaçlar.</b> Varfarin, ketamin, etomidat, izofluran ve halotanın R ve S biçimleri vardır. [[K3 s. 48]] Bupivakain ve ropivakain de bu gruptadır. [[K3 s. 49]]</li>
    <li><b>Etki.</b> Üç boyutlu yerleşim genellikle moleküler düzeyde farmakodinamiği belirler. [[K3 s. 48]] Reseptör aracılı etkide enantiyomerlerin etkinliği belirgin farklılık gösterebilir. [[K3 s. 48]] Etki fizikokimyasal özelliğe dayanıyorsa benzer etkinlik beklenir. [[K3 s. 48]]</li>
    <li><b>Potens.</b> İki enantiyomerin potensi izofluranda benzer, etomidatta çok farklıdır. [[K3 s. 49]]</li>
  </ul>
  <h3>Birden fazla kiral merkez</h3>
  <p>Birden fazla kiral merkezde stereoizomerlerin hepsi birbirinin ayna görüntüsü değildir; kitap bunlar için diastereoizomer terimini kullanır. [[K3 s. 49]] Atrakuryumun iki karbonu ve iki kuaterner azotu kiral merkezdir. [[K3 s. 49]] Bu dört merkez için teorik olarak 16 düzen vardır, ancak iç simetri nedeniyle yalnız 10 ayrı yapı oluşur. [[K3 s. 49]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap üst sınırı n² verir. Doğrusu, n bağımsız kiral merkez için en çok 2ⁿ stereoizomerdir.</div>
  <div class="note plain"><b>Atlas notu.</b> Kitap çok merkezli izomerleri topluca diastereoizomer olarak adlandırır. Doğrusu, bu kümede ayna görüntüsü oluşturan çiftler enantiyomer, birbirinin ayna görüntüsü olmayan stereoizomer çiftleri diastereoizomerdir.</div>
</section>
<section class="wrap blk ders-sec" id="a05-preparat">
  <h2>Preparatta hangi izomerler bulunur?</h2>
  <p class="intro">Birçok anestezik ilaç izomer karışımı olarak sunulur. [[K3 s. 50]] Sevofluran, propofol ve dopaminde ise ne kiral merkez ne de geometrik izomerizm sağlayan bir yapı vardır. [[K3 s. 49]]</p>
  <div class="viz"><div class="viz-head"><h3>Bupivakain preparatını seçin</h3></div><div data-viz="a05_karisim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel bileşim. [[K3 s. 50]]</p></div>
  <p>Doğada enzimlerin seçiciliği nedeniyle kiral moleküller genellikle tek izomer halinde bulunur (örneğin D-glukoz). [[K3 s. 50]] Tıbbi kullanım için saflaştırma sıklıkla rasemizasyona yol açar, bu yüzden atropin preparatında her iki izomer de bulunur. [[K3 s. 50]]</p>
  <div class="tbl-wrap"><table class="tbl a05-tablo"><thead><tr><th>Preparat</th><th>Bileşim ve örnekler</th></tr></thead><tbody>
    <tr><td>Rasemik karışım</td><td>Tek kiral merkezli ilacın iki enantiyomeri eşit miktardadır. [[K3 s. 50]] Örnekler arasında izofluran, varfarin, bupivakain, ketamin ve adrenalin bulunur. [[K3 s. 50]]</td></tr>
    <tr><td>Enantiyomerik saf preparat</td><td>En etkin veya en az toksik izomeri tek başına üretmek klinik avantaj sağlayabilir. [[K3 s. 50]] Örnekler R-etomidat, S-bupivakain (levobupivakain), S-ropivakain, S-ketamin, S-ketoprofen (deksketoprofen), S-medetomidin (deksmedetomidin) ve R-noradrenalindir. [[K3 s. 50]]</td></tr>
    <tr><td>Çoklu izomer karışımı</td><td>Karmaşık karbon yapılarındaki olası geometrik ve optik izomerlerin tümü veya bir kısmı preparatta bulunabilir. [[K3 s. 50]] Oranları sentez süreci belirler. [[K3 s. 50]] Kitabın listesinde vekuronyum, pankuronyum, atrakuryum, efedrin, morfin, fentanil ve remifentanil yer alır. [[K3 s. 50]]</td></tr>
  </tbody></table></div>
  <div class="note plain"><b>Atlas notu.</b> Kitap fentanil ve remifentanili çoklu izomer karışımlarına örnek verir. Doğrusu, her iki ana bileşiğin standart yapısında bu tür izomerleri oluşturacak stereomerkez bulunmaz.</div>
  <p>Karışımdaki paylar eşit olsa bile izomerlerin farmakodinamik ve farmakokinetik katkıları çok farklı olabilir. [[K3 s. 50]] Yan etki veya toksisiteden tek bir izomer sorumlu olabilir. [[K3 s. 50]]</p>
</section>
<section class="wrap blk ders-sec" id="a05-p1">
  <h2>Part I · MTF</h2><p>Her önermeyi doğru veya yanlış olarak işaretleyin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far05-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far05-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far05-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a05-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>İzomerleri bağ sırası ve uzaysal yerleşime göre nasıl ayırırsınız? Mivakuryum ve bupivakain preparatları üzerinden açıklayın.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Ortak molekül formülünden başlayın. Yapısal izomerlerde bağ sırası değişir, stereoizomerlerde bağ sırası korunur. [[K3 s. 46]]</li>
    <li>Geometrik izomerizmde dönmenin kısıtlanması grupları aynı veya karşı tarafta tutar. [[K3 s. 47]]</li>
    <li>Mivakuryumun iki halkası için trans-trans %58, cis-trans %36 ve cis-cis %6 oranlarını verin. [[K3 s. 47]]</li>
    <li>Optik izomerizmde tek kiral merkez birbirinin ayna görüntüsü olan R ve S biçimlerini verir. [[K3 s. 48]]</li>
    <li>Rasemik bupivakainde iki enantiyomer eşit paydadır, levobupivakain yalnız S biçimini içerir. [[K3 s. 50]] Eşit pay, eşit etki anlamına gelmez. [[K3 s. 50]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Ortak formülden yapısal ve stereoizomerlere dallanın. [[K3 s. 46]] Stereoizomer dalında mivakuryum halkalarının yan görünümünü ve bupivakainin R/S çiftini gösterin. [[K3 s. 47–49]] Bupivakain çiziminin altında rasemik ve saf S preparatlarını ayırın. [[K3 s. 50]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> S simgesi ışığın dönüş yönünü bildirir mi? [[K3 s. 48]] Atrakuryumda neden yalnız 10 ayrı yapı vardır? [[K3 s. 49]] Midazolamda pH, etki yerine ulaşmayı nasıl etkiler? [[K3 s. 46]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a05-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Bağ sırasını karşılaştırmak yapısal izomeri, bağlar aynıysa uzaysal yerleşimi karşılaştırmak stereoizomeri ayırt ettirir. [[K3 s. 46]]</li>
    <li>Midazolam pH 7,4’te lipitte çözünen halkalı biçime geçer. [[K3 s. 46]]</li>
    <li>Cis ve trans için grupların düzleme göre hangi tarafta olduğuna bakılır. [[K3 s. 47]]</li>
    <li>R/S mutlak konfigürasyonu, (+)/(−) polarize ışığın dönüş yönünü gösterir. [[K3 s. 48]]</li>
    <li>İç simetri ayrı stereoizomer sayısını azaltabilir. [[K3 s. 49]]</li>
    <li>Rasemik karışımda iki enantiyomer eşit paydadır, saf preparatta yalnız seçilen izomer vardır. [[K3 s. 50]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="05"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/04">← 4 · İlaç etkileşimi</a><a href="#/dersler/farmakoloji/06a">Sonraki: 06a · Matematiksel kavramlar →</a></nav>
</section>`
};
