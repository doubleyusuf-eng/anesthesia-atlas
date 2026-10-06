'use strict';
/* Anestezi Makinesi Atlası · ortak çekirdek */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const nf=(v,d=1)=>Number(v).toLocaleString(ATLAS.t("core.1"),{minimumFractionDigits:d,maximumFractionDigits:d});
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
const MONO='"JetBrains Mono", ui-monospace, Menlo, monospace';

const ALT={h:1054};
const PBof=h=>760*Math.pow(1-2.25577e-5*h,5.25588);
const viewers=[];
function failStage(el,msg){if(!el)return;const d=document.createElement('div');d.className='stage-fail';d.textContent=msg;el.appendChild(d);}
const has3D=(()=>{try{if(!window.THREE)return false;const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'));}catch(e){return false;}})();
const K3=(()=>{if(!has3D)return null;try{

  const lin=h=>new THREE.Color(h).convertSRGBToLinear();
  const std=(c,r=.5,m=0,extra)=>new THREE.MeshStandardMaterial(Object.assign({color:lin(c),roughness:r,metalness:m},extra||{}));
  const glass=(c=0xDDEFF5,o=.22)=>new THREE.MeshPhysicalMaterial({color:lin(c),roughness:.06,metalness:0,transparent:true,opacity:o,depthWrite:false,clearcoat:1,side:THREE.DoubleSide});
  const MAT={shell:std(0xE7ECEF,.42,.02),shell2:std(0xCBD4D9,.5,.03),panel:std(0xD9E0E4,.6,0),dark:std(0x2C343A,.55,.15),black:std(0x15191C,.55,.1),metal:std(0xBAC3C9,.32,.8),chrome:std(0xE4E8EB,.14,1),rubber:std(0x1D2125,.85,0),
    o2:std(0xF3F5F6,.38),n2o:std(0x2156C4,.38,.05),air:std(0x1F2327,.45),sevo:std(0xF0C21B,.32,.05),des:std(0x1E6FD9,.32,.05),hose:std(0x9FC9DE,.35,0,{transparent:true,opacity:.62}),bellows:std(0x34404E,.7,0),
    green:std(0x2E9E58,.5),orange:std(0xE07B28,.45)};

  function makeEnv(r){const pm=new THREE.PMREMGenerator(r),s=new THREE.Scene(),geo=new THREE.SphereGeometry(10,32,16),pos=geo.attributes.position,cols=[];
    for(let i=0;i<pos.count;i++){const y=pos.getY(i)/10,c=new THREE.Color().setHSL(.56,.12,.18+.55*(y*.5+.5));cols.push(c.r,c.g,c.b);}
    geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));s.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
    const lm=new THREE.MeshBasicMaterial({color:new THREE.Color(4,4,4)});
    [[0,8,3,8,4],[6,3,4,3,5],[-6,4,-2,3,4]].forEach(([x,y,z,w,h])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),lm);m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m);});
    const t=pm.fromScene(s,.03).texture;pm.dispose();return t;}

  function rbox(w,h,d,r,mat){const iw=Math.max(w-2*r,.001),ih=Math.max(h-2*r,.001),c=Math.max(Math.min(r,iw/2,ih/2)*.8,.0005),x=-iw/2,y=-ih/2,s=new THREE.Shape();
    s.moveTo(x+c,y);s.lineTo(x+iw-c,y);s.quadraticCurveTo(x+iw,y,x+iw,y+c);s.lineTo(x+iw,y+ih-c);s.quadraticCurveTo(x+iw,y+ih,x+iw-c,y+ih);s.lineTo(x+c,y+ih);s.quadraticCurveTo(x,y+ih,x,y+ih-c);s.lineTo(x,y+c);s.quadraticCurveTo(x,y,x+c,y);
    const dd=Math.max(d-2*r,.001),geo=new THREE.ExtrudeGeometry(s,{depth:dd,bevelEnabled:true,bevelThickness:r,bevelSize:r,bevelSegments:3,curveSegments:5});geo.translate(0,0,-dd/2);return new THREE.Mesh(geo,mat);}
  function put(parent,m,x=0,y=0,z=0,rx=0,ry=0,rz=0){m.position.set(x,y,z);m.rotation.set(rx,ry,rz);const tr=!!(m.material&&m.material.transparent);m.castShadow=!tr;m.receiveShadow=!tr;parent.add(m);return m;}
  const cylG=(rt,rb,h,seg=28,open=false)=>new THREE.CylinderGeometry(rt,rb,h,seg,1,open);
  function corrugated(curve,r,mat){const L=curve.getLength(),segs=Math.max(40,Math.round(L/.0045)),geo=new THREE.TubeGeometry(curve,segs,r,14,false),pos=geo.attributes.position,rs=14,P=new THREE.Vector3(),v=new THREE.Vector3();
    for(let i=0;i<=segs;i++){curve.getPointAt(i/segs,P);const f=(i%2===0)?1.12:.9;for(let j=0;j<=rs;j++){const id=i*(rs+1)+j;v.fromBufferAttribute(pos,id).sub(P).multiplyScalar(f).add(P);pos.setXYZ(id,v.x,v.y,v.z);}}
    geo.computeVertexNormals();return new THREE.Mesh(geo,mat);}
  function canvasTex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;t.userData={canvas:c,fn};return t;}
  function lathe(pts,mat,seg=40){return new THREE.Mesh(new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg),mat);}

  class Viewer{
    constructor(el,o){
      this.el=el;this.o=o;
      const r=new THREE.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
      r.outputEncoding=THREE.sRGBEncoding;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;
      r.domElement.className='gl';el.prepend(r.domElement);this.renderer=r;
      this.scene=new THREE.Scene();this.scene.environment=makeEnv(r);
      this.camera=new THREE.PerspectiveCamera(o.fov||30,1,.02,40);
      this.home={target:new THREE.Vector3(...o.target),dist:o.dist,theta:o.theta,phi:o.phi};
      this.v={target:this.home.target.clone(),dist:o.dist,theta:o.theta,phi:o.phi};this.goal=null;this.distMul=1;
      this.scene.add(new THREE.HemisphereLight(0xffffff,0x7d8a94,.55));
      const key=new THREE.DirectionalLight(0xffffff,1.05);key.position.set(1.4,3.2,2.4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);
      const sc=key.shadow.camera,S=o.shadow||1.3;sc.left=-S;sc.right=S;sc.top=S;sc.bottom=-S;sc.near=.5;sc.far=9;key.shadow.bias=-.0006;key.shadow.radius=5;this.scene.add(key);
      const rim=new THREE.DirectionalLight(0xc6dcff,.45);rim.position.set(-2.2,1.6,-2);this.scene.add(rim);
      const gr=new THREE.Mesh(new THREE.CircleGeometry(o.groundR||1.6,48),new THREE.ShadowMaterial({opacity:.2}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;this.scene.add(gr);
      this.root=new THREE.Group();this.scene.add(this.root);
      this.pins=[];this.tick=[];this.onPick=null;this.auto=false;this.visible=false;this.showPins=true;
      this.ray=new THREE.Raycaster();this.ndc=new THREE.Vector2();this.tmp=new THREE.Vector3();this.layer=el.querySelector('.pins');
      this.bind();
      if('ResizeObserver' in window){const ro=new ResizeObserver(()=>this.resize());ro.observe(el);ro.observe(r.domElement);}else addEventListener('resize',()=>this.resize());
      this.resize();
      new IntersectionObserver(es=>{for(const e of es)this.visible=e.isIntersecting;},{rootMargin:'120px'}).observe(el);
      el.querySelectorAll('.stage-tools [data-act]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.act;if(a==='in')this.zoom(.82);else if(a==='out')this.zoom(1.22);else if(a==='reset'){this.onReset&&this.onReset();this.reset();}else if(a==='pan'){this.panMode=!this.panMode;b.setAttribute('aria-pressed',this.panMode);}}));
      viewers.push(this);
    }
    resize(){const cv=this.renderer.domElement,w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.w=w;this.h=h;const a=w/h,fa=this.o.fitAspect||1.15;this.distMul=a<fa?Math.pow(fa/a,.85):1;}
    bind(){const c=this.renderer.domElement,pts=new Map();let moved=0,pinch=null;
      const pinfo=()=>{const a=[...pts.values()];return{mx:(a[0].x+a[1].x)/2,my:(a[0].y+a[1].y)/2,d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)};};
      c.addEventListener('contextmenu',e=>e.preventDefault());
      c.addEventListener('pointerdown',e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});moved=0;this.auto=false;this.goal=null;try{c.setPointerCapture(e.pointerId);}catch(_){}c.classList.add('drag');
        this.dragMode=(e.button===1||e.button===2||e.shiftKey||this.panMode)?'pan':'rot';pinch=pts.size===2?pinfo():null;});
      c.addEventListener('pointermove',e=>{const p=pts.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);
        if(pts.size>=2){const n=pinfo();if(pinch){this.pan(n.mx-pinch.mx,n.my-pinch.my);if(n.d>0&&pinch.d>0)this.v.dist=clamp(this.v.dist*pinch.d/n.d,this.o.minD,this.o.maxD);}pinch=n;return;}
        if(this.dragMode==='pan')this.pan(dx,dy);else{this.v.theta-=dx*.008;this.v.phi=clamp(this.v.phi-dy*.006,.2,1.55);}});
      const end=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);pinch=pts.size===2?pinfo():null;
        if(!pts.size){c.classList.remove('drag');if(moved<6&&e.type==='pointerup'&&e.button===0)this.doPick(e);}};
      c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);
      c.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();this.zoom(Math.exp(e.deltaY*.01));return;}if(!this.el.classList.contains('is-fs'))return;e.preventDefault();this.auto=false;this.pan(-e.deltaX,-e.deltaY);},{passive:false});
      this.padDir=null;this.el.querySelectorAll('.pad [data-pan]').forEach(b=>{const d=b.dataset.pan;
        if(d==='c'){b.addEventListener('click',()=>this.focus(this.home.target,this.v.dist,this.v.theta,this.v.phi));return;}
        const [x,y]=d.split(',').map(Number);const stop=()=>{this.padDir=null;b.classList.remove('on');};
        b.addEventListener('pointerdown',e=>{e.preventDefault();this.auto=false;this.goal=null;this.padDir={x,y};this.pan(x*30,y*30);b.classList.add('on');try{b.setPointerCapture(e.pointerId);}catch(_){}});
        b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop);b.addEventListener('lostpointercapture',stop);
        b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();this.pan(x*40,y*40);}});});}
    pan(dx,dy){this.goal=null;this.camera.updateMatrixWorld();const k=this.v.dist*this.distMul*2*Math.tan(this.camera.fov*Math.PI/360)/(this.h||1);
      const r=new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld,0),u=new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld,1);
      this.v.target.addScaledVector(r,-dx*k).addScaledVector(u,dy*k);const H=this.home.target,L=this.o.panLim||1;
      this.v.target.set(clamp(this.v.target.x,H.x-L,H.x+L),clamp(this.v.target.y,H.y-L,H.y+L),clamp(this.v.target.z,H.z-L,H.z+L));}
    zoom(f){if(this.goal){this.v.target.copy(this.goal.target);this.goal=null;}this.v.dist=clamp(this.v.dist*f,this.o.minD,this.o.maxD);}
    doPick(e){if(!this.onPick)return;const rc=this.renderer.domElement.getBoundingClientRect();this.ndc.set((e.clientX-rc.left)/rc.width*2-1,-(e.clientY-rc.top)/rc.height*2+1);
      this.ray.setFromCamera(this.ndc,this.camera);const hits=this.ray.intersectObject(this.root,true);let k=null;
      for(const h of hits){let o=h.object;if(o.userData.nopick)continue;while(o&&!o.userData.part)o=o.parent;if(o){k=o.userData.part;break;}if(!(h.object.material&&h.object.material.transparent))break;}
      this.onPick(k);}
    focus(t,d,th,ph){let x=th;const c=this.v.theta;while(x-c>Math.PI)x-=2*Math.PI;while(x-c<-Math.PI)x+=2*Math.PI;this.goal={target:t.clone(),dist:d,theta:x,phi:ph};this.auto=false;}
    reset(){this.focus(this.home.target,this.home.dist,this.home.theta,this.home.phi);}
    addTag(text,pos,scene){const s=document.createElement('span');s.className='tag3d';s.textContent=text;this.layer.appendChild(s);const p={el:s,pos,key:null,hid:false,scene};this.pins.push(p);return p;}
    addPin(k,label,pos,aria){const b=document.createElement('button');b.type='button';b.className='pin';b.textContent=label;b.setAttribute('aria-label',aria||label);b.addEventListener('click',()=>this.onPick&&this.onPick(k));this.layer.appendChild(b);this.pins.push({el:b,pos,key:k,hid:false});}
    frame(dt,t){
      if(this.goal){const k=RM?1:1-Math.exp(-dt*4.5),G=this.goal;this.v.target.lerp(G.target,k);this.v.dist+=(G.dist-this.v.dist)*k;this.v.theta+=(G.theta-this.v.theta)*k;this.v.phi+=(G.phi-this.v.phi)*k;
        if(Math.abs(G.dist-this.v.dist)<1e-3&&this.v.target.distanceTo(G.target)<1e-3&&Math.abs(G.theta-this.v.theta)<1e-3&&Math.abs(G.phi-this.v.phi)<1e-3)this.goal=null;}
      if(this.auto)this.v.theta+=dt*.13;
      if(this.padDir)this.pan(this.padDir.x*dt*320,this.padDir.y*dt*320);
      const d=this.v.dist*this.distMul,s=Math.sin(this.v.phi),T=this.v.target;
      this.camera.position.set(T.x+d*s*Math.sin(this.v.theta),T.y+d*Math.cos(this.v.phi),T.z+d*s*Math.cos(this.v.theta));this.camera.lookAt(T);
      for(const f of this.tick)f(dt,t);
      this.renderer.render(this.scene,this.camera);
      if(this.pins.length){const cd=this.camera.position.distanceTo(T);
        const placed=[];const ordered=this.pins.slice().sort((a,b)=>Number(b.key===(this.priorityKey||this.selectedKey))-Number(a.key===(this.priorityKey||this.selectedKey)));
        for(const p of ordered){this.tmp.copy(p.pos).project(this.camera);let vis=this.showPins&&(!this.pinFilter||!p.key||this.pinFilter.has(p.key))&&(!p.scene||p.scene===this.labScene)&&this.tmp.z<1&&Math.abs(this.tmp.x)<1.02&&Math.abs(this.tmp.y)<1.02;
          if(vis&&p.key){const x=(this.tmp.x*.5+.5)*this.w,y=(-this.tmp.y*.5+.5)*this.h;if(placed.some(q=>Math.abs(q.x-x)<32&&Math.abs(q.y-y)<32))vis=false;else placed.push({x,y});}
          if(vis!==!p.hid){p.hid=!vis;p.el.hidden=!vis;}
          if(vis){p.el.style.transform=`translate(${((this.tmp.x*.5+.5)*this.w).toFixed(1)}px,${((-this.tmp.y*.5+.5)*this.h).toFixed(1)}px) translate(-50%,-50%)`;p.el.classList.toggle('far',this.camera.position.distanceTo(p.pos)>cd+.22);}}}
    }
  }

  function gaugeTex(label,ring,frac,max){return canvasTex(256,256,(g)=>{g.fillStyle='#F3F5F5';g.beginPath();g.arc(128,128,126,0,7);g.fill();g.lineWidth=16;g.strokeStyle=ring;g.beginPath();g.arc(128,128,116,0,7);g.stroke();
    g.strokeStyle='#1c2226';for(let i=0;i<=10;i++){const a=(135+27*i)*Math.PI/180,r2=i%5?86:78;g.lineWidth=i%5?3:5;g.beginPath();g.moveTo(128+Math.cos(a)*98,128+Math.sin(a)*98);g.lineTo(128+Math.cos(a)*r2,128+Math.sin(a)*r2);g.stroke();}
    g.fillStyle='#1c2226';g.font='600 22px sans-serif';g.textAlign='center';g.textBaseline='middle';[[0,'0'],[5,String(max/2)],[10,String(max)]].forEach(([i,s])=>{const a=(135+27*i)*Math.PI/180;g.fillText(s,128+Math.cos(a)*58,128+Math.sin(a)*58);});
    g.font='700 34px sans-serif';g.fillText(label,128,186);g.font='500 18px sans-serif';g.fillText('bar',128,214);
    const a=(135+270*frac)*Math.PI/180;g.strokeStyle='#C42638';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(128-Math.cos(a)*16,128-Math.sin(a)*16);g.lineTo(128+Math.cos(a)*92,128+Math.sin(a)*92);g.stroke();g.fillStyle='#222';g.beginPath();g.arc(128,128,10,0,7);g.fill();});}
  function labelTex(text,bg,fg){return canvasTex(256,64,(g)=>{g.fillStyle=bg;g.fillRect(0,0,256,64);g.fillStyle=fg;g.font='800 30px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(text,128,34);});}
  return{lin,std,glass,MAT,makeEnv,rbox,put,cylG,corrugated,canvasTex,lathe,Viewer,gaugeTex,labelTex};
}catch(e){console.error(e);return null;}})();
/* ───────────── TAM EKRAN ───────────── */
let fsCur=null;
function fsRecenter(st){const v=viewers.find(x=>x.el===st);if(!v)return;requestAnimationFrame(()=>{v.resize();if(!(v.keepView&&v.keepView()))v.reset();});}
const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement||null;
function fsBtns(){$$('.stage').forEach(st=>{const on=st===fsCur,b=st.querySelector('[data-fs]');if(b){b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?ATLAS.t("core.2"):ATLAS.t("core.3"));b.querySelector('span').textContent=on?ATLAS.t("core.4"):ATLAS.t("core.5");}
  const sb=st.querySelector('[data-side]');if(sb)sb.setAttribute('aria-pressed',!st.classList.contains('side-off'));});}
