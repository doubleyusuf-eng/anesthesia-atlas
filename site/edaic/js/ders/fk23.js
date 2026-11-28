(() => {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (ad, liste) => ({id:'kip', ad, liste:liste.map(d => ({d, ad:d}))});
  const etiket = (S,x,y,ad) => S.t(x,y,ad,{a:'middle',c:'b'});
  const panel = (S,x,y,w,h,ad) => S.kutu(x,y,w,h,{yazi:ad,dolgu:'accent-soft',renk:'accent'});
  const boyut = {vb:[640,210], vbDar:[360,210]};
  const sayi = (n,hane=2) => n.toLocaleString('tr-TR',{maximumFractionDigits:hane});
  const hiz = {'Ortalama doku':1540, Hava:330, Su:1480, Kan:1570, Kemik:4000};
  const derinlik = (sure, ortam) => hiz[ortam]*sure/2000; // µs ve m/s → mm; gidiş-dönüş.
  VIZ.fk23_yanki = el => SEKIL.grafik(el,{
    baslik:'Gidiş-dönüş süresi ile derinlik', vb:[640,300], vbDar:[360,275],
    secenek:sec('Ortam',Object.keys(hiz)),
    x:{min:0,max:2,ad:'Gidiş-dönüş süresi (µs)',adimlar:[0,1,2]},
    y:{min:0,max:4,ad:'Derinlik (mm)',adimlar:[0,2,4]},
    param:[{id:'sure',ad:'Örnek dönüş süresi',min:0,max:2,adim:0.1,deger:2,birim:'µs'}],
    egriler:[{f:(t,p)=>derinlik(t,p.kip),renk:'accent'}],
    noktalar:p=>[{x:p.sure,y:derinlik(p.sure,p.kip)}],
    dikey:p=>[{x:p.sure}],
    okuma:p=>`<b>${p.kip}</b> için ses hızı ${sayi(hiz[p.kip])} m/s alındığında, seçtiğiniz ${sayi(p.sure)} µs sürenin karşılığı ${sayi(derinlik(p.sure,p.kip),3)} mm derinliktir. [[K6 s. 378]] [[K6 s. 387]]`
  });

  VIZ.fk23_prob = el => SEKIL.cizim(el,{
    baslik:'Doğrusal ultrason probunun kesiti',
    giris:'Önce seramik sırayı, ardından dokuyla temas eden yüzeyi seçin. [[K6 s. 380]]',
    gorunumler:[{ad:'Başlık kesiti',resim:'img/fizik/23-prob.webp',en:1024,boy:936,kirp:[0,545,1024,391],noktalar:[
      {x:125,y:846,ad:'Seramik eleman',metin:'İnce piezoelektrik dilimin kalınlığı hedef rezonans frekansında yarım dalga boyuna karşılık gelir. [[K6 s. 380]]'},
      {x:575,y:846,ad:'Doğrusal dizi',metin:'Yan yana yerleştirilen dönüştürücülerin her biri bağımsız uyarılabilir ve yankı alabilir. [[K6 s. 380]]'},
      {x:742,y:886,ad:'Dokuya bakan kaplama',metin:'Silikon kauçuk veya benzeri kaplama dokuyla akustik uyum sağlayarak sesin iletimini artırır. [[K6 s. 380]]'}
    ]}]
  });

  VIZ.fk23_dizi = el => SEKIL.sahne(el,{
    ...boyut, baslik:'Faz dizisinde gecikme ve dalga cephesi',secenek:sec('Uyarı zamanlaması',['Eşzamanlı','Kısa gecikme','Uzun gecikme']),
    ciz:(S,t,p)=>{
      const egim = {'Eşzamanlı':0,'Kısa gecikme':0.18,'Uzun gecikme':0.36}[p.kip];
      const merkez=S.w/2, dus=Math.sqrt(1-egim*egim);
      let res=etiket(S,merkez,22,'Eleman dizisi');
      const cephe=[];
      for(let i=0;i<7;i++){
        const x=merkez+(i-3)*24, r=70-(x-merkez)*egim;
        res+=S.kutu(x-10,33,20,10,{r:2,dolgu:'basic',renk:'basic'});
        const yay=Array.from({length:45},(_,k)=>{
          const a=Math.PI*k/44;
          return [x+r*Math.cos(a),43+r*Math.sin(a)];
        });
        res+=S.cizgi(yay,{renk:'muted',w:1.4,soluk:true});
        cephe.push([x+r*egim,43+r*dus]);
      }
      const [x,y]=cephe[3];
      return res+S.cizgi(cephe,{renk:'accent',w:4})+S.ok([[x,y],[x+48*egim,y+48*dus]],{renk:'accent',w:3})+etiket(S,merkez,195,'Birleşik cephenin ilerleyişi');
    },
    metin:p=>p.kip==='Eşzamanlı'?'Elemanlardan çıkan dalgalar eşit yol alır ve ortak cephe diziye paralel kalır. [[K6 s. 380–381]]':'Soldaki eleman önce uyarılır, ardışık uyarılar arasındaki gecikme arttıkça ortak cephe daha fazla eğilir. [[K6 s. 380–381]]'
  });

  VIZ.fk23_goruntu = el => SEKIL.sahne(el,{
    ...boyut,baslik:'A, B ve M ekranlarının eksenleri',secenek:sec('Görüntü kipi',['A-modu','B-modu','M-modu']),
    ciz:(S,t,p)=>{
      const l=85,r=S.w-34,top=42,b=157;
      const a=p.kip==='A-modu', m=p.kip==='M-modu';
      let s=S.ok([[l,b],[r+9,b]],{renk:'muted'})+S.ok(a?[[l,b],[l,top-9]]:[[l,top-9],[l,b]],{renk:'muted'});
      s+=S.t(43,99,a?'Genlik':'Derinlik',{a:'middle',r:-90});
      s+=etiket(S,(l+r)/2,190,a?'Derinlik':m?'Zaman':'Lateral konum');
      const pts = fn=>Array.from({length:121},(_,i)=>[l+(r-l)*i/120,fn(i/120)]);
      if(a){
        const pik=(x,c,h)=>Math.max(0,1-Math.abs(x-c)/0.028)*h;
        return s+S.cizgi(pts(x=>b-pik(x,0.32,62)-pik(x,0.7,98)),{renk:'accent',w:3});
      }
      if(m){
        for(const y of [68,119]) s+=S.cizgi(pts(x=>y+11*Math.sin(3*Math.PI*x)),{renk:y===68?'muted':'accent',w:y===68?2:4});
        return s;
      }
      for(const y of [68,119]) s+=S.cizgi(pts(x=>y+10*Math.sin(Math.PI*x)),{renk:y===68?'muted':'accent',w:y===68?2:4});
      return s;
    },
    metin:p=>({'A-modu':'Her tepenin yatay konumu bir sınırın derinliğini, yüksekliği yankının genliğini gösterir. [[K6 s. 382]]','B-modu':'Aynı kesitte farklı lateral konumlar yan yana yer alır, daha güçlü yansıtan sınır daha parlak görünür. [[K6 s. 381–382]]','M-modu':'Aynı hat tekrar taranır, sınırın derinliğindeki değişim zaman ekseninde iz bırakır. [[K6 s. 382]]'})[p.kip]
  });

  VIZ.fk23_doppler = el => SEKIL.sahne(el,{
    ...boyut,baslik:'Doppler örnekleme bölgesi',secenek:sec('Örnekleme',['Sürekli dalga','Atımlı dalga']),
    ciz:(S,t,p)=>{
      const x=S.w/2, cw=p.kip==='Sürekli dalga';
      let s=panel(S,x-35,10,70,32,'Prob')+S.cizgi([[x,42],[x,185]],{kesik:true,renk:'muted'});
      for(const y of [80,141]){
        s+=S.cizgi([[x-100,y+18],[x+100,y-18]],{renk:'basic-soft',w:19});
        s+=S.ok([[x-70,y+13],[x+70,y-13]],{renk:'basic'});
      }
      return s+S.cizgi([[x,cw?44:130],[x,cw?183:152]],{renk:'accent',w:6})+etiket(S,x,204,cw?'Işın boyunca':'Seçilen hacim');
    },metin:p=>p.kip==='Sürekli dalga'?'Işın boyunca algılanan hızlar birlikte kaydedilir. [[K6 s. 383]]':'Vurgulanan kısa kesimdeki akım örneklenir, hızın hangi derinliğe ait olduğu bilinir. [[K6 s. 383]]'
  });

  VIZ.fk23_zayiflama = el => SEKIL.sahne(el,{
    ...boyut,baslik:'Frekans ve penetrasyon',param:[{id:'frekans',ad:'Prob frekansı',min:2,max:19,adim:1,deger:10,birim:'MHz'}],
    ciz:(S,t,p)=>{
      const oran=(p.frekans-2)/17;
      const x=22,w=S.w-44;
      let s='';
      for(const [y,ad,pay] of [[36,'Erişilebilen derinlik',1-0.7*oran],[124,'Seçilebilen ayrıntı',0.3+0.7*oran]]){
        s+=S.t(x,y,ad,{c:'b'})+S.kutu(x,y+14,w,19,{dolgu:'chip'})+S.kutu(x,y+14,w*pay,19,{dolgu:'accent',renk:'accent'});
      }
      return s;
    },metin:p=>`${p.frekans} MHz seçildiğinde çubuklar frekansın penetrasyon ve ayrıntı üzerindeki etkisinin yönünü gösterir, bir derinlik ölçümü vermez. [[K6 s. 384–385]]`
  });

  const z = {Hava:0.0004, Yağ:1.38, Su:1.48, Kan:1.65, Kas:1.70, Kemik:7.80};
  const yansima = ad => ((z[ad]-z.Kas)/(z[ad]+z.Kas))**2;
  VIZ.fk23_yansima = el => SEKIL.sahne(el,{
    ...boyut,baslik:'Kas sınırında yansıyan ve iletilen şiddet',secenek:sec('İkinci ortam',['Kemik','Kas','Kan','Yağ','Su','Hava']),
    ciz:(S,t,p)=>{
      const r=yansima(p.kip), w=S.w-48;
      let s=etiket(S,S.w/2,30,'Kas → '+p.kip);
      for(const [y,ad,pay,renk] of [[63,'Yansıyan',r,'accent'],[140,'Geçen',1-r,'basic']]){
        s+=S.t(24,y,ad,{c:'b'})+S.t(S.w-24,y,'%'+sayi(100*pay,3),{a:'end'});
        s+=S.kutu(24,y+14,w,20,{r:0,dolgu:'chip'});
        if(pay>0) s+=S.kutu(24,y+14,w*pay,20,{r:0,dolgu:renk,renk,w:0.1});
      }
      return s;
    },metin:p=>`Kasın empedansı 1,70 MRayl ve seçilen ikinci ortamın empedansı ${sayi(z[p.kip],4)} MRayl olduğunda şiddetin %${sayi(100*yansima(p.kip),3)} kadarı geri döner. [[K6 s. 386–387]]`
  });

  VIZ.fk23_cozunurluk = el => SEKIL.sahne(el,{
    ...boyut,baslik:'Hedeflerin ve ışının uzaydaki ilişkisi',secenek:sec('İncele',['Aksiyal','Lateral','Yakın ve uzak alan']),
    ciz:(S,t,p)=>{
      const x=S.w/2;
      let s=panel(S,x-37,8,74,28,'Prob');
      for(const yon of [-1,1]) s+=S.cizgi([[x+yon*33,38],[x+yon*31,123],[x+yon*53,194]],{renk:'muted'});
      if(p.kip==='Yakın ve uzak alan'){
        return s+S.cizgi([[16,123],[S.w-16,123]],{kesik:true,renk:'line'})+S.t(x-50,84,'Fresnel',{a:'end'})+S.t(x-55,158,'Fraunhofer',{a:'end'});
      }
      const aks=p.kip==='Aksiyal';
      for(const [dx,y] of (aks?[[0,73],[0,116]]:[[-20,98],[20,98]])) s+=S.daire(x+dx,y,6,{renk:'accent',dolgu:'accent'});
      return s+etiket(S,x,183,aks?'Işın doğrultusunda':'Işına dik');
    },metin:p=>({'Aksiyal':'Art arda duran iki hedefin ayrımını atım uzunluğu belirler. [[K6 s. 388]]','Lateral':'Aynı derinlikte yan yana duran iki hedefin ayrımını başlıca ışın genişliği belirler. [[K6 s. 388]]','Yakın ve uzak alan':'Çözünürlük yakın alanda en iyidir, uzak alanda ışın açılmaya başlar. [[K6 s. 389]]'})[p.kip]
  });

  VIZ.fk23_kalp = el => SEKIL.sahne(el,{
    ...boyut,baslik:'İki ekokardiyografi penceresi',secenek:sec('Yaklaşım',['TTE','TOE']),
    ciz:(S,t,p)=>{
      const x=S.w/2, tte=p.kip==='TTE';
      return panel(S,x-109,10,218,40,tte?'Prob göğüs duvarında':'Prob özofagusta')
        +S.ok([[x,52],[x,83]],{renk:'accent'})
        +S.kutu(x-112,87,224,42,{yazi:tte?'Ön kalp yapıları':'Sol atriyum komşuluğu'})
        +S.ok([[x,130],[x,151]],{renk:'accent'})
        +panel(S,x-139,154,278,48,tte?['Aort kapağı','Pulmoner kapak']:['Mitral kapak, sol atriyum ve apendiksi','İnen aorta']);
    },metin:p=>p.kip==='TTE'?'Ön yapıların görüntülenmesinde göğüs duvarından yaklaşılır, kaburgalar kullanılabilen pencereyi sınırlar. [[K6 s. 390]]':'Özofagusun kalbin arkasındaki konumu sol atriyum ve mitral kapak için yakın bir pencere sağlar. [[K6 s. 390]]'
  });

  const evreler = [
    ['Düşük basınç','Yerel basınç sıvının buhar basıncının altına indiğinde kabarcık oluşabilir. [[K6 s. 390–391]]',6],
    ['Büyüme','Düşük basınç evresinde oluşan kabarcık büyür. [[K6 s. 390–391]]',26],
    ['Çökme','Basınç yeniden değiştiğinde kabarcık şiddetle çöker, taş yakınında oluşan şok dalgası taşın yüzeyine çarpabilir. [[K6 s. 391]]',3]
  ];
  VIZ.fk23_kavitasyon = el => SEKIL.adim(el,{
    ...boyut,baslik:'Taş yakınında akustik kavitasyon',
    adimlar:evreler.map(([ad,metin,r],i)=>({ad,metin,ciz:S=>{
      const x=S.w/2;
      let s=S.kutu(x-140,35,280,134,{dolgu:'basic-soft',renk:'basic'})+S.t(x-116,61,'Sıvı');
      s+=S.cizgi([[x+80,50],[x+63,75],[x+69,99],[x+55,123],[x+72,151],[x+125,151],[x+125,50],[x+80,50]],{dolgu:'warn-soft',renk:'warn'});
      s+=etiket(S,x+95,106,'Taş')+S.daire(x,102,r,{renk:'basic',dolgu:'paper'});
      if(i===2) s+=S.ok([[x+9,102],[x+63,102]],{renk:'accent',w:4});
      return s+etiket(S,x,197,['Kabarcık oluşumu','Kabarcığın büyümesi','Sınıra ulaşan şok dalgası'][i]);
    }}))
  });
})();
