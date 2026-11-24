(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, liste) => ({id: 'durum', ad, liste: liste.map(([d, etiket]) => ({d, ad: etiket}))});

  // Aynı okuma yönünü koru: geniş ekranda soldan sağa, telefonda yukarıdan aşağı.
  function zincir(S, etiketler) {
    const renkler = ['basic', 'accent', 'clin'];
    return etiketler.map((yazi, i) => {
      const x = S.dar ? 24 : 8 + i * 214;
      const y = S.dar ? 8 + i * 82 : 16;
      const w = S.dar ? S.w - 48 : 194;
      const h = S.dar ? 56 : 78;
      const renk = renkler[i];
      const ok = S.dar ? [ [S.w / 2, y + h], [S.w / 2, y + 79]] : [ [x + w, 55], [x + 211, 55]];
      return S.kutu(x, y, w, h, {yazi, renk, dolgu: renk + '-soft'})
        + (i < etiketler.length - 1 ? S.ok(ok, {renk: 'muted'}) : '');
    }).join('');
  }

  function yolSec(el, baslik, yollar) {
    const liste = Object.entries(yollar).map(([id, yol]) => [id, yol.ad]);
    return SEKIL.sahne(el, {
      baslik, vb: [640, 110], vbDar: [350, 238], secenek: secim(baslik, liste),
      ciz: (S, t, p) => zincir(S, yollar[p.durum].etiket),
      metin: p => yollar[p.durum].metin
    });
  }

  VIZ.a13a_yollar = el => yolSec(el, 'Otonom yol', {
    pns: {ad: 'Parasempatik', etiket: [['Kraniyal / sakral', 'lif · ACh'], ['Hedefe yakın', 'ganglion'], ['Postganglionik ACh', 'Hedef organ']],
      metin: 'Bütün otonom preganglionik lifler miyelinlidir ve nikotinik reseptöre ACh salgılar. [[K3 s. 208]] Parasempatik yolun ikinci lifi de ACh salgılar. [[K3 s. 206]]'},
    sns: {ad: 'Sempatik', etiket: [['T1–L2 çıkışı', 'ACh'], ['Zincir veya', 'prevertebral ganglion'], ['Noradrenalin', 'Adrenoseptör']],
      metin: 'Sempatik zincire beyaz ramustan girilir, komşu spinal sinire dönen postganglionik lif gri ramustan geçer. [[K3 s. 206–207]]'},
    ter: {ad: 'Ter bezi', etiket: [['Preganglionik lif', 'ACh'], 'Sempatik ganglion', ['Postganglionik ACh', 'Ter bezi']],
      metin: 'Ter bezine giden sempatik yolda ganglionun iki yanında da ACh salınır. [[K3 s. 208–209]]'},
    adrenal: {ad: 'Adrenal medulla', etiket: [['Preganglionik lif', 'ACh'], ['Adrenal medulla', 'Kromafin hücresi'], ['Kana adrenalin', 'Hormon']],
      metin: 'Preganglionik lif kromafin hücresiyle doğrudan sinaps yapar, salınan adrenalin kanda hormon olarak taşınır. [[K3 s. 208–209]]'}
  });

  VIZ.a13a_sinyal = el => yolSec(el, 'Reseptör sinyali', {
    alfa1: {ad: 'α₁', etiket: ['α₁ · Gq', ['Fosfolipaz C ↑', 'PIP₂ hidrolizi'], ['IP₃ ↑', 'Hücre içi Ca²⁺ ↑']],
      metin: 'Gq fosfolipaz C’yi uyarır, PIP₂ hidroliziyle açığa çıkan IP₃ hücre içinde kullanılabilir Ca²⁺ miktarını artırır. [[K3 s. 210]]'},
    gi: {ad: 'α₂ / D₂', etiket: ['α₂ veya D₂ · Gi', 'Adenilat siklaz ↓', 'cAMP ↓'],
      metin: 'Gi ile eşleşen iki reseptör adenilat siklazı baskılayarak cAMP düzeyini düşürür. [[K3 s. 210]]'},
    gs: {ad: 'β₁ / β₃ / D₁', etiket: [['β₁, β₃ veya D₁', 'Gs'], 'Adenilat siklaz ↑', 'cAMP ↑'],
      metin: 'Gs ile adenilat siklazın etkinliği artar, β reseptörlerinde artan cAMP yerleşime özgü fosforilasyona yol açar. [[K3 s. 210]]'},
    beta2: {ad: 'β₂', etiket: ['β₂ · Gs', ['Adenilat siklaz ↑', 'cAMP ↑'], ['Na⁺/K⁺ ATPaz ↑', 'Hiperpolarizasyon']],
      metin: 'β₂ sinyalinde cAMP artışını Na⁺/K⁺ ATPaz aktivitesinde artış ve hiperpolarizasyon izler. [[K3 s. 210]]'}
  });

  // İki organ yanıtını aynı konumlarda tutarak seçenekler arasındaki değişimi göster.
  function yanitSec(el, baslik, durumlar) {
    const liste = Object.entries(durumlar).map(([id, durum]) => [id, durum.ad]);
    return SEKIL.sahne(el, {
      baslik, vb: [620, 182], vbDar: [350, 248], secenek: secim(baslik, liste),
      ciz: (S, t, p) => {
        const d = durumlar[p.durum];
        const cx = S.w / 2;
        let cizim = S.kutu(cx - 130, 7, 260, 48, {yazi: d.bas, renk: 'accent', dolgu: 'accent-soft'});
        d.yanit.forEach((yazi, i) => {
          const x = S.dar ? 37 : 8 + i * 308;
          const y = S.dar ? 81 + i * 86 : 96;
          const w = S.dar ? 303 : 290;
          const yol = S.dar ? [ [45, 31], [17, 31], [17, y+32], [x-2, y+32]]
            : [ [cx, 55], [cx, 72], [x+w/2, 72], [x+w/2, y-2]];
          cizim += S.ok(yol, {renk: 'muted'}) + S.kutu(x, y, w, 64, {
            yazi, renk: i ? 'clin' : 'basic', dolgu: i ? 'clin-soft' : 'basic-soft'
          });
        });
        return cizim;
      },
      metin: p => durumlar[p.durum].metin
    });
  }

  VIZ.a13a_adrenalin = el => yanitSec(el, 'Adrenalin dozu', {
    dusuk: {ad: 'Düşük doz', bas: 'β etkileri baskın', yanit: [['Kalp debisi ↑', 'Aritmi eşiği ↓'], ['Periferik direnç düşebilir', 'Diyastolik basınç düşebilir']],
      metin: 'Düşük doz infüzyon miyokardın oksijen tüketimini artırır ve koroner arterleri genişletir. [[K3 s. 210–211]]'},
    yuksek: {ad: 'Yüksek doz', bas: 'α₁ etkisi baskın', yanit: [['Damar düz kası', 'Vazokonstriksiyon'], ['Sistemik dolaşım', 'Vasküler direnç ↑']],
      metin: 'Yüksek doz infüzyonda veya kardiyak arrest sırasında 1 mg bolusla α₁ etkisi öne çıkar. [[K3 s. 211]]'}
  });

  VIZ.a13a_noradrenalin = el => yanitSec(el, 'Noradrenalinin kaynağı', {
    endojen: {ad: 'Endojen salınım', bas: 'Sinir ucundan noradrenalin', yanit: [['Kalp hızı', 'Taşikardi'], ['Kalp debisi', 'Artar']],
      metin: 'Sinir ucundan salınan noradrenalin kalbi hızlandırır ve debiyi artırır. [[K3 s. 212]]'},
    infuzyon: {ad: 'Sistemik infüzyon', bas: 'Periferik vazokonstriksiyon', yanit: [['Sistolik basınç ↑', 'Diyastolik basınç ↑'], ['Refleks bradikardi olabilir', 'Kalp debisi düşebilir']],
      metin: 'İnfüzyonda basınç artışına eşlik eden refleks yanıt, kalp hızının endojen salınımdakinden farklı yönde değişmesini açıklayabilir. [[K3 s. 212]]'}
  });

  VIZ.a13a_dopamin = el => yanitSec(el, 'Dopamin infüzyon hızı', {
    dusuk: {ad: '10 µg.kg⁻¹.min⁻¹’ye kadar', bas: 'β₁ etkileri baskın', yanit: [['Kasılma gücü ↑', 'Kalp hızı ↑'], ['Kalp debisi ↑', 'Koroner kan akımı ↑']],
      metin: 'İnfüzyon hızı 10 µg.kg⁻¹.min⁻¹’ye kadar olduğunda β₁ etkileri öne çıkar, dolaşım yanıtı hastalar arasında değişir. [[K3 s. 213]]'},
    yuksek: {ad: '> 10 µg.kg⁻¹.min⁻¹', bas: 'α etkileri öne çıkabilir', yanit: [['Arteriyel dolaşım', 'Sistemik direnç ↑'], ['Venöz dolaşım', 'Venöz dönüş ↑']],
      metin: '10 µg.kg⁻¹.min⁻¹ üzerindeki hızlarda α etkileri baskın olma eğilimindedir. [[K3 s. 213]]'}
  });
})();