function fsRestore(st){if(!st)return;(st._moved||[]).slice().reverse().forEach(r=>r.parent.insertBefore(r.el,r.next&&r.next.parentNode===r.parent?r.next:null));
  st._moved=null;st.classList.remove('is-fs','pseudo','side-off');fsRecenter(st);document.documentElement.classList.remove('fs-lock');fsCur=null;fsBtns();}
function fsPseudo(st){st.classList.add('pseudo');document.documentElement.classList.add('fs-lock');}
function fsEnter(st){if(fsCur)fsRestore(fsCur);const side=st.querySelector('.fs-side');
  st._moved=(st.dataset.fsPanels||'').split(',').map(x=>x.trim()).filter(Boolean).map(sel=>{const el=$(sel);if(!el)return null;const r={el,parent:el.parentNode,next:el.nextSibling};side.appendChild(el);return r;}).filter(Boolean);
  st.classList.add('is-fs');fsCur=st;fsBtns();fsRecenter(st);
  const req=st.requestFullscreen||st.webkitRequestFullscreen;let pr=null;
  if(!req){fsPseudo(st);return;}
  try{pr=req.call(st);}catch(e){fsPseudo(st);return;}
  if(pr&&typeof pr.catch==='function')pr.catch(()=>{if(fsCur===st)fsPseudo(st);});
  else setTimeout(()=>{if(fsCur===st&&!fsEl())fsPseudo(st);},250);}
