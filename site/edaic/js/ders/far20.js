/* Bağırsak üzerine etkili ilaçlar · K3, Türkçe çalışma çevirisi, s. 306–312. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const pariyetalVeri = {
    Fizyoloji: {
      h2: false, ppi: false, renk: 'basic',
      sonuc: 'cAMP ↑ → K⁺/H⁺ ATPaz ile H⁺ sekresyonu',
      metin: 'Gastrin ve ACh hem pariyetal hücreyi hem parakrin hücrelerden histamin salınımını uyarır; başlıca uyarı histamin reseptörüyle cAMP artışıdır. [[K3 s. 306]]',
    },
    'H₂ blokajı': {
      h2: true, ppi: false, renk: 'warn',
      sonuc: 'H₂ blokajı → gastrik pH ↑, hacim ↓',
      metin: 'Simetidin ve ranitidin pariyetal hücre H₂ reseptörlerini kompetitif ve spesifik olarak bloke eder; boşalma süresi ve AÖS tonusu değişmez. [[K3 s. 307–308]]',
    },
    'PPİ blokajı': {
      h2: false, ppi: true, renk: 'accent',
      sonuc: 'Son ortak yol bloke → tam aklorhidri',
      metin: 'Omeprazol asit sekresyonunun son ortak yolu olan K⁺/H⁺ ATPazı geri dönüşümsüz bloke ederek tam aklorhidri sağlar. [[K3 s. 308]]',
    },
  };
  VIZ.a20_pariyetal = (el) => SEKIL.sahne(el, {
    baslik: 'Pariyetal hücrede asit sekresyonu ve ilaç hedefleri',
    vb: [640, 224], vbDar: [360, 266],
    secenek: secim('Durum', Object.keys(pariyetalVeri)),
    metin: p => pariyetalVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = pariyetalVeri[secili], W = S.w;
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 66, {
          dolgu: 'paper', renk: 'line',
          yazi: ['Gastrin (G hücresi) · ACh', '→ Parakrin hücre: Histamin (başlıca)'], lh: 21,
        }) + S.ok([[W / 2, 78], [W / 2, 102]], { renk: v.h2 ? 'crit' : 'basic', w: 3 })
          + S.kutu(14, 104, W - 28, 72, {
            dolgu: v.h2 ? 'warn-soft' : v.ppi ? 'accent-soft' : 'basic-soft',
            renk: v.renk,
            yazi: [
              v.h2 ? 'H₂ BLOKE (Simetidin / Ranitidin)' : 'H₂ reseptörü → cAMP ↑',
              v.ppi ? 'K⁺/H⁺ ATPaz geri dönüşümsüz bloke' : 'Proton pompası (K⁺/H⁺ ATPaz)',
            ], lh: 22,
          }) + S.kutu(14, 190, W - 28, 60, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.sonuc, lh: 21 });
      }
      return S.kutu(16, 20, 174, 128, {
        dolgu: 'paper', renk: 'line',
        yazi: ['Gastrin & ACh', '→ Parakrin hücre', 'Histamin salınımı', '(başlıca uyarı)'], lh: 24,
      }) + S.ok([[194, 84], [228, 84]], { renk: v.h2 ? 'crit' : 'basic', w: 3 })
        + S.kutu(232, 20, 184, 128, {
          dolgu: v.h2 ? 'warn-soft' : 'basic-soft', renk: v.h2 ? 'warn' : 'basic',
          yazi: v.h2 ? ['H₂ reseptörü', 'BLOKE', '(cAMP artışı durur)'] : ['Pariyetal hücre', 'H₂ reseptörü', '→ cAMP ↑'], lh: 26,
        }) + S.ok([[420, 84], [454, 84]], { renk: v.ppi ? 'crit' : 'accent', w: 3 })
        + S.kutu(458, 20, 166, 128, {
          dolgu: v.ppi ? 'accent-soft' : 'paper', renk: v.ppi ? 'accent' : 'line',
          yazi: v.ppi ? ['K⁺/H⁺ ATPaz', 'GERİ DÖNÜŞÜMSÜZ', 'BLOKE'] : ['K⁺/H⁺ ATPaz', 'Son ortak yol', 'H⁺ lümene'], lh: 26,
        }) + S.kutu(16, 164, W - 32, 46, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.sonuc });
    },
  });

  const h2Veri = {
    Simetidin: {
      renk: 'warn', yapi: 'İmidazol halkalı tek H₂ antagonisti',
      kinetik: 'Oral ~%60 · Prot. %20 · ~%50 idrar',
      etkiler: ['Hepatik CYP450’yi inhibe eder', 'Antiandrojenik (jinekomasti, impotans)', 'Böbrek bozukluğunda MSS etkileri'],
      metin: 'Simetidin CYP450’yi inhibe eder (lidokain, propranolol, diazepam, fenitoin, TCA, varfarin, aminofilin metabolizmasını yavaşlatır). [[K3 s. 307]]',
    },
    Ranitidin: {
      renk: 'ok', yapi: 'Simetidinden daha potent',
      kinetik: 'Oral ~%50 · Prot. %15 · %50 idrar',
      etkiler: ['CYP450 inh. yok · Antiandrojenik yok', 'Doğum eyleminde yaygın kullanım', 'Porfiride kaçın · Hızlı İV aritmi'],
      metin: 'Ranitidin CYP450’yi inhibe etmediğinden sıklıkla simetidine tercih edilir ve H. pylori eradikasyonunda antibiyotiklerle kullanılır. [[K3 s. 307–308]]',
    },
    'Nizatidin & Famotidin': {
      renk: 'basic', yapi: 'Potensleri artmış yeni H₂ antagonistleri',
      kinetik: 'Kitapta ayrı kinetik sayı verilmez',
      etkiler: ['Ranitidin gibi CYP450’yi inhibe etmezler', 'Pariyetal hücre H₂ antagonizması'],
      metin: 'Nizatidin ve famotidin potensleri artmış daha yeni H₂ antagonistleridir ve CYP450’yi inhibe etmezler. [[K3 s. 308]]',
    },
  };
  VIZ.a20_h2_kars = (el) => SEKIL.sahne(el, {
    baslik: 'H₂ reseptör antagonistlerinin karşılaştırması',
    vb: [640, 214], vbDar: [360, 260],
    secenek: secim('İlaç', Object.keys(h2Veri)),
    metin: p => h2Veri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = h2Veri[secili], W = S.w;
      return S.kutu(14, 14, W - 28, 66, { dolgu: v.renk + '-soft', renk: v.renk, yazi: [v.yapi, v.kinetik], lh: 22 })
        + S.kutu(14, 96, W - 28, S.dar ? 148 : 104, { dolgu: 'paper', renk: 'line', yazi: v.etkiler, lh: S.dar ? 26 : 27 });
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

  VIZ.a20_ppi = (el) => SEKIL.adim(el, zincir('Omeprazolün aktivasyonu, etkisi ve metabolizması', [
    { ad: 'Enterik kap', satir: ['Gastrik asitte parçalanır', 'Enterik kaplı granül kapsül'], metin: 'Omeprazol mide asidinde parçalandığından emilimin ince bağırsakta gerçekleşmesi için enterik kaplı granül kapsül olarak hazırlanır. [[K3 s. 309]]' },
    { ad: 'Ön ilaç', satir: ['Pariyetal hücrede aktifleşir', 'K⁺/H⁺ ATPazı geri dönüşümsüz bloke eder'], metin: 'Son ortak yolu geri dönüşümsüz bloke ederek tam aklorhidri sağlar; AÖS tonusu ve gastrik boşalma değişmez. [[K3 s. 308–309]]' },
    { ad: 'Polimorfizm', satir: ['CYP2C19 (*17 hızlı · *3 yavaş)', 'Potent CYP2C19 inh. (klopidogrel)'], metin: 'CYP2C19*17 tedaviyi etkisiz kılabilir; klopidogrelin aktif forma dönüşümünü olumsuz etkileyerek antitrombosit etkiyi azaltabilir. [[K3 s. 309]]' },
    { ad: 'Atılım', satir: ['Tam hepatik (CYP2C19 / CYP3A4)', 'İnaktif: %80 idrar · %20 safra'], metin: 'CYP2C19 (az ölçüde CYP3A4) ile tam hepatik metabolizmaya uğrar; inaktif metabolitler %80 idrar, %20 safrayla atılır. [[K3 s. 309]]' },
  ]));

  VIZ.a20_motilite = (el) => SEKIL.sahne(el, {
    baslik: 'Prokinetikler: metoklopramid ve domperidon',
    vb: [640, 210], vbDar: [360, 250],
    secenek: secim('İlaç', ['Metoklopramid', 'Domperidon']),
    metin: p => p.secili === 'Metoklopramid'
      ? 'Periferik D₂ antagonizması ve gastrik muskarinik selektif uyarımla AÖS tonusunu artırır ve piloru gevşetir; sekresyona etkisi yoktur. [[K3 s. 309]]'
      : 'Domperidon KBB’yi geçmediğinden ekstrapiramidal etki olasılığı daha düşüktür; yalnız tablet veya supozituvar olarak bulunur. [[K3 s. 310]]',
    ciz: (S, t, { secili }) => {
      const m = secili === 'Metoklopramid', W = S.w;
      const ust = m
        ? ['Prokainamid benzeri (LA etki yok)', 'Periferik D₂ ↓ + muskarinik ↑']
        : ['KBB’yi geçmez → EPS olasılığı düşük', 'Çocukta KT/RT kusmasıyla sınırlı'];
      const alt = m
        ? ['AÖS ↑ · Pilor gevşer', 'Plazma kolinesteraz inh.', 'Oral %30–90 · Feokromositoma HT']
        : ['Prolaktin ↑ → galaktore/jinekomasti', 'İV aritmiler nedeniyle kaldırılmış'];
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 100, { dolgu: m ? 'accent-soft' : 'ok-soft', renk: m ? 'accent' : 'ok', yazi: ust, lh: 23 })
          + S.kutu(14, 124, W - 28, 114, { dolgu: 'paper', renk: 'line', yazi: alt, lh: 23 });
      }
      return S.kutu(14, 24, 298, 158, { dolgu: m ? 'accent-soft' : 'ok-soft', renk: m ? 'accent' : 'ok', yazi: ust, lh: 27 })
        + S.kutu(328, 24, 298, 158, { dolgu: 'paper', renk: 'line', yazi: alt, lh: 27 });
    },
  });

  VIZ.a20_koruma = (el) => SEKIL.sahne(el, {
    baslik: 'Mukoza koruyucular: sukralfat ve misoprostol',
    vb: [640, 200], vbDar: [360, 240],
    secenek: secim('İlaç', ['Sukralfat', 'Misoprostol']),
    metin: p => p.secili === 'Sukralfat'
      ? 'GİS lümeninde bariyer oluşturur, hemen hemen hiç emilmez ve gastrik pH, motilite ya da AÖS tonusunu değiştirmez. [[K3 s. 310]]'
      : 'Sentetik PGE₁ analoğudur; asit sekresyonunu inhibe eder, mukus sekresyonunu artırır ve NSAİİ ülserlerinin önleme/tedavisinde kullanılır. [[K3 s. 310–311]]',
    ciz: (S, t, { secili }) => {
      const suk = secili === 'Sukralfat', W = S.w;
      const k1 = suk
        ? ['Lümende bariyer · ülserli bölgeler', 'pH, motilite ve AÖS değişmez']
        : ['PGE₁ analoğu: Asit ↓ · Mukus ↑', 'NSAİİ ülser önleme ve tedavisi'];
      const k2 = suk
        ? ['Hemen hiç emilmez · Diyalizde Al ↑', 'Siprofloksasin, varfarin, fenitoin', 've H₂ antagonistlerini bağlar']
        : ['Uterus tonusu ↑ (düşük) · Diyare', 'KVS/SVH’de dikkat · KC/böbrek doz ='];
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 100, { dolgu: 'basic-soft', renk: 'basic', yazi: k1, lh: 23 })
          + S.kutu(14, 124, W - 28, 102, { dolgu: 'paper', renk: 'line', yazi: k2, lh: 23 });
      }
      return S.kutu(14, 24, 298, 150, { dolgu: 'basic-soft', renk: 'basic', yazi: k1, lh: 27 })
        + S.kutu(328, 24, 298, 150, { dolgu: 'paper', renk: 'line', yazi: k2, lh: 27 });
    },
  });
})();
