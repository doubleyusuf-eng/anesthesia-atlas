(function () {
  'use strict';
  const VIZ = window.VIZ;
  const fmt = (v, digits = 1) => v.toLocaleString('tr-TR', { maximumFractionDigits: digits });
  const center = { a: 'middle', c: 'b' };
  const options = (id, ad, pairs) => ({ id, ad, liste: pairs.map(([d, label]) => ({ d, ad: label })) });
  const dots = [[-55, -16], [-26, 16], [-2, -25], [27, 10], [54, -12], [2, 32]];

  VIZ.fk09a_ideal = (el) => SEKIL.sahne(el, {
    baslik: 'Tek molekül ve gazın bütünü', vb: [560, 165], vbDar: [340, 165],
    secenek: options('olcek', 'Ölçek', [['tek', 'Tek molekül'], ['gaz', 'Gazın bütünü']]),
    ciz: (S, t, p) => {
      const x = S.w / 2, tek = p.olcek === 'tek';
      let s = S.kutu(x - 100, 12, 200, 100);
      dots.forEach(([dx, dy], i) => {
        const secili = tek && i === 0;
        s += S.daire(x + dx, 60 + dy, secili ? 6 : 4, { dolgu: secili ? 'accent' : 'basic', soluk: tek && !secili });
        if (secili) s += S.ok([[x + dx + 7, 60 + dy], [x + dx + 36, 47 + dy]], { renk: 'accent' });
      });
      return s + S.t(x, 143, tek ? 'Hız · momentum · kinetik enerji' : 'Hacim · sıcaklık · basınç', center);
    },
    metin: (p) => p.olcek === 'tek'
      ? 'Ok, seçili molekülün o andaki hız yönünü gösterir. [[K6 s. 159]]'
      : 'Kabın tümü için ölçülen değerler moleküler ölçekteki dalgalanmaları ortalar. [[K6 s. 159]]'
  });

  VIZ.fk09a_balon = (el) => SEKIL.sahne(el, {
    baslik: 'STP’de aynı hacimde üç gaz', vb: [560, 193], vbDar: [340, 193],
    secenek: options('gaz', 'Balondaki gaz', [['He', 'Helyum'], ['O₂', 'Oksijen'], ['Xe', 'Ksenon']]),
    ciz: (S, t, p) => {
      const x = S.w / 2;
      let s = S.daire(x, 85, 70, { dolgu: 'basic-soft', renk: 'basic' });
      s += S.cizgi([[x, 155], [x - 5, 162], [x + 5, 162], [x, 155]], { renk: 'basic' });
      for (const [dx, dy] of dots) {
        const renk = { He: 'accent', 'O₂': 'clin', Xe: 'warn' }[p.gaz];
        if (p.gaz === 'O₂') s += S.daire(x + dx - 4, 85 + dy, 4, { dolgu: renk });
        s += S.daire(x + dx + (p.gaz === 'O₂' ? 4 : 0), 85 + dy, p.gaz === 'Xe' ? 7 : 4, { dolgu: renk });
      }
      return s + S.t(x, 186, p.gaz + ' · 22,4 L · STP', center);
    },
    metin: (p) => p.gaz + ' balonunda 1 mol, yani yaklaşık 6,02 × 10<sup>23</sup> tanecik bulunur. [[K6 s. 160]]'
  });

  VIZ.fk09a_kutle = (el) => SEKIL.grafik(el, {
    baslik: 'N₂O kütlesinden madde miktarına', vb: [560, 260], vbDar: [350, 250],
    x: { min: 0, max: 44, ad: 'N₂O kütlesi (g)', adimlar: [0, 11, 22, 33, 44] },
    y: { min: 0, max: 1, ad: 'n (mol)', adimlar: [0, 0.5, 1] },
    param: [{ id: 'm', ad: 'Kütle', min: 0, max: 44, adim: 1, deger: 11, birim: 'g' }],
    egriler: [{ f: (m) => m / 44, renk: 'basic' }],
    dikey: (p) => [{ x: p.m }], noktalar: (p) => [{ x: p.m, y: p.m / 44 }],
    okuma: (p) => {
      const n = p.m / 44;
      return fmt(p.m) + ' g / (44 g/mol) ≈ ' + fmt(n, 3) + ' mol, yani yaklaşık ' +
        fmt(n * 6.02, 2) + ' × 10<sup>23</sup> molekül. [[K6 s. 160–162]]';
    }
  });

  VIZ.fk09a_yogunluk = (el) => SEKIL.sahne(el, {
    baslik: 'Eşit hacimde kuru ve nemli hava örneği', vb: [560, 155], vbDar: [340, 155],
    secenek: options('hava', 'Örnek', [['kuru', 'Kuru hava'], ['nemli', 'Nemli hava']]),
    ciz: (S, t, p) => {
      const x = S.w / 2;
      const turler = ['O₂', 'N₂', 'N₂', 'N₂', p.hava === 'kuru' ? 'N₂' : 'H₂O'];
      let s = S.kutu(x - 140, 15, 280, 82);
      turler.forEach((tur, i) => {
        const cx = x - 106 + 53 * i;
        s += S.daire(cx, 56, 21, { dolgu: tur === 'H₂O' ? 'clin-soft' : 'basic-soft' });
        s += S.t(cx, 62, tur, center);
      });
      return s + S.t(x, 132, p.hava === 'kuru' ? 'Başlangıç hacmi ve kütlesi' : 'Aynı hacim, daha az kütle', center);
    },
    metin: (p) => p.hava === 'kuru'
      ? 'Basitleştirilmiş kuru örnekte her beş taneciğin biri oksijen, dördü azottur. [[K6 s. 162]]'
      : 'Bir azot molekülünün yerini daha hafif bir su molekülü aldığında tanecik sayısı değişmez. [[K6 s. 162–163]]'
  });

  VIZ.fk09a_dalton = (el) => SEKIL.sahne(el, {
    baslik: 'Helyum uzaklaşınca basınç payları', vb: [560, 194], vbDar: [340, 194],
    secenek: options('kap', 'Kabın içeriği', [['karisim', 'O₂ ve He'], ['oksijen', 'He uzaklaştırıldı']]),
    ciz: (S, t, p) => {
      const x = S.w / 2, karisim = p.kap === 'karisim';
      let s = S.kutu(x - 110, 10, 220, 85);
      dots.forEach(([dx, dy], i) => {
        const oksijen = i % 2 === 0;
        if (!oksijen && !karisim) return;
        const renk = oksijen ? 'basic' : 'clin';
        if (oksijen) s += S.daire(x + dx - 7, 52 + dy, 4, { dolgu: renk });
        s += S.daire(x + dx, 52 + dy, 4, { dolgu: renk });
      });
      s += S.kutu(x - 110, 110, 110, 35, { yazi: 'O₂ payı', dolgu: 'basic-soft', r: 0 });
      if (karisim) s += S.kutu(x, 110, 110, 35, { yazi: 'He payı', dolgu: 'clin-soft', r: 0 });
      return s + S.t(x, 177, karisim ? 'Toplam = P(O₂) + P(He)' : 'Toplam = P(O₂)', center);
    },
    metin: (p) => p.kap === 'karisim'
      ? 'Her iki gazın molekülleri de duvara çarpar, iki katkı birlikte ölçülür. [[K6 s. 163]]'
      : 'Sıcaklık ve hacim aynıyken oksijenin katkısı korunur, helyumun katkısı kalkar. [[K6 s. 163]]'
  });

  VIZ.fk09a_nem = (el) => SEKIL.sahne(el, {
    baslik: 'Toplam basınç içinde kuru gaz ve su buharı payları', vb: [560, 165], vbDar: [340, 165],
    param: [{ id: 'su', ad: 'Su buharı basıncı', min: 1.3, max: 6.3, adim: 0.1, deger: 1.3, birim: 'kPa' }],
    ciz: (S, t, p) => {
      const w = S.w - 40, kuru = 101.3 - p.su, bolme = w * kuru / 101.3;
      return S.t(S.w / 2, 26, 'Toplam basınç 101,3 kPa', center)
        + S.kutu(20, 46, bolme, 35, { dolgu: 'basic-soft', renk: 'basic', r: 0 })
        + S.kutu(20 + bolme, 46, w - bolme, 35, { dolgu: 'clin', renk: 'clin', r: 0 })
        + S.t(20, 111, 'Kuru gazlar  ' + fmt(kuru) + ' kPa', { renk: 'basic', c: 'b' })
        + S.t(20, 141, 'Su buharı  ' + fmt(p.su) + ' kPa', { renk: 'clin', c: 'b' });
    },
    metin: (p) => 'Oksijenin kuru gazlardaki fraksiyonu 0,209 alındığında kısmi basıncı 0,209 × ' +
      fmt(101.3 - p.su) + ' ≈ ' + fmt(0.209 * (101.3 - p.su)) + ' kPa olur. [[K6 s. 163–166]]'
  });
})();
