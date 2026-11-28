(() => {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (ad, liste) => ({id:'secili', ad, liste:liste.map(ad => ({ad,d:ad}))});
  const ortada = {a:'middle', c:'b'};
  const nokta = (x,y,ad,metin) => ({x,y,ad,metin});
  const resim = (el, ad, dosya, boy, noktalar) => SEKIL.cizim(el,{
    baslik:ad, giris:'Parçanın görevini okumak için bir numara seçin.',
    gorunumler:[{ad, resim:'img/fizik/13-'+dosya+'.webp', en:1024, boy, noktalar}]
  });
  VIZ.fk13_valf = el => resim(el,'Tüpün bağlantı yüzü','valf',1089,[
    nokta(512,105,'Valf mili','Valf, tüpten çıkan gazın akışını denetler. [[K6 s. 222]]'),
    nokta(512,423,'Gaz çıkışı','Valf açıldığında içerik çıkıştan cihaza iletilir. [[K6 s. 221–222]]'),
    nokta(412,619,'Pin indeks deliği','Cihaz boyunduruğundaki pim tüp valfindeki karşılık gelen deliğe oturur. [[K6 s. 222]]'),
    nokta(613,575,'Eşleşen diğer delik','Deliklerin birlikte oluşturduğu dizilim gazın kimliğine özgüdür. [[K6 s. 222]]'),
    nokta(380,854,'Omuz','Tüpün omzu gazı tanımaya yardımcı olacak şekilde renk kodludur. [[K6 s. 223]]')
  ]);
  VIZ.fk13_entonox = el => resim(el,'Soğumuş Entonox tüpü','entonox',2159,[
    nokta(507,229,'Valf','Dip borusu büyük tüpte alttaki sıvıdan valfe doğru örnek alınmasını sağlar. [[K6 s. 229–230]]'),
    nokta(412,763,'Üst gaz fazı','Tabakalaşma sonrası üstteki gaz başlangıçta oksijence zengindir. [[K6 s. 229]]'),
    nokta(510,1040,'Dip borusu','Borunun sıvıya uzanması hipoksik karışım verilmesini geciktirir. [[K6 s. 229–230]]'),
    nokta(637,1620,'Alt sıvı faz','Altta sıvılaşan N₂O içinde yaklaşık %20 oksijen çözünmüştür. [[K6 s. 229]]'),
    nokta(510,1915,'Dipteki giriş','Sıvı bittikten sonra dip borusu hipoksik karışımı önleyemez. [[K6 s. 229]]')
  ]);
  VIZ.fk13_vie = el => resim(el,'VIE deposunun duvarları','vie',1024,[
    nokta(302,326,'Dış kabuk','Deponun dış kabuğu karbon çeliğidir. [[K6 s. 232]]'),
    nokta(325,440,'Vakum aralığı','İki kap arasındaki vakum ısı yalıtımı sağlar. [[K6 s. 232–233]]'),
    nokta(341,555,'İç kabuk','Sıvı oksijeni barındıran iç kap paslanmaz çeliktir. [[K6 s. 232]]'),
    nokta(508,653,'Sıvı oksijen','Oksijen yaklaşık 7 barda ve −180 ile −150 °C arasında sıvı olarak depolanır. [[K6 s. 232]]')
  ]);

  const gazlar = {
    'O₂':['137 bar','Gaz','224'], 'CO₂':['50 bar','Sıvı + buhar','224–225'],
    'N₂O':['44 bar','Sıvı + buhar','225'], 'Tıbbi hava':['137 bar','Gaz','225'],
    'Entonox':['137 bar','Gaz','225'], 'Heliox':['137 bar','Gaz','225']
  };
  VIZ.fk13_gaz = el => SEKIL.sahne(el,{
    baslik:'Tüpün fazları', vb:[360,210], vbDar:[360,210], secenek:sec('Gaz',Object.keys(gazlar)),
    ciz:(S,t,{secili})=>{
      const [basinc,faz] = gazlar[secili], sivi = faz.includes('+');
      let svg = S.kutu(73,22,38,18) + S.kutu(45,40,94,151,{r:22,dolgu:'basic-soft'});
      if(sivi) svg += S.kutu(49,125,86,60,{dolgu:'clin-soft',renk:'clin',r:14});
      return svg + S.t(240,70,secili,ortada) + S.t(240,107,basinc,ortada) + S.t(240,145,faz,ortada);
    },
    metin:({secili})=>{const [basinc,faz,s]=gazlar[secili];return secili+' için oda sıcaklığında tüp basıncı '+basinc+', faz durumu: '+faz.toLocaleLowerCase('tr')+'. [[K6 s. '+s+']]';}
  });
  const sicakliklar=['20 °C','36,6 °C','40 °C'];
  const izotermMetni=[
    '52 barda sıvı ve buhar birlikte bulunur. [[K6 s. 226]] Hacim azalırken yoğuşma sürer ve basınç sabit kalır. [[K6 s. 226]]',
    'Kitap kritik noktayı 36,6 °C ve 72 bar olarak işaretler. [[K6 s. 225]]',
    'Kritik sıcaklığın üzerinde sıkıştırma basıncı yükseltir, sıvı faz oluşmaz. [[K6 s. 225]]'
  ];
  VIZ.fk13_izoterm = el => SEKIL.sahne(el,{
    baslik:'Nitröz oksit izotermleri',vb:[360,244],vbDar:[360,244],secenek:sec('İzoterm',sicakliklar),
    ciz:(S,t,{secili})=>{
      const i=sicakliklar.indexOf(secili);
      const yollar=['M83 40 Q86 84 92 134 H213 Q250 163 327 184','M83 38 C94 83 119 99 149 99 C182 99 193 145 327 179','M86 32 C105 66 165 116 327 167'];
      let svg=S.ok([[53,202],[53,28]])+S.ok([[53,202],[336,202]])+S.t(56,18,'Basınç')+S.t(295,230,'Hacim',ortada);
      svg += '<path d="'+yollar[i]+'" fill="none" stroke="'+S.renk('accent')+'" stroke-width="4"/>';
      if(i<2){const y=i===0?134:99;svg += S.cizgi([[53,y],[i===0?92:149,y]],{renk:'muted',kesik:true}) + S.t(47,y-7,i===0?'52':'72',{a:'end'})+S.t(47,y+12,'bar',{a:'end'});}
      return svg;
    },metin:({secili})=>izotermMetni[sicakliklar.indexOf(secili)]
  });
  const evreler=['Sıvı fazla','Sıvı az','Son damla','Yalnız gaz'];
  VIZ.fk13_bosalma = el => SEKIL.sahne(el,{
    baslik:'N₂O tüpü boşalırken',vb:[360,245],vbDar:[360,245],secenek:sec('Boşalma evresi',evreler),
    ciz:(S,t,{secili})=>{
      const i=evreler.indexOf(secili), yukseklik=[70,25,4,0][i];
      let svg=S.kutu(23,65,64,116,{r:14,dolgu:'basic-soft'}) + S.kutu(41,50,28,15);
      if(yukseklik) svg+=S.kutu(27,176-yukseklik,56,yukseklik,{dolgu:'clin-soft',renk:'clin',r:3});
      const basincY = x=> x<=225?76:174-98*Math.exp(-(x-225)/42);
      const egri=Array.from({length:111},(_,k)=>{const x=117+2*k;return [x,basincY(x)];});
      const x=[131,184,225,292][i];
      return svg + S.t(118,40,'Basınç')+S.ok([[114,182],[114,48]])+S.ok([[114,182],[343,182]])+
        S.cizgi(egri,{renk:'accent',w:3})+S.daire(x,basincY(x),6,{dolgu:'clin'})+S.t(300,210,'Zaman',ortada);
    },metin:({secili})=>secili==='Yalnız gaz'?'Gaz çıkışı sürdükçe basınç üstel olarak düşer. [[K6 s. 228]]':'Sabit sıcaklıkta sıvı tükenene kadar buharın yenilenmesi basıncı platoda tutar. [[K6 s. 227–228]]'
  });
  VIZ.fk13_manifold = el => SEKIL.sahne(el,{
    baslik:'İki sıralı oksijen manifoldu',vb:[360,260],vbDar:[360,260],secenek:sec('Etkin sıranın durumu',['Besliyor','Basıncı düştü']),
    ciz:(S,t,{secili})=>{
      const yedek=secili==='Basıncı düştü';
      let svg='';
      [false,true].forEach((sira,i)=>{
        const x=15+i*180,etkin=sira===yedek,renk=etkin?'accent':'muted';
        svg+=S.kutu(x,20,150,52,{yazi:i?'Yedek sıra':'İlk sıra',renk,dolgu:etkin?'accent-soft':'paper'})+
          S.ok([[x+75,73],[x+75,91],[180,91],[180,115]],{renk,kesik:!etkin,soluk:!etkin});
      });
      return svg+S.kutu(71,119,218,48,{yazi:'Basınç düşürücü'})+S.ok([[180,168],[180,194]],{renk:'accent'})+
        S.kutu(62,198,236,43,{yazi:'Merkezi hat · 4 bar',dolgu:'accent-soft'});
    },metin:({secili})=>secili==='Besliyor'?'Dolu tüplerdeki 137 bar, hatta verilmeden önce 4 bara düşürülür. [[K6 s. 231–232]]':'Etkin tüp grubunun basıncı düştüğünde sistem otomatik olarak diğer gruba geçer. [[K6 s. 231]]'
  });
  const tr = value => value.toLocaleString('tr-TR',{maximumFractionDigits:4});
  VIZ.fk13_dayanim = el => SEKIL.grafik(el,{
    baslik:'Dolum ve tasarım basıncı', vb:[640,300], vbDar:[360,290],
    x:{min:0,max:137,ad:'Dolum basıncı (bar)',adimlar:[0,44,137]},
    y:{min:0,max:227.42,ad:'Tasarım (bar)',adimlar:[0,137]},
    param:[{id:'basinc',ad:'Dolum basıncı',min:44,max:137,adim:1,deger:137,birim:'bar'}],
    egriler:[{f:x=>1.66*x}],noktalar:p=>[{x:p.basinc,y:p.basinc*1.66}],
    okuma:p=>tr(p.basinc)+' bar × 1,66 = '+tr(1.66*p.basinc)+' bar tasarım basıncı. [[K6 s. 221]]'
  });
  const oran = p => p.secili==='Sıcak iklim' ? 0.67 : 0.75;
  VIZ.fk13_dolum = el => SEKIL.grafik(el,{
    baslik:'Su kapasitesi ve gaz kütlesi', vb:[640,300], vbDar:[360,290],
    secenek:sec('Dolum oranı',['Birleşik Krallık','Sıcak iklim']),
    x:{min:0,max:1,ad:'Su kapasitesi (kg)',adimlar:[0,0.5,1]},
    y:{min:0,max:0.75,ad:'Gaz kütlesi (kg)',adimlar:[0,0.75]},
    param:[{id:'su',ad:'Su kapasitesi',min:0,max:1,adim:0.01,deger:1,birim:'kg'}],
    egriler:[{f:(x,p)=>x*oran(p)}],noktalar:p=>[{x:p.su,y:p.su*oran(p)}],
    okuma:p=>tr(p.su)+' kg × '+tr(oran(p))+' = '+tr(p.su*oran(p))+' kg gaz. [[K6 s. 227]]'
  });
  VIZ.fk13_verim = el => SEKIL.grafik(el,{
    baslik:'Sıvı ve gaz oksijen hacimleri',vb:[640,280],vbDar:[360,270],
    x:{min:0,max:1,ad:'Sıvı oksijen (L)',adimlar:[0,0.5,1]},
    y:{min:0,max:842,ad:'Gaz · STP (L)',adimlar:[0,421,842]},
    param:[{id:'hacim',ad:'Sıvı oksijen',min:0,max:1,adim:0.01,deger:1,birim:'L'}],
    egriler:[{f:v=>842*v}],noktalar:p=>[{x:p.hacim,y:842*p.hacim}],
    okuma:p=>p.hacim.toLocaleString('tr-TR')+' L sıvı × 842 = '+(842*p.hacim).toLocaleString('tr-TR',{maximumFractionDigits:2})+' L gaz (STP). [[K6 s. 232]]'
  });
  const yollar={
    'Aspirat':['Aspirasyon ucu','Geniş lümenli hortum','Toplama rezervuarı'],
    'Kaynağın korunması':['Rezervuardan çıkan gaz','Hat filtresi','Vakum kaynağı'],
    'Gazın atılması':['Aspire edilen gaz','Bakteri filtresi','Atmosfer']
  };
  VIZ.fk13_vakum = el => SEKIL.sahne(el,{
    baslik:'Aspirasyon yolları',vb:[360,235],vbDar:[360,235],secenek:sec('İzlenecek yol',Object.keys(yollar)),
    ciz:(S,t,{secili})=>yollar[secili].map((ad,i)=>{
      const y=10+i*77;
      return (i?S.ok([[180,y-28],[180,y-4]],{renk:'accent'}):'')+S.kutu(46,y,268,48,{yazi:ad,dolgu:i===2?'accent-soft':'paper'});
    }).join(''),
    metin:({secili})=>({'Aspirat':'Düşük dirençli hortumdan geçen materyal rezervuarda toplanır.','Kaynağın korunması':'Hat filtresi aspirasyon kaynağını korur.','Gazın atılması':'Atmosfere verilen gaz için bakteri filtresi bulunur.'})[secili]+' [[K6 s. 234]]'
  });
  const koseler=['Yakıt','Oksitleyici','Tutuşturma'];
  VIZ.fk13_yangin = el => SEKIL.sahne(el,{
    baslik:'Yanma üçgeni ve korunma',vb:[360,206],vbDar:[360,206],secenek:sec('Köşe',koseler),
    ciz:(S,t,{secili})=>{
      let svg=S.cizgi([[180,42],[83,157],[278,157],[180,42]],{renk:'muted',w:3});
      [[180,42],[83,157],[278,157]].forEach(([x,y],i)=>{
        svg+=S.kutu(x-70,y-20,140,40,{yazi:koseler[i],dolgu:secili===koseler[i]?'accent-soft':'paper',renk:secili===koseler[i]?'accent':'line'});
      });return svg;
    },metin:({secili})=>({
      'Yakıt':'Cilt temizliğinde kullanılan alkolün buharı dar alanlarda birikebilir. [[K6 s. 236]]',
      'Oksitleyici':'Kapalı devre, atık gaz tahliyesi ve havalandırma çevrede oksijen birikmesini azaltır. [[K6 s. 235–236]]',
      'Tutuşturma':'Koter gibi sıcak nesneler, elektrik arkı ve statik boşalma tutuşturma kaynağı olabilir. [[K6 s. 236]]'
    })[secili]
  });
})();
