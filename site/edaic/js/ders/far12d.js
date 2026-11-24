(function () {
  'use strict';
  const VIZ = window.VIZ;
  const alan = { vb: [560, 235], vbDar: [360, 235] };

  function etiket(S, y, metin) {
    return S.t(S.w / 2, y, metin, { a: 'middle', c: 'b' });
  }

  VIZ.a12d_enzim = el => SEKIL.adim(el, {
    ...alan, baslik: 'AChE aktif bölgesinde substrat ve edrofonyum', oto: false,
    ortak: (S, i) => {
      const x = S.w / 2;
      const ad = ['Asetilkolin', 'Edrofonyum', 'ACh veya edrofonyum'][i];
      return S.kutu(x-152, 118, 304, 91, { dolgu: 'basic-soft', renk: 'basic' })
        + etiket(S, 192, 'Asetilkolinesteraz')
        + S.rozet(x-75, 135, 'Anyonik bölge', { w: 134 })
        + S.rozet(x+75, 135, 'Esteratik bölge', { w: 138 })
        + S.kutu(x-104, 12, 208, 40, { yazi: ad, renk: 'clin', dolgu: 'clin-soft' })
        + (i === 1
          ? S.cizgi([[x-75,52],[x-75,121]], { renk:'clin', kesik:true })
            + S.cizgi([[x+75,52],[x+75,121]], { renk:'clin', kesik:true })
            + S.t(x-85,89,'N⁺',{a:'end'}) + S.t(x+85,89,'OH')
          : S.ok([[x,57],[x,113]], { renk:'clin', cift:i === 2 }));
    },
    adimlar: [
      { ad:'Substrat', metin:'ACh aktif bölgeye ulaşınca AChE tarafından hidrolize edilir. [[K3 s. 199]]' },
      { ad:'Bağlanma', metin:'Edrofonyumun kuaterner amin grubu anyonik bölgeye çekilir, hidroksil grubu esteratik bölgeyle hidrojen bağı kurar. [[K3 s. 199]] Böylece kompleks kararlı hâle gelir ve ACh aktif bölgeye erişemez. [[K3 s. 199]]' },
      { ad:'Yarışma', metin:'Kovalent bağ oluşmadığı için ACh enzim için edrofonyumla yarışabilir. [[K3 s. 199–200]] Edrofonyum ayrıca ACh salınımını artırır. [[K3 s. 200]]' }
    ]
  });

  function zincir(S, basamaklar) {
    const x = S.w / 2;
    return basamaklar.map((ad, i) => {
      const y = 8 + i * 78;
      const ok = i ? S.ok([[x,y-25],[x,y-4]], { renk:'muted' }) : '';
      return ok + S.kutu(x-145,y,290,49,{
        yazi:ad, renk:i === 2 ? 'clin':'basic', dolgu:i === 2 ? 'clin-soft':'basic-soft'
      });
    }).join('');
  }

  VIZ.a12d_karbamat = el => SEKIL.sahne(el, {
    ...alan, baslik:'Substrata göre AChE’nin dönüşümü',
    secenek:{ id:'substrat', ad:'Enzimle tepkimeye giren madde', liste:[
      { d:'ach', ad:'Asetilkolin' }, { d:'ester', ad:'Karbamat esteri' }
    ] },
    ciz:(S,t,p) => zincir(S,p.substrat === 'ach'
      ? ['ACh + enzim', 'Asetillenmiş AChE', 'Hidroliz daha hızlı']
      : ['Karbamat esteri + enzim', 'Karbamillenmiş AChE', 'Hidroliz çok daha yavaş']),
    metin:p => p.substrat === 'ach'
      ? 'Her iki substrat da enzimle tepkimede hidrolize olur, ancak ACh enzime asetil grubu aktarır. [[K3 s. 200]]'
      : 'Karbamil grubunun yavaş hidrolizi enzimi uzun süre işlevsiz bırakır, bu sırada ACh yıkılamaz. [[K3 s. 200]]'
  });

  VIZ.a12d_fosfat = el => SEKIL.sahne(el, {
    ...alan, baslik:'Fosforillenmiş enzimin iki farklı sonucu',
    secenek:{ id:'yol', ad:'Düzelme yolu', liste:[{d:'sentez',ad:'Yeni enzim'},{d:'oksim',ad:'Oksim etkisi'}] },
    ciz:(S,t,p) => zincir(S,['Fosforillenmiş AChE',
      p.yol === 'sentez' ? 'Kararlı kompleks' : 'Oksimle hidroliz',
      p.yol === 'sentez' ? 'İşlev için yeni enzim sentezi' : 'Mevcut enzimin reaktivasyonu']),
    metin:p => p.yol === 'sentez'
      ? 'Karbamil kompleksine göre fosforillenmiş kompleks çok kararlıdır, bu yüzden düzelme pratikte yeni enzim sentezine bağlıdır. [[K3 s. 202]]'
      : 'Pralidoksim ve kitabın “obidoksin” diye adlandırdığı oksim hidrolizi destekleyerek fosforillenmiş enzimi yeniden etkinleştirir. [[K3 s. 203]]'
  });

  const halkalar = {
    alfa: { ad:'α', sayi:6 }, beta:{ ad:'β', sayi:7 }, gama:{ ad:'γ', sayi:8 }
  };
  VIZ.a12d_halka = el => SEKIL.sahne(el, {
    ...alan, baslik:'Siklodekstrin halkasında şeker sayısı ve bağlanma boşluğu',
    secenek:{ id:'tur', ad:'Halka türü', liste:Object.entries(halkalar).map(([d,h]) => ({ d, ad:h.ad })) },
    ciz:(S,t,p) => {
      const h = halkalar[p.tur], x = S.w/2, y = 108, r = 67;
      let svg = S.daire(x,y,r,{dolgu:'accent-soft',renk:'basic',w:4});
      for (let i=0;i<h.sayi;i++) {
        const a = i*2*Math.PI/h.sayi-Math.PI/2;
        svg += S.daire(x+r*Math.cos(a),y+r*Math.sin(a),12,{dolgu:'basic-soft',renk:'basic'});
      }
      return svg + (p.tur === 'gama'
        ? S.kutu(x-55,y-17,110,34,{yazi:'Rokuronyum',dolgu:'clin-soft',renk:'clin'})
        : S.t(x,y,['Hidrofobik','boşluk'],{a:'middle'}))
        + etiket(S,217,h.ad+' · '+h.sayi+' şeker');
    },
    metin:p => p.tur === 'gama'
      ? 'Sugammadeks sekiz şekerli γ halkasında rokuronyumu veya vekuronyumu tutar. [[K3 s. 203]]'
      : halkalar[p.tur].ad+' halkasında '+halkalar[p.tur].sayi+' şeker vardır, çevredeki daireler bu şekerleri gösterir. [[K3 s. 203]]'
  });

  const dozlar = {
    post:{ ad:'Posttetanik', bulgu:'Posttetanik seğirme var', doz:'4 mg.kg⁻¹', tur:'Rutin geri döndürme',
      metin:'Bir miktar posttetanik seğirme aktivitesi varsa rokuronyum veya vekuronyum bloğu için 4 mg.kg⁻¹ sugammadeks kullanılır. [[K3 s. 203]]' },
    t2:{ ad:'TOF · T2', bulgu:'TOF’ta T2 yanıtı var', doz:'2 mg.kg⁻¹', tur:'Rutin geri döndürme',
      metin:'Dörtlü uyarının ikinci yanıtı göründüğünde rokuronyum veya vekuronyum bloğu için doz 2 mg.kg⁻¹’dir. [[K3 s. 203]]' },
    acil:{ ad:'Acil', bulgu:['1,2 mg.kg⁻¹ rokuronyumun','hemen ardından'], doz:'16 mg.kg⁻¹', tur:'Acil geri döndürme',
      metin:'1,2 mg.kg⁻¹ rokuronyumun hemen ardından bloğu acilen geri döndürmek için 16 mg.kg⁻¹ sugammadeks gerekir. [[K3 s. 204]]' }
  };
  VIZ.a12d_doz = el => SEKIL.sahne(el, {
    ...alan, baslik:'Rutin veya acil geri döndürmede sugammadeks dozu',
    secenek:{ id:'durum', ad:'Klinik durum', liste:Object.entries(dozlar).map(([d,k]) => ({d, ad:k.ad})) },
    ciz:(S,t,p) => {
      const k = dozlar[p.durum], x = S.w/2;
      return etiket(S,28,k.tur)
        + S.kutu(x-146,46,292,58,{yazi:k.bulgu, dolgu:'basic-soft',renk:'basic'})
        + S.ok([[x,110],[x,141]],{renk:'clin'})
        + S.kutu(x-124,148,248,62,{yazi:['Sugammadeks',k.doz],dolgu:'clin-soft',renk:'clin'});
    },
    metin:p => dozlar[p.durum].metin
  });
})();
