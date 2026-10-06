(function(){
'use strict';
const PULSE={hr:72,ph:0,spo2:98};
const LUNG=(()=>{const P={C:50,R:10,vt:450,rr:12,peep:5};let t=0,cur={P:5,F:0,V:0};
  function sample(t){const Tb=60/P.rr,Ti=Tb/3,Tf=Ti*.9,C=P.C/1000,R=P.R,tau=R*C,Te=Tb-Ti,ke=Math.exp(-Te/tau),vt=P.vt/1000,fl=vt/Tf,Vee=vt*ke/(1-ke),Vi=Vee+vt,s=t%Tb;
    if(s<Tf){const V=Vee+fl*s;return{P:P.peep+V/C+R*fl,F:fl,V};}if(s<Ti)return{P:P.peep+Vi/C,F:0,V:Vi};const e=s-Ti,V=Vi*Math.exp(-e/tau);return{P:P.peep+(Vi/C)*Math.exp(-e/.05),F:-V/tau,V};}
  return{P,get cur(){return cur;},step(dt){t+=dt;cur=sample(t);}};})();
frameHooks.push(dt=>{PULSE.ph=(PULSE.ph+dt*PULSE.hr/60)%1;LUNG.step(dt);});
/* ───────────── FİZİK: BOYLE ───────────── */
function boyle(){const V=+$('#bV').value,P=+$('#bP').value,F=+$('#bF').value,Tc=+$('#bT').value;
  $('#bVo').textContent=V;$('#bPo').textContent=P;$('#bFo').textContent=nf(F,F%1?1:0);$('#bTo').textContent=Tc;
  const gas=V*P,min=gas/F,h=Math.floor(min/60),m=Math.round(min%60);
  $('#bGas').innerHTML=Math.round(gas).toLocaleString(ATLAS.t("fizik.1"))+'<small>L</small>';$('#bTime').textContent=(h?h+ATLAS.t("fizik.2"):'')+m+ATLAS.t("fizik.3");
  $('#bHot').innerHTML=Math.round(((P+1.013)*(Tc+273.15)/293.15)-1.013)+'<small>bar</small>';}
['bV','bP','bF','bT'].forEach(id=>$('#'+id).addEventListener('input',boyle));boyle();

/* ───────────── FİZİK: DALTON ───────────── */
const altP=[[ATLAS.t("fizik.4"),0],['Ankara',938],['Kayseri',1054],['Erzurum',1890],['3000 m',3000]];
$('#altChips').innerHTML=altP.map(([n,h])=>`<button type="button" data-h="${h}" aria-pressed="${h===1054}">${n}</button>`).join('');
$('#altChips').addEventListener('click',e=>{const b=e.target.closest('button[data-h]');if(!b)return;$('#dAlt').value=b.dataset.h;dalton();});
function dalton(){const h=+$('#dAlt').value,fi=+$('#dFi2').value,PB=PBof(h),pi=fi*(PB-47),pa=pi-40/.8;ALT.h=h;
  $('#dAlto').textContent=h;$('#dFio').textContent=nf(fi,2);
  $$('#altChips button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.h===h));
  $('#dPB').innerHTML=Math.round(PB)+'<small>mmHg</small>';$('#dPi').innerHTML=Math.round(pi)+'<small>mmHg</small>';$('#dPA').innerHTML=Math.round(pa)+'<small>mmHg</small>';
  const X0=20,Wd=480,sc=Wd/760,y=34,hh=34;const segs=[['H₂O 47','var(--c-h2o)',47],['O₂ '+Math.round(pi),'var(--c-o2)',pi],['N₂ '+Math.round(PB-47-pi),'var(--c-n2)',PB-47-pi]];
  let x=X0,svg=`<rect x="${X0}" y="${y}" width="${Wd}" height="${hh}" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/>`;
  segs.forEach(([l,c,v])=>{const w=v*sc;svg+=`<rect x="${x}" y="${y}" width="${Math.max(w,0)}" height="${hh}" fill="${c}"/>`;if(w>46)svg+=`<text x="${x+w/2}" y="${y+hh/2+5}" text-anchor="middle" font-size="13" style="fill:var(--seg-ink)">${l}</text>`;x+=w;});
  svg+=`<line x1="${X0+PB*sc}" y1="${y-8}" x2="${X0+PB*sc}" y2="${y+hh+8}" class="ink" stroke-width="2"/><text x="${X0+PB*sc}" y="${y-13}" text-anchor="end" font-size="12">P<tspan font-size="9" dy="3">B</tspan><tspan dy="-3"> ${Math.round(PB)}</tspan></text>`;
  svg+=ATLAS.template("fizik.5")`${X0}${y+hh+26}${X0+Wd}${y+hh+26}`;
  $('#daltonFig').innerHTML=svg;vap();}
['dAlt','dFi2'].forEach(id=>$('#'+id).addEventListener('input',dalton));

/* ───────────── FİZİK: THORPE ───────────── */
const GASP={O2:{n:ATLAS.t("fizik.6"),rho:1.429,mu:20.4},Air:{n:ATLAS.t("fizik.7"),rho:1.293,mu:18.2},N2O:{n:'N₂O',rho:1.978,mu:14.6},HeO:{n:ATLAS.t("fizik.8"),rho:.441,mu:19.9}};
let thG='O2';
$('#thGas').innerHTML=Object.entries(GASP).map(([k,g])=>`<button type="button" data-g="${k}" aria-pressed="${k==='O2'}">${g.n}</button>`).join('');
$('#thGas').addEventListener('click',e=>{const b=e.target.closest('button[data-g]');if(!b)return;thG=b.dataset.g;$$('#thGas button').forEach(x=>x.setAttribute('aria-pressed',x===b));thorpe();});
function thorpe(){const q=+$('#thQ').value;$('#thQo').textContent=nf(q);
  const gap=.05+1.45*(q/12),ratio=3/gap,wl=clamp((ratio-2)/16,0,1),g=GASP[thG],o=GASP.O2;
  const factor=wl*(o.mu/g.mu)+(1-wl)*Math.sqrt(o.rho/g.rho),act=q*factor;
  $('#thReg').textContent=wl>.6?ATLAS.t("fizik.9"):wl>.3?ATLAS.t("fizik.10"):ATLAS.t("fizik.11");
  $('#thAct').innerHTML=nf(act)+ATLAS.t("fizik.12");
  $('#thTxt').textContent=thG==='O2'?ATLAS.t("fizik.13"):
    ATLAS.t("fizik.14")+g.n+ATLAS.t("fizik.15")+(factor>1?ATLAS.t("fizik.16"):ATLAS.t("fizik.17"))+ATLAS.t("fizik.18")+nf(factor,2)+ATLAS.t("fizik.19");
  const y0=280,y1=20,cx=58,wb=8,wt=24,f=q/12,by=y0-f*(y0-y1-16),wAt=y=>wb+(wt-wb)*(y0-y)/(y0-y1);
  let s=`<polygon points="${cx-wb},${y0} ${cx+wb},${y0} ${cx+wt},${y1} ${cx-wt},${y1}" fill="var(--accent-soft)" stroke="var(--ink)" stroke-width="1.5"/>`;
  for(let k=0;k<=12;k+=2){const yy=y0-(k/12)*(y0-y1-16);s+=`<line x1="${cx+wt+6}" y1="${yy}" x2="${cx+wt+14}" y2="${yy}" class="ink"/><text x="${cx+wt+18}" y="${yy+4}" font-size="11" class="dim">${k}</text>`;}
  const ww=wAt(by-6);s+=`<rect x="${cx-ww}" y="${by-12}" width="${2*ww}" height="12" fill="${wl>.45?'var(--c-h2o)':'var(--warn)'}" opacity=".35"/>`;
  s+=`<rect x="${cx-9}" y="${by-12}" width="18" height="12" rx="2" fill="var(--ink)"/><polygon points="${cx-9},${by} ${cx+9},${by} ${cx},${by+9}" fill="var(--ink)"/>`;
  s+=ATLAS.template("fizik.20")`${cx}${y0+16}`;
  const nArr=3;for(let i=0;i<nArr;i++){const xx=cx-5+i*5;s+=`<line x1="${xx}" y1="${y0+2}" x2="${xx}" y2="${by+16}" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 3" opacity=".7"/>`;}
  $('#thFig').innerHTML=s;}
$('#thQ').addEventListener('input',thorpe);thorpe();

/* ───────────── FİZİK: POISEUILLE ───────────── */
function poi(){const id=+$('#pID').value;$('#pIDo').textContent=nf(id);const lam=Math.pow(8/id,4),tur=Math.pow(8/id,5),ar=Math.PI*Math.pow(id/2,2);
  $('#pLam').textContent='× '+nf(lam,2);$('#pTur').textContent='× '+nf(tur,2);$('#pArea').innerHTML=nf(ar,1)+'<small>mm²</small>';
  const sc=7;let s=ATLAS.template("fizik.21")`${8/2*sc}${id/2*sc}${nf(id)}`;
  const X0=170,Wm=330,mx=4.5,bw=v=>Math.min(v/mx,1)*Wm;
  s+=ATLAS.template("fizik.22")`${X0}${X0}${bw(lam)}${X0+bw(lam)+6}${nf(lam,2)}`;
  s+=ATLAS.template("fizik.23")`${X0}${X0}${bw(tur)}${Math.min(X0+bw(tur)+6,470)}${nf(tur,2)}`;
  s+=ATLAS.template("fizik.24")`${X0+bw(1)}${X0+bw(1)}${X0+bw(1)}`;
  $('#poiFig').innerHTML=s;}
$('#pID').addEventListener('input',poi);poi();

/* ───────────── FİZİK: VAPORİZATÖR ───────────── */
const AG={sevo:{n:ATLAS.t("fizik.25"),svp:157,mac:2.0,max:8,col:'var(--a-sevo)'},iso:{n:ATLAS.t("fizik.26"),svp:238,mac:1.15,max:5,col:'var(--a-iso)'},hal:{n:ATLAS.t("fizik.27"),svp:243,mac:.75,max:5,col:'var(--a-hal)'},des:{n:ATLAS.t("fizik.28"),svp:669,mac:6,max:18,col:'var(--a-des)'}};
let ag='sevo';
$('#vAgent').innerHTML=Object.entries(AG).map(([k,a])=>`<button type="button" data-a="${k}" aria-pressed="${k==='sevo'}">${a.n} · ${a.svp}</button>`).join('');
$('#vAgent').addEventListener('click',e=>{const b=e.target.closest('button[data-a]');if(!b)return;ag=b.dataset.a;$$('#vAgent button').forEach(x=>x.setAttribute('aria-pressed',x===b));const d=$('#vDial');d.max=AG[ag].max;if(+d.value>AG[ag].max)d.value=AG[ag].max;if(ag==='des'&&+d.value<3)d.value=6;vap();});
function vapCalc(){const a=AG[ag],dial=+$('#vDial').value,F=+$('#vFGF').value,PB=PBof(ALT.h);if(ag==='des'){const c=dial/100;return{des:true,key:ag,F,By:F,Fc:0,Fv:c*F/(1-c),c};}const pv=dial/100*760,c=pv/PB,Fv=c*F/(1-c),Fc=Fv*(PB-a.svp)/a.svp;return{des:false,key:ag,F,By:F-Fc,Fc,Fv,c};}
function vap(){const a=AG[ag],dial=+$('#vDial').value,F=+$('#vFGF').value,PB=PBof(ALT.h);$('#vDialo').textContent=nf(dial);$('#vFGFo').textContent=nf(F);
  $('#vUse').innerHTML=Math.round(3*F*dial)+ATLAS.t("fizik.29");
  let s='';
  if(ag==='des'){
    const pp=dial/100*PB,need=dial*760/PB;
    $('#vSplit').textContent=ATLAS.t("fizik.30");$('#vOut').innerHTML=nf(dial)+ATLAS.t("fizik.31")+Math.round(pp)+' mmHg</small>';
    $('#vTxt').textContent=ATLAS.t("fizik.32")+Math.round(ALT.h)+ATLAS.t("fizik.33")+Math.round(PB)+ATLAS.t("fizik.34")+nf(need)+ATLAS.t("fizik.35");
    s+=ATLAS.template("fizik.36")`${nf(F)}`;
    s+=ATLAS.template("fizik.37")``;
    s+=ATLAS.template("fizik.38")``;
    s+=ATLAS.template("fizik.39")`${nf(dial)}`;
  }else{
    const pv=dial/100*760,c=pv/PB,Fv=c*F/(1-c),Fc=Fv*(PB-a.svp)/a.svp,By=F-Fc,ratio=By/Fc;
    $('#vSplit').innerHTML=nf(ratio,0)+'<small>: 1</small>';$('#vOut').innerHTML=nf(c*100)+ATLAS.t("fizik.40")+Math.round(pv)+' mmHg</small>';
    $('#vTxt').textContent=ATLAS.t("fizik.41")+nf(Fc*1000,0)+ATLAS.t("fizik.42")+nf(By,2)+ATLAS.t("fizik.43")+nf(Fv*1000,0)+ATLAS.t("fizik.44")+nf(a.svp/PB*100,0)+ATLAS.t("fizik.45")+Math.round(ALT.h)+ATLAS.t("fizik.46");
    const wF=10,wB=Math.max(2,10*By/F),wC=Math.max(2,10*Fc/F);
    s+=ATLAS.template("fizik.47")`${wF}${nf(F)}`;
    s+=ATLAS.template("fizik.48")`${wB}${nf(By,2)}`;
    s+=ATLAS.template("fizik.49")`${a.col}${nf(a.svp/PB*100,0)}`;
    s+=`<path d="M110 85 C140 85,150 120,185 120" stroke="var(--accent)" stroke-width="${wC}" fill="none"/><path d="M335 120 C370 120,380 85,410 85" stroke="${a.col}" stroke-width="${Math.max(wC*1.6,3)}" fill="none"/>`;
    s+=ATLAS.template("fizik.50")`${nf(Fc*1000,0)}`;
    s+=ATLAS.template("fizik.51")`${a.col}${wF}${nf(c*100)}`;
  }
  $('#vapFig').innerHTML=s;}
['vDial','vFGF'].forEach(id=>$('#'+id).addEventListener('input',vap));
dalton();

/* ───────────── FİZİK: HENRY GRAFİĞİ ───────────── */
(function(){const d=[[ATLAS.t("fizik.52"),.42,'var(--a-des)'],['N₂O',.47,'var(--a-n2o)'],[ATLAS.t("fizik.53"),.65,'var(--a-sevo)'],[ATLAS.t("fizik.54"),1.4,'var(--a-iso)'],[ATLAS.t("fizik.55"),2.4,'var(--a-hal)']];
  const X0=100,Wm=380,mx=2.5,sc=v=>v/mx*Wm;let s='';
  [0,.5,1,1.5,2,2.5].forEach(v=>{s+=`<line x1="${X0+sc(v)}" y1="10" x2="${X0+sc(v)}" y2="170" class="ln"/><text x="${X0+sc(v)}" y="188" text-anchor="middle" font-size="11" class="dim">${nf(v,1)}</text>`;});
  d.forEach(([n,v,c],i)=>{const y=16+i*31;s+=`<text x="${X0-8}" y="${y+15}" text-anchor="end" font-size="12">${n}</text><rect x="${X0}" y="${y}" width="${sc(v)}" height="20" rx="3" fill="${c}"/><text x="${X0+sc(v)+6}" y="${y+15}" font-size="12">${nf(v,2)}</text>`;});
  $('#henryFig').innerHTML=s;})();

/* ───────────── 3B LABORATUVAR ───────────── */
let LABAPI=null;
if(K3){
  const {lin,std,glass,MAT,makeEnv,rbox,put,cylG,corrugated,canvasTex,lathe,Viewer,gaugeTex,labelTex}=K3;
  /* ═════════ FİZİK LABORATUVARI 3B ═════════ */
  try{
  const L=new Viewer($('#stageLab'),{target:[0,.45,0],dist:2.4,theta:.35,phi:1.2,minD:.5,maxD:5,fov:30,shadow:1.3,groundR:1.7,panLim:1,fitAspect:1.5});
  const LS={};let LCUR=null;const D2=new THREE.Object3D();
  const rnd=(a,b)=>a+Math.random()*(b-a),val=id=>+$('#'+id).value,V3=a=>new THREE.Vector3(...a),CR=pts=>new THREE.CatmullRomCurve3(pts.map(V3));
  function swarm(parent,n,r,col){const m=new THREE.InstancedMesh(new THREE.SphereGeometry(r,10,8),new THREE.MeshStandardMaterial({color:lin(col),roughness:.35}),n);m.userData.nopick=true;m.frustumCulled=false;parent.add(m);
    return{m,n,p:new Float32Array(n*3),v:new Float32Array(n*3),u:new Float32Array(n),a:new Float32Array(n),b:new Float32Array(n),
      put(i,x,y,z){D2.position.set(x,y,z);D2.updateMatrix();m.setMatrixAt(i,D2.matrix);},done(c){m.count=c==null?n:Math.max(0,Math.min(n,c));m.instanceMatrix.needsUpdate=true;},color(h){m.material.color.copy(lin(h));}};}
  function mk(id,view,info,ctl){const G=new THREE.Group();G.visible=false;L.root.add(G);LS[id]={G,view,info,ctl,upd:null,live:null};return LS[id];}
  const tag=(id,text,pos)=>L.addTag(text,V3(pos),id);
  function dialTex(max,unit){return canvasTex(256,256,g=>{g.fillStyle='#F3F5F5';g.beginPath();g.arc(128,128,126,0,7);g.fill();g.lineWidth=12;g.strokeStyle='#1C4ED0';g.beginPath();g.arc(128,128,118,0,7);g.stroke();
    g.strokeStyle='#1c2226';for(let i=0;i<=8;i++){const a=(135+270*i/8)*Math.PI/180,r2=i%2?88:80;g.lineWidth=i%2?3:5;g.beginPath();g.moveTo(128+Math.cos(a)*100,128+Math.sin(a)*100);g.lineTo(128+Math.cos(a)*r2,128+Math.sin(a)*r2);g.stroke();
      if(i%2===0){g.fillStyle='#1c2226';g.font='600 24px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(max*i/8),128+Math.cos(a)*60,128+Math.sin(a)*60);}}
    g.font='600 22px sans-serif';g.fillText(unit,128,200);});}
  const needleRot=f=>(-(135+270*clamp(f,0,1))-90)*Math.PI/180;
  function bounceCyl(s,i,cx,cz,R,y0,y1,spd,dt){let x=s.p[3*i],y=s.p[3*i+1],z=s.p[3*i+2];x+=s.v[3*i]*spd*dt;y+=s.v[3*i+1]*spd*dt;z+=s.v[3*i+2]*spd*dt;
    const r=Math.hypot(x,z);if(r>R){const nx=x/r,nz=z/r,vn=s.v[3*i]*nx+s.v[3*i+2]*nz;if(vn>0){s.v[3*i]-=2*vn*nx;s.v[3*i+2]-=2*vn*nz;}x=nx*R;z=nz*R;}
    if(y<y0){y=y0;s.v[3*i+1]=Math.abs(s.v[3*i+1]);}if(y>y1){y=y1;s.v[3*i+1]=-Math.abs(s.v[3*i+1]);}
    s.p[3*i]=x;s.p[3*i+1]=y;s.p[3*i+2]=z;s.put(i,cx+x,y,cz+z);}
  function seedCyl(s,R,y0,y1){for(let i=0;i<s.n;i++){const a=rnd(0,6.283),r=R*Math.sqrt(Math.random());s.p[3*i]=r*Math.cos(a);s.p[3*i+1]=rnd(y0,y1);s.p[3*i+2]=r*Math.sin(a);
    const t=rnd(0,6.283),ph=Math.acos(rnd(-1,1));s.v[3*i]=Math.sin(ph)*Math.cos(t);s.v[3*i+1]=Math.cos(ph);s.v[3*i+2]=Math.sin(ph)*Math.sin(t);}}

  /* 1 · Boyle ve Gay-Lussac */
  {const id='fizik-boyle',S_=mk(id,{t:[0,.48,0],d:2.3,th:.3,ph:1.2},ATLAS.t("fizik.56")),G=S_.G;
   const cx=-.38,R0=.2,HM=.78;
   put(G,new THREE.Mesh(cylG(R0+.03,R0+.03,.035,40),MAT.dark),cx,.0175,0);
   put(G,new THREE.Mesh(cylG(R0,R0,HM,40,true),glass(0xE6F3F7,.15)),cx,.035+HM/2,0);
   const pis=put(G,new THREE.Mesh(cylG(R0-.005,R0-.005,.04,40),MAT.metal),cx,.5,0),rod=put(G,new THREE.Mesh(cylG(.016,.016,.6,14),MAT.chrome),cx,.8,0);
   const gd=new THREE.Group();gd.position.set(cx+.38,.62,0);G.add(gd);
   put(gd,new THREE.Mesh(cylG(.105,.105,.03,40),MAT.dark),0,0,-.016,Math.PI/2);
   put(gd,new THREE.Mesh(new THREE.CircleGeometry(.095,40),new THREE.MeshStandardMaterial({map:dialTex(4,'atm'),roughness:.4})),0,0,.001);
   const nd=new THREE.Group();nd.position.z=.006;gd.add(nd);put(nd,new THREE.Mesh(new THREE.BoxGeometry(.007,.08,.006),std(0xC42638,.4)),0,.035,0);
   put(G,new THREE.Mesh(new THREE.TubeGeometry(CR([[cx+R0,.07,0],[cx+.3,.07,0],[cx+.38,.2,0],[cx+.38,.52,0]]),30,.012,10,false),MAT.chrome));
   const sw=swarm(G,140,.011,0x2F6BFF);seedCyl(sw,R0-.02,.06,.4);
   const bx=.45;put(G,new THREE.Mesh(cylG(.14,.14,.62,40,true),glass(0xE6F3F7,.16)),bx,.35,0);
   const sh=put(G,new THREE.Mesh(new THREE.SphereGeometry(.14,32,16,0,Math.PI*2,0,Math.PI/2),glass(0xF4F6F7,.3)),bx,.66,0);sh.scale.y=.7;
   put(G,new THREE.Mesh(cylG(.145,.145,.03,40),MAT.dark),bx,.02,0);put(G,new THREE.Mesh(cylG(.025,.025,.08,14),MAT.chrome),bx,.8,0);
   const sw2=swarm(G,170,.009,0x2F6BFF);seedCyl(sw2,.12,.06,.62);
   const t1=tag(id,'',[cx,1.0,0]),t2=tag(id,'',[bx,1.0,0]);
   S_.upd=(dt,t)=>{const h=.18+.42*(.5+.5*Math.sin(t*.6)),top=.035+h;pis.position.y=top+.02;rod.position.y=top+.34;
     const T=val('bT')+273.15,spd=.55*Math.sqrt(T/293),Pv=(.39/h)*(T/293);nd.rotation.z=needleRot(Pv/4);
     for(let i=0;i<sw.n;i++)bounceCyl(sw,i,cx,0,R0-.015,.05,top-.03,spd,dt);sw.done();
     const n2=Math.round(170*val('bP')/200);for(let i=0;i<n2;i++)bounceCyl(sw2,i,bx,0,.125,.05,.64,spd*.6,dt);sw2.done(n2);
     t1.el.textContent=`V ${nf(h/.39,2)} · P ${nf(Pv,2)} atm · P×V ${nf(Pv*h/.39,2)}`;t2.el.textContent=ATLAS.template("fizik.57")`${val('bP')}${Math.round(val('bV')*val('bP'))}`;};}

  /* 2 · Dalton */
  {const id='fizik-dalton',S_=mk(id,{t:[.05,.42,0],d:2.2,th:.35,ph:1.2},ATLAS.t("fizik.58")),G=S_.G;
   const bc=[-.32,.36,0],hs=.3;
   put(G,new THREE.Mesh(new THREE.BoxGeometry(hs*2,hs*2,hs*2),glass(0xE6F3F7,.08)),...bc);
   const ed=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(hs*2,hs*2,hs*2)),new THREE.LineBasicMaterial({color:0x5b6b75}));ed.position.set(...bc);G.add(ed);
   put(G,new THREE.Mesh(new THREE.BoxGeometry(hs*2+.06,.03,hs*2+.06),MAT.dark),bc[0],.045,0);
   const cols=[0x2F6BFF,0x9AA7AF,0x3DB4E0],sws=[swarm(G,300,.01,cols[0]),swarm(G,300,.01,cols[1]),swarm(G,40,.01,cols[2])];
   sws.forEach(s=>{for(let i=0;i<s.n;i++){s.p[3*i]=rnd(-hs,hs)*.9;s.p[3*i+1]=rnd(-hs,hs)*.9;s.p[3*i+2]=rnd(-hs,hs)*.9;for(let k=0;k<3;k++)s.v[3*i+k]=rnd(-1,1);}});
   const bx=.42,bars=cols.map(c=>put(G,new THREE.Mesh(new THREE.BoxGeometry(1,1,1),std(c,.45)),bx,0,0));
   const gh=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.2,.76,.2)),new THREE.LineDashedMaterial({color:0x5b6b75,dashSize:.02,gapSize:.015}));gh.computeLineDistances();gh.position.set(bx,.04+.38,0);G.add(gh);
   const tO=tag(id,'',[bx+.2,.3,0]),tN=tag(id,'',[bx+.2,.6,0]),tH=tag(id,'',[bx+.2,.05,0]),tB=tag(id,'',[bc[0],.75,0]);
   S_.upd=dt=>{const PB=PBof(val('dAlt')),fi=val('dFi2'),tot=Math.round(300*PB/760),nH=Math.round(tot*47/PB),nO=Math.round(tot*fi*(PB-47)/PB),nN=Math.max(0,tot-nH-nO),cnt=[nO,nN,nH];
     sws.forEach((s,k)=>{for(let i=0;i<cnt[k];i++){for(let a=0;a<3;a++){let q=s.p[3*i+a]+s.v[3*i+a]*dt*.25;if(Math.abs(q)>hs*.95){s.v[3*i+a]*=-1;q=Math.sign(q)*hs*.95;}s.p[3*i+a]=q;}
       s.put(i,bc[0]+s.p[3*i],bc[1]+s.p[3*i+1],bc[2]+s.p[3*i+2]);}s.done(cnt[k]);});
     const pp=[fi*(PB-47),PB-47-fi*(PB-47),47],k=.76/760;let y=.04;
     [2,0,1].forEach(j=>{const h=Math.max(.002,pp[j]*k);bars[j].scale.set(.16,h,.16);bars[j].position.y=y+h/2;y+=h;});
     const yH=.04+47*k,yO=yH+pp[0]*k;tH.pos.y=.04+47*k/2;tO.pos.y=yH+pp[0]*k/2;tN.pos.y=yO+pp[1]*k/2;
     tO.el.textContent='O₂ '+Math.round(pp[0])+' mmHg';tN.el.textContent='N₂ '+Math.round(pp[1]);tH.el.textContent='H₂O 47';tB.el.textContent=`PB ${Math.round(PB)} mmHg · ${val('dAlt')} m`;};}

  /* 3 · Thorpe: laminar ve türbülan */
  {const id='fizik-thorpe',S_=mk(id,{t:[0,.62,0],d:2.1,th:.3,ph:1.25},ATLAS.t("fizik.59")),G=S_.G;
   const y0=.12,Ht=1.0,rAt=u=>.045+.06*u;
   const pts=[];for(let i=0;i<=20;i++){const u=i/20;pts.push([rAt(u)+.006,y0+u*Ht]);}
   put(G,lathe(pts,glass(0xEAF6FA,.22),48));
   put(G,new THREE.Mesh(cylG(.12,.14,.06,32),MAT.dark),0,.03,0);put(G,new THREE.Mesh(cylG(.065,.065,.05,32),MAT.metal),0,y0-.02,0);put(G,new THREE.Mesh(cylG(.12,.12,.04,32),MAT.metal),0,y0+Ht+.02,0);
   put(G,new THREE.Mesh(cylG(.02,.02,.4,14),MAT.chrome),-.2,.085,0,0,0,Math.PI/2);
   for(let k=0;k<=12;k++){const u=.04+k/12*.85;put(G,new THREE.Mesh(new THREE.BoxGeometry(k%2?.02:.035,.004,.004),MAT.dark),rAt(u)+.03,y0+u*Ht,0);if(k%6===0)tag(id,String(k),[rAt(u)+.09,y0+u*Ht,0]);}
   const bob=new THREE.Group();G.add(bob);put(bob,new THREE.Mesh(cylG(.041,.041,.045,24),MAT.chrome),0,0,0);put(bob,new THREE.Mesh(new THREE.ConeGeometry(.041,.035,24),MAT.chrome),0,-.04,0,Math.PI);
   put(bob,new THREE.Mesh(new THREE.BoxGeometry(.084,.008,.01),std(0xC42638,.4)),0,.012,0);
   const band=put(G,new THREE.Mesh(cylG(1,1,.03,40,true),new THREE.MeshBasicMaterial({color:0x2F6BFF,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false})),0,.5,0);band.userData.nopick=true;
   const sw=swarm(G,170,.0065,0x2F6BFF);for(let i=0;i<sw.n;i++){sw.u[i]=Math.random()*1.02;sw.a[i]=rnd(0,6.283);sw.b[i]=Math.random();}
   const t1=tag(id,'',[.2,.5,0]),tg=tag(id,'',[0,y0+Ht+.12,0]);
   const blue=lin(0x2F6BFF),orng=lin(0xF08A24);
   S_.upd=(dt,t)=>{const q=val('thQ'),f=q/12,ub=.04+f*.85,yb=y0+ub*Ht;bob.position.y=yb+.02;bob.rotation.y+=dt*(1+q*.6);
     const gap=.05+1.45*f,wl=clamp((3/gap-2)/16,0,1),tu=1-wl;sw.m.material.color.copy(blue).lerp(orng,tu);band.material.color.copy(blue).lerp(orng,tu);
     const rb=rAt(ub)-.004;band.scale.set(rb,1,rb);band.position.y=yb;
     const spd=.1+q*.045;
     for(let i=0;i<sw.n;i++){let u=sw.u[i]+spd*dt;if(u>1.02){u=0;sw.a[i]=rnd(0,6.283);sw.b[i]=Math.random();}sw.u[i]=u;
       sw.a[i]+=dt*tu*(3+5*Math.sin(i))+(Math.random()-.5)*tu*.5;sw.b[i]=clamp(sw.b[i]+(Math.random()-.5)*tu*.1,0,1);
       const Rt=rAt(u)-.01,near=Math.abs(u-ub)<.035;let r=near?.043+(Math.max(Rt,.045)-.043)*(.2+.6*sw.b[i]):Rt*Math.sqrt(sw.b[i])*.95;
       if(u>ub+.035)r=Math.max(r,.043*Math.min(1,(u-ub)/.2));
       sw.put(i,r*Math.cos(sw.a[i]),y0+u*Ht,r*Math.sin(sw.a[i]));}sw.done();
     t1.pos.y=yb+.03;t1.el.textContent=ATLAS.template("fizik.60")`${nf(q)}${wl>.6?ATLAS.t("fizik.61"):wl>.3?ATLAS.t("fizik.62"):ATLAS.t("fizik.63")}`;tg.el.textContent=GASP[thG].n;};}

  /* 4 · Hagen–Poiseuille */
  {const id='fizik-poiseuille',S_=mk(id,{t:[0,.45,0],d:2.3,th:.25,ph:1.25},ATLAS.t("fizik.64")),G=S_.G;
   const L2=.65,Rr=.085,yR=.66,yT=.26;
   put(G,new THREE.Mesh(cylG(Rr,Rr,2*L2,40,true),glass(0xE6F3F7,.16)),0,yR,0,0,0,Math.PI/2);
   const tt=put(G,new THREE.Mesh(cylG(1,1,2*L2,40,true),glass(0xE6F3F7,.16)),0,yT,0,0,0,Math.PI/2);
   [-L2,L2].forEach(x=>{put(G,new THREE.Mesh(new THREE.TorusGeometry(Rr,.006,8,40),MAT.dark),x,yR,0,0,Math.PI/2);});
   const ring=[-L2,L2].map(x=>put(G,new THREE.Mesh(new THREE.TorusGeometry(1,.07,8,40),MAT.dark),x,yT,0,0,Math.PI/2));
   [-.5,.5].forEach(x=>{put(G,new THREE.Mesh(new THREE.BoxGeometry(.04,yR,.04),MAT.metal),x,yR/2,-.12);});
   const lp=[];for(let i=0;i<=12;i++){const r=i/12;lp.push([r,1-r*r]);}
   const prof=[yR,yT].map(y=>{const gg=new THREE.Group();gg.rotation.z=-Math.PI/2;gg.position.set(-.3,y,0);G.add(gg);const m=lathe(lp,new THREE.MeshStandardMaterial({color:lin(0x2F6BFF),transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false}),32);m.userData.nopick=true;gg.add(m);return m;});
   const sws=[swarm(G,120,.008,0x2F6BFF),swarm(G,120,.008,0xF08A24)];
   sws.forEach(s=>{for(let i=0;i<s.n;i++){s.u[i]=rnd(-L2,L2);s.a[i]=rnd(0,6.283);s.b[i]=Math.sqrt(Math.random())*.92;}});
   const tR=tag(id,'',[0,yR+.15,0]),tT=tag(id,'',[0,yT-.17,0]);
   S_.upd=dt=>{const ID=val('pID'),Rt=Rr*ID/8,k=.55/(Rr*Rr);tt.scale.set(Rt,1,Rt);ring.forEach(r=>r.scale.set(Rt,Rt,Rt));
     [[sws[0],Rr,yR,prof[0]],[sws[1],Rt,yT,prof[1]]].forEach(([s,R,y,pm])=>{const vmax=k*R*R;pm.scale.set(R*.96,vmax*.5,R*.96);
       for(let i=0;i<s.n;i++){const r=s.b[i];let x=s.u[i]+vmax*(1-r*r)*dt;if(x>L2)x-=2*L2;s.u[i]=x;s.put(i,x,y+r*R*Math.cos(s.a[i]),r*R*Math.sin(s.a[i]));}s.done();});
     tR.el.textContent=ATLAS.t("fizik.65");tT.el.textContent=ATLAS.template("fizik.66")`${nf(ID)}${nf(Math.pow(ID/8,4),2)}${nf(Math.pow(8/ID,4),2)}`;};}

  /* 5 · Buhar basıncı ve vaporizatör */
  {const id='fizik-vapor',S_=mk(id,{t:[0,.45,0],d:2.6,th:.2,ph:1.2},ATLAS.t("fizik.67")),G=S_.G;
   const inC=CR([[-1,.62,0],[-.56,.62,0]]),byC=CR([[-.56,.62,0],[-.44,.86,0],[.44,.86,0],[.56,.62,0]]),chC=CR([[-.56,.62,0],[-.46,.45,0],[-.3,.3,0],[0,.26,0],[.3,.3,0],[.46,.45,0],[.56,.62,0]]),outC=CR([[.56,.62,0],[1,.62,0]]);
   [[inC,1],[byC,1],[outC,1],[chC,.5]].forEach(([c,o])=>put(G,new THREE.Mesh(new THREE.TubeGeometry(c,60,.03,12,false),glass(0xE6F3F7,.16*o))));
   [-.56,.56].forEach(x=>put(G,new THREE.Mesh(new THREE.SphereGeometry(.04,16,12),MAT.metal),x,.62,0));
   put(G,new THREE.Mesh(new THREE.BoxGeometry(.84,.4,.36),glass(0xE6F3F7,.12)),0,.24,0);
   const ce=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.84,.4,.36)),new THREE.LineBasicMaterial({color:0x5b6b75}));ce.position.set(0,.24,0);G.add(ce);
   put(G,new THREE.Mesh(new THREE.BoxGeometry(.9,.03,.42),MAT.dark),0,.025,0);
   const liq=put(G,new THREE.Mesh(new THREE.BoxGeometry(.82,.09,.34),new THREE.MeshStandardMaterial({color:lin(0xF0C21B),transparent:true,opacity:.6,roughness:.2,emissive:new THREE.Color(0),depthWrite:false})),0,.085,0);
   [-.24,-.08,.08,.24].forEach(x=>put(G,new THREE.Mesh(new THREE.PlaneGeometry(.02,.28),std(0x6E7A82,.9,0,{transparent:true,opacity:.5,side:THREE.DoubleSide})),x,.2,0,0,Math.PI/2));
   const heat=put(G,new THREE.Mesh(new THREE.TorusGeometry(.3,.012,8,40),new THREE.MeshBasicMaterial({color:0xFF4A2A,toneMapped:false})),0,.045,0,Math.PI/2);heat.userData.nopick=true;
   const AC={sevo:0xF0C21B,iso:0x9B59D0,hal:0xD0453A,des:0x2F7FE8};
   const by=swarm(G,90,.011,0xF4F6F7),ch=swarm(G,40,.011,0xF4F6F7),vp=swarm(G,70,.011,0xF0C21B),ow=swarm(G,90,.011,0xF4F6F7),ov=swarm(G,60,.011,0xF0C21B),iw=swarm(G,60,.011,0xF4F6F7);
   [by,ch,vp,ow,ov,iw].forEach(s=>{for(let i=0;i<s.n;i++){s.u[i]=Math.random();s.a[i]=rnd(-.02,.02);s.b[i]=rnd(-.02,.02);}});
   const pt=new THREE.Vector3();
   function run(s,c,cnt,spd,dt,u0=0,u1=1,f){for(let i=0;i<cnt;i++){let u=s.u[i]+spd*dt;if(u>u1||u<u0)u=u0+((u-u0)%(u1-u0)+(u1-u0))%(u1-u0);s.u[i]=u;c.getPointAt(clamp(u,0,1),pt);if(f)f(i,u,pt);s.put(i,pt.x,pt.y+s.a[i],pt.z+s.b[i]);}s.done(cnt);}
   const tB=tag(id,'',[0,.98,0]),tC=tag(id,'',[0,.5,.25]),tO=tag(id,'',[.85,.74,0]),tI=tag(id,'',[-.85,.74,0]);
   S_.upd=dt=>{const r=vapCalc(),col=AC[r.key]||0xF0C21B,sp=.12+r.F*.03;liq.material.color.copy(lin(col));vp.color(col);ov.color(col);
     heat.visible=r.des;liq.material.emissive.copy(r.des?lin(0x5A1A0A):new THREE.Color(0));
     run(iw,inC,60,sp*2,dt);
     run(by,byC,r.des?90:clamp(Math.round(90*r.By/r.F),10,90),sp,dt);
     run(ch,chC,r.des?0:clamp(Math.round(r.Fc/r.F*300),3,40),sp*.8,dt);
     run(vp,chC,clamp(Math.round(r.Fv/r.F*900),3,70),sp*.8,dt,.32,1,(i,u,p)=>{if(u<.45){p.y=.13+(p.y-.13)*(u-.32)/.13;}});
     run(ow,outC,90,sp*2,dt);run(ov,outC,clamp(Math.round(r.c*100*6),3,60),sp*2,dt);
     tI.el.textContent=ATLAS.template("fizik.68")`${nf(r.F)}`;tB.el.textContent=r.des?ATLAS.t("fizik.69"):ATLAS.template("fizik.70")`${nf(r.By,2)}`;
     tC.el.textContent=r.des?ATLAS.t("fizik.71"):ATLAS.template("fizik.72")`${Math.round(r.Fc*1000)}${Math.round(r.Fv*1000)}`;tO.el.textContent=ATLAS.template("fizik.73")`${nf(r.c*100)}`;};}

  /* 6 · Henry ve dağılım katsayısı */
  {const id='fizik-henry',S_=mk(id,{t:[0,.38,0],d:2.7,th:.12,ph:1.25},ATLAS.t("fizik.74")),G=S_.G;
   const D=[[ATLAS.t("fizik.75"),.42,0x5B9BFF],['N₂O',.47,0x93A4AF],[ATLAS.t("fizik.76"),.65,0xF2C531],[ATLAS.t("fizik.77"),1.4,0xB184E8],[ATLAS.t("fizik.78"),2.4,0xF07A6A]],xs=[-.84,-.42,0,.42,.84];
   const cups=D.map(([n,l,c],k)=>{const x=xs[k];put(G,new THREE.Mesh(cylG(.14,.14,.6,32,true),glass(0xE6F3F7,.15)),x,.32,0);put(G,new THREE.Mesh(cylG(.145,.145,.02,32),MAT.metal),x,.63,0);put(G,new THREE.Mesh(cylG(.15,.15,.03,32),MAT.dark),x,.015,0);
     put(G,new THREE.Mesh(cylG(.135,.135,.26,32),std(0xB3122E,.4,0,{transparent:true,opacity:.45,depthWrite:false})),x,.16,0);
     const gs_=swarm(G,30,.009,c),ls=swarm(G,80,.009,c);seedCyl(gs_,.12,.32,.6);seedCyl(ls,.12,.04,.27);tag(id,`${n} · λ ${nf(l,2)}`,[x,.76,0]);return{x,l,gs_,ls};});
   S_.upd=dt=>{cups.forEach(c=>{for(let i=0;i<30;i++)bounceCyl(c.gs_,i,c.x,0,.12,.31,.6,.22,dt);c.gs_.done();const n=Math.min(80,Math.round(30*c.l));for(let i=0;i<n;i++)bounceCyl(c.ls,i,c.x,0,.12,.035,.275,.06,dt);c.ls.done(n);});};}

  /* 7 · Laplace */
  let lapSurf=false,lapR=[.13,.21],lapHold=0;const lapReset=()=>{lapR=[.13,.21];lapHold=0;};
  {const id='fizik-laplace',S_=mk(id,{t:[0,.45,0],d:2.1,th:.15,ph:1.3},ATLAS.t("fizik.79"),
     ATLAS.template("fizik.80")``),G=S_.G;
   put(G,new THREE.Mesh(cylG(.022,.022,.84,16),glass(0xF5D3D3,.4)),0,.45,0,0,0,Math.PI/2);
   put(G,new THREE.Mesh(cylG(.022,.022,.35,16),glass(0xF5D3D3,.4)),0,.27,0);put(G,new THREE.Mesh(cylG(.03,.03,.05,16),MAT.metal),0,.45,0);
   const sm=std(0xF09A9A,.45,0,{transparent:true,opacity:.6}),s1=put(G,new THREE.Mesh(new THREE.SphereGeometry(1,40,24),sm),-.42,.45,0),s2=put(G,new THREE.Mesh(new THREE.SphereGeometry(1,40,24),sm.clone()),.42,.45,0);
   const fl=swarm(G,14,.008,0x2F6BFF);for(let i=0;i<14;i++)fl.u[i]=i/14;
   const t1=tag(id,'',[-.42,.78,0]),t2=tag(id,'',[.42,.82,0]);
   S_.upd=(dt,t)=>{const Vt=lapR[0]**3+lapR[1]**3;let q=0;
     if(!lapSurf){if(lapR[0]>.03){q=.0011*(1/lapR[0]-1/lapR[1]);lapR[0]=Math.cbrt(Math.max(.028**3,lapR[0]**3-q*dt));lapR[1]=Math.cbrt(Vt-lapR[0]**3);}else{lapHold+=dt;if(lapHold>2.5)lapReset();}}
     const br=lapSurf?1+.03*Math.sin(t*1.6):1,r1=lapR[0]*br,r2=lapR[1]*br;s1.scale.setScalar(r1);s2.scale.setScalar(r2);
     const P1=lapSurf?8.5:1.3/r1,P2=lapSurf?8.5:1.3/r2;
     for(let i=0;i<14;i++){fl.u[i]=(fl.u[i]+q*900*dt)%1;fl.put(i,-.42+r1+(.84-r1-r2)*fl.u[i],.45,0);}fl.done(q>0?14:0);
     t1.pos.y=.45+r1+.07;t2.pos.y=.45+r2+.07;t1.el.textContent=ATLAS.template("fizik.81")`${nf(P1,1)}`;t2.el.textContent=ATLAS.template("fizik.82")`${nf(P2,1)}`;};}

  /* 8 · Hareket denklemi */
  {const id='fizik-motion',S_=mk(id,{t:[0,.42,0],d:2.5,th:.2,ph:1.25},ATLAS.t("fizik.83"),ATLAS.template("fizik.84")``),G=S_.G;
   put(G,rbox(.3,.36,.3,.02,MAT.shell),-.85,.2,0);put(G,new THREE.Mesh(new THREE.PlaneGeometry(.22,.05),new THREE.MeshStandardMaterial({map:labelTex(ATLAS.t("fizik.85"),'#1B2227','#CFE3EE'),roughness:.5})),-.85,.3,.151);
   put(G,new THREE.Mesh(cylG(.035,.035,.3,20,true),glass(0xE6F3F7,.25)),-.55,.3,0,0,0,Math.PI/2);
   put(G,new THREE.Mesh(cylG(.018,.018,.3,20),std(0xF08A24,.4,0,{transparent:true,opacity:.75})),-.25,.3,0,0,0,Math.PI/2);
   put(G,new THREE.Mesh(cylG(.035,.035,.2,20,true),glass(0xE6F3F7,.25)),.0,.3,0,0,0,Math.PI/2);
   const lung=put(G,new THREE.Mesh(new THREE.SphereGeometry(1,40,24),std(0xE48A8A,.5,0,{transparent:true,opacity:.7})),.32,.32,0);
   const sw=swarm(G,40,.009,0x2F6BFF);for(let i=0;i<40;i++)sw.u[i]=rnd(-.7,.1);
   const bx=.85,gh=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.16,.8,.16)),new THREE.LineDashedMaterial({color:0x5b6b75,dashSize:.02,gapSize:.015}));gh.computeLineDistances();gh.position.set(bx,.44,0);G.add(gh);
   const bars=[0x8A969E,0x27A55B,0xF08A24].map(c=>put(G,new THREE.Mesh(new THREE.BoxGeometry(1,1,1),std(c,.45)),bx,0,0));
   const tP=tag(id,'',[bx,.92,0]),tE=tag(id,'',[bx+.22,.3,0]),tR=tag(id,'',[bx+.22,.5,0]),tL=tag(id,'',[.32,.68,0]),tPe=tag(id,'',[bx+.22,.08,0]);
   S_.upd=dt=>{const c=LUNG.cur,P=LUNG.P,C=P.C/1000,Pel=c.V/C,Pr=P.R*c.F,k=.02;
     lung.scale.setScalar(.19*Math.cbrt(Math.max(.3,(1.5+c.V)/1.5)));
     const hs=[P.peep*k,Math.max(0,Pel)*k,Math.max(0,Pr)*k];let y=.04;hs.forEach((h,j)=>{const hh=Math.max(.002,h);bars[j].scale.set(.14,hh,.14);bars[j].position.y=y+hh/2;y+=h;});
     for(let i=0;i<40;i++){let x=sw.u[i]+c.F*dt*1.4;if(x>.12)x-=.82;if(x<-.7)x+=.82;sw.u[i]=x;sw.put(i,x,.3+.012*Math.sin(i*1.7),.012*Math.cos(i*2.3));}sw.done();
     tP.el.textContent=`Paw ${nf(c.P,1)} cmH₂O · VCV`;tPe.el.textContent=`PEEP ${P.peep}`;tE.el.textContent=`V/C ${nf(Pel,1)}`;tR.el.textContent=`R·V̇ ${nf(Pr,1)}`;tL.el.textContent=`V ${Math.round(c.V*1000)} mL`;
     tE.pos.y=.04+hs[0]+hs[1]/2;tR.pos.y=.04+hs[0]+hs[1]+Math.max(hs[2],.02)/2;};}

  /* 9 · Beer–Lambert */
  {const id='fizik-beer',S_=mk(id,{t:[0,.33,0],d:1.9,th:.5,ph:1.25},ATLAS.t("fizik.86"),`<label class="mc-row" style="margin-top:10px">SpO₂ <input type="range" id="beerSp" min="70" max="100" value="98" style="max-width:220px"> <output id="beerSpO" class="mono">98</output></label>`),G=S_.G;
   const fg=new THREE.Group();fg.position.set(0,.33,0);G.add(fg);
   put(fg,new THREE.Mesh(cylG(.16,.16,.8,40),std(0xE8B9A0,.6,0,{transparent:true,opacity:.42,depthWrite:false})),0,0,0,0,0,Math.PI/2);
   put(fg,new THREE.Mesh(new THREE.SphereGeometry(.16,32,16,0,Math.PI*2,0,Math.PI/2),std(0xE8B9A0,.6,0,{transparent:true,opacity:.42,depthWrite:false})),.4,0,0,0,0,-Math.PI/2);
   const art=put(fg,new THREE.Mesh(cylG(.03,.03,.8,20),std(0xD0202E,.4)),0,.02,.05,0,0,Math.PI/2);put(fg,new THREE.Mesh(cylG(.042,.042,.8,20),std(0x2A3F8F,.5)),0,-.03,-.07,0,0,Math.PI/2);
   put(G,rbox(.34,.07,.16,.015,MAT.dark),0,.6,0);put(G,rbox(.34,.05,.16,.015,MAT.dark),0,.035,0);put(G,new THREE.Mesh(new THREE.BoxGeometry(.1,.006,.08),std(0x3A4F7A,.3,.4)),0,.063,0);
   const mkB=(x,c)=>[[.525,.07],[.33,.32],[.115,.11]].map(([y,h])=>{const m=put(G,new THREE.Mesh(cylG(.017,.017,h,16,true),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.6,depthWrite:false,toneMapped:false})),x,y,0);m.userData.nopick=true;return m;});
   const bR=mkB(-.07,0xFF3030),bI=mkB(.07,0xA35CFF);
   [[-.07,0xFF3030],[.07,0xA35CFF]].forEach(([x,c])=>put(G,new THREE.Mesh(new THREE.SphereGeometry(.014,12,8),new THREE.MeshBasicMaterial({color:c,toneMapped:false})),x,.565,0));
   tag(id,'660 nm',[-.2,.62,0]);tag(id,ATLAS.t("fizik.87"),[.3,.62,0]);const tR=tag(id,'',[0,-.04,0]);tag(id,ATLAS.t("fizik.88"),[-.45,.47,.05]);tag(id,ATLAS.t("fizik.89"),[.42,.2,-.07]);
   S_.upd=()=>{const st={probeOff:false,spo2:PULSE.spo2},ph=PULSE.ph,q=(ph-.28+1)%1,pu=Math.exp(-Math.pow((q-.14)/.1,2));art.scale.set(1+.6*pu,1,1+.6*pu);
     const sp=st.probeOff?98:st.spo2,R=clamp((110-sp)/25,.3,2.5),kI=.35,kR=R*kI;
     const tr=Math.exp(-(.5+kR*pu*1.5)),ti=Math.exp(-(.5+kI*pu*1.5));bR[1].material.opacity=.4*(.6+tr*.4);bR[2].material.opacity=.75*tr;bI[1].material.opacity=.4*(.6+ti*.4);bI[2].material.opacity=.75*ti;
     tR.el.textContent=ATLAS.template("fizik.90")`${nf(R,2)}${Math.round(sp)}`;};}

  /* 10 · Bernoulli ve Venturi */
  let vq=2;
  {const id='fizik-venturi',S_=mk(id,{t:[0,.5,0],d:2.3,th:.25,ph:1.3},ATLAS.t("fizik.91"),
     ATLAS.template("fizik.92")``),G=S_.G;
   const rX=x=>{const a=Math.min(1,Math.abs(x)/.45),s=a*a*(3-2*a);return .05+.07*s;},yc=.5;
   const pts=[];for(let i=0;i<=60;i++){const x=-.85+1.7*i/60;pts.push([rX(x)+.006,x]);}
   const vg=new THREE.Group();vg.rotation.z=-Math.PI/2;vg.position.y=yc;G.add(vg);vg.add(lathe(pts,glass(0xE6F3F7,.18),40));
   const man=[-.62,0].map(x=>{put(G,new THREE.Mesh(cylG(.018,.018,.42,14,true),glass(0xE6F3F7,.25)),x,yc+rX(x)+.21,0);return put(G,new THREE.Mesh(cylG(.013,.013,1,14),std(0x2F7FE8,.3,0,{transparent:true,opacity:.85})),x,0,0);});
   put(G,new THREE.Mesh(cylG(.022,.022,.36,14,true),glass(0xE6F3F7,.25)),0,yc-.05-.18,0);
   [-.85,.85].forEach(x=>put(G,new THREE.Mesh(new THREE.TorusGeometry(.126,.007,8,40),MAT.dark),x,yc,0,0,Math.PI/2));
   [-.6,.6].forEach(x=>put(G,new THREE.Mesh(new THREE.BoxGeometry(.04,yc-.12,.04),MAT.metal),x,(yc-.12)/2,-.1));
   const mw=swarm(G,160,.008,0x2F6BFF),en=swarm(G,40,.008,0x3CCB7F);
   for(let i=0;i<160;i++){mw.u[i]=rnd(-.85,.85);mw.a[i]=rnd(0,6.283);mw.b[i]=Math.sqrt(Math.random())*.85;}
   for(let i=0;i<40;i++){en.u[i]=Math.random()*1.6;en.a[i]=rnd(0,6.283);en.b[i]=Math.random()*.6;}
   const t1=tag(id,'',[-.62,yc+.6,0]),t2=tag(id,'',[0,yc+.62,0]);tag(id,ATLAS.t("fizik.93"),[.22,.1,0]);
   S_.upd=dt=>{const v0=.18*vq;
     for(let i=0;i<160;i++){let x=mw.u[i]+v0*(.12/rX(mw.u[i]))**2*dt*.35;if(x>.85)x-=1.7;mw.u[i]=x;const r=mw.b[i]*rX(x);mw.put(i,x,yc+r*Math.cos(mw.a[i]),r*Math.sin(mw.a[i]));}mw.done();
     const ne=10+vq*10;for(let i=0;i<ne;i++){let u=en.u[i]+dt*(.25+.2*vq);if(u>1.6)u=0;en.u[i]=u;let x,y,z;
       if(u<.4){x=0;y=.06+u/.4*(yc-.06);z=0;}else{x=(u-.4)/1.2*.85;const r=en.b[i]*rX(x);y=yc+r*Math.cos(en.a[i]);z=r*Math.sin(en.a[i]);}en.put(i,x,y,z);}en.done(ne);
     const hIn=.32,hTh=clamp(.32-.028*vq*vq,.04,.32);[[man[0],-.62,hIn],[man[1],0,hTh]].forEach(([m,x,h])=>{m.scale.y=h;m.position.y=yc+rX(x)+h/2;});
     t1.pos.y=yc+.12+hIn+.08;t2.pos.y=yc+.05+hTh+.08;t1.el.textContent=ATLAS.t("fizik.94");t2.el.textContent=ATLAS.template("fizik.95")`${nf((.12/.05)**2,1)}`;};}

  // sahne yönetimi
  let capAcc=1;
  L.tick.push((dt,t)=>{const s=LS[LCUR];if(s&&s.upd)s.upd(dt,t);});
  LABAPI={L,LS,
    setScene(id){if(!LS[id]||LCUR===id)return false;if(LCUR)LS[LCUR].G.visible=false;LCUR=id;L.labScene=id;const s=LS[id];s.G.visible=true;
      L.home={target:V3(s.view.t),dist:s.view.d,theta:s.view.th,phi:s.view.ph};L.focus(L.home.target,s.view.d,s.view.th,s.view.ph);return true;},
    cur:()=>LCUR,
    ctl(e){const b=e.target.closest('button');if(!b)return;if(b.dataset.lap==='surf'){lapSurf=!lapSurf;b.setAttribute('aria-pressed',lapSurf);lapReset();}else if(b.dataset.lap==='reset')lapReset();
      else if(b.dataset.vq){vq=+b.dataset.vq;b.parentNode.querySelectorAll('[data-vq]').forEach(x=>x.setAttribute('aria-pressed',x===b));}}};
  }catch(e){console.error('lab',e);}

}
/* ───────────── FİZİK LABORATUVARI: SAHNE SEÇİMİ ───────────── */
const lawCards=$$('.law'),labStage=$('#stageLab');
function labCap(id){const card=$('#'+id),s=LABAPI&&LABAPI.LS[id],i=lawCards.findIndex(c=>c.id===id)+1;
  $('#labCap').innerHTML=ATLAS.template("fizik.96")`${String(i).padStart(2,'0')}${lawCards.length}${card?card.querySelector('h3').textContent:''}${s?s.info:ATLAS.t("fizik.97")}${s&&s.ctl?s.ctl:''}`;}
