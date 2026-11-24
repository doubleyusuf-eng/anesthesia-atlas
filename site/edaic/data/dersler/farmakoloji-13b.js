VERI.sorular = VERI.sorular || {};
VERI.sorular['far13b-1'] = {
  no: 1, kok: 'Damar direnci, kalp debisi ve vazopresör yanıtı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 214–215]] [[K3 s. 219]]',
  onermeler: [
    {t:'Fenilefrinin basınç artırıcı etkisine doğrudan β₁ uyarısı katkıda bulunur.', d:false, n:'Fenilefrin doğrudan α₁ agonistidir ve β reseptörlerini uyarmaz. [[K3 s. 214]]'},
    {t:'Fenilefrinle kan basıncı yükselirken kalp debisi düşebilir.', d:true, n:'Damar direnci artar ve refleks bradikardi gelişebilir, sonuçta debi düşer. [[K3 s. 215]]'},
    {t:'Efedrinde taşifilaksi, sempatik sinirlerdeki noradrenalin depolarının tükenmesiyle ilişkilidir.', d:true, n:'Depolar boşaldıkça efedrinin dolaylı etkisi zayıflar. [[K3 s. 219]]'},
    {t:'Metaraminol pulmoner arter basıncını düşürür.', d:false, n:'Pulmoner vasküler dirençteki artış pulmoner arter basıncını yükseltir. [[K3 s. 219]]'},
    {t:'Efedrin böbrek kan akımını artırır.', d:false, n:'Böbrek kan akımı ve glomerüler filtrasyon hızı azalır. [[K3 s. 219]]'},
  ],
};
VERI.sorular['far13b-2'] = {
  no: 2, kok: 'Sentetik katekolaminlerin etkileri ve kinetiği', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 215–217]]',
  onermeler: [
    {t:'İzoprenalinde debi artışı kan basıncını korumaya yetmeyebilir.', d:true, n:'β₂ uyarısı sistemik vasküler direnci azaltabilir. [[K3 s. 215]]'},
    {t:'Dobutamin atriyal flutterda ventrikül yanıtını yavaşlatır.', d:false, n:'AV iletim hızlandığı için ventrikül yanıtı hızlanabilir. [[K3 s. 216]]'},
    {t:'Dopeksaminin D₁ reseptörlerinde agonist etkisi vardır.', d:true, n:'Başlıca hedefleri D₁ ve β₂ reseptörleridir. [[K3 s. 217]]'},
    {t:'Dobutaminin yarı ömrü 2 dakikadır.', d:true, n:'COMT dobutamini hızla inaktif metabolitlere dönüştürür ve yarı ömrü 2 dakikadır. [[K3 s. 216]]'},
    {t:'Dopeksamin miyokardın oksijen ekstraksiyonunu artırır.', d:false, n:'Koroner akım hafif artarken miyokardın oksijen ekstraksiyonu değişmez. [[K3 s. 217]]'},
  ],
};
VERI.sorular['far13b-3'] = {
  no: 3, kok: 'β₂ agonistlerin etkileri ve gruptaki farklar', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 217–218]]',
  onermeler: [
    {t:'Salbutamol hipoksik pulmoner vazokonstriksiyonu güçlendirir.', d:false, n:'Bu vazokonstriksiyonu geri döndürdüğü için şant artar ve hipoksemi gelişebilir. [[K3 s. 217]]'},
    {t:'Salbutamol Na⁺/K⁺ ATPaz üzerinden potasyumu hücre içine taşır.', d:true, n:'Pompanın uyarılması hücre içine potasyum geçişini artırarak hipokalemiye yol açar. [[K3 s. 218]]'},
    {t:'Salmeterolün uzun, apolar yan zinciri etki süresine katkıda bulunur.', d:true, n:'Zincirin β₂ reseptörüne bağlanması yaklaşık 12 saatlik etki sağlar. [[K3 s. 218]]'},
    {t:'Ritodrin plasentayı geçerek fetal taşikardiye neden olabilir.', d:true, n:'Fetal taşikardi olasıdır, annede ise tedavi sırasında taşikardi sıktır. [[K3 s. 218]]'},
    {t:'Terbutalinin β₁ reseptörlerinde de bir miktar aktivitesi vardır.', d:true, n:'Terbutalinde β₂ etkisi baskın olsa da β₁ aktivitesi korunur. [[K3 s. 218]]'},
  ],
};

