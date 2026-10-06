(function(){
'use strict';
/* ───────────── EKİPMAN ATÖLYESİ ───────────── */
const MODELS=[
 {id:'laringoskop',n:ATLAS.t("ekipman.1"),c:ATLAS.t("ekipman.2")},
 {id:'video',n:ATLAS.t("ekipman.3"),c:ATLAS.t("ekipman.4")},
 {id:'ett',n:ATLAS.t("ekipman.5"),c:ATLAS.t("ekipman.6")},
 {id:'lma',n:ATLAS.t("ekipman.7"),c:ATLAS.t("ekipman.8")},
 {id:'baska',n:ATLAS.ui('eq.baska.name'),c:ATLAS.t("ekipman.8")},
 {id:'maplesonD',n:'Mapleson D (Bain)',c:ATLAS.t("ekipman.9")},
 {id:'maplesonF',n:'Mapleson F (Jackson-Rees)',c:ATLAS.t("ekipman.10")},
 {id:'acik',n:ATLAS.t("ekipman.11"),c:ATLAS.t("ekipman.12")},
 {id:'kapali',n:ATLAS.t("ekipman.13"),c:ATLAS.t("ekipman.14")}];
const INFO={
 laringoskop:{s:ATLAS.t("ekipman.15"),
   p:[[ATLAS.t("ekipman.16"),ATLAS.t("ekipman.17")],[ATLAS.t("ekipman.18"),ATLAS.t("ekipman.19")],[ATLAS.t("ekipman.20"),ATLAS.t("ekipman.21")],[ATLAS.t("ekipman.22"),ATLAS.t("ekipman.23")],[ATLAS.t("ekipman.24"),ATLAS.t("ekipman.25")],[ATLAS.t("ekipman.26"),ATLAS.t("ekipman.27")]],
   f:[[ATLAS.t("ekipman.28"),'Cormack–Lehane 1–4'],[ATLAS.t("ekipman.29"),'Mac 3–4'],[ATLAS.t("ekipman.30"),ATLAS.t("ekipman.31")]]},
 video:{s:ATLAS.t("ekipman.32"),
   p:[[ATLAS.t("ekipman.33"),ATLAS.t("ekipman.34")],[ATLAS.t("ekipman.35"),ATLAS.t("ekipman.36")],[ATLAS.t("ekipman.37"),ATLAS.t("ekipman.38")],[ATLAS.t("ekipman.39"),ATLAS.t("ekipman.40")],[ATLAS.t("ekipman.41"),ATLAS.t("ekipman.42")]],
   f:[[ATLAS.t("ekipman.43"),ATLAS.t("ekipman.44")],[ATLAS.t("ekipman.45"),ATLAS.t("ekipman.46")],[ATLAS.t("ekipman.47"),ATLAS.t("ekipman.48")]]},
 ett:{s:ATLAS.t("ekipman.49"),
   p:[[ATLAS.t("ekipman.50"),ATLAS.t("ekipman.51")],[ATLAS.t("ekipman.52"),ATLAS.t("ekipman.53")],[ATLAS.t("ekipman.54"),ATLAS.t("ekipman.55")],[ATLAS.t("ekipman.56"),ATLAS.t("ekipman.57")],[ATLAS.t("ekipman.58"),ATLAS.t("ekipman.59")],[ATLAS.t("ekipman.60"),ATLAS.t("ekipman.61")]],
   f:[[ATLAS.t("ekipman.62"),'20–30 cmH₂O'],[ATLAS.t("ekipman.63"),'R ∝ 1/r⁴ (laminar)'],[ATLAS.t("ekipman.64"),ATLAS.t("ekipman.65")]]},
 lma:{s:ATLAS.t("ekipman.66"),
   p:[[ATLAS.t("ekipman.67"),ATLAS.t("ekipman.68")],[ATLAS.t("ekipman.69"),ATLAS.t("ekipman.70")],[ATLAS.t("ekipman.71"),ATLAS.t("ekipman.72")],[ATLAS.t("ekipman.73"),ATLAS.t("ekipman.74")],[ATLAS.t("ekipman.75"),ATLAS.t("ekipman.76")],[ATLAS.t("ekipman.77"),ATLAS.t("ekipman.78")],[ATLAS.t("ekipman.79"),ATLAS.t("ekipman.80")]],
   f:[[ATLAS.t("ekipman.81"),ATLAS.t("ekipman.82")],[ATLAS.t("ekipman.83"),'≤ 60 cmH₂O'],[ATLAS.t("ekipman.84"),ATLAS.t("ekipman.85")]]},
 /* 3rd-generation SGA (Baska Mask type). Not in ATLAS_CURRICULUM: the 79-item curriculum is fixed,
    so this model is viewable but not counted in progress. Texts: ui.eq.baska.* */
 baska:(()=>{const B=k=>ATLAS.ui('eq.baska.'+k);return{s:B('sum'),p:[1,2,3,4,5,6,7,8].map(i=>[B('p'+i+'n'),B('p'+i+'d')]),f:[1,2,3].map(i=>[B('f'+i+'k'),B('f'+i+'v')])};})(),
 maplesonD:{s:ATLAS.t("ekipman.86"),
   p:[[ATLAS.t("ekipman.87"),ATLAS.t("ekipman.88")],[ATLAS.t("ekipman.89"),ATLAS.t("ekipman.90")],[ATLAS.t("ekipman.91"),ATLAS.t("ekipman.92")],[ATLAS.t("ekipman.93"),ATLAS.t("ekipman.94")],[ATLAS.t("ekipman.95"),ATLAS.t("ekipman.96")],[ATLAS.t("ekipman.97"),ATLAS.t("ekipman.98")]],
   f:[[ATLAS.t("ekipman.99"),ATLAS.t("ekipman.100")],[ATLAS.t("ekipman.101"),ATLAS.t("ekipman.102")],[ATLAS.t("ekipman.103"),ATLAS.t("ekipman.104")]]},
 maplesonF:{s:ATLAS.t("ekipman.105"),
   p:[[ATLAS.t("ekipman.106"),ATLAS.t("ekipman.107")],[ATLAS.t("ekipman.108"),ATLAS.t("ekipman.109")],[ATLAS.t("ekipman.110"),ATLAS.t("ekipman.111")],[ATLAS.t("ekipman.112"),ATLAS.t("ekipman.113")]],
   f:[[ATLAS.t("ekipman.114"),ATLAS.t("ekipman.115")],[ATLAS.t("ekipman.116"),ATLAS.t("ekipman.117")],[ATLAS.t("ekipman.118"),ATLAS.t("ekipman.119")]]},
 acik:{s:ATLAS.t("ekipman.120"),
   p:[[ATLAS.t("ekipman.121"),ATLAS.t("ekipman.122")],[ATLAS.t("ekipman.123"),ATLAS.t("ekipman.124")],[ATLAS.t("ekipman.125"),ATLAS.t("ekipman.126")],[ATLAS.t("ekipman.127"),ATLAS.t("ekipman.128")],[ATLAS.t("ekipman.129"),ATLAS.t("ekipman.130")]],
   f:[[ATLAS.t("ekipman.131"),ATLAS.t("ekipman.132")],[ATLAS.t("ekipman.133"),ATLAS.t("ekipman.134")],[ATLAS.t("ekipman.135"),ATLAS.t("ekipman.136")]]},
 kapali:{s:ATLAS.t("ekipman.137"),
   p:[[ATLAS.t("ekipman.138"),ATLAS.t("ekipman.139")],[ATLAS.t("ekipman.140"),ATLAS.t("ekipman.141")],[ATLAS.t("ekipman.142"),ATLAS.t("ekipman.143")],[ATLAS.t("ekipman.144"),ATLAS.t("ekipman.145")],[ATLAS.t("ekipman.146"),ATLAS.t("ekipman.147")],[ATLAS.t("ekipman.148"),ATLAS.t("ekipman.149")]],
   f:[[ATLAS.t("ekipman.150"),'≈ +5 cmH₂O'],[ATLAS.t("ekipman.151"),ATLAS.t("ekipman.152")],[ATLAS.t("ekipman.153"),ATLAS.t("ekipman.154")]]}
};
const $s=id=>document.getElementById(id);
const st={age:6,sex:'m',cuff:25,wt:25,mode:'spont',mvk:100,vac:2};
try{const v=JSON.parse(localStorage.getItem('anm-eq')||'null');if(v)Object.assign(st,v);}catch(e){}
const save=()=>{try{localStorage.setItem('anm-eq',JSON.stringify(st));}catch(e){}};
const r5=x=>Math.round(x*2)/2;
function ett(){const a=st.age;let u,c,d,note='';
  if(a<1){u=ATLAS.t("ekipman.155");c=ATLAS.t("ekipman.156");d=ATLAS.t("ekipman.157");note=ATLAS.t("ekipman.158");}
  else if(a<2){u=ATLAS.t("ekipman.159");c=ATLAS.t("ekipman.160");d=ATLAS.t("ekipman.161");}
  else if(a<=10){u=nf(r5(a/4+4));c=nf(r5(a/4+3.5));d='≈ '+nf(a/2+12,1)+ATLAS.t("ekipman.162");note=ATLAS.t("ekipman.163");}else if(a<14){u=nf(r5(a/4+4));c=nf(r5(a/4+3.5));d='≈ '+nf(a/2+12,1)+ATLAS.t("ekipman.164");note=ATLAS.t("ekipman.165");}
  else{const m=st.sex==='m';u='—';c=m?ATLAS.t("ekipman.166"):ATLAS.t("ekipman.167");d=m?'≈ 23':'≈ 21';note=ATLAS.t("ekipman.168");}
  return{u,c,d,note};}
function lmaSize(w){return w<5?'1':w<10?ATLAS.t("ekipman.169"):w<20?'2':w<30?ATLAS.t("ekipman.170"):w<50?'3':w<70?'4':'5';}
function cuffZone(p){return p<20?['warn',ATLAS.t("ekipman.171")]:p<=30?['ok',ATLAS.t("ekipman.172")]:['crit',ATLAS.t("ekipman.173")];}
function calcHTML(id){
  const seg=(name,opts,cur)=>`<div class="seg" role="group" style="margin-top:8px">${opts.map(([v,l])=>`<button type="button" data-${name}="${v}" aria-pressed="${v===cur}">${l}</button>`).join('')}</div>`;
  const row=(id,l,min,max,step,val,u)=>`<div class="ctl-row"><label for="${id}">${l}</label><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><output id="${id}O">${nf(val,step<1?1:0)}</output><span class="u">${u}</span></div>`;
  if(id==='laringoskop'||id==='video'||id==='ett'){const e=ett();
    let h=ATLAS.template("ekipman.174")`${row('eqAge',ATLAS.t("ekipman.175"),0,18,.5,st.age,ATLAS.t("ekipman.176"))}${st.age>=14?seg('sex',[['m',ATLAS.t("ekipman.177")],['f',ATLAS.t("ekipman.178")]],st.sex):''}${e.u}${e.c}${e.d}${e.note}`;
    if(id==='ett'){const z=cuffZone(st.cuff);h+=ATLAS.template("ekipman.179")`${row('eqCuff',ATLAS.t("ekipman.180"),0,60,1,st.cuff,'cmH₂O')}${z[0]==='ok'?'':z[0]}${z[1]}`;}
    return h;}
  if(id==='lma')return ATLAS.template("ekipman.181")`${row('eqWt',ATLAS.t("ekipman.182"),2,120,1,st.wt,'kg')}${lmaSize(st.wt)}${[['1','< 5 kg'],[ATLAS.t("ekipman.183"),'5–10'],['2','10–20'],[ATLAS.t("ekipman.184"),'20–30'],['3','30–50'],['4','50–70'],['5','≥ 70']].map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}`;
  if(id==='baska'){const B=k=>ATLAS.ui('eq.baska.'+k),w=st.wt,sz=w<30?'—':w<50?'3':w<70?'4':w<100?'5':'6';
    return `<h4>${B('calcTitle')}</h4>${row('eqWt',ATLAS.t("ekipman.182"),2,150,1,w,'kg')}<div class="wout" style="margin-top:10px"><div class="stat"><div class="k">${B('suggested')}</div><div class="v">${sz}</div></div><div class="stat"><div class="k">${B('cuff')}</div><div class="v" style="font-size:16px">${B('cuffVal')}</div></div><div class="stat"><div class="k">${B('seal')}</div><div class="v">≈ 31<small>cmH₂O</small></div></div></div>
    <table class="ptable" style="margin-top:10px"><thead><tr><th>${B('size')}</th><th>${B('weight')}</th></tr></thead><tbody>${[['3','30–50'],['4','50–70'],['5','70–100'],['6','> 100']].map(([a,b])=>`<tr><td>${a}</td><td>${b} kg</td></tr>`).join('')}</tbody></table>
    <p class="muted" style="font-size:13.5px;margin-top:8px">${B('note')}</p>`;}
  if(id==='maplesonD'||id==='maplesonF'){const w=st.wt,mv=w*st.mvk/1000,dLo=st.mode==='spont'?150:70,dHi=st.mode==='spont'?200:100;
    return ATLAS.template("ekipman.185")`${row('eqWt',ATLAS.t("ekipman.186"),3,100,1,w,'kg')}${row('eqMv',ATLAS.t("ekipman.187"),60,160,5,st.mvk,ATLAS.t("ekipman.188"))}${seg('mode',[['spont',ATLAS.t("ekipman.189")],['ctrl',ATLAS.t("ekipman.190")]],st.mode)}${nf(mv,1)}${nf(w*dLo/1000,1)}${nf(w*dHi/1000,1)}${st.mode==='spont'?(mv*2>=3?nf(mv*2,1)+'–'+nf(mv*3,1):(mv*3>3?nf(3,1)+'–'+nf(mv*3,1):'≥ '+nf(3,1))):'≈ '+nf(1+w*.1,1)}`;}
  const lim=ATLAS.template("ekipman.191")``;
  const vs=[ATLAS.t("ekipman.192"),ATLAS.t("ekipman.193"),ATLAS.t("ekipman.194")];
  return ATLAS.template("ekipman.195")`${seg('vac',[[1,vs[0]],[2,vs[1]],[3,vs[2]]],st.vac)}${lim}`;
}
const vacTxt=(id)=>id==='acik'?[ATLAS.t("ekipman.196"),ATLAS.t("ekipman.197"),ATLAS.t("ekipman.198")][st.vac-1]
  :[ATLAS.t("ekipman.199"),ATLAS.t("ekipman.200"),ATLAS.t("ekipman.201")][st.vac-1];
function renderInfo(id){const m=MODELS.find(x=>x.id===id),I=INFO[id],i=MODELS.indexOf(m)+1;
  $s('eqInfo').innerHTML=`<span class="info-num">${m.c.toLocaleUpperCase(ATLAS.t("ekipman.202"))} · ${String(i).padStart(2,'0')} / ${MODELS.length}</span><h3 style="margin:8px 0 8px">${m.n}</h3><p class="sum">${I.s}</p>
    <dl class="facts">${I.f.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>
    <ol class="eq-parts">${I.p.map(([a,b])=>`<li><b>${a}.</b> ${b}</li>`).join('')}</ol>`;
  $s('eqCalc').innerHTML=calcHTML(id);const t=$s('eqVacTxt');if(t)t.textContent=vacTxt(id);}
let cur=null;const seen=new Set();
$s('eqTabs').innerHTML=MODELS.map(m=>`<button type="button" data-m="${m.id}" aria-pressed="false">${m.n}</button>`).join('');
$s('eqCalc').addEventListener('input',e=>{const t=e.target,v=+t.value;if(t.id==='eqAge')st.age=v;if(t.id==='eqCuff')st.cuff=v;if(t.id==='eqWt')st.wt=v;if(t.id==='eqMv')st.mvk=v;save();
  const keep=t.id;$s('eqCalc').innerHTML=calcHTML(cur);const n=$s(keep);if(n)n.focus();const tx=$s('eqVacTxt');if(tx)tx.textContent=vacTxt(cur);});
$s('eqCalc').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.sex)st.sex=b.dataset.sex;if(b.dataset.mode)st.mode=b.dataset.mode;if(b.dataset.vac)st.vac=+b.dataset.vac;save();$s('eqCalc').innerHTML=calcHTML(cur);const tx=$s('eqVacTxt');if(tx)tx.textContent=vacTxt(cur);});

