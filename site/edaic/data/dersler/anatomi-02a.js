VERI.sorular = VERI.sorular || {};
VERI.sorular['an02a-1'] = {
  no: 1, kok: 'Perikard ve kalbin dış yüzü', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 81–84]]',
  onermeler: [
    { t: 'Oblik sinüs sol atriyumun önündedir.', d: false, n: 'Sol atriyum oblik sinüsün ön duvarını oluşturur. [[K5 s. 81]]' },
    { t: 'Fibröz perikardın tabanı diyaframın santral tendonuna tutunur.', d: true, n: 'Bu birleşme nedeniyle derin inspirasyonda diyafram kalbi aşağı çeker. [[K5 s. 81]]' },
    { t: 'Sağ ventrikül kalbin sağ kenarını oluşturur.', d: false, n: 'Sağ kenar bütünüyle sağ atriyuma aittir. [[K5 s. 82]]' },
    { t: 'Transvers sinüs çıkan aortun arkasında kalır.', d: true, n: 'Aort ile pulmoner trunkus sinüsü önden sınırlar. [[K5 s. 81]]' },
    { t: 'Kalbin tabanını başlıca sağ atriyum oluşturur.', d: false, n: 'Tabanın büyük bölümünde pulmoner venleri alan sol atriyum bulunur. [[K5 s. 83–84]]' },
  ],
};
VERI.sorular['an02a-2'] = {
  no: 2, kok: 'Boşluklar, kapaklar ve ileti', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 85–88]]',
  onermeler: [
    { t: 'Moderatör bant sağ dalı ventrikül kasına taşır.', d: true, n: 'Bant septumdan sağ ventrikülün ön duvarına uzanır. [[K5 s. 85]]' },
    { t: 'Mitral kapağın posterior yaprakçığı anterior yaprakçıktan büyüktür.', d: false, n: 'İki mitral yaprakçığın büyüğü anteriordadır. [[K5 s. 85]]' },
    { t: 'Pulmoner kapağın bir posterior ve iki anterior yaprakçığı vardır.', d: true, n: 'Öndeki iki yaprakçık sağ ve sol olarak adlandırılır. [[K5 s. 85]]' },
    { t: 'Atriyoventriküler düğüm koroner sinüs ağzının hemen üstündedir.', d: true, n: 'Düğüm bu açıklığın üzerinde, atriyal septumda yer alır. [[K5 s. 88]]' },
    { t: 'Sağ ventrikül infundibulumunun iç yüzü düzgün duvarlıdır.', d: true, n: 'Trabeküller giriş yolunda, düzgün yüzey ise çıkış yolundadır. [[K5 s. 85]]' },
  ],
};
VERI.sorular['an02a-3'] = {
  no: 3, kok: 'Koroner dolaşım ve yüzey anatomisi', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 89–92]]',
  onermeler: [
    { t: 'Büyük kardiyak ven inferior interventriküler olukta seyreder.', d: false, n: 'Büyük ven anterior, orta ven inferior interventriküler oluğu izler. [[K5 s. 90]]' },
    { t: 'Sağ koroner arter anterior aort sinüsünden çıkar.', d: true, n: 'Bu sinüsten öne, pulmoner trunkus ile sağ atriyum arasına ilerler. [[K5 s. 89]]' },
    { t: 'Apeks vurusu sol beşinci interkostal aralıkta, orta hattan 9 cm uzaktadır.', d: true, n: 'Bu nokta kalbin yüzey dörtgeninin sol alt köşesidir. [[K5 s. 90]]' },
    { t: 'Anterior kardiyak ven koroner sinüse açılır.', d: false, n: 'Anterior kardiyak ven doğrudan sağ atriyuma boşalır. [[K5 s. 90]]' },
    { t: 'PA grafide aort topuzu aort arkının uçtan görünümüne karşılık gelir.', d: true, n: 'Bu çıkıntı kalbin hemen üstünde, mediastenin sol kenarındadır. [[K5 s. 92]]' },
  ],
};

