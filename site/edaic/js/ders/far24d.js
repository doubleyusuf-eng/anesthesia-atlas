/* Antifibrinolitikler · K3, Türkçe çalışma çevirisi, s. 385–388. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  /* 1) Traneksamik asit — 3 adımlı fibrinoliz & inhibisyon mekanizması (SEKIL.adim) */
  VIZ.a24d_txa = (el) => SEKIL.adim(el, {
    baslik: 'Traneksamik asit: Kringle mekanizması, doz ve nöbet riski',
    vb: [640, 232], vbDar: [360, 294], hareket: true,
    adimlar: [
      {
        ad: 'Kringle Hedefi',
        metin: 'Sentetik lizin türevi traneksamik asit, plazminojenin 3 disülfid bağlı Kringle alanındaki 5 lizin bağlanma bölgesine bağlanır. [[K3 s. 385]] Kringle adı, yapının benzediği İskandinav hamur işinden gelir. [[K3 s. 385]]',
        ciz: (S, t) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 72, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Plazminojen · Kringle Alanı', '3 disülfid bağı · büyük ilmek', '5 lizin bağlanma bölgesi'], lh: 21 })
              + S.ok([[W / 2, 110], [W / 2, 84]], { renk: 'accent' })
              + S.kutu(14, 110, W - 28, 72, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Traneksamik Asit (Lizin Türevi)', '1960’larda tanımlandı · Tablet / İV', 'Enflamasyonda da rolü düşünülür'], lh: 21 })
              + S.kutu(14, 198, W - 28, 76, { dolgu: 'paper', renk: 'line', yazi: ['Normalde: Plazminojen → Plazmin', 'Kringle: bağımsız protein bölgesi', 'Proteolitik aktiviteyi düzenler'], lh: 21 });
          }
          return S.kutu(16, 16, 190, 96, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Traneksamik Asit', '1960’lar · Lizin türevi', 'Tablet & İV formülasyon'], lh: 22 })
            + S.ok([[206, 64], [242, 64]], { renk: 'accent' })
            + S.akis([[206, 64], [242, 64]], t, { renk: 'accent', n: 3 })
            + S.kutu(242, 16, 382, 96, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Plazminojen Kringle Bölgesi (5 Lizin Bölgesi)', '3 disülfid bağlı ilmekler · proteolitik düzenleme', 'Plazminojen fibrinden ayrılır'], lh: 22 })
            + S.kutu(16, 130, 608, 84, { dolgu: 'paper', renk: 'line', yazi: ['Kringle bağımsız bir protein bölgesidir. Adı bir İskandinav hamur işinden gelir.', 'Traneksamik asidin enflamasyonda da rolü olabilir.'], lh: 23 });
        },
      },
      {
        ad: 'İkili Blokaj',
        metin: 'Plazminojenin aktivasyonunu kompetitif inhibe eder ve plazminojeni fibrinden ayırır; yüksek konsantrasyonda plazmini nonkompetitif bloke eder. [[K3 s. 385]]',
        ciz: (S, t) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 76, { dolgu: 'ok-soft', renk: 'ok', yazi: ['1) Kompetitif İnhibisyon', '5 lizin bölgesine bağlanır', 'Plazminojen → Plazmin önlenir'], lh: 21 })
              + S.kutu(14, 102, W - 28, 76, { dolgu: 'warn-soft', renk: 'warn', yazi: ['2) Fibrinden Ayırma + Blokaj', 'Plazminojen fibrinden ayrılır', 'Yüksek kons.: Plazmin nonkompetitif'], lh: 21 })
              + S.ok([[W / 2, 178], [W / 2, 206]], { renk: 'ok' })
              + S.kutu(14, 206, W - 28, 68, { dolgu: 'paper', renk: 'line', yazi: ['Sonuç: Pıhtı çözünmesi inhibe', 'Tromboz risk faktörü olmayanlarda'], lh: 22 });
          }
          return S.kutu(16, 18, 288, 100, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Plazminojen Üzerindeki Etki', '• Plazminojen aktivasyonu kompetitif ↓', '• Plazminojen fibrinden ayrılır'], lh: 22 })
            + S.kutu(336, 18, 288, 100, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Yüksek Konsantrasyon', '• Aktif plazmini nonkompetitif bloke', '  ederek pıhtı yıkımını engeller'], lh: 22 })
            + S.ok([[160, 118], [260, 146]], { renk: 'ok' })
            + S.ok([[480, 118], [380, 146]], { renk: 'warn' })
            + S.kutu(16, 146, 608, 68, { dolgu: 'paper', renk: 'line', yazi: ['Sonuç: Pıhtı çözünmesi (fibrinoliz) inhibe olur.', 'Yalnız tromboz risk faktörü bulunmayan hastalarda kullanılmalıdır.'], lh: 22 });
        },
      },
      {
        ad: 'Doz & Nöbet',
        metin: 'Ameliyathanede ampirik 0,5–1 g yavaş İV bolus (± 8 saatte 1 g) uygulanır; kalp cerrahisi sonrasında > 10 mg/kg dozlarda nöbet bildirilmiştir. [[K3 s. 386]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 86, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Kullanım & Ameliyathane Dozu', 'Menoraji · Majör travma · Elektif artroplasti', '0,5–1 g yavaş İV bolus ± 8 saatte ek 1 g'], lh: 21 })
              + S.kutu(14, 112, W - 28, 84, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Nöbet Riski (> 10 mg/kg, Kalp Cer.)', 'Olası: GABA reseptör inhibisyonu', 'Olası: Serebral vazokonstriksiyon → iskemi'], lh: 21 })
              + S.kutu(14, 210, W - 28, 64, { dolgu: 'paper', renk: 'line', yazi: ['Risk faktörü olmayanda protrombotik', 'potansiyel muhtemelen abartılmıştır'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 112, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Endikasyon & Ampirik Doz', 'Menoraji, majör travma, elektif artroplasti,', 'kalp ve obstetrik cerrahi', '0,5–1 g yavaş İV bolus ± 8 saatte ek 1 g'], lh: 22 })
            + S.kutu(330, 16, 294, 112, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Yüksek Doz (> 10 mg/kg) Nöbetleri', 'Kalp cerrahisi sonrası olası mekanizmalar:', '• GABA reseptör inhibisyonu', '• Serebral vazokonstriksiyon → iskemi'], lh: 22 })
            + S.kutu(16, 144, 608, 68, { dolgu: 'paper', renk: 'line', yazi: ['Protrombotik potansiyel: belirgin tromboz risk faktörü olmayanlarda', 'muhtemelen fazla vurgulanmıştır; risk faktörü varsa kullanılmamalıdır.'], lh: 22 });
        },
      },
    ],
  });

  /* 2) Aprotinin — hedefler, 2007/2012 EMA ve ACT etkileşimi */
  const aproVeri = {
    'Hedef & EMA Süreci': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Doğal proteolitik enzim inhibitörü', 'Tripsin · Plazmin · Doku kallikreini', 'Kompleksin fibrinolitik etkisi azalır']
        : ['Doğal proteolitik enzim inhibitörü: tripsin, plazmin & doku kallikreini', 'Streptokinaz–plazminojen kompleksinin fibrinolitik aktivitesi azalır'],
      k2: S => S.dar
        ? ['2007: morbidite/mortalite kaygısıyla çekildi', '2012 EMA: askıyı kaldırma önerisi', 'Yalnız yüksek kanama riskli CABG']
        : ['2007: morbidite/mortalite kaygısıyla dünya çapında kaldırıldı', '2012 EMA: yüksek kanama riskli CABG’de yarar > risk nedeniyle önerildi'],
      metin: 'Aprotinin streptokinaz–plazminojen kompleksinin fibrinolitik aktivitesini de baskılar. [[K3 s. 386]] Dünya çapındaki 2007 geri çekilmesinin ardından 2012’de EMA yüksek kanama riskli CABG için askıya almanın kaldırılmasını önermiştir. [[K3 s. 386]]',
    },
    'ACT, Anafilaksi & Kinetik': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Anafilaksi dahil aşırı duyarlılık', 'Heparinize kanda ACT’yi UZATIR', 'Heparin/protamin protokolünü uyarla']
        : ['Aşırı duyarlılık reaksiyonları (anafilaksi dahil) gelişebilir', 'Heparinize kanın ACT’sini uzatır → heparin/protamin uyarlanmalı'],
      k2: S => S.dar
        ? ['Kinetik (K3 s. 386):', 'Böbreklerde metabolize edilir', 've böbreklerden elimine edilir']
        : ['Eliminasyon kinetiği: böbrekte metabolize edilir ve böbrekten atılır'],
      metin: 'Aprotinin anafilaksi riski taşır, böbrekte metabolize edilip elimine edilir ve heparinize kanın ACT’sini uzattığından heparin/protamin protokollerinin değiştirilmesini gerektirir. [[K3 s. 386]]',
    },
  };
  VIZ.a24d_aprotinin = (el) => SEKIL.sahne(el, {
    baslik: 'Aprotinin: proteaz hedefleri, 2012 EMA önerisi ve ACT uyarısı',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Başlık', Object.keys(aproVeri)),
    metin: p => aproVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = aproVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
