/* Bölüm 76 · Plazma bileşenleri · K1 s. 371–372. */
(function () {
  'use strict';
  const D76_VIZ = window.VIZ;
  const D76_RM = window.VIZ_YARDIM.RM;
  const D76_alb = (S, x, y, r = 15) => S.daire(x, y, r, { dolgu: 'basic-soft', renk: 'basic' }) + S.t(x, y + 5, '−', { a: 'middle', renk: 'basic' });
  const D76_buton = (id, svg, ad) => `<g data-f76="${id}" role="button" tabindex="0" aria-label="${ad}" class="f76-sec">${svg}</g>`;

  D76_VIZ.f76_kan = (el) => {
    const ciz = (S, t, adim) => {
      const i = adim;
      const x = S.dar ? 48 : 100, y = 24, h = S.dar ? 200 : 260, w = 64;
      const u = i === 0 ? 0 : i === 1 ? S.clamp(t / 3, 0, 1) : 1;
      const sinir = y + h * 0.55;
      let s = S.kutu(x, y, w, h, { dolgu: 'accent-soft', renk: 'accent', r: 16 });
      s += `<g opacity="${u}">` + S.kutu(x + 2, sinir, w - 4, h * 0.45 - 2, { dolgu: 'crit-soft', renk: 'crit-soft', r: 12 }) + '</g>';
      if (u === 1) s += S.kutu(x + 2, sinir, w - 4, 6, { dolgu: 'paper', renk: 'muted', r: 0 });
      for (let n = 0; n < 26; n++) {
        const px = x + 10 + (n * 17 % 44), py = y + 12 + (n * 37 % (h - 24));
        const hedef = sinir + 16 + (n * 13 % (h * 0.45 - 28));
        s += S.daire(px, S.lerp(py, hedef, u), 4, { dolgu: 'crit', renk: 'crit' });
      }
      for (let n = 0; n < 4; n++) {
        s += S.daire(x + 12 + n * 13, S.lerp(y + 35 + n * 38, sinir + 3, u), u === 1 ? 2 : 5, { dolgu: 'paper', renk: 'muted' });
        s += S.daire(x + 18 + n * 11, S.lerp(y + 21 + n * 44, sinir + 3, u), 1.5, { dolgu: 'muted', renk: 'muted' });
      }
      if (i === 1 && u < 1) s += S.t(x + 32, y + h + 25, '↻', { a: 'middle', renk: 'accent' });
      if (u === 1) {
        [[y, sinir, 'Plazma %55'], [sinir, y + h, 'Hücreler %45']].forEach(([a,b,ad]) => {
          s += S.cizgi([[x+w+7,a],[x+w+15,a],[x+w+15,b],[x+w+7,b]], { renk: 'muted' });
          s += S.t(x+w+24, (a+b)/2+5, ad, { c: 'b' });
        });
      }
      const tx = S.dar ? 24 : 310, ty = S.dar ? 260 : 60;
      const sat = i === 3 ? ['Su · Elektrolitler', 'Çözünmüş gazlar: O₂, CO₂', 'Plazma proteinleri', 'Hormonlar · Glukoz', 'Amino asitler', 'Pıhtılaşma proteinleri', 'Laktik asit · Üre'] : i === 4 ? ['Eritrositler', 'Lökositler', 'Trombositler'] : i === 2 ? ['Üstte: plazma', 'İnce ara tabaka:', 'lökositler + trombositler', 'Altta: eritrositler'] : ['Hücreler plazmada dağılır.', 'Santrifüj ile ayrılır.'];
      s += S.t(tx, ty, sat, { lh: 23 });
      if (i >= 3) s += S.ok(S.dar ? [[80, i === 3 ? 90 : 200],[22,i === 3 ? 90 : 200],[22,238],[100,238]] : [[170,i === 3 ? 90 : 230],[285,i === 3 ? 90 : 230]], { renk: i === 3 ? 'accent' : 'crit' });
      return s;
    };
    const temizle = SEKIL.adim(el, { baslik: 'Kan bileşenlerinin santrifüjle ayrılması', vb: [640,320], vbDar: [360,440], hareket: true, sure: 5,
      adimlar: [
        ['Tam kan', 'Hücreler plazmada karışık dağılmıştır. Santrifüj adımını seçin.'],
        ['Santrifüj', 'Hücreler dibe çöker, plazma üstte kalır.'],
        ['Katmanlar', 'Kanın yaklaşık %55’i plazma, %45’i hücresel bileşendir. İnce ara tabaka hücresel kısma dahildir.'],
        ['Plazmada ne var?', 'Su, elektrolitler, çözünmüş gazlar, proteinler ve diğer çözünenler plazmadadır.'],
        ['Hücrelerde ne var?', 'Hücresel kısım eritrosit, lökosit ve trombositlerden oluşur.']
      ].map(([ad,metin],i) => ({ ad, metin: metin + ' [[K1 s. 371]]', ciz: (S,t) => ciz(S,t,i) })) });
    if (D76_RM) el.querySelector('[data-i="4"]').click();
    return temizle;
  };

  D76_VIZ.f76_sinif = (el) => {
    const bilgi = {
      alb: 'Albümin plazma proteinlerinin %60’ıdır; karaciğerde yapılır.',
      glob: 'Globulinler %35; α, β ve γ alt gruplarına ayrılır.',
      gam: 'γ-globulin başlıca istisnadır: en önemli grubu Ig, plazma hücrelerinden gelir.',
      fib: 'Fibrinojen toplam proteinin %4’üdür; karaciğerde yapılır.',
      tas: 'Taşıyıcılar demir, bakır, lipit, tiroksin ve ilaçları taşır.',
      enz: 'α1-antitripsin bir proteaz inhibitörüdür.',
      pih: 'Fibrinojen, protein C ve antitrombin III pıhtılaşma–antikoagülasyon grubundadır.',
      end: 'Kitabın endokrin grubundaki örnekleri ADH ve anjiyotensin II’dir.',
      imm: 'IgG ve IgM immünolojik gruptadır.',
      kar: 'Albümin hem taşıyıcı hem onkotik basıncın başlıca kaynağıdır.'
    };
    const kartlar = [
      ['tas','Taşıyıcı',['Transferrin → demir','Seruloplazmin → bakır','Lipoproteinler → lipit','Tiroksin bağlayıcı globulin','→ tiroksin','α1-asit glikoprotein','→ bazik ve nötr ilaçlar']],
      ['enz','Enzim inhibitörü',['α1-antitripsin','(proteaz inhibitörü)']],
      ['pih','Pıhtılaşma / antikoagülasyon',['Fibrinojen · Protein C','Antitrombin III']],
      ['end','Endokrin',['ADH · Anjiyotensin II']],
      ['imm','İmmünolojik',['IgG · IgM']],
      ['kar','Karma işlev',['Albümin: taşıma','+ kolloid onkotik basınç']]
    ];
    const temizle = SEKIL.sahne(el, { baslik: 'Plazma proteinlerinin iki sınıflaması', vb: [640,700], vbDar: [360,870],
      secenek: { id:'s', ad:'Sınıflama', liste:[{d:'y',ad:'Geleneksel'},{d:'i',ad:'İşlevsel'}] },
      ciz: (S,t,p) => {
        let s = S.t(S.w/2, 27, '60–85 g/L · > 500 protein', { a:'middle', c:'b' });
        if (p.s === 'i') {
          kartlar.forEach(([id,ad,sat], i) => {
            const x = S.dar ? 16 : 20 + (i%2)*304;
            const y = S.dar ? (i === 0 ? 48 : 260+(i-1)*118) : 50 + Math.floor(i/2)*210;
            const w = S.dar ? 328 : 288, h = S.dar ? (i === 0 ? 200 : 106) : 200;
            s += D76_buton(id, S.kutu(x,y,w,h,{renk:id==='kar'?'basic':'line'}) + S.t(x+12,y+25,ad,{c:'b k'}) + S.t(x+12,y+49,sat,{lh:20,c:'k'}),ad);
          });
          return s;
        }
        const x = 26, y = 58, len = S.dar ? 280 : 580;
        let off = 0;
        [['alb',60,'basic'],['glob',35,'accent'],['fib',4,'warn'],['reste',1,'line']].forEach(([id,v,col]) => {
          const rect = S.dar ? S.kutu(x,y+off,44,len*v/100,{r:0,dolgu:id==='reste'?'paper':col+'-soft',renk:col,kesik:id==='reste'}) : S.kutu(x+off,y,len*v/100,45,{r:0,dolgu:id==='reste'?'paper':col+'-soft',renk:col,kesik:id==='reste'});
          s += id==='reste'?rect:D76_buton(id,rect, id==='alb'?'Albümin':id==='glob'?'Globulinler':'Fibrinojen'); off += len*v/100;
        });
        const tx = S.dar ? 96 : 40, ty = S.dar ? 98 : 145;
        [['alb','Albümin %60'],['glob','Globulinler %35'],['fib','Fibrinojen %4']].forEach(([id,ad],i) => {
          s += D76_buton(id,S.kutu(tx,ty+i*66,S.dar?236:260,48,{yazi:ad,renk:id==='alb'?'basic':id==='glob'?'accent':'warn'}),ad);
        });
        const gy = S.dar ? 390 : 380;
        s += S.t(26,gy-22,'Globulin alt grupları',{c:'b'});
        ['α','β','γ'].forEach((ad,i) => { const svg = S.kutu(26+i*104,gy,84,48,{yazi:ad,renk:i===2?'clin':'accent'}); s += i===2?D76_buton('gam',svg,'γ-globulin'):svg; });
        s += S.ok([[276,gy+50],[276,gy+84]],{renk:'clin'});
        s += S.t(276,gy+107,['Plazma','hücreleri (Ig)'],{a:'middle',renk:'clin'});
        s += S.t(26,gy+170,['Albümin, α/β-globulin, fibrinojen:','çoğunlukla karaciğer'],{lh:24});
        s += S.t(26,gy+240,['Bir dilime veya etiketine dokunun.'],{c:'m k'});
        return s;
      },
      metin: p => p.s==='y' ? '<b>Geleneksel sınıflama.</b> Albümin %60, globulinler %35 (α, β, γ), fibrinojen %4. γ-globulin dışındakiler karaciğerde yapılır. Bir dilime dokunun ya da işlevsel sınıflamaya geçin. [[K1 s. 371]]' : 'Bir işlev kartına dokunun. Aynı protein birden fazla işlev yapabilir. [[K1 s. 371]]'
    });
    const sec = e => {
      const g = e.target.closest('[data-f76]');
      if (!g || (e.type==='keydown' && e.key!=='Enter' && e.key!==' ')) return;
      if (e.type==='keydown') e.preventDefault();
      el.closest('.viz').querySelector('.viz-cap').textContent = bilgi[g.dataset.f76] + ' [[K1 s. 371]]';
      el.querySelectorAll('[data-f76]').forEach(a => a.setAttribute('aria-pressed',a.dataset.f76===g.dataset.f76));
    };
    el.addEventListener('click',sec); el.addEventListener('keydown',sec);
    return () => { temizle(); el.removeEventListener('click',sec); el.removeEventListener('keydown',sec); };
  };

  D76_VIZ.f76_odem = el => SEKIL.sahne(el, {
    baslik:'Kapiller geçirgenliği ve albüminin onkotik etkisi', vb:[640,360], vbDar:[360,440], hareket:true, sure:8,
    secenek:{id:'h',ad:'Hasta',liste:[{d:'m',ad:'Malnütrisyonlu yaşlı'},{d:'s',ad:'Ağır sepsis'}]},
    ciz:(S,t,p) => {
      const siz = p.h==='s', u = S.clamp(t/6,0,1), top=130, bot=230, right=S.w-24;
      let s = S.t(S.w/2,25,'Serum albümin: 20 g/L',{a:'middle',c:'b'});
      s += S.t(24,61,'İnterstisyum',{c:'m'});
      s += S.kutu(24,bot+10,right-24,15+(siz?u*42:0),{dolgu:siz?'crit-soft':'paper',renk:siz?'crit':'line'});
      s += S.kutu(24,top,right-24,bot-top,{r:0,dolgu:'accent-soft',renk:'accent-soft'});
      const gap = siz?36:5, step=(right-24)/5;
      for(let i=0;i<5;i++) for(const yy of [top,bot]) s += S.cizgi([[24+i*step,yy],[24+(i+1)*step-gap,yy]],{renk:siz?'crit':'muted',w:3});
      s += S.ok([[32,181],[right-8,181]],{renk:'accent',soluk:true});
      s += S.akis([[32,181],[right-8,181]],t,{renk:'accent',n:5,r:3});
      for(let i=0;i<10;i++) {
        const col=i%5, row=Math.floor(i/5), x=24+(col+1)*step-gap/2;
        const start=row?208:151, end=row?270:95;
        const k=siz?S.clamp((u-col*0.09)*1.55,0,1):0;
        const yy=siz?S.lerp(start,end,k):start+(row?-1:1)*5*Math.sin(t*2+col);
        s += D76_alb(S,x,yy,12);
      }
      s += S.t(24,113,'Albümin (−) · 67 kDa',{c:'k',renk:'basic'});
      s += S.ok([[42,210],[42,259]],{renk:'accent',w:siz?4:1.5});
      s += S.ok([[68,259],[68,210]],{renk:'accent',w:1.5,soluk:siz});
      s += S.t(24, S.dar?325:315, siz?'Onkotik gradyan: çöker':'Onkotik gradyan: korunur',{c:'b',renk:siz?'crit':'ok'});
      s += S.t(24,S.dar?352:340,siz?'Ödem: belirgin':'Ödem: çok az');
      s += S.t(S.dar?24:355,S.dar?395:315,['Albümin: damar içi onkotik','basıncın ≈ %80’i'],{c:'k',lh:19});
      return s;
    },
    metin:p => (p.h==='m'?'Kapiller sağlam: 67 kDa albümin damarda kalır, onkotik gradyan korunur; ödem çok azdır.':'Kapiller sızdırıyor: albümin interstisyuma kaçar, onkotik gradyan çöker; periferik ödem belirgindir.')+' Her iki örnekte serum albümini 20 g/L’dir. [[K1 s. 371]]'
  });

  D76_VIZ.f76_ilac = el => {
    const ciz = (S,t,i) => {
      const u=S.clamp(t/2.5,0,1), by=S.dar?300:100, bx=S.dar?24:370, bw=S.dar?312:240;
      let s=S.t(24,25,'Albümin: ortak bağlanma yeri',{c:'b'});
      s+=S.kutu(24,45,10,10,{r:1,dolgu:'warn',renk:'warn'})+S.t(42,56,'Varfarin',{c:'k'});
      s+=S.cizgi([[166,55],[172,44],[178,55],[166,55]],{dolgu:'clin',renk:'clin'})+S.t(187,56,'NSAİİ',{c:'k'});
      for(let n=0;n<4;n++) {
        const x=74+(n%2)*145, y=112+Math.floor(n/2)*100;
        s+=D76_alb(S,x,y,28)+S.t(x,y+45,'Albümin',{a:'middle',c:'k'});
        s+=S.kutu(x+20,y-9,17,18,{dolgu:'paper',renk:'basic',r:3});
        const k=i>=3?1:i===2?u:0, wx=x+28+k*40, wy=y-k*30;
        s+=S.kutu(wx-5,wy-5,10,10,{r:1,dolgu:'warn',renk:'warn'});
        if(i>0) {
          const nx=i===1?S.lerp(x-50,x+8,u):i===2?S.lerp(x+8,x+28,u):x+28, ny=y;
          s+=S.cizgi([[nx-6,ny+6],[nx,ny-6],[nx+6,ny+6],[nx-6,ny+6]],{dolgu:'clin',renk:'clin'});
        }
        if(i===2) s+=S.ok([[x+40,y-7],[x+62,y-25]],{renk:'warn'});
      }
      s+=S.kutu(320,166,10,10,{r:1,dolgu:'warn',renk:'warn'});
      const free=i>=3?0.8:i===2?0.2+u*0.6:0.2, inr=i===3?0.2+u*0.6:0.2;
      [['Serbest varfarin',free,'warn'],['PZ / INR',inr,'crit']].forEach(([ad,val,col],n)=>{
        const y=by+n*75;
        s+=S.t(bx,y,ad,{c:'b'})+S.kutu(bx,y+12,bw,15,{r:3,dolgu:'paper'})+S.kutu(bx,y+12,bw*val,15,{r:3,dolgu:col,renk:col});
        s+=S.t(bx,y+46,'Düşük',{c:'k m'})+S.t(bx+bw,y+46,'Yüksek',{a:'end',c:'k m'});
      });
      if(i===3) s+=S.t(bx+bw,by-25,'INR ↑',{a:'end',c:'b',renk:'crit'});
      s+=S.t(24,S.dar?473:300,S.dar?['Albümin ayrıca taşır:','Konjuge olmamış bilirubin','Safra tuzları · Elektrolitler','Serbest yağ asitleri','Digoksin · Tiyopenton']:['Albümin ayrıca taşır: konjuge olmamış bilirubin · safra tuzları','elektrolitler · serbest yağ asitleri · digoksin · tiyopenton'],{c:'k',lh:20});
      return s;
    };
    return SEKIL.adim(el,{baslik:'Varfarin ve NSAİİ bağlanma yarışı',vb:[640,345],vbDar:[360,580],hareket:true,sure:5,
      adimlar:[['Denge','Varfarinin çoğu albümine bağlıdır; etkiyi yalnız serbest kısım yapar.'],['NSAİİ verilir','NSAİİ de albümindeki aynı bağlanma yerine yaklaşır.'],['Yarış','İki ilaç aynı yere yarışır; yerinden edilen varfarin serbest kalır.'],['Sonuç','Serbest varfarin artınca protrombin zamanı uzar, INR yükselir; toksik etki doğabilir.']].map(([ad,metin],i)=>({ad,metin:metin+' [[K1 s. 372]]',ciz:(S,t)=>ciz(S,t,i)}))});
  };

  D76_VIZ.f76_yuk = el => {
    const duzey = a => a>=0.8?'Normal':a>=0.4?'Düşük':'Çok düşük';
    const temizle = SEKIL.sahne(el,{baslik:'Albüminin yükü, anyon açığı ve kalsiyum bağlama',vb:[640,560],vbDar:[360,740],
      param:[{id:'a',ad:'Albümin',min:0,max:1,adim:0.05,deger:1}],
      ciz:(S,t,p)=>{
        const a=p.a, w=S.w-40, h=35+55*a;
        let s=S.t(20,25,'Anyon açığı',{c:'b'});
        s+=S.kutu(20,48,90,145,{dolgu:'accent-soft',renk:'accent',yazi:['Katyonlar','Na⁺, K⁺']});
        s+=S.kutu(130,48+h,90,145-h,{dolgu:'paper',yazi:['Cl⁻','HCO₃⁻']});
        s+=S.kutu(130,48,90,h,{dolgu:'basic-soft',renk:'basic'});
        s+=S.t(175,72,'Alb −',{a:'middle',renk:'basic',c:'k'});
        s+=S.cizgi([[225,48],[235,48],[235,48+h],[225,48+h]],{renk:'basic'});
        s+=S.t(244,118,['Anyon','açığı'],{c:'k',renk:'basic'});
        s+=S.t(20,220,['Üst kutu: ölçülmeyen anyonlar','(albümin + diğerleri)','Albümin ↓ → anyon açığı ↓'],{c:'k',lh:21});
        const py=S.dar?280:280;
        s+=S.t(20,py,'Asit–baz: hafif alkaloz eğilimi',{c:'b'});
        const cx=S.w/2, extent=(S.w-80)/2;
        s+=S.cizgi([[40,py+35],[S.w-40,py+35]],{renk:'muted'});
        s+=S.cizgi([[cx,py+27],[cx,py+43]],{renk:'muted'});
        const xx=cx+(1-a)*extent/3;
        s+=S.ok([[xx,py+13],[xx,py+33]],{renk:'accent'});
        s+=S.t(40,py+62,'Asidoz',{c:'k'})+S.t(S.w-40,py+62,'Alkaloz',{a:'end',c:'k'});
        s+=S.t(20,py+90,['Stewart: albümini hesaba katar','(Bölüm 70).'],{c:'k'});
        const cy=S.dar?460:445, r=18+18*a;
        s+=S.t(20,cy-20,'Ca²⁺ bağlanması',{c:'b'});
        s+=D76_alb(S,80,cy+36,r);
        for(let n=0;n<Math.round(2+4*a);n++) { const ang=n*Math.PI/3; s+=S.daire(80+Math.cos(ang)*r,cy+36+Math.sin(ang)*r,4,{dolgu:'ok',renk:'ok'}); }
        s+=S.t(150,cy+12,['Albümin (−)','Ca²⁺ bağlar.'],{c:'k',lh:20});
        for(let n=0;n<3;n++) s+=S.daire(160+n*34,cy+55,4,{dolgu:'ok',renk:'ok'});
        s+=S.t(150,cy+84,'Serbest Ca²⁺',{c:'k',renk:'ok'});
        if(S.dar) s+=S.t(20,cy+125,['Bağlanma serbest Ca²⁺’u azaltır.','Kaydırıcı bağlı kısmı gösterir;','serbest Ca²⁺ değişimini hesaplamaz.'],{c:'k',lh:21});
        else s+=S.t(350,cy+12,['Bağlanma serbest Ca²⁺’u azaltır.','Serbest Ca²⁺ değişimi','bu modelde hesaplanmaz.'],{c:'k',lh:21});
        if(S.dar) s+=S.kutu(20,665,w,58,{yazi:['–SH grupları:','serbest radikal temizliği'],yc:'k'});
        else s+=S.t(350,cy+85,['–SH grupları:','serbest radikal temizliği'],{c:'k',lh:20});
        return s;
      },
      metin:p => (p.a>=0.8?'Normal albümin: ölçülmeyen anyonların önemli kısmı albümindir; Ca²⁺’un bir kısmı ona bağlıdır.':'Hipoalbüminemi: anyon açığı küçülür, hafif metabolik alkaloz gelişir; albümine bağlı Ca²⁺ azalır.')+' Sülfhidril (–SH) grupları serbest radikal temizler. [[K1 s. 372]]'
    });
    // Kitin sayısal çıktısını yalnız bu bileşende nitel ve erişilebilir yap.
    const nitel = () => { const input=el.querySelector('[data-k="a"]'); const ad=duzey(+input.value); el.querySelector('[data-o="a"]').textContent=ad; input.setAttribute('aria-valuetext',ad); };
    nitel(); el.addEventListener('input',nitel);
    return () => { temizle(); el.removeEventListener('input',nitel); };
  };
})();
