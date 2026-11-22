/* Fizyoloji Bölüm 19 · Oksijen kaskadı (K1 İngilizce baskı s. 80–81).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz19.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz19-1'] = {
  no: 1, kok: 'Oksijen kaskadının atmosferden alveole kadar olan basamakları için:', kagit: 'Paper A · fizyoloji, Bölüm 19', kaynak: '[[K1 s. 80–81]]',
  onermeler: [
    { t: "Trakeadaki PO₂ düşüşü, oksijenin hava yolu mukozasından emilmesinden kaynaklanır.", d: false, n: "Yanlış. Bu basamağın adı nemlendirmedir. İnspire edilen hava karinaya ulaştığında su buharıyla tam olarak doymuştur; 37 °C'de 6,3 kPa'lık su buharı toplam basınçtan pay alır ve O₂ fraksiyonu yalnız geri kalan basınca uygulanır: (101,325 − 6,3) × %20,93 = 19,9 kPa. [[K1 s. 80]]" },
    { t: "Deniz seviyesinde kuru atmosfer havasının PO₂'si yaklaşık 21,2 kPa'dır.", d: true, n: "Doğru. PO₂ = PB × FiO₂ = 101,325 × %20,93 = 21,2 kPa (≈159 mmHg). [[K1 s. 80]]" },
    { t: "Oda havası soluyan, PaCO₂'si 5,3 kPa ve R'si 0,8 olan bir hastada PO₂ trakeadan alveole yaklaşık 6,6 kPa düşer.", d: true, n: "Doğru. Trakeada 19,9 kPa, alveolde %20,93 × (101,325 − 6,3) − 5,3/0,8 = 13,3 kPa. Aradaki fark alveoler gaz denkleminin PaCO₂/R terimidir: 5,3/0,8 = 6,6 kPa. [[K1 s. 80–81]]" },
    { t: "Alveoler PO₂, inspire edilen O₂ fraksiyonundan bağımsızdır; yalnız barometrik basınç ve alveoler ventilasyonla belirlenir.", d: false, n: "Yanlış. PAO₂ esas olarak üç değişkene bağlıdır: FiO₂, PB ve alveoler ventilasyon (V̇A). FiO₂ denklemde doğrudan çarpandır. [[K1 s. 80]]" },
    { t: "Suyun 37 °C'deki doymuş buhar basıncı 6,3 kPa'dır.", d: true, n: "Doğru. Hem karinadaki hem alveoldeki PO₂ hesaplanırken bu değer barometrik basınçtan çıkarılır. [[K1 s. 80]]" },
  ],
};
VERI.sorular['fiz19-2'] = {
  no: 2, kok: 'Alveol ile sistemik arter arasındaki PO₂ basamağı için:', kagit: 'Paper A · fizyoloji, Bölüm 19', kaynak: '[[K1 s. 81]]',
  onermeler: [
    { t: "Normal akciğerde PAO₂ ile pulmoner kapiller PO₂ 13,3 kPa'da dengelenir ve O₂ transferi perfüzyonla sınırlıdır.", d: true, n: "Doğru. Normalde O₂'nin alveol–kapiller bariyerden geçmesine yetecek zaman vardır ve iki basınç dengelenir. Bu durumda transferi difüzyon hızı değil, kapillerden geçen kan miktarı sınırlar (Bölüm 10). [[K1 s. 41, 81]]" },
    { t: "Fizyolojik şant yalnız anatomik şantı kapsar; V̇/Q̇ uyumsuzluğundan kaynaklanan bölüm ayrı sayılır.", d: false, n: "Yanlış. Fizyolojik şant fraksiyonu anatomik ve fonksiyonel şantların toplamıdır; fonksiyonel bölüm V̇/Q̇ uyumsuzluğundan gelir. [[K1 s. 81]]" },
    { t: "Bronşiyal dolaşım ve Thebesius venleri normalde küçük bir anatomik sağdan sola şant oluşturur.", d: true, n: "Doğru. Büyük hava yollarının venöz kanının çoğu doğrudan pulmoner venlere dökülür; koroner venöz kanın bir bölümü Thebesius venleriyle kalp boşluklarına drene olur ve sol atriyum ile sol ventriküle dökülen kısmı şanta katılır. [[K1 s. 64, 81]]" },
    { t: "Ventilasyonuna göre perfüzyonu görece fazla olan akciğer bölgeleri PaO₂'yi düşürmez, yalnızca ölü boşluğu artırır.", d: false, n: "Yanlış. Bu bölgeler fonksiyonel bir sağdan sola şant gibi davranır ve PaO₂'yi daha da düşürür. Alveoler ölü boşluğu artıran tersi durumdur: ventilasyonu perfüzyonuna göre fazla olan (yüksek V̇/Q̇) bölgeler. [[K1 s. 70, 81]]" },
    { t: "Normal fizyolojik şant fraksiyonu kalp debisinin yaklaşık %10–15'idir.", d: false, n: "Yanlış. Normal fizyolojik şant fraksiyonu %2–5'tir; bu, PaO₂'nin 13,0 kPa'ya inmesine karşılık gelir. [[K1 s. 81]]" },
  ],
};
VERI.sorular['fiz19-3'] = {
  no: 3, kok: 'Doku düzeyinde oksijen ve Pasteur noktası için:', kagit: 'Paper A · fizyoloji, Bölüm 19', kaynak: '[[K1 s. 81]]',
  onermeler: [
    { t: "Doku kapillerinde PO₂ arteriyel uçtan venöz uca kadar sabit kalır; düşüş ancak venülde olur.", d: false, n: "Yanlış. Dokular O₂ aldıkça PO₂ kapillerin arteriyel ucundan venöz ucuna doğru giderek düşer. [[K1 s. 81]]" },
    { t: "Arteriyoler kanın bir bölümü kapillerlere girmeden arteriyovenöz anastomozlar yoluyla doğrudan venüllere akar.", d: true, n: "Doğru. Prekapiller sfinkterler her kapiller ağa ne kadar kan gireceğini denetler; geri kalan kan kapillerleri atlar. Değişim yüzeyini atlayan bu kan dokuya O₂ bırakmaz (Atlas notu). [[K1 s. 81]]" },
    { t: "Egzersiz yapan iskelet kasında mitokondriyal PO₂ yükselir ve bu, kapillerden mitokondriye O₂ difüzyonunu hızlandırır.", d: false, n: "Yanlış. O₂ kullanımı yüksek olduğu için mitokondriyal PO₂ çok düşer. Kapiller kanla mitokondri arasındaki parsiyel basınç gradyanı büyüdüğü için difüzyon hızı artar. [[K1 s. 81]]" },
    { t: "Mitokondriyal PO₂ 0,15–0,3 kPa arasındaki kritik bir eşiğin altına inerse ATP üretiminde anaerobik metabolizma baskın hâle gelir.", d: true, n: "Doğru. Aerobik metabolizma için O₂ basıncı yetersiz kalır; bu kritik eşiğe Pasteur noktası denir (≈1–2 mmHg). [[K1 s. 81]]" },
    { t: "Yüksek irtifada yalnızca atmosferik PO₂ düşer; alveolden itibaren basamaklar deniz seviyesindeki değerlerinde kalır.", d: false, n: "Yanlış. İrtifa kaskadın başlangıç noktasını düşürür ve sonraki bütün basamaklar deniz seviyesindekinden düşük olur. Örneğin PB 65 kPa'da PaCO₂ 5,3 kPa kalırsa PAO₂ yalnızca 5,7 kPa'dır. [[K1 s. 78, 81]]" },
  ],
};

const D19_NAV = [
  ['d19-kaskad', 'Kaskad'], ['d19-gaz', 'Gaz evresi'], ['d19-arter', 'A–a basamağı'],
  ['d19-doku', 'Doku ve mitokondri'], ['d19-pasteur', 'Pasteur noktası'],
  ['d19-p1', 'Part I'], ['d19-p2', 'Part II'], ['d19-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/19'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 19', baslik: 'Oksijen kaskadı',
  lede: "Oksijenin parsiyel basıncı atmosferden mitokondriye giderken basamak basamak düşer. Bu bölüm önceki bölümlerin konularını tek şemada birleştirir: her basamağın değeri ve nedeni, doku düzeyi ve bir basamak bozulunca ortaya çıkan anaerobik metabolizma (Pasteur noktası). [[K1 s. 80–81]]",
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D19_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d19-kaskad">
  <h2>Oksijen kaskadı: atmosferden mitokondriye</h2>
  <p class="intro"><b>Oksijen kaskadı</b>, O₂ çevreden dokulara geçerken parsiyel basıncının (PO₂) basamak basamak düşmesidir: atmosferde 21,2 kPa, mitokondride &lt;5 kPa. [[K1 s. 80]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Atmosferden mitokondriye: basamak basamak</h3></div>
    <div data-viz="f19_kaskad"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Atmosfer.</b> Deniz seviyesinde PB 101,325 kPa, kuru havada FiO₂ %20,93: PO₂ = 101,325 × %20,93 = 21,2 kPa. Kaskadın başlangıç noktası budur. [[K1 s. 80]]</p>
    <p class="viz-foot">Değerler kitaptandır [[K1 s. 30, 80–81]]; mitokondri düzeyi şematiktir. 1 kPa ≈ 7,5 mmHg.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>O₂'nin hedefi mitokondridir, çünkü vücudun en verimli enerji üretim yolu aerobik metabolizmadır. Önceki bölümlerin konularını birleştirdiği için sınavda sevilir: tek soruyla birden çok konu sorulabilir. [[K1 s. 80]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitabın Şekil 19.1'i venöz kanı 6,3 kPa'da çizer, metin sayı vermez; atlas Bölüm 8'deki 5,3 kPa'yı kullanır [[K1 s. 30]]. 6,3 kPa'yı aynı sayfadaki su buharı basıncıyla karıştırmayın.</div>
</section>

<section class="wrap blk ders-sec" id="d19-gaz">
  <h2>Atmosferden alveole: su buharı ve PaCO₂/R</h2>
  <p class="intro">Gaz evresinde PO₂'yi iki şey düşürür: karinada su buharı toplam basınçtan pay alır (nemlendirme), alveolde alveoler gaz denkleminin PaCO₂/R terimi çıkarılır. [[K1 s. 80]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Toplam basınçtan O₂'nin payı</h3></div>
    <div data-viz="f19_pay"></div>
    <p class="viz-cap">Karinada FiO₂ yalnız su buharından arta kalan basınca uygulanır: (101,325 − 6,3) × %20,93 = 19,9 kPa. Alveolde, tipik PaCO₂ (5,3 kPa) ve R (0,8) ile: PAO₂ = FiO₂ × (PB − P<sub>SVP</sub> su) − PaCO₂/R = 19,9 − 6,6 = 13,3 kPa. [[K1 s. 80–81]]</p>
    <p class="viz-foot">Şematik; uzunluklar basınçla orantılıdır. Alveoldeki öbür gazlar çizilmemiştir.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Hava karinaya vardığında su buharıyla tam doymuştur; suyun 37 °C'deki doymuş buhar basıncı (P<sub>SVP</sub> su) 6,3 kPa'dır. [[K1 s. 80]]</p>
    <p>PAO₂ esas olarak FiO₂, PB ve alveoler ventilasyona (V̇A) bağlıdır; V̇A denkleme PaCO₂ üzerinden girer (<a href="#/dersler/fizyoloji/18">Bölüm 18</a>). [[K1 s. 80]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d19-arter">
  <h2>Alveolden artere: A–a basamağı</h2>
  <p class="intro">Alveol ile sistemik arter arasındaki küçük PO₂ basamağı, yani A–a gradyanı, üç etkenden doğar: difüzyon, şantlar ve V̇/Q̇ uyumsuzluğu. [[K1 s. 81]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Alveolden artere: 13,3'ten 13,0'a</h3></div>
    <div data-viz="f19_aa"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Difüzyon.</b> Normal akciğerde kan pulmoner kapillerin sonuna varmadan alveoldeki PO₂ ile dengelenir: kapiller sonu da 13,3 kPa'dır. Basamağın bu kısmı normalde yoktur. [[K1 s. 81]]</p>
    <p class="viz-foot">Normal değerler kitaptandır [[K1 s. 81]], şantın yarı yarıya bölünüşü Bölüm 14'ten [[K1 s. 64]]; hastalık basamakları şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p><b>Difüzyon.</b> Dengelenme tamamlandığı için O₂ transferi normalde <b>perfüzyonla sınırlıdır</b> (<a href="#/dersler/fizyoloji/10">Bölüm 10</a>). Bariyer kalınlaşırsa ya da alveoler yüzey alanı azalırsa <b>difüzyonla sınırlı</b> olur; pulmoner kapiller PO₂ PAO₂'nin bir basamak altında kalır. [[K1 s. 81]]</p>
    <p><b>Şantlar.</b> Bronşiyal dolaşım ve Thebesius venleri normalde küçük bir anatomik sağdan sola şant oluşturur (<a href="#/dersler/fizyoloji/14">Bölüm 14</a>). <b>V̇/Q̇ uyumsuzluğu.</b> Perfüzyonu ventilasyonuna göre görece fazla her bölge fonksiyonel sağdan sola şant gibi davranıp PaO₂'yi daha da düşürür (<a href="#/dersler/fizyoloji/15">Bölüm 15</a>). [[K1 s. 81]]</p>
    <p>Anatomik ve fonksiyonel şantın toplamı <b>fizyolojik şanttır</b>: normal fraksiyonu %2–5'tir, PaO₂ 13,0 kPa'ya iner. [[K1 s. 81]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d19-doku">
  <h2>Doku kapilleri ve mitokondri</h2>
  <p class="intro">Doku kapillerinde PO₂ bir basamakla değil bir yokuşla düşer; mitokondriyal PO₂'yi ise dokunun metabolik etkinliği belirler. [[K1 s. 81]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Doku yatağı: kapiller boyunca düşüş, gradyan ve akım</h3></div>
    <div data-viz="f19_doku"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat.</b> Kan kapillere 13,0 kPa ile girer; O₂ dokulara bırakıldıkça PO₂ venöz uca doğru düşer. Mitokondriyal PO₂ arteriyel kanınkinden çok düşüktür ve kapillerden mitokondriye bir gradyan vardır. Kaydırıcıyla dokunun metabolik etkinliğini artırın. [[K1 s. 81]]</p>
    <p class="viz-foot">Kapiller uç değerleri ve Pasteur bandı dışındaki büyüklükler şematiktir [[K1 s. 30, 81]]; kitap egzersiz için sayı vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Arteriyoler kanın hepsi kapillerlerden geçmez: <b>prekapiller sfinkterler</b> her kapiller ağa giren kanı denetler, kalanı <b>arteriyovenöz anastomozlarla</b> doğrudan venüllere akar. Kitaba göre bunlar insanda büyük olasılıkla genişlemiş iskelet kası kapiller yataklarıdır. [[K1 s. 81]]</p>
    <p>Egzersiz yapan kasta O₂ kullanımı yüksektir ve mitokondriyal PO₂ çok düşer: gradyan büyür, O₂ difüzyonu hızlanır. Metabolitler (H⁺, CO₂) de arteriyolleri genişletip yerel akımı ve O₂ sunumunu artırır. [[K1 s. 81]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Anatomik arteriyovenöz anastomozlar insanda en çok akral deridedir (ısı düzenlemesi); kitabın yorumu kapillerleri işlevsel olarak atlayan akımı anlatır. Kapillerleri atlayan kan dokuya O₂ bırakmaz.</div>
</section>

<section class="wrap blk ders-sec" id="d19-pasteur">
  <h2>Klinik önem: Pasteur noktası ve anaerobik metabolizma</h2>
  <p class="intro">Mitokondriyal PO₂ kritik bir eşiğin, <b>Pasteur noktasının</b> (0,15–0,3 kPa), altına düşerse aerobik metabolizmaya yetecek O₂ basıncı kalmaz ve ATP üretiminde anaerobik metabolizma baskın olur. [[K1 s. 81]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Bir basamak bozulunca: kaskad aşağı kayar</h3></div>
    <div data-viz="f19_bozulma"></div>
    <p class="viz-cap" aria-live="polite"><b>Deniz seviyesi, sağlıklı akciğer.</b> 21,2 → 19,9 → 13,3 → 13,0 kPa; kapillerden mitokondriye yeterli gradyan var. Bir durum seçin ve bozulmanın hangi basamakta başlayıp aşağı doğru nasıl yayıldığını izleyin. [[K1 s. 80–81]]</p>
    <p class="viz-foot">PAO₂ 5,7 / 8,5 / 8,6 kPa Bölüm 18 örnekleridir [[K1 s. 78]]; irtifada atmosfer ve karina atlas hesabı, pnömonide PaCO₂ 5,3 kPa varsayımdır. Alt basamaklar ve “Ağır olgu” yalnız yön gösterir.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Mitokondriye yeterli O₂ için kapiller kanın PO₂'si O₂'nin dokulara kolayca difüze olmasına yetmelidir; iyi oksijenlenmiş kapiller kan da önceki bütün basamaklara bağlıdır. Bu yüzden herhangi bir basamağın bozulması anaerobik metabolizmaya yol açabilir. [[K1 s. 81]]</p>
    <p>Kitabın örnekleri: <b>yüksek irtifa</b> başlangıç noktasını düşürür, sonraki bütün basamaklar da düşük kalır; <b>hipoventilasyon</b> PaCO₂'yi artırıp PAO₂'yi düşürür (<a href="#/dersler/fizyoloji/18">Bölüm 18</a>); <b>pnömoni</b> V̇/Q̇ uyumsuzluğuyla PaO₂'yi düşürür. [[K1 s. 81]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d19-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sayılar ve basamakların nedenleri üzerinden sorulur: 21,2 / 19,9 / 13,3 / 13,0 kPa, suyun 37 °C'deki doymuş buhar basıncı (6,3 kPa) ve karinada tam nemlenme, PAO₂'nin üç belirleyicisi, A–a basamağının üç nedeni, fizyolojik şant fraksiyonu (%2–5), kapiller boyunca düşüş, prekapiller sfinkterler ve arteriyovenöz anastomozlar, egzersizde mitokondriyal PO₂ ve Pasteur noktası (0,15–0,3 kPa). Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz19-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz19-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz19-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d19-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>“Oksijen kaskadını çizin. Atmosferden mitokondriye her basamakta PO₂'nin neden düştüğünü açıklayın. Kaskadın bir basamağı bozulursa hücre düzeyinde ne olur?”</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Aerobik metabolizma en verimli enerji yoludur; PO₂ atmosferde 21,2 kPa, mitokondride &lt;5 kPa. Kaskad, O₂ çevreden dokulara geçerken PO₂'nin basamak basamak düşmesidir. [[K1 s. 80]]</li>
    <li><b>Atmosfer ve trakea.</b> PB × FiO₂ = 101,325 × %20,93 = 21,2 kPa. Karinada hava su buharıyla tam doymuştur (37 °C'de 6,3 kPa): (101,325 − 6,3) × %20,93 = 19,9 kPa. Basamağın adı nemlendirme. [[K1 s. 80]]</li>
    <li><b>Alveol.</b> PAO₂ FiO₂, PB ve V̇A'ya bağlıdır. AGE: PAO₂ = FiO₂ × (PB − P<sub>SVP</sub> su) − PaCO₂/R; PaCO₂ 5,3 kPa, R 0,8 ile 13,3 kPa. Basamak = PaCO₂/R = 6,6 kPa. [[K1 s. 80–81]]</li>
    <li><b>Arteriyel kan: A–a basamağı.</b> Difüzyon (normalde 13,3 kPa'da dengelenme, perfüzyonla sınırlı; kalın bariyer ya da az yüzeyde difüzyonla sınırlı), anatomik şant (bronşiyal, Thebesius), V̇/Q̇ uyumsuzluğu (fonksiyonel şant). Fizyolojik şant %2–5 → PaO₂ 13,0 kPa. [[K1 s. 81]]</li>
    <li><b>Doku kapilleri.</b> PO₂ arteriyel uçtan venöz uca giderek düşer (venöz ≈5,3 kPa, Bölüm 8). Prekapiller sfinkterler dağılımı denetler; kalan kan arteriyovenöz anastomozlarla kapillerleri atlar. [[K1 s. 30, 81]]</li>
    <li><b>Mitokondri.</b> PO₂ metabolik etkinliğe bağlıdır; egzersiz yapan kasta çok düşer, gradyan büyür ve difüzyon hızlanır; H⁺ ve CO₂ arteriyoler vazodilatasyonla akımı artırır. [[K1 s. 81]]</li>
    <li><b>Klinik bağlantıyla bitirin.</b> Pasteur noktası (0,15–0,3 kPa): altında anaerobik metabolizma baskın olur. Herhangi bir basamağın bozulması buna yol açabilir: irtifa (PB 65 kPa, PaCO₂ 5,3 kPa kalırsa PAO₂ 5,7 kPa), hipoventilasyon (PaCO₂ 9 kPa → PAO₂ 8,6 kPa), pnömoni (V̇/Q̇ uyumsuzluğu → PaO₂ düşer). [[K1 s. 78, 81]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Bu sorunun diyagramı kaskadın kendisidir: dikey eksende PO₂ (kPa), yatay eksende konumlar. Basamakları değerleriyle çizin (21,2 → 19,9 → 13,3 → 13,3 → 13,0), her düşüşün yanına nedenini yazın (nemlendirme, AGE, difüzyon, fizyolojik şant), sonra doku kapillerinde 5,3 kPa'ya inen bir yokuş ve en altta mitokondriyi ekleyin. Pasteur noktasını eksenin dibinde kesik çizgiyle gösterin. Zaman kalırsa irtifa kaskadını aynı eksene daha aşağıda ikinci bir merdiven olarak çizin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Su buharı basıncı neden PB'den çıkarılır, trakeadaki düşüş ne kadardır? Alveoler basamağı hangi değişken büyütür? PaO₂ neden PAO₂'ye hiçbir zaman eşit değildir? O₂ transferi ne zaman difüzyonla sınırlı olur? Fizyolojik şant nedir, normal değeri kaçtır? Egzersiz yapan kasta O₂ difüzyonu neden artar? Pasteur noktası nedir? İrtifa, hipoventilasyon ve pnömoni kaskadın hangi basamağını bozar? Cevapların hepsi yukarıda. [[K1 s. 78, 80–81]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d19-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Kaskad: PO₂ atmosferde 21,2 kPa'dan mitokondride &lt;5 kPa'ya basamak basamak iner; birçok konuyu tek soruda birleştirir. [[K1 s. 80]]</li>
    <li>Atmosfer: 101,325 × %20,93 = 21,2 kPa. Trakea: karinada tam nemlenme, P<sub>SVP</sub> su 6,3 kPa (37 °C): (101,325 − 6,3) × %20,93 = 19,9 kPa. [[K1 s. 80]]</li>
    <li>Alveol: PAO₂ = FiO₂ × (PB − P<sub>SVP</sub> su) − PaCO₂/R; FiO₂, PB ve V̇A'ya bağlı; PaCO₂ 5,3 kPa ve R 0,8 ile 13,3 kPa. [[K1 s. 80–81]]</li>
    <li>Arter: A–a basamağının nedenleri difüzyon (normalde perfüzyonla sınırlı), anatomik şant (bronşiyal, Thebesius) ve V̇/Q̇ uyumsuzluğu (fonksiyonel şant); fizyolojik şant %2–5 → PaO₂ 13,0 kPa. [[K1 s. 81]]</li>
    <li>Doku kapilleri: PO₂ yokuş gibi düşer; prekapiller sfinkterler dağılımı denetler, kalan kan arteriyovenöz anastomozlarla kapillerleri atlar. [[K1 s. 81]]</li>
    <li>Mitokondri: PO₂ metabolik etkinliğe bağlıdır; egzersiz yapan kasta çok düşer, gradyan ve difüzyon hızı artar; H⁺ ve CO₂ arteriyoler vazodilatasyonla O₂ sunumunu artırır. [[K1 s. 81]]</li>
    <li>Pasteur noktası 0,15–0,3 kPa: altında ATP üretiminde anaerobik metabolizma baskın olur. Herhangi bir basamağın bozulması (irtifa, hipoventilasyon, pnömoni) buna yol açabilir. [[K1 s. 81]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="19"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/18">← Bölüm 18 · Alveoler gaz denklemi</a>
    <a href="#/dersler/fizyoloji/20">Sonraki: Bölüm 20 · Akciğer kompliyansı →</a>
  </nav>
</section>`,
};
