(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({id: 'secili', ad, liste: adlar.map(ad => ({d: ad, ad}))});
  const orta = {a:'middle', c:'b'};
  const blok = (S, y, metin, vurgu = false) => S.kutu(S.w / 2 - 140, y, 280, 42, {
    yazi: metin, dolgu: vurgu ? 'accent-soft' : 'paper', renk: vurgu ? 'accent' : 'line',
  });
  const sayi = n => n.toLocaleString('tr-TR', {useGrouping:false, maximumFractionDigits: 4});
  const sabitler = {
    'Planck': ['h', '6,626', '10⁻³⁴', 'J·s'],
    'Işık hızı': ['c', '2,998', '10⁸', 'm·s⁻¹'],
    'Avogadro': ['N<tspan baseline-shift="sub">A</tspan>', '6,022', '10²³', 'mol⁻¹'],
  };
  VIZ.fk28_sabit = el => SEKIL.sahne(el, {
    baslik: 'Sabitin katsayısı, ondalık çarpanı ve birimi', vb:[600,155], vbDar:[350,155],
    secenek: secim('Sabit', Object.keys(sabitler)),
    ciz: (S,t,p) => {
      const [ad,k,us,birim] = sabitler[p.secili], w = S.w / 3;
      const parcalar = [[k,'Katsayı'],[us,'Çarpan'],[birim,'Birim']];
      return blok(S, 8, ad+' = '+k+' × '+us+' '+birim, true) +
        parcalar.map(([deger,etiket],i) => S.t(w*(i+0.5), 91, etiket, {a:'middle',c:'m'}) +
          S.t(w*(i+0.5), 122, deger, orta)).join('');
    },
    metin: p => {
      const [,k,us,birim] = sabitler[p.secili];
      return 'Katsayı '+k+', ondalık çarpan '+us+' ve sonuç birimi '+birim+'. [[K6 s. 445]]';
    },
  });

  VIZ.fk28_birim = el => SEKIL.sahne(el, {
    baslik:'Kuvvet biriminden basınç ve iş birimlerine', vb:[600,214], vbDar:[350,214],
    secenek: secim('Kuvvetten hangi niceliğe?', ['Basınç','İş']),
    ciz: (S,t,p) => {
      const merkez = S.w / 2;
      const basinc = p.secili === 'Basınç';
      return blok(S,8,'N = kg·m·s⁻²') +
        S.ok([[merkez,51],[merkez,80]],{renk:'accent'}) +
        blok(S,82,basinc ? 'Alana böl (÷ m²)' : 'Uzunlukla çarp (× m)',true) +
        S.ok([[merkez,125],[merkez,154]],{renk:'accent'}) +
        blok(S,156,basinc ? 'Pa = kg·m⁻¹·s⁻²' : 'J = kg·m²·s⁻²');
    },
    metin: p => p.secili === 'Basınç' ? 'Kuvvetin birimindeki metreyi metrekareye bölünce geriye m⁻¹ kalır. [[K6 s. 447]]' : 'Kuvvetin birimindeki metreyi bir metreyle daha çarpınca m² elde edilir. [[K6 s. 446–447]]',
  });

  const onekler = ['a','f','p','n','μ','m','','k','M','G','T','P','E'];
  const usYaz = n => String(n).split('').map(c => c === '-' ? '⁻' : '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)]).join('');
  VIZ.fk28_onek = el => SEKIL.sahne(el, {
    baslik:'Basıncı sabit tutarak öneki değiştirme', vb:[600,175], vbDar:[350,175],
    param:[{id:'us',ad:'Önekin onluk üssü', min:-18,max:18,adim:3,deger:3}],
    ciz: (S,t,p) => {
      const birim = onekler[(p.us+18)/3]+'Pa';
      const x = u => 24 + (S.w-48)*(u+18)/36;
      return blok(S,8,'1 Pa = '+(p.us ? '10'+usYaz(-p.us) : '1')+' '+birim,true) +
        S.cizgi([[24,108],[S.w-24,108]],{renk:'line'}) +
        onekler.map((o,i) => {
          const u = (i-6)*3;
          return S.daire(x(u),108,u===p.us ? 6 : 3,{dolgu:u===p.us ? 'accent' : 'line',renk:'line'}) +
            (u===p.us ? S.t(x(u),87,o || 'Pa',orta) : '');
        }).join('') + S.t(24,149,'10⁻¹⁸',{c:'m'})+S.t(S.w-24,149,'10¹⁸',{a:'end',c:'m'});
    },
    metin: p => 'Aynı basıncı '+(onekler[(p.us+18)/3]+'Pa')+' ile yazarken sayıyı 10'+usYaz(-p.us)+' ile çarparız. [[K6 s. 448–449]]',
  });

  VIZ.fk28_basinc = el => SEKIL.grafik(el, {
    baslik:'kPa ve mmHg cinsinden aynı kısmi basınç', vb:[600,280], vbDar:[350,260],
    x:{min:0,max:1,ad:'Kısmi basınç (kPa)',adimlar:[0,1]},
    y:{min:0,max:7.5,ad:'Kısmi basınç (mmHg)',adimlar:[0,7.5]},
    param:[{id:'kpa',ad:'Kısmi basınç',min:0,max:1,adim:0.001,deger:1,birim:'kPa'}],
    egriler:[{f:x => 7.5*x,renk:'accent'}],
    noktalar:p => [{x:p.kpa,y:p.kpa*7.5}], dikey:p => [{x:p.kpa}], yatay:p => [{y:p.kpa*7.5}],
    okuma:p => sayi(p.kpa)+' kPa = '+sayi(p.kpa*1000)+' Pa ≈ '+sayi(p.kpa*7.5)+' mmHg. [[K6 s. 449]]',
  });

  VIZ.fk28_simge = el => SEKIL.sahne(el, {
    baslik:'Karbondioksit kısmi basıncının yeri', vb:[600,156], vbDar:[350,156],
    secenek:secim('Örnek yeri', ['Alveol gazı','Arter kanı']),
    ciz: (S,t,p) => {
      const alveol = p.secili === 'Alveol gazı';
      const harf = alveol ? 'A' : 'a';
      const metin = '<tspan font-style="italic">P</tspan><tspan baseline-shift="sub">'+harf+'</tspan>CO₂';
      const w = S.w/3;
      return blok(S,8,metin,true) +
        [['P','Basınç'],[harf,alveol?'Alveol':'Arter'],['CO₂','Karbondioksit']].map(([s,ad],i) =>
          S.t(w*(i+0.5),93,s,{a:'middle',c:'b',renk:i===1?'accent':'ink'}) +
          S.t(w*(i+0.5),122,ad,{a:'middle'})).join('');
    },
    metin:p => p.secili === 'Alveol gazı' ? 'Büyük A, karbondioksit kısmi basıncının alveol gazında ölçüldüğünü gösterir. [[K6 s. 450]]' : 'Küçük a, aynı gazın kısmi basıncının arter kanında ölçüldüğünü gösterir. [[K6 s. 450]]',
  });
})();
