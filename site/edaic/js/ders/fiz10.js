/* Fizyoloji Bölüm 10 · Alveoler difüzyon · bileşenler (K1 s. 40–43).
   Modeller şematiktir; sayılar kitaptaki değerlere oturtulmuştur ve bileşen altlarında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  // sözde rastgele (her yüklemede aynı yerleşim)
  const rnd = (() => { let s = 7; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();

  // Bölüm içi gaz renkleri (her bileşende aynı)
  const RENK = { o2: 'var(--crit)', co2: 'var(--c-basic)', n2o: 'var(--c-clin)', vol: 'var(--ok)', co: 'var(--warn)' };

  /* ---------- O₂ modeli ----------
     İçerik (mL/dL) = 1,34 × Hb × S + 0,023 × PO₂ (K1 s. 30); S Hill eğrisinden, P50 3,5 kPa (K1 s. 32), n 2,7.
     Kapillerde dC/dt = KD · g · (PAO₂ − PO₂); g = alan/kalınlık (göreli). KD, normal bariyerde dengeyi ≈ 0,25 s'de
     kuracak biçimde seçilmiştir (K1 s. 40). */
  const P50 = 3.5, NH = 2.7, HB = 15, KAP = 1.34 * HB, COZ = 0.023, KD = 5, DT = 0.0025, ESIK = 0.1;
  const sat = (p) => (p <= 0 ? 0 : Math.pow(p, NH) / (Math.pow(p, NH) + Math.pow(P50, NH)));
  const icerik = (p) => KAP * sat(p) + COZ * p;
  const basinc = (c) => { let a = 0, b = 60; for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (icerik(m) < c) a = m; else b = m; } return (a + b) / 2; };
  function o2Egri(PA, PV, g, T = 0.75) {
    const N = Math.round(T / DT), P = new Float64Array(N + 1);
    let c = icerik(PV);
    for (let i = 0; i <= N; i++) { const p = basinc(c); P[i] = p; c += KD * g * (PA - p) * DT; }
    return P;
  }
  const dengeZ = (P, PA) => { for (let i = 0; i < P.length; i++) if (PA - P[i] < ESIK) return i * DT; return null; };
  const degerAt = (P, t) => { const x = clamp(t / DT, 0, P.length - 1), i = Math.floor(x), f = x - i; return i + 1 < P.length ? lerp(P[i], P[i + 1], f) : P[i]; };
  const PAO2 = (fio2, PB) => fio2 * (PB - 6.3) - 5.3 / 0.8; // alveoler gaz denklemi (PH₂O 6,3 kPa, PaCO₂ 5,3 kPa, R 0,8)
  const yol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));

  /* ---------- 1 · Beş etken: alan, kalınlık, gradyan, çözünürlük, MW ---------- */
  VIZ.f10_fick = (el) => {
    const GAZ = { o2: { ad: 'O₂', mw: 32, s: 1, renk: RENK.o2 }, co2: { ad: 'CO₂', mw: 44, s: 23.45, renk: RENK.co2 } };
    let gaz = 'o2', A = 70, T = 1, G = 8, son = 'bas', lastCap = '';
    el.innerHTML = `<div class="viz-head"><h3>Difüzyon hızı: beş etken</h3>${segHtml('Difüze olan gaz', 'g', [['o2', 'O₂'], ['co2', 'CO₂']], 'o2')}</div>
      <div class="f10-fk">
        <svg class="f10-svg" viewBox="0 0 360 230" role="img" aria-label="Alveol gazı ile kapiller kanı arasındaki bariyerden moleküllerin geçişi; alan, kalınlık ve gradyanla değişir">
          <rect class="f10-fk-alv" x="0" y="0" width="360" height="116" rx="12"/><rect class="f10-fk-dok" x="0" y="116" width="360" height="114" rx="12"/>
          <rect class="f10-fk-kan" y="0" height="0" rx="10"/>
          <rect class="f10-fk-bar-off" x="8" width="344" rx="4"/>
          <rect class="f10-fk-bar" rx="4"/>
          <g class="f10-fk-mol"></g><g class="f10-fk-gec"></g>
          <text class="f10-fk-bl" x="12" y="20">Alveol gazı</text>
          <text class="f10-fk-bl f10-fk-bl-k" x="12" y="220">Kapiller kanı</text>
          <text class="f10-fk-yon" x="348" y="20" text-anchor="end"></text>
          <text class="f10-fk-alt" x="348" y="221" text-anchor="end"></text>
        </svg>
        <div class="f10-fk-ctl">
          <label class="f10-rng"><span>Yüzey alanı <b data-o="A"></b></span><input type="range" min="10" max="100" step="1" value="70" data-r="A" aria-label="Yüzey alanı"></label>
          <label class="f10-rng"><span>Bariyer kalınlığı <b data-o="T"></b></span><input type="range" min="1" max="5" step="0.1" value="1" data-r="T" aria-label="Bariyer kalınlığı"></label>
          <label class="f10-rng"><span>Parsiyel basınç gradyanı <b data-o="G"></b></span><input type="range" min="0" max="30" step="0.1" value="8" data-r="G" aria-label="Parsiyel basınç gradyanı"></label>
          <dl class="f10-oku f10-sabit"><div><dt>Çözünürlük (göreli)</dt><dd data-o="S"></dd></div><div><dt>Molekül ağırlığı</dt><dd data-o="MW"></dd></div></dl>
          <div class="f10-sonuc"><span>Göreli difüzyon hızı</span><b data-o="R"></b>
            <span class="f10-log" aria-hidden="true"><i class="f10-log-fl"></i><i class="f10-log-n"></i></span>
            <span class="f10-log-tk" aria-hidden="true"><em style="left:0">0,1×</em><em style="left:33.33%">1×</em><em style="left:66.67%">10×</em><em style="left:100%">100×</em></span>
          </div>
        </div>
      </div>
      <p class="f10-dkn" data-o="denk"></p>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model. Hız, alan 70 m², kalınlık ×1 ve gradyan 8 kPa (alveoler PO₂ 13,3 ile miks venöz PO₂ 5,3 kPa arası) koşullarındaki O₂ hızına göre verilir; çubuk logaritmiktir. CO₂\'nin göreli çözünürlüğü 23,45 alındı: √(44/32) ≈ 1,17\'ye bölününce aynı gradyanda kitaptaki 20 kat çıkar. [[K1 s. 30, 32, 40]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const svg = $('svg'), molG = $('.f10-fk-mol'), gecG = $('.f10-fk-gec'), bar = $('.f10-fk-bar'), barOff = $('.f10-fk-bar-off'), kan = $('.f10-fk-kan'), cap = $('.viz-cap');
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    // sabit yoğunluk noktaları: kaynak tarafı (en çok 42) ve hedef tarafı (6)
    const KAYN = Array.from({ length: 42 }, () => ({ x: 14 + rnd() * 332, y: rnd(), ph: rnd() * 6.28 }));
    const HEDF = Array.from({ length: 6 }, () => ({ x: rnd(), y: rnd(), ph: rnd() * 6.28 }));
    const kc = KAYN.map(() => mk('circle', { r: 3.6 }, molG)), hc = HEDF.map(() => mk('circle', { r: 3.6 }, molG));
    const PARC = Array.from({ length: 44 }, () => ({ on: false, x: 0, t: 0, dur: 1 }));
    const pc = PARC.map(() => mk('circle', { r: 4 }, gecG));
    let geo = {}, birikim = 0, zaman = 0;
    const hiz = () => { const g = GAZ[gaz]; return (A / 70) * (G / 8) * g.s / (T * Math.sqrt(g.mw / 32)); };
    const yerlesim = () => {
      const h = 6 + (T - 1) * 7, yc = 116, w = 3.4 * A, x0 = 180 - w / 2;
      geo = { h, yt: yc - h / 2, yb: yc + h / 2, w, x0 };
      bar.setAttribute('x', x0); bar.setAttribute('width', w); bar.setAttribute('y', geo.yt); bar.setAttribute('height', h);
      barOff.setAttribute('y', geo.yt); barOff.setAttribute('height', h);
      kan.setAttribute('x', x0); kan.setAttribute('width', w); kan.setAttribute('y', geo.yb + 2); kan.setAttribute('height', Math.max(0, 226 - geo.yb));
      $('.f10-fk-alt').textContent = `yüzey ${A} m² · kalınlık ×${fmt(T)}`;
    };
    const ciz = (t) => {
      const g = GAZ[gaz], yukari = gaz === 'co2'; // CO₂ kandan alveole
      const nK = Math.round(clamp(6 + G * 1.2, 6, 42)); // G = 0'da iki yanda eşit yoğunluk (6 nokta)
      kc.forEach((c, i) => {
        const k = KAYN[i];
        if (i >= nK) { c.setAttribute('opacity', 0); return; }
        let x, y;
        if (!yukari) { x = k.x; y = 30 + k.y * (geo.yt - 58); }
        else { x = geo.x0 + 6 + ((k.x - 14) / 332) * (geo.w - 12); y = geo.yb + 12 + k.y * (196 - geo.yb); }
        x += RM ? 0 : 2.2 * Math.sin(t * 1.3 + k.ph); y += RM ? 0 : 2.2 * Math.cos(t * 1.1 + k.ph);
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('opacity', 0.85); c.style.fill = g.renk;
      });
      hc.forEach((c, i) => {
        const k = HEDF[i];
        let x, y;
        if (!yukari) { x = geo.x0 + 6 + k.x * (geo.w - 12); y = geo.yb + 12 + k.y * (196 - geo.yb); }
        else { x = 14 + k.x * 332; y = 30 + k.y * (geo.yt - 58); }
        x += RM ? 0 : 2.2 * Math.sin(t * 1.2 + k.ph); y += RM ? 0 : 2.2 * Math.cos(t + k.ph);
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('opacity', 0.85); c.style.fill = g.renk;
      });
      pc.forEach((c, i) => {
        const p = PARC[i];
        if (!p.on) { c.setAttribute('opacity', 0); return; }
        const f = p.t / p.dur; let y, x = p.x, op = 1;
        const y0 = yukari ? geo.yb + 6 : geo.yt - 6, y1 = yukari ? geo.yt - 6 : geo.yb + 6;
        if (f < 0.45) y = lerp(y0, y1, f / 0.45);
        else { const q = (f - 0.45) / 0.55; y = y1 + (yukari ? -1 : 1) * q * 34; x = p.x + (yukari ? 0 : q * 40); op = 1 - q; }
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('opacity', op.toFixed(2)); c.style.fill = g.renk;
      });
    };
    const yaz = () => {
      const g = GAZ[gaz], R = hiz();
      o('A').textContent = `${A} m²`; o('T').textContent = '×' + fmt(T) + (T === 1 ? ' (normal)' : '');
      o('G').textContent = `${fmt(G)} kPa`;
      o('S').textContent = gaz === 'o2' ? '1 (O₂)' : '≈ 23 (CO₂)';
      o('MW').textContent = `${g.mw} Da · √MW oranı ${fmt(Math.sqrt(g.mw / 32), 2)}`;
      o('R').textContent = R < 0.005 ? '0' : '×' + fmt(R, R < 10 ? 2 : 1);
      const pos = R <= 0 ? 0 : clamp((Math.log10(R) + 1) / 3, 0, 1);
      $('.f10-log-fl').style.width = (pos * 100).toFixed(1) + '%';
      $('.f10-log-n').style.left = '33.33%';
      const vur = (k, s) => `<span class="${son === k ? 'on' : ''}">${s}</span>`;
      o('denk').innerHTML = `hız ∝ ${vur('A', `alan ${fmt(A / 70, 2)}`)} × ${vur('G', `gradyan ${fmt(G / 8, 2)}`)} × ${vur('gaz', `çözünürlük ${gaz === 'o2' ? '1' : '23,45'}`)} ÷ (${vur('T', `kalınlık ${fmt(T)}`)} × ${vur('gaz', `√MW ${fmt(Math.sqrt(g.mw / 32), 2)}`)}) = <b>${R < 0.005 ? '0' : fmt(R, 2)}</b>`;
      $('.f10-fk-yon').textContent = gaz === 'o2' ? 'O₂: alveol → kan' : 'CO₂: kan → alveol';
      const C = {
        bas: '<b>Model.</b> Kaydırıcılarla bariyerin ve gradyanın, üstteki düğmelerle gazın etkisini görün. Hız, normal koşullardaki O₂ hızına (×1) göre verilir. [[K1 s. 40]]',
        A: '<b>Yüzey alanı.</b> Hız yüzey alanıyla doğru orantılıdır. Akciğerdeki yaklaşık 300 milyon alveol yaklaşık 70 m² sağlar; amfizem, pulmoner emboli ve akciğer rezeksiyonu bu alanı küçültür. [[K1 s. 40, 43]]',
        T: '<b>Kalınlık.</b> Hız bariyer kalınlığıyla ters orantılıdır. Bariyer bazı yerlerde 200 nm kadar incedir; pulmoner fibrozis ve pulmoner ödem onu kalınlaştırır. [[K1 s. 40, 42]]',
        G: '<b>Parsiyel basınç gradyanı (Fick yasası).</b> Hız gradyanla doğru orantılıdır. Belirli bir klinik durumda değiştirilebilen etken budur: O₂ için FiO₂ artırılır. [[K1 s. 40]]',
        gaz: gaz === 'co2'
          ? '<b>CO₂.</b> Molekül ağırlığı daha büyüktür (44\'e karşı 32 Da) ve Graham yasasına göre CO₂\'yi biraz yavaşlatır; ama çözünürlük katsayısı çok daha yüksek olduğu için aynı gradyanda O₂\'den yaklaşık 20 kat hızlı difüze olur. Yön de terstir: CO₂ kandan alveole geçer. [[K1 s. 40]]'
          : '<b>O₂.</b> Alveolden kana geçer. Çözünürlüğü ve molekül ağırlığı gaza özgüdür; klinikte değiştirilemez. [[K1 s. 40]]',
      };
      const c = C[son];
      if (c !== lastCap) { cap.innerHTML = REF(c); lastCap = c; }
    };
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      const v = +r.value; if (r.dataset.r === 'A') A = v; else if (r.dataset.r === 'T') T = v; else G = v;
      son = r.dataset.r; yerlesim(); yaz(); ciz(zaman);
    });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-g]'); if (!b) return;
      gaz = b.dataset.g; son = 'gaz'; basSec(el, 'g', gaz); PARC.forEach((p) => { p.on = false; }); yaz(); ciz(zaman);
    });
    yerlesim(); yaz(); ciz(0);
    return ticker(el, (dt) => {
      zaman += dt;
      if (!RM) {
        birikim += dt * clamp(3 * hiz(), 0, 40);
        while (birikim >= 1) {
          birikim -= 1;
          const p = PARC.find((q) => !q.on);
          if (p) { p.on = true; p.t = 0; p.dur = 1.3 + 0.35 * T; p.x = geo.x0 + 8 + rnd() * (geo.w - 16); }
        }
        PARC.forEach((p) => { if (p.on) { p.t += dt; if (p.t >= p.dur) p.on = false; } });
      }
      ciz(zaman);
    });
  };

  /* ---------- 2 · Kapiller boyunca: O₂, N₂O, volatil, CO (perfüzyon / difüzyon sınırlaması) ---------- */
  VIZ.f10_kapiller = (el) => {
    const PO2 = o2Egri(13.3, 5.3, 1, 0.75);
    const ust = (tau) => (t) => 1 - Math.exp(-t / tau);
    const GZ = {
      o2: { ad: 'O₂', f: (t) => degerAt(PO2, t) / 13.3, denge: dengeZ(PO2, 13.3) },
      n2o: { ad: 'N₂O', f: ust(0.0163), denge: 0.075 },
      vol: { ad: 'Volatil', f: ust(0.03), denge: 0.138, kesik: true },
      co: { ad: 'CO', f: ust(25), denge: null },
    };
    const SIRA = ['o2', 'n2o', 'vol', 'co'];
    // kan akımı iki katına çıkınca dakikada aktarılan miktarın oranı
    const oran = (k) => {
      if (k === 'o2') return (2 * (icerik(degerAt(PO2, 0.375)) - icerik(5.3))) / (icerik(degerAt(PO2, 0.75)) - icerik(5.3));
      const f = GZ[k].f; return (2 * f(0.375)) / f(0.75);
    };
    const X0 = 46, X1 = 342, YT = 104, YB = 262;
    const X = (t) => X0 + (t / 0.75) * (X1 - X0), Y = (f) => YB - f * (YB - YT);
    const tam = (k) => yol(Array.from({ length: 151 }, (_, i) => { const t = (i / 150) * 0.75; return [X(t), Y(GZ[k].f(t))]; }));
    let gaz = 'o2', akim = 1, t = 0, bekle = 0, run = !RM, last = '';
    el.innerHTML = `<div class="viz-head"><h3>Eritrosit kapilleri geçerken</h3>${segHtml('Gaz', 'g', SIRA.map((k) => [k, GZ[k].ad]), 'o2')}</div>
      <div class="f10-ik">
        <div>
          <svg class="f10-svg" viewBox="0 0 360 300" role="img" aria-label="Kapiller boyunca parsiyel basınç: N₂O hızla, O₂ 0,25 saniyede dengeye gelir, CO hiç gelmez">
            <rect class="f10-ik-alv" x="${X0}" y="6" width="${X1 - X0}" height="30" rx="8"/>
            <text class="f10-lb" x="${X0 + 8}" y="25">Alveol</text>
            <line class="f10-ik-zar" x1="${X0}" x2="${X1}" y1="39" y2="39"/>
            <rect class="f10-ik-kap" x="${X0}" y="42" width="${X1 - X0}" height="26" rx="13"/>
            <g class="f10-ik-ok"></g>
            <circle class="f10-ik-hale" r="14" cy="55"/>
            <ellipse class="f10-ik-rbc" rx="11" ry="7" cy="55"/>
            <text class="f10-tk" x="${X0}" y="84">kapiller başı</text>
            <text class="f10-tk f10-ik-son" y="84" text-anchor="end">kapiller sonu</text>
            <rect class="f10-ik-cik" y="${YT}" height="${YB - YT}"/>
            ${[0, 0.5, 1].map((f) => `<line class="f10-grid" x1="${X0}" x2="${X1}" y1="${Y(f)}" y2="${Y(f)}"/><text class="f10-tk" x="${X0 - 6}" y="${Y(f) + 4}" text-anchor="end">${f * 100}</text>`).join('')}
            ${[0, 0.25, 0.5, 0.75].map((s) => `<line class="f10-grid" x1="${X(s)}" x2="${X(s)}" y1="${YT}" y2="${YB}"/><text class="f10-tk" x="${X(s)}" y="${YB + 16}" text-anchor="middle">${fmt(s, s ? 2 : 0)}</text>`).join('')}
            <text class="f10-tk" text-anchor="middle" transform="translate(11 ${(YT + YB) / 2}) rotate(-90)">% alveoler değer</text>
            <text class="f10-tk" x="${X1}" y="${YB + 32}" text-anchor="end">eritrositin kapillerde geçirdiği süre (s)</text>
            ${SIRA.map((k) => `<path class="f10-ik-sol${GZ[k].kesik ? ' kesik' : ''}" data-k="${k}" d="${tam(k)}" style="stroke:${RENK[k]}"/>`).join('')}
            <path class="f10-ik-iz" d=""/>
            <line class="f10-ik-sonc" y1="${YT - 4}" y2="${YB}"/>
            <circle class="f10-ik-nk" r="5"/>
          </svg>
          <div class="f10-lej">${SIRA.map((k) => `<span class="f10-lej-${k}${GZ[k].kesik ? ' kesik' : ''}" style="--k:${RENK[k]}"><i></i>${GZ[k].ad}</span>`).join('')}</div>
          <div class="btn-row f10-ik-btn">${segHtml('Kan akımı', 'q', [['1', 'Normal akım'], ['2', 'Akım ×2']], '1')}<button type="button" class="btn ghost" data-a="oynat">Duraklat</button></div>
        </div>
        <dl class="f10-oku f10-ik-oku">
          <div><dt>Denge</dt><dd data-o="d"></dd></div>
          <div><dt>Kapiller sonunda</dt><dd data-o="s"></dd></div>
          <div><dt>Aktarımı sınırlayan</dt><dd data-o="l"></dd></div>
          <div><dt>Kan akımı iki katına çıkınca dakikada aktarılan</dt><dd data-o="x"></dd></div>
        </dl>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model, yavaş çekim (×5). Parsiyel basınçlar alveoler değerin yüzdesidir. O₂ eğrisi kitaptaki değerlerle hesaplanır (miks venöz 5,3, alveoler 13,3 kPa; Hb 15 g/dL; P50 3,5 kPa); N₂O, volatil ve CO eğrileri kitaptaki davranışa oturtulmuş üstel eğrilerdir; N₂O ve volatil için venöz parsiyel basınç sıfır alındı (ilk geçiş). Akım ×2 karşılaştırması modelin sonucudur. [[K1 s. 30, 32, 41]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const iz = $('.f10-ik-iz'), sonc = $('.f10-ik-sonc'), nk = $('.f10-ik-nk'), rbc = $('.f10-ik-rbc'), hale = $('.f10-ik-hale'), okG = $('.f10-ik-ok'), cik = $('.f10-ik-cik'), cap = $('.viz-cap'), oyn = $('[data-a="oynat"]');
    const oklar = [0, 1, 2].map(() => mk('path', { class: 'f10-ik-okl' }, okG));
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const sec = () => {
      el.querySelectorAll('.f10-ik-sol').forEach((p) => p.classList.toggle('on', p.dataset.k === gaz));
      el.querySelectorAll('.f10-lej span').forEach((p) => p.classList.toggle('on', p.className.includes('f10-lej-' + gaz)));
      iz.style.stroke = RENK[gaz]; nk.style.fill = RENK[gaz]; hale.style.fill = RENK[gaz];
      oklar.forEach((l) => { l.style.stroke = RENK[gaz]; });
      const tr = 0.75 / akim, G = GZ[gaz];
      o('d').textContent = G.denge === null ? 'kurulmaz' : `${fmt(G.denge, G.denge < 0.1 ? 3 : 2)} s${gaz === 'vol' ? ' (şematik)' : ''}`;
      const fs = G.f(tr);
      o('s').textContent = `%${Math.round(fs * 100)}` + (fs > 0.99 ? ' · alveolle eşit' : ' · büyük fark sürüyor');
      o('l').textContent = G.denge === null ? 'difüzyon' : 'perfüzyon';
      o('x').textContent = '×' + fmt(oran(gaz), 1);
      sonc.setAttribute('x1', X(tr)); sonc.setAttribute('x2', X(tr));
      cik.setAttribute('x', X(tr)); cik.setAttribute('width', Math.max(0, X1 - X(tr)));
      $('.f10-ik-son').setAttribute('x', X1);
      const C = {
        o2: '<b>O₂.</b> Plazmaya geçen O₂ PO₂\'yi yükseltir, gradyan küçülür; yaklaşık 0,25 s\'de alveoler ve kapiller PO₂ eşitlenir ve net difüzyon durur. Kapillerin geri kalanı yedektir: aktarım perfüzyonla sınırlıdır. [[K1 s. 41]]',
        n2o: '<b>N₂O.</b> Hb\'ye bağlanmaz, plazmada yalnızca çözünmüş olarak taşınır; plazma parsiyel basıncı 0,075 s içinde alveoler değere ulaşır. Daha fazla kan gelseydi daha fazla N₂O geçerdi: perfüzyonla sınırlı. [[K1 s. 41]]',
        vol: '<b>Volatil anestezikler.</b> N₂O gibi Hb\'ye bağlanmaz ve perfüzyonla sınırlıdır; dengeye N₂O\'dan biraz daha geç ulaşır. [[K1 s. 41]]',
        co: '<b>CO.</b> Hb\'ye O₂\'den 250 kat yüksek afiniteyle bağlanır; plazmada neredeyse hiç çözünmüş CO kalmaz. Kapiller sonunda bile büyük bir parsiyel basınç farkı sürer: aktarımı gelen kan miktarı değil difüzyon hızı sınırlar. [[K1 s. 41]]',
      };
      let c = C[gaz];
      if (akim === 2) c += gaz === 'co'
        ? ' <b>Akım ×2:</b> eritrosit kapilleri 0,375 s\'de geçer ve her biri yaklaşık yarı yarıya az CO alır; dakikada aktarılan toplam CO değişmez.'
        : ' <b>Akım ×2:</b> eritrosit kapilleri 0,375 s\'de geçer, denge yine kurulur; dakikada iki kat fazla gaz taşınır.';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    const ciz = () => {
      const tr = 0.75 / akim, tt = Math.min(t, tr), G = GZ[gaz];
      const n = Math.max(2, Math.round((tt / 0.75) * 150));
      iz.setAttribute('d', yol(Array.from({ length: n + 1 }, (_, i) => { const s = (i / n) * tt; return [X(s), Y(G.f(s))]; })));
      const f = G.f(tt);
      nk.setAttribute('cx', X(tt)); nk.setAttribute('cy', Y(f));
      const rx = X0 + 12 + (tt / tr) * (X1 - X0 - 24);
      rbc.setAttribute('cx', rx); hale.setAttribute('cx', rx); hale.setAttribute('opacity', (0.12 + 0.55 * f).toFixed(2));
      const gr = clamp(1 - f, 0, 1);
      oklar.forEach((l, i) => {
        const x = rx + (i - 1) * 12;
        l.setAttribute('d', `M${x.toFixed(1)} 27V44M${(x - 3.5).toFixed(1)} 39.5L${x.toFixed(1)} 45L${(x + 3.5).toFixed(1)} 39.5`);
        l.setAttribute('stroke-width', (0.6 + 2.6 * gr).toFixed(2)); l.setAttribute('opacity', gr < 0.02 ? 0 : 0.9);
      });
    };
    el.addEventListener('click', (e) => {
      const g = e.target.closest('[data-g]'); if (g) { gaz = g.dataset.g; basSec(el, 'g', gaz); t = RM ? 1 : 0; bekle = 0; sec(); ciz(); return; }
      const q = e.target.closest('[data-q]'); if (q) { akim = +q.dataset.q; basSec(el, 'q', String(akim)); t = RM ? 1 : 0; bekle = 0; sec(); ciz(); return; }
      if (e.target.closest('[data-a="oynat"]')) { run = !run; oyn.textContent = run ? 'Duraklat' : 'Oynat'; }
    });
    if (RM) { t = 1; oyn.hidden = true; }
    sec(); ciz();
    return ticker(el, (dt) => {
      if (!run) return;
      const tr = 0.75 / akim;
      if (t < tr) t = Math.min(tr, t + dt / 5);
      else { bekle += dt; if (bekle > 1.6) { t = 0; bekle = 0; } }
      ciz();
    });
  };

  /* ---------- 3 · O₂ ne zaman difüzyonla sınırlı? Bariyer, egzersiz, irtifa, FiO₂ ---------- */
  VIZ.f10_sinir = (el) => {
    const BAR = { n: [1, 'Normal'], h: [1 / 2.8, 'Hafif kalınlaşma'], b: [1 / 4.5, 'Belirgin kalınlaşma'] };
    const TR = { '0.75': 'İstirahat · 0,75 s', '0.5': 'Egzersiz · 0,5 s', '0.25': 'Aşırı egzersiz · 0,25 s' };
    const ORT = { deniz: [101.3, 5.3, 'Deniz seviyesi'], irtifa: [76, 4.5, 'Yüksek irtifa'] };
    let b = 'n', tr = 0.75, ort = 'deniz', fio = 0.21, t = 0, run = !RM, last = '', P = null, PA = 13.3;
    const X0 = 40, X1 = 342, YT = 14, YB = 214, YMAX = 24;
    const X = (s) => X0 + (s / 0.75) * (X1 - X0), Y = (p) => YB - (clamp(p, 0, YMAX) / YMAX) * (YB - YT);
    const REFP = o2Egri(PAO2(0.21, 101.3), 5.3, 1);
    const egriYol = (A) => yol(Array.from({ length: 151 }, (_, i) => { const s = (i / 150) * 0.75; return [X(s), Y(degerAt(A, s))]; }));
    el.innerHTML = `<div class="viz-head"><h3>Kapiller sonu PO₂: güvenlik payı ne zaman tükenir?</h3><button type="button" class="btn ghost" data-a="oynat">Baştan oynat</button></div>
      <div class="f10-sn">
        <div class="f10-sn-ctl">
          <div class="f10-sat"><span>Bariyer</span>${segHtml('Bariyer', 'b', Object.entries(BAR).map(([k, v]) => [k, v[1]]), 'n')}</div>
          <div class="f10-sat"><span>Geçiş süresi</span>${segHtml('Eritrosit geçiş süresi', 't', Object.entries(TR), '0.75')}</div>
          <div class="f10-sat"><span>Ortam</span>${segHtml('Ortam', 'ortam', Object.entries(ORT).map(([k, v]) => [k, v[2]]), 'deniz')}</div>
          <div class="f10-sat"><span>FiO₂</span>${segHtml('FiO₂', 'f', [['0.21', '0,21'], ['0.3', '0,30']], '0.21')}</div>
          <dl class="f10-oku">
            <div><dt>Alveoler PO₂</dt><dd data-o="pa"></dd></div>
            <div><dt>Kapiller sonu PO₂</dt><dd data-o="pe"></dd></div>
            <div><dt>Denge</dt><dd data-o="d"></dd></div>
            <div><dt>Güvenlik payı</dt><dd data-o="g"></dd></div>
          </dl>
          <p class="f10-sn-tag"><span class="tag" data-o="tag"></span></p>
        </div>
        <svg class="f10-svg f10-sn-svg" viewBox="0 0 360 250" role="img" aria-label="Pulmoner kapiller PO₂'nin zamana göre yükselişi; kapiller sonundaki değer seçilen koşullara göre değişir">
          ${[0, 4, 8, 12, 16, 20, 24].map((p) => `<line class="f10-grid" x1="${X0}" x2="${X1}" y1="${Y(p)}" y2="${Y(p)}"/><text class="f10-tk" x="${X0 - 6}" y="${Y(p) + 4}" text-anchor="end">${p}</text>`).join('')}
          ${[0, 0.25, 0.5, 0.75].map((s) => `<line class="f10-grid" x1="${X(s)}" x2="${X(s)}" y1="${YT}" y2="${YB}"/><text class="f10-tk" x="${X(s)}" y="${YB + 15}" text-anchor="middle">${fmt(s, s ? 2 : 0)}</text>`).join('')}
          <text class="f10-tk" x="${X0 + 4}" y="${YT + 12}">PO₂ (kPa)</text>
          <text class="f10-tk" x="${X1}" y="${YB + 31}" text-anchor="end">eritrositin kapillerde geçirdiği süre (s)</text>
          <rect class="f10-ik-cik f10-sn-cik" y="${YT}" height="${YB - YT}"/>
          <path class="f10-sn-ref" d="${egriYol(REFP)}"/>
          <line class="f10-sn-pa" x1="${X0}" x2="${X1}"/>
          <text class="f10-sn-pal" x="${X1 - 2}" text-anchor="end"></text>
          <path class="f10-sn-egri" d=""/>
          <path class="f10-sn-iz" d=""/>
          <line class="f10-ik-sonc f10-sn-sonc" y1="${YT}" y2="${YB}"/>
          <text class="f10-tk f10-sn-sonl" y="${YB - 6}" text-anchor="end">kapiller sonu</text>
          <circle class="f10-sn-rbc" r="6"/>
          <text class="f10-sn-pel"></text>
        </svg>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model. Kesikli gri eğri: deniz seviyesinde normal akciğer. Kapiller O₂ içeriği dC/dt = k·(PAO₂ − PO₂) ile artar; PO₂ içerikten Hill eğrisiyle (Hb 15 g/dL, P50 3,5 kPa) hesaplanır [[K1 s. 30, 32]]. k, normal bariyerde dengeyi ≈ 0,25 s\'de kuracak biçimde seçildi [[K1 s. 40]]; hafif ve belirgin kalınlaşmada 2,8 ve 4,5 kat küçüktür. PAO₂ alveoler gaz denkleminden (PH₂O 6,3 kPa, PaCO₂ 5,3 kPa, R 0,8; irtifadaki hiperventilasyon hesaba katılmadı); irtifada PB 76 kPa ve miks venöz PO₂ 4,5 kPa varsayıldı. 0,75 ve 0,25 s kitaptaki geçiş süreleridir [[K1 s. 40, 42]]; 0,5 s ara bir örnek değerdir. Denge: fark 0,1 kPa\'nın altında.')}</p>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`), cap = $('.viz-cap');
    const egri = $('.f10-sn-egri'), izp = $('.f10-sn-iz'), rbcC = $('.f10-sn-rbc'), sonc = $('.f10-sn-sonc'), sonl = $('.f10-sn-sonl'), cik = $('.f10-sn-cik'), pel = $('.f10-sn-pel');
    const hesap = () => {
      const [PB, PV] = ORT[ort];
      PA = PAO2(fio, PB); P = o2Egri(PA, PV, BAR[b][0]);
      egri.setAttribute('d', egriYol(P));
      $('.f10-sn-pa').setAttribute('y1', Y(PA)); $('.f10-sn-pa').setAttribute('y2', Y(PA));
      const pal = $('.f10-sn-pal'); pal.setAttribute('y', Y(PA) - 6); pal.textContent = `alveoler PO₂ ${fmt(PA)} kPa`;
      sonc.setAttribute('x1', X(tr)); sonc.setAttribute('x2', X(tr)); sonl.setAttribute('x', tr > 0.6 ? X(tr) - 4 : X(tr) + 4); sonl.setAttribute('text-anchor', tr > 0.6 ? 'end' : 'start');
      cik.setAttribute('x', X(tr)); cik.setAttribute('width', X1 - X(tr));
      const pe = degerAt(P, tr), te = dengeZ(P, PA), ok = te !== null && te <= tr + 1e-9, fark = PA - pe;
      o('pa').textContent = `${fmt(PA)} kPa`;
      o('pe').textContent = `${fmt(pe)} kPa · SO₂ %${Math.round(sat(pe) * 100)}`;
      o('d').textContent = ok ? `${fmt(te, 2)} s'de` : te === null ? 'kurulmaz' : `${fmt(te, 2)} s'de (geç)`;
      o('g').textContent = ok ? '×' + fmt(tr / te, 1) : 'yok';
      const tag = o('tag');
      tag.className = 'tag ' + (ok ? 'ok' : 'crit');
      tag.textContent = ok ? 'Perfüzyonla sınırlı · denge var' : `Difüzyonla sınırlı · ${fmt(fark)} kPa eksik`;
      pel.textContent = fmt(pe);
      const parts = [];
      const nor = b === 'n' && ort === 'deniz' && fio === 0.21;
      if (nor) parts.push(tr === 0.75 ? '<b>Normal akciğer, deniz seviyesi, istirahat.</b> Denge yaklaşık 0,25 s\'de kurulur; eritrosit kapilleri 0,75 s\'de geçtiği için yaklaşık üç katlık güvenlik payı vardır. [[K1 s. 40]]'
        : tr === 0.5 ? '<b>Egzersiz.</b> Kalp debisi artınca eritrositin kapillerde kaldığı süre kısalır; normal bariyerde güvenlik payı hâlâ yeterlidir. [[K1 s. 42]]'
          : '<b>Aşırı egzersiz.</b> Geçiş süresi 0,25 s\'ye iner; normal bariyerde alveoler ve plazma PO₂ bu sürede ancak dengeye gelir. [[K1 s. 42]]');
      else {
        if (b !== 'n') parts.push(`<b>${b === 'h' ? 'Hafif' : 'Belirgin'} bariyer kalınlaşması</b> (ör. pulmoner fibrozis) difüzyon hızını düşürür, eğri daha yavaş yükselir. [[K1 s. 42]]`);
        if (tr < 0.75) parts.push(`<b>${tr === 0.25 ? 'Aşırı egzersiz' : 'Egzersiz'}</b> geçiş süresini kısaltır (aşırı egzersizde 0,25 s'ye kadar); ${b === 'n' ? 'normal bariyerde deniz seviyesinde denge 0,25 s\'de ancak kurulur.' : 'bariyer hastalığında her kısalma hipoksemiye yol açar.'} [[K1 s. 42]]`);
        if (ort === 'irtifa') {
          let ek = '';
          if (b === 'n' && tr < 0.75) ek = ' Yüksekte normal akciğerde bile yoğun egzersiz difüzyon sınırlamasına ve hipoksemiye yol açabilir.';
          else if (b === 'h' && tr === 0.75) ek = ' Deniz seviyesinde istirahatte dengeye ancak ulaşan hafif akciğer hastası yüksekte O₂ difüzyon bozukluğu geliştirir.';
          parts.push(`<b>İrtifa:</b> düşük PB alveoler PO₂'yi ve gradyanı düşürür; O₂ aktarımı daha düşük bir eşikte difüzyonla sınırlı olur.${ek} [[K1 s. 42]]`);
        }
        if (fio > 0.21) parts.push('<b>FiO₂ artışı</b> O₂ basınç gradyanını yükseltir ve kalınlaşmış bariyerin etkisini dengeleyebilir; pulmoner fibroziste egzersiz hipoksemisine taşınabilir O₂ verilmesi bu yüzdendir. [[K1 s. 43]]');
      }
      parts.push(ok ? `Sonuç: denge ${fmt(te, 2)} s'de kurulur, aktarım perfüzyonla sınırlı.` : `Sonuç: eritrosit kapillerden çıkarken PO₂ alveoler değerin ${fmt(fark)} kPa altındadır; aktarım difüzyonla sınırlı.`);
      const c = parts.join(' ');
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    const ciz = () => {
      const s = Math.min(t, tr), p = degerAt(P, s);
      const n = Math.max(2, Math.round((s / 0.75) * 150));
      izp.setAttribute('d', yol(Array.from({ length: n + 1 }, (_, i) => { const q = (i / n) * s; return [X(q), Y(degerAt(P, q))]; })));
      rbcC.setAttribute('cx', X(s)); rbcC.setAttribute('cy', Y(p));
      const bitti = t >= tr;
      pel.setAttribute('opacity', bitti ? 1 : 0);
      pel.setAttribute('x', X(tr) + (tr > 0.6 ? -10 : 10)); pel.setAttribute('y', Y(degerAt(P, tr)) + 20);
      pel.setAttribute('text-anchor', tr > 0.6 ? 'end' : 'start');
    };
    const yeniden = () => { t = RM ? 1 : 0; hesap(); ciz(); };
    el.addEventListener('click', (e) => {
      const x = e.target.closest('button[data-b],button[data-t],button[data-ortam],button[data-f],button[data-a]'); if (!x) return;
      if (x.dataset.b) { b = x.dataset.b; basSec(el, 'b', b); }
      else if (x.dataset.t) { tr = +x.dataset.t; basSec(el, 't', x.dataset.t); }
      else if (x.dataset.ortam) { ort = x.dataset.ortam; basSec(el, 'ortam', ort); }
      else if (x.dataset.f) { fio = +x.dataset.f; basSec(el, 'f', x.dataset.f); }
      run = !RM; yeniden();
    });
    yeniden();
    return ticker(el, (dt) => { if (!run || t >= tr) return; t = Math.min(tr, t + dt / 4); ciz(); });
  };

  /* ---------- 4 · Tek soluk DLCO testi ve sonucu değiştiren durumlar ---------- */
  VIZ.f10_dlco = (el) => {
    const K0 = 0.05; // 1/s: normalde 10 s'de alveoldeki CO'nun ≈ %40'ı alınır (şematik)
    const DUR = {
      normal: { ad: 'Normal', k: 1, va: 1, dl: '—', t: '<b>Normal.</b> 10 s içinde alveoldeki CO\'nun bir bölümü bariyeri geçip Hb\'ye bağlanır. Plazma PCO\'su sıfıra yakın kaldığı için gradyan test boyunca sürer; alım kan akımını değil bariyeri yansıtır. [[K1 s. 41–42]]' },
      fibroz: { ad: 'Pulmoner fibrozis', k: 0.5, va: 1, dl: '↓', duvar: 3, t: '<b>Pulmoner fibrozis ve diğer interstisyel akciğer hastalıkları (kronik).</b> Bariyer kalınlaşır: aynı sürede daha az CO geçer, DLCO azalır. [[K1 s. 42]]' },
      odem: { ad: 'Pulmoner ödem', k: 0.65, va: 1, dl: '↓', duvar: 2, sivi: true, t: '<b>Pulmoner ödem (akut).</b> Sıvı bariyeri kalınlaştırır ve gaz değişimine açık alanı azaltır: DLCO azalır. [[K1 s. 42–43]]' },
      amfizem: { ad: 'Amfizem', k: 0.55, va: 1, dl: '↓', kapF: 0.5, t: '<b>Amfizem.</b> Gaz değişim yüzeyi küçülür: DLCO azalır [[K1 s. 43]]. Atlas notu: alveol duvarları ve içlerindeki kapillerler yıkılır.' },
      emboli: { ad: 'Pulmoner emboli', k: 0.7, va: 1, dl: '↓', kapF: 0.62, tikali: true, t: '<b>Pulmoner emboli.</b> Gaz değişim yüzeyi küçülür: DLCO azalır [[K1 s. 43]]. Atlas notu: tıkalı damarın beslediği kapillerler kanlanmaz, CO alamaz.' },
      pnomo: { ad: 'Pnömonektomi', k: 1, va: 0.5, dl: '↓', kco: 'normal (modelde)', t: '<b>Pnömonektomi ya da lobektomi sonrası.</b> Gaz değişim yüzeyi azalır, DLCO düşer. Alveoler hacim kaybına göre düzeltilmiş transfer katsayısı (KCO) kalan alveollerin işlevini gösterir [[K1 s. 43]]: modelde kalan alveoller normal olduğu için her alveoldeki CO alım oranı değişmez. Atlas notu: gerçekte kalan akciğere yönelen kan akımı kapiller kan hacmini artırdığından KCO normal ya da yüksek bulunur.' },
      egzersiz: { ad: 'Egzersiz', k: 1.35, va: 1, dl: '↑', genis: true, t: '<b>Egzersiz.</b> Pulmoner kapillerler açılır (recruitment) ve genişler: DLCO artar. [[K1 s. 43]]' },
      kanama: { ad: 'Pulmoner kanama', k: 1.5, va: 1, dl: '↑', alvRbc: true, t: '<b>Pulmoner kanama.</b> DLCO artar [[K1 s. 43]]. Atlas notu: alveol içine geçen eritrositlerin Hb\'si de CO bağlar.' },
      astim: { ad: 'Astım', k: 1.1, va: 1, dl: '↑ ya da normal', t: '<b>Astım.</b> DLCO artmış bulunabilir, ama normal de olabilir. [[K1 s. 43]]' },
      obezite: { ad: 'Obezite', k: 1.15, va: 1, dl: '↑', t: '<b>Obezite.</b> DLCO artmış bulunabilir. [[K1 s. 43]]' },
      anemi: { ad: 'Anemi (Atlas notu)', k: 0.8, va: 1, dl: '↓ (düzeltilmezse)', rbcN: 3, t: '<b>Anemi (Atlas notu).</b> CO\'yu bağlayacak Hb azdır; ölçülen DLCO düşük çıkar. Sonucun Hb konsantrasyonuna göre düzeltilmesinin nedeni budur. [[K1 s. 42]]' },
    };
    const ADIM = [
      ['Vital kapasite soluğu', 2.2, '<b>1 · İnspirasyon.</b> Hasta %0,3 CO içeren gazdan tek bir vital kapasite soluğu alır. [[K1 s. 42]]'],
      ['10 s nefes tutma', 6, '<b>2 · 10 s nefes tutma.</b> CO bariyeri geçer ve Hb\'ye bağlanır; Hb\'ye afinitesi O₂\'nin 250 katı olduğu için plazma PCO\'su düşük kalır. Alveoldeki CO giderek azalır. [[K1 s. 41–42]]'],
      ['Ekspirasyon ve ölçüm', 2.2, '<b>3 · Ekspirasyon.</b> Hasta soluğu verir; ekspire edilen gazdaki PCO ölçülür. [[K1 s. 42]]'],
      ['Hesap', 3, '<b>4 · Hesap.</b> İnspire ile ekspire PCO arasındaki fark, bariyeri geçip Hb\'ye bağlanan CO miktarıdır. Sonuç genellikle Hb konsantrasyonuna göre düzeltilir; irtifa, yaş ve cinsiyet de etkiler. [[K1 s. 42]]'],
    ];
    const N = 24, AX0 = 118, AX1 = 350, AY0 = 14, AY1 = 128, KY = 150, KH = 24;
    let dur = 'normal', s = 0, ts = 0, run = !RM, last = '';
    el.innerHTML = `<div class="viz-head"><h3>Tek soluk DLCO testi</h3><div class="btn-row"><button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">‹</button><button type="button" class="btn play" data-a="oynat">Duraklat</button><button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">›</button></div></div>
      <div class="f10-dl">
        <svg class="f10-svg" viewBox="0 0 360 230" role="img" aria-label="Alveole giren CO, 10 saniyelik nefes tutmada bariyeri geçip eritrositlere bağlanır; ekspire edilen gazda kalan CO ölçülür">
          <rect class="f10-dl-an" x="6" y="22" width="96" height="92" rx="10"/>
          <text class="f10-lb" x="14" y="42">Analizör</text>
          <text class="f10-dl-ok1 f10-tk" x="14" y="64"></text>
          <text class="f10-dl-ok2 f10-tk" x="14" y="82"></text>
          <text class="f10-dl-ok3 f10-dl-al" x="14" y="104"></text>
          <path class="f10-dl-boru" d="M102 68 H${AX0}"/>
          <rect class="f10-dl-alv" y="${AY0}" height="${AY1 - AY0}" rx="34"/>
          <text class="f10-lb f10-dl-alvl" y="${AY0 + 18}">Alveol</text>
          <text class="f10-dl-sure" y="${AY0 + 18}" text-anchor="end"></text>
          <rect class="f10-dl-sivi" y="${AY1 - 14}" height="14"/>
          <line class="f10-dl-zar" y1="${AY1 + 6}" y2="${AY1 + 6}"/>
          <rect class="f10-dl-kap" y="${KY}" rx="12"/>
          <rect class="f10-dl-kapx" y="${KY}" rx="12"/>
          <text class="f10-tk f10-dl-kapl" y="${KY + KH + 34}"></text>
          <g class="f10-dl-rbcs"></g><g class="f10-dl-co"></g>
          <text class="f10-tk" x="${AX0}" y="222">alveoldeki CO</text>
          <rect class="f10-dl-trk" x="${AX0 + 106}" y="213" width="126" height="10" rx="5"/>
          <rect class="f10-dl-fl" x="${AX0 + 106}" y="213" height="10" rx="5"/>
        </svg>
        <ol class="f10-adim">${ADIM.map((a, i) => `<li><button type="button" data-s="${i}">${a[0]}</button></li>`).join('')}</ol>
      </div>
      <div class="f10-dl-dur">${Object.entries(DUR).map(([k, v]) => `<button type="button" data-d="${k}" aria-pressed="${k === 'normal'}"><b>${v.ad}</b><span>DLCO ${v.dl}</span></button>`).join('')}</div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="f10-dl-det small" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model: alveoldeki CO, nefes tutma boyunca üstel olarak azalır; hız sabiti durumlara göre temsili olarak değiştirildi, oklar kitaptaki yöndür [[K1 s. 42–43]]. Ekspire değerde ölü boşluk ve seyrelme ihmal edildi; gerçek testte ölü boşluk gazı atılıp alveoler örnek ölçülür, seyrelme iz gazla düzeltilir (Atlas notu).')}</p>`;
    const $ = (q) => el.querySelector(q), cap = $('.viz-cap'), det = $('.f10-dl-det'), oyn = $('[data-a="oynat"]');
    const rbcG = $('.f10-dl-rbcs'), coG = $('.f10-dl-co');
    const coC = Array.from({ length: N }, () => mk('circle', { r: 3.4, class: 'f10-dl-m' }, coG));
    const coP = Array.from({ length: N }, () => ({ x: rnd(), y: rnd(), ph: rnd() * 6.28, hedef: 0 }));
    let rbcs = [], geo = {};
    const kur = () => {
      const D = DUR[dur];
      const ax1 = D.va < 1 ? AX0 + (AX1 - AX0) * 0.56 : AX1;
      geo = { ax1, kx0: AX0 + 20, kx1: ax1 - 10, n: Math.round(N * D.va) };
      $('.f10-dl-alv').setAttribute('x', AX0); $('.f10-dl-alv').setAttribute('width', ax1 - AX0);
      $('.f10-dl-alvl').setAttribute('x', AX0 + 14); $('.f10-dl-sure').setAttribute('x', ax1 - 12); $('.f10-dl-sure').setAttribute('y', D.va < 1 ? AY0 + 36 : AY0 + 18);
      const zar = $('.f10-dl-zar'); zar.setAttribute('x1', geo.kx0); zar.setAttribute('x2', geo.kx1); zar.setAttribute('stroke-width', 2 + 3 * (D.duvar || 0)); zar.classList.toggle('kalin', !!D.duvar);
      const sv = $('.f10-dl-sivi'); sv.setAttribute('x', AX0 + 10); sv.setAttribute('width', ax1 - AX0 - 20); sv.setAttribute('opacity', D.sivi ? 1 : 0);
      const kh = D.genis ? KH + 10 : KH;
      const kap = $('.f10-dl-kap'); kap.setAttribute('x', geo.kx0); kap.setAttribute('width', geo.kx1 - geo.kx0); kap.setAttribute('height', kh);
      const kf = D.kapF || 1, kxe = geo.kx0 + (geo.kx1 - geo.kx0) * kf;
      const kx = $('.f10-dl-kapx'); kx.setAttribute('x', kxe); kx.setAttribute('width', Math.max(0, geo.kx1 - kxe)); kx.setAttribute('height', kh); kx.setAttribute('opacity', kf < 1 ? 1 : 0);
      const kl = $('.f10-dl-kapl'); kl.setAttribute('x', AX0); kl.setAttribute('y', KY + kh + 16);
      kl.textContent = D.tikali ? 'gri: kanlanmayan kapiller' : kf < 1 ? 'gri: yıkılmış kapiller' : D.genis ? 'açılmış ve genişlemiş kapiller' : D.rbcN ? 'az eritrosit (düşük Hb)' : 'pulmoner kapiller';
      const n = D.rbcN || (D.genis ? 8 : Math.round(6 * D.va));
      rbcG.innerHTML = '';
      rbcs = [];
      for (let i = 0; i < n; i++) {
        const x = geo.kx0 + 16 + (i + 0.5) * ((kxe - geo.kx0 - 32) / n);
        rbcs.push({ x, y: KY + kh / 2 + (D.genis ? (i % 2 ? 5 : -5) : 0) });
      }
      if (D.alvRbc) [[AX0 + 70, AY1 - 18], [AX0 + 132, AY1 - 22]].forEach(([x, y]) => rbcs.push({ x, y, alv: true }));
      rbcs.forEach((r) => mk('ellipse', { cx: r.x, cy: r.y, rx: 10, ry: 6, class: 'f10-dl-rbc' + (r.alv ? ' alv' : '') }, rbcG));
      coP.forEach((p, i) => { p.hedef = rbcs[(i * 5) % rbcs.length]; });
      el.querySelectorAll('[data-d]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.d === dur)));
      det.innerHTML = REF(`${D.t}${D.kco ? ` <b>DLCO ${D.dl}, KCO ${D.kco}.</b>` : ''}`);
    };
    const F = (sn) => Math.exp(-K0 * DUR[dur].k * sn); // nefes tutmada alveoldeki CO oranı
    const ciz = () => {
      const D = DUR[dur], A = ADIM[s][1], f = clamp(ts / A, 0, 1);
      // nefes tutma süresi (0–10 s) ve kalan CO
      const tut = s === 0 ? 0 : s === 1 ? f * 10 : 10, kal = F(tut);
      const bagli = Math.round(geo.n * (1 - kal));
      const giris = s === 0 ? f : 1, cikis = s >= 2 ? (s === 2 ? f : 1) : 0;
      coC.forEach((c, i) => {
        const p = coP[i];
        if (i >= geo.n) { c.setAttribute('opacity', 0); return; }
        const bag = i < bagli;
        let x = AX0 + 16 + p.x * (geo.ax1 - AX0 - 32), y = AY0 + 30 + p.y * (AY1 - AY0 - 52), op = 1;
        x += RM ? 0 : 2 * Math.sin(ts * 2 + p.ph); y += RM ? 0 : 2 * Math.cos(ts * 1.7 + p.ph);
        if (s === 0) { const q = clamp(giris * 1.6 - p.x * 0.6, 0, 1); x = lerp(AX0 - 2, x, q); y = lerp(68, y, q); op = q > 0 ? 1 : 0; }
        if (bag) { const h = p.hedef; x = h.x + ((i % 3) - 1) * 4; y = h.y + ((i % 2) ? 1.5 : -1.5); }
        else if (s >= 2) { const q = clamp(cikis * 1.5 - (1 - p.x) * 0.5, 0, 1); x = lerp(x, AX0 - 6, q); y = lerp(y, 68, q); op = q >= 1 ? 0 : 1; }
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('opacity', op);
        c.classList.toggle('bag', bag);
      });
      $('.f10-dl-sure').textContent = s === 1 ? `nefes tutma ${Math.floor(tut)} s` : s === 0 ? 'inspirasyon' : 'ekspirasyon';
      $('.f10-dl-fl').setAttribute('width', (126 * (s === 0 ? giris : kal)).toFixed(1));
      $('.f10-dl-ok1').textContent = 'inspire %0,30';
      $('.f10-dl-ok2').textContent = s >= 2 ? `ekspire %${fmt(0.3 * F(10), 2)}` : 'ekspire —';
      $('.f10-dl-ok3').textContent = s === 3 ? `alınan %${Math.round((1 - F(10)) * 100)}` : '';
      el.querySelectorAll('.f10-adim button').forEach((b, i) => { b.classList.toggle('on', i === s); b.classList.toggle('gecti', i < s); });
      let c = ADIM[s][2];
      if (s === 3 && D.va < 1) c += ' Bu hastada alveoler hacim küçük olduğu için toplam alınan CO ve DLCO azalır; hacme göre düzeltilmiş değer (KCO) modelde normaldir.';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    const git = (k) => { s = (k + ADIM.length) % ADIM.length; ts = RM ? ADIM[s][1] : 0; ciz(); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const d = e.target.closest('[data-d]'); if (d) { dur = d.dataset.d; kur(); git(RM ? 3 : 0); run = !RM; oyn.textContent = run ? 'Duraklat' : 'Oynat'; return; }
      const b = e.target.closest('[data-s]'); if (b) { run = false; oyn.textContent = 'Oynat'; git(+b.dataset.s); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'oynat') { run = !run; oyn.textContent = run ? 'Duraklat' : 'Oynat'; if (run && s === 3 && ts >= ADIM[3][1]) git(0); }
      else { run = false; oyn.textContent = 'Oynat'; git(s + (a.dataset.a === 'ileri' ? 1 : -1)); }
    });
    kur();
    if (RM) { s = 3; ts = ADIM[3][1]; oyn.textContent = 'Oynat'; }
    ciz();
    return ticker(el, (dt) => {
      if (run) {
        ts += dt;
        if (ts >= ADIM[s][1]) { if (s < 3) { s += 1; ts = 0; } else if (ts > ADIM[3][1] + 2.5) { s = 0; ts = 0; } }
      }
      ciz();
    });
  };

  /* ---------- 5 · Akut pulmoner ödem: FiO₂ ve PEEP difüzyon terimlerini nasıl değiştirir? ---------- */
  VIZ.f10_odem = (el) => {
    let odem = true, fiyuk = false, peep = false, t = 0, last = '';
    const ALV = [60, 140, 220, 300];
    el.innerHTML = `<div class="viz-head"><h3>Akut pulmoner ödemde difüzyon</h3>
        <div class="btn-row f10-tg"><button type="button" data-x="odem" aria-pressed="true">Pulmoner ödem</button><button type="button" data-x="fio" aria-pressed="false">FiO₂ 0,4</button><button type="button" data-x="peep" aria-pressed="false">PEEP</button></div></div>
      <div class="f10-od">
        <svg class="f10-svg" viewBox="0 0 360 186" role="img" aria-label="Dört alveol ve kapiller: ödemde alveoller sıvıyla dolar ve duvar kalınlaşır; PEEP alveolleri açar, FiO₂ gradyanı yükseltir">
          <rect class="f10-od-int" x="14" y="100" width="332" rx="4"/>
          <g class="f10-od-alv">${ALV.map((x) => `<g data-ax="${x}"><circle class="a" cx="${x}"/><circle class="s" cx="${x}"/><g class="o2"></g></g>`).join('')}</g>
          <rect class="f10-od-kap" x="14" width="332" height="22" rx="11"/>
          ${[40, 90, 140, 190, 240, 290, 330].map((x) => `<ellipse class="f10-od-rbc" cx="${x}" rx="10" ry="6"/>`).join('')}
          <g class="f10-od-peep">${ALV.map((x) => `<path d="M${x} 6v14M${x - 4} 15l4 6 4-6"/>`).join('')}</g>
          <text class="f10-tk" x="16" y="178">kapiller</text>
          <text class="f10-tk f10-od-intl" x="346" y="178" text-anchor="end"></text>
          <text class="f10-od-pl" x="180" y="16" text-anchor="middle">PEEP</text>
        </svg>
        <div class="f10-od-pan">
          ${[['A', 'Yüzey alanı (göreli)'], ['T', 'Bariyer kalınlığı (göreli)'], ['G', 'O₂ gradyanı, kapiller başında'], ['R', 'Difüzyon hızı (Fick, göreli)']].map(([k, l]) => `<div class="f10-od-m"><span>${l}</span><b data-o="${k}"></b><span class="trk"><i data-i="${k}"></i></span></div>`).join('')}
          <div class="f10-od-son"><span>Kapiller sonu PO₂ (istirahat)</span><b data-o="P"></b><span class="tag" data-o="tag"></span></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model: ödemin yüzey alanını yarıya indirip kalınlığı 2,5 katına çıkardığı, PEEP\'in bunları 0,85 ve 1,5\'e getirdiği varsayıldı; FiO₂ 0,4\'te PAO₂ 31,4 kPa (alveoler gaz denklemi). Kapiller sonu PO₂, 0,75 s\'lik geçiş için O₂ modelinden hesaplanır ("Kapiller sonu PO₂" bileşeniyle aynı). Şant hesaba katılmaz (Atlas notu). [[K1 s. 43]]')}</p>`;
    const $ = (q) => el.querySelector(q), o = (k) => el.querySelector(`[data-o="${k}"]`), bar = (k) => el.querySelector(`[data-i="${k}"]`), cap = $('.viz-cap');
    const alvG = [...el.querySelectorAll('.f10-od-alv > g')];
    alvG.forEach((g) => { const x = +g.dataset.ax; g.querySelector('.o2').innerHTML = Array.from({ length: 8 }, (_, i) => `<circle cx="${(x + Math.cos(i * 0.785 + 0.3) * 16).toFixed(1)}" cy="${(66 + Math.sin(i * 0.785 + 0.3) * 16).toFixed(1)}" r="3"/>`).join(''); });
    const durum = () => {
      const A = odem ? (peep ? 0.85 : 0.5) : 1, T = odem ? (peep ? 1.5 : 2.5) : 1, PA = PAO2(fiyuk ? 0.4 : 0.21, 101.3);
      return { A, T, PA, G: PA - 5.3, R: (A * (PA - 5.3)) / (T * 8) };
    };
    const yaz = () => {
      const D = durum(), P = o2Egri(D.PA, 5.3, D.A / D.T), pe = degerAt(P, 0.75), te = dengeZ(P, D.PA);
      o('A').textContent = fmt(D.A, 2); o('T').textContent = '×' + fmt(D.T, 1); o('G').textContent = `${fmt(D.G)} kPa`; o('R').textContent = '×' + fmt(D.R, 2);
      bar('A').style.width = D.A * 100 + '%'; bar('T').style.width = (D.T / 3) * 100 + '%'; bar('G').style.width = clamp(D.G / 30, 0, 1) * 100 + '%'; bar('R').style.width = clamp(D.R / 3.5, 0, 1) * 100 + '%';
      o('P').textContent = `${fmt(pe)} kPa (alveoler ${fmt(D.PA)})`;
      const tg = o('tag'), ok = te !== null && te <= 0.75; tg.className = 'tag ' + (ok ? 'ok' : 'crit'); tg.textContent = ok ? 'denge var' : 'difüzyonla sınırlı';
      // çizim
      const ic = $('.f10-od-int'), kal = 5 + (D.T - 1) * 14;
      ic.setAttribute('height', kal); ic.classList.toggle('odem', odem);
      $('.f10-od-kap').setAttribute('y', 102 + kal);
      el.querySelectorAll('.f10-od-rbc').forEach((r) => r.setAttribute('cy', 113 + kal));
      $('.f10-od-intl').textContent = odem ? (peep ? 'bariyer: ödem azaldı' : 'bariyer: ödemle kalın') : 'bariyer: ince';
      alvG.forEach((g, i) => {
        const kollabe = odem && (i === 1 || i === 3) && !peep, dolu = odem && (i === 1 || i === 3);
        const r = kollabe ? 16 : 30;
        const a = g.querySelector('.a'); a.setAttribute('r', r); a.setAttribute('cy', 66 + (30 - r));
        const sv = g.querySelector('.s'); const sr = dolu ? (peep ? 11 : 15) : 0; sv.setAttribute('r', sr); sv.setAttribute('cy', 66 + (30 - r) + (r - sr) * 0.7);
        g.querySelector('.o2').setAttribute('opacity', kollabe ? 0 : fiyuk ? 1 : 0.45);
        g.classList.toggle('fio', fiyuk);
      });
      $('.f10-od-peep').setAttribute('opacity', peep ? 1 : 0); $('.f10-od-pl').setAttribute('opacity', peep ? 1 : 0);
      el.querySelectorAll('[data-x]').forEach((b) => { if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', String(b.dataset.x === 'odem' ? odem : b.dataset.x === 'fio' ? fiyuk : peep)); });
      const parts = [];
      parts.push(odem ? '<b>Akut pulmoner ödem.</b> Pulmoner venöz basınç yükselir, sıvı alveollere ve interstisyuma sızar: bariyer kalınlaşır, gaz değişimine açık alan küçülür; ikisi de difüzyonu yavaşlatır. [[K1 s. 43]]' : '<b>Normal akciğer.</b> İnce bariyer ve tam yüzey: difüzyon hızı ×1. [[K1 s. 40]]');
      if (fiyuk) parts.push('<b>FiO₂ artışı</b> O₂ basınç gradyanını büyütür. [[K1 s. 43]]');
      if (peep) parts.push(odem ? '<b>PEEP</b> kollabe alveolleri açar (alan artar) ve alveoler basıncı yükselterek ödemi yeniden dağıtır (bariyer incelir). [[K1 s. 43]]' : 'Ödem yokken modelde PEEP difüzyon terimlerini değiştirmez.');
      parts.push(`Modelde difüzyon hızı normale göre ×${fmt(D.R, 2)}, kapiller sonu PO₂ ${fmt(pe)} kPa.`);
      const c = parts.join(' ');
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-x]'); if (!b) return;
      if (b.dataset.x === 'odem') odem = !odem; else if (b.dataset.x === 'fio') fiyuk = !fiyuk; else peep = !peep;
      yaz();
    });
    yaz();
    return ticker(el, (dt) => {
      if (RM) return;
      t += dt;
      el.querySelectorAll('.f10-od-rbc').forEach((r, i) => { const x = 26 + ((i * 50 + t * 26) % 310); r.setAttribute('cx', x.toFixed(1)); });
    });
  };
})();
