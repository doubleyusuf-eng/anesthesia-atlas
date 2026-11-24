VERI.sorular = VERI.sorular || {};
VERI.sorular['far14b-1'] = {
  no: 1, kok: 'β-blokerlerin reseptör profili ve sistem etkileri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 229–231]]',
  onermeler: [
    { t: 'Atenolol yüksek dozda da β₂ reseptörlerini korur.', d: false, n: 'Yüksek dozda kardiyoselektif ilaçlarla da β₂ antagonizması görülebilir. [[K3 s. 229]]' },
    { t: 'Parsiyel agonist aktivite düşük katekolamin düzeylerinde sempatomimetik etki gösterebilir.', d: true, n: 'Düşük tonusta parsiyel uyarı, yüksek tonusta antagonist etki beklenir. [[K3 s. 230]]' },
    { t: 'β-blokaj AV düğümde ileti süresini kısaltır.', d: false, n: 'AV düğümde ileti süresi uzar. [[K3 s. 230]]' },
    { t: 'Bradikardi diyastolik koroner perfüzyona daha fazla zaman bırakır.', d: true, n: 'Diyastolik perfüzyon süresinin uzaması oksijen sunumunu artırır. [[K3 s. 230]]' },
    { t: 'Jukstaglomerüler β₁-blokaj renin salınımını artırır.', d: false, n: 'Renin salınımı azalır, ardından anjiyotensin II’nin etkileri zayıflar. [[K3 s. 231]]' },
  ],
};
VERI.sorular['far14b-2'] = {
  no: 2, kok: 'Kardiyoselektif ilaçların kinetiği ve uygulanması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 232–234]]',
  onermeler: [
    { t: 'Asebutololün aktif metaboliti ana ilaçtan daha az kardiyoselektiftir.', d: true, n: 'Metabolitin kardiyoselektivitesi daha düşük, yarılanma ömrü daha uzundur. [[K3 s. 232]]' },
    { t: 'Atenolol büyük ölçüde hepatik metabolizmayla elimine edilir.', d: false, n: 'Atenolol anlamlı metabolizmaya uğramadan idrarla atılır. [[K3 s. 232]]' },
    { t: 'Esmololün 10 ml’de 2.5 g içeren preparatı infüzyondan önce seyreltilir.', d: true, n: 'Bu preparat seyreltilerek 50–200 μg.kg⁻¹.dk⁻¹ infüzyonla verilir. [[K3 s. 233]]' },
    { t: 'Esmololün hidrolizinden eritrosit esterazları sorumludur.', d: true, n: 'Eritrosit esterazları esmololü hızla parçalar. [[K3 s. 234]]' },
    { t: 'Sürekli uygulama metoprololün oral biyoyararlanımını azaltır.', d: false, n: 'Oral biyoyararlanım sürekli uygulama sırasında %50’den %70’e çıkar. [[K3 s. 234]]' },
  ],
};
VERI.sorular['far14b-3'] = {
  no: 3, kok: 'Propranolol, sotalol ve labetalol', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 234–236]]',
  onermeler: [
    { t: 'Propranololün S-izomeri periferde T₄’ün T₃’e dönüşmesini engeller.', d: false, n: 'Bu etkiden R-izomeri sorumludur. [[K3 s. 234]]' },
    { t: 'Heparin propranololün proteine bağlanmasını azaltabilir.', d: true, n: 'Propranololün yüksek bağlanma oranı heparin varlığında düşebilir. [[K3 s. 235]]' },
    { t: 'Sotalolün L-izomeri sınıf II ve sınıf III aktivite gösterir.', d: true, n: 'D-izomeri sınıf III etki sağlarken L-izomeri β-blokaj da yapar. [[K3 s. 235]]' },
    { t: 'Sotalolle torsades de pointes riski QT uzadığında artar.', d: true, n: 'QT uzaması, yüksek doz ve elektrolit dengesizliği ile bu aritmi daha sıktır. [[K3 s. 235]]' },
    { t: 'Labetalolde β-blokaj α₁-blokaja göre IV yolda oral yoldan daha baskındır.', d: true, n: 'α₁:β etki oranı oral yolda 1:3, IV yolda 1:7’dir. [[K3 s. 235]]' },
  ],
};

