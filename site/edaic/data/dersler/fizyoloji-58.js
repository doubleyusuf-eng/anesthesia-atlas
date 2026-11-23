/* Fizyoloji Bölüm 58 · Elektrokardiyogram (K1 İngilizce baskı s. 262–266).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz58-1'] = {
  no: 1, kok: 'Standart (25 mm/s) EKG kâğıdı ve normal aralıklar için:', kagit: 'Paper A · fizyoloji, Bölüm 58', kaynak: '[[K1 s. 262]]',
  onermeler: [
    { t: 'Bir küçük kare 40 ms, bir büyük kare 0,2 s\'ye karşılık gelir.', d: true, n: 'Doğru. 25 mm/s hızda 1 mm\'lik küçük kare 40 ms; beş küçük kareden oluşan büyük kare 0,2 s\'dir. [[K1 s. 262]]' },
    { t: 'Düzenli ritimde ardışık QRS kompleksleri arasında 4 büyük kare varsa kalp hızı 60 vuru/dk\'dır.', d: false, n: 'Yanlış. Hız 300 / 4 = 75 vuru/dk\'dır; 60 vuru/dk için 5 büyük kare gerekir. [[K1 s. 262]]' },
    { t: 'PR aralığı, P dalgasının başından R dalgasının tepesine kadar ölçülür.', d: false, n: 'Yanlış. Geleneksel olarak P\'nin başından Q dalgasının başına ölçülür; normali 0,12–0,2 s (3–5 küçük kare). [[K1 s. 262]]' },
    { t: 'Wolff–Parkinson–White sendromunun δ dalgası PR aralığını kısaltır.', d: true, n: 'Doğru. Birinci derece AV blok ise PR aralığını uzatır. [[K1 s. 262]]' },
    { t: 'Voltaj ayarında +1 mV, 5 mm\'lik pozitif sapmayla gösterilir.', d: false, n: 'Yanlış. +1 mV, 10 mm\'lik pozitif sapmadır. [[K1 s. 262]]' },
  ],
};
VERI.sorular['fiz58-2'] = {
  no: 2, kok: 'EKG dalgaları ve klinik karşılıkları için:', kagit: 'Paper A · fizyoloji, Bölüm 58', kaynak: '[[K1 s. 262–263]]',
  onermeler: [
    { t: 'Atriyal fibrilasyonda P dalgaları büyür ve çift tepeli olur.', d: false, n: 'Yanlış. AF\'de atriyal depolarizasyon eşgüdümsüzdür ve P dalgası yoktur; büyük, bazen çift tepeli P, mitral darlığındaki sol atriyum hipertrofisinde görülür. [[K1 s. 262]]' },
    { t: 'ST segmenti, kardiyak aksiyon potansiyelinin plato evresine karşılık gelir.', d: true, n: 'Doğru. QRS\'yi izleyen izoelektrik segmenttir; iskemide çöker, enfarktüste yükselir. [[K1 s. 262]]' },
    { t: 'Repolarizasyon depolarizasyondan hızlı olduğu için T dalgası QRS\'den dardır.', d: false, n: 'Yanlış. Repolarizasyon depolarizasyon kadar hızlı değildir; bu yüzden T dalgası QRS\'den geniştir. [[K1 s. 262]]' },
    { t: 'Süresi 40 ms\'yi (bir küçük kare) aşan Q dalgası patolojiktir.', d: true, n: 'Doğru. Ardından gelen R dalgasının %25\'inden büyük genlik de patolojiktir; nedenleri pulmoner emboli (S1Q3T3) ve eski miyokard enfarktüsüdür. [[K1 s. 262]]' },
    { t: 'QTc\'si 0,48 s olan hastada ventriküler taşiaritmi eğilimi artmıştır.', d: true, n: 'Doğru. Normal QTc < 0,44 s\'dir (11 küçük kare); uzamış QTc ventriküler taşiaritmilere yatkınlıkla ilişkilidir. [[K1 s. 263]]' },
  ],
};
VERI.sorular['fiz58-3'] = {
  no: 3, kok: 'EKG derivasyonları ve kardiyak aks için:', kagit: 'Paper A · fizyoloji, Bölüm 58', kaynak: '[[K1 s. 263–266]]',
  onermeler: [
    { t: 'Göğüs (prekordiyal) derivasyonları kalbe koronal düzlemde bakar.', d: false, n: 'Yanlış. Koronal düzlemde bakanlar ekstremite ve artırılmış ekstremite derivasyonlarıdır; göğüs derivasyonları kalbe kesitte bakar. [[K1 s. 263]]' },
    { t: 'DIII, sol kol ile sol bacak elektrotları arasındaki potansiyel farkını kaydeder.', d: true, n: 'Doğru. DI sağ kol–sol kol, DII sağ kol–sol bacak arasındaki farkı kaydeder. [[K1 s. 263]]' },
    { t: 'DII izoelektrikken aVL\'de QRS belirgin pozitifse kardiyak aks +150°\'dir.', d: false, n: 'Yanlış. DII\'ye dik iki aks −30° ve +150°\'dir; aVL (−30°) pozitifse aks −30°\'dir, normalin hemen içinde. [[K1 s. 265–266]]' },
    { t: 'Sağ ventrikül hipertrofisi sol aks sapmasına yol açabilir.', d: false, n: 'Yanlış. Sağ ventrikül hipertrofisi sağ aks sapması (> +90°) yapar; sol aks sapmasının (−30°\'den negatif) nedenleri sol ventrikül hipertrofisi ve gebelikte kalbin sola itilmesidir. [[K1 s. 265]]' },
    { t: 'Normal kardiyak aks −30° ile +90° arasındadır.', d: true, n: 'Doğru. Net depolarizasyon SA düğümden apekse çapraz indiği için tipik aks yaklaşık 45°\'dir. [[K1 s. 265]]' },
  ],
};

const D58_NAV = [
  ['d58-kagit', 'Kâğıt ve kalp hızı'], ['d58-dalga', 'Dalgalar ve aralıklar'], ['d58-qt', 'QT ve QTc'],
  ['d58-kaynak', 'Sinyal nasıl oluşur'], ['d58-deriv', 'Derivasyonlar'], ['d58-qrs', 'QRS biçimi'], ['d58-aks', 'Kardiyak aks'],
  ['d58-p1', 'Part I'], ['d58-p2', 'Part II'], ['d58-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/58'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Bölüm 58', baslik: 'Elektrokardiyogram',
  lede: 'EKG, kalpteki elektriksel etkinliğin vücut yüzeyine konan hücre dışı elektrotlarla kaydedilmiş toplamıdır. Bu ders hastalık tanısını değil, normal EKG\'nin elektriksel temelini anlatır. [[K1 s. 262]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D58_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d58-kagit">
  <h2>EKG kâğıdı ve kalp hızı</h2>
  <p class="intro">Kâğıttaki kareler hem zamanı hem voltajı ölçer; düzenli ritimde kalp hızı, 300'ün ardışık QRS kompleksleri arasındaki büyük kare sayısına bölünmesidir. [[K1 s. 262]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Büyük kare sayısından kalp hızına</h3></div>
    <div data-viz="f58_hiz"></div>
    <p class="viz-cap" aria-live="polite"><b>5 büyük kare.</b> R–R = 5 × 0,2 s = 1 s; hız 300 / 5 = 60 vuru/dk. R–R aralığını kaydırıcıyla değiştirin. [[K1 s. 262]]</p>
    <p class="viz-foot">Şematik DII kaydı. Kısayol yalnız düzenli ritimde ve standart (Birleşik Krallık) 25 mm/s kâğıt hızında geçerlidir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kâğıt 25 mm/s hızla akar: 1 mm'lik küçük kare 40 ms, beş küçük kareden oluşan büyük kare 0,2 s'dir. Voltaj ayarında +1 mV, 10 mm'lik pozitif sapma yazar. [[K1 s. 262]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d58-dalga">
  <h2>Normal EKG: dalgalar, aralıklar ve bozulmaları</h2>
  <p class="intro">DII'de kaydedilen normal EKG'nin her parçası kalpteki bir elektriksel olaydır ve normal süresi küçük karelerle sayılır. [[K1 s. 262–263]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>DII'de normal EKG: bir parçaya dokunun</h3></div>
    <div data-viz="f58_dalga"></div>
    <p class="viz-cap" aria-live="polite"><b>P dalgası.</b> Atriyal depolarizasyon; süresi &lt; 100 ms (&lt; 2,5 küçük kare). "Bozulma"yı seçince klinik örnek çizilir. [[K1 s. 262]]</p>
    <p class="viz-foot">Şematik çizim; normal süreler kitaptan, bozulma örneklerinin biçimi temsilîdir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Parça</th><th>Neyi gösterir · normal</th><th>Bozulma</th></tr></thead>
    <tbody>
      <tr><td><b>P dalgası</b></td><td>Atriyal depolarizasyon; <b>&lt; 100 ms (&lt; 2,5 kk)</b></td><td>Atriyal fibrilasyonda yok; mitral darlığında (sol atriyum hipertrofisi) büyük, bazen çift tepeli</td></tr>
      <tr><td><b>PR aralığı</b></td><td>AV düğüm gecikmesi; P'nin başından Q'nun (R'nin değil) başına; <b>0,12–0,2 s (3–5 kk)</b></td><td>Uzun: birinci derece AV blok; kısa: WPW sendromunun δ dalgası</td></tr>
      <tr><td><b>QRS</b></td><td>Ventrikül depolarizasyonu ve yayılımı; <b>&lt; 0,12 s (3 kk)</b></td><td>Geniş: sağ ya da sol dal bloğu. Patolojik Q (&gt; 40 ms ya da R'nin &gt; %25'i): pulmoner emboli (klasik S1Q3T3), eski miyokard enfarktüsü</td></tr>
      <tr><td><b>ST segmenti</b></td><td>QRS'den sonraki izoelektrik segment; aksiyon potansiyelinin platosu; <b>izoelektrik</b></td><td>İskemide çökme, enfarktüste yükselme</td></tr>
      <tr><td><b>T dalgası</b></td><td>Ventrikül repolarizasyonu; <b>QRS'den geniş</b></td><td>Ventrikül iskemisinde ters</td></tr>
      <tr><td><b>QT aralığı</b></td><td>Ventrikül depolarizasyonunun başından repolarizasyonun sonuna; <b>QTc &lt; 0,44 s (11 kk)</b></td><td>Uzun QTc: ventriküler taşiaritmi eğilimi</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">kk: küçük kare (40 ms). [[K1 s. 262–263]]</p>
  <div class="blk-body" style="margin-top:12px">
    <p>Atriyumların kas kütlesi ventriküllerinkinden az olduğu için P dalgası QRS'den küçüktür. Repolarizasyon depolarizasyon kadar hızlı olmadığından T dalgası QRS'den geniştir. [[K1 s. 262]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d58-qt">
  <h2>QT aralığı ve QTc</h2>
  <p class="intro">QT, kardiyak aksiyon potansiyelinin süresidir; aksiyon potansiyeli kalp hızı arttıkça kısaldığı için QT rutin olarak hıza göre düzeltilir (QTc). [[K1 s. 262–263]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Bazett formülü: hız değişince QT ve QTc</h3></div>
    <div data-viz="f58_qtc"></div>
    <p class="viz-cap" aria-live="polite"><b>60 vuru/dk.</b> R–R = 1 s, QT = 0,40 s → QTc = 0,40 / √1 = 0,40 s: normal (&lt; 0,44 s). Hızı ve QT'yi değiştirin. [[K1 s. 262–263]]</p>
    <p class="viz-foot">Model: QT'nin hızla kısalması temsilîdir; kitap yalnız formülü ve 0,44 s sınırını verir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>En yaygın düzeltme Bazett formülüdür: QTc = QT / √(R–R), R–R ardışık R dalgaları arasındaki süredir. Normal QTc &lt; 0,44 s, yani 11 küçük karedir; uzamış QTc ventriküler taşiaritmilere yatkınlık demektir. Aksiyon potansiyelinin kalp hızı arttıkça kısalması Bölüm 57'de anlatıldı. [[K1 s. 262–263]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d58-kaynak">
  <h2>EKG sinyali nasıl oluşur?</h2>
  <p class="intro">Miyositler eşgüdümlü olarak depolarize, sonra repolarize olurken kalbin çevresindeki elektrik alanı değişir; EKG bu değişimi deriden kaydeder. [[K1 s. 263]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Zar üzerinde ilerleyen dalga ve elektrodun gördüğü</h3></div>
    <div data-viz="f58_kaynak"></div>
    <p class="viz-cap" aria-live="polite"><b>Dinlenim.</b> Zarın dışı içine göre pozitiftir. "Oynat"a basın. [[K1 s. 263]]</p>
    <p class="viz-foot">Şematik; yük işaretleri, hücre sayıları ve voltajlar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Aksiyon potansiyelinde zarın dışı içine göre negatifleşir, ardından dinlenimdeki pozitifliğe döner (Bölüm 51, 52). Her kutup değişiminde yerel akımlar doğar ve hücre dışı sıvıdan deriye iletilir. Hücrenin dışındaki bir gözlemci zar boyunca önce bir depolarizasyon, sonra bir repolarizasyon dalgası geçtiğini görür; EKG'de bu gözlemci, deri yüzeyindeki küçük voltaj değişimlerini ölçen belirli noktalara konmuş "araştırıcı" elektrotlardır. [[K1 s. 263]]</p>
    <p>Tek miyositin oluşturduğu voltaj deriden ölçülemeyecek kadar küçüktür. Sinyal, çok sayıda miyosit aynı anda depolarize olduğu ve sinyalleri toplandığı için görülür; voltaj eşzamanlı depolarize olan hücre sayısıyla orantılıdır. QRS'nin P'den büyük olmasının nedeni budur. [[K1 s. 263]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d58-deriv">
  <h2>Derivasyon nedir?</h2>
  <p class="intro">Derivasyon, farklı vücut bölgelerindeki elektrot çiftleri arasındaki potansiyel farkıdır; her derivasyon kalbin elektriksel etkinliğine başka bir açıdan bakar. [[K1 s. 263]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>12 derivasyon: elektrot çiftleri ve bakış düzlemi</h3></div>
    <div data-viz="f58_deriv"></div>
    <p class="viz-cap" aria-live="polite"><b>DI.</b> Sağ kol ile sol kol elektrotları arasındaki fark; yönü 0°. Bir derivasyona dokunun. [[K1 s. 263, 265]]</p>
    <p class="viz-foot">Şematik; göğüs elektrotlarının yerleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Ekstremite derivasyonları</b> sağ kol, sol kol ve sol bacak elektrotlarını kullanır: DI sağ kol–sol kol, DII sağ kol–sol bacak, DIII sol kol–sol bacak farkıdır. <b>Artırılmış ekstremite derivasyonları</b> (aVR, aVL, aVF) aynı üç elektrottan türetilir ve ek açılar sunar; örneğin aVF, sol bacak elektrodu ile iki kol elektrodunun ortalaması arasındaki farktır. [[K1 s. 263]]</p>
    <p>Altı <b>göğüs (prekordiyal) derivasyonu</b> (V1–V6), göğüs elektrodu ile üç ekstremite elektrodunun ortalaması arasındaki farkı ölçer. Ekstremite ve artırılmış derivasyonlar kalbe koronal düzlemde, göğüs derivasyonları kesitte bakar; bu iki bakış 12 derivasyonlu EKG'yi bir tanı aracı yapar. [[K1 s. 263]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d58-qrs">
  <h2>QRS kompleksinin biçimi</h2>
  <p class="intro">Net akım elektroda doğru akarsa pozitif, elektrottan uzaklaşırsa negatif sapma yazılır; Q, R ve S, ventrikül depolarizasyon dalgasının yön değiştirmesidir. [[K1 s. 264]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>DII'de ventrikül depolarizasyonu, adım adım</h3></div>
    <div data-viz="f58_qrs"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Septum.</b> Septum soldan sağa depolarize olur; net akım DII elektrodundan uzaklaşır: küçük negatif Q dalgası. "İleri"ye basın. [[K1 s. 264–265]]</p>
    <p class="viz-foot">Şematik; atriyal depolarizasyon gösterilmez, genlikler temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Depolarizasyon dalgası SA düğümden başlar ve atriyumlardan AV düğüme yayılır. Septumda dalga apekse ilerlerken miyositler soldan sağa depolarize olur; en son dalga apeksten ventrikül tabanlarına yayılır. Elektrot (burada DII) bu yolculuk boyunca potansiyel değişimini ölçer; sonuç DII'de küçük bir Q, büyük bir R ve küçük bir S'dir. [[K1 s. 264]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d58-aks">
  <h2>Kardiyak aks</h2>
  <p class="intro">Kardiyak aks, depolarizasyon dalgasının net yönüdür (vektörüdür); kalbe koronal düzlemde bakan altı ekstremite ve artırılmış derivasyonla belirlenir. [[K1 s. 264–265]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Aksı çevirin: altı derivasyonda QRS</h3></div>
    <div data-viz="f58_aks"></div>
    <p class="viz-cap" aria-live="polite"><b>+45°: normal aks</b> (−30° ile +90° arası). Oku sürükleyin ya da bir örnek seçin. [[K1 s. 265]]</p>
    <p class="viz-foot">Model: her derivasyondaki net QRS, aks vektörünün o derivasyon yönüne izdüşümü olarak çizilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Ventrikül kütlesi büyük olduğundan net depolarizasyon normalde SA düğümden apekse çapraz iner; tipik aks yaklaşık 45°'dir. −30°'den daha negatif aks <b>sol aks sapmasıdır</b>: sol ventrikül hipertrofisi ya da gebelikte kalbin sola itilmesi. +90°'den büyük aks <b>sağ aks sapmasıdır</b>: sağ ventrikül hipertrofisi. [[K1 s. 264–265]]</p>
    <p>Aks DI, DII, DIII, aVF ve aVL'nin QRS'lerinden kestirilir: QRS'si eşit pozitif ve negatif sapmalı <b>izoelektrik derivasyonu</b> bulun; aks ona diktir. Örneğin DII (+60°) izoelektrikse aks −30° ya da +150°'dir. aVL (−30°) belirgin pozitifse aks −30°'dir, normalin hemen içinde; belirgin negatifse +150°'dir ve kitap bunu aşırı sağ aks sapması diye adlandırır. [[K1 s. 265–266]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitabın aks şeklinde +90° derivasyonu "aVL", metninde aVF "−30°" diye yazılmıştır; doğrusu aVF +90°, aVL −30°'dir. Kitabın örneği de aVL'ye göre işler.</div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Çoğu sınıflamada +150° sağ aks sapmasıdır; "aşırı aks sapması" adı −90° ile ±180° arasındaki akslar için kullanılır.</div>
</section>

<section class="wrap blk ders-sec" id="d58-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: kâğıt ayarı ve hız hesabı, dalgaların karşılığı ve normal süreleri (P, PR, QRS, QTc), patolojik Q, ST ve T değişiklikleri, Bazett formülü, derivasyonların elektrot çiftleri ve düzlemleri, normal aks ve aks sapmalarının nedenleri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz58-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz58-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz58-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d58-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"DII'de normal bir EKG çizin ve her parçasını açıklayın. Kalpteki elektriksel etkinlik deride nasıl sinyal oluşturur ve kardiyak aksı nasıl bulursunuz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım ve kâğıt.</b> Kalbin elektriksel etkinliğinin yüzey elektrotlarıyla kaydedilen toplamı; 25 mm/s'de küçük kare 40 ms, büyük kare 0,2 s, 1 mV = 10 mm; hız = 300 / büyük kare. [[K1 s. 262]]</li>
    <li><b>Dalgalar.</b> P &lt; 100 ms; PR 0,12–0,2 s (AV düğüm gecikmesi); QRS &lt; 0,12 s; ST izoelektrik, plato; T repolarizasyon, QRS'den geniş; QTc &lt; 0,44 s. Her birinin bozulmasına bir örnek verin. [[K1 s. 262–263]]</li>
    <li><b>QTc.</b> QT aksiyon potansiyelinin süresidir, hızla kısalır; Bazett: QT / √(R–R). Uzun QTc ventriküler taşiaritmi eğilimi. [[K1 s. 262–263]]</li>
    <li><b>Sinyalin kaynağı.</b> Zarın kutup değişimi → yerel akımlar → hücre dışı sıvıdan deriye; araştırıcı elektrotlar; çok sayıda hücrenin eşzamanlı sinyali toplanır, genlik hücre sayısıyla orantılı (QRS &gt; P). [[K1 s. 263]]</li>
    <li><b>Derivasyonlar.</b> DI, DII, DIII ve aVR, aVL, aVF koronal düzlemde; V1–V6 göğüs elektrodu ile üç ekstremite elektrodunun ortalaması arasında, kesitte. [[K1 s. 263]]</li>
    <li><b>QRS biçimi.</b> Septum soldan sağa → Q; ventrikül kütlesi elektroda doğru → R; tabanlara doğru → sıfıra dönüş; sol ventrikül tabanı → S. [[K1 s. 264]]</li>
    <li><b>Aks.</b> Normal −30° ile +90°; sol aks sapması: SVH, gebelik; sağ aks sapması: SağVH. İzoelektrik derivasyona dik; örnek DII izoelektrik → −30° ya da +150°, aVL ile karar. [[K1 s. 265–266]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Kareli zemin üzerine bir DII kompleksi çizip P, PR, QRS, ST, T ve QT'yi süreleriyle işaretleyin. Yanına altı ekstremite derivasyonunun açılarını gösteren altılı eksen çemberini ekleyin (DI 0°, DII +60°, DIII +120°, aVF +90°, aVL −30°, aVR −150°) ve normal aks aralığını taralayın. [[K1 s. 262–265]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> QRS neden P'den büyük, T neden QRS'den geniş? PR neden Q'nun başına ölçülür? Q dalgası nasıl oluşur, ne zaman patolojiktir? QT neden düzeltilir? Göğüs derivasyonlarının referansı nedir? İzoelektrik derivasyondan aks nasıl bulunur? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 262–266]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d58-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>EKG kâğıdı (25 mm/s): küçük kare 40 ms, büyük kare 0,2 s, 1 mV = 10 mm; düzenli ritimde hız = 300 / büyük kare sayısı. [[K1 s. 262]]</li>
    <li>P atriyal, QRS ventrikül depolarizasyonu, T ventrikül repolarizasyonu; PR AV düğüm gecikmesi, ST plato evresi. [[K1 s. 262]]</li>
    <li>Normal sınırlar: P &lt; 100 ms, PR 0,12–0,2 s, QRS &lt; 0,12 s, QTc &lt; 0,44 s; patolojik Q &gt; 40 ms ya da R'nin &gt; %25'i. [[K1 s. 262–263]]</li>
    <li>QTc = QT / √(R–R) (Bazett); uzun QTc ventriküler taşiaritmiye yatkınlık yaratır. [[K1 s. 262–263]]</li>
    <li>Deri sinyali, çok sayıda miyositin eşzamanlı kutup değişiminin toplamıdır; genlik eşzamanlı hücre sayısıyla artar. [[K1 s. 263]]</li>
    <li>Altı ekstremite ve artırılmış derivasyon koronal düzlemde, altı göğüs derivasyonu kesitte bakar. [[K1 s. 263]]</li>
    <li>Elektroda doğru net akım pozitif sapma yazar: septum Q'yu, ventrikül kütlesi R'yi, sol ventrikül tabanı S'yi oluşturur. [[K1 s. 264]]</li>
    <li>Normal aks −30° ile +90°; aks izoelektrik derivasyona diktir. [[K1 s. 265]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="58"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/57">← Bölüm 57 · Kalp kası</a>
    <a href="#/dersler/fizyoloji/59">Sonraki: Bölüm 59 · Otonom sinir sistemi →</a>
  </nav>
</section>`,
};
