/* Bölüm 50 · Omurilik · bileşenler (tarif: docs/tasarim/fiz50.md; K1 s. 211–220).
   Hepsi şematiktir; sayılar ve eşikler kitaptandır. Renkler yalnız site değişkenleriyle (koyu tema çalışır). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => f * f * (3 - 2 * f);
  const kapak = (el) => {
    const c = el.closest('.viz').querySelector('.viz-cap'), v = c.innerHTML;
    return { set: (h) => { c.innerHTML = REF(h); }, reset: () => { c.innerHTML = v; } };
  };
  const seg = (ad, secenek, varsayilan) => `<div class="seg" role="group" aria-label="${ad}">${secenek.map(([k, e]) => `<button type="button" data-k="${k}" aria-pressed="${k === varsayilan}">${e}</button>`).join('')}</div>`;
  const segBagla = (kok, f) => {
    const bs = [...kok.querySelectorAll('button')];
    const sec = (k) => bs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
    kok.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; sec(b.dataset.k); f(b.dataset.k); });
    return sec;
  };
  /* dokunulabilir SVG öğesi: tıklama + Enter/Boşluk */
  const dokun = (kok, sel, f) => {
    kok.addEventListener('click', (e) => { const n = e.target.closest(sel); if (n && kok.contains(n)) f(n, e); });
    kok.addEventListener('keydown', (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const n = e.target.closest(sel); if (n && kok.contains(n)) { e.preventDefault(); f(n, e); } });
  };
  const PAT = (id, tur, col, bg) => {
    const ic = { diag: `<line x1="0" y1="0" x2="0" y2="6" stroke="${col}" stroke-width="2.4"/>`, cross: `<line x1="0" y1="0" x2="0" y2="6" stroke="${col}" stroke-width="1.8"/><line x1="0" y1="3" x2="6" y2="3" stroke="${col}" stroke-width="1.8"/>`, dots: `<circle cx="3" cy="3" r="1.5" fill="${col}"/>`, hor: `<line x1="0" y1="3" x2="6" y2="3" stroke="${col}" stroke-width="2"/>` }[tur];
    return `<pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse"${tur === 'diag' ? ' patternTransform="rotate(45)"' : ''}><rect width="6" height="6" fill="${bg}"/>${ic}</pattern>`;
  };
  const poly = (p, s = 1) => 'M' + p.map((q) => (q[0] * s).toFixed(1) + ',' + q[1].toFixed(1)).join('L') + 'Z';
  const sek = (a1, a2, r1, r2) => {
    const t = [], n = 6;
    for (let i = 0; i <= n; i++) { const a = ((a1 + ((a2 - a1) * i) / n) * Math.PI) / 180; t.push([130 * r2 * Math.cos(a), 100 * r2 * Math.sin(a)]); }
    for (let i = n; i >= 0; i--) { const a = ((a1 + ((a2 - a1) * i) / n) * Math.PI) / 180; t.push([130 * r1 * Math.cos(a), 100 * r1 * Math.sin(a)]); }
    return t;
  };
  /* ortak omurilik kesiti: merkez 0,0; ön aşağıda, arka yukarıda (K1 Şekil 50.1) */
  const TR = {
    gra: { p: [[2, -92], [17, -90], [15, -46], [5, -26], [2, -26]], g: 'c', k: 'dors', ad: 'Grasil' },
    kun: { p: [[18, -90], [46, -84], [40, -62], [28, -42], [17, -44]], g: 'c', k: 'dors', ad: 'Kuneat' },
    lcs: { p: sek(-52, -10, 0.56, 0.86), g: 'i', k: 'kort', ad: 'Lateral kortikospinal' },
    psc: { p: sek(-62, -16, 0.89, 0.985), g: 'c', k: 'sereb', ad: 'Posterior spinoserebellar' },
    asc: { p: sek(14, 62, 0.89, 0.985), g: 'c', k: 'sereb', ad: 'Anterior spinoserebellar' },
    lst: { p: sek(2, 34, 0.74, 0.87), g: 'c', k: 'talam', ad: 'Lateral spinotalamik' },
    ast: { p: sek(56, 80, 0.62, 0.88), g: 'c', k: 'talam', ad: 'Anterior spinotalamik' },
    acs: { p: [[3, 64], [18, 66], [17, 93], [3, 96]], g: 'i', k: 'kort', ad: 'Anterior kortikospinal' },
  };
  const OUT = 'var(--muted)';
  /* o: {lat, tr:[[id,yön]], att(id,yön) -> öznitelik, gri, griOp, kanal} */
  const kesit = (o = {}) => {
    const { lat = false, tr = [], att = () => '', gri = 'var(--chip)', griOp = 1, kanal = true, zemin = true } = o;
    return `<ellipse cx="0" cy="0" rx="130" ry="100" fill="${zemin ? 'var(--paper)' : 'none'}" stroke="var(--line)" stroke-width="2"/>
      ${tr.map(([id, s]) => `<path d="${poly(TR[id].p, s)}" data-t="${id}" data-s="${s}" ${att(id, s)}/>`).join('')}
      <g opacity="${griOp}">
        <g stroke="${OUT}" stroke-width="1" stroke-linecap="round" fill="none"><path d="M8,-14L50,-70M-8,-14L-50,-70" stroke-width="13.5"/><path d="M12,8L46,38M-12,8L-46,38" stroke-width="31"/>${lat ? '<path d="M30,-6L58,-8M-30,-6L-58,-8" stroke-width="11.5"/>' : ''}<ellipse cx="0" cy="-2" rx="23" ry="19" fill="${OUT}" stroke="none"/></g>
        <g stroke="${gri}" stroke-linecap="round" fill="none"><path d="M8,-14L50,-70M-8,-14L-50,-70" stroke-width="12"/><path d="M12,8L46,38M-12,8L-46,38" stroke-width="29"/>${lat ? '<path d="M30,-6L58,-8M-30,-6L-58,-8" stroke-width="9.5"/>' : ''}<ellipse cx="0" cy="-2" rx="22" ry="18" fill="${gri}" stroke="none"/></g>
      </g>
      <path d="M0,100L0,64" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/><path d="M0,-100L0,-88" stroke="${OUT}" stroke-width="2.4" stroke-linecap="round"/>
      ${kanal ? '<circle cx="0" cy="0" r="5" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.6"/>' : ''}`;
  };
  const kes = (cx, cy, k, ic, ekstra = '') => `<g transform="translate(${cx},${cy}) scale(${k})"${ekstra}>${ic}</g>`;

  /* ---------- 1 · omurga kanalında omurilik ---------- */
  VIZ.f50_uzun = (el) => {
    const kap = kapak(el);
    const V = [];
    for (let i = 0; i < 7; i++) V.push({ n: 'C' + (i + 1), y: 34 + i * 15, h: 12 });
    for (let i = 0; i < 12; i++) V.push({ n: 'T' + (i + 1), y: 140 + i * 17, h: 14 });
    for (let i = 0; i < 5; i++) V.push({ n: 'L' + (i + 1), y: 344 + i * 21, h: 17 });
    const GR = [['C', 'Servikal', 8, 40, 12.5], ['T', 'Torakal', 12, 140, 130 / 12], ['L', 'Lomber', 5, 270, 12.5], ['S', 'Sakral', 5, 322, 7.5], ['Co', 'Koksigeal', 1, 360, 0]];
    const sy = (g, i) => GR[g][3] + i * GR[g][4];
    const TIP = { yet: 366, yeni: 395 };
    const wAt = (y) => { const r = (a, b, c, d) => (y < a ? 0 : y < b ? ease((y - a) / (b - a)) : y < c ? 1 : y < d ? 1 - ease((y - c) / (d - c)) : 0); return 8 + 6 * Math.max(r(66, 84, 134, 150), r(274, 290, 332, 348)); };
    const cordPath = (tip) => {
      const L = [], R = [];
      for (let y = 6; y <= tip; y += 3) { let w = wAt(y); if (y > tip - 26) w *= Math.sqrt(Math.max(0, (tip - y) / 26)); L.push([100 - w / 2, y]); R.push([100 + w / 2, y]); }
      L.push([100, tip]);
      return 'M' + L.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L') + 'L' + R.reverse().map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L') + 'Z';
    };
    const ticks = GR.map((g, gi) => Array.from({ length: g[2] }, (_, i) => { const y = sy(gi, i), d = gi < 2 ? 0 : gi === 2 ? 6 + i * 3 : gi === 3 ? 22 + i * 4 : 40; return `<line class="f50-tk" data-gr="${gi}" x1="106" y1="${y.toFixed(1)}" x2="122" y2="${(y + d).toFixed(1)}"/>`; }).join('')).join('');
    el.innerHTML = `<div class="f50-uzun"><svg class="f50-svg" viewBox="0 0 360 524" role="img" aria-label="Omurga kanalında omurilik: omurlar, meninksler, konus medullaris, kauda ekuina ve filum terminale">
      <line x1="46" y1="28" x2="132" y2="28" stroke="var(--muted)" stroke-dasharray="4 3"/>
      <text x="140" y="31" class="f50-l">foramen magnum · medulla oblongata ↑</text>
      ${V.map((v) => `<rect x="52" y="${v.y}" width="35" height="${v.h}" rx="2.5" fill="var(--paper)" stroke="var(--muted)"/><rect x="113" y="${v.y + 2}" width="9" height="${v.h - 4}" rx="2" fill="var(--paper)" stroke="var(--muted)"/>`).join('')}
      <rect x="52" y="456" width="35" height="40" rx="3" fill="var(--paper)" stroke="var(--muted)"/><rect x="113" y="456" width="9" height="40" rx="2" fill="var(--paper)" stroke="var(--muted)"/><rect x="62" y="499" width="20" height="13" rx="3" fill="var(--paper)" stroke="var(--muted)"/>
      ${[['C1', 34], ['C7', 124], ['T1', 140], ['T6', 225], ['T12', 327], ['L1', 344], ['L2', 365], ['L3', 386], ['L5', 428], ['S2', 474]].map(([t, y]) => `<text x="48" y="${y + 10}" text-anchor="end" class="f50-v">${t}</text>`).join('')}
      <g data-g="menin" tabindex="0" role="button" aria-label="Meninksler ve CSF" class="f50-hit">
        <path d="M90,24V462Q90,474 100,474Q110,474 110,462V24Z" fill="var(--c-basic-soft)"/>
        <path d="M89,24V462Q89,475 100,475Q111,475 111,462V24" fill="none" stroke="var(--muted)" stroke-width="2.8"/>
        <path d="M92,24V460M108,24V460" stroke="var(--muted)" stroke-dasharray="3 2" fill="none"/></g>
      <g class="f50-ticks">${ticks}</g>
      <g class="f50-cauda"></g>
      <path class="f50-filum" fill="none" stroke="var(--muted)" stroke-width="2"/>
      <path class="f50-cord" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.2" data-g="uc"/>
      <g class="f50-gbr"></g>
      <text x="140" y="108" class="f50-l f50-hit" data-g="C" tabindex="0" role="button">servikal genişleme C4–T1</text>
      <text x="140" y="316" class="f50-l f50-hit" data-g="L" tabindex="0" role="button">lomber genişleme L2–S3</text>
      <text class="f50-tipl f50-lb f50-hit" x="140" data-g="uc" tabindex="0" role="button"></text>
      <text x="140" y="432" class="f50-l f50-hit" data-g="uc" tabindex="0" role="button">kauda ekuina</text>
      <text x="140" y="476" class="f50-l" fill="var(--c-basic)">dural kese ≈ S2</text>
      <text x="140" y="508" class="f50-l f50-hit" data-g="uc" tabindex="0" role="button">filum terminale → koksiks</text>
      <g class="f50-hit" data-g="menin" tabindex="0" role="button"><text x="140" y="196" class="f50-l">dura · araknoid · pia</text><text x="140" y="212" class="f50-l" fill="var(--c-basic)">CSF: subaraknoid aralık</text></g>
      <text x="140" y="62" class="f50-l">C1 ve C2 dışında sinirler</text><text x="140" y="76" class="f50-l">intervertebral foramenden çıkar</text>
    </svg>
    <div class="f50-uside"><div class="seg" role="group" aria-label="Yaş" style="margin-bottom:12px"><button type="button" data-y="yet" aria-pressed="true">Erişkin</button><button type="button" data-y="yeni" aria-pressed="false">Yenidoğan</button></div>
      <ul class="f50-tab" aria-label="Segment grupları">${GR.map((g, i) => `<li><button type="button" data-g="${g[0]}" aria-pressed="false"><i class="f50-sw f50-sw${i}"></i><span>${g[1]}</span><b>${g[2]}</b></button></li>`).join('')}<li class="f50-top"><button type="button" data-g="S" aria-pressed="false"><span>Toplam</span><b>31 segment = 31 çift spinal sinir</b></button></li></ul></div></div>`;
    const q = (s) => el.querySelector(s);
    const cord = q('.f50-cord'), cauda = q('.f50-cauda'), filum = q('.f50-filum'), tipl = q('.f50-tipl'), gbr = q('.f50-gbr');
    let yas = 'yet', tip = TIP.yet, hedef = TIP.yet, secili = '';
    const ciz = () => {
      cord.setAttribute('d', cordPath(tip));
      let c = '';
      for (let k = 0; k < 9; k++) { const x0 = 98 + k * 0.5, x1 = 93 + k * 1.75; c += `<path d="M${x0},${(tip - 2).toFixed(1)}C${x0},${tip + 40} ${x1},${tip + 60} ${x1},468" fill="none" stroke="var(--muted)" stroke-width="1.1"/>`; }
      cauda.innerHTML = c;
      filum.setAttribute('d', `M100,${tip.toFixed(1)}L100,506`);
      tipl.setAttribute('y', (tip + 4).toFixed(1));
      tipl.textContent = tip > 380 ? 'konus medullaris · yenidoğan: ≈ L3' : 'konus medullaris · erişkin: L1/2';
    };
    ciz();
    const isaret = () => {
      el.querySelectorAll('.f50-tk').forEach((t) => { const gi = +t.dataset.gr; const on = secili === 'S' || (secili && GR[gi][0] === secili); t.classList.toggle('on', !!on); t.classList.toggle('sol', !!secili && !on); });
      el.querySelectorAll('.f50-tab button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === secili)));
      let s = '';
      if (secili && secili !== 'S' && secili !== 'menin' && secili !== 'uc') { const gi = GR.findIndex((g) => g[0] === secili), a = sy(gi, 0) - 4, b = sy(gi, GR[gi][2] - 1) + 4; s = `<path d="M128,${a}V${b}" stroke="var(--accent)" stroke-width="3" fill="none"/><text x="134" y="${((a + b) / 2 + 4).toFixed(1)}" class="f50-lb" fill="var(--accent-ink)">${GR[gi][0] === 'Co' ? 'Co' : GR[gi][0] + '1–' + GR[gi][0] + GR[gi][2]}</text>`; }
      gbr.innerHTML = s;
      el.querySelector('.f50-cord').classList.toggle('on', secili === 'uc');
      el.querySelector('[data-g=menin]').classList.toggle('on', secili === 'menin');
    };
    const METIN = {
      C: '<b>Servikal: 8 segment.</b> Servikal omurdan bir çift fazla sinir çıkar. C4–T1’deki servikal genişleme üst ekstremiteyi besleyen brakiyal pleksusa karşılık gelir. [[K1 s. 211]]',
      T: '<b>Torakal: 12 segment.</b> Sinirler intervertebral foramenlerden çıkar. [[K1 s. 211]]',
      L: '<b>Lomber: 5 segment.</b> L2–S3’teki lomber genişleme alt ekstremiteyi besleyen lomber pleksusa karşılık gelir. [[K1 s. 211]]',
      S: '<b>Sakral 5, koksigeal 1 segment.</b> Toplam 31 segment, 31 çift spinal sinir. [[K1 s. 211]]',
      Co: '<b>Sakral 5, koksigeal 1 segment.</b> Toplam 31 segment, 31 çift spinal sinir. [[K1 s. 211]]',
      menin: '<b>Pia, araknoid, dura.</b> CSF subaraknoid aralıkta omuriliği çevreler ve dural kesede ≈ S2’ye dek uzanır. [[K1 s. 211]]',
      uc: '<b>Uç.</b> Konus medullaris omuriliğin incelen ucudur; kauda ekuina omurilik bittikten sonra kendi foramenlerine dek inen sinirlerdir; pia ile dura birleşip filum terminaleyi oluşturur ve omuriliği koksikse bağlar. [[K1 s. 211]]',
    };
    const sec = (g) => {
      secili = secili === g ? '' : g;
      isaret();
      if (secili) kap.set(METIN[secili]); else kap.reset();
    };
    dokun(el, '[data-g]', (n) => sec(n.dataset.g));
    const yasBtn = el.querySelectorAll('[data-y]');
    yasBtn.forEach((b) => b.addEventListener('click', () => {
      yas = b.dataset.y; hedef = TIP[yas];
      yasBtn.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      if (RM) { tip = hedef; ciz(); }
      if (yas === 'yeni') kap.set('<b>Yenidoğan.</b> Omurilik daha aşağıda, yaklaşık L3 düzeyinde biter. [[K1 s. 211]]'); else { secili = ''; isaret(); kap.reset(); }
    }));
    const dur = ticker(el, (dt) => { if (Math.abs(tip - hedef) < 0.2) return; tip += clamp(hedef - tip, -dt * 48, dt * 48); ciz(); });
    return dur;
  };

  /* ---------- 2 · kesit haritası ---------- */
  VIZ.f50_kesit = (el) => {
    const kap = kapak(el);
    const AL = {
      dors: { n: 1, ad: 'Dorsal kolonlar (grasil, kuneat)', g: 'c', m: '<b>Dorsal kolonlar (grasil medialde, kuneat lateralde).</b> Propriyosepsiyon, vibrasyon ve iki nokta ayrımı (ince dokunma). [[K1 s. 211]]' },
      talam: { n: 2, ad: 'Spinotalamik traktuslar', g: 'c', m: '<b>Spinotalamik traktuslar.</b> Ağrı, ısı, kaba dokunma ve basınç. [[K1 s. 211]]' },
      sereb: { n: 3, ad: 'Spinoserebellar traktuslar', g: 'c', m: '<b>Anterior ve posterior spinoserebellar traktus.</b> Kas ve eklemlerden serebelluma propriyosepsiyon. [[K1 s. 212]]' },
      kort: { n: 4, ad: 'Kortikospinal traktuslar', g: 'i', m: '<b>Kortikospinal (piramidal) traktuslar.</b> Üst motor nöron aksonları; ventral boynuzda kası uyaran α-motor nöronlara (alt motor nöron) aktarılır. [[K1 s. 212]]' },
      gri: { n: 5, ad: 'Gri cevher: dorsal ve ventral boynuz, santral kanal', g: 'g', m: null },
      lat: { n: 6, ad: 'Lateral boynuz (yalnız torakal)', g: 'g', m: '<b>Lateral boynuz.</b> Yalnız torakal bölgede bulunur; preganglioner sempatik nöronlara karşılık gelir. [[K1 s. 211]]' },
      sulk: { n: 7, ad: 'Sulkuslar', g: 'g', m: '<b>Sulkuslar.</b> Önde derin anterior median sulkus, arkada sığ posterior median sulkus. [[K1 s. 211]]' },
      ekstra: { n: 8, ad: 'Ekstrapiramidal traktuslar (yer gösterilmedi)', g: 'i', m: '<b>Ekstrapiramidal traktuslar.</b> Rubro-, tekto-, vestibülo-, olivo- ve retikülospinal; beyin sapı çekirdeklerinden çıkar, medüller piramitlerden geçmez; esas işi postür ve kas tonusu. [[K1 s. 212]]' },
    };
    const RENK = { dors: 'var(--accent)', talam: 'var(--warn)', sereb: 'var(--accent)', kort: 'var(--c-clin)' };
    const SOFT = { dors: 'var(--accent-soft)', talam: 'var(--warn-soft)', sereb: 'var(--accent-soft)', kort: 'var(--c-clin-soft)' };
    const tr = [['gra', -1], ['kun', -1], ['lst', -1], ['ast', -1], ['psc', -1], ['asc', -1], ['lcs', 1], ['acs', 1]];
    const att = (id) => { const k = TR[id].k; return `class="f50-a" data-a="${k}" tabindex="0" role="button" aria-label="${AL[k].ad}" fill="${SOFT[k]}" stroke="${RENK[k]}" stroke-width="1.6"${k === 'sereb' ? ' stroke-dasharray="4 2"' : ''}`; };
    const rozet = (n, x, y) => `<g class="f50-rz" pointer-events="none"><circle cx="${x}" cy="${y}" r="9" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="f50-rn">${n}</text></g>`;
    el.innerHTML = `<div class="f50-ks"><div class="f50-ksc">${seg('Göster', [['h', 'Hepsi'], ['c', 'Çıkan'], ['i', 'İnen']], 'h')}</div>
      <svg class="f50-svg" viewBox="0 0 360 306" role="img" aria-label="Omurilik kesiti: çıkan traktuslar sol yarıda, inen traktuslar sağ yarıda">
        <text x="70" y="14" class="f50-lb" fill="var(--accent-ink)" text-anchor="middle">ÇIKAN</text><text x="290" y="14" class="f50-lb" fill="var(--c-clin)" text-anchor="middle">İNEN</text>
        <text x="180" y="28" class="f50-l" text-anchor="middle">arka (dorsal)</text><text x="180" y="300" class="f50-l" text-anchor="middle">ön (ventral)</text>
        ${kes(180, 153, 1, kesit({ lat: true, tr, att }))}
        <g class="f50-alan"><rect class="f50-a" data-a="gri" tabindex="0" role="button" aria-label="Gri cevher" x="158" y="132" width="44" height="40" fill="transparent"/>
        <rect class="f50-a" data-a="lat" tabindex="0" role="button" aria-label="Lateral boynuz" x="108" y="141" width="34" height="18" fill="transparent" stroke="none"/><rect class="f50-a" data-a="lat" tabindex="0" role="button" aria-label="Lateral boynuz" x="218" y="141" width="34" height="18" fill="transparent"/>
        <rect class="f50-a" data-a="sulk" tabindex="0" role="button" aria-label="Sulkuslar" x="174" y="206" width="12" height="46" fill="transparent"/><rect class="f50-a" data-a="sulk" tabindex="0" role="button" aria-label="Sulkuslar" x="174" y="46" width="12" height="16" fill="transparent"/></g>
        ${rozet(1, 170, 78)}${rozet(2, 100, 174)}${rozet(3, 66, 128)}${rozet(4, 262, 118)}${rozet(5, 148, 190)}${rozet(6, 120, 150)}${rozet(7, 180, 240)}
      </svg>
      <ol class="f50-lej">${Object.entries(AL).map(([k, a]) => `<li><button type="button" data-a="${k}"><i class="f50-rzb">${a.n}</i>${a.ad}</button></li>`).join('')}</ol></div>`;
    let secili = '', grup = 'h';
    const sv = el.querySelector('svg');
    const ciz = () => {
      sv.querySelectorAll('.f50-a').forEach((n) => {
        const k = n.dataset.a, a = AL[k];
        let op = 1;
        if (grup !== 'h' && a.g !== 'g' && a.g !== grup) op = 0.18;
        else if (secili && secili !== k) op = 0.4;
        n.style.opacity = op;
        n.classList.toggle('on', secili === k);
        n.setAttribute('stroke-width', secili === k ? 3.6 : 1.6);
      });
      el.querySelectorAll('.f50-lej button').forEach((b) => { b.classList.toggle('on', b.dataset.a === secili); const a = AL[b.dataset.a]; b.style.opacity = grup !== 'h' && a.g !== 'g' && a.g !== grup ? 0.4 : 1; });
    };
    const sec = (k) => { secili = secili === k && k !== 'gri' ? '' : k; ciz(); if (secili === 'gri' || !secili) kap.reset(); else kap.set(AL[secili].m); };
    dokun(el, '[data-a]', (n) => sec(n.dataset.a));
    segBagla(el.querySelector('.seg'), (k) => { grup = k; ciz(); });
    ciz();
    return () => {};
  };

  /* ---------- 3 · arter alanları ve aortik klemp ---------- */
  VIZ.f50_kan = (el) => {
    const kap = kapak(el);
    const BUL = [
      ['crit', 'Ön boynuz α-motor nöronları → düzeyde <b>alt motor nöron</b> felci'],
      ['crit', 'Kortikospinal traktus → düzeyin altında <b>üst motor nöron</b> felci'],
      ['crit', 'Spinotalamik traktus → <b>ağrı ve ısı</b> kaybı'],
      ['crit', 'Sakral parasempatik nöronlar → <b>mesane ve barsak</b> bozukluğu'],
      ['ok', 'Dorsal kolonlar → <b>propriyosepsiyon ve vibrasyon korunur</b>'],
    ];
    const venler = [-110, -90, -70, 70, 90, 110].map((a) => { const r = (a * Math.PI) / 180; return `<circle cx="${(130 * 1.07 * Math.cos(r)).toFixed(1)}" cy="${(100 * 1.07 * Math.sin(r)).toFixed(1)}" r="4.2" fill="var(--paper)" stroke="var(--c-basic)" stroke-width="2"/>`; }).join('');
    const kes1 = kesit({ lat: false, zemin: false, griOp: 0.8, att: () => '' });
    el.innerHTML = `<div class="f50-kan" data-pn="k">
      <div class="f50-kc"><button type="button" class="btn" data-kl aria-pressed="false">Aortayı klemple</button><span class="f50-dsg">${seg('Görünüm', [['k', 'Kesit'], ['b', 'Boyuna']], 'k')}</span></div>
      <div class="f50-kp">
        <svg class="f50-svg" data-p="b" viewBox="0 0 300 320" role="img" aria-label="Boyuna şema: vertebral arterlerden inen anterior spinal arter, iki posterior spinal arter, aorta, radiküler arterler ve Adamkiewicz arteri">
          <defs>${PAT('f50-kh', 'diag', 'var(--crit)', 'var(--crit-soft)')}</defs>
          <text x="94" y="16" text-anchor="middle" class="f50-l">aorta</text>
          <rect x="86" y="24" width="16" height="282" rx="3" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="2"/>
          <rect x="215" y="40" width="20" height="266" rx="7" fill="var(--chip)" stroke="var(--muted)"/>
          <rect class="f50-kisk" x="215" y="236" width="20" height="70" rx="5" fill="url(#f50-kh)" opacity="0" stroke="var(--crit)" stroke-width="1.6"/>
          <path d="M193,6C196,30 215,34 225,50M257,6C254,30 235,34 225,50" fill="none" stroke="var(--crit)" stroke-width="2"/>
          <text x="186" y="14" text-anchor="end" class="f50-l">vertebral a.</text>
          <path d="M225,50V304" stroke="var(--crit)" stroke-width="3.4"/>
          <path d="M218,42V304M232,42V304" stroke="var(--crit)" stroke-width="1.3" opacity=".75"/>
          <text x="297" y="116" text-anchor="end" class="f50-l">2 posterior</text><text x="297" y="130" text-anchor="end" class="f50-l">spinal a.</text><text x="297" y="144" text-anchor="end" class="f50-l">(PICA’dan)</text>
          ${[96, 146, 196, 288].map((y) => `<path d="M102,${y}C140,${y} 180,${y - 10} 215,${y - 8}" fill="none" stroke="var(--crit)" stroke-width="1.5" opacity=".7"/>`).join('')}
          <path class="f50-adam" d="M102,262C150,262 170,238 215,238" fill="none" stroke="var(--crit)" stroke-width="5" stroke-linecap="round"/>
          <path class="f50-hit" data-ad="1" tabindex="0" role="button" aria-label="Adamkiewicz arteri" d="M102,262C150,262 170,238 215,238" fill="none" stroke="transparent" stroke-width="22"/>
          <text x="108" y="232" class="f50-lb" fill="var(--crit)">Adamkiewicz</text>
          <text x="118" y="288" class="f50-l">radiküler arterler</text>
          <g class="f50-klemp"><rect class="f50-j1" x="52" y="196" width="22" height="9" rx="2" fill="var(--ink)"/><rect class="f50-j2" x="114" y="196" width="22" height="9" rx="2" fill="var(--ink)"/></g>
          <text x="50" y="214" text-anchor="end" class="f50-l f50-kt" opacity="0">klemp</text>
          <path d="M243,50V50" /><g class="f50-lev"><path d="M240,60L246,60M240,224L246,224M240,282L246,282" stroke="var(--muted)"/><path d="M243,224V282" stroke="var(--crit)" stroke-width="2.4"/>
          <text x="250" y="64" class="f50-l">servikal</text><text x="250" y="228" class="f50-l">T8</text><text x="250" y="286" class="f50-l">L1</text></g>
          <g class="f50-dot"></g>
          <text x="150" y="316" class="f50-l" text-anchor="middle">servikalin altında radiküler katkı şart</text>
        </svg>
        <svg class="f50-svg" data-p="k" viewBox="0 0 300 280" role="img" aria-label="Kesit: ön üçte iki anterior spinal arter, arka üçte bir iki posterior spinal arter alanıdır; 3+3 spinal ven epidural venöz pleksusa akar">
          <defs>${PAT('f50-kh2', 'diag', 'var(--crit)', 'var(--crit-soft)')}<clipPath id="f50-kc-p"><rect x="-140" y="-110" width="280" height="76"/></clipPath><clipPath id="f50-kc-a"><rect x="-140" y="-34" width="280" height="150"/></clipPath></defs>
          <text x="150" y="16" text-anchor="middle" class="f50-l">arka (dorsal)</text><text x="150" y="276" text-anchor="middle" class="f50-l">ön (ventral)</text>
          <g transform="translate(150,142) scale(.95)">
            <ellipse rx="139" ry="107" fill="none" stroke="var(--c-basic)" stroke-dasharray="5 4" stroke-width="1.6"/>
            <ellipse rx="130" ry="100" fill="var(--ok-soft)" clip-path="url(#f50-kc-p)"/>
            <ellipse rx="130" ry="100" fill="var(--crit-soft)" clip-path="url(#f50-kc-a)"/>
            <ellipse class="f50-kisk2" rx="130" ry="100" fill="url(#f50-kh2)" clip-path="url(#f50-kc-a)" opacity="0"/>
            <path d="M-122,-34H122" stroke="var(--muted)" stroke-dasharray="3 3" fill="none"/>
            ${kes1}
            ${venler}
            <circle cx="0" cy="74" r="6.5" fill="var(--crit)" stroke="var(--paper)" stroke-width="1.5"/>
            <circle cx="-30" cy="-86" r="5" fill="var(--crit)" stroke="var(--paper)" stroke-width="1.3"/><circle cx="30" cy="-86" r="5" fill="var(--crit)" stroke="var(--paper)" stroke-width="1.3"/>
            <text x="0" y="-60" text-anchor="middle" class="f50-lb" fill="var(--ok)">arka 1/3</text>
            <text x="-70" y="72" text-anchor="middle" class="f50-lb" fill="var(--crit)">ön 2/3</text>
          </g>
        </svg>
      </div>
      <ul class="legend"><li><span><i class="f50-sw" style="background:var(--crit)"></i>anterior spinal a.: ön 2/3</span></li><li><span><i class="f50-sw" style="background:var(--ok)"></i>2 posterior spinal a.: arka 1/3</span></li><li><span><i class="f50-sw" style="background:var(--c-basic)"></i>3 ön + 3 arka spinal ven → epidural venöz pleksus</span></li></ul>
      <ul class="f50-bulgu" aria-label="Klemp sonrası bulgular">${BUL.map(([r, t]) => `<li class="${r}">${t}</li>`).join('')}</ul></div>`;
    const q = (s) => el.querySelector(s), kok = q('.f50-kan');
    const btn = q('[data-kl]'), lis = [...el.querySelectorAll('.f50-bulgu li')], dg = q('.f50-dot');
    const isk1 = q('.f50-kisk'), isk2 = q('.f50-kisk2'), j1 = q('.f50-j1'), j2 = q('.f50-j2'), kt = q('.f50-kt');
    let kl = false, tt = 0, ph = 0;
    const ASAY = (u) => 50 + u * 254;
    const ciz = () => {
      const jaw = clamp(tt / 0.8, 0, 1), isk = clamp((tt - 0.8) / 0.8, 0, 1), g = 12 * (1 - jaw);
      j1.setAttribute('x', 64 - g); j2.setAttribute('x', 102 + g);
      kt.setAttribute('opacity', jaw > 0.5 ? 1 : 0);
      isk1.setAttribute('opacity', isk); isk2.setAttribute('opacity', isk);
      lis.forEach((li, i) => li.classList.toggle('on', tt > 1.6 + i * 0.28));
      let d = '';
      const dots = [];
      for (let i = 0; i < 7; i++) dots.push([94, 30 + ((ph * 70 + i * 40) % 276)]);
      for (let i = 0; i < 6; i++) dots.push([225, ASAY(((ph * 0.28 + i / 6) % 1))]);
      for (let i = 0; i < 3; i++) { const u = (ph * 0.45 + i / 3) % 1, x = lerp(102, 215, u), y = lerp(262, 238, ease(u)); dots.push([x, y, 'a']); }
      dots.forEach(([x, y, k]) => {
        if (jaw > 0.9 && ((x === 94 && y > 200) || k === 'a' || (x === 225 && y > 236))) return;
        d += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="var(--crit)" stroke="var(--paper)" stroke-width=".8"/>`;
      });
      dg.innerHTML = RM ? '' : d;
    };
    const dar = () => kok.classList.toggle('f50-dar', el.clientWidth < 560);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(dar) : null;
    if (ro) ro.observe(el); dar();
    const sg = segBagla(q('.f50-dsg .seg'), (k) => { kok.dataset.pn = k; });
    const MET = '<b>Klemp: anterior spinal arter sendromu.</b> Adamkiewicz arteri ateroskleroz, aort diseksiyonu ya da anevrizma onarımında klemple tıkanabilir; ön üçte iki iskemiye girer, parapleji gelişir. Dorsal kolonlar posterior spinal arterlerden beslendiği için propriyosepsiyon ve vibrasyon korunur. [[K1 s. 212–213]]';
    btn.addEventListener('click', () => {
      kl = !kl;
      btn.textContent = kl ? 'Klempi aç' : 'Aortayı klemple';
      btn.setAttribute('aria-pressed', String(kl));
      if (RM) { tt = kl ? 3 : 0; ciz(); }
      if (kl) kap.set(MET); else kap.reset();
    });
    dokun(el, '[data-ad]', () => kap.set('<b>Adamkiewicz arteri.</b> Anterior spinal arteri destekleyen en büyük radiküler arter; yeri değişkendir, en sık solda T8–L1 arasında, sol posterior interkostal arterden (aortanın dalı) çıkar. [[K1 s. 212]]'));
    if (RM) ciz();
    const dur = ticker(el, (dt) => {
      ph += dt;
      const hd = kl ? 3 : 0;
      if (tt !== hd) tt = kl ? Math.min(3, tt + dt) : Math.max(0, tt - dt * 5);
      ciz();
    });
    return () => { dur(); if (ro) ro.disconnect(); };
  };

  /* ---------- 4 · sinyali izleyin: DCML ve spinotalamik ---------- */
  VIZ.f50_yol = (el) => {
    const kap = kapak(el);
    const ADIM = {
      dcml: [
        null,
        '<b>2 · Birinci sıra nöron.</b> Psödounipolar; gövdesi dorsal kök ganglionunda. Dorsal kökten girer. [[K1 s. 213]]',
        '<b>3 · Aynı tarafta yukarı.</b> Birinci sıra nöron çok uzundur: aynı taraftaki dorsal kolonda çıkar; alt vücut medialdeki grasil, üst vücut lateraldeki kuneat traktusta. [[K1 s. 213]]',
        '<b>4 · Medullada sinaps ve çaprazlaşma.</b> Grasil (ya da kuneat) çekirdekte ikinci sıra nöronla sinaps; ikinci sıra nöron karşı tarafa geçer (duyusal dekusasyon) ve medial lemniskusla yükselir. [[K1 s. 213]]',
        '<b>5 · Talamus.</b> İkinci sıra nöron talamusta üçüncü sıra nöronla sinaps yapar. [[K1 s. 213]]',
        '<b>6 · Korteks.</b> Üçüncü sıra nöron internal kapsülden primer somatosensoriyel kortekse ulaşır: somatotopik düzen (homunkulus). [[K1 s. 213]]',
      ],
      stt: [
        null,
        '<b>2 · Birinci sıra nöron.</b> Gövdesi dorsal kök ganglionunda; dorsal kökten girer. [[K1 s. 213]]',
        '<b>3 · Lissauer traktusu ve dorsal boynuz.</b> 1–2 omur düzeyi çıkabilir ya da inebilir, sonra dorsal boynuzda ikinci sıra nöronla sinaps yapar. [[K1 s. 213]]',
        '<b>4 · Omurilikte çaprazlaşma.</b> İkinci sıra nöronun aksonu santral kanalın önünde, anterior komissürde karşıya geçer ve karşı taraf spinotalamik traktusta yükselir. [[K1 s. 214]]',
        '<b>5 · Talamus.</b> İkinci sıra nöron talamusta üçüncü sıra nöronla sinaps yapar. [[K1 s. 213]]',
        '<b>6 · Korteks.</b> Üçüncü sıra nöron internal kapsülden primer somatosensoriyel kortekse ulaşır: somatotopik düzen (homunkulus). [[K1 s. 213]]',
      ],
    };
    const ADIM1 = '<b>1 · Reseptör.</b> Uyaran, aksiyon potansiyellerinin tekrarlayan ateşlenmesiyle kodlanır. Bir yol seçin ve adım adım ilerletin. [[K1 s. 213]]';
    const CK = { lum: 440, cer: 300 }, K = 0.45;
    const yol = (yl, kay) => {
      const cy = CK[kay], ex = kay === 'lum' ? 0 : 0;
      const alt = kay === 'lum';
      const rec = alt ? [28, 476] : [28, 336], drg = alt ? [96, 450] : [96, 310], ent = [157, cy - 31];
      const A = [rec, [62, rec[1] - 14], drg, [128, cy - 20], ent];
      let B, C, D, syn1, syn2, cross;
      if (yl === 'dcml') {
        const gx = alt ? 176 : 166, nuc = alt ? [168, 214] : [152, 208];
        B = alt ? [ent, [172, cy - 28], [176, cy - 40], [176, 292], [175, 276], [172, 244], nuc] : [ent, [162, cy - 28], [166, 280], [165, 248], nuc];
        C = [nuc, [176, 200], [190, 192], [204, 178]];
        D = [[204, 178], [208, 152], [216, 134]];
        syn1 = nuc; cross = [180, 196];
      } else {
        const dh = [164, cy - 20];
        B = [ent, [156, cy - 42], [162, cy - 38], dh];
        C = [dh, [172, cy - 4], [180, cy + 6], [200, cy + 10], [224, cy + 9]];
        D = alt ? [[224, cy + 9], [226, 390], [225, 311], [222, 262], [214, 216], [212, 180], [216, 134]] : [[224, cy + 9], [222, 262], [214, 216], [212, 180], [216, 134]];
        syn1 = dh; cross = [180, cy + 6];
      }
      const E = [[216, 134], [226, 104], [232, 72], [235, 48]];
      return { segs: [A, B, C, D, E], syn1, cross, drg, rec, ent, cy, alt };
    };
    const uzun = (p) => { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; };
    const kesikYol = (p, f) => {
      const L = uzun(p) * f; let acc = 0; const o = [p[0]];
      for (let i = 1; i < p.length; i++) { const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); if (acc + d >= L) { const u = d ? (L - acc) / d : 0; o.push([lerp(p[i - 1][0], p[i][0], u), lerp(p[i - 1][1], p[i][1], u)]); return o; } o.push(p[i]); acc += d; }
      return o;
    };
    const d = (p) => 'M' + p.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join('L');
    el.innerHTML = `<div class="f50-yol"><div class="f50-yc">${seg('Yol', [['dcml', 'DCML'], ['stt', 'Spinotalamik']], 'dcml')}${seg('Kaynak', [['lum', 'Alt ekstremite'], ['cer', 'Üst ekstremite']], 'lum')}</div>
      <svg class="f50-svg" viewBox="0 0 360 520" role="img" aria-label="Beyin ve omurilik şeması: duyusal yolun üç nöronu, sinaps ve çaprazlaşma yerleri"><defs>${PAT('f50-yh', 'dots', 'var(--accent)', 'var(--accent-soft)')}</defs><g class="f50-st"></g><g class="f50-dy"></g></svg>
      <div class="btn-row f50-ys"><button type="button" class="btn ghost" data-g="-1">◀ Geri</button><button type="button" class="btn ghost" data-g="1">İleri ▶</button><button type="button" class="btn" data-pl>Oynat</button><span class="f50-sy" aria-live="polite">Adım 1/6</span></div></div>`;
    const q = (s) => el.querySelector(s), st = q('.f50-st'), dy = q('.f50-dy'), sy = q('.f50-sy'), pl = q('[data-pl]');
    let yl = 'dcml', kay = 'lum', adim = 1, t = 0, oyn = false, Y = yol(yl, kay);
    const renk = () => (yl === 'dcml' ? 'var(--accent)' : 'var(--warn)');
    const statik = () => {
      const c = renk(), soft = yl === 'dcml' ? 'var(--accent-soft)' : 'var(--warn-soft)';
      const att = (id, s) => {
        if (yl === 'dcml') { const on = (id === 'gra' && kay === 'lum') || (id === 'kun' && kay === 'cer'); return on && s === -1 ? `fill="${soft}" stroke="${c}" stroke-width="2.4"` : (id === 'gra' || id === 'kun') && s === -1 ? 'fill="none" stroke="var(--line)"' : 'fill="none" stroke="none"'; }
        return (id === 'lst' || id === 'ast') && s === 1 ? `fill="${soft}" stroke="${c}" stroke-width="2"` : 'fill="none" stroke="none"';
      };
      const secT = (cy2, on) => `<g opacity="${on ? 1 : 0.5}">${kes(180, cy2, K, kesit({ tr: yl === 'dcml' ? [['gra', -1], ['kun', -1]] : [['lst', 1], ['ast', 1]], att, griOp: 1 }) + (yl === 'stt' ? '<rect x="-14" y="8" width="28" height="12" rx="3" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="3"/>' : ''))}</g>`;
      st.innerHTML = `<path d="M180,8V508" stroke="var(--line)" stroke-dasharray="5 4"/><text x="184" y="506" class="f50-l">orta hat</text>
        <path d="M70,72Q180,-8 290,72" fill="none" stroke="var(--muted)" stroke-width="9" stroke-linecap="round" opacity=".55"/>
        <circle cx="235" cy="42" r="11" fill="${soft}" stroke="${c}" stroke-width="2"/><text x="235" y="46" text-anchor="middle" class="f50-rn">S1</text>
        <text x="180" y="16" text-anchor="middle" class="f50-l">primer somatosensoriyel korteks</text>
        <g transform="translate(322,28)" opacity=".85"><circle r="5" fill="var(--chip)" stroke="var(--muted)"/><circle cx="-9" cy="11" r="4.5" fill="var(--chip)" stroke="var(--muted)"/><circle cx="9" cy="11" r="4.5" fill="var(--chip)" stroke="var(--muted)"/><circle cy="-1" r="2.4" fill="var(--c-clin)"/></g><text x="322" y="56" text-anchor="middle" class="f50-l">homunkulus</text>
        <path d="M144,114L128,58M216,114L232,56" stroke="var(--chip)" stroke-width="9" stroke-linecap="round"/><path d="M144,114L128,58M216,114L232,56" stroke="var(--muted)" stroke-width="1" stroke-linecap="round" opacity=".6"/>
        <text x="246" y="84" class="f50-l">internal kapsül</text>
        <ellipse cx="142" cy="130" rx="30" ry="15" fill="var(--chip)" stroke="var(--muted)"/><ellipse cx="218" cy="130" rx="30" ry="15" fill="var(--chip)" stroke="var(--muted)"/><text x="104" y="134" text-anchor="end" class="f50-l">talamus</text>
        <ellipse cx="180" cy="212" rx="52" ry="30" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6"/><text x="240" y="216" class="f50-l">medulla oblongata</text>
        <circle cx="168" cy="214" r="4.5" fill="${yl === 'dcml' && kay === 'lum' ? soft : 'var(--chip)'}" stroke="var(--muted)"/><circle cx="192" cy="214" r="4.5" fill="var(--chip)" stroke="var(--muted)"/><circle cx="152" cy="208" r="4.5" fill="${yl === 'dcml' && kay === 'cer' ? soft : 'var(--chip)'}" stroke="var(--muted)"/><circle cx="208" cy="208" r="4.5" fill="var(--chip)" stroke="var(--muted)"/>
        <text x="120" y="208" text-anchor="end" class="f50-l">grasil ve</text><text x="120" y="221" text-anchor="end" class="f50-l">kuneat çekirdek</text>
        ${secT(300, kay === 'cer' || true)}${secT(440, true)}
        <text x="244" y="296" class="f50-l">servikal</text><text x="244" y="309" class="f50-l">omurilik</text><text x="244" y="436" class="f50-l">lomber</text><text x="244" y="449" class="f50-l">omurilik</text>
        <ellipse cx="${Y.drg[0]}" cy="${Y.drg[1]}" rx="11" ry="7" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.6" transform="rotate(-20 ${Y.drg[0]} ${Y.drg[1]})"/>
        <text x="${Y.drg[0]}" y="${Y.drg[1] - 14}" text-anchor="middle" class="f50-l">DRG</text>
        <circle class="f50-rec" cx="${Y.rec[0]}" cy="${Y.rec[1]}" r="8" fill="var(--paper)" stroke="${c}" stroke-width="2.4"/><text x="${Y.rec[0]}" y="${Y.rec[1] + 24}" text-anchor="middle" class="f50-l">reseptör</text>
        ${yl === 'stt' ? `<text x="${Y.ent[0] - 16}" y="${Y.ent[1] - 22}" text-anchor="end" class="f50-l">Lissauer</text>` : ''}`;
    };
    const dinamik = () => {
      const c = renk(), ton = [[4.2, 1], [4.2, 1], [3.6, 0.7], [3.6, 0.7], [3, 0.5]];
      let h = '';
      const stepT = RM ? 1 : clamp(t / 1.5, 0, 1);
      for (let i = 0; i < 5; i++) {
        const sAd = i + 2;
        if (adim < sAd) break;
        const f = adim === sAd ? stepT : 1, p = f >= 1 ? Y.segs[i] : kesikYol(Y.segs[i], f);
        h += `<path d="${d(p)}" fill="none" stroke="${c}" stroke-width="${ton[i][0]}" opacity="${ton[i][1]}" stroke-linecap="round" stroke-linejoin="round"/>`;
        if (adim === sAd && f < 1 && !RM) { const e = p[p.length - 1]; h += `<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="5.5" fill="${c}" stroke="var(--paper)" stroke-width="1.6"/>`; }
      }
      const done = (k) => adim > k || (adim === k && stepT >= 1);
      if (done(3)) h += `<circle cx="${Y.syn1[0]}" cy="${Y.syn1[1]}" r="5.5" fill="var(--paper)" stroke="${c}" stroke-width="2.4"/>`;
      if (done(5)) h += `<circle cx="218" cy="130" r="6" fill="var(--paper)" stroke="${c}" stroke-width="2.4"/>`;
      if (adim >= 4) {
        const cr = Y.cross, lab = yl === 'dcml' ? 'medullada çaprazlaşır' : 'omurilikte çaprazlaşır';
        h += `<circle cx="${cr[0]}" cy="${cr[1]}" r="9" fill="none" stroke="var(--crit)" stroke-width="2"/>`;
        if (yl === 'dcml') h += `<text x="150" y="176" text-anchor="end" class="f50-lb" fill="var(--crit)">${lab}</text><path d="M152,175L172,190" stroke="var(--crit)" fill="none"/>`;
        else h += Y.alt ? `<text x="${cr[0] - 16}" y="${cr[1] + 36}" text-anchor="end" class="f50-lb" fill="var(--crit)">${lab}</text>` : `<text x="180" y="364" text-anchor="middle" class="f50-lb" fill="var(--crit)">${lab}</text>`;
      }
      const nl = (txt, x, y, a) => `<text x="${x}" y="${y}" text-anchor="${a}" class="f50-lb" fill="${c}">${txt}</text>`;
      if (adim >= 2) h += nl('1. sıra nöron', Y.rec[0] + 2, Y.rec[1] - 18, 'start');
      if (adim >= 4) h += nl('2. sıra nöron', yl === 'dcml' ? 222 : 232, yl === 'dcml' ? 168 : 360, 'start');
      if (adim >= 6) h += nl('3. sıra nöron', 254, 140, 'start');
      dy.innerHTML = h;
      st.querySelector('.f50-rec').classList.toggle('puls', adim === 1 && !RM);
    };
    const yaz = () => { sy.textContent = 'Adım ' + adim + '/6'; if (adim === 1) kap.reset(); else kap.set(ADIM[yl][adim - 1]); };
    const git = (n) => { adim = clamp(n, 1, 6); t = 0; yaz(); dinamik(); if (adim === 6 && oyn) { /* son adım */ } };
    q('.f50-yc').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      const g = b.parentElement; g.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      if (g.getAttribute('aria-label') === 'Yol') yl = b.dataset.k; else kay = b.dataset.k;
      Y = yol(yl, kay); oyn = false; pl.textContent = 'Oynat'; statik(); git(1);
    });
    el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => { oyn = false; pl.textContent = 'Oynat'; git(adim + +b.dataset.g); }));
    pl.addEventListener('click', () => { if (oyn) { oyn = false; pl.textContent = 'Oynat'; return; } if (adim >= 6) git(1); oyn = true; pl.textContent = 'Duraklat'; });
    statik(); yaz(); dinamik();
    const dur = ticker(el, (dt) => {
      if (RM) { if (oyn) { oyn = false; pl.textContent = 'Oynat'; } return; }
      if (adim > 1 && t < 1.8) { t += dt; dinamik(); }
      if (oyn && t >= 1.8) { if (adim < 6) git(adim + 1); else { oyn = false; pl.textContent = 'Baştan'; } }
      if (oyn && adim === 1) { t += dt; if (t > 1.2) git(2); }
    });
    return dur;
  };

  /* ---------- 5 · lezyonu seçin ---------- */
  VIZ.f50_ayrisik = (el) => {
    const kap = kapak(el);
    const RG = {
      headR: { t: 'p', d: 'M180,8A22,22 0 0 0 180,52Z' }, headL: { t: 'p', d: 'M180,8A22,22 0 0 1 180,52Z' },
      upR: { x: 140, y: 62, w: 40, h: 88 }, upL: { x: 180, y: 62, w: 40, h: 88 }, lowR: { x: 140, y: 150, w: 40, h: 56 }, lowL: { x: 180, y: 150, w: 40, h: 56 },
      armR: { x: 106, y: 66, w: 29, h: 148, r: 13 }, armL: { x: 225, y: 66, w: 29, h: 148, r: 13 },
      legR: { x: 144, y: 208, w: 34, h: 130, r: 12 }, legL: { x: 182, y: 208, w: 34, h: 130, r: 12 },
    };
    const sh = (id, extra) => { const g = RG[id]; return g.t === 'p' ? `<path d="${g.d}" ${extra}/>` : `<rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="${g.r || 5}" ${extra}/>`; };
    const SG = {
      bsl: { ad: 'Brown-Séquard (sol)', lvl: 150, mot: ['lowL', 'legL'], dor: ['lowL', 'legL'], agr: ['lowR', 'legR'], oz: [['sol', 'crit'], ['sol', 'crit'], ['sağ', 'crit']], c: null },
      bsr: { ad: 'Brown-Séquard (sağ)', lvl: 150, mot: ['lowR', 'legR'], dor: ['lowR', 'legR'], agr: ['lowL', 'legL'], oz: [['sağ', 'crit'], ['sağ', 'crit'], ['sol', 'crit']], c: '<b>Brown-Séquard sendromu (sağ yarı kesi).</b> Lezyon altında sağda motor güçsüzlük ve dorsal kolon duyularının kaybı, solda ağrı ve ısı kaybı. Nedenler: travma (ör. ateşli silah), multipl skleroz, tümör ya da tüberküloz gibi enfeksiyonla bası. [[K1 s. 214]]' },
      sir: { ad: 'Siringomiyeli', lvl: 0, mot: [], dor: [], agr: ['upR', 'upL', 'armR', 'armL'], oz: [['korunur', 'ok'], ['korunur', 'ok'], ['her iki kol ve omuz (pelerin)', 'crit']], c: '<b>Siringomiyeli.</b> Genişleyen santral kanal önce anterior komissürde çaprazlaşan spinotalamik aksonları bozar: siriks düzeyinde, çoğu kez üst ekstremitelerde ağrı ve ısı kaybolur; iki nokta ayrımı, propriyosepsiyon ve vibrasyon korunur. [[K1 s. 214–215]]' },
      lat: { ad: 'Lateral medüller (sol)', lvl: 0, mot: [], dor: [], agr: ['headL', 'upR', 'lowR', 'armR', 'legR'], oz: [['korunur', 'ok'], ['korunur', 'ok'], ['yüz: sol · vücut: sağ', 'crit']], c: '<b>Lateral medüller sendrom (sol PICA).</b> Lateral medullada karşı vücudun spinotalamik traktusu ve aynı taraf trigeminal çekirdekleri bulunur: ağrı ve ısı vücutta sağda, yüzde solda kaybolur. [[K1 s. 215]]' },
    };
    const KISA = { bsl: 'BS sol', bsr: 'BS sağ', sir: 'Siriks', lat: 'Lat. medüller' };
    const lesSvg = (k) => {
      if (k === 'lat') return `<svg class="f50-svg" viewBox="0 0 220 190" role="img" aria-label="Medulla kesiti: sol lateral kama biçimli infarkt, PICA alanı"><defs>${PAT('f50-ah1', 'diag', 'var(--crit)', 'var(--crit-soft)')}</defs>
        <text x="110" y="14" text-anchor="middle" class="f50-l">arka (dorsal)</text><text x="110" y="184" text-anchor="middle" class="f50-l">ön (ventral)</text>
        <ellipse cx="110" cy="96" rx="74" ry="58" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6"/>
        <ellipse cx="110" cy="52" rx="14" ry="7" fill="var(--c-basic-soft)" stroke="var(--c-basic)"/><ellipse cx="92" cy="140" rx="9" ry="16" fill="var(--chip)" stroke="var(--muted)"/><ellipse cx="128" cy="140" rx="9" ry="16" fill="var(--chip)" stroke="var(--muted)"/>
        <ellipse cx="62" cy="108" rx="11" ry="18" fill="var(--chip)" stroke="var(--muted)"/><ellipse cx="158" cy="108" rx="11" ry="18" fill="var(--chip)" stroke="var(--muted)"/>
        <path d="M184,70L148,92L150,120L180,132A70,56 0 0 0 184,70Z" fill="url(#f50-ah1)" stroke="var(--crit)" stroke-width="2"/>
        <text x="206" y="104" text-anchor="end" class="f50-lb" fill="var(--crit)">PICA</text></svg>`;
      if (k === 'sir') return `<svg class="f50-svg" viewBox="0 0 220 190" role="img" aria-label="Servikal kesit: genişlemiş santral kanal (siriks) ve anterior komissür"><defs>${PAT('f50-ah2', 'diag', 'var(--crit)', 'var(--crit-soft)')}</defs>
        <text x="110" y="14" text-anchor="middle" class="f50-l">arka (dorsal)</text><text x="110" y="184" text-anchor="middle" class="f50-l">ön (ventral)</text>
        ${kes(110, 96, 0.72, kesit({ kanal: false }) + '<circle cx="0" cy="-2" r="19" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="2"/><rect x="-24" y="12" width="48" height="12" rx="4" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="2.6"/>')}
        <text x="110" y="146" text-anchor="middle" class="f50-lb" fill="var(--crit)">anterior komissür</text><text x="110" y="90" text-anchor="middle" class="f50-lb" fill="var(--c-basic)">siriks</text></svg>`;
      const sol = k === 'bsl';
      return `<svg class="f50-svg" viewBox="0 0 220 190" role="img" aria-label="Orta torakal kesit: ${sol ? 'sol' : 'sağ'} yarı kesi"><defs>${PAT('f50-ah3', 'diag', 'var(--crit)', 'var(--crit-soft)')}<clipPath id="f50-ac"><rect x="${sol ? 0 : -140}" y="-110" width="140" height="220"/></clipPath></defs>
        <text x="110" y="14" text-anchor="middle" class="f50-l">arka (dorsal)</text><text x="110" y="184" text-anchor="middle" class="f50-l">ön (ventral)</text>
        <g transform="translate(110,98) scale(.7)"><ellipse rx="130" ry="100" fill="var(--paper)"/><ellipse rx="130" ry="100" fill="url(#f50-ah3)" clip-path="url(#f50-ac)" opacity=".9"/></g>
        ${kes(110, 98, 0.7, kesit({ lat: true, griOp: 0.9, zemin: false }))}
        <text x="${sol ? 200 : 20}" y="102" text-anchor="${sol ? 'end' : 'start'}" class="f50-lb" fill="var(--crit)">${sol ? 'sol' : 'sağ'} yarı</text></svg>`;
    };
    const LST = ['nistagmus, vertigo (vestibüler çekirdekler)', 'ataksi (inferior serebellar pedünkül)', 'disfaji, ses kısıklığı (nukleus ambiguus: IX, X)', 'sol Horner sendromu (sempatik zincir)'];
    el.innerHTML = `<div class="f50-ay"><div class="f50-ac">${seg('Lezyon', Object.keys(SG).map((k) => [k, `<span class="f50-u">${SG[k].ad}</span><span class="f50-k">${KISA[k]}</span>`]), 'bsl')}${seg('Göster', [['m', 'Motor'], ['d', 'Dorsal kolon duyuları'], ['a', 'Ağrı ve ısı'], ['h', 'Hepsi']], 'h')}</div>
      <div class="f50-ag"><div class="f50-al"></div>
      <svg class="f50-svg f50-bod" viewBox="0 0 360 350" role="img" aria-label="Önden vücut silüeti: kayıp alanları">
        <defs>${PAT('f50-pm', 'cross', 'var(--c-clin)', 'none')}${PAT('f50-pd', 'dots', 'var(--accent)', 'none')}${PAT('f50-pa', 'hor', 'var(--warn)', 'none')}</defs>
        <text x="8" y="22" class="f50-lb">← hastanın sağı</text><text x="352" y="22" text-anchor="end" class="f50-lb">hastanın solu →</text>
        <g class="f50-base">${Object.keys(RG).map((id) => sh(id, 'fill="var(--chip)" stroke="var(--muted)" stroke-width="1.2"')).join('')}</g>
        <g class="f50-ov"></g><g class="f50-lv"></g></svg></div>
      <dl class="f50-oz"><div><dt>Motor</dt><dd></dd></div><div><dt>İki nokta · propriyosepsiyon · vibrasyon</dt><dd></dd></div><div><dt>Ağrı · ısı</dt><dd></dd></div></dl>
      <ul class="f50-lat" hidden>${LST.map((t) => `<li>${t}</li>`).join('')}</ul>
      <ul class="legend"><li><span><i class="f50-sw f50-swm"></i>motor kaybı</span></li><li><span><i class="f50-sw f50-swd"></i>dorsal kolon duyu kaybı</span></li><li><span><i class="f50-sw f50-swa"></i>ağrı ve ısı kaybı</span></li></ul></div>`;
    const q = (s) => el.querySelector(s);
    let sc = 'bsl', gs = 'h';
    const ciz = () => {
      const C = SG[sc];
      q('.f50-al').innerHTML = lesSvg(sc);
      let o = '';
      const dr = (ids, pat, tip) => { if (gs === 'h' || gs === tip) ids.forEach((id) => { o += sh(id, `fill="url(#${pat})" stroke="none"`); }); };
      dr(C.mot, 'f50-pm', 'm'); dr(C.dor, 'f50-pd', 'd'); dr(C.agr, 'f50-pa', 'a');
      const kay = new Set([...C.mot, ...C.dor, ...C.agr]);
      q('.f50-ov').innerHTML = o;
      q('.f50-lv').innerHTML = C.lvl ? `<path d="M96,${C.lvl}H264" stroke="var(--crit)" stroke-dasharray="5 3" stroke-width="2"/><text x="${sc === 'bsl' || sc === 'bsr' ? 270 : 270}" y="${C.lvl + 4}" class="f50-lb" fill="var(--crit)">T10</text>` : sc === 'sir' ? '<path d="M96,66H264M96,128H264" stroke="var(--crit)" stroke-dasharray="5 3" stroke-width="1.6"/><text x="268" y="100" class="f50-lb" fill="var(--crit)">siriks</text><text x="268" y="113" class="f50-lb" fill="var(--crit)">düzeyi</text>' : '';
      q('.f50-oz').querySelectorAll('dd').forEach((dd, i) => { const [t, r] = C.oz[i]; dd.innerHTML = `<span class="tag ${r}">${t}</span>`; });
      q('.f50-lat').hidden = sc !== 'lat';
      el.querySelectorAll('.f50-ag').forEach(() => {});
    };
    el.querySelectorAll('.f50-ac .seg').forEach((g, gi) => segBagla(g, (k) => {
      if (gi === 0) { sc = k; ciz(); const c = SG[k].c; if (c) kap.set(c); else kap.reset(); } else { gs = k; ciz(); }
    }));
    el.querySelector('.f50-ac .seg').querySelectorAll('button').forEach((b) => { b.dataset.full = b.textContent; });
    ciz();
    return () => {};
  };

  /* ---------- 6 · korteksten kasa ---------- */
  VIZ.f50_motor = (el) => {
    const kap = kapak(el);
    const CAP = [
      null,
      '<b>2 · İnternal kapsül.</b> Üst motor nöronlar internal kapsülün arka bacağından geçer. [[K1 s. 215]]',
      '<b>3 · Pons.</b> Liflerin önemli bir kısmı ponsun ventral bölümündeki pontin çekirdeklerde sinaps yapar; postsinaptik lifler arkaya, orta serebellar pedünkülden serebelluma gider. [[K1 s. 215–216]]',
      '<b>4 · Medüller piramitler: %90 çaprazlaşır.</b> Kalan liflerin %90’ı karşıya geçer ve lateral kortikospinal traktusta iner; %10 aynı tarafta anterior kortikospinal traktusta kalır. [[K1 s. 216]]',
      '<b>5 · Omurilik.</b> Anterior kortikospinal liflerin çoğu sinapstan önce anterior komissürden karşıya geçer. Hedef düzeyde üst motor nöron ventral boynuzda alt motor nöronla sinaps yapar. [[K1 s. 216]]',
      '<b>6 · Alt motor nöron.</b> α-motor nöron ön boynuzdan çıkıp spinal siniri oluşturur, intervertebral foramenden periferik sinir olarak ekstrafüzal lifleri kastırır; γ-motor nöron propriyosepsiyonda görevli intrafüzal lifleri (kas iğcikleri) uyarır. [[K1 s. 216]]',
    ];
    const OF = (i) => (i - 4.5) * 1.1;
    const line = (pts, off, extra = '') => `<path d="M${pts.map((p) => (p[0] + off).toFixed(1) + ',' + p[1]).join('L')}" fill="none" stroke="var(--c-clin)" stroke-width="1.5" stroke-linecap="round" ${extra}/>`;
    const bundle = (pts, idx, k = 1, extra = '') => idx.map((i) => line(pts, OF(i) * k, extra)).join('');
    const all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const cross = (k = 1) => all.slice(0, 9).map((i) => { const o = OF(i) * k; return `<path d="M${192 + o},250V282C${192 + o},312 ${168 + o},304 ${168 + o},336" fill="none" stroke="var(--c-clin)" stroke-width="1.5" stroke-linecap="round"/>`; }).join('') + line([[192, 250], [192, 336]], OF(9) * k);
    const S = {
      1: `<path d="M196,76Q256,-8 320,76" fill="none" stroke="var(--muted)" stroke-width="10" stroke-linecap="round" opacity=".55"/><circle cx="256" cy="35" r="10" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2.4"/>${bundle([[256, 50], [246, 84]], all)}`,
      2: `<path d="M246,84L196,150" stroke="var(--chip)" stroke-width="13" stroke-linecap="round"/>${bundle([[246, 84], [222, 118], [196, 150]], all)}`,
      3: `<circle cx="180" cy="195" r="42" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6"/><path d="M226,172A34,34 0 0 1 226,238Z" fill="var(--chip)" stroke="var(--muted)"/>${bundle([[196, 150], [184, 172], [180, 195]], all)}${bundle([[180, 195], [180, 238]], [4, 5, 6, 7, 8, 9], 1)}<circle cx="184" cy="196" r="6" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="1.6"/><path d="M190,198C206,200 214,204 232,206" stroke="var(--c-clin)" stroke-dasharray="3 2" fill="none" stroke-width="1.6"/>`,
      4: `<path d="M150,246H210L206,336H154Z" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="168" cy="292" rx="10" ry="36" fill="var(--chip)" stroke="var(--muted)" opacity=".7"/><ellipse cx="192" cy="292" rx="10" ry="36" fill="var(--chip)" stroke="var(--muted)" opacity=".7"/>${cross()}`,
      5: `${kes(180, 420, 0.5, kesit({ lat: false, tr: [['lcs', -1], ['acs', 1]], att: (id) => `fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"` }))}${bundle([[168, 336], [142, 402], [150, 432]], all.slice(0, 9), 0.5)}${line([[192, 336], [186, 376], [186, 440], [182, 430]], 0)}<path d="M186,440C182,428 170,426 160,434" fill="none" stroke="var(--c-clin)" stroke-width="1.5"/><circle cx="153" cy="437" r="4.6" fill="var(--paper)" stroke="var(--ok)" stroke-width="2"/>`,
      6: `<path d="M155,439C140,444 126,450 98,458L90,500L100,536" fill="none" stroke="var(--ok)" stroke-width="3.4" stroke-linecap="round"/><path d="M155,441C146,452 140,500 132,548" fill="none" stroke="var(--ok)" stroke-width="1.4"/>
        <rect x="70" y="448" width="22" height="9" rx="2" fill="var(--chip)" stroke="var(--muted)"/><rect x="70" y="462" width="22" height="9" rx="2" fill="var(--chip)" stroke="var(--muted)"/>
        <ellipse class="f50-ms" cx="100" cy="562" rx="64" ry="23" fill="var(--paper)" stroke="var(--ok)" stroke-width="1.8"/>${[-30, -14, 2, 18, 34].map((x) => `<path d="M${100 + x - 18},562H${100 + x + 18}" stroke="var(--ok)" stroke-width="1" opacity=".5"/>`).join('')}<ellipse cx="132" cy="562" rx="15" ry="5" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="1.6"/>`,
    };
    const LB = {
      1: `<text x="12" y="26" class="f50-lb" fill="var(--c-clin)">motor korteks (presantral girus)</text><text x="12" y="40" class="f50-l">beynin son ortak çıkışı</text>`,
      2: `<text x="238" y="112" class="f50-l">internal kapsül</text><text x="238" y="125" class="f50-l">(arka bacak)</text>`,
      3: `<text x="94" y="188" text-anchor="end" class="f50-l">pontin</text><text x="94" y="201" text-anchor="end" class="f50-l">çekirdekler</text><text x="352" y="150" text-anchor="end" class="f50-l">orta serebellar</text><text x="352" y="163" text-anchor="end" class="f50-l">pedünkül</text><text x="250" y="254" text-anchor="middle" class="f50-l">serebellum</text>`,
      4: `<text x="224" y="276" class="f50-l">medüller piramitler</text><text x="140" y="326" text-anchor="end" class="f50-big" fill="var(--c-clin)">%90</text><text x="140" y="340" text-anchor="end" class="f50-l">karşıya</text><text x="222" y="326" class="f50-big" fill="var(--c-clin)">%10</text><text x="222" y="340" class="f50-l">aynı tarafta</text><text x="136" y="262" text-anchor="end" class="f50-l">kalan lifler</text><text x="136" y="275" text-anchor="end" class="f50-l">= 10 çizgi</text>`,
      5: `<text x="10" y="366" class="f50-l">lateral kortikospinal</text><text x="10" y="379" class="f50-l">(%90)</text><text x="214" y="366" class="f50-l">anterior kortikospinal</text><text x="214" y="379" class="f50-l">(%10)</text><text x="252" y="426" class="f50-l">anterior komissür</text><text x="252" y="439" class="f50-l">karşıya geçiş</text><text x="252" y="466" class="f50-l">servikal omurilik</text><text x="170" y="480" text-anchor="middle" class="f50-lb" fill="var(--ok)">ventral boynuz: UMN → LMN</text>`,
      6: `<text x="64" y="436" text-anchor="end" class="f50-l">intervertebral</text><text x="64" y="449" text-anchor="end" class="f50-l">foramen</text><text x="106" y="506" class="f50-lb" fill="var(--ok)">α-motor nöron</text><text x="146" y="520" class="f50-lb" fill="var(--ok)">γ-motor nöron</text><text x="110" y="518" text-anchor="end" class="f50-l">periferik sinir</text><text x="170" y="596" text-anchor="middle" class="f50-l">iskelet kası · kas iğciği (intrafüzal)</text>`,
    };
    const YOL = { 1: [[256, 50], [246, 84]], 2: [[246, 84], [222, 118], [196, 150]], 3: [[196, 150], [182, 180], [180, 238]], 4: [[192, 250], [192, 290], [168, 336]], 5: [[168, 336], [142, 402], [150, 436]], 6: [[155, 439], [126, 450], [92, 466], [90, 500], [100, 536]] };
    el.innerHTML = `<div class="f50-mo"><svg class="f50-svg" viewBox="0 0 360 604" role="img" aria-label="Kortikospinal yol: motor korteks, internal kapsül, pons, medüller piramitler, omurilik, alt motor nöron ve iskelet kası"><g class="f50-mg"></g><g class="f50-mdot"></g></svg>
      <div class="btn-row f50-ys"><button type="button" class="btn ghost" data-g="-1">◀ Geri</button><button type="button" class="btn ghost" data-g="1">İleri ▶</button><button type="button" class="btn" data-pl>Oynat</button><span class="f50-sy" aria-live="polite">Adım 1/6</span></div></div>`;
    const q = (s) => el.querySelector(s), mg = q('.f50-mg'), md = q('.f50-mdot'), sy = q('.f50-sy'), pl = q('[data-pl]');
    let adim = 1, t = 0, oyn = false, ph = 0;
    const ciz = () => {
      let h = '';
      for (let k = 1; k <= 6; k++) {
        const op = k === adim ? 1 : 0.32;
        h += `<g opacity="${op}">${S[k]}</g>`;
        if (k <= adim) h += `<g opacity="${k === adim ? 1 : 0.55}">${LB[k]}</g>`;
      }
      mg.innerHTML = h;
      mg.querySelectorAll('.f50-ms').forEach((m) => { m.dataset.k = 1; });
    };
    const uz = (p) => { const L = []; let a = 0; for (let i = 1; i < p.length; i++) { const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); L.push(d); a += d; } return [L, a]; };
    const nokta = (p, f) => { const [L, a] = uz(p); let r = f * a; for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const u = r / L[i]; return [lerp(p[i][0], p[i + 1][0], u), lerp(p[i][1], p[i + 1][1], u)]; } r -= L[i]; } return p[p.length - 1]; };
    const yaz = () => { sy.textContent = 'Adım ' + adim + '/6'; if (adim === 1) kap.reset(); else kap.set(CAP[adim - 1]); ciz(); };
    const git = (n) => { adim = clamp(n, 1, 6); t = 0; yaz(); };
    el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => { oyn = false; pl.textContent = 'Oynat'; git(adim + +b.dataset.g); }));
    pl.addEventListener('click', () => { if (oyn) { oyn = false; pl.textContent = 'Oynat'; return; } if (adim >= 6) git(1); oyn = true; pl.textContent = 'Duraklat'; });
    yaz();
    const dur = ticker(el, (dt) => {
      if (RM) { md.innerHTML = ''; if (oyn) { oyn = false; pl.textContent = 'Oynat'; } return; }
      t += dt; ph += dt;
      const f = (ph % 1.6) / 1.6, p = nokta(YOL[adim], f);
      md.innerHTML = `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="var(--c-clin)" stroke="var(--paper)" stroke-width="1.5"/>`;
      if (adim === 6) { const ms = mg.querySelector('.f50-ms'); if (ms) ms.setAttribute('rx', (64 - 8 * (0.5 + 0.5 * Math.sin(ph * 5))).toFixed(1)); }
      if (oyn && t >= 2) { if (adim < 6) git(adim + 1); else { oyn = false; pl.textContent = 'Baştan'; } }
    });
    return dur;
  };

  /* ---------- 7 · üç kolon ve tamlık ---------- */
  VIZ.f50_sinif = (el) => {
    const kap = kapak(el);
    const KOL = { on: { ad: 'ön kolon', x: 36, w: 44, c: 'var(--c-basic)', s: 'var(--c-basic-soft)' }, orta: { ad: 'orta kolon', x: 80, w: 44, c: 'var(--accent)', s: 'var(--accent-soft)' }, arka: { ad: 'arka kolon', x: 160, w: 140, c: 'var(--c-clin)', s: 'var(--c-clin-soft)' } };
    const omur = (y0) => `<rect x="40" y="${y0}" width="80" height="76" rx="9" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6"/><path d="M120,${y0 + 26}H160V${y0 + 50}H120Z" fill="var(--paper)" stroke="var(--muted)"/><path d="M160,${y0}H230L240,${y0 + 14}V${y0 + 50}H160Z" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6" stroke-linejoin="round"/><path d="M240,${y0 + 18}L296,${y0 + 30}V${y0 + 44}L240,${y0 + 38}Z" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6" stroke-linejoin="round"/>`;
    const SP = [];
    for (let i = 0; i < 24; i++) SP.push(i);
    const bolge = (i) => (i < 7 ? 'C' : i < 19 ? 'T' : 'L');
    el.innerHTML = `<div class="f50-si"><div class="f50-sc">${seg('Tamlık', [['tam', 'Tam'], ['eks', 'Eksik']], 'tam')}</div>
      <div class="f50-sg"><div class="f50-sa"><svg class="f50-svg" viewBox="0 0 340 304" role="img" aria-label="İki omurun yan görünümü: ön, orta ve arka kolon">
        <rect x="124" y="8" width="32" height="288" rx="6" fill="var(--chip)" stroke="var(--muted)"/>
        <g class="f50-kl">${Object.entries(KOL).map(([k, v]) => `<rect class="f50-kb" data-c="${k}" tabindex="0" role="button" aria-pressed="false" aria-label="${v.ad}" x="${v.x}" y="8" width="${v.w}" height="288" rx="8" fill="${v.s}" fill-opacity=".55" stroke="${v.c}" stroke-width="1.6" stroke-dasharray="5 3"/>`).join('')}</g>
        ${omur(20)}<rect x="40" y="100" width="80" height="24" rx="6" fill="var(--chip)" stroke="var(--muted)"/>${omur(124)}
        <g class="f50-kr"></g>
        <text x="40" y="14" class="f50-l">ön</text><text x="300" y="14" text-anchor="end" class="f50-l">arka</text>
        <text x="58" y="302" text-anchor="middle" class="f50-lb" fill="var(--c-basic)">ön</text><text x="102" y="302" text-anchor="middle" class="f50-lb" fill="var(--accent-ink)">orta</text><text x="230" y="302" text-anchor="middle" class="f50-lb" fill="var(--c-clin)">arka kolon</text>
        <text x="140" y="92" text-anchor="middle" class="f50-l">omurilik</text></svg>
        <div class="f50-rozet" aria-live="polite"></div></div>
      <div class="f50-sb"><svg class="f50-svg" viewBox="0 0 360 304" role="img" aria-label="Omurga boyunca yaralanma sıklığı ve tamlık: tam ya da eksik yaralanmada düzeyin altı">
        <defs>${PAT('f50-th', 'diag', 'var(--crit)', 'var(--crit-soft)')}${PAT('f50-te', 'hor', 'var(--crit)', 'var(--crit-soft)')}</defs>
        ${SP.map((i) => `<rect x="${52}" y="${(10 + i * 11.4).toFixed(1)}" width="26" height="9" rx="2" fill="var(--paper)" stroke="var(--muted)"/>`).join('')}
        <rect x="34" y="10" width="12" height="${(19 * 11.4 - 2.4).toFixed(1)}" rx="3" fill="var(--warn)"/><rect x="40" y="${(10 + 19 * 11.4).toFixed(1)}" width="6" height="${(5 * 11.4 - 2.4).toFixed(1)}" rx="2" fill="var(--warn)" opacity=".5"/>
        <text x="86" y="26" class="f50-lb" fill="var(--warn)">servikal</text><text x="86" y="39" class="f50-l">çok hareketli</text><text x="86" y="51" class="f50-l">→ instabil kırığa</text><text x="86" y="63" class="f50-l">yatkın</text><text x="86" y="82" class="f50-l">kanalda en geniş yer</text>
        <text x="86" y="140" class="f50-lb" fill="var(--warn)">torakal</text><text x="86" y="153" class="f50-l">çoğu yaralanma</text><text x="86" y="170" class="f50-l">(servikal + torakal)</text>
        <text x="86" y="250" class="f50-lb" fill="var(--muted)">lomber</text><text x="86" y="263" class="f50-l">çok daha az</text>
        <g class="f50-tm"></g></svg></div></div></div>`;
    const q = (s) => el.querySelector(s);
    let sel = new Set(['on']), tam = 'tam';
    const gv = () => {
      const bt = q('.f50-sb svg .f50-tm'), eks = tam === 'eks';
      const bx = (x, y, w, h, r, f, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${ex}/>`;
      bt.innerHTML = `<g transform="translate(270,6)">
        <circle cx="0" cy="18" r="14" fill="var(--chip)" stroke="var(--muted)"/>${bx(-20, 36, 40, 90, 8, 'var(--chip)', 'stroke="var(--muted)"')}${bx(-38, 38, 15, 84, 7, 'var(--chip)', 'stroke="var(--muted)"')}${bx(23, 38, 15, 84, 7, 'var(--chip)', 'stroke="var(--muted)"')}${bx(-19, 124, 17, 96, 8, 'var(--chip)', 'stroke="var(--muted)"')}${bx(2, 124, 17, 96, 8, 'var(--chip)', 'stroke="var(--muted)"')}
        <g fill="url(#${eks ? 'f50-te' : 'f50-th'})" opacity="${eks ? 0.9 : 1}">${bx(-20, 64, 40, 62, 6, 'inherit')}${bx(-38, 64, 15, 58, 6, 'inherit')}${bx(23, 64, 15, 58, 6, 'inherit')}${bx(-19, 124, 17, 96, 8, 'inherit')}${bx(2, 124, 17, 96, 8, 'inherit')}</g>
        ${eks ? `<ellipse cx="0" cy="128" rx="12" ry="7" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2"/><text x="0" y="246" text-anchor="middle" class="f50-lb" fill="var(--ok)">sakral koruma</text>` : ''}
        <path d="M-46,64H46" stroke="var(--crit)" stroke-width="2" stroke-dasharray="5 3"/></g>
        <text x="270" y="272" text-anchor="middle" class="f50-lb" fill="var(--crit)">${eks ? 'Eksik: bir miktar işlev kalır' : 'Tam: düzeyin altında yok'}</text><text x="270" y="287" text-anchor="middle" class="f50-l">${eks ? 'ör. sakral koruma' : 'motor ve duyu · ≈ yarısı'}</text>`;
    };
    const ciz = () => {
      const bad = sel.has('orta') || sel.has('arka');
      el.querySelectorAll('.f50-kb').forEach((n) => { const on = sel.has(n.dataset.c); n.setAttribute('aria-pressed', String(on)); n.setAttribute('stroke-width', on ? 3.2 : 1.6); n.setAttribute('fill-opacity', on ? 0.9 : 0.4); });
      let k = '';
      sel.forEach((c) => { const v = KOL[c], x1 = v.x + 3, x2 = v.x + v.w - 3, y = 56; let d = `M${x1},${y}`; const n = Math.max(2, Math.round((x2 - x1) / 9)); for (let i = 1; i <= n; i++) d += `L${(x1 + ((x2 - x1) * i) / n).toFixed(1)},${y + (i % 2 ? 10 : -4)}`; k += `<path d="${d}" fill="none" stroke="var(--crit)" stroke-width="2.6" stroke-linejoin="round"/>`; });
      q('.f50-kr').innerHTML = k;
      const r = q('.f50-rozet');
      if (!sel.size) { r.className = 'f50-rozet'; r.textContent = 'Kolon seçin'; }
      else if (bad) { r.className = 'f50-rozet crit'; r.textContent = 'İNSTABİL · sabitle'; } else { r.className = 'f50-rozet ok'; r.textContent = 'STABİL'; }
      gv();
    };
    const capSec = () => { if (!sel.size) kap.set('<b>Kolon seçin.</b> Omurga ön, orta ve arka kolona ayrılır. [[K1 s. 216]]'); else if (sel.has('orta') || sel.has('arka')) kap.set('<b>Ön kolonun ötesine uzanan kırık: instabil.</b> Omuriliğe ek hasarı önlemek için sabitlenmelidir. Servikal omurga çok hareketli olduğu için özellikle yatkındır. [[K1 s. 216]]'); else kap.reset(); };
    dokun(el, '.f50-kb', (n) => { const c = n.dataset.c; if (sel.has(c)) sel.delete(c); else sel.add(c); ciz(); capSec(); });
    segBagla(q('.f50-sc .seg'), (k) => { tam = k; ciz(); if (k === 'tam') kap.set('<b>Tam yaralanma.</b> Yaralanmaların yaklaşık yarısı; düzeyin altında motor ve duyu işlevi yoktur. [[K1 s. 216]]'); else kap.set('<b>Eksik yaralanma.</b> Düzeyin altında bir miktar işlev kalır, ör. sakral koruma. [[K1 s. 216]]'); });
    ciz();
    return () => {};
  };

  /* ---------- 8 · düzeyi kaydırın ---------- */
  VIZ.f50_duzey = (el) => {
    const kap = kapak(el);
    const LV = [...Array.from({ length: 8 }, (_, i) => 'C' + (i + 1)), ...Array.from({ length: 12 }, (_, i) => 'T' + (i + 1)), 'L1'];
    const Y = (i) => 24 + (i - 1) * 13;
    const MET = (n) => {
      if (n <= 3) return '<b>C3 ve üstü.</b> Bütün solunum kasları felçlidir: ağır ventilasyon bozukluğu, hemen ventilasyon desteği; çoğu hastaya uzun süreli mekanik ventilasyon ya da frenik sinir uyarımı gerekir. Nörojenik şok ve bradikardi de beklenir. [[K1 s. 217]]';
      if (n <= 5) return '<b>C4–C5.</b> Frenik sinir C3, C4 ve C5 köklerinden oluşur; bu düzeyde diyafram kısmen etkilenebilir. İnterkostaller felçli; nörojenik şok ve bradikardi beklenir. [[K1 s. 216–217]]';
      if (n <= 8) return `<b>${LV[n - 1]} düzeyi.</b> Diyafram doğrudan etkilenmez (frenik sinir C3–C5), ama interkostaller felçlidir; T6 ve T1 üstü olduğu için nörojenik şok ve bradikardi beklenir. [[K1 s. 216–217]]`;
      if (n <= 13) return `<b>${LV[n - 1]}.</b> İnterkostaller felçli, paradoks hareket; kardiyoakseleratör lifler korunur (bradikardi beklenmez), ama T6 üstü olduğu için nörojenik şok riski sürer. [[K1 s. 216–217]]`;
      if (n <= 15) return `<b>${LV[n - 1]}.</b> Nörojenik şok eşiğinin altında; interkostal felç (T8 üstü) sürer: kova sapı hareketi yok, FRC düşer. [[K1 s. 216–217]]`;
      return '<b>T8 ve altı.</b> Solunum kasları ve kalp sempatik innervasyonu büyük ölçüde korunur; lezyon altında yine motor, duyu ve otonom kayıp vardır. [[K1 s. 216–217]]';
    };
    const marks = [['C3', 3], ['C5', 5], ['T1', 9], ['T6', 14], ['T8', 16]];
    el.innerHTML = `<div class="f50-du">
      <div class="f50-dsl"><label class="f50-sl"><span>Yaralanma düzeyi: <b data-o="lv">C6</b></span><input type="range" min="1" max="21" step="1" value="6" aria-label="Yaralanma düzeyi" data-s="lv"></label>
        <div class="f50-mk" aria-hidden="true">${marks.map(([t, i]) => `<span style="left:${(((i - 1) / 20) * 100).toFixed(2)}%"><i></i>${t}</span>`).join('')}</div></div>
      <div class="f50-dg"><svg class="f50-svg" viewBox="0 0 360 330" role="img" aria-label="Omurilik düzeyi, frenik sinir, interkostal sinirler, kalp ve damar sempatik çıkışı, göğüs kafesi ve diyafram">
        <defs>${PAT('f50-dh', 'diag', 'var(--crit)', 'var(--crit-soft)')}</defs>
        <rect x="40" y="12" width="16" height="286" rx="6" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="1.6"/>
        <rect class="f50-dk" x="40" y="12" width="16" height="0" rx="6" fill="url(#f50-dh)" stroke="var(--crit)" stroke-width="1.6"/>
        <g class="f50-th">${marks.map(([t, i]) => `<text x="34" y="${Y(i) + 4}" text-anchor="end" class="f50-l">${t}</text><path d="M37,${Y(i)}H40" stroke="var(--muted)"/>`).join('')}</g>
        <g class="f50-cn"></g>
        <path class="f50-lz" d="" stroke="var(--crit)" stroke-width="3" stroke-dasharray="5 3"/><text class="f50-lt f50-lb" fill="var(--crit)" x="62" y="0"></text>
        <g class="f50-ch"></g>
        <text x="255" y="312" text-anchor="middle" class="f50-l">karın</text>
      </svg>
      <div class="f50-dr"><dl class="f50-dt"></dl></div></div>
      <p class="f50-dn" aria-live="polite"></p>
      <p class="f50-dnb">Her düzeyde, özellikle T8 üstü lezyonlarda: FEV₁ ↓, öksürük ↓, atelektazi, kompliyans ↓, V̇/Q̇ uyumsuzluğu. [[K1 s. 217]]</p></div>`;
    el.querySelector('.f50-dnb').innerHTML = REF(el.querySelector('.f50-dnb').innerHTML);
    const q = (s) => el.querySelector(s), inp = q('[data-s=lv]'), lvO = q('[data-o=lv]');
    let n = 6, ph = 0;
    const durum = (n2) => ({ tum: n2 <= 3, kis: n2 === 4 || n2 === 5, ik: n2 < 16, sok: n2 < 14, brad: n2 < 9 });
    const baglanti = () => {
      const D = durum(n), yl = Y(n) + 6.5;
      const yol = (a, b, tx, ty, col, kesik, ad) => { const y0 = (Y(a) + Y(b)) / 2; return `<path d="M56,${y0}C130,${y0} ${tx - 70},${ty} ${tx},${ty}" fill="none" stroke="${kesik ? 'var(--crit)' : col}" stroke-width="${kesik ? 2 : 2.8}" ${kesik ? 'stroke-dasharray="4 4" opacity=".8"' : ''} stroke-linecap="round"/><path d="M52,${Y(a)}V${Y(b)}" stroke="${col}" stroke-width="3" opacity=".7"/>`; };
      const ph2 = D.tum ? ['C', 1] : D.kis ? ['p', 1] : ['', 0];
      q('.f50-cn').innerHTML = `${yol(3, 5, 215, 192, 'var(--accent)', D.tum || D.kis)}${yol(9, 16, 200, 118, 'var(--c-clin)', D.ik)}${yol(9, 12, 242, 100, 'var(--warn)', D.brad)}${yol(14, 17, 330, 262, 'var(--crit)', D.sok)}
        <text x="62" y="${Y(3) - 6}" class="f50-lb" fill="var(--accent-ink)">frenik C3–C5</text><text x="62" y="${Y(9) - 10}" class="f50-lb" fill="var(--c-clin)">interkostal</text><text x="${Y(9) > 0 ? 62 : 62}" y="${Y(12) + 22}" class="f50-lb" fill="var(--warn)">kalp sempatik</text><text x="62" y="${Y(17) + 22}" class="f50-lb" fill="var(--crit)">damar sempatik</text>`;
      q('.f50-dk').setAttribute('y', yl); q('.f50-dk').setAttribute('height', Math.max(0, 298 - yl));
      q('.f50-lz').setAttribute('d', `M18,${yl}H78`);
      const lt = q('.f50-lt'); lt.setAttribute('y', yl - 5); lt.setAttribute('x', 62); lt.textContent = '';
    };
    const goguz = () => {
      const D = durum(n), s = Math.sin(ph * 2 * Math.PI * 0.25), p01 = RM ? 0.5 : (1 + s) / 2;
      const amp = D.tum ? 0 : D.kis ? 0.5 : 1;
      const o = D.tum ? 0 : D.ik ? -5 * amp * p01 : 6 * p01;
      const rx = 62 + o, apex = 168 + 20 * amp * p01;
      let r = '';
      for (let i = 0; i < 5; i++) { const y = 66 + i * 24, w = 62 * Math.sqrt(Math.max(0, 1 - ((y - 126) / 82) ** 2)) + o; r += `<path d="M255,${y}C240,${y - 12} ${255 - w * 0.8},${y - 12} ${255 - w},${y + 5}M255,${y}C270,${y - 12} ${255 + w * 0.8},${y - 12} ${255 + w},${y + 5}" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round"/>`; }
      const ok = !D.tum;
      q('.f50-ch').innerHTML = `<ellipse cx="255" cy="126" rx="${rx.toFixed(1)}" ry="82" fill="var(--c-basic-soft)" stroke="var(--muted)" stroke-width="1.8"/>${r}
        <path d="M${193 - Math.max(0, o)},196Q255,${apex.toFixed(1)} ${317 + Math.max(0, o)},196V244H${193 - Math.max(0, o)}Z" fill="var(--chip)" stroke="${D.tum ? 'var(--crit)' : D.kis ? 'var(--warn)' : 'var(--ok)'}" stroke-width="2.4" stroke-dasharray="${D.tum ? '5 3' : '0'}"/>
        <text x="255" y="222" text-anchor="middle" class="f50-lb" fill="var(--ink)">diyafram</text>
        <circle cx="255" cy="104" r="13" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="2"/><text x="255" y="108" text-anchor="middle" class="f50-rn" fill="var(--crit)">kalp</text>
        ${D.ik && ok ? `<path d="M${197 + o},${126}l12,0M${313 - o},126l-12,0" stroke="var(--crit)" stroke-width="3" opacity="${p01.toFixed(2)}"/>` : ''}
        ${D.tum ? '<text x="255" y="150" text-anchor="middle" class="f50-lb" fill="var(--crit)">hareket yok</text>' : ''}`;
    };
    const panel = () => {
      const D = durum(n);
      const sat = (a, b, c, ek) => `<div><dt>${a}</dt><dd><span class="tag ${c}">${b}</span>${ek ? `<small>${ek}</small>` : ''}</dd></div>`;
      q('.f50-dt').innerHTML = sat('Diyafram', D.tum ? 'felçli' : D.kis ? 'kısmen etkilenebilir' : 'çalışıyor', D.tum ? 'crit' : D.kis ? 'warn' : 'ok', '')
        + sat('İnterkostaller', D.ik ? 'felçli (T8 üstü)' : 'sağlam', D.ik ? 'crit' : 'ok', D.ik ? 'kova sapı yok · FRC ↓ · VC %50’ye dek ↓' : '')
        + sat('Nörojenik şok (T6 üstü)', D.sok ? 'var' : 'yok', D.sok ? 'crit' : 'ok', D.sok ? 'arteriyol + ven dilatasyonu, venöz göllenme, tromboemboli riski' : '')
        + sat('Bradikardi (T1 üstü)', D.brad ? 'var' : 'yok', D.brad ? 'crit' : 'ok', D.brad ? 'karşılanmamış parasempatik; debi kalp hızıyla artmaz → önyükü koru' : '');
      q('.f50-dn').innerHTML = D.tum ? '<b>Bütün solunum kasları felçli:</b> hemen ventilasyon desteği; uzun süreli mekanik ventilasyon ya da frenik sinir uyarımı.' : D.ik ? '<b>Paradoks hareket:</b> inspirasyonda göğüs duvarı içe çekilir; kaburgalarda kova sapı hareketi yok.' : 'Kaburgalar kova sapı hareketiyle yukarı-dışa gider.';
    };
    const guncelle = () => {
      lvO.textContent = LV[n - 1];
      baglanti(); panel(); goguz();
      if (RM || true) kap.set(MET(n));
    };
    inp.addEventListener('input', () => { n = +inp.value; guncelle(); });
    guncelle();
    const dur = ticker(el, (dt) => { if (RM) return; ph += dt; goguz(); });
    return dur;
  };

  /* ---------- 9 · yaralanmadan sonraki haftalar ---------- */
  VIZ.f50_zaman = (el) => {
    const kap = kapak(el);
    const ZAM = [
      { ad: 'İlk gün', e: 'spinal şok', a: 0, ton: 6, x: 20, m: null },
      { ad: '1. hafta', e: 'geçiş', a: 12, ton: 34, x: 120, m: '<b>Geçiş.</b> Spinal şok çözülürken düzeyin altında tonus ve refleksler artmaya başlar. [[K1 s. 217]]' },
      { ad: '2. hafta', e: 'geçiş', a: 28, ton: 62, x: 220, m: '<b>Geçiş.</b> Spinal şok çözülürken düzeyin altında tonus ve refleksler artmaya başlar. [[K1 s. 217]]' },
      { ad: '3. hafta ve sonrası', e: 'spastisite', a: 52, ton: 95, x: 320, m: '<b>3 hafta içinde.</b> Spastik paralizi ve canlı refleksler gelişir; düzeyin altında somatik ve visseral duyu yine yoktur. [[K1 s. 217]]' },
    ];
    const KART = {
      sinir: { b: 'Sinir', t: 'Flask → 3 haftada spastik', m: null, r: 'var(--c-basic)' },
      sind: { b: 'Sindirim', t: 'Sempatik kopma → vagus karşılanmamış: gecikmiş mide boşalması, paralitik ileus (distansiyon ventilasyonu bozar); yüksek lezyonda korumasız mide ülseri; kabızlık → laksatif, barsak bakımı', m: '<b>Sindirim.</b> Enterik sinir sistemi yarı otonomdur ama sempatik kopmadan etkilenir; karşılanmamış vagal etki ileus ve, yüksek lezyonda korumasız kalırsa, mide ülserasyonu yapar. [[K1 s. 217]]', r: 'var(--warn)' },
      isi: { b: 'Isı', t: 'Deri arteriyolleri geniş → ısı kaybı; terleme bozuk → aşırı ısıtmada hipertermi', m: '<b>Termoregülasyon.</b> Düzeyin altında sempatik çıkış yoktur: deri vazodilatasyonu ısı kaybettirir, terleme bozuk olduğundan aşırı ısıtma hipertermi yapar. [[K1 s. 217]]', r: 'var(--crit)' },
      glu: { b: 'Glukoz', t: 'Stres yanıtı → hiperglisemi; iyi kontrol iskemik hasarı sınırlar', m: '<b>Hiperglisemi.</b> Stres yanıtıyla sıktır; iskemik omurilik hasarını ağırlaştırmasın diye iyi kontrol edilir. [[K1 s. 218]]', r: 'var(--accent)' },
    };
    el.innerHTML = `<div class="f50-za"><label class="f50-sl"><span>Zaman: <b data-o="z">İlk gün</b></span><input type="range" min="0" max="3" step="1" value="0" aria-label="Zaman" data-s="z"></label>
      <svg class="f50-svg" viewBox="0 0 340 236" role="img" aria-label="Zaman ekseni: flask paralizi spastik paralizie dönüşür; diz refleksi simgesi">
        <defs><linearGradient id="f50-zg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="var(--c-basic)"/><stop offset=".45" stop-color="var(--c-basic)" stop-opacity=".55"/><stop offset=".6" stop-color="var(--c-clin)" stop-opacity=".55"/><stop offset="1" stop-color="var(--c-clin)"/></linearGradient></defs>
        <text x="20" y="22" class="f50-lb" fill="var(--c-basic)">flask, refleks yok</text><text x="320" y="38" text-anchor="end" class="f50-lb" fill="var(--c-clin)">spastik, canlı refleks</text>
        <rect x="20" y="46" width="300" height="20" rx="10" fill="url(#f50-zg)"/>
        ${ZAM.map((z, i) => `<path d="M${z.x},66V74" stroke="var(--muted)"/><text x="${z.x}" y="88" text-anchor="${i === 0 ? 'start' : i === 3 ? 'end' : 'middle'}" class="f50-l">${i === 3 ? '3 hafta' : z.ad}</text>`).join('')}
        <path class="f50-mk2" d="M0,44L-7,34H7Z" fill="var(--ink)"/>
        <g transform="translate(26,112)"><path d="M10,50H78" stroke="var(--muted)" stroke-width="9" stroke-linecap="round"/><circle cx="78" cy="50" r="5" fill="var(--paper)" stroke="var(--muted)" stroke-width="2"/>
          <g class="f50-sh"><path d="M0,0V72" transform="translate(78,50)" stroke="var(--muted)" stroke-width="8" stroke-linecap="round"/><path d="M-6,76H8" transform="translate(78,50)" stroke="var(--muted)" stroke-width="5" stroke-linecap="round"/></g>
          <g class="f50-hm"><path d="M0,0L26,-26" transform="translate(116,28)" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><rect x="-6" y="-6" width="12" height="9" rx="2" transform="translate(116,28) rotate(-45)" fill="var(--ink)"/></g></g>
        <path class="f50-ka" d="" fill="none" stroke="var(--c-clin)" stroke-width="2" stroke-dasharray="3 3"/>
        <text x="170" y="136" class="f50-lb" fill="var(--ink)">diz refleksi</text><text class="f50-kt2 f50-l" x="170" y="150"></text>
        <text x="170" y="178" class="f50-l">düzeyin altında somatik</text><text x="170" y="191" class="f50-l">ve visseral duyu yok</text>
      </svg>
      <div class="meter ok f50-tn"><div class="t">Kas tonusu</div><div class="trk"><div class="fl" style="width:0"></div></div><div class="ck"></div></div>
      <div class="f50-kr2">${Object.entries(KART).map(([k, v]) => `<button type="button" class="f50-kard" data-k="${k}" aria-pressed="false" style="--rk:${v.r}"><b>${v.b}</b><span>${v.t}</span></button>`).join('')}</div></div>`;
    const q = (s) => el.querySelector(s), inp = q('[data-s=z]');
    let z = 0, ph = 0, kart = '';
    const stat = () => {
      const Z = ZAM[z];
      q('[data-o=z]').textContent = Z.ad;
      q('.f50-mk2').setAttribute('transform', `translate(${Z.x},0)`);
      q('.f50-tn .fl').style.width = Z.ton + '%';
      q('.f50-tn .fl').style.background = z === 3 ? 'var(--c-clin)' : 'var(--c-basic)';
      q('.f50-tn .ck').textContent = z === 0 ? 'düşük (flask)' : z === 3 ? 'yüksek (spastik)' : 'artıyor';
      q('.f50-kt2').textContent = z === 0 ? 'yanıt yok' : z === 3 ? 'büyük sıçrama' : 'zayıf yanıt';
      q('.f50-ka').setAttribute('d', Z.a ? `M${104 + 10},${196}A${72},${72} 0 0 1 ${104 + 10 + 0},${196}` : '');
      q('.f50-ka').setAttribute('d', '');
      if (RM) pose(Z.a, 0);
    };
    const pose = (a, h) => {
      q('.f50-sh').setAttribute('transform', `rotate(${(-a).toFixed(1)} 78 50)`);
      q('.f50-hm').setAttribute('transform', `rotate(${(h * 38).toFixed(1)} 116 28)`);
    };
    const kap2 = () => { if (kart) kap.set(KART[kart].m || ZAM[z].m || ''); else if (z === 0) kap.reset(); else kap.set(ZAM[z].m); };
    inp.addEventListener('input', () => { z = +inp.value; kart = ''; el.querySelectorAll('.f50-kard').forEach((b) => b.setAttribute('aria-pressed', 'false')); stat(); kap2(); });
    el.querySelectorAll('.f50-kard').forEach((b) => b.addEventListener('click', () => {
      kart = kart === b.dataset.k ? '' : b.dataset.k;
      el.querySelectorAll('.f50-kard').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.k === kart)));
      if (kart && KART[kart].m) kap.set(KART[kart].m); else if (kart === 'sinir') kap.set(z === 0 ? ZAM[0].m || '' : ZAM[z].m); else kap2();
      if (kart === 'sinir') { if (z === 0) kap.reset(); else kap.set(ZAM[z].m); }
    }));
    stat(); pose(0, 0);
    const dur = ticker(el, (dt) => {
      if (RM) return;
      ph = (ph + dt) % 3;
      const Z = ZAM[z];
      let h = 0, a = 0;
      if (ph < 0.35) h = Math.sin((ph / 0.35) * Math.PI);
      if (ph > 0.3 && ph < 1.5) a = Z.a * Math.sin(((ph - 0.3) / 1.2) * Math.PI);
      pose(a, h);
    });
    return dur;
  };

  /* ---------- 10 · dört örüntü ---------- */
  VIZ.f50_eksik = (el) => {
    const kap = kapak(el);
    const P = {
      asa: { ad: 'Anterior spinal arter', kisa: 'ASA', kay: ['parapleji (düzeyde LMN, altında UMN)', 'ağrı ve ısı', 'mesane ve barsak işlevi'], kor: ['propriyosepsiyon ve vibrasyon'], not: 'Adamkiewicz arteri tıkanması / aortik klemp', m: null },
      mer: { ad: 'Santral kord', kisa: 'Santral kord', kay: ['düzeyin altında kol ve bacak güçsüzlüğü', 'değişken duyu kaybı', 'otonom (özellikle mesane)'], kor: ['bir miktar duyu'], not: 'en sık eksik yaralanma; yaşlıda servikal spondiloz + boyun hiperekstansiyonu, gençte yüksek enerjili travma; lateral kolonlarda seçici aksonal hasar, gri cevher görece korunur', m: '<b>Santral kord sendromu.</b> Lateral kolonlarda seçici aksonal hasar, gri cevher görece korunur: düzeyin altında kol ve bacak güçsüzlüğü, değişken duyu kaybı, sık mesane bozukluğu. [[K1 s. 218–219]]' },
      bs: { ad: 'Brown-Séquard', kisa: 'Brown-Séquard', kay: ['aynı tarafta motor güç', 'aynı tarafta iki nokta, propriyosepsiyon, vibrasyon', 'karşı tarafta ağrı ve ısı'], kor: [], not: 'hemiseksiyon', m: '<b>Brown-Séquard sendromu.</b> Yarı kesi: aynı tarafta motor güçsüzlük ve dorsal kolon duyularının kaybı, karşı tarafta ağrı ve ısı kaybı. [[K1 s. 219]]' },
      kau: { ad: 'Kauda ekuina', kisa: 'Kauda ekuina', kay: ['ağır bacak güçsüzlüğü', 'eyer anestezisi (anüs, kalça, perine, genital)', 'idrar retansiyonu (neredeyse her zaman)'], kor: ['duyu en az kısmen'], not: 'en sık neden akut santral disk herniasyonu: cerrahi acil (lomber diskektomi); ayrıca metastaz, travma, epidural apse; ince kateterle sürekli spinal anestezide hiperbarik %5 lidokain mi, BOS’a karışan az miktarda nörotoksik klorheksidin mi sorumlu, belli değil', m: '<b>Kauda ekuina sendromu.</b> L2 ve altındaki lezyon omuriliği değil L1–S5 köklerini ezer: ağır bacak güçsüzlüğü, eyer anestezisi, idrar retansiyonu. [[K1 s. 219]]' },
    };
    const NORM = [['1', 'Dorsal kolonlar', 'propriyosepsiyon ve vibrasyon'], ['2', 'Kortikospinal traktus', 'motor lifler'], ['3', 'Lateral boynuz', 'sempatik lifler'], ['4', 'Spinotalamik traktus', 'ağrı ve ısı']];
    const rz = (n, x, y) => `<g pointer-events="none"><circle cx="${x}" cy="${y}" r="9" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="f50-rn">${n}</text></g>`;
    const sol = (id, s, ex = '') => `<path d="${poly(TR[id].p, s)}" ${ex}/>`;
    const sectionSvg = (k) => {
      const base = (tr, att, gO = 1) => kes(150, 134, 0.95, kesit({ lat: true, tr, att, zemin: false, griOp: gO }));
      const T = (c, sft) => `fill="${sft}" stroke="${c}" stroke-width="1.6"`;
      const duzTr = [['gra', -1], ['gra', 1], ['kun', -1], ['kun', 1], ['lcs', -1], ['lcs', 1], ['lst', -1], ['lst', 1]];
      const att0 = (id) => (id === 'gra' || id === 'kun' ? T('var(--accent)', 'var(--accent-soft)') : id === 'lcs' ? T('var(--c-clin)', 'var(--c-clin-soft)') : T('var(--warn)', 'var(--warn-soft)'));
      const hd = `<defs>${PAT('f50-eh', 'diag', 'var(--crit)', 'var(--crit-soft)')}${PAT('f50-ehs', 'hor', 'var(--crit)', 'var(--crit-soft)')}<clipPath id="f50-ec-a"><rect x="-140" y="-34" width="280" height="150"/></clipPath><clipPath id="f50-ec-l"><rect x="0" y="-110" width="140" height="220"/></clipPath></defs>`;
      const et = '<text x="150" y="14" text-anchor="middle" class="f50-l">arka (dorsal)</text><text x="150" y="256" text-anchor="middle" class="f50-l">ön (ventral)</text>';
      const ar = (inner) => `<g transform="translate(150,134) scale(.95)">${inner}</g>`;
      if (k === 'norm') return `<svg class="f50-svg" viewBox="0 0 300 262" role="img" aria-label="Normal omurilik kesiti: dorsal kolonlar, kortikospinal traktus, lateral boynuz, spinotalamik traktus">${hd}${et}${base(duzTr, att0)}${rz(1, 150, 52)}${rz(2, 244, 108)}${rz(3, 210, 134)}${rz(4, 232, 176)}</svg>`;
      if (k === 'asa') return `<svg class="f50-svg" viewBox="0 0 300 262" role="img" aria-label="Anterior spinal arter sendromu: ön üçte iki iskemik, dorsal kolonlar korunur">${hd}${et}${ar('<ellipse rx="130" ry="100" fill="url(#f50-eh)" clip-path="url(#f50-ec-a)"/>')}${base(duzTr, (id) => (id === 'gra' || id === 'kun' ? 'fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2.4"' : 'fill="none" stroke="var(--crit)" stroke-width="1"'), 0.5)}<text x="150" y="68" text-anchor="middle" class="f50-lb" fill="var(--ok)">korunur</text></svg>`;
      if (k === 'mer') {
        const pl = (s) => `<path d="${poly(sek(-62, 62, 0.52, 0.99), s)}" fill="url(#f50-ehs)" stroke="var(--crit)" stroke-width="1.8"/>`;
        return `<svg class="f50-svg" viewBox="0 0 300 262" role="img" aria-label="Santral kord sendromu: lateral kolonlar ve lateral boynuz hasarlı, gri cevher görece korunur">${hd}${et}${base(duzTr, (id) => (id === 'gra' || id === 'kun' ? 'fill="var(--accent-soft)" stroke="var(--crit)" stroke-width="1.6" stroke-dasharray="3 2"' : 'fill="none" stroke="none"'))}${ar(`${pl(1)}${pl(-1)}<path d="M30,-6L58,-8M-30,-6L-58,-8" stroke="var(--crit)" stroke-width="10" stroke-linecap="round" opacity=".8"/><ellipse cy="-2" rx="30" ry="48" fill="none" stroke="var(--ok)" stroke-width="2.4"/>`)}<text x="150" y="122" text-anchor="middle" class="f50-lb" fill="var(--ok)">gri cevher</text></svg>`;
      }
      if (k === 'bs') return `<svg class="f50-svg" viewBox="0 0 300 262" role="img" aria-label="Brown-Séquard: sol yarı tümüyle hasarlı">${hd}${et}${ar('<ellipse rx="130" ry="100" fill="url(#f50-eh)" clip-path="url(#f50-ec-l)"/>')}${base(duzTr, att0, 0.5)}<text x="226" y="132" text-anchor="middle" class="f50-lb" fill="var(--crit)">sol yarı</text></svg>`;
      const ks = Array.from({ length: 14 }, (_, i) => { const x0 = 142 + (i % 7) * 2.6, x1 = 104 + i * 6.2; return `<path d="M${x0},50C${x0},110 ${x1},150 ${x1},228" fill="none" stroke="${i > 3 && i < 9 ? 'var(--crit)' : 'var(--muted)'}" stroke-width="1.5"/>`; }).join('');
      return `<svg class="f50-svg" viewBox="0 0 300 262" role="img" aria-label="Kauda ekuina: kanalda inen sinir kökleri, santral disk herniasyonu kökleri iter"><defs>${PAT('f50-eh', 'diag', 'var(--crit)', 'var(--crit-soft)')}</defs>
        <rect x="88" y="26" width="124" height="208" rx="10" fill="var(--c-basic-soft)" stroke="var(--muted)" stroke-width="2"/>
        <path d="M142,26V54" stroke="var(--chip)" stroke-width="12"/><path d="M136,54Q142,38 148,54Z" fill="var(--chip)" stroke="var(--muted)"/>
        <text x="150" y="16" text-anchor="middle" class="f50-lb">konus L1/2’de biter</text>${ks}
        <path d="M88,126A34,34 0 0 1 88,190Z" fill="url(#f50-eh)" stroke="var(--crit)" stroke-width="2.2" transform="translate(0,-2)"/><path d="M96,134l22,10l-22,10" stroke="var(--crit)" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="84" y="164" text-anchor="end" class="f50-lb" fill="var(--crit)">santral</text><text x="84" y="177" text-anchor="end" class="f50-lb" fill="var(--crit)">disk</text>
        <text x="216" y="130" class="f50-l">kökler</text><text x="216" y="143" class="f50-l">L1–S5</text><text x="150" y="252" text-anchor="middle" class="f50-l">ön ← yan görünüm → arka</text></svg>`;
    };
    el.innerHTML = `<div class="f50-ek"><div class="f50-ec">${seg('Örüntü', Object.keys(P).map((k) => [k, `<span class="f50-u">${P[k].ad}</span><span class="f50-k">${P[k].kisa}</span>`]), 'asa')}<button type="button" class="btn ghost" data-nr>Normal kesit</button></div>
      <div class="f50-eg"><div class="f50-es"></div><div class="f50-kart"></div></div></div>`;
    const q = (s) => el.querySelector(s);
    let k = 'asa';
    const ciz = (anahtar) => {
      k = anahtar;
      q('.f50-es').innerHTML = sectionSvg(k);
      const kt = q('.f50-kart');
      if (k === 'norm') { kt.innerHTML = `<h4>Normal kesit</h4><ol class="f50-nl">${NORM.map(([n, a, b]) => `<li><i class="f50-rzb">${n}</i><b>${a}</b>: ${b}</li>`).join('')}</ol>`; return; }
      const C = P[k];
      kt.innerHTML = `<h4>${C.ad}</h4><div class="f50-sat"><span class="tag crit">Kaybolan</span><ul>${C.kay.map((x) => `<li>${x}</li>`).join('')}</ul></div>${C.kor.length ? `<div class="f50-sat"><span class="tag ok">Korunan</span><ul>${C.kor.map((x) => `<li>${x}</li>`).join('')}</ul></div>` : ''}<div class="f50-sat"><span class="tag">Not</span><p>${C.not}</p></div>`;
    };
    const sg = segBagla(q('.f50-ec .seg'), (a) => { ciz(a); const m = P[a].m; if (m) kap.set(m); else kap.reset(); });
    q('[data-nr]').addEventListener('click', () => { sg(''); ciz('norm'); kap.reset(); });
    ciz('asa');
    return () => {};
  };

  /* ---------- 11 · sekonder hasar ve süksinilkolin ---------- */
  VIZ.f50_sekonder = (el) => {
    const kap = kapak(el);
    const N = [
      { b: 'Sistemik hipoksemi', o: 'Bilinçliye yüksek akımlı O₂, bilinçsize entübasyon; PaO₂ > 10 kPa; göğüs yaralanmasını (yelken göğüs, hemotoraks) hemen tedavi et.', m: '<b>Hipoksemi.</b> Servikal yaralanmada özellikle sıktır; akut evrede PaO₂ > 10 kPa tutulur. Bilinçli hasta oksijenlenemiyor ya da hiperkapnik oluyorsa entübasyon ve ventilasyon. [[K1 s. 220]]' },
      { b: 'Hipotansiyon: kanama', o: 'Hipovolemiyi hemen sıvıyla düzelt; kanamayı ara: göğüs ve pelvis grafisi, karın USG, BT.', m: '<b>Travmada hipotansiyon.</b> En olası neden kanamadır; hipovolemi sekonder iskemik hasarı azaltmak için hemen sıvıyla tedavi edilir. [[K1 s. 220]]' },
      { b: 'Hipotansiyon + bradikardi: nörojenik', o: 'Karşılanmamış parasempatik: atropin ya da glikopirolat.', m: '<b>Bradikardi + hipotansiyon.</b> Kalbin karşılanmamış parasempatik innervasyonuna bağlı olabilir: atropin ya da glikopirolat. [[K1 s. 220]]' },
      { b: 'Damar hasarı, omurilik ödemi', o: 'Perfüzyonu ve oksijenlenmeyi koru.', m: '<b>Damar hasarı ve omurilik ödemi.</b> Omurilik hipoperfüzyonunun öteki nedenleri; hedef perfüzyonu ve oksijenlenmeyi korumaktır. [[K1 s. 219]]' },
      { b: 'Ek mekanik hasar', o: 'Omurga sabitlemesi: sert boyunluk, kum torbaları, kayışlar; log-roll; çene itme, MILS.', m: '<b>Sabitleme.</b> Omurga travmasından şüphelenildikçe sabitleme sürer; baş geriye itilmez, çene itme daha güvenlidir. [[K1 s. 219]]', kes: true },
    ];
    el.innerHTML = `<div class="f50-sn">
      <div class="f50-s1"><div class="f50-pr"><b>Primer (mekanik) hasar</b><span>dönme ve makaslama kuvvetleri, aksonal hasar · geri çevrilemez</span></div><div class="f50-ar" aria-hidden="true">→</div>
      <div class="f50-isk"><b>Omurilik iskemisi → sekonder hasar</b></div></div>
      <div class="f50-ar2" aria-hidden="true">▲ nedenler ▲</div>
      <div class="f50-nd">${N.map((n, i) => `<div class="f50-nc${n.kes ? ' kes' : ''}"><button type="button" class="f50-nb" data-i="${i}" aria-expanded="false"><span>${n.b}</span><small>önlem ▾</small></button><p class="f50-on" hidden>${n.o}</p></div>`).join('')}</div>
      <div class="f50-sx"><label class="f50-sl"><span>Yaralanmadan geçen süre: <b data-o="h">2</b> saat</span><input type="range" min="0" max="72" step="1" value="2" aria-label="Yaralanmadan geçen süre (saat)" data-s="h"></label>
        <div class="f50-sk" aria-hidden="true"><i class="ok"></i><i class="no"></i><b class="f50-im"></b><em style="left:33.33%">24 sa</em><em style="left:0">0</em><em style="left:100%">72 sa</em></div>
        <div class="f50-sr"><span class="f50-sb2 tag ok">Süksinilkolin: kullanılabilir</span><small class="f50-sn2"></small></div></div></div>`;
    const q = (s) => el.querySelector(s), inp = q('[data-s=h]');
    el.querySelectorAll('.f50-nb').forEach((b) => b.addEventListener('click', () => {
      const i = +b.dataset.i, p = b.nextElementSibling, ac = p.hidden;
      p.hidden = !ac; b.setAttribute('aria-expanded', String(ac)); b.parentElement.classList.toggle('on', ac);
      if (ac) kap.set(N[i].m); else kap.reset();
    }));
    const su = () => {
      const h = +inp.value, ok = h <= 24;
      q('[data-o=h]').textContent = h;
      q('.f50-im').style.left = (h / 72) * 100 + '%';
      const r = q('.f50-sb2'); r.className = 'f50-sb2 tag ' + (ok ? 'ok' : 'crit'); r.textContent = ok ? 'Süksinilkolin: kullanılabilir' : 'Süksinilkolin: kontrendike';
      q('.f50-sn2').textContent = ok ? 'ilk RSI’da kullanılabilir' : 'ekstrajonksiyonel ACh reseptörleri → K⁺ ↑';
    };
    inp.addEventListener('input', () => { su(); const h = +inp.value; if (h > 24) kap.set('<b>24 saatten sonra süksinilkolin kontrendike.</b> Yeni oluşan ekstrajonksiyonel asetilkolin reseptörlerinin depolarizasyonu plazma K⁺’unu belirgin yükseltir (Bölüm 53). [[K1 s. 220]]'); else kap.set('<b>İlk 24 saat.</b> Süksinilkolin ilk RSI’da kas gevşetici olarak kullanılabilir. [[K1 s. 220]]'); });
    su();
    return () => {};
  };
})();