function labSet(id){document.dispatchEvent(new CustomEvent('atlas:module',{detail:{kind:'law',id}}));if(!LABAPI){labCap(id);return;}
  if(!LABAPI.setScene(id))return;
  lawCards.forEach(c=>c.classList.toggle('active-law',c.id===id));labCap(id);
  document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'law',id,score:null,ok:false,stage:1}}));
  if(fsCur===labStage&&labStage._moved){const side=labStage.querySelector('.fs-side'),k=labStage._moved.findIndex(r=>r.el.classList.contains('law'));
    if(k>=0){const r=labStage._moved[k];r.parent.insertBefore(r.el,r.next&&r.next.parentNode===r.parent?r.next:null);labStage._moved.splice(k,1);}
    const el=$('#'+id);if(el){labStage._moved.push({el,parent:el.parentNode,next:el.nextSibling});side.appendChild(el);}}}
$('#labCap').addEventListener('click',e=>LABAPI&&LABAPI.ctl(e));
/* One law at a time, like the full-screen side panel: the law names (#lawIndex) select which
   law is shown and which 3D scene plays; the page does not scroll. Other laws are hidden
   (CSS: .lab .law:not(.law-open)). Each card ends with previous/next buttons so a phone
   reader need not scroll back up to the list. In full screen labSet() moves the shown card
   into the stage's side panel, as before. */
