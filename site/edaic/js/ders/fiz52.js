/* Bölüm 52 · Sinir aksiyon potansiyeli ve yayılması · bileşenler (tarif: docs/tasarim/fiz52.md; K1 s. 225–230).
   Modeller şematiktir; zamanlama ve hızlar temsilîdir, her bileşenin altında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const mn = (v) => String(v).replace('-', '−');
  const sg = (v) => (v > 0 ? '+' + v : mn(v));
  const f1 = (p) => p.toFixed(1);
  const EK = (t) => `E<tspan dy="3" font-size="11">K</tspan><tspan dy="-3">${t}</tspan>`;
  const ENA = (t) => `E<tspan dy="3" font-size="11">Na</tspan><tspan dy="-3">${t}</tspan>`;

  /* tekdüze (monoton) kübik arakesit: aşım yapmaz */
  function mono(pts) {
    const n = pts.length, x = pts.map((p) => p[0]), y = pts.map((p) => p[1]), d = [], m = [];
    for (let i = 0; i < n - 1; i++) d[i] = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
      const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
    }
    return (v) => {
      if (v <= x[0]) return y[0];
      if (v >= x[n - 1]) return y[n - 1];
      let i = 0; while (v > x[i + 1]) i++;
      const h = x[i + 1] - x[i], t = (v - x[i]) / h, t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * y[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * y[i + 1] + (t3 - t2) * h * m[i + 1];
    };
  }
  // ortak şematik aksiyon potansiyeli (tarif tablosu)
  const AP = mono([[0, -70], [0.3, -62], [0.55, -55], [0.8, -10], [1, 30], [1.4, 10], [1.9, -40], [2.4, -70], [3, -82], [3.8, -78], [4.6, -72], [6, -70]]);
  // göreli geçirgenlik (log uzayında arakesit)
  const PNA_ = mono([[0, Math.log10(0.2)], [0.3, Math.log10(0.35)], [0.55, Math.log10(2)], [0.75, Math.log10(30)], [0.9, 2], [1.2, Math.log10(30)], [1.6, Math.log10(3)], [2, 0], [2.6, Math.log10(0.5)], [3.5, Math.log10(0.25)], [6, Math.log10(0.2)]]);
  const PK_ = mono([[0, 0], [0.6, Math.log10(1.1)], [0.9, Math.log10(2)], [1.3, Math.log10(8)], [1.8, Math.log10(25)], [2, Math.log10(30)], [2.6, Math.log10(22)], [3.2, 1], [4, Math.log10(4)], [4.8, Math.log10(1.5)], [6, 0]]);
  const PNa = (t) => Math.pow(10, PNA_(t)), PK = (t) => Math.pow(10, PK_(t));

  const hdr = (vb, label, inner, extra = '') => `<svg class="f52-svg" viewBox="0 0 ${vb[0]} ${vb[1]}" role="img" aria-label="${label}">${extra}${inner}</svg>`;
  const capOf = (el) => el.closest('.viz').querySelector('.viz-cap');
  const setCap = (el, html) => { const c = capOf(el); if (c) c.innerHTML = REF(html); };
  const pathOf = (fn, t0, t1, n, gx, gy) => { let d = ''; for (let i = 0; i <= n; i++) { const t = lerp(t0, t1, i / n); d += (i ? 'L' : 'M') + f1(gx(t)) + ' ' + f1(gy(fn(t))); } return d; };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const mrk = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="${cls}"/></marker>`;

  /* ortak Vm çerçevesi: eksen −90…+50 mV, zaman 0–6 ms */
  function vmFrame(x0, y0, w, h, o = {}) {
    const gx = (t) => x0 + (t / 6) * w, gy = (v) => y0 + ((50 - v) / 140) * h;
    let s = '';
    [-90, -70, -55, -30, -10, 10, 30, 50].forEach((v) => { s += `<line class="f52-gr" x1="${x0}" x2="${x0 + w}" y1="${f1(gy(v))}" y2="${f1(gy(v))}"/><text class="f52-tk" x="${x0 - 5}" y="${f1(gy(v) + 4.5)}" text-anchor="end">${sg(v)}</text>`; });
    s += `<line class="f52-ax" x1="${x0}" x2="${x0}" y1="${y0}" y2="${y0 + h}"/>`;
    for (let t = 0; t <= 6; t++) s += `<text class="f52-tk" x="${f1(gx(t))}" y="${f1(y0 + h + 17)}" text-anchor="middle">${t}</text>`;
    if (!o.noTitle) s += `<text class="f52-mu" x="${x0 + w / 2}" y="${f1(y0 + h + 35)}" text-anchor="middle">Zaman (ms)</text>`;
    s += `<text class="f52-mu" transform="rotate(-90 11 ${f1(y0 + h / 2)})" x="11" y="${f1(y0 + h / 2)}" text-anchor="middle">Membran potansiyeli (mV)</text>`;
    const L = (v, cls, col, txt, up) => `<line class="f52-ref" style="stroke:var(${col})" x1="${x0}" x2="${x0 + w}" y1="${f1(gy(v))}" y2="${f1(gy(v))}"/><text class="f52-tx" style="fill:var(${col})" x="${x0 + w - 3}" y="${f1(gy(v) + (up === false ? 16 : -4))}" text-anchor="end">${txt}</text>`;
    if (!o.noLines) {
      s += L(50, '', '--warn', ENA(' ≈ +50 mV'), false) + L(-55, '', '--crit', 'eşik −55 mV') + L(-70, '', '--muted', 'RMP −70 mV') + L(-90, '', '--c-basic', EK(' ≈ −90 mV'));
    }
    return { svg: s, gx, gy };
  }

  /* ---------- 1 · Ya hep ya hiç ---------- */
  VIZ.f52_esik = (el) => {
    const X0 = 46, W = 364, Y0 = 14, H = 190;
    const F = vmFrame(X0, Y0, W, H, { noLines: true });
    const { gx, gy } = F;
    let lines = '';
    lines += `<rect x="${X0}" y="${f1(gy(-40))}" width="${W}" height="${f1(gy(-55) - gy(-40))}" fill="var(--crit-soft)" opacity=".55"/>`;
    lines += `<line class="f52-ref" style="stroke:var(--crit)" x1="${X0}" x2="${X0 + W}" y1="${f1(gy(-55))}" y2="${f1(gy(-55))}"/><text class="f52-tx" style="fill:var(--crit)" x="${X0 + W - 3}" y="${f1(gy(-55) + 16)}" text-anchor="end">eşik ≈ −55 mV</text>`;
    lines += `<text class="f52-mu" x="${X0 + W - 3}" y="${f1(gy(-40) - 4)}" text-anchor="end">eşik çoğu kez −55…−40</text>`;
    lines += `<line class="f52-ref" style="stroke:var(--muted)" x1="${X0}" x2="${X0 + W}" y1="${f1(gy(-70))}" y2="${f1(gy(-70))}"/><text class="f52-tx" style="fill:var(--muted)" x="${X0 + W - 3}" y="${f1(gy(-70) + 16)}" text-anchor="end">RMP −70 mV</text>`;
    const SY = 244;
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 372" role="img" aria-label="Uyaranın büyüklüğüne göre membran potansiyeli: eşik altında sönen yanıt, eşik üstünde aynı genlikli aksiyon potansiyeli">
      ${F.svg}${lines}<g class="f52-tr"></g>
      <text class="f52-mu" x="${X0}" y="${SY - 6}">uyaran</text>
      <line class="f52-ax" x1="${X0}" x2="${X0 + W}" y1="${SY + 30}" y2="${SY + 30}"/>
      <rect class="f52-st" x="${X0}" width="${f1(0.3 * W / 6)}" fill="var(--accent)" rx="2"/>
      <g class="f52-bars">
        <text class="f52-tx" x="12" y="298" style="fill:var(--warn)">Na⁺ girişi</text>
        <rect x="150" y="285" width="258" height="14" rx="4" fill="var(--chip)"/><rect class="f52-bna" x="150" y="285" width="10" height="14" rx="4" fill="var(--warn)"/>
        <text class="f52-tx" x="12" y="322" style="fill:var(--c-basic)">K⁺ çıkışı (sızıntı)</text>
        <rect x="150" y="309" width="258" height="14" rx="4" fill="var(--chip)"/><rect class="f52-bk" x="150" y="309" width="10" height="14" rx="4" fill="var(--c-basic)"/>
        <text class="f52-tx f52-bt" x="12" y="352"></text>
      </g></svg>
      <div class="f52-ctl">
        <label class="f52-rng"><span>Uyaranın ulaştırdığı potansiyel <b data-o="s"></b></span><input type="range" min="-68" max="-40" step="1" value="-62" aria-label="Uyaranın ulaştırdığı potansiyel (mV)"></label>
        <div class="f52-row"><button type="button" class="btn" data-a="uyar">Uyar</button><button type="button" class="btn ghost" data-a="temizle">Temizle</button><span class="f52-badge" data-o="rozet">Yanıt: YOK</span><span class="f52-badge ac" data-o="tepe" hidden>Tepe: +30 mV · süre aynı</span></div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const inp = $('input'), trG = $('.f52-tr'), st = $('.f52-st');
    const SUR = 1.2;
    let traces = [], cur = null, timer = 0;
    const eşik = (s) => s >= -55;
    const Vof = (s) => {
      if (!eşik(s)) return (t) => (t <= 0.3 ? -70 + (s + 70) * (t / 0.3) : -70 + (s + 70) * Math.exp(-(t - 0.3) / 0.5));
      const sh = Math.min(0.25, 0.55 * (1 - 15 / (s + 70)));
      return (t) => { const a = 0.55 - sh; return AP(t <= a ? (t * 0.55) / a : t + sh); };
    };
    const kapak = (s) => {
      if (s < -55) return `<b>Uyaran membranı ${mn(s)} mV'a kadar depolarize ediyor.</b> Eşiğin altında: K⁺ sızıntı kanallarından çıkış Na⁺ girişini aşar ve membran −70 mV'a döner. Uyaranı büyütüp yeniden uyarın. [[K1 s. 225]]`;
      if (s <= -50) return `<b>Uyaran eşiğe (${mn(s)} mV) ulaştı.</b> Voltaj kapılı Na⁺ kanalları belirgin açılır, Na⁺ girişi K⁺ çıkışını aşar ve aksiyon potansiyeli doğar: tepe ≈ +30 mV. [[K1 s. 225]]`;
      return `<b>Daha büyük uyaran (${mn(s)} mV).</b> Aksiyon potansiyeli yine aynı genlik ve sürededir: ya hep ya hiç. Büyük uyaran yalnız eşiğe biraz daha erken ulaştırır. [[K1 s. 225]]`;
    };
    const barlar = (s, ap) => {
      const na = ap ? 250 : 40 + (s + 70) * 2, k = ap ? 120 : 190;
      $('.f52-bna').setAttribute('width', na); $('.f52-bk').setAttribute('width', k);
      $('.f52-bt').textContent = ap ? 'Na⁺ girişi > K⁺ çıkışı → aksiyon potansiyeli' : 'K⁺ çıkışı baskın → −70 mV’a dönüş';
      $('.f52-bt').style.fill = ap ? 'var(--ok)' : 'var(--muted)';
      const r = $('[data-o=rozet]'); r.textContent = ap ? 'Yanıt: AKSİYON POTANSİYELİ' : 'Yanıt: YOK'; r.className = 'f52-badge ' + (ap ? 'ok' : '');
      $('[data-o=tepe]').hidden = !ap;
    };
    const stim = (s) => { const h = 2 + ((s + 68) / 28) * 26; st.setAttribute('height', f1(h)); st.setAttribute('y', f1(SY + 30 - h)); $('[data-o=s]').textContent = mn(s) + ' mV'; };
    const pts = (s, upto) => { const V = Vof(s); let d = ''; const n = Math.round(upto * 40); for (let i = 0; i <= n; i++) { const t = i / 40; d += (i ? 'L' : 'M') + f1(gx(t)) + ' ' + f1(gy(V(t))); } return d; };
    function uyar() {
      const s = +inp.value;
      traces.forEach((t) => t.el.setAttribute('class', 'f52-ln f52-faint'));
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('class', 'f52-ln'); p.setAttribute('stroke', 'var(--accent)'); p.setAttribute('stroke-width', 3);
      trG.appendChild(p); traces.push({ el: p });
      while (traces.length > 5) traces.shift().el.remove();
      cur = { s, p, t: RM ? SUR : 0 };
      cap(s); barlar(s, false); if (RM) bitir();
      draw();
    }
    function cap(s) { setCap(el, kapak(s)); }
    function draw() { if (!cur) return; const u = clamp(cur.t / SUR, 0, 1); cur.p.setAttribute('d', pts(cur.s, u * 6)); if (eşik(cur.s) && u * 6 >= 0.5) barlar(cur.s, true); }
    function bitir() { cur.t = SUR; draw(); barlar(cur.s, eşik(cur.s)); cur = null; }
    $('[data-a=uyar]').onclick = uyar;
    $('[data-a=temizle]').onclick = () => { traces.forEach((t) => t.el.remove()); traces = []; cur = null; barlar(+inp.value, false); };
    inp.addEventListener('input', () => { stim(+inp.value); cap(+inp.value); clearTimeout(timer); timer = setTimeout(uyar, 300); });
    const stop = ticker(el, (dt) => { if (!cur) return; cur.t += dt; draw(); if (cur.t >= SUR) bitir(); });
    stim(-62);
    // ilk iz: varsayılan uyaran, tamamlanmış
    uyar(); if (cur) bitir();
    return () => { stop(); clearTimeout(timer); };
  };

  /* ---------- 2 · Adım adım: kanallar, Vm, geçirgenlik ---------- */
  VIZ.f52_ap = (el) => {
    const X0 = 46, W = 364, GY0 = 232, GH = 150, PY0 = 452, PH = 120;
    const F = vmFrame(X0, GY0, W, GH, { noTitle: true });
    const { gx, gy } = F;
    const gp = (p) => PY0 + ((2 - Math.log10(p)) / 3) * PH;
    let perm = '';
    [0.1, 1, 10, 100].forEach((p) => { perm += `<line class="f52-gr" x1="${X0}" x2="${X0 + W}" y1="${f1(gp(p))}" y2="${f1(gp(p))}"/><text class="f52-tk" x="${X0 - 5}" y="${f1(gp(p) + 4.5)}" text-anchor="end">${String(p).replace('.', ',')}</text>`; });
    perm += `<line class="f52-ax" x1="${X0}" x2="${X0}" y1="${PY0}" y2="${PY0 + PH}"/><text class="f52-mu" transform="rotate(-90 11 ${PY0 + PH / 2})" x="11" y="${PY0 + PH / 2}" text-anchor="middle">Göreli geçirgenlik</text>`;
    for (let t = 0; t <= 6; t++) perm += `<text class="f52-tk" x="${f1(gx(t))}" y="${PY0 + PH + 17}" text-anchor="middle">${t}</text>`;
    perm += `<text class="f52-mu" x="${X0 + W / 2}" y="${PY0 + PH + 35}" text-anchor="middle">Zaman (ms)</text>`;
    const curv = (fn, gyf, col, id) => `<path class="f52-ln f52-faint" stroke="${col}" stroke-width="2.4" d="${pathOf(fn, 0, 6, 120, gx, gyf)}"/><path class="f52-ln ${id}" stroke="${col}" stroke-width="3.6" d=""/>`;
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 610" role="img" aria-label="Aksiyon potansiyeli evreleri: membran yaması ve kanal durumları, membran potansiyeli eğrisi ve Na⁺ ile K⁺ geçirgenliği">
      <defs>${mrk('f52-ap-ar', 'f52-mk')}</defs>
      <style>.f52-mk{fill:var(--ink)}</style>
      <text class="f52-mu" x="6" y="66">ECF</text><text class="f52-mu" x="6" y="136">ICF</text>
      <rect x="40" y="78" width="372" height="30" rx="4" fill="var(--chip)" stroke="var(--line)"/>
      <g class="f52-chg"></g><g class="f52-chn"></g><g class="f52-ball"></g>
      <text class="f52-tx f52-b" x="414" y="206" text-anchor="end" style="font-size:22px"><tspan class="f52-vm">−70 mV</tspan></text>
      <text class="f52-tx" x="70" y="22" text-anchor="middle" style="fill:var(--warn)">Na⁺ kanalı</text>
      <text class="f52-tx" x="210" y="22" text-anchor="middle" style="fill:var(--c-basic)">K⁺ kanalı (VG)</text>
      <text class="f52-tx" x="350" y="22" text-anchor="middle" style="fill:var(--c-basic)">K⁺ sızıntı</text>
      <text class="f52-mu f52-st1" x="70" y="178" text-anchor="middle"></text><text class="f52-mu f52-st2" x="210" y="178" text-anchor="middle"></text><text class="f52-mu" x="350" y="178" text-anchor="middle">hep açık</text>
      <text class="f52-tx f52-loop" x="6" y="224" style="fill:var(--warn)"></text>
      ${F.svg}
      <path class="f52-ln f52-faint" stroke="var(--accent)" stroke-width="2.4" d="${pathOf(AP, 0, 6, 120, gx, gy)}"/><path class="f52-ln f52-vp" stroke="var(--accent)" stroke-width="3.6" d=""/>
      <g class="f52-ul"></g><circle class="f52-cur" r="6" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/>
      <text class="f52-tx f52-b f52-evre" style="fill:var(--accent-ink)"></text>
      ${perm}${curv(PNa, gp, 'var(--warn)', 'f52-pn')}${curv(PK, gp, 'var(--c-basic)', 'f52-pk')}
      <line class="f52-pcur" stroke="var(--muted)" stroke-dasharray="3 3" y1="${PY0}" y2="${PY0 + PH}"/>
      <text class="f52-tx" x="${X0 + 8}" y="${PY0 + 16}" style="fill:var(--warn)">Na⁺</text><text class="f52-tx" x="${X0 + 52}" y="${PY0 + 16}" style="fill:var(--c-basic)">K⁺</text>
    </svg>
    <div class="f52-ctl"><div class="f52-dots" role="group" aria-label="Adım"></div>
      <div class="f52-row"><button type="button" class="btn ghost" data-a="geri">Geri</button><button type="button" class="btn ghost" data-a="ileri">İleri</button><button type="button" class="btn" data-a="oynat">Oynat</button><button type="button" class="btn ghost" data-a="basa">Baştan</button></div></div>`;
    const $ = (s) => el.querySelector(s);
    const dots = $('.f52-dots'); dots.innerHTML = [1, 2, 3, 4, 5, 6, 7].map((i) => `<button type="button" data-i="${i - 1}" aria-label="Adım ${i}">${i}</button>`).join('');
    const TS = [0, 0.3, 0.55, 0.85, 1.0, 1.9, 3.2];
    const NAS = ['kapalı', 'birkaç kanal açılıyor', 'çoğu açılıyor', 'açık', 'inaktive (refrakter)', 'inaktive (refrakter)', 'inaktiveden kapalıya'];
    const KS = ['kapalı', 'kapalı', 'kapalı', 'kapalı', 'açılıyor', 'açık', 'kapanıyor'];
    const NAG = [2, 6, 10, 16, 16, 16, 5], KG = [2, 2, 2, 2, 8, 16, 8]; // kanal aralığı
    const EVR = ['', 'uyaran', 'eşik', 'yükseliş', 'tepe ≈ +30', 'repolarizasyon', 'ardıl hiperpolarizasyon'];
    const KAP = [
      "<b>1 · İstirahat.</b> Membran potansiyeli ≈ −70 mV; K⁺ sızıntı kanalları açık olduğundan E<sub>K</sub>'ya (≈ −90 mV) görece yakındır (Bölüm 51). İleri'ye basın. [[K1 s. 225]]",
      "<b>2 · Uyaran.</b> Duyusal reseptörde, sinapsta ya da sinirin başka bir yerinde başlayan depolarizasyon Na⁺ ve K⁺ hareketlerine yol açar. Uyaran küçükse sızıntıdan K⁺ çıkışı ağır basar ve membran −70 mV'a döner. [[K1 s. 225]]",
      "<b>3 · Eşik (≈ −55 mV).</b> Voltaj kapılı Na⁺ kanalları belirgin açılır ve Na⁺ girişi K⁺ çıkışını aşar; depolarizasyon daha çok kanal açar: kendini besleyen döngü. [[K1 s. 225]]",
      "<b>4 · Yükseliş.</b> Na⁺ geçirgenliği hızla artar ve membranı Na⁺'un Nernst potansiyeline (≈ +50 mV) doğru sürer. [[K1 s. 225–226]]",
      "<b>5 · Tepe ≈ +30 mV.</b> E<sub>Na</sub>'ya ulaşılmaz: Na⁺ kanalları inaktive (refrakter) duruma geçer ve depolarizasyonun yavaşça açtığı voltaj kapılı K⁺ kanalları açılır. [[K1 s. 225]]",
      "<b>6 · Repolarizasyon.</b> K⁺ çıkışı membranı E<sub>K</sub>'ya (≈ −90 mV) doğru geri iter. [[K1 s. 225]]",
      "<b>7 · Ardıl hiperpolarizasyon.</b> Voltaj kapılı K⁺ kanalları yavaş kapandığından membran kısa süre istirahattekinden daha çok K⁺ geçirgendir; potansiyel RMP'nin altına, E<sub>K</sub>'ya yaklaşır, sonra −70 mV'a döner. Özet: önce kısa Na⁺, sonra daha yavaş K⁺ iletkenliği artışı. [[K1 s. 225]]",
    ];
    const CX = [70, 210, 350];
    let adim = 0, tc = 0, hedef = 0, oyn = false, bekle = 0, ph = 0;
    const chan = (cx, g, col, extra = '') => `<rect x="${cx - g / 2 - 16}" y="68" width="16" height="50" rx="3" fill="${col}" opacity=".85"/><rect x="${cx + g / 2}" y="68" width="16" height="50" rx="3" fill="${col}" opacity=".85"/>${extra}`;
    function chanSvg() {
      let s = chan(CX[0], NAG[adim], 'var(--warn)');
      if (adim === 0) s += `<rect x="${CX[0] - 3}" y="88" width="6" height="10" fill="var(--warn)"/>`;
      if (adim === 4 || adim === 5) s += `<line x1="${CX[0] - 6}" y1="120" x2="${CX[0] + 4}" y2="${126}" stroke="var(--warn)" stroke-width="2"/><circle cx="${CX[0] + 4}" cy="130" r="8" fill="var(--warn)"/>`;
      s += chan(CX[1], KG[adim], 'var(--c-basic)');
      if (adim <= 3) s += `<rect x="${CX[1] - 3}" y="88" width="6" height="10" fill="var(--c-basic)"/>`;
      s += chan(CX[2], 6, 'var(--c-basic)');
      $('.f52-chn').innerHTML = s;
      $('.f52-st1').textContent = NAS[adim]; $('.f52-st2').textContent = KS[adim];
      $('.f52-loop').textContent = adim === 2 ? '↻ depolarizasyon → Na⁺ kanalı ↑ → Na⁺ girişi ↑' : '';
    }
    function ballSvg(t) {
      const ball = (cx, y, col) => `<circle cx="${f1(cx)}" cy="${f1(y)}" r="5" fill="${col}"/>`;
      let s = '';
      const flow = (cx, n, dir, col) => { for (let i = 0; i < n; i++) { const f = RM ? (i + 0.5) / n : ((t * 0.7 + i / n) % 1); const y = dir > 0 ? lerp(34, 150, f) : lerp(150, 34, f); s += ball(cx + (i % 2 ? 2 : -2), y, col); } };
      if (adim === 1) flow(CX[0], 1, 1, 'var(--warn)');
      if (adim === 2) flow(CX[0], 2, 1, 'var(--warn)');
      if (adim === 3) flow(CX[0], 5, 1, 'var(--warn)');
      if (adim === 5) flow(CX[1], 5, -1, 'var(--c-basic)');
      if (adim === 4) flow(CX[1], 2, -1, 'var(--c-basic)');
      if (adim === 6) flow(CX[1], 1, -1, 'var(--c-basic)');
      flow(CX[2], 1, -1, 'var(--c-basic)');
      // sabit iyon sıraları (yön oku)
      if (adim === 3) s += `<line x1="${CX[0] + 24}" y1="44" x2="${CX[0] + 24}" y2="150" stroke="var(--warn)" stroke-width="1.6" marker-end="url(#f52-ap-ar)"/>`;
      if (adim === 5) s += `<line x1="${CX[1] + 24}" y1="150" x2="${CX[1] + 24}" y2="44" stroke="var(--c-basic)" stroke-width="1.6" marker-end="url(#f52-ap-ar)"/>`;
      $('.f52-ball').innerHTML = s;
    }
    function charges(v) {
      const rev = v > 0; let s = '';
      for (let i = 0; i < 13; i++) { const x = 52 + i * 29; if (CX.some((c) => Math.abs(x - c) < 30)) continue; s += `<text class="f52-ch" x="${x}" y="76" text-anchor="middle">${rev ? '−' : '+'}</text><text class="f52-ch" x="${x}" y="130" text-anchor="middle">${rev ? '+' : '−'}</text>`; }
      $('.f52-chg').innerHTML = s;
    }
    let sonRev = null;
    function ciz(t) {
      const v = AP(tc);
      $('.f52-vm').textContent = mn(Math.round(v)) + ' mV';
      if (sonRev !== v > 0) { sonRev = v > 0; charges(v); }
      $('.f52-vp').setAttribute('d', tc > 0.001 ? pathOf(AP, 0, tc, Math.max(2, Math.round(tc * 24)), gx, gy) : '');
      $('.f52-pn').setAttribute('d', tc > 0.001 ? pathOf(PNa, 0, tc, Math.max(2, Math.round(tc * 24)), gx, (p) => gp(p)) : '');
      $('.f52-pk').setAttribute('d', tc > 0.001 ? pathOf(PK, 0, tc, Math.max(2, Math.round(tc * 24)), gx, (p) => gp(p)) : '');
      const cx = gx(tc), cy = gy(v);
      const c = $('.f52-cur'); c.setAttribute('cx', f1(cx)); c.setAttribute('cy', f1(cy));
      const pc = $('.f52-pcur'); pc.setAttribute('x1', f1(cx)); pc.setAttribute('x2', f1(cx));
      const ev = $('.f52-evre'); ev.textContent = EVR[adim];
      const right = cx > 300; ev.setAttribute('text-anchor', right ? 'end' : 'start'); ev.setAttribute('x', f1(right ? cx - 10 : cx + 10)); ev.setAttribute('y', f1(cy - 8 < GY0 + 12 ? cy + 18 : cy - 8));
      $('.f52-ul').innerHTML = adim === 4 ? `<line x1="${f1(gx(1.0) + 14)}" y1="${f1(gy(30))}" x2="${f1(gx(1.0) + 14)}" y2="${f1(gy(50))}" stroke="var(--warn)" stroke-width="1.6" marker-end="url(#f52-ap-ar)"/><text class="f52-tx" x="${f1(gx(1.0) + 22)}" y="${f1(gy(40) + 4)}" style="fill:var(--warn)">ulaşılmaz</text>` : '';
      ballSvg(t);
    }
    function git(i, oto) {
      adim = clamp(i, 0, 6); hedef = TS[adim]; if (RM) tc = hedef;
      dots.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === adim)));
      setCap(el, KAP[adim]); chanSvg(); bekle = 0; if (!oto) oyn = false; $('[data-a=oynat]').textContent = oyn ? 'Duraklat' : 'Oynat'; ciz(ph);
    }
    dots.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) git(+b.dataset.i); });
    $('[data-a=geri]').onclick = () => git(adim - 1);
    $('[data-a=ileri]').onclick = () => git(adim + 1);
    $('[data-a=basa]').onclick = () => { tc = 0; git(0); };
    $('[data-a=oynat]').onclick = () => {
      if (RM) { git(adim >= 6 ? 0 : adim + 1); return; }
      if (adim >= 6 && !oyn) { tc = 0; git(0, true); }
      oyn = !oyn; $('[data-a=oynat]').textContent = oyn ? 'Duraklat' : 'Oynat'; bekle = 1.6;
    };
    git(0);
    const stop = ticker(el, (dt) => {
      ph += dt;
      if (!RM) { const d = hedef - tc; tc = Math.abs(d) < 0.004 ? hedef : tc + d * Math.min(1, dt * 5); }
      if (oyn) { bekle += dt; if (bekle > 2.2) { if (adim >= 6) { oyn = false; $('[data-a=oynat]').textContent = 'Oynat'; } else git(adim + 1, true); } }
      ciz(ph);
    });
    return stop;
  };

  /* ---------- 3 · Miyelinsiz aksonda dalga ---------- */
  VIZ.f52_lokal = (el) => {
    const N = 12, XA = 18, SW = 32, TY = 80, BY = 140;
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 292" role="img" aria-label="Miyelinsiz aksonda aksiyon potansiyelinin yerel akımlarla ilerlemesi">
      <defs>${mrk('f52-lk-a', 'f52-lkm')}</defs><style>.f52-lkm{fill:var(--accent)}</style>
      <text class="f52-mu" x="${XA}" y="24">ECF</text>
      <text class="f52-tx f52-lg" x="410" y="24" text-anchor="end"></text>
      <g class="f52-dyn"></g>
      <line x1="${XA}" x2="${XA + N * SW}" y1="${TY}" y2="${TY}" stroke="var(--ink)" stroke-width="2.5"/><line x1="${XA}" x2="${XA + N * SW}" y1="${BY}" y2="${BY}" stroke="var(--ink)" stroke-width="2.5"/>
      <text class="f52-mu" x="${XA + N * SW - 4}" y="${BY + 22}" text-anchor="end">ICF (aksoplazma)</text>
      <g class="f52-dec"></g>
    </svg>
    <div class="f52-ctl"><div class="f52-row"><button type="button" class="btn" data-a="oynat">Oynat</button><button type="button" class="btn ghost" data-a="adim">Adım</button><button type="button" class="btn ghost" data-a="basa">Baştan</button>
      <label class="f52-chk"><input type="checkbox" checked data-a="azal"> Akım azalmasını göster</label></div></div>`;
    const $ = (s) => el.querySelector(s);
    const KAP = [
      "<b>İstirahat.</b> Membranın iç yüzü (ICF) negatif, dış yüzü (ECF) pozitif yüklü. Oynat'a basın. [[K1 s. 226–227]]",
      "<b>Aksiyon potansiyeli başladı.</b> Uyarılan parçanın iç yüzü pozitifleşti; aksiyon potansiyeli membranın küçük bir parçasıyla sınırlı, komşular sakin. [[K1 s. 226]]",
      "<b>Yerel akımlar.</b> Depolarize bölgenin kenarındaki iyon hareketi akım akıtır ve komşu sakin membranı depolarize eder. Akım birkaç mm'lik uzunluk sabitiyle üstel azalır: bir kısmı membranda yük olarak birikir, bir kısmı ECF'ye sızar. [[K1 s. 226]]",
      "<b>Yayılım.</b> Komşu membrandaki depolarizasyon eşiğe ulaştı: orada yeni aksiyon potansiyeli doğar ve döngü hedefe varana dek sürer. [[K1 s. 226]]",
      "<b>Repolarizasyon dalgası.</b> Geride kalan membran repolarize olur; hemen arkadaki parça refrakter olduğu için akım geriye yeni aksiyon potansiyeli doğuramaz: yayılım tek yönlüdür (bkz. Refrakter dönem). [[K1 s. 227, 230]]",
    ];
    const CP = [null, 0.5, 0.5, 2.5, 6.5]; // evre başına AP merkezi (parça)
    let faz = 0, c = 0, oyn = false, tm = 0, azal = true;
    const OUT = 11.5;
    function ciz() {
      const has = faz >= 1;
      let s = '';
      for (let i = 0; i < N; i++) {
        const m = i + 0.5, x = XA + i * SW;
        const ap = has && Math.abs(m - c) <= 1;
        const refr = faz >= 4 && m >= c - 3 && m < c - 1;
        s += `<rect x="${x}" y="${TY}" width="${SW}" height="${BY - TY}" fill="${ap ? 'var(--warn-soft)' : refr ? 'var(--crit-soft)' : 'var(--chip)'}" opacity="${ap || refr ? 1 : 0.65}"/>`;
        s += `<text class="f52-ch" x="${x + SW / 2}" y="${TY - 7}" text-anchor="middle">${ap ? '−' : '+'}</text><text class="f52-ch" x="${x + SW / 2}" y="${TY + 20}" text-anchor="middle" style="fill:${ap ? 'var(--ink)' : 'var(--muted)'}">${ap ? '+' : '−'}</text>`;
      }
      if (faz >= 4) {
        const xr = XA + (c - 2) * SW; if (xr > XA + 30) s += `<text class="f52-tx" x="${f1(xr)}" y="${BY - 10}" text-anchor="middle" style="fill:var(--crit)">refrakter</text>`;
      }
      if (faz === 1) s += `<text class="f52-tx" x="${XA}" y="52" style="fill:var(--accent-ink)">Uyaran ↓</text>`;
      if (faz >= 2) {
        const xf = XA + (c + 1) * SW, a = xf - 14, b = xf + 46;
        const col = 'stroke="var(--accent)" stroke-width="2.4" fill="none"';
        s += `<path d="M${a} 112 H${b - 8}" ${col} marker-end="url(#f52-lk-a)"/><path d="M${b - 8} 112 H${b} V60 H${a + 8}" ${col} marker-end="url(#f52-lk-a)"/><path d="M${a + 8} 60 H${a} V112" ${col}/>`;
        s += `<text class="f52-tx" x="${(a + b) / 2}" y="${50}" text-anchor="middle" style="fill:var(--accent-ink)">yerel akım</text>`;
        if (faz >= 4 && c > 2.2) { const xb = XA + (c - 1) * SW; s += `<path d="M${xb + 14} 112 H${xb - 46} V60 H${xb + 14}" stroke="var(--accent)" stroke-width="2" fill="none" opacity=".3"/><text class="f52-b" x="${xb - 16}" y="92" text-anchor="middle" style="font:800 22px var(--f-display);fill:var(--crit)">×</text>`; }
      }
      $('.f52-dyn').innerHTML = s;
      $('.f52-lg').innerHTML = faz >= 4 ? '<tspan style="fill:var(--warn)">depolarizasyon →</tspan> <tspan style="fill:var(--c-basic)">repolarizasyon →</tspan>' : '';
      // akım azalması paneli
      const dc = $('.f52-dec');
      const sv = el.querySelector('svg'); sv.setAttribute('viewBox', '0 0 420 ' + (azal && faz >= 2 ? 292 : 176));
      if (!azal || faz < 2) { dc.innerHTML = ''; return; }
      const xf = XA + (c + 1) * SW, yb = 268, A = 56, thr = A * 0.4, lam = 62;
      const xe = Math.min(410, xf + 190);
      let d = ''; for (let x = xf; x <= xe; x += 4) d += (x === xf ? 'M' : 'L') + f1(x) + ' ' + f1(yb - A * Math.exp(-(x - xf) / lam));
      const xc = xf + lam * Math.log(A / thr);
      dc.innerHTML = `<line class="f52-ax" x1="${XA}" x2="410" y1="${yb}" y2="${yb}"/><line class="f52-ref" style="stroke:var(--crit)" x1="${XA}" x2="410" y1="${yb - thr}" y2="${yb - thr}"/>
        <text class="f52-tx" x="${XA}" y="${yb - thr - 5}" style="fill:var(--crit)">eşik</text>
        <path class="f52-ln" stroke="var(--accent)" stroke-width="3" d="${d}"/>
        <path class="f52-ln" stroke="var(--ok)" stroke-width="5" d="${d.split('L').filter((p, i) => i === 0 || +p.split(' ')[0] <= xc + 4).join('L')}"/>
        <text class="f52-mu" x="${XA}" y="${yb - 2 - 0}" style="display:none"></text>
        <text class="f52-mu" x="${XA}" y="${yb + 16}">komşu membranda depolarizasyon · uzunluk sabiti: birkaç mm</text>
        <text class="f52-tx" x="410" y="${yb - A - 8}" text-anchor="end" style="fill:var(--ok)">eşiğe ulaştı → yeni AP</text>`;
    }
    function git(f) {
      faz = clamp(f, 0, 4); c = CP[faz] || 0.5;
      setCap(el, KAP[faz]); ciz();
    }
    $('[data-a=azal]').onchange = (e) => { azal = e.target.checked; ciz(); };
    $('[data-a=adim]').onclick = () => { oyn = false; $('[data-a=oynat]').textContent = 'Oynat'; git(faz >= 4 ? 0 : faz + 1); };
    $('[data-a=basa]').onclick = () => { oyn = false; $('[data-a=oynat]').textContent = 'Oynat'; git(0); };
    $('[data-a=oynat]').onclick = () => {
      if (RM) { git(4); return; }
      if (faz >= 4 && !oyn) git(0);
      oyn = !oyn; if (oyn && faz === 0) tm = 0; $('[data-a=oynat]').textContent = oyn ? 'Duraklat' : 'Oynat';
      if (oyn && faz > 0) tm = faz === 1 ? 0.3 : faz === 2 ? 1.0 : 1.8 + (c - 0.5) / 1.7;
    };
    git(RM ? 4 : 0);
    const stop = ticker(el, (dt) => {
      if (!oyn) return;
      tm += dt;
      let f, cc;
      if (tm < 0.7) { f = 1; cc = 0.5; } else if (tm < 1.8) { f = 2; cc = 0.5; } else { cc = 0.5 + (tm - 1.8) * 1.7; f = cc < 3.5 ? 3 : 4; if (cc >= OUT) { cc = OUT; oyn = false; $('[data-a=oynat]').textContent = 'Baştan'; f = 4; } }
      if (f !== faz) { faz = f; setCap(el, KAP[faz]); }
      c = cc; ciz();
    });
    return stop;
  };

  /* ---------- 4 · Akson bir kablo: çap, miyelin, sıcaklık ---------- */
  VIZ.f52_hiz = (el) => {
    const DS = [0.4, 0.6, 0.8, 1, 1.2, 2, 3, 5, 8, 12, 16, 20];
    let di = 3, mi = false, T = 37, pt = 99;
    const VX = (v) => 20 + (Math.log(v / 0.1) / Math.log(2000)) * 380;
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 340" role="img" aria-label="Akson kablo eşdeğeri: uzunlamasına direnç, transmembran direnç, kapasitans ve darbe hızı">
      <text class="f52-mu" x="210" y="18" text-anchor="middle">τ = R<tspan dy="3" font-size="11">m</tspan><tspan dy="-3">·C</tspan><tspan dy="3" font-size="11">m</tspan><tspan dy="-3">: miyelin R ↑, C ↓ → τ etkisi dengelenir</tspan></text>
      <g class="f52-cab"></g>
      <text class="f52-tx" x="20" y="236">İletim hızı (m/s, logaritmik)</text>
      <rect x="20" y="246" width="380" height="14" rx="6" fill="var(--chip)"/><circle class="f52-pd" cy="253" r="7" fill="var(--warn)" cx="20"/>
      <text class="f52-tx" x="${VX(2)}" y="282" text-anchor="middle">miyelinsiz ≈ 2</text>
      <text class="f52-tx" x="${VX(120) + 12}" y="282" text-anchor="end">miyelinli → 120</text>
      <line class="f52-ax" x1="20" x2="400" y1="298" y2="298"/>
      ${[0.5, 2, 4, 30, 70, 120].map((v) => `<line class="f52-ax" x1="${f1(VX(v))}" x2="${f1(VX(v))}" y1="294" y2="302"/><text class="f52-tk" x="${f1(VX(v))}" y="318" text-anchor="middle">${String(v).replace('.', ',')}</text>`).join('')}
      <path class="f52-mv" fill="var(--accent)"/><line class="f52-mvl" stroke="var(--accent)" stroke-width="2" y1="262" y2="298"/>
    </svg>
    <div class="f52-ctl">
      <label class="f52-rng"><span>Akson çapı <b data-o="d"></b></span><input type="range" min="0" max="11" step="1" value="3" data-r="d" aria-label="Akson çapı"></label>
      <div class="f52-row"><span class="f52-tx" style="font:650 14px var(--f-display)">Miyelin</span>${segHtml('Miyelin', 'mi', [['0', 'Yok'], ['1', 'Var']], '0')}</div>
      <label class="f52-rng"><span>Sıcaklık <b data-o="T"></b></span><input type="range" min="27" max="37" step="1" value="37" data-r="T" aria-label="Sıcaklık"></label>
      <div class="f52-row"><button type="button" class="btn" data-a="gonder">Darbe gönder</button></div>
      <div class="f52-read"><div><span class="k">İletim hızı (model)</span><b data-o="v"></b></div><div><span class="k">Na⁺ kanalı açılma hızı</span><b data-o="k"></b></div><div><span class="k">Not</span><b data-o="not" style="font-size:14px"></b></div></div></div>`;
    const $ = (s) => el.querySelector(s);
    const hizOf = () => { const d = DS[di]; return (mi ? 6 * d : 2 * Math.sqrt(d)) * Math.pow(1.8, (T - 37) / 10); };
    const lv = (a) => (a ? 'yüksek' : 'düşük');
    function kablo() {
      const d = DS[di], th = 8 + (Math.log(d / 0.4) / Math.log(50)) * 48, cy = 70, hl = th / 2;
      let s = '';
      if (mi) { const segs = 5, L = 380, nw = 14, sl = (L - (segs - 1) * nw) / segs; for (let i = 0; i < segs; i++) s += `<rect x="${f1(20 + i * (sl + nw))}" y="${f1(cy - hl - 9)}" width="${f1(sl)}" height="${f1(th + 18)}" rx="8" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/>`; }
      s += `<rect x="20" y="${f1(cy - hl)}" width="380" height="${f1(th)}" fill="var(--chip)" stroke="var(--ink)" stroke-width="1.5" ${mi ? 'opacity=".9"' : ''}/>`;
      // Ri zinciri
      const zz = (x0, x1, y, a) => { let p = `M${x0} ${y}`; const n = 8, w = (x1 - x0) / n; for (let i = 0; i < n; i++) p += ` L${f1(x0 + w * (i + 0.5))} ${y + (i % 2 ? a : -a)}`; return p + ` L${x1} ${y}`; };
      s += `<path d="${zz(34, 150, cy, Math.min(10, hl * 0.6 + 1))}" fill="none" stroke="var(--accent)" stroke-width="${d < 2 ? 1.8 : 3.2}"/>`;
      const yb = cy + hl + (mi ? 9 : 0);
      s += `<text class="f52-tx" x="92" y="${f1(yb + 24)}" text-anchor="middle" style="fill:var(--accent-ink)">R<tspan dy="3" font-size="11">i</tspan><tspan dy="-3"> ${lv(d < 2)}</tspan></text>`;
      // Rm ve Cm dalları
      const gy0 = yb + 2, gy1 = 206;
      const rm = `M262 ${gy0} V${gy0 + 8} ${zz2(262, gy0 + 8, 40, 7)}`;
      function zz2(x, y0, len, a) { let p = ''; const n = 6, w = len / n; for (let i = 0; i < n; i++) p += ` L${x + (i % 2 ? a : -a)} ${f1(y0 + w * (i + 0.5))}`; return p + ` L${x} ${y0 + len}`; }
      s += `<path d="${rm} V${gy1}" fill="none" stroke="var(--crit)" stroke-width="${mi ? 3.4 : 1.8}"/>`;
      s += `<path d="M340 ${gy0} V${gy1 - 36} M326 ${gy1 - 36} H354 M326 ${gy1 - 28} H354 M340 ${gy1 - 28} V${gy1}" fill="none" stroke="var(--c-clin)" stroke-width="${mi ? 1.8 : 3.2}"/>`;
      s += `<line class="f52-ax" x1="250" x2="352" y1="${gy1}" y2="${gy1}"/>`;
      s += `<text class="f52-tx" x="262" y="${gy1 + 20}" text-anchor="middle" style="fill:var(--crit)">R<tspan dy="3" font-size="11">m</tspan><tspan dy="-3"> ${lv(mi)}</tspan></text><text class="f52-tx" x="340" y="${gy1 + 20}" text-anchor="middle" style="fill:var(--c-clin)">C<tspan dy="3" font-size="11">m</tspan><tspan dy="-3"> ${lv(!mi)}</tspan></text>`;
      if (!mi) for (let i = 0; i < 5; i++) s += `<path d="M${170 + i * 18} ${f1(yb + 4)} v14" stroke="var(--crit)" stroke-width="2.2" marker-end="url(#f52-hz-a)"/>`;
      if (mi) s += `<text class="f52-mu" x="${f1(20)}" y="${f1(cy - hl - 14)}">miyelin</text>`;
      if (!mi) s += `<text class="f52-mu" x="170" y="${f1(yb + 44)}">sızıntı</text>`;
      if (mi) s += `<text class="f52-mu" x="210" y="${f1(yb + 24)}">sızıntı yok</text>`;
      $('.f52-cab').innerHTML = s;
    }
    function oku() {
      const d = DS[di], v = hizOf(), k = Math.pow(3.5, (T - 37) / 10);
      $('[data-o=d]').textContent = fmt(d, d < 1 ? 1 : d % 1 ? 1 : 0) + ' μm'; $('[data-o=T]').textContent = T + ' °C';
      $('[data-o=v]').textContent = '≈ ' + fmt(v) + ' m/s'; $('[data-o=k]').textContent = '×' + fmt(k, 2);
      $('[data-o=not]').textContent = !mi && d > 2 ? 'kalın aksonlar normalde miyelinlidir' : '10 °C’de 3–4 kat';
      const x = VX(clamp(v, 0.1, 200)); $('.f52-mv').setAttribute('d', `M${f1(x)} 296 l-7 -12 h14z`); const l = $('.f52-mvl'); l.setAttribute('x1', f1(x)); l.setAttribute('x2', f1(x)); l.setAttribute('y1', 262); l.setAttribute('y2', 284);
    }
    function kapak(neden) {
      const d = DS[di], v = fmt(hizOf());
      if (neden === 'T' && T < 37) return `<b>${T} °C.</b> İyon kanallarının etkinliği, enzimler gibi, sıcaklığa çok bağlıdır: 10 °C'de açılma hızı 3–4 kat değişir. Soğukta Na⁺ kanalları yavaş açılır ve iletim yavaşlar. [[K1 s. 227]]`;
      if (neden === 'mi' && mi) return `<b>Miyelin eklendi.</b> Yalıtkan lipitler transmembran direnci artırır (ECF'ye sızıntı azalır, uzunlamasına akım en fazla) ve kapasitansı azaltır (polarite daha çabuk değişir). İletim ≈ ${v} m/s. [[K1 s. 226–227]]`;
      if (neden === 'mi') return `<b>Miyelin yok.</b> Düşük transmembran direnç akımı ECF'ye kaçırır, yüksek kapasitans polarite değişimini geciktirir: yayılım yavaşlar. [[K1 s. 226–227]]`;
      if (neden === 'd' && d !== 1) return `<b>Çap ${fmt(d, d % 1 ? 1 : 0)} μm.</b> Bakır tel gibi: kalın aksonun hücre içi sıvısı uzunlamasına akıma daha az direnç gösterir, iletim hızlanır. [[K1 s. 226]]`;
      if (d === 1 && !mi && T === 37) return `<b>Çap 1 μm, miyelinsiz, 37 °C.</b> İnce aksoplazmanın uzunlamasına direnci yüksek, akım membrandan sızıyor: iletim yavaş. Parametreleri değiştirin. [[K1 s. 226–227]]`;
      return `<b>Çap ${fmt(d, d % 1 ? 1 : 0)} μm, ${mi ? 'miyelinli' : 'miyelinsiz'}, ${T} °C.</b> İletim ≈ ${v} m/s (model). [[K1 s. 226–227]]`;
    }
    function gonder() { pt = RM ? 99 : 0; yerlestir(); }
    function yerlestir() {
      const v = hizOf(), fr = clamp((pt * v) / 72, 0, 1);
      $('.f52-pd').setAttribute('cx', f1(20 + fr * 380)); $('.f52-pd').setAttribute('opacity', pt > 8.2 && fr < 1 ? 0.25 : 1);
    }
    const degis = (n) => { kablo(); oku(); setCap(el, kapak(n)); gonder(); };
    $('[data-r=d]').addEventListener('input', (e) => { di = +e.target.value; degis('d'); });
    $('[data-r=T]').addEventListener('input', (e) => { T = +e.target.value; degis('T'); });
    el.querySelectorAll('[data-mi]').forEach((b) => b.addEventListener('click', () => { mi = b.dataset.mi === '1'; basSec(el, 'mi', b.dataset.mi); degis('mi'); }));
    $('[data-a=gonder]').onclick = gonder;
    el.querySelector('svg').insertAdjacentHTML('afterbegin', `<defs>${mrk('f52-hz-a', 'f52-hzm')}</defs><style>.f52-hzm{fill:var(--crit)}</style>`);
    kablo(); oku(); gonder();
    const stop = ticker(el, (dt) => { if (pt <= 8.3) { pt += dt; yerlestir(); } });
    return stop;
  };

  /* ---------- 5 · Miyelinsiz, miyelinli, demiyelinize ---------- */
  VIZ.f52_salto = (el) => {
    const LX = 24, LW = 316, LY = (k) => 6 + k * 132, CY = (k) => LY(k) + 62;
    const AD = ['Miyelinsiz', 'Miyelinli', 'Demiyelinize'];
    const END = 7.2, TM = 1.0, TU = 6.0;
    const SL = (LW - 5 * 10) / 6, XN = (j) => (j === 0 ? LX : j === 6 ? LX + LW : LX + j * (SL + 10) - 5);
    let sec = 1, na = true, t = RM ? END : -1, oyn = false, bitti = false;
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 405" role="img" aria-label="Üç akson yarışı: miyelinsiz, miyelinli sıçrayıcı iletim ve demiyelinize aksonda iletim bloku"><defs>${mrk('f52-sl-a', 'f52-slm')}</defs><style>.f52-slm{fill:var(--accent)}</style><g class="f52-g"></g></svg>
    <div class="f52-ctl"><div class="f52-row">${segHtml('Akson', 'ak', [['0', 'Miyelinsiz'], ['1', 'Miyelinli'], ['2', 'Demiyelinize']], '1')}<button type="button" class="btn" data-a="yaris">Yarışı başlat</button><label class="f52-chk"><input type="checkbox" checked data-a="na"> Na⁺ kanallarını göster</label></div>
      <div class="f52-card" data-o="bilgi"></div></div>`;
    const $ = (s) => el.querySelector(s);
    const BIL = ['Na⁺ kanalları zar boyunca: iletim yavaş ama güvenilir.', 'Na⁺ kanalları boğumlarda: akım internodu pasif ve hızlı geçer; miyelin ECF’ye kaybı önler ve kapasitansı azaltır → komşu boğum eşiğin üstünde depolarize olur.', 'Multipl skleroz (SSS) · Guillain–Barré sendromu (PNS): otoimmün yıkım → duyu, motor, otonom ya da bilişsel işlev kaybı (sinirin tipi ve yerine göre).'];
    const KAP = [
      "<b>Miyelinsiz akson.</b> Na⁺ kanalları zar boyunca dağınık; her parça sırayla aksiyon potansiyeli üretir. İletim yavaş (≈ 2 m/s) ama aksonun bütün boyunca güvenilirdir. [[K1 s. 228–229]]",
      "<b>Miyelinli akson.</b> Na⁺ kanalları boğumlarda yoğun; akım internodu pasif geçer ve dalga boğumdan boğuma atlar. Akson türünü değiştirin ya da yarışı başlatın. [[K1 s. 227–228]]",
      "<b>Demiyelinize akson.</b> Kanallar eski boğumlarda kümelenmiş; kılıf kalkınca açıkta kalan zarda iletimi sürdürecek kadar Na⁺ kanalı yok ve dalga durur. Multipl sklerozda SSS, Guillain–Barré sendromunda PNS nöronları tutulur. [[K1 s. 228–229]]",
    ];
    function lane(k) {
      const cy = CY(k), on = sec === k, hl = (k === 0 ? 6 : 12) * (on ? 1.25 : 1);
      let s = `<g opacity="${on ? 1 : 0.62}">`;
      const ttl = ['Miyelinsiz · ≈ 2 m/s', 'Miyelinli · 120 m/s’ye kadar', 'Demiyelinize · iletim kesilir'][k];
      s += `<text class="f52-tx" x="${LX}" y="${LY(k) + 16}" style="${on ? 'fill:var(--accent-ink);font-weight:800' : ''}">${ttl}</text>`;
      const xn = (j) => XN(j);
      // tüp
      if (k > 0) for (let i = 0; i < 6; i++) { if (k === 2 && (i === 2 || i === 3)) continue; const x = LX + i * (SL + 10); s += `<rect x="${f1(x)}" y="${f1(cy - hl - 8)}" width="${f1(SL)}" height="${f1(hl * 2 + 16)}" rx="8" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/>`; }
      if (k === 2) s += `<rect x="${f1(XN(2))}" y="${f1(cy - hl - 8)}" width="${f1(XN(4) - XN(2))}" height="${f1(hl * 2 + 16)}" fill="var(--crit-soft)" opacity=".7" rx="4"/>`;
      s += `<rect x="${LX}" y="${f1(cy - hl)}" width="${LW}" height="${f1(hl * 2)}" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6" opacity="1"/>`;
      // Na⁺ noktaları
      if (na) {
        if (k === 0) for (let i = 0; i < 14; i++) { const x = LX + 12 + i * 22.5; s += `<circle cx="${f1(x)}" cy="${f1(cy - hl)}" r="3.4" fill="var(--warn)"/><circle cx="${f1(x)}" cy="${f1(cy + hl)}" r="3.4" fill="var(--warn)"/>`; }
        else for (let j = 0; j <= 6; j++) { if (k === 2 && j === 3) continue; const x = xn(j); for (let q = 0; q < 3; q++) s += `<circle cx="${f1(x - 4 + q * 4)}" cy="${f1(cy - hl)}" r="3" fill="var(--warn)"/><circle cx="${f1(x - 4 + q * 4)}" cy="${f1(cy + hl)}" r="3" fill="var(--warn)"/>`; }
      }
      // dalga
      let x = null, st = '', durum = '';
      if (k === 0) {
        if (t >= 0) { const u = clamp(t / TU, 0, 1); x = LX + LW * u; s += `<rect x="${LX}" y="${f1(cy - hl + 1)}" width="${f1(x - LX)}" height="${f1(hl * 2 - 2)}" fill="var(--warn-soft)" opacity=".7"/><ellipse cx="${f1(x)}" cy="${cy}" rx="22" ry="${f1(hl + 8)}" fill="var(--warn)" opacity=".55"/>`; if (u >= 1) durum = 'ok'; }
      } else if (t >= 0) {
        const lim = k === 2 ? 2 : 6, idx = Math.min(lim, (t / TM) * 6), n = Math.floor(idx), fr = idx - n;
        for (let j = 0; j <= n && j <= lim; j++) s += `<circle cx="${f1(xn(j))}" cy="${cy}" r="${j === n && idx < lim ? 11 : 7}" fill="var(--warn)" opacity="${j === n && idx < lim ? 0.9 : 0.35}"/>`;
        if (idx < lim && n < 6) { const a = xn(n), b = xn(n + 1), m = (a + b) / 2; s += `<path d="M${f1(a + 6)} ${f1(cy - hl - 14)} Q${f1(m)} ${f1(cy - hl - 30)} ${f1(lerp(a, b, Math.max(0.15, fr)) )} ${f1(cy - hl - 14)}" fill="none" stroke="var(--accent)" stroke-width="2.6" marker-end="url(#f52-sl-a)"/>`; }
        if (k === 1 && idx >= 6) durum = 'ok';
        if (k === 2 && idx >= 2) { const xx = xn(3); s += `<path d="M${f1(xn(2) + 6)} ${f1(cy - hl - 14)} Q${f1(xn(2) + 40)} ${f1(cy - hl - 30)} ${f1(xx)} ${f1(cy - hl - 6)}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 3" opacity=".7"/>`; if (t >= 0.55) { s += `<text style="font:800 26px var(--f-display);fill:var(--crit)" x="${f1(xx)}" y="${f1(cy + 8)}" text-anchor="middle">×</text>`; durum = 'blok'; } }
      }
      // etiketler
      if (k === 1) s += `<text class="f52-mu" x="${f1(XN(1))}" y="${cy + 42}" text-anchor="middle">Ranvier boğumu</text><text class="f52-mu" x="${f1(LX + 3 * (SL + 10) + SL / 2)}" y="${cy + 42}" text-anchor="middle">internod</text>`;
      if (k === 2) s += `<text class="f52-tx" x="${f1(XN(3))}" y="${cy + 42}" text-anchor="middle" style="fill:var(--crit)">kılıf yıkılmış</text>`;
      s += `<text class="f52-mu" x="${LX}" y="${LY(k) + 122}">${['yavaş ama boydan boya güvenilir', 'PNS: Schwann hücresi · SSS: oligodendrosit', 'açıkta kalan zar: Na⁺ kanalı yetersiz'][k]}</text>`;
      if (durum) s += `<text class="f52-tx f52-b" x="416" y="${LY(k) + 16}" text-anchor="end" style="fill:var(--${durum === 'ok' ? 'ok' : 'crit'})">${durum === 'ok' ? 'vardı ✓' : 'iletim kesildi'}</text>`;
      return s + '</g>';
    }
    function ciz() {
      $('.f52-g').innerHTML = [0, 1, 2].map(lane).join('');
      basSec(el, 'ak', sec); $('[data-o=bilgi]').textContent = BIL[sec];
    }
    function kapakYaz() { setCap(el, KAP[sec] + (bitti ? ' Miyelinli akson önce vardı; demiyelinize aksonda iletim kesildi. [[K1 s. 228]]' : '')); }
    el.querySelectorAll('[data-ak]').forEach((b) => b.addEventListener('click', () => { sec = +b.dataset.ak; kapakYaz(); ciz(); }));
    $('[data-a=na]').onchange = (e) => { na = e.target.checked; ciz(); };
    $('[data-a=yaris]').onclick = () => { if (RM) { t = END; bitti = true; } else { t = 0; oyn = true; bitti = false; } kapakYaz(); ciz(); };
    if (RM) bitti = true;
    kapakYaz(); ciz();
    const stop = ticker(el, (dt) => { if (!oyn) return; t += dt; if (t >= END) { t = END; oyn = false; bitti = true; kapakYaz(); } ciz(); });
    return stop;
  };

  /* ---------- 6 · Lif kesitleri ve hız şeridi ---------- */
  VIZ.f52_lif = (el) => {
    const X = (v) => 12 + (Math.log(v / 0.3) / Math.log(500)) * 396;
    const LIF = { A: { lo: 70, hi: 120, ad: 'A', y: 214, col: '--accent', sure: 0.7 }, B: { lo: 4, hi: 30, ad: 'B', y: 242, col: '--c-clin', sure: 1.6 }, C: { lo: 0.5, hi: 4, ad: 'C', y: 270, col: '--warn', sure: 3.2 } };
    const ALT = { a: 'Aα', b: 'Aβ', g: 'Aγ', d: 'Aδ' };
    const ALTX = { a: 0.9, b: 0.62, g: 0.36, d: 0.1 };
    let sec = 'A', alt = '', pt = 99;
    const kes = (cx, r, ring, ad, l1, l2, on) => `<g opacity="${on ? 1 : 0.55}"><circle cx="${cx}" cy="70" r="${r}" fill="${ring ? 'var(--c-clin-soft)' : 'var(--chip)'}" stroke="${on ? 'var(--accent)' : 'var(--c-clin)'}" stroke-width="${on ? 3.4 : 2}"/>${ring ? `<circle cx="${cx}" cy="70" r="${r - ring}" fill="var(--chip)" stroke="var(--line)"/>` : ''}<text class="f52-tx f52-b" x="${cx}" y="152" text-anchor="middle" style="${on ? 'fill:var(--accent-ink)' : ''}">${ad}</text><text class="f52-mu" x="${cx}" y="170" text-anchor="middle">${l1}</text><text class="f52-mu" x="${cx}" y="188" text-anchor="middle">${l2}</text></g>`;
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 340" role="img" aria-label="A, B ve C liflerinin kesitleri ve logaritmik iletim hızı aralıkları"><g class="f52-kes"></g>
      <g class="f52-bnd"></g>
      <line class="f52-ax" x1="12" x2="408" y1="288" y2="288"/>
      ${[0.5, 1, 4, 10, 30, 70, 120].map((v) => `<line class="f52-ax" x1="${f1(X(v))}" x2="${f1(X(v))}" y1="284" y2="292"/><text class="f52-tk" x="${f1(X(v))}" y="308" text-anchor="middle">${String(v).replace('.', ',')}</text>`).join('')}
      <text class="f52-mu" x="12" y="330">İletim hızı (m/s, logaritmik)</text><circle class="f52-pd" r="7" fill="var(--ink)" cy="-20" cx="0"/></svg>
    <div class="f52-ctl"><div class="f52-row">${segHtml('Lif tipi', 'lf', [['A', 'A'], ['B', 'B'], ['C', 'C']], 'A')}<span class="f52-asg">${segHtml('A alt tipi', 'al', [['', 'Tümü'], ['a', 'Aα'], ['b', 'Aβ'], ['g', 'Aγ'], ['d', 'Aδ']], '')}</span></div>
      <div class="f52-card" data-o="kart"></div></div>`;
    const $ = (s) => el.querySelector(s);
    const KAP = { A: "<b>A lifleri.</b> Kalın (12–20 μm) ve miyelinli; 70–120 m/s ile en hızlılar. Bir lif tipi seçin. [[K1 s. 229]]", a: "<b>Aα.</b> En hızlı A lifi; motor, ekstrafüzal kas liflerini (iskelet kası kasılması) besler. [[K1 s. 229]]", b: "<b>Aβ.</b> Duyusal; deri, eklem ve kas reseptörlerinden bilgi taşır. [[K1 s. 229]]", g: "<b>Aγ.</b> Motor; intrafüzal kas iğciği liflerini besler. [[K1 s. 229]]", d: "<b>Aδ.</b> A lifleri içinde en yavaşı; hızlı nosiseptörlerden ve termoreseptörlerden bilgi taşır. [[K1 s. 229]]", B: "<b>B lifleri.</b> Dar (< 3 μm) ama miyelinli; hız buna uygun olarak düşük, 4–30 m/s. Otonom preganglionik nöronlar. [[K1 s. 229]]", C: "<b>C lifleri.</b> Dar (0,4–1,2 μm) ve miyelinsiz; en yavaşlar (0,5–4,0 m/s). Otonom postganglionik nöronlar ve yavaş ağrı lifleri. [[K1 s. 229]]" };
    function kart() {
      if (sec === 'B') return 'Otonom preganglionik nöronlar';
      if (sec === 'C') return 'Otonom postganglionik nöronlar · yavaş ağrı lifleri';
      const L = [['a', 'Aα motor → ekstrafüzal kas lifleri (iskelet kası kasılması)'], ['b', 'Aβ duyusal → deri, eklem, kas reseptörleri'], ['g', 'Aγ motor → intrafüzal kas iğciği lifleri'], ['d', 'Aδ duyusal → hızlı nosiseptörler, termoreseptörler']];
      return 'Alt tipler (hız azalarak):<ul>' + L.map(([k, t]) => `<li class="${alt === k ? 'on' : ''}">${t}</li>`).join('') + '</ul>';
    }
    function ciz() {
      $('.f52-kes').innerHTML = kes(70, 46, 15, 'A · 12–20 μm', 'miyelinli', '', sec === 'A') + kes(210, 24, 6, 'B · < 3 μm', 'miyelinli', '', sec === 'B') + kes(350, 10, 0, 'C · 0,4–1,2 μm', 'miyelinsiz', '', sec === 'C');
      let s = '';
      Object.values(LIF).forEach((l) => {
        const on = l.ad === sec, x0 = X(l.lo), x1 = X(l.hi);
        s += `<g opacity="${on ? 1 : 0.6}"><rect x="${f1(x0)}" y="${l.y - 10}" width="${f1(x1 - x0)}" height="20" rx="6" fill="var(${l.col})" opacity="${on ? 0.9 : 0.6}"/>`;
        const lab = `${l.ad} · ${String(l.lo).replace('.', ',')}–${String(l.hi).replace('.', ',')}`;
        s += l.ad === 'A' ? `<text class="f52-tx" x="${f1(x0 - 6)}" y="${l.y + 5}" text-anchor="end">${lab}</text>` : `<text class="f52-tx" x="${f1(x1 + 6)}" y="${l.y + 5}">${lab}</text>`;
        s += '</g>';
      });
      if (sec === 'A' && alt) { const x = X(70) + (X(120) - X(70)) * ALTX[alt]; s += `<path d="M${f1(x)} 200 l-6 -10 h12z" fill="var(--ink)"/><text class="f52-tx f52-b" x="${f1(x)}" y="186" text-anchor="middle">${ALT[alt]}</text>`; }
      $('.f52-bnd').innerHTML = s;
      el.querySelector('.f52-asg').style.display = sec === 'A' ? '' : 'none';
      basSec(el, 'lf', sec); basSec(el, 'al', alt); $('[data-o=kart]').innerHTML = kart();
      setCap(el, KAP[sec === 'A' && alt ? alt : sec]);
      pt = RM ? 99 : 0; nab();
    }
    function nab() { const l = LIF[sec], d = $('.f52-pd'); if (pt >= l.sure) { d.setAttribute('cy', -20); return; } d.setAttribute('cx', f1(lerp(X(l.lo), X(l.hi), pt / l.sure))); d.setAttribute('cy', l.y); }
    el.querySelectorAll('[data-lf]').forEach((b) => b.addEventListener('click', () => { sec = b.dataset.lf; alt = ''; ciz(); }));
    el.querySelectorAll('[data-al]').forEach((b) => b.addEventListener('click', () => { alt = b.dataset.al; ciz(); }));
    ciz();
    const stop = ticker(el, (dt) => { if (pt < 4) { pt += dt; nab(); } });
    return stop;
  };

  /* ---------- 7 · Lokal anestezik ---------- */
  VIZ.f52_la = (el) => {
    const CXN = 330;
    let adim = 0, u = 1, oto = 0;
    const KAP = [
      "<b>1 · Zayıf baz.</b> ECF'de lokal anestezik iyonize olmayan (B) ve iyonize (BH⁺) biçimlerde bulunur. İleri'ye basın. [[K1 s. 229]]",
      "<b>2 · Yalnız iyonize olmayan biçim geçer.</b> Fosfolipit çift katmandan yalnız B difüze olur; BH⁺ yüklü olduğu için geçemez. [[K1 s. 229]]",
      "<b>3 · Protonlanma.</b> Aksoplazmanın pH'ı daha düşük: içeri giren molekül hemen protonlanır ve ECF'ye geri difüze olamaz. [[K1 s. 229]]",
      "<b>4 · Na⁺ kanalı bloku.</b> İyonize molekül, inaktif durumdaki voltaj kapılı Na⁺ kanalına iç yüzünden bağlanır. [[K1 s. 229]]",
      "<b>5 · Sonuç.</b> Mutlak refrakter dönem süresizce uzar; yeni aksiyon potansiyeli doğmaz ve yayılmaz. [[K1 s. 229]]",
      "<b>6 · Hangi lif önce bloke olur?</b> Küçük lifler büyüklerden, miyelinli lifler aynı çaptaki miyelinsizlerden daha duyarlıdır. En kolay Aδ ve B, sonra Aα, Aβ, Aγ bloke olur; C lifleri en dirençlidir. [[K1 s. 229]]",
    ];
    const mem = (() => { let s = ''; for (let x = 12; x < 410; x += 13) { if (x > 296 && x < 362) continue; s += `<circle cx="${x}" cy="123" r="5" fill="var(--line)"/><circle cx="${x}" cy="137" r="5" fill="var(--line)"/>`; } return s; })();
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 340" role="img" aria-label="Lokal anesteziğin membranı geçmesi, protonlanması ve Na⁺ kanalını bloke etmesi; liflerin duyarlılık sırası"><defs>${mrk('f52-la-a', 'f52-lam')}</defs><style>.f52-lam{fill:var(--ink)}</style>
      <g class="f52-sc"><rect x="0" y="0" width="420" height="116" rx="8" fill="var(--chip)" opacity=".55"/>${mem}
      <text class="f52-mu" x="8" y="20">ECF · pH daha yüksek</text><text class="f52-tx" x="412" y="20" text-anchor="end">B + H⁺ ⇌ BH⁺</text>
      <text class="f52-mu" x="8" y="162">Aksoplazma · pH daha düşük</text><text class="f52-tx" x="${CXN}" y="106" text-anchor="middle" style="fill:var(--warn)">Na⁺ kanalı</text>
      <g class="f52-ch2"></g><g class="f52-mol"></g>
      <rect x="230" y="238" width="182" height="96" rx="8" fill="var(--paper)" stroke="var(--line)"/><g class="f52-vmx"></g></g>
      <g class="f52-ld" style="display:none"></g></svg>
    <div class="f52-ctl"><div class="f52-dots" role="group" aria-label="Adım"></div><div class="f52-row"><button type="button" class="btn ghost" data-a="geri">Geri</button><button type="button" class="btn" data-a="ileri">İleri</button><button type="button" class="btn ghost" data-a="basa">Baştan</button></div>
      <div class="f52-rules" hidden><div><b>Küçük lif &gt; büyük lif</b> (duyarlılık)</div><div><b>Miyelinli &gt; aynı çaptaki miyelinsiz:</b> açık zar yalnız boğumlar, Na⁺ kanalları orada yoğun</div></div></div>`;
    const $ = (s) => el.querySelector(s);
    const dots = $('.f52-dots'); dots.innerHTML = [1, 2, 3, 4, 5, 6].map((i) => `<button type="button" data-i="${i - 1}" aria-label="Adım ${i}">${i}</button>`).join('');
    const ease = (x) => x * x * (3 - 2 * x);
    const B = (x, y, ch) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="10" fill="${ch ? 'var(--c-clin)' : 'var(--paper)'}" stroke="var(--c-clin)" stroke-width="2.6"/><text x="${f1(x)}" y="${f1(y + 5)}" text-anchor="middle" style="font:800 13px var(--f-mono);fill:${ch ? 'var(--paper)' : 'var(--c-clin)'}">${ch ? '+' : 'B'}</text>`;
    function sahne() {
      const e = ease(u); let m = '';
      for (let i = 0; i < 4; i++) {
        const bx = 36 + i * 50, hx = 61 + i * 50;
        let by = 50, hy = 80;
        if (adim === 1) by = lerp(50, 200, e); if (adim >= 2) by = 200;
        if (adim === 1) hy = 80 + 24 * Math.sin(Math.PI * e);
        const inner = adim >= 2;
        if (adim >= 3 && i === 3) { const px = lerp(bx, CXN, adim === 3 ? e : 1), py = lerp(200, 164, adim === 3 ? e : 1); m += B(px, py, true); } else m += B(bx, by, inner);
        m += B(hx, hy, true);
        if (adim === 1 && e > 0.5) m += `<text style="font:800 20px var(--f-display);fill:var(--crit)" x="${hx}" y="112" text-anchor="middle">×</text>`;
        if (adim === 2) m += `<text class="f52-mu" x="${bx - 4}" y="228" text-anchor="middle" opacity="${e}">H⁺</text>`;
      }
      if (adim === 2) m += `<text style="font:800 20px var(--f-display);fill:var(--crit)" x="110" y="168" text-anchor="middle">↑×</text><text class="f52-mu" x="150" y="170">geri çıkamaz</text>`;
      if (adim === 0) m += `<text class="f52-mu" x="12" y="108" opacity=".0"></text>`;
      $('.f52-mol').innerHTML = m + `<text class="f52-mu" x="12" y="252" opacity=".0"></text>`;
      const blok = adim >= 3, g = blok ? 16 : 16;
      let c = `<rect x="${CXN - g / 2 - 18}" y="112" width="18" height="38" rx="3" fill="var(--warn)" opacity=".85"/><rect x="${CXN + g / 2}" y="112" width="18" height="38" rx="3" fill="var(--warn)" opacity=".85"/>`;
      if (blok) c += `<circle cx="${CXN}" cy="146" r="8" fill="var(--crit)"/><text class="f52-tx" x="${CXN}" y="190" text-anchor="middle" style="fill:var(--crit)">${adim >= 4 ? 'refrakter durumda kilitli' : 'inaktif: BH⁺ bağlı'}</text>`;
      $('.f52-ch2').innerHTML = c;
      // Vm kutusu
      const bx = 238, bw = 166, by0 = 262, bh = 64, X = (t) => bx + (t / 6) * bw, Y = (v) => by0 + ((50 - v) / 140) * bh;
      let v = `<text class="f52-mu" x="238" y="256">Uyarana yanıt</text>`;
      if (adim === 4) v += `<line x1="${bx}" x2="${bx + bw}" y1="${f1(Y(-70))}" y2="${f1(Y(-70))}" stroke="var(--crit)" stroke-width="3"/><text style="font:800 22px var(--f-display);fill:var(--crit)" x="${bx + bw - 14}" y="${f1(Y(-70) - 8)}" text-anchor="middle">×</text><text class="f52-tx" x="${bx + 6}" y="${f1(Y(-70) - 8)}" style="fill:var(--crit)">yanıt yok</text>`;
      else v += `<path class="f52-ln" stroke="var(--ok)" stroke-width="3" d="${pathOf(AP, 0, 6, 60, X, Y)}"/><text class="f52-tx" x="${bx + bw - 4}" y="${by0 + 14}" text-anchor="end" style="fill:var(--ok)">normal AP</text>`;
      $('.f52-vmx').innerHTML = v;
    }
    function merdiven() {
      const row = (y, col, t0, l1, l2, ring, r) => `<g><rect x="6" y="${y}" width="408" height="84" rx="12" fill="var(${col}-soft)" stroke="var(${col})" stroke-width="2"/>
        <circle cx="46" cy="${y + 42}" r="${r}" fill="${ring ? 'var(--c-clin-soft)' : 'var(--chip)'}" stroke="var(--c-clin)" stroke-width="2"/>${ring ? `<circle cx="46" cy="${y + 42}" r="${r - ring}" fill="var(--chip)" stroke="var(--line)"/>` : ''}
        <text class="f52-tx f52-b" x="88" y="${y + 24}" style="fill:var(${col})">${t0}</text><text class="f52-tx" x="88" y="${y + 47}">${l1}</text><text class="f52-tx" x="88" y="${y + 67}">${l2}</text></g>`;
      $('.f52-ld').innerHTML = row(6, '--ok', '1 · en kolay bloke olur', 'Orta boy miyelinli: Aδ (hızlı nosiseptif)', '· B (preganglionik otonom)', 5, 24) + row(100, '--warn', '2 · sonra', 'Daha büyük: Aα, Aβ, Aγ (dokunma,', 'basınç, propriyosepsiyon)', 6, 32) + row(194, '--crit', '3 · en dirençli', 'Miyelinsiz C lifleri', '', 0, 11) + `<text class="f52-mu" x="12" y="304">↓ duyarlılık azalır: küçük lif &gt; büyük lif; miyelinli &gt; miyelinsiz</text>`;
    }
    function git(i, anim) {
      adim = clamp(i, 0, 5); u = RM || !anim ? 1 : 0;
      dots.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === adim)));
      setCap(el, KAP[adim]);
      const lad = adim === 5; $('.f52-sc').style.display = lad ? 'none' : ''; $('.f52-ld').style.display = lad ? '' : 'none'; $('.f52-rules').hidden = !lad;
      if (lad) merdiven(); else sahne();
    }
    dots.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) git(+b.dataset.i, true); });
    $('[data-a=geri]').onclick = () => git(adim - 1, false);
    $('[data-a=ileri]').onclick = () => git(adim + 1, true);
    $('[data-a=basa]').onclick = () => git(0, false);
    merdiven(); git(0, false);
    const stop = ticker(el, (dt) => { if (u < 1) { u = Math.min(1, u + dt / 1.2); if (adim < 5) sahne(); } });
    return stop;
  };

  /* ---------- 8 · Refrakter dönem ---------- */
  VIZ.f52_refrakter = (el) => {
    const X0 = 46, W = 364, Y0 = 44, H = 170;
    const F = vmFrame(X0, Y0, W, H, { noTitle: true });
    const { gx, gy } = F;
    const TY0 = 246, TH = 76; // eşik paneli
    const mY = (m) => TY0 + 14 + ((4.4 - clamp(m, 1, 4.4)) / 3.4) * (TH - 14);
    const mOf = (t) => (t < 1.55 ? Infinity : t < 4.05 ? 1 + 3 * Math.exp(-(t - 1.55) / 0.8) : 1);
    let d = 1.0, b = 1.5, ph = 0;
    let thr = '';
    thr += `<rect x="${X0}" y="${TY0}" width="${f1(gx(1.55) - X0)}" height="12" fill="var(--crit-soft)"/><rect x="${f1(gx(1.55))}" y="${TY0}" width="${f1(gx(6) - gx(1.55))}" height="12" fill="none"/><text class="f52-tk" x="${X0 - 5}" y="${TY0 + 11}" text-anchor="end">∞</text>`;
    [1, 2, 3, 4].forEach((m) => { thr += `<line class="f52-gr" x1="${X0}" x2="${X0 + W}" y1="${f1(mY(m))}" y2="${f1(mY(m))}"/><text class="f52-tk" x="${X0 - 5}" y="${f1(mY(m) + 4.5)}" text-anchor="end">${m}×</text>`; });
    let dc = 'M' + f1(gx(1.55)) + ' ' + f1(TY0 + 6); for (let t = 1.55; t <= 6.001; t += 0.05) dc += 'L' + f1(gx(t)) + ' ' + f1(mY(mOf(t) === Infinity ? 4.4 : mOf(t)));
    thr += `<path class="f52-ln" stroke="var(--crit)" stroke-width="3" d="${dc}"/><line x1="${X0}" x2="${f1(gx(1.55))}" y1="${TY0 + 6}" y2="${TY0 + 6}" stroke="var(--crit)" stroke-width="3"/>`;
    thr += `<text class="f52-mu" x="${X0 + 4}" y="${TY0 + 34}">gerekli uyaran</text><text class="f52-mu" x="${X0 + 4}" y="${TY0 + 51}">(× eşik)</text>`;
    el.innerHTML = `<svg class="f52-svg" viewBox="0 0 420 452" role="img" aria-label="İlk aksiyon potansiyelinden sonra gelen ikinci uyaranın gecikmesi ve büyüklüğüne göre yanıt; mutlak ve göreceli refrakter dönem">
      <defs>${mrk('f52-rf-a', 'f52-rfm')}</defs><style>.f52-rfm{fill:var(--accent)}</style>
      <rect x="${f1(gx(0.55))}" y="14" width="${f1(gx(1.55) - gx(0.55))}" height="22" fill="var(--crit-soft)" stroke="var(--crit)"/><text class="f52-tx f52-b" x="${f1((gx(0.55) + gx(1.55)) / 2)}" y="30" text-anchor="middle" style="fill:var(--crit)">ARP</text>
      <rect x="${f1(gx(1.55))}" y="14" width="${f1(gx(4.05) - gx(1.55))}" height="22" fill="var(--warn-soft)" stroke="var(--warn)"/><text class="f52-tx f52-b" x="${f1((gx(1.55) + gx(4.05)) / 2)}" y="30" text-anchor="middle" style="fill:var(--warn)">RRP</text>
      ${F.svg}
      <path class="f52-ln" stroke="var(--muted)" stroke-width="2.6" opacity=".7" d="${pathOf(AP, 0, 6, 120, gx, gy)}"/>
      <path class="f52-ln f52-r2" stroke="var(--accent)" stroke-width="3.6" d=""/><g class="f52-sk"></g>
      <text class="f52-mu" x="${X0 + W / 2}" y="${Y0 + H + 35}" text-anchor="middle">Zaman (ms)</text>
      ${thr}<circle class="f52-pt" r="7" stroke="var(--paper)" stroke-width="2"/>
      <text class="f52-mu" x="${X0 + W / 2}" y="${TY0 + TH + 34}" text-anchor="middle">Zaman (ms)</text>
      ${[0, 1, 2, 3, 4, 5, 6].map((t) => `<text class="f52-tk" x="${f1(gx(t))}" y="${TY0 + TH + 17}" text-anchor="middle">${t}</text>`).join('')}
      <g class="f52-nd"></g></svg>
    <div class="f52-ctl"><label class="f52-rng"><span>İkinci uyaranın gecikmesi <b data-o="d"></b></span><input type="range" min="0.2" max="5" step="0.1" value="1" data-r="d" aria-label="İkinci uyaranın gecikmesi"></label>
      <label class="f52-rng"><span>İkinci uyaranın büyüklüğü <b data-o="b"></b></span><input type="range" min="1" max="4" step="0.1" value="1.5" data-r="b" aria-label="İkinci uyaranın büyüklüğü (eşik katı)"></label>
      <div class="f52-row"><button type="button" class="btn" data-a="uyar">Uyar</button><span class="f52-badge" data-o="rozet"></span></div>
      <div class="f52-row"><span class="f52-badge no">Tek yönlü yayılım: arkadaki membran refrakter</span><span class="f52-badge wa">Sıklık sınırı: belirli sürede sınırlı sayıda AP</span></div></div>`;
    const $ = (s) => el.querySelector(s);
    const rec = (t) => (t < 1.55 ? 0 : t >= 4.05 ? 1 : 1 - Math.exp(-(t - 1.55) / 1.2));
    function sonuc() { // 'yok' | 'ap' | 'bump'
      if (d < 1.55) return 'yok';
      if (d >= 4.05) return 'ap';
      return b >= mOf(d) ? 'ap' : 'bump';
    }
    function ciz(anim) {
      const so = sonuc(), m = mOf(d), AMP = so === 'ap' && d < 4.05 ? 0.8 + 0.2 * clamp((b - 1) / 3, 0, 1) : 1;
      const Vtot = (t) => {
        const v1 = AP(t); if (t < d || so === 'yok') return v1;
        const tau = t - d, res = (v1 + 70) * Math.exp(-tau / 0.6);
        if (so === 'ap') return -70 + (AP(tau) + 70) * AMP + res;
        return v1 + 7 * b * (tau < 0.3 ? tau / 0.3 : Math.exp(-(tau - 0.3) / 0.5));
      };
      const r2 = $('.f52-r2');
      if (so === 'yok') r2.setAttribute('d', '');
      else { const t1 = Math.min(6, d + 0), t2 = 6; let p = ''; for (let t = Math.max(0, d - 0.001); t <= t2; t += 0.05) p += (p ? 'L' : 'M') + f1(gx(t)) + ' ' + f1(gy(Vtot(t))); r2.setAttribute('d', p); }
      const h = 12 + 10 * b, sx = gx(d);
      $('.f52-sk').innerHTML = `<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${f1(Y0 + H)}" y2="${f1(Y0 + H - h)}" stroke="var(--accent)" stroke-width="3" marker-end="url(#f52-rf-a)"/><text class="f52-tx" x="${f1(sx + (d > 4.4 ? -6 : 6))}" y="${f1(Y0 + H - h - 4)}" text-anchor="${d > 4.4 ? 'end' : 'start'}" style="fill:var(--accent-ink)">2. uyaran</text>`;
      const pt = $('.f52-pt'); const bb = d >= 1.55 ? b : 4.4;
      pt.setAttribute('cx', f1(gx(d))); pt.setAttribute('cy', f1(d < 1.55 ? TY0 + 6 : mY(b))); pt.setAttribute('fill', so === 'ap' ? 'var(--ok)' : 'var(--crit)');
      $('[data-o=d]').textContent = fmt(d) + ' ms'; $('[data-o=b]').textContent = fmt(b) + '×';
      const r = $('[data-o=rozet]'); r.textContent = so === 'ap' ? 'Yanıt: aksiyon potansiyeli' : so === 'bump' ? 'Yanıt: küçük sönen depolarizasyon' : 'Yanıt: yok'; r.className = 'f52-badge ' + (so === 'ap' ? 'ok' : 'no');
      // neden çubukları
      const rr = rec(d), pk = d < 0.3 ? 0 : clamp(PK(d) / 30, 0, 1);
      $('.f52-nd').innerHTML = `<text class="f52-tx" x="12" y="${TY0 + TH + 58}">Toparlanmış Na⁺ kanalı</text><rect x="200" y="${TY0 + TH + 46}" width="208" height="14" rx="5" fill="var(--chip)"/><rect x="200" y="${TY0 + TH + 46}" width="${f1(208 * rr)}" height="14" rx="5" fill="var(--warn)"/>
        <text class="f52-tx" x="12" y="${TY0 + TH + 82}">K⁺ geçirgenliği</text><rect x="200" y="${TY0 + TH + 70}" width="208" height="14" rx="5" fill="var(--chip)"/><rect x="200" y="${TY0 + TH + 70}" width="${f1(208 * pk)}" height="14" rx="5" fill="var(--c-basic)"/>
        <text class="f52-mu" x="12" y="${TY0 + TH + 104}">RRP: K⁺ sızıntı + VG K⁺ açık → K⁺ çıkışı en yüksek</text>`;
      let kp;
      const ds = fmt(d), bs = fmt(b), ms = m === Infinity ? '' : fmt(m);
      if (d < 0.55) kp = `<b>İkinci uyaran ${ds} ms'de.</b> İlk aksiyon potansiyelinin yükselişi sürüyor; Na⁺ kanalları açılmış ve ARP başlamıştır: yeni yanıt yok. [[K1 s. 229]]`;
      else if (d < 1.55) kp = `<b>İkinci uyaran ${ds} ms'de: ARP.</b> Na⁺ kanalları refrakter; uyaran ne kadar büyük olursa olsun yeni aksiyon potansiyeli doğmaz. Gecikmeyi ve uyaranın büyüklüğünü değiştirin. [[K1 s. 229–230]]`;
      else if (d >= 4.05) kp = `<b>İkinci uyaran ${ds} ms'de.</b> Refrakter dönem bitti; normal eşikteki uyaran yeterli. [[K1 s. 230]]`;
      else if (b < m) kp = `<b>İkinci uyaran ${ds} ms'de: RRP.</b> ${bs}× uyaran yetmedi; bu anda ≈ ${ms}× gerekir. Na⁺ kanallarının yeterli bölümü toparlanmadı ve K⁺ geçirgenliği en yüksek: eşik yükselmiş. [[K1 s. 230]]`;
      else kp = `<b>İkinci uyaran ${ds} ms'de: RRP.</b> ${bs}× uyaran, artmış K⁺ çıkışını yenecek kadar büyük: ikinci aksiyon potansiyeli doğdu. [[K1 s. 230]]`;
      setCap(el, kp);
    }
    $('[data-r=d]').addEventListener('input', (e) => { d = +e.target.value; ciz(); });
    $('[data-r=b]').addEventListener('input', (e) => { b = +e.target.value; ciz(); });
    $('[data-a=uyar]').onclick = () => { const p = $('.f52-r2'); if (!RM) { p.style.transition = 'none'; p.style.opacity = 0; requestAnimationFrame(() => { p.style.transition = 'opacity .6s'; p.style.opacity = 1; }); } ciz(); };
    ciz();
    return () => {};
  };
})();
