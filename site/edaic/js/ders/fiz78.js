/* Bölüm 78 · Açlık: nitel, etkileşimli şekiller. */
(function () {
  'use strict';
  const D78_VIZ = window.VIZ;
  const D78_RM = window.VIZ_YARDIM.RM;
  const D78_box = (S, x, y, w, h, text, color = 'accent') =>
    S.kutu(x, y, w, h, { yazi: text, renk: color, dolgu: color + '-soft', yc: 'k', lh: 20 });
  const D78_flow = (S, pts, t, color = 'accent', w = 2) =>
    S.ok(pts, { renk: color, w }) + (D78_RM ? '' : S.akis(pts, t, { renk: color, n: 3, r: 3.5 }));
  const D78_steps = (el, cfg) => {
    const stop = SEKIL.adim(el, cfg);
    // Kit hareketi durdurur; azaltılmış harekette özet/son adımı da seç.
    if (D78_RM) el.querySelector('[data-i="' + (cfg.adimlar.length - 1) + '"]').click();
    return stop;
  };

  const D78_hormonText = {
    tok: '<b>Tok.</b> İnsülin yüksek, glukagon düşük: glukoz alımı ve depolama desteklenir. Açlık durumunu seçin. [[K1 s. 384]]',
    ac: '<b>Açlık.</b> Glukoz düşünce insülin azalır, glukagon artar. Karaciğer glukoz sağlar, yağ dokusunda lipoliz başlar; öncelik beyin ve eritrositler için glukozdur. [[K1 s. 384]]',
    agir: '<b>Uzamış açlık.</b> İnsülin çok düşük, glukagon yüksek: glukoneogenez ve keton yapımı öne çıkar; kastan amino asit salınımı artar. [[K1 s. 384]]'
  };
  D78_VIZ.f78_hormon = (el) => SEKIL.sahne(el, {
    baslik: 'Tokluk ve açlıkta hormon dengesi', vb: [640, 370], vbDar: [360, 540],
    secenek: { id: 'd', ad: 'Durum', liste: [{ d: 'tok', ad: 'Tok' }, { d: 'ac', ad: 'Açlık' }, { d: 'agir', ad: 'Uzamış açlık' }] },
    metin: (p) => D78_hormonText[p.d],
    ciz: (S, t, p) => {
      const cx = S.dar ? 180 : 150, y = 112;
      const tilt = p.d === 'tok' ? 22 : p.d === 'ac' ? -22 : -34;
      let s = S.t(cx, 24, 'Hormonların göreli baskınlığı', { a: 'middle', c: 'b k' });
      s += S.cizgi([[cx - 86, y + tilt], [cx + 86, y - tilt]], { w: 4 });
      s += S.cizgi([[cx, y], [cx - 20, y + 44], [cx + 20, y + 44], [cx, y]], { renk: 'muted' });
      s += D78_box(S, cx - 142, y + tilt - 55, 112, 48, ['İnsülin', p.d === 'tok' ? 'yüksek' : p.d === 'ac' ? 'düşük' : 'çok düşük'], 'basic');
      s += D78_box(S, cx + 30, y - tilt - 55, 112, 48, ['Glukagon', p.d === 'tok' ? 'düşük' : 'yüksek'], 'warn');
      const x = S.dar ? 24 : 330, top = S.dar ? 200 : 22, w = S.dar ? 312 : 286;
      const labels = p.d === 'tok'
        ? [['Karaciğer', 'Glukoz depolanır'], ['Yağ dokusu', 'Depolama'], ['İskelet kası', 'Glukoz alımı']]
        : p.d === 'ac'
          ? [['Karaciğer', 'Glikojenoliz → glukoz'], ['Yağ dokusu', 'Lipoliz'], ['İskelet kası', 'İnsülin azalır']]
          : [['Karaciğer', 'Glukoneogenez + keton'], ['Yağ dokusu', 'Yağ asidi + gliserol'], ['İskelet kası', 'Amino asit salınımı']];
      labels.forEach((a, i) => { s += D78_box(S, x, top + i * 70, w, 56, a, ['accent', 'warn', 'crit'][i]); });
      const gy = S.dar ? 438 : 266;
      s += D78_box(S, 24, gy, S.w - 48, 90,
        [p.d === 'tok' ? 'Plazma glukozu → alım / depolama' : 'Plazma glukozu korunur', 'Beyin + eritrosit:', 'Glukoz gereksinimi sürer']);
      const path = [[x + w, top + 28], [x + w + 10, top + 28], [x + w + 10, gy - 12], [x + w - 25, gy - 12], [x + w - 25, gy - 2]];
      s += S.ok(p.d === 'tok' ? path.slice().reverse() : path, { renk: 'accent' });
      return s;
    }
  });

  const D78_evreText = [
    'Glukagon karaciğerde glikojenolizi uyarır; glikojen deposu 48 saatte biter. [[K1 s. 384]]',
    'Yüksek glukagon ve düşük insülin lipolizi destekler. Yağ asitlerinin β-oksidasyonu erken dönemde enerjinin çoğunu sağlar; karaciğerde biriken asetil-KoA ketona dönüşür. Gliserol glukoneogeneze katılır. [[K1 s. 384]]',
    'Glukoneogenez artar; kaynakları gliserol, laktat ve amino asitlerdir. Çok düşük insülin keton yapımını artırır. [[K1 s. 384]]',
    'Dokular ketona uyum sağlar, glukoneogenez yavaşça azalır; keton 7 mmol/L’ye dek çıkar, BMR düşer. Amino asitlerin payı artar. Kitabın beyin için verdiği 100–120 g/gün değerinin açıklaması aşağıdaki Atlas notundadır. [[K1 s. 384]]'
  ];
  D78_VIZ.f78_evre = (el) => D78_steps(el, {
    baslik: 'Açlıkta değişen yakıt yolları', vb: [640, 480], vbDar: [360, 570], hareket: true, sure: 7,
    adimlar: ['24–48 sa: glikojen', '24–48 sa: yağ', 'Sonraki günler', 'Sonraki haftalar'].map((ad, i) => ({
      ad, metin: D78_evreText[i], ciz: (S, t) => {
        const w = S.w, cx = w / 2, bw = S.dar ? 300 : 450, left = (w - bw) / 2;
        const times = ['24–48 saat', 'Günler', 'Haftalar'];
        let s = times.map((v, k) => D78_box(S, 8 + k * (w - 16) / 3, 8, (w - 28) / 3, 32, v, k === (i < 2 ? 0 : i - 1) ? 'accent' : 'basic')).join('');
        if (i === 0) {
          s += D78_box(S, left, 65, bw, 90, ['Karaciğer', 'Glikojen → glukoz']);
          s += S.kutu(left + 20, 132, bw - 40, 9, { dolgu: 'line', renk: 'line' });
          const remain = D78_RM ? 0 : Math.max(0, 1 - t / 7);
          if (remain) s += S.kutu(left + 20, 132, (bw - 40) * remain, 9, { dolgu: 'accent', renk: 'accent' });
          s += S.t(cx, 181, 'Glikojen 48 saatte tükenir', { a: 'middle', c: 'k' });
          s += D78_flow(S, [[cx, 193], [cx, 240]], t);
          s += D78_box(S, left, 248, bw, 56, ['Kan', 'Plazma glukozu']);
          s += D78_flow(S, [[cx, 310], [cx, 358]], t);
          s += D78_box(S, left, 366, bw, 64, ['Beyin + eritrosit', 'Glukoz kullanımı']);
        } else if (i === 1) {
          s += D78_box(S, left, 60, bw, 60, ['Yağ dokusu: trigliserit', 'Lipoliz → yağ asidi + gliserol'], 'warn');
          s += D78_flow(S, [[cx, 123], [cx, 170]], t, 'warn');
          s += D78_box(S, left, 177, bw, 68, ['Yağ asidi → β-oksidasyon', 'Enerji + asetil-KoA ↑'], 'warn');
          s += D78_flow(S, [[cx, 250], [cx, 294]], t, 'warn');
          s += D78_box(S, left, 302, bw, 65, ['Karaciğer mitokondrisi', 'Asetil-KoA → keton cisimleri'], 'clin');
          s += D78_flow(S, [[cx, 372], [cx, 404]], t, 'clin');
          s += S.t(cx, 429, 'Keton → kan → dokular', { a: 'middle', c: 'b k', renk: 'clin' });
          s += S.t(cx, S.dar ? 476 : 463, 'Gliserol → glukoneogenez', { a: 'middle', c: 'k', renk: 'warn' });
        } else {
          const small = (w - 40) / 3;
          [['Yağ', 'Gliserol'], ['Kan', 'Laktat'], ['Kas', 'Amino asit']].forEach((a, k) => {
            const x = 10 + k * (small + 10), col = ['warn', 'accent', 'crit'][k];
            s += D78_box(S, x, 66, small, 64, a, col);
            s += D78_flow(S, [[x + small / 2, 134], [x + small / 2, 157], [cx, 194]], t, col, i === 3 && k === 2 ? 4 : 2);
          });
          s += D78_box(S, left, 202, bw, 66, ['Karaciğer', i === 2 ? 'Glukoneogenez ↑' : 'Glukoneogenez azalır']);
          s += D78_flow(S, [[cx - 60, 273], [cx - 60, 313]], t, 'accent', i === 2 ? 4 : 1.5);
          s += D78_flow(S, [[cx + 60, 273], [cx + 60, 313]], t, 'clin', i === 3 ? 5 : 3);
          s += D78_box(S, left, 320, bw, 66, ['Kan → dokular', i === 2 ? 'Glukoz + keton ↑' : 'Keton kullanımı ↑; glukoz sürer'], 'clin');
          s += S.t(cx, 414, i === 2 ? 'İnsülin: çok düşük' : 'Keton ≤ 7 mmol/L · BMR ↓', { a: 'middle', c: 'b k' });
          if (i === 3) s += S.t(cx, 441, ['Beyin: 100–120 g/gün (kitap)', 'Aşağıdaki Atlas notuna bakın.'], { a: 'middle', c: 'k' });
        }
        return s;
      }
    }))
  });

  const D78_muscle = (x) => x <= 50 ? 100 - 0.3 * x : Math.max(0, 85 - 3 * (x - 50));
  const D78_curves = [
    { f: (x) => Math.max(0, 100 * (1 - x / 2)), renk: 'accent' },
    { f: (x) => Math.max(0, 100 * (1 - x / 50)), renk: 'warn' },
    { f: D78_muscle, renk: 'crit' },
    { f: (x) => 72 * Math.min(1, x / 21), renk: 'clin', kesik: true }
  ];
  D78_VIZ.f78_sure = (el) => SEKIL.grafik(el, {
    baslik: 'Şematik yakıt stokları ve keton eğilimi', vb: [640, 360], vbDar: [380, 400],
    x: { min: 0, max: 70, ad: 'Açlık süresi (gün)', adimlar: [0, 10, 20, 30, 40, 50, 60, 70] },
    y: { min: 0, max: 100, ad: 'Depo (% başlangıç)', adimlar: [0, 50, 100] },
    param: [{ id: 'g', ad: 'Gün', min: 0, max: 70, adim: 1, deger: 1, birim: 'gün' }],
    egriler: D78_curves,
    dikey: (p) => [{ x: p.g }], yatay: () => [{ y: 50, renk: 'crit' }],
    bolgeler: () => [{ x1: 40, x2: 60, renk: 'warn-soft' }],
    noktalar: (p) => D78_curves.map((e) => ({ x: p.g, y: e.f(p.g), renk: e.renk })),
    ek: (S, p, X, Y) => {
      // Sabit açıklama alanı eğrilerin altındaki boş bölgede; uçta taşan etiket yok.
      let s = '';
      ['Glikojen', 'Yağ', 'Kas', 'Keton*'].forEach((label, i) => {
        const x = X(7), y = Y(36) + i * 21;
        s += S.cizgi([[x, y - 4], [x + 24, y - 4]], { renk: D78_curves[i].renk, kesik: i === 3, w: 3 });
        s += S.t(x + 32, y, label, { c: 'k' });
      });
      s += S.t(X(50), Y(96), ['Yağ tükenmesi', '40–60 gün'], { a: 'middle', c: 'k' });
      s += S.t(X(68), Y(50) + 19, 'Kasın yarısı', { a: 'end', c: 'k', renk: 'crit' });
      return s;
    },
    okuma: (p) => {
      let m;
      if (D78_muscle(p.g) <= 50) m = 'Şematik kas eğrisi yarı düzeyine ulaştı: solunum kası sekresyonları temizleyemez ve pnömoni gelişebilir. Bu gün bir ölüm zamanı tahmini değildir. [[K1 s. 385]]';
      else if (p.g >= 40) m = '70 kg’lık erkekte yağ deposu 40–60 gün yeter. Kas amino asitlerinin kullanımı artar. Ağır açlıkta yalnız yaşam kurtarıcı hareket kalır; sempatik etkinlik azalınca ısı ve kan basıncı denetimi zorlaşır. [[K1 s. 384–385]]';
      else if (p.g >= 21) m = 'Dokular ketona uyum sağlar; keton en çok 7 mmol/L, BMR düşüktür. Gereksiz hareket azalır. [[K1 s. 384]]';
      else if (p.g > 2) m = 'Glikojen tükenmiştir; glukoneogenez ve keton yapımı artar. [[K1 s. 384]]';
      else m = p.g === 2 ? '48 saat: karaciğer glikojeni tükenir; lipoliz ve β-oksidasyon enerji sağlar. [[K1 s. 384]]' : 'Karaciğer glikojeni azalır; lipoliz ve β-oksidasyon erken dönemde enerji sağlar. [[K1 s. 384]]';
      return '<b>Gün ' + p.g + '.</b> ' + m + '<br><b>*Keton:</b> kesik çizgi yalnız nitel eğilimdir; yüzde ekseninden okunmaz.';
    }
  });

  D78_VIZ.f78_eras = (el) => SEKIL.sahne(el, {
    baslik: 'Ameliyat öncesi açlık ve karbonhidrat yüklemesi', vb: [640, 440], vbDar: [360, 620],
    secenek: { id: 's', ad: 'Yaklaşım', liste: [{ d: 'gel', ad: 'Geleneksel açlık' }, { d: 'kh', ad: 'Karbonhidrat yüklemesi' }] },
    metin: (p) => p.s === 'gel'
      ? '<b>Geleneksel.</b> En az 6 saat, çoğu kez daha uzun açlık; cerrahinin insülin direnci ve protein yıkımı üzerine eklenir. [[K1 s. 385]]'
      : '<b>Karbonhidrat yüklemesi.</b> Ameliyattan 2 saat öncesine dek karbonhidratlı içecek: insülin direnci ve kas kaybı azalır, aspirasyon riski artmaz. Protein koruyucu etkinin insülinin protein yıkımını önlemesine bağlı olduğu düşünülür. [[K1 s. 385]]',
    ciz: (S, t, p) => {
      const kh = p.s === 'kh', w = S.w;
      let s = S.t(20, 25, 'Gece', { c: 'k' }) + S.t(w - 20, 25, 'İndüksiyon', { a: 'end', c: 'k' });
      s += S.ok([[24, 44], [w - 24, 44]], { renk: 'muted' });
      s += D78_box(S, 20, 60, w - 40, 66, kh ? ['Karbonhidratlı içecek', '2 saat öncesine dek'] : ['Açlık ≥ 6 saat', 'Çoğu kez daha uzun'], kh ? 'ok' : 'basic');
      const bw = S.dar ? 320 : 290;
      const rows = [
        ['İnsülin direnci', kh ? 'azalır' : 'artar', kh ? 0.3 : 0.85],
        ['Kas kaybı', kh ? 'azalır' : 'artar', kh ? 0.3 : 0.85],
        ['Aspirasyon riski', kh ? 'artmaz' : 'karşılaştırma', 0.5]
      ];
      rows.forEach((r, i) => {
        const y = 156 + 54 * i, col = i === 2 ? 'basic' : kh ? 'ok' : 'crit';
        s += S.t(22, y, r[0], { c: 'k' }) + S.t(20 + bw, y, r[1], { a: 'end', c: 'k', renk: col });
        s += S.kutu(22, y + 10, bw - 4, 10, { dolgu: 'line', renk: 'line' });
        s += S.kutu(22, y + 10, (bw - 4) * r[2], 10, { dolgu: col, renk: col });
      });
      s += S.t(22, 320, ['Hiperglisemi: cerrahinin sonucu.', 'Yüklemeyle farkı burada nicelenmez.'], { c: 'k' });
      const px = S.dar ? 20 : 334, py = S.dar ? 364 : 146, pw = S.dar ? 320 : 286;
      s += D78_box(S, px, py, pw, 170, ['Hızlandırılmış iyileşme paketi', 'Nöraksiyel blok', 'Erken mobilizasyon', 'Karbonhidrat yüklemesi', '↓ Kalış süresi ve komplikasyon'], 'ok');
      s += S.t(w / 2, S.dar ? 570 : 398, kh ? 'İnsülin → protein yıkımını baskılar' : 'Göstergeler nitel karşılaştırmadır', { a: 'middle', c: 'k' });
      return s;
    }
  });

  const D78_refeedText = [
    'İnsülin çok düşüktür. Beslenmenin yeniden başlamasını izlemek için ilerleyin. [[K1 s. 385]]',
    'Plazma glukozu yükselir; pankreas β hücreleri çok büyük miktarda insülin salar. [[K1 s. 385]]',
    'İnsülin glukoz, K⁺, Mg²⁺ ve fosfatın hücreye alımını artırır; plazma düzeyleri hızla düşer. Sendrom genellikle beslenmeden birkaç gün sonra başlar. [[K1 s. 385]]',
    'Mekanizması bilinmeyen aşırı Na⁺ ve su tutulumu hücre dışı sıvıyı artırır; sol ventrikül yetersizliğini tetikleyebilir. [[K1 s. 385]]',
    'Karbonhidrat RQ’yu artırır. Kas yıkımıyla zayıflamış solunum sistemi artan CO₂ için alveoler ventilasyonu (V̇A) artırmak zorundadır. [[K1 s. 385]]',
    'Beslenme yavaş başlatılır, elektrolitler agresif düzeltilir. Risk: ≥5 gün açlık; acil cerrahi ve yoğun bakım hastaları. [[K1 s. 385]]'
  ];
  D78_VIZ.f78_yeniden = (el) => D78_steps(el, {
    baslik: 'Yeniden beslenmede hücreye kayış ve organ yükü', vb: [640, 500], vbDar: [360, 570], hareket: true, sure: 7,
    adimlar: ['Açlıkta', 'Besleme', 'Hücreye kayış', 'Sıvı ve kalp', 'Solunum', 'Tedavi'].map((ad, i) => ({
      ad, metin: D78_refeedText[i], ciz: (S, t) => {
        const w = S.w, cx = w / 2, cy = 246, radius = S.dar ? 66 : 76;
        let s = D78_box(S, 20, 10, w - 40, 66, ['Pankreas β hücresi', i === 0 ? 'İnsülin çok düşük' : i === 5 ? 'Yavaş besle · elektrolitleri düzelt' : 'Besleme → glukoz ↑ → insülin ↑'], i === 5 ? 'ok' : 'basic');
        s += D78_flow(S, [[cx, 82], [cx, 141]], i ? t : 0, 'basic', i === 0 ? 1 : 4);
        s += S.t(cx + 10, 117, 'İnsülin', { c: 'k', renk: 'basic' });
        s += S.t(20, 155, 'Plazma', { c: 'b k' });
        s += S.daire(cx, cy, radius, { renk: 'basic', dolgu: 'basic-soft' });
        s += S.t(cx, cy - 6, ['Hücre içi', i >= 2 ? 'Alım ↑' : ''], { a: 'middle', c: 'b k' });
        const items = [
          ['Glukoz', 20, 172, cx - radius, cy - 28, 'accent'],
          ['K⁺', w - 96, 172, cx + radius, cy - 28, 'crit'],
          ['Mg²⁺', 20, 294, cx - radius, cy + 28, 'crit'],
          ['Fosfat', w - 96, 294, cx + radius, cy + 28, 'crit']
        ];
        items.forEach(([label, x, y, ex, ey, color]) => {
          s += D78_box(S, x, y, 76, 38, label, color);
          if (i >= 2 && i !== 5) s += D78_flow(S, [[x + 38, y < cy ? y + 40 : y - 4], [ex, ey]], t, color);
        });
        const outcome = [
          ['Başlangıç: düşük insülin', 'Henüz besleme yok'],
          ['Besin → plazma glukozu ↑', 'İnsülin salgısı belirgin artar'],
          ['Plazmada fosfat ↓ · K⁺ ↓ · Mg²⁺ ↓', 'Hipofosfatemi · hipokalemi', 'Hipomagnezemi'],
          ['Na⁺ + su tutulumu', 'Hücre dışı sıvı ↑', 'Sol ventrikül yetersizliği riski'],
          ['Karbonhidrat → RQ ↑ → CO₂ ↑', 'Zayıf solunum kasları', 'V̇A artmalı'],
          ['Beslenmeyi yavaş başlat', 'K⁺ · Mg²⁺ · fosfatı yerine koy', 'Sıvı, kalp ve solunumu izle']
        ][i];
        s += D78_box(S, 20, 370, w - 40, 98, outcome, i === 5 ? 'ok' : i >= 2 ? 'crit' : 'basic');
        if (i === 5) s += S.ok([[35, 366], [35, 342]], { renk: 'ok' }) + S.ok([[w - 35, 366], [w - 35, 342]], { renk: 'ok' });
        if (S.dar) s += S.t(cx, 512, i === 5 ? 'Risk: ≥ 5 gün açlık' : 'Sonraki adımda mekanizmayı izleyin', { a: 'middle', c: 'k' });
        return s;
      }
    }))
  });

  const D78_systems = [
    ['sol', 'Solunum', 'Alkaloz · bradipne', 'Arınma metabolik alkaloz yapabilir; solunum merkezi bradipneyle kısmen kompanse eder.', '[[K1 s. 385]]', 0, 105],
    ['kalp', 'Kalp–damar', 'Basınç ↓ · aritmi', 'Sempatik çıkış azalır: hipotansiyon ve bradikardi. Elektrolitler EKG’yi etkiler; perioperatif aritmi ve bozuk kontraktilite görülebilir. Fazla sıvı kalp yetersizliğine yol açabilir.', '[[K1 s. 385]]', 12, 123],
    ['sin', 'Sindirim', 'Dolu mide', 'Kusma tükürük bezi hiperplazisi, diş çürüğü, özofagus darlığı ve Mallory–Weiss yırtığı yapabilir. Mide boşalması uzar: dolu mide, hızlı ardışık indüksiyon. Kitap yeniden beslenme sendromunun neredeyse kural olduğunu belirtir.', '[[K1 s. 385]]', 10, 158],
    ['bob', 'Böbrek', 'Elektrolitler · GFR ↓', 'Özellikle diüretik ve laksatif kötüye kullanımında K⁺, Mg²⁺, Ca²⁺ ve Cl⁻ bozuklukları; glomerüler filtrasyon çoğu kez bozulur.', '[[K1 s. 385–386]]', -18, 176],
    ['isi', 'Isı', 'Hipotermi', 'Az deri altı yağ ve yetersiz titreme hipotermiye yatkınlık yapar. Olağan ısıtmaya ek olarak ameliyathane ısısının artırılması gerekebilir.', '[[K1 s. 386]]', 38, 90],
    ['poz', 'Pozisyon', 'Sinir hasarı', 'Yağ yastığının kaybı periferik sinir hasarına yatkınlık yapar; dikkatli pozisyon ve destek gerekir.', '[[K1 s. 386]]', -57, 158],
    ['ilac', 'İlaç', 'Serbest ilaç ↑', 'Düşük plazma proteini serbest ilaç fraksiyonunu artırır: doz buna ve ağırlığa göre ayarlanır. Düşük BMR ve böbrek işlevi klirensi azaltabilir; hipokalemi ve hipokalsemi nöromüsküler bloğu uzatabilir.', '[[K1 s. 386]]', 58, 187]
  ];
  D78_VIZ.f78_anoreksi = (el) => {
    el.classList.add('f78-harita');
    return SEKIL.sahne(el, {
    baslik: 'Anoreksiyada sistemlere göre anestezi riskleri', vb: [640, 380], vbDar: [360, 530],
    secenek: { id: 's', ad: 'Sistem seçin', liste: D78_systems.map((a) => ({ d: a[0], ad: a[1] })) },
    metin: (p) => { const a = D78_systems.find((v) => v[0] === p.s); return '<b>' + a[1] + '.</b> ' + a[3] + ' ' + a[4]; },
    ciz: (S, t, p) => {
      const cx = S.dar ? 180 : 320;
      let s = S.daire(cx, 42, 23, { renk: 'muted', dolgu: 'basic-soft' });
      s += S.cizgi([[cx - 22, 72], [cx - 30, 134], [cx - 18, 205], [cx + 18, 205], [cx + 30, 134], [cx + 22, 72], [cx - 22, 72]], { renk: 'muted', dolgu: 'basic-soft' });
      s += S.cizgi([[cx - 22, 80], [cx - 57, 158], [cx - 58, 192]], { renk: 'muted', w: 7 });
      s += S.cizgi([[cx + 22, 80], [cx + 57, 158], [cx + 58, 192]], { renk: 'muted', w: 7 });
      s += S.cizgi([[cx - 13, 205], [cx - 24, 267]], { renk: 'muted', w: 9 });
      s += S.cizgi([[cx + 13, 205], [cx + 24, 267]], { renk: 'muted', w: 9 });
      D78_systems.forEach((a, i) => {
        const selected = a[0] === p.s, col = selected ? 'accent' : 'basic';
        s += S.daire(cx + a[5], a[6], selected ? 10 : 5, { renk: col, dolgu: selected ? 'accent' : 'paper' });
        if (!S.dar) {
          const x = i % 2 === 0 ? 12 : 424, y = 14 + Math.floor(i / 2) * 86;
          s += S.cizgi([[cx + a[5], a[6]], [i % 2 === 0 ? x + 204 : x, y + 30]], { renk: col, soluk: !selected });
          s += D78_box(S, x, y, 204, 64, [a[1], a[2]], col);
        } else {
          const x = 10 + (i % 2) * 176, y = 286 + Math.floor(i / 2) * 58;
          s += D78_box(S, x, y, 164, 50, [a[1], a[2]], col);
        }
      });
      return s;
    }
    });
  };
})();
