VERI.sorular = VERI.sorular || {};
VERI.sorular['far13c-1'] = {
  no: 1, kok: 'Aminofilinin etkileri ve eliminasyonu', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 220–221]]',
  onermeler: [
    { t: 'Komplekste etilendiamin bronkodilatör etkiyi sağlar.', d: false, n: 'Etilendiaminin işlevi çözünürlüğü artırmaktır, terapötik etkisi yoktur. [[K3 s. 220]]' },
    { t: 'Solunum merkezinin karbondioksite duyarlılığını artırır.', d: true, n: 'Merkezin CO₂ duyarlılığı artarken diyaframın kasılması da güçlenir. [[K3 s. 221]]' },
    { t: 'Sigara kullanımı klirensini azaltır.', d: false, n: 'Sigara aminofilin klirensini artırır. [[K3 s. 221]]' },
    { t: 'Halotan varlığında ventriküler aritmi eşiği düşer.', d: true, n: 'Aritmi eşiğindeki düşüş özellikle halotanla ve ventriküler aritmilerde belirgindir. [[K3 s. 221]]' },
    { t: 'Hepatik enzimler doyunca eliminasyon birinci dereceye geçer.', d: false, n: 'Enzimler doyduğunda birinci derece kinetik yerini sıfırıncı derece kinetiğe bırakır. [[K3 s. 221]]' }
  ]
};
VERI.sorular['far13c-2'] = {
  no: 2, kok: 'Enoksimon ve milrinonun karşılaştırılması', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 221–223]]',
  onermeler: [
    { t: 'Enoksimon miyokardda yavaş Ca²⁺ girişini artırır.', d: true, n: 'cAMP artışı aksiyon potansiyeli sırasında yavaş Ca²⁺ girişini güçlendirir. [[K3 s. 222]]' },
    { t: 'Enoksimon kalp yetmezliğinde diyastol sonu dolum basınçlarını artırır.', d: false, n: 'Kalp debisi artarken diyastol sonu dolum basınçları yaklaşık %35 düşer. [[K3 s. 222]]' },
    { t: 'Enoksimonun sülfoksit metaboliti aktiftir.', d: true, n: 'Metabolit ana ilacın aktivitesinin %10’una sahiptir. [[K3 s. 222]]' },
    { t: 'Milrinonun %80’i idrarla değişmeden atılır.', d: true, n: 'Değişmeden renal atılım %80’dir ve böbrek yetmezliğinde doz azaltılır. [[K3 s. 223]]' },
    { t: 'Milrinon ağır kalp yetmezliğinde oral verildiğinde mortalitede azalmayla ilişkilidir.', d: false, n: 'Ağır kalp yetmezliğinde oral kullanım artmış mortaliteyle ilişkilendirilmiştir. [[K3 s. 222]]' }
  ]
};
VERI.sorular['far13c-3'] = {
  no: 3, kok: 'Levosimendan, glukagon, kalsiyum ve tiroid hormonları', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 223]]',
  onermeler: [
    { t: 'Levosimendan troponin C’nin kalsiyuma duyarlılığını azaltır.', d: false, n: 'Troponin C’nin Ca²⁺ duyarlılığını artırarak kasılmayı güçlendirir. [[K3 s. 223]]' },
    { t: 'Levosimendan atriyal fibrilasyona yol açabilir.', d: true, n: 'Atriyal fibrilasyon olası bir kardiyovasküler yan etkidir. [[K3 s. 223]]' },
    { t: 'Glukagon reseptörünün uyarılması adenilat siklazı etkinleştirir.', d: true, n: 'G proteini üzerinden adenilat siklaz uyarılır ve hücre içi cAMP artar. [[K3 s. 223]]' },
    { t: 'İntravenöz Ca²⁺ tuzları, Ca²⁺ kanal antagonisti doz aşımına bağlı dolaşım kollapsında kullanılabilir.', d: true, n: 'Kitap kullanımı hiperkalemi ve Ca²⁺ kanal antagonisti doz aşımına bağlı dolaşım kollapsıyla sınırlar. [[K3 s. 223]]' },
    { t: 'T₃ ve T₄ hücre içi mekanizmalarla kalp hızını artırır.', d: true, n: 'Her iki hormon da hücre içi mekanizmalarla pozitif kronotropi ve inotropi oluşturur. [[K3 s. 223]]' }
  ]
};

