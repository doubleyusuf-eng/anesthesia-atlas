/* Bölüm 56 · Düz kas · bileşenler (tarif: docs/tasarim/fiz56.md; K1 s. 249–251).
   Modeller şematiktir; kitabın verdiği tek sayılar: yavaş dalga sıklığı (duodenum ≈ 12/dk, kolon 3/dk) ve
   düz kasın 10 kata kadar yavaş, 30 kata kadar uzun kasılması (gerim eşit). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const isNarrow = (el) => (el.clientWidth || window.innerWidth) < 560;
  const setCap = (el, html) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const setSeg = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const spindle = (cx, cy, w, h) => { const x0 = cx - w / 2, x1 = cx + w / 2; return `M${x0} ${cy}C${x0 + w * 0.28} ${cy - h * 0.62} ${x1 - w * 0.28} ${cy - h * 0.62} ${x1} ${cy}C${x1 - w * 0.28} ${cy + h * 0.62} ${x0 + w * 0.28} ${cy + h * 0.62} ${x0} ${cy}Z`; };
  const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  // yerleşim değişince (dar/geniş) yalnız çizimi yeniden kurar
  const mount = (el, build) => {
    let nar = null, ro = null;
    const check = () => { const n = isNarrow(el); if (n !== nar) { nar = n; build(n); } };
    check();
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(check); ro.observe(el); }
    return () => { if (ro) ro.disconnect(); };
  };

  /* ================= 1 · Tek üniteli ve çok üniteli düz kas ================= */
  VIZ.f56_tip = (el) => {
    let tip = 'tek', dal = '1', t = -1, final = false, capKey = '', seqI = 0, cells = [], sel = [], sch = null, dots = [], sigEls = [], cellEls = [], end = 0;
    const SEQ = [7, 2, 10, 4, 0, 9, 5, 11, 1, 8, 3, 6];
    const CAP = {
      tek0: '<b>Tek üniteli.</b> Sinir tabakadaki tek bir hücreyi uyarır; aksiyon potansiyeli gap junction\'larla komşu hücrelere hızla yayılır ve tabaka eşzamanlı kasılır. "Uyar"a basın. [[K1 s. 249]]',
      tek1: '<b>Eşzamanlı kasılma.</b> Tabaka sinsityal bir birim gibi davranır. İç organlarda ve büyük elastik arterler dışındaki damarlarda bulunur. [[K1 s. 249]]',
      cok1: '<b>Çok üniteli.</b> Gap junction yoktur; uyarılan dalın hücresi kasılır, komşuları kasılmaz. Tek sinirin dallanıp birçok hücreyi innerve etmesi iskelet kasındaki motor üniteye benzer. [[K1 s. 249]]',
      cokH: '<b>Bütün dallar.</b> Her hücre kendi sinir dalıyla uyarılır. Büyük elastik arterlerde, trakeada ve iriste bulunur. [[K1 s. 249]]',
    };
    const baseKey = () => (tip === 'tek' ? 'tek0' : dal === '1' ? 'cok1' : 'cokH');
    const capSet = (k) => { if (k !== capKey) { capKey = k; setCap(el, CAP[k]); } };
    el.innerHTML = `<div class="f56-ctl">${segHtml('Tip', 'tip', [['tek', 'Tek üniteli'], ['cok', 'Çok üniteli']], tip)}<span class="f56-dalw" hidden>${segHtml('Uyarılan dal', 'dal', [['1', '1 dal'], ['h', 'Bütün dallar']], dal)}</span><button type="button" class="btn f56-go">Uyar</button></div><div class="f56-box"></div><p class="f56-yer"></p>`;
    const box = el.querySelector('.f56-box'), go = el.querySelector('.f56-go'), yer = el.querySelector('.f56-yer'), dalw = el.querySelector('.f56-dalw');
    const reset = () => { t = -1; final = false; sch = null; sel = []; capKey = ''; };
    const build = (narrow) => {
      const nc = narrow ? 3 : 5, nr = narrow ? 4 : 3, W = narrow ? 360 : 640, cw = narrow ? 84 : 90, chh = 26;
      const pitch = tip === 'tek' ? cw + 6 : cw + (narrow ? 16 : 18);
      const xs = (W - (nc * pitch + pitch / 2)) / 2 + pitch / 2, y0 = narrow ? 96 : 88, ry = narrow ? 40 : 38, trunk = narrow ? 50 : 46;
      const H = y0 + (nr - 1) * ry + chh / 2 + 40;
      cells = [];
      for (let r = 0; r < nr; r++) for (let c = 0; c < nc; c++) cells.push({ r, c, cx: xs + c * pitch + (r % 2) * pitch / 2, cy: y0 + r * ry });
      let s = '';
      if (tip === 'tek') {
        cells.forEach((a) => {
          if (a.c < nc - 1) s += `<path class="f56-gj" d="M${a.cx + pitch / 2 - 2} ${a.cy - 4}v8M${a.cx + pitch / 2 + 2} ${a.cy - 4}v8"/>`;
          if (a.r > 0) cells.filter((u) => u.r === a.r - 1 && Math.abs(u.cx - a.cx) < pitch * 0.7).forEach((u) => { const mx = (a.cx + u.cx) / 2, my = (a.cy + u.cy) / 2; s += `<path class="f56-gj" d="M${mx - 4} ${my - 2}h8M${mx - 4} ${my + 2}h8"/>`; });
        });
      }
      cells.forEach((a, i) => { s += `<g class="f56-tc" data-i="${i}"><path class="f56-tc-b" d="${spindle(a.cx, a.cy, cw, chh)}"/><path class="f56-tc-a" d="${spindle(a.cx, a.cy, cw, chh)}"/><ellipse class="f56-tc-n" cx="${a.cx}" cy="${a.cy}" rx="8" ry="4.2"/></g>`; });
      dots = [];
      const c0 = cells[0], ctop = (a) => a.cy - chh / 2;
      if (tip === 'tek') {
        s += `<path class="f56-nv" d="M${c0.cx} ${trunk - 20}V${ctop(c0)}"/><circle class="f56-nvd" cx="${c0.cx}" cy="${ctop(c0) - 2}" r="3.5"/><text class="f56-lb" x="${c0.cx + 10}" y="${trunk - 14}">Otonom sinir</text>`;
        dots.push({ x1: c0.cx, y1: trunk - 20, x2: c0.cx, y2: ctop(c0) - 2 });
        s += `<path class="f56-gj" d="M16 ${H - 22}v9M20 ${H - 22}v9"/><text class="f56-lb" x="28" y="${H - 13}">Gap junction</text><text class="f56-lb" x="${W - 10}" y="${H - 13}" text-anchor="end">Sinsityal tabaka</text>`;
      } else {
        const maxx = Math.max(...cells.map((a) => a.cx));
        s += `<path class="f56-nv" d="M${c0.cx} ${trunk - 22}V${trunk}H${maxx}"/>`;
        cells.forEach((a) => { s += `<path class="f56-nv f56-nvb" d="M${a.cx} ${trunk}V${ctop(a)}"/><circle class="f56-nvd" cx="${a.cx}" cy="${ctop(a) - 2}" r="2.6"/>`; dots.push({ x1: a.cx, y1: trunk, x2: a.cx, y2: ctop(a) - 2 }); });
        s += `<text class="f56-lb" x="${c0.cx + 8}" y="${trunk - 24}">Tek otonom sinir, birçok dal</text><text class="f56-lb f56-mut" x="10" y="${H - 13}">Gap junction yok</text>`;
      }
      s += dots.map(() => '<circle class="f56-sig" r="4.5" cx="0" cy="0" opacity="0"/>').join('');
      box.innerHTML = `<svg class="f56-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${tip === 'tek' ? 'Tek üniteli düz kas: tek sinir ucu, gap junction ile bağlı hücre tabakası' : 'Çok üniteli düz kas: tek sinirin her hücreye giden ayrı dalları, gap junction yok'}">${s}</svg>`;
      cellEls = [...box.querySelectorAll('.f56-tc')]; sigEls = [...box.querySelectorAll('.f56-sig')];
      yer.innerHTML = tip === 'tek' ? '<b>Yer:</b> iç organlar; büyük elastik arterler dışındaki damarlar' : '<b>Yer:</b> büyük elastik arterler · trakea · iris';
      dalw.hidden = tip !== 'cok';
      go.textContent = RM && final ? 'Sıfırla' : 'Uyar';
      capSet(final && tip === 'tek' ? 'tek1' : baseKey());
      draw();
    };
    const nextSel = () => { const v = SEQ.filter((k) => k < cells.length)[seqI++ % SEQ.filter((k) => k < cells.length).length]; return v; };
    const dist = (a, b) => { const dr = Math.abs(a.r - b.r), dx = Math.abs(a.cx - b.cx) / (cells[1].cx - cells[0].cx); return dr + Math.max(0, dx - dr / 2); };
    const draw = () => {
      cellEls.forEach((g, i) => {
        const a = cells[i]; let v = 0;
        if (final) v = sel.includes(i) ? 1 : 0;
        else if (sch && t >= 0 && sch.ta[i] != null) v = ease((t - sch.ta[i]) / 0.1) - ease((t - sch.rel[i]) / 0.3);
        v = clamp(v, 0, 1);
        g.setAttribute('transform', `translate(${a.cx} ${a.cy}) scale(${(1 - 0.15 * v).toFixed(3)} 1) translate(${-a.cx} ${-a.cy})`);
        g.querySelector('.f56-tc-a').style.opacity = (0.6 * v).toFixed(2);
      });
      sigEls.forEach((c, k) => {
        const d = dots[k]; let p = -1;
        if (sch && t >= 0 && sch.dur[k] != null) p = t / sch.dur[k];
        if (p >= 0 && p <= 1.05) { c.setAttribute('cx', lerp(d.x1, d.x2, Math.min(p, 1))); c.setAttribute('cy', lerp(d.y1, d.y2, Math.min(p, 1))); c.setAttribute('opacity', '1'); } else c.setAttribute('opacity', '0');
      });
      if (sch && t >= 0 && tip === 'tek' && t >= sch.spread) capSet('tek1');
    };
    const press = () => {
      if (final) { reset(); go.textContent = 'Uyar'; capSet(baseKey()); draw(); return; }
      if (t >= 0) return;
      sel = tip === 'tek' ? cells.map((_, i) => i) : dal === '1' ? [nextSel()] : cells.map((_, i) => i);
      if (RM) { final = true; go.textContent = 'Sıfırla'; capSet(tip === 'tek' ? 'tek1' : baseKey()); draw(); return; }
      const ta = {}, rel = {}, dur = {};
      if (tip === 'tek') {
        let mx = 0; cells.forEach((a, i) => { const d = dist(a, cells[0]); mx = Math.max(mx, d); ta[i] = 0.4 + d * 0.08; rel[i] = 2.2; }); dur[0] = 0.4;
        sch = { ta, rel, dur, spread: 0.4 + mx * 0.08 + 0.1 }; end = 2.6;
      } else if (dal === '1') {
        const i = sel[0]; ta[i] = 0.4; rel[i] = 1.6; dur[i] = 0.4; sch = { ta, rel, dur, spread: 0 }; end = 2.0;
      } else {
        const ys = cells.map((a) => a.cy), mn = Math.min(...ys), mxl = Math.max(...ys) - mn + 1;
        cells.forEach((a, i) => { const d = 0.15 + 0.45 * ((a.cy - mn + 10) / (mxl + 10)); dur[i] = d; ta[i] = d + 0.05; rel[i] = ta[i] + 1.2; });
        sch = { ta, rel, dur, spread: 0 }; end = 2.2;
      }
      t = 0; capSet(baseKey());
    };
    const onClick = (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.classList.contains('f56-go')) { press(); return; }
      if (b.dataset.tip) { tip = b.dataset.tip; setSeg(el, 'tip', tip); reset(); build(isNarrow(el)); }
      else if (b.dataset.dal) { dal = b.dataset.dal; setSeg(el, 'dal', dal); reset(); build(isNarrow(el)); }
    };
    el.addEventListener('click', onClick);
    const off = mount(el, build);
    const tk = RM ? null : ticker(el, (dt) => { if (t < 0) return; t += dt; if (t > end) { t = -1; sch = null; capSet(baseKey()); } draw(); });
    return () => { off(); if (tk) tk(); el.removeEventListener('click', onClick); };
  };

  /* ================= 2 · İki hücre yan yana ================= */
  VIZ.f56_hucre = (el) => {
    let sel = 'boyut';
    const FE = [['boyut', 'Boyut'], ['cek', 'Çekirdek'], ['sark', 'Sarkomer'], ['trop', 'Troponin'], ['tub', 'T tübülü / kaveola'], ['sr', 'SR']];
    const VAL = { boyut: ['Büyük silindir', 'Küçük, iğ biçimli'], cek: ['Çok çekirdekli', 'Tek çekirdek'], sark: ['Sarkomer var: çizgili', 'Sarkomer yok: çizgisiz'], trop: ['Troponin var', 'Troponin yok'], tub: ['T tübülü', 'Kaveola'], sr: ['SR gelişmiş', 'SR az gelişmiş'] };
    const CAP = {
      boyut: '<b>Boyut.</b> İskelet kası hücresi kasın boyunca uzanan büyük bir silindirdir; düz kas hücresi çok daha küçük, iğ biçimlidir ve tabakalar (sinsityum) hâlinde dizilir. Bir özelliğe dokunun. [[K1 s. 249]]',
      cek: '<b>Çekirdek.</b> İskelet kası hücresi çok çekirdeklidir; düz kas hücresinin tek çekirdeği vardır. [[K1 s. 249]]',
      sark: '<b>Sarkomer.</b> İki kasta da aktin ince, miyozin kalın filamanları oluşturur ve asıl işlev kasılmadır. Düz kasta filamanlar sarkomerlere düzenlenmez; bu yüzden düz kas çizgili değildir. [[K1 s. 249]]',
      trop: '<b>Troponin.</b> Tropomiyozin iki kasta da vardır; troponin kompleksi düz kasta yoktur. Onun işini kalmodulin ve kaldesmon üstlenir. [[K1 s. 249–250]]',
      tub: '<b>T tübülü yok, kaveola var.</b> Düz kasta sarkolemmanın derin T tübülü girintileri yerine sığ, ilkel girintiler (kaveolalar) vardır; yüzey alanı/hacim oranını artırır ve Ca²⁺ girişini kolaylaştırır. [[K1 s. 249–250]]',
      sr: '<b>Sarkoplazmik retikulum.</b> Hücre içi Ca²⁺ deposudur; iskelet kasında uyarılma–kasılma eşleşmesinin merkezindedir (Bölüm 54), düz kasta az gelişmiştir. [[K1 s. 249]]',
    };
    const bez = (t, a, b, c, d) => { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; };
    const skel = (ox, oy, sc) => {
      let g = `<g transform="translate(${ox} ${oy}) scale(${sc})"><rect class="f56-h-sk f56-h-body" data-f="boyut" x="0" y="0" width="280" height="90" rx="16"/><g class="f56-h-o" data-f="sark">`;
      for (let i = 0; i < 19; i++) g += `<rect class="f56-h-band" x="${8 + i * 14.1}" y="3" width="7" height="84"/><path class="f56-h-z" d="M${8 + i * 14.1 + 3.5} 3v84"/>`;
      g += '</g><g class="f56-h-o" data-f="tub">';
      const tx = [52, 110, 168, 226];
      tx.forEach((x) => { g += `<rect class="f56-h-tt" x="${x - 3}" y="0" width="6" height="46" rx="3"/>`; });
      g += '</g><g class="f56-h-o" data-f="sr">';
      tx.forEach((x) => { g += `<rect class="f56-h-sr" x="${x - 19}" y="8" width="12" height="36" rx="5"/><rect class="f56-h-sr" x="${x + 7}" y="8" width="12" height="36" rx="5"/>`; });
      g += '</g><g class="f56-h-o" data-f="cek">';
      for (let i = 0; i < 6; i++) g += `<ellipse class="f56-h-nu" cx="${30 + i * 44}" cy="76" rx="9" ry="5"/>`;
      return g + '</g></g>';
    };
    const smooth = (ox, oy, sc) => {
      let g = `<g transform="translate(${ox} ${oy}) scale(${sc})"><path class="f56-h-sm f56-h-body" data-f="boyut" d="${spindle(100, 25, 200, 50)}"/><g class="f56-h-o" data-f="sark">`;
      for (let i = 0; i < 13; i++) { const x = 40 + rnd() * 120, y = 12 + rnd() * 26, a = rnd() * Math.PI, l = 18 + rnd() * 10; g += `<path class="${i % 3 ? 'f56-h-fa' : 'f56-h-fm'}" d="M${x - Math.cos(a) * l / 2} ${y - Math.sin(a) * l / 2}L${x + Math.cos(a) * l / 2} ${y + Math.sin(a) * l / 2}"/>`; }
      g += '</g><g class="f56-h-o" data-f="tub">';
      const ex = [0.5, 3, 6, 9, 12, 15].map((v) => v / 15);
      [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85].forEach((t) => { const x = bez(t, 0, 56, 144, 200), yt = bez(t, 25, -6, -6, 25), yb = bez(t, 25, 56, 56, 25); g += `<circle class="f56-h-cv" cx="${x}" cy="${yt + 1.5}" r="3.2"/><circle class="f56-h-cv" cx="${x}" cy="${yb - 1.5}" r="3.2"/>`; });
      g += '</g><g class="f56-h-o" data-f="sr"><ellipse class="f56-h-sr" cx="62" cy="21" rx="8" ry="3.5"/><ellipse class="f56-h-sr" cx="124" cy="32" rx="8" ry="3.5"/><ellipse class="f56-h-sr" cx="150" cy="17" rx="7" ry="3.2"/></g>';
      g += '<g class="f56-h-o" data-f="cek"><ellipse class="f56-h-nu" cx="100" cy="25" rx="16" ry="7"/></g>';
      return g + '</g>';
    };
    const loupe = (cx, cy, r, tro, id, narrow) => {
      const sp = narrow ? 8 : 9, n = Math.floor(r * 2 / sp);
      let g = `<g class="f56-h-o" data-f="trop"><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r - 1}"/></clipPath><circle class="f56-h-lp" cx="${cx}" cy="${cy}" r="${r}"/><g clip-path="url(#${id})">`;
      for (let i = 0; i <= n; i++) g += `<circle class="f56-h-ac" cx="${cx - r + 2 + i * sp}" cy="${cy - 4}" r="3.2"/>`;
      g += `<path class="f56-h-tm" d="M${cx - r} ${cy + 3}Q${cx - r / 2} ${cy - 1} ${cx} ${cy + 3}T${cx + r} ${cy + 3}"/>`;
      if (tro) [-r * 0.6, 0, r * 0.6].forEach((dx) => { g += `<ellipse class="f56-h-tr" cx="${cx + dx}" cy="${cy + 11}" rx="5.5" ry="4.2"/>`; });
      else g += `<circle class="f56-h-no" cx="${cx}" cy="${cy + 10}" r="6"/><text class="f56-h-tx" x="${cx}" y="${cy + 26}" text-anchor="middle">yok</text>`;
      return g + '</g></g>';
    };
    el.innerHTML = `<div class="f56-ctl">${segHtml('Özellik', 'f', FE, sel)}</div><div class="f56-box"></div>`;
    const box = el.querySelector('.f56-box');
    const apply = () => {
      box.querySelectorAll('[data-f]').forEach((n) => n.classList.toggle('on', n.dataset.f === sel));
      const v = VAL[sel], tb = box.querySelectorAll('.f56-h-val');
      if (tb[0]) { tb[0].textContent = (isNarrow(el) ? 'İskelet kası: ' : '') + v[0]; tb[1].textContent = (isNarrow(el) ? 'Düz kas: ' : '') + v[1]; }
      setSeg(el, 'f', sel); setCap(el, CAP[sel]);
    };
    const build = (narrow) => {
      rnd();
      let s, W, H;
      if (!narrow) {
        W = 640; H = 300;
        s = `<text class="f56-h-t f56-h-t1" x="160" y="24" text-anchor="middle">İskelet kası hücresi</text><text class="f56-h-t f56-h-t2" x="520" y="24" text-anchor="middle">Düz kas hücresi</text>` + skel(20, 48, 1) + smooth(420, 68, 1) + loupe(160, 200, 34, true, 'f56-lpL', false) + loupe(520, 200, 34, false, 'f56-lpR', false) +
          `<text class="f56-h-tx" x="160" y="250" text-anchor="middle">ince filaman, yakın çekim</text><text class="f56-h-tx" x="520" y="250" text-anchor="middle">ince filaman, yakın çekim</text><rect class="f56-h-strip" x="8" y="262" width="624" height="32" rx="9"/><path class="f56-h-sep" d="M320 266v24"/><text class="f56-h-val f56-h-v1" x="160" y="283" text-anchor="middle"></text><text class="f56-h-val f56-h-v2" x="480" y="283" text-anchor="middle"></text>`;
      } else {
        W = 360; H = 352;
        s = `<text class="f56-h-t f56-h-t1" x="12" y="20">İskelet kası hücresi</text>` + skel(12, 34, 0.74) + loupe(292, 72, 30, true, 'f56-lpL', true) + `<text class="f56-h-tx" x="292" y="114" text-anchor="middle">yakın çekim</text>` +
          `<text class="f56-h-t f56-h-t2" x="12" y="146">Düz kas hücresi</text>` + smooth(12, 164, 1) + loupe(292, 192, 30, false, 'f56-lpR', true) + `<text class="f56-h-tx" x="292" y="234" text-anchor="middle">yakın çekim</text>` +
          `<rect class="f56-h-strip" x="6" y="252" width="348" height="92" rx="9"/><text class="f56-h-val f56-h-v1" x="18" y="284"></text><text class="f56-h-val f56-h-v2" x="18" y="318"></text>`;
      }
      box.innerHTML = `<svg class="f56-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="İskelet kası hücresi ile düz kas hücresinin yan yana şeması: boyut, çekirdek, sarkomer, troponin, T tübülü ve kaveola, sarkoplazmik retikulum">${s}</svg>`;
      // v1/v2 sınıfları
      box.querySelectorAll('.f56-h-val').forEach((n, i) => n.classList.add(i ? 'f56-h-d2' : 'f56-h-d1'));
      apply();
    };
    const onClick = (e) => {
      const b = e.target.closest('[data-f]');
      if (b && el.contains(b)) { sel = b.dataset.f; apply(); }
    };
    el.addEventListener('click', onClick);
    const off = mount(el, build);
    return () => { off(); el.removeEventListener('click', onClick); };
  };

  /* ================= 3 · Zar potansiyeli: dört girdi, bir eşik ================= */
  VIZ.f56_uyari = (el) => {
    let tip = 'tek', gir = 'pace', bol = 'duo', etki = 'uy', germe = 0, capKey = '';
    const REST = 0.2, THR = 1, WIN = 20, STEP = 1 / 30, REFR = 1.4;
    let T = 0, buf = [], spT = -9, base = REST, cc = 0, lastV = REST, ev = [], geo = null, acc = 0, pathEl = null;
    const CAP = {
      pace: '<b>Pacemaker.</b> Zar potansiyeli kendiliğinden salınır (yavaş dalga); eşiği aşan her tepede aksiyon potansiyeli ve kasılma olur. Duodenumda dakikada ≈ 12, kolonda 3. Bir girdi seçin. [[K1 s. 250]]',
      sinir: '<b>Otonom sinir.</b> Tek üniteli düz kas çoğu kez hem sempatik (noradrenalin) hem parasempatik (asetilkolin) lif alır; ikisi genellikle zıttır. Uyarıcı girdi depolarize, inhibitör girdi hiperpolarize eder. [[K1 s. 250]]',
      mol: '<b>Dolaşan moleküller.</b> O₂, CO₂, NO, adrenalin, noradrenalin, histamin, prostaglandinler ve serotonin düz kası uyarabilir ya da baskılayabilir. [[K1 s. 250]]',
      germe: '<b>Germe.</b> Gerilen tabaka kasılır: arterlerde miyojenik yanıt (otoregülasyon, Bölüm 34), bağırsakta peristaltizmin başlaması. [[K1 s. 250]]',
      cok: '<b>Çok üniteli düz kas</b> iskelet kası gibi yalnız sinir impulsuyla uyarılır. [[K1 s. 250]]',
    };
    const capKeyNow = () => (tip === 'cok' ? 'cok' : gir);
    const capSet = () => { const k = capKeyNow(); if (k !== capKey) { capKey = k; setCap(el, CAP[k]); } };
    el.innerHTML = `<div class="f56-ctl">${segHtml('Girdi', 'g', [['pace', 'Pacemaker'], ['sinir', 'Otonom sinir'], ['mol', 'Dolaşan molekül'], ['germe', 'Germe']], gir)}${segHtml('Tip', 'tip', [['tek', 'Tek üniteli'], ['cok', 'Çok üniteli']], tip)}</div>
      <div class="f56-sub" data-sub="pace">${segHtml('Bölge', 'bol', [['duo', 'Duodenum ≈ 12/dk'], ['kol', 'Kolon 3/dk']], bol)}</div>
      <div class="f56-sub" data-sub="sinir" hidden><div class="btn-row"><button type="button" class="btn" data-ev="1">Uyarıcı lif</button><button type="button" class="btn ghost" data-ev="-1">İnhibitör lif</button></div></div>
      <div class="f56-sub" data-sub="mol" hidden>${segHtml('Etki', 'et', [['uy', 'Uyarıcı'], ['in', 'İnhibitör']], etki)}<span class="f56-not">O₂, CO₂, NO, adrenalin, noradrenalin, histamin, prostaglandinler, serotonin</span></div>
      <div class="f56-sub" data-sub="germe" hidden><label class="f56-rng"><span>Germe <b class="f56-gv">0 %</b></span><input type="range" min="0" max="100" step="1" value="0" aria-label="Germe düzeyi"></label></div>
      <div class="f56-box"></div>`;
    const box = el.querySelector('.f56-box'), rng = el.querySelector('input[type=range]'), gv = el.querySelector('.f56-gv');
    const psp = (u) => (u < 0 ? 0 : 1.54 * (Math.exp(-u / 1.6) - Math.exp(-u / 0.2)));
    const noise = (tt) => 0.1 * Math.sin(2 * Math.PI * tt / 2.3) + 0.07 * Math.sin(2 * Math.PI * tt / 0.93 + 1);
    const sim = (dt) => {
      T += dt;
      let v = REST;
      if (tip === 'cok' || gir === 'sinir') {
        ev = ev.filter((e) => T - e.t < 12);
        ev.forEach((e) => { v += (e.s > 0 ? 1.0 : -0.55) * psp(T - e.t); });
      } else if (gir === 'pace') {
        const P = bol === 'duo' ? 5 : 20; v = 0.72 + 0.4 * Math.sin(2 * Math.PI * T / P - Math.PI / 2);
      } else if (gir === 'mol') {
        const tg = etki === 'uy' ? 0.95 : -0.2; base += (tg - base) * (1 - Math.exp(-dt / 2.5)); v = base + (etki === 'uy' ? noise(T) : 0);
      } else {
        const tg = REST + 0.78 * germe / 60; base += (tg - base) * (1 - Math.exp(-dt / 0.7)); v = base + 0.05 * Math.sin(2 * Math.PI * T / 1.7);
      }
      lastV = v;
      if (v >= THR && T - spT > REFR) spT = T;
      const u = T - spT;
      const add = u >= 0 && u < 0.7 ? 1.25 * Math.exp(-u / 0.18) * (1 - Math.exp(-u / 0.02)) : 0;
      cc += ((T - spT < 0.9 ? 1 : 0) - cc) * (1 - Math.exp(-dt / 0.18));
      buf.push([T, v + add]);
      while (buf.length && buf[0][0] < T - WIN - 1) buf.shift();
    };
    const reset = (pre) => {
      T = 0; buf = []; spT = -9; base = REST; cc = 0; ev = []; acc = 0;
      if (RM && (gir === 'sinir' || tip === 'cok')) ev = [{ t: 3, s: 1 }, { t: 9, s: 1 }, { t: 10, s: 1 }, { t: 15.5, s: -1 }];
      if (pre) for (let i = 0; i < 26 / STEP; i++) sim(STEP);
    };
    const geoOf = (narrow) => (narrow
      ? { W: 360, H: 318, x0: 14, x1: 346, yR: 138, yT: 88, top: 34, bot: 190, cy: 246, cx: 180, cw: 190, ix: 26, iy: 16, badge: [232, 6] }
      : { W: 640, H: 300, x0: 74, x1: 622, yR: 154, yT: 90, top: 20, bot: 202, cy: 252, cx: 340, cw: 220, ix: 36, iy: 110, badge: [510, 24] });
    const Y = (v) => clamp(geo.yR - (v - REST) * (geo.yR - geo.yT) / (THR - REST), geo.top + 3, geo.bot - 3);
    const icon = () => {
      const { ix, iy } = geo; const k = geo.W < 400 ? 0.8 : 1;
      let s = `<g transform="translate(${ix} ${iy}) scale(${k})">`;
      if (tip === 'cok' || gir === 'sinir') s += '<path class="f56-ic-e" d="M-14 -16L-2 10"/><circle class="f56-ic-ed" cx="-2" cy="10" r="3"/><path class="f56-ic-i" d="M8 -16L-2 14"/><circle class="f56-ic-id" cx="-2" cy="14" r="3" style="display:none"/><path class="f56-ic-i" d="M10 -16L14 10"/><circle class="f56-ic-id" cx="14" cy="10" r="3"/>';
      else if (gir === 'pace') { const pts = []; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6, r = i % 2 ? 6 : 15; pts.push((Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r).toFixed(1)); } s += `<path class="f56-ic-c" d="M${pts.join('L')}Z"/>`; }
      else if (gir === 'mol') [[-12, -10], [8, -14], [-4, 0], [12, 4], [-10, 12], [4, 14]].forEach(([x, y]) => { s += `<circle class="f56-ic-m" cx="${x}" cy="${y}" r="3"/>`; });
      else { const w = 14 + germe * 0.14; s += `<path class="f56-h-sm" d="${spindle(0, 0, w * 1.6, 9)}"/><path class="f56-ic-i" d="M${-w - 4} 0h-8M${w + 4} 0h8"/>`; }
      return s + '</g>';
    };
    const build = (narrow) => {
      geo = geoOf(narrow);
      const { W, H, x0, x1, yR, yT, top, bot, cy, cx, cw, badge } = geo;
      let s = `<rect class="f56-pn" x="${x0}" y="${top}" width="${x1 - x0}" height="${bot - top}" rx="8"/>`;
      s += `<path class="f56-thr" d="M${x0} ${yT}H${x1}"/><text class="f56-lb f56-lbc" x="${x1 - 6}" y="${yT - 6}" text-anchor="end">eşik potansiyeli</text>`;
      s += `<path class="f56-rst" d="M${x0} ${yR}H${x1}"/><text class="f56-lb f56-mut" x="${x0 + 6}" y="${yR + 15}">dinlenim</text><text class="f56-lb f56-mut" x="${x1 - 6}" y="${bot + 16}" text-anchor="end">zaman →</text>`;
      s += `<path class="f56-tr" d="M0 0"/>`;
      s += `<g class="f56-icon">${icon()}</g>`;
      s += `<g class="f56-badge" opacity="0"><rect class="f56-bdg" x="${badge[0]}" y="${badge[1]}" width="112" height="24" rx="12"/><text class="f56-lb" x="${badge[0] + 56}" y="${badge[1] + 16}" text-anchor="middle"></text></g>`;
      s += `<path class="f56-uc-b" d="${spindle(cx, cy, cw, 36)}"/><path class="f56-uc-a" d="${spindle(cx, cy, cw, 36)}"/><ellipse class="f56-tc-n" cx="${cx}" cy="${cy}" rx="12" ry="5.5"/><text class="f56-lb f56-uc-t" x="${cx + cw / 2 + 12}" y="${cy + 5}">Kasılma</text>`;
      if (narrow) s = s.replace(`x="${cx + cw / 2 + 12}" y="${cy + 5}"`, `x="${cx}" y="${cy + 38}" text-anchor="middle"`);
      box.innerHTML = `<svg class="f56-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Zar potansiyeli izi, eşik çizgisi ve aşağıda kasılan bir düz kas hücresi">${s}</svg>`;
      pathEl = box.querySelector('.f56-tr');
      if (RM) { reset(true); }
      draw();
    };
    const draw = () => {
      if (!pathEl) return;
      const { x0, x1, cx, cy, cw } = geo, pps = (x1 - x0) / WIN;
      let d = '';
      for (let i = 0; i < buf.length; i++) { const x = x1 - (T - buf[i][0]) * pps; if (x < x0 - 2) continue; d += (d ? 'L' : 'M') + Math.max(x0, x).toFixed(1) + ' ' + Y(buf[i][1]).toFixed(1); }
      pathEl.setAttribute('d', d || `M${x0} ${Y(REST)}`);
      const c = clamp(cc, 0, 1), sx = (1 - 0.2 * c).toFixed(3), tf = `translate(${cx} ${cy}) scale(${sx} 1) translate(${-cx} ${-cy})`;
      box.querySelectorAll('.f56-uc-b,.f56-uc-a,.f56-tc-n').forEach((n) => n.setAttribute('transform', tf));
      box.querySelector('.f56-uc-a').style.opacity = (0.6 * c).toFixed(2);
      box.querySelector('.f56-uc-t').style.opacity = (0.25 + 0.75 * c).toFixed(2);
      const bd = box.querySelector('.f56-badge');
      if (gir === 'pace' && tip === 'tek') { bd.setAttribute('opacity', '1'); bd.querySelector('text').textContent = bol === 'duo' ? 'dakikada 12' : 'dakikada 3'; } else bd.setAttribute('opacity', '0');
    };
    const refreshIcon = () => { const g = box.querySelector('.f56-icon'); if (g) g.innerHTML = icon(); };
    const ctlSync = () => {
      el.querySelectorAll('[data-sub]').forEach((n) => { n.hidden = n.dataset.sub !== gir; });
      el.querySelectorAll('[data-g]').forEach((b) => { const dis = tip === 'cok' && b.dataset.g !== 'sinir'; b.disabled = dis; b.classList.toggle('f56-dis', dis); });
      setSeg(el, 'g', gir); setSeg(el, 'tip', tip);
      // çok üniteli iken sinir alt denetimi görünür
      if (tip === 'cok') el.querySelector('[data-sub="sinir"]').hidden = false;
      capSet(); refreshIcon();
    };
    const fresh = () => { reset(true); draw(); };
    const onClick = (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.g) { gir = b.dataset.g; ctlSync(); capKey = ''; capSet(); fresh(); }
      else if (b.dataset.tip) { tip = b.dataset.tip; if (tip === 'cok') gir = 'sinir'; ctlSync(); capKey = ''; capSet(); fresh(); }
      else if (b.dataset.bol) { bol = b.dataset.bol; setSeg(el, 'bol', bol); fresh(); }
      else if (b.dataset.et) { etki = b.dataset.et; setSeg(el, 'et', etki); base = lastV; if (RM) { for (let i = 0; i < 12 / STEP; i++) sim(STEP); draw(); } }
      else if (b.dataset.ev) { ev.push({ t: T, s: +b.dataset.ev }); if (RM) { for (let i = 0; i < 3 / STEP; i++) sim(STEP); draw(); } }
    };
    const onRng = () => { germe = +rng.value; gv.textContent = germe + ' %'; refreshIcon(); if (RM) { base = REST; for (let i = 0; i < 26 / STEP; i++) sim(STEP); draw(); } };
    el.addEventListener('click', onClick); rng.addEventListener('input', onRng);
    reset(true);
    const off = mount(el, build); ctlSync();
    const tk = RM ? null : ticker(el, (dt) => { acc += dt; let n = 0; while (acc >= STEP && n++ < 6) { sim(STEP); acc -= STEP; } draw(); });
    return () => { off(); if (tk) tk(); el.removeEventListener('click', onClick); rng.removeEventListener('input', onRng); };
  };

  /* ================= 4 · Ca²⁺'dan çapraz köprüye, 7 adım ================= */
  VIZ.f56_eck = (el) => {
    let step = 1, pr = 1, playing = false, hold = 0, phase = 0, geo = null, capKey = '', parts = null;
    const N = 7;
    const CAP = [
      '<b>1 · Yayılma.</b> Aksiyon potansiyeli hücreler arasında gap junction\'larla hızla yayılır, ama T tübülü olmadığı için hücrenin içine doğrudan iletilmez. "İleri"ye basın. [[K1 s. 250]]',
      '<b>2 · Ca²⁺ girişi.</b> Ca²⁺ voltaj kapılı, ligand kapılı ve gerilmeye duyarlı kanallardan girer. Kaveolalar yüzey alanı/hacim oranını artırarak girişi kolaylaştırır. [[K1 s. 250]]',
      '<b>3 · SR.</b> SR ya yoktur ya da az gelişmiştir; işlevsel SR\'si olan hücrelerde SR ek Ca²⁺ salarak artışı büyütür. [[K1 s. 250]]',
      '<b>4 · Kalmodulin.</b> Düz kasta troponin yoktur; Ca²⁺ kalmoduline bağlanır ve oluşan Ca²⁺–kalmodulin kompleksi kasılmayı üç yolla başlatır. [[K1 s. 250]]',
      '<b>5 · MLCK.</b> Ca²⁺–kalmodulin miyozin hafif zincir kinazını etkinleştirir; MLCK miyozin hafif zincirlerini fosforile eder ve miyozin aktinle çapraz köprü kurabilir. [[K1 s. 250]]',
      '<b>6 · Kaldesmon.</b> İskelet kasında troponin tropomiyozini miyozin bağlanma yerinin üzerinde tutar; düz kasta bu işi kaldesmon yapar. Ca²⁺–kalmodulin kaldesmonun biçimini değiştirir, tropomiyozin kayar ve çapraz köprü döngüsü başlar. [[K1 s. 250]]',
      '<b>7 · Kalponin.</b> Kalponin miyozin başının ATPaz etkinliğini baskılar; kitaba göre Ca²⁺–kalmodulinle ya da doğrudan Ca²⁺ ile etkinleşir (Atlas notuna bakın). Düzenleme noktalarının fazlalığı hormon ve nörotransmitterlerin önemini yansıtır. [[K1 s. 250–251]]',
    ];
    // hangi öğe grubu hangi adımlarda tam opak
    const ACT = { gap: [1], mem: [1], chan: [2], cav: [2], sr: [3], dots: [2, 3, 4], cam: [4, 5, 6], zoom: [5, 6, 7], mlck: [5], head: [5, 6, 7], ald: [6], cal: [7], tm: [6] };
    el.innerHTML = `<div class="f56-ctl"><div class="btn-row"><button type="button" class="btn ghost" data-a="geri">← Geri</button><button type="button" class="btn" data-a="ileri">İleri →</button><button type="button" class="btn ghost" data-a="basa">Baştan</button>${RM ? '' : '<button type="button" class="btn ghost" data-a="oynat" aria-pressed="false">Oynat</button>'}<span class="f56-adim" aria-live="polite">1/7</span></div></div><div class="f56-box"></div>`;
    const box = el.querySelector('.f56-box');
    const capSet = () => { if (capKey !== step) { capKey = step; setCap(el, CAP[step - 1]); } };
    const build = (narrow) => {
      const W = narrow ? 360 : 640, H = narrow ? 468 : 342;
      const cell = narrow ? { x0: 30, x1: 350, cy: 98, ry: 62 } : { x0: 40, x1: 600, cy: 170, ry: 128 };
      const rx = (cell.x1 - cell.x0) / 2, cxm = (cell.x0 + cell.x1) / 2;
      const top = (x) => cell.cy - cell.ry * (1 - Math.pow(Math.min(1, Math.abs((x - cxm) / rx)), 2.6));
      const bot = (x) => cell.cy + cell.ry * (1 - Math.pow(Math.min(1, Math.abs((x - cxm) / rx)), 2.6));
      const fx = (f) => cell.x0 + f * (cell.x1 - cell.x0);
      const zm = narrow ? { x: 8, y: 176, w: 344, h: 282 } : { x: 150, y: 170, w: 450, h: 166 };
      const zx = (f) => zm.x + f * zm.w, zy = (f) => zm.y + f * zm.h;
      const pts = []; for (let i = 0; i <= 60; i++) { const x = cell.x0 + (cell.x1 - cell.x0) * i / 60; pts.push([x, top(x)]); }
      for (let i = 60; i >= 0; i--) { const x = cell.x0 + (cell.x1 - cell.x0) * i / 60; pts.push([x, bot(x)]); }
      const outline = 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
      const memPath = 'M' + pts.slice(0, 61).map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L');
      let s = `<defs><marker id="f56-ek-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" class="f56-ek-mh"/></marker></defs>`;
      s += `<path class="f56-ek-cell" d="${outline}"/><path class="f56-ek-mem" d="${memPath}"/>`;
      // gap junction (komşu hücre ucu)
      s += `<g class="f56-ek-g" data-g="gap"><path class="f56-ek-nb" d="M${cell.x0 - 26} ${cell.cy}L${cell.x0 - 1} ${cell.cy - 11}V${cell.cy + 11}Z"/><path class="f56-gj" d="M${cell.x0 - 3} ${cell.cy - 9}v18M${cell.x0 + 1} ${cell.cy - 9}v18"/><text class="f56-lb" x="2" y="${cell.cy - 38}">Gap</text><text class="f56-lb" x="2" y="${cell.cy - 24}">junction</text></g>`;
      s += `<g data-g="mem"><text class="f56-lb f56-ek-tt" x="${cxm}" y="${cell.cy - (narrow ? 8 : 52)}" text-anchor="middle" opacity="0">T tübülü yok</text></g>`;
      // kaveolalar
      s += '<g data-g="cav">';
      [0.2, 0.45, 0.66, 0.9].forEach((f) => { const x = fx(f); s += `<circle class="f56-ek-cv" cx="${x}" cy="${top(x) + 1}" r="6"/>`; });
      [0.3, 0.55, 0.75].forEach((f) => { const x = fx(f); s += `<circle class="f56-ek-cv" cx="${x}" cy="${bot(x) - 1}" r="6"/>`; });
      s += '</g>';
      // kanallar
      const CH = narrow ? [[0.3, 'Voltaj'], [0.52, 'Ligand'], [0.76, 'Germe']] : [[0.36, 'Voltaj kapılı'], [0.55, 'Ligand kapılı'], [0.77, 'Gerilmeye duyarlı']];
      s += '<g data-g="chan">';
      const chx = CH.map(([f]) => fx(f));
      CH.forEach(([f, lab], i) => {
        const x = chx[i], y = top(x), ly = y - (narrow ? 16 : 20);
        s += `<rect class="f56-ek-ch" x="${x - 5}" y="${y - 9}" width="10" height="16" rx="3"/><text class="f56-lb" x="${x}" y="${ly}" text-anchor="middle">${lab}</text>`;
        if (i === 1) s += `<circle class="f56-ek-lg" cx="${x - 14}" cy="${y - 4}" r="3.6"/>`;
        if (i === 2) s += `<path class="f56-ek-ar" d="M${x - 9} ${y - 4}h-9M${x + 9} ${y - 4}h9" marker-end="url(#f56-ek-m)"/>`;
      });
      s += '</g>';
      // SR
      const sr = narrow ? { x: 270, y: 112 } : { x: 440, y: 130 };
      s += `<g data-g="sr"><ellipse class="f56-ek-sr" cx="${sr.x}" cy="${sr.y}" rx="28" ry="12"/><text class="f56-lb" x="${sr.x}" y="${sr.y - 20}" text-anchor="middle">SR (az gelişmiş)</text></g>`;
      // CaM
      const cams = narrow ? [[64, 108], [108, 88], [152, 110], [196, 90]] : [[215, 120], [265, 100], [315, 122], [365, 102]];
      s += '<g data-g="cam">';
      cams.forEach(([x, y]) => { s += `<path class="f56-ek-cl" d="M${x - 9} ${y}H${x + 9}"/><circle class="f56-ek-cm" cx="${x - 9}" cy="${y}" r="6"/><circle class="f56-ek-cm" cx="${x + 9}" cy="${y}" r="6"/><text class="f56-lb f56-ek-camt" x="${x}" y="${y + 21}" text-anchor="middle">CaM</text>`; });
      s += `<text class="f56-lb f56-ek-cc" x="${cams[0][0] + (narrow ? 4 : 20)}" y="${cams[0][1] + (narrow ? 40 : 40)}" opacity="0">Ca²⁺–kalmodulin</text></g>`;
      // Ca noktaları: kanal 9 + SR 3
      const dots = [];
      for (let i = 0; i < 12; i++) {
        const cam = cams[i % 4], k = Math.floor(i / 4), off = [[-9, -11], [9, -11], [0, 12]][k];
        const S2 = [cam[0] + off[0], cam[1] + off[1]];
        let S0, S1;
        if (i < 9) { const x = chx[i % 3]; S0 = [x + (Math.floor(i / 3) - 1) * 6, top(x) - 14]; S1 = [x + (rnd() - 0.5) * 40, top(x) + 34 + rnd() * 24]; }
        else { S0 = [sr.x + (i - 10) * 12, sr.y]; S1 = [sr.x + (rnd() - 0.5) * 70, sr.y + 8 + rnd() * 20]; }
        dots.push({ S0, S1, S2, sr: i >= 9 });
      }
      s += '<g data-g="dots">' + dots.map(() => '<circle class="f56-ek-dot" r="3.6" cx="0" cy="0" opacity="0"/>').join('') + '</g>';
      // bağlantı çizgileri (CaM → MLCK, CaM → kaldesmon)
      const ald = [0.22, 0.52, 0.8].map((f) => [zx(f), zy(0.24) + 12]);
      const mlck = [zx(0.08), zy(0.62)];
      s += `<path class="f56-ek-ln f56-ek-ln5" d="M${cams[0][0]} ${cams[0][1] + 8}L${mlck[0]} ${mlck[1] - 12}"/><path class="f56-ek-ln f56-ek-ln6" d="M${cams[1][0]} ${cams[1][1] + 8}L${ald[1][0]} ${ald[1][1] - 6}"/>`;
      // yakın çekim kutusu
      s += `<g data-g="zoom"><rect class="f56-ek-zb" x="${zm.x}" y="${zm.y}" width="${zm.w}" height="${zm.h}" rx="12"/><text class="f56-lb f56-mut" x="${zm.x + 10}" y="${zm.y + 17}">ince ve kalın filaman, yakın çekim</text></g>`;
      const ya = zy(narrow ? 0.2 : 0.27), yt = zy(0.9);
      s += `<g data-g="zoom"><path class="f56-ek-act" d="M${zx(0.03)} ${ya}H${zx(0.97)}"/>`;
      for (let i = 0; i <= 26; i++) s += `<circle class="f56-ek-ab" cx="${zx(0.03) + i * (zm.w * 0.94 / 26)}" cy="${ya}" r="3.4"/>`;
      s += `<text class="f56-lb" x="${zx(0.97)}" y="${ya - 9}" text-anchor="end">aktin</text></g>`;
      s += `<g data-g="tm"><path class="f56-ek-tm" d="M${zx(0.03)} ${ya + 5}H${zx(0.97)}"/><g class="f56-ek-sites">`;
      [0.14, 0.34, 0.6, 0.85].forEach((f) => { s += `<rect class="f56-ek-site" x="${zx(f) - 4}" y="${ya + 2}" width="8" height="7" rx="1.5"/>`; });
      s += '</g></g>';
      s += '<g data-g="ald">' + ald.map((p, i) => `<ellipse class="f56-ek-al" cx="${p[0]}" cy="${p[1] - 2}" rx="15" ry="6.5"/>${i === 1 ? `<text class="f56-lb f56-ek-alt" x="${p[0]}" y="${p[1] + 22}" text-anchor="middle">kaldesmon</text>` : ''}`).join('') + '</g>';
      s += `<g data-g="head"><rect class="f56-ek-th" x="${zx(0.03)}" y="${yt - 5}" width="${zm.w * 0.94}" height="10" rx="5"/><text class="f56-lb" x="${zx(0.03) + 6}" y="${yt + 20}">miyozin</text></g>`;
      const hx = [0.3, 0.52, 0.74].map(zx);
      s += '<g data-g="head">' + hx.map(() => '<g class="f56-ek-hd"><path class="f56-ek-st" d="M0 0"/><ellipse class="f56-ek-hh" cx="0" cy="0" rx="12" ry="6.5"/><circle class="f56-ek-lc" cx="0" cy="0" r="4.2"/><g class="f56-ek-p"><circle class="f56-ek-pc" cx="0" cy="0" r="8"/><text class="f56-ek-ptx" x="0" y="4" text-anchor="middle">P</text></g></g>').join('') + '</g>';
      s += `<g data-g="mlck"><rect class="f56-ek-en" x="${mlck[0] - 22}" y="${mlck[1] - 11}" width="44" height="22" rx="8"/><text class="f56-ek-ent" x="${mlck[0]}" y="${mlck[1] + 4}" text-anchor="middle">MLCK</text></g>`;
      const cal = [zx(0.9), zy(0.64)];
      s += `<g data-g="cal"><rect class="f56-ek-en" x="${cal[0] - 28}" y="${cal[1] - 11}" width="56" height="22" rx="8"/><text class="f56-ek-ent" x="${cal[0]}" y="${cal[1] + 4}" text-anchor="middle">kalponin</text><text class="f56-lb f56-ek-atp" x="${cal[0]}" y="${cal[1] - 18}" text-anchor="middle">ATPaz ⊣</text></g>`;
      box.innerHTML = `<svg class="f56-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Düz kas hücresi kesiti ve ince filaman yakın çekimi: Ca²⁺ girişi, kalmodulin, MLCK, kaldesmon ve kalponin">${s}</svg>`;
      const q = (c) => box.querySelector(c);
      parts = { svg: q('svg'), dots: [...box.querySelectorAll('.f56-ek-dot')], dd: dots, mem: q('.f56-ek-mem'), memL: 0, heads: [...box.querySelectorAll('.f56-ek-hd')], hx, ya, yt, ald: [...box.querySelectorAll('.f56-ek-al')], aldP: ald, tm: q('.f56-ek-tm'), sites: q('.f56-ek-sites'), cams: [...box.querySelectorAll('.f56-ek-cm')], cc: q('.f56-ek-cc'), ln5: q('.f56-ek-ln5'), ln6: q('.f56-ek-ln6'), chs: [...box.querySelectorAll('.f56-ek-ch')], tt: q('.f56-ek-tt'), narrow, zm };
      try { parts.memL = parts.mem.getTotalLength(); } catch (e) { parts.memL = 600; }
      render();
    };
    const render = () => {
      if (!parts) return;
      const p = RM ? 1 : pr, s = step;
      box.querySelectorAll('[data-g]').forEach((g) => { const a = ACT[g.dataset.g]; g.style.opacity = a && a.includes(s) ? 1 : 0.28; });
      // membran dalgası
      const L = parts.memL;
      if (s === 1) { const pos = RM ? 0.5 : p; parts.mem.style.opacity = RM ? 0.9 : 0.95; parts.mem.style.strokeDasharray = `${L * 0.14} ${L * 2}`; parts.mem.style.strokeDashoffset = (-(pos * L * 1.0 - L * 0.07)).toFixed(1); parts.tt.setAttribute('opacity', p > 0.5 || RM ? 1 : 0); }
      else { parts.mem.style.opacity = 0; parts.tt.setAttribute('opacity', 0); }
      // kanallar açık
      parts.chs.forEach((c, i) => c.classList.toggle('open', s === 2 && p > i / 3 - 0.01));
      // Ca noktaları
      parts.dots.forEach((c, i) => {
        const d = parts.dd[i]; let pos, vis = 1;
        if (s < 2 || (d.sr && s < 3)) vis = 0;
        if (!vis) { c.setAttribute('opacity', 0); return; }
        const t2 = d.sr ? 3 : 2;
        if (s === t2) { const f = ease((p * 1.3 - (d.sr ? 0 : (i % 3) * 0.1))); pos = [lerp(d.S0[0], d.S1[0], f), lerp(d.S0[1], d.S1[1], f)]; }
        else if (s < 4) pos = d.S1;
        else if (s === 4) { const f = ease(p); pos = [lerp(d.S1[0], d.S2[0], f), lerp(d.S1[1], d.S2[1], f)]; }
        else pos = d.S2;
        if (s === 3 && !d.sr) pos = d.S1;
        c.setAttribute('cx', pos[0].toFixed(1)); c.setAttribute('cy', pos[1].toFixed(1)); c.setAttribute('opacity', 1);
      });
      parts.cams.forEach((c) => c.classList.toggle('bound', s >= 4));
      parts.cc.setAttribute('opacity', s >= 4 ? 1 : 0);
      parts.ln5.style.opacity = s === 5 ? 1 : 0; parts.ln6.style.opacity = s === 6 ? 1 : 0;
      // zoom: tropomiyozin, kaldesmon, başlar
      const slid = s >= 6 ? (s === 6 ? ease(p) : 1) : 0;
      parts.tm.setAttribute('transform', `translate(0 ${(slid * 10).toFixed(1)})`); parts.sites.style.opacity = slid;
      parts.ald.forEach((a, i) => { const [x, y] = parts.aldP[i]; a.classList.toggle('on', s >= 6); a.setAttribute('transform', s >= 6 ? `rotate(${(-35 * slid).toFixed(0)} ${x} ${y})` : ''); });
      parts.heads.forEach((h, i) => {
        const x = parts.hx[i], y0 = parts.yt - 5, zm = parts.zm;
        let tx, ty;
        if (s < 5) { tx = x - 14; ty = y0 - zm.h * 0.2; }
        else if (s === 5) { const f = ease(p); tx = lerp(x - 14, x - 6, f); ty = lerp(y0 - zm.h * 0.2, y0 - zm.h * 0.34, f); }
        else { const f = s === 6 ? ease(p) : 1; tx = lerp(x - 6, x, f); ty = lerp(y0 - zm.h * 0.34, parts.ya + 16, f); if (s === 7 && !RM) { tx += 6 * Math.sin(phase + i * 2.1); ty += 4 * Math.sin(phase * 1.0 + i * 2.1 + 1.3); } }
        h.querySelector('.f56-ek-st').setAttribute('d', `M${x} ${y0}Q${x + (tx - x) * 0.2} ${(y0 + ty) / 2} ${tx} ${ty + 4}`);
        h.querySelector('.f56-ek-hh').setAttribute('cx', tx); h.querySelector('.f56-ek-hh').setAttribute('cy', ty);
        const lx = lerp(x, tx, 0.45), ly = lerp(y0, ty, 0.45);
        h.querySelector('.f56-ek-lc').setAttribute('cx', lx); h.querySelector('.f56-ek-lc').setAttribute('cy', ly);
        const pg = h.querySelector('.f56-ek-p'), pf = s >= 5 ? (s === 5 ? ease(p) : 1) : 0;
        pg.setAttribute('transform', `translate(${(lx + 14).toFixed(1)} ${(ly - 4).toFixed(1)}) scale(${pf.toFixed(2)})`); pg.style.opacity = pf;
      });
      el.querySelector('.f56-adim').textContent = s + '/' + N;
      el.querySelector('[data-a=geri]').disabled = s === 1; el.querySelector('[data-a=ileri]').disabled = s === N;
      capSet();
    };
    const go = (k) => { step = clamp(k, 1, N); pr = RM ? 1 : 0; hold = 0; render(); };
    const onClick = (e) => {
      const b = e.target.closest('button[data-a]'); if (!b || !el.contains(b)) return;
      const a = b.dataset.a;
      if (a === 'ileri') { playing = false; sync(); go(step + 1); }
      else if (a === 'geri') { playing = false; sync(); go(step - 1); }
      else if (a === 'basa') { playing = false; sync(); go(1); }
      else if (a === 'oynat') { playing = !playing; if (playing && step === N) go(1); sync(); }
    };
    const sync = () => { const b = el.querySelector('[data-a=oynat]'); if (b) { b.setAttribute('aria-pressed', String(playing)); b.textContent = playing ? 'Duraklat' : 'Oynat'; } };
    el.addEventListener('click', onClick);
    const off = mount(el, build);
    const tk = RM ? null : ticker(el, (dt) => {
      phase += dt * 5;
      if (pr < 1) pr = Math.min(1, pr + dt / 1.3);
      if (playing) { hold += dt; if (hold >= 3) { hold = 0; if (step < N) go(step + 1); else { playing = false; sync(); } } }
      if (pr < 1 || step === 7) render();
    });
    return () => { off(); if (tk) tk(); el.removeEventListener('click', onClick); };
  };

  /* ================= 5 · Tek bir kasılmanın zaman seyri ================= */
  VIZ.f56_zaman = (el) => {
    let show = 'g', sc = 'lin', p = 1, playing = false, started = false, capKey = '', geo = null;
    const CAP = {
      start: '<b>Karşılaştırma.</b> Düz kas 10 kata kadar daha yavaş kasılır ve kasılması 30 kata kadar uzun sürer; tepe gerim iskelet kasınınkine eşittir. "Oynat"a basın. [[K1 s. 251]]',
      rise: '<b>Yavaş yükseliş.</b> Düz kas aksiyon potansiyeli yavaş ve uzundur, Ca²⁺ yavaş yükselir; miyozin bağlanmadan önce fosforile edilmelidir; çapraz köprü döngüsü de yavaştır. [[K1 s. 251]]',
      peak: '<b>Eşit gerim.</b> Düz kasın ulaştığı gerim iskelet kasınınkine eşittir; yalnız hız farklıdır. [[K1 s. 251]]',
      fall: '<b>Yavaş gevşeme.</b> Etkin bir SR olmadığından Ca²⁺ sarkoplazmadan yavaş uzaklaştırılır; düz kas çok daha yavaş gevşer. [[K1 s. 251]]',
    };
    const capSet = (k) => { if (k !== capKey) { capKey = k; setCap(el, CAP[k]); } };
    const tens = (t, rise, dur) => (t <= 0 || t >= dur ? 0 : t < rise ? Math.pow(Math.sin(Math.PI / 2 * t / rise), 2) : Math.pow(Math.cos(Math.PI / 2 * (t - rise) / (dur - rise)), 2));
    const skT = (t) => tens(t, 0.3, 1), smT = (t) => tens(t, 3, 30), skC = (t) => 0.7 * tens(t, 0.1, 0.6), smC = (t) => 0.7 * tens(t, 2.2, 26);
    el.innerHTML = `<div class="f56-ctl">${RM ? '' : '<div class="btn-row"><button type="button" class="btn" data-a="oynat">Oynat</button><button type="button" class="btn ghost" data-a="basa">Baştan</button></div>'}${segHtml('Göster', 'sh', [['g', 'Gerim'], ['gc', 'Gerim + Ca²⁺']], show)}${segHtml('Ölçek', 'sc', [['lin', 'Doğrusal'], ['zoom', 'İskelet kası yakın çekim']], sc)}</div><div class="f56-box"></div>`;
    const box = el.querySelector('.f56-box');
    const build = (narrow) => {
      geo = narrow ? { W: 360, H: 304, x0: 38, x1: 346, yb: 234, yp: 78 } : { W: 640, H: 296, x0: 64, x1: 624, yb: 240, yp: 76 };
      const { W, H, x0, x1, yb, yp } = geo;
      let s = `<defs><marker id="f56-zm-a" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" class="f56-ek-mh"/></marker></defs>`;
      s += `<path class="f56-ax" d="M${x0} ${yb}H${x1}M${x0} ${yb}V${narrow ? 22 : 22}"/><text class="f56-lb f56-mut" x="${x0 - 4}" y="14">gerim</text><text class="f56-lb f56-mut" x="${x1}" y="${yb + 36}" text-anchor="end">zaman →</text>`;
      s += `<path class="f56-pk" d="M${x0} ${yp}H${x1}"/><text class="f56-lb f56-mut f56-pkt" x="${x1}" y="${yp - 6}" text-anchor="end">eşit tepe gerim</text>`;
      s += '<path class="f56-zc-ske" d="M0 0"/><path class="f56-zc-smo" d="M0 0"/><path class="f56-zc-skc" d="M0 0"/><path class="f56-zc-smc" d="M0 0"/>';
      s += '<g class="f56-zann"></g><path class="f56-cur" d="M0 0"/>';
      box.innerHTML = `<svg class="f56-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="İskelet kası ve düz kasın gerim–zaman eğrileri: aynı tepe gerim, düz kas çok daha yavaş ve uzun">${s}</svg>`;
      draw();
    };
    const draw = () => {
      if (!geo) return;
      const { x0, x1, yb, yp, W } = geo, narrow = W < 400, tmax = sc === 'lin' ? 30 : 1.25, tc = (RM ? 1 : p) * tmax;
      const X = (t) => x0 + t / tmax * (x1 - x0), Yv = (f) => yb - f * (yb - yp);
      const path = (f, amp) => { let d = ''; const N = 320, tEnd = Math.min(tc, tmax); for (let i = 0; i <= N; i++) { const t = tEnd * i / N; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Yv(f(t) * (amp || 1)).toFixed(1); } return d; };
      const q = (c) => box.querySelector(c);
      q('.f56-zc-ske').setAttribute('d', path(skT)); q('.f56-zc-smo').setAttribute('d', path(smT));
      const gc = show === 'gc';
      q('.f56-zc-skc').setAttribute('d', gc ? path(skC) : 'M0 0'); q('.f56-zc-smc').setAttribute('d', gc ? path(smC) : 'M0 0');
      let a = '';
      if (sc === 'lin') {
        a += `<path class="f56-ld" d="M${X(0.3)} ${yp - 4}V42"/><text class="f56-lb f56-lw" x="${X(0.3) + 5}" y="40">iskelet kası</text>`;
        if (tc >= 3) a += `<circle class="f56-pm f56-pm-s" cx="${X(3)}" cy="${yp}" r="4"/><path class="f56-ar f56-ar-w" d="M${X(0.3) + 1} ${yp - 10}H${X(3) - 1}" marker-start="url(#f56-zm-a)" marker-end="url(#f56-zm-a)"/><text class="f56-lb" x="${X(3) + 8}" y="${yp - 14}">${narrow ? '≤10× yavaş' : '10 kata kadar yavaş'}</text>`;
        if (tc >= 12) a += `<text class="f56-lb f56-lc" x="${X(6)}" y="${yb - 110}">düz kas</text>`;
        if (tc >= 29.5) a += `<path class="f56-ar f56-ar-w" d="M${X(1)} ${yb + 14}H${X(30)}" marker-start="url(#f56-zm-a)" marker-end="url(#f56-zm-a)"/><text class="f56-lb" x="${(X(1) + X(30)) / 2}" y="${yb + 33}" text-anchor="middle">${narrow ? '≤30× uzun' : '30 kata kadar uzun'}</text>`;
        a += `<circle class="f56-pm f56-pm-k" cx="${X(0.3)}" cy="${yp}" r="4"/>`;
      } else {
        a += `<text class="f56-lb f56-lw" x="${X(0.3) + 6}" y="${yp - 12}">iskelet kası</text>`;
        if (tc >= 1) a += `<text class="f56-lb f56-lc" x="${X(1.25) - 6}" y="${yb - 22}" text-anchor="end">düz kas: yeni yükseliyor</text>`;
        a += `<circle class="f56-pm f56-pm-k" cx="${X(0.3)}" cy="${yp}" r="4"/>`;
      }
      q('.f56-zann').innerHTML = a;
      const cur = q('.f56-cur');
      if (!RM && p < 1) cur.setAttribute('d', `M${X(tc)} ${yb}V${narrow ? 30 : 26}`); else cur.setAttribute('d', 'M0 0');
      q('.f56-pkt').style.display = narrow ? 'none' : '';
      // açıklama
      if (!started) capSet('start');
      else if (p >= 1 && !playing) capSet(capKey === 'start' ? 'start' : capKey);
      else { const s = sc === 'lin' ? tc : tc * 24; capSet(tc < (sc === 'lin' ? 3 : 99) ? 'rise' : tc < 4.5 ? 'peak' : 'fall'); void s; }
    };
    const sync = () => { const b = el.querySelector('[data-a=oynat]'); if (b) b.textContent = playing ? 'Duraklat' : 'Oynat'; };
    const onClick = (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.a === 'oynat') { if (playing) playing = false; else { if (p >= 1) p = 0; playing = true; started = true; } sync(); draw(); }
      else if (b.dataset.a === 'basa') { playing = false; p = 1; started = false; capKey = ''; sync(); draw(); }
      else if (b.dataset.sh) { show = b.dataset.sh; setSeg(el, 'sh', show); draw(); }
      else if (b.dataset.sc) { sc = b.dataset.sc; setSeg(el, 'sc', sc); playing = false; p = 1; started = false; capKey = ''; sync(); draw(); }
    };
    el.addEventListener('click', onClick);
    const off = mount(el, build);
    const tk = RM ? null : ticker(el, (dt) => { if (!playing) return; p = Math.min(1, p + dt / (sc === 'lin' ? 8 : 6)); if (p >= 1) { playing = false; sync(); } draw(); });
    return () => { off(); if (tk) tk(); el.removeEventListener('click', onClick); };
  };

  /* ================= 6 · Mandal köprüsü ================= */
  VIZ.f56_latch = (el) => {
    let mode = 'dongu', phos = 1, atpUse = 1, count = 0, capKey = '', geo = null, ox = 0, tm = 0, vel = 0;
    const CAP = {
      dongu: '<b>Döngü.</b> Fosforile miyozin aktine bağlanır, çeker, ayrılır; her döngü bir ATP harcar. "Defosforile et"e basın. [[K1 s. 251]]',
      mandal: '<b>Mandal köprüsü.</b> Miyozin aktine bağlıyken defosforile edilince çapraz köprü yerinde kalır; gerim yüksek kalır, ek ATP harcanmaz. Uzun süre tonik etkin kalması gereken sfinkterlerde yaygındır. [[K1 s. 251]]',
      yeni: '<b>Yeniden döngü.</b> Fosforilasyon dönünce miyozin başları yine bağlanıp ayrılır ve ATP harcanır. Yavaş kasılma da enerji kazandırır: kasılmanın gücü kuvvet ile hızın çarpımıdır. [[K1 s. 251]]',
    };
    const capSet = (k) => { if (k !== capKey) { capKey = k; setCap(el, CAP[k]); } };
    // her baş: faz ph (0..1), durum: 'c' döngü, 'p' kilit bekliyor, 'l' kilitli
    const heads = [0, 1, 2, 3].map((i) => ({ ph: i * 0.25, st: 'c', pose: null, lastDet: false }));
    el.innerHTML = `<div class="f56-ctl"><div class="btn-row"><button type="button" class="btn f56-lt" data-a="tgl">Defosforile et</button><button type="button" class="btn ghost" data-a="basa">Baştan</button></div>${segHtml('Mod', 'mod', [['dongu', 'Döngü'], ['mandal', 'Mandal']], mode)}</div><div class="f56-box"></div>`;
    const box = el.querySelector('.f56-box');
    const build = (narrow) => {
      const nh = narrow ? 3 : 4;
      geo = narrow
        ? { W: 360, H: 446, nh, hx: [80, 180, 280], ya: 50, yt: 150, ry: 70, gx: 20, gw: 320, gy: [220, 260, 300], cnt: [20, 346], bx: 8, by: 360, bw: 344, sf: [30, 418] }
        : { W: 640, H: 300, nh, hx: [78, 166, 254, 342], ya: 78, yt: 200, ry: 80, gx: 436, gw: 184, gy: [40, 92, 144], cnt: [436, 192], bx: 12, by: 258, bw: 388, sf: [452, 252] };
      const g = geo;
      let s = `<defs><marker id="f56-lt-m" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" class="f56-ek-mh"/></marker></defs>`;
      const ax0 = 20, ax1 = narrow ? 340 : 396;
      s += `<g class="f56-lt-actin"></g><text class="f56-lb" x="${ax0}" y="${g.ya - 14}">aktin</text>`;
      s += `<rect class="f56-ek-th" x="${ax0}" y="${g.yt - 6}" width="${ax1 - ax0}" height="12" rx="6"/><text class="f56-lb" x="${ax0}" y="${g.yt + 26}">miyozin</text>`;
      s += `<g class="f56-lt-heads">${g.hx.map(() => '<g class="f56-lt-h"><path class="f56-ek-st" d="M0 0"/><ellipse class="f56-ek-hh" cx="0" cy="0" rx="12" ry="6.5"/><g class="f56-lt-p"><circle class="f56-ek-pc" cx="0" cy="0" r="8"/><text class="f56-ek-ptx" x="0" y="4" text-anchor="middle">P</text></g><g class="f56-lt-atp"><rect class="f56-lt-ar" x="-17" y="-9" width="34" height="18" rx="6"/><text class="f56-lt-at" x="0" y="4" text-anchor="middle">ATP</text></g><g class="f56-lt-lock"><rect class="f56-lt-lk" x="-6" y="-4" width="12" height="9" rx="2"/><path class="f56-lt-lka" d="M-3.5 -4V-8a3.5 3.5 0 0 1 7 0V-4"/></g></g>').join('')}</g>`;
      s += `<text class="f56-lb f56-lt-mt" x="${(ax0 + ax1) / 2}" y="${g.ya + 38}" text-anchor="middle" opacity="0">mandal köprüsü</text>`;
      const meters = [['Miyozin fosforilasyonu', 'ok', 'f56-m-ok'], ['Gerim', 'crit', 'f56-m-cr'], ['ATP tüketimi', 'warn', 'f56-m-wa']];
      meters.forEach(([lab, , cl], i) => { s += `<text class="f56-lb" x="${g.gx}" y="${g.gy[i] - 6}">${lab}</text><rect class="f56-m-bg" x="${g.gx}" y="${g.gy[i]}" width="${g.gw}" height="16" rx="8"/><rect class="f56-m ${cl}" x="${g.gx}" y="${g.gy[i]}" width="${g.gw}" height="16" rx="8"/>`; });
      s += `<text class="f56-lb f56-lt-cnt" x="${g.cnt[0]}" y="${g.cnt[1]}">harcanan ATP: 0</text>`;
      s += `<rect class="f56-lt-bx" x="${g.bx}" y="${g.by}" width="${g.bw}" height="${narrow ? 38 : 34}" rx="9"/><text class="f56-lb" x="${g.bx + 10}" y="${g.by + (narrow ? 16 : 21)}">Güç = kuvvet × hız: düşük hız, düşük güç gereksinimi</text>`;
      s += narrow ? '' : '';
      s += `<circle class="f56-lt-sf" cx="${g.sf[0]}" cy="${g.sf[1]}" r="15"/><text class="f56-lb" x="${g.sf[0] + 26}" y="${g.sf[1] - 2}">Sfinkter:</text><text class="f56-lb" x="${g.sf[0] + 26}" y="${g.sf[1] + 14}">uzun süre tonik</text>`;
      box.innerHTML = `<svg class="f56-svg" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Çapraz köprü döngüsü ve mandal köprüsü: aktin, miyozin başları, fosfat, ATP, gerim ve ATP tüketimi göstergeleri">${s}</svg>`;
      draw();
    };
    const poseOf = (h, i) => {
      // faz → ucun konumu (aktin yönünde yukarı): bağlı ise y = ya + 12
      const { ya, yt, ry } = geo, yr = ya + ry; // dinlenim ucu y
      const ph = h.ph, yb = ya + 13;
      let f = 0, dx = -10, atp = 0;
      if (ph < 0.1) { f = ease(ph / 0.1); dx = -10; }
      else if (ph < 0.4) { f = 1; dx = -10 + 20 * ((ph - 0.1) / 0.3); }
      else if (ph < 0.55) { f = 1 - ease((ph - 0.4) / 0.15); dx = 10 - 20 * ease((ph - 0.4) / 0.15); atp = ph < 0.7 ? 1 : 0; }
      else { f = 0; dx = -10; atp = ph < 0.7 ? 1 : 0; }
      return { f, dx, ty: lerp(yr, yb, f), atp, bound: ph >= 0.1 && ph < 0.4 };
    };
    const draw = () => {
      if (!geo) return;
      const { hx, ya, yt, ry, gx, gw, gy, W } = geo, narrow = W < 400, q = (c) => box.querySelector(c);
      // aktin boncukları
      const ax0 = 20, ax1 = narrow ? 340 : 396, sp = 14, off = ((ox % sp) + sp) % sp;
      let a = `<path class="f56-ek-act" d="M${ax0} ${ya}H${ax1}"/>`;
      for (let x = ax0 - sp + off; x < ax1; x += sp) if (x >= ax0 - 2) a += `<circle class="f56-ek-ab" cx="${x.toFixed(1)}" cy="${ya}" r="3.6"/>`;
      q('.f56-lt-actin').innerHTML = a;
      const hs = box.querySelectorAll('.f56-lt-h');
      heads.slice(0, geo.nh).forEach((h, i) => {
        const x = hx[i], pose = h.st === 'l' ? h.pose : poseOf(h, i);
        const tx = x + pose.dx, ty = pose.ty, g = hs[i];
        g.querySelector('.f56-ek-st').setAttribute('d', `M${x} ${yt - 6}Q${x + (tx - x) * 0.15} ${(yt + ty) / 2} ${tx} ${ty + 4}`);
        const hh = g.querySelector('.f56-ek-hh'); hh.setAttribute('cx', tx); hh.setAttribute('cy', ty);
        const px = x - 18 - (1 - phos) * 14, py = yt - 40 - (1 - phos) * 10;
        const pg = g.querySelector('.f56-lt-p'); pg.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`); pg.style.opacity = phos.toFixed(2);
        const at = g.querySelector('.f56-lt-atp'); at.setAttribute('transform', `translate(${(x + 30).toFixed(1)} ${(yt - 62).toFixed(1)})`); at.style.opacity = h.st === 'c' && pose.atp ? 1 : 0;
        const lk = g.querySelector('.f56-lt-lock'); lk.setAttribute('transform', `translate(${(tx + 16).toFixed(1)} ${(ty - 14).toFixed(1)})`); lk.style.opacity = h.st === 'l' ? 1 : 0;
      });
      // göstergeler
      const set = (cls, f) => q('.' + cls).setAttribute('width', Math.max(0.01, gw * f).toFixed(1));
      set('f56-m-ok', phos); set('f56-m-cr', 1); set('f56-m-wa', atpUse);
      q('.f56-lt-cnt').textContent = 'harcanan ATP: ' + count;
      q('.f56-lt-cnt').style.display = RM ? 'none' : '';
      q('.f56-lt-mt').setAttribute('opacity', heads.slice(0, geo.nh).every((h) => h.st === 'l') ? 1 : 0);
      el.querySelector('.f56-lt').textContent = mode === 'dongu' ? 'Defosforile et' : 'Yeniden fosforile et';
    };
    const lockPose = (h) => { const p = poseOf({ ph: clamp(h.ph, 0.1, 0.4) }, 0); return { dx: p.dx, ty: p.ty }; };
    const setMode = (m, fresh) => {
      mode = m; setSeg(el, 'mod', m);
      if (m === 'mandal') {
        capSet('mandal');
        heads.forEach((h) => { if (h.st === 'l') return; if (RM) { h.ph = 0.25; h.st = 'l'; h.pose = lockPose(h); } else if (h.ph >= 0.1 && h.ph < 0.4) { h.pose = lockPose(h); h.st = 'l'; } else h.st = 'p'; });
        if (RM) { phos = 0; atpUse = 0; }
      } else {
        if (!fresh) capSet('yeni');
        heads.forEach((h) => { if (h.st === 'l' || h.st === 'p') { h.st = 'c'; if (h.pose) { h.ph = clamp(h.ph, 0.1, 0.4) + 0.001; h.pose = null; } } });
        if (RM) { phos = 1; atpUse = 1; }
      }
      draw();
    };
    const onClick = (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.a === 'tgl') setMode(mode === 'dongu' ? 'mandal' : 'dongu');
      else if (b.dataset.a === 'basa') { heads.forEach((h, i) => { h.ph = i * 0.25; h.st = 'c'; h.pose = null; }); phos = 1; atpUse = 1; count = 0; mode = 'dongu'; capKey = ''; setSeg(el, 'mod', 'dongu'); capSet('dongu'); draw(); }
      else if (b.dataset.mod) { if (b.dataset.mod !== mode) setMode(b.dataset.mod); }
    };
    el.addEventListener('click', onClick);
    capSet('dongu');
    const off = mount(el, build);
    // RM: başlar farklı evrelerde durağan
    if (RM) { heads.forEach((h, i) => { h.ph = [0.2, 0.45, 0.65, 0.3][i]; }); draw(); }
    const tk = RM ? null : ticker(el, (dt) => {
      tm += dt;
      let strokers = 0;
      heads.forEach((h) => {
        if (h.st === 'l') return;
        const prev = h.ph; h.ph += dt / 1.6;
        if (h.ph >= 1) h.ph -= 1;
        if (h.st === 'c') { if (prev < 0.4 && h.ph >= 0.4 || (prev > h.ph && h.ph >= 0.4)) count++; if (h.ph >= 0.1 && h.ph < 0.4) strokers++; }
        if (h.st === 'p' && h.ph >= 0.1 && h.ph < 0.4 && prev < 0.4 && (prev >= 0.1 || prev > h.ph || true)) { h.st = 'l'; h.pose = lockPose(h); }
      });
      const cyc = heads.filter((h) => h.st === 'c').length;
      ox += 50 * (strokers / 1.2) * dt * (mode === 'dongu' ? 1 : 0);
      const lockedAll = heads.every((h) => h.st === 'l');
      const tgtP = mode === 'dongu' ? 1 : 0; phos += (tgtP - phos) * Math.min(1, dt * 3);
      const tgtA = mode === 'dongu' ? 1 : (lockedAll ? 0 : cyc / 4); atpUse += (tgtA - atpUse) * Math.min(1, dt * 4);
      draw();
    });
    return () => { off(); if (tk) tk(); el.removeEventListener('click', onClick); };
  };
})();
