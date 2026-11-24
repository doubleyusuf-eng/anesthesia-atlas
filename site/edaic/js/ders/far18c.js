/* Antikonvülzanlar · K3, Türkçe çalışma çevirisi, s. 289–294. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  /* Fenitoinde doyurulabilir hidroksilasyon ve sıfırıncı derece kinetik (şematik eğri) */
  VIZ.a18c_fenitoin = (el) => SEKIL.grafik(el, {
    baslik: 'Fenitoin dozu ve plazma düzeyi (sıfırıncı derece kinetik)',
    vb: [640, 320], vbDar: [380, 350],
    x: { min: 0, max: 600, ad: 'Günlük doz (mg · şematik)', adimlar: [0, 150, 300, 450, 600] },
    y: { min: 0, max: 40, ad: 'Plazma düzeyi (μg/mL)', adimlar: [0, 10, 20, 30, 40] },
    secenek: secim('Metabolizma hızı', ['Normal hidroksilleyici', 'Yavaş hidroksilleyici (~%9)']),
    param: [{ id: 'doz', ad: 'Günlük doz', min: 100, max: 500, adim: 25, deger: 300, birim: 'mg' }],
    yatay: () => [
      { y: 10, ad: '10 μg/mL (alt sınır)', renk: 'ok' },
      { y: 20, ad: '20 μg/mL (üst sınır)', renk: 'crit' },
    ],
    egriler: [{
      renk: 'accent', ad: 'Plazma düzeyi', adYer: 0.63,
      f: (x, p) => {
        const vmax = p.secili.startsWith('Yavaş') ? 390 : 520;
        const km = 120;
        if (x >= vmax * 0.94) return 40;
        return Math.min(40, (km * x) / (vmax - x) * 0.14);
      },
    }],
    noktalar: (p) => {
      const vmax = p.secili.startsWith('Yavaş') ? 390 : 520;
      const x = p.doz;
      const y = x >= vmax * 0.94 ? 40 : Math.min(40, (120 * x) / (vmax - x) * 0.14);
      return [{ x, y, renk: y > 20 ? 'crit' : y >= 10 ? 'ok' : 'basic', ad: `${y.toFixed(1).replace('.', ',')} μg/mL` }];
    },
    okuma: (p) => {
      const yavas = p.secili.startsWith('Yavaş');
      return (yavas
        ? 'Popülasyonun yaklaşık %9’u yavaş hidroksilleyicidir; bu değişkenlik nedeniyle doz bireysel ayarlanır ve kan düzeyi ölçümü yararlıdır. [[K3 s. 289]]'
        : 'Doyurulabilir hepatik hidroksilasyon nedeniyle terapötik aralığın (10–20 μg/mL) hemen üzerinde sıfırıncı derece kinetiğe geçer. [[K3 s. 289]]');
    },
  });

  const mekVeri = {
    'Na⁺ kanalı': {
      renk: 'accent',
      kutular: [
        ['Fenitoin · Karbamazepin', 'İnaktive Na⁺ kanallarını stabilize eder'],
        ['Sodyum valproat', 'İnaktif Na⁺ + santral GABA uyarımı'],
        ['Lamotrijin', 'Glutamat/aspartat nöronlarında Na⁺ inh.'],
      ],
      metin: 'Fenitoin (karbamazepin benzer biçimde) ve valproat inaktif Na⁺ kanallarını stabilize eder; lamotrijin voltaja duyarlı Na⁺ kanallarını inaktive eder. [[K3 s. 289–291]]',
    },
    'GABA yolu': {
      renk: 'basic',
      kutular: [
        ['Benzodiazepinler', 'GABAA Cl⁻ kanalı etkisini güçlendirir'],
        ['Vigabatrin', 'GABA-transaminazı geri dönüşümsüz inhibe eder'],
        ['Valproat · Gabapentin', 'Santral GABA yolunu / düzeyini artırır'],
      ],
      metin: 'Benzodiazepinler acil status epileptikusta kullanılır; vigabatrin GABA yıkımını engeller; valproat santral GABA-erjik yolları uyarıyor, gabapentin sinaptik GABA’yı artırıyor görünür. [[K3 s. 290–292]]',
    },
    'Ca²⁺ α₂δ': {
      renk: 'ok',
      kutular: [
        ['Gabapentin', 'Presinaptik α₂δ + GABA ↑ (+ olası NMDA)'],
        ['Pregabalin', 'Presinaptik α₂δ (GABA değişmez)'],
        ['Fenitoin (ek etki)', 'Nörona Ca²⁺ girişini azaltabilir'],
      ],
      metin: 'Gabapentin ve pregabalin kortikal nöronlardaki voltaj kapılı Ca²⁺ kanallarının α₂δ alt birimine bağlanır. [[K3 s. 289]] [[K3 s. 291–292]]',
    },
  };
  VIZ.a18c_mekanizma = (el) => SEKIL.sahne(el, {
    baslik: 'Antikonvülzanların temel etki mekanizmaları',
    vb: [640, 224], vbDar: [360, 270],
    secenek: secim('Ana hedef', Object.keys(mekVeri)),
    metin: p => mekVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = mekVeri[secili], W = S.w;
      return v.kutular.map((satir, i) => {
        const y = S.dar ? 10 + i * 86 : 12 + i * 70;
        const h = S.dar ? 74 : 58;
        return S.kutu(14, y, W - 28, h, { dolgu: v.renk + '-soft', renk: v.renk, yazi: satir, lh: 22 });
      }).join('');
    },
  });

  VIZ.a18c_yeni = (el) => SEKIL.sahne(el, {
    baslik: 'Lamotrijin ve vigabatrin karşılaştırması',
    vb: [640, 200], vbDar: [360, 240],
    secenek: secim('Ajan', ['Lamotrijin', 'Vigabatrin']),
    metin: p => p.secili === 'Lamotrijin'
      ? 'Glutamat ve aspartat nöronlarında Na⁺ kanallarını inaktive eder; ek mekanizmaları olabilir. Biyoyararlanımı %98, t½ 14 saattir. [[K3 s. 291]]'
      : 'GABA-transaminazı geri dönüşümsüz inhibe ettiği düşünülür; t½ 6 saat olmasına karşın etki 24 saat sürer ve fenitoini %25’e kadar azaltır. [[K3 s. 292]]',
    ciz: (S, t, { secili }) => {
      const lam = secili === 'Lamotrijin', W = S.w;
      const sol = lam
        ? ['≥2 yaş ve erişkinde adjuvan · Bipolar', 'Glutamat/aspartat Na⁺ inaktivasyonu']
        : ['Kompleks parsiyel nöbette adjuvan', '2× maks 1,5 g · GABA-transaminaz inh.'];
      const sag = lam
        ? ['Biyoyararlanım %98 · t½ 14 sa', 'Konjuge inaktif metabolit · Deri / NMS']
        : ['t½ 6 sa · Etki süresi 24 sa', 'İdrarla değişmeden · Fenitoin %25 ↓'];
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 102, { dolgu: 'basic-soft', renk: 'basic', yazi: sol, lh: 23 })
          + S.kutu(14, 126, W - 28, 102, { dolgu: 'accent-soft', renk: 'accent', yazi: sag, lh: 23 });
      }
      return S.kutu(14, 24, 298, 150, { dolgu: 'basic-soft', renk: 'basic', yazi: sol, lh: 27 })
        + S.kutu(328, 24, 298, 150, { dolgu: 'accent-soft', renk: 'accent', yazi: sag, lh: 27 });
    },
  });

  VIZ.a18c_gaba_preg = (el) => SEKIL.sahne(el, {
    baslik: 'Gabapentin ve pregabalin karşılaştırması',
    vb: [640, 200], vbDar: [360, 240],
    secenek: secim('İlaç', ['Gabapentin', 'Pregabalin']),
    metin: p => p.secili === 'Gabapentin'
      ? 'Gabapentinin oral biyoyararlanımı ~%60 olup doz arttıkça azalır; sinaptik GABA’yı artırır ve olası NMDA antagonisti aktivitesi taşır. [[K3 s. 291–292]]'
      : 'Gabapentinin yerini almak üzere tasarlanan pregabalin %90 sabit biyoyararlanıma sahiptir (besinle gecikir) ve sinaptik GABA’yı değiştirmiyor görünür. [[K3 s. 292]]',
    ciz: (S, t, { secili }) => {
      const g = secili === 'Gabapentin', W = S.w;
      const d1 = g
        ? ['Fokal nöbet 900–1200 mg/gün', 'Nöropatik ağrı 1800 mg/gün · Premed.']
        : ['Erişkin parsiyel nöbette adjuvan', 'Anksiyete · Ca²⁺ α₂δ (GABA değişmez)'];
      const d2 = g
        ? ['Biyoyararlanım ~%60 (dozla ↓) · t½ 6 sa', 'Protein %0 · Metabolizma yok · Renal']
        : ['Biyoyararlanım %90 (besinle gecikir)', 'Protein %0 · Metabolizma yok · İdrarla'];
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 102, { dolgu: 'ok-soft', renk: 'ok', yazi: d1, lh: 23 })
          + S.kutu(14, 126, W - 28, 102, { dolgu: 'paper', renk: 'line', yazi: d2, lh: 23 });
      }
      return S.kutu(14, 24, 298, 150, { dolgu: 'ok-soft', renk: 'ok', yazi: d1, lh: 27 })
        + S.kutu(328, 24, 298, 150, { dolgu: 'paper', renk: 'line', yazi: d2, lh: 27 });
    },
  });
})();
