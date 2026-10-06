'use strict';
/* Shared learning interface. Existing simulation controls remain the source of truth. */
(() => {
  const U=ATLAS.ui, q=s=>document.querySelector(s), qa=s=>Array.from(document.querySelectorAll(s));
  const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!=null)el.textContent=text;return el;};
  const button=(text,cls='linkbtn')=>{const b=make('button',cls,text);b.type='button';return b;};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
  const page=location.pathname.split('/').pop()||'index.html';
  let prior=PROGRESS.resume, tourStep=null, tourReady=false, panelMode='summary', currentModule=null;
  let currentHash=location.hash, currentPart=null, lastBookmark='';
  function bookmark(){const b={page,hash:currentHash,part:currentPart,tourStep};const key=JSON.stringify(b);if(key!==lastBookmark){lastBookmark=key;PROGRESS.bookmark(b);}}
  function init(){
    const main=q('main');if(!main)return;main.id='main-content';
    const skip=make('a','skip-link',U('skip'));skip.href='#main-content';document.body.prepend(skip);
    navigation(); setupResume(); setupPanels(); setupEquipmentPanels(); setupHero(); setupTour(); setupFilters(); setupWorkspace(); setupActivities();setupVisitors(); setupAdvanced();
    const obs=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting&&!q('.case-workspace[open]')&&tourStep==null){currentHash='#'+e.target.id;bookmark();}},{rootMargin:'-25% 0px -60% 0px'});
    qa('main > section[id]').forEach(s=>obs.observe(s));
    document.addEventListener('atlas:part',e=>{currentPart=e.detail.key;bookmark();if(tourStep!=null){tourReady=currentPart===['pipeline','cgo',null,'monitor'][tourStep];updateTourButtons();}if(panelMode==='settings'&&tourStep!==2)setPanel('summary');});
    document.addEventListener('atlas:module',e=>{currentModule=e.detail;PROGRESS.record({...currentModule,stage:1});currentHash='#'+e.detail.id;bookmark();updateActivities();});
    document.addEventListener('atlas:progress',()=>{updateActivities();if(!PROGRESS.resume){prior=null;resumeButton?.remove();}});
    if(page==='index.html'&&location.hash==='#resume')resume();
  }
  function navigation(){
    const nav=q('.chapters'),bar=q('.topbar .wrap');if(!nav||!bar)return;
    nav.id='chapter-menu';const b=button(U('nav')+' ☰','nav-toggle');b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls',nav.id);nav.before(b);
    const close=()=>{nav.classList.remove('nav-open');b.setAttribute('aria-expanded','false');};
    b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';nav.classList.toggle('nav-open',open);b.setAttribute('aria-expanded',open);if(open)nav.querySelector('a')?.focus();});
    nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
    // Long pages: a quiet back-to-top button once the reader is two screens down.
    if(document.documentElement.scrollHeight>innerHeight*4){const t=button('↑','to-top');t.setAttribute('aria-label',U('toTop'));t.title=U('toTop');document.body.append(t);
      t.addEventListener('click',()=>scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
      let on=false;const upd=()=>{const v=scrollY>innerHeight*2;if(v!==on){on=v;t.classList.toggle('show',v);}};addEventListener('scroll',upd,{passive:true});upd();}
    // References page: a jump row to each source group.
    const secs=qa('.ref-sec');if(secs.length>2&&!q('.ref-jump')){const j=document.createElement('nav');j.className='law-index ref-jump';j.setAttribute('aria-label',q('h1')?.textContent||'');
      secs.forEach((sec,i)=>{const h=sec.querySelector('h3');if(!h)return;sec.id=sec.id||'refs-'+(i+1);sec.style.scrollMarginTop='84px';const l=document.createElement('a');l.href='#'+sec.id;l.textContent=h.textContent;j.append(l);});
      (q('.ref-notes')||secs[0]).before(j);}
    // Touch screens get touch instructions instead of mouse/keyboard ones.
    if(matchMedia('(pointer: coarse)').matches)qa('.stage-hint').forEach(h=>{if(/Ctrl/.test(h.textContent))h.textContent=U('stageHintTouch');});
    // The toggle names the chapter in view, so phones always show where the reader is.
    const label=()=>{const a=nav.querySelector('a.active,a[aria-current="page"]'),cur=a?a.textContent.replace(/[→↗←]/g,'').trim():'';b.textContent=(cur||U('nav'))+' ☰';b.setAttribute('aria-label',U('nav')+(cur?': '+cur:''));b.classList.toggle('has-cur',!!cur);};
    new MutationObserver(label).observe(nav,{subtree:true,attributes:true,attributeFilter:['class','aria-current']});label();
    document.addEventListener('click',e=>{if(!nav.contains(e.target)&&e.target!==b)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('nav-open')){close();b.focus();}});
  }
  let resumeButton;
  function setupResume(){
    const head=q('.hero-head,.chapter-head');if(!head||!prior)return;
    resumeButton=button(U('resume')+' ↗','resume-link');head.before(resumeButton);resumeButton.addEventListener('click',resume);
  }
  function resume(){
    if(!prior)return;
    if(prior.page!==page){try{sessionStorage.setItem('atlas-resume',JSON.stringify(prior));}catch(e){}location.href=prior.page+(prior.hash||'');return;}
    if(prior.part&&ATLAS.sim?.parts.some(p=>p.key===prior.part)){setFilter('all');ATLAS.sim.selectPart(prior.part);}
    if(prior.tourStep!=null&&q('#tourPanel'))startTour(prior.tourStep);
    else if(prior.hash){const el=document.getElementById(prior.hash.slice(1));if(el&&el.classList.contains('law')){if(location.hash!==prior.hash)location.hash=prior.hash;else el.scrollIntoView({behavior:motion,block:'start'});}else if(el)el.scrollIntoView({behavior:motion,block:'start'});}
    resumeButton?.remove();
  }
  function setupHero(){
    const hero=q('.hero-head');if(!hero)return;
    hero.querySelector('.eyebrow').textContent=U('eyebrow');hero.querySelector('.lede').textContent=U('intro');
    const routes=make('div','learning-routes');
    ['tour','explore','case'].forEach((key,i)=>{const b=button('','route');b.innerHTML=`<span class="route-number">0${i+1}</span><span><strong>${U(key)}</strong><small>${U(key+'Sub')}</small></span><span aria-hidden="true">↗</span>`;b.addEventListener('click',()=>{if(key==='tour')startTour(0);else if(key==='case')openWorkspace();else{closeTour();setPanel('summary');q('#stageMachine').scrollIntoView({behavior:motion,block:'start'});}});routes.append(b);});
    hero.after(routes);
  }
  function setupPanels(){
    const panel=q('#makine .workbench > .panel');if(!panel)return;
    panel.classList.add('machine-panel');panel.id='machine-panel';
    const ctl=panel.querySelector('.ctl');ctl.id='machine-settings';ctl.setAttribute('role','tabpanel');
    q('#partInfo').setAttribute('role','tabpanel');
    const tabs=make('div','panel-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',U('details'));
    ['summary','settings','details'].forEach(key=>{const b=button(U(key),'panel-tab');b.id='tab-'+key;b.dataset.panel=key;b.setAttribute('role','tab');b.setAttribute('aria-controls',key==='settings'?'machine-settings':'partInfo');b.addEventListener('click',()=>setPanel(key));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const all=Array.from(tabs.children),i=all.indexOf(b),n=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowLeft'?-1:1)+3)%3;all[n].click();all[n].focus();});tabs.append(b);});
    panel.prepend(tabs);setPanel('summary');
  }
  function setupEquipmentPanels(){
    const panel=q('.eq-grid > .panel');if(!panel)return;
    const tabs=make('div','panel-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',U('details'));
    function select(key){panel.dataset.view=key;Array.from(tabs.children).forEach(b=>{const active=b.dataset.view===key;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1;});q('#eqInfo').hidden=key==='settings';q('#eqCalc').hidden=key!=='settings';q('#eqInfo').setAttribute('aria-labelledby','eq-tab-'+key);}
    ['summary','settings','details'].forEach(key=>{const b=button(U(key),'panel-tab');b.id='eq-tab-'+key;b.dataset.view=key;b.setAttribute('role','tab');b.setAttribute('aria-controls',key==='settings'?'eqCalc':'eqInfo');b.onclick=()=>select(key);b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const all=Array.from(tabs.children),i=all.indexOf(b),n=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowLeft'?-1:1)+3)%3;all[n].click();all[n].focus();};tabs.append(b);});
    panel.classList.add('equipment-panel');panel.prepend(tabs);q('#eqInfo').setAttribute('role','tabpanel');q('#eqCalc').setAttribute('role','tabpanel');q('#eqCalc').setAttribute('aria-labelledby','eq-tab-settings');select('summary');
    document.addEventListener('atlas:module',()=>select('summary'));
  }
  function setPanel(key){const panel=q('.machine-panel');if(!panel)return;panelMode=key;panel.dataset.view=key;
    qa('.panel-tab').forEach(b=>{const active=b.dataset.panel===key;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1;});
    q('#partInfo').hidden=key==='settings';q('#partInfo').setAttribute('aria-labelledby','tab-'+key);
    q('#machine-settings').hidden=key!=='settings';q('#machine-settings').setAttribute('aria-labelledby','tab-settings');
  }
  const groups={all:null,source:['pipeline','cylinders','gauges','flowmeters','knobs','vaporizers','flush','cgo'],circuit:['absorber','valves','o2sensor','apl','bag','hoses','lung','bagvent'],devices:['bellows','monitor']};
  function setupFilters(){if(!ATLAS.sim)return;const group=make('div','component-filters');group.setAttribute('role','group');group.setAttribute('aria-label',U('filter'));
    Object.keys(groups).forEach(k=>{const b=button(U(k),'filter-button');b.dataset.filter=k;b.addEventListener('click',()=>setFilter(k));group.append(b);});q('#makine .workbench').before(group);setFilter('all');
  }
  function setFilter(k){if(!ATLAS.sim)return;const keys=groups[k];ATLAS.sim.filter(keys);qa('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.filter===k));qa('#partIndex li').forEach(li=>li.hidden=!!keys&&!keys.includes(li.querySelector('button').dataset.k));}
  let tourPanel;
  function setupTour(){if(!ATLAS.sim)return;tourPanel=make('section','tour-panel');tourPanel.id='tourPanel';tourPanel.hidden=true;tourPanel.setAttribute('aria-label',U('tour'));q('#makine .workbench').before(tourPanel);
    q('#fO2').addEventListener('input',()=>{if(tourStep===2){tourReady=true;updateTourButtons();}});
  }
  function startTour(step){tourStep=step;tourReady=false;setFilter('all');PROGRESS.record({kind:'tour',id:'machine',stage:2});renderTour();currentHash='#makine';bookmark();tourPanel.scrollIntoView({behavior:motion,block:'start'});}
  function closeTour(){if(!tourPanel)return;tourStep=null;tourPanel.hidden=true;ATLAS.sim.guide(null);bookmark();}
  function renderTour(){tourPanel.hidden=false;tourReady=false;setPanel(tourStep===2?'settings':'summary');if(tourStep!==2&&tourStep!==4){ATLAS.sim.selectPart(null);ATLAS.sim.guide(['pipeline','cgo',null,'monitor'][tourStep]);}
    tourPanel.innerHTML=`<div class="tour-heading"><span class="eyebrow">${U('tourTitle')} · ${U('step')} ${tourStep+1} / 5</span><button type="button" class="text-button" data-tour-close>${U('exitTour')} ×</button></div><div class="tour-track">${[0,1,2,3,4].map(i=>`<span class="${i<=tourStep?'done':''}"></span>`).join('')}</div><div class="tour-content"><div><h3 tabindex="-1">${U('step'+tourStep)}</h3><p>${U('body'+tourStep)}</p></div><div class="tour-controls"><button type="button" class="linkbtn" data-tour-back ${tourStep===0?'disabled':''}>${U('back')}</button><button type="button" class="primary-button" data-tour-next disabled>${U(tourStep===4?'finish':'next')}</button></div></div><div class="tour-question" ${tourStep===4?'':'hidden'}>${[0,1,2].map(i=>`<button type="button" class="linkbtn" data-answer="${i}">${U('answer'+i)}</button>`).join('')}<p class="tour-feedback" role="status"></p></div>`;
    tourPanel.querySelector('[data-tour-close]').onclick=closeTour;
    tourPanel.querySelector('[data-tour-back]').onclick=()=>{tourStep--;renderTour();bookmark();};
    tourPanel.querySelector('[data-tour-next]').onclick=()=>{if(!tourReady)return;if(tourStep===4){PROGRESS.record({kind:'tour',id:'machine',stage:3});closeTour();const done=make('p','tour-complete',U('tourDone'));done.setAttribute('role','status');q('.learning-routes').after(done);setTimeout(()=>done.remove(),12000);}else{tourStep++;renderTour();bookmark();}};
    tourPanel.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{tourReady=b.dataset.answer==='0';tourPanel.querySelector('.tour-feedback').textContent=U(tourReady?'correct':'retry');updateTourButtons();});
    if(tourStep!==2&&tourStep!==4)tourReady=ATLAS.sim.selected===['pipeline','cgo',null,'monitor'][tourStep];updateTourButtons();
    tourPanel.querySelector('h3').focus({preventScroll:true});
  }
  function updateTourButtons(){if(tourPanel&&!tourPanel.hidden)tourPanel.querySelector('[data-tour-next]').disabled=!tourReady;}
  function setupAdvanced(){
    const ctl=q('#ventilator .vent-grid > .panel .ctl');if(ctl){const advanced=make('details','advanced-controls');advanced.append(make('summary','',U('advanced')));const start=Array.from(ctl.querySelectorAll('h4')).find(el=>el.tagName==='H4'&&el.nextElementSibling?.querySelector('#efS'));if(start){let next=start;while(next){const move=next;next=next.nextElementSibling;advanced.append(move);}ctl.append(advanced);}}
    const mon=q('#monCtl');if(mon){const detail=make('details','monitor-settings');detail.append(make('summary','',U('settings')));mon.before(detail);detail.append(mon);}
  }
  const activities=[];
  function addActivity(host,kind,id){if(!host)return;const box=make('div','activity-status');box.dataset.kind=kind;box.dataset.id=id||'';const text=make('p');const b=button(U('markDone'));b.onclick=()=>{const k=box.dataset.kind,i=box.dataset.id;if(PROGRESS.stage(k,i)>=2){PROGRESS.record({kind:k,id:i,stage:3});updateActivities();}};const hint=make('p','activity-hint',U('practiceHint'));box.append(text,b,hint);host.append(box);activities.push(box);}
  /* Anonymous visitor counters at the very bottom of every page (visitors.js, loaded next to this file). */
  function setupVisitors(){const foot=q('footer');if(!foot||q('#visitor-stats'))return;
    const box=make('div','visitor-stats');box.id='visitor-stats';box.dataset.site='atlas';box.hidden=true;
    box.innerHTML=`<span data-k="active"><i class="live" aria-hidden="true"></i><b class="v">–</b> ${U('visitors.active')}</span><span data-k="today">${U('visitors.today')} <b class="v">–</b></span><span data-k="month">${U('visitors.month')} <b class="v">–</b></span>`;
    (foot.querySelector('.wrap:last-child')||foot).append(box);
    const me=document.querySelector('script[src$="experience.js"]');const sc=document.createElement('script');sc.src=(me?me.getAttribute('src').replace(/experience\.js$/,''):'')+'visitors.js';sc.defer=true;document.body.append(sc);}
  function setupActivities(){
    qa('.law').forEach(card=>{if(card.querySelector('.tag'))card.querySelector('.tag').dataset.sceneLabel=U('scene');addActivity(card,'law',card.id);card.addEventListener('input',()=>PROGRESS.record({kind:'law',id:card.id,stage:2}));card.addEventListener('change',()=>PROGRESS.record({kind:'law',id:card.id,stage:2}));});
    if(q('#stageEq')){currentModule={kind:'equipment',id:location.hash.slice(1)||'laringoskop'};addActivity(q('.eq-grid > .panel'),'equipment',currentModule.id);q('#eqCalc').addEventListener('input',()=>practice());q('#eqCalc').addEventListener('click',e=>{if(e.target.closest('button'))practice();});}
    if(q('#stageLab'))currentModule={kind:'law',id:q('.law.active-law')?.id||'fizik-boyle'};
    ['#stageLab','#stageEq'].forEach(sel=>{const stage=q(sel);if(!stage)return;let down=null;stage.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);stage.addEventListener('pointerup',e=>{if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])>8)practice();down=null;});stage.addEventListener('click',e=>{if(e.target.closest('[data-act],[data-pan]'))practice();});});
    q('#labCap')?.addEventListener('input',practice);q('#labCap')?.addEventListener('click',e=>{if(e.target.closest('button'))practice();});
    if(q('#asyncCard')){const row=make('div','async-review-row'),select=make('select');select.id='asyncReviewSelect';select.setAttribute('aria-label',U('cat.async'));for(const k of ATLAS_CURRICULUM.async){const o=make('option','',U('async.'+k));o.value=k;select.append(o);}const b=button(U('checkAsync'));b.id='async-review';b.onclick=()=>{const k=select.value;if(PROGRESS.stage('async',k)>=2)PROGRESS.record({kind:'async',id:k,stage:3});};select.onchange=updateActivities;row.append(select,b);q('#asyncCard').append(row);}

    if(currentModule)PROGRESS.record({...currentModule,stage:1});updateActivities();
    let pending;try{pending=JSON.parse(sessionStorage.getItem('atlas-resume')||'null');sessionStorage.removeItem('atlas-resume');}catch(e){}if(pending&&pending.page===page){prior=pending;resume();}
  }
  function practice(){if(currentModule)PROGRESS.record({...currentModule,stage:2});}
  function updateActivities(){activities.forEach(box=>{if(box.dataset.kind==='equipment'&&currentModule?.kind==='equipment')box.dataset.id=currentModule.id;box.hidden=!ATLAS_CURRICULUM[box.dataset.kind]?.includes(box.dataset.id);const stage=PROGRESS.stage(box.dataset.kind,box.dataset.id);box.querySelector('p').innerHTML=['viewed','tried','completed'].map((k,i)=>`<span class="${stage>i?'done':''}">${stage>i?'✓ ':''}${U(k)}</span>`).join('<span aria-hidden="true"> → </span>');const b=box.querySelector('button');b.disabled=stage<2||stage===3;b.textContent=U(stage===3?'completed':'markDone');b.title=stage<2?U('practiceHint'):'';box.querySelector('.activity-hint').hidden=stage>=2;});const ab=q('#async-review');if(ab){const sel=q('#asyncReviewSelect');Array.from(sel.options).forEach(o=>o.disabled=PROGRESS.stage('async',o.value)<2);if(sel.selectedOptions[0]?.disabled){const first=Array.from(sel.options).find(o=>!o.disabled);if(first)sel.value=first.value;}const k=sel.value;ab.disabled=!k||PROGRESS.stage('async',k)<2||PROGRESS.stage('async',k)===3;}}
  let workspace, moves=[],opener,timeline,caseEvents=[];
  const clock=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(Math.floor(s%60)).padStart(2,'0');
  function setupWorkspace(){if(!q('#caseCard'))return;workspace=make('dialog','case-workspace');workspace.setAttribute('aria-labelledby','workspace-title');workspace.innerHTML=`<header class="workspace-heading"><div><span class="eyebrow">${U('caseNotice')}</span><h2 id="workspace-title">${U('workspace')}</h2></div><button type="button" class="linkbtn" data-workspace-close>${U('exitWorkspace')} ↗</button></header><div class="workspace-body"></div>`;document.body.append(workspace);
    workspace.querySelector('[data-workspace-close]').onclick=()=>workspace.close();workspace.addEventListener('close',()=>{moves.reverse().forEach(({el,marker})=>{marker.replaceWith(el);});moves=[];document.documentElement.classList.remove('workspace-open');q('#mon3DBtn').hidden=false;opener?.focus();});
    const open=button(U('openWorkspace')+' ↗','primary-button');q('#caseCard .cat-tools').prepend(open);open.onclick=openWorkspace;open.dataset.workspaceOpen='';
    timeline=make('section','case-timeline');timeline.setAttribute('aria-label',U('timeline'));renderTimeline();
    document.addEventListener('atlas:case',e=>{const d=e.detail;if(d.type==='feedback'){const last=caseEvents.slice().reverse().find(x=>x.type==='action');if(last){last.feedback=d.feedback;last.level=d.level;}renderTimeline();return;}if(d.type==='start'){caseEvents=[];q('#catalogWrap').inert=true;openWorkspace();}if(d.type==='end')q('#catalogWrap').inert=false;caseEvents.push(d);if(caseEvents.length>200)caseEvents.splice(0,1);renderTimeline();});
  }
  function openWorkspace(){if(!workspace||workspace.open)return;if(document.fullscreenElement||q('.stage.pseudo'))fsExit();opener=document.activeElement;
    const body=workspace.querySelector('.workspace-body');for(const el of [q('#caseCard'),q('#monitor .mon-grid')]){const marker=document.createComment('workspace return');el.before(marker);moves.push({el,marker});body.append(el);}
    q('.mon-grid > div').append(timeline);ATLAS.sim.workspace(true);q('#mon3DBtn').hidden=true;document.documentElement.classList.add('workspace-open');workspace.showModal();workspace.querySelector('[data-workspace-close]').focus();
  }
  function renderTimeline(){if(!timeline)return;const rows=caseEvents.filter(e=>e.type!=='observe'||!caseEvents.some(a=>a.type==='observe'&&a!==e&&Math.floor(a.time/30)===Math.floor(e.time/30)&&a.time>e.time));
    timeline.innerHTML=`<div class="timeline-heading"><h3>${U('timeline')}</h3><span class="eyebrow">${rows.length}</span></div>${rows.length?'':`<p class="muted">${U('timelineEmpty')}</p>`}<ol>${rows.slice().reverse().map(e=>{const title=e.type==='start'?U('caseStarted'):e.type==='end'?U(e.stopped?'caseStopped':'caseEnded'):e.type==='event'?U('newEvent'):e.type==='action'?e.name:e.type==='resolved'?U(e.missed?'missed':'resolved')+' · '+e.name:U('observe');const v=e.before||e.vitals;return `<li class="timeline-${e.type}"><time>${clock(e.time)}</time><div><strong>${esc(title)}</strong><p>${e.type==='action'?U('before')+' · ':''}SpO₂ ${v.spo2==null?'—':ATLAS.percent(v.spo2)} · HR ${v.hr} · EtCO₂ ${v.et}</p>${e.feedback?`<p class="action-feedback">${esc(e.feedback)}</p>`:''}${e.type==='end'?`<p>${U('caseReview')}</p>`:''}</div></li>`;}).join('')}</ol>`;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
