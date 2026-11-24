VERI.sorular = VERI.sorular || {};
VERI.sorular['far16b-1'] = {
  no: 1, kok: 'Kalsiyum kanalları ve antagonistleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 262–264]]',
  onermeler: [
    { t: 'T-tipi kanallar ventrikül miyokardında bulunur.', d: false, n: 'Yanlış. T-tipi kanallar SA düğümde ve bazı damar düz kaslarında bulunur, ventrikül miyokardında bulunmaz. [[K3 s. 262]]' },
    { t: 'Verapamilin L-izomeri nodal kalsiyum kanallarına afinite gösterir.', d: true, n: 'Doğru. L-izomerinin kalsiyum kanal blokajı özellikle SA ve AV düğümde belirgindir. [[K3 s. 262]]' },
    { t: 'Nifedipin koroner kan akımını azaltır.', d: false, n: 'Yanlış. Koroner arter tonusunun azalması akımı artırır. [[K3 s. 263]]' },
    { t: 'Nimodipin kan–beyin bariyerini geçebilir.', d: true, n: 'Doğru. Nifedipine göre lipitte daha iyi çözünür. [[K3 s. 264]]' },
    { t: 'Diltiazem AV ileti süresini kısaltır.', d: false, n: 'Yanlış. Süre uzar, ancak bu etki verapamile göre daha zayıftır. [[K3 s. 264]]' }
  ]
};
VERI.sorular['far16b-2'] = {
  no: 2, kok: 'Hidralazin, minoksidil ve diazoksid', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 265–267]]',
  onermeler: [
    { t: 'Hidralazinle böbrek kan akımı artarken idrar çıkışı azalabilir.', d: true, n: 'Doğru. Akım artsa da sıvı tutulumu, ödem ve idrar çıkışında azalma sıktır. [[K3 s. 265]]' },
    { t: 'Hızlı asetilleyicilerde hidralazinin yarılanma ömrü 45 dakikaya inebilir.', d: true, n: 'Doğru. Normalde 2–3 saat olan süre hızlı asetilleyicilerde kısalabilir. [[K3 s. 265]]' },
    { t: 'Minoksidilin hipotansif etkisi plazma yarılanma ömrüyle sınırlıdır.', d: false, n: 'Yanlış. Yarılanma ömrü 3 saatken basınç üzerindeki etki 3 gün sürebilir. [[K3 s. 266]]' },
    { t: 'Diazoksid insülin salgısını artırır.', d: false, n: 'Yanlış. İnsülin salgısını baskılar ve katekolamin salınımını artırır. [[K3 s. 266]]' },
    { t: 'Diazoksidin hiperglisemik etkisi hipotansif etkisinden uzun sürer.', d: true, n: 'Doğru. Bu süreler sırasıyla yaklaşık 8 ve 5 saattir. [[K3 s. 267]]' }
  ]
};
VERI.sorular['far16b-3'] = {
  no: 3, kok: 'Pulmoner arteriyel hipertansiyonda sildenafil ve bosentan', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 267]]',
  onermeler: [
    { t: 'Bosentan yalnız endotelin A reseptörünü bloke eder.', d: false, n: 'Yanlış. Hem A hem B alt tiplerini antagonize eder. [[K3 s. 267]]' },
    { t: 'Bosentanın sürekli kullanımında plazma konsantrasyonu azalır.', d: true, n: 'Doğru. Kendi metabolizmasını indüklemesi konsantrasyonu %50 azaltır. [[K3 s. 267]]' },
    { t: 'Sildenafilin N-demetillenmiş metaboliti aktiftir.', d: true, n: 'Doğru. Toplam etkiye katkısı yaklaşık %35’tir. [[K3 s. 267]]' },
    { t: 'Sildenafilin dağılım hacmi 100 litredir.', d: true, n: 'Doğru. Sildenafilin dağılım hacmi 100 litre, plazma proteinlerine bağlanma oranı %95’tir. [[K3 s. 267]]' },
    { t: 'Bosentan sistemik vasküler direnci de azaltır.', d: true, n: 'Doğru. Pulmoner ve sistemik direnç azalırken kalp hızı artmaz. [[K3 s. 267]]' }
  ]
};

