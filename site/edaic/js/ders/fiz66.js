/* Bölüm 66 · Karaciğer işlevi — bileşenler (tarif: docs/tasarim/fiz66.md; K1 s. 299–305).
   Tek yerleşim: dar telefon genişliğine göre çizilmiş viewBox (360 birim), geniş ekranda en çok 520 px ile ortalanır. */
(() => {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const S = (tag, a, p, txt) => { const e = document.createElementNS(NS, tag); for (const k in (a || {})) e.setAttribute(k, a[k]); if (txt != null) e.textContent = txt; if (p) p.appendChild(e); return e; };
  const svgRoot = (h, label, w = 360) => S('svg', { viewBox: `0 0 ${w} ${h}`, class: 'f66-svg', role: 'img', 'aria-label': label });
  const T = (p, x, y, txt, cls = '', anc) => S('text', { x, y, class: 'f66-t ' + cls, 'text-anchor': anc || 'start' }, p, txt);
  const R = (p, x, y, w, h, cls, rx = 8) => S('rect', { x, y, width: w, height: h, rx, class: cls }, p);
  const poly = (pts) => pts.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
  const capOf = (el) => el.closest('.viz').querySelector('.viz-cap');
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  // düğüm: sol-üst köşe + boyut + sınıf + metin (\n ile satırlar)
  const Nd = (p, x, y, w, h, cls, txt, tcls = '') => {
    const g = S('g', {}, p); R(g, x, y, w, h, 'f66-n ' + cls, Math.min(10, h / 2));
    const ls = String(txt).split('\n'), lh = 14, y0 = y + h / 2 - ((ls.length - 1) * lh) / 2 + 4.2;
    ls.forEach((s, i) => T(g, x + w / 2, y0 + i * lh, s, tcls, 'middle'));
    return g;
  };
  // ok: çoklu nokta + uç; renk CSS değişkeni
  const Ok = (p, pts, renk, w = 2, kesik) => {
    const g = S('g', {}, p), n = pts.length, [x1, y1] = pts[n - 2], [x2, y2] = pts[n - 1];
    const a = Math.atan2(y2 - y1, x2 - x1), hs = 4 + w * 1.4;
    const body = S('path', { d: poly(pts), fill: 'none', style: `stroke:${renk};stroke-width:${w};stroke-linejoin:round${kesik ? ';stroke-dasharray:5 4' : ''}` }, g);
    const hx = (k) => [x2 - hs * Math.cos(a + k), y2 - hs * Math.sin(a + k)];
    const [ax, ay] = hx(0.45), [bx, by] = hx(-0.45);
    S('path', { d: `M${x2} ${y2} L${ax.toFixed(1)} ${ay.toFixed(1)} L${bx.toFixed(1)} ${by.toFixed(1)}Z`, style: `fill:${renk};stroke:none` }, g);
    return g;
  };
  // parçacık akışı: çoklu nokta boyunca n nokta; RM'de yok
  function Akis(p, pts, renk, n, hiz, r = 3.2, renk2) {
    const g = S('g', { class: 'f66-akis' }, p), seg = []; let L = 0;
    for (let i = 0; i < pts.length - 1; i++) { const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); seg.push([L, d]); L += d; }
    const dots = RM ? [] : Array.from({ length: n }, (_, i) => ({ ph: i / n, c: S('circle', { r }, g) }));
    const pos = (f) => { const d = f * L; for (let i = 0; i < seg.length; i++) if (d <= seg[i][0] + seg[i][1] + 1e-6) { const u = seg[i][1] ? (d - seg[i][0]) / seg[i][1] : 0; return [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)]; } return pts[pts.length - 1]; };
    const o = { g, kes: 1, hiz, L,
      ciz() { dots.forEach((d) => { const f = d.ph; const [x, y] = pos(f); d.c.setAttribute('cx', x.toFixed(1)); d.c.setAttribute('cy', y.toFixed(1)); d.c.style.fill = renk2 ? `color-mix(in srgb, ${renk2} ${(f * 100).toFixed(0)}%, ${renk})` : renk; d.c.style.opacity = f > o.kes ? 0 : 1; }); },
      upd(dt) { dots.forEach((d) => { d.ph = (d.ph + (dt * o.hiz) / L) % 1; }); o.ciz(); },
      goster(v) { g.style.display = v ? '' : 'none'; } };
    o.ciz();
    return o;
  }
  // adım düğmeleri: Geri / İleri(Baştan) / Oynat + numara düğmeleri; onSet(i, yeniMi)
  function Adim(host, n, onSet) {
    const row = document.createElement('div'); row.className = 'f66-ctl';
    row.innerHTML = `<div class="btn-row"><button type="button" class="btn ghost" data-a="geri">← Geri</button><button type="button" class="btn" data-a="ileri">İleri →</button>${RM ? '' : '<button type="button" class="btn ghost" data-a="oyn" aria-pressed="false">Oynat</button>'}</div>
      <div class="f66-nums" role="group" aria-label="Adım seç">${Array.from({ length: n }, (_, i) => `<button type="button" data-i="${i}" aria-pressed="false" aria-label="Adım ${i + 1}">${i + 1}</button>`).join('')}</div>`;
    host.appendChild(row);
    let cur = 0, run = false, acc = 0;
    const q = (s) => row.querySelector(s);
    const upd = () => {
      row.querySelectorAll('[data-i]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === cur)));
      q('[data-a=geri]').disabled = cur === 0;
      q('[data-a=ileri]').textContent = cur === n - 1 ? 'Baştan' : 'İleri →';
      const oy = q('[data-a=oyn]'); if (oy) { oy.setAttribute('aria-pressed', String(run)); oy.textContent = run ? 'Duraklat' : 'Oynat'; }
    };
    const set = (i) => { cur = clamp(i, 0, n - 1); acc = 0; upd(); onSet(cur); };
    row.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.i != null) { run = false; set(+b.dataset.i); }
      else if (b.dataset.a === 'geri') { run = false; set(cur - 1); }
      else if (b.dataset.a === 'ileri') { run = false; set(cur === n - 1 ? 0 : cur + 1); }
      else if (b.dataset.a === 'oyn') { run = !run; if (run && cur === n - 1) set(0); upd(); }
    });
    upd();
    return { set, get: () => cur, tick(dt) { if (!run) return; acc += dt; if (acc >= 3.5) { acc = 0; if (cur < n - 1) set(cur + 1); else { run = false; upd(); } } } };
  }
  // kaydırıcı satırı
  const rng = (ad, key, min, max, step, val, out) => `<label class="f66-rng"><span>${ad} <b data-o="${key}">${out}</b></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-r="${key}" aria-label="${ad}"></label>`;
  const LIVER = 'M40 70 C40 30 120 22 200 32 C270 42 320 58 320 92 C320 128 250 142 180 136 C120 132 40 122 40 70Z';

  /* ---------- 1 · Rezeksiyon ve rejenerasyon ---------- */
  VIZ.f66_rejen = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let mod = 'rez', x = 0, reg = 0, regRun = false, wk = 0, wkRun = false;
    el.innerHTML = `${segHtml('Mod', 'm', [['rez', 'Rezeksiyon'], ['don', 'Canlı donör nakli']], 'rez')}
      <div class="f66-svgw"></div>
      <div class="f66-c f66-c-rez">${rng('Çıkarılan karaciğer', 'x', 0, 90, 5, 0, '%0')}<div class="btn-row"><button type="button" class="btn" data-a="reg" disabled>Oynat: rejenerasyon</button></div></div>
      <div class="f66-c f66-c-don" hidden>${rng('Zaman (hafta)', 'w', 0, 12, 0.1, 0, '0')}<div class="btn-row"><button type="button" class="btn" data-a="wk">Oynat</button></div></div>`;
    const svg = svgRoot(262, 'Karaciğer rezeksiyonu ve yeniden büyümesi ya da canlı donör naklinde iki karaciğerin büyümesi');
    el.querySelector('.f66-svgw').appendChild(svg);
    const defs = S('defs', {}, svg);
    const lv = S('clipPath', { id: 'f66-lv' }, defs); S('path', { d: LIVER }, lv);
    const cutR = S('rect', { y: 0, height: 262 }, S('clipPath', { id: 'f66-cut' }, defs));
    const gR = S('g', {}, svg), gD = S('g', {}, svg);
    // rezeksiyon sahnesi
    S('path', { d: LIVER, class: 'f66-ghost' }, gR);
    const og = S('g', { 'clip-path': 'url(#f66-lv)' }, gR), ig = S('g', { 'clip-path': 'url(#f66-cut)' }, og);
    S('path', { d: LIVER, class: 'f66-n f66-warn' }, ig);
    for (let i = 1; i < 10; i++) S('line', { x1: 40 + 28 * i, x2: 40 + 28 * i, y1: 20, y2: 145, class: 'f66-div' }, ig);
    S('path', { d: LIVER, class: 'f66-edge' }, ig);
    const lbSag = T(gR, 100, 84, 'Sağ lob', 'm', 'middle'), lbSol = T(gR, 280, 84, 'Sol lob', 'm', 'middle');
    const kalan = T(gR, 340, 16, '', 'b', 'end');
    T(gR, 20, 165, 'İşlev', 'b');
    const fb = R(gR, 20, 172, 320, 14, 'f66-n f66-ok', 5);
    S('line', { x1: 304.4, x2: 304.4, y1: 166, y2: 192, class: 'f66-tick' }, gR); T(gR, 304.4, 163, '%80', 'm', 'middle');
    const mk1 = S('path', { d: 'M0 196 l-5 8 h10z', class: 'f66-mk' }, gR);
    const fl = T(gR, 20, 218, '', ''); 
    T(gR, 20, 238, 'Rejenerasyon', 'b');
    R(gR, 20, 244, 320, 10, 'f66-n f66-chip', 4);
    const rb = R(gR, 20, 244, 0, 10, 'f66-n f66-ok', 4);
    S('line', { x1: 286.7, x2: 286.7, y1: 241, y2: 257, class: 'f66-tick' }, gR); T(gR, 286.7, 238, '¾', 'm', 'middle');
    const rl = T(gR, 20, 256 + 0, '', 'm');
    rl.setAttribute('y', 256); rl.style.display = 'none';
    // donör sahnesi
    const lv2 = [0, 1].map((k) => {
      const g = S('g', { transform: `translate(${k ? 188 : 8} 14) scale(.52)` }, gD);
      const cp = S('clipPath', { id: 'f66-dl' + k }, defs), r = S('rect', { x: 40, y: 0, height: 200, width: 280 }, cp);
      S('path', { d: LIVER, class: 'f66-ghost' }, g);
      const gg = S('g', { 'clip-path': `url(#f66-dl${k})` }, g); S('path', { d: LIVER, class: 'f66-n f66-warn' }, gg);
      return { r, tx: T(gD, k ? 270 : 90, 112, '', 'b', 'middle') };
    });
    T(gD, 90, 130, 'sağ lob 4 segment alınmış', 'm', 'middle'); T(gD, 270, 130, 'greft: kütlenin %50–60\'ı', 'm', 'middle');
    R(gD, 20 + (320 / 12) * 6, 170, (320 / 12) * 2, 22, 'f66-n f66-ok', 3);
    S('line', { x1: 20, x2: 340, y1: 192, y2: 192, class: 'f66-axis' }, gD);
    for (let i = 0; i <= 12; i += 2) T(gD, 20 + (320 / 12) * i, 208, String(i), 'm', 'middle');
    T(gD, 20 + (320 / 12) * 7, 164, 'Donör: 6–8 hafta', 'b', 'middle'); T(gD, 180, 228, 'Hafta (temsilî eğri)', 'm', 'middle');
    const mk2 = S('path', { d: 'M0 192 l-5 8 h10z', class: 'f66-mk' }, gD);
    const massD = (t) => 45 + 55 * (3 * Math.min(1, t / 7) ** 2 - 2 * Math.min(1, t / 7) ** 3);
    const massR = (t) => 55 + 45 * (3 * Math.min(1, Math.max(0, t - 1.5) / 7.5) ** 2 - 2 * Math.min(1, Math.max(0, t - 1.5) / 7.5) ** 3);
    const ciz = () => {
      gR.style.display = mod === 'rez' ? '' : 'none'; gD.style.display = mod === 'don' ? '' : 'none';
      el.querySelector('.f66-c-rez').hidden = mod !== 'rez'; el.querySelector('.f66-c-don').hidden = mod !== 'don';
      if (mod === 'rez') {
        const rem = x * (1 - reg), cut = 40 + 2.8 * rem;
        cutR.setAttribute('x', cut); cutR.setAttribute('width', 320 - cut + 5);
        lbSag.style.display = cut > 100 - 30 ? 'none' : ''; lbSol.style.display = cut > 280 - 30 ? 'none' : '';
        kalan.textContent = 'Kalan kütle %' + Math.round(100 - rem);
        const asti = x > 80; fb.setAttribute('class', 'f66-n ' + (asti ? 'f66-crit' : 'f66-ok'));
        mk1.setAttribute('transform', `translate(${20 + 320 * x / 90} 0)`);
        fl.textContent = asti ? 'Rezerv aşıldı (kitap bu eşiğin ötesini anlatmaz)' : 'Bütün fizyolojik işlevler sürüyor'; fl.setAttribute('class', 'f66-t ' + (asti ? 'f66-tc' : 'f66-to'));
        rb.setAttribute('width', (320 * rem) / 90 > 320 ? 320 : (320 * rem) / 90);
        rb.setAttribute('class', 'f66-n ' + (x > 75 ? 'f66-chip' : 'f66-ok'));
        rl.style.display = ''; rl.textContent = x > 75 ? 'Kitap: dörtte üçe kadar rezeksiyonda rejenerasyon' : (x === 0 ? 'Önce rezeksiyon oranını artırın' : 'Aktif mitozla normal kütleye döner');
        el.querySelector('[data-o=x]').textContent = '%' + x;
        el.querySelector('[data-a=reg]').disabled = x === 0 || x > 75 || regRun;
      } else {
        const md = massD(wk), mr = massR(wk);
        lv2[0].r.setAttribute('width', 280 * md / 100); lv2[1].r.setAttribute('width', 280 * mr / 100);
        lv2[0].tx.textContent = 'Donör · %' + Math.round(md); lv2[1].tx.textContent = 'Alıcı · %' + Math.round(mr);
        mk2.setAttribute('transform', `translate(${20 + (320 / 12) * wk} 0)`);
        el.querySelector('[data-o=w]').textContent = fmt(wk, 1);
        el.querySelector('[data-a=wk]').textContent = wkRun ? 'Duraklat' : 'Oynat';
      }
    };
    const caps = () => {
      if (mod === 'don') { cap.innerHTML = REF('<b>Canlı donör nakli.</b> Sağ lobun dört segmenti (kütlenin %50–60\'ı) donörden alıcıya aktarılır. Donörde kalan karaciğer 6–8 haftada tam boyuta ulaşır, alıcıda biraz daha uzun sürer; sonunda ikisi de normal boyutludur. [[K1 s. 299]]'); return; }
      if (x === 0) cap.innerHTML = cap0;
      else if (x === 80) cap.innerHTML = REF('<b>%80 çıkarıldı.</b> Kalan %20 bile bütün fizyolojik işlevleri sürdürebilir: bu, karaciğerin büyük rezervidir. [[K1 s. 299]]');
      else if (x > 80) cap.innerHTML = REF(`<b>%${x} çıkarıldı.</b> Kitabın verdiği %80 rezerv sınırı aşıldı. [[K1 s. 299]]`);
      else if (x > 75) cap.innerHTML = REF(`<b>%${x} çıkarıldı.</b> İşlev sürer. Kitap rejenerasyonu dörtte üçe kadar rezeksiyon için anlatır. [[K1 s. 299]]`);
      else cap.innerHTML = REF(`<b>%${x} çıkarıldı.</b> İşlev sürer; kalan doku aktif mitozla normal kütlesine döner. "Oynat"a basın. [[K1 s. 299]]`);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.m) { mod = b.dataset.m; basSec(el, 'm', mod); wkRun = regRun = false; caps(); ciz(); }
      else if (b.dataset.a === 'reg') { if (RM) reg = 1; else { reg = 0; regRun = true; } ciz(); }
      else if (b.dataset.a === 'wk') { if (RM) { wk = 12; wkRun = false; } else { if (wk >= 12) wk = 0; wkRun = !wkRun; } ciz(); }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.dataset.r; if (!r) return;
      if (r === 'x') { x = +e.target.value; reg = 0; regRun = false; caps(); } else { wk = +e.target.value; wkRun = false; }
      ciz();
    });
    ciz();
    return ticker(el, (dt) => {
      if (regRun) { reg = Math.min(1, reg + dt / 2); if (reg >= 1) regRun = false; ciz(); }
      if (wkRun) { wk = Math.min(12, wk + dt * 1.6); if (wk >= 12) wkRun = false; el.querySelector('[data-r=w]').value = wk; ciz(); }
    });
  };

  /* ---------- 2 · Hepatositte tokluk, açlık, protein ---------- */
  VIZ.f66_metab = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let mod = 'tok';
    el.innerHTML = `${segHtml('Durum', 'm', [['tok', 'Tokluk · insülin'], ['ac', 'Açlık · glukagon'], ['pro', 'Protein']], 'tok')}<div class="f66-svgw"></div>`;
    const svg = svgRoot(470, 'Hepatositte tokluk, açlık ve protein metabolizmasında madde akışları'); el.querySelector('.f66-svgw').appendChild(svg);
    const g = S('g', {}, svg), akislar = [];
    const D = {
      tok: {
        out: [['Pankreas\n(insülin)', 10, 8, 130, 40, 'f66-ink2'], ['Plazma\nglukoz ↑', 220, 8, 130, 40, 'f66-acc']],
        nodes: [['Glukoz', 25, 96, 100, 28, 'f66-chip'], ['Glikojen\n(≤ 100 g glukoz)', 235, 92, 110, 36, 'f66-chip'], ['Pirüvat', 25, 166, 100, 28, 'f66-chip'], ['Trigliserit', 25, 236, 100, 28, 'f66-chip'], ['Apolipoprotein', 130, 236, 100, 28, 'f66-chip'], ['Kolesterol', 235, 236, 100, 28, 'f66-chip'], ['Zar · steroid hormon\n· safra tuzu', 235, 166, 110, 36, 'f66-chip'], ['VLDL · LDL · HDL', 105, 316, 150, 30, 'f66-warn']],
        ok: [[[[75, 48], [75, 90]], '--c-basic', 'İnsülin', 80, 70], [[[285, 48], [285, 70], [75, 70], [75, 94]], '--accent', '', 0, 0], [[[125, 110], [233, 110]], '--ok', 'glikojenez', 180, 104, 3], [[[75, 124], [75, 164]], '--muted', 'glikoliz', 80, 148, 1.5], [[[75, 194], [75, 234]], '--warn', 'lipit sentezi', 80, 218, 1.5], [[[110, 194], [250, 236]], '--warn', '', 0, 0, 1.5], [[[285, 236], [285, 204]], '--ink', '', 0, 0, 1.5], [[[75, 264], [130, 314]], '--warn', '', 0, 0, 1.5], [[[180, 264], [180, 314]], '--warn', '', 0, 0, 1.5], [[[285, 264], [230, 314]], '--warn', '', 0, 0, 1.5], [[[255, 331], [350, 331]], '--warn', 'plazmaya', 330, 322, 1.5]],
        not: 'Ok kalınlıkları temsilîdir.',
      },
      ac: {
        out: [['Pankreas\n(glukagon)', 10, 8, 130, 40, 'f66-ink2'], ['Plazma\nglukoz ↓', 220, 8, 130, 40, 'f66-acc']],
        nodes: [['Glikojen', 25, 96, 100, 28, 'f66-chip'], ['Glukoz', 135, 96, 90, 28, 'f66-chip'], ['Amino asitler ·\nlaktat · gliserol', 110, 176, 140, 36, 'f66-chip'], ['Serbest yağ\nasitleri', 20, 272, 100, 36, 'f66-chip'], ['Mitokondri\nβ-oksidasyon', 135, 268, 100, 44, 'f66-warn'], ['Enerji', 260, 276, 80, 28, 'f66-chip']],
        ok: [[[[75, 48], [75, 90]], '--c-basic', 'Glukagon', 82, 72], [[[125, 110], [133, 110]], '--ok', '', 0, 0, 3], [[[180, 174], [180, 126]], '--ok', 'glukoneogenez', 188, 152, 2.5], [[[225, 110], [290, 110], [290, 52]], '--accent', 'glukoz → kana', 296, 80, 3], [[[75, 120], [75, 150]], '--muted', '', 0, 0, 0], [[[120, 290], [133, 290]], '--warn', '', 0, 0, 2], [[[235, 290], [258, 290]], '--warn', '', 0, 0, 2]],
        not: 'Glikojenoliz: glikojen → glukoz.',
        extra: (gg) => { T(gg, 75, 146, 'glikojenoliz', 'm', 'middle'); },
      },
      pro: {
        out: [],
        nodes: [['Amino asit', 20, 20, 100, 28, 'f66-chip'], ['Deaminasyon', 130, 20, 100, 28, 'f66-warn'], ['NH₃', 260, 20, 80, 28, 'f66-crit'], ['Keto asit', 130, 96, 100, 28, 'f66-chip'], ['Üre ya da\nglutamin', 250, 90, 95, 40, 'f66-ok'], ['Sitrik asit\ndöngüsü (enerji)', 15, 180, 105, 40, 'f66-chip'], ['Başka\namino asit', 130, 180, 100, 40, 'f66-chip'], ['Glukoz\n(glukoneogenez)', 240, 180, 105, 40, 'f66-chip'], ['Transaminasyon: amino asit + keto asit\n→ yeni (esansiyel olmayan) amino asit', 15, 262, 330, 44, 'f66-warn']],
        ok: [[[[120, 34], [128, 34]], '--ink', '', 0, 0, 2], [[[230, 34], [258, 34]], '--crit', 'amonyak', 244, 66, 2.5], [[[180, 48], [180, 94]], '--accent', '', 0, 0, 2.5], [[[300, 48], [300, 88]], '--ok', 'detoksifikasyon', 296, 68, 2.5, 1], [[[160, 124], [80, 178]], '--accent', '', 0, 0, 2], [[[180, 124], [180, 178]], '--accent', '', 0, 0, 2], [[[200, 124], [290, 178]], '--accent', '', 0, 0, 2], [[[180, 220], [180, 260]], '--muted', '', 0, 0, 1.5]],
        not: '',
        extra: (gg) => {
          Nd(gg, 15, 326, 150, 40, 'f66-chip', 'Esansiyel amino asit\n→ yalnız diyetten', 'f66-strike');
          Nd(gg, 190, 326, 155, 40, 'f66-acc', 'Plazma proteinleri →\n(Ig ve bazı hormonlar hariç)');
        },
      },
    };
    const draw = () => {
      g.replaceChildren(); akislar.length = 0; const d = D[mod];
      d.out.forEach((o) => Nd(g, o[1], o[2], o[3], o[4], o[5], o[0]));
      R(g, 10, mod === 'pro' ? 6 : 58, 340, mod === 'pro' ? 372 : 300, 'f66-n f66-warn f66-cell', 18);
      T(g, 20, mod === 'pro' ? 400 : 372, 'Hepatosit', 'm');
      d.ok.forEach(([pts, c, lab, lx, ly, w, nodot]) => {
        const rk = `var(${c})`; Ok(g, pts, rk, w || 2);
        if (lab) T(g, lx, ly, lab, 'm', mod === 'pro' && lx > 200 ? 'middle' : 'middle');
        if (!nodot && w !== 0) akislar.push(Akis(g, pts, rk, Math.max(2, Math.round(Math.hypot(pts[pts.length - 1][0] - pts[0][0], pts[pts.length - 1][1] - pts[0][1]) / 40)), 40, 3));
      });
      d.nodes.forEach((n) => Nd(g, n[1], n[2], n[3], n[4], n[5], n[0]));
      if (d.extra) d.extra(g);
      svg.setAttribute('viewBox', `0 0 360 ${mod === 'pro' ? 420 : 380}`);
      svg.setAttribute('aria-label', mod === 'tok' ? 'Tokluk: insülin ile glukoz glikojene ve lipide çevrilir' : mod === 'ac' ? 'Açlık: glukagon ile glikojenoliz, glukoneogenez ve yağ asidi oksidasyonu' : 'Protein metabolizması: deaminasyon, amonyağın üreye çevrilmesi ve transaminasyon');
    };
    const caps = { tok: cap0, ac: '<b>Açlık.</b> Glukoz düşer, insülin azalır, glukagon salınır: karaciğer glikojeni yıkar ve amino asit, laktat, gliserolden glukoz yapar; yağ asitleri mitokondride β-oksidasyonla yakılır. [[K1 s. 299]]', pro: '<b>Protein.</b> Deaminasyon amino grubu çıkarır: keto asit enerjiye, başka amino aside ya da glukoza; NH₃ üre ya da glutamine çevrilir. Transaminasyon esansiyel olmayan amino asitleri yapar. [[K1 s. 300]]' };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (!b) return; mod = b.dataset.m; basSec(el, 'm', mod); cap.innerHTML = mod === 'tok' ? cap0 : REF(caps[mod]); draw(); });
    draw();
    return ticker(el, (dt) => akislar.forEach((a) => a.upd(dt)));
  };

  /* ---------- 3 · Safra tuzları ve misel (6 adım) ---------- */
  const tuz = (g, cx, cy, a, r) => { // baş dışa (suya), kuyruk içe (yağa)
    const c = Math.cos(a), s = Math.sin(a);
    S('line', { x1: cx + c * (r - 3), y1: cy + s * (r - 3), x2: cx + c * (r + 6), y2: cy + s * (r + 6), class: 'f66-tuz-k' }, g);
    S('circle', { cx: cx + c * (r + 8), cy: cy + s * (r + 8), r: 3, class: 'f66-tuz-b' }, g);
  };
  const halka = (g, cx, cy, r, n, rot = 0) => { for (let i = 0; i < n; i++) tuz(g, cx, cy, rot + (i / n) * Math.PI * 2, r); };
  const makas = (g, x, y, rot = 0) => { const s = S('g', { transform: `translate(${x} ${y}) rotate(${rot})` }, g); S('path', { d: 'M-7 -5 L7 5 M-7 5 L7 -5', class: 'f66-mak' }, s); S('circle', { cx: -8, cy: -6, r: 2.4, class: 'f66-makc' }, s); S('circle', { cx: -8, cy: 6, r: 2.4, class: 'f66-makc' }, s); };
  VIZ.f66_misel = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    el.innerHTML = '<div class="f66-svgw"></div>';
    const svg = svgRoot(300, 'Safra tuzlarının yağı emülsifiye edip misel oluşturması ve geri dönüşü'); el.querySelector('.f66-svgw').appendChild(svg);
    const g = S('g', {}, svg);
    let p = RM ? 1 : 0, cur = 0;
    const caps = [cap0,
      '<b>2 · Büyük yağ damlası.</b> Diyet yağı büyük damlalar hâlindedir; suda çözünen pankreatik lipaz yalnız yüzeye değebilir. [[K1 s. 300]]',
      '<b>3 · Amfipatik safra tuzları.</b> Bir ucu hidrofobik, öteki hidrofilik olan safra tuzları yağı çevreler ve büyük damlayı küçük damlacıklardan oluşan bir süspansiyona böler. [[K1 s. 300]]',
      '<b>4 · Miseller.</b> Damlacıklar misel olur; ancak şimdi lipaz çekirdekteki yağa etki edebilir. Misel oluşumu zorunludur. [[K1 s. 300]]',
      '<b>5 · Emilim.</b> Miseller enterositlere değer ve lipit içeriklerini bırakır; yağda çözünen A, D, E ve K vitaminleri de bu yolla emilir. [[K1 s. 300]]',
      '<b>6 · Geri dönüş.</b> Safra tuzları lümende kalır, terminal ileumda emilir, portal venle karaciğere döner ve yeniden kullanılır. [[K1 s. 300]]'];
    const su = () => R(g, 6, 6, 348, 288, 'f66-n f66-acc f66-su', 14);
    const sim = (x, y) => { S('line', { x1: x, y1: y, x2: x + 22, y2: y, class: 'f66-tuz-k', style: 'stroke-width:3' }, g); S('circle', { cx: x - 5, cy: y, r: 6, class: 'f66-tuz-b' }, g); };
    const sahne = [
      () => { // 1 safra
        R(g, 6, 6, 348, 288, 'f66-n f66-chip', 14);
        [[46, 70], [70, 106], [44, 138]].forEach(([x, y]) => S('circle', { cx: x, cy: y, r: 22, class: 'f66-n f66-warn' }, g));
        T(g, 56, 38, 'Hepatositler', 'b', 'middle');
        S('path', { d: 'M80 100 L150 100', class: 'f66-pipe' }, g); T(g, 115, 92, '≈ 1000 mL/gün', 'b', 'middle');
        S('ellipse', { cx: 205, cy: 105, rx: 50, ry: 32, class: 'f66-n f66-ok' }, g);
        const hh = lerp(56, 12, clamp(p, 0, 1));
        const f = S('ellipse', { cx: 205, cy: 105 + (28 - hh / 2) * 0.0, rx: 50, ry: 32, class: 'f66-sivi', style: `opacity:${0.25 + 0.6 * clamp(p, 0, 1)}` }, g);
        f.setAttribute('ry', 32 * (hh / 56) + 6); f.setAttribute('cy', 105 + 32 - (32 * (hh / 56) + 6));
        T(g, 205, 160, 'Safra kesesi', 'b', 'middle'); T(g, 205, 176, 'Kesede 1/5 hacim', 'm', 'middle');
        R(g, 300, 50, 36, 112, 'f66-n f66-chip', 6);
        const bh = lerp(112, 22, clamp(p, 0, 1)); R(g, 300, 162 - bh, 36, bh, 'f66-n f66-ok', 6);
        T(g, 318, 40, 'Hacim', 'm', 'middle'); T(g, 318, 180, '5 → 1', 'b', 'middle');
        ['Su · elektrolitler · safra tuzları', 'Safra pigmenti · kolesterol · fosfolipitler'].forEach((s, i) => T(g, 20, 222 + i * 18, s, i ? 'm' : 'm'));
        T(g, 20, 270, 'Kolesterol → safra asidi → Na⁺/K⁺ tuzu = safra tuzu', 'b');
      },
      () => { // 2 büyük damla
        su(); S('circle', { cx: 180, cy: 140, r: 68, class: 'f66-n f66-warn' }, g); T(g, 180, 144, 'Yağ damlası', 'b', 'middle');
        [[-2.4, 'a'], [-0.4, 'b'], [1.4, 'c']].forEach(([a], i) => makas(g, 180 + Math.cos(a) * 84 * (1 - 0.02 * Math.sin(p * 6 + i)), 140 + Math.sin(a) * 84, (a * 180) / Math.PI + 90));
        T(g, 20, 36, 'Pankreatik lipaz (suda çözünür)', 'm'); T(g, 180, 262, 'Lipaz çekirdeğe ulaşamaz', 'b', 'middle'); T(g, 20, 54, 'yalnız yüzeye değer', 'm');
      },
      () => { // 3 amfipatik
        su(); const q = clamp(p, 0, 1);
        S('circle', { cx: 180, cy: 140, r: 68 * (1 - 0.5 * q), class: 'f66-n f66-warn', style: `opacity:${1 - q}` }, g);
        for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2 + 0.3, rr = 66 * q * (i ? 1 : 0), cx = 180 + (i ? Math.cos(a) * rr : 0), cy = 140 + (i ? Math.sin(a) * rr : 0), r = lerp(0, 18, q);
          if (r > 2) { S('circle', { cx, cy, r, class: 'f66-n f66-warn' }, g); halka(g, cx, cy, r, 8, a); } }
        halka(g, 180, 140, 68 * (1 - 0.5 * q), 20, 0.2);
        sim(298, 30); T(g, 330, 56, 'safra tuzu', 'm', 'end');
        T(g, 20, 252, 'Hidrofobik uç → yağa (içe)', 'm'); T(g, 20, 272, 'Hidrofilik uç (baş) → suya (dışa)', 'm');
      },
      () => { // 4 miseller
        su(); const q = clamp(p, 0, 1);
        [[70, 90], [180, 90], [290, 90], [70, 190], [180, 190], [290, 190]].forEach(([x, y], i) => {
          S('circle', { cx: x, cy: y, r: 18, style: `fill:color-mix(in srgb, var(--ok-soft) ${q * 100}%, var(--warn-soft));stroke:var(--warn)` }, g); halka(g, x, y, 18, 11, i);
          const a = -2.2 + i * 0.5; makas(g, lerp(x + Math.cos(a) * 52, x, q), lerp(y + Math.sin(a) * 52, y, q), (a * 180) / Math.PI + 90);
        });
        T(g, 180, 262, 'Misel olmadan lipaz etki edemez', 'b', 'middle'); T(g, 20, 34, 'Lipaz çekirdeğe girer', 'm');
      },
      () => { // 5 enterosit
        su(); const q = clamp(p, 0, 1);
        for (let i = 0; i < 4; i++) { const x = 18 + i * 85; R(g, x, 206, 78, 70, 'f66-n f66-chip', 8); for (let k = 0; k < 6; k++) S('line', { x1: x + 8 + k * 12, x2: x + 8 + k * 12, y1: 198, y2: 206, class: 'f66-vil' }, g); }
        T(g, 180, 296 - 12, 'Enterosit', 'b', 'middle');
        [[60, 120], [180, 120], [300, 120]].forEach(([x, y], i) => {
          S('circle', { cx: x, cy: y + 14 * q, r: 18, style: 'fill:var(--ok-soft);stroke:var(--warn)' }, g); halka(g, x, y + 14 * q, 18, 11, i);
          ['', 'A', 'D', 'E', 'K'].slice(0, 5).forEach((l, k) => { if (!l) return; const ox = x - 12 + (k - 1) * 8, oy = y + 14 * q + 4 + q * (86 - 14); S('circle', { cx: ox, cy: oy, r: 4, class: 'f66-lip', style: `opacity:${0.4 + 0.6 * q}` }, g); });
          T(g, x, y - 30, 'A · D · E · K', 'm', 'middle');
        });
        T(g, 20, 30, 'Lipit ve vitaminler enterosite geçer', 'b'); T(g, 20, 48, 'Safra tuzu halkası lümende kalır', 'm');
      },
      () => { // 6 geri dönüş
        R(g, 6, 6, 348, 288, 'f66-n f66-chip', 14);
        Nd(g, 20, 30, 140, 40, 'f66-acc', 'İnce bağırsak\nlümeni'); Nd(g, 200, 30, 140, 40, 'f66-chip', 'Terminal ileum'); Nd(g, 200, 210, 140, 40, 'f66-warn', 'Karaciğer');
        Ok(g, [[160, 50], [198, 50]], 'var(--ok)', 2); Ok(g, [[270, 70], [270, 208]], 'var(--accent)', 3); Ok(g, [[200, 232], [90, 232], [90, 72]], 'var(--ok)', 3);
        T(g, 278, 140, 'Portal ven', 'b'); T(g, 98, 150, 'Yeniden', 'm'); T(g, 98, 166, 'kullanılır', 'm'); T(g, 150, 252, 'safra ile lümene', 'm', 'middle');
        const path = [[90, 52], [270, 52], [270, 230], [90, 230], [90, 52]]; let L = 0; const sg = [];
        for (let i = 0; i < 4; i++) { const d = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]); sg.push([L, d]); L += d; }
        for (let k = 0; k < 14; k++) { const d = RM ? (k + 0.5) / 14 * L : ((k / 14 + tt * 0.06) % 1) * L; let i = 0; while (i < 3 && d > sg[i][0] + sg[i][1]) i++; const u = (d - sg[i][0]) / sg[i][1], a = path[i], b = path[i + 1]; S('circle', { cx: lerp(a[0], b[0], u), cy: lerp(a[1], b[1], u), r: 3.5, class: 'f66-tuz-b' }, g); }
        T(g, 180, 280, 'Enterohepatik dolaşım · safra tuzları', 'm', 'middle');
      },
    ];
    let tt = 0;
    const ciz = () => { g.replaceChildren(); sahne[cur](); };
    const st = Adim(el, 6, (i) => { cur = i; p = RM ? 1 : 0; cap.innerHTML = i === 0 ? cap0 : REF(caps[i]); ciz(); });
    ciz();
    return ticker(el, (dt) => { st.tick(dt); tt += dt; if (p < 1 || cur === 5) { p = Math.min(1, p + dt / 2); ciz(); } });
  };

  /* ---------- 4 · Bilirubinin on bir adımı ---------- */
  VIZ.f66_bilirubin = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    el.innerHTML = '<div class="f66-svgw"></div>';
    const svg = svgRoot(468, 'Alyuvardan dışkı ve idrara bilirubinin on bir adımlık yolu: dalak, karaciğer, safra, bağırsak, böbrek'); el.querySelector('.f66-svgw').appendChild(svg);
    const base = S('g', {}, svg), ag = S('g', {}, svg);
    // organlar
    Nd(base, 230, 12, 120, 52, 'f66-crit', ''); T(base, 238, 30, 'Dalak', 'b');
    R(base, 20, 108, 320, 24, 'f66-n f66-acc', 8); T(base, 28, 125, 'Kan dolaşımı', 'm');
    R(base, 20, 138, 200, 126, 'f66-n f66-warn', 10); T(base, 28, 154, 'Karaciğer', 'b');
    Nd(base, 28, 162, 140, 20, 'f66-clin', 'Konjuge olmayan'); Nd(base, 28, 198, 140, 20, 'f66-ok', 'Konjuge'); Nd(base, 28, 234, 140, 20, 'f66-warn2', 'Ürobilinojen');
    Nd(base, 262, 152, 88, 46, 'f66-chip', 'Böbrek'); Nd(base, 262, 238, 88, 30, 'f66-warn', 'İdrar');
    Nd(base, 20, 314, 140, 46, 'f66-chip', 'İnce bağırsak'); Nd(base, 20, 406, 250, 46, 'f66-chip', ''); T(base, 28, 424, 'Kalın bağırsak', 'b'); Nd(base, 290, 406, 60, 46, 'f66-chip', 'Dışkı');
    S('path', { d: 'M60 264 V314', class: 'f66-pipe' }, base); T(base, 68, 294, 'Safra yolları', 'm');
    T(base, 248, 345, 'Portal ven', 'm');
    [[150, 440], [180, 434], [210, 442]].forEach(([x, y]) => S('ellipse', { cx: x, cy: y, rx: 7, ry: 3.5, class: 'f66-bakt' }, base));
    T(base, 150, 424, 'bakteri', 'm');
    const infoG = S('g', {}, svg);
    const A = [
      { pts: [[300, 22], [300, 56]], c: 'var(--crit)', b: [336, 40], i: ['Globin → amino asitler', 'Fe → transferrin → kemik iliği', 'Porfirin halkası: yeniden kullanılmaz'] },
      { pts: [[322, 22], [322, 56]], c: 'var(--c-clin)', b: [338, 22], i: ['Makrofajda: porfirin halkası', '→ biliverdin → bilirubin'] },
      { pts: [[262, 64], [262, 120], [110, 120], [110, 138]], c: 'var(--c-clin)', b: [282, 92], i: ['Bilirubin albümine (Alb) bağlı', 'suda çözünmez, kanda taşınır'] },
      { pts: [[98, 182], [98, 198]], c: 'var(--c-clin)', c2: 'var(--ok)', b: [184, 190], i: ['Glukuronosiltransferaz', '+ glukuronik asit → konjuge'] },
      { pts: [[60, 264], [60, 314]], c: 'var(--ok)', b: [40, 290], i: ['Konjuge bilirubin safrayla', 'ince bağırsağa atılır'] },
      { pts: [[190, 314], [190, 264]], c: 'var(--ok)', dash: 1, b: [210, 288], i: ['Enterohepatik dolaşım: kitaba göre', 'konjuge bilirubinin çoğu geri emilir'] },
      { pts: [[90, 360], [90, 406]], c: 'var(--ok)', c2: 'var(--warn)', b: [112, 384], i: ['Kolon bakterileri: konjuge', 'bilirubin → ürobilinojen'] },
      { pts: [[200, 430], [288, 430]], c: 'var(--ink)', b: [244, 414], i: ['Ürobilin + sterkobilin → dışkı;', 'sterkobilin kahverengi renk verir'] },
      { pts: [[240, 406], [240, 244], [170, 244]], c: 'var(--warn)', b: [226, 340], i: ['Ürobilinojenin kalanı geri emilir', '→ portal ven → karaciğer'] },
      { pts: [[170, 244], [196, 244], [196, 120], [262, 120]], c: 'var(--warn)', b: [210, 200], i: ['Karaciğer hepsini tutmaz:', 'bir kısmı kana geçer'] },
      { pts: [[305, 132], [305, 200], [305, 238]], c: 'var(--warn)', b: [335, 222], i: ['Böbrekten atılır:', 'idrarın sarı rengi'] },
    ];
    const caps = [cap0,
      '<b>2 · Biliverdin → bilirubin.</b> Makrofajlarda porfirin halkası biliverdine oksitlenir, sonra bilirubine indirgenir. [[K1 s. 300]]',
      '<b>3 · Albüminle taşınma.</b> Konjuge olmayan bilirubin suda çözünmez; albümine bağlanarak karaciğere taşınır. [[K1 s. 300]]',
      '<b>4 · Konjugasyon.</b> Hepatositler bilirubini alır ve glukuronosiltransferaz ile glukuronik aside bağlar; artık suda çözünür. [[K1 s. 300]]',
      '<b>5 · Safraya atılım.</b> Konjuge bilirubin safrayla ince bağırsağa atılır. [[K1 s. 300]]',
      '<b>6 · Enterohepatik dolaşım (kitaba göre).</b> Kitap ince bağırsaktaki konjuge bilirubinin neredeyse tamamının geri emilip yeniden salgılandığını, bir kısmının kaçınılmaz olarak kalın bağırsağa geçtiğini yazar. Bu ifadenin düzeltmesi için Atlas notuna bakın. [[K1 s. 300]]',
      '<b>7 · Ürobilinojen.</b> Kolon bakterileri konjuge bilirubini ürobilinojene çevirir. [[K1 s. 300]]',
      '<b>8 · Sterkobilin.</b> Ürobilinojenin bir kısmı ürobilin ve sterkobiline oksitlenir ve dışkıyla atılır; sterkobilin dışkıya kahverengi rengini verir. [[K1 s. 300]]',
      '<b>9 · Ürobilinojenin geri emilimi.</b> Öteki kısmı bağırsaktan emilir ve portal venle karaciğere döner (enterohepatik dolaşım). [[K1 s. 300–301]]',
      '<b>10 · Karaciğerden kaçan ürobilinojen.</b> Karaciğerin ürobilinojen alımı eksik kalır; bir kısmı sistemik dolaşıma geçer. [[K1 s. 301]]',
      '<b>11 · İdrar.</b> Bu ürobilinojen böbrekten atılır ve idrara sarı rengini verir. [[K1 s. 301]]'];
    let akis = null, cur = 0;
    const draw = () => {
      ag.replaceChildren(); infoG.replaceChildren(); akis = null;
      A.forEach((a, i) => {
        if (i > cur) { Ok(ag, a.pts, a.c, 1.2, a.dash).style.opacity = 0.12; }
        else if (i < cur) Ok(ag, a.pts, a.c, 1.5, a.dash).style.opacity = 0.4;
        else { Ok(ag, a.pts, a.c, 3.5, a.dash); akis = Akis(ag, a.pts, a.c, Math.max(3, Math.round(Math.hypot(a.pts[a.pts.length - 1][0] - a.pts[0][0], a.pts[a.pts.length - 1][1] - a.pts[0][1]) / 24)), 55, 3.2, a.c2); }
      });
      A.forEach((a, i) => { const b = S('g', { style: `opacity:${i > cur ? 0.35 : 1}` }, ag); S('circle', { cx: a.b[0], cy: a.b[1], r: 10, class: 'f66-badge' + (i === cur ? ' on' : '') }, b); T(b, a.b[0], a.b[1] + 4, String(i + 1), 'f66-bn', 'middle'); });
      A[cur].i.forEach((s, k) => T(infoG, 20, 28 + k * 17, s, k ? 'm' : 'b'));
      if (cur === 5) { Nd(infoG, 222, 296, 74, 22, 'f66-chip', 'Atlas notu', 'm'); }
    };
    const st = Adim(el, 11, (i) => { cur = i; cap.innerHTML = i === 0 ? cap0 : REF(caps[i]); draw(); });
    draw();
    el.insertAdjacentHTML('beforeend', '<div class="legend f66-leg"><span><i style="background:var(--crit)"></i>Hemoglobin</span><span><i style="background:var(--c-clin)"></i>Konjuge olmayan (suda çözünmez)</span><span><i style="background:var(--ok)"></i>Konjuge (suda çözünür)</span><span><i style="background:var(--warn)"></i>Ürobilinojen</span><span><i style="background:var(--ink)"></i>Sterkobilin</span></div>');
    return ticker(el, (dt) => { st.tick(dt); if (akis) akis.upd(dt); });
  };

  /* ---------- 5 · Sarılık tipleri ---------- */
  VIZ.f66_sarilik = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    const TIP = {
      n: { ad: 'Normal', baskin: '—', dip: 'Negatif', dis: 'Kahverengi (sterkobilin)', ornek: '—', pl: 14 },
      pre: { ad: 'Pre-hepatik (hemoliz)', baskin: 'Konjuge olmayan', dip: 'Negatif', dis: '—', ornek: 'Transfüzyona bağlı hemolitik anemi, orak hücre krizi, sıtma', pl: 62 },
      kon: { ad: 'Konjugasyon bozukluğu', baskin: 'Konjuge olmayan', dip: 'Negatif', dis: '—', ornek: 'Yenidoğan sarılığı (olgunlaşmamış glukuronosiltransferaz), Gilbert sendromu (enzim etkinliği azalmış)', pl: 58 },
      post: { ad: 'Post-hepatik', baskin: 'Konjuge', dip: 'Pozitif', dis: 'Soluk (ürobilinojen ve sterkobilin oluşmaz)', ornek: 'Koledoğu tıkayan taş', pl: 72 },
      hep: { ad: 'Hepatosellüler', baskin: 'Karışık: hepatosit ve safra yolu hasarının göreli derecesine bağlı', dip: '—', dis: '—', ornek: 'Siroz, akut viral hepatit, parasetamol toksisitesi', pl: 66 },
    };
    const caps = { n: cap0,
      pre: '<b>Pre-hepatik.</b> Hemolizde üretilen bilirubin karaciğerin konjugasyon kapasitesini çok aşar; plazmada konjuge olmayan bilirubin yükselir. Suda çözünmediği için süzülmez: idrar dipstick testi negatif. [[K1 s. 301]]',
      kon: '<b>Konjugasyon bozukluğu.</b> Sorun anatomik olarak karaciğerdedir ama çoğu zaman pre-hepatik nedenlere katılır: yenidoğanda enzim olgunlaşmamış, Gilbert sendromunda etkinliği azalmıştır. Konjuge olmayan bilirubin yükselir. [[K1 s. 301]]',
      post: '<b>Post-hepatik.</b> Safra yolu tıkanınca konjuge bilirubin kana geçer; suda çözündüğü için süzülür ve dipstick pozitiftir. Bağırsağa ulaşmadığından ürobilinojen ve sterkobilin oluşmaz: dışkı soluk. [[K1 s. 301–302]]',
      hep: '<b>Hepatosellüler.</b> Hepatosit nekrozu ve safra ağacının bozulması konjugasyonu da atılımı da azaltır; hangi bilirubinin baskın olacağı iki hasarın göreli derecesine bağlıdır. [[K1 s. 302]]' };
    let tip = 'n';
    el.innerHTML = `${segHtml('Sarılık tipi', 't', Object.entries(TIP).map(([k, v]) => [k, v.ad]), 'n')}<div class="f66-svgw"></div>
      <div class="f66-term"><div class="f66-term-b"><span>Plazma bilirubini</span><div class="f66-bar"><i class="f66-bar-f"></i><b class="f66-bar-t"></b></div><small>Sarılık eşiği &gt; 30 µmol/L (düzey temsilî)</small></div></div>
      <dl class="kv f66-lab"><dt>Plazmada baskın bilirubin</dt><dd data-o="baskin"></dd><dt>İdrar dipstick: bilirubin</dt><dd data-o="dip"></dd><dt>Dışkı rengi</dt><dd data-o="dis"></dd><dt>Örnek nedenler</dt><dd data-o="ornek"></dd></dl>`;
    const svg = svgRoot(250, 'Bilirubin yolunda sarılık tipine göre tıkanma noktası: dalak, plazma, karaciğer, safra yolu, bağırsak, dışkı, böbrek ve idrar'); el.querySelector('.f66-svgw').appendChild(svg);
    const base = S('g', {}, svg), dyn = S('g', {}, svg);
    Nd(base, 10, 14, 90, 38, 'f66-crit', 'Dalak'); Nd(base, 270, 62, 80, 38, 'f66-chip', 'Böbrek'); Nd(base, 270, 14, 80, 30, 'f66-warn', 'İdrar');
    R(base, 10, 76, 250, 26, 'f66-n f66-acc', 8); T(base, 18, 93, 'Plazma (kan)', 'm');
    Nd(base, 120, 136, 112, 44, 'f66-warn', 'Karaciğer'); Nd(base, 262, 136, 88, 44, 'f66-chip', 'Bağırsak'); Nd(base, 262, 204, 88, 30, 'f66-chip', 'Dışkı');
    T(base, 236, 128, 'safra yolu', 'm', 'end');
    let ak = [], dis, liverMark, gate, lab1, lab2, hepLek;
    const draw = () => {
      dyn.replaceChildren(); ak = [];
      const n = tip === 'n', pre = tip === 'pre', kon = tip === 'kon', post = tip === 'post', hep = tip === 'hep';
      const P = (pts, c, w, cnt, hz, k = 1, d) => { Ok(dyn, pts, c, w, d); const a = Akis(dyn, pts, c, cnt, hz, 3.2); a.kes = k; ak.push(a); return a; };
      const un = 'var(--c-clin)', cj = 'var(--ok)';
      P([[55, 52], [55, 76]], un, pre ? 4 : 2, pre ? 6 : 3, 40);
      P([[150, 102], [150, 136]], un, pre ? 4 : 2, pre ? 7 : 3, 38, kon ? 0.9 : 1);
      if (pre) { T(dyn, 20, 130, 'Kapasite', 'b'); T(dyn, 20, 146, 'aşıldı', 'b'); }
      // kandaki birikim
      const dens = (c, k) => { for (let i = 0; i < k; i++) S('circle', { cx: 100 + ((i * 41) % 150), cy: 84 + ((i * 7) % 3) * 6, r: 3.2, style: `fill:${c};opacity:.9` }, dyn); };
      if (pre || kon) dens(un, pre ? 9 : 8);
      if (hep) { dens(un, 5); dens(cj, 5); }
      if (post) dens(cj, 8);
      // karaciğerden safraya
      if (!post) P([[232, 158], [262, 158]], cj, hep ? 1.5 : 2.5, hep ? 2 : kon ? 2 : 3, 34, 1);
      else { Ok(dyn, [[232, 158], [262, 158]], 'var(--crit)', 1.5, 1); S('path', { d: 'M244 148 l12 20 M256 148 l-12 20', class: 'f66-x' }, dyn); S('circle', { cx: 238, cy: 150, r: 6, class: 'f66-tas' }, dyn); T(dyn, 236, 190, 'taş', 'm', 'end'); }
      if (post) { P([[140, 136], [140, 104]], cj, 3, 5, 36); P([[232, 89], [270, 89]], cj, 3, 4, 34); P([[310, 100], [310, 112], [310, 44]], cj, 0.01, 0, 1); }
      if (hep) { P([[200, 136], [200, 104]], cj, 2.5, 3, 34); P([[260, 89], [310, 89], [310, 62]], cj, 2, 2, 30); }
      if (kon) { S('path', { d: 'M150 120 l16 -14 M166 120 l-16 -14', class: 'f66-x' }, dyn); T(dyn, 176, 120, 'konjugasyon ↓', 'b'); }
      if (hep) { for (let i = 0; i < 6; i++) S('circle', { cx: 134 + i * 16, cy: 168 + (i % 2) * 4, r: 4, class: 'f66-necr' }, dyn); T(dyn, 176, 198, 'nekroz', 'b', 'middle'); }
      // idrar yolu
      if (post || hep) { Ok(dyn, [[310, 62], [310, 46]], cj, 2.5); }
      // bağırsak -> dışkı
      Ok(dyn, [[306, 180], [306, 204]], 'var(--ink)', n ? 2.5 : 1.2, !n);
      S('circle', { cx: 336, cy: 219, r: 6, style: `fill:${n ? 'color-mix(in srgb, var(--warn) 70%, var(--ink))' : 'var(--chip)'};stroke:var(--line)` }, dyn);
      if (n) P([[306, 180], [306, 204]], 'var(--ink)', 2.5, 3, 20);
    };
    const upd = () => {
      draw(); const v = TIP[tip];
      for (const k of ['baskin', 'dip', 'dis', 'ornek']) el.querySelector(`[data-o=${k}]`).textContent = v[k];
      const f = el.querySelector('.f66-bar-f'); f.style.width = v.pl + '%'; f.className = 'f66-bar-f ' + (v.pl > 30 + 0 && tip !== 'n' ? 'hi' : '');
      cap.innerHTML = tip === 'n' ? cap0 : REF(caps[tip]);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (!b) return; tip = b.dataset.t; basSec(el, 't', tip); upd(); });
    upd();
    return ticker(el, (dt) => ak.forEach((a) => a.upd(dt)));
  };

  /* ---------- 6 · Portal kan karaciğerden geçerken ---------- */
  VIZ.f66_kapi = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let mod = 'mik';
    el.innerHTML = `${segHtml('Örnek', 'm', [['mik', 'Mikroorganizmalar'], ['ins', 'İnsülin']], 'mik')}<div class="f66-svgw"></div><p class="f66-sayac" aria-live="off"></p>`;
    const svg = svgRoot(300, 'Portal kanın sinüzoidden geçişi: Kupffer hücreleri mikroorganizmaları yutar, hepatositler insülinin yarısına kadarını yıkar'); el.querySelector('.f66-svgw').appendChild(svg);
    const base = S('g', {}, svg), pg = S('g', {}, svg), top = S('g', {}, svg);
    Nd(base, 20, 8, 110, 34, 'f66-chip', 'Bağırsak'); Nd(base, 230, 8, 110, 34, 'f66-chip', 'Pankreas');
    Ok(base, [[75, 42], [75, 56], [180, 56], [180, 78]], 'var(--accent)', 3); Ok(base, [[285, 42], [285, 56], [180, 56]], 'var(--accent)', 3);
    T(base, 188, 68, 'Portal ven', 'b');
    R(base, 70, 82, 28, 128, 'f66-n f66-warn', 6); R(base, 262, 82, 28, 128, 'f66-n f66-warn', 6);
    T(base, 84, 150, 'Hepatosit', 'm', 'middle'); base.lastChild.setAttribute('transform', 'rotate(-90 84 150)'); T(base, 276, 150, 'Hepatosit', 'm', 'middle'); base.lastChild.setAttribute('transform', 'rotate(-90 276 150)');
    R(base, 98, 82, 164, 128, 'f66-n f66-sin', 0); T(base, 180, 200, 'Sinüzoid', 'm', 'middle');
    Ok(base, [[180, 214], [180, 244]], 'var(--accent)', 3); T(base, 188, 232, 'Hepatik ven', 'm');
    Nd(base, 100, 248, 160, 36, 'f66-acc', 'Sistemik dolaşım');
    const KP = [[110, 110], [110, 170], [250, 124], [250, 180]];
    const kup = KP.map(([x, y]) => { const g = S('g', {}, base); const pts = Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? 7 : 14, a = (i / 10) * 2 * Math.PI; return (x + Math.cos(a) * r).toFixed(1) + ',' + (y + Math.sin(a) * r).toFixed(1); }).join(' '); const s = S('polygon', { points: pts, class: 'f66-kup' }, g); return { x, y, s, glow: 0 }; });
    T(base, 118, 100, 'Kupffer', 'm'); T(base, 218, 114, 'Kupffer', 'm'); 
    let P = [], sp = 0, gir = 0, gec = 0, sitok = [];
    const mkP = () => {
      if (mod === 'mik') { const tur = Math.floor(Math.random() * 3), x = 130 + Math.random() * 100; const e = tur === 0 ? S('ellipse', { rx: 6, ry: 2.8 }, pg) : tur === 1 ? S('polygon', { points: '0,-5 4.3,-2.5 4.3,2.5 0,5 -4.3,2.5 -4.3,-2.5' }, pg) : S('ellipse', { rx: 8, ry: 4.5 }, pg); e.setAttribute('class', 'f66-mic'); const k = kup[Math.floor(Math.random() * 4)]; P.push({ e, x, y: 84, vy: 38 + Math.random() * 14, k, yutuldu: Math.random() < 0.97, ph: Math.random() * 6 }); }
      else { const e = S('circle', { r: 3.4, class: 'f66-ins' }, pg); gir++; P.push({ e, x: 120 + Math.random() * 120, y: 84, vy: 36 + Math.random() * 10, yikil: Math.random() < 0.5, ph: Math.random() * 6, yy: 110 + Math.random() * 80 }); }
    };
    const kapat = () => {
      pg.replaceChildren(); top.replaceChildren(); P = []; sitok = [];
      if (RM) { // son durum
        if (mod === 'mik') kup.forEach((k) => { for (let i = 0; i < 3; i++) S('circle', { cx: k.x - 4 + i * 4, cy: k.y + (i % 2) * 3 - 1, r: 2.6, class: 'f66-mic' }, top); });
        else { for (let i = 0; i < 10; i++) S('circle', { cx: 130 + (i % 5) * 24, cy: 100 + Math.floor(i / 5) * 12, r: 3.4, class: 'f66-ins' }, top); for (let i = 0; i < 5; i++) S('circle', { cx: 150 + i * 24, cy: 262, r: 3.4, class: 'f66-ins' }, top); }
      }
      gir = 0; gec = 0; sayac();
    };
    const sayac = () => { const s = el.querySelector('.f66-sayac'); s.innerHTML = mod === 'ins' ? (RM ? 'Portal: 10 → sistemik: 5 <small>(temsilî sayaç: yarısına kadarı yıkılır)</small>' : `Portal: ${gir} → sistemik: ${gec} <small>(temsilî sayaç: yarısına kadarı yıkılır)</small>`) : '<small>Kupffer hücresine değen parçacıklar yutulur; sistemik dolaşıma temsilî olarak neredeyse hiçbiri geçmez.</small>'; };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (!b) return; mod = b.dataset.m; basSec(el, 'm', mod); cap.innerHTML = mod === 'mik' ? cap0 : REF('<b>İnsülin.</b> Pankreasın portal vene saldığı insülinin yarısına kadarı sistemik dolaşıma geçmeden karaciğerde yıkılır. Karaciğer aldosteron, ADH ve östrojeni de inaktive eder. [[K1 s. 302]]'); kapat(); });
    kapat();
    return ticker(el, (dt) => {
      if (RM) return;
      sp += dt; if (sp > (mod === 'mik' ? 0.5 : 0.35)) { sp = 0; if (P.length < 18) mkP(); }
      kup.forEach((k) => { k.glow = Math.max(0, k.glow - dt * 1.5); k.s.style.filter = ''; k.s.setAttribute('class', 'f66-kup' + (k.glow > 0 ? ' on' : '')); });
      if (Math.random() < dt * 0.6 && mod === 'mik') sitok.push({ k: kup[Math.floor(Math.random() * 4)], t: 0, e: S('circle', { r: 2.4, class: 'f66-sit' }, top) });
      sitok = sitok.filter((s) => { s.t += dt; s.e.setAttribute('cx', s.k.x + (s.k.x < 180 ? 18 : -18) * s.t); s.e.setAttribute('cy', s.k.y - 12 * s.t); s.e.style.opacity = 1 - s.t; if (s.t >= 1) { s.e.remove(); return false; } return true; });
      P = P.filter((q) => {
        q.y += q.vy * dt; q.ph += dt * 3; const sw = Math.sin(q.ph) * 6;
        if (mod === 'mik') {
          if (q.yutuldu && q.y > q.k.y - 10) { const f = Math.min(1, (q.y - (q.k.y - 10)) / 14); q.x = lerp(q.x, q.k.x, 0.15 + 0.1 * f); if (Math.hypot(q.x - q.k.x, q.y - q.k.y) < 10) { q.e.remove(); q.k.glow = 1; return false; } }
          else if (q.yutuldu) { q.x = lerp(q.x, q.k.x + (q.k.x < 180 ? 12 : -12), 0.01); }
        } else { if (q.yikil && q.y > q.yy) { q.e.style.opacity = Math.max(0, 1 - (q.y - q.yy) / 14); q.x += (q.x < 180 ? -1 : 1) * dt * 10; if (q.y > q.yy + 14) { q.e.remove(); return false; } } }
        q.e.setAttribute('transform', `translate(${(q.x + sw).toFixed(1)} ${q.y.toFixed(1)})`);
        if (q.y > 250) { if (mod === 'ins' && !q.yikil) gec++; q.e.remove(); return false; }
        return true;
      });
      if (mod === 'ins' && Math.random() < dt * 2) sayac();
      if (mod === 'ins' && gir > 400) { gir = Math.round(gir / 2); gec = Math.round(gec / 2); }
    });
  };

  /* ---------- 7 · Plazma proteinleri haritası ---------- */
  VIZ.f66_sentez = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    const K = ['II', 'VII', 'IX', 'X', 'C', 'S'];
    const GR = [
      ['Hemostaz', [['I', 'I (fibrinojen)'], ['II', 'II (protrombin)'], ['V', 'V'], ['VII', 'VII'], ['IX', 'IX'], ['X', 'X'], ['XI', 'XI'], ['AT', 'Antitrombin III'], ['C', 'Protein C'], ['S', 'Protein S']]],
      ['Taşıyıcılar', [['alb', 'Albümin'], ['hapto', 'Haptoglobin (α)'], ['seru', 'Seruloplazmin (α)'], ['tbg', 'Tiroksin bağlayıcı globulin (α)'], ['trf', 'Transferrin (β)'], ['shbg', 'Seks hormonu bağlayıcı globulin (β)'], ['agp', 'α₁-asit glikoprotein']]],
      ['Bağışıklık', [['komp', 'Kompleman proteinleri'], ['crp', 'C-reaktif protein']]],
      ['Proteaz inhibitörü', [['a1at', 'α₁-antitripsin']]],
    ];
    const IZ = { hemo: cap0, K: '<b>K vitaminine bağımlı faktörler.</b> II, VII, IX, X, protein C ve protein S\'nin sentezinde K vitamini γ-karboksilasyonda kofaktördür; K vitamini olmadan işlevsel yapılamazlar. [[K1 s. 302]]',
      alb: '<b>Albümin.</b> Başlıca plazma taşıyıcı proteini (Bölüm 76); plazma yarı ömrü 30 gündür. [[K1 s. 302, 304]]', hapto: '<b>Haptoglobin (α-globulin).</b> Hemolizde alyuvarlardan çıkan serbest Hb\'yi bağlar. [[K1 s. 302]]',
      seru: '<b>Seruloplazmin (α-globulin).</b> Bakır taşır. [[K1 s. 302]]', tbg: '<b>Tiroksin bağlayıcı globulin (α-globulin).</b> Tiroksini taşır. [[K1 s. 302]]', trf: '<b>Transferrin (β-globulin).</b> Demiri ferrik (Fe³⁺) biçimde bağlar. [[K1 s. 302]]',
      shbg: '<b>Seks hormonu bağlayıcı globulin (β-globulin).</b> Androjen ve östrojeni bağlar. [[K1 s. 302]]', agp: '<b>α₁-asit glikoprotein.</b> Bazik ve nötr yüklü ilaçları taşır. [[K1 s. 302]]',
      komp: '<b>Kompleman ve CRP.</b> Karaciğer bunları sentezleyerek doğal bağışıklığın kilit parçası olur. [[K1 s. 302]]', a1at: '<b>α₁-antitripsin.</b> Serin proteaz inhibitörü; dokuları nötrofil elastaz gibi enzimlerden korur. Eksikliğinde akciğerde (sigarasız da) KOAH, karaciğerde siroz gelişir. [[K1 s. 302–303]]',
      ig: '<b>İmmünoglobulinler.</b> γ-globulinlerin en önemli alt grubudur; karaciğerde değil, plazma hücrelerinde yapılır (Bölüm 75). [[K1 s. 302]]' };
    const iz = (k) => (k === 'crp' ? IZ.komp : IZ[k]);
    let sel = null, kvit = false;
    el.innerHTML = `<div class="f66-sent"><div class="f66-kar"><b class="f66-kar-b">Karaciğer</b>${GR.map(([ad, ch]) => `<div class="f66-grp"><h4>${ad}</h4><div class="f66-chips">${ch.map(([k, t]) => `<button type="button" class="f66-chip" data-k="${k}" aria-pressed="false">${t}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="f66-plz"><b>Plazma hücreleri</b><button type="button" class="f66-chip" data-k="ig" aria-pressed="false">İmmünoglobulinler (γ-globulin)</button><small>Karaciğerde yapılmaz</small></div></div>
      <div class="btn-row f66-ctl"><button type="button" class="btn ghost" data-kv aria-pressed="false">K vitamini yok</button></div>`;
    const upd = () => {
      el.querySelectorAll('[data-k]').forEach((b) => { const k = b.dataset.k; b.setAttribute('aria-pressed', String(sel === k)); b.classList.toggle('kyok', kvit && K.includes(k)); });
      el.querySelector('[data-kv]').setAttribute('aria-pressed', String(kvit));
      const hemo = ['I', 'II', 'V', 'VII', 'IX', 'X', 'XI', 'AT', 'C', 'S'];
      cap.innerHTML = kvit ? REF(IZ.K) : !sel || hemo.includes(sel) ? cap0 : REF(iz(sel));
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-kv')) { kvit = !kvit; if (kvit) sel = null; } else if (b.dataset.k) { sel = sel === b.dataset.k ? null : b.dataset.k; kvit = false; }
      upd();
    });
    return () => {};
  };

  /* ---------- 8 · İlaç molekülü: üç faz ---------- */
  VIZ.f66_faz = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let cur = 0, re = 'ox', kj = 'glu', xm = 0, ym = 0, tx = 0, ty = 0;
    el.innerHTML = `<div class="f66-svgw"></div><div class="f66-sel"></div>`;
    const svg = svgRoot(330, 'Bir ilaç molekülünün hepatositte faz 1, faz 2 ve faz 3 evrelerinden geçişi'); el.querySelector('.f66-svgw').appendChild(svg);
    const base = S('g', {}, svg), mol = S('g', {}, svg);
    Nd(base, 10, 6, 240, 30, 'f66-acc', 'Kan (sinüzoid)');
    R(base, 10, 50, 240, 270, 'f66-n f66-warn', 16); T(base, 20, 70, 'Hepatosit', 'b');
    const ST = [[30, 88, 'Faz 1 · P450', 'değiştirme'], [30, 168, 'Faz 2 · Konjugasyon', 'glukuronik asit, asetat, sülfat'], [30, 248, 'Faz 3 · ATP pompası', 'atılım']];
    ST.forEach(([x, y, a]) => { R(base, x, y, 190, 54, 'f66-n f66-chip', 10); T(base, x + 10, y + 21, a, 'b'); });
    Nd(base, 262, 140, 90, 54, 'f66-chip', 'Kan →\nböbrek\n(idrar)'); Nd(base, 262, 246, 90, 60, 'f66-ok', 'Safra\nkanalikülü');
    S('circle', { cx: 224, cy: 275, r: 12, class: 'f66-n f66-acc' }, base); T(base, 224, 279, 'ATP', 'f66-atp', 'middle');
    Ok(base, [[236, 275], [260, 275]], 'var(--ok)', 1.5); Ok(base, [[224, 143], [260, 160]], 'var(--muted)', 1.2, 1); T(base, 222, 134, 'yeterince polarsa', 'm', 'end');
    Ok(base, [[222, 222], [260, 176]], 'var(--muted)', 1.2, 1);
    const rozet = S('g', {}, svg);
    const pos = [[196, 56], [196, 115], [196, 195], [190, 275]];
    xm = tx = pos[0][0]; ym = ty = pos[0][1];
    const pol = [0.05, 0.45, 1, 1];
    const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => (cx + r * Math.cos((i * Math.PI) / 3)).toFixed(1) + ',' + (cy + r * Math.sin((i * Math.PI) / 3)).toFixed(1)).join(' ');
    const caps = [cap0,
      '<b>Faz 1 · değiştirme.</b> Sitokrom P450 oksidasyon, redüksiyon ya da hidrolizle ilacı daha polar yapar. Ürün etkin olabilir; yeterince suda çözünürse burada atılır, değilse faz 2\'ye geçer. [[K1 s. 303]]',
      '<b>Faz 2 · konjugasyon.</b> İlaç ya da faz 1 ürünü glukuronik asit, asetat ya da sülfata bağlanır; ortaya safra ya da idrarla atılmaya hazır, suda çözünür bir metabolit çıkar. [[K1 s. 303]]',
      '<b>Faz 3 · atılım.</b> Yakın zamanda tanımlanan bu evrede metabolitler ATP\'ye bağımlı olarak safraya atılır. [[K1 s. 303]]'];
    const RE = { ox: ['+ O (oksidasyon)', 'Oksidasyon'], red: ['+ H (redüksiyon)', 'Redüksiyon'], hid: ['bağ kesilir (hidroliz)', 'Hidroliz'] };
    const KJ = { glu: ['glukuronik asit', 'Glukuronik asit → glukuronidasyon'], ase: ['asetat', 'Asetat → asetilasyon'], sul: ['sülfat', 'Sülfat → sülfatasyon'] };
    const ciz = () => {
      mol.replaceChildren(); rozet.replaceChildren();
      const p = Math.min(cur, 3), polar = pol[cur];
      S('polygon', { points: hex(xm, ym, 14), style: `fill:color-mix(in srgb, var(--accent) ${polar * 100}%, var(--warn));stroke:var(--ink);stroke-width:1.2` }, mol);
      T(mol, xm, ym + 4, 'İ', 'f66-mi', 'middle');
      ST.forEach(([x, y, , b2], i) => T(rozet, x + 10, y + 40, i === 0 && cur >= 1 ? RE[re][0] : i === 1 && cur >= 2 ? '+ ' + KJ[kj][0] : b2, 'm'));
      if (cur >= 2) R(mol, xm + 10, ym - 22, 12, 12, 'f66-n f66-acc', 3);
      if (cur === 1) Nd(rozet, 140, 60, 108, 22, 'f66-clin', 'Etkin olabilir');
      T(rozet, 20, 308, 'Polarlık', 'm'); R(rozet, 80, 300, 110, 8, 'f66-n f66-chip', 4); R(rozet, 80, 300, 110 * polar, 8, 'f66-n f66-acc', 4);
      const host = el.querySelector('.f66-sel');
      host.innerHTML = cur === 1 ? segHtml('Tepkime tipi', 're', Object.entries(RE).map(([k, v]) => [k, v[1]]), re) : cur === 2 ? segHtml('Konjugasyon', 'kj', Object.entries(KJ).map(([k, v]) => [k, v[1]]), kj) : '';
    };
    const st = Adim(el, 4, (i) => { cur = i; tx = pos[i][0]; ty = pos[i][1]; if (RM) { xm = tx; ym = ty; } cap.innerHTML = i === 0 ? cap0 : REF(caps[i]); ciz(); });
    el.querySelector('.f66-sel').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.re) re = b.dataset.re; if (b.dataset.kj) kj = b.dataset.kj; ciz(); });
    ciz();
    // "Adım" satırını seçim satırının altına al
    el.appendChild(el.querySelector('.f66-ctl'));
    return ticker(el, (dt) => { st.tick(dt); if (Math.abs(xm - tx) + Math.abs(ym - ty) > 0.5) { xm = lerp(xm, tx, Math.min(1, dt * 6)); ym = lerp(ym, ty, Math.min(1, dt * 6)); ciz(); } else if (xm !== tx || ym !== ty) { xm = tx; ym = ty; ciz(); } });
  };

  /* ---------- 9 · Genotip ve etkileşim: plazma düzeyi ---------- */
  VIZ.f66_cyp = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let mod = 1, fen = 'nor', ilac = 'oks', kom = 'tek', anim = 1, oncekiPk = 65;
    const pk = () => (mod === 1 ? { zay: 12, nor: 65, ult: 135 }[fen] : { oks: { tek: 62, ind: 20, inh: 92 }, sik: { tek: 62, ind: 22, inh: 135 } }[ilac][kom]);
    el.innerHTML = `${segHtml('Mod', 'mod', [[1, 'Kodein ve CYP2D6'], [2, 'İndükleyici ve inhibitör']], 1)}
      <div class="f66-svgw"></div>
      <div class="f66-sec f66-sec1">${segHtml('Metabolizör', 'fen', [['zay', 'Zayıf metabolizör'], ['nor', 'Normal'], ['ult', 'Ultra hızlı']], 'nor')}</div>
      <div class="f66-sec f66-sec2" hidden>${segHtml('İlaç', 'ilac', [['oks', 'Oral kontraseptif'], ['sik', 'Siklosporin']], 'oks')} ${segHtml('Kombinasyon', 'kom', [['tek', 'Tek başına'], ['ind', '+ İndükleyici'], ['inh', '+ İnhibitör']], 'tek')}</div>
      <div class="f66-kart" aria-live="polite"></div>
      <div class="f66-lst" data-l="ind"><b>İndükleyiciler (PC BRAS)</b> fenitoin · karbamazepin · barbitüratlar · rifampisin · alkol (kronik) · sigara (CYP1A2)</div>
      <div class="f66-lst" data-l="inh"><b>İnhibitörler (OA DEVICES)</b> omeprazol · allopürinol · disülfiram · eritromisin · valproat · izoniazid · simetidin · etanol (akut) · sülfonamidler</div>
      <p class="f66-not">Asetilasyon: hızlı ve yavaş asetilleyiciler (ör. izoniazid). Alkol: ADH + ALDH; Çin kökenlilerin ≈ %50\'sinde etkin ALDH yok.</p>`;
    const svg = svgRoot(240, 'Plazma düzeyi–zaman eğrisi; etkisiz, etkin ve toksik bantlar'); el.querySelector('.f66-svgw').appendChild(svg);
    const X0 = 46, X1 = 346, Y0 = 200, YT = 16, SC = 1; // düzey 0..160 → y 200..40
    const Y = (L) => Y0 - L * SC;
    R(svg, X0, YT, X1 - X0, Y(100) - YT, 'f66-band f66-bt', 0); R(svg, X0, Y(100), X1 - X0, 70, 'f66-band f66-be', 0); R(svg, X0, Y(30), X1 - X0, 30, 'f66-band f66-bz', 0);
    T(svg, X1 - 4, YT + 14, 'Toksik', 'f66-tc', 'end'); T(svg, X1 - 4, Y(100) + 14, 'Etkin aralık', 'f66-to', 'end'); T(svg, X1 - 4, Y(30) + 20, 'Etkisiz', 'm', 'end');
    S('line', { x1: X0, x2: X0, y1: YT, y2: Y0, class: 'f66-axis' }, svg); S('line', { x1: X0, x2: X1, y1: Y0, y2: Y0, class: 'f66-axis' }, svg);
    T(svg, X1, Y0 + 16, 'Zaman →', 'm', 'end'); const yl = T(svg, 14, 110, 'Plazma düzeyi', 'm', 'middle'); yl.setAttribute('transform', 'rotate(-90 14 110)');
    const f = (t) => (Math.exp(-0.34 * t) - Math.exp(-1.5 * t)) / 0.5395; // tepe ≈ 1
    const egri = (pkv) => { const pts = []; for (let i = 0; i <= 60; i++) { const t = (i / 60) * 10; pts.push([X0 + (t / 10) * (X1 - X0 - 10), Y(Math.max(0, pkv * f(t)))]); } return poly(pts); };
    const ref = S('path', { class: 'f66-ref', fill: 'none' }, svg), cv = S('path', { class: 'f66-cv', fill: 'none' }, svg);
    const refLab = T(svg, X0 + 120, 34, '', 'm');
    const kart = el.querySelector('.f66-kart');
    const ciz = () => {
      const v = pk(); cv.setAttribute('d', egri(v)); ref.setAttribute('d', egri(mod === 1 ? 65 : 62));
      const cl = v < 30 ? 'var(--muted)' : v > 100 ? 'var(--crit)' : 'var(--ok)'; cv.style.stroke = cl;
      refLab.textContent = mod === 1 ? 'kesik: normal metabolizör' : 'kesik: tek başına';
    };
    const metin = () => {
      let c, k;
      if (mod === 1) {
        if (fen === 'zay') { c = '<b>Kodein · zayıf metabolizör.</b> Beyaz ırktan hastaların yaklaşık %6\'sında CYP2D6 etkisiz ya da işlevsizdir; morfin oluşmaz, analjezi olmaz ama bulantı ve kabızlık çoğu zaman yine görülür. [[K1 s. 303]]'; k = '<span class="tag">≈ %6 · beyaz ırk</span> Analjezi yok · bulantı ve kabızlık çoğu zaman yine var'; }
        else if (fen === 'ult') { c = '<b>Kodein · ultra hızlı metabolizör.</b> Hastaların %1–2\'sinde plazma morfini hızla yükselir. Böyle bir annenin emzirdiği bebek sütle opioid doz aşımına uğrayabilir; kodein emziren annelerde önerilmez. [[K1 s. 303]]'; k = '<span class="tag crit">%1–2</span> <svg class="f66-ab" viewBox="0 0 40 24" aria-hidden="true"><circle cx="11" cy="7" r="5" fill="var(--ink)"/><path d="M2 22 q9-14 18 0z" fill="var(--ink)"/><circle cx="31" cy="14" r="3.4" fill="var(--ink)"/><path d="M25 22 q6-8 12 0z" fill="var(--ink)"/></svg> Emziren annede sütle bebeğe opioid geçer → doz aşımı; kodein emzirmede önerilmez'; }
        else { c = cap0; k = 'Ön ilaç kodein CYP2D6 ile morfine çevrilir; düzey etkin aralıkta tepe yapar.'; }
      } else {
        const o = ilac === 'oks';
        if (kom === 'tek') { c = '<b>Tek başına.</b> İlaç düzeyi etkin aralıkta kalır. İndükleyici ya da inhibitör ekleyin. [[K1 s. 303]]'; k = 'Düzey etkin aralıkta.'; }
        else if (o && kom === 'ind') { c = '<b>Oral kontraseptif + enzim indükleyici.</b> P450 etkinliği artar, hap daha hızlı yıkılır ve düzeyi düşer: gebelik riski. [[K1 s. 303]]'; k = 'Hızlı yıkım → gebelik riski'; }
        else if (!o && kom === 'inh') { c = '<b>Siklosporin + enzim inhibitörü.</b> Örneğin yoğun bakımda prokinetik amaçla eritromisin verilince siklosporin yıkımı yavaşlar, düzeyi yükselir ve toksisite gelişebilir. [[K1 s. 303]]'; k = 'Yavaş yıkım → toksisite (ör. yoğun bakımda prokinetik eritromisin)'; }
        else { c = '<b>' + (o ? 'Oral kontraseptif' : 'Siklosporin') + (kom === 'ind' ? ' + indükleyici.' : ' + inhibitör.') + '</b> Kitap bu örneği vermez; yön: inhibitör düzeyi yükseltir, indükleyici düşürür. [[K1 s. 303]]'; k = 'Kitap bu örneği vermez; yön: inhibitör düzeyi yükseltir, indükleyici düşürür.'; }
      }
      cap.innerHTML = c === cap0 ? cap0 : REF(c); kart.innerHTML = k;
      el.querySelector('[data-l=ind]').classList.toggle('on', mod === 2 && kom === 'ind'); el.querySelector('[data-l=inh]').classList.toggle('on', mod === 2 && kom === 'inh');
      el.querySelector('.f66-not').hidden = mod !== 1; el.querySelector('.f66-sec1').hidden = mod !== 1; el.querySelector('.f66-sec2').hidden = mod !== 2;
    };
    let tw = null;
    const calis = () => { ciz(); metin(); if (RM) return; const L = cv.getTotalLength(); cv.style.strokeDasharray = L; cv.style.strokeDashoffset = L; tw = { t: 0, L }; };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.mod) { mod = +b.dataset.mod; basSec(el, 'mod', mod); }
      else if (b.dataset.fen) { fen = b.dataset.fen; basSec(el, 'fen', fen); }
      else if (b.dataset.ilac) { ilac = b.dataset.ilac; basSec(el, 'ilac', ilac); }
      else if (b.dataset.kom) { kom = b.dataset.kom; basSec(el, 'kom', kom); }
      else return;
      calis();
    });
    ciz(); metin();
    return ticker(el, (dt) => { if (!tw) return; tw.t += dt / 0.8; cv.style.strokeDashoffset = tw.L * Math.max(0, 1 - tw.t); if (tw.t >= 1) { cv.style.strokeDasharray = ''; tw = null; } });
  };

  /* ---------- 10 · Üç ek görev ---------- */
  VIZ.f66_diger = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    const IK = {
      dep: `<svg viewBox="0 0 120 80" class="f66-ik" aria-hidden="true"><path d="M10 40 C10 16 40 8 64 12 C96 18 112 28 112 44 C112 62 88 70 62 68 C34 66 10 60 10 40Z" class="f66-n f66-warn"/><rect x="26" y="26" width="22" height="16" rx="3" class="f66-n f66-chip"/><rect x="54" y="22" width="22" height="16" rx="3" class="f66-n f66-chip"/><rect x="38" y="44" width="22" height="16" rx="3" class="f66-n f66-chip"/><rect x="68" y="42" width="24" height="16" rx="3" class="f66-n f66-chip"/></svg>`,
      kan: `<svg viewBox="0 0 120 80" class="f66-ik" aria-hidden="true"><circle cx="20" cy="22" r="10" class="f66-n f66-chip"/><path d="M10 60 C10 40 34 36 40 52 C44 64 24 70 10 60Z" class="f66-n f66-chip"/><path d="M44 50 L62 50" class="f66-ln"/><path d="M62 30 C62 16 82 10 94 18 C108 26 104 48 88 50 C72 52 62 44 62 30Z" class="f66-n f66-warn"/><polygon points="85,22 90,27 85,32 80,27" class="f66-n f66-crit"/></svg>`,
      rez: `<svg viewBox="0 0 120 80" class="f66-ik" aria-hidden="true"><path d="M10 40 C10 16 40 8 64 12 C96 18 112 28 112 44 C112 62 88 70 62 68 C34 66 10 60 10 40Z" class="f66-n f66-warn"/><path class="f66-ak" d="M62 66 L62 78" /><path d="M50 8 L58 22 L50 22 L58 36" class="f66-ln f66-bolt"/><circle class="f66-dr" cx="86" cy="68" r="3"/><circle class="f66-dr f66-dr2" cx="98" cy="68" r="3"/></svg>`,
    };
    const KART = [
      ['dep', 'Depo', 'Glikojen · demir · bakır · A, D, E, K vitaminleri', IK.dep, cap0],
      ['kan', 'Kan yapımı ve yıkımı', 'Fetal karaciğer: ilk üç ay eritropoezin ana yeri · Kupffer: yaşlı alyuvarlar (çoğunu dalak yapar)', IK.kan, '<b>Hematolojik.</b> Gebeliğin ilk üç ayında fetal karaciğer eritropoezin ana yeridir; erişkinde Kupffer hücreleri yaşlı ya da hasarlı alyuvarları temizler, ama bu işin çoğunu dalak yapar. [[K1 s. 304]]'],
      ['rez', 'Kan rezervuarı', '≤ 250 mL · sempatik uyarı', IK.rez, '<b>Kan rezervuarı.</b> Sempatik uyarıda karaciğer sistemik dolaşıma 250 mL\'ye kadar venöz kan verebilir (Bölüm 65). [[K1 s. 304]]'],
    ];
    el.innerHTML = `<div class="f66-kartlar">${KART.map(([k, t, a, ik], i) => `<button type="button" class="f66-kt" data-k="${k}" aria-pressed="${i === 0}">${ik}<b>${t}</b><span>${a}</span></button>`).join('')}</div>`;
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (!b) return; const k = b.dataset.k; basSec(el, 'k', k); const d = KART.find((x) => x[0] === k); cap.innerHTML = k === 'dep' ? cap0 : REF(d[4]); });
    return () => {};
  };

  /* ---------- 11 · Fibroz ve portal basınç ---------- */
  VIZ.f66_portal = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let fib = 0;
    el.innerHTML = `<div class="f66-svgw"></div>${rng('Fibroz / sinüzoidal direnç', 'f', 0, 100, 1, 0, '0')}
      <ul class="f66-kayip"><li>Hiper-/hipoglisemi</li><li>Pıhtılaşma bozukluğu</li><li>Hipoalbüminemi (ödem, ilaç bağlanması)</li><li>Yavaş ilaç metabolizması</li><li>NH₃ → ensefalopati</li></ul>`;
    const svg = svgRoot(408, 'Fibroz arttıkça portal ven basıncı yükselir; 12 mmHg üzerinde asit, splenomegali ve portokaval anastomozlar ortaya çıkar'); el.querySelector('.f66-svgw').appendChild(svg);
    const base = S('g', {}, svg), gauge = S('g', {}, svg), dyn = S('g', {}, svg);
    // gösterge
    T(gauge, 20, 14, 'Portal ven basıncı (mmHg)', 'b');
    const gx = (v) => 20 + (320 * v) / 30;
    R(gauge, 20, 22, 320, 14, 'f66-n f66-chip', 5); R(gauge, gx(5), 22, gx(10) - gx(5), 14, 'f66-n f66-ok', 3);
    S('line', { x1: gx(12), x2: gx(12), y1: 18, y2: 42, class: 'f66-lim' }, gauge); T(gauge, gx(12) + 4, 54, '12: portal hipertansiyon', 'f66-tc');
    T(gauge, gx(7.5), 54, 'normal', 'f66-to', 'middle'); [0, 30].forEach((v) => T(gauge, gx(v), 54, String(v), 'm', v ? 'end' : 'start'));
    gauge.lastChild.style.display = 'none';
    const mk = S('path', { d: 'M0 44 l-6 -9 h12z', class: 'f66-mk' }, gauge); const pt = T(gauge, 0, 76, '', 'b', 'middle');
    // gövde
    Nd(base, 110, 100, 140, 70, 'f66-warn', ''); T(base, 180, 118, 'Karaciğer', 'b', 'middle');
    Ok(base, [[180, 100], [180, 84]], 'var(--accent)', 2.5); T(base, 188, 92, 'Hepatik ven → VCİ', 'm');
    Nd(base, 110, 306, 140, 44, 'f66-chip', 'Bağırsak');
    const portal = S('path', { d: 'M180 306 V170', fill: 'none', style: 'stroke:var(--accent)' }, base); const dal = S('path', { d: 'M92 214 Q130 232 180 232', fill: 'none', style: 'stroke:var(--accent);stroke-width:3' }, base);
    T(base, 188, 270, 'Portal ven', 'f66-ta');
    const dalak = R(base, 22, 190, 70, 44, 'f66-n f66-crit', 10); const dalT = T(base, 57, 217, 'Dalak', 'b', 'middle');
    const skar = S('g', {}, base);
    const asit = S('path', { d: 'M8 272 q22 -8 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 V398 H8Z', class: 'f66-asit' }, svg); svg.insertBefore(asit, base);
    const asT = T(dyn, 180, 392, 'Asit · enfeksiyon riski yüksek', 'f66-tc', 'middle');
    const sp = T(dyn, 22, 252, 'Splenomegali', 'f66-tc'); const sp2 = T(dyn, 22, 268, '→ trombositopeni, anemi', 'f66-tc');
    const vz = S('g', {}, dyn); const kaput = S('g', {}, dyn); const rek = S('g', {}, dyn); const nh = S('g', {}, dyn);
    // varisler
    S('path', { d: 'M262 140 q18 -10 12 -26 q-10 -14 6 -28 q12 -8 8 -18', class: 'f66-var', fill: 'none' }, vz); T(vz, 350, 160, 'Özofagus varisleri', 'f66-tc', 'end');
    const dr = S('circle', { cx: 290, cy: 62, r: 3.4, class: 'f66-kan' }, vz);
    for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; S('line', { x1: 300, y1: 218, x2: 300 + Math.cos(a) * 22, y2: 218 + Math.sin(a) * 22, class: 'f66-var' }, kaput); } S('circle', { cx: 300, cy: 218, r: 3, class: 'f66-kan' }, kaput); T(kaput, 350, 256, 'Kaput medusa', 'f66-tc', 'end');
    S('path', { d: 'M262 332 q22 4 26 -12 q4 -14 22 -8', class: 'f66-var', fill: 'none' }, rek); T(rek, 350, 368, 'Rektal varisler', 'f66-tc', 'end');
    Ok(nh, [[250, 322], [340, 322], [340, 112]], 'var(--crit)', 1.6, 1); T(nh, 336, 296, 'NH₃ karaciğeri atlar', 'm', 'end');
    const kay = el.querySelector('.f66-kayip'), akis = { a: null, b: null };
    const dots = Akis(svg, [[180, 306], [180, 170]], 'var(--accent)', 6, 40, 3), dots2 = Akis(svg, [[92, 214], [130, 226], [180, 232]], 'var(--accent)', 3, 30, 3);
    const baski = () => 7 + 0.18 * fib;
    const ciz = () => {
      const p = baski(), r = Math.round(p);
      portal.setAttribute('style', `stroke:var(--accent);stroke-width:${4 + p / 4}`);
      mk.setAttribute('transform', `translate(${gx(p)} 0)`); pt.setAttribute('x', clamp(gx(p), 40, 320)); pt.textContent = r + ' mmHg';
      pt.setAttribute('y', 76); mk.nextSibling && 0;
      const o = clamp((p - 11.5) / 2, 0, 1); [asit].forEach((e) => (e.style.opacity = o * 0.9)); [asT, sp, sp2, vz, kaput, rek, nh].forEach((e) => (e.style.opacity = o));
      const e = o; dalak.setAttribute('x', 22 - 8 * e); dalak.setAttribute('y', 190 - 6 * e); dalak.setAttribute('width', 70 + 14 * e); dalak.setAttribute('height', 44 + 12 * e); dalT.setAttribute('x', 57 - e); dalT.setAttribute('y', 217 + 0 * e);
      skar.replaceChildren(); for (let i = 0; i < Math.round(fib / 8); i++) { const x = 120 + ((i * 37) % 120), y = 124 + ((i * 23) % 36); S('circle', { cx: x, cy: y, r: 3 + (i % 3), class: 'f66-nod' }, skar); if (i % 2) S('line', { x1: x - 8, y1: y + 6, x2: x + 9, y2: y - 5, class: 'f66-skar' }, skar); }
      kay.style.opacity = clamp((fib - 30) / 30, 0, 1) * 1; kay.classList.toggle('on', fib > 30);
      el.querySelector('[data-o=f]').textContent = fib;
      const sp1 = clamp(1 - fib / 130, 0.25, 1); dots.hiz = 40 * sp1; dots2.hiz = 30 * sp1;
      cap.innerHTML = p <= 10 ? cap0 : p <= 12 ? REF(`<b>Direnç artıyor.</b> Fibroz sinüzoidleri bozup tıkadıkça akıma direnç ve portal basınç artar; ${r} mmHg henüz portal hipertansiyon eşiğinin altında. [[K1 s. 304]]`) : REF(`<b>Portal hipertansiyon (${r} mmHg).</b> Asit (yüksek venöz hidrostatik basınç sıvıyı periton boşluğuna süzer), splenomegali (dalak drenajı bozulur, trombosit ve alyuvar tutulur) ve portokaval anastomozlar (varisler, kaput medusa; azotlu moleküller karaciğeri atlar). [[K1 s. 304]]`);
    };
    el.addEventListener('input', (e) => { if (e.target.dataset.r === 'f') { fib = +e.target.value; ciz(); } });
    ciz();
    return ticker(el, (dt) => { dots.upd(dt); dots2.upd(dt); });
  };

  /* ---------- 12 · Sentez testleri: zaman ---------- */
  VIZ.f66_kft = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let t = 0, run = false;
    el.innerHTML = `<div class="f66-svgw"></div>
      <div class="f66-gs"><div class="f66-g" data-g="pt"><span>PT</span><b></b></div><div class="f66-g" data-g="alb"><span>Albümin</span><b></b></div></div>
      ${rng('Hasardan sonra gün', 't', 0, 30, 0.25, 0, '0')}<div class="btn-row"><button type="button" class="btn" data-a="oyn">Oynat</button></div>
      <p class="f66-not">PT = ekstrinsik yol · faktör II, V, VII, X ve fibrinojen (hepsi karaciğerde)</p>`;
    const svg = svgRoot(262, 'Hasardan sonra PT faktörleri ve albümin düzeylerinin zamanla düşüşü'); el.querySelector('.f66-svgw').appendChild(svg);
    const X0 = 46, X1 = 346, Y0 = 200, Y1 = 16;
    const x = (d) => X0 + ((X1 - X0) * d) / 30, y = (c) => Y0 - ((Y0 - Y1) * c) / 100;
    S('line', { x1: X0, x2: X0, y1: Y1, y2: Y0, class: 'f66-axis' }, svg); S('line', { x1: X0, x2: X1, y1: Y0, y2: Y0, class: 'f66-axis' }, svg);
    [0, 25, 50, 75, 100].forEach((c) => { S('line', { x1: X0, x2: X1, y1: y(c), y2: y(c), class: 'f66-grid' }, svg); T(svg, X0 - 6, y(c) + 4, String(c), 'm', 'end'); });
    [0, 7, 14, 21, 30].forEach((d) => T(svg, x(d), Y0 + 16, String(d), 'm', 'middle')); T(svg, X1, Y0 + 32, 'Gün', 'm', 'end');
    const yl = T(svg, 10, 110, '% başlangıç', 'm', 'middle'); yl.setAttribute('transform', 'rotate(-90 10 110)');
    const alb = (d) => 100 * Math.pow(0.5, d / 30), pt = (d) => 100 * Math.pow(0.5, d / 0.75);
    const egri = (fn, a, b, xf, yf) => { const pts = []; for (let i = 0; i <= 80; i++) { const d = a + ((b - a) * i) / 80; pts.push([xf(d), yf(fn(d))]); } return poly(pts); };
    S('path', { d: egri(alb, 0, 30, x, y), class: 'f66-eg f66-ealb', fill: 'none' }, svg); S('path', { d: egri(pt, 0, 30, x, y), class: 'f66-eg f66-ept', fill: 'none' }, svg);
    T(svg, x(15), y(alb(15)) - 10, 'Albümin (t½ 30 gün)', 'f66-ta', 'middle'); T(svg, x(1.3), y(70), 'PT faktörleri', 'f66-tc'); T(svg, x(1.3), y(70) + 14, '(t½ < 24 sa)', 'f66-tc');
    // büyüteç: ilk 3 gün
    const bx = 130, by = 112, bw = 190, bh = 86;
    R(svg, bx, by, bw, bh, 'f66-n f66-chip f66-buy', 6); T(svg, bx + 6, by + 14, 'İlk 3 gün', 'b');
    const x3 = (d) => bx + 22 + ((bw - 34) * d) / 3, y3 = (c) => by + bh - 14 - ((bh - 38) * c) / 100;
    S('path', { d: egri(pt, 0, 3, x3, y3), class: 'f66-eg f66-ept', fill: 'none' }, svg); S('path', { d: egri(alb, 0, 3, x3, y3), class: 'f66-eg f66-ealb', fill: 'none' }, svg);
    [0, 1, 2, 3].forEach((d) => T(svg, x3(d), by + bh - 2, String(d), 'm', 'middle'));
    const ms = S('line', { y1: Y1, y2: Y0, class: 'f66-lim' }, svg), ms3 = S('line', { y1: by + 20, y2: by + bh - 14, class: 'f66-lim' }, svg);
    const dp = S('circle', { r: 4, class: 'f66-dpt' }, svg), da = S('circle', { r: 4, class: 'f66-dal' }, svg), dp3 = S('circle', { r: 3.4, class: 'f66-dpt' }, svg), da3 = S('circle', { r: 3.4, class: 'f66-dal' }, svg);
    const ciz = () => {
      const p = pt(t), a = alb(t);
      ms.setAttribute('x1', x(t)); ms.setAttribute('x2', x(t)); dp.setAttribute('cx', x(t)); dp.setAttribute('cy', y(p)); da.setAttribute('cx', x(t)); da.setAttribute('cy', y(a));
      const t3 = Math.min(t, 3); ms3.style.display = dp3.style.display = da3.style.display = t > 3 ? 'none' : ''; ms3.setAttribute('x1', x3(t3)); ms3.setAttribute('x2', x3(t3)); dp3.setAttribute('cx', x3(t3)); dp3.setAttribute('cy', y3(p)); da3.setAttribute('cx', x3(t3)); da3.setAttribute('cy', y3(a));
      const g1 = el.querySelector('[data-g=pt]'), g2 = el.querySelector('[data-g=alb]');
      const pu = p < 50; g1.className = 'f66-g ' + (pu ? 'crit' : 'ok'); g1.querySelector('b').textContent = pu ? 'Uzamış' : 'Normal';
      const ad = a < 70; g2.className = 'f66-g ' + (ad ? 'warn' : 'ok'); g2.querySelector('b').textContent = ad ? 'Düşük' : 'Normal';
      el.querySelector('[data-o=t]').textContent = String(t).replace('.', ',');
      const tt = fmt(t, 1).replace(',0', '');
      cap.innerHTML = t === 0 ? cap0 : t <= 3 ? REF(`<b>${tt}. gün.</b> Yarı ömrü 24 saatten kısa olan faktörler hızla azaldı; PT uzadı. Albümin hâlâ başlangıca yakın. PT akut yetmezlikte etkili bir sentez ölçüsüdür. [[K1 s. 305]]`) : t < 30 ? REF(`<b>${tt}. gün.</b> Albümin ancak yavaş düşüyor (t½ 30 gün); kapiller kaçak ve protein yıkımı da düzeyini etkiler. Bu yüzden akut hastalıkta zayıf, süregen hastalıkta yararlı bir göstergedir. [[K1 s. 304]]`) : REF('<b>30. gün.</b> Albümin ancak yarıya indi. [[K1 s. 304]]');
      el.querySelector('[data-a=oyn]').textContent = run ? 'Duraklat' : (t >= 30 ? 'Baştan' : 'Oynat');
    };
    el.addEventListener('input', (e) => { if (e.target.dataset.r === 't') { t = +e.target.value; run = false; ciz(); } });
    el.addEventListener('click', (e) => { if (!e.target.closest('[data-a=oyn]')) return; if (RM) { t = 30; run = false; } else if (run) run = false; else { if (t >= 30) t = 0; run = true; } el.querySelector('[data-r=t]').value = t; ciz(); });
    ciz();
    return ticker(el, (dt) => { if (!run) return; t = Math.min(30, t + dt * 5); if (t >= 30) run = false; el.querySelector('[data-r=t]').value = t; ciz(); });
  };

  /* ---------- 13 · King's College ölçütleri ---------- */
  VIZ.f66_kcc = (el) => {
    const cap = capOf(el), cap0 = cap.innerHTML;
    let ph = 7.38, pt = 14, cr = 90, en = 0;
    el.innerHTML = `<div class="f66-in">${rng('Arteriyel pH', 'ph', 6.9, 7.45, 0.01, 7.38, '7,38')}${rng('PT (s) <small>(&gt; 100 s ≈ INR &gt; 6,5)</small>', 'pt', 10, 150, 1, 14, '14')}${rng('Serum kreatinini (µmol/L)', 'cr', 50, 600, 10, 90, '90')}
      <div class="f66-rng"><span>Hepatik ensefalopati derecesi</span>${segHtml('Ensefalopati derecesi', 'en', [[0, '0'], [1, 'I'], [2, 'II'], [3, 'III'], [4, 'IV']], 0)}</div></div><div class="f66-svgw"></div>`;
    const svg = svgRoot(250, 'King\'s College ölçütleri karar şeması: pH 7,3\'ün altı ya da PT, kreatinin ve ensefalopati ölçütlerinin üçü birden'); el.querySelector('.f66-svgw').appendChild(svg);
    const kut = (x, y, w, h, t) => { const g = S('g', {}, svg); R(g, x, y, w, h, 'f66-n f66-chip', 10); const ls = t.split('\n'); const ts = ls.map((s, i) => T(g, x + w / 2, y + h / 2 - ((ls.length - 1) * 7) + 4 + i * 14, s, 'b', 'middle')); const ck = T(g, x + w - 8, y + 16, '✓', 'f66-ck', 'end'); return { g, r: g.firstChild, ck }; };
    const k0 = kut(80, 8, 200, 44, 'pH < 7,3');
    T(svg, 180, 76, 'YA DA', 'f66-ve', 'middle');
    const k1 = kut(4, 92, 104, 62, 'PT\n> 100 s'), k2 = kut(128, 92, 104, 62, 'Kreatinin\n> 300 µmol/L'), k3 = kut(252, 92, 104, 62, 'Ensefalopati\nIII–IV');
    T(svg, 118, 128, 'VE', 'f66-ve', 'middle'); T(svg, 242, 128, 'VE', 'f66-ve', 'middle');
    const not = T(svg, 180, 176, 'Üçü birlikte gerekir', 'm', 'middle');
    const sonuc = kut(40, 192, 280, 44, ''); const sT = T(sonuc.g, 180, 219, '', 'b', 'middle'); sonuc.ck.textContent = '';
    const ciz = () => {
      const a = ph < 7.3, b = pt > 100, c = cr > 300, d = en >= 3, tri = b && c && d, kar = a || tri, any = b || c || d;
      [[k0, a], [k1, b], [k2, c], [k3, d]].forEach(([k, on]) => { k.r.setAttribute('class', 'f66-n ' + (on ? 'f66-crit' : 'f66-chip')); k.ck.style.display = on ? '' : 'none'; });
      not.style.display = (b || c || d) && !tri ? '' : 'none';
      sonuc.r.setAttribute('class', 'f66-n ' + (kar ? 'f66-crit' : 'f66-ok')); sT.textContent = kar ? 'Nakil düşünülür' : 'Ölçüt karşılanmıyor'; sT.setAttribute('class', 'f66-t b ' + (kar ? 'f66-tc' : 'f66-to'));
      el.querySelector('[data-o=ph]').textContent = fmt(ph, 2); el.querySelector('[data-o=pt]').textContent = pt; el.querySelector('[data-o=cr]').textContent = cr;
      cap.innerHTML = a ? REF('<b>Nakil düşünülür: pH ölçütü.</b> Arteriyel pH 7,3\'ün altında; bu tek başına yeterlidir.' + (tri ? ' Üçlü ölçüt de karşılanıyor.' : '') + ' [[K1 s. 305]]') : tri ? REF('<b>Nakil düşünülür: üçlü ölçüt.</b> PT > 100 s (INR > 6,5), kreatinin > 300 µmol/L ve III–IV. derece ensefalopati birlikte. [[K1 s. 305]]') : any ? REF('<b>Ölçüt henüz karşılanmıyor.</b> pH 7,3 ve üstündeyken PT, kreatinin ve ensefalopati ölçütlerinin üçü birden gerekir. [[K1 s. 305]]') : cap0;
    };
    el.addEventListener('input', (e) => { const r = e.target.dataset.r; if (!r) return; const v = +e.target.value; if (r === 'ph') ph = v; else if (r === 'pt') pt = v; else cr = v; ciz(); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-en]'); if (!b) return; en = +b.dataset.en; basSec(el, 'en', en); ciz(); });
    ciz();
    return () => {};
  };
})();
