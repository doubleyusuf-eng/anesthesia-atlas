(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };

  // Her seçimin üst kutusu etki yerini, alt kutusu sonucu gösterir.
  function yol(S, ust, alt) {
    const x = S.w / 2;
    const gen = Math.min(S.w - 24, 460);
    return S.kutu(x - gen / 2, 8, gen, 55, { dolgu: 'basic-soft', renk: 'basic' })
      + S.t(x, 41, ust, orta)
      + S.ok([[x, 65], [x, 91]], { renk: 'muted' })
      + S.kutu(x - gen / 2, 95, gen, 91, { dolgu: 'clin-soft', renk: 'clin' })
      + S.t(x, 146 - (alt.length - 1) * 11, alt, { a: 'middle', lh: 22 });
  }

  function secim(el, baslik, ad, yollar) {
    return SEKIL.sahne(el, {
      baslik, vb: [600, 196], vbDar: [360, 196],
      secenek: { id: 'yol', ad, liste: yollar.map(v => ({ d: v.ad, ad: v.ad })) },
      ciz: (S, t, p) => {
        const v = yollar.find(v => v.ad === p.yol);
        return yol(S, v.ust, v.alt);
      },
      metin: p => yollar.find(v => v.ad === p.yol).metin
    });
  }

  VIZ.a14a_uyari = el => secim(el, 'Uyarılan reseptöre göre yanıt', 'Reseptör', [
    { ad: 'Postsinaptik α₁', ust: 'Postsinaptik α₁ uyarısı', alt: ['Vazokonstriksiyon', 'Midriyazis', 'Mesane sfinkterinde kasılma'],
      metin: 'α₁ uyarısında damar daralırken pupilla genişler ve mesane sfinkteri kasılır. [[K3 s. 227]]' },
    { ad: 'Postsinaptik α₂', ust: 'Postsinaptik α₂ uyarısı', alt: ['Trombosit agregasyonu', 'Bazı merkezi sinir sistemi', 'nöronlarında hiperpolarizasyon'],
      metin: 'Postsinaptik α₂ uyarısı trombosit agregasyonuna ve bazı merkezi sinir sistemi nöronlarında hiperpolarizasyona yol açar. [[K3 s. 227]]' },
    { ad: 'Presinaptik α₂', ust: 'Presinaptik α₂ uyarısı', alt: ['Noradrenalin salınımı ↓'],
      metin: 'Presinaptik α₂ reseptörü uyarıldığında noradrenalin salınımı baskılanır. [[K3 s. 227]]' }
  ]);

  VIZ.a14a_fentolamin = el => secim(el, 'Fentolaminin iki dolaşım etkisi', 'Blokajın bileşeni', [
    { ad: 'α₁ blokajı', ust: 'Damar düzeyinde α₁ blokajı', alt: ['Vazodilatasyon', 'Kan basıncı ↓'],
      metin: 'Nazal mukozadaki damarların genişlemesi belirgin burun tıkanıklığı yapar. [[K3 s. 226]]' },
    { ad: 'α₂ blokajı', ust: 'Noradrenalin salınımı kolaylaşır', alt: ['Taşikardi', 'Kalp debisi ↑'],
      metin: 'α₂ blokajı noradrenalin salınımını kolaylaştırarak taşikardiye ve kalp debisinde artışa yol açar. [[K3 s. 226]]' }
  ]);

  function reseptor(S, evre) {
    const x = S.w / 2;
    const etiket = ['Reaktif ara ürün', 'Kovalent bağ', 'Yeni α-adrenoseptör'][evre];
    const bagli = evre === 1;
    const y = bagli ? 92 : 55;
    const taban = 124;
    let svg = S.t(x, 24, etiket, orta)
      + S.cizgi([[x - 106, taban], [x + 106, taban]], { renk: 'line', w: 4 })
      + S.cizgi([[x - 34, 74], [x - 34, 103], [x + 34, 103], [x + 34, 74]], { renk: 'basic', w: 7 })
      + S.cizgi([[x, 104], [x, taban]], { renk: 'basic', w: 7 });
    if (evre < 2) svg += S.daire(x, y, 12, { renk: 'clin', dolgu: 'clin-soft' });
    if (evre === 0) svg += S.ok([[x, 69], [x, 90]], { renk: 'clin' });
    if (bagli) svg += S.cizgi([[x + 12, y], [x + 31, y]], { renk: 'clin', w: 5 });
    return svg + S.t(x, 159, ['α-adrenoseptör', 'Geri dönüşümsüz blokaj', 'Etki 3 gün sürebilir'][evre], orta);
  }

  VIZ.a14a_bag = el => SEKIL.adim(el, {
    baslik: 'Fenoksibenzamin blokajı neden uzun sürer?', vb: [600, 196], vbDar: [360, 196], oto: false,
    adimlar: [
      { ad: 'Bağlanma', ciz: S => reseptor(S, 0),
        metin: 'Fenoksibenzaminin reaktif ara ürünü reseptöre kovalent bağlanır. [[K3 s. 227]]' },
      { ad: 'Blokaj', ciz: S => reseptor(S, 1),
        metin: 'Bağlanan reseptörde blokaj geri dönüşümsüzdür. [[K3 s. 227]]' },
      { ad: 'Yenilenme', ciz: S => reseptor(S, 2),
        metin: 'Plazma yarılanma ömrü yaklaşık 24 saattir, ancak reseptörler yenilenirken etki daha uzun sürebilir. [[K3 s. 228]]' }
    ]
  });

  VIZ.a14a_selektif = el => secim(el, 'Selektif blokajda dolaşım yanıtları', 'İlaç', [
    { ad: 'Prazosin', ust: 'Selektif α₁ blokajı', alt: ['Arter ve venlerde genişleme', 'Sistemik vasküler direnç ↓', 'Diyastolik basınç en çok düşer'],
      metin: 'Prazosinle refleks taşikardi çok azdır ya da görülmez. [[K3 s. 228]]' },
    { ad: 'Yohimbin', ust: 'Selektif α₂ blokajı', alt: ['Kalp hızı ve kan basıncı ↑', 'Ortostatik hipotansiyon olası'],
      metin: 'Yohimbinin dolaşım etkisi değişkendir ve ortostatik hipotansiyonu tetikleyebilir. [[K3 s. 229]]' }
  ]);
})();
