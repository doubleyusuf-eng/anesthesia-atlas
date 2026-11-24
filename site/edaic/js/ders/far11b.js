(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle', c: 'b' };
  const secim = (ad, liste) => ({
    id: 'secili', ad, liste: liste.map(ad => ({ d: ad, ad })),
  });

  function yol(S, satirlar) {
    const x = S.w / 2;
    return satirlar.map((satir, i) => {
      const y = 6 + i * 72;
      return S.kutu(14, y, S.w - 28, 48, {
        yazi: satir, dolgu: ['basic-soft', 'paper', 'clin-soft'][i],
      }) + (i < satirlar.length - 1 ? S.ok([[x, y + 49], [x, y + 69]], { renk: 'accent' }) : '');
    }).join('');
  }

  const metabolizma = {
    Lidokain: {
      yol: ['Karaciğer', 'Dealkilasyon', 'Etkin metabolitler'],
      metin: 'Bazı metabolitler antiaritmik özellik taşır, bazıları ise lidokaine bağlı nöbetleri güçlendirebilir. [[K3 s. 177]]',
    },
    Prilokain: {
      yol: ['Karaciğer · böbrek · akciğer', 'o-Toluidin', 'Methemoglobinemi riski'],
      metin: 'Amidler arasında en hızlı metabolize edilen prilokaindir. [[K3 s. 179]] Yüksek dozlarda o-toluidin methemoglobinemiyi tetikleyebilir. [[K3 s. 179]]',
    },
  };
  VIZ.a11b_metabolizma = el => SEKIL.sahne(el, {
    baslik: 'Metabolizma yeri ve metabolit etkisi', vb: [640, 208], vbDar: [360, 208],
    secenek: secim('İlaç', Object.keys(metabolizma)),
    ciz: (S, t, p) => yol(S, metabolizma[p.secili].yol),
    metin: p => metabolizma[p.secili].metin,
  });

  VIZ.a11b_bekleme = el => SEKIL.sahne(el, {
    baslik: 'Deride yeterli anesteziye kadar bekleme', vb: [640, 156], vbDar: [360, 156],
    secenek: secim('Preparat', ['EMLA', 'Ametokain']),
    ciz: (S, t, p) => {
      const emla = p.secili === 'EMLA';
      const bas = 40, son = S.w - 40, orta = (bas + son) / 2;
      const hedef = emla ? son : orta;
      return S.t(S.w / 2, 30, emla ? 'EMLA · oklüzif örtü' : '%4 ametokain krem', merkez)
        + S.cizgi([[bas, 66], [son, 66]], { renk: 'line', w: 4 })
        + S.ok([[bas, 66], [hedef, 66]], { renk: 'clin', w: 5 })
        + S.t(bas, 99, 'Sür', merkez) + S.t(orta, 99, '30 dk', merkez) + S.t(son, 99, '60 dk', merkez)
        + S.t(S.w / 2, 139, emla ? 'En az 60 dakika beklet' : '30 dakikada uzaklaştırılabilir', merkez);
    },
    metin: p => p.secili === 'EMLA'
      ? 'Sağlam deride yeterli anestezi için krem oklüzif örtü altında en az 60 dakika kalmalıdır. [[K3 s. 177]]'
      : '%4 krem 30 dakikada iyi anestezi sağlar ve ardından uzaklaştırılabilir. [[K3 s. 180]] Etkisi 4–6 saat sürer. [[K3 s. 180]]',
  });

  VIZ.a11b_lif = el => SEKIL.sahne(el, {
    baslik: 'Ropivakainle liflere göre blok', vb: [640, 186], vbDar: [360, 186],
    secenek: secim('İnfüzyon evresi', ['Başlangıç', 'Sürekli infüzyon']),
    ciz: (S, t, p) => {
      const surekli = p.secili === 'Sürekli infüzyon';
      function lif(y, ad, durum, renk, miyelinli) {
        const hat = S.cizgi([[22, y + 35], [S.w - 22, y + 35]], { renk, w: 3 });
        const kilif = miyelinli ? [0.2, 0.4, 0.6, 0.8].map(k =>
          S.kutu(k * S.w - 18, y + 27, 36, 16, { renk, dolgu: renk + '-soft', r: 6 })).join('') : '';
        return S.t(S.w / 2, y + 12, ad, merkez) + hat + kilif
          + S.t(S.w / 2, y + 66, durum, { a: 'middle', renk });
      }
      return lif(8, 'Aβ · büyük, miyelinli motor lif', surekli ? 'C lifine benzer blok' : 'Görece korunma', surekli ? 'clin' : 'basic', true)
        + lif(96, 'C · küçük, miyelinsiz lif', surekli ? 'Aβ lifine benzer blok' : 'Aβ lifine göre daha belirgin blok', 'clin', false);
    },
    metin: p => p.secili === 'Başlangıç'
      ? 'Bupivakaine göre düşük lipit çözünürlüğü, ropivakainin büyük miyelinli Aβ liflerine geçişini azaltabilir. [[K3 s. 179]]'
      : 'İnfüzyon sürdükçe motor lifler de bloke olur ve iki lif grubunun blok dereceleri birbirine yaklaşır. [[K3 s. 179]]',
  });

  VIZ.a11b_kokain = el => SEKIL.sahne(el, {
    baslik: 'Kokainin sistemik etkileri', vb: [640, 208], vbDar: [360, 208],
    secenek: secim('Etki', ['Birleşik etkiler', 'Yüksek doz']),
    ciz: (S, t, p) => p.secili === 'Birleşik etkiler'
      ? S.kutu(14, 6, S.w - 28, 86, {
          yazi: ['SSS uyarılması', '+ uptake 1 ve MAO blokajı'], lh: 28, dolgu: 'basic-soft',
        })
        + S.ok([ [S.w / 2, 94], [S.w / 2, 125] ], { renk: 'crit' })
        + S.kutu(14, 130, S.w - 28, 64, { yazi: 'Hipertansiyon ve aritmi riski ↑', dolgu: 'crit-soft' })
      : S.kutu(14, 6, S.w - 28, 48, { yazi: 'Yüksek doz', dolgu: 'basic-soft' })
        + S.ok([ [S.w / 2, 56], [S.w / 2, 80] ], { renk: 'crit' })
        + S.kutu(14, 86, S.w - 28, 110, { dolgu: 'crit-soft' })
        + S.t(S.w / 2, 115, ['Konfüzyon · halüsinasyon', 'Nöbet · aritmi', 'Kardiyak rüptür'], { a: 'middle', lh: 28 }),
    metin: p => p.secili === 'Birleşik etkiler'
      ? 'Merkezi sinir sistemi (SSS) uyarılması ile uptake 1 ve MAO blokajı birlikte hipertansiyon ve aritmi olasılığını artırır. [[K3 s. 180]] Kokain hipertermiyi de tetikler. [[K3 s. 180]]'
      : 'Yüksek doz alımında veya uygulamasında nörolojik belirtiler, aritmiler ve kardiyak rüptür görülebilir. [[K3 s. 180]]',
  });
})();
