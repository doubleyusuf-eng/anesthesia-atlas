/* Ek ders · Venöz dönüş, ortalama sistemik dolum basıncı ve kalp debisiyle ilişkisi · bileşenler
   Kaynak K2 s. 156–160 (K1 s. 163–165 çapraz). Tarif: docs/tasarim/fizek37.md.
   Modeller şematiktir; sayılar tarifteki denetim tablolarıyla aynıdır (bileşen altlarında belirtilir). */
(function () {
  'use strict';
  const { ticker, esc, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => { let r = Number(v.toFixed(d)); if (Object.is(r, -0)) r = 0; return r.toFixed(d).replace('.', ',').replace('-', '−'); };
  const fmtA = (v) => (Math.abs(v - Math.round(v)) < 0.05 ? fmt(Math.round(v), 0) : fmt(v, 1)); // 7 · 2,3
  const DAR_ESIK = 640;
  let UID = 0;
  const capYaz = (el, t) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c) c.innerHTML = REF(t); };
  const seg = (ad, key, opts, cur, cls = '') => `<div class="seg ${cls}" role="group" aria-label="${esc(ad)}">${opts.map(([v, l, k]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${k ? `<span class="fek37-uz">${l}</span><span class="fek37-kz">${k}</span>` : l}</button>`).join('')}</div>`;
  const bas = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const grp = (ad, html) => `<div class="fek37-grp"><span class="fek37-gl">${ad}</span>${html}</div>`;
  const yol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  // genişlik izleyici: dar/geniş değişince cb(dar)
  const genislik = (el, cb) => {
    let son = null;
    const bak = () => { const d = (el.clientWidth || 360) < DAR_ESIK; if (d !== son) { son = d; cb(d); } };
    bak();
    if (!('ResizeObserver' in window)) return () => {};
    const ro = new ResizeObserver(bak); ro.observe(el);
    return () => ro.disconnect();
  };
  // çoklu doğru boyunca konum
  const cizgi = (pts) => {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const len = L[L.length - 1];
    return { len, L, at(d) { d = ((d % len) + len) % len; let i = 1; while (i < L.length - 1 && L[i] < d) i++; const f = (d - L[i - 1]) / (L[i] - L[i - 1] || 1); return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; } };
  };
  // Türkçe ayrılma eki (93'ten, 4,1'den, 7'den)
  const ABL = ['dan', 'den', 'den', 'ten', 'ten', 'ten', 'dan', 'den', 'den', 'dan'];
  const ABL10 = { 1: 'dan', 2: 'den', 3: 'dan', 4: 'tan', 5: 'den', 6: 'tan', 7: 'ten', 8: 'den', 9: 'dan' };
  const abl = (s) => {
    const [ip, fp] = s.replace('−', '').split(',');
    const f = (fp || '').replace(/0+$/, '');
    if (f) return s + "'" + ABL[+f[f.length - 1]];
    const n = +ip;
    if (n === 0) return s + "'dan";
    if (n % 10) return s + "'" + ABL[n % 10];
    if (n % 100) return s + "'" + ABL10[(n % 100) / 10];
    return s + "'den";
  };
  const isaret = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v);

  /* ---------- ortak model ---------- */
  const KALP = { sifir: { P: 8, c: 1.6, w: 1.3 }, normal: { P: 13, c: 0.55, w: 1.173 }, azami: { P: 25, c: -0.2, w: 1.5 } };
  const kd = (r, h) => h.P / (1 + Math.exp(-(r - h.c) / h.w));
  const vr = (r, m, R) => {
    if (m <= 0 || r >= m) return 0;
    const v0 = m / R;
    if (r >= 0) return (m - r) / R;
    if (r > -4) return v0 * (1 + 0.2 * (1 - (1 + r / 4) ** 2));
    return 1.2 * v0;
  };
  const msfpOf = (dv, t) => Math.max(0, 7 * (1 + dv / 15) + t);
  const denge = (h, m, R) => {
    if (m <= 0) return null;
    let a = -8, b = m;
    for (let i = 0; i < 70; i++) { const x = (a + b) / 2; if (kd(x, h) - vr(x, m, R) < 0) a = x; else b = x; }
    const x = (a + b) / 2;
    return { x, y: kd(x, h) };
  };
  const TONUS = { dil: -2, normal: 0, azami: 10 };

  /* ================= 1 · Kalbi durdurun: MSFP ================= */
  VIZ.fek37_msfp = (el) => {
    const DIR = { dusuk: -20, normal: 0, yuksek: 20 };
    const S = { dv: 0, ton: 'normal', dir: 'normal', dur: false, s: 0, rozet: false };
    const uid = 'fek37-m' + ++UID;
    const G = {
      gen: { W: 620, H: 322, ax: 52, y0: 296, y20: 170, y100: 34, k: [140, 172, 26], art: [220, 46, 250, 54], ven: [196, 206, 320, 90], vx: 568, dirL: [556, 150],
        artL: [345, 32], venL: [356, 316] },
      dar: { W: 360, H: 446, ax: 40, y0: 404, y20: 246, y100: 50, k: [96, 238, 21], art: [140, 58, 176, 64], ven: [122, 292, 210, 112], vx: 342, dirL: [332, 206],
        artL: [228, 46], venL: [227, 432] },
    };
    let g, dar = false, R = {}, loop, artLen = 0, d = 0, tk = 0;
    const N = 18;
    const py = (p) => (p <= 20 ? g.y0 - (Math.max(0, p) / 20) * (g.y0 - g.y20) : g.y20 - ((Math.min(p, 100) - 20) / 80) * (g.y20 - g.y100));
    const model = () => {
      const m = msfpOf(S.dv, TONUS[S.ton]);
      if (m <= 0) return { m: 0, pa: 0, pv: 0, rap0: 0 };
      let pv = Math.max(0, m - 86 / 30), pa = 31 * m - 30 * pv; // normalde Pv 4,13 · Pa 93
      const dp = DIR[S.dir];
      if (dp) { pa += dp; pv = (31 * m - pa) / 30; if (pv < 0) { pv = 0; pa = 31 * m; } }
      return { m, pa, pv, rap0: Math.min(1, pv) };
    };
    const build = () => {
      g = dar ? G.dar : G.gen;
      const [kx, ky, kr] = g.k, [ax0, ay0, aw, ah] = g.art, [vx0, vy0, vw, vh] = g.ven;
      const ac = ay0 + ah / 2, vc = vy0 + vh / 2, X = g.vx;
      const pts = [[kx, ky - kr], [kx, ac], [X, ac], [X, vc], [kx, vc], [kx, ky + kr], [kx, ky - kr]];
      loop = cizgi(pts);
      artLen = (ac > 0 ? (ky - kr - ac) + (X - kx) + (vc - ac) / 2 : 0);
      const ok = (x, y, yon) => `<path class="fek37-ok-uc" d="${yon === 'u' ? `M${x - 6} ${y + 5} L${x} ${y - 5} L${x + 6} ${y + 5}` : yon === 'd' ? `M${x - 6} ${y - 5} L${x} ${y + 5} L${x + 6} ${y - 5}` : yon === 'r' ? `M${x - 5} ${y - 6} L${x + 5} ${y} L${x - 5} ${y + 6}` : `M${x + 5} ${y - 6} L${x - 5} ${y} L${x + 5} ${y + 6}`}"/>`;
      const vy = (ac + vc) / 2;
      el.innerHTML = `<div class="fek37-ctl">
          <button type="button" class="btn" data-a="kalp">Kalbi durdur</button>
          <label class="fek37-rng"><span>Kan hacmi <b data-o="dv">%0</b></span><input type="range" min="-15" max="15" step="5" value="${S.dv}" data-r="dv" aria-label="Kan hacmi değişimi" aria-valuetext="%${isaret(S.dv)}"></label>
          ${grp('Venomotor tonus', seg('Venomotor tonus', 'ton', [['dil', 'Venodilatasyon'], ['normal', 'Normal'], ['azami', 'Azami venokonstriksiyon']], S.ton))}
          ${grp('Toplam periferik direnç', seg('Toplam periferik direnç', 'dir', [['dusuk', 'Düşük'], ['normal', 'Normal'], ['yuksek', 'Yüksek']], S.dir))}
        </div>
        <div class="fek37-m-grid">
        <svg class="fek37-svg" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="İki bölmeli dolaşım: kalp, kompliyansı düşük arterler, kompliyansı yüksek venler ve periferik direnç; solda basınç ekseninde arter, ven basıncı ve MSFP">
          <defs><clipPath id="${uid}-v"><rect x="${vx0}" y="${vy0}" width="${vw}" height="${vh}" rx="26"/></clipPath><clipPath id="${uid}-a"><rect x="${ax0}" y="${ay0}" width="${aw}" height="${ah}" rx="6"/></clipPath></defs>
          <line class="fek37-ax" x1="${g.ax}" y1="${g.y0}" x2="${g.ax}" y2="${g.y100}"/>
          <path class="fek37-kirik" d="M${g.ax - 7} ${g.y20 + 3} l14 -5 M${g.ax - 7} ${g.y20 + 8} l14 -5"/>
          ${[0, 20, 50, 100].map((p) => `<line class="fek37-ax" x1="${g.ax - 4}" x2="${g.ax}" y1="${py(p)}" y2="${py(p)}"/><text class="fek37-tk" data-tk="${p}" x="${g.ax - 7}" y="${py(p) + 4}" text-anchor="end">${p}</text>`).join('')}
          <text class="fek37-tk" x="${g.ax}" y="${g.y100 - 12}" text-anchor="middle">mmHg</text>
          <path class="fek37-boru-a" d="${yol([[kx, ky - kr], [kx, ac], [X, ac], [X, vy]])}"/>
          <path class="fek37-boru-v" d="${yol([[X, vy], [X, vc], [kx, vc], [kx, ky + kr]])}"/>
          <rect class="fek37-art" x="${ax0}" y="${ay0}" width="${aw}" height="${ah}" rx="6"/>
          <rect class="fek37-artF" data-r="artF" x="${ax0}" width="${aw}" clip-path="url(#${uid}-a)"/>
          <rect class="fek37-art-d" x="${ax0}" y="${ay0}" width="${aw}" height="${ah}" rx="6"/>
          <rect class="fek37-ven" x="${vx0}" y="${vy0}" width="${vw}" height="${vh}" rx="26"/>
          <g clip-path="url(#${uid}-v)"><rect class="fek37-venG" x="${vx0}" y="${vy0 + vh - 16}" width="${vw}" height="16"/><rect class="fek37-venF" data-r="venF" x="${vx0}" width="${vw}"/></g>
          <rect class="fek37-ven-d" x="${vx0}" y="${vy0}" width="${vw}" height="${vh}" rx="26"/>
          <text class="fek37-tm" x="${vx0 + vw - 34}" y="${vy0 + vh - 4}" text-anchor="end">gerilimsiz hacim</text>
          <path class="fek37-vana" d="M${X - 9} ${vy - 14} L${X} ${vy - 3} L${X + 9} ${vy - 14} Z M${X - 9} ${vy + 14} L${X} ${vy + 3} L${X + 9} ${vy + 14} Z"/>
          <text class="fek37-t" x="${g.dirL[0]}" y="${g.dirL[1]}" text-anchor="end">periferik</text><text class="fek37-t" x="${g.dirL[0]}" y="${g.dirL[1] + 15}" text-anchor="end">direnç</text>
          ${ok(kx, (ky - kr + ac) / 2, 'u')}${ok((ax0 + aw + X) / 2, ac, 'r')}${ok(X, (vy + vc) / 2 + 6, 'd')}${ok((kx + vx0) / 2, vc, 'l')}
          <g data-r="par">${Array.from({ length: N }, () => '<circle r="3.4"/>').join('')}</g>
          <g data-r="kalp"><circle class="fek37-kalp" cx="${kx}" cy="${ky}" r="${kr}"/><text class="fek37-t fek37-tc" x="${kx}" y="${ky + 4.5}" text-anchor="middle">Kalp</text></g>
          <text class="fek37-t fek37-tv" data-r="rapT" x="${kx + kr + 8}" y="${ky + 5}"></text>
          <text class="fek37-t fek37-ta" x="${g.artL[0]}" y="${g.artL[1]}" text-anchor="middle">Arterler · kompliyans 1</text>
          <text class="fek37-t fek37-tv" x="${g.venL[0]}" y="${g.venL[1]}" text-anchor="middle">Venler · kompliyans 30</text>
          <text class="fek37-num fek37-halo" data-r="paN" x="${ax0 + aw / 2}" y="${ac + 5}" text-anchor="middle"></text>
          <text class="fek37-num fek37-halo" data-r="pvN" x="${vx0 + vw / 2}" y="${vc - 2}" text-anchor="middle"></text>
          <path class="fek37-m-msfp" data-r="mM"/><text class="fek37-tok" data-r="mT" x="${g.ax - 7}" text-anchor="end">MSFP</text>
          <path class="fek37-m-pa" data-r="paM"/><text class="fek37-tm fek37-ta" data-r="paT" x="${g.ax + 12}">Pa</text>
          <path class="fek37-m-pv" data-r="pvM"/><text class="fek37-tm fek37-tv" data-r="pvT" x="${g.ax + 12}">Pv</text>
        </svg>
        <dl class="fek37-oku fek37-m-oku">
          <div><dt>MSFP</dt><dd><span data-o="m"></span> <em class="fek37-rozet" data-o="deg" hidden>değişmedi</em></dd></div>
          <div><dt>RAP</dt><dd data-o="rap"></dd></div>
          <div><dt>Venöz dönüş gradyanı (MSFP − RAP)</dt><dd data-o="gr"></dd></div>
          <div><dt>Durum</dt><dd data-o="du"></dd></div>
        </dl>
        </div>
        <p class="fek37-formul">MSFP = (1·Pa + 30·Pv) / 31 <span data-o="fo"></span></p>`;
      R = {};
      el.querySelectorAll('[data-r],[data-o]').forEach((n) => { R[n.dataset.r || 'o_' + n.dataset.o] = n; });
      R.pc = [...R.par.querySelectorAll('circle')];
      R.tks = [...el.querySelectorAll('[data-tk]')];
      ciz();
    };
    const ciz = () => {
      const M = model(), s = S.s;
      const pa = lerp(M.pa, M.m, s), pv = lerp(M.pv, M.m, s), rap = lerp(M.rap0, M.m, s);
      const [ax0, ay0, aw, ah] = g.art, [, vy0, , vh] = g.ven;
      const aH = (ah - 6) * clamp(pa / 100, 0, 1);
      R.artF.setAttribute('y', ay0 + ah - aH); R.artF.setAttribute('height', aH);
      const vH = (vh - 22) * clamp(pv / 20, 0, 1);
      R.venF.setAttribute('y', vy0 + vh - 16 - vH); R.venF.setAttribute('height', vH);
      R.paN.textContent = `Pa ${fmt(pa, 0)} mmHg`;
      R.pvN.textContent = `Pv ${fmt(pv, 1)} mmHg`;
      R.rapT.textContent = `RAP ${fmt(rap, 1)} mmHg`;
      const ym = py(M.m), ya = py(pa), yv = py(pv), x = g.ax;
      R.mM.setAttribute('d', `M${x} ${ym - 6} L${x + 6} ${ym} L${x} ${ym + 6} L${x - 6} ${ym} Z`);
      R.mT.setAttribute('y', ym + 4);
      R.tks.forEach((t) => { t.style.opacity = Math.abs(py(+t.dataset.tk) - ym) < 13 ? 0 : 1; });
      R.paM.setAttribute('d', `M${x + 2} ${ya} L${x + 10} ${ya - 5} L${x + 10} ${ya + 5} Z`);
      R.pvM.setAttribute('d', `M${x + 2} ${yv} L${x + 10} ${yv - 5} L${x + 10} ${yv + 5} Z`);
      const yak = Math.abs(ya - yv) < 14;
      if (yak && s > 0.97) { R.paT.textContent = 'Pa = Pv'; R.paT.setAttribute('y', ya + 4); R.pvT.style.opacity = 0; }
      else { R.paT.textContent = 'Pa'; R.pvT.style.opacity = 1; R.paT.setAttribute('y', (yak ? Math.min(ya, yv) - 4 : ya + 4)); R.pvT.setAttribute('y', (yak ? Math.max(ya, yv) + 11 : yv + 4)); }
      R.o_m.textContent = `${fmtA(M.m)} mmHg`;
      R.o_deg.hidden = !S.rozet;
      R.o_rap.textContent = `${fmt(rap, 1)} mmHg`;
      R.o_gr.textContent = `${fmt(Math.max(0, M.m - rap), 1)} mmHg`;
      R.o_du.textContent = S.dur ? (s > 0.97 ? 'Kalp durdu · akım durdu' : 'Kalp durdu') : 'Kalp çalışıyor';
      R.o_fo.textContent = `= (${fmt(pa, 0)} + 30·${fmt(pv, 1)}) / 31 = ${fmtA(M.m)} mmHg`;
      R.o_dv.textContent = '%' + isaret(S.dv);
      el.querySelector('[data-a="kalp"]').textContent = S.dur ? 'Kalbi çalıştır' : 'Kalbi durdur';
      // parçacıklar ve kalp
      const akim = 1 - s;
      R.pc.forEach((c, i) => {
        const dd = ((d + (i * loop.len) / N) % loop.len + loop.len) % loop.len;
        const [px, pyy] = loop.at(dd);
        c.setAttribute('cx', px.toFixed(1)); c.setAttribute('cy', pyy.toFixed(1));
        c.setAttribute('class', dd < artLen ? 'fek37-pa' : 'fek37-pv');
        c.style.opacity = M.m > 0 ? 1 : 0.25;
      });
      const sc = 1 + 0.08 * akim * Math.pow(Math.max(0, Math.sin(tk * 2 * Math.PI * 1.1)), 2);
      const [kx, ky] = g.k;
      R.kalp.setAttribute('transform', `translate(${kx} ${ky}) scale(${sc.toFixed(3)}) translate(${-kx} ${-ky})`);
    };
    const capGuncel = (ne, ek) => {
      const M = model();
      if (ne === 'dur') {
        if (M.m <= 0) return capYaz(el, 'Kalp durdu; MSFP 0 mmHg: damarlarda gerilim yaratan hacim kalmadı, basınç her yerde sıfır. [[K2 s. 159]]');
        return capYaz(el, `Kalp durdu: kan arterlerden venlere geçti. Arter basıncı ${abl(fmt(ek.pa, 0))} ${fmtA(M.m)} mmHg'ye düştü, ven basıncı yalnız ${abl(fmt(ek.pv, 1))} ${fmtA(M.m)} mmHg'ye yükseldi; bütün damarlarda ölçülen bu statik basınç MSFP'dir. [[K2 s. 156]]`);
      }
      if (ne === 'calis') return capYaz(el, `Kalp yeniden çalışıyor: kanı venlerden arterlere taşıyıp basınç farkını kurar; MSFP ${fmtA(M.m)} mmHg, venöz dönüş gradyanı ${fmt(M.m - M.rap0, 1)} mmHg. [[K2 s. 156]]`);
      if (ne === 'dv') return capYaz(el, `Kan hacmi %${isaret(S.dv)}: MSFP ${fmtA(M.m)} mmHg. Kitabın örneğinde %15 artış MSFP'yi iki katına çıkarır, %15 azalma sıfıra indirir. [[K2 s. 159]]`);
      if (ne === 'ton') {
        if (S.ton === 'azami') return capYaz(el, "Venokonstriksiyon venlerin kompliyansını ve kapasitesini azaltır; azami sempatik deşarj MSFP'yi ≈ 17 mmHg'ye çıkarır. [[K2 s. 157, 159]]");
        if (S.ton === 'dil') return capYaz(el, "Venodilatasyon MSFP'yi düşürür ve venöz dönüş gradyanı küçülür. [[K2 s. 156]]");
        return capYaz(el, `Normal venomotor tonus: MSFP ${fmtA(M.m)} mmHg. [[K2 s. 156]]`);
      }
      if (ne === 'dir') return capYaz(el, "Toplam periferik direnç arter ve ven basınçlarının dağılımını değiştirir ama MSFP'yi değiştirmez. [[K2 s. 156]]");
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !el.contains(b) || b.classList.contains('ref')) return;
      if (b.dataset.a === 'kalp') {
        const M = model();
        S.dur = !S.dur; S.rozet = false;
        if (RM) S.s = S.dur ? 1 : 0;
        capGuncel(S.dur ? 'dur' : 'calis', { pa: M.pa, pv: M.pv });
      } else if (b.dataset.ton) { S.ton = b.dataset.ton; bas(el, 'ton', S.ton); S.rozet = false; capGuncel('ton'); }
      else if (b.dataset.dir) { S.dir = b.dataset.dir; bas(el, 'dir', S.dir); S.rozet = true; capGuncel('dir'); }
      else return;
      ciz();
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r="dv"]'); if (!r) return;
      S.dv = +r.value; S.rozet = false; r.setAttribute('aria-valuetext', '%' + isaret(S.dv)); capGuncel('dv'); ciz();
    });
    const ro = genislik(el, (x) => { dar = x; el.classList.toggle('fek37-dar', x); build(); });
    if (RM) return ro;
    const stop = ticker(el, (dt) => {
      tk += dt;
      if (S.dur && S.s < 1) { S.s = 1 - (1 - S.s) * Math.exp(-dt / 0.5); if (S.s > 0.99) S.s = 1; }
      if (!S.dur && S.s > 0) { S.s *= Math.exp(-dt / 0.5); if (S.s < 0.005) S.s = 0; }
      d += dt * 75 * (1 - S.s);
      ciz();
    });
    return () => { stop(); ro(); };
  };

  /* ================= 2 · Venöz dönüşün yardımcıları ================= */
  VIZ.fek37_pompa = (el) => {
    const SAH = {
      A: { ad: 'Kas pompası ve kapakçıklar', kz: 'Kas', faz: ['Kasılma', 'Gevşeme'],
        et: ['Kas kasılır → ven sıkışır → kan kalbe itilir', 'Kas gevşer → ven yeniden dolar; kapakçık geri akımı önler'], roz: [[], []],
        not: 'Ayakta ritmik kasılma bacak venöz basıncını ve hacmini azaltır; egzersizde venöz dönüş artar.',
        cap: 'İskelet kası pompası: kasılma venleri sıkıp kanı kalbe iter, gevşeme onları yeniden doldurur; tek yönlü kapakçıklar akımın yalnız kalbe doğru olmasını sağlar. [[K2 s. 156]]' },
      B: { ad: 'Solunum pompası', kz: 'Solunum', faz: ['İnspiryum', 'Ekspiryum'],
        et: ['Diyafram iner; plevra içi basınç −5 → −8 cmH₂O, karın içi basınç ↑: kan vena kavadan sağ atriyuma hızlanır', 'Diyafram yükselir; plevra içi basınç −5 cmH₂O, akım yavaşlar'],
        roz: [['Toraks kan hacmi +250 mL', 'Sağ ventrikül atım hacmi +20 mL', 'Sol ventrikül atım hacmi ↓ (pulmoner damar kapasitesi ↑)'], ['Etkiler tersine döner · sol ventrikül farkı yalnız ≈ %5']],
        not: 'Egzersizde etki artar; ama göğse giren venler kollabe olduğu için sınırlıdır.',
        cap: 'Solunum pompası: inspiryumda plevra içi basınç −5\'ten −8 cmH₂O\'ya düşer, diyafram karın içi basıncı artırır; toraks kan hacmi 250 mL, sağ ventrikül atım hacmi 20 mL artar, sol ventrikülünki azalır (≈ %5). [[K2 s. 156–157]]' },
      C: { ad: 'Ventrikül', kz: 'Ventrikül', faz: ['Hızlı ejeksiyon', 'Erken diyastol'],
        et: ['AV halka aşağı çekilir → atriyum genişler → basınç sıfıra ya da altına düşer → vena kavalar ve pulmoner venlerden akım artar', 'v dalgasının inişi: iki basınç da düşer, atriyuma akış kolaylaşabilir'], roz: [[], []],
        not: 'Ventrikül hem kasılırken hem gevşerken atriyumu “emer”; venöz dönüşe kalbin kendi katkısıdır.',
        cap: 'Hızlı ejeksiyonda AV fibröz halka aşağı çekilir, atriyum genişler ve basıncı sıfıra ya da altına iner; erken diyastolde ventrikül hızla dolarken iki basınç da düşer. [[K2 s. 157]]' },
      D: { ad: 'Venomotor tonus', kz: 'Tonus', faz: ['Düşük tonus', 'Sempatik uyarı (egzersiz, kan kaybı)'],
        et: ['Geniş, ince duvarlı, dairesel kesit; çok kan taşır · MSFP 7 mmHg', 'Düz kas kasılır: kompliyans ve kapasite ↓ → MSFP ↑ (azami ≈ 17 mmHg)'], roz: [[], []],
        not: 'Etki, venöz basınç normalken ve venler çok kan taşıyan dairesel kesitteyken daha büyüktür. Alt şerit: ven kesiti basınçla değişir; 12 mmHg üstünde dairesel, 4 mmHg\'de eliptik, 1 mmHg\'de çoğunlukla kollabe. [[K1 s. 165]]',
        cap: 'Venomotor tonus kompliyansı ve kapasiteyi azaltıp MSFP\'yi yükseltir; egzersizde ve kan kaybında sempatik sistemle refleks olarak artar. [[K2 s. 157]]' },
    };
    let sah = 'A', faz = 0, tf = 0, u = 0, oyna = !RM, R = {}, P = [];
    const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2146483646; }; })();
    el.innerHTML = `<div class="fek37-ctl">
        ${seg('Mekanizma', 's', Object.entries(SAH).map(([k, v]) => [k, v.ad, v.kz]), sah, 'fek37-sah')}
        <div class="fek37-row">${RM ? '' : '<button type="button" class="btn ghost" data-a="oyna">Duraklat</button>'}
        ${grp('Evre', seg('Evre', 'f', [[0, '1'], [1, '2']], 0))}</div>
      </div>
      <div class="fek37-p-grid">
        <svg class="fek37-svg fek37-p-svg" viewBox="0 0 360 262" role="img" aria-label="Venöz dönüşün yardımcı mekanizması, iki evreli şematik çizim"><g data-r="sahne"></g></svg>
        <div class="fek37-pn" aria-live="polite">
          <div class="fek37-faz"><b data-o="fn">1</b><span data-o="fa"></span></div>
          <p class="fek37-et" data-o="et"></p>
          <ul class="fek37-roz" data-o="roz"></ul>
          <p class="fek37-not" data-o="not"></p>
        </div>
      </div>`;
    el.querySelectorAll('[data-r],[data-o]').forEach((n) => { R[n.dataset.r || 'o_' + n.dataset.o] = n; });
    const NS = 'http://www.w3.org/2000/svg';
    const q = (s) => R.sahne.querySelector(s);
    const parc = (n) => { P = Array.from({ length: n }, () => ({ x: rnd() * 2 - 1, y: rnd(), c: null })); const g = q('[data-r="par"]'); P.forEach((p) => { p.c = document.createElementNS(NS, 'circle'); p.c.setAttribute('r', 3.3); p.c.setAttribute('class', 'fek37-pv'); g.appendChild(p.c); }); };
    const at = (c, x, y) => { c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); };

    /* --- sahne çizimleri: kur() iskelet, guncel(u, dt, k) durum --- */
    const SC = {
      A: {
        kur() {
          R.sahne.innerHTML = `<path class="fek37-p-ven" data-r="vd"/><path class="fek37-p-duvar" data-r="vl"/><path class="fek37-p-duvar" data-r="vr"/>
            <g data-r="kas"></g><g data-r="par"></g><g data-r="kap"></g>
            <path class="fek37-ok-uc" d="M174 20 L180 10 L186 20"/><text class="fek37-t fek37-tv" x="194" y="20">kalbe</text>
            <text class="fek37-t" x="86" y="126" text-anchor="end">baldır</text><text class="fek37-t" x="86" y="142" text-anchor="end">kası</text>
            <text class="fek37-tm" data-r="k1" x="206" y="62"></text><text class="fek37-tm" data-r="k2" x="206" y="214"></text>
            <text class="fek37-tm fek37-tv" x="194" y="256">ayaktan gelen kan</text>`;
          ['vd', 'vl', 'vr', 'kas', 'kap', 'k1', 'k2'].forEach((k) => { R[k] = q(`[data-r="${k}"]`); });
          parc(28);
        },
        hw(y, c) { return 15 - 7 * c * (y > 78 && y < 182 ? Math.sin((Math.PI * (y - 78)) / 104) : 0); },
        guncel(u, dt) {
          const c = 1 - u, L = [], Rr = [];
          for (let y = 22; y <= 246; y += 4) { const h = this.hw(y, c); L.push([180 - h, y]); Rr.push([180 + h, y]); }
          R.vl.setAttribute('d', yol(L)); R.vr.setAttribute('d', yol(Rr));
          R.vd.setAttribute('d', yol(L) + ' ' + yol(Rr.slice().reverse()).replace('M', 'L') + ' Z');
          const hm = this.hw(130, c), rx = 24 + 13 * c, ry = 60 - 8 * c;
          let kas = '';
          [-1, 1].forEach((sg) => { const cx = 180 + sg * (hm + rx + 3); kas += `<ellipse class="fek37-kas" cx="${cx}" cy="130" rx="${rx}" ry="${ry}"/><ellipse class="fek37-kas-l" cx="${cx}" cy="130" rx="${rx * 0.55}" ry="${ry * 0.82}"/><ellipse class="fek37-kas-l" cx="${cx}" cy="130" rx="${rx * 0.16}" ry="${ry * 0.6}"/>`; });
          R.kas.innerHTML = kas;
          const kap = (y, o) => { const h = this.hw(y, c); return [-1, 1].map((sg) => { const bx = 180 + sg * h, tx = 180 + sg * lerp(1.5, h - 3, o), ty = lerp(y - 3, y - 14, o); return `<path class="fek37-kapak" d="M${bx} ${y + 8} Q${180 + sg * h * 0.7} ${y} ${tx} ${ty}"/>`; }).join(''); };
          R.kap.innerHTML = kap(62, c) + kap(208, 1 - c);
          R.k1.textContent = 'kapakçık · ' + (c > 0.5 ? 'açık' : 'kapalı');
          R.k2.textContent = 'kapakçık · ' + (c > 0.5 ? 'kapalı' : 'açık');
          P.forEach((p) => {
            let y = 22 + p.y * 224;
            const vc = y < 62 ? 70 : y < 208 ? (70 * (208 - y)) / 146 : 0;
            const vrl = y < 62 ? 4 : (46 * (y - 62)) / 184;
            y -= (c * vc + (1 - c) * vrl) * dt;
            if (y < 22) y += 224;
            p.y = (y - 22) / 224;
            at(p.c, 180 + p.x * (this.hw(y, c) - 4.5), y);
          });
        },
      },
      B: {
        kur() {
          R.sahne.innerHTML = `<rect class="fek37-govde" x="90" y="6" width="180" height="250" rx="40"/>
            <ellipse class="fek37-akc" data-r="a1" cx="140" cy="76"/><ellipse class="fek37-akc" data-r="a2" cx="220" cy="76"/>
            <rect class="fek37-p-ven" x="172" y="104" width="16" height="152"/><g data-r="par"></g>
            <circle class="fek37-kalp" cx="180" cy="96" r="18"/><text class="fek37-tm fek37-tc" x="180" y="100" text-anchor="middle">SA</text>
            <path class="fek37-diyafram" data-r="dy"/><path class="fek37-ok-uc" data-r="dyo"/>
            <text class="fek37-t" x="4" y="58">Plevra içi</text><text class="fek37-num" data-r="pl" x="4" y="76"></text>
            <text class="fek37-tm" x="4" y="94">cmH₂O</text>
            <text class="fek37-tm" x="96" y="176">diyafram</text>
            <text class="fek37-t" data-r="ka" x="276" y="196">Karın içi</text><text class="fek37-t" data-r="kb" x="276" y="212">basınç ↑</text>
            <text class="fek37-tm fek37-tv" x="194" y="244">vena kava</text>`;
          ['a1', 'a2', 'dy', 'dyo', 'pl', 'ka', 'kb'].forEach((k) => { R[k] = q(`[data-r="${k}"]`); });
          parc(12);
        },
        guncel(u, dt) {
          const i = 1 - u, ap = lerp(100, 140, i);
          R.dy.setAttribute('d', `M90 150 Q180 ${ap} 270 150`);
          const ty = (150 + ap) / 2;
          R.dyo.setAttribute('d', `M173 ${ty + 6} L180 ${ty + 16} L187 ${ty + 6}`); R.dyo.style.opacity = i;
          [R.a1, R.a2].forEach((a) => { a.setAttribute('rx', lerp(28, 34, i)); a.setAttribute('ry', lerp(44, 50, i)); });
          R.pl.textContent = fmt(-5 - 3 * i, 1);
          R.ka.style.opacity = R.kb.style.opacity = 0.15 + 0.85 * i;
          const v = 25 + 80 * i;
          P.forEach((p) => { let y = 256 - p.y * 150; y -= v * dt; if (y < 108) y += 148; p.y = (256 - y) / 150; at(p.c, 180 + p.x * 3.5, y); });
        },
      },
      C: {
        kur() {
          R.sahne.innerHTML = `<rect class="fek37-p-ven" x="172" y="0" width="16" height="50"/>
            <text class="fek37-tm fek37-tv" x="196" y="16">vena kavalar</text>
            <text class="fek37-tm" x="164" y="16" text-anchor="end">aynı etki: pulmoner venler</text>
            <path class="fek37-oda" data-r="at"/><path class="fek37-oda" data-r="vn"/>
            <g data-r="par"></g>
            <line class="fek37-halka" data-r="hl" x1="100" x2="260"/><text class="fek37-tm" data-r="hlT" x="266">AV halka</text>
            <path class="fek37-ok-uc" data-r="hlO"/>
            <text class="fek37-t fek37-tc" data-r="atT" x="180" text-anchor="middle">Atriyum</text>
            <text class="fek37-t fek37-tc" data-r="vnT" x="180" text-anchor="middle">Ventrikül</text>
            <line class="fek37-ax" x1="52" x2="52" y1="70" y2="182"/><line class="fek37-sifir" x1="40" x2="64" y1="150" y2="150"/>
            <rect class="fek37-gost" data-r="gb" x="46" width="12"/>
            <text class="fek37-tk" x="36" y="154" text-anchor="end">0</text>
            <text class="fek37-tm" x="52" y="44" text-anchor="middle">atriyum</text><text class="fek37-tm" x="52" y="58" text-anchor="middle">basıncı</text>
            <text class="fek37-num" data-r="gv" x="52" y="202" text-anchor="middle"></text>
            <text class="fek37-tm" data-r="d1" x="262" y="214">iki basınç</text><text class="fek37-tm" data-r="d2" x="262" y="228">da düşer ↓</text>`;
          ['at', 'vn', 'hl', 'hlT', 'hlO', 'atT', 'vnT', 'gb', 'gv', 'd1', 'd2'].forEach((k) => { R[k] = q(`[data-r="${k}"]`); });
          parc(10);
        },
        guncel(u, dt, k) {
          const e = 1 - u, ry = 118 + 30 * e, aw = 58 + 8 * e;
          R.at.setAttribute('d', `M${180 - aw} ${ry} L${180 - aw} 62 Q${180 - aw} 48 ${180 - aw + 14} 48 L${180 + aw - 14} 48 Q${180 + aw} 48 ${180 + aw} 62 L${180 + aw} ${ry} Z`);
          const hw = 72 - 18 * e, apx = 244 - 30 * e;
          R.vn.setAttribute('d', `M${180 - hw} ${ry} Q${180 - hw} ${apx - 26} 180 ${apx} Q${180 + hw} ${apx - 26} ${180 + hw} ${ry} Z`);
          R.hl.setAttribute('y1', ry); R.hl.setAttribute('y2', ry); R.hlT.setAttribute('y', ry + 4);
          R.hlO.setAttribute('d', `M84 ${ry - 18} L84 ${ry - 6} M78 ${ry - 12} L84 ${ry - 4} L90 ${ry - 12}`); R.hlO.style.opacity = e;
          R.atT.setAttribute('y', (48 + ry) / 2 + 5); R.vnT.setAttribute('y', ry + 40);
          const p = faz === 0 ? 3 - 4 * k : 5 - 4 * k, yp = 150 - p * 12;
          R.gb.setAttribute('y', Math.min(150, yp)); R.gb.setAttribute('height', Math.abs(150 - yp));
          R.gb.setAttribute('class', p < 0 ? 'fek37-gost fek37-gost-n' : 'fek37-gost');
          R.gv.textContent = fmt(p, 0) + ' mmHg';
          R.d1.style.opacity = R.d2.style.opacity = u;
          const v = 30 + 60 * e;
          P.forEach((pp) => { let y = pp.y * 96; y += v * dt; if (y > 96) y -= 96; pp.y = y / 96; at(pp.c, 180 + pp.x * (y < 48 ? 4 : 30), y); pp.c.style.opacity = y > ry - 6 ? 0 : 1; });
        },
      },
      D: {
        kur() {
          R.sahne.innerHTML = `<circle class="fek37-kas-h" data-r="kh" cx="140" cy="104"/><circle class="fek37-p-ven fek37-p-duvar" data-r="vc" cx="140" cy="104"/>
            <g data-r="par"></g>
            <path class="fek37-boru-v" d="M226 104 L330 104"/><path class="fek37-ok-uc" d="M326 97 L336 104 L326 111"/>
            <text class="fek37-tm fek37-tv" x="276" y="94" text-anchor="middle">kalbe</text>
            <text class="fek37-t" x="236" y="34">kapasite</text><rect class="fek37-bar0" x="236" y="42" width="110" height="10" rx="5"/><rect class="fek37-bar" data-r="kp" x="236" y="42" height="10" rx="5"/>
            <text class="fek37-t" x="236" y="146">MSFP</text><text class="fek37-num" data-r="ms" x="236" y="166"></text>
            <text class="fek37-tm fek37-tc" data-r="kl" x="140" y="196" text-anchor="middle"></text>
            <ellipse class="fek37-p-ven fek37-p-duvar" cx="60" cy="228" rx="13" ry="13"/><ellipse class="fek37-p-ven fek37-p-duvar" cx="180" cy="228" rx="18" ry="8"/><path class="fek37-p-ven fek37-p-duvar" d="M278 226 Q300 220 322 226 L322 230 Q300 236 278 230 Z"/>
            <text class="fek37-tm" x="60" y="256" text-anchor="middle">&gt; 12 mmHg</text><text class="fek37-tm" x="180" y="256" text-anchor="middle">4 mmHg</text><text class="fek37-tm" x="300" y="256" text-anchor="middle">1 mmHg</text>`;
          ['kh', 'vc', 'kp', 'ms', 'kl'].forEach((k) => { R[k] = q(`[data-r="${k}"]`); });
          parc(22);
          P.forEach((p) => { const a = rnd() * 6.283, rr = Math.sqrt(rnd()); p.a = a; p.rr = rr; p.out = 0; });
        },
        guncel(u, dt) {
          const s = u, r = lerp(70, 44, s);
          R.vc.setAttribute('r', r); R.kh.setAttribute('r', r + 4);
          R.kh.style.strokeWidth = 1.5 + 5 * s; R.kh.style.opacity = 0.25 + 0.75 * s;
          R.kp.setAttribute('width', 110 * (r * r) / (70 * 70));
          R.ms.textContent = s > 0.5 ? '≈ 17 mmHg (azami)' : '7 mmHg';
          R.kl.textContent = s > 0.5 ? 'düz kas kasılır' : 'ince duvar, düşük tonus';
          // daralan kesitten taşan parçacıklar kalbe doğru akar
          const sigan = (r - 6) / 70, akis = faz === 1 && s < 0.98;
          P.forEach((p, i) => {
            if (p.rr > sigan + 0.05 && akis) p.out = Math.max(p.out, 0.001);
            if (p.out > 0) { p.out += dt * 90; const x = 140 + r + p.out; if (x > 330 || faz === 0) { p.out = 0; } else { at(p.c, x, 104 + ((i % 5) - 2) * 4); p.c.style.opacity = 1; return; } }
            const rr = Math.min(p.rr, sigan);
            at(p.c, 140 + Math.cos(p.a) * rr * (r - 6), 104 + Math.sin(p.a) * rr * (r - 6));
          });
        },
      },
    };
    const panel = () => {
      const S = SAH[sah];
      R.o_fn.textContent = String(faz + 1);
      R.o_fa.textContent = S.faz[faz];
      R.o_et.textContent = S.et[faz];
      R.o_roz.innerHTML = S.roz[faz].map((t) => `<li>${esc(t)}</li>`).join('');
      R.o_roz.hidden = !S.roz[faz].length;
      R.o_not.innerHTML = REF(S.not);
      bas(el, 'f', faz);
    };
    const kurSahne = () => { SC[sah].kur(); u = faz; SC[sah].guncel(u, 0, RM ? 1 : 0); panel(); };
    const fazAyarla = (f) => { faz = f; tf = 0; if (RM) u = f; panel(); SC[sah].guncel(u, 0, RM ? 1 : 0); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.classList.contains('ref')) return;
      if (b.dataset.s) { sah = b.dataset.s; bas(el, 's', sah); faz = 0; tf = 0; kurSahne(); capYaz(el, SAH[sah].cap); }
      else if (b.dataset.f !== undefined) { oyna = false; const ob = el.querySelector('[data-a="oyna"]'); if (ob) ob.textContent = 'Oynat'; fazAyarla(+b.dataset.f); }
      else if (b.dataset.a === 'oyna') { oyna = !oyna; b.textContent = oyna ? 'Duraklat' : 'Oynat'; }
    });
    const ro = genislik(el, (x) => el.classList.toggle('fek37-dar', x));
    kurSahne();
    if (RM) return ro;
    const stop = ticker(el, (dt) => {
      if (oyna) { tf += dt; if (tf > 2.5) { faz = 1 - faz; tf = 0; panel(); } } else tf += dt;
      u += (faz - u) * Math.min(1, dt * 4.5);
      SC[sah].guncel(u, dt, clamp(tf / 1.6, 0, 1));
    });
    return () => { stop(); ro(); };
  };

  /* ================= 3 · Guyton'ın deneyleri: iki eğri ================= */
  VIZ.fek37_egri = (el) => {
    const AD = { sifir: 'Sıfır', normal: 'Normal', azami: 'Azami' };
    const S = { gor: 'kd', rap: 0, sym: 'normal', lo: 0, hi: 0, ilk: true };
    let dar = false, R = {}, G, d = 0, yolA, yolB;
    const N = 14;
    const sx = (v) => G.X0 + ((v - G.xa) / (G.xb - G.xa)) * (G.X1 - G.X0);
    const sy = (v) => G.Y0 - (v / G.yb) * (G.Y0 - G.Y1);
    const egriYol = (f, a, b, n = 120) => { const p = []; for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n; p.push([sx(x), sy(f(x))]); } return yol(p); };
    const eksen = (xt, yt, xl, yl) => `${yt.map((v) => `<line class="fek37-grid" x1="${G.X0}" x2="${G.X1}" y1="${sy(v)}" y2="${sy(v)}"/><text class="fek37-tk" x="${G.X0 - 7}" y="${sy(v) + 4}" text-anchor="end">${v}</text>`).join('')}
      ${xt.map((v) => `<line class="fek37-grid" y1="${G.Y0}" y2="${G.Y1}" x1="${sx(v)}" x2="${sx(v)}"/><text class="fek37-tk" x="${sx(v)}" y="${G.Y0 + 17}" text-anchor="middle">${fmt(v, 0)}</text>`).join('')}
      <line class="fek37-ax" x1="${G.X0}" x2="${G.X1}" y1="${G.Y0}" y2="${G.Y0}"/><line class="fek37-ax" x1="${G.X0}" x2="${G.X0}" y1="${G.Y0}" y2="${G.Y1}"/>
      <text class="fek37-t" x="${(G.X0 + G.X1) / 2}" y="${G.Y0 + 36}" text-anchor="middle">${xl}</text>
      <text class="fek37-t" transform="translate(${G.X0 - 36} ${(G.Y0 + G.Y1) / 2}) rotate(-90)" text-anchor="middle">${yl}</text>`;
    const build = () => {
      const W = dar ? 360 : 760, H = dar ? 540 : 350;
      const ox = dar ? 24 : 0, oy = dar ? 26 : 92; // şema kutusu (300×200) yeri
      const kdG = S.gor === 'kd';
      G = dar ? { X0: 56, X1: 344, Y1: 256, Y0: 484 } : { X0: 386, X1: 746, Y1: 22, Y0: 288 };
      Object.assign(G, kdG ? { xa: -4, xb: 12, yb: 25 } : { xa: -8, xb: 8, yb: 8 });
      let sema = '', graf = '';
      if (kdG) {
        // rezervuar düzeneği
        sema = `<text class="fek37-t" x="0" y="-10">Rezervuar yüksekliği → RAP</text>
          <line class="fek37-ax" x1="20" x2="20" y1="14" y2="180"/>
          <line class="fek37-sifir" x1="14" x2="180" y1="110" y2="110"/><text class="fek37-tm" data-r="sd" x="100" y="126">SA düzeyi (0)</text>
          <path class="fek37-boru-v" data-r="tb"/>
          <rect class="fek37-rez" data-r="rz" x="30" width="60" height="30" rx="4"/><rect class="fek37-rezS" data-r="rzS" x="32" width="56" rx="2"/>
          <text class="fek37-tm fek37-tv" data-r="rzT" x="96"></text>
          <g data-r="par">${Array.from({ length: N }, () => '<circle class="fek37-pv" r="3.2"/>').join('')}</g>
          <circle class="fek37-kalp" cx="200" cy="110" r="22"/><text class="fek37-tm fek37-tc" x="200" y="114" text-anchor="middle">SA</text>
          <path class="fek37-boru-a" d="M222 110 L282 110"/><path class="fek37-ok-uc" d="M280 103 L290 110 L280 117"/>
          <text class="fek37-tm fek37-tc" data-r="kdT" x="290" y="82" text-anchor="end"></text>`;
        const H3 = ['azami', 'normal', 'sifir'];
        graf = `${eksen([-4, 0, 4, 8, 12], [0, 5, 10, 15, 20, 25], 'Sağ atriyum basıncı (mmHg)', 'Kalp debisi (L/dk)')}
          <rect class="fek37-band" x="${sx(4)}" width="${G.X1 - sx(4)}" y="${sy(15)}" height="${sy(10) - sy(15)}"/>
          <text class="fek37-tm fek37-tc" x="${sx(4) + 6}" y="${sy(15) + 13}">plato 10–15 L/dk</text>
          ${H3.map((h) => `<path class="fek37-kd" data-h="${h}" d="${egriYol((x) => kd(x, KALP[h]), -4, 12)}"/>`).join('')}
          ${dar ? '' : `<text class="fek37-tm fek37-tc" data-hl="azami" x="${G.X1}" y="${sy(25) + 16}" text-anchor="end">Azami sempatik tonus · plato 20–30 L/dk</text>
          <text class="fek37-tm fek37-tc" data-hl="normal" x="${G.X1}" y="${sy(13) - 7}" text-anchor="end">Normal</text>
          <text class="fek37-tm fek37-tc" data-hl="sifir" x="${G.X1}" y="${sy(8) - 7}" text-anchor="end">Sıfır sempatik tonus</text>`}
          <circle class="fek37-nok-k" cx="${sx(0)}" cy="${sy(5)}" r="3.5"/><text class="fek37-tm" x="${sx(0) - 7}" y="${sy(5) - 6}" text-anchor="end">5 L/dk</text>
          <path class="fek37-kil" data-r="kil"/><circle class="fek37-nok" data-r="nk" r="6"/>`;
      } else {
        // sağ kalp baypas düzeneği
        sema = `<rect class="fek37-p-ven" x="0" y="104" width="40" height="12"/><text class="fek37-tm fek37-tv" x="0" y="142">Vena kavalar</text>
          <rect class="fek37-oda" x="40" y="94" width="36" height="32" rx="6"/><text class="fek37-tm fek37-tc" x="58" y="114" text-anchor="middle">SA</text>
          <path class="fek37-boru-v" data-r="tb"/><path class="fek37-kolT" data-r="kol"/>
          <line class="fek37-sifir" x1="76" x2="190" y1="110" y2="110"/>
          <path class="fek37-cift" data-r="rc"/><text class="fek37-tm fek37-tv" data-r="rcT" x="132"></text>
          <g data-r="par">${Array.from({ length: N }, () => '<circle class="fek37-pv" r="3.2"/>').join('')}</g>
          <circle class="fek37-pompa" cx="200" cy="180" r="15"/><path class="fek37-pompa-k" d="M192 180 L208 180 M200 172 L208 180 L200 188"/>
          <text class="fek37-tm" x="200" y="210" text-anchor="middle">Pompa · −10 ile −20 mmHg emiş</text>
          <rect class="fek37-olcer" x="193" y="54" width="76" height="44" rx="6"/><text class="fek37-tk" x="231" y="71" text-anchor="middle">akım ölçer</text>
          <text class="fek37-num" data-r="ao" x="231" y="90" text-anchor="middle"></text>
          <path class="fek37-ok-uc" d="M224 14 L231 4 L238 14"/><text class="fek37-tm fek37-tv" x="240" y="16">Pulmoner arter</text>`;
        graf = `${eksen([-8, -4, 0, 4, 8], [0, 2, 4, 6, 8], 'Sağ atriyum basıncı (mmHg)', 'Venöz dönüş (L/dk)')}
          <rect class="fek37-bolge" x="${sx(-8)}" width="${sx(-4) - sx(-8)}" y="${G.Y1}" height="${G.Y0 - G.Y1}"/>
          <rect class="fek37-bolge2" x="${sx(-4)}" width="${sx(0) - sx(-4)}" y="${G.Y1}" height="${G.Y0 - G.Y1}"/>
          <path class="fek37-vr-s" d="${egriYol((x) => vr(x, 7, 1.4), -8, 7)}"/>
          <path class="fek37-vr" data-r="iz"/>
          <text class="fek37-tm fek37-tc fek37-halo" x="${sx(-7.7)}" y="${sy(6) - 9}">6 L/dk (+%20)</text>
          <text class="fek37-t" x="${sx(-6)}" y="${sy(4.3)}" text-anchor="middle">Plato</text>
          <text class="fek37-t" x="${sx(-2)}" y="${sy(3.6)}" text-anchor="middle">Geçiş</text><text class="fek37-t" x="${sx(-2)}" y="${sy(3.6) + 15}" text-anchor="middle">bölgesi</text>
          <text class="fek37-t" x="${sx(3.6)}" y="${sy(3.4)}">İniş kolu</text>
          <circle class="fek37-nok-k" cx="${sx(0)}" cy="${sy(5)}" r="3.5"/><text class="fek37-tm" x="${sx(0) + 7}" y="${sy(5) - 7}">5 L/dk</text>
          <path class="fek37-m-msfp" d="M${sx(7)} ${G.Y0 - 7} L${sx(7) + 6} ${G.Y0} L${sx(7)} ${G.Y0 + 7} L${sx(7) - 6} ${G.Y0} Z"/>
          <text class="fek37-tok" x="${sx(7)}" y="${G.Y0 - 12}" text-anchor="middle">MSFP 7 mmHg</text>
          <path class="fek37-kil" data-r="kil"/><circle class="fek37-nok fek37-nok-v" data-r="nk" r="6"/>`;
      }
      const maxR = kdG ? 12 : 8;
      S.rap = Math.min(S.rap, maxR);
      el.innerHTML = `<div class="fek37-ctl">
          ${seg('Görünüm', 'g', [['kd', 'Kalp debisi eğrisi', 'Kalp debisi'], ['vr', 'Venöz dönüş eğrisi (baypas)', 'Venöz dönüş']], S.gor)}
          <label class="fek37-rng"><span>Sağ atriyum basıncı <b data-o="rv"></b></span><input type="range" min="-8" max="${maxR}" step="0.5" value="${S.rap}" data-r="rap" aria-label="Sağ atriyum basıncı"></label>
          ${kdG ? grp('Sempatik tonus', seg('Sempatik tonus', 'h', [['sifir', 'Sıfır'], ['normal', 'Normal'], ['azami', 'Azami']], S.sym)) : ''}
        </div>
        <svg class="fek37-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${kdG ? 'Kalp debisi eğrisi: sağ atriyum basıncına göre kalp debisi, üç sempatik tonus düzeyi; solda rezervuar düzeneği' : 'Venöz dönüş eğrisi: sağ kalp baypas düzeneği ve sağ atriyum basıncına göre venöz dönüş'}">
          <g transform="translate(${ox} ${oy})">${sema}</g>${graf}
        </svg>
        ${kdG && dar ? `<div class="fek37-lej"><span class="fek37-lk" data-hl="azami"><i></i>Azami sempatik (plato 20–30 L/dk)</span><span class="fek37-lk" data-hl="normal"><i></i>Normal</span><span class="fek37-lk" data-hl="sifir"><i></i>Sıfır sempatik tonus</span></div>` : ''}
        <p class="fek37-durum" data-o="du"></p>
        ${kdG ? '' : '<p class="fek37-denk"><b>VR = (MSFP − RAP) / R</b><span>R: venöz dönüşe karşı direnç (direnç + kapasitans)</span></p>'}`;
      R = {};
      el.querySelectorAll('[data-r],[data-o]').forEach((n) => { R[n.dataset.r || 'o_' + n.dataset.o] = n; });
      R.pc = [...el.querySelectorAll('[data-r="par"] circle')];
      R.ox = ox; R.oy = oy;
      ciz(true);
    };
    const ciz = (capDa) => {
      const x = S.rap, kdG = S.gor === 'kd';
      R.o_rv.textContent = `${fmt(x, 1)} mmHg`;
      el.querySelector('[data-r="rap"]').setAttribute('aria-valuetext', `${fmt(x, 1)} mmHg`);
      let y;
      if (kdG) {
        y = kd(x, KALP[S.sym]);
        el.querySelectorAll('[data-h]').forEach((p) => p.classList.toggle('on', p.dataset.h === S.sym));
        el.querySelectorAll('[data-hl]').forEach((p) => p.classList.toggle('on', p.dataset.hl === S.sym));
        const yr = 110 - 8 * x;
        R.rz.setAttribute('y', yr - 4); R.rzS.setAttribute('y', yr); R.rzS.setAttribute('height', 24);
        R.rzT.setAttribute('y', yr + 14); R.rzT.textContent = `RAP ${fmt(x, 1)}`;
        R.sd.style.opacity = Math.abs(x) < 2.5 ? 0 : 1;
        const tp = [[60, yr + 26], [60, 190], [200, 190], [200, 132]];
        R.tb.setAttribute('d', yol(tp)); yolA = cizgi(tp);
        R.kdT.textContent = `KD ${fmt(y, 1)} L/dk`;
        R.o_du.textContent = 'Yükselen kol çok dik: RAP\'deki küçük değişiklik debiyi çok değiştirir.';
        if (capDa) capYaz(el, `${AD[S.sym]} sempatik tonusta RAP ${fmt(x, 1)} mmHg'de kalp debisi ${fmt(y, 1)} L/dk. Normalde RAP 0'da 5 L/dk; RAP 4 mmHg'de 10–15 L/dk'lık platoya ulaşır, azami sempatik uyarıda plato 20–30 L/dk'dır.${S.ilk ? ' Bu büyük pompalama rezervi yüzünden kalp, debisini Frank–Starling mekanizmasıyla venöz dönüşe uydurur.' : ''} [[K2 s. 157–158]]`);
      } else {
        y = vr(x, 7, 1.4);
        S.lo = Math.min(S.lo, x); S.hi = Math.max(S.hi, x);
        R.iz.setAttribute('d', egriYol((v) => vr(v, 7, 1.4), S.lo, Math.min(7, S.hi), 80));
        const yt = 110 - 8 * x, kolabe = x < -4;
        const tp = [[76, 110], [96, 110], [96, yt], [176, yt], [176, 180], [185, 180]];
        R.tb.setAttribute('d', yol(tp)); yolB = cizgi([[0, 110], ...tp, [215, 180], [231, 180], [231, 4]]);
        R.kol.setAttribute('d', kolabe ? `M100 ${yt - 5} Q136 ${yt - 1} 172 ${yt - 5} M100 ${yt + 5} Q136 ${yt + 1} 172 ${yt + 5}` : `M100 ${yt - 5} L172 ${yt - 5} M100 ${yt + 5} L172 ${yt + 5}`);
        R.rc.setAttribute('d', Math.abs(x) < 0.6 ? '' : `M126 110 L126 ${yt} M121 ${yt + (x > 0 ? 7 : -7)} L126 ${yt} L131 ${yt + (x > 0 ? 7 : -7)}`);
        R.rcT.setAttribute('y', Math.abs(x) < 2 ? Math.min(110, yt) - 10 : (110 + yt) / 2 + 4);
        R.rcT.textContent = `RAP ${fmt(x, 1)}`;
        R.ao.textContent = `${fmt(y, 1)} L/dk`;
        R.o_du.textContent = x >= 7 ? 'Akım durdu · bütün damarlarda basınç eşit = MSFP' : kolabe ? 'Toraks dışı venler kollabe · Starling direnci' : x < 0 ? 'Geçiş bölgesi: toraks dışı venler kollabe olmaya başlar' : 'İniş kolu: dönüş, MSFP − RAP farkıyla orantılı';
        if (capDa) {
          if (x >= 7) capYaz(el, "RAP 7 mmHg'ye çıkarılınca venöz dönüş sıfırlanır, dolaşım durur ve kan kapasitans venlerinde toplanır: bu basınç MSFP'dir. [[K2 s. 158]]");
          else if (x >= 0) capYaz(el, `RAP ${fmt(x, 1)} mmHg: venöz dönüş = (7 − ${fmt(x, 1)}) / 1,4 = ${fmt(y, 1)} L/dk. Bu aralıkta dönüş, MSFP ile RAP arasındaki farkla orantılıdır. [[K2 s. 158]]`);
          else if (x > -4) capYaz(el, `RAP sıfırın altında doğrusallık bozulur: toraks dışı venler kollabe olmaya başlar; venöz dönüş ${fmt(y, 1)} L/dk. [[K2 s. 158]]`);
          else capYaz(el, "Plato: venöz dönüş RAP 0 değerinin %20 üstünde (6 L/dk) kalır; toraks dışı ven basıncı −4 mmHg'nin altına inemez. Pompayı güçlendirip yalnız RAP'yi düşürmek debiyi pek artırmaz. [[K2 s. 158]]");
        }
      }
      const vis = x >= G.xa;
      const px = sx(Math.max(x, G.xa)), pyy = sy(Math.min(y, G.yb));
      R.nk.setAttribute('cx', px); R.nk.setAttribute('cy', pyy); R.nk.style.opacity = vis ? 1 : 0;
      R.kil.setAttribute('d', vis ? `M${G.X0} ${pyy} L${px} ${pyy} L${px} ${G.Y0}` : '');
      parcCiz(y);
    };
    const parcCiz = (y) => {
      const L = S.gor === 'kd' ? yolA : yolB; if (!L) return;
      R.pc.forEach((c, i) => { const [a, b] = L.at(d + (i * L.len) / N); c.setAttribute('cx', a.toFixed(1)); c.setAttribute('cy', b.toFixed(1)); c.style.opacity = y > 0.05 ? 1 : 0.35; });
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.classList.contains('ref')) return;
      if (b.dataset.g) { if (S.gor === b.dataset.g) return; S.gor = b.dataset.g; build(); }
      else if (b.dataset.h) { S.sym = b.dataset.h; bas(el, 'h', S.sym); S.ilk = false; ciz(true); }
    });
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="rap"]'); if (!r) return; S.rap = +r.value; S.ilk = false; ciz(true); });
    const ro = genislik(el, (x) => { dar = x; el.classList.toggle('fek37-dar', x); build(); });
    if (RM) return ro;
    const stop = ticker(el, (dt) => {
      const y = S.gor === 'kd' ? kd(S.rap, KALP[S.sym]) : vr(S.rap, 7, 1.4);
      d += dt * (8 + 9 * y);
      parcCiz(y);
    });
    return () => { stop(); ro(); };
  };

  /* ================= 4 · Guyton diyagramı: denge noktası ================= */
  VIZ.fek37_denge = (el) => {
    const RV = { '0.5': 0.7, '1': 1.4, '1.2': 1.7, '2': 2.8 };
    const RAD = { '0.5': '½R', '1': 'R', '1.2': '1,2R', '2': '2R' };
    const HAZ = {
      normal: { ad: 'Normal', k: 'normal', dv: 0, ton: 'normal', r: '1', cap: "Normal eğriler RAP 0 mmHg ve 5 L/dk'da kesişir. Venöz dönüş ile kalp debisi birkaç atımdan uzun süre farklı kalamaz. [[K2 s. 159–160]]" },
      hiper: { ad: 'Hipervolemi', k: 'normal', dv: 15, ton: 'normal', r: '1', cap: "Kan hacmi %15 artınca MSFP 7'den 14 mmHg'ye çıkar; VR eğrisi paralel olarak sağa kayar ve denge daha yüksek RAP'de, daha yüksek debidedir. [[K2 s. 159]]" },
      hipo: { ad: 'Hipovolemi', k: 'normal', dv: -10, ton: 'normal', r: '1', cap: "Kan hacmi %10 azalınca MSFP düşer, VR eğrisi sola kayar ve debi belirgin azalır; %15 kayıpta MSFP sıfıra iner. [[K2 s. 159]]" },
      hiposym: { ad: 'Hipovolemi + sempatik', k: 'normal', dv: -15, ton: 'azami', r: '1.2', cap: "Sempatik venokonstriksiyon kapasitans damarlarını daraltıp MSFP'yi yükseltir; hipovolemi kompansasyonunda bu mekanizma önemlidir. Modelde %15 kayıpta MSFP 0'dan ≈ 10 mmHg'ye çıkar, debi normale yaklaşır. [[K2 s. 159]]" },
      yarim: { ad: 'Direnç ½R', k: 'normal', dv: 0, ton: 'normal', r: '0.5', cap: 'Venöz dönüşe karşı direnç yarıya inince eğri MSFP çevresinde saat yönünde döner, venöz dönüş artar; egzersizde kas metabolitlerinin yaptığı vazodilatasyon böyle etkir. [[K2 s. 159]]' },
      iki: { ad: 'Direnç 2R', k: 'normal', dv: 0, ton: 'normal', r: '2', cap: 'Direnç iki katına çıkınca eğri saat yönünün tersine döner ve venöz dönüş azalır; MSFP değişmez. [[K2 s. 159]]' },
      spinal: { ad: 'Yüksek spinal', k: 'sifir', dv: 0, ton: 'dil', r: '1', cap: 'Yaygın sempatik blokta kontraktilite azalır (kalp eğrisi sağa kayar), kapasitans damarları genişler (MSFP düşer, VR eğrisi sola kayar); kalp debisi ≈ %40 azalır. [[K2 s. 160]]' },
      azami: { ad: 'Azami sempatik', k: 'azami', dv: 0, ton: 'azami', r: '1.2', cap: "Azami sempatik uyarıda MSFP ≈ 17 mmHg'ye çıkar ve kalp eğrisi yükselir; debi daha düşük RAP'de yaklaşık iki katına çıkar. Artışın çoğu pompadan değil, VR eğrisinin kaymasındandır. [[K2 s. 160]]" },
    };
    const S = { haz: 'normal', k: 'normal', dv: 0, ton: 'normal', r: '1' };
    const hedef = () => ({ m: msfpOf(S.dv, TONUS[S.ton]), R: RV[S.r], ...KALP[S.k] });
    let C = hedef(), A = null, at = 0, dar = false, R = {}, G, okT = 0, donT = 0, okFrom = 7, timers = [];
    const sx = (v) => G.X0 + ((v + 4) / 22) * (G.X1 - G.X0);
    const sy = (v) => G.Y0 - (v / 26) * (G.Y0 - G.Y1);
    const egri = (f, a, b, n = 140) => { const p = []; for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n; p.push([sx(x), sy(Math.min(26, f(x)))]); } return yol(p); };
    const build = () => {
      const W = dar ? 360 : 600, H = dar ? 404 : 386;
      G = dar ? { X0: 52, X1: 346, Y1: 16, Y0: 352 } : { X0: 66, X1: 590, Y1: 18, Y0: 334 };
      const uid = 'fek37-d' + ++UID;
      const nh = KALP.normal;
      const nd = { x: 0, y: 5 };
      el.innerHTML = `<div class="fek37-ctl">
          ${grp('Hazır durum', seg('Hazır durum', 'hz', Object.entries(HAZ).map(([k, v]) => [k, v.ad]), S.haz, 'fek37-haz'))}
          <details class="fek37-ayr"${dar ? '' : ' open'}><summary>Ayrıntılı ayar</summary><div class="fek37-ayr-i">
            <label class="fek37-rng"><span>Kan hacmi <b data-o="dv"></b></span><input type="range" min="-15" max="15" step="1" value="${S.dv}" data-r="dv" aria-label="Kan hacmi değişimi"></label>
            ${grp('Venomotor tonus', seg('Venomotor tonus', 'ton', [['dil', 'Venodilatasyon'], ['normal', 'Normal'], ['azami', 'Azami']], S.ton))}
            ${grp('Venöz dönüşe karşı direnç', seg('Venöz dönüşe karşı direnç', 'rr', [['0.5', '½R'], ['1', 'R'], ['1.2', '1,2R'], ['2', '2R']], S.r))}
            ${grp('Kalp işlevi', seg('Kalp işlevi', 'k', [['sifir', 'Sıfır sempatik'], ['normal', 'Normal'], ['azami', 'Azami sempatik']], S.k))}
            <button type="button" class="btn ghost fek37-yalniz" data-a="yalniz">Yalnız kalbi güçlendir</button>
          </div></details>
        </div>
        <div class="fek37-d-grid">
        <svg class="fek37-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Guyton diyagramı: kalp debisi eğrisi ile venöz dönüş eğrisi aynı grafikte; kesişme noktası denge RAP ve kalp debisini verir">
          <defs><clipPath id="${uid}-c"><rect x="${G.X0}" y="${G.Y1 - 2}" width="${G.X1 - G.X0}" height="${G.Y0 - G.Y1 + 4}"/></clipPath></defs>
          ${[0, 5, 10, 15, 20, 25].map((v) => `<line class="fek37-grid" x1="${G.X0}" x2="${G.X1}" y1="${sy(v)}" y2="${sy(v)}"/><text class="fek37-tk" x="${G.X0 - 7}" y="${sy(v) + 4}" text-anchor="end">${v}</text>`).join('')}
          ${[-4, 0, 4, 8, 12, 16].map((v) => `<line class="fek37-grid" y1="${G.Y0}" y2="${G.Y1}" x1="${sx(v)}" x2="${sx(v)}"/><text class="fek37-tk" x="${sx(v)}" y="${G.Y0 + 17}" text-anchor="middle">${fmt(v, 0)}</text>`).join('')}
          <line class="fek37-ax" x1="${G.X0}" x2="${G.X1}" y1="${G.Y0}" y2="${G.Y0}"/><line class="fek37-ax" x1="${G.X0}" x2="${G.X0}" y1="${G.Y0}" y2="${G.Y1}"/>
          <text class="fek37-t" x="${(G.X0 + G.X1) / 2}" y="${G.Y0 + 36}" text-anchor="middle">Sağ atriyum basıncı (mmHg)</text>
          <text class="fek37-t" transform="translate(${G.X0 - 36} ${(G.Y0 + G.Y1) / 2}) rotate(-90)" text-anchor="middle">${dar ? 'KD ya da VR (L/dk)' : 'Kalp debisi ya da venöz dönüş (L/dk)'}</text>
          <g clip-path="url(#${uid}-c)">
            <path class="fek37-kd fek37-hay" d="${egri((x) => kd(x, nh), -4, 18)}"/>
            <path class="fek37-vr fek37-hay" d="${egri((x) => vr(x, 7, 1.4), -4, 7)}"/>
            <path class="fek37-kd on" data-r="kdE"/><path class="fek37-vr" data-r="vrE"/>
          </g>
          <circle class="fek37-nd" cx="${sx(nd.x)}" cy="${sy(nd.y)}" r="5"/><text class="fek37-tm fek37-halo" x="${sx(nd.x) - 8}" y="${sy(nd.y) + 18}" text-anchor="end">Normal denge</text>
          <g data-r="kay" class="fek37-gecici"><path class="fek37-cift fek37-cift-v" data-r="kayO"/><text class="fek37-tm fek37-tv" data-r="kayT" text-anchor="middle">paralel kayma</text></g>
          <g data-r="don" class="fek37-gecici"><path class="fek37-cift fek37-cift-v" data-r="donO"/><text class="fek37-tm fek37-tv" data-r="donT" text-anchor="middle">eğim döner, MSFP yerinde</text></g>
          <path class="fek37-m-msfp" data-r="mM"/><text class="fek37-tok fek37-halo" data-r="mT"></text>
          <path class="fek37-kil" data-r="kil"/><circle class="fek37-denge" data-r="dn" r="7"/>
          <text class="fek37-dlab" data-r="dT"></text>
        </svg>
        <div class="fek37-d-yan">
          <dl class="fek37-oku">
            <div><dt>MSFP</dt><dd data-o="m"></dd></div><div><dt>R</dt><dd data-o="r"></dd></div>
            <div><dt>Denge RAP</dt><dd data-o="x"></dd></div><div><dt>Denge KD</dt><dd data-o="y"></dd></div>
            <div><dt>Normale göre</dt><dd data-o="n"></dd></div>
          </dl>
          <div class="fek37-lej fek37-lej-d"><span class="fek37-lk on" data-hl="x"><i></i>Kalp debisi</span><span class="fek37-lv"><i></i>Venöz dönüş</span><span class="fek37-ld"><i></i>Denge</span><span class="fek37-lh"><i></i>Normal (hayalet)</span></div>
        </div>
        </div>`;
      R = {};
      el.querySelectorAll('[data-r],[data-o]').forEach((n) => { R[n.dataset.r || 'o_' + n.dataset.o] = n; });
      ciz();
      okGoster();
    };
    const ciz = () => {
      const h = { P: C.P, c: C.c, w: C.w };
      R.kdE.setAttribute('d', egri((x) => kd(x, h), -4, 18));
      R.vrE.setAttribute('d', C.m > 0 ? egri((x) => vr(x, C.m, C.R), -4, Math.min(18, C.m)) : `M${sx(-4)} ${sy(0)} L${sx(18)} ${sy(0)}`);
      const mx = Math.min(C.m, 18), xm = sx(mx);
      R.mM.setAttribute('d', `M${xm} ${G.Y0 - 7} L${xm + 6} ${G.Y0} L${xm} ${G.Y0 + 7} L${xm - 6} ${G.Y0} Z`);
      const mTxt = C.m > 18 ? `MSFP ${fmtA(C.m)} mmHg →` : `MSFP ${fmtA(C.m)} mmHg`;
      R.mT.textContent = mTxt;
      // sağda yer varsa kesişmenin sağına (orada VR eğrisi yok), yoksa soluna
      const sagaSigar = xm + 10 + mTxt.length * 7.4 < G.X1;
      R.mT.setAttribute('y', G.Y0 - 8);
      R.mT.setAttribute('x', sagaSigar ? xm + 10 : xm - 10); R.mT.setAttribute('text-anchor', sagaSigar ? 'start' : 'end');
      const D = denge(h, C.m, C.R);
      if (D) {
        const px = sx(D.x), py = sy(D.y);
        R.dn.setAttribute('cx', px); R.dn.setAttribute('cy', py); R.dn.style.opacity = 1;
        R.kil.setAttribute('d', `M${G.X0} ${py} L${px} ${py} L${px} ${G.Y0}`);
        const t = `Denge · RAP ${fmt(D.x, 1)} · KD ${fmt(D.y, 1)}`;
        R.dT.textContent = t;
        const sag = px > (G.X0 + G.X1) / 2;
        R.dT.setAttribute('text-anchor', sag ? 'end' : 'start');
        R.dT.setAttribute('x', sag ? px - 12 : px + 12);
        R.dT.setAttribute('y', py < G.Y1 + 30 ? py + 22 : py - 12);
        R.o_x.textContent = `${fmt(D.x, 2)} mmHg`; R.o_y.textContent = `${fmt(D.y, 2)} L/dk`;
        const oran = D.y / 5;
        R.o_n.textContent = Math.abs(oran - 1) < 0.005 ? 'aynı' : oran >= 1.5 ? `×${fmt(oran, 1)}` : `%${oran > 1 ? '+' : '−'}${Math.round(Math.abs(oran - 1) * 100)}`;
      } else {
        R.dn.style.opacity = 0; R.kil.setAttribute('d', '');
        R.dT.textContent = 'Dolaşım durdu'; R.dT.setAttribute('x', sx(2)); R.dT.setAttribute('y', sy(3)); R.dT.setAttribute('text-anchor', 'start');
        R.o_x.textContent = '—'; R.o_y.textContent = '0 L/dk'; R.o_n.textContent = '%−100';
      }
      R.o_m.textContent = `${fmt(C.m, 2)} mmHg`;
      R.o_r.textContent = `${RAD[S.r]} · ${fmt(RV[S.r], 1)} mmHg·dk/L`;
      R.o_dv.textContent = '%' + isaret(S.dv);
      const dvr = el.querySelector('[data-r="dv"]'); if (dvr) dvr.setAttribute('aria-valuetext', '%' + isaret(S.dv));
    };
    const okGoster = () => {
      const T = hedef();
      // paralel kayma oku: VR = 3 L/dk düzeyinde eski → yeni
      if (okT) {
        const x1 = okFrom - 3 * T.R, x2 = T.m - 3 * T.R, y = sy(3) + 18;
        R.kayO.setAttribute('d', `M${sx(x1)} ${y} L${sx(x2)} ${y} M${sx(x2) + (x2 > x1 ? -7 : 7)} ${y - 5} L${sx(x2)} ${y} L${sx(x2) + (x2 > x1 ? -7 : 7)} ${y + 5}`);
        R.kayT.setAttribute('x', (sx(x1) + sx(x2)) / 2); R.kayT.setAttribute('y', y + 16);
      }
      R.kay.classList.toggle('on', !!okT);
      if (donT && T.m > 0 && T.m <= 18) {
        const cx = sx(T.m), cy = G.Y0, r = 34;
        R.donO.setAttribute('d', `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx - r * 0.5} ${cy - r * 0.87} M${cx - r * 0.5 - 8} ${cy - r * 0.87 - 2} L${cx - r * 0.5} ${cy - r * 0.87} L${cx - r * 0.5 - 4} ${cy - r * 0.87 + 7}`);
        const sag = cx > G.X1 - 90;
        R.donT.setAttribute('x', sag ? cx - 40 : cx + 10); R.donT.setAttribute('y', cy - r - 12); R.donT.setAttribute('text-anchor', sag ? 'end' : 'middle');
      }
      R.don.classList.toggle('on', !!donT);
    };
    const gecis = (onceki) => {
      const T = hedef();
      const mDeg = Math.abs(T.m - onceki.m) > 0.01, rDeg = Math.abs(T.R - onceki.R) > 0.01;
      timers.forEach(clearTimeout); timers = [];
      okT = mDeg ? 1 : 0; donT = rDeg && !mDeg ? 1 : 0; okFrom = onceki.m;
      okGoster();
      if (okT || donT) timers.push(setTimeout(() => { okT = 0; donT = 0; okGoster(); }, 1300));
      if (RM) { C = T; ciz(); return; }
      A = { from: { ...C }, to: T }; at = 0;
    };
    const genelCap = () => {
      const T = hedef(), D = denge({ P: T.P, c: T.c, w: T.w }, T.m, T.R);
      if (!D) return capYaz(el, 'MSFP sıfır: venöz dönüşü itecek basınç kalmadı, dolaşım durur. [[K2 s. 159]]');
      capYaz(el, `MSFP ${fmtA(T.m)} mmHg, R ${fmt(T.R, 1)}: denge RAP ${fmt(D.x, 1)} mmHg, kalp debisi ${fmt(D.y, 1)} L/dk. MSFP eğriyi paralel kaydırır, direnç eğimi döndürür, kalp işlevi kalp eğrisini değiştirir. [[K2 s. 159–160]]`);
    };
    const kontrolSenk = () => {
      bas(el, 'hz', S.haz); bas(el, 'ton', S.ton); bas(el, 'rr', S.r); bas(el, 'k', S.k);
      const r = el.querySelector('[data-r="dv"]'); if (r) r.value = S.dv;
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.classList.contains('ref')) return;
      const onceki = hedef();
      if (b.dataset.hz) { const H = HAZ[b.dataset.hz]; Object.assign(S, { haz: b.dataset.hz, k: H.k, dv: H.dv, ton: H.ton, r: H.r }); kontrolSenk(); gecis(onceki); capYaz(el, H.cap); return; }
      if (b.dataset.a === 'yalniz') { Object.assign(S, { haz: '', k: 'azami', dv: 0, ton: 'normal', r: '1' }); kontrolSenk(); gecis(onceki); capYaz(el, 'Yalnız kalp güçlenirse RAP düşer ama VR platoya takılır; venöz dönüş artmadıkça debi pek artmaz. [[K2 s. 158]]'); return; }
      if (b.dataset.ton) S.ton = b.dataset.ton; else if (b.dataset.rr) S.r = b.dataset.rr; else if (b.dataset.k) S.k = b.dataset.k; else return;
      S.haz = ''; kontrolSenk(); gecis(onceki); genelCap();
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r="dv"]'); if (!r) return;
      const onceki = hedef(); S.dv = +r.value; S.haz = ''; bas(el, 'hz', ''); gecis(onceki); genelCap(); if (A) { /* kaydırıcıda akıcı: kısa geçiş */ } ciz();
    });
    const ro = genislik(el, (x) => { dar = x; el.classList.toggle('fek37-dar', x); build(); });
    const temiz = () => { timers.forEach(clearTimeout); ro(); };
    if (RM) return temiz;
    const stop = ticker(el, (dt) => {
      if (!A) return;
      at = Math.min(1, at + dt / 0.6);
      const f = 1 - Math.pow(1 - at, 3);
      C = {}; for (const k of ['m', 'R', 'P', 'c', 'w']) C[k] = lerp(A.from[k], A.to[k], f);
      if (at >= 1) { C = { ...A.to }; A = null; }
      ciz();
    });
    return () => { stop(); temiz(); };
  };
})();
