(() => {
  const fmt = (n, digits = 2) => n.toLocaleString('tr-TR', {maximumFractionDigits: digits});
  const param = (id, ad, min, max, adim, deger) => ({id, ad, min, max, adim, deger});
  const axis = (ad, min, max, adimlar) => ({ad, min, max, adimlar});
  const plot = (el, config) => SEKIL.grafik(el, {vb: [540, 270], vbDar: [320, 225], ...config});
  const scene = (el, config) => SEKIL.sahne(el, {vb: [320, 155], ...config});

  VIZ.fk27_kesir = el => scene(el, {
    baslik: 'Bir bütünün eşit parçaları',
    param: [param('pay', 'Seçilen üçte birlerin sayısı', 1, 3, 1, 1)],
    ciz: (S, t, p) => [0, 1, 2].map(i => S.kutu(18 + 95*i, 35, 92, 55,
      {dolgu: i < p.pay ? 'accent-soft' : 'paper', yazi: i < p.pay ? '⅓' : '·'})).join('') +
      S.t(160, 127, p.pay + '/3', {a:'middle', c:'b'}),
    metin: p => 'Üç eşit parçanın ' + p.pay + ' tanesi seçili. [[K6 s. 426–428]]'
  });

  VIZ.fk27_ph = el => plot(el, {
    baslik: 'pH yükselirken hidrojen iyonu derişimi',
    x: axis('pH', 7, 8, [7, 7.4, 7.7, 8]), y: axis('[H⁺] (nmol/L)', 0, 100, [0, 40, 80, 100]),
    param: [param('ph', 'pH', 7, 8, 0.1, 7.4)],
    egriler: [{f: x => 10**(9-x)}], noktalar: p => [{x:p.ph, y:10**(9-p.ph)}],
    okuma: p => 'pH ' + fmt(p.ph) + ' için [H⁺] yaklaşık ' + fmt(10**(9-p.ph), 0) + ' nmol/L. [[K6 s. 430]]'
  });

  VIZ.fk27_egim = el => plot(el, {
    baslik: 'Doğru ve parabol üzerinde yerel eğim', x:axis('x', 0, 2, [0, 1, 2]), y:axis('y', 0, 4, [0, 1, 2, 4]),
    secenek:{id:'tip', liste:[{d:'kare',ad:'y = x²'},{d:'dogru',ad:'y = x'}]},
    param:[param('x','Teğet noktası x',0,2,0.1,1)],
    egriler:[{f:(x,p)=>p.tip === 'kare' ? x*x : x}],
    noktalar:p=>[{x:p.x,y:p.tip === 'kare' ? p.x*p.x : p.x}],
    ek:(S,p,X,Y)=>{
      const m = p.tip === 'kare' ? 2*p.x : 1, y = p.tip === 'kare' ? p.x*p.x : p.x;
      const left = Math.max(0,p.x-0.5,m ? p.x-y/m : 0);
      const right = Math.min(2,p.x+0.5,m ? p.x+(4-y)/m : 2);
      return S.cizgi([[X(left),Y(y+m*(left-p.x))],[X(right),Y(y+m*(right-p.x))]],{renk:'clin',kesik:true,w:3});
    },
    okuma:p=>'Kesikli teğetin eğimi dy/dx = '+fmt(p.tip === 'kare' ? 2*p.x : 1)+'. [[K6 s. 431–432]] [[K6 s. 436]]'
  });

  VIZ.fk27_ucgen = el => scene(el, {
    baslik:'Dik üçgende hipotenüs sabitken karşı ve komşu kenar',
    param:[param('aci','θ (derece)',1,89,1,45)],
    ciz:(S,t,p)=>{
      const r=p.aci*Math.PI/180, x=44+115*Math.cos(r), y=137-115*Math.sin(r);
      const corner=Math.min(8,(137-y)/2,(x-44)/2);
      return S.cizgi([[44,137],[x,137]],{renk:'clin',w:4}) +
        S.cizgi([[x,137],[x,y]],{renk:'accent',w:4}) +
        S.cizgi([[x,y],[44,137]],{renk:'ink'}) +
        S.cizgi([[x-corner,137],[x-corner,137-corner],[x,137-corner]],{renk:'muted',w:1})+
        S.t(22,139,'θ') +
        S.t(175,56,'Hipotenüs = 1') +
        S.t(175,86,'Karşı = '+fmt(Math.sin(r)),{renk:'accent'}) +
        S.t(175,116,'Komşu = '+fmt(Math.cos(r)),{renk:'clin'});
    },
    metin:p=>{ const r=p.aci*Math.PI/180; return 'Birim hipotenüsle karşı kenar sin θ ≈ '+fmt(Math.sin(r),3)+', komşu kenar cos θ ≈ '+fmt(Math.cos(r),3)+' ve oranları tan θ ≈ '+fmt(Math.tan(r),3)+'. [[K6 s. 433]]'; }
  });

  VIZ.fk27_dalga = el => plot(el,{
    baslik:'Aynı açıdaki sinüs ve kosinüs', x:axis('Açı (π radyan cinsinden)',0,2,[0,0.5,1,1.5,2]),
    y:axis('Fonksiyon değeri',-1,1,[-1,0,1]), param:[param('u','Açı / π',0,2,0.05,0.5)],
    egriler:[{f:x=>Math.sin(Math.PI*x)},{f:x=>Math.cos(Math.PI*x),renk:'clin',kesik:true}],
    dikey:p=>[{x:p.u}], noktalar:p=>[{x:p.u,y:Math.sin(Math.PI*p.u)},{x:p.u,y:Math.cos(Math.PI*p.u),renk:'clin'}],
    okuma:p=>'Sürekli çizgi sinüs ('+fmt(Math.sin(Math.PI*p.u))+'), kesikli çizgi kosinüs ('+fmt(Math.cos(Math.PI*p.u))+'). [[K6 s. 434–435]]'
  });

  VIZ.fk27_integral = el => plot(el,{
    baslik:'Dikdörtgenlerin toplamından eğri altındaki alana', x:axis('x',0,1,[0,1]),y:axis('f(x) = x²',0,1,[0,1]),
    param:[param('n','Eşit dilim sayısı',1,64,1,4)],egriler:[{f:x=>x*x}],
    ek:(S,p,X,Y)=>Array.from({length:p.n},(_,i)=>{
      const a=i/p.n,b=(i+1)/p.n,h=(a+b)**2/4;
      return S.kutu(X(a),Y(h),X(b)-X(a),Y(0)-Y(h),{r:0,dolgu:'accent-soft',renk:'muted',w:0.7});
    }).join('') + S.cizgi(Array.from({length:65},(_,i)=>[X(i/64),Y((i/64)**2)]),{renk:'accent'}),
    okuma:p=>'Orta noktalardaki yüksekliklerle alan toplamı '+fmt(1/3-1/(12*p.n*p.n),5)+'; integralin verdiği alan ⅓. [[K6 s. 436–437]]'
  });

  VIZ.fk27_araba = el => plot(el,{
    baslik:'Hız–zaman grafiğinde eğim ve yol', x:axis('Göreli zaman',0,3,[0,1,2,3]), y:axis('Hız / en yüksek hız',0,1,[0,1]),
    param:[param('t','Göreli zaman',0,3,0.1,1.5)],
    egriler:[{f:x=>Math.min(x,1,3-x)}],
    ek:(S,p,X,Y)=>{
      const times=[0,...[1,2].filter(v=>v<p.t),p.t];
      return S.cizgi([[X(0),Y(0)],...times.map(v=>[X(v),Y(Math.min(v,1,3-v))]),[X(p.t),Y(0)],[X(0),Y(0)]],{renk:'accent',dolgu:'accent',soluk:true});
    },
    okuma:p=>'Başlangıçtan işarete kadar gidilen yol, grafiğin göreli birimleriyle '+fmt(p.t<=1 ? p.t**2/2 : p.t<=2 ? p.t-0.5 : 2-(3-p.t)**2/2)+'. [[K6 s. 438]]'
  });

  VIZ.fk27_solunum = el => plot(el,{
    baslik:'Solunum döngüsünde akım ve biriken hacim', x:axis('Döngünün tamamlanan kesri',0,1,[0,0.5,1]),
    y:axis('Göreli akım',-1,1,[-1,0,1]), param:[param('u','Döngünün tamamlanan kesri',0,1,0.01,0.5)],
    egriler:[{f:x=>Math.sin(2*Math.PI*x)}],yatay:()=>[{y:0}],
    ek:(S,p,X,Y)=>{
      const area=(a,b,color)=>{
        const pts=Array.from({length:65},(_,i)=>{const x=a+(b-a)*i/64;return [X(x),Y(Math.sin(2*Math.PI*x))];});
        return S.cizgi([[X(a),Y(0)],...pts,[X(b),Y(0)],[X(a),Y(0)]],{renk:color,dolgu:color,soluk:true});
      };
      return area(0,Math.min(p.u,0.5),'accent')+(p.u>0.5 ? area(0.5,p.u,'clin') : '');
    },
    okuma:p=>'Taralı alanların işaretli toplamı, bu şemada inspirasyon sonu hacminin %'+fmt(50*(1-Math.cos(2*Math.PI*p.u)),0)+'’i kadar net hacim değişimine karşılık gelir. [[K6 s. 434]] [[K6 s. 439]]'
  });

  VIZ.fk27_faiz = el => plot(el,{
    baslik:'Aynı başlangıç tutarıyla basit ve bileşik faiz', x:axis('Yıl',0,10,[0,1,5,10]), y:axis('Bakiye (£)',100,260,[100,150,200,260]),
    param:[param('yil','Tamamlanan yıl',0,10,1,2)],
    egriler:[{f:x=>100*(1.1**x)},{f:x=>100+10*x,renk:'clin',kesik:true}],
    noktalar:p=>[{x:p.yil,y:100*(1.1**p.yil)},{x:p.yil,y:100+10*p.yil,renk:'clin'}],
    okuma:p=>'Yıl sonunda bileşik faizle '+fmt(100*1.1**p.yil)+' £ (sürekli çizgi), basit faizle '+fmt(100+10*p.yil)+' £ (kesikli çizgi). [[K6 s. 442]]'
  });

  VIZ.fk27_azalma = el => plot(el,{
    baslik:'Yarı ömürlerle birinci dereceden eliminasyon', x:axis('Geçen yarı ömür sayısı',0,4,[0,1,2,3,4]), y:axis('Kalan derişim (%)',0,100,[0,50,100]),
    param:[param('t','Geçen yarı ömür sayısı',0,4,0.1,1)],egriler:[{f:x=>100*2**(-x)}],
    noktalar:p=>[{x:p.t,y:100*2**(-p.t)}],
    okuma:p=>'Başlangıç derişiminin %'+fmt(100*2**(-p.t))+' kadarı kalır. [[K6 s. 443–444]]'
  });
})();
