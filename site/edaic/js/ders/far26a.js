/* Kortikosteroidler · K3, Türkçe çalışma çevirisi, s. 401–405. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  /* 1) Adrenal korteks & Metabolik etkiler */
  const metVeri = {
    'Korteks & Ajanlar': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Adrenal korteksten 2 steroid sınıfı:', '• Glukokortikoid (fasikülata/retik.)', '• Mineralokortikoid (glomeruloza)']
        : ['Glukokortikoidler: zona fasikülata & zona retikülaristen', 'Mineralokortikoidler: zona glomerulozadan salgılanır'],
      k2: S => S.dar
        ? ['Başlıca endojen: Hidrokortizon', 'Sentetikler: prednizolon, metilpred.,', 'betametazon, deksametazon, triams.']
        : ['Başlıca endojen glukokortikoid: hidrokortizon', 'Sentetik: prednizolon, metilprednizolon, betametazon, deksametazon, triams.'],
      metin: 'Glukokortikoidler zona fasikülata ve retikülaristen, mineralokortikoidler zona glomerulozadan salgılanır; başlıca endojen glukokortikoid hidrokortizondur. [[K3 s. 401]]',
    },
    'Karbonhidrat, Protein & Yağ': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Glukoneogenez & glikojen ↑', 'Periferik glukoz alımı ↓ → hiperglisemi', 'Protein katab. ↑ / sentez ↓ (diyet terslemez)']
        : ['Glukoneogenez, glikojen & hepatik salınım ↑; periferik alım ↓', 'Protein katab. ↑ / sentez ↓ → diyetsel protein geri döndürmez'],
      k2: S => S.dar
        ? ['Kas güçsüzlüğü & erimesi · İnce deri', 'Stria · Mide ülseri · Osteoporoz', 'Yağ: ekstremite → gövde/boyun/yüz']
        : ['Kas güçsüzlüğü/erimesi · İnce deri & stria · Mide ülseri · Osteoporoz', 'Yağ ekstremitelerden gövde, boyun ve yüze dağılır · Glikozüri/DM'],
      metin: 'Yüksek doz veya uzun süreli glukokortikoid hiperglisemi, kas erimesi (diyetle protein geri döndürmez), deri striaları, mide ülserasyonu, santral yağ dağılımı ve osteoporoz yapar. [[K3 s. 401]]',
    },
  };
  VIZ.a26a_metab = (el) => SEKIL.sahne(el, {
    baslik: 'Adrenal korteks hormonları ve glukokortikoidlerin metabolik etkileri',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Odak', Object.keys(metVeri)),
    metin: p => metVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = metVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 2) Antienflamatuvar & İmmünosupresif yolak (SEKIL.adim) */
  VIZ.a26a_anti = (el) => SEKIL.adim(el, {
    baslik: 'Lipokortin–fosfolipaz A₂ blokajı, immünosupresyon ve göreli potens',
    vb: [640, 232], vbDar: [360, 294], hareket: true,
    adimlar: [
      {
        ad: 'Antienflamatuvar',
        metin: 'Glukokortikoidler lipokortini uyararak fosfolipaz A₂’yi inhibe eder; prostaglandin, lökotrien ve PAF baskılanır, PMN/makrofaj göçü önlenir. [[K3 s. 401]]',
        ciz: (S, t) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 72, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Glukokortikoid → Lipokortin ↑', 'Fosfolipaz A₂ İNHİBE EDİLİR', '(Membran fosfolipit → Araşidonik asit ↓)'], lh: 21 })
              + S.ok([[W / 2, 84], [W / 2, 108]], { renk: 'crit' })
              + S.kutu(14, 108, W - 28, 78, { dolgu: 'crit-soft', renk: 'crit', yazi: ['PG, Lökotrien ve PAF Baskılanır', 'Akut transüda ve ödem ↓', 'PMN & makrofaj doku göçü önlenir'], lh: 21 })
              + S.kutu(14, 200, W - 28, 74, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Enfeksiyon direnci ↓ (Latent TB!)', 'Klinik bulgular ilerleyene dek gizlenir'], lh: 21 });
          }
          return S.kutu(16, 16, 176, 98, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Glukokortikoid', 'Lipokortini uyarır', '→ Fosfolipaz A₂ ↓'], lh: 22 })
            + S.ok([[192, 65], [228, 65]], { renk: 'accent' })
            + S.akis([[192, 65], [228, 65]], t, { renk: 'accent', n: 3 })
            + S.kutu(228, 16, 192, 98, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Araşidonik Asit ↓', 'Prostaglandinler ↓', 'Lökotrien & PAF ↓'], lh: 22 })
            + S.ok([[420, 65], [452, 65]], { renk: 'warn' })
            + S.kutu(452, 16, 172, 98, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Doku Yanıtı ↓', 'Transüda/ödem ↓', 'PMN/makrofaj ↓'], lh: 22 })
            + S.kutu(16, 134, 608, 76, { dolgu: 'paper', renk: 'line', yazi: ['Enfeksiyonlara direnç azalabilir (latent tüberküloz yeniden aktive olabilir) ve', 'olağan klinik bulgular enfeksiyon ilerleyene kadar ortaya çıkmayabilir.'], lh: 22 });
        },
      },
      {
        ad: 'İmmünosupresyon',
        metin: 'Makrofaj fonksiyonu, dolaşımdaki T-lenfosit, antikor üretimi ile IL-1 ve IL-2 baskılanarak lenfosit proliferasyonu azaltılır. [[K3 s. 402]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 86, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Hücresel & Hümoral Baskılama', '• Makrofaj fonksiyonu baskılanır', '• Dolaşımdaki T-lenfosit sayısı ↓'], lh: 21 })
              + S.kutu(14, 112, W - 28, 86, { dolgu: 'clin-soft', renk: 'clin', yazi: ['• Lenfosit taşınması & antikor ↓', '• İnterlökin 1 & 2 üretimi inhibe', '→ Lenfosit proliferasyonu ↓'], lh: 21 })
              + S.kutu(14, 212, W - 28, 62, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Potens: Deksametazon (25) vs', 'Hidrokortizon (1) · Prednizolon (4)'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 110, { dolgu: 'basic-soft', renk: 'basic', yazi: ['İmmünosupresif Etkiler', '• Makrofaj fonksiyonu baskılanır', '• Dolaşımdaki T-lenfositler ↓', '• Lenfosit taşınması & antikor ↓'], lh: 22 })
            + S.kutu(330, 16, 294, 110, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Sitokin & Potens', '• IL-1 ve IL-2 üretimi inhibe →', '  lenfosit proliferasyonu azalır', '• Eşdeğer doz ters orantılıdır (Tablo 26.1)'], lh: 22 })
            + S.kutu(16, 144, 608, 68, { dolgu: 'paper', renk: 'line', yazi: ['Potens (Eşdeğer doz): Hidrokortizon 1 (100 mg) · Prednizolon 4 (25 mg) ·', 'Metilprednizolon 5 (20 mg) · Triamsinolon 5 (20 mg) · Deksametazon 25 (4 mg).'], lh: 22 });
        },
      },
    ],
  });

  /* 3) HPA baskılanması, sıvı retansiyonu ve permisif etkiler (SEKIL.adim) */
  VIZ.a26a_diger = (el) => SEKIL.adim(el, {
    baslik: 'HPA ekseni baskılanması, mineralokortikoid etki ve permisif etkiler',
    vb: [640, 232], vbDar: [360, 294],
    adimlar: [
      {
        ad: 'Adrenal Baskılanma',
        metin: 'Uzun süreli steroid CRH ve ACTH’yi baskılayarak aylarca süren adrenal atrofi yapar; stres anında ek hidrokortizon verilmezse hipotansiyon/kollaps gelişebilir. [[K3 s. 402]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 76, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Ekzojen Glukokortikoid', 'CRH (hipotalamus) & ACTH (hipofiz)', 'üzerinde negatif geri bildirim'], lh: 21 })
              + S.ok([[W / 2, 88], [W / 2, 114]], { renk: 'crit' })
              + S.kutu(14, 114, W - 28, 76, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Adrenal Bez Atrofik Hale Gelir', 'Kesildikten sonra AYLARCA sürer', 'Ani kesme / cerrahi / enfeksiyon →'], lh: 21 })
              + S.kutu(14, 204, W - 28, 70, { dolgu: 'paper', renk: 'line', yazi: ['Ek hidrokortizon yoksa:', 'Hipotansiyon ve olası KV kollaps'], lh: 21 });
          }
          return S.kutu(16, 16, 200, 96, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Negatif Geri Bildirim', 'Ekzojen steroid →', 'CRH ve ACTH baskılanır'], lh: 22 })
            + S.ok([[216, 64], [250, 64]], { renk: 'warn' })
            + S.kutu(250, 16, 178, 96, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Adrenal Atrofi', 'Kesimden sonra', 'aylarca devam eder'], lh: 22 })
            + S.ok([[428, 64], [462, 64]], { renk: 'crit' })
            + S.kutu(462, 16, 162, 96, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Stres / Ani Kesme', 'Hipotansiyon +', 'olası KV kollaps'], lh: 22 })
            + S.kutu(16, 134, 608, 78, { dolgu: 'paper', renk: 'line', yazi: ['Şekil 26.1 döngüsü: >1 ay 5 mg prednizolon kadar düşük dozlar ve standart doz', 'inhale steroidler dahi kısa Synacthen testine yanıtı bozabilir.'], lh: 22 });
        },
      },
      {
        ad: 'Sıvı & Permisif',
        metin: 'Mineralokortikoid etki hidrokortizon/kortizonda en yüksek, deksametazonda en düşüktür; vasküler katekolamin yanıtında permisif etki gösterir. [[K3 s. 403]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 86, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Sıvı Retansiyonu (Distal Tübül)', 'Na⁺ tutulumu · K⁺ atılımı (ödem/HT/KY)', 'Hidrokort./kortizon > pred. > metil/deks.'], lh: 21 })
              + S.kutu(14, 112, W - 28, 90, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Vasküler Permisif Etki (Sepsis)', 'Düz kasın katekolamin yanıtı şart', 'Sepsiste İV hidrokortizon iyileştirebilir'], lh: 21 })
              + S.kutu(14, 214, W - 28, 62, { dolgu: 'paper', renk: 'line', yazi: ['Diğer permisif: glukagon/katek. kalorijenik,', 'katekolamin lipolitik & bronkodilatör'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 112, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Mineralokortikoid Sıvı Tutulumu', '• Distal tübül: Na⁺ tutulumu, K⁺ atılımı', '• Yüksek doz: ödem, HT, kalp yetm.', '• Hidro./kortizon > pred. > metil./deks.'], lh: 22 })
            + S.kutu(330, 16, 294, 112, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Permisif Etkiler', '• Düz kasın katekolaminlere yanıtı', '  (sepsiste İV hidrokortizon iyileştirebilir)', '• Kalorijenik · Lipolitik · Bronkodilatör'], lh: 22 })
            + S.kutu(16, 144, 608, 68, { dolgu: 'paper', renk: 'line', yazi: ['Mineralokortikoid etkisinin bulunmaması nedeniyle deksametazon primer', 'adrenal yetmezlikte önerilmez (K3 s. 405).'], lh: 22 });
        },
      },
    ],
  });

  /* 4) Perioperatif steroid desteği (Tablo 26.2 & 26.3 özeti) */
  const perVeri = {
    'Primer & Sekonder AI': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Cerrahi (rejyonal/genel anestezi):', '100 mg İV + 200 mg/24 sa İV inf.', 'PONV/NBM: 200 mg İV (50 mg İM qds)']
        : ['Cerrahi: İndüksiyonda 100 mg İV + hemen 200 mg/24 sa İV infüzyon', 'PONV/NBM: 200 mg/24 sa İV (veya qds 50 mg İM); oralde 2× doz'],
      k2: S => S.dar
        ? ['Bağırsak: 100 mg İV/İM + 24 sa 2×', 'Doğum: 100 İV+200 İV (100+50 qds İM)', 'Deksametazon primer AI’da önerilmez']
        : ['Doğum: 100 İV+200 İV (veya 100 İM + 50 qds İM) · Oralde 48 sa 2×', 'Deksametazon mineralokortikoid etkisi olmadığından primer AI’da önerilmez'],
      metin: 'Primer ve sekonder AI’da olağan steroide ek hidrokortizon verilir; mineralokortikoid etkisi bulunmadığından primer AI’da deksametazon önerilmez. [[K3 s. 404–405]]',
    },
    'Tersiyer AI (≥5 mg Pred.)': {
      renk: 'warn',
      k1: S => S.dar
        ? ['En sık AI · ≥5 mg prednizolon/eşdeğer', 'Majör & Orta: 100 mg İV + 200 mg/24 sa', '(veya 6–8 mg İV deksametazon 24 sa)']
        : ['Majör & yüzey/orta cerrahi: 100 mg İV + 200 mg/24 sa İV infüzyon', 'Alternatif: 6–8 mg İV deksametazon 24 saat için yeterli olur'],
      k2: S => S.dar
        ? ['Postop oral: orta 48 sa 2× · majör', 'normal (komplike ≤1 hf 2×) · PONV:', 'kitap 100 İV / 50 qds İM (Atlas notu!)']
        : ['PONV/NBM majör: kitapta 24 sa 100 mg İV / qds 50 mg İM (Atlas notu)', 'Doğum: 100+200 İV (100 İM + 50 qds İM) · Bağırsak: normal / İV'],
      metin: 'En sık görülen tersiyer AI’da (≥5 mg prednizolon veya eşdeğeri) olağan tedaviye ek hidrokortizon ya da alternatif olarak 6–8 mg İV deksametazon verilir. [[K3 s. 403–404]]',
    },
  };
  VIZ.a26a_periop = (el) => SEKIL.sahne(el, {
    baslik: 'Perioperatif adrenal yetmezlik yönetimi: Primer/Sekonder vs Tersiyer AI',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('AI Tipi', Object.keys(perVeri)),
    metin: p => perVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = perVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
