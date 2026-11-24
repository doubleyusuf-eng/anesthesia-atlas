(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortala = { a: 'middle', c: 'b' };

  function secim(ad, liste) {
    return { id: 'durum', ad, liste: liste.map(([d, etiket]) => ({ d, ad: etiket })) };
  }

  VIZ.a05_ph = el => SEKIL.sahne(el, {
    baslik: 'Midazolamın pH ile değişen halka yapısı',
    vb: [600, 190], vbDar: [360, 190],
    secenek: secim('Ortamın pH değeri', [['asit', 'pH 4'], ['fizyolojik', 'pH 7,4']]),
    ciz(S, t, p) {
      const kapali = p.durum === 'fizyolojik';
      const x = S.w / 2;
      const halka = Array.from({ length: 7 }, (_, i) => {
        const aci = (i - 1.5) * 2 * Math.PI / 7;
        return [x + 48 * Math.cos(aci), 86 + 48 * Math.sin(aci)];
      });
      if (kapali) halka.push(halka[0]);
      return S.cizgi(halka, { renk: 'accent', w: 4 }) +
        S.t(x, 91, kapali ? 'Kapalı' : 'Açık', ortala) +
        S.t(x, 164, kapali ? 'İyonize olmayan form' : 'Çözeltide iyonize form', ortala);
    },
    metin: p => p.durum === 'asit'
      ? 'pH 4’te çözeltide iyonize midazolam bulunur. [[K3 s. 46]]'
      : 'Fizyolojik pH olan 7,4’te yedi üyeli halka kapanır ve midazolam lipitte çözünür hale gelir. [[K3 s. 46]]'
  });

  const halkalar = {
    tt: { tip: ['trans', 'trans'], pay: '%58' },
    ct: { tip: ['cis', 'trans'], pay: '%36' },
    cc: { tip: ['cis', 'cis'], pay: '%6' }
  };
  function yanGorunum(S, x, tip) {
    const y = 86, ikinci = tip === 'cis' ? y - 30 : y + 30;
    return S.cizgi([[x - 48, y], [x + 48, y]], { renk: 'muted', w: 4 }) +
      S.cizgi([[x - 26, y], [x - 26, y - 30]], { renk: 'accent' }) +
      S.cizgi([[x + 26, y], [x + 26, ikinci]], { renk: 'accent' }) +
      S.daire(x - 26, y - 30, 7, { renk: 'accent', dolgu: 'accent' }) +
      S.daire(x + 26, ikinci, 7, { renk: 'accent', dolgu: 'accent' }) +
      S.t(x, 143, tip, ortala);
  }
  VIZ.a05_halka = el => SEKIL.sahne(el, {
    baslik: 'Mivakuryumda iki halkanın cis veya trans düzeni ve preparattaki payı',
    vb: [600, 194], vbDar: [360, 194],
    secenek: secim('Mivakuryum izomeri', [['tt', 'trans-trans'], ['ct', 'cis-trans'], ['cc', 'cis-cis']]),
    ciz(S, t, p) {
      const durum = halkalar[p.durum], sol = S.w * 0.26, sag = S.w - sol;
      return S.t(sol, 26, 'İlk halka', ortala) + S.t(sag, 26, 'İkinci halka', ortala) +
        yanGorunum(S, sol, durum.tip[0]) + yanGorunum(S, sag, durum.tip[1]) +
        S.t(S.w / 2, 180, 'Karışımdaki payı ' + durum.pay, ortala);
    },
    metin: p => {
      const durum = halkalar[p.durum];
      return 'Mivakuryumda ' + durum.tip.join('-') + ' izomerinin payı ' + durum.pay + ' olarak verilir. [[K3 s. 47]]';
    }
  });

  VIZ.a05_yon = el => SEKIL.sahne(el, {
    baslik: 'En küçük atom numarası arkadayken kalan üç atomun azalan atom numarası yönü',
    vb: [600, 222], vbDar: [360, 222],
    secenek: secim('Mutlak konfigürasyon', [['R', 'R (rectus)'], ['S', 'S (sinister)']]),
    ciz(S, t, p) {
      const x = S.w / 2, yon = p.durum === 'R' ? 1 : -1;
      const ust = [x, 40], orta = [x + yon * 91, 150], son = [x - yon * 91, 150];
      return [ust, orta, son].map(n => S.cizgi([[x, 107], n], { renk: 'line' })).join('') +
        S.t(x, 113, p.durum, ortala) +
        S.ok([[x + yon * 46, 53], [x + yon * 88, 113]], { renk: 'accent' }) +
        S.ok([[x + yon * 46, 159], [x - yon * 43, 159]], { renk: 'accent' }) +
        [ust, orta, son].map(([cx,cy],i) => S.kutu(cx-42,cy-16,84,32,{
          yazi:['En büyük','Ortanca','En küçük'][i], renk:'basic', dolgu:'basic-soft'
        })).join('') + S.t(x, 202, 'Öndeki üç atomun atom numarası', ortala);
    },
    metin: p => 'Merkeze doğrudan bağlı atomlardan atom numarası en küçük olanı arkaya yerleştirin. [[K3 s. 48]] ' +
      (p.durum === 'R' ? 'Kalan üçünde atom numarası saat yönünde azalırsa düzen R’dir.' :
        'Kalan üçünde atom numarası saat yönünün tersine azalırsa düzen S’dir.') + ' [[K3 s. 48]]'
  });

  VIZ.a05_karisim = el => SEKIL.sahne(el, {
    baslik: 'Bupivakain preparatında R ve S enantiyomerlerinin payı',
    vb: [600, 132], vbDar: [360, 132],
    secenek: secim('Preparat', [['rasemik', 'Rasemik bupivakain'], ['saf', 'Levobupivakain']]),
    ciz(S, t, p) {
      const rasemik = p.durum === 'rasemik', w = S.w - 48;
      return S.t(S.w / 2, 32, 'Preparatın bileşimi', ortala) +
        S.kutu(24, 54, rasemik ? w / 2 : w, 52, { r: 0, yazi: 'S', renk: 'basic', dolgu: 'basic-soft' }) +
        (rasemik ? S.kutu(S.w / 2, 54, w / 2, 52, { r: 0, yazi: 'R', renk: 'clin', dolgu: 'clin-soft' }) : '');
    },
    metin: p => p.durum === 'rasemik'
      ? 'Rasemik bupivakainde S ve R enantiyomerleri eşit yer tutar. [[K3 s. 50]]'
      : 'Levobupivakain, yalnız S enantiyomerini içeren saf preparattır. [[K3 s. 50]]'
  });
})();
