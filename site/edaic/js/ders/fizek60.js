/* Ek ders · Ağrının periferik mekanizmaları · bileşenler (tarif: docs/tasarim/fizek60.md)
   Kaynak: K2 s. 399 (bağlam K1 s. 273–275). Modeller şematiktir; kitapta sayısal değer yoktur. */
(() => {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const LIM = 600; // bu genişliğin altında dar yerleşim
  let UID = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (x) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  const f1 = (v) => v.toFixed(1);
  const capEl = (el) => el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap');
  const setCap = (el, html) => { const c = capEl(el); if (c) c.innerHTML = REF(html); };
  const segH = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const wrapT = (s, max) => { const w = s.split(' '), out = []; let cur = ''; w.forEach((x) => { if ((cur + ' ' + x).trim().length > max && cur) { out.push(cur); cur = x; } else cur = (cur + ' ' + x).trim(); }); if (cur) out.push(cur); return out; };
  const tspans = (lines, x, lh) => lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${l}</tspan>`).join('');
  // alıcı (reseptör) simgesi: çanak + sap
  const REC = (extra) => `<path d="M-8 -12 Q-8 0 0 0 Q8 0 8 -12" class="fek60-rcp"/><path d="M0 0 V9" class="fek60-rcp"/><circle cy="-6" r="3.6" class="fek60-rcd" ${extra || ''}/>`;
  const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();

  /* =====================================================================
     1 · fek60_opioid — inflamasyonda periferik opioid reseptörleri
     ===================================================================== */
  const OP_CAP = [
    '1/5 · Dokuda inflamasyon başlar. Periferik uçta opioid reseptörü azdır; nosiseptif sinyal uçtan omuriliğe akar. [[K2 s. 399]]',
    '2/5 · Periferik inflamasyon arka kök gangliyonundaki nöron gövdesinde opioid reseptörü üretimini başlatır. [[K2 s. 399]]',
    '3/5 · Reseptörler akson boyunca merkeze değil, periferik uca doğru taşınır ve inflamasyonlu dokudaki uçta yerleşir. [[K2 s. 399]]',
    '4/5 · Monosit, makrofaj, T ve B lenfositleri endojen opioid peptitleri salar; bunlar periferik reseptörleri etkinleştirir ve ağrı sinyali azalır. [[K2 s. 399]]',
    '5/5 · Dışarıdan uygulanan morfin de aynı periferik reseptörleri etkinleştirir. Opioid reseptörleri μ, κ, δ sınıfında, G proteinine bağlı reseptörlerdir. [[K2 s. 399]] [[K1 s. 273]]',
  ];
  const OP_LEVEL = [1, 1, 1, 0.5, 0.2];
  const OP_G = {
    wide: {
      W: 760, H: 340, fs: 13.5,
      cloud: [18, 188, 290, 146], cloudLab: [32, 208],
      cord: [560, 40, 180, 160], horn: [625, 92, 58, 30], cordLab: [650, 32], cordLabA: 'middle',
      drg: [470, 90, 42, 30], drgLab: [[470, 142, 'Arka kök gangliyonu']],
      slots: [[458, 82], [482, 80], [462, 99], [484, 99], [470, 90]],
      p1: 'M470 90 L430 90 C 330 90 300 150 255 190 C 215 222 190 240 160 255',
      p2: 'M470 90 L512 90 C 545 90 560 100 598 100',
      E: [160, 255], tips: [[115, 235], [95, 275], [140, 305], [205, 300], [225, 255]],
      cells: [['Monosit', 50, 230, 14, 0, [50, 254, 'middle']], ['T hücresi', 50, 298, 14, 0, [50, 322, 'middle']], ['B hücresi', 262, 246, 14, 0, [284, 251, 'start']], ['Makrofaj', 248, 314, 18, 1, [272, 319, 'start']]],
      periferik: [232, 281, 'start'], transport: [[306, 214, 'Aksonal taşıma → periferik uç']], endo: [[312, 298, 'Endojen opioid peptitleri']], endoA: 'start',
      syr: [20, 24], needle: [150, 34], morLab: [20, 62],
      gLab: [650, 228], gBar: [560, 236, 180, 12],
    },
    narrow: {
      W: 380, H: 560, fs: 12.5,
      cloud: [10, 335, 360, 215], cloudLab: [22, 355],
      cord: [200, 10, 170, 100], horn: [285, 56, 68, 26], cordLab: [285, 104], cordLabA: 'middle',
      drg: [190, 170, 44, 30], drgLab: [[190, 222, 'Arka kök gangliyonu']],
      slots: [[178, 162], [200, 160], [180, 180], [202, 180], [190, 170]],
      p1: 'M190 170 L146 170 C 70 170 50 240 90 290 C 130 335 190 345 190 385 L190 420',
      p2: 'M190 170 L234 170 C 262 170 262 140 262 104',
      E: [190, 420], tips: [[135, 452], [150, 498], [205, 512], [255, 495], [265, 448]],
      cells: [['Monosit', 46, 428, 14, 0, [46, 452, 'middle']], ['T hücresi', 58, 512, 14, 0, [58, 536, 'middle']], ['B hücresi', 330, 515, 14, 0, [330, 545, 'middle']], ['Makrofaj', 330, 440, 18, 1, [330, 481, 'middle']]],
      periferik: [178, 410, 'end'], transport: [[200, 252, 'Aksonal taşıma'], [200, 268, '→ periferik uç']], endo: [[366, 410, 'Endojen opioid peptitleri']], endoA: 'end',
      syr: [10, 24], needle: [130, 34], morLab: [10, 66],
      gLab: [10, 98], gBar: [10, 106, 150, 12], gLabA: 'start',
    },
  };
  // hücre → alıcı eşlemesi: dört hücre ilk dört alıcıyı etkinleştirir; sonuncu (index 2, boş uç) morfine kalır
  const OP_MAP = [0, 1, 4, 3]; // hücre sırası → uç dizini
  const OP_EMPTY = 2;

  VIZ.fek60_opioid = (el) => {
    let step = RM ? 5 : 1, tt = RM ? 99 : 0, gt = 0, playing = false, narrow = null, touched = false, R = {};
    el.innerHTML = `<div class="fek60-ctl">${segH('Adım', 's', [1, 2, 3, 4, 5].map((i) => [i, String(i)]), step)}${RM ? '' : '<button type="button" class="btn fek60-play">Oynat</button>'}<button type="button" class="btn ghost fek60-reset">Baştan</button></div>
      <div class="fek60-wrap"></div>
      <div class="fek60-lej" aria-hidden="true"><span><i class="k-rc"></i>Opioid reseptörü</span><span><i class="k-ok"></i>Etkinleşmiş reseptör</span><span><i class="k-en"></i>Endojen opioid peptidi</span><span><i class="k-mo"></i>Morfin</span><span><i class="k-ag"></i>Ağrı sinyali</span></div>`;
    const wrap = el.querySelector('.fek60-wrap'), play = el.querySelector('.fek60-play');
    const mount = () => {
      const G = narrow ? OP_G.narrow : OP_G.wide, fs = G.fs;
      const t = (x, y, s, cls, a) => `<text x="${x}" y="${y}" class="fek60-t ${cls || ''}" style="font-size:${fs}px" text-anchor="${a || 'middle'}">${s}</text>`;
      const c = G.cord, d = G.drg, gb = G.gBar;
      let h = `<svg class="fek60-svg" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Arka kök gangliyonunda yapılan opioid reseptörlerinin periferik aksonla inflamasyonlu dokudaki sinir ucuna taşınması; bağışıklık hücrelerinin endojen opioid peptitleri ve dışarıdan morfin reseptörleri etkinleştirir, omuriliğe giden ağrı sinyali azalır">`;
      h += `<rect class="o-cloud" x="${G.cloud[0]}" y="${G.cloud[1]}" width="${G.cloud[2]}" height="${G.cloud[3]}" rx="44" style="fill:var(--crit-soft);stroke:var(--crit);stroke-width:1.5;stroke-dasharray:7 5"/>`;
      h += `<g class="o-cloudl">${t(G.cloudLab[0], G.cloudLab[1], 'İnflamasyon', 'fek60-crit', 'start')}</g>`;
      h += `<rect x="${c[0]}" y="${c[1]}" width="${c[2]}" height="${c[3]}" rx="20" style="fill:var(--chip);stroke:var(--line);stroke-width:1.5"/><ellipse cx="${G.horn[0]}" cy="${G.horn[1]}" rx="${G.horn[2]}" ry="${G.horn[3]}" style="fill:var(--line);opacity:.5"/>`;
      h += t(G.cordLab[0], G.cordLab[1], 'Omurilik (arka boynuz)', 'fek60-m', G.cordLabA);
      h += `<ellipse cx="${d[0]}" cy="${d[1]}" rx="${d[2]}" ry="${d[3]}" style="fill:var(--chip);stroke:var(--line);stroke-width:1.5"/><circle class="o-ring" cx="${d[0]}" cy="${d[1]}" r="26" style="fill:none;stroke:var(--c-basic);stroke-width:2.5;opacity:0"/><circle cx="${d[0]}" cy="${d[1]}" r="17" style="fill:var(--paper);stroke:var(--line);stroke-width:1.5"/>`;
      h += G.drgLab.map((l) => t(l[0], l[1], l[2], 'fek60-m')).join('');
      h += `<g class="o-ax"><path class="o-p1" d="${G.p1}" style="fill:none;stroke:var(--warn);stroke-width:3;stroke-linecap:round"/><path class="o-p2" d="${G.p2}" style="fill:none;stroke:var(--warn);stroke-width:3;stroke-linecap:round"/>`;
      G.tips.forEach((p) => { h += `<path d="M${G.E[0]} ${G.E[1]} L${p[0]} ${p[1]}" style="fill:none;stroke:var(--warn);stroke-width:2.5;stroke-linecap:round"/>`; });
      h += '</g>';
      h += t(G.periferik[0], G.periferik[1], 'Periferik uç', 'fek60-m', G.periferik[2]);
      G.cells.forEach(([n, x, y, r, mac, lb]) => {
        if (mac) { const pts = []; for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.2832, rr = r * (i % 2 ? 0.86 : 1.12); pts.push((x + Math.cos(a) * rr).toFixed(1) + ' ' + (y + Math.sin(a) * rr).toFixed(1)); } h += `<path d="M${pts.join(' L')}Z" style="fill:var(--c-clin-soft);stroke:var(--c-clin);stroke-width:2;stroke-linejoin:round"/>`; }
        else h += `<circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--c-clin-soft);stroke:var(--c-clin);stroke-width:2"/>`;
        h += `<circle cx="${x + 3}" cy="${y - 2}" r="${r * 0.32}" style="fill:var(--c-clin);opacity:.45"/>`;
        h += t(lb[0], lb[1], n, 'fek60-clin', lb[2]);
      });
      // ağrı noktaları, reseptörler, peptitler, morfin
      for (let i = 0; i < 16; i++) h += `<circle class="o-pd" r="4.2" style="fill:var(--warn)"/>`;
      for (let i = 0; i < 12; i++) h += `<circle class="o-pe" r="3.2" style="fill:var(--ok)" opacity="0"/>`;
      for (let i = 0; i < 5; i++) h += `<g class="o-rc" opacity="0">${REC()}</g>`;
      for (let i = 0; i < 3; i++) h += `<path class="o-mo" d="M0 -6 L5 0 L0 6 L-5 0Z" style="fill:var(--accent)" opacity="0"/>`;
      // şırınga
      const s = G.syr;
      h += `<g class="o-syr"><rect x="${s[0] + 12}" y="${s[1] + 2}" width="${narrow ? 56 : 70}" height="16" rx="3" style="fill:var(--paper);stroke:var(--accent);stroke-width:2"/><path d="M${s[0]} ${s[1] + 10} H${s[0] + 12} M${s[0]} ${s[1] + 3} V${s[1] + 17}" style="fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round"/><rect x="${s[0] + 18}" y="${s[1] + 5}" width="${narrow ? 30 : 38}" height="10" rx="2" style="fill:var(--accent);opacity:.55"/><path d="M${s[0] + (narrow ? 68 : 82)} ${s[1] + 10} H${G.needle[0]}" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round"/>${t(G.morLab[0], G.morLab[1], 'Morfin (dışarıdan)', 'fek60-acc', 'start')}</g>`;
      h += t(G.endo[0][0], G.endo[0][1], G.endo[0][2], 'fek60-ok o-endo', G.endoA);
      h += `<g class="o-trl">${G.transport.map((l) => t(l[0], l[1], l[2], 'fek60-c-basic', 'start')).join('')}</g>`;
      h += t(G.gLab[0], G.gLab[1], 'Ağrı sinyali', 'fek60-t', G.gLabA || 'middle');
      h += `<rect x="${gb[0]}" y="${gb[1]}" width="${gb[2]}" height="${gb[3]}" rx="6" style="fill:var(--chip);stroke:var(--line);stroke-width:1.5"/><rect class="o-gb" x="${gb[0]}" y="${gb[1]}" width="${gb[2]}" height="${gb[3]}" rx="6" style="fill:var(--warn)"/></svg>`;
      wrap.innerHTML = h;
      const q = (s2) => wrap.querySelector(s2), qa = (s2) => [...wrap.querySelectorAll(s2)];
      R = { G, cloud: q('.o-cloud'), cloudl: q('.o-cloudl'), ring: q('.o-ring'), p1: q('.o-p1'), p2: q('.o-p2'), ax: q('.o-ax'), pd: qa('.o-pd'), pe: qa('.o-pe'), rc: qa('.o-rc'), mo: qa('.o-mo'), syr: q('.o-syr'), endo: q('.o-endo'), trl: q('.o-trl'), gb: q('.o-gb') };
      R.L1 = R.p1.getTotalLength(); R.L2 = R.p2.getTotalLength();
    };
    const draw = () => {
      if (!R.G) return;
      const G = R.G, T = RM ? 99 : tt, lv0 = OP_LEVEL[Math.max(0, step - 2)], lv1 = OP_LEVEL[step - 1];
      const level = step === 1 ? 1 : lerp(lv0, lv1, ease(T / 1.4));
      const al = 0.35 + 0.65 * level;
      R.cloud.style.opacity = step === 1 ? 0.15 + 0.85 * ease((T - 0.8) / 1.4) : 1;
      R.cloudl.style.opacity = step === 1 ? clamp(ease((T - 0.8) / 1.4), 0.15, 1) : 1;
      R.ax.style.opacity = al;
      // ağrı noktaları
      const tot = R.L1 + R.L2, k = [1, 1, 1, 2, 5][step - 1], V = 110;
      R.pd.forEach((c, j) => {
        if (j % k) { c.setAttribute('opacity', 0); return; }
        const s = ((RM ? 0 : gt * V) + j * tot / 16) % tot;
        const p = s < R.L1 ? R.p1.getPointAtLength(R.L1 - s) : R.p2.getPointAtLength(s - R.L1);
        c.setAttribute('cx', f1(p.x)); c.setAttribute('cy', f1(p.y)); c.setAttribute('opacity', al.toFixed(2));
      });
      // gösterge
      R.gb.setAttribute('width', (G.gBar[2] * level).toFixed(1));
      // halka
      R.ring.style.opacity = step === 2 ? (RM ? 0.8 : 0.35 + 0.65 * Math.abs(Math.sin(T * 5))) : 0;
      // reseptörler
      const tips = G.tips;
      R.rc.forEach((g, i) => {
        let x, y, a = 1;
        const sl = G.slots[i];
        if (step === 1) a = 0;
        if (step === 2) { x = sl[0]; y = sl[1]; a = ease((T - 0.3 - i * 0.22) / 0.4); }
        if (step === 3) {
          const u = clamp((T - i * 0.1) / 2.4, 0, 1), b = R.p1.getPointAtLength(u * 0.8 * R.L1), q3 = u * u * u * u;
          const sh = 1 - Math.min(1, u * 6);
          x = lerp(b.x + sh * (sl[0] - b.x), tips[i][0], q3); y = lerp(b.y + sh * (sl[1] - b.y), tips[i][1], q3);
        }
        if (step >= 4) { x = tips[i][0]; y = tips[i][1]; }
        const e = i === OP_EMPTY ? step >= 5 && T > 2.0 : OP_MAP.includes(i) && (step === 4 ? T > 1.9 : step >= 5);
        g.setAttribute('opacity', a.toFixed(2));
        if (x != null) g.setAttribute('transform', `translate(${f1(x)} ${f1(y)})`);
        g.classList.toggle('on', !!e);
      });
      // peptitler (adım 4)
      R.pe.forEach((c, j) => {
        const cell = j % 4, d = Math.floor(j / 4), cl = G.cells[cell], tp = tips[OP_MAP[cell]];
        const p = step === 4 ? clamp((T - 0.3 - d * 0.35) / 1.0, 0, 1) : 0;
        if (p <= 0 || p >= 1) { c.setAttribute('opacity', 0); return; }
        const e2 = ease(p);
        c.setAttribute('cx', f1(lerp(cl[1], tp[0], e2))); c.setAttribute('cy', f1(lerp(cl[2], tp[1], e2))); c.setAttribute('opacity', 1);
      });
      // morfin
      R.syr.style.opacity = step < 5 ? 0.25 : 0.25 + 0.75 * ease(T / 0.4);
      R.mo.forEach((c, d) => {
        const p = step === 5 ? clamp((T - 0.3 - d * 0.4) / 1.1, 0, 1) : 0, tp = tips[OP_EMPTY];
        if (p <= 0 || p >= 1) { c.setAttribute('opacity', 0); return; }
        const e2 = ease(p);
        c.setAttribute('transform', `translate(${f1(lerp(G.needle[0] + 4, tp[0], e2))} ${f1(lerp(G.needle[1], tp[1], e2))})`); c.setAttribute('opacity', 1);
      });
      R.endo.style.opacity = step === 4 ? 1 : 0;
      R.trl.style.opacity = step === 3 ? 1 : 0;
    };
    const sync = () => { basSec(el, 's', step); if (play) play.textContent = playing ? 'Duraklat' : 'Oynat'; if (touched) setCap(el, OP_CAP[step - 1]); };
    const go = (n) => { step = n; tt = RM ? 99 : 0; touched = true; sync(); draw(); };
    const onClick = (e) => {
      const b = e.target.closest('[data-s]');
      if (b) { playing = false; go(+b.dataset.s); return; }
      if (e.target.closest('.fek60-play')) { if (playing) { playing = false; } else { if (step === 5 && tt >= 3) go(1); playing = true; touched = true; } sync(); return; }
      if (e.target.closest('.fek60-reset')) { playing = false; step = 1; tt = RM ? 99 : 0; if (RM) step = 5; touched = true; sync(); draw(); }
    };
    el.addEventListener('click', onClick);
    const fit = () => { const n = el.clientWidth < LIM; if (n !== narrow) { narrow = n; mount(); draw(); } };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(fit) : null; if (ro) ro.observe(el);
    fit(); sync();
    const stop = ticker(el, (dt) => {
      gt += dt;
      if (!RM) {
        tt = Math.min(99, tt + dt);
        if (playing && tt >= 3) { if (step < 5) { step++; tt = 0; sync(); } else { playing = false; sync(); } }
      }
      draw();
    });
    return () => { stop(); if (ro) ro.disconnect(); el.removeEventListener('click', onClick); };
  };

  /* =====================================================================
     2 · fek60_yaklasim — reseptör blokajı ile gen ifadesi düzenlemesi
     ===================================================================== */
  const YK_CAP = {
    L: 'Geleneksel yaklaşım: ilaç ligandın reseptöre bağlanmasını engeller ve nosiseptif ya da nöropatik girdiyi azaltır. [[K2 s. 399]]',
    R: 'Olası yeni yaklaşım: ilaç gen ifadesini düzenler; nosiseptif ve nöropatik iletimde görev alan belirli reseptörler daha az yapılır. [[K2 s. 399]]',
  };
  const RX = [50, 115, 180, 245, 310];

  VIZ.fek60_yaklasim = (el) => {
    const uid = ++UID;
    let sel = null, fa = { L: 1, R: 1 }, gt = 0, narrow = null, R = {};
    el.innerHTML = `<div class="fek60-ctl">${segH('Yaklaşım', 'y', [['L', 'Geleneksel'], ['R', 'Olası yeni yol'], ['N', 'İkisi birlikte']], 'N')}</div><div class="fek60-wrap"></div>`;
    const wrap = el.querySelector('.fek60-wrap');
    const panel = (k, x0, y0) => {
      const L = k === 'L', fs = 13;
      const t = (x, y, s, cls, a, sz) => `<text x="${x}" y="${y}" class="fek60-t ${cls || ''}" style="font-size:${sz || fs}px" text-anchor="${a || 'middle'}">${s}</text>`;
      const title = L ? 'Geleneksel: ligand–reseptör blokajı' : 'Olası yeni yol: gen ifadesini düzenlemek';
      const bot = L ? 'Reseptör var, ligand bağlanamaz' : 'Belirli reseptörün yapımı seçici olarak azaltılır';
      let h = `<g class="y-p" data-k="${k}" transform="translate(${x0} ${y0})" tabindex="0" role="button" aria-pressed="false" aria-label="${title}">`;
      h += `<rect x="0" y="0" width="360" height="290" rx="14" class="y-bg" style="fill:var(--paper);stroke:var(--line);stroke-width:1.5"/>`;
      h += t(180, 22, title, 'fek60-b', 'middle', 14);
      h += t(14, 46, 'Ligand', 'fek60-m', 'start');
      // zar
      h += `<path d="M18 100 H342 M18 108 H342" style="stroke:var(--line);stroke-width:2.5;fill:none"/>` + t(14, 126, 'Hücre zarı', 'fek60-m', 'start', 12.5);
      // yer tutucular (sağ) ve reseptörler
      RX.forEach((x, i) => {
        if (!L) h += `<rect class="y-ph" data-i="${i}" x="${x - 13}" y="84" width="26" height="28" rx="5" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:4 3" opacity="0"/>`;
        h += `<g class="y-rc" data-i="${i}" transform="translate(${x} 100)"><path d="M-9 -14 Q-9 0 0 0 Q9 0 9 -14" style="fill:none;stroke:var(--c-basic);stroke-width:2.6"/><path d="M0 0 V10" style="fill:none;stroke:var(--c-basic);stroke-width:2.6"/></g>`;
      });
      if (L) RX.slice(0, 4).forEach((x, i) => { h += `<g class="y-cap" data-i="${i}" transform="translate(${x} 72)"><path d="M-13 12 A13 13 0 0 1 13 12 Z" style="fill:var(--crit-soft);stroke:var(--crit);stroke-width:2"/><path d="M-4 3 L4 11 M4 3 L-4 11" style="stroke:var(--crit);stroke-width:2;fill:none;stroke-linecap:round"/></g>`; });
      // ligandlar
      const LS = L ? [0, 1, 2, 3] : [0, 1, 3, 4];
      LS.forEach((i, j) => { h += `<circle class="y-lg" data-j="${j}" data-x="${RX[i]}" r="4.6" style="fill:var(--warn)"/>`; });
      // çekirdek
      h += `<ellipse cx="180" cy="178" rx="84" ry="32" style="fill:var(--chip);stroke:var(--line);stroke-width:1.5"/>`;
      let s1 = '', s2 = ''; for (let i = 0; i <= 24; i++) { const x = 126 + i * 5.5, a = i * 0.6; s1 += (i ? 'L' : 'M') + f1(x) + ' ' + f1(178 + 7 * Math.sin(a)) + ' '; s2 += (i ? 'L' : 'M') + f1(x) + ' ' + f1(178 - 7 * Math.sin(a)) + ' '; }
      h += `<path d="${s1}" style="fill:none;stroke:var(--muted);stroke-width:1.8"/><path d="${s2}" style="fill:none;stroke:var(--muted);stroke-width:1.8"/>`;
      h += t(180, 226, 'Çekirdek', 'fek60-m', 'middle', 12.5);
      // mRNA oku
      h += `<g class="y-m1"><path d="M180 146 V122" style="stroke:var(--ink);stroke-width:2.8;fill:none"/><path d="M173 124 L180 112 L187 124Z" style="fill:var(--ink)"/></g>`;
      if (!L) h += `<g class="y-m2" opacity="0"><path d="M180 146 V122" style="stroke:var(--accent);stroke-width:1.3;fill:none;stroke-dasharray:4 3"/><path d="M175 122 L180 112 L185 122" style="stroke:var(--accent);stroke-width:1.3;fill:none"/></g>`;
      h += t(194, 134, 'mRNA', 'fek60-m', 'start', 12.5);
      if (!L) h += `<g class="y-dr" opacity="0"><path d="M214 178 L221 171 L228 178 L221 185Z" style="fill:var(--accent);stroke:var(--accent-ink);stroke-width:1"/></g>` + t(221, 199, 'İlaç', 'fek60-acc', 'middle', 12.5);
      // sinyal göstergesi
      h += t(14, 240, 'Nosiseptif / nöropatik mesaj →', 'fek60-m', 'start', 12.5);
      [8, 14, 20].forEach((hh, i) => { h += `<rect class="y-sb" data-i="${i}" x="${262 + i * 20}" y="${246 - hh}" width="13" height="${hh}" rx="2" style="fill:var(--warn)"/>`; });
      // alt etiket
      const bl = wrapT(bot, 34);
      h += `<text x="180" y="${bl.length > 1 ? 268 : 276}" class="fek60-t fek60-b" style="font-size:${fs}px" text-anchor="middle">${tspans(bl, 180, 15)}</text>`;
      return h + '</g>';
    };
    const mount = () => {
      const W = narrow ? 380 : 760, H = narrow ? 646 : 336;
      const p0 = narrow ? [10, 0] : [10, 0], p1 = narrow ? [10, 300] : [390, 0], sy = narrow ? 602 : 298, sw = narrow ? 360 : 740;
      let h = `<svg class="fek60-svg" viewBox="0 0 ${W} ${H}" role="group" aria-label="İki yaklaşımın karşılaştırması: solda reseptör blokajı, sağda gen ifadesini düzenleyen ilaç">`;
      h += panel('L', p0[0], p0[1]) + panel('R', p1[0], p1[1]);
      h += `<rect x="10" y="${sy}" width="${sw}" height="${narrow ? 34 : 30}" rx="9" style="fill:var(--chip);stroke:var(--line);stroke-width:1.5"/><text x="${10 + sw / 2}" y="${sy + (narrow ? 22 : 20)}" class="fek60-t fek60-b" style="font-size:13px" text-anchor="middle">Hedef: nosiseptif ve nöropatik mesajın iletimi</text></svg>`;
      wrap.innerHTML = h;
      R = {};
      ['L', 'R'].forEach((k) => {
        const g = wrap.querySelector(`.y-p[data-k="${k}"]`), qa = (s) => [...g.querySelectorAll(s)];
        R[k] = { g, lg: qa('.y-lg'), rc: qa('.y-rc'), ph: qa('.y-ph'), cap: qa('.y-cap'), sb: qa('.y-sb'), m1: g.querySelector('.y-m1'), m2: g.querySelector('.y-m2'), dr: g.querySelector('.y-dr') };
        const tog = () => select(sel === k ? null : k);
        g.addEventListener('click', tog);
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      });
      draw();
    };
    const ORD = [0, 4, 1, 3]; // sağ panelde sırayla kaybolan reseptörler (2. kalır)
    const draw = () => {
      if (!R.L) return;
      ['L', 'R'].forEach((k) => {
        const r = R[k], f = fa[k], on = sel === k, anim = on && !RM && f < 1.5;
        r.g.style.opacity = sel && !on ? 0.4 : 1;
        r.g.setAttribute('aria-pressed', String(on));
        r.sb.forEach((b, i) => { const keep = i === 0 ? 1 : 1 - ease(f * 1.2); b.style.opacity = i === 0 ? 1 : lerp(1, 0, ease(f)); b.style.fill = i === 0 || f < 1 ? 'var(--warn)' : 'var(--warn)'; });
        if (k === 'L') {
          r.cap.forEach((c, i) => { const x = RX[i]; c.setAttribute('transform', `translate(${x} ${f1(72 - 16 * (1 - ease(f)))})`); c.style.opacity = ease(f * 1.6); });
          r.lg.forEach((c, j) => {
            const x = +c.dataset.x; let y = 46 + 8 * j % 3;
            if (on && !RM) { const p = ((gt * 0.9 + j * 0.25) % 1), q = p < 0.5 ? p * 2 : 2 - p * 2; y = 42 + q * 22; c.setAttribute('cx', x + (p < 0.5 ? 0 : (p - 0.5) * 8)); }
            else { y = 56 + (j % 2) * 4; c.setAttribute('cx', x); }
            c.setAttribute('cy', f1(y)); c.setAttribute('opacity', 1);
          });
        } else {
          r.rc.forEach((g, i) => { const rank = ORD.indexOf(i); const a = rank < 0 ? 1 : 1 - ease(f * 5 - rank); g.style.opacity = a; r.ph[i].setAttribute('opacity', rank < 0 ? 0 : (1 - a) * 0.9); });
          r.m1.style.opacity = 1 - ease(f * 1.5); r.m2.setAttribute('opacity', ease(f * 1.5)); r.dr.setAttribute('opacity', ease(f * 3));
          r.lg.forEach((c, j) => {
            const x = +c.dataset.x;
            if (on && !RM) { const p = (gt * 0.55 + j * 0.27) % 1; c.setAttribute('cy', f1(44 + p * 50)); c.setAttribute('opacity', p > 0.8 ? (1 - p) / 0.2 : 1); }
            else { c.setAttribute('cy', f1(56 + (j % 2) * 4)); c.setAttribute('opacity', 1); }
            c.setAttribute('cx', x);
          });
        }
      });
    };
    const defHtml = capEl(el) ? capEl(el).innerHTML : '';
    const select = (v) => {
      sel = v; basSec(el, 'y', v || 'N');
      if (v) { fa[v] = RM ? 1 : 0; setCap(el, YK_CAP[v]); } else { const c = capEl(el); if (c) c.innerHTML = defHtml; }
      draw();
    };
    const onClick = (e) => { const b = e.target.closest('[data-y]'); if (b) select(b.dataset.y === 'N' ? null : b.dataset.y); };
    el.addEventListener('click', onClick);
    const fit = () => { const n = el.clientWidth < LIM; if (n !== narrow) { narrow = n; mount(); } };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(fit) : null; if (ro) ro.observe(el);
    fit();
    const stopT = ticker(el, (dt) => { gt += dt; if (!RM) ['L', 'R'].forEach((k) => { if (fa[k] < 1) fa[k] = Math.min(1, fa[k] + dt / 1.5); }); draw(); });
    return () => { stopT(); if (ro) ro.disconnect(); el.removeEventListener('click', onClick); };
  };

  /* =====================================================================
     3 · fek60_nmda — AMPA'dan NMDA'ya: uzun uyarım, wind-up, antagonist
     ===================================================================== */
  const NM_KART = ['Wind-up: tekrarlayan uyarımla yanıt giderek artar', 'Fasilitasyon', 'Santral sensitizasyon', 'Periferik reseptif alanlarda değişiklik', 'Erken yanıt genlerinin indüksiyonu', 'Uzun süreli potansiyasyon: ağrı için hücresel "bellek"'];
  const NM_CAP = {
    k: 'Kısa bir uyaranda yanıtı AMPA gibi NMDA dışı reseptörler taşır; bu, duyusal bilginin olağan işlenmesidir. [[K2 s. 399]]',
    u13: 'Glutamat uzun süre salınır ve nörokinin reseptörleri etkinleşir: bu ikincil süreç NMDA reseptörünü aktivasyona hazırlar. [[K2 s. 399]]',
    u4: 'NMDA etkinleşti: hücre içi ikincil olaylar nosiseptif sistemin yanıt verebilirliğini artırır. Aynı uyarana yanıt giderek büyür (wind-up); uzun süreli potansiyasyon ağrıya hücresel bir "bellek" kazandırabilir. [[K2 s. 399]]',
    a: 'NMDA antagonisti bu yanıtları zayıflatabilir: yanıt artışı küçük kalır. Bu yüzden NMDA antagonistlerinin kronik ağrıyı önlemede rolü olabileceği düşünülür. [[K2 s. 399]]',
  };
  const STIM = 0.8;

  VIZ.fek60_nmda = (el) => {
    let mode = 'k', antag = false, tm = STIM, gt = 0, playing = false, touched = false, narrow = null, R = {}, capKey = '';
    const N = () => (mode === 'k' ? 1 : 10), END = () => N() * STIM;
    el.innerHTML = `<div class="fek60-ctl">${segH('Uyaran deseni', 'm', [['k', 'Kısa uyaran'], ['u', 'Uzun / tekrarlayan uyaran']], mode)}<button type="button" class="btn ghost fek60-ant" aria-pressed="false">NMDA antagonisti: kapalı</button>${RM ? '' : '<button type="button" class="btn fek60-play">Oynat</button><button type="button" class="btn ghost fek60-reset">Baştan</button>'}</div><div class="fek60-wrap"></div>`;
    const wrap = el.querySelector('.fek60-wrap'), play = el.querySelector('.fek60-play'), antB = el.querySelector('.fek60-ant');
    const mount = () => {
      const n = narrow, fs = n ? 12.5 : 13;
      const ox = n ? 10 : 20, W = n ? 380 : 760, H = n ? 660 : 400;
      const t = (x, y, s, cls, a, sz) => `<text x="${x}" y="${y}" class="fek60-t ${cls || ''}" style="font-size:${sz || fs}px" text-anchor="${a || 'middle'}">${s}</text>`;
      const ax = ox + 65, kx = ox + 180, nx = ox + 295;
      const memY = 150;
      const ch = n ? { x0: 46, base: 414, slot: 32.5, bw: 22, unit: 44, legY: 266 } : { x0: 450, base: 204, slot: 28.5, bw: 20, unit: 46, legY: 36 };
      let h = `<svg class="fek60-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sinaps: birinci sıra nöron ucundan glutamat ve P maddesi salınır; AMPA, nörokinin ve NMDA reseptörleri; yanındaki grafik tekrarlayan uyaranda AMPA ve NMDA yanıt paylarını; altta NMDA'ya bağlı altı süreç">`;
      // sinaps
      h += `<rect x="${ox + 70}" y="16" width="220" height="56" rx="22" style="fill:var(--chip);stroke:var(--line);stroke-width:1.5"/>` + t(ox + 180, 36, 'Birinci sıra nöron ucu', 'fek60-t', 'middle');
      for (let i = 0; i < 6; i++) h += `<circle cx="${ox + 120 + i * 24}" cy="55" r="5" style="fill:none;stroke:var(--muted);stroke-width:1.3"/>`;
      h += `<rect x="${ox + 4}" y="${memY}" width="352" height="18" rx="5" style="fill:var(--chip);stroke:var(--line);stroke-width:1.5"/>`;
      h += t(ox + 6, 208, 'İkinci sıra nöron', 'fek60-m', 'start', n ? 12.5 : 12.5);
      // reseptörler
      h += `<rect x="${ax - 11}" y="${memY - 16}" width="22" height="20" rx="4" style="fill:var(--c-basic);opacity:.9"/>` + t(ax, 188, 'AMPA', 'fek60-c-basic fek60-b');
      h += `<path d="M${kx - 16} ${memY - 22} L${kx} ${memY - 6} L${kx + 16} ${memY - 22} L${kx + 16} ${memY - 14} L${kx + 5} ${memY + 2} H${kx - 5} L${kx - 16} ${memY - 14}Z" style="fill:var(--c-clin);opacity:.9"/>` + `<text x="${kx}" y="${n ? 180 : 180}" class="fek60-t fek60-clin fek60-b" style="font-size:${fs}px" text-anchor="middle">${tspans(['Nörokinin', 'reseptörü'], kx, 14)}</text>`;
      h += `<g class="m-nmda"><rect x="${nx - 18}" y="${memY - 20}" width="13" height="38" rx="3" style="fill:var(--accent)"/><rect x="${nx + 5}" y="${memY - 20}" width="13" height="38" rx="3" style="fill:var(--accent)"/></g>` + t(nx, 188, 'NMDA', 'fek60-acc fek60-b');
      h += `<circle class="m-mg" cx="${nx}" cy="${memY - 12}" r="7.5" style="fill:var(--muted)"/><text class="m-mgt fek60-t" x="${nx}" y="${memY - 24}" style="font-size:12px" text-anchor="middle">Mg²⁺</text>`;
      h += `<g class="m-lock" opacity="0"><rect x="${nx - 11}" y="${memY - 62}" width="22" height="18" rx="3" style="fill:var(--crit-soft);stroke:var(--crit);stroke-width:2"/><path d="M${nx - 6} ${memY - 62} v-5 a6 6 0 0 1 12 0 v5" style="fill:none;stroke:var(--crit);stroke-width:2"/><path d="M${nx - 5} ${memY - 57} L${nx + 5} ${memY - 47} M${nx + 5} ${memY - 57} L${nx - 5} ${memY - 47}" style="stroke:var(--crit);stroke-width:2;fill:none;stroke-linecap:round"/>${t(nx, memY - 78, 'NMDA antagonisti', 'fek60-crit fek60-b')}</g>`;
      // kalıcı glutamat / P maddesi
      for (let i = 0; i < 10; i++) h += `<circle class="m-ag" data-i="${i}" cx="${ox + 30 + rnd() * 300}" cy="${84 + rnd() * 40}" r="3" style="fill:var(--warn)" opacity="0"/>`;
      for (let i = 0; i < 8; i++) h += `<circle class="m-ap" data-i="${i}" cx="${ox + 30 + rnd() * 300}" cy="${88 + rnd() * 40}" r="3" style="fill:var(--c-clin)" opacity="0"/>`;
      // düşen noktalar
      for (let i = 0; i < 3; i++) h += `<circle class="m-fa" r="3.8" style="fill:var(--warn)" opacity="0"/>`;
      for (let i = 0; i < 2; i++) h += `<circle class="m-fn" r="3.8" style="fill:var(--warn)" opacity="0"/>`;
      for (let i = 0; i < 2; i++) h += `<circle class="m-fp" r="3.8" style="fill:var(--c-clin)" opacity="0"/>`;
      // lejant (sinaps)
      h += `<circle cx="${ox + 4}" cy="${n ? 98 : 106}" r="0"/>`;
      h += `<g class="m-lj"><circle cx="${ox + 8}" cy="30" r="4" style="fill:var(--warn)"/>${t(ox + 16, 34, 'Glutamat', 'fek60-m', 'start', 12.5)}<circle cx="${ox + 8}" cy="48" r="4" style="fill:var(--c-clin)"/>${t(ox + 16, 52, 'P maddesi', 'fek60-m', 'start', 12.5)}</g>`;
      // Ca
      for (let i = 0; i < 5; i++) h += `<circle class="m-ca" data-i="${i}" r="3.6" style="fill:var(--ok)" opacity="0"/>`;
      h += `<g class="m-cal" opacity="0">${t(ox + 6, 232, 'Ca²⁺ → hücre içi ikincil olaylar → yanıt verebilirlik ↑', 'fek60-ok fek60-b', 'start', n ? 11.5 : 13)}</g>`;
      // grafik
      const gx0 = ch.x0, gb = ch.base, topY = gb - 2.75 * ch.unit - 4;
      h += `<path d="M${gx0 - 6} ${gb} H${gx0 + 10 * ch.slot + 2} M${gx0 - 6} ${gb} V${topY}" style="stroke:var(--muted);stroke-width:1.5;fill:none"/>`;
      h += `<text transform="translate(${gx0 - 14} ${gb - 4}) rotate(-90)" class="fek60-t fek60-m" style="font-size:12.5px" text-anchor="start">postsinaptik yanıt</text>`;
      h += t(gx0 + 5 * ch.slot, gb + 20, 'uyaran 1 … 10', 'fek60-m', 'middle', 12.5);
      h += `<rect x="${gx0}" y="${ch.legY - 10}" width="12" height="12" rx="2" style="fill:var(--c-basic)"/>${t(gx0 + 17, ch.legY, 'AMPA payı', 'fek60-m', 'start', 12.5)}<rect x="${gx0 + 100}" y="${ch.legY - 10}" width="12" height="12" rx="2" style="fill:var(--accent)"/>${t(gx0 + 117, ch.legY, 'NMDA payı', 'fek60-m', 'start', 12.5)}`;
      h += t(gx0 + 10 * ch.slot, ch.legY + (n ? 17 : 17), 'şematik · ölçeksiz', 'fek60-m fek60-it', 'end', 12);
      for (let i = 0; i < 10; i++) { const x = gx0 + i * ch.slot + (ch.slot - ch.bw) / 2; h += `<rect class="m-ba" x="${x}" y="${gb}" width="${ch.bw}" height="0" style="fill:var(--c-basic)"/><rect class="m-bn" x="${x}" y="${gb}" width="${ch.bw}" height="0" style="fill:var(--accent)"/>`; }
      // kartlar
      NM_KART.forEach((s, i) => {
        const cw = n ? 176 : 232, chh = n ? 64 : 54, c = n ? i % 2 : i % 3, r = n ? Math.floor(i / 2) : Math.floor(i / 3);
        const x = n ? 10 + c * 184 : 20 + c * 244, y = n ? 452 + r * 70 : 268 + r * 62;
        const lines = wrapT(s, n ? 23 : 34), mid = y + chh / 2 - (lines.length - 1) * 7 + 4.5;
        h += `<g class="m-kt" data-i="${i}"><rect x="${x}" y="${y}" width="${cw}" height="${chh}" rx="10" class="m-ktr"/><text x="${x + cw / 2}" y="${mid}" class="fek60-t m-ktt" style="font-size:${fs - 0.5}px" text-anchor="middle">${tspans(lines, x + cw / 2, 14)}</text></g>`;
      });
      if (n) h += '';
      h += '</svg>';
      wrap.innerHTML = h;
      const qa = (s) => [...wrap.querySelectorAll(s)], q = (s) => wrap.querySelector(s);
      R = { n, ox, ax, kx, nx, memY, ch, nmda: q('.m-nmda'), mg: q('.m-mg'), mgt: q('.m-mgt'), lock: q('.m-lock'), ag: qa('.m-ag'), ap: qa('.m-ap'), fa: qa('.m-fa'), fn: qa('.m-fn'), fp: qa('.m-fp'), ca: qa('.m-ca'), cal: q('.m-cal'), ba: qa('.m-ba'), bn: qa('.m-bn'), kt: qa('.m-kt') };
    };
    const state = () => {
      const E = END(), t = Math.min(tm, E), fin = tm >= E - 1e-6, started = tm > 0 || fin;
      const cur = !started ? 0 : fin ? N() : Math.floor(t / STIM) + 1;
      return { t, fin, cur, fr: fin ? 1 : (t % STIM) / STIM, u: mode === 'u' };
    };
    const draw = () => {
      if (!R.ba) return;
      const { t, fin, cur, fr, u } = state(), ch = R.ch;
      const mgf = u ? ease((t - 2.4) / 0.6) : 0, act = u && !antag ? ease((t - 2.4) / 0.6) : 0;
      R.nmda.style.opacity = 0.35 + 0.65 * (antag ? 0.5 : act) ; R.nmda.querySelectorAll('rect').forEach((r) => { r.style.strokeDasharray = antag ? '4 3' : ''; r.style.stroke = antag ? 'var(--crit)' : 'none'; r.style.strokeWidth = 2; });
      R.mg.setAttribute('cx', f1(R.nx + mgf * 22)); R.mg.setAttribute('cy', f1(R.memY - 12 - mgf * 18)); R.mg.style.opacity = 1 - 0.45 * mgf;
      R.mgt.setAttribute('x', f1(R.nx + mgf * 22)); R.mgt.setAttribute('y', f1(R.memY - 24 - mgf * 18)); R.mgt.style.opacity = 1 - 0.3 * mgf;
      R.lock.setAttribute('opacity', antag ? 1 : 0);
      // kalıcı noktalar
      const ng = u ? Math.min(10, cur) : 0, np = u ? Math.min(8, cur) : 0;
      R.ag.forEach((c, i) => c.setAttribute('opacity', i < ng ? 0.8 : 0)); R.ap.forEach((c, i) => c.setAttribute('opacity', i < np ? 0.8 : 0));
      // düşen noktalar
      const run = cur > 0 && !fin && !RM, p = ease(fr / 0.7), fade = fr < 0.75 ? 1 : clamp(1 - (fr - 0.75) / 0.25, 0, 1);
      const y0 = 74, yr = R.memY - 24;
      R.fa.forEach((c, i) => { if (!run) { c.setAttribute('opacity', 0); return; } c.setAttribute('cx', R.ax + (i - 1) * 9); c.setAttribute('cy', f1(lerp(y0, yr, p))); c.setAttribute('opacity', fade); });
      R.fn.forEach((c, i) => { if (!run || !u || mgf < 0.2) { c.setAttribute('opacity', 0); return; } c.setAttribute('cx', R.nx + (i ? 8 : -8) + 0); c.setAttribute('cy', f1(lerp(y0, antag ? R.memY - 40 : R.memY - 24, p))); c.setAttribute('opacity', fade); });
      R.fp.forEach((c, i) => { if (!run || !u) { c.setAttribute('opacity', 0); return; } c.setAttribute('cx', R.kx + (i ? 7 : -7)); c.setAttribute('cy', f1(lerp(y0, R.memY - 26, p))); c.setAttribute('opacity', fade); });
      // Ca
      R.ca.forEach((c, i) => { if (act < 0.3) { c.setAttribute('opacity', 0); return; } const yy = 196 + ((RM ? i * 4.4 : gt * 14 + i * 4.4) % 22); c.setAttribute('cx', R.nx - 10 + i * 5); c.setAttribute('cy', f1(yy)); c.setAttribute('opacity', act); });
      R.cal.setAttribute('opacity', act > 0.3 ? act : 0);
      // çubuklar
      const ntot = (i1) => (u && i1 >= 4 ? (antag ? 0.25 : 0.25 * (i1 - 3)) : 0);
      for (let i = 0; i < 10; i++) {
        const i1 = i + 1, s = i1 < cur || fin && i1 <= N() ? 1 : i1 === cur ? ease(fr * 3) : 0;
        const ha = s * ch.unit * 1, hn = s * ch.unit * ntot(i1);
        R.ba[i].setAttribute('y', f1(ch.base - ha)); R.ba[i].setAttribute('height', f1(ha));
        R.bn[i].setAttribute('y', f1(ch.base - ha - hn)); R.bn[i].setAttribute('height', f1(hn));
      }
      // kartlar
      const lit = u && !antag ? clamp(cur - 3, 0, 6) : 0;
      R.kt.forEach((g, i) => { const on = i < lit; g.classList.toggle('on', on); g.classList.toggle('ant', u && antag && cur >= 4); });
      // açıklama
      if (touched) {
        const key = !u || cur === 0 ? 'k' : antag ? 'a' : cur >= 4 ? 'u4' : 'u13';
        const k2 = !u ? 'k' : (cur === 0 ? 'u13' : key);
        if (k2 !== capKey) { capKey = k2; setCap(el, NM_CAP[k2]); }
      }
    };
    const sync = () => {
      basSec(el, 'm', mode);
      antB.setAttribute('aria-pressed', String(antag)); antB.textContent = 'NMDA antagonisti: ' + (antag ? 'açık' : 'kapalı');
      if (play) play.textContent = playing ? 'Duraklat' : 'Oynat';
    };
    const restart = () => { touched = true; capKey = ''; if (RM) { tm = END(); playing = false; } else { tm = 0; playing = true; } sync(); draw(); };
    const onClick = (e) => {
      const m = e.target.closest('[data-m]');
      if (m) { mode = m.dataset.m; restart(); return; }
      if (e.target.closest('.fek60-ant')) { antag = !antag; if (mode === 'u') restart(); else { touched = true; capKey = ''; sync(); draw(); } return; }
      if (e.target.closest('.fek60-play')) { touched = true; if (playing) playing = false; else { if (tm >= END() - 1e-6) tm = 0; playing = true; } capKey = ''; sync(); draw(); return; }
      if (e.target.closest('.fek60-reset')) { playing = false; tm = 0; touched = true; capKey = ''; sync(); draw(); }
    };
    el.addEventListener('click', onClick);
    const fit = () => { const n = el.clientWidth < LIM; if (n !== narrow) { narrow = n; mount(); draw(); } };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(fit) : null; if (ro) ro.observe(el);
    fit(); sync();
    const stop = ticker(el, (dt) => {
      gt += dt;
      if (playing && !RM) { tm += dt; if (tm >= END()) { tm = END(); playing = false; sync(); } }
      draw();
    });
    return () => { stop(); if (ro) ro.disconnect(); el.removeEventListener('click', onClick); };
  };
})();