function fsExit(){const st=fsCur;if(!st)return;if(fsEl()){const ex=document.exitFullscreen||document.webkitExitFullscreen;try{const r=ex.call(document);if(r&&r.catch)r.catch(()=>fsRestore(st));}catch(e){fsRestore(st);}return;}fsRestore(st);}
['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>{if(!fsEl()&&fsCur&&!fsCur.classList.contains('pseudo'))fsRestore(fsCur);}));
document.addEventListener('keydown',e=>{if(!fsCur)return;if(e.key==='Escape'&&fsCur.classList.contains('pseudo')){fsRestore(fsCur);return;}
  if(/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName))return;const v=viewers.find(x=>x.el===fsCur);if(!v)return;
  const m={ArrowLeft:[40,0],ArrowRight:[-40,0],ArrowUp:[0,40],ArrowDown:[0,-40]}[e.key];
  if(m){e.preventDefault();v.auto=false;v.pan(m[0],m[1]);}else if(e.key==='+'||e.key==='='){v.zoom(.88);}else if(e.key==='-'){v.zoom(1.14);}});
$$('.stage').forEach(st=>{const b=st.querySelector('[data-fs]');b&&b.addEventListener('click',()=>{fsCur===st?fsExit():fsEnter(st);});
  const sb=st.querySelector('[data-side]');sb&&sb.addEventListener('click',()=>{st.classList.toggle('side-off');fsBtns();});});


/* ───────────── NAV ───────────── */
(function(){const navLinks=$$('.chapters a[href^="#"]');
  const secObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));});},{rootMargin:'-45% 0px -50% 0px'});
  $$('main section[id]').forEach(s=>secObs.observe(s));})();
/* ───────────── DÖNGÜ ───────────── */
const frameHooks=[];
(function(){let last=performance.now();function loop(now){const dt=Math.min((now-last)/1000,.1);last=now;for(const f of frameHooks)f(dt,now);for(const v of viewers)if(v.visible&&!v.el.hidden)v.frame(dt,now/1000);requestAnimationFrame(loop);}requestAnimationFrame(loop);})();
/* Keep the active chip visible inside a horizontally scrolling strip (phones) without moving the page. */
window.ATLAS_STRIP=el=>{const s=el&&el.parentElement;if(!s||s.scrollWidth<=s.clientWidth+1)return;s.scrollTo({left:el.offsetLeft-(s.clientWidth-el.offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
