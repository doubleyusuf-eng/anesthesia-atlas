'use strict';
/* Additive teaching layer: never changes ventilation settings or simulator state. */
(() => {
  function init() {
    const host=document.querySelector('#ventilator .wrap');
    if(!host)return;
    const t=key=>ATLAS.ui('ventGlossary.'+key);
    const entries=t('entries');
    if(!Array.isArray(entries))return;
    const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;};
    const section=el('section','vent-glossary');section.id='vent-glossary';section.setAttribute('aria-labelledby','vent-glossary-title');
    const header=el('div','glossary-heading');const title=el('h3','',t('title'));title.id='vent-glossary-title';header.append(title,el('p','muted',t('intro')));section.append(header);
    const tools=el('div','glossary-tools');const label=el('label','glossary-search');label.htmlFor='vent-term-search';label.append(el('span','',t('search')));
    const search=el('input');search.type='search';search.id='vent-term-search';search.placeholder=t('placeholder');label.append(search);tools.append(label);
    const filters=el('div','glossary-filters');filters.setAttribute('role','group');filters.setAttribute('aria-label',t('title'));
    let group='all';
    for(const key of ['all','pressure','volume','mechanics','timing','modes','synchrony']){const b=el('button','',t(key));b.type='button';b.dataset.group=key;b.setAttribute('aria-pressed',String(key===group));b.addEventListener('click',()=>{group=key;filter();});filters.append(b);}
    tools.append(filters);section.append(tools);
    const status=el('p','glossary-status');status.setAttribute('role','status');section.append(status);
    const list=el('div','glossary-list');const cards=new Map(),groups=new Map();
    for(const key of ['pressure','volume','mechanics','timing','modes','synchrony']){const g=el('div','glossary-group');g.dataset.group=key;const grid=el('div','glossary-grid');g.append(el('h4','glossary-group-title',t(key)),grid);list.append(g);groups.set(key,{g,grid});}
    for(const entry of entries){
      const card=el('details','glossary-term');card.id='vent-term-'+entry.id;card.dataset.group=entry.group;
      const summary=el('summary');summary.append(el('span','glossary-term-title',entry.title));card.append(summary);
      const body=el('div','glossary-body');
      if(window.VENT_FIGURES){const fig=el('figure','vfig');body.append(fig);
        card.addEventListener('toggle',()=>{if(!card.open||fig.childElementCount)return;const cap=ATLAS.ui('ventFig.cap.'+entry.id),svg=VENT_FIGURES.render(entry.id,fig.clientWidth*1.15);if(!svg){fig.remove();return;}
          const box=el('div','vfig-box');box.innerHTML=svg;box.firstElementChild.setAttribute('role','img');box.firstElementChild.setAttribute('aria-label',cap);fig.append(box,el('figcaption','',cap));});}
      if(entry.simple){const box=el('div','glossary-simple');box.append(el('h4','',t('simple')),el('p','',entry.simple));body.append(box);}
      for(const [key,value] of [['definition',entry.text],['why',entry.why],['how',entry.how]]){if(!value)continue;body.append(el('h4','',t(key)),el('p','',value));}
      card.append(body);(groups.get(entry.group)||groups.get('pressure')).grid.append(card);cards.set(entry.id,{card,entry});
    }
    section.append(list);
    const note=el('p','glossary-note',t('note'));section.append(note);
    const sources=el('div','glossary-sources');sources.append(el('strong','',t('sources')+': '));
    for(const [name,url] of [
      ['AARC · Patient–Ventilator Assessment (2024)','https://www.aarc.org/wp-content/uploads/2024/10/patient-ventilator-assessment-aarc-cpg.pdf'],
      ['Hamilton Medical · Operator’s Manual','https://www.hamilton-medical.com/dam/jcr%3A32ec370d-3b9e-45b4-92d4-0f40fef81bd3/HAMILTON-C6-OpsMan-v1.x.x-EN-624945.01.pdf'],
      ['Dräger · Ventilation modes','https://www.draeger.com/Content/Documents/Products/nomenclature-bk-9066477-en.pdf'],
      ['Walter et al. · Invasive Mechanical Ventilation','https://pmc.ncbi.nlm.nih.gov/articles/PMC6284234/']
    ]){const a=el('a','',name);a.href=url;sources.append(a);}
    section.append(sources);host.append(section);
    const normalize=s=>s.toLocaleLowerCase(ATLAS.locale).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
    function filter(){const query=normalize(search.value.trim());let count=0;for(const {card,entry}of cards.values()){
      const show=(group==='all'||entry.group===group)&&normalize([entry.title,entry.simple||'',entry.text,entry.why||'',entry.how||'',entry.id].join(' ')).includes(query);card.hidden=!show;if(show)count++;
    }for(const {g}of groups.values())g.hidden=!g.querySelector('.glossary-term:not([hidden])');for(const b of filters.children)b.setAttribute('aria-pressed',String(b.dataset.group===group));status.textContent=count?`${count} / ${entries.length} ${t('count')}`:t('empty');}
    search.addEventListener('input',filter);filter();
    async function reveal(id,focus=true){const found=cards.get(id);if(!found)return;group='all';search.value='';filter();found.card.open=true;
      if(document.fullscreenElement&&document.exitFullscreen){try{await document.exitFullscreen();}catch{return;}}
      else if(typeof fsExit==='function'&&document.querySelector('.is-fs'))fsExit();
      requestAnimationFrame(()=>{if(focus)found.card.querySelector('summary').focus({preventScroll:true});found.card.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
    }
    function link(id,text){const entry=cards.get(id)?.entry;if(!entry)return null;const a=el('a','vent-term-help',text||'?');a.href='#vent-term-'+id;a.setAttribute('aria-label',t('help')+': '+entry.title);a.title=entry.title;return a;}
    const controls={vtS:'vt',piS:'pinsp',psS:'ps',rrS:'rr',ieS:'ie',peS:'peep',cS:'compliance',rS:'resistance',hS:'pbw',wtS:'patient',efS:'effort',srS:'spontaneous',etS:'effort-time',tgS:'flow-trigger',cyS:'cycling'};
    for(const [id,term]of Object.entries(controls)){const label=document.querySelector(`label[for="${id}"]`);const a=link(term);if(label&&a)label.append(a);}
    for(const [selector,term]of [['#ptSeg','patient'],['#vPresets','presets'],['#sexSeg','pbw']]){const target=document.querySelector(selector);const a=link(term,t('help'));if(target&&a){a.classList.add('vent-help-caption');target.after(a);}}
    const modeGroup=document.querySelector('#ventilator [data-mode]')?.parentElement;
    if(modeGroup){const links=el('nav','vent-help-links');links.setAttribute('aria-label',t('modes'));for(const mode of ['vcv','pcv','prvc','simv','psv','cpap'])links.append(link(mode,mode.toUpperCase()+' ?'));modeGroup.after(links);}
    const screen=document.querySelector('.vent-screen');
    if(screen){const links=el('nav','vent-help-links vent-readout-help');links.setAttribute('aria-label',t('help'));links.append(el('span','',t('help')+':'));for(const id of ['ppeak','pplat','driving','total-peep','vt','pbw','rr','mv'])links.append(link(id,cards.get(id).entry.title.split(' · ')[0]));screen.after(links);}
    const jump=el('a','linkbtn glossary-jump',t('title')+' ↓');jump.href='#vent-glossary';document.querySelector('#ventilator .chapter-head')?.after(jump);
    document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#vent-term-"]');if(!a)return;const id=a.hash.slice('#vent-term-'.length);if(!cards.has(id))return;e.preventDefault();history.replaceState(null,'',a.hash);reveal(id);});
    function fromHash(){if(location.hash.startsWith('#vent-term-'))reveal(location.hash.slice('#vent-term-'.length),false);}
    window.addEventListener('hashchange',fromHash);fromHash();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
