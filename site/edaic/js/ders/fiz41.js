/* Bölüm 41 · Valsalva manevrası · bileşenler (tarif: docs/tasarim/fiz41.md; K1 s. 175–177).
   Eğriler şematiktir: eksen aralıkları, olayların yönü ve sırası kitaptandır; ara değerler temsilîdir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const yak = (cur, hedef, dt, sure) => (RM ? hedef : cur + (hedef - cur) * Math.min(1, dt / (sure / 4)));
  const f1 = (v) => String(Math.round(v));
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capYaz = (el, t) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c && c.dataset.son !== t) { c.dataset.son = t; c.innerHTML = REF(t); } };
  // dar / geniş yerleşim izleyicisi
  function genislik(el, cb) {
    let dar = el.clientWidth < 560;
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { const d = el.clientWidth < 560; if (d !== dar) { dar = d; cb(dar); } }) : null;
    if (ro) ro.observe(el);
    return { dar: () => dar, kapat: () => ro && ro.disconnect() };
  }

  /* ---------- ortak eğri verisi ---------- */
  const TT = [0, 3, 4, 5, 7, 13, 14.5, 17, 19, 23, 26, 30];
  const VERI41 = {
    normal: { map: [90, 90, 102, 97, 82, 88, 76, 95, 108, 94, 90, 90], hr: [70, 70, 64, 66, 72, 84, 88, 82, 56, 66, 70, 70] },
    otonom: { map: [90, 90, 102, 97, 84, 72, 70, 80, 87, 90, 90, 90], hr: [70, 70, 70, 70, 71, 71, 71, 70, 70, 70, 70, 70] },
    kare: { map: [90, 90, 104, 104, 104, 104, 91, 90, 90, 90, 90, 90], hr: [70, 70, 69, 69, 70, 71, 71, 70, 70, 70, 70, 70] },
  };
  // monoton kübik (Fritsch–Carlson) ara değer
  function monoton(xs, ys) {
    const n = xs.length, d = [], m = new Array(n);
    for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
      const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { const k = 3 / Math.sqrt(s); m[i] = k * a * d[i]; m[i + 1] = k * b * d[i]; }
    }
    return (x) => {
      x = clamp(x, xs[0], xs[n - 1]);
      let i = 0; while (i < n - 2 && x > xs[i + 1]) i++;
      const h = xs[i + 1] - xs[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
    };
  }
  const EGRI = {};
  Object.keys(VERI41).forEach((k) => { EGRI[k] = { map: monoton(TT, VERI41[k].map), hr: monoton(TT, VERI41[k].hr) }; });
  const BANT = [[3, 5], [5, 13], [13, 15], [15, 23]];

  // ortak grafik: iki şerit (MAP üstte, HR altta), zaman 0–30 s
  function grafik(G) {
    const { x0, x1, mT, mB, hT, hB } = G;
    const X = (t) => x0 + ((x1 - x0) * t) / 30, YM = (v) => mB - ((v - 70) / 40) * (mB - mT), YH = (v) => hB - ((v - 50) / 40) * (hB - hT);
    let s = '';
    BANT.forEach(([a, b], i) => { s += `<rect class="f41-bant${i % 2 ? '' : ' f41-bant-c'}" data-bant="${i + 1}" x="${X(a)}" y="${mT}" width="${X(b) - X(a)}" height="${hB - mT}"/>`; });
    for (let v = 70; v <= 110; v += 10) s += `<line class="f41-izgara" x1="${x0}" x2="${x1}" y1="${YM(v)}" y2="${YM(v)}"/><text class="f41-tk" x="${x0 - 5}" y="${YM(v) + 4}" text-anchor="end">${v}</text>`;
    for (let v = 50; v <= 90; v += 10) s += `<line class="f41-izgara" x1="${x0}" x2="${x1}" y1="${YH(v)}" y2="${YH(v)}"/><text class="f41-tk" x="${x0 - 5}" y="${YH(v) + 4}" text-anchor="end">${v}</text>`;
    for (let t = 0; t <= 30; t += 5) s += `<line class="f41-eksen" x1="${X(t)}" x2="${X(t)}" y1="${hB}" y2="${hB + 4}"/><text class="f41-tk" x="${X(t)}" y="${hB + 17}" text-anchor="${t === 30 ? 'end' : 'middle'}">${t === 30 ? '30 s' : t}</text>`;
    s += `<line class="f41-eksen" x1="${x0}" x2="${x1}" y1="${hB}" y2="${hB}"/>`;
    s += `<text class="f41-st f41-st-m" x="${x1 - 4}" y="${mB - 5}" text-anchor="end">MAP · mmHg</text><text class="f41-st f41-st-h" x="${x1 - 4}" y="${hB - 5}" text-anchor="end">HR · atım/dk</text>`;
    s += `<line class="f41-kesik" x1="${X(3)}" x2="${X(3)}" y1="${mT - 46}" y2="${hB}"/><line class="f41-kesik" x1="${X(13)}" x2="${X(13)}" y1="${mT - 32}" y2="${hB}"/>`;
    s += `<text class="f41-ct" x="${X(3) + 4}" y="${mT - 36}">40 cmH₂O uygulandı</text><text class="f41-ct" x="${X(13) + 4}" y="${mT - 22}">Basınç bırakıldı</text>`;
    s += `<text class="f41-tk" x="${x0 - 5}" y="${mT - 6}" text-anchor="end">Evre</text>`;
    BANT.forEach(([a, b], i) => { s += `<text class="f41-evno" data-evno="${i + 1}" x="${X((a + b) / 2)}" y="${mT - 6}" text-anchor="middle">${i + 1}</text>`; });
    const yol = (fn, Y, tEnd) => { let d = ''; const n = Math.max(1, Math.round(tEnd / 0.1)); for (let i = 0; i <= n; i++) { const t = (tEnd * i) / n; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(fn(t)).toFixed(1); } return d; };
    return { s, X, YM, YH, yol };
  }

  /* ---------- 1 · Uyanık, entübe ve laringeal maskeli hastada manevra ---------- */
  VIZ.f41_uygula = (el) => {
    const CAP = {
      uyanik: '<b>Uyanık hasta.</b> Ağız ve burun kapalıyken zorla nefes vermeye çalışır; anlatmak zorsa şırınganın pistonunu üfleyerek çıkarması istenir. Bir yöntem seçip başlatın. [[K1 s. 175]]',
      tamam: '<b>Hedef sağlandı.</b> İntratorasik basınç ≈ 40 cmH₂O\'da 10 s tutuldu. [[K1 s. 175]]',
      entube: '<b>Anestezili, entübe hasta.</b> Devrenin ayarlanabilir basınç sınırlayıcı (APL) valfi kapatılır, hava yolu basıncı 40 cmH₂O\'ya çıkarılıp 10 s tutulur. [[K1 s. 175]]',
      lma: '<b>Laringeal maske.</b> 20 cmH₂O üzerinde kaçırmaya yatkındır; 40 cmH₂O sağlanamaz, manevra pratikte yalnız entübe hastada yapılabilir. [[K1 s. 175]]',
    };
    let mod = 'uyanik', faz = 'bekle', p = 0, sure = 0, ft = 0, sim = 0;
    el.innerHTML = `<div class="f41-ctl">${segHtml('Yöntem', 'm', [['uyanik', 'Uyanık'], ['entube', 'Anestezili · entübe'], ['lma', 'Anestezili · laringeal maske']], mod)}
      <button type="button" class="btn" data-a="bas">Manevrayı başlat</button></div><div class="f41-sv"></div>`;
    const kutu = el.querySelector('.f41-sv'), btn = el.querySelector('[data-a="bas"]');
    let E = {};
    const W = genislik(el, () => ciz());
    function sahne() {
      const uy = `<g data-sh="uyanik">
        <rect class="f41-deri" x="30" y="104" width="120" height="128" rx="22"/>
        <rect class="f41-deri" x="74" y="80" width="30" height="30"/>
        <circle class="f41-deri" cx="90" cy="52" r="34"/>
        <path class="f41-deri" d="M121 40 L137 58 L122 63 Z"/>
        <ellipse class="f41-akc" cx="70" cy="164" rx="25" ry="44"/><ellipse class="f41-akc" cx="112" cy="164" rx="25" ry="44"/>
        <path class="f41-hy" d="M118 68 L96 82 L91 124"/>
        <line class="f41-glotis" x1="84" y1="96" x2="100" y2="96"/>
        <rect class="f41-parmak" x="122" y="32" width="24" height="9" rx="4"/><rect class="f41-parmak" x="124" y="62" width="24" height="9" rx="4"/>
        <line class="f41-dudak" x1="108" y1="76" x2="123" y2="76"/>
        <text class="f41-t" x="152" y="30">burun sıkılır</text>
        <text class="f41-t" x="152" y="82">ağız kapalı</text>
        <line class="f41-lider" x1="102" y1="97" x2="148" y2="104"/><text class="f41-t f41-t-w" x="152" y="108">kapalı glotis</text>
        <text class="f41-pt" x="91" y="224" text-anchor="middle" data-o="pt"></text>
        <g class="f41-ek"><rect class="f41-ek-k" x="164" y="124" width="134" height="114" rx="10"/>
          <path class="f41-ok-y" d="M172 150 L184 150" marker-end="url(#f41-uc)"/>
          <rect class="f41-sir" x="190" y="142" width="64" height="16" rx="3"/><path class="f41-sir" d="M186 147 L190 147 L190 153 L186 153 Z"/>
          <g data-o="piston"><rect class="f41-pis" x="244" y="144" width="6" height="12"/><line class="f41-pis-c" x1="250" y1="150" x2="276" y2="150"/><rect class="f41-pis" x="276" y="141" width="5" height="18" rx="2"/></g>
          <text class="f41-tk" x="222" y="138" text-anchor="middle">10 mL</text>
          <text class="f41-t" x="231" y="180" text-anchor="middle">Alternatif:</text>
          <text class="f41-t" x="231" y="196" text-anchor="middle">şırınga pistonunu</text>
          <text class="f41-t" x="231" y="212" text-anchor="middle">üfleyerek çıkarmaya</text>
          <text class="f41-t" x="231" y="228" text-anchor="middle">çalışmak</text></g></g>`;
      const devre = (lma) => `<g data-sh="${lma ? 'lma' : 'entube'}">
        <rect class="f41-deri" x="70" y="128" width="222" height="52" rx="22"/>
        <circle class="f41-deri" cx="46" cy="152" r="26"/>
        <ellipse class="f41-akc" cx="124" cy="154" rx="40" ry="17"/>
        ${lma ? '<path class="f41-tup" d="M30 70 L30 124 Q30 148 50 151"/><ellipse class="f41-lma" cx="60" cy="152" rx="13" ry="8"/>' : '<path class="f41-tup" d="M96 152 L62 152 Q30 152 30 124 L30 70"/><ellipse class="f41-kaf" cx="80" cy="152" rx="5" ry="7"/>'}
        <path class="f41-devre" d="M30 70 L232 70"/>
        <g data-o="apl"><line class="f41-apl-k" x1="160" y1="58" x2="160" y2="46"/><circle class="f41-apl" cx="160" cy="70" r="11"/><line class="f41-apl-i" data-o="apli" x1="152" y1="70" x2="168" y2="70"/></g>
        <text class="f41-t" data-o="aplt" x="160" y="38" text-anchor="middle">APL valfi: açık</text>
        <ellipse class="f41-balon" data-o="balon" cx="262" cy="70" rx="30" ry="22"/>
        <text class="f41-t" x="262" y="110" text-anchor="middle">Rezervuar balon</text>
        <text class="f41-t" x="38" y="102">${lma ? 'Laringeal maske' : 'Endotrakeal tüp'}</text>
        <text class="f41-pt" x="124" y="206" text-anchor="middle" data-o="pt"></text>
        ${lma ? '<g data-o="kacak"></g><text class="f41-t f41-t-w" data-o="kact" x="4" y="214">Kaçak</text>' : ''}</g>`;
      return uy + devre(false) + devre(true);
    }
    function ciz() {
      const dar = W.dar();
      const vb = dar ? '0 0 360 420' : '0 0 560 260';
      let g = '';
      if (dar) {
        const X = (v) => 30 + v * 6;
        g = `<text class="f41-b" data-o="bt" x="30" y="276">Basınç: 0 cmH₂O</text>
          <rect class="f41-gz" x="30" y="286" width="300" height="24" rx="4"/>
          <rect class="f41-hedef" x="${X(38)}" y="282" width="${X(42) - X(38)}" height="32"/>
          <rect class="f41-dolgu" data-o="dol" x="30" y="286" height="24" width="0" rx="4"/>
          ${[0, 10, 20, 30, 40, 50].map((v) => `<line class="f41-eksen" x1="${X(v)}" x2="${X(v)}" y1="310" y2="316"/><text class="f41-tk" x="${X(v)}" y="329" text-anchor="middle">${v}</text>`).join('')}
          <text class="f41-t f41-t-ok" x="${X(40)}" y="346" text-anchor="middle">hedef ≈ 40 cmH₂O</text>
          <g data-o="lmaz"><line class="f41-sinir" x1="${X(20)}" x2="${X(20)}" y1="278" y2="318"/><text class="f41-t f41-t-w" x="${X(20)}" y="362" text-anchor="middle">LMA kaçak sınırı 20 cmH₂O</text></g>
          <text class="f41-sayac" data-o="say" x="180" y="390" text-anchor="middle">Süre: 0 / 10 s</text>
          <text class="f41-b f41-t-w" data-o="dur" x="180" y="412" text-anchor="middle"></text>`;
      } else {
        const Y = (v) => 206 - v * 3.4;
        g = `<text class="f41-b" data-o="bt" x="399" y="22" text-anchor="middle">Basınç: 0 cmH₂O</text>
          <rect class="f41-gz" x="384" y="36" width="30" height="170" rx="4"/>
          <rect class="f41-hedef" x="378" y="${Y(42)}" width="42" height="${Y(38) - Y(42)}"/>
          <rect class="f41-dolgu" data-o="dol" x="384" y="206" width="30" height="0" rx="4"/>
          ${[0, 10, 20, 30, 40, 50].map((v) => `<line class="f41-eksen" x1="378" x2="384" y1="${Y(v)}" y2="${Y(v)}"/><text class="f41-tk" x="374" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join('')}
          <text class="f41-t f41-t-ok" x="426" y="${Y(40) + 4}">hedef ≈ 40 cmH₂O</text>
          <g data-o="lmaz"><line class="f41-sinir" x1="376" x2="422" y1="${Y(20)}" y2="${Y(20)}"/><text class="f41-t f41-t-w" x="426" y="${Y(20) - 2}">LMA kaçak sınırı</text><text class="f41-t f41-t-w" x="426" y="${Y(20) + 13}">20 cmH₂O</text></g>
          <text class="f41-sayac" data-o="say" x="445" y="234" text-anchor="middle">Süre: 0 / 10 s</text>
          <text class="f41-b f41-t-w" data-o="dur" x="445" y="254" text-anchor="middle"></text>`;
      }
      kutu.innerHTML = `<svg class="f41-svg" viewBox="${vb}" role="img" aria-label="Valsalva manevrasının uygulanışı: sahne ve hava yolu basıncı göstergesi">
        <defs><marker id="f41-uc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="f41-uc"/></marker></defs>
        <g transform="translate(${dar ? 30 : 0},${dar ? 0 : 10})">${sahne()}</g>${g}</svg>`;
      E = {};
      kutu.querySelectorAll('[data-o]').forEach((n) => { (E[n.dataset.o] = E[n.dataset.o] || []).push(n); });
      E.dar = dar;
      guncelle();
    }
    function guncelle() {
      kutu.querySelectorAll('[data-sh]').forEach((g) => { g.style.display = g.dataset.sh === mod ? '' : 'none'; });
      const set = (k, f) => (E[k] || []).forEach(f);
      const pr = Math.max(0, p);
      set('bt', (n) => { n.textContent = `Basınç: ${f1(pr)} cmH₂O`; });
      set('dol', (n) => { if (E.dar) n.setAttribute('width', (pr * 6).toFixed(1)); else { n.setAttribute('height', (pr * 3.4).toFixed(1)); n.setAttribute('y', (206 - pr * 3.4).toFixed(1)); } n.classList.toggle('f41-dolgu-w', mod === 'lma' && pr > 0.5); n.classList.toggle('f41-dolgu-ok', mod !== 'lma' && pr > 37); });
      set('lmaz', (n) => { n.style.display = mod === 'lma' ? '' : 'none'; });
      set('pt', (n) => { n.textContent = pr > 0.5 ? `${f1(pr)} cmH₂O` : ''; });
      kutu.querySelectorAll('.f41-akc').forEach((n) => { n.style.fillOpacity = (0.15 + 0.85 * clamp(pr / 40, 0, 1)).toFixed(2); });
      set('piston', (n) => { n.setAttribute('transform', `translate(${(clamp(pr / 40, 0, 1) * 12).toFixed(1)},0)`); });
      const kapali = faz !== 'bekle' && faz !== 'bitti' || (faz === 'bitti' && RM);
      set('aplt', (n) => { n.textContent = kapali ? 'APL valfi: kapalı' : 'APL valfi: açık'; n.classList.toggle('f41-t-a', kapali); });
      set('apli', (n) => { n.setAttribute('transform', kapali ? 'rotate(90 160 70)' : ''); });
      set('balon', (n) => { n.setAttribute('ry', (22 - 8 * clamp(pr / 40, 0, 1)).toFixed(1)); n.setAttribute('rx', (30 - 4 * clamp(pr / 40, 0, 1)).toFixed(1)); });
      const kacak = mod === 'lma' && pr > 19;
      set('kact', (n) => { n.style.display = kacak ? '' : 'none'; });
      set('kacak', (g) => {
        let s = '';
        if (kacak) {
          s = '<path class="f41-ok-w" d="M30 156 L12 178" marker-end="url(#f41-uc)"/><path class="f41-ok-w" d="M40 162 L32 190" marker-end="url(#f41-uc)"/>';
          const n = RM ? 3 : 5;
          for (let i = 0; i < n; i++) { const f = RM ? (i + 1) / 4 : ((sim * 0.9 + i / n) % 1); s += `<circle class="f41-kab" cx="${(34 - 26 * f + (i % 2) * 6).toFixed(1)}" cy="${(156 + 34 * f).toFixed(1)}" r="${(2.5 + 2 * f).toFixed(1)}"/>`; }
        }
        g.innerHTML = s;
      });
      const hedefOk = mod !== 'lma' && sure >= 10;
      set('say', (n) => { n.textContent = mod === 'lma' && faz !== 'bekle' ? 'Süre: — / 10 s' : hedefOk ? '10 s tamam' : `Süre: ${Math.floor(sure)} / 10 s`; n.classList.toggle('f41-sayac-ok', hedefOk); });
      set('dur', (n) => { n.textContent = mod === 'lma' && faz !== 'bekle' ? 'Hedefe ulaşılamıyor' : ''; });
      btn.textContent = faz === 'bekle' ? 'Manevrayı başlat' : faz === 'bitti' ? 'Yeniden' : 'Durdur';
      capYaz(el, mod === 'lma' ? CAP.lma : hedefOk ? CAP.tamam : CAP[mod]);
    }
    const sifirla = () => { faz = 'bekle'; p = 0; sure = 0; ft = 0; };
    const baslat = () => {
      sifirla();
      if (RM) { p = mod === 'lma' ? 21 : 40; sure = mod === 'lma' ? 0 : 10; faz = 'bitti'; } else faz = 'yuksel';
    };
    el.addEventListener('click', (e) => {
      const m = e.target.closest('[data-m]');
      if (m) { mod = m.dataset.m; basSec(el, 'm', mod); sifirla(); guncelle(); return; }
      if (e.target.closest('[data-a="bas"]')) { if (faz === 'bekle' || faz === 'bitti') baslat(); else sifirla(); guncelle(); }
    });
    ciz();
    const dur = ticker(el, (dt) => {
      sim += dt;
      if (faz === 'bekle' || faz === 'bitti') { if (mod === 'lma' && faz === 'bitti' && RM) return; return; }
      const hedef = mod === 'lma' ? 20 : 40;
      if (faz === 'yuksel') { p = Math.min(hedef, p + 40 * dt); if (p >= hedef) { faz = mod === 'lma' ? 'kacak' : 'tut'; ft = 0; } }
      else if (faz === 'tut') { p = 40; sure = Math.min(10, sure + dt); if (sure >= 10) faz = 'in'; }
      else if (faz === 'kacak') { ft += dt; p = 21 + Math.sin(sim * 9) * 1; if (ft > 6) faz = 'in'; }
      else if (faz === 'in') { p = Math.max(0, p - 80 * dt); if (p <= 0) faz = 'bitti'; }
      guncelle();
    });
    return () => { dur(); W.kapat(); };
  };

  /* ---------- 2 · Dört evre adım adım ---------- */
  VIZ.f41_evre = (el) => {
    const ADIM = [
      { ad: 'Başlangıç', t: 3, P: 0, dam: 1, lv: 1, vk: 1, hav: 3, bar: 0, vag: 0, sem: 0, sv: '=', ref: '—', vh: 1, ah: 1,
        cap: '<b>Başlangıç.</b> MAP ve HR dinlenim düzeyinde. Basıncı uygulayın ve evreleri sırayla izleyin. [[K1 s. 175]]' },
      { ad: 'Evre 1', t: 5, P: 40, dam: 0.45, lv: 1.25, vk: 0.8, hav: 3, bar: 1, vag: 1, sem: 0, sv: '↑', ref: 'HR ↓', vh: 0.9, ah: 2.2,
        cap: '<b>Evre 1.</b> Artan intratorasik basınç pulmoner damarları sıkıştırıp kanı sol kalbe iter: atım hacmi ve MAP geçici olarak yükselir; baroreseptör refleksi kalp hızını geçici olarak düşürür. [[K1 s. 176]]' },
      { ad: 'Evre 2', t: 13, P: 40, dam: 0.45, lv: 0.72, vk: 0.3, hav: 10, bar: 1, vag: 0, sem: 1, sv: '↓', ref: 'HR ↑', vh: 0.25, ah: 0.45,
        cap: '<b>Evre 2.</b> Yüksek intratorasik basınç venöz dönüşü engeller; atım hacmi azalır ve MAP giderek düşer. Baroreseptör refleksi kalp hızını artırır, MAP normale yaklaşır. [[K1 s. 176]]' },
      { ad: 'Evre 3', t: 15, P: 0, dam: 1.5, lv: 0.68, vk: 1.35, hav: 6, bar: 1, vag: 0, sem: 1, sv: '↓', ref: 'HR ↑', vh: 2.2, ah: 0.4,
        cap: '<b>Evre 3.</b> 10 s sonra basınç bırakılır. Venöz kan boşalmış intratorasik damarları doldurur; atım hacmi azalır, MAP daha da düşer ve kalp hızı refleks olarak bir kez daha artar. [[K1 s. 176]]' },
      { ad: 'Evre 4', t: 23, P: 0, dam: 1, lv: 1.22, vk: 1, hav: 3, bar: 1, vag: 2, sem: 0, sv: '↑', ref: 'HR ↓', vh: 1, ah: 1.4,
        cap: '<b>Evre 4.</b> Sol ventrikül ön yükü geri gelince MAP yükselir; kalp hızı hâlâ yüksek olduğu için MAP normali aşar. Baroreseptör refleksi bunu vagal uyarıyla, refleks bradikardiyle hızla düzeltir. [[K1 s. 176]]' },
      { ad: 'Normale dönüş', t: 30, P: 0, dam: 1, lv: 1, vk: 1, hav: 3, bar: 0, vag: 0, sem: 0, sv: '=', ref: '—', vh: 1, ah: 1,
        cap: '<b>Normale dönüş.</b> MAP ve kalp hızı dinlenim değerlerine döner. Evre 2 ve 4 baroreseptör refleksinin işidir; bozuk refleksin nasıl göründüğü aşağıda. [[K1 s. 176–177]]' },
    ];
    let adim = 0, tUc = 3, tHedef = 3, oyna = false;
    const S = { P: 0, dam: 1, lv: 1, vk: 1, hav: 3, bar: 0, vag: 0, sem: 0 };
    el.innerHTML = `<div class="f41-ctl"><div class="f41-adim" role="group" aria-label="Evreler">
        <button type="button" class="btn ghost" data-a="geri" aria-label="Geri">‹ Geri</button>
        <span class="f41-adim-ad" data-o="ad" aria-live="off">Başlangıç</span>
        <button type="button" class="btn ghost" data-a="ileri" aria-label="İleri">İleri ›</button></div>
        <button type="button" class="btn" data-a="oyna" aria-pressed="false">Oynat</button>
        <div class="f41-nok" role="group" aria-label="Adım seç">${ADIM.map((a, i) => `<button type="button" data-n="${i}" aria-label="${a.ad}" aria-pressed="${i === 0}"></button>`).join('')}</div></div>
      <dl class="f41-panel"><div><dt>İntratorasik basınç</dt><dd data-o="pP">0 cmH₂O</dd></div><div><dt>SV</dt><dd data-o="pSV">=</dd></div><div><dt>Refleks</dt><dd data-o="pR">—</dd></div></dl>
      <div class="f41-sv"></div>`;
    const kutu = el.querySelector('.f41-sv');
    let E = {}, G = null, yollar = [];
    const W = genislik(el, () => ciz());
    const AKC = (cx) => `<ellipse class="f41-akc2" cx="${cx}" cy="90" rx="31" ry="52"/>
      <path class="f41-dam f41-dam-a" d="M${cx} 132 L${cx} 60 M${cx} 104 L${cx - 16} 74 M${cx} 88 L${cx + 15} 62 M${cx} 118 L${cx + 18} 100"/>
      <path class="f41-dam f41-dam-v" d="M${cx + 5} 134 L${cx + 5} 66 M${cx + 5} 112 L${cx - 12} 92 M${cx + 5} 96 L${cx + 20} 80"/>`;
    function ciz() {
      const dar = W.dar();
      const H = dar ? 492 : 420, Wd = dar ? 360 : 560;
      G = dar ? grafik({ x0: 40, x1: 352, mT: 246, mB: 344, hT: 364, hB: 460 }) : grafik({ x0: 44, x1: 548, mT: 250, mB: 312, hT: 330, hB: 392 });
      const ox = dar ? 0 : 100;
      kutu.innerHTML = `<svg class="f41-svg" viewBox="0 0 ${Wd} ${H}" role="img" aria-label="Göğüs şeması ile MAP ve kalp hızı eğrileri; Valsalva manevrasının dört evresi">
        <defs><marker id="f41-uc2" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0 L10 5 L0 10 Z" class="f41-uc-a"/></marker></defs>
        <g transform="translate(${ox},0)">
          <rect class="f41-ven-k" x="2" y="126" width="74" height="54" rx="8"/>
          <text class="f41-t" x="39" y="142" text-anchor="middle">Periferik</text><text class="f41-t" x="39" y="156" text-anchor="middle">venler</text>
          <g data-o="havuz"></g>
          <ellipse class="f41-gogus" data-o="gogus" cx="170" cy="104" rx="88" ry="82"/>
          ${AKC(126)}${AKC(214)}
          <text class="f41-pt f41-et" data-o="pt" x="170" y="200" text-anchor="middle"></text>
          <path class="f41-vk" data-o="vk" d="M74 158 C104 158 120 150 148 142"/>
          <path class="f41-ao" d="M190 116 C192 64 204 40 236 38 L262 38"/>
          <rect class="f41-sag" x="146" y="112" width="24" height="42" rx="8"/><text class="f41-ht" x="158" y="138" text-anchor="middle">RV</text>
          <ellipse class="f41-sol" data-o="lv" cx="186" cy="136" rx="14" ry="21"/><text class="f41-ht f41-ht-l" x="186" y="140" text-anchor="middle">LV</text>
          <circle class="f41-san" data-o="san" cx="152" cy="114" r="4"/>
          <g data-o="par"></g>
          <path class="f41-sin" data-o="aff" d="M268 40 L296 52"/>
          <circle class="f41-baro" data-o="baro" cx="262" cy="38" r="6"/>
          <text class="f41-t" x="250" y="20" text-anchor="middle">Baroreseptör</text>
          <rect class="f41-bs" x="286" y="50" width="70" height="28" rx="7"/><text class="f41-t" x="321" y="68" text-anchor="middle">Beyin sapı</text>
          <path class="f41-sin" data-o="vag" d="M300 78 C300 114 220 106 158 112" marker-end="url(#f41-uc2)"/>
          <text class="f41-t f41-t-a" data-o="vagt" x="306" y="100">Vagus</text>
          <path class="f41-sin" data-o="sem" d="M338 78 C338 152 244 150 202 142" marker-end="url(#f41-uc2)"/>
          <text class="f41-t f41-t-a" data-o="semt" x="292" y="172">Sempatik</text>
        </g>
        ${G.s}
        <path class="f41-cmap" data-o="cm" d=""/><path class="f41-chr" data-o="ch" d=""/>
        <circle class="f41-uc-m" data-o="um" r="4.5"/><circle class="f41-uc-h" data-o="uh" r="4.5"/>
        <text class="f41-et f41-et-m" data-o="e1" x="${G.X(19.6) + 4}" y="${G.YM(106) + 3}">${dar ? 'MAP aşımı' : 'MAP aşımı (overshoot)'}</text>
        <text class="f41-et f41-et-h" data-o="e2" x="${G.X(18.7) - 6}" y="${G.YH(54) + 4}" text-anchor="end">Refleks bradikardi</text>
      </svg>`;
      E = {};
      kutu.querySelectorAll('[data-o]').forEach((n) => { E[n.dataset.o] = n; });
      yollar = [];
      el.querySelectorAll('[data-o="pP"],[data-o="pSV"],[data-o="pR"],[data-o="ad"]').forEach((n) => { E[n.dataset.o] = n; });
      // parçacık yolları: venler → RA, akciğer → LV → aorta
      const pv = mk('path', { d: 'M20 166 L74 158 C104 158 120 150 148 142' }), pa = mk('path', { d: 'M126 70 C140 96 170 118 186 136 L190 116 C192 64 204 40 236 38 L262 38' }), pb = mk('path', { d: 'M214 70 C204 96 192 118 186 136' });
      [pv, pa, pb].forEach((p) => { p.style.display = 'none'; E.par.appendChild(p); });
      yollar = [{ p: pv, L: 0, n: 7, k: 'v' }, { p: pa, L: 0, n: 7, k: 'a' }, { p: pb, L: 0, n: 3, k: 'a' }];
      yollar.forEach((y) => { y.p.style.display = ''; y.L = y.p.getTotalLength(); y.p.style.display = 'none'; y.c = Array.from({ length: y.n }, () => mk('circle', { r: 3, class: y.k === 'v' ? 'f41-par-v' : 'f41-par-a' }, E.par)); y.f = Array.from({ length: y.n }, (_, i) => i / y.n); });
      guncelle(0);
    }
    function adimSec(i, anim) {
      adim = clamp(i, 0, ADIM.length - 1);
      tHedef = ADIM[adim].t;
      if (!anim || RM) tUc = tHedef;
      if (tUc > tHedef) tUc = adim ? ADIM[adim - 1].t : 0;
      if (!anim || RM) tUc = tHedef;
      basSec(el, 'n', adim);
    }
    const adimT = (t) => { if (t < 3) return 0; for (let i = 0; i < BANT.length; i++) if (t < BANT[i][1] || (i === 3 && t <= 23)) return i + 1; return 5; };
    function guncelle(dt) {
      const A = ADIM[adim];
      ['P', 'dam', 'lv', 'vk', 'hav', 'bar', 'vag', 'sem'].forEach((k) => { S[k] = yak(S[k], A[k], dt, 0.4); });
      if (!dt) ['P', 'dam', 'lv', 'vk', 'hav', 'bar', 'vag', 'sem'].forEach((k) => { S[k] = A[k]; });
      E.gogus.style.fillOpacity = (S.P / 40).toFixed(2);
      E.pt.textContent = A.P ? 'İntratorasik 40 cmH₂O' : (adim === 3 ? 'Basınç bırakıldı · 0 cmH₂O' : '');
      kutu.querySelectorAll('.f41-dam').forEach((d) => { d.style.strokeWidth = (0.8 + 2.2 * S.dam).toFixed(2); });
      E.vk.style.strokeWidth = (2 + 6 * S.vk).toFixed(2);
      E.lv.setAttribute('rx', (14 * S.lv).toFixed(1)); E.lv.setAttribute('ry', (21 * S.lv).toFixed(1));
      E.baro.classList.toggle('on', S.bar > 0.5); E.aff.classList.toggle('on', S.bar > 0.5);
      E.vag.classList.toggle('on', S.vag > 0.3); E.vag.style.strokeWidth = (1.5 + 2 * S.vag).toFixed(2); E.vagt.classList.toggle('on', S.vag > 0.3);
      E.sem.classList.toggle('on', S.sem > 0.3); E.sem.style.strokeWidth = (1.5 + 2.5 * S.sem).toFixed(2); E.semt.classList.toggle('on', S.sem > 0.3);
      E.san.classList.toggle('on', S.vag > 0.3);
      let hv = ''; const nh = Math.round(S.hav);
      for (let i = 0; i < nh; i++) hv += `<circle class="f41-par-v" cx="${12 + (i % 6) * 11}" cy="${172 - Math.floor(i / 6) * 8}" r="3"/>`;
      E.havuz.innerHTML = hv;
      // eğriler
      E.cm.setAttribute('d', G.yol(EGRI.normal.map, G.YM, tUc));
      E.ch.setAttribute('d', G.yol(EGRI.normal.hr, G.YH, tUc));
      E.um.setAttribute('cx', G.X(tUc)); E.um.setAttribute('cy', G.YM(EGRI.normal.map(tUc)));
      E.uh.setAttribute('cx', G.X(tUc)); E.uh.setAttribute('cy', G.YH(EGRI.normal.hr(tUc)));
      E.e1.style.opacity = tUc >= 19 ? 1 : 0; E.e2.style.opacity = tUc >= 19.4 ? 1 : 0;
      const aktif = adimT(Math.max(0, tUc - 0.001));
      kutu.querySelectorAll('[data-bant]').forEach((b) => b.classList.toggle('on', +b.dataset.bant === aktif && adim >= 1 && adim <= 4));
      kutu.querySelectorAll('[data-evno]').forEach((b) => b.classList.toggle('on', +b.dataset.evno === aktif && adim >= 1 && adim <= 4));
      // parçacıklar
      yollar.forEach((y) => {
        const hz = y.k === 'v' ? A.vh : A.ah;
        y.c.forEach((c, i) => {
          if (RM) { c.style.display = 'none'; return; }
          y.f[i] = (y.f[i] + dt * 0.35 * hz) % 1;
          const pt = y.p.getPointAtLength(y.f[i] * y.L);
          c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
        });
      });
      E.pP.textContent = A.P ? '40 cmH₂O' : '0 cmH₂O';
      E.pSV.textContent = A.sv; E.pR.textContent = A.ref;
      E.ad.textContent = A.ad;
      el.querySelector('[data-a="oyna"]').textContent = oyna ? 'Duraklat' : 'Oynat';
      el.querySelector('[data-a="oyna"]').setAttribute('aria-pressed', String(oyna));
      capYaz(el, A.cap);
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.classList.contains('ref')) return;
      if (b.dataset.a === 'geri') { oyna = false; adimSec(adim - 1, true); }
      else if (b.dataset.a === 'ileri') { oyna = false; adimSec(adim + 1, true); }
      else if (b.dataset.n != null) { oyna = false; adimSec(+b.dataset.n, true); }
      else if (b.dataset.a === 'oyna') {
        if (RM) { adimSec(5, false); }
        else if (oyna) oyna = false;
        else { oyna = true; if (tUc >= 30) { tUc = 0; adimSec(0, true); tUc = 0; } }
      }
      guncelle(0.0001);
    });
    ciz();
    const dur = ticker(el, (dt) => {
      if (oyna) {
        tUc = Math.min(30, tUc + dt * 2);
        const a = adimT(tUc);
        if (a !== adim) { adim = a; basSec(el, 'n', adim); }
        tHedef = ADIM[adim].t;
        if (tUc >= 30) oyna = false;
      } else if (tUc < tHedef) {
        const bas = adim ? ADIM[adim - 1].t : 0;
        tUc = Math.min(tHedef, tUc + dt * Math.max(1.5, (tHedef - bas) / 1.2));
      } else if (tUc > tHedef) tUc = tHedef;
      guncelle(dt);
    });
    return () => { dur(); W.kapat(); };
  };

  /* ---------- 3 · Dört kullanım ---------- */
  VIZ.f41_kullanim = (el) => {
    const CAP = {
      svt: '<b>Supraventriküler taşikardi.</b> Evre 4\'ün yoğun vagal uyarısı atriyoventriküler düğümde iletimi yavaşlatır ve taşikardiyi sonlandırabilir. Bir kullanım seçin. [[K1 s. 176]]',
      ufur: '<b>Üfürüm ayrımı.</b> Valsalva hipertrofik obstrüktif kardiyomiyopati (HOKM) üfürümünü artırır; aort stenozu dahil diğer üfürümlerin çoğunu azaltır. Aort stenozu ejeksiyon sistolik üfürümün başlıca ayırıcı tanısıdır. [[K1 s. 176]]',
      inis: '<b>Dalış, iniş.</b> Valsalva östaki borularını açar ve orta kulak basıncını ortam basıncına eşitler. [[K1 s. 176]]',
      cikis: '<b>Dalış, çıkış.</b> Önerilmez: patent foramen ovale açılabilir. Çözünmüş N₂\'nin çözeltiden çıkıp venöz dolaşımda kabarcık oluşturduğu dekompresyon hastalığıyla birleşince arteriyel gaz embolisi gelişebilir. [[K1 s. 176]]',
      ven: '<b>Venöz basıncı geçici artırma.</b> Ameliyatta, ör. radikal boyun diseksiyonundan sonra, hemostazın yeterli olup olmadığını sınamak için kullanılır. [[K1 s. 176]]',
    };
    let pan = 'svt', dal = 'inis', v = 0, vh = 0, sim = 0;
    // EKG durumu
    let ekT = 0, beats = [], sonraki = 0, tv = null;
    el.innerHTML = `<div class="f41-ctl">${segHtml('Kullanım', 'p', [['svt', 'SVT sonlandırma'], ['ufur', 'Üfürüm ayrımı'], ['dalis', 'Dalış'], ['ven', 'Venöz basınç']], pan)}</div>
      <div class="f41-ctl f41-ctl2"><span data-o="dalseg">${segHtml('Dalış evresi', 'd', [['inis', 'İniş'], ['cikis', 'Çıkış']], dal)}</span>
      <button type="button" class="btn" data-a="val">Valsalva uygula</button></div>
      <div class="f41-sv f41-sv-k"><svg class="f41-svg" viewBox="0 0 360 250" role="img" aria-label="Valsalva manevrasının dört kullanımı">
        <defs><marker id="f41-uc3" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0 L10 5 L0 10 Z" class="f41-uc-a"/></marker>
        <marker id="f41-uc4" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0 L10 5 L0 10 Z" class="f41-uc"/></marker>
        <clipPath id="f41-ekg-k"><rect x="8" y="112" width="344" height="100" rx="8"/></clipPath></defs>
        <g data-pn="svt">
          <circle class="f41-dg" data-o="sa" cx="24" cy="56" r="10"/><text class="f41-t" x="24" y="86" text-anchor="middle">SA</text>
          <rect class="f41-atr" x="46" y="40" width="90" height="32" rx="8"/><text class="f41-t" x="91" y="61" text-anchor="middle">Atriyumlar</text>
          <circle class="f41-dg f41-dg-av" data-o="av" cx="172" cy="56" r="12"/><text class="f41-t f41-b" x="172" y="88" text-anchor="middle">AV düğüm</text>
          <rect class="f41-vnt" x="206" y="34" width="146" height="44" rx="8"/><text class="f41-t" x="279" y="61" text-anchor="middle">Ventriküller</text>
          <path class="f41-iok" d="M34 56 L44 56" marker-end="url(#f41-uc4)"/><path class="f41-iok" d="M136 56 L158 56" marker-end="url(#f41-uc4)"/><path class="f41-iok" d="M184 56 L204 56" marker-end="url(#f41-uc4)"/>
          <path class="f41-sin" data-o="vgo" d="M172 14 L172 40" marker-end="url(#f41-uc3)"/><text class="f41-t f41-t-a" data-o="vgt" x="180" y="20">Vagus (evre 4)</text>
          <rect class="f41-ekg-z" x="8" y="112" width="344" height="100" rx="8"/>
          <g clip-path="url(#f41-ekg-k)"><path class="f41-ekg" data-o="ekg" d=""/><g data-o="mark"><line class="f41-kesik-a" x1="0" x2="0" y1="112" y2="212"/><text class="f41-t f41-t-a" x="4" y="128">Evre 4 · vagal uyarı</text></g></g>
          <text class="f41-b" data-o="rit" x="344" y="204" text-anchor="end">SVT</text>
          <text class="f41-tk" x="12" y="228">EKG (şematik)</text>
        </g>
        <g data-pn="ufur">
          <text class="f41-b" x="180" y="18" text-anchor="middle">Ejeksiyon sistolik üfürüm: iki ana neden</text>
          <line class="f41-eksen" x1="30" x2="340" y1="190" y2="190"/>
          <text class="f41-tk" x="22" y="110" text-anchor="middle" transform="rotate(-90 22 110)">göreli şiddet</text>
          <rect class="f41-cb" x="51" width="44" y="${190 - 84}" height="84"/><rect class="f41-cb f41-cb-v" data-o="b1" x="105" width="44" y="106" height="84"/>
          <rect class="f41-cb" x="211" width="44" y="106" height="84"/><rect class="f41-cb f41-cb-v" data-o="b2" x="265" width="44" y="106" height="84"/>
          <text class="f41-t" x="73" y="205" text-anchor="middle">Dinlenim</text><text class="f41-t" x="127" y="205" text-anchor="middle">Valsalva</text>
          <text class="f41-t" x="233" y="205" text-anchor="middle">Dinlenim</text><text class="f41-t" x="287" y="205" text-anchor="middle">Valsalva</text>
          <text class="f41-b" x="100" y="224" text-anchor="middle">HOKM</text><text class="f41-b" x="260" y="224" text-anchor="middle">Aort stenozu</text>
          <text class="f41-b f41-t-w" data-o="b1t" x="127" y="0" text-anchor="middle">↑ artar</text><text class="f41-b f41-t-b" data-o="b2t" x="287" y="0" text-anchor="middle">↓ azalır</text>
          <text class="f41-tk" data-o="not" x="180" y="244" text-anchor="middle">Diğer üfürümlerin çoğu da azalır</text>
        </g>
        <g data-pn="dalis">
          <rect class="f41-su" x="0" y="26" width="122" height="224" rx="8"/>
          <path class="f41-yuzey" d="M0 26 Q15 20 30 26 T60 26 T90 26 T122 26"/>
          <g data-o="dalgic"><circle class="f41-dl" cx="60" cy="0" r="9"/><path class="f41-dl-g" d="M60 9 L60 40 M60 40 L50 62 M60 40 L70 62 M60 18 L46 30 M60 18 L74 30"/><path class="f41-dl-p" d="M46 62 L40 70 L52 68 Z M70 62 L76 70 L64 68 Z"/></g>
          <path class="f41-yon" data-o="yon" d="" marker-end="url(#f41-uc4)"/>
          <text class="f41-t" data-o="yont" x="61" y="244" text-anchor="middle">İniş</text>
          <g data-o="kulak">
            <rect class="f41-kanal" x="136" y="80" width="80" height="24" rx="4"/>
            <text class="f41-t f41-t-w" x="176" y="58" text-anchor="middle">Ortam basıncı</text>
            <path class="f41-ok-w" d="M146 66 L160 82" marker-end="url(#f41-uc4)"/><path class="f41-ok-w" d="M192 66 L206 82" marker-end="url(#f41-uc4)"/>
            <text class="f41-t" x="176" y="124" text-anchor="middle">Dış kulak yolu</text>
            <ellipse class="f41-ok-bos" cx="266" cy="92" rx="42" ry="34"/>
            <path class="f41-zar" data-o="zar" d=""/>
            <text class="f41-t" x="222" y="146" text-anchor="middle">Kulak zarı</text>
            <text class="f41-t" x="270" y="96" text-anchor="middle">Orta kulak</text>
            <path class="f41-ost" data-o="ost" d="M286 122 C296 150 308 170 318 196"/>
            <g data-o="hava"></g>
            <rect class="f41-naz" x="282" y="196" width="74" height="34" rx="8"/><text class="f41-t" x="319" y="218" text-anchor="middle">Nazofarenks</text>
            <text class="f41-t" x="296" y="166" text-anchor="end">Östaki borusu</text>
            <text class="f41-b f41-t-ok" data-o="esit" x="356" y="40" text-anchor="end">Orta kulak = ortam basıncı</text>
          </g>
          <g data-o="kalp">
            <text class="f41-rozet" x="140" y="18">Çıkışta önerilmez</text>
            <rect class="f41-sag" x="140" y="70" width="98" height="116" rx="12"/><rect class="f41-sol" x="252" y="70" width="98" height="116" rx="12"/>
            <rect class="f41-septum" x="238" y="70" width="14" height="44"/><rect class="f41-septum" x="238" y="146" width="14" height="40"/>
            <line class="f41-flap" data-o="flap" x1="252" y1="114" x2="252" y2="146"/>
            <text class="f41-t" x="189" y="88" text-anchor="middle">Sağ atriyum</text><text class="f41-t" x="301" y="88" text-anchor="middle">Sol atriyum</text>
            <text class="f41-b" x="245" y="108" text-anchor="middle">PFO</text>
            <path class="f41-ao" d="M300 70 L300 50 L352 50"/>
            <text class="f41-b f41-t-w" data-o="emb" x="352" y="40" text-anchor="end">Arteriyel gaz embolisi</text>
            <g data-o="kab"></g>
            <text class="f41-t" x="140" y="206">Çözünmüş N₂ çözeltiden çıkar:</text>
            <text class="f41-t" x="140" y="222">venöz kabarcık, dekompresyon</text>
            <text class="f41-t" x="140" y="238">hastalığı</text>
          </g>
        </g>
        <g data-pn="ven">
          <path class="f41-deri" d="M8 54 Q40 22 96 30 Q150 38 180 60 L232 80 L232 240 L8 240 Z"/>
          <text class="f41-t" x="120" y="74" text-anchor="middle">Boyun diseksiyonu yarası</text>
          <ellipse class="f41-yara" cx="120" cy="148" rx="92" ry="56"/>
          <path class="f41-ven" d="M44 114 L84 132"/><path class="f41-bag" d="M80 124 L76 136 M86 127 L82 139"/>
          <path class="f41-ven" d="M168 100 L140 128"/><path class="f41-bag" d="M138 120 L148 128 M142 115 L152 123"/>
          <path class="f41-ven" d="M178 196 L146 164"/>
          <text class="f41-tk" x="48" y="108">bağlı</text><text class="f41-tk" x="158" y="94">bağlı</text>
          <g data-o="damla"></g>
          <text class="f41-b f41-t-w" data-o="kan" x="96" y="186" text-anchor="end">kanama noktası</text>
          <text class="f41-t" x="295" y="34" text-anchor="middle">Venöz basınç</text>
          <rect class="f41-gz" x="280" y="46" width="30" height="160" rx="4"/>
          <rect class="f41-dolgu f41-dolgu-v" data-o="vb" x="280" y="206" width="30" height="0" rx="4"/>
          <text class="f41-tk" x="316" y="56">yüksek</text><text class="f41-tk" x="316" y="204">düşük</text>
          <text class="f41-b f41-t-ok" data-o="hem" x="180" y="232" text-anchor="middle"></text>
        </g>
      </svg></div>`;
    const E = {};
    el.querySelectorAll('[data-o]').forEach((n) => { E[n.dataset.o] = n; });
    const btn = el.querySelector('[data-a="val"]');
    // EKG modeli (şematik; hız sayıları yazılmaz)
    const g = (u, c, w, a) => a * Math.exp(-((u - c) * (u - c)) / (2 * w * w));
    const atim = (b, u) => {
      let y = g(u, -0.012, 0.008, -0.12) + g(u, 0.012, 0.009, 1) + g(u, 0.036, 0.009, -0.28);
      if (b.k === 's') y += g(u, -0.16, 0.025, 0.14) + g(u, 0.26, 0.045, 0.3);
      else y += g(u, 0.17, 0.035, 0.22);
      return y;
    };
    const SPAN = 4.5;
    const atimUret = (T) => { while (sonraki <= T + 0.6) { const k = tv != null && sonraki >= tv + 1.2 ? 's' : 'v'; if (tv != null && k === 'v' && sonraki > tv + 0.5) { sonraki = tv + 1.9; continue; } beats.push({ t: sonraki, k }); sonraki += k === 's' ? 0.86 : 0.36; } beats = beats.filter((b) => b.t > T - SPAN - 1); };
    const ekgCiz = (T) => {
      const x0 = 8, x1 = 352, yb = 178, amp = 52; let d = '';
      for (let x = x0; x <= x1; x += 1.5) {
        const t = T - SPAN + ((x - x0) / (x1 - x0)) * SPAN; let y = 0;
        for (const b of beats) { const u = t - b.t; if (u > -0.4 && u < 0.5) y += atim(b, u); }
        d += (x === x0 ? 'M' : 'L') + x.toFixed(1) + ' ' + (yb - y * amp).toFixed(1);
      }
      E.ekg.setAttribute('d', d);
      const mx = tv == null ? -99 : x0 + ((tv - (T - SPAN)) / SPAN) * (x1 - x0);
      E.mark.setAttribute('transform', `translate(${mx.toFixed(1)},0)`);
      E.mark.style.display = tv != null && mx > x0 - 2 ? '' : 'none';
      const sin = beats.some((b) => b.k === 's' && b.t < T);
      E.rit.textContent = sin ? 'Sinüs ritmi' : 'SVT';
      E.rit.classList.toggle('f41-t-ok', sin);
      const vg = tv != null && T > tv && T < tv + 3.5;
      E.vgo.classList.toggle('on', vg); E.vgt.classList.toggle('on', vg); E.av.classList.toggle('on', vg);
      const son = beats.filter((b) => b.t <= T).pop();
      const yeni = son && T - son.t < 0.12;
      E.sa.classList.toggle('vur', !!(yeni && son.k === 's'));
      E.av.classList.toggle('vur', !!yeni);
    };
    const ekgSifir = () => { ekT = 0; beats = []; sonraki = 0.2; tv = null; atimUret(SPAN); ekT = SPAN; };
    const ekgRM = () => { beats = []; sonraki = 0.2; tv = 2.2; atimUret(5); ekT = 5; };
    function guncelle(dt) {
      el.querySelectorAll('[data-pn]').forEach((n) => { n.style.display = n.dataset.pn === pan ? '' : 'none'; });
      E.dalseg.style.display = pan === 'dalis' ? '' : 'none';
      vh = v ? 1 : 0;
      const f = clamp(vh, 0, 1);
      if (pan === 'svt') ekgCiz(ekT);
      if (pan === 'ufur') {
        const h1 = 84 + (126 - 84) * f, h2 = 84 - (84 - 42) * f;
        E.b1.setAttribute('y', 190 - h1); E.b1.setAttribute('height', h1); E.b2.setAttribute('y', 190 - h2); E.b2.setAttribute('height', h2);
        E.b1.classList.toggle('f41-cb-w', f > 0.05); E.b2.classList.toggle('f41-cb-b', f > 0.05);
        E.b1t.setAttribute('y', 190 - h1 - 8); E.b2t.setAttribute('y', 190 - h2 - 8);
        E.b1t.style.opacity = f > 0.9 ? 1 : 0; E.b2t.style.opacity = f > 0.9 ? 1 : 0; E.not.style.opacity = f > 0.9 ? 1 : 0;
      }
      if (pan === 'dalis') {
        const ini = dal === 'inis';
        E.kulak.style.display = ini ? '' : 'none'; E.kalp.style.display = ini ? 'none' : '';
        const dy = RM ? 0 : (sim * 12) % 30;
        E.dalgic.setAttribute('transform', `translate(0,${(ini ? 96 + dy : 150 - dy).toFixed(1)})`);
        E.yon.setAttribute('d', ini ? 'M100 70 L100 200' : 'M100 200 L100 70');
        E.yont.textContent = ini ? 'İniş' : 'Çıkış';
        if (ini) {
          const bx = 218 + 12 * (1 - f);
          E.zar.setAttribute('d', `M218 64 Q${bx.toFixed(1)} 92 218 120`);
          E.ost.classList.toggle('on', f > 0.5);
          E.esit.style.opacity = f > 0.9 ? 1 : 0;
          let hv = '';
          if (f > 0.5) for (let i = 0; i < 4; i++) { const q = RM ? (i + 0.5) / 4 : (sim * 0.5 + i / 4) % 1; const x = 318 - 32 * q, y = 196 - 74 * q - 8 * Math.sin(q * 3); hv += `<circle class="f41-hava" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"/>`; }
          E.hava.innerHTML = hv;
        } else {
          E.flap.setAttribute('transform', f > 0.5 ? 'rotate(-55 252 114)' : '');
          E.flap.classList.toggle('on', f > 0.5);
          E.emb.style.opacity = f > 0.9 ? 1 : 0;
          let kb = '';
          for (let i = 0; i < 7; i++) {
            const q = RM ? (i + 0.5) / 7 : (sim * 0.22 + i / 7) % 1;
            let x, y;
            if (f < 0.5) { x = 156 + ((i * 37) % 70) + 6 * Math.sin(sim + i); y = 176 - 80 * q; }
            else if (q < 0.45) { const r = q / 0.45; x = 160 + 70 * r; y = 170 - 40 * r; }
            else if (q < 0.75) { const r = (q - 0.45) / 0.3; x = 230 + 60 * r; y = 130 - 10 * r; }
            else { const r = (q - 0.75) / 0.25; x = 300 + (r > 0.5 ? (r - 0.5) * 100 : 0); y = r > 0.5 ? 50 : 120 - 140 * r; }
            kb += `<circle class="f41-n2" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${3 + (i % 3)}"/>`;
          }
          E.kab.innerHTML = kb;
        }
      }
      if (pan === 'ven') {
        const h = 160 * (0.2 + 0.65 * f);
        E.vb.setAttribute('y', 206 - h); E.vb.setAttribute('height', h);
        E.vb.classList.toggle('f41-dolgu-w', f > 0.5);
        E.kan.style.opacity = f > 0.9 ? 1 : 0;
        E.hem.textContent = f > 0.9 ? 'Hemostaz yetersiz noktayı gösterir' : '';
        let dm = '';
        if (f > 0.5) for (let i = 0; i < 4; i++) { const q = RM ? (i + 0.5) / 4 : (sim * 0.8 + i / 4) % 1; dm += `<circle class="f41-damla" cx="${(146 - 18 * q - i * 2).toFixed(1)}" cy="${(164 + 26 * q).toFixed(1)}" r="${(3.5 - q).toFixed(1)}"/>`; }
        E.damla.innerHTML = dm;
      }
      btn.textContent = v ? 'Yeniden' : 'Valsalva uygula';
      capYaz(el, pan === 'dalis' ? CAP[dal] : CAP[pan]);
    }
    el.addEventListener('click', (e) => {
      const p = e.target.closest('[data-p]'), d = e.target.closest('[data-d]');
      if (p) { pan = p.dataset.p; basSec(el, 'p', pan); v = 0; ekgSifir(); }
      else if (d) { dal = d.dataset.d; basSec(el, 'd', dal); v = 0; }
      else if (e.target.closest('[data-a="val"]')) {
        if (v) { v = 0; ekgSifir(); }
        else { v = 1; if (pan === 'svt') { if (RM) ekgRM(); else tv = ekT + 0.3; } }
      } else return;
      guncelle(0);
    });
    ekgSifir();
    guncelle(0);
    const dur = ticker(el, (dt) => {
      sim += dt;
      if (pan === 'svt' && !RM) { ekT += dt; atimUret(ekT); }
      if (!RM || pan !== 'svt') guncelle(dt);
    });
    return dur;
  };

  /* ---------- 4 · Normal, otonom işlev bozukluğu, kare dalga ---------- */
  VIZ.f41_yanit = (el) => {
    const D = {
      normal: { yer: 'Sağlam otonom sinir sistemi', cap: '<b>Normal yanıt.</b> Evre 2\'de refleks taşikardi, evre 4\'te MAP aşımı ve refleks bradikardi var. Bir yanıt türü seçip normalle karşılaştırın. [[K1 s. 175–177]]',
        et: [['h', 9.6, 87, 'refleks taşikardi', 'end'], ['m', 19.6, 107, 'MAP aşımı', 'start'], ['h', 18.7, 54, 'refleks bradikardi', 'end']] },
      otonom: { yer: 'Diyabetik otonom nöropati, omurilik yaralanması', cap: '<b>Otonom işlev bozukluğu.</b> Baroreseptör refleksi bozuktur: evre 2\'de kompansatuvar taşikardi olmaz ve MAP basınç bırakılana dek düşer; evre 4\'te MAP aşımı da kompansatuvar bradikardi de yoktur. [[K1 s. 177]]',
        et: [['h', 8.5, 77, 'Refleks taşikardi yok', 'middle'], ['m', 5.6, 76, 'MAP bırakılana dek düşer', 'start'], ['m', 21, 94, 'MAP aşımı yok', 'start'], ['h', 21, 63, 'Refleks bradikardi yok', 'start']] },
      kare: { yer: 'Yüksek venöz basınç: konjestif kalp yetersizliği, konstriktif perikardit', cap: '<b>Kare dalga yanıtı.</b> Sol ventrikül Starling eğrisinin platosunda çalışır ve kronik yüksek sempatik çıkış damarları neredeyse en üst düzeyde kasmıştır. Basınç sürdükçe MAP yüksek kalır, HR az değişir, evre 4\'te aşım olmaz. [[K1 s. 177]]',
        et: [['m', 8, 107, 'Kare dalga', 'middle'], ['h', 8, 77, 'HR az değişir', 'middle'], ['m', 19, 94, 'MAP aşımı yok', 'start']] },
    };
    let sec = 'normal', onceki = 'normal', mf = 1, tCiz = 30;
    el.innerHTML = `<div class="f41-ctl">${segHtml('Yanıt türü', 'y', [['normal', 'Normal'], ['otonom', 'Otonom işlev bozukluğu'], ['kare', 'Kare dalga yanıtı']], sec)}
        <button type="button" class="btn ghost" data-a="ciz">Yeniden çiz</button></div>
      <div class="f41-yz"><div class="f41-sv"></div>
        <aside class="f41-yan"><div class="legend f41-lej"><span><i class="f41-lej-s"></i>seçili yanıt</span><span data-o="lejn"><i class="f41-lej-n"></i>normal</span></div>
          <div class="f41-nerede"><b>Nerede görülür?</b><p data-o="yer"></p></div>
          <figure class="f41-star" data-o="star"><svg class="f41-svg" viewBox="0 0 220 150" role="img" aria-label="Starling eğrisi: platoda ön yük değişse de atım hacmi az değişir">
            <defs><marker id="f41-uc5" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0 L10 5 L0 10 Z" class="f41-uc"/></marker></defs>
            <line class="f41-eksen" x1="30" y1="118" x2="210" y2="118"/><line class="f41-eksen" x1="30" y1="118" x2="30" y2="10"/>
            <path class="f41-starl" d="M30 116 C70 70 100 34 140 28 L206 26"/>
            <circle class="f41-starp" data-o="sp" cx="186" cy="27" r="5"/>
            <path class="f41-ok-k" d="M186 46 L154 46" marker-end="url(#f41-uc5)"/>
            <text class="f41-tk" x="120" y="138" text-anchor="middle">Ön yük</text>
            <text class="f41-tk" x="18" y="66" text-anchor="middle" transform="rotate(-90 18 66)">Atım hacmi</text>
            <text class="f41-et" x="118" y="76" text-anchor="middle">Valsalva: ön yük ↓</text>
          </svg><figcaption>Platoda: ön yük değişse de SV az değişir</figcaption></figure>
        </aside></div>`;
    const kutu = el.querySelector('.f41-sv');
    const E = {};
    el.querySelectorAll('[data-o]').forEach((n) => { E[n.dataset.o] = n; });
    let G = null, dar = false;
    const W = genislik(el, () => ciz());
    function ciz() {
      dar = W.dar();
      G = dar ? grafik({ x0: 40, x1: 350, mT: 54, mB: 154, hT: 176, hB: 270 }) : grafik({ x0: 44, x1: 410, mT: 54, mB: 148, hT: 170, hB: 262 });
      kutu.innerHTML = `<svg class="f41-svg" viewBox="0 0 ${dar ? 360 : 420} ${dar ? 300 : 290}" role="img" aria-label="Valsalva manevrasına MAP ve kalp hızı yanıtı; normal ile karşılaştırma">
        ${G.s}<path class="f41-normk" data-o="nm"/><path class="f41-normk" data-o="nh"/>
        <path class="f41-cmap" data-o="cm"/><path class="f41-chr" data-o="ch"/><g data-o="et"></g></svg>`;
      ['nm', 'nh', 'cm', 'ch', 'et'].forEach((k) => { E[k] = kutu.querySelector(`[data-o="${k}"]`); });
      guncelle();
    }
    const deger = (k, t) => lerp(EGRI[onceki][k](t), EGRI[sec][k](t), mf);
    function guncelle() {
      const nrm = sec !== 'normal';
      E.nm.setAttribute('d', nrm ? G.yol(EGRI.normal.map, G.YM, 30) : ''); E.nh.setAttribute('d', nrm ? G.yol(EGRI.normal.hr, G.YH, 30) : '');
      E.cm.setAttribute('d', G.yol((t) => deger('map', t), G.YM, tCiz)); E.ch.setAttribute('d', G.yol((t) => deger('hr', t), G.YH, tCiz));
      const tam = mf >= 1 && tCiz >= 30;
      E.et.innerHTML = tam ? D[sec].et.map(([s, t, v, m, a]) => {
        const kls = sec === 'normal' ? (s === 'm' ? 'f41-et-m' : 'f41-et-h') : sec === 'otonom' ? 'f41-et-w' : (s === 'm' ? 'f41-et-m' : 'f41-et-h');
        const x = clamp(G.X(t), 0, dar ? 360 : 420);
        return `<text class="f41-et ${kls}" x="${x.toFixed(1)}" y="${(s === 'm' ? G.YM(v) : G.YH(v)).toFixed(1)}" text-anchor="${a}">${m}</text>`;
      }).join('') : '';
      E.lejn.style.display = nrm ? '' : 'none';
      E.yer.textContent = D[sec].yer;
      E.star.style.display = sec === 'kare' ? '' : 'none';
      capYaz(el, D[sec].cap);
    }
    el.addEventListener('click', (e) => {
      const y = e.target.closest('[data-y]');
      if (y) { if (y.dataset.y === sec) return; onceki = mf < 1 ? onceki : sec; sec = y.dataset.y; basSec(el, 'y', sec); mf = RM ? 1 : 0; tCiz = 30; if (RM) onceki = sec; guncelle(); }
      else if (e.target.closest('[data-a="ciz"]')) { onceki = sec; mf = 1; tCiz = RM ? 30 : 0; guncelle(); }
    });
    ciz();
    const dur = ticker(el, (dt) => {
      if (mf < 1) { mf = Math.min(1, mf + dt / 0.6); if (mf >= 1) onceki = sec; guncelle(); }
      else if (tCiz < 30) { tCiz = Math.min(30, tCiz + dt * 10); guncelle(); }
    });
    return () => { dur(); W.kapat(); };
  };
})();
