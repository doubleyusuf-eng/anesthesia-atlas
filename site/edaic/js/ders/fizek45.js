/* Ek ders · EEG, uyarılmış potansiyeller ve uyku · bileşenler (tarif: docs/tasarim/fizek45.md; K2 s. 63–65, K1 s. 196).
   Kitaptan: bant sınırları (4, 8, 13 Hz), α ≈ 50 μV, β < 50 μV, CBF 54 / 18–20 / izofluran 10 / halotan 18 mL/100 g/dk,
   üç dakika kuralı, uyarılmış potansiyel 1–5 μV ve EEG 10–20 μV, elektrot yerleri, BAEP I–V kaynakları.
   Temsilî: dalga biçimleri, hücre sayısı, eşzamanlılık–genlik ilişkisi, iskemi evrelerinin zamanı (viz-foot'larda belirtildi). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const TAU = Math.PI * 2;
  let SAYAC = 0;
  const uid = (p) => `fek45-${p}-${++SAYAC}`;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const mk = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tx = (x, y, s, cls, anc, extra) => `<text class="${cls}" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}${extra || ''}>${s}</text>`;
  const okUc = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="${cls}"/></marker>`;
  /* tohumlu rastgele sayı (mulberry32) */
  const rnd = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

  /* EEG sinyali (μV, t saniye): ritmik = tek frekanslı, hafif genlik dalgalanmalı; değilse frekans çevresinde
     beş sinüsün düzensiz toplamı. g: düşük düzeyli hızlı gürültü (μV). */
  const dalga = ({ f = 10, a = 20, ritmik = false, g = 1.5, seed = 1 }) => {
    const r = rnd(seed);
    const bil = [];
    if (ritmik) bil.push([f, a * 0.92, r() * TAU]);
    else for (let i = 0; i < 5; i++) bil.push([f * (0.6 + r() * 0.9), a * 0.42, r() * TAU]);
    const gur = []; for (let i = 0; i < 3; i++) gur.push([28 + r() * 24, g * 0.55, r() * TAU]);
    const mod = r() * TAU;
    return (t) => {
      let v = 0;
      for (const [ff, aa, p] of bil) v += aa * Math.sin(TAU * ff * t + p);
      if (ritmik) v *= 0.86 + 0.14 * Math.sin(TAU * 0.4 * t + mod);
      for (const [ff, aa, p] of gur) v += aa * Math.sin(TAU * ff * t + p);
      return v;
    };
  };
  const topla = (...fs) => (t) => fs.reduce((s, f) => s + f(t), 0);

  /* Kayan EEG şeridi: yeni sinyal sağdan girer (0,3 s geçiş), eski iz sola akar. o: {x, y (orta çizgi), w, h, k (px/μV), pen (s), adim} */
  const serit = (g, o) => {
    const yol = mk('path', { class: o.cls || 'fek45-iz' }, g);
    let par = [{ t0: -1e9, fn: () => 0 }], T = o.pen;
    const deger = (t) => {
      let i = par.length - 1;
      while (i > 0 && par[i].t0 > t) i--;
      const p = par[i], v = p.fn(t);
      if (i > 0 && t < p.t0 + 0.3) { const m = (t - p.t0) / 0.3; return par[i - 1].fn(t) * (1 - m) + v * m; }
      return v;
    };
    const api = {
      set(fn, aninda) {
        if (aninda || RM) par = [{ t0: -1e9, fn }];
        else {
          par.push({ t0: T, fn });
          const sinir = T - o.pen - 0.5;
          par = par.filter((p, i) => i === par.length - 1 || par[i + 1].t0 > sinir);
        }
        api.ciz();
      },
      ilerle(dt) { T += dt; },
      ciz() {
        const adim = o.adim || 1.5, n = Math.round(o.w / adim);
        let d = '';
        for (let j = 0; j <= n; j++) {
          const xx = o.x + (j / n) * o.w, t = T - o.pen + (j / n) * o.pen;
          const v = clamp(deger(t) * o.k, -o.h / 2 + 2, o.h / 2 - 2);
          d += (j ? 'L' : 'M') + xx.toFixed(1) + ' ' + (o.y - v).toFixed(1);
        }
        yol.setAttribute('d', d);
      },
    };
    return api;
  };
  /* şerit zemini + ölçek çubukları (50 μV dikey, 1 s yatay) */
  const seritZemin = (o, uv = 50) => {
    const x0 = o.x, y0 = o.y - o.h / 2, bx = o.x + 8, by = o.y + o.h / 2 - 10, sx = o.w / o.pen;
    return `<rect class="fek45-zemin" x="${x0}" y="${y0}" width="${o.w}" height="${o.h}" rx="8"/>
      <line class="fek45-orta" x1="${x0 + 4}" x2="${x0 + o.w - 4}" y1="${o.y}" y2="${o.y}"/>
      <path class="fek45-olcek" d="M${bx} ${by - uv * o.k} V${by} H${bx + sx}"/>
      ${tx(bx + 5, by - uv * o.k + 10, `${uv} μV`, 'fek45-tk')}${tx(bx + sx / 2, by - 4, '1 s', 'fek45-tk', 'middle')}`;
  };

  /* =====================================================================
     1 · fek45_senkron — eşzamanlılık genliği büyütür (K2 s. 63, K1 s. 196)
     ===================================================================== */
  VIZ.fek45_senkron = (el) => {
    const HIZ = 0.25; // ağır çekim
    const R = rnd(4501);
    const HUC = Array.from({ length: 8 }, () => ({ ph: R() * TAU, ph2: R() * TAU, fr: 15 + R() * 15 }));
    let s = 0.8, ret = false, oyn = !RM, dar = false, T = 2, capK = '';
    const fKoh = dalga({ f: 10, a: 1, ritmik: true, g: 0, seed: 11 });
    const fInk = dalga({ f: 10, a: 15, g: 1, seed: 12 });
    const fRet = dalga({ f: 20, a: 15, g: 1, seed: 13 });
    el.innerHTML = `<div class="fek45-ctl">
        <label class="fek45-rng"><span>Eşzamanlılık <b data-o="s"></b></span>
          <input type="range" min="0" max="100" step="10" value="80" aria-label="Eşzamanlılık" data-k="s"></label>
        <div class="fek45-grp"><span class="fek45-gl">Retiküler uyarı</span>${segHtml('Retiküler uyarı', 'ret', [['0', 'Kapalı'], ['1', 'Açık']], '0')}</div>
        ${RM ? '' : '<button type="button" class="btn ghost" data-a="oyna">Duraklat</button>'}
      </div><div class="fek45-kutu"></div>
      <dl class="fek45-oku fek45-oku3"><div><dt>Eşzamanlılık</dt><dd data-o="es"></dd></div><div><dt>Toplam genlik</dt><dd data-o="gen"></dd></div><div><dt>Baskın frekans</dt><dd data-o="fr"></dd></div></dl>`;
    const kutu = el.querySelector('.fek45-kutu'), rng = el.querySelector('[data-k=s]');
    let S = null, S1 = null, gosterge = [], nokta = null;
    const L = () => dar
      ? { vb: '0 0 360 516', ex: 180, ey: 16, ky: 40, x0: 20, x1: 340, n: 6, hx: (i) => 40 + i * 56, dTop: 52, gy: 76, soma: 188, alab: 216,
          tal: [8, 230, 150, 70], rf: [202, 230, 150, 70], ok: 'M202 265 H162', okLab: [180, 318],
          s1: { x: 20, y: 352, w: 320, h: 26, k: 0.55, pen: 2 }, s1lab: [20, 335], S: { x: 20, y: 448, w: 320, h: 120, k: 0.55, pen: 2 } }
      : { vb: '0 0 760 330', ex: 390, ey: 18, ky: 50, x0: 280, x1: 500, n: 8, hx: (i) => 300 + i * 26.5, dTop: 60, gy: 86, soma: 248, alab: 280,
          tal: [20, 50, 230, 110], rf: [20, 230, 230, 80], ok: 'M135 230 V166', okLab: [146, 204],
          s1: { x: 520, y: 82, w: 220, h: 28, k: 0.75, pen: 2 }, s1lab: [520, 60], S: { x: 520, y: 215, w: 220, h: 176, k: 0.75, pen: 2 } };
    const ciz = () => {
      const l = L(), ok = uid('ok');
      const [tx0, ty0, tw, th] = l.tal, [rx0, ry0, rw, rh] = l.rf;
      const tcx = tx0 + tw / 2, tcy = ty0 + th / 2;
      let hucre = '';
      for (let i = 0; i < l.n; i++) {
        const x = l.hx(i);
        hucre += `<path class="fek45-lif" d="M${tx0 + tw} ${dar ? ty0 : tcy} Q ${(tx0 + tw + x) / 2} ${dar ? (ty0 + 150) / 2 : tcy} ${x} ${(l.dTop + l.soma) / 2 + 20}"/>`;
        hucre += `<path class="fek45-hucre" d="M${x} ${l.soma - 12} L${x - 9} ${l.soma + 8} L${x + 9} ${l.soma + 8} Z M${x} ${l.soma - 12} V${l.dTop} M${x} ${l.dTop + 18} l-7 -8 M${x} ${l.dTop + 18} l7 -8 M${x - 9} ${l.soma + 8} l-5 9 M${x + 9} ${l.soma + 8} l5 9"/>`;
        hucre += `<line class="fek45-g0" x1="${x - 6}" x2="${x + 6}" y1="${l.gy}" y2="${l.gy}"/><rect class="fek45-gst" data-i="${i}" x="${x + 2}" width="7" y="${l.gy}" height="0" rx="1.5"/>`;
      }
      kutu.innerHTML = `<svg class="fek45-svg${dar ? ' fek45-dar' : ''}" viewBox="${l.vb}" role="img" aria-label="Talamus ve retiküler formasyondan piramidal hücre dendritlerine giden girdiler; dendrit potansiyelleri ve kafa derisinde toplanan EEG izi">
        <defs>${okUc(ok, 'fek45-uc-w')}</defs>
        <line class="fek45-yuzey" x1="${l.x0}" x2="${l.x1}" y1="${l.ky}" y2="${l.ky}"/>
        ${tx(l.x0, l.ky - 7, 'Korteks yüzeyi', 'fek45-tm')}
        <line class="fek45-elk-k" x1="${l.ex}" x2="${l.ex}" y1="${l.ey + 6}" y2="${l.ky}"/>
        <circle class="fek45-elk" cx="${l.ex}" cy="${l.ey}" r="7"/>${tx(l.ex + 12, l.ey + 4, 'Kafa derisi elektrodu', 'fek45-tm')}
        <rect class="fek45-tal" x="${tx0}" y="${ty0}" width="${tw}" height="${th}" rx="12"/>
        ${tx(tcx, ty0 + 22, 'Talamik çekirdekler', 'fek45-t fek45-c-b', 'middle')}${tx(tcx, ty0 + 38, 'ritim oluşturucu', 'fek45-tm', 'middle')}
        <circle class="fek45-nabiz" cx="${tcx}" cy="${ty0 + th - 18}" r="6"/>
        <g class="fek45-rfg"><rect class="fek45-rf" x="${rx0}" y="${ry0}" width="${rw}" height="${rh}" rx="12"/>
          ${tx(rx0 + rw / 2, ry0 + (dar ? 30 : 34), 'Retiküler', 'fek45-t fek45-c-w', 'middle')}${tx(rx0 + rw / 2, ry0 + (dar ? 48 : 52), 'formasyon', 'fek45-t fek45-c-w', 'middle')}
          <path class="fek45-rfok" d="${l.ok}" marker-end="url(#${ok})"/>
          <g class="fek45-rflab">${tx(l.okLab[0], l.okLab[1], 'uyarı → ritim bozulur', 'fek45-tm fek45-c-w', dar ? 'middle' : 'start')}</g></g>
        ${hucre}
        ${tx(l.x0 + (l.x1 - l.x0) / 2, l.alab, 'Apikal dendritler: EPSP + IPSP', 'fek45-tm', 'middle')}
        ${tx(l.s1lab[0], l.s1lab[1], 'Tek hücre (ölçek ×1)', 'fek45-tm')}
        <rect class="fek45-zemin" x="${l.s1.x}" y="${l.s1.y - l.s1.h / 2}" width="${l.s1.w}" height="${l.s1.h}" rx="6"/>
        ${tx(l.S.x, l.S.y - l.S.h / 2 - 8, 'Kafa derisi EEG\'si (toplam)', 'fek45-t')}
        ${tx(l.S.x + l.S.w - 8, l.S.y - l.S.h / 2 + 16, RM ? '' : 'ağır çekim ×0,25', 'fek45-tk', 'end')}
        ${seritZemin(l.S)}
        <g class="fek45-sg"></g>
      </svg>`;
      const svg = kutu.querySelector('svg'), sg = svg.querySelector('.fek45-sg');
      S1 = serit(sg, Object.assign({ cls: 'fek45-iz fek45-iz-tek' }, l.s1));
      S = serit(sg, l.S);
      gosterge = [...svg.querySelectorAll('.fek45-gst')];
      nokta = svg.querySelector('.fek45-nabiz');
      uygula(true);
    };
    const hucreV = (i, t) => { const h = HUC[i]; return ret ? Math.sin(TAU * h.fr * t + h.ph2) : Math.sin(TAU * 10 * t + (1 - s) * h.ph); };
    const toplamFn = () => {
      if (ret) return fRet;
      const k = 85 * s * s;
      return (t) => k * fKoh(t) / 0.92 + fInk(t);
    };
    const kare = () => {
      const l = L();
      gosterge.forEach((r, i) => {
        const v = hucreV(i, T), hh = Math.abs(v) * (dar ? 18 : 20);
        r.setAttribute('y', v > 0 ? l.gy - hh : l.gy); r.setAttribute('height', hh.toFixed(1));
        r.setAttribute('class', 'fek45-gst ' + (v > 0 ? 'fek45-art' : 'fek45-eks'));
      });
      if (nokta) nokta.setAttribute('r', ret ? 5 : (5 + 4 * Math.max(0, Math.sin(TAU * 10 * T))).toFixed(1));
      S.ciz(); S1.ciz();
    };
    const uygula = (aninda) => {
      const svg = kutu.querySelector('svg');
      svg.classList.toggle('fek45-ret', ret);
      rng.disabled = ret;
      el.querySelector('.fek45-rng').classList.toggle('fek45-pasif', ret);
      el.querySelector('[data-o=s]').textContent = ret ? 'ritim bozuldu' : '%' + Math.round(s * 100);
      rng.setAttribute('aria-valuetext', '%' + Math.round(s * 100));
      const gen = ret ? 15 : Math.round((15 + 85 * s * s) / 5) * 5;
      el.querySelector('[data-o=es]').textContent = ret ? '— (ritim yok)' : '%' + Math.round(s * 100);
      el.querySelector('[data-o=gen]').textContent = `≈ ${gen} μV`;
      el.querySelector('[data-o=fr]').textContent = ret ? '≈ 20 Hz (düzensiz)' : '10 Hz';
      S.set(toplamFn(), aninda || !oyn);
      S1.set((t) => 0.1 * hucreV(0, t), true);
      kare();
      const k = ret ? 'ret' : s >= 0.7 ? 'yuk' : s >= 0.3 ? 'orta' : 'dus';
      if (k !== capK) {
        capK = k;
        capYaz(el, {
          yuk: 'Talamik çekirdeklerin ritmik deşarjı dendritleri aynı anda depolarize ediyor: potansiyeller toplanır, iz büyük ve düzenlidir. [[K2 s. 63]]',
          orta: 'Fazlar dağıldıkça artı ve eksi potansiyeller birbirini kısmen siler; toplam iz küçülür. [[K2 s. 63]]',
          dus: 'Eşzamanlılık yokken binlerce dendritin potansiyeli büyük ölçüde birbirini götürür; tek bir nöronun katkısı kafa derisinde zaten görülemez. [[K1 s. 196]]',
          ret: 'Retiküler formasyondan gelen uyarılar talamik ritmi kesti: dalgalar desenkronize, küçük ve hızlı. Uyanıklığın EEG\'si budur. [[K2 s. 63–64]]',
        }[k]);
      }
    };
    rng.addEventListener('input', () => { s = +rng.value / 100; uygula(false); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ret]');
      if (b) { ret = b.dataset.ret === '1'; basSec(el, 'ret', b.dataset.ret); uygula(false); }
      if (e.target.closest('[data-a=oyna]')) { oyn = !oyn; e.target.closest('[data-a=oyna]').textContent = oyn ? 'Duraklat' : 'Oynat'; }
    });
    const durD = darIzle(el, (d) => { dar = d; el.classList.toggle('fek45-darw', d); ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => { if (!oyn) return; const d = dt * HIZ; T += d; S.ilerle(d); S1.ilerle(d); kare(); });
    return () => { durT(); durD(); };
  };

  /* =====================================================================
     2 · fek45_bant — dört bant: nerede, ne zaman? (K2 s. 64, K1 s. 196)
     ===================================================================== */
  VIZ.fek45_bant = (el) => {
    const B = {
      b: { ad: 'β', hz: '> 13 Hz', fr: 20, sig: dalga({ f: 20, a: 20, seed: 21 }), gen: '< 50 μV', bol: 'Frontal', ne: 'Uyanık, dikkatli; göz kapamadan etkilenmez', bolge: 'on', sim: true,
        cap: 'β: hızlı, küçük (< 50 μV), frontal ve simetrik. Uyanık, dikkatli beynin asenkron örüntüsü; göz kapamak onu değiştirmez. [[K2 s. 64]]' },
      a: { ad: 'α', hz: '8–13 Hz', fr: 10, sig: dalga({ f: 10, a: 50, ritmik: true, seed: 22 }), gen: '≈ 50 μV', bol: 'Parieto-oksipital', ne: 'Uyanık, dinlenen, gözleri kapalı kişi', bolge: 'arka', sim: true,
        cap: 'α: 8–13 Hz, ≈ 50 μV, parieto-oksipital. Uyanık ama dinlenen, gözleri kapalı kişide görülür; kaydı için sağlam talamokortikal projeksiyonlar ve retiküler girdi gerekir. [[K2 s. 64]]' },
      t: { ad: 'θ', hz: '4–8 Hz', fr: 6, sig: dalga({ f: 6, a: 60, ritmik: true, seed: 23 }), gen: '—', bol: 'Parietal ve temporal (çocuk)', ne: 'Çocuklar; erişkinde duygusal stres', bolge: 'orta', sim: false,
        cap: 'θ: 4–8 Hz. Çocuklarda parietal ve temporal bölgelerde normaldir; erişkinde duygusal streste belirebilir. [[K2 s. 64]]' },
      d: { ad: 'δ', hz: '< 4 Hz', fr: 2, sig: dalga({ f: 2, a: 120, ritmik: true, seed: 24 }), gen: 'Yüksek voltaj', bol: 'Yaygın', ne: 'Derin uyku, bebekler, ağır organik beyin hastalığı', bolge: 'tum', sim: false,
        cap: 'δ: 4 Hz\'nin altında, yüksek voltajlı ve senkron. Derin uykuda, bebeklerde ve ağır organik beyin hastalığında görülür; genel anestezide EEG de β\'dan δ\'ya kayar. [[K2 s. 64]] [[K1 s. 196]]' },
    };
    const aAcik = dalga({ f: 20, a: 15, seed: 25 });
    let bant = 'a', goz = 'kapali', dar = false, S = null;
    const etiket = (k) => `<span class="fek45-uz">${B[k].ad} ${B[k].hz}</span><span class="fek45-kz">${B[k].ad}<small>${B[k].hz}</small></span>`;
    el.innerHTML = `<div class="fek45-ctl">
        <div class="fek45-grp fek45-tam"><span class="fek45-gl">Bant</span>${segHtml('Frekans bandı', 'bant', ['b', 'a', 't', 'd'].map((k) => [k, etiket(k)]), bant, 'fek45-seg4')}</div>
        <div class="fek45-grp" data-goz-grp><span class="fek45-gl">Gözler</span>${segHtml('Gözler', 'goz', [['kapali', 'Kapalı'], ['acik', 'Açık']], goz)}</div>
      </div><div class="fek45-kutu"></div>
      <dl class="fek45-oku fek45-oku4"><div><dt>Frekans</dt><dd data-o="f"></dd></div><div><dt>Genlik</dt><dd data-o="g"></dd></div><div><dt>Bölge</dt><dd data-o="b"></dd></div><div><dt>Ne zaman?</dt><dd data-o="n"></dd></div></dl>`;
    const kutu = el.querySelector('.fek45-kutu');
    const L = () => dar
      ? { vb: '0 0 360 450', hx: 180, hy: 108, rx: 66, ry: 78, blab: 208, slab: 225, S: { x: 20, y: 300, w: 320, h: 130, k: 0.5, pen: 2, adim: 1 }, cet: { x: 20, y: 392, w: 320 } }
      : { vb: '0 0 760 300', hx: 135, hy: 142, rx: 82, ry: 98, blab: 268, slab: 288, S: { x: 280, y: 112, w: 460, h: 170, k: 0.6, pen: 2 }, cet: { x: 280, y: 236, w: 460 } };
    const ciz = () => {
      const l = L(), cp = uid('kafa');
      const { hx, hy, rx, ry } = l, top = hy - ry, h3 = (2 * ry) / 3;
      const c = l.cet, hzX = (f) => c.x + (f / 30) * c.w;
      const kus = [['d', 0, 4], ['t', 4, 8], ['a', 8, 13], ['b', 13, 30]];
      kutu.innerHTML = `<svg class="fek45-svg${dar ? ' fek45-dar' : ''}" viewBox="${l.vb}" role="img" aria-label="Üstten kafa haritasında bandın en belirgin bölgesi, kayan EEG şeridi ve 0–30 Hz frekans cetveli">
        <defs><clipPath id="${cp}"><ellipse cx="${hx}" cy="${hy}" rx="${rx}" ry="${ry}"/></clipPath></defs>
        <path class="fek45-kafa" d="M${hx - 12} ${top + 3} L${hx} ${top - 14} L${hx + 12} ${top + 3}"/>
        <ellipse class="fek45-kafa" cx="${hx - rx - 2}" cy="${hy}" rx="7" ry="16"/><ellipse class="fek45-kafa" cx="${hx + rx + 2}" cy="${hy}" rx="7" ry="16"/>
        <ellipse class="fek45-kafa fek45-kafa-z" cx="${hx}" cy="${hy}" rx="${rx}" ry="${ry}"/>
        <g clip-path="url(#${cp})">
          <rect class="fek45-bolge" data-bo="on" x="${hx - rx}" y="${top}" width="${2 * rx}" height="${h3}"/>
          <rect class="fek45-bolge" data-bo="orta" x="${hx - rx}" y="${top + h3}" width="${2 * rx}" height="${h3}"/>
          <rect class="fek45-bolge" data-bo="arka" x="${hx - rx}" y="${top + 2 * h3}" width="${2 * rx}" height="${h3}"/>
          <rect class="fek45-bolge" data-bo="tum" x="${hx - rx}" y="${top}" width="${2 * rx}" height="${2 * ry}"/>
        </g>
        <ellipse class="fek45-kafa-c" cx="${hx}" cy="${hy}" rx="${rx}" ry="${ry}"/>
        <line class="fek45-orta-h" x1="${hx}" x2="${hx}" y1="${top + 4}" y2="${hy + ry - 4}"/>
        ${tx(hx, top - 18, 'Ön', 'fek45-tm', 'middle')}
        ${tx(hx - rx / 2, hy + 4, 'Sol', 'fek45-tm', 'middle')}${tx(hx + rx / 2, hy + 4, 'Sağ', 'fek45-tm', 'middle')}
        ${tx(hx, l.blab, '', 'fek45-t fek45-blab', 'middle')}${tx(hx, l.slab, 'İki hemisferde simetrik', 'fek45-tm fek45-slab', 'middle')}
        ${seritZemin(l.S)}<g class="fek45-sg"></g>
        ${tx(l.S.x + l.S.w - 8, l.S.y - l.S.h / 2 + 18, '', 'fek45-t fek45-not', 'end')}
        ${kus.map(([k, a, b]) => `<rect class="fek45-kus" data-ku="${k}" x="${hzX(a)}" y="${c.y}" width="${hzX(b) - hzX(a)}" height="22"/>${tx((hzX(a) + hzX(b)) / 2, c.y + 16, B[k].ad, 'fek45-t fek45-kus-t', 'middle')}`).join('')}
        ${[0, 4, 8, 13, 30].map((f) => `<line class="fek45-tik" x1="${hzX(f)}" x2="${hzX(f)}" y1="${c.y}" y2="${c.y + 28}"/>${tx(hzX(f), c.y + 41, f, 'fek45-tk', f === 0 ? 'start' : f === 30 ? 'end' : 'middle')}`).join('')}
        ${tx(c.x + c.w / 2 + (dar ? 40 : 60), c.y + 41, 'Hz', 'fek45-tk', 'middle')}
        <path class="fek45-ucgen" d="M0 0 L-6 -10 L6 -10 Z"/>
      </svg>`;
      S = serit(kutu.querySelector('.fek45-sg'), l.S);
      uygula(true);
    };
    const uygula = (aninda) => {
      const svg = kutu.querySelector('svg'), b = B[bant], l = L();
      const acikA = bant === 'a' && goz === 'acik';
      svg.querySelectorAll('[data-bo]').forEach((r) => r.classList.toggle('on', r.dataset.bo === b.bolge));
      svg.querySelectorAll('[data-ku]').forEach((r) => r.classList.toggle('on', r.dataset.ku === bant));
      svg.querySelector('.fek45-blab').textContent = b.bol;
      svg.querySelector('.fek45-slab').style.display = b.sim ? '' : 'none';
      const fr = acikA ? 20 : b.fr;
      const u = svg.querySelector('.fek45-ucgen');
      u.setAttribute('transform', `translate(${l.cet.x + (fr / 30) * l.cet.w} ${l.cet.y - 2})`);
      u.classList.toggle('fek45-soluk', acikA);
      svg.querySelector('.fek45-not').textContent = bant === 'b' && goz === 'acik' ? 'β göz kapamadan etkilenmez' : acikA ? 'α bozuldu' : bant === 'b' ? 'β göz kapamadan etkilenmez' : '';
      el.querySelector('[data-goz-grp]').style.display = bant === 'a' || bant === 'b' ? '' : 'none';
      el.querySelector('[data-o=f]').textContent = b.hz;
      el.querySelector('[data-o=g]').textContent = acikA ? 'α bozuldu' : b.gen;
      el.querySelector('[data-o=b]').textContent = b.bol;
      el.querySelector('[data-o=n]').textContent = acikA ? 'Etkinlik ya da zihinsel uyarı α\'yı bozar' : b.ne;
      S.set(acikA ? aAcik : b.sig, aninda);
      capYaz(el, acikA ? 'Gözler açıldı ya da zihinsel etkinlik başladı: α ritmi bozulur, yerini düzensiz, küçük dalgalar alır. [[K2 s. 64]]' : b.cap);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-bant]'), g = e.target.closest('[data-goz]');
      if (b) { bant = b.dataset.bant; basSec(el, 'bant', bant); uygula(false); }
      if (g) { goz = g.dataset.goz; basSec(el, 'goz', goz); uygula(false); }
    });
    const durD = darIzle(el, (d) => { dar = d; el.classList.toggle('fek45-darw', d); ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => { S.ilerle(dt); S.ciz(); });
    return () => { durT(); durD(); };
  };

  /* =====================================================================
     3 · fek45_iskemi — kritik CBF ve iskemide EEG (K2 s. 64, K1 s. 196)
     ===================================================================== */
  VIZ.fek45_iskemi = (el) => {
    const ES = { uyanik: 19, izo: 10, halo: 18 };
    const SIG = {
      uyanik: topla(dalga({ f: 20, a: 20, seed: 31 }), dalga({ f: 10, a: 15, ritmik: true, g: 0, seed: 32 })),
      anest: dalga({ f: 3, a: 60, seed: 33 }),
      A: dalga({ f: 2, a: 120, ritmik: true, seed: 34 }),
      B: dalga({ f: 1.5, a: 25, seed: 35 }),
      C: dalga({ f: 30, a: 0, g: 1.6, seed: 36 }),
    };
    let cbf = 54, an = 'uyanik', m = 0, dar = false, S = null, capK = '', haloKez = false, sigK = '';
    el.innerHTML = `<div class="fek45-ctl">
        <label class="fek45-rng"><span>Serebral kan akımı (CBF) <b data-o="cbfv"></b></span>
          <input type="range" min="0" max="60" step="1" value="54" aria-label="Serebral kan akımı" data-k="cbf"></label>
        <div class="fek45-grp"><span class="fek45-gl">Durum</span>${segHtml('Anestezi durumu', 'an', [['uyanik', 'Uyanık'], ['izo', 'İzofluran'], ['halo', 'Halotan']], an)}</div>
        <div class="btn-row"><button type="button" class="btn" data-a="surdur">İskemiyi sürdür</button><button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div>
      </div><div class="fek45-kutu"></div>
      <dl class="fek45-oku fek45-oku4"><div><dt>CBF</dt><dd data-o="cbf"></dd></div><div><dt>Kritik eşik</dt><dd data-o="es"></dd></div><div><dt>Durum</dt><dd data-o="du"></dd></div>
        <div><dt>Eşik altında</dt><dd><span data-o="sure"></span><span class="fek45-bar"><i data-o="bar"></i></span><em class="fek45-rozet" data-o="roz">iskemik EEG değişikliği</em></dd></div></dl>`;
    const kutu = el.querySelector('.fek45-kutu'), rng = el.querySelector('[data-k=cbf]'), sur = el.querySelector('[data-a=surdur]');
    const L = () => dar
      ? { vb: '0 0 360 300', ax: 20, aw: 320, ay: 72, S: { x: 20, y: 212, w: 320, h: 140, k: 0.5, pen: 2, adim: 1 } }
      : { vb: '0 0 760 290', ax: 40, aw: 680, ay: 62, S: { x: 40, y: 196, w: 680, h: 160, k: 0.6, pen: 2 } };
    const ciz = () => {
      const l = L(), X = (v) => l.ax + (v / 60) * l.aw, y = l.ay, hb = uid('tar');
      const et = dar
        ? [['uyanik', 19, '18–20', 'uyanık', -1], ['izo', 10, '10', 'izo.', 1], ['halo', 18, '18', 'halo.', 1]]
        : [['uyanik', 19, '18–20 · uyanık', '', -1], ['izo', 10, '10 · izofluran', '', 1], ['halo', 18, '18 · halotan', '', 1]];
      const etH = et.map(([k, v, a, b, yon]) => {
        const anc = dar ? 'middle' : k === 'izo' ? 'end' : k === 'halo' ? 'start' : 'middle';
        const xx = dar ? X(v) : X(v) + (k === 'izo' ? 4 : k === 'halo' ? -4 : 0);
        const y1 = yon < 0 ? y - (dar ? 34 : 24) : y + (dar ? 32 : 36);
        return `<g class="fek45-esg" data-es="${k}"><line class="fek45-es" x1="${X(v)}" x2="${X(v)}" y1="${y - 16}" y2="${y + 16}"/>
          ${tx(xx, y1, a, 'fek45-tm fek45-es-t', anc)}${b ? tx(xx, y1 + 14, b, 'fek45-tm fek45-es-t', anc) : ''}</g>`;
      }).join('');
      kutu.innerHTML = `<svg class="fek45-svg${dar ? ' fek45-dar' : ''}" viewBox="${l.vb}" role="img" aria-label="CBF ekseni üzerinde normal değer, kritik eşikler ve seçili akım; altında kayan EEG şeridi">
        <defs><pattern id="${hb}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V6" class="fek45-tar"/></pattern></defs>
        ${tx(l.ax, dar ? 14 : 16, 'CBF (mL/100 g/dk)', 'fek45-tm')}
        <rect class="fek45-altdolgu" x="${l.ax}" y="${y - 5}" width="0" height="10"/>
        <line class="fek45-eksen" x1="${l.ax}" x2="${l.ax + l.aw}" y1="${y}" y2="${y}"/>
        <rect x="${X(18)}" y="${y - 12}" width="${X(20) - X(18)}" height="24" fill="url(#${hb})"/>
        ${(dar ? [0, 60] : [0, 10, 20, 30, 40, 50, 60]).map((v) => `<line class="fek45-tik" x1="${X(v)}" x2="${X(v)}" y1="${y - 4}" y2="${y + 4}"/>${dar ? tx(X(v), y + 18, v, 'fek45-tk', v ? 'end' : 'start') : tx(X(v), y + 18, v, 'fek45-tk', 'middle')}`).join('')}
        <line class="fek45-nor" x1="${X(54)}" x2="${X(54)}" y1="${y - 16}" y2="${y + 16}"/>
        ${dar ? tx(X(54), y - 34, '54', 'fek45-tm fek45-c-ok', 'middle') + tx(X(54), y - 20, 'normal', 'fek45-tm fek45-c-ok', 'middle') : tx(X(54), y - 24, '54 · normal', 'fek45-tm fek45-c-ok', 'middle')}
        ${etH}
        <path class="fek45-imlec" d="M0 0 L-7 -12 L7 -12 Z"/>
        ${seritZemin(l.S)}<g class="fek45-sg"></g>
        ${tx(l.S.x + 12, l.S.y - l.S.h / 2 + 20, '', 'fek45-t fek45-evre')}
      </svg>`;
      S = serit(kutu.querySelector('.fek45-sg'), l.S);
      sigK = ''; uygula(true);
    };
    const evre = () => (cbf >= ES[an] ? 'ust' : m < 3 ? 'bek' : m < 6 ? 'A' : m < 9 ? 'B' : 'C');
    const uygula = (aninda) => {
      const svg = kutu.querySelector('svg'), l = L(), X = (v) => l.ax + (v / 60) * l.aw, es = ES[an], e = evre();
      if (e === 'ust') m = 0;
      svg.querySelectorAll('[data-es]').forEach((g) => g.classList.toggle('on', g.dataset.es === an));
      svg.querySelector('.fek45-altdolgu').setAttribute('width', X(es) - l.ax);
      svg.querySelector('.fek45-imlec').setAttribute('transform', `translate(${X(cbf)} ${l.ay - 6})`);
      const sk = e === 'ust' || e === 'bek' ? (an === 'uyanik' ? 'uyanik' : 'anest') : e;
      if (sk !== sigK) { sigK = sk; S.set(SIG[sk], aninda); }
      const DU = { ust: 'Eşik üstü: EEG korunur', bek: 'Kritik CBF\'nin altı: değişiklik 3 dakika içinde başlar', A: 'α ve β kayboldu → yüksek voltajlı δ', B: 'Uzamış iskemi: düşük voltajlı yavaş dalga', C: 'İzoelektrik EEG' };
      const ev = svg.querySelector('.fek45-evre');
      ev.textContent = e === 'ust' ? (an === 'uyanik' ? 'Normal EEG' : 'Normal anestezi trasesi (yavaş)') : DU[e];
      ev.classList.toggle('fek45-c-cr', e !== 'ust');
      el.querySelector('[data-o=cbfv]').textContent = `${cbf} mL/100 g/dk`;
      rng.setAttribute('aria-valuetext', `${cbf} mL/100 g/dk`);
      el.querySelector('[data-o=cbf]').textContent = `${cbf} mL/100 g/dk`;
      el.querySelector('[data-o=es]').textContent = `${an === 'uyanik' ? '18–20 (modelde 19)' : es} mL/100 g/dk`;
      el.querySelector('[data-o=du]').textContent = DU[e];
      el.querySelector('[data-o=sure]').textContent = e === 'ust' ? '0 dk' : `${fmt(Math.min(m, 9.9), 1)} dk`;
      el.querySelector('[data-o=bar]').style.width = (clamp(m / 3, 0, 1) * 100) + '%';
      el.querySelector('[data-o=roz]').style.visibility = m >= 3 ? 'visible' : 'hidden';
      sur.disabled = e === 'ust' || e === 'C';
      let k = e, h;
      if (e === 'ust') k = an === 'izo' && cbf < 19 ? 'izo' : 'ust';
      if (haloKez) { k = 'halo'; }
      if (k !== capK) {
        capK = k;
        h = {
          ust: 'CBF kritik eşiğin üstünde: EEG korunur. Normal CBF 54, uyanıkta kritik CBF 18–20 mL/100 g/dk. [[K2 s. 64]]',
          izo: 'İzofluranda kritik eşik 10 mL/100 g/dk\'ya iner: aynı akım uyanık beyinde iskemik olurdu, burada EEG korunur. [[K2 s. 64]]',
          bek: 'Kritik CBF\'nin altındasınız: iskemik EEG değişiklikleri üç dakika içinde başlar. [[K2 s. 64]]',
          A: 'İlk değişiklik: hızlı α ve β dalgaları kaybolur, yerlerini yüksek voltajlı yavaş δ dalgaları alır. [[K2 s. 64]]',
          B: 'İskemi uzadı: yavaş dalgaların voltajı düşüyor. [[K2 s. 64]]',
          C: 'EEG izoelektrik. [[K2 s. 64]]',
          halo: 'Halotanda kritik eşik 18 mL/100 g/dk, izofluranda 10: izofluran altında beyin daha düşük akıma EEG değişikliği olmadan dayanır. [[K2 s. 64]]',
        }[k];
        capYaz(el, h);
      }
    };
    rng.addEventListener('input', () => { cbf = +rng.value; haloKez = false; uygula(false); });
    let haloGoruldu = false;
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-an]');
      if (b) {
        an = b.dataset.an; basSec(el, 'an', an); m = 0; sigK = sigK || '';
        haloKez = an === 'halo' && !haloGoruldu; if (haloKez) haloGoruldu = true;
        uygula(false);
      }
      if (e.target.closest('[data-a=surdur]')) { haloKez = false; m = Math.min(9, (Math.floor(m / 3) + 1) * 3); uygula(false); }
      if (e.target.closest('[data-a=sifir]')) { haloKez = false; cbf = 54; rng.value = 54; m = 0; uygula(false); }
    });
    const durD = darIzle(el, (d) => { dar = d; el.classList.toggle('fek45-darw', d); ciz(); });
    const durT = RM ? () => {} : ticker(el, (dt) => {
      S.ilerle(dt);
      if (cbf < ES[an] && m < 9) { const e0 = evre(); m = Math.min(9, m + dt * 0.5); if (evre() !== e0) haloKez = false; uygula(false); }
      S.ciz();
    });
    return () => { durT(); durD(); };
  };

  /* =====================================================================
     4 · fek45_ortalama — ortalama aldıkça uyarılmış potansiyel belirir (K2 s. 64–65, K1 s. 196)
     ===================================================================== */
  VIZ.fek45_ortalama = (el) => {
    const NL = [1, 4, 16, 64, 256, 1024];
    const GUR = ['15', '7,5', '3,75', '1,9', '0,94', '0,47'];
    const NS_ = 220, TA = -0.03, TB = 1;
    const tau = (j) => TA + (j / (NS_ - 1)) * (TB - TA);
    const gs = (t, c, w, a) => a * Math.exp(-((t - c) * (t - c)) / (2 * w * w));
    const YOL = {
      vep: { ad: 'Görsel (VEP)', kis: 'VEP', akt: 'Oksipital korteks', ref: 'Verteks', uy: 'Işık / desen',
        tep: [['N1', 0.24, 0.035, -1.2], ['P1', 0.37, 0.045, 3], ['N2', 0.53, 0.06, -2]], olc: ['P1', 'N2'],
        cap: 'Görsel uyarılmış potansiyel: aktif elektrot oksipital kortekste, referans verteksde. İlk büyük pozitif dalga P1 görsel yollardaki iletimi ölçer. [[K2 s. 65]]' },
      baep: { ad: 'Beyin sapı işitsel (BAEP)', kis: 'BAEP', akt: 'Verteks', ref: 'Mastoid', uy: 'Ses (klik)',
        tep: [['I', 0.16, 0.014, 1.2], ['II', 0.26, 0.014, 0.9], ['III', 0.37, 0.016, 1.5], ['IV', 0.51, 0.013, 1.6], ['V', 0.58, 0.017, 3], ['', 0.68, 0.03, -1]], olc: ['V', ''],
        cap: 'Beyin sapı işitsel uyarılmış potansiyeli: aktif verteks, referans mastoid. I işitme siniri, II işitsel çekirdek, III pontin yol, IV–V mezensefalon. [[K2 s. 65]]' },
      ssep: { ad: 'Somatosensoriyel (SSEP)', kis: 'SSEP', akt: 'Parietal alan', ref: 'Verteks', uy: 'Periferik sinir',
        tep: [['', 0.28, 0.045, -3], ['', 0.46, 0.06, 3]], olc: null,
        cap: 'Somatosensoriyel uyarılmış potansiyel: periferik sinir uyarılır, aktif elektrot parietal alanda, referans verteksde. Omurga cerrahisinde genlik kaybı ya da latans uzaması nörolojik hasarı düşündürür. [[K2 s. 65]] [[K1 s. 196]]' },
    };
    const KAYN = [['I', 'işitme siniri'], ['II', 'işitsel çekirdek'], ['III', 'pontin yol'], ['IV–V', 'mezensefalon']];
    /* gürültü: her kayıt 6 sinüsün toplamı (RMS 15 μV); ortalamalar gerçekten toplanarak hesaplanır */
    const kayit = (i) => {
      const r = rnd(7000 + i), b = [];
      for (let k = 0; k < 6; k++) b.push([3 + r() * 14, r() * TAU]);
      const a = 15 / Math.sqrt(3), out = new Float32Array(NS_);
      for (let j = 0; j < NS_; j++) { let v = 0; const t = tau(j); for (const [f, p] of b) v += Math.sin(TAU * f * t + p); out[j] = v * a; }
      return out;
    };
    const ORT = (() => {
      const top = new Float64Array(NS_), res = {};
      for (let i = 0; i < 1024; i++) { const k = kayit(i); for (let j = 0; j < NS_; j++) top[j] += k[j]; if (NL.includes(i + 1)) res[i + 1] = Float32Array.from(top, (v) => v / (i + 1)); }
      return res;
    })();
    let yol = 'vep', ni = 0, dar = false, zam = [];
    el.innerHTML = `<div class="fek45-ctl">
        <div class="fek45-grp fek45-tam"><span class="fek45-gl">Yol</span>${segHtml('Uyarılmış potansiyel tipi', 'yol', Object.entries(YOL).map(([k, y]) => [k, `<span class="fek45-uz">${y.ad}</span><span class="fek45-kz">${y.kis}</span>`]), yol, 'fek45-seg3')}</div>
        <label class="fek45-rng"><span>Ortalanan uyarı sayısı <b data-o="nv"></b></span>
          <input type="range" min="0" max="5" step="1" value="0" aria-label="Ortalanan uyarı sayısı" data-k="n"></label>
        <div class="btn-row"><button type="button" class="btn" data-a="uyar">Uyar ve ortala</button><button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div>
      </div><div class="fek45-kutu"></div>
      <dl class="fek45-oku fek45-oku4"><div><dt>Ortalanan uyarı</dt><dd data-o="n"></dd></div><div><dt>Gürültü (RMS)</dt><dd data-o="g"></dd></div><div><dt>Sinyal</dt><dd>≈ 3 μV</dd></div><div><dt>Sinyal/gürültü</dt><dd data-o="sg"></dd></div>
        <div><dt>Aktif elektrot</dt><dd data-o="ak"></dd></div><div><dt>Referans</dt><dd data-o="rf"></dd></div><div class="fek45-kayn" data-o="kayn"><dt>BAEP dalgalarının kaynağı</dt><dd>${KAYN.map(([a, b]) => `<span><b>${a}</b> ${b}</span>`).join('')}</dd></div></dl>`;
    const kutu = el.querySelector('.fek45-kutu'), rng = el.querySelector('[data-k=n]');
    const L = () => dar
      ? { vb: '0 0 360 548', hg: 'translate(52 -14) scale(0.72)', P1: { x: 16, y: 250, w: 328, h: 118 }, P2: { x: 16, y: 384, w: 328, h: 156 }, x0: 30, xw: 300, k: 6.5 }
      : { vb: '0 0 760 360', hg: 'translate(26 0)', P1: { x: 260, y: 30, w: 480, h: 140 }, P2: { x: 260, y: 186, w: 480, h: 166 }, x0: 272, xw: 450, k: 8 };
    const xT = (l, t) => l.x0 + ((t - 0) / TB) * l.xw;
    const bas = () => `<path class="fek45-bas" d="M62 100 C70 60 120 38 160 48 C200 58 218 100 212 140 C208 165 196 180 182 192 L178 236 L128 236 L126 210 C110 212 92 208 84 198 L80 186 L71 182 L73 172 L64 166 L68 158 L50 150 L60 128 C58 118 58 110 62 100 Z"/>
      <path class="fek45-bas-c" d="M72 122 q8 -6 16 0 q-8 6 -16 0"/><ellipse class="fek45-bas-c" cx="152" cy="140" rx="8" ry="13"/>`;
    const ciz = () => {
      const l = L(), y = YOL[yol], c1 = uid('k1'), c2 = uid('k2'), ok = uid('ok');
      const el1 = { vep: [210, 128], baep: [140, 42], ssep: [190, 70] }[yol], er = { vep: [140, 42], baep: [168, 166], ssep: [140, 42] }[yol];
      let uyar = '';
      if (yol === 'vep') uyar = `<path class="fek45-uyok" d="M-4 84 L66 122" marker-end="url(#${ok})"/>${tx(-24, 72, 'Işık / desen', 'fek45-ht fek45-halo')}`;
      if (yol === 'baep') uyar = `<path class="fek45-uyok" d="M228 98 L163 132" marker-end="url(#${ok})"/>${tx(232, 90, 'Ses (klik)', 'fek45-ht fek45-halo', 'end')}
        <path class="fek45-bsap" d="M140 104 C138 140 142 180 150 214"/>
        ${dar ? '' : [[150, 206, 'I işitme siniri'], [146, 184, 'II işitsel çekirdek'], [142, 160, 'III pons'], [140, 132, 'IV–V mezensefalon']].map(([px, py, s]) => `<circle class="fek45-kay" cx="${px}" cy="${py}" r="3.5"/>${tx(px - 7, py + 4, s, 'fek45-ht fek45-halo', 'end')}`).join('')}`;
      if (yol === 'ssep') uyar = `<path class="fek45-kol" d="M128 236 C110 262 96 290 70 318 L58 330"/><path class="fek45-sinir" d="M60 326 C92 292 112 262 140 226 C160 190 176 120 190 70"/>
        <path class="fek45-simsek" d="M46 314 l10 8 -7 3 10 9"/>${tx(dar ? 74 : 70, dar ? 352 : 350, 'Periferik sinir', 'fek45-ht', 'start')}`;
      const elek = `<circle class="fek45-akt" cx="${el1[0]}" cy="${el1[1]}" r="7"/><circle class="fek45-ref" cx="${er[0]}" cy="${er[1]}" r="7"/>
        ${yol === 'vep' ? tx(el1[0], el1[1] + 26, 'aktif', 'fek45-ht fek45-c-cl fek45-halo', 'middle') : tx(el1[0] - 12, el1[1] - 6, 'aktif', 'fek45-ht fek45-c-cl fek45-halo', 'end')}
        ${tx(er[0] + (yol === 'baep' ? 12 : -12), er[1] + (yol === 'baep' ? 20 : -8), 'ref.', 'fek45-ht fek45-halo', yol === 'baep' ? 'start' : 'end')}`;
      const P1 = l.P1, P2 = l.P2, xs = xT(l, 0);
      kutu.innerHTML = `<svg class="fek45-svg${dar ? ' fek45-dar' : ''}" viewBox="${l.vb}" role="img" aria-label="Baş şemasında uyaran ve elektrotlar; tek tek kayıtlar ve uyarıya kilitli ortalama iz">
        <defs>${okUc(ok, 'fek45-uc-i')}${okUc(ok + 'm', 'fek45-uc-i')}<clipPath id="${c1}"><rect x="${P1.x}" y="${P1.y}" width="${P1.w}" height="${P1.h}"/></clipPath><clipPath id="${c2}"><rect x="${P2.x}" y="${P2.y}" width="${P2.w}" height="${P2.h}"/></clipPath></defs>
        <g class="fek45-hd" transform="${l.hg}">${bas()}${uyar}${elek}</g>
        <rect class="fek45-zemin" x="${P1.x}" y="${P1.y}" width="${P1.w}" height="${P1.h}" rx="8"/>
        <rect class="fek45-zemin" x="${P2.x}" y="${P2.y}" width="${P2.w}" height="${P2.h}" rx="8"/>
        <line class="fek45-uyc" x1="${xs}" x2="${xs}" y1="${P1.y + 4}" y2="${P2.y + P2.h - 4}"/>
        <line class="fek45-orta" x1="${P1.x + 4}" x2="${P1.x + P1.w - 4}" y1="${P1.y + P1.h / 2}" y2="${P1.y + P1.h / 2}"/>
        <line class="fek45-orta" x1="${P2.x + 4}" x2="${P2.x + P2.w - 4}" y1="${P2.y + P2.h / 2 + 8}" y2="${P2.y + P2.h / 2 + 8}"/>
        <g clip-path="url(#${c1})" class="fek45-tekler"></g>
        <g clip-path="url(#${c2})"><path class="fek45-ep"/></g>
        ${tx(xs + 5, P1.y + 15, 'Uyarı', 'fek45-tm fek45-halo fek45-ink')}
        ${tx(P1.x + P1.w - 8, P1.y + 15, 'Tek kayıtlar (son 5)', 'fek45-tm fek45-halo fek45-ink', 'end')}
        ${tx(P2.x + P2.w - 8, P2.y + 16, '', 'fek45-t fek45-c-cl fek45-ortlab fek45-halo', 'end')}
        ${tx(xs + 5, P2.y + 16, '+ yukarı', 'fek45-tm fek45-halo')}
        <g class="fek45-etk"></g>
        <path class="fek45-olcek" d="M${P2.x + P2.w - 12} ${P2.y + P2.h - 10 - 5 * l.k} V${P2.y + P2.h - 10}"/>${tx(P2.x + P2.w - 17, P2.y + P2.h - 12, '5 μV', 'fek45-tk', 'end')}
      </svg>`;
      uygula();
    };
    const sablon = (t) => YOL[yol].tep.reduce((s, [, c, w, a]) => s + gs(t, c, w, a), 0);
    const yolD = (l, arr, y0, ekle) => { let d = ''; for (let j = 0; j < NS_; j++) { const t = tau(j); d += (j ? 'L' : 'M') + xT(l, t).toFixed(1) + ' ' + (y0 - ((ekle ? sablon(t) : 0) + arr[j]) * l.k).toFixed(1); } return d; };
    const uygula = () => {
      const svg = kutu.querySelector('svg'), l = L(), N = NL[ni], y = YOL[yol];
      const y1 = l.P1.y + l.P1.h / 2, y2 = l.P2.y + l.P2.h / 2 + 8;
      const g1 = svg.querySelector('.fek45-tekler');
      const son = []; for (let i = Math.max(0, N - 5); i < N; i++) son.push(i);
      g1.innerHTML = son.map((i, n) => `<path class="fek45-tek${n === son.length - 1 ? ' fek45-tek-son' : ''}" d="${yolD(l, kayit(i), y1, true)}"/>`).join('');
      svg.querySelector('.fek45-ep').setAttribute('d', yolD(l, ORT[N], y2, true));
      svg.querySelector('.fek45-ortlab').textContent = `Ortalama (${N} kayıt)`;
      let et = '';
      if (N >= 64) {
        const yer = (c, a) => [xT(l, c), y2 - a * l.k];
        y.tep.forEach(([ad, c, , a]) => { if (!ad) return; const [px, py] = yer(c, a); et += tx(px, a > 0 ? py - 8 : py + 17, ad, 'fek45-t fek45-c-cl fek45-halo', 'middle'); });
        if (yol === 'ssep') { const [px, py] = yer(0.46, 3); et += tx(px, py - 14, 'kortikal yanıt', 'fek45-tm fek45-halo fek45-ink', 'middle'); }
        if (y.olc) {
          const pk = y.tep.find((p) => p[0] === y.olc[0]), cu = y.tep.find((p) => p[0] === y.olc[1] && p[3] < 0);
          const [px, py] = yer(pk[1], pk[3]), [cx, cy] = yer(cu[1], cu[3]);
          const ly = l.P2.y + 34, xs = xT(l, 0), ax = cx + 14, ok = svg.querySelector('marker').id;
          et += `<line class="fek45-olc-k" x1="${px}" x2="${px}" y1="${ly}" y2="${py - 2}"/>
            <path class="fek45-olc" d="M${xs + 3} ${ly} H${px - 3}" marker-start="url(#${ok})" marker-end="url(#${ok})"/>${tx((xs + px) / 2 + 26, ly - 5, 'Latans', 'fek45-tm fek45-halo', 'middle')}${yol === 'vep' && !dar ? tx((xs + px) / 2 + 26, ly + 16, '(P1: görsel yollardaki iletim)', 'fek45-tm fek45-halo', 'middle') : ''}
            <line class="fek45-olc-k" x1="${px + 4}" x2="${ax + 4}" y1="${py}" y2="${py}"/><line class="fek45-olc-k" x1="${cx}" x2="${ax + 4}" y1="${cy}" y2="${cy}"/>
            <path class="fek45-olc" d="M${ax} ${py + 3} V${cy - 3}" marker-start="url(#${ok})" marker-end="url(#${ok})"/>${tx(ax + 8, cy + 16, dar ? 'Genlik' : 'Genlik (tepe–çukur)', 'fek45-tm fek45-halo')}`;
        }
        if (yol === 'baep' && !dar) {
          [['I', 0.16], ['II', 0.26], ['III', 0.37], ['IV–V', 0.545]].forEach(([, c], i) => { et += tx(xT(l, c), y2 + 34 + (i % 2) * 14, KAYN[i][1], 'fek45-tk', 'middle'); });
        }
      }
      svg.querySelector('.fek45-etk').innerHTML = et;
      el.querySelector('[data-o=nv]').textContent = N;
      rng.setAttribute('aria-valuetext', `${N} uyarı`);
      el.querySelector('[data-o=n]').textContent = N;
      el.querySelector('[data-o=g]').textContent = `≈ ${GUR[ni]} μV`;
      el.querySelector('[data-o=sg]').textContent = `≈ ${fmt(3 / (15 / Math.sqrt(N)), 1)}`;
      el.querySelector('[data-o=ak]').textContent = y.akt;
      el.querySelector('[data-o=rf]').textContent = y.ref;
      el.querySelector('[data-o=kayn]').style.display = yol === 'baep' ? '' : 'none';
      const h = N === 1 ? 'Tek kayıtta uyarılmış potansiyel (1–5 μV) arka plan EEG\'sinin (10–20 μV) içinde kaybolur. [[K2 s. 64]]'
        : N < 64 ? 'Kayıtlar uyarı anına göre hizalanıp ortalanıyor: uyarıya bağlı olmayan EEG birbirini götürmeye başlar. [[K2 s. 64]]'
          : 'Geriye uyarıya özgü sinyal kaldı. Dalgalar latans (uyarıdan çıkışa gecikme) ve genlik (tepe–çukur farkı) ile okunur; P pozitif, N negatif demektir. [[K2 s. 64]] ' + y.cap;
      capYaz(el, h);
    };
    const dur = () => { zam.forEach(clearTimeout); zam = []; };
    const ayarla = (i) => { ni = i; rng.value = i; uygula(); };
    rng.addEventListener('input', () => { dur(); ayarla(+rng.value); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-yol]');
      if (b) { yol = b.dataset.yol; basSec(el, 'yol', yol); ciz(); }
      if (e.target.closest('[data-a=uyar]')) {
        dur();
        if (RM) { ayarla(5); return; }
        const bas0 = ni >= 5 ? 0 : ni;
        ayarla(bas0);
        for (let i = bas0 + 1; i <= 5; i++) zam.push(setTimeout(() => ayarla(i), (i - bas0) * 650));
      }
      if (e.target.closest('[data-a=sifir]')) { dur(); ayarla(0); }
    });
    const durD = darIzle(el, (d) => { dar = d; el.classList.toggle('fek45-darw', d); ciz(); });
    return () => { dur(); durD(); };
  };

  /* =====================================================================
     5 · fek45_uyku — uyanıklık, uyuklama, derin uyku, REM (K2 s. 64–65)
     ===================================================================== */
  VIZ.fek45_uyku = (el) => {
    const DUR = {
      uyanik: { ad: 'Uyanık, dikkatli', kis: 'Uyanık', sig: dalga({ f: 20, a: 20, seed: 51 }), ort: 'Asenkron · düşük voltaj · yüksek frekans', ok: 'kalin', on: ['rf', 'tal', 'kor'], gos: 'normal',
        cap: 'Uyanık ve dikkatli: ARAS talamusu ve korteksi uyarır; EEG düzensiz, hızlı, düşük voltajlıdır. Bilinç düzeyini beyin sapı ve hemisferlerin etkinliği belirler. [[K2 s. 64]]' },
      uyuk: { ad: 'Uyuklama', kis: 'Uyuklama', sig: dalga({ f: 6, a: 60, ritmik: true, seed: 52 }), ort: 'α → yavaş dalgalara kayma başlar', ok: 'orta', on: ['tal'], gos: 'normal',
        cap: 'Talamusun özgül olmayan çekirdekleri inhibitör internöronları uyarınca uyuklama başlar; EEG α\'dan yavaş dalgalara doğru kaymaya başlar. [[K2 s. 65]]' },
      derin: { ad: 'Derin yavaş dalga uykusu', kis: 'Derin', sig: dalga({ f: 2, a: 120, ritmik: true, seed: 53 }), ort: 'Senkron · yüksek voltaj · düşük frekans (δ)', ok: 'ince', on: ['dien', 'pre', 'rafe'], gos: 'azalir',
        cap: 'Derin yavaş dalga uykusu: EEG senkron, yüksek voltajlı, yavaş δ dalgaları. Diensefalik uyku bölgesi bu dalgaları üretir; damar tonusu, kan basıncı, solunum ve metabolizma hızı azalır. [[K2 s. 65]]' },
      rem: { ad: 'REM', kis: 'REM', sig: dalga({ f: 20, a: 20, seed: 54 }), ort: 'Paradoksal: uykuda uyanıklık gibi asenkron', ok: 'yok', on: ['kor'], gos: 'yok',
        cap: 'REM (paradoksal) uyku: kişi uyuyor ama beyin uyanıklığa özgü asenkron etkinlik gösteriyor. [[K2 s. 65]]' },
    };
    const SIRA = ['uyanik', 'uyuk', 'derin', 'rem'];
    const YAPI = {
      rf: ['Retiküler formasyon', 'Pons ve medullada, lif demetleri arasına ağ gibi dağılmış küçük çekirdekler. [[K2 s. 64]]'],
      lc: ['Locus coeruleus', 'Pontin retiküler formasyonda, noradrenalin kullanan nöron grubu. [[K2 s. 64]]'],
      rafe: ['Rafe çekirdekleri', 'Ponsun orta hattında; kitaba göre yavaş dalga uykusu bu orta hat çekirdeklerin inhibisyonuyla başlar (Atlas notuna bakın). [[K2 s. 64–65]]'],
      tal: ['Talamus · özgül olmayan çekirdekler (intralaminar, anterior)', 'Korteksi uyarır; aksonları talamustaki inhibitör internöronları da uyarırsa uyuklama başlar. [[K2 s. 65]]'],
      dien: ['Diensefalik uyku bölgesi', 'Posterior hipotalamus ile çevresindeki intralaminar ve anterior talamik çekirdekler. Senkron, yavaş dalgalar üretir. [[K2 s. 65]]'],
      pre: ['Ön beyin uyku bölgesi (preoptik alan)', 'Uyarılması da uyku yapar. [[K2 s. 65]]'],
      kor: ['Korteks (hemisferler)', 'Bilinç, hemisferlerin ARAS ile etkileşimine bağlıdır; hemisferleri yaygın tutan lezyonlar bilinci bozar. [[K2 s. 64–65]]'],
    };
    const GOS = ['Periferik damar tonusu', 'Kan basıncı', 'Solunum hızı', 'Metabolizma hızı'];
    let dur = 'uyanik', dar = false, S = null, zam = [], secY = null;
    el.innerHTML = `<div class="fek45-ctl">
        <div class="fek45-grp fek45-tam"><span class="fek45-gl">Durum</span>${segHtml('Bilinç durumu', 'dur', SIRA.map((k) => [k, `<span class="fek45-uz">${DUR[k].ad}</span><span class="fek45-kz">${DUR[k].kis}</span>`]), dur, 'fek45-seg22')}</div>
        ${RM ? '' : '<button type="button" class="btn ghost" data-a="gece">Gece boyunca oynat</button>'}
      </div><div class="fek45-kutu"></div>
      <p class="fek45-bilgi" aria-live="polite"></p>`;
    const kutu = el.querySelector('.fek45-kutu'), bilgi = el.querySelector('.fek45-bilgi');
    const bilgiVars = 'Bir yapıya dokunun ya da üzerine gelin: adı ve kısa bilgisi burada görünür.';
    const L = () => dar
      ? { vb: '0 0 360 662', bg: 'translate(-34 0)', S: { x: 20, y: 400, w: 320, h: 120, k: 0.42, pen: 2, adim: 1 }, gy: 506, gx: 20, gw: 320, gd: 34 }
      : { vb: '0 0 760 370', bg: 'translate(0 0)', S: { x: 410, y: 106, w: 330, h: 150, k: 0.55, pen: 2 }, gy: 236, gx: 410, gw: 330, gd: 30 };
    const ciz = () => {
      const l = L(), ok = uid('ok'), ag = uid('ag');
      const k = (uzun, kisa) => (dar ? kisa : uzun);
      const lab = (x, y, s, anc, cls) => tx(x, y, s, `fek45-yt ${cls || ''}`, anc);
      /* sagital kesit (yüz solda) */
      const beyin = `
        <g class="fek45-yapi" data-y="kor" tabindex="0" role="button" aria-label="${YAPI.kor[0]}">
          <path class="fek45-kor" d="M52 200 C42 120 110 50 210 48 C310 46 372 112 366 190 C363 232 338 252 302 252 L278 252 C262 246 250 244 240 244 C206 238 176 238 150 242 C118 248 86 250 68 236 C58 228 53 215 52 200 Z"/>
          ${lab(210, 30, k('Korteks (hemisferler)', 'Korteks'), 'middle')}</g>
        <path class="fek45-cc" d="M132 150 C170 108 262 104 300 148"/>
        <g class="fek45-yapi" data-y="dien" tabindex="0" role="button" aria-label="${YAPI.dien[0]}">
          <ellipse class="fek45-dien" cx="222" cy="190" rx="48" ry="38"/>
          <path class="fek45-lider" d="M262 168 L282 140"/>${lab(285, 128, 'Diensefalik', 'start')}${lab(285, 143, k('uyku bölgesi', 'b.'), 'start')}</g>
        <g class="fek45-yapi" data-y="tal" tabindex="0" role="button" aria-label="${YAPI.tal[0]}">
          <ellipse class="fek45-talam" cx="226" cy="176" rx="30" ry="17"/>${lab(226, 181, 'Talamus', 'middle', 'fek45-c-b')}</g>
        <ellipse class="fek45-hipo" cx="192" cy="208" rx="20" ry="11"/><path class="fek45-lider" d="M186 219 L162 251"/>${tx(150, 264, 'Hipotalamus', 'fek45-tk', 'middle')}
        <g class="fek45-yapi" data-y="pre" tabindex="0" role="button" aria-label="${YAPI.pre[0]}">
          <circle class="fek45-pre" cx="163" cy="206" r="9"/>
          ${dar ? lab(150, 210, 'Preoptik', 'end') : lab(150, 198, 'Ön beyin uyku b.', 'end') + lab(150, 213, '(preoptik alan)', 'end')}</g>
        <rect class="fek45-bsap2" x="234" y="214" width="34" height="32" rx="8"/>
        <ellipse class="fek45-bsap2" cx="258" cy="266" rx="27" ry="23"/>
        <rect class="fek45-bsap2" x="246" y="286" width="24" height="50" rx="10"/>
        ${tx(272, 226, 'Mezensefalon', 'fek45-tk')}${tx(228, 270, 'Pons', 'fek45-tk', 'end')}${tx(240, 322, 'Medulla', 'fek45-tk', 'end')}
        <g class="fek45-yapi" data-y="rf" tabindex="0" role="button" aria-label="${YAPI.rf[0]}">
          <rect x="236" y="246" width="46" height="88" fill="url(#${ag})" class="fek45-rfag" rx="8"/>
          <path class="fek45-lider" d="M282 312 L300 316"/>${dar ? lab(303, 320, 'RF', 'start', 'fek45-c-w') : lab(303, 314, 'Retiküler', 'start', 'fek45-c-w') + lab(303, 329, 'formasyon', 'start', 'fek45-c-w')}</g>
        <g class="fek45-yapi" data-y="lc" tabindex="0" role="button" aria-label="${YAPI.lc[0]}">
          <circle class="fek45-lc" cx="274" cy="252" r="5"/><path class="fek45-lider" d="M279 253 L300 254"/>${dar ? lab(303, 258, 'LC', 'start') : lab(303, 254, 'Locus', 'start') + lab(303, 268, 'coeruleus', 'start')}</g>
        <g class="fek45-yapi" data-y="rafe" tabindex="0" role="button" aria-label="${YAPI.rafe[0]}">
          ${[252, 261, 270, 279].map((yy) => `<circle class="fek45-rafe" cx="256" cy="${yy}" r="3"/>`).join('')}<path class="fek45-lider" d="M260 282 L300 290"/>${lab(303, 294, 'Rafe', 'start')}</g>
        <path class="fek45-aras" d="M248 236 C250 220 240 206 236 196" marker-end="url(#${ok})"/>
        ${dar ? '' : tx(282, 168, 'ARAS:', 'fek45-tk fek45-arasl') + tx(282, 181, 'uyarır /', 'fek45-tk fek45-arasl') + tx(282, 194, 'baskılar', 'fek45-tk fek45-arasl')}
        <g class="fek45-ritim">${[[150, 84], [222, 62], [304, 98]].map(([x2, y2]) => `<path d="M226 160 L${x2} ${y2}" marker-end="url(#${ok}r)"/>`).join('')}</g>
        ${tx(dar ? 120 : 112, 112, 'talamik ritim', 'fek45-tk fek45-arasl', 'middle')}`;
      const S0 = l.S;
      let gos = '';
      GOS.forEach((g, i) => {
        const y = l.gy + i * l.gd;
        gos += `${tx(l.gx, y, g, 'fek45-tm fek45-gad')}${tx(l.gx + l.gw, y, '', 'fek45-tm fek45-gdu', 'end', ` data-g="${i}"`)}
          <rect class="fek45-gtr" x="${l.gx}" y="${y + 5}" width="${l.gw}" height="9" rx="4.5"/><rect class="fek45-gfl" data-gf="${i}" x="${l.gx}" y="${y + 5}" width="0" height="9" rx="4.5"/>`;
      });
      kutu.innerHTML = `<svg class="fek45-svg${dar ? ' fek45-dar' : ''}" viewBox="${l.vb}" role="img" aria-label="Beynin orta hat sagital kesiti: korteks, talamus, hipotalamus, preoptik alan, beyin sapı ve retiküler formasyon; EEG şeridi ve dolaşım-solunum göstergeleri">
        <defs>${okUc(ok, 'fek45-uc-w')}${okUc(ok + 'r', 'fek45-uc-b')}
          <pattern id="${ag}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" class="fek45-agn"/><circle cx="6.5" cy="6.5" r="1.3" class="fek45-agn"/><path d="M2 2 L6.5 6.5" class="fek45-agc"/></pattern></defs>
        <g transform="${l.bg}">${beyin}</g>
        ${tx(S0.x, S0.y - S0.h / 2 - 8, 'EEG', 'fek45-t')}
        ${seritZemin(S0)}<g class="fek45-sg"></g>
        ${tx(S0.x + S0.w / 2, S0.y + S0.h / 2 + 20, '', 'fek45-t fek45-ort', 'middle')}
        ${gos}${tx(l.gx + l.gw / 2, l.gy + 4 * l.gd + 6, 'kitap bu durum için bilgi vermez', 'fek45-tm fek45-remnot', 'middle')}
      </svg>`;
      S = serit(kutu.querySelector('.fek45-sg'), S0);
      uygula(true);
    };
    const uygula = (aninda) => {
      const svg = kutu.querySelector('svg'), d = DUR[dur], l = L();
      svg.querySelectorAll('.fek45-yapi').forEach((g) => { g.classList.toggle('on', d.on.includes(g.dataset.y)); g.classList.toggle('sec', g.dataset.y === secY); });
      svg.setAttribute('data-ok', d.ok);
      svg.querySelector('.fek45-ort').textContent = d.ort;
      GOS.forEach((_, i) => {
        const t = svg.querySelector(`[data-g="${i}"]`), f = svg.querySelector(`[data-gf="${i}"]`);
        t.textContent = d.gos === 'normal' ? 'normal' : d.gos === 'azalir' ? 'azalır ↓' : '';
        f.setAttribute('width', d.gos === 'normal' ? l.gw * 0.72 : d.gos === 'azalir' ? l.gw * 0.34 : 0);
        f.setAttribute('class', 'fek45-gfl' + (d.gos === 'azalir' ? ' fek45-azal' : ''));
      });
      svg.classList.toggle('fek45-gos-yok', d.gos === 'yok');
      S.set(d.sig, aninda);
    };
    const secDur = (k, capla = true) => { dur = k; basSec(el, 'dur', k); uygula(false); if (capla) capYaz(el, DUR[k].cap); };
    const goster = (y) => { secY = y; bilgi.innerHTML = y ? `<b>${YAPI[y][0]}.</b> ${REF(YAPI[y][1])}` : bilgiVars; kutu.querySelectorAll('.fek45-yapi').forEach((g) => g.classList.toggle('sec', g.dataset.y === y)); };
    const durdur = () => { zam.forEach(clearTimeout); zam = []; const b = el.querySelector('[data-a=gece]'); if (b) b.textContent = 'Gece boyunca oynat'; };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-dur]');
      if (b) { durdur(); secDur(b.dataset.dur); }
      const y = e.target.closest('.fek45-yapi');
      if (y) goster(y.dataset.y);
      const g = e.target.closest('[data-a=gece]');
      if (g) {
        if (zam.length) { durdur(); return; }
        g.textContent = 'Durdur';
        SIRA.forEach((k, i) => zam.push(setTimeout(() => secDur(k), i * 2500)));
        zam.push(setTimeout(() => { capYaz(el, 'Derin uykuya inerken EEG desenkrondan senkrona, α\'dan δ\'ya kayar; REM bu düzenin dışında kalır. [[K2 s. 65]]'); durdur(); }, 4 * 2500));
      }
    });
    el.addEventListener('mouseover', (e) => { const y = e.target.closest('.fek45-yapi'); if (y && y.dataset.y !== secY) goster(y.dataset.y); });
    el.addEventListener('focusin', (e) => { const y = e.target.closest('.fek45-yapi'); if (y) goster(y.dataset.y); });
    el.addEventListener('keydown', (e) => { const y = e.target.closest('.fek45-yapi'); if (y && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); goster(y.dataset.y); } });
    const durD = darIzle(el, (d) => { dar = d; el.classList.toggle('fek45-darw', d); ciz(); goster(secY); });
    goster(null);
    capYaz(el, DUR[dur].cap);
    const durT = RM ? () => {} : ticker(el, (dt) => { S.ilerle(dt); S.ciz(); });
    return () => { durT(); durD(); durdur(); };
  };
})();
