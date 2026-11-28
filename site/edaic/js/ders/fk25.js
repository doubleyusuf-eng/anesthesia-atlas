(function () {
  'use strict';
  const VIZ = window.VIZ;
  const middle = { a: 'middle' };
  const freq = field => field * (21.3 / 0.5);
  const fmt = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 1 });

  VIZ.fk25_tarayici = el => SEKIL.cizim(el, {
    baslik: 'MR tarayıcısının kesiti',
    giris: 'Sargıyı ve onu çevreleyen soğutucuyu bulun. [[K6 s. 403]]',
    gorunumler: [{ ad: 'Kısmi kesit', resim: 'img/fizik/25-tarayici.webp', en: 1024, boy: 683, noktalar: [
      { x: 700, y: 181, ad: 'Süperiletken sargı', metin: 'Sargıda dolaşmayı sürdüren akım ana manyetik alanı oluşturur. [[K6 s. 403]]' },
      { x: 790, y: 172, ad: 'Sıvı helyum banyosu', metin: 'Helyum sargıyı süperiletkenliğin sürdüğü düşük sıcaklıkta tutar. [[K6 s. 403]]' },
      { x: 525, y: 297, ad: 'Tünel', metin: 'Dar açıklık bazı hastalarda klostrofobiye yol açabilir. [[K6 s. 410]]' },
      { x: 311, y: 450, ad: 'Hasta masası', metin: 'Masa hastayı tarama sırasında yavaşça içeri ve dışarı taşır. [[K6 s. 410]]' }
    ] }]
  });

  VIZ.fk25_larmor = el => SEKIL.grafik(el, {
    baslik: 'Hidrojenin Larmor frekansı ve alan şiddeti', vb: [600, 270], vbDar: [360, 266],
    x: { min: 0.5, max: 3, ad: 'Manyetik akı yoğunluğu (T)', adimlar: [0.5, 1.5, 3] },
    y: { min: 21.3, max: 128, ad: 'Frekans (MHz)', adimlar: [21.3, 128] },
    param: [{ id: 'b', ad: 'Ana alan', min: 0.5, max: 3, adim: 0.1, deger: 1.5, birim: 'T' }],
    egriler: [{ f: freq, renk: 'basic' }], noktalar: p => [{ x: p.b, y: freq(p.b) }],
    dikey: p => [{ x: p.b }], yatay: p => [{ y: freq(p.b) }],
    okuma: p => fmt(p.b) + ' T alanda hidrojenin presesyon frekansı yaklaşık ' + fmt(freq(p.b)) + ' MHz olur. [[K6 s. 404]]'
  });

  VIZ.fk25_presesyon = el => SEKIL.sahne(el, {
    baslik: 'Eğik dipol ekseninin presesyonu', vb: [360, 200], hareket: true,
    ciz: (S, t) => {
      const aci = t * Math.PI;
      const halka = Array.from({ length: 81 }, (_, i) => {
        const a = i * Math.PI / 40;
        return [135 + 50 * Math.cos(a), 69 + 13 * Math.sin(a)];
      });
      return S.ok([[135, 165], [135, 22]], { renk: 'basic' }) +
        S.t(149, 29, 'Ana alan', { renk: 'basic' }) +
        S.cizgi(halka, { renk: 'muted', kesik: true }) +
        S.ok([[135, 157], [135 + 50 * Math.cos(aci), 69 + 13 * Math.sin(aci)]], { renk: 'clin', w: 4 }) +
        S.daire(135, 157, 5, { dolgu: 'clin', renk: 'clin' }) +
        S.t(211, 108, ['Eğik dipol', 'ekseni'], { renk: 'clin' });
    },
    metin: () => 'Kesikli iz, eğik eksenin ucunun ana alan çevresindeki yolunu gösterir. [[K6 s. 404]] Gösterim hızı şematiktir. [[K6 s. 404]]'
  });

  const dipolAdimlari = [
    ['Alan yok', 'Dipoller farklı yönlere bakar. [[K6 s. 404–405]]'],
    ['Ana alan', 'Dipoller paralel veya antiparalel hizalanır, paralel olanlar az farkla çoğunluktadır. [[K6 s. 404]]'],
    ['RF açık', 'Seçili proton, ana alana dik RF alanından rezonansla enerji alarak antiparalel duruma geçer. [[K6 s. 404]]'],
    ['RF kapalı', 'Seçili proton paralel duruma dönerken enerji farkını RF fotonu olarak verir. [[K6 s. 406]]']
  ];
  VIZ.fk25_dipol = el => SEKIL.adim(el, {
    baslik: 'Diz dokusunda protonların yönelimi', oto: false, vb: [360, 214],
    adimlar: dipolAdimlari.map(([ad, metin], i) => ({ ad, metin, ciz: S => {
      let svg = i ? S.ok([[26, 149], [26, 59]], { renk: 'basic' }) + S.t(26, 40, 'B', middle) : '';
      const yon = i ? [1, -1, 1, -1, i === 2 ? -1 : 1] : [0.6, 2.1, 3.6, 4.4, 5.5];
      yon.forEach((v, j) => {
        const x = 65 + j * 58, y = 102;
        const dx = i ? 0 : 21 * Math.sin(v), dy = i ? -23 * v : -21 * Math.cos(v);
        const renk = j === 4 ? 'clin' : 'muted';
        svg += S.daire(x, y, 26, { renk, dolgu: j === 4 ? 'clin-soft' : 'paper' });
        svg += S.ok([[x - dx, y - dy], [x + dx, y + dy]], { renk, w: 3 });
      });
      if (i > 1) {
        const yol = [[282, 169], [198, 169]];
        svg += S.ok(i === 2 ? yol.slice().reverse() : yol, { renk: 'clin' });
        svg += S.t(100, 174, i === 2 ? 'RF vericisi' : 'RF alıcısı', middle);
        svg += S.t(300, 198, 'Proton', middle);
      }
      return svg;
    } }))
  });

  VIZ.fk25_konum = el => SEKIL.sahne(el, {
    baslik: 'Gradyan ile konum kodlama', vb: [360, 205],
    secenek: { id: 'g', ad: 'Gradyan alanı', liste: [{ d: 'yok', ad: 'Gradyan kapalı' }, { d: 'var', ad: 'Gradyan açık' }] },
    ciz: (S, t, p) => {
      let svg = S.t(180, 25, 'Kesitteki konum', middle);
      ['Sol', 'Orta', 'Sağ'].forEach((ad, i) => {
        const x = 65 + 115 * i;
        svg += S.kutu(x - 50, 37, 100, 42, { yazi: ad, dolgu: 'basic-soft' });
        const cevrim = p.g === 'var' ? i + 2 : 3;
        const dalga = Array.from({ length: 91 }, (_, j) => [x - 45 + j, 132 - 13 * Math.sin(2 * Math.PI * cevrim * j / 90)]);
        svg += S.cizgi(dalga, { renk: 'clin' });
        svg += S.t(x, 177, p.g === 'var' ? ['Düşük', 'Orta', 'Yüksek'][i] : 'Eşit', middle);
      });
      return svg;
    },
    metin: p => p.g === 'var' ? 'Gradyan bu örnekte alanı sağa doğru güçlendirir, sağdan gelen RF sinyalinin frekansı en yüksektir. [[K6 s. 407]]' : 'Düzgün ana alanda hidrojenlerin Larmor frekansı aynıdır. [[K6 s. 404]] [[K6 s. 407]]'
  });

  VIZ.fk25_gevseme = el => SEKIL.sahne(el, {
    baslik: 'Boyuna ve enine bileşenler', vb: [360, 216],
    secenek: { id: 'evre', ad: 'RF sonrası', liste: [{ d: 'erken', ad: 'Darbe sonrası' }, { d: 'gec', ad: 'Dengeye yaklaşırken' }] },
    ciz: (S, t, p) => {
      const erken = p.evre === 'erken';
      return S.cizgi([[85, 26], [85, 167], [316, 167]], { renk: 'line' }) +
        S.ok([[85, 167], [85, erken ? 133 : 52]], { renk: 'basic', w: 5 }) +
        S.ok([[85, 167], [erken ? 280 : 132, 167]], { renk: 'clin', w: 5 }) +
        S.t(97, 31, 'Boyuna · ana alana paralel') + S.t(140, 197, 'Enine · ana alana dik');
    },
    metin: p => p.evre === 'erken' ? 'RF darbesi kesilince iki dik bileşen birbirinden bağımsız izlenebilir. [[K6 s. 407]]' : 'Boyuna mıknatıslanma yeniden gelişirken enine bileşen azalır. [[K6 s. 407]]'
  });

  function riskSemasi(el, baslik, durumlar) {
    return SEKIL.adim(el, {
      vb: [360, 215], baslik, oto: false,
      adimlar: durumlar.map(([ad, kaynak, olay, sonuc, metin]) => ({
        ad, metin, ciz: S => {
          let svg = '';
          [kaynak, olay, sonuc].forEach((yazi, i) => {
            const y = 8 + 77 * i;
            svg += S.kutu(22, y, 316, 46, { yazi, dolgu: ['basic-soft', 'paper', 'warn-soft'][i] });
            if (i < 2) svg += S.ok([[180, y + 47], [180, y + 73]], { renk: 'muted' });
          });
          return svg;
        }
      }))
    });
  }

  VIZ.fk25_risk = el => riskSemasi(el, 'Alan türüne göre tehlike', [
    ['Fırlama', 'Serbest ferromanyetik cisim', 'Ana alana doğru çekilme', 'Çarpma ve sıkışma', 'Metal serum askısı havada fırlayarak hastayı, çalışanı ve ekipmanı tehlikeye atabilir. [[K6 s. 403]] [[K6 s. 408]]'],
    ['Yanık', 'İletken metal veya dokuyla kapanan yol', 'Değişen alanla indüklenen akım', 'Direnç ısısı ve yanık', 'Temas eden ekstremiteler arasına köpük ped konur. [[K6 s. 408]]'],
    ['Uyarılma', 'Hızla değişen manyetik alan', 'Girdap akımları', 'Periferik sinir uyarılması', 'Hasta taramada hafif periferik sinir uyarılması hissedebilir. [[K6 s. 409]]']
  ]);

  VIZ.fk25_quench = el => riskSemasi(el, 'Quench sırasında gazın yolu', [
    ['Normal tahliye', 'Kriyojen hızla kaynar', 'Soğuk buhar tahliye borusuna girer', 'Gaz bina dışına çıkar', 'Quench sırasında güçlü bir patlama sesi veya şiddetli bir tıslama duyulabilir. [[K6 s. 409–410]]'],
    ['Tahliye arızası', 'Boru tıkalı veya tahliye arızalı', 'Soğuk buhar odadaki havayı uzaklaştırır', 'Oksijen azalması ve asfiksi', 'Sıvı veya buhar teması soğuk yanığına, çok soğuk buharın solunması akciğer hasarına neden olabilir. [[K6 s. 410]]']
  ]);
})();
