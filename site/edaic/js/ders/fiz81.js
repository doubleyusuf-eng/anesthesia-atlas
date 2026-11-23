/* Bölüm 81 · Şematik, kaynak tarifine bağlı SEKIL bileşenleri. */
(function () {
  'use strict';
  const D81_VIZ = window.VIZ;
  const D81_ref = (s, p) => `${s} [[K1 s. ${p}]]`;
  const D81_sec = (id, ad, pairs) => ({id, ad, liste:pairs.map(([d, ad]) => ({d, ad}))});
  const D81_wrap = (s, n) => {
    const out = []; let line = '';
    String(s).split(/\s+/).forEach(w => { if (line && (line + ' ' + w).length > n) { out.push(line); line = w; } else line += (line ? ' ' : '') + w; });
    if (line) out.push(line); return out;
  };
  const D81_card = (S, x, y, w, title, body, color = 'line', h) => {
    const lines = (Array.isArray(body) ? body : [body]).flatMap(s => D81_wrap(s, Math.floor((w - 24) / (S.dar ? 8.5 : 7.5))));
    const heads = D81_wrap(title, Math.floor((w - 24) / (S.dar ? 9 : 8)));
    const height = h || 24 + (heads.length + lines.length) * 21;
    return S.kutu(x,y,w,height,{renk:color,dolgu:color === 'line' ? 'paper' : color + '-soft'}) + S.t(x+12,y+23,heads,{c:'b',lh:21}) + S.t(x+12,y+23+heads.length*21,lines,{c:'k',lh:21});
  };
  const D81_flow = (S, pts, t, color = 'accent', n = 3, w = 2) => S.ok(pts,{renk:color,w}) + S.akis(pts,t,{renk:color,n,r:3});
  const D81_hit = (key, label, svg) => `<g data-f81="${key}" role="button" tabindex="0" aria-label="${label}" style="cursor:pointer">${svg}</g>`;
  const D81_cross = (S,x,y) => S.cizgi([[x-9,y-9],[x+9,y+9]],{renk:'crit',w:3}) + S.cizgi([[x+9,y-9],[x-9,y+9]],{renk:'crit',w:3});
  const D81_thyroid = (S,x,y,dim=false) => S.kutu(x-28,y-18,22,42,{renk:'accent',dolgu:'accent-soft',soluk:dim}) + S.kutu(x+6,y-18,22,42,{renk:'accent',dolgu:'accent-soft',soluk:dim}) + S.kutu(x-6,y-3,12,12,{renk:'accent',dolgu:'accent-soft',soluk:dim});
  // Ek SVG seçimleri, aynı seçimi yapan yerel HTML düğmeleriyle erişilebilirdir.
  const D81_scene = (el,cfg,extra) => {
    let value = extra ? extra.items[0][0] : '', state, stop = () => {};
    const mount = () => {
      stop();
      const c = {...cfg,ciz:(S,t,p) => { state = p; return cfg.ciz(S,t,p,value); },metin:cfg.metin ? (p,t) => cfg.metin(p,t,value) : undefined};
      if (state && cfg.secenek) { const id=cfg.secenek.id; c.secenek={...cfg.secenek,liste:[...cfg.secenek.liste].sort((a,b)=>(b.d===state[id])-(a.d===state[id]))}; }
      const host=document.createElement('div'); el.replaceChildren(host);
      stop = SEKIL.sahne(host,c);
      if (extra) {
        const bar=document.createElement('div'); bar.className='seg'; bar.setAttribute('role','group'); bar.setAttribute('aria-label',extra.ad);
        extra.items.forEach(([key,label]) => { const b=document.createElement('button'); b.type='button'; b.dataset.f81=key; b.textContent=label; b.setAttribute('aria-pressed',String(value===key)); bar.appendChild(b); });
        el.querySelector('.sk-ust').appendChild(bar);
      }
    };
    const pick=e=>{ const node=e.target.closest('[data-f81]'); if(!node || !extra) return; if(e.type==='keydown' && e.key!=='Enter' && e.key!==' ') return; e.preventDefault(); value=node.dataset.f81; mount(); const b=el.querySelector(`button[data-f81="${value}"]`); if(e.type==='keydown' && b)b.focus(); };
    el.addEventListener('click',pick); el.addEventListener('keydown',pick); mount();
    return ()=>{ stop(); el.removeEventListener('click',pick); el.removeEventListener('keydown',pick); };
  };

  const D81_organs = [
    ['Metabolizma','BMH ↑; lipoliz ve glukoneogenez ↑; yağ asidi ve glukoz ↑','BMH ↓; metabolik etkiler tersine döner.'],
    ['Büyüme / MSS','T3 miyelinleşmeyi ve akson büyümesini uyarır.','Çocukta büyüme geriliği.'],
    ['Solunum','O₂ tüketimi ↑; CO₂ üretimi ↑; ventilasyon ↑','O₂ tüketimi, CO₂ üretimi ve ventilasyon ↓'],
    ['Kalp','β-reseptör ↑; hız ve kontraktilite ↑; debi ↑','Kalp hızı, kontraktilite ve debi ↓'],
    ['Ruh hâli','Kaygı','Depresyon, psikoz'],
    ['Kas–iskelet','Protein katabolizması → proksimal miyopati','— (bu karşılık kitapta verilmez)']
  ];
  D81_VIZ.f81_etki = el => D81_scene(el,{
    baslik:'Tiroit hormonlarının organ etkileri',vb:[640,580],vbDar:[360,710],
    secenek:D81_sec('d','Durum',[['hiper','Hipertiroidi'],['hipo','Hipotiroidi']]),
    ciz:(S,t,p,v)=>{
      const x=S.w/2, y=S.dar?42:180, high=p.d==='hiper';
      let s=S.daire(x,y,17,{renk:'muted'})+S.kutu(x-17,y+25,34,70,{renk:'muted'})+S.cizgi([[x-38,y+75],[x-20,y+35],[x+20,y+35],[x+38,y+75]],{renk:'muted'})+D81_thyroid(S,x,y+29)+S.rozet(x,S.dar?148:320,high?'T3 ↑':'T3 ↓',{renk:high?'crit':'basic'});
      D81_organs.forEach((a,i)=>{const cx=S.dar?8+(i%2)*176:(i<3?8:422), cy=S.dar?180+Math.floor(i/2)*157:20+(i%3)*168; s+=D81_hit(String(i),a[0],D81_card(S,cx,cy,S.dar?168:210,a[0],a[high?1:2],v===String(i)?'accent':'line',150));});
      return s+S.t(x,S.dar?674:547,['Dalak ve tiroidin kendisi dışında','hemen her doku'],{a:'middle',c:'k'});
    },metin:(p,t,v)=>D81_ref(`<b>${D81_organs[+v][0]}.</b> ${D81_organs[+v][p.d==='hiper'?1:2]}${p.d==='hipo'?' Bağlı hormon deposu belirtilerin başlamasını geciktirir.':''}`,'396')
  },{ad:'Organ',items:D81_organs.map((a,i)=>[String(i),a[0]])});

  const D81_synth = [
    ['İyodür alımı','I⁻, Na⁺/I⁻ ortak taşıyıcısıyla sekonder aktif alınır; vücut iyodürünün %25’i tiroitte toplanır. TSH alımı uyarır; I⁻ lümene difüzyonla geçer.','396–397'],
    ['Oksidasyon','Tiroit peroksidaz ve H₂O₂, I⁻’u reaktif I₂’ye yükseltger. TSH uyarır; karbimazol ve propiltiyourasil (PTU) bu adımı inhibe eder.','397–398'],
    ['İyotlanma','Tiroglobulindeki tirozinlere bir iyot bağlanınca MIT, iki iyot bağlanınca DIT oluşur.','397'],
    ['Eşleşme','DIT + DIT → T4; MIT + DIT → T3. Hormonlar tiroglobulin üzerinde kalır. TSH eşleşmeyi uyarır; depo 1–3 aylık gereksinimi karşılar.','397'],
    ['Salınım','TSH ile tiroglobulin endositozla hücreye alınır. T3 ve T4 proteinden ayrılır, kapillere salınır.','397']
  ];
  D81_VIZ.f81_sentez = el => SEKIL.adim(el,{
    baslik:'Tiroit hormonu sentezinin beş adımı',vb:[640,390],vbDar:[360,580],hareket:true,
    adimlar:D81_synth.map(([ad,metin,page],i)=>({ad,metin:D81_ref(metin,page),ciz:(S,t)=>{
      const boxes=S.dar?[[20,20,320,72],[20,145,320,140],[20,350,320,190]]:[[12,30,144,300],[200,30,190,300],[434,30,194,300]];
      let s=''; ['Kapiller','Folikül hücresi','Folikül lümeni'].forEach((label,j)=>{const [x,y,w,h]=boxes[j];s+=S.kutu(x,y,w,h,{renk:j===2?'warn':'line',dolgu:j===0?'crit-soft':j===2?'warn-soft':'paper'})+S.t(x+w/2,y+25,label,{a:'middle',c:'b'});});
      const a=S.dar?[[180,92],[180,145]]:[[156,160],[200,160]], b=S.dar?[[180,285],[180,350]]:[[390,160],[434,160]];
      if(i===0) s+=D81_flow(S,a,t)+D81_flow(S,b,t)+S.t(S.dar?25:218,S.dar?190:205,['Na⁺/I⁻ taşıyıcısı','TSH +'],{c:'k'})+S.t(S.dar?200:394,S.dar?320:142,'I⁻',{c:'b'});
      if(i===1) { s+=D81_card(S,S.dar?42:210,S.dar?195:115,S.dar?276:170,'I⁻ → I₂',['Peroksidaz + H₂O₂','TSH +'],'accent'); s+=S.ok(S.dar?[[65,320],[65,280]]:[[260,295],[260,250]],{kesik:true,renk:'crit'})+S.t(S.dar?83:213,S.dar?326:315,'− karbimazol, PTU',{c:'k'}); }
      const [lx,ly,lw]=boxes[2];
      s+=S.t(lx+lw/2,ly+53,['Tiroglobulin','(kolloid)'],{a:'middle',c:'k'});
      const pts=Array.from({length:6},(_,k)=>[lx+20+k*(lw-40)/5,ly+102+(k%2)*12]);s+=S.cizgi(pts,{renk:'warn'});
      pts.forEach(([x,y],k)=>{s+=S.daire(x,y,6,{renk:i===2?'accent':'warn',dolgu:i===2?'accent-soft':'paper'}); if(i===2)s+=S.t(x,y+28,k%2?'2 I':'1 I',{a:'middle',c:'k'});});
      if(i===2)s+=S.t(lx+lw/2,ly+162,'MIT (1 I) · DIT (2 I)',{a:'middle',c:'k'});
      if(i===3)s+=S.t(lx+lw/2,ly+145,['DIT + DIT → T4','MIT + DIT → T3','TSH + · depo 1–3 ay'],{a:'middle',c:'k'});
      if(i===4){s+=D81_flow(S,[...b].reverse(),t)+D81_flow(S,[...a].reverse(),t)+D81_card(S,S.dar?42:210,S.dar?193:110,S.dar?276:170,'Endositoz',['Tiroglobulin alınır','T3 + T4 ayrılır','TSH +'],'accent');}
      return s;
    }}))
  });

  D81_VIZ.f81_eksen = el => SEKIL.sahne(el,{
    baslik:'TRH TSH tiroit ekseni',vb:[640,560],vbDar:[360,640],hareket:true,sure:6,
    secenek:D81_sec('d','Durum',[['normal','Normal'],['hashi','Hashimoto'],['graves','Graves']]),
    ciz:(S,t,p)=>{
      const lev=p.d==='normal'?[0,0,0]:p.d==='hashi'?[1,1,-1]:[-1,-1,1], x=S.dar?45:90,w=S.dar?190:245;
      let s=''; ['Hipotalamus','Ön hipofiz','Tiroit','Dolaşım'].forEach((a,i)=>{s+=S.kutu(x,20+i*95,w,48,{yazi:a});if(i<3){const color=lev[i]>0?'crit':lev[i]<0?'basic':'ok';s+=D81_flow(S,[[x+w/2,68+i*95],[x+w/2,115+i*95]],t,color,lev[i]+2,lev[i]+2)+S.t(x+8,96+i*95,['TRH','TSH','T3, T4'][i],{c:'k'});}});
      s+=S.ok([[x,338],[20,338],[20,44],[x,44]],{kesik:true,renk:'basic',w:lev[2]+2,soluk:p.d==='hashi'})+S.t(27,32,'−',{c:'b'});
      s+=S.t(x,386,['%99,7 bağlı','Geri bildirim: serbest T3'],{c:'k'});
      const bx=S.dar?278:425;
      lev.forEach((v,i)=>{const y=45+i*95;s+=S.kutu(bx,y,22,54,{dolgu:'paper'})+S.kutu(bx,y+27-v*18,22,27+v*18,{dolgu:v>0?'crit':v<0?'basic':'ok'})+S.cizgi([[bx-4,y+27],[bx+26,y+27]],{renk:'ink'})+S.t(bx+11,y-8,['TRH','TSH','T3/T4'][i]+(v>0?' ↑':v<0?' ↓':' ='),{a:'middle',c:'k'});});
      s+=S.t(S.dar?267:425,355,['Çizgi:','normal'],{c:'k'});
      if(p.d!=='normal')s+=D81_card(S,30,425,S.w-60,p.d==='hashi'?'Hashimoto':'Graves',p.d==='hashi'?['Anti-TPO / anti-tiroglobulin','T3/T4 ↓ → TRH ve TSH ↑']:['TSH reseptörünü uyaran antikor','T3/T4 ↑ → TRH ve TSH ↓'],'accent',S.dar?130:110);
      return s;
    },metin:p=>D81_ref(p.d==='normal'?'TRH → TSH → T3/T4; serbest T3 hipotalamusu baskılar.':p.d==='hashi'?'Anti-TPO veya anti-tiroglobulin antikorlarıyla hormon yapımı azalır; geri bildirim zayıflar. Yüksek TSH genellikle hipotiroidiyi gösterir.':'TSH reseptörünü uyaran antikorlar hormon yapımını artırır. Güçlenen geri bildirim TRH ve TSH’yi azaltır; düşük TSH genellikle hipertiroidiyi gösterir.','397–398')
  });

  const D81_gravesText={ilac:'Karbimazol ve propiltiyourasil tiroit peroksidazı inhibe eder; I⁻ → I₂ oksidasyonu ve dolayısıyla iyotlanma engellenir.',rai:'¹³¹I tiroitte aktif yoğunlaşır. β-radyasyon dokuda hasar ve nekroz yapar.',cerrahi:'Total tiroidektomi kalıcı çözümdür; ama rekürren laringeal sinir yaralanması, paratiroit hasarı ve hava yolunu tıkayan hematom riski vardır.'};
  D81_VIZ.f81_graves = el => SEKIL.sahne(el,{
    baslik:'Graves hastalığının iki hedefi ve üç tedavi',vb:[640,530],vbDar:[360,790],
    secenek:D81_sec('t','Tedavi',[['ilac','Antitiroit ilaç'],['rai','Radyoiyot (¹³¹I)'],['cerrahi','Tiroidektomi']]),
    ciz:(S,t,p)=>{
      const w=S.dar?320:290,x=S.dar?20:335,y=S.dar?410:120;
      let s=D81_card(S,20,10,S.w-40,'TSH reseptör otoantikoru','İki ayrı hedef','crit',80)+S.ok([ [S.w/2,90],[S.w/2,104],[165,104],[165,120]],{renk:'crit'})+S.ok(S.dar?[[345,70],[345,435],[340,435]]:[[320,104],[480,104],[480,120]],{renk:'crit'});
      s+=D81_card(S,20,120,w,'Tiroit',['T3, T4 ↑ → hipertiroidi'],'warn',270)+D81_thyroid(S,165,220,p.t==='cerrahi');
      if(p.t==='ilac')s+=S.t(36,285,['I⁻ → I₂ · peroksidaz','Karbimazol / PTU'],{c:'k'})+D81_cross(S,170,275);
      if(p.t==='rai')s+=S.t(36,280,['¹³¹I · Na⁺/I⁻ taşıyıcısı','β-radyasyon','Hasar → nekroz'],{c:'k'});
      if(p.t==='cerrahi')s+=D81_cross(S,165,220)+S.t(36,275,['Risk: rekürren sinir','Paratiroit hasarı','Hematom → hava yolu'],{c:'k'});
      s+=D81_card(S,x,y,w,'Göz dışı kas fibroblastları',['İnflamasyon → proptozis,','ekzoftalmi, konjonktivit','','Göz hastalığı etkilenmez','(bu üç tiroit tedavisiyle)','','Göz tedavisi: kortikosteroid,','cerrahi debulking'],'line',270);
      return s+D81_card(S,20,S.dar?710:425,S.w-40,'Tedavi sonrası','Çoğunlukla hipotiroidi → T4 replasmanı','basic');
    },metin:p=>D81_ref(D81_gravesText[p.t],'398')
  });

  const D81_pre=[['Trakea','Bası → stridor'],['Superior vena kava','Bası → obstrüksiyon'],['Sempatik zincir','Bası / invazyon → Horner sendromu'],['Rekürren sinir','Bası / invazyon → ses kısıklığı']];
  const D81_post=[['Kanama','Acil cerrahi değerlendirme ve klipslerin çıkarılması; yatak başında klips çıkarıcı bulunmalı.'],['Rekürren sinir felci','Tek veya iki taraflı olabilir. İki taraflı felçte kordlar tam addüksiyonda: tam obstrüksiyon → hemen yeniden entübasyon; gerekirse trakeostomi.'],['Hipokalsemi','Paratiroit hasarı / çıkarılması → ağır hipokalsemi → laringospazm.'],['Trakeomalazi','Uzun süreli / çok büyük guatrda risk artar. Ekstübasyon öncesi kaf indirilerek kaçak testi yapılır.']];
  D81_VIZ.f81_cerrahi=el=>D81_scene(el,{
    baslik:'Boyun basısı ve tiroidektomi komplikasyonları',vb:[640,655],vbDar:[360,980],secenek:D81_sec('e','Zaman',[['once','Ameliyat öncesi'],['sonra','Ameliyat sonrası']]),
    ciz:(S,t,p,v)=>{
      const post=p.e==='sonra',k=+v,cx=S.dar?180:170;
      let s=S.t(cx,25,'ÖN',{a:'middle',c:'b'})+S.kutu(cx-138,42,276,235,{r:70})+S.kutu(cx-83,75,166,98,{dolgu:post&&k===0?'crit-soft':'warn-soft',renk:'warn',r:34})+S.kutu(cx-30,113,60,65,{r:22,renk:'ink'})+S.kutu(cx-25,200,50,26,{r:13})+S.t(cx,246,'Özofagus',{a:'middle',c:'k'});
      s+=D81_hit(post&&k===3?'3':'0','Trakea veya kanama',S.kutu(cx-23,123,46,42,{r:18,renk:'accent',dolgu:post&&k===0?'crit-soft':'paper'}));
      [-1,1].forEach(sign=>{const x=cx+sign*46;s+=D81_hit(post?'1':'3','Rekürren sinir',S.daire(x,185,7,{dolgu:'warn-soft',renk:'warn'})); if(post&&k===1)s+=D81_cross(S,x,185);s+=S.daire(cx+sign*111,118,10,{renk:'crit'})+S.daire(cx+sign*111,145,12,{renk:'basic'});[0,1].forEach(j=>s+=D81_hit('2','Paratiroit veya sempatik zincir',S.daire(cx+sign*71,165+j*18,5,{renk:'clin',soluk:post&&k===2})));[0,1,2].forEach(j=>s+=D81_hit('2','Sempatik zincir',S.daire(cx+sign*107,205+j*12,4,{renk:'accent'})));});
      s+=S.t(cx,295,'ARKA',{a:'middle',c:'k'})+D81_hit('1','Superior vena kava',S.kutu(cx-65,315,130,42,{yazi:'SVC → göğüs',yc:'k',renk:'basic'}));
      s+=S.t(20,383,['Sarı: rekürren sinir · mor: paratiroit','Yan damarlar: karotis / juguler','Arka yan noktalar: sempatik zincir'],{c:'k'});
      const x=S.dar?20:350,y=S.dar?455:35,w=S.dar?320:270;
      s+=D81_card(S,x,y,w,(post?D81_post:D81_pre)[k][0],post?D81_post[k][1]:D81_pre[k][1],'accent');
      if(!post)s+=D81_card(S,x,y+155,w,'Ameliyat öncesi',['İlaçla ötiroit','Boyun BT: guatr boyutu / yeri','Bası veya invazyon?','İnhalasyon / uyanık fiberoptik','Gerekirse lokal trakeostomi','Sinir izlemi: kas gevşetici yok; remifentanil infüzyonu'],'line');
      if(post&&k===1)s+=D81_card(S,x,y+300,w,'İki taraflı felç',['Kordlar:  ││','Tam addüksiyon → tıkanma'],'crit');
      if(post&&k===3)s+=S.kutu(x+20,y+235,75,60,{r:25,renk:'ink',yazi:'Açık',yc:'k'})+S.kutu(x+135,y+250,95,25,{r:12,renk:'crit'})+S.t(x+135,y+305,['İnspirasyon','Çökme'],{c:'k'});
      return s;
    },metin:(p,t,v)=>D81_ref(`<b>${(p.e==='once'?D81_pre:D81_post)[+v][0]}.</b> ${(p.e==='once'?D81_pre:D81_post)[+v][1]}`,'398–399')
  },{ad:'Yapı / komplikasyon',items:[['0','Trakea / Kanama'],['1','SVC / Sinir felci'],['2','Sempatik / Ca²⁺'],['3','Sinir / Trakeomalazi']]});

  D81_VIZ.f81_kalsiyum=el=>SEKIL.sahne(el,{
    baslik:'Albümin total ve iyonize kalsiyum',vb:[640,510],vbDar:[360,800],param:[{id:'alb',ad:'Serum albümini',min:15,max:50,adim:1,deger:40,birim:'g/L'}],
    ciz:(S,t,p)=>{
      let s=D81_card(S,20,15,S.dar?320:280,'Vücut Ca²⁺ ≈ 1 kg',['Kemik ≈ %99','Hızla harekete geçmez'],'line',105);
      s+=D81_card(S,35,135,S.dar?290:250,'Diş ve yumuşak doku','≈ %1','line',85)+D81_card(S,50,235,S.dar?260:220,'Hücre dışı sıvı',['≈ %0,1','Bunun 1/3’ü plazmada'],'accent',115);
      const x=S.dar?20:330,y=S.dar?400:25,w=S.dar?320:290,scale=(w-16)/3,total=2.4-.02*(40-p.alb);
      s+=S.t(x,y,'Plazma Ca²⁺ (mmol/L)',{c:'b'})+S.kutu(x+2.2*scale,y+22,.4*scale,68,{dolgu:'ok-soft',renk:'ok'})+S.kutu(x+1.1*scale,y+105,.3*scale,12,{dolgu:'basic-soft',renk:'basic'});
      s+=S.kutu(x,y+43,1.1*scale,30,{dolgu:'accent-soft',renk:'accent'})+S.kutu(x+1.1*scale,y+43,(total-1.1)*scale,30,{dolgu:'chip',renk:'muted'});
      [0,1,2,3].forEach(n=>s+=S.t(x+n*scale,y+140,String(n),{a:n===0?'start':'middle',c:'k'}));
      s+=S.t(x,y+175,['İyonize: 1,1 (sabit)','Bağlı: '+(total-1.1).toFixed(2).replace('.',','),'Total: '+total.toFixed(2).replace('.',',')+' mmol/L','Total normal: 2,2–2,6','İyonize normal: 1,1–1,4'],{c:'k',lh:23});
      s+=S.t(x,y+305,['Düzeltilmiş = total +','0,02 × (40 − albümin)','= 2,40 mmol/L'],{c:'b',lh:22});
      return s;
    },metin:p=>D81_ref(`<b>Albümin ${p.alb} g/L.</b> Ölçülen total ${(2.4-.02*(40-p.alb)).toFixed(2).replace('.',',')} mmol/L; iyonize Ca²⁺ 1,1 mmol/L ile sabittir. Modelde iyonize payı %${(110/(2.4-.02*(40-p.alb))).toFixed(1).replace('.',',')} olur; %45 yaklaşık normal dağılımdır. Bağlı bölüm proteinlerle ve HCO₃⁻, sitrat, fosfatla ilişkili Ca²⁺’u içerir.`,'399')
  });

  D81_VIZ.f81_denge=el=>SEKIL.sahne(el,{
    baslik:'Kalsiyum düzenlenmesinde üç hedef',vb:[640,625],vbDar:[360,965],hareket:true,sure:6,
    secenek:D81_sec('d','Ca²⁺ durumu',[['dusuk','Düşük Ca²⁺'],['yuksek','Yüksek Ca²⁺']]),
    ciz:(S,t,p)=>{
      const low=p.d==='dusuk',w=S.w-40;
      let s=D81_card(S,20,15,w,'Plazma iyonize Ca²⁺ '+(low?'↓':'↑'),low?'CaSR → paratiroit → PTH ↑':'CaSR → PTH ↓; kalsitriol ↓',low?'basic':'crit',90);
      s+=D81_flow(S,[ [S.w/2,105],[S.w/2,135]],t);
      s+=D81_card(S,20,135,w,low?'PTH → 1-α-hidroksilaz ↑':'Tiroit C hücresi → kalsitonin ↑',low?['Böbrekte kalsitriol (D vitamini) ↑','Kalsitonin salınımı düşük']:['Kitaptaki eşik: total Ca²⁺ > 2,4 mmol/L','1-α-hidroksilaz ↓; insanda rolü küçük'],'accent',S.dar?140:110);
      const start=S.dar?310:290;
      for(let j=0;j<3;j++) {
        const path=S.dar?[[180,275],[10,275],[10,start+j*155+65],[20,start+j*155+65]]:[[320,245],[320,265],[113+j*210,265],[113+j*210,290]];
        s+=low?D81_flow(S,path,t,'warn',2):S.ok(path,{renk:'basic',kesik:true});
        s+=S.t(S.dar?23:120+j*210,S.dar?start+j*155-5:284,low?'+':'−',{c:'b',renk:low?'warn':'basic'});
      }
      const names=['Bağırsak','Böbrek','Kemik'], texts=low?[
        ['D vitamini: Ca²⁺ ve fosfat emilimi ↑'],['PTH + D: Ca²⁺ geri emilimi ↑','PTH: fosfat geri emilimi ↓','D: fosfat geri emilimi ↑'],['PTH: osteoklast / rezorpsiyon ↑','D: kalsifikasyon ↑','Net kemik etkisi çok küçük']
      ]:[['Ca²⁺ ve fosfat emilimi ↓'],['Ca²⁺ ve fosfat geri emilimi ↓','Kalsitonin: 1-α-hidroksilaz ↓'],['Kalsitonin: osteoklast ↓','Rezorpsiyon ↓']];
      names.forEach((a,i)=>{const x=S.dar?20:12+i*210,y=S.dar?start+i*155:start,ww=S.dar?320:202;s+=D81_card(S,x,y,ww,a,texts[i],low?'warn':'basic',S.dar?140:190);});
      const bottom=S.dar?805:510;
      s+=S.t(20,bottom,[low?'Sonuç: plazma Ca²⁺ ↑':'Sonuç: plazma Ca²⁺ ↓','Kemik yoğunluğu: gonadal steroit /','büyüme hormonu ↑; glukokortikoit ↓'],{c:'k',lh:24});
      return s;
    },metin:p=>D81_ref(p.d==='dusuk'?'PTH kalsitriol yapımını artırır. Bağırsak emilimi ve böbrekte Ca²⁺ geri emilimi artar; PTH ve D vitamininin kemik etkileri karşıt yöndedir.':'PTH ve D vitamini aktivasyonu azalır. Kalsitonin bağırsak emilimini, böbrek geri emilimini ve osteoklast etkinliğini azaltır. 2,4 mmol/L eşiği iyonize kalsiyum için kullanılmaz.','399–401')
  });

  const D81_vitText={normal:'Deri UVB ile D3 yapar; karaciğer kalsidiol, böbrek kalsitriol oluşturur. PTH böbrekteki hız belirleyici basamağı uyarır.',kbh:'Böbrekte 1-α-hidroksilasyon bozulur; Ca²⁺ atılımı emilimi aşar. Hipokalsemi → PTH ↑ → sekonder hiperparatiroidi → kemikten Ca²⁺ mobilizasyonu → renal osteodistrofi.',alfa:'Alfakalsidol böbreğin 1-α-hidroksilasyon basamağını atlar; karaciğerdeki 25-hidroksilasyon gereksinimi sürer.',kc:'Ağır karaciğer bozukluğunda 25-hidroksilasyon azalır. Alkolizmde diyetle Ca²⁺ eksikliği; hemokromatozda gonadal yetmezlik ve osteoporoz katkıda bulunur.'};
  D81_VIZ.f81_vitd=el=>SEKIL.sahne(el,{
    baslik:'D vitamini aktivasyon yolu',vb:[640,710],vbDar:[360,920],hareket:true,sure:6,
    secenek:D81_sec('d','Durum',[['normal','Normal'],['kbh','Kronik böbrek hastalığı'],['alfa','KBH + alfakalsidol'],['kc','Ağır karaciğer hastalığı']]),
    ciz:(S,t,p)=>{
      const w=S.dar?280:450,x=40;
      const rows=[['Deri / besin',['7-dehidrokolesterol + UVB','→ kolekalsiferol (D3)']],['Karaciğer',['25-hidroksilaz','→ kalsidiol (25-OH D3)']],['Böbrek',['1-α-hidroksilaz · PTH +','→ kalsitriol (1,25-(OH)₂ D3)']]];
      let s='';rows.forEach(([a,b],i)=>{const y=15+i*140;s+=D81_card(S,x,y,w,a,b,'line',105);if(i<2){const blocked=p.d==='kc'&&i===1;s+=blocked?S.ok([[180,y+105],[180,y+140]],{soluk:true}):D81_flow(S,[[180,y+105],[180,y+140]],t);}if((p.d==='kc'&&i===1)||((p.d==='kbh'||p.d==='alfa')&&i===2))s+=D81_cross(S,x+w-18,y+20);});
      const blocked=p.d==='kbh'||p.d==='kc';s+=blocked?S.ok([[180,400],[180,435]],{soluk:true}):D81_flow(S,[[180,400],[180,435]],t);
      if(p.d==='alfa')s+=S.ok([[x+w,200],[S.w-15,200],[S.w-15,450],[x+w,450]],{renk:'accent',w:3});
      s+=D81_card(S,x,435,w,'Hedefler',['Bağırsak, böbrek, kemik',p.d==='alfa'?'Alfakalsidol → karaciğer → kalsitriol':blocked?'Kalsitriol ↓':'Kalsitriol etkisi'],'accent',115);
      if(p.d!=='normal')s+=D81_card(S,20,560,S.w-40,p.d==='alfa'?'Böbrek basamağı atlanır':'Bozulan yol',D81_vitText[p.d],'line',S.dar?210:115);
      return s;
    },metin:p=>D81_ref(D81_vitText[p.d]+' Sinakalset CaSR duyarlılığını artırıp PTH’yi azaltır; primer, sekonder ve tersiyer hiperparatiroidide kullanılmıştır.','400–401')
  });

  const D81_layers=[['glom','Glomeruloza','G → A: aldosteron','En dış korteks; ana aldosteron kaynağı.'],['fas','Fasikülata','F → C: kortizol','Orta korteks; glukokortikoit sentezi.'],['ret','Retikülaris','R → T: androjen','DHEA ve androstenedion → periferde testosteron.'],['med','Medulla','Adrenalin / noradrenalin','T5–T9 pregangliyonik sempatik lifler; değişmiş sempatik ganglion; kromafin hücreler.']];
  D81_VIZ.f81_adrenal=el=>D81_scene(el,{
    baslik:'Adrenal katmanlar ve ürünleri',vb:[640,560],vbDar:[360,800],
    ciz:(S,t,p,v)=>{
      const cx=S.dar?180:165; let s=S.t(cx,25,'T12 · böbrek üst kutbu',{a:'middle',c:'k'})+S.kutu(cx-70,265,140,70,{r:35,dolgu:'chip'})+S.cizgi([[cx-100,120],[cx,55],[cx+100,120],[cx-100,120]],{renk:'warn',dolgu:'warn-soft'});
      s+=S.t(cx,360,['Yağ yastığı + renal fasya','Kapsül'],{a:'middle',c:'k'});
      D81_layers.forEach((a,i)=>{s+=D81_hit(a[0],a[1],S.kutu(cx-130+i*10,130+i*31,260-i*20,30,{yazi:a[1],yc:'k',renk:v===a[0]?'accent':i===3?'crit':'warn',dolgu:v===a[0]?'accent-soft':i===3?'crit-soft':'warn-soft'}));});
      const a=D81_layers.find(a=>a[0]===v),x=S.dar?20:345,y=S.dar?415:45,w=S.dar?320:275;
      s+=D81_card(S,x,y,w,a[1],[a[2],a[3]],'accent',200);
      if(v==='med')s+=S.kutu(x,y+225,w*.8,25,{dolgu:'warn-soft',renk:'warn'})+S.kutu(x+w*.8,y+225,w*.2,25,{dolgu:'basic-soft',renk:'basic'})+S.t(x,y+278,['Adrenalin ≈ %80','Noradrenalin ≈ %20'],{c:'k'});
      else s+=S.t(x,y+235,['Korteks: mezoderm kökenli','Bez ağırlığının %70’i'],{c:'k'});
      return s+S.t(20,S.dar?755:505,['GFR → ACTH: aldosteron, kortizol,','“testosteron” (androjenler için anımsatıcı)'],{c:'k'});
    },metin:(p,t,v)=>{const a=D81_layers.find(a=>a[0]===v);return D81_ref(`<b>${a[1]}.</b> ${a[2]}. ${a[3]}`,'401');}
  },{ad:'Katman',items:D81_layers.map(a=>[a[0],a[1]])});

  const D81_aldoText={ang:'Böbrek kan akımı ↓ → renin; renin anjiyotensinojeni anjiyotensin I’e çevirir. Akciğerde ACE → anjiyotensin II → aldosteron. Artan plazma hacmi böbrek kan akımını düzeltir.',k:'Hiperkalemi adrenal korteksi doğrudan uyarır; hipokalemi aldosteron salgısını azaltır.',asit:'Asidoz aldosteron salgısını doğrudan uyarır; aldosteron böbrekte H⁺ salgısını artırır.',acth:'ACTH’nin aldosteron salgısındaki rolü küçüktür; başlıca kortizol salgısını uyarır.'};
  D81_VIZ.f81_aldo=el=>SEKIL.sahne(el,{
    baslik:'Aldosteron uyaranları ve böbrek yanıtı',vb:[640,700],vbDar:[360,900],hareket:true,sure:8,
    secenek:D81_sec('u','Uyaran',[['ang','Anjiyotensin II'],['k','Hiperkalemi'],['asit','Asidoz'],['acth','ACTH']]),
    ciz:(S,t,p)=>{
      const w=S.w-80;let s=D81_card(S,40,15,w,'Mineralokortikoit etkinlik','%95 aldosteron; kalanın çoğu kortizol','line',S.dar?105:80);
      const by=S.dar?140:120;
      s+=D81_card(S,40,by,w,p.u==='ang'?'Böbrek kan akımı ↓':p.u==='k'?'Plazma K⁺ ↑':p.u==='asit'?'Plazma H⁺ ↑':'ACTH',p.u==='ang'?['Renin: anjiyotensinojen → Ang I','ACE (akciğer): Ang I → Ang II']:p.u==='k'?['Doğrudan uyarı','Hipokalemi → salgı ↓']:p.u==='asit'?'Doğrudan uyarı':'Küçük rol','warn',S.dar?150:115);
      const yy=by+(S.dar?190:155);s+=D81_flow(S,[ [S.w/2,by+(S.dar?150:115)],[S.w/2,yy]],t,'accent',p.u==='ang'?5:p.u==='acth'?1:3,p.u==='ang'?4:p.u==='acth'?1:2);
      s+=D81_card(S,40,yy,w,'Zona glomeruloza','Aldosteron ↑','accent',85)+D81_flow(S,[ [S.w/2,yy+85],[S.w/2,yy+125]],t);
      s+=D81_card(S,40,yy+125,w,'Böbrek · toplayıcı kanal',['Na⁺ ve su geri emilimi ↑','K⁺ ve H⁺ atılımı ↑','Kan hacmi ↑ → kan basıncı ↑'],'line',155);
      if(p.u==='ang')s+=S.ok([[40,yy+240],[15,yy+240],[15,by+30],[40,by+30]],{kesik:true,renk:'basic'})+S.t(23,by+23,'−',{c:'b'})+S.t(40,yy+320,['Plazma hacmi ↑','Böbrek kan akımı düzelir'],{c:'k'});
      return s;
    },metin:p=>D81_ref(D81_aldoText[p.u],'401–402')
  });

  const D81_cort=[['CRH','Hipotalamus CRH’yi günlük ritimle, en çok sabah erken saatte salar. Ağrı, enfeksiyon ve cerrahi salınımı artırır.'],['ACTH','Ön hipofiz CRH’ye yanıt olarak ACTH salar.'],['Kortizol','Zona fasikülata ACTH’ye yanıt verir. Kortizolün %90’ı bağlayıcı protein ve albümine bağlı; %10’u serbest ve etkindir.'],['Geribildirim','Serbest kortizol CRH ve ACTH salınımını baskılar. Metabolik etkiler insülinin tersidir. Damarların katekolaminlere duyarlılığı artar; kortizol yokluğunda yaygın vazodilatasyon olur.'],['Etomidat','11-β-hidroksilazı geri dönüşümlü inhibe eder. Stres altında adrenokortikal yetmezlik riski doğar. Kritik hastada tek RSİ dozunun mortaliteyi artırdığı gösterilmemiştir; kritik travma sedasyonunda sürekli infüzyon mortaliteyi artırmıştır.']];
  D81_VIZ.f81_kortizol=el=>SEKIL.adim(el,{
    baslik:'Kortizol ekseni ve etomidat',vb:[640,690],vbDar:[360,930],hareket:true,
    adimlar:D81_cort.map(([ad,txt],i)=>({ad,metin:D81_ref(txt,'402'),ciz:(S,t)=>{
      const x=45,w=S.dar?270:230;let s='';
      ['Hipotalamus','Ön hipofiz','Zona fasikülata','Plazma kortizolü'].forEach((a,j)=>{const y=15+j*95;s+=S.kutu(x,y,w,50,{yazi:a,renk:Math.min(i,3)===j?'accent':'line'});if(j<3)s+=D81_flow(S,[[x+w/2,y+50],[x+w/2,y+95]],t,'accent',i===4&&j===2?1:3)+S.t(x+5,y+78,['CRH','ACTH','Kortizol'][j],{c:'k'});});
      s+=S.kutu(x,365,w*.9,22,{dolgu:'chip'})+S.kutu(x+w*.9,365,w*.1,22,{dolgu:'accent-soft',renk:'accent'})+S.t(x,412,['%90 bağlı: CBG + albümin','%10 serbest: biyolojik etkin'],{c:'k'});
      if(i>=3){s+=S.ok([[45,375],[18,375],[18,40],[45,40]],{kesik:true,renk:'basic'})+S.ok([[18,180],[30,180],[30,135],[45,135]],{kesik:true,renk:'basic'})+S.t(30,31,'−',{c:'b'})+S.t(30,126,'−',{c:'b'});}
      const px=S.dar?20:325,py=S.dar?475:25,pw=S.dar?320:295;
      if(i===0){s+=D81_card(S,px,py,pw,'CRH günlük ritmi',['Sabah erken: tepe','Ağrı / enfeksiyon / cerrahi ↑'],'line',110);const pts=Array.from({length:25},(_,k)=>[px+20+k*(pw-40)/24,py+230-70*Math.exp(-Math.pow((k-6)/4,2))]);s+=S.cizgi([[px+20,py+145],[px+20,py+240],[px+pw-10,py+240]],{renk:'muted'})+S.cizgi(pts,{renk:'accent',w:3})+S.t(px+20,py+265,'00        12        24 saat',{c:'k'});}
      if(i===3)s+=D81_card(S,px,py,pw,'Kortizol etkileri',['Kas: amino asit mobilizasyonu','Lipoliz → yağ asidi + gliserol','Periferik glukoz kullanımı ↓','Glukoneogenez ↑ → glukoz ↑','Katekolamin duyarlılığı ↑','Plazma hacmi ↑'],'line');
      if(i===4){s+=D81_card(S,px,py,pw,'Sentezin son basamağı',['11-deoksikortizol','↓ 11-β-hidroksilaz','Kortizol'],'line',150)+S.ok([[px+pw-25,py+60],[px+pw-25,py+90]],{kesik:true,renk:'crit'})+S.t(px+pw-44,py+80,'−',{c:'b'});s+=D81_card(S,px,py+175,pw,'Etomidat',['Geri dönüşümlü inhibisyon','Stres → yetmezlik riski','Tek RSİ dozu: mortalite artışı gösterilmedi','Sürekli travma sedasyonu: mortalite ↑'],'crit');}
      return s;
    }}))
  });

  const D81_catSteps=[['Tirozin','Besinden ya da karaciğerde fenilalaninin hidroksilasyonundan elde edilir; kromafin hücre sitoplazmasına alınır.','402–403'],['L-DOPA','Tirozin hidroksilaz tirozini L-3,4-dihidroksifenilalanine çevirir; sentezin hız belirleyici adımıdır.','403'],['Dopamin','DOPA dekarboksilaz L-DOPA’yı dopamine çevirir.','403'],['Noradrenalin','Dopamin β-hidroksilaz noradrenalin yapar; sempatik sinir uçlarında da bu basamağa ulaşılır.','403'],['Adrenalin','PNMT noradrenalini adrenaline çevirir; kitap bu enzimi adrenal medullanın kromafin hücrelerine özgü olarak tanımlar.','403'],['Granül','İki amin ATP, kromogranin A ve met-enkefalin gibi opioid peptitlerle birlikte granüllere paketlenir.','403'],['Yıkım','Yarılanma ömrü yaklaşık 2 dakikadır. COMT ve MAO ile yıkım sonunda VMA oluşur; feokromositomada plazma metanefrinleri yükselir.','404']];
  D81_VIZ.f81_katekol=el=>SEKIL.adim(el,{
    baslik:'Katekolamin sentezi depolanması ve yıkımı',vb:[640,690],vbDar:[360,990],hareket:true,
    adimlar:D81_catSteps.map(([ad,txt,page],i)=>({ad,metin:D81_ref(txt,page),ciz:(S,t)=>{
      const x=25,w=S.dar?310:260;let s=S.kutu(12,5,S.dar?336:285,560,{r:20})+S.t(x,30,'Kromafin hücre',{c:'b'});
      const mol=['Tirozin','L-DOPA','Dopamin','Noradrenalin','Adrenalin'],enz=['Tirozin hidroksilaz','DOPA dekarboksilaz','Dopamin β-hidroksilaz','PNMT · yalnız medulla'];
      mol.forEach((a,j)=>{const y=55+j*100;s+=S.kutu(x,y,w,42,{yazi:a,renk:i===j?'accent':'line',soluk:i<j});if(j<4){s+=S.ok([[x+20,y+42],[x+20,y+100]],{renk:'accent',soluk:i<=j});if(i>j)s+=S.akis([[x+20,y+42],[x+20,y+100]],t,{n:2,r:3});s+=S.t(x+38,y+65,D81_wrap(enz[j],S.dar?29:24),{c:'k'});if(j===0)s+=S.t(x+38,y+88,'Hız belirleyici',{c:'k',renk:'warn'});}});
      const xx=S.dar?20:330,yy=S.dar?600:30,ww=S.dar?320:290;
      if(i===0)s+=D81_card(S,xx,yy,ww,'Tirozin girişleri',['Besin','Karaciğer: fenilalanin → tirozin'],'accent');
      if(i===3||i===4)s+=D81_card(S,xx,yy,ww,'Sempatik sinir ucu',['Yol noradrenaline kadar ilerler','PNMT adımı medullada'],'line');
      if(i===5)s+=D81_card(S,xx,yy,ww,'Depo granülü',['Adrenalin + noradrenalin','ATP','Kromogranin A','Met-enkefalin'],'accent',220);
      if(i===6){s+=D81_card(S,xx,yy,ww,'Yıkım · t½ ≈ 2 dk',['Noradrenalin → normetanefrin','Adrenalin → metanefrin','İlk ok: COMT','Metanefrinler → VMA','Son ok: MAO'],'accent',210);s+=D81_card(S,xx,yy+235,ww,'Feokromositoma','Plazma metanefrinleri ↑','warn',110);}
      return s;
    }}))
  });

  const D81_release=[['Uyaran','Egzersiz, travma, ağrı, hipovolemi, hipoglisemi, hipotermi veya kaygı pregangliyonik sempatik lifte aksiyon potansiyeli başlatır.'],['Asetilkolin','Pregangliyonik sempatik uç asetilkolin (ACh) salar.'],['Depolarizasyon','ACh nikotinik reseptörü açar; Na⁺ ve K⁺ geçirgenliği artar. Na⁺ girişi baskındır, net sonuç depolarizasyondur.'],['Ca²⁺ girişi','Depolarizasyon voltaj kapılı Ca²⁺ kanallarını açar; Ca²⁺ hücreye girer.'],['Ekzositoz','Ca²⁺ girişi granül ekzositozunu tetikler. Dolaşıma adrenalin ve noradrenalin salınır; sinir uçlarından yaygın noradrenalin salınımını da içeren sempatik yanıtın parçasıdır. Negatif geribildirim yoktur.']];
  D81_VIZ.f81_salgi=el=>SEKIL.adim(el,{
    baslik:'Kromafin hücreden katekolamin salınımı',vb:[640,800],vbDar:[360,800],hareket:true,
    adimlar:D81_release.map(([ad,txt],i)=>({ad,metin:D81_ref(txt,'403'),ciz:(S,t)=>{
      const x=S.w/2;let s=D81_card(S,20,10,S.w-40,'Pregangliyonik sempatik lif',i===0?['Egzersiz, travma, ağrı, kaygı','Hipovolemi, hipoglisemi, hipotermi']:'Uç buton → ACh','line',110);
      s+=D81_flow(S,[[x,120],[x,185]],t,i<2?'accent':'muted',3)+S.t(x+15,155,i===0?'Aksiyon potansiyeli':'ACh',{c:'k'});
      s+=S.kutu(30,185,S.w-60,310,{r:30,renk:'accent'})+S.t(50,225,'Kromafin hücre',{c:'b'})+S.kutu(x-80,175,160,30,{yazi:'Nikotinik reseptör',yc:'k',renk:'accent'});
      s+=S.t(55,265,['Zar potansiyeli',i>=2?'Depolarizasyon ↑':'İstirahat'],{c:'k'});
      if(i===2)s+=D81_flow(S,[[80,175],[80,235]],t,'accent',4)+S.t(42,166,'Na⁺ içeri',{c:'k'})+D81_flow(S,[ [S.w-80,235],[S.w-80,175]],t,'basic',1)+S.t(S.w-124,166,'K⁺ dışarı',{c:'k'});
      s+=S.kutu(45,320,S.w-90,45,{yazi:'Voltaj kapılı Ca²⁺ kanalı',yc:'k',renk:i===3?'accent':'line'});
      if(i===3)s+=D81_flow(S,[[20,340],[60,340],[60,395]],t)+S.t(80,395,'Ca²⁺ içeri',{c:'b'});
      for(let k=0;k<5;k++)s+=S.daire(75+k*(S.w-150)/4,445,12,{renk:k===4?'basic':'warn',dolgu:k===4?'basic-soft':'warn-soft'});
      s+=D81_card(S,30,560,S.w-60,'Kapiller / dolaşım',['≈ %80 adrenalin','≈ %20 noradrenalin'],'line',100);
      if(i===4)s+=D81_flow(S,[[x-20,465],[x-20,555]],t,'warn',4)+D81_flow(S,[[x+20,465],[x+20,555]],t,'basic',1)+S.t(40,710,['Negatif geribildirim yok','Sinir uçlarından da yaygın','noradrenalin salınımı'],{c:'k',lh:22});
      return s;
    }}))
  });
})();