const A14B_NAV = [
  ['profil', 'Reseptör profili'], ['sistem', 'Organ etkileri'], ['kinetik', 'Kinetik'],
  ['selektif', 'Kardiyoselektif ilaçlar'], ['rasemik', 'Propranolol ve sotalol'], ['kombine', 'Labetalol'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

const A14B_PROFIL = [
  ['Atenolol ve esmolol', '++', '−', '−'], ['Metoprolol', '++', '−', '+'],
  ['Asebutolol', '+', '+', '+'], ['Pindolol', '−', '++', '+'], ['Propranolol', '−', '−', '++'],
  ['Sotalol', '−', '−', '−'], ['Timolol', '−', '+', '+'], ['Labetalol', '−', '±', '+'],
];
const A14B_KINETIK = [
  ['Asebutolol', '++', '6', 'Hepatik metabolizma ve renal atılım', 'Var'],
  ['Atenolol', '+', '7', 'Renal', 'Yok'], ['Esmolol', '+++', '0.15', 'Hidroliz¹', 'Yok'],
  ['Metoprolol', '+++', '3–7', 'Hepatik metabolizma', 'Yok'],
  ['Oksprenolol', '+++', '2', 'Hepatik metabolizma', 'Yok'], ['Pindolol', '++', '4', 'Hepatik metabolizma', 'Yok'],
  ['Propranolol', '+++', '4', 'Hepatik metabolizma', 'Var'], ['Sotalol', '+', '15', 'Renal', 'Yok'],
  ['Timolol', '+++', '4', 'Hepatik metabolizma ve renal atılım', 'Yok'], ['Labetalol', '+++', '5', 'Hepatik metabolizma', 'Yok'],
];

SAYFALAR['dersler/farmakoloji/14b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 14 · Ders 14b', baslik: 'β-adrenoseptör antagonistleri',
  lede: 'Anjinada kalbin yavaşlaması ve kontraktilitenin azalması, miyokarda oksijen sunumu ile gereksinimi arasındaki dengeyi iyileştirir. [[K3 s. 230]] Ventrikül işlevi kötüyse aynı blokaj kalp yetmezliğini tetikleyebilir. [[K3 s. 229–230]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A14B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a14b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a14b-profil">
  <h2>Reseptör profili</h2>
  <p class="intro">β-blokerlerin tümü kompetitif antagonisttir. [[K3 s. 229]] Aralarındaki farkları reseptör seçiciliği, intrinsik sempatomimetik aktivite ve membran stabilizasyonu belirler. [[K3 s. 229]]</p>
  <div class="viz"><div class="viz-head"><h3>Parsiyel agonistin etkisi ne zaman yön değiştirir?</h3></div><div data-viz="a14b_tonus"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Sempatik tonusa göre beklenen yanıt. [[K3 s. 230]]</p></div>
  <p>Parsiyel agonist yeterli afiniteyle bağlansa da tam agonistin maksimum yanıtına ulaşamaz. [[K3 s. 230]] Teorik olarak bu ilaçların hafif kalp yetmezliğinde bradikardi veya yetmezlik tetikleme olasılığının daha düşük olması beklenir. [[K3 s. 230]] Ağır yetmezlikte debiyi daha da düşüreceğinden bu ilaçlar kullanılmamalıdır. [[K3 s. 230]]</p>
  <div class="tbl-wrap a14b-tablo"><table class="tbl"><caption>β₁ seçiciliğine göre profiller · − yok, + ve ++ artan derece, ± kitaptaki işaret [[K3 s. 230]]</caption><thead><tr><th>İlaç</th><th>β₁ seçiciliği</th><th>Parsiyel agonizm</th><th>Membran stabilizasyonu</th></tr></thead><tbody>
  ${A14B_PROFIL.map(([ad, b, isa, ms]) => `<tr><th scope="row">${ad}</th><td data-label="β₁ seçiciliği">${b}</td><td data-label="Parsiyel agonizm">${isa}</td><td data-label="Membran stabilizasyonu"><span>${ms} [[K3 s. 230]]</span></td></tr>`).join('')}
  </tbody></table></div>
  <div class="note"><b>Atlas notu.</b> Kitap timololde her iki aktiviteyi de “+” gösterir. Timololün klinik açıdan anlamlı intrinsik sempatomimetik veya membran stabilize edici aktivitesi yoktur.</div>
  <ul class="ozet">
    <li><b>Seçicilik.</b> Uygun hastada yarar β₁-blokajdan gelirken β₂-blokaj istenmeyen etkiler doğurur. [[K3 s. 229]] Atenolol, metoprolol ve esmolol görece kardiyoselektiftir, yüksek dozda β₂’yi de bloke edebilir. [[K3 s. 229]]</li>
    <li><b>Doz ve süre.</b> Membran stabilizasyonu için in vivo karşılaşılandan yüksek dozlar gerektiğinden klinik önemi muhtemelen azdır. [[K3 s. 230]] Uzun süreli tedavide β-adrenoseptör sayısı artabilir. [[K3 s. 229]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a14b-sistem">
  <h2>Kalpte oksijen dengesi ve diğer organ etkileri</h2>
  <p class="intro">Negatif kronotropi oksijen sunumunu artırır, negatif inotropi gereksinimi azaltır. [[K3 s. 230]]</p>
  <div class="viz"><div class="viz-head"><h3>Koroner perfüzyondan oksijen dengesine</h3></div><div data-viz="a14b_denge"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Miyokartta yararlı ve karşı yöndeki etkiler. [[K3 s. 230]]</p></div>
  <p>SA düğümünün otomatisitesi azalır ve AV iletim süresi uzar. [[K3 s. 230]] Sistolik ejeksiyonun uzaması, ventrikül dilatasyonu ve koroner direncin artışı dengeyi olumsuz etkilese de toplam etki anjinada ve enfarktüs çevresinde yarar sağlar. [[K3 s. 230]] Ventrikül işlevi kötüyse tüm β-blokerler ciddi yetmezliği tetikleyebildiğinden çok dikkat gerektirir. [[K3 s. 229–230]]</p>
  <h3>Hangi durumlarda kullanılır?</h3>
  <ul class="ozet">
    <li><b>Kalp ve dolaşım.</b> Hipertansiyon, anjina ve miyokart enfarktüsü çevresindeki dönem yaygın kullanım alanlarıdır. [[K3 s. 229]] Sınıf II antiaritmik olarak özellikle yüksek katekolamin düzeyleriyle ilişkili aritmilerde kullanılırlar. [[K3 s. 230–231]]</li>
    <li><b>Taşikardi ve spazm.</b> Feokromositomada α-blokajın refleks taşikardisini önler, hipertrofik obstrüktif kardiyomiyopatide infündibüler spazmı kontrol ederler. [[K3 s. 229]] Esmolol laringoskopi ve ekstübasyona yanıtı baskılamak için kullanılır. [[K3 s. 229]]</li>
    <li><b>Diğer kullanımlar.</b> Hipertiroidizmde propranolol, glokomda topikal β-bloker kullanılır. [[K3 s. 229]] Migren profilaksisi ve yüksek katekolamin düzeyleriyle ilişkili anksiyete de kullanım alanlarıdır. [[K3 s. 229]]</li>
  </ul>
  <h3>Sistemlere göre izle</h3>
  <dl class="a14b-profil">
    <dt>Kan basıncı ve periferik dolaşım</dt><dd>Basınç kontrolünün mekanizması tam bilinmez, hız ve debi azalması ile renin–anjiyotensin sistemi inhibisyonu muhtemelen rol oynar. [[K3 s. 231]] Jukstaglomerüler β₁-blokaj renini azaltır, böylece anjiyotensin II’ye bağlı vazokonstriksiyon ve aldosteron üretimi azalır. [[K3 s. 231]]</dd>
    <dd>Baroreseptörler daha düşük basınca ayarlanabilir, bazı ilaçlar santral etki gösterebilir. [[K3 s. 231]] Kitap presinaptik β₂ reseptörlerinin noradrenalin salınımını baskılayabileceğini belirtir. [[K3 s. 231]] Periferik β₂-blokaja bağlı vazokonstriksiyonun hipertansif etkisi küçük görünür, ancak dolaşım bozulabilir ve eller soğuyabilir. [[K3 s. 231]]</dd>
    <dd><div class="note"><b>Atlas notu.</b> Kitap noradrenalin salınımındaki azalmayı presinaptik β₂ reseptörüne bağlar. Presinaptik β₂ uyarısı salınımı kolaylaştırır, blokaj bu kolaylaştırıcı etkiyi azaltır.</div></dd>
    <dt>Bronşlar</dt><dd>Yeterli dozda her β-bloker β₂ antagonizmasıyla bronkospazmı tetikler. [[K3 s. 231]] Astımda atenolol, esmolol veya metoprolol tercih edilse de çok dikkat gerekir. [[K3 s. 231]]</dd>
    <dt>Glukoz ve lipitler</dt><dd>Glisemi kontrolüne karaciğer, pankreas, yağ dokusu, α ve β reseptörleri ile insülin, glukagon ve katekolaminler katılır. [[K3 s. 231]] Nonselektif blokaj hipertansif diyabetiklerde istirahat glisemisini artırabilir, egzersize ve hipoglisemiye normal yanıtı köreltebilir. [[K3 s. 231]]</dd>
    <dd>Kitap nonselektif ilaçların hipoglisemik ajanlarla birlikte kullanılmamasını belirtir. [[K3 s. 231]] β-blokaj hipoglisemi belirtilerini maskeleyebilir, trigliseritleri artırıp yüksek yoğunluklu lipoproteinleri azaltabilir. [[K3 s. 231]]</dd>
    <dt>Beyin, göz ve sindirim sistemi</dt><dd>Lipofilik metoprolol ve propranololle depresyon, halüsinasyon, kâbus, paranoya ve yorgunluk daha olasıdır. [[K3 s. 231]] Göz içi basıncı muhtemelen aköz hümör üretimi azaldığı için düşer. [[K3 s. 231]] Ağız kuruluğu ve gastrointestinal yakınmalar görülebilir. [[K3 s. 231]]</dd>
  </dl>

</section>
<section class="wrap blk ders-sec" id="a14b-kinetik">
  <h2>Emilimden eliminasyona</h2>
  <p class="intro">Lipitte çözünürlük, β-blokerlerin bağırsaktan emilimi, hepatik metabolizması ve beyne geçişi arasındaki farkların temelidir. [[K3 s. 231]]</p>
  <div class="viz"><div class="viz-head"><h3>Emilim ve oral biyoyararlanım hangi ilaçlarda ayrışır?</h3></div><div data-viz="a14b_kinetik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Her çubuk ayrı bir yüzdeyi gösterir, üçü toplanmaz. [[K3 s. 233]]</p></div>
  <p>Atenolol gibi lipitte az çözünenler bağırsaktan az emilir, hepatik metabolizmaları sınırlıdır ve çoğunlukla değişmeden idrara geçerler. [[K3 s. 231]] Lipofilik ilaçlar iyi emilir, karaciğerde yaygın metabolize olur ve daha kısa yarılanma ömürleri nedeniyle daha sık verilirler. [[K3 s. 231]] Kan–beyin bariyerini geçmeleri sedasyon ve kâbuslara yol açabilir, proteine bağlanma ise ilaçlar arasında değişir. [[K3 s. 231]]</p>
  <div class="tbl-wrap a14b-tablo"><table class="tbl"><caption>Eliminasyon ve aktif metabolitler [[K3 s. 233]]</caption><thead><tr><th>İlaç</th><th>Lipitte çözünürlük</th><th>Yarılanma ömrü (saat)</th><th>Klirens yolu</th><th>Aktif metabolit</th></tr></thead><tbody>
  ${A14B_KINETIK.map(([ad, lipit, omur, yol, aktif]) => `<tr><th scope="row">${ad}</th><td data-label="Lipitte çözünürlük">${lipit}</td><td data-label="Yarılanma ömrü (saat)">${omur}</td><td data-label="Klirens yolu">${yol}</td><td data-label="Aktif metabolit"><span>${aktif} [[K3 s. 233]]</span></td></tr>`).join('')}
  </tbody></table></div>
  <p>¹ Esmolol klirensini tablo “plazma hidrolizi” olarak adlandırır. [[K3 s. 233]] Ana metin yıkım yerini eritrosit, enzimi eritrosit esterazı olarak belirtir. [[K3 s. 234]]</p>
</section>
<section class="wrap blk ders-sec" id="a14b-selektif">
  <h2>Kardiyoselektif ilaçlar</h2>
  <p class="intro">Asebutolol yalnız oral, esmolol yalnız intravenöz kullanılır. [[K3 s. 232–234]] Esmololün etkisi hızla başlar ve hızla sonlanır. [[K3 s. 233]]</p>
  <div class="viz"><div class="viz-head"><h3>Esmololün iki berrak çözeltisi</h3></div><div data-viz="a14b_esmolol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Preparata göre uygulama ve titrasyon. [[K3 s. 233]]</p></div>
  <p>Esmolol perioperatif taşikardi ve hipertansiyonun kısa süreli tedavisinde ve akut supraventriküler taşikardide kullanılır. [[K3 s. 233]]</p>
  <h3>Esmolol</h3><ul class="ozet">
    <li>Yüksek lipofilisite ve β₁ seçiciliğine karşın intrinsik sempatomimetik aktivitesi veya membran stabilize edici etkisi yoktur. [[K3 s. 233]] Proteine bağlanması %60, dağılım hacmi 3.5 l.kg⁻¹’dir. [[K3 s. 234]]</li>
    <li>Eritrosit esterazları başlıca uzun yarılanma ömürlü inaktif bir asit metaboliti ve metil alkol oluşturur. [[K3 s. 234]] Hızlı hidroliz esmololün yarılanma ömrünü 10 dakika ile sınırlar. [[K3 s. 234]]</li>
    <li>Kısa etki süresi tetikleyebileceği kalp yetmezliği ve bronkospazmı sınırlar. [[K3 s. 234]] Venleri tahriş eder, ekstravazasyon doku nekrozuna yol açabilir. [[K3 s. 234]]</li>
    <li>Kitap, esmololü yıkan esteraz plazma kolinesterazından farklı olduğu için süksametonyum etkisinin uzamadığını belirtir. [[K3 s. 234]]</li>
  </ul>
  <div class="note"><b>Atlas notu.</b> Kitap esmololün süksametonyum etkisini uzatmadığını söyler. Birlikte kullanımda süksametonyumun oluşturduğu nöromüsküler blok uzayabilir.</div>
  <h3>Asebutolol</h3><ul class="ozet">
    <li>Görece β₁ seçicidir, sınırlı parsiyel agonizm ve bir miktar membran stabilizasyonu gösterir. [[K3 s. 232]] Erişkinde oral doz günde iki kez 400 mg, gerekirse en çok 1.2 g.gün⁻¹’dir. [[K3 s. 232]]</li>
    <li>Orta-yüksek lipofilisitesi iyi emilim sağlar, ancak belirgin ilk geçiş nedeniyle biyoyararlanımı %40’tır. [[K3 s. 232]] Kan–beyin bariyerini kayda değer ölçüde geçmez. [[K3 s. 232]]</li>
    <li>Karaciğerde oluşan aktif metabolit (kitaptaki yazımıyla “diasetol”) daha uzun yarılanma ömrüne ve daha düşük kardiyoselektiviteye sahiptir. [[K3 s. 232]] İkisi de safrayla atılır ve enterohepatik dolaşıma girebilir. [[K3 s. 232]] İdrarla da atıldıklarından böbrek işlevi bozulduğunda doz azaltılmalıdır. [[K3 s. 232]]</li>
  </ul>
  <h3>Atenolol</h3><ul class="ozet">
    <li><b>Sunum.</b> 25–100 mg tablet, 5 mg.ml⁻¹ şurup ve 10 ml’de 5 mg içeren renksiz IV çözelti. [[K3 s. 232]]</li>
    <li><b>Doz.</b> Oral 50–100 mg.gün⁻¹ veya yavaş IV 2.5 mg verilir. [[K3 s. 232]] IV doz toplam 10 mg’a kadar tekrarlanabilir, ardından infüzyona geçilebilir. [[K3 s. 232]]</li>
    <li><b>Kinetik.</b> Emilim eksik, metabolizma önemsizdir, oral biyoyararlanım %45 ve proteine bağlanma %5’tir. [[K3 s. 232]] Değişmeden idrarla atıldığından böbrek işlevi bozulduğunda doz azaltılmalıdır. [[K3 s. 232]] Etkisi 7 saatlik yarılanma ömründen beklenenden uzun görünür. [[K3 s. 232]]</li>
  </ul>
  <h3>Metoprolol</h3><ul class="ozet">
    <li><b>Kullanım.</b> Parsiyel agonist aktivitesi yoktur. [[K3 s. 234]] Enfarktüste erken kullanım enfarktüs boyutunu ve ventriküler fibrilasyon sıklığını azaltır. [[K3 s. 234]] Hipertansiyonda, tirotoksikozda yardımcı tedavi olarak ve migren profilaksisinde kullanılır. [[K3 s. 234]]</li>
    <li><b>Doz.</b> Günde 50–200 mg, aritmide veya enfarktüste IV en çok 5 mg verilebilir. [[K3 s. 234]]</li>
    <li><b>Kinetik.</b> Ana metin emilimi hızlı ve tam olarak tanımlar. [[K3 s. 234]] İlk geçişle oral biyoyararlanım %50’de kalır, sürekli uygulamada %70’e çıkar ve besinle artar. [[K3 s. 234]]</li>
    <li>Hızlı ve yavaş hidroksilleyicilerde genetik farklılıklar 3 ve 7 saatlik yarılanma ömrü profilleri oluşturabilir. [[K3 s. 233–234]] Lipofilisitesi sayesinde beyne ve anne sütüne geçer, plazma proteinlerine %20 bağlanır. [[K3 s. 234]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a14b-rasemik">
  <h2>Propranolol ve sotalol</h2>
  <p class="intro">İki ilaç da nonselektif β-blokerdir, parsiyel agonizm göstermez ve rasemik karışım olarak bulunur. [[K3 s. 234–235]]</p>
  <div class="viz"><div class="viz-head"><h3>Hangi izomer hangi etkiyi taşır?</h3></div><div data-viz="a14b_izomer"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · İzomerlerin farmakolojik etkileri. [[K3 s. 234–235]]</p></div>
  <p>Propranolol terapötik konsantrasyonlarda grubun sistemik etkilerinin tümünü gösterir. [[K3 s. 234]] Hem tiroid hormonlarının etkisini hem de periferik T₄ → T₃ dönüşümünü engellediğinden tirotoksikozda tercih edilir. [[K3 s. 234]]</p>
  <h3>Propranolol</h3><ul class="ozet">
    <li><b>Diğer kullanımlar.</b> Hipertansiyon, anjina, esansiyel tremor ve migren profilaksisi. [[K3 s. 234]]</li>
    <li><b>Doz.</b> IV 0.5 mg’lık dozlar etkiye göre 10 mg’a kadar titre edilir. [[K3 s. 234]] Oral doz günde 160–320 mg’dır, tirotoksikozda artmış klirens nedeniyle daha fazlası gerekebilir. [[K3 s. 234]]</li>
    <li><b>Kinetik.</b> Lipofilisitesi sayesinde iyi emilir, ancak yoğun ilk geçiş biyoyararlanımı %30’a düşürür. [[K3 s. 234]] Heparin yüksek protein bağlanmasını azaltabilir. [[K3 s. 235]]</li>
    <li>Karaciğer R-izomerini S’den hızlı metabolize eder, 4-hidroksipropranolol kısmen aktiftir. [[K3 s. 235]] Eliminasyon hepatik olsa da böbrek yetmezliğinde bilinmeyen bir mekanizmayla bozulur. [[K3 s. 235]] Etkisi 4 saatlik yarılanma ömründen beklenenden uzundur. [[K3 s. 235]]</li>
  </ul>
  <h3>Sotalol</h3><ul class="ozet">
    <li><b>Ritim kontrolü.</b> Ventriküler taşiaritmilerde ve doğru akım kardiyoversiyonu sonrası paroksismal supraventriküler taşikardi profilaksisinde kullanılır. [[K3 s. 235]] Sinüs ritmi yeniden atriyal fibrilasyona dönerse ventrikül hızı da iyi kontrol edilir. [[K3 s. 235]]</li>
    <li><b>Kullanım sınırı.</b> Kitabın aktardığı İlaç Güvenliği Komitesi, sotalolün anjina, hipertansiyon, tirotoksikoz veya enfarktüs çevresinde kullanılmamasını belirtir. [[K3 s. 235]]</li>
    <li><b>Doz.</b> Oral günde iki kez 80–160 mg veya IV 20 dakikada 50–100 mg. [[K3 s. 235]]</li>
    <li><b>Yan etki.</b> En ciddi risk torsades de pointes olup sürekli ventriküler taşikardi veya fibrilasyon için tedavi edilenlerin %2’sinden azında görülür. [[K3 s. 235]] Yüksek doz, uzun QT ve elektrolit dengesizliği riski artırır. [[K3 s. 235]] Kalp yetmezliğini de tetikleyebilir. [[K3 s. 235]]</li>
    <li><b>Kinetik.</b> Tabloda emilim ve biyoyararlanımın her biri %85’tir. [[K3 s. 233]] Ana metinde emilim tam, oral biyoyararlanım %90’ın üzerindedir. [[K3 s. 235]] Proteine bağlanmaz, metabolize olmaz, yaklaşık %90’ı değişmeden idrarla, kalanı safrayla atılır. [[K3 s. 235]] Böbrek işlev bozukluğunda klirensi belirgin azalır. [[K3 s. 235]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a14b-kombine">
  <h2>Labetalol ile kombine α- ve β-blokaj</h2>
  <p class="intro">Labetalol α₁ reseptörlerini seçici, β reseptörlerini nonselektif olarak bloke eder. [[K3 s. 235]] İki asimetrik merkezden doğan dört stereoizomer eşit oranlardadır. [[K3 s. 235]] α₁ etkisini muhtemelen SR, β-blokajı ise RR izomeri sağlar. [[K3 s. 235]]</p>
  <div class="viz"><div class="viz-head"><h3>Uygulama yolu blokaj oranını nasıl değiştirir?</h3></div><div data-viz="a14b_labetalol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çubuklar aynı uygulama yolundaki göreli blokajı gösterir. [[K3 s. 235]]</p></div>
  <p>α₁-blokaj periferik damarları genişletirken β-blokaj refleks taşikardiyi önler. [[K3 s. 236]] Miyokardın artyükü ve oksijen gereksinimi azalır, bu durum anjinada yarar sağlar. [[K3 s. 236]]</p>
  <ul class="ozet">
    <li><b>IV.</b> Renksiz çözelti 5 mg.ml⁻¹ labetalol içerir. [[K3 s. 236]] Hipertansif krizlerde ve anestezi sırasında hipotansiyonu kolaylaştırmak için 5–20 mg IV doz toplam 200 mg’a kadar titre edilir. [[K3 s. 236]]</li>
    <li><b>Oral.</b> 50–400 mg tabletleri, anjinaya eşlik eden hipertansiyonda ve gebelik hipertansiyonunda kullanılır. [[K3 s. 236]] Günde iki kez 100–800 mg verilir, günlük doz en çok 2.4 g’a yükseltilebilir. [[K3 s. 236]]</li>
    <li><b>Kinetik.</b> İyi emilmesine karşın belirgin hepatik ilk geçiş nedeniyle oral biyoyararlanım %25’tir. [[K3 s. 236]] Yaşla ve besinle belirgin artabilir. [[K3 s. 236]] Proteine %50 bağlanır, karaciğerde birkaç inaktif konjugata dönüşür. [[K3 s. 236]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a14b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız yanıtlayın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far14b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far14b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far14b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a14b-p2">
  <h2>Part II · SOE 2 (farmakoloji)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Perioperatif taşikardi ve hipertansiyonda esmololün etkisini, uygulama biçimlerini ve etkinin neden kısa sürdüğünü anlatın. Labetalolün damar ve kalp üzerindeki etkileri nasıl ayrılır?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Esmolol görece β₁ seçicidir. [[K3 s. 233]] β-blokaj SA otomatisitesini ve kontraktiliteyi azaltır, AV iletim süresini uzatır. [[K3 s. 230]]</li>
    <li>Hızlı başlayıp biten etkisiyle perioperatif taşikardi ve hipertansiyonun kısa süreli tedavisinde kullanılır. [[K3 s. 233]]</li>
    <li>10 ml’de 2.5 g içeren preparat seyreltilip 50–200 μg.kg⁻¹.dk⁻¹ infüzyonla verilir. [[K3 s. 233]] 10 ml’de 100 mg içeren preparat 10 mg’lık boluslarla titre edilir. [[K3 s. 233]]</li>
    <li>Eritrosit esterazları hızlı hidroliz sağlar, yarılanma ömrü 10 dakikadır. [[K3 s. 234]]</li>
    <li>Labetalol periferik α₁-blokajla vazodilatasyon yapar, β-blokajla refleks taşikardiyi önler ve miyokardın artyükü ile oksijen gereksinimi azalır. [[K3 s. 236]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Esmololün iki IV preparatından infüzyon ve bolusa giden yolları izleyin, yanına eritrositte hidrolizi ekleyin. [[K3 s. 233–234]] Labetalol için α₁-blokajı damar çapına, β-blokajı refleks taşikardiye bağlayın. [[K3 s. 236]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Astımda kardiyoselektivite neden mutlak güvence sağlamaz? [[K3 s. 229–231]] Esmololün ekstravazasyonu neye yol açabilir? [[K3 s. 234]] Labetalolde α₁:β oranı uygulama yoluyla nasıl değişir? [[K3 s. 235]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a14b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Parsiyel agonist düşük sempatik tonusta uyarıcı, yüksek tonusta antagonist etki gösterebilir. [[K3 s. 230]]</li>
    <li>Anjinada hızın düşmesi perfüzyon süresini uzatır, kontraktilitenin azalması oksijen gereksinimini düşürür. [[K3 s. 230]]</li>
    <li>Atenolol değişmeden idrarla atılır. [[K3 s. 232]] Esmolol eritrosit esterazlarıyla hızla hidrolize olur. [[K3 s. 234]]</li>
    <li>Propranololün R-izomeri periferde T₄ → T₃ dönüşümünü engeller. [[K3 s. 234]] Sotalolün L-izomeri sınıf II ve III etkilidir. [[K3 s. 235]]</li>
    <li>Labetalolde α₁:β blokaj oranı oral yolla 1:3, IV yolla 1:7’dir. [[K3 s. 235]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="14b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/14a">← 14a · α-adrenoseptör antagonistleri</a><a href="#/dersler/farmakoloji/15a">Sonraki: 15a · Aritmiler, sınıflama ve supraventriküler taşiaritmi ilaçları →</a></nav>
</section>`,
};
