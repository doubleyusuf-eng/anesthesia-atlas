'use strict';
/* İleri Monitörizasyon Atlası · ultrason cihaz sayfası uzantıları (device.js → window.ICA_EXT)
   clarius-hd3: 8 HD3 modeli arasında seçilen 3B prob + tablette Clarius uygulaması, model bilgi kartı, karşılaştırma tablosu
   ve büyük ekranda uygulama benzetimi. Metinler us-text.js'ten gelir; oradaki kaynak numaraları cihaz sayfasının kaynakçasına
   (content-src/clarius-hd3.json) CL_MAP ile çevrilir. */
(() => {
  const X = window.US_TEXT, P = ICA.pick;
  if (!X) return;
  window.ICA_EXT = window.ICA_EXT || {};
  const T = (tr, en, es) => ({tr, en, es});
  const TX = o => {
    if (o && typeof o === 'object' && !Array.isArray(o) && 'tr' in o) return P(o);
    if (Array.isArray(o)) return o.map(TX);
    if (o && typeof o === 'object') { const r = {}; for (const k in o) r[k] = TX(o[k]); return r; }
    return o;
  };
  const tools = () => `<div class="stage-tools">
      <button type="button" data-act="in" aria-label="${esc(ICA.t('stage.in'))}" title="${esc(ICA.t('stage.in'))}">+</button>
      <button type="button" data-act="out" aria-label="${esc(ICA.t('stage.out'))}" title="${esc(ICA.t('stage.out'))}">−</button>
      <button type="button" data-act="reset" aria-label="${esc(ICA.t('stage.reset'))}" title="${esc(ICA.t('stage.reset'))}">⟲</button>
    </div><span class="stage-hint">${esc(ICA.t('stage.hint'))}</span>`;
  const fitCanvas = (c, onChange) => {
    const fit = () => { const r = c.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1); const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr); if (w > 10 && h > 10 && (w !== c.width || h !== c.height)) { c.width = w; c.height = h; onChange && onChange(); } };
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(c); else addEventListener('resize', fit);
    fit();
  };
  const visible = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.bottom > -60 && r.top < innerHeight + 60; };

  /* ---------- GE LOGIQ P8: "Tuşlar" bölümü (USKEYS); 3B model device.js'in varsayılan görüntüleyicisiyle açılır ----------
     us-keys.js metinlerindeki ultrason sayfası kaynak numaraları cihaz sayfasının kaynakçasına (ge-logiq-p8.json) çevrilir */
  if (typeof USKEYS !== 'undefined') {
    const LG_MAP = {37: 1, 35: 2, 36: 3, 33: 4, 34: 5, 5: 6, 6: 7, 12: 8};
    const inlL = s => esc(s).replace(/(?:\[\d+\])+/g, m => { const ns = m.match(/\d+/g).map(n => LG_MAP[+n]).filter(Boolean); return ns.length ? `<sup class="cite">[${ns.map(n => `<a href="#ref-${n}">${n}</a>`).join(', ')}]</sup>` : ''; });
    const KT = TX(X.keys), LT = {
      hint: T('Modeldeki bir tuşa, düğmeye ya da dokunmatik ekrandaki bir düğmeye tıklayın: resmi ve ne işe yaradığı burada açılır.', 'Click a key, knob or touch-screen button on the model: its picture and what it does open here.', 'Haga clic en una tecla, un mando o un botón de la pantalla táctil del modelo: aquí se abren su imagen y su función.'),
      panel: T('Paneli yakından gör', 'Close-up of the panel', 'Ver el panel de cerca'), all: T('Tüm cihaz', 'Whole system', 'Todo el equipo'),
      pick: T('Tuş seç', 'Choose a control', 'Elegir un control'), list: T('Tüm tuşların listesi ↓', 'List of all controls ↓', 'Lista de todos los controles ↓')
    };
    const keyCard = c => `<div class="uk-big">${USKEYS.keySVG(c.id)}<div><p class="eyebrow">${esc(P(USKEYS.G.find(g => g.id === c.g).n))}${c.k === 'touch' ? ` · ${esc(KT.touchTag)}` : ''}</p><h3>${esc(P(c.n))}</h3>
      <p><b>${esc(KT.what)}</b> ${inlL(P(c.d))}</p>${c.t ? `<p class="uk-tip"><b>${esc(KT.tip)}:</b> ${inlL(P(c.t))}</p>` : ''}</div></div>`;
    const model = {
      html: () => `<div class="workbench lg-bench">
          <div class="stage" id="modelStage"><div class="pins"></div>${tools()}</div>
          <aside class="steps parts-panel lg-side">
            <div class="lg-bar"><button type="button" class="btn" id="lgPanel">${esc(P(LT.panel))}</button><button type="button" class="btn" id="lgAll">${esc(P(LT.all))}</button></div>
            <label class="lg-pick"><span>${esc(P(LT.pick))}</span><select id="lgSel"><option value="">—</option>${USKEYS.G.map(g => `<optgroup label="${esc(P(g.n))}">${USKEYS.C.filter(c => c.g === g.id).map(c => `<option value="${c.id}">${esc(P(c.n))}</option>`).join('')}</optgroup>`).join('')}</select></label>
            <div class="lg-key" id="lgKey" aria-live="polite"><p class="muted">${esc(P(LT.hint))}</p></div>
            <p class="small"><a href="#tuslar">${esc(P(LT.list))}</a></p>
            <p class="eyebrow">${esc(ICA.t('dev.parts'))}</p>
            <div class="part-list" id="partList"></div>
            <div class="part-info" id="partInfo" aria-live="polite"><p class="muted">${esc(ICA.t('dev.partHint'))}</p></div>
            <p class="proto">${esc(ICA.t('dev.modelNote'))}</p>
          </aside>
        </div>`,
      mount(sec, o) {
        const cfg = DEV3D.configs['ge-logiq-p8'], inline = (o && o.inline) || esc;
        const box = $('#lgKey', sec), sel = $('#lgSel', sec), info = $('#partInfo', sec), list = $('#partList', sec);
        let ctl = null;
        function showKey(id, focus) {
          const c = USKEYS.byId.get(id); if (!c) return;
          box.innerHTML = keyCard(c); sel.value = id;
          if (cfg.keys) cfg.keys.select(id);
          if (ctl) { ctl.view.auto = false; if (focus && cfg.keys) { const p = cfg.keys.at(id); if (p) ctl.view.focus(p, c.k === 'touch' ? .42 : c.k === 'kbd' || c.k === 'paddle' ? .5 : .3, 0, c.k === 'touch' ? .78 : c.k === 'paddle' ? 1.25 : .62); } }
        }
        cfg.onKey = id => showKey(id, false);
        const pick = (key, i) => {
          $$('#partList button', sec).forEach((b, k) => b.setAttribute('aria-pressed', k === i));
          info.innerHTML = key ? `<h3>${i + 1}. ${esc(DEV3D.part(key, 0))}</h3><p>${inline(DEV3D.part(key, 1))}</p>` : `<p class="muted">${esc(ICA.t('dev.partHint'))}</p>`;
        };
        ctl = mountStage($('#modelStage', sec), el => DEV3D.mount(el, 'ge-logiq-p8', pick));
        if (!ctl) return;
        list.innerHTML = ctl.parts.map((p, i) => `<button type="button" data-i="${i}" aria-pressed="false"><b>${i + 1}</b> ${esc(DEV3D.part(p.key, 0))}</button>`).join('');
        list.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) ctl.select(+b.dataset.i); });
        sel.addEventListener('change', () => { if (sel.value) showKey(sel.value, true); });
        const panelIdx = ctl.parts.findIndex(p => p.key === 'lg-panel');
        $('#lgPanel', sec).addEventListener('click', () => { if (panelIdx >= 0) ctl.select(panelIdx); });
        $('#lgAll', sec).addEventListener('click', () => ctl.view.onReset());
      }
    };
    window.ICA_EXT['ge-logiq-p8'] = {model, sections: [{
      id: 'tuslar', after: 'model', title: T('Tuşlar', 'Controls', 'Controles'),
      html: () => `<p class="lede us-lede">${esc(P(T('Panelde ya da listede bir tuşa dokunun: resmi, ne işe yaradığı ve kullanım ipucu açılır. Ayarların hangi sırayla yapılacağı ve ultrasonun temelleri Ultrason bölümündedir.', 'Touch a control on the panel or in the list to see its picture, what it does and a tip. The order in which to adjust settings and the basics of ultrasound are in the Ultrasound section.', 'Toque un control en el panel o en la lista para ver su imagen, para qué sirve y un consejo. El orden de los ajustes y los fundamentos de la ecografía están en la sección Ecografía.')))}</p>
        <div class="uk-grid"><div class="uk-panelwrap" id="ukPanel"></div><aside class="steps uk-detail" id="ukDetail" aria-live="polite"></aside></div>
        <div id="ukList"></div>
        <p class="proto">${inlL(P(X.keys.note))}</p>`,
      mount: sec => USKEYS.mountUI({panel: $('#ukPanel', sec), detail: $('#ukDetail', sec), list: $('#ukList', sec)}, {T: TX(X.keys), inl: inlL, label: 'LOGIQ P8'})
    }]};
  }
  /* ---------- Clarius HD3 ---------- */
  if (typeof USM === 'undefined' || !USM) return;
  /* Ultrason sayfası kaynak numarası → clarius-hd3 kaynakçası */
  const CL_MAP = {1: 1, 2: 2, 16: 3, 22: 4, 23: 5, 24: 6, 25: 7, 26: 8, 27: 9, 28: 10, 29: 11, 30: 12, 31: 13, 32: 14, 4: 15, 5: 16, 14: 17};
  const inl = s => esc(s).replace(/(?:\[\d+\])+/g, m => { const ns = m.match(/\d+/g).map(n => CL_MAP[+n]).filter(Boolean); return ns.length ? `<sup class="cite">[${ns.map(n => `<a href="#ref-${n}">${n}</a>`).join(', ')}]</sup>` : ''; });
  const S = X, M = USM.MODELS, ids = Object.keys(M);
  const APP = () => (typeof USAPP !== 'undefined' && USAPP) ? USAPP.get() : null;
  DEV3D.model('clarius-hd3', {type: 'u-clarius', probe: 'clarius-l7', theta: .75, phi: .96});

  const modelPart = {
    html: () => `<p class="lede us-lede">${inl(P(S.models.lede))}</p>
      <div class="chips" id="usChips" role="group" aria-label="${esc(P(S.models.h))}">${ids.map(id => `<button type="button" data-id="${id}" aria-pressed="false">${esc(M[id].name)}</button>`).join('')}</div>
      <div class="workbench">
        <div id="modelHost"></div>
        <aside class="steps parts-panel" aria-live="polite">
          <div id="modelInfo"></div>
          <p class="eyebrow">${esc(P(S.models.parts))}</p>
          <div class="part-list" id="partList"></div>
          <div class="part-info" id="partInfo"><p class="muted">${esc(P(S.models.partHint))}</p></div>
          <p class="proto">${esc(P(S.models.modelNote))}</p>
        </aside>
      </div>
      <div class="us-grid2">
        <div class="us-card"><h3>${esc(P(S.models.common.h))}</h3><ul>${S.models.common.items.map(i => `<li>${inl(P(i))}</li>`).join('')}</ul></div>
        <div class="us-card"><h3>${esc(P(S.models.table))}</h3><div id="cmpTable"></div></div>
      </div>
      <p class="muted us-scope">${inl(P(S.models.scope))}</p>`,
    mount(sec) {
      let view = null;
      const app = APP();
      if (app) { app.setText(TX(S.app.ui)); app.onProbe = id => show(id); }
      function show(id) {
        if (!M[id] || !DEV3D.has(id)) return;
        if (app && app.state.probe !== id) app.setProbe(id);
        $$('#usChips button', sec).forEach(b => b.setAttribute('aria-pressed', b.dataset.id === id));
        if (view) { const i = K3.viewers.indexOf(view); if (i >= 0) K3.viewers.splice(i, 1); try { view.renderer.dispose(); view.renderer.forceContextLoss(); } catch (_) {} view = null; }
        const host = $('#modelHost', sec); host.innerHTML = `<div class="stage" id="modelStage"><div class="pins"></div>${tools()}</div>`;
        const list = $('#partList', sec), info = $('#partInfo', sec);
        const pick = (key, i) => {
          $$('#partList button', sec).forEach((b, k) => b.setAttribute('aria-pressed', k === i));
          info.innerHTML = key ? `<h3>${i + 1}. ${esc(DEV3D.part(key, 0))}</h3><p>${inl(DEV3D.part(key, 1))}</p>` : `<p class="muted">${esc(P(S.models.partHint))}</p>`;
        };
        const ctl = mountStage($('#modelStage', sec), el => DEV3D.mount(el, id, pick));
        if (ctl) {
          view = ctl.view;
          list.innerHTML = ctl.parts.map((p, i) => `<button type="button" data-i="${i}" aria-pressed="false"><b>${i + 1}</b> ${esc(DEV3D.part(p.key, 0))}</button>`).join('');
          list.onclick = e => { const b = e.target.closest('button[data-i]'); if (b) ctl.select(+b.dataset.i); };
        }
        pick(null);
        const m = M[id], K = S.models.k;
        const feats = [m.ne && S.models.feat.ne, m.sc && S.models.feat.sc, m.hi && S.models.feat.hi].filter(Boolean).map(P);
        $('#modelInfo', sec).innerHTML = `<p class="eyebrow">Clarius · ${esc(P(S.models.types[m.kind]))}</p><h3>${esc(m.name)}</h3>
          <dl class="us-spec">
            <div><dt>${esc(P(K.freq))}</dt><dd>${m.f[0]}–${m.f[1]} MHz</dd></div>
            <div><dt>${esc(P(K.depth))}</dt><dd>${m.dmax} cm</dd></div>
            <div><dt>${esc(P(K.fov))}</dt><dd>${esc(m.fovTxt)}</dd></div>
            <div><dt>${esc(P(K.el))}</dt><dd>${m.el}${m.R ? ` · ${esc(P(K.rad))} ${m.R} mm` : ''}</dd></div>
            <div><dt>${esc(P(K.dims))}</dt><dd>${m.dims} mm · ${m.g} g</dd></div>
          </dl>
          <p class="small"><b>${esc(P(K.apps))}:</b> ${esc(P(S.models.apps[id]))} ${inl('[1]')}</p>
          ${feats.length ? `<p class="small"><b>${esc(P(K.feat))}:</b> ${esc(feats.join(' · '))} ${inl('[1]')}</p>` : ''}
          <p class="small us-use"><b>${esc(P(K.use))}:</b> ${inl(P(S.models.use[id]))}</p>`;
        if (history.replaceState) { const u = new URL(location.href); u.searchParams.set('model', id); history.replaceState(null, '', u.pathname + u.search + location.hash); }
      }
      $('#usChips', sec).addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) show(b.dataset.id); });
      $('#cmpTable', sec).innerHTML = `<div class="ptable-wrap"><table class="ptable us-tbl"><thead><tr><th></th><th>${esc(P(S.models.k.type))}</th><th>MHz</th><th>${esc(P(S.models.k.depth))}</th><th>${esc(P(S.models.k.fov))}</th><th>g</th></tr></thead><tbody>${ids.map(id => { const m = M[id]; return `<tr><td><button type="button" class="linkbtn" data-id="${id}">${esc(m.name)}</button></td><td>${esc(P(S.models.types[m.kind]))}</td><td>${m.f[0]}–${m.f[1]}</td><td>${m.dmax} cm</td><td>${esc(m.fovTxt)}</td><td>${m.g}</td></tr>`; }).join('')}</tbody></table></div>`;
      $('#cmpTable', sec).addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) { show(b.dataset.id); sec.scrollIntoView({behavior: REDUCED_MOTION ? 'auto' : 'smooth'}); } });
      const m0 = new URLSearchParams(location.search).get('model');
      show(M[m0] ? m0 : 'clarius-l7');
    }
  };

  /* Uygulama benzetimi: büyük tablet ekranı ve benzetim denetimleri (aynı USAPP durumu 3B tableti de besler) */
  const appPart = {
    id: 'uygulama-benzetimi', after: 'model', title: S.app.h,
    html: () => `<p class="lede us-lede">${inl(P(S.app.lede))}</p>
      <div class="us-appgrid">
        <div class="us-tabletwrap" id="tabletWrap">
          <div class="us-tablet"><canvas id="appCanvas" width="1200" height="800" aria-label="${esc(P(S.app.h))}"></canvas></div>
          <div class="us-tabbar"><button type="button" class="btn us-full" id="appFull" hidden>⤢ <span>${esc(P(S.app.full))}</span></button><span class="us-simtag">${esc(P(S.app.ui.sim))}</span></div>
        </div>
        <aside class="us-ctl us-appside" id="appSide">
          <p class="eyebrow">${esc(P(S.app.simH))}</p>
          <div class="us-row"><span>${esc(P(S.app.view))}</span><div class="us-seg" role="group" data-k="view"><button type="button" data-v="short" aria-pressed="true">${esc(P(S.app.short))}</button><button type="button" data-v="long" aria-pressed="false">${esc(P(S.app.long))}</button></div></div>
          <label class="us-sl" data-angle><span>${esc(P(S.app.angle))}</span><input type="range" data-k="angle" min="-45" max="45" step="1" value="15"><output data-o="angle">15</output><em>°</em></label>
          <label class="us-sl"><span>${esc(P(S.app.press))}</span><input type="range" data-k="press" min="0" max="100" step="5" value="0"><output data-o="press">0</output><em>%</em></label>
          <label class="check"><input type="checkbox" data-k="needle"><span>${esc(P(S.app.needle))}</span></label>
          <label class="us-sl"><span>${esc(P(S.app.adv))}</span><input type="range" data-k="adv" min="5" max="100" step="1" value="70" disabled><output data-o="adv">70</output><em>%</em></label>
          <div class="us-modeinfo" id="appMode" aria-live="polite"></div>
          <p class="us-readout" id="appRead"></p>
        </aside>
      </div>
      <p class="proto">${esc(P(S.app.note))}</p>`,
    mount(sec) {
      const app = APP(), cv = $('#appCanvas', sec), side = $('#appSide', sec);
      if (!app) { sec.hidden = true; return; }
      const g = cv.getContext('2d'), sim = app.sim;
      fitCanvas(cv);
      const toApp = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * app.W, (e.clientY - r.top) / r.height * app.H]; };
      let pid = null;
      cv.addEventListener('pointerdown', e => { const [x, y] = toApp(e); if (app.pointer('down', x, y)) { pid = e.pointerId; try { cv.setPointerCapture(e.pointerId); } catch (_) {} e.preventDefault(); } });
      cv.addEventListener('pointermove', e => { const [x, y] = toApp(e); if (pid === e.pointerId) app.pointer('move', x, y); else if (e.pointerType === 'mouse') cv.style.cursor = app.hover(x, y) ? 'pointer' : ''; });
      const up = e => { if (pid === e.pointerId) { app.pointer('up', 0, 0); pid = null; } };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      const out = k => side.querySelector(`output[data-o="${k}"]`);
      /* Kısa eksende kaydırıcı probun eğimi; uzun eksende damar yerinde durur, kaydırıcı yalnız Doppler ışınını yönlendirir */
      const angLab = side.querySelector('[data-angle]'), ang = angLab.querySelector('input');
      const angUI = () => {
        const long = sim.view === 'long', dop = ['CD', 'PD', 'PW'].includes(app.state.mode), lim = long ? 30 : 45;
        angLab.querySelector('span').textContent = P(long ? S.app.steer : S.app.angle);
        ang.min = -lim; ang.max = lim; if (Math.abs(sim.angle) > lim) { sim.angle = Math.sign(sim.angle) * lim; ang.value = sim.angle; out('angle').textContent = sim.angle; }
        angLab.classList.toggle('dim', long && !dop);
      };
      side.addEventListener('input', e => {
        const k = e.target.dataset.k; if (!k) return;
        if (k === 'angle') { sim.angle = +e.target.value; out(k).textContent = sim.angle; }
        else if (k === 'press') { sim.press = +e.target.value / 100; out(k).textContent = e.target.value; }
        else if (k === 'adv') { sim.adv = +e.target.value / 100; out(k).textContent = e.target.value; }
        else if (k === 'needle') { sim.needle = e.target.checked; side.querySelector('input[data-k="adv"]').disabled = !sim.needle || sim.view !== 'short'; }
      });
      side.addEventListener('click', e => {
        const b = e.target.closest('.us-seg button'); if (!b) return;
        sim.view = b.dataset.v; $$('.us-seg[data-k="view"] button', side).forEach(x => x.setAttribute('aria-pressed', x === b));
        side.querySelector('input[data-k="adv"]').disabled = !sim.needle || sim.view !== 'short';
        side.querySelector('input[data-k="press"]').closest('label').classList.toggle('dim', sim.view !== 'short'); angUI();
      });
      const MI = TX(S.app.modes); let mkey = '';
      const modeInfo = () => {
        const st = app.state, k = st.ne ? 'ne' : st.split ? 'split' : st.mode, key = k + st.probe;
        if (key === mkey) return; mkey = key; angUI();
        const [h, p] = MI[k] || MI.B;
        $('#appMode', sec).innerHTML = `<p class="eyebrow">${esc(P(S.app.tryH))}</p><h3>${esc(h)}</h3><p>${esc(p)}</p>`;
      };
      const wrap = $('#tabletWrap', sec), fb = $('#appFull', sec);
      if (document.fullscreenEnabled && wrap.requestFullscreen) {
        fb.hidden = false;
        fb.addEventListener('click', () => {
          if (document.fullscreenElement) document.exitFullscreen();
          else wrap.requestFullscreen().then(() => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (_) {} }).catch(() => {});
        });
        document.addEventListener('fullscreenchange', () => { fb.querySelector('span').textContent = P(document.fullscreenElement ? S.app.exitFull : S.app.full); });
      }
      const readEl = $('#appRead', sec); let lastRead = 0;
      (function loop(now) {
        if (visible(cv)) {
          app.render(now / 1000); g.drawImage(app.canvas, 0, 0, cv.width, cv.height); modeInfo();
          if (now - lastRead > 300) { lastRead = now; const r = app.readout(); if (r !== readEl.textContent) readEl.textContent = r; }
        }
        requestAnimationFrame(loop);
      })(performance.now());
    }
  };

  window.ICA_EXT['clarius-hd3'] = {model: modelPart, sections: [appPart]};
})();
