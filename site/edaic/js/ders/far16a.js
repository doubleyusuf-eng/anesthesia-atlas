(function () {
  'use strict';
  const VIZ = window.VIZ;

  // Her seçim bir neden-sonuç zinciri açar. Dar ekranda yol aşağı doğru okunur.
  function yollar(el, baslik, kontrol, dallar) {
    return SEKIL.sahne(el, {
      baslik, vb: [660, 117], vbDar: [350, 205],
      secenek: { id: 'dal', ad: kontrol, liste: Object.keys(dallar).map(ad => ({ d: ad, ad })) },
      metin: p => dallar[p.dal].metin,
      ciz: (S, t, p) => {
        const etiketler = dallar[p.dal].yol;
        const renkler = ['basic', 'accent', 'clin'];
        const w = S.dar ? 258 : 192, h = 48;
        return etiketler.map((satirlar, i) => {
          const x = S.dar ? 46 : 4 + 229 * i, y = S.dar ? 6 + 72 * i : 35;
          const ok = S.dar
            ? [[x + w / 2, y - 22], [x + w / 2, y - 3]]
            : [[x - 34, y + h / 2], [x - 4, y + h / 2]];
          return (i ? S.ok(ok, { renk: 'muted' }) : '') +
            S.kutu(x, y, w, h, { renk: renkler[i], dolgu: renkler[i] + '-soft' }) +
            S.t(x + w / 2, y + (satirlar.length === 1 ? 30 : 19), satirlar, { a: 'middle', c: 'b', lh: 19 });
        }).join('');
      },
    });
  }

  VIZ.a16a_damar = el => yollar(el, 'Damar yatağı ve dolaşım', 'Yolu izleyin', {
    'Ortak yol': { yol: [['Nitrik oksit', '(NO)'], ['Guanilat siklaz ↑', 'cGMP ↑'], ['Sitoplazmik Ca²⁺ ↓', 'Düz kas gevşer']],
      metin: 'SNP ve GTN ile oluşan NO, guanilat siklazı uyarır ve siklik guanozin monofosfatı (cGMP) artırır. [[K3 s. 257]] [[K3 s. 259]] Düz kasa Ca²⁺ girişi azalırken düz endoplazmik retikuluma Ca²⁺ alımı artar. [[K3 s. 257]] [[K3 s. 259]]' },
    'SNP · arter': { yol: [['Arter genişler'], ['Sistemik direnç ↓'], ['Kan basıncı ↓']], metin: 'Arteriyel genişleme sistemik vasküler direnci düşürür. [[K3 s. 257]]' },
    'SNP · ven': { yol: [['Ven genişler'], ['Kapasitans ↑'], ['Önyük ↓']], metin: 'Venler daha fazla kan tutabildiği için önyük azalır. [[K3 s. 257]]' },
    'GTN · ven': { yol: [['Ven genişler'], ['Venöz dönüş ↓', 'Önyük ↓'], ['Diyastol sonu', 'basıncı ↓']], metin: 'GTN arterleri de bir miktar genişletir, ancak etkisi venöz kapasitans damarlarında baskındır. [[K3 s. 259]]' },
  });

  VIZ.a16a_siyanur = el => yollar(el, 'Siyanürün izleyebileceği yollar', 'Metabolizma yolu', {
    'Başlangıç': { yol: [['Eritrositte SNP', '+ oksihemoglobin'], ['Methemoglobin', '+ NO + 5 CN⁻'], ['CN⁻ bağlanabilir', 'veya serbest kalır']], metin: 'İlk reaksiyonda methemoglobin ve NO ile birlikte beş siyanür iyonu açığa çıkar. [[K3 s. 257]] Methemoglobin CN⁻ bağlayabilir. [[K3 s. 258]]' },
    'Methemoglobin': { yol: [['CN⁻'], ['Methemoglobin', 'CN⁻ bağlar'], ['Siyano-', 'methemoglobin']], metin: 'Eritrositte oluşan siyanomethemoglobinin toksik olmadığı düşünülür. [[K3 s. 258]]' },
    'Rodanaz': { yol: [['Eritrositten', 'çıkan CN⁻'], ['Rodanaz', '+ sülfhidril grubu'], ['Tiyosiyanat', '(SCN)']], metin: 'Karaciğer ve böbrek mitokondrilerinde rodanaz, sülfhidril grubu ekleyerek CN⁻’yi SCN’ye dönüştürür. [[K3 s. 258]]' },
    'B₁₂': { yol: [['CN⁻'], ['Hidroksikobalamin', '(B₁₂)'], ['Siyanokobalamin']], metin: 'Siyanokobalamin toksik olmayan bir siyanür deposudur ve idrarla atılabilir. [[K3 s. 258]]' },
    'Serbest CN⁻': { yol: [['Sitokrom oksidaza', 'bağlanma'], ['Dokuda O₂', 'kullanımı ↓'], ['Metabolik asidoz', 'Mikst venöz O₂ sat. ↑']], metin: 'Serbest CN⁻ aerobik metabolizmayı bozabilir. [[K3 s. 258]] Dokular oksijeni kullanamadıkça mikst venöz oksijen satürasyonu yükselir. [[K3 s. 258]]' },
  });

  VIZ.a16a_nitrat = el => yollar(el, 'Nitratlarda uygulama yolu ve ilk geçiş', 'İlaç ve yol', {
    'GTN · dil altı': { yol: [['Sublingual mukoza'], ['Hızlı emilim'], ['Etki ≤ 3 dakikada', 'Süre 30–60 dakika']], metin: 'Dil altından verilen GTN’nin etkisi 3 dakika içinde başlar ve 30–60 dakika sürer. [[K3 s. 260]]' },
    'GTN · oral': { yol: [['Bağırsaktan', 'hızlı emilim'], ['Yaygın hepatik', 'ilk geçiş'], ['Biyoyararlanım', '%5’in altında']], metin: 'Ağızdan alınan GTN hızla emilse de ilk geçiş oral biyoyararlanımını sınırlar. [[K3 s. 260]]' },
    'ISDN · oral': { yol: [['İzosorbid dinitrat', '(ISDN)'], ['İyi emilim', 'Yaygın ilk geçiş'], ['2-mononitrat', '5-mononitrat']], metin: 'Karaciğerde oluşan iki mononitrat muhtemelen ISDN etkisinin büyük bölümünü sağlar. [[K3 s. 260]]' },
    'ISMN · oral': { yol: [['5-mononitrat', '(ISMN)'], ['Hepatik ilk', 'geçiş yok'], ['Biyoyararlanım', '%100']], metin: 'İzosorbid 5-mononitrat ayrıca ilaç olarak verilir. [[K3 s. 260–261]] Oral biyoyararlanımı %100’dür. [[K3 s. 261]]' },
  });

  VIZ.a16a_kanal = el => yollar(el, 'ATP, potasyum kanalı ve nitrat grubu', 'Durumu seçin', {
    'Normal döngü': { yol: [['Normal kalp', 'döngüsü'], ['ATP’ye duyarlı', 'K⁺ kanalı'], ['Kapalı']], metin: 'Normal kalp döngüsünde ATP’ye duyarlı K⁺ kanalları kapalıdır. [[K3 s. 261]]' },
    'İskemi': { yol: [['Hücre içi ATP ↓'], ['K⁺ kanalı açılır', 'K⁺ dışarı çıkar'], ['Hiperpolarizasyon', 'Ca²⁺ kanalı kapanır']], metin: 'İskemide ATP azalınca açılan kanaldan K⁺ gradyanı yönünde çıkar. [[K3 s. 261]] Hiperpolarizasyon Ca²⁺ kanallarını kapatır ve kasılma için kullanılabilir Ca²⁺ azalır. [[K3 s. 261]]' },
    'Nikorandil · K⁺': { yol: [['Nikorandil'], ['Kalp ve arteriyolde', 'K⁺ kanalı açılır'], ['K⁺ çıkışı', 'Hiperpolarizasyon']], metin: 'Nikorandil hem kalpte hem arteriyollerde ATP’ye duyarlı K⁺ kanallarını aktive eder. [[K3 s. 261]]' },
    'Nikorandil · nitrat': { yol: [['Nitrat grubu'], ['Guanilat siklaz ↑', 'cGMP ↑'], ['Venöz kapasitans', 'damarları gevşer']], metin: 'Venöz düz kasın gevşemesini nikorandilin nitrat grubu sağlar. [[K3 s. 261]]' },
  });
})();
