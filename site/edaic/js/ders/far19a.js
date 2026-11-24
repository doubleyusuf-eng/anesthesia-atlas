/* Bulantı-kusma fizyolojisi ve dopamin antagonistleri · K3, Türkçe çalışma çevirisi, s. 295–300. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
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

  VIZ.a19a_refleks = (el) => SEKIL.adim(el, zincir('Kusma refleksinin nöral girdi ve çıkışları', [
    { ad: 'CTZ', satir: ['Area postrema (4. ventrikül tabanı)', 'KBB dışında · D₂ ve 5-HT zengin'], metin: 'Kemoreseptör tetikleme bölgesi (CTZ) işlevsel olarak kan–beyin bariyeri dışındadır ve VC’ye önemli girdiler sağlar. [[K3 s. 295]]' },
    { ad: 'Vestibüler', satir: ['Vestibüler aparat girdisi', 'Nöral iletimde ACh önemli'], metin: 'Vestibüler aparattan gelen nöral iletimde asetilkolin (ACh) önemlidir. [[K3 s. 295]]' },
    { ad: 'Kusma merkezi', satir: ['Medullada efektör nöron topluluğu', 'Ayrı anatomik yerleşimi yoktur'], metin: 'Kusma merkezi (VC) medullada kusmayı koordine eden efektör nöron topluluğudur; tedavi buraya ulaşan aferent girdiyi azaltmayı amaçlar. [[K3 s. 295]]' },
    { ad: 'Refleks çıkışı', satir: ['Vagus · Frenik sinirler', 'Karın kasları spinal motor nöronları'], metin: 'VC bu çıkışlara projekte olur ve birlikte etki ettiklerinde kusma refleksini oluşturur. [[K3 s. 295]]' },
  ]));

  const etkiTablo = {
    Klorpromazin: { sed: 3, ak: 2, eps: 2, sinif: 'Fenotiyazin (propilamin)', not: 'Geniş reseptör blokajı; α blokajıyla hipotansiyon, oral biyoyararlanım ~%30. [[K3 s. 296–298]]' },
    Proklorperazin: { sed: 1, ak: 1, eps: 3, sinif: 'Fenotiyazin (piperazin)', not: 'Bu sınıfta ekstrapiramidal etkiler daha sık (akut distoni, akatizi); oral biyoyararlanım çok düşük. [[K3 s. 297–298]]' },
    Droperidol: { sed: 1, ak: 0, eps: 2, sinif: 'Butirofenon', not: 'CTZ D₂ blokajı; yüksek dozda >12 saat sonra EPS, %25’e varan hastada 48 saate kadar anksiyete. [[K3 s. 298–299]]' },
    Domperidon: { sed: 1, ak: 0, eps: 0, sinif: 'D₂ antagonisti (periferik)', not: 'Kan–beyin bariyerini geçmez; EPS olasılığı daha düşük, İV formu aritmiler nedeniyle çekilmiş. [[K3 s. 298–299]]' },
    Metoklopramid: { sed: 1, ak: 0, eps: 2, sinif: 'Benzamid', not: 'D₂ + 5-HT₃ antagonizması ve prokinetik etki; 72 saate kadar EPS (genç kadında 5000’de 1). [[K3 s. 298–299]]' },
  };
  VIZ.a19a_etkiler = (el) => SEKIL.sahne(el, {
    baslik: 'Dopamin antagonistlerinin yan etki profili',
    vb: [640, 224], vbDar: [360, 240],
    secenek: secim('İlaç', Object.keys(etkiTablo)),
    metin: p => etkiTablo[p.secili].not,
    ciz: (S, t, { secili }) => {
      const v = etkiTablo[secili], W = S.w;
      const satirlar = [
        ['Sedasyon', v.sed, 'basic'],
        ['Antikolinerjik', v.ak, 'warn'],
        ['Ekstrapiramidal', v.eps, 'crit'],
      ];
      let svg = S.t(W / 2, 26, `${secili} · ${v.sinif}`, { a: 'middle', c: 'b' });
      satirlar.forEach(([ad, sev, renk], i) => {
        const y = 58 + i * 54;
        const bx = S.dar ? 156 : 210, bw = S.dar ? 178 : 340, kW = (bw - 12) / 3;
        svg += S.t(S.dar ? 18 : 40, y + 20, ad, { c: 'b' });
        if (sev === 0) {
          svg += S.kutu(bx, y, bw, 32, { dolgu: 'chip', renk: 'line', yazi: '0 (yok / minimal)', yc: 'k m' });
        } else {
          for (let j = 0; j < 3; j++) {
            const on = j < sev;
            svg += S.kutu(bx + j * (kW + 6), y, kW, 32, {
              dolgu: on ? renk + '-soft' : 'paper',
              renk: on ? renk : 'line',
              w: on ? 2.2 : 1,
              yazi: on && j === sev - 1 ? '+'.repeat(sev) : '',
              yc: 'b k',
            });
          }
        }
      });
      return svg;
    },
  });

  const kbbVeri = {
    Domperidon: {
      gecer: false, renk: 'ok',
      ctz: ['D₂ antagonisti', 'Tablet veya supozituvar'],
      mss: ['KBB’yi GEÇMEZ', 'EPS olasılığı düşük · Prolaktin ↑'],
      metin: 'Domperidon kan–beyin bariyerini geçmediğinden ekstrapiramidal etkilere yol açma olasılığı daha düşüktür; yalnız tablet veya supozituvar bulunur. [[K3 s. 299]]',
    },
    Droperidol: {
      gecer: true, renk: 'warn',
      ctz: ['CTZ’de D₂ antagonisti', 'Düşük doz (0,625–1,25 mg) BK ruhsatı'],
      mss: ['KBB’yi geçer · EPS > 12 sa sonra olabilir', '%25’e kadar hastada 48 saate anksiyete'],
      metin: 'Droperidol CTZ’deki D₂ reseptörlerini antagonize eder; merkezi etkileri (sedasyon, EPS) vardır, EPS yüksek dozla artar; QT uzaması/VT kaygısı sonrası düşük doz PONV için BK ruhsatı yeniden verilmiştir. [[K3 s. 298–299]]',
    },
    Metoklopramid: {
      gecer: true, renk: 'accent',
      ctz: ['CTZ D₂ + 5-HT₃ blokajı', 'Midede prokinetik etki'],
      mss: ['KBB’yi geçer · 72 saate kadar EPS', 'Genç kadınlarda daha sık (1 / 5000)'],
      metin: 'Metoklopramid kan–beyin bariyerini geçer ve uygulamadan sonra 72 saate kadar ekstrapiramidal etkileri tetikleyebilir. [[K3 s. 299]]',
    },
  };
  VIZ.a19a_kbb = (el) => SEKIL.sahne(el, {
    baslik: 'Kan–beyin bariyeri geçişi ve ekstrapiramidal risk',
    vb: [640, 214], vbDar: [360, 266],
    secenek: secim('İlaç', Object.keys(kbbVeri)),
    metin: p => kbbVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = kbbVeri[secili], W = S.w;
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 78, { dolgu: 'basic-soft', renk: 'basic', yazi: ['CTZ (KBB dışı)', ...v.ctz], lh: 20 })
          + S.cizgi([[24, 106], [W - 24, 106]], { renk: v.gecer ? 'warn' : 'ok', w: 4, kesik: v.gecer })
          + S.t(W / 2, 126, v.gecer ? 'Kan–beyin bariyerini GEÇER ↓' : 'Kan–beyin bariyerini GEÇMEZ ✕', { a: 'middle', c: 'b k', renk: v.gecer ? 'warn' : 'ok' })
          + S.kutu(14, 140, W - 28, 114, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.mss, lh: 23 });
      }
      return S.kutu(16, 26, 250, 160, { dolgu: 'basic-soft', renk: 'basic', yazi: ['KBB Dışı: CTZ', ...v.ctz], lh: 24 })
        + (v.gecer
          ? S.ok([[270, 106], [344, 106]], { renk: v.renk, w: 4 }) + S.t(307, 94, 'KBB geçer', { a: 'middle', c: 'b k', renk: v.renk })
          : S.cizgi([[307, 36], [307, 176]], { renk: 'ok', w: 5 }) + S.t(307, 26, 'KBB sınırı', { a: 'middle', c: 'b k', renk: 'ok' }))
        + S.kutu(350, 26, 274, 160, { dolgu: v.renk + '-soft', renk: v.renk, yazi: ['MSS / Bazal Ganglia', ...v.mss], lh: 24 });
    },
  });

  VIZ.a19a_meto = (el) => SEKIL.adim(el, zincir('Metoklopramidin zamanlama ve güvenlik profili', [
    { ad: 'Zamanlama', satir: ['Anestezi sonunda 20 mg en etkili', 'Çalışmaların ~yarısında plasebo kadar'], metin: 'Metoklopramid indüksiyonda verilmek yerine anestezinin sonunda 20 mg verildiğinde en etkili gibi görünmektedir. [[K3 s. 299]]' },
    { ad: 'Hedefler', satir: ['CTZ D₂ + 5-HT₃ blokajı', 'Midede prokinetik etki'], metin: 'Antiemetik etkisini başlıca CTZ D₂ antagonizmasıyla gösterir; 5-HT₃ blokajı da bu özelliğin bir kısmını açıklayabilir. [[K3 s. 299]]' },
    { ad: 'Hızlı İV', satir: ['Hipotansiyon · Taşikardi · Bradikardi', '10–20 mg İM sonrası ara sıra ajitasyon'], metin: 'Hızlı intravenöz uygulamadan sonra hipotansiyon, taşikardi ve bradikardi bildirilmiştir. [[K3 s. 299]]' },
    { ad: 'Kinetik / EPS', satir: ['Oral biyoyararlanım %30–90 (değişken)', '72 saate kadar EPS (genç kadın 1/5000)'], metin: 'Oral biyoyararlanım değişken ilk geçişe bağlıdır; karaciğerde konjuge edilir ve değişmemiş ilaçla birlikte idrarla atılır; nadiren NMS tetikleyebilir. [[K3 s. 299–300]]' },
  ]));
})();
