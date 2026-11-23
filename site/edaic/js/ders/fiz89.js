/* Bölüm 89 · Sıcaklık düzenlenmesi — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = (window.VIZ_YARDIM && window.VIZ_YARDIM.REF) || window.REF || ((s) => s);

  /* 1) İleri besleme ve hipotalamik geri bildirim döngüsü */
  VIZ.f89_duzen = (el) => SEKIL.sahne(el, {
    vb: [640, 310], vbDar: [380, 440],
    baslik: 'İleri beslemeli ve hipotalamik negatif geri bildirim sıcaklık düzenlenmesi',
    hareket: true, sure: 6,
    secenek: {
      id: 'mod', ad: 'Düzenleme modu',
      liste: [
        { d: 'ileri', ad: 'İleri besleme' },
        { d: 'sicak', ad: 'Isı kaybı (Ön)' },
        { d: 'soguk', ad: 'Isı koruma (Arka)' },
      ],
    },
    ciz: (S, t, p) => {
      let s = '';
      const mod = p.mod;
      if (S.dar) {
        if (mod === 'ileri') {
          s += S.kutu(20, 14, 340, 62, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Dış çevre ipucu (ör. kar yağışı)', 'Çekirdek sıcaklık değişmeden önce'] });
          s += S.ok([[190, 76], [190, 118]], { renk: 'basic' });
          s += S.akis([[190, 76], [190, 118]], t, { renk: 'basic', n: 2, hiz: 0.6 });
          s += S.kutu(20, 120, 340, 62, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Merkezi sinir sistemi (MSS)', 'Çevreyi yorumlar ve öngörür'] });
          s += S.ok([[190, 182], [190, 224]], { renk: 'accent' });
          s += S.akis([[190, 182], [190, 224]], t, { renk: 'accent', n: 2, hiz: 0.6 });
          s += S.kutu(20, 226, 340, 62, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Önleyici davranış (palto giyme)', 'Vücut sıcaklığı değişikliği önlenir'] });
          s += S.kutu(20, 312, 340, 108, { dolgu: 'paper', renk: 'line', yazi: ['Çekirdek: 36,5–37,5 °C (sıkı)', 'Perifer: deri & subkutan (fark genelde 2–3 °C)', 'Aşırı koşullarda fark 20 °C\'ye kadar çıkabilir'], yc: 'k', lh: 22 });
        } else {
          const isCold = mod === 'soguk';
          const col = isCold ? 'basic' : 'warn';
          s += S.kutu(20, 14, 340, 60, { dolgu: col + '-soft', renk: col, yazi: ['TRP sıcaklık algılayıcıları', 'Periferik ve çekirdek reseptörler'] });
          s += S.ok([[190, 74], [190, 114]], { renk: col });
          s += S.akis([[190, 74], [190, 114]], t, { renk: col, n: 2, hiz: 0.55 });
          s += S.kutu(20, 116, 340, 62, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Hipotalamus (ayar noktası)', isCold ? 'Arka hipotalamus etkin' : 'Ön hipotalamus etkin'] });
          s += S.ok([[190, 178], [190, 218]], { renk: col });
          s += S.akis([[190, 178], [190, 218]], t, { renk: col, n: 2, hiz: 0.55 });
          s += S.kutu(20, 220, 340, 96, {
            dolgu: col + '-soft', renk: col,
            yazi: isCold
              ? ['Vazokonstriksiyon · Titreme (×6\'ya kadar)', 'Titremesiz termogenez (yenidoğan/süt ç.)', 'Davranış: giyinme, ısıtmayı açma']
              : ['Terleme (evaporasyon)', 'Deri vazodilatasyonu', 'Isı kaybı: radyasyon · konveksiyon · kondüksiyon'],
            yc: 'k', lh: 22,
          });
          s += S.kutu(20, 336, 340, 86, {
            dolgu: 'paper', renk: 'line',
            yazi: isCold
              ? ['Isı üretimi: BMR, egzersiz, titreme, NST', 'BMR ısı üretimi için artırılamaz', 'Titreme ısı üretimini 6 kata kadar artırır']
              : ['5 ısı kaybı yolu: radyasyon, konveksiyon,', 'evaporasyon (ter/solunum), kondüksiyon,', 'idrar ve dışkı yoluyla kayıp'],
            yc: 'k', lh: 21,
          });
        }
        return s;
      }

      /* Geniş ekran: 640 x 310 */
      if (mod === 'ileri') {
        s += S.kutu(22, 42, 172, 92, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Dış çevre ipucu', 'Ör. kar yağışı', '(sıcaklık değişmeden)'], yc: 'k', lh: 20 });
        s += S.ok([[194, 88], [234, 88]], { renk: 'basic' });
        s += S.akis([[194, 88], [234, 88]], t, { renk: 'basic', n: 2, hiz: 0.65 });
        s += S.kutu(236, 42, 170, 92, { dolgu: 'accent-soft', renk: 'accent', yazi: ['MSS yorum ve', 'öngörüsü', '(ileri besleme)'], yc: 'b', lh: 20 });
        s += S.ok([[406, 88], [446, 88]], { renk: 'accent' });
        s += S.akis([[406, 88], [446, 88]], t, { renk: 'accent', n: 2, hiz: 0.65 });
        s += S.kutu(448, 42, 170, 92, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Önleyici davranış', 'Palto giyme', 'Değişim önlenir'], yc: 'k', lh: 20 });

        s += S.kutu(22, 168, 286, 118, { dolgu: 'paper', renk: 'line', yazi: ['Çekirdek sıcaklık: 36,5–37,5 °C', 'Perifer (deri & subkutan): daha gevşek', 'Çekirdek–perifer farkı genelde 2–3 °C', '(aşırı koşullarda 20 °C\'ye kadar)'], yc: 'k', lh: 21 });
        s += S.kutu(332, 168, 286, 118, { dolgu: 'paper', renk: 'line', yazi: ['Isı kaybı: radyasyon, konveksiyon,', 'evaporasyon (ter/solunum), kondüksiyon,', 'idrar ve dışkı', 'Üretim: BMR, egzersiz, titreme, NST'], yc: 'k', lh: 21 });
      } else {
        const isCold = mod === 'soguk';
        const col = isCold ? 'basic' : 'warn';
        s += S.kutu(20, 44, 158, 92, { dolgu: col + '-soft', renk: col, yazi: ['TRP kanalları', 'Periferik ve çekirdek', 'sıcaklık algılayıcıları'], yc: 'k', lh: 20 });
        s += S.ok([[178, 90], [218, 90]], { renk: col });
        s += S.akis([[178, 90], [218, 90]], t, { renk: col, n: 3, hiz: 0.5 });

        s += S.kutu(220, 24, 176, 56, { dolgu: isCold ? 'paper' : 'warn-soft', renk: isCold ? 'line' : 'warn', soluk: isCold, yazi: ['Ön hipotalamus', 'Isı kaybı merkezi'], yc: 'k', lh: 19 });
        s += S.kutu(220, 96, 176, 56, { dolgu: isCold ? 'basic-soft' : 'paper', renk: isCold ? 'basic' : 'line', soluk: !isCold, yazi: ['Arka hipotalamus', 'Isı koruma / üretim'], yc: 'k', lh: 19 });

        const yOut = isCold ? 124 : 52;
        s += S.ok([[396, yOut], [434, yOut]], { renk: col });
        s += S.akis([[396, yOut], [434, yOut]], t, { renk: col, n: 2, hiz: 0.55 });

        s += S.kutu(436, 20, 186, 134, {
          dolgu: col + '-soft', renk: col,
          yazi: isCold
            ? ['Vazokonstriksiyon', 'Titreme (×6\'ya kadar)', 'Titremesiz termogenez', '(yenidoğan / süt ç.)', 'Davranış değişiklikleri']
            : ['Terleme', '(evaporasyon)', 'Deri vazodilatasyonu', 'Isı kaybı artar'],
          yc: 'k', lh: 21,
        });

        /* Negatif geri bildirim oku */
        s += S.ok([[528, 154], [528, 198], [98, 198], [98, 136]], { renk: 'muted', kesik: true });
        s += S.t(314, 190, 'Negatif geri bildirim: çekirdek sıcaklık ayar noktasına döner', { a: 'middle', c: 'k m' });

        s += S.kutu(20, 222, 602, 68, {
          dolgu: 'paper', renk: 'line',
          yazi: isCold
            ? ['Isı üretimini artırmak için BMR artırılamaz; titreme ise ısı üretimini 6 kata kadar artırabilir.', 'Arka hipotalamus davranış değişikliklerini de (ek giysi, merkezi ısıtmayı açma) yönetir.']
            : ['5 ısı kaybı yolu: radyasyon, konveksiyon, evaporasyon (ter ve solunum), kondüksiyon, idrar ve dışkı.', 'Ön hipotalamus terleme ve deri vazodilatasyonuyla ısı atılımını artırır.'],
          yc: 'k', lh: 22,
        });
      }
      return s;
    },
    metin: (p) => {
      if (p.mod === 'ileri') return REF('<b>İleri beslemeli kontrol.</b> MSS dış çevreyi öngörerek sıcaklık değişimi oluşmadan önlem alır (ör. kar yağarken palto giymek). Diğer iki sekmede hipotalamik geri bildirimi inceleyin. [[K1 s. 436]]');
      if (p.mod === 'sicak') return REF('<b>Ön hipotalamus (ısı kaybı).</b> TRP algılayıcılarından gelen sıcak uyarısı terleme ve deri vazodilatasyonunu başlatarak ısı kaybını artırır. [[K1 s. 436]]');
      return REF('<b>Arka hipotalamus (ısı koruma ve üretim).</b> Vazokonstriksiyon, titreme (ısı üretimini 6 kata kadar artırabilir), yenidoğan/süt çocuğunda titremesiz termogenez ve davranış değişikliklerini yönetir. [[K1 s. 436]]');
    },
  });

  /* 2) İntraoperatif hipoterminin üç fazı ve anestezi türleri */
  const fNora = (x) => (x < 0.7 ? 36.8 - 1.15 * (x / 0.7) : x < 1.8 ? 35.65 - 0.35 * ((x - 0.7) / 1.1) : 35.3);
  const fGA = (x) => (x < 0.7 ? 36.8 - 1.65 * Math.pow(x / 0.7, 0.85) : x < 2.7 ? 35.15 - 0.95 * ((x - 0.7) / 2.0) : 34.2);
  const fKomb = (x) => (x < 0.7 ? 36.8 - 1.75 * Math.pow(x / 0.7, 0.85) : 35.05 - 2.35 * ((x - 0.7) / 2.3));

  VIZ.f89_faz = (el) => SEKIL.grafik(el, {
    vb: [640, 345], vbDar: [380, 380],
    baslik: 'İntraoperatif hipotermi: zamanla çekirdek sıcaklık değişimi',
    x: { min: 0, max: 3, ad: 'Zaman (saat)', adimlar: [0, 1, 2, 3] },
    y: { min: 32, max: 37, ad: 'Çekirdek sıcaklık (°C)', adimlar: [32, 33, 34, 35, 36, 37] },
    secenek: {
      id: 'tur', ad: 'Anestezi türü',
      liste: [
        { d: 'hepsi', ad: 'Tümü' },
        { d: 'ga', ad: 'Genel anestezi (GA)' },
        { d: 'komb', ad: 'Kombine GA + nöraksiyel' },
      ],
    },
    param: [{ id: 'saat', ad: 'Ameliyat süresi', min: 0, max: 3, adim: 0.1, deger: 1.5, birim: 'saat' }],
    bolgeler: () => [
      { x1: 0, x2: 0.7, renk: 'warn-soft', ad: 'Redist.' },
      { x1: 0.7, x2: 2.7, renk: 'basic-soft', ad: 'Doğrusal' },
      { x1: 2.7, x2: 3, renk: 'ok-soft', ad: 'Plato' },
    ],
    egriler: [
      { f: (x) => fNora(x), renk: 'ok', kesik: true, w: 2.4, goster: (p) => p.tur === 'hepsi' },
      { f: (x) => fGA(x), renk: 'accent', w: 3, goster: (p) => p.tur === 'hepsi' || p.tur === 'ga' },
      { f: (x) => fKomb(x), renk: 'crit', w: 3, goster: (p) => p.tur === 'hepsi' || p.tur === 'komb' },
    ],
    dikey: (p) => [{ x: p.saat, renk: 'muted' }],
    noktalar: (p) => {
      const x = p.saat;
      if (p.tur === 'ga') return [{ x, y: fGA(x), renk: 'accent' }];
      if (p.tur === 'komb') return [{ x, y: fKomb(x), renk: 'crit' }];
      return [
        { x, y: fNora(x), renk: 'ok' },
        { x, y: fGA(x), renk: 'accent' },
        { x, y: fKomb(x), renk: 'crit' },
      ];
    },
    ek: (S, p, X, Y) => {
      let s = '';
      if (p.tur === 'hepsi') {
        s += S.t(X(2.96), Y(35.55), S.dar ? 'Nöraksiyel' : 'Yalnızca nöraksiyel blok', { a: 'end', c: 'b k', renk: 'ok' });
        s += S.t(X(2.96), Y(34.48), S.dar ? 'GA' : 'Genel anestezi (GA)', { a: 'end', c: 'b k', renk: 'accent' });
        s += S.t(X(2.96), Y(32.25), S.dar ? 'GA + nöraksiyel' : 'Kombine GA + nöraksiyel', { a: 'end', c: 'b k', renk: 'crit' });
      } else if (p.tur === 'ga') {
        s += S.t(X(2.96), Y(34.48), 'GA · plato oluşur', { a: 'end', c: 'b k', renk: 'accent' });
      } else {
        s += S.t(X(2.96), Y(32.25), 'Kombine · plato yok', { a: 'end', c: 'b k', renk: 'crit' });
      }
      return s;
    },
    okuma: (p) => {
      const h = p.saat.toFixed(1).replace('.', ',');
      const faz = p.saat <= 0.7
        ? 'Redistribüsyon fazı (30–45 dk, 1,5–2,0 °C düşüş): vazodilatör anestezik + düşen vazokonstriksiyon eşiği.'
        : p.saat <= 2.7
          ? 'Doğrusal faz (2–3 saat, 1 °C düşüş): radyasyon, konveksiyon ve evaporasyon (açık abdominal cerrahide en yüksek).'
          : 'Plato fazı: yalnız GA\'da vazokonstriksiyon ısı kaybını BMR ile dengeler; kombine GA + nöraksiyel blokta vazokonstriksiyon etkisiz olduğundan düşüş sürer.';
      return REF(`<b>${h} saat.</b> ${faz} [[K1 s. 436–437]]`);
    },
  });

  /* 3) Çekirdek sıcaklık düştükçe organ yanıtları */
  VIZ.f89_etki = (el) => SEKIL.sahne(el, {
    vb: [640, 320], vbDar: [380, 490],
    baslik: 'Çekirdek sıcaklık düşüşüne göre hipoterminin sistemik etkileri',
    param: [{ id: 'sic', ad: 'Çekirdek sıcaklık', min: 20, max: 37, adim: 0.5, deger: 34.5, birim: '°C' }],
    ciz: (S, t, p) => {
      const T = p.sic;
      const dT = Math.max(0, 37 - T);
      const bmr = Math.round(100 * Math.pow(0.94, dT));
      const bmrCol = T >= 36.5 ? 'ok' : T >= 34 ? 'warn' : 'crit';
      const kvsCol = T >= 36.5 ? 'ok' : T > 28 ? 'warn' : 'crit';
      const mssCol = T >= 36.5 ? 'ok' : T > 20.5 ? 'warn' : 'crit';
      const metCol = T >= 36.5 ? 'ok' : 'warn';

      const kvsSatir = T >= 36.5
        ? ['KVS: normal sinüs ritmi', 'KH, KB ve viskozite olağan']
        : T > 28
          ? ['KVS: KH ve KB ↓ · J dalgaları görülebilir', 'HbO₂ eğrisi sola · viskozite ↑ → LV işi ↑', 'Miyokart iskemi/enfarktüs riski']
          : ['KVS (<28 °C): ağır bradikardi (<30/dk)', 'Spontan VF riski (Titanic mekanizması)', 'J dalgaları · HbO₂ sola · viskozite ↑'];

      const mssSatir = T >= 36.5
        ? ['MSS: bilinç açık', 'Normal EEG etkinliği']
        : T > 20.5
          ? ['MSS: hafif hipotermide konfüzyon', 've irritabilite görülür', '(20 °C eşiği için sola çekin)']
          : ['MSS (20 °C): EEG beyin ölümüyle', 'uyumlu olabilir'];

      const metSatir = T >= 36.5
        ? ['Metabolik: BMR %100', 'Enzim ve glukoz alımı olağan']
        : [`Metabolik: BMR ≈ %${bmr} (−%6/°C)`, 'Hücre glukoz alımı ↓ → hiperglisemi', 'Enzimler yavaş → kas gevşetici uzar'];

      const renSatir = T >= 36.5
        ? ['Renal ve kan: normal ADH', 'Normal trombosit / pıhtılaşma']
        : ['Renal: ADH baskılanması → soğuk diürezi', 'Kan: trombosit/pıhtılaşma bozukluğu', '(kitaba göre etkiler muhtemelen küçük)'];

      let s = '';
      if (S.dar) {
        s += S.kutu(18, 12, 344, 62, { dolgu: bmrCol + '-soft', renk: bmrCol, yazi: [`Çekirdek: ${T.toFixed(1).replace('.', ',')} °C · BMR ≈ %${bmr}`, T >= 36.5 ? 'Normal çekirdek aralığı (36,5–37,5 °C)' : T >= 34 ? 'Hafif hipotermi (34,0–36,5 °C)' : T > 28 ? 'Derinleşen hipotermi (<34 °C)' : 'Kritik eşik altı (≤28 °C)'], yc: 'b', lh: 22 });
        s += S.kutu(18, 88, 344, 92, { dolgu: kvsCol + '-soft', renk: kvsCol, yazi: kvsSatir, yc: 'k', lh: 22 });
        s += S.kutu(18, 192, 344, 86, { dolgu: mssCol + '-soft', renk: mssCol, yazi: mssSatir, yc: 'k', lh: 22 });
        s += S.kutu(18, 290, 344, 88, { dolgu: metCol + '-soft', renk: metCol, yazi: metSatir, yc: 'k', lh: 22 });
        s += S.kutu(18, 390, 344, 88, { dolgu: 'paper', renk: 'line', yazi: renSatir, yc: 'k', lh: 22 });
        return s;
      }

      /* Geniş ekran: 640 x 320 */
      s += S.kutu(20, 14, 600, 56, {
        dolgu: bmrCol + '-soft', renk: bmrCol,
        yazi: [
          `Çekirdek sıcaklık: ${T.toFixed(1).replace('.', ',')} °C  ·  Tahmini BMR: ≈ %${bmr} (−%6 / °C)`,
          T >= 36.5 ? 'Normal aralık (36,5–37,5 °C)' : T >= 34 ? 'Hafif hipotermi (34,0–36,5 °C)' : T > 28 ? 'Derinleşen hipotermi (<34 °C)' : T > 20.5 ? 'Kritik eşik altı (≤28 °C: ağır bradikardi & spontan VF)' : '20 °C eşiği: EEG beyin ölümüyle uyumlu olabilir',
        ],
        yc: 'b', lh: 21,
      });
      s += S.kutu(20, 86, 292, 102, { dolgu: kvsCol + '-soft', renk: kvsCol, yazi: kvsSatir, yc: 'k', lh: 22 });
      s += S.kutu(328, 86, 292, 102, { dolgu: mssCol + '-soft', renk: mssCol, yazi: mssSatir, yc: 'k', lh: 22 });
      s += S.kutu(20, 202, 292, 102, { dolgu: metCol + '-soft', renk: metCol, yazi: metSatir, yc: 'k', lh: 22 });
      s += S.kutu(328, 202, 292, 102, { dolgu: 'paper', renk: 'line', yazi: renSatir, yc: 'k', lh: 22 });
      return s;
    },
    metin: (p) => {
      const T = p.sic;
      const tStr = T.toFixed(1).replace('.', ',');
      if (T >= 36.5) return REF(`<b>${tStr} °C (Normal).</b> Çekirdek sıcaklık 36,5–37,5 °C aralığında; kaydırıcıyı sola çekerek 34 °C, 28 °C ve 20 °C eşiklerindeki sistemik değişiklikleri izleyin. [[K1 s. 436–437]]`);
      if (T >= 34) return REF(`<b>${tStr} °C (Hafif hipotermi).</b> Konfüzyon/irritabilite, BMR düşüşü (%6/°C), hiperglisemi, enzim yavaşlaması (kas gevşetici uzar), soğuk diürezi, HbO₂ sola kayması ve viskozite artışı görülür. [[K1 s. 437–438]]`);
      if (T > 28) return REF(`<b>${tStr} °C.</b> Kalp hızı ve kan basıncı düşer, aritmiler sıklaşır, EKG'de J dalgaları görülebilir; BMR her 1 °C'de %6 azalır. 28 °C'nin altına inin. [[K1 s. 437]]`);
      if (T > 20.5) return REF(`<b>${tStr} °C (≤28 °C eşiği).</b> Ağır bradikardi (&lt;30 atım/dk) çok yaygındır ve spontan ventriküler fibrilasyon (VF) gelişebilir. [[K1 s. 437]]`);
      return REF(`<b>${tStr} °C (20 °C eşiği).</b> Bu çekirdek sıcaklıkta elektroensefalogram (EEG) beyin ölümüyle uyumlu olabilir. [[K1 s. 437]]`);
    },
  });

  /* 4) Klinik önem: perioperatif sonuçlar ve önleme */
  VIZ.f89_klinik = (el) => SEKIL.adim(el, {
    vb: [640, 270], vbDar: [380, 360],
    baslik: 'Hafif perioperatif hipoterminin klinik sonuçları ve önleme yöntemleri',
    hareket: true, oto: false,
    adimlar: [
      {
        ad: 'Kardiyak risk',
        metin: REF('Hafif perioperatif hipotermi miyokart iskemisi, enfarktüsü ve aritmilerle ilişkilidir. [[K1 s. 438]]'),
        ciz: (S) => {
          const cx = S.w / 2;
          if (S.dar) {
            return S.kutu(20, 20, 340, 74, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Hafif perioperatif hipotermi', '(34,0–36,5 °C)'], lh: 22 })
              + S.ok([[cx, 94], [cx, 134]], { renk: 'crit' })
              + S.kutu(20, 136, 340, 108, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Miyokart iskemisi ve enfarktüsü', 'Aritmiler', 'Viskozite ↑ · HbO₂ sola · LV işi ↑'], yc: 'k', lh: 24 })
              + S.rozet(cx, 290, 'Perioperatif kardiyak morbidite ↑', { dolgu: 'crit-soft', renk: 'crit', w: 280 });
          }
          return S.kutu(28, 72, 196, 108, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Hafif perioperatif', 'hipotermi', '(34,0–36,5 °C)'], lh: 22 })
            + S.ok([[224, 126], [278, 126]], { renk: 'crit' })
            + S.kutu(280, 52, 332, 148, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Miyokart iskemisi ve enfarktüsü', 'Aritmiler', 'HbO₂ eğrisi sola · viskozite ↑ → LV işi ↑'], yc: 'k', lh: 26 });
        },
      },
      {
        ad: 'Kanama & enfeksiyon',
        metin: REF('İntraoperatif kan kaybı ile transfüzyon gereksinimi ve postoperatif yara enfeksiyonu sıklığı artar. [[K1 s. 438]]'),
        ciz: (S) => {
          if (S.dar) {
            return S.kutu(20, 24, 340, 136, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Artmış intraoperatif kan kaybı', 've transfüzyon gereksinimi', '(trombosit/pıhtılaşma işlev bozukluğu)'], yc: 'k', lh: 24 })
              + S.kutu(20, 184, 340, 136, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Postoperatif yara enfeksiyonu', 'sıklığında artış', '(perioperatif hipotermi sonucu)'], yc: 'k', lh: 24 });
          }
          return S.kutu(28, 56, 276, 152, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Artmış intraoperatif kan kaybı', 'Artmış transfüzyon gereksinimi'], lh: 26 })
            + S.kutu(336, 56, 276, 152, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Postoperatif yara enfeksiyonu', 'sıklığında artış'], lh: 26 });
        },
      },
      {
        ad: 'Derlenme & yatış',
        metin: REF('Postoperatif derlenme ve hastanede kalış süresi uzar; yavaşlayan ilaç metabolizması ve uzayan kas gevşetici etkisi buna katkıda bulunabilir. [[K1 s. 437–438]]'),
        ciz: (S) => {
          const cx = S.w / 2;
          if (S.dar) {
            return S.kutu(20, 24, 340, 86, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Enzimatik reaksiyonlar yavaşlar', 'Kas gevşetici etkisi uzar'], yc: 'k', lh: 24 })
              + S.ok([[cx, 110], [cx, 152]], { renk: 'warn' })
              + S.kutu(20, 154, 340, 108, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Uzamış postoperatif derlenme', 'Uzamış hastanede kalış süresi'], lh: 26 });
          }
          return S.kutu(32, 68, 250, 128, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Yavaşlayan ilaç metabolizması', 'Uzayan kas gevşetici etkisi'], yc: 'k', lh: 24 })
            + S.ok([[282, 132], [344, 132]], { renk: 'warn' })
            + S.kutu(346, 68, 262, 128, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Uzamış postoperatif derlenme', 'Uzamış hastanede kalış'], lh: 26 });
        },
      },
      {
        ad: 'Önleme önlemleri',
        metin: REF('İntraoperatif hipotermiyi önlemede üflemeli sıcak hava cihazları, ısıtılmış yataklar, IV sıvı/kan ısıtma ve inspire gaz nemlendirme kullanılır. [[K1 s. 438]]'),
        ciz: (S, t) => {
          const cx = S.w / 2;
          if (S.dar) {
            return S.kutu(20, 14, 340, 68, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Aktif yüzey ısıtma', 'Üflemeli sıcak hava + ısıtılmış yatak'], yc: 'k', lh: 22 })
              + S.kutu(20, 96, 340, 62, { dolgu: 'ok-soft', renk: 'ok', yazi: ['İntravenöz sıvıların ve kanın ısıtılması'], yc: 'k' })
              + S.kutu(20, 172, 340, 62, { dolgu: 'ok-soft', renk: 'ok', yazi: ['İnspire edilen gazların nemlendirilmesi'], yc: 'k' })
              + S.ok([[cx, 234], [cx, 276]], { renk: 'ok' })
              + S.akis([[cx, 234], [cx, 276]], t, { renk: 'ok', n: 2, hiz: 0.6 })
              + S.kutu(40, 278, 300, 60, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Normotermi korunur', '36,5–37,5 °C'], lh: 22 });
          }
          return S.kutu(22, 24, 274, 62, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Aktif ısıtma: üflemeli sıcak hava', 'cihazları ve ısıtılmış yataklar'], yc: 'k', lh: 20 })
            + S.kutu(22, 102, 274, 62, { dolgu: 'ok-soft', renk: 'ok', yazi: ['İntravenöz sıvıların ve', 'kan ürünlerinin ısıtılması'], yc: 'k', lh: 20 })
            + S.kutu(22, 180, 274, 62, { dolgu: 'ok-soft', renk: 'ok', yazi: ['İnspire edilen gazların', 'nemlendirilmesi'], yc: 'k', lh: 20 })
            + S.ok([[296, 55], [386, 126]], { renk: 'ok' })
            + S.ok([[296, 133], [386, 133]], { renk: 'ok' })
            + S.ok([[296, 211], [386, 140]], { renk: 'ok' })
            + S.akis([[296, 55], [386, 126]], t, { renk: 'ok', n: 2, hiz: 0.5 })
            + S.akis([[296, 133], [386, 133]], t, { renk: 'ok', n: 2, hiz: 0.5 })
            + S.akis([[296, 211], [386, 140]], t, { renk: 'ok', n: 2, hiz: 0.5 })
            + S.kutu(388, 76, 228, 114, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Normotermi korunur', 'Çekirdek 36,5–37,5 °C', 'Komplikasyonlar azalır'], lh: 23 });
        },
      },
    ],
  });
})();
