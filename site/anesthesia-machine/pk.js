/* Farmakokinetik ve düşük akım · fizik sayfası modülü (core.js globallerini kullanır) */
(function(){
'use strict';
if(!$('#farmakokinetik'))return;

/* Kan/gaz ve doku/kan dağılım katsayıları (37 °C).
   Kaynak: Miller's Anesthesia / Eger tablosu (ScienceDirect "Blood-Gas Partition Coefficient" özeti);
   kan/gaz değerleri Yasuda ve ark. Masui 1991;40:1059 (PubMed 1920779).
   Ajan        kan/gaz  beyin  kas   yağ   MAC%
   N₂O          0,47    1,1   1,2   2,3   104
   Desfluran    0,42    1,3   2,0   27    6,0
   Sevofluran   0,65    1,7   3,1   48    2,0
   İzofluran    1,4     2,6   4,0   45    1,15
   Halotan      2,4     2,9   3,5   60    0,75 */
const AGENTS=[
  {k:'des',n:ATLAS.t("pk.1"),bg:.42,vrg:1.3,mus:2.0,fat:27,tok:'--a-des'},
  {k:'n2o',n:'N₂O',bg:.47,vrg:1.1,mus:1.2,fat:2.3,tok:'--a-n2o'},
  {k:'sevo',n:ATLAS.t("pk.2"),bg:.65,vrg:1.7,mus:3.1,fat:48,tok:'--a-sevo'},
  {k:'iso',n:ATLAS.t("pk.3"),bg:1.4,vrg:2.6,mus:4.0,fat:45,tok:'--a-iso'},
  {k:'hal',n:ATLAS.t("pk.4"),bg:2.4,vrg:2.9,mus:3.5,fat:60,tok:'--a-hal'}];
/* Doku grupları (Eger, 1974): damardan zengin grup 6 L / kalp debisinin %75'i, kas 33 L / %18,1, yağ 14,5 L / %5,4.
   Kalan ≈ %1,5 (damardan fakir grup) ihmal edildi; oranlar normalize edildi. */
const GROUPS=[{v:6,q:.75,key:'vrg'},{v:33,q:.181,key:'mus'},{v:14.5,q:.054,key:'fat'}];
const QS=GROUPS.reduce((a,g)=>a+g.q,0);
const FRC=2.5,T=60,DT=.005,N=Math.round(T/DT);

/* Tek ajan simülasyonu. FA: alveoler fraksiyon. Alım (L/dk saf gaz) = Q·λkan/gaz·(FA − Fv).
   Alveol dengesi: FRC·dFA/dt = (VA + alım + ek)·FI − VA·FA − alım
   (alımın yerine giren "artmış giriş" konsantrasyon etkisini, "ek" ise ikinci gazdan gelen akımı temsil eder). */
function sim(ag,o){const fa=new Float32Array(N+1),up=new Float32Array(N+1),P=[0,0,0];let FA=0;
  for(let i=0;i<=N;i++){const t=i*DT,FI=t<o.cut?o.FI:0;fa[i]=FA/o.FI;
    let Pv=0;for(let j=0;j<3;j++)Pv+=GROUPS[j].q/QS*P[j];
    const U=o.CO*ag.bg*(FA-Pv);up[i]=U;
    const ex=o.aug?o.aug[i]:0;
    const dFA=((o.VA+Math.max(U,0)+ex)*FI-o.VA*FA-U)/FRC;
    for(let j=0;j<3;j++){const g=GROUPS[j];P[j]+=DT*g.q/QS*o.CO*(FA-P[j])/(g.v*ag[g.key]);}
    FA=Math.max(0,FA+DT*dFA);}
  return{fa,up};}

/* ───── renk ve grafik yardımcıları ───── */
function tok(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#888';}
function chart(cv,cfg){const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(280,cv.clientWidth||600),h=Math.round(w*(cfg.ratio||.56));
  if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);}
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
  const ink=tok('--ink'),mut=tok('--muted'),line=tok('--line'),L=50,R=cfg.rp||16,Tp=16,B=40,pw=w-L-R,ph=h-Tp-B;
  const X=x=>L+x/cfg.xMax*pw,Y=y=>Tp+ph-(y/cfg.yMax)*ph;
  g.font='500 11px '+MONO;g.textBaseline='middle';
  cfg.yTicks.forEach(v=>{g.strokeStyle=line;g.lineWidth=1;g.setLineDash(v===0?[]:[3,4]);g.beginPath();g.moveTo(L,Y(v));g.lineTo(L+pw,Y(v));g.stroke();g.setLineDash([]);g.fillStyle=mut;g.textAlign='right';g.fillText(cfg.yFmt?cfg.yFmt(v):nf(v,1),L-6,Y(v));});
  g.textAlign='center';g.textBaseline='top';cfg.xTicks.forEach(v=>{g.strokeStyle=line;g.beginPath();g.moveTo(X(v),Tp+ph);g.lineTo(X(v),Tp+ph+4);g.stroke();g.fillStyle=mut;g.fillText(nf(v,1),X(v),Tp+ph+7);});
  g.fillStyle=mut;g.fillText(cfg.xLabel,L+pw/2,Tp+ph+23);
  g.save();g.translate(13,Tp+ph/2);g.rotate(-Math.PI/2);g.textBaseline='middle';g.fillText(cfg.yLabel,0,0);g.restore();
  (cfg.vlines||[]).forEach(v=>{g.strokeStyle=ink;g.globalAlpha=.55;g.setLineDash([5,4]);g.beginPath();g.moveTo(X(v.x),Tp);g.lineTo(X(v.x),Tp+ph);g.stroke();g.setLineDash([]);g.globalAlpha=1;g.fillStyle=ink;g.textAlign='left';g.textBaseline='top';g.fillText(v.label,X(v.x)+5,Tp+2);});
  const labs=[];
  cfg.series.forEach(s=>{g.strokeStyle=s.color;g.lineWidth=s.w||2.4;g.setLineDash(s.dash||[]);g.globalAlpha=s.alpha||1;g.lineJoin='round';g.beginPath();
    const step=Math.max(1,Math.floor(s.data.length/600));
    for(let i=0;i<s.data.length;i+=step){const x=X(i*s.dt),y=Y(Math.min(cfg.yMax,s.data[i]));if(i)g.lineTo(x,y);else g.moveTo(x,y);}
    g.stroke();g.setLineDash([]);g.globalAlpha=1;
    if(s.label&&s.labAt!=null){const i=Math.min(s.data.length-1,Math.round(s.labAt/s.dt));labs.push({y:Y(Math.min(cfg.yMax,s.data[i])),x:X(s.labAt),t:s.label,c:s.color});}});
  labs.sort((a,b)=>a.y-b.y);for(let i=1;i<labs.length;i++)if(labs[i].y-labs[i-1].y<13)labs[i].y=labs[i-1].y+13;
  g.font='600 11.5px '+MONO;g.textBaseline='middle';
  labs.forEach(l=>{const tw=g.measureText(l.t).width,x=Math.min(l.x+6,L+pw-tw-4);g.fillStyle=tok('--paper');g.globalAlpha=.85;g.fillRect(x-3,l.y-8,tw+6,16);g.globalAlpha=1;g.fillStyle=l.c;g.textAlign='left';g.fillText(l.t,x,l.y);});
}

/* ───── ilerleme olayı ───── */
const used={w:false,l:false};let sent=false;
function mark(k){used[k]=true;if(!sent&&used.w&&used.l){sent=true;document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'pk',id:'farmakokinetik',score:null,ok:true}}));}}

