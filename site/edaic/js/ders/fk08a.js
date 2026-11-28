(() => {
  'use strict';
  const VIZ = window.VIZ;
  const yaz = (n, basamak = 2) => n.toLocaleString('tr-TR', {maximumFractionDigits: basamak, useGrouping: false});
  const boyut = dar => [dar ? 320 : 550, 208];
  const ortala = {a: 'middle', c: 'b'};
  const param = (id, ad, min, max, adim, deger, birim) => ({id, ad, min, max, adim, deger, birim});
  const secim = (ad, liste) => ({id: 'secili', ad, liste: liste.map(d => ({d, ad: d}))});

  VIZ.fk08a_debi = el => SEKIL.sahne(el, {
    baslik: 'Aynı debide iki kesit ve ortalama hız okları', vb: boyut,
    param: [param('r', 'Çıkış yarıçapı', 1, 1.5, 0.01, 1.5, 'cm')],
    ciz: (S, t, {r}) => {
      const x = n => S.w * n, h = 42 * r / 1.5, y = 99;
      let s = '';
      for (const yon of [-1, 1]) {
        s += S.cizgi([[8,y + yon*42],[x(0.4),y + yon*42],[x(0.6),y + yon*h],[S.w-8,y + yon*h]], {renk:'ink', w:3});
      }
      const ok = (a, uzunluk) => S.ok([[a,y],[a + uzunluk,y]], {renk:'accent',w:3});
      return s + ok(x(0.11),x(0.12)) + ok(x(0.63),x(0.12)*(1.5/r)**2)
        + S.t(x(0.24),32,'Giriş',ortala) + S.t(x(0.75),32,'Çıkış',ortala)
        + S.t(x(0.24),173,'r = 1,5 cm',ortala) + S.t(x(0.75),173,'r = '+yaz(r)+' cm',ortala);
    },
    metin: ({r}) => `Debi 6 L/dk iken çıkış alanı ${yaz(Math.PI*r*r)} cm², ortalama hız ${yaz(100/(Math.PI*r*r),1)} cm/s olur; ok uzunlukları ortalama hızlarla orantılıdır. [[K6 s. 137–138]]`,
  });

  VIZ.fk08a_profil = el => SEKIL.sahne(el, {
    baslik:'Laminer akımın boyuna kesitinde farklı hızdaki tabakalar', vb: boyut,
    secenek:secim('İncelenen tabaka', ['Merkez','Duvara yakın']),
    ciz:(S,t,{secili}) => {
      const merkez = secili === 'Merkez';
      let s = S.t(S.w/2,24,'Tüpün boyuna kesiti',ortala);
      for (const y of [52,170]) s += S.cizgi([[12,y],[S.w-12,y]],{w:3});
      for (let i = -3; i <= 3; i++) {
        const y = 111+i*17, boy = (1-(i/3.5)**2)*S.w*0.68;
        const seciliMi = merkez ? i === 0 : Math.abs(i) === 3;
        s += S.ok([ [S.w*0.13,y],[S.w*0.13+boy,y]],{renk:seciliMi?'accent':'muted',w:seciliMi?4:1.5});
      }
      return s;
    },
    metin: ({secili}) => secili === 'Merkez' ? 'Merkezdeki uzun ok en hızlı tabakayı gösterir; oklar hız sırasını şematik olarak verir. [[K6 s. 138–139]]' : 'Duvar komşuluğunda sürtünme nedeniyle tabakalar yavaş ilerler; kısa oklar bu bölgeyi gösterir. [[K6 s. 138]]',
  });

  VIZ.fk08a_tup = el => SEKIL.grafik(el, {
    baslik:'Tüp yarıçapı ile laminer debi arasındaki ilişki', vb: boyut,
    x:{min:1,max:2,ad:'Yarıçap / ilk yarıçap',adimlar:[1,1.5,2]},
    y:{min:0,max:16,ad:'Debi / ilk debi',adimlar:[0,4,8,12,16]},
    param:[param('r','Yarıçap oranı',1,2,0.01,2,'kat'),param('l','Uzunluk oranı',1,16,1,1,'kat')],
    egriler:[{f:(r,p) => r**4/p.l, renk:'accent'}],
    noktalar:p => [{x:p.r,y:p.r**4/p.l}],
    okuma:p => `Basınç farkı ve viskozite sabitken seçilen tüpün debisi başlangıcın ${yaz(p.r**4/p.l,3)} katı, direnci ${yaz(p.l/p.r**4,3)} katıdır. [[K6 s. 141–142]]`,
  });

  const re = v => 1000*0.02*v/0.00089;
  VIZ.fk08a_re = el => SEKIL.sahne(el, {
    baslik:'Hızla değişen Reynolds sayısı ve şematik akım yolları', vb: boyut,
    param:[param('v','Ortalama hız',0.01,0.2,0.001,0.2,'m/s')],
    ciz:(S,t,{v}) => {
      const n = re(v), genislik = S.w - 24;
      let s = S.t(S.w/2,33,'Re ≈ '+yaz(n,0),ortala);
      for (const y of [61,157]) s += S.cizgi([[12,y],[S.w-12,y]],{w:3});
      for (let iz = -1; iz <= 1; iz++) {
        const yol = [];
        for (let k = 0; k <= 140; k++) {
          const u = k/140, evre = u*18+iz*1.1;
          const zarf = Math.sin(Math.PI*u)**2;
          const genlik = n < 2000 ? 0 : n <= 4000 ? (iz === -1 ? 9 : 0) : 15;
          const dx = genlik*zarf*Math.sin(evre*1.7);
          const dy = genlik*zarf*(Math.cos(evre*1.7)+0.4*Math.sin(evre*2.5));
          yol.push([12+genislik*u+dx,109+iz*23+dy]);
        }
        s += S.ok(yol,{renk:iz === 0?'accent':'basic',w:2});
      }
      return s + S.t(S.w/2,189,n < 2000 ? 'Laminer baskın' : n <= 4000 ? 'Geçiş bölgesi' : 'Türbülans baskın',ortala);
    },
    metin:({v}) => `Çap 0,02 m, yoğunluk 1000 kg/m³ ve viskozite 8,9 × 10⁻⁴ Pa·s için ${yaz(v,3)} m/s hızda Re ≈ ${yaz(re(v),0)} bulunur; yollar her rejimin şematik gösterimidir. [[K6 s. 142–144]]`,
  });

  VIZ.fk08a_basinc = el => SEKIL.grafik(el, {
    baslik:'Başlangıç değerlerine göre laminer ve türbülanslı basınç–akım eğrileri', vb:boyut,
    x:{min:0,max:2,ad:'Debi / referans debi',adimlar:[0,1,2]},
    y:{min:0,max:4,ad:'ΔP / referans ΔP',adimlar:[0,1,2,4]},
    param:[param('q','Debi oranı',0,2,0.01,2,'kat')],
    egriler:[{f:q => q,renk:'basic',kesik:true},{f:q => q*q,renk:'accent'}],
    noktalar:({q}) => [{x:q,y:q,renk:'basic'},{x:q,y:q*q,renk:'accent'}],
    okuma:({q}) => `Her rejim kendi referans değerine göre gösterilir: ${yaz(q)} kat debide gereken basınç farkı laminer doğru üzerinde (kesikli) ${yaz(q)} kat, türbülans eğrisinde (sürekli) ${yaz(q*q,3)} kattır. [[K6 s. 140–141]] [[K6 s. 145]]`,
  });

  VIZ.fk08a_baglanti = el => SEKIL.cizim(el, {
    baslik:'Yumuşak kavisli ve keskin dirsekli solunum bağlantılarının kesiti',
    giris:'Gazın soldan girip aşağıya yöneldiği iki örnekte dönüşleri karşılaştırın. [[K6 s. 145–146]]',
    gorunumler:[{ad:'İç yol',resim:'img/fizik/08a-baglanti.webp',en:1024,boy:512,noktalar:[
      {x:355,y:168,ad:'Yumuşak kavis',metin:'İyi tasarlanmış bir kateter bağlantısında akımın laminer kalması beklenir. [[K6 s. 146]]'},
      {x:858,y:189,ad:'Keskin iç köşe',metin:'Dik açılı birleşimin köşesinde girdaplar oluşabilir ve devrenin direnci artabilir. [[K6 s. 145–146]]'},
    ]}],
  });
})();
