'use strict';
/* İleri Monitörizasyon Atlası · sorular
   Soru verisi: data/quiz-*.js → window.ICA_QUIZ[id] = {q, o[4], a, ex, src}; metinler {tr,en,es}.
   QUIZ.card(id, opts) tek bir soru kartı üretir (cihaz sayfası ve sınav sayfası ortak kullanır).
   Şıkların sırası her gösterimde karıştırılır. Yanıtlar PROG.answer ile ilerlemeye işlenir.
   Sınav sayfası (#quizApp): kategori ya da "yanlışlarım" seçimi, 10 soruluk tur, sonunda özet. */
const QUIZ = (() => {
  const Q = window.ICA_QUIZ || {};
  const has = id => !!Q[id];
  const shuffle = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const devHref = (id, sec) => DB.url(id) + (sec ? '#' + sec : '');
  /* İçerik bölüm anahtarı → cihaz sayfasındaki bölüm kimliği */
  const SEC = {overview: 'genel', principle: 'prensip', placement: 'uygulama', use: 'kullanim', params: 'parametreler', eval: 'degerlendirme', trouble: 'sorunlar', special: 'ozel', roles: 'roller'};

  /* Tek soru kartı. opts: {head: başlık HTML'i, link: cihaz bağlantısı gösterilsin mi, onDone(ok)} */
  function card(id, opts = {}) {
    const x = Q[id]; if (!x) return null;
    const el = document.createElement('div'); el.className = 'qcard';
    const order = shuffle([0, 1, 2, 3]);
    const sec = SEC[x.src] || null;
    el.innerHTML = `${opts.head || ''}<p class="qstem">${esc(ICA.pick(x.q))}</p>
      <div class="qopts" role="group">${order.map((k, i) => `<button type="button" data-k="${k}"><span class="ql">${'ABCD'[i]}</span><span>${esc(ICA.pick(x.o[k]))}</span></button>`).join('')}</div>
      <div class="qfeed" aria-live="polite" hidden></div>`;
    const feed = el.querySelector('.qfeed');
    el.querySelector('.qopts').addEventListener('click', e => {
      const b = e.target.closest('button[data-k]'); if (!b || b.disabled) return;
      const k = +b.dataset.k, ok = k === x.a;
      el.querySelectorAll('.qopts button').forEach(o => { o.disabled = true; const kk = +o.dataset.k; if (kk === x.a) o.classList.add('right'); else if (o === b) o.classList.add('wrong'); });
      b.setAttribute('aria-pressed', 'true');
      feed.hidden = false; feed.className = 'qfeed ' + (ok ? 'ok' : 'no');
      feed.innerHTML = `<p class="qverdict">${esc(ICA.t(ok ? 'quiz.right' : 'quiz.wrong'))}</p><p>${esc(ICA.pick(x.ex))}</p>
        <p class="qsrc">${opts.link
          ? `<a href="${devHref(id, sec)}">${esc(ICA.fill(ICA.t('quiz.readMore'), {d: DB.name(DB.byId.get(id))}))}</a>`
          : sec ? `<a href="#${sec}">${esc(ICA.fill(ICA.t('quiz.source'), {s: ICA.t('dev.sec.' + x.src)}))}</a>` : ''}</p>`;
      if (typeof PROG !== 'undefined') PROG.answer(id, ok);
      if (opts.onDone) opts.onDone(ok);
    });
    return el;
  }

  /* Cihaz sayfasındaki "Kendini sına" bölümü */
  function mountDevice(host, id) {
    if (!has(id)) { host.innerHTML = `<p class="pending">${esc(ICA.t('quiz.none'))}</p>`; return; }
    const draw = () => {
      host.innerHTML = '';
      const st = typeof PROG !== 'undefined' ? PROG.stage(id) : 0;
      const c = card(id, {head: st === 3 ? `<p class="qstate ok">${esc(ICA.t('quiz.doneBefore'))}</p>` : '', onDone: () => {
        const more = document.createElement('p'); more.className = 'qmore';
        more.innerHTML = `<button type="button" class="btn">${esc(ICA.t('quiz.again'))}</button> <a class="btn primary" href="${PROG.quizHref(DB.byId.get(id).cat)}">${esc(ICA.t('quiz.moreCat'))}</a>`;
        more.querySelector('button').addEventListener('click', draw);
        c.append(more);
      }});
      host.append(c);
    };
    draw();
  }

  /* Sınav sayfası */
  function mountPage(app) {
    const N = 10, params = new URLSearchParams(location.search);
    const pool = k => k === 'wrong' ? PROG.wrong().filter(has)
      : k === 'new' ? DB.devices.filter(d => has(d.id) && PROG.stage(d.id) < 3).map(d => d.id)
      : DB.devices.filter(d => has(d.id) && (!k || k === 'all' || DB.inCat(d, k))).map(d => d.id);
    function menu(sel) {
      const opts = [['all', ICA.t('quiz.all')], ['new', ICA.t('quiz.new')], ['wrong', ICA.t('quiz.wrongOnly')], ...DB.cats.map(c => [c.id, ICA.pick(c.short)])];
      app.innerHTML = `<div class="qmenu">
        <p class="lede">${esc(ICA.fill(ICA.t('quiz.intro'), {n: N, t: Object.keys(Q).length}))}</p>
        <div class="qchoices" role="radiogroup" aria-label="${esc(ICA.t('quiz.pick'))}">${opts.map(([k, l]) => {
          const n = pool(k).length, c = k === 'all' || k === 'new' || k === 'wrong' ? null : PROG.counts(pool(k));
          return `<label class="qchoice${n ? '' : ' off'}"><input type="radio" name="qk" value="${k}"${k === sel ? ' checked' : ''}${n ? '' : ' disabled'}>
            <span><b>${esc(l)}</b><em>${esc(ICA.fill(ICA.t('quiz.nq'), {n}))}${c ? ` · ${esc(ICA.fill(ICA.t('prog.doneShort'), {d: c.done, n: c.total}))}` : ''}</em></span></label>`;
        }).join('')}</div>
        <p><button type="button" class="btn primary" id="qstart">${esc(ICA.t('quiz.start'))}</button></p></div>`;
      const startBtn = app.querySelector('#qstart');
      const cur = () => (app.querySelector('input[name=qk]:checked') || {}).value;
      const sync = () => { startBtn.disabled = !cur() || !pool(cur()).length; };
      app.onchange = sync; sync();
      startBtn.addEventListener('click', () => { const k = cur(); history.replaceState(null, '', '?k=' + k); run(k); });
    }
    function run(k) {
      const ids = shuffle(pool(k)).slice(0, N); if (!ids.length) return menu(k);
      const res = []; let i = 0;
      const step = () => {
        if (i >= ids.length) return done(k, ids, res);
        app.innerHTML = `<div class="qrun"><div class="qbar" aria-hidden="true">${ids.map((_, j) => `<span class="${j < i ? (res[j] ? 'ok' : 'no') : j === i ? 'cur' : ''}"></span>`).join('')}</div></div>`;
        const id = ids[i], d = DB.byId.get(id);
        const c = card(id, {link: true, head: `<p class="eyebrow">${esc(ICA.fill(ICA.t('quiz.qn'), {i: i + 1, n: ids.length}))} · ${esc(DB.name(d))}</p>`, onDone: ok => {
          res[i] = ok;
          const nx = document.createElement('p'); nx.className = 'qmore';
          nx.innerHTML = `<button type="button" class="btn primary">${esc(ICA.t(i === ids.length - 1 ? 'quiz.finish' : 'quiz.next'))}</button>`;
          nx.querySelector('button').addEventListener('click', () => { i++; step(); });
          c.append(nx); nx.querySelector('button').focus();
        }});
        app.querySelector('.qrun').append(c);
        app.scrollIntoView({block: 'start', behavior: 'auto'});
      };
      step();
    }
    function done(k, ids, res) {
      const ok = res.filter(Boolean).length, w = PROG.wrong().filter(has).length;
      app.innerHTML = `<div class="qdone"><p class="eyebrow">${esc(ICA.t('quiz.result'))}</p><h2>${ok} / ${ids.length}</h2>
        <ul class="qlist">${ids.map((id, j) => `<li class="${res[j] ? 'ok' : 'no'}"><span>${res[j] ? '✓' : '✗'}</span><a href="${devHref(id, SEC[Q[id].src])}">${esc(DB.name(DB.byId.get(id)))}</a></li>`).join('')}</ul>
        <p class="qmore"><button type="button" class="btn primary" data-a="again">${esc(ICA.t('quiz.newRound'))}</button>
          ${w ? `<button type="button" class="btn" data-a="wrong">${esc(ICA.fill(ICA.t('prog.retry'), {n: w}))}</button>` : ''}
          <button type="button" class="btn" data-a="menu">${esc(ICA.t('quiz.menu'))}</button></p></div>`;
      app.querySelector('.qmore').addEventListener('click', e => {
        const a = (e.target.closest('button') || {}).dataset?.a; if (!a) return;
        if (a === 'again') run(k); else if (a === 'wrong') { history.replaceState(null, '', '?k=wrong'); run('wrong'); } else menu(k);
      });
    }
    const k0 = params.get('k');
    menu(k0 && (k0 === 'all' || k0 === 'new' || k0 === 'wrong' || DB.cats.some(c => c.id === k0)) ? k0 : 'all');
  }

  return {has, card, mountDevice, mountPage, count: () => Object.keys(Q).length};
})();