const A13C_NAV = [['amino','Aminofilin'],['pde','Enoksimon ve milrinon'],['levo','Levosimendan'],['diger','Glukagon, Ca²⁺ ve tiroid hormonları'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/13c'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 13 · Ders 13c', baslik: 'Diğer inotropik ajanlar',
  lede: 'Enoksimon kalp kasında kasılabilir proteinlerin çevresindeki kalsiyumu artırır. [[K3 s. 222]] Levosimendan ise troponin C’yi kalsiyuma daha duyarlı kılar. [[K3 s. 223]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A13C_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a13c-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a13c-amino">
<h2>Aminofilin</h2>
<p class="intro">Bu metilksantin, beş fosfodiesteraz (PDE) izoenzimini de inhibe ederek hücre içinde cAMP’yi ve muhtemelen cGMP’yi artırır. [[K3 s. 220]]</p>
<div class="viz"><div class="viz-head"><h3>Aminofilin klirensini ne değiştirir?</h3></div><div data-viz="a13c_klirens"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 221]]</p></div>
<p>Düşük hepatik ekstraksiyon nedeniyle metabolizma karaciğer kan akımından bağımsızdır. [[K3 s. 221]] Karaciğerde P450 inaktif metabolitler oluşturur ve aynı yoldan metabolize olan ilaçlarla etkileşim görülür. [[K3 s. 221]]</p>
<div class="cols">
<div class="card"><h3>Preparat ve kullanım</h3><ul>
<li>Kompleksin %80’i teofilin, %20’si çözünürlüğü artıran ve terapötik etkisi olmayan etilendiamindir. [[K3 s. 220]]</li>
<li>Tablet ve 25 mg.ml⁻¹ enjeksiyonluk çözelti bulunur. [[K3 s. 220]] Yaklaşık 6 saatlik yarı ömür nedeniyle tabletler sıklıkla yavaş salınımlıdır. [[K3 s. 220]]</li>
<li>Astımda günlük doz 450–1250 mg’dır. [[K3 s. 220]] Akut ağır astımda intravenöz yükleme 20 dakikada 6 mg.kg⁻¹, ardından infüzyon 0.5 mg.kg⁻¹.saat⁻¹’dir. [[K3 s. 220]]</li>
<li>Prematürelerde santral apne ataklarını seyrekleştirebilir. [[K3 s. 220]] Kalp yetmezliğinde çok nadir kullanılır. [[K3 s. 220]]</li></ul></div>
<div class="card"><h3>PDE inhibisyonuna eşlik eden etkiler</h3><ul>
<li>Sempatik nöronlardan doğrudan noradrenalin salınmasını sağlayabilir ve adrenoseptörler üzerinden cAMP’yi artıran katekolaminlerle sinerji gösterebilir. [[K3 s. 220]]</li>
<li>Düz kasa Ca²⁺ geçişini etkiler ve prostaglandin sentetaz etkinliğini güçlendirir. [[K3 s. 220]]</li>
<li>Mast hücresinde adenozin reseptörlerini bloke ederek degranülasyonu engeller. [[K3 s. 220]]</li></ul></div></div>
<h3>Sistem etkileri</h3><ul class="ozet">
<li><b>Solunum.</b> Bronşlar genişler, diyafram kasılması güçlenir ve solunum merkezinin CO₂ duyarlılığı artar. [[K3 s. 221]] β₂-agonistler cAMP’yi başka yoldan artırdığından birlikte iyi etki gösterirler. [[K3 s. 221]]</li>
<li><b>Dolaşım.</b> Hafif pozitif inotropi ve kronotropiye bir miktar koroner ve periferik vazodilatasyon eşlik eder. [[K3 s. 221]] Özellikle halotanla aritmi eşiği düşer, ventriküler aritmiler öne çıkar. [[K3 s. 221]]</li>
<li><b>Sinir sistemi ve böbrek.</b> Kafeinde de bulunan 1-konumundaki alkil grubu merkezi uyarılmadan, nöbet eşiğinin düşmesinden ve zayıf diürezden sorumludur. [[K3 s. 221]] Tübüler Na⁺ geri emilimi azalınca natriürez gelişir ve hipokalemi tetiklenebilir. [[K3 s. 221]]</li></ul>
<h3>Plazma düzeyi ve toksisite</h3><ul class="ozet">
<li>Bağırsaktan iyi emilir, oral biyoyararlanımı > %90’dır. [[K3 s. 221]] Yaklaşık %50’si plazma proteinlerine bağlanır, yaklaşık %10’u idrarla değişmeden atılır. [[K3 s. 221]]</li>
<li>Etkin plazma aralığı <b>10–20 µg.ml⁻¹</b>’dir. [[K3 s. 221]] <b>35 µg.ml⁻¹ üzerinde</b> hepatik enzimler doyar, birinci derece kinetik sıfırıncı dereceye döner ve toksisite gelişir. [[K3 s. 221]]</li>
<li>Taşiaritmiler ventriküler fibrilasyona kadar uzanabilir. [[K3 s. 221]] Tremor, uykusuzluk ve özellikle hızlı intravenöz uygulamadan sonra nöbet görülebilir. [[K3 s. 221]] Diğer bulgular bulantı, kusma ve rabdomiyolizdir. [[K3 s. 221]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a13c-pde">
<h2>Selektif PDE III inhibitörleri</h2>
<p class="intro">Enoksimon bir imidazolon, milrinon bir bipiridin türevidir ve her ikisi de PDE III’ü seçici olarak inhibe eder. [[K3 s. 221–222]]</p>
<div class="viz"><div class="viz-head"><h3>Enoksimon kalpte ve damarda nasıl etki eder?</h3></div><div data-viz="a13c_doku"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Doku yolları şematik/nitel. Çubuklar başlangıca göre yaklaşık yüzde değişimini gösterir. [[K3 s. 222]]</p></div>
<p>Kalp ve damar düz kasında cAMP’nin ve muhtemelen cGMP’nin yıkımı azalır. [[K3 s. 222]] Kasılma gücündeki artışa vazodilatasyon eşlik ettiği için enoksimona <b>inodilatör</b> denir. [[K3 s. 222]]</p>
<h3>Preparat, kullanım ve atılım</h3>
<div class="tbl-wrap"><table class="tbl a13c-tablo"><thead><tr><th>Konu</th><th>Enoksimon</th><th>Milrinon</th></tr></thead><tbody>
<tr><th scope="row">Çözelti</th><td>Sarı, 5 mg.ml⁻¹, pH 12. [[K3 s. 222]] Kitap çözücüleri “propil glikol” ve etanol olarak verir, saklama sıcaklığı 5–8 °C’dir. [[K3 s. 222]]</td><td>Sarı, 1 mg.ml⁻¹, oda sıcaklığında saklanabilir. [[K3 s. 223]]</td></tr>
<tr><th scope="row">Hazırlama</th><td>Plastik enjektörde eşit hacimde su veya %0.9 salinle seyreltilir, camda kristaller oluşur. [[K3 s. 222]]</td><td>İntravenöz uygulamadan önce seyreltilir. [[K3 s. 223]]</td></tr>
<tr><th scope="row">Kullanım</th><td>Konjestif kalp yetmezliği veya kalp cerrahisiyle ilişkili düşük debi. [[K3 s. 222]]</td><td>Etkileri enoksimona benzer, ağır kalp yetmezliğinde oral kullanım artmış mortaliteyle ilişkilidir. [[K3 s. 222]] Yalnız kısa süreli kalp yetmezliği tedavisinde intravenöz verilir. [[K3 s. 223]]</td></tr>
<tr><th scope="row">Proteinlere bağlanma</th><td>Yaklaşık %70. [[K3 s. 222]]</td><td>Yaklaşık %70. [[K3 s. 223]]</td></tr>
<tr><th scope="row">Yarı ömür ve atılım</th><td>İnfüzyonda terminal yarı ömür 4.5 saat, idrarla değişmeden atılan miktar azdır. [[K3 s. 222]]</td><td>Eliminasyon yarı ömrü 1–2.5 saat, idrarla değişmeden atılım %80’dir. [[K3 s. 223]]</td></tr>
</tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap çözücüyü “propil glikol” diye adlandırır. Doğru ad propilen glikoldür.</div>
<ul class="ozet">
<li><b>Enoksimon infüzyonu.</b> Hız 5–20 µg.kg⁻¹.min⁻¹’dir. [[K3 s. 222]] Öncesinde 0.5 mg.kg⁻¹ yükleme verilebilir ve toplam 3 mg.kg⁻¹’ye kadar tekrarlanabilir. [[K3 s. 222]] Katekolaminlerden farklı olarak etkinin başlaması 30 dakikayı bulabilir. [[K3 s. 222]]</li>
<li><b>Hemodinami.</b> Duvar gerilimi azalır, koroner perfüzyon iyileşir ve miyokardın oksijen ekstraksiyon oranı değişmez. [[K3 s. 222]]</li>
<li><b>Basınç ve ritim.</b> Kan basıncı sabit kalabilir veya düşebilir, kalp hızı sabit kalır veya hafif artar. [[K3 s. 222]] Atriyum, AV düğüm ve ventrikülde refrakterlik kısalır, aritmi nadirdir. [[K3 s. 222]]</li>
<li><b>İstenmeyen etkiler.</b> İskemik kalp hastalığında koroner perfüzyon basıncındaki düşüş ve hız artışı, iyileşen miyokard kan akımının yararını aşarak iskemiyi ağırlaştırabilir. [[K3 s. 222]] Agranülositoz bildirilmiştir. [[K3 s. 222]]</li>
<li><b>Metabolizma.</b> İyi bağırsak emilimine rağmen yoğun ilk geçiş enoksimonun oral kullanımını elverişsiz kılar. [[K3 s. 222]] Karaciğerde oluşan aktif sülfoksit böbrekten atılır, aktivitesi ana ilacın %10’u ve terminal yarı ömrü 7.5 saattir. [[K3 s. 222]]</li>
<li><b>Doz güvenliği.</b> Enoksimonun terapötik oranı geniş, toksisite riski düşüktür. [[K3 s. 222]] Böbrek yetmezliğinde her iki ilacın da dozu azaltılır. [[K3 s. 222–223]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a13c-levo">
<h2>Levosimendan</h2>
<p class="intro">Levosimendan, troponin C’nin kalsiyuma duyarlılığını artırır ve ATP’ye duyarlı K⁺ kanallarını açarak düz kası gevşetebildiği için inodilatör sayılır. [[K3 s. 223]]</p>
<div class="viz"><div class="viz-head"><h3>Kasılma gücü ve damar direnci</h3></div><div data-viz="a13c_duyarlilik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 223]]</p></div>
<ul class="ozet">
<li><b>Dolaşım.</b> Kontraktilite, atım hacmi, kalp hızı, debi ve koroner kan akımı artar, miyokardın oksijen tüketimi azalır. [[K3 s. 223]] Atriyal fibrilasyon gelişebilir. [[K3 s. 223]]</li>
<li><b>Direnç ve basınç.</b> Sistemik vasküler direnç azalır. [[K3 s. 223]] Kaynak, azalanlar arasında natriüretik peptit ve kan basıncını ayırıcı kullanmadan sıralar. [[K3 s. 223]]</li>
<li><b>Uygulama.</b> İntravenöz infüzyondan önce yükleme dozu verilebilir. [[K3 s. 223]] Kitap akut kalp yetmezliğinde semptomların ve sağkalımın iyileştiğini belirtir. [[K3 s. 223]]</li>
<li><b>Kinetik.</b> Oral biyoyararlanımı %85’tir ve proteinlere yüksek oranda bağlanır. [[K3 s. 223]] Kitap karaciğerde yoğun biçimde aktif metabolitlere dönüşüm tarif eder. [[K3 s. 223]] Atılım safra ve idrarladır, böbrek işlev bozukluğunda doz ayarlanır. [[K3 s. 223]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap genel bir sağkalım yararı bildirir, ancak bu yarar akut kalp yetmezliğinde tüm hasta grupları için gösterilmemiştir. Kitap yoğun hepatik aktif metabolit oluşumu tarif eder; oysa dozun çoğu konjugasyonla inaktive olur ve aktif metabolit, küçük bir bölümün bağırsakta indirgenmesiyle başlayan yoldan oluşur.</div>
</section>
<section class="wrap blk ders-sec" id="a13c-diger">
<h2>Glukagon, kalsiyum ve tiroid hormonları</h2>
<p class="intro">Glukagonun kalp yetmezliğindeki rolü sınırlıdır, ancak β-bloker doz aşımında zaman zaman kullanılır. [[K3 s. 223]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi durumda hangi ajan?</h3></div><div data-viz="a13c_kullanim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 223]]</p></div>
<ul class="ozet">
<li><b>Glukagon.</b> Pankreasın α hücrelerinden salgılanan bir polipeptittir. [[K3 s. 223]] β-bloker doz aşımında 10 mg başlangıç bolusunu 5 mg.saat⁻¹’ye kadar infüzyon izler. [[K3 s. 223]] Kitap olası komplikasyonlar arasında hiperglisemi ve hiperkalemiyi sayar. [[K3 s. 223]]</li>
<li><b>Ca²⁺ tuzları.</b> İntravenöz kalsiyum çoğu kez kan basıncını yalnız birkaç dakikalığına yükseltir. [[K3 s. 223]]</li>
<li><b>Tiroid hormonları.</b> Tiroksin (T₄) ve triiyodotironin (T₃) hücre içi mekanizmalarla hem kasılma gücünü hem kalp hızını artırır. [[K3 s. 223]] Kitap bu hormonları Bölüm 26’da ayrıntılandırır. [[K3 s. 223]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap glukagonla hiperkalemi bildirir. Yüksek dozda serum potasyumu düşebilir ve hipokalemi gelişebilir.</div>
</section>
<section class="wrap blk ders-sec" id="a13c-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far13c-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far13c-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far13c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a13c-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Enoksimon ve levosimendan kalbin kasılma gücünü hangi yollarla artırır? Damar etkilerini ve ritim üzerindeki etkilerini karşılaştırın.</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Enoksimon PDE III’ü inhibe eder, cAMP artışı yavaş Ca²⁺ girişini ve depolardan Ca²⁺ salınımını artırır. [[K3 s. 221–222]]</li>
<li>Damar düz kasında Ca²⁺ akışının değişmesi vazodilatasyon yapar. [[K3 s. 222]] Refrakterlik kısalır, aritmi nadirdir. [[K3 s. 222]]</li>
<li>Levosimendan troponin C’yi Ca²⁺’a duyarlı kılar, ATP’ye duyarlı K⁺ kanallarını açarak düz kası gevşetebilir. [[K3 s. 223]]</li>
<li>Enoksimonla hız sabit kalır veya hafif artar. [[K3 s. 222]] Levosimendan kalp hızını artırır ve atriyal fibrilasyona yol açabilir. [[K3 s. 223]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Enoksimon ve levosimendan için birer kalp ve damar dalı çizin. Kalpte Ca²⁺ girişini ve Ca²⁺ duyarlılığını, damarda Ca²⁺ akışını ve K⁺ kanalını ilgili dala yerleştirin. [[K3 s. 222–223]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Enoksimon iskemiyi nasıl ağırlaştırabilir? [[K3 s. 222]] Milrinonda renal doz azaltımını hangi atılım özelliği açıklar? [[K3 s. 223]] Aminofilinde enzimler doyunca kinetik nasıl değişir? [[K3 s. 221]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a13c-ozet"><h2>Özet</h2><ul class="ozet">
<li>Aminofilinde bronkodilatasyona diyaframın güçlenmesi ve CO₂ duyarlılığında artış eşlik eder. [[K3 s. 221]]</li>
<li>Enoksimonla kalp debisi artarken dolum basınçları düşer. [[K3 s. 222]]</li>
<li>Milrinonun büyük bölümü değişmeden idrara geçer. [[K3 s. 223]]</li>
<li>Levosimendan kalpte troponin C, damarda ATP’ye duyarlı K⁺ kanalları üzerinden etkilidir. [[K3 s. 223]]</li>
<li>Glukagon β-bloker doz aşımında, intravenöz kalsiyumun kullanımı ise hiperkalemi ve Ca²⁺ kanal antagonisti doz aşımına bağlı dolaşım kollapsıyla sınırlıdır. [[K3 s. 223]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="13c"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/13b">← 13b · Sentetik sempatomimetikler</a><a href="#/dersler/farmakoloji/14a">Sonraki: 14a · α-adrenoseptör antagonistleri →</a></nav>
</section>`
};
