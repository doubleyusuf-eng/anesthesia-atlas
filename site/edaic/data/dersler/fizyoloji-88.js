VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz88-1'] = {
  no: 1, kok: 'Yüzün soğuk suyla teması ve baş dışarıda suya girme', kagit: 'Paper A · Fizyoloji', kaynak: '[[K1 s. 434]]',
  onermeler: [
    { t: 'Dalış refleksinde atriyoventriküler iletim hızlanır.', d: false, n: 'Vagal yanıt AV düğümden iletimi yavaşlatır. [[K1 s. 434]]' },
    { t: 'İnsanda dalış refleksiyle kalp hızı yaklaşık %10–25 azalır.', d: true, n: 'Bazı deniz memelilerinde aynı yanıt %90’a varan bir düşüştür. [[K1 s. 434]]' },
    { t: 'Baş dışarıdayken suyun basıncı bacaklarda venöz göllenmeyi artırır.', d: false, n: 'Dış basınç yerçekiminin etkisine karşı koyarak göllenmeyi önler. [[K1 s. 434]]' },
    { t: 'Çocuğun vücut ağırlığına göre geniş yüzey alanı buzlu suda daha hızlı soğumasına yol açar.', d: true, n: 'Daha hızlı soğuma beynin metabolizma hızını düşürerek iskemiye karşı koruma sağlar. [[K1 s. 434]]' },
    { t: 'Suya girince kalp boşluklarının gerilmesi diürezi azaltır.', d: false, n: 'Atriyum ve ventrikül duvarlarının gerilmesi diüreze yol açan natriüretik peptitlerin salınmasını sağlar. [[K1 s. 434]]' },
  ],
};
VERI.sorular['fiz88-2'] = {
  no: 2, kok: 'Nefes tutarak dalış ve ortam basıncında gaz soluma', kagit: 'Paper A · Fizyoloji', kaynak: '[[K1 s. 434–435]]',
  onermeler: [
    { t: 'Deniz suyunda her 10 m iniş ortam basıncına 100 kPa ekler.', d: true, n: 'Su altında basınç metre deniz suyu (msw) ile ifade edilir; her 10 m iniş yaklaşık 100 kPa ekler. [[K1 s. 434]]' },
    { t: 'Nefes tutarak dalışta derinlere indikçe akciğerdeki hava genişler.', d: false, n: 'Boyle yasası uyarınca artan ortam basıncı akciğerdeki havanın hacmini küçültür. [[K1 s. 434–435]]' },
    { t: 'Nefesini tutan dalgıcın yüzeye döndüğündeki akciğer hacmi başlangıçtan biraz küçüktür.', d: true, n: 'Dalış boyunca tüketilen O₂, üretilen CO₂’yi biraz aşar. [[K1 s. 435]]' },
    { t: 'SCUBA talep valfi dalgıca yüzey basıncında hava verir.', d: false, n: 'Valf tüpteki sıkıştırılmış havayı dalgıcın bulunduğu derinliğin ortam basıncında verir. [[K1 s. 435]]' },
    { t: 'Gaz yoğunluğu arttıkça özellikle inspirasyonda türbülans artar.', d: true, n: 'Yoğun gazın türbülanslı akışı solunum işini artırır. [[K1 s. 435]]' },
  ],
};
VERI.sorular['fiz88-3'] = {
  no: 3, kok: 'Gazların parsiyel basınçları ve dekompresyon', kagit: 'Paper A · Fizyoloji', kaynak: '[[K1 s. 435]]',
  onermeler: [
    { t: 'Çok yüksek azot basıncında konsantrasyon kaybı gelişebilir.', d: true, n: 'Azotun merkezi sinir sistemine doğrudan etkisi öforiden komaya uzanabilir. [[K1 s. 435]]' },
    { t: 'Yüksek O₂ parsiyel basıncında nöbet görülebilir.', d: true, n: 'Nöbet ve bilinç kaybı, O₂ toksisitesinin su altında ağır sonuçlar doğurabilen etkileridir. [[K1 s. 435]]' },
    { t: 'İnspire edilen azotun parsiyel basıncı yükselince kanda çözünen azot azalır.', d: false, n: 'Henry yasasına göre çözünmüş azot miktarı gazın parsiyel basıncıyla doğru orantılıdır. [[K1 s. 435]]' },
    { t: 'Pulmoner dolaşımda azot kabarcıkları retrosternal ağrıya neden olabilir.', d: true, n: 'Akciğer dolaşımındaki kabarcıklar dispneye ve sternum arkasında ağrıya yol açar. [[K1 s. 435]]' },
    { t: 'Hiperbarik rekompresyon azot kabarcıklarının yeniden çözünmesini sağlar.', d: true, n: 'Kabarcıklar basınç altında yeniden çözündükten sonra dekompresyon yavaş ve kontrollü yapılır. [[K1 s. 435]]' },
  ],
};

