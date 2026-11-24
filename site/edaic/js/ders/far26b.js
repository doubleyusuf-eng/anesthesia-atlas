/* Tiroit ilaçları ve diğer hormon preparatları · K3, Türkçe çalışma çevirisi, s. 405–411. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  /* 1) Tiroit hormon replasmanı (SEKIL.adim) */
  VIZ.a26b_t4 = (el) => SEKIL.adim(el, {
    baslik: 'Tiroit ekseni (TRH/TSH), T₄→T₃ hücre içi hedefler ve sistemik etkiler',
    vb: [640, 232], vbDar: [360, 294], hareket: true,
    adimlar: [
      {
        ad: 'TRH–TSH & Koma',
        metin: 'Tiroglobulinde iyot+tirozin → T₃ ve T₄ oluşur; T₃/T₄ salınımını uyaran TRH ve TSH negatif geri bildirimle inhibe edilir. [[K3 s. 405]]',
        ciz: (S, t) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 72, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Hipotalamus (TRH) → Hipofiz (TSH)', 'Tiroglobulin + iyot → T₃ ve T₄', '(T₃/T₄ yükselince TRH & TSH ↓ — Şek. 26.2)'], lh: 21 })
              + S.kutu(14, 98, W - 28, 84, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Oral temel: Sentetik T₄ (Levotiroksin)', 'Hipotiroid koma (hızlı etki):', 'İV L-T₃ (yanıta göre 5–50 μg)'], lh: 21 })
              + S.kutu(14, 196, W - 28, 78, { dolgu: 'paper', renk: 'line', yazi: ['Taşıyıcıyla hücre içi T₄ → aktif T₃', 'Mitokondri & çekirdek reseptörü'], lh: 21 });
          }
          return S.kutu(16, 16, 200, 96, { dolgu: 'basic-soft', renk: 'basic', yazi: ['TRH (Hipotalamus)', '↓ TSH (Ön Hipofiz)', 'Tiroit: iyot + tirozin → T₃/T₄'], lh: 22 })
            + S.ok([[216, 64], [250, 64]], { renk: 'accent' })
            + S.akis([[216, 64], [250, 64]], t, { renk: 'accent', n: 3 })
            + S.kutu(250, 16, 178, 96, { dolgu: 'accent-soft', renk: 'accent', yazi: ['T₄ → Aktif T₃', 'Mitokondri & çekirdek', 'konformasyon değişimi'], lh: 22 })
            + S.kutu(444, 16, 180, 96, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Hipotiroid Replasman', '• Oral temel: T₄', '• Koma: İV T₃ 5–50 μg'], lh: 22 })
            + S.kutu(16, 134, 608, 76, { dolgu: 'paper', renk: 'line', yazi: ['Negatif geri bildirim: yükselen T₃ ve T₄, TRH ve TSH salınımını inhibe eder.', 'T₃ oral olarak da verilebilir; İV T₃ daha hızlı etki başlangıcı sağlar.'], lh: 22 });
        },
      },
      {
        ad: 'Sistemik & Kinetik',
        metin: 'T₃/T₄ CO ve MV’yi artırır (OAB çoğu zaman değişmez, İKH’de iskemi riski), 2,3-DPG’yi yükseltir ve >%99 TBG/albümine bağlanır (%40’a kadarı idrarla atılır). [[K3 s. 406]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 90, { dolgu: 'warn-soft', renk: 'warn', yazi: ['KVS & Solunum & MSS', '• CO ↑, PVR ↓ → OAB genelde aynı', '• MVO₂ ↑ (İKH’de iskemi!) · MV ↑ · Tremor'], lh: 21 })
              + S.kutu(14, 116, W - 28, 78, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Metabolik: Büyüme, lipit, Gİ karb.', 'Eritrosit 2,3-DPG (2,3-BPG) ↑ →', 'Hemoglobinden O₂ ayrılması artar'], lh: 21 })
              + S.kutu(14, 208, W - 28, 66, { dolgu: 'paper', renk: 'line', yazi: ['>%99 albümin/TBG · T₄→T₃/rT₃ (KC/Böb.)', 'Safra konjugatları · ≤%40 idrarda değişmez'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 114, { dolgu: 'warn-soft', renk: 'warn', yazi: ['KVS, Solunum ve MSS', '• Pozitif inotropi/kronotropi → CO ↑', '• PVR ↓ → OAB çoğu zaman değişmez', '• MVO₂ ↑ (İKH’de iskemi!) · MV ↑ · Tremor'], lh: 22 })
            + S.kutu(330, 16, 294, 114, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Metabolik & Kinetik', '• 2,3-DPG (2,3-BPG) ↑ → O₂ salınımı ↑', '• >%99 TBG/albümin · KC/böbrekte T₃/rT₃', '• Safra konj. + ≤%40 idrarda değişmez'], lh: 22 })
            + S.kutu(16, 146, 608, 66, { dolgu: 'paper', renk: 'line', yazi: ['Hem T₃ hem T₄ enteral yoldan iyi emilir; T₄’ün bir kısmı karaciğer ve böbrekte aktif T₃’e', 'veya inaktif revers T₃’e (rT₃) dönüşür.'], lh: 22 });
        },
      },
    ],
  });

  /* 2) Hipertiroidizm ilaçları */
  const hipVeri = {
    Karbimazol: {
      renk: 'basic',
      k1: S => S.dar
        ? ['Ön ilaç → KC’de hızla METİMAZOL', 'Tiroid peroksidaz inh. (yeni T₃/T₄ ↓)', 'Depo etkisiz → ötiroidi HAFTALAR alır']
        : ['Hızla metimazole dönüşen ön ilaç · Minimal protein bağlanması', 'Tiroid peroksidaz inh. (depo etkisiz → ötiroid hale gelmek haftalar)'],
      k2: S => S.dar
        ? ['Döküntü, artralji, kaşıntı · Agranülositoz', '(ilk uyarı BOĞAZ AĞRISI olab.)', 'Vaskülarite ↑ · Emzirme yasak değil']
        : ['Nadir agranülositoz (boğaz ağrısı!) · Plasentayı geçer (fetal hipotir.)', 'Emzirmede kontrendike DEĞİL · Tiroid vaskülaritesini ARTIRIR'],
      metin: 'Karbimazol tiroid peroksidazı inhibe ederek yeni T₃/T₄ sentezini önler (haftalar sürer), tiroid vaskülaritesini artırır ve agranülositozun ilk habercisi boğaz ağrısı olabilir. [[K3 s. 406]]',
    },
    'PTU & Propranolol': {
      renk: 'warn',
      k1: S => S.dar
        ? ['PTU: Yalnız ORAL (parenteral yok)', 'Tirozin iyotlanma + periferik T₄→T₃ ↓', 'Karbimazol intoleransında · Agran. ↑']
        : ['PTU (yalnız oral): tirozin iyotlanma & kısmi periferik T₄→T₃ ↓', 'Karbimazol intoleransında saklanır; agranülositoz insidansı biraz ↑'],
      k2: S => S.dar
        ? ['Propranolol (β-bloker): Kriz sempatik', 'yanıtı + periferik T₄→T₃ blokajı', 'KY / astımda göreceli kontrendike']
        : ['Propranolol: tirotoksik krizde sempatik kontrol + T₄→T₃ blokajı', 'Katekolamin aşırı duyarlılığını önler (KY / hava yolu kısıtında dikkat)'],
      metin: 'Hem yalnızca oral kullanılan propiltiyourasil hem de propranolol periferik T₄→T₃ dönüşümünü bloke eder; propranolol tirotoksik krizde sempatik etkileri de bastırır. [[K3 s. 407]]',
    },
    'İyodürler & Lityum': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Oral KI, İV NaI, iyotlu kontrast', 'Yüksek doz: iyodür bağlanma & TSH', 'etkisi ↓ + tiroglobulin proteolizi ↓']
        : ['Oral KI, İV NaI, iyotlu kontrast → foliküler hücrede yoğunlaşır', 'Yüksek doz: bağlanma ↓ (en çok tirotoksikozda), TSH etkisi ↓, proteoliz ↓'],
      k2: S => S.dar
        ? ['Tiroid vaskülaritesini AZALTIR', '(Preoperatif yararlı!) · Etkisi azalır →', 'uzun sürmez · Duyarlıda LİTYUM düşün']
        : ['Tiroid vaskülaritesini azaltır (preoperatif yararlı) · Zamanla etkisi ↓', 'Uzun süre kullanılmaz · İyodüre duyarlılarda lityum düşünülebilir'],
      metin: 'Yüksek doz iyodür tirotoksikozda hormon sentezini, proteolizi ve tiroid vaskülaritesini azaltarak preoperatif hazırlıkta yararlı olur; iyodür duyarlılarında lityum düşünülebilir. [[K3 s. 407]]',
    },
  };
  VIZ.a26b_hiper = (el) => SEKIL.sahne(el, {
    baslik: 'Hipertiroidizm tedavisi: karbimazol, PTU, propranolol ve iyodürler',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('İlaç', Object.keys(hipVeri)),
    metin: p => hipVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = hipVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 3) Oral Kontraseptifler */
  const ocpVeri = {
    'Kombine OKS vs Progesteron': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Kombine (Östrojen + Progesteron):', '21 gün + 7 gün ara · GnRH & gonadot.', 'baskılar → ovülasyonu inhibe eder']
        : ['Kombine (21 gün + 7 gün ara): GnRH ve gonadotropinleri baskılar', 'Ovülasyonu inhibe eder · Hirsutizm & depresyon gelişebilir'],
      k2: S => S.dar
        ? ['Yalnız Progesteron (sürekli):', 'Ovülasyonu yalnız %25’te önler', 'Elverişsiz endometrium · Yan etki daha az']
        : ['Yalnız progesteron (sürekli): kadınların sadece %25’inde ovülasyonu önler', 'İmplantasyon için elverişsiz endometrium oluşturur (yan etki az)'],
      metin: 'Kombine OKS (21+7 gün) GnRH/gonadotropini baskılayıp ovülasyonu önler; sürekli yalnız progesteron hapı ise ovülasyonu yalnızca %25’te önleyip elverişsiz endometrium oluşturur. [[K3 s. 407–408]]',
    },
    'Majör & Minör Yan Etkiler': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Majör: Kolestatik sarılık & TE riski ↑', 'Kitap kombine kontrendikasyon listesi:', 'TE, obezite, sigara, HT, DM (Atlas notu!)']
        : ['Majör yan etkiler: kolestatik sarılık ve tromboemboli insidansı ↑', 'Kitap kontrendikasyon listesi: TE, obezite, sigara, HT, DM (bkz. not)'],
      k2: S => S.dar
        ? ['Minör yan etkiler:', 'Ara kanama · Kilo alımı · Meme hass.', 'Baş ağrısı · Bulantı']
        : ['Minör yan etkiler: ara kanama, kilo alımı, meme hassasiyeti,', 'baş ağrısı ve bulantı (kombinede ek olarak hirsutizm/depresyon)'],
      metin: 'OKS’lerin majör yan etkileri kolestatik sarılık ve artmış tromboembolidir; kitaptaki kombine kontrendikasyon listesinin mutlak sınırı Atlas notunda açıklanmıştır. [[K3 s. 407–408]]',
    },
  };
  VIZ.a26b_ocp = (el) => SEKIL.sahne(el, {
    baslik: 'Oral kontraseptif haplar: rejim farkları ve yan etkiler',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Başlık', Object.keys(ocpVeri)),
    metin: p => ocpVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = ocpVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 4) Hormon Replasman Tedavisi */
  const hrtVeri = {
    'Endikasyon & Onkolojik Risk': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Östrojen veya Östrojen/Progesteron', 'Menopoz belirtileri ↓ · Osteoporoz ↓', '(Kitap: KV risk ↓ — Atlas notu!)']
        : ['Menopoz belirtileri ve osteoporoz ↓ (kitap KV risk ↓ der — bkz. not)', 'Yalnız östrojen endometrium kanseri ↑ → histerektomililere ayrılır'],
      k2: S => S.dar
        ? ['Sağlam uterusta kombine şart', 'Meme kanseri: kombinede risk yalnız', 'östrojenden biraz daha yüksek olabilir']
        : ['Sağlam uterusta endometrium koruması için kombine HRT gerekir', 'Meme kanseri riski kombine tedavide yalnız östrojene göre biraz ↑ olab.'],
      metin: 'Karşılanmamış östrojen endometrium kanserini artırdığından histerektomili kadınlara ayrılır; kombine HRT’de meme kanseri riski biraz daha yüksek olabilir. [[K3 s. 408]]',
    },
    'DVT & Perioperatif Plan': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Derin Ven Trombozu (DVT):', 'Mutlak risk düşük olsa da artabilir', '(hemostatika, yaş, yatkınlık açığa çıkar)']
        : ['DVT mutlak riski düşüktür ancak hemostatik değişim, artan yaş ve', 'yatkınlıkların açığa çıkmasıyla HRT riski artırabilir'],
      k2: S => S.dar
        ? ['Kitap: olağan tromboprofilaksiyle', 'perioperatif HRT kesilmesine kanıt yok', '(Yol & cerrahi ayrımı için Atlas notu!)']
        : ['Kitap rutin tromboprofilaksi altında kesmek için kanıt olmadığını yazar', 'Ancak güncel pratik oral vs transdermal + cerrahiye göre ayrılır (not)'],
      metin: 'HRT DVT riskini artırabilir (mutlak risk düşük); kitap olağan tromboprofilaksi koşuluyla perioperatif kesme kanıtı olmadığını yazar (güncel ayrım için Atlas notu). [[K3 s. 408]]',
    },
  };
  VIZ.a26b_hrt = (el) => SEKIL.sahne(el, {
    baslik: 'Hormon replasman tedavisi (HRT): kanser, DVT ve perioperatif yönetim',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Konu', Object.keys(hrtVeri)),
    metin: p => hrtVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = hrtVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 5) Oksitosik ilaçlar (SEKIL.adim) */
  VIZ.a26b_oksitosik = (el) => SEKIL.adim(el, {
    baslik: 'Oksitosik ilaçlar: birim güvenliği, mekanizma ve kontrendikasyonlar',
    vb: [640, 232], vbDar: [360, 294],
    adimlar: [
      {
        ad: 'Oksitosin (Birim!)',
        metin: '9 aa (7’si vazopressinle benzer); GPCR + Ca²⁺ salınımı, t½ 3–5 dk (İV infüzyon). Kitaptaki «5 veya 10 mg» hatalı birimdir; doğrusu 5 veya 10 IU/mL (Atlas notu). [[K3 s. 408–409]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 84, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Arka hipofiz nonapeptidi (9 aa)', 'Vazopressine 7/9 benzer · GPCR → Ca²⁺ ↑', 't½ 3–5 dk → Kontrollü İV infüzyon'], lh: 21 })
              + S.kutu(14, 110, W - 28, 78, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Uzun infüzyonda zayıf ADH etkisi', 'Bolusta taşikardi · Baş ağrısı sık', '+ Ergometrin = Sintometrin'], lh: 21 })
              + S.kutu(14, 202, W - 28, 72, { dolgu: 'crit-soft', renk: 'crit', yazi: ['DİKKAT: Flakon 5/10 IU/mL (10 IU≈16,7 μg)', 'Kitaptaki «5/10 mg» HATALI BİRİM — KULLANMA!'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 110, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Oksitosin: Yapı & Mekanizma', '• 9 amino asit (vazopressinle 7’si benzer)', '• GPCR bağlanması → Ca²⁺ salınımı ↑', '• t½ 3–5 dk → kontrollü İV infüzyon'], lh: 22 })
            + S.kutu(330, 16, 294, 110, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Etkiler & Yan Etkiler', '• Süt salıverme + uterus tonusu/indüks.', '• Uzun infüzyonda zayıf ADH-benzeri etki', '• Bolus: taşikardi · Baş ağrısı · Sintometrin'], lh: 22 })
            + S.kutu(16, 144, 608, 68, { dolgu: 'crit-soft', renk: 'crit', yazi: ['KRİTİK BİRİM UYARISI: 1 mL flakon 5 veya 10 IU içerir (10 IU ≈ 16,7 μg);', 'kaynak kitaptaki «5 veya 10 mg» ciddi bir birim hatası olup asla doz sayılmamalıdır!'], lh: 22 });
        },
      },
      {
        ad: 'Karbetosin, Ergometrin & Karboprost',
        metin: 'Karbetosin tek 100 μg (doğumda/HT’de yasak); ergometrin preeklampside yasak; karboprost (PGF₂α) 250 μg İM (en fazla 2 mg) gebelik/kardiyorespiratuvar/PEİ’de yasak. [[K3 s. 409]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 82, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Karbetosin (Oksitosin analoğu · 100 μg)', '<30°C’de 3 yıl raf ömrü · Bulantı/kusma ↑', 'YASAK: Doğum eylemi · HT · KV hastalık'], lh: 21 })
              + S.kutu(14, 108, W - 28, 78, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Ergometrin (LSD benzeri ergot · İM ≤6 sa)', 'Mekanizma bilinmiyor · KC → safra', 'HT/baş ağrısı/bulantı · Preeklampsi YASAK'], lh: 21 })
              + S.kutu(14, 200, W - 28, 76, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Karboprost (PGF₂α · 250 μg/90 dk ≤2 mg İM)', 'Bronkospazm · Kızarma · KV kollaps', 'YASAK: Gebelik · Kardiyoresp. · PEİ'], lh: 21 });
          }
          return S.kutu(16, 16, 192, 122, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Karbetosin', '• Tek 100 μg (uzun etki)', '• <30°C 3 yıl raf ömrü', '• Yüksek bulantı/kusma', '• Doğum / HT / KV yasak'], lh: 21 })
            + S.kutu(224, 16, 192, 122, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Ergometrin (LSD benz.)', '• Plasenta çıkışı · PPK önleme', '• İM birkaç dk → ≤6 sa', '• KC metaboliz. → safra', '• Preeklampside YASAK'], lh: 21 })
            + S.kutu(432, 16, 192, 122, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Karboprost (PGF₂α)', '• 250 μg İM/90 dk ≤2 mg', '• Dirençli PPK için', '• Bronkospazm / KV kollaps', '• Gebelik/KResp/PEİ yasak'], lh: 21 })
            + S.kutu(16, 152, 608, 60, { dolgu: 'paper', renk: 'line', yazi: ['Karboprost oksitosin ve ergometrine dirençli postpartum kanama (PPK) için saklanır;', 'bulantı/kusma ve flushing (kızarma) da yapabilir.'], lh: 21 });
        },
      },
    ],
  });
})();
