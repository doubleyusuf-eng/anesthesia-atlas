(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (ad, adlar) => ({id:'kip', ad, liste:adlar.map(ad => ({ad, d:ad}))});
  const ortada = {a:'middle', c:'b'};
  const noktalar = [
    [108,131,'APL ayarı','Ekspirasyon kolundaki valfin açılma basıncı yay ayarıyla değişir. [[K6 s. 239–240]]'],
    [223,188,'Taze gaz girişi','Taze gaz inspirasyon valfinden önce devreye katılır. [[K6 s. 240]]'],
    [328,210,'Tek yönlü valf','Her koldaki tek yönlü valf, gazın halka boyunca tek yönde dolaşmasını sağlar. [[K6 s. 240]]'],
    [476,211,'Diğer kolun valfi','İnspirasyon ve ekspirasyon yollarının her birinde bir valf vardır. [[K6 s. 240]]'],
    [601,43,'Körüklü hortum','Körüklenme katlanmayı önler, geniş iç çap direnci azaltır. [[K6 s. 239]]'],
    [903,199,'Hasta bağlantısı','İki kol hasta hava yolunda birleşir. [[K6 s. 240]]'],
    [327,492,'Soda kireci kabı','Ekspirasyon gazı granüllerden geçerken karbondioksit emilir. [[K6 s. 241–242]]'],
    [84,512,'Rezervuar torbası','Torba inspirasyon için gaz depolar ve spontan solunum paterni hareketinden izlenebilir. [[K6 s. 239]]']
  ];
  VIZ.fk14a_cihaz = el => SEKIL.cizim(el, {
    baslik:'Halka sistemin dıştan görünümü', giris:'Parçaları seçerek görevlerini inceleyin. [[K6 s. 239–241]]',
    gorunumler:[{ad:'Halka sistem', resim:'img/fizik/14a-halka.webp', en:1024, boy:683,
      noktalar:noktalar.map(([x,y,ad,metin])=>({x,y,ad,metin}))}]
  });

  // Aynı gerilimde iki küre için Laplace oranı, mutlak torba ölçümü değildir.
  VIZ.fk14a_laplace = el => SEKIL.grafik(el, {
    baslik:'Sabit duvar geriliminde yarıçap ve basınç oranı', vb:[510,275], vbDar:[350,275],
    x:{min:1,max:2,ad:'Yarıçap oranı (r/r₀)',adimlar:[1,1.5,2]},
    y:{min:0,max:1,ad:'Basınç oranı (ΔP/ΔP₀)',adimlar:[0,0.5,1]},
    param:[{id:'oran',ad:'Referansa göre yarıçap',min:1,max:2,adim:0.01,deger:1}],
    egriler:[{f:x=>1/x,renk:'accent'}],
    noktalar:p=>[{x:p.oran,y:1/p.oran}], dikey:p=>[{x:p.oran}],
    okuma:p=>'Seçilen yarıçap oranı '+p.oran.toFixed(2).replace('.',',')+
      ' için basınç oranı '+(1/p.oran).toFixed(2).replace('.',',')+
      ' olur (sabit gerilimli küre modeli). [[K6 s. 239]]'
  });

  VIZ.fk14a_halka = el => SEKIL.sahne(el, {
    baslik:'Halkada iki kol ve tek yönlü valfler', vb:[510,260], vbDar:[350,260],
    secenek:sec('Solunum evresi',['İnspirasyon','Ekspirasyon']),
    ciz:(S,t,{kip})=>{
      const sol=48, sag=S.w-48, orta=S.w/2, inspirasyon=kip==='İnspirasyon';
      const giris=[[sol,128],[sol,68],[sag,68],[sag,108]];
      const cikis=[[sag,151],[sag,195],[sol,195],[sol,151]];
      const etkin = (yol,acik) => S.ok(yol,{renk:acik?'accent':'muted',w:acik?5:2,kesik:!acik});
      return etkin(giris,inspirasyon)+etkin(cikis,!inspirasyon)
        +S.kutu(5,110,86,40,{yazi:'Absorban'})+S.kutu(sag-40,110,80,40,{yazi:'Hasta'})
        +S.t(orta,28,'İnspirasyon valfi',ortada)+S.rozet(orta,68,inspirasyon?'Açık':'Kapalı')
        +S.t(orta,246,'Ekspirasyon valfi',ortada)+S.rozet(orta,195,inspirasyon?'Kapalı':'Açık');
    },
    metin:({kip})=>kip==='İnspirasyon'
      ? 'Absorbandan geçen gaz taze gazla birleşir; açık inspirasyon valfinden hastaya gider. [[K6 s. 240]]'
      : 'İnspirasyon valfi kapanır; hastanın verdiği gaz ekspirasyon koluna döner ve basınç sınırı aşıldığında fazlası APL’den çıkar. [[K6 s. 240–241]]'
  });

  VIZ.fk14a_denge = el => SEKIL.sahne(el, {
    baslik:'İdeal halkada oksijen sunumu ile tüketimi karşılaştırma', vb:[510,140], vbDar:[350,140],
    param:[{id:'giris',ad:'Devreye giren oksijen',min:250,max:500,adim:1,deger:250,birim:'mL/dk'},
      {id:'tuketim',ad:'Hastanın oksijen tüketimi',min:250,max:500,adim:1,deger:250,birim:'mL/dk'}],
    ciz:(S,t,p)=>{
      const bar=(y,ad,v,renk)=>S.t(12,y,ad)+S.t(S.w-12,y,v+' mL/dk',{a:'end',c:'b'})
        +S.kutu(12,y+12,S.w-24,12,{dolgu:'chip'})
        +S.kutu(12,y+12,(S.w-24)*v/500,12,{dolgu:renk,renk});
      return bar(24,'Oksijen girişi',p.giris,'accent')+bar(92,'Oksijen tüketimi',p.tuketim,'clin');
    },
    metin:p=>{
      const fark=p.giris-p.tuketim;
      return 'Giriş − tüketim = '+fark+' mL/dk. [[K6 s. 240–241]] '+(fark<0?'Verilen oksijen hastanın tüketimini karşılamıyor.':fark>0?'Oksijen girişi bazal tüketimi aşıyor.':'Oksijen girişi bazal tüketimi tam karşılıyor.')+' [[K6 s. 240–241]]';
    }
  });

  const kimya=[
    ['Karbonik asit','H₂O + CO₂','H₂CO₃','CO₂ önce suyla birleşir; karbonik asit oluşumu yavaş ve hız sınırlayıcı basamaktır. [[K6 s. 242]]'],
    ['Bikarbonat','H₂CO₃ + NaOH','NaHCO₃ + H₂O','Karbonik asit sodyum hidroksitle tepkimeye girer ve karbon bikarbonata geçer. [[K6 s. 242]]'],
    ['Karbonat','NaHCO₃ + Ca(OH)₂','CaCO₃ + H₂O + NaOH','Kalsiyum hidroksit tüketilirken karbon kalsiyum karbonatta tutulur ve sodyum hidroksit yeniden oluşur. [[K6 s. 242]]']
  ];
  VIZ.fk14a_kimya = el => SEKIL.adim(el, {
    baslik:'Soda kirecinde üç reaksiyon',vb:[490,157],vbDar:[350,157],oto:false,
    adimlar:kimya.map(([ad,ilki,son,metin])=>({ad,metin,ciz:S=>
      S.kutu(15,5,S.w-30,45,{yazi:ilki,dolgu:'basic-soft'})+S.ok([ [S.w/2,51],[S.w/2,95]],{renk:'accent'})
      +S.kutu(15,99,S.w-30,45,{yazi:son,dolgu:'accent-soft'})}))
  });

  // Aynı hasta referansı korunur. Dalların yeri ve rezervuarın biçimi sınıfla değişir.
  const siniflar={
    A:'Magill’de taze gaz torba ucundan girer ve APL maskeye yakındır. [[K6 s. 244–245]]',
    B:'Giriş APL’nin hemen gerisindedir, hortum ve torba birlikte rezervuar oluşturur. [[K6 s. 245]]',
    C:'Waters düzeninde yakın yerleşimli giriş ve APL’nin yanında torba bulunur. [[K6 s. 245–246]]',
    D:'Gaz hastaya yakın girer; torba ve APL ekspirasyon kolunun uzak ucundadır. [[K6 s. 246–247]]',
    E:'Ayre T-parçasında taze gaz hasta ucuna gelir, ekspirasyon gazı açık koldan uzaklaşır. [[K6 s. 248–249]]',
    F:'Jackson-Rees düzeninde T-parçasının uzak ucuna delikli torba eklenmiştir. [[K6 s. 248]]'
  };
  VIZ.fk14a_sinif = el => SEKIL.sahne(el, {
    baslik:'Mapleson bağlantıları',vb:[520,225],vbDar:[350,225],secenek:sec('Mapleson sınıfı',Object.keys(siniflar)),
    ciz:(S,t,{kip})=>{
      const sag=S.w-43, distal=kip==='C'?S.w*.57:52;
      const taze=kip==='A'?distal:kip==='B'||kip==='C'?sag-104:sag-43;
      const apl=kip==='D'?distal+37:sag-49;
      let svg=S.cizgi([[distal,115],[sag,115]],{renk:'muted',w:9})
        + S.ok([[taze,49],[taze,109]],{renk:'accent',w:4}) + S.t(taze,32,'Taze gaz',ortada)
        + S.kutu(sag-27,95,65,40,{yazi:'Hasta'});
      if ('ABCD'.includes(kip)) svg+=S.ok([[apl,120],[apl,167]],{renk:'clin',w:4})+S.t(apl,190,'APL',ortada);
      if(kip==='E') return svg+S.ok([[distal+15,115],[13,115]],{renk:'clin'})+S.t(12,155,'Açık uç');
      svg+=S.cizgi([[distal,115],[distal,137]])+S.kutu(distal-36,139,72,36,{r:16,yazi:'Torba',dolgu:'basic-soft'});
      if(kip==='F') svg+=S.ok([[distal,176],[distal,194]],{renk:'clin'})+S.t(distal,217,'Açık uç',ortada);
      return svg;
    },metin:({kip})=>siniflar[kip]
  });

  const fazlar={
    'A · Spontan':[
      'Negatif basınç APL’yi kapatır; torba ve devredeki gaz hastaya gider. [[K6 s. 244]]',
      'Torba taze gazla dolarken ilk 150 mL ölü boşluk gazı hortuma döner. [[K6 s. 244]]',
      'Torba doldukça direnç artar; alveol gazı hastaya yakın APL’den çıkar. [[K6 s. 244]]',
      'Taze gaz, hasta yönünde yüksek dirençle karşılaşır ve APL yakınındaki gazı dışarı süpürür. [[K6 s. 244]]'],
    'D · Spontan':[
      'Hasta negatif basınçla devreden gaz çekerken torba söner. [[K6 s. 246]]',
      'Solukla geri dönen gaz, hasta ucundan giren taze gazla birlikte torbaya ilerler. [[K6 s. 246]]',
      'Uzak uçta alveol, ölü boşluk ve taze gaz karışır; basınç eşiği geçildiğinde karışımın fazlası APL’den çıkar. [[K6 s. 246]]',
      'Hasta ucundan giren taze gaz karışımı uzak uçtaki APL’ye doğru süpürür. [[K6 s. 246]]']
  };
  VIZ.fk14a_faz = el => SEKIL.sahne(el,{
    baslik:'Mapleson A ve D’de spontan solunumun dört anı',vb:[520,212],vbDar:[350,212],
    secenek:sec('Devre',Object.keys(fazlar)),
    param:[{id:'faz',ad:'Solunum evresi',min:1,max:4,adim:1,deger:1}],
    ciz:(S,t,{kip,faz})=>{
      const a=kip.startsWith('A'), sol=50,sag=S.w-50, g=a?sol+20:sag-40,v=a?sag-40:sol+20;
      let svg=S.t(S.w/2,22,['İnspirasyon','Erken ekspirasyon','Geç ekspirasyon','Ekspirasyon sonu bekleme'][faz-1],ortada)
        +S.cizgi([[sol,108],[sag,108]],{renk:'line',w:9})
        +S.t(g,50,'Taze gaz',ortada)+S.ok([[g,58],[g,105]],{renk:'accent'})
        +S.kutu(4,88,54,40,{yazi:'Torba'})+S.kutu(sag-8,88,55,40,{yazi:'Hasta'});
      const yon=faz===1?[[65,108],[sag-15,108]]:a&&faz===4?[[g+5,108],[v,108]]:
        a&&faz===3?[[sag-15,108],[v,108]]:[[sag-15,108],[65,108]];
      svg+=S.ok(yon,{renk:faz===1||faz===4?'accent':'clin',w:4});
      if(faz>=3) svg+=S.ok([[v,112],[v,159]],{renk:'clin',w:4});
      else svg+=S.cizgi([[v,112],[v,159]],{renk:'muted',kesik:true});
      return svg+S.t(v,184,faz>=3?'APL · çıkış':'APL',ortada);
    },metin:({kip,faz})=>fazlar[kip][faz-1]
  });

  VIZ.fk14a_bain = el => SEKIL.sahne(el,{
    baslik:'Koaksiyel hortumda ayrılma',vb:[510,178],vbDar:[350,178],
    secenek:sec('İç hortum',['Bağlı','Ayrılmış']),
    ciz:(S,t,{kip})=>{
      const sag=S.w-25, kopuk=kip==='Ayrılmış', bas=kopuk?90:25;
      let svg=S.t(12,26,'Makine ucu',{c:'b'})+S.t(S.w-12,26,'Hasta ucu',{a:'end',c:'b'})
        +S.cizgi([[20,53],[sag,53]],{w:4})+S.cizgi([[20,145],[sag,145]],{w:4})
        +S.kutu(bas,70,sag-bas-5,28,{r:1,renk:'accent',dolgu:'accent-soft'})
        +S.ok([[sag-3,123],[23,123]],{renk:'clin',w:4});
      if(!kopuk) return svg+S.ok([[28,84],[sag-9,84]],{renk:'accent',w:4});
      return svg+S.ok([[20,84],[44,84],[66,118]],{renk:'accent',w:4})+S.t(S.w/2,171,'Makine ucunda karışma',ortada);
    },metin:({kip})=>kip==='Bağlı'?'Taze gaz iç lümenden hastaya gider; ekspirasyon gazı dış lümenden makineye döner. [[K6 s. 247]]':'İç hortum ayrılınca taze gaz dış kola karışır; yüksek akım oluşan büyük ölü boşluğu telafi edemez. [[K6 s. 247]]'
  });

  VIZ.fk14a_atik = el => SEKIL.sahne(el,{
    baslik:'Atık gazın klinik alandan uzaklaştırılması',vb:[490,225],vbDar:[350,225],
    secenek:sec('Uzaklaştırma yöntemi',['Pasif','Aktif','Aktif kömür']),
    ciz:(S,t,{kip})=>{
      const satirlar=kip==='Aktif'?['Devre egzozu','Emniyet açıklıklı rezervuar / filtre','Negatif basınç → dış ortam']:
        kip==='Pasif'?['Devrede kalan pozitif basınç','Atık gaz borusu','Ameliyathane dışı']:['Atık gaz','Aktif kömür kartuşu','Uçucu ajan tutulur'];
      return satirlar.map((yazi,i)=>{const y=8+i*77;
        return (i?S.ok([ [S.w/2,y-32],[S.w/2,y-3]],{renk:'accent'}):'')+S.kutu(10,y,S.w-20,43,{yazi,dolgu:i===1?'accent-soft':'paper'});
      }).join('');
    },metin:({kip})=>kip==='Aktif'?'Düşük negatif basınç fan, pompa veya Venturi sisteminden gelir; filtre devreyi dış egzozdan ayırır. [[K6 s. 251]]':
      kip==='Pasif'?'Devrenin artık basıncı atık gazı boruda ilerletir; devre akımındaki değişiklikler bu mekanizmayı aksatabilir. [[K6 s. 250–251]]':
      'Cardiff Aldasorber’de aktif kömür uçucu ajanları tutarken N₂O filtreden geçer. [[K6 s. 251]]'
  });
})();
