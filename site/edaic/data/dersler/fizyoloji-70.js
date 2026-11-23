/* Fizyoloji Bölüm 70 · Asit–baz fizyolojisi (K1 İngilizce baskı s. 329–337).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz70-1'] = {
  no: 1, kok: 'Asit–baz kimyası ve Henderson–Hasselbalch denklemi için:', kagit: 'Paper A · fizyoloji, Bölüm 70', kaynak: '[[K1 s. 329–330]]',
  onermeler: [
    { t: 'Güçlü asit, çözeltide yalnız kısmen ayrışan asittir.', d: false, n: 'Yanlış. Güçlü asit çözeltide tamamen ayrışır; kısmen ayrışan zayıf asittir. [[K1 s. 329]]' },
    { t: 'Arter pH\'ının 7,4\'ten 7,0\'a inmesi H⁺ konsantrasyonunu 40\'tan 100 nmol/L\'ye çıkarır.', d: true, n: 'Doğru. pH logaritmik olduğundan 0,4 birimlik düşüş [H⁺]\'nın iki katından fazla artması demektir. [[K1 s. 329]]' },
    { t: 'Bir asidin pKa\'sı ne kadar düşükse asit o kadar güçlüdür.', d: true, n: 'Doğru. Yüksek Ka daha çok ayrışma, yani daha çok serbest H⁺ demektir; pKa = −log₁₀Ka olduğundan düşük pKa güçlü asidi gösterir. [[K1 s. 330]]' },
    { t: 'HCO₃⁻/H₂CO₃ dengesinin pKa\'sı 7,4\'tür.', d: false, n: 'Yanlış. pKa 6,1\'dir; 7,4 normal plazma pH\'ıdır. [[K1 s. 330]]' },
    { t: 'HCO₃⁻ 24 mmol/L ve PaCO₂ 5,3 kPa değerleri Henderson–Hasselbalch denklemine konunca pH 7,4 bulunur.', d: true, n: 'Doğru. pH = 6,1 + log₁₀[24 / (0,23 × 5,3)] ≈ 7,4. [[K1 s. 330]]' },
  ],
};
VERI.sorular['fiz70-2'] = {
  no: 2, kok: 'Asit–baz bozuklukları, baz fazlası ve anyon açığı için:', kagit: 'Paper A · fizyoloji, Bölüm 70', kaynak: '[[K1 s. 330–332]]',
  onermeler: [
    { t: 'Metabolik asidozda baz fazlası negatiftir.', d: true, n: 'Doğru. Metabolik asidozda BE negatif, metabolik alkalozda pozitiftir; normal aralık −2 ile +2 mEq/L\'dir. [[K1 s. 331]]' },
    { t: 'Laparoskopide CO₂ insüflasyonu metabolik asidoz nedenidir.', d: false, n: 'Yanlış. Dışarıdan alınan CO₂ uçucu asittir; hiperkapnik, yani solunumsal asidoz yapar. [[K1 s. 331]]' },
    { t: 'Kronik gastrointestinal HCO₃⁻ kaybı anyon açığı yüksek metabolik asidoz yapar.', d: false, n: 'Yanlış. GİS\'ten HCO₃⁻ kaybı ve renal tübüler asidoz anyon açığı normal metabolik asidoz nedenleridir. [[K1 s. 332]]' },
    { t: 'Hipoalbüminemi anyon açığını düşürür; bu yüzden metabolik asidoz gözden kaçabilir.', d: true, n: 'Doğru. Albümin ölçülmeyen başlıca anyondur; yoğun bakım hastasında anyon açığı normal görünse de metabolik asidoz bulunabilir. [[K1 s. 332]]' },
    { t: 'Masif transfüzyonda sitratın metabolizması metabolik asidoz yapar.', d: false, n: 'Yanlış. Sitrat HCO₃⁻\'e metabolize olur ve metabolik alkaloz yapar. [[K1 s. 331]]' },
  ],
};
VERI.sorular['fiz70-3'] = {
  no: 3, kok: 'pH\'ın düzenlenmesi ve asit–baz bozukluklarının sonuçları için:', kagit: 'Paper A · fizyoloji, Bölüm 70', kaynak: '[[K1 s. 333–336]]',
  onermeler: [
    { t: 'Süzülen HCO₃⁻\'ün yaklaşık %80\'i toplayıcı kanalda geri emilir.', d: false, n: 'Yanlış. Yaklaşık %80\'i proksimal kıvrımlı tübülde, plazma pH\'ından bağımsız olarak geri emilir; geri kalanı distal tübül ve toplayıcı kanalda emilir. [[K1 s. 333–334]]' },
    { t: 'Sabit asitleri vücuttan atmanın tek yolu böbrekte süzme ve atılımdır.', d: true, n: 'Doğru. Fosforik, sülfürik ve keto asitler gibi sabit asitler akciğerden atılamaz. [[K1 s. 333]]' },
    { t: 'Alkaloz plazmadaki iyonize Ca²⁺ oranını artırır.', d: false, n: 'Yanlış. Alkalozda albümine daha çok Ca²⁺ bağlanır, iyonize oran düşer ve etkin hipokalsemi gelişir; asidozda H⁺ Ca²⁺\'u albüminden ayırarak iyonize oranı artırır. [[K1 s. 335]]' },
    { t: 'Vücut ısısı 1 °C düştükçe kan pH\'ı yaklaşık 0,015 artar.', d: true, n: 'Doğru. Hipotermide ayrıca CO₂\'nin kandaki çözünürlüğü artar ve PaCO₂ düşer. [[K1 s. 336]]' },
    { t: 'Asidoz ve hiperkapni birlikteyken alveoler ventilasyon artışı yalnız asidozun yaptığının yaklaşık iki katıdır.', d: true, n: 'Doğru. Hiperkapni hem periferik hem santral kemoreseptörleri uyaran güçlü bir uyarandır. [[K1 s. 333]]' },
  ],
};

const D70_NAV = [
  ['d70-ph', 'Asit, baz, pH'], ['d70-hh', 'Henderson–Hasselbalch'], ['d70-sinif', 'Bozukluklar'], ['d70-be', 'Baz fazlası'],
  ['d70-ag', 'Anyon açığı'], ['d70-tampon', 'Tamponlar'], ['d70-solunum', 'Solunumsal düzenleme'], ['d70-hco3', 'Böbrek: HCO₃⁻'],
  ['d70-amonyak', 'Amonyagenez'], ['d70-sistem', 'Sistemik etkiler'], ['d70-elektrolit', 'Elektrolit, SSS, kemik'],
  ['d70-isi', 'Isı ve pH'], ['d70-stewart', 'Stewart yaklaşımı'],
  ['d70-p1', 'Part I'], ['d70-p2', 'Part II'], ['d70-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/70'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 6 · Bölüm 70', baslik: 'Asit–baz fizyolojisi',
  lede: 'Vücut pH\'ı 7,35–7,45 gibi dar bir aralıkta tutulur; tamponlar hemen, akciğer dakikalar, böbrek günler içinde çalışır. Bozuklukları sınıflamak, baz fazlası, anyon açığı ve Stewart yaklaşımı bu bölümdedir. [[K1 s. 329–337]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D70_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d70-ph">
  <h2>Asit, baz ve pH</h2>
  <p class="intro">Asit proton (H⁺) veren, baz proton alan maddedir; pH ise serbest H⁺ konsantrasyonunun logaritmik ölçüsüdür. [[K1 s. 329]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>pH değişince H⁺ ne kadar değişir?</h3></div>
    <div data-viz="f70_ph"></div>
    <p class="viz-cap" aria-live="polite"><b>pH 7,40.</b> [H⁺] 40 nmol/L: normal vücut pH'ı. pH'ı kaydırın. [[K1 s. 329]]</p>
    <p class="viz-foot">[H⁺] değerleri pH = −log₁₀[H⁺] tanımından hesaplanır; 40 ve 100 nmol/L kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>"Asit" sözcüğü Latince <i>acidus</i>'tan (ekşi) gelir. Eski kimyacılar asidi sulu çözeltisi ekşi olan, turnusolü kırmızıya çeviren ve bazı metallerle yanıcı hidrojen gazı açığa çıkaran madde, bazı da çözeltisi acı olan, turnusolü maviye çeviren ve asitle tuz oluşturan madde diye tanımladı. [[K1 s. 329]]</p>
    <p><b>Brønsted–Lowry:</b> sulu çözeltide asit–baz tepkimesi bir molekülden ötekine H⁺ aktarılmasıdır. HA + B ⇌ BH⁺ + A⁻ tepkimesinde HA asit, B baz, BH⁺ konjuge asit, A⁻ konjuge bazdır. <b>Güçlü asit</b> çözeltide tamamen, <b>zayıf asit</b> kısmen ayrışır. [[K1 s. 329]]</p>
    <p><b>pH = −log₁₀[H⁺]</b>; birimi yoktur. Ölçek logaritmik olduğundan küçük bir pH değişimi büyük bir [H⁺] değişimidir: 7,4'ten 7,0'a düşüş [H⁺]'yı iki katından fazla artırır. Arter pH'ı &lt; 7,35 ise <b>asidemi</b>, &gt; 7,45 ise <b>alkalemi</b> vardır. [[K1 s. 329]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-hh">
  <h2>Ka, pKa ve Henderson–Hasselbalch denklemi</h2>
  <p class="intro">Bir zayıf asidin ne kadar ayrıştığını pKa söyler; Henderson–Hasselbalch denklemi pH'ı pKa ile konjuge baz/asit oranına bağlar. [[K1 s. 329–330]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>HCO₃⁻ ve PaCO₂'den pH</h3></div>
    <div data-viz="f70_hh"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal plazma.</b> HCO₃⁻ 24 mmol/L, PaCO₂ 5,3 kPa: 6,1 + log₁₀(24 / 1,22) ≈ 7,4. HCO₃⁻'ü ya da PaCO₂'yi değiştirin. [[K1 s. 330]]</p>
    <p class="viz-foot">pH denklemden hesaplanır; kompansasyon bu modelde yoktur, iki değer bağımsız değiştirilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Ka</b>, HA ⇌ H⁺ + A⁻ dengesinin iyonlaşma sabitidir: ileri (k₁) ve geri (k₂) tepkime hızları eşitlenince Ka = k₁/k₂ = [H⁺][A⁻]/[HA]. <b>pKa = −log₁₀Ka</b>; asit ve konjuge baz biçimleri eşit konsantrasyondayken pH'a eşittir ve çoğunlukla zayıf asitleri tanımlar. Yüksek Ka (düşük pKa) daha çok ayrışma ve daha güçlü asit, düşük Ka (yüksek pKa) daha zayıf asit demektir; pKa'daki küçük bir düşüş asitliği çok artırır. [[K1 s. 329–330]]</p>
    <p>[H⁺] = Ka·[HA]/[A⁻] eşitliğinin eksi logaritması alınınca denklem çıkar: <b>pH = pKa + log₁₀([konjuge baz]/[asit])</b>. [[K1 s. 330]]</p>
    <p>En önemli fizyolojik tampon <b>CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</b> sistemidir: H₂CO₃ asit, su baz, HCO₃⁻ konjuge baz, H₃O⁺ konjuge asittir. pKa 6,1'dir ve [H₂CO₃] çözünürlük katsayısı 0,23 ile PaCO₂'ye (kPa) bağlanır: <b>pH = 6,1 + log₁₀(HCO₃⁻ / (0,23 × PaCO₂))</b>. [[K1 s. 330]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-sinif">
  <h2>Asit–baz bozukluklarının sınıflaması</h2>
  <p class="intro">Bozukluk pH yönüne (asidoz ya da alkaloz) ve kökenine (solunumsal ya da metabolik) göre dört sınıfa ayrılır. [[K1 s. 330]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dört bozukluk: birincil değişiklik, nedenler, kompansasyon</h3></div>
    <div data-viz="f70_sinif"></div>
    <p class="viz-cap" aria-live="polite"><b>Solunumsal asidoz.</b> V̇A azalır: pH &lt; 7,35, PaCO₂ &gt; 6,0 kPa. Günler süren durumda böbrek HCO₃⁻ geri emilimini artırır. Bir bozukluk seçin. [[K1 s. 330–331]]</p>
    <p class="viz-foot">Şematik; eşikler ve neden listeleri kitaptandır, ok uzunlukları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Solunumsal kökenli asit CO₂'dir; gaz olarak atılabildiği için <b>uçucu asit</b> denir. Laktik asit gibi atılamayan asitler <b>sabit asit</b>tir. [[K1 s. 330]]</p>
    <p><b>Solunumsal asidoz</b> hipoventilasyondan doğar: solunum merkezi baskılanması (opioid, obezite hipoventilasyon sendromu), sinir-kas hastalığı (Guillain–Barré, miyastenia gravis), göğüs duvarı (yelken göğüs), hava yolu (astım, KOAH) ve parankim hastalığı (ARDS). Anestezide ayrıca yetersiz mekanik ventilasyon (ARDS'de bilinçli permisif hiperkapni), malign hipertermide CO₂ üretiminin artması ve dışarıdan CO₂ alınması (soluk gazının yeniden solunması, laparoskopide insüflasyon) hiperkapnik asidoz yapar. Metabolik kompansasyonla HCO₃⁻'ün &gt; 26 mmol/L olması KOAH, ARDS ve obezite hipoventilasyonunda görülür. [[K1 s. 330–331]]</p>
    <p><b>Metabolik asidoz</b> endojen (laktik asit) ya da eksojen (salisilat) sabit asit artışıdır; asit HCO₃⁻ ile tamponlandığından HCO₃⁻ &lt; 22 mmol/L, pH &lt; 7,35 olur. Akciğer hızla V̇A'yı artırıp PaCO₂'yi düşürür (solunumsal kompansasyon). <b>Solunumsal alkaloz</b> (PaCO₂ &lt; 4,7 kPa, pH &gt; 7,45) santral nedenlerle (kafa travması, ağrı, anksiyete, gebelikte progesteron, salisilat zehirlenmesi), hipoksemide periferik kemoreseptör uyarısıyla (yüksek irtifa), pulmoner emboli ve ödemde J reseptörü uyarısıyla ve aşırı mekanik ventilasyonla olur. <b>Metabolik alkaloz</b> (birincil solunumsal asidoz yokken HCO₃⁻ &gt; 26 mmol/L) dışarıdan alkali (sodyum bikarbonat, masif transfüzyonda HCO₃⁻'e dönüşen sitrat) ya da endojen asit kaybıyla (ağır kusma, nazogastrik drenaj; diüretiklerle böbrekten) gelişir. [[K1 s. 331]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap metabolik alkalozu ana bozuklukların en seyreği olarak verir; oysa hastanede yatan, özellikle cerrahi ve yoğun bakım hastalarında en sık görülen asit–baz bozukluklarındandır (nazogastrik drenaj, diüretik, transfüzyon).</div>
</section>

<section class="wrap blk ders-sec" id="d70-be">
  <h2>Baz fazlası</h2>
  <p class="intro">Karışık bozuklukta Henderson–Hasselbalch yaklaşımı metabolik ve solunumsal bileşeni ayıramaz; baz fazlası (BE) metabolik bileşeni sayıyla verir. [[K1 s. 331]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>BE nasıl tanımlanır ve nasıl kullanılır?</h3></div>
    <div data-viz="f70_be"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Örnek.</b> Bir kan örneği alınır. "İleri"ye basın. [[K1 s. 331]]</p>
    <p class="viz-foot">Şematik titrasyon; örnek olgudaki pH 7,2, BE −8 mEq/L ve laktat 3 mmol/L kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>BE, PaCO₂ 5,3 kPa'ya ve ısı 37 °C'ye düzeltildikten sonra kanı pH 7,40'a getirmek için eklenmesi gereken asit ya da baz miktarıdır. Böylece solunumsal bileşen hesaptan çıkar: pH 7,40 ve PaCO₂ 5,3 kPa olan kanda BE 0'dır; metabolik asidozda negatif, metabolik alkalozda pozitiftir. Normal aralık −2 ile +2 mEq/L'dir. [[K1 s. 331]]</p>
    <p>BE metabolik asidozun nedenini aramada işe yarar. Pnömonili hastada pH 7,2, BE −8 mEq/L ve laktat 3 mmol/L ise açığın yalnız 3'ü laktattır; kalan 5 mEq/L için başka bir asit kaynağı olmalıdır. Öyküye göre bu, sabit asitlerin atılamadığı akut böbrek hasarı olabilir. [[K1 s. 331]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-ag">
  <h2>Anyon açığı</h2>
  <p class="intro">Anyon açığı, ölçülen katyonlarla ölçülen anyonlar arasındaki görünür farktır ve metabolik asidozun nedenini ayırmaya yarar. [[K1 s. 331–332]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Katyon ve anyon sütunları: açık neden büyür ya da küçülür?</h3></div>
    <div data-viz="f70_ag"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻) = 10–20 mEq/L; açığı sülfat, fosfat ve plazma proteinleri gibi ölçülmeyen anyonlar doldurur. Bir durum seçin. [[K1 s. 332]]</p>
    <p class="viz-foot">Sütun yükseklikleri temsilîdir; yalnız 10–20 mEq/L normal aralığı kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kan gazı cihazı yalnız en sık iyonları ölçer: <b>anyon açığı = (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻)</b>, normali 10–20 mEq/L. [[K1 s. 332]]</p>
    <p><b>Anyon açığı yüksek</b> metabolik asidoz endojen anyon artışıyla (anaerobik metabolizmada laktik asit, akut böbrek hasarında biriken sabit asitler, diyabetik ketoasidozda keto asitler) ya da eksojen anyonlarla (salisilat, etanol, metanol, etilen glikol) olur. <b>Anyon açığı normal</b> metabolik asidoz çok daha seyrektir: süregen gastrointestinal HCO₃⁻ kaybı ya da renal tübüler asidoz. [[K1 s. 332]]</p>
    <p>Ölçülmeyen başlıca anyon albümindir. Yoğun bakımda sık görülen hipoalbüminemi anyon açığını düşürür; bu yüzden metabolik asidozu olan bir hastada açık normal görünebilir ve asidoz gözden kaçabilir. [[K1 s. 332]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Etanolün kendisi anyon değildir; alkol kullanımında açığı büyüten alkolik ketoasidoz ve laktattır. Metanol ve etilen glikolde de açığı asit metabolitleri (format, glikolat, oksalat) büyütür.</div>
</section>

<section class="wrap blk ders-sec" id="d70-tampon">
  <h2>pH'ın düzenlenmesi: tamponlar</h2>
  <p class="intro">pH üç mekanizmayla korunur: tamponlar hemen, solunum dakikalar, böbrek günler içinde; asidoz alkalozdan çok daha sık olduğundan üçü de esas olarak asidozun zararını sınırlar. [[K1 s. 332]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>HCO₃⁻ tamponu: neden aside iyi, alkaliye zayıf?</h3></div>
    <div data-viz="f70_tampon"></div>
    <p class="viz-cap" aria-live="polite"><b>pH 7,4.</b> pKa 6,1'in 1,3 birim üstündeyiz: sistemin büyük kısmı HCO₃⁻ biçiminde, eklenen H⁺'yı bağlamaya hazır. "Asit ekle"ye ya da "Baz ekle"ye basın. [[K1 s. 332]]</p>
    <p class="viz-foot">Eğri Henderson–Hasselbalch denkleminden çizilir (pKa 6,1); kapalı sistem gibi davranır, CO₂'nin akciğerden atılması gösterilmez.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Tampon</th><th>Yer</th><th>Kitabın vurgusu</th></tr></thead>
    <tbody>
      <tr><td><b>H₂CO₃/HCO₃⁻</b></td><td>Hücre dışı</td><td>En önemli hücre dışı tampon: plazmada HCO₃⁻ bol, CO₂ akciğerden atılabilir. pKa 6,1 olduğundan pH 7,4'te aside iyi, alkaliye zayıf tampondur.</td></tr>
      <tr><td><b>Hemoglobin</b></td><td>Hücre dışı (kan)</td><td>Histidin yan zincirleri H⁺ bağlar; deoksi-Hb oksi-Hb'den daha iyi bağlar (Haldane etkisi, Bölüm 9).</td></tr>
      <tr><td><b>Fosfat (H₂PO₄⁻/HPO₄²⁻)</b></td><td>Hücre içi, idrar</td><td>Hücre dışında az olduğundan orada önemsizdir; konsantrasyonun yüksek olduğu hücre içi sıvı ve idrarda önemlidir.</td></tr>
      <tr><td><b>Proteinler</b></td><td>Hücre içi</td><td>Amin yan zincirleri asidi, karboksil yan zincirleri alkaliyi tamponlar. Plazma proteinlerinin rolü küçüktür; hücre içinde konsantrasyon yüksektir.</td></tr>
    </tbody>
  </table></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Tampon, plazmaya asit ya da baz eklenince Le Chatelier ilkesine göre hızla pH değişimine karşı koyan maddedir. Tamponlar zayıf asit ya da bazların tuzlarıdır: daha güçlü bir baz eklenince H⁺ salar, daha güçlü bir asit eklenince H⁺ bağlar. Gebelikte hafif fizyolojik alkaloz beklenir (Bölüm 82). [[K1 s. 332]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-solunum">
  <h2>Solunumsal düzenleme</h2>
  <p class="intro">PaCO₂ alveoler ventilasyonla ters orantılıdır ve pH'ı belirler: V̇A artınca pH yükselir, azalınca düşer; solunum merkezi pH bozulmasına dakikalar içinde yanıt verir. [[K1 s. 332–333]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Uyaran, algılayıcı ve ventilasyon yanıtı</h3></div>
    <div data-viz="f70_solunum"></div>
    <p class="viz-cap" aria-live="polite"><b>Metabolik asidoz.</b> Karotis cisimcikleri asidozu algılar; V̇A asidozun derecesiyle orantılı artar, artış esas olarak VT'dendir (Kussmaul solunumu). Bir uyaran seçin. [[K1 s. 333]]</p>
    <p class="viz-foot">Şematik; yalnız "iki kat" oranı kitaptandır, öteki çubuk boyları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Metabolik asidozda solunum hızı az değişir, tidal hacim büyür; diyabetik ketoasidozda sık görülen bu soluk alışa <b>Kussmaul solunumu</b> denir (kemoreseptörler: Bölüm 22). Hiperkapniyi hem periferik hem santral kemoreseptörler algılar ve güçlü bir uyarandır: asidoz ve hiperkapni birlikteyken V̇A artışı yalnız asidozunkinin iki katıdır. [[K1 s. 333]]</p>
    <p>Alkalemi karotis cisimciklerinin uyarısını azaltır, ama V̇A ancak sınırlı düşer: PAO₂'yi korumak için ventilasyon sürmek zorundadır. [[K1 s. 333]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-hco3">
  <h2>Böbrek: sabit asit atılımı ve HCO₃⁻ geri emilimi</h2>
  <p class="intro">Böbrek pH bozukluğunu günler içinde üç yolla düzeltir: sabit asitleri atar, süzülen HCO₃⁻'ü denetimli geri emer ve amonyagenezle yeni HCO₃⁻ yapar. [[K1 s. 333]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Proksimal tübülde HCO₃⁻ geri emilimi: beş adım</h3></div>
    <div data-viz="f70_pct"></div>
    <p class="viz-cap" aria-live="polite"><b>Başlangıç.</b> HCO₃⁻ glomerülden serbestçe süzülür ama tübülün apikal zarını doğrudan geçemez. "İleri"ye basın. [[K1 s. 333]]</p>
    <p class="viz-foot">Şematik PKT hücresi; adım numaraları kitabın Şekil 70.1'iyle aynıdır, taşıyıcıların stokiyometrisi gösterilmez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Sabit asit atılımı.</b> Fosforik, sülfürik ve keto asitlerin atılmasının tek yolu böbrekte süzme ve atılımdır. [[K1 s. 333]]</p>
    <p><b>HCO₃⁻ geri emilimi.</b> Süzülen HCO₃⁻'ün yaklaşık %80'i, plazma pH'ından bağımsız olarak proksimal kıvrımlı tübülde (PKT) geri emilir. Lümene salınan H⁺ HCO₃⁻'le birleşir; fırçamsı kenardaki karbonik anhidraz (KA) ile oluşan CO₂ yağda çözündüğü için hücreye geçer, hücrede KA ters tepkimeyi yapar. H⁺ salgısı ikincil aktiftir: Na⁺/H⁺ antiporteri bazolateral Na⁺/K⁺-ATPaz'ın kurduğu Na⁺ gradiyentini kullanır; HCO₃⁻ kana sodyum bikarbonat kotaşıyıcısıyla çıkar. Sonuçta süzüntüdeki HCO₃⁻ kana dönmüş olur. [[K1 s. 333–334]]</p>
    <p>Kalan HCO₃⁻'ü distal kıvrımlı tübül ve toplayıcı kanallarda A tipi ara (interkale) hücreler ve esas hücreler, yine H⁺ salgısına dayanan benzer bir yolla geri emer. Normalde süzülen HCO₃⁻'ün neredeyse tamamı geri emilir; alkalemide daha azı emilir, idrarda HCO₃⁻ artar ve idrar pH'ı yükselir. [[K1 s. 334]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-amonyak">
  <h2>Amonyagenez</h2>
  <p class="intro">Asidozda böbrek glutaminden hem yeni HCO₃⁻ hem de idrarla atılan NH₄⁺ üretir; asidik süzüntüde bile çok yüksek kapasiteyle H⁺ atar. [[K1 s. 334]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Karaciğerden toplayıcı kanala: NH₄⁺'ün yolu</h3></div>
    <div data-viz="f70_nh4"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Karaciğer.</b> Asidozda karaciğer NH₄⁺ ve HCO₃⁻'ü üreye çevirmek yerine glutamin yapar. "İleri"ye basın. [[K1 s. 334]]</p>
    <p class="viz-foot">Şematik nefron; molekül sayıları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Glutamin kanla PKT hücrelerine gelir ve NH₄⁺ ile HCO₃⁻'e ayrılır. NH₄⁺ Na⁺ karşılığında lümene salınır (yine bazolateral Na⁺/K⁺-ATPaz'la), HCO₃⁻ ise Cl⁻ karşılığında kana geçer ve asidozu düzeltir. Ardından böbrek NH₄⁺'ü atmalıdır: Henle kulpunun kalın çıkan kolunda NH₄⁺ Na⁺/K⁺/2Cl⁻ taşıyıcısının K⁺ yerinden geri emilir, medüller interstisyumda H⁺ kaybedip NH₃ olur ve NH₃'e geçirgen medüller toplayıcı kanala difüzyonla girer. Süren asidozda tübül sıvısındaki bol H⁺ NH₃'e bağlanıp yeniden NH₄⁺ yapar; toplayıcı kanal NH₄⁺'e geçirgen olmadığından NH₄⁺ idrarla atılır. Metabolize edilen her glutamin molekülü başına süzüntüye bir H⁺ atılır. [[K1 s. 334]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-sistem">
  <h2>Sistemik sonuçlar: molekül, kalp-damar ve solunum</h2>
  <p class="intro">pH enzimlerin işlevini, moleküllerin iyonlaşmasını ve iyon kanallarını değiştirir; klinik etkiler sistem sistem değerlendirilir. [[K1 s. 334]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Asidoz ve alkalozda kalp, damarlar ve akciğer</h3></div>
    <div data-viz="f70_etki"></div>
    <p class="viz-cap" aria-live="polite"><b>Hafif asidoz.</b> Doğrudan miyokard depresyonu atım hacmini azaltır, ama adrenal medulladan salınan katekolaminler bunu dengeler. Bir durum ya da organ seçin. [[K1 s. 334]]</p>
    <p class="viz-foot">Şematik; yalnız pH 7,0 eşiği kitaptandır, ok kalınlıkları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Molekül düzeyi.</b> Dar bir pH aralığı dışında enzimler denatüre olur; moleküllerin iyonlaşması zardan geçişlerini, biçimlerini ve işlevlerini değiştirir; nöron zarı iyon kanallarının geçirgenliği değişince istirahat zar potansiyeli (İZP) ve aksiyon potansiyeli etkilenir. [[K1 s. 334]]</p>
    <p><b>Kalp-damar.</b> Asidozun ve hiperkapninin etkilerini ayırmak güçtür. Hiperkapni adrenal medulladan katekolamin salgılatır. pH 7,0'ın altında asidozun negatif inotropisi adrenalinin pozitif etkisini aşar; artan parasempatik akım kalp hızındaki katekolamin etkisine karşı koyar ve bradikardi yapar. Bu iki etkiyle kalp debisi düşer. [[K1 s. 334]]</p>
    <p>Ventriküler ekstrasistol ve atriyal fibrilasyon asidozda, kökeni ne olursa olsun, artmış adrenalin ve elektrolit bozukluğu nedeniyle sıktır. [[K1 s. 334]] Asidoz arteriyolleri daraltır, hiperkapni ise deri ve beyin gibi birçok yatağı genişletir (hiperkapnik hastanın sıçrayıcı nabzı). Alkaloz miyokardın katekolaminlere yanıtını artırarak kasılmayı ve O₂ gereksinimini artırır; koroner vazokonstriksiyon ve oksihemoglobin eğrisinin sola kayması ise O₂ sunumunu azaltır. [[K1 s. 335]]</p>
    <p><b>Solunum.</b> Asidozun ana etkisi V̇A artışıdır: medulladaki solunum merkezini düşük pH'ta karotis cisimcikleri, hiperkapnide santral kemoreseptörler uyarır (Bölüm 22). Asidoz oksihemoglobin eğrisini sağa, alkaloz sola kaydırır (Bölüm 8). Hiperkapni CO₂'nin düz kasa doğrudan etkisiyle bronkodilatasyon, artan parasempatik akımla bronkokonstriksiyon yapar; sağlıklı hiperkapnik hastada dolaylı etki baskındır, hava yolu direnci ve solunum işi artar. [[K1 s. 335]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-elektrolit">
  <h2>Elektrolitler, santral sinir sistemi ve kemik</h2>
  <p class="intro">pH plazma K⁺'unu ve iyonize Ca²⁺'u değiştirir; CO₂ beyne kolayca geçtiği için sinir sistemi bulguları özellikle solunumsal bozukluklarda belirgindir. [[K1 s. 335]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>pH değişince K⁺ ve iyonize Ca²⁺</h3></div>
    <div data-viz="f70_kca"></div>
    <p class="viz-cap" aria-live="polite"><b>pH 7,40.</b> K⁺ başlangıç düzeyinde; albümine bağlı ve iyonize Ca²⁺ dengede. pH'ı kaydırın. [[K1 s. 335]]</p>
    <p class="viz-foot">Başlangıç K⁺ 4,0 mmol/L temsilîdir; 0,1 pH birimi başına 0,6 mmol/L kitaptandır. Ca²⁺ oranları şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Potasyum.</b> Asidozda sık görülen hiperkalemi aritmi yapabilir: pH'taki her 0,1 birim düşüş plazma K⁺'unu 0,6 mmol/L artırır. Eskiden H⁺'nın hücre içi K⁺ ile değiş tokuş edildiği düşünülürdü; bugün asidozun Na⁺/K⁺-ATPaz'ı bozup K⁺'u hücre dışına sızdırdığı düşünülür. Plazma K⁺'u yüksekken total vücut K⁺'u çoğu zaman azalmıştır; asidoz tedavi edilirken K⁺ yerine konmazsa hipokalemi gelişebilir. [[K1 s. 335]]</p>
    <p><b>Kalsiyum.</b> Plazma Ca²⁺'u biyolojik olarak etkin iyonize biçimde ve proteine bağlı, iyonize olmayan biçimde bulunur (Bölüm 81). Asidozda H⁺ albümindeki aynı bağlanma yerleri için yarışır, Ca²⁺'u ayırır ve iyonize oranı artırır; alkaloz iyonize oranı azaltarak etkin hipokalsemi yapar. Hipokalsemi nöron zarının Na⁺ geçirgenliğini artırıp İZP'yi kararsızlaştırır: duyusal reseptörler kendiliğinden depolarize olunca parestezi, motor nöronlar olunca tetani görülür. [[K1 s. 335]]</p>
    <p><b>SSS.</b> H⁺ yüklü olduğu için kan–beyin bariyerini geçemez, yağda çok çözünen CO₂ ise geçer. Beyin kan akımı (BKA) PaCO₂ 3,5–8,0 kPa arasında PaCO₂ ile doğru orantılıdır (Bölüm 49); solunumsal asidozda baş ağrısı, konfüzyon, bilinç bozukluğu, ekstansör plantar yanıt ve asteriksis (CO₂ flapping tremoru) olur. Hipokapni beyinde alkaloz yapar; nöronların İZP'si kararsızlaşır ve solunumsal alkaloz nöbeti tetikleyebilir. <b>Kemik.</b> Süregen metabolik asidozda kemik fosfatı H⁺'yı tamponlamak için harcanır ve kemik dekalsifiye olur; kronik böbrek yetmezliğinde bu renal osteodistrofiye katkıda bulunur. [[K1 s. 335]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> 0,1 birimde 0,6 mmol/L kuralı en çok mineral (hiperkloremik) metabolik asidoz için geçerlidir. Laktik asidoz ve ketoasidoz gibi organik asidozlarda ve solunumsal asidozda K⁺ çok daha az değişir.</div>
</section>

<section class="wrap blk ders-sec" id="d70-isi">
  <h2>Isı ve pH; hipotermik kardiyopulmoner baypas</h2>
  <p class="intro">Isı düştükçe suyun ayrışması azalır; kanın pH'ı yükselir ve PaCO₂ düşer; kan gazı cihazı ise örneği her zaman 37 °C'de ölçer. [[K1 s. 336]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>37 °C'de ölçülen ve hastanın ısısındaki gerçek değerler</h3></div>
    <div data-viz="f70_isi"></div>
    <p class="viz-cap" aria-live="polite"><b>37 °C.</b> Ölçülen ve gerçek değerler aynı: pH 7,40, PaCO₂ 5,3 kPa. Isıyı düşürün ya da bir baypas stratejisi seçin. [[K1 s. 336]]</p>
    <p class="viz-foot">pH 0,015/°C kitaptandır; PaCO₂ eğrisi 37 °C (5,3 kPa) ve 27 °C (3,3 kPa) noktalarından geçen temsilî bir ara değerdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Saf suda H₂O ⇌ H⁺ + OH⁻ dengesi soğukta sola kayar, serbest H⁺ azalır, pH artar. Kanın pH'ı da her 1 °C düşüşte 0,015 artar; CO₂'nin kanda çözünürlüğü artar ve PaCO₂ düşer. Hasta 37 °C'ye yakınsa ölçülen pH gerçeğe yakındır; hipotermide ise 37 °C'de ölçülen pH gerçek değerden belirgin düşük, PaCO₂ yüksektir ve değerler matematiksel olarak düzeltilebilir. Örneğin 27 °C'deki hastada 37 °C'de ölçülen 7,4 ve 5,3 kPa, düzeltilince 7,55 ve 3,3 kPa'dır. [[K1 s. 336]]</p>
    <p><b>Klinik önem.</b> Hipotermik kardiyopulmoner baypasta PaCO₂'yi ve dolayısıyla pH'ı perfüzyonist belirler. <b>pH-stat</b>ta devreye CO₂ eklenir ve hastanın ısısına düzeltilmiş değerler normal tutulur; hipotermideki sola kaymayı dengeleyip O₂ sunumunu iyileştirdiği öne sürülür. Ama artan PaCO₂ beyin damarlarını genişletir, BKA'yı artırır ve serebral otoregülasyonu ortadan kaldırır; artan BKA emboli yükünü artırıp ameliyat sonrası bilişsel işlev bozukluğu ve inme riskini artırabilir. [[K1 s. 336]]</p>
    <p><b>Alfa-stat</b>ta hipotermiye bağlı alkalen kaymaya izin verilir, 37 °C'de ölçülen değerler normal tutulur ve gerçek pH'ın &gt; 7,45 olması kabul edilir; serebral otoregülasyonu ve hücre düzeyinde elektrokimyasal nötraliteyi, böylece enzim işlevini koruduğu düşünülür. Çok sayıda çalışmaya karşın hipotermik baypas ve derin hipotermik dolaşım arrestinde hangisinin üstün olduğu belirsizdir. [[K1 s. 336]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-stewart">
  <h2>Stewart yaklaşımı</h2>
  <p class="intro">Geleneksel yaklaşım çoğu klinik durumu açıklar ama yoğun bakımın karmaşık bozukluklarında yetersiz kalır; Stewart yaklaşımı pH'ı üç bağımsız değişkene bağlar. [[K1 s. 336]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Stewart–Fencl–Story hesaplayıcısı</h3></div>
    <div data-viz="f70_stewart"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal değerler.</b> Na⁺ 140, Cl⁻ 102 mmol/L, albümin 42 g/L: iki BDE de 0. Değerleri değiştirin ya da yoğun bakım olgusunu yükleyin. [[K1 s. 337]]</p>
    <p class="viz-foot">Başlangıç Na⁺ ve Cl⁻ değerleri temsilîdir; denklemler, 42 g/L ve olgu değerleri kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>1980'lerde geliştirilen Stewart yaklaşımı akademik olarak sağlam ama rutin kullanım için karmaşık bulundu; 2004'te Story ve arkadaşlarının basitleştirilmiş sürümüyle yoğun bakımda yeniden ilgi gördü. Üç bağımsız değişken vardır: CO₂ üretimi ile alveoler ventilasyonun dengesine bağlı <b>PaCO₂</b>; her zaman tam ayrışmış <b>güçlü iyonlar</b> (Na⁺, K⁺, Cl⁻; plazmada güçlü katyonlar güçlü anyonlardan fazladır ve fark <b>güçlü iyon farkı</b>dır) ve kısmen ayrışan, çoğu albümin olan plazma proteinleri, yani <b>zayıf asitler</b>. [[K1 s. 336]]</p>
    <p>Basit model iki denklemdir: <b>BDE<sub>NaCl</sub> = [Na⁺] − [Cl⁻] − 38</b> (Na⁺/Cl⁻/serbest su için baz açığı-fazlası, mEq/L) ve <b>BDE<sub>Alb</sub> = 0,25 × (42 − [albümin, g/L])</b>. BDE<sub>NaCl</sub> geleneksel BE'nin karşılığıdır: &gt; 0 alkalemi, &lt; 0 asidemi gösterir, büyüklüğü bozukluğun derecesidir. Albümin negatif yüklü olduğundan hipoalbüminemi metabolik alkaloz yapar; derecesini BDE<sub>Alb</sub> verir. Bu basit denklemler özgün Stewart denklemleriyle şaşırtıcı ölçüde uyuşur. [[K1 s. 337]]</p>
    <p><b>Olgu.</b> Barsak perforasyonu laparotomisinden sonra ağır sepsis gelişen, günlerdir ventile edilen hastada pH 7,45, PaO₂ 12,1, PaCO₂ 5,0 kPa, HCO₃⁻ 26 mmol/L, Na⁺ 147, Cl⁻ 115 mmol/L, albümin 12 g/L. Henderson–Hasselbalch'e göre bozukluk yok gibidir; oysa BDE<sub>NaCl</sub> = −6 mEq/L hiperkloremik metabolik asidozu, BDE<sub>Alb</sub> = +7,5 mEq/L ağır hipoalbümineminin alkalozunu gösterir. [[K1 s. 337]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: pH ve [H⁺] ilişkisi, pKa, Henderson–Hasselbalch denklemi ve normal değerler, dört bozukluğun eşikleri ve nedenleri, baz fazlası, anyon açığı ve hipoalbümineminin etkisi, tamponlar, HCO₃⁻ geri emilimi ve amonyagenez, K⁺ ve Ca²⁺ değişimleri, ısı düzeltmesi, pH-stat ve alfa-stat, Stewart denklemleri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz70-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz70-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz70-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d70-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"pH'ı tanımlayın. Vücut, eklenen bir asit yüküne karşı pH'ı nasıl korur? Böbreğin HCO₃⁻'ü nasıl geri kazandığını anlatın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> pH = −log₁₀[H⁺]; 7,4 = 40 nmol/L; 7,0'da 100 nmol/L. Asidemi &lt; 7,35, alkalemi &gt; 7,45. [[K1 s. 329]]</li>
    <li><b>Denklem.</b> pH = 6,1 + log₁₀(HCO₃⁻ / (0,23 × PaCO₂)); 24 mmol/L ve 5,3 kPa → 7,4. [[K1 s. 330]]</li>
    <li><b>Tamponlar (hemen).</b> Hücre dışı: HCO₃⁻ (bol, CO₂ akciğerden atılır, pKa 6,1 → aside iyi), Hb histidinleri; hücre içi: fosfat ve proteinler. [[K1 s. 332]]</li>
    <li><b>Solunum (dakikalar).</b> Karotis cisimcikleri asidozu, santral ve periferik kemoreseptörler hiperkapniyi algılar; V̇A artışı esas olarak VT'den (Kussmaul). [[K1 s. 333]]</li>
    <li><b>Böbrek (günler).</b> Sabit asit atılımı (tek yol), HCO₃⁻ geri emilimi, amonyagenez. [[K1 s. 333–334]]</li>
    <li><b>PKT mekanizması.</b> Na⁺/H⁺ antiporteriyle H⁺ salgısı → lümende KA ile CO₂ → hücreye difüzyon → hücrede KA ile H⁺ + HCO₃⁻ → HCO₃⁻ Na⁺ ile kana; süzülenin %80'i, pH'tan bağımsız. [[K1 s. 333–334]]</li>
    <li><b>Amonyagenez.</b> Glutamin → NH₄⁺ + yeni HCO₃⁻; NH₃ toplayıcı kanalda H⁺ bağlayıp NH₄⁺ olarak tuzaklanır; glutamin başına bir H⁺ atılır. [[K1 s. 334]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Üç bölmeli bir dikdörtgen çizin: tübül lümeni, PKT hücresi, kan. Lümende HCO₃⁻ + H⁺ → H₂CO₃ → CO₂ + H₂O (KA), CO₂'nin hücreye oku, hücrede ters tepkime (KA), apikalde Na⁺/H⁺ antiporteri, bazolateralde Na⁺/K⁺-ATPaz ve Na⁺–HCO₃⁻ kotaşıyıcısı; adımları 1–5 numaralayın. [[K1 s. 333–334]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Baz fazlası nedir, nasıl yorumlanır? Anyon açığı yüksek asidozun nedenleri nelerdir, hipoalbüminemi açığı nasıl etkiler? Asidoz K⁺ ve Ca²⁺'u nasıl değiştirir? Hipotermik baypasta pH-stat ile alfa-stat farkı nedir? Stewart yaklaşımının bağımsız değişkenleri nelerdir? [[K1 s. 331–337]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d70-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Asit proton verici, baz alıcıdır; pH = −log₁₀[H⁺], 7,4 = 40 nmol/L; asidemi &lt; 7,35, alkalemi &gt; 7,45. Düşük pKa güçlü asit demektir. [[K1 s. 329–330]]</li>
    <li>pH = 6,1 + log₁₀(HCO₃⁻ / (0,23 × PaCO₂)): 24 mmol/L ve 5,3 kPa ile 7,4 bulunur. [[K1 s. 330]]</li>
    <li>Eşikler: solunumsal asidoz PaCO₂ &gt; 6,0, alkaloz &lt; 4,7 kPa; metabolik asidoz HCO₃⁻ &lt; 22, alkaloz &gt; 26 mmol/L. [[K1 s. 330–331]]</li>
    <li>BE: PaCO₂ 5,3 kPa ve 37 °C'ye düzeltilmiş kanı pH 7,40'a getiren asit ya da baz; normal −2 ile +2 mEq/L. Anyon açığı (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻) = 10–20 mEq/L; hipoalbüminemi açığı düşürür. [[K1 s. 331–332]]</li>
    <li>Tamponlar: HCO₃⁻ ve Hb hücre dışında, fosfat ve proteinler hücre içinde; solunum dakikalar, böbrek günler içinde düzeltir. [[K1 s. 332–333]]</li>
    <li>Böbrek: sabit asit atılımının tek yolu; HCO₃⁻'ün %80'i PKT'de KA ve Na⁺/H⁺ antiporteriyle geri emilir; amonyagenez glutamin başına bir H⁺ atar ve yeni HCO₃⁻ yapar. [[K1 s. 333–334]]</li>
    <li>Asidoz: pH &lt; 7,0'da kalp debisi düşer, aritmi sıktır, K⁺ 0,1 birimde 0,6 mmol/L artar, iyonize Ca²⁺ artar; alkaloz etkin hipokalsemi, solunumsal alkaloz nöbet yapabilir. BKA PaCO₂ 3,5–8,0 kPa arasında doğrusal artar. [[K1 s. 334–335]]</li>
    <li>Soğuyan kanda pH 0,015/°C artar ve PaCO₂ düşer; pH-stat CO₂ ekler, alfa-stat alkalen kaymaya izin verir. Stewart: BDE<sub>NaCl</sub> = Na⁺ − Cl⁻ − 38, BDE<sub>Alb</sub> = 0,25 × (42 − albümin). [[K1 s. 336–337]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="70"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/69">← Bölüm 69 · Su ve elektrolit dengesinin böbrekte düzenlenmesi</a>
    <a href="#/dersler/fizyoloji/ek70">Sonraki: Ek ders · Asit–baz kompansasyonu: hücre içi tamponlar, in vitro ve in vivo tampon doğruları →</a>
  </nav>
</section>`,
};
