VERI.sorular = VERI.sorular || {};
VERI.sorular['fk11a-1'] = {
  no: 1, kok: 'Solunum devresinden örnekleme', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 195–197]]',
  onermeler: [
    { t: 'Ana akımda örnek gaz ince bir hatla monitöre taşınır.', d: false, n: 'Ana akım dedektörü gazı devrede ölçer ve monitöre kabloyla veri iletir. [[K6 s. 195]]' },
    { t: 'Yan akım modülü, oksijen analizörünü kızılötesi analizörle seri bağlamaya elverişlidir.', d: true, n: 'Modülün devreden uzakta olması iki analizör için yer sağlar. [[K6 s. 196]]' },
    { t: 'Yan akımda su tutucu, gaz ölçüm modülünden çıktıktan sonra yer alır.', d: false, n: 'Su tutucu modülün hemen önündedir ve yoğuşma suyunun analizöre girmesini önler. [[K6 s. 196]]' },
    { t: 'Örnek hattında gazların karışması ölçümün kesinliğini azaltabilir.', d: true, n: 'Örnek hattında gazlar karışabilir ve bu, daha az kesin veriye yol açar. [[K6 s. 196–197]]' },
    { t: 'Ana akım adaptörünün eklediği ölü boşluk çocuklarda da klinik açıdan önemsizdir.', d: false, n: 'Küçük ölü boşluk artışı çocuklarda veya akciğer hacimleri azalmış hastalarda önem taşıyabilir. [[K6 s. 196]]' },
  ],
};
VERI.sorular['fk11a-2'] = {
  no: 2, kok: 'Kızılötesi gaz analizörü', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 197–198]]',
  onermeler: [
    { t: 'Karbondioksitin seçici soğurma tepesi 4,28 µm’dedir.', d: true, n: 'Bu dalga boyunda CO₂ soğurması ölçülebilecek kadar belirgindir. [[K6 s. 197]]' },
    { t: 'Örnek penceresinde cam kullanılmasının nedeni kızılötesini geçirmesidir.', d: false, n: 'Cam kızılötesini soğurur, bu yüzden pencere için safir gibi geçirgen bir malzeme gerekir. [[K6 s. 198]]' },
    { t: 'Çarpışma genişlemesi tepenin dalga boyunu da değiştirebilir.', d: true, n: 'Karışımdaki moleküllerin etkileşimi tepeyi genişletir ve konumunu kaydırabilir. [[K6 s. 197]]' },
    { t: 'Fotodedektör hazneden geçen ışınımın şiddetini ölçer.', d: true, n: 'Örnek gazın soğurmasından sonra kalan ışınım dedektöre ulaşır. [[K6 s. 198]]' },
    { t: 'Hava içeren paralel haznenin temel görevi örnek hattındaki suyu toplamaktır.', d: false, n: 'Paralel hazne ışık kaynağının şiddetindeki değişimleri telafi etmeye yarar. [[K6 s. 198]]' },
  ],
};
VERI.sorular['fk11a-3'] = {
  no: 3, kok: 'Kapnogramın okunması', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 198–199]]',
  onermeler: [
    { t: 'EtCO₂, ekspiratuvar plato boyunca ölçülen derişimlerin ortalamasıdır.', d: false, n: 'Monitör eğrinin en yüksek değerini EtCO₂ olarak alır. [[K6 s. 199]]' },
    { t: 'Ekspiratuvar yükselişin S biçimini almasında örnek haznesindeki karışma etkilidir.', d: true, n: 'Haznedeki karışma, yükselme süresine en büyük katkıyı yapar. [[K6 s. 199]]' },
    { t: 'D–E taban çizgisi inspirasyonun sonuna kadar sürer.', d: true, n: 'C–D düşüşünü inspirasyonun geri kalanındaki düz taban izler. [[K6 s. 199]]' },
    { t: 'CO₂ kısmi basıncı kPa olarak gösterilebilir.', d: true, n: 'Kısmi basınç gösteriminde mmHg veya kPa seçilebilir. [[K6 s. 199]]' },
    { t: 'Trend görünümü birkaç saatlik veriyi kapsayabilir.', d: true, n: 'Tek soluk kısa zaman ölçeğinde, eğilim ise dakikalar veya saatler boyunca izlenir. [[K6 s. 199]]' },
  ],
};

