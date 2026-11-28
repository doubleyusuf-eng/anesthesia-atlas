(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const kucuk = { a: 'middle', c: 'k' };
  const sec = (id, ad, list) => ({ id, ad, liste: list.map(([d, l]) => ({ d, ad: l })) });

  VIZ.fk21a_plaka = (el) => SEKIL.sahne(el, {
    baslik: 'Kapasitör simgesi ve dış devre', vb: [420, 210], vbDar: [360, 210],
    secenek: sec('evre', 'Bağlantı', [['sarj', 'Şarj'], ['ayri', 'Açık devre'], ['bos', 'Deşarj']]),
    ciz(S, t, { evre }) {
      const m = S.w / 2, l = m - 22, r = m + 22;
      const kol = evre === 'ayri' ? 56 : 40;
      let g = S.cizgi([[l, 55], [l, 115]]) + S.cizgi([[r, 55], [r, 115]])
        + S.cizgi([[l, 86], [40, 86], [40, 162], [m - kol, 162]])
        + S.cizgi([[r, 86], [S.w - 40, 86], [S.w - 40, 162], [m + kol, 162]])
        + S.t(l, 48, '−', orta) + S.t(r, 48, '+', orta)
        + S.t(m, 21, 'Plakalar ve dielektrik', orta);
      if (evre === 'ayri') return g + S.t(m, 187, 'Bağlantı açık', orta);
      const bos = evre === 'bos';
      const yon = (x, y) => S.ok(bos ? [[x, 86], [y, 86]] : [[y, 86], [x, 86]], { renk: 'accent' });
      return g + S.kutu(m - 40, 143, 80, 38, { yazi: bos ? 'Yük' : 'DC', renk: 'accent' })
        + yon(l - 8, 57) + yon(S.w - 57, r + 8) + S.t(m, 202, 'Oklar elektronların yönünü gösterir', kucuk);
    },
    metin: ({ evre }) => ({
      sarj: 'Kaynak bir plakaya elektron sağlarken öteki plaka elektron kaybeder. [[K6 s. 345]]',
      ayri: 'Plakalar arasında elektrik alan vardır ve yalıtkan, elektronların doğrudan karşıya geçmesini engeller. [[K6 s. 347]]',
      bos: 'Dış yol kapanınca elektronlar negatif plakadan yük üzerinden pozitif plakaya ulaşır. [[K6 s. 346]]',
    })[evre],
  });

  VIZ.fk21a_gerilim = (el) => SEKIL.sahne(el, {
    baslik: 'Şarj ve deşarj boyunca plaka gerilimi', vb: [480, 205], vbDar: [360, 205],
    secenek: sec('evre', 'Vurgulanan evre', [['sarj', 'Kaynağa bağlı'], ['bos', 'Yüke bağlı']]),
    ciz(S, t, { evre }) {
      const x = 36, m = S.w / 2, son = S.w - 22, taban = 151;
      const yay = (bas, bit, dolum) => Array.from({ length: 81 }, (_, i) => {
        const u = i / 80;
        const duzey = (1 - Math.exp(-4 * u)) / (1 - Math.exp(-4));
        return [bas + (bit - bas) * u, taban - 95 * (dolum ? duzey : 1 - duzey)];
      });
      return S.ok([[x, taban], [x, 23]]) + S.ok([[x, taban], [son, taban]])
        + S.t(x + 7, 26, 'Plaka gerilimi', { c: 'k' }) + S.t(son, 184, 'Zaman', { a: 'end', c: 'k' })
        + S.cizgi([[m, 44], [m, taban]], { kesik: true, renk: 'muted', w: 1 })
        + S.cizgi(yay(x, m, true), { renk: evre === 'sarj' ? 'accent' : 'muted', w: evre === 'sarj' ? 4 : 2 })
        + S.cizgi(yay(m, son, false), { renk: evre === 'bos' ? 'accent' : 'muted', w: evre === 'bos' ? 4 : 2 })
        + S.t((x + m) / 2, 143, 'Şarj', kucuk) + S.t((m + son) / 2, 75, 'Deşarj', kucuk);
    },
    metin: ({ evre }) => evre === 'sarj' ? 'Plakalar arasındaki gerilim, kaynağın gerilimine doğru yükselir. [[K6 s. 345–346]]' : 'Dış devreye bağlandıktan sonra kapasitörün yükü ve gerilimi azalır. [[K6 s. 346–347]]',
  });

  // 5000 V ve 360 J için türetilen örnek kapasitans (F).
  const kapasite = 2 * 360 / 5000 ** 2;
  const enerji = v => kapasite * v ** 2 / 2;
  const sayi = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 4 });
  VIZ.fk21a_kapasitor = (el) => SEKIL.grafik(el, {
    baslik: 'Sabit kapasitans için enerji ve gerilim', vb: [640, 320], vbDar: [360, 300],
    x: { min: 3000, max: 5000, ad: 'Gerilim (V)', adimlar: [3000, 5000] },
    y: { min: 0, max: 360, ad: 'Enerji (J)', adimlar: [0, 360] },
    param: [{ id: 'v', ad: 'Gerilim', min: 3000, max: 5000, adim: 1, deger: 3000, birim: 'V' }],
    egriler: [{ f: enerji, renk: 'accent' }],
    noktalar: ({ v }) => [{ x: v, y: enerji(v) }],
    okuma: ({ v }) => `Seçilen ${sayi(v)} V gerilimde yük <b>${sayi(kapasite * v * 1000)} mC</b>, enerji <b>${sayi(enerji(v))} J</b> olur. [[K6 s. 346–348]]`,
  });

  VIZ.fk21a_icd = (el) => SEKIL.sahne(el, {
    baslik: 'ICD müdahale yolları', vb: [420, 248], vbDar: [360, 248],
    secenek: sec('yol', 'Program ve yanıt', [['sok', 'Doğrudan şok'], ['atp', 'ATP başarılı'], ['sonra', 'ATP başarısız']]),
    ciz(S, t, { yol }) {
      const m = S.w / 2;
      const basamak = ['Ritim sürekli izlenir', 'Ventriküler aritmi algılanır'];
      if (yol !== 'sok') basamak.push('Antitaşikardi uyarımı');
      basamak.push(yol === 'atp' ? 'Aritmi sonlanır' : 'Şok verilir');
      return basamak.map((ad, i) => {
        const y = 9 + i * 62;
        return (i ? S.ok([[m, y - 20], [m, y - 2]]) : '')
          + S.kutu(m - 128, y, 256, 40, { yazi: ad, dolgu: i === basamak.length - 1 ? 'accent-soft' : 'paper' });
      }).join('');
    },
    metin: ({ yol }) => ({
      sok: 'Program, algılanan ventriküler aritmiye hemen şokla yanıt verebilir. [[K6 s. 349]]',
      atp: 'Hızlı uyarım aritmiyi sonlandırabilirse şoka gerek kalmaz. [[K6 s. 349]]',
      sonra: 'Uyarım aritmiyi sonlandıramazsa cihaz şok verir. [[K6 s. 349]]',
    })[yol],
  });

  // 2) Eksternal defibrilatör devresi (4 adım)
  VIZ.fk21a_devre = (el) => SEKIL.adim(el, {
    baslik: 'Eksternal defibrilatör devresinde enerji akışı',
    vb: [480, 254], vbDar: [360, 254], oto: false,
    adimlar: [
      { ad: 'Trafo ve doğrultucu', metin: 'Yükseltici transformatör 240 V AC şebekeyi 3000–5000 V’a çıkarır; doğrultucu kapasitörü şarj etmek için DC’ye çevirir. [[K6 s. 348]]',
        ciz: S => defKutu(S, 0) },
      { ad: 'Kapasitör şarjı', metin: 'Büyük kapasitör tipik olarak 360 J enerjiyi elektrik yükü biçiminde depolar. [[K6 s. 348]]',
        ciz: S => defKutu(S, 1) },
      { ad: 'İndüktörlü deşarj', metin: 'Anahtar kapanınca indüktör deşarjı ≈ 3 milisaniyeye yavaşlatarak göğüsten ≈ 30 A akım geçmesini sağlar. [[K6 s. 348]]',
        ciz: S => defKutu(S, 2) },
      { ad: 'Kalp depolarizasyonu', metin: 'Akımın amacı kritik bir miyokard kitlesini depolarize ederek sinüs düğümünün kontrolü geri almasına olanak vermektir. [[K6 s. 347]]',
        ciz: S => defKutu(S, 3) },
    ],
  });
  function defKutu(S, aktif) {
    const m = S.w / 2, l = 64, r = S.w - 64;
    const sarj = aktif < 2;
    const tel = (pts, renk = 'ink') => S.cizgi(pts, { renk });
    let g = tel([[l, 96], [l, 57], [m - 35, 57]])
      + tel([[m + 35, 57], [r, 57], [r, 89]])
      + tel([[m, 114], [m, 69], [m + (sarj ? -35 : 35), 57]], 'accent')
      + S.daire(m - 35, 57, 3) + S.daire(m + 35, 57, 3)
      + tel([[m - 21, 114], [m + 21, 114]]) + tel([[m - 21, 124], [m + 21, 124]])
      + tel([[m, 124], [m, 212]]) + tel([[l, 154], [l, 212], [r, 212], [r, 182]])
      + S.t(m, 25, sarj ? 'Anahtar şarj konumunda' : 'Anahtar deşarj konumunda', orta)
      + S.t(m, 238, 'Kapasitör', orta)
      + S.kutu(l - 48, 96, 96, 58, { yazi: ['Trafo ve', 'doğrultucu'], dolgu: aktif === 0 ? 'accent-soft' : 'paper' })
      + S.kutu(r - 48, 89, 96, 36, { yazi: 'İndüktör', dolgu: aktif === 2 ? 'accent-soft' : 'paper' })
      + tel([[r, 125], [r, 146]])
      + S.kutu(r - 51, 146, 102, 36, { yazi: 'Pedler / hasta', dolgu: aktif === 3 ? 'accent-soft' : 'paper' });
    if (aktif === 1) g += S.t(m + 6, 101, '360 J', { a: 'start', c: 'b', renk: 'accent' });
    return g;
  }

  // 3) Defibrilatör ve ped yerleşimi (SEKIL.cizim)
  VIZ.fk21a_defib = (el) => SEKIL.cizim(el, {
    baslik: 'Eksternal defibrilatör ve yapışkanlı ped yerleşimi',
    giris: 'Ünite, kablo ve iki temas elektrodunu inceleyin. [[K6 s. 347–349]]',
    gorunumler: [{
      ad: 'Önden yerleşim', resim: 'img/fizik/21a-defib.webp', en: 1024, boy: 687,
      noktalar: [
        { x: 170, y: 407, ad: 'Defibrilatör ünitesi', metin: 'Ünite, kontrollü şok için gereken enerjiyi büyük bir kapasitörde depolar. [[K6 s. 348]]' },
        { x: 540, y: 486, ad: 'Ped kablosu', metin: 'Eksternal ünite göğse uygulanan elektrotlar üzerinden deşarj olur. [[K6 s. 348]]' },
        { x: 661, y: 251, ad: 'Üstteki yapışkanlı ped', metin: 'Kendinden yapışkanlı elektrotlar konumlandırma doğruluğunu ve deriyle teması iyileştirir. [[K6 s. 348]]' },
        { x: 831, y: 432, ad: 'Yandaki yapışkanlı ped', metin: 'Elektrodun yanlış yerleştirilmesi deride yanık oluşturabilir. [[K6 s. 349]]' },
      ],
    }],
  });

  // 4) Monofazik vs Bifazik dalga biçimi
  VIZ.fk21a_dalga = (el) => SEKIL.sahne(el, {
    baslik: 'Monofazik ve bifazik defibrilasyon dalga biçimi',
    vb: [640, 260], vbDar: [360, 270],
    secenek: sec('kip', 'Dalga biçimi', [
      ['mono', 'Monofazik (tek yön)'],
      ['bi', 'Bifazik (iki yön)'],
      ['kars', 'Karşılaştırma'],
    ]),
    ciz(S, t, { kip }) {
      const x0 = 54, w = S.w - 86, ym = 148;
      const monoPts = [[x0, ym], [x0 + w * 0.08, ym - 104], [x0 + w * 0.28, ym - 66], [x0 + w * 0.62, ym - 6], [x0 + w * 0.92, ym]];
      const biPts = [[x0, ym], [x0 + w * 0.08, ym - 68], [x0 + w * 0.34, ym - 46], [x0 + w * 0.38, ym + 46], [x0 + w * 0.68, ym + 22], [x0 + w * 0.72, ym], [x0 + w * 0.92, ym]];
      let s = S.ok([[x0, 212], [x0, 26]]) + S.ok([[x0, ym], [S.w - 20, ym]])
        + S.t(x0 + 8, 32, 'Akım (I)', { c: 'k m' })
        + S.t(S.w - 24, ym - 10, 'Zaman', { a: 'end', c: 'k m' });
      if (kip === 'mono' || kip === 'kars') {
        s += S.cizgi(monoPts, { renk: 'clin', w: 3, kesik: kip === 'kars' })
          + S.t(x0 + w * 0.26, ym - 112, 'Monofazik', { c: 'k', renk: 'clin' });
      }
      if (kip === 'bi' || kip === 'kars') {
        s += S.cizgi(biPts, { renk: 'accent', w: 3 })
          + S.t(x0 + w * 0.56, ym + 68, 'Bifazik', { a: 'middle', c: 'k', renk: 'accent' });
      }
      return s;
    },
    metin: ({ kip }) => ({
      mono: 'Monofazik defibrilatör kapasitörün tek yönde basit deşarjıyla çalışır ve daha yüksek tepe akımı gerektirir. [[K6 s. 349–350]]',
      bi: 'Bifazik defibrilatör akımı iki yönde (iki vektörde) gönderir; daha düşük tepe akımı ve enerjiyle aynı etkiyi sağlar. [[K6 s. 349–350]]',
      kars: 'Başta pil ömrü ve düşük miyokard hasarı için ICD’lerde geliştirilen bifazik dalga bugün eksternal cihazlarda da yaygındır. [[K6 s. 349–350]]',
    })[kip],
  });
})();
