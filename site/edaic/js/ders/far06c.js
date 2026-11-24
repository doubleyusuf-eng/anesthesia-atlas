(function () {
  'use strict';
  const VIZ = window.VIZ;
  const middle = {a:'middle', c:'b'};

  // SVG coordinates represent layout only. Numeric axes are deliberately omitted.
  function scene(el, title, control, states, draw) {
    return SEKIL.sahne(el, {
      baslik:title, vb:[580,225], vbDar:[340,225],
      secenek:{id:'mode', ad:control, liste:Object.keys(states).map(ad => ({d:ad, ad}))},
      ciz:(S, t, p) => draw(S, p.mode),
      metin:p => states[p.mode]
    });
  }

  function plot(S, label, fn, options = {}) {
    const x = u => 35 + u * (S.w - 62);
    const y = v => 173 - v * 126;
    const end = options.end ?? 1;
    const points = Array.from({length:81}, (_, i) => {
      const u = end * i / 80;
      return [x(u), y(fn(u))];
    });
    let svg = '';
    if (options.fill) {
      svg += S.cizgi([[x(0), y(0)], ...points, [x(end), y(0)]], {dolgu:'accent-soft', renk:'none'});
    }
    svg += S.ok([[x(0),y(0)],[x(0),30]], {renk:'muted'});
    svg += S.ok([[x(0),y(0)],[S.w-14,y(0)]], {renk:'muted'});
    svg += S.t(x(0),20,label,{c:'b'}) + S.t(S.w-16,200,'Zaman',{a:'end'});
    svg += S.cizgi(points,{renk:'accent', w:3.5});
    return {svg, x, y};
  }

  function chain(S, rows) {
    const center = S.w / 2;
    let svg = '';
    rows.forEach((row, i) => {
      const top = 9 + i * 73;
      if (i) svg += S.ok([[center, top-24],[center, top-3]],{renk:'muted'});
      svg += S.kutu(14,top,S.w-28,47,{
        yazi:row, renk:i === rows.length-1 ? 'accent' : 'line',
        dolgu:i === rows.length-1 ? 'accent-soft' : 'paper'
      });
    });
    return svg;
  }

  VIZ.a06c_alan = el => scene(el,'Alanı değiştiren zaman ağırlığı','Düşey eksen',{
    AUC:'Taralı alan C–zaman eğrisine aittir ve dozun bu alana oranı klirensi verir. [[K3 s. 65]]',
    AUMC:'Her konsantrasyonu ölçüm zamanıyla ağırlıklandırınca taralı alan AUMC olur. [[K3 s. 65]]'
  }, (S, mode) => {
    const moment = mode === 'AUMC';
    const f = u => Math.exp(-5*u) * (moment ? 10*u : 1);
    const g = plot(S,moment ? 't × C' : 'C',f,{fill:true});
    return g.svg + S.t(S.w/2,221,moment ? 'MRT = AUMC / AUC' : 'Cl = doz / AUC',middle);
  });

  VIZ.a06c_hacim = el => scene(el,'Toplam hacim tahmininin girdileri','Yöntem',{
    Vextrap:'Terminal doğruyu geriye uzatarak M konsantrasyonunu elde edin. [[K3 s. 66]]',
    Varea:'Terminal hız sabiti iki kompartımanda β, üç kompartımanda γ’dır. [[K3 s. 67]]',
    Vss:'Doz ile iki eğrinin alanı, eliminasyondan bağımsız kararlı durum hacmini verir. [[K3 s. 65–67]]'
  }, (S, mode) => chain(S,{
    Vextrap:['Terminal eliminasyon doğrusu','Kesişime karşılık gelen M','Vextrap = X / M'],
    Varea:['Doz ve konsantrasyon eğrisi','Cl = X / AUC','Varea = Cl / β = X / (AUC × β)'],
    Vss:['AUC ve AUMC','Cl × MRT','Vss = doz × AUMC / AUC²']
  }[mode]));

  VIZ.a06c_klirens = el => scene(el,'Santral hacim ile eliminasyon hız sabitinin çarpımı','İlaç',{
    Propofol:'Propofolde yaklaşık 16 L’lik santral hacim ile 0,12’lik hız sabiti dakikada yaklaşık 2 L klirens verir. [[K3 s. 67]]',
    Remifentanil:'Daha yüksek hız sabiti, daha küçük santral hacimle çarpıldığında propofolünkine yakın klirens verir. [[K3 s. 67]]'
  }, (S, mode) => chain(S,mode === 'Propofol'
    ? ['Santral hacim ≈ 16 L','k₁₀ ≈ 0,12','Cl ≈ 2 L/dk']
    : ['Santral hacim ≈ 5,1 L','k₁₀ ≈ 0,5','5,1 × 0,5 ≈ 2,5']));

  VIZ.a06c_doyma = el => scene(el,'Kapasitesi aşılan eliminasyonda birikim','İnfüzyon evresi',{
    Başlangıç:'A’da sabit hızlı infüzyon başlar ve konsantrasyon önce birinci derece kinetiğe uygun, negatif üstel bir eğri izleyerek yükselir. [[K3 s. 69]]',
    'Kapasite aşımı':'B’den sonra eliminasyon maksimum hızdadır ve yükseliş doğrusal sürer. [[K3 s. 69]] Bu geçiş genellikle karaciğer enzimlerinin doymasına bağlıdır. [[K3 s. 69]]'
  }, (S, mode) => {
    const b = 0.49;
    const rising = u => 1 - Math.exp(-2*u);
    const f = u => u <= b ? rising(u) : rising(b) + 2*Math.exp(-2*b)*(u-b);
    const saturated = mode === 'Kapasite aşımı';
    const g = plot(S,'Plazma konsantrasyonu',f,{end:saturated ? 1 : b});
    let svg = g.svg + S.t(g.x(0),199,'A',middle);
    if (saturated) svg += S.cizgi([[g.x(b),g.y(0)],[g.x(b),g.y(f(b))]],{renk:'muted',kesik:true});
    svg += S.daire(g.x(b),g.y(f(b)),4,{dolgu:'accent',renk:'accent'});
    return svg + S.t(g.x(b),g.y(f(b))-12,'B',middle);
  });

  VIZ.a06c_log = el => scene(el,'Logaritmalardan çarpıma veya bölüme','İşlem',{
    Çarpma:'Logaritmaları toplayıp antilogaritmayı alarak çarpıma dönün. [[K3 s. 69–70]]',
    Bölme:'Payın logaritmasından paydanınkini çıkarıp antilogaritmayı alın. [[K3 s. 70]]'
  }, (S, mode) => chain(S,mode === 'Çarpma'
    ? [['log 13 ≈ 1,1139', 'log 257 ≈ 2,4100'],'1,1139 + 2,4100 = 3,5239','13 × 257 = 3341']
    : [['log 13 ≈ 1,1139', 'log 257 ≈ 2,4100'],'1,1139 − 2,4100 = −1,2961','13 / 257 ≈ 0,05057']));

  VIZ.a06c_egim = el => scene(el,'Aynı üstel azalışta eksen seçimi','Düşey eksen',{
    C:'Başlangıçta konsantrasyon C₀’dır ve zamanla üstel azalır. [[K3 s. 72]]',
    'ln C':'Düşey kesişim ln C₀’ı, eğimin negatif değeri k’yı verir. [[K3 s. 72]]',
    'log C':'On tabanında kesişim log C₀, eğim ise yaklaşık −0,434k olur. [[K3 s. 72]]'
  }, (S, mode) => {
    const natural = mode === 'ln C';
    const scale = natural ? 1 : 0.434;
    const f = mode === 'C' ? u => Math.exp(-2.5*u) : u => scale*(1-0.87*u);
    const g = plot(S,mode,f);
    return g.svg + S.t(S.w/2,220,mode === 'C' ? 'C = C₀ e⁻ᵏᵗ' : natural ? 'ln C = ln C₀ − kt' : 'log C ≈ log C₀ − 0,434kt',middle);
  });
})();