const FK11A_NAV = [
  ['ornek', 'Örnekleme'], ['beer', 'Beer yasası'], ['optik', 'Optik düzenek'],
  ['kapno', 'Kapnogram'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/fizik/11a'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 11 · Ders 11a',
  baslik: 'Solunum gazı izlemi, kızılötesi spektroskopi ve kapnografi',
  lede: 'Bir solukta CO₂ derişimi ekspirasyonun sonuna doğru en yüksek düzeye çıkar, inspirasyonda ise sıfırın hemen üzerine iner. [[K6 s. 195]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK11A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="fk11a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk11a-ornek">
  <h2>Gaz nerede ölçülür?</h2>
  <p class="intro">Anestezi odasında ve ameliyathanede hangi gazın bulunduğunu ve derişimini hızla bilmek gerekir. [[K6 s. 195]] Ağız veya burundaki derişim tek soluk içinde hızla değiştiği için monitörün yanıtı da hızlı olmalıdır. [[K6 s. 195]]</p>
  <div class="viz"><div class="viz-head"><h3>Devreden monitöre giden yolu seçin</h3></div><div data-viz="fk11a_yol"></div><p class="viz-cap" aria-live="polite">Ana akımda monitöre giden kablo ölçüm verisini taşır. [[K6 s. 195]] Yan akımda devreden ayrılan ince hat, ölçülecek gazı taşır. [[K6 s. 196]]</p></div>
  <p>Modern monitörler O₂ ve CO₂ yanında azot protoksit (N₂O) ve uçucu anestezikleri de ölçebilir. [[K6 s. 195]] Genellikle iki algılama modülü vardır. [[K6 s. 195]] Oksijen modülü oksijenin paramanyetik özelliğinden, diğer modül kızılötesi soğurmadan yararlanır. [[K6 s. 195]]</p>
  <div class="viz"><div class="viz-head"><h3>Dedektörü ve örnek hattını bulun</h3></div><div data-viz="fk11a_ornekcihaz"></div><p class="viz-cap" aria-live="polite">Ana akımda adaptöre takılan dedektörü, yan akımda ise örnek hattının modüle girişinden hemen önceki su tutucuyu bulun. [[K6 s. 195–196]]</p></div>
  <div class="fk11a-kartlar">
    <div class="card"><h3>Ana akım</h3><ul>
      <li>Dedektör, devre borusunun özel bir parçasına klipsle oturur. [[K6 s. 195]] Veri kablosu ölçümü monitöre iletir. [[K6 s. 195]]</li>
      <li>Gazın ölçüm yerine taşınması gerekmediğinden derişim değişikliği ilke olarak anında izlenebilir. [[K6 s. 195]]</li>
      <li>Eski sensörler iri, ağır ve kolay hasarlanabilen parçalardı, uzun kullanımda ısınırlardı. [[K6 s. 195–196]] Yeni tasarımlarda bu sorunlar azalmıştır. [[K6 s. 196]]</li>
      <li>Ek parça ölü boşluğu biraz artırır. [[K6 s. 196]] Bunun klinik önemi özellikle çocuklarda ve akciğer hacmi azalmış hastalardadır. [[K6 s. 196]] Sensör boyutu sınırlı olduğundan genellikle oksijen izlenemez. [[K6 s. 196]]</li>
    </ul></div>
    <div class="card"><h3>Yan akım</h3><ul>
      <li>İnce örnek hattı devreyi monitördeki ölçüm modülüne bağlar. [[K6 s. 196]] Modül ucundaki küçük fan hafif negatif basınç oluşturur ve genellikle 150–200 mL·dk<sup>−1</sup> sabit akımla gaz çeker. [[K6 s. 196]]</li>
      <li>Modülden hemen önceki su tutucu yoğuşan suyu analizörden uzak tutar. [[K6 s. 196]]</li>
      <li>Solunum borusunda iri bir sensör bulunmaz. [[K6 s. 196]] Modülde kızılötesi analizörle seri bağlı bir oksijen analizörüne yer açılabilir. [[K6 s. 196]]</li>
      <li>Hattaki gazlar karışınca ölçümün kesinliği azalabilir. [[K6 s. 196–197]] Hat tıkanabilir ve örneğin taşınması ekrandaki değeri birkaç saniye geciktirir. [[K6 s. 197]]</li>
    </ul></div>
  </div>
  <p>Kitap, inspirasyonda görülen en düşük derişimi atmosferdeki yaklaşık %0,1 CO₂ ile açıklar. [[K6 s. 195]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap atmosferik CO₂ için yaklaşık %0,1 verir. [[K6 s. 195]] Tipik dış ortam düzeyi yaklaşık %0,04’tür ve ortama göre değişir.</div>
</section>

<section class="wrap blk ders-sec" id="fk11a-beer">
  <h2>Beer yasası ve dalga boyu seçimi</h2>
  <p class="intro">Hava görünür ışığı kolayca geçirir, ancak bazı gazlar elektromanyetik ışınımı belirli dalga boylarında ölçülebilecek kadar güçlü soğurur. [[K6 s. 197]] Gazın hangi dalga boylarını soğuracağını molekül yapısı belirler. [[K6 s. 197]]</p>
  <div class="viz"><div class="viz-head"><h3>CO₂ derişimini değiştirin</h3></div><div data-viz="fk11a_beer"></div><p class="viz-cap" aria-live="polite">Bir dalga boyunda ve aynı ölçüm koşullarında gazın derişimi hangi oranda değişirse absorbans da o oranda değişir. [[K6 s. 197]]</p><p class="viz-foot">Absorbans ekseni göreli ölçektedir. [[K6 s. 197]]</p></div>
  <p>Beer yasası sıvılarda olduğu gibi gazlarda da geçerlidir. [[K6 s. 197]] Sabit ölçüm koşullarında <i>A</i> ∝ <i>c</i> bağıntısında <i>A</i> absorbansı (birimsiz), <i>c</i> gazın derişimini (burada hacim yüzdesi) gösterir. [[K6 s. 197–198]] Kitap CO₂ yüzdesini şöyle hesaplar: CO₂ yüzdesi = (<i>P</i><sub>CO₂</sub> / <i>P</i><sub>atm</sub>) × %100; <i>P</i><sub>CO₂</sub> CO₂ kısmi basıncı, <i>P</i><sub>atm</sub> atmosfer basıncıdır (ikisi aynı birimde, ör. kPa). [[K6 s. 197]]</p>
  <ul class="ozet">
    <li><b>Soğuran gazlar.</b> Çok atomlu CO₂, N₂O ve su buharı kızılötesi ışınımı soğurur. [[K6 s. 197]] CO₂’nin seçici soğurma tepesi 4,28 µm’dedir. [[K6 s. 197]]</li>
    <li><b>Soğurmayan örnekler.</b> Tek atomlar ve genel olarak O₂, N₂ ve helyum gibi elementel gazlar kızılötesini soğurmaz. [[K6 s. 197]]</li>
  </ul>
  <div class="viz"><div class="viz-head"><h3>Karışım soğurma tepesini nasıl değiştirir?</h3></div><div data-viz="fk11a_tepe"></div><p class="viz-cap" aria-live="polite">CO₂ tepesini seçin, sonra karışıma geçerek tepenin genişliğini ve konumunu karşılaştırın. [[K6 s. 197–198]]</p><p class="viz-foot">Tepe biçimi şematiktir. Kaymanın yönü ve büyüklüğü için sayısal ölçek verilmemiştir. [[K6 s. 197–198]]</p></div>
  <p>Karışımdaki moleküllerin birbirini etkilemesi soğurma tepesini yayvanlaştırır. [[K6 s. 197]] <b>Çarpışma genişlemesi</b> denen bu etki, tepenin görüldüğü dalga boyunu da kaydırabilir. [[K6 s. 197]] CO₂ ve N₂O birbirlerinin soğurma dalga boyunu etkileyebilir. [[K6 s. 197–198]] Ekspire edilen gazda N₂O bulunduğu biliniyorsa analizör ekspirasyon sonu CO₂’yi (EtCO₂) hesaplarken bu etkiyi dikkate almalıdır. [[K6 s. 198]]</p>
</section>

<section class="wrap blk ders-sec" id="fk11a-optik">
  <h2>Kaynak telinden fotodedektöre</h2>
  <p class="intro">Analizör, hedef gazın soğurduğu dalga boyunu seçer ve örnek gazı geçtikten sonra ışınımın şiddetini ölçer. [[K6 s. 198]]</p>
  <div class="viz"><div class="viz-head"><h3>Işığın yolunu parçalar üzerinde izleyin</h3></div><div data-viz="fk11a_optik"></div><p class="viz-cap" aria-live="polite">İlk noktada kızılötesi ışınım üretilir, son noktada örneğin içinden geçebilen ışınımın şiddeti ölçülür. [[K6 s. 198]]</p></div>
  <ol class="iskelet">
    <li>Isıtılan tel kızılötesi ışınım üretir. [[K6 s. 198]] Filtre, hedef gazın soğurduğu tek bir dalga boyunu geçirir. [[K6 s. 198]]</li>
    <li>Işınım safir gibi geçirgen bir pencereden örnek haznesine girer. [[K6 s. 198]] Cam kızılötesini soğuracağı için pencere malzemesi olarak kullanılamaz. [[K6 s. 198]]</li>
    <li>Çıkış penceresinin ötesindeki fotodedektör, örneği geçen ışınımın şiddetini ölçer. [[K6 s. 198]]</li>
  </ol>
  <div class="note plain"><b>Referans haznesi.</b> Bazı sistemlerde örnek haznesine paralel ikinci bir hazne bulunur. [[K6 s. 198]] Bu haznedeki havanın CO₂ içermediği varsayılır ve referans sinyaliyle kaynağın şiddetindeki değişimler telafi edilir. [[K6 s. 198]]</div>
</section>

<section class="wrap blk ders-sec" id="fk11a-kapno">
  <h2>Bir soluğu kapnogramda okumak</h2>
  <p class="intro">Kapnometre ekshale edilen CO₂’nin derişimini ölçer. [[K6 s. 198]] Çoğu cihaz her solukta derişimi zamana karşı çizer. [[K6 s. 198]] Bu eğriye kapnogram, eğriyi gösteren cihaza da sıklıkla kapnograf denir. [[K6 s. 198]]</p>
  <div class="viz"><div class="viz-head"><h3>EtCO₂’yi ve solunum evrelerini bulun</h3></div><div data-viz="fk11a_kapno"></div><p class="viz-cap" aria-live="polite">C noktasında ekspirasyon sonu derişimini bulun. [[K6 s. 199]] C’nin solundaki yükseliş ve plato ekspirasyona, sağındaki düşüş ve taban inspirasyona aittir. [[K6 s. 199]]</p><p class="viz-foot">Bir soluğun şematik zaman çizimi. [[K6 s. 199]]</p></div>
  <ol class="iskelet">
    <li><b>A–B · Ekspiratuvar yükseliş.</b> Ekspirasyon başlarken CO₂ artar. [[K6 s. 199]] Başlıca örnek haznesindeki karışmanın yol açtığı kısa gecikme, yükselişe S biçimini verir. [[K6 s. 199]] Buna yükselme süresi denir. [[K6 s. 199]]</li>
    <li><b>B–C · Ekspiratuvar plato.</b> Kitap hafif yukarı eğimi, ekspirasyonda CO₂’nin alveol zarından difüzyonunun sürmesiyle açıklar. [[K6 s. 199]]</li>
    <li><b>C · Ekspirasyon sonu.</b> Monitör en yüksek değeri EtCO₂ olarak otomatik belirler ve genellikle her solukta günceller. [[K6 s. 198–199]]</li>
    <li><b>C–D ve D–E · İnspirasyon.</b> CO₂ hızla düşer, ardından taban çizgisi inspirasyonun sonuna kadar düz kalır. [[K6 s. 199]]</li>
  </ol>
  <div class="note plain"><b>Atlas notu.</b> Kitap plato eğimini alveol zarından süren difüzyonla açıklar. [[K6 s. 199]] Doğrusu, eğime başlıca farklı ventilasyon/perfüzyon oranlı alveollerin ardışık boşalması yol açar; ekspirasyonda süren CO₂ atılımı da katkı yapar.</div>
  <div class="fk11a-kartlar"><div class="card"><h3>Gösterim birimi</h3><p>Monitörde CO₂ hacim oranı 0,05 ise hacim yüzdesi 0,05 × 100 = %5 olur. [[K6 s. 198]] Kullanıcı ekshale edilen gazdaki CO₂ kısmi basıncını mmHg veya kPa olarak da seçebilir. [[K6 s. 199]]</p></div>
  <div class="card"><h3>Zaman ölçeği</h3><p>Kısa zaman ölçeğinde tek tek solukların biçimi okunur. [[K6 s. 199]] Dakikalar, hatta saatler boyunca toplanan veriler ise eğilimi izlemeye yarar. [[K6 s. 199]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="fk11a-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önermeyi bağımsız değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="fk11a-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk11a-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk11a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk11a-p2"><h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Yan akımla CO₂ izliyorsunuz. Ekspirasyon başladıktan sonra ekrandaki eğri neden gecikiyor? Örneği devreden dedektöre kadar izleyerek açıklayın.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Fan gazı ince hattan sabit akımla çeker, su tutucu modül girişini korur. [[K6 s. 196]] Hattın taşıma gecikmesi birkaç saniyedir. [[K6 s. 197]]</li>
    <li>Filtrelenmiş ışınım örnekten geçer ve fotodedektör kalan şiddeti ölçer. [[K6 s. 198]] CO₂’nin soğurma tepesi 4,28 µm’dedir. [[K6 s. 197]]</li>
    <li>Yükselme süresine başlıca örnek haznesindeki karışma yol açar. [[K6 s. 199]] Ekspiratuvar yükseliş S biçimindedir, EtCO₂ platonun sonundaki maksimumdur. [[K6 s. 199]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Bir soluğun CO₂–zaman eğrisini çizin. A–B yükselişini, B–C platosunu, C’de EtCO₂’yi, C–D düşüşünü ve D–E tabanını işaretleyin. [[K6 s. 199]]</div>
  <div class="note plain"><b>Ek sorular.</b> N₂O varlığı hesabı neden etkiler? [[K6 s. 197–198]] Kaynak şiddetindeki değişim nasıl telafi edilebilir? [[K6 s. 198]] Çocukta ana akım adaptörünün hangi özelliği önemlidir? [[K6 s. 196]]</div></div>
</section>
<section class="wrap blk ders-sec" id="fk11a-ozet"><h2>Özet</h2><ul class="ozet">
  <li>Ana akımda ölçüm devrede yapılır. [[K6 s. 195]] Yan akımda örnek gaz modüle taşınır ve değer birkaç saniye gecikir. [[K6 s. 196–197]]</li>
  <li>Gaz derişimi absorbansla doğru orantılıdır. [[K6 s. 197]] N₂O varlığında EtCO₂ hesabı moleküller arası etkileşimi hesaba katmalıdır. [[K6 s. 197–198]]</li>
  <li>Kapnogramda ekspiratuvar yükselişi hafif eğimli plato izler, inspirasyonla derişim tabana döner. [[K6 s. 199]]</li>
  </ul><div data-viz="tamam" data-modul="fizik" data-bolum="11a"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/10">← Difüzyon, ozmoz ve çözünürlük</a><a href="#/dersler/fizik/11b">Sonraki: Paramanyetik oksijen analizörü, elektrokimyasal hücreler ve kan gazı elektrotları →</a></nav>
</section>`,
};
