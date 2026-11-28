(function () {
  'use strict';
  const VIZ = window.VIZ;
  const frame = { vb: [640, 260], vbDar: [360, 240] };
  const cycle = 2 * Math.PI;
  const choice = (ad, labels) => ({ id: 'mod', ad, liste: labels.map(ad => ({ ad, d: ad })) });
  const range = (id, ad, min, max, adim, deger) => ({ id, ad, min, max, adim, deger });
  const ratio = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 3 });

  VIZ.fk05b_hareket = el => SEKIL.grafik(el, {
    ...frame, baslik: 'Sarkaç uzunluğu ve salınım periyodu',
    x: { min: 0, max: 4, ad: 'Zaman / başlangıç periyodu', adimlar: [0, 1, 2, 3, 4] },
    y: { min: -1, max: 1, ad: 'Yer değiştirme / genlik', adimlar: [-1, 0, 1] },
    param: [range('L', 'Uzunluk / başlangıç uzunluğu', 1, 4, 1, 1)],
    egriler: [{ f: (x, p) => Math.sin(cycle * x / Math.sqrt(p.L)) }],
    okuma: p => 'Periyot başlangıç değerinin <b>' + ratio(Math.sqrt(p.L)) + '</b> katı, frekans ise <b>' +
      ratio(1 / Math.sqrt(p.L)) + '</b> katıdır. [[K6 s. 87]]',
  });

  VIZ.fk05b_sonum = el => SEKIL.grafik(el, {
    ...frame, baslik: 'Aynı yer değiştirmeden dengeye dönüş',
    secenek: choice('Sönüm', ['Hafif', 'Kritik', 'Ağır']),
    x: { min: 0, max: 12, adimlar: [], ad: 'Zaman →' },
    y: { min: -1, max: 1, adimlar: [0], ad: 'Yer değiştirme' },
    yatay: () => [{ y: 0, ad: 'Denge' }],
    egriler: [{ f: (x, p) => {
      // Aynı başlangıç konumu ve sıfır başlangıç hızı için nitel karşılaştırma.
      if (p.mod === 'Kritik') return (1 + x) * Math.exp(-x);
      if (p.mod === 'Ağır') return (4 * Math.exp(-x / 4) - 0.25 * Math.exp(-4 * x)) / 3.75;
      return Math.exp(-0.14 * x) * (Math.cos(x) + 0.14 * Math.sin(x));
    } }],
    okuma: p => ({
      Hafif: 'Kütle dengeyi tekrar tekrar geçer, her tepenin genliği öncekinden küçüktür. [[K6 s. 88–89]]',
      Kritik: 'Kritik sönüm, hafif sönümün zıplaması ile ağır sönümün yavaş dönüşü arasındadır ve cihaz tasarımında önemlidir. [[K6 s. 88–89]]',
      Ağır: 'Salınım bastırılmıştır, ancak sistemin dengeye dönmesi uzun sürer. [[K6 s. 88–89]]',
    })[p.mod],
  });

  VIZ.fk05b_transduser = el => SEKIL.cizim(el, {
    baslik: 'Arter kateteri ve transdüser diyaframı',
    giris: 'Salınımı başlatabilen ve sönüme katkı veren parçaları bulun. [[K6 s. 89]]',
    gorunumler: [{ ad: 'Boyuna kesit', resim: 'img/fizik/05b-transduser.webp', en: 1024, boy: 512,
      kirp: [0, 120, 1024, 300], noktalar: [
        { x: 320, y: 269, ad: 'Kateter', metin: 'Kateter içindeki sürtünme salınımı söndürür. [[K6 s. 89]]' },
        { x: 822, y: 270, ad: 'Transdüser diyaframı', metin: 'Diyafram salınmaya eğilimlidir ve bu hareket kaydedilen basınç dalgasını bozabilir. [[K6 s. 89]]' },
      ] }],
  });

  VIZ.fk05b_tel = el => SEKIL.sahne(el, {
    baslik: 'Sabit uçlu telde düğümler', vb: [640, 170], vbDar: [360, 170],
    param: [range('n', 'Harmonik sırası', 1, 4, 1, 1)],
    ciz: (S, t, { n }) => {
      const x = u => 22 + u * (S.w - 44);
      let svg = S.cizgi([[x(0), 85], [x(1), 85]], { renk: 'muted', kesik: true });
      for (const direction of [1, -1]) {
        const pts = Array.from({ length: 161 }, (_, i) =>
          [x(i / 160), 85 + direction * 49 * Math.sin(n * Math.PI * i / 160)]);
        svg += S.cizgi(pts, { renk: direction === 1 ? 'accent' : 'basic', kesik: direction < 0 });
      }
      for (let i = 0; i <= n; i++) svg += S.daire(x(i / n), 85, 5, { dolgu: 'ink', renk: 'ink' });
      return svg;
    },
    metin: ({ n }) => 'Frekans <b>' + (n === 1 ? 'f' : n + 'f') + '</b>, uçlar dahil düğüm sayısı <b>' +
      (n + 1) + '</b>. [[K6 s. 89–90]]',
  });

  VIZ.fk05b_fourier = el => SEKIL.grafik(el, {
    ...frame, baslik: 'Bileşenlerden dalga biçimine',
    x: { min: 0, max: 1, ad: 'Bir kalp döngüsü', adimlar: [0, 1] },
    y: { min: -2, max: 2, ad: 'Bağıl genlik', adimlar: [0] },
    param: [range('a', 'İkinci bileşenin bağıl genliği', 0, 1, 0.1, 0.5)],
    egriler: [
      { f: x => Math.sin(cycle * x), renk: 'basic', kesik: true, w: 2 },
      { f: (x, p) => p.a * Math.sin(2 * cycle * x), renk: 'clin', kesik: true, w: 2 },
      { f: (x, p) => Math.sin(cycle * x) + p.a * Math.sin(2 * cycle * x) },
    ],
    okuma: p => p.a === 0 ? 'İkinci bileşen sıfırken toplam, temel sinüs dalgasıyla çakışır. [[K6 s. 90–91]]' :
      'Kesikli çizgiler temel frekans ile ikinci harmoniği, düz çizgi her andaki toplamlarını gösterir. [[K6 s. 90–91]]',
  });

  VIZ.fk05b_spektrum = el => SEKIL.sahne(el, {
    baslik: 'Arter basıncının frekans spektrumu', ...frame,
    secenek: choice('Gösterilen bileşenler', ['Kalp', 'Kalp ve solunum']),
    ciz: (S, t, p) => {
      const x = hz => 43 + hz / 4 * (S.w - 68);
      let svg = S.ok([[x(0), 174], [S.w - 10, 174]], { renk: 'muted' }) +
        S.t(16, 98, 'Genlik', { r: -90, a: 'middle' }) + S.t(S.w / 2, 227, 'Frekans (Hz)', { a: 'middle' });
      const peaks = [[1.25, 128], [2.5, 72], [3.75, 36]];
      if (p.mod === 'Kalp ve solunum') peaks.unshift([0.15, 23]);
      for (const [hz, h] of peaks) svg += S.cizgi([[x(hz), 174], [x(hz), 174 - h]], { renk: hz < 1 ? 'clin' : 'accent', w: 5 }) +
        S.t(x(hz), 199, ratio(hz), { a: 'middle' });
      return svg;
    },
    metin: p => p.mod === 'Kalp' ? 'En yüksek tepe kalp frekansındadır, harmonik tepeler giderek küçülür. [[K6 s. 91]]' :
      'Ventilasyonun arter basıncına etkisi 0,15 Hz’de ayrı bir bileşen olarak görünür. [[K6 s. 91]]',
  });

  VIZ.fk05b_doppler = el => SEKIL.sahne(el, {
    baslik: 'Hareket eden kaynağın dalga cepheleri', vb: [640, 226], vbDar: [360, 226],
    secenek: choice('Kaynağın hareketi', ['Durağan', 'Sağa doğru', 'Sola doğru']),
    ciz: (S, t, p) => {
      const dir = p.mod === 'Durağan' ? 0 : p.mod === 'Sağa doğru' ? 1 : -1;
      const cx = S.w / 2, cy = 110;
      let svg = '';
      for (let i = 1; i <= 4; i++) svg += S.daire(cx - dir * i * 10, cy, 23 * i, { dolgu: 'none', renk: 'basic' });
      svg += S.daire(cx, cy, 7, { dolgu: 'accent', renk: 'accent' });
      if (dir) svg += S.ok([[cx, cy], [cx + dir * 32, cy]], { renk: 'accent' });
      return svg + S.t(cx, 223, 'Kaynak ve ardışık dalga cepheleri', { a: 'middle' });
    },
    metin: p => p.mod === 'Durağan' ? 'Kaynak dururken ardışık cephelerin merkezleri çakışır. [[K6 s. 92]]' :
      'Hareket yönünde cepheler sıklaşır, geride seyrekleşir ve durağan gözlemcinin duyduğu frekans buna göre değişir. [[K6 s. 92]]',
  });

  VIZ.fk05b_isik = el => SEKIL.grafik(el, {
    ...frame, baslik: 'Uzaklığa göre yüzeye düşen güç',
    x: { min: 1, max: 4, ad: 'Bağıl uzaklık (r/r₀)', adimlar: [1, 2, 3, 4] },
    y: { min: 0, max: 1, ad: 'Bağıl ışınım şiddeti', adimlar: [0, 1] },
    param: [range('r', 'Uzaklık / başlangıç uzaklığı', 1, 4, 1, 2)],
    egriler: [{ f: r => 1 / (r * r) }],
    noktalar: p => [{ x: p.r, y: 1 / (p.r * p.r) }],
    okuma: p => 'Uzaklık <b>' + p.r + 'r₀</b> iken aynı güç <b>' + p.r ** 2 +
      '</b> kat alana yayılır ve birim alana düşen güç başlangıcın <b>1/' + p.r ** 2 + '</b>’i olur. [[K6 s. 93]]',
  });
})();
