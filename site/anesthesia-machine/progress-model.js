'use strict';
/* Pure progress model: fixed curriculum, monotonic learning stages, v1 migration. */
const ATLAS_PROGRESS_MODEL = (() => {
  const blank = () => ({v:2,items:{},updated:0,bookmark:null});
  function normalize(raw, curriculum) {
    const out=blank(); if(!raw || typeof raw!=='object') return out;
    out.updated=Number(raw.updated)||0;
    for(const [kind,ids] of Object.entries(curriculum)) {
      out.items[kind]={};
      for(const id of ids) {
        const x=raw.items?.[kind]?.[id]; if(!x || typeof x!=='object') continue;
        const stage=raw.v===2 ? Math.max(1,Math.min(3,Number(x.stage)||1)) :
          ['law','equipment'].includes(kind)?1 : ['async','case'].includes(kind)?2 : x.ok?3:2;
        out.items[kind][id]={stage,ok:stage===3,best:Number.isFinite(x.best)?x.best:null,n:Number(x.n)||1,t:Number(x.t)||0};
      }
    }
    const b=raw.bookmark;
    if(b && ['index.html','fizik.html','ekipman.html','kaynakca.html'].includes(b.page))
      out.bookmark={page:b.page,hash:/^#[\w-]*$/.test(b.hash||'')?b.hash:'',part:typeof b.part==='string'?b.part:null,tourStep:Number.isInteger(b.tourStep)&&b.tourStep>=0&&b.tourStep<5?b.tourStep:null,t:Number(b.t)||0};
    return out;
  }
  function record(st,d,curriculum,now=Date.now()) {
    if(!curriculum[d?.kind]?.includes(d.id))return false;
    st.items[d.kind] ||= {};
    const x=st.items[d.kind][d.id] || {stage:0,ok:false,best:null,n:0,t:0};
    const stage=d.stage || (d.ok===false?2:3);
    x.stage=Math.max(x.stage,Math.max(1,Math.min(3,stage)));x.ok=x.stage===3;x.n++;x.t=now;
    if(Number.isFinite(d.score))x.best=Math.max(x.best??0,Math.round(d.score));
    st.items[d.kind][d.id]=x;st.updated=now;return true;
  }
  function counts(st,kind,curriculum){const vals=curriculum[kind].map(id=>st.items[kind]?.[id]?.stage||0);return {viewed:vals.filter(x=>x>=1).length,tried:vals.filter(x=>x>=2).length,completed:vals.filter(x=>x>=3).length,total:vals.length};}
  function pct(st,curriculum){let done=0,total=0;for(const k of Object.keys(curriculum)){const c=counts(st,k,curriculum);done+=c.completed;total+=c.total;}return total?Math.round(done/total*100):0;}
  function merge(a,b,curriculum){const out=normalize(a,curriculum),other=normalize(b,curriculum);for(const [k,items]of Object.entries(other.items))for(const [id,x]of Object.entries(items)){const y=out.items[k][id];out.items[k][id]=y?{stage:Math.max(x.stage,y.stage),ok:x.ok||y.ok,best:x.best==null?y.best:y.best==null?x.best:Math.max(x.best,y.best),n:Math.max(x.n,y.n),t:Math.max(x.t,y.t)}:x;}out.updated=Math.max(out.updated,other.updated);if((other.bookmark?.t||0)>(out.bookmark?.t||0))out.bookmark=other.bookmark;return out;}
  return {blank,normalize,record,counts,pct,merge};
})();
if(typeof module !== 'undefined') module.exports=ATLAS_PROGRESS_MODEL;
