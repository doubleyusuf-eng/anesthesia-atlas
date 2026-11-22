/* Fizyoloji Bölüm 17 · Oksijen sunumu ve gereksinimi (K1 İngilizce baskı s. 74–76).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz17.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz17-1'] = {
  no: 1, kok: 'Global oksijen tüketimi ve sunumu için:', kagit: 'Paper A · fizyoloji, Bölüm 17', kaynak: '[[K1 s. 74–75]]',
  onermeler: [
    { t: 'Oksijen akısı denklemindeki 10 katsayısı, plazmada çözünmüş oksijeni hesaba katmak için eklenmiştir.', d: false, n: "Yanlış. 10 bir birim dönüştürme katsayısıdır: kalp debisi litre/dakika, CaO₂ ise 100 mL kan başına verilir. Çözünmüş oksijen zaten CaO₂'nin içindeki 0,023 × PaO₂ terimindedir. [[K1 s. 74]]" },
    { t: "Ters Fick ilkesine göre V̇O₂, kalp debisi ile arteriyel ve venöz oksijen içerikleri arasındaki farkın çarpımından (birim katsayısıyla birlikte) hesaplanır.", d: true, n: "Doğru. V̇O₂ = CO × (CaO₂ − CvO₂) × 10. Tüketilen oksijen, arteriyel kandan “alınan” oksijendir ve arteriyovenöz içerik farkına yansır. [[K1 s. 74]]" },
    { t: 'Ters Fick hesabı için venöz oksijen içeriği, ideal olarak pulmoner arter kateterinden alınan miks venöz kanda ölçülür.', d: true, n: 'Doğru. CO ve CvO₂ pulmoner arter kateteriyle ölçülebilir; CvO₂ aslında miks venöz kanda ölçülmelidir. CaO₂ periferik arteriyel kan gazından hesaplanır. [[K1 s. 74]]' },
    { t: "CO 5 L/dk, SaO₂ %98 ve PaO₂ 13 kPa olan bir hastada [Hb] 15'ten 8 g/dL'ye düşerse, kalp debisi değişmediği sürece ḊO₂ yaklaşık 1000'den 540 mL/dk'ya iner.", d: true, n: "Doğru. CaO₂ 20,0'dan 10,8 mL/100 mL'ye, ḊO₂ 1000'den 540 mL/dk'ya düşer; sunum normalin yarısına yaklaşır. [[K1 s. 74–75]]" },
    { t: 'Anemide kalp debisinin kompansatuvar artışına, kanın viskozitesinin azalması katkıda bulunur.', d: true, n: "Doğru. Anemi ḊO₂'yi korumak için kalp debisini artırır; artışın bir bölümü anemik kanın düşük viskozitesinden kaynaklanır. [[K1 s. 75]]" },
  ],
};
VERI.sorular['fiz17-2'] = {
  no: 2, kok: 'Oksijen ekstraksiyon oranı (OER) için:', kagit: 'Paper A · fizyoloji, Bölüm 17', kaynak: '[[K1 s. 75]]',
  onermeler: [
    { t: "OER, V̇O₂'nin ḊO₂'ye oranıdır.", d: true, n: 'Doğru. OER = V̇O₂ / ḊO₂; istirahatte 250 / 1000 = 0,25. [[K1 s. 75]]' },
    { t: "Normal istirahat OER'si 0,5–0,6'dır.", d: false, n: "Yanlış. Normal OER 0,2–0,3'tür: sunulan oksijenin yalnızca %20–30'u tüketilir, geri kalanı venöz kanla akciğerlere döner. Yaklaşık 0,6 kalbin OER'sidir. [[K1 s. 75]]" },
    { t: "0,2–0,3'lük bir OER, miks venöz kanda %50–60'lık bir Hb O₂ satürasyonuna karşılık gelir.", d: false, n: "Yanlış. 0,2–0,3'lük OER, miks venöz Hb O₂ satürasyonunun %70–80 olmasına karşılık gelir. [[K1 s. 75]]" },
    { t: "Kalbin yüksek OER'si, koroner perfüzyon basıncı düştüğünde miyokardı iskemiye çok duyarlı kılar.", d: true, n: "Doğru. Kalbin OER'si yaklaşık 0,6'dır; ekstraksiyon istirahatte bile yüksek olduğu için koroner perfüzyon basıncındaki bir düşüş kolayca iskemiye yol açar. [[K1 s. 75]]" },
    { t: "Karotis cisimciklerinin OER'si yüksektir; bu, kan bileşimini algılama görevlerini yansıtır.", d: false, n: "Yanlış. Karotis cisimciklerinin sunumu yüksek, tüketimi düşüktür; bu yüzden OER'leri düşüktür. Kan bileşimini algılama görevlerini yansıtan bu düşük OER'dir. [[K1 s. 75]]" },
  ],
};
VERI.sorular['fiz17-3'] = {
  no: 3, kok: 'Oksijen sunumu ile tüketimi arasındaki ilişki ve perioperatif dönem için:', kagit: 'Paper A · fizyoloji, Bölüm 17', kaynak: '[[K1 s. 75–76]]',
  onermeler: [
    { t: "Kritik ḊO₂'nin üzerinde V̇O₂ sunuma bağımlıdır.", d: false, n: "Yanlış. Kritik ḊO₂'nin üzerinde V̇O₂ sunumdan bağımsızdır: dokular ekstraksiyonu artırarak tüketimi sabit tutar. Sunuma bağımlılık kritik değerin altında başlar. [[K1 s. 75]]" },
    { t: 'ḊO₂ kritik değerin altına düştüğünde V̇O₂ hızla azalır ve dokular enerjilerini anaerobik yollarla elde etmek zorunda kalır.', d: true, n: 'Doğru. Bu, sunuma bağımlı bölgedir; kitap kritik ḊO₂ değerine anaerobik eşik der. [[K1 s. 75]]' },
    { t: "Adrenerjik ilaçlar, ventilatörden ayırma ve fizyoterapi kritik hastada V̇O₂'yi artırabilir.", d: true, n: "Doğru. Kritik hastada V̇O₂'yi belirgin olarak artırabilen ek etkenler: inflamasyon, sepsis ve ateş; adrenerjik ilaçlar; ventilatörden ayırma; fizyoterapi gibi girişimler; yanık, travma ve nöbet. [[K1 s. 75]]" },
    { t: "Genel anestezide mekanik ventilasyon ve kas paralizisi, solunum işini ortadan kaldırarak perioperatif V̇O₂ artışının bir bölümünü dengeler.", d: true, n: "Doğru. Dengeleyen öbür iki etken, serebral metabolizma hızını azaltan sedatif ve hipnotikler ile bağırsakların O₂ tüketimini azaltan preoperatif açlıktır. [[K1 s. 76]]" },
    { t: "Majör cerrahiden sonraki inflamatuvar yanıt istirahat V̇O₂'sini yaklaşık %50 artırır ve bu artış ilk birkaç saat içinde geçer.", d: false, n: "Yanlış. %50'lik artış birçok gün boyunca sürer. Bu yüzden hastanın ameliyattan sonra gereken ḊO₂ artışını karşılayacak kardiyopulmoner rezervi olup olmadığı ameliyattan önce bilinmelidir. [[K1 s. 76]]" },
  ],
};

const D17_NAV = [
  ['d17-vo2', 'Tüketim ve sunum'], ['d17-anemi', 'Hesap ve anemi'], ['d17-oer', 'Ekstraksiyon oranı'],
  ['d17-kritik', 'Kritik ḊO₂'], ['d17-anestezi', 'Anestezi'],
  ['d17-p1', 'Part I'], ['d17-p2', 'Part II'], ['d17-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/17'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 17', baslik: 'Oksijen sunumu ve gereksinimi',
  lede: "Dokulara dakikada ne kadar oksijen ulaşır, bunun ne kadarı kullanılır ve sunum hangi noktada yetersiz kalır? Bu bölüm global oksijen tüketimini ve sunumunu, ekstraksiyon oranını ve kritik ḊO₂'yi; bunların anemide, kritik hastalıkta ve anestezideki karşılıklarıyla birlikte işler. [[K1 s. 74–76]]",
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D17_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d17-vo2">
  <h2>Oksijen tüketimi (V̇O₂) ve sunumu (ḊO₂)</h2>
  <p class="intro">Dokulara dakikada getirilen oksijen <b>ḊO₂</b>, dokuların kullandığı oksijen <b>V̇O₂</b>'dir; ikisi de kalp debisi ile kanın oksijen içeriğinden hesaplanır. [[K1 s. 74]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Bir dolaşım, iki denklem: ne getirildi, ne alındı?</h3></div>
    <div data-viz="f17_fick"></div>
    <p class="viz-cap" aria-live="polite"><b>Bir dolaşım, iki denklem.</b> Kırmızı kol dokulara getirileni (ḊO₂), doku kutusu alınanı (V̇O₂), mavi kol akciğerlere dönen miks venöz kanı gösterir; ölçüm noktaları işaretlidir. [[K1 s. 74]]</p>
    <p class="viz-foot">Şematik çizim; değerler kitabın istirahat örneğinden. CvO₂ ≈ 15 mL/100 mL atlas hesabıdır: 20,0 − 250 ÷ (5 × 10). [[K1 s. 74–75]]</p>
  </div>
  <div class="blk-body">
    <p><b>Global O₂ tüketimi</b> (V̇O₂, mL/dk) vücudun dakikada tükettiği O₂ hacmidir; aerobik metabolizmada metabolizma hızını yakından izler. 70 kg'lık erkekte istirahatte (deniz düzeyi, standart sıcaklık) tipik değeri <b>250 mL/dk</b>'dır. <b>Global O₂ sunumu</b> (ḊO₂, mL/dk) akciğerlerden dokulara dakikada ulaştırılan O₂ hacmidir. [[K1 s. 74]]</p>
    <p><b>Ters Fick ilkesi</b>, V̇O₂ = CO × (CaO₂ − CvO₂) × 10, tüketimi arteriyel kandan “alınan” oksijen, yani arteriyovenöz içerik farkı olarak bulur. CO ve CvO₂ pulmoner arter kateteriyle ölçülür, çünkü CvO₂ aslında miks venöz kanda ölçülmelidir; CaO₂ periferik arteriyel kan gazından hesaplanır. <b>Oksijen akısı denklemi</b>, ḊO₂ = CO × CaO₂ × 10, akımı yalnız arteriyel içerikle çarpar. [[K1 s. 74]]</p>
    <p>İki denklemde de CO L/dk, içerikler mL O₂/100 mL kandır; 10 birim dönüştürme katsayısıdır. İçerik Bölüm 8'deki denklemle bulunur: CaO₂ = (1,34 × [Hb] × SaO₂/%100) + 0,023 × PaO₂ ([Hb] g/dL, PaO₂ kPa). [[K1 s. 74]]</p>
    <p>Egzersizde kas kasılması ek O₂ ister ve V̇O₂ egzersiz şiddetiyle artar. Bir noktada V̇O₂'yi dokulara O₂ sunulma hızı sınırlar, büyük olasılıkla kas mikrodolaşımında difüzyon sınırına ulaşıldığı için; kaslar aerobik metabolizmadan, enerjiyi glikolizle sağlayan anaerobik metabolizmaya geçer. Kitap bu geçiş noktasındaki tüketime <b>V̇O₂max</b> der: maksimal egzersiz performansıyla yakından ilişkilidir; antrenman V̇O₂max'ı, dolayısıyla performansı artırır (bkz. Bölüm 43). [[K1 s. 74]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap burada iki eşiği birleştirir: anaerobik metabolizmanın aerobiğe eklenmeye başladığı tüketim <b>anaerobik eşik</b>, iş yükü artsa da V̇O₂'nin yükselmediği plato <b>V̇O₂max</b>'tır (Bölüm 43'te ayrı tanımlanır [[K1 s. 186]]). Anaerobik eşik önce gelir ve eşiğin üstünde de aerobik metabolizma sürer.</div>
</section>

<section class="wrap blk ders-sec" id="d17-anemi">
  <h2>Sunumun hesabı ve klinik önem: anemi</h2>
  <p class="intro">ḊO₂ bir çarpım olduğu için kalp debisi ya da arteriyel içerik düşerse sunum da neredeyse aynı oranda düşer; anemide kalp debisi artarak bunu karşılamaya çalışır. [[K1 s. 74–75]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Oksijen akısı: kalp debisi × arteriyel içerik</h3></div>
    <div data-viz="f17_aki"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> CO 5 L/dk, [Hb] 15 g/dL, SaO₂ %98, PaO₂ 13 kPa: CaO₂ ≈ 20,0 mL/100 mL, ḊO₂ = 5 × 20,0 × 10 ≈ 1000 mL/dk. Her nokta hemoglobine bağlı oksijeni, akış hızı kalp debisini gösterir. [[K1 s. 74]]</p>
    <p class="viz-foot">PaO₂ 13 kPa'da sabit (çözünmüş terim 0,30 mL/100 mL). Kompansasyon adımındaki ≈9,3 L/dk ve OER göstergesi (V̇O₂ 250 mL/dk ile) atlas hesabıdır; akan noktalar şematiktir. [[K1 s. 74–75]]</p>
  </div>
  <div class="blk-body">
    <p>Şeklin 1. adımı kitabın oda havası soluyan, istirahatteki hastasıdır. [Hb] 8 g/dL'ye düşerse CaO₂ = (1,34 × 8 × 98/100) + 0,023 × 13 ≈ <b>10,8 mL/100 mL</b>, ḊO₂ = 5 × 10,8 × 10 ≈ <b>540 mL/dk</b> olur: sunum normalin neredeyse yarısına iner (2. adım). [[K1 s. 75]]</p>
    <p>Hesabın bir kusuru vardır: anemik hastanın kalp debisi normal değer olan 5 L/dk'da kalmaz. Anemi ḊO₂'yi korumak için kalp debisini kompansatuvar olarak artırır; artışın bir bölümü anemik kanın düşük viskozitesinden kaynaklanır (3. adım). [[K1 s. 75]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d17-oer">
  <h2>ḊO₂ ile V̇O₂: oksijen ekstraksiyon oranı</h2>
  <p class="intro">Dokular kendilerine sunulan oksijenin yalnızca %20–30'unu kullanır, kalanı venöz kanla akciğerlere döner: <b>OER = V̇O₂ / ḊO₂</b> normalde 0,2–0,3'tür ve miks venöz Hb O₂ satürasyonunun %70–80 olmasına karşılık gelir. [[K1 s. 75]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Doku yatağında ekstraksiyon: ne gelir, ne tüketilir, ne döner?</h3></div>
    <div data-viz="f17_oer"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat.</b> ḊO₂ 1000 mL/dk, V̇O₂ 250 mL/dk: OER 0,25. Sunulan oksijenin dörtte üçü venöz kanla akciğerlere döner; SvO₂ ≈ %74. Kitaba göre normal OER 0,2–0,3, buna karşılık gelen miks venöz satürasyon %70–80'dir. [[K1 s. 75]]</p>
    <p class="viz-foot">SvO₂ ≈ SaO₂ × (1 − OER), çünkü OER = (CaO₂ − CvO₂) / CaO₂ (SaO₂ %98, çözünmüş O₂ ihmal; atlas yaklaştırması). Hipotansiyon ve egzersiz değerleri örnektir; organlarda şeritler orandır, karotis cisimciği için kitap sayı vermez. [[K1 s. 75]]</p>
  </div>
  <div class="blk-body">
    <p>ḊO₂ düşerse (ör. hipotansiyonda) ya da V̇O₂ artarsa (ör. egzersizde, sepsiste), dokular aerobik metabolizmayı sürdürmek için geçen kandan daha çok O₂ çekmek zorundadır ve OER yükselir. [[K1 s. 75]]</p>
    <p>Normal OER organdan organa da belirgin değişir. Karotis cisimciklerinde ḊO₂ yüksek, V̇O₂ düşüktür; düşük OER kan bileşimindeki değişiklikleri algılama görevlerini yansıtır. Kalbin OER'si yüksektir (≈0,6); bu yüzden koroner arter perfüzyon basıncı düşünce kalp iskemiye çok duyarlıdır. [[K1 s. 75]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d17-kritik">
  <h2>Kritik ḊO₂: normalde ve kritik hastalıkta</h2>
  <p class="intro">Sunum azalırken dokular ekstraksiyonu artırarak tüketimi sabit tutar; ḊO₂ kritik bir değerin altına inince tüketim de düşer. [[K1 s. 75]]</p>
  <div class="viz">
    <div class="viz-head"><h3>V̇O₂–ḊO₂ ilişkisi: plato, kritik ḊO₂ ve sunuma bağımlılık</h3></div>
    <div data-viz="f17_kritik"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahat bölgesi.</b> ḊO₂ 1000 mL/dk, V̇O₂ 250 mL/dk; OER 0,25. Sunum gereksinimin çok üzerinde: orijinden çalışma noktasına çizilen doğrunun eğimi OER'dir. [[K1 s. 75]]</p>
    <p class="viz-foot">Şematik model: V̇O₂ = en küçük (gereksinim; en yüksek OER × ḊO₂). Kitap kritik ḊO₂ için sayı vermez; en yüksek OER 0,7 (kırılma ≈360 mL/dk) ve kritik hastalık değerleri (350 mL/dk, 0,35) örnektir; gerçek geçiş bu kadar keskin değildir. Normaldeki bifazik biçim ve sepsiste bağımlılığın çok daha yüksek ḊO₂'de başlaması kitaptandır. [[K1 s. 75–76]]</p>
  </div>
  <div class="blk-body">
    <p>İstirahatte dokular geçen kapiller kandan aerobik metabolizma için dakikada 250 mL O₂ çekmeyi, ḊO₂ bir <b>kritik değere</b> inene kadar sürdürür; kitap bu kritik ḊO₂'ye <b>anaerobik eşik</b> der. Eşiğe kadar V̇O₂ <b>sunumdan bağımsızdır</b>. ḊO₂ bunun altına düşünce V̇O₂ hızla azalır ve dokular enerjiyi anaerobik yollarla sağlamak zorunda kalır: V̇O₂ artık <b>sunuma bağımlıdır</b>. Bu iki evreli (bifazik) ilişkiyi kitabın Şekil 17.1a'sı gösterir. [[K1 s. 75–76]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Şekil 17.1a'daki “anabolic threshold” etiketi baskı hatasıdır; doğrusu metindeki anaerobik eşiktir. Terim burada istirahatteki kritik bir <i>sunum</i> değeridir (ḊO₂, mL/dk), kardiyopulmoner egzersiz testinde ise artan iş yükünde anaerobik metabolizmanın devreye girdiği <i>tüketim</i> değeridir (V̇O₂, mL/kg/dk) [[K1 s. 186]].</div>
  <h3 style="margin:20px 0 8px">Klinik önem: kritik hastalık</h3>
  <div class="blk-body">
    <p>Kritik hastada O₂ sunumu ile gereksinimi daha karmaşıktır. V̇O₂'yi belirgin artırabilen ek etkenler: inflamasyon, sepsis ve ateş; adrenerjik ilaç uygulanması; ventilatörden ayırma; fizyoterapi gibi girişimler; yanık, travma ve nöbet. [[K1 s. 75]]</p>
    <p>Ağır sepsiste ve ARDS'de V̇O₂ çok daha yüksek bir ḊO₂'de sunuma bağımlı olur ve normal bifazik ilişki görülmez (Şekil 17.1b; şekilde “Kritik hastalık”). Bunun kritik ḊO₂'nin normalden çok yüksek olmasından mı, dokuların kandan O₂ çekme yeteneğinin azalmasından mı kaynaklandığı açık değildir. [[K1 s. 75–76]]</p>
    <p>Organ yetmezliği riski olan hastalarda <b>erken hedefe yönelik tedavi</b> (EGDT) geleneksel olarak invaziv monitörizasyon ve agresif hemodinamik yönetim demekti; daha yeni randomize çalışmaların sonuçları ise çelişkilidir. [[K1 s. 75]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Sepsisteki “patolojik sunuma bağımlılık” tartışmalıdır: V̇O₂ ve ḊO₂ aynı ölçümlerden hesaplanınca ortak ölçüm hatası yapay bir ilişki doğurur (matematiksel eşleşme); V̇O₂ solunum gazlarından ölçülünce ilişki çoğu çalışmada kaybolur. Kitabın andığı çelişki [[K1 s. 75]]: tek merkezli Rivers çalışması (2001) ağır sepsis ve septik şokta EGDT ile mortalitenin azaldığını bildirmiş, çok merkezli ProCESS, ARISE ve ProMISe (2014–2015) bunu doğrulamamıştır; güncel kılavuzlar protokollü EGDT'yi rutin önermez.</div>
</section>

<section class="wrap blk ders-sec" id="d17-anestezi">
  <h2>Klinik önem: anestezi, oksijen tüketimi ve sunumu</h2>
  <p class="intro">Perioperatif dönemde V̇O₂ çoğu zaman 250 mL/dk'lık “istirahat” değerinin üzerindedir; genel anestezi bu artışın yalnız bir bölümünü dengeler. [[K1 s. 75–76]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Perioperatif V̇O₂ ve gereken ḊO₂</h3></div>
    <div data-viz="f17_periop"></div>
    <p class="viz-cap" aria-live="polite"><b>Ameliyat öncesi.</b> İstirahat V̇O₂ 250 mL/dk, ḊO₂ 1000 mL/dk, OER 0,25. [[K1 s. 74–75]]</p>
    <p class="viz-foot">Ameliyat sırasındaki artış ve azalmaların büyüklüğü kitapta yok; o kesim yalnız yön gösterir. %50'lik artış kitaptandır [[K1 s. 76]]; gereken ḊO₂ ve kalp debisi, OER 0,25'te kalırsa yapılan atlas hesabıdır.</p>
  </div>
  <div class="cols" style="margin-top:14px">
    <div class="card clin"><span class="tag clin">V̇O₂'yi artıranlar</span><ul style="margin-top:8px"><li>Cerrahi</li><li>Ağrı ve anksiyete</li><li>İnflamasyon, sepsis ve ateş</li><li>Postoperatif titreme [[K1 s. 75]]</li></ul></div>
    <div class="card basic"><span class="tag basic">Genel anestezide dengeleyenler</span><ul style="margin-top:8px"><li>Sedatif/hipnotikler: istirahat V̇O₂'sinin önemli bir bileşeni olan serebral metabolizma hızını azaltır.</li><li>Mekanik ventilasyon ve kas paralizisi: solunum işini ortadan kaldırır.</li><li>Preoperatif açlık: bağırsakların O₂ tüketimini azaltır. [[K1 s. 76]]</li></ul></div>
  </div>
  <div class="blk-body">
    <p>Majör cerrahiden sonraki inflamatuvar yanıt istirahat V̇O₂'sini <b>%50</b> artırır ve bu artış birçok gün sürer. Bu yüzden hastanın ameliyat sonrası gereken ḊO₂ artışını karşılayacak kardiyopulmoner rezervi olduğu ameliyattan önce bilinmelidir. Çeşitli preoperatif egzersiz testleri vardır; rezervi en iyi kardiyopulmoner egzersiz testinin (KPET) değerlendirdiği söylenebilir (bkz. Bölüm 43). [[K1 s. 76]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d17-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok denklemler ve sayılar üzerinden sorulur: ters Fick ilkesi ile akı denkleminin farkı ve 10 katsayısı, istirahat V̇O₂ ve ḊO₂ değerleri, anemide hesap ve kompansasyon, normal OER ve buna karşılık gelen SvO₂, kalp ile karotis cisimciklerinin karşıtlığı, kritik ḊO₂'nin iki yanındaki “bağımsız” ve “bağımlı” bölgeler, kritik hastalıkta ve anestezide V̇O₂'yi değiştiren etkenler. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz17-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz17-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz17-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d17-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>“Oksijen sunumunu tanımlayın ve nasıl hesaplandığını gösterin. Sunum ile tüketim arasındaki ilişkiyi bir grafikle anlatın. Hemoglobini 8 g/dL olan bir hastada ne değişir?”</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanımlar.</b> V̇O₂: vücudun dakikada tükettiği O₂ (70 kg'lık erkekte istirahatte ≈250 mL/dk). ḊO₂: akciğerlerden dokulara dakikada ulaştırılan O₂. [[K1 s. 74]]</li>
    <li><b>Akı denklemi ve hesap.</b> CaO₂ = (1,34 × [Hb] × SaO₂/%100) + 0,023 × PaO₂ ≈ 20,0 mL/100 mL; ḊO₂ = CO × CaO₂ × 10 ≈ 1000 mL/dk. 10'un birim katsayısı olduğunu söyleyin. [[K1 s. 74]]</li>
    <li><b>Tüketimin ölçümü.</b> Ters Fick: V̇O₂ = CO × (CaO₂ − CvO₂) × 10. CO ve miks venöz içerik pulmoner arter kateteriyle, CaO₂ arteriyel kan gazıyla. [[K1 s. 74]]</li>
    <li><b>İkisinin ilişkisi.</b> OER = V̇O₂/ḊO₂ ≈ 0,25 (normal 0,2–0,3), buna karşılık SvO₂ %70–80. Organlar arasında fark: kalp ≈0,6 ve iskemiye duyarlı, karotis cisimcikleri düşük. [[K1 s. 75]]</li>
    <li><b>Grafik.</b> Bifazik ilişki: kritik ḊO₂'nin (anaerobik eşik) üstünde sunumdan bağımsız plato, altında sunuma bağımlı ve anaerobik metabolizma. Ağır sepsiste ve ARDS'de bağımlılık çok daha yüksek bir ḊO₂'de başlar. [[K1 s. 75–76]]</li>
    <li><b>Anemi.</b> [Hb] 8 g/dL: CaO₂ 10,8 mL/100 mL, CO sabitse ḊO₂ 540 mL/dk. Gerçekte CO kompansatuvar olarak artar; bunda viskozitenin azalması da rol oynar. [[K1 s. 75]]</li>
    <li><b>Perioperatif bağlantıyla bitirin.</b> V̇O₂'yi artıranlar (cerrahi, ağrı, inflamasyon, titreme) ve anestezinin dengeleyen etkileri; majör cerrahiden sonra istirahat V̇O₂'si %50 artar ve günlerce sürer; rezerv en iyi KPET ile değerlendirilir. [[K1 s. 75–76]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim V̇O₂–ḊO₂ grafiğidir: x ekseni ḊO₂, y ekseni V̇O₂ (mL/dk); 250 mL/dk'da yatay bir plato ve onun solunda orijine inen bir doğru. Kırılma noktasını “kritik ḊO₂ = anaerobik eşik” diye, iki bölgeyi “sunuma bağımlı” ve “sunumdan bağımsız” diye adlandırın. Normal çalışma noktasını ḊO₂ 1000 mL/dk'da işaretleyin; orijinden bu noktaya çizilen doğrunun eğimi OER'dir. Üstüne, çok daha yüksek bir ḊO₂'de sunuma bağımlı olan kritik hastalık eğrisini ekleyin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> V̇O₂'yi klinikte nasıl ölçersiniz, neden miks venöz kan gerekir? Anemik hastada kalp debisi neden artar? Kalp neden iskemiye bu kadar duyarlıdır? SvO₂ düşerse bu sunum ve tüketim hakkında ne söyler? Genel anestezi V̇O₂'yi hangi yollarla azaltır? Ameliyattan önce kardiyopulmoner rezervi nasıl değerlendirirsiniz? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 74–76]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d17-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>V̇O₂, vücudun dakikada tükettiği oksijendir; 70 kg'lık erkekte istirahatte ≈250 mL/dk. Ters Fick ilkesiyle hesaplanır: CO × (CaO₂ − CvO₂) × 10; CvO₂ miks venöz kanda, pulmoner arter kateteriyle ölçülür. [[K1 s. 74]]</li>
    <li>ḊO₂ = CO × CaO₂ × 10 (10 birim katsayısı); tipik değerlerle CaO₂ 20,0 mL/100 mL ve ḊO₂ 1000 mL/dk. [[K1 s. 74]]</li>
    <li>[Hb] 8 g/dL'de CO sabit kalsa ḊO₂ 540 mL/dk'ya iner; gerçekte CO kompansatuvar olarak artar, kısmen kanın viskozitesi azaldığı için. [[K1 s. 75]]</li>
    <li>OER = V̇O₂/ḊO₂: normalde 0,2–0,3 ve SvO₂ %70–80. Kalpte ≈0,6 olduğu için miyokard iskemiye duyarlıdır; karotis cisimciklerinde düşüktür. [[K1 s. 75]]</li>
    <li>Kritik ḊO₂'ye (anaerobik eşik) kadar V̇O₂ sunumdan bağımsızdır; altında sunuma bağımlıdır ve enerji anaerobik yollardan sağlanır. [[K1 s. 75]]</li>
    <li>Ağır sepsiste ve ARDS'de V̇O₂ çok daha yüksek bir ḊO₂'de sunuma bağımlı olur. Erken hedefe yönelik tedaviyle ilgili daha yeni randomize çalışmaların sonuçları çelişkilidir. [[K1 s. 75]]</li>
    <li>Perioperatif V̇O₂ cerrahi, ağrı ve anksiyete, inflamasyon ve titremeyle artar; anestezide sedatifler, ventilasyon ve paralizi ile açlık bunun bir bölümünü dengeler. Majör cerrahiden sonra istirahat V̇O₂'si %50 artar ve günlerce sürer; kardiyopulmoner rezervi en iyi KPET değerlendirir. [[K1 s. 75–76]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="17"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/16">← Bölüm 16 · Akciğerde ventilasyon–perfüzyon zonları</a>
    <a href="#/dersler/fizyoloji/18">Sonraki: Bölüm 18 · Alveoler gaz denklemi →</a>
  </nav>
</section>`,
};
