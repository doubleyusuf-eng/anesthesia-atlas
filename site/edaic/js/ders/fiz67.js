/* Bölüm 67 · Böbrek işlevi, anatomisi ve kan akımı · bileşenler (tarif: docs/tasarim/fiz67.md; K1 s. 307–311).
   Tüm modeller şematiktir; mutlak sayılar yalnız kitaptakilerdir (viz-foot'ta belirtilir). */
(() => {
  'use strict';
  const { ticker, esc, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const say = (el, html) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  const wrap = (t, max) => { const L = []; let c = ''; for (const w of String(t).split(' ')) { if (c && (c + ' ' + w).length > max) { L.push(c); c = w; } else c = c ? c + ' ' + w : w; } if (c) L.push(c); return L; };
  const txt = (x, y, t, cls = '', anc = 'start', max = 0, lh = 13, extra = '') => {
    const L = max ? wrap(t, max) : [t];
    return `<text class="f67-lb ${cls}" x="${x}" y="${y}" text-anchor="${anc}"${extra}>${L.map((s, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(s)}</tspan>`).join('')}</text>`;
  };
  const nl = (t, max) => wrap(t, max).length;
  // sözde rastgele (her yüklemede aynı yerleşim)
  const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  const sp = (d, sx) => (sx === 1 ? d : d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (m, a, b) => `${(+a * sx).toFixed(1)},${b}`));
  // kapsayıcı genişliğine göre geniş / dar çizim (560 px eşiği)
  function resp(el, render) {
    let cur = null;
    const go = () => { const n = (el.clientWidth || 800) < 560; if (n !== cur) { cur = n; el.classList.toggle('f67-n', n); render(n); } };
    go();
    let ro = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(go); ro.observe(el); }
    return () => { if (ro) ro.disconnect(); };
  }
  const defs = (p) => `<defs>${[['m', 'muted'], ['a', 'accent'], ['c', 'crit'], ['o', 'ok'], ['b', 'c-basic'], ['w', 'warn']].map(([k, v]) => `<marker id="${p}-${k}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M1 1L9 5L1 9z" style="fill:var(--${v})"/></marker>`).join('')}</defs>`;
  const svgOpen = (w, h, label) => `<svg class="f67-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">`;
  const onAct = (e, fn) => { if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return false; if (e.type === 'keydown') e.preventDefault(); fn(); return true; };
  const BEAN = 'M0,-125 C100,-125 140,-60 120,-20 C110,0 60,0 60,20 C60,40 110,45 120,65 C140,115 80,125 0,125 C-100,125 -150,60 -150,0 C-150,-70 -90,-125 0,-125 Z';

  // adımlı bileşenler için ortak denetleyici: ← Geri, İleri →, Oynat/Duraklat, Baştan, numara düğmeleri
  const stepHtml = () => `<div class="btn-row f67-ctl"><button type="button" class="btn ghost" data-a="geri">← Geri</button><button type="button" class="btn" data-a="ileri">İleri →</button><button type="button" class="btn ghost" data-a="oyna" aria-pressed="false"${RM ? ' disabled title="Azaltılmış hareket açık"' : ''}>Oynat</button><button type="button" class="btn ghost" data-a="basa">Baştan</button></div><div class="f67-dots" role="group" aria-label="Adım seçimi"></div>`;
  function stepper(el, o) {
    let i = 0, play = false, acc = 0;
    const ctl = el.querySelector('.f67-ctl'), dots = el.querySelector('.f67-dots');
    const draw = () => {
      const t = o.total();
      dots.innerHTML = Array.from({ length: t }, (_, k) => `<button type="button" class="f67-dot" data-s="${k}" aria-label="Adım ${k + 1}" aria-pressed="${k === i}">${k + 1}</button>`).join('');
      ctl.querySelector('[data-a=geri]').disabled = i === 0;
      ctl.querySelector('[data-a=ileri]').disabled = i >= t - 1;
      const p = ctl.querySelector('[data-a=oyna]'); p.textContent = play ? 'Duraklat' : 'Oynat'; p.setAttribute('aria-pressed', String(play));
    };
    const set = (k) => { i = clamp(k, 0, o.total() - 1); acc = 0; o.go(i); draw(); };
    const onClick = (e) => {
      const a = e.target.closest('[data-a]'), s = e.target.closest('[data-s]');
      if (s && el.contains(s)) { play = false; set(+s.dataset.s); return; }
      if (!a || !ctl.contains(a)) return;
      const t = a.dataset.a;
      if (t === 'geri') { play = false; set(i - 1); } else if (t === 'ileri') { play = false; set(i + 1); } else if (t === 'basa') { play = false; set(0); } else if (t === 'oyna' && !RM) { play = !play; if (play && i >= o.total() - 1) set(0); else draw(); }
    };
    el.addEventListener('click', onClick);
    return {
      get i() { return i; },
      set, redraw: draw, reset: () => { play = false; set(0); },
      tick(dt) { if (!play || RM) return; acc += dt; if (acc >= 3.5) { if (i < o.total() - 1) set(i + 1); else { play = false; draw(); } } },
      off: () => el.removeEventListener('click', onClick),
    };
  }

  /* ---------- 1 · İşlevlerin sınıflaması ---------- */
  VIZ.f67_islev = (el) => {
    const HOM = [
      ['Plazma hacmi ve elektrolit derişimi', '<b>Plazma hacmi ve elektrolitler.</b> Kan bileşiminin homeostazının parçasıdır; geri emilim ve aldosteron etkisi Bölüm 68–69\'da. [[K1 s. 307]]'],
      ['Plazma ozmolaritesi', '<b>Plazma ozmolaritesi.</b> Böbrek plazma ozmolaritesini denetler; bunun için medüller ozmotik gradyan ve toplayıcı kanalda denetlenen su geri emilimi kullanılır. [[K1 s. 307]]'],
      ['Atık ürün ve ilaç (metabolit) atılımı', '<b>Atılım.</b> Atık ürünler ile ilaçlar ya da metabolitleri böbrekten uzaklaştırılır. [[K1 s. 307]]'],
      ['Glukoneogenez', '<b>Glukoneogenez.</b> Böbrek önemli bir glukoneogenez organıdır. [[K1 s. 307]]'],
      ['Asit–bazın metabolik yanı', '<b>Asit–baz.</b> Böbrek asit–baz dengesinin metabolik yanını denetler. [[K1 s. 307]]'],
    ];
    const END = [
      ['Eritropoietin → alyuvar yapımı', '<b>Eritropoietin.</b> Böbrekte yapılır ve alyuvar yapımını denetler. [[K1 s. 307]]'],
      ['D vitamini → 1,25-dihidroksikolekalsiferol', '<b>D vitamini.</b> Böbrek D vitaminini etkin biçimi 1,25-dihidroksikolekalsiferole çevirir. [[K1 s. 307]]'],
      ['Renin → RAA ekseninin ilk hormonu', '<b>Renin.</b> Jukstaglomerüler aygıtın granüler hücrelerinden salınır; renin–anjiyotensin–aldosteron ekseninin ilk hormonudur (aşağıda). [[K1 s. 307, 310]]'],
    ];
    const ALL = HOM.concat(END);
    let sel = -1;
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    const bean = (x, y) => `<g transform="translate(${x} ${y}) scale(.17)"><path d="${BEAN}" class="f67-fill-clin" stroke-width="9"/></g>`;
    const box = (i, x, y, w, h, max) => {
      const L = wrap(ALL[i][0], max), ty = y + h / 2 - ((L.length - 1) * 13) / 2 + 4;
      return `<g class="f67-bx${i === sel ? ' on' : ''}" data-i="${i}" tabindex="0" role="button" aria-pressed="${i === sel}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text class="f67-lb" x="${x + w / 2}" y="${ty}" text-anchor="middle">${L.map((s, k) => `<tspan x="${x + w / 2}" dy="${k ? 13 : 0}">${esc(s)}</tspan>`).join('')}</text></g>`;
    };
    const render = (n) => {
      let s;
      if (!n) {
        s = svgOpen(640, 280, 'Böbreğin işlevleri: solda kan bileşiminin homeostazı (beş işlev), sağda endokrin roller (üç işlev)');
        s += `<path class="f67-ln" d="M320,46 L320,56 L209,56 L209,66 M320,56 L529,56 L529,66"/>`;
        s += `<rect class="f67-hd" x="260" y="6" width="120" height="40" rx="12"/>${bean(284, 26)}${txt(334, 31, 'Böbrek', 'b', 'middle')}`;
        s += `<rect class="f67-gr a" x="8" y="66" width="402" height="26" rx="8"/>${txt(209, 83, 'Kan bileşiminin homeostazı', 'b', 'middle')}`;
        s += `<rect class="f67-gr b" x="426" y="66" width="206" height="26" rx="8"/>${txt(529, 83, 'Endokrin roller', 'b', 'middle')}`;
        HOM.forEach((_, i) => { s += box(i, 8 + (i % 3) * 138, 104 + Math.floor(i / 3) * 62, 126, 54, 20); });
        END.forEach((_, i) => { s += box(5 + i, 426, 104 + i * 58, 206, 50, 33); });
      } else {
        s = svgOpen(360, 482, 'Böbreğin işlevleri: kan bileşiminin homeostazı (beş işlev) ve endokrin roller (üç işlev)');
        s += `<rect class="f67-hd" x="120" y="4" width="120" height="34" rx="12"/>${bean(144, 21)}${txt(194, 26, 'Böbrek', 'b', 'middle')}`;
        s += `<path class="f67-ln" d="M180,38 L180,52"/><rect class="f67-gr a" x="8" y="52" width="344" height="24" rx="8"/>${txt(180, 68, 'Kan bileşiminin homeostazı', 'b', 'middle')}`;
        HOM.forEach((_, i) => { s += box(i, 8, 84 + i * 42, 344, 36, 54); });
        s += `<rect class="f67-gr b" x="8" y="304" width="344" height="24" rx="8"/>${txt(180, 320, 'Endokrin roller', 'b', 'middle')}`;
        END.forEach((_, i) => { s += box(5 + i, 8, 336 + i * 46, 344, 40, 54); });
      }
      stage.innerHTML = s + '</svg>';
    };
    el.innerHTML = '<div class="f67-stage"></div>';
    const stage = el.firstChild;
    const pick = (i) => { sel = sel === i ? -1 : i; render(el.classList.contains('f67-n')); const c = el.closest('.viz').querySelector('.viz-cap'); if (sel < 0) c.innerHTML = cap0; else say(el, ALL[sel][1]); };
    const h = (e) => { const g = e.target.closest('.f67-bx'); if (g) onAct(e, () => { const i = +g.dataset.i; pick(i); const b = stage.querySelector(`[data-i="${i}"]`); if (e.type === 'keydown' && b) b.focus(); }); };
    el.addEventListener('click', h); el.addEventListener('keydown', h);
    const off = resp(el, render);
    return () => { off(); el.removeEventListener('click', h); el.removeEventListener('keydown', h); };
  };

  /* ---------- 2 · Kesit, kılıflar ve büyük damarlar ---------- */
  VIZ.f67_anatomi = (el) => {
    let mod = 'kesit', sel = '';
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    const CAP = {
      kesit: cap0,
      kaliks: '<b>Toplayıcı sistem.</b> Toplayıcı kanallar minör kalikslere açılır; minör kaliksler majör kaliksleri, onlar renal pelvisi yapar, pelvis üretere devam eder. [[K1 s. 307]]',
      hilus: '<b>Hilus.</b> İç bükey medial kenarın ortasında; sinirler, damarlar ve lenfatikler buradan girer. [[K1 s. 307]]',
      kilif: '<b>Kılıflar.</b> İçten dışa: renal kapsül, perirenal yağ, renal fasya, pararenal yağ. Böbrek T12–L3 düzeyinde, retroperitonealdir. [[K1 s. 307]]',
      damar: '<b>Damarlar.</b> Renal arterler doğrudan aortadan çıkar; aorta orta hattın biraz solunda olduğu için sağ renal arter daha uzundur. Renal venler doğrudan IVC\'ye açılır; IVC sağda olduğu için sol renal ven daha uzundur. [[K1 s. 307]]',
    };
    const REG = { cortex: 'kesit', medulla: 'kesit', column: 'kesit', minor: 'kaliks', major: 'kaliks', pelvis: 'kaliks', ureter: 'kaliks', hilus: 'hilus' };
    const C = [30, 22], ANG = [-125, -80, -35, 40, 85, 135, 185];
    const pol = (r, a) => [C[0] + r * Math.cos((a * Math.PI) / 180), C[1] + r * Math.sin((a * Math.PI) / 180)];
    const f = (p) => p.map((v) => v.toFixed(1)).join(',');
    const kesit = (n) => {
      const tx = n ? 92 : 170, ty = 145, sc = n ? 0.56 : 0.95, lx = n ? 208 : 392;
      const P = (x, y) => [tx + sc * x, ty + sc * y];
      let s = svgOpen(n ? 360 : 640, n ? 300 : 300, 'Böbrek kesiti: korteks, medulla, renal kolon, kalikslar, pelvis, üreter ve hilus') + `<defs><clipPath id="f67-an-clip"><path d="${BEAN}" transform="scale(.8)"/></clipPath></defs>`;
      s += `<g transform="translate(${tx} ${ty}) scale(${sc})">`;
      s += `<path class="f67-r cortex f67-fill-basic${sel === 'cortex' ? ' on' : ''}" data-r="cortex" d="${BEAN}" stroke-width="3"/>`;
      s += `<g clip-path="url(#f67-an-clip)" class="f67-r medulla${sel === 'medulla' ? ' on' : ''}" data-r="medulla">`;
      ANG.forEach((a) => { s += `<polygon class="f67-fill-clin" stroke-width="2" points="${f(pol(26, a))} ${f(pol(190, a - 9))} ${f(pol(190, a + 9))}"/>`; });
      s += '</g>';
      s += `<g class="f67-r column${sel === 'column' ? ' on' : ''}" data-r="column"><circle cx="81" cy="-58" r="9" fill="none" stroke-dasharray="3 3" stroke-width="2"/></g>`;
      // toplayıcı sistem
      const maj = [-100, 150, 40].map((a) => pol(16, a));
      s += `<g class="f67-r major${sel === 'major' ? ' on' : ''}" data-r="major">`;
      ANG.forEach((a) => { const m = maj.reduce((b, q) => (Math.hypot(q[0] - pol(36, a)[0], q[1] - pol(36, a)[1]) < Math.hypot(b[0] - pol(36, a)[0], b[1] - pol(36, a)[1]) ? q : b)); s += `<path d="M${f(pol(36, a))} L${f(m)}" class="f67-calx" stroke-width="3"/>`; });
      maj.forEach((q) => { s += `<circle cx="${q[0]}" cy="${q[1]}" r="9" class="f67-fill-warn" stroke-width="2.5"/>`; });
      s += '</g>';
      s += `<g class="f67-r minor${sel === 'minor' ? ' on' : ''}" data-r="minor">${ANG.map((a) => `<circle cx="${pol(36, a)[0]}" cy="${pol(36, a)[1]}" r="6" class="f67-fill-warn" stroke-width="2"/>`).join('')}</g>`;
      s += `<path class="f67-r pelvis f67-fill-warn${sel === 'pelvis' ? ' on' : ''}" data-r="pelvis" stroke-width="2.5" d="M${f(pol(14, -90))} L84,12 L84,34 L${f(pol(14, 90))} Z"/>`;
      s += `<path class="f67-r ureter${sel === 'ureter' ? ' on' : ''}" data-r="ureter" fill="none" stroke-width="7" stroke-linecap="round" d="M80,23 L125,24 C150,26 155,40 155,70 L155,150"/>`;
      s += `<g class="f67-r hilus${sel === 'hilus' ? ' on' : ''}" data-r="hilus"><ellipse cx="96" cy="24" rx="30" ry="46" fill="none" stroke-dasharray="4 4" stroke-width="2.5"/></g>`;
      s += `<g class="f67-ln thin"><path d="M150,-10 L90,10 M150,4 L96,16 M150,48 L94,36" fill="none"/></g>`;
      s += '</g>';
      const lbl = [['cortex', 'Korteks', -40, -112], ['medulla', 'Medulla', -33, -68], ['column', 'Renal kolon', 81, -58], ['minor', 'Minör kaliks', 36, -13], ['major', 'Majör kaliks', 20, -12], ['pelvis', 'Renal pelvis', 60, 23], ['hilus', 'Hilus', 118, 50], ['ureter', 'Üreter', 155, 100]];
      const ly = n ? [28, 56, 84, 112, 140, 168, 196, 224] : [24, 56, 88, 120, 152, 184, 216, 248];
      lbl.forEach((l, i) => {
        const p = P(l[2], l[3]), y = ly[i];
        s += `<g class="f67-r f67-tl${sel === l[0] ? ' on' : ''}" data-r="${l[0]}" tabindex="0" role="button" aria-pressed="${sel === l[0]}" aria-label="${l[1]}"><path class="f67-ln thin" d="M${p[0].toFixed(1)},${p[1].toFixed(1)} L${lx - 4},${y - 4}" fill="none"/><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" class="f67-dot-p"/><text class="f67-lb" x="${lx}" y="${y}">${l[1]}</text></g>`;
      });
      s += txt(n ? 8 : 8, n ? 290 : 292, 'Hastanın sağ böbreği, önden kesit', 'm s');
      return s + '</svg>';
    };
    const kilif = (n) => {
      const cx = n ? 100 : 175, cy = 150, sc = n ? 0.4 : 0.6;
      const lay = [[1.85, 'f67-fill-warn lite', 'Pararenal yağ', 1.62], [1.5, 'f67-fascia', 'Renal fasya', 1.5], [1.4, 'f67-fill-warn', 'Perirenal yağ', 1.2], [1.05, 'f67-capsule', 'Renal kapsül', 1.05]];
      let s = svgOpen(n ? 360 : 640, 300, 'Böbrek ve dört kılıfı: renal kapsül, perirenal yağ, renal fasya, pararenal yağ; T12–L3 düzeyi') + `<defs><clipPath id="f67-an-clip2"><path d="${BEAN}" transform="scale(.8)"/></clipPath></defs>`;
      s += `<g transform="translate(${cx} ${cy}) scale(${sc})">`;
      lay.forEach((l) => { s += `<path class="${l[1]}" d="${BEAN}" transform="scale(${l[0]})" vector-effect="non-scaling-stroke"/>`; });
      s += `<path class="f67-fill-basic f67-capsule" d="${BEAN}" vector-effect="non-scaling-stroke"/><g clip-path="url(#f67-an-clip2)">${ANG.map((a) => `<polygon class="f67-fill-clin" stroke-width="1.5" points="${f(pol(26, a))} ${f(pol(190, a - 9))} ${f(pol(190, a + 9))}"/>`).join('')}</g></g>`;
      const nums = [[1.05, 'Renal kapsül'], [1.2, 'Perirenal yağ'], [1.5, 'Renal fasya'], [1.62, 'Pararenal yağ']];
      nums.forEach((q, i) => {
        const x = cx - sc * 150 * q[0] * 0.78, y = cy - sc * 125 * q[0] * 0.78;
        s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8.5" class="f67-num"/><text class="f67-lb b c-ink" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle">${i + 1}</text>`;
        const ly = 70 + i * 32, lx = n ? 195 : 345;
        s += `<circle cx="${lx}" cy="${ly - 4}" r="8.5" class="f67-num"/><text class="f67-lb b c-ink" x="${lx}" y="${ly}" text-anchor="middle">${i + 1}</text>${txt(lx + 16, ly, q[1], '')}`;
      });
      s += `<path class="f67-ln" d="M${cx - 150 * sc * 1.85 - 6},262 L${cx + 150 * sc * 1.85 + 6},262" marker-end="url(#f67-an-m)"/>`;
      s = s.replace('<defs>', `<defs><marker id="f67-an-m" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M1 1L9 5L1 9z" style="fill:var(--muted)"/></marker>`);
      s += txt(cx, 286, 'dıştan içe ← sıra: 4 → 1', 'm s', 'middle');
      // omurga
      const sx = n ? 300 : 540;
      ['T12', 'L1', 'L2', 'L3'].forEach((v, i) => { s += `<rect class="f67-vert" x="${sx}" y="${48 + i * 42}" width="${n ? 46 : 62}" height="34" rx="8"/>${txt(sx + (n ? 23 : 31), 70 + i * 42, v, 'b', 'middle')}`; });
      s += `<path class="f67-ln acc" d="M${sx - 8},50 L${sx - 14},50 L${sx - 14},210 L${sx - 8},210" fill="none"/>${txt(sx - 18, n ? 262 : 128, 'Böbrek', 'a s', 'end')}`;
      s += `${txt(sx - 18, n ? 275 : 142, 'T12–L3', 'a s', 'end')}${txt(sx + (n ? 23 : 31), 236, 'Retroperitoneal', 'm s', 'middle')}`;
      return s + '</svg>';
    };
    const damar = (n) => {
      const k = n ? 0.5625 : 1, X = (x) => (x * k).toFixed(1);
      const D = (d) => sp(d, k);
      let s = svgOpen(n ? 360 : 640, 300, 'Önden görünüş: aorta ve IVC, iki böbrek, renal arterler ve venler; sağ renal arter ve sol renal ven daha uzundur') + defs('f67-an');
      s += `<path class="f67-ln dash" d="${D('M320,28 L320,282')}"/>${txt(+X(320), 18, 'Orta hat', 'm s', 'middle')}`;
      s += txt(4, 18, n ? 'Hastanın sağı' : 'Hastanın sağı', 'm s') + txt(n ? 356 : 636, 18, 'Hastanın solu', 'm s', 'end');
      // böbrekler
      [[150, 1], [490, -1]].forEach(([x, g]) => { s += `<g transform="translate(${X(x)} 150) scale(${g * (n ? 0.2 : 0.3)} ${n ? 0.2 : 0.3})"><path class="f67-fill-basic" d="${BEAN}" stroke-width="4"/></g>`; });
      s += txt(+X(150), 232, 'Sağ böbrek', 'm s', 'middle') + txt(+X(490), 232, 'Sol böbrek', 'm s', 'middle');
      // arterler (IVC ve aortanın arkasından / önünden)
      s += `<path class="f67-vsl a" d="${D('M336,112 C320,88 230,92 188,142')}" marker-end="url(#f67-an-c)"/>`;
      s += `<path class="f67-vsl a" d="${D('M343,110 C390,104 420,118 452,142')}" marker-end="url(#f67-an-c)"/>`;
      s += `<path class="f67-vsl a" style="stroke-dasharray:4 4;stroke-width:2" d="${D('M343,196 C380,246 440,246 470,208')}" marker-end="url(#f67-an-c)"/>`;
      // aorta
      s += `<rect class="f67-aorta" x="${X(330)}" y="30" width="${n ? 9 : 16}" height="252" rx="5"/>`;
      // sol renal ven aortanın önünden
      s += `<path class="f67-vsl v" d="${D('M456,178 C420,190 370,186 312,178')}" marker-end="url(#f67-an-a)"/>`;
      s += `<path class="f67-vsl v" d="${D('M186,180 L292,178')}" marker-end="url(#f67-an-a)"/>`;
      // IVC
      s += `<rect class="f67-ivc" x="${X(292)}" y="30" width="${n ? 12 : 22}" height="252" rx="6"/>`;
      s += txt(+X(344) + 4, 44, 'Aorta', 'b c-crit', 'start') + txt(+X(292) - 4, 44, 'IVC', 'b a', 'end');
      if (!n) {
        s += txt(150, 70, 'Sağ renal arter', 'c-crit s', 'start') + txt(150, 83, 'daha uzun', 'c-crit s', 'start') + txt(402, 100, 'Sol renal arter', 'c-crit s');
        s += txt(372, 166, 'Sol renal ven: daha uzun', 'a s') + txt(196, 200, 'Sağ renal ven', 'a s');
        s += txt(410, 262, 'Aksesuar arter (bazen)', 'm s');
      } else {
        s += txt(8, 72, 'Sağ renal arter:', 'c-crit s') + txt(8, 85, 'daha uzun', 'c-crit s');
        s += txt(352, 72, 'Sol renal arter', 'c-crit s', 'end');
        s += txt(352, 212, 'Sol renal ven:', 'a s', 'end') + txt(352, 225, 'daha uzun', 'a s', 'end') + txt(8, 200, 'Sağ renal ven', 'a s');
        s += txt(352, 275, 'Aksesuar arter (bazen)', 'm s', 'end');
      }
      return s + '</svg>';
    };
    el.innerHTML = `<div class="f67-ctlrow"><div class="seg" role="group" aria-label="Görünüm">${[['kesit', 'Kesit'], ['kilif', 'Kılıflar'], ['damar', 'Damarlar']].map(([v, l]) => `<button type="button" data-m="${v}" aria-pressed="${v === mod}">${l}</button>`).join('')}</div></div><div class="f67-stage"></div>`;
    const stage = el.querySelector('.f67-stage');
    const render = (n) => { stage.innerHTML = mod === 'kesit' ? kesit(n) : mod === 'kilif' ? kilif(n) : damar(n); };
    const capSet = () => { const c = el.closest('.viz').querySelector('.viz-cap'); c.innerHTML = mod === 'kesit' ? (sel ? REF(CAP[REG[sel]] === CAP.kesit ? CAP.kesit : CAP[REG[sel]]) : CAP.kesit) : REF(CAP[mod]); };
    const h = (e) => {
      const m = e.target.closest('[data-m]');
      if (m && e.type === 'click') { mod = m.dataset.m; sel = ''; el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mod))); render(el.classList.contains('f67-n')); capSet(); return; }
      const r = e.target.closest('[data-r]');
      if (r && mod === 'kesit') onAct(e, () => { const v = r.dataset.r; sel = sel === v ? '' : v; render(el.classList.contains('f67-n')); capSet(); if (e.type === 'keydown') { const g = stage.querySelector(`.f67-tl[data-r="${v}"]`); if (g) g.focus(); } });
    };
    el.addEventListener('click', h); el.addEventListener('keydown', h);
    const off = resp(el, render);
    return () => { off(); el.removeEventListener('click', h); el.removeEventListener('keydown', h); };
  };

  /* ---------- 3 · Süzüntünün ve kanın yolu ---------- */
  VIZ.f67_nefron = (el) => {
    const FS = [
      '<b>1 · Glomerül.</b> Kortekste, plazmayı süzen kapiller yumağı; süzüntü Bowman kapsülünde toplanır. [[K1 s. 307]]',
      '<b>2 · PCT.</b> Kortekste kıvrılan tübül; süzülen maddelerin çoğu burada geri emilir. [[K1 s. 307]]',
      '<b>3 · Henle kulpu.</b> Tübül düzleşip medullaya ince inen kol olarak girer, saç tokası dönüşü yapar, ince sonra kalın çıkan kol olarak döner. Görevi medullada uzunlamasına ozmotik gradyan kurmaktır. [[K1 s. 307]]',
      '<b>4 · DCT.</b> Kalın çıkan kol kortekse dönüp DCT olur; denetlenen geri emilimin yeridir. DCT kendi glomerülüne değer: JGA burada. [[K1 s. 307–308]]',
      '<b>5 · Toplayıcı kanal.</b> DCT toplayıcı kanala, o da minör kalikse açılır. Medüller gradyan sayesinde burada denetlenen su geri emilimi olur. [[K1 s. 307]]',
    ];
    const BS = [
      '<b>1 · Afferent arteriyol.</b> Renal arter ağacı olağan biçimde dallanıp afferent arteriyolleri verir; bunlar glomerül kapillerlerine ayrılır. [[K1 s. 308]]',
      '<b>2 · Efferent arteriyol.</b> Glomerül kapilleri yeniden birleşip efferent arteriyolü yapar. Afferent ve efferent direncinin oranı glomerül basıncını, dolayısıyla GFR\'yi ayarlar (Bölüm 68). [[K1 s. 308]]',
      '<b>3 · Vasa recta.</b> Efferent arteriyolden çıkar ve medullayı besler; kulpla ters yönde akar (karşı akım, Bölüm 69). [[K1 s. 308]]',
      '<b>4 · Sonuç.</b> Korteks iyi, medulla zayıf kanlanır; zayıf medüller akım su geri emilimi için gereken solütlerin yıkanmasını önler. [[K1 s. 308]]',
    ];
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    let mode = 'f', sx = 1, parts = [];
    // yerel (geniş) koordinatlar; dar çizimde x * sx
    const T = {
      aff: 'M22,30 L100,68', eff: 'M124,68 C150,36 200,28 322,28 L322,200',
      gl: 'M100,86 C100,100 106,112 110,125',
      pct: 'M110,125 C90,140 70,150 90,160 C110,172 140,150 150,168 C160,185 190,170 200,185 L250,200',
      lohd: 'M250,200 L250,350', lohh: 'M250,350 C250,375 300,375 300,350', lohta: 'M300,350 L300,300', lohtk: 'M300,300 L300,150',
      dct: 'M300,150 C300,125 250,118 195,102 C170,94 152,86 140,78 C190,66 270,66 340,70 C410,74 450,95 480,112',
      cd: 'M480,112 L480,395',
      vr: 'M322,200 L322,370 C322,396 228,396 228,370 L228,230',
    };
    const FSEG = [[T.gl], [T.pct], [T.lohd, T.lohh, T.lohta, T.lohtk], [T.dct], [T.cd]];
    const BSEG = [[T.aff], [T.eff], [T.vr], [T.aff, T.eff, T.vr]];
    const tube = (d, w, cls, key, idx) => `<g class="f67-tb ${cls}" data-${key}="${idx}"><path class="o" d="${sp(d, sx)}" stroke-width="${w + 3}"/><path class="i" d="${sp(d, sx)}" stroke-width="${w - 1}"/></g>`;
    let host, stage, st, partG;
    const build = (n) => {
      sx = n ? 0.5625 : 1; const H = n ? 430 : 420, W = n ? 360 : 640;
      const gx = 110 * sx;
      let s = svgOpen(W, H, 'Tek nefron: glomerül, PCT, Henle kulpu, DCT ve toplayıcı kanal; kan yolu: afferent, efferent arteriyol ve vasa recta') + defs('f67-ne');
      s += `<rect class="f67-zone cx" x="0" y="0" width="${W}" height="200"/><rect class="f67-zone om" x="0" y="200" width="${W}" height="110"/><rect class="f67-zone im" x="0" y="310" width="${W}" height="${H - 310}"/>`;
      s += `<path class="f67-ln dash" d="M0,200 L${W},200"/>`;
      s += txt(6, 192, 'Renal korteks', 'm s') + txt(6, 218, 'Dış medulla', 'm s') + txt(6, 326, 'İç medulla', 'm s');
      // kan
      s += tube(T.aff, 7, 'bl', 'b', 0) + tube(T.eff, 5, 'bl', 'b', 1) + tube(T.vr, 5, 'bl', 'b', 2);
      // süzüntü yolu
      s += tube(T.pct, 9, 'fl', 'f', 1) + tube(T.lohd, 4, 'fl', 'f', 2) + tube(T.lohh, 4, 'fl', 'f', 2) + tube(T.lohta, 4, 'fl', 'f', 2) + tube(T.lohtk, 8, 'fl', 'f', 2) + tube(T.dct, 7, 'fl', 'f', 3) + tube(T.cd, 10, 'fl', 'f', 4);
      // glomerül
      s += `<g class="f67-gl" data-f="0" data-b="1"><circle class="bow" cx="${gx}" cy="95" r="${n ? 25 : 31}"/><circle class="co" cx="${gx - 8}" cy="91" r="9"/><circle class="co" cx="${gx + 8}" cy="93" r="9"/><circle class="co" cx="${gx}" cy="104" r="9"/></g>`;
      s += `<circle class="f67-jga" cx="${(140 * sx).toFixed(1)}" cy="78" r="4.5"/>`;
      // sonuç kutusu (kan yolu 4)
      s += `<g class="f67-sonuc" data-show="b3"><rect class="f67-box" x="6" y="${n ? 244 : 236}" width="${n ? 112 : 184}" height="${n ? 118 : 84}" rx="8"/>${txt(14, (n ? 244 : 236) + 17, 'mL/100 g/dk', 'm s')}`;
      [['Glomerül', 500], ['Dış medulla', 100], ['İç medulla', 20]].forEach((r, i) => { const y0 = (n ? 244 : 236) + 22 + i * (n ? 31 : 20), bw = (n ? 96 : 110) * r[1] / 500; s += n ? `${txt(14, y0 + 11, r[0] + ' ' + r[1], 's')}<rect class="f67-bar" x="14" y="${y0 + 15}" width="${Math.max(3, bw).toFixed(1)}" height="7" rx="3"/>` : `${txt(14, y0 + 11, r[0], 's')}<rect class="f67-bar" x="82" y="${y0 + 2}" width="${Math.max(3, bw).toFixed(1)}" height="10" rx="3"/>${txt(86 + Math.max(3, bw), y0 + 11, r[1], 's')}`; });
      s += '</g>';
      // etiketler
      const L = n
        ? [['Glomerül', 8, 150, 'start', 'f0'], ['PCT', 62, 164, 'start', 'f1'], ['LOH', 120, 214, 'end', 'f2'], ['DCT', 190, 82, 'start', 'f3'], ['CD', 276, 250, 'start', 'f4'], ['Aff.', 14, 22, 'start', 'b0'], ['Eff.', 98, 22, 'start', 'b1'], ['Vasa recta', 128, 422, 'middle', 'b2'], ['JGA', 84, 132, 'start', 'j']]
        : [['Glomerül', 54, 136, 'middle', 'f0'], ['PCT', 150, 188, 'start', 'f1'], ['Henle kulpu', 334, 262, 'start', 'f2'], ['DCT', 350, 62, 'start', 'f3'], ['Toplayıcı kanal', 494, 260, 'start', 'f4'], ['Afferent arteriyol', 14, 20, 'start', 'b0'], ['Efferent arteriyol', 190, 20, 'start', 'b1'], ['Vasa recta', 275, 412, 'middle', 'b2'], ['JGA', 150, 130, 'start', 'j']];
      L.forEach((l) => { s += `<text class="f67-lb f67-tg s" data-lb="${l[4]}" x="${l[1]}" y="${l[2]}" text-anchor="${l[3]}">${l[0]}</text>`; });
      s += txt(n ? 276 : 490, n ? 420 : 412, 'Minör kalikse / idrar ↓', 'm s', n ? 'start' : 'start');
      s += txt(n ? 178 : 330, n ? 238 : 224, 'Karşı akım', 'm s', 'middle', 0, 13, ' data-show="b2"');
      s += '<g class="f67-parts"></g>';
      return s + '</svg>';
    };
    const paint = () => {
      const i = st.i, key = mode, svg = stage.querySelector('svg');
      svg.querySelectorAll('[data-f],[data-b]').forEach((g) => {
        const on = (mode === 'f' && g.dataset.f !== undefined && +g.dataset.f === i) || (mode === 'b' && g.dataset.b !== undefined && (i === 3 ? true : +g.dataset.b === i));
        g.classList.toggle('on', on); g.classList.toggle('dim', !on);
      });
      svg.querySelectorAll('[data-lb]').forEach((t) => { const c = t.dataset.lb, on = c === 'j' ? (mode === 'f' && i === 3) : (c[0] === mode && (mode === 'f' ? +c[1] === i : (i === 3 || +c[1] === i))); t.classList.toggle('on', on); });
      svg.querySelectorAll('[data-show]').forEach((g) => { g.style.display = (g.dataset.show === 'b3' && mode === 'b' && i === 3) || (g.dataset.show === 'b2' && mode === 'b' && (i === 2)) ? '' : 'none'; });
      partG = svg.querySelector('.f67-parts'); partG.innerHTML = '';
      parts = [];
      if (RM) return;
      const paths = key === 'f' ? FSEG[i] : BSEG[i];
      paths.forEach((d, pi) => {
        const m = document.createElementNS('http://www.w3.org/2000/svg', 'path'); m.setAttribute('d', sp(d, sx)); const len = m.getTotalLength();
        const sparse = key === 'b' && i === 3 && d === T.vr;
        const dens = key === 'b' && i === 3 && d !== T.vr ? 34 : sparse ? 150 : 46;
        const cnt = Math.max(2, Math.round(len / dens));
        for (let k = 0; k < cnt; k++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '3'); c.setAttribute('class', 'f67-pt ' + (key === 'f' ? 'fl' : 'bl')); partG.appendChild(c); parts.push({ m, len, c, o: (k / cnt) * len }); }
      });
    };
    const go = (i) => {
      say(el, (mode === 'f' ? FS : BS)[i]);
      paint();
      if (RM) return;
    };
    el.innerHTML = `<div class="f67-ctlrow"><div class="seg" role="group" aria-label="Yol"><button type="button" data-m="f" aria-pressed="true">Süzüntü yolu</button><button type="button" data-m="b" aria-pressed="false">Kan yolu</button></div></div><div class="f67-stage"></div>${stepHtml()}`;
    stage = el.querySelector('.f67-stage');
    st = stepper(el, { total: () => (mode === 'f' ? 5 : 4), go });
    let t0 = 0;
    const onMode = (e) => {
      const b = e.target.closest('[data-m]'); if (!b) return;
      mode = b.dataset.m; el.querySelectorAll('[data-m]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); st.reset();
    };
    el.addEventListener('click', onMode);
    const off = resp(el, (n) => { stage.innerHTML = build(n); paint(); });
    st.redraw();
    const tk = ticker(el, (dt) => {
      st.tick(dt); t0 += dt;
      parts.forEach((p) => { const q = p.m.getPointAtLength((p.o + t0 * 40) % p.len); p.c.setAttribute('cx', q.x.toFixed(1)); p.c.setAttribute('cy', q.y.toFixed(1)); });
    });
    // ilk açıklama sayfada zaten yazılı
    return () => { tk(); off(); st.off(); el.removeEventListener('click', onMode); };
  };

  /* ---------- 4 · Jukstaglomerüler aygıt ---------- */
  VIZ.f67_jga = (el) => {
    const INF = {
      gr: '<b>Granüler hücreler.</b> Afferent arteriyol duvarındadır ve renin salgılar. [[K1 s. 308]]',
      md: '<b>Makula densa.</b> DCT ile LOH\'un kalın çıkan kolunun birleşim yerindedir; tübüler Na⁺ ve Cl⁻ derişimini algılar. [[K1 s. 308]]',
      eg: '<b>Ekstraglomerüler mezangiyal hücreler.</b> Makula densayla pürinerjik sinyalle etkileşir; granüler hücreleri ve afferent arteriyol düz kasını denetler. JGA böylece RBF ve GFR\'yi düzenler. [[K1 s. 308–309]]',
    };
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    let sel = '', flow = [];
    el.innerHTML = `<div class="f67-ctlrow"><div class="seg" role="group" aria-label="JGA bileşeni">${[['gr', 'Granüler hücreler'], ['md', 'Makula densa'], ['eg', 'Ekstraglomerüler mezangiyal']].map(([v, l]) => `<button type="button" data-p="${v}" aria-pressed="false">${l}</button>`).join('')}</div></div><div class="f67-stage"></div>`;
    const stage = el.querySelector('.f67-stage');
    const draw = (n) => {
      const k = n ? 0.56 : 1;
      let s = svgOpen(640 * (n ? 0.5625 : 1), n ? 290 : 340, 'Jukstaglomerüler aygıt: glomerül, afferent ve efferent arteriyol, DCT içindeki makula densa, granüler hücreler ve ekstraglomerüler mezangiyal hücreler') + defs('f67-jg');
      s += `<g transform="scale(${k})">`;
      s += `<circle class="f67-bow" cx="130" cy="195" r="104"/>`;
      s += `<g class="f67-tuft">${[[105, 170], [150, 165], [175, 205], [140, 225], [100, 215], [130, 195]].map((c) => `<circle cx="${c[0]}" cy="${c[1]}" r="26"/>`).join('')}</g>`;
      s += `<g transform="translate(130 195)"><path class="f67-star" d="M0,-16 L4,-5 L15,-8 L8,1 L15,10 L4,7 L0,17 L-4,7 L-15,10 L-8,1 L-15,-8 L-4,-5Z"/></g>`;
      // afferent / efferent
      s += `<g class="f67-tb bl"><path class="o" d="M470,40 L205,132" stroke-width="27"/><path class="i" d="M470,40 L205,132" stroke-width="22"/></g>`;
      s += `<g class="f67-tb bl"><path class="o" d="M215,160 L470,265" stroke-width="18"/><path class="i" d="M215,160 L470,265" stroke-width="13"/></g>`;
      // DCT kesiti
      s += `<ellipse class="f67-dctc" cx="410" cy="170" rx="56" ry="48"/><ellipse class="f67-lum" cx="420" cy="170" rx="30" ry="26"/>`;
      // makula densa (sol duvar)
      s += `<g class="f67-md" data-p="md">${[-34, -18, -2, 14, 30].map((dy, i) => `<ellipse cx="${(362 + Math.abs(dy) * 0.12).toFixed(1)}" cy="${170 + dy}" rx="7" ry="9" transform="rotate(${dy * 0.6} 362 ${170 + dy})"/>`).join('')}</g>`;
      // EGMC
      s += `<g class="f67-eg" data-p="eg"><polygon points="252,136 342,126 346,194 246,166"/>${[[275, 142], [300, 150], [322, 160], [276, 160], [300, 175]].map((c) => `<circle cx="${c[0]}" cy="${c[1]}" r="6"/>`).join('')}</g>`;
      // granüler hücreler
      s += `<g class="f67-grc" data-p="gr">${[[262, 118], [284, 109], [306, 101], [328, 93]].map((c) => `<circle cx="${c[0]}" cy="${c[1]}" r="6.5"/>`).join('')}</g>`;
      // renin noktaları
      s += `<g class="f67-renin">${[0, 1, 2].map((i) => `<circle class="rn" data-i="${i}" cx="300" cy="86" r="2.6"/>`).join('')}</g>`;
      // oklar
      s += `<path class="f67-sig" d="M356,172 C340,168 335,164 326,164" marker-end="url(#f67-jg-b)"/>`;
      s += `<path class="f67-sig" d="M300,138 C300,130 300,126 300,116" marker-end="url(#f67-jg-b)"/>`;
      s += `<path class="f67-sig" d="M262,142 C245,135 245,128 252,120" marker-end="url(#f67-jg-b)"/>`;
      s += '</g>';
      const sc = (x, y) => [(x * k).toFixed(1), (y * k).toFixed(1)];
      if (!n) {
        s += txt(474, 22, 'Afferent arteriyol', 'b c-crit', 'start') + txt(484, 276, 'Efferent arteriyol', 'b c-crit', 'start');
        s += txt(480, 176, 'DCT', 'b w', 'start') + txt(300, 72, 'Granüler hücreler', 'b c-basic', 'start');
        s += txt(356, 110, 'Makula densa', 'b w', 'start') + `<path class="f67-ln thin" d="M362,114 L362,134"/>`;
        s += txt(250, 240, 'Ekstraglomerüler mezangiyal hücreler', 'b s c-basic', 'start', 22) + `<path class="f67-ln thin" d="M290,222 L292,184"/>`;
        s += txt(110, 82, 'Bowman kapsülü', 'm s', 'middle') + txt(130, 322, 'Glomerüler mezangiyal hücre (yıldız)', 'm s', 'middle') + `<path class="f67-ln thin" d="M130,305 L130,214"/>`;
        s += `<path class="f67-sig" d="M486,96 L520,96" marker-end="url(#f67-jg-b)"/>` + txt(526, 100, 'pürinerjik sinyal', 'c-basic s') + `<circle cx="490" cy="120" r="3.4" style="fill:var(--c-basic)"/>` + txt(526, 124, 'renin', 'c-basic s');
      } else {
        const m = (x, y, t, i) => { const p = sc(x, y); return `<circle class="f67-num" cx="${p[0]}" cy="${p[1]}" r="9"/><text class="f67-lb b c-ink" x="${p[0]}" y="${(+p[1] + 4).toFixed(1)}" text-anchor="middle">${t}</text>`; };
        s += m(300, 80, '1') + m(360, 232, '2') + m(260, 238, '3');
        s += txt(150 * k * 1.9, 18, 'Afferent', 'b c-crit', 'middle') + txt(270, 160, 'Efferent', 'b c-crit', 'end') + txt(250, 118, 'DCT', 'b w', 'middle');
        s += txt(8, 184, 'Bowman kapsülü', 'm s');
        s += `<g class="f67-key">${[['1', 'Granüler hücreler: renin', 'gr'], ['2', 'Makula densa: Na⁺, Cl⁻ algısı', 'md'], ['3', 'Ekstraglomerüler mezangiyal hücreler', 'eg']].map((r, i) => `<circle class="f67-num" cx="20" cy="${214 + i * 22}" r="8.5"/><text class="f67-lb b c-ink" x="20" y="${218 + i * 22}" text-anchor="middle">${r[0]}</text>${txt(36, 218 + i * 22, r[1], '')}`).join('')}</g>`;
      }
      return s + '</svg>';
    };
    const paint = () => {
      stage.querySelectorAll('[data-p]').forEach((g) => { g.classList.toggle('on', g.dataset.p === sel); g.classList.toggle('dim', !!sel && g.dataset.p !== sel); });
      stage.querySelectorAll('.f67-sig,.f67-renin').forEach((g) => g.classList.toggle('dim', !!sel && sel === 'gr' && g.classList.contains('f67-sig')));
      el.querySelectorAll('.seg [data-p]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === sel)));
    };
    const pick = (v) => { sel = sel === v ? '' : v; paint(); const c = el.closest('.viz').querySelector('.viz-cap'); if (sel) say(el, INF[sel]); else c.innerHTML = cap0; };
    const h = (e) => { const g = e.target.closest('[data-p]'); if (g) onAct(e, () => pick(g.dataset.p)); };
    el.addEventListener('click', h); el.addEventListener('keydown', h);
    const off = resp(el, (n) => { stage.innerHTML = draw(n); stage.querySelectorAll('svg [data-p]').forEach((g) => { g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); }); paint(); });
    let t = 0;
    const tk = ticker(el, (dt) => {
      if (RM) return; t += dt;
      stage.querySelectorAll('.rn').forEach((c, i) => { const f = ((t * 0.6 + i / 3) % 1); c.setAttribute('cx', (300 + f * 40).toFixed(1)); c.setAttribute('cy', (96 - f * 20).toFixed(1)); c.style.opacity = String(1 - f); });
    });
    return () => { tk(); off(); el.removeEventListener('click', h); el.removeEventListener('keydown', h); };
  };

  /* ---------- 5 · Otoregülasyon eğrisi ---------- */
  VIZ.f67_otoreg = (el) => {
    const gfr = (p) => (p <= 75 ? (p / 75) * 125 : p <= 165 ? 125 : 125 + ((p - 165) / 35) * 50);
    let oab = 100, touched = false, t = 0, parts = [];
    el.innerHTML = `<p class="f67-not">RBF ≈ 1000 mL/dk = kalp debisinin %20'si · böbrek vücut ağırlığının %1'i</p><div class="f67-stage"></div>
      <label class="f67-rng"><span>Ortalama arter basıncı (OAB)</span><b data-o>100 mmHg</b><input type="range" min="0" max="200" step="5" value="100" aria-label="Ortalama arter basıncı, mmHg" data-r></label>
      <dl class="kv f67-kv"><dt>Afferent arteriyol</dt><dd data-k="a"></dd><dt>Akım (RBF ve GFR)</dt><dd data-k="f"></dd><dt>Durum</dt><dd data-k="d"></dd></dl>`;
    const stage = el.querySelector('.f67-stage'), rng = el.querySelector('[data-r]');
    let geo = null;
    const build = (n) => {
      const W = n ? 360 : 640, H = n ? 340 : 320;
      const X0 = n ? 44 : 60, X1 = n ? 340 : 400, Y0 = n ? 214 : 270, Y1 = n ? 22 : 30;
      const X = (v) => X0 + (v / 200) * (X1 - X0), Y = (v) => Y0 - (v / 200) * (Y0 - Y1);
      geo = { X, Y, n, ty: n ? 296 : 150, tx0: n ? 20 : 440, tx1: n ? 270 : 560, gx: n ? 312 : 592 };
      let s = svgOpen(W, H, 'Otoregülasyon eğrisi: ortalama arter basıncı 75–165 mmHg arasında GFR yaklaşık 125 mL/dk ile sabit; sağda afferent arteriyol çapı') + defs('f67-ot');
      s += `<rect class="f67-okband" x="${X(75)}" y="${Y1}" width="${X(165) - X(75)}" height="${Y0 - Y1}"/>${txt((X(75) + X(165)) / 2, Y1 + 12, 'Otoregülasyon aralığı', 'a-ok s', 'middle')}`;
      [0, 50, 100, 125, 150, 200].forEach((v) => { s += `<path class="f67-grid" d="M${X0},${Y(v)} L${X1},${Y(v)}"/>${txt(X0 - 6, Y(v) + 4, v, 'm s', 'end')}`; });
      [0, 50, 75, 100, 150, 165, 200].forEach((v) => { s += `<path class="f67-grid" d="M${X(v)},${Y0} L${X(v)},${Y0 + 4}"/>${txt(X(v), Y0 + 16, v, 'm s', 'middle')}`; });
      s += `<path class="f67-axis" d="M${X0},${Y1} L${X0},${Y0} L${X1},${Y0}"/>`;
      s += txt((X0 + X1) / 2, Y0 + 32, 'Ortalama arter basıncı (mmHg)', 'm s', 'middle') + `<text class="f67-lb m s" transform="translate(${n ? 11 : 14} ${(Y0 + Y1) / 2}) rotate(-90)" text-anchor="middle">GFR (mL/dk)</text>`;
      s += `<path class="f67-curve" d="M${X(0)},${Y(0)} L${X(75)},${Y(125)} L${X(165)},${Y(125)} L${X(200)},${Y(175)}"/>`;
      s += `<g class="f67-gd"><path class="f67-guide" data-g="v"/><path class="f67-guide" data-g="h"/><circle class="f67-pt-h" r="8" data-g="c" tabindex="-1"/></g>${txt(X1 - 4, Y1 + 28, '', 'b', 'end', 0, 13, ' data-g="t"')}`;
      // arteriyol şeması
      const { ty, tx0, tx1, gx } = geo;
      s += `<g class="f67-art"><path class="f67-wallt" data-a="w" d="M${tx0},${ty} L${tx1},${ty}"/><path class="f67-lumt" data-a="l" d="M${tx0},${ty} L${tx1},${ty}"/><circle class="f67-glc" cx="${gx}" cy="${ty}" r="${n ? 26 : 28}"/><circle class="f67-glc2" cx="${gx - 7}" cy="${ty - 5}" r="9"/><circle class="f67-glc2" cx="${gx + 8}" cy="${ty + 3}" r="9"/></g>`;
      s += txt((tx0 + tx1) / 2, ty - (n ? 30 : 36), 'Afferent arteriyol', 'b c-crit', 'middle') + txt(gx, ty + (n ? 42 : 44), 'Glomerül', 'm s', 'middle');
      s += '<g class="f67-parts"></g>';
      return s + '</svg>';
    };
    const upd = () => {
      const g = geo, p = oab, gv = gfr(p), inr = p >= 75 && p <= 165;
      const svg = stage.querySelector('svg'); if (!svg) return;
      svg.querySelector('[data-g=v]').setAttribute('d', `M${g.X(p)},${g.Y(gv)} L${g.X(p)},${g.Y(0)}`);
      svg.querySelector('[data-g=h]').setAttribute('d', `M${g.X(0)},${g.Y(gv)} L${g.X(p)},${g.Y(gv)}`);
      const c = svg.querySelector('[data-g=c]'); c.setAttribute('cx', g.X(p)); c.setAttribute('cy', g.Y(gv));
      const tt = svg.querySelector('[data-g=t]'); tt.textContent = `GFR ≈ ${Math.round(gv)} mL/dk`; tt.setAttribute('class', 'f67-lb b ' + (inr ? 'a-ok' : 'c-crit'));
      const d = inr ? 8 + (22 * (165 - p)) / 90 : p < 75 ? 30 : 8;
      svg.querySelector('[data-a=w]').setAttribute('stroke-width', 38);
      svg.querySelector('[data-a=l]').setAttribute('stroke-width', d.toFixed(1));
      el.querySelector('[data-o]').textContent = p + ' mmHg';
      const kv = (k, v) => { el.querySelector(`[data-k=${k}]`).textContent = v; };
      kv('a', !inr ? (p < 75 ? 'en geniş (daha fazla genişleyemez)' : 'en dar (daha fazla daralamaz)') : p < 100 ? 'genişledi' : p === 100 ? 'bazal' : 'daraldı');
      kv('f', inr ? 'sabit' : p < 75 ? 'basınçla düşüyor' : 'basınçla artıyor');
      kv('d', inr ? 'otoregülasyon aralığında' : p < 75 ? 'aralığın altında: iskemi riski' : 'aralığın üstünde: basınç hasarı riski');
      el.querySelector('[data-r]').setAttribute('aria-valuetext', `${p} mmHg, GFR yaklaşık ${Math.round(gv)}`);
    };
    const cap = () => {
      const p = oab;
      if (p >= 75 && p <= 165) say(el, `<b>OAB ${p} mmHg.</b> Otoregülasyon aralığındasınız (75–165 mmHg); GFR yaklaşık 125 mL/dk'da sabit. Basınç yükseldikçe afferent arteriyol daralır, düştükçe genişler; akım değişmez. [[K1 s. 309]]`);
      else if (p < 75) say(el, `<b>OAB ${p} mmHg: aralığın altında.</b> Akım basınçla birlikte düşer. Çok düşük akım iskemi yapar; en çok zayıf kanlanan medulla ve metabolik olarak etkin PCT etkilenir, süzme azaldığı için toksik metabolitler birikir. [[K1 s. 309]]`);
      else say(el, `<b>OAB ${p} mmHg: aralığın üstünde.</b> Akım basınçla artar. Çok yüksek akım yüksek basınçla uç organ hasarı yapar; tübülde geri emilime zaman kalmaz: basınç diürezi. [[K1 s. 309]]`);
    };
    const mkParts = () => {
      const svg = stage.querySelector('svg'), pg = svg.querySelector('.f67-parts'); parts = [];
      if (RM) return;
      for (let i = 0; i < 9; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '3'); c.setAttribute('class', 'f67-pt bl'); pg.appendChild(c); parts.push({ c, o: i / 9 }); }
    };
    const onIn = () => { oab = +rng.value; touched = true; upd(); cap(); };
    rng.addEventListener('input', onIn);
    const off = resp(el, (n) => { stage.innerHTML = build(n); mkParts(); upd(); });
    const tk = ticker(el, (dt) => {
      if (RM || !geo) return; t += dt;
      const v = oab < 75 ? oab / 75 : oab > 165 ? 1 + (oab - 165) / 35 * 0.4 : 1, sp2 = 0.45 * v;
      const len = geo.tx1 - geo.tx0;
      parts.forEach((p) => { const f = (p.o + t * sp2) % 1; p.c.setAttribute('cx', (geo.tx0 + f * len).toFixed(1)); p.c.setAttribute('cy', geo.ty); });
    });
    return () => { tk(); off(); rng.removeEventListener('input', onIn); };
  };

  /* ---------- 6 · Afferent ve efferent tonus ---------- */
  VIZ.f67_arteriyol = (el) => {
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    let a = 1, e = 1, t = 0, parts = [], drops = [], geo = null;
    const calc = () => {
      const Ra = 0.5 + a, Re = 0.5 + e, base = (r) => r, f = (Ra_, Re_) => { const rbf = 1 / (Ra_ + Re_), P = Re_ / (Ra_ + Re_); return { rbf, P, gfr: Math.max(0, P - 0.35) * Math.pow(rbf, 0.2) }; };
      const b = f(1.5, 1.5), c = f(Ra, Re);
      return { rbf: (100 * c.rbf) / b.rbf, pgc: (100 * c.P) / b.P, gfr: (100 * c.gfr) / b.gfr };
    };
    const PRE = [['Bazal', 1, 1], ['Afferent daralma', 2, 1], ['Efferent daralma', 1, 2], ['İkisi birden', 2, 2]];
    el.innerHTML = `<div class="f67-ctlrow"><div class="seg" role="group" aria-label="Hazır durum">${PRE.map((p, i) => `<button type="button" data-pre="${i}" aria-pressed="${i === 0}">${p[0]}</button>`).join('')}</div></div>
      <div class="f67-two"><div class="f67-stage"></div><div class="f67-meters" role="group" aria-label="Bazala göre değişim">${[['rbf', 'RBF'], ['pgc', 'Glomerül basıncı'], ['gfr', 'GFR']].map(([k, l]) => `<div class="f67-m"><span class="t">${l}</span><span class="trk"><i class="fl" data-m="${k}"></i><u class="bs"></u></span><b class="ar" data-ar="${k}">→</b></div>`).join('')}<p class="f67-mn">Çubuk, bazal değere göre (orta çizgi); mutlak sayı yok.</p></div></div>
      <div class="f67-sl"><label class="f67-rng"><span>Afferent tonus</span><b data-o="a">bazal</b><input type="range" min="0" max="2" step="0.1" value="1" data-s="a" aria-label="Afferent arteriyol tonusu, 0 gevşek, 1 bazal, 2 daralmış"></label>
      <label class="f67-rng"><span>Efferent tonus</span><b data-o="e">bazal</b><input type="range" min="0" max="2" step="0.1" value="1" data-s="e" aria-label="Efferent arteriyol tonusu, 0 gevşek, 1 bazal, 2 daralmış"></label></div>`;
    const stage = el.querySelector('.f67-stage');
    const dia = (v) => (v <= 1 ? lerp(34, 20, v) : lerp(20, 7, v - 1));
    const build = (n) => {
      const W = n ? 360 : 440, H = n ? 230 : 250, k = W / 440;
      const y = 80, ax0 = 78 * k, ax1 = 190 * k, gx = 232 * k, ex0 = 275 * k, ex1 = 385 * k;
      geo = { y, ax0, ax1, gx, ex0, ex1, W, rx0: 6 * k, px1: W - 8 };
      let s = svgOpen(W, H, 'Afferent arteriyol, glomerül ve efferent arteriyol; tonus değişince kan akımı, glomerül basıncı ve süzüntü değişir') + defs('f67-ar');
      s += `<path class="f67-wallt" d="M${6 * k},${y} L${ax0},${y}" stroke-width="40"/><path class="f67-lumt" d="M${6 * k},${y} L${ax0},${y}" stroke-width="34"/>`;
      s += `<path class="f67-wallt" data-w="a" d="M${ax0},${y} L${ax1},${y}" stroke-width="40"/><path class="f67-lumt" data-l="a" d="M${ax0},${y} L${ax1},${y}"/>`;
      s += `<path class="f67-wallt" data-w="e" d="M${ex0},${y} L${ex1},${y}" stroke-width="40" style="stroke-width:34"/><path class="f67-lumt" data-l="e" d="M${ex0},${y} L${ex1},${y}"/>`;
      s += `<path class="f67-capt" d="M${ex1},${y} C${ex1 + 18},${y} ${ex1 + 14},${y - 24} ${W - 20 * k},${y - 24} M${ex1},${y} C${ex1 + 18},${y} ${ex1 + 14},${y + 22} ${W - 20 * k},${y + 22}"/>`;
      s += `<g class="f67-glom"><circle class="f67-bow" cx="${gx}" cy="${y}" r="36"/><circle class="f67-glc" data-g="p" cx="${gx}" cy="${y}" r="26"/><circle class="f67-glc2" cx="${gx - 8}" cy="${y - 5}" r="8"/><circle class="f67-glc2" cx="${gx + 8}" cy="${y + 4}" r="8"/></g>`;
      s += `<path class="f67-ln thin" d="M${gx},${y + 36} L${gx},${y + 100}" marker-end="url(#f67-ar-w)"/>`;
      s += txt(gx, y + 118, 'Tübüle süzüntü', 'w s', 'middle');
      s += txt(6 * k, y - 28, 'Renal arter', 'm s') + txt((ax0 + ax1) / 2, y - 28, 'Afferent', 'b c-crit', 'middle') + txt((ex0 + ex1) / 2, y - 28, 'Efferent', 'b c-crit', 'middle') + txt(W - 6, y + 52, 'Peritübüler kapiller → ven', 'a s', 'end');
      s += '<g class="f67-parts"></g>';
      return s + '</svg>';
    };
    const bars = () => {
      const r = calc();
      ['rbf', 'pgc', 'gfr'].forEach((kk) => {
        const v = clamp(r[kk], 0, 200), fl = el.querySelector(`[data-m=${kk}]`); fl.style.width = (v / 2) + '%';
        const dlt = r[kk] - 100, ar = el.querySelector(`[data-ar=${kk}]`);
        ar.textContent = dlt > 4 ? '↑' : dlt < -4 ? '↓' : '→'; ar.className = 'ar ' + (dlt > 4 ? 'up' : dlt < -4 ? 'dn' : '');
        fl.className = 'fl ' + (dlt > 4 ? 'up' : dlt < -4 ? 'dn' : '');
      });
      return r;
    };
    const upd = () => {
      const svg = stage.querySelector('svg'); if (!svg) return; const r = bars();
      svg.querySelector('[data-l=a]').setAttribute('stroke-width', dia(a).toFixed(1));
      svg.querySelector('[data-l=e]').setAttribute('stroke-width', dia(e).toFixed(1));
      const g = svg.querySelector('[data-g=p]'); g.style.fillOpacity = String(clamp(0.18 + (r.pgc / 200) * 0.9, 0.15, 1));
      el.querySelector('[data-o=a]').textContent = a < 0.95 ? 'gevşek' : a > 1.05 ? 'daralmış' : 'bazal';
      el.querySelector('[data-o=e]').textContent = e < 0.95 ? 'gevşek' : e > 1.05 ? 'daralmış' : 'bazal';
      el.querySelectorAll('.seg [data-pre]').forEach((b) => { const p = PRE[+b.dataset.pre]; b.setAttribute('aria-pressed', String(p[1] === a && p[2] === e)); });
      mk(r);
    };
    const mk = (r) => {
      const svg = stage.querySelector('svg'); if (!svg) return; const pg = svg.querySelector('.f67-parts'); pg.innerHTML = ''; parts = []; drops = [];
      if (RM) return;
      const nP = clamp(Math.round(r.rbf / 100 * 10), 2, 18), nD = clamp(Math.round(r.gfr / 100 * 5), 0, 10);
      for (let i = 0; i < nP; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '2.8'); c.setAttribute('class', 'f67-pt bl'); pg.appendChild(c); parts.push({ c, o: i / nP }); }
      for (let i = 0; i < nD; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '2.8'); c.setAttribute('class', 'f67-pt fl'); pg.appendChild(c); drops.push({ c, o: i / nD }); }
    };
    const say2 = () => {
      const c = el.closest('.viz').querySelector('.viz-cap'), mn = Math.min(a, e);
      if (Math.abs(a - 1) < 0.05 && Math.abs(e - 1) < 0.05) { c.innerHTML = cap0; return; }
      if (a >= 1.5 && e >= 1.5 && Math.abs(a - e) <= 0.2) say(el, '<b>İki arteriyol birlikte daraldı.</b> RBF belirgin düşer; glomerül basıncı ve GFR görece korunur. Ayrı denetim RBF ve GFR\'yi birbirinden bağımsız ayarlamayı sağlar. [[K1 s. 309]]');
      else if (mn < 1) say(el, '<b>Gevşeme.</b> Direnç azalır, RBF artar; afferent gevşeme glomerül basıncını yükseltir, efferent gevşeme düşürür. [[K1 s. 309]]');
      else if (a > e + 0.2) say(el, '<b>Afferent daralma.</b> Toplam renal direnç artar, RBF düşer; glomerüle gelen basınç düşer, GFR azalır. [[K1 s. 309]]');
      else if (e > a + 0.2) say(el, '<b>Efferent daralma.</b> Toplam direnç artar, RBF düşer; ama kan glomerülde birikir, glomerül basıncı ve GFR artar. [[K1 s. 309]]');
      else say(el, '<b>İki arteriyol de biraz daraldı.</b> Direnç artar, RBF düşer; iki direncin oranı değişmediği için glomerül basıncı ve GFR görece korunur. [[K1 s. 309]]');
    };
    const onIn = (ev) => { const s = ev.target.closest('[data-s]'); if (!s) return; if (s.dataset.s === 'a') a = +s.value; else e = +s.value; upd(); say2(); };
    const onClk = (ev) => { const b = ev.target.closest('[data-pre]'); if (!b) return; const p = PRE[+b.dataset.pre]; a = p[1]; e = p[2]; el.querySelector('[data-s=a]').value = a; el.querySelector('[data-s=e]').value = e; upd(); say2(); };
    el.addEventListener('input', onIn); el.addEventListener('click', onClk);
    const off = resp(el, (n) => { stage.innerHTML = build(n); upd(); });
    const tk = ticker(el, (dt) => {
      if (RM || !geo) return; t += dt; const r = calc(), v = 0.14 + 0.3 * (r.rbf / 100);
      const L = geo.px1 - geo.rx0;
      parts.forEach((p) => { const f = (p.o + t * v) % 1; p.c.setAttribute('cx', (geo.rx0 + f * L).toFixed(1)); p.c.setAttribute('cy', geo.y); });
      drops.forEach((d) => { const f = (d.o + t * 0.35) % 1; d.c.setAttribute('cx', geo.gx); d.c.setAttribute('cy', (geo.y + 38 + f * 56).toFixed(1)); });
    });
    return () => { tk(); off(); el.removeEventListener('input', onIn); el.removeEventListener('click', onClk); };
  };

  /* ---------- 7 · Miyojenik yanıt ve TGF ---------- */
  VIZ.f67_tgf = (el) => {
    const ART = [
      '<b>Miyojenik · 1.</b> Perfüzyon basıncı artar, afferent arteriyol gerilir. [[K1 s. 309]]',
      '<b>Miyojenik · 2.</b> Gerilme düz kastaki mekanik kapılı, seçici olmayan katyon kanallarını açar; katyonlar girer, membran depolarize olur. [[K1 s. 309]]',
      '<b>Miyojenik · 3.</b> Düz kas kasılır, çap küçülür, direnç artar: akım sabit kalır. [[K1 s. 309]]',
      '<b>TGF · 1.</b> Artan basınç glomerül basıncını ve filtrasyonu artırır; tübül akımı ve makula densaya ulaşan Na⁺ ve Cl⁻ artar. [[K1 s. 309–310]]',
      '<b>TGF · 2.</b> Makula densa Na⁺, K⁺ ve Cl⁻\'yi kendi Na⁺/K⁺/2Cl⁻ ko-transporteriyle alır; peşinden su girer, hücre GFR ile orantılı şişer. [[K1 s. 309–310]]',
      '<b>TGF · 3.</b> Şişmeyle orantılı olarak adenozin temelli bir ikincil haberci salınır. Olası kaynak: şişmeyi gidermek için bazolateral Na⁺/K⁺-ATPaz hızlanır, ATP azalır, ADP ve AMP artıp sızar. [[K1 s. 310]]',
      '<b>TGF · 4.</b> Haberci JGA\'daki adenozin A1 reseptörlerine bağlanır: afferent arteriyol daralır (RBF ↓), glomerüler mezangiyal hücreler kasılıp filtrasyon yüzeyini küçültür (GFR ↓), granüler hücrelerde renin salgısı baskılanır. [[K1 s. 310]]',
    ];
    const DUS = [
      '<b>Miyojenik.</b> Perfüzyon basıncı düşünce afferent arteriyol düz kası gevşer; direnç azalır, akım sabit kalır. [[K1 s. 309]]',
      '<b>TGF.</b> Filtrasyon ve makula densaya ulaşan Na⁺/Cl⁻ azalır; hücre daha az şişer, haberci azalır. [[K1 s. 309–310]]',
      '<b>Sonuç.</b> Afferent arteriyol genişler, mezangiyal hücreler gevşer, renin salınımı artar. [[K1 s. 310]]',
    ];
    // durum: lum = lümen yarıçapı, dep = depolarizasyon, ion: 0 az,1 normal,2 çok, sw = hücre şişliği, ad = adenozin, tg = hedef durumu (0 yok, 1 yanık)
    const SA = [{ l: 44, d: 0, i: 1, w: 1, ad: 0, tg: 0 }, { l: 44, d: 1, i: 1, w: 1, ad: 0, tg: 0 }, { l: 30, d: 0, i: 1, w: 1, ad: 0, tg: 0 }, { l: 30, d: 0, i: 2, w: 1, ad: 0, tg: 0 }, { l: 30, d: 0, i: 2, w: 1.22, ad: 0, tg: 0 }, { l: 30, d: 0, i: 2, w: 1.22, ad: 1, tg: 0 }, { l: 18, d: 0, i: 2, w: 1.22, ad: 1, tg: 1 }];
    const SD = [{ l: 44, d: 0, i: 1, w: 1, ad: 0, tg: 0 }, { l: 44, d: 0, i: 0, w: 0.85, ad: 0, tg: 0 }, { l: 50, d: 0, i: 0, w: 0.85, ad: 0, tg: 2 }];
    const TGT = [['Afferent arteriyol', 'daralır (RBF ↓)', 'genişler'], ['Glomerüler mezangiyal hücre', 'kasılır (GFR ↓)', 'gevşer'], ['Granüler hücre', 'renin ↓', 'renin ↑']];
    let mode = 'a', n = false, geo = null, parts = [], t = 0, st;
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    el.innerHTML = `<div class="f67-ctlrow"><div class="seg" role="group" aria-label="Basınç"><button type="button" data-m="a" aria-pressed="true">Basınç artışı</button><button type="button" data-m="d" aria-pressed="false">Basınç düşüşü</button></div></div><div class="f67-stage"></div>${stepHtml()}`;
    const stage = el.querySelector('.f67-stage');
    const S = () => (mode === 'a' ? SA : SD)[st ? st.i : 0];
    const build = (nn) => {
      n = nn; const W = n ? 360 : 640, H = n ? 530 : 360, k = n ? 0.82 : 1;
      const rc = n ? [100, 80] : [130, 120], R = 62 * k, gc = n ? [100, 205] : [130, 292];
      const lum = [n ? 252 : 98, n ? 292 : 140], lx0 = n ? 8 : 250, lx1 = n ? 352 : 500;
      const cx = n ? 180 : 410, cy0 = n ? 292 : 140; const cw = 160, ch = n ? 96 : 110;
      const tg = n ? [[6, 456], [124, 456], [242, 456]] : [[524, 20], [524, 106], [524, 192]];
      const tw = n ? 112 : 108, th = n ? 66 : 76;
      geo = { rc, R, gc, lum, lx0, lx1, cx, cy0, cw, ch, tg, tw, th, k, W, H, n };
      let s = svgOpen(W, H, 'Miyojenik yanıt ve tübüloglomerüler geri bildirim: afferent arteriyol duvarı, glomerül, makula densa hücresi ve jukstaglomerüler hedefler') + defs('f67-tg');
      s += `<g class="f67-vessel"><circle class="f67-wl" cx="${rc[0]}" cy="${rc[1]}" r="${R}"/><circle class="f67-lu" cx="${rc[0]}" cy="${rc[1]}" r="30" data-g="lu"/>`;
      for (let i = 0; i < 10; i++) { const a = (i / 10) * 6.283; s += `<path class="f67-cell" d="M${(rc[0] + 30 * Math.cos(a)).toFixed(1)},${(rc[1] + 30 * Math.sin(a)).toFixed(1)} L${(rc[0] + R * Math.cos(a)).toFixed(1)},${(rc[1] + R * Math.sin(a)).toFixed(1)}" data-g="sep" data-a="${a.toFixed(3)}"/>`; }
      s += `<rect class="f67-chan" x="${rc[0] - 9}" y="${rc[1] - R - 3}" width="18" height="12" rx="3" data-g="chan"/></g>`;
      s += txt(rc[0], rc[1] + R + 16, 'Afferent arteriyol (kesit)', 'b c-crit', 'middle') + txt(rc[0], rc[1] - R - 12, n ? 'katyon kanalı' : 'mekanik kapılı katyon kanalı', 'm s', 'middle');
      s += `<g class="f67-pa" data-g="pr"></g>`;
      s += `<path class="f67-ln thin" d="M${rc[0]},${rc[1] + R + 24} L${gc[0]},${gc[1] - 38}" marker-end="url(#f67-tg-c)"/>`;
      s += `<circle class="f67-bow" cx="${gc[0]}" cy="${gc[1]}" r="34"/><circle class="f67-glc" cx="${gc[0]}" cy="${gc[1]}" r="24"/><circle class="f67-glc2" cx="${gc[0] - 7}" cy="${gc[1] - 4}" r="8"/><circle class="f67-glc2" cx="${gc[0] + 8}" cy="${gc[1] + 4}" r="8"/>${txt(gc[0] + 44, gc[1] + 4, 'Glomerül', 'm s')}`;
      s += `<text class="f67-lb b" data-g="gfr" x="${gc[0] + 44}" y="${gc[1] + 20}"></text>`;
      // tübül
      s += `<rect class="f67-lumen" x="${lx0}" y="${lum[0]}" width="${lx1 - lx0}" height="${lum[1] - lum[0]}" rx="6"/>${txt(lx1 - 8, lum[0] + 14, 'Tübül sıvısı', 'w s', 'end')}`;
      s += `<g data-g="md">${''}</g>`;
      s += `<g class="f67-parts"></g>`;
      s += `<g class="f67-tgs">${tg.map((p, i) => `<g class="f67-bx" data-t="${i}"><rect x="${p[0]}" y="${p[1]}" width="${tw}" height="${th}" rx="8"/>${txt(p[0] + tw / 2, p[1] + 17, TGT[i][0], 'b s', 'middle', n ? 17 : 15, 12)}<text class="f67-lb s st" data-st="${i}" x="${p[0] + tw / 2}" y="${p[1] + th - 8}" text-anchor="middle"></text></g>`).join('')}</g>`;
      return s + '</svg>';
    };
    const draw = () => {
      const svg = stage.querySelector('svg'); if (!svg) return; const g = geo, S0 = S(), rc = g.rc;
      svg.querySelector('[data-g=lu]').setAttribute('r', (S0.l * g.k).toFixed(1));
      svg.querySelectorAll('[data-g=sep]').forEach((p) => { const a = +p.dataset.a, r0 = S0.l * g.k; p.setAttribute('d', `M${(rc[0] + r0 * Math.cos(a)).toFixed(1)},${(rc[1] + r0 * Math.sin(a)).toFixed(1)} L${(rc[0] + g.R * Math.cos(a)).toFixed(1)},${(rc[1] + g.R * Math.sin(a)).toFixed(1)}`); });
      const wl = svg.querySelector('.f67-wl'); wl.classList.toggle('dep', !!S0.d); wl.classList.toggle('hl', S0.tg === 1 && mode === 'a');
      // makula densa hücresi
      const w = g.cw * S0.w, h = g.ch * S0.w, x = g.cx - w / 2, y = g.lum[1];
      const cellY = y;
      let m = `<rect class="f67-mdc${S0.w > 1 ? ' sw' : ''}" x="${x.toFixed(1)}" y="${cellY}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="14"/>`;
      m += `<rect class="f67-nk" x="${g.cx - 14}" y="${y - 6}" width="28" height="14" rx="3"/>${txt(g.cx, y + 28, 'Na⁺/K⁺/2Cl⁻', 'b s', 'middle')}`;
      m += txt(g.cx, y + 52, 'Makula densa hücresi', 'm s', 'middle');
      m += `<rect class="f67-nk" x="${g.cx - 14}" y="${y + h - 10}" width="28" height="14" rx="3"/>${txt(g.cx, y + h + 22, 'Na⁺/K⁺-ATPaz', 'b s', 'middle')}`;
      svg.querySelector('[data-g=md]').innerHTML = m;
      svg.querySelector('[data-g=gfr]').textContent = mode === 'a' ? (st && st.i >= 3 ? 'GFR ↑' : '') : (st && st.i >= 1 ? 'GFR ↓' : '');
      svg.querySelector('[data-g=pr]').innerHTML = txt(g.n ? g.W - 8 : 8, 20, mode === 'a' ? 'Perfüzyon basıncı ↑' : 'Perfüzyon basıncı ↓', 'b ' + (mode === 'a' ? 'c-crit' : 'a'), g.n ? 'end' : 'start');
      svg.querySelectorAll('[data-t]').forEach((b) => {
        const i = +b.dataset.t, on = S0.tg === 1 || S0.tg === 2; b.classList.toggle('on', on);
        b.querySelector('.st').textContent = on ? (mode === 'a' ? TGT[i][1] : TGT[i][2]) : '';
      });
      // parçacıklar
      const pg = svg.querySelector('.f67-parts'); pg.innerHTML = ''; parts = [];
      if (RM) return;
      const add = (cls, o) => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', cls === 'ad' ? '3.4' : '2.8'); c.setAttribute('class', 'f67-pt ' + cls); pg.appendChild(c); parts.push(Object.assign({ c, cls }, o)); };
      const nIon = [3, 6, 11][S0.i];
      for (let i = 0; i < nIon; i++) add('fl', { k: 'ion', o: i / nIon, y: g.lum[0] + 9 + ((i * 7) % 19) });
      for (let i = 0; i < [1, 2, 4][S0.i]; i++) add('fl', { k: 'in', o: i / 4 });
      if (S0.d) for (let i = 0; i < 4; i++) add('ca', { k: 'cat', o: i / 4 });
      if (S0.ad) for (let i = 0; i < 9; i++) add('ad', { k: 'ad', o: (i % 3) / 3 + (i / 9) * 0.1, tg: i % 3 });
    };
    const go = (i) => { say(el, (mode === 'a' ? ART : DUS)[i]); draw(); };
    st = stepper(el, { total: () => (mode === 'a' ? 7 : 3), go });
    const onMode = (e) => { const b = e.target.closest('[data-m]'); if (!b) return; mode = b.dataset.m; el.querySelectorAll('[data-m]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); st.reset(); };
    el.addEventListener('click', onMode);
    const off = resp(el, (nn) => { stage.innerHTML = build(nn); draw(); });
    st.redraw();
    const tk = ticker(el, (dt) => {
      st.tick(dt); t += dt; if (!geo) return;
      const g = geo;
      parts.forEach((p) => {
        let x, y;
        if (p.k === 'ion') { const f = (p.o + t * 0.1) % 1; x = g.lx0 + f * (g.lx1 - g.lx0); y = p.y; } else if (p.k === 'in') { const f = (p.o + t * 0.5) % 1; x = g.cx - 5 + p.o * 10; y = g.lum[1] - 6 + f * 38; } else if (p.k === 'cat') { const f = (p.o + t * 0.5) % 1; x = g.rc[0] - 7 + (p.o * 14); y = g.rc[1] - g.R - 14 + f * 30; } else { const f = (p.o + t * 0.4) % 1, T = g.tg[p.tg]; const x0 = g.cx, y0 = g.lum[1] + g.ch * 0.5, x1 = T[0] + (g.n ? g.tw / 2 : 0), y1 = g.n ? T[1] : T[1] + g.th / 2; x = lerp(x0, x1, f); y = lerp(y0, y1, f); }
        p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1));
      });
    });
    return () => { tk(); off(); st.off(); el.removeEventListener('click', onMode); };
  };

  /* ---------- 8 · Renin–anjiyotensin–aldosteron ekseni ---------- */
  VIZ.f67_raas = (el) => {
    const STEPS = [
      '<b>1 · Uyaranlar.</b> Granüler hücreler renini üç uyaranla salar. Azalmış tübüler akımı makula densa algılar; düşük afferent basınç granüler hücreleri doğrudan uyarır (böbrek içi baroreseptör); sempatik uyarı β1-adrenoseptörler üzerinden etki eder. [[K1 s. 310]]',
      '<b>2 · Renin.</b> Renin damarları kendisi etkilemeyen proteolitik bir enzimdir; karaciğerin yaptığı anjiyotensinojeni anjiyotensin I\'e ayırır. Bu adım hızı belirleyen, düzenlenen basamaktır. [[K1 s. 310]]',
      '<b>3 · ACE.</b> Anjiyotensin dönüştürücü enzim anjiyotensin I\'i anjiyotensin II\'ye çevirir. [[K1 s. 310]]',
      '<b>4 · Böbrek.</b> Anjiyotensin II iki arteriyolü de daraltır; bazal çapı küçük olan efferentte etkisi daha büyüktür. Renal direnç artınca sistemik basınç yükselir, glomerül basıncı ve GFR görece korunur. Çok yüksek düzeyde mezangiyal hücreler kasılır, GFR belirgin düşer. [[K1 s. 310]]',
      '<b>5 · Sistemik damarlar.</b> Anjiyotensin II güçlü bir veno- ve vazokonstriktördür. [[K1 s. 310]]',
      '<b>6 · Adrenal.</b> Zona glomerulozadan aldosteron salınır; aldosteron DCT ve CD\'de Na⁺ ve su geri emilimini artırarak plazma hacmini genişletir. [[K1 s. 310]]',
      '<b>7 · Beyin.</b> Hipotalamusta susama ve arka hipofizden ADH salınımı artar (ADH CD\'de su geri emilimini artırır); sempatik nöronlardan noradrenalin salınımı artar, arteriyoller daralır. Sonuçta renal perfüzyon basıncı yükselir. [[K1 s. 310]]',
    ];
    // her adımda etkin öğeler
    const ACT = [['s1', 's2', 's3', 'gh'], ['rn', 'ao', 'a1', 'c_ao_a1'], ['a1', 'a2', 'c_a1_a2'], ['a2', 'c1', 'c_a2_c1'], ['c2', 'c_a2_c2'], ['c3', 'c_a2_c3'], ['c4', 'c_a2_c4', 'fb']];
    const ITEM = {
      s1: { l: ['↓ Tübüler akım (makula densa)'] }, s2: { l: ['↓ Afferent arteriyol basıncı (böbrek içi baroreseptör)'] }, s3: { l: ['Sempatik uyarı (β1)'] },
      gh: { l: ['Granüler hücre'], b: 1 }, rn: { l: ['Renin'], b: 1 }, ao: { l: ['Anjiyotensinojen (karaciğer)'] }, a1: { l: ['Anjiyotensin I'] }, a2: { l: ['Anjiyotensin II'], b: 1 },
      c1: { t: 'Böbrek', l: ['efferent daha çok daralır', 'GFR görece korunur', 'çok yüksek düzey: mezangiyal kasılma → GFR ↓'] },
      c2: { t: 'Sistemik damarlar', l: ['güçlü veno- ve vazokonstriksiyon'] },
      c3: { t: 'Adrenal korteks', l: ['zona glomerulosa → aldosteron → DCT ve CD: Na⁺ + su geri emilimi → plazma hacmi ↑'] },
      c4: { t: 'Beyin', l: ['hipotalamus: susama, arka hipofizden ADH (CD\'de su geri emilimi)', 'sempatik nöron: noradrenalin ↑ → arteriyol daralması'] },
    };
    const order = ['s1', 's2', 's3', 'gh', 'rn', 'ao', 'a1', 'a2', 'c1', 'c2', 'c3', 'c4'];
    // öğenin ilk etkin adımı
    const first = {}; ACT.forEach((a, i) => a.forEach((id) => { if (first[id] === undefined) first[id] = i; }));
    ['gh'].forEach((id) => { first[id] = 0; });
    let st, geo = null, parts = [], t = 0;
    el.innerHTML = `<div class="f67-stage"></div>${stepHtml()}`;
    const stage = el.querySelector('.f67-stage');
    const build = (n) => {
      const W = n ? 360 : 640, ch = n ? 29 : 29, R = {};
      const bh = (id, w) => { const it = ITEM[id]; const mx = Math.floor((w - 10) / 5.2); const lines = it.l.reduce((a, s) => a + nl(s, mx), 0); return (it.t ? 22 : 10) + lines * 13 + (it.t ? 6 : 4) + (it.l.length > 1 ? 4 : 0); };
      let H;
      if (!n) {
        const put = (id, x, y, w, h) => { R[id] = { x, y, w, h: h || bh(id, w) }; };
        put('s1', 8, 14, 150); put('s2', 8, 68, 150); put('s3', 8, 134, 150); put('gh', 190, 62, 104, 36); put('rn', 190, 142, 104, 34);
        put('ao', 8, 250, 136); put('a1', 184, 250, 92, 46); put('a2', 320, 250, 104, 46);
        let y = 8; ['c1', 'c2', 'c3', 'c4'].forEach((id) => { put(id, 440, y, 192); y += R[id].h + 10; });
        H = 404;
      } else {
        const put = (id, x, y, w, h) => { R[id] = { x, y, w, h: h || bh(id, w) }; };
        let y = 6; ['s1', 's2', 's3'].forEach((id) => { put(id, 8, y, 344); y += R[id].h + 6; });
        put('gh', 100, y + 8, 160, 30); put('rn', 100, y + 54, 160, 30); y += 104;
        put('ao', 50, y, 260, 34); put('a1', 100, y + 62, 160, 30); put('a2', 100, y + 118, 160, 30); y += 176;
        const h1 = Math.max(bh('c1', 166), bh('c2', 166)), h2 = Math.max(bh('c3', 166), bh('c4', 166));
        put('c1', 8, y, 166, h1); put('c2', 186, y, 166, h1); put('c3', 8, y + h1 + 10, 166, h2); put('c4', 186, y + h1 + 10, 166, h2);
        H = y + h1 + h2 + 64;
      }
      geo = { R, W, H, n };
      let s = svgOpen(W, H, 'Renin–anjiyotensin–aldosteron ekseni: uyaranlardan renine, anjiyotensin II\'ye ve dört hedef organa akış') + defs('f67-ra');
      const mid = (id, side) => { const r = R[id]; return side === 'r' ? [r.x + r.w, r.y + r.h / 2] : side === 'l' ? [r.x, r.y + r.h / 2] : side === 't' ? [r.x + r.w / 2, r.y] : [r.x + r.w / 2, r.y + r.h]; };
      const cn = (key, a, sa, b, sb, dash, label) => {
        const p = mid(a, sa), q = mid(b, sb), horiz = (sa === 'r' || sa === 'l');
        const bus = n && /^s\d$/.test(a);
        const d = bus ? `M${R[a].x + R[a].w},${R[a].y + R[a].h / 2} L${W - 3},${R[a].y + R[a].h / 2} L${W - 3},${R.gh.y + 15} L${R.gh.x + R.gh.w},${R.gh.y + 15}` : horiz ? `M${p[0]},${p[1]} C${(p[0] + q[0]) / 2},${p[1]} ${(p[0] + q[0]) / 2},${q[1]} ${q[0]},${q[1]}` : `M${p[0]},${p[1]} C${p[0]},${(p[1] + q[1]) / 2} ${q[0]},${(p[1] + q[1]) / 2} ${q[0]},${q[1]}`;
        s += `<path class="f67-cn" data-c="${key}" id="f67-ra-${key}" d="${d}" marker-end="url(#f67-ra-m)"${dash ? ' stroke-dasharray="5 4"' : ''}/>`;
      };
      ['s1', 's2', 's3'].forEach((id) => cn('c_' + id + '_gh', id, n ? 'b' : 'r', 'gh', n ? 't' : 'l'));
      cn('c_gh_rn', 'gh', 'b', 'rn', 't');
      cn('c_ao_a1', 'ao', n ? 'b' : 'r', 'a1', n ? 't' : 'l'); cn('c_a1_a2', 'a1', n ? 'b' : 'r', 'a2', n ? 't' : 'l');
      ['c1', 'c2', 'c3', 'c4'].forEach((id) => cn('c_a2_' + id, 'a2', n ? 'b' : 'r', id, n ? 't' : 'l'));
      // renin → ao→a1 oku (kesikli)
      { const p = mid('rn', 'b'), q = n ? [R.ao.x + R.ao.w + 6, R.ao.y + R.ao.h + 14] : [(R.ao.x + R.ao.w + R.a1.x) / 2, R.ao.y]; s += `<path class="f67-cn" data-c="rn_ao" d="M${p[0]},${p[1]} C${p[0]},${p[1] + 30} ${q[0]},${q[1] - 30} ${q[0]},${q[1]}" stroke-dasharray="5 4" marker-end="url(#f67-ra-b)" style="stroke:var(--c-basic)"/>`; }
      order.forEach((id) => {
        const r = R[id], it = ITEM[id], mx = Math.floor((r.w - 10) / 5.2); let yy = r.y + (it.t ? 17 : 15);
        s += `<g class="f67-nd${it.b ? ' bas' : ''}" data-i="${id}"><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="8"/>`;
        if (it.t) { s += txt(r.x + 8, yy, it.t, 'b'); yy += 17; }
        it.l.forEach((ln, k) => { const L = wrap(ln, mx); s += txt(r.x + (it.t ? 8 : r.w / 2), yy, ln, (it.t && k === it.l.length - 1 && it.l.length > 2 ? 'm ' : '') + 's', it.t ? 'start' : 'middle', mx); yy += L.length * 13 + 2; });
        s += '</g>';
      });
      // etiketler
      if (!n) {
        s += txt((R.ao.x + R.ao.w + R.a1.x) / 2, R.ao.y - 8, 'renin', 'b c-basic s', 'middle') + txt((R.ao.x + R.ao.w + R.a1.x) / 2, R.ao.y + R.ao.h + 14, '✂ hız belirleyici', 'c-basic s', 'middle') + txt((R.a1.x + R.a1.w + R.a2.x) / 2, R.a1.y - 8, 'ACE', 'b s', 'middle');
        s += txt(220, 126, 'salgılar', 'm s', 'middle');
        s += `<path class="f67-cn dash" data-c="fb" d="M536,${R.c4.y + R.c4.h + 6} L536,${H - 22} L4,${H - 22} L4,${R.s2.y + R.s2.h / 2} L8,${R.s2.y + R.s2.h / 2}" marker-end="url(#f67-ra-m)" fill="none"/>`;
        s += txt(270, H - 8, 'Sistemik basınç ↑ → renal perfüzyon basıncı ↑ (geri bildirimle uyaranlar azalır)', 'm s', 'middle');
      } else {
        s += txt(R.ao.x + R.ao.w + 6 - 150, R.ao.y + R.ao.h + 24, '', '');
        s += txt(268, R.a1.y - 8, 'renin ✂ hız belirleyici', 'c-basic s', 'start') + txt(268, R.a2.y - 8, 'ACE', 'b s', 'start');
        s += txt(180, H - 34, 'Sistemik basınç ↑ → renal perfüzyon basıncı ↑', 'm s', 'middle', 0, 13) + txt(180, H - 20, '(geri bildirimle uyaranlar azalır)', 'm s', 'middle');
      }
      s += '<g class="f67-parts"></g>';
      return s + '</svg>';
    };
    const draw = () => {
      const svg = stage.querySelector('svg'); if (!svg) return; const i = st ? st.i : 0;
      svg.querySelectorAll('[data-i]').forEach((g) => { const id = g.dataset.i, f = first[id]; g.classList.toggle('on', ACT[i].includes(id)); g.classList.toggle('past', f < i || (f === i && !ACT[i].includes(id))); g.classList.toggle('fut', f > i); });
      svg.querySelectorAll('[data-c]').forEach((c) => { const k = c.dataset.c; const act = ACT[i].includes(k) || (k === 'rn_ao' && i === 1) || (/^c_s\d_gh$/.test(k) && i === 0) || (k === 'c_gh_rn' && i === 1); const fi = ACT.findIndex((a) => a.includes(k)); c.classList.toggle('on', act); c.classList.toggle('fut', !act && (k === 'fb' ? true : k.startsWith('c_s') || k === 'c_gh_rn' ? i < 0 : (fi < 0 ? i < 1 : fi > i))); if (k.startsWith('c_s') || k === 'c_gh_rn') c.classList.toggle('fut', i < 0); });
      const pg = svg.querySelector('.f67-parts'); pg.innerHTML = ''; parts = [];
      if (RM) return;
      const tgt = [null, null, null, 'c_a2_c1', 'c_a2_c2', 'c_a2_c3', 'c_a2_c4'][i];
      const flows = i === 0 ? ['c_s1_gh', 'c_s2_gh', 'c_s3_gh'] : i === 1 ? ['c_gh_rn', 'c_ao_a1'] : i === 2 ? ['c_a1_a2'] : [tgt];
      flows.forEach((id) => { const m = svg.querySelector(`[data-c="${id}"]`); if (!m) return; const len = m.getTotalLength(); for (let k = 0; k < 3; k++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '3.2'); c.setAttribute('class', 'f67-pt ' + (i < 3 ? 'ad' : 'a2')); pg.appendChild(c); parts.push({ m, len, c, o: k / 3 }); } });
    };
    const go = (i) => { say(el, STEPS[i]); draw(); };
    st = stepper(el, { total: () => 7, go });
    const off = resp(el, (n) => { stage.innerHTML = build(n); draw(); });
    st.redraw();
    const tk = ticker(el, (dt) => {
      st.tick(dt); t += dt;
      parts.forEach((p) => { const q = p.m.getPointAtLength(((p.o + t * 0.4) % 1) * p.len); p.c.setAttribute('cx', q.x.toFixed(1)); p.c.setAttribute('cy', q.y.toFixed(1)); });
    });
    return () => { tk(); off(); st.off(); };
  };

  /* ---------- 9 · Eikozanoidler ve NSAİİ ---------- */
  VIZ.f67_pg = (el) => {
    const D = [
      { ad: 'Normal', cap: null, red: 1, grn: 0, lum: [24, 24], rbf: 1, x: 0 },
      { ad: 'Kanama / sepsis', cap: '<b>Kanama ya da sepsis.</b> Noradrenalin ve anjiyotensin II sürekli yüksek; uzun süreli arteriyol daralması RBF\'yi belirgin düşürür. Böbrek yerel PGE₂ ve PGI₂ yaparak karşı koyar ve RBF ile GFR\'yi artırmaya çalışır. [[K1 s. 310]]', red: 3, grn: 2, lum: [15, 15], rbf: 0.62, x: 0 },
      { ad: 'Kanama / sepsis + NSAİİ', cap: '<b>NSAİİ.</b> Siklooksijenaz inhibe olur, prostaglandin yapılamaz; karşı koyan vazodilatasyon kalkar ve RBF daha da düşer. Bu hastalar emniyet mekanizmasından daha az yararlanır. [[K1 s. 311]]', red: 3, grn: 0, lum: [7, 7], rbf: 0.28, x: 1 },
    ];
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    let cur = 0, t = 0, parts = [], geo = null;
    el.innerHTML = `<div class="f67-ctlrow"><div class="seg" role="group" aria-label="Durum">${D.map((d, i) => `<button type="button" data-d="${i}" aria-pressed="${i === 0}">${d.ad}</button>`).join('')}</div></div><div class="f67-stage"></div>`;
    const stage = el.querySelector('.f67-stage');
    const arrows = (x, y, ln, cnt, cls, dir) => { let s = ''; for (let i = 0; i < cnt; i++) { const xx = x + (i + 0.5) * (ln / Math.max(cnt, 1)); s += `<path class="f67-ab ${cls}" d="M${xx.toFixed(1)},${y} L${xx.toFixed(1)},${y + dir * 22}" marker-end="url(#f67-pg-${cls === 'red' ? 'c' : 'o'})"/>`; } return s; };
    const build = (n) => {
      const W = n ? 360 : 640, H = n ? 330 : 270, k = n ? 0.55 : 1;
      const y = n ? 112 : 130, a0 = 20 * k, a1 = 150 * k, gx = 200 * k, e0 = 250 * k, e1 = 380 * k;
      geo = { y, a0, a1, e0, e1, n, W };
      let s = svgOpen(W, H, 'Afferent ve efferent arteriyol, glomerül, daraltıcı ve genişletici etkenler, siklooksijenaz ve RBF çubuğu') + defs('f67-pg');
      s += `<path class="f67-wallt" d="M${a0},${y} L${a1},${y}" stroke-width="42"/><path class="f67-lumt" data-l d="M${a0},${y} L${a1},${y}"/>`;
      s += `<path class="f67-wallt" d="M${e0},${y} L${e1},${y}" stroke-width="42"/><path class="f67-lumt" data-l d="M${e0},${y} L${e1},${y}"/>`;
      s += `<circle class="f67-bow" cx="${gx}" cy="${y}" r="${n ? 24 : 36}"/><circle class="f67-glc" cx="${gx}" cy="${y}" r="${n ? 16 : 26}"/>`;
      s += txt((a0 + a1) / 2, y + 78, 'Afferent', 'b c-crit', 'middle') + txt((e0 + e1) / 2, y + 78, 'Efferent', 'b c-crit', 'middle');
      s += '<g data-ab></g>';
      s += '<g class="f67-parts"></g>';
      // RBF çubuğu
      if (!n) {
        s += `<rect class="f67-bar0" x="470" y="40" width="30" height="170" rx="6"/><rect class="f67-barf" data-bar x="470" y="40" width="30" height="170" rx="6"/><path class="f67-ln" d="M462,40 L508,40"/>${txt(485, 232, 'RBF', 'b', 'middle')}${txt(512, 44, 'bazal', 'm s')}`;
        s += `<rect class="f67-box" x="530" y="56" width="104" height="70" rx="8"/>${txt(582, 76, 'Siklooksijenaz', 'b s', 'middle')}${txt(582, 91, '(COX)', 'm s', 'middle')}${txt(582, 109, '→ PGE₂, PGI₂', 'c-ok s', 'middle')}<g data-x><path class="f67-cross" d="M538,62 L626,120 M626,62 L538,120"/>${txt(582, 150, 'NSAİİ', 'b c-crit', 'middle')}</g>`;
        s += txt(20, 24, 'Daraltan: noradrenalin, anjiyotensin II', 'b c-crit s') + txt(20, 40, 'Genişleten: PGE₂, PGI₂', 'b c-ok s');
      } else {
        s += `<rect class="f67-bar0" x="20" y="222" width="320" height="22" rx="6"/><rect class="f67-barf" data-bar x="20" y="222" width="320" height="22" rx="6"/><path class="f67-ln" d="M340,216 L340,250"/>${txt(20, 262, 'RBF', 'b')}${txt(336, 262, 'bazal', 'm s', 'end')}`;
        s += `<rect class="f67-box" x="20" y="272" width="320" height="48" rx="8"/>${txt(180, 291, 'Siklooksijenaz (COX) → PGE₂, PGI₂', 'b s', 'middle')}${txt(180, 308, 'NSAİİ bunu engeller', 'm s', 'middle')}<g data-x><path class="f67-cross" d="M26,276 L334,316 M334,276 L26,316"/></g>`;
        s += txt(8, 20, 'Daraltan: noradrenalin, anjiyotensin II', 'b c-crit s') + txt(8, 36, 'Genişleten: PGE₂, PGI₂', 'b c-ok s');
      }
      return s + '</svg>';
    };
    const upd = () => {
      const svg = stage.querySelector('svg'); if (!svg) return; const d = D[cur], g = geo;
      svg.querySelectorAll('[data-l]').forEach((p) => p.setAttribute('stroke-width', d.lum[0]));
      let a = '';
      [[g.a0, g.a1], [g.e0, g.e1]].forEach(([x0, x1]) => {
        const ln = x1 - x0;
        if (d.red) { a += arrows(x0, g.y - 52, ln, 1 + d.red, 'red', 1) + arrows(x0, g.y + 52, ln, 1 + d.red, 'red', -1); }
        if (d.grn) { a += arrows(x0 + 4, g.y - 22, ln - 8, 1 + d.grn, 'grn', -1).replace(/d="M([\d.]+),([\d.]+) L([\d.]+),([\d.]+)"/g, (m, x, y, x2, y2) => `d="M${x},${+y} L${x2},${+y - 22}"`); }
      });
      svg.querySelector('[data-ab]').innerHTML = a;
      const bar = svg.querySelector('[data-bar]'); const col = cur === 0 ? 'ok' : cur === 1 ? 'warn' : 'crit';
      if (!g.n) { const h = 170 * d.rbf; bar.setAttribute('y', 40 + 170 - h); bar.setAttribute('height', h); } else { bar.setAttribute('width', 320 * d.rbf); }
      bar.setAttribute('class', 'f67-barf ' + col);
      svg.querySelector('[data-x]').style.display = d.x ? '' : 'none';
      el.querySelectorAll('[data-d]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.d === cur)));
      const pg = svg.querySelector('.f67-parts'); pg.innerHTML = ''; parts = [];
      if (RM) return;
      const nP = Math.round(3 + 8 * d.rbf);
      for (let i = 0; i < nP; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '2.6'); c.setAttribute('class', 'f67-pt bl'); pg.appendChild(c); parts.push({ c, o: i / nP }); }
    };
    const onC = (e) => { const b = e.target.closest('[data-d]'); if (!b) return; cur = +b.dataset.d; upd(); const c = el.closest('.viz').querySelector('.viz-cap'); if (D[cur].cap) say(el, D[cur].cap); else c.innerHTML = cap0; };
    el.addEventListener('click', onC);
    const off = resp(el, (n) => { stage.innerHTML = build(n); upd(); });
    const tk = ticker(el, (dt) => {
      if (RM || !geo) return; t += dt; const sp2 = 0.12 + 0.3 * D[cur].rbf, g = geo, x0 = g.a0, x1 = g.e1;
      parts.forEach((p) => { const f = (p.o + t * sp2) % 1; p.c.setAttribute('cx', (x0 + f * (x1 - x0)).toFixed(1)); p.c.setAttribute('cy', g.y); });
    });
    return () => { tk(); off(); el.removeEventListener('click', onC); };
  };

  /* ---------- 10 · ABH sınıflaması ---------- */
  VIZ.f67_aki = (el) => {
    const CAP = {
      pre: '<b>Prerenal.</b> Ağır hipovolemi ve hipotansiyon RBF\'yi bozar; glomerül basıncı düşer, GFR azalır. Glomerül ve tübül sağlam olduğu için potansiyel olarak geri döndürülebilir. [[K1 s. 311]]',
      int: '<b>İntrinsik renal.</b> İskemik, sitotoksik ya da inflamatuvar etken glomerül ya da tübülde yapısal hasar yapar; neden ortadan kalkınca hemen düzelmez. Bir yer seçin. [[K1 s. 311]]',
      atn: '<b>Akut tübüler nekroz.</b> İntrinsik ABH\'nin en sık nedeni. Yüksek metabolizma ve zayıf kanlanma tübülü iskemiye duyarlı kılar; uzamış hipoperfüzyon tübül hücresini öldürür. Toksinler: miyoglobin (rabdomiyoliz), aminoglikozitler. [[K1 s. 311]]',
      gn: '<b>Glomerülonefrit.</b> Hedefe göre: podosit (minimal değişiklik hastalığı), bazal membran (Goodpasture hastalığı), mezangiyal hücre (IgA birikimiyle IgA nefropatisi), glomerül kapilleri (SLE ve romatoid artritte antijen–antikor kompleksi birikimi). [[K1 s. 311]]',
      ain: '<b>Akut interstisyel nefrit.</b> İlaçlara aşırı duyarlılık tepkisi: NSAİİ, penisilinler, allopürinol. [[K1 s. 311]]',
      post: '<b>Postrenal.</b> İdrar akımı tıkanır; artan tübüler basınç glomerüler filtrasyon basıncını düşürür, GFR azalır. [[K1 s. 311]]',
    };
    const WHY = { pre: 'RBF ↓ → glomerül basıncı ↓', int: 'glomerül ya da tübül hasarı', atn: 'tübül hücresi ölür', gn: 'glomerül süzme yüzeyi hasarı', ain: 'tübüller arası doku iltihabı', post: 'tübüler basınç ↑ → süzme basıncı ↓' };
    let top = '', sub = '';
    const cap0 = el.closest('.viz').querySelector('.viz-cap').innerHTML;
    el.innerHTML = `<p class="f67-not">ABH: hızlı (&lt; 48 sa) böbrek işlevi kaybı · ölçüt: serum kreatinini ↑ ya da idrar çıkışı ↓</p><div class="f67-ctlrow"><div class="seg" role="group" aria-label="Neden grubu">${[['pre', 'Prerenal'], ['int', 'İntrinsik renal'], ['post', 'Postrenal']].map(([v, l]) => `<button type="button" data-g="${v}" aria-pressed="false">${l}</button>`).join('')}</div><div class="seg" role="group" aria-label="İntrinsik alt yer" data-sub hidden>${[['atn', 'ATN'], ['gn', 'Glomerülonefrit'], ['ain', 'Akut interstisyel nefrit']].map(([v, l]) => `<button type="button" data-s="${v}" aria-pressed="false">${l}</button>`).join('')}</div></div><div class="f67-stage"></div>`;
    const stage = el.querySelector('.f67-stage');
    const key = () => (top === 'int' ? sub || 'int' : top);
    const mark = (x, y, on) => (on ? `<circle class="f67-hit" cx="${x}" cy="${y}" r="20"/><path class="f67-cross" d="M${x - 9},${y - 9} L${x + 9},${y + 9} M${x + 9},${y - 9} L${x - 9},${y + 9}"/>` : '');
    const build = (n) => {
      const k = n ? 0.5625 : 1, W = n ? 360 : 640, mainH = 340 * k, K = key(), H = n ? Math.round(mainH + 14 + (K === 'gn' ? 132 : 0) + 94 + 12) : 484;
      const M = (x, y) => [+(x * k).toFixed(1), +(y * k).toFixed(1)];
      let s = svgOpen(W, H, 'Akut böbrek hasarı: prerenal (renal arter), intrinsik renal (glomerül, tübül, interstisyum) ve postrenal (üreter) nedenler nefron şeması üzerinde') + defs('f67-ak');
      s += `<g transform="scale(${k})">`;
      const zone = (id, x, w, name) => `<g class="f67-zn${top === id ? ' on' : ''}" data-z="${id}" tabindex="0" role="button" aria-pressed="${top === id}" aria-label="${name}"><rect x="${x}" y="8" width="${w}" height="324" rx="14"/></g>`;
      s += zone('pre', 8, 186, 'Prerenal') + zone('int', 204, 236, 'İntrinsik renal') + zone('post', 450, 182, 'Postrenal');
      s += `<rect class="f67-hs" x="22" y="92" width="64" height="40" rx="10"/><path class="f67-vsl a" d="M86,112 L212,112" style="stroke-width:12"/>`;
      s += `<g class="f67-zn2${K === 'ain' ? ' on' : ''}" data-s="ain" tabindex="0" role="button" aria-label="Akut interstisyel nefrit"><rect x="216" y="150" width="212" height="170" rx="12" stroke-dasharray="3 4"/></g>`;
      s += `<path class="f67-tb2" d="M262,146 C250,172 280,182 290,202 C300,222 330,212 340,232 L340,262 L520,262 C520,285 560,275 560,296" fill="none"/>`;
      s += `<g class="f67-zn2${K === 'atn' ? ' on' : ''}" data-s="atn" tabindex="0" role="button" aria-label="Akut tübüler nekroz"><path class="f67-tb3" d="M262,146 C250,172 280,182 290,202 C300,222 330,212 340,232 L340,262" fill="none"/></g>`;
      s += `<g class="f67-zn2${K === 'gn' ? ' on' : ''}" data-s="gn" tabindex="0" role="button" aria-label="Glomerülonefrit"><circle class="f67-bow" cx="262" cy="112" r="34"/><circle class="f67-glc" cx="262" cy="112" r="24"/><circle class="f67-glc2" cx="255" cy="108" r="8"/><circle class="f67-glc2" cx="270" cy="116" r="8"/></g>`;
      s += `<ellipse class="f67-bl" cx="560" cy="308" rx="40" ry="20"/>`;
      s += '</g>';
      // işaretler (ölçeksiz)
      const hit = { pre: [150, 112], gn: [262, 112], atn: [300, 212], ain: [372, 195], post: [520, 262] }[K];
      if (hit) { const p = M(hit[0], hit[1]); s += mark(p[0], p[1], 1); }
      // etiketler (ölçeksiz, sabit boy)
      const zn = n ? [['PRERENAL', 8, 'start'], ['İNTRİNSİK', 204, 'start'], ['POSTRENAL', 450, 'start']] : [['PRERENAL', 101, 'middle'], ['İNTRİNSİK RENAL', 322, 'middle'], ['POSTRENAL', 541, 'middle']];
      zn.forEach((z) => { const p = M(z[1] + (n ? 6 : 0), 26); s += txt(p[0], p[1] - (n ? 6 : 0), z[0], 'b m s', z[2]); });
      const L = (x, y, t, c, a) => { const p = M(x, y); return txt(p[0], p[1], t, c || 'm s', a || 'middle'); };
      s += L(54, 117, 'Kalp', 'b s') + L(150, 100, n ? '' : 'Renal arter', 'c-crit s');
      s += L(262, 70, 'Glomerül') + L(300, 252, 'Tübül', 'm s', 'end') + L(392, 310, 'İnterstisyum');
      s += L(484, 250, 'Üreter', 'm s', 'middle') + L(560, 312, 'Mesane');
      if (n) { const p = M(150, 100); s += txt(p[0], p[1], 'Renal arter', 'c-crit s', 'middle'); }
      // alt şerit
      const y0 = mainH + (n ? 14 : 20), bx = n ? 8 : 330, bw = n ? 344 : 302;
      const gnTop = n && K === 'gn';
      const by = n ? (gnTop ? y0 + 132 : y0) : y0, bh = n ? 94 : 118;
      s += `<rect class="f67-box" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10"/>` + txt(bx + 12, by + 22, 'Neden GFR düşer?', 'b');
      s += txt(bx + 12, by + 42, K ? WHY[K] : 'Bir neden grubu seçin', K ? '' : 'm', 'start', n ? 54 : 44);
      if (K) {
        const prerenal = K === 'pre';
        s += `<rect class="f67-tag ${prerenal ? 'ok' : 'crit'}" x="${bx + 12}" y="${by + bh - 32}" width="${bw - 24}" height="22" rx="5"/>${txt(bx + 20, by + bh - 17, prerenal ? 'potansiyel olarak geri döndürülebilir' : K === 'post' ? 'tıkanıklık erken giderilirse düzelebilir' : 'neden kalkınca hemen düzelmez', 'b s ' + (prerenal ? 'c-ok' : 'c-crit'))}`;
      }
      if (K === 'gn') {
        const gx = n ? 70 : 110, gy = n ? y0 + 62 : y0 + 62, r = n ? 42 : 48;
        s += `<g class="f67-gnd"><circle class="f67-bow" cx="${gx}" cy="${gy}" r="${r + 12}"/><circle class="f67-glc" cx="${gx}" cy="${gy}" r="${r - 6}"/>`;
        s += `<path class="f67-bm" d="M${gx - r + 4},${gy + 16} A${r - 4},${r - 4} 0 0 1 ${gx + r - 4},${gy + 16}" fill="none"/><circle class="f67-pod" cx="${gx - r + 8}" cy="${gy - 6}" r="5"/><circle class="f67-pod" cx="${gx + r - 8}" cy="${gy - 8}" r="5"/><circle class="f67-glc2" cx="${gx}" cy="${gy + 20}" r="10"/><path class="f67-star" transform="translate(${gx} ${gy - 2}) scale(.6)" d="M0,-16 L4,-5 L15,-8 L8,1 L15,10 L4,7 L0,17 L-4,7 L-15,10 L-8,1 L-15,-8 L-4,-5Z"/></g>`;
        const lx = n ? 150 : 200, ang = (-50 * Math.PI) / 180, rows = [['Podosit', gx + r - 8, gy - 8], ['Bazal membran', gx + (r - 4) * Math.cos(-ang), gy + 16 - (r - 4) * Math.sin(-ang)], ['Mezangiyal hücre', gx + 4, gy - 2], ['Glomerül kapilleri', gx + 8, gy + 22]];
        rows.forEach((q, i) => { const ty = gy - 32 + i * 21; s += txt(lx, ty, q[0], 's') + `<path class="f67-ln thin" d="M${q[1]},${q[2]} L${lx - 4},${ty - 4}"/>`; });
      }
      return s + '</svg>';
    };
    const render = () => { stage.innerHTML = build(el.classList.contains('f67-n')); el.querySelectorAll('[data-g]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === top))); const sb = el.querySelector('[data-sub]'); sb.hidden = top !== 'int'; el.querySelectorAll('[data-s]').forEach((b) => { if (b.closest('.seg')) b.setAttribute('aria-pressed', String(b.dataset.s === sub)); }); };
    const capOf = () => { const c = el.closest('.viz').querySelector('.viz-cap'); const K = key(); if (!K) c.innerHTML = cap0; else say(el, CAP[K]); };
    const h = (e) => {
      const g = e.target.closest('[data-g]:not(svg *)'), z = e.target.closest('[data-z]'), s = e.target.closest('[data-s]');
      if (g) { top = top === g.dataset.g && g.dataset.g !== 'int' ? top : g.dataset.g; sub = ''; render(); capOf(); return; }
      if (z) { onAct(e, () => { top = z.dataset.z; sub = ''; render(); capOf(); }); return; }
      if (s) onAct(e, () => { top = 'int'; sub = s.dataset.s; render(); capOf(); });
    };
    el.addEventListener('click', h); el.addEventListener('keydown', h);
    const off = resp(el, () => render());
    return () => { off(); el.removeEventListener('click', h); el.removeEventListener('keydown', h); };
  };

  /* ---------- 11 · PAH klirensi hesaplayıcısı ---------- */
  VIZ.f67_pah = (el) => {
    const IN = [['v', 'İdrar akımı V̇ (mL/dk)', 0.5, 3, 0.1, 1.0], ['u', '[PAH]idrar (mg/dL)', 100, 1500, 10, 550], ['p', '[PAH]plazma (mg/dL)', 0.5, 3, 0.1, 1.0], ['h', 'Hematokrit', 0.25, 0.6, 0.01, 0.45]];
    const V = { v: 1, u: 550, p: 1, h: 0.45 };
    let low = false, t = 0, parts = [];
    const fm = (v, d) => v.toFixed(d).replace('.', ',');
    el.innerHTML = `<div class="f67-two pah"><div class="f67-stage"></div><div class="f67-pc">
      <dl class="kv f67-frm"><dt>RPF</dt><dd>= V̇ × [PAH]<sub>idrar</sub> / [PAH]<sub>plazma</sub></dd><dt>RBF</dt><dd>= RPF / (1 − Hct)</dd></dl>
      <div class="f67-inp">${IN.map((r) => `<label class="f67-rng"><span>${r[1]}</span><b data-o="${r[0]}"></b><input type="range" min="${r[2]}" max="${r[3]}" step="${r[4]}" value="${r[5]}" data-i="${r[0]}" aria-label="${r[1]}"></label>`).join('')}</div>
      <div class="f67-out"><div><span>RPF</span><b data-q="rpf"></b></div><div><span>RBF</span><b data-q="rbf"></b><small>kitap: RBF ≈ 1000 mL/dk</small></div></div>
      <button type="button" class="btn ghost" data-low aria-pressed="false">Neden düşük tahmin?</button></div></div>`;
    const stage = el.querySelector('.f67-stage');
    const calc = () => { const rpf = (V.v * V.u) / V.p; return { rpf, rbf: rpf / (1 - V.h) }; };
    const build = (n) => {
      const W = n ? 360 : 640, H = n ? 250 : 260;
      let s = svgOpen(W, H, 'PAH kanda: renal arterden glomerüle, kısmen süzülür, kalanı peritübüler kapillerden tübüle OAT1 ile salgılanır; renal vende neredeyse yok, idrarda yoğun') + defs('f67-pa');
      const k = n ? 0.56 : 1;
      const P = (d) => sp(d, k);
      s += `<path class="f67-vsl a" d="${P('M10,80 L150,80')}" style="stroke-width:22"/>`;
      s += `<circle class="f67-bow" cx="${190 * k}" cy="80" r="${n ? 24 : 36}"/><circle class="f67-glc" cx="${190 * k}" cy="80" r="${n ? 16 : 26}"/>`;
      s += `<path class="f67-vsl a" d="${P('M226,80 C250,80 250,52 290,52 L430,52')}" style="stroke-width:12"/><path class="f67-vsl v" d="${P('M430,52 L520,52 L610,52')}" style="stroke-width:16"/>`;
      s += `<path class="f67-tb2" d="${P('M190,118 C190,150 220,160 260,160 L420,160 L420,200')}" fill="none"/>`;
      s += `<path class="f67-ln thin" d="${P('M330,68 L330,148')}" marker-end="url(#f67-pa-b)"/>`;
      s += `<g data-low-g class="f67-low"><path class="f67-vsl" d="${P('M90,88 C90,150 90,160 110,198')}" style="stroke:var(--accent);stroke-width:8;fill:none"/><rect class="f67-box" x="${(60 * k).toFixed(0)}" y="198" width="${n ? 92 : 124}" height="34" rx="8"/>${txt((60 * k) + (n ? 46 : 62), 213, 'Parankime giden %10', 'b s', 'middle', n ? 14 : 99)}${n ? '' : txt(122, 226, '', 's')}</g>`;
      s += `<path class="f67-ln dash" d="${P('M150,232 C230,244 330,244 430,70')}" fill="none" opacity=".7"/>`;
      s += txt(10 * k, 54, 'Renal arter', 'c-crit s') + txt(190 * k, 128 + (n ? 0 : 0), 'Glomerül', 'm s', 'middle');
      s += txt(n ? 180 : 330, 108, n ? 'OAT1 ile' : 'OAT1 ile salgı', 'c-basic s', n ? 'start' : 'start') + txt(n ? 180 : 330, 122, n ? 'salgı' : '', 'c-basic s');
      s += txt(n ? 246 : 520, 38, 'Renal ven: PAH ≈ 0', 'a s', 'middle');
      s += txt(n ? 236 : 420, 222, 'İdrar: yoğun PAH', 'w s', n ? 'middle' : 'middle');
      s += txt(4, 18, 'PAH · 194 Da · serbestçe süzülür', 'b c-basic');
      s += '<g class="f67-parts"></g>';
      return s + '</svg>';
    };
    const info = () => { const r = calc(); el.querySelector('[data-q=rpf]').textContent = Math.round(r.rpf) + ' mL/dk'; el.querySelector('[data-q=rbf]').textContent = Math.round(r.rbf) + ' mL/dk'; IN.forEach((x) => { el.querySelector(`[data-o=${x[0]}]`).textContent = fm(V[x[0]], x[0] === 'u' ? 0 : x[0] === 'h' ? 2 : 1); }); return r; };
    const stageUpd = () => { const g = stage.querySelector('[data-low-g]'); if (g) g.classList.toggle('on', low); el.querySelector('[data-low]').setAttribute('aria-pressed', String(low)); };
    const mkP = () => {
      const svg = stage.querySelector('svg'); const pg = svg.querySelector('.f67-parts'); parts = [];
      const k = el.classList.contains('f67-n') ? 0.56 : 1;
      const defsP = [['M10,80 L150,80', 9], ['M226,80 C250,80 250,52 290,52 L430,52', 4], ['M190,118 C190,150 220,160 260,160 L420,160 L420,200', 10], ['M430,52 L610,52', 1]];
      defsP.forEach(([d, c]) => { const m = document.createElementNS('http://www.w3.org/2000/svg', 'path'); m.setAttribute('d', sp(d, k)); const len = m.getTotalLength(); for (let i = 0; i < c; i++) { const e = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); e.setAttribute('r', '2.8'); e.setAttribute('class', 'f67-pt pah'); pg.appendChild(e); parts.push({ m, len, c: e, o: i / c }); } });
      if (RM) { parts.forEach((p, i) => { const q = p.m.getPointAtLength(p.o * p.len); p.c.setAttribute('cx', q.x.toFixed(1)); p.c.setAttribute('cy', q.y.toFixed(1)); }); parts = []; }
    };
    const msg = () => { const r = info(); say(el, `<b>RPF = ${Math.round(r.rpf)} mL/dk, RBF = ${Math.round(r.rbf)} mL/dk.</b> RPF, PAH klirensidir: birim zamanda PAH'tan tamamen temizlenen plazma hacmi. Hematokrit yükseldikçe aynı RPF daha büyük bir RBF'ye karşılık gelir. [[K1 s. 311]]`); };
    const onIn = (e) => { const i = e.target.closest('[data-i]'); if (!i) return; V[i.dataset.i] = +i.value; low = false; stageUpd(); msg(); };
    const onC = (e) => {
      if (!e.target.closest('[data-low]')) return; low = !low; stageUpd();
      if (low) say(el, '<b>Düşük tahmin.</b> RBF\'nin yalnız %90\'ı glomerüle gider; kalanı parankimi besler; oradan PAH tübüle salgılanamaz, idrar klirensi RBF\'yi düşük tahmin eder. Renal arter ve venden örnekleyen Fick yöntemi daha doğrudur ama rutin için fazla invazivdir. [[K1 s. 311]]'); else msg();
    };
    el.addEventListener('input', onIn); el.addEventListener('click', onC);
    info();
    const off = resp(el, (n) => { stage.innerHTML = build(n); mkP(); stageUpd(); });
    const tk = ticker(el, (dt) => { if (RM) return; t += dt; parts.forEach((p) => { const q = p.m.getPointAtLength(((p.o + t * 0.12) % 1) * p.len); p.c.setAttribute('cx', q.x.toFixed(1)); p.c.setAttribute('cy', q.y.toFixed(1)); }); });
    return () => { tk(); off(); el.removeEventListener('input', onIn); el.removeEventListener('click', onC); };
  };
})();
