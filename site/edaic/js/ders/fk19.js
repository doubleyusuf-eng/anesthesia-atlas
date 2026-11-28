(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const kucuk = { a: 'middle', c: 'k' };
  const fmt = (v) => (Math.round(+v * 10) / 10).toString().replace('.', ',');
  const sec = (id, ad, list) => ({ id, ad, liste: list.map(([d, l]) => ({ d, ad: l })) });

  VIZ.fk19_pusula = (el) => SEKIL.sahne(el, {
    baslik: 'Tel kesiti ve pusula iğnesi', vb: [640, 210], vbDar: [360, 210],
    secenek: sec('devre', 'Anahtar', [['acik', 'Açık'], ['kapali', 'Kapalı']]),
    ciz(S, t, { devre }) {
      const x = S.w / 2 - 55, y = 95, aktif = devre === 'kapali';
      const px = x + 82, py = y + 42;
      let alan = '';
      if (aktif) {
        for (const r of [38, 60, 92]) alan += S.daire(x, y, r, { renk: 'accent', dolgu: 'none' });
      }
      const dx = aktif ? 10 : 0, dy = aktif ? -20 : -23;
      return alan + S.daire(x, y, 15, { renk: 'ink', dolgu: 'basic-soft' })
        + S.daire(px, py, 30, { renk: 'basic' })
        + S.ok([[px - dx, py - dy], [px + dx, py + dy]], { renk: 'clin', w: 4 })
        + S.t(x, y + 5, aktif ? '•' : '○', orta)
        + S.t(x, 201, 'Tel kesiti', orta) + S.t(px + 18, 181, 'Pusula', orta);
    },
    metin: ({ devre }) => devre === 'acik'
      ? 'Devre açıkken pusulanın kuzey ucu manyetik kuzeye yönelir. [[K6 s. 316]]'
      : 'Akım geçerken telin çevresinde dairesel alan çizgileri oluşur ve pusula iğnesi eski doğrultusundan sapar. [[K6 s. 316]]',
  });

  const malzemeler = {
    ferro: ['Demir', 'Güçlü çekim', -56, 'Demir, nikel ve kobalt alan kaldırıldığında mıknatıslanmanın bir bölümünü koruyabilir. [[K6 s. 317–318]]'],
    para: ['Oksijen', 'Zayıf çekim', -19, 'Oksijenin eşleşmemiş elektronları dış alan yönünde hizalanır. [[K6 s. 318]]'],
    diya: ['Bakır', 'Zayıf itme', 19, 'Bakırda eşleşmiş elektronlar kalıcı bir net manyetik moment oluşmasını önler. [[K6 s. 318]]'],
  };
  VIZ.fk19_alan = (el) => SEKIL.sahne(el, {
    baslik: 'Maddenin mıknatısa tepkisi', vb: [640, 165], vbDar: [360, 165],
    secenek: sec('sinif', 'Malzeme', [['ferro', 'Ferromanyetik'], ['para', 'Paramanyetik'], ['diya', 'Diyamanyetik']]),
    ciz(S, t, { sinif }) {
      const x = S.w / 2, [ad, etki, uzaklik] = malzemeler[sinif];
      return S.kutu(x - 145, 45, 90, 48, { yazi: 'Mıknatıs', renk: 'basic', dolgu: 'basic-soft' })
        + S.kutu(x + 6, 45, 112, 48, { yazi: ad, renk: 'clin', dolgu: 'clin-soft' })
        + S.ok([[x + 61, 109], [x + 61 + uzaklik, 109]], { renk: 'accent', w: 3 })
        + S.t(x + 61, 144, etki, orta);
    },
    metin: ({ sinif }) => malzemeler[sinif][3],
  });

  // 2) Elektromanyetik indüksiyon: dinamo ve elektrik motoru
  VIZ.fk19_dinamo = (el) => SEKIL.sahne(el, {
    baslik: 'Dinamo ve elektrik motorunun simetrisi',
    vb: [640, 260], vbDar: [360, 270], hareket: true,
    secenek: sec('kip', 'Çalışma kipi', [
      ['dinamo', 'Dinamo (Mekanik → Elektrik)'],
      ['motor', 'Motor (Elektrik → Mekanik)'],
    ]),

    ciz(S, t, { kip }) {
      const cx = S.w / 2, cy = 114, nX = S.dar ? 48 : 88, sX = S.w - nX;
      const aci = t * Math.PI;
      const dx = Math.cos(aci) * 34, dy = Math.sin(aci) * 20;
      let s = S.kutu(nX - 24, cy - 38, 48, 76, { renk: 'clin', dolgu: 'clin-soft', yazi: 'N' })
        + S.kutu(sX - 24, cy - 38, 48, 76, { renk: 'basic', dolgu: 'basic-soft', yazi: 'S' })
        + S.cizgi([[nX + 28, cy], [sX - 28, cy]], { renk: 'line', kesik: true, w: 1.5 });
      s += S.cizgi([[cx - dx, cy - 26 + dy], [cx + dx, cy - 26 - dy], [cx + dx, cy + 26 - dy], [cx - dx, cy + 26 + dy], [cx - dx, cy - 26 + dy]], { renk: 'accent', w: 3 });
      s += S.daire(cx, cy, 5, { dolgu: 'ink', renk: 'ink' });
      const u1 = kip === 'dinamo' ? 'Mil döndürülür (mekanik)' : 'Bobine akım verilir';
      const u2 = kip === 'dinamo' ? 'Bir tam tur → bir AC çevrimi' : 'Bobin ve mil döner';
      return s + S.t(cx, 198, u1, { ...kucuk, renk: 'basic' }) + S.t(cx, 224, u2, { ...orta, renk: 'accent' });
    },
    metin: ({ kip }) => kip === 'dinamo'
      ? `Dinamoda bobin sabit mıknatıs alan çizgilerini keserek döner ve üretilen alternatif akımın frekansı saniyedeki tam devir sayısına eşittir. [[K6 s. 319]]`
      : 'Elektrik motoru aynı yapının tersidir: bobinden geçen akım elektromanyetik kuvvetle mili döndürür; dönüş hızı akımla ayarlanır. [[K6 s. 318–319]]',
  });

  const sebeke = sec('ulke', 'Şebeke', [['bk', 'Birleşik Krallık'], ['ka', 'Kuzey Amerika']]);
  const etkin = p => p.ulke === 'bk' ? 240 : 120;
  const frekans = p => p.ulke === 'bk' ? 50 : 60;
  const gerilim = (ms, p) => etkin(p) * Math.SQRT2 * Math.sin(2 * Math.PI * frekans(p) * ms / 1000);
  VIZ.fk19_ac = (el) => SEKIL.grafik(el, {
    baslik: 'Şebekede bir anın gerilimi', vb: [640, 310], vbDar: [360, 310],
    x: { min: 0, max: 40, ad: 'Zaman (ms)', adimlar: [0, 10, 20, 30, 40] },
    y: { min: -340, max: 340, ad: 'V', adimlar: [-240, 0, 240] },
    secenek: sebeke,
    param: [{ id: 'ms', ad: 'Zaman', min: 0, max: 40, adim: 0.5, deger: 5, birim: 'ms' }],
    egriler: [{ f: gerilim, renk: 'accent' }],
    noktalar: p => [{ x: p.ms, y: gerilim(p.ms, p) }],
    yatay: p => [{ y: etkin(p), renk: 'ok', ad: 'Etkin gerilim' }],
    okuma: p => `${frekans(p)} Hz ve ${etkin(p)} V RMS için tepe ${fmt(etkin(p) * Math.SQRT2)} V, işaretli andaki gerilim ${fmt(gerilim(p.ms, p))} V’tur. [[K6 s. 320–321]] [[K6 s. 325]]`,
  });

  const rmsAdim = [
    ['Gerilim', 'Gerilim (V)', 'Bir tam çevrimde artı ve eksi yarıların ortalaması sıfırdır. [[K6 s. 321]]'],
    ['Kare', 'Gerilimin karesi (V²)', 'Her anın gerilimini kendisiyle çarpınca her iki yarı da zaman ekseninin üstünde kalır veya sıfıra değer. [[K6 s. 321]]'],
    ['Ortalama', 'Karelerin ortalaması (V²)', 'Bir çevrimde karelerin ortalaması 240² = 57 600 V² olur. [[K6 s. 321]]'],
    ['Karekök', 'Etkin gerilim (V)', '57 600 V² değerinin karekökü 240 V’tur. [[K6 s. 321]]'],
  ];
  VIZ.fk19_rms = (el) => SEKIL.adim(el, {
    baslik: '240 V şebeke için RMS hesabı', vb: [640, 200], vbDar: [360, 200], oto: false,
    adimlar: rmsAdim.map(([ad, eksen, metin], i) => ({
      ad, metin, ciz(S) {
        const x = 72, sag = S.w - 22, sifir = i === 0 ? 106 : 156;
        const yukseklik = i === 0 ? 58 : 108;
        const tepe = 240 * Math.SQRT2;
        const olcek = i === 1 || i === 2 ? tepe ** 2 : tepe;
        const noktalar = Array.from({ length: 101 }, (_, k) => {
          const v = tepe * Math.sin(k * Math.PI / 50);
          const deger = [v, v ** 2, 240 ** 2, 240][i];
          return [x + (sag - x) * k / 100, sifir - yukseklik * deger / olcek];
        });
        return S.t(x, 23, eksen, { c: 'b' })
          + S.cizgi([[x, 37], [x, 164]], { renk: 'muted' })
          + S.cizgi([[x, sifir], [sag, sifir]], { renk: 'muted' })
          + S.t(x - 6, sifir + 5, '0', { a: 'end', c: 'k' })
          + S.t(x - 6, sifir - yukseklik + 5, fmt(olcek), { a: 'end', c: 'k' })
          + S.cizgi(noktalar, { renk: 'accent', w: 3 })
          + S.t((x + sag) / 2, 190, 'Zaman · bir çevrim (20 ms)', kucuk);
      },
    })),
  });

  VIZ.fk19_trafo = (el) => SEKIL.sahne(el, {
    baslik: 'Sarım oranıyla gerilim ve akım dönüşümü', vb: [640, 225], vbDar: [360, 225],
    param: [{ id: 'oran', ad: 'Sekonder / primer sarım oranı', min: 0.5, max: 2, adim: 0.5, deger: 0.5 }],
    ciz(S, t, { oran }) {
      const x = S.w / 2;
      let s = S.kutu(x - 80, 20, 160, 96, { renk: 'muted' })
        + S.kutu(x - 57, 39, 114, 58, { renk: 'muted', yazi: ['Demir', 'çekirdek'] });
      for (const [sol, adet, renk] of [[x - 83, 4, 'basic'], [x + 55, 4 * oran, 'accent']]) {
        for (let i = 0; i < adet; i++) {
          const y = 30 + (i + 0.5) * 76 / adet;
          s += S.cizgi([[sol, y + 4], [sol + 28, y - 4]], { renk, w: 3 });
        }
      }
      return s + S.t(x - 80, 144, ['Primer', '240 V'], orta)
        + S.t(x + 80, 144, ['Sekonder', fmt(240 * oran) + ' V'], orta)
        + S.t(x, 203, oran === 1 ? 'Gerilim aynı' : oran < 1 ? 'Gerilim düşer · akım artar' : 'Gerilim artar · akım düşer', orta);
    },
    metin: ({ oran }) => `Sarım oranı ${fmt(oran)} iken çıkış gerilimi 240 × ${fmt(oran)} = ${fmt(240 * oran)} V olur. [[K6 s. 323]] Kayıpsız modelde çıkış akımının giriş akımına oranı 1 / ${fmt(oran)} ≈ ${(1 / oran).toLocaleString('tr-TR', {maximumFractionDigits: 2})} olur. [[K6 s. 323]]`,
  });

  // 5) Yüksek gerilimli güç iletimi (4 adım)
  VIZ.fk19_iletim = (el) => SEKIL.adim(el, {
    baslik: 'Santralden hastaneye güç iletimi',
    vb: [640, 220], vbDar: [360, 260], oto: false,
    adimlar: [
      { ad: 'Santral', metin: 'Elektrik santralinde dinamo birkaç yüz voltta nispeten yüksek akımlı AC üretir. [[K6 s. 324]]',
        ciz: S => ilet(S, 0) },
      { ad: 'Yükseltme', metin: 'Yükseltici transformatör gerilimi ≈ 400 000 V düzeyine çıkarır; aynı güç için akım düşer. [[K6 s. 324]]',
        ciz: S => ilet(S, 1) },
      { ad: '400 kV Hat', metin: 'Düşük akım sayesinde ince, ucuz kablolar kullanılır ve I²R ısı kaybı azalır. [[K6 s. 324]]',
        ciz: S => ilet(S, 2) },
      { ad: 'Hastane', metin: 'Trafo merkezinde alçaltıcı transformatörle ev/hastane için 240 V (bazı güçlü cihazlarda 415 V) elde edilir. [[K6 s. 324]]',
        ciz: S => ilet(S, 3) },
    ],
  });
  function ilet(S, aktif) {
    const adlar = [['Santral', '~ birkaç yüz V'], ['Yükseltici', 'Trafo'], ['İletim hattı', '~400 kV (I↓)'], ['Trafo merkezi', 'Alçaltma']];
    if (S.dar) {
      const mx = S.w / 2;
      return adlar.map(([a, b], i) => {
        const y = 14 + i * 62;
        return (i ? S.ok([[mx, y - 16], [mx, y - 2]], { renk: 'muted' }) : '')
          + S.kutu(40, y, S.w - 80, 44, { renk: i === aktif ? 'accent' : 'line', dolgu: i === aktif ? 'accent-soft' : 'paper', yazi: `${a} · ${b}` });
      }).join('');
    }
    return adlar.map(([a, b], i) => {
      const x = 18 + i * 156;
      return (i ? S.ok([[x - 22, 110], [x - 2, 110]], { renk: 'muted' }) : '')
        + S.kutu(x, 72, 132, 76, { renk: i === aktif ? 'accent' : 'line', dolgu: i === aktif ? 'accent-soft' : 'paper', yazi: [a, b] });
    }).join('');
  }

  VIZ.fk19_kayip = (el) => SEKIL.grafik(el, {
    baslik: 'Aynı kabloda akım ve ısı kaybı', vb: [640, 260], vbDar: [360, 260],
    x: { min: 0, max: 1, ad: 'Akım / başlangıç akımı', adimlar: [0, 0.5, 1] },
    y: { min: 0, max: 1, ad: 'Kayıp oranı', adimlar: [0, 0.5, 1] },
    param: [{ id: 'akim', ad: 'Başlangıca göre akım', min: 0, max: 1, adim: 0.05, deger: 0.5 }],
    egriler: [{ f: x => x * x, renk: 'accent' }],
    noktalar: p => [{ x: p.akim, y: p.akim ** 2 }],
    okuma: p => `Kablo direnci sabitken akım başlangıcın %${(100 * p.akim).toLocaleString('tr-TR')}’i düzeyindedir. [[K6 s. 324]] Kablodaki ısı kaybı başlangıç kaybının %${(100 * p.akim ** 2).toLocaleString('tr-TR')}’i olur. [[K6 s. 324]]`,
  });

  // 6) BS 1363 fiş bağlantıları (SEKIL.cizim)
  VIZ.fk19_fis = (el) => SEKIL.cizim(el, {
    baslik: 'Üç pimli BS 1363 şebeke fişinin iç yapısı',
    giris: 'Pimlere, renkli tellere ve sigortaya dokunun. [[K6 s. 325–327]]',
    gorunumler: [{
      ad: 'İç görünüm', resim: 'img/fizik/19-fis.webp', en: 1024, boy: 1024,
      noktalar: [
        { x: 503, y: 170, ad: 'Toprak pimi', metin: 'Toprak pimi yerel toprak bağlantısına gider, bu bağlantı genellikle binanın dışına gömülü bir metal kazıktır. [[K6 s. 326]]' },
        { x: 264, y: 241, ad: 'Toprak teli (sarı-yeşil)', metin: 'Güvenlik amacıyla hatalı veya kaçak akımları toprağa iletir. [[K6 s. 326–327]]' },
        { x: 332, y: 575, ad: 'Nötr pimi', metin: 'Sol alt pim cihazdan dönen akımın trafo merkezine gidiş ucudur. [[K6 s. 326–327]]' },
        { x: 470, y: 596, ad: 'Nötr teli (mavi)', metin: 'Pasif dönüş yoludur; yüksüzken 0 V’ta kalır ve trafo merkezindeki toprak bağlantısı gibidir. [[K6 s. 326–327]]' },
        { x: 744, y: 488, ad: 'Kartuş sigorta', metin: 'Sigorta, BS 1363 fişinin gövdesi içindedir. [[K6 s. 325]]' },
        { x: 636, y: 689, ad: 'Canlı/faz teli (kahverengi)', metin: 'Santralden gelen etkin bağlantı olup dokunulduğunda elektrik çarpmasına yol açan en tehlikeli teldir. [[K6 s. 326–327]]' },
        { x: 648, y: 575, ad: 'Canlı/faz pimi', metin: 'Bu pim, cihazı prizin aktif faz bağlantısına bağlar. [[K6 s. 325–327]]' },
      ],
    }],
  });
})();
