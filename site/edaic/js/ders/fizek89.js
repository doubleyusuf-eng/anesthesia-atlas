/* Ek ders 89 · Termogenez, termonötral bölge ve hipotermiye yanıtlar — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = (window.VIZ_YARDIM && window.VIZ_YARDIM.REF) || window.REF || ((s) => s);

  /* 1) Termonötral bölge: ortam sıcaklığına göre metabolizma hızı ve ısı kaybı (K2 Şekil 12.24) */
  const fMet = (x) => (x < 27 ? 38 + (27 - x) * 4.4 : x <= 31 ? 38 : 38 + Math.pow(x - 31, 1.35) * 1.4);
  const fDuy = (x) => Math.max(0, 76 - (x - 15) * 3.8);
  const fEvap = (x) => (x <= 29 ? 10 : 10 + Math.pow(x - 29, 1.55) * 1.85);

  VIZ.fek89_tnz = (el) => SEKIL.grafik(el, {
    vb: [640, 345], vbDar: [380, 385],
    baslik: 'Ortam sıcaklığına göre metabolizma hızı, duyulur ısı kaybı ve buharlaşma',
    x: { min: 15, max: 40, ad: 'Ortam sıcaklığı (°C)', adimlar: [15, 20, 27, 31, 35, 40] },
    y: { min: 0, max: 100, ad: 'Göreli hız (nitel)', adimlar: [0, 50, 100] },
    param: [{ id: 'ort', ad: 'Ortam sıcaklığı', min: 15, max: 40, adim: 1, deger: 28, birim: '°C' }],
    bolgeler: () => [
      { x1: 27, x2: 31, renk: 'ok-soft', ad: 'TNZ' },
    ],
    egriler: [
      { f: fMet, renk: 'accent', w: 3 },
      { f: fDuy, renk: 'basic', kesik: true, w: 2.5 },
      { f: fEvap, renk: 'crit', w: 2.5 },
    ],
    dikey: (p) => [
      { x: 27, renk: 'ok' },
      { x: p.ort, renk: 'muted' },
    ],
    noktalar: (p) => [
      { x: p.ort, y: fMet(p.ort), renk: 'accent' },
      { x: p.ort, y: fDuy(p.ort), renk: 'basic' },
      { x: p.ort, y: fEvap(p.ort), renk: 'crit' },
    ],
    ek: (S, p, X, Y) => {
      let s = '';
      s += S.t(X(15.6), Y(94), S.dar ? 'Metabolizma' : 'Metabolizma hızı', { c: 'b k', renk: 'accent' });
      s += S.t(X(15.6), Y(35), S.dar ? ['Işınım / konv.', '/ iletim'] : 'Işınım, konveksiyon, iletim', { c: 'b k', renk: 'basic', lh: 15 });
      s += S.t(X(39.4), Y(94), 'Buharlaşma', { a: 'end', c: 'b k', renk: 'crit' });
      s += S.t(X(26.5), Y(4), S.dar ? 'Kritik' : 'Kritik (27 °C)', { a: 'end', c: 'k', renk: 'ok' });
      return s;
    },
    okuma: (p) => {
      const T = p.ort;
      if (T < 27) return REF(`<b>${T} °C (Kritik sıcaklığın altı).</b> Vazokonstriksiyon tek başına yetmez; soğuk reseptörleri (Aδ) uyarılır, metabolik ısı üretimi (titreme/NST) dik biçimde yükselir. [[K2 s. 384–385]]`);
      if (T <= 31) return REF(`<b>${T} °C (Termonötral bölge: 27–31 °C, giysisiz 70 kg erkek).</b> Metabolizma hızı en düşük düzeydedir; sıcaklık yalnız deri kan akımıyla (1–150 mL/dk/100 g) korunur. [[K2 s. 384–385]]`);
      if (T <= 35) return REF(`<b>${T} °C (TNZ üstü).</b> Sıcak reseptörleri (C lifleri) ve ön hipotalamus etkinleşir; AV şant vazodilatasyonu (bradikininle güçlenir) ve buharlaşma kaybı hızla artar. [[K2 s. 384–385]]`);
      return REF(`<b>${T} °C (Yüksek ortam sıcaklığı).</b> Ortam sıcaklığı deri sıcaklığını aştığında çevreden ısı kazanılır; buharlaşma tek etkin ısı kaybı yolu hâline gelir. [[K2 s. 384–385]]`);
    },
  });

  /* 2) Titreme frekans bileşenleri ve kahverengi yağ NST döngüsü (K2 Şekil 12.25) */
  VIZ.fek89_termo = (el) => SEKIL.sahne(el, {
    vb: [640, 315], vbDar: [380, 455],
    baslik: 'Titreme termogenezi ve kahverengi yağda titremesiz termogenez',
    hareket: true, sure: 6,
    secenek: {
      id: 'tur', ad: 'Termogenez tipi',
      liste: [
        { d: 'titreme', ad: 'Titreme (erişkin)' },
        { d: 'bat', ad: 'Kahverengi yağ (yenidoğan)' },
        { d: 'lipoliz', ad: 'Erişkin NST' },
      ],
    },
    ciz: (S, t, p) => {
      let s = '';
      if (p.tur === 'titreme') {
        /* 3 frekans katmanı: hızlı 250 Hz, yavaş 4-8/dk, şiddetli 10-20 Hz rigor */
        if (S.dar) {
          s += S.kutu(18, 14, 344, 62, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Hipotalamus → istemsiz kas kasılması', 'Erişkin metabolizma hızı +%100\'e kadar'], lh: 21 });
          s += S.kutu(18, 92, 344, 96, { dolgu: 'basic-soft', renk: 'basic', yazi: ['1 · Hızlı tremorlar (≤250 Hz)', 'Senkronize olmayan kas etkinliği', 'Periferik mekanizmayı düşündürür'], yc: 'k', lh: 22 });
          s += S.kutu(18, 202, 344, 96, { dolgu: 'warn-soft', renk: 'warn', yazi: ['2 · Yavaş senkron dalgalar (4–8/dk)', 'Hızlı tremorların üstüne biner, artıp azalır', 'Merkezî kontrolü düşündürür'], yc: 'k', lh: 22 });
          s += S.kutu(18, 312, 344, 96, { dolgu: 'crit-soft', renk: 'crit', yazi: ['3 · Döngüsel kas rigorları (10–20 Hz)', 'Titreme şiddetlendikçe ortaya çıkar', 'Yüksek mekanik ısı üretimi'], yc: 'k', lh: 22 });
          return s;
        }
        s += S.kutu(20, 14, 600, 52, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Titreme termogenezi · Hipotalamik kontrol · Erişkinde metabolizma hızını %100 artırabilir'] });
        /* Şematik dalga bandı */
        const pts = [];
        for (let k = 0; k <= 120; k++) {
          const x = 36 + (k / 120) * 568;
          const env = 0.5 + 0.5 * Math.sin((k / 120) * Math.PI * 4 - t * 2.2);
          const y = 114 + Math.sin(k * 1.9 + t * 14) * (6 + 18 * env);
          pts.push([x, y]);
        }
        s += S.kutu(20, 78, 600, 72, { dolgu: 'paper', renk: 'line' });
        s += S.cizgi(pts, { renk: 'accent', w: 2 });
        s += S.t(320, 144, 'Artıp azalan yavaş zarf (4–8/dk) + hızlı tremor (≤250 Hz) — şematik', { a: 'middle', c: 'k m' });

        s += S.kutu(20, 166, 190, 130, { dolgu: 'basic-soft', renk: 'basic', yazi: ['≤250 Hz tremor', 'Senkronize değil', 'Periferik mekanizma'], yc: 'k', lh: 24 });
        s += S.kutu(225, 166, 190, 130, { dolgu: 'warn-soft', renk: 'warn', yazi: ['4–8 döngü/dk', 'Yavaş senkron dalga', 'Merkezî kontrol'], yc: 'k', lh: 24 });
        s += S.kutu(430, 166, 190, 130, { dolgu: 'crit-soft', renk: 'crit', yazi: ['10–20 Hz rigor', 'Şiddetli titremede', 'Döngüsel kasılma'], yc: 'k', lh: 24 });
        return s;
      }

      if (p.tur === 'bat') {
        if (S.dar) {
          s += S.kutu(18, 12, 344, 54, { dolgu: 'warn-soft', renk: 'warn', yazi: ['β₃-sempatik uyarı → eşleşmesiz oksidatif fosf.', 'Yenidoğanda metabolizma ×2 (mekanik iş yok)'], yc: 'k', lh: 20 });
          s += S.kutu(34, 80, 312, 46, { dolgu: 'paper', renk: 'accent', yazi: ['Trigliseritler (kahverengi yağ)'] });
          s += S.ok([[190, 126], [190, 156]], { renk: 'accent' });
          s += S.akis([[190, 126], [190, 156]], t, { renk: 'accent', n: 2, hiz: 0.6 });
          s += S.kutu(34, 158, 312, 48, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Gliserol + Serbest yağ asitleri'] });
          s += S.ok([[190, 206], [190, 236]], { renk: 'basic' });
          s += S.akis([[190, 206], [190, 236]], t, { renk: 'basic', n: 2, hiz: 0.6 });
          s += S.kutu(34, 238, 312, 54, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Yağ asidi açil-KoA (yeniden esterlenme)', 'Glukoz kaynaklı gliserol KoA\'nın yerini alır'], yc: 'k', lh: 20 });
          s += S.ok([[190, 292], [190, 324]], { renk: 'crit' });
          s += S.akis([[190, 292], [190, 324]], t, { renk: 'crit', n: 2, hiz: 0.6 });
          s += S.kutu(18, 326, 344, 62, { dolgu: 'crit-soft', renk: 'crit', yazi: ['1 ATP → ADP + P + ISI (her döngüde)', 'Küçük kesir okside olur → O₂ tüketimi ↑'], yc: 'k', lh: 21 });
          s += S.kutu(18, 400, 344, 44, { dolgu: 'paper', renk: 'line', yazi: ['Yer: interskapular, perinefrik, intraabd. damar'], yc: 'k' });
          return s;
        }
        s += S.kutu(20, 14, 600, 48, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Kahverengi yağ (yenidoğan): β₃-sempatik → eşleşmesiz oksidatif fosforilasyon · Metabolizma ×2'] });
        s += S.kutu(26, 86, 162, 60, { dolgu: 'paper', renk: 'accent', yazi: ['Trigliseritler', '(hidroliz)'], lh: 21 });
        s += S.ok([[188, 116], [234, 116]], { renk: 'accent' });
        s += S.akis([[188, 116], [234, 116]], t, { renk: 'accent', n: 2, hiz: 0.55 });
        s += S.kutu(236, 86, 174, 60, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Serbest yağ asitleri', '+ Gliserol'], lh: 21 });
        s += S.ok([[410, 116], [456, 116]], { renk: 'basic' });
        s += S.akis([[410, 116], [456, 116]], t, { renk: 'basic', n: 2, hiz: 0.55 });
        s += S.kutu(458, 86, 162, 60, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Yağ asidi açil-KoA', '(glukoz gliserolü)'], yc: 'k', lh: 21 });
        /* Geri dönüş döngüsü + ATP -> ISI */
        s += S.ok([[539, 146], [539, 198], [107, 198], [107, 146]], { renk: 'crit' });
        s += S.akis([[539, 146], [539, 198], [107, 198], [107, 146]], t, { renk: 'crit', n: 4, hiz: 0.35 });
        s += S.rozet(323, 198, 'Her döngüde 1 ATP → ADP + P + ISI', { dolgu: 'crit-soft', renk: 'crit', w: 290 });

        s += S.kutu(20, 232, 290, 68, { dolgu: 'paper', renk: 'line', yazi: ['Yer: interskapular, perinefrik yağ ve', 'intraabdominal damarlar çevresi', '(bol mitokondri, çok damarlı, adrenerjik)'], yc: 'k', lh: 19 });
        s += S.kutu(330, 232, 290, 68, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Küçük bir yağ asidi kesri yeniden', 'esterlenmek yerine okside olur', '→ O₂ tüketimi artar'], yc: 'k', lh: 19 });
        return s;
      }

      /* Erişkin NST / lipoliz */
      if (S.dar) {
        s += S.kutu(18, 22, 344, 68, { dolgu: 'warn-soft', renk: 'warn', yazi: ['β₃-sempatik etkinlik', 'Yağ dokusunda lipoliz uyarılır'], lh: 22 });
        s += S.ok([[190, 90], [190, 134]], { renk: 'warn' });
        s += S.akis([[190, 90], [190, 134]], t, { renk: 'warn', n: 2, hiz: 0.6 });
        s += S.kutu(18, 136, 344, 68, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Gliserol + Serbest yağ asitleri (SYA)', 'Dolaşıma salınır'], lh: 22 });
        s += S.ok([[190, 204], [190, 248]], { renk: 'accent' });
        s += S.akis([[190, 204], [190, 248]], t, { renk: 'accent', n: 2, hiz: 0.6 });
        s += S.kutu(18, 250, 344, 80, { dolgu: 'accent-soft', renk: 'accent', yazi: ['İskelet kası ve miyokart', 'SYA enerji kaynağı olarak kullanılır', 'Mekanik iş olmadan ısı üretimi'], yc: 'k', lh: 22 });
        return s;
      }
      s += S.kutu(24, 96, 170, 92, { dolgu: 'warn-soft', renk: 'warn', yazi: ['β₃-sempatik', 'yağ dokusu', 'lipolizi'], lh: 22 });
      s += S.ok([[194, 142], [238, 142]], { renk: 'warn' });
      s += S.akis([[194, 142], [238, 142]], t, { renk: 'warn', n: 2, hiz: 0.6 });
      s += S.kutu(240, 96, 168, 92, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Gliserol ve', 'serbest yağ', 'asitleri'], lh: 22 });
      s += S.ok([[408, 142], [452, 142]], { renk: 'accent' });
      s += S.akis([[408, 142], [452, 142]], t, { renk: 'accent', n: 2, hiz: 0.6 });
      s += S.kutu(454, 86, 164, 112, { dolgu: 'accent-soft', renk: 'accent', yazi: ['İskelet kası ve', 'miyokartta', 'enerji kaynağı', '(mekanik işsiz ısı)'], yc: 'k', lh: 22 });
      return s;
    },
    metin: (p) => {
      if (p.tur === 'titreme') return REF('<b>Titreme (erişkin).</b> Metabolizma hızını %100 artırabilir: 250 Hz\'e kadar hızlı senkronize olmayan tremor (periferik), 4–8/dk yavaş senkron dalgalar (merkezî) ve şiddetli titremede 10–20 Hz rigorlar. [[K2 s. 384]]');
      if (p.tur === 'bat') return REF('<b>Kahverengi yağ (yenidoğan).</b> β₃-sempatik uyarı oksidatif fosforilasyonu eşleşmesizleştirir; her yağ asidi yeniden esterlenme–yıkım döngüsünde 1 ATP ısıya dönüşür, küçük bir kesir okside olarak O₂ tüketimini artırır. [[K2 s. 384–385]]');
      return REF('<b>Erişkin titremesiz termogenezi.</b> Yağ dokusu lipolizinden salınan serbest yağ asitleri iskelet kası ve miyokart için enerji kaynağı sağlar; β₃-sempatik etkinlik mekanik iş olmadan ısı üretimini artırır. [[K2 s. 384]]');
    },
  });

  /* 3) Anestezide genişleyen eşikler arası aralık ve poikilotermik bölge */
  VIZ.fek89_esik = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 410],
    baslik: 'Uyanık ve genel anestezi altında termoregülasyon eşikleri ve poikilotermik aralık',
    secenek: {
      id: 'durum', ad: 'Durum',
      liste: [
        { d: 'ga', ad: 'Genel anestezi' },
        { d: 'uyanik', ad: 'Uyanık (bazal)' },
      ],
    },
    param: [{ id: 'sic', ad: 'Çekirdek sıcaklık', min: 32, max: 39, adim: 0.2, deger: 35.4, birim: '°C' }],
    ciz: (S, t, p) => {
      const T = p.sic;
      const isGA = p.durum === 'ga';
      const coldThr = isGA ? 34.3 : 36.8;
      const warmThr = isGA ? 38.5 : 37.2;
      const minT = 32, maxT = 39;
      const bx = S.dar ? 22 : 40, bw = S.w - bx * 2;
      const mapX = (v) => bx + ((S.clamp(v, minT, maxT) - minT) / (maxT - minT)) * bw;
      const yBar = S.dar ? 102 : 96;

      let s = '';
      /* Üst başlık kutusu */
      const inPoik = T > coldThr && T < warmThr;
      const col = T < 35 ? 'crit' : inPoik ? (isGA ? 'warn' : 'ok') : (T <= coldThr ? 'basic' : 'crit');
      const durumText = T <= coldThr
        ? (isGA ? (S.dar ? 'Soğuk altı → vazokonstriksiyon / NST' : 'Soğuk eşiğinin altı → vazokonstriksiyon / NST (ajan ve doza bağımlı)') : 'Soğuk eşiğinin altı → vazokonstriksiyon ve titreme')
        : T >= warmThr
          ? 'Sıcak eşiğinin üstü → terleme ve deri vazodilatasyonu'
          : (isGA ? (S.dar ? 'Poikilotermik aralık (etkin yanıt yok)' : 'Genişlemiş eşikler arası aralık → POİKİLOTERMİK (etkin yanıt yok)') : 'Dar normal aralık → ısı dengede');

      s += S.kutu(bx, 14, bw, 60, {
        dolgu: col + '-soft', renk: col,
        yazi: [`Çekirdek: ${T.toFixed(1).replace('.', ',')} °C ${T < 35 ? '· HİPOTERMİ (<35 °C)' : ''}`, durumText],
        yc: 'k', lh: 22,
      });

      /* Sıcaklık ölçeği çubuğu */
      const xC = mapX(coldThr), xW = mapX(warmThr), x35 = mapX(35), xCur = mapX(T);
      s += S.kutu(bx, yBar, xC - bx, 26, { dolgu: 'basic-soft', renk: 'basic', r: 4 });
      s += S.kutu(xC, yBar, xW - xC, 26, { dolgu: isGA ? 'warn-soft' : 'ok-soft', renk: isGA ? 'warn' : 'ok', r: 2 });
      s += S.kutu(xW, yBar, bx + bw - xW, 26, { dolgu: 'crit-soft', renk: 'crit', r: 4 });

      /* 35 °C klinik hipotermi çizgisi */
      s += S.cizgi([[x35, yBar - 8], [x35, yBar + 34]], { renk: 'crit', w: 1.8, kesik: true });
      s += S.t(x35, yBar + 49, '35 °C', { a: 'middle', c: 'b k', renk: 'crit' });

      /* Eşik etiketleri (çubuğun altında, işaretçiyle çakışmaz) */
      s += S.t((bx + xC) / 2, yBar + 49, 'Soğuk', { a: 'middle', c: 'b k', renk: 'basic' });
      s += S.t(isGA ? (x35 + xW) / 2 + 12 : (xC + xW) / 2, yBar + 49, isGA ? 'Poikilotermik' : 'Dar', { a: 'middle', c: 'b k', renk: isGA ? 'warn' : 'ok' });
      if (bx + bw - xW > 42) s += S.t((xW + bx + bw) / 2, yBar + 49, 'Sıcak', { a: 'middle', c: 'b k', renk: 'crit' });

      /* Ölçek uçları ve işaretçi */
      [32, 34, 36, 37, 38, 39].forEach((v) => {
        s += S.t(mapX(v), yBar - 10, `${v}°`, { a: 'middle', c: 'k m' });
      });
      s += S.cizgi([[xCur, yBar - 6], [xCur, yBar + 32]], { renk: 'ink', w: 3 });
      s += S.daire(xCur, yBar + 13, 5.5, { dolgu: 'ink', renk: 'paper', w: 2 });

      /* Alt bilgi kutuları */
      if (S.dar) {
        s += S.kutu(bx, 186, bw, 94, {
          dolgu: 'warn-soft', renk: 'warn',
          yazi: ['Genel anestezi eşik kayması (K2):', 'Soğuk eşiği ≈ 2,5 °C düşer', 'Sıcak eşiği ≈ 1,3 °C yükselir'],
          yc: 'k', lh: 22,
        });
        s += S.kutu(bx, 294, bw, 102, {
          dolgu: 'paper', renk: 'line',
          yazi: ['Anestezili, paralize, hipotermik hastada', 'kalan tek yanıtlar:', '1) Vazokonstriksiyon (ajan/doz bağımlı)', '2) Titremesiz termogenez (süt ç. anlamlı)'],
          yc: 'k', lh: 21,
        });
      } else {
        s += S.kutu(bx, 178, 268, 94, {
          dolgu: 'warn-soft', renk: 'warn',
          yazi: ['Genel anestezi eşik kayması (K2):', 'Soğuk eşiği ≈ 2,5 °C düşer', 'Sıcak eşiği ≈ 1,3 °C yükselir'],
          yc: 'k', lh: 22,
        });
        s += S.kutu(328, 178, 272, 94, {
          dolgu: 'paper', renk: 'line',
          yazi: ['Paralize + hipotermik hastada kalanlar:', '• Vazokonstriksiyon (ajan/doz bağımlı)', '• Titremesiz termogenez (süt ç. anlamlı)'],
          yc: 'k', lh: 22,
        });
      }
      return s;
    },
    metin: (p) => {
      const T = p.sic.toFixed(1).replace('.', ',');
      if (p.durum === 'ga') {
        return REF(`<b>Genel anestezi · ${T} °C.</b> Soğuk eşiği ≈2,5 °C düşer, sıcak eşiği ≈1,3 °C yükselir; bu genişlemiş aralıkta hasta poikilotermiktir ve sıcaklık üretim–kayıp farkına göre pasif değişir. [[K2 s. 385]]`);
      }
      return REF(`<b>Uyanık · ${T} °C.</b> Eşik aralığı dardır; soğukta davranışsal yanıtlar, vazokonstriksiyon ve titreme hızla devreye girer. Klinik hipotermi tanımı &lt;35 °C'dir. [[K2 s. 385]]`);
    },
  });
})();
