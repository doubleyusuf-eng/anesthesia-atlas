'use strict';
/* İleri Monitörizasyon Atlası · cihaz senaryoları: ortak motor
   Bir cihaz senaryo seti kaydeder: SCN.reg(['cihaz-kimliği', ...], spec). Cihaz sayfası (device.js) kayıt varsa
   değerlendirme bölümünden sonra "Senaryolar" bölümünü açar ve SCN.mount(el, id) çağırır.
   spec: {lede, groups:{anahtar: metin}, SC:[{id, g, title, steps:[{lab?, ...durum}], sit, interp, act}],
          draw(st, sc) → HTML (SVG), results(st, sc) → [{l, v (HTML), wide?}], note, refs:[{n, t, p, doi|url}]}
   Metinler {tr, en, es} nesneleridir; [S3] biçimindeki atıflar senaryo kaynakçasına bağlanır.
   SCN.monitor(...) koyu zeminli monitör ekranı çizer: dalga formu satırları ve sağda sayısal değerler. */
const SCN = (() => {
  const T = (tr, en, es) => ({tr, en, es});
  const P = v => v == null ? '' : typeof v === 'object' ? (typeof ICA !== 'undefined' ? ICA.pick(v) : v.tr) : v;
  const lang = () => (typeof ICA !== 'undefined' && ICA.lang) || 'tr';
  const num = (v, d = 0) => { const s = (+v).toFixed(d); return lang() === 'en' ? s : s.replace('.', ','); };
  const pct = v => lang() === 'tr' ? `%${num(v)}` : lang() === 'es' ? `${num(v)} %` : `${num(v)}%`;
  const escH = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const cite = s => escH(s).replace(/(?:\[S\d+\])+/g, m => `<sup class="cite">${[...m.matchAll(/S(\d+)/g)].map(x => `<a href="#sref-${x[1]}">${x[1]}</a>`).join(', ')}</sup>`);
  const fill = (v, o) => { const s = P(v); return s.replace(/\{(\w+)\}/g, (m, k) => o[k] ?? m); };

  const UI = {
    situation: T('Durum', 'Situation', 'Situación'), interp: T('Yorum', 'Interpretation', 'Interpretación'), act: T('Ne yapılır', 'What to do', 'Qué hacer'),
    replay: T('Yeniden oynat', 'Play again', 'Reproducir de nuevo'),
    refsH: T('Senaryo kaynakları', 'Scenario references', 'Referencias de los escenarios'),
    note: T('Eğitim senaryosudur: çizimler ve sayılar örnek değerlerdir, tek bir hastanın ölçümü değildir. Doz ve klinik karar için ilaç prospektüsü, kılavuzlar ve kurum protokolü esas alınır.',
      'Teaching scenario: the drawings and numbers are example values, not measurements from one patient. Use the drug label, guidelines and local protocol for doses and clinical decisions.',
      'Escenario docente: los dibujos y los números son valores de ejemplo, no mediciones de un paciente. Para dosis y decisiones clínicas, consulte la ficha técnica, las guías y el protocolo local.')
  };

  const REG = new Map();
  const reg = (ids, spec) => [].concat(ids).forEach(id => REG.set(id, spec));
  const has = id => REG.has(id);

  function mount(el, idOrSpec) {
    const spec = typeof idOrSpec === 'string' ? REG.get(idOrSpec) : idOrSpec;
    if (!el || !spec) return;
    let cur = spec.SC[0], si = 0;
    const groups = Object.keys(spec.groups);
    el.innerHTML = `
      <p class="lede scn-lede">${cite(P(spec.lede))}</p>
      <div class="scn-pick">${groups.map(g => `<div class="scn-grp"><p class="eyebrow">${escH(P(spec.groups[g]))}</p><div class="scn-chips">${spec.SC.filter(s => s.g === g).map(s => `<button type="button" class="chip" data-s="${s.id}" aria-pressed="false">${escH(P(s.title))}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="scn-main">
        <div class="scn-fig">
          <div class="scn-steps" role="group"></div>
          <div class="scn-draw"></div>
          <button type="button" class="btn scn-replay">↻ ${escH(P(spec.replay || UI.replay))}</button>
        </div>
        <div class="scn-res" aria-live="polite"></div>
      </div>
      <div class="scn-text"></div>
      <p class="proto">${escH(P(spec.note || UI.note))}</p>
      <h3 class="sub">${escH(P(UI.refsH))}</h3>
      <ol class="refs">${spec.refs.map(r => `<li id="sref-${r.n}" value="${r.n}">${escH(r.t)}. <span class="muted">${escH(r.p)}</span>.${r.doi ? ` <a href="https://doi.org/${escH(r.doi)}" rel="noopener">doi:${escH(r.doi)}</a>` : ` <a href="${escH(r.url)}" rel="noopener">${escH(new URL(r.url).hostname.replace(/^www\./, ''))}</a>`}</li>`).join('')}</ol>`;
    const $q = s => el.querySelector(s);
    function draw() {
      const st = cur.steps[si], d = $q('.scn-draw');
      d.innerHTML = spec.draw(st, cur);
      d.className = 'scn-draw' + (spec.drawClass ? ' ' + spec.drawClass(st, cur) : '');
      const steps = $q('.scn-steps');
      steps.innerHTML = cur.steps.length > 1 ? cur.steps.map((s, i) => `<button type="button" data-i="${i}" aria-pressed="${i === si}">${escH(P(s.lab))}</button>`).join('') : '';
      steps.hidden = cur.steps.length < 2;
      $q('.scn-res').innerHTML = `<dl class="scn-dl">${spec.results(st, cur).map(r => `<div${r.wide ? ' class="wide"' : ''}><dt>${escH(P(r.l))}</dt><dd>${r.v}</dd></div>`).join('')}</dl>`;
      const tx = (st.sit || st.interp || st.act) ? Object.assign({}, cur, Object.fromEntries(['sit', 'interp', 'act'].filter(k => st[k]).map(k => [k, st[k]]))) : cur;
      $q('.scn-text').innerHTML = [['situation', tx.sit], ['interp', tx.interp], ['act', tx.act]].filter(x => x[1]).map(([k, v]) => `<div><h3>${escH(P(UI[k]))}</h3><p>${cite(P(v))}</p></div>`).join('');
      el.querySelectorAll('.scn-chips .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.s === cur.id));
    }
    el.addEventListener('click', e => {
      const c = e.target.closest('[data-s]'), s = e.target.closest('.scn-steps [data-i]');
      if (c) { cur = spec.SC.find(x => x.id === c.dataset.s); si = 0; draw(); }
      else if (s) { si = +s.dataset.i; draw(); }
      else if (e.target.closest('.scn-replay')) draw();
    });
    draw();
  }

  /* ---------- Monitör ekranı (SVG) ----------
     rows: [{name, color, pts:[[x 0..1, y 0..1]], h (px), scale:[üst etiket, alt etiket], ref:[{y, lab}], area, extra:[{pts, color}], marks:[{x, y, t}]}]
     nums: [{lab, val, unit, color, sub}]; opts: {w, numW, alarm} */
  function monitor(rows, nums, opts = {}) {
    const narrow = typeof innerWidth !== 'undefined' && innerWidth < 620;   /* telefonda dar çizim alanı: yazılar görece büyük kalır */
    const W = opts.w || (narrow ? 430 : 640), NW = nums && nums.length ? (narrow ? Math.min(opts.numW || 168, 120) : (opts.numW || 168)) : 0, TW = W - NW, pad = 10;
    const H = rows.reduce((a, r) => a + (r.h || 110), 0) + pad;
    const o = [`<svg class="scn-mon" viewBox="0 0 ${W} ${H}" role="img">`, `<rect width="${W}" height="${H}" rx="12" class="bg"/>`];
    let y = pad / 2;
    rows.forEach((r, ri) => {
      const h = r.h || 110, top = y + 18, bot = y + h - 8, ih = bot - top, X = x => pad + x * (TW - 2 * pad), Y = v => bot - v * ih;
      o.push(`<text x="${pad}" y="${y + 13}" class="tname" fill="${r.color}">${escH(P(r.name))}</text>`);
      if (r.scale) { o.push(`<text x="${TW - pad}" y="${top + 4}" class="tsc" text-anchor="end">${escH(r.scale[0])}</text><text x="${TW - pad}" y="${bot}" class="tsc" text-anchor="end">${escH(r.scale[1])}</text>`); }
      (r.ref || []).forEach(q => o.push(`<line x1="${pad}" x2="${TW - pad}" y1="${Y(q.y)}" y2="${Y(q.y)}" class="tref"/>${q.lab ? `<text x="${pad + 2}" y="${Y(q.y) - 3}" class="tsc">${escH(P(q.lab))}</text>` : ''}`));
      if (r.pts && r.pts.length) {
        const d = r.pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join('');
        if (r.area) o.push(`<path d="${d}L${X(r.pts[r.pts.length - 1][0]).toFixed(1)} ${bot}L${X(r.pts[0][0]).toFixed(1)} ${bot}Z" fill="${r.color}" opacity=".18" class="tarea"/>`);
        o.push(`<path d="${d}" class="trace" stroke="${r.color}" pathLength="1" style="animation-delay:${ri * .15}s"/>`);
      }
      (r.extra || []).forEach(e => o.push(`<path d="${e.pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join('')}" class="trace" stroke="${e.color}" pathLength="1" style="animation-delay:${ri * .15}s"/>`));
      (r.marks || []).forEach(m => o.push(`<text x="${X(m.x)}" y="${Y(m.y)}" class="tmark" text-anchor="middle" fill="${m.color || r.color}">${escH(P(m.t))}</text>`));
      if (ri < rows.length - 1) o.push(`<line x1="${pad}" x2="${TW - pad}" y1="${y + h}" y2="${y + h}" class="tsep"/>`);
      y += h;
    });
    if (NW) {
      const x0 = TW, bh = (H - pad) / nums.length;
      o.push(`<line x1="${x0}" x2="${x0}" y1="${pad}" y2="${H - pad}" class="tsep"/>`);
      nums.forEach((n, i) => {
        const yy = pad / 2 + i * bh;
        o.push(`<text x="${x0 + 12}" y="${yy + 16}" class="nlab" fill="${n.color}">${escH(P(n.lab))}</text>`);
        o.push(`<text x="${W - 12}" y="${yy + bh * .62}" class="nval${n.small ? ' sm' : ''}" text-anchor="end" fill="${n.color}">${escH(P(n.val))}</text>`);
        if (n.unit) o.push(`<text x="${W - 12}" y="${yy + 16}" class="nunit" text-anchor="end">${escH(P(n.unit))}</text>`);
        if (n.sub) o.push(`<text x="${W - 12}" y="${yy + bh * .62 + 18}" class="nsub" text-anchor="end" fill="${n.color}">${escH(P(n.sub))}</text>`);
      });
    }
    if (opts.alarm) o.push(`<rect x="${pad}" y="${pad / 2}" width="${TW - 2 * pad}" height="0" />`);
    o.push('</svg>');
    return o.join('');
  }

  /* Sonuç kartı yardımcıları */
  const badge = (txt, cls) => `<span class="scn-cat c-${cls}">${escH(P(txt))}</span>`;
  const okno = (ok, a, b) => `<span class="scn-ext ${ok ? 'ok' : 'no'}">${ok ? '✓ ' : '✕ '}${escH(P(ok ? a : b))}</span>`;

  return {T, P, num, pct, escH, cite, fill, reg, has, mount, monitor, badge, okno, UI};
})();
