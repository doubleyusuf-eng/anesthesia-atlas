/* Bölüm 82 · Gebelikte maternal fizyoloji — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = window.REF || ((s) => s);

  /* 1) Gebelik hormonlarının haftalara göre şematik seyri */
  VIZ.f82_endokrin = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'Gebelik haftalarına göre başlıca hormon düzeyleri',
    secenek: {
      id: 'h', ad: 'Hormon',
      liste: [
        { d: 'hcg', ad: 'β-hCG' },
        { d: 'hpl', ad: 'hPL' },
        { d: 'prog', ad: 'Progesteron' },
        { d: 'ost', ad: 'Östriol' },
      ],
    },
    x: { min: 0, max: 40, ad: 'Gebelik haftası', adimlar: [0, 10, 20, 30, 40] },
    y: { min: 0, max: 100, ad: 'Göreli düzey (şematik)', adimlar: [0, 50, 100] },
    dikey: () => [{ x: 10, ad: '10. hf: plasenta devri', renk: 'muted' }],
    egriler: [
      {
        renk: 'accent', w: 3, ad: 'β-hCG', adYer: 0.56,
        f: (x) => (x < 2 ? 0 : 88 * Math.pow((x - 2) / 8, 1.6) * Math.exp(1.6 * (1 - (x - 2) / 8)) + 10 * (1 - Math.exp(-x / 6))),
        goster: (p) => p.h === 'hcg',
      },
      {
        renk: 'warn', w: 3, ad: 'hPL (terme yakın tepe)', adYer: 0.72,
        f: (x) => (x < 4 ? 0 : 95 * Math.pow((x - 4) / 36, 1.5)),
        goster: (p) => p.h === 'hpl',
      },
      {
        renk: 'ok', w: 3, ad: 'Progesteron', adYer: 0.72,
        f: (x) => 12 + 82 * Math.pow(x / 40, 1.35),
        goster: (p) => p.h === 'prog',
      },
      {
        renk: 'clin', w: 3, ad: 'Östriol (fetal DHEAS)', adYer: 0.68,
        f: (x) => 6 + 90 * Math.pow(x / 40, 2.0),
        goster: (p) => p.h === 'ost',
      },
    ],
    noktalar: (p) => {
      if (p.h === 'hcg') return [{ x: 10, y: 96, ad: '10. hf tepe', renk: 'accent' }];
      if (p.h === 'hpl') return [{ x: 38, y: 88, ad: 'Termde tepe', renk: 'warn' }];
      if (p.h === 'prog') return [{ x: 10, y: 24, ad: 'Plasenta devralır', renk: 'ok' }];
      return [{ x: 38, y: 87, ad: 'Uteroplasental akım ↑', renk: 'clin' }];
    },
    okuma: (p) => {
      if (p.h === 'hcg') return REF('<b>β-hCG.</b> Gebeliğin 2. haftasından itibaren saptanır, her 2 günde bir ikiye katlanır ve 10. haftada tepe yapar; sonra plasenta sentezi devralınca düşer ve korpus luteum geriler. [[K1 s. 405]]');
      if (p.h === 'hpl') return REF('<b>İnsan plasental laktojeni (hPL).</b> Fetüs ve plasenta büyüdükçe artıp terme yakın tepe yapar; lipolizi artırır ve periferik insülin duyarlılığını azaltarak fetüse bol glukoz sağlar. [[K1 s. 405]]');
      if (p.h === 'prog') return REF('<b>Progesteron.</b> Erken gebelikte korpus luteumdan, 2.–3. trimesterde plasentadan salgılanır; miyometriyumu gevşetir, servikal mukus tıkacını oluşturur ve solunum merkezini uyarır. [[K1 s. 405–407]]');
      return REF('<b>Östriol.</b> Gebelikte baskın östrojendir ve fetal adrenal DHEAS öncülünden üretilir; uteroplasental kan akımını, uterus büyümesini, oksitosin duyarlılığını ve tromboemboli riskini artırır. [[K1 s. 406]]');
    },
  });

  /* 2) Solunum değişiklikleri ve genel anestezi riskleri */
  VIZ.f82_solunum = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 350],
    baslik: 'Gebelikte solunum sistemi değişiklikleri',
    secenek: {
      id: 's', ad: 'Görünüm',
      liste: [
        { d: 'vent', ad: 'Ventilasyon ve gazlar' },
        { d: 'frc', ad: 'Akciğer hacimleri (FRC)' },
        { d: 'ga', ad: 'Zor hava yolu ve O₂ rezervi' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 336 : 520, bx = cx - bw / 2;
      let s = '';
      if (p.s === 'vent') {
        const satir = [
          ['Dakika ventilasyonu (V̇E)', '+%50', 0.85, 'ok'],
          ['Tidal hacim (VT)', '+%40', 0.68, 'accent'],
          ['Solunum hızı (SS)', '+%10', 0.17, 'basic'],
          ['O₂ tüketimi (termde)', '+%20', 0.34, 'warn'],
        ];
        const barW = S.dar ? 120 : 210, xBar = S.dar ? 196 : 290;
        satir.forEach(([ad, val, fr, col], i) => {
          const y = 38 + i * 52;
          s += S.t(bx + 6, y + 18, S.dar ? ad.replace('Dakika ventilasyonu ', '') : ad, { c: 'b k' });
          s += S.kutu(xBar, y, barW, 24, { dolgu: 'bg', renk: 'line', r: 6 });
          s += S.kutu(xBar, y, barW * fr, 24, { dolgu: col + '-soft', renk: col, r: 6 });
          s += S.t(xBar + barW + 8, y + 17, val, { c: 'b k', renk: col });
        });
        s += S.rozet(cx, S.dar ? 286 : 258, S.dar ? 'PaCO₂ 4,3 kPa · HCO₃⁻ 20 mmol/L' : 'Progesteron hiperventilasyonu: PaCO₂ 4,3 kPa · HCO₃⁻ 20 mmol/L', { dolgu: 'basic-soft', renk: 'basic', w: S.dar ? 305 : 445 });
      } else if (p.s === 'frc') {
        const barW = S.dar ? 150 : 240, xBar = S.dar ? 168 : 260;
        const rows = [
          ['Gebe dışı FRC', '%100', 1.0, 'muted'],
          ['Gebe · ayakta', '−%20', 0.8, 'warn'],
          ['Gebe · supin', 'ek −%30', 0.56, 'crit'],
          ['Vital kapasite', 'Değişmez', 1.0, 'ok'],
        ];
        rows.forEach(([ad, val, fr, col], i) => {
          const y = 36 + i * 50;
          s += S.t(bx + 6, y + 18, ad, { c: 'b k' });
          s += S.kutu(xBar, y, barW, 24, { dolgu: 'bg', renk: 'line', r: 6 });
          s += S.kutu(xBar, y, barW * fr, 24, { dolgu: col + '-soft', renk: col, r: 6 });
          s += S.t(xBar + barW + 8, y + 17, val, { c: 'b k', renk: col });
        });
        s += S.rozet(cx, S.dar ? 284 : 256, S.dar ? 'Akciğer C sabit · Göğüs duvarı C −%20' : 'Akciğer kompliyansı sabit · Göğüs duvarı kompliyansı −%20 · AP çap +2–3 cm', { dolgu: 'accent-soft', renk: 'accent', w: S.dar ? 330 : 515 });
      } else {
        if (!S.dar) {
          s += S.kutu(bx, 34, 248, 166, { dolgu: 'crit-soft', renk: 'crit', r: 12 });
          s += S.t(bx + 124, 64, 'Zor hava yolu: ~1/250 (8×)', { a: 'middle', c: 'b k', renk: 'crit' });
          s += S.t(bx + 124, 96, ['• Mukoza/larinks ödemi', '• Vaskülarite ↑ (kanama)', '• Büyük memeler, kısa boyun', '• Hatalı krikoid bası'], { a: 'middle', c: 'k', lh: 22 });
          s += S.kutu(bx + 272, 34, 248, 166, { dolgu: 'warn-soft', renk: 'warn', r: 12 });
          s += S.t(bx + 396, 64, 'Hızlı desatürasyon', { a: 'middle', c: 'b k', renk: 'warn' });
          s += S.t(bx + 396, 102, ['O₂ tüketimi +%20', '+', 'O₂ deposu (FRC) ↓'], { a: 'middle', c: 'b k', lh: 24 });
          s += S.rozet(cx, 246, 'Hazırlık: ≥3 dk preoksijenasyon · iyi pozisyon · hazır ekipman', { dolgu: 'ok-soft', renk: 'ok', w: 460 });
        } else {
          s += S.kutu(bx, 18, bw, 134, { dolgu: 'crit-soft', renk: 'crit', r: 12 });
          s += S.t(cx, 44, 'Zor hava yolu: ~1/250 (8×)', { a: 'middle', c: 'b k', renk: 'crit' });
          s += S.t(cx, 72, ['Ödem · mukoza kanaması', 'Büyük memeler · kısa boyun', 'Hatalı krikoid bası'], { a: 'middle', c: 'k', lh: 22 });
          s += S.kutu(bx, 166, bw, 94, { dolgu: 'warn-soft', renk: 'warn', r: 12 });
          s += S.t(cx, 194, 'Hızlı desatürasyon', { a: 'middle', c: 'b k', renk: 'warn' });
          s += S.t(cx, 224, 'O₂ tüketimi +%20 + FRC ↓', { a: 'middle', c: 'k' });
          s += S.rozet(cx, 304, '≥3 dk preoksijenasyon · iyi pozisyon', { dolgu: 'ok-soft', renk: 'ok', w: 320 });
        }
      }
      return s;
    },
    metin: (p) => {
      if (p.s === 'vent') return REF('<b>Ventilasyon ve gazlar.</b> Progesteron medulladaki solunum merkezini uyarır: V̇E %50 artar (VT +%40, solunum hızı +%10), PaCO₂ tipik olarak 4,3 kPa\'ya, HCO₃⁻ 20 mmol/L\'ye iner. [[K1 s. 407]]');
      if (p.s === 'frc') return REF('<b>Akciğer hacimleri.</b> Diyafram yukarı itilir ama kasılması kısıtlanmaz; FRC ayakta %20, supinde ek %30 azalır (başlıca RV düşüşüyle), vital kapasite ise değişmez. [[K1 s. 407]]');
      return REF('<b>Genel anestezi riskleri.</b> Obstetrik zor hava yolu yaklaşık 1/250 (genel nüfusun 8 katı) görülür; artmış O₂ tüketimi ve azalmış FRC nedeniyle desatürasyon çok hızlıdır. [[K1 s. 407]]');
    },
  });

  /* 3) Kalp debisi profili ve fizyolojik anemi */
  VIZ.f82_kardiyo = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'Gebelik ve doğum döneminde kalp debisi ve kan hacmi',
    secenek: {
      id: 'm', ad: 'Gösterge',
      liste: [{ d: 'co', ad: 'Kalp debisi (CO %)' }, { d: 'kan', ad: 'Kan hacmi ve fizyolojik anemi' }],
    },
    x: { min: 0, max: 5, ad: 'Evre (0: Önce · 3: 3.Tr · 4: Doğum · 5: Erken PP)', adimlar: [0, 1, 2, 3, 4, 5] },
    y: { min: 80, max: 195, ad: 'Gebe dışına göre (%, şematik)', adimlar: [100, 125, 150, 175] },
    yatay: () => [{ y: 100, ad: 'Gebe dışı (%100)', renk: 'muted' }],
    egriler: [
      {
        renk: 'crit', w: 3, ad: 'Kalp debisi (CO)', adYer: 0.32,
        goster: (p) => p.m === 'co',
        f: (x) => {
          const pts = [100, 125, 140, 150, 165, 175];
          const i = Math.min(4, Math.floor(x)), u = x - i;
          return pts[i] + (pts[i + 1] - pts[i]) * u;
        },
      },
      {
        renk: 'basic', w: 3, ad: 'Plazma (+%45)', adYer: 0.45,
        goster: (p) => p.m === 'kan',
        f: (x) => 100 + 45 * Math.min(1, x / 3.2),
      },
      {
        renk: 'crit', w: 3, ad: 'Eritrosit (+%20–30)', adYer: 0.52,
        goster: (p) => p.m === 'kan',
        f: (x) => 100 + 25 * Math.min(1, x / 3.2),
      },
    ],
    noktalar: (p) => (p.m === 'co'
      ? [{ x: 3, y: 150, renk: 'warn' }, { x: 5, y: 175, renk: 'crit' }]
      : [{ x: 3.2, y: 145, renk: 'basic' }]),
    ek: (S, p, X, Y) => (p.m === 'co'
      ? S.t(X(3), Y(158), '3.Tr +%50', { a: 'middle', c: 'b k', renk: 'warn' }) + S.t(X(4.85), Y(184), 'PP +%60–80', { a: 'end', c: 'b k', renk: 'crit' })
      : S.t(X(3.5), Y(155), 'Fizyolojik anemi (Hb ~120 g/L)', { a: 'middle', c: 'b k', renk: 'basic' })),
    okuma: (p) => REF(p.m === 'co'
      ? '<b>Kalp debisi (CO).</b> 4. haftadan başlayarak 3. trimesterde +%50\'ye (SVR −%20, KH +%25, SV +%30; kontraktilite sabit), doğumda daha yukarı çıkar; postpartum 500 mL ototransfüzyon onu ayrıca %60–80 artırır. [[K1 s. 408]]'
      : '<b>Fizyolojik anemi.</b> Toplam kan hacmi yaklaşık %40 artar; plazma hacmi (+%45, RAAS) eritrosit kütlesinden (+%20–30, EPO) çok arttığı için Hb tipik 150 g/L\'den ~120 g/L\'ye, Hct ~0,35\'e iner. [[K1 s. 408]]'),
  });

  /* 4) Aortokaval bası: supin uyanık, anestezi altında, yana eğim */
  VIZ.f82_aortokaval = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 350], hareket: true, sure: 6,
    baslik: 'Gebelikte aortokaval bası ve pozisyon etkisi',
    secenek: {
      id: 'dur', ad: 'Pozisyon ve durum',
      liste: [
        { d: 'uyanik', ad: 'Supin (uyanık)' },
        { d: 'anes', ad: 'Supin (anestezi altında)' },
        { d: 'yan', ad: 'Yana eğim / tam yan' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 540, bx = cx - bw / 2;
      const basi = p.dur !== 'yan';
      const utX = basi ? cx : cx + (S.dar ? 100 : 130); /* sola yer değiştirme: kesit ayaktan bakılır (hastanın solu ekranın sağı) */
      let s = '';
      s += S.daire(utX, 92, S.dar ? 48 : 54, { dolgu: 'warn-soft', renk: 'warn', w: 2 });
      s += S.t(utX, 88, ['Gebe uterus', '(≥20. hafta)'], { a: 'middle', c: 'b k', lh: 16 });

      const vy = 176;
      s += S.kutu(cx - (S.dar ? 92 : 120), vy - 18, S.dar ? 78 : 96, 36, { dolgu: basi ? 'crit-soft' : 'basic-soft', renk: basi ? 'crit' : 'basic', yazi: 'IVC', yc: 'b' });
      s += S.kutu(cx + (S.dar ? 14 : 24), vy - 18, S.dar ? 78 : 96, 36, { dolgu: basi ? 'crit-soft' : 'ok-soft', renk: basi ? 'crit' : 'ok', yazi: 'Aorta', yc: 'b' });

      if (basi) {
        s += S.ok([[cx, 144], [cx - 34, 158]], { renk: 'crit', w: 2.2 });
        s += S.ok([[cx, 144], [cx + 34, 158]], { renk: 'crit', w: 2.2 });
      } else {
        s += S.akis([[cx - (S.dar ? 53 : 72), 214], [cx - (S.dar ? 53 : 72), 146]], t, { renk: 'basic', n: 3, hiz: 0.65, r: 4 });
        s += S.akis([[cx + (S.dar ? 53 : 72), 146], [cx + (S.dar ? 53 : 72), 214]], t, { renk: 'ok', n: 3, hiz: 0.65, r: 4 });
      }

      if (p.dur === 'uyanik') {
        s += S.rozet(cx, 240, S.dar ? 'Kısmi kompansasyon: sempatik ↑ + kollateraller' : 'Kompansasyon: sempatik çıkış (SVR/KH ↑) + azigos, paravertebral, epidural venler', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 344 : 535 });
        if (S.dar) s += S.t(cx, 286, 'Azigos, paravertebral ve epidural venler', { a: 'middle', c: 'k m' });
      } else if (p.dur === 'anes') {
        s += S.rozet(cx, 242, S.dar ? 'Sempatik yanıt yok → ağır hipotansiyon!' : 'Anestezi sempatik yanıtı kaldırır → ağır hipotansiyon / arrest riski', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 336 : 475 });
        s += S.t(cx, S.dar ? 286 : 276, 'Otoregüle olmayan plasental kan akımı hızla bozulur', { a: 'middle', c: 'b k', renk: 'crit' });
      } else {
        s += S.rozet(cx, 242, S.dar ? 'IVC ve aorta serbest · Venöz dönüş normal' : 'Büyük damar basısı kalkar → venöz dönüş ve plasental perfüzyon korunur', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 330 : 485 });
        s += S.t(cx, S.dar ? 286 : 276, 'Kesin rahatlama yalnızca tam yan pozisyonda güvence altındadır', { a: 'middle', c: 'k m' });
      }
      return s;
    },
    metin: (p) => {
      if (p.dur === 'uyanik') return REF('<b>Supin (uyanık gebe).</b> IVC basısı venöz dönüşü, aorta basısı uteroplasental akımı düşürür; uyanık gebelerin çoğu artmış sempatik çıkış ve azigos, paravertebral, epidural ven kollateralleriyle kısmen kompanse eder. [[K1 s. 408]]');
      if (p.dur === 'anes') return REF('<b>Supin (genel anestezi veya nöraksiyel blok).</b> Sempatik kompansasyon ortadan kalkar; hızla ağır hipotansiyon, kardiyak arrest ve yetersiz fetal gaz alışverişi gelişebilir. [[K1 s. 408]]');
      return REF('<b>Yana eğim / tam yan pozisyon.</b> Kama veya masa eğimi (KPR dahil) basıyı genellikle giderir; kesin rahatlama ise yalnızca tam yan pozisyonda güvence altındadır. [[K1 s. 408–409]]');
    },
  });

  /* 5) Gİ reflü ve hematolojik değişiklikler (4 adım) */
  VIZ.f82_gihem = (el) => SEKIL.adim(el, {
    vb: [640, 270], vbDar: [380, 320], hareket: false, oto: false,
    baslik: 'Gebelikte gastrointestinal ve hematolojik değişiklikler',
    adimlar: [
      {
        ad: 'Reflü ve bariyer basıncı',
        metin: REF('Progesteron AÖS tonusunu düşürür, uterus gastroözofageal açıyı azaltır ve 3. trimesterde mide içi basıncı yükselterek reflü riskini artırır. [[K1 s. 409]]'),
        ciz: (S) => {
          const cx = S.w / 2;
          let s = '';
          s += S.kutu(cx - 145, 28, 290, 52, { dolgu: 'warn-soft', renk: 'warn', yazi: ['AÖS tonusu ↓ (progesteron)', 'Gastroözofageal açı daralır'], yc: 'b k', lh: 18 });
          s += S.ok([[cx, 152], [cx, 84]], { renk: 'crit', w: 2.5 });
          s += S.kutu(cx - 145, 154, 290, 56, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Mide içi basınç ↑ (3. trimester)', 'Bariyer basıncı belirgin düşer'], yc: 'b k', lh: 18 });
          s += S.rozet(cx, 240, '1. trimesterden sonra RSI + partikülsüz antasit', { dolgu: 'accent-soft', renk: 'accent', w: S.dar ? 328 : 350 });
          return s;
        },
      },
      {
        ad: 'Mide boşalması ve pH',
        metin: REF('Mide boşalması normal gebelikten etkilenmez, fakat doğum eyleminde belirgin gecikir ve opioidlerle yavaşlar; 15. haftadan sonra plasental gastrin mide hacmini artırıp pH\'ı düşürür. [[K1 s. 409]]'),
        ciz: (S) => {
          const cx = S.w / 2;
          let s = '';
          if (!S.dar) {
            s += S.kutu(40, 42, 260, 118, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Normal gebelik', 'Mide boşalması DEĞİŞMEZ', '(ama gastrinle hacim ↑, pH ↓)'], yc: 'b k', lh: 20 });
            s += S.kutu(340, 42, 260, 118, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Doğum eylemi + opioid', 'Mide boşalması GECİKİR', 'Asit aspirasyonu (Mendelson) ↑'], yc: 'b k', lh: 20 });
          } else {
            s += S.kutu(20, 26, 340, 88, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Normal gebelik: boşalma değişmez', '15. hf plasental gastrin → pH ↓'], yc: 'b k', lh: 20 });
            s += S.kutu(20, 132, 340, 88, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Doğum eylemi + opioid: boşalma gecikir', 'Mendelson sendromu riski ↑'], yc: 'b k', lh: 20 });
          }
          s += S.rozet(cx, S.dar ? 264 : 216, 'Asidik içerik aspirasyonda akciğer hasarını artırır', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 344 : 390 });
          return s;
        },
      },
      {
        ad: 'Lökosit ve trombosit',
        metin: REF('Nötrofil ve monosit artışıyla WCC 12. haftadan sonra sıklıkla 6000–16.000/mm³ (doğumda 30.000/mm³\'e kadar) olur; trombositler hemodilüsyon ve kısalan ömürle azalır (term alt sınırı 115×10⁹/L). [[K1 s. 409]]'),
        ciz: (S) => {
          const cx = S.w / 2;
          let s = '';
          s += S.kutu(cx - (S.dar ? 164 : 220), 34, S.dar ? 328 : 440, 72, { dolgu: 'basic-soft', renk: 'basic', yazi: ['WCC ↑ (nötrofil + monosit)', '12. hf: 6000–16.000 · Doğum: ≤30.000/mm³'], yc: 'b k', lh: 20 });
          s += S.kutu(cx - (S.dar ? 164 : 220), 126, S.dar ? 328 : 440, 72, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Trombosit ↓ (hemodilüsyon + kısa ömür)', 'Termde normal alt sınır: 115 × 10⁹/L'], yc: 'b k', lh: 20 });
          return s;
        },
      },
      {
        ad: 'Hiperkoagülabilite',
        metin: REF('Fibrinojen ve pıhtılaşma faktörleri VII, X, XII artarken fibrinoliz azalır; bu denge venöz tromboembolizm riskini belirgin yükseltir. [[K1 s. 409]]'),
        ciz: (S) => {
          const cx = S.w / 2;
          let s = '';
          s += S.kutu(cx - (S.dar ? 158 : 210), 34, S.dar ? 316 : 420, 62, { dolgu: 'crit-soft', renk: 'crit', yazi: 'Fibrinojen ↑ · Faktör VII, X, XII ↑', yc: 'b k' });
          s += S.kutu(cx - (S.dar ? 158 : 210), 114, S.dar ? 316 : 420, 56, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Fibrinoliz ↓', yc: 'b k' });
          s += S.rozet(cx, 214, 'Venöz tromboembolizm (VTE) riski ↑', { dolgu: 'crit-soft', renk: 'crit', w: 300 });
          return s;
        },
      },
    ],
  });

  /* 6) Renal fizyoloji */
  VIZ.f82_renal = (el) => SEKIL.sahne(el, {
    vb: [640, 270], vbDar: [380, 330], hareket: true, sure: 5,
    baslik: 'Gebelikte böbrek kan akımı, GFR ve tübüler sınırlar',
    secenek: { id: 'r', ad: 'Odak', liste: [{ d: 'gfr', ad: 'RBF / GFR (+%50) ve idrar' }, { d: 'anatomi', ad: 'Üreter dilatasyonu ve ürik asit' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      let s = '';
      if (p.r === 'gfr') {
        s += S.kutu(bx, 20, bw, S.dar ? 64 : 56, { dolgu: 'ok-soft', renk: 'ok', yazi: S.dar ? ['RBF ve GFR +%50', 'Serum kreatinin ve üre ↓'] : 'RBF +%50 · GFR +%50 → Serum kreatinin ve üre ↓', yc: 'b k', lh: 19 });
        s += S.akis([[cx, 82], [cx, 128]], t, { renk: 'ok', n: 3, hiz: 0.6, r: 4.5 });
        if (!S.dar) {
          s += S.kutu(bx, 134, 248, 96, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Glikozüri', 'Tübüler geri emilim yetişemez', 'İdrar çubuğu güvenilmez'], yc: 'b k', lh: 19 });
          s += S.kutu(bx + 272, 134, 248, 96, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Proteinüri eşiği ↑', 'Normal: ≤300 mg/24 sa', '(Gebe dışı: ≤150 mg/24 sa)'], yc: 'b k', lh: 19 });
        } else {
          s += S.kutu(bx, 132, bw, 76, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Glikozüri: geri emilim yetişemez', 'İdrar çubuğu diyabette güvenilmez'], yc: 'b k', lh: 19 });
          s += S.kutu(bx, 222, bw, 76, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Normal proteinüri: ≤300 mg/24 sa', '(Gebe dışı: 150 mg · preeklampside ↑)'], yc: 'b k', lh: 19 });
        }
      } else {
        s += S.kutu(bx, 28, bw, 86, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Üreter ve renal pelvis dilatasyonu', 'Mekanik bası + progesteron → İYE / piyelonefrit ↑'], yc: 'b k', lh: 20 });
        s += S.kutu(bx, 138, bw, 94, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Ürik asit seyri', 'Erken gebelik: ↓ (GFR ↑) · 3. trim: ↑ (geri emilim ↑)', 'Hiperürisemi preeklampsi ile ilişkili'], yc: 'b k', lh: 20 });
      }
      return s;
    },
    metin: (p) => REF(p.r === 'gfr'
      ? '<b>RBF ve GFR (+%50).</b> Kalp debisindeki artışı yansıtarak serum kreatinin ve üre düzeylerini düşürür; tübüler geri emilim yetişemediğinden glikozüri ve 300 mg/24 saate kadar proteinüri görülebilir. [[K1 s. 409–410]]'
      : '<b>Üreter dilatasyonu ve ürik asit.</b> Mekanik bası ve progesteron üreterleri genişleterek İYE/piyelonefriti sıklaştırır; ürik asit erken gebelikte düşer, 3. trimesterde yükselir. [[K1 s. 409]]'),
  });

  /* 7) SSS, epidural/BOS basıncı ve hepatik proteinler */
  VIZ.f82_cnshep = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 350],
    baslik: 'Gebelikte epidural ve BOS basıncı, MAC ve hepatik proteinler',
    secenek: { id: 'k', ad: 'Sistem', liste: [{ d: 'epi', ad: 'Epidural ve BOS basıncı' }, { d: 'mac', ad: 'MAC, karaciğer ve relaksin' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      let s = '';
      if (p.k === 'epi') {
        const rows = [
          ['Gebe dışı epidural', '−1 cmH₂O', 0.08, 'muted'],
          ['Gebe (dinlenme)', '+1 cmH₂O', 0.14, 'basic'],
          ['Doğum 1. evre', '+4–10 cmH₂O', 0.25, 'warn'],
          ['Doğum 2. evre (ıkınma)', '+60 cmH₂O', 0.86, 'crit'],
          ['BOS basıncı (2. evre)', '≤70 cmH₂O', 1.0, 'accent'],
        ];
        const barW = S.dar ? 105 : 190, xBar = S.dar ? 185 : 275;
        rows.forEach(([ad, val, fr, col], i) => {
          const y = 26 + i * 46;
          s += S.t(bx + 4, y + 17, ad, { c: 'b k' });
          s += S.kutu(xBar, y, barW, 22, { dolgu: 'bg', renk: 'line', r: 5 });
          s += S.kutu(xBar, y, barW * fr, 22, { dolgu: col + '-soft', renk: col, r: 5 });
          s += S.t(xBar + barW + 6, y + 17, val, { c: 'b k', renk: col });
        });
        s += S.rozet(cx, S.dar ? 296 : 266, S.dar ? 'Epidural ven dolgunluğu → venöz kanülasyon ↑' : 'IVC basısıyla dolan epidural venler istem dışı venöz kanülasyonu sıklaştırır', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 340 : 495 });
      } else {
        const items = [
          ['Volatil MAC: −%30–40', 'Progesteron ve plasental β-endorfinlerin rolü düşünülmektedir', 'accent'],
          ['Albümin: 35 → 25 g/L · ALP ↑', 'Hemodilüsyon; ALP karaciğer + plasenta kaynaklıdır', 'basic'],
          ['Plazma kolinesteraz: −%25', 'Azalmış sentez + hemodilüsyon → süksametonyum uzar', 'crit'],
          ['Bağ gevşekliği (relaksin)', 'Genel anestezide bel/eklem için dikkatli pozisyon', 'warn'],
        ];
        items.forEach(([h, sub, col], i) => {
          const y = 18 + i * (S.dar ? 78 : 66);
          s += S.kutu(bx, y, bw, S.dar ? 68 : 56, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 19 });
        });
      }
      return s;
    },
    metin: (p) => REF(p.k === 'epi'
      ? '<b>Epidural ve BOS basıncı.</b> IVC basısıyla dolan epidural venler basıncı −1\'den +1 cmH₂O\'ya, doğumun 1. evresinde +4–10\'a, 2. evrede ıkınmayla +60 cmH₂O\'ya (BOS\'u 70 cmH₂O\'ya) çıkarır. [[K1 s. 410]]'
      : '<b>MAC, karaciğer ve relaksin.</b> MAC %30–40 azalır; albümin ~25 g/L\'ye ve plazma kolinesterazı %25 düşer (süksametonyum uzar); plasental relaksin bağları gevşetir. [[K1 s. 410]]'),
  });
})();
