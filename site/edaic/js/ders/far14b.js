(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, liste) => ({ id: 'secili', ad, liste: liste.map(ad => ({ d: ad, ad })) });
  const ortada = { a: 'middle', c: 'b' };

  // Mekanizmayı yukarıdan aşağı okut. Oklar yalnız ardışık basamakları bağlar.
  function mekanizma(el, baslik, kontrol, yollar) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 222], vbDar: [360, 222],
      secenek: secim(kontrol, Object.keys(yollar)),
      ciz: (S, t, { secili }) => {
        const { basamak } = yollar[secili];
        const x = S.w / 2;
        return basamak.map((yazi, i) => {
          const y = 5 + i * 79;
          return (i ? S.ok([[x, y - 22], [x, y - 3]], { renk: 'muted' }) : '')
            + S.kutu(12, y, S.w - 24, 55, { yazi, renk: i === 2 ? 'clin' : 'basic', dolgu: i === 2 ? 'clin-soft' : 'basic-soft' });
        }).join('');
      },
      metin: ({ secili }) => yollar[secili].metin,
    });
  }

  VIZ.a14b_tonus = el => mekanizma(el, 'Parsiyel agonist ve sempatik tonus', 'Sempatik tonus', {
    'Düşük': { basamak: ['Dolaşımda az katekolamin', 'Parsiyel agonist reseptörü uyarır', 'Sempatomimetik etki'],
      metin: 'Katekolamin düzeyi düşükken parsiyel uyarının teorik olarak sempatomimetik etki oluşturması beklenir. [[K3 s. 230]]' },
    'Yüksek': { basamak: ['Yüksek sempatik tonus', ['Tam agonistle yarışma', 'Daha küçük maksimum yanıt'], 'Antagonist etki'],
      metin: 'Parsiyel agonistin maksimum yanıtı daha küçük olduğundan yüksek sempatik tonusta antagonist etki beklenir. [[K3 s. 230]]' },
  });

  VIZ.a14b_denge = el => mekanizma(el, 'Miyokardın oksijen dengesi', 'İzlenecek yol', {
    'Sunum': { basamak: ['SA düğümünde otomatisite ↓', 'Kalp hızı ↓', ['Diyastolik koroner perfüzyon süresi ↑', 'Oksijen sunumu ↑']],
      metin: 'Bradikardi koroner arterlerin diyastolde kanlanmasına daha uzun süre tanır. [[K3 s. 230]]' },
    'Gereksinim': { basamak: ['Kardiyak β-blokaj', 'Miyokart kontraktilitesi ↓', 'Oksijen gereksinimi ↓'],
      metin: 'Negatif inotropi miyokardın oksijen tüketimini azaltır. [[K3 s. 230]]' },
    'Karşı etki': { basamak: ['Koroner β₂ reseptörlerinde blokaj', 'Vazodilatör etki azalır', 'Koroner damar direnci ↑'],
      metin: 'Koroner direnç artışı dengeyi olumsuz etkiler, ancak hız ve kontraktilitedeki azalmanın yararı ağır basar. [[K3 s. 230]]' },
  });

  const yuzdeler = {
    Asebutolol: [90, 40, 25], Atenolol: [45, 45, 5], Metoprolol: [95, 50, 20],
    Oksprenolol: [80, 40, 80], Pindolol: [90, 90, 50], Propranolol: [90, 30, 90],
    Sotalol: [85, 85, 0], Timolol: [90, 50, 10], Labetalol: [70, 25, 50], Esmolol: [null, null, 60],
  };
  VIZ.a14b_kinetik = el => SEKIL.sahne(el, {
    baslik: 'Emilim, oral biyoyararlanım ve proteine bağlanma', vb: [640, 205], vbDar: [360, 205],
    secenek: secim('İlaç', Object.keys(yuzdeler)),
    ciz: (S, t, { secili }) => yuzdeler[secili].map((v, i) => {
      const y = 29 + i * 66;
      const etiket = ['Emilim', 'Oral biyoyararlanım', 'Proteine bağlanma'][i];
      const w = S.w - 32;
      return S.t(16, y, etiket, { c: 'b' })
        + S.t(S.w - 16, y, v === null ? 'Uygulanamaz' : '%' + v, { a: 'end' })
        + (v === null ? '' : S.kutu(16, y + 10, w, 12, { dolgu: 'paper', r: 3 })
          + (v > 0 ? S.kutu(16, y + 10, w * v / 100, 12, { dolgu: 'basic', renk: 'basic', r: 3 }) : ''));
    }).join(''),
    metin: ({ secili }) => secili === 'Esmolol' ? 'Esmolol yalnız IV kullanılır, bu nedenle ilk iki ölçüm uygulanamaz. [[K3 s. 233–234]]'
      : secili === 'Sotalol' ? 'Tabloda emilim ve biyoyararlanım %85’tir. [[K3 s. 233]] Ana metin tam emilim ve %90’ın üzerinde biyoyararlanım bildirir. [[K3 s. 235]]'
      : secili + ' için sırasıyla emilen, oral yoldan sistemik dolaşıma ulaşan ve proteine bağlanan oranlar gösterilmiştir. [[K3 s. 233]]',
  });

  VIZ.a14b_esmolol = el => mekanizma(el, 'Esmolol preparatını uygulamayla eşleştirme', '10 ml içindeki miktar', {
    '2.5 g': { basamak: ['10 ml’de 2.5 g', 'Önce seyreltme', ['İnfüzyon', '50–200 μg.kg⁻¹.dk⁻¹']],
      metin: 'Konsantre çözelti infüzyondan önce seyreltilir. [[K3 s. 233]]' },
    '100 mg': { basamak: ['10 ml’de 100 mg', '10 mg’lık boluslar', 'Etkiye göre titrasyon'],
      metin: 'Bu preparatla doz, 10 mg’lık bolusların etkisi izlenerek ayarlanır. [[K3 s. 233]]' },
  });

  VIZ.a14b_izomer = el => mekanizma(el, 'Rasemik ilaçlarda izomer ve etki', 'İzomer', {
    'Propranolol S': { basamak: ['Propranolol', 'S-izomeri', 'İlacın etkilerinin çoğu'], metin: 'Propranololün etkilerinin çoğundan S-izomeri sorumludur. [[K3 s. 234]]' },
    'Propranolol R': { basamak: ['Propranolol', 'R-izomeri', ['Periferde T₄ → T₃ dönüşümü', 'engellenir']], metin: 'Tiroid hormonlarının etkisini baskılamaya, R-izomerinin periferik dönüşümü engellemesi eklenir. [[K3 s. 234]]' },
    'Sotalol D': { basamak: ['Sotalol', 'D-izomeri', 'Sınıf III etki'], metin: 'D-izomeri sınıf III antiaritmik etki sağlar. [[K3 s. 235]]' },
    'Sotalol L': { basamak: ['Sotalol', 'L-izomeri', 'Sınıf III + sınıf II (β-blokaj)'], metin: 'L-izomeri her iki antiaritmik özelliği taşır. [[K3 s. 235]]' },
  });

  VIZ.a14b_labetalol = el => SEKIL.sahne(el, {
    baslik: 'Uygulama yoluna göre labetalolün α₁ ve β etkileri', vb: [640, 160], vbDar: [360, 160],
    secenek: secim('Uygulama yolu', ['Oral', 'İntravenöz']),
    ciz: (S, t, { secili }) => {
      const beta = secili === 'Oral' ? 3 : 7;
      const birim = (S.w - 90) / 7;
      return S.t(S.w / 2, 28, 'α₁ : β = 1 : ' + beta, ortada)
        + [1, beta].map((n, i) => {
          const y = 54 + 53 * i;
          return S.t(16, y + 19, i ? 'β' : 'α₁', ortada)
            + S.kutu(46, y, n * birim, 28, { renk: i ? 'clin' : 'basic', dolgu: i ? 'clin-soft' : 'basic-soft' })
            + S.t(56 + n * birim, y + 19, String(n));
        }).join('');
    },
    metin: ({ secili }) => secili === 'Oral' ? 'Oral uygulamada β-blokajın α₁-blokaja oranı üçtür. [[K3 s. 235]]' : 'İntravenöz uygulamada β-blokajın α₁-blokaja oranı yedidir. [[K3 s. 235]]',
  });
})();
