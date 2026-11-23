/* Bölüm 51 · İstirahat membran potansiyeli · bileşenler (tarif: docs/tasarim/fiz51.md; K1 s. 221–224).
   Modeller eğitim amaçlıdır: sayılar kitaptan (K1 s. 221–224) ya da Nernst/GHK denkleminden (37 °C, RT/F = 26,7 mV). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const fmt = (v, d = 1) => { const r = +v.toFixed(d); return (r < 0 ? '−' : '') + Math.abs(r).toFixed(d).replace('.', ','); };
  const sgn = (v, d = 1) => { const r = +v.toFixed(d); return (r > 0 ? '+' : '') + fmt(v, d); };
  const RTF = 26.7;                                  // mV · 37 °C
  const EK = (ko) => RTF * Math.log(ko / 150);
  const ENA = RTF * Math.log(140 / 20);
  const COL = { K: ['--c-basic-soft', '--c-basic'], Na: ['--warn-soft', '--warn'], Cl: ['--ok-soft', '--ok'], Ca: ['--accent-soft', '--accent'], A: ['--chip', '--muted'] };
  const SUB = (a, b, rest = '') => `${a}<tspan dy="3" style="font-size:10px">${b}</tspan><tspan dy="-3">${rest}</tspan>`;
  const ionG = (k, sym, cls = '', r = 8.5) => `<g class="f51-ion ${cls}"><circle r="${r}" fill="var(${COL[k][0]})" stroke="var(${COL[k][1]})" stroke-width="1.5"/><text y="4.2" text-anchor="middle" class="f51-isym" style="fill:var(${COL[k][1]})">${sym}</text></g>`;
  const mv = (g, x, y, op) => { g.style.transform = `translate(${x}px,${y}px)`; if (op !== undefined) g.style.opacity = op; };
  const capOf = (el) => el.closest('.viz').querySelector('.viz-cap');
  const setCap = (el, html, st) => { if (st.k !== html) { capOf(el).innerHTML = REF(html); st.k = html; } };
  const arrow = (x, yt, yh, w) => {
    const s = Math.sign(yh - yt) || 1, yb = yh - s * 13, hw = Math.max(w / 2 + 5, 6), h = w / 2;
    return `M${x - h} ${yt}L${x - h} ${yb}L${x - hw} ${yb}L${x} ${yh}L${x + hw} ${yb}L${x + h} ${yb}L${x + h} ${yt}Z`;
  };

  /* ---------- ortak gerilim ölçeği: −100 … +60 mV (dikey geniş ekranda, yatay telefonda) ---------- */
  const GV = (v) => 20 + (60 - clamp(v, -100, 60)) * 1.25;
  const GH = (v) => 20 + (clamp(v, -100, 60) + 100) * 2;
  const TKS = [-100, -80, -60, -40, -20, 0, 20, 40, 60];
  const tl = (t) => (t < 0 ? '−' + (-t) : String(t));
  function gauge(marks) {
    const mk = (vert) => marks.map((m) => vert
      ? `<g class="mk" data-m="${m.k}" style="opacity:${m.dim ? 0.5 : 1}"><line x1="33" x2="47" stroke="${m.col}" stroke-width="3"/><text x="66" y="4" class="f51-tk f51-mt" style="fill:${m.col}">${m.t}</text></g>`
      : `<g class="mk" data-m="${m.k}" data-lv="${m.lv || 0}" style="opacity:${m.dim ? 0.5 : 1}"><line y1="40" y2="52" stroke="${m.col}" stroke-width="3"/><line y1="${(m.lv ? 28 : 15)}" y2="40" stroke="${m.col}" stroke-width="1" stroke-dasharray="2 2"/><text y="${m.lv ? 25 : 12}" class="f51-tk f51-mt" style="fill:${m.col}">${m.t}</text></g>`).join('');
    return `<svg class="f51-gsv f51-gv" viewBox="0 0 190 240" role="img" aria-label="Gerilim ekseni, −100 ile +60 mV arası">
      <line x1="40" x2="40" y1="${GV(60)}" y2="${GV(-100)}" stroke="var(--line)" stroke-width="2"/>
      ${TKS.map((t) => `<line x1="35" x2="40" y1="${GV(t)}" y2="${GV(t)}" stroke="var(--muted)"/><text x="30" y="${GV(t) + 4}" text-anchor="end" class="f51-tk">${tl(t)}</text>`).join('')}
      <line x1="40" x2="176" y1="${GV(0)}" y2="${GV(0)}" stroke="var(--muted)" stroke-dasharray="4 4" opacity=".6"/>
      <text x="180" y="16" text-anchor="end" class="f51-tk">mV</text>
      ${mk(true)}<g class="nd"><polygon points="41,0 62,-7 62,7" fill="var(--accent)"/></g></svg>
      <svg class="f51-gsv f51-gh" viewBox="0 0 360 76" role="img" aria-label="Gerilim ekseni, −100 ile +60 mV arası">
      <line x1="${GH(-100)}" x2="${GH(60)}" y1="46" y2="46" stroke="var(--line)" stroke-width="2"/>
      ${TKS.map((t) => `<line y1="46" y2="52" x1="${GH(t)}" x2="${GH(t)}" stroke="var(--muted)"/><text x="${GH(t)}" y="68" text-anchor="middle" class="f51-tk">${tl(t)}</text>`).join('')}
      <line x1="${GH(0)}" x2="${GH(0)}" y1="30" y2="52" stroke="var(--muted)" stroke-dasharray="3 3" opacity=".7"/>
      ${mk(false)}<g class="nd"><polygon points="0,45 -6,32 6,32" fill="var(--accent)"/></g></svg>`;
  }
  function gset(root, v, marks) {
    root.querySelectorAll('.f51-gsv').forEach((s) => {
      const vt = s.classList.contains('f51-gv');
      s.querySelector('.nd').setAttribute('transform', vt ? `translate(0 ${GV(v)})` : `translate(${GH(v)} 0)`);
      if (!marks) return;
      Object.keys(marks).forEach((k) => {
        const g = s.querySelector(`[data-m="${k}"]`); if (!g) return;
        const m = marks[k];
        g.setAttribute('transform', vt ? `translate(0 ${GV(m.v)})` : `translate(${GH(m.v)} 0)`);
        const t = g.querySelector('text');
        if (m.t !== undefined && t.dataset.h !== m.t) { t.innerHTML = m.t; t.dataset.h = m.t; }
        if (!vt) { const x = GH(m.v); const a = x < 70 ? 'start' : x > 300 ? 'end' : 'middle'; t.setAttribute('text-anchor', a); t.setAttribute('x', a === 'start' ? -5 : a === 'end' ? 5 : 0); }
      });
    });
  }
  const mkInit = (marks) => { const o = {}; marks.forEach((m) => { o[m.k] = { v: m.v, t: m.t }; }); return o; };
  const slider = (id, lab, min, max, step, val, extra = '') => `<label class="f51-sl" ${extra}><span>${lab}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-s="${id}"></label>`;
  const pressed = (root, attr, val) => root.querySelectorAll(`[${attr}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute(attr) === String(val))));

  /* =====================================================================
     1 · yük ayrımı ve potansiyelin işareti
     ===================================================================== */
  VIZ.f51_yuk = (el) => {
    const CELL = { sinir: { v: -70, e: 4, t: '<b>Sinir hücresi · RMP −70 mV.</b> Uyarılabilir hücrelerde RMP daha negatiftir. [[K1 s. 221]]' }, kas: { v: -90, e: 5, t: '<b>İskelet kası · RMP −90 mV.</b> [[K1 s. 221]]' }, uyar: { v: -30, e: 2, t: '<b>Uyarılamayan hücre · RMP ≈ −30 mV.</b> [[K1 s. 221]]', ap: true } };
    const SX = (i) => 25 + (i % 8) * 44.5, SY = (i, r0, r1) => (i < 8 ? r0 : r1);
    const CI = [0, 2, 4, 6, 9, 11, 13, 15], AI = [1, 3, 5, 7, 8, 10, 12, 14];
    const ions = [];                                    // 32 öğe
    let html = '';
    ['E', 'I'].forEach((side, si) => {
      for (let j = 0; j < 8; j++) {
        ions.push({ t: 'c', side, j, id: ions.length }); html += ionG('K', '+', 'c');
        ions.push({ t: 'a', side, j, id: ions.length }); html += ionG('A', '−', 'a');
      }
    });
    const pos = (it, e) => {                            // e>0: dışarıda fazla +
      const r0 = it.side === 'E' ? 28 : 150, r1 = it.side === 'E' ? 62 : 178;
      const slot = (it.t === 'c' ? CI : AI)[it.j];
      let p = [SX(slot), SY(slot, r0, r1)];
      const m = Math.abs(e);
      if (e > 0 && it.side === 'I' && it.j < e) p = [36 + it.j * 60, it.t === 'c' ? 90 : 130];
      if (e < 0 && it.side === 'E' && it.j < m) p = [36 + it.j * 60, it.t === 'c' ? 130 : 90];
      return p;
    };
    // e>0 için: ICF katyonları dış yüze, ICF anyonları iç yüze dizilir; e<0 için ECF katyonu iç yüze, ECF anyonu dış yüze
    const prot = [45, 135, 225, 315].map((x) => `<g class="f51-prot" data-prot><ellipse cx="${x}" cy="218" rx="32" ry="16" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/><text x="${x}" y="216" text-anchor="middle" class="f51-tk" style="font-weight:800;fill:var(--ink)">A⁻</text><text x="${x}" y="229" text-anchor="middle" class="f51-tk">− − −</text><path d="M${x} 199V189M${x - 3} 192L${x} 187L${x + 3} 192" stroke="var(--muted)" fill="none"/></g>`).join('');
    el.innerHTML = `<div class="f51-w"><div class="f51-row"><div class="f51-col">
      <svg viewBox="0 0 360 248" class="f51-svg" role="img" aria-label="Zarın iki yanında yük ayrımı: hücre dışı ve hücre içi, sabit protein anyonları">
        <rect x="0" y="0" width="360" height="100" fill="var(--bg)" opacity=".7"/><rect x="0" y="120" width="360" height="128" fill="var(--paper)"/>
        <rect x="0" y="100" width="360" height="20" fill="var(--chip)"/><line x1="0" x2="360" y1="100" y2="100" stroke="var(--line)" stroke-width="2"/><line x1="0" x2="360" y1="120" y2="120" stroke="var(--line)" stroke-width="2"/>
        <text x="6" y="13" class="f51-tk" style="font-weight:700">Hücre dışı (ECF)</text><text x="6" y="244" class="f51-tk" style="font-weight:700;display:none">Hücre içi (ICF)</text><text x="354" y="133" text-anchor="end" class="f51-tk" style="font-weight:700">Hücre içi (ICF)</text>
        ${prot}<g class="f51-ions">${html}</g></svg>
      </div><div class="f51-col f51-vm"><div class="f51-big" data-o="num">0 mV</div>${gauge([])}</div></div>
      <div class="f51-ctl">${slider('n', 'Zarı geçen katyon: <b data-o="nv">0</b> (içeriden dışarıya +)', -4, 4, 1, 0)}
      <div class="f51-grp"><span class="f51-gl">Hücre tipi</span><div class="seg" role="group" aria-label="Hücre tipi"><button type="button" data-c="sinir" aria-pressed="false">Sinir hücresi −70 mV</button><button type="button" data-c="kas" aria-pressed="false">İskelet kası −90 mV</button><button type="button" data-c="uyar" aria-pressed="false">Uyarılamayan hücre ≈ −30 mV</button></div></div></div></div>`;
    const q = (s) => el.querySelector(s), st = { k: '' };
    const gEls = [...el.querySelectorAll('.f51-ion')];
    let n = 0, cell = null, protOn = false, vShow = 0, vTgt = 0;
    const vOf = () => (cell ? CELL[cell].v : clamp(-20 * n, -100, 60));
    const ciz = () => {
      const e = cell ? CELL[cell].e : n;
      gEls.forEach((g, i) => { const it = ions[i]; const p = pos(it, e); mv(g, p[0], p[1], 1); });
      vTgt = vOf();
      const apx = cell ? (CELL[cell].ap ? '≈ ' : '') : (n === 0 ? '' : '≈ ');
      q('[data-o=num]').textContent = apx + (vTgt > 0 ? '+' : '') + fmt(vTgt, 0) + ' mV';
      q('[data-o=nv]').textContent = (n > 0 ? '+' : '') + n;
      q('.f51-sl').classList.toggle('gri', !!cell);
      pressed(el, 'data-c', cell || '');
      let c;
      if (protOn) c = '<b>Hücre içi proteinler.</b> Büyük ve yüklü oldukları için zardan geçemezler; katyonları tutar, anyonları iterler. [[K1 s. 221]]';
      else if (cell) c = CELL[cell].t;
      else if (n === 0) c = '<b>Eşit dağılım.</b> Zarın iki yanında pozitif ve negatif yükler tam eşitse potansiyel 0 mV\'dir. Katyonları kaydırın ya da bir hücre tipi seçin. [[K1 s. 221]]';
      else if (n > 0) c = '<b>Dışarıda fazla pozitif yük.</b> Hücre içi dışa göre negatiftir: negatif membran potansiyeli. Dinlenen hücrenin durumu budur. [[K1 s. 221]]';
      else c = '<b>İçeride fazla pozitif yük.</b> Membran potansiyeli pozitiftir; aksiyon potansiyelinde zar kısa süre böyle depolarize olur (Bölüm 52). [[K1 s. 221]]';
      setCap(el, c, st);
      if (RM) { vShow = vTgt; gset(el, vShow); }
    };
    el.addEventListener('input', (ev) => { const s = ev.target.closest('[data-s]'); if (!s) return; n = +s.value; cell = null; protOn = false; ciz(); });
    el.addEventListener('click', (ev) => {
      const c = ev.target.closest('[data-c]');
      if (c) { cell = c.dataset.c; protOn = false; q('[data-s=n]').value = Math.min(CELL[cell].e, 4); ciz(); return; }
      if (ev.target.closest('[data-prot]')) { protOn = true; ciz(); }
    });
    gset(el, 0); ciz(); vShow = vTgt; gset(el, vShow);
    return ticker(el, (dt) => { if (Math.abs(vShow - vTgt) > 0.05) { vShow = lerp(vShow, vTgt, 1 - Math.exp(-dt / 0.12)); gset(el, vShow); } });
  };

  /* =====================================================================
     2 · hangi iyon nerede
     ===================================================================== */
  VIZ.f51_iyon = (el) => {
    const CX = { K: 64, Na: 180, Cl: 296 };
    const blk = (c, gate) => `<rect x="${c - 36}" y="92" width="27" height="28" rx="5" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/><rect x="${c + 9}" y="92" width="27" height="28" rx="5" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>${gate || ''}`;
    const ch = (c, lines) => lines.map((l, i) => `<text x="${c}" y="${142 + i * 13}" text-anchor="middle" class="f51-tk" style="${i === 0 ? 'font-weight:800;fill:var(--ink)' : ''}">${l}</text>`).join('');
    const sel = (c) => `<rect class="f51-sel" x="${c - 56}" y="56" width="112" height="124" rx="10" fill="none" stroke="var(--accent)" stroke-width="2"/>`;
    const bar = (y, v, k, lab) => `<text x="4" y="${y + 11}" class="f51-tk">${lab}</text><rect x="48" y="${y}" width="${(v / 150) * 250}" height="15" rx="3" fill="var(${COL[k][0]})" stroke="var(${COL[k][1]})" stroke-width="1.5"/><text x="${48 + (v / 150) * 250 + 6}" y="${y + 12}" class="f51-tk" style="font-weight:800;fill:var(--ink)">${v}</text>`;
    const PX = (p) => 40 + ((Math.log10(p) + 3) / 3) * 280;
    const prow = (y, k, lab, p) => `<g data-i="${k}"><text x="40" y="${y - 6}" class="f51-tk" style="fill:var(--ink)">${lab}</text><rect x="40" y="${y}" width="${Math.max(4, PX(p) - 40)}" height="13" rx="3" fill="var(${COL[k][0]})" stroke="var(${COL[k][1]})" stroke-width="1.5" data-pb="${k}"/></g>`;
    el.innerHTML = `<div class="f51-w"><div class="f51-ctl"><div class="seg" role="group" aria-label="İyon seçimi"><button type="button" data-ion="K" aria-pressed="true">K⁺</button><button type="button" data-ion="Na" aria-pressed="false">Na⁺</button><button type="button" data-ion="Cl" aria-pressed="false">Cl⁻</button></div>
      <div class="seg" role="group" aria-label="Hücre tipi" data-sub="cell" hidden><button type="button" data-cl="nor" aria-pressed="true">Nöron</button><button type="button" data-cl="kas" aria-pressed="false">Kas</button></div>
      <div class="seg" role="group" aria-label="Durum" data-sub="state" hidden><button type="button" data-st="ist" aria-pressed="true">İstirahat</button><button type="button" data-st="dep" aria-pressed="false">Depolarizasyon</button></div></div>
      <div class="f51-row"><div class="f51-col"><svg viewBox="0 0 360 200" class="f51-svg" role="img" aria-label="Zarda K⁺, Na⁺ ve Cl⁻ kanalları">
        <rect width="360" height="92" fill="var(--bg)" opacity=".7"/><rect y="120" width="360" height="80" fill="var(--paper)"/><rect y="92" width="360" height="28" fill="var(--chip)" opacity=".8"/><line y1="92" y2="92" x2="360" stroke="var(--line)" stroke-width="2"/><line y1="120" y2="120" x2="360" stroke="var(--line)" stroke-width="2"/>
        <text x="6" y="13" class="f51-tk" style="font-weight:700">Hücre dışı (ECF)</text><text x="354" y="194" text-anchor="end" class="f51-tk" style="font-weight:700">Hücre içi (ICF)</text>
        <text x="122" y="52" text-anchor="middle" class="f51-tk">İyonlar polar:</text><text x="122" y="64" text-anchor="middle" class="f51-tk">çift tabakadan</text><text x="122" y="76" text-anchor="middle" class="f51-tk">geçemez</text><text x="122" y="112" text-anchor="middle" style="font:800 17px var(--f-display);fill:var(--crit)">✕</text>
        <g data-i="K">${blk(CX.K)}<path d="M64 130V62M58 70L64 60L70 70" stroke="var(--c-basic)" stroke-width="2.5" fill="none" data-arr="K"/>${ch(CX.K, ['K⁺ sızıntı kanalı', 'iki gözenek bölgeli', 'açık'])}${sel(CX.K)}</g>
        <g data-i="Na">${blk(CX.Na, '<rect x="171" y="101" width="18" height="9" rx="2" fill="var(--warn)"/>')}${ch(CX.Na, ['Na⁺ kanalı', 'RMP\'de kapalı'])}${sel(CX.Na)}<g class="f51-nacc"></g></g>
        <g data-i="Cl">${blk(CX.Cl)}<rect class="f51-gate" x="287" y="101" width="18" height="9" rx="2" fill="var(--muted)" opacity=".55"/><path class="f51-clar" d="" stroke="var(--ok)" stroke-width="2.5" fill="none"/><g class="f51-clsg"></g>${ch(CX.Cl, ['Cl⁻ kanalı', '<tspan class="f51-cltxt">nöron: kapalı</tspan>'])}${sel(CX.Cl)}</g>
        <g class="f51-flow"></g></svg></div>
      <div class="f51-col"><svg viewBox="0 0 360 134" class="f51-svg" role="img" aria-label="Derişimler">
        <text x="4" y="10" class="f51-tk" style="font-weight:800">Derişim (mmol/L)</text>
        <g data-i="K">${bar(18, 150, 'K', 'K⁺ ICF')}${bar(38, 5, 'K', 'K⁺ ECF')}</g><g data-i="Na">${bar(66, 20, 'Na', 'Na⁺ ICF')}${bar(86, 140, 'Na', 'Na⁺ ECF')}</g>
        <g data-i="Cl"><text x="4" y="124" class="f51-tk" style="fill:var(--ink)">Cl⁻: hücre tipine göre geçirgenlik</text></g></svg>
      <svg viewBox="0 0 360 140" class="f51-svg" role="img" aria-label="Göreli geçirgenlik, logaritmik ölçek">
        <text x="4" y="10" class="f51-tk" style="font-weight:800">Göreli geçirgenlik (log, K⁺'ya göre)</text>
        ${prow(34, 'K', 'P<tspan dy="3" style="font-size:10px">K</tspan><tspan dy="-3"> = 1</tspan>', 1)}${prow(66, 'Na', 'P<tspan dy="3" style="font-size:10px">Na</tspan><tspan dy="-3"> ≈ P</tspan><tspan dy="3" style="font-size:10px">K</tspan><tspan dy="-3">/100</tspan>', 0.01)}
        <g data-i="Cl"><text class="f51-cplab" x="40" y="94" class="f51-tk" style="fill:var(--ink)"></text><rect class="f51-cpbar" x="40" y="100" width="4" height="13" rx="3" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="1.5"/></g>
        ${[1, 0.1, 0.01, 0.001].map((p, i) => `<line x1="${PX(p)}" x2="${PX(p)}" y1="118" y2="123" stroke="var(--muted)"/><text x="${PX(p)}" y="136" text-anchor="${i === 3 ? 'start' : i === 0 ? 'end' : 'middle'}" class="f51-tk">${['1', '0,1', '0,01', '0,001'][i]}</text>`).join('')}</svg></div></div>
      <p class="f51-st" aria-live="polite"></p></div>`;
    const q = (s) => el.querySelector(s), st = { k: '' };
    let ion = 'K', cl = 'nor', state = 'ist', t = 0;
    const flow = q('.f51-flow'), nacc = q('.f51-nacc'), clsg = q('.f51-clsg');
    flow.innerHTML = [0, 1, 2, 3].map(() => ionG('K', '+')).join('') + ionG('Na', '+', 'leak');
    nacc.innerHTML = [[168, 80], [192, 80], [180, 66], [156, 68], [204, 68]].map((p) => `<g transform="translate(${p[0]} ${p[1]})">${ionG('Na', '+')}</g>`).join('');
    const kEls = [...flow.querySelectorAll('.f51-ion')];
    const fly = (tt) => {
      kEls.slice(0, 4).forEach((g, i) => {
        if (ion !== 'K') { g.style.opacity = 0; return; }
        const ph = RM ? (i + 0.5) / 4 : (tt * 0.17 + i / 4) % 1;
        mv(g, 64, 160 - ph * 130, Math.min(1, ph * 6, (1 - ph) * 6));
      });
      const lk = kEls[4];
      if (ion !== 'Na') { lk.style.opacity = 0; return; }
      const ph = RM ? 0.5 : (tt * 0.11) % 1; mv(lk, 70, 40 + ph * 110, Math.min(1, ph * 6, (1 - ph) * 6));
    };
    const ciz = () => {
      pressed(el, 'data-ion', ion);
      el.querySelectorAll('[data-i]').forEach((g) => { const on = g.dataset.i === ion; g.style.opacity = on ? 1 : 0.4; const s = g.querySelector('.f51-sel'); if (s) s.style.display = on ? '' : 'none'; });
      q('[data-sub=cell]').hidden = ion !== 'Cl'; q('[data-sub=state]').hidden = !(ion === 'Cl' && cl === 'kas');
      pressed(el, 'data-cl', cl); pressed(el, 'data-st', state);
      q('[data-i=Na] .f51-nacc').style.display = ion === 'Na' ? '' : 'none';
      const kasOn = cl === 'kas';
      q('.f51-gate').style.display = kasOn ? 'none' : '';
      q('.f51-cltxt').textContent = kasOn ? 'kas: açık' : 'nöron: kapalı';
      const ar = q('.f51-clar'), sg = clsg;
      if (kasOn) {
        const out = state === 'ist';
        ar.setAttribute('d', out ? 'M296 130V62M290 70L296 60L302 70' : 'M296 62V130M290 122L296 132L302 122');
        sg.innerHTML = [0, 1, 2].map((i) => `<text x="${268 + i * 28}" y="136" text-anchor="middle" style="font:800 15px var(--f-mono);fill:var(--${out ? 'ok' : 'crit'})">${out ? '−' : '+'}</text>`).join('');
      } else { ar.setAttribute('d', ''); sg.innerHTML = ''; }
      const pl = q('.f51-cplab'), pb = q('.f51-cpbar');
      if (kasOn) { pl.innerHTML = 'kasta açık Cl⁻ kanalları'; pb.setAttribute('width', 200); pb.setAttribute('stroke-dasharray', '5 3'); }
      else { pl.innerHTML = SUB('P', 'Cl', ' ≈ P') + SUB('', 'K', '/1000 (nöron)'); pb.setAttribute('width', 4); pb.removeAttribute('stroke-dasharray'); }
      let c, s2 = '';
      if (ion === 'K') c = '<b>K⁺.</b> İçeride 150, dışarıda 5 mmol/L. Polar olduğu için çift tabakadan geçemez; açık sızıntı kanallarından gradyanı yönünde dışarı çıkar. Bir iyon seçin. [[K1 s. 221]]';
      else if (ion === 'Na') c = '<b>Na⁺.</b> Dışarıda 140, içeride 20 mmol/L. Na⁺ kanalları RMP\'de kapalıdır; yalnız K⁺\'ya tam özgü olmayan sızıntı kanallarından az miktar geçer: P<sub>Na</sub> P<sub>K</sub>\'nın ≈ yüzde biridir. [[K1 s. 221]]';
      else if (cl === 'nor') c = '<b>Cl⁻ · nöron.</b> Geçirgenlik K⁺\'nınkinin ≈ binde biridir; katkısı çoğu kez göz ardı edilir. [[K1 s. 221]]';
      else if (state === 'ist') { c = '<b>Cl⁻ · kas, istirahat.</b> Açık Cl⁻ kanalları vardır; Cl⁻ elektrokimyasal gradyanına göre pasif dağılır: negatif iç onu dışarı iter. [[K1 s. 221]]'; s2 = 'RMP\'de: Cl⁻ dışarı itilir (iç negatif).'; }
      else { c = '<b>Cl⁻ · kas, depolarizasyon.</b> İç pozitifleşince Cl⁻ içeri girer. RMP Cl⁻\'yi yönlendirir, tersi değil; bu pasif hareket "balast" gibi RMP değişikliğini zorlaştırır ve zarı stabilize eder. [[K1 s. 221–222]]'; s2 = 'Depolarizasyonda: Cl⁻ içeri girer (iç pozitif).'; }
      setCap(el, c, st); q('.f51-st').textContent = s2; q('.f51-st').hidden = !s2;
      fly(t);
    };
    el.addEventListener('click', (e) => {
      const a = e.target.closest('button'); if (!a) return;
      if (a.dataset.ion) { ion = a.dataset.ion; ciz(); } else if (a.dataset.cl) { cl = a.dataset.cl; ciz(); } else if (a.dataset.st) { state = a.dataset.st; ciz(); }
    });
    ciz();
    return ticker(el, (dt) => { if (RM) return; t += dt; fly(t); });
  };

  /* =====================================================================
     3 · Nernst
     ===================================================================== */
  VIZ.f51_nernst = (el) => {
    const SO = [[25, 96], [75, 96], [125, 96], [235, 96], [285, 96], [335, 96]], SI = [[25, 146], [75, 146], [125, 146], [235, 146], [285, 146], [335, 146]];
    const KI = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) if (KI.length < 14) KI.push([124 + c * 28, 176 + r * 26]);
    el.innerHTML = `<div class="f51-w"><div class="f51-row"><div class="f51-col">
      <svg viewBox="0 0 360 250" class="f51-svg" role="img" aria-label="Açık K⁺ kanalı olan zar: kimyasal ve elektriksel gradyan okları">
        <rect width="360" height="105" fill="var(--bg)" opacity=".7"/><rect y="135" width="360" height="115" fill="var(--paper)"/><rect y="105" width="360" height="30" fill="var(--chip)" opacity=".8"/>
        <line y1="105" x2="360" y2="105" stroke="var(--line)" stroke-width="2"/><line y1="135" x2="360" y2="135" y1="135" stroke="var(--line)" stroke-width="2"/>
        <rect x="120" y="105" width="46" height="30" rx="5" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/><rect x="194" y="105" width="46" height="30" rx="5" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>
        <text x="6" y="14" class="f51-tk" style="font-weight:700">Hücre dışı (ECF)</text><text x="354" y="244" text-anchor="end" class="f51-tk" style="font-weight:700">Hücre içi (ICF)</text>
        <text x="180" y="99" text-anchor="middle" class="f51-tk f51-halo f51-chl" style="font-weight:700">Açık K⁺ kanalı</text>
        <path class="f51-ach" fill="var(--c-basic)" opacity=".85"/><path class="f51-ael" fill="var(--accent)" opacity=".9"/>
        <text x="50" y="188" text-anchor="middle" class="f51-tk">Kimyasal</text><text x="50" y="200" text-anchor="middle" class="f51-tk">(derişim) gradyanı</text>
        <text x="310" y="188" text-anchor="middle" class="f51-tk">Elektriksel</text><text x="310" y="200" text-anchor="middle" class="f51-tk">gradyan</text>
        <g class="f51-stat"></g><g class="f51-lined"></g><g class="f51-parts"></g></svg>
      <div class="f51-badge" hidden>Net akım 0</div></div>
      <div class="f51-col f51-vm"><div class="f51-big" data-o="num">0 mV</div>${gauge([{ k: 'ek', v: EK(5), t: SUB('E', 'K', ' ≈ −91'), col: 'var(--c-basic)' }, { k: 'ena', v: 50, t: SUB('E', 'Na', ' ≈ +50'), col: 'var(--warn)', dim: 1, lv: 1 }, { k: 'ecl', v: -70, t: SUB('E', 'Cl', ' ≈ −70'), col: 'var(--ok)', dim: 1, lv: 1 }])}</div></div>
      <div class="f51-eq" data-o="eq"></div>
      <div class="f51-ctl"><div class="btn-row"><button type="button" class="btn" data-a="play">Oynat</button><button type="button" class="btn ghost" data-a="reset">Baştan</button>
      <div class="seg" role="group" aria-label="İyon"><button type="button" data-ion="K" aria-pressed="true">K⁺</button><button type="button" data-ion="Na" aria-pressed="false">Na⁺</button></div></div>
      ${slider('ko', 'ECF K⁺: <b data-o="kov">5,0</b> mmol/L (ICF K⁺ sabit 150 mmol/L)', 2, 10, 0.5, 5)}
      <details class="f51-terim"><summary>Terimler</summary><p>R evrensel gaz sabiti 8,314 J K⁻¹ mol⁻¹ · T mutlak sıcaklık (37 °C = 310 K) · z değerlik · F Faraday sabiti 96 500 C/mol (bir mol elektronun yükü) · [X]<sub>o</sub> / [X]<sub>i</sub> hücre dışı / içi derişim (mmol/L) <button type="button" class="ref" data-k="K1" data-s="s. 222" aria-label="Kaynak K1 · 222">K1 · 222</button></p></details></div></div>`;
    const q = (s) => el.querySelector(s), st = { k: '' };
    const parts = q('.f51-parts'), stat = q('.f51-stat'), lined = q('.f51-lined');
    let mode = 'K', ko = 5, V = 0, playing = false, eqFlag = false, acc = 0;
    parts.innerHTML = [...Array(8)].map(() => ionG('K', '+')).join('');
    const pEl = [...parts.querySelectorAll('.f51-ion')], pT = pEl.map(() => -1);
    pEl.forEach((g) => { g.style.opacity = 0; });
    const E = () => (mode === 'K' ? EK(ko) : ENA);
    const build = () => {
      const k = mode === 'K' ? 'K' : 'Na';
      const nO = mode === 'K' ? clamp(Math.round(1 + ko * 0.4), 1, 5) : 14, nI = mode === 'K' ? 14 : 3;
      const O = mode === 'K' ? [[110, 36], [246, 40], [128, 70], [232, 66], [200, 28]].slice(0, nO) : [...Array(14)].map((_, i) => [118 + (i % 5) * 28, 30 + Math.floor(i / 5) * 24]);
      const I = mode === 'K' ? KI : [[130, 200], [180, 220], [230, 200]];
      stat.innerHTML = O.map((p) => `<g transform="translate(${p[0]} ${p[1]})">${ionG(k, '+')}</g>`).join('') + I.map((p) => `<g transform="translate(${p[0]} ${p[1]})">${ionG(k, '+')}</g>`).join('');
      const kk = mode === 'K';
      lined.innerHTML = SO.map((p, i) => `<g class="ln o" data-i="${i}" transform="translate(${p[0]} ${p[1]})">${kk ? ionG('K', '+') : ionG('A', '−')}</g>`).join('') + SI.map((p, i) => `<g class="ln i" data-i="${i}" transform="translate(${p[0]} ${p[1]})">${kk ? ionG('A', '−') : ionG('Na', '+')}</g>`).join('');
      pEl.forEach((g) => g.querySelector('circle').setAttribute('fill', `var(${COL[k][0]})`));
      pEl.forEach((g) => { g.querySelector('circle').setAttribute('stroke', `var(${COL[k][1]})`); g.querySelector('text').style.fill = `var(${COL[k][1]})`; });
      q('.f51-chl').textContent = mode === 'K' ? 'Açık K⁺ kanalı' : 'Açık Na⁺ kanalı (varsayım)';
      q('.f51-ach').setAttribute('data-up', mode === 'K' ? 1 : 0);
    };
    const draw = () => {
      const e = E(), f = clamp(V / e, 0, 1);
      const cnt = Math.round(6 * f);
      lined.querySelectorAll('.ln').forEach((g) => { g.style.opacity = +g.dataset.i < cnt ? 1 : 0; g.style.transition = RM ? 'none' : 'opacity .3s'; });
      const dirUp = mode === 'K';
      q('.f51-ach').setAttribute('d', arrow(50, dirUp ? 170 : 70, dirUp ? 70 : 170, 10));
      const we = f < 0.02 ? 0 : 1 + 9 * f;
      q('.f51-ael').setAttribute('d', we ? arrow(310, dirUp ? 70 : 170, dirUp ? 170 : 70, we) : '');
      q('[data-o=num]').textContent = fmt(V, 1) + ' mV';
      gset(el, V, { ek: { v: EK(ko), t: SUB('E', 'K', ' ≈ ' + fmt(EK(ko), 0)) } });
      q('.f51-badge').hidden = !(f >= 0.985);
      el.querySelectorAll('.mk').forEach((g) => { const k = g.dataset.m; g.style.opacity = (mode === 'K' ? k === 'ek' : k === 'ena') ? 1 : 0.45; });
      q('[data-o=eq]').innerHTML = mode === 'K'
        ? `E<sub>K</sub> = 26,7 mV × ln(${fmt(ko, 1)} / 150) = ${fmt(EK(ko), 1)} mV${ko === 5 ? ' ≈ −90 mV' : ''}`
        : `E<sub>Na</sub> = 26,7 mV × ln(140 / 20) = +${fmt(ENA, 1)} mV ≈ +50 mV`;
      q('[data-o=kov]').textContent = fmt(ko, 1);
      q('[data-s=ko]').closest('label').style.display = mode === 'K' ? '' : 'none';
      q('[data-a=play]').textContent = playing ? 'Duraklat' : 'Oynat';
      pressed(el, 'data-ion', mode);
      let c;
      const ekt = fmt(EK(ko), 1);
      if (mode === 'Na') c = '<b>Na⁺ için.</b> Dışarıda 140, içeride 20 mmol/L: Na⁺ içeri girer, iç pozitifleşir; denge ≈ +50 mV. Cl⁻ için kitap ≈ −70 mV verir. [[K1 s. 222]]';
      else if (f >= 0.985) c = ko !== 5 ? `<b>ECF K⁺ ${fmt(ko, 1)} mmol/L.</b> Derişim oranı değişince E<sub>K</sub> ${ekt} mV olur. Bunun klinik sonucu Potasyum bozuklukları bölümünde. [[K1 s. 222–223]]` : `<b>Elektrokimyasal denge.</b> İki gradyan eşitlendi, net hareket durdu. Bu gerilim K⁺'nın Nernst potansiyelidir: ≈ ${ekt} mV (kitapta ≈ −90 mV). [[K1 s. 222]]`;
      else if (f > 0.1) c = '<b>K⁺ çıkıyor.</b> Kimyasal gradyan K⁺\'yı dışarı iter; her çıkan K⁺ içeride bir negatif yük bırakır ve ters yönde elektriksel gradyan büyür. [[K1 s. 222]]';
      else c = ko !== 5 ? `<b>ECF K⁺ ${fmt(ko, 1)} mmol/L.</b> Derişim oranı değişince E<sub>K</sub> ${ekt} mV olur. Bunun klinik sonucu Potasyum bozuklukları bölümünde. [[K1 s. 222–223]]` : '<b>Başlangıç.</b> Yalnız K⁺ kanalları açık; içeride 150, dışarıda 5 mmol/L K⁺ var. Oynatın ya da ECF K⁺\'yı değiştirin. [[K1 s. 222]]';
      setCap(el, c, st);
    };
    const showParts = (dt) => {
      const e = E(), f = clamp(V / e, 0, 1), up = mode === 'K';
      if (playing && !RM && f < 0.985) {
        acc += dt * 3 * (1 - f);
        while (acc >= 1) { acc -= 1; const i = pT.findIndex((t) => t < 0); if (i >= 0) pT[i] = 0; }
      }
      pEl.forEach((g, i) => {
        if (pT[i] < 0) { g.style.opacity = 0; return; }
        pT[i] += dt / 1.4; const ph = pT[i];
        if (ph >= 1) { pT[i] = -1; g.style.opacity = 0; return; }
        const y = up ? 180 - ph * 120 : 60 + ph * 120;
        mv(g, 180 + ((i % 3) - 1) * 4, y, Math.min(1, ph * 6, (1 - ph) * 6));
      });
    };
    const reset = () => { V = 0; playing = false; eqFlag = false; acc = 0; pT.fill(-1); draw(); };
    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'play') {
        if (RM) { V = E(); playing = false; } else playing = !playing;
        draw();
      } else if (b.dataset.a === 'reset') reset();
      else if (b.dataset.ion) { mode = b.dataset.ion; eqFlag = true; playing = false; pT.fill(-1); if (RM) V = E(); build(); draw(); }
    });
    el.addEventListener('input', (ev) => {
      const s = ev.target.closest('[data-s=ko]'); if (!s) return;
      const old = EK(ko); eqFlag = Math.abs(V - old) < 0.8; ko = +s.value; build();
      if (RM && (eqFlag || playing)) V = E();
      draw();
    });
    build(); gset(el, 0, mkInit([{ k: 'ek', v: EK(5), t: SUB('E', 'K', ' ≈ −91') }, { k: 'ena', v: 50 }, { k: 'ecl', v: -70 }])); draw();
    return ticker(el, (dt) => {
      const e = E();
      if (Math.abs(V - e) > 0.02 && !RM) {
        if (playing) V += (e - V) * (1 - Math.exp(-dt / 1.5));
        else if (eqFlag) V += (e - V) * (1 - Math.exp(-dt / 0.13));
        if (Math.abs(V - e) < 0.02) V = e;
        draw();
      }
      showParts(dt);
    });
  };

  /* =====================================================================
     4 · GHK
     ===================================================================== */
  VIZ.f51_ghk = (el) => {
    const ECL = -RTF * Math.log(110 / 8);
    const LO_NA = Math.log10(0.001), HI_NA = Math.log10(20), LO_CL = Math.log10(0.0001), HI_CL = 0, MAXP = 1000;
    const toP = (pos, lo, hi) => (pos <= 0 ? 0 : Math.pow(10, lo + ((pos - 1) / (MAXP - 1)) * (hi - lo)));
    const toPos = (p, lo, hi) => (p <= 0 ? 0 : Math.round(1 + ((Math.log10(p) - lo) / (hi - lo)) * (MAXP - 1)));
    const EM = (pna, pcl) => RTF * Math.log((5 + pna * 140 + pcl * 8) / (150 + pna * 20 + pcl * 110));
    const PRE = { nor: { na: 0.01, cl: 0.001, t: '<b>İstirahatteki nöron.</b> P<sub>K</sub> yüksek, P<sub>Na</sub> ve P<sub>Cl</sub> düşük: E<sub>m</sub> E<sub>K</sub>\'nın yakınındadır. Bir hazır ayar seçin ya da geçirgenlikleri kaydırın. [[K1 s. 222–223]]' },
      k: { na: 0, cl: 0, t: '<b>Yalnız K⁺ geçirgen.</b> P<sub>Na</sub> = P<sub>Cl</sub> = 0: GHK denklemi K⁺ için Nernst denklemine indirgenir ve E<sub>m</sub> = E<sub>K</sub>. [[K1 s. 223]]', badge: 'GHK = K⁺ için Nernst' },
      kas: { na: 0.01, cl: 0.3, t: '<b>Kas: Cl⁻ kanalları açık.</b> E<sub>Cl</sub> RMP\'ye görece yakın (temsilî −70 mV) olduğu için E<sub>m</sub> az kayar; Cl⁻ RMP\'yi belirlemez ama değişmesini zorlaştırır. [[K1 s. 221–222]]' },
      na: { na: 20, cl: 0.001, t: '<b>Na⁺ geçirgenliği baskın.</b> E<sub>m</sub> E<sub>Na</sub>\'ya (≈ +50 mV) çekilir; aksiyon potansiyelinde olan budur (Bölüm 52). [[K1 s. 221–222]]', badge: 'Aksiyon potansiyeli: Bölüm 52' } };
    const lab = (p) => (p <= 0 ? '0' : p >= 1 ? fmt(p, p >= 10 ? 0 : 1) : p >= 0.1 ? fmt(p, 2) : p >= 0.01 ? fmt(p, 3) : fmt(p, 4));
    const frac = (p) => (p <= 0 || p >= 1 ? '' : ' (≈ 1/' + Math.round(1 / p) + ')');
    el.innerHTML = `<div class="f51-w"><div class="f51-row"><div class="f51-col f51-vm"><div class="f51-big" data-o="num"></div>${gauge([{ k: 'ek', v: EK(5), t: SUB('E', 'K', ' ≈ −90'), col: 'var(--c-basic)' }, { k: 'ecl', v: ECL, t: SUB('E', 'Cl', ' ≈ −70'), col: 'var(--ok)', lv: 1 }, { k: 'ena', v: ENA, t: SUB('E', 'Na', ' ≈ +50'), col: 'var(--warn)' }])}
      <p class="f51-lg"><span class="f51-dash"></span> Ölçülen nöron RMP'si −70 mV</p><div class="f51-badge" data-o="badge" hidden></div></div>
      <div class="f51-col f51-ctl"><div class="seg" role="group" aria-label="Hazır ayar"><button type="button" data-p="nor" aria-pressed="true">İstirahatteki nöron</button><button type="button" data-p="k" aria-pressed="false">Yalnız K⁺</button><button type="button" data-p="kas" aria-pressed="false">Kas: Cl⁻ açık</button><button type="button" data-p="na" aria-pressed="false">Na⁺ kanalları açık</button></div>
      ${slider('na', 'P<sub>Na</sub>/P<sub>K</sub> = <b data-o="nav"></b>', 0, MAXP, 1, 0)}${slider('cl', 'P<sub>Cl</sub>/P<sub>K</sub> = <b data-o="clv"></b>', 0, MAXP, 1, 0)}
      <p class="f51-lg">P<sub>K</sub> = 1 (sabit). Kaydırıcılar logaritmik; en sol uç 0.</p></div></div></div>`;
    const q = (s) => el.querySelector(s), st = { k: '' };
    let pna = 0.01, pcl = 0.001, pre = 'nor', vS = 0, vT = 0;
    const draw = () => {
      vT = EM(pna, pcl);
      q('[data-o=num]').innerHTML = 'E<sub>m</sub> = ' + sgn(vT, 0) + ' mV';
      q('[data-o=nav]').textContent = lab(pna) + frac(pna); q('[data-o=clv]').textContent = lab(pcl) + frac(pcl);
      q('[data-s=na]').value = toPos(pna, LO_NA, HI_NA); q('[data-s=cl]').value = toPos(pcl, LO_CL, HI_CL);
      pressed(el, 'data-p', pre || '');
      const b = pre && PRE[pre].badge; q('[data-o=badge]').textContent = b || ''; q('[data-o=badge]').hidden = !b;
      let c = pre ? PRE[pre].t : `<b>E<sub>m</sub> = ${fmt(vT, 1)} mV.</b> Potansiyel, geçirgenliği en büyük iyonun denge potansiyeline çekilir. [[K1 s. 222]]`;
      if (pre === 'kas') c = c.replace('<b>Kas: Cl⁻ kanalları açık.</b>', `<b>Kas: Cl⁻ kanalları açık · E<sub>m</sub> ≈ ${fmt(vT, 0)} mV.</b>`);
      setCap(el, c, st);
      if (RM) vS = vT;
      gset(el, vS);
    };
    el.addEventListener('click', (ev) => { const b = ev.target.closest('[data-p]'); if (!b) return; pre = b.dataset.p; pna = PRE[pre].na; pcl = PRE[pre].cl; draw(); });
    el.addEventListener('input', (ev) => {
      const s = ev.target.closest('[data-s]'); if (!s) return; pre = null;
      if (s.dataset.s === 'na') pna = toP(+s.value, LO_NA, HI_NA); else pcl = toP(+s.value, LO_CL, HI_CL);
      draw();
    });
    gset(el, 0, { ek: { v: EK(5), t: SUB('E', 'K', ' ≈ −91') }, ecl: { v: ECL, t: SUB('E', 'Cl', ' ≈ −70') }, ena: { v: ENA, t: SUB('E', 'Na', ' ≈ +52') } });
    draw(); vS = vT; gset(el, vS);
    return ticker(el, (dt) => { if (Math.abs(vS - vT) > 0.05) { vS = lerp(vS, vT, 1 - Math.exp(-dt / 0.1)); gset(el, vS); } });
  };

  /* =====================================================================
     5 · Na/K-ATPaz döngüsü
     ===================================================================== */
  VIZ.f51_pompa = (el) => {
    const NA = { 1: [[162, 126, 1], [198, 126, 1], [180, 108, 1]], 2: [[150, 54, 1], [180, 44, 1], [210, 54, 1]], 3: [[100, 34, 0.9], [180, 26, 0.9], [260, 34, 0.9]], 4: [[100, 34, 0.25], [180, 26, 0.25], [260, 34, 0.25]] };
    const NA0 = [[150, 190, 0], [180, 205, 0], [210, 190, 0]];
    const KK = { 1: [[100, 56, 1], [262, 60, 1]], 2: [[100, 56, 1], [262, 60, 1]], 3: [[166, 94, 1], [194, 94, 1]], 4: [[132, 176, 1], [228, 182, 1]] };
    const KK0 = [[100, 56, 0], [262, 60, 0]];
    const CAP = [
      '<b>1 · Üç Na⁺ bağlanır.</b> Pompanın iç yüzüne üç Na⁺ oturur. Adım adım ilerletin. [[K1 s. 223]]',
      '<b>2 · ATP harcanır, pompa dışa açılır.</b> "ATP → ADP + P" etiketi; Na⁺\'lar dışarı bırakılır. [[K1 s. 223]]',
      '<b>3 · İki K⁺ bağlanır.</b> Dış yüzden iki K⁺ girer. [[K1 s. 223]]',
      '<b>4 · Pompa içe açılır, iki K⁺ bırakılır.</b> Bir döngü: 3 Na⁺ dışarı, 2 K⁺ içeri; hücre net bir pozitif yük kaybeder (sayaç +1). [[K1 s. 223]]',
      '<b>5 · Derişim gradyanları.</b> Pompa dışarıda yüksek Na⁺ (140), içeride yüksek K⁺ (150 mmol/L) farkını korur; RMP\'yi sonuçta bu farklar oluşturur. [[K1 s. 221, 223]]',
      '<b>6 · Ozmotik denge.</b> Geçemeyen dış Na⁺\'nın ozmotik etkisi, içerideki yüksek negatif yüklü proteininkini dengeler. [[K1 s. 223]]',
      '<b>7 · Elektrojenik etki.</b> Her döngüde bir pozitif yük dışarı: iç ≈ 3–6 mV daha negatif olur (hiperpolarizasyon); büyüklük zarın toplam direncine bağlıdır. [[K1 s. 223]]'];
    const CARD = [['Derişim gradyanları', 'Pompa Na⁺ 140 mmol/L (dışarıda) ve K⁺ 150 mmol/L (içeride) farkını korur.',
      `<svg viewBox="0 0 300 52" class="f51-mini"><text x="0" y="12" class="f51-tk">Na⁺ ECF 140</text><rect x="92" y="2" width="200" height="12" rx="3" fill="var(--warn-soft)" stroke="var(--warn)"/><text x="0" y="42" class="f51-tk">K⁺ ICF 150</text><rect x="92" y="32" width="200" height="12" rx="3" fill="var(--c-basic-soft)" stroke="var(--c-basic)"/></svg>`],
      ['Ozmotik denge', 'Dışarıdaki geçemeyen Na⁺ ile içerideki negatif yüklü protein birbirini dengeler.',
      `<svg viewBox="0 0 300 70" class="f51-mini"><line x1="150" y1="14" x2="150" y2="60" stroke="var(--muted)" stroke-width="2"/><line x1="70" y1="14" x2="230" y2="14" stroke="var(--ink)" stroke-width="2.5"/><path d="M70 14L50 36H90Z M230 14L210 36H250Z" fill="none" stroke="var(--muted)"/><text x="70" y="52" text-anchor="middle" class="f51-tk">ECF Na⁺</text><text x="230" y="52" text-anchor="middle" class="f51-tk">ICF protein⁻</text><text x="150" y="70" text-anchor="middle" class="f51-tk">denge</text></svg>`],
      ['Elektrojenik etki', 'Her döngü bir pozitif yük dışarı verir: iç ≈ 3–6 mV daha negatif.',
      `<svg viewBox="0 0 300 54" class="f51-mini"><line x1="10" x2="290" y1="22" y2="22" stroke="var(--line)" stroke-width="2"/><circle cx="220" cy="22" r="5" fill="var(--muted)"/><text x="220" y="42" text-anchor="middle" class="f51-tk">−70 (temsilî)</text><rect x="60" y="14" width="${(3 / 8) * 0 + 40}" height="16" rx="3" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="80" y="42" text-anchor="middle" class="f51-tk">−73 … −76</text><path d="M214 22H108" stroke="var(--accent)" stroke-width="2"/></svg>`]];
    el.innerHTML = `<div class="f51-w"><div class="f51-row f51-prow"><div class="f51-col">
      <svg viewBox="0 0 360 250" class="f51-svg" role="img" aria-label="Na⁺/K⁺-ATPaz: üç Na⁺ dışarı, iki K⁺ içeri">
        <rect width="360" height="90" fill="var(--bg)" opacity=".7"/><rect y="132" width="360" height="118" fill="var(--paper)"/><rect y="90" width="360" height="42" fill="var(--chip)" opacity=".8"/>
        <line y1="90" x2="360" y2="90" stroke="var(--line)" stroke-width="2"/><line y1="132" x2="360" y2="132" stroke="var(--line)" stroke-width="2"/>
        <text x="6" y="14" class="f51-tk" style="font-weight:700">Hücre dışı (ECF)</text><text x="354" y="244" text-anchor="end" class="f51-tk" style="font-weight:700">Hücre içi (ICF)</text>
        <rect x="140" y="78" width="80" height="62" rx="10" fill="var(--chip)" stroke="var(--muted)" stroke-width="2"/>
        <path class="f51-cin" d="M180 92L154 140H206Z" fill="var(--paper)" stroke="var(--muted)"/><path class="f51-cout" d="M154 78H206L180 122Z" fill="var(--paper)" stroke="var(--muted)"/>
        <text x="196" y="116" class="f51-tk" style="font-weight:800;fill:var(--ink);display:none">ATP</text>
        <text class="f51-atp" x="180" y="162" text-anchor="middle" style="font:800 12px var(--f-mono);fill:var(--accent-ink)">ATP → ADP + P</text>
        <g class="f51-l5"><text x="356" y="52" text-anchor="end" class="f51-tk" style="font-weight:800;fill:var(--warn)">Na⁺ 140 mmol/L</text><text x="356" y="200" text-anchor="end" class="f51-tk" style="font-weight:800;fill:var(--c-basic)">K⁺ 150 mmol/L</text></g>
        <g class="f51-l7"><text x="12" y="70" class="f51-tk" style="font-weight:800;fill:var(--accent-ink)">Her döngü: +1 yük dışarı</text><text x="12" y="188" class="f51-tk" style="font-weight:800;fill:var(--accent-ink)">iç ≈ 3–6 mV daha negatif</text></g>
        <g class="f51-pn"></g></svg></div>
      <div class="f51-col f51-cnt"><div class="f51-sayac"><span>Döngü</span><b data-o="cyc">0</b></div><div class="f51-sayac"><span>Hücreden net çıkan yük</span><b data-o="yuk">+0</b></div></div></div>
      <div class="f51-ctl"><div class="btn-row"><button type="button" class="btn ghost" data-a="geri">Geri</button><button type="button" class="btn" data-a="ileri">İleri</button><button type="button" class="btn ghost" data-a="play">Oynat</button></div>
      <div class="f51-steps" role="group" aria-label="Adım">${[1, 2, 3, 4, 5, 6, 7].map((i) => `<button type="button" data-st="${i}" aria-pressed="false">${i}</button>`).join('')}</div></div>
      <div class="f51-cards">${CARD.map((c, i) => `<div class="f51-card" data-k="${i + 5}"><button type="button" class="f51-ck" data-card="${i + 5}">${c[0]}</button><div class="f51-cb"><p>${c[1]}</p>${c[2]}</div></div>`).join('')}</div></div>`;
    const q = (s) => el.querySelector(s), st = { k: '' };
    const pn = q('.f51-pn');
    pn.innerHTML = [0, 1, 2].map(() => ionG('Na', 'Na', 'big', 12)).join('') + [0, 1].map(() => ionG('K', 'K', 'big', 12)).join('');
    const pe = [...pn.querySelectorAll('.f51-ion')], naE = pe.slice(0, 3), kE = pe.slice(3);
    let step = 1, cyc = 0, playing = false, tm = 0, prev = 0;
    const set = (g, p, tr) => { g.style.transition = tr ? '' : 'none'; mv(g, p[0], p[1], p[2]); };
    const apply = (s, jump) => {
      const vs = s >= 5 ? 3 : s;
      const kk = s >= 5 ? KK[4] : KK[s];
      if (jump) { naE.forEach((g, i) => set(g, NA0[i], false)); kE.forEach((g, i) => set(g, KK0[i], false)); void pn.getBoundingClientRect(); }
      const tr = !RM;
      naE.forEach((g, i) => set(g, NA[vs][i], tr)); kE.forEach((g, i) => set(g, kk[i], tr));
      const open = s === 2 || s === 3;
      q('.f51-cin').style.opacity = open ? 0 : 1; q('.f51-cout').style.opacity = open ? 1 : 0;
      q('.f51-atp').style.opacity = s === 2 ? 1 : 0;
      q('.f51-l5').style.opacity = s === 5 ? 1 : 0; q('.f51-l7').style.opacity = s === 7 ? 1 : 0;
      q('.f51-pn').style.opacity = 1;
    };
    const show = (s, jump) => {
      if (s === 4 && step === 3) { cyc++; }
      step = s;
      apply(s, jump);
      q('[data-o=cyc]').textContent = cyc; q('[data-o=yuk]').textContent = '+' + cyc;
      el.querySelectorAll('[data-st]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.st === s)));
      el.querySelectorAll('.f51-card').forEach((c) => c.classList.toggle('on', +c.dataset.k === s));
      q('[data-a=play]').textContent = playing ? 'Duraklat' : 'Oynat';
      setCap(el, CAP[s - 1], st);
    };
    const go = (s) => { const w = s === 1 && (step === 4 || step >= 5); const j = w; if (s === 4 && step !== 3) { } show(s, j); };
    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'ileri') { playing = false; go(step === 7 ? 1 : step + 1); }
      else if (b.dataset.a === 'geri') { playing = false; go(step === 1 ? 7 : step - 1); }
      else if (b.dataset.a === 'play') { playing = !playing; tm = 0; if (playing && step >= 5) go(1); else show(step); }
      else if (b.dataset.st) { playing = false; go(+b.dataset.st); }
      else if (b.dataset.card) { playing = false; go(+b.dataset.card); }
    });
    show(1, false);
    return ticker(el, (dt) => {
      if (!playing || RM) return;
      tm += dt; if (tm >= 1.6) { tm = 0; go(step >= 4 ? 1 : step + 1); }
    });
  };

  /* =====================================================================
     6 · ECF K⁺ → RMP, eşik, EKG
     ===================================================================== */
  VIZ.f51_kalyum = (el) => {
    const THR = -50, VMIN = -120, VMAX = -30;
    const Y = (v) => 18 + (VMAX - clamp(v, VMIN, VMAX)) * (170 / 90);
    const rmpOf = (k) => Math.min(-53, -70 + 0.75 * (EK(k) - EK(4)));
    const g = (x, c, w, a) => a * Math.exp(-Math.pow((x - c) / w, 2));
    const ecg = (k) => {
      let tA = 18, tW = 22, tC = 190;
      if (k >= 4) { const h = clamp((k - 4) / 4, 0, 1); tA = 18 + 20 * h; tW = 22 - 9 * h; tC = 190 - 10 * h; }
      else { const l = clamp((4 - k) / 2, 0, 1); tA = 18 - 9 * l; tW = 22 + 14 * l; tC = 190 + 34 * l; }
      const pts = [];
      for (let x = 8; x <= 352; x += 2) {
        let y = 0;
        y += g(x, 52, 9, 7);                          // P
        y += g(x, 112, 3, -7) + g(x, 120, 3.2, 40) + g(x, 128, 3, -12);   // Q R S
        y += k >= 4 ? tA * Math.exp(-Math.pow(Math.abs(x - tC) / tW, 1.4)) : g(x, tC, tW, tA);
        pts.push(`${x},${(78 - y).toFixed(1)}`);
      }
      return { d: 'M' + pts.join('L'), qt: [112, Math.min(344, tC + tW * 1.8)] };
    };
    el.innerHTML = `<div class="f51-w"><div class="f51-row"><div class="f51-col"><svg viewBox="0 0 360 206" class="f51-svg" role="img" aria-label="RMP, eşik potansiyeli ve E_K çizgileri">
      ${[-100, -80, -60, -40].map((t) => `<line x1="46" x2="350" y1="${Y(t)}" y2="${Y(t)}" stroke="var(--line)" stroke-dasharray="2 4"/><text x="40" y="${Y(t) + 4}" text-anchor="end" class="f51-tk">${tl(t)}</text>`).join('')}
      <text x="40" y="12" text-anchor="end" class="f51-tk">mV</text>
      <line class="f51-thr" x1="46" x2="350" stroke="var(--crit)" stroke-width="2" stroke-dasharray="6 4" y1="${Y(THR)}" y2="${Y(THR)}"/><text x="52" y="${Y(THR) - 5}" class="f51-tk" style="fill:var(--crit);font-weight:700">Eşik potansiyeli</text>
      <line class="f51-ekl" x1="46" x2="350" stroke="var(--c-basic)" stroke-width="1.5"/><text class="f51-ekt f51-tk" x="52" style="fill:var(--c-basic)"></text>
      <line class="f51-rmpl" x1="46" x2="350" stroke="var(--accent)" stroke-width="4"/><text class="f51-rmpt" x="52" style="fill:var(--accent-ink);font:800 12.5px var(--f-display)">RMP</text>
      <g class="f51-fk"><path class="f51-fa" stroke="var(--ink)" stroke-width="1.5" fill="none"/><text class="f51-ft f51-halo f51-tk" x="262" text-anchor="end" style="font-weight:800;fill:var(--ink)"></text></g></svg></div>
      <div class="f51-col"><div class="f51-zone" data-o="zone"></div><div class="f51-eq" data-o="ekv"></div><div class="f51-chips" data-o="chips"></div></div></div>
      <svg viewBox="0 0 360 120" class="f51-svg f51-ekg" role="img" aria-label="Şematik EKG atımı"><rect width="360" height="120" fill="var(--bg)" opacity=".5" rx="8"/>
        ${[...Array(9)].map((_, i) => `<line x1="${8 + i * 43}" x2="${8 + i * 43}" y1="6" y2="114" stroke="var(--line)" opacity=".6"/>`).join('')}
        <path class="f51-ecg" fill="none" stroke="var(--ink)" stroke-width="2.2"/><path class="f51-qt" fill="none" stroke="var(--crit)" stroke-width="1.5"/><text class="f51-qtt f51-tk" y="112" text-anchor="middle" style="fill:var(--crit);font:700 12.5px var(--f-mono)">QT</text>
        <text x="352" y="14" text-anchor="end" class="f51-tk">EKG (şematik)</text></svg>
      <div class="f51-ctl">${slider('k', 'ECF K⁺: <b data-o="kv">4,0</b> mmol/L', 2, 8, 0.1, 4)}<div class="seg" role="group" aria-label="Hızlı değer"><button type="button" data-k="4" aria-pressed="true">4,0 mmol/L</button><button type="button" data-k="7.5" aria-pressed="false">7,5 mmol/L</button></div></div></div>`;
    const q = (s) => el.querySelector(s), st = { k: '' };
    let K = 4, rmpS = null, rmpT = 0;
    const lines = (rmp) => {
      const e = EK(K), yr = Y(rmp);
      ['.f51-rmpl'].forEach((s) => { q(s).setAttribute('y1', yr); q(s).setAttribute('y2', yr); });
      q('.f51-ekl').setAttribute('y1', Y(e)); q('.f51-ekl').setAttribute('y2', Y(e));
      const et = q('.f51-ekt'); et.setAttribute('y', Y(e) + 13); et.innerHTML = SUB('E', 'K', ' = ' + fmt(e, 1) + ' mV');
      const rt = q('.f51-rmpt'); rt.setAttribute('y', yr + 14); rt.innerHTML = 'RMP ' + fmt(rmp, 0) + ' mV';
      const ya = Y(THR), d = Math.abs(rmp - THR);
      q('.f51-fa').setAttribute('d', `M300 ${yr - 3}L300 ${ya + 3}M295 ${yr - 9}L300 ${yr - 2}L305 ${yr - 9}M295 ${ya + 9}L300 ${ya + 2}L305 ${ya + 9}`);
      const ft = q('.f51-ft'); ft.setAttribute('y', (yr + ya) / 2 + 4); ft.textContent = 'Fark: ' + fmt(d, 0) + ' mV'; ft.setAttribute('x', 288);
    };
    const draw = () => {
      rmpT = rmpOf(K); if (rmpS === null || RM) rmpS = rmpT;
      q('[data-o=kv]').textContent = fmt(K, 1);
      q('[data-s=k]').value = K;
      lines(rmpS);
      const e = ecg(K); q('.f51-ecg').setAttribute('d', e.d);
      q('.f51-qt').setAttribute('d', `M${e.qt[0]} 100V106H${e.qt[1]}V100`); q('.f51-qtt').setAttribute('x', (e.qt[0] + e.qt[1]) / 2);
      const z = K < 3.5 ? 'hipo' : K > 5.5 ? 'hiper' : 'nor';
      q('[data-o=zone]').textContent = z === 'hipo' ? 'Hipokalemi' : z === 'hiper' ? 'Hiperkalemi' : 'Normal';
      q('[data-o=zone]').className = 'f51-zone ' + z;
      q('[data-o=ekv]').innerHTML = `E<sub>K</sub> = ${fmt(EK(K), 1)} mV`;
      q('[data-o=chips]').innerHTML = (z === 'hiper' ? ['RMP eşiğe yakın', 'Sivri T', 'VF riski'] : z === 'hipo' ? ['Kas güçsüzlüğü', 'Uzun QT'] : ['RMP–eşik farkı güvenli']).map((t) => `<span class="f51-chip ${z}">${t}</span>`).join('');
      pressed(el, 'data-k', K === 4 ? '4' : K === 7.5 ? '7.5' : '');
      const c = z === 'hiper' ? '<b>Hiperkalemi: depolarizasyon.</b> ECF K⁺ 4,0\'dan 7,5 mmol/L\'ye çıkınca kitaba göre E<sub>K</sub> −90\'dan −80 mV\'ye gelir; RMP eşiğe yaklaşır, kendiliğinden aksiyon potansiyeli geçici olarak kolaylaşır. Kalpte repolarizasyon değişir: yüksek, sivri T; VF gibi tehlikeli aritmiler. [[K1 s. 223]]'
        : z === 'hipo' ? '<b>Hipokalemi: hiperpolarizasyon.</b> RMP eşikten uzaklaşır; aksiyon potansiyeli oluşturmak ve yaymak güçleşir, iskelet kası güçsüzleşir. Kalpte K⁺ kanallarının doğrudan inhibisyonu QT\'yi proaritmik biçimde uzatır. [[K1 s. 223]]'
        : '<b>Normal.</b> RMP ile eşik potansiyeli arasında güvenli bir fark var. ECF K⁺\'yı kaydırın. [[K1 s. 223]]';
      setCap(el, c, st);
    };
    el.addEventListener('input', (ev) => { const s = ev.target.closest('[data-s=k]'); if (s) { K = +s.value; draw(); } });
    el.addEventListener('click', (ev) => { const b = ev.target.closest('[data-k]'); if (b && b.tagName === 'BUTTON') { K = +b.dataset.k; draw(); } });
    draw();
    return ticker(el, (dt) => { if (Math.abs(rmpS - rmpT) > 0.05) { rmpS = lerp(rmpS, rmpT, 1 - Math.exp(-dt / 0.12)); lines(rmpS); } });
  };

  /* =====================================================================
     7 · hiponatremi ve hipokalsemi
     ===================================================================== */
  VIZ.f51_naca = (el) => {
    const YM = (v) => 30 + (-30 - v) * 2.5;
    const STEPS = {
      na: [
        '<b>Hiponatremi · 1.</b> ECF ozmolaritesi düşer, su hücreye girer ve hücre şişer. Adım adım ilerletin ya da hipokalsemiye geçin. [[K1 s. 224]]',
        '<b>Hiponatremi · 2.</b> Ağır hiponatremide beyin hücreleri şişer: serebral ödem. Suyun dağılımı için Bölüm 69. [[K1 s. 224]]',
        '<b>Hiponatremi · 3.</b> Hücreye giren su içerideki K⁺\'yı seyreltir; derişim farkı azalır ve zar eşiğe doğru depolarize olur. [[K1 s. 224]]',
        '<b>Hiponatremi · 4.</b> Kendiliğinden aksiyon potansiyeli kolaylaşır; hiponatremiye bağlı serebral ödemin nöbetle ilişkisini bu kısmen açıklar. Na⁺\'nın doğrudan etkisi azdır, çünkü istirahatte zar Na⁺\'ya görece geçirgen değildir. [[K1 s. 224]]'],
      ca: [
        '<b>Ca²⁺ · 1.</b> Ca²⁺ RMP\'ye doğrudan katılmaz; istirahatte zar Ca²⁺\'ya büyük ölçüde geçirgen değildir. [[K1 s. 224]]',
        '<b>Ca²⁺ · 2.</b> Yüzey yükü hipotezi: Ca²⁺ dış yüzdeki glikoproteinlere bağlanır, zara bitişik pozitif yükü artırır ve zarı genel RMP\'ye göre hiperpolarize eder: zar stabilize olur. [[K1 s. 224]]',
        '<b>Ca²⁺ · 3 · Hipokalsemi.</b> Ca²⁺ azalınca eşik potansiyeli RMP\'ye yaklaşır, uyarılabilirlik artar: kendiliğinden aksiyon potansiyelleri, tetani, parestezi ve aritmi. [[K1 s. 224]]',
        '<b>Ca²⁺ · 4 · Hiperkalemide Ca²⁺.</b> Ca²⁺ kardiyoproteksiyon için verilir ve altta yatan nedeni düzeltmeye zaman kazandırır. [[K1 s. 224]]']
    };
    const CH = { na: [[], [], [], ['Nöbet']], ca: [[], [], ['Tetani', 'Parestezi', 'Aritmi'], []] };
    const COLS = [['Normal', -70, -50, ''], ['Hipokalemi', -85, -50, 'Hiper-|polarizasyon'], ['Hiperkalemi', -60, -50, 'RMP|depolarize'], ['Hipokalsemi', -70, -60, 'Eşik daha|negatif']];
    const SY = (v) => 14 + (-30 - v) * 1.6;
    const strip = COLS.map((c, i) => { const cx = 52 + i * 85; return `<g class="f51-col4" data-c="${i}"><line x1="${cx - 28}" x2="${cx + 28}" y1="${SY(c[1])}" y2="${SY(c[1])}" stroke="var(--accent)" stroke-width="4"/><line x1="${cx - 28}" x2="${cx + 28}" y1="${SY(c[2])}" y2="${SY(c[2])}" stroke="var(--crit)" stroke-width="2" stroke-dasharray="5 3"/><text x="${cx}" y="128" text-anchor="middle" class="f51-tk" style="font-weight:800;fill:var(--ink)">${c[0]}</text>${c[3].split('|').map((l, j) => `<text x="${cx}" y="${141 + j * 12}" text-anchor="middle" class="f51-tk">${l}</text>`).join('')}</g>`; }).join('');
    const cellIons = [[-22, -24], [10, -30], [26, -6], [-30, 4], [-4, 6], [18, 24], [-18, 28], [2, -12]];
    const ca4 = [0, 1, 2, 3].map((i) => 40 + i * 52);
    el.innerHTML = `<div class="f51-w"><div class="f51-ctl"><div class="seg" role="group" aria-label="Konu"><button type="button" data-tab="na" aria-pressed="true">Hiponatremi</button><button type="button" data-tab="ca" aria-pressed="false">Hipokalsemi</button></div>
      <div class="btn-row"><button type="button" class="btn ghost" data-a="geri">Geri</button><button type="button" class="btn" data-a="ileri">İleri</button><button type="button" class="btn ghost" data-a="play">Oynat</button></div></div>
      <svg viewBox="0 0 360 214" class="f51-svg f51-nac" role="img" aria-label="Hiponatremi ve hipokalsemi adım şeması">
        <g data-v="na1 na3 na4"><circle cx="105" cy="108" r="52" fill="none" stroke="var(--muted)" stroke-dasharray="4 4" opacity=".6" data-v="na1"/></g>
        <g class="f51-cellg" data-v="na1 na3 na4" style="transform-origin:105px 108px"><circle cx="105" cy="108" r="52" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="2"/><circle cx="105" cy="108" r="12" fill="var(--paper)" stroke="var(--muted)"/>
          ${cellIons.map((p, i) => `<g class="ci" data-i="${i}" transform="translate(${105 + p[0]} ${108 + p[1]})">${ionG('K', '+', '', 7)}</g>`).join('')}</g>
        <g data-v="na1" class="f51-wat">${[[18, 60], [18, 156], [192, 60], [192, 156]].map((p, i) => `<path d="M${p[0]} ${p[1]} q6 8 0 14 q-6 -6 0 -14z" fill="var(--c-basic)"/><path d="M${p[0] + (i < 2 ? 10 : -10)} ${p[1] + 7}l${i < 2 ? 14 : -14} ${i % 2 ? -10 : 10}" stroke="var(--c-basic)" stroke-width="2"/>`).join('')}<text x="105" y="14" text-anchor="middle" class="f51-tk" style="font-weight:700">Su hücreye girer</text><text x="105" y="205" text-anchor="middle" class="f51-tk">hücre şişer</text></g>
        <g data-v="na2"><g style="transform-origin:180px 112px;transform:scale(1.2)"><path d="M130 118c-12-34 12-62 46-58c14-14 44-10 52 10c26 4 34 38 12 58c-6 20-34 26-48 14c-18 8-52-2-62-24z" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/><path d="M178 66c-4 20 6 36 0 70M150 90c14 6 22 4 28 0M204 84c-10 8-16 8-26 6" fill="none" stroke="var(--c-clin)" stroke-width="1.5"/></g><text x="180" y="14" text-anchor="middle" class="f51-tk" style="font-weight:700">Serebral ödem</text><text x="180" y="206" text-anchor="middle" class="f51-tk">şişmiş beyin (kesik çizgi: normal boyut)</text></g>
        <g data-v="ca1 ca2 ca3 ca4"><rect x="16" y="104" width="214" height="30" rx="6" fill="var(--chip)" stroke="var(--line)" stroke-width="2"/><line x1="16" x2="230" y1="119" y2="119" stroke="var(--line)" stroke-dasharray="3 3"/>
          ${ca4.map((x) => `<path d="M${x + 10} 104V80M${x + 10} 90L${x} 76M${x + 10} 90L${x + 20} 76" stroke="var(--muted)" stroke-width="2.5" fill="none"/>`).join('')}
          <text x="16" y="20" class="f51-tk" style="font-weight:700">Hücre dışı (ECF)</text><text x="16" y="152" class="f51-tk" style="font-weight:700">Hücre içi (ICF)</text><text x="16" y="170" class="f51-tk">dış yüzde glikoprotein "dalları"</text></g>
        <g class="f51-ca" data-v="ca2 ca3 ca4">${ca4.map((x, i) => `<g class="cc" data-i="${i}" transform="translate(${x + 10} ${64})">${ionG('Ca', '2+', '', 11)}</g>`).join('')}</g>
        <g data-v="ca2 ca3 ca4"><text class="f51-pl" x="123" y="98" text-anchor="middle" style="font:800 13px var(--f-mono);fill:var(--accent-ink)">+ + + + + + +</text></g>
        <g data-v="na3 na4 ca3 ca4" class="f51-mini2"><line x1="262" x2="262" y1="${YM(-30)}" y2="${YM(-90)}" stroke="var(--line)" stroke-width="2"/>
          <g class="f51-ln-t"><line x1="262" x2="352" stroke="var(--crit)" stroke-width="2" stroke-dasharray="5 3"/><text x="266" y="-5" class="f51-tk" style="fill:var(--crit);font-weight:700">Eşik</text></g>
          <g class="f51-ln-r"><line x1="262" x2="352" stroke="var(--accent)" stroke-width="4"/><text x="266" y="15" class="f51-tk" style="fill:var(--accent-ink);font-weight:800">RMP</text></g></g>
        <g data-v="na4"><path d="M262 150H274L279 74L284 150H300L305 74L310 150H326L331 74L336 150H352" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="262" x2="352" y1="112" y2="112" stroke="var(--crit)" stroke-dasharray="5 3"/><text x="262" y="106" class="f51-tk" style="fill:var(--crit);font-weight:700">Eşik</text><text x="262" y="170" class="f51-tk">kendiliğinden AP</text></g>
      </svg>
      <div class="f51-chips" data-o="chips"></div>
      <div class="f51-sum"><p class="f51-lg" data-o="not"><b>Şekil 51.1'in özü.</b> Dört durumda RMP (kalın) ve eşik (kesikli), temsilî değerler.</p>
      <svg viewBox="0 0 360 156" class="f51-svg" role="img" aria-label="Normal, hipokalemi, hiperkalemi ve hipokalsemide RMP ve eşik potansiyeli">${strip}</svg></div></div>`;
    const q = (s) => el.querySelector(s), st = { k: '' };
    let tab = 'na', step = 0, playing = false, tm = 0;
    const svg = q('.f51-nac');
    const setLine = (cls, v) => { const g = q(cls); g.style.transition = RM ? 'none' : 'transform .6s'; g.style.transform = `translateY(${YM(v)}px)`; };
    const draw = () => {
      const key = tab + (step + 1);
      svg.querySelectorAll('[data-v]').forEach((g) => { g.style.display = g.dataset.v.split(' ').includes(key) ? '' : 'none'; });
      const dash = q('.f51-nac > g[data-v] > circle[data-v="na1"]'); if (dash) dash.style.display = key === 'na1' ? '' : 'none';
      const cg = q('.f51-cellg'); cg.style.transition = RM ? 'none' : 'transform .7s'; cg.style.transform = 'scale(1.25)';
      el.querySelectorAll('.ci').forEach((g, i) => { g.style.opacity = (key === 'na3' || key === 'na4') && i % 2 ? 0 : 1; });
      el.querySelectorAll('.cc').forEach((g, i) => { g.style.opacity = key === 'ca3' ? (i < 1 ? 1 : 0) : 1; g.style.transition = RM ? 'none' : 'opacity .5s'; });
      q('.f51-pl').style.opacity = key === 'ca3' ? 0.3 : 1;
      const P = { na3: [-58, -50], na4: [-58, -50], ca3: [-70, -60], ca4: [-60, -45] }[key];
      if (P) { setLine('.f51-ln-r', P[0]); setLine('.f51-ln-t', P[1]); }
      if (key === 'na3') { const a = q('.f51-ln-r'); a.style.transform = `translateY(${YM(-70)}px)`; void a.getBoundingClientRect(); setLine('.f51-ln-r', -58); }
      if (key === 'na4') { svg.querySelector('.f51-mini2').style.display = 'none'; }
      pressed(el, 'data-tab', tab);
      q('[data-a=play]').textContent = playing ? 'Duraklat' : 'Oynat';
      q('[data-o=chips]').innerHTML = CH[tab][step].map((t) => `<span class="f51-chip hiper">${t}</span>`).join('');
      el.querySelectorAll('.f51-col4').forEach((g) => { const on = tab === 'ca' && +g.dataset.c === 3; g.style.opacity = tab === 'ca' ? (on ? 1 : 0.45) : 1; });
      q('[data-o=not]').innerHTML = tab === 'na' ? '<b>Hiponatremi şekilde yok:</b> etkisi hücre şişmesiyle depolarizasyon. Aşağıda Şekil 51.1\'in özü (temsilî değerler).' : '<b>Şekil 51.1\'in özü.</b> Hipokalsemi sütunu vurgulu: eşik daha negatif (temsilî değerler).';
      setCap(el, STEPS[tab][step], st);
    };
    const adv = (d) => { step = (step + d + 4) % 4; draw(); };
    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.tab) { tab = b.dataset.tab; step = 0; playing = false; draw(); }
      else if (b.dataset.a === 'ileri') { playing = false; adv(1); }
      else if (b.dataset.a === 'geri') { playing = false; adv(-1); }
      else if (b.dataset.a === 'play') { if (RM) return; playing = !playing; tm = 0; draw(); }
    });
    draw();
    return ticker(el, (dt) => { if (!playing || RM) return; tm += dt; if (tm >= 3.4) { tm = 0; adv(1); } });
  };
})();
