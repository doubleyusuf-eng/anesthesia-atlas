(function () {
  'use strict';
  const VIZ = window.VIZ;
  function secenek(ad, isimler) {
    return { id: 'secim', ad, liste: isimler.map(isim => ({ d: isim, ad: isim })) };
  }

  // Aynı eksendeki kutuların sırası neden-sonuç ilişkisini gösterir.
  function zincir(S, satirlar, vurgu) {
    const x = S.w / 2, en = Math.min(330, S.w - 28);
    return satirlar.map((satir, i) => {
      const y = 8 + 63 * i;
      const bag = i ? S.ok([[x, y - 19], [x, y - 2]], { renk: 'muted' }) : '';
      return bag + S.kutu(x - en / 2, y, en, 44, {
        yazi: satir, dolgu: i === vurgu ? 'accent-soft' : 'paper',
        renk: i === vurgu ? 'accent' : 'line'
      });
    }).join('');
  }

  const kanallar = {
    L: { yol: ['Kardiyovasküler sistem', 'L-tipi kanaldan Ca²⁺ girişi', 'Hücre içinden Ca²⁺ salınımı'],
      metin: 'Yavaş içe akım kardiyak aksiyon potansiyelinin platosunu oluşturur ve hücre içi Ca²⁺ salınımını tetikler. [[K3 s. 262]] Antagonistler bu girişi bloke eder. [[K3 s. 262]]' },
    T: { yol: ['T-tipi kanal', ['SA düğüm ve bazı', 'damar düz kasları'], 'Antagonistlerden etkilenmez'],
      metin: 'Yapısı L-tipine benzer, başlıca T-tübülü olmayan kardiyak hücrelerde ve bazı damar düz kaslarında bulunur. [[K3 s. 262]] Ventrikül miyokardında bulunmaz. [[K3 s. 262]]' },
    N: { yol: ['N-tipi kanal', 'Yalnız sinir hücreleri', 'Antagonistlerden etkilenmez'],
      metin: 'N-tipi kanallar sinir hücrelerine özgüdür ve bu gruptaki ilaçların hedefi dışındadır. [[K3 s. 262]]' }
  };
  VIZ.a16b_kanal = el => SEKIL.sahne(el, {
    baslik: 'Kalsiyum kanallarının dağılımı ve blokajı', vb: [620, 190], vbDar: [360, 190],
    secenek: secenek('Kanal', Object.keys(kanallar)),
    ciz: (S, t, p) => zincir(S, kanallar[p.secim].yol, 1),
    metin: p => kanallar[p.secim].metin
  });

  const etkiler = {
    Verapamil: { oklar: ['↓', '↓', '↑', '↓↓', '↑'], metin: 'SA ve AV düğümde iletim yavaşlar, kalp hızı düşer. [[K3 s. 262]] Periferik damarlar genişler, koroner arterlerde genişleme hafiftir. [[K3 s. 262]]' },
    Nifedipin: { oklar: ['↓', '→ / ↑', '→ / ↑', '→ / ↑', '↑↑↑'], metin: 'Arter genişlemesi belirgindir, hız ve kontraktilite refleks olarak artabilir. [[K3 s. 263]] Yatay ok değişmeyen yanıtı gösterir. [[K3 s. 263]]' },
    Diltiazem: { oklar: ['↓', '↓', '↑', '↓', '↑↑'], metin: 'AV iletisi yavaşlarken koroner ve periferik arterler genişler. [[K3 s. 263–264]]' }
  };
  VIZ.a16b_yanit = el => SEKIL.sahne(el, {
    baslik: 'Bir ilacın beş kardiyovasküler etkisi', vb: [600, 225], vbDar: [360, 225],
    secenek: secenek('İlaç', Object.keys(etkiler)),
    ciz: (S, t, p) => ['Kan basıncı', 'Kalp hızı', 'AV ileti süresi', 'Miyokart kontraktilitesi', 'Periferik ve koroner genişleme'].map((ad, i) => {
      const y = 6 + i * 44;
      return S.kutu(5, y, S.w - 10, 39, { dolgu: i % 2 ? 'paper' : 'basic-soft' }) +
        S.t(14, y + 26, ad) + S.t(S.w - 16, y + 26, etkiler[p.secim].oklar[i], { a: 'end', c: 'b', renk: 'accent' });
    }).join(''),
    metin: p => etkiler[p.secim].metin
  });

  const refleks = [
    { ad: 'Hücre', yol: ['Guanilat siklaz aktivasyonu', 'Hücre içi cGMP ↑', 'Kullanılabilir Ca²⁺ ↓'],
      metin: 'Kesin mekanizma belirsizdir, guanilat siklaz aktivasyonu ve cGMP artışı kullanılabilir hücre içi Ca²⁺ miktarını azaltır. [[K3 s. 265]]' },
    { ad: 'Damar', yol: ['Kullanılabilir Ca²⁺ ↓', 'Arteriyol tonusu ↓', 'Sistemik damar direnci ↓'],
      metin: 'Kapasitans damarları daha az etkilendiğinden postüral hipotansiyon genellikle sorun oluşturmaz. [[K3 s. 265]]' },
    { ad: 'Kalp', yol: ['Arteriyoler genişleme', 'Refleks taşikardi', 'Kalp debisi ↑'],
      metin: 'β-blokaj refleks taşikardiyi ve kalp debisindeki artışı etkili biçimde sınırlayabilir. [[K3 s. 265]]' }
  ];
  VIZ.a16b_refleks = el => SEKIL.adim(el, {
    baslik: 'Hidralazinle hücreden kalbe yanıt', vb: [620, 190], vbDar: [360, 190], oto: false,
    adimlar: refleks.map(adim => ({ ad: adim.ad, metin: adim.metin, ciz: S => zincir(S, adim.yol, 2) }))
  });

  const pulmoner = {
    Sildenafil: { yol: ['Sildenafil', 'cGMP ↑', ['Pulmoner arter ve korpus', 'kavernozum düz kası gevşer']],
      metin: 'Sildenafilin güçlü inhibitör etkisiyle cGMP düzeyi yükselir ve damar düz kası gevşer. [[K3 s. 267]]' },
    Bosentan: { yol: ['Bosentan', 'Endotelin A ve B blokajı', 'Pulmoner ve sistemik direnç ↓'],
      metin: 'İki endotelin reseptör alt tipi de bloke edilir, damar direnci düşerken kalp hızı artmaz. [[K3 s. 267]]' }
  };
  VIZ.a16b_pulmoner = el => SEKIL.sahne(el, {
    baslik: 'Pulmoner dolaşımda hedef ve yanıt', vb: [620, 190], vbDar: [360, 190],
    secenek: secenek('İlaç', Object.keys(pulmoner)),
    ciz: (S, t, p) => zincir(S, pulmoner[p.secim].yol, 1),
    metin: p => pulmoner[p.secim].metin
  });
})();
