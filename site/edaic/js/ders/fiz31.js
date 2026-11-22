/* Bölüm 31 · Kardiyak basınç–hacim halkaları · bileşenler (K1 s. 136–140). Tarif: docs/tasarim/fiz31.md
   1 f31_halka       LV halkası: dört evre ve kapak olayları, adım adım (K1 s. 119, 136)
   2 f31_yuk         ön yük, ard yük, kontraktilite → halka, EDPVR, ESPVR (K1 s. 136–138)
   3 f31_is          dış iş, iç iş, PVA ve O₂ gereksinimi (K1 s. 138–139)
   4 f31_sag         RV ile LV halkası aynı eksende (K1 s. 139–140)
   5 f31_yetmezlik   sistolik ve diyastolik yetmezlikte halka (K1 s. 132, 139–140)
   Ortak şematik elastans modeli (D31_MODEL): sayılar temsilîdir, yönler kitaptandır. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (u) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);
  const tam = (v) => String(Math.round(v)).replace('-', '−');
  const ond = (v, d) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const isaretli = (d) => { const r = Math.round(d); return r > 0 ? '+' + r : r < 0 ? '−' + Math.abs(r) : '0'; };
  const yuzde = (d) => { const r = Math.round(d); return r > 0 ? '+%' + r : r < 0 ? '−%' + Math.abs(r) : '%0'; };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let SAYAC = 0; // aynı sayfada tekrar çizilirse SVG kimlikleri çakışmasın
  const kimlik = (ad) => `f31-${ad}-${++SAYAC}`;

  /* ---------- ortak model ---------- */
  const EA0 = 100 / 70, V0 = 10, CV = 0.5;
  const NORM = { F: 120, Ea: EA0, Ees: 2.5, A: 0.585, k: 0.022, fix: 95, fw: 0 };
  const ped = (p, V) => 2 + p.A * (Math.exp(p.k * (V - 10)) - 1);
  function D31_MODEL(q) {
    const p = Object.assign({}, NORM, q);
    const r = p.Ea / (p.Ees + p.Ea);
    let EDV = (p.F + CV * ((1 - r) * V0 - 50)) / (1 - CV * r);
    EDV = lerp(EDV, p.fix, p.fw || 0);
    const ESV = r * EDV + (1 - r) * V0, SV = EDV - ESV, Pes = p.Ea * SV, Pd = 0.8 * Pes;
    const LVEDP = ped(p, EDV), Pe = ped(p, ESV), N = 80, M = 20;
    const dol = [], kas = [], ej = [], gev = [];
    for (let i = 0; i <= N; i++) { const V = lerp(ESV, EDV, i / N); dol.push([V, ped(p, V)]); }
    for (let i = 0; i <= M; i++) kas.push([EDV, lerp(LVEDP, Pd, i / M)]);
    let tepe = 0, tepeV = EDV;
    for (let i = 0; i <= N; i++) { const t = i / N, P = Pd + (Pes - Pd) * t + 0.3 * Pes * Math.sin(Math.PI * t); if (P > tepe) { tepe = P; tepeV = EDV - SV * t; } ej.push([EDV - SV * t, P]); }
    for (let i = 0; i <= M; i++) gev.push([ESV, lerp(Pes, Pe, i / M)]);
    const halka = [...dol, ...kas.slice(1), ...ej.slice(1), ...gev.slice(1, -1)];
    let a = 0;
    for (let i = 0; i < halka.length; i++) { const [x1, y1] = halka[i], [x2, y2] = halka[(i + 1) % halka.length]; a += x1 * y2 - x2 * y1; }
    const dis = Math.abs(a) / 2;
    let I = 0; const h = (ESV - V0) / 100;
    for (let i = 0; i < 100; i++) I += (h * (ped(p, V0 + i * h) + ped(p, V0 + (i + 1) * h))) / 2;
    const ic = 0.5 * (ESV - V0) * Pes - I;
    return { p, EDV, ESV, SV, EF: SV / EDV, Pes, Pd, tepe, tepeV, LVEDP, Pe, dis, ic, pva: dis + ic, dol, kas, ej, gev, halka };
  }
  const MN = D31_MODEL({});
  const ara = (a, b, f) => { const o = {}; for (const k in a) o[k] = lerp(a[k], b[k], f); return o; };

  /* ---------- çizim yardımcıları ---------- */
  function cerceve(g) {
    const X = (v) => g.L + (v / g.vmax) * (g.R - g.L), Y = (p) => g.B - (p / g.pmax) * (g.B - g.T);
    let s = '';
    for (let v = 0; v <= g.vmax + 1e-6; v += g.dx) s += (v > 0 ? `<line class="f31-grid" x1="${X(v)}" x2="${X(v)}" y1="${g.T}" y2="${g.B}"/>` : '') + `<text class="f31-tk" x="${X(v)}" y="${g.B + 16}" text-anchor="middle">${v}</text>`;
    for (let p = 0; p <= g.pmax + 1e-6; p += g.dy) s += (p > 0 ? `<line class="f31-grid" x1="${g.L}" x2="${g.R}" y1="${Y(p)}" y2="${Y(p)}"/>` : '') + `<text class="f31-tk" x="${g.L - 6}" y="${Y(p) + 4}" text-anchor="end">${p}</text>`;
    s += `<line class="f31-axl" x1="${g.L}" x2="${g.R}" y1="${g.B}" y2="${g.B}"/><line class="f31-axl" x1="${g.L}" x2="${g.L}" y1="${g.T}" y2="${g.B}"/>`;
    s += `<text class="f31-ax" x="${(g.L + g.R) / 2}" y="${g.xt || g.B + 33}" text-anchor="middle">${g.xlab || 'Sol ventrikül hacmi (mL)'}</text>`;
    s += `<text class="f31-ax" transform="translate(13 ${(g.T + g.B) / 2}) rotate(-90)" text-anchor="middle">${g.ylab || 'Sol ventrikül basıncı (mmHg)'}</text>`;
    return { X, Y, s };
  }
  const yol = (pts, X, Y, kapa) => pts.map((q, i) => (i ? 'L' : 'M') + X(q[0]).toFixed(1) + ' ' + Y(q[1]).toFixed(1)).join(' ') + (kapa ? ' Z' : '');
  // çok satırlı etiket ("\n" ile)
  const yazi = (x, y, t, cls, anc, ek) => {
    const sat = String(t).split('\n');
    return `<text${ek ? ' ' + ek : ''} class="f31-lb f31-halo ${cls || ''}" x="${x}" y="${y}" text-anchor="${anc || 'start'}">${sat.map((s, i) => `<tspan x="${x}" dy="${i ? '1.15em' : 0}">${esc(s)}</tspan>`).join('')}</text>`;
  };
  const okMarker = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="${cls || 'f31-okuc'}" d="M0 0 L10 5 L0 10 Z"/></marker>`;
  const kapId = (el) => el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap');
  function aciklama(el) {
    const cap = kapId(el); let son = cap ? cap.innerHTML : '', ham = null;
    return (t) => { if (!cap || t === ham) return; ham = t; const h = REF(t); if (h !== son) { cap.innerHTML = h; son = h; } };
  }
  // parametre geçişi (RM'de anında)
  function gecis(ms, f, bitti) {
    if (RM || ms <= 0) { f(1); if (bitti) bitti(); return () => {}; }
    let raf = 0, t0 = 0;
    const d = (t) => { if (!t0) t0 = t; const u = Math.min(1, (t - t0) / ms); f(ease(u)); if (u < 1) raf = requestAnimationFrame(d); else if (bitti) bitti(); };
    raf = requestAnimationFrame(d);
    return () => cancelAnimationFrame(raf);
  }
  // kapsayıcı 560 px altındaysa dar yerleşim; eşik aşılınca yeniden kur
  function duyarli(el, kur) {
    let dar = null, temiz = () => {};
    const calis = () => { const d = el.clientWidth < 560; if (d === dar) return; dar = d; temiz(); temiz = kur(d) || (() => {}); };
    calis();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(calis) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); temiz(); };
  }
  const segHtml = (ad, opts) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-d="${v}" aria-pressed="false">${l}</button>`).join('')}</div>`;
  const segBas = (el, v) => el.querySelectorAll('.seg [data-d]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.d === v)));
  // ESPVR doğrusunun grafik içindeki üst ucu
  const espvrUc = (Ees, vmax, pmax) => { const V = Math.min(vmax, V0 + pmax / Ees); return [V, Ees * (V - V0)]; };
  const edpvrNok = (p, vmax) => { const o = []; for (let V = 10; V <= vmax + 0.01; V += 2) o.push([V, ped(p, V)]); return o; };
  // yay oku: V0 çevresinde, normal ESPVR açısından yeni açıya
  function yay(X, Y, Ees1, Ees2, r) {
    const cx = X(V0), cy = Y(0);
    const aci = (E) => { const [v, q] = [V0 + 20, E * 20]; return Math.atan2(Y(q) - cy, X(v) - cx); };
    const a1 = aci(Ees1), a2 = aci(Ees2);
    const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)], p2 = [cx + r * Math.cos(a2), cy + r * Math.sin(a2)];
    const sweep = a2 > a1 ? 1 : 0;
    return { d: `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A${r} ${r} 0 0 ${sweep} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`, uc: p2, orta: [cx + (r + 8) * Math.cos((a1 + a2) / 2), cy + (r + 8) * Math.sin((a1 + a2) / 2)] };
  }
  // halka üzerinde kesir f'deki nokta
  const uzerinde = (pts, f) => { const x = clamp(f, 0, 1) * (pts.length - 1), i = Math.floor(x), u = x - i; return i + 1 < pts.length ? [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)] : pts[i]; };

  /* ================= 1 · f31_halka ================= */
  const H_ADIM = [
    { ad: 'Doluş sonu', cap: '<b>Diyastol sonu.</b> Ventrikül 120 mL kanla dolmuş, basıncı düşüktür (LVEDP). Mitral kapak kapanmak üzere. Oynatın ya da evreleri tek tek izleyin. [[K1 s. 136]] [[K1 s. 119]]', m: 'kapaniyor', a: 'kapali' },
    { ad: 'İzovolümetrik kasılma', cap: '<b>İzovolümetrik kasılma.</b> Mitral kapak kapandı, aort kapağı henüz kapalı: ventrikül kasılır, basıncı hacim değişmeden yükselir. Halkanın sağ kenarı dikeydir. [[K1 s. 136]]', m: 'kapali', a: 'kapali', seg: 'kas', sure: 0.6 },
    { ad: 'Ejeksiyon', cap: '<b>Ejeksiyon.</b> Basınç diyastolik kan basıncını (≈ 80 mmHg) aşınca aort kapağı açılır ve atım hacmi aorta atılır. Üst kenarın tepesi sistolik kan basıncıdır (≈ 120 mmHg). [[K1 s. 136]]', m: 'kapali', a: 'acik', seg: 'ej', sure: 1.8 },
    { ad: 'İzovolümetrik gevşeme', cap: '<b>İzovolümetrik gevşeme.</b> Aort kapağı kapanır; ventrikül gevşer, basıncı yine hacim değişmeden düşer. Ventrikülde 50 mL kalır: LVESV. [[K1 s. 136]] [[K1 s. 119]]', m: 'kapali', a: 'kapali', seg: 'gev', sure: 0.6 },
    { ad: 'Diyastolik doluş', cap: '<b>Diyastolik doluş.</b> Basınç sol atriyum basıncının altına inince mitral kapak açılır; ventrikül EDPVR boyunca dolar ve sonraki kasılmaya hazırlanır. [[K1 s. 119, 136–137]]', m: 'acik', a: 'kapali', seg: 'dol', sure: 2.4 },
    { ad: 'Özet', cap: '<b>Halkanın kenarları.</b> Sağ kenar LVEDV (120 mL), sol kenar LVESV (50 mL); genişlik atım hacmidir: 120 − 50 = 70 mL, EF 70/120 ≈ %58. Normal LV halkası yaklaşık dikdörtgendir. [[K1 s. 119, 136–137]]', m: 'kapaniyor', a: 'kapali', sure: 1.4 },
  ];
  const H_BAS = [0]; for (let i = 1; i <= 5; i++) H_BAS[i] = H_BAS[i - 1] + (i > 1 ? H_ADIM[i - 1].sure : 0);
  // H_BAS[s] = s. adımın başladığı an (adım 1: 0 s); bir tur = 6,8 s (5. adım 1,4 s bekler)
  const H_TUR = H_BAS[5] + H_ADIM[5].sure;
  const KAPAK = { acik: 'açık', kapali: 'kapalı', kapaniyor: 'açık → kapanıyor' };

  VIZ.f31_halka = (el) => {
    let adim = RM ? 5 : 0, zaman = 0, oyn = false, zamanli = false, turBitti = RM, akis = 0;
    const capYaz = aciklama(el);
    return duyarli(el, (dar) => {
      const g = dar ? { L: 46, R: 350, T: 14, B: 252, vmax: 160, pmax: 140, dx: 40, dy: 20 } : { L: 52, R: 440, T: 20, B: 290, vmax: 160, pmax: 140, dx: 20, dy: 20 };
      const W = dar ? 360 : 460, H = dar ? 300 : 340;
      const { X, Y, s } = cerceve(g);
      const m = MN, SEG = { kas: m.kas, ej: m.ej, gev: m.gev, dol: m.dol };
      const kose = dar
        ? [[m.EDV, m.LVEDP, 'Mitral\nkapanır', 8, -2, 'start'], [m.EDV, m.Pd, 'Aort\naçılır', 8, -8, 'start'], [m.ESV, m.Pes, 'Aort\nkapanır', -8, -10, 'end'], [m.ESV, m.Pe, 'Mitral\naçılır', -8, -20, 'end']]
        : [[m.EDV, m.LVEDP, 'Mitral kapak\nkapanır', 9, -16, 'start'], [m.EDV, m.Pd, 'Aort kapağı\naçılır', 9, -8, 'start'], [m.ESV, m.Pes, 'Aort kapağı\nkapanır', -9, -6, 'end'], [m.ESV, m.Pe, 'Mitral kapak\naçılır', -9, -26, 'end']];
      const evre = dar ? '' : [
        yazi(X(m.EDV) + 10, Y(44) - 4, 'İzovolümetrik\nkasılma', 'f31-evre', 'start', 'data-e="1"'),
        yazi(X(m.tepeV), Y(m.tepe) - 10, 'Ejeksiyon', 'f31-evre', 'middle', 'data-e="2"'),
        yazi(X(m.ESV) - 10, Y(52) - 4, 'İzovolümetrik\ngevşeme', 'f31-evre', 'end', 'data-e="3"'),
        yazi(X(85), Y(5) - 9, 'Diyastolik doluş', 'f31-evre', 'middle', 'data-e="4"'),
      ].join('');
      const okId = kimlik('sv');
      const svYk = dar ? 34 : 30;
      el.innerHTML = `<div class="f31-hk${dar ? ' dar' : ''}">
        <svg class="f31-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sol ventrikül basınç–hacim halkası: x ekseni hacim, y ekseni basınç; dört evre ve dört kapak olayı">
          <defs>${okMarker(okId)}</defs>
          ${s}
          <g class="f31-yard">
            <line x1="${g.L}" x2="${g.R}" y1="${Y(80)}" y2="${Y(80)}"/><line x1="${g.L}" x2="${g.R}" y1="${Y(121)}" y2="${Y(121)}"/>
            <line x1="${X(50)}" x2="${X(50)}" y1="${g.T}" y2="${g.B}"/><line x1="${X(120)}" x2="${X(120)}" y1="${g.T}" y2="${g.B}"/>
            <line x1="${g.L}" x2="${X(120)}" y1="${Y(m.LVEDP)}" y2="${Y(m.LVEDP)}"/>
          </g>
          ${yazi(g.L + 5, Y(80) - 5, 'Diyastolik KB 80', 'f31-yk')}
          ${yazi(g.L + 5, Y(121) - 5, 'Sistolik KB ≈ 120', 'f31-yk')}
          ${yazi(X(50), g.T + 13, 'LVESV 50 mL', 'f31-yk', 'middle')}
          ${yazi(X(120), g.T + 13, 'LVEDV 120 mL', 'f31-yk', 'middle')}
          ${yazi(g.L + 5, Y(m.LVEDP) - 5, 'LVEDP ≈ 8', 'f31-yk')}
          <path class="f31-dolgu" d="${yol(m.halka, X, Y, true)}"/>
          ${['kas', 'ej', 'gev', 'dol'].map((k) => `<path class="f31-kenar" data-k="${k}" d="${yol(SEG[k], X, Y)}"/>`).join('')}
          <path class="f31-iz" d=""/>
          ${evre}
          <g class="f31-sv">
            <line class="f31-svok" x1="${X(50) + 3}" x2="${X(120) - 3}" y1="${Y(svYk)}" y2="${Y(svYk)}" marker-start="url(#${okId})" marker-end="url(#${okId})"/>
            ${yazi(X(85), Y(svYk) - 7, 'SV 70 mL', 'f31-svlb', 'middle')}
          </g>
          ${kose.map(([v, p, t, dx, dy, an]) => `<circle class="f31-kose" cx="${X(v)}" cy="${Y(p)}" r="4"/>` + yazi(X(v) + dx, Y(p) + dy, t, 'f31-ks', an)).join('')}
          <circle class="f31-nokta" r="6"/>
        </svg>
        <div class="f31-yan">
          <svg class="f31-sema" viewBox="0 0 200 240" role="img" aria-label="Ventrikül şeması: mitral ve aort kapakları, hacimle büyüyüp küçülen ventrikül">
            <text class="f31-sl" x="62" y="12" text-anchor="middle">Mitral</text><text class="f31-sl" x="138" y="12" text-anchor="middle">Aort</text>
            <path class="f31-damar" d="M40 18 V40 M84 18 V40 M116 18 V40 M160 18 V40"/>
            <path class="f31-kese" d=""/>
            <text class="f31-kesev" x="100" text-anchor="middle"></text>
            <g class="f31-yap" data-v="m"><line/><line/></g><g class="f31-yap" data-v="a"><line/><line/></g>
            <g class="f31-akis"><path/><path/><path/></g>
          </svg>
          <dl class="f31-kv">
            <div><dt>Hacim</dt><dd data-o="v"></dd></div><div><dt>Basınç</dt><dd data-o="p"></dd></div>
            <div><dt>Mitral</dt><dd data-o="m"></dd></div><div><dt>Aort</dt><dd data-o="a"></dd></div>
          </dl>
        </div>
      </div>
      <div class="phase f31-faz">${H_ADIM.slice(0, 5).map((a) => `<div>${a.ad}</div>`).join('')}</div>
      <div class="btn-row f31-dn">
        <button type="button" class="btn" data-a="oyn" aria-pressed="false"${RM ? ' disabled' : ''}>Oynat</button>
        <button type="button" class="btn ghost" data-a="geri">Önceki</button>
        <button type="button" class="btn ghost" data-a="ileri">Sonraki</button>
      </div>`;
      const $ = (q) => el.querySelector(q);
      const nokta = $('.f31-nokta'), iz = $('.f31-iz'), dolgu = $('.f31-dolgu'), sv = $('.f31-sv'), kese = $('.f31-kese'), kesev = $('.f31-kesev');
      const oynB = $('[data-a="oyn"]'), faz = [...el.querySelectorAll('.f31-faz div')];
      const yap = { m: el.querySelectorAll('[data-v="m"] line'), a: el.querySelectorAll('[data-v="a"] line') };
      const akisP = [...el.querySelectorAll('.f31-akis path')];
      const o = (k) => el.querySelector(`[data-o="${k}"]`);
      const kapakCiz = (v, d) => {
        const cx = v === 'm' ? 62 : 138, y = 40, yon = v === 'm' ? 1 : -1;
        const aci = d === 'acik' ? 72 : d === 'kapaniyor' ? 34 : 0, r = (aci * Math.PI) / 180;
        [[cx - 22, 1], [cx + 22, -1]].forEach(([hx, s], i) => {
          const l = yap[v][i];
          l.setAttribute('x1', hx); l.setAttribute('y1', y);
          l.setAttribute('x2', (hx + s * 22 * Math.cos(r)).toFixed(1)); l.setAttribute('y2', (y + yon * 22 * Math.sin(r)).toFixed(1));
          l.setAttribute('class', d === 'kapali' ? 'kapali' : 'acik');
        });
      };
      // zaman → (adım, kesir)
      const zamandan = (t) => { for (let s = 1; s <= 5; s++) if (t < H_BAS[s] + H_ADIM[s].sure) return [s, (t - H_BAS[s]) / H_ADIM[s].sure]; return [5, 1]; };
      let sonAdim = -1;
      const ciz = () => {
        let s = adim, f = 1;
        if (zamanli) [s, f] = zamandan(zaman);
        const A = H_ADIM[s];
        const [V, P] = A.seg ? uzerinde(SEG[A.seg], f) : [m.EDV, m.LVEDP];
        nokta.setAttribute('cx', X(V).toFixed(1)); nokta.setAttribute('cy', Y(P).toFixed(1));
        if (A.seg) { const pts = SEG[A.seg], n = Math.max(1, Math.round(f * (pts.length - 1))); iz.setAttribute('d', yol([...pts.slice(0, n), [V, P]], X, Y)); } else iz.setAttribute('d', '');
        el.querySelectorAll('.f31-kenar').forEach((k) => k.classList.toggle('on', k.dataset.k === A.seg));
        el.querySelectorAll('[data-e]').forEach((t) => t.classList.toggle('on', +t.dataset.e === s));
        const dolu = s === 5 || turBitti;
        dolgu.classList.toggle('on', dolu); sv.classList.toggle('on', dolu);
        faz.forEach((d, i) => { d.classList.toggle('on', i === s); d.classList.toggle('past', i < s); });
        // şema
        const fr = clamp((V - 50) / 70, 0, 1.2), sy = 0.6 + 0.4 * fr, sx = 0.82 + 0.18 * fr;
        kese.setAttribute('d', `M${(100 - 66 * sx).toFixed(1)} 44 C${(100 - 74 * sx).toFixed(1)} ${(44 + 60 * sy).toFixed(1)} ${(100 - 40 * sx).toFixed(1)} ${(44 + 150 * sy).toFixed(1)} 100 ${(44 + 176 * sy).toFixed(1)} C${(100 + 40 * sx).toFixed(1)} ${(44 + 150 * sy).toFixed(1)} ${(100 + 74 * sx).toFixed(1)} ${(44 + 60 * sy).toFixed(1)} ${(100 + 66 * sx).toFixed(1)} 44 Z`);
        kesev.setAttribute('y', (44 + 92 * sy).toFixed(1)); kesev.textContent = `${tam(V)} mL`;
        kapakCiz('m', A.m); kapakCiz('a', A.a);
        const ak = A.seg === 'dol' ? 'dol' : A.seg === 'ej' ? 'ej' : '';
        akisP.forEach((p, i) => {
          if (!ak) { p.setAttribute('d', ''); return; }
          const u = ((RM ? 0.5 : akis) + i / 3) % 1;
          if (ak === 'dol') { const y = 22 + u * 62; p.setAttribute('d', `M56 ${(y - 5).toFixed(1)} L62 ${(y + 2).toFixed(1)} L68 ${(y - 5).toFixed(1)}`); }
          else { const y = 92 - u * 80; p.setAttribute('d', `M132 ${(y + 5).toFixed(1)} L138 ${(y - 2).toFixed(1)} L144 ${(y + 5).toFixed(1)}`); }
        });
        o('v').textContent = `${tam(V)} mL`; o('p').textContent = `${tam(P)} mmHg`;
        o('m').textContent = KAPAK[A.m]; o('a').textContent = KAPAK[A.a];
        o('m').className = A.m === 'kapali' ? 'kapali' : 'acik'; o('a').className = A.a === 'kapali' ? 'kapali' : 'acik';
        if (s !== sonAdim) { sonAdim = s; capYaz(A.cap); }
      };
      const oynat = (on) => {
        oyn = on && !RM;
        if (oyn && !zamanli) zaman = adim === 0 || adim === 5 ? 0 : H_BAS[adim] + H_ADIM[adim].sure;
        if (oyn) zamanli = true;
        oynB.textContent = oyn ? 'Duraklat' : 'Oynat'; oynB.setAttribute('aria-pressed', String(oyn));
        ciz();
      };
      el.querySelector('.f31-dn').addEventListener('click', (e) => {
        const b = e.target.closest('[data-a]'); if (!b) return;
        if (b.dataset.a === 'oyn') { oynat(!oyn); return; }
        if (zamanli) { adim = zamandan(zaman)[0]; zamanli = false; }
        oynat(false);
        adim = b.dataset.a === 'ileri' ? Math.min(5, adim + 1) : Math.max(0, adim - 1);
        if (adim < 5) turBitti = false;
        ciz();
      });
      if (oyn) { oynB.textContent = 'Duraklat'; oynB.setAttribute('aria-pressed', 'true'); }
      const dur = ticker(el, (dt) => {
        if (RM) return;
        akis = (akis + dt * 0.9) % 1;
        if (oyn) { zaman += dt; if (zaman >= H_BAS[5]) turBitti = true; if (zaman >= H_TUR) zaman -= H_TUR; ciz(); }
        else if (!zamanli && (H_ADIM[adim].seg === 'dol' || H_ADIM[adim].seg === 'ej')) ciz();
      });
      ciz();
      return dur;
    });
  };

  /* ================= ortak LV grafiği (f31_yuk, f31_is, f31_yetmezlik) ================= */
  const GENIS = { W: 480, H: 360, L: 56, R: 466, T: 16, B: 310, vmax: 200, pmax: 180, dx: 20, dy: 20 };
  const DAR = { W: 360, H: 320, L: 46, R: 350, T: 14, B: 272, vmax: 200, pmax: 180, dx: 40, dy: 40 };

  /* ================= 2 · f31_yuk ================= */
  const Y_DURUM = {
    N: { ad: 'Normal', q: { F: 120, Ea: EA0, Ees: 2.5 }, cap: '<b>Normal.</b> LVEDV 120 mL, LVESV 50 mL, SV 70 mL. Bir durumu seçin ya da kaydırıcılarla ön yükü, ard yükü ve kontraktiliteyi değiştirin; soluk halka normali gösterir. [[K1 s. 136–138]]' },
    on: { ad: 'Ön yük ↑', q: { F: 135, Ea: EA0, Ees: 2.5 }, cap: '<b>Ön yük ↑.</b> Diyastol sonu köşesi EDPVR boyunca sağa kayar: daha çok gerilen sarkomerler daha güçlü kasılır, halka genişler, SV artar (Starling). Artan debi aort basıncını yükselttiği için LVESV de hafifçe artar. [[K1 s. 136–137]]' },
    ard: { ad: 'Ard yük ↑', q: { F: 120, Ea: EA0 * 1.3, Ees: 2.5 }, cap: '<b>Ard yük ↑.</b> Ejeksiyon daha yüksek basınçta biter; sarkomerler daha yavaş ve daha az kısalır, LVESV artar. Kalan kana venöz dönüş eklenince LVEDV de artar ama daha az: SV hafifçe düşer, halka uzun ve dar. [[K1 s. 137]]' },
    kon: { ad: 'Kontraktilite ↑', q: { F: 120, Ea: EA0, Ees: 3.5 }, cap: '<b>Kontraktilite ↑.</b> ESPVR dikleşir; daha güçlü kasılma ek kan atar, LVESV düşer. Venöz dönüş eklenince LVEDV hafifçe düşer; LVESV daha çok düştüğü için SV artar. [[K1 s. 137–138]]' },
  };
  const carpan = (Ea) => { const c = Math.round((Ea / EA0) * 100) / 100; return '×' + (Math.abs(c * 10 - Math.round(c * 10)) < 1e-6 ? ond(c, 1) : ond(c, 2)); };
  function okuSatir(ad, deger, normal, fark, sinif) {
    return `<div><dt>${ad}</dt><dd><b>${deger}</b><span class="f31-nrm">${normal}</span>${fark !== '' ? `<span class="f31-fark ${sinif}">${fark}</span>` : ''}</dd></div>`;
  }
  const farkS = (a, b) => { const d = a - b; return Math.abs(d) < 1 ? ['≈', 'esit'] : [isaretli(d), d > 0 ? 'up' : 'dn']; };

  VIZ.f31_yuk = (el) => {
    let q = Object.assign({}, Y_DURUM.N.q), sec = 'N', durGecis = () => {};
    const capYaz = aciklama(el);
    const temizle = duyarli(el, (dar) => {
      const g = dar ? DAR : GENIS, { X, Y, s } = cerceve(g);
      const kirp = kimlik('kirp-yuk'), ok = kimlik('ok');
      const edp = edpvrNok(NORM, 200), edA = edp.filter((x) => x[0] <= 160.01), edB = edp.filter((x) => x[0] >= 160);
      const espN = espvrUc(2.5, 200, 180);
      el.innerHTML = `<div class="f31-ust">${segHtml('Durum', Object.entries(Y_DURUM).map(([k, d]) => [k, d.ad]))}<button type="button" class="btn ghost f31-sifir" data-a="sifir">Normale dön</button></div>
        <div class="f31-ikili${dar ? ' dar' : ''}">
          <svg class="f31-svg" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Basınç–hacim grafiği: EDPVR eğrisi, ESPVR doğrusu, normal ve geçerli halka">
            <defs><clipPath id="${kirp}"><rect x="${g.L}" y="${g.T}" width="${g.R - g.L}" height="${g.B - g.T}"/></clipPath>${okMarker(ok, 'f31-okuc2')}</defs>
            ${s}
            <g clip-path="url(#${kirp})">
              <path class="f31-edpvr" d="${yol(edA, X, Y)}"/><path class="f31-edpvr kalin" d="${yol(edB, X, Y)}"/>
              <line class="f31-espvr f31-espN" x1="${X(V0)}" y1="${Y(0)}" x2="${X(espN[0])}" y2="${Y(espN[1])}"/>
              <line class="f31-espvr f31-espC" x1="${X(V0)}" y1="${Y(0)}"/>
              <path class="f31-norm" d="${yol(MN.halka, X, Y, true)}"/>
              <path class="f31-cur" d=""/>
            </g>
            ${yazi(X(200) - 2, Y(ped(NORM, 200)) - 8, 'EDPVR', 'f31-edlb', 'end')}
            ${dar ? '' : yazi(X(176), Y(ped(NORM, 176)) - 14, 'kompliyans azalır', 'f31-edlb f31-kucuk', 'end')}
            <text class="f31-lb f31-halo f31-esplb" text-anchor="end">ESPVR</text>
            <path class="f31-yay" marker-end="url(#${ok})" d=""/>
            <g class="f31-oklar"></g>
            <line class="f31-svN" marker-start="url(#${ok})" marker-end="url(#${ok})"/>
            <line class="f31-svC" marker-start="url(#${ok})" marker-end="url(#${ok})"/>
            <text class="f31-lb f31-halo f31-svNt" text-anchor="middle"></text>
            <text class="f31-lb f31-halo f31-svCt" text-anchor="middle"></text>
            <circle class="f31-kose c" data-k="es" r="4"/><circle class="f31-kose c" data-k="ed" r="4"/>
            <g class="f31-notlar"></g>
            <text class="f31-durum" x="${g.R - 4}" y="${g.T + 14}" text-anchor="end"></text>
          </svg>
          <div class="f31-panel">
            <label class="f31-rng"><span>Ön yük (doluş) <b data-o="F"></b></span><input type="range" min="90" max="170" step="5" data-r="F" aria-label="Ön yük (doluş)"></label>
            <label class="f31-rng"><span>Ard yük <b data-o="Ea"></b></span><input type="range" min="0.7" max="1.6" step="0.05" data-r="Ea" aria-label="Ard yük, normalin katı"></label>
            <label class="f31-rng"><span>Kontraktilite (ESPVR eğimi) <b data-o="Ees"></b></span><input type="range" min="1" max="4" step="0.1" data-r="Ees" aria-label="Kontraktilite, ESPVR eğimi"></label>
            <dl class="f31-oku"></dl>
          </div>
        </div>`;
      const $ = (k) => el.querySelector(k);
      const rng = { F: $('[data-r="F"]'), Ea: $('[data-r="Ea"]'), Ees: $('[data-r="Ees"]') };
      const svY = (p) => Y(p);
      const ciz = () => {
        const m = D31_MODEL(q);
        $('.f31-cur').setAttribute('d', yol(m.halka, X, Y, true));
        const u = espvrUc(q.Ees, 200, 180), espC = $('.f31-espC');
        espC.setAttribute('x2', X(u[0])); espC.setAttribute('y2', Y(u[1]));
        const lb = $('.f31-esplb'); lb.setAttribute('x', X(u[0]) - 6); lb.setAttribute('y', Y(u[1]) + 14);
        const degisti = Math.abs(q.Ees - 2.5) > 0.04;
        $('.f31-espN').style.display = degisti ? '' : 'none';
        const yy = $('.f31-yay');
        if (degisti) { const a = yay(X, Y, 2.5, q.Ees, dar ? 62 : 84); yy.setAttribute('d', a.d); } else yy.setAttribute('d', '');
        // köşeler
        const es = $('[data-k="es"]'), ed = $('[data-k="ed"]');
        es.setAttribute('cx', X(m.ESV)); es.setAttribute('cy', Y(m.Pes)); ed.setAttribute('cx', X(m.EDV)); ed.setAttribute('cy', Y(m.LVEDP));
        // değişim okları
        let oklar = '';
        const okla = (v1, p1, v2, p2) => { const dx = X(v2) - X(v1), dy = Y(p2) - Y(p1), L = Math.hypot(dx, dy); if (L < 7) return; oklar += `<line class="f31-degok" x1="${X(v1).toFixed(1)}" y1="${Y(p1).toFixed(1)}" x2="${(X(v2) - (dx / L) * 5).toFixed(1)}" y2="${(Y(p2) - (dy / L) * 5).toFixed(1)}" marker-end="url(#${ok})"/>`; };
        okla(MN.EDV, MN.LVEDP, m.EDV, m.LVEDP); okla(MN.ESV, MN.Pes, m.ESV, m.Pes);
        $('.f31-oklar').innerHTML = oklar;
        // SV okları
        const fark = Math.abs(m.SV - 70) > 0.6 || Math.abs(m.ESV - 50) > 0.6;
        const yN = dar ? 22 : 20, yC = dar ? 46 : 40;
        const svN = $('.f31-svN'), svC = $('.f31-svC'), tN = $('.f31-svNt'), tC = $('.f31-svCt');
        svN.style.display = tN.style.display = fark ? '' : 'none';
        [[svN, tN, MN, yN, 'SV 70'], [svC, tC, m, yC, `SV ${tam(m.SV)}`]].forEach(([l, t, mm, yp, txt]) => {
          l.setAttribute('x1', X(mm.ESV) + 3); l.setAttribute('x2', X(mm.EDV) - 3); l.setAttribute('y1', svY(yp)); l.setAttribute('y2', svY(yp));
          t.setAttribute('x', (X(mm.ESV) + X(mm.EDV)) / 2); t.setAttribute('y', svY(yp) - 6); t.textContent = txt;
        });
        // notlar
        let n = [];
        const tepeX = X(m.tepeV), tepeY = Y(m.tepe);
        const sag = (t, dy) => [X(m.EDV) + 9, Y(m.LVEDP) + dy, t, 'start'];
        if (sec === 'on') n = dar ? [sag('LVEDV artar', -6)] : [sag('LVEDP artar', -4), [X(m.EDV) + 9, Y(50), 'LVEDV artar', 'start'], [tepeX, tepeY - 12, 'Sistolik ve diyastolik KB hafifçe artar', 'middle']];
        else if (sec === 'ard') n = [[tepeX, tepeY - 12, 'Sistolik ve diyastolik KB artar', 'middle']];
        else if (sec === 'kon') n = dar ? [[X(m.ESV) - 9, Y(m.Pes) + 22, 'LVESV düşer', 'end']] : [[X(u[0]) - 46, Y(u[1]) + 30, 'ESPVR dikleşir', 'end'], [X(m.ESV) - 9, Y(m.Pes) + 26, 'LVESV düşer', 'end'], [X(m.EDV) + 9, Y(m.LVEDP) - 4, 'LVEDV hafifçe düşer', 'start']];
        if (sec !== 'N' && sec) { const svt = sec === 'ard' ? 'SV azalır' : 'SV artar'; tC.textContent = `SV ${tam(m.SV)} · ${svt}`; }
        $('.f31-notlar').innerHTML = n.map(([x, y, t, a]) => yazi(x.toFixed(1), y.toFixed(1), t, 'f31-not', a)).join('');
        $('.f31-durum').textContent = sec ? (sec === 'N' ? '' : Y_DURUM[sec].ad) : 'Kendi ayarınız';
        // okumalar
        const r = (a, b) => farkS(a, b);
        const [fe, ce] = r(m.EDV, 120), [fs, cs] = r(m.ESV, 50), [fv, cv] = r(m.SV, 70), [fp, cp] = r(m.LVEDP, MN.LVEDP);
        const efD = Math.round(m.EF * 100), [ff, cf] = r(efD, 58);
        $('.f31-oku').innerHTML = okuSatir('LVEDV', `${tam(m.EDV)} mL`, 'normal 120', fe, ce) + okuSatir('LVESV', `${tam(m.ESV)} mL`, 'normal 50', fs, cs)
          + okuSatir('SV', `${tam(m.SV)} mL`, 'normal 70', fv, cv) + okuSatir('EF', `%${efD}`, 'normal %58', ff === '≈' ? '' : ff, cf)
          + okuSatir('Diyastolik / sistolik KB', `${tam(m.Pd)} / ${tam(m.tepe)} mmHg`, 'normal 80 / 121', '', '') + okuSatir('LVEDP', `${tam(m.LVEDP)} mmHg`, 'normal 8', fp, cp);
        // kaydırıcılar
        rng.F.value = q.F; rng.Ea.value = q.Ea / EA0; rng.Ees.value = q.Ees;
        $('[data-o="F"]').textContent = `LVEDV ${tam(m.EDV)} mL`; $('[data-o="Ea"]').textContent = carpan(q.Ea); $('[data-o="Ees"]').textContent = `${ond(q.Ees, 1)} mmHg/mL`;
        segBas(el, sec || '');
        if (sec) capYaz(Y_DURUM[sec].cap);
        else capYaz(`<b>Kendi ayarınız.</b> LVEDV ${tam(m.EDV)} mL, LVESV ${tam(m.ESV)} mL, SV ${tam(m.SV)} mL, EF %${efD}. Ön yük köşeyi EDPVR boyunca, ard yük ESPVR boyunca taşır; kontraktilite ESPVR'nin kendisini döndürür. [[K1 s. 137–138]]` + (q.F > 155 ? ' Bu hacimde EDPVR dikleşir: miyokarttaki elastik proteinler ve bağ dokusu elastik sınırına yaklaşır, LVEDP hızla yükselir. [[K1 s. 137]]' : ''));
      };
      const git = (k) => {
        durGecis(); sec = k;
        const a = Object.assign({}, q), b = Y_DURUM[k].q;
        durGecis = gecis(600, (f) => { q = ara(a, b, f); ciz(); });
      };
      el.addEventListener('click', (e) => {
        const b = e.target.closest('.seg [data-d]'); if (b) { git(b.dataset.d); return; }
        if (e.target.closest('[data-a="sifir"]')) git('N');
      });
      el.addEventListener('input', (e) => {
        const r = e.target.closest('[data-r]'); if (!r) return;
        durGecis(); sec = null;
        const v = +r.value; if (r.dataset.r === 'Ea') q.Ea = v * EA0; else q[r.dataset.r] = v;
        ciz();
      });
      ciz();
      return () => durGecis();
    });
    return () => { durGecis(); temizle(); };
  };

  /* ================= 3 · f31_is ================= */
  const I_DURUM = {
    N: { ad: 'Normal', q: {}, cap: '<b>Normal.</b> Halkanın alanı dış iştir (atım işi); ESPVR, EDPVR ve izovolümetrik gevşeme çizgisi arasındaki alan iç iştir. İkisinin toplamı PVA\'dır. Ön yük, ard yük ya da kontraktiliteyi artırın: hangi alan büyüyor? [[K1 s. 138–139]]' },
    on: { ad: 'Ön yük ↑', q: { F: 135 }, cap: '<b>Ön yük ↑.</b> Halka genişler: dış iş belirgin artar, miyokardın O₂ gereksinimi yükselir. [[K1 s. 139]]' },
    ard: { ad: 'Ard yük ↑', q: { Ea: EA0 * 1.3 }, cap: '<b>Ard yük ↑.</b> Halka uzar ve daralır: dış iş belirgin artmaz (burada ≈ %15), ama sistol sonu köşesi ESPVR üzerinde yükseldiği için iç iş belirgin artar. O₂ gereksinimi artar. [[K1 s. 139]]' },
    kon: { ad: 'Kontraktilite ↑', q: { Ees: 3.5 }, cap: '<b>Kontraktilite ↑.</b> Sistol sonu köşesi sola kayar: iç iş artmaz (burada biraz azalır), dış iş artar. Toplamda miyokardın O₂ tüketimi yine artar. [[K1 s. 139]]' },
  };
  const temel = (o) => ({ F: 120, Ea: EA0, Ees: 2.5, ...o });

  VIZ.f31_is = (el) => {
    let sec = 'N', q = temel({}), goster = { dis: true, ic: true }, durGecis = () => {};
    const capYaz = aciklama(el);
    const temizle = duyarli(el, (dar) => {
      const g = dar ? DAR : GENIS, { X, Y, s } = cerceve(g);
      const kirp = kimlik('kirp-is'), tar = kimlik('tarama');
      const edp = edpvrNok(NORM, 200);
      const sat = (k, ad, cls) => `<div class="f31-bar" data-k="${k}"><div class="f31-bar-h"><span>${ad}</span><b></b></div><div class="f31-trk"><i class="n"></i>${k === 'pva' ? '<i class="c ok"></i><i class="c warn"></i>' : `<i class="c ${cls}"></i>`}</div></div>`;
      el.innerHTML = `<div class="f31-ust">${segHtml('Durum', Object.entries(I_DURUM).map(([k, d]) => [k, d.ad]))}
          <div class="f31-chk" role="group" aria-label="Alanları göster"><label><input type="checkbox" data-c="dis" ${goster.dis ? 'checked' : ''}> Dış iş</label><label><input type="checkbox" data-c="ic" ${goster.ic ? 'checked' : ''}> İç iş</label></div></div>
        <div class="f31-ikili${dar ? ' dar' : ''}">
          <svg class="f31-svg" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Basınç–hacim grafiği: halkanın alanı dış iş, ESPVR, EDPVR ve izovolümetrik gevşeme çizgisi arasındaki alan iç iş">
            <defs><clipPath id="${kirp}"><rect x="${g.L}" y="${g.T}" width="${g.R - g.L}" height="${g.B - g.T}"/></clipPath>
              <pattern id="${tar}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="f31-tarcz" x1="0" y1="0" x2="0" y2="6"/></pattern></defs>
            ${s}
            <g clip-path="url(#${kirp})">
              <path class="f31-edpvr" d="${yol(edp, X, Y)}"/>
              <line class="f31-espvr f31-espC" x1="${X(V0)}" y1="${Y(0)}"/>
              <path class="f31-norm" d="${yol(MN.halka, X, Y, true)}"/>
              <g class="f31-ga" data-g="dis"><path class="f31-disA" d=""/></g>
              <g class="f31-ga" data-g="ic"><path class="f31-icA" d=""><title>İç iş: kısalma olmadan harcanan enerji; diyastolde ısıya dönüşür (K1 s. 138)</title></path><path class="f31-icT" fill="url(#${tar})" d=""/></g>
            </g>
            ${yazi(X(200) - 2, Y(ped(NORM, 200)) - 8, 'EDPVR', 'f31-edlb', 'end')}
            <text class="f31-lb f31-halo f31-esplb" text-anchor="end">ESPVR</text>
            <g class="f31-ga" data-g="dis"><text class="f31-lb f31-halo f31-dislb" text-anchor="middle">${dar ? 'Dış iş' : 'Dış iş (atım işi)'}</text></g>
            <g class="f31-ga" data-g="ic"><line class="f31-lider"/><text class="f31-lb f31-halo f31-iclb" text-anchor="end"></text></g>
            ${dar ? '' : `<text class="f31-durum" x="${g.R - 4}" y="${g.T + 14}" text-anchor="end">PVA = dış iş + iç iş</text>`}
          </svg>
          <div class="f31-panel">
            ${sat('dis', 'Dış iş', 'ok')}${sat('ic', 'İç iş', 'warn')}${sat('pva', 'PVA ≈ O₂ tüketimi', '')}
            <p class="f31-o2">O₂ gereksinimi <b></b></p>
            <p class="f31-olcek">Ölçek 0–17000 mmHg·mL; soluk çubuk normal.</p>
          </div>
        </div>`;
      const $ = (k) => el.querySelector(k);
      const OL = 17000;
      const ciz = () => {
        const m = D31_MODEL(q), p = m.p;
        $('.f31-disA').setAttribute('d', yol(m.halka, X, Y, true));
        const ed = []; for (let i = 0; i <= 40; i++) { const V = lerp(m.ESV, V0, i / 40); ed.push([V, ped(p, V)]); }
        const icP = [[V0, 0], [m.ESV, m.Pes], ...ed];
        const d = yol(icP, X, Y, true); $('.f31-icA').setAttribute('d', d); $('.f31-icT').setAttribute('d', d);
        const u = espvrUc(p.Ees, 200, 180), espC = $('.f31-espC'); espC.setAttribute('x2', X(u[0])); espC.setAttribute('y2', Y(u[1]));
        const lb = $('.f31-esplb'); lb.setAttribute('x', X(u[0]) - 6); lb.setAttribute('y', Y(u[1]) + 14);
        $('.f31-norm').style.display = sec === 'N' ? 'none' : '';
        const dl = $('.f31-dislb'); dl.setAttribute('x', X((m.ESV + m.EDV) / 2)); dl.setAttribute('y', Y(m.Pd * 0.55) + 4);
        // iç iş etiketi: ESPVR'nin solunda, ince çizgiyle üçgene
        const Pl = m.Pes * 0.88, Vl = V0 + Pl / p.Ees, lx = X(Vl) - 14, ly = Y(Pl) - 4;
        const it = $('.f31-iclb'); it.setAttribute('x', lx); it.setAttribute('y', ly);
        it.innerHTML = dar ? '<tspan>İç iş</tspan>' : `<tspan x="${lx}" dy="0">İç iş</tspan><tspan x="${lx}" dy="1.15em">(basınç işi)</tspan>`;
        const cx = X((V0 + m.ESV + m.ESV) / 3 + 4), cy = Y((m.Pes + m.Pe) / 3);
        const li = $('.f31-lider'); li.setAttribute('x1', lx + 3); li.setAttribute('y1', ly + 3); li.setAttribute('x2', cx); li.setAttribute('y2', cy);
        el.querySelectorAll('[data-g]').forEach((k) => { k.style.display = goster[k.dataset.g] ? '' : 'none'; });
        // çubuklar
        const deg = { dis: [m.dis, MN.dis], ic: [m.ic, MN.ic], pva: [m.pva, MN.pva] };
        Object.entries(deg).forEach(([k, [v, n]]) => {
          const bar = el.querySelector(`.f31-bar[data-k="${k}"]`);
          bar.querySelector('.n').style.width = (100 * n / OL).toFixed(2) + '%';
          if (k === 'pva') { const [ok, wr] = bar.querySelectorAll('.c'); ok.style.width = (100 * m.dis / OL).toFixed(2) + '%'; wr.style.left = (100 * m.dis / OL).toFixed(2) + '%'; wr.style.width = (100 * m.ic / OL).toFixed(2) + '%'; }
          else bar.querySelector('.c').style.width = (100 * v / OL).toFixed(2) + '%';
          bar.querySelector('b').textContent = `${tam(v)}${k === 'dis' ? ' mmHg·mL' : ''}${sec === 'N' ? '' : ' · ' + yuzde(100 * (v / n - 1))}`;
        });
        $('.f31-o2 b').textContent = sec === 'N' ? '—' : '↑ artar';
        $('.f31-o2').classList.toggle('up', sec !== 'N');
        segBas(el, sec); capYaz(I_DURUM[sec].cap);
      };
      el.addEventListener('click', (e) => {
        const b = e.target.closest('.seg [data-d]'); if (!b) return;
        durGecis(); sec = b.dataset.d; const a = Object.assign({}, q), hedef = temel(I_DURUM[sec].q);
        durGecis = gecis(500, (f) => { q = ara(a, hedef, f); ciz(); });
      });
      el.addEventListener('change', (e) => { const c = e.target.closest('[data-c]'); if (!c) return; goster[c.dataset.c] = c.checked; ciz(); });
      ciz();
      return () => durGecis();
    });
    return () => { durGecis(); temizle(); };
  };

  /* ================= 4 · f31_sag ================= */
  const RV_K = [[50, 2], [85, 3], [120, 5], [119, 18], [112, 26], [100, 28], [80, 27], [62, 23], [52, 15]];
  // kapalı Catmull-Rom → kübik Bezier, veri uzayında örneklenir (parça başına 16 nokta)
  const RV = (() => {
    const n = RV_K.length, o = [], parca = [];
    for (let i = 0; i < n; i++) {
      const p0 = RV_K[(i - 1 + n) % n], p1 = RV_K[i], p2 = RV_K[(i + 1) % n], p3 = RV_K[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let j = 0; j < 16; j++) {
        const t = j / 16, a = (1 - t) ** 3, b = 3 * (1 - t) ** 2 * t, c = 3 * (1 - t) * t * t, d = t ** 3;
        o.push([a * p1[0] + b * c1[0] + c * c2[0] + d * p2[0], a * p1[1] + b * c1[1] + c * c2[1] + d * p2[1]]); parca.push(i);
      }
    }
    let A = 0; for (let i = 0; i < o.length; i++) { const [x1, y1] = o[i], [x2, y2] = o[(i + 1) % o.length]; A += x1 * y2 - x2 * y1; }
    return { pts: o, parca, alan: Math.abs(A) / 2 };
  })();
  const RV_ORAN = Math.round((100 * RV.alan) / MN.dis);
  const S_CAP = {
    ayni: '<b>Aynı ölçek.</b> İki ventrikül de 70 mL atar, ama RV halkası LV halkasının tabanında küçük bir üçgen olarak kalır: alanı, yani atım işi, LV\'ninkinin %20–25\'idir. RV\'yi büyütün ve köşelerine bakın. [[K1 s. 139]]',
    buyut: '<b>RV büyütülmüş (0–30 mmHg).</b> Halka üçgendir: RV basıncı yükselmeye başladıktan kısa süre sonra ejeksiyon başlar, belirgin izovolümetrik kasılma kenarı yoktur. Pulmoner vasküler direnç ve pulmoner arter basıncı düşük olduğu için RV çok düşük bir ard yükü yener. [[K1 s. 139]]',
  };

  VIZ.f31_sag = (el) => {
    let mod = 'ayni', pm = 140, durGecis = () => {};
    const capYaz = aciklama(el);
    const temizle = duyarli(el, (dar) => {
      const W = dar ? 360 : 460, H = dar ? 326 : 366;
      const base = dar ? { L: 46, R: 350, T: 14, B: 246, vmax: 160, dx: 40 } : { L: 52, R: 440, T: 18, B: 284, vmax: 160, dx: 20 };
      const kirp = kimlik('kirp-sag'), ok = kimlik('ok-sag');
      const erken = RV.pts.filter((_, i) => RV.parca[i] === 2 || RV.parca[i] === 3); erken.push(RV_K[4]);
      el.innerHTML = `<div class="f31-ust">${segHtml('Ölçek', [['ayni', 'Aynı ölçek'], ['buyut', 'RV\'yi büyüt']])}</div>
        <div class="f31-ikili${dar ? ' dar' : ''}">
          <svg class="f31-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sol ve sağ ventrikül basınç–hacim halkaları aynı hacim ekseninde">
            <defs><clipPath id="${kirp}"><rect x="${base.L}" y="${base.T}" width="${base.R - base.L}" height="${base.B - base.T}"/></clipPath>${okMarker(ok, 'f31-okuc2')}</defs>
            <g class="f31-eks"></g>
            <g clip-path="url(#${kirp})">
              <path class="f31-lvA" d=""/>
              <path class="f31-rvA" d=""/>
              <path class="f31-erken" d=""/>
            </g>
            <g class="f31-sagl"></g>
            <line class="f31-svC" marker-start="url(#${ok})" marker-end="url(#${ok})" x1="0"/>
            <text class="f31-lb f31-halo f31-svCt" text-anchor="middle">SV ≈ 70 mL (ikisinde de)</text>
          </svg>
          <div class="f31-panel">
            <div class="f31-bar" data-k="lv"><div class="f31-bar-h"><span>LV atım işi</span><b>100</b></div><div class="f31-trk"><i class="c lv" style="width:100%"></i></div></div>
            <div class="f31-bar" data-k="rv"><div class="f31-bar-h"><span>RV atım işi</span><b>≈ ${RV_ORAN}</b></div><div class="f31-trk"><i class="c rv" style="width:${RV_ORAN}%"></i></div></div>
            <p class="f31-olcek">RV, LV'nin %${RV_ORAN}'si (kitap: %20–25). Göreli alanlar, LV = 100.</p>
            <p class="f31-erkennot"><i></i>Ejeksiyon erken başlar: basınç yükselir yükselmez hacim düşer.</p>
          </div>
        </div>`;
      const $ = (k) => el.querySelector(k);
      const ciz = () => {
        const g = Object.assign({}, base, { pmax: pm, dy: pm > 70 ? 20 : 5, xt: base.B + 58, ylab: pm > 70 ? 'Ventrikül basıncı (mmHg)' : 'Sağ ventrikül basıncı (mmHg)', xlab: 'Ventrikül hacmi (mL)' });
        const { X, Y, s } = cerceve(g);
        $('.f31-eks').innerHTML = s;
        const z = clamp((140 - pm) / 110, 0, 1); // 0 aynı ölçek, 1 büyütülmüş
        const lv = $('.f31-lvA'); lv.setAttribute('d', yol(MN.halka, X, Y, true)); lv.style.opacity = (1 - 0.8 * z).toFixed(2);
        $('.f31-rvA').setAttribute('d', yol(RV.pts, X, Y, true));
        const er = $('.f31-erken'); er.setAttribute('d', yol(erken, X, Y)); er.style.opacity = z > 0.98 ? 1 : 0;
        const svy = base.B + 36;
        const sl = $('.f31-svC'); sl.setAttribute('x1', X(50) + 3); sl.setAttribute('x2', X(120) - 3); sl.setAttribute('y1', svy); sl.setAttribute('y2', svy);
        const st = $('.f31-svCt'); st.setAttribute('x', X(85)); st.setAttribute('y', svy - 5);
        let l = '';
        if (z < 0.02) {
          l += yazi(X(MN.tepeV), Y(MN.tepe) - 10, 'Sol ventrikül', 'f31-lvlb', 'middle');
          l += yazi(X(122) + 6, Y(14), 'Sağ ventrikül', 'f31-rvlb', 'start');
        } else if (z > 0.98) {
          l += yazi(X(86), Y(1.3), 'Diyastolik doluş', 'f31-rvlb', 'middle');
          l += yazi(X(120) + 8, Y(13), 'Ventrikül\nkasılması', 'f31-rvlb', 'start');
          l += yazi(X(90), Y(28.6) - 6, 'Ejeksiyon', 'f31-rvlb', 'middle');
          l += yazi(X(53) - 8, Y(18), 'Ventrikül\ngevşemesi', 'f31-rvlb', 'end');
        }
        $('.f31-sagl').innerHTML = l;
        $('.f31-erkennot').style.display = z > 0.98 ? '' : 'none';
        segBas(el, mod);
      };
      el.addEventListener('click', (e) => {
        const b = e.target.closest('.seg [data-d]'); if (!b || b.dataset.d === mod) return;
        mod = b.dataset.d; durGecis(); capYaz(S_CAP[mod]);
        const a = pm, h = mod === 'buyut' ? 30 : 140;
        durGecis = gecis(600, (f) => { pm = lerp(a, h, f); ciz(); });
        segBas(el, mod);
      });
      ciz();
      return () => durGecis();
    });
    return () => { durGecis(); temizle(); };
  };

  /* ================= 5 · f31_yetmezlik ================= */
  const Z_DURUM = {
    N: { ad: 'Normal', q: { Ees: 2.5, A: 0.585, k: 0.022, fw: 0 }, cap: '<b>Normal.</b> LVEDV 120 mL, LVESV 50 mL, SV 70 mL, EF ≈ %58. Sistolik ya da diyastolik yetmezliği seçin. [[K1 s. 119, 140]]' },
    sis: { ad: 'Sistolik yetmezlik', q: { Ees: 1.0, A: 0.585, k: 0.022, fw: 0 }, cap: '<b>Sistolik yetmezlik.</b> Kontraktilite azalır, ESPVR yatıklaşır. LV normalin altında bir SV atar ve geride normalden fazla kan kalır: LVESV ve LVEDV artar, halka sağa kayar ve daralır. Burada EF %38\'dir (eşik %45). [[K1 s. 140]] [[K1 s. 132]]' },
    dia: { ad: 'Diyastolik yetmezlik', q: { Ees: 2.5, A: 1.3, k: 0.03, fw: 1 }, cap: '<b>Diyastolik yetmezlik.</b> Kompliyans azalır: EDPVR daha dik bir yol izler, ESPVR değişmez. Ventrikül daha yüksek basınçta daha az dolar: LVEDP artar, LVEDV ve SV azalır. EF burada neredeyse normaldir. [[K1 s. 139–140]]' },
  };

  VIZ.f31_yetmezlik = (el) => {
    let sec = 'N', q = Object.assign({}, Z_DURUM.N.q), normalG = true, durGecis = () => {};
    const capYaz = aciklama(el);
    const temizle = duyarli(el, (dar) => {
      const g = dar ? DAR : GENIS, { X, Y, s } = cerceve(g);
      const kirp = kimlik('kirp-yet'), ok = kimlik('ok-yet');
      const espN = espvrUc(2.5, 200, 180);
      el.innerHTML = `<div class="f31-ust">${segHtml('Durum', Object.entries(Z_DURUM).map(([k, d]) => [k, d.ad]))}
          <div class="f31-chk"><label><input type="checkbox" data-c="n" ${normalG ? 'checked' : ''}> Normali göster</label></div></div>
        <div class="f31-ikili${dar ? ' dar' : ''}">
          <svg class="f31-svg" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Basınç–hacim grafiği: yetmezlikte ESPVR ya da EDPVR değişir, halka yer değiştirir">
            <defs><clipPath id="${kirp}"><rect x="${g.L}" y="${g.T}" width="${g.R - g.L}" height="${g.B - g.T}"/></clipPath>${okMarker(ok, 'f31-okuc3')}</defs>
            ${s}
            <g clip-path="url(#${kirp})">
              <g class="f31-nrmG"><path class="f31-edpvr f31-soluk" d="${yol(edpvrNok(NORM, 200), X, Y)}"/><line class="f31-espvr f31-soluk" x1="${X(V0)}" y1="${Y(0)}" x2="${X(espN[0])}" y2="${Y(espN[1])}"/><path class="f31-norm" d="${yol(MN.halka, X, Y, true)}"/></g>
              <path class="f31-edpvr f31-edC" d=""/>
              <line class="f31-espvr f31-espC" x1="${X(V0)}" y1="${Y(0)}"/>
              <path class="f31-cur" d=""/>
            </g>
            <text class="f31-lb f31-halo f31-edlb f31-edt" text-anchor="end">EDPVR</text>
            <text class="f31-lb f31-halo f31-esplb" text-anchor="end">ESPVR</text>
            <path class="f31-yay kirmizi" marker-end="url(#${ok})" d=""/>
            <line class="f31-svC" marker-start="url(#${ok})" marker-end="url(#${ok})"/>
            <text class="f31-lb f31-halo f31-svCt" text-anchor="middle"></text>
            <g class="f31-notlar"></g>
          </svg>
          <div class="f31-panel"><dl class="f31-oku"></dl></div>
        </div>`;
      const $ = (k) => el.querySelector(k);
      const ciz = () => {
        const m = D31_MODEL(q), p = m.p;
        const bozuk = sec === 'N' ? '' : sec;
        const ed = $('.f31-edC'); ed.setAttribute('d', yol(edpvrNok(p, 200), X, Y)); ed.classList.toggle('bozuk', p.k > 0.0225);
        const u = espvrUc(p.Ees, 200, 180), es = $('.f31-espC'); es.setAttribute('x2', X(u[0])); es.setAttribute('y2', Y(u[1])); es.classList.toggle('bozuk', p.Ees < 2.45);
        const cur = $('.f31-cur'); cur.setAttribute('d', yol(m.halka, X, Y, true)); cur.classList.toggle('bozuk', sec !== 'N');
        // EDPVR etiketi: eğrinin görünür sağ ucunda
        let vE = 200; while (vE > 20 && ped(p, vE) > 172) vE -= 2;
        const et = $('.f31-edt'); et.setAttribute('x', X(vE) - (vE < 199 ? 14 : 4)); et.classList.toggle('kirmizi', p.k > 0.0225); et.setAttribute('y', Y(ped(p, vE)) + (vE < 199 ? 16 : -8));
        const lb = $('.f31-esplb'); lb.setAttribute('x', X(u[0]) - 6); lb.setAttribute('y', Y(u[1]) + 14);
        $('.f31-nrmG').style.display = normalG && sec !== 'N' ? '' : 'none';
        const yy = $('.f31-yay');
        if (p.Ees < 2.45) { const a = yay(X, Y, 2.5, p.Ees, dar ? 70 : 96); yy.setAttribute('d', a.d); } else yy.setAttribute('d', '');
        // SV oku
        const svy = Y(dar ? 40 : 30), sl = $('.f31-svC'), st = $('.f31-svCt');
        sl.setAttribute('x1', X(m.ESV) + 3); sl.setAttribute('x2', X(m.EDV) - 3); sl.setAttribute('y1', svy); sl.setAttribute('y2', svy);
        st.setAttribute('x', (X(m.ESV) + X(m.EDV)) / 2); st.setAttribute('y', svy - 6);
        st.textContent = sec === 'N' ? `SV ${tam(m.SV)} mL` : `SV ${tam(m.SV)} · azalır`;
        // notlar
        let n = [];
        if (sec === 'sis') {
          n = [[X(V0 + 150 / p.Ees) - 10, Y(150) + 4, 'Kontraktilite azalır', 'end', 'kirmizi']];
          if (!dar) n.push([X(m.EDV) + 9, Y(m.LVEDP) - 6, 'LVEDV artar', 'start'], [X(m.ESV) - 9, Y(m.Pes * 0.55), 'LVESV artar', 'end']);
        } else if (sec === 'dia') {
          const vk = 10 + Math.log(1 + (100 - 2) / p.A) / p.k;
          n = [[X(vk) + 8, Y(100) + 4, 'Kompliyans azalır', 'start', 'kirmizi']];
          if (!dar) n.push([X(m.EDV) + 9, Y(m.LVEDP) + 6, 'LVEDP artar,\nLVEDV azalır', 'start'], [X(u[0]) - 52, Y(u[1]) + 30, 'ESPVR değişmez', 'end']);
        }
        $('.f31-notlar').innerHTML = n.map(([x, y, t, a, c]) => yazi(x.toFixed(1), y.toFixed(1), t, 'f31-not ' + (c || ''), a)).join('');
        // okumalar
        const efD = Math.round(m.EF * 100);
        const fk = (a, b) => (sec === 'N' ? ['', ''] : farkS(a, b));
        const [a1, b1] = fk(m.EDV, 120), [a2, b2] = fk(m.ESV, 50), [a3, b3] = fk(m.SV, 70), [a5, b5] = fk(m.LVEDP, MN.LVEDP);
        const cizgi = { N: '—', sis: 'ESPVR (eğim 2,5 → 1,0)', dia: 'EDPVR (dikleşir)' }[sec];
        $('.f31-oku').innerHTML = okuSatir('LVEDV', `${tam(m.EDV)} mL`, 'normal 120', a1, b1) + okuSatir('LVESV', `${tam(m.ESV)} mL`, 'normal 50', a2, b2)
          + okuSatir('SV', `${tam(m.SV)} mL`, 'normal 70', a3, b3)
          + `<div><dt>EF</dt><dd><b>%${efD}</b><span class="f31-nrm">normal %58</span>${sec === 'sis' ? `<span class="f31-esik">&lt; %45: sistolik yetmezlik eşiği ${REF('[[K1 s. 132]]')}</span>` : ''}</dd></div>`
          + okuSatir('LVEDP', `${tam(m.LVEDP)} mmHg`, 'normal 8', a5, b5)
          + `<div><dt>Bozulan çizgi</dt><dd><b class="${bozuk ? 'kirmizi' : ''}">${cizgi}</b></dd></div>`;
        segBas(el, sec); capYaz(Z_DURUM[sec].cap);
      };
      el.addEventListener('click', (e) => {
        const b = e.target.closest('.seg [data-d]'); if (!b) return;
        durGecis(); sec = b.dataset.d; const a = Object.assign({}, q), h = Z_DURUM[sec].q;
        durGecis = gecis(700, (f) => { q = ara(a, h, f); ciz(); });
      });
      el.addEventListener('change', (e) => { const c = e.target.closest('[data-c]'); if (!c) return; normalG = c.checked; ciz(); });
      ciz();
      return () => durGecis();
    });
    return () => { durGecis(); temizle(); };
  };
})();
