/* Fizyoloji Bölüm 9 · Karbondioksit taşınması · bileşenler (K1 s. 37–39).
   Modeller şematiktir; sayılar kitaptaki değerlere oturtulmuştur ve bileşen altlarında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',');
  const mmss = (m) => { const s = Math.round(m * 60); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  // Bölüm içi renkler (her yerde aynı): CO₂ mavi, H⁺ kehribar, HCO₃⁻ camgöbeği, Cl⁻ yeşil, O₂ kırmızı
  const R = { co2: 'var(--c-basic)', h: 'var(--warn)', hco3: 'var(--c-clin)', cl: 'var(--ok)', o2: 'var(--crit)', su: 'var(--muted)', h2co3: 'var(--ink)' };
  const chipW = (s) => 20 + [...s].length * 9; // dar ekranda yazı büyüdüğünde de sığsın
  const chip = (cls, s, renk) => `<g class="f09-chip ${cls}" style="--c:${renk}"><rect x="${-chipW(s) / 2}" y="-12" width="${chipW(s)}" height="24" rx="7"/><text y="5" text-anchor="middle">${s}</text></g>`;
  const setPos = (g, x, y, o) => { g.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); g.setAttribute('opacity', o.toFixed(2)); };

  /* ---------- 1. Eritrosit içinde: CA, klorür kayması, H⁺ tamponlanması (doku ve akciğer) ---------- */
  VIZ.f09_eritrosit = (el) => {
    const V = [322, 228]; // Cl⁻/HCO₃⁻ değiştiricisi
    const K = { co2: [72, 150], su: [72, 186], h2co3: [172, 168], h: [262, 146], hco3: [266, 190], hcoD: [376, 226], clD: [376, 270], clI: [282, 256], hHb: [74, 302], kHb: [210, 302], o1: [112, 250], o2: [168, 250], coz: [376, 128], bek: [218, 238], suD: [380, 318], suI: [286, 318] };
    const P = (k, o = 1, via) => [K[k][0], K[k][1], o, via];
    const A = (x, y, o = 1) => [x, y, o];
    const TOK = [['co2a', 'CO₂', R.co2], ['su', 'H₂O', R.su], ['h2co3', 'H₂CO₃', R.h2co3], ['h', 'H⁺', R.h], ['hco3', 'HCO₃⁻', R.hco3], ['cl', 'Cl⁻', R.cl], ['co2b', 'CO₂', R.co2], ['co2c', 'CO₂', R.co2], ['o2a', 'O₂', R.o2], ['o2b', 'O₂', R.o2], ['suin', 'H₂O', R.su]];
    const MOD = {
      doku: {
        bant: 'Doku hücreleri · CO₂ üretir', hb: ['oksiHb', 'deoksiHb'],
        hl: ['bant', 'zar', 'ca', 'ayr', 'deg', 'hb', 'su'],
        ad: ['Başlangıç', 'Difüzyon', 'Karbonik anhidraz', 'Ayrışma', 'Klorür kayması', 'H⁺ Hb\'ye bağlanır', 'Net sonuç ve su'],
        T: {
          co2a: [A(60, 36), P('co2'), P('h2co3', 0)],
          su: [P('su', 0), P('su'), P('h2co3', 0)],
          h2co3: [P('h2co3', 0), null, P('h2co3'), P('h2co3', 0)],
          h: [P('h2co3', 0), null, null, P('h'), null, P('hHb')],
          hco3: [P('h2co3', 0), null, null, P('hco3'), P('hcoD', 1, V)],
          cl: [P('clD'), null, null, null, P('clI', 1, V)],
          co2b: [A(124, 36), P('bek'), null, null, null, P('kHb')],
          co2c: [A(188, 36), P('coz')],
          o2a: [P('o1'), A(262, 36)],
          o2b: [P('o2'), A(330, 36)],
          suin: [P('suD', 0), null, null, null, null, null, P('suI')],
        },
        cap: [
          '<b>Doku kapillerinde.</b> Dokular aerobik metabolizmanın yan ürünü olarak CO₂ üretir. Eritrositteki Hb henüz oksijenlidir. [[K1 s. 37]]',
          '<b>Difüzyon.</b> CO₂ zarları doğrudan geçer. Bir kısmı plazmada çözünmüş kalır (miktarı PCO₂ ile orantılıdır: Henry yasası), çoğu eritrosite girer. Aynı sırada Hb dokuya O₂ bırakır ve deoksihemoglobin oluşur. [[K1 s. 37–38]]',
          '<b>Karbonik anhidraz.</b> Eritrosit sitoplazmasındaki bol CA, CO₂ ile suyun H₂CO₃ oluşturmasını katalizler. Plazmada CA yoktur. [[K1 s. 37]]',
          '<b>Ayrışma.</b> H₂CO₃\'ün hemen hepsi H⁺ ve HCO₃⁻\'e ayrışır. Bu iyonlar zardan serbestçe geçemez; birikselerdi denge tepkimesi dururdu. [[K1 s. 37]]',
          '<b>Klorür kayması (Hamburger etkisi).</b> HCO₃⁻, elektrokimyasal gradyanı yönünde özgül bir Cl⁻/HCO₃⁻ değiştiricisiyle plazmaya çıkar ve kanın bikarbonat tamponuna katılır. Elektriksel nötrlük için karşılığında Cl⁻ girer. [[K1 s. 37]]',
          '<b>H⁺ Hb\'ye bağlanır.</b> H⁺ hemoglobinin histidin yan zincirlerine bağlanır; hücre içi H⁺ düşük kalır, Bohr kayması kolaylaşır. Deoksihemoglobin H⁺\'yı daha iyi bağlar ve karbamino bileşiğini (Hb–NH₂ + CO₂ → Hb–NHCOOH) daha kolay oluşturur. [[K1 s. 37]]',
          '<b>Net sonuç ve su.</b> Bikarbonata dönüşen her CO₂ için eritrosite bir Cl⁻ eklenir, H⁺ bağlanır, HCO₃⁻ hücre dışı sıvıya geçer. CO₂ ozmotik olarak etkin değildir, Cl⁻ etkindir: eritrosite biraz su girer. Venöz eritrositin hacmi arteriyelden %3 büyüktür. [[K1 s. 37–38]]',
        ],
      },
      akciger: {
        bant: 'Alveol · PO₂ yüksek', hb: ['deoksiHb', 'oksiHb'],
        hl: ['bant', 'hb', 'hb', 'deg', 'ayr', 'ca', 'bant'],
        ad: ['Başlangıç', 'O₂ bağlanır', 'H⁺ ve CO₂ salınır', 'Ters klorür kayması', 'Karbonik asit oluşur', 'CA ters yönde', 'CO₂ alveole geçer'],
        T: {
          o2a: [A(60, 36), P('o1')],
          o2b: [A(118, 36), P('o2')],
          h: [P('hHb'), null, P('h'), null, P('h2co3', 0)],
          co2b: [P('kHb'), null, P('bek'), null, null, null, A(246, 36)],
          hco3: [P('hcoD'), null, null, P('hco3', 1, V), P('h2co3', 0)],
          cl: [P('clI'), null, null, P('clD', 1, V)],
          h2co3: [P('h2co3', 0), null, null, null, P('h2co3'), P('h2co3', 0)],
          co2a: [P('h2co3', 0), null, null, null, null, P('co2'), A(184, 36)],
          su: [P('h2co3', 0), null, null, null, null, P('su')],
          co2c: [P('coz'), null, null, null, null, null, A(318, 36)],
          suin: [P('suD', 0)],
        },
        cap: [
          '<b>Akciğer kapillerinde.</b> Venöz kan alveol kapillerine gelir; alveolde PO₂ yüksektir. Kısmen deoksijenli Hb, H⁺ ve karbamino CO₂ taşır. [[K1 s. 38]]',
          '<b>O₂ Hb\'ye bağlanır.</b> Hb oksijenlendikçe H⁺ ve CO₂ bağlama yeteneği azalır: Haldane etkisi tersine işler. [[K1 s. 38]]',
          '<b>H⁺ ve CO₂ salınır.</b> Hb\'den H⁺ ayrılır; karbaminohemoglobinden CO₂ doğrudan serbestleşir. [[K1 s. 38]]',
          '<b>Ters klorür kayması.</b> Salınan H⁺, HCO₃⁻ ile birleşecektir [[K1 s. 38]]; bunun için HCO₃⁻ plazmadan eritrosite döner, karşılığında Cl⁻ çıkar. (Atlas notu: kitap bu değişimi ayrıca anlatmaz; değiştirici iki yönde de çalışır.)',
          '<b>Karbonik asit oluşur.</b> H⁺, HCO₃⁻ ile birleşerek H₂CO₃ oluşturur. [[K1 s. 38]]',
          '<b>Karbonik anhidraz ters yönde.</b> CA, H₂CO₃\'ten CO₂ ve su oluşumunu katalizler; CO₂ serbestleşir. [[K1 s. 38]]',
          '<b>CO₂ alveole geçer.</b> Serbestleşen CO₂ alveole difüze olup kandan uzaklaştıkça Hb\'nin O₂ afinitesi artar (Bohr etkisinin tersi) ve O₂ yüklenmesi kolaylaşır. [[K1 s. 38]]',
        ],
      },
    };
    const N = 7;
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Kapiller yatak"><button type="button" data-m="doku" aria-pressed="true">Doku kapilleri</button><button type="button" data-m="akciger" aria-pressed="false">Akciğer kapilleri</button></div>
        <div class="btn-row"><button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">‹</button><button type="button" class="btn play" data-a="oynat">Duraklat</button><button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">›</button></div></div>
      <div class="f09-er">
        <svg class="f09-svg" viewBox="0 0 420 400" role="img" aria-label="Eritrositte CO₂: difüzyon, karbonik anhidraz, ayrışma, klorür kayması, H⁺'nın Hb'ye bağlanması">
          <rect class="f09-er-pl" x="0" y="62" width="420" height="338"/>
          <rect class="f09-er-bant" x="0" y="0" width="420" height="58" rx="8"/>
          <text class="f09-er-bl" x="10" y="16"></text>
          <line x1="0" x2="420" y1="60" y2="60" stroke="var(--line)" stroke-width="4"/>
          <g class="f09-er-rbc"><rect x="20" y="86" width="300" height="292" rx="64"/></g>
          <text class="f09-er-ad" x="44" y="112">Eritrosit</text>
          <text class="f09-er-pa" x="376" y="392" text-anchor="middle">Plazma</text>
          <text class="f09-er-k" x="376" y="108" text-anchor="middle">çözünmüş</text>
          <g class="f09-er-ca"><text class="f09-er-ok" x="118" y="175" text-anchor="middle">⇌</text><text class="f09-er-cal" x="118" y="152" text-anchor="middle">CA</text></g>
          <g class="f09-er-ayr"><text class="f09-er-ok" x="222" y="175" text-anchor="middle">⇌</text></g>
          <g class="f09-er-deg"><rect x="314" y="212" width="16" height="32" rx="5"/><text class="f09-er-k" x="372" y="205" text-anchor="middle">değiştirici</text></g>
          <g class="f09-er-hb">${[[124, 288], [160, 288], [124, 322], [160, 322]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="19"/>`).join('')}</g>
          <text class="f09-er-k" x="70" y="334" text-anchor="middle">histidin</text>
          <text class="f09-er-k" x="216" y="334" text-anchor="middle">karbamino</text>
          <text class="f09-er-hbs" x="142" y="364" text-anchor="middle"></text>
          <text class="f09-er-uc" x="262" y="364" text-anchor="middle">+%3 hacim</text>
          ${TOK.map(([id, s, r]) => chip('t-' + id, s, r)).join('')}
        </svg>
        <ol class="f09-adim"></ol>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim: molekül sayıları ve yerleşim temsilidir; adımların sırası ve içeriği kitaptandır [[K1 s. 37–38]]. Akciğerdeki ters klorür kayması Atlas notudur.')}</p>`;
    const $ = (s) => el.querySelector(s);
    const g = {}; TOK.forEach(([id]) => { g[id] = $('.t-' + id); });
    const cap = $('.viz-cap'), list = $('.f09-adim'), playB = $('[data-a="oynat"]');
    const parts = { bant: $('.f09-er-bant'), zar: $('.f09-er-rbc'), ca: $('.f09-er-ca'), ayr: $('.f09-er-ayr'), deg: $('.f09-er-deg'), hb: $('.f09-er-hb'), su: $('.f09-er-rbc') };
    let mod = 'doku', s = 0, prev = 0, f = 1, tt = 0, run = !RM, last = '';
    const cur = {};
    const kf = (id, k) => { const L = MOD[mod].T[id] || [[0, 0, 0]]; let v = L[0]; for (let i = 1; i <= k && i < L.length; i++) if (L[i]) v = L[i]; return v; };
    const viaOf = (id) => { const L = MOD[mod].T[id] || []; if (s === prev + 1 && L[s] && L[s][3]) return L[s][3]; if (s === prev - 1 && L[prev] && L[prev][3]) return L[prev][3]; return null; };
    const from = {};
    const kur = () => {
      const M = MOD[mod];
      $('.f09-er-bl').textContent = M.bant;
      list.innerHTML = M.ad.map((a, i) => `<li><button type="button" data-s="${i}">${a}</button></li>`).join('');
      el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mod)));
      TOK.forEach(([id]) => { cur[id] = kf(id, s).slice(0, 3); });
    };
    const go = (k, anim) => {
      prev = s; s = clamp(k, 0, N - 1); tt = 0;
      TOK.forEach(([id]) => { from[id] = cur[id].slice(); });
      f = anim && !RM ? 0 : 1;
    };
    const draw = () => {
      const M = MOD[mod], e = ease(f);
      TOK.forEach(([id]) => {
        const to = kf(id, s), a = from[id] || to, via = f < 1 ? viaOf(id) : null;
        let x, y;
        if (via) { const cx = 2 * via[0] - (a[0] + to[0]) / 2, cy = 2 * via[1] - (a[1] + to[1]) / 2; x = (1 - e) * (1 - e) * a[0] + 2 * (1 - e) * e * cx + e * e * to[0]; y = (1 - e) * (1 - e) * a[1] + 2 * (1 - e) * e * cy + e * e * to[1]; }
        else { x = lerp(a[0], to[0], e); y = lerp(a[1], to[1], e); }
        const o = lerp(a[2], to[2], e);
        cur[id] = [x, y, o];
        setPos(g[id], x, y, o);
      });
      const hl = M.hl[s];
      Object.entries(parts).forEach(([k, n]) => { if (k !== 'su') n.classList.toggle('on', hl === k); });
      const sc = mod === 'doku' && s === N - 1 ? lerp(1, 1.03, e) : 1;
      parts.zar.setAttribute('transform', `translate(170 232) scale(${sc.toFixed(4)}) translate(-170 -232)`);
      $('.f09-er-uc').setAttribute('opacity', mod === 'doku' && s === N - 1 ? e : 0);
      $('.f09-er-hbs').textContent = M.hb[s === 0 ? 0 : 1];
      list.querySelectorAll('button').forEach((b, i) => { b.classList.toggle('on', i === s); b.classList.toggle('gecti', i < s); });
      playB.textContent = run ? 'Duraklat' : s === N - 1 ? 'Baştan oynat' : 'Oynat';
      const c = `<span class="f09-no">${s + 1}/${N}</span> ${M.cap[s]}`;
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (ev) => {
      if (ev.target.closest('.ref')) return;
      const m = ev.target.closest('[data-m]');
      if (m) { mod = m.dataset.m; s = RM ? N - 1 : 0; prev = s; f = 1; tt = 0; run = !RM; kur(); TOK.forEach(([id]) => { from[id] = cur[id].slice(); }); draw(); return; }
      const b = ev.target.closest('[data-s]'); if (b) { run = false; go(+b.dataset.s, Math.abs(+b.dataset.s - s) === 1); draw(); return; }
      const a = ev.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'ileri') { run = false; go(s + 1, true); }
      if (a.dataset.a === 'geri') { run = false; go(s - 1, true); }
      if (a.dataset.a === 'oynat') { if (run) run = false; else { if (s === N - 1) { s = 0; prev = 0; TOK.forEach(([id]) => { cur[id] = kf(id, 0).slice(0, 3); from[id] = cur[id].slice(); }); f = 1; } run = true; tt = 0; } }
      draw();
    });
    if (RM) s = N - 1;
    prev = s; kur(); TOK.forEach(([id]) => { from[id] = cur[id].slice(); }); draw();
    return ticker(el, (dt) => {
      if (f < 1) { f = Math.min(1, f + dt / 1.2); draw(); }
      if (!run) return;
      tt += dt;
      if (tt > 4.2) { if (s < N - 1) go(s + 1, true); else run = false; draw(); }
    });
  };

  /* ---------- 2. Bohr ve Haldane etkilerinin eşleşmesi: akciğer ↔ doku döngüsü ---------- */
  VIZ.f09_dongu = (el) => {
    // Döngü yolu: üst kenar akciğer kapilleri (soldan sağa), sağ kenar arteriyel kan (aşağı), alt kenar doku kapilleri (sağdan sola), sol kenar venöz kan (yukarı)
    const r = 30, xl = 40, xr = 280, yt = 70, yb = 270, Lh = xr - xl - 2 * r, Lv = yb - yt - 2 * r, Lc = (Math.PI * r) / 2;
    const SEG = [
      ['L', xl + r, yt, xr - r, yt], ['A', xr - r, yt + r, -90, 0], ['L', xr, yt + r, xr, yb - r], ['A', xr - r, yb - r, 0, 90],
      ['L', xr - r, yb, xl + r, yb], ['A', xl + r, yb - r, 90, 180], ['L', xl, yb - r, xl, yt + r], ['A', xl + r, yt + r, 180, 270],
    ];
    const LEN = SEG.map((q) => (q[0] === 'L' ? Math.hypot(q[3] - q[1], q[4] - q[2]) : Lc)), TOT = LEN.reduce((a, b) => a + b, 0);
    const yer = (u) => {
      u = ((u % TOT) + TOT) % TOT;
      for (let i = 0; i < SEG.length; i++) {
        if (u <= LEN[i]) { const q = SEG[i], k = u / LEN[i]; if (q[0] === 'L') return [lerp(q[1], q[3], k), lerp(q[2], q[4], k)]; const a = ((q[3] + (q[4] - q[3]) * k) * Math.PI) / 180; return [q[1] + r * Math.cos(a), q[2] + r * Math.sin(a)]; }
        u -= LEN[i];
      }
      return [xl + r, yt];
    };
    const ALT0 = Lh + Lc + Lv + Lc; // alt kenarın başı (sağ uç)
    const DUR = [{ u: 30 }, { u: 90 }, { u: 150 }, { u: ALT0 + 30 }, { u: ALT0 + 90 }, { u: ALT0 + 150 }];
    const DUR_S = 3.4, TR_K = 0.7, TR_U = 2.0;
    // zaman çizelgesi: durak, geçiş, durak ...
    const PL = []; let t0 = 0;
    DUR.forEach((d, i) => {
      PL.push({ tip: 'dur', i, t0, t1: t0 + DUR_S, u: d.u }); t0 += DUR_S;
      const nx = DUR[(i + 1) % 6], uzun = i === 2 || i === 5, tr = uzun ? TR_U : TR_K;
      PL.push({ tip: 'git', i, t0, t1: t0 + tr, u0: d.u, u1: i === 5 ? nx.u + TOT : nx.u }); t0 += tr;
    });
    const CYC = t0, tDur = (i) => PL.find((p) => p.tip === 'dur' && p.i === i).t0;
    const ev = (t, i, a = 0.25, d = 1.3) => ease((t - tDur(i) - a) / d); // durak i'deki olayın ilerlemesi
    const ADIM = [
      ['Akciğer', 'O₂ bağlanır'], ['Akciğer', 'Haldane tersine: H⁺ ve CO₂ salınır'], ['Akciğer', 'Bohr tersine: O₂ afinitesi artar'],
      ['Doku', 'CO₂ ve H⁺ üretilir'], ['Doku', 'Bohr: ek O₂ bırakılır'], ['Doku', 'Haldane: H⁺ ve CO₂ bağlanır'],
    ];
    const CAP = [
      '<b>Akciğer · O₂ bağlanır.</b> Alveolde PO₂ yüksektir; O₂ molekülleri deoksihemoglobine bağlanır. [[K1 s. 38]]',
      '<b>Akciğer · Haldane etkisi tersine.</b> Oksijenlenen Hb\'nin H⁺ ve CO₂ bağlama yeteneği azalır: H⁺ salınır ve HCO₃⁻ ile birleşir, oluşan H₂CO₃ CA aracılığıyla CO₂\'ye dönüşür; karbaminohemoglobinden de CO₂ doğrudan ayrılır. CO₂ alveole geçer. [[K1 s. 38]]',
      '<b>Akciğer · Bohr etkisi tersine.</b> Serbestleşen CO₂ alveole difüze olup kandan uzaklaştıkça Hb\'nin O₂ afinitesi artar ve O₂ yüklenmesi kolaylaşır. Arteriyel kanda Hb doygunluğu yaklaşık %97\'dir. [[K1 s. 38]] [[K1 s. 30]]',
      '<b>Doku · CO₂ ve H⁺ üretimi.</b> Metabolik olarak etkin dokular CO₂ ve H⁺ üretir. [[K1 s. 38]]',
      '<b>Doku · Bohr etkisi.</b> PCO₂ artışı ve pH düşüşü P₅₀\'yi yükseltir (oksihemoglobin ayrışma eğrisi sağa kayar): en etkin dokulara ek O₂ bırakılır. Venöz kanda doygunluk yaklaşık %75\'tir. [[K1 s. 38]] [[K1 s. 30]]',
      '<b>Doku · Haldane etkisi.</b> Yeni oluşan deoksihemoglobin H⁺\'yı bağlamada ve CO₂ taşımada oksihemoglobinden daha iyidir: metabolik atıklar dokudan akciğere etkin biçimde taşınır. [[K1 s. 38]]',
    ];
    const SU = [[133, 143], [187, 143], [133, 197], [187, 197]], H4 = SU[3];
    const yH = [232, 176], yC = [234, 214]; // H⁺ ve karbamino CO₂'nin 4. alt birimdeki yeri
    el.innerHTML = `<div class="f09-dg">
        <svg class="f09-svg f09-dg-svg" viewBox="0 0 320 340" role="img" aria-label="Kan akciğer ile doku arasında dolaşırken Hb'nin O₂, H⁺ ve CO₂ bağlaması: Bohr ve Haldane etkileri">
          <text class="f09-dg-yer" x="160" y="22" text-anchor="middle">Akciğer kapilleri · alveol</text>
          <text class="f09-dg-yer" x="160" y="332" text-anchor="middle">Doku kapilleri · dokular</text>
          <path class="f09-dg-yol" d="M${xl + r} ${yt}H${xr - r}A${r} ${r} 0 0 1 ${xr} ${yt + r}V${yb - r}A${r} ${r} 0 0 1 ${xr - r} ${yb}H${xl + r}A${r} ${r} 0 0 1 ${xl} ${yb - r}V${yt + r}A${r} ${r} 0 0 1 ${xl + r} ${yt}Z"/>
          <path class="f09-dg-art" d="M${xr} ${yt + r + 6}V${yb - r - 6}"/><path class="f09-dg-ven" d="M${xl} ${yb - r - 6}V${yt + r + 6}"/>
          <text class="f09-dg-k" transform="translate(${xr + 22} 170) rotate(90)" text-anchor="middle">arteriyel kan</text>
          <text class="f09-dg-k" transform="translate(${xl - 14} 170) rotate(-90)" text-anchor="middle">venöz kan</text>
          ${DUR.map((d, i) => { const [x, y] = yer(d.u); return `<g class="f09-dg-st" data-i="${i}"><circle cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y + 4}" text-anchor="middle">${i + 1}</text></g>`; }).join('')}
          <g class="f09-dg-bohr"><rect x="50" y="86" width="220" height="24" rx="12"/><text x="160" y="102" text-anchor="middle"></text></g>
          <g class="f09-dg-hald"><rect x="50" y="230" width="220" height="24" rx="12"/><text x="160" y="246" text-anchor="middle"></text></g>
          ${SU.map(([x, y], i) => `<rect class="f09-dg-su${i === 3 ? ' d4' : ''}" x="${x - 23}" y="${y - 23}" width="46" height="46" rx="10"/><text class="f09-dg-sl" x="${x - 17}" y="${y + 18}">${['α₁', 'β₁', 'α₂', 'β₂'][i]}</text>`).join('')}
          ${SU.slice(0, 3).map(([x, y]) => chip('o2s', 'O₂', R.o2).replace('<g ', `<g transform="translate(${x},${y - 4})" `)).join('')}
          ${chip('t-o2', 'O₂', R.o2)}${chip('t-h', 'H⁺', R.h)}${chip('t-c', 'CO₂', R.co2)}
          <ellipse class="f09-dg-rbc" rx="11" ry="7"/>
        </svg>
        <div class="f09-dg-pan">
          <div class="f09-dg-oku"><span>Kan <b class="kan"></b></span><span>Hb O₂ doygunluğu <b class="so2"></b></span></div>
          <ol class="f09-adim f09-dg-l">${ADIM.map(([y, a], i) => `<li><button type="button" data-i="${i}"><small>${y}</small>${a}</button></li>`).join('')}</ol>
          <div class="btn-row"><button type="button" class="btn play">Duraklat</button></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik: ortadaki Hb, dolaşan eritrositteki hemoglobini temsil eder. Dört alt birimden birinin O₂ bırakması, doygunluğun yaklaşık %97\'den %75\'e inmesini kabaca gösterir [[K1 s. 30]]; H⁺ ve CO₂ simgeleri miktar değil yön gösterir. Mekanizmalar kitaptandır [[K1 s. 38]].')}</p>`;
    const $ = (s) => el.querySelector(s);
    const rbc = $('.f09-dg-rbc'), cO2 = $('.t-o2'), cH = $('.t-h'), cC = $('.t-c'), cap = $('.viz-cap'), playB = $('.play');
    const bohr = $('.f09-dg-bohr'), hald = $('.f09-dg-hald'), d4 = $('.f09-dg-su.d4');
    const sts = [...el.querySelectorAll('.f09-dg-st')], lis = [...el.querySelectorAll('.f09-dg-l button')];
    let t = RM ? tDur(5) + 2.4 : 0, run = !RM, last = '';
    const draw = () => {
      const tc = ((t % CYC) + CYC) % CYC, p = PL.find((q) => tc >= q.t0 && tc < q.t1) || PL[0];
      const u = p.tip === 'dur' ? p.u : lerp(p.u0, p.u1, ease((tc - p.t0) / (p.t1 - p.t0)));
      const [rx, ry] = yer(u);
      rbc.setAttribute('cx', rx.toFixed(1)); rbc.setAttribute('cy', ry.toFixed(1));
      // olay ilerlemeleri (döngü başında: venöz kan, 4. alt birim deoksi, H⁺ ve CO₂ bağlı)
      const a1 = ev(tc, 0), a2 = ev(tc, 1), d1 = ev(tc, 3), d2 = ev(tc, 4), d3 = ev(tc, 5);
      // O₂: alveolden 4. alt birime (1), oradan dokuya (5)
      if (d2 > 0) setPos(cO2, lerp(H4[0], 214, d2), lerp(H4[1] - 4, 300, d2), 1 - ease((tc - tDur(4) - 1.6) / 0.8));
      else setPos(cO2, lerp(120, H4[0], a1), lerp(46, H4[1] - 4, a1), clamp(0.35 + a1 * 2, 0, 1));
      // akciğerde (2): CO₂ 4. alt birimden alveole geçer; H⁺ alveole geçmez, Hb'den ayrılıp kanda HCO₃⁻ ile birleşir (kanda kaybolur)
      // dokuda: ikisi de belirir (4) ve 4. alt birime bağlanır (6)
      const cik = (n, yy, x2, ust) => {
        if (d3 > 0 || d1 > 0) setPos(n, lerp(x2, yy[0], d3), lerp(300, yy[1], d3), d1);
        else setPos(n, lerp(yy[0], ust[0], a2), lerp(yy[1], ust[1], a2), 1 - ease((tc - tDur(1) - 1.4) / 0.8));
      };
      cik(cH, yH, 156, [252, 124]); cik(cC, yC, 106, [106, 46]);
      const durak = p.tip === 'dur' ? p.i : -1;
      const so2 = d2 > 0.5 ? 75 : a1 > 0.5 ? 97 : 75;
      rbc.classList.toggle('ven', so2 < 90);
      d4.classList.toggle('deoksi', so2 < 90);
      bohr.classList.toggle('on', durak === 2 || durak === 4);
      hald.classList.toggle('on', durak === 1 || durak === 5);
      bohr.querySelector('text').textContent = durak === 2 ? 'Bohr tersine: O₂ afinitesi ↑' : durak === 4 ? 'Bohr: P₅₀ ↑, O₂ bırakılır' : 'Bohr etkisi';
      hald.querySelector('text').textContent = durak === 1 ? 'Haldane tersine: H⁺, CO₂ salınır' : durak === 5 ? 'Haldane: deoksiHb H⁺, CO₂ bağlar' : 'Haldane etkisi';
      sts.forEach((n, i) => n.classList.toggle('on', i === durak));
      lis.forEach((b, i) => b.classList.toggle('on', i === (durak >= 0 ? durak : p.i)));
      $('.kan').textContent = durak < 0 && p.i === 2 ? 'arteriyel, dokuya gidiyor' : durak < 0 && p.i === 5 ? 'venöz, akciğere dönüyor' : p.i < 3 ? 'akciğer kapillerinde' : 'doku kapillerinde';
      $('.so2').textContent = '≈ %' + so2;
      playB.textContent = run ? 'Duraklat' : 'Oynat';
      const c = durak >= 0 ? CAP[durak] : p.i === 2 ? '<b>Arteriyel kan dokuya gidiyor.</b> Hb büyük ölçüde oksijenlidir (doygunluk yaklaşık %97). [[K1 s. 30]]' : p.i === 5 ? '<b>Venöz kan akciğere dönüyor.</b> Deoksihemoglobin H⁺ ve CO₂ taşır. [[K1 s. 38]]' : null;
      if (c && c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('[data-i]');
      if (b) { run = false; t = tDur(+b.dataset.i) + 2.4; draw(); return; }
      if (e.target.closest('.play')) { run = !run; draw(); }
    });
    draw();
    return ticker(el, (dt) => { if (!run) return; t += dt; draw(); });
  };

  /* ---------- 3. CO₂ taşınma biçimlerinin payı ---------- */
  VIZ.f09_oran = (el) => {
    const B = [['coz', 'Çözünmüş', R.co2], ['karb', 'Karbamino', 'var(--accent)'], ['bik', 'Bikarbonat', R.hco3]];
    const ART = [5, 5, 90], ILV = [10, 30, 60], TA = 48, TV = 52, DV = TV - TA;
    const mlA = ART.map((p) => (TA * p) / 100), mlI = ILV.map((p) => (DV * p) / 100);
    const BIL = {
      coz: '<b>Çözünmüş CO₂</b> en küçük paydır: arteriyel kanda yaklaşık %5 (karbaminoyla eşit), venöz kanın ilave CO₂\'sinde %10. Miktarı PCO₂ ile orantılıdır (Henry yasası). [[K1 s. 37–39]]',
      karb: '<b>Karbamino bileşikleri</b> arteriyel kanda yaklaşık %5, venöz kanın ilave CO₂\'sinde %30\'dur: deoksihemoglobin karbamino bileşiklerini daha kolay oluşturur (Haldane etkisi). Mutlak miktar ise yalnızca yaklaşık 2,4\'ten 3,6 mL/100 mL\'ye çıkar (Atlas notu, hesap). [[K1 s. 38–39]]',
      bik: '<b>Bikarbonat</b> her iki durumda en büyük paydır: arteriyel kanda yaklaşık %90, venöz kanın ilave CO₂\'sinde %60. [[K1 s. 38–39]]',
    };
    el.innerHTML = `<div class="viz-head"><h3>CO₂ taşınma biçimlerinin payı</h3><div class="seg" role="group" aria-label="Birim"><button type="button" data-g="yuzde" aria-pressed="true">Yüzde</button><button type="button" data-g="ml" aria-pressed="false">mL/100 mL kan</button></div></div>
      <div class="f09-or"></div>
      <div class="f09-or-lej">${B.map(([k, a, c]) => `<button type="button" data-k="${k}" style="--c:${c}" aria-pressed="false"><i></i>${a}</button>`).join('')}</div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Yüzdeler kitaptaki yaklaşık değerlerdir [[K1 s. 39]]. mL değerleri, arteriyel yüzdelerin arteriyel içeriğe (48 mL/100 mL), ilave CO₂ yüzdelerinin a–v̄ farkına (52 − 48 = 4 mL/100 mL) uygulanmasıyla hesaplanmıştır; yuvarlanmış, eğitim amaçlıdır. Taralı kısım venöz kanın ilave CO₂\'sidir.')}</p>`;
    const kap = el.querySelector('.f09-or'), cap = el.querySelector('.viz-cap');
    let g = 'yuzde', sec = null;
    const satir = (ad, top, parts, alt) => `<div class="f09-or-r"><div class="f09-or-h"><b>${ad}</b><span>${top}</span></div><div class="f09-or-bar">${parts}</div><div class="f09-or-alt">${alt}</div></div>`;
    const ciz = () => {
      el.querySelectorAll('[data-g]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === g)));
      el.querySelectorAll('[data-k]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === sec)));
      const seg = (k, c, w, ek) => `<span class="f09-or-s${sec && sec !== k ? ' sol' : ''}" data-k="${k}" style="--c:${c};width:${w.toFixed(2)}%">${ek ? `<em style="width:${ek.toFixed(1)}%"></em>` : ''}</span>`;
      if (g === 'yuzde') {
        kap.innerHTML = satir('Arteriyel kan', 'toplam CO₂ = %100', B.map(([k, , c], i) => seg(k, c, ART[i])).join(''), B.map(([, a], i) => `${a} %${ART[i]}`).join(' · '))
          + satir('Venöz kanın ilave CO₂\'si', 'a–v̄ farkı = %100', B.map(([k, , c], i) => seg(k, c, ILV[i])).join(''), B.map(([, a], i) => `${a} %${ILV[i]}`).join(' · '));
      } else {
        const V = mlA.map((v, i) => v + mlI[i]);
        kap.innerHTML = satir('Arteriyel kan', `${TA} mL/100 mL`, B.map(([k, , c], i) => seg(k, c, (mlA[i] / TV) * 100)).join(''), B.map(([, a], i) => `${a} ${fmt(mlA[i])}`).join(' · '))
          + satir('Miks venöz kan', `${TV} mL/100 mL`, B.map(([k, , c], i) => seg(k, c, (V[i] / TV) * 100, (mlI[i] / V[i]) * 100)).join(''), B.map(([, a], i) => `${a} ${fmt(V[i])}`).join(' · '));
      }
      const c = sec ? BIL[sec] : g === 'yuzde'
        ? '<b>İki satırı karşılaştırın.</b> Arteriyel kanda CO₂\'nin %90\'ı bikarbonattır. Venöz kanın taşıdığı ilave CO₂\'de bikarbonat yine en büyük paydır, ama karbamino payı %5\'ten %30\'a, yani altı katına çıkar. [[K1 s. 38–39]] Bir biçime basın.'
        : '<b>Mutlak miktarlar.</b> Venöz kan arteriyel kandan yalnızca yaklaşık 4 mL/100 mL fazla CO₂ taşır (52\'ye karşı 48) [[K1 s. 39]]. Bu ilave kısmın %30\'u karbamino olduğu için karbamino CO₂ 2,4\'ten 3,6 mL/100 mL\'ye çıkar: yaklaşık 1,5 kat (Atlas notu, hesap).';
      cap.innerHTML = REF(c);
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('[data-g]'); if (b) { g = b.dataset.g; ciz(); return; }
      const k = e.target.closest('[data-k]'); if (k) { sec = sec === k.dataset.k ? null : k.dataset.k; ciz(); }
    });
    ciz();
    return () => {};
  };

  /* ---------- 4. CO₂ ayrışma eğrisi ---------- */
  // Şematik model (mL CO₂/100 mL kan; PCO₂ kPa): çözünmüş 0,51·P + bağlı [a·P/(P+K) + b·P], bağlı kısım deoksijenlenmeyle artar.
  // Katsayılar, eğriler kitaptaki iki noktadan geçecek biçimde seçildi: SO₂ %97'de 5,3 kPa → 48; SO₂ %75'te 6,1 kPa → 52 [K1 s. 39].
  const CZ = 0.51, KA = 52.84, KK = 1.5, KB = 0.776, ETA = 0.169;
  const bagli = (P) => (KA * P) / (P + KK) + KB * P;
  const icerik = (P, S) => CZ * P + (bagli(P) * (1 + ETA * (1 - S))) / (1 + ETA * 0.03);
  VIZ.f09_egri = (el) => {
    const KAN = [['a', 'Arteriyel', 0.97, 'var(--crit)'], ['v', 'Miks venöz', 0.75, 'var(--c-basic)'], ['d', 'Tam deoksijenli', 0, 'var(--c-basic)']];
    const GOR = { tum: { p0: 0, p1: 15, c0: 0, c1: 80, px: [0, 5, 10, 15], cy: [0, 20, 40, 60, 80], min: 0.5 }, fiz: { p0: 4, p1: 8, c0: 40, c1: 60, px: [4, 5, 6, 7, 8], cy: [40, 45, 50, 55, 60], min: 4 } };
    const X0 = 54, X1 = 404, Y0 = 268, Y1 = 18;
    el.innerHTML = `<div class="f09-eg"><div>
        <svg class="f09-svg f09-eg-svg" viewBox="0 0 420 320" role="img" aria-label="CO₂ ayrışma eğrisi: PCO₂ ile kanın CO₂ içeriği; arteriyel, miks venöz ve tam deoksijenli kan">
          <defs><clipPath id="f09-eg-kirp"><rect x="${X0}" y="${Y1}" width="${X1 - X0}" height="${Y0 - Y1}"/></clipPath></defs>
          <rect x="${X0}" y="${Y1}" width="${X1 - X0}" height="${Y0 - Y1}" fill="var(--bg)" stroke="var(--line)"/>
          <g class="f09-eg-grid"></g>
          <g clip-path="url(#f09-eg-kirp)">
            <path class="f09-eg-coz"/>
            <path class="f09-eg-c" data-k="d"/><path class="f09-eg-c" data-k="v"/><path class="f09-eg-c" data-k="a"/>
            <line class="f09-eg-av"/>
            <line class="f09-eg-ix"/><line class="f09-eg-iy"/>
          </g>
          <g class="f09-eg-pt"></g>
          <circle class="f09-eg-dot" r="6"/>
          <text class="f09-eg-ax" x="${(X0 + X1) / 2}" y="306" text-anchor="middle">PCO₂ (kPa)</text>
          <text class="f09-eg-ax" transform="translate(14 ${(Y0 + Y1) / 2}) rotate(-90)" text-anchor="middle">CO₂ içeriği (mL/100 mL kan)</text>
          <text class="f09-eg-cl f09-eg-cozl" text-anchor="end">çözünmüş</text>
        </svg>
        <div class="f09-lej"><span><i style="background:var(--crit)"></i>arteriyel · SO₂ %97</span><span><i style="background:var(--c-basic)"></i>miks venöz · %75</span><span><i class="kesik" style="border-color:var(--c-basic)"></i>tam deoksijenli · %0 (model)</span><span><i class="alan"></i>çözünmüş CO₂</span><span><i class="kesik" style="border-color:var(--accent)"></i>a → v̄ yolu (fizyolojik aralıkta)</span></div></div>
        <div class="f09-eg-pan">
          <div class="f09-eg-oku"></div>
          <label class="f09-eg-r"><span>PCO₂</span><input type="range" step="0.1" aria-label="PCO₂ (kPa)"><b class="f09-eg-pv"></b></label>
          <div class="seg" role="group" aria-label="Kan">${KAN.map(([k, a, s]) => `<button type="button" data-kan="${k}" aria-pressed="false">${a} · %${Math.round(s * 100)}</button>`).join('')}</div>
          <div class="seg" role="group" aria-label="Görünüm"><button type="button" data-gor="tum" aria-pressed="true">Tüm eğri</button><button type="button" data-gor="fiz" aria-pressed="false">Fizyolojik aralık</button></div>
          <div class="btn-row"><button type="button" class="btn ghost" data-nok="a">a noktası</button><button type="button" class="btn ghost" data-nok="v">v̄ noktası</button></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model. Çözünmüş CO₂ = 0,51 mL/100 mL/kPa × PCO₂ (Henry yasası; Atlas notu: plazmada CO₂ çözünürlüğü yaklaşık 0,23 mmol/L/kPa). Bağlı CO₂ (bikarbonat ve karbamino) kitaptaki iki noktadan geçecek biçimde ayarlanmış bir eğridir: 5,3 kPa → 48 ve 6,1 kPa → 52 mL/100 mL [[K1 s. 39]]. Tam deoksijenli eğri ve öteki değerler yaklaşıktır; doygunlukların kaynağı [[K1 s. 30]].')}</p>`;
    const $ = (s) => el.querySelector(s);
    const rng = $('input[type=range]'), oku = $('.f09-eg-oku'), cap = $('.viz-cap'), dot = $('.f09-eg-dot');
    let gor = 'tum', kan = 'a', P = 5.3, last = '';
    const G = () => GOR[gor];
    const X = (p) => X0 + ((p - G().p0) / (G().p1 - G().p0)) * (X1 - X0), Y = (c) => Y0 - ((c - G().c0) / (G().c1 - G().c0)) * (Y0 - Y1);
    const yol = (fn) => { const g = G(), n = 90; let d = ''; for (let i = 0; i <= n; i++) { const p = g.p0 + ((g.p1 - g.p0) * i) / n || 0.0001; d += (i ? 'L' : 'M') + X(p).toFixed(1) + ' ' + Y(fn(p)).toFixed(1); } return d; };
    const kur = () => {
      const g = G();
      $('.f09-eg-grid').innerHTML = g.px.map((p) => `<line x1="${X(p)}" x2="${X(p)}" y1="${Y1}" y2="${Y0}"/><text x="${X(p)}" y="${Y0 + 16}" text-anchor="middle">${p}</text>`).join('')
        + g.cy.map((c) => `<line x1="${X0}" x2="${X1}" y1="${Y(c)}" y2="${Y(c)}"/><text x="${X0 - 6}" y="${Y(c) + 4}" text-anchor="end">${c}</text>`).join('');
      KAN.forEach(([k, , s, c]) => { const n = el.querySelector(`.f09-eg-c[data-k="${k}"]`); n.setAttribute('d', yol((p) => icerik(p, s))); n.style.stroke = c; n.classList.toggle('kesik', k === 'd'); });
      const cz = yol((p) => CZ * p); $('.f09-eg-coz').setAttribute('d', cz + `L${X(g.p1)} ${Y0}L${X(g.p0)} ${Y0}Z`);
      const cl = $('.f09-eg-cozl'); cl.setAttribute('x', X(14.6)); cl.setAttribute('y', Y(CZ * 14.6) - 6); cl.setAttribute('opacity', gor === 'tum' ? 1 : 0);
      const av = $('.f09-eg-av'); av.setAttribute('x1', X(5.3)); av.setAttribute('y1', Y(48)); av.setAttribute('x2', X(6.1)); av.setAttribute('y2', Y(52)); av.setAttribute('opacity', gor === 'fiz' ? 1 : 0);
      // nokta etiketleri eğrilerin boş bıraktığı köşelere, kılavuz çizgiyle
      const lab = gor === 'tum' ? [[5.3, 48, 'a · 5,3 kPa / 48', 9.2, 30], [6.1, 52, 'v̄ · 6,1 kPa / 52', 0.6, 72]] : [[5.3, 48, 'a · 5,3 kPa / 48', 6.5, 42.5], [6.1, 52, 'v̄ · 6,1 kPa / 52', 4.1, 58.4]];
      $('.f09-eg-pt').innerHTML = lab.map(([p, c, t, lx, ly]) => `<line class="f09-eg-kl" x1="${X(p)}" y1="${Y(c)}" x2="${X(lx) + (lx > p ? -4 : 60)}" y2="${Y(ly) + (ly > c ? 4 : -12)}"/><circle cx="${X(p)}" cy="${Y(c)}" r="4.5"/><text x="${X(lx)}" y="${Y(ly)}">${t}</text>`).join('')
        + (gor === 'tum'
          ? `<text class="f09-eg-cl" x="${X(13.6)}" y="${Y(icerik(13.6, 0)) - 8}" text-anchor="end" style="fill:var(--c-basic)">tam deoksijenli</text><text class="f09-eg-cl" x="${X(14.8)}" y="${Y(icerik(7.6, 0.97)) + 16}" text-anchor="end" style="fill:var(--crit)">arteriyel (oksijenli)</text>`
          : `<text class="f09-eg-cl" x="${X(7.9)}" y="${Y(icerik(7.9, 0.75)) - 8}" text-anchor="end" style="fill:var(--c-basic)">miks venöz</text><text class="f09-eg-cl" x="${X(7.9)}" y="${Y(icerik(7.9, 0.97)) + 18}" text-anchor="end" style="fill:var(--crit)">arteriyel</text>`);
      rng.min = g.min; rng.max = g.p1; P = clamp(P, g.min, g.p1); rng.value = P;
      el.querySelectorAll('[data-gor]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.gor === gor)));
    };
    const ciz = () => {
      const K = KAN.find((q) => q[0] === kan), S = K[2], C = icerik(P, S), cz = CZ * P, Ca = icerik(P, 0.97);
      el.querySelectorAll('.f09-eg-c').forEach((n) => n.classList.toggle('on', n.dataset.k === kan));
      el.querySelectorAll('[data-kan]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.kan === kan)));
      dot.setAttribute('cx', X(P)); dot.setAttribute('cy', Y(C)); dot.style.fill = K[3];
      const ix = $('.f09-eg-ix'), iy = $('.f09-eg-iy');
      ix.setAttribute('x1', X(P)); ix.setAttribute('x2', X(P)); ix.setAttribute('y1', Y(C)); ix.setAttribute('y2', Y0);
      iy.setAttribute('x1', X0); iy.setAttribute('x2', X(P)); iy.setAttribute('y1', Y(C)); iy.setAttribute('y2', Y(C));
      $('.f09-eg-pv').textContent = fmt(P) + ' kPa';
      oku.innerHTML = `<span><b>${fmt(C)}</b> mL/100 mL CO₂ içeriği</span><span><b>${fmt(cz)}</b> çözünmüş (%${fmt((cz / C) * 100)})</span><span><b>${fmt(C - cz)}</b> bağlı (bikarbonat + karbamino)</span>${kan !== 'a' ? `<span><b>+${fmt(C - Ca)}</b> aynı PCO₂'de arteriyel kana göre</span>` : ''}`;
      const yak = (p, k) => Math.abs(P - p) < 0.06 && kan === k;
      let c;
      if (yak(5.3, 'a')) c = '<b>a noktası.</b> Arteriyel kanda tipik PCO₂ 5,3 kPa, CO₂ içeriği 48 mL/100 mL. Bunun yalnızca yaklaşık %5\'i çözünmüş hâldedir. [[K1 s. 39]]';
      else if (yak(6.1, 'v')) c = '<b>v̄ noktası.</b> Miks venöz kanda PCO₂ 6,1 kPa, CO₂ içeriği 52 mL/100 mL. Venöz kan daha deoksijenli olduğu için üst eğridedir: Haldane etkisi. [[K1 s. 39]]';
      else if (gor === 'fiz') c = '<b>Fizyolojik aralık.</b> Bu aralıkta eğriler hemen hemen doğrusaldır [[K1 s. 39]]. a\'dan v̄\'ye giden yol (kesikli çizgi) iki eğriden de diktir: kan hem PCO₂ kazanır hem deoksijenlenip üst eğriye geçer (Atlas notu).';
      else if (P > 9) c = `<b>Yüksek PCO₂.</b> İçerik artmaya devam eder ve bir platoya ulaşmaz; plazmada çözünmüş CO₂\'nin payı büyür (5,3 kPa\'da yaklaşık %${fmt((CZ * 5.3 / icerik(5.3, S)) * 100)}, burada %${fmt((cz / C) * 100)}). [[K1 s. 39]]`;
      else if (kan === 'd') c = '<b>Tam deoksijenli kan</b> aynı PCO₂\'de en çok CO₂\'yi taşır: deoksihemoglobin karbamino bileşiklerini daha kolay oluşturur ve daha çok H⁺ bağlar. Bu eğri modelin uç durumudur. [[K1 s. 38]]';
      else c = '<b>Eksenlere dikkat.</b> Bu eğri kanın CO₂ içeriğini gösterir; oksihemoglobin ayrışma eğrisi ise PO₂ ile Hb doygunluğunu ilişkilendirir. Üst eğri deoksijenli, alt eğri oksijenli kandır. [[K1 s. 39]]';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    rng.addEventListener('input', () => { P = +rng.value; ciz(); });
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const k = e.target.closest('[data-kan]'); if (k) { kan = k.dataset.kan; ciz(); return; }
      const g = e.target.closest('[data-gor]'); if (g) { gor = g.dataset.gor; kur(); ciz(); return; }
      const n = e.target.closest('[data-nok]'); if (n) { kan = n.dataset.nok; P = kan === 'a' ? 5.3 : 6.1; rng.value = P; ciz(); }
    });
    kur(); ciz();
    return () => {};
  };

  /* ---------- 5. Klinik: apnede PaCO₂ ve O₂ deposu ---------- */
  VIZ.f09_apne = (el) => {
    const X0 = 46, X1 = 404, Y0 = 212, Y1 = 14, TM = 5, PMIN = 4, PMAX = 11, PA0 = 5.3;
    const X = (t) => X0 + (t / TM) * (X1 - X0), Y = (p) => Y0 - ((p - PMIN) / (PMAX - PMIN)) * (Y0 - Y1);
    const MOD = { oda: { depo: 1550, ad: 'Oda havası' }, pre: { depo: 3000, ad: 'Preoksijenasyon sonrası' } };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Apneden önce"><button type="button" data-m="oda" aria-pressed="true">Oda havası</button><button type="button" data-m="pre" aria-pressed="false">Preoksijenasyon sonrası</button></div><button type="button" class="btn play">Apneyi başlat</button></div>
      <div class="f09-ap">
        <svg class="f09-svg f09-ap-svg" viewBox="0 0 420 250" role="img" aria-label="Apnede PaCO₂'nin zamanla yükselişi">
          <rect x="${X0}" y="${Y1}" width="${X1 - X0}" height="${Y0 - Y1}" fill="var(--bg)" stroke="var(--line)"/>
          ${[0, 1, 2, 3, 4, 5].map((t) => `<line class="f09-ap-g" x1="${X(t)}" x2="${X(t)}" y1="${Y1}" y2="${Y0}"/><text class="f09-ap-ax" x="${X(t)}" y="${Y0 + 16}" text-anchor="middle">${t}</text>`).join('')}
          ${[4, 6, 8, 10].map((p) => `<text class="f09-ap-ax" x="${X0 - 6}" y="${Y(p) + 4}" text-anchor="end">${p}</text>`).join('')}
          <line class="f09-ap-10" x1="${X0}" x2="${X1}" y1="${Y(10)}" y2="${Y(10)}"/><text class="f09-ap-10l" x="${X(2.5)}" y="${Y(10) - 6}" text-anchor="middle">10 kPa</text>
          <polygon class="f09-ap-band" points="${X(0)},${Y(PA0)} ${X(5)},${Y(PA0 + 2)} ${X(5)},${Y(PA0 + 4)}"/>
          <text class="f09-ap-bl" x="${X(4.55)}" y="${Y(PA0 + 2.8) + 4}" text-anchor="end">0,4–0,8 kPa/dk</text>
          <polyline class="f09-ap-l"/>
          <g class="f09-ap-kit"><circle cx="${X(5)}" cy="${Y(10)}" r="6"/><text x="${X(5) - 10}" y="${Y(10) + 18}" text-anchor="end">kitap: 5. dk'da ≈ 10 kPa</text></g>
          <circle class="f09-ap-dot" r="5.5"/>
          <text class="f09-ap-ax" x="${(X0 + X1) / 2}" y="244" text-anchor="middle">apne süresi (dk)</text>
          <text class="f09-ap-yl" x="${X0 + 6}" y="${Y1 + 16}">PaCO₂ (kPa)</text>
        </svg>
        <div class="f09-ap-pan">
          <div class="f09-ap-oku"></div>
          <div class="f09-ap-depo"><span>O₂ deposu (akciğer + dolaşım)</span><span class="trk"><i></i></span><b></b></div>
          <div class="f09-ap-nok"></div>
          <label class="f09-eg-r"><span>Hız</span><input type="range" data-r="hiz" min="0.4" max="0.8" step="0.05" value="0.6" aria-label="PaCO₂ artış hızı (kPa/dk)"><b class="f09-ap-hv"></b></label>
          <label class="f09-eg-r"><span>Süre</span><input type="range" data-r="sure" min="0" max="5" step="0.05" value="0" aria-label="Apne süresi (dk)"><b class="f09-ap-sv"></b></label>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Doğrusal yaklaşım: PaCO₂ = 5,3 kPa + hız × süre; hız kitaptaki 0,4–0,8 kPa/dk aralığından seçilir. O₂ deposu çubuğu yalnızca başlangıç deposundan dakikada 250 mL çıkarılmasıdır; preoksijenasyonda kitaptaki alt sınır (3 L) kullanıldı. SaO₂\'nin seyri bu çıkarmayla hesaplanamaz (kitap: düşüş hızı karmaşıktır), bu yüzden yalnızca kitaptaki noktalar gösterilir. [[K1 s. 39]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const hiz = $('[data-r="hiz"]'), sure = $('[data-r="sure"]'), cap = $('.viz-cap'), playB = $('.play');
    let mod = 'oda', t = RM ? TM : 0, run = false, last = '';
    const draw = () => {
      const r = +hiz.value, M = MOD[mod], pa = PA0 + r * t, kalan = M.depo - 250 * t, pre = mod === 'pre';
      $('.f09-ap-l').setAttribute('points', [0, t].map((x) => `${X(x).toFixed(1)},${Y(PA0 + r * x).toFixed(1)}`).join(' '));
      const d = $('.f09-ap-dot'); d.setAttribute('cx', X(t)); d.setAttribute('cy', Y(pa));
      $('.f09-ap-kit').setAttribute('opacity', pre ? 1 : 0);
      $('.f09-ap-hv').textContent = fmt(r, 2) + ' kPa/dk'; $('.f09-ap-sv').textContent = mmss(t);
      sure.value = t;
      $('.f09-ap-oku').innerHTML = `<span><b>${mmss(t)}</b> apne</span><span><b>${fmt(pa)}</b> kPa PaCO₂</span><span><b>${Math.round(250 * t)}</b> mL O₂ tüketildi</span><span><b>${Math.round(200 * t)}</b> mL CO₂ üretildi</span>`;
      $('.f09-ap-depo i').style.width = clamp((kalan / 3200) * 100, 0, 100).toFixed(1) + '%';
      $('.f09-ap-depo b').textContent = (pre ? '≥ ' : '≈ ') + Math.round(kalan) + ' mL';
      const n2 = !pre && t >= 2, n5 = pre && t >= TM - 0.001;
      $('.f09-ap-nok').innerHTML = pre
        ? `<span class="${n5 ? 'on' : ''}">Kitaptaki nokta · 5. dk: SaO₂ hâlâ %100; PaCO₂ 10 kPa'ya yaklaşır</span>`
        : `<span class="${n2 ? 'on' : ''}">Kitaptaki nokta · 2. dk: SaO₂ ≈ %70 (PO₂ 5,0 kPa)</span>`;
      el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mod)));
      playB.textContent = run ? 'Duraklat' : t >= TM ? 'Baştan başlat' : t > 0 ? 'Sürdür' : 'Apneyi başlat';
      let c;
      if (t <= 0.02) c = `<b>${M.ad}: apne başlamak üzere.</b> Bazal süreçler sürecek: dakikada 250 mL O₂ tüketilir, 200 mL CO₂ üretilir. Başlangıç deposu ${pre ? '3 L\'nin üzerinde' : 'yaklaşık 1550 mL'} O₂. [[K1 s. 39]]`;
      else if (!pre && t < 2) c = '<b>Oda havası.</b> PO₂ düşer; düşüş hızı karmaşıktır, Hb konsantrasyonu ve toplam kan hacmi gibi etkenlere bağlıdır. PaCO₂ ise dakikada 0,4–0,8 kPa ile görece yavaş yükselir. [[K1 s. 39]]';
      else if (!pre) c = '<b>2. dakika ve sonrası.</b> Tipik olarak SaO₂ 2. dakikada %70\'e (PO₂ 5,0 kPa) inmiştir [[K1 s. 39]]. Aynı anda PaCO₂, doğrusal hesapla, yalnızca yaklaşık 6,1–6,9 kPa\'dır (5,3 + 2 × 0,4–0,8).';
      else if (t < TM - 0.001) c = '<b>Preoksijenasyon sonrası.</b> FRC\'deki azot O₂ ile yer değiştirdiği için depo 3 L\'nin üzerindedir; SaO₂ korunur. CO₂ üretimi ise aynı hızla sürer. [[K1 s. 39]]';
      else c = '<b>5. dakika.</b> SaO₂ hâlâ %100\'dür, ama PaCO₂ 10 kPa\'ya yaklaşır. Preoksijenasyon hipoksemiyi geciktirir, CO₂ birikimini önlemez. [[K1 s. 39]]';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const m = e.target.closest('[data-m]'); if (m) { mod = m.dataset.m; t = RM ? TM : 0; run = false; draw(); return; }
      if (e.target.closest('.play')) { if (t >= TM) t = 0; run = !run && !RM; if (RM) t = TM; draw(); }
    });
    hiz.addEventListener('input', draw);
    sure.addEventListener('input', () => { t = +sure.value; run = false; draw(); });
    draw();
    return ticker(el, (dt) => { if (!run) return; t = Math.min(TM, t + dt * (TM / 12)); if (t >= TM) run = false; draw(); });
  };
})();
