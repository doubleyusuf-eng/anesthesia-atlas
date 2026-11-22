/* Fizyoloji Bölüm 39 · Lenfatik sistem · bileşenler (tarif: docs/tasarim/fiz39.md; K1 s. 168–169).
   Şemalar ölçekli değildir; kitaptan gelen sayılar yalnız sağ lenfatik kanal ≈ 1,5 cm ve lenf dönüşü ≈ 4 L/gün'dür.
   Risk sıralaması, sıvı miktarları, zaman ekseni ve organ yerleri temsilîdir (viz-foot). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const fr = (x) => x - Math.floor(x);
  const r1 = (v) => Math.round(v * 10) / 10;
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  /* kapsayıcı 560 px'ten darsa dar yerleşim; yalnız eşik geçilince geri çağırır */
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const okDef = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="${cls}"/></marker>`;
  const rng = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const at = (e, a) => { for (const k in a) e.setAttribute(k, a[k]); };
  const yer = (e, x, y) => { e.setAttribute('cx', r1(x)); e.setAttribute('cy', r1(y)); };
  const gor = (e, o) => { e.style.opacity = o <= 0.01 ? 0 : r1(o * 100) / 100; };

  /* çoklu çizgi: uzunluk boyunca konum; s < 0 ya da s > L ise ilk/son parçadan uzatılır; o: dik kaydırma */
  const poly = (pts) => { const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, cum, L: cum[cum.length - 1] }; };
  const polyAt = (P, s, o) => {
    let i = 0;
    if (s >= P.L) i = P.pts.length - 2; else if (s > 0) while (P.cum[i + 1] < s) i++;
    const a = P.pts[i], b = P.pts[i + 1], g = P.cum[i + 1] - P.cum[i], f = (s - P.cum[i]) / g;
    const dx = (b[0] - a[0]) / g, dy = (b[1] - a[1]) / g;
    return [a[0] + (b[0] - a[0]) * f - dy * (o || 0), a[1] + (b[1] - a[1]) * f + dx * (o || 0)];
  };
  const polyD = (pts) => 'M' + pts.map((p) => p.join(' ')).join(' L');

  /* =====================================================================
     1 · f39_drenaj — iki kanal, iki drenaj alanı; primer/sekonder lenfoid organlar (K1 s. 168)
     ===================================================================== */
  VIZ.f39_drenaj = (el) => {
    const SEC = [['tor', 'Torasik kanal'], ['sag', 'Sağ lenfatik kanal'], ['pri', 'Primer lenfoid organlar'], ['sek', 'Sekonder lenfoid organlar']];
    const KART = {
      tor: ['Torasik kanal (sol lenfatik kanal)', [['Boyut', 'Çok daha büyük'], ['Açıldığı yer', 'Sol brakiyosefalik ven'], ['Drenaj', 'Sağ kol, sağ göğüs ve baş-boynun sağı dışında her yer']]],
      sag: ['Sağ lenfatik kanal', [['Uzunluk', '≈ 1,5 cm'], ['Açıldığı yer', 'Sağ subklavyen ven'], ['Drenaj', 'Sağ kol, sağ göğüs, baş-boynun sağ yarısı']]],
      pri: ['Primer lenfoid organlar', [['Organlar', 'Timus, kemik iliği'], ['Görev', 'Progenitör hücrelerden lenfosit üretimi']]],
      sek: ['Sekonder lenfoid organlar', [['Organlar', 'Lenf düğümleri; tonsil, dalak, Peyer plakları ve öteki mukoza ilişkili lenfoid doku (MALT) içindeki foliküller'], ['Görev', 'Olgun lenfositler; yabancı antijen adaptif immün yanıtı burada başlatır (Bölüm 75)']]],
    };
    const CAP = {
      tor: '<b>Torasik kanal.</b> Sağ kol, sağ göğüs ve baş-boynun sağ yarısı dışında bütün vücudun lenfini toplar ve sol brakiyosefalik vene açılır. Bir kanal ya da lenfoid organ seçin. [[K1 s. 168]]',
      sag: '<b>Sağ lenfatik kanal.</b> Yaklaşık 1,5 cm uzunluğunda kısa bir kanaldır; sağ kolun, sağ göğsün ve baş-boynun sağ yarısının lenfini sağ subklavyen vene boşaltır. [[K1 s. 168]]',
      pri: '<b>Primer lenfoid organlar.</b> Timus ve kemik iliği progenitör hücrelerden lenfosit üretir. [[K1 s. 168]]',
      sek: '<b>Sekonder lenfoid organlar.</b> Lenf düğümleri ve tonsil, dalak, Peyer plakları gibi mukoza ilişkili lenfoid dokudaki foliküller olgun lenfositleri barındırır; yabancı antijenler adaptif immün yanıtı burada başlatır (Bölüm 75). [[K1 s. 168]]',
    };
    const GOVDE = 'M132 60 L132 84 L100 90 C 86 94 80 104 78 116 L62 232 L54 252 L70 256 L80 236 L96 140 L104 132 L104 240 L100 262 L104 372 L144 372 L150 286 L156 372 L196 372 L200 262 L196 240 L196 132 L204 140 L220 236 L230 256 L246 252 L238 232 L222 116 C 220 104 214 94 200 90 L168 84 L168 60 Z';
    const sil = `<circle cx="150" cy="36" r="26"/><path d="${GOVDE}"/>`;
    const TK = 'M150 230 C 142 200, 140 172, 148 152 C 156 136, 162 124, 166 108 C 170 90, 182 86, 173 99';
    const SK = 'M121 109 L127 101';
    const dug = [[126, 76], [174, 76], [106, 128], [194, 128], [122, 262], [178, 262], [144, 190], [150, 166]];
    const h = (x, y, s, cls, anc) => `<text class="${cls || 'f39-ts'} f39-h" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}>${s}</text>`;
    const svg = `<svg class="f39-svg f39-dr s-tor" viewBox="0 0 300 380" role="img" aria-label="Önden gövde şeması: sağ lenfatik kanalın ve torasik kanalın drenaj alanları, açıldıkları venler ve lenfoid organlar">
      <defs>
        <clipPath id="f39-cA"><polygon points="0,0 150,0 150,168 102,168 102,300 0,300"/></clipPath>
        <clipPath id="f39-cB"><polygon points="150,0 300,0 300,380 0,380 0,300 102,300 102,168 150,168"/></clipPath>
        <pattern id="f39-ilik" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4 L4 0" class="f39-ilik-c"/></pattern>
      </defs>
      <g class="f39-govde">${sil}</g>
      <g class="f39-bolge f39-bA" clip-path="url(#f39-cA)" data-s="sag">${sil}</g>
      <g class="f39-bolge f39-bB" clip-path="url(#f39-cB)" data-s="tor">${sil}</g>
      <line class="f39-orta" x1="150" y1="8" x2="150" y2="374"/>
      ${h(6, 14, 'Hastanın sağı')}${h(294, 14, 'Solu', '', 'end')}
      <path class="f39-bag" d="M120 238 C 128 226, 140 248, 150 238 S 170 226, 180 240"/>
      <path class="f39-malt" d="M120 243 C 128 231, 140 253, 150 243 S 170 231, 180 245"/>
      <path class="f39-malt" d="M150 64 L150 100"/>
      <g class="f39-org-g" data-s="pri">
        <ellipse class="f39-org pri" cx="145.5" cy="134" rx="5" ry="8.5"/><ellipse class="f39-org pri" cx="154.5" cy="134" rx="5" ry="8.5"/>
        <rect class="f39-org pri" x="146" y="146" width="8" height="36" rx="3"/><rect class="f39-org-s pri" x="146" y="146" width="8" height="36" rx="3" fill="url(#f39-ilik)"/>
        <rect class="f39-org pri" x="119" y="292" width="7" height="68" rx="3"/><rect class="f39-org-s pri" x="119" y="292" width="7" height="68" rx="3" fill="url(#f39-ilik)"/>
        <rect class="f39-org pri" x="174" y="292" width="7" height="68" rx="3"/><rect class="f39-org-s pri" x="174" y="292" width="7" height="68" rx="3" fill="url(#f39-ilik)"/>
      </g>
      <g class="f39-org-g" data-s="sek">
        <ellipse class="f39-org sek" cx="143" cy="55" rx="3.5" ry="5"/><ellipse class="f39-org sek" cx="157" cy="55" rx="3.5" ry="5"/>
        <ellipse class="f39-org sek" cx="186" cy="188" rx="7" ry="12" transform="rotate(-20 186 188)"/>
        ${[[130, 233], [150, 238], [168, 232]].map(([x, y]) => `<circle class="f39-org sek" cx="${x}" cy="${y}" r="2.8"/>`).join('')}
        ${dug.map(([x, y]) => `<circle class="f39-org sek" cx="${x}" cy="${y}" r="3.3"/>`).join('')}
      </g>
      <g class="f39-venler">
        <path class="f39-ven" d="M131 62 L128 98"/><path class="f39-ven" d="M169 62 L172 98"/>
        <path class="f39-ven" d="M90 100 L128 98"/><path class="f39-ven" d="M210 100 L172 98"/>
        <path class="f39-ven" d="M128 98 L140 122"/><path class="f39-ven" d="M172 98 L140 122"/><path class="f39-ven" d="M140 122 L140 162"/>
      </g>
      <g class="f39-kg" data-s="tor"><path class="f39-kanal-h" d="${TK}"/><path class="f39-kanal f39-tk" d="${TK}"/><ellipse class="f39-sis" cx="150" cy="224" rx="4.5" ry="8"/></g>
      <g class="f39-kg" data-s="sag"><path class="f39-kanal-h" d="${SK}"/><path class="f39-kanal f39-sk" d="${SK}"/></g>
      <circle class="f39-agiz f39-agiz-t" cx="172" cy="98" r="4"/><circle class="f39-agiz f39-agiz-s" cx="128" cy="99" r="3.5"/>
      <g class="f39-ldg"></g>
      <line class="f39-lid" x1="84" y1="74" x2="110" y2="97"/>${h(4, 70, 'Sağ subklavyen ven')}
      <line class="f39-lid" x1="226" y1="80" x2="158" y2="110"/>${h(298, 76, 'Sol brakiyosefalik ven', '', 'end')}
      ${h(134, 176, 'Üst vena kava', '', 'end')}
      <line class="f39-lid f39-olcu-l" x1="112" y1="114" x2="122" y2="106"/>${h(112, 124, '≈ 1,5 cm', 'f39-ts f39-olcu', 'end')}
      ${h(158, 210, 'Torasik kanal', 'f39-ts f39-tk-t')}
    </svg>`;
    let sel = 'tor', t = 0;
    el.innerHTML = `<div class="f39-ust">${segHtml('Kanal ya da lenfoid organ', 's', SEC, 'tor', 'f39-seg')}</div>
      <div class="f39-ikili"><div class="f39-sahne f39-sahne-dr">${svg}</div><div class="f39-kart" aria-live="polite"></div></div>`;
    const sv = el.querySelector('svg'), kart = el.querySelector('.f39-kart'), ldg = sv.querySelector('.f39-ldg');
    const tkP = sv.querySelector('.f39-tk'), skP = sv.querySelector('.f39-sk');
    const NS = 'http://www.w3.org/2000/svg';
    const dots = Array.from({ length: 6 }, () => { const c = document.createElementNS(NS, 'circle'); at(c, { r: 2.6, class: 'f39-ld' }); ldg.appendChild(c); return c; });
    const LT = tkP.getTotalLength(), LS = skP.getTotalLength();
    const yaz = () => {
      const [b, rows] = KART[sel];
      kart.innerHTML = `<h4>${b}</h4><dl class="f39-dl">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
      sv.setAttribute('class', `f39-svg f39-dr s-${sel}`);
      basSec(el, 's', sel);
    };
    const kare = () => {
      dots.forEach((d, i) => {
        let on = false, p;
        if (!RM && sel === 'tor' && i < 4) { on = true; p = tkP.getPointAtLength(fr(t / 2.5 + i / 4) * LT); }
        if (!RM && sel === 'sag' && i >= 4) { on = true; p = skP.getPointAtLength(fr(t / 2.5 + (i - 4) / 2) * LS); }
        if (on) { yer(d, p.x, p.y); gor(d, 1); } else gor(d, 0);
      });
    };
    const sec = (s) => { if (!KART[s]) return; sel = s; yaz(); capYaz(el, CAP[s]); kare(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-s]');
      if (b && el.contains(b)) sec(b.dataset.s);
    });
    const dar = darIzle(el, (n) => el.classList.toggle('f39-dar', n));
    yaz(); kare();
    const stop = RM ? () => {} : ticker(el, (dt) => { t += dt; kare(); });
    return () => { stop(); dar(); };
  };

  /* =====================================================================
     2 · f39_kapiller — filtrasyon → fazlalık → radyal çekim → kapaklar → dönüş (K1 s. 168)
     ===================================================================== */
  VIZ.f39_kapiller = (el) => {
    const AD = ['Filtrasyon', 'Fazlalık', 'Radyal çekim', 'İlerleme', 'Dönüş'];
    const CAPS = [
      '<b>Filtrasyon.</b> Süzülen sıvının çoğu kapillere geri emilir; artan küçük fazlalık interstisyumda birikir. Oynatın, sonra kası ya da derin inspirasyonu açın. [[K1 s. 168]]',
      '<b>Net filtrasyon.</b> Filtrasyon geri emilimi biraz aştığı için interstisyumda günde yaklaşık 4 L sıvı artar; bu sıvı dolaşıma lenf olarak dönmelidir (Bölüm 36). [[K1 s. 168]]',
      '<b>Radyal çekim.</b> Çevre bağ dokusunun radyal çekimi lenf damarını açar; sıvı, protein ve hatta hücreler içeri girebilir. [[K1 s. 168]]',
      '<b>Kapaklar.</b> Büyük lenf damarlarındaki kapaklar akımı tek yönde tutar. [[K1 s. 168]]',
      '<b>Dönüş.</b> Lenf, kanallar yoluyla sistemik dolaşıma döner: günde yaklaşık 4 L. [[K1 s. 168]]',
    ];
    const KAS = '<b>İskelet kası.</b> Kas etkinliği lenf damarını sıkıştırır; kapaklar sayesinde lenf yalnız ileri gider. Venlerdeki gibi akımı artırır. [[K1 s. 168]]';
    const INSP = '<b>Derin inspirasyon.</b> Derin inspirasyon da, venöz dönüşte olduğu gibi, lenf akımını artırır. [[K1 s. 168]]';
    const L = {
      g: { W: 560, H: 300, tb: [30, 400, 30, 70], iy: [74, 194], ix1: 400, lc: [46, 400, 206, 244], vs: [548, 204, 246], vv: [440, 506], cnt: [420, 24, 128, 84], ch: [478, 154], lcT: [48, 264], vsT: [474, 272] },
      d: { W: 360, H: 360, tb: [16, 344, 28, 64], iy: [68, 188], ix1: 344, lc: [30, 230, 200, 236], vs: [344, 198, 238], vv: [262, 314], cnt: [16, 276, 236, 76], ch: [304, 314], lcT: [30, 256], vsT: [288, 266] },
    };
    const R = rng(39);
    const RF = Array.from({ length: 9 }, () => [R(), R(), R()]);
    const RR = Array.from({ length: 5 }, () => [R(), R(), R()]);
    const RE = Array.from({ length: 19 }, () => [R(), R(), R(), R()]);
    const RK = Array.from({ length: 9 }, () => [R(), R(), R()]);
    let s = RM ? 5 : 1, st = RM ? 9 : 0, t = RM ? 1.7 : 0, tl = RM ? 1.7 : 0, lvl = RM ? 1 : 0, oyn = false, kas = false, insp = false, G = null, ref = null;
    el.innerHTML = `${RM ? '' : '<div class="btn-row f39-kont"><button type="button" class="btn" data-a="oyn">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div>'}
      <div class="f39-adimlar" role="group" aria-label="Adımlar">${AD.map((a, i) => `<button type="button" class="f39-ad" data-adim="${i + 1}"><b>${i + 1}</b>${a}</button>`).join('')}</div>
      <div class="btn-row f39-tgls"><button type="button" class="btn ghost f39-tgl" data-t="kas" aria-pressed="false">İskelet kası kasılması</button><button type="button" class="btn ghost f39-tgl" data-t="insp" aria-pressed="false">Derin inspirasyon</button></div>
      <div class="f39-sahne-gen"></div>`;
    const sahne = el.querySelector('.f39-sahne-gen');
    const kur = (dar) => {
      const g = G = dar ? L.d : L.g;
      const [x0, x1, ty0, ty1] = g.tb, len = x1 - x0, [iy0, iy1] = g.iy;
      const [lx0, lx1, ly0, ly1] = g.lc, lr = (ly1 - ly0) / 2, lm = (ly0 + ly1) / 2;
      const [vx1, vy0, vy1] = g.vs;
      const fl = []; const span = lx1 - 6 - (lx0 + 14), sg = span / 5;
      for (let k = 0; k < 5; k++) { const xa = lx0 + 14 + k * sg; fl.push([xa, xa + sg]); }
      g.fl = fl;
      const lifler = Array.from({ length: 9 }, (_, i) => { const x = x0 + 20 + (i + RK[i][0] * 0.6) * (len - 40) / 9, y = iy0 + 18 + RK[i][1] * (iy1 - iy0 - 46); return `<path class="f39-lif" d="M${r1(x)} ${r1(y)} q 8 -6 16 0 t 16 0"/>`; }).join('');
      const akF = [0.12, 0.22, 0.32].map((f) => `<line class="f39-akok" x1="${x0 + f * len}" y1="${ty1 + 4}" x2="${x0 + f * len}" y2="${ty1 + 42}" marker-end="url(#f39-m-ak)"/>`).join('');
      const akR = [0.8, 0.9].map((f) => `<line class="f39-akok" x1="${x0 + f * len}" y1="${ty1 + 24}" x2="${x0 + f * len}" y2="${ty1 + 6}" marker-end="url(#f39-m-ak)"/>`).join('');
      const [cx, cy, cw, chh] = g.cnt;
      sahne.innerHTML = `<svg class="f39-svg f39-kap${dar ? ' f39-dar' : ''}" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Kan kapilleri, interstisyum ve lenf kapillerinde sıvının yolu: filtrasyon, geri emilim, radyal çekim, kapaklar ve dolaşıma dönüş">
        <defs><linearGradient id="f39-kap" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--crit-soft)"/><stop offset="1" style="stop-color:var(--c-basic-soft)"/></linearGradient>
        ${okDef('f39-m-ak', 'f39-uc-a')}${okDef('f39-m-ok', 'f39-uc-o')}</defs>
        <rect class="f39-int" x="${x0}" y="${iy0}" width="${g.ix1 - x0}" height="${iy1 - iy0}" rx="10"/>
        ${lifler}
        <rect class="f39-kk" x="${x0}" y="${ty0}" width="${len}" height="${ty1 - ty0}" rx="${(ty1 - ty0) / 2}" fill="url(#f39-kap)"/>
        <line class="f39-kk-a" x1="${x0 + 14}" y1="${ty0}" x2="${x0 + len * 0.45}" y2="${ty0}"/><line class="f39-kk-a" x1="${x0 + 14}" y1="${ty1}" x2="${x0 + len * 0.45}" y2="${ty1}"/>
        <line class="f39-kk-v" x1="${x0 + len * 0.55}" y1="${ty0}" x2="${x1 - 14}" y2="${ty0}"/><line class="f39-kk-v" x1="${x0 + len * 0.55}" y1="${ty1}" x2="${x1 - 14}" y2="${ty1}"/>
        <g class="f39-eritr"></g>
        <text class="f39-ts f39-art-t" x="${x0 + 4}" y="${ty0 - 8}">arteriyel uç</text><text class="f39-t" x="${x0 + len / 2}" y="${ty0 - 8}" text-anchor="middle">Kan kapilleri</text><text class="f39-ts f39-ven-t" x="${x1 - 4}" y="${ty0 - 8}" text-anchor="end">venöz uç</text>
        ${akF}${akR}
        <text class="f39-ts f39-acc f39-h" x="${x0 + 0.34 * len + 6}" y="${ty1 + 28}">Filtrasyon</text>
        <text class="f39-ts f39-acc f39-h" x="${x0 + 0.74 * len - 6}" y="${ty1 + 44}" text-anchor="end">Geri emilim</text>
        <text class="f39-ts f39-h" x="${x0 + 8}" y="${iy1 - 8}">İnterstisyum</text>
        <text class="f39-ts f39-net f39-h" x="${x0 + 0.56 * len}" y="${iy0 + 62}" text-anchor="middle">Net fazlalık</text>
        <g class="f39-filg">${fl.map(() => '<line class="f39-fil"/>').join('')}</g>
        <text class="f39-ts f39-rad f39-h" x="${fl[2][1] + 14}" y="${ly0 - 30}">Radyal çekim</text>
        <rect class="f39-lum" x="${lx0}" y="${ly0}" width="${lx1 - lx0 + 2}" height="${ly1 - ly0}"/>
        <circle class="f39-lum" cx="${lx0}" cy="${lm}" r="${lr}"/>
        <path class="f39-lw" d="M${lx0 + 14} ${ly0} L${lx0} ${ly0} A ${lr} ${lr} 0 0 0 ${lx0} ${ly1} L${lx1} ${ly1}"/>
        <g class="f39-flg">${fl.map(() => '<line class="f39-flap"/>').join('')}</g>
        <rect class="f39-vlum"/><line class="f39-vw f39-vw0"/><line class="f39-vw f39-vw1"/>
        <rect class="f39-kas f39-kas0" rx="4"/><rect class="f39-kas f39-kas1" rx="4"/>
        <g class="f39-vlv">${g.vv.map(() => '<line class="f39-yap"/><line class="f39-yap"/>').join('')}</g>
        <g class="f39-emme"><line class="f39-akok" marker-end="url(#f39-m-ak)"/><line class="f39-akok" marker-end="url(#f39-m-ak)"/></g>
        <g class="f39-pg"></g>
        <text class="f39-ts" x="${g.lcT[0]}" y="${g.lcT[1]}">Lenf kapilleri (kör uçlu)</text>
        <text class="f39-ts" x="${g.vsT[0]}" y="${g.vsT[1]}" text-anchor="middle">Lenf damarı</text>
        <g class="f39-gogus"><g class="f39-gg"><ellipse class="f39-gc" cx="0" cy="0" rx="20" ry="17"/><path class="f39-gc" d="M-14 -8 Q0 -2 14 -8 M-16 0 Q0 6 16 0 M-14 8 Q0 14 14 8 M0 -17 L0 17"/></g><text class="f39-ts" x="0" y="32" text-anchor="middle">Göğüs</text></g>
        <g class="f39-say"><rect class="f39-sk-k" x="${cx}" y="${cy}" width="${cw}" height="${chh}" rx="10"/>
          <text class="f39-ts" x="${cx + 12}" y="${cy + 26}">Lenf dönüşü</text><text class="f39-p f39-sk-v" x="${cx + 12}" y="${cy + 54}">≈ 4 L/gün</text>
          <rect class="f39-kap-k" x="${cx + cw - 34}" y="${cy + 14}" width="22" height="${chh - 26}" rx="3"/><rect class="f39-kap-d" x="${cx + cw - 32}" width="18" rx="2"/></g>
      </svg>`;
      const sv = sahne.querySelector('svg'), NS = 'http://www.w3.org/2000/svg';
      const c = (tag, a, p) => { const e = document.createElementNS(NS, tag); at(e, a); p.appendChild(e); return e; };
      const pg = sv.querySelector('.f39-pg'), eg = sv.querySelector('.f39-eritr');
      ref = {
        sv, eri: Array.from({ length: 7 }, () => c('ellipse', { rx: 5, ry: 3.4, class: 'f39-eri' }, eg)),
        F: RF.map(() => c('circle', { r: 2.8, class: 'f39-sv' }, pg)),
        Rr: RR.map(() => c('circle', { r: 2.8, class: 'f39-sv' }, pg)),
        E: RE.map((_, i) => i < 14 ? c('circle', { r: 2.8, class: 'f39-sv' }, pg) : i < 18 ? c('rect', { width: 7, height: 7, rx: 1.5, class: 'f39-pr' }, pg) : c('circle', { r: 5.5, class: 'f39-lfs' }, pg)),
        fil: [...sv.querySelectorAll('.f39-fil')], flap: [...sv.querySelectorAll('.f39-flap')], yap: [...sv.querySelectorAll('.f39-yap')],
        vlum: sv.querySelector('.f39-vlum'), vw: [sv.querySelector('.f39-vw0'), sv.querySelector('.f39-vw1')], kasR: [sv.querySelector('.f39-kas0'), sv.querySelector('.f39-kas1')],
        emme: [...sv.querySelectorAll('.f39-emme line')], gog: sv.querySelector('.f39-gogus'), gg: sv.querySelector('.f39-gg'),
        kapD: sv.querySelector('.f39-kap-d'), say: sv.querySelector('.f39-say'),
      };
      ciz();
    };
    const ciz = () => {
      if (!ref) return;
      const g = G, [x0, x1, ty0, ty1] = g.tb, len = x1 - x0, [iy0, iy1] = g.iy;
      const [lx0, lx1, ly0, ly1] = g.lc, lm = (ly0 + ly1) / 2;
      const [vx1, vy0b, vy1b] = g.vs;
      const sq = kas ? 0.5 - 0.5 * Math.cos(2 * Math.PI * t) : 0;
      const ins = kas ? 5 * sq : 0, vy0 = vy0b + ins, vy1 = vy1b - ins, vm = (vy0 + vy1) / 2, vk = (vy1 - vy0) / (vy1b - vy0b);
      ref.sv.classList.toggle('f39-s3', s >= 3); ref.sv.classList.toggle('f39-s2', s >= 2); ref.sv.classList.toggle('f39-s5', s >= 5);
      ref.sv.classList.toggle('f39-kas-on', kas); ref.sv.classList.toggle('f39-insp-on', insp);
      /* kan hücreleri */
      ref.eri.forEach((e, i) => { const u = fr(t / 5 + i / 7); at(e, { cx: r1(x0 + 12 + u * (len - 24)), cy: r1((ty0 + ty1) / 2 + (i % 2 ? 6 : -6)) }); });
      /* filtrasyon / geri emilim */
      ref.F.forEach((e, i) => {
        const [a, b, ph] = RF[i], u = fr(t / 2.6 + ph), xs = x0 + len * (0.08 + 0.3 * a), yt = iy0 + 10 + b * (iy1 - iy0 - 50);
        const p = ease(u / 0.7); yer(e, xs + 18 * p * b, lerp(ty1 - 3, yt, p)); gor(e, u < 0.7 ? 1 : 1 - (u - 0.7) / 0.3);
      });
      ref.Rr.forEach((e, i) => {
        const [a, b, ph] = RR[i], u = fr(t / 2.6 + ph), xs = x0 + len * (0.72 + 0.22 * a), yt = iy0 + 14 + b * (iy1 - iy0 - 60);
        const p = ease(u / 0.8); yer(e, xs - 16 * (1 - p), lerp(yt, ty1 - 3, p)); gor(e, u < 0.15 ? u / 0.15 : u < 0.8 ? 1 : 0);
      });
      /* lenf kapakçıkları ve bağlayıcı lifler */
      const acik = s >= 3 ? 1 : 0;
      g.fl.forEach(([xa, xb], k) => {
        const ex = xb + lerp(5, 3, acik), ey = ly0 + lerp(2, -8, acik);
        at(ref.flap[k], { x1: xa, y1: ly0, x2: r1(ex), y2: r1(ey) });
        at(ref.fil[k], { x1: r1(ex), y1: r1(ey), x2: xb + 9, y2: ly0 - lerp(36, 42, acik) });
      });
      /* lenf damarı + kas bantları */
      at(ref.vlum, { x: lx1, y: r1(vy0), width: vx1 - lx1, height: r1(vy1 - vy0) });
      at(ref.vw[0], { x1: lx1, y1: ly0, x2: vx1, y2: r1(vy0) }); at(ref.vw[1], { x1: lx1, y1: ly1, x2: vx1, y2: r1(vy1) });
      at(ref.kasR[0], { x: lx1 + 8, y: r1(vy0 - 12), width: vx1 - lx1 - 12, height: 8 });
      at(ref.kasR[1], { x: lx1 + 8, y: r1(vy1 + 4), width: vx1 - lx1 - 12, height: 8 });
      const vOpen = (k) => s < 4 ? 0 : kas ? (k === 0 ? 1 - sq : sq) : 0.85;
      g.vv.forEach((vx, k) => {
        const o = vOpen(k), h2 = (vy1 - vy0) / 2;
        at(ref.yap[2 * k], { x1: vx, y1: r1(vy0), x2: vx + lerp(12, 16, o), y2: r1(vm - lerp(1, h2 - 5, o)) });
        at(ref.yap[2 * k + 1], { x1: vx, y1: r1(vy1), x2: vx + lerp(12, 16, o), y2: r1(vm + lerp(1, h2 - 5, o)) });
      });
      /* derin inspirasyon: göğüs simgesi ve emme okları */
      const br = 0.5 - 0.5 * Math.cos(2 * Math.PI * t / 3);
      at(ref.gog, { transform: `translate(${g.ch[0]} ${g.ch[1]})` });
      at(ref.gg, { transform: `scale(${r1((1 + (insp ? 0.16 * br : 0)) * 100) / 100})` });
      ref.emme.forEach((e, i) => { const y = vm + (i ? 7 : -7) * vk; at(e, { x1: vx1 - 34, y1: r1(y), x2: vx1 - 12, y2: r1(y) }); e.style.opacity = insp ? r1(0.35 + 0.65 * br) : 0; });
      /* sayaç */
      const kh = G.cnt[3] - 30;
      at(ref.kapD, { y: r1(G.cnt[1] + 16 + kh * (1 - lvl)), height: r1(Math.max(0, kh * lvl)) });
      /* fazlalık parçacıkları */
      const xEnd = s >= 5 ? vx1 + 6 : g.vv[1] + 22;
      ref.E.forEach((e, i) => {
        const [a, b, ph, dl] = RE[i], k = i % 5, gx = g.fl[k][1], o = (b - 0.5) * ((ly1 - ly0) - 12);
        const rx = x0 + 16 + a * (Math.min(g.ix1, lx1) - x0 - 40), ry = iy0 + 30 + b * (iy1 - iy0 - 66);
        const wob = RM ? 0 : Math.sin(t * 2 + i) * 1.2;
        const big = i >= 14;
        let x = rx, y = ry + wob, op = 1;
        if (s === 1) op = i < 3 ? 0.9 : 0;
        else if (s === 2) op = i < 3 ? 0.9 : clamp((st - dl * 0.8) / 1.2, 0, 1);
        const giris = (u) => { /* u ∈ [0,1]: dinlenme → aralık → lümen */
          if (u < 0.75) { const p = ease(u / 0.75); return [lerp(rx, gx, p), lerp(ry, ly0 - 4, p)]; }
          const p = (u - 0.75) / 0.25; return [gx + 3 * p, lerp(ly0 - 4, lm + o, p)];
        };
        if (s === 3) { [x, y] = giris(clamp((st - dl * 1.2) / 1.5, 0, 1)); }
        if (s >= 4) {
          const u = fr(tl / (big ? 5.2 : 4) + ph);
          if (u < 0.3) [x, y] = giris(u / 0.3);
          else { const p = (u - 0.3) / 0.7, xx = lerp(gx + 3, xEnd, p); x = xx; y = xx > lx1 ? vm + o * vk : lm + o; }
          op = u < 0.05 ? u / 0.05 : u > 0.93 ? (1 - u) / 0.07 : 1;
        }
        if (e.tagName === 'rect') at(e, { x: r1(x - 3.5), y: r1(y - 3.5) }); else yer(e, x, y);
        gor(e, op);
      });
    };
    const setS = (n, yazma) => {
      s = n; st = RM ? 9 : 0; if (n < 5) lvl = 0;
      el.querySelectorAll('[data-adim]').forEach((b) => b.setAttribute('aria-current', String(+b.dataset.adim === n)));
      if (!yazma) capYaz(el, CAPS[n - 1]);
      ciz();
    };
    const oynBtn = () => { const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = oyn ? 'Duraklat' : 'Oynat'; b.setAttribute('aria-pressed', String(oyn)); } };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.adim) { oyn = false; oynBtn(); setS(+b.dataset.adim); if (RM) lvl = s >= 5 ? 1 : 0, ciz(); return; }
      if (b.dataset.a === 'oyn') { oyn = !oyn; if (oyn && s >= 5) { lvl = 0; setS(1); } oynBtn(); return; }
      if (b.dataset.a === 'bas') { lvl = 0; tl = 0; setS(1); oyn = true; oynBtn(); return; }
      if (b.dataset.t) {
        const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on));
        if (b.dataset.t === 'kas') kas = on; else insp = on;
        capYaz(el, on ? (b.dataset.t === 'kas' ? KAS : INSP) : CAPS[s - 1]);
        ciz();
      }
    });
    const dar = darIzle(el, kur);
    setS(s, true);
    const stop = RM ? () => {} : ticker(el, (dt) => {
      t += dt; st += dt;
      const spd = (kas ? 2 * (0.3 + 1.4 * (0.5 - 0.5 * Math.cos(2 * Math.PI * t))) : 1) * (insp ? 1.5 : 1);
      tl += dt * spd;
      if (s >= 5) lvl = Math.min(1, lvl + dt * spd / 6);
      if (oyn && st >= 3) { if (s < 5) setS(s + 1); else { oyn = false; oynBtn(); } }
      ciz();
    });
    return () => { stop(); dar(); };
  };

  /* =====================================================================
     3 · f39_yuk — bağışıklık, şilüs, deri altı ilaç: tek çıkış torasik kanal (K1 s. 168–169)
     ===================================================================== */
  VIZ.f39_yuk = (el) => {
    const MOD = [['bag', 'Bağışıklık'], ['sin', 'Sindirim (şilüs)'], ['ila', 'Deri altı ilaç']];
    const CAP = {
      bag: [
        '<b>Bağışıklık.</b> Lenf dolaşıma dönmeden lenf düğümlerinden geçer; düğümleri dolduran lenfositler yabancı cisimleri ve patojenleri tanıyıp immün yanıtı başlatır. Bir yük seçip adım adım izleyin. [[K1 s. 168]]',
        '<b>Tek çıkış yolu.</b> Filtre olmuş proteinler, lenfositler ve hücre dahil artıklar interstisyumdan yalnız lenf kapilleriyle çıkabilir. [[K1 s. 168]]',
        '<b>Metastaz.</b> Lenfatik yayılım karsinomların en sık metastaz yoludur. [[K1 s. 168–169]]',
        '<b>Dönüş.</b> Süzülmüş lenf torasik kanalla sistemik dolaşıma döner. [[K1 s. 168]]'],
      sin: [
        '<b>Şilomikron.</b> Diyet trigliseritleri kolesterol esterleri, fosfolipitler ve apolipoprotein B-48 ile birleşip şilomikron olur (Bölüm 64). [[K1 s. 169]]',
        '<b>Lakteal.</b> Şilomikronlar bağırsağın lenf kapilleri olan lakteallere geçer ve lenfle karışıp şilüs denen sütlü sıvıyı oluşturur. [[K1 s. 169]]',
        '<b>Torasik kanal.</b> Şilüs lenf damarlarıyla ilerler ve torasik kanalla sistemik dolaşıma girer. [[K1 s. 169]]'],
      ila: [
        '<b>Deri altı uygulama.</b> Ağızdan biyoyararlanımı düşük protein ilaçlar (ör. insülin, düşük molekül ağırlıklı heparinler) sıklıkla deri altına verilir. [[K1 s. 169]]',
        '<b>Kapiller geçilemez.</b> Büyük, negatif yüklü proteinler kapiller membranı geçemez ve hücre dışı aralıkta kalır. [[K1 s. 169]]',
        '<b>Lenfle emilim.</b> Bu proteinler lenfatik sistemle emilir ve torasik kanal yoluyla sistemik dolaşıma girer. [[K1 s. 169]]'],
    };
    const BAS = { bag: 'İnterstisyum', sin: 'İnce bağırsak villusu', ila: 'Deri altı hücre dışı aralık' };
    const LEJ = {
      bag: '<span><i class="f39-lj-sv"></i>sıvı</span><span><i class="f39-lj-pr"></i>protein</span><span><i class="f39-lj-lf"></i>lenfosit</span><span><i class="f39-lj-ar"></i>hücre artığı</span><span><i class="f39-lj-bk"></i>bakteri</span><span><i class="f39-lj-tm"></i>tümör hücresi</span>',
      sin: '<span><i class="f39-lj-tg"></i>trigliserit</span><span><i class="f39-lj-ke"></i>kolesterol esterleri</span><span><i class="f39-lj-fl"></i>fosfolipitler</span><span><i class="f39-lj-ap"></i>apoB-48</span><span><i class="f39-lj-sm"></i>şilomikron / şilüs</span>',
      ila: '<span><i class="f39-lj-il"></i>büyük, negatif yüklü protein ilaç</span>',
    };
    const L = {
      g: { W: 560, H: 260, box: [10, 60], strip: [0, 34, 200, 18], pts: [[160, 140], [290, 140], [360, 140], [360, 226], [410, 226], [410, 64], [500, 64], [500, 214]], lm: { node: 1, dA: 4, dB: 5, ven: 6, son: 7 },
        node: [290, 140, 40, 30], duct: [396, 56, 28, 180], vein: [470, 40, 60, 190], cross: [110, 4, 110, -18],
        tx: { node: [290, 98, 'middle'], duct: [410, 252, 'middle'], vein1: [500, 22, 'middle'], vein2: [500, 35, 'middle'], sis1: [500, 244, 'middle'], sis2: [500, 257, 'middle'], im: [290, 190, 'middle'], me: [290, 206, 'middle'], bas: [10, 198, 'start'], lak: [10, 216, 'start'], gec1: [210, 22, 'start'], gec2: [210, 36, 'start'], strip: [100, 47, 'middle'] } },
      d: { W: 360, H: 440, box: [20, 30], strip: [10, 6, 190, 20], pts: [[170, 110], [236, 110], [236, 210], [236, 262], [236, 376], [236, 400], [60, 400]], lm: { node: 2, dA: 3, dB: 4, ven: 5, son: 6 },
        node: [236, 210, 30, 40], duct: [222, 254, 28, 130], vein: [40, 386, 300, 28], cross: [110, 4, 110, -18],
        tx: { node: [272, 172, 'start'], duct: [260, 322, 'start'], vein1: [190, 405, 'middle'], vein2: null, sis1: [60, 434, 'start'], sis2: null, im: [272, 214, 'start'], me: [272, 232, 'start'], bas: [20, 170, 'start'], lak: [20, 190, 'start'], gec1: [20, 190, 'start'], gec2: [20, 206, 'start'], strip: [105, 21, 'middle'] } },
    };
    /* kutu içi yerel koordinatlar (150 × 120); kapiller/lakteal y = 80 boyunca, kutu sağ kenarından boru hattına (L = 0) bağlanır */
    const BX = { w: 150, h: 120, cy: 80 };
    let mod = 'bag', s = 1, f = RM ? 1 : 0, bek = 0, oyn = false, G = null, ref = null;
    el.innerHTML = `<div class="f39-ust">${segHtml('Yük', 'm', MOD, 'bag', 'f39-seg')}</div>
      <div class="btn-row f39-adim-k"><button type="button" class="btn ghost" data-a="geri">‹ Geri</button><span class="f39-nok" role="group" aria-label="Adım"></span><button type="button" class="btn ghost" data-a="ileri">İleri ›</button>${RM ? '' : '<button type="button" class="btn" data-a="oyn">Oynat</button>'}</div>
      <div class="f39-sahne-gen"></div><div class="legend f39-lej"></div>`;
    const sahne = el.querySelector('.f39-sahne-gen'), nok = el.querySelector('.f39-nok'), lej = el.querySelector('.f39-lej');
    const n = () => CAP[mod].length;
    const DUR = { bag: [1.5, 2.5, 1.5, 2.5], sin: [1.5, 1.5, 3], ila: [1.5, 2, 3] };
    /* aktörler: w = adım sonu konumları (0: başlangıç). [x, y] yerel kutu noktası, {L, o} boru hattı, {b:[x,y]} gidip geri sekme */
    const AKT = {
      bag: () => {
        const A = [];
        const sv = [[20, 30], [42, 48], [30, 98], [58, 104], [50, 24]];
        sv.forEach((p, i) => A.push({ k: 'sv', w: [p, { L: -40 + i * 7, o: (i % 3 - 1) * 3 }, { L: 120 + i * 5, o: (i % 3 - 1) * 8 }, { L: 120 + i * 5, o: (i % 3 - 1) * 8 }, { L: 9999 - i * 14 }] }));
        [[72, 40], [96, 30]].forEach((p, i) => A.push({ k: 'pr', w: [p, { L: -28 + i * 10, o: 2 }, { L: 140 + i * 8, o: -10 + i * 20 }, { L: 140 + i * 8, o: -10 + i * 20 }, { L: 9999 - 80 - i * 14 }] }));
        A.push({ k: 'lf', w: [[104, 56], { L: -14, o: 0 }, { L: 132, o: 14 }, { L: 132, o: 14 }, { L: 9999 - 110 }] });
        A.push({ k: 'ar', w: [[24, 70], { L: -50, o: -3 }, { L: 112, o: -14 }, { L: 112, o: -14 }, { L: 9999 - 130 }] });
        A.push({ k: 'bk', w: [[124, 40], { L: -6, o: -2 }, { L: 128, o: 0 }, { L: 128, o: 0 }, { L: 128, o: 0 }] });
        A.push({ k: 'tm', w: [[56, 76], { L: -60, o: 1 }, { L: 50, o: 0 }, { L: 140, o: 10 }, { L: 140, o: 10 }] });
        return A;
      },
      sin: () => {
        const A = [];
        const sym = [['tg', [64, 49]], ['ke', [96, 49]], ['fl', [64, 60]], ['ap', [96, 60]]];
        sym.forEach(([k, p]) => A.push({ k, w: [p, [80, 54.5], [80, 54.5], [80, 54.5]], gizSon: 1 }));
        [32, 80, 127].forEach((x, i) => A.push({ k: 'sm', w: [[x, 54.5], [x, 54.5], [x, BX.cy], { L: 9999 - i * 22 }], big: true, gel: 1 }));
        for (let i = 0; i < 5; i++) A.push({ k: 'sut', w: [[40 + i * 22, BX.cy], [40 + i * 22, BX.cy], [40 + i * 22, BX.cy], { L: 9999 - 66 - i * 22 }], gel: 2 });
        return A;
      },
      ila: () => {
        const A = [];
        [[64, 64, -4], [88, 52, 2], [74, 94, 6]].forEach(([x, y, o], i) => A.push({ k: 'il', w: [[44, 44], [x, y], { b: [x + 20, -4] }, { L: 9999 - i * 26, o }] }));
        return A;
      },
    };
    let akt = [];
    const kur = (dar) => {
      const g = G = dar ? L.d : L.g, P = g.P = poly(g.pts), [bx, by] = g.box;
      g.LM = {}; for (const k in g.lm) g.LM[k] = P.cum[g.lm[k]];
      const tx = (k, s2, cls) => { const p = g.tx[k]; return p ? `<text class="${cls || 'f39-ts'} f39-h" x="${p[0]}" y="${p[1]}" text-anchor="${p[2]}">${s2}</text>` : ''; };
      const [nx, ny, nrx, nry] = g.node, [dx, dy, dw, dh] = g.duct, [vx, vy, vw, vh] = g.vein, [sx, sy, sw, sh] = g.strip;
      const yerel = (x, y) => [bx + x, by + y];
      const kanal = `M${bx + 30} ${by + BX.cy - 7} L${bx + BX.w} ${by + BX.cy - 7} L${bx + BX.w} ${by + BX.cy + 7} L${bx + 30} ${by + BX.cy + 7} A7 7 0 0 1 ${bx + 30} ${by + BX.cy - 7} Z`;
      const ic = {
        bag: `<path class="f39-lkap" d="M${bx + 70} ${by + BX.cy - 7} L${bx + BX.w} ${by + BX.cy - 7} L${bx + BX.w} ${by + BX.cy + 7} L${bx + 70} ${by + BX.cy + 7} A7 7 0 0 1 ${bx + 70} ${by + BX.cy - 7} Z"/>`,
        sin: `<rect class="f39-lumen" x="${bx + 2}" y="${by + 2}" width="${BX.w - 4}" height="38" rx="8"/>
          <circle class="f39-sut-c" cx="${bx + 20}" cy="${by + 22}" r="9"/><text class="f39-ts" x="${bx + 34}" y="${by + 26}">yağ</text>
          ${[0, 1, 2].map((i) => `<rect class="f39-ent" x="${bx + 6 + i * 47}" y="${by + 42}" width="44" height="25" rx="4"/>`).join('')}
          <path class="f39-lkap f39-lakteal" d="${kanal}"/>`,
        ila: `<path class="f39-deri" d="M${bx} ${by + 22} q 18 -6 37 0 t 37 0 t 38 0 t 38 0"/>
          <line class="f39-igne" x1="${bx + 6}" y1="${by + 6}" x2="${bx + 44}" y2="${by + 44}"/><line class="f39-sir" x1="${bx - 6}" y1="${by - 6}" x2="${bx + 10}" y2="${by + 10}"/>
          <text class="f39-ts" x="${bx + 146}" y="${by + 36}" text-anchor="end">İnsülin</text>
          <text class="f39-ts" x="${bx + 146}" y="${by + 104}" text-anchor="end">Düşük molekül</text><text class="f39-ts" x="${bx + 146}" y="${by + 117}" text-anchor="end">ağırlıklı heparin</text>
          <path class="f39-lkap" d="M${bx + 70} ${by + BX.cy - 7} L${bx + BX.w} ${by + BX.cy - 7} L${bx + BX.w} ${by + BX.cy + 7} L${bx + 70} ${by + BX.cy + 7} A7 7 0 0 1 ${bx + 70} ${by + BX.cy - 7} Z"/>`,
      }[mod];
      const [cx1, cy1, cx2, cy2] = g.cross;
      const c1 = yerel(cx1, cy1), c2 = yerel(cx2, cy2);
      sahne.innerHTML = `<svg class="f39-svg f39-yk${dar ? ' f39-dar' : ''} m-${mod}" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Başlangıç dokusundan lenf damarı, lenf düğümü ve torasik kanal üzerinden sol brakiyosefalik vene yükün yolu">
        <defs><linearGradient id="f39-kap2" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--crit-soft)"/><stop offset="1" style="stop-color:var(--c-basic-soft)"/></linearGradient>${okDef('f39-m-yk', 'f39-uc-a')}${okDef('f39-m-yv', 'f39-uc-v')}</defs>
        <rect class="f39-kk" x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="${sh / 2}" fill="url(#f39-kap2)"/>${tx('strip', 'Kan kapilleri', 'f39-ts f39-ink')}
        <rect class="f39-kutu" x="${bx}" y="${by}" width="${BX.w}" height="${BX.h}" rx="10"/>
        ${ic}
        <path class="f39-boru" d="${polyD(g.pts)}"/>
        <rect class="f39-duct" x="${dx}" y="${dy}" width="${dw}" height="${dh}" rx="${dw / 2}"/>
        <path class="f39-boru-i" d="${polyD(g.pts)}"/>
        <rect class="f39-vein" x="${vx}" y="${vy}" width="${vw}" height="${vh}" rx="12"/>
        <ellipse class="f39-node" cx="${nx}" cy="${ny}" rx="${nrx}" ry="${nry}"/>
        <g class="f39-nodelf">${Array.from({ length: 7 }, (_, i) => { const a = i / 7 * 6.283, q = 0.55; return `<circle class="f39-nl" cx="${r1(nx + Math.cos(a) * nrx * q)}" cy="${r1(ny + Math.sin(a) * nry * q)}" r="3"/>`; }).join('')}</g>
        <g class="f39-sar"></g>
        <circle class="f39-met" r="11"/>
        <g class="f39-cr"><line class="f39-akok f39-cr-l" x1="${c1[0]}" y1="${c1[1]}" x2="${c2[0]}" y2="${c2[1]}" marker-end="url(#f39-m-yk)"/><path class="f39-cr-x" d="M${c1[0] - 7} ${(c1[1] + c2[1]) / 2 - 7} l14 14 m0 -14 l-14 14"/></g>
        ${tx('node', 'Lenf düğümü', 'f39-t')}${tx('duct', 'Torasik kanal', 'f39-t')}${tx('vein1', g.tx.vein2 ? 'Sol brakiyosefalik' : 'Sol brakiyosefalik ven', 'f39-ts f39-ink')}${tx('vein2', 'ven', 'f39-ts f39-ink')}
        ${tx('sis1', g.tx.sis2 ? 'Sistemik' : '← Sistemik dolaşım', 'f39-ts f39-ven-t')}${tx('sis2', 'dolaşım', 'f39-ts f39-ven-t')}
        <g class="f39-pg"></g>
        <g class="f39-et-im">${tx('im', 'immün yanıt', 'f39-t f39-clin-t')}</g><g class="f39-et-me">${tx('me', 'metastaz', 'f39-t f39-warn-t')}</g>
        ${tx('bas', BAS[mod], 'f39-t')}
        <g class="f39-et-lak">${mod === 'sin' ? (dar ? tx('lak', 'Lakteal = bağırsağın', 'f39-ts f39-ok-t') + `<text class="f39-ts f39-ok-t f39-h" x="20" y="206">lenf kapilleri</text>` : tx('lak', 'Lakteal = bağırsağın lenf kapilleri', 'f39-ts f39-ok-t')) : ''}</g>
        <g class="f39-et-gec">${mod === 'ila' ? tx('gec1', 'Büyük, negatif yüklü:', 'f39-ts f39-warn-t') + tx('gec2', 'kapiller membranı geçemez', 'f39-ts f39-warn-t') : ''}</g>
        <line class="f39-akok f39-vok" x1="${dar ? 320 : 500}" y1="${dar ? 400 : 120}" x2="${dar ? 290 : 500}" y2="${dar ? 400 : 160}" marker-end="url(#f39-m-yv)"/>
      </svg>`;
      const sv = sahne.querySelector('svg'), NS = 'http://www.w3.org/2000/svg';
      const c = (tag, a, p) => { const e = document.createElementNS(NS, tag); at(e, a); p.appendChild(e); return e; };
      const pg = sv.querySelector('.f39-pg'), sar = sv.querySelector('.f39-sar');
      akt = AKT[mod]().map((a) => {
        let e;
        if (a.k === 'pr') e = c('rect', { width: 7, height: 7, rx: 1.5, class: 'f39-pr' }, pg);
        else if (a.k === 'bk') e = c('rect', { width: 14, height: 7, rx: 3.5, class: 'f39-bk' }, pg);
        else if (a.k === 'ar') e = c('path', { d: 'M-4 -3 L2 -5 L5 1 L0 5 L-5 2 Z', class: 'f39-ar' }, pg);
        else if (a.k === 'tg') e = c('path', { d: 'M0 -4.5 L4.5 3.5 L-4.5 3.5 Z', class: 'f39-tg' }, pg);
        else if (a.k === 'ke') e = c('path', { d: 'M0 -4.5 L4.5 0 L0 4.5 L-4.5 0 Z', class: 'f39-ke' }, pg);
        else if (a.k === 'ap') e = c('rect', { width: 7, height: 7, x: -3.5, y: -3.5, class: 'f39-ap' }, pg);
        else if (a.k === 'il') { e = c('g', { class: 'f39-il' }, pg); c('circle', { r: 7.5 }, e); c('path', { d: 'M-3.5 0 L3.5 0' }, e); }
        else e = c('circle', { r: { sv: 2.8, lf: 5.5, tm: 7, fl: 3.2, sm: 7.5, sut: 3.2 }[a.k] || 3, class: 'f39-' + a.k }, pg);
        return { ...a, e };
      });
      ref = { sv, sar: Array.from({ length: 6 }, () => c('circle', { r: 3, class: 'f39-nl' }, sar)), met: sv.querySelector('.f39-met') };
      lej.innerHTML = LEJ[mod];
      ciz();
    };
    const coz = (w, g) => {
      if (Array.isArray(w)) return [g.box[0] + w[0], g.box[1] + w[1]];
      if (w.L !== undefined) return polyAt(g.P, Math.min(w.L, g.P.L + (w.L > 9000 ? w.L - 9999 : 0)), w.o || 0);
      return null;
    };
    const Lof = (w, g) => {
      if (w.L === undefined) return null;
      return w.L > 9000 ? g.P.L + (w.L - 9999) : w.L;
    };
    const ciz = () => {
      if (!ref) return;
      const g = G, fe = ease(f);
      ref.sv.classList.toggle('f39-st2', mod === 'bag' && (s > 2 || (s === 2 && f > 0.7)));
      ref.sv.classList.toggle('f39-st3', mod === 'bag' && (s > 3 || (s === 3 && f > 0.7)));
      ref.sv.classList.toggle('f39-lak-on', mod === 'sin' && (s > 2 || (s === 2 && f > 0.5)));
      ref.sv.classList.toggle('f39-duct-on', mod === 'sin' && s === 3 && f > 0.55);
      ref.sv.classList.toggle('f39-cr-on', mod === 'ila' && s >= 2);
      akt.forEach((a) => {
        let w0 = a.w[s - 1]; const w1 = a.w[s];
        if (w0.b) w0 = a.w[s - 2];
        let p;
        if (w1.b) { const p0 = coz(w0, g), pb = [g.box[0] + w1.b[0], g.box[1] + w1.b[1]]; p = f < 0.5 ? [lerp(p0[0], pb[0], ease(f * 2)), lerp(p0[1], pb[1], ease(f * 2))] : [lerp(pb[0], p0[0], ease((f - 0.5) * 2)), lerp(pb[1], p0[1], ease((f - 0.5) * 2))]; }
        else {
          const L0 = Lof(w0, g), L1 = Lof(w1, g);
          if (L0 !== null && L1 !== null) p = polyAt(g.P, lerp(L0, L1, fe), lerp(w0.o || 0, w1.o || 0, fe));
          else if (L1 !== null && Array.isArray(w0)) {
            /* kutudan kanala: önce kapiller girişine (L = −70..−10), sonra hat boyunca */
            const pIn = polyAt(g.P, Math.min(L1, -10) - 0, 0), p0 = coz(w0, g);
            const ent = L1 < 0 ? 1 : 0.35;
            if (fe < ent || ent >= 1) { const q = Math.min(1, fe / ent), pe = L1 < 0 ? polyAt(g.P, L1, w1.o || 0) : [pIn[0], pIn[1]]; p = [lerp(p0[0], pe[0], q), lerp(p0[1], pe[1], q)]; }
            else { const q = (fe - ent) / (1 - ent); p = polyAt(g.P, lerp(-10, L1, q), lerp(0, w1.o || 0, q)); }
          } else { const p0 = coz(w0, g), p1 = coz(w1, g); p = [lerp(p0[0], p1[0], fe), lerp(p0[1], p1[1], fe)]; }
        }
        const e = a.e;
        if (e.tagName === 'circle') yer(e, p[0], p[1]);
        else if (e.tagName === 'rect' && a.k !== 'ap') at(e, { x: r1(p[0] - +e.getAttribute('width') / 2), y: r1(p[1] - +e.getAttribute('height') / 2) });
        else at(e, { transform: `translate(${r1(p[0])} ${r1(p[1])})` });
        let op = 1;
        if (a.gizSon) op = s === 1 ? 1 - clamp((f - 0.6) / 0.4, 0, 1) : 0;
        if (a.gel === 1 && s === 1) op = clamp((f - 0.5) / 0.5, 0, 1);
        if (a.gel === 2) op = s < 2 ? 0 : s === 2 ? clamp((f - 0.4) / 0.6, 0, 1) : 1;
        if (a.k === 'bk' && s >= 3) op = 0.45;
        if (a.k === 'sm' && s === 1) e.setAttribute('r', r1(lerp(3, 7.5, clamp((f - 0.5) / 0.5, 0, 1))));
        if (a.k === 'sm' && s > 1) e.setAttribute('r', 7.5);
        gor(e, op);
      });
      /* bakteriyi saran lenfositler ve metastaz halkası */
      const bk = akt.find((a) => a.k === 'bk'), tm = akt.find((a) => a.k === 'tm');
      const sarOp = mod === 'bag' && s >= 2 ? (s === 2 ? clamp((f - 0.6) / 0.4, 0, 1) : 1) : 0;
      ref.sar.forEach((e, i) => {
        if (!bk) { gor(e, 0); return; }
        const p = coz(bk.w[2], g), a = i / 6 * 6.283;
        yer(e, p[0] + Math.cos(a) * 12, p[1] + Math.sin(a) * 9); gor(e, sarOp);
      });
      if (tm && s >= 3) { const p = coz(tm.w[3], g); yer(ref.met, p[0], p[1]); gor(ref.met, s === 3 ? clamp((f - 0.6) / 0.4, 0, 1) : 1); } else gor(ref.met, 0);
    };
    const nokYaz = () => {
      nok.innerHTML = CAP[mod].map((_, i) => `<button type="button" class="f39-nb" data-adim="${i + 1}" aria-label="Adım ${i + 1}" aria-current="${String(i + 1 === s)}">${i + 1}</button>`).join('');
      el.querySelector('[data-a="geri"]').disabled = s <= 1; el.querySelector('[data-a="ileri"]').disabled = s >= n();
    };
    const setS = (k, anim, yazma) => { s = clamp(k, 1, n()); f = anim && !RM ? 0 : 1; bek = 0; nokYaz(); if (!yazma) capYaz(el, CAP[mod][s - 1]); ciz(); };
    const oynBtn = () => { const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = oyn ? 'Duraklat' : 'Oynat'; b.setAttribute('aria-pressed', String(oyn)); } };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.m) { mod = b.dataset.m; basSec(el, 'm', mod); oyn = false; oynBtn(); kur(G === L.d); setS(1, true); return; }
      if (b.dataset.adim) { oyn = false; oynBtn(); setS(+b.dataset.adim, +b.dataset.adim > s); return; }
      if (b.dataset.a === 'geri') { oyn = false; oynBtn(); setS(s - 1, false); return; }
      if (b.dataset.a === 'ileri') { oyn = false; oynBtn(); setS(s + 1, true); return; }
      if (b.dataset.a === 'oyn') { oyn = !oyn; if (oyn && s >= n() && f >= 1) setS(1, true); oynBtn(); }
    });
    const dar = darIzle(el, kur);
    setS(1, true, true);
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (f < 1) { f = Math.min(1, f + dt / DUR[mod][s - 1]); ciz(); }
      else if (oyn) { bek += dt; if (bek >= 1.5) { if (s < n()) setS(s + 1, true); else { oyn = false; oynBtn(); } } }
    });
    return () => { stop(); dar(); };
  };

  /* =====================================================================
     4 · f39_kvk — taraf × yaklaşım × ultrason → iğne yolu ve torasik kanal riski (K1 s. 168)
     ===================================================================== */
  VIZ.f39_kvk = (el) => {
    const CAP = {
      ilk: '<b>Sol, alçak yaklaşım, ultrasonsuz.</b> İğne yolu torasik kanalın venöz açılım yerine yakın geçer; risk en yüksektir. Tarafı, yaklaşımı ve ultrasonu değiştirin. [[K1 s. 168]]',
      sub: '<b>Sol subklavyen.</b> Torasik kanal sol IJ ile subklavyen venin birleşim yerine çok yakındır; ponksiyonu şilotoraksa yol açabilir. [[K1 s. 168]]',
      yuk: '<b>Yüksek boyun yaklaşımı.</b> İJ\'ye yüksekten girmek iğneyi venöz açıdan ve torasik kanaldan uzak tutar. [[K1 s. 168]]',
      us: '<b>Ultrason eşliği.</b> Torasik kanal yaralanmasını önlemenin en önemli yolu kanülasyonu ultrason eşliğinde yapmaktır. [[K1 s. 168]]',
      sag: '<b>Sağ taraf.</b> Sağ IJ ve subklavyen venler torasik kanaldan uzaktır; bu yüzden yeğlenir. Enfeksiyon, hava embolisi, pnömotoraks ve arter ponksiyonu her iki tarafta da olası komplikasyonlardır. [[K1 s. 168]]',
    };
    const IG = { alc: [[300, 146], [243, 199]], yuk: [[306, 44], [245, 72]], sub: [[324, 248], [247, 215]] };
    let taraf = 'sol', yak = 'alc', us = 'yok', an = 1, t = 0, sz = 0;
    const hedef = () => { const [e, p] = IG[yak]; return taraf === 'sol' ? [e, p] : [[360 - e[0], e[1]], [360 - p[0], p[1]]]; };
    let cur = hedef(), from = cur, to = cur;
    const TK = 'M196 322 C 200 270, 214 200, 228 176 C 238 160, 258 166, 249 194 C 246 204, 241 210, 237 213';
    const ag = (x) => `<path class="f39-ven f39-ij" d="M${x} 30 L${x} 214"/>`;
    const svg = `<svg class="f39-svg f39-kv" viewBox="0 0 360 330" role="img" aria-label="Önden boyun ve üst göğüs şeması: internal juguler ve subklavyen venler, karotis arterler, torasik kanal, plevra ve iğne yolu">
      <defs>${okDef('f39-m-ig', 'f39-uc-i')}</defs>
      <text class="f39-ts" x="10" y="16">Sağ</text><text class="f39-ts" x="350" y="16" text-anchor="end">Sol</text>
      <path class="f39-plv" d="M18 330 Q 86 236 152 330 Z"/><path class="f39-plv" d="M208 330 Q 274 236 342 330 Z"/>
      <ellipse class="f39-havuz" cx="276" cy="318" rx="40" ry="10"/>
      <text class="f39-ts f39-h" x="86" y="320" text-anchor="middle">Plevra</text><text class="f39-ts f39-h" x="296" y="322" text-anchor="middle">Plevra</text>
      <rect class="f39-trk" x="168" y="40" width="24" height="290" rx="8"/>
      ${Array.from({ length: 13 }, (_, i) => `<line class="f39-hlk" x1="170" x2="190" y1="${54 + i * 21}" y2="${54 + i * 21}"/>`).join('')}
      <path class="f39-tir" d="M164 34 L196 34 L188 52 L172 52 Z"/>
      <path class="f39-art" d="M150 30 L150 250"/><path class="f39-art" d="M210 30 L210 250"/>
      ${ag(120)}${ag(240)}
      <path class="f39-ven" d="M14 226 L124 214"/><path class="f39-ven" d="M346 226 L236 214"/>
      <path class="f39-ven" d="M122 214 L160 286"/><path class="f39-ven" d="M238 214 L160 286"/><path class="f39-ven" d="M160 284 L160 330"/>
      <path class="f39-kmk" d="M24 190 L160 204"/><path class="f39-kmk" d="M336 190 L200 204"/>
      <path class="f39-kanal-h" d="${TK}"/><path class="f39-kanal f39-tdk" d="${TK}"/>
      <path class="f39-kanal f39-sdk" d="M108 224 L119 217"/>
      <g class="f39-usg"><ellipse class="f39-us-a" rx="40" ry="30"/><text class="f39-ts f39-acc" y="-34" text-anchor="middle">USG</text></g>
      <g class="f39-dam"></g>
      <line class="f39-sir2"/><line class="f39-igne2" marker-end="url(#f39-m-ig)"/>
      <text class="f39-ts f39-h" x="120" y="26" text-anchor="middle">İJ</text><text class="f39-ts f39-h" x="240" y="26" text-anchor="middle">İJ</text>
      <text class="f39-ts f39-h" x="30" y="182">Klavikula</text>
      <text class="f39-ts f39-h" x="12" y="246">Subklavyen v.</text><text class="f39-ts f39-h" x="348" y="246" text-anchor="end">Subklavyen v.</text>
      <text class="f39-ts f39-ok-t f39-h" x="214" y="264">Torasik kanal</text>
    </svg>`;
    el.innerHTML = `<div class="f39-ust f39-ust-k">
        <div class="f39-segk"><span>Taraf</span>${segHtml('Taraf', 'tr', [['sol', 'Sol'], ['sag', 'Sağ']], 'sol', 'f39-seg')}</div>
        <div class="f39-segk"><span>Ven / yaklaşım</span>${segHtml('Ven ve yaklaşım', 'yk', [['alc', 'İJ · alçak'], ['yuk', 'İJ · yüksek boyun'], ['sub', 'Subklavyen']], 'alc', 'f39-seg')}</div>
        <div class="f39-segk"><span>Ultrason</span>${segHtml('Ultrason', 'us', [['yok', 'Yok'], ['var', 'Var']], 'yok', 'f39-seg')}</div></div>
      <div class="f39-ikili f39-ikili-k"><div class="f39-sahne f39-sahne-kv">${svg}
        <div class="legend"><span><i class="f39-lj-ven"></i>ven</span><span><i class="f39-lj-art"></i>arter (karotis)</span><span><i class="f39-lj-lenf"></i>lenf kanalı</span></div></div>
        <div class="f39-risk"><div class="f39-risk-b">Torasik kanal yaralanma riski</div>
          <div class="f39-olc" role="img" aria-label="Risk"><span data-r="1">Düşük</span><span data-r="2">Orta</span><span data-r="3">Yüksek</span></div>
          <div class="f39-risk-a"><b class="f39-rv"></b> <span class="tag f39-onem" hidden>en önemli önlem</span></div>
          <div class="f39-silo" hidden><b>Şilotoraks:</b> torasik kanal ponksiyonunun sonucu</div>
          <p class="f39-oteki"><b>Öteki komplikasyonlar</b> (her iki tarafta): enfeksiyon, hava embolisi, pnömotoraks, arter ponksiyonu</p></div></div>`;
    const sv = el.querySelector('svg'), igne = sv.querySelector('.f39-igne2'), sir = sv.querySelector('.f39-sir2'), usg = sv.querySelector('.f39-usg'), damG = sv.querySelector('.f39-dam'), havuz = sv.querySelector('.f39-havuz');
    const NS = 'http://www.w3.org/2000/svg';
    const dam = Array.from({ length: 5 }, () => { const c = document.createElementNS(NS, 'circle'); at(c, { r: 3.2, class: 'f39-sut' }); damG.appendChild(c); return c; });
    const skor = () => taraf === 'sag' ? 1 : Math.max(1, 3 - (yak === 'yuk' ? 1 : 0) - (us === 'var' ? 1 : 0));
    const sizinti = () => taraf === 'sol' && skor() === 3;
    const ciz = () => {
      const q = ease(an), e = [lerp(from[0][0], to[0][0], q), lerp(from[0][1], to[0][1], q)], p = [lerp(from[1][0], to[1][0], q), lerp(from[1][1], to[1][1], q)];
      at(igne, { x1: r1(e[0]), y1: r1(e[1]), x2: r1(p[0]), y2: r1(p[1]) });
      const dx = e[0] - p[0], dy = e[1] - p[1], dl = Math.hypot(dx, dy) || 1;
      at(sir, { x1: r1(e[0]), y1: r1(e[1]), x2: r1(e[0] + dx / dl * 34), y2: r1(e[1] + dy / dl * 34) });
      at(usg, { transform: `translate(${r1(p[0])} ${r1(p[1])})` });
      const lk = sizinti() && an >= 1;
      const tip = to[1], pool = [276, 314];
      dam.forEach((d, i) => {
        if (!lk) { gor(d, 0); return; }
        const u = RM ? (i + 0.5) / 5 : fr(t / 2 + i / 5);
        yer(d, lerp(tip[0], pool[0] + (i - 2) * 6, u), lerp(tip[1], pool[1], u * u)); gor(d, RM ? 1 : u < 0.9 ? 1 : (1 - u) / 0.1);
      });
      const hv = lk ? (RM ? 1 : clamp(sz / 2, 0, 1)) : 0;
      at(havuz, { rx: r1(8 + 32 * hv), ry: r1(3 + 7 * hv) }); gor(havuz, hv);
    };
    const durum = () => {
      basSec(el, 'tr', taraf); basSec(el, 'yk', yak); basSec(el, 'us', us);
      const k = skor(), ad = ['', 'Düşük', 'Orta', 'Yüksek'][k];
      el.querySelectorAll('[data-r]').forEach((x) => x.classList.toggle('on', +x.dataset.r <= k));
      const olc = el.querySelector('.f39-olc'); olc.dataset.k = k; olc.setAttribute('aria-label', 'Risk: ' + ad);
      el.querySelector('.f39-rv').textContent = ad;
      el.querySelector('.f39-onem').hidden = us !== 'var';
      el.querySelector('.f39-silo').hidden = !sizinti();
      sv.classList.toggle('f39-us-on', us === 'var'); sv.classList.toggle('f39-sag-on', taraf === 'sag');
      capYaz(el, taraf === 'sag' ? CAP.sag : us === 'var' ? CAP.us : yak === 'yuk' ? CAP.yuk : yak === 'sub' ? CAP.sub : CAP.ilk);
    };
    const degis = () => {
      const q = ease(an);
      from = [[lerp(from[0][0], to[0][0], q), lerp(from[0][1], to[0][1], q)], [lerp(from[1][0], to[1][0], q), lerp(from[1][1], to[1][1], q)]];
      to = hedef(); an = RM ? 1 : 0; sz = 0; if (RM) from = to;
      durum(); ciz();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.tr) { taraf = b.dataset.tr; degis(); } else if (b.dataset.yk) { yak = b.dataset.yk; degis(); } else if (b.dataset.us) { us = b.dataset.us; degis(); }
    });
    const dar = darIzle(el, (n) => el.classList.toggle('f39-dar', n));
    durum(); ciz();
    const stop = RM ? () => {} : ticker(el, (dt) => { t += dt; if (an < 1) an = Math.min(1, an + dt / 0.8); else sz += dt; ciz(); });
    return () => { stop(); dar(); };
  };

  /* =====================================================================
     5 · f39_odem — zaman kaydırıcısı + parmak basısı: gode bırakandan sert ödeme (K1 s. 169)
     ===================================================================== */
  VIZ.f39_odem = (el) => {
    const CAP = {
      erk: '<b>Erken dönem.</b> Fazla sıvı gode bırakan ödem yapar: parmak basısı çukur bırakır. Zamanı ilerletin. [[K1 s. 169]]',
      gec: '<b>Geç dönem.</b> Zamanla inflamasyon dokuyu sertleştirir; ödem gode bırakmaz. Bu, o kolda noninvaziv kan basıncı ölçümünü engelleyebilir. [[K1 s. 169]]',
      akut: '<b>Akut lenfödem.</b> Transplantasyonda organ ya da doku lenfatik bağlantısını yitirir; toraks cerrahisinde torasik ve mediastinal lenfatikler çıkarılır ya da bozulur. [[K1 s. 169]]',
      kron: '<b>Kronik lenfödem.</b> Çoğunlukla lenf düğümlerinin çıkarıldığı kanser cerrahisinden, özellikle meme kanserinden sonra gelişir; ağrılı ve kozmetik olarak rahatsız edicidir. [[K1 s. 169]]',
    };
    const NEDEN = {
      akut: ['Akut lenfödem: nedenler', ['<b>Transplantasyon:</b> nakledilen organ/doku lenfatik bağlantısını kaybetmiştir', '<b>Toraks cerrahisi:</b> torasik ve mediastinal lenfatiklerin çıkarılması ya da bozulması']],
      kron: ['Kronik lenfödem: nedenler', ['Lenf düğümü çıkarılan kanser cerrahisi, özellikle meme kanseri', 'Ağrılı, kozmetik olarak rahatsız edici']],
    };
    const W = 340, B = 122, BUL = 34, CX = 170, TOP = B - BUL, IDLE = 46, KAS = 206;
    const R = rng(3939);
    const SV = Array.from({ length: 36 }, () => [20 + R() * 300, R()]);
    const LIF = Array.from({ length: 16 }, () => [26 + R() * 288, R(), R()]);
    const INF = Array.from({ length: 10 }, () => [30 + R() * 280, R()]);
    const deriY = (x, dent) => B - BUL * (1 - Math.pow((x - CX) / CX, 2)) + dent * Math.exp(-Math.pow((x - CX) / 22, 2));
    const icY = (x, dent, d) => { const top = deriY(x, dent) + 16; return top + d * (KAS - 8 - top); };
    let T = 0, neden = 'kron', pt = -1, dent = 0, D = 0, sonuc = '';
    const ikon = (k) => k === 'nibp'
      ? '<svg class="f39-ik" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="10" width="18" height="12" rx="3" class="f39-ik-c"/><path d="M22 16 C 28 16 26 26 30 26" class="f39-ik-c"/><circle cx="27" cy="9" r="4" class="f39-ik-c"/><line x1="3" y1="29" x2="29" y2="3" class="f39-ik-x"/></svg>'
      : '<svg class="f39-ik" viewBox="0 0 32 32" aria-hidden="true"><rect x="16" y="4" width="8" height="10" rx="2" class="f39-ik-c"/><line x1="20" y1="14" x2="20" y2="28" class="f39-ik-c"/><line x1="12" y1="8" x2="16" y2="8" class="f39-ik-c"/><line x1="3" y1="29" x2="29" y2="3" class="f39-ik-x"/></svg>';
    const svg = `<svg class="f39-svg f39-od" viewBox="0 0 ${W} 250" role="img" aria-label="Ekstremite deri ve deri altı doku kesiti; parmak basısıyla gode testi">
      <rect class="f39-kas-b" x="0" y="${KAS}" width="${W}" height="40" rx="6"/>
      <path class="f39-dalti"/><g class="f39-svg-sv"></g><g class="f39-svg-lif"></g><g class="f39-svg-inf"></g>
      <path class="f39-deri-b"/><path class="f39-deri-k"/>
      <g class="f39-parmak"><path class="f39-pm"/><path class="f39-tirnak"/></g>
      <text class="f39-ts f39-h" x="8" y="${B - 16}">Deri</text>
      <text class="f39-ts f39-h" x="10" y="${KAS - 10}">Deri altı doku</text>
      <text class="f39-ts" x="10" y="${KAS + 24}">Kas</text>
    </svg>`;
    el.innerHTML = `<div class="f39-ikili f39-ikili-o"><div class="f39-sahne f39-sahne-od">${svg}
        <label class="f39-rng"><span>Zaman</span><span class="f39-rng-s"><em>Erken</em><input type="range" min="0" max="100" value="0" aria-label="Zaman"><em>Geç</em></span></label>
        <div class="btn-row"><button type="button" class="btn" data-a="bas">Parmakla bas</button><span class="f39-sonuc" aria-live="polite"></span></div></div>
      <div class="f39-yan">${segHtml('Lenfödem türü', 'nd', [['akut', 'Akut'], ['kron', 'Kronik']], 'kron', 'f39-seg')}
        <div class="f39-kart f39-neden"></div>
        <div class="f39-kart f39-anes"><h4>Anestezi</h4>
          <div class="f39-anr f39-nibp">${ikon('nibp')}<span>Gode bırakmayan ödemde NIBP ölçülemeyebilir</span></div>
          <div class="f39-anr">${ikon('kan')}<span>Etkilenen ekstremiteye kanül yok: sıvı lenfödemi başlatabilir ya da ağırlaştırabilir (acil durum hariç)</span></div></div></div></div>`;
    const sv = el.querySelector('svg'), NS = 'http://www.w3.org/2000/svg';
    const c = (tag, a, p) => { const e = document.createElementNS(NS, tag); at(e, a); p.appendChild(e); return e; };
    const svE = SV.map(() => c('circle', { r: 3, class: 'f39-sv' }, sv.querySelector('.f39-svg-sv')));
    const lifE = LIF.map(() => c('path', { class: 'f39-lif2' }, sv.querySelector('.f39-svg-lif')));
    const infE = INF.map(() => c('circle', { r: 2.6, class: 'f39-inf' }, sv.querySelector('.f39-svg-inf')));
    const dalti = sv.querySelector('.f39-dalti'), deriB = sv.querySelector('.f39-deri-b'), deriK = sv.querySelector('.f39-deri-k'), pm = sv.querySelector('.f39-pm'), tirnak = sv.querySelector('.f39-tirnak');
    const rng2 = el.querySelector('input[type=range]'), sonucEl = el.querySelector('.f39-sonuc');
    LIF.forEach(([x, d], i) => { const y = icY(x, 0, 0.1 + d * 0.8); lifE[i].setAttribute('d', `M${r1(x - 14)} ${r1(y)} q 7 -6 14 0 t 14 0`); });
    const ciz = (tip) => {
      const tf = T / 100;
      const pts = []; for (let i = 0; i <= 34; i++) { const x = i * W / 34; pts.push([x, deriY(x, dent)]); }
      const ust = pts.map((p) => `${r1(p[0])} ${r1(p[1])}`).join(' L');
      const alt = pts.slice().reverse().map((p) => `${r1(p[0])} ${r1(p[1] + 10)}`).join(' L');
      deriB.setAttribute('d', `M${ust} L${alt} Z`); deriK.setAttribute('d', `M${ust} L${alt} Z`); deriK.style.opacity = r1(0.35 * tf * 100) / 100;
      dalti.setAttribute('d', `M${pts.map((p) => `${r1(p[0])} ${r1(p[1] + 10)}`).join(' L')} L${W} ${KAS} L0 ${KAS} Z`);
      SV.forEach(([x, d], i) => { yer(svE[i], x, icY(x, dent, d)); gor(svE[i], i / SV.length < 1 - 0.85 * tf ? 0.9 : 0); });
      lifE.forEach((e, i) => { e.style.opacity = r1(tf * 100) / 100; e.style.strokeWidth = r1(1 + 1.4 * tf); });
      INF.forEach(([x, d], i) => { yer(infE[i], x, icY(x, dent, 0.15 + d * 0.7)); gor(infE[i], clamp((tf - 0.2) / 0.5, 0, 1)); });
      const ty = tip === undefined ? IDLE : tip;
      pm.setAttribute('d', `M150 -10 L150 ${r1(ty - 16)} Q150 ${r1(ty)} 170 ${r1(ty)} Q190 ${r1(ty)} 190 ${r1(ty - 16)} L190 -10 Z`);
      tirnak.setAttribute('d', `M158 ${r1(ty - 30)} Q170 ${r1(ty - 36)} 182 ${r1(ty - 30)} L182 ${r1(ty - 16)} Q170 ${r1(ty - 12)} 158 ${r1(ty - 16)} Z`);
      el.querySelector('.f39-nibp').classList.toggle('on', T >= 50);
    };
    const nedenYaz = () => { const [b, l] = NEDEN[neden]; el.querySelector('.f39-neden').innerHTML = `<h4>${b}</h4><ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul>`; basSec(el, 'nd', neden); };
    let gecMi = false;
    rng2.addEventListener('input', () => {
      T = +rng2.value; const g = T >= 50;
      if (g !== gecMi) { gecMi = g; capYaz(el, g ? CAP.gec : CAP.erk); }
      if (pt < 0) { dent = 0; sonucEl.textContent = ''; }
      ciz();
    });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.nd) { neden = b.dataset.nd; nedenYaz(); capYaz(el, neden === 'akut' ? CAP.akut : CAP.kron); return; }
      if (b.dataset.a === 'bas') {
        const gode = T < 50; D = gode ? 22 : 4;
        sonuc = gode ? 'Gode bırakıyor' : 'Gode bırakmıyor · sert doku';
        if (RM) { dent = gode ? D : 0; sonucEl.textContent = sonuc; sonucEl.classList.toggle('sert', !gode); ciz(); return; }
        pt = 0; sonucEl.textContent = '';
      }
    });
    const dar = darIzle(el, (n) => el.classList.toggle('f39-dar', n));
    nedenYaz(); ciz();
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (pt < 0) return;
      pt += dt;
      const hedef = TOP + D, gode = T < 50;
      let tip;
      if (pt < 0.6) tip = lerp(IDLE, hedef, ease(pt / 0.6));
      else if (pt < 1.6) tip = hedef;
      else if (pt < 2.1) tip = lerp(hedef, IDLE, ease((pt - 1.6) / 0.5));
      else tip = IDLE;
      const temas = Math.max(0, tip - TOP);
      if (pt < 1.6) dent = temas;
      else if (gode) { dent = pt < 2.1 ? D : D * (1 - ease((pt - 2.1) / 2)); if (pt >= 1.7 && !sonucEl.textContent) { sonucEl.textContent = sonuc; sonucEl.classList.remove('sert'); } }
      else { dent = temas; if (pt >= 1.7 && !sonucEl.textContent) { sonucEl.textContent = sonuc; sonucEl.classList.add('sert'); } }
      ciz(tip);
      if (pt > 4.2) { pt = -1; dent = 0; ciz(); }
    });
    return () => { stop(); dar(); };
  };
})();
