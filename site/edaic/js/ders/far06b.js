(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const secim = (ad, adlar) => ({ id: 'gorunum', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  const boyut = { vb: [640, 240], vbDar: [360, 240] };

  // Boyutsuz çizim koordinatları. Eksenlere klinik değer atanmaz.
  function grafik(S, etiket) {
    const X = u => 56 + u * (S.w - 82);
    const Y = v => 195 - v * 138;
    const eksen = S.ok([[X(0), Y(0)], [X(1), Y(0)]], { renk: 'muted' })
      + S.ok([[X(0), Y(0)], [X(0), 39]], { renk: 'muted' })
      + S.t(X(0), 24, etiket, { c: 'b' }) + S.t(X(1), 226, 'Zaman', { a: 'end' });
    function egri(fn, renk = 'accent', kesik = false, son = 1) {
      const noktalar = Array.from({ length: 91 }, (_, i) => {
        const u = i * son / 90;
        return [X(u), Y(fn(u))];
      });
      return S.cizgi(noktalar, { renk, kesik, w: kesik ? 2 : 3 });
    }
    return { X, Y, eksen, egri };
  }

  VIZ.a06b_bolus = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Bolus sonrası konsantrasyon, doğal logaritma ve başlangıç teğeti',
    secenek: secim('Görünüm', ['Konsantrasyon', 'Doğal logaritma', 'Zaman sabiti']),
    ciz(S, t, { gorunum }) {
      const log = gorunum === 'Doğal logaritma';
      const { X, Y, eksen, egri } = grafik(S, log ? 'ln C' : 'Plazma konsantrasyonu');
      let svg = eksen + egri(log ? u => 1 - 0.91 * u : u => Math.exp(-3 * u))
        + S.t(X(0) - 6, Y(1) + 4, log ? 'ln C₀' : 'C₀', { a: 'end' });
      if (log) return svg + S.t(X(0.53), Y(0.64), 'Eğim −k', { c: 'b' });
      if (gorunum === 'Zaman sabiti') {
        const x = X(1 / 3), y = Y(1 / Math.E);
        svg += S.cizgi([[X(0), Y(1)], [x, Y(0)]], { renk: 'clin', kesik: true })
          + S.cizgi([[X(0), y], [x, y], [x, Y(0)]], { renk: 'muted', kesik: true })
          + S.daire(x, y, 4, { dolgu: 'accent' }) + S.t(x, 218, 'τ', orta)
          + S.t(X(0) - 5, y + 4, 'C₀/e', { a: 'end' });
      }
      return svg;
    },
    metin: ({ gorunum }) => ({
      'Konsantrasyon': 'Başlangıç noktasını izleyin: bolusla oluşan C₀’dan sonra konsantrasyon önce hızla, sonra giderek daha yavaş azalır. [[K3 s. 57–60]]',
      'Doğal logaritma': 'Zaman ekseni aynı kalır, düşey eksende ln C kullanıldığında eğri bir doğruya dönüşür. [[K3 s. 59–60]]',
      'Zaman sabiti': 'Başlangıç teğetinin zaman eksenini kestiği anda gerçek eğri hâlâ C₀/e düzeyindedir. [[K3 s. 61]]',
    })[gorunum],
  });

  VIZ.a06b_infuzyon = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Aralıklı bolus ve sabit infüzyonda plazma konsantrasyonu',
    secenek: secim('Uygulama', ['Aralıklı bolus', 'Sabit infüzyon']),
    ciz(S, t, { gorunum }) {
      const { X, Y, eksen, egri } = grafik(S, 'Plazma konsantrasyonu');
      if (gorunum === 'Sabit infüzyon') {
        return eksen + egri(u => 1 - Math.exp(-4 * u))
          + S.cizgi([[X(0), Y(1)], [X(1), Y(1)]], { renk: 'muted', kesik: true })
          + S.t(X(0) - 6, Y(1) + 4, 'Cₛₛ', { a: 'end' });
      }
      const noktalar = [[X(0), Y(0)]];
      let kalan = 0;
      for (let doz = 0; doz < 5; doz++) {
        const tepe = kalan + 0.38;
        for (let i = 0; i <= 20; i++) {
          kalan = tepe * Math.exp(-0.52 * i / 20);
          noktalar.push([X((doz + i / 20) / 5), Y(kalan)]);
        }
      }
      return eksen + S.cizgi(noktalar, { renk: 'accent', w: 3 });
    },
    metin: ({ gorunum }) => gorunum === 'Aralıklı bolus'
      ? 'Her dik yükseliş yeni bir dozu, onu izleyen iniş iki doz arasındaki uzaklaşmayı gösterir. [[K3 s. 60]]'
      : 'Sürekli girişte plazma düzeyi yükseldikçe çıkış artar ve eğri, giriş ile çıkışın eşitlendiği Cₛₛ düzeyine yaklaşır. [[K3 s. 60–61]]',
  });

  VIZ.a06b_gecis = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'İki kompartıman arasında dağılım, geri dönüş ve santral eliminasyon',
    secenek: secim('İlaç yolu', ['Dağılım', 'Geri dönüş', 'Eliminasyon']),
    ciz(S, t, { gorunum }) {
      const sol = S.w * 0.23, sag = S.w - sol;
      const yollar = [
        ['Dağılım', [[sol + 56, 70], [sag - 56, 70]], 'k₁₂', (sol + sag) / 2, 58],
        ['Geri dönüş', [[sag - 56, 103], [sol + 56, 103]], 'k₂₁', (sol + sag) / 2, 129],
        ['Eliminasyon', [[sol, 122], [sol, 181]], 'k₁₀', sol + 25, 157],
      ];
      let svg = S.kutu(sol - 56, 50, 112, 72, { yazi: ['Santral', 'V₁ · X₁'], dolgu: 'basic-soft' })
        + S.kutu(sag - 56, 50, 112, 72, { yazi: ['Perifer', 'V₂ · X₂'], dolgu: 'clin-soft' })
        + S.t(sol, 212, 'Vücut dışı', orta);
      for (const [ad, yol, sabit, x, y] of yollar) {
        const renk = gorunum === ad ? 'accent' : 'muted';
        svg += S.ok(yol, { renk, w: gorunum === ad ? 4 : 1.5 }) + S.t(x, y, sabit, { ...orta, renk });
      }
      return svg;
    },
    metin: ({ gorunum }) => ({
      'Dağılım': '−k₁₂X₁: ilaç V₁’den V₂’ye geçtiğinde santral miktar azalır, ilaç sistemde kalır. [[K3 s. 62–63]]',
      'Geri dönüş': '+k₂₁X₂: periferik depodan dönen miktar santral bilançoya artı işaretiyle girer. [[K3 s. 63]]',
      'Eliminasyon': '−k₁₀X₁: bu ok sistemin sınırını geçer ve vücuttaki toplam ilaç miktarı azalır. [[K3 s. 62–63]]',
    })[gorunum],
  });

  VIZ.a06b_faz = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'İki üstel terimin yarı logaritmik grafikteki görünümleri',
    secenek: secim('Bileşen', ['Toplam', 'Hızlı faz', 'Terminal faz']),
    ciz(S, t, { gorunum }) {
      const { X, Y, eksen, egri } = grafik(S, 'ln C');
      // Görüntü penceresinde önce konsantrasyonlar toplanır, sonra logaritma alınır.
      const norm = c => 1 + Math.log(c) / 4;
      const hizli = u => 0.8 * Math.exp(-10 * u);
      const yavas = u => 0.2 * Math.exp(-1.35 * u);
      let svg = eksen + egri(u => norm(hizli(u) + yavas(u)))
        + S.t(X(0) - 6, Y(1) + 5, 'ln C₀', { a: 'end' });
      if (gorunum === 'Hızlı faz') svg += egri(u => norm(hizli(u)), 'clin', true, (4 + Math.log(0.8)) / 10);
      if (gorunum === 'Terminal faz') svg += egri(u => norm(yavas(u)), 'clin', true);
      return svg;
    },
    metin: ({ gorunum }) => ({
      'Toplam': 'Düz çizgi beklemeyin: ölçülen değer iki konsantrasyon bileşeninin toplamıdır ve bu toplamın doğal logaritması eğri verir. [[K3 s. 62–63]]',
      'Hızlı faz': 'Kesikli doğrunun eğimi −α’dır ve düşey ekseni ln A’da keser. [[K3 s. 63–64]] Hızlı bileşenin katkısı erken dönemde belirgindir. [[K3 s. 62–63]]',
      'Terminal faz': 'Kesikli doğrunun eğimi −β’dır ve düşey ekseni ln B’de keser. [[K3 s. 63–64]] Hızlı bileşen küçüldükçe toplam eğri terminal doğruya yaklaşır. [[K3 s. 63]]',
    })[gorunum],
  });

  VIZ.a06b_hedef = el => SEKIL.sahne(el, {
    vb: [640, 280], vbDar: [360, 280], baslik: 'Propofolde üç kinetik hacim ve gecikmeli etki bölgesi',
    secenek: secim('Model görünümü', ['Dağılım', 'Plazma hedefi', 'Etki hedefi']),
    ciz(S, t, { gorunum }) {
      const merkez = S.w / 2, sol = merkez / 2, sag = S.w - sol;
      const etki = gorunum === 'Etki hedefi';
      let svg = S.kutu(merkez - 72, 62, 144, 54, { yazi: 'V₁ · Santral',
        renk: gorunum === 'Plazma hedefi' ? 'accent' : 'basic', dolgu: 'basic-soft' })
        + S.t(sol, 20, 'İnfüzyon', orta) + S.ok([[sol, 28], [merkez - 45, 60]], { renk: 'basic' })
        + S.ok([[merkez + 45, 60], [sag, 28]], { renk: 'muted' }) + S.t(sag, 20, 'Eliminasyon', orta);
      if (etki) {
        svg += S.ok([[merkez, 118], [merkez, 193]], { kesik: true, renk: 'clin' })
          + S.t(merkez + 12, 160, 'kₑ₀', { c: 'b' })
          + S.kutu(merkez - 85, 196, 170, 60, { yazi: ['Etki bölgesi', 'Hacimsiz'], kesik: true, renk: 'clin', dolgu: 'clin-soft' });
      } else {
        for (const [x, ad, yon] of [[sol, ['V₂ · Perifer', 'Hızlı dağılım'], -1], [sag, ['V₃ · Perifer', 'Yavaş dağılım'], 1]]) {
          svg += S.ok([[merkez + yon * 40, 118], [x, 192]], { cift: true, renk: 'clin' })
            + S.kutu(x - 73, 196, 146, 60, { yazi: ad, dolgu: 'clin-soft' });
        }
      }
      return svg;
    },
    metin: ({ gorunum }) => ({
      'Dağılım': 'İki periferik yolun her birinde dönüş mümkündür, fakat V₃ ile alışveriş daha yavaştır. [[K3 s. 58]] [[K3 s. 64]]',
      'Plazma hedefi': 'Plazma hedeflendiğinde izlenen konsantrasyon santral kompartımana aittir. [[K3 s. 64–65]]',
      'Etki hedefi': 'Kesikli bağlantı, etki bölgesinin santral düzeyle gecikmeli dengelenmesini gösterir. [[K3 s. 65]]',
    })[gorunum],
  });
})();
