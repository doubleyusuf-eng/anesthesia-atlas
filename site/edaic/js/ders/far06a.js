(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [600, 220], vbDar: [350, 220] };
  const sec = (ad, liste) => ({ id: 'secim', ad, liste: liste.map(([d, ad]) => ({ d, ad })) });
  const merkez = { a: 'middle', c: 'b' };
  const model = [
    ['Uygulama', 'Doz ve doz aralığı', 'Uygulama biçimi ve infüzyon hızı, konsantrasyon öngörüsünün girdileridir. [[K3 s. 52]]'],
    ['Plazma', 'Zamana göre C', 'Deneysel gözlemlere dayanan denklem, belirli bir zamandaki plazma konsantrasyonunu öngörür. [[K3 s. 52]]'],
    ['Etki', 'Büyüklük ve süre', 'Plazma düzeyi ile farmakodinamik etki arasındaki ilişki, klinik etkinin büyüklüğünü ve süresini öngörmeye yardım eder. [[K3 s. 52]]'],
  ];
  VIZ.a06a_model = (el) => SEKIL.adim(el, {
    ...boyut, baslik: 'Uygulama, plazma konsantrasyonu ve klinik etki', oto: false,
    adimlar: model.map(([ad, , metin]) => ({ ad, metin })),
    ortak(S, secili) {
      let svg = '';
      model.forEach(([ad, alt], i) => {
        const x = S.dar ? 55 : 10 + i * 198;
        const y = S.dar ? 6 + i * 76 : 66;
        const w = S.dar ? 240 : 178;
        svg += S.kutu(x, y, w, 54, {
          yazi: [ad, alt], renk: i === secili ? 'accent' : 'line',
          dolgu: i === secili ? 'accent-soft' : 'paper',
        });
        if (i < model.length - 1) {
          svg += S.ok(S.dar ? [[175, y + 56], [175, y + 72]] : [[x + w + 2, 93], [x + 195, 93]], { renk: 'muted' });
        }
      });
      return svg;
    },
  });

  // Çizim koordinatları boyutsuzdur. Sayısal ilaç parametresi gösterilmez.
  const azalma = u => Math.exp(-3 * u);
  function grafik(S, f, ek) {
    const X = u => 44 + u * (S.w - 68);
    const Y = v => 172 - v * 126;
    function yol(bas, son) {
      return Array.from({ length: 81 }, (_, i) => {
        const u = bas + (son - bas) * i / 80;
        return [X(u), Y(f(u))];
      });
    }
    return S.cizgi([[X(0), 31], [X(0), Y(0)], [X(1), Y(0)]], { renk: 'muted' })
      + S.t(X(0), 20, 'Konsantrasyon', { c: 'b' })
      + S.t(X(1), 209, 'Zaman', { a: 'end' })
      + ek(X, Y, yol)
      + S.cizgi(yol(0, 1), { renk: 'accent', w: 3 });
  }

  VIZ.a06a_ustel = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Uzaklaşma ve birikmede başlangıç ile sınır değer',
    secenek: sec('Uygulama', [['bolus', 'Tek bolus'], ['infuzyon', 'Sabit hızlı infüzyon']]),
    ciz(S, t, p) {
      const bolus = p.secim === 'bolus';
      return grafik(S, bolus ? azalma : u => 1 - azalma(u), (X, Y) => {
        const sinir = bolus ? 0 : 1;
        let isaretler = '';
        if (bolus) {
          for (const [sure, etiket] of [[Math.LN2, 't½'], [1, 'τ']]) {
            const u = sure / 3;
            isaretler += S.cizgi([[X(u), Y(0)], [X(u), Y(azalma(u))]], { renk: 'basic', kesik: true })
              + S.t(X(u), 193, etiket, merkez);
          }
        }
        return isaretler + S.cizgi([[X(0), Y(sinir)], [X(1), Y(sinir)]], { renk: 'clin', kesik: true })
          + S.t(X(0) - 7, Y(1) + 5, bolus ? 'C₀' : 'Cₛₛ', { a: 'end' })
          + S.t(X(0) - 7, Y(0) + 5, '0', { a: 'end' })
          + S.daire(X(0), Y(1 - sinir), 4, { dolgu: 'accent', renk: 'accent' });
      });
    },
    metin: p => p.secim === 'bolus'
      ? 'Eğri C₀’dan başlar ve yatay asimptotu olan sıfıra yaklaşır. [[K3 s. 53–54]]'
      : 'Eğri sıfırdan başlar ve kesikli çizgiyle gösterilen kararlı durum düzeyine yaklaşır. [[K3 s. 54]]',
  });

  const usler = [
    ['1', '10⁰ = 1', 'log 1 = 0', '55'], ['5', '10^(0,699) ≈ 5', 'log 5 ≈ 0,699', '54–55'],
    ['10', '10¹ = 10', 'log 10 = 1', '55'], ['1000', '10³ = 1000', 'log 1000 = 3', '54–55'],
    ['2 (e tabanı)', 'e^(0,693) ≈ 2', 'ln 2 ≈ 0,693', '56'],
  ];
  VIZ.a06a_log = (el) => SEKIL.adim(el, {
    ...boyut, baslik: 'Aynı sayının üs ve logaritma ile gösterimi', oto: false,
    adimlar: usler.map(([ad, kuvvet, log, sayfa]) => ({
      ad, metin: `${log}. [[K3 s. ${sayfa}]]`,
      ciz: S => S.t(S.w / 2, 34, 'Üstel gösterim', merkez)
        + S.kutu(S.w / 2 - 108, 46, 216, 44, { yazi: kuvvet, dolgu: 'basic-soft' })
        + S.ok([
          [S.w / 2, 94], [S.w / 2, 120],
        ], { renk: 'muted' })
        + S.kutu(S.w / 2 - 108, 124, 216, 44, { yazi: log, dolgu: 'accent-soft' })
        + S.t(S.w / 2, 196, 'Logaritmik gösterim', merkez),
    })),
  });

  VIZ.a06a_turev = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Birinci ve sıfırıncı derecede teğet eğimi',
    secenek: sec('Kinetik ve zaman', [
      ['bir-erken', 'Birinci · erken'], ['bir-gec', 'Birinci · geç'],
      ['sifir-erken', 'Sıfırıncı · erken'], ['sifir-gec', 'Sıfırıncı · geç'],
    ]),
    ciz(S, t, p) {
      const bir = p.secim.startsWith('bir');
      const f = bir ? azalma : u => 1 - 0.86 * u;
      const u = p.secim.endsWith('gec') ? 0.73 : 0.18;
      const egim = bir ? -3 * f(u) : -0.86;
      return grafik(S, f, (X, Y) => {
        const teget = d => [X(u + d), Y(f(u) + d * egim)];
        // Teğet doğrunun üzerinde de seçilebilsin diye doğrultuyu iki yanda uzat.
        return S.cizgi([teget(-0.14), teget(0.14)], { renk: 'clin', w: 7, kesik: true })
          + S.daire(X(u), Y(f(u)), 6, { renk: 'clin', dolgu: 'clin' });
      });
    },
    metin: p => p.secim.startsWith('sifir')
      ? 'Teğet doğruyla çakışır: erken ve geç noktada düşüş hızı aynıdır. [[K3 s. 56]]'
      : p.secim.endsWith('gec') ? 'Geç noktada C daha düşüktür ve teğet yataya yaklaşır. [[K3 s. 56]]'
        : 'Erken noktada C yüksektir ve teğet aşağıya daha diktir. [[K3 s. 56]]',
  });

  VIZ.a06a_alan = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Sonlu aralık ve toplam eğri altı alan',
    secenek: sec('İntegral sınırları', [['ara', 'İki zaman arası'], ['tum', 'Sıfırdan sonsuza']]),
    ciz(S, t, p) {
      const tum = p.secim === 'tum';
      const bas = tum ? 0 : 0.2;
      const son = tum ? 1 : 0.64;
      return grafik(S, azalma, (X, Y, yol) => {
        const alan = [[X(bas), Y(0)], ...yol(bas, son), [X(son), Y(0)]];
        const sinirlar = tum ? S.t(X(0), 193, '0', merkez)
          : S.t(X(bas), 193, 'Alt sınır', merkez) + S.t(X(son), 193, 'Üst sınır', merkez);
        return S.cizgi(alan, { dolgu: 'clin-soft', renk: 'clin', w: 1 })
          + sinirlar + (tum ? S.ok([[X(1) - 12, Y(azalma(1))], [X(1) + 10, Y(azalma(1)) + 1]], { renk: 'accent' }) : '');
      });
    },
    metin: p => p.secim === 'ara' ? 'Renkli bölgenin sol ve sağ kenarları integralin zaman sınırlarını gösterir. [[K3 s. 57]]'
      : 'Toplam alan başlangıçtan itibaren tüm eğriyi, sonsuza uzanan kuyruğu da kapsar. [[K3 s. 57]]',
  });
})();
