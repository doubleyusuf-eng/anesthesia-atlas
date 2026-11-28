(function () {
  'use strict';
  const VIZ = window.VIZ;
  const alan = { vb: [480, 220], vbDar: [360, 220] };
  const orta = { a: 'middle', c: 'b' };
  const secim = (ad, liste) => ({ id: 'kip', ad, liste: liste.map(([d, ad]) => ({ d, ad })) });

  function dalga(S, x, y, uzunluk, periyot) {
    const pts = Array.from({ length: Math.ceil(uzunluk) + 1 }, (_, i) =>
      [x + i, y - 8 * Math.sin(2 * Math.PI * i / periyot)]);
    return S.cizgi(pts, { renk: 'accent', w: 2.5 });
  }

  VIZ.fk24_enerji = (el) => SEKIL.sahne(el, {
    ...alan, baslik: 'Dalga boyu ve geçiş enerjisi',
    param: [{ id: 'lambda', ad: 'Dalga boyu', min: 380, max: 1000, adim: 1, deger: 380, birim: 'nm' }],
    ciz(S, t, p) {
      const x = S.w / 2;
      const ust = 178 - 124 * 380 / p.lambda;
      return S.t(x / 2, 24, 'Elektron düzeyleri', orta) + S.t(x * 1.5, 24, 'Soğurulan foton', orta)
        + S.cizgi([[22, ust], [x - 16, ust]], { renk: 'clin' })
        + S.cizgi([[22, 178], [x - 16, 178]], { renk: 'basic' })
        + S.t(24, ust - 8, 'E₂') + S.t(24, 200, 'E₁')
        + S.ok([[x / 2, 174], [x / 2, ust + 4]], { renk: 'clin' })
        + S.t(x / 2 + 10, (ust + 178) / 2 + 4, 'ΔE')
        + dalga(S, x + 8, 115, x - 28, 24 * p.lambda / 380)
        + S.t(x * 1.5, 151, p.lambda + ' nm', orta);
    },
    metin: p => 'Seçilen dalga boyu ' + p.lambda + ' nm (boya lazeri aralığı). [[K6 s. 398]] Dalga boyu arttıkça fotonun karşılayabildiği enerji farkı küçülür. [[K6 s. 395–396]]'
  });

  VIZ.fk24_emisyon = (el) => SEKIL.sahne(el, {
    ...alan, baslik: 'Kendiliğinden ve uyarılmış emisyon',
    secenek: secim('Emisyon türü', [['tek','Kendiliğinden'],['cift','Uyarılmış']]),
    ciz(S, t, p) {
      const cift = p.kip === 'cift', x = S.w / 2;
      const ust = 65, alt = 146;
      let resim = S.t(x, 29, 'Elektron geçişi', orta)
        + S.cizgi([[x - 40, ust], [x + 40, ust]], { renk: 'clin' })
        + S.cizgi([[x - 40, alt], [x + 40, alt]], { renk: 'basic' })
        + S.ok([[x, ust + 6], [x, alt - 6]], { renk: 'clin' })
        + S.t(x - 37, ust - 7, 'E₂') + S.t(x - 37, alt + 21, 'E₁');
      if (cift) {
        resim += dalga(S, 12, 103, x - 79, 22)
          + S.ok([[x - 64, 103], [x - 46, 103]], { renk: 'accent' })
          + S.t(x / 2, 200, 'Gelen foton', orta);
        for (const y of [86, 120]) {
          resim += dalga(S, x + 46, y, x - 74, 22)
            + S.ok([ [S.w - 30, y], [S.w - 12, y] ], { renk: 'accent' });
        }
      } else {
        resim += '<g transform="rotate(-18 ' + (x + 42) + ' 107)">'
          + dalga(S, x + 42, 107, x - 74, 22)
          + S.ok([ [S.w - 34, 107], [S.w - 16, 107] ], { renk: 'accent' }) + '</g>';
      }
      return resim + S.t(x * 1.52, 200, cift ? 'Eş fazlı çift' : 'Tek foton', orta);
    },
    metin: p => p.kip === 'cift'
      ? 'Gelen foton ilerlemeyi sürdürürken ona aynı fazda bir foton katılır, ikisi aynı yönde uzaklaşır. [[K6 s. 397]]'
      : 'Tek elektronun kendiliğinden geçişinde bir foton çıkar, çizilen yön olası yönlerden biridir. [[K6 s. 396]]'
  });

  VIZ.fk24_tup = (el) => SEKIL.cizim(el, {
    baslik: 'Gaz lazeri tüpü', giris: 'Önce elektrik bağlantısını, ardından ışığın çıktığı aynayı seçin.',
    gorunumler: [{ ad: 'Yandan kesit', resim: 'img/fizik/24-gaz-lazeri.webp', en: 1024, boy: 342,
      noktalar: [
        { x: 71, y: 184, ad: 'Arka ayna', metin: 'Tam yansıtıcı arka ayna fotonları yeniden etkin ortama gönderir. [[K6 s. 395]]' },
        { x: 117, y: 83, ad: 'Elektrik bağlantısı', metin: 'Tüpün iki ucuna uygulanan akım gaz ortamını uyarır. [[K6 s. 394–395]]' },
        { x: 409, y: 156, ad: 'Etkin gaz ortamı', metin: 'Uyarılmış ortamdaki fotonlar yeni emisyonlar tetikleyerek ışığı güçlendirir. [[K6 s. 395–397]]' },
        { x: 820, y: 207, ad: 'Kısmen yansıtıcı ayna', metin: 'Fotonların bir bölümü tüpe geri döner, bir bölümü bu aynayı geçer. [[K6 s. 395]]' },
        { x: 930, y: 188, ad: 'Çıkış demeti', metin: 'Tüpten çıkan dar ve koherent demet, kullanılacağı yere odaklanabilir. [[K6 s. 395–398]]' }
      ] }]
  });

  VIZ.fk24_atim = (el) => SEKIL.sahne(el, {
    ...alan, baslik: 'Zaman içinde lazer çıkışı',
    secenek: secim('Çıkış biçimi', [['surekli','Sürekli'],['atim','Atımlı']]),
    ciz(S, t, p) {
      const sol = 65, sag = S.w - 28, ust = 62, alt = 146;
      const atim = p.kip === 'atim';
      const pts = [[sol, ust]];
      if (atim) {
        const aralik = (sag - sol) / 3;
        for (let i = 0; i < 3; i++) {
          const kapan = sol + (i + 0.36) * aralik, acil = sol + (i + 1) * aralik;
          pts.push([kapan, ust], [kapan, alt], [acil, alt]);
          if (i < 2) pts.push([acil, ust]);
        }
      } else pts.push([sag, ust]);
      return S.t(12, ust + 4, 'Açık') + S.t(12, alt + 4, 'Kapalı')
        + S.cizgi([[sol, alt], [sag, alt]], { renk: 'line' })
        + S.cizgi(pts, { renk: 'accent', w: 3 })
        + S.ok([[sol, 177], [sag, 177]], { renk: 'muted' })
        + S.t(sag, 202, 'Zaman', { a: 'end' });
    },
    metin: p => p.kip === 'atim'
      ? 'Kısa açık dönemde odaktaki doku uzaklaştırılır, kapalı dönemde buharlaşan doku ısı taşır ve komşu dokular soğur. [[K6 s. 399]]'
      : 'Sürekli çıkışta hedefe sabit bir demet ulaşır, ardışık atımlardaki soğuma araları yoktur. [[K6 s. 399]]'
  });

  VIZ.fk24_risk = (el) => SEKIL.sahne(el, {
    ...alan, baslik: 'Doğrudan ve yansıyan demetin yolu',
    secenek: secim('Maruziyet', [['ana','Doğrudan'],['yansima','Yansıyarak']]),
    ciz(S, t, p) {
      const yansima = p.kip === 'yansima', x = S.w / 2, y = yansima ? 60 : 150;
      return S.kutu(12, 132, 74, 36, { yazi: 'Lazer', dolgu: 'basic-soft' })
        + S.ok(yansima ? [[87, 150], [x, 150], [S.w - 84, y]] : [[87, 150], [S.w - 84, y]], { renk: 'crit', w: 3 })
        + (yansima ? S.cizgi([[x - 31, 165], [x + 31, 139]], { renk: 'muted', w: 5 })
          + S.t(x, 198, 'Parlak alet', orta) : '')
        + S.kutu(S.w - 78, y - 18, 66, 36, { yazi: 'Göz', dolgu: 'crit-soft' });
    },
    metin: p => p.kip === 'yansima'
      ? 'Parlak yüzeyden dönen demet de göze ulaşabilir, bu nedenle cerrahi aletlerde sıklıkla mat yüzey kullanılır. [[K6 s. 400]]'
      : 'Ana demete doğrudan bakmak, özellikle kornea, mercek ve retina için ciddi risk taşır. [[K6 s. 399–400]]'
  });
})();
