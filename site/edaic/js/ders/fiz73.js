/* Bölüm 73 · Transfüzyon — SEKIL ile şematik öğretim modelleri. */
(function () {
  'use strict';
  const D73_VIZ = window.VIZ;
  const D73_GRUP = ['O', 'A', 'B', 'AB'];
  const D73_SEKIZ = ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'];
  const D73_SAYI = n => String(Math.round(n * 10) / 10).replace('.', ',');
  const D73_SEC = (id, ad, liste) => ({id, ad, liste: liste.map(x => typeof x === 'string' ? {d:x, ad:x} : x)});
  const D73_Y = (S, x, y, r = 10, renk = 'crit') => S.cizgi([[x,y+r],[x,y],[x-r,y-r]],{renk}) + S.cizgi([[x,y],[x+r,y-r]],{renk});
  function D73_IGM(S,x,y) {
    let s = '';
    for(let i=0;i<5;i++) s += `<g transform="translate(${x} ${y}) rotate(${i*72})">${D73_Y(S,0,-16,8)}</g>`;
    return s;
  }
  function D73_HUCRE(S,x,y,r=22,g='O',d=false,kirik=false) {
    let s = kirik ? S.cizgi([[x-r,y],[x-r/2,y-r],[x,y-r/2]],{renk:'crit',w:3}) + S.cizgi([[x+6,y+r],[x+r,y+6],[x+r+5,y-r/2]],{renk:'crit',w:3}) : S.daire(x,y,r,{dolgu:'crit-soft',renk:'crit'}) + S.daire(x,y,r*.42,{dolgu:'paper',renk:'crit'});
    if(kirik) return s;
    for(let i=0;i<6;i++) {
      const a=i*Math.PI/3, xx=x+Math.cos(a)*r, yy=y+Math.sin(a)*r;
      if(r>45) {
        s+= `<g transform="translate(${xx} ${yy}) rotate(${i*60+90})">` + S.cizgi([[0,0],[0,-22]],{renk:'muted'}) + S.kutu(-4,-10,8,7,{r:0,dolgu:'muted',renk:'muted'}) + S.kutu(-4,-20,8,7,{r:0,dolgu:'muted',renk:'muted'});
        const ag=g==='AB'?(i%2?'A':'B'):g;
        if(ag==='A') s+=S.cizgi([[0,-32],[-7,-23],[7,-23],[0,-32]],{renk:'basic',dolgu:'basic'});
        if(ag==='B') s+=S.daire(0,-28,5,{renk:'clin',dolgu:'clin'});
        s+='</g>';
      }
    }
    if(d) for(let i=0;i<4;i++) s+=S.daire(x+Math.cos(i*Math.PI/2)*r,y+Math.sin(i*Math.PI/2)*r,4,{renk:'warn',dolgu:'warn'});
    return s;
  }
  const D73_ABO_METIN = {
    O:'<b>Grup O (%44).</b> Eritrosit yalnız çekirdek H antijenini taşır; plazmada anti-A ve anti-B IgM bulunur. Başka bir grup seçin. [[K1 s. 350–351]]',
    A:'<b>Grup A (%42).</b> H antijenine N-asetilgalaktozamin eklenir: A antijeni. Plazmada yalnız anti-B vardır. [[K1 s. 350–351]]',
    B:'<b>Grup B (%10).</b> H antijenine D-galaktoz eklenir: B antijeni. Plazmada yalnız anti-A vardır. [[K1 s. 350–351]]',
    AB:'<b>Grup AB (%4).</b> Eritrosit A ve B antijenini birlikte taşır; plazmada anti-A da anti-B de yoktur. [[K1 s. 350–351]]'
  };
  D73_VIZ.f73_abo = el => SEKIL.sahne(el, {
    baslik:'ABO antijenleri, plazma antikorları ve İngiltere sıklıkları', vb:[640,490],vbDar:[360,700],
    secenek:D73_SEC('g','Kan grubu',D73_GRUP), metin:p=>D73_ABO_METIN[p.g],
    ciz:(S,t,p)=>{
      const cx=S.dar?180:160, py=S.dar?310:45, px=S.dar?20:340;
      let s=S.t(cx,25,'Eritrosit · '+p.g,{a:'middle',c:'b'})+D73_HUCRE(S,cx,145,70,p.g)+S.t(cx,150,p.g,{a:'middle',c:'b'});
      const label={O:['H çekirdeği: iki şeker','Ek şeker yok'],A:['H + N-asetilgalaktozamin','A antijeni: üç şeker'],B:['H + D-galaktoz','B antijeni: üç şeker'],AB:['A: N-asetilgalaktozamin','B: D-galaktoz; ikisi de var']};
      s+=S.t(cx,265,label[p.g],{a:'middle',c:'k'});
      s+=S.kutu(px,py,S.dar?320:280,175,{dolgu:'basic-soft'})+S.t(px+(S.dar?160:140),py+27,'Plazma · IgM',{a:'middle',c:'b'});
      const ab=p.g==='O'?['anti-A','anti-B']:p.g==='AB'?[]:[p.g==='A'?'anti-B':'anti-A'];
      ab.forEach((a,i)=>{const x=px+(S.dar?160:140)+(ab.length===2?(i?65:-65):0);s+=D73_IGM(S,x,py+80)+S.t(x,py+133,a,{a:'middle'});});
      if(!ab.length) s+=S.t(px+(S.dar?160:140),py+90,['anti-A ve','anti-B yok'],{a:'middle'});
      const fy=S.dar?530:325;
      s+=S.t(S.w/2,fy,'İngiltere nüfusunda sıklık',{a:'middle',c:'b'});
      D73_GRUP.forEach((g,i)=>{const x=25+i*(S.w-50)/4,w=(S.w-50)/4-10,n=[44,42,10,4][i];s+=S.kutu(x,fy+18,w,65,{renk:p.g===g?'accent':'line',dolgu:p.g===g?'accent-soft':'paper'})+S.kutu(x+6,fy+53,(w-12)*n/44,20,{dolgu:'accent',renk:'accent',r:2})+S.t(x+w/2,fy+41,g+' %'+n,{a:'middle',c:'k b'});});
      return s+S.t(S.w/2,fy+115,['IgM · plasentayı geçmez','Doğumda yok · ≈6. aydan itibaren'],{a:'middle',c:'k'});
    }
  });
  const D73_RH_AD = ['İlk gebelik','Fetomaternal kanama','Duyarlanma','Aynı / sonraki gebelik','Önleme'];
  const D73_RH_METIN = [
    'Anne RhD negatif, fetüs RhD pozitif; annede anti-D yoktur. İleri düğmesine basın.',
    'Doğum, düşük, travma ya da plasenta ayrılmasıyla RhD pozitif fetal kan anneye karışır.',
    "Annenin bağışıklık sistemi D antijenine karşı anti-D yapar; bu antikor genellikle IgG’dir.",
    'Anti-D IgG plasentayı geçip fetal eritrositlere saldırır; fetüste ağır anemi ve yenidoğanın hemolitik hastalığı gelişebilir.',
    'Duyarlanmamış RhD negatif anneye gebelikte bir ya da iki kez ve doğumda parenteral anti-RhD immünoglobulin verilir; geçen fetal eritrositleri bağlayarak duyarlanmayı önler.'
  ];
  function D73_RH_CIZ(S,i,t) {
    const a=S.dar?[180,110]:[150,150], b=S.dar?[180,360]:[490,150];
    let s='';
    [a,b].forEach((q,j)=>{s+=S.kutu(q[0]-110,q[1]-80,220,160,{r:65,renk:j?'warn':'basic',dolgu:j?'warn-soft':'basic-soft'})+S.t(q[0],q[1]-48,j?'Fetüs · RhD+':'Anne · RhD−',{a:'middle',c:'b'});s+=D73_HUCRE(S,q[0]-50,q[1]+5,18,'O',!!j,i===3&&j===1);s+=D73_HUCRE(S,q[0]+48,q[1]+25,18,'O',!!j,i===3&&j===1);});
    s+= S.dar?S.cizgi([[35,235],[325,235]],{renk:'line',kesik:true,w:8})+S.t(28,220,'Plasenta',{c:'k'}):S.cizgi([[320,30],[320,280]],{renk:'line',kesik:true,w:8})+S.t(320,20,'Plasenta',{a:'middle',c:'k'});
    if(i===1||i===4) {
      const path=[b,a];s+=S.ok(path,{renk:'warn'})+S.akis(path,t,{renk:'crit',n:3});
      for(let k=0;k<2;k++){const u=window.VIZ_YARDIM.RM?(k+.5)/2:(t*.2+k*.5)%1,q=S.boyunca(path,u);s+=D73_HUCRE(S,q[0],q[1],10,'O',true);if(i===4)s+=D73_Y(S,q[0]+12,q[1],7,'ok');}
    }
    if(i===2||i===3) s+=D73_Y(S,a[0],a[1],12)+S.t(a[0],a[1]+64,'anti-D IgG',{a:'middle',c:'k'});
    if(i===2) s+=D73_HUCRE(S,a[0]+25,a[1]-4,12,'O',true)+D73_Y(S,a[0]+14,a[1]-7,8);
    if(i===3) {const path=[a,b],q=S.boyunca(path,window.VIZ_YARDIM.RM?.8:(t*.2)%1);s+=S.ok(path,{renk:'crit'})+D73_Y(S,q[0],q[1],10)+S.akis(path,t,{renk:'crit',n:2,r:2});}
    const notes=[['Annede anti-D yok','D antijeni: turuncu noktalar'],['Doğum · düşük · travma','Plasenta ayrılması'],['Fetal D antijeniyle karşılaşma','Annenin kendi anti-D üretimi'],['IgG anne → fetüs','Ağır anemi → hemolitik hastalık'],['Anti-RhD Ig · gebelikte 1–2 kez','+ doğumda · duyarlanmayı önler']];
    if(i===4) s+=S.kutu(a[0]-20,a[1]-28,40,18,{renk:'ok',dolgu:'ok-soft',r:2})+S.cizgi([[a[0]+20,a[1]-19],[a[0]+40,a[1]-19]],{renk:'ok'})+S.t(a[0],a[1]+65,'Kendi anti-D üretimi yok',{a:'middle',c:'k',renk:'ok'});
    return s+S.t(S.w/2,S.dar?490:325,notes[i],{a:'middle',c:'b',renk:i===4?'ok':'ink'});
  }
  D73_VIZ.f73_rh=el=>SEKIL.adim(el,{baslik:'Rh duyarlanması ve önlenmesi',vb:[640,385],vbDar:[360,550],hareket:true,adimlar:D73_RH_AD.map((ad,i)=>({ad,metin:D73_RH_METIN[i]+' [[K1 s. 351]]',ciz:(S,t)=>D73_RH_CIZ(S,i,t)}))});
  function D73_UYUM(p) {
    const d=D73_SEKIZ.indexOf(p.d),a=p.a,dg=D73_GRUP[Math.floor(d/2)],ag=D73_GRUP[Math.floor(a/2)];
    const ab=[];if(ag==='O'||ag==='B')ab.push('anti-A');if(ag==='O'||ag==='A')ab.push('anti-B');if(a%2===0&&p.anti)ab.push('anti-D');
    const abo=(ab.includes('anti-A')&&dg.includes('A'))||(ab.includes('anti-B')&&dg.includes('B'));
    return {d,a,dg,ag,ab,abo,rh:ab.includes('anti-D')&&d%2===1,duyar:a%2===0&&d%2===1&&!p.anti};
  }
  D73_VIZ.f73_uyum=el=>{
    const temizle=SEKIL.sahne(el,{baslik:'Majör çapraz karşılaştırma modeli',vb:[640,420],vbDar:[360,760],hareket:true,sure:6,dongu:false,
      secenek:D73_SEC('d','Donör eritrosit grubu',D73_SEKIZ),param:[{id:'a',ad:'Alıcı grubu',min:0,max:7,adim:1,deger:3},{id:'anti',ad:'RhD− alıcıda anti-D (0: yok, 1: var)',min:0,max:1,adim:1,deger:0}],
      ciz:(S,t,p)=>{
        const u=D73_UYUM(p),dx=S.dar?180:105,dy=110,tx=S.dar?180:320,ty=S.dar?330:150,ax=S.dar?180:535,ay=S.dar?560:110;
        let s=S.t(dx,dy-80,'Donör '+p.d,{a:'middle',c:'b'})+D73_HUCRE(S,dx,dy,48,u.dg,u.d%2===1)+S.t(dx,dy+78,'Antijen: H'+(u.dg==='O'?'':' + '+u.dg)+(u.d%2?' + D':''),{a:'middle',c:'k'});
        if(u.d===0)s+=S.t(dx,dy+102,'Evrensel donör',{a:'middle',c:'k',renk:'ok'});
        s+=S.kutu(tx-62,ty-65,124,140,{r:30,dolgu:'basic-soft'})+S.t(tx,ty-88,'Majör test',{a:'middle',c:'b'});
        const k=(u.abo||u.rh)?Math.min(t/3,1):0;
        for(let j=0;j<6;j++){const x=tx+S.lerp((j%2?1:-1)*32,(j%2?1:-1)*12,k),y=ty+S.lerp((Math.floor(j/2)-1)*38,(Math.floor(j/2)-1)*20,k);s+=D73_HUCRE(S,x,y,11,'O',false,u.abo&&t>=4);if(k>.2)s+=D73_Y(S,x+10,y-8,6);}
        s+=S.t(tx,ty+105,['Alıcı serumu +','donör eritrositi'],{a:'middle',c:'k'});
        s+=S.t(ax,ay-45,'Alıcı '+D73_SEKIZ[p.a],{a:'middle',c:'b'})+S.t(ax,ay-20,'Plazma antikorları',{a:'middle',c:'k'});
        u.ab.forEach((v,i)=>{s+=D73_Y(S,ax-55+i*52,ay+10,9)+S.t(ax-55+i*52,ay+42,v,{a:'middle',c:'k'});});
        if(!u.ab.length)s+=S.t(ax,ay+20,'anti-A/B/D yok',{a:'middle',c:'k'});
        if(u.a===7)s+=S.t(ax,ay+80,'Evrensel alıcı',{a:'middle',c:'k',renk:'ok'});
        const status=u.abo?['ABO: kümelenme → kompleman','Ani intravasküler hemoliz']:u.rh?['Anti-D: ekstravasküler hemoliz','Genellikle daha hafif']:u.duyar?['Bu modelde kümelenme yok','Duyarlanma riski var']:['Kümelenme yok','ABO / RhD bakımından uyumlu'];
        return s+S.t(S.w/2,S.dar?690:345,status,{a:'middle',c:'b',renk:u.abo?'crit':u.rh||u.duyar?'warn':'ok'});
      },
      metin:p=>{const u=D73_UYUM(p),head='<b>'+p.d+' → '+D73_SEKIZ[p.a]+'.</b> ';
        if(p.d==='O−'&&p.a===3&&!p.anti)return "<b>O RhD negatif → A RhD pozitif.</b> Donör eritrositinde yalnız H antijeni var; alıcının anti-B'si bağlanacak hedef bulamaz: uyumlu. Donörü ve alıcıyı değiştirin. [[K1 s. 351–352]]";
        if(u.abo)return head+'Alıcı antikorları donör eritrositine bağlanır; kompleman etkinleşir ve ani intravasküler hemoliz gelişir: ürtiker, göğüs ağrısı, dispne, şok, hemoglobinüri ve DIC. [[K1 s. 351]]';
        if(u.rh)return head+'Duyarlanmış alıcının anti-D antikoru donör eritrositine bağlanır: genellikle daha hafif ekstravasküler hemoliz. [[K1 s. 351]]';
        return head+'Alıcı antikorları ('+(u.ab.join(', ')||'anti-A/B/D yok')+') hedef bulamaz. Minör gruplar için tam çapraz karşılaştırma gerekir. '+(u.duyar?'Anti-D henüz yoktur; D+ kan verilmesi anti-D yapımını tetikleyebilir. ':'')+'[[K1 s. 351–352]]';}
    });
    // Kit sayısal aralık kullanır; erişilebilir çıktı alıcının gerçek grup adını gösterir.
    const guncelle=()=>{const input=el.querySelector('[data-k="a"]'),out=el.querySelector('[data-o="a"]');out.textContent=D73_SEKIZ[+input.value];input.setAttribute('aria-valuetext',out.textContent);};
    el.addEventListener('input',guncelle);guncelle();return()=>{el.removeEventListener('input',guncelle);temizle();};
  };
  D73_VIZ.f73_saklama=el=>SEKIL.sahne(el,{
    baslik:'4 °C’de eritrosit saklama: şematik değişimler',vb:[640,450],vbDar:[360,470],
    secenek:D73_SEC('e','Gösterilen',[{d:'k',ad:'Torbadaki K⁺'},{d:'d',ad:'2,3-DPG ve ATP'}]),param:[{id:'gun',ad:'Saklama günü',min:0,max:42,adim:1,deger:28,birim:'gün'}],
    ciz:(S,t,p)=>{
      const X=x=>55+x/42*(S.w-78),Y=y=>330-y/(p.e==='k'?50:100)*240;
      let s=S.t(55,20,p.e==='k'?'K⁺ (mmol/L)':['Başlangıcın yüzdesi','(nitel)'],{c:'b'})+S.t(55,54,'4 °C · raf ömrü 42 gün',{c:'k'});
      [0,14,28,42].forEach(x=>{s+=S.cizgi([[X(x),90],[X(x),330]],{renk:'line',w:1})+S.t(X(x),353,x,{a:'middle',c:'k'});});
      (p.e==='k'?[0,10,20,30,40,50]:[0,25,50,75,100]).forEach(y=>{s+=S.cizgi([[55,Y(y)],[S.w-23,Y(y)]],{renk:'line',w:1})+S.t(45,Y(y)+5,y,{a:'end',c:'k'});});
      s+=S.cizgi([[55,90],[55,330],[S.w-23,330]])+S.t(S.w/2,380,'Saklama günü',{a:'middle',c:'k'});
      const f=x=>5+25*x/28,draw=(fn,start,end,renk,kesik)=>S.cizgi(Array.from({length:85},(_,i)=>{const x=start+(end-start)*i/84;return[X(x),Y(fn(x))];}),{renk,kesik,w:3});
      if(p.e==='k')s+=draw(f,0,28,'clin',false)+draw(f,28,42,'clin',true)+S.daire(X(28),Y(30),5,{renk:'clin',dolgu:'clin'})+S.t(65,112,'28. gün: 30 mmol/L',{c:'k',renk:'clin'});
      else s+=draw(x=>100*Math.exp(-x/10),0,42,'basic',false)+draw(x=>100*Math.exp(-x/30),0,42,'clin',true)+S.t(70,112,'2,3-DPG ━',{c:'k',renk:'basic'})+S.t(70,135,'ATP ┄',{c:'k',renk:'clin'});
      s+=S.cizgi([[X(p.gun),90],[X(p.gun),330]],{renk:'muted',kesik:true,w:1});
      (p.e==='k'?[f(p.gun)]:[100*Math.exp(-p.gun/10),100*Math.exp(-p.gun/30)]).forEach(y=>{s+=S.daire(X(p.gun),Y(y),5,{renk:'accent',dolgu:'accent'});});
      const bx=S.w-65;s+=S.kutu(bx-28,22,56,56,{dolgu:'crit-soft'});
      for(let j=0;j<6;j++){const x=bx-15+(j%3)*15,y=38+Math.floor(j/3)*23;s+=j<Math.round(p.gun/42*2)?S.daire(x,y,5,{renk:'crit',dolgu:'crit'}):D73_HUCRE(S,x,y,5);}
      return s+S.t(S.w/2,411,p.e==='k'?['≈ '+D73_SAYI(f(p.gun))+' mmol/L · şematik',p.gun>28?'28. gün sonrası: kitapta değer yok':'Yalnız 28. gün değeri kitaptandır']:['Şematik azalma; ölçülmüş seri değil','Küreselleşme oranı da temsilîdir'],{a:'middle',c:'k'});
    },metin:p=>'<b>'+p.gun+'. gün.</b> '+(p.gun===28?"Torbadaki K⁺ 30 mmol/L'ye ulaşmıştır; ATP ve 2,3-DPG düşmüştür, bazı eritrositler küreselleşmiştir. Günü değiştirin.":p.gun<14?'K⁺ yükselmeye, 2,3-DPG düşmeye başlar.':p.gun<28?'K⁺ eritrositten sızarak artar; 2,3-DPG ve ATP düşer, bazı eritrositler küreselleşir ve ömrü kısalır.':"Raf ömrü 42 gün. Düşük 2,3-DPG O₂ afinitesini artırır; transfüzyondan sonra normale dönmesi 24 saat sürer.")+' [[K1 s. 352]]'
  });
  const D73_KOMP=[
    ['hemoliz','Hemolitik',['Alıcı antikoru →','donör eritrositi'],'Ani (ABO) ya da 7–21 günde gecikmiş hemoliz.'],
    ['febril','Febril non-hemolitik',['Alıcı antikoru →','donör lökositi'],'Ateş, ani hemolizin de erken bulgusudur. Lökosit azaltımı riski azaltır.'],
    ['alerji','Alerjik',['Donör proteini → alıcı IgE'],'Ürtiker ve kaşıntı görülebilir.'],
    ['trali','TRALI',['Donör antikoru → akciğer','Lipit → nötrofil'],'Kitaba göre transfüzyon sonrası en sık ölüm nedeni; ARDS’den ayırt edilemez.'],
    ['gvhd','GVHD',['Donör T hücresi →','alıcı dokusu'],'Bağışıklığı baskılanmış alıcıda ağırdır. Yüksek riskte ışınlanmış kan gerekir.'],
    ['sepsis','Septisemi',['Bakteri · en çok trombosit'],'Oda ısısında saklanan trombositlerde risk en yüksektir.'],
    ['enf','Enfeksiyon bulaşı',['HBV, HCV, HIV, CMV','Sıtma, prion'],'Anket ve serolojiyle tarama yapılır; pencere dönemi ve prion riski kalır.'],
    ['taco','TACO',['Hızlı hacim →','sol ventrikül yetmezliği'],'Kalp/böbrek yetmezliği, yaşlılık ve hipoalbüminemi riski artırır; furosemid; TRALI ile karışabilir.'],
    ['demir','Demir yükü',['Hemosiderozis'],'Atılım yolu yoktur; sık transfüzyonda karaciğer, kalp ve endokrin hasar gelişebilir.']
  ];
  D73_VIZ.f73_komp=el=>SEKIL.sahne(el,{baslik:'Transfüzyon komplikasyonlarının sınıflaması',vb:[640,810],vbDar:[360,1450],secenek:D73_SEC('k','Komplikasyon',[{d:'genel',ad:'Genel bakış'},...D73_KOMP.map(a=>({d:a[0],ad:a[1]}))]),
    ciz:(S,t,p)=>{
      let s=S.kutu(20,10,S.w-40,42,{yazi:'Transfüzyon komplikasyonları',dolgu:'accent-soft'});
      const grup=(x,y,w,ad,renk)=>S.kutu(x,y,w,40,{yazi:ad,renk,dolgu:renk+'-soft'});
      s+=grup(20,80,S.dar?320:285,'İmmünolojik','basic');
      s+=grup(S.dar?20:335,S.dar?785:80,S.dar?320:285,'İmmünolojik olmayan','clin');
      s+=S.ok([ [S.w/2,52],[S.dar?180:162,80]],{renk:'basic'});
      s+=S.ok(S.dar?[[340,52],[350,805],[340,805]]:[ [S.w/2,52],[477,80]],{renk:'clin'});
      D73_KOMP.forEach((a,i)=>{
        let x=30,y=140+i*125,w=S.dar?300:265;
        if(i>=5){x=S.dar?30:345;y=(S.dar?890:185)+(i-5)*125+(i>=7?55:0);}
        if(i===5||i===7)s+=grup(x,y-50,w,i===5?'Enfeksiyöz':'Enfeksiyöz olmayan','clin');
        const sel=p.k===a[0];s+=S.cizgi([[x-10,y-20],[x-10,y+30],[x,y+30]],{renk:i<5?'basic':'clin',w:sel?4:1});
        s+=S.kutu(x,y,w,110,{renk:sel?'accent':'line',dolgu:sel?'accent-soft':'paper',w:sel?3:1})+S.t(x+12,y+25,a[1],{c:'b'})+S.t(x+12,y+49,a[2],{c:'k'});
        if(['febril','gvhd','enf'].includes(a[0]))s+=S.t(x+12,y+94,a[0]==='enf'?'Prion: lökosit azaltımı ↓':'Lökosit azaltımı ↓',{renk:'ok',c:'k'});
      });return s;
    },metin:p=>{const a=D73_KOMP.find(a=>a[0]===p.k);return a?'<b>'+a[1]+'.</b> '+a[3]+(a[0]==='hemoliz'?' [[K1 s. 351–352]]':' [[K1 s. 353]]'):'<b>Yukarıdan bir komplikasyon seçin.</b> Kutularda mekanizma ve hedef gösterilir. [[K1 s. 353]]';}
  });
  const D73_SAL_AD=['Toplama','Santrifüj','Yıkama','Lökosit azaltma filtresi','Geri verme'];
  const D73_SAL_METIN=['Cerrahi alana dökülen kan aspire edilip haznede toplanır. İleri düğmesine basın.','Eritrositler plazmadan ayrılır; pıhtılaşma faktörleri kaybolur, dilüsyonel koagülopati gelişebilir.','Eritrositler yıkanıp serum fizyolojikte yeniden süspanse edilir. Masif kullanımda elektrolit bozuklukları olabilir.','Yıkamanın kaçırdığı amniyon sıvısı ya da tümör hücrelerinin geri verilme riskini belirgin azaltır; obstetride bu filtreyle güvenli sayılır.','Hastanın kendi eritrositleri geri verilir: allojenik transfüzyon gereksinimi ve riskleri azalır.'];
  D73_VIZ.f73_salvage=el=>SEKIL.adim(el,{baslik:'Hücre kurtarma döngüsü',vb:[640,510],vbDar:[360,850],hareket:true,adimlar:D73_SAL_AD.map((ad,i)=>({ad,metin:D73_SAL_METIN[i]+(i===0||i===4?' [[K1 s. 353–354]]':' [[K1 s. 354]]'),ciz:(S,t)=>{
    const labels=[['Cerrahi','alan'],['Toplama','haznesi'],['Santrifüj'],['Yıkama','torbası'],['Lökosit','filtresi'],['Hasta','damarı']],pts=labels.map((_,j)=>S.dar?[180,35+j*75]:[55+j*106,60]);let s='';
    pts.forEach((q,j)=>{if(j){const prev=pts[j-1],path=S.dar?[[prev[0],prev[1]+25],[q[0],q[1]-25]]:[[prev[0]+45,prev[1]],[q[0]-45,q[1]]];s+=S.ok(path,{renk:j===i+1?'accent':'line'});if(j===i+1)s+=S.akis(path,t,{renk:'crit',n:2});}s+=S.kutu(q[0]-(S.dar?95:45),q[1]-25,S.dar?190:90,50,{yazi:labels[j],renk:j===i+1?'accent':'line',dolgu:j===i+1?'accent-soft':'paper',soluk:j<i+1,yc:'k b'});});
    s+=S.ok(S.dar?[[275,410],[320,410],[320,35],[275,35]]:[[585,90],[585,130],[55,130],[55,90]],{renk:'ok',kesik:true});
    const y=S.dar?535:240,cx=S.w/2;
    if(i===0)s+=D73_HUCRE(S,cx-65,y,20)+S.ok([[cx-35,y],[cx+25,y]],{renk:'crit'})+S.kutu(cx+35,y-40,65,80,{dolgu:'crit-soft',yazi:'Kan'});
    if(i===1){s+=S.daire(cx,y,65,{dolgu:'basic-soft',renk:'basic'})+S.daire(cx,y,30,{dolgu:'paper',renk:'basic'})+S.t(cx,y+5,'Plazma',{a:'middle',c:'k'});for(let j=0;j<8;j++){const a=j*Math.PI/4+t;s+=D73_HUCRE(S,cx+Math.cos(a)*50,y+Math.sin(a)*50,8);}s+=S.t(cx,y+95,['Dışta eritrositler','Plazmayla faktörler uzaklaşır'],{a:'middle',c:'k'});}
    if(i===2){s+=S.kutu(cx-75,y-55,150,110,{dolgu:'basic-soft'});for(let j=0;j<4;j++)s+=D73_HUCRE(S,cx-48+j*32,y,10);s+=S.t(cx,y+90,['Serum fizyolojikte süspansiyon','Masif kullanım: elektrolit bozukluğu'],{a:'middle',c:'k'});}
    if(i===3){s+=S.kutu(cx-50,y-50,100,90,{dolgu:'basic-soft'});for(let j=0;j<5;j++)s+=S.cizgi([[cx-40+j*20,y-45],[cx-40+j*20,y+35]],{renk:'basic'});s+=S.daire(cx-10,y-65,9,{renk:'warn',dolgu:'warn-soft'})+S.daire(cx+20,y-65,12,{renk:'crit',dolgu:'crit-soft'})+S.ok([[cx,y+45],[cx,y+75]],{renk:'crit'})+S.t(cx,y+105,['Tutulan: amniyon / tümör hücreleri','Risk azalır; tam arıtma garantisi değil'],{a:'middle',c:'k'});}
    if(i===4)s+=S.t(cx,y-20,['Kendi eritrositleri hastaya döner','Maliyet-etkin','Allojenik kan gereksinimi azalır','Bazı Yehova Şahitleri kabul eder'],{a:'middle',c:'b',lh:32,renk:'ok'});
    return s;
  }}))});
  D73_VIZ.f73_masif=el=>SEKIL.sahne(el,{baslik:'Masif transfüzyonun beş ek sorunu: nitel model',vb:[640,740],vbDar:[360,1030],
    param:[{id:'v',ad:'Verilen hacim',min:0,max:2,adim:.25,deger:1,birim:'× dolaşan hacim'},...[[ 'isit','Kan/sıvı ve aktif hasta ısıtma'],['ca','CaCl₂ (10 mL %10)'],['ffp','Önleyici TDP/kriyo/trombosit']].map(a=>({id:a[0],ad:a[1]+' (0: yok, 1: var)',min:0,max:1,adim:1,deger:0}))],
    ciz:(S,t,p)=>{
      const isi=.3*p.v*(p.isit?.25:1),ca=.35*p.v*(p.ca?.2:1),f=.4*p.v*(p.ffp?.3:1),ph=.2*p.v,k=p.v*.25+(p.v>0&&(isi>.25||ph>.25)?.15:0);
      let s=S.t(S.w/2,25,['Masif tanımı: 24 saatte >1 kan hacmi','veya 4 saatte >½ kan hacmi'],{a:'middle',c:'k'});
      const n=Math.ceil(p.v*2);for(let j=0;j<n;j++)s+=S.kutu(25+j*50,65,40,50,{dolgu:p.isit?'ok-soft':'basic-soft',yazi:p.isit?'Ilık':'4 °C',yc:'k'});
      if(n)s+=S.ok([[25+n*50,90],[S.w-40,90]],{renk:'crit'});
      s+=S.t(S.w-35,135,'Hasta',{a:'end',c:'k'});
      const rows=[['Çekirdek ısısı ↓',1-isi,['İletimle ısı kaybı','Koagülopati, aritmi; eğri sola']],['Faktör / trombosit ↓',1-f,['Eritrosit + kristaloid seyreltir','Dilüsyonel koagülopati']],['İyonize Ca²⁺ ↓',1-ca,['Sitrat Ca²⁺ bağlar','TDP ve trombositte daha çok']],['K⁺ ↑',k,['Hücreye geri dönüş','asidoz / hipotermide aksar']],['pH ↓',1-ph,['Ünite pH ≈ 6,8 · laktat','Karaciğer ek laktatı temizler']]];
      rows.forEach((r,j)=>{const x=S.dar?20:20+(j%2)*310,y=165+(S.dar?j:Math.floor(j/2))*150,w=S.dar?320:290;s+=S.kutu(x,y,w,135,{dolgu:'paper'})+S.t(x+12,y+26,r[0],{c:'b'})+S.kutu(x+12,y+42,w-24,20,{dolgu:'line',renk:'line',r:3})+S.kutu(x+12,y+42,Math.max(0,(w-24)*S.clamp(r[1],0,1)),20,{dolgu:j===3?'warn':'basic',renk:j===3?'warn':'basic',r:3})+S.t(x+12,y+88,r[2],{c:'k'});});
      const y=S.dar?945:645;s+=S.t(S.w/2,y,ca>.25?['Hipokalsemi: hipotansiyon, bradikardi','Düz ST · uzun QT']:['Çubuklar nitel; sayısal ölçüm değil','Önlemler riski azaltır'],{a:'middle',c:'k',renk:ca>.25?'warn':'muted'});
      if(ca>.25)s+=S.cizgi([ [S.w/2-90,y+55],[S.w/2-60,y+55],[S.w/2-55,y+43],[S.w/2-50,y+65],[S.w/2-45,y+55],[S.w/2+20,y+55],[S.w/2+35,y+48],[S.w/2+50,y+55],[S.w/2+90,y+55]],{renk:'warn'});
      return s;
    },metin:p=>p.v===1&&!p.isit&&!p.ca&&!p.ffp?'<b>Dolaşan hacmin 1 katı, ısıtma ve Ca²⁺ yok.</b> Çekirdek ısısı düşer, faktörler ve trombositler seyrelir, iyonize Ca²⁺ azalır, K⁺ ve laktat artar. Hacmi ve önlemleri değiştirin. [[K1 s. 354]]':p.v===0?'<b>Transfüzyon hacmi sıfır.</b> Modelde transfüzyona bağlı ek değişim yoktur. [[K1 s. 354]]':'<b>Dolaşan hacmin '+D73_SAYI(p.v)+' katı.</b> '+(p.isit?'Isıtma hipotermi riskini azaltır. ':'Soğuk ürünler çekirdek ısısını düşürür. ')+(p.ca?'CaCl₂ sitratın bağladığı Ca²⁺’u yerine koyar. ':'Sitrat iyonize Ca²⁺’u azaltır. ')+(p.ffp?'Önleyici TDP, kriyo ve trombosit dilüsyonel koagülopatiyi sınırlar.':'Faktörler ve trombositler seyrelir.')+' [[K1 s. 354]]'
  });
  D73_VIZ.f73_ikame=el=>SEKIL.sahne(el,{baslik:'Hb ve perflorokarbon temelli O₂ taşıyıcıları',vb:[640,580],vbDar:[360,850],secenek:D73_SEC('s','Taşıyıcı',[{d:'hb',ad:'Hb temelli'},{d:'pfc',ad:'Perflorokarbon'}]),
    ciz:(S,t,p)=>{
      let s='';const cx=S.dar?180:155;
      if(p.s==='hb'){
        s+=S.t(cx,25,['Saf Hb kullanılmaz','Böbrek tübül hasarı'],{a:'middle',c:'k',renk:'crit'});
        ['Çapraz bağlı Hb','Polimer Hb','Kapsüllenmiş Hb'].forEach((v,j)=>{const y=80+j*85;s+=S.kutu(cx-130,y,260,73,{dolgu:'basic-soft'})+S.t(cx,y+22,v,{a:'middle',c:'b'});if(j===2)s+=S.kutu(cx-45,y+30,90,35,{r:18,renk:'basic'});const n=j===1?5:2;for(let k=0;k<n;k++){const x=cx+(k-(n-1)/2)*25;if(k&&j!==2)s+=S.cizgi([[x-25,y+48],[x,y+48]],{renk:'basic'});s+=S.daire(x,y+48,9,{renk:'basic',dolgu:'basic'});}});
      }else{
        s+=S.t(cx,30,['Hidrofobik taşıyıcı','Kanla karışmak için emülsiyon'],{a:'middle',c:'k'});
        for(let j=0;j<3;j++){const x=cx+(j===1?65:-55),y=110+j*70;s+=S.daire(x,y,38,{dolgu:'clin-soft',renk:'clin'})+S.t(x,y-2,['O₂','CO₂'],{a:'middle',c:'k'});}
        s+=S.t(cx,340,'Damlacıkta çözünmüş gazlar',{a:'middle',c:'k'});
      }
      const x0=S.dar?55:370,y0=S.dar?610:300,w=S.dar?270:240,h=190;
      s+=S.ok([[x0,y0],[x0+w,y0]])+S.ok([[x0,y0],[x0,y0-h]])+S.t(x0+w/2,y0+27,'PO₂ (nitel)',{a:'middle',c:'k'})+S.t(x0,y0-h-20,'O₂ içeriği (nitel)',{c:'k'});
      const pts=fn=>Array.from({length:81},(_,i)=>[x0+w*i/80,y0-h*fn(i/80)]);
      s+=S.cizgi(pts(x=>Math.pow(x,2.7)/(Math.pow(.32,2.7)+Math.pow(x,2.7))),{renk:'basic',w:p.s==='hb'?4:2,soluk:p.s!=='hb'})+S.cizgi(pts(x=>x*.9),{renk:'clin',w:p.s==='pfc'?4:2,soluk:p.s!=='pfc'});
      s+=S.t(x0+15,y0-h+12,'Hb: sigmoid',{c:'k',renk:'basic'})+S.t(x0+80,y0-40,'PFC: doğrusal',{c:'k',renk:'clin'});
      s+=S.t(S.w/2,S.dar?685:410,['Potansiyel üstünlükler (K1, 2019)','Uzun raf ömrü · oda ısısında saklama','Askerî travma için ilgi çekici','Yehova Şahitlerince kabul olası'],{a:'middle',c:'k',lh:25,renk:'ok'});
      return s+S.t(S.w/2,S.dar?805:535,['Kan transfüzyonunun maliyet ve riskleri','alternatif arayışının gerekçesidir.'],{a:'middle',c:'k'});
    },metin:p=>p.s==='hb'?'<b>Hb temelli taşıyıcı.</b> Saf Hb böbrek tübüllerine zarar verir; bu yüzden çapraz bağlanır, polimerleştirilir ya da kapsüllenir. Öteki sınıfı seçin. [[K1 s. 355]]':'<b>Perflorokarbon.</b> O₂ ve CO₂’yi bol çözen yapay madde; hidrofobik olduğu için emülsiyon olarak verilir, Hb’nin karmaşık ayrışma kinetiği yoktur. [[K1 s. 355]]'
  });
})();