const D88_NAV = [
  ['refleks', 'Dalış refleksi'], ['su', 'Baş dışarıda'], ['nefes', 'Nefes tutarak dalış'],
  ['scuba', 'SCUBA'], ['azot', 'Dekompresyon'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/88'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 11 · Bölüm 88', baslik: 'Dalış',
  lede: 'Yüzün buz gibi suya değmesi kalbi yavaşlatır. [[K1 s. 434]] Derine inip yüzeye dönerken akciğerde ne olacağı ise dalgıcın nefesini tutmasına ya da tüpten hava solumasına bağlıdır. [[K1 s. 434–435]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D88_NAV.map(([id, ad], i) => `<button type="button" data-scroll="d88-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d88-refleks">
  <h2>Yüz soğuk suya değdiğinde</h2>
  <p class="intro">Yüzde trigeminal sinirin duyu aldığı bölgelerin buz gibi suyla teması, su altında daha uzun kalmayı sağlayan dalış refleksini başlatır. [[K1 s. 434]]</p>
  <div class="viz"><div class="viz-head"><h3>Tek uyaran, üç yanıt</h3></div><div data-viz="f88_refleks"></div><p class="viz-cap" aria-live="polite">Solunum sıklıkla ani bir solukla durur ve bu apne akciğerlerin suyla dolmasını önler. [[K1 s. 434]]</p><p class="viz-foot">Şematik/nitel gösterim. [[K1 s. 434]]</p></div>
  <ul class="ozet">
    <li><b>Kalp hızı.</b> İnsanda düşüş yaklaşık %10–25 iken bazı deniz memelilerinde %90’a varır. [[K1 s. 434]]</li>
    <li><b>Klinikte vagal etki.</b> Sinoatriyal düğümün daha seyrek uyarı üretmesine AV düğümde iletimin yavaşlaması eşlik eder. [[K1 s. 434]] Bu nedenle yüzün buzlu suya daldırılması supraventriküler taşikardiyi sonlandırabilir. [[K1 s. 434]]</li>
    <li><b>Yaşa göre yanıt.</b> Su yaşamından kalan bu ilkel refleks insanda en güçlü biçimde yenidoğan ve süt çocuğunda görülür. [[K1 s. 434]]</li>
  </ul>
  <p>Dekompresyon hastasına anestezi verme gereği daha çok kıyı bölgelerinde çalışan az sayıdaki anestezistin karşısına çıkar. [[K1 s. 434]] Dalış refleksi ise klinikte önem taşır, inişin fiziği ve fizyolojisi de uzmanlık sınavlarında sıklıkla sorulur. [[K1 s. 434]]</p>
  <p>Buz tutmuş bir göle düşüp 20–30 dakika buzlu suda kaldıktan sonra sağ kalanlar olmuştur. [[K1 s. 434]] Şiddetli periferik vazokonstriksiyonun beyin kan akımını koruması bunu kısmen açıklar. [[K1 s. 434]]</p>
  <p>Çocukların sağ kalma olasılığı erişkinlerden daha yüksektir. [[K1 s. 434]] Refleksleri daha güçlüdür ve ağırlıklarına göre yüzey alanları daha büyük olduğundan daha hızlı soğurlar. [[K1 s. 434]] Soğuma beynin metabolizma hızını düşürerek iskemiye karşı koruma sağlar. [[K1 s. 434]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap, su altında “yüzerken” fotoğraflanan bebekleri refleksle açıklar. [[K1 s. 434]] Bu refleks bebeği boğulmaya karşı güvenilir biçimde korumaz.</div>
</section>

<section class="wrap blk ders-sec" id="d88-su">
  <h2>Baş dışarıdayken suyun basıncı</h2>
  <p class="intro">Yüz suya girmese de gövdeyi saran suyun hidrostatik basıncı hem venöz dönüşü hem solunum mekaniğini değiştirir. [[K1 s. 434]]</p>
  <div class="viz"><div class="viz-head"><h3>Bacaklardan kalbe dönen kan</h3></div><div data-viz="f88_su"></div><p class="viz-cap" aria-live="polite">Karada yerçekimi kanın bacak venlerinde göllenmesine neden olur. [[K1 s. 434]]</p><p class="viz-foot">Şematik/nitel kan dağılımı. [[K1 s. 434]]</p></div>
  <ul class="ozet">
    <li><b>Dolaşım.</b> Su yerçekiminin etkisine karşı koyunca bacaklarda venöz göllenme önlenir ve yaklaşık 500 mL kan dolaşıma geri döner. [[K1 s. 434]]</li>
    <li><b>Böbrek yanıtı.</b> Artan hacim atriyum ve ventrikül duvarlarını gerer. [[K1 s. 434]] Atriyal natriüretik peptit (ANP) ve beyin natriüretik peptidi (BNP) salınır, diürez gelişir. [[K1 s. 434]]</li>
    <li><b>Solunum.</b> Çevredeki suyun basıncı solunum işini %60 artırır. [[K1 s. 434]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="d88-nefes">
  <h2>Nefes tutarak iniş ve çıkış</h2>
  <p class="intro">Nefesini tutan dalgıçta ortam basıncı arttıkça akciğerdeki hava sıkışır ve hacmi azalır (Boyle yasası). [[K1 s. 434–435]]</p>
  <div class="viz"><div class="viz-head"><h3>Aynı akciğer, dalışın üç anı</h3></div><div data-viz="f88_nefes"></div><p class="viz-cap" aria-live="polite">Kesikli çizgi, nefes tutarak dalıştan hemen önceki hava hacmini gösterir. [[K1 s. 434–435]]</p><p class="viz-foot">Şematik/nitel hacim karşılaştırması. [[K1 s. 434–435]]</p></div>
  <ul class="ozet">
    <li><b>İniş.</b> Su altında basınç metre deniz suyu (msw) ile ifade edilebilir. [[K1 s. 434]] Her 10 m inişte ortam basıncı 100 kPa artar. [[K1 s. 434]] Derinde akciğer hacmi rezidüel hacmin altına düşebilir ve negatif basınçlı akciğer ödemi gelişebilir. [[K1 s. 435]]</li>
    <li><b>Yüzeye dönüş.</b> Çıkışta hava yeniden genişlerken metabolizma dalış boyunca alveoler O₂ tüketmiş ve CO₂ üretmiştir. [[K1 s. 435]] O₂ tüketimi CO₂ üretiminden biraz fazla olduğundan yüzeye dönüşte akciğer hacmi başlangıçtan biraz küçüktür. [[K1 s. 435]]</li>
    <li><b>Hızlı çıkış.</b> Akciğerde kalan gazın O₂ fraksiyonu azalmıştır. [[K1 s. 435]] Derinden hızla çıkıldığında alveoler O₂ parsiyel basıncı hızla düşer ve serebral hipoksi ile bilinç kaybı gelişebilir. [[K1 s. 435]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="d88-scuba">
  <h2>SCUBA ile ortam basıncında soluma</h2>
  <p class="intro">SCUBA’da talep valfi, tüpteki sıkıştırılmış havayı dalgıca bulunduğu derinliğin basıncında verir ve nefes tutarak inişteki hacim kaybını önler. [[K1 s. 435]]</p>
  <div class="viz"><div class="viz-head"><h3>Derinde solunan gazın üç etkisi</h3></div><div data-viz="f88_scuba"></div><p class="viz-cap" aria-live="polite">Helyumun yoğunluğu azottan düşüktür, bu nedenle Helioks yoğun gaza bağlı solunum yükünü hafifletir. [[K1 s. 435]]</p><p class="viz-foot">Şematik/nitel neden–sonuç ilişkileri. [[K1 s. 435]]</p></div>
  <p>SCUBA, dalgıcın kendi üzerinde taşıdığı su altı solunum aygıtının İngilizce adının kısaltmasıdır (<i>self-contained underwater breathing apparatus</i>). [[K1 s. 435]]</p>
  <ul class="ozet">
    <li><b>Gaz yoğunluğu.</b> Derinlikle solunan gazların parsiyel basınçları ve yoğunluğu artar. [[K1 s. 435]] Özellikle inspirasyonda türbülans artar ve solunum daha fazla iş gerektirir. [[K1 s. 435]] Azotun (N₂) yerine daha düşük yoğunluklu helyum (He) kullanılması bu yükü azaltır (Helioks). [[K1 s. 435]]</li>
    <li><b>Azot narkozu.</b> Çok yüksek basınçta N₂ merkezi sinir sistemini doğrudan etkileyebilir. [[K1 s. 435]] Öfori, koordinasyon bozukluğu ve konsantrasyon kaybı gelişebilir, tablo komaya ilerleyebilir. [[K1 s. 435]] Eşdeğer basınçta helyumun bu narkotik etkisi yoktur. [[K1 s. 435]]</li>
    <li><b>O₂ toksisitesi.</b> Yüksek O₂ parsiyel basıncı akut akciğer hasarına, nöbete ve bilinç kaybına yol açabilir. [[K1 s. 435]] Son ikisi su altında özellikle tehlikelidir. [[K1 s. 435]] Dalgıçlar O₂ maruziyetini sınırlamak için su altında kalabilecekleri en uzun süreyi derinliğe göre hesaplar. [[K1 s. 435]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="d88-azot">
  <h2>Dekompresyon hastalığı</h2>
  <p class="intro">Derinde yüksek parsiyel basınçta solunan N₂ dokularda birikir ve hızlı çıkışta kabarcık oluşturabilir. [[K1 s. 435]]</p>
  <div class="viz"><div class="viz-head"><h3>Azot hangi yöne gider?</h3></div><div data-viz="f88_azot"></div><p class="viz-cap" aria-live="polite">Yüksek parsiyel basınçta solunan N₂ alveolden kana geçer ve dokularda birikir. [[K1 s. 435]]</p><p class="viz-foot">Şematik/nitel gösterim. [[K1 s. 435]]</p></div>
  <p>N₂ kanda az çözünür ve deniz seviyesinde dolaşımda çok az çözünmüş N₂ bulunur. [[K1 s. 435]] Henry yasasına göre çözünen N₂ miktarı sıvının üzerindeki N₂ parsiyel basıncıyla doğru orantılıdır. [[K1 s. 435]] SCUBA ile derinde sıkıştırılmış hava solunduğunda ek N₂ alveol-kapiller zarı geçer, kana ve oradan dokulara dağılır. [[K1 s. 435]]</p>
  <p>Yavaş, aşamalı çıkışta solunan N₂’nin parsiyel basıncı giderek azalır ve dokudaki azotun uzaklaşması için zaman kazanılır. [[K1 s. 435]] Hızlı çıkışta ise ani basınç düşüşü N₂’yi çözeltiden çıkarır. [[K1 s. 435]]</p>
  <ul class="ozet">
    <li><b>Eklemler.</b> Kabarcıklar eklem ağrısına (<i>the bends</i>) yol açar. [[K1 s. 435]]</li>
    <li><b>Pulmoner dolaşım.</b> Dispne (<i>the chokes</i>) ve sternum arkasında ağrı gelişir. [[K1 s. 435]]</li>
    <li><b>Arteriyel dolaşım.</b> Kabarcıklar gaz embolisine yol açar. [[K1 s. 435]]</li>
  </ul>
  <p>Belirti geliştikten sonra en etkili tedavi hiperbarik odada rekompresyondur. [[K1 s. 435]] Basınç artışı kabarcıklardaki azotu yeniden çözer, ardından basınç yavaş ve kontrollü olarak düşürülür. [[K1 s. 435]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap, yavaş çıkışın yanında O₂–He karışımını da dekompresyon hastalığını önleme yolu olarak verir. [[K1 s. 435]] Helyum da dokularda çözünüp kabarcık oluşturabildiğinden O₂–He kullanırken de kontrollü dekompresyon gerekir.</div>
</section>

<section class="wrap blk ders-sec" id="d88-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz88-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz88-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz88-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="d88-p2">
  <h2>Part II · SOE 1</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Nefes tutarak dalışla tüplü dalışı karşılaştırın. Derinden hızlı çıkışta her birinde hangi gazın davranışı tehlike yaratır?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>İnişte basınç her 10 m’de 100 kPa artar. [[K1 s. 434]]</li>
    <li>Nefes tutuluyorsa Boyle yasası gereği akciğerdeki hava sıkışır. [[K1 s. 434–435]]</li>
    <li>O₂ tüketimi sürerken derinden hızlı çıkış alveoler O₂ basıncını hızla düşürür ve bilinç kaybına yol açabilir. [[K1 s. 435]]</li>
    <li>SCUBA ortam basıncında gaz verir, yüksek N₂ parsiyel basıncı dokuların azot yükünü artırır. [[K1 s. 435]]</li>
    <li>Aşamalı çıkış azotun uzaklaşmasına zaman verirken hızlı çıkışta kabarcıklar gelişebilir. [[K1 s. 435]]</li>
    <li>Semptomatik dekompresyon hastalığında rekompresyonu yavaş ve kontrollü dekompresyon izler. [[K1 s. 435]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> İniş ve çıkış için iki sütun açın. İlk satırda akciğer hava hacmini, ikinci satırda alveol, kan ve doku arasındaki N₂ geçişini oklarla gösterin. [[K1 s. 434–435]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Buzlu su AV düğümünü nasıl etkiler? Baş dışarıdayken diürez neden artar? Helioks solunum işini nasıl etkiler? [[K1 s. 434–435]]</div></div>
</section>
<section class="wrap blk ders-sec" id="d88-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Yüzün buzlu suyla teması apne, vagal bradikardi ve periferik vazokonstriksiyonu tetikler. [[K1 s. 434]]</li>
    <li>Baş dışarıda suya girildiğinde yaklaşık 500 mL kan dolaşıma döner, solunum işi %60 artar. [[K1 s. 434]]</li>
    <li>Nefes tutarak derine inişte hacim azalır, hızlı çıkışta serebral hipoksi gelişebilir. [[K1 s. 434–435]]</li>
    <li>SCUBA’da yoğun gaz solunum işini artırır, yüksek N₂ ve O₂ parsiyel basınçları farklı toksik etkilere yol açabilir. [[K1 s. 435]]</li>
    <li>Hızlı çıkışta çözünmüş N₂ kabarcığa dönüşür, rekompresyonla yeniden çözünür. [[K1 s. 435]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="88"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında"><a href="#/dersler/fizyoloji/87">← Bölüm 87 · İrtifa</a><a href="#/dersler/fizyoloji/ek88">Sonraki: Ek ders · İvmelenme, uzay yolculuğu ve kronik dağ hastalığı →</a></nav>
</section>`,
};
