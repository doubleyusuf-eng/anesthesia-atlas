VERI.sorular = VERI.sorular || {};
VERI.sorular['far09c-1'] = {
  no: 1, kok: 'Ketaminin preparatı, uygulanması ve etkileri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 116–117]]',
  onermeler: [
    { t: 'R(−) ketamin, S(+) ketaminden daha potenttir.', d: false, n: 'S(+) enantiyomeri R(−) formundan iki ila üç kat daha potenttir. [[K3 s. 116]]' },
    { t: 'Ketaminle indüksiyonda intramüsküler doz 5–10 mg/kg’dır.', d: true, n: 'İndüksiyon için intramüsküler 5–10 mg/kg veya intravenöz 1–2 mg/kg verilebilir. [[K3 s. 116]]' },
    { t: 'Ketaminin merkezi etkileri intravenöz dozdan bir kol–beyin dolaşım süresi sonra belirginleşir.', d: false, n: 'Bu süre ketamin için yetersizdir, merkezi etkiler 90 saniye sonra belirginleşir. [[K3 s. 117]]' },
    { t: 'S(+) ketamin uyanma fenomenlerinin sıklığını azaltır.', d: false, n: 'S(+) formunda uyanma fenomenlerinin şiddeti azalır, sıklığı benzerdir. [[K3 s. 117]]' },
    { t: 'Ketamin altında çene kaslarının tonusu artarak hava yolunu tıkayabilir.', d: true, n: 'Hava yolu sıklıkla açık kalsa da artan çene kası tonusu obstrüksiyonu tetikleyebilir. [[K3 s. 117]]' },
  ],
};
VERI.sorular['far09c-2'] = {
  no: 2, kok: 'Etomidatın dolaşım, adrenal korteks ve diğer sistemler üzerindeki etkileri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 118–119]]',
  onermeler: [
    { t: 'Etomidatla indüksiyonda miyokardın oksijen sunumu büyük ölçüde korunur.', d: true, n: 'Oksijen sunumu, kontraktilite ve kan basıncı çok az değişir. [[K3 s. 118]]' },
    { t: 'Etomidat 11β-hidroksilazı inhibe eder.', d: true, n: '11β-hidroksilaz ve 17α-hidroksilaz inhibisyonu adrenal steroid sentezini baskılar. [[K3 s. 118]]' },
    { t: 'Etomidatla aldosteron sentezi artar.', d: false, n: 'Etomidat hem aldosteron hem de kortizol sentezini azaltır. [[K3 s. 118]]' },
    { t: 'Tek doz etomidat adrenokortikal işlevi etkileyebilir.', d: true, n: 'Tek dozun etkisi başka açıdan sağlıklı hastada muhtemelen az klinik önem taşır. [[K3 s. 118–119]]' },
    { t: 'Etomidat porfirik krizi tetikleyebilir.', d: true, n: 'Porfirik kriz, etomidatla ortaya çıkabilecek istenmeyen etkilerdendir. [[K3 s. 119]]' },
  ],
};
VERI.sorular['far09c-3'] = {
  no: 3, kok: 'Ketamin ve etomidatın dağılımı ve eliminasyonu', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 118–119]]',
  onermeler: [
    { t: 'Norketamin inaktif bir metabolittir.', d: false, n: 'Norketamin aktiftir ve potensi ketamininkinin %30’u kadardır. [[K3 s. 118]]' },
    { t: 'Ketaminin plazma konsantrasyonundaki ilk düşüş dağılıma bağlıdır.', d: true, n: 'Ketamin önce lipit membranlardan dağılır, yavaş düşüşü hepatik metabolizma belirler. [[K3 s. 118]]' },
    { t: 'Etomidatın etkisi dokulara hızlı dağılımla sonlanır.', d: true, n: 'Dağılım etkiyi sonlandırır, eliminasyon ise hepatik metabolizma ve renal atılımla gerçekleşir. [[K3 s. 119]]' },
    { t: 'Ketaminin yaklaşık %75’i proteine bağlıdır.', d: false, n: 'Ketaminin yaklaşık %25’i proteine bağlanır. [[K3 s. 118]]' },
    { t: 'Etomidat plazma kolinesterazını inhibe edebilir.', d: true, n: 'Etomidatın hidrolizine muhtemelen katılan plazma kolinesterazı, etomidat tarafından da inhibe edilebilir. [[K3 s. 119]]' },
  ],
};

