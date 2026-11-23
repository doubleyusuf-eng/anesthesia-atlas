(function () {
  'use strict';
  const VIZ = window.VIZ;
  const { REF } = window.VIZ_YARDIM;

  // Aynı durum düğmeleri çizimi ve kaynaklı açıklamayı birlikte değiştirir.
  function sahne(el, baslik, secim, durumlar, ciz) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 220], vbDar: [360, 220],
      secenek: { id: 'durum', ad: secim, liste: durumlar.map(({ ad }, i) => ({ d: String(i), ad })) },
      ciz: (S, t, p) => ciz(S, Number(p.durum), durumlar[p.durum]),
      metin: p => REF(durumlar[p.durum].metin),
    });
  }

  function dugum(S, y, etiket, renk) {
    const w = Math.min(S.w - 38, 380);
    return S.kutu((S.w - w) / 2, y, w, 44, { yazi: etiket, renk, dolgu: renk + '-soft' });
  }

  function zincir(S, etiketler) {
    const x = S.w / 2;
    return dugum(S, 8, etiketler[0], 'basic') + S.ok([[x, 54], [x, 80]], { renk: 'basic' })
      + dugum(S, 83, etiketler[1], 'accent') + S.ok([[x, 130], [x, 156]], { renk: 'accent' })
      + dugum(S, 160, etiketler[2], 'clin');
  }

  VIZ.f88_refleks = el => sahne(el, 'Soğuk yüz uyaranının solunum, kalp ve damarlardaki etkileri', 'Yanıt', [
    { ad: 'Solunum', yol: ['Buzlu su → trigeminal alan', 'Sıklıkla ani bir soluk', 'Apne'],
      metin: 'Solunum sıklıkla ani bir solukla durur ve bu apne akciğerlerin suyla dolmasını önler. [[K1 s. 434]]' },
    { ad: 'Kalp', yol: ['Buzlu su → trigeminal alan', 'Vagus → sinüs ve AV düğümleri', 'Bradikardi'],
      metin: 'Vagus, sinüs düğümündeki uyarı sıklığını azaltır ve AV düğümden iletimi yavaşlatır. [[K1 s. 434]]' },
    { ad: 'Damarlar', yol: ['Buzlu su → trigeminal alan', 'Periferik vazokonstriksiyon', 'Kan kalbe ve beyne yönelir'],
      metin: 'Periferik damarların daralması kanı çevre dokulardan kalbe ve beyne yönlendirerek bu organların perfüzyonunu destekler. [[K1 s. 434]]' },
  ], (S, i, durum) => zincir(S, durum.yol));

  VIZ.f88_su = el => sahne(el, 'Karada ve baş dışarıda sudayken kanın dağılımı', 'Ortam', [
    { ad: 'Karada', metin: 'Karada yerçekimi kanın bacak venlerinde göllenmesine neden olur. [[K1 s. 434]]' },
    { ad: 'Suda', metin: 'Su bacaklara dışarıdan basınç uygular, göllenmiş kan kalbe döner ve kalp duvarları gerilir. [[K1 s. 434]]' },
  ], (S, suda) => {
    const x = S.w / 2, yon = suda ? [[x, 153], [x, 70]] : [[x, 70], [x, 153]];
    return dugum(S, 16, 'Kalp', 'clin') + dugum(S, 162, 'Bacak venleri', 'basic')
      + S.ok(yon, { renk: 'accent', w: 4 })
      + S.t(x + 14, 107, suda ? ['Venöz', 'dönüş'] : ['Venöz', 'göllenme']);
  });

  VIZ.f88_nefes = el => sahne(el, 'Dalış boyunca akciğerde kalan havanın göreli hacmi', 'Evre', [
    { ad: 'Başlangıç', hacim: 1, metin: 'Kesikli çizgi, nefes tutarak dalıştan hemen önceki hava hacmini gösterir. [[K1 s. 434–435]]' },
    { ad: 'Derinde', hacim: 0.54, metin: 'Ortam basıncı yükseldikçe aynı nefesin kapladığı hacim küçülür. [[K1 s. 434–435]]' },
    { ad: 'Yüzeye dönüş', hacim: 0.94, metin: 'Hava yeniden genişler, ancak dalıştaki net gaz kaybı nedeniyle başlangıç hacmine tam ulaşmaz. [[K1 s. 435]]' },
  ], (S, i, durum) => {
    const x = S.w / 2, taban = 184, baslangic = 112, yukseklik = baslangic * durum.hacim;
    return S.t(x, 30, 'Akciğerdeki hava hacmi', { a: 'middle', c: 'b' })
      + S.kutu(x - 70, taban - yukseklik, 140, yukseklik, { renk: 'basic', dolgu: 'basic-soft', r: 3 })
      + S.cizgi([[x - 116, taban - baslangic], [x + 116, taban - baslangic]], { kesik: true })
      + S.t(x, 209, durum.ad, { a: 'middle' });
  });

  VIZ.f88_scuba = el => sahne(el, 'SCUBA sırasında gaz yoğunluğu, azot narkozu ve oksijen toksisitesi', 'Gaz etkisi', [
    { ad: 'Yoğunluk', yol: ['Daha yoğun gaz', 'İnspirasyonda türbülans ↑', 'Solunum işi ↑'],
      metin: 'Helyumun yoğunluğu azottan düşüktür, bu nedenle Helioks yoğun gaza bağlı solunum yükünü hafifletir. [[K1 s. 435]]' },
    { ad: 'N₂ narkozu', yol: ['Çok yüksek N₂ basıncı', 'Merkezi sinir sistemine etki', 'Öforiden komaya'],
      metin: 'Narkozda hareketlerin uyumu ve dikkati sürdürme becerisi bozulabilir. [[K1 s. 435]]' },
    { ad: 'O₂ toksisitesi', yol: ['Yüksek O₂ parsiyel basıncı', 'Akciğer ve sinir sistemi', 'Akut hasar, nöbet, bilinç kaybı'],
      metin: 'Dalış derinliği, O₂ maruziyetini sınırlamak için hesaplanan azami su altı süresini belirler. [[K1 s. 435]]' },
  ], (S, i, durum) => zincir(S, durum.yol));

  VIZ.f88_azot = el => sahne(el, 'Dalışta azotun dokulara geçişi, uzaklaşması ve kabarcıklaşması', 'Dalış evresi', [
    { ad: 'Derinde', metin: 'Yüksek parsiyel basınçta solunan N₂ alveolden kana geçer ve dokularda birikir. [[K1 s. 435]]' },
    { ad: 'Aşamalı çıkış', metin: 'Yavaş basınç düşüşü dengeye ulaşmak için zaman kazandırır ve N₂ dokudan uzaklaşır. [[K1 s. 435]]' },
    { ad: 'Hızlı çıkış', metin: 'Ani basınç düşüşünde çözünmüş azot eklemlerde ve dolaşımda gaz kabarcıkları oluşturabilir. [[K1 s. 435]]' },
  ], (S, i) => {
    if (i < 2) return zincir(S, i === 0 ? ['Alveol', 'Kan', 'Dokuda çözünmüş N₂'] : ['Dokuda çözünmüş N₂', 'Kan', 'Alveol']);
    const x = S.w / 2;
    return dugum(S, 8, 'Çözünmüş N₂', 'basic')
      + S.ok([[x, 55], [x, 81]], { renk: 'basic' })
      + S.daire(x - 17, 112, 13, { renk: 'clin', dolgu: 'clin-soft' })
      + S.daire(x + 8, 98, 8, { renk: 'clin' }) + S.daire(x + 18, 119, 9, { renk: 'clin' })
      + S.t(x, 154, 'Gaz kabarcıkları', { a: 'middle', c: 'b' })
      + S.t(x, 188, ['Eklemler · Pulmoner dolaşım', 'Arteriyel dolaşım'], { a: 'middle' });
  });
})();
