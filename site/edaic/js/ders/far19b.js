/* Antikolinerjikler, antihistaminikler ve diğer antiemetikler · K3, Türkçe çalışma çevirisi, s. 300–305. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const antikolVeri = {
    Hiyosin: {
      amin: 'Doğal tersiyer amin (l-hiyosin)', renk: 'accent', gecer: true,
      ozet: ['KBB ve plasentaya geçiş (++)', 'Antiemetik ++ · Sedasyon/amnezi +++', 'Antisiyalogog +++ · Midriyazis +++', 'Bronkodilatasyon + · Kalp hızı +'],
      metin: 'Tersiyer amin olan hiyosin KBB’yi geçer; güçlü antiemetik, sedatif ve antisiyalogog etkilidir ancak merkezi antikolinerjik sendromu tetikleyebilir. [[K3 s. 300–301]]',
    },
    Atropin: {
      amin: 'Doğal tersiyer amin (l-atropin)', renk: 'warn', gecer: true,
      ozet: ['KBB ve plasentaya geçiş (++)', 'Kalp hızı +++ · Bronkodilatasyon ++', 'Antiemetik + (PONV’de yok)', 'Sedasyon + · Antisiyalogog +'],
      metin: 'Atropin KBB’yi geçer ancak hiyosinden az sedatiftir; bradikardi tedavisinde kullanılır, kardiyovasküler etkileri nedeniyle PONV’de kullanılmaz. [[K3 s. 301]]',
    },
    Glikopirolat: {
      amin: 'Sentetik kuaterner amin (yüklü)', renk: 'ok', gecer: false,
      ozet: ['KBB ve plasentayı GEÇMEZ (0)', 'Antiemetik 0 · Sedasyon 0 · Midriyazis 0', 'Antisiyalogog ++ · Kalp hızı ++', 'Bronkodilatasyon ++'],
      metin: 'Yüklü kuaterner yapı nedeniyle glikopirolat KBB’yi geçmez ve merkezi etkiden yoksundur; %80 değişmeden idrarla atılır. [[K3 s. 300–301]]',
    },
  };
  VIZ.a19b_antikol = (el) => SEKIL.sahne(el, {
    baslik: 'Antikolinerjiklerde yapı, KBB geçişi ve etki profili',
    vb: [640, 224], vbDar: [360, 272],
    secenek: secim('İlaç', Object.keys(antikolVeri)),
    metin: p => antikolVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = antikolVeri[secili], W = S.w;
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 72, {
          dolgu: v.renk + '-soft', renk: v.renk,
          yazi: [v.amin, v.gecer ? 'KBB ve plasentayı GEÇER' : 'KBB ve plasentayı GEÇMEZ'], lh: 21,
        }) + S.kutu(14, 96, W - 28, 162, { dolgu: 'paper', renk: 'line', yazi: v.ozet, lh: 26 });
      }
      return S.kutu(14, 24, 250, 174, {
        dolgu: v.renk + '-soft', renk: v.renk,
        yazi: [secili, v.amin, v.gecer ? 'KBB geçişi: VAR' : 'KBB geçişi: YOK'], lh: 26,
      }) + S.ok([[268, 111], [306, 111]], { renk: v.renk, w: 3 })
        + S.kutu(310, 24, 316, 174, { dolgu: 'paper', renk: 'line', yazi: v.ozet, lh: 29 });
    },
  });

  VIZ.a19b_siklizin = (el) => SEKIL.sahne(el, {
    baslik: 'Siklizinin etki mekanizması, AÖS ve preparat özellikleri',
    vb: [640, 200], vbDar: [360, 236],
    secenek: secim('Görünüm', ['Etki ve AÖS', 'Preparat ve Kinetik']),
    metin: p => p.secili === 'Etki ve AÖS'
      ? 'Siklizin H₁ antagonisti olup antikolinerjik özelliklere de sahiptir; alt özofagus sfinkter tonusunu artırır ve kalp hızını hafif artırabilir. [[K3 s. 302]]'
      : 'Parenteral preparatı pH 3,2 laktik asitle hazırlanır (İM/İV enjeksiyon ağrılı); oral biyoyararlanımı ~%75’tir. [[K3 s. 302]]',
    ciz: (S, t, { secili }) => {
      const etki = secili === 'Etki ve AÖS', W = S.w;
      const k1 = etki ? ['H₁ + antikolinerjik etki', 'Hareket · PONV · Opioid kusması'] : ['Piperazin türevi · pH 3,2', 'Laktik asit → İM/İV ağrılı'];
      const k2 = etki ? ['AÖS tonusu ↑ · Hafif KAH ↑', 'EPS ve sedasyon nadir'] : ['Oral emilim iyi · Biyoyar. ~%75', 'Kalan kinetik verisi az'];
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 100, { dolgu: 'basic-soft', renk: 'basic', yazi: k1, lh: 23 })
          + S.kutu(14, 124, W - 28, 100, { dolgu: 'paper', renk: 'line', yazi: k2, lh: 23 });
      }
      return S.kutu(14, 24, 298, 150, { dolgu: 'basic-soft', renk: 'basic', yazi: k1, lh: 27 })
        + S.kutu(328, 24, 298, 150, { dolgu: 'paper', renk: 'line', yazi: k2, lh: 27 });
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

  VIZ.a19b_5ht3 = (el) => SEKIL.adim(el, zincir('Ondansetronun periferik ve merkezi 5-HT₃ blokajı', [
    { ad: 'Salınım', satir: ['Kemoterapi / radyoterapi', 'Enterokromafin hücreden 5-HT ↑'], metin: 'Kemoterapi ve radyoterapi GİS enterokromafin hücrelerinden 5-HT salınımına neden olabilir. [[K3 s. 303]]' },
    { ad: 'Periferik', satir: ['GİS periferik 5-HT₃ uyarımı', 'Vagal aferent nöronlar uyarılır'], metin: 'Salınan 5-HT, GİS’teki periferik 5-HT₃ reseptörlerini aktive ederek vagal aferentleri uyarır. [[K3 s. 303]]' },
    { ad: 'Merkezi', satir: ['Vagal aferentler → Kusma merkezi', 'Merkezi 5-HT₃ üzerinden bağlantı'], metin: 'Vagal aferent nöronlar yine 5-HT₃ reseptörleri aracılığıyla kusma merkezine (VC) bağlanır. [[K3 s. 303]]' },
    { ad: 'Blokaj', satir: ['Periferik + merkezi 5-HT₃ blokajı', 'Uyanmadan önce · KC’de doz ↓'], metin: 'Ondansetron 5-HT₃’ü iki düzeyde antagonize eder; t½ 3 saat olup karaciğer yetmezliğinde doz azaltılmalıdır. [[K3 s. 302–303]]' },
  ]));

  VIZ.a19b_nk1 = (el) => SEKIL.sahne(el, {
    baslik: 'NK1 antagonistleri: aprepitant ve fosaprepitant',
    vb: [640, 200], vbDar: [360, 236],
    secenek: secim('Preparat', ['Aprepitant (Oral)', 'Fosaprepitant (İV ön ilaç)']),
    metin: p => p.secili.startsWith('Aprepitant')
      ? 'Aprepitant oral NK1 reseptör antagonistidir; dorsal vagal komplekste P maddesinin etkilerini bloke eder; CINV ve PONV’de kullanılır. [[K3 s. 303]]'
      : 'Fosaprepitant aprepitantın İV ön ilacıdır; ikisi de ondansetron ve deksametazonun etkilerini güçlendiriyor gibi görünür. [[K3 s. 303]]',
    ciz: (S, t, { secili }) => {
      const iv = secili.startsWith('Fosaprepitant'), W = S.w;
      const d1 = iv
        ? ['Fosaprepitant: İV ön ilaç', 'Aprepitantın parenteral formu']
        : ['Aprepitant: Oral NK1 antagonisti', 'Dorsal vagal kompleks: P maddesi bloke'];
      const d2 = ['Gecikmiş CINV’de en yararlı · PONV', 'Biyoyar. ~%60 · Prot. %97 · CYP3A4'];
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 100, { dolgu: 'clin-soft', renk: 'clin', yazi: d1, lh: 23 })
          + S.kutu(14, 124, W - 28, 100, { dolgu: 'paper', renk: 'line', yazi: d2, lh: 23 });
      }
      return S.kutu(14, 24, 298, 150, { dolgu: 'clin-soft', renk: 'clin', yazi: d1, lh: 27 })
        + S.kutu(328, 24, 298, 150, { dolgu: 'paper', renk: 'line', yazi: d2, lh: 27 });
    },
  });

  const zamVeri = {
    'Uyanık (Akupunktur)': {
      renk: 'ok', yer: 'Distal bilek kıvrımından ~4 cm uzakta',
      detay: ['Fleksör karpi radialis ve', 'palmaris longus tendonları arası', 'Uyanık hastada · Yan etkisi yok'],
      metin: 'Akupunktur PONV önlemede etkilidir; distal bilek kıvrımından ~4 cm uzaklıkta uyanık hastada uygulanmalıdır. [[K3 s. 304]]',
    },
    'Başlangıç (Deksametazon)': {
      renk: 'basic', yer: 'Anestezinin başlangıcında (3,3 mg)',
      detay: ['Başlamış kusmada etkili DEĞİL', 'Prostaglandin / endorfin / 5-HT ↓', 'Tek düşük dozda kronik yan etki yok'],
      metin: 'Deksametazon anestezi başlangıcında PONV önlemede etkilidir, başlamış kusmada etkisizdir; düşük doz (3,3 mg) yüksek doz kadar etkili görünür. [[K3 s. 303–304]]',
    },
    'Uyanma (Ondansetron)': {
      renk: 'accent', yer: 'Anesteziden uyanmadan hemen önce',
      detay: ['>2 yaş ruhsatlı · 2 mg/mL yavaş İV', 'Hareket hastalığında etkisiz', 'Dopamin agonisti kusmasında etkisiz'],
      metin: 'Ondansetron anesteziden uyanmadan hemen önce kullanılmalıdır; hareket hastalığı ve dopamin agonisti kusmasında etkisizdir. [[K3 s. 302]]',
    },
    'Kemoterapi (CINV)': {
      renk: 'warn', yer: 'Kemoterapi sonrası / beklenti bulantısı',
      detay: ['Aprepitant: gecikmiş CINV', 'Nabilon: VC · Kemoterapi sonrası', 'Lorazepam: beklenti bulantısı'],
      metin: 'Kemoterapide aprepitant gecikmiş CINV’de en yararlı görünür; nabilon kemoterapi sonrasında kullanılmıştır, lorazepam beklenti bulantısını önleyebilir. [[K3 s. 303–304]]',
    },
  };
  VIZ.a19b_zamanlama = (el) => SEKIL.sahne(el, {
    baslik: 'Antiemetiklerde uygulama yeri ve zamanlaması',
    vb: [640, 214], vbDar: [360, 256],
    secenek: secim('Zamanlama', Object.keys(zamVeri)),
    metin: p => zamVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = zamVeri[secili], W = S.w;
      return S.kutu(14, 14, W - 28, 58, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.yer, lh: 22 })
        + S.kutu(14, 88, W - 28, S.dar ? 152 : 112, { dolgu: 'paper', renk: 'line', yazi: v.detay, lh: S.dar ? 25 : 27 });
    },
  });
})();