const A09C_NAV = [['ketamin','Ketamin'], ['etomidat','Etomidat'], ['kinetik','Kinetik'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/09c'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 9 · Ders 09c', baslik: 'Ketamin ve etomidat',
  lede: 'Ketaminle indüksiyonda kalp hızı ve kan basıncı artarken etomidatla dolaşım büyük ölçüde korunur. [[K3 s. 117–118]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A09C_NAV.map(([id,ad], i) => `<button type="button" data-scroll="a09c-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a09c-ketamin">
  <h2>Ketamin</h2>
  <p class="intro">Ketaminin kalbe doğrudan etkisi ile hastada gözlenen dolaşım yanıtı farklı yönlerdedir. [[K3 s. 117]]</p>
  <div class="viz"><div class="viz-head"><h3>Ketamin kalp hızını ve debiyi nasıl artırır?</h3></div><div data-viz="a09c_kalp"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 117]]</p></div>
  <p>Bu dolaylı uyarıyla miyokardın oksijen gereksinimi de artar, ancak ketamin aritmi tetikliyor görünmez. [[K3 s. 117]]</p>
  <div class="cols">
    <div class="card"><h3>Preparat ve izomerler</h3><ul>
      <li>Fensiklidin türevidir. [[K3 s. 116]] Suda asidik çözelti oluşturur (pH 3.5–5.5). [[K3 s. 116]] Konsantrasyonları 10, 50 ve 100 mg/ml’dir. [[K3 s. 116]]</li>
      <li>Rasemik karışım veya saf S(+) olarak sunulur. [[K3 s. 116]] S(+), R(−) formundan iki ila üç kat daha potenttir. [[K3 s. 116]]</li>
      <li>S(+), in vitro R(−)’den daha az doğrudan kardiyak depresyon yapar. [[K3 s. 117]] Rasemik ketamin iskemik önkoşullandırmada temel rol oynayan ATP’ye duyarlı potasyum kanallarını bloke eder. [[K3 s. 117]] S(+) bu kanalları bloke etmediğinden iskemik kalp hastalığında avantajlı kabul edilir. [[K3 s. 117]]</li>
    </ul></div>
    <div class="card"><h3>Uygulama yolu ve amaç</h3><ul>
      <li><b>İndüksiyon.</b> İntravenöz (İV) 1–2 mg/kg veya intramüsküler 5–10 mg/kg. [[K3 s. 116]]</li>
      <li><b>Pozisyon verme.</b> Kırıklı hastada rejyonal anestezi öncesi İV 0.2–0.5 mg/kg kullanılabilir. [[K3 s. 116]]</li>
      <li><b>Diğer yollar.</b> Sedasyonda oral ve rektal, analjezide intratekal ve epidural uygulama kullanılmıştır. [[K3 s. 116]]</li>
      <li><b>Dirençli depresyon.</b> S(+) nazal spreyi bu endikasyonda FDA onayı almıştır. [[K3 s. 118]]</li>
    </ul></div>
  </div>
  <h3>Anestezi ve derlenme</h3>
  <ul class="ozet">
    <li><b>Disosiyasyon.</b> EEG’de talamokortikal ve limbik etkinlik birbirinden ayrılır, α ritminin yerini θ ve δ dalgaları alır. [[K3 s. 117]] Derin analjeziye amnezi eşlik eder. [[K3 s. 117]] Merkezi etkilerin belirginleşmesi bir kol–beyin dolaşım süresini aşar ve İV dozdan sonra 90 saniye alır. [[K3 s. 117]]</li>
    <li><b>Beyin ve kas.</b> Serebral kan akımı, oksijen tüketimi ve intrakraniyal basınç artar. [[K3 s. 117]] Kas tonusu artar ve ekstremitelerde sıçramalar görülebilir. [[K3 s. 117–118]]</li>
    <li><b>Uyanma.</b> Canlı, rahatsız edici rüyalar, halüsinasyon veya deliryum gelişebilir. [[K3 s. 117]] Eşzamanlı benzodiazepin ya da opioid bunları azaltabilir. [[K3 s. 117]] S(+) ile sıklık benzer, belirtiler daha hafiftir. [[K3 s. 117]] Gençlerde, yaşlılarda ve derlenirken rahatsız edilmeyenlerde bu fenomenler daha seyrektir. [[K3 s. 117]]</li>
    <li><b>Hava yolu.</b> Solunum hızı artabilir, laringeal refleksler görece korunabilir. [[K3 s. 117]] Hava yolu sıklıkla açık kalır, ancak artan çene kası tonusu tıkanmaya yol açabilir. [[K3 s. 117]] Bronkodilatasyon astımda yararlı olabilir. [[K3 s. 117]]</li>
    <li><b>Analjezi.</b> Yan etkiler geçmişte kullanımı sınırlamıştır. [[K3 s. 116]] Diğer analjeziklerle düşük dozda kullanımı yaygınlaşmıştır ve özellikle kronik ağrı bileşeni varsa yararlı olabilir. [[K3 s. 116–117]] Yan etkilerden kaçınmaya yetecek kadar düşük infüzyon dozları analjeziyi koruyup morfin tüketimini azaltabilir. [[K3 s. 118]]</li>
    <li><b>Sindirim sistemi.</b> Bulantı-kusma propofol ve tiyopentale göre daha sıktır. [[K3 s. 118]] Salivasyon artışı antikolinerjik premedikasyon gerektirir. [[K3 s. 118]]</li>
    <li><b>Mesane.</b> Reçetesiz yüksek doz kullanımı, sistektomi gerektirebilen ağır interstisyel sistitle ilişkilendirilmiştir. [[K3 s. 118]]</li>
  </ul>
