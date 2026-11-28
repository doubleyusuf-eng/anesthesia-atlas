(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [600, 210], vbDar: [340, 210] };
  const orta = { a: 'middle', c: 'b' };
  const secim = (ad, adlar) => ({ id: 'kip', ad, liste: adlar.map(ad => ({ ad, d: ad })) });
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  const dalga = [[0,.14],[.06,.12],[.12,.67],[.17,.94],[.22,1],[.27,.84],[.34,.71],
    [.39,.55],[.42,.61],[.47,.54],[.58,.38],[.72,.25],[.85,.18],[1,.12]];
  const iz = (S, veri) => veri.map(([x,y]) => [26+x*(S.w-52),160-104*y]);
  function eksen(S) {
    return S.t(22,23,'Basınç') + S.ok([[20,32],[20,174],[S.w-15,174]],{renk:'muted'}) +
      S.t(S.w-18,199,'Zaman',{a:'end'});
  }

  VIZ.fk06b_dalga = el => SEKIL.sahne(el, { ...boyut, baslik:'Bir kalp çevriminde arter basıncı',
    secenek:secim('Dalga üzerinde göster',['Tepe ve dip','Zaman ortalaması','Yükseliş','Alan']),
    ciz(S,t,p) {
      const yol = iz(S,dalga);
      let c = eksen(S);
      if (p.kip === 'Alan') c += S.cizgi([...yol,[S.w-26,174],[26,174],yol[0]],{dolgu:'basic-soft',renk:'basic-soft'});
      c += S.cizgi(yol,{renk:'accent',w:3});
      if (p.kip === 'Tepe ve dip') {
        for (const [i,ad,ofset] of [[4,'Sistolik',-12],[13,'Diyastolik',-14]]) {
          const [x,y] = yol[i];
          c += S.daire(x,y,4,{dolgu:'accent'}) + S.t(x,y+ofset,ad,{a:i===13?'end':'middle'});
        }
      } else if (p.kip === 'Zaman ortalaması') {
        const ort = dalga.slice(1).reduce((a,[x,y],i)=>a+(x-dalga[i][0])*(y+dalga[i][1])/2,0);
        const y = 160-104*ort;
        c += S.cizgi([[26,y],[S.w-26,y]],{kesik:true,renk:'clin'}) + S.t(S.w-28,y-8,'OAB',{a:'end'});
      } else if (p.kip === 'Yükseliş') c += S.cizgi(yol.slice(1,5),{renk:'clin',w:6});
      return c;
    },
    metin:p=>({
      'Tepe ve dip':FK06B_OKUMA.dalga[0],
      'Zaman ortalaması':FK06B_OKUMA.dalga[1],
      'Yükseliş':FK06B_OKUMA.dalga[2],
      'Alan':FK06B_OKUMA.dalga[3]
    })[p.kip],
  });

  VIZ.fk06b_manson = el => SEKIL.cizim(el,{baslik:'Manuel sfigmomanometre',giris:FK06B_OKUMA.manson[0],
    gorunumler:[{ad:'Üstten',resim:'img/fizik/06b-manson.webp',en:1024,boy:683,noktalar:[
      nokta(202,275,'Kol manşonu',FK06B_OKUMA.manson[1]),
      nokta(785,177,'Manometre',FK06B_OKUMA.manson[2]),
      nokta(860,572,'Şişirme puarı',FK06B_OKUMA.manson[3]),
      nokta(707,507,'Boşaltma valfi',FK06B_OKUMA.manson[4]),
    ]}]});

  const sesler = ['Belirgin vuru','Yumuşak hışırtı','Keskin ses','Tok vuru / üfleme','Sessizlik'];
  const akimlar = ['Kısa kan atımları','Düşük akım','Artan akım','Diyastole yaklaşırken','Kararlı laminer akım'];
  VIZ.fk06b_ses = el => SEKIL.sahne(el,{...boyut,baslik:'Korotkoff evresi ve akım',
    param:[{id:'evre',ad:'Korotkoff evresi',min:1,max:5,adim:1,deger:1}],
    ciz(S,t,p) {
      const i=p.evre-1, x=S.w/2, g=[4,8,13,21,27][i];
      let c=S.t(x,23,sesler[i],orta);
      for(const yon of [-1,1]) {
        c+=S.cizgi([[17,95+yon*27],[x-82,95+yon*27],[x-37,95+yon*g],[x+37,95+yon*g],[x+82,95+yon*27],[S.w-17,95+yon*27]],{renk:'crit',w:4});
        c+=S.kutu(x-40,yon<0?95-g-19:95+g+3,80,16,{dolgu:'basic-soft',renk:'basic'});
      }
      c+=S.ok([[40,95],[S.w-40,95]],{renk:'clin',kesik:i<4});
      if(i===4) for(const dy of [-12,12]) c+=S.ok([[40,95+dy],[S.w-40,95+dy]],{renk:'clin'});
      return c+S.t(x,171,akimlar[i],orta);
    },
    metin:p=>[
      FK06B_OKUMA.ses[0],
      FK06B_OKUMA.ses[1],FK06B_OKUMA.ses[2],
      FK06B_OKUMA.ses[3],
      FK06B_OKUMA.ses[4]
    ][p.evre-1],
  });

  const konumlar=['Sistolik üstü','Başlangıç','En büyük genlik','Diyastolik düzey'];
  VIZ.fk06b_osil = el => SEKIL.sahne(el,{...boyut,baslik:'Manşon basıncı ve salınımlar',
    secenek:secim('Boşalma sırasında bir düzey seçin',konumlar),
    ciz(S,t,p) {
      const i=konumlar.indexOf(p.kip);
      const x=u=>23+(S.w-46)*u, taban=u=>45+104*u;
      const gen=u=>u<.2?0:u<.57?(u-.2)/.37*25:25-(u-.57)/.43*20;
      const y=u=>taban(u)-gen(u)*Math.sin(2*Math.PI*18*u);
      const u=[.10,.235,.57,.90][i], yol=[];
      for(let k=0;k<=420;k++) yol.push([x(k/420),y(k/420)]);
      return S.t(22,22,'Manşon basıncı')+S.cizgi(yol,{renk:'accent',w:2.5})+
        S.cizgi([[x(u),34],[x(u),173]],{renk:'clin',kesik:true})+
        S.daire(x(u),y(u),5,{renk:'clin',dolgu:'clin'})+
        S.ok([[23,175],[S.w-23,175]],{renk:'muted'})+S.t(S.w/2,200,'Manşonun boşalma süresi',orta);
    },metin:p=>[
      FK06B_OKUMA.osil[0],FK06B_OKUMA.osil[1],
      FK06B_OKUMA.osil[2],FK06B_OKUMA.osil[3]
    ][konumlar.indexOf(p.kip)],
  });

  const ortalamaTahmini = (sistolik, diyastolik) => diyastolik + (sistolik-diyastolik)/3;
  VIZ.fk06b_baginti = el => SEKIL.grafik(el, {
    baslik:'Sistolik ve diyastolik basınçtan yaklaşık OAB', vb:[600,265], vbDar:[340,260],
    x:{min:100,max:125,ad:'Sistolik basınç (mmHg)',adimlar:[100,125]},
    y:{min:50,max:100,ad:'Yaklaşık OAB (mmHg)',adimlar:[50,75,100]},
    param:[
      {id:'d',ad:'Diyastolik basınç',min:50,max:75,adim:25,deger:75,birim:'mmHg'},
      {id:'s',ad:'Sistolik basınç',min:100,max:125,adim:25,deger:125,birim:'mmHg'},
    ],
    egriler:[{f:(x,p)=>ortalamaTahmini(x,p.d),renk:'accent'}],
    noktalar:p=>[{x:p.s,y:ortalamaTahmini(p.s,p.d)}],
    okuma:p=>`Seçilen basınçlarla yaklaşık OAB = ${p.d} + (${p.s} − ${p.d}) / 3 ≈ <b>${ortalamaTahmini(p.s,p.d).toLocaleString('tr-TR',{maximumFractionDigits:1})} mmHg</b>. [[K6 s. 112]] [[K6 s. 114]]`,
  });

  VIZ.fk06b_parmak = el=>SEKIL.cizim(el,{baslik:'Peñáz parmak manşonu',giris:FK06B_OKUMA.parmak[0],
    gorunumler:[{ad:'Kesit',resim:'img/fizik/06b-parmak.webp',en:1024,boy:512,noktalar:[
      nokta(452,87,'Parmak manşonu',FK06B_OKUMA.parmak[1]),
      nokta(545,161,'Kızılötesi ışık kaynağı',FK06B_OKUMA.parmak[2]),
      nokta(544,352,'Fotodedektör',FK06B_OKUMA.parmak[3]),
    ]}]});

  const geriAdim = ['Hacmi algıla','Başlangıcı bul','Hacmi sabitle'];
  VIZ.fk06b_geri = el => SEKIL.sahne(el, { ...boyut, baslik:'Optik geri besleme döngüsü',
    secenek:secim('Basamak',geriAdim),
    ciz(S,t,p) {
      const i=geriAdim.indexOf(p.kip), sag=S.w-139;
      const kutu=(x,y,ad,etkin)=>S.kutu(x,y,124,48,{yazi:ad,dolgu:etkin?'clin-soft':'paper',renk:etkin?'clin':'line'});
      return kutu(15,24,['Arterdeki','kan hacmi'],i===0)+kutu(sag,24,['Optik nabız','sinyali'],i<2)+
        kutu(sag,133,['Mikroişlemci','ve pompa'],i>0)+kutu(15,133,'Manşon basıncı',i===2)+
        S.ok([[140,48],[sag-2,48]],{renk:i===0?'clin':'muted'})+
        S.ok([[sag+62,76],[sag+62,128]],{renk:i===1?'clin':'muted'})+
        S.ok([[sag-2,157],[142,157]],{renk:i===2?'clin':'muted'})+
        S.ok([[77,129],[77,77]],{renk:i===2?'clin':'muted'});
    },metin:p=>FK06B_OKUMA.geri[geriAdim.indexOf(p.kip)],
  });

  VIZ.fk06b_transduser = el=>SEKIL.cizim(el,{baslik:'Arter hattında transdüser ve yıkama valfi',giris:FK06B_OKUMA.transduser[0],
    gorunumler:[{ad:'Yandan',resim:'img/fizik/06b-transduser.webp',en:1024,boy:342,noktalar:[
      nokta(88,170,'Sıvı girişi',FK06B_OKUMA.transduser[1]),
      nokta(272,72,'Hızlı yıkama kolu',FK06B_OKUMA.transduser[2]),
      nokta(457,127,'Saydam gövde',FK06B_OKUMA.transduser[3]),
      nokta(502,184,'Algılayıcı çip',FK06B_OKUMA.transduser[4]),
      nokta(749,169,'Üç yollu musluk',FK06B_OKUMA.transduser[5]),
      nokta(928,170,'Katetere giden hat',FK06B_OKUMA.transduser[6]),
    ]}]});

  VIZ.fk06b_kopru = el=>SEKIL.sahne(el,{...boyut,baslik:'Membran ve Wheatstone köprüsü',
    secenek:secim('Membrandaki basınç',['Başlangıç','Basınç artışı']),
    ciz(S,t,p) {
      const art=p.kip==='Basınç artışı', x=S.w*.73, y=101, w=S.dar?64:93, h=72;
      const kol=[[x,y-h],[x+w,y],[x,y+h],[x-w,y],[x,y-h]];
      let c=S.cizgi(kol,{renk:'basic'});
      for(let i=0;i<4;i++){
        const [a,b]=kol[i],[d,e]=kol[i+1];
        c+=S.kutu((a+d)/2-15,(b+e)/2-8,30,16,{dolgu:'basic-soft',renk:'basic',r:2});
      }
      const m=S.w*.23;
      c+=S.kutu(m-53,75,106,44,{dolgu:'clin-soft',renk:'clin'});
      c+=S.cizgi([[m-53,118],[m-22,art?130:118],[m,art?134:118],[m+22,art?130:118],[m+53,118]],{renk:'accent',w:4});
      return c+S.ok([[m,44],[m,art?98:72]],{renk:'clin'})+S.t(m,26,'Sıvı basıncı',orta)+
        S.t(m,173,'Membran',orta)+S.t(x,199,'Wheatstone köprüsü',orta);
    },metin:p=>p.kip==='Başlangıç'?FK06B_OKUMA.kopru[0]:
      FK06B_OKUMA.kopru[1]
  });

  VIZ.fk06b_sifir = el=>SEKIL.sahne(el,{...boyut,baslik:'Sıfırlamada musluk yolları',
    secenek:secim('Musluk ve monitör',['Havaya aç','Sıfırı kaydet','Hastaya aç']),
    ciz(S,t,p) {
      const hasta=p.kip==='Hastaya aç', x=S.w/2;
      const yol=(pts,acik)=>S.cizgi(pts,{renk:acik?'clin':'line',w:acik?6:3,kesik:!acik});
      return yol([[76,112],[x,112]],true)+yol([[x,112],[S.w-72,112]],hasta)+yol([[x,54],[x,112]],!hasta)+
        S.kutu(7,92,78,40,{yazi:'Sensör',renk:'clin'})+S.kutu(S.w-82,92,75,40,{yazi:'Hasta',soluk:!hasta})+
        S.kutu(x-56,15,112,40,{yazi:'Oda havası',soluk:hasta})+S.daire(x,112,7,{renk:'clin',dolgu:'clin'})+
        S.t(x,177,p.kip==='Sıfırı kaydet'?'Monitör: 0 mmHg':hasta?'Arter basıncı':'Atmosfer basıncı',orta);
    },metin:p=>({'Havaya aç':FK06B_OKUMA.sifir[0],
      'Sıfırı kaydet':FK06B_OKUMA.sifir[1],
      'Hastaya aç':FK06B_OKUMA.sifir[2]})[p.kip],
  });

  VIZ.fk06b_sonum = el=>SEKIL.sahne(el,{...boyut,baslik:'Sönümün arter dalgasına etkisi',
    secenek:secim('Sönüm',['Kritik','Yetersiz','Aşırı']),
    ciz(S,t,p) {
      const normal=iz(S,dalga);
      const az=[[0,.08],[.06,.04],[.12,.71],[.17,1.19],[.20,.88],[.23,1.10],[.26,.82],[.29,.91],[.33,.68],[.36,.73],[.39,.48],[.42,.65],[.45,.50],[.48,.54],[.56,.38],[.72,.23],[.86,.12],[1,.04]];
      const cok=[[0,.25],[.06,.24],[.12,.32],[.18,.48],[.24,.61],[.30,.68],[.36,.66],[.43,.60],[.53,.53],[.65,.43],[.80,.33],[1,.24]];
      const kayit=p.kip==='Yetersiz'?az:p.kip==='Aşırı'?cok:dalga;
      return eksen(S)+S.cizgi(iz(S,kayit),{renk:'accent',w:4.5})+S.cizgi(normal,{renk:'ink',kesik:true,w:1.8});
    },metin:p=>({Kritik:FK06B_OKUMA.sonum[0],
      Yetersiz:FK06B_OKUMA.sonum[1],
      Aşırı:FK06B_OKUMA.sonum[2]})[p.kip],
  });
})();