const A16B_NAV = [['kanal','Kanallar'],['kalp','Kalp ve damar'],['arter','Arteriyoller'],['pulmoner','Pulmoner dolaşım'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/16b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 16 · Ders 16b',
  baslik: 'Kalsiyum kanal antagonistleri ve diğer vazodilatörler',
  lede: 'Aynı L-tipi kanalı bloke eden ilaçlardan biri kalbi yavaşlatırken diğeri refleks taşikardi oluşturabilir. [[K3 s. 262–263]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A16B_NAV.map(([id, ad]) => `<button type="button" data-scroll="a16b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a16b-kanal">
<h2>Hangi kalsiyum kanalı?</h2>
<p class="intro">Kimyasal yapıları farklı olsa da bütün kalsiyum kanal antagonistleri L-tipi kanaldan Ca²⁺ girişini seçici olarak engeller. [[K3 s. 262]]</p>
<div class="viz"><div class="viz-head"><h3>Kanalı seçin ve bulunduğu dokuyu izleyin</h3></div><div data-viz="a16b_kanal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 262]]</p></div>
<p>L-tipi kanal kardiyovasküler sistemde yaygındır ve cAMP’ye bağımlı protein kinazla düzenlenir. [[K3 s. 262]] T-, N- ve P-tipi kanallar bu ilaçlardan etkilenmez. [[K3 s. 262]]</p>
<ul class="ozet">
<li><b>Sınıf I · Fenilalkilaminler.</b> Verapamil. [[K3 s. 263]]</li>
<li><b>Sınıf II · Dihidropiridinler.</b> Nifedipin, amlodipin ve nimodipin. [[K3 s. 263]]</li>
<li><b>Sınıf III · Benzotiazepinler.</b> Diltiazem. [[K3 s. 263]]</li>
</ul>
<p>Hepsi esansiyel hipertansiyonda yararlıdır. [[K3 s. 262]] Miyokarda, düğüm dokusuna ve damar düz kasına afiniteleri farklıdır, bu nedenle bazıları anjina veya aritmide özellikle yararlıdır. [[K3 s. 262]]</p>
</section>
<section class="wrap blk ders-sec" id="a16b-kalp">
<h2>Basınç düşerken kalp nasıl yanıt verir?</h2>
<p class="intro">Verapamil, nifedipin ve diltiazem kan basıncını düşürür, ancak iletiye, kasılmaya ve arter tonusuna etkileri farklıdır. [[K3 s. 262–264]]</p>
<div class="viz"><div class="viz-head"><h3>İlaca göre kardiyovasküler yanıt</h3></div><div data-viz="a16b_yanit"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Tekrarlanan oklar göreli etki şiddetini gösterir. [[K3 s. 263]]</p></div>
<p>Şekilde AV ileti süresine bakın: yukarı ok, uyarının AV düğümden daha uzun sürede geçtiğini gösterir. [[K3 s. 262–264]] Nifedipin için yan yana iki ok, yanıtın değişmeyebileceğini veya artabileceğini belirtir. [[K3 s. 263]]</p>
<div class="cols">
<div class="card"><h3>Verapamil</h3><ul>
<li>Papaverinin sentetik, rasemik türevidir. [[K3 s. 262]] L-izomeri özellikle SA ve AV düğümde Ca²⁺ kanallarını bloke ederken D-izomeri hızlı Na⁺ kanalları üzerinden bir miktar lokal anestezik etki gösterir. [[K3 s. 262]]</li>
<li>Tablet 20–240 mg (değiştirilmiş salımlı biçimleri de var), oral süspansiyon 40 mg/5 ml, renksiz intravenöz preparat 2.5 mg.ml⁻¹. [[K3 s. 262]]</li>
<li>Anjinada ve belirli supraventriküler aritmilerde kullanılır, ancak Wolff–Parkinson–White (WPW) sendromuna eşlik eden atriyal fibrilasyonda kullanılmaz. [[K3 s. 262]] Negatif inotropi hipertansiyondaki kullanımını sınırlar. [[K3 s. 262]]</li>
<li>Ventrikül işlevi bozuksa değişen derecelerde kalp bloğu veya kalp yetmezliği, WPW’de ventriküler fibrilasyon gelişebilir. [[K3 s. 263]]</li>
<li>Serebral damarları genişletir. [[K3 s. 263]] Kronik kullanımda depolarizan ve nondepolarizan kas gevşeticilerin etkisini güçlendirebilir. [[K3 s. 263]]</li></ul></div>
<div class="card"><h3>Nifedipin</h3><ul>
<li>Kapsül 5–10 mg, tablet 10–60 mg (bazıları sürekli salımlı). [[K3 s. 263]]</li>
<li>Etki oral yolla 15–20 dakikada, kapsül içeriği dilaltına verildiğinde 5–10 dakikada başlar. [[K3 s. 263]] Açılmış kapsülün içeriğini yutmak süreyi daha da kısaltabilir. [[K3 s. 263]]</li>
<li>Anjina profilaksisi ve tedavisi, hipertansiyon ve Raynaud sendromunda kullanılır. [[K3 s. 263]]</li>
<li>Periferik direnç düşer, koroner akım ve kalp debisi artar. [[K3 s. 263]] Refleks hız ve kontraktilite artışı bazen oksijen sunumu/gereksinimi oranını kötüleştirir. [[K3 s. 263]]</li></ul></div>
<div class="card"><h3>Nimodipin</h3><ul>
<li>Nifedipinin lipitte daha iyi çözünen analoğudur ve kan–beyin bariyerini geçebilir. [[K3 s. 264]]</li>
<li>Subaraknoid kanama sonrası serebral vazospazmı önlemek veya tedavi etmek için ve migrende kullanılır, oral ya da intravenöz verilebilir. [[K3 s. 264]]</li>
<li>Yararı, hücre hasarı ve yıkımına götüren Ca²⁺ bağımlı olaylar dizisini engellemesine bağlı olabilir. [[K3 s. 264]]</li></ul></div>
<div class="card"><h3>Diltiazem</h3><ul>
<li>60–200 mg tabletleri, yavaş salımlı preparatları ve hidroklorotiyazidli kombinasyonu vardır. [[K3 s. 264]]</li>
<li>Anjina profilaksisi ve tedavisi ile hipertansiyonda kullanılır. [[K3 s. 264]]</li>
<li>AV ileti süresini uzatması ve kasılmayı azaltması verapamilden daha zayıftır. [[K3 s. 264]] Sistemik direnç düşerken genellikle refleks taşikardi görülmez, koroner arter genişlemesi kan akımını artırır. [[K3 s. 264]]</li></ul></div></div>
<h3>Emilimden atılıma</h3>
<p>Üç ilaçta da bağırsaktan emilim %95’tir, ancak hepatik ilk geçiş nedeniyle oral biyoyararlanım daha düşüktür. [[K3 s. 263–265]]</p>
<div class="tbl-wrap"><table class="tbl a16b-tablo"><thead><tr><th>İlaç</th><th>Oral biyoyararlanım ve proteine bağlanma</th><th>Metabolizma, klirens ve yarılanma ömrü</th></tr></thead><tbody>
<tr><th>Verapamil</th><td>%20 ve %90 [[K3 s. 263–264]]</td><td>Demetilasyonla antiaritmik etkinliğini koruyan norverapamil oluşur. [[K3 s. 263]] Metabolizma sonrası atılım başlıca idrarla, %20’ye kadarı safrayladır. [[K3 s. 263]] Yarılanma ömrü 6–12 saat. [[K3 s. 264]]</td></tr>
<tr><th>Nifedipin</th><td>%60 ve %95 [[K3 s. 264]]</td><td>Aktif metaboliti yoktur, atılım ağırlıkla inaktif metabolitler halinde idrarladır. [[K3 s. 264]] Yarılanma ömrü tabloda 2–5 saat, oral uygulama sonrası metinde 5 saattir. [[K3 s. 264]]</td></tr>
<tr><th>Diltiazem</th><td>%50 ve yaklaşık %75 [[K3 s. 264–265]]</td><td>Klirens %60 hepatik, %40 renal, yarılanma ömrü 3–6 saattir. [[K3 s. 264]] Karaciğerde oluşan aktif desasetildiltiazem idrarla atılır. [[K3 s. 265]]</td></tr>
</tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap, diltiazemin %40’ının değişmeden idrarla atıldığını bildirir. [[K3 s. 265]] Değişmemiş ilaç için doğru oran %2–4’tür.</div>
</section>
<section class="wrap blk ders-sec" id="a16b-arter">
<h2>Arteriyoler tonus ve refleks yanıt</h2>
<p class="intro">Hidralazin ve diazoksid başlıca arteriyolleri genişletir, kapasitans damarlarını az etkiler. [[K3 s. 265–266]]</p>
<div class="viz"><div class="viz-head"><h3>Hidralazinin etkisini izleyin</h3></div><div data-viz="a16b_refleks"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 265]]</p></div>
<p>Şeklin son adımında β-blokajın yerini bulun: hidralazinle gelişen refleks taşikardi ve debi artışı β-blokajla sınırlanabilir. [[K3 s. 265]]</p>
<h3>Hidralazin</h3>
<ul class="ozet">
<li><b>Hazırlama.</b> Tabletler 25–50 mg’dır. [[K3 s. 265]] İntravenöz kullanım için 20 mg toz suyla sulandırılır, %5 dekstroz parçalanmayı hızlandırdığı için kullanılmaz. [[K3 s. 265]]</li>
<li><b>Kullanım.</b> Kronik hipertansiyon ve ağır kronik kalp yetmezliğinde diğer ilaçlarla birlikte oral verilir. [[K3 s. 265]] Preeklampsiye bağlı akut hipertansiyonda intravenöz doz 10–20 mg’dır, etki 20 dakikayı bulabilir ve tekrar doz gerekebilir. [[K3 s. 265]]</li>
<li><b>Organ yanıtı.</b> Serebral arterler genişler ve serebral akım artar. [[K3 s. 265]] Böbrek kan akımı artsa da sıvı tutulumu, ödem ve idrar çıkışında azalma sıktır, eşzamanlı diüretik bunları giderebilir. [[K3 s. 265]]</li>
<li><b>İstenmeyen etkiler.</b> Bulantı ve kusma sıktır, periferik nöropati ve kan diskrazileri görülebilir. [[K3 s. 265]] Uzun kullanımda bazen gelişen lupus benzeri sendrom kadınlarda ve yavaş asetilleyicilerde daha sık olabilir, uzun süreli kortikosteroid gerektirebilir. [[K3 s. 265]]</li>
<li><b>Kinetik.</b> Bağırsaktan iyi emilir, asetilleyici durumu ve değişken ilk geçiş nedeniyle oral biyoyararlanım %25–55’tir. [[K3 s. 265]] Proteine bağlanma %90, plazma yarılanma ömrü 2–3 saattir, hızlı asetilleyicilerde 45 dakikaya inebilir. [[K3 s. 265]]</li>
<li><b>Atılım ve plasenta.</b> %85’e kadarı asetillenmiş ve hidroksillenmiş metabolitler halinde idrarla atılır, bazı metabolitler glukuronik asitle konjuge olur. [[K3 s. 266]] Plasentayı geçer ve fetal taşikardi yapabilir. [[K3 s. 266]]</li>
</ul>
<h3>Minoksidil</h3>
<ul class="ozet"><li><b>Sunum ve kullanım.</b> Ağır hipertansiyon ve alopesi areatada kullanılır, preparatları 2.5–10 mg tablet, %2 çözelti ve %5 losyondur. [[K3 s. 266]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap %2 minoksidil çözeltisini intravenöz preparat olarak tanımlar. [[K3 s. 266]] Doğru uygulama yalnızca saçlı deriye haricendir.</div>
<ul class="ozet">
<li><b>Etkiler.</b> Kitap temel mekanizma ve başlıca etkileri hidralazine benzetir, kıl folikülünün nasıl uyarıldığı belirsizdir. [[K3 s. 266]] Yüzde ve kollarda hipertrikoz, ayrıca meme hassasiyeti görülebilir, lupus benzeri reaksiyon yapmaz. [[K3 s. 266]]</li>
<li><b>Kinetik.</b> Bağırsaktan iyi emilir, oral biyoyararlanımı %90’dır ve plazma proteinlerine bağlanmaz. [[K3 s. 266]] Plazma yarılanma ömrü 3 saat olsa da hipotansif etki 3 gün sürebilir. [[K3 s. 266]] Hepatik glukuronid konjugasyonunu idrarla atılım izler. [[K3 s. 266]]</li></ul>
<h3>Diazoksid</h3>
<ul class="ozet">
<li><b>Sunum ve kullanım.</b> Tiyazid diüretiklerle kimyasal akrabalığı vardır, 50 mg tablet ve 15 mg.ml⁻¹ intravenöz çözelti olarak bulunur. [[K3 s. 266]] Böbrek hastalığına bağlı hipertansif acilde intravenöz 1–3 mg.kg⁻¹ (en çok 150 mg) verilir, 15 dakika sonra tekrarlanabilir. [[K3 s. 266]] İnatçı hipoglisemi ve malign adacık hücreli tümörlerde de kullanılmıştır. [[K3 s. 266]]</li>
<li><b>Damar yanıtı.</b> Arteriyollerde cAMP düzeyinin değişmesi vazodilatasyon oluşturur, Ca²⁺ girişinin azalması da rol oynayabilir. [[K3 s. 266]] Basınç düşer, kalp hızı ve debi artar, postüral hipotansiyon sorun oluşturmaz. [[K3 s. 266]]</li>
<li><b>Metabolik etkiler.</b> İnsülin salgısı baskılanır, katekolamin salınımı artar. [[K3 s. 266]] Glukoz, katekolamin, renin ve aldosteron düzeyleri yükselir, sıvı tutulumu kıvrım diüretiği gerektirebilir. [[K3 s. 266]]</li>
<li><b>Yan etkiler.</b> Özellikle başlangıçta bulantı, ayrıca okülojirik kriz dahil ekstrapiramidal etkiler, trombositopeni ve hiperürisemi görülebilir. [[K3 s. 266]]</li>
<li><b>Kinetik.</b> Bağırsaktan iyi emilir, oral biyoyararlanımı %80, plazma proteinlerine bağlanması yaklaşık %90’dır. [[K3 s. 267]] Hiperglisemik etki yaklaşık 8 saat, hipotansif etki yaklaşık 5 saat sürer, plazma yarılanma ömrü 36 saate uzayabilir. [[K3 s. 267]] Kısmen karaciğerde metabolize olur, idrarda değişmemiş ilaç ve inaktif metabolitler bulunur. [[K3 s. 267]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a16b-pulmoner">
<h2>Pulmoner arteriyel hipertansiyonda iki hedef</h2>
<p class="intro">Sildenafil cGMP üzerinden, bosentan ise endotelin reseptörleri üzerinden etki eder. [[K3 s. 267]]</p>
<div class="viz"><div class="viz-head"><h3>İlacı seçerek damar yanıtını karşılaştırın</h3></div><div data-viz="a16b_pulmoner"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 267]]</p></div>
<div class="cols"><div class="card"><h3>Sildenafil</h3><ul>
<li>Pulmoner arteriyel hipertansiyonda günde üç kez 20 mg verilir, diğer kullanım alanı erektil disfonksiyondur. [[K3 s. 267]]</li>
<li>Hızla emilir, oral biyoyararlanımı %40, proteine bağlanması %95 ve dağılım hacmi 100 litredir. [[K3 s. 267]]</li>
<li>Başlıca CYP3A4 ile oluşan N-demetillenmiş aktif metabolit toplam etkinin yaklaşık %35’ini sağlar. [[K3 s. 267]] CYP3A4 indüksiyonu veya inhibisyonunda doz ayarı düşünülmelidir. [[K3 s. 267]]</li>
<li>Yarılanma ömrü 3–5 saattir, %80’i dışkıyla atılır. [[K3 s. 267]] Belirgin böbrek işlev bozukluğunda ve karaciğer işlev bozukluğunda konsantrasyon–zaman eğrisi altındaki alan artar. [[K3 s. 267]]</li></ul></div>
<div class="card"><h3>Bosentan</h3><ul>
<li>Çocuklarda ve erişkinlerde pulmoner arteriyel hipertansiyon tedavisinde kullanılır. [[K3 s. 267]] Erişkinde ilk 4 hafta günde iki kez 62.5 mg verilir, ardından doz 125 mg’a çıkarılır. [[K3 s. 267]]</li>
<li>Oral biyoyararlanımı %50’dir. [[K3 s. 267]] Sürekli kullanım kendi metabolizmasını indükler, plazma konsantrasyonu %50 azalır. [[K3 s. 267]]</li>
<li>Kendisini metabolize eden enzimleri, CYP3A4 dahil, indükler ve safrayla atılır. [[K3 s. 267]]</li></ul></div></div>
<div class="note plain"><b>Atlas notu.</b> Kitap sildenafilin hedefini “cGMP tip 5”, sildenafilin metabolizmasında ikincil rol alan ve bosentanı da metabolize eden enzimi “CYP2CY” olarak adlandırır. [[K3 s. 267]] Sildenafilin hedefi cGMP’yi yıkan fosfodiesteraz tip 5 (PDE5), her iki ilaç için doğru izoenzim adı CYP2C9’dur.</div>
</section>
<section class="wrap blk ders-sec" id="a16b-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı yanıtlayın ve gerekçenizi kontrol edin.</p>
<div class="viz"><div data-viz="mtf" data-q="far16b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far16b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far16b-3"></div></div></section>
<section class="wrap blk ders-sec" id="a16b-p2"><h2>Part II · SOE 2 (Farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Verapamil, nifedipin ve diltiazemle kan basıncı düşerken kalp hızı ve AV ileti nasıl değişir? Bu fark ilaç seçimine nasıl yansır?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Ortak hedef L-tipi kanaldır, düğüm dokusu, miyokart ve damar düz kasına afinite değişir. [[K3 s. 262]]</li>
<li>Verapamil SA ve AV iletisini yavaşlatır ve hızı düşürür, belirli supraventriküler aritmilerde kullanılır. [[K3 s. 262]] WPW’ye eşlik eden atriyal fibrilasyonda ventriküler fibrilasyon riski vardır. [[K3 s. 262–263]]</li>
<li>Nifedipinle baskın etki arterlerin genişlemesidir, hız refleks olarak artabilir, AV ileti süresi aynı kalabilir veya uzayabilir. [[K3 s. 263]] Anjina, hipertansiyon ve Raynaud kullanım alanlarıdır. [[K3 s. 263]]</li>
<li>Diltiazem kalbi yavaşlatır ve AV ileti süresini uzatır, koroner akım artar. [[K3 s. 263–264]] Anjina ve hipertansiyonda kullanılır. [[K3 s. 264]]</li>
<li>Ventrikül işlevi bozuksa verapamil kalp bloğuna veya kalp yetmezliğine yol açabilir. [[K3 s. 263]]</li></ol>
<div class="note"><b>Çizin.</b> Üç ilaç için arter genişlemesi, kalp hızı ve AV ileti süresini yan yana oklarla gösterin. [[K3 s. 263]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Hidralazinde β-blokaj hangi refleks yanıtı sınırlar? Bosentanın sürekli kullanımında plazma düzeyi neden düşer? [[K3 s. 265]] [[K3 s. 267]]</div></section>
<section class="wrap blk ders-sec" id="a16b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Verapamil düğüm iletisini yavaşlatır, nifedipinle arter genişlemesine refleks taşikardi eşlik edebilir. [[K3 s. 262–263]]</li>
<li>Diltiazem hem kalpte hem damarda etkilidir, nimodipin ise serebral vazospazmda kullanılır. [[K3 s. 264]]</li>
<li>Hidralazinle refleks taşikardi ve sıvı tutulumu görülebilir. [[K3 s. 265]]</li>
<li>Minoksidilin hipotansif etkisi yarılanma ömrünü aşabilir, diazoksidde hiperglisemik etki hipotansif etkiden uzun sürer. [[K3 s. 266–267]]</li>
<li>Sildenafil cGMP düzeyini artırır, bosentan A ve B endotelin reseptörlerini bloke eder. [[K3 s. 267]]</li>
</ul><div data-viz="tamam" data-modul="farmakoloji" data-bolum="16b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/16a">← 16a · Nitrovazodilatörler ve potasyum kanal aktivatörleri</a><a href="#/dersler/farmakoloji/17">Sonraki: 17 · Antihipertansifler →</a></nav></section>`
};