</section>
<section class="wrap blk ders-sec" id="a09c-etomidat">
  <h2>Etomidat</h2>
  <p class="intro">Etomidatın dolaşımı koruması genel durumu bozuk hastada avantaj sağlar, ancak steroid sentezinin baskılanması muhtemelen en çok bu hastaya zarar verir. [[K3 s. 118–119]]</p>
  <div class="viz"><div class="viz-head"><h3>Adrenal baskılanmanın klinik önemi ne zaman değişir?</h3></div><div data-viz="a09c_adrenal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 118–119]]</p></div>
  <p>Kitap, elektif hastada etomidatla indüksiyonu düşük olasılıklı görür. [[K3 s. 119]]</p>
  <ul class="ozet">
    <li><b>Sunum.</b> Etomidat, imidazol türevi bir esterdir. [[K3 s. 118]] %0.2’lik çözeltinin pH’sı 4.1’dir. [[K3 s. 118]] Hacimce %35 propilen glikol stabiliteyi artırır ve enjeksiyondaki irritasyonu azaltır. [[K3 s. 118]] Lipit formülasyonu da vardır. [[K3 s. 118]]</li>
    <li><b>İndüksiyon.</b> Genel anestezide doz 0.3 mg/kg’dır. [[K3 s. 118]] Yan etkiler kullanımı sınırlar. [[K3 s. 118]] Kitabın aktardığı dönemde Birleşik Krallık’ta seyrek kullanılırken Kuzey Amerika ve Avustralya’da kullanımdan kaldırılmıştır. [[K3 s. 118]]</li>
    <li><b>Dolaşım.</b> Yaygın İV anestezikler içinde dolaşımı en az etkileyen ajandır. [[K3 s. 118]] Periferik damar direnci diğer indüksiyon ajanlarına göre daha az, hafifçe düşebilir. [[K3 s. 118]] Miyokardın oksijen sunumu, kontraktilitesi ve kan basıncı büyük ölçüde korunur. [[K3 s. 118]]</li>
    <li><b>İstenmeyen etkiler.</b> Aşırı duyarlılık daha az görülür, histamin salınımı nadirdir. [[K3 s. 118]] Enjeksiyon ağrısı, eksitatör hareketler ve bulantı-kusma hastaların %25’ine varan bölümünde görülebilir. [[K3 s. 119]] Porfirik krizi de tetikleyebilir. [[K3 s. 119]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap etomidatın Kuzey Amerika’da kullanımdan kaldırıldığını söyler; doğrusu, etomidat ABD’de özellikle acil hızlı ardışık indüksiyonda yaygın kullanılmaya devam etmektedir.</div>
  <h3>İndüksiyon ajanlarını karşılaştırın</h3>
  <div class="tbl-wrap a09c-tablo"><table class="tbl"><caption>Tablo 9.3’teki tipik yönler. Çift ok daha belirgin değişimi, → büyük ölçüde korunmayı gösterir. [[K3 s. 117]]</caption>
  <thead><tr><th scope="col">Özellik</th><th scope="col">Ketamin</th><th scope="col">Etomidat</th><th scope="col">Tiyopental</th><th scope="col">Propofol</th></tr></thead><tbody>
  <tr><th scope="row">Kan basıncı ve kardiyak debi</th><td data-ilac="Ketamin">↑</td><td data-ilac="Etomidat">→</td><td data-ilac="Tiyopental">↓</td><td data-ilac="Propofol">↓↓</td></tr>
  <tr><th scope="row">Kalp hızı</th><td data-ilac="Ketamin">↑</td><td data-ilac="Etomidat">→</td><td data-ilac="Tiyopental">↑</td><td data-ilac="Propofol">↓ veya →</td></tr>
  <tr><th scope="row">Sistemik vasküler direnç</th><td data-ilac="Ketamin">→</td><td data-ilac="Etomidat">→</td><td data-ilac="Tiyopental">↑ veya ↓</td><td data-ilac="Propofol">↓↓</td></tr>
  <tr><th scope="row">Solunum hızı</th><td data-ilac="Ketamin">↑</td><td data-ilac="Etomidat">↓</td><td data-ilac="Tiyopental">↓</td><td data-ilac="Propofol">↓</td></tr>
  <tr><th scope="row">İntrakraniyal ve intraoküler basınç</th><td data-ilac="Ketamin">↑</td><td data-ilac="Etomidat">→</td><td data-ilac="Tiyopental">↓</td><td data-ilac="Propofol">↓</td></tr>
  <tr><th scope="row">Enjeksiyon ağrısı</th><td data-ilac="Ketamin">Yok</td><td data-ilac="Etomidat">Var</td><td data-ilac="Tiyopental">Yok</td><td data-ilac="Propofol">Var</td></tr>
  <tr><th scope="row">Bulantı-kusma</th><td data-ilac="Ketamin">Var</td><td data-ilac="Etomidat">Var</td><td data-ilac="Tiyopental">Yok</td><td data-ilac="Propofol">Azalmış olabilir</td></tr>
  </tbody></table></div>
</section>
<section class="wrap blk ders-sec" id="a09c-kinetik">
  <h2>Dağılım, metabolizma ve atılım</h2>
  <p class="intro">Dağılım, ketaminin plazma düzeyindeki ilk düşüşü ve etomidatın etkisinin hızla sonlanmasını açıklar. [[K3 s. 118–119]]</p>
  <div class="viz"><div class="viz-head"><h3>İlacın dağılımdan atılıma yolu</h3></div><div data-viz="a09c_kinetik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel akış. [[K3 s. 118–119]]</p></div>
  <p>İV anestezikler içinde proteine en az bağlanan ketamindir (yaklaşık %25). [[K3 s. 118]] Etomidatın %75’i albümine bağlanır. [[K3 s. 119]]</p>
</section>
<section class="wrap blk ders-sec" id="a09c-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="far09c-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far09c-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far09c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a09c-p2">
  <h2>Part II · SOE 2 · Farmakoloji</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Ketamin ve etomidatı İV indüksiyon dozları ve dolaşım yanıtları açısından karşılaştırın. Genel durumu bozuk hastada etomidatın dolaşım profili karar vermeye neden yetmez?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>İV indüksiyon dozu ketamin için 1–2 mg/kg, etomidat için 0.3 mg/kg’dır. [[K3 s. 116]] [[K3 s. 118]]</li>
    <li>Ketaminle sempatik uyarı hafif doğrudan miyokard depresyonunu maskeler, hız ve debi artar. [[K3 s. 117]]</li>
    <li>Etomidatla kan basıncı, miyokardın kontraktilitesi ve oksijen sunumu büyük ölçüde korunur. [[K3 s. 118]]</li>
    <li>Etomidat iki hidroksilazı inhibe ederek kortizol ve aldosteron sentezini azaltır. [[K3 s. 118]]</li>
    <li>Steroid baskılanmasının zararı genel durumu bozuk hastada daha önemli olabilir. [[K3 s. 119]] Septik yoğun bakım hastalarında sedasyon infüzyonu mortalite artışıyla ilişkilendirilmiştir. [[K3 s. 118]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Ketamin için sempatik uyarıdan debi artışına, etomidat için hidroksilaz inhibisyonundan steroid sentezinin azalmasına giden yolları çizin. [[K3 s. 117–118]]</div><div class="note plain"><b>Olası ek sorular.</b> S(+) ketamin uyanma fenomenlerini nasıl değiştirir? [[K3 s. 117]] Etomidatın etkisini hangi süreç sonlandırır? [[K3 s. 119]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a09c-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Ketamin disosiyatif anestezi, analjezi ve amnezi sağlar. [[K3 s. 117]]</li>
    <li>Laringeal refleksler korunabilse de çene kaslarında tonus artışı hava yolunu tıkayabilir. [[K3 s. 117]]</li>
    <li>Ketaminin sempatik etkisi miyokardın oksijen gereksinimini artırır. [[K3 s. 117]]</li>
    <li>Etomidat dolaşımı az etkiler, ancak adrenal steroid sentezini baskılar. [[K3 s. 118]]</li>
    <li>Ketamin aktif norketamine dönüşür. [[K3 s. 118]] Etomidat ester hidroliziyle metabolize edilir. [[K3 s. 119]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="09c"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/09b">← 09b · İntravenöz anestezikler: barbitüratlar ve propofol</a><a href="#/dersler/farmakoloji/09d">Sonraki: 09d · İnhalasyon ajanları: MAK, fiziksel özellikler ve kinetik →</a></nav>
</section>`,
};
