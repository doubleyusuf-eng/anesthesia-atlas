/* Antidepresanlar · K3, Türkçe çalışma çevirisi, s. 284–289. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortada = { a: 'middle', c: 'b' };
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const sinapsVeri = {
    TCA: {
      etiket: 'Alım 1 blokajı (NA + 5-HT)', renk: 'accent',
      alt: ['+ Muskarinik, histaminerjik, α blokajı', 'Klinik antidepresan etki ~2 hafta'],
      metin: 'TCA’lar NA ve 5-HT nöronal alımını (alım 1) kompetitif bloke ederek sinaptik düzeyi artırır; etki 2 haftayı bulabilir. [[K3 s. 285]]',
    },
    SSRI: {
      etiket: 'Selektif 5-HT geri alım blokajı', renk: 'basic',
      alt: ['Daha az antikolinerjik / sedatif', 'Venlafaksin: NA + 5-HT (az dopamin)'],
      metin: 'SSRI’lar 5-HT geri alımını selektif inhibe eder; daha az sedatif ve antikolinerjiktir. [[K3 s. 286]]',
    },
    MAOI: {
      etiket: 'Presinaptik MAO inhibisyonu', renk: 'warn',
      alt: ['MAO-A: 5-HT, katekolaminler', 'MAO-B: tiramin, feniletilamin'],
      metin: 'MAO inhibisyonuyla amin nörotransmiterlerin deaminasyonu azalır ve sinaptik düzeyleri yükselir. [[K3 s. 287]]',
    },
    Mianserin: {
      etiket: 'Presinaptik α₂ reseptör blokajı', renk: 'ok',
      alt: ['Geri alımı bloke etmez', 'Negatif geri bildirim ↓ → salınım ↑'],
      metin: 'Mianserin presinaptik α₂-adrenoseptörleri bloke ederek negatif geri bildirimi azaltır ve sinaptik transmiteri artırır. [[K3 s. 288]]',
    },
  };
  VIZ.a18b_sinaps = (el) => SEKIL.sahne(el, {
    baslik: 'Antidepresan gruplarının sinaptik etki yerleri',
    vb: [640, 224], vbDar: [360, 278],
    secenek: secim('İlaç grubu', Object.keys(sinapsVeri)),
    metin: p => sinapsVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = sinapsVeri[secili], W = S.w;
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 72, { dolgu: 'paper', renk: 'line', yazi: ['Presinaptik uç', 'NA / 5-HT · MAO · α₂'], lh: 21 })
          + S.ok([[W / 2, 84], [W / 2, 114]], { renk: v.renk, w: 3 })
          + S.kutu(14, 118, W - 28, 76, { dolgu: v.renk + '-soft', renk: v.renk, w: 2.5, yazi: [v.etiket, ...v.alt], lh: 20 })
          + S.kutu(14, 206, W - 28, 56, { dolgu: 'chip', renk: 'line', yazi: ['Postsinaptik reseptör yanıtı ↑', 'Antidepresan etki gecikmeli olabilir'], lh: 20 });
      }
      return S.kutu(16, 22, 180, 148, { dolgu: 'paper', renk: 'line', yazi: ['Presinaptik uç', 'NA / 5-HT', 'MAO · α₂ otoreseptör'], lh: 25 })
        + S.ok([[200, 96], [244, 96]], { renk: v.renk, w: 3.5 })
        + S.kutu(248, 22, 232, 148, { dolgu: v.renk + '-soft', renk: v.renk, w: 2.5, yazi: [v.etiket, ...v.alt], lh: 25 })
        + S.ok([[484, 96], [520, 96]], { renk: v.renk, w: 3.5 })
        + S.kutu(524, 22, 100, 148, { dolgu: 'chip', renk: 'line', yazi: ['Postsinaptik', 'iletide', 'artış'], lh: 25 })
        + S.t(W / 2, 198, 'Şematik monoaminerjik sinaps · Grup seçimi hedefi vurgular', { a: 'middle', c: 'k m' });
    },
  });

  const qrsVeri = {
    'QRS < 0,10 sn': {
      renk: 'basic', qrsW: 18,
      satir: ['Sinüs taşikardisi sık', 'Antikolinerjik bulgular, midriyazis'],
      metin: 'Sinüs taşikardisi sıktır; doza bağlı QT uzaması ve QRS genişlemesi tabloya eşlik eder. [[K3 s. 285]]',
    },
    'QRS > 0,10 sn': {
      renk: 'warn', qrsW: 36,
      satir: ['Nöbet riski bu süreyle ilişkili', 'Eksitasyon ardından depresyon'],
      metin: 'Nöbetler 0,1 saniyeden uzun QRS süresiyle ilişkilidir; midriyazis ve hipertermi karakteristiktir. [[K3 s. 286]]',
    },
    'QRS > 0,16 sn': {
      renk: 'crit', qrsW: 60,
      satir: ['Ventriküler aritmiler daha olası', 'Sağ dal bloğu · Dirençli hipotansiyon → PEA'],
      metin: 'QRS 0,16 saniyeyi aştığında ventriküler aritmiler daha olasıdır; ciddi aşım PEA ile sonuçlanabilir. [[K3 s. 285–286]]',
    },
  };
  VIZ.a18b_qrs = (el) => SEKIL.sahne(el, {
    baslik: 'TCA doz aşımında QRS genişlemesi ve klinik risk',
    vb: [640, 210], vbDar: [360, 240],
    secenek: secim('QRS süresi', Object.keys(qrsVeri)),
    metin: p => qrsVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = qrsVeri[secili], W = S.w, cx = W / 2, by = 82;
      const hw = v.qrsW / 2;
      // Şematik EKG çizimi (P, QRS, T)
      const ekg = [
        [cx - 130, by], [cx - 95, by], [cx - 85, by - 10], [cx - 75, by],
        [cx - hw - 14, by], [cx - hw, by + 10], [cx, by - 54], [cx + hw, by + 14], [cx + hw + 18, by],
        [cx + 68, by], [cx + 88, by - 14], [cx + 108, by], [cx + 130, by],
      ];
      return S.kutu(14, 10, W - 28, 108, { dolgu: 'paper', renk: 'line' })
        + S.cizgi(ekg, { renk: v.renk, w: 3.5 })
        + S.rozet(cx, 104, secili, { dolgu: v.renk + '-soft', renk: v.renk, w: 130 })
        + S.kutu(14, 132, W - 28, S.dar ? 94 : 66, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.satir, lh: 24 });
    },
  });

  function zincir(baslik, adimlar) {
    return {
      baslik, vb: [640, 316], vbDar: [360, 316], oto: false, adimlar,
      ortak: (S, secili) => adimlar.map(({ satir }, i) => {
        const y = 8 + i * 78, etkin = secili === i, orta = S.w / 2;
        const bag = i ? S.ok([[orta, y - 18], [orta, y - 4]], { renk: 'muted' }) : '';
        return bag + S.kutu(S.w * 0.05, y, S.w * 0.9, 56, {
          yazi: satir, yc: etkin ? 'b' : 'normal', lh: 20, w: etkin ? 3 : 1,
          renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper',
        });
      }).join(''),
    };
  }

  VIZ.a18b_serotonin = (el) => SEKIL.adim(el, zincir('Serotonerjik sendrom gelişim basamakları', [
    { ad: 'Tetikleyici', satir: ['Serotonerjik ilaç kombinasyonu', 'En sık: MAOI + SSRI veya petidin'], metin: 'En sık kombinasyon MAOI ile SSRI’dır; fenilpiperidin opioidler (özellikle petidin) zayıf 5-HT geri alım inhibitörü olup sendromu tetikleyebilir. [[K3 s. 286]]' },
    { ad: 'Sinaps', satir: ['SSRI: 5-HT geri alımı bloke', 'MAOI: MAO-A ile 5-HT yıkımı bloke'], metin: 'SSRI’lar 5-HT geri alımını, MAOI’ler MAO-A’nın 5-HT deaminasyonunu inhibe eder; kombinasyonda iki yol birlikte etkilenir. [[K3 s. 286–287]]' },
    { ad: 'Tablo', satir: ['Hiperrefleksi · Ajitasyon', 'Klonus · Hipertermi'], metin: 'Potansiyel olarak ölümcül tablo hiperrefleksi, ajitasyon, klonus ve hipertermiyle karakterizedir. [[K3 s. 286]]' },
    { ad: 'Önlem', satir: ['MAOI alan hastada petidin verilmez', 'İlaç değişiminde 2 hafta bekleme'], metin: 'Acilde MAOI kullanana petidin verilmez; alternatif antidepresana geçmeden MAOI 2 hafta kesilmiş olmalıdır. [[K3 s. 288]]' },
  ]));

  const maoiVeri = {
    'Dolaylı (Efedrin / Tiramin)': {
      renk: 'crit', yikim: ['Metabolizma büyük ölçüde MAO’ya bağlı', 'MAOI ile yıkım engellenir'],
      sonuc: ['KONTRENDİKE', 'Aşırı hipertansiyon ve aritmiler'],
      metin: 'Dolaylı etkili sempatomimetik aminler metabolizmaları için büyük ölçüde MAO’ya bağımlıdır; MAOI ile aşırı hipertansiyon ve aritmi gelişir. [[K3 s. 288]]',
    },
    'Doğrudan etkili ajanlar': {
      renk: 'warn', yikim: ['MAO + COMT ile metabolize edilir', 'Tek başına MAO’ya bağımlı değil'],
      sonuc: ['SON DERECE DİKKATLİ KULLAN', 'Yine de aşırı hipertansiyonu tetikleyebilir'],
      metin: 'Doğrudan etkili ajanlar COMT tarafından da metabolize edildiğinden aynı derecede aşırı yanıt vermezler, ancak yine son derece dikkatle kullanılmalıdır. [[K3 s. 288]]',
    },
    'Petidin / Opioidler': {
      renk: 'crit', yikim: ['Petidin zayıf 5-HT geri alım inh.', 'Fentanil ile de etkileşim bildirimi'],
      sonuc: ['PETİDİN VERİLMEZ', 'Serebral irritabilite, hiperpireksi, instabilite'],
      metin: 'Acil cerrahide MAOI alan hastaya petidin verilmemelidir; serebral irritabilite, hiperpireksi ve KVS instabiliteyi tetikleyebilir. [[K3 s. 287–288]]',
    },
  };
  VIZ.a18b_maoi = (el) => SEKIL.sahne(el, {
    baslik: 'MAOI kullanan hastada vazopresör ve opioid seçimi',
    vb: [640, 200], vbDar: [360, 234],
    secenek: secim('Etkileşen ajan', Object.keys(maoiVeri)),
    metin: p => maoiVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = maoiVeri[secili], W = S.w;
      if (S.dar) {
        return S.kutu(14, 12, W - 28, 86, { dolgu: 'paper', renk: 'line', yazi: v.yikim, lh: 23 })
          + S.ok([[W / 2, 100], [W / 2, 126]], { renk: v.renk, w: 3 })
          + S.kutu(14, 130, W - 28, 92, { dolgu: v.renk + '-soft', renk: v.renk, w: 2.5, yazi: v.sonuc, lh: 23 });
      }
      return S.kutu(16, 30, 276, 136, { dolgu: 'paper', renk: 'line', yazi: v.yikim, lh: 26 })
        + S.ok([[296, 98], [340, 98]], { renk: v.renk, w: 3.5 })
        + S.kutu(344, 30, 280, 136, { dolgu: v.renk + '-soft', renk: v.renk, w: 2.5, yazi: v.sonuc, lh: 26 });
    },
  });

  VIZ.a18b_lityum = (el) => SEKIL.sahne(el, {
    baslik: 'Lityum plazma düzeyi ve etkileri',
    vb: [640, 210], vbDar: [360, 248],
    secenek: secim('Plazma düzeyi', ['Terapötik (0,5–1,5 mmol/L)', 'Toksik (> 1,5 mmol/L)']),
    metin: p => p.secili.startsWith('Terapötik')
      ? 'Lityumun terapötik indeksi dardır (0,5–1,5 mmol/L); uyarılabilir hücrelerde Na⁺’u taklit ederek transmiter salınımını azaltır. [[K3 s. 288]]'
      : 'Terapötik düzeyin üzerinde kusma, karın ağrısı, ataksi, konvülziyonlar, aritmiler ve ölüm görülür. [[K3 s. 288]]',
    ciz: (S, t, { secili }) => {
      const tok = secili.startsWith('Toksik'), W = S.w;
      const bw = W - 40, x0 = 20;
      let svg = S.kutu(x0, 22, bw * 0.25, 32, { dolgu: 'chip', renk: 'line', yazi: '< 0,5', yc: 'k m', r: 4 })
        + S.kutu(x0 + bw * 0.25, 22, bw * 0.35, 32, { dolgu: tok ? 'paper' : 'ok-soft', renk: tok ? 'line' : 'ok', w: tok ? 1.5 : 3, yazi: '0,5–1,5 mmol/L', yc: 'b k', r: 4 })
        + S.kutu(x0 + bw * 0.60, 22, bw * 0.40, 32, { dolgu: tok ? 'crit-soft' : 'paper', renk: tok ? 'crit' : 'line', w: tok ? 3 : 1.5, yazi: '> 1,5 Toksik', yc: 'b k', r: 4 });
      const satirlar = tok
        ? (S.dar ? ['Kusma · Karın ağrısı', 'Ataksi · Konvülziyonlar', 'Aritmiler · Ölüm'] : ['Kusma · Karın ağrısı · Ataksi', 'Konvülziyonlar · Aritmiler · Ölüm'])
        : (S.dar ? ['Nöromüsküler blokajı uzatır', 'Anestezik gereksinimini azaltabilir', 'ADH antagonizması (poliüri) · Hipotiroidi'] : ['Nöromüsküler blokajı uzatır · Anestezik gereksinimi ↓', 'ADH antagonizması (poliüri/polidipsi) · Serum Na⁺, Mg²⁺, Ca²⁺ ↑', 'Kas tonusu ↑ · Nöbet eşiği ↓ · Guatr/hipotiroidizm, tremor']);
      return svg + S.kutu(20, 74, bw, S.dar ? 156 : 120, {
        dolgu: tok ? 'crit-soft' : 'ok-soft', renk: tok ? 'crit' : 'ok', yazi: satirlar, lh: S.dar ? 25 : 27,
      });
    },
  });
})();