/* ───────────── 3B ───────────── */
let API=null;
if(K3){try{
  const {lin,std,glass,MAT,rbox,put,cylG,corrugated,canvasTex,lathe,Viewer,labelTex}=K3;
  const V=new Viewer($s('stageEq'),{target:[0,.45,0],dist:2.4,theta:.4,phi:1.2,minD:.5,maxD:5,fov:30,shadow:1.3,groundR:1.7,panLim:1,fitAspect:1.3});
  const V3=a=>new THREE.Vector3(...a),CR=p=>new THREE.CatmullRomCurve3(p.map(V3));
  const SC={},D2=new THREE.Object3D(),tmp=new THREE.Vector3(),tan=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);
  const mk=(id,view)=>{const G=new THREE.Group();G.visible=false;V.root.add(G);SC[id]={G,view,upd:null};return SC[id];};
  const tag=(id,n,label,pos)=>V.addTag(n+' · '+label,V3(pos),id);
  function strip(G,curve,n,w,t,mat,flange){const P=new THREE.Vector3(),T=new THREE.Vector3(),L=curve.getLength()/n*1.06;
    for(let i=0;i<n;i++){const u=(i+.5)/n;curve.getPointAt(u,P);curve.getTangentAt(u,T);const a=Math.atan2(T.y,T.x);
      put(G,new THREE.Mesh(new THREE.BoxGeometry(L,t,w),mat),P.x,P.y,P.z,0,0,a);
      if(flange&&u<flange.until){const nx=T.y,ny=-T.x;put(G,new THREE.Mesh(new THREE.BoxGeometry(L,flange.h,t),mat),P.x+nx*flange.h/2,P.y+ny*flange.h/2,P.z-w/2,0,0,a);}}}
  function flow(G,curve,n,col,r){const m=new THREE.InstancedMesh(new THREE.SphereGeometry(r||.012,8,6),new THREE.MeshBasicMaterial({color:lin(col),toneMapped:false}),n);m.userData.nopick=true;m.frustumCulled=false;G.add(m);
    const u=Array.from({length:n},(_,i)=>i/n),jit=Array.from({length:n},()=>[(Math.random()-.5),(Math.random()-.5)]);
    return{m,run(speed,dt,cnt,spread){const c=cnt==null?n:cnt;for(let i=0;i<c;i++){u[i]=((u[i]+speed*dt)%1+1)%1;curve.getPointAt(u[i],tmp);const s=spread||0;D2.position.set(tmp.x,tmp.y+jit[i][0]*s,tmp.z+jit[i][1]*s);D2.updateMatrix();m.setMatrixAt(i,D2.matrix);}m.count=c;m.instanceMatrix.needsUpdate=true;}};}
  const along=(mesh,curve,u)=>{curve.getPointAt(u,tmp);curve.getTangentAt(u,tan);mesh.position.copy(tmp);mesh.quaternion.setFromUnitVectors(up,tan);};
  const metal=MAT.chrome,steel=std(0xB8C2C8,.25,.85),dark=MAT.dark,pvc=glass(0xD8EEF6,.5),white=std(0xF2F4F5,.4);

  /* 1 · Macintosh */
  /* Proportions: the 0.6-unit handle stands for a ~130 mm adult handle, so a Mac 3 blade
     (~130 mm) is ~0.62 units along its curve. Blade points below = original curve scaled
     ×0.64 about the hinge (.04,.73); the earlier blade was ~1.6× the handle. */
  {const id='laringoskop',S=mk(id,{t:[.26,.45,0],d:1.9,th:.55,ph:1.25}),G=S.G;
   const h=put(G,new THREE.Mesh(cylG(.06,.06,.6,24),std(0x8C969D,.5,.7)),0,.38,0);for(let i=0;i<14;i++)put(G,new THREE.Mesh(new THREE.TorusGeometry(.061,.004,6,24),dark),0,.13+i*.035,0,Math.PI/2);
   put(G,new THREE.Mesh(cylG(.065,.06,.04,24),steel),0,.06,0);put(G,new THREE.Mesh(new THREE.BoxGeometry(.1,.07,.1),steel),0,.71,0);
   const bc=CR([[.04,.73,0],[.194,.749,0],[.347,.724,0],[.488,.647,0],[.59,.544,0]]);strip(G,bc,18,.075,.012,steel,{until:.62,h:.06});
   put(G,new THREE.Mesh(new THREE.SphereGeometry(.014,12,8),steel),.59,.544,0);
   const lamp=put(G,new THREE.Mesh(new THREE.SphereGeometry(.016,12,8),new THREE.MeshBasicMaterial({color:0xFFF4C8,toneMapped:false})),.366,.704,.02);
   const beam=put(G,new THREE.Mesh(new THREE.ConeGeometry(.055,.24,24,1,true),new THREE.MeshBasicMaterial({color:0xFFF0B0,transparent:true,opacity:.18,depthWrite:false,side:THREE.DoubleSide,toneMapped:false})),.475,.63,.02,0,0,Math.PI*.78);beam.userData.nopick=true;
   tag(id,1,ATLAS.t("ekipman.203"),[-.18,.4,0]);tag(id,2,ATLAS.t("ekipman.204"),[-.1,.8,0]);tag(id,3,ATLAS.t("ekipman.205"),[.27,.84,0]);tag(id,4,ATLAS.t("ekipman.206"),[.24,.65,-.08]);tag(id,5,ATLAS.t("ekipman.207"),[.4,.62,.12]);tag(id,6,ATLAS.t("ekipman.208"),[.68,.53,0]);
   S.upd=(dt,t)=>{beam.material.opacity=.14+.05*Math.sin(t*3);};}

  /* 2 · Video laringoskop */
  const glottis=canvasTex(320,240,g=>{g.fillStyle='#4a1a1e';g.fillRect(0,0,320,240);const gr=g.createRadialGradient(160,130,10,160,130,150);gr.addColorStop(0,'#e8a3a0');gr.addColorStop(1,'#5b1f24');g.fillStyle=gr;g.fillRect(0,0,320,240);
    g.fillStyle='#d98c8a';g.beginPath();g.ellipse(160,48,70,26,0,0,7);g.fill();g.fillStyle='#1a0608';g.beginPath();g.moveTo(160,90);g.lineTo(118,200);g.lineTo(202,200);g.closePath();g.fill();
    g.strokeStyle='#f6efe6';g.lineWidth=9;g.beginPath();g.moveTo(158,92);g.lineTo(116,200);g.moveTo(162,92);g.lineTo(204,200);g.stroke();g.fillStyle='#fff';g.font='600 15px sans-serif';g.fillText(ATLAS.t("ekipman.209"),12,228);});
  /* Modelled on a McGRATH MAC-type device with a hyperangulated (X3-type) blade: tall white
     handle with a dark grip band, portrait screen on top tilted back toward the operator,
     single-use translucent blade leaving the BOTTOM of the handle in a J (≈60° bend about a
     third from the tip) with the camera stick inside it. Scale as the Macintosh model
     (0.6 units ≈ 130 mm): handle+screen ≈ 0.8 units (≈180 mm), blade arc ≈ 0.49 units. */
  {const id='video',S=mk(id,{t:[.12,.42,0],d:2.4,th:.5,ph:1.28}),G=S.G;
   const shell=std(0xF4F6F7,.35),grip=std(0x23292E,.7);
   put(G,rbox(.118,.48,.1,.05,shell),0,.4,0);
   for(const x of [-.058,.058])put(G,new THREE.Mesh(new THREE.BoxGeometry(.012,.36,.05),grip),x,.41,0);
   put(G,new THREE.Mesh(cylG(.017,.017,.01,20),grip),0,.58,.051,Math.PI/2);
   put(G,rbox(.075,.08,.075,.03,shell),-.004,.66,0);
   const sg=new THREE.Group();sg.position.set(-.01,.81,0);sg.rotation.set(-.3,.15,0);G.add(sg);
   put(sg,rbox(.165,.225,.03,.018,MAT.black),0,0,0);
   const scr=new THREE.Mesh(new THREE.PlaneGeometry(.142,.19),new THREE.MeshBasicMaterial({map:glottis,toneMapped:false}));scr.position.z=.031;sg.add(scr);
   const bc=CR([[.035,.18,0],[.016,.068,0],[.06,-.045,0],[.179,-.095,0],[.304,-.051,0],[.379,.055,0]]);
   const bladeMat=std(0xDCEBF6,.18,0,{transparent:true,opacity:.62,depthWrite:false,side:THREE.DoubleSide});
   const blade=put(G,new THREE.Mesh(new THREE.TubeGeometry(bc,64,.024,16,false),bladeMat));blade.scale.z=2.2;
   const stick=new THREE.CatmullRomCurve3(Array.from({length:12},(_,i)=>bc.getPointAt(i/11*.74)));
   put(G,new THREE.Mesh(new THREE.TubeGeometry(stick,40,.009,8,false),std(0x8A949C,.45,.3)));
   const cam=new THREE.Group();along(cam,bc,.75);G.add(cam);
   put(cam,new THREE.Mesh(new THREE.BoxGeometry(.03,.022,.03),MAT.black),0,0,0);
   put(cam,new THREE.Mesh(new THREE.SphereGeometry(.007,10,8),new THREE.MeshBasicMaterial({color:0x7FD0FF,toneMapped:false})),.012,.004,0);
   put(G,new THREE.Mesh(new THREE.SphereGeometry(.024,14,10),bladeMat),.379,.055,0).scale.z=2.2;
   tag(id,1,ATLAS.t("ekipman.210"),[-.12,.97,0]);tag(id,2,ATLAS.t("ekipman.211"),[-.17,.4,0]);tag(id,3,ATLAS.t("ekipman.212"),[.2,-.17,.06]);tag(id,4,ATLAS.t("ekipman.213"),[.43,.17,.06]);tag(id,5,ATLAS.t("ekipman.214"),[.48,.04,0]);}

  /* 3 · ETT */
  let cuffMesh,pilot,cuffMat;
  {const id='ett',S=mk(id,{t:[0,.5,0],d:2.2,th:.25,ph:1.3}),G=S.G;
   const c=CR([[-.85,.78,0],[-.35,.8,0],[.15,.68,0],[.52,.44,0],[.7,.18,0]]);
   put(G,new THREE.Mesh(new THREE.TubeGeometry(c,80,.042,18,false),pvc));
   const stripe=CR(c.points.map(p=>[p.x,p.y+.0,.043]));put(G,new THREE.Mesh(new THREE.TubeGeometry(stripe,80,.005,6,false),std(0x2F6BFF,.5)));
   const con=new THREE.Mesh(cylG(.055,.055,.1,24),white);along(con,c,0);con.translateY(-.02);put(G,con,con.position.x,con.position.y,con.position.z);con.quaternion.setFromUnitVectors(up,c.getTangentAt(0));
   [.16,.2,.24,.28].forEach((u,i)=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.043,.003,6,24),MAT.black);c.getPointAt(u,tmp);c.getTangentAt(u,tan);r.position.copy(tmp);r.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),tan);G.add(r);if(i%2===0)V.addTag(String(20+i*2)+' cm',V3([tmp.x,tmp.y+.09,0]),id);});
   cuffMat=std(0x9FD8C0,.3,0,{transparent:true,opacity:.55,depthWrite:false});cuffMesh=new THREE.Mesh(new THREE.SphereGeometry(1,32,20),cuffMat);along(cuffMesh,c,.84);G.add(cuffMesh);
   const pl=CR([[.42,.56,.05],[.1,.75,.08],[-.3,.9,.1],[-.55,.98,.1]]);put(G,new THREE.Mesh(new THREE.TubeGeometry(pl,40,.006,6,false),pvc));
   pilot=put(G,new THREE.Mesh(new THREE.SphereGeometry(1,20,14),std(0xBFE6F2,.3,0,{transparent:true,opacity:.7})),-.62,1.0,.1);put(G,new THREE.Mesh(cylG(.015,.015,.06,12),white),-.72,1.02,.1,0,0,Math.PI/2);
   const tip=c.getPointAt(.985);put(G,new THREE.Mesh(new THREE.TorusGeometry(.016,.004,6,16),MAT.black),tip.x+.03,tip.y+.03,.0,0,Math.PI/2);
   tag(id,1,ATLAS.t("ekipman.215"),[-.95,.93,0]);tag(id,2,ATLAS.t("ekipman.216"),[-.35,.98,0]);tag(id,3,ATLAS.t("ekipman.217"),[-.62,1.13,.1]);tag(id,4,ATLAS.t("ekipman.218"),[.75,.4,0]);tag(id,5,ATLAS.t("ekipman.219"),[.85,.2,0]);tag(id,6,ATLAS.t("ekipman.220"),[.62,.04,0]);
   S.upd=()=>{const p=st.cuff,r=.048+.05*Math.min(1.4,p/30);cuffMesh.scale.set(r,.13,r);pilot.scale.setScalar(.03+.025*Math.min(1.4,p/30));cuffMat.color.copy(lin(p<20?0xF2C531:p<=30?0x3CCB7F:0xF05A5A));};}

  /* 4 · LMA */
  {const id='lma',S=mk(id,{t:[.14,.36,0],d:2.5,th:.6,ph:1.2}),G=S.G;
   const mg=new THREE.Group();mg.position.set(.42,.22,0);mg.rotation.z=-.5;G.add(mg);
   const cuff=new THREE.Mesh(new THREE.TorusGeometry(.15,.04,16,48),std(0x9FD8C0,.35,0,{transparent:true,opacity:.75}));cuff.scale.set(1.45,1,1);cuff.rotation.x=Math.PI/2;mg.add(cuff);
   const bowl=new THREE.Mesh(new THREE.SphereGeometry(.17,32,16,0,Math.PI*2,0,Math.PI/2),std(0xE7EEF1,.4,0,{transparent:true,opacity:.6,side:THREE.DoubleSide}));bowl.scale.set(1.3,.35,.85);bowl.rotation.x=Math.PI;mg.add(bowl);
   const air=CR([[.3,.26,0],[.05,.45,0],[-.25,.66,0],[-.55,.78,0]]);put(G,new THREE.Mesh(new THREE.TubeGeometry(air,50,.045,16,false),pvc));
   const gas=CR([[.66,.06,0],[.42,.25,.07],[.05,.47,.07],[-.25,.69,.07],[-.55,.82,.07]]);put(G,new THREE.Mesh(new THREE.TubeGeometry(gas,60,.018,10,false),std(0xF08A24,.45,0,{transparent:true,opacity:.8})));
   put(G,new THREE.Mesh(cylG(.055,.055,.1,24),white),-.6,.8,0,0,0,Math.PI/2.3);
   const bb=new THREE.Mesh(cylG(.052,.052,.14,24),std(0x2B3238,.6));along(bb,air,.72);G.add(bb);
   const pl=CR([[.35,.3,-.1],[.05,.5,-.12],[-.3,.62,-.14]]);put(G,new THREE.Mesh(new THREE.TubeGeometry(pl,30,.006,6,false),pvc));put(G,new THREE.Mesh(new THREE.SphereGeometry(.035,16,12),std(0xBFE6F2,.3,0,{transparent:true,opacity:.7})),-.34,.64,-.14);
   /* Where the gas goes. Ventilation (inspiration blue, as elsewhere in the atlas): connector →
      airway tube → mask bowl → glottis → trachea. The gastric channel never carries ventilation:
      its distal tip sits in the upper oesophagus and it only lets gastric air/fluid out (or a
      gastric tube in), so it shows a slow outward drain in its own colour. Mask frame: bowl at
      the origin, distal along +x, the bowl opening (towards the larynx) along +y. */
   const M=(x,y,z=0)=>[.42+x*.8776+y*.4794,.22-x*.4794+y*.8776,z];
   const tissue=c=>std(c,.6,0,{transparent:true,opacity:.4,depthWrite:false});
   const trach=CR([M(.02,.15),M(.08,.24),M(.3,.29),M(.62,.3)]);put(G,new THREE.Mesh(new THREE.TubeGeometry(trach,40,.05,18,false),tissue(0xE9A9A4)));
   const oes=CR([M(.29,-.03),M(.45,-.05),M(.66,-.06)]);put(G,new THREE.Mesh(new THREE.TubeGeometry(oes,30,.042,16,false),tissue(0xD07F7A)));
   const vent=CR([[-.55,.78,0],[-.25,.66,0],[.05,.45,0],[.3,.26,0],M(0,.02),M(.02,.15),M(.1,.25),M(.32,.29),M(.6,.3)]);
   const vf=flow(G,vent,26,0x6FD3FF,.012);
   const gf=flow(G,gas,8,0xF08A24,.009);
   V.addTag(ATLAS.ui('eq.trachea'),V3(M(.45,.42)),id);V.addTag(ATLAS.ui('eq.oesophagus'),V3(M(.4,-.09,.06)),id);
   tag(id,1,ATLAS.t("ekipman.221"),[-.72,.92,0]);tag(id,2,ATLAS.t("ekipman.222"),[-.42,.92,0]);tag(id,3,ATLAS.t("ekipman.223"),[-.05,.4,0]);tag(id,4,ATLAS.t("ekipman.224"),[.05,.62,.12]);tag(id,5,ATLAS.t("ekipman.225"),[.6,.32,0]);tag(id,6,ATLAS.t("ekipman.226"),[.35,.1,.1]);tag(id,7,ATLAS.t("ekipman.227"),[.78,.02,0]);
   S.upd=dt=>{vf.run(.22,dt,null,.02);gf.run(.06,dt);};}

  /* 4b · 3rd-generation SGA (Baska Mask type): non-inflatable membranous cuff that fills with each
     positive-pressure breath (self-energising seal), sump + two side drain channels to a suction
     port, bite block over the whole tube curve, hand tab on the cuff. Same mask frame and anatomy
     as the LMA above: bowl at the origin, distal +x, bowl opening (larynx) +y. */
  {const id='baska',S=mk(id,{t:[.06,.45,0],d:2.95,th:.6,ph:1.2}),G=S.G;
   const M=(x,y,z=0)=>[.42+x*.8776+y*.4794,.22-x*.4794+y*.8776,z];
   const tissue=c=>std(c,.6,0,{transparent:true,opacity:.4,depthWrite:false});
   const sil=std(0xDCEFF3,.25,0,{transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide});
   const mg=new THREE.Group();mg.position.set(.42,.22,0);mg.rotation.z=-.5;G.add(mg);
   const cuff=new THREE.Mesh(new THREE.TorusGeometry(.15,.034,16,48),std(0x8FD0E4,.3,0,{transparent:true,opacity:.65,depthWrite:false}));cuff.scale.set(1.45,1,1);cuff.rotation.x=Math.PI/2;mg.add(cuff);
   const bowl=new THREE.Mesh(new THREE.SphereGeometry(.17,32,16,0,Math.PI*2,0,Math.PI/2),sil);bowl.scale.set(1.3,.35,.85);bowl.rotation.x=Math.PI;mg.add(bowl);
   const sump=new THREE.Mesh(new THREE.CircleGeometry(.05,24),std(0xF08A24,.5,0,{transparent:true,opacity:.35,depthWrite:false,side:THREE.DoubleSide}));sump.position.set(-.12,-.045,0);sump.rotation.x=Math.PI/2;sump.scale.set(1.4,1,1);mg.add(sump);
   const air=CR([[.3,.26,0],[.05,.45,0],[-.25,.66,0],[-.55,.78,0]]);
   const tube=put(G,new THREE.Mesh(new THREE.TubeGeometry(air,50,.045,18,false),pvc));tube.scale.z=1.45;
   const bite=put(G,new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({length:10},(_,i)=>air.getPointAt(.3+i/9*.62))),40,.052,18,false),white));bite.scale.z=1.45;
   put(G,new THREE.Mesh(cylG(.055,.055,.1,24),std(0x3CCB7F,.45)),-.6,.8,0,0,0,Math.PI/2.3);
   const side=z=>CR([M(.29,-.03,z*.4),M(.1,-.07,z),M(-.12,-.06,z),[.22,.3,z],[.0,.47,z],[-.25,.66,z],[-.45,.74,z],[-.5,.86,z*.6]]);
   const chMat=std(0xF08A24,.45,0,{transparent:true,opacity:.75});
   const chL=side(.075),chR=side(-.075);for(const c of [chL,chR])put(G,new THREE.Mesh(new THREE.TubeGeometry(c,60,.011,8,false),chMat));
   put(G,new THREE.Mesh(cylG(.028,.028,.08,16),std(0xF08A24,.45)),-.5,.9,0,0,0,-.3);
   put(G,rbox(.2,.016,.06,.008,sil),...M(-.36,-.08,0)).rotation.z=-.5;
   const trach=CR([M(.02,.15),M(.08,.24),M(.3,.29),M(.62,.3)]);put(G,new THREE.Mesh(new THREE.TubeGeometry(trach,40,.05,18,false),tissue(0xE9A9A4)));
   const oes=CR([M(.29,-.03),M(.45,-.05),M(.66,-.06)]);put(G,new THREE.Mesh(new THREE.TubeGeometry(oes,30,.042,16,false),tissue(0xD07F7A)));
   const vent=CR([[-.55,.78,0],[-.25,.66,0],[.05,.45,0],[.3,.26,0],M(0,.02),M(.02,.15),M(.1,.25),M(.32,.29),M(.6,.3)]);
   const vf=flow(G,vent,26,0x6FD3FF,.012),dl=flow(G,chL,7,0xF08A24,.009),dr=flow(G,chR,7,0xF08A24,.009);
   V.addTag(ATLAS.ui('eq.trachea'),V3(M(.45,.42)),id);V.addTag(ATLAS.ui('eq.oesophagus'),V3(M(.4,-.09,.06)),id);
   const B=k=>ATLAS.ui('eq.baska.'+k);
   tag(id,1,B('p1n'),[-.72,.92,0]);tag(id,2,B('p2n'),[-.3,.86,0]);tag(id,3,B('p3n'),[-.02,.38,0]);tag(id,4,B('p4n'),[.66,.36,0]);tag(id,5,B('p5n'),M(-.12,-.12,.1));tag(id,6,B('p6n'),M(.33,.02,.08));tag(id,7,B('p7n'),M(-.42,-.16,0));tag(id,8,B('p8n'),[-.42,1.0,0]);
   // inspiration fills the membranous cuff (dynamic seal); it relaxes on expiration
   S.upd=(dt,t)=>{const b=breath(t);cuff.scale.set(1.45*(.94+.1*b),1,.94+.1*b);cuff.material.opacity=.5+.35*b;vf.run(.22,dt,Math.round(8+18*b),.02);dl.run(.06,dt);dr.run(.06,dt);};}

  /* 5 · Mapleson D (Bain) */
  const breath=t=>.5+.5*Math.sin(t*2*Math.PI/4);
  {const id='maplesonD',S=mk(id,{t:[.08,.45,0],d:3.05,th:.2,ph:1.25}),G=S.G;
   const outer=CR([[.85,.5,0],[.3,.5,0],[-.3,.5,0],[-.85,.5,0]]),inner=CR([[.95,.5,0],[.3,.5,0],[-.3,.5,0],[-.78,.5,0]]);
   put(G,corrugated(outer,.06,std(0xBFD9E6,.35,0,{transparent:true,opacity:.35,depthWrite:false})));put(G,new THREE.Mesh(new THREE.TubeGeometry(inner,40,.014,10,false),std(0x3CCB7F,.4,0,{transparent:true,opacity:.7})));
   put(G,new THREE.Mesh(new THREE.BoxGeometry(.14,.14,.14),MAT.dark),.95,.5,0);put(G,new THREE.Mesh(cylG(.035,.035,.08,16),MAT.orange),.95,.6,0);
   put(G,new THREE.Mesh(cylG(.018,.018,.25,12),metal),.95,.5,.18,Math.PI/2);
   const bag=put(G,lathe([[.03,0],[.06,-.05],[.12,-.15],[.13,-.28],[.1,-.38],[.001,-.42]],std(0x1E2226,.75)),.95,.43,0);
   put(G,new THREE.Mesh(cylG(.05,.04,.08,20),white),-.9,.5,0,0,0,Math.PI/2);
   // fresh gas: machine end (+x) → inner tube → patient end; exhaled gas: outer tube → bag / APL
   const ff=flow(G,inner,24,0x3CCB7F,.01),ef=flow(G,CR([[-.8,.5,0],[0,.5,0],[.85,.5,0],[.95,.62,0],[.95,.72,0]]),30,0xFFB347,.011);
   tag(id,1,ATLAS.t("ekipman.228"),[.95,.5,.34]);tag(id,2,'APL',[.95,.7,0]);tag(id,3,ATLAS.t("ekipman.229"),[1.1,.2,0]);tag(id,4,ATLAS.t("ekipman.230"),[.2,.62,0]);tag(id,5,ATLAS.t("ekipman.231"),[-.2,.38,0]);tag(id,6,ATLAS.t("ekipman.232"),[-.95,.62,0]);
   S.upd=(dt,t)=>{const b=breath(t);bag.scale.set(.8+.25*b,1,.8+.25*b);ff.run(.25,dt);ef.run(.18,dt,30,.07);};}

  /* 6 · Mapleson F */
  {const id='maplesonF',S=mk(id,{t:[.22,.48,0],d:2.95,th:.2,ph:1.25}),G=S.G;
   const lim=CR([[-.6,.5,0],[-.1,.5,0],[.4,.5,0],[.62,.5,0]]);put(G,corrugated(lim,.045,std(0xBFD9E6,.35,0,{transparent:true,opacity:.4,depthWrite:false})));
   put(G,new THREE.Mesh(cylG(.04,.04,.12,16),white),-.68,.5,0,0,0,Math.PI/2);put(G,new THREE.Mesh(cylG(.015,.015,.22,12),std(0x3CCB7F,.4)),-.62,.62,0);
   const bag=put(G,lathe([[.03,0],[.06,-.05],[.1,-.14],[.1,-.24],[.06,-.32],[.012,-.36]],std(0x1E2226,.75)),.64,.5,0,0,0,Math.PI/2);
   put(G,new THREE.Mesh(cylG(.012,.012,.12,10,true),std(0x1E2226,.75)),1.06,.5,0,0,0,Math.PI/2);
   const fg=flow(G,CR([[-.62,.75,0],[-.62,.55,0],[-.68,.5,0]]),10,0x3CCB7F,.01),ex=flow(G,CR([[-.66,.5,0],[0,.5,0],[.62,.5,0],[1.0,.5,0],[1.2,.52,0]]),28,0xFFB347,.011);
   tag(id,1,ATLAS.t("ekipman.233"),[-.62,.82,0]);tag(id,2,ATLAS.t("ekipman.234"),[-.82,.38,0]);tag(id,3,ATLAS.t("ekipman.235"),[-.05,.62,0]);tag(id,4,ATLAS.t("ekipman.236"),[.88,.7,0]);
   S.upd=(dt,t)=>{const b=breath(t);bag.scale.set(.8+.3*b,1,.8+.3*b);fg.run(.4,dt);ex.run(.2,dt,28,.05);};}

  /* 7–8 · Atık gaz arayüzleri */
  {const id='acik',S=mk(id,{t:[0,.5,0],d:2.2,th:.35,ph:1.25}),G=S.G;
   put(G,new THREE.Mesh(cylG(.12,.12,.7,32,true),glass(0xE6F3F7,.18)),0,.45,0);put(G,new THREE.Mesh(cylG(.13,.13,.03,32),dark),0,.1,0);
   for(let i=0;i<6;i++){const a=i/6*6.283;put(G,new THREE.Mesh(new THREE.TorusGeometry(.018,.005,6,12),dark),.122*Math.cos(a),.74,.122*Math.sin(a),0,a+Math.PI/2,0);}
   put(G,new THREE.Mesh(cylG(.13,.13,.02,32,true),dark),0,.8,0);
   const inC=CR([[-.7,.62,0],[-.3,.62,0],[-.13,.62,0],[0,.55,0],[0,.2,0],[0,.06,0],[.25,.06,0],[.7,.06,0]]);put(G,new THREE.Mesh(new THREE.TubeGeometry(CR([[-.7,.62,0],[-.13,.62,0]]),10,.03,12,false),glass(0xE6F3F7,.3)));
   put(G,new THREE.Mesh(new THREE.TubeGeometry(CR([[0,.06,0],[.7,.06,0]]),10,.025,12,false),std(0x6E7A82,.5)));
   const fl=put(G,new THREE.Mesh(cylG(.02,.02,.25,12,true),glass(0xE6F3F7,.35)),.4,.25,0),bob=put(G,new THREE.Mesh(new THREE.SphereGeometry(.016,12,8),MAT.orange),.4,.2,0);put(G,new THREE.Mesh(cylG(.035,.035,.04,16),dark),.4,.4,0);
   const w=flow(G,inC,40,0xFFB347,.011),air=flow(G,CR([[.25,.95,0],[.13,.76,0],[.04,.5,0],[0,.2,0],[0,.06,0],[.7,.06,0]]),20,0xD8E2E8,.01),spill=flow(G,CR([[0,.62,0],[.08,.74,0],[.3,.9,0]]),12,0xFFB347,.011);
   tag(id,1,ATLAS.t("ekipman.237"),[-.6,.74,0]);tag(id,2,ATLAS.t("ekipman.238"),[-.2,.35,0]);tag(id,3,ATLAS.t("ekipman.239"),[.3,.84,0]);tag(id,4,ATLAS.t("ekipman.240"),[.62,.42,0]);tag(id,5,ATLAS.t("ekipman.241"),[.62,.0,0]);
   S.upd=dt=>{const v=st.vac;bob.position.y=.15+v*.06;w.run(.2,dt,v===1?20:40,.04);air.run(.25,dt,v===1?0:v===2?6:20,.02);spill.run(.3,dt,v===1?12:0,.03);};}
  {const id='kapali',S=mk(id,{t:[0,.48,0],d:2.2,th:.35,ph:1.25}),G=S.G;
   put(G,rbox(.5,.16,.2,.02,MAT.shell),0,.55,0);
   put(G,new THREE.Mesh(new THREE.TubeGeometry(CR([[-.8,.6,0],[-.25,.6,0]]),10,.03,12,false),glass(0xE6F3F7,.3)));
   const bag=put(G,lathe([[.03,0],[.07,-.05],[.13,-.15],[.14,-.28],[.1,-.38],[.001,-.42]],std(0x1E2226,.75)),0,.47,0);
   const vp=[[-.15,'pos',0xF05A5A],[.15,'neg',0x3CCB7F]].map(([x,k,c])=>{put(G,new THREE.Mesh(cylG(.04,.04,.03,20),MAT.metal),x,.645,0);put(G,new THREE.Mesh(new THREE.SphereGeometry(.04,20,10,0,Math.PI*2,0,Math.PI/2),glass(0xF0FAFF,.3)),x,.66,0);return put(G,new THREE.Mesh(cylG(.03,.03,.005,20),std(c,.4)),x,.665,0);});
   put(G,new THREE.Mesh(new THREE.TubeGeometry(CR([[.25,.55,0],[.7,.55,0]]),10,.025,12,false),std(0x6E7A82,.5)));const knob=put(G,new THREE.Mesh(cylG(.04,.04,.05,20),MAT.dark),.45,.64,0);
   const w=flow(G,CR([[-.8,.6,0],[-.2,.58,0],[.2,.56,0],[.7,.55,0]]),40,0xFFB347,.011),out=flow(G,CR([[-.15,.67,0],[-.2,.85,0],[-.35,1.0,0]]),14,0xFFB347,.011),inn=flow(G,CR([[.3,1.0,0],[.18,.85,0],[.15,.67,0],[.3,.56,0],[.7,.55,0]]),14,0xD8E2E8,.01);
   tag(id,1,ATLAS.t("ekipman.242"),[-.62,.72,0]);tag(id,2,ATLAS.t("ekipman.243"),[-.3,.82,0]);tag(id,3,ATLAS.t("ekipman.244"),[.32,.82,0]);tag(id,4,ATLAS.t("ekipman.245"),[.22,.15,0]);tag(id,5,ATLAS.t("ekipman.246"),[.5,.76,0]);tag(id,6,ATLAS.t("ekipman.247"),[.7,.44,0]);
   S.upd=(dt,t)=>{const v=st.vac,b=.5+.5*Math.sin(t*2*Math.PI/4),fill=v===1?1.25:v===2?.85+.15*b:.45;bag.scale.set(fill,1,fill);
     vp[0].position.y=.665+(v===1?.025:0);vp[1].position.y=.665+(v===3?.025:0);knob.rotation.y=v*1.2;
     w.run(.2,dt,v===1?22:40,.03);out.run(.3,dt,v===1?14:0,.02);inn.run(.3,dt,v===3?14:0,.02);};}

  V.tick.push((dt,t)=>{const s=SC[cur];if(s&&s.upd)s.upd(dt,t);});
  API={set(id){Object.values(SC).forEach(s=>s.G.visible=false);const s=SC[id];s.G.visible=true;V.labScene=id;V.home={target:V3(s.view.t),dist:s.view.d,theta:s.view.th,phi:s.view.ph};V.focus(V.home.target,s.view.d,s.view.th,s.view.ph);}};
}catch(e){console.error('ekipman',e);API=null;}}
if(!API)failStage($s('stageEq'),ATLAS.t("ekipman.248"));
function setModel(id){if(!INFO[id]||cur===id)return;cur=id;document.dispatchEvent(new CustomEvent('atlas:module',{detail:{kind:'equipment',id}}));$$('#eqTabs button').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.m===id);if(b.dataset.m===id)ATLAS_STRIP(b);});renderInfo(id);if(API)API.set(id);
  if(!seen.has(id)){seen.add(id);document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'equipment',id,score:null,ok:false,stage:1}}));}
  try{history.replaceState(null,'','#'+id);}catch(e){}}
$s('eqTabs').addEventListener('click',e=>{const b=e.target.closest('button[data-m]');if(b)setModel(b.dataset.m);});
const h=location.hash.slice(1);setModel(INFO[h]?h:'laringoskop');
if(typeof PROGRESS!=='undefined'){PROGRESS.setTotal('equipment',MODELS.filter(m=>ATLAS_CURRICULUM.equipment.includes(m.id)).length);PROGRESS.setLabels('equipment',Object.fromEntries(MODELS.map(m=>[m.id,m.n])));}
})();
