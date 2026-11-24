(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, liste) => ({id: 'secim', ad, liste: liste.map(([d, ad]) => ({d, ad}))});
  const ortada = {a: 'middle', c: 'b'};

  const maruziyet = {
    opioid: ['Opioid', '↓', '↑'],
    alkol: ['Alkol', '↓', '↑'],
    amfetamin: ['Amfetamin', '↑', '↓']
  };
  VIZ.a09d_mak = el => SEKIL.sahne(el, {
    baslik: 'Akut ve kronik maruziyette MAK değişimi', vb: [640, 162], vbDar: [360, 162],
    secenek: secim('Madde', Object.entries(maruziyet).map(([id, veri]) => [id, veri[0]])),
    ciz: (S, t, p) => {
      const [ad, akut, kronik] = maruziyet[p.secim];
      const cx = S.w / 2, dx = S.w / 4;
      let svg = S.t(cx, 26, ad, ortada);
      [akut, kronik].forEach((yon, i) => {
        const x = i ? cx + dx : cx - dx;
        svg += S.ok([[cx, 38], [x, 69]], {renk: 'muted'});
        svg += S.kutu(x - 69, 76, 138, 70, {
          yazi: [i ? 'Kronik' : 'Akut', 'MAK ' + yon],
          dolgu: yon === '↑' ? 'warn-soft' : 'basic-soft'
        });
      });
      return svg;
    },
    metin: p => p.secim === 'amfetamin'
      ? 'Akut amfetamin alımında MAK yükselir, kronik alımda düşer. [[K3 s. 120]]'
      : maruziyet[p.secim][0] + ' akut alındığında MAK düşer, kronik kullanımda yükselir. [[K3 s. 120]]'
  });

  const olcutler = {
    omur: {ad: 'Atmosferik ömür', birim: 'yıl', deger: [114, 3.2, 1.1, 14],
      not: 'N₂O atmosferde 114 yıl kalırken sevofluranın atmosferik ömrü 1,1 yıldır.'},
    re: {ad: 'Işınımsal etkinlik', birim: 'W·m⁻²·ppb⁻¹', deger: [0.00303, 0.453, 0.351, 0.469],
      not: 'İzofluran ile desfluranın ışınımsal etkinlikleri birbirine yakındır.'},
    gwp: {ad: 'GWP₁₀₀', birim: 'CO₂’ye göre', deger: [298, 510, 130, 2540],
      not: 'Desfluranın atmosferik ömrü izofluranınkinin yaklaşık beş katıdır ve GWP₁₀₀ değeri çok daha yüksektir.'}
  };
  VIZ.a09d_cevre = el => SEKIL.sahne(el, {
    baslik: 'Dört ajanın aynı çevresel ölçütle karşılaştırılması', vb: [640, 244], vbDar: [360, 244],
    secenek: secim('Ölçüt', Object.entries(olcutler).map(([id, o]) => [id, o.ad])),
    ciz: (S, t, p) => {
      const o = olcutler[p.secim], max = Math.max(...o.deger);
      let svg = S.t(12, 24, o.ad + ' (' + o.birim + ')', {c: 'b'});
      ['Nitröz oksit', 'İzofluran', 'Sevofluran', 'Desfluran'].forEach((ad, i) => {
        const y = 55 + i * 52, xSon = 12 + (S.w - 24) * o.deger[i] / max;
        svg += S.t(12, y, ad) + S.t(S.w - 12, y, String(o.deger[i]).replace('.', ','), {a: 'end', c: 'b'});
        svg += S.cizgi([[12, y + 13], [S.w - 12, y + 13]], {renk: 'line', w: 5});
        svg += S.cizgi([[12, y + 13], [xSon, y + 13]], {renk: 'accent', w: 5});
      });
      return svg;
    },
    metin: p => olcutler[p.secim].not + ' [[K3 s. 121]]'
  });

  const kosullar = {
    kucuk: ['Küçük FRC', 'Küçük FRC’de gaz daha az seyrelir ve alveoler parsiyel basınç hızla yükselir.'],
    buyuk: ['Büyük FRC', 'Büyük FRC’de inspire edilen gaz daha fazla seyrelir ve indüksiyon yavaşlar.']
  };
  VIZ.a09d_kinetik = el => SEKIL.sahne(el, {
    baslik: 'FRC seçimine göre alveoler gazın dengeye yaklaşması', vb: [640, 222], vbDar: [360, 222],
    secenek: secim('Fonksiyonel rezidüel kapasite', Object.entries(kosullar).map(([id, k]) => [id, k[0]])),
    ciz: (S, t, p) => {
      const x = 53, sag = S.w - 18, alt = 175, ust = 54;
      let svg = S.t(12, 24, 'FA/FI') + S.ok([[x, alt], [x, 34]]) + S.ok([[x, alt], [sag, alt]]);
      svg += S.t(x - 10, ust + 5, '1', {a: 'end'}) + S.t(sag, 207, 'Zaman', {a: 'end'});
      svg += S.cizgi([[x, ust], [sag, ust]], {renk: 'muted', kesik: true});
      const orta = (alt + ust) / 2;
      svg += S.t(x - 10, orta + 5, '0,5', {a: 'end'}) + S.cizgi([[x - 4, orta], [x, orta]]);
      const hiz = p.secim === 'kucuk' ? 5 : 2;
      const egri = Array.from({length: 65}, (_, i) => {
        const u = i / 64;
        return [x + (sag - x) * u, ust + (alt - ust) * Math.exp(-hiz * u)];
      });
      return svg + S.cizgi(egri, {renk: 'accent', w: 4});
    },
    metin: p => kosullar[p.secim][1] + ' [[K3 s. 122]]'
  });

  VIZ.a09d_bag = el => SEKIL.sahne(el, {
    baslik: 'Karbon–halojen bağlarının metabolizmaya duyarlılığı', vb: [640, 126], vbDar: [360, 126],
    ciz: S => {
      const genislik = S.w / 4;
      let svg = '';
      ['C–F', 'C–Cl', 'C–Br', 'C–I'].forEach((ad, i) => {
        svg += S.kutu(i * genislik + 6, 12, genislik - 12, 42, {yazi: ad, dolgu: 'basic-soft'});
      });
      return svg + S.ok([[genislik / 2, 72], [S.w - genislik / 2, 72]], {renk: 'accent'})
        + S.t(S.w / 2, 106, 'Metabolize edilmesi kolaylaşır', ortada);
    },
    metin: () => 'C–F bağı stabildir ve çok az metabolize edilir. [[K3 s. 123]]'
  });
})();
