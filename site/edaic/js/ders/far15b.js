(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (ad, adlar) => ({id: 'secim', ad, liste: adlar.map(ad => ({ad, d: ad}))});
  const orta = {a: 'middle', c: 'b'};
  const boyut = {vb: [620, 220], vbDar: [360, 220]};
  function kutu(S, y, etiket, renk) {
    const w = Math.min(S.w - 32, 352);
    return S.kutu((S.w-w)/2, y, w, 49, {yazi: etiket, dolgu: renk + '-soft', renk});
  }
  function yol(S, etiketler, etkin) {
    let svg = '';
    etiketler.forEach((etiket, i) => {
      const y = 8 + i*75;
      if (i) svg += S.ok([ [S.w/2, y-23], [S.w/2, y-3]], {renk: 'muted'});
      svg += kutu(S, y, etiket, i === etkin ? 'accent' : 'basic');
    });
    return svg;
  }

  const duzeyler = {
    '> 4': ['Erken santral etkiler', ['Ağız çevresinde karıncalanma', 'Baş dönmesi · parestezi'], 'Plazma düzeyi 4 µg/ml’yi aşınca kardiyak olmayan ilk bulgular belirginleşir. [[K3 s. 247]]'],
    '> 5': ['İlerleyen santral etkiler', ['Konfüzyon · koma', 'Nöbetler'], 'Düzey 5 µg/ml üzerine çıktığında santral toksisite konfüzyon, koma ve nöbetlere ilerler. [[K3 s. 247]]'],
    '> 10': ['Kardiyovasküler toksisite', ['AV blok · miyokard depresyonu', 'Tedaviye yanıtsız hipotansiyon'], '10 µg/ml üzerinde AV blok ve miyokard depresyonuna bağlı dirençli hipotansiyon belirginleşir; santral medüller depresyon da kardiyak etkilere katkıda bulunabilir. [[K3 s. 247]]']
  };
  VIZ.a15b_vent = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Lidokain düzeyi ve toksisite', secenek: sec('Plazma düzeyi (µg/ml)', Object.keys(duzeyler)),
    ciz: (S,t,p) => {
      const [baslik,bulgu] = duzeyler[p.secim];
      return yol(S, [p.secim + ' µg/ml', baslik, bulgu], 2);
    },
    metin: p => duzeyler[p.secim][2]
  });

  const amio = ['K⁺ kanalı bloke', 'Repolarizasyon yavaş', 'Refrakter dönem uzun'];
  VIZ.a15b_amio = el => SEKIL.adim(el, {
    ...boyut, baslik: 'Amiodaronun sınıf III etkisi', oto: false,
    ortak: (S,i) => yol(S,amio,i),
    adimlar: [
      {ad: 'Kanal', metin: 'Amiodaron K⁺ kanallarını bloke eder. [[K3 s. 249]]'},
      {ad: 'Repolarizasyon', metin: 'Repolarizasyon hızı düşünce aksiyon potansiyeli daha uzun sürer. [[K3 s. 249]]'},
      {ad: 'Refrakterlik', metin: 'Aksiyon potansiyelindeki uzamaya refrakter dönemin uzaması eşlik eder. [[K3 s. 249]]'}
    ]
  });

  VIZ.a15b_iletim = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'İleti dokusunda süre karşılaştırması', secenek: sec('İlaç', ['Flekainid','Propafenon']),
    ciz: (S,t,p) => {
      const uzar = p.secim === 'Propafenon';
      const x = S.w*.12;
      const bitis = S.w*.68;
      let svg = S.t(S.w/2,24,'Aksiyon potansiyeli süresi',orta);
      for (const [i,ad] of ['İlaç öncesi',p.secim].entries()) {
        const y = 62+i*73;
        const son = bitis + (i && uzar ? S.w*.19 : 0);
        svg += S.t(x,y,ad) + S.ok([ [x,y+16],[son,y+16]],{renk: i ? 'accent' : 'muted',w:4});
      }
      return svg + S.t(S.w/2,203,uzar ? 'Refrakter dönem uzar' : 'Refrakter dönem değişmez',orta);
    },
    metin: p => p.secim === 'Flekainid'
      ? 'Flekainid faz 0’ı uzatır; toplam aksiyon potansiyeli süresi ve refrakter dönem değişmez. [[K3 s. 250]]'
      : 'Propafenonla özellikle ileti dokusunda hem aksiyon potansiyeli süresi hem refrakter dönem uzar. [[K3 s. 252]]'
  });

  VIZ.a15b_ia = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Sınıf Ia ilaçlarda toleransı sınırlayan etkiler', secenek: sec('İlaç',['Prokainamid','Disopiramid']),
    ciz: (S,t,p) => yol(S,p.secim === 'Prokainamid'
      ? ['Kronik prokainamid', 'Antinükleer faktör pozitif', 'İlaca bağlı lupus · %20–30']
      : ['Disopiramid','Antikolinerjik etkiler',['Bulanık görme · ağız kuruluğu','Bazen idrar retansiyonu']],2),
    metin: p => p.secim === 'Prokainamid'
      ? 'Kronik kullanımda lupus gelişenlerin birçoğu yavaş asetilleyicidir. [[K3 s. 251]]'
      : 'Bulanık görme, ağız kuruluğu ve zaman zaman idrar retansiyonu sıklıkla tolere edilemez. [[K3 s. 252]]'
  });

  VIZ.a15b_sotalol = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Rasemik sotalolün bileşenleri', secenek: sec('İzomer',['D-izomeri','L-izomeri']),
    ciz: (S,t,p) => {
      const merkez = S.w/2, sol = S.w*.26, sag = S.w*.74;
      const beta = p.secim === 'L-izomeri';
      let svg = kutu(S,16,p.secim,'basic');
      svg += S.ok([ [merkez,66],[sol,112]],{renk:'accent'});
      if (beta) svg += S.ok([ [merkez,66],[sag,112]],{renk:'clin'});
      return svg + S.kutu(12,117,sol*2-24,61,{yazi:'Sınıf III',renk:'accent',dolgu:'accent-soft'})
        + S.kutu(merkez+12,117,sol*2-24,61,{yazi:'β-blokaj',renk:beta?'clin':'line',dolgu:beta?'clin-soft':'paper',kesik:!beta,soluk:!beta});
    },
    metin: p => p.secim === 'D-izomeri' ? 'D-izomeri sınıf III etki sağlar. [[K3 s. 253]]' : 'L-izomeri hem sınıf III etki hem β-blokaj sağlar. [[K3 s. 253]]'
  });

  VIZ.a15b_dugum = el => SEKIL.adim(el, {
    ...boyut, baslik: 'Sinüs düğümünde pacemaker akımı', oto: false,
    adimlar: [
      {ad:'HCN kanalı', metin:'Hiperpolarizasyon HCN kanalını açar; otonom denetim altındaki hücre içi cAMP akımı düzenler. [[K3 s. 254]]', ciz: S => yol(S,['Hiperpolarizasyon','HCN kanalı açık','İçe doğru Iƒ akımı'],1)},
      {ad:'Faz 4', metin:'Na⁺ ve K⁺ ile taşınan içe doğru akım, faz 4’te pacemaker aktivitesinin oluşmasına ve hızına katkı sağlar. [[K3 s. 254]]', ciz: S => yol(S,['Na⁺ ve K⁺','İçe doğru Iƒ akımı','Faz 4 · pacemaker aktivitesi'],2)},
      {ad:'İvabradin', metin:'β-blokerler veya Ca²⁺ kanal antagonistlerinden farklı olarak seçici Iƒ blokajı, aksiyon potansiyeli süresini ve inotropiyi değiştirmeden kalp hızını azaltır. [[K3 s. 254]]', ciz: S => yol(S,['İvabradin','Seçici Iƒ blokajı',['Kalp hızı azalır','İnotropi korunur']],2)}
    ]
  });
})();
