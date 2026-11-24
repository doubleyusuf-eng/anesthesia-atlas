(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [640, 210], vbDar: [360, 210] };
  const ortala = { a: 'middle', c: 'b' };
  const sec = (ad, liste) => ({ id: 'secim', ad, liste: liste.map(ad => ({ ad, d: ad })) });

  // Üstte koşul, altta bu koşula bağlı sonuçlar.
  function yol(S, baslik, sonuclar) {
    const gen = (S.w - 16) / sonuclar.length;
    let svg = S.kutu(12, 12, S.w - 24, 56, { yazi: baslik, dolgu: 'basic-soft', renk: 'basic' });
    sonuclar.forEach((sonuc, i) => {
      const x = 8 + i * gen, merkez = x + gen / 2;
      svg += S.ok([
        [S.w / 2, 68], [S.w / 2, 88], [merkez, 88], [merkez, 119]
      ], { renk: 'accent' });
      svg += S.kutu(x + 3, 124, gen - 6, 70, { yazi: sonuc, dolgu: 'accent-soft', lh: 19 });
    });
    return svg;
  }

  VIZ.a09f_ksenon = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Ksenonun solunuma etkileri', secenek: sec('İncelenen özellik', ['Ventilasyon', 'Gazın akışı']),
    ciz: (S, t, p) => p.secim === 'Ventilasyon'
      ? yol(S, 'Dakika hacmi sabit', [['Solunum sıklığı', '↓'], ['Tidal hacim', '↑']])
      : yol(S, 'N₂O ile karşılaştırma', [['Yoğunluk', '×3'], ['Viskozite', '×1,5']]),
    metin: p => p.secim === 'Ventilasyon'
      ? 'Soluklar seyrekleşirken her solukla alınan hacim artar. [[K3 s. 134]]'
      : 'Yüksek ksenon konsantrasyonunda hava yolu direncinin artması beklenebilir, ancak klinik etkisi muhtemelen küçüktür. [[K3 s. 134]]'
  });

  VIZ.a09f_oksijen = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Oksijenin depolanması', secenek: sec('Depo', ['Tüp', 'Evaporatör']),
    ciz: (S, t, p) => p.secim === 'Tüp'
      ? yol(S, 'Beyaz omuzlu siyah tüp', ['Gaz', '137 bar'])
      : yol(S, ['Dışarıda, vakum yalıtımlı', 'evaporatör (VIE)'], ['Sıvı', ['10 bar', '−180°C']]),
    metin: p => p.secim === 'Tüp' ? 'Tüpte oksijen basınç altında gaz halinde kalır. [[K3 s. 134]]'
      : 'Üç ayağın ikisi menteşelidir. [[K3 s. 134]] Üçüncü ayak tartı görevi görür ve kadran depodaki miktarı gösterir. [[K3 s. 134]]'
  });

  VIZ.a09f_no = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Nitrik oksit sentazın iki formu', secenek: sec('NOS formu', ['Konstitütif', 'İndüklenebilir']),
    ciz: (S, t, p) => p.secim === 'Konstitütif'
      ? yol(S, 'Konstitütif NOS', [['Ca²⁺/kalmoduline', 'bağımlı'], ['cGMP ile uyarılır', '(kitaba göre)']])
      : yol(S, ['Endotoksin veya', 'belirli sitokinler'], [['NOS', 'indüksiyonu'], ['NO üretiminde', 'belirgin artış']]),
    metin: p => p.secim === 'Konstitütif'
      ? 'Bu form endotelde, nöronlarda, iskelet kasında, kalpte ve trombositlerde normalde bulunur. [[K3 s. 135]]'
      : 'Uyarıdan sonra endotel, damar düz kası, miyosit, makrofaj ve nötrofillerde görülür. [[K3 s. 135]]'
  });

  VIZ.a09f_helyum = el => SEKIL.sahne(el, {
    vb: [640, 205], vbDar: [360, 205], baslik: 'Havaya göre özgül ağırlıkların karşılaştırması',
    ciz: S => {
      const gazlar = [['He', 0.178], ['Heliox', 0.337], ['Hava', 1], ['O₂', 1.091]];
      return gazlar.map(([ad, deger], i) => {
        const y = 32 + 46 * i;
        return S.t(12, y, ad, { c: 'b' }) +
          S.kutu(78, y - 16, (S.w - 172) * deger / 1.091, 20, { dolgu: 'clin-soft', renk: 'clin', r: 3 }) +
          S.t(S.w - 12, y, String(deger).replace('.', ','), { a: 'end', c: 'b' });
      }).join('');
    },
    metin: () => 'Havanın özgül ağırlığı 1 alınırsa hem saf helyum hem de Heliox havadan ve oksijenden hafiftir. [[K3 s. 137]]'
  });

  VIZ.a09f_karbondioksit = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'PaCO₂ yükselirken solunum ve beyin', secenek: sec('PaCO₂', ['Yükselirken', '10 kPa üzerinde']),
    ciz: (S, t, p) => p.secim === 'Yükselirken'
      ? yol(S, 'PaCO₂ ↑', [['Dakika hacmi ↑', 'Bronkodilatasyon'], ['Serebral akım ↑', 'Kafa içi basınç ↑']])
      : yol(S, 'PaCO₂ > 10 kPa', [['Solunum', 'baskılanabilir'], ['Narkoz', 'gelişebilir']]),
    metin: p => p.secim === 'Yükselirken'
      ? 'Solunum merkezi ve periferik kemoreseptörler PaCO₂ artışına yanıt verir. [[K3 s. 137]]'
      : 'Bu düzeyin üzerinde solunum depresyonu ve narkoz gelişebilir. [[K3 s. 137]]'
  });

  const tepkimeler = [
    ['Asit oluşumu', 'H₂O + CO₂', 'H₂CO₃', 'Su ile birleşen karbondioksitten karbonik asit oluşur. [[K3 s. 137]]'],
    ['Nötralizasyon', 'H₂CO₃ + 2 NaOH', 'Na₂CO₃ + 2 H₂O', 'Sodyum hidroksit karbonik asidi nötralize eder, sodyum karbonat ve su açığa çıkar. [[K3 s. 137]]'],
    ['Yenilenme', 'Na₂CO₃ + Ca(OH)₂', 'CaCO₃ + 2 NaOH', 'Kalsiyum karbonat oluşurken önceki basamakta kullanılan sodyum hidroksit geri kazanılır. [[K3 s. 137]]']
  ];
  VIZ.a09f_absorban = el => SEKIL.adim(el, {
    ...boyut, baslik: 'Soda lime içinde karbonun izlediği yol', oto: false,
    adimlar: tepkimeler.map(([ad, giren, urun, metin]) => ({
      ad, metin, ciz: S => S.t(S.w / 2, 46, giren, ortala) +
        S.ok([
          [S.w / 2, 63], [S.w / 2, 122]
        ], { renk: 'clin' }) +
        S.kutu(20, 131, S.w - 40, 56, { yazi: urun, dolgu: 'clin-soft', renk: 'clin' })
    }))
  });
})();