const AN02A_NAV = [
  ['perikard','Perikard'], ['yuzler','Kalbin yüzleri'], ['bosluklar','Boşluklar ve kapaklar'],
  ['klinik','TEE ve kateter'], ['ileti','İleti'], ['koroner','Koroner arterler'], ['donus','Venöz dönüş'], ['sinus','Koroner sinüs'],
  ['izdusum','Yüzey ve grafi'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];
SAYFALAR['dersler/anatomi/02a'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 2 · Ders 02a', baslik: 'Perikard ve kalp',
  lede: 'Kalbe önden bakınca en geniş alanı sağ ventrikül kaplar. [[K5 s. 83]] Arkada ise dört pulmoner venin açıldığı sol atriyum yer alır. [[K5 s. 83–85]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${AN02A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="an02a-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="an02a-perikard">
<h2>Perikard ve iki sinüs</h2>
<p class="intro">Fibröz perikard kalbi ve büyük damar köklerini koni biçiminde sarar. [[K5 s. 81]]</p>
<div class="viz"><h3>Dıştan içe hangi katmanlardan geçilir?</h3><div data-viz="an02a_katman"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="note plain"><b>Atlas notu.</b> Kitap sağlıklı perikard boşluğunu içeriksiz olarak tanımlar, ancak fizyolojik olarak iki seröz yaprak arasında kaymayı kolaylaştıran ince bir seröz sıvı filmi bulunur. [[K5 s. 81]]</div>
<div class="cols"><div class="card"><h3>Üç tutunma yeri</h3><ul>
<li>Tepede kese, Louis açısı düzeyinde büyük damarların adventisyasıyla kaynaşır. [[K5 s. 81]]</li>
<li>Önde gevşek fibröz sternoperikardiyal bağ, keseyi sternumun arka yüzüne bağlar. [[K5 s. 81]]</li>
<li>Taban diyaframın santral tendonuyla birleşir. [[K5 s. 81]]</li></ul></div>
<div class="card"><h3>Kesenin komşuları</h3><ul>
<li><b>Ön.</b> Sternum gövdesi, iki yanda 3.–6. kostal kıkırdaklar ve akciğerlerin ince ön kenarları. [[K5 s. 81]]</li>
<li><b>Yan.</b> Mediastinal plevra ve frenik sinir. [[K5 s. 81]]</li>
<li><b>Arka.</b> Özofagus, desendan aort, bronşlar ve T5–T8 vertebra gövdeleri. [[K5 s. 81]]</li></ul></div></div>
<p>Derin inspirasyonda diyaframla birlikte kalp de aşağı iner. [[K5 s. 81]] Gebelikte, karın distansiyonunda ve kısa, tıknaz kişilerde yüksek diyafram kalbin daha enine duruşuyla ilişkilidir. [[K5 s. 81]] Kalp yatarken daha yukarıda, dik dururken daha aşağıdadır. [[K5 s. 81]]</p>
<p>Fetal seröz kesenin organ tarafından içeri doğru itilmesi iki yaprak oluşturur. [[K5 s. 81]] Plevra, periton ve tunika vajinaliste de görülen bu düzen, perikard yapraklarının büyük damar köklerinde birbirine dönmesini açıklar. [[K5 s. 81]]</p>
<div class="cols"><div class="card"><h3>Transvers sinüs · geçit</h3><p>Ön sınırda aort ve pulmoner trunkus, arka sınırda superior vena kava ve sol atriyum bulunur. [[K5 s. 81]] Fetal kalp tüpü S biçimini alırken ventrikül ve trunkus, atriyum ile kavanın önüne geçer ve aralarında transvers sinüs kalır. [[K5 s. 81–82]] Kıvrılma çiziminde sinüs venozus, atriyum ve ventrikülle birlikte bulbus cordis ve trunkus arteriozus da izlenebilir. [[K5 s. 82]]</p></div>
<div class="card"><h3>Oblik sinüs · cep</h3><p>Sol atriyumun arkası ile perikard arasındaki cebi, her yanda iki pulmoner ven sınırlar. [[K5 s. 81]] İnferior vena kava sağ ve alt sınıra katılır. [[K5 s. 81]]</p><p>Başlangıçta tek pulmoner ven dorsal mezokardiyumdan geçer ve iki akciğerden topladığı kanı sol atriyuma getirir. [[K5 s. 81]] Ven gövdesi atriyuma katılınca perikard boşluğunu dört ven geçer ve aradaki reses kalır. [[K5 s. 81]] Kalp çıkarılıp keseye önden bakıldığında sağ ve sol üst-alt pulmoner venler ile sol pulmoner arter ve bronş ayırt edilir. [[K5 s. 82]]</p></div></div></section>

<section class="wrap blk ders-sec" id="an02a-yuzler"><h2>Kalbin kenarları ve yüzleri</h2>
<p class="intro">Kalp, mediastenin ortasında eğik yerleşmiş düzensiz bir konidir. [[K5 s. 82]]</p>
<div class="viz"><h3>Önden görünümde boşlukları bulun</h3><div data-viz="an02a_on"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="an02a-cift"><div><h3>Kenarları izleyin</h3><ul>
<li><b>Sağ kenar</b> bütünüyle sağ atriyumdur. [[K5 s. 82]]</li>
<li><b>Sol kenarın</b> çoğunu sol ventrikül, küçük bir bölümünü sol atriyum apendiksi oluşturur. [[K5 s. 82]]</li>
<li><b>Alt kenarda</b> sağ ventrikül baskındır, sağ atriyumun alt bölümü ve sol ventrikül apeksi de bu kenara katılır. [[K5 s. 82]]</li></ul></div>
<div><h3>Yüzleri oluklarla ayırın</h3><ul>
<li><b>Ön yüzde</b> sağ ventrikülü, sağ atriyumdan dikey atriyoventriküler oluk, sol ventrikülden anterior interventriküler oluk ayırır. [[K5 s. 83]]</li>
<li><b>Diyafragmatik yüzde</b> iki ventrikül posterior interventriküler oluğun iki yanında yer alır, sağ atriyumun inferior vena kavayı alan bölümü de bu yüze katılır. [[K5 s. 83]]</li>
<li><b>Taban</b> dörtgen biçimli arka yüzdür. [[K5 s. 83–84]] Çoğunu pulmoner ven ağızlarıyla sol atriyum, geri kalanını sağ atriyum oluşturur. [[K5 s. 83–84]]</li></ul></div></div>
<p>Arkadan bakışta aort arkının brakiyosefalik, sol ana karotis ve sol subklavyen dalları seçilir. [[K5 s. 83]] Azigos veni, superior vena kava ve sağ pulmoner arter de bu görünümde işaretlenmiştir. [[K5 s. 83]]</p></section>

<section class="wrap blk ders-sec" id="an02a-bosluklar"><h2>Boşluklar ve kapaklar</h2>
<p class="intro">Ventriküllerde atriyoventriküler kapak yaprakçıklarını papiller kaslara tendinöz kordlar bağlar. [[K5 s. 85]]</p>
<div class="viz"><h3>Mitral yaprakçıktan papiller kasa</h3><div data-viz="an02a_mitral"></div><p class="viz-cap" aria-live="polite"></p></div>
<div class="cols"><div class="card"><h3>Sağ atriyum</h3>
<p>Superior vena kava üst-arka bölüme, inferior vena kava ile koroner sinüs alt bölüme açılır. [[K5 s. 84–85]] Ön bölüm kalbin ön yüzünün çoğunu drene eden anterior kardiyak veni alır. [[K5 s. 85]]</p>
<p>Kavalar arasındaki yaklaşık dikey iç kabartı <b>krista terminalis</b>, dıştaki sığ terminal sulkusa karşılık gelir. [[K5 s. 85]] Arkasındaki düzgün duvar sinüs venozustan gelişir, önündeki pürtüklü duvar fetal atriyumdan gelir ve apendikse uzanır. [[K5 s. 85]]</p>
<p>İnferior vena kava ve koroner sinüs ağızlarında rudimenter kapaklar vardır. [[K5 s. 85]] Kava kapağı septumdaki sığ fossa ovalisi çevreleyen halkayla (annulus ovalis) devamlıdır. [[K5 s. 85]] Çukur, fetal foramen ovalenin yerini gösterir. [[K5 s. 85]]</p></div>
<div class="card"><h3>Sol atriyum</h3><p>Sağ atriyuma göre biraz küçük ve biraz daha kalın duvarlıdır. [[K5 s. 85]] Dört pulmoner ven arka duvarın üst bölümüne açılır. [[K5 s. 85]] Septumdaki sığ çöküntü, sağdaki fossa ovalisin karşısındadır. [[K5 s. 85]]</p><p>Ana boşluğun duvarı düzgündür, kulakçığın içinde ise alttaki pektinat kaslar kabartılar oluşturur. [[K5 s. 85]]</p></div></div>
<h3>Sağ ventrikülün giriş ve çıkış yolları</h3>
<ul><li><b>Giriş.</b> Sağ atriyumdan dikey triküspit kapağa geçilir. [[K5 s. 85]] Açıklık üç parmak alır, kanat biçimli üç üçgen yaprakçığın (medial, anterior, inferior) tabanları fibröz halkaya tutunur. [[K5 s. 85]]</li>
<li><b>İç duvar.</b> Etsi trabeküller düzensiz kas kabartılarıdır. [[K5 s. 85]] Bazılarından boşluğa uzanan papiller kasların kordları triküspit yaprakçıkların serbest kenarlarına tutunur. [[K5 s. 85]] Moderatör bant boşluğu septumdan ön duvara kat eder ve ileti demetinin sağ dalını ventrikül kasına taşır. [[K5 s. 85]]</li>
<li><b>Çıkış.</b> İki açıklık arasındaki infundibüloventriküler krest giriş ile çıkışı ayırır. [[K5 s. 85]] Düzgün duvarlı infundibulum yukarı ve sağa, pulmoner trunkusa yönelir. [[K5 s. 85]] Aradaki pulmoner kapağın yaprakçıkları posterior, sağ anterior ve sol anteriordur. [[K5 s. 85]]</li></ul>
<h3>Sol ventrikülün giriş ve çıkış yolları</h3>
<ul><li><b>Giriş.</b> Sol atriyumla bağlantıyı iki parmak alan mitral açıklık sağlar. [[K5 s. 85]]</li>
<li><b>İç duvar.</b> Kalın etsi trabeküller, aort açıklığının hemen altında yerini fibröz vestibüle bırakır. [[K5 s. 85]]</li>
<li><b>Çıkış.</b> Aort kapağının üç yarımay yaprakçığı sağ posterior, sol posterior ve anterior konumdadır. [[K5 s. 85]] Hemen üstlerindeki genişlemeler aort sinüsleridir. [[K5 s. 85–86]] Sağ koroner arterin ağzı anterior sinüste, sol koroner arterinki sol posterior sinüstedir. [[K5 s. 86]]</li></ul></section>

<section class="wrap blk ders-sec" id="an02a-klinik"><h2>Kalbi özofagustan ve damar içinden değerlendirmek</h2>
<p class="intro">Transözofageal ekokardiyografi (TEE) kalbin yapısını, boyutlarını ve duvar hareketini gerçek zamanlı gösterir. [[K5 s. 86]]</p>
<div class="viz"><h3>Pulmoner arter kateterinin yolu</h3><div data-viz="an02a_kateter"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Ameliyathanede ve yoğun bakımda giderek daha sık kullanılan TEE, tüm kalp yapıları ve işlevleri hakkında bilgi verir. [[K5 s. 86]] Sol atriyal trombüsün saptanmasında çok duyarlıdır, aort ve pulmoner arterlerin işlevsel durumunu da değerlendirmeye yardım edebilir. [[K5 s. 86]]</p>
<p>Yüksek riskli hastalarda koroner baypas, kapak replasmanı ve torakoabdominal anevrizma cerrahisi sık kullanım alanlarıdır. [[K5 s. 86]] Kitabın TEE örneğinde aort ile iki ventrikül ayırt edilir ve probun kalbe göre konumu gösterilir. [[K5 s. 87]]</p>
<p>Pulmoner arter kateteri geçmişe göre daha az kullanılsa da ameliyathanede ve yoğun bakımda seçilmiş hastalarda yerini korur. [[K5 s. 86]] Kitaptaki örnekte kateter yerindeyken anteroposterior akciğer grafisinde görülür. [[K5 s. 88]]</p></section>

<section class="wrap blk ders-sec" id="an02a-ileti"><h2>Uyarı sağ atriyumdan ventrikül kasına nasıl ulaşır?</h2>
<p class="intro">İleti sisteminin düğümleri ve atriyoventriküler demeti özelleşmiş kalp kasından oluşur. [[K5 s. 88]]</p>
<div class="viz"><h3>Uyarının yolunu izleyin</h3><div data-viz="an02a_ileti"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Fibroyağlı atriyoventriküler oluk atriyum miyokardını ventrikül miyokardından ayırır. [[K5 s. 84]] İleti çiziminde demet ve dalları yalıtılmış olarak gösterilir, Purkinje lifleri ventrikül kasını uyarır. [[K5 s. 84]]</p>
<div class="cols"><div class="card"><h3>Düğümlerin arterleri</h3><p>Sinoatriyal düğümün kanı olguların yaklaşık %65’inde sağ koroner arterden, geri kalanlarda genellikle sol koroner arterin sirkumfleks dalından gelir. [[K5 s. 89]] Atriyoventriküler düğümü kişilerin %80’inde sağ koroner arter besler. [[K5 s. 89]]</p></div>
<div class="card"><h3>Otonom innervasyon</h3><p>Vagustan (kardiyoinhibitör) ve servikal ile üst torakal sempatik ganglionlardan (kardiyoakseleratör) gelen lifler, yüzeyel ve derin kardiyak pleksuslar üzerinden kalbe ulaşır. [[K5 s. 90]]</p></div></div></section>

<section class="wrap blk ders-sec" id="an02a-koroner"><h2>Koroner arterler</h2>
<p class="intro">Miyokardı besleyen iki koroner arter farklı aort sinüslerinden çıkar ve dalları kalbin oluklarında buluşur. [[K5 s. 86]] [[K5 s. 89]]</p>
<div class="viz"><h3>Aort sinüsünden koroner dallara</h3><div data-viz="an02a_arter"></div><p class="viz-cap" aria-live="polite"></p></div>
<h3>Kim neyi besler?</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Bölge</th><th>Arter</th></tr></thead><tbody>
<tr><th>Sinoatriyal düğüm</th><td>Yaklaşık %65 sağ koroner; kalanında genellikle sirkumfleks. [[K5 s. 89]]</td></tr>
<tr><th>Atriyoventriküler düğüm</th><td>%80 sağ koroner. [[K5 s. 89]]</td></tr>
<tr><th>İki ventrikülün ön yüzü</th><td>Anterior interventriküler arter. [[K5 s. 89]]</td></tr>
<tr><th>Alt kenar</th><td>Sağ koronerin marjinal dalı. [[K5 s. 89]]</td></tr>
<tr><th>Anastomoz yerleri</th><td>İnferior interventriküler oluk ve apeks yakını. [[K5 s. 89]]</td></tr>
</tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap inferior interventriküler dalı yalnız sağ koroner artere bağlar; bu dal çoğunlukla sağdan, bir azınlıkta sirkumfleksten çıkar ve onu veren arter "dominant" sayılır. Oluklardaki anastomozlar ani tıkanmada yeterli kollateral akım sağlamaz; koroner dallar işlevsel olarak uç arter gibi davranır. [[K5 s. 89]]</div>
</section>

<section class="wrap blk ders-sec" id="an02a-donus"><h2>Miyokardın venöz dönüşü</h2>
<div class="viz"><h3>Üç dönüş yolunu karşılaştırın</h3><div data-viz="an02a_ven"></div><p class="viz-cap" aria-live="polite"></p></div>
</section>

<section class="wrap blk ders-sec" id="an02a-sinus"><h2>Koroner sinüs ve dalları</h2>
<div class="viz"><h3>Arkadan görünümde sinüsün yerini bulun</h3><div data-viz="an02a_arka"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Arka yüzde dikey doğrultuda birbirine yaklaşan iki kava sağ atriyuma açılır. [[K5 s. 83–85]] Sol atriyumun altındaki enine yolu izlerseniz posterior atriyoventriküler olukta seyreden koroner sinüsü bulursunuz. [[K5 s. 83]] [[K5 s. 90]]</p>
<h3>Koroner sinüse katılan dört ven</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ven</th><th>İzlediği yol</th></tr></thead><tbody>
<tr><th>Büyük kardiyak ven</th><td>Anterior interventriküler oluk. [[K5 s. 90]]</td></tr>
<tr><th>Orta kardiyak ven</th><td>İnferior interventriküler oluk. [[K5 s. 90]]</td></tr>
<tr><th>Küçük kardiyak ven</th><td>Alt kenarda marjinal arterle birlikte. [[K5 s. 90]]</td></tr>
<tr><th>Oblik ven</th><td>Sol atriyumun arkasından eğik olarak aşağı iner ve sinüsün sol ucuna yakın açılır. [[K5 s. 90]]</td></tr>
</tbody></table></div></section>

<section class="wrap blk ders-sec" id="an02a-izdusum"><h2>Göğüs duvarından PA grafiye</h2>
<p class="intro">Kalbin göğüs duvarındaki dış sınırı dört nokta birleştirilerek çizilir. [[K5 s. 90–91]]</p>
<div class="viz"><h3>Dört köşeyi yerleştirin</h3><div data-viz="an02a_yuzey"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Dörtgenin sağ kenarını sağ atriyum, sol kenarının hemen tamamını sol ventrikül oluşturur. [[K5 s. 90]] Alt kenar boyunca başlıca sağ ventrikül ve sol ventrikülün apikal bölümü izlenir. [[K5 s. 90]]</p>
<h3>Posteroanterior (PA) grafide kalp gölgesi</h3>
<p>Kalp ve büyük damarlar mediasten gölgesinin çoğunu oluşturur. [[K5 s. 91]] Normalde kalbin enine çapı göğüs genişliğinin yarısını aşmamalıdır, ancak vücut yapısı ve kalbin konumu bu çapı belirgin biçimde etkiler. [[K5 s. 91–92]] Dikey kalbin gölgesi uzun ve dar, yatay kalbinki geniş ve yuvarlaktır. [[K5 s. 92]]</p>
<ul><li><b>Sağ kontur, yukarıdan aşağıya.</b> Sağ brakiyosefalik ven, superior vena kava, sağ atriyum. [[K5 s. 91–92]]</li>
<li><b>Sol kontur, yukarıdan aşağıya.</b> Aort arkının uçtan görünümü kalbin hemen üstündeki aort topuzunu oluşturur. [[K5 s. 92]] Altında sırayla pulmoner trunkus (veya sağ ventrikül infundibulumu), sol atriyum apendiksi ve sol ventrikül seçilir. [[K5 s. 92]]</li>
<li><b>Alt kontur.</b> Kalp ile diyafram gölgeleri ortada birleşir, yanlarda ise kardiyofrenik açılarla ayrılır. [[K5 s. 92]]</li></ul></section>

<section class="wrap blk ders-sec" id="an02a-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin, ardından yanıtınızın gerekçesini kontrol edin.</p>
<div class="viz"><div data-viz="mtf" data-q="an02a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an02a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an02a-3"></div></div></section>
<section class="wrap blk ders-sec" id="an02a-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Kalp cerrahisi sırasında superior vena kavada bulunan bir pulmoner arter kateterini TEE ile izliyorsunuz. Pulmoner trunkusa kadar karşılaşacağınız boşlukları, kapakları ve ayırt edici yapıları anlatın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Superior vena kava sağ atriyumun üst-arka bölümüne açılır. [[K5 s. 84–85]]</li>
<li>Kavalar arasında krista terminalisi, septumda ise fossa ovalisi tarif edin. [[K5 s. 85]]</li>
<li>Dikey triküspit açıklıktan sağ ventriküle geçilir, yaprakçıklar medial, anterior ve inferior konumdadır. [[K5 s. 85]]</li>
<li>Giriş yolunda trabekülleri, papiller kasları ve yaprakçıklara uzanan kordları tanımlayın. [[K5 s. 85]]</li>
<li>İnfundibüloventriküler krestin ötesinde düzgün duvarlı çıkış yolunu izleyin. [[K5 s. 85]]</li>
<li>Pulmoner kapağı geçince kateter pulmoner trunkusa ulaşır. [[K5 s. 85–86]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Sağ atriyumu ve sağ ventrikülü açılmış olarak çizin. Kava ağızlarını, iki kapağı ve septumdan ön duvara uzanan moderatör bandı işaretleyin. [[K5 s. 84–85]]</div>
<div class="note plain"><b>Olası ek sorular</b><ul><li>Koroner sinüs ağzı nerede, atriyoventriküler düğüm bu ağza göre hangi konumda? [[K5 s. 88]] [[K5 s. 90]]</li><li>TEE sol atriyumda hangi bulguya özellikle duyarlıdır? [[K5 s. 86]]</li><li>Sinoatriyal ve atriyoventriküler düğümleri çoğunlukla hangi koroner arter besler? [[K5 s. 89]]</li></ul></div></div></section>
<section class="wrap blk ders-sec" id="an02a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Transvers sinüsü arter köklerinin arkasında, oblik sinüsü sol atriyumun arkasında arayın. [[K5 s. 81]]</li>
<li>Ön yüzün çoğu sağ ventrikül, tabanın çoğu sol atriyumdur. [[K5 s. 83–84]]</li>
<li>Sağ ventrikülün girişindeki trabeküllerle çıkışındaki düzgün infundibulumu infundibüloventriküler krest ayırır. [[K5 s. 85]]</li>
<li>Uyarı atriyal septumdaki düğümden His demetine, ardından iki dal üzerinden ventrikül kasına geçer. [[K5 s. 88]]</li>
<li>Sağ koroner arter sinoatriyal düğümü olguların yaklaşık %65’inde, atriyoventriküler düğümü %80’inde besler. [[K5 s. 89]]</li>
<li>Koroner sinüsle anterior kardiyak venin ortak varış yeri sağ atriyumdur. [[K5 s. 90]]</li>
<li>Apeks vurusunu sol beşinci interkostal aralıkta, orta hattan 9 cm uzakta işaretleyin. [[K5 s. 90]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="02a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/01f">← Diyafram</a><a href="#/dersler/anatomi/02b">Sonraki: Kalbin gelişimi, fetal dolaşım ve boynun büyük venleri →</a></nav></section>`,
};
