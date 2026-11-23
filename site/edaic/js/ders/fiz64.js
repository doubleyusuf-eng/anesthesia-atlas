/* Bölüm 64 · Gastrointestinal sindirim ve emilim · bileşenler (K1 s. 289–294).
   Bütün şekiller dar (360 genişlikli) tek yerleşimle çizilir; geniş ekranda aynı şekil ölçeklenir.
   Hareketli noktalar rAF ile (ticker) çizilir; azaltılmış harekette son durum durağan gösterilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
  const n1 = (v) => Math.round(v * 10) / 10;
  const tx = (x, y, s, cls = '', anc = 'middle') => `<text x="${n1(x)}" y="${n1(y)}" text-anchor="${anc}" class="f64-t ${cls}">${s}</text>`;
  const lines = (x, y, arr, cls, anc, lh = 13) => arr.map((s, i) => tx(x, y + i * lh, s, cls, anc)).join('');
  const rc = (x, y, w, h, cls, rx = 6) => `<rect x="${n1(x)}" y="${n1(y)}" width="${n1(w)}" height="${n1(h)}" rx="${rx}" class="${cls}"/>`;
  const kap = (x, y, w, label, cls = '') => `<g class="f64-kap ${cls}"><rect x="${n1(x - w / 2)}" y="${n1(y - 9)}" width="${w}" height="18" rx="9"/><text x="${n1(x)}" y="${n1(y + 4)}" text-anchor="middle">${label}</text></g>`;
  const ln = (x1, y1, x2, y2, cls) => `<line x1="${n1(x1)}" y1="${n1(y1)}" x2="${n1(x2)}" y2="${n1(y2)}" class="${cls}"/>`;
  const hexP = (x, y, r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 3 * i + Math.PI / 6; return n1(x + r * Math.cos(a)) + ',' + n1(y + r * Math.sin(a)); }).join(' ');
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const NAV = '<div class="btn-row f64-nav"><button type="button" class="btn ghost" data-nav="-1">← Geri</button><span class="f64-cnt"></span><button type="button" class="btn" data-nav="1">İleri →</button></div>';
  const legend = (arr) => `<div class="legend">${arr.map(([c, l]) => `<span><i style="background:${c}"></i>${l}</span>`).join('')}</div>`;
  const vizCap = (el) => el.closest('.viz').querySelector('.viz-cap');
  const setCap = (el, html) => { const c = vizCap(el); if (c) c.innerHTML = REF(html); };
  /* adım denetimi: set(i) çağrılır; son adımda İleri "Baştan" olur */
  function wireNav(el, n, set, sig) {
    let i = 0;
    const cnt = el.querySelector('.f64-cnt'), geri = el.querySelector('[data-nav="-1"]'), ileri = el.querySelector('[data-nav="1"]');
    const upd = () => { cnt.textContent = (i + 1) + ' / ' + n; geri.disabled = i === 0; ileri.textContent = i === n - 1 ? 'Baştan' : 'İleri →'; };
    const go = (k) => { i = clamp(k, 0, n - 1); upd(); set(i); };
    geri.addEventListener('click', () => go(i - 1), sig);
    ileri.addEventListener('click', () => go(i === n - 1 ? 0 : i + 1), sig);
    upd();
    return { go, get: () => i };
  }
  /* çokgen üzerinde konum */
  function onPath(pts, f) {
    let L = 0; const d = [];
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); d.push(l); L += l; }
    let s = clamp(f, 0, 1) * L;
    for (let i = 0; i < d.length; i++) {
      if (s <= d[i] || i === d.length - 1) { const q = d[i] ? s / d[i] : 0; return [lerp(pts[i][0], pts[i + 1][0], q), lerp(pts[i][1], pts[i + 1][1], q)]; }
      s -= d[i];
    }
    return pts[0];
  }
  /* akış: kesikli yol + okbaşı + hareketli noktalar. fl = {pts, col, n, spd, r, op} (op 0 ise çizilmez) */
  function flowStr(flows, t) {
    let s = '';
    flows.forEach((fl) => {
      const op = fl.op === undefined ? 1 : fl.op;
      if (!op) return;
      const p = fl.pts, a = p[p.length - 2], b = p[p.length - 1];
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), ax = (r) => n1(b[0] + r * Math.cos(ang)), ay = (r) => n1(b[1] + r * Math.sin(ang));
      const px = (r, k) => n1(b[0] + r * Math.cos(ang) + k * Math.sin(ang)), py = (r, k) => n1(b[1] + r * Math.sin(ang) - k * Math.cos(ang));
      s += `<g opacity="${op}" style="color:${fl.col}"><polyline points="${p.map((q) => n1(q[0]) + ',' + n1(q[1])).join(' ')}" class="f64-fl" stroke="currentColor"/>`
        + `<polygon points="${ax(0)},${ay(0)} ${px(-7, 3.5)},${py(-7, 3.5)} ${px(-7, -3.5)},${py(-7, -3.5)}" fill="currentColor"/>`;
      const n = fl.n === undefined ? 3 : fl.n, spd = fl.spd || 0.3;
      for (let i = 0; i < n; i++) {
        const ph = RM ? (i + 0.5) / n : (t * spd + i / n) % 1;
        const q = onPath(p, ph);
        s += `<circle cx="${n1(q[0])}" cy="${n1(q[1])}" r="${fl.r || 3.4}" fill="currentColor"/>`;
      }
      s += '</g>';
    });
    return s;
  }
  const ARC = { aktif: 'var(--accent-ink)', na: 'var(--c-basic)', h: 'var(--crit)', hco3: 'var(--accent)', cl: 'var(--c-clin)', su: 'var(--muted)', kh: 'var(--accent)', prot: 'var(--ok)', yag: 'var(--warn)' };

  /* ======================================================================
     1 · f64_yapi — kanaldan mikrovillusa
     ====================================================================== */
  VIZ.f64_yapi = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const CAP = {
      1: '<b>1 · Kanal.</b> Ağız, özofagus, mide, ince ve kalın bağırsak. Yardımcı organlar: dişler ve dil yiyeceği tükürükle karıştırır; tükürük bezleri, karaciğer, safra kesesi ve pankreas kimyasal ve enzimatik parçalama için salgı yapar. Bir bölüme dokunun ya da yakınlaştırın. [[K1 s. 289]]',
      duo: '<b>Duodenum.</b> Demir burada emilir; pankreas kanalı ve safra buraya açılır. [[K1 s. 289, 291]]',
      jej: '<b>Jejunum.</b> Diyet besinlerinin çoğu burada emilir. [[K1 s. 289]]',
      ile: '<b>Terminal ileum.</b> B12 vitamini ve safra tuzları burada emilir; safra tuzları karaciğere döner. [[K1 s. 289, 291]]',
      yag: '<b>Yağ ve su.</b> İnce bağırsağın her yerinde emilir. [[K1 s. 289]]',
      yard: '<b>Yardımcı organlar.</b> Dişler ve dil ilk karıştırmayı yapar; tükürük bezleri, karaciğer, safra kesesi ve pankreas sindirim salgıları yapar. [[K1 s. 289]]',
      2: '<b>2 · Duvar.</b> Dıştan içe adventisya, muskularis eksterna, submukoza, mukoza. Mukoza lümene valvulae conniventes denen katlantılar yapar. Bir tabakaya dokunun. [[K1 s. 289]]',
      adv: '<b>Adventisya.</b> En dış tabaka; gevşek bağ dokusu. [[K1 s. 289]]',
      musc: '<b>Muskularis eksterna.</b> Dışta longitudinal, içte sirküler düz kas; koordineli kasılmaları peristaltizmi yapar. Aradaki miyenterik pleksus kasılmayı koordine eder. [[K1 s. 289]]',
      sub: '<b>Submukoza.</b> Meissner pleksusu (ikincil enterik pleksus), kan ve lenf damarları, elastik bağ dokusu. [[K1 s. 289]]',
      muk: '<b>Mukoza.</b> Muskularis mukoza mukozayı sürekli çalkalar; lamina propria damar ve bağışıklık hücresi içerir (ileumda Peyer plakları); epitel enterositlerdir. [[K1 s. 289]]',
      valv: '<b>Valvulae conniventes.</b> Mukozanın lümene yaptığı katlantılar; emilim yüzeyini büyüten ilk basamaktır. [[K1 s. 289]]',
      3: '<b>3 · Villus.</b> Her villusta tek arteriyol uçta kapiller ağ yapar, ağ tek venüle boşalır ve kan portal venle karaciğere gider; tek lakteal emilen yağı şilomikron olarak torasik kanala taşır. Aralarda goblet hücreleri (mukus) ve kriptler (fırçamsı kenar enzimleri, kök hücreler) vardır. [[K1 s. 289–290]]',
      4: '<b>4 · Mikrovillus.</b> Villusların üstündeki mikroskopik çıkıntılar; tüylü görünümleri \'fırçamsı kenar\' adını verir. Katlantı, villus ve mikrovillus birlikte 7 m\'lik bağırsağın emilim yüzeyini 250 m²\'nin üstüne çıkarır. [[K1 s. 289]]',
    };
    const KEY = { 1: '1', 2: '2', 3: '3', 4: '4' };
    let lv = 0, sel = null;
    el.innerHTML = `<div class="f64-ctl">${segHtml('Yakınlaştırma düzeyi', 'lv', [['0', '1 Kanal'], ['1', '2 Duvar'], ['2', '3 Villus'], ['3', '4 Mikrovillus']], '0')}</div>
      <div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 400" role="img" aria-label="Sindirim kanalından mikrovillusa dört düzeyli yakınlaştırma şeması"></svg></div>
      <div class="f64-chips" role="group" aria-label="Emilim yerleri"></div>${NAV}`;
    const svg = el.querySelector('svg'), chips = el.querySelector('.f64-chips');
    const g = (k, inner, label) => `<g class="f64-g${sel === k ? ' on' : ''}" data-k="${k}" tabindex="0" role="button" aria-label="${label}">${inner}</g>`;
    /* düzey 1 */
    const L1 = () => {
      const SI = { duo: 'M214 140 H300 Q312 140 312 152', jej: 'M312 152 Q312 164 300 164 H226 Q214 164 214 176 Q214 188 226 188 H300 Q312 188 312 200 Q312 212 300 212 H226 Q214 212 214 224', ile: 'M214 224 Q214 236 226 236 H300 Q312 236 312 248 Q312 260 300 260 H226 Q214 260 214 272 Q214 284 226 284 H300 Q312 284 312 296 V322' };
      return tx(350, 14, 'kanal ≈ 9 m · ince bağırsak 7 m', 'f64-m', 'end')
        + g('yard', `<ellipse cx="62" cy="38" rx="32" ry="17" class="f64-org"/>${tx(62, 42, 'Ağız')}<ellipse cx="124" cy="38" rx="30" ry="12" class="f64-org"/>${tx(124, 42, 'tükürük')}`, 'Ağız ve tükürük bezleri')
        + `<path d="M62 56 V118" class="f64-tube" style="stroke-width:10"/>${tx(76, 92, 'özofagus', 'f64-m', 'start')}`
        + g('mide', `<ellipse cx="86" cy="152" rx="46" ry="30" class="f64-org"/>${tx(86, 156, 'Mide')}`, 'Mide')
        + g('yard', `<ellipse cx="56" cy="228" rx="48" ry="21" class="f64-org"/>${tx(56, 232, 'Karaciğer')}<ellipse cx="62" cy="274" rx="42" ry="13" class="f64-org"/>${tx(62, 278, 'Safra kesesi')}<ellipse cx="62" cy="316" rx="42" ry="15" class="f64-org"/>${tx(62, 320, 'Pankreas')}`, 'Karaciğer, safra kesesi, pankreas')
        + `<path d="M312 326 H330 V112 H190 V372" class="f64-tube f64-kolon"/>${tx(262, 100, 'kalın bağırsak', 'f64-m')}${tx(262, 128, 'ince bağırsak', 'f64-m')}${tx(190, 392, 'anüs', 'f64-m')}`
        + ['duo', 'jej', 'ile'].map((k) => g(k, `<path d="${SI[k]}" class="f64-tube f64-si f64-si-${k}"/>`, { duo: 'Duodenum', jej: 'Jejunum', ile: 'Terminal ileum' }[k])).join('');
    };
    /* düzey 2 */
    const L2 = () => {
      const C = [100, 190], pt = (r, a) => [C[0] + r * Math.cos(a * Math.PI / 180), C[1] - r * Math.sin(a * Math.PI / 180)];
      const ring = (r0, r1, cls) => `<circle cx="${C[0]}" cy="${C[1]}" r="${(r0 + r1) / 2}" stroke-width="${r1 - r0}" class="${cls}" fill="none"/>`;
      let s = tx(350, 14, 'kesit şeması', 'f64-m', 'end');
      s += g('adv', ring(94, 99, 'f64-r-adv'), 'Adventisya') + g('musc', ring(84, 94, 'f64-r-long') + ring(70, 84, 'f64-r-cir') + `<circle cx="${C[0]}" cy="${C[1]}" r="77" fill="none" class="f64-r-dash"/>` + [30, 150, 270, 330, 90, 210].map((a) => { const p = pt(89, a); return `<circle cx="${n1(p[0])}" cy="${n1(p[1])}" r="2.2" class="f64-nor"/>`; }).join(''), 'Muskularis eksterna');
      s += g('sub', ring(52, 70, 'f64-r-sub') + [20, 80, 140, 200, 260, 320].map((a, i) => { const p = pt(61, a); return `<circle cx="${n1(p[0])}" cy="${n1(p[1])}" r="${i % 2 ? 2.6 : 3}" class="${i % 2 ? 'f64-v-ly' : 'f64-v-kan'}"/>`; }).join('') + [50, 170, 290].map((a) => { const p = pt(61, a); return `<circle cx="${n1(p[0])}" cy="${n1(p[1])}" r="2" class="f64-nor"/>`; }).join(''), 'Submukoza');
      s += g('muk', ring(30, 52, 'f64-r-muk') + `<circle cx="${C[0]}" cy="${C[1]}" r="51" fill="none" class="f64-r-line"/>` + `<ellipse cx="${n1(pt(44, -80)[0])}" cy="${n1(pt(44, -80)[1])}" rx="7" ry="4" class="f64-peyer"/><ellipse cx="${n1(pt(44, -105)[0])}" cy="${n1(pt(44, -105)[1])}" rx="7" ry="4" class="f64-peyer"/>`, 'Mukoza');
      s += g('valv', Array.from({ length: 8 }, (_, i) => { const a = i * 45 + 10, p1 = pt(31, a - 9), p2 = pt(31, a + 9), p3 = pt(19, a); return `<polygon points="${n1(p1[0])},${n1(p1[1])} ${n1(p2[0])},${n1(p2[1])} ${n1(p3[0])},${n1(p3[1])}" class="f64-fold"/>`; }).join(''), 'Valvulae conniventes');
      const lab = [['adv', 'Adventisya', 96, 70, 100, 'adv'], ['musc', 'Longitudinal kas', 89, 50, 126, 'musc'], ['musc', 'Sirküler kas', 77, 30, 154, 'musc'], ['sub', 'Submukoza', 61, 10, 182, 'sub'], ['muk', 'Mukoza', 41, -15, 208, 'muk'], ['valv', 'Valvulae conniventes', 25, -45, 246, 'valv'], ['muk', 'Peyer plakları (ileum)', 44, -80, 278, 'muk']];
      lab.forEach(([k, t, r, a, ly]) => { const p = pt(r, a); s += g(k, `<polyline points="${n1(p[0])},${n1(p[1])} 190,${ly - 4} 204,${ly - 4}" class="f64-lead"/>${tx(208, ly, t, '', 'start')}`, t); });
      s += lines(180, 334, ['yeşil noktalar: miyenterik pleksus', '(iki kas halkası arasında)'], 'f64-m', 'middle');
      return s;
    };
    /* düzey 3 */
    const L3 = (t) => {
      const V = (x0, x1, cls) => `<path d="M${x0} 262 V104 Q${x0} 82 ${(x0 + x1) / 2} 82 Q${x1} 82 ${x1} 104 V262" class="f64-vil ${cls}"/>`;
      let s = tx(350, 14, 'villus ve kript', 'f64-m', 'end');
      s += rc(6, 262, 348, 50, 'f64-lp', 4) + tx(290, 292, 'lamina propria', 'f64-m');
      s += V(24, 96, '') + V(264, 336, '') + V(140, 220, 'mid');
      s += [[96, 140], [220, 264]].map(([a, b]) => `<path d="M${a} 262 V292 Q${(a + b) / 2} 300 ${b} 292 V262" class="f64-kript"/>`).join('');
      s += g('gob', [[28, 120], [92, 150], [268, 130], [332, 170], [142, 150], [218, 120]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="6" class="f64-gob"/>`).join(''), 'Goblet hücreleri');
      s += `<polyline points="106,276 118,276" class="f64-lead"/>` + tx(122, 290, 'kript', '', 'start').replace('y="290"', 'y="279"');
      s += `<path d="M156 262 V122" class="f64-damar f64-art"/><path d="M204 262 V122" class="f64-damar f64-ven"/><path d="M156 122 C156 100 204 100 204 122 M156 112 L204 112 M156 120 L204 120" class="f64-damar f64-kap-ag" fill="none"/><path d="M180 262 V146" class="f64-damar f64-lak"/><circle cx="180" cy="146" r="4" class="f64-lak-uc"/>`;
      s += tx(180, 70, 'kapiller ağ', '', 'middle') + `<polyline points="180,74 180,96" class="f64-lead"/>`;
      s += lines(24, 332, ['kırmızı: arteriyol (yukarı), venül (aşağı → portal ven → karaciğer)', 'sarı: lakteal (aşağı → torasik kanal)'], 'f64-m', 'start', 14).replace(/f64-t/g, 'f64-t f64-s');
      // akış noktaları
      if (true) {
        const FL = [{ pts: [[156, 258], [156, 128]], col: 'var(--crit)', n: 4, spd: 0.25, r: 2.6 }, { pts: [[204, 128], [204, 258]], col: 'var(--crit)', n: 4, spd: 0.25, r: 2.6 }, { pts: [[180, 150], [180, 258]], col: 'var(--warn)', n: 3, spd: 0.18, r: 3.4 }];
        s += '<g class="f64-akis">' + flowStr(FL, t) + '</g>';
      }
      return s;
    };
    /* düzey 4 */
    const L4 = () => {
      let s = tx(350, 14, 'yüzey > 250 m²', 'f64-m', 'end');
      s += rc(6, 28, 348, 36, 'f64-lumen', 4) + tx(180, 50, 'Lümen', 'f64-m');
      for (let i = 0; i < 22; i++) { const x = 20 + i * 15.6; s += `<rect x="${n1(x - 3)}" y="70" width="6" height="42" rx="3" class="f64-mv"/>`; if (i % 3 === 1) s += `<rect x="${n1(x - 3)}" y="78" width="6" height="7" rx="2" class="f64-enz"/>`; }
      s += g('mv', `<rect x="14" y="112" width="332" height="86" rx="10" class="f64-cell"/>`, 'Enterosit') + tx(180, 156, 'enterosit', '') + tx(180, 172, 'fırçamsı kenar yukarıda', 'f64-m');
      s += `<polyline points="352,70 356,70 356,112 352,112" class="f64-lead"/>`;
      s += rc(14, 222, 348, 0, '', 0);
      s += tx(10, 224, 'emilim yüzeyi', '', 'start');
      const B = [['katlantı', 70], ['+ villus', 190], ['+ mikrovillus', 332]];
      B.forEach(([l, w], i) => { s += rc(10, 234 + i * 36, w, 24, i === 2 ? 'f64-yz f64-yz3' : 'f64-yz', 4) + tx(16, 251 + i * 36, l, 'f64-yzt', 'start'); });
      s += tx(342, 251 + 72, '> 250 m²', 'f64-yzt', 'end');
      s += tx(10, 366, 'oysa bağırsak yalnız 7 m uzunlukta', 'f64-m', 'start');
      s += rc(10, 372, 14, 10, 'f64-enz', 2) + tx(30, 381, 'fırçamsı kenar enzimleri (integral membran proteinleri)', 'f64-m', 'start');
      return s;
    };
    const render = (t) => {
      svg.classList.toggle('has-sel', !!sel);
      svg.innerHTML = [L1, L2, L3, L4][lv](t || 0);
    };
    const chipsHtml = () => {
      chips.innerHTML = lv === 0 ? [['duo', 'Duodenum · demir', 'var(--accent)'], ['jej', 'Jejunum · besinlerin çoğu', 'var(--ok)'], ['ile', 'Terminal ileum · B12, safra tuzları', 'var(--c-basic)'], ['yag', 'Yağ ve su · her yerde', 'var(--warn)']].map(([k, l, c]) => `<button type="button" class="f64-chip${sel === k ? ' on' : ''}" data-k="${k}" aria-pressed="${sel === k}"><i style="background:${c}"></i>${l}</button>`).join('') : '';
    };
    const setLv = (i) => {
      lv = i; sel = null; basSec(el, 'lv', i); render(0); chipsHtml(); setCap(el, CAP[i + 1]);
      svg.setAttribute('viewBox', '0 0 360 400');
      if (!RM) { svg.classList.remove('f64-gir'); void svg.getBoundingClientRect(); svg.classList.add('f64-gir'); }
      nv.go(i);
    };
    const pick = (k) => {
      sel = sel === k ? null : k;
      if (lv === 0 && !['duo', 'jej', 'ile', 'yag', 'yard'].includes(k)) { setCap(el, CAP[1]); } else setCap(el, sel ? (CAP[sel] || CAP[lv + 1]) : CAP[lv + 1]);
      if (lv === 2 && sel === 'gob') setCap(el, '<b>Goblet hücresi.</b> Epitelde mukus salgılayan kadeh biçimli hücreler. [[K1 s. 289–290]]');
      if (lv === 3 && sel === 'mv') setCap(el, CAP[4]);
      render(0); chipsHtml();
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-lv]'); if (b) { setLv(+b.dataset.lv); return; } const gk = e.target.closest('[data-k]'); if (gk) pick(gk.dataset.k); }, sig);
    el.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.f64-g')) { e.preventDefault(); pick(e.target.dataset.k); } }, sig);
    const nv = wireNav(el, 4, (i) => { if (i !== lv) setLv(i); }, sig);
    render(0); chipsHtml();
    let stop = null;
    if (!RM) {
      let t = 0;
      stop = ticker(el, (dt) => { if (lv !== 2) return; t += dt; const a = svg.querySelector('.f64-akis'); if (a) a.innerHTML = '' + flowStr(L3FL(), t); });
    }
    const L3FL = () => [{ pts: [[156, 258], [156, 128]], col: 'var(--crit)', n: 4, spd: 0.25, r: 2.6 }, { pts: [[204, 128], [204, 258]], col: 'var(--crit)', n: 4, spd: 0.25, r: 2.6 }, { pts: [[180, 150], [180, 258]], col: 'var(--warn)', n: 3, spd: 0.18, r: 3.4 }];
    return () => { ac.abort(); if (stop) stop(); };
  };

  /* ======================================================================
     2 · f64_kh — karbonhidratın yolu
     ====================================================================== */
  VIZ.f64_kh = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const CAP = [
      '<b>1 · Ağız.</b> Tükürük amilazı karmaşık karbonhidratları daha küçük polimerlere ve monosakkaritlere ayırır. İleri\'ye basın. [[K1 s. 290]]',
      '<b>2 · Duodenum.</b> Pankreas amilazı parçalamayı sürdürür. Selülozu ayıracak enzim insanda yoktur: değişmeden geçer. [[K1 s. 290]]',
      '<b>3 · Fırçamsı kenar.</b> Villuslara bağlı integral membran proteinleri olan sükraz, maltaz ve laktaz küçük polimerleri monosakkaritlere ayırır; ör. sükraz sükrozu glukoz ve fruktoza. [[K1 s. 290]]',
      '<b>4 · Enterosite giriş.</b> Glukoz ve galaktoz yalnız SGLT1 ile, Na⁺ ile birlikte girer (ikincil aktif); gücü bazolateral Na⁺/K⁺-ATPaz\'ın tuttuğu düşük hücre içi Na⁺\'tur. Fruktoz kolaylaştırılmış, pentoz basit difüzyonla girer. [[K1 s. 290]]',
      '<b>5 · Kana çıkış.</b> Monosakkaritler derişim farkıyla GLUT-2\'den kapillere geçer; ozmotik olarak aktif oldukları için su da onları izler. [[K1 s. 290]]',
    ];
    const SWC = {
      pompa: '<b>Pompa durdu.</b> Hücre içi Na⁺ yükselir, SGLT1\'i süren gradyan kaybolur: glukoz ve galaktoz giremez. Fruktoz ve pentoz Na⁺\'a bağlı olmadığı için girmeye devam eder. [[K1 s. 290]]',
      laktaz: '<b>Laktaz eksikliği.</b> Fırçamsı kenar enzimi eksik olan o şekeri sindiremez: laktoz intoleransının nedeni budur. [[K1 s. 290]]',
    };
    let step = 0, pompa = false, laktaz = false, last = null, ts = 0;
    el.innerHTML = `<div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 458" role="img" aria-label="Karbonhidratın ağızdan kana yolu: üç sindirim yeri, enterositte SGLT1, fruktoz, pentoz ve GLUT-2 taşıma yolları"></svg></div>${NAV}
      <div class="btn-row f64-sw"><button type="button" class="btn ghost" data-sw="pompa" aria-pressed="false">Na⁺/K⁺-ATPaz'ı durdur</button><button type="button" class="btn ghost" data-sw="laktaz" aria-pressed="false">Laktaz eksikliği</button></div>`;
    const svg = el.querySelector('svg');
    const hx = (x, y, l, r = 10.5) => `<polygon points="${hexP(x, y, r)}" class="f64-kh"/><text x="${n1(x)}" y="${n1(y + 4)}" text-anchor="middle" class="f64-mol">${l}</text>`;
    const pg = (x, y, l, r = 10) => `<polygon points="${Array.from({ length: 5 }, (_, i) => { const a = Math.PI * 2 / 5 * i - Math.PI / 2; return n1(x + r * Math.cos(a)) + ',' + n1(y + r * Math.sin(a)); }).join(' ')}" class="f64-kh"/><text x="${n1(x)}" y="${n1(y + 4)}" text-anchor="middle" class="f64-mol">${l}</text>`;
    const zincir = (x0, y, gr, gap) => { let s = '', x = x0; gr.forEach((n) => { for (let i = 0; i < n; i++) { if (i) s += ln(x - 17 + 10.5, y, x - 10.5, y, 'f64-bag'); s += hx(x, y, ''); x += 17; } x += gap; }); return s; };
    const stat = () => {
      let s = '';
      const ST = [['Ağız', 'tükürük amilazı'], ['Duodenum', 'pankreas amilazı'], ['Fırçamsı kenar', 'sükraz, maltaz,', 'laktaz']];
      ST.forEach((a, i) => { s += rc(4 + i * 120, 4, 112, 62, 'f64-st' + (step === i ? ' on' : ''), 8) + tx(60 + i * 120, 22, a[0], 'f64-b') + lines(60 + i * 120, 36, a.slice(1), 'f64-m', 'middle', 13); });
      s += rc(4, 76, 352, 120, 'f64-lumen', 0) + tx(12, 92, 'Lümen', 'f64-m', 'start');
      s += rc(4, 196, 352, 144, 'f64-cell', 0);
      for (let x = 10; x < 356; x += 9) s += ln(x, 187, x, 196, 'f64-mvt');
      s += ln(4, 196, 356, 196, 'f64-memb');
      s += kap(70, 196, 54, 'SGLT1') + lines(70, 220, ['Na⁺ + glukoz/', 'galaktoz', 'ikincil aktif'], 'f64-m', 'middle')
        + kap(180, 196, 62, 'fruktoz') + lines(180, 220, ['kolaylaştırılmış', 'difüzyon'], 'f64-m', 'middle')
        + `<rect x="270" y="193" width="40" height="6" class="f64-gap"/>` + lines(290, 220, ['pentoz', 'basit difüzyon'], 'f64-m', 'middle');
      s += tx(180, 276, 'hücre içi Na⁺ düşük' + (pompa ? ' → yükseldi' : ''), pompa ? 'f64-bad-t' : 'f64-m');
      s += ln(4, 340, 356, 340, 'f64-memb');
      s += kap(90, 340, 56, 'GLUT-2') + lines(90, 304, ['kolaylaştırılmış', 'difüzyon'], 'f64-m', 'middle');
      s += kap(270, 340, 88, 'Na⁺/K⁺-ATPaz', pompa ? 'bad' : '') + lines(270, 304, ['Na⁺ dışarı,', 'K⁺ içeri'], 'f64-m', 'middle') + (pompa ? tx(325, 345, '✕', 'f64-bad-t') : '');
      s += rc(4, 356, 352, 44, 'f64-kan', 6) + tx(180, 382, 'Kapiller → portal ven', 'f64-b f64-kant');
      s += rc(4, 412, 352, 30, 'f64-ort' + (step === 4 ? ' on' : ''), 8) + tx(180, 431, 'ORT: Na⁺ + glukoz + su → SGLT1 suyu da çeker', 'f64-m');
      return s;
    };
    const dyn = (t) => {
      const p = RM ? 1 : clamp(ts / 1.4, 0, 1), e = ease(p);
      let s = '';
      if (step === 0) {
        s += tx(52, 112, 'nişasta', '', 'start') + zincir(44, 140, [3, 3, 2], 14 * e);
        s += `<g style="opacity:${n1(e)}">${hx(330, 140, 'G')}${hx(330, 112, 'G')}</g>` + tx(352, 168, 'monosakkarit', 'f64-m', 'end');
      } else if (step === 1) {
        s += tx(52, 112, 'küçük polimerler', '', 'start') + zincir(40, 150, [2, 1, 2, 1, 2], 10 + 8 * e) + hx(310, 150, 'G') + hx(330, 124, 'G');
        const cx = 120 + (RM ? 0 : (t * 14) % 50);
        s += `<g class="f64-sel">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${n1(cx + i * 22)}" y="176" width="18" height="7" rx="2"/>`).join('')}</g>` + tx(cx + 66, 172, 'selüloz: değişmeden geçer', 'f64-m', 'middle');
      } else if (step === 2) {
        const d = e * 11, drop = e * 4;
        const cx = [50, 165, 280], nm = ['sükroz', 'laktoz', 'maltoz'], en = ['sükraz', 'laktaz', 'maltaz'], A = ['G', 'G', 'G'], B = ['F', 'Ga', 'G'];
        cx.forEach((x, i) => {
          const kes = !(i === 1 && laktaz), dd = kes ? d : 0, y = 126 + (kes ? drop : 0);
          s += tx(x, 100, nm[i]) + ln(x - dd, y, x + dd, y, 'f64-bag') + hx(x - 11 - dd, y, A[i]) + (i === 0 ? pg(x + 11 + dd, y, B[i], 11) : hx(x + 11 + dd, y, B[i]));
          s += kap(x, 170, 58, en[i], i === 1 && laktaz ? 'bad' : '');
        });
        if (laktaz) s += tx(165, 150, 'laktoz sindirilemez', 'f64-bad-t');
      } else if (step === 3) {
        const gl = !pompa;
        const FL = [
          { pts: [[64, 100], [64, 196], [64, 262]], col: ARC.kh, n: 3, spd: 0.28, op: gl ? 1 : 0 },
          { pts: [[80, 100], [80, 196], [80, 262]], col: ARC.na, n: 3, spd: 0.28, r: 2.6, op: gl ? 1 : 0 },
          { pts: [[180, 100], [180, 196], [180, 262]], col: ARC.kh, n: 3, spd: 0.25 },
          { pts: [[290, 100], [290, 262]], col: ARC.kh, n: 3, spd: 0.22 },
          { pts: [[262, 300], [262, 372]], col: ARC.na, n: 3, spd: 0.3, r: 2.6, op: pompa ? 0 : 1 },
          { pts: [[286, 372], [286, 300]], col: 'var(--ok)', n: 2, spd: 0.3, r: 2.6, op: pompa ? 0 : 1 },
        ];
        s += flowStr(FL, t);
        if (pompa) {
          [[44, 124], [64, 140], [84, 120], [52, 158], [76, 164]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="3.4" fill="${ARC.kh}"/>`; });
          const nNa = Math.round(clamp(ts / 3, 0, 1) * 9);
          for (let i = 0; i < nNa; i++) s += `<circle cx="${n1(120 + (i % 5) * 18)}" cy="${n1(246 + Math.floor(i / 5) * 14)}" r="3" fill="${ARC.na}"/>`;
        }
      } else {
        const FL = [
          { pts: [[64, 100], [64, 196], [64, 262]], col: ARC.kh, n: 2, op: pompa ? 0 : 0.3 },
          { pts: [[180, 100], [180, 196], [180, 262]], col: ARC.kh, n: 2, op: 0.3 },
          { pts: [[290, 100], [290, 262]], col: ARC.kh, n: 2, op: 0.3 },
          { pts: [[82, 300], [82, 372]], col: ARC.kh, n: 3, spd: 0.25, op: pompa ? 0 : 1 },
          { pts: [[98, 300], [98, 372]], col: ARC.kh, n: 3, spd: 0.25 },
          { pts: [[116, 300], [116, 372]], col: ARC.su, n: pompa ? 1 : 3, spd: 0.25, r: 2.6 },
        ];
        s += flowStr(FL, t);
      }
      return s;
    };
    const render = (t) => { svg.innerHTML = stat() + `<g class="f64-dyn">${dyn(t)}</g>`; };
    const redraw = (t = 0) => { const d = svg.querySelector('.f64-dyn'); if (d) d.innerHTML = dyn(t); };
    const capSet = () => setCap(el, last ? SWC[last] : CAP[step]);
    const full = () => { ts = 0; render(0); capSet(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sw]'); if (!b) return;
      const k = b.dataset.sw;
      if (k === 'pompa') pompa = !pompa; else laktaz = !laktaz;
      b.setAttribute('aria-pressed', String(k === 'pompa' ? pompa : laktaz));
      last = (k === 'pompa' ? pompa : laktaz) ? k : (pompa ? 'pompa' : laktaz ? 'laktaz' : null);
      full();
    }, sig);
    wireNav(el, 5, (i) => { step = i; last = null; full(); }, sig);
    render(0);
    let T = 0, stop = null;
    if (!RM) stop = ticker(el, (dt) => { T += dt; ts += dt; redraw(T); });
    return () => { ac.abort(); if (stop) stop(); };
  };

  /* ======================================================================
     3 · f64_protein — dört istasyon
     ====================================================================== */
  VIZ.f64_protein = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const CAP = [
      '<b>1 · Mide.</b> Esas hücreler pepsinojen salgılar; düşük pH onu pepsine çevirir. Pepsin peptit bağlarını keserek daha kısa polipeptitler yapar. İleri\'ye basın. [[K1 s. 290]]',
      '<b>2 · Duodenum.</b> Pankreas kaynaklı tripsin ve kimotripsin polipeptitleri dipeptit ve tripeptitlere kadar keser, tek amino aside kadar değil. [[K1 s. 290]]',
      '<b>3 · Fırçamsı kenar.</b> Villuslara bağlı integral membran proteinleri olan peptidazlar dipeptit ve tripeptitleri tek amino asitlere ayırır. [[K1 s. 291]]',
      '<b>4 · Enterosit.</b> Tek amino asitler Na⁺ ile (nötr, bazik, asidik için ayrı taşıyıcılar), kısa peptitler H⁺ ile ikincil aktif taşınır; peptitler hücrede amino aside ayrılır, amino asitler kolaylaştırılmış difüzyonla kapillere çıkar ve suyu da çeker. [[K1 s. 291]]',
    ];
    const PIECES = [[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]], [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]], [[0, 1], [2, 3, 4], [5, 6], [7, 8, 9], [10, 11]], [[0], [1], [2, 3, 4], [5], [6], [7, 8, 9], [10], [11]]];
    const REACH = [2, 3, 4, 4];
    const BC = ['var(--ok)', 'var(--ok)', 'var(--c-basic)', 'var(--ok)', 'var(--crit)', 'var(--ok)', 'var(--c-basic)', 'var(--ok)', 'var(--ok)', 'var(--crit)', 'var(--ok)', 'var(--c-basic)'];
    let step = 0, ts = 0;
    el.innerHTML = `<div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 430" role="img" aria-label="Proteinin mide, duodenum, fırçamsı kenar ve enterositte amino asitlere ayrılıp emilmesi"></svg></div>
      ${legend([['var(--ok)', 'nötr amino asit'], ['var(--c-basic)', 'bazik'], ['var(--crit)', 'asidik']])}${NAV}`;
    const svg = el.querySelector('svg');
    const posOf = (pi, i) => { const P = PIECES[pi]; for (let g = 0; g < P.length; g++) if (P[g].includes(i)) return [38 + i * 17 + g * 9, g, P[g].length]; return [0, 0, 1]; };
    const bead = (x, y, i, r = 6.5) => `<circle cx="${n1(x)}" cy="${n1(y)}" r="${r}" fill="${BC[i]}" opacity=".9"/>`;
    const stat = () => {
      let s = '';
      ['Mide', 'Duodenum', 'Fırçamsı|kenar', 'Enterosit'].forEach((a, i) => { const L = a.split('|'); s += rc(4 + i * 89, 4, 85, 38, 'f64-st' + (step === i ? ' on' : ''), 8) + lines(46.5 + i * 89, L.length > 1 ? 20 : 27, L, 'f64-b', 'middle', 13); });
      ['protein', 'polipeptit', 'di/tripeptit', 'amino asit'].forEach((a, i) => { s += rc(4 + i * 89, 50, 85, 22, 'f64-rb' + (i < REACH[step] ? ' on' : ''), 5) + tx(46.5 + i * 89, 65, a, i < REACH[step] ? 'f64-b' : 'f64-m'); });
      if (step < 3) {
        s += rc(4, 84, 352, 190, 'f64-lumen', 0) + tx(12, 100, 'Lümen', 'f64-m', 'start');
        if (step === 2) { s += ln(4, 274, 356, 274, 'f64-memb'); for (let x = 10; x < 356; x += 9) s += ln(x, 265, x, 274, 'f64-mvt'); [64, 144, 224, 304].forEach((x) => { s += kap(x, 274, 62, 'peptidaz'); }); s += tx(12, 306, 'fırçamsı kenar', 'f64-m', 'start'); }
        if (step === 0) s += tx(350, 112, 'mide', 'f64-m', 'end');
      } else {
        s += rc(4, 84, 352, 116, 'f64-lumen', 0) + tx(12, 100, 'Lümen', 'f64-m', 'start') + rc(4, 200, 352, 140, 'f64-cell', 0) + ln(4, 200, 356, 200, 'f64-memb') + ln(4, 340, 356, 340, 'f64-memb');
        for (let x = 10; x < 356; x += 9) s += ln(x, 191, x, 200, 'f64-mvt');
        [['Na⁺ nötr', 44], ['Na⁺ bazik', 114], ['Na⁺ asidik', 184]].forEach(([l, x]) => { s += kap(x, 200, 66, l); });
        s += kap(290, 200, 112, 'H⁺ + di/tripeptit') + lines(290, 222, ['kısa peptit girer,', 'hücrede ayrılır'], 'f64-m', 'middle');
        s += kap(180, 340, 60, 'taşıyıcı') + lines(180, 306, ['kolaylaştırılmış difüzyon'], 'f64-m', 'middle');
        s += rc(4, 356, 352, 40, 'f64-kan', 6) + tx(180, 380, 'Kapiller → portal ven', 'f64-b f64-kant');
        s += lines(110, 244, ['yalnız tek amino asit', 'Na⁺ ile girer'], 'f64-m', 'middle', 13);
      }
      return s;
    };
    const dyn = (t) => {
      const p = RM ? 1 : clamp(ts / 2.2, 0, 1);
      let s = '';
      if (step < 3) {
        const y0 = 238;
        const q = step === 0 ? clamp((p - 0.45) / 0.55, 0, 1) : ease(clamp(p / 0.6, 0, 1));
        for (let i = 0; i < 12; i++) {
          const A = posOf(step, i), B = posOf(step + 1, i);
          const x = lerp(A[0], B[0], q), tek = PIECES[step + 1][B[1]].length === 1 && step === 2, yy = y0 + (tek ? 12 * q : 0);
          s += bead(x, yy, i);
          if (i < 11) { const nb = posOf(step + 1, i + 1); if (nb[1] === B[1]) { const A2 = posOf(step, i + 1); s += ln(x + 6, yy, lerp(A2[0], nb[0], q) - 6, yy, 'f64-bag-p'); } }
        }
        if (step === 0) {
          s += `<circle cx="60" cy="126" r="16" class="f64-hc"/>` + tx(60, 156, 'esas hücre', 'f64-m');
          const dp = clamp(p / 0.45, 0, 1), dx = lerp(76, 200, dp), dy = lerp(126, 200, dp), pep = dp > 0.6;
          s += `<path d="M${n1(dx)} ${n1(dy - 8)} Q${n1(dx + 6)} ${n1(dy + 2)} ${n1(dx)} ${n1(dy + 6)} Q${n1(dx - 6)} ${n1(dy + 2)} ${n1(dx)} ${n1(dy - 8)} Z" fill="${pep ? 'var(--ok)' : 'var(--muted)'}"/>`;
          s += tx(dx + 10, dy - 6, pep ? 'pepsin' : 'pepsinojen', pep ? 'f64-b' : 'f64-m', 'start');
          s += rc(150, 108, 74, 18, 'f64-bad', 9) + tx(187, 121, 'düşük pH', 'f64-bad-t');
          if (p > 0.5) s += tx(180, 220, '✂ pepsin keser', 'f64-b');
        } else if (step === 1) {
          s += tx(300, 116, 'pankreastan', 'f64-m', 'middle') + `<path d="M300 122 V170" class="f64-fl" stroke="var(--ok)"/>`;
          s += kap(150, 192, 170, '✂ tripsin, kimotripsin') + tx(180, 280, 'tek amino asit yok', 'f64-m');
        } else {
          s += tx(180, 128, '✂ peptidaz: di/tripeptit → tek amino asit', 'f64-b');
        }
      } else {
        const col = ['var(--ok)', 'var(--c-basic)', 'var(--crit)'];
        const FL = [];
        [44, 114, 184].forEach((x, i) => { FL.push({ pts: [[x - 6, 100], [x - 6, 200], [x - 6, 270]], col: col[i], n: 2, spd: 0.25, r: 4 }); FL.push({ pts: [[x + 10, 100], [x + 10, 200], [x + 10, 270]], col: ARC.na, n: 2, spd: 0.25, r: 2.6 }); });
        FL.push({ pts: [[284, 100], [284, 200], [284, 240]], col: 'var(--ok)', n: 2, spd: 0.25, r: 4 });
        FL.push({ pts: [[296, 100], [296, 200], [296, 240]], col: ARC.h, n: 2, spd: 0.25, r: 2.6 });
        FL.push({ pts: [[172, 300], [172, 372]], col: 'var(--ok)', n: 4, spd: 0.25, r: 4 });
        FL.push({ pts: [[194, 300], [194, 372]], col: ARC.su, n: 3, spd: 0.25, r: 2.6 });
        s += flowStr(FL, t);
        s += `<circle cx="276" cy="256" r="4" fill="var(--ok)"/><circle cx="292" cy="256" r="4" fill="var(--ok)"/>` + tx(284, 278, '✂ ayrılır', 'f64-b');
      }
      return s;
    };
    const render = (t) => { svg.setAttribute('viewBox', '0 0 360 ' + (step < 3 ? 322 : 410)); svg.innerHTML = stat() + `<g class="f64-dyn">${dyn(t)}</g>`; };
    wireNav(el, 4, (i) => { step = i; ts = 0; render(0); setCap(el, CAP[i]); }, sig);
    render(0);
    let T = 0, stop = null;
    if (!RM) stop = ticker(el, (dt) => { T += dt; ts += dt; const d = svg.querySelector('.f64-dyn'); if (d) d.innerHTML = dyn(T); });
    return () => { ac.abort(); if (stop) stop(); };
  };

  /* ======================================================================
     4 · f64_yag — damlacık boyu, lipaz, miseller, şilomikron
     ====================================================================== */
  VIZ.f64_yag = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const N = [1, 8, 27, 64, 125];
    const CAPS = {
      s0: '<b>Safra yok.</b> Trigliserit büyük damlacıkta toplanır; lipaz yalnız yüzeyde çalıştığı için hız düşüktür. [[K1 s. 291]]',
      s1: '<b>Emülsifikasyon.</b> Karaciğerde yapılıp safra kesesinden salınan safra asitleri damlacıkları kaplayıp böler: aynı yağ daha çok yüzey, lipaz daha hızlı. [[K1 s. 291]]',
      a: [
        '<b>1 · Lipaz.</b> Pankreas lipazı her trigliseriti iki serbest yağ asidi ve bir 2-monogliseride ayırır. [[K1 s. 291]]',
        '<b>2 · Misel.</b> Yağ asidi ve monogliseritler safra tuzlarıyla misel oluşturur. Misel enterosite değince lipit basit difüzyonla geçer; safra tuzları lümende kalır, terminal ileumda emilip karaciğere döner. [[K1 s. 291]]',
        '<b>3 · Şilomikron.</b> ER\'de trigliserit yeniden yapılır; kolesterol, fosfolipit ve apolipoproteinle paketlenip şilomikron olur. [[K1 s. 291]]',
        '<b>4 · Lakteal.</b> Şilomikronlar lakteale salınır, lenfle akar ve torasik kanaldan sistemik dolaşıma geçer. [[K1 s. 291]]',
      ],
      or: '<b>Orlistat.</b> Dil ve pankreas lipazını inhibe eder: trigliserit ayrılamaz, emilemez, dışkıyla atılır (steatore). Pankreas yetmezliğinin başlıca belirtisi de steatoredir. [[K1 s. 291]]',
    };
    let lv = 1, step = 0, orl = false, ts = 0, son = 'slider';
    el.innerHTML = `<label class="f64-rng"><span>Safra tuzu <b data-o="lv"></b></span><input type="range" min="0" max="4" step="1" value="1" aria-label="Safra tuzu miktarı"></label>
      <div class="f64-host"><svg class="f64-svg f64-A" viewBox="0 0 360 282" role="img" aria-label="Safra tuzu arttıkça aynı yağın daha çok küçük damlacığa bölündüğü ve lipaz hızının arttığı şema"></svg></div>
      ${legend([['var(--warn)', 'yağ damlacığı'], ['var(--c-basic)', 'safra tuzu'], ['var(--accent-ink)', 'lipaz (yüzeyde)']])}
      <h4 class="f64-h4">Emilim yolu</h4>
      <div class="f64-host"><svg class="f64-svg f64-B" viewBox="0 0 360 330" role="img" aria-label="Lipaz, misel, endoplazmik retikulumda yeniden sentez, şilomikron ve lakteal adımları"></svg></div>${NAV}
      <div class="btn-row f64-sw"><button type="button" class="btn ghost" data-or="1" aria-pressed="false">Orlistat</button></div>`;
    const A = el.querySelector('.f64-A'), B = el.querySelector('.f64-B'), rng = el.querySelector('input');
    const cube = () => Math.cbrt(N[lv]);
    let drops = [];
    const dropsBuild = () => {
      const n = N[lv], r = 44 / Math.cbrt(n), d = 2 * r + 3, cols = Math.max(1, Math.floor(340 / d)), rows = Math.ceil(n / cols);
      drops = [];
      for (let i = 0; i < n; i++) {
        const row = Math.floor(i / cols), inRow = row === rows - 1 ? n - cols * (rows - 1) : cols, c = i - row * cols;
        drops.push({ x: 180 + (c - (inRow - 1) / 2) * d, y: 91 + (row - (rows - 1) / 2) * d, r });
      }
    };
    const statA = () => {
      dropsBuild();
      let s = rc(4, 4, 352, 174, 'f64-lumen', 8);
      const tick = [0, 2, 3, 3, 2][lv];
      drops.forEach((d) => {
        s += `<circle cx="${n1(d.x)}" cy="${n1(d.y)}" r="${n1(d.r)}" class="f64-drop"/>`;
        for (let k = 0; k < tick; k++) { const a = k * 6.283 / tick + d.x; s += `<circle cx="${n1(d.x + (d.r + 1) * Math.cos(a))}" cy="${n1(d.y + (d.r + 1) * Math.sin(a))}" r="1.8" class="f64-bs"/>`; }
        const m = Math.max(1, Math.round(d.r / 18));
        for (let k = 0; k < m; k++) { const a = -1 + k * 2.1 + d.y; s += `<rect x="${n1(d.x + d.r * Math.cos(a) - 2)}" y="${n1(d.y + d.r * Math.sin(a) - 2)}" width="4.4" height="4.4" class="${orl ? 'f64-lip bad' : 'f64-lip'}"/>`; }
      });
      s += tx(12, 20, 'Lümen', 'f64-m', 'start');
      const cu = cube(), rate = orl ? 0 : cu;
      const bar = (y, lab, v, txt, cl) => tx(10, y, lab, '', 'start') + rc(10, y + 6, 250, 12, 'f64-bt', 4) + rc(10, y + 6, Math.max(0.1, 250 * v / 5), 12, cl, 4) + tx(268, y + 16, txt, 'f64-b', 'start');
      s += bar(198, 'Toplam yüzey', cu, cu + '×', 'f64-bf');
      s += bar(232, 'Lipaz hızı', rate, orl ? 'inhibe' : rate + '×', orl ? 'f64-bf bad' : 'f64-bf ok');
      s += tx(350, 276, 'Damlacık sayısı: ' + N[lv], 'f64-m', 'end');
      return s;
    };
    const dynA = (t) => {
      if (orl) return '';
      const M = Math.round(8 * cube()), n = drops.length;
      let s = '';
      for (let i = 0; i < M; i++) {
        const d = drops[(i * 7) % n], life = RM ? 0.4 : (t * 0.9 + i / M) % 1, a = i * 2.4 + 0.7, rr = d.r + 3 + life * 12;
        s += `<circle cx="${n1(d.x + rr * Math.cos(a))}" cy="${n1(d.y + rr * Math.sin(a))}" r="2.6" ${i % 2 ? 'class="f64-mg"' : 'fill="var(--warn)"'} opacity="${n1(1 - life * 0.8)}"/>`;
      }
      return s;
    };
    const tg = (x, y, up, dn) => `<line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 14}" class="f64-gly"/><line x1="${x}" y1="${y}" x2="${x + 28}" y2="${y}" class="f64-yat"/>`
      + `<line x1="${n1(x - up * 0.4)}" y1="${n1(y - 14 - up)}" x2="${n1(x + 28 - up * 0.4)}" y2="${n1(y - 14 - up)}" class="f64-yat"/><line x1="${n1(x + dn * 0.4)}" y1="${n1(y + 14 + dn)}" x2="${n1(x + 28 + dn * 0.4)}" y2="${n1(y + 14 + dn)}" class="f64-yat"/>`;
    const statB = () => {
      let s = rc(4, 4, 352, 116, 'f64-lumen', 0) + tx(12, 20, 'Lümen', 'f64-m', 'start') + rc(4, 120, 352, 100, 'f64-cell', 0) + ln(4, 120, 356, 120, 'f64-memb') + ln(4, 220, 356, 220, 'f64-memb');
      for (let x = 10; x < 356; x += 9) s += ln(x, 111, x, 120, 'f64-mvt');
      s += tx(350, 136, 'enterosit', 'f64-m', 'end');
      s += rc(4, 240, 172, 50, 'f64-kan', 6) + tx(90, 270, 'Kapiller → portal ven', 'f64-b f64-kant');
      s += rc(184, 240, 172, 50, 'f64-lak', 6) + tx(270, 270, 'Lakteal → torasik kanal', 'f64-b f64-lakt');
      return s;
    };
    const dynB = (t) => {
      const p = RM ? 1 : clamp(ts / 2, 0, 1), e = ease(p);
      let s = '';
      if (step === 0) {
        if (orl) {
          s += tg(60, 64, 0, 0) + tx(50, 98, 'trigliserit', '', 'start');
          s += `<path d="M290 36 V94" class="f64-fl" stroke="var(--crit)"/><polygon points="290,102 285,93 295,93" fill="var(--crit)"/>` + tx(290, 30, 'dışkı → steatore', 'f64-bad-t');
          s += tx(180, 118, 'lipaz inhibe: trigliserit ayrılmaz', 'f64-bad-t');
        } else {
          s += tg(60 + 40 * e, 64, 26 * e, 26 * e) + tx(30, 98, p < 0.5 ? 'trigliserit' : '2 serbest yağ asidi + 1 2-monogliserit', 'f64-b', 'start');
          s += tx(300, 42, '✂ lipaz', 'f64-b');
        }
      } else if (step === 1) {
        if (orl) { s += tx(180, 64, 'trigliserit ayrılmadı: misel oluşmaz', 'f64-bad-t'); return s; }
        const my = lerp(66, 100, e);
        s += `<circle cx="100" cy="${n1(my)}" r="18" class="f64-mis"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<circle cx="${n1(100 + 21 * Math.cos(k * 0.785))}" cy="${n1(my + 21 * Math.sin(k * 0.785))}" r="2.4" class="f64-bs"/>`).join('') + tx(100, 38, 'misel');
        if (p > 0.6) s += flowStr([{ pts: [[100, 122], [100, 180]], col: ARC.yag, n: 3, spd: 0.4, r: 3 }], t);
        s += lines(172, 40, ['safra tuzu lümende kalır;', 'terminal ileumda emilir', '→ karaciğer → yeniden kullanım'], 'f64-m', 'start', 14);
        s += `<polyline points="170,92 250,100 330,106" class="f64-fl" stroke="var(--c-basic)"/>`;
      } else if (step === 2) {
        if (orl) { s += tx(180, 170, 'emilecek yağ asidi yok', 'f64-bad-t'); return s; }
        s += `<path d="M24 176 q10 -16 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" class="f64-er"/>` + tx(24, 205, 'ER: trigliserit yeniden yapılır', 'f64-m', 'start');
        s += `<g opacity="${n1(1 - p * 0.3)}">` + tg(50, 150, 0, 0) + '</g>';
        s += tx(206, 142, '+ kolesterol, fosfolipit, apolipoprotein', 'f64-m', 'middle');
        s += `<circle cx="286" cy="174" r="${n1(6 + 16 * e)}" class="f64-chy"/>` + tx(286, 208, 'şilomikron', 'f64-b');
      } else {
        if (orl) { s += tx(180, 170, 'emilecek yağ asidi yok', 'f64-bad-t'); return s; }
        const pts = [[250, 176], [270, 214], [270, 266], [336, 266]];
        s += `<polyline points="${pts.map((q) => q.join(',')).join(' ')}" class="f64-fl" stroke="var(--warn)"/>`;
        for (let i = 0; i < 3; i++) { const q = onPath(pts, RM ? 0.25 + i * 0.3 : (t * 0.18 + i / 3) % 1); s += `<circle cx="${n1(q[0])}" cy="${n1(q[1])}" r="9" class="f64-chy"/>`; }
        s += tx(90, 310, '✕ kapillere geçmez', 'f64-bad-t') + tx(270, 310, 'lenfle → sistemik dolaşım', 'f64-m');
      }
      return s;
    };
    const rA = () => { A.innerHTML = statA() + `<g class="f64-dynA">${dynA(0)}</g>`; el.querySelector('[data-o="lv"]').textContent = ['yok', 'az', 'orta', 'çok', 'en çok'][lv]; };
    const rB = () => { B.innerHTML = statB() + `<g class="f64-dynB">${dynB(0)}</g>`; };
    const capSet = () => setCap(el, son === 'or' && orl ? CAPS.or : son === 'step' ? CAPS.a[step] : (lv === 0 ? CAPS.s0 : CAPS.s1));
    rng.addEventListener('input', () => { lv = +rng.value; son = 'slider'; rA(); capSet(); }, sig);
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-or]'); if (!b) return; orl = !orl; b.setAttribute('aria-pressed', String(orl)); son = orl ? 'or' : 'slider'; ts = 0; rA(); rB(); capSet(); }, sig);
    wireNav(el, 4, (i) => { step = i; ts = 0; son = 'step'; rB(); capSet(); }, sig);
    rA(); rB();
    let T = 0, stop = null;
    if (!RM) stop = ticker(el, (dt) => { T += dt; ts += dt; const a = A.querySelector('.f64-dynA'), b = B.querySelector('.f64-dynB'); if (a) a.innerHTML = dynA(T); if (b) b.innerHTML = dynB(T); });
    return () => { ac.abort(); if (stop) stop(); };
  };

  /* ======================================================================
     5 · f64_tripsin — tripsin çağlayanı
     ====================================================================== */
  VIZ.f64_tripsin = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const CAP = {
      d: '<b>Duodenum.</b> Enterokinaz tripsinojeni tripsine çevirir; tripsin kimotripsinojeni ve daha çok tripsinojeni etkinleştirir. Tripsinin tripsin yapması (otokataliz) etkinliği üssel artırır. Oynat\'a basın. [[K1 s. 291–292]]',
      p: '<b>Pankreas içinde.</b> Neden (en sık alkol, safra taşı) ne olursa olsun sorun proenzimlerin pankreas içinde etkinleşmesidir. Fosfolipaz A2 nekroz, elastaz kanama yapar; salınan TNF-α ve IL-1 SIRS\'e, retroperitoneal yağı sindiren lipaz Grey Turner ve Cullen bulgularına yol açar. [[K1 s. 292]]',
    };
    let mod = 'd', prog = RM ? 1 : 0, play = false;
    el.innerHTML = `<div class="f64-ctl">${segHtml('Etkinleşme yeri', 'm', [['d', 'Duodenumda (normal)'], ['p', 'Pankreas içinde (pankreatit)']], 'd')}</div>
      <div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 575" role="img" aria-label="Tripsinojenin tripsine etkinleşmesi, otokataliz ve proenzimlerin etkinleşmesi; duodenumda normal, pankreas içinde pankreatit"></svg></div>
      ${RM ? '' : '<div class="btn-row f64-sw"><button type="button" class="btn" data-pl="1">Oynat</button><button type="button" class="btn ghost" data-pl="0">Baştan</button></div>'}`;
    const svg = el.querySelector('svg'), plb = el.querySelector('[data-pl="1"]');
    const box = (x, y, w, h, l, cls = '') => rc(x, y, w, h, 'f64-bx ' + cls, 6) + (Array.isArray(l) ? lines(x + w / 2, y + 17, l, 'f64-b', 'middle', 14) : tx(x + w / 2, y + h / 2 + 4, l, 'f64-b'));
    const draw = () => {
      const P = mod === 'p', tau = clamp(prog / 0.6, 0, 1);
      svg.setAttribute('viewBox', '0 0 360 ' + (P ? 575 : 480));
      let s = rc(0, 0, 360, P ? 575 : 480, P ? 'f64-bgp' : 'f64-bgd', 8) + tx(350, 16, P ? 'Pankreas içi' : 'Duodenum', P ? 'f64-bad-t' : 'f64-m', 'end');
      s += box(120, 22, 120, 30, 'Tripsinojen') + box(120, 90, 120, 30, 'Tripsin', tau > 0 ? 'on' : '');
      s += `<path d="M180 52 V84" class="f64-fl" stroke="${P ? 'var(--crit)' : 'var(--accent-ink)'}"/><polygon points="180,90 175,81 185,81" fill="${P ? 'var(--crit)' : 'var(--accent-ink)'}"/>`;
      s += P ? tx(188, 68, 'uygunsuz', 'f64-bad-t', 'start') + tx(188, 81, 'etkinleşme', 'f64-bad-t', 'start') : tx(188, 76, 'enterokinaz', 'f64-b', 'start');
      s += `<path d="M240 105 H272 V37 H246" class="f64-fl" stroke="var(--accent-ink)" fill="none"/><polygon points="240,37 249,32 249,42" fill="var(--accent-ink)"/>` + tx(280, 70, 'otokataliz', 'f64-b', 'start');
      const BR = [['Kimotripsinojen', '→ kimotripsin'], ['Profosfolipaz A2', '→ fosfolipaz A2'], ['Proelastaz', '→ elastaz']];
      s += `<path d="M180 120 V138 M60 138 H300 M60 138 V158 M180 138 V158 M300 138 V158" class="f64-fl" fill="none" stroke="var(--muted)"/>`;
      BR.forEach((b, i) => { s += box(6 + i * 120, 158, 108, 40, b, P ? 'bad' : (tau > 0.15 * (i + 1) ? 'on' : '')); });
      s += `<path d="M40 218 V336 H340" class="f64-ax" fill="none"/>` + tx(40, 212, 'tripsin etkinliği (birimsiz)', 'f64-m', 'start') + tx(340, 354, 'zaman →', 'f64-m', 'end');
      const f = (u) => (Math.exp(4 * u) - 1) / (Math.exp(4) - 1);
      let pts = '';
      for (let i = 0; i <= 40; i++) { const u = (i / 40) * tau; pts += `${n1(40 + u * 300)},${n1(336 - f(u) * 110)} `; }
      s += `<polyline points="${pts}" class="f64-egri"/>` + `<circle cx="${n1(40 + tau * 300)}" cy="${n1(336 - f(tau) * 110)}" r="4" fill="var(--accent-ink)"/>`;
      if (tau > 0.55) s += tx(70, 262, 'üssel artış', 'f64-b', 'start');
      if (!P) {
        const o = clamp((prog - 0.6) / 0.3, 0, 1);
        s += `<g opacity="${n1(0.25 + 0.75 * o)}">` + rc(6, 372, 348, 96, 'f64-lumen', 8) + tx(180, 392, 'duodenum lümeni', 'f64-m') + lines(180, 414, ['tripsin · kimotripsin · fosfolipaz A2 · elastaz', '✓ proteinleri ve lipitleri sindirmek için'], 'f64-b', 'middle', 18) + '</g>';
      } else {
        const R = [['Fosfolipaz A2 → nekroz', 'hücre zarı fosfolipitleri sindirilir', 0.62], ['Elastaz → kanama', 'damar duvarı sindirilir', 0.72], ['Sindirilen hücreler → SIRS', 'TNF-α ve IL-1 salınır', 0.82], ['Lipaz → hemorajik nekroz', 'interstisyuma salınır; retroperitoneal yağ sindirilir', 0.92]];
        R.forEach(([a, b, th], i) => { s += `<g opacity="${prog >= th ? 1 : 0.25}">` + rc(6, 372 + i * 42, 348, 36, 'f64-bx bad', 6) + tx(14, 388 + i * 42, a, 'f64-b f64-bad-t', 'start') + tx(14, 402 + i * 42, b, 'f64-m', 'start') + '</g>'; });
        const o = prog >= 0.95 ? 1 : 0.25;
        s += `<g opacity="${o}"><rect x="140" y="544" width="80" height="26" rx="10" class="f64-govde"/><ellipse cx="146" cy="557" rx="8" ry="10" class="f64-leke"/><ellipse cx="214" cy="557" rx="8" ry="10" class="f64-leke"/><ellipse cx="180" cy="557" rx="9" ry="7" class="f64-leke"/>` + tx(134, 555, 'Grey Turner', 'f64-b', 'end') + tx(134, 568, '(yanlar)', 'f64-m', 'end') + tx(228, 555, 'Cullen', 'f64-b', 'start') + tx(228, 568, '(göbek çevresi)', 'f64-m', 'start') + '</g>';
      }
      svg.innerHTML = s;
    };
    const setMod = (m) => { mod = m; basSec(el, 'm', m); prog = RM ? 1 : 0; play = false; if (plb) plb.textContent = 'Oynat'; draw(); setCap(el, CAP[m]); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m]'); if (b) { setMod(b.dataset.m); return; }
      const c = e.target.closest('[data-pl]'); if (!c) return;
      if (c.dataset.pl === '1') { if (prog >= 1) prog = 0; play = !play; c.textContent = play ? 'Duraklat' : 'Oynat'; } else { prog = 0; play = true; if (plb) plb.textContent = 'Duraklat'; }
      draw();
    }, sig);
    draw();
    let stop = null;
    if (!RM) stop = ticker(el, (dt) => { if (!play) return; prog = Math.min(1, prog + dt / 9); if (prog >= 1) { play = false; if (plb) plb.textContent = 'Oynat'; } draw(); });
    return () => { ac.abort(); if (stop) stop(); };
  };

  /* ======================================================================
     6 · f64_hco3 — kanal hücresinde HCO₃⁻ yapımı
     ====================================================================== */
  VIZ.f64_hco3 = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const CAP = [
      '<b>1 · CO₂ girer.</b> CO₂ kandan kanal hücresine difüzyonla geçer. İleri\'ye basın. [[K1 s. 293]]',
      '<b>2 · Karbonik anhidraz.</b> KA, CO₂ ile suyun H₂CO₃\'e dönüşmesini katalizler; H₂CO₃ H⁺ ve HCO₃⁻\'a ayrılır. Düzen mide asidi salgısına benzer. [[K1 s. 292–293]]',
      '<b>3 · HCO₃⁻ lümene.</b> HCO₃⁻ derişim farkıyla lümen zarından Cl⁻ ile değişerek kanala geçer; Cl⁻ CFTR\'den lümene geri döner. [[K1 s. 293]]',
      '<b>4 · H⁺ kana.</b> H⁺ bazolateral zardan Na⁺ ile değişerek kapillere atılır; bu değişimi Na⁺/K⁺-ATPaz\'ın tuttuğu düşük hücre içi Na⁺ sürer. [[K1 s. 293]]',
      '<b>5 · Su izler.</b> HCO₃⁻ ozmotik olarak aktiftir; kanala su da geçer. Sonuç: HCO₃⁻\'tan zengin pankreas sıvısı. [[K1 s. 293]]',
    ];
    const CF = '<b>CFTR bozuk.</b> Cl⁻ lümene geri dönemezse Cl⁻/HCO₃⁻ değişimini sürdürecek Cl⁻ kalmaz: HCO₃⁻ ve onu izleyen su salgısı azalır. Kistik fibroziste işlevi bozuk olan kanal budur. [[K1 s. 293]]';
    let step = 0, bad = false;
    el.innerHTML = `<div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 440" role="img" aria-label="Pankreas kanal hücresinde karbonik anhidraz, Cl⁻/HCO₃⁻ değişimi, CFTR ve Na⁺/H⁺ değiştirici ile HCO₃⁻ yapımı"></svg></div>
      ${legend([['var(--ink)', 'CO₂'], ['var(--crit)', 'H⁺'], ['var(--accent)', 'HCO₃⁻'], ['var(--c-clin)', 'Cl⁻'], ['var(--c-basic)', 'Na⁺'], ['var(--ok)', 'K⁺'], ['var(--muted)', 'su']])}${NAV}
      <div class="btn-row f64-sw"><button type="button" class="btn ghost" data-cf="1" aria-pressed="false">CFTR bozuk (kistik fibrozis)</button></div>`;
    const svg = el.querySelector('svg');
    const stat = () => {
      let s = rc(4, 4, 352, 74, 'f64-kan', 8) + tx(12, 20, 'İnterstisyum / kan', 'f64-b f64-kant', 'start');
      s += rc(4, 78, 352, 258, 'f64-cell', 0) + tx(350, 128, 'kanal hücresi', 'f64-m', 'end');
      s += rc(4, 336, 352, 90, 'f64-lumen', 8) + tx(12, 388, 'pankreas kanalı lümeni', 'f64-m', 'start');
      s += ln(4, 78, 356, 78, 'f64-memb') + ln(4, 336, 356, 336, 'f64-memb') + `<rect x="50" y="75" width="20" height="6" class="f64-gap"/>`;
      s += tx(76, 40, 'CO₂', 'f64-b', 'start');
      s += kap(170, 78, 62, 'Na⁺/H⁺') + tx(170, 100, 'değiştirici', 'f64-m') + kap(290, 78, 90, 'Na⁺/K⁺-ATPaz');
      s += `<g opacity="${step >= 1 ? 1 : 0.4}">` + rc(10, 176, 340, 50, 'f64-bx' + (step === 1 ? ' on' : ''), 6) + tx(180, 192, 'karbonik anhidraz (KA)', 'f64-b') + tx(180, 212, 'CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻', 'f64-m') + '</g>';
      s += kap(90, 336, 84, 'Cl⁻/HCO₃⁻', '') + tx(90, 318, 'değişim', 'f64-m');
      s += kap(270, 336, 54, 'CFTR', bad ? 'bad' : '') + tx(270, 318, 'Cl⁻ kanalı', 'f64-m') + (bad ? tx(310, 341, '✕', 'f64-bad-t') : '') + tx(270, 366, 'kistik fibrozda bozuk', bad ? 'f64-bad-t' : 'f64-m');
      if (step === 2 && bad) s += tx(180, 398, 'Cl⁻ tükendi → değişim yavaşlar', 'f64-bad-t');
      if (step === 4) s += tx(180, 414, bad ? 'HCO₃⁻ ve su azaldı' : 'HCO₃⁻\'tan zengin pankreas sıvısı', bad ? 'f64-bad-t' : 'f64-b');
      return s;
    };
    const FLS = () => [
      [0, { pts: [[60, 28], [60, 78], [60, 160]], col: 'var(--ink)', n: 4, spd: 0.28, r: 3 }],
      [1, { pts: [[120, 228], [120, 268]], col: ARC.h, n: 2, spd: 0.3, r: 3 }],
      [1, { pts: [[90, 228], [90, 268]], col: ARC.hco3, n: 2, spd: 0.3, r: 3.6 }],
      [2, { pts: [[90, 270], [90, 336], [90, 398]], col: ARC.hco3, n: bad ? 1 : 4, spd: bad ? 0.1 : 0.26, r: 3.6 }],
      [2, { pts: [[112, 400], [112, 336], [112, 292], [250, 292], [250, 336], [250, 398]], col: ARC.cl, n: bad ? 0 : 4, spd: 0.2, r: 3 }],
      [3, { pts: [[132, 230], [170, 250], [170, 78], [170, 28]], col: ARC.h, n: 3, spd: 0.24, r: 3 }],
      [3, { pts: [[190, 28], [190, 78], [190, 150]], col: ARC.na, n: 3, spd: 0.24, r: 3 }],
      [3, { pts: [[282, 160], [282, 78], [282, 28]], col: ARC.na, n: 3, spd: 0.24, r: 3 }],
      [3, { pts: [[300, 28], [300, 78], [300, 160]], col: ARC.k || 'var(--ok)', n: 2, spd: 0.24, r: 3 }],
      [4, { pts: [[64, 250], [64, 336], [64, 400]], col: ARC.su, n: bad ? 1 : 4, spd: 0.24, r: 2.8 }],
    ];
    const dyn = (t) => flowStr(FLS().map(([s, f]) => { const o = s === step ? 1 : s < step ? 0.35 : 0; return Object.assign({}, f, { op: o && f.n === 0 ? 0 : o }); }), t);
    const render = () => { svg.innerHTML = stat() + `<g class="f64-dyn">${dyn(0)}</g>`; };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-cf]'); if (!b) return; bad = !bad; b.setAttribute('aria-pressed', String(bad)); render(); setCap(el, bad ? CF : CAP[step]); }, sig);
    wireNav(el, 5, (i) => { step = i; render(); setCap(el, bad ? CF : CAP[i]); }, sig);
    render();
    let T = 0, stop = null;
    if (!RM) stop = ticker(el, (dt) => { T += dt; const d = svg.querySelector('.f64-dyn'); if (d) d.innerHTML = dyn(T); });
    return () => { ac.abort(); if (stop) stop(); };
  };

  /* ======================================================================
     7 · f64_kontrol — öğünün evresine göre pankreas sinyalleri
     ====================================================================== */
  VIZ.f64_kontrol = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const EV = [
      ['ara', 'Öğün arası', 0.3, 0.3, '<b>Öğün arası.</b> Pankreas sıvısı çok az salgılanır. Bir evre seçin. [[K1 s. 293]]'],
      ['sef', 'Sefalik', 1, 0.3, '<b>Sefalik evre.</b> Öğün beklentisi vagusu etkinleştirir; asiner hücre etkinliği biraz artar. [[K1 s. 293]]'],
      ['ger', 'Mide gerilmesi', 2, 0.3, '<b>Mide gerilmesi.</b> G hücreleri gastrin salgılar: pariyetal hücrelerden asidi ve asiner enzim salgısını uyarır; karbonhidrat, protein ve yağın gelişine hazırlık. [[K1 s. 293]]'],
      ['asit', 'Asitli kimus', 0.3, 3, '<b>Asitli kimus.</b> Duodenum mukozası sekretin salgılar: kanal hücreleri HCO₃⁻ salgılayıp kimusu nötralize eder; mide boşalması yavaşlar. [[K1 s. 293]]'],
      ['yag', 'Yağ/protein kimusu', 3, 0.3, '<b>Yağ ya da protein içeren kimus.</b> Duodenum mukoza hücreleri CCK salgılar: asiner enzim salgısı, karaciğerde safra yapımı ve safra kesesi kasılması artar, mide boşalması yavaşlar. [[K1 s. 293]]'],
    ];
    let ev = 0, lv = [0.3, 0.3];
    el.innerHTML = `<div class="f64-ctl">${segHtml('Öğün evresi', 'ev', EV.map((e, i) => [String(i), e[1]]), '0')}</div>
      <div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 480" role="img" aria-label="Vagus, gastrin, sekretin ve kolesistokinin sinyallerinin kaynağı ve pankreastaki hedefleri"></svg></div>`;
    const svg = el.querySelector('svg');
    const FL = () => {
      const k = EV[ev][0];
      return [
        { on: k === 'sef', pts: [[62, 62], [62, 100], [110, 150]], col: 'var(--ok)', lb: ['Vagus', 34, 104, 'start'] },
        { on: k === 'ger', pts: [[175, 62], [160, 150]], col: 'var(--accent-ink)', lb: ['Gastrin', 168, 112, 'start'] },
        { on: k === 'asit', pts: [[290, 62], [276, 150]], col: 'var(--c-clin)', lb: ['Sekretin', 296, 112, 'start'] },
        { on: k === 'yag', pts: [[300, 62], [210, 150]], col: 'var(--c-basic)', lb: ['CCK', 252, 108, 'start'] },
        { on: k === 'yag', pts: [[334, 62], [348, 100], [348, 428], [236, 428]], col: 'var(--c-basic)' },
        { on: k === 'yag', pts: [[348, 300], [348, 470], [58, 470], [58, 444]], col: 'var(--c-basic)' },
      ];
    };
    const stat = () => {
      const k = EV[ev][0];
      let s = '';
      s += rc(10, 12, 104, 50, 'f64-bx', 24) + tx(62, 34, 'Beyin') + tx(62, 50, 'vagus', 'f64-m');
      s += rc(128, 12, 104, 50, 'f64-bx', 10) + tx(180, 34, 'Mide') + tx(180, 50, 'G hücreleri', 'f64-m');
      s += rc(246, 12, 108, 50, 'f64-bx', 10) + tx(300, 34, 'Duodenum') + tx(300, 50, 'mukozası', 'f64-m');
      s += rc(40, 150, 280, 84, 'f64-org', 14) + tx(180, 168, 'Pankreas', 'f64-b');
      s += rc(52, 176, 120, 50, 'f64-bx' + (['sef', 'ger', 'yag'].includes(k) ? ' on' : ''), 8) + lines(112, 192, ['Asiner hücreler', '→ enzimler'], '', 'middle', 15);
      s += rc(188, 176, 120, 50, 'f64-bx' + (k === 'asit' ? ' on' : ''), 8) + lines(248, 192, ['Kanal hücreleri', '→ HCO₃⁻ + su'], '', 'middle', 15);
      // göstergeler
      const bar = (x, lab, v, cl) => rc(x, 262, 36, 120, 'f64-bt', 4) + `<rect x="${x}" y="${n1(382 - 120 * v / 3)}" width="36" height="${n1(120 * v / 3)}" rx="4" class="${cl}"/>` + tx(x + 18, 402, lab, 'f64-b');
      s += bar(100, 'Enzim', lv[0], 'f64-bf') + bar(224, 'HCO₃⁻', lv[1], 'f64-bf ok') + tx(180, 252, 'salgı düzeyi (nitel)', 'f64-m');
      s += rc(6, 414, 110, 30, 'f64-bx' + (k === 'yag' ? ' on' : ''), 8) + tx(61, 427, 'Karaciğer') + tx(61, 440, k === 'yag' ? 'safra yapımı ↑' : 'safra yapımı', 'f64-m');
      s += rc(126, 414, 110, 30, 'f64-bx' + (k === 'yag' ? ' on' : ''), 8) + tx(181, 427, 'Safra kesesi') + tx(181, 440, k === 'yag' ? 'kasılma' : 'gevşek', 'f64-m');
      // mide notları
      const mn = { ger: ['asit ↑', 'var(--crit)'], asit: ['boşalma ↓', 'var(--ok)'], yag: ['boşalma ↓', 'var(--ok)'] }[k];
      if (mn) s += tx(180, 76, 'mide: ' + mn[0], 'f64-b', 'middle').replace('class="f64-t f64-b"', `class="f64-t f64-b" fill="${mn[1]}" style="fill:${mn[1]}"`);
      return s;
    };
    const dyn = (t) => {
      const F = FL();
      return flowStr(F.map((f) => Object.assign({}, f, { op: f.on ? 1 : 0, n: 4, spd: 0.3 })), t) + F.filter((f) => f.on && f.lb).map((f) => tx(f.lb[1], f.lb[2], f.lb[0], 'f64-b', f.lb[3])).join('');
    };
    const render = (t) => { svg.innerHTML = stat() + `<g class="f64-dyn">${dyn(t)}</g>`; };
    let T = 0, stop = null, raf = 0;
    const tw = () => {
      const tg = [EV[ev][2], EV[ev][3]]; let ch = false;
      for (let i = 0; i < 2; i++) { const d = tg[i] - lv[i]; if (Math.abs(d) > 0.01) { lv[i] += d * 0.18; ch = true; } else lv[i] = tg[i]; }
      if (ch) { raf = requestAnimationFrame(() => { tw(); render(T); }); }
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ev]'); if (!b) return;
      ev = +b.dataset.ev; basSec(el, 'ev', ev); setCap(el, EV[ev][4]);
      if (RM) lv = [EV[ev][2], EV[ev][3]]; else { cancelAnimationFrame(raf); tw(); }
      render(T);
    }, sig);
    render(0);
    if (!RM) stop = ticker(el, (dt) => { T += dt; const d = svg.querySelector('.f64-dyn'); if (d) d.innerHTML = dyn(T); });
    return () => { ac.abort(); cancelAnimationFrame(raf); if (stop) stop(); };
  };

  /* ======================================================================
     8 · f64_motilite — segmental, propulsif, GMK
     ====================================================================== */
  VIZ.f64_motilite = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const CAP = {
      seg: '<b>Segmental kasılma.</b> Komşu segmentlerin sirküler kası bir bölmeyi kapatır, longitudinal kas sürekli kasılıp gevşer: kimus enzimlerle karışır ve fırçamsı kenara değer, ilerlemez. [[K1 s. 293]]',
      pro: '<b>Propulsif kasılma.</b> Bolusun arkasındaki sirküler kas ile longitudinal kas koordineli kasılır, kimus ilerler. Her peristaltik dalga birkaç saniye sürer, saniyede birkaç santimetre yol alır. [[K1 s. 293]]',
      gmk: '<b>Açlık.</b> Kasılmalar seyrek ve düzensizdir; 90 dakikada bir duodenumdan ileoçekal valve yayılan yoğun dalga (göç eden motor kompleks) sindirilmemiş kimusu kolona süpürür. Motilin bu dalgayı başlatır. [[K1 s. 293–294]]',
    };
    const RMT = { seg: 1, pro: 3.3, gmk: 11.2 };
    let mod = 'seg', play = true, T = 0;
    el.innerHTML = `<div class="f64-ctl">${segHtml('Kasılma tipi', 'mo', [['seg', 'Segmental'], ['pro', 'Propulsif'], ['gmk', 'Açlık: GMK']], 'seg')}</div>
      <div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 250" role="img" aria-label="Bağırsak segmentinde segmental, propulsif kasılma ve açlıkta göç eden motor kompleks canlandırması"></svg></div>
      ${legend([['var(--warn)', 'kimus'], ['var(--accent)', 'enzim'], ['var(--accent-soft)', 'sirküler kas'], ['var(--muted)', 'longitudinal kas']])}
      ${RM ? '' : '<div class="btn-row f64-sw"><button type="button" class="btn ghost" data-pp="1" aria-pressed="false">Duraklat</button></div>'}`;
    const svg = el.querySelector('svg');
    const NP = 30;
    const sm = (a, b, x) => { const q = clamp((x - a) / (b - a), 0, 1); return q * q * (3 - 2 * q); };
    const draw = (t) => {
      const XR = mod === 'gmk' ? 290 : 350, X0 = 10, cy = 128, H = 24;
      let con = [], pr = [], op = 1, strip = '', wave = null;
      const tm = t % 12;
      if (mod === 'seg') {
        const cyc = Math.floor(t / 2), u = (t % 2) / 2, bl = sm(0.75, 1, u);
        const A = [60, 140, 220, 300], B = [100, 180, 260, 340], from = cyc % 2 ? B : A, to = cyc % 2 ? A : B;
        con = from.map((c, k) => ({ c: lerp(c, to[k], bl), A: 15, w: 9 }));
      } else if (mod === 'pro') {
        const xb = 20 + ((t % 7) / 7) * 320; wave = xb;
        con = [{ c: xb - 40, A: 17, w: 11 }, { c: xb + 36, A: -5, w: 14 }];
        op = clamp(Math.min(xb / 40, (350 - xb) / 40), 0, 1);
      } else {
        const f = lerp(X0, XR, clamp((tm - 10.4) / 1.4, 0, 1));
        wave = tm >= 10.4 && tm <= 11.8 ? f : null;
        con = wave !== null ? [{ c: f, A: 19, w: 13 }] : [{ c: 70 + 150 * (0.5 + 0.5 * Math.sin(t * 0.9)), A: 4, w: 10 }, { c: 200 - 100 * (0.5 + 0.5 * Math.sin(t * 0.55 + 1)), A: 3, w: 8 }];
        const fill = tm / 12 * 340;
        strip = rc(10, 12, 340, 14, 'f64-bt', 5) + rc(10, 12, Math.max(2, fill), 14, 'f64-bf', 5) + tx(10, 42, '0 dk', 'f64-m', 'start') + tx(350, 42, '90 dk', 'f64-m', 'end') + tx(clamp(10 + fill, 40, 320), 42, Math.round(tm / 12 * 90) + ' dk', 'f64-b');
        op = tm < 1.5 ? tm / 1.5 : 1;
      }
      const d = (x) => con.reduce((s, k) => s + k.A * Math.exp(-Math.pow((x - k.c) / k.w, 2)), 0);
      const xs = []; for (let x = X0; x <= XR; x += 4) xs.push(x); xs.push(XR);
      const top = (off) => xs.map((x) => `${x},${n1(cy - H + d(x) - off)}`), bot = (off) => xs.map((x) => `${x},${n1(cy + H - d(x) + off)}`);
      const poly = (a, b, cls) => `<polygon points="${a.join(' ')} ${b.slice().reverse().join(' ')}" class="${cls}"/>`;
      let s = strip;
      const lg = 2.5 + (mod === 'seg' ? 2 * Math.sin(t * 2.6) : 0);
      s += poly(top(10 + lg), top(10), 'f64-lg') + poly(bot(0), bot(10 + lg).map((p) => p), 'f64-lg');
      s += poly(top(10), top(0), 'f64-cm') + poly(bot(0), bot(10), 'f64-cm');
      s += poly(top(0), bot(0), 'f64-lumen');
      for (let x = X0 + 4; x < XR; x += 6) s += ln(x, n1(cy + H - d(x)), x, n1(cy + H - d(x) - 4), 'f64-mvt');
      // parçacıklar
      const edges = (() => { const c = con.map((k) => k.c).sort((a, b) => a - b); return [X0, ...c, XR]; })();
      let ps = '';
      for (let i = 0; i < NP; i++) {
        let x, y, o = op;
        if (mod === 'seg') {
          const j = i % 5, a = edges[j] || X0, b = edges[j + 1] || XR, fr = 0.12 + 0.76 * (0.5 + 0.5 * Math.sin(t * (1.1 + (i % 3) * 0.35) + i * 1.7));
          x = lerp(a, b, fr); y = cy + (H - 8) * Math.sin(t * (1.3 + (i % 4) * 0.2) + i * 2.3);
        } else if (mod === 'pro') {
          x = wave + ((i % 10) - 4.5) * 4.6 + Math.sin(t * 2 + i) * 1.5; y = cy + (Math.floor(i / 10) - 1) * 9 + Math.sin(t * 1.6 + i) * 2;
        } else {
          const bx = 24 + ((i * 53) % 255);
          x = bx + 3 * Math.sin(t * 0.8 + i); y = cy + (H - 9) * Math.sin(i * 3.1 + t * 0.3) * 0.9;
          if (tm >= 10.4) { const f = lerp(X0, XR, clamp((tm - 10.4) / 1.4, 0, 1)); if (f > x - 8) x = Math.max(x, f + 6 + (i % 5) * 2.5); }
          if (x > XR - 2 || tm > 11.8) { x = 304 + (i % 6) * 7.5; y = cy - 18 + Math.floor(i / 6) * 9; }
        }
        const glow = y > cy + H - 12 && mod === 'seg';
        ps += i % 5 === 4 ? `<circle cx="${n1(x)}" cy="${n1(y)}" r="2.4" fill="var(--accent)" opacity="${n1(o)}"/>` : `<circle cx="${n1(x)}" cy="${n1(y)}" r="${glow ? 3.8 : 3}" fill="var(--warn)" ${glow ? 'stroke="var(--ink)" stroke-width="1"' : ''} opacity="${n1(o)}"/>`;
      }
      s += ps;
      if (RM) {
        if (mod === 'seg') s += [100, 180, 260, 20].map((x) => tx(x, cy + 4, '↔', 'f64-b')).join('');
        if (mod === 'pro') s += tx(wave + 38, cy + 4, '→', 'f64-b');
      }
      if (mod === 'pro') s += tx(350, 66, '→ kalın bağırsak', 'f64-m', 'end') + tx(180, 214, 'her dalga birkaç saniye · saniyede birkaç cm', 'f64-m');
      if (mod === 'gmk') {
        s += rc(298, 96, 56, 64, 'f64-bx', 6) + tx(326, 90, 'kolon', 'f64-m') + ln(292, 98, 292, 158, 'f64-valv') + tx(292, 192, 'ileoçekal valv', 'f64-m') + tx(10, 192, 'duodenum', 'f64-m', 'start');
        s += kap(46, 66, 62, 'motilin', tm >= 10.2 ? '' : 'dim');
        if (RM) s += tx(150, 214, '→→→', 'f64-b');
      }
      if (mod === 'seg') s += tx(180, 214, 'kimus karışır, net ilerleme yok', 'f64-m');
      svg.innerHTML = s;
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-mo]');
      if (b) { mod = b.dataset.mo; basSec(el, 'mo', mod); T = RM ? RMT[mod] : 0; setCap(el, CAP[mod]); draw(T); return; }
      const p = e.target.closest('[data-pp]'); if (p) { play = !play; p.textContent = play ? 'Duraklat' : 'Oynat'; p.setAttribute('aria-pressed', String(!play)); }
    }, sig);
    T = RM ? RMT.seg : 0;
    draw(T);
    let stop = null;
    if (!RM) stop = ticker(el, (dt) => { if (!play) return; T += dt; draw(T); });
    return () => { ac.abort(); if (stop) stop(); };
  };

  /* ======================================================================
     9 · f64_dalga — yavaş dalga, gerilme, sivri uçlu potansiyel
     ====================================================================== */
  VIZ.f64_dalga = (el) => {
    const ac = new AbortController(), sig = { signal: ac.signal };
    const CAP = {
      off: '<b>Bolus yok.</b> Yavaş dalgalar eşiğin altında kalır; kasılma olmaz. Bolusu ekleyin. [[K1 s. 294]]',
      on: '<b>Bolus var.</b> Gerilme nörotransmiter salgılatır, zar biraz depolarize olur; bir sonraki yavaş dalga eşiği aşar: voltaj kapılı kanallardan Na⁺ ve Ca²⁺ girer, sivri uçlu potansiyel ve kasılma olur. [[K1 s. 293–294]]',
      sym: '<b>Sempatik.</b> Prevertebral gangliyonlardaki sinapslarla enterik sinir sistemini inhibe eder: motilite ve salgı azalır, splanknik vazokonstriksiyonla bağırsak kan akımı düşer. [[K1 s. 294]]',
      par: '<b>Parasempatik (vagus).</b> Motiliteyi ve GI salgıları artırır: \'dinlen ve sindir\'. [[K1 s. 294]]',
    };
    const P = 2.73, THR = -46, AMP = 11, WIN = 10;
    let bolus = false, oto = 'den', play = true, T = RM ? 8 : 0, son = 'bolus', cs = 0;
    el.innerHTML = `<div class="btn-row f64-ctl"><button type="button" class="btn ghost" data-bo="1" aria-pressed="false">Bolus (gerilme)</button>${segHtml('Otonom girdi', 'ot', [['sym', 'Sempatik'], ['den', 'Dengede'], ['par', 'Parasempatik (vagus)']], 'den')}</div>
      <div class="f64-host"><svg class="f64-svg" viewBox="0 0 360 326" role="img" aria-label="Zar potansiyeli izi: yavaş dalgalar, eşik, sivri uçlu potansiyeller ve bağırsak kasının kasılması"></svg></div>
      <p class="f64-info"><b>Enterik sinir sistemi:</b> miyenterik (Auerbach) + submukozal (Meissner) pleksus; yarı özerk. ${REF('[[K1 s. 294]]')}</p>
      ${RM ? '' : '<div class="btn-row f64-sw"><button type="button" class="btn ghost" data-pp="1" aria-pressed="false">Duraklat</button></div>'}`;
    const svg = el.querySelector('svg');
    const base = () => -60 + (bolus ? 7 : 0) + { sym: -5, den: 0, par: 3 }[oto];
    const wv = (t) => { const ph = (((t % P) + P) % P) / P; return ph < 0.7 ? Math.pow(Math.sin(Math.PI * ph / 0.7), 2) : 0; };
    const Vm = (t, spike = true) => {
      const b = base(), ph = (((t % P) + P) % P) / P; let v = b + AMP * wv(t);
      const ex = b + AMP - THR;
      if (spike && ex > 0 && ph < 0.7) { const ns = clamp(Math.round(1.5 + ex / 2.2), 2, 4); for (let j = 0; j < ns; j++) { const c = 0.35 + (j - (ns - 1) / 2) * 0.07; v += 8 * Math.exp(-Math.pow((ph - c) / 0.011, 2)); } }
      return v;
    };
    const Y = (mv) => clamp(24 + (-30 - mv) / 45 * 170, 22, 196);
    const draw = (t) => {
      let s = tx(56, 14, 'Zar potansiyeli (mV)', 'f64-m', 'start');
      s += rc(56, Y(-40), 294, Y(-70) - Y(-40), 'f64-band', 0);
      [-70, -55, -40].forEach((v) => { s += ln(56, Y(v), 350, Y(v), 'f64-grid') + tx(50, Y(v) + 4, '−' + Math.abs(v), 'f64-m', 'end'); });
      s += tx(60, Y(-70) - 5, 'dinlenim aralığı −40 ile −70 mV', 'f64-m', 'start');
      s += ln(56, Y(THR), 350, Y(THR), 'f64-esik') + tx(346, Y(THR) - 4, 'eşik', 'f64-b', 'end');
      s += `<path d="M56 22 V196 H350" class="f64-ax" fill="none"/>`;
      let pts = '';
      const N = 480;
      for (let i = 0; i <= N; i++) { const tt = t - WIN + (i / N) * WIN; pts += `${n1(56 + (i / N) * 294)},${n1(Y(Vm(tt)))} `; }
      s += `<polyline points="${pts}" class="f64-iz"/>`;
      s += tx(350, 212, 'son ' + WIN + ' s · kitaba göre 20–30 yavaş dalga/dk', 'f64-m', 'end');
      // alt şerit
      const ex = base() + AMP - THR, c = ex > 0 ? clamp((Vm(t, false) - THR + 1) / 3, 0, 1) : 0;
      const hL = (bolus ? 34 : 24) * (1 - 0.55 * c), cy = 262;
      s += rc(30, cy - hL / 2 - 5, 300, hL + 10, 'f64-kasband', 10) + rc(30, cy - hL / 2, 300, hL, 'f64-lumen', 6);
      if (bolus) { s += `<ellipse cx="180" cy="${cy}" rx="${n1(46 - 10 * c)}" ry="${n1(Math.max(6, hL / 2 - 3))}" class="f64-bol"/>` + tx(180, cy + 4, 'bolus', 'f64-b'); for (let i = 0; i < 7; i++) s += `<circle cx="${n1(60 + i * 40)}" cy="${n1(cy - hL / 2 - 9 + (i % 2) * (hL + 18))}" r="2.6" fill="var(--c-clin)" opacity="${n1(0.45 + 0.5 * Math.sin(t * 3 + i))}"/>`; s += tx(340, cy - 28, 'nörotransmiter', 'f64-m', 'end'); }
      s += tx(30, cy - 30, c > 0.5 ? 'kasılma' : 'gevşek', 'f64-b', 'start');
      if (oto === 'sym') { s += `<line x1="30" y1="298" x2="330" y2="298" stroke="var(--c-clin)" stroke-width="1.6" stroke-linecap="round"/>` + tx(180, 314, 'splanknik vazokonstriksiyon', 'f64-m'); }
      if (oto === 'par') { s += `<line x1="30" y1="298" x2="330" y2="298" stroke="var(--c-clin)" stroke-width="4" stroke-linecap="round" opacity=".5"/>`; for (let i = 0; i < 6; i++) { const ph = RM ? 0.4 : (t * 0.6 + i / 6) % 1; s += `<circle cx="${n1(50 + i * 52)}" cy="${n1(cy + hL / 2 + 8 + ph * 18)}" r="2.8" fill="var(--c-basic)" opacity="${n1(1 - ph * 0.6)}"/>`; } s += tx(180, 314, 'salgı ↑', 'f64-b'); }
      svg.innerHTML = s;
    };
    const capSet = () => setCap(el, son === 'oto' && oto !== 'den' ? CAP[oto] : (bolus ? CAP.on : CAP.off));
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-bo]');
      if (b) { bolus = !bolus; b.setAttribute('aria-pressed', String(bolus)); son = 'bolus'; capSet(); draw(T); return; }
      const o = e.target.closest('[data-ot]');
      if (o) { oto = o.dataset.ot; basSec(el, 'ot', oto); son = 'oto'; capSet(); draw(T); return; }
      const p = e.target.closest('[data-pp]'); if (p) { play = !play; p.textContent = play ? 'Duraklat' : 'Oynat'; p.setAttribute('aria-pressed', String(!play)); }
    }, sig);
    draw(T);
    let stop = null;
    if (!RM) stop = ticker(el, (dt) => { if (!play) return; T += dt; draw(T); });
    return () => { ac.abort(); if (stop) stop(); };
  };
})();
