(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, liste) => ({id:'durum', ad, liste:liste.map(([d, etiket]) => ({d, ad:etiket}))});
  const ortala = {a:'middle', c:'b'};

  // Üç basamak dar ekranda da aynı okuma yönünü korur.
  function yol(S, satirlar) {
    const x = S.w / 2, w = Math.min(420, S.w - 28);
    return satirlar.map((yazi,i) => {
      const y = 10 + 77 * i;
      const renk = ['basic','clin','accent'][i];
      return S.kutu(x-w/2,y,w,53,{yazi,renk,dolgu:renk+'-soft'}) +
        (i === 2 ? '' : S.ok([[x,y+54],[x,y+75]],{renk:'muted'}));
    }).join('');
  }
  function aciklamalar(el) {
    return Object.fromEntries(Array.from(el.querySelectorAll('[data-durum]'),
      satir => [satir.dataset.durum, satir.innerHTML]));
  }
  function karsilastir(el, baslik, etiket, veriler) {
    const bilgi = aciklamalar(el);
    return SEKIL.sahne(el, {
      baslik, vb:[640,230], vbDar:[360,230],
      secenek:secim(etiket,Object.entries(veriler).map(([k,v]) => [k,v.ad])),
      ciz:(S,t,p) => yol(S,veriler[p.durum].yol),
      metin:p => bilgi[p.durum]
    });
  }

  const karisimlar = {
    yuksek:{satir:[[70,28,2],[54,43,3],[59.5,37.8,2.7]], oran:'59,5 / 70 = 0,85'},
    dusuk:{satir:[[20,78,2],[11.1,86.7,2.2],[12,85.8,2.2]], oran:'12 / 20 = 0,60'}
  };
  const sayi = n => String(n).replace('.',',');
  VIZ.a09e_alveol = el => {
    const bilgi = aciklamalar(el);
    return SEKIL.sahne(el,{
      baslik:'İnspire karışımdan alveoler karışıma N₂O, O₂ ve volatil ajan yüzdeleri',
      vb:[640,317], vbDar:[360,317],
      secenek:secim('İnspire N₂O',[['yuksek','%70 N₂O'],['dusuk','%20 N₂O']]),
      ciz:(S,t,p) => {
        const veri = karisimlar[p.durum];
        const w = S.w - 28, renkler = ['accent','basic','clin'];
        let svg = '';
        veri.satir.forEach((yuzdeler,i) => {
          const y = 24 + i*86;
          svg += S.t(14,y,['İnspire edilen','N₂O alımından sonra','Hacim tamamlanınca'][i],{c:'b'});
          let x = 14;
          yuzdeler.forEach((n,j) => {
            const uzunluk = w * n/100;
            svg += S.kutu(x,y+10,uzunluk,12,{r:0,dolgu:renkler[j],renk:renkler[j]});
            x += uzunluk;
          });
          svg += S.t(14,y+47,'N₂O %'+sayi(yuzdeler[0])+'   ·   O₂ %'+sayi(yuzdeler[1])+'   ·   Ajan %'+sayi(yuzdeler[2]));
        });
        return svg + S.kutu(14,266,w,40,{dolgu:'accent-soft',renk:'accent',yazi:'FA/FI = '+veri.oran});
      },
      metin:p => bilgi[p.durum]
    });
  };
  VIZ.a09e_kobalt = el => {
    const bilgi = aciklamalar(el);
    return SEKIL.adim(el,{
      baslik:'B₁₂ kofaktöründen kemik iliğine',vb:[640,230],vbDar:[360,230],oto:false,
      adimlar:[
        {ad:'Normal yol',ciz:S=>yol(S,['Etkin B₁₂ · Co(I)','Homosistein + metil-THF',['Metiyonin sentetaz','Metiyonin + THF']]),metin:bilgi[0]},
        {ad:'N₂O etkisi',ciz:S=>yol(S,['Co(I) → Co(II)','Metiyonin sentetaz etkinliği ↓',['Metiyonin, THF, timidin','ve DNA sentezi ↓']]),metin:bilgi[1]},
        {ad:'Maruziyet',ciz:S=>yol(S,['Kemik iliği',['Birkaç saat','Megaloblastik değişiklik olabilir'],['Günler','Agranülositoz gelişebilir']]),metin:bilgi[2]}
      ]
    });
  };
  VIZ.a09e_tup = el => karsilastir(el,'Entonox tüpündeki karışım','Tüp durumu',{
    karisik:{ad:'Karışmış',yol:['N₂O ve O₂ birlikte çözünür','50:50 karışım','Analjezi']},
    bas:{ad:'Ayrışma sonrası ilk gaz',yol:['Ayrışmış tüp','Önce O₂ ağırlıklı gaz','Yetersiz analjezi']},
    son:{ad:'Tüp boşalırken',yol:['Ayrışmış tüp boşalıyor','Karışım %100 N₂O’ya yaklaşır','Potentlik ↑ · hipoksi riski ↑']}
  });

  const dolasim = {
    Halotan:['↓↓↓','↓↓','↓','↓↓','Yok','↓','↑↑↑'],
    İzofluran:['↓','↑↑','↓↓','↓↓','Olası','Değişmez','Yok'],
    Enfluran:['↓↓','↑','↓','↓↓','Yok','↓','↑'],
    Desfluran:['Minimal etki','↑¹','↓↓','↓↓','Yok','Değişmez','Yok'],
    Sevofluran:['↓²','Değişmez','↓','↓','Yok','Değişmez','Yok']
  };
  VIZ.a09e_dolasim = el => {
    const bilgi = aciklamalar(el);
    return SEKIL.sahne(el,{
      baslik:'Beş ajanın kardiyovasküler yanıtları',vb:[640,302],vbDar:[360,302],
      secenek:secim('Volatil ajan',Object.keys(dolasim).map(ad=>[ad,ad])),
      ciz:(S,t,p) => {
        const ad = p.durum;
        const etiketler = ['Kontraktilite','Kalp hızı','Sistemik damar direnci','Kan basıncı','Koroner çalma','Splanknik kan akımı','Katekolamin duyarlılığı'];
        return S.t(S.w/2,24,ad,ortala) + etiketler.map((baslik,i) => {
          const y = 52+i*36;
          return S.t(14,y,baslik) + S.t(S.w-14,y,dolasim[ad][i],{a:'end',c:'b',renk:'accent'}) +
            S.cizgi([[14,y+10],[S.w-14,y+10]],{renk:'line',w:1});
        }).join('');
      },
      metin:p => bilgi[p.durum]
    });
  };
  VIZ.a09e_perfuzyon = el => karsilastir(el,'İzofluran ve koroner perfüzyon','Yorum',{
    varsayim:{ad:'Çalma varsayımı',yol:['Yanıt veren arteriyolde dilatasyon',['Akım hastalıklı damar alanından','uzaklaşabilir'],'İskemi olasılığı']},
    korunmus:{ad:'Perfüzyon korunursa',yol:['İzofluran','Koroner perfüzyon korunur','Çalma gözlenmeyebilir']}
  });

  VIZ.a09e_ortam = el => karsilastir(el,'Sevofluranın üç farklı ortamı','Ortam',{
    sise:{ad:'Şişe',yol:['Eklenen su &lt; 100 ppm',['Lewis asitleri','Eter ve halojen bağlarına saldırı'],'Çok toksik HF oluşumu']},
    karaciger:{ad:'Karaciğer',yol:['Sevofluran','CYP2E1',['Heksafloroizopropanol','ve inorganik F⁻']]},
    devre:{ad:'Devre',yol:['Sevofluran + CO₂ absorbanı','Isı açığa çıkar · ajan tüketilir','A, B, C, D ve E bileşikleri']}
  });

  VIZ.a09e_karaciger = el => karsilastir(el,'Halotan metabolizması ve karaciğer hasarı','Metabolik yol',{
    oks:{ad:'Oksidatif yol',yol:['Hepatik sitokrom P450',['Oksidatif metabolit','Trifloroasetil klorür'],['Proteine kovalent bağlanma','Hapten → antikor olasılığı']]},
    red:{ad:'Hipoksik karaciğer',yol:['Hepatik hipoksi','Redüktif metabolizma baskın',['F⁻ ve diğer indirgenmiş','metabolitler']]}
  });

  VIZ.a09e_eter = el => karsilastir(el,'Enfluran ve desfluranın ayırt edici özellikleri','Ajan',{
    enf:{ad:'Enfluran',yol:['Metabolizma → F⁻','Geri dönüşümlü nefropati',['Böbrek işlev bozukluğunda','kullanımdan kaçınılır']]},
    des:{ad:'Desfluran',yol:['Kaynama noktası 23,5 °C','Klasik vaporizatör tehlikeli',['Elektronik Tec 6','2 atmosferde 39 °C']]}
  });
})();