const lawLinks=$$('#lawIndex a[href^="#fizik-"]');
function openLaw(id,reveal){const card=$('#'+id);if(!card)return;
  lawCards.forEach(c=>c.classList.toggle('law-open',c.id===id));
  lawLinks.forEach(a=>{if(a.getAttribute('href')==='#'+id){a.setAttribute('aria-current','true');ATLAS_STRIP(a);}else a.removeAttribute('aria-current');});
  labSet(id);
  if(reveal&&!fsCur){const r=card.getBoundingClientRect();if(r.top<0||reveal==='always')card.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}}
lawCards.forEach((c,i)=>{const nav=document.createElement('nav');nav.className='law-pager';nav.setAttribute('aria-label',$('#lawIndex').getAttribute('aria-label')||'');
  for(const [j,cls,arrow] of [[i-1,'prev','← '],[i+1,'next',' →']]){const t=lawCards[j];if(!t)continue;const b=document.createElement('button');b.type='button';b.className='law-pager-'+cls;
    const name=(lawLinks.find(a=>a.getAttribute('href')==='#'+t.id)||{}).textContent||t.querySelector('h3').textContent;b.textContent=cls==='prev'?arrow+name:name+arrow;
    b.addEventListener('click',()=>{openLaw(t.id,true);history.replaceState(null,'','#'+t.id);});nav.appendChild(b);}
  c.appendChild(nav);});
