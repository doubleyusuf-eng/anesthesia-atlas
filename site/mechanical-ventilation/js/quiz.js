'use strict';
/* Mekanik Ventilasyon Atlası · ilerleme ve sınav
   İlerleme yalnızca bu tarayıcıda (localStorage) tutulur; erişilemezse oturum boyunca bellekte kalır.
   Mod kartı için aşamalar: 1 incelendi, 2 sorusu denendi, 3 sorusu doğru yanıtlandı. Sorular için son yanıt ayrıca tutulur. */
const PROG = (() => {
  const LS = 'mva-progress-v1';
  let st = {items: {}, q: {}};
  try { const r = JSON.parse(localStorage.getItem(LS) || 'null'); if (r && r.items) st = Object.assign({q: {}}, r); } catch (e) {}
  const save = () => { try { localStorage.setItem(LS, JSON.stringify(st)); } catch (e) {} render(); };
  const stage = id => (st.items[id] || 0);
  const mark = (id, s) => { if (stage(id) >= s) return; st.items[id] = s; save(); };
  const answer = (q, ok) => { st.q[q.id] = ok; if (q.mode) mark(q.mode, ok ? 3 : 2); else save(); };
  const last = id => st.q[id];
  const quiz = () => window.MVA_QUIZ || [];
  const pct = () => { const Q = quiz(); return Q.length ? Math.round(Q.filter(q => st.q[q.id] === true).length / Q.length * 100) : 0; };
  let btn = null;
  function render() {
    if (!btn) return;
    const p = pct(), seen = Object.values(st.items).filter(x => x >= 1).length;
    btn.style.setProperty('--p', p);
    btn.querySelector('b').textContent = p + '%';
    btn.title = MVA.fill(MVA.t('prog.title'), {p, seen, total: (window.MVA_CONTENT || {modes: []}).modes.length});
  }
  function mount() {
    const slot = document.querySelector('.prog-slot'); if (!slot) return;
    slot.innerHTML = `<a class="prog" href="#/sinav"><span class="ring" aria-hidden="true"></span><b>0%</b></a>`;
    btn = slot.firstChild; render();
  }
  const reset = () => { st = {items: {}, q: {}}; save(); };
  return {stage, mark, answer, last, pct, mount, reset};
})();

const QUIZ = (() => {
  const T = k => MVA.t(k);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const Q = () => window.MVA_QUIZ || [];
  /* Seçenek sırası soru kimliğine bağlı sabit karıştırma (her açılışta aynı) */
  const order = q => { let h = 0; for (const c of q.id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return [0, 1, 2, 3].map(i => [i, (h >> (i * 5)) & 31]).sort((a, b) => a[1] - b[1]).map(x => x[0]); };

  function card(q, n, total) {
    return `<div class="qcard" data-id="${q.id}">
      <p class="eyebrow">${n != null ? `${n} / ${total} · ` : ''}${esc(T('qz.t.' + q.topic))}${q.mode ? ` · <a href="#/mod/${q.mode}">${esc(modeName(q.mode))}</a>` : ''}</p>
      <h3>${esc(q.q)}</h3>
      <div class="opts">${order(q).map(i => `<button type="button" class="opt" data-i="${i}">${esc(q.o[i])}</button>`).join('')}</div>
      <div class="qex" hidden></div>
    </div>`;
  }
  const modeName = id => { const m = (window.MVA_CONTENT.modes || []).find(x => x.id === id); if (!m) return id; const p = m.title.split(' — '); return p[p.length - 1]; };
  function bind(box, q, onDone) {
    box.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      if (box.dataset.done) return; box.dataset.done = 1;
      const i = +b.dataset.i, ok = i === q.a;
      box.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (+x.dataset.i === q.a) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      const ex = box.querySelector('.qex'); ex.hidden = false;
      ex.innerHTML = `<p class="${ok ? 'ok' : 'no'}"><b>${T(ok ? 'qz.right' : 'qz.wrong')}</b> ${esc(q.ex)}</p>${q.src && q.src.length ? `<p class="muted small">${T('src.inline')} ${q.src.map(n => `<a class="cite" href="#/kaynaklar/${n}">${n}</a>`).join(' ')}</p>` : ''}`;
      PROG.answer(q, ok); onDone && onDone(ok);
    }));
  }
  /* Mod sayfasındaki tek soru */
  function inline(panel, modeId) {
    const q = Q().find(x => x.mode === modeId);
    if (!q) { panel.innerHTML = `<p class="muted">${T('qz.none')}</p>`; return; }
    panel.innerHTML = card(q); bind(panel.querySelector('.qcard'), q);
  }
  /* Sınav sayfası: tek soru ekranda, ileri/geri; konu süzgeci; yanlışları tekrar */
  function page(el) {
    const topics = ['all', 'mod', 'ekran', 'asenkroni', 'fizik', 'klinik', 'pediatri', 'wrong'];
    let topic = 'all', list = [], i = 0, score = {ok: 0, n: 0};
    el.innerHTML = `<header class="page-head wrap"><p class="eyebrow">${T('tab.sinav')}</p><h1>${T('qz.title')}</h1><p class="lede">${T('qz.lede')}</p></header>
    <section class="wrap quiz">
      <div class="seg qz-topics" role="group">${topics.map(t => `<button class="chip" data-t="${t}" aria-pressed="${t === 'all'}">${T('qz.t.' + t)} <span class="muted" data-c="${t}"></span></button>`).join('')}</div>
      <div class="qz-stage"></div>
      <nav class="qz-nav"><button type="button" class="btn-ghost" data-d="-1">← ${T('qz.prev')}</button><span class="qz-score"></span><button type="button" class="btn" data-d="1">${T('qz.next')} →</button></nav>
      <p class="qz-foot muted small"><span class="qz-pct"></span> · <button type="button" class="linkbtn" id="qzReset">${T('qz.reset')}</button></p>
    </section>`;
    const counts = () => topics.forEach(t => { const n = pick(t).length; el.querySelector(`[data-c="${t}"]`).textContent = n; });
    const pick = t => Q().filter(q => t === 'all' ? true : t === 'wrong' ? PROG.last(q.id) === false : q.topic === t);
    const show = () => {
      const stg = el.querySelector('.qz-stage');
      if (!list.length) { stg.innerHTML = `<p class="muted">${T(topic === 'wrong' ? 'qz.noWrong' : 'qz.none')}</p>`; return; }
      i = (i + list.length) % list.length;
      const q = list[i]; stg.innerHTML = card(q, i + 1, list.length);
      bind(stg.querySelector('.qcard'), q, ok => { score.n++; if (ok) score.ok++; paint(); counts(); });
    };
    const paint = () => { el.querySelector('.qz-score').textContent = score.n ? MVA.fill(T('qz.score'), score) : ''; el.querySelector('.qz-pct').textContent = MVA.fill(T('qz.overall'), {p: PROG.pct()}); };
    el.querySelectorAll('.qz-topics .chip').forEach(b => b.addEventListener('click', () => { el.querySelectorAll('.qz-topics .chip').forEach(x => x.setAttribute('aria-pressed', x === b)); topic = b.dataset.t; list = pick(topic); i = 0; show(); }));
    el.querySelectorAll('.qz-nav button').forEach(b => b.addEventListener('click', () => { i += +b.dataset.d; show(); }));
    el.querySelector('#qzReset').addEventListener('click', () => { PROG.reset(); score = {ok: 0, n: 0}; paint(); counts(); list = pick(topic); show(); });
    list = pick(topic); counts(); paint(); show();
  }
  return {inline, page};
})();