const A13B_NAV = [
  ['fen','Fenilefrin'], ['katekol','Sentetik katekolaminler'], ['beta','β₂ agonistler'],
  ['karma','Karma agonistler'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];
SAYFALAR['dersler/farmakoloji/13b'] = {
  grup:'dersler', eyebrow:'Farmakoloji · Kısım 3 · Bölüm 13 · Ders 13b', baslik:'Sentetik sempatomimetikler',
  lede:'Fenilefrin basıncı damar direncini yükselterek artırır. [[K3 s. 214]] İzoprenalin ise kalp debisini artırsa bile basıncı koruyamayabilir. [[K3 s. 215]]',
  html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${A13B_NAV.map(([id, ad]) => `<button type="button" data-scroll="a13b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a13b-fen">
<h2>Fenilefrin · Direnç yükselirken debi ne olur?</h2>
<p class="intro">Fenilefrin, β etkisi olmayan, doğrudan ve güçlü bir α₁ agonistidir. [[K3 s. 214]]</p>
<div class="viz"><div class="viz-head"><h3>Uygulama yolundan basınç yanıtına</h3></div><div data-viz="a13b_yol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel basınç yanıtı ve uygulama süreleri. [[K3 s. 214–215]]</p></div>
<p>Direnç ve arter basıncı hızla yükselir, refleks bradikardi gelişebilir ve kalp debisi düşer. [[K3 s. 214–215]]</p>
<ul class="ozet">
<li><b>Preparat.</b> Berrak çözeltinin 1 ml’sinde 10 mg bulunur. [[K3 s. 215]]</li>
<li><b>Anestezi.</b> Spinal anesteziye veya sistemik ilaçlara bağlı düşük damar direncini yükseltir. [[K3 s. 215]] Genel anestezide direnç düşünce bazı hastalarda soldan sağa intrakardiyak şant tersine dönebilir, fenilefrin başlangıç yönünü geri kazandırabilir. [[K3 s. 215]]</li>
<li><b>Obstetri.</b> Spinal hipotansiyonda efedrine kıyasla kordon kan gazı profili daha olumludur. [[K3 s. 215]]</li>
<li><b>Diğer kullanımlar.</b> Nazal dekonjestan ve midriyatik olarak sunulur. [[K3 s. 215]] Hipotansiyona eşlik eden supraventriküler taşikardide kullanım alanı sınırlı olabilir. [[K3 s. 215]]</li>
<li><b>Organ etkileri.</b> Aritmojenik değildir, merkezi sinir sistemini uyarmaz ve noradrenalin gibi renal kan akımını azaltır. [[K3 s. 215]]</li>
<li><b>Kinetik.</b> Karaciğerde monoamin oksidaz (MAO) ile metabolize olur. [[K3 s. 215]] Metabolitleri ve bunların atılım yolu tanımlanmamıştır. [[K3 s. 215]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a13b-katekol">
<h2>Sentetik katekolaminler · Debiyi artıran üç yol</h2>
<p class="intro">Sentetik ajanlar içinde yalnız izoprenalin, dobutamin ve dopeksamin katekolamindir. [[K3 s. 213]] Üçünde de benzen halkasının 3 ve 4 konumlarında hidroksil grubu vardır. [[K3 s. 213]]</p>
<div class="viz"><div class="viz-head"><h3>Kalp debisi arttığında basınç nasıl değişir?</h3></div><div data-viz="a13b_debi"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel reseptör ve dolaşım karşılaştırması. [[K3 s. 215–217]]</p></div>
<h3>İzoprenalin</h3>
<ul class="ozet">
<li><b>Hedef.</b> β₁ ve β₂ reseptörlerinde çok güçlüdür, α etkisi yoktur. [[K3 s. 215]] β₁ uyarısıyla kalp hızı, kontraktilite, otomatisite ve debi artar. [[K3 s. 215]]</li>
<li><b>Kullanım.</b> AV blok veya β-blokerle ilişkili ağır bradikardide berrak 1 mg.ml⁻¹ çözeltiden intravenöz (IV) infüzyon uygulanır (0.5–10 µg.min⁻¹). [[K3 s. 215]] Ölçülü inhaler 80 veya 400 µg verir, 30 mg tablet çok seyrek kullanılır. [[K3 s. 215]]</li>
<li><b>Hava yolu.</b> Reversibl obstrüksiyonda kullanımı artmış mortaliteyle ilişkilendirilmiştir ve yerini salbutamol gibi daha özgül β₂ agonistler almıştır. [[K3 s. 215]] Akciğerde güçlü bronkodilatasyon yapar ve histamin salınımını baskılayarak mukus akışını iyileştirir. [[K3 s. 216]] Anatomik ölü boşluk ve ventilasyon-perfüzyon uyumsuzluğu artar, sistemik hipoksemi gelişebilir. [[K3 s. 216]]</li>
<li><b>Koroner dolaşım.</b> Taşikardi diyastolik doluş süresini kısaltır ve düşük diyastolik basınç koroner perfüzyonu azaltırsa miyokarda oksijen sunumu belirgin azalabilir. [[K3 s. 215–216]] Bir miktar koroner vazodilatasyon bu etkiyi hafifletir. [[K3 s. 216]]</li>
<li><b>Diğer etkiler.</b> Merkezi sinir sistemini uyarır, mezenterik ve renal akımı artırır. [[K3 s. 216]] β etkileriyle kan glukozu ve serbest yağ asitleri yükselir. [[K3 s. 216]]</li>
</ul>
<h3>Dobutamin</h3>
<ul class="ozet">
<li><b>Hedef ve kullanım.</b> İzoprenalinin doğrudan etkili türevidir, β₁ etkisi baskın ve β₂ etkisi zayıftır. [[K3 s. 216]] Enfarktüs, kalp cerrahisi veya kardiyojenik şokla ilişkili düşük debide 0.5–20 µg.kg⁻¹.min⁻¹ kullanılır. [[K3 s. 216]] Kardiyak stres testinde egzersize alternatiftir. [[K3 s. 216]]</li>
<li><b>Sunum.</b> Her iki preparatta 250 mg dobutamin bulunur. [[K3 s. 216]] Biri 20 ml suda sodyum metabisülfit, diğeri 5 ml suda askorbik asit içerir. [[K3 s. 216]]</li>
<li><b>Kalp.</b> Kontraktilite ve hızla birlikte miyokardın oksijen gereksinimi artar. [[K3 s. 216]] Aritmileri tetikleyebilir, AV iletimi hızlandırarak atriyal fibrilasyon veya flutterda ventrikül yanıtını artırabilir. [[K3 s. 216]] Kitap, çıkış yolu obstrüksiyonu örnekleri arasında aort stenozu ve kardiyak tamponadı sayar ve dobutaminden kaçınılmasını belirtir. [[K3 s. 216]]</li>
<li><b>İdrar çıkışı.</b> Splanknik dolaşıma etkisi yoktur, ancak debi artışını idrar çıkışında artış izleyebilir. [[K3 s. 216]]</li>
</ul>
<div class="note plain"><b>Atlas notu.</b> Kitap tamponadı çıkış yolu obstrüksiyonuna örnek verir. Tamponadda temel mekanizma, perikard basıncının artmasıyla kalbin diyastolik doluşunun kısıtlanmasıdır.</div>
<h3>Dopeksamin</h3>
<ul class="ozet">
<li><b>Hedef.</b> Dopaminin sentetik analoğudur. [[K3 s. 216]] β₂ ve D₁ reseptörlerini uyarır, noradrenalin geri alımını da engelleyebilir. [[K3 s. 217]] D₂ ve β₁ etkileri çok azdır, α etkisi yoktur. [[K3 s. 217]]</li>
<li><b>Sunum ve kullanım.</b> IV preparat 5 ml’de 50 mg içerir (pH 2.5). [[K3 s. 217]] Debiyi ve mezenterik perfüzyonu iyileştirmek için 0.5–6 µg.kg⁻¹.min⁻¹ kullanılır. [[K3 s. 217]]</li>
<li><b>Perfüzyon.</b> Koroner akım hafif artar, miyokardın oksijen ekstraksiyonu değişmez. [[K3 s. 217]] Kalp hızı yanıtı değişkendir ve aritmi nadirdir. [[K3 s. 217]] Debinin artması ve bölgesel direncin azalması bağırsak ve böbrek kan akımını artırır, idrar çıkışı yükselir. [[K3 s. 217]]</li>
<li><b>Diğer etkiler.</b> β₂ uyarısı bronkodilatasyon yapar. [[K3 s. 217]] Bulantı ve kusma olabilir, tremor ve baş ağrısı bildirilmiştir. [[K3 s. 217]]</li>
</ul>
<h3>Kinetik karşılaştırması</h3>
<div class="tbl-wrap"><table class="tbl a13b-tablo"><thead><tr><th>İlaç</th><th>Emilim, metabolizma ve atılım</th></tr></thead><tbody>
<tr><th>İzoprenalin</th><td>Oral emilim iyi olsa da karaciğerde COMT ile hızlı ilk geçiş metabolizması biyoyararlanımı düşürür. [[K3 s. 216]] Önemli bir kısmı değişmeden, konjuge metabolitleriyle birlikte idrarla atılır. [[K3 s. 216]]</td></tr>
<tr><th>Dobutamin</th><td>Yalnız IV verilir, yarı ömrü 2 dakikadır. [[K3 s. 216]] COMT ile hızla oluşan inaktif metabolitler konjuge edilip idrarla atılır. [[K3 s. 216]]</td></tr>
<tr><th>Dopeksamin</th><td>Kandan hızla temizlenir, yarı ömrü 7 dakikadır. [[K3 s. 217]]</td></tr>
</tbody></table></div></section>
<section class="wrap blk ders-sec" id="a13b-beta">
<h2>β₂ agonistler · Bronş, potasyum ve uterus</h2>
<p class="intro">Salbutamolün başlıca hedefi β₂ reseptörüdür ve temel etkisi bronş düz kasını gevşetmektir. [[K3 s. 217]]</p>
<div class="viz"><div class="viz-head"><h3>Salbutamolün etkisini dokudan sonuca izleyin</h3></div><div data-viz="a13b_doku"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel organ yanıtları. [[K3 s. 217–218]]</p></div>
<p>Sentetik sempatomimetik amin olan salbutamol reversibl alt hava yolu obstrüksiyonunda, bazen de prematüre doğum eyleminde kullanılır. [[K3 s. 217]]</p>
<div class="cols"><div class="card"><h3>Salbutamol preparatları</h3><ul>
<li>IV infüzyon için seyreltilecek berrak çözelti, 50–500 µg.ml⁻¹. [[K3 s. 217]]</li>
<li>Ölçülü inhaler 100 µg, kuru toz 200–400 µg. [[K3 s. 217]]</li>
<li>Nebülizasyon çözeltisi 2.5–5 mg.ml⁻¹. [[K3 s. 217]]</li>
<li>Şurup 0.4 mg.ml⁻¹, tabletler 2, 4 veya 8 mg. [[K3 s. 217]]</li></ul></div>
<div class="card"><h3>Dolaşım ve metabolizma</h3><ul>
<li>Özellikle yüksek IV dozda β₁ uyarısı dozu sınırlayan taşikardi yapabilir. [[K3 s. 217]]</li>
<li>Düşük dozda β₂ aracılı vazodilatasyon bazen basıncı düşürebilir, özellikle hipokalemide aritmi tetiklenebilir. [[K3 s. 217]]</li>
<li>Kan şekeri özellikle diyabetiklerde yükselir, eşzamanlı steroidler yükselişi şiddetlendirir. [[K3 s. 218]]</li>
<li>İskelet kasına doğrudan etki tremor oluşturabilir. [[K3 s. 218]]</li></ul></div></div>
<p><b>Kinetik.</b> Bağırsaktan emilim eksik, hepatik ilk geçiş belirgindir. [[K3 s. 218]] İnhalasyon ve IV uygulamada etki hızla başlar. [[K3 s. 218]] Proteine bağlanma %10, yarı ömür 4–6 saattir. [[K3 s. 218]] Karaciğerde oluşan inaktif 4-O-sülfat, ana ilaçla birlikte idrarla atılır. [[K3 s. 218]]</p>
<h3>Aynı gruptaki ilaçları ne ayırır?</h3>
<ul class="ozet">
<li><b>Salmeterol.</b> Gece ve egzersizle tetiklenen astımda kullanılır, nispeten yavaş başladığı için akut atakta kullanılmamalıdır. [[K3 s. 218]] Uzun, apolar yan zincirin β₂ reseptörüne bağlanması yaklaşık 12 saatlik etki sağlar. [[K3 s. 218]] Salbutamole göre β₂’de 15 kat daha güçlü, β₁’de dört kat daha az güçlüdür. [[K3 s. 218]]</li>
<li><b>Salmeterolün ek etkileri.</b> Genel etkileri salbutamole benzer. [[K3 s. 218]] Mast hücrelerinden histamin, lökotrien ve prostaglandin D₂ salınımını önler, steroidlerinkinden farklı ek antiinflamatuvar etkileri vardır. [[K3 s. 218]]</li>
<li><b>Ritodrin.</b> Prematüre doğum eyleminde kullanılan bu β₂ agonisti annede sıklıkla β₁ aracılı taşikardi yapar. [[K3 s. 218]] Plasentayı geçer ve fetal taşikardi yapabilir. [[K3 s. 218]] Ölümcül maternal pulmoner ödemle ilişkilendirilmiştir. [[K3 s. 218]] Hipokalemi ve hiperglisemiye, yüksek düzeylerde ayrıca kusma, huzursuzluk ve nöbetlere neden olur. [[K3 s. 218]]</li>
<li><b>Terbutalin.</b> Bir miktar β₁ aktivitesi taşıyan bu β₂ agonisti astım ve komplike olmayan preterm doğum eyleminde kullanılır. [[K3 s. 218]] Yan etkileri gruptaki diğer ilaçlara benzer. [[K3 s. 218]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a13b-karma">
<h2>Karma agonistler · Efedrin ve metaraminol</h2>
<p class="intro">İki amin de doğrudan ve dolaylı etki gösterir, ancak basınç yükselirken kalp debisinin izlediği yön farklıdır. [[K3 s. 219]]</p>
<div class="viz"><div class="viz-head"><h3>Rejyonal anestezide iki farklı dolaşım yanıtı</h3></div><div data-viz="a13b_karma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel hemodinamik karşılaştırma. [[K3 s. 219]]</p></div>
<h3>Efedrin</h3>
<ul class="ozet">
<li><b>Köken ve sunum.</b> Bazı bitkilerde doğal olarak bulunur, tıbbi kullanım için sentezlenir. [[K3 s. 218]] Dört izomerinden yalnız L biçimi aktiftir. [[K3 s. 219]] Tablet, eliksir, burun damlası ve 30 mg.ml⁻¹ enjeksiyonluk çözelti olarak sunulur. [[K3 s. 219]]</li>
<li><b>Kullanım.</b> Rejyonal anesteziye bağlı hipotansiyonda IV uygulanır. [[K3 s. 219]] Obstetride saf α agonistlerine göre kordon kanı pH’sı daha düşüktür, ancak göreceli maternal bradikardide hâlâ tercih edilir. [[K3 s. 219]] Bronkospazm, gece enürezisi ve narkolepsi de kullanım alanlarıdır. [[K3 s. 219]]</li>
<li><b>Noradrenalin.</b> MAO’nun noradrenalin üzerindeki etkisini inhibe eder. [[K3 s. 219]] Dolaylı etkisi sinir uçlarındaki noradrenalin depolarına bağlıdır, depolar boşaldıkça taşifilaksi gelişebilir. [[K3 s. 219]] MAO inhibitörü kullananlarda çok dikkatli kullanılmalıdır. [[K3 s. 219]]</li>
<li><b>Organ etkileri.</b> Koroner akım ve miyokardın oksijen tüketimi artar, aritmi tetiklenebilir. [[K3 s. 219]] Solunumu uyarır ve bronkodilatasyon yapar. [[K3 s. 219]] Renal kan akımı ve glomerüler filtrasyon hızı azalır. [[K3 s. 219]]</li>
<li><b>Kinetik.</b> Oral, intramüsküler ve subkütan emilimi iyidir. [[K3 s. 219]] Adrenalinden farklı olarak MAO veya COMT ile yıkılmaz, etkisi daha uzun sürer ve eliminasyon yarı ömrü 4 saattir. [[K3 s. 219]] Bir bölümü karaciğerde metabolize olur, %65’i idrarla değişmeden atılır. [[K3 s. 219]]</li>
</ul>
<h3>Metaraminol</h3>
<ul class="ozet">
<li><b>Hedef ve doz.</b> Bu sentetik aminde α₁ etkisi baskın olmakla birlikte bir miktar β aktivitesi vardır. [[K3 s. 219]] Berrak çözelti 10 mg.ml⁻¹ içerir, spinal veya epidural anesteziye bağlı hipotansiyonda 0.5–2 mg IV bolus genellikle yeterlidir. [[K3 s. 219]]</li>
<li><b>Bölgesel dolaşım.</b> Koroner arter akımı dolaylı yoldan artar. [[K3 s. 219]] Pulmoner damar direncinin artması pulmoner arter basıncını yükseltir. [[K3 s. 219]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a13b-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız yanıtlayın.</p>
<div class="viz"><div data-viz="mtf" data-q="far13b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far13b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far13b-3"></div></div></section>
<section class="wrap blk ders-sec" id="a13b-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Obstetride spinal anesteziye bağlı hipotansiyonda fenilefrin ile efedrini nasıl karşılaştırırsınız? Kalp hızı ve kordon kan gazı seçiminizi nasıl etkiler?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Fenilefrin doğrudan α₁ uyarısıyla direnci ve basıncı artırır. [[K3 s. 214]]</li>
<li>Refleks bradikardi gelişebilir ve kalp debisi düşer. [[K3 s. 215]]</li>
<li>Efedrin doğrudan ve dolaylı etkileriyle kalp hızını, debiyi ve basıncı artırır. [[K3 s. 219]]</li>
<li>Efedrinde noradrenalin depolarının tükenmesiyle tekrarlanan uygulamalarda yanıt zayıflayabilir. [[K3 s. 219]]</li>
<li>Kordon kan gazı fenilefrinle daha olumludur. [[K3 s. 215]] Göreceli maternal bradikardi efedrin lehinedir. [[K3 s. 219]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> İki ilaç için basınç, kalp hızı ve debi oklarını yan yana çizin, fenilefrin için hızdaki düşüşün refleks ve olası olduğunu gösterin. [[K3 s. 215]] [[K3 s. 219]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Metaraminolün β aktivitesine rağmen debi neden düşebilir? [[K3 s. 219]] Dopeksamin artyükü nasıl değiştirir? [[K3 s. 217]]</div></div></section>
<section class="wrap blk ders-sec" id="a13b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Fenilefrinde basınç artışına refleks bradikardi eşlik edebilir. [[K3 s. 215]]</li>
<li>İzoprenalinde β₂ aracılı direnç düşüşü, debi artışının basınca yansımasını sınırlayabilir. [[K3 s. 215]]</li>
<li>Dobutaminin β₁ etkisi baskındır, dopeksamin ise β₂ ve D₁ reseptörlerini uyarır. [[K3 s. 216–217]]</li>
<li>Salbutamolle bronş genişlerken pulmoner şant artabilir. [[K3 s. 217]] Salmeterol nispeten yavaş başlar ve yaklaşık 12 saat etkilidir. [[K3 s. 218]]</li>
<li>Efedrinin dolaylı etkisi noradrenalin depolarına bağlıdır, metaraminolde artan sistemik direnç karşısında debi sıklıkla düşer. [[K3 s. 219]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="13b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/13a">← 13a · Adrenerjik fizyoloji ve doğal katekolaminler</a><a href="#/dersler/farmakoloji/13c">Sonraki: 13c · Diğer inotropik ajanlar →</a></nav></section>`,
};