$('#lawIndex').addEventListener('click',e=>{const a=e.target.closest('a[href^="#fizik-"]');if(!a)return;const id=a.getAttribute('href').slice(1);e.preventDefault();openLaw(id,false);history.replaceState(null,'','#'+id);});
openLaw('fizik-boyle',false);
if(!LABAPI)failStage(labStage,ATLAS.t("fizik.98"));

$('#labCap').addEventListener('input',e=>{const t=e.target;if(t.id==='beerSp'){PULSE.spo2=+t.value;$('#beerSpO').textContent=t.value;}if(t.id==='lungC'){LUNG.P.C=+t.value;$('#lungCO').textContent=t.value;}if(t.id==='lungR'){LUNG.P.R=+t.value;$('#lungRO').textContent=t.value;}});
if(/^#fizik-/.test(location.hash)&&$(location.hash))setTimeout(()=>openLaw(location.hash.slice(1),'always'),300);
addEventListener('hashchange',()=>{if(/^#fizik-/.test(location.hash)&&$(location.hash))openLaw(location.hash.slice(1),'always');});
if(typeof PROGRESS!=='undefined'){PROGRESS.setTotal('law',lawCards.length);PROGRESS.setLabels('law',Object.fromEntries(lawCards.map(c=>[c.id,c.querySelector('h3').textContent])));PROGRESS.setTotal('pk',1);PROGRESS.setLabels('pk',{farmakokinetik:ATLAS.t("fizik.99")});}
})();
