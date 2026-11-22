/* Fizyoloji Bölüm 38 · Venöz basınç dalga biçimleri (K1 İngilizce baskı s. 166–167).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz38-1'] = {
  no: 1, kok: 'Normal santral venöz basınç (CVP) dalga biçimi için:', kagit: 'Paper A · fizyoloji, Bölüm 38', kaynak: '[[K1 s. 166]]',
  onermeler: [
    { t: 'a dalgası sağ atriyumun kasılmasına karşılık gelir ve EKG\'de P dalgasının hemen ardından görülür.', d: true, n: 'Doğru. Atriyum kasılması basıncı yükseltir; elektriksel olay (P) mekanik olaydan (a) hemen önce gelir. [[K1 s. 166]]' },
    { t: 'c dalgası, triküspit kapak açılınca kanın sağ atriyumdan sağ ventriküle akmasından doğar.', d: false, n: 'Yanlış. Bu y inişidir. c dalgası erken sistolde RV kasılmasının triküspit kapağı atriyuma doğru şişirmesiyle oluşur ve karotis nabzıyla aynı anda görülür. [[K1 s. 166]]' },
    { t: 'v dalgası, triküspit kapak açıkken sağ ventrikülün dolmasını yansıtır.', d: false, n: 'Yanlış. v dalgası ventrikül sistolü boyunca, triküspit kapak kapalıyken süren venöz dönüşle sağ atriyumun dolmasıdır. [[K1 s. 166]]' },
    { t: 'x inişi atriyumun gevşemesinden ve RV kasılırken sağ atriyumun aşağı doğru hareketinden doğar.', d: true, n: 'Doğru. Bu sırada düşen CVP sağ atriyumun hızla dolmasını sağlar. [[K1 s. 166]]' },
    { t: 'CVP\'yi ölçen kateterin ucu sağ ventrikülün içinde durmalıdır.', d: false, n: 'Yanlış. Kateterin ucu sağ atriyumun hemen üstünde, superior vena kavanın içinde durur. [[K1 s. 166]]' },
  ],
};
VERI.sorular['fiz38-2'] = {
  no: 2, kok: 'Aritmilerde ve kapak hastalığında CVP dalga biçimi için:', kagit: 'Paper A · fizyoloji, Bölüm 38', kaynak: '[[K1 s. 166]]',
  onermeler: [
    { t: 'Atriyal fibrilasyonda v dalgası kaybolur.', d: false, n: 'Yanlış. Kaybolan a dalgasıdır: koordine atriyum kasılması yoktur. [[K1 s. 166]]' },
    { t: 'Üçüncü derece kalp bloğunda atriyum kapalı triküspit kapağa karşı kasılınca top a dalgası oluşur.', d: true, n: 'Doğru. Uyarı AV düğümden geçemez; atriyum ve ventrikül bağımsız kasılır ve zaman zaman aynı anda kasılırlar. [[K1 s. 166]]' },
    { t: 'Üçüncü derece kalp bloğunda top a dalgası her vuruda değil, ara sıra görülür.', d: true, n: 'Doğru. Atriyum kasılması ancak ventrikül sistolüne denk geldiğinde büyük a dalgası çıkar. [[K1 s. 166]]' },
    { t: 'Triküspit yetersizliğinin tipik bulgusu dev a dalgasıdır.', d: false, n: 'Yanlış. Triküspit yetersizliğinde sistolde RV\'den RA\'ya kaçan kan dev v dalgası yapar. [[K1 s. 166]]' },
    { t: 'Triküspit yetersizliğinde büyük pozitif dalga c dalgasının, x inişinin ve v dalgasının yerini alır.', d: true, n: 'Doğru. Sistol boyunca RV\'den RA\'ya atılan kan CVP\'yi yükseltir; bu üç bileşen tek büyük dalgada birleşir. [[K1 s. 166]]' },
  ],
};
VERI.sorular['fiz38-3'] = {
  no: 3, kok: 'CVP\'nin değeri ve sıvı yönetiminde kullanımı için:', kagit: 'Paper A · fizyoloji, Bölüm 38', kaynak: '[[K1 s. 167]]',
  onermeler: [
    { t: 'Transdüser sağ atriyum düzeyinin altındaysa CVP olduğundan düşük okunur.', d: false, n: 'Yanlış. Transdüser RA düzeyinin altındaysa CVP yüksek, üstündeyse düşük okunur. [[K1 s. 167]]' },
    { t: 'PEEP ve konstriktif perikardit CVP\'yi yükseltir.', d: true, n: 'Doğru. İkisi de yüksek CVP\'nin (> 8 mmHg) sık nedenlerindendir. [[K1 s. 167]]' },
    { t: 'Sıvı bolusundan sonra CVP\'nin kalıcı yükselmesi, RV\'nin Starling eğrisinin yükselen kolunda olduğunu gösterir.', d: false, n: 'Yanlış. Kalıcı yükselme platoyu, yani en yüksek ön yükü gösterir; yükselen kolu gösteren geçici yükselmedir. [[K1 s. 167]]' },
    { t: 'Sağ atriyum düzeyinde ölçülen normal ortalama CVP 2–8 mmHg\'dir.', d: true, n: 'Doğru. Yine de tek bir değer dikkatle yorumlanmalıdır; CVP kompliyanslardan ve intratorasik basınçtan da etkilenir. [[K1 s. 167]]' },
    { t: 'Akut kanama ve anafilaksi düşük CVP\'nin (< 2 mmHg) nedenlerindendir.', d: true, n: 'Doğru. İkisi de akut hipovolemi örneğidir. [[K1 s. 167]]' },
  ],
};

const D38_NAV = [
  ['d38-dalga', 'Dalga biçimi'], ['d38-aritmi', 'Aritmiler'], ['d38-deger', 'Normal CVP'], ['d38-sivi', 'Sıvı yönetimi'],
  ['d38-p1', 'Part I'], ['d38-p2', 'Part II'], ['d38-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/38'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 3 · Kardiyovasküler fizyoloji · Bölüm 38', baslik: 'Venöz basınç dalga biçimleri',
  lede: 'Santral venöz basınç (CVP) dalga biçimi kardiyak döngünün olaylarını izler ve aritmileri ele verir; ortalama değeri ise sıvı yönetiminde tek başına değil, ancak eğilim olarak işe yarar. [[K1 s. 166–167]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D38_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d38-dalga">
  <h2>Normal CVP dalga biçimi</h2>
  <p class="intro">CVP, ucu sağ atriyumun (RA) hemen üstünde, superior vena kavada duran santral venöz kateterle ölçülür; dalga biçiminde üç pozitif dalga (a, c, v) ve iki iniş (x, y) vardır. [[K1 s. 166]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Bir kardiyak döngüde CVP: a, c, x, v, y</h3></div>
    <div data-viz="f38_dalga"></div>
    <p class="viz-cap" aria-live="polite"><b>a dalgası.</b> RA kasılır; EKG'de P dalgasının hemen ardından gelir. Bir bileşene dokunun ya da döngüyü oynatın. [[K1 s. 166]]</p>
    <p class="viz-foot">Şematik iz; ölçek kitaptaki şekle göre yaklaşıktır (0–6 mmHg, 1 s) [[K1 s. 166]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Döngü diyastol ortasından başlar. c dalgası erken sistolde, karotis nabzıyla aynı anda çıkar: RV kasılması triküspit kapağı RA'ya doğru şişirir, CVP biraz yükselir. x inişinde atriyum gevşer ve RV kasılırken RA aşağı çekilir; düşen basınç RA'yı hızla doldurur. [[K1 s. 166]]</p>
    <p>v dalgası, triküspit kapak kapalıyken sistol boyunca süren venöz dönüşle RA'nın dolmasıdır. y inişi, triküspit kapak açılıp kan RA'dan sağ ventriküle (RV) akınca CVP'nin düşmesidir. [[K1 s. 166]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d38-aritmi">
  <h2>Dalga biçimi aritmileri ve triküspit yetersizliğini ele verir</h2>
  <p class="intro">Atriyum ile ventrikülün zamanlaması bozulunca ya da triküspit kapak kaçırınca dalga biçimi tanınır biçimde değişir. [[K1 s. 166]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Normal ritim, AF, tam blok ve triküspit yetersizliğinde CVP</h3></div>
    <div data-viz="f38_aritmi"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal ritim.</b> Her P dalgasını bir a dalgası izler. Bir durum seçin; EKG ve CVP birlikte akar. [[K1 s. 166]]</p>
    <p class="viz-foot">Şematik izler; dalga yükseklikleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <ul>
      <li><b>Atriyal fibrilasyon:</b> koordine atriyum kasılması kaybolur, a dalgası yoktur. [[K1 s. 166]]</li>
      <li><b>Üçüncü derece kalp bloğu:</b> uyarı AV düğümden geçemez; atriyum ve ventrikül bağımsız kasılır. Atriyum zaman zaman ventrikülle aynı anda, kapalı triküspit kapağa karşı kasılır ve ara sıra büyük bir a dalgası çıkar: <b>top a dalgası</b> (cannon a-wave). [[K1 s. 166]]</li>
      <li><b>Triküspit yetersizliği:</b> sistolde kan RV'den RA'ya atılır, CVP yükselir. c dalgasının, x inişinin ve v dalgasının yerini tek büyük pozitif dalga alır: <b>dev v dalgası</b>. [[K1 s. 166]]</li>
    </ul>
  </div>
</section>

<section class="wrap blk ders-sec" id="d38-deger">
  <h2>Normal CVP ve onu değiştirenler</h2>
  <p class="intro">RA düzeyinde ölçülen normal ortalama CVP 2–8 mmHg'dir; ama tek bir değer dikkatle yorumlanmalıdır. [[K1 s. 167]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>CVP'yi yükselten ve düşüren etkenler</h3></div>
    <div data-viz="f38_deger"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal: 2–8 mmHg.</b> Transdüserin yüksekliğini değiştirin ya da bir neden seçin. [[K1 s. 167]]</p>
    <p class="viz-foot">Şematik; okunan değerler temsilîdir, yalnız 2 ve 8 mmHg sınırları kitaptandır [[K1 s. 167]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>CVP yalnız santral venöz kan hacmini yansıtmaz: venöz kompliyans, RA ve RV kompliyansı ve intratorasik basınç da onu değiştirir. [[K1 s. 167]]</p>
  </div>
  <div class="cols" style="margin-top:12px">
    <div class="card"><h3>Yüksek CVP (&gt; 8 mmHg)</h3><p>Transdüser RA düzeyinin altında; pozitif basınçlı ventilasyon / PEEP; konjestif kalp yetersizliği; izole RV yetersizliği (ör. RV enfarktüsü, kor pulmonale); hipervolemi; pulmoner emboli; konstriktif perikardit. [[K1 s. 167]]</p></div>
    <div class="card"><h3>Düşük CVP (&lt; 2 mmHg)</h3><p>Transdüser RA düzeyinin üstünde; akut hipovolemi (ör. anafilaksi, akut kanama). [[K1 s. 167]]</p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d38-sivi">
  <h2>CVP ile sıvı yönetimi</h2>
  <p class="intro">Ölçmesi kolay olduğu için CVP uzun süre sıvı rehberi oldu; tek değerler az işe yarar, ama sıvı bolusuna yanıtın eğilimi bilgi verir. [[K1 s. 167]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Varsayım zinciri ve sıvı bolusuna CVP yanıtı</h3></div>
    <div data-viz="f38_starling"></div>
    <p class="viz-cap" aria-live="polite"><b>Yükselen kol.</b> Bolus verin: CVP geçici yükselir, atım hacmi artar. Daha sıvı gerekebilir; eğrideki yeri değiştirin. [[K1 s. 167]]</p>
    <p class="viz-foot">Starling eğrisi ve CVP izleri şematiktir; hedef değerler kitaptandır [[K1 s. 167]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Mantık bir zincirdir: CVP sağ atriyum basıncına (RAP) yakındır; RAP kabaca RV diyastol sonu basıncı (RVEDP) ve hacmiyle, yani RV ön yüküyle, RVEDP de kabaca LV diyastol sonu basıncı ve hacmiyle (LVEDV), yani LV ön yüküyle uyuşur. LV ön yükü kalp debisinin (CO) belirleyicilerinden biri olduğundan CVP ile CO iyileştirilebilir. Ama sağlıklı kişide bile varsayım çoktur: LVEDV ile CVP zayıf uyuşur. [[K1 s. 167]]</p>
    <p>Bolustan sonra geçici yükselme, RV'nin Starling eğrisinin yükselen kolunda olduğunu ve daha sıvı gerekebileceğini gösterir. Kalıcı yükselme platoyu, yani en yüksek ön yükü gösterir: RV mekanik dezavantajdadır, ek ön yük RV yetersizliğini (RVF) tetikleyebilir; CO ancak kontraktiliteyi ya da kalp hızını artırarak veya art yükü azaltarak artar. Klinik kötüleşmeyle birlikte belirgin yükselme inen kolu gösterir: aşırı ön yük lifleri fazla gerer, RVF gelişir. [[K1 s. 167]]</p>
    <p>Yeterli venöz dolum için sık anılan hedef 8–12 mmHg'dir (mekanik ventilasyonda 12–15 mmHg). Surviving Sepsis kılavuzu (2016) ise volüm durumunu değerlendirmede CVP'nin önemini öteki yöntemlere göre azaltmıştır. [[K1 s. 167]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> 2021 Surviving Sepsis kılavuzu sıvı tedavisini CVP gibi statik ölçümlere değil, dinamik ölçümlere (ör. pasif bacak kaldırma, atım hacmi değişimi) dayandırmayı önerir.</div>
</section>

<section class="wrap blk ders-sec" id="d38-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: kateter ucunun yeri, a, c, x, v ve y bileşenlerinin mekanizması ve EKG ile zamanlaması, AF'de a dalgasının yokluğu, tam blokta top a dalgası, triküspit yetersizliğinde dev v dalgası, normal ortalama CVP (2–8 mmHg), yüksek ve düşük CVP nedenleri, transdüser yüksekliği, sıvı bolusuna yanıt ve hedef değerler. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz38-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz38-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz38-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d38-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Santral venöz basınç dalga biçimini çizip bileşenlerini açıklar mısınız? CVP sıvı yönetiminde ne kadar güvenilirdir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Ölçüm.</b> Ucu RA'nın hemen üstünde, superior vena kavada duran santral venöz kateter; transdüser RA düzeyinde. [[K1 s. 166–167]]</li>
    <li><b>Bileşenler.</b> a: atriyum kasılması (P'den hemen sonra); c: erken sistolde triküspit kapağın RA'ya şişmesi (karotis nabzıyla); x: atriyum gevşemesi ve RA'nın aşağı hareketi; v: kapalı kapakla RA dolumu; y: kapak açılınca RA'nın boşalması. [[K1 s. 166]]</li>
    <li><b>Tanısal değer.</b> AF: a yok. Tam blok: ara sıra top a dalgası. Triküspit yetersizliği: c, x ve v'nin yerini alan dev v dalgası. [[K1 s. 166]]</li>
    <li><b>Normal değer ve sınırlılık.</b> Ortalama 2–8 mmHg; hacmin yanında venöz, RA ve RV kompliyansı ve intratorasik basınç da etkiler. [[K1 s. 167]]</li>
    <li><b>Nedenler.</b> Yüksek: transdüser aşağıda, PPV/PEEP, konjestif kalp yetersizliği, izole RV yetersizliği, hipervolemi, pulmoner emboli, konstriktif perikardit. Düşük: transdüser yukarıda, akut hipovolemi. [[K1 s. 167]]</li>
    <li><b>Sıvı yönetimi.</b> CVP ≈ RAP ≈ RVEDP ≈ LVEDP zinciri zayıftır; tek değer değil bolus yanıtı: geçici artış yükselen kol, kalıcı artış plato, kötüleşme ile belirgin artış inen kol. Hedef 8–12 (ventilasyonda 12–15) mmHg; Surviving Sepsis 2016 önemini azaltmıştır. [[K1 s. 167]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Üstte EKG (P, QRS, T), altta aynı zaman ekseninde CVP izi çizin: P'den sonra a, QRS'ten sonra c, ardından x, T sonrasında v ve y. Altına diyastol–sistol–diyastol şeridini ekleyin. [[K1 s. 166]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> c dalgası neden karotis nabzıyla aynı anda çıkar? AF'de hangi dalga kaybolur? Top a dalgası nasıl oluşur? PEEP CVP'yi neden yükseltir? Sıvı bolusuna CVP yanıtını nasıl yorumlarsınız? [[K1 s. 166–167]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d38-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>CVP, ucu RA'nın hemen üstünde, superior vena kavada duran kateterle ölçülür. [[K1 s. 166]]</li>
    <li>Pozitif dalgalar: a (atriyum kasılması), c (triküspit kapağın RA'ya şişmesi), v (kapalı kapakla RA dolumu); inişler: x (atriyum gevşemesi, RA'nın aşağı hareketi), y (kapak açılınca boşalma). [[K1 s. 166]]</li>
    <li>AF'de a dalgası yok; tam blokta ara sıra top a dalgası; triküspit yetersizliğinde dev v dalgası. [[K1 s. 166]]</li>
    <li>Normal ortalama CVP 2–8 mmHg; kompliyanslar ve intratorasik basınç da onu değiştirir. [[K1 s. 167]]</li>
    <li>Transdüser RA'nın altındaysa yüksek, üstündeyse düşük okunur; PPV/PEEP, kalp yetersizliği, RV yetersizliği, hipervolemi, pulmoner emboli ve konstriktif perikardit yükseltir, akut hipovolemi düşürür. [[K1 s. 167]]</li>
    <li>Tek CVP değeri sıvı gereksinimini zayıf yansıtır; bolus yanıtı Starling eğrisindeki yeri gösterir. Hedef 8–12 mmHg (ventilasyonda 12–15). [[K1 s. 167]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="38"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/ek37">← Ek ders · Venöz dönüş, ortalama sistemik dolum basıncı ve kalp debisiyle ilişkisi</a>
    <a href="#/dersler/fizyoloji/39">Sonraki: Bölüm 39 · Lenfatik sistem →</a>
  </nav>
</section>`,
};
