(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = {a:'middle', c:'b'};
  const yer = {
    id:'yer', ad:'İrtifa seçimi',
    liste:[{d:'deniz', ad:'Deniz seviyesi'}, {d:'irtifa', ad:'Yüksek irtifa'}]
  };

  // Oklar geniş alanda yatay, dar alanda aşağı doğru okunur.
  function zincir(S, etiketler, renk) {
    const dar = S.dar;
    const en = dar ? 284 : 178;
    const boy = 55;
    return etiketler.map((etiket, i) => {
      const x = dar ? (S.w - en) / 2 : 12 + i * 216;
      const y = dar ? 12 + i * 85 : 32;
      let cizim = S.kutu(x,y,en,boy,{yazi:etiket, renk, dolgu:i === 2 ? renk + '-soft' : 'paper'});
      if (i < etiketler.length - 1) {
        const yol = dar ? [ [S.w/2,y+boy+2], [S.w/2,y+81] ]
          : [[x+en+2,y+boy/2],[x+211,y+boy/2]];
        cizim += S.ok(yol,{renk});
      }
      return cizim;
    }).join('');
  }

  VIZ.f87_basinc = el => SEKIL.sahne(el, {
    baslik:'Toplam basınç içinde sabit su buharı payı', vb:[560,174], vbDar:[360,174], secenek:yer,
    ciz:(S,t,p) => {
      const yuksek = p.yer === 'irtifa';
      const tam = S.w-48, uzunluk = yuksek ? tam*0.62 : tam;
      const su = tam*0.12;
      return S.t(S.w/2,25,'Barometrik basınç',merkez)
        + S.kutu(24,44,tam,37,{kesik:true,r:0})
        + S.kutu(24,44,su,37,{dolgu:'basic',renk:'basic',r:0})
        + S.kutu(24+su,44,uzunluk-su,37,{dolgu:'accent-soft',renk:'accent',r:0})
        + S.cizgi([[24+su/2,83],[24+su/2,104],[72,104]],{renk:'basic'})
        + S.t(77,109,'Su buharı · 6,3 kPa',{c:'b'})
        + S.t(S.w/2,151,yuksek ? 'O₂ için kalan basınç azalır' : 'Solunan O₂ oranı %21',merkez);
    },
    metin:p => p.yer === 'deniz'
      ? window.REF(D87_OKUMA.basinc.deniz)
      : window.REF(D87_OKUMA.basinc.irtifa)
  });

  const solunum = () => [
    ['Uyarı', ['PaO₂ &lt; 8 kPa','Periferik reseptör','Medullada uyarı'], window.REF(D87_OKUMA.solunum.uyari)],
    ['Yanıt', ['Ventilasyon ↑','PaCO₂ ↓','Alveoler PO₂ ↑'], window.REF(D87_OKUMA.solunum.yanit)],
    ['Fren', [['Hipokapni','ve alkaloz'],['Santral reseptör','ve karotis cismi'],['Ventilasyon artışı','sınırlanır']], window.REF(D87_OKUMA.solunum.fren)]
  ];
  VIZ.f87_solunum = el => SEKIL.adim(el,{
    baslik:'Ventilasyon yanıtının üç basamağı', vb:[640,118], vbDar:[360,250], oto:false,
    adimlar:solunum().map(([ad,etiketler,metin]) => ({ad,metin,ciz:S=>zincir(S,etiketler,ad === 'Fren' ? 'warn' : 'basic')}))
  });

  function karsilastir(el,baslik,ad,veri) {
    return SEKIL.sahne(el,{
      baslik,vb:[640,118],vbDar:[360,250],
      secenek:{id:'secim',ad,liste:Object.entries(veri).map(([d,k])=>({d,ad:k.ad}))},
      ciz:(S,t,p)=>zincir(S,veri[p.secim].yol,veri[p.secim].renk),
      metin:p=>veri[p.secim].metin
    });
  }

  VIZ.f87_dolasim = el => karsilastir(el,'Dolaşım yatağına göre neden ve sonuç','Dolaşım yatağı',{
    sistem:{ad:'Sistemik', renk:'basic', yol:['Ön yük ↓','Atım hacmi ↓',['Taşikardi ile','debi korunur']],
      metin:window.REF(D87_OKUMA.dolasim.sistem)},
    akciger:{ad:'Pulmoner', renk:'clin', yol:[['Yaygın hipoksik','vazokonstriksiyon'],['Pulmoner direnç','%50–300 artar'],['Pulmoner','hipertansiyon']],
      metin:window.REF(D87_OKUMA.dolasim.akciger)}
  });

  VIZ.f87_egri = el => SEKIL.sahne(el,{
    baslik:'Hemoglobin satürasyonu ve oksijen basıncı arasındaki nitel ilişki',
    vb:[500,240],vbDar:[360,240],
    secenek:{id:'evre',ad:'Uyum evresi',liste:[{d:'alkaloz',ad:'Alkaloz'},{d:'dpg',ad:'2,3-DPG artışı'}]},
    ciz:(S,t,p) => {
      const sol = 32, sag = S.w-28, alt = 192;
      const x = u => sol+u*(sag-sol);
      // Boyutsuz çizim koordinatları. Eksenler fizyolojik değer üretmez.
      function egri(orta) {
        return Array.from({length:91},(_,i)=>{
          const u=i/90, pay=u**3;
          return [x(u),alt-142*pay/(pay+orta**3)];
        });
      }
      const orta = p.evre === 'alkaloz' ? 0.32 : 0.44;
      return S.t(sol,25,'Hb satürasyonu',{c:'b'})
        + S.ok([[sol,alt],[sol,37]],{renk:'ink'})
        + S.ok([[sol,alt],[sag+10,alt]],{renk:'ink'})
        + S.cizgi(egri(orta),{renk:'accent',w:5})
        + S.cizgi(egri(0.44),{renk:'ink',w:2,kesik:true})
        + S.cizgi([[x(orta),alt],[x(orta),alt-71]],{kesik:true,renk:'accent'})
        + S.daire(x(orta),alt-71,4,{dolgu:'accent',renk:'accent'})
        + S.t(x(orta),215,'P₅₀',merkez) + S.t(sag,215,'O₂ basıncı',{a:'end',c:'b'});
    },
    metin:p=>p.evre === 'alkaloz'
      ? window.REF(D87_OKUMA.egri.alkaloz)
      : window.REF(D87_OKUMA.egri.dpg)
  });

  VIZ.f87_hastalik = el => karsilastir(el,'Akut irtifa sendromlarının klinik seyri','Sendrom',{
    ams:{ad:'AMS',renk:'basic',yol:['Baş ağrısı',['Eşlik eden','belirtiler'],['Aynı irtifada','genellikle düzelme']],
      metin:window.REF(D87_OKUMA.hastalik.ams)},
    hace:{ad:'HACE',renk:'warn',yol:['Baş ağrısı',['Ataksi veya','bilişsel bozukluk'],['Nöbet veya','komaya ilerleyebilir']],
      metin:window.REF(D87_OKUMA.hastalik.hace)},
    hape:{ad:'HAPE',renk:'clin',yol:[['Alveolde sıvı','birikimi'],['Efor dispnesi','ve kuru öksürük'],['Hemoptizi','ve ortopne']],
      metin:window.REF(D87_OKUMA.hastalik.hape)}
  });

  VIZ.f87_vapor = el => SEKIL.sahne(el,{
    baslik:'Yüzde ayarı ve klinik etki',vb:[640,118],vbDar:[360,250],secenek:yer,
    ciz:(S,t,p)=>zincir(S,p.yer === 'deniz'
      ? [['İzofluran','ayar %1'],['Verilen yüzde','ayara eşit'],['Alveoler basınç','referans düzeyde']]
      : [['İzofluran','ayar %1'],['Verilen yüzde','ayardan yüksek'],['Alveoler basınç','aynı düzeyde']], 'accent'),
    metin:p=>p.yer === 'deniz'
      ? window.REF(D87_OKUMA.vapor.deniz)
      : window.REF(D87_OKUMA.vapor.irtifa)
  });
})();
