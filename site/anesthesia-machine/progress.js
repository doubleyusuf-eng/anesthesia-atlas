'use strict';
const PROGRESS=(()=>{
  const M=ATLAS_PROGRESS_MODEL,C=ATLAS_CURRICULUM,U=ATLAS.ui,LS='anm-progress-v1';
  let available=true,mode='local',ref=null,busy=false,dirty=false,timer=null;
  function load(){try{return M.normalize(JSON.parse(localStorage.getItem(LS)||'null'),C);}catch(e){available=false;return M.normalize(null,C);}}
  let st=load(),btn=null,panel=null;const labels={};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function save(){try{localStorage.setItem(LS,JSON.stringify(st));}catch(e){available=false;}dirty=true;if(mode==='db'){clearTimeout(timer);timer=setTimeout(flush,1500);}}
  async function flush(){if(!ref||busy||!dirty)return;busy=true;dirty=false;try{await ref.set(JSON.parse(JSON.stringify(st)));}catch(e){mode='local';render();}finally{busy=false;}if(dirty&&mode==='db')timer=setTimeout(flush,1500);}
  function record(d){if(M.record(st,d,C)){save();render();document.dispatchEvent(new CustomEvent('atlas:progress'));}}
  function close(){if(!panel)return;panel.hidden=true;btn.setAttribute('aria-expanded','false');btn.focus();}
  function reset(){st=M.normalize(null,C);save();render();document.dispatchEvent(new CustomEvent('atlas:progress'));}
  function render(){if(!btn)return;const p=M.pct(st,C);btn.querySelector('.prog-ring').style.setProperty('--p',p);btn.querySelector('.prog-lbl').textContent=U('progress')+' '+ATLAS.percent(p);btn.setAttribute('aria-label',U('yourProgress')+' '+ATLAS.percent(p));if(panel.hidden)return;
    panel.innerHTML=`<div class="prog-top"><div><span class="info-num">${U('yourProgress')}</span><h3>${ATLAS.percent(p)} · ${U('completed')}</h3></div><button type="button" class="tbtn" data-close>${U('close')}</button></div>
      <p class="prog-store">${U(mode==='db'?'cloud':available?'local':'volatile')}</p><p class="progress-explainer">${U('progressNote')}</p>
      ${Object.keys(C).map(k=>{const c=M.counts(st,k,C);const best=Object.entries(st.items[k]||{}).filter(([,x])=>x.best!=null);return `<div class="prog-row"><div class="prog-head"><span>${U('cat.'+k)}</span><b>${c.completed} / ${c.total}</b></div><div class="progress"><span style="width:${c.completed/c.total*100}%"></span></div><p>${U('viewed')} ${c.viewed} · ${U('tried')} ${c.tried}</p>${best.length?`<ul class="prog-best">${best.map(([id,x])=>`<li><span>${esc(labels[k]?.[id]||id)}</span><b>${x.best}/100</b></li>`).join('')}</ul>`:''}</div>`;}).join('')}
      <div class="prog-foot"><button class="linkbtn" type="button" data-reset>${U('reset')}</button><div class="prog-confirm" hidden><p>${U('confirmReset')}</p><button class="linkbtn" type="button" data-yes>${U('yes')}</button> <button class="linkbtn" type="button" data-no>${U('cancel')}</button></div></div>`;
  }
  function ui(){const bar=document.querySelector('.topbar .wrap');if(!bar)return;
    btn=document.createElement('button');btn.type='button';btn.className='prog-btn';btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','progPanel');btn.innerHTML='<span class="prog-ring" aria-hidden="true"></span><span class="prog-lbl"></span>';bar.append(btn);
    panel=document.createElement('aside');panel.id='progPanel';panel.className='prog-panel';panel.hidden=true;panel.setAttribute('aria-label',U('yourProgress'));document.body.append(panel);
    btn.addEventListener('click',()=>{panel.hidden=!panel.hidden;btn.setAttribute('aria-expanded',!panel.hidden);render();if(!panel.hidden)panel.querySelector('[data-close]').focus();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close();});
    panel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-close'))close();if(b.hasAttribute('data-reset')){panel.querySelector('.prog-confirm').hidden=false;panel.querySelector('[data-no]').focus();}if(b.hasAttribute('data-no'))panel.querySelector('.prog-confirm').hidden=true;if(b.hasAttribute('data-yes'))reset();});render();
  }
  document.addEventListener('anm-progress',e=>record(e.detail));
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='db')flush();});
  (async()=>{try{if(!window.claude?.use)return;const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);if(!db||!user)return;const id=await user.id();if(!id)return;ref=db.doc('data/users/'+id+'/progress');const snap=await ref.get();if(snap.exists)st=M.merge(st,snap.data(),C);mode='db';save();await flush();render();document.dispatchEvent(new CustomEvent('atlas:progress'));}catch(e){mode='local';render();}})();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
  return {record,count:k=>M.counts(st,k,C).completed,stage:(k,id)=>st.items[k]?.[id]?.stage||0,
    setTotal(k,n){if(C[k]?.length!==n)console.warn('Curriculum count mismatch:',k,n);},setLabels(k,map){labels[k]={...labels[k],...map};},
    bookmark(b){st.bookmark={...b,t:Date.now()};save();},get resume(){return st.bookmark?{...st.bookmark}:null;},get mode(){return mode;}};
})();