/* ═════ 1 · Wash-in / wash-out ═════ */
const sel=new Set(['des','sevo','iso','hal']);
$('#pkAgents').innerHTML=AGENTS.map(a=>`<button type="button" data-a="${a.k}" aria-pressed="${sel.has(a.k)}"><span class="sw" style="background:var(${a.tok})"></span>${a.n}</button>`).join('');
$('#pkAgents').addEventListener('click',e=>{const b=e.target.closest('button[data-a]');if(!b)return;const k=b.dataset.a;
  if(sel.has(k)){if(sel.size>1)sel.delete(k);}else sel.add(k);b.setAttribute('aria-pressed',sel.has(k));mark('w');wash();});
let wTimer=0;
function wash(){
  const CO=+$('#pkCO').value,VA=+$('#pkVA').value,FIn=+$('#pkFI').value/100,cut=+$('#pkCut').value,sec=$('#pkSecond').checked;
  $('#pkCOo').textContent=nf(CO);$('#pkVAo').textContent=nf(VA);$('#pkFIo').textContent=Math.round(FIn*100);$('#pkCuto').textContent=cut;
  const n2oAg=AGENTS.find(a=>a.k==='n2o');
  const aug=sec?sim(n2oAg,{CO,VA,FI:.7,cut}).up.map(u=>Math.max(0,u)):null;
  const series=[],rows=[];
  AGENTS.filter(a=>sel.has(a.k)).forEach(a=>{
    const isN=a.k==='n2o',FI=isN?(sec?.7:FIn):.02;
    const r=sim(a,{CO,VA,FI,cut,aug:isN?null:aug}),col=tok(a.tok);
    if(sec&&!isN){const base=sim(a,{CO,VA,FI,cut});series.push({data:base.fa,dt:DT,color:col,dash:[4,4],w:1.6,alpha:.6});}
    series.push({data:r.fa,dt:DT,color:col,label:a.n,labAt:cut});
    const at=t=>r.fa[Math.min(N,Math.round(t/DT))],f0=at(cut);let t50=null;
    for(let i=Math.round(cut/DT);i<=N;i++)if(r.fa[i]<=f0/2){t50=i*DT-cut;break;}
    rows.push([a.n,nf(a.bg,2),nf(at(5),2),nf(f0,2),nf(Math.min(T,cut+5)<=T?at(cut+5)/f0:0,2),t50==null?'> '+Math.round(T-cut)+ATLAS.t("pk.5"):nf(t50,1)+ATLAS.t("pk.6")]);});
  chart($('#pkWashCv'),{xMax:T,yMax:1,xTicks:[0,10,20,30,40,50,60],yTicks:[0,.25,.5,.75,1],yFmt:v=>nf(v,2),xLabel:ATLAS.t("pk.7"),yLabel:'FA / FI',series,vlines:[{x:cut,label:ATLAS.t("pk.8")}]});
  $('#pkWashTbl').innerHTML=ATLAS.t("pk.9")+rows.map(r=>'<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('')+'</tbody>';
  $('#pkWashNote').innerHTML=sec
    ?ATLAS.t("pk.10")
    :ATLAS.t("pk.11");
}
['pkCO','pkVA','pkFI','pkCut'].forEach(id=>$('#'+id).addEventListener('input',()=>{mark('w');clearTimeout(wTimer);wTimer=setTimeout(wash,30);}));
$('#pkSecond').addEventListener('change',()=>{mark('w');wash();});

/* ═════ 2 · Düşük akım ═════ */
const PKEY='anm-pk-price';
try{const v=store.get(PKEY,null);if(v!=null&&isFinite(v))$('#lfPrice').value=v;}catch(e){}
function simLF(FGF,FO2,dial,kg){const dt=.02,n=Math.round(T/dt),V=6000,Q=2*Math.pow(kg,.75),lam=.65,VO2=250;
  const fo=new Float32Array(n+1),ca=new Float32Array(n+1);let F=FO2,C=0,deficit=false,sumC=0;
  for(let i=0;i<=n;i++){const t=i*dt;fo[i]=F;ca[i]=C;sumC+=C;
    const U=C*lam*Q/Math.sqrt(Math.max(t,.5)),inflow=FGF*1000,ex=Math.max(0,inflow-VO2-U);
    if(inflow<VO2+U)deficit=true;
    F=clamp(F+dt*(inflow*FO2-VO2-ex*F)/V,0,1);
    C=Math.max(0,C+dt*(inflow*dial-100*U-ex*C)/V);}
  return{fo,ca,dt,deficit,F60:F,C60:C,Cavg:sumC/(n+1)};}
let lTimer=0;
function low(){
  const FGF=+$('#lfFGF').value,FO2=+$('#lfO2').value/100,dial=+$('#lfDial').value,kg=+$('#lfKg').value;
  let price=parseFloat($('#lfPrice').value);if(!isFinite(price)||price<0)price=0;
  $('#lfFGFo').textContent=nf(FGF);$('#lfO2o').textContent=Math.round(FO2*100);$('#lfDialo').textContent=nf(dial);$('#lfKgo').textContent=kg;
  const r=simLF(FGF,FO2,dial,kg),acc=tok('--accent'),sev=tok('--a-sevo'),ink=tok('--ink'),crit=tok('--crit');
  chart($('#lfO2Cv'),{ratio:.45,xMax:T,yMax:1,xTicks:[0,10,20,30,40,50,60],yTicks:[0,.25,.5,.75,1],yFmt:v=>ATLAS.percent(Math.round(v*100)),xLabel:ATLAS.t("pk.12"),yLabel:'FiO₂',
    series:[{data:new Float32Array(r.fo.length).fill(FO2),dt:r.dt,color:ink,dash:[6,4],w:1.6,label:ATLAS.t("pk.13"),labAt:2},{data:r.fo,dt:r.dt,color:r.F60<.3?crit:acc,label:ATLAS.t("pk.14"),labAt:52}]});
  const yMax=Math.max(3,Math.ceil(dial*1.15));
  chart($('#lfAgCv'),{ratio:.45,xMax:T,yMax,xTicks:[0,10,20,30,40,50,60],yTicks:[0,yMax/2,yMax].map(v=>+v.toFixed(1)),yFmt:v=>nf(v,1),xLabel:ATLAS.t("pk.15"),yLabel:ATLAS.t("pk.16"),
    series:[{data:new Float32Array(r.ca.length).fill(dial),dt:r.dt,color:ink,dash:[6,4],w:1.6,label:ATLAS.t("pk.17"),labAt:2},{data:new Float32Array(r.ca.length).fill(2),dt:r.dt,color:tok('--muted'),dash:[2,4],w:1.2,label:ATLAS.t("pk.18"),labAt:30},{data:r.ca,dt:r.dt,color:sev,label:ATLAS.t("pk.19"),labAt:52}]});
  const ml=3*FGF*dial,cost=ml/250*price,bottleH=ml>0?250/ml:Infinity,macH=r.Cavg/2;
  let ca='ok',ct=ATLAS.t("pk.20");
  if(dial>0&&FGF<1){ca='crit';ct=ATLAS.t("pk.21");}
  else if(dial>0&&FGF<2){ca=macH>2?'crit':'warn';ct=ATLAS.t("pk.22");}
  else if(dial===0){ct=ATLAS.t("pk.23");}
  const rows=[[ATLAS.t("pk.24"),ATLAS.percent(Math.round(FO2*100))],[ATLAS.t("pk.25"),ATLAS.percent(Math.round(r.F60*100)),r.F60<.3?'crit':''],
    [ATLAS.t("pk.26"),ATLAS.percent(nf(dial))],[ATLAS.t("pk.27"),ATLAS.percent(nf(r.C60,2))],[ATLAS.t("pk.28"),ATLAS.percent((dial>0?Math.round(r.C60/dial*100):0))],
    [ATLAS.t("pk.29"),'≈ '+nf(ml,1)+ATLAS.t("pk.30")],[ATLAS.t("pk.31"),'≈ '+nf(cost,0)+ATLAS.t("pk.32")],[ATLAS.t("pk.33"),'≈ '+(isFinite(bottleH)?nf(bottleH,1)+ATLAS.t("pk.34"):'—')],
    [ATLAS.t("pk.35"),'≈ '+nf(macH,2)],[ATLAS.t("pk.36"),ct,ca]];
  $('#lfTbl').innerHTML=ATLAS.t("pk.37")+rows.map(([k,v,c])=>`<tr><td>${k}</td><td class="${c||''}">${v}</td></tr>`).join('')+'</tbody>';
  const n=$('#lfNote');n.className='note pk-small';
  if(r.deficit&&FGF*1000<250){n.classList.add('crit');n.textContent=ATLAS.t("pk.38");}
  else if(r.F60<.3){n.classList.add('crit');n.textContent=ATLAS.t("pk.39")+Math.round(r.F60*100)+ATLAS.t("pk.40");}
  else if(dial>0&&r.C60<dial*.6){n.classList.add('warn');n.textContent=ATLAS.t("pk.41")+nf(r.C60,1)+ATLAS.t("pk.42")+nf(dial,1)+ATLAS.t("pk.43");}
  else n.textContent=ATLAS.t("pk.44");
}
['lfFGF','lfO2','lfDial','lfKg'].forEach(id=>$('#'+id).addEventListener('input',()=>{mark('l');clearTimeout(lTimer);lTimer=setTimeout(low,30);}));
$('#lfPrice').addEventListener('input',()=>{mark('l');const v=parseFloat($('#lfPrice').value);if(isFinite(v)&&v>=0)store.set(PKEY,v);low();});

/* ───── ilk çizim, yeniden boyutlandırma ve tema değişimi ───── */
function all(){wash();low();}
all();
if('ResizeObserver' in window){let rt=0;const ro=new ResizeObserver(()=>{clearTimeout(rt);rt=setTimeout(all,80);});['#pkWashCv','#lfO2Cv'].forEach(s=>ro.observe($(s)));}
try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',all);}catch(e){}
new MutationObserver(all).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
})();
