/* Fizyoloji Bölüm 12 · Statik akciğer hacimleri (K1 İngilizce baskı s. 50–55).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz12.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz12-1'] = {
  no: 1, kok: 'Akciğer hacimleri ve kapasiteleri için (kitaptaki ayakta duran 70 kg erkek değerleriyle):', kagit: 'Paper A · fizyoloji, Bölüm 12', kaynak: '[[K1 s. 50–52]]',
  onermeler: [
    { t: 'Vital kapasite rezidüel hacmi de içerir.', d: false, n: 'Yanlış. Vital kapasite ERV + VT + IRV toplamıdır (4500 mL). Dört kapasiteden rezidüel hacmi içerenler FRC (RV + ERV) ve TLC\'dir (RV + ERV + VT + IRV). [[K1 s. 50]]' },
    { t: 'Fonksiyonel rezidüel kapasite, rezidüel hacim ile ekspiratuvar rezerv hacminin toplamıdır.', d: true, n: 'Doğru. FRC = RV + ERV = 1500 + 1500 = 3000 mL. [[K1 s. 50]]' },
    { t: 'İnspiratuvar kapasite, tidal hacim ile inspiratuvar rezerv hacminin toplamıdır ve yaklaşık 3000 mL\'dir.', d: true, n: 'Doğru. IC = VT + IRV = 500 + 2500 = 3000 mL; yani FRC\'den TLC\'ye kadar alınabilen hacimdir. [[K1 s. 50]]' },
    { t: 'Total akciğer kapasitesi spirometreyle doğrudan ölçülebilir.', d: false, n: 'Yanlış. Rezidüel hacim maksimal ekspirasyondan sonra akciğerde kalır, spirometreye hiç ulaşmaz; bu yüzden onu içeren TLC ve FRC spirometriyle doğrudan ölçülemez. Gaz dilüsyonu, vücut pletismografisi ya da çok soluklu N₂ yıkama gerekir. [[K1 s. 52]]' },
    { t: '70 kg\'lık bir erişkinde normal tidal hacim yaklaşık 7 mL/kg\'dır.', d: true, n: 'Doğru. Normal VT yaklaşık 500 mL, yani 7 mL/kg\'dır. Akciğer koruyucu ventilasyonda hedef 6 mL/kg\'dır; geleneksel strateji 12 mL/kg idi. [[K1 s. 51]]' },
  ],
};
VERI.sorular['fiz12-2'] = {
  no: 2, kok: 'Fonksiyonel rezidüel kapasite (FRC) için:', kagit: 'Paper A · fizyoloji, Bölüm 12', kaynak: '[[K1 s. 51–52]]',
  onermeler: [
    { t: 'FRC\'de akciğerin içe doğru elastik geri çekilmesi, göğüs duvarının dışa doğru yaylanmasına eşit ve zıttır.', d: true, n: 'Doğru. Ekspirasyon sonunda solunum kasları gevşektir ve iki kuvvet dengededir; FRC tidal solunumun başlangıç noktasıdır. [[K1 s. 51]]' },
    { t: 'Genel anestezi FRC\'yi yalnızca kontrollü ventilasyon sırasında azaltır.', d: false, n: 'Yanlış. Anestezi FRC\'yi ventilasyonun spontan ya da kontrollü olmasından bağımsız olarak azaltır. Nedeni bilinmez; göğüs kafesi kas tonusunun azalması ve fizyolojik PEEP\'in kaybıyla ilişkili olduğu düşünülür. [[K1 s. 51]]' },
    { t: 'Amfizem, içe doğru elastik geri çekilmeyi artırarak FRC\'yi azaltır.', d: false, n: 'Yanlış. Amfizemde akciğerin elastik dokusu yıkılır ve içe doğru geri çekilme azalır; denge daha yüksek bir hacimde kurulur, FRC artar ("fıçı göğüs"). [[K1 s. 51–52]]' },
    { t: 'Pulmoner vasküler direnç FRC düzeyinde en düşüktür.', d: true, n: 'Doğru. FRC\'de akciğer kompliyansı en yüksek, pulmoner vasküler direnç en düşük düzeydedir. [[K1 s. 51]]' },
    { t: 'Sırtüstü pozisyona geçmek FRC\'yi artırır.', d: false, n: 'Yanlış. Yalnızca sırtüstü yatmak FRC\'yi azaltır; kitaba göre azalma 1000 mL\'dir (ayakta 3000 mL, sırtüstü yaklaşık 2000 mL). [[K1 s. 51–52]]' },
  ],
};
VERI.sorular['fiz12-3'] = {
  no: 3, kok: 'FRC\'nin ölçümü ve kapanma kapasitesi için:', kagit: 'Paper A · fizyoloji, Bölüm 12', kaynak: '[[K1 s. 53–55]]',
  onermeler: [
    { t: 'Vücut pletismografisi, kapalı hava yollarının arkasında hapsolmuş gazı da ölçer.', d: true, n: 'Doğru. Boyle yasasına dayanan pletismografi, hapsolmuş gaz dahil akciğerdeki bütün gazı hesaba katar; gaz dilüsyonundan farkı budur. [[K1 s. 53]]' },
    { t: 'Helyum dilüsyon yöntemi, KOAH\'ta hava hapsi olduğunda FRC\'yi olduğundan yüksek ölçer.', d: false, n: 'Yanlış. Olduğundan düşük ölçer: helyum ağızla bağlantısı kesilmiş (hapsolmuş) alveollere ulaşamaz ve bu alveoller hesaba girmez. [[K1 s. 53]]' },
    { t: 'Çok soluklu N₂ yıkama testi, ekspire edilen N₂ konsantrasyonu %1\'in altına düştüğünde sona erer.', d: true, n: 'Doğru. Bu noktada akciğerdeki N₂\'nin neredeyse tamamı O₂ ile yer değiştirmiştir; toplanan gazdaki N₂ hacminden FRC hesaplanır. [[K1 s. 54]]' },
    { t: 'Kapanma kapasitesi, rezidüel hacim ile kapanma hacminin toplamıdır.', d: true, n: 'Doğru. CC bir kapasitedir, yani iki hacmin toplamıdır: RV + kapanma hacmi. Fowler yöntemiyle (tek soluk N₂ yıkama) ölçülür. [[K1 s. 55]]' },
    { t: 'Kapanma kapasitesi yaşla artar ve FRC\'ye sırtüstü pozisyonda, ayakta olduğundan daha genç yaşta ulaşır.', d: true, n: 'Doğru. Kitaba göre CC, sırtüstü 45, ayakta 60 yaşında FRC düzeyine ulaşır; sırtüstü pozisyonda FRC daha düşük olduğu için kesişme daha erken olur. [[K1 s. 55]]' },
  ],
};

const D12_NAV = [
  ['d12-tanim', 'Hacim ve kapasite'], ['d12-vt', 'Ventilatörde tidal hacim'], ['d12-frc', 'FRC neden önemli?'],
  ['d12-etken', 'FRC\'yi değiştirenler'], ['d12-preoks', 'Preoksijenasyon'], ['d12-he', 'Gaz dilüsyonu'],
  ['d12-pleth', 'Vücut pletismografisi'], ['d12-n2', 'N₂ yıkama'], ['d12-cc', 'Kapanma kapasitesi'],
  ['d12-p1', 'Part I'], ['d12-p2', 'Part II'], ['d12-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/12'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 12', baslik: 'Statik akciğer hacimleri',
  lede: 'Dört hacim ve dört kapasite, anestezistin her gün kullandığı sayılardır. Fonksiyonel rezidüel kapasite (FRC) apnede oksijen deposudur; kapanma kapasitesi (CC) küçük hava yollarının kapanmaya başladığı hacimdir. [[K1 s. 50–55]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D12_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d12-tanim">
  <h2>Akciğer hacmi ile akciğer kapasitesi arasındaki fark</h2>
  <p class="intro">Akciğer <b>hacmi</b> doğrudan ölçülür (spirometreyle ya da gaz dilüsyonuyla); <b>kapasite</b> ise iki ya da daha çok hacmin toplamıdır, yani türetilmiş bir değerdir. [[K1 s. 50]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Spirogram: dört hacim, dört kapasite</h3></div>
    <div data-viz="f12_spiro"></div>
    <p class="viz-cap" aria-live="polite">Kaydı oynatın ya da bir terime basın: grafikte kapladığı aralık, tanımı ve değeri görünür. "Spirometre neyi ölçer?" görünümü, spirometrenin göremediği hacmi ayırır. [[K1 s. 50, 52]]</p>
    <p class="viz-foot">Şematik spirogram; değerler ayakta duran 70 kg'lık erkek için [[K1 s. 50]].</p>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl f12-tbl">
      <thead><tr><th>Hacim ya da kapasite</th><th>Tanımı ya da bileşimi</th><th class="num">Ayakta, 70 kg erkek</th></tr></thead>
      <tbody>
        <tr><td colspan="3" class="small muted"><b>Dört hacim</b> · doğrudan ölçülür [[K1 s. 50]]</td></tr>
        <tr><th>VT <span class="small muted" style="font-weight:500">· Tidal hacim</span></th><td>Normal, sakin solunumda her solukta inspire edilen hava</td><td class="num">500 mL</td></tr>
        <tr><th>IRV <span class="small muted" style="font-weight:500">· İnspiratuvar rezerv hacmi</span></th><td>VT'nin üstüne ek olarak inspire edilebilen hava</td><td class="num">2500 mL</td></tr>
        <tr><th>ERV <span class="small muted" style="font-weight:500">· Ekspiratuvar rezerv hacmi</span></th><td>Normal tidal ekspirasyondan sonra ek olarak ekspire edilebilen hava</td><td class="num">1500 mL</td></tr>
        <tr><th>RV <span class="small muted" style="font-weight:500">· Rezidüel hacim</span></th><td>Maksimal ekspirasyondan sonra akciğerde kalan hava</td><td class="num">1500 mL</td></tr>
        <tr><td colspan="3" class="small muted"><b>Dört kapasite</b> · hacimlerin toplamı, türetilmiş [[K1 s. 50]]</td></tr>
        <tr><th>FRC <span class="small muted" style="font-weight:500">· Fonksiyonel rezidüel kapasite</span></th><td>RV + ERV</td><td class="num">3000 mL</td></tr>
        <tr><th>IC <span class="small muted" style="font-weight:500">· İnspiratuvar kapasite</span></th><td>VT + IRV</td><td class="num">3000 mL</td></tr>
        <tr><th>VC <span class="small muted" style="font-weight:500">· Vital kapasite</span></th><td>ERV + VT + IRV</td><td class="num">4500 mL</td></tr>
        <tr><th>TLC <span class="small muted" style="font-weight:500">· Total akciğer kapasitesi</span></th><td>RV + ERV + VT + IRV</td><td class="num">6000 mL</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d12-vt">
  <h2>Klinik önem: mekanik ventilasyonda tidal hacim</h2>
  <p class="intro">Normal VT, 70 kg'lık erişkinde yaklaşık 500 mL, yani 7 mL/kg'dır; ventilatörde akciğer iki yolla yaralanabilir: fazla hacimle ve yüksek basınçla. [[K1 s. 51]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Ventilatörle ilişkili akciğer hasarı: hacim ve basınç sınırları</h3></div>
    <div data-viz="f12_vt"></div>
    <p class="viz-cap" aria-live="polite">Soldaki ölçek tidal hacmi (mL/kg), ortadaki hava yolu basıncını gösterir; sağdaki yol, koruyucu sınırlar yetmediğinde ne yapılacağını özetler. Bir işarete basın. [[K1 s. 51]]</p>
    <p class="viz-foot">Şematik; sayılar kitaptandır [[K1 s. 51]].</p>
  </div>
  <div class="card clin" style="margin-top:16px">
    <p><b>Volütravma</b>, akciğerin aşırı gerilmesinin yaptığı yaygın alveoler hasardır. Geleneksel olarak verilen 12 mL/kg'lık tidal hacmin bugün volütravmaya ve akciğer hasarına yol açtığı düşünülür; düşük VT'li strateji (6 mL/kg) akut solunum sıkıntısı sendromunda (ARDS) mortaliteyi azalttığı için yoğun bakımların çoğunda benimsenmiştir. [[K1 s. 51]]</p>
    <p style="margin-top:8px"><b>Barotravma</b>, yüksek hava yolu basıncının yaptığı hasardır; önlemek için tepe basıncı (Ppeak) 35, plato basıncı (Pplat) 30 cmH₂O'nun altında tutulur. [[K1 s. 51]]</p>
    <p style="margin-top:8px">Kompliyansı çok düşük akciğerde (ör. ARDS) bu sınırlar (VT 6 mL/kg, Pplat ≤ 30 cmH₂O) normokapniyi sürdürecek alveoler ventilasyonu (V̇A) sağlamayabilir. O zaman VT ya da inspiratuvar basınç artırılıp yeni volütravma ve barotravma riski alınmaz, <b>permisif hiperkapniye</b> izin verilir. Bu yaklaşımın bütününe akciğer koruyucu ventilasyon stratejisi denir. [[K1 s. 51]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d12-frc">
  <h2>FRC neden önemli?</h2>
  <p class="intro">FRC tidal solunumun başlangıç noktasıdır: ekspirasyon sonunda solunum kasları gevşekken akciğer parankiminin içe doğru elastik kuvveti, göğüs duvarının dışa yaylanma kuvvetine tam olarak eşit ve zıttır (<a href="#/dersler/fizyoloji/07">Bölüm 7</a>). [[K1 s. 51]]</p>
  <div class="viz">
    <div class="viz-head"><h3>FRC olmasaydı ne olurdu?</h3></div>
    <div data-viz="f12_onem"></div>
    <p class="viz-cap" aria-live="polite">"FRC var" ile "FRC yok" arasında geçin: alveolün boyutunu, PAO₂ eğrisini ve kapiller kanın oksijenlenmesini karşılaştırın. Sağdaki küçük grafik FRC'nin mekanik açıdan neden en uygun hacim olduğunu gösterir. [[K1 s. 51]]</p>
    <p class="viz-foot">Şematik ve ölçeksiz; yalnız yönler kitaptandır [[K1 s. 51]].</p>
  </div>
  <p style="margin-top:14px">Fizyolojik olarak üç nedenle önemlidir: [[K1 s. 51]]</p>
  <ul style="margin-top:6px">
    <li><b>O₂ tamponu.</b> O₂ alveolden kapillere sürekli difüze olur. FRC olmasaydı havalanan alveol ve akciğerdeki O₂ azalır, PAO₂ ekspirasyonda düşer; kapiller kan aralıklı olarak, yalnız inspirasyonda tam oksijenlenirdi. [[K1 s. 51]]</li>
    <li><b>Alveol kollapsını önler.</b> Ekspirasyon rezidüel hacme kadar sürseydi alveoller kollabe olurdu. Atelektazi V̇/Q̇ uyumsuzluğu ve hipoksemi yapar; atelektatik alveolleri her solukta yeniden açmak solunum işini belirgin artırırdı. [[K1 s. 51]]</li>
    <li><b>En uygun mekanik.</b> Akciğer kompliyansı FRC'de en yüksek, pulmoner vasküler direnç en düşüktür (Bölüm 23). [[K1 s. 51]]</li>
  </ul>
  <p style="margin-top:10px;max-width:78ch">Anestezist için iki nedenle kritiktir: FRC tidal solunumdaki PAO₂ dalgalanmalarını tamponlamanın ötesinde indüksiyon gibi apne dönemlerinde O₂ deposudur; kapanma kapasitesinin (CC) altına düşerse küçük hava yolları kapanır, V̇/Q̇ uyumsuzluğu ve hipoksemi gelişir. [[K1 s. 51]]</p>
</section>

<section class="wrap blk ders-sec" id="d12-etken">
  <h2>FRC'yi hangi etkenler değiştirir?</h2>
  <p class="intro">FRC sabit değildir: cerrahi, anestezi ve hastaya ait etkenler iki kuvvetin dengesini kaydırarak FRC'yi azaltır ya da artırır. [[K1 s. 51]]</p>
  <div class="viz">
    <div class="viz-head"><h3>FRC bir denge hacmidir: etkenler dengeyi nasıl kaydırır?</h3></div>
    <div data-viz="f12_denge"></div>
    <p class="viz-cap" aria-live="polite">Bir pozisyon ve bir etken seçin: kuvvetlerden biri değişince iki doğrunun kesiştiği denge noktası, yani FRC, kayar. [[K1 s. 51–52]]</p>
    <p class="viz-foot">Şematik iki yay modeli; kuvvetler ölçeksizdir. Sayısal değer yalnız ayakta (3000 mL) ve sırtüstü (yaklaşık 2000 mL) FRC için kitaptandır [[K1 s. 50–52]]; öteki etkenlerde kitaptan alınan yalnız yöndür.</p>
  </div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag crit">FRC azalır</span>
      <ul style="margin-top:8px">
        <li><b>Pozisyon:</b> yalnız sırtüstü yatmak FRC'yi 1000 mL azaltır. [[K1 s. 51]]</li>
        <li><b>Karın içi basıncı artışı:</b> obezite, gebelik, akut batın, laparoskopik cerrahi. [[K1 s. 51]]</li>
        <li><b>Anestezi:</b> ventilasyon spontan da olsa kontrollü de olsa. Nedeni bilinmez; göğüs kafesi kas tonusunun azalması ve fizyolojik pozitif ekspirasyon sonu basıncının (PEEP) kaybıyla ilişkili olduğu düşünülür. [[K1 s. 51]]</li>
        <li><b>Küçük yaş:</b> yenidoğan, bebek ve küçük çocuk. [[K1 s. 51]]</li>
        <li><b>Akciğer hastalığı:</b> pulmoner fibrozis, pulmoner ödem, atelektazi, ARDS. [[K1 s. 51]]</li>
      </ul>
    </div>
    <div class="card"><span class="tag ok">FRC artar</span>
      <ul style="margin-top:8px">
        <li><b>PEEP:</b> FRC'yi intraoperatif korumak için sık kullanılır; özellikle pediatrik anestezide ve fizyolojik PEEP'in kaybolduğu entübasyondan sonra (<a href="#/dersler/fizyoloji/07">Bölüm 7</a>). [[K1 s. 51]]</li>
        <li><b>Amfizem:</b> elastik doku yıkılır, içe geri çekilme azalır; denge daha yüksek bir hacimde kurulur ve "fıçı göğüs" gelişir. [[K1 s. 51–52]]</li>
        <li><b>Artan yaş:</b> yaşlıda elastik doku azdır; FRC amfizemdeki gibi artar. [[K1 s. 52]]</li>
        <li><b>Astım:</b> hava hapsi ve yüksek intrinsik PEEP. [[K1 s. 52]]</li>
      </ul>
    </div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Sırtüstü pozisyonda ve karın içi basıncı arttığında FRC'yi düşüren, karın içeriğinin diyaframı göğse doğru itmesidir. Fibroziste ise sertleşen akciğerin içe doğru geri çekilmesi artar.</div>
</section>

<section class="wrap blk ders-sec" id="d12-preoks">
  <h2>Klinik önem: genel anestezi için preoksijenasyon</h2>
  <p class="intro">Apnede akciğerdeki O₂ deposu tüketim hızıyla boşalır; preoksijenasyon FRC'deki N₂'yi O₂ ile değiştirerek bu depoyu büyütür. [[K1 s. 52]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Apnede FRC: oksijen deposu ne kadar dayanır?</h3></div>
    <div data-viz="f12_apne"></div>
    <p class="viz-cap" aria-live="polite">Soluduğu gazı, FRC'yi ve O₂ tüketimini seçip apneyi başlatın; "Preoksijenasyonu oynat" N₂'nin yerini O₂'nin alışını gösterir. [[K1 s. 52]]</p>
    <p class="viz-foot">Model: depo = FRC × alveoler O₂ oranı, süre = depo ÷ O₂ tüketimi. Oran hava solurken 0,15 (3000 mL FRC kitabın 450 mL'lik akciğer deposunu verir [[K1 s. 30, 50]]), preoksijenasyondan sonra 0,9'dur (2000 mL'de 1800 mL [[K1 s. 52]]). Bu basit bölme sırtüstü erişkinde 1,2 ve 7,2 dakika verir; kitap yaklaşık 8 dakika verir. Kan deposu ve apneik oksijenasyon hesaba katılmamıştır.</p>
  </div>
  <div class="card clin" style="margin-top:16px">
    <p>Sırtüstü yatan normal erişkin (FRC ≈ 2000 mL) tipik O₂ tüketimiyle (250 mL/dk) akciğerindeki O₂'yi 1 dakikadan biraz uzun sürede tüketir; FRC'si azalmış ya da O₂ tüketimi artmış hastada kritik hipoksemi daha da hızlı gelişir. [[K1 s. 52]]</p>
    <p style="margin-top:8px">Preoksijenasyonda hasta indüksiyondan önce bir süre (geleneksel olarak 3 dakika) %100 O₂ solur ve FRC'deki N₂ molekülleri zamanla yerini O₂'ye bırakır. FRC'si O₂ ile dolan aynı hastanın akciğerinde 1800 mL O₂ bulunur (alveollerde CO₂ de olduğu için 2000 mL'nin biraz altı); bu depo, hava yolunu hipoksemi başlamadan güvenceye almak için yaklaşık 8 dakika verir. [[K1 s. 52]]</p>
    <p style="margin-top:8px">Tüketilen her beş O₂ molekülüne karşılık dört CO₂ molekülü üretilir (solunum katsayısı 0,8; Bölüm 18); bu yüzden apnede akciğerlerin toplam hacmi azalır. Hava yolu açıksa ve %100 O₂ veriliyorsa O₂ tüketildikçe akciğere ek O₂ çekilir ve hipoksemiye kadar geçen süre daha da uzar. Beyin sapı ölümü testindeki apne testinde aspirasyon kateteriyle akciğere O₂ verilmesi bu ilkeye dayanır. [[K1 s. 52]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d12-he">
  <h2>Spirometre neyi ölçemez? Gaz dilüsyonu</h2>
  <p class="intro">Rezidüel hacim maksimal ekspirasyondan sonra da akciğerde kaldığı için spirometreye hiç ulaşmaz; bu yüzden RV ve onu içeren <b>FRC ile TLC</b> spirometriyle doğrudan ölçülemez, öteki bütün hacimler ölçülür. FRC üç yöntemden biriyle hesaplanır: gaz dilüsyonu, vücut pletismografisi ve çok soluklu N₂ yıkama. [[K1 s. 52]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Helyum dilüsyonu adım adım</h3></div>
    <div data-viz="f12_he"></div>
    <p class="viz-cap" aria-live="polite">Adımları izleyin: kapak açılır, He akciğerle spirometre arasında dağılır, C₂ ölçülür ve FRC hesaplanır. "Hava hapsi"ni açıp hesabın nasıl değiştiğine bakın. [[K1 s. 53]]</p>
    <p class="viz-foot">Şematik. Spirometre hacmi (3000 mL) ve başlangıç He konsantrasyonu (%10) örnek için seçilmiştir, kitapta sayı yoktur; denklem kitaptandır [[K1 s. 53]].</p>
  </div>
  <p style="margin-top:14px;max-width:78ch">Hasta inert bir gaz olan helyumu (He) bir spirometre üzerinden solur. Kitaba göre He alveol–kapiller bariyerden geçmez; konsantrasyonundaki düşüş bu yüzden vücuda emilimle değil, akciğerdeki dağılımla açıklanır. Tidal ekspirasyonun sonunda bilinen He konsantrasyonundaki spirometre hastaya açılır; hasta He dengelenene kadar onun üzerinden soluk alıp verir ve spirometredeki yeni konsantrasyon ölçülür. [[K1 s. 52–53]]</p>
  <p style="margin-top:8px;max-width:78ch">Mol sayısı = konsantrasyon × hacim olduğundan başlangıçtaki He miktarı (spirometre hacmi V₁ × konsantrasyon C₁), dengeden sonra V₁ + FRC hacmine dağılan miktara (yeni konsantrasyon C₂) eşittir: [[K1 s. 53]]</p>
  <p style="margin-top:8px;font-size:18px"><b>C₁V₁ = C₂(V₁ + FRC) &nbsp;⇒&nbsp; FRC = V₁ × (C₁ − C₂) / C₂</b></p>
  <p style="margin-top:8px;max-width:78ch">Spirometre tam bir inspirasyondan sonra (TLC'de) açılırsa hesap TLC'yi verir. Yöntem He'nin akciğerdeki bütün havayla dengelenmesine, yani bütün hava yollarının açık olmasına dayanır. Kronik obstrüktif akciğer hastalığındaki (KOAH) hava hapsinde alveoler havanın bir kısmı ağızla bağlantılı değildir; He bu alveollere ulaşamaz, onlar hesaba girmez ve hacim olduğundan düşük çıkar. [[K1 s. 53]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> He aslında alveol–kapiller zardan geçebilir; seçilmesinin nedeni kanda çözünürlüğünün çok düşük olması, bu yüzden test süresince kana geçen miktarın önemsiz kalmasıdır.</div>
</section>

<section class="wrap blk ders-sec" id="d12-pleth">
  <h2>FRC vücut pletismografisiyle nasıl hesaplanır?</h2>
  <p class="intro">Vücut pletismografisi, gaz dilüsyonunun tersine kapalı hava yollarının arkasında hapsolmuş gaz dahil akciğerdeki bütün gazı ölçer. İlkesi <b>Boyle yasasıdır</b>: sabit sıcaklıkta, sabit kütledeki bir gazın hacmi mutlak basıncıyla ters orantılıdır (P × V = sabit). [[K1 s. 53–54]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Vücut kabini: Boyle yasası iki kez</h3></div>
    <div data-viz="f12_pleth"></div>
    <p class="viz-cap" aria-live="polite">Adımları izleyin: kapak kapanır, hasta kapalı ağızlığa karşı soluk almaya çalışır; ağız basıncı düşerken kabin basıncı yükselir. Önce kabin için ΔV, sonra akciğer için FRC hesaplanır. [[K1 s. 54]]</p>
    <p class="viz-foot">Şematik. Kabin gaz hacmi (500 L), ΔV ve başlangıç basıncı (101,3 kPa) örnek için seçilmiştir; denklemler kitaptandır [[K1 s. 54]]. Basınçlar mutlaktır, gerçek değişiklikler çok küçüktür. Kapak kapalıyken hava akımı olmadığı için modelde ağızlık basıncı alveol basıncına eşit alınır.</p>
  </div>
  <p style="margin-top:14px;max-width:78ch">Hasta hava geçirmez büyük bir kutuda ("vücut kabini") oturur ve kapaklı, basınç transdüserli bir ağızlıktan solur; kabin duvarında da bir basınç transdüseri vardır. Normal ekspirasyonun sonunda, akciğer FRC'deyken kapak kapanır. Hasta kapalı ağızlığa karşı soluk almaya çalışınca göğüs kafesinin ön–arka çapı artar ve akciğerdeki gaz genişler; kabin hacmi aynı miktarda azalır ve hava geçirmez kabinin basıncı yükselir; bu artışı duvardaki transdüser ölçer. [[K1 s. 53–54]]</p>
  <div class="cols" style="margin-top:12px">
    <div class="card"><span class="tag basic">Önce kabin</span><p style="margin-top:8px">Kapak kapanmadan önce kabin basıncı P₁ ve hacmi V₁, inspirasyon çabasından sonra kabin basıncı P₂ ölçülür; buradan kabindeki hacim değişikliği ΔV hesaplanır: [[K1 s. 54]]</p><p style="margin-top:8px;font-size:17px"><b>P₁V₁ = P₂(V₁ − ΔV)</b></p></div>
    <div class="card"><span class="tag basic">Sonra akciğer</span><p style="margin-top:8px">Ağızlık basıncı önce P₃, çabadan sonra P₄'tür; akciğerdeki hacim artışı kabindeki azalmaya (ΔV) eşittir. Bütün hesapları gerçekte bilgisayar yapar. [[K1 s. 54]]</p><p style="margin-top:8px;font-size:17px"><b>P₃ × FRC = P₄(FRC + ΔV) &nbsp;⇒&nbsp; FRC = P₄ΔV / (P₃ − P₄)</b></p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d12-n2">
  <h2>FRC çok soluklu nitrojen yıkamayla nasıl hesaplanır?</h2>
  <p class="intro">Hasta %100 O₂ solurken akciğerdeki N₂ soluk soluk dışarı alınıp toplanır; toplanan N₂ miktarından FRC hesaplanır. [[K1 s. 54–55]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Çok soluklu N₂ yıkama</h3></div>
    <div data-viz="f12_n2"></div>
    <p class="viz-cap" aria-live="polite">Yıkamayı oynatın: her solukta ekspire edilen N₂ oranı düşer, toplanan N₂ hacmi artar; oran %1'in altına inince test biter ve FRC hesaplanır. [[K1 s. 54]]</p>
    <p class="viz-foot">Şematik: ideal karışım, ölü boşluk yok, tidal hacim 500 mL [[K1 s. 50]]; başlangıç N₂ oranı kuru havadaki %79'dur [[K1 s. 54]]. Hesap, alttaki notta düzeltilmiş denklemle yapılır.</p>
  </div>
  <p style="margin-top:14px;max-width:78ch">Normalde N₂ kuru inspire edilen havanın %79'udur. Spirometre devresinin ekspiratuvar kolunda bir N₂ analizörü vardır. Hasta önce oda havası solur; tidal ekspirasyonun sonunda (FRC'de) inspire edilen gaz %100 O₂'ye çevrilir. Bir sonraki ekshalasyondan başlayarak ekspire edilen bütün gaz analizörden geçer ve toplanır; hasta soludukça akciğerdeki N₂ yerini O₂'ye bırakır. [[K1 s. 54]]</p>
  <p style="margin-top:8px;max-width:78ch">Ekspire edilen N₂ %1'in altına düşünce, yani akciğerdeki N₂'nin tamamı O₂ ile yer değiştirince test biter. Toplam ekspire N₂ hacmi, toplanan gazın hacmi × içindeki N₂ konsantrasyonudur. Gaz dilüsyonu gibi bu yöntem de gaz hapsinde hacmi olduğundan düşük ölçer. Anatomik ölü boşluğu ve CC'yi ölçen tek soluk N₂ yıkamadan (Fowler yöntemi, <a href="#/dersler/fizyoloji/11">Bölüm 11</a>) farklıdır. [[K1 s. 54]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu (kitap hatası).</b> Kitap denklemi FRC = toplam ekspire N₂ hacmi × [N₂]f / [N₂]i diye verir ([N₂]f son, [N₂]i başlangıç N₂ fraksiyonu); N₂ miktarının korunmasından doğrusu <b>FRC = V(N₂) / ([N₂]i − [N₂]f) ≈ V(N₂) / [N₂]i</b>'dir. Örneğin FRC 3000 mL iken 0,79'dan 0,01'e yıkamada 2340 mL N₂ toplanır ve 2340 ÷ 0,78 = 3000 mL eder; kitaptaki biçim yaklaşık 30 mL verir. [[K1 s. 55]]</div>
</section>

<section class="wrap blk ders-sec" id="d12-cc">
  <h2>Kapanma kapasitesi (CC) ve acil anestezi</h2>
  <p class="intro">Kapanma kapasitesi, ekspirasyonda bazal küçük hava yollarının kapanmaya başladığı akciğer hacmidir; FRC'nin altında kaldıkça sorun yaratmaz, FRC'yi aşınca hava yolları tidal solunumda kapanır. [[K1 s. 55]]</p>
  <div class="viz">
    <div class="viz-head"><h3>CC, FRC'yi ne zaman aşar?</h3></div>
    <div data-viz="f12_kapanma"></div>
    <p class="viz-cap" aria-live="polite">Yaşı ve pozisyonu değiştirin, FRC'yi azaltan etkenleri ekleyin ya da "RSI olgusu"na basın; sağdaki akciğerde hangi kattaki hava yollarının kapandığına bakın. [[K1 s. 55]]</p>
    <p class="viz-foot">Şematik; dikey eksen ölçeksizdir. Kitaptan alınanlar: CC'nin yaşla artması, FRC'ye sırtüstü 45, ayakta 60 yaşında ulaşması ve kapanmanın bazal hava yollarında başlaması [[K1 s. 55]]; FRC'yi azaltan etkenlerin yönü [[K1 s. 51]]. FRC'nin yaşla artışı [[K1 s. 52]] modelde gösterilmez.</p>
  </div>
  <p style="margin-top:14px;max-width:78ch">Akciğer yer çekiminden etkilenir: dik duranda parankim apekslerde daha gergin, bazallerde daha sıkışıktır. Sıkışan bazal hava yollarının yarıçapı küçüktür; aktif ekspirasyonda ilk onlar kapanır ve V̇/Q̇ uyumsuzluğu başlar. Bunun olduğu hacim CC'dir; bir kapasite olarak iki hacmin toplamıdır: <b>rezidüel hacim + kapanma hacmi</b>. Fowler yöntemiyle (tek soluk N₂ yıkama, <a href="#/dersler/fizyoloji/11">Bölüm 11</a>) ölçülür. [[K1 s. 55]]</p>
  <p style="margin-top:8px;max-width:78ch">Genç, sağlıklı erişkinde CC FRC'nin oldukça altındadır. CC iki yoldan FRC'yi aşar: FRC normalden düşüktür (yukarıdaki nedenlerle; ör. yenidoğanda) ya da CC artmıştır (yaşla artar; FRC'ye sırtüstü 45, ayakta 60 yaşında ulaşır). O zaman hava yolları normal tidal solunumda kapanır; sonuç V̇/Q̇ uyumsuzluğu ve hipoksemidir. Kapanan hava yollarının her inspirasyonda yeniden açılması solunum işini belirgin artırır; yaşlıları ve çok küçük çocukları solunum yetmezliğine yatkın kılan etkenlerden biri budur. [[K1 s. 55]]</p>
  <div class="card clin" style="margin-top:16px">
    <span class="tag clin">Klinik önem · acil anestezi</span>
    <p style="margin-top:8px">Acil laparotomi için hızlı ardışık indüksiyon (RSI) bekleyen, akut batınlı ve sırtüstü yatan 65 yaşında bir hastada FRC belirgin azalmıştır (sırtüstü pozisyon, akut batın), CC ise artmıştır (65 yaşında olağan olarak FRC'yi aşar). KOAH ya da obezite gibi eşlik eden hastalıklar hesaba katılmadan bile tidal solunumda küçük hava yolları kapanır ve V̇/Q̇ uyumsuzluğu gelişir. [[K1 s. 55]]</p>
    <p style="margin-top:8px">RSI'dan önce en az 3 dakika %100 O₂ verilmelidir; FRC'yi en üst düzeye çıkarmak için preoksijenasyon ve indüksiyon hasta 45° oturur pozisyondayken yapılabilir. Preoksijenasyon yetersizse hızlı ve derin hipoksemi beklenir. Yüksek akımlı nazal oksijen, apne ve laringoskopi girişimleri boyunca oksijenasyonu sürdürür. [[K1 s. 55]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d12-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sayılar ve yönler üzerinden sorulur: dört hacmin ve dört kapasitenin değerleri ve bileşimi, spirometrenin neyi ölçemediği (RV, FRC, TLC), FRC'yi azaltan ve artıran etkenler, preoksijenasyonun sayıları, üç ölçüm yönteminin ilkesi ve hava hapsindeki davranışı, CC'nin tanımı ve FRC'ye ulaştığı yaşlar. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz12-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz12-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz12-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d12-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Akciğer hacimlerini ve kapasitelerini bir spirogram üzerinde çizin. Fonksiyonel rezidüel kapasite nedir, anestezist için neden önemlidir ve nasıl ölçülür?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım ve sayılar.</b> Hacim doğrudan ölçülür, kapasite iki ya da daha çok hacmin toplamıdır. VT 500, IRV 2500, ERV 1500, RV 1500 mL; FRC 3000, IC 3000, VC 4500, TLC 6000 mL (ayakta, 70 kg erkek). [[K1 s. 50]]</li>
    <li><b>Spirogramı çizin.</b> Sakin soluklar, bir maksimal inspirasyon ve bir maksimal ekspirasyon; hacimleri bir yana, kapasiteleri öbür yana yazın. RV'nin spirometreye hiç ulaşmadığını, bu yüzden RV, FRC ve TLC'nin spirometriyle ölçülemediğini söyleyin. [[K1 s. 50, 52]]</li>
    <li><b>FRC'nin fizyolojisi.</b> Tidal solunumun başlangıç noktası: içe elastik geri çekilme ile göğüs duvarının dışa yaylanması eşit ve zıttır. Üç önemi: O₂ tamponu, alveol kollapsını önleme, en yüksek kompliyans ve en düşük PVR. [[K1 s. 51]]</li>
    <li><b>Anestezist için.</b> Apnede O₂ deposu: sırtüstü FRC ≈ 2000 mL, VO₂ 250 mL/dk; hava solurken 1 dakikadan biraz uzun, preoksijenasyondan sonra (1800 mL O₂) yaklaşık 8 dakika. Apnede akciğer hacmi küçülür (RQ 0,8); açık hava yolundan O₂ çekilir. FRC CC'nin altına inerse küçük hava yolları kapanır. [[K1 s. 51–52]]</li>
    <li><b>FRC'yi değiştirenler.</b> Azaltanlar: sırtüstü (1000 mL), karın içi basıncı artışı, anestezi (spontan ya da kontrollü), küçük yaş, akciğer hastalığı. Artıranlar: PEEP, amfizem, artan yaş, astım. [[K1 s. 51–52]]</li>
    <li><b>Ölçüm.</b> Helyum dilüsyonu: C₁V₁ = C₂(V₁ + FRC). Vücut pletismografisi: Boyle yasası önce kabin için (ΔV), sonra akciğer için: FRC = P₄ΔV/(P₃ − P₄). Çok soluklu N₂ yıkama: ekspire edilen N₂ %1'in altına inene kadar. Hava hapsinde helyum dilüsyonu ve N₂ yıkama düşük ölçer, pletismografi bütün gazı ölçer. [[K1 s. 52–55]]</li>
    <li><b>CC ile bitirin.</b> CC = RV + kapanma hacmi; bazal hava yolları önce kapanır. CC yaşla artar (FRC'ye sırtüstü 45, ayakta 60 yaşında ulaşır). 65 yaşında akut batınlı RSI hastası: FRC düşük, CC yüksek; en az 3 dakika preoksijenasyon, 45° oturur pozisyon, yüksek akımlı nazal oksijen. [[K1 s. 55]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim spirogramdır: dikey eksen akciğer hacmi (L), yatay eksen zaman; sakin soluklar, maksimal inspirasyon ve maksimal ekspirasyon. Hacimleri ve kapasiteleri sayılarıyla işaretleyin, RV'yi taralı gösterip "spirometre görmez" yazın. Yaşlı hasta sorulursa aynı grafikte FRC'nin üstüne kesik çizgiyle CC'yi ekleyin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> RV neden spirometreyle ölçülemez? KOAH'lı bir hastada helyum dilüsyonu ile pletismografi neden farklı sonuç verir? Pletismografide ağız basıncı neden alveol basıncını gösterir? Anestezi FRC'yi neden azaltır? Apnede akciğer hacmi neden küçülür? Yaşlı hastada kapanma kapasitesi neden önemlidir? Akciğer koruyucu ventilasyonun sınırları nelerdir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 50–55]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d12-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Hacim doğrudan ölçülür, kapasite iki ya da daha çok hacmin toplamıdır. Ayakta 70 kg erkek: VT 500, IRV 2500, ERV 1500, RV 1500 mL; FRC 3000, IC 3000, VC 4500, TLC 6000 mL. [[K1 s. 50]]</li>
    <li>Normal VT ≈ 7 mL/kg. Akciğer koruyucu ventilasyon: VT 6 mL/kg (geleneksel 12 mL/kg), Ppeak &lt; 35 ve Pplat &lt; 30 cmH₂O, gerekirse permisif hiperkapni; düşük VT ARDS'de mortaliteyi azaltır. [[K1 s. 51]]</li>
    <li>FRC, içe elastik geri çekilme ile göğüs duvarının dışa yaylanmasının eşit olduğu hacimdir: O₂ tamponu, alveol kollapsını önler, kompliyans en yüksek ve PVR en düşük; apnede O₂ deposudur. [[K1 s. 51]]</li>
    <li>FRC'yi azaltanlar: sırtüstü pozisyon (1000 mL), karın içi basıncı artışı, anestezi (spontan ya da kontrollü), küçük yaş, akciğer hastalığı. Artıranlar: PEEP, amfizem, artan yaş, astım. [[K1 s. 51–52]]</li>
    <li>Sırtüstü erişkinde (FRC ≈ 2000 mL, VO₂ 250 mL/dk) akciğerdeki O₂ hava solurken 1 dakikadan biraz uzun sürede biter; 3 dakika %100 O₂ ile depo ≈ 1800 mL olur ve yaklaşık 8 dakika kazandırır. RQ 0,8 olduğu için apnede akciğer hacmi küçülür; açık hava yolundan ek O₂ çekilir. [[K1 s. 52]]</li>
    <li>Spirometre RV'yi, dolayısıyla FRC ve TLC'yi ölçemez. Helyum dilüsyonu (C₁V₁ = C₂(V₁ + FRC)) ve çok soluklu N₂ yıkama hava hapsinde düşük ölçer; vücut pletismografisi (Boyle: FRC = P₄ΔV/(P₃ − P₄)) hapsolmuş gazı da ölçer. [[K1 s. 52–54]]</li>
    <li>N₂ yıkama, ekspire edilen N₂ %1'in altına inince biter; FRC = toplanan N₂ hacmi ÷ ([N₂]i − [N₂]f) (kitaptaki denklem hatalı basılmıştır; Atlas notu). [[K1 s. 54–55]]</li>
    <li>CC = RV + kapanma hacmi; bazal hava yolları önce kapanır. CC yaşla artar ve FRC'ye sırtüstü 45, ayakta 60 yaşında ulaşır; yenidoğanda FRC düşük olduğu için CC FRC'yi aşar. 65 yaşında akut batınlı hastada RSI öncesi en az 3 dakika preoksijenasyon, 45° oturur pozisyon ve yüksek akımlı nazal oksijen. [[K1 s. 55]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="12"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/11">← Bölüm 11 · Ventilasyon ve ölü boşluk</a>
    <a href="#/dersler/fizyoloji/13">Sonraki: Bölüm 13 · Spirometri →</a>
  </nav>
</section>`,
};
