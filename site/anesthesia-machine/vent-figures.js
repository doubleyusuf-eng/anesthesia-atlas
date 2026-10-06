'use strict';
/* Annotated waveform figures for the ventilator glossary. Each figure is computed from the same
   single-compartment lung as the simulator (Paw = PEEP + V/C + R·V̇ − Pmus) and drawn as static SVG.
   Never reads or changes simulator state. */
window.VENT_FIGURES=(() => {
  const COL={P:'#FF9A4A',F:'#7FB2FF',V:'#EDEFF0',M:'#C79BFF',A:'#54E3B0',W:'#FF6B8B',G:'#8DA2B0',bg:'#04080B',grid:'#16252E'};
  const L=k=>ATLAS.ui('ventFig.l.'+k);
  const fmt=(x,d=0)=>Number(x).toLocaleString(ATLAS.locale,{minimumFractionDigits:d,maximumFractionDigits:d});
  const mL=v=>fmt(Math.round(v/10)*10);
  const pct=x=>ATLAS.percent(Math.round(x));
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

  /* ── lung model ── breaths: {t0,type:'VC'|'PC'|'PS',vt(L),ti,pause,p,rise,cyc,trig:'flow'|'p',thr,R,C,peep} */
  function sim(o){
    const dt=.004,n=Math.round(o.dur/dt)+1,out={t:[],P:[],F:[],V:[],M:[],b:[]};
    let R=o.R??10,C=o.C??.05,peep=o.peep??5,V=o.v0||0,ph='exp',tin=0,peakF=0,cur=null,bi=-1;
    const br=(o.breaths||[]).map(b=>({...b})).sort((a,b)=>a.t0-b.t0);
    const pm=t=>{let s=0;for(const e of o.efforts||[])if(t>=e.t0&&t<e.t0+e.d)s+=e.a*Math.sin(Math.PI*(t-e.t0)/e.d);return s;};
    const hold=t=>(o.holds||[]).some(h=>t>=h[0]&&t<h[1]);
    for(let k=0;k<n;k++){
      const t=k*dt,m=pm(t);let P,F;
      for(const st of o.steps||[])if(Math.abs(t-st.t)<dt/2)peep=st.peep;
      if(ph==='exp'){const nb=br[bi+1];
        if(nb&&t>=nb.t0){const go=nb.trig==='flow'?(m-V/C)/R>nb.thr:nb.trig==='p'?V/C-m<-nb.thr:true;
          if(go){bi++;cur=nb;ph='insp';tin=0;peakF=0;if(cur.R)R=cur.R;if(cur.C)C=cur.C;if(cur.peep!=null)peep=cur.peep;
            if(typeof cur.p==='function')cur.p=cur.p(out.b,C);Object.assign(cur,{ts:t,v0:V,pmax:-1e9,tmax:t,peepAt:peep});out.b.push(cur);}}}
      if(ph==='insp'){const b=cur;tin+=dt;let done=false;
        if(b.type==='VC'){const Tf=b.ti*(1-(b.pause??.1));F=tin<=Tf?b.vt/Tf:0;P=peep+V/C+R*F-m;if(tin>Tf){b.pplat=P;b.tp=t;}done=tin>=b.ti;}
        else{P=peep+b.p*(1-Math.exp(-tin/(b.rise??.05)));F=(P-peep-V/C+m)/R;peakF=Math.max(peakF,F);b.peakF=peakF*60;
          done=b.type==='PC'||b.ti?tin>=b.ti:tin>.12&&F<(b.cyc??.25)*peakF;}
        if(P>b.pmax){b.pmax=P;b.tmax=t;}
        if(done){b.te=t;ph='exp';b.vtOut=(V+F*dt-b.v0)*1000;}}
      else if(P===undefined){
        const nb=br[bi+1];
        if(hold(t)){F=0;P=peep+V/C;}
        else if(nb&&nb.trig==='p'&&t>=nb.t0){F=0;P=peep+V/C-m;}
        else{const k2=o.cpap||0;F=(m-V/C)/(R+k2);P=peep-k2*F;}
      }
      V+=F*dt;out.t.push(t);out.P.push(P);out.F.push(F*60+(o.osc&&ph==='exp'?o.osc.a*Math.sin(2*Math.PI*o.osc.f*t):0));out.V.push(V*1000);out.M.push(m);
    }
    out.at=(key,t)=>out[key][clamp(Math.round(t/dt),0,n-1)];
    out.peep=()=>peep;
    return out;
  }

  /* ── drawing ── */
  const NICE=[1,2,5,10,15,20,25,30,40,50,60,80,100,120,150,200,300,400,500,600,800,1000,1200,1500];
  const nice=v=>NICE.find(q=>q>=v)||Math.ceil(v/500)*500;
  let W=560;const LM=58,RM=14;
  let uid=0;
  function txt(x,y,s,c,o={}){
    // keep labels inside the frame (monospace width estimate)
    const w=String(s).length*(o.fs||12.5)*.61,a=o.a||'start',l=a==='start'?x:a==='end'?x-w:x-w/2;x+=Math.max(0,3-l)-Math.max(0,l+w-(W-3));
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" fill="${c}" text-anchor="${o.a||'start'}" font-size="${o.fs||12.5}" font-weight="${o.fw||600}" class="vf-t"${o.plain?' style="stroke:none"':''}>${esc(s)}</text>`;}
  function arrowY(x,y0,y1,c){const d=y1>y0?1:-1,h=5;return `<path d="M${x} ${y0}V${y1}M${x-h} ${y0+d*h}L${x} ${y0}L${x+h} ${y0+d*h}M${x-h} ${y1-d*h}L${x} ${y1}L${x+h} ${y1-d*h}" stroke="${c}" stroke-width="1.6" fill="none"/>`;}
  function arrowX(x0,x1,y,c){const h=5;return `<path d="M${x0} ${y}H${x1}M${x0+h} ${y-h}L${x0} ${y}L${x0+h} ${y+h}M${x1-h} ${y-h}L${x1} ${y}L${x1-h} ${y+h}" stroke="${c}" stroke-width="1.6" fill="none"/>`;}
  // annotations, in data units; X/Y map them to pixels, (x0,x1,y0,y1) is the plot box
  function ann(list,X,Y,box,series){
    let s='';
    for(const a of list){const c=a.c||COL.A,lab=a.label;
      if(a.k==='h'){const y=Y(a.y),xa=a.x0!=null?X(a.x0):box.x0,xb=a.x1!=null?X(a.x1):box.x1;
        s+=`<path d="M${xa} ${y}H${xb}" stroke="${c}" stroke-width="1.3" stroke-dasharray="${a.solid?'':'5 4'}" fill="none"/>`;
        if(lab){const right=a.at!=='l';s+=txt(right?xb-4:xa+4,a.below?y+15:y-5,lab,c,{a:right?'end':'start'});}}
      else if(a.k==='v'){const x=X(a.t);s+=`<path d="M${x} ${box.y0}V${box.y1}" stroke="${c}" stroke-width="1.2" stroke-dasharray="4 4"/>`;if(lab)s+=txt(x+(a.a==='end'?-4:4),box.y0+13+(a.dy||0),lab,c,{a:a.a||'start'});}
      else if(a.k==='brY'){const x=X(a.t),ya=Y(a.y0),yb=Y(a.y1);s+=arrowY(x,ya,yb,c);if(lab)s+=txt(x+(a.side==='l'?-8:8),(ya+yb)/2+4,lab,c,{a:a.side==='l'?'end':'start'});}
      else if(a.k==='brX'){const xa=X(a.t0),xb=X(a.t1),y=Y(a.y);s+=arrowX(xa,xb,y,c);if(lab)s+=txt(a.lx!=null?X(a.lx):(xa+xb)/2,y+(a.below?16:-7),lab,c,{a:a.lx!=null?(a.a||'start'):'middle'});}
      else if(a.k==='dot'){const x=X(a.t),y=Y(a.y);s+=`<circle cx="${x}" cy="${y}" r="4.2" fill="${c}" stroke="${COL.bg}" stroke-width="1.5"/>`;if(lab)s+=txt(x+(a.dx??8),y+(a.dy??-8),lab,c,{a:a.a});}
      else if(a.k==='txt'){s+=txt(X(a.t),Y(a.y),lab,c,{a:a.a||'middle',fs:a.fs});}
      else if(a.k==='span'){const xa=X(a.t0),xb=X(a.t1);if(a.only){if(lab)s+=txt((xa+xb)/2,box.y0+13,lab,c,{a:'middle'});}else s+=`<rect x="${xa}" y="${box.y0}" width="${Math.max(0,xb-xa)}" height="${box.y1-box.y0}" fill="${c}" opacity=".16"/>`;}
      else if(a.k==='fill'){const {t,y}=series;let d='';for(let i=0;i<t.length;i+=2){if(t[i]<a.t0||t[i]>a.t1)continue;const v=a.pos?Math.max(a.base??0,y[i]):a.neg?Math.min(a.base??0,y[i]):y[i];d+=(d?'L':'M')+X(t[i]).toFixed(1)+' '+Y(v).toFixed(1);}
        if(a.only){if(lab)s+=txt(X(a.lt??(a.t0+a.t1)/2),Y(a.ly),lab,c,{a:'middle'});}
        else if(d)s+=`<path d="${d}L${X(a.t1).toFixed(1)} ${Y(a.base??0).toFixed(1)}L${X(a.t0).toFixed(1)} ${Y(a.base??0).toFixed(1)}Z" fill="${c}" opacity="${a.op??.22}"/>`;}
      else if(a.k==='band'){const ya=Y(a.y1),yb=Y(a.y0);s+=`<rect x="${box.x0}" y="${ya}" width="${box.x1-box.x0}" height="${yb-ya}" fill="${c}" opacity=".16"/>`;}
    }
    return s;
  }
  function path(t,y,X,Y,t0,t1){let d='',step=Math.max(1,Math.floor(t.length/900));for(let i=0;i<t.length;i+=step){if(t[i]<t0-.01||t[i]>t1+.01)continue;d+=(d?'L':'M')+X(t[i]).toFixed(1)+' '+Y(y[i]).toFixed(1);}return d;}
  /* panels: [{y:[], c, min,max, label, unit, ann, h, extra:[{y,c,dash}]}], all sharing r.t */
  function chart(r,panels,o={}){
    const id='vf'+(++uid),t0=o.t0??0,t1=o.t1??r.t[r.t.length-1],top=o.marks?.length?24:4,gap=10;
    let y=top,s='',defs='';
    const X=t=>LM+(t-t0)/(t1-t0)*(W-LM-RM);
    for(const [i,p] of panels.entries()){
      const h=p.h||104,t=p.t||r.t;y+=17;
      let max=p.max,min=p.min;
      if(max==null){let m=0;for(let j=0;j<t.length;j++)if(t[j]>=t0&&t[j]<=t1)m=Math.max(m,Math.abs(p.y[j]));max=nice(m*1.12);}
      if(min==null)min=p.sym?-max:0;
      const Y=v=>y+h-(v-min)/(max-min)*h,box={x0:LM,x1:W-RM,y0:y,y1:y+h};
      const ticks=p.ticks||(p.sym?[min,0,max]:[min,(min+max)/2,max]);
      for(const v of ticks){const yy=Y(v);s+=`<path d="M${LM} ${yy}H${W-RM}" stroke="${COL.grid}" stroke-dasharray="${v===0?'':'3 5'}"/>`+txt(LM-7,yy+4,fmt(v,Number.isInteger(v)?0:1),COL.G,{a:'end',fs:11,fw:500});}
      defs+=`<clipPath id="${id}c${i}"><rect x="${LM}" y="${y-1}" width="${W-LM-RM}" height="${h+2}"/></clipPath>`;
      s+=`<g clip-path="url(#${id}c${i})">`+ann((p.ann||[]).filter(a=>a.k==='band'||a.k==='span'||a.k==='fill'),X,Y,box,{t,y:p.y});
      for(const e of p.extra||[])s+=`<path d="${path(e.t||t,e.y,X,Y,t0,t1)}" stroke="${e.c||COL.G}" stroke-width="${e.w||1.6}" stroke-dasharray="${e.dash||''}" fill="none" stroke-linejoin="round"/>`;
      s+=`<path d="${path(t,p.y,X,Y,t0,t1)}" stroke="${p.c}" stroke-width="2.2" fill="none" stroke-linejoin="round"/></g>`;
      s+=txt(LM,y-7,p.label+(p.unit?' · '+p.unit:''),p.c,{fs:11.5,fw:700});
      s+=ann((p.ann||[]).filter(a=>a.k!=='band').map(a=>a.k==='span'||a.k==='fill'?{...a,only:true}:a),X,Y,box,{t,y:p.y});
      y+=h+gap;
    }
    const yb=y-gap;
    for(const m of o.marks||[]){const x=X(m.t),c=m.c||COL.A;s+=`<path d="M${x} ${top-4}V${yb}" stroke="${c}" stroke-opacity=".35" stroke-dasharray="2 4"/>`+(m.miss?`<path d="M${x-4.5} ${top-13}L${x+4.5} ${top-4}M${x+4.5} ${top-13}L${x-4.5} ${top-4}" stroke="${c}" stroke-width="2.2"/>`:`<path d="M${x-5} ${top-4}L${x} ${top-13}L${x+5} ${top-4}Z" fill="${c}"/>`);if(m.label)s+=txt(x+8,top-5,m.label,c,{fs:11.5});}
    const span=t1-t0,stepT=span>40?10:span>14?2:1;
    for(let v=0;v<=span+1e-6;v+=stepT){const x=X(t0+v);if(x>W-RM-18)break;s+=`<path d="M${x} ${yb}v4" stroke="${COL.G}"/>`+txt(x,yb+17,fmt(v),COL.G,{a:'middle',fs:11,fw:500});}
    s+=txt(W-RM,yb+17,'s',COL.G,{a:'end',fs:11,fw:500});
    const H=yb+24;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs><rect width="${W}" height="${H}" fill="${COL.bg}"/>${s}</svg>`;
  }
  // x–y chart (P–V loop, PBW line)
  function xy(o){
    const H=o.h||300,T=14,B=H-40,X=v=>LM+(v-o.x[0])/(o.x[1]-o.x[0])*(W-LM-RM),Y=v=>B-(v-o.y[0])/(o.y[1]-o.y[0])*(B-T);
    let s='';
    for(const v of o.yt){const yy=Y(v);s+=`<path d="M${LM} ${yy}H${W-RM}" stroke="${COL.grid}" stroke-dasharray="3 5"/>`+txt(LM-7,yy+4,fmt(v),COL.G,{a:'end',fs:11,fw:500});}
    for(const v of o.xt){const xx=X(v);s+=`<path d="M${xx} ${T}V${B}" stroke="${COL.grid}" stroke-dasharray="3 5"/>`+txt(xx,B+16,fmt(v),COL.G,{a:'middle',fs:11,fw:500});}
    for(const e of o.series)s+=`<path d="${e.x.map((v,i)=>(i?'L':'M')+X(v).toFixed(1)+' '+Y(e.y[i]).toFixed(1)).join('')}" stroke="${e.c}" stroke-width="${e.w||2.2}" stroke-dasharray="${e.dash||''}" fill="none"/>`;
    s+=ann(o.ann||[],X,Y,{x0:LM,x1:W-RM,y0:T,y1:B});
    s+=txt(W-RM,H-6,o.xl,COL.G,{a:'end',fs:11.5})+txt(LM+6,T+12,o.yl,COL.G,{fs:11.5});
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="${COL.bg}"/>${s}</svg>`;
  }

  /* ── panel shorthands ── */
  const P=(r,o={})=>({y:r.P,c:COL.P,label:'Paw',unit:'cmH₂O',...o});
  const F=(r,o={})=>({y:r.F,c:COL.F,label:ATLAS.t("app.483"),unit:ATLAS.t("app.484"),sym:true,...o});
  const V=(r,o={})=>({y:r.V,c:COL.V,label:ATLAS.t("app.485"),unit:'mL',...o});
  const M=(r,o={})=>({y:r.M,c:COL.M,label:'Pmus',unit:'cmH₂O',h:70,...o});
  const VC=(t0,o={})=>({t0,type:'VC',vt:.5,ti:1.2,pause:.25,...o});
  const PS=(t0,o={})=>({t0,type:'PS',p:10,trig:'flow',thr:2/60,...o});
  const PC=(t0,o={})=>({t0,type:'PC',p:12,ti:1.2,...o});
  const eff=(t0,a=4,d=.9)=>({t0,a,d});
  const peepLine=(y,o={})=>({k:'h',y,label:'PEEP '+fmt(y),c:COL.G,at:'l',below:true,...o});
  const trig=b=>({t:b.ts});
  const miss=t=>({t,miss:true,c:COL.W});

  /* ── one figure per glossary term ── */
  const FIG={
    ppeak(){const r=sim({dur:6.6,R:12,breaths:[VC(.3),VC(3.6)]}),b=r.b[0];
      return chart(r,[P(r,{max:30,ticks:[0,15,30],ann:[peepLine(5),{k:'h',y:b.pplat,x0:b.ts,label:'Pplat '+fmt(b.pplat),c:COL.G},{k:'brY',t:b.tmax+.06,y0:b.pplat,y1:b.pmax,label:L('res')},{k:'dot',t:b.tmax,y:b.pmax,label:'Ppeak '+fmt(b.pmax),dx:-8,a:'end'}]}),F(r,{max:60})]);},
    pplat(){const r=sim({dur:6.6,breaths:[VC(.3,{ti:1.5,pause:.4}),VC(3.6,{ti:1.5,pause:.4})]}),b=r.b[0],tf=b.ts+b.ti*.6;
      return chart(r,[P(r,{max:30,ticks:[0,15,30],ann:[{k:'span',t0:tf,t1:b.te,label:L('hold'),c:COL.A},peepLine(5),{k:'dot',t:b.tp,y:b.pplat,label:'Pplat '+fmt(b.pplat),dy:-10},{k:'dot',t:b.tmax,y:b.pmax,label:'Ppeak',c:COL.G,dx:-8,a:'end'}]}),
        F(r,{max:60,ann:[{k:'span',t0:tf,t1:b.te,c:COL.A},{k:'txt',t:(tf+b.te)/2,y:12,label:L('flow0')}]})]);},
    peep(){const r=sim({dur:6.6,breaths:[VC(.3),VC(3.6)]});
      return chart(r,[P(r,{max:30,ticks:[0,15,30],ann:[{k:'band',y0:0,y1:5},{k:'h',y:5,solid:true,label:'PEEP 5 cmH₂O',at:'r',x0:2,below:false},{k:'brY',t:2.9,y0:0,y1:5,side:'l',label:L('notZero')}]}),F(r,{max:60})]);},
    'total-peep'(){const r=sim({dur:11.4,R:20,breaths:[0,2.5,5,7.5].map(t=>VC(t,{ti:1,pause:.1}))
        ,holds:[[10,11.2]]}),tot=r.at('P',11.1);
      return chart(r,[P(r,{max:32,ticks:[0,5,16,32],h:160,ann:[{k:'span',t0:10,t1:11.2,label:L('expHold')},{k:'h',y:5,label:L('setPeep')+' 5',c:COL.G,x1:10,at:'r',below:true},{k:'brY',t:10.9,y0:5,y1:tot,side:'l',label:'iPEEP '+fmt(tot-5)},{k:'dot',t:11.15,y:tot,label:L('totalPeep')+' '+fmt(tot),dx:-6,dy:-12,a:'end'}]}),
        F(r,{max:60,ann:[{k:'span',t0:10,t1:11.2,c:COL.A}]})],{t0:4.6,t1:11.4});},
    'auto-peep'(){const r=sim({dur:10.3,R:20,breaths:[0,2.5,5,7.5,10].map(t=>VC(t,{ti:1,pause:.1}))}),b=r.b[3],f=r.at('F',b.ts-.01),v=r.at('V',b.ts-.01);
      return chart(r,[F(r,{max:60,ann:[{k:'dot',t:b.ts-.02,y:f,c:COL.W,label:L('flowNotZero'),dx:-8,dy:16,a:'end'},{k:'dot',t:r.b[2].ts-.02,y:r.at('F',r.b[2].ts-.01),c:COL.W}]}),
        V(r,{max:800,ticks:[0,400,800],ann:[{k:'h',y:0,solid:true,c:COL.G},{k:'brY',t:b.ts-.06,y0:0,y1:v,side:'l',c:COL.W,label:L('trapped')}]})],{t0:4.4,t1:10.3});},
    driving(){const r=sim({dur:6.6,peep:8,breaths:[VC(.3,{vt:.6,ti:1.5,pause:.35}),VC(3.6,{vt:.6,ti:1.5,pause:.35})]}),b=r.b[0],tm=b.te-.15;
      return chart(r,[P(r,{max:30,ticks:[0,10,20,30],h:150,ann:[{k:'h',y:b.pplat,x0:b.tmax,label:'Pplat '+fmt(b.pplat),c:COL.G},peepLine(8),{k:'brY',t:tm,y0:8,y1:b.pplat,label:'ΔP = '+fmt(b.pplat)+' − '+fmt(8)+' = '+fmt(b.pplat-8)},{k:'dot',t:b.tmax,y:b.pmax,label:'Ppeak',c:COL.G,dx:-8,a:'end'}]})]);},
    pinsp(){const r=sim({dur:6.6,breaths:[PC(.3,{p:10}),PC(3.6,{p:10})]}),b=r.b[0];
      return chart(r,[P(r,{max:20,ticks:[0,5,10,15,20],ann:[peepLine(5),{k:'h',y:15,label:'PEEP + Pinsp = 15',x0:b.ts,c:COL.G},{k:'brY',t:b.ts+.7,y0:5,y1:15,label:'Pinsp 10'}]}),F(r,{max:80}),
        V(r,{max:600,ticks:[0,300,600],ann:[{k:'dot',t:b.te,y:b.vtOut,label:'Vt ≈ '+mL(b.vtOut)+' mL · '+L('result')}]})]);},
    ps(){const r=sim({dur:6.6,efforts:[eff(.3),eff(3.6)],breaths:[PS(.3),PS(3.6)]}),b=r.b[0];
      return chart(r,[P(r,{max:20,ticks:[0,5,10,15,20],ann:[peepLine(5),{k:'brY',t:b.ts+.45,y0:5,y1:15,label:'PS 10'}]}),F(r),M(r,{max:10,ticks:[0,10]})],{marks:r.b.map(b=>({t:b.ts,label:L('patient')}))});},
    pmean(){const r=sim({dur:8.2,breaths:[PC(.2,{p:15}),PC(4.2,{p:15})]});let s=0,n=0;r.t.forEach((t,i)=>{if(t>=.2&&t<8.2){s+=r.P[i];n++;}});const pm=s/n;
      return chart(r,[P(r,{max:25,ticks:[0,10,20],h:150,ann:[{k:'fill',t0:.2,t1:8.2,base:0,op:.2},{k:'h',y:pm,solid:true,label:'Pmean ≈ '+fmt(pm,1),x1:3.9},{k:'dot',t:r.b[0].tmax,y:r.b[0].pmax,label:'Ppeak '+fmt(r.b[0].pmax),c:COL.G}]})],{t0:0,t1:8.2});},
    vt(){const r=sim({dur:6.6,breaths:[VC(.3,{pause:.1}),VC(3.6,{pause:.1})]}),b=r.b[0];
      return chart(r,[F(r,{max:60,ann:[{k:'fill',t0:b.ts,t1:b.te,pos:true,label:L('area'),ly:40,lt:b.ts+.55}]}),
        V(r,{max:600,ticks:[0,300,600],ann:[{k:'brY',t:b.te+.1,y0:0,y1:b.vtOut,label:'Vt '+mL(b.vtOut)+' mL'}]})]);},
    pbw(){const hs=[150,195],m=h=>50+.91*(h-152.4),f=h=>45.5+.91*(h-152.4);
      return xy({x:hs,y:[40,95],xt:[150,160,170,180,190],yt:[40,55,70,85],xl:L('height'),yl:'PBW · kg',
        series:[{x:hs,y:hs.map(m),c:COL.A},{x:hs,y:hs.map(f),c:COL.M}],
        ann:[{k:'txt',t:189,y:m(189)+5,label:'♂ 50 + '+fmt(.91,2)+' × (cm − '+fmt(152.4,1)+')',c:COL.A,a:'end'},
          {k:'txt',t:194,y:57,label:'♀ '+fmt(45.5,1)+' + '+fmt(.91,2)+' × (cm − '+fmt(152.4,1)+')',c:COL.M,a:'end'},
          {k:'dot',t:170,y:m(170),label:'170 cm ♂ → '+fmt(m(170))+' kg',dx:-8,dy:-4,a:'end'},
          {k:'txt',t:151,y:76,label:'6–8 mL/kg → '+fmt(m(170)*6)+'–'+fmt(m(170)*8)+' mL',c:COL.A,a:'start'},
          {k:'dot',t:160,y:f(160),label:'160 cm ♀ → '+fmt(f(160))+' kg',c:COL.M,dx:10,dy:16}]});},
    rr(){const r=sim({dur:15.4,breaths:[.3,5.3,10.3].map(t=>VC(t,{ti:1.67,pause:.1}))});
      return chart(r,[P(r,{max:30,ticks:[0,15,30],h:80}),V(r,{max:800,ticks:[0,400,800],ann:[{k:'brX',t0:.3,t1:5.3,y:680,label:'60 / 12 = 5 s'}]})],{marks:r.b.map((b,i)=>({t:b.ts,label:String(i+1)}))});},
    mv(){const r=sim({dur:60.3,breaths:Array.from({length:12},(_,i)=>VC(.3+i*5,{ti:1.67,pause:.1}))});let c=0;const cum=r.F.map((f,i)=>(c+=Math.max(0,f)/60*.004));
      return chart(r,[V(r,{max:600,ticks:[0,500],h:70}),{y:cum,c:COL.A,label:L('cumVol'),unit:'L',max:8,ticks:[0,2,4,6,8],h:120,
        ann:[{k:'dot',t:60.2,y:cum[cum.length-1],label:'MV = '+fmt(.5,1)+' L × 12 = 6 L/'+L('min').replace(/^\//,''),dx:-8,a:'end'}]}],{t0:0,t1:60.3});},
    ie(){const r=sim({dur:6.6,breaths:[VC(.3,{ti:5/3,pause:.1}),VC(5.3,{ti:5/3,pause:.1})]}),b=r.b[0];
      return chart(r,[P(r,{max:30,ticks:[0,15,30],ann:[{k:'txt',t:3.6,y:22,label:'I : E = '+fmt(5/3,2)+' : '+fmt(10/3,2)+' = 1 : 2',fs:13.5}]}),
        F(r,{max:60,ann:[{k:'span',t0:b.ts,t1:b.te,label:'I · '+fmt(5/3,2)+' s'},{k:'span',t0:b.te,t1:5.3,label:'E · '+fmt(10/3,2)+' s',c:COL.F}]})]);},
    ti(){const r=sim({dur:8.4,efforts:[eff(.25,2,.7),eff(4.25,2,.7)],breaths:[PC(.3,{p:12,trig:'flow',thr:.03}),PC(4.3,{p:12,trig:'flow',thr:.03})]}),b=r.b[0];
      return chart(r,[P(r,{max:24,ticks:[0,12,24],ann:[{k:'brX',t0:b.ts,t1:b.te,y:20,label:'Ti '+fmt(b.te-b.ts,1)+' s'},{k:'brX',t0:b.te,t1:r.b[1].ts,y:20,label:'Te '+fmt(r.b[1].ts-b.te,1)+' s',c:COL.F}]}),F(r),
        M(r,{max:4,ticks:[0,4],ann:[{k:'brX',t0:.25,t1:.95,y:3.2,label:L('effortTime')+' '+fmt(.7,1)+' s',lx:1.1}]})]);},
    flow(){const r=sim({dur:7,breaths:[VC(.3,{pause:.1}),PC(3.8,{p:11})]}),[a,b]=r.b;
      return chart(r,[F(r,{max:80,h:130,ann:[{k:'fill',t0:a.ts,t1:a.te,pos:true},{k:'fill',t0:b.ts,t1:b.te,pos:true},{k:'fill',t0:a.te,t1:b.ts,neg:true,c:COL.F},{k:'fill',t0:b.te,t1:7,neg:true,c:COL.F},
          {k:'txt',t:a.ts+.2,y:45,label:'VCV · '+L('square'),a:'start'},{k:'txt',t:b.ts+.3,y:66,label:'PCV · '+L('decel'),a:'start'},{k:'txt',t:2.4,y:-62,label:L('expNeg'),c:COL.F}]}),V(r,{max:600,ticks:[0,300,600],h:80})]);},
    fio2(){const rows=[[.21,L('air')],[.5,''],[1,'']];let s='';const x0=118,x1=W-RM-6,bw=x1-x0;
      rows.forEach(([f,note],i)=>{const y=22+i*58;s+=txt(x0-12,y+21,'FiO₂ '+fmt(f,2),COL.V,{a:'end',fs:13.5,fw:700})+`<rect x="${x0}" y="${y}" width="${bw}" height="30" rx="5" fill="#2A3740"/><rect x="${x0}" y="${y}" width="${bw*f}" height="30" rx="5" fill="${COL.A}"/>`+
        txt(x0+8,y+20,'O₂ '+pct(f*100),COL.bg,{fs:12.5,fw:800,plain:true})+(f<1?txt(x1-8,y+20,'N₂ + '+L('other'),COL.V,{a:'end',fs:12}):'')+(note?txt(x0,y+46,note,COL.G,{fs:11.5}):'');});
      return `<svg viewBox="0 0 ${W} 200" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="200" fill="${COL.bg}"/>${s}</svg>`;},
    compliance(){const pa=5+500/50,pb=5+500/25;
      return xy({x:[0,40],y:[0,720],xt:[0,10,20,30,40],yt:[0,200,400,600],xl:'Paw · cmH₂O',yl:ATLAS.t("app.485")+' · mL',h:310,
        series:[{x:[5,pa],y:[0,500],c:COL.A,w:3},{x:[5,pb],y:[0,500],c:COL.W,w:3},{x:[0,40],y:[500,500],c:COL.G,dash:'3 5',w:1}],
        ann:[{k:'dot',t:pa,y:500,label:'C 50',dx:-8,dy:-8,a:'end'},{k:'dot',t:pb,y:500,c:COL.W,label:'C 25',dx:8,dy:16},
          {k:'brX',t0:5,t1:pa,y:565,label:'ΔP 10'},{k:'brX',t0:5,t1:pb,y:640,label:'ΔP 20',c:COL.W},{k:'brY',t:2.6,y0:0,y1:500,side:'r',label:'ΔV 500'},
          {k:'txt',t:38,y:230,label:'C = ΔV / ΔP',c:COL.V,fs:14,a:'end'},{k:'txt',t:38,y:165,label:'500 / 10 = 50 mL/cmH₂O',a:'end'},{k:'txt',t:38,y:110,label:'500 / 20 = 25 mL/cmH₂O',c:COL.W,a:'end'}]});},
    resistance(){const r=sim({dur:7,breaths:[VC(.3,{R:8}),VC(3.8,{R:25})]}),[a,b]=r.b;
      return chart(r,[P(r,{max:40,ticks:[0,20,40],h:130,ann:[{k:'h',y:a.pplat,label:'Pplat '+fmt(a.pplat),c:COL.G,at:'l'},
          {k:'brY',t:a.tmax+.05,y0:a.pplat,y1:a.pmax,label:'R × V̇'},{k:'brY',t:b.tmax+.05,y0:b.pplat,y1:b.pmax,label:'R × V̇',c:COL.W},
          {k:'txt',t:a.ts+.6,y:-5,label:'R 8'},{k:'txt',t:b.ts+.6,y:-5,label:'R 25',c:COL.W}],min:-8}),F(r,{max:80})]);},
    tau(){const r=sim({dur:2.7,v0:.5}),tau=.5;
      return chart(r,[V(r,{max:500,ticks:[0,250,500],h:130,ann:[1,2,3].map(k=>({k:'v',t:k*tau,label:k+'τ · '+pct(100*(1-Math.exp(-k)))+' ↓',dy:k*15-15}))
          .concat([{k:'txt',t:2.65,y:150,label:'τ = R × C = 10 × '+fmt(.05,2)+' = '+fmt(.5,1)+' s',a:'end',c:COL.V}],[1,2,3].map(k=>({k:'dot',t:k*tau,y:500*Math.exp(-k)})))}),
        F(r,{max:60,ann:[{k:'txt',t:1.6,y:-45,label:L('exhaled'),c:COL.F}]})],{t0:0,t1:2.7});},
    trigger(){const r=sim({dur:9,efforts:[eff(3.1,5)],breaths:[VC(.3,{ti:1.4}),VC(3.1,{ti:1.4,trig:'flow',thr:2/60}),VC(8.1,{ti:1.4})]});
      return chart(r,[P(r,{max:30,ticks:[0,15,30],h:80}),F(r,{max:60,h:80}),M(r,{max:6,ticks:[0,6],ann:[{k:'txt',t:4.1,y:3,label:L('effort'),a:'start',c:COL.M}]})],
        {marks:[{t:r.b[0].ts,label:L('byTime'),c:COL.G},{t:r.b[1].ts,label:L('byPatient')},{t:r.b[2].ts,label:L('byTime'),c:COL.G}]});},
    'flow-trigger'(){const r=sim({dur:3,efforts:[eff(.6,5,1)],breaths:[PS(.6)]}),b=r.b[0],ft=r.at('F',b.ts);
      return chart(r,[F(r,{min:-6,max:12,ticks:[-6,0,2,6,12],label:ATLAS.t("app.483")+' ('+L('zoom')+')',h:120,ann:[{k:'h',y:2,label:L('threshold')+' 2 L/'+L('min').replace(/^\//,''),c:COL.W,x1:b.ts-.05,at:'r'},{k:'dot',t:b.ts,y:2,label:L('trig'),dx:8,dy:16}]}),
        P(r,{max:20,ticks:[0,5,10,15,20],h:80}),M(r,{max:6,ticks:[0,6]})],{t1:1.35});},
    'pressure-trigger'(){const r=sim({dur:3,efforts:[eff(.6,5,1)],breaths:[PS(.6,{trig:'p',thr:2})]}),b=r.b[0];
      return chart(r,[P(r,{max:20,ticks:[0,3,5,10,15,20],h:140,ann:[peepLine(5,{below:false,at:'l'}),{k:'h',y:3,label:L('threshold')+' PEEP − 2',c:COL.W,x1:b.ts-.05,at:'r',below:true},{k:'dot',t:b.ts,y:3,label:L('trig'),dx:8,dy:16}]}),
        F(r,{max:100,h:70}),M(r,{max:6,ticks:[0,6]})]);},
    cycling(){const r=sim({dur:3.6,efforts:[eff(.3,3,.8)],breaths:[PS(.3)]}),b=r.b[0];let t40=b.ts;for(let t=b.ts+.1;t<b.te;t+=.004)if(r.at('F',t)<.4*b.peakF){t40=t;break;}
      const tp=r.t[r.F.indexOf(Math.max(...r.F))];
      return chart(r,[F(r,{min:-60,max:70,ticks:[-60,0,70],sym:false,h:180,ann:[{k:'dot',t:tp,y:b.peakF,label:L('peakFlow')+' '+fmt(b.peakF)},{k:'h',y:.25*b.peakF,label:pct(25)+' · '+L('cycle')+' → E',x0:b.ts,x1:b.te+1.6,at:'r',below:true},{k:'h',y:.4*b.peakF,label:pct(40)+' → '+L('earlier'),x0:b.ts,x1:b.te+1.6,c:COL.G,at:'r'},
          {k:'dot',t:b.te,y:.25*b.peakF},{k:'dot',t:t40,y:.4*b.peakF,c:COL.G}]}),P(r,{max:20,ticks:[0,5,15],h:70})]);},
    effort(){const r=sim({dur:6,efforts:[eff(3.3,5,1)],breaths:[PS(3.3)]});
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:80}),F(r,{max:120,h:80}),M(r,{max:6,ticks:[0,5],h:90,ann:[{k:'txt',t:1.5,y:1.3,label:'Pmus 0 → '+L('noBreath'),c:COL.G},{k:'brY',t:3.2,y0:0,y1:5,side:'l',label:'Pmus 5'}]})],{marks:[trig(r.b[0])]});},
    spontaneous(){const r=sim({dur:8.4,efforts:[eff(.3,4),eff(3.3,.5),eff(6.3,4)],breaths:[PS(.3,{thr:4/60}),PS(6.3,{thr:4/60})]});
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:70}),F(r,{max:100,h:80,ann:[{k:'txt',t:3.75,y:30,label:L('noTrigger'),c:COL.W}]}),
        M(r,{max:5,ticks:[0,5],h:90,ann:[{k:'brX',t0:.3,t1:3.3,y:4.6,below:true,label:'60 / 20 = 3 s'},{k:'brX',t0:6.3,t1:7.2,y:4.6,label:fmt(.9,1)+' s',lx:7.3}]})],{marks:[trig(r.b[0]),miss(3.3),trig(r.b[1])]});},
    vcv(){const r=sim({dur:6.6,breaths:[VC(.3),VC(3.6,{R:20})]}),[a,b]=r.b;
      return chart(r,[P(r,{max:30,ticks:[0,15,30],ann:[{k:'txt',t:a.ts+1.8,y:22,label:L('pressureResult'),a:'start',c:COL.P}]}),F(r,{max:60,ann:[{k:'txt',t:a.ts+.5,y:45,label:L('square')+' · '+L('set')}]}),
        V(r,{max:600,ticks:[0,300,600],ann:[{k:'dot',t:a.te,y:a.vtOut,label:'Vt '+mL(a.vtOut)+' · '+L('set')},{k:'dot',t:b.te,y:b.vtOut}]})],{marks:r.b.map(b=>({t:b.ts,label:'VC'}))});},
    pcv(){const r=sim({dur:6.6,breaths:[PC(.3,{p:10}),PC(3.6,{p:10,C:.03})]}),[a,b]=r.b;
      return chart(r,[P(r,{max:20,ticks:[0,5,15],ann:[{k:'txt',t:a.ts+.6,y:17.5,label:'Pinsp · '+L('set')}]}),F(r,{max:80,ann:[{k:'txt',t:a.ts+.4,y:62,label:L('decel'),a:'start'}]}),
        V(r,{max:600,ticks:[0,300,600],ann:[{k:'dot',t:a.te,y:a.vtOut,label:'Vt '+mL(a.vtOut)+' · '+L('result')},{k:'dot',t:b.te,y:b.vtOut,label:'C ↓ → Vt '+mL(b.vtOut),c:COL.W}]})],{marks:r.b.map(b=>({t:b.ts,label:'PC'}))});},
    prvc(){const p0=6,r=sim({dur:17.3,breaths:[.3,3.8,7.3,10.8,14.3].map((t,i)=>PC(t,{p:i?(bs,C)=>{const l=bs[bs.length-1];return clamp(l.p+clamp((500-l.vtOut)/1000/C,-3,3),5,35);}:p0}))});
      return chart(r,[P(r,{max:20,ticks:[0,5,10,15,20],ann:r.b.map(b=>({k:'txt',t:b.ts+.6,y:b.p+5+2.4,label:fmt(b.p,1),fs:11.5}))}),
        V(r,{max:700,ticks:[0,500],ann:[{k:'h',y:500,label:L('target')+' Vt 500',c:COL.G,at:'l'}].concat(r.b.map(b=>({k:'txt',t:b.ts+.65,y:b.vtOut+40,label:mL(b.vtOut),fs:11.5,c:Math.abs(b.vtOut-500)<40?COL.A:COL.W})))})],{marks:r.b.map((b,i)=>({t:b.ts,label:String(i+1)}))});},
    simv(){const r=sim({dur:8.9,efforts:[eff(3,4),eff(6,4)],breaths:[VC(.3,{pause:.1}),PS(3),VC(6,{pause:.1,trig:'flow',thr:2/60})]});
      return chart(r,[P(r,{max:30,ticks:[0,15,30]}),V(r,{max:600,ticks:[0,300,600]}),M(r,{max:5,ticks:[0,4]})],{marks:[{t:r.b[0].ts,label:'VC'},{t:r.b[1].ts,label:'PS · '+L('spont'),c:COL.M},{t:r.b[2].ts,label:'VC · '+L('sync')}]});},
    psv(){const r=sim({dur:7.4,efforts:[eff(.3,4,.9),eff(2.9,7,1.2),eff(5.4,2.5,.8)],breaths:[PS(.3),PS(2.9),PS(5.4)]});
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:80,ann:[{k:'brY',t:r.b[0].ts+.5,y0:5,y1:15,label:'PS 10'}]}),V(r,{max:900,ticks:[0,400,800],h:90,ann:r.b.map(b=>({k:'txt',t:b.ts+.55,y:b.vtOut+70,label:'Vt '+mL(b.vtOut),fs:11.5}))}),M(r,{max:8,ticks:[0,8]})],{marks:r.b.map(trig)});},
    cpap(){const r=sim({dur:8.4,peep:8,cpap:1.5,efforts:[eff(.3,4,1.6),eff(4.3,4,1.6)]});
      return chart(r,[P(r,{max:20,ticks:[0,8,20],ann:[{k:'h',y:8,label:'CPAP 8',at:'l',c:COL.G},{k:'txt',t:4.2,y:15,label:L('noSupport'),c:COL.G}]}),F(r,{max:30}),M(r,{max:5,ticks:[0,4]})]);},
    apnea(){const r=sim({dur:17,efforts:[eff(.3,4),eff(3.3,4)],breaths:[PS(.3),PS(3.3),PC(11.3,{p:15}),PC(14.8,{p:15})]});
      return chart(r,[P(r,{max:25,ticks:[0,5,20],ann:[{k:'brX',t0:3.3,t1:11.3,y:21,label:L('apneaTime')+' (8 s)',c:COL.W}]}),M(r,{max:5,ticks:[0,4],ann:[{k:'txt',t:8.5,y:1.5,label:L('noEffort'),c:COL.G}]})],
        {marks:[trig(r.b[0]),trig(r.b[1]),{t:11.3,label:'⚠ '+ATLAS.t("app.490"),c:COL.W},{t:14.8,label:ATLAS.t("app.490"),c:COL.W}]});},
    ineffective(){const r=sim({dur:6.5,R:20,efforts:[eff(.3,4),eff(2.3,2.6,.8),eff(4.6,4)],breaths:[PS(.3),PS(4.6)]});
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:70}),F(r,{max:60,ann:[{k:'dot',t:2.72,y:r.at('F',2.72),c:COL.W,label:L('ineffective'),dy:-12}]}),M(r,{max:5,ticks:[0,4]})],{marks:[trig(r.b[0]),miss(2.3),trig(r.b[1])]});},
    double(){const r=sim({dur:5.4,efforts:[eff(.3,9,2.2)],breaths:[VC(.3,{vt:.4,ti:.8,pause:0,trig:'flow',thr:2/60}),VC(1.12,{vt:.4,ti:.8,pause:0,trig:'flow',thr:2/60})]}),[a,b]=r.b;let vm=0;r.V.forEach(v=>vm=Math.max(vm,v));
      return chart(r,[P(r,{max:40,ticks:[0,20,40],h:80,ann:[{k:'brX',t0:a.ts,t1:a.te,y:34,label:'Ti '+fmt(.8,1)+' s',lx:a.te+.1}]}),
        V(r,{max:900,ticks:[0,400,800],ann:[{k:'brY',t:b.te+.1,y0:0,y1:vm,c:COL.W,label:'≈ '+mL(vm)+' mL'}]}),M(r,{max:12,ticks:[0,9],ann:[{k:'brX',t0:.3,t1:2.5,y:10.8,label:L('effortTime')+' '+fmt(2.2,1)+' s',lx:2.6}]})],{marks:[{t:a.ts,label:'1'},{t:b.ts,label:'2',c:COL.W}]});},
    starvation(){const base=sim({dur:2,breaths:[VC(.3,{ti:1.2,pause:.1})]}),r=sim({dur:6.6,efforts:[eff(3.6,9,1.2)],breaths:[VC(.3,{ti:1.2,pause:.1}),VC(3.6,{ti:1.2,pause:.1,trig:'flow',thr:2/60})]});
      const b=r.b[1],sh=b.ts-.3,gt=base.t.map(t=>t+sh);let tmin=b.ts+.3,pmin=99;for(let t=b.ts+.2;t<b.te-.2;t+=.01){const p=r.at('P',t);if(p<pmin){pmin=p;tmin=t;}}
      return chart(r,[P(r,{max:30,ticks:[0,15,30],h:120,extra:[{t:gt,y:base.P,c:COL.G,dash:'5 4'}],ann:[{k:'txt',t:r.b[0].ts+.6,y:25,label:L('passive'),c:COL.G},{k:'dot',t:tmin,y:pmin,c:COL.W,label:L('scoop'),dx:12,dy:20}]}),F(r,{max:60,h:70}),M(r,{max:10,ticks:[0,9]})],{marks:[trig(b)]});},
    'cycling-mismatch'(){const r=sim({dur:7,efforts:[eff(.3,5,1.4),eff(4,5,.6)],breaths:[PS(.3,{ti:.55}),PS(4,{ti:2})]}),[a,b]=r.b;
      const sp=c=>[{k:'span',t0:a.ts,t1:a.te,c},{k:'span',t0:b.ts,t1:b.te,c}];
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:80,ann:sp(COL.A)}),F(r,{max:100,h:80}),M(r,{max:6,ticks:[0,5],h:90,ann:sp(COL.A).concat([{k:'txt',t:a.te+.15,y:5.4,label:L('early'),a:'start',c:COL.W},{k:'txt',t:b.ts+.75,y:5.4,label:L('late'),a:'start',c:COL.W}])})]);},
    autotrigger(){const r=sim({dur:7,osc:{a:5,f:1.4},breaths:[.3,1.9,3.2,4.9,6.1].map(t=>PS(t,{trig:null}))});
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:70}),F(r,{max:100,ann:[{k:'txt',t:2.6,y:-55,label:L('leak'),c:COL.W}]}),M(r,{max:5,ticks:[0,4],h:60,ann:[{k:'txt',t:3.5,y:2,label:'Pmus 0 · '+L('noEffort'),c:COL.G}]})],{marks:r.b.map(b=>({t:b.ts,label:'?',c:COL.W}))});},
    patient(){const mk=(vt,rr,C,R)=>sim({dur:6,C,R,breaths:Array.from({length:Math.ceil(6*rr/60)},(_,i)=>VC(.2+i*60/rr,{vt,ti:60/rr/3,pause:.1}))});
      const a=mk(.45,12,.05,10),c=mk(.14,20,.02,20),i=mk(.035,30,.005,40),m=L('min');
      return chart(a,[V(a,{label:L('adult')+' · 450 mL · 12'+m,unit:'',max:600,ticks:[0,450],h:62}),{...V(c,{label:L('child')+' · 140 mL · 20'+m,unit:'',max:200,ticks:[0,140],h:62}),t:c.t},
        {...V(i,{label:L('infant')+' · 35 mL · 30'+m,unit:'',max:50,ticks:[0,35],h:62}),t:i.t}]);},
    presets(){const r=sim({dur:10.6,steps:[{t:6.6,peep:10}],breaths:[VC(.3,{vt:.45,C:.05,R:10,pause:.2}),VC(3.8,{vt:.5,C:.055,R:35,pause:.2}),VC(7.3,{vt:.42,C:.022,R:12,pause:.2})]});
      const names=[ATLAS.t("app.642"),ATLAS.t("app.643"),'ARDS'];
      return chart(r,[P(r,{max:55,ticks:[0,20,40],h:150,ann:r.b.flatMap((b,i)=>[{k:'txt',t:b.ts+1.55,y:i%2?45.5:50.5,label:names[i],c:COL.V,fs:11.5},{k:'dot',t:b.tmax,y:b.pmax,label:'Ppeak '+fmt(b.pmax)},{k:'txt',t:b.ts+1.55,y:.8,label:'C '+fmt(b.C*1000)+' · R '+fmt(b.R),c:COL.G,fs:11}]).concat([{k:'txt',t:10.5,y:12.5,label:'PEEP 10',c:COL.G,fs:11,a:'end'}])}),F(r,{max:100,h:80})]);},
    'effort-time'(){const r=sim({dur:7.2,efforts:[eff(.3,4,.9),eff(3.8,4,1.8)],breaths:[PS(.3),PS(3.8)]}),[a,b]=r.b;
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:80}),F(r,{max:100,h:80}),M(r,{max:6,ticks:[0,4],h:90,ann:[{k:'brX',t0:.3,t1:1.2,y:5,label:fmt(.9,1)+' s',lx:1.3},{k:'brX',t0:3.8,t1:5.6,y:5,label:fmt(1.8,1)+' s',lx:5.7},{k:'span',t0:a.ts,t1:a.te},{k:'span',t0:b.ts,t1:b.te}]})],{marks:r.b.map(trig)});},
    'rise-time'(){const r=sim({dur:6.6,efforts:[eff(.3,3),eff(3.6,3)],breaths:[PS(.3,{rise:.03}),PS(3.6,{rise:.28})]}),[a,b]=r.b;
      return chart(r,[P(r,{max:20,ticks:[0,5,15],h:110,ann:[{k:'txt',t:a.ts+.08,y:17.5,label:L('fast'),a:'start'},{k:'txt',t:b.ts+.5,y:8.5,label:L('slow'),a:'start',c:COL.W}]}),
        F(r,{max:100,ann:[{k:'dot',t:r.t[r.F.indexOf(Math.max(...r.F.slice(0,900)))],y:a.peakF,label:L('peakFlow')+' '+fmt(a.peakF)},{k:'dot',t:r.t[900+r.F.slice(900).indexOf(Math.max(...r.F.slice(900)))],y:b.peakF,c:COL.W,label:fmt(b.peakF)}]})]);},
    holds(){const r=sim({dur:5.2,R:20,breaths:[VC(.3,{ti:1.7,pause:.4})],holds:[[4,5]]}),b=r.b[0],tot=r.at('P',4.95),tf=b.ts+b.ti*.6;
      return chart(r,[P(r,{max:30,ticks:[0,15,30],h:130,ann:[{k:'span',t0:tf,t1:b.te,label:L('inspHold')},{k:'span',t0:4,t1:5,label:L('expHold')},
          {k:'dot',t:b.tp,y:b.pplat,label:'Pplat '+fmt(b.pplat),dx:8,dy:-6},{k:'dot',t:4.95,y:tot,label:L('totalPeep')+' '+fmt(tot,1),dx:-8,dy:-10,a:'end'},peepLine(5,{x1:3.9})]}),
        F(r,{max:60,ann:[{k:'span',t0:tf,t1:b.te},{k:'span',t0:4,t1:5}]})],{t0:0,t1:5.2});},
    alarms(){const r=sim({dur:9.4,breaths:[VC(.3,{R:10}),VC(3.3,{R:10}),VC(6.3,{R:42})]}),b=r.b[2];
      return chart(r,[P(r,{max:45,ticks:[0,20,35],h:130,ann:[{k:'h',y:35,label:L('upperLimit')+' 35',c:COL.W,at:'l'},{k:'dot',t:b.tmax,y:b.pmax,c:COL.W,label:'⚠ '+L('alarm')+' · '+fmt(b.pmax),dx:-10,dy:-4,a:'end'}]}),F(r,{max:60,h:80})]);}
  };
  // w: drawing width in px-like units; narrower widths keep labels legible on phones
  function render(id,w=560){const f=FIG[id];if(!f)return null;W=clamp(Math.round(w),380,560);return f();}
  return{render,ids:Object.keys(FIG)};
})();
