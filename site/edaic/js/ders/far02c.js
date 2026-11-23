(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [640, 228], vbDar: [360, 228] };

  function secim(ad, degerler) {
    return { id: 'durum', ad, liste: degerler.map(([d, etiket]) => ({ d, ad: etiket })) };
  }

  function kutu(S, x, y, w, h, yazi, renk) {
    return S.kutu(x, y, w, h, { yazi, renk, dolgu: renk + '-soft', lh: 20 });
  }

  function zincir(S, ilk, orta, son) {
    const x = S.w / 2;
    return kutu(S, x - 138, 6, 276, 46, ilk, 'basic')
      + S.ok([[x, 52], [x, 82]], { renk: 'basic' })
      + kutu(S, x - 138, 84, 276, 54, orta, 'accent')
      + S.ok([[x, 138], [x, 168]], { renk: 'accent' })
      + kutu(S, x - 138, 170, 276, 50, son, 'clin');
  }

  VIZ.a02c_idrar = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Distal tübülde idrar pH’sı ve iyon tuzaklanması',
    secenek: secim('İdrar', [['alkali', 'Alkali'], ['asidik', 'Asidik']]),
    ciz: (S, t, p) => p.durum === 'alkali'
      ? zincir(S, 'Alkali idrar + asidik ilaç', 'İyonize fraksiyon artar', 'Asidik ilaç idrarda tutulur')
      : zincir(S, 'Asidik idrar + bazik ilaç', 'Katyon olarak tuzaklanma', 'Bazik ilaç idrarda tutulur'),
    metin: p => p.durum === 'alkali'
      ? 'Alkali idrarda asidik ilacın geri emilemeyen iyonize fraksiyonu artar ve atılımı kolaylaşır. [[K3 s. 22]]'
      : 'Asidik idrarda bazik ilaç katyon halinde kalır ve öncelikle idrarla atılır. [[K3 s. 22]]',
  });

  VIZ.a02c_dongu = el => SEKIL.adim(el, {
    baslik: 'Enterohepatik dolaşımda geri dönüş ve sistemik çıkış',
    vb: [640, 274], vbDar: [360, 274], oto: false,
    ortak: (S, adim) => {
      const x = S.w / 2;
      const dugum = (y, etiket, etkin) => S.kutu(x - 96, y, 192, 40, {
        yazi: etiket, renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper',
      });
      const ok = (yol, etkin) => S.ok(yol, { renk: etkin ? 'accent' : 'muted', w: etkin ? 3 : 1.5 });
      return dugum(8, 'Karaciğer', adim === 2)
        + dugum(80, 'Safra', adim === 0)
        + dugum(152, 'İnce bağırsak', adim === 1)
        + ok([[x,48],[x,78]], adim === 0 || adim === 2)
        + ok([[x,120],[x,150]], adim === 0)
        + ok([[x-75,192],[x-75,219],[x-143,219],[x-143,28],[x-98,28]], adim > 0)
        + S.t(x-100,244,'Portal kan',{a:'middle'})
        + ok([[x+96,28],[x+145,28],[x+145,217]], adim === 2)
        + S.t(x+95,244,'Sistemik kan',{a:'middle'});
    },
    adimlar: [
      { ad: 'Safraya geçiş', metin: 'Karaciğerde konjuge edilen ilaç safrayla ince bağırsağa ulaşır. [[K3 s. 22]]' },
      { ad: 'Hidroliz', metin: 'İnce bağırsakta bakteriyel glukuronidaz konjugatı hidrolize edebilir. [[K3 s. 22]] Açığa çıkan lipitte çözünen aktif ilaç yeniden emilip portal kanla karaciğere dönebilir. [[K3 s. 22]]' },
      { ad: 'Karaciğere dönüş', metin: 'Karaciğerin tuttuğu fraksiyon yeniden konjuge edilip safraya geçer, kalanı sistemik dolaşıma katılır. [[K3 s. 22]] Döngü birçok kez yinelenebilir. [[K3 s. 22]]' },
    ],
  });

  VIZ.a02c_doz = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Azalmış renal klirenste yükleme ve idame dozları',
    secenek: secim('Dağılım hacmi', [['sabit','Aynı'], ['artmis','Artmış']]),
    ciz: (S, t, p) => {
      const x = S.w / 2;
      const aralik = S.dar ? 8 : 16;
      const w = Math.min(244, x - aralik - 4);
      const sol = x - aralik - w;
      const sag = x + aralik;
      return kutu(S, sol, 12, w, 70, ['Dağılım hacmi', p.durum === 'sabit' ? 'aynı' : 'artmış'], 'basic')
        + kutu(S, sag, 12, w, 70, ['Renal klirens', 'azalmış'], 'clin')
        + S.ok([[sol+w/2,82],[sol+w/2,116]], {renk:'basic'})
        + S.ok([[sag+w/2,82],[sag+w/2,116]], {renk:'clin'})
        + kutu(S, sol, 118, w, 94, p.durum === 'sabit'
          ? ['Yükleme dozu', 'aynı kalır'] : ['Yükleme dozu', 'daha yüksek', 'olabilir'], 'basic')
        + kutu(S, sag, 118, w, 94, ['İdame dozu ↓', 'Doz aralığı ↑', 'gerekebilir'], 'clin');
    },
    metin: p => p.durum === 'sabit'
      ? 'Görünür dağılım hacmi aynıysa yükleme dozu korunur, ancak tekrarlanan dozları azaltmak ve aralarını uzatmak gerekebilir. [[K3 s. 22]]'
      : 'Böbrek yetmezliğinde sıvı retansiyonu dağılım hacmini sıklıkla artırır, bu yüzden yükleme dozu sağlıklı kişidekinden yüksek olabilir. [[K3 s. 22]]',
  });

  VIZ.a02c_test = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Hepatik sentez ve hepatosit hasarının göstergeleri',
    secenek: secim('Test grubu', [['sentez','Sentez'], ['hasar','Hasar']]),
    ciz: (S, t, p) => p.durum === 'sentez'
      ? zincir(S, 'Sentez işlevi', ['INR veya protrombin zamanı', 've albümin'], 'Protein sentezini yansıtır')
      : zincir(S, 'Hepatosit inflamasyonu', 'Transaminaz yüksekliği', 'Sentez korunmuş olabilir'),
    metin: p => p.durum === 'sentez'
      ? 'INR (uluslararası normalleştirilmiş oran), protrombin zamanı ve albümin sentez işlevini yansıtır. [[K3 s. 23]] Akut hastalıkta sentez akut faz proteinlerine kayar, albümin bu grupta yer almadığından düzeyi düşer. [[K3 s. 23]]'
      : 'Transaminazlar inflamatuvar hasarı gösterir, belirgin inflamasyon ve yüksek transaminazlara rağmen sentez işlevi makul düzeyde kalabilir. [[K3 s. 23]]',
  });

  VIZ.a02c_yas = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Yenidoğanda ve yaşlıda böbrek işlevi',
    secenek: secim('Yaşam dönemi', [['yeni','Yenidoğan'], ['yasli','Yaşlı']]),
    ciz: (S, t, p) => p.durum === 'yeni'
      ? zincir(S, 'Böbrek işlevi olgunlaşıyor', ['Ağırlık başına kreatinin klirensi', 'erişkinin %10’undan düşük'], 'Renal atılım yavaş')
      : zincir(S, 'İlerleyen yaş', 'Böbrek işlevinde azalma', 'Kreatinin klirensinde düşüş'),
    metin: p => p.durum === 'yeni'
      ? 'Yenidoğanda renal atılım yavaştır, birim vücut ağırlığı başına kreatinin klirensi erişkin hızının %10’undan düşüktür. [[K3 s. 24]]'
      : 'Kreatinin klirensi yaşla birlikte sürekli düşer ve böbrek işlevindeki azalmayı yansıtır. [[K3 s. 24]]',
  });
})();
