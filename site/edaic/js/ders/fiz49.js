/* Bölüm 49 · İntrakraniyal basınç ve kafa travması · bileşenler (tarif: docs/tasarim/fiz49.md; K1 s. 206–210).
   Kitaptan: ICP 5–15 mmHg, öksürmede ≤ 50 mmHg, bölme oranları %80/%10/%10, CPP 50 mmHg eşiği, CBF 50 mL/100 g/dk,
   GCS sınırları ve mortalite, AAGBI hedefleri (PaO₂ > 10 kPa yükselmiş ICP'de, PaCO₂ 4,5–5,0 kPa, MAP > 80 mmHg, CPP > 60 mmHg,
   insülin 11 mmol/L, ateş > 37,6 °C). Temsilî: eğri biçimleri, Cushing adım değerleri, ICP düşüşleri, nöron sayıları (viz-foot'larda). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const sm = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  /* dar yerleşim: kapsayıcı 720 px'ten darsa paneller alt alta (560–720 arasında yan yana paneller yazıyı 11 px altına küçültürdü) */
  const darIzle = (el, cb, esik = 720) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < esik; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tween = (ms, cb) => {
    if (RM || !ms) { cb(1); return () => {}; }
    let raf = 0, t0 = 0;
    const f = (t) => { if (!t0) t0 = t; const k = clamp((t - t0) / ms, 0, 1); cb(ease(k)); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  };
  const tx = (x, y, s, cls, anc) => `<text class="${cls}" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}>${s}</text>`;
  /* ok: çizgi + üçgen uç; renk CSS 'color' ile (currentColor) */
  const ucu = (x2, y2, a, s) => `M${x2.toFixed(1)} ${y2.toFixed(1)} L${(x2 - s * Math.cos(a) + 0.55 * s * Math.sin(a)).toFixed(1)} ${(y2 - s * Math.sin(a) - 0.55 * s * Math.cos(a)).toFixed(1)} L${(x2 - s * Math.cos(a) - 0.55 * s * Math.sin(a)).toFixed(1)} ${(y2 - s * Math.sin(a) + 0.55 * s * Math.cos(a)).toFixed(1)} Z`;
  const ok = (x1, y1, x2, y2, cls, s = 8, ek = '') => {
    const a = Math.atan2(y2 - y1, x2 - x1), xe = x2 - Math.cos(a) * s * 0.7, ye = y2 - Math.sin(a) * s * 0.7;
    return `<g class="f49-ok ${cls || ''}"${ek}><path class="f49-ok-c" d="M${x1} ${y1} L${xe.toFixed(1)} ${ye.toFixed(1)}"/><path class="f49-ok-u" d="${ucu(x2, y2, a, s)}"/></g>`;
  };
  const okYol = (d, x2, y2, ax, ay, cls, s = 8, ek = '') => `<g class="f49-ok ${cls || ''}"${ek}><path class="f49-ok-c" d="${d}"/><path class="f49-ok-u" d="${ucu(x2, y2, Math.atan2(y2 - ay, x2 - ax), s)}"/></g>`;

  /* ---------- Ortak kafa çizimi (ölçüm, Monro, bulgu, azalt) ----------
     kemik --ink 3 px, beyin --chip, ventriküller ve subaraknoid aralık --c-basic-soft */
  const KK = { cx: 150, cy: 132, rx: 118, ry: 100 }; // koronal
  const KS = { cx: 185, cy: 118, rx: 140, ry: 96 }; // sagittal, yüz solda
  const altY = (k, x, d = 0) => k.cy + (k.ry - d) * Math.sqrt(Math.max(0, 1 - ((x - k.cx) / (k.rx - d)) ** 2));
  const ustY = (k, x, d = 0) => k.cy - (k.ry - d) * Math.sqrt(Math.max(0, 1 - ((x - k.cx) / (k.rx - d)) ** 2));
  const ustYay = (k, x1, x2, d, n = 28) => Array.from({ length: n + 1 }, (_, i) => { const x = lerp(x1, x2, i / n); return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + ustY(k, x, d).toFixed(1); }).join(' ');
  const FM1 = 200, FM2 = 232; // foramen magnum kenarları (sagittal)
  const VENT_S = 'M-44 4 C-42 -18 18 -26 42 -6 C50 2 42 12 32 8 C14 -4 -20 -4 -32 12 C-38 18 -46 14 -44 4 Z';
  function kafa(tur, o = {}) {
    if (tur === 'koronal') {
      const { cx, cy, rx, ry } = KK;
      const v = (s) => `M${cx + s * 3} ${cy - 26} C${cx + s * 28} ${cy - 34} ${cx + s * 36} ${cy - 8} ${cx + s * 24} ${cy - 2} C${cx + s * 16} ${cy + 2} ${cx + s * 8} ${cy - 8} ${cx + s * 3} ${cy - 10} Z`;
      return `<g class="f49-kafa">
        <ellipse class="f49-csf" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
        <ellipse class="f49-beyin" cx="${cx}" cy="${cy + 2}" rx="${rx - 9}" ry="${ry - 9}"/>
        <path class="f49-yarik" d="M${cx} ${cy - ry + 9} L${cx} ${cy - 30} M${cx - 70} ${cy + 40} Q${cx - 40} ${cy + 30} ${cx - 22} ${cy + 46} M${cx + 70} ${cy + 40} Q${cx + 40} ${cy + 30} ${cx + 22} ${cy + 46}"/>
        <path class="f49-vent" d="${v(-1)}"/><path class="f49-vent" d="${v(1)}"/>
        <path class="f49-vent" d="M${cx - 2} ${cy - 4} L${cx + 2} ${cy - 4} L${cx + 2} ${cy + 18} L${cx - 2} ${cy + 18} Z"/>
        ${o.ic || ''}
        <ellipse class="f49-kemik" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
      </g>`;
    }
    const { cx, cy, rx, ry } = KS;
    const y1 = altY(KS, FM1), y2 = altY(KS, FM2);
    return `<g class="f49-kafa">
      <ellipse class="f49-csf" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
      <path class="f49-csf" d="M${FM1} ${y1 - 4} L${FM2} ${y2 - 4} L${FM2 - 2} 268 L${FM1 + 2} 268 Z"/>
      ${o.alt || ''}
      <ellipse class="f49-beyin" data-p="beyin" cx="178" cy="106" rx="128" ry="80"/>
      ${o.beyinUst || ''}
      <path class="f49-vent" data-p="vent" transform="translate(172 98)" d="${VENT_S}"/>
      <g data-p="bcik"><ellipse class="f49-beyin" cx="262" cy="174" rx="40" ry="20"/><path class="f49-yarik" d="M232 172 Q262 162 296 174 M236 182 Q262 174 292 184"/>
        <ellipse class="f49-beyin f49-tonsil" data-p="tonsil" cx="222" cy="192" rx="9" ry="7"/></g>
      <path class="f49-beyin" data-p="sap" d="M188 134 Q204 126 216 136 L222 200 L221 268 L209 268 L205 200 Z"/>
      ${o.ic || ''}
      <path class="f49-kemik" d="M${FM1} ${y1.toFixed(1)} A${rx} ${ry} 0 1 1 ${FM2} ${y2.toFixed(1)} M${FM1} ${y1.toFixed(1)} L${FM1 + 2} 268 M${FM2} ${y2.toFixed(1)} L${FM2 - 2} 268"/>
    </g>`;
  }
  /* sagittal kafada damarlar: dural venöz sinüs (üst), internal juguler ven ve karotis + dallar */
  const SINUS_D = ustYay(KS, 130, 318, 6, 30);
  const damarHtml = () => `<path class="f49-sin-d" data-p="sin-d" d="${SINUS_D}"/><path class="f49-sin-i" data-p="sin-i" d="${SINUS_D}"/>
    <path class="f49-art" data-p="art" d="M180 268 L180 214 Q182 180 176 160 M176 160 Q140 140 98 104 M176 160 Q176 100 170 52 M176 160 Q220 128 252 98 M140 136 Q118 150 92 150 M172 96 Q140 80 120 60 M210 132 Q240 120 280 130"/>`;
  const ijvHtml = () => `<path class="f49-ijv-d" d="M160 213 L160 268"/><path class="f49-ijv-i" d="M160 213 L160 268"/>`;

  /* =====================================================================
     1 · f49_olcum — üç ölçüm yolu ve ICP eğrisi (K1 s. 206)
     ===================================================================== */
  VIZ.f49_olcum = (el) => {
    const BILGI = {
      evd: { ust: ['Altın standart', 'CSF boşaltır: tanı ve tedavi (ICP düşer)', 'İntratekal ilaç'], sak: ['Ölçmek için klemplenmeli', 'Ventrikül küçük/yer değiştirmişse takması zor', 'Sık tıkanır', 'Enfeksiyon %5\'e dek'] },
      par: { ust: ['Burr deliğinden, takması çok daha kolay', 'Ventrikül basılıysa da olur', 'Doğruluğu EVD\'ye yakın', 'Enfeksiyon çok daha az'], sak: ['Takılırken sıfırlanır, yerinde kalibre edilmez (5 günde kayma ≈ 1 mmHg)', 'Yalnız yerel parankim basıncı'] },
      sub: { ust: ['Enfeksiyon düşük'], sak: ['Artık terk edildi', 'Daha az doğru', 'Tıkanır, düzenli yıkama ister'] },
    };
    const CAP = {
      evd: '<b>Eksternal ventriküler dren (EVD).</b> Lateral ventriküle giren kateter; altın standarttır. Ölçmek için klemplenir, o sırada CSF drene edilemez. Bir yöntem seçin ya da "Öksür"e basın. [[K1 s. 206]]',
      acik: '<b>EVD açık: drenaj.</b> CSF boşaltılırken ICP ölçülemez; ölçüm için dren klemplenir. Drenaj tanı ve tedavi amaçlıdır, intratekal ilaç da verilebilir. [[K1 s. 206]]',
      par: '<b>İntraparankimal prob.</b> Küçük burr deliğinden yerleştirilen fiberoptik uçlu kateter; takması kolay, doğruluğu EVD\'ye yakın, enfeksiyon çok daha az. Ama yerinde yeniden kalibre edilemez ve yalnız bulunduğu dokunun basıncını ölçer. [[K1 s. 206]]',
      sub: '<b>Subaraknoid ve subdural problar.</b> Enfeksiyon oranı düşüktür ama daha az doğrudur, tıkanır ve düzenli yıkama ister; artık büyük ölçüde terk edilmiştir. [[K1 s. 206]]',
      oks: '<b>Öksürme.</b> Normal beyinde bile öksürme, ıkınma ve hapşırma ICP\'yi geçici olarak 50 mmHg\'ya dek çıkarır. Dinlenen sırtüstü erişkinde normal 5–15 mmHg\'dır. [[K1 s. 206]]',
    };
    let yon = 'evd', dren = 'klemp', t = RM ? 6 : 0, tc = -99, rmTepe = false, capZ = 0, dt0 = 0;
    const my = (v) => 160 - v * 2.25;
    el.innerHTML = `<div class="f49-kont">
        <div><span class="f49-lbl">Yöntem</span>${segHtml('Yöntem', 'yon', [['evd', 'EVD'], ['par', 'İntraparankimal'], ['sub', 'Subaraknoid/subdural']], yon)}</div>
        <div class="f49-dren"><span class="f49-lbl">Dren</span>${segHtml('Dren', 'dren', [['klemp', 'Klemplenmiş (ölçüm)'], ['acik', 'Açık (drenaj)']], dren)}</div>
        <button type="button" class="btn ghost" data-a="oks">Öksür</button></div>
      <div class="f49-g2">
        <svg class="f49-svg" viewBox="0 0 360 245" role="img" aria-label="Koronal kafa kesiti: kafatası, iki yarımküre, lateral ventriküller ve seçilen ICP kateterinin yeri">
          ${kafa('koronal')}<g class="f49-kat"></g></svg>
        <svg class="f49-svg" viewBox="0 0 360 180" role="img" aria-label="ICP–zaman monitörü: kalp ve solunumla dalgalanan iz, normal 5–15 mmHg bandı">
          <defs><pattern id="f49-tar-ok" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="f49-tar-ok-z"/><path d="M0 0V6" class="f49-tar-ok-c"/></pattern></defs>
          <rect class="f49-mon" x="1" y="1" width="358" height="178" rx="10"/>
          ${[0, 15, 30, 50].map((v) => `<line class="f49-izgara" x1="44" x2="344" y1="${my(v)}" y2="${my(v)}"/>${tx(38, my(v) + 4, v, 'f49-ts', 'end')}`).join('')}
          <rect class="f49-band f49-band-t" x="44" y="${my(15)}" width="300" height="${my(5) - my(15)}"/>
          ${tx(342, my(15) - 4, 'normal 5–15', 'f49-ts f49-c-ok', 'end')}
          <line class="f49-eks" x1="44" x2="44" y1="${my(60)}" y2="${my(0)}"/><line class="f49-eks" x1="44" x2="344" y1="${my(0)}" y2="${my(0)}"/>
          ${tx(44, 18, 'ICP (mmHg)', 'f49-t')}${tx(344, 175, 'zaman →', 'f49-ts', 'end')}
          <text class="f49-mon-v" x="344" y="26" text-anchor="end">10</text>
          <path class="f49-iz"/>
          <text class="f49-oks-t" x="52" y="${my(50) - 6}">öksürme/ıkınma/hapşırma: geçici ≤ 50 mmHg</text>
          <text class="f49-dren-t" x="194" y="${my(32)}" text-anchor="middle">drenaj sırasında ICP okunamaz</text>
        </svg>
      </div>
      <div class="f49-kart"></div>`;
    const kat = el.querySelector('.f49-kat'), iz = el.querySelector('.f49-iz'), deger = el.querySelector('.f49-mon-v');
    const oksT = el.querySelector('.f49-oks-t'), drenT = el.querySelector('.f49-dren-t'), kart = el.querySelector('.f49-kart');
    const drenKutu = el.querySelector('.f49-dren');
    const taban = (s) => 10 + 1.5 * Math.sin(2 * Math.PI * 1.2 * s) + 2 * Math.sin(2 * Math.PI * 0.25 * s);
    const oks = (d) => (d < 0 ? 0 : d < 0.4 ? 40 * ease(d / 0.4) : d < 1.9 ? 40 * (1 - ease((d - 0.4) / 1.5)) : 0);
    const icp = (s) => taban(s) + oks(s - tc);
    const acik = () => yon === 'evd' && dren === 'acik';
    const katCiz = () => {
      const { cx, cy } = KK;
      let h = '';
      if (yon === 'evd') {
        const kl = dren === 'klemp';
        h = `<path class="f49-kat-c" d="M131 117 L128 36 L128 20 Q128 8 140 8 L238 8"/><circle class="f49-kat-uc" cx="131" cy="117" r="3.5"/>
          <path class="f49-hort" d="M252 8 L304 8 Q314 8 314 18 L314 56"/>
          <rect class="f49-musluk" x="238" y="2" width="14" height="12" rx="3"/>
          <path class="f49-musluk-k" d="${kl ? 'M245 -1 L245 17' : 'M234 8 L256 8'}"/>
          ${tx(245, 30, kl ? 'musluk: kapalı' : 'musluk: açık', 'f49-ts', 'middle')}
          <rect class="f49-torba" x="290" y="56" width="48" height="70" rx="7"/><rect class="f49-torba-s" x="293" y="${acik() ? 96 : 104}" width="42" height="${acik() ? 27 : 19}" rx="4"/>
          <g class="f49-damla">${acik() ? '<circle cx="314" cy="66" r="3"/><circle cx="314" cy="80" r="3"/>' : ''}</g>
          ${tx(314, 142, 'dren', 'f49-ts', 'middle')}${tx(314, 156, 'torbası', 'f49-ts', 'middle')}
          ${tx(cx, cy + 54, 'lateral ventrikül', 'f49-t f49-halo', 'middle')}`;
      } else if (yon === 'par') {
        h = `<path class="f49-kat-c" d="M212 74 L205 40 L205 24 Q205 12 218 12 L300 12"/>
          <circle class="f49-par-h" cx="212" cy="74" r="15"/><circle class="f49-kat-uc f49-parla" cx="212" cy="74" r="4.5"/>
          ${tx(194, 70, 'fiberoptik uç', 'f49-t f49-halo', 'end')}
          ${tx(cx, cy + 74, 'kesik halka: yalnız bu bölgenin basıncı', 'f49-ts f49-halo', 'middle')}
          ${tx(205, 34, 'burr deliği', 'f49-ts', 'start')}`;
      } else {
        h = `<path class="f49-kat-c" d="M74 58 L70 40 L70 22 Q70 10 84 10 L300 10"/><path class="f49-prob" d="M58 76 Q66 64 86 54"/>
          ${tx(98, 92, 'subdural/', 'f49-t f49-halo', 'start')}${tx(98, 108, 'subaraknoid aralık', 'f49-t f49-halo', 'start')}`;
      }
      kat.innerHTML = h;
      drenKutu.style.display = yon === 'evd' ? '' : 'none';
      const B = BILGI[yon];
      kart.innerHTML = `<div><h4>Üstünlük</h4><ul>${B.ust.map((s) => `<li class="ok">${s}</li>`).join('')}</ul></div><div><h4>Sakınca</h4><ul>${B.sak.map((s) => `<li class="warn">${s}</li>`).join('')}</ul></div>`;
    };
    const izCiz = () => {
      if (acik()) {
        iz.setAttribute('d', `M44 ${my(10)} L344 ${my(10)}`); iz.classList.add('f49-iz-yok');
        deger.textContent = '—'; drenT.style.display = ''; oksT.style.display = 'none'; return;
      }
      iz.classList.remove('f49-iz-yok'); drenT.style.display = 'none';
      const n = 150; let d = '';
      for (let i = 0; i <= n; i++) { const s = t - 6 + (6 * i) / n; d += (i ? 'L' : 'M') + (44 + (300 * i) / n).toFixed(1) + ' ' + my(clamp(icp(s), 0, 60)).toFixed(1); }
      iz.setAttribute('d', d);
      deger.textContent = Math.round(icp(t));
      oksT.style.display = (RM ? rmTepe : t - tc < 2.6) ? '' : 'none';
    };
    const capNormal = () => (yon === 'evd' ? (dren === 'acik' ? CAP.acik : CAP.evd) : CAP[yon]);
    let damlaT = 0;
    const damla = (dt) => {
      if (!acik() || RM) return;
      damlaT = (damlaT + dt) % 1;
      const cs = kat.querySelectorAll('.f49-damla circle');
      cs.forEach((c, i) => { const f = (damlaT + i * 0.5) % 1; c.setAttribute('cy', (64 + f * 32).toFixed(1)); c.setAttribute('opacity', (1 - f * 0.6).toFixed(2)); });
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-yon],[data-dren],[data-a]'); if (!b) return;
      if (b.dataset.yon) { yon = b.dataset.yon; basSec(el, 'yon', yon); }
      else if (b.dataset.dren) { dren = b.dataset.dren; basSec(el, 'dren', dren); }
      else {
        if (RM) { rmTepe = true; tc = 3; } else tc = t;
        capYaz(el, CAP.oks); clearTimeout(capZ); capZ = setTimeout(() => capYaz(el, capNormal()), 2000);
        izCiz(); return;
      }
      clearTimeout(capZ); katCiz(); izCiz(); capYaz(el, capNormal());
    });
    const dar = darIzle(el, (d) => el.classList.toggle('f49-dar', d));
    katCiz(); izCiz();
    const stop = RM ? () => {} : ticker(el, (dt) => { t += dt; dt0 += dt; damla(dt); izCiz(); });
    return () => { stop(); dar(); clearTimeout(capZ); };
  };

  /* =====================================================================
     2 · f49_monro — büyüyen kitle (K1 s. 206–207)
     ===================================================================== */
  VIZ.f49_monro = (el) => {
    const TUR = {
      tum: { ad: 'Tümör/apse', et: 'beyin dokusu ↑ (yerel)', cap: 'Burada artan bölme beyin dokusudur (yerel: tümör, apse). [[K1 s. 206]]' },
      hem: { ad: 'Hematom', et: 'kan ↑ (ekstradural, subdural, intraparankimal kanama; venöz sinüs trombozu)', cap: 'Burada artan bölme kandır (kanama ya da venöz sinüs trombozu). [[K1 s. 206]]' },
      od: { ad: 'Ödem', et: 'beyin dokusu ↑ (yaygın: serebral ödem)', cap: 'Burada artan bölme beyin dokusudur (yaygın: serebral ödem). [[K1 s. 206]]' },
      hid: { ad: 'Hidrosefali', et: 'CSF ↑ (hidrosefali, Bölüm 46)', cap: 'Burada artan bölme CSF\'dir (hidrosefali). [[K1 s. 206]]' },
    };
    const EVRE = [
      ['Normal', '<b>Normal.</b> Beyin ≈ 1400 g (%80), CSF ≈ 150 mL (%10), arteriyel ve venöz kan ≈ 150 mL (%10). Kitleyi büyütün. [[K1 s. 206]]'],
      ['Kompansasyon', '<b>Kompansasyon.</b> Bir miktar CSF spinal subaraknoid aralığa itilir; üretim yaklaşık aynı kalırken araknoid villuslardan emilim artar. Sıkışan dural venöz sinüsler kanı internal juguler vene gönderir. ICP az değişir. [[K1 s. 207]]'],
      ['Dekompansasyon', '<b>Dekompansasyon noktası.</b> Küçük kompansasyonlar tükendi; artık her küçük hacim artışı ICP\'yi hızla yükseltir. Geriye yıkıcı iki seçenek kalır: arteriyel kan hacminin azalması ya da parankimin itilmesi. [[K1 s. 207]]'],
      ['Herniasyon', '<b>Herniasyon.</b> Beyin parankimi foramen magnumdan aşağı itilir; ICP hızla yerel ve global iskemi düzeylerine doğru çıkar. [[K1 s. 207]]'],
    ];
    const ROZ = [[], [['basic', 'CSF → spinal aralık'], ['basic', 'CSF üretimi ≈ aynı, emilim ↑'], ['crit', 'venöz kan → internal juguler ven']],
      [['warn', 'kompansasyon tükendi'], ['crit', 'arteriyel kan hacmi ↓ → iskemi']], [['crit', 'parankim foramen magnumdan itilir']]];
    let V = 0, tur = 'hem', oyn = false, sonKey = '', faz = 0, ilk = true;
    const icpV = (v) => 7 + 3 * Math.exp(v / 25);
    const evre = (v) => (v < 5 ? 0 : v < 35 ? 1 : v < 55 ? 2 : 3);
    // eğri
    const GX = (v) => 52 + v * 2.92, GY = (p) => 192 - p * (172 / 60);
    const VMAX = 25 * Math.log(53 / 3);
    const egri = (a, b) => { let d = ''; const n = 30; for (let i = 0; i <= n; i++) { const v = lerp(a, b, i / n); d += (i ? 'L' : 'M') + GX(v).toFixed(1) + ' ' + GY(icpV(v)).toFixed(1); } return d; };
    el.innerHTML = `<div class="f49-kont">
        <label class="f49-rng"><span>Kitle hacmi <em>küçük … büyük</em></span><input type="range" min="0" max="100" step="1" value="0" aria-label="Kitle hacmi"></label>
        <div><span class="f49-lbl">Kitle türü</span>${segHtml('Kitle türü', 'tur', Object.entries(TUR).map(([k, o]) => [k, o.ad]), tur)}</div>
        <div class="btn-row"><button type="button" class="btn" data-a="oyn" aria-pressed="false">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div></div>
      <ol class="f49-evre">${EVRE.map((e, i) => `<li data-e="${i}">${e[0]}</li>`).join('')}</ol>
      <div class="f49-g2">
        <div>
          <svg class="f49-svg" viewBox="0 0 360 270" role="img" aria-label="Sagittal kafa kutusu: beyin, CSF ve kan bölmeleri; kitle büyüdükçe kompansasyon ve herniasyon">
            <defs><pattern id="f49-od" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V7" class="f49-od-c"/></pattern></defs>
            ${kafa('sagittal', { alt: ijvHtml(), beyinUst: '<ellipse class="f49-od-u" data-p="od" cx="178" cy="106" rx="128" ry="80" opacity="0"/>', ic: `${damarHtml()}<g data-p="kitle"></g>
              <g data-p="komp">${ok(226, 228, 226, 262, 'f49-c-basic', 8)}${ok(160, 222, 160, 262, 'f49-c-crit', 9)}${ok(160, 46, 160, 28, 'f49-c-basic', 7)}${tx(154, 16, 'emilim ↑', 'f49-ts f49-c-basic', 'end')}</g>
              <g data-p="hern">${ok(244, 184, 244, 226, 'f49-c-crit', 9)}</g>
              <g data-p="nokta"></g>` })}
            ${tx(152, 250, 'internal', 'f49-ts', 'end')}${tx(152, 264, 'juguler ven', 'f49-ts', 'end')}
            ${tx(256, 236, 'foramen', 'f49-ts', 'start')}${tx(256, 250, 'magnum', 'f49-ts', 'start')}
            ${tx(250, 14, 'dural venöz sinüs', 'f49-ts f49-c-crit', 'middle')}
          </svg>
          <div class="f49-bar-bas">Kafa içi hacim = sabit</div>
          <div class="f49-bar" aria-hidden="true"><i data-b="kitle"></i><i data-b="beyin"></i><i data-b="csf"></i><i data-b="ven"></i><i data-b="art"></i></div>
          <div class="legend f49-bar-leg"><span><i class="f49-sw-beyin"></i>beyin ≈ 1400 g (%80)</span><span><i class="f49-sw-csf"></i>CSF ≈ 150 mL (%10)</span><span><i class="f49-sw-kan"></i>kan ≈ 150 mL (%10; arteriyel + venöz)</span><span><i class="f49-sw-kitle"></i><b data-o="et"></b></span></div>
          <div class="f49-rozetler" aria-live="polite"></div>
        </div>
        <svg class="f49-svg" viewBox="0 0 360 232" role="img" aria-label="Basınç–hacim eğrisi: ICP önce az, dekompansasyon noktasından sonra hızla yükselir">
          ${[0, 10, 20, 30, 40, 50, 60].map((p) => `<line class="f49-izgara" x1="52" x2="344" y1="${GY(p)}" y2="${GY(p)}"/>${tx(46, GY(p) + 4, p, 'f49-ts', 'end')}`).join('')}
          <line class="f49-eks" x1="52" x2="52" y1="${GY(60)}" y2="${GY(0)}"/><line class="f49-eks" x1="52" x2="344" y1="${GY(0)}" y2="${GY(0)}"/>
          ${tx(56, 12, 'ICP (mmHg)', 'f49-t')}${tx(344, 222, 'Genişleyen kitlenin hacmi →', 'f49-ts', 'end')}
          <line class="f49-esik f49-esik-w" data-l="yerel" x1="52" x2="344" y1="${GY(30)}" y2="${GY(30)}"/>${tx(58, GY(30) - 5, 'Yerel iskemi', 'f49-ts f49-c-warn f49-esik-t', 'start')}
          <line class="f49-esik f49-esik-c" data-l="global" x1="52" x2="344" y1="${GY(50)}" y2="${GY(50)}"/>${tx(58, GY(50) - 5, 'Global iskemi', 'f49-ts f49-c-crit f49-esik-t', 'start')}
          <line class="f49-dek" x1="${GX(35)}" x2="${GX(35)}" y1="${GY(0)}" y2="${GY(24)}"/>${tx(GX(35) + 4, GY(3), 'Dekompansasyon noktası', 'f49-ts', 'start')}
          <path class="f49-egri f49-egri-ok" d="${egri(0, 35)}"/><path class="f49-egri f49-egri-w" d="${egri(35, 55)}"/><path class="f49-egri f49-egri-c" d="${egri(55, VMAX)}"/>
          <circle class="f49-imlec" r="6"/>
        </svg>
      </div>`;
    const svg = el.querySelector('svg');
    const P = (k) => svg.querySelector(`[data-p="${k}"]`);
    const rng = el.querySelector('input[type=range]'), oynB = el.querySelector('[data-a="oyn"]');
    const imlec = el.querySelector('.f49-imlec'), noktaG = P('nokta');
    const CSFY = [[220, 158], [224, 186], [226, 206], [226, 236], [226, 266]];
    const ALONG = (pts, f) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; } let s = f * tot; for (let i = 0; i < L.length; i++) { if (s <= L[i]) { const k = s / L[i]; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; } s -= L[i]; } return pts[pts.length - 1]; };
    noktaG.innerHTML = Array.from({ length: 5 }, () => '<circle class="f49-n-csf" r="3.2"/>').join('') + Array.from({ length: 4 }, () => '<circle class="f49-n-kan" r="3.2"/>').join('');
    const nCsf = noktaG.querySelectorAll('.f49-n-csf'), nKan = noktaG.querySelectorAll('.f49-n-kan');
    const noktalar = () => {
      const on = evre(V) === 1 && !RM;
      noktaG.style.display = on ? '' : 'none';
      if (!on) return;
      nCsf.forEach((c, i) => { const p = ALONG(CSFY, (faz * 0.5 + i / 5) % 1); c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1)); });
      nKan.forEach((c, i) => { const f = (faz * 0.6 + i / 4) % 1; c.setAttribute('cx', 160); c.setAttribute('cy', (216 + f * 50).toFixed(1)); });
    };
    const ciz = () => {
      const s1 = sm(V, 0, 35), s2 = sm(V, 35, 55), s3 = sm(V, 55, 100), e = evre(V);
      const b = P('beyin'), od = P('od');
      const bx = 5 * s1 + (tur === 'od' ? V * 0.03 : 0);
      b.setAttribute('rx', (128 + bx).toFixed(1)); b.setAttribute('ry', (80 + bx * 0.8).toFixed(1));
      od.setAttribute('rx', (128 + bx).toFixed(1)); od.setAttribute('ry', (80 + bx * 0.8).toFixed(1));
      od.setAttribute('opacity', tur === 'od' ? (0.15 + V / 120).toFixed(2) : 0);
      const vs = tur === 'hid' ? 1 + 0.009 * V : 1 - 0.18 * s1;
      P('vent').setAttribute('transform', `translate(172 98) scale(${vs.toFixed(3)})`);
      const w = 7 - 4.5 * s1;
      P('sin-d').style.strokeWidth = (w + 2.4).toFixed(2); P('sin-i').style.strokeWidth = w.toFixed(2);
      P('art').style.strokeWidth = (3 - 1.8 * s2).toFixed(2);
      P('bcik').setAttribute('transform', `translate(0 ${(16 * s3).toFixed(1)})`);
      P('tonsil').classList.toggle('f49-hern', s3 > 0);
      P('sap').classList.toggle('f49-hern', s3 > 0.3);
      P('komp').style.display = e === 1 ? '' : 'none';
      P('hern').style.display = e === 3 ? '' : 'none';
      // kitle
      let k = '';
      if (tur === 'tum') { const r = 3 + V * 0.26; k = `<circle class="f49-kitle" cx="118" cy="84" r="${r.toFixed(1)}"/>`; }
      else if (tur === 'hem') {
        const x = 90, y = ustY(KS, x, 0), y2 = ustY(KS, x + 1, 0), a = Math.atan2(y2 - y, 1);
        const rx = 6 + V * 0.38, ry = 2 + V * 0.12;
        const nx = -Math.sin(a), ny = Math.cos(a);
        k = `<ellipse class="f49-hem" cx="${(x + nx * (ry + 1.5)).toFixed(1)}" cy="${(y + ny * (ry + 1.5)).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" transform="rotate(${(a * 180 / Math.PI).toFixed(1)} ${(x + nx * (ry + 1.5)).toFixed(1)} ${(y + ny * (ry + 1.5)).toFixed(1)})"/>`;
      }
      P('kitle').innerHTML = k;
      // hacim çubuğu (toplam %100, sabit)
      const r1 = 5 * s1, r2 = 3 * s1, r3 = 3 * s2, r4 = 4 * s3;
      const pay = { kitle: r1 + r2 + r3 + r4, beyin: 80 - r4, csf: 10 - r1, ven: 5 - r2, art: 5 - r3 };
      el.querySelectorAll('.f49-bar i').forEach((i) => { i.style.width = pay[i.dataset.b].toFixed(2) + '%'; });
      el.querySelector('.f49-bar [data-b="kitle"]').className = 'f49-k-' + tur;
      el.querySelector('[data-o="et"]').textContent = 'kitle: ' + TUR[tur].et;
      // eğri
      const p = Math.min(60, icpV(V));
      imlec.setAttribute('cx', GX(Math.min(V, VMAX)).toFixed(1)); imlec.setAttribute('cy', GY(p).toFixed(1));
      el.querySelector('[data-l="yerel"]').classList.toggle('on', p >= 30);
      el.querySelector('[data-l="global"]').classList.toggle('on', p >= 50);
      el.querySelectorAll('.f49-evre li').forEach((li) => li.classList.toggle('on', +li.dataset.e === e));
      const key = e + tur;
      if (key !== sonKey) {
        sonKey = key;
        el.querySelector('.f49-rozetler').innerHTML = ROZ[e].map(([c, s]) => `<span class="tag ${c}">${s}</span>`).join('');
        if (!ilk) capYaz(el, EVRE[e][1] + ' ' + TUR[tur].cap);
      }
      noktalar(); ilk = false;
    };
    const RMH = [20, 45, 80, 100];
    const oynat = () => {
      if (RM) { const n = RMH.find((h) => h > V); V = n === undefined ? 0 : n; rng.value = V; ciz(); return; }
      if (oyn) { oyn = false; } else { if (V >= 100) V = 0; oyn = true; }
      oynB.setAttribute('aria-pressed', String(oyn)); oynB.textContent = oyn ? 'Duraklat' : 'Oynat';
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tur],[data-a]'); if (!b) return;
      if (b.dataset.tur) { tur = b.dataset.tur; basSec(el, 'tur', tur); ciz(); }
      else if (b.dataset.a === 'oyn') oynat();
      else { V = 0; rng.value = 0; oyn = false; oynB.setAttribute('aria-pressed', 'false'); oynB.textContent = 'Oynat'; ciz(); }
    });
    rng.addEventListener('input', () => { V = +rng.value; ciz(); });
    const dar = darIzle(el, (d) => el.classList.toggle('f49-dar', d));
    ciz();
    const stop = RM ? () => {} : ticker(el, (dt) => {
      faz += dt;
      if (oyn) { V = Math.min(100, V + dt * 10); rng.value = Math.round(V); if (V >= 100) { oyn = false; oynB.setAttribute('aria-pressed', 'false'); oynB.textContent = 'Oynat'; } ciz(); }
      else noktalar();
    });
    return () => { stop(); dar(); };
  };

  /* =====================================================================
     3 · f49_bulgu — hangi bulgu nereden? (K1 s. 207–208)
     ===================================================================== */
  VIZ.f49_bulgu = (el) => {
    const GR = [
      ['ok', 'Belirtiler (erken)', [['bas', 'Baş ağrısı'], ['kus', 'Bulantı, kusma']]],
      ['warn', 'Bulgular', [['fon', 'Fontanel'], ['pap', 'Papil ödemi'], ['bil', 'Bilinç değişikliği']]],
      ['crit', 'Beyin yer değiştirmesi (ağır)', [['vi', 'VI. sinir felci'], ['iii', 'Pupil dilatasyonu (III)'], ['cus', 'Cushing triadı']]],
    ];
    const CAP = {
      bas: '<b>Baş ağrısı.</b> Sabah kötüdür; ıkınma ve düz yatmayla artar. Bir bulguya dokunun. [[K1 s. 207]]',
      kus: '<b>Bulantı ve kusma.</b> Baş ağrısıyla birlikte yükselmiş ICP\'nin belirtisidir. [[K1 s. 207]]',
      fon: '<b>Gergin, kabarık fontanel.</b> Yenidoğan ve bebekte yükselmiş ICP\'nin bulgusudur. [[K1 s. 207]]',
      pap: '<b>Papil ödemi.</b> Optik disk şişer; yükselmiş ICP\'nin bulgusudur. [[K1 s. 207]]',
      bil: '<b>Bilinç değişikliği.</b> Yükselmiş ICP\'nin bulgusudur; konizasyonda GCS genellikle 3–5\'e iner. [[K1 s. 207–208]]',
      vi: '<b>Abdusens (VI) felci.</b> Ağır intrakraniyal hipertansiyonda en sık kraniyal sinir felcidir; nedeni sinirin kafa içindeki uzun seyridir. [[K1 s. 207]]',
      iii: '<b>Pupil dilatasyonu.</b> Beyin yer değiştirirken okülomotor sinire (III) bası olur. [[K1 s. 207]]',
      cus: '<b>Cushing triadı.</b> Sistemik hipertansiyon, bradikardi ve anormal solunum paterni; mekanizması bir sonraki bölümde. [[K1 s. 207]]',
    };
    let sec = 'bas';
    el.innerHTML = `<div class="f49-g2 f49-g2-bulgu">
      <div><svg class="f49-svg" viewBox="0 0 360 270" role="img" aria-label="Sagittal baş kesiti: göz ve optik disk, III. ve VI. sinir, beyin sapı, foramen magnum; bebek başı üstten">
        <g class="f49-bh" data-h="bas"><ellipse class="f49-glow" cx="${KS.cx}" cy="${KS.cy}" rx="${KS.rx + 3}" ry="${KS.ry + 3}"/>
          <g class="f49-ikon"><circle cx="22" cy="24" r="7"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4; return `<path d="M${(22 + 10 * Math.cos(a)).toFixed(1)} ${(24 + 10 * Math.sin(a)).toFixed(1)} L${(22 + 14 * Math.cos(a)).toFixed(1)} ${(24 + 14 * Math.sin(a)).toFixed(1)}"/>`; }).join('')}
            <circle cx="46" cy="52" r="4.5"/><path d="M51 53 L80 53 M60 53 L66 46 M80 53 L84 49"/><path class="f49-yatak" d="M40 58 L88 58"/></g></g>
        ${kafa('sagittal', { ic: `
          <g class="f49-bh" data-h="bil"><ellipse class="f49-korteks" cx="178" cy="106" rx="128" ry="80"/></g>
          <g class="f49-bh" data-h="kus"><ellipse class="f49-vurgu-a" cx="214" cy="190" rx="14" ry="20"/></g>
          <g class="f49-bh" data-h="cus"><path class="f49-vurgu-a" d="M188 134 Q204 126 216 136 L222 200 L221 230 L209 230 L205 200 Z"/></g>
          <path class="f49-sinir" data-s="iii" d="M188 138 Q120 116 48 118"/>
          <path class="f49-sinir" data-s="vi" d="M204 164 Q192 206 130 200 Q74 194 47 128"/>
          <path class="f49-sinir f49-optik" d="M47 123 L104 130"/>
          <g class="f49-bh" data-h="iii">${ok(126, 86, 126, 116, 'f49-c-acc', 9)}${tx(132, 96, 'bası', 'f49-t f49-c-acc f49-halo', 'start')}</g>` })}
        <circle class="f49-goz" cx="34" cy="122" r="13"/><circle class="f49-pupil" cx="22" cy="122" r="3"/>
        <circle class="f49-disk" cx="46" cy="122" r="2.6"/>
        ${tx(70, 148, 'optik disk', 'f49-ts f49-halo', 'start')}
        ${tx(96, 214, 'VI', 'f49-t f49-c-vi', 'middle')}${tx(92, 112, 'III', 'f49-t f49-c-iii f49-halo', 'middle')}
        ${tx(256, 236, 'foramen', 'f49-ts', 'start')}${tx(256, 250, 'magnum', 'f49-ts', 'start')}
        ${tx(228, 148, 'beyin sapı', 'f49-ts f49-halo', 'start')}
        <g class="f49-bh" data-h="vi"><g class="f49-gozler"><ellipse cx="22" cy="28" rx="13" ry="8"/><ellipse cx="58" cy="28" rx="13" ry="8"/><circle class="f49-iris" cx="22" cy="28" r="4.5"/><circle class="f49-iris" cx="66" cy="28" r="4.5"/></g>${tx(6, 52, 'içe kayma', 'f49-ts f49-c-acc', 'start')}</g>
        <g class="f49-bebek"><circle class="f49-bebek-k" cx="48" cy="238" r="24"/><path class="f49-fon" data-p="fon" d="M48 216 L54 224 L48 232 L42 224 Z"/>${tx(80, 236, 'bebek başı', 'f49-ts', 'start')}${tx(80, 250, '(üstten)', 'f49-ts', 'start')}</g>
      </svg>
      <div class="f49-rozetler" data-o="roz"></div></div>
      <div class="f49-merdiven" role="group" aria-label="Belirti ve bulgular, erkenden geçe">
        <p class="f49-merd-bas">şiddet ↓ (erken → geç)</p>
        ${GR.map(([c, ad, m]) => `<div class="f49-grup f49-grup-${c}"><span class="tag ${c}">${ad}</span><div class="f49-grup-b">${m.map(([k, l]) => `<button type="button" class="f49-bul" data-b="${k}" aria-pressed="${k === sec}">${l}</button>`).join('')}</div></div>`).join('')}
      </div></div>`;
    const svg = el.querySelector('svg');
    const goster = () => {
      svg.querySelectorAll('.f49-bh').forEach((g) => g.classList.toggle('on', g.dataset.h === sec));
      svg.querySelectorAll('.f49-sinir[data-s]').forEach((s) => s.classList.toggle('on', s.dataset.s === sec));
      svg.querySelector('.f49-disk').setAttribute('r', sec === 'pap' ? 6 : 2.6);
      svg.querySelector('.f49-disk').classList.toggle('on', sec === 'pap');
      svg.querySelector('.f49-pupil').setAttribute('r', sec === 'iii' ? 6.5 : 3);
      svg.querySelector('.f49-pupil').classList.toggle('on', sec === 'iii');
      const fon = svg.querySelector('[data-p="fon"]');
      fon.setAttribute('d', sec === 'fon' ? 'M48 212 Q60 218 56 224 Q60 232 48 236 Q36 232 40 224 Q36 218 48 212 Z' : 'M48 216 L54 224 L48 232 L42 224 Z');
      fon.classList.toggle('on', sec === 'fon');
      svg.querySelector('.f49-bebek').classList.toggle('on', sec === 'fon');
      el.querySelector('[data-o="roz"]').innerHTML = sec === 'cus' ? ['hipertansiyon', 'bradikardi', 'anormal solunum'].map((s) => `<span class="tag crit">${s}</span>`).join('') : '';
      basSec(el, 'b', sec);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-b]'); if (!b) return; sec = b.dataset.b; goster(); capYaz(el, CAP[sec]); });
    const dar = darIzle(el, (d) => el.classList.toggle('f49-dar', d));
    goster();
    return () => { dar(); };
  };

  /* =====================================================================
     4 · f49_cushing — ICP yükselirken MAP, CPP ve kalp hızı (K1 s. 207–208)
     ===================================================================== */
  VIZ.f49_cushing = (el) => {
    const AD = [
      { map: 90, icp: 10, kh: 80, sol: 'normal', gcs: '15', ad: 'Başlangıç' },
      { map: 90, icp: 30, kh: 80, sol: 'normal', gcs: '12', ad: 'ICP artıyor' },
      { map: 90, icp: 45, kh: 85, sol: 'normal', gcs: '9', ad: 'CPP < 50' },
      { map: 140, icp: 50, kh: 90, sol: 'normal', gcs: '8', ad: 'Sempatik yanıt' },
      { map: 140, icp: 50, kh: 45, sol: 'düzensiz', gcs: '7', ad: 'Baroreseptör refleksi' },
      { map: 60, icp: 80, kh: 45, sol: 'apne', gcs: '3–5', ad: 'Konizasyon' },
      { map: 50, icp: 80, kh: 0, sol: 'apne', gcs: '3', ad: 'Beyin sapı ölümü' },
    ];
    const CAP = [
      '<b>1 · Başlangıç.</b> ICP normal, CPP = MAP − ICP yeterli; otoregülasyon CBF\'yi sabit tutar. Adım adım ilerletin. [[K1 s. 207]]',
      '<b>2 · ICP artıyor.</b> MAP değişmezse her ICP artışı CPP\'yi aynı ölçüde düşürür. [[K1 s. 207]]',
      '<b>3 · CPP 50 mmHg\'nın altında.</b> Serebral arterioller en geniş hâlde; otoregülasyon çöker, CBF 50 mL/100 g/dk\'nın altına iner ve beyin sapı iskemiye girer. [[K1 s. 207]]',
      '<b>4 · Acil hipertansif mekanizma.</b> Vazomotor alan sempatik çıkışı çok artırır; yoğun sistemik arteriyol vazokonstriksiyonu MAP\'yi yükseltir ve beyin sapı perfüzyonunu geri getirir. [[K1 s. 207]]',
      '<b>5 · Refleks bradikardi.</b> Arteriyel baroreseptörler sistemik hipertansiyona bradikardiyle yanıt verir; solunum paterni bozulur. Bu, Cushing triadıdır ve geç bir yanıttır. [[K1 s. 207]]',
      '<b>6 · Konizasyon.</b> ICP artmaya devam edince serebellar tonsiller foramen magnumdan itilir ve beyin sapını ezer: solunum merkezi basısıyla düzensiz solunum ve apne, GCS genellikle 3–5, vazomotor merkez basısıyla hipotansiyon. [[K1 s. 208]]',
      '<b>7 · Beyin sapı ölümü.</b> Cushing refleksi CPP\'yi korumak için çaresiz bir girişimdir; hızlı müdahale edilmezse, çoğu kez edilse bile, beyin sapı ölümü kaçınılmazdır. [[K1 s. 208]]',
    ];
    let i = 0, cur = { map: 90, icp: 10, kh: 80 }, durT = () => {}, oyn = false, oynZ = 0, ekgT = 0, faz = 0;
    const Y = (v) => 200 - v * 1.1;
    el.innerHTML = `<div class="f49-kont"><div class="btn-row">
        <button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">‹ Geri</button>
        <span class="f49-adim" aria-live="polite">1/7</span>
        <button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">İleri ›</button>
        ${RM ? '' : '<button type="button" class="btn" data-a="oyn" aria-pressed="false">Oynat</button>'}
        <b class="f49-adim-ad"></b></div></div>
      <div class="f49-g2">
        <svg class="f49-svg" viewBox="0 0 360 230" role="img" aria-label="MAP, ICP ve CPP sütunları ve monitör: MAP, ICP, CPP, CBF, kalp hızı, solunum, GCS">
          ${tx(105, 14, 'CPP = MAP − ICP', 'f49-t', 'middle')}
          ${[0, 40, 80, 120, 160].map((v) => `<line class="f49-izgara" x1="36" x2="186" y1="${Y(v)}" y2="${Y(v)}"/>${tx(32, Y(v) + 4, v, 'f49-ts', 'end')}`).join('')}
          <rect class="f49-s-map" data-c="map" x="48" width="36" rx="3"/><rect class="f49-s-icp" data-c="icp" x="96" width="36" rx="3"/><rect class="f49-s-cpp" data-c="cpp" x="144" width="36" rx="3"/>
          <text class="f49-sv" data-v="map" x="66" text-anchor="middle"></text><text class="f49-sv" data-v="icp" x="114" text-anchor="middle"></text><text class="f49-sv" data-v="cpp" x="162" text-anchor="middle"></text>
          <line class="f49-esik f49-esik-c on" x1="138" x2="186" y1="${Y(50)}" y2="${Y(50)}"/>${tx(162, Y(50) + 15, 'CPP 50', 'f49-ts f49-c-crit f49-halo', 'middle')}
          <line class="f49-eks" x1="36" x2="186" y1="${Y(0)}" y2="${Y(0)}"/>
          ${tx(66, 218, 'MAP', 'f49-t f49-c-crit', 'middle')}${tx(114, 218, 'ICP', 'f49-t f49-c-basic', 'middle')}${tx(162, 218, 'CPP', 'f49-t f49-c-acc', 'middle')}
          <rect class="f49-mon" x="198" y="4" width="158" height="222" rx="9"/>
          ${['MAP', 'ICP', 'CPP', 'CBF', 'KH (/dk)', 'Solunum', 'GCS'].map((s, k) => tx(206, 26 + k * 19, s, 'f49-ts')).join('')}
          ${['map', 'icp', 'cpp', 'cbf', 'kh', 'sol', 'gcs'].map((s, k) => `<text class="f49-mv" data-m="${s}" x="348" y="${26 + k * 19}" text-anchor="end"></text>`).join('')}
          <line class="f49-izgara" x1="206" x2="348" y1="160" y2="160"/>${tx(206, 176, 'EKG', 'f49-ts')}
          <path class="f49-ekg" d=""/>
        </svg>
        <svg class="f49-svg" viewBox="0 0 360 170" role="img" aria-label="Refleks şeması: beyin sapı vazomotor alanı, sempatik çıkış, sistemik arteriyoller, baroreseptör, vagus ve kalp">
          <g class="f49-rf" data-r="sap"><rect class="f49-rf-k" x="14" y="12" width="122" height="52" rx="10"/>${tx(75, 34, 'beyin sapı', 'f49-t', 'middle')}${tx(75, 52, 'vazomotor alan', 'f49-ts', 'middle')}</g>
          <g class="f49-rf" data-r="isk">${tx(75, 80, 'iskemi', 'f49-t f49-c-crit', 'middle')}</g>
          <g class="f49-rf" data-r="kon">${ok(75, -2, 75, 14, 'f49-c-crit', 9)}${tx(142, 10, 'konizasyon: ezilme', 'f49-ts f49-c-crit', 'start')}</g>
          <g class="f49-rf" data-r="sem">${ok(138, 38, 232, 38, '', 9)}${tx(185, 30, 'sempatik ↑', 'f49-ts', 'middle')}</g>
          <g class="f49-rf f49-rf-dmr" data-r="dmr"><path class="f49-dmr" data-p="d1" d="M238 26 L348 26"/><path class="f49-dmr" data-p="d2" d="M238 50 L348 50"/>${tx(350, 68, 'sistemik arteriyoller', 'f49-ts', 'end')}</g>
          <g class="f49-rf" data-r="baro"><circle class="f49-baro" cx="40" cy="128" r="9"/>${ok(40, 117, 40, 68, '', 8)}${tx(20, 154, 'baroreseptör', 'f49-ts', 'start')}${tx(20, 167, '(karotis/aort)', 'f49-ts', 'start')}</g>
          <g class="f49-rf" data-r="vag">${okYol('M104 64 Q150 128 268 128', 274, 128, 262, 128, '', 9)}${tx(176, 112, 'vagus', 'f49-ts', 'middle')}</g>
          <g class="f49-rf" data-r="kalp"><path class="f49-kalp" data-p="kalp" d="M300 118 C300 106 316 104 316 116 C316 104 332 106 332 118 C332 132 316 140 316 146 C316 140 300 132 300 118 Z"/>${tx(316, 164, 'kalp', 'f49-ts', 'middle')}</g>
        </svg>
      </div>
      <div class="f49-rozetler" data-o="roz"></div>`;
    const svg = el.querySelector('svg'), svg2 = el.querySelectorAll('svg')[1];
    const m = (k) => svg.querySelector(`[data-m="${k}"]`);
    const sut = (k, v, vy) => { const r = svg.querySelector(`[data-c="${k}"]`); r.setAttribute('y', Y(Math.max(0, v)).toFixed(1)); r.setAttribute('height', (Math.max(0, v) * 1.1).toFixed(1)); const t = svg.querySelector(`[data-v="${k}"]`); t.setAttribute('y', (Y(Math.max(0, vy)) - 5).toFixed(1)); t.textContent = Math.round(Math.max(0, v)); };
    const yaz = () => {
      const a = AD[i], cpp = Math.max(0, cur.map - cur.icp);
      sut('map', cur.map, cur.map); sut('icp', cur.icp, cur.icp); sut('cpp', cpp, cpp);
      svg.querySelector('[data-c="cpp"]').classList.toggle('f49-dusuk', cpp < 50);
      m('map').textContent = Math.round(cur.map) + ' mmHg'; m('icp').textContent = Math.round(cur.icp) + ' mmHg';
      m('cpp').textContent = Math.round(cpp) + ' mmHg'; m('cpp').classList.toggle('f49-c-crit', cpp < 50);
      m('cbf').textContent = cpp < 50 ? '< 50' : 'normal ≥ 50'; m('cbf').classList.toggle('f49-c-crit', cpp < 50);
      m('kh').textContent = a.kh ? Math.round(cur.kh) : '—'; m('kh').classList.toggle('f49-c-crit', i >= 4);
      m('sol').textContent = a.sol; m('sol').classList.toggle('f49-c-crit', a.sol !== 'normal');
      m('gcs').textContent = a.gcs;
      if (RM) ekgCiz();
    };
    const ekgCiz = () => {
      const kh = AD[i].kh ? cur.kh : 0, W = 4; // 4 s pencere
      let d = 'M206 206';
      if (kh > 0) {
        const T = 60 / kh, b0 = Math.floor((ekgT - W) / T) + 1;
        for (let k = b0; k * T <= ekgT; k++) {
          const x = 206 + ((k * T - (ekgT - W)) / W) * 142;
          if (x < 210 || x > 344) continue;
          d += ` L${(x - 4).toFixed(1)} 206 L${(x - 1.5).toFixed(1)} 180 L${(x + 1.5).toFixed(1)} 214 L${(x + 4).toFixed(1)} 206`;
        }
      }
      d += ' L348 206';
      svg.querySelector('.f49-ekg').setAttribute('d', d);
    };
    const git = (n, anim = true) => {
      i = clamp(n, 0, 6);
      const a = AD[i], b0 = { ...cur };
      durT();
      const ms = !anim ? 0 : i === 5 ? 2200 : 800;
      const t1 = i === 5 ? { map: 140, icp: 80, kh: 45 } : null; // 6. adımda ICP önce 80'e, MAP 140'tan 60'a iner
      durT = tween(ms, (k) => {
        if (t1 && !RM) { const k1 = clamp(k * 3, 0, 1), k2 = clamp((k - 0.33) / 0.67, 0, 1); cur.icp = lerp(b0.icp, a.icp, k1); cur.map = lerp(b0.map, a.map, k2); cur.kh = lerp(b0.kh, a.kh || b0.kh, k); }
        else { cur.map = lerp(b0.map, a.map, k); cur.icp = lerp(b0.icp, a.icp, k); cur.kh = lerp(b0.kh, a.kh || b0.kh, k); }
        yaz();
      });
      el.querySelector('.f49-adim').textContent = `${i + 1}/7`;
      el.querySelector('.f49-adim-ad').textContent = a.ad;
      el.querySelector('[data-a="geri"]').disabled = i === 0; el.querySelector('[data-a="ileri"]').disabled = i === 6;
      const on = { sap: true, isk: i === 2 || i === 3, sem: i >= 3 && i <= 4, dmr: true, baro: i === 4 || i === 5, vag: i === 4 || i === 5, kalp: true, kon: i >= 5 };
      svg2.querySelectorAll('.f49-rf').forEach((g) => { const r = g.dataset.r; g.classList.toggle('on', !!on[r] && ['isk', 'sem', 'baro', 'vag', 'kon'].includes(r)); g.style.display = (r === 'isk' || r === 'kon') && !on[r] ? 'none' : ''; });
      svg2.querySelector('[data-r="sap"]').classList.toggle('f49-isk', i >= 2 && i !== 3 && i !== 4);
      svg2.querySelector('[data-r="sap"] rect').setAttribute('transform', i >= 5 ? 'translate(75 38) scale(1 0.7) translate(-75 -38)' : '');
      const dar = i === 3 || i === 4 || i === 5;
      svg2.querySelector('[data-p="d1"]').setAttribute('d', dar ? 'M238 26 Q293 34 348 26' : 'M238 26 L348 26');
      svg2.querySelector('[data-p="d2"]').setAttribute('d', dar ? 'M238 50 Q293 42 348 50' : 'M238 50 L348 50');
      svg2.classList.toggle('f49-soluk', i === 6);
      el.querySelector('[data-o="roz"]').innerHTML = (i === 4 || i === 5 ? '<span class="tag crit">Cushing triadı: hipertansiyon + bradikardi + anormal solunum</span>' : '') + (i === 6 ? '<span class="tag crit">beyin sapı ölümü</span>' : '');
      if (anim) capYaz(el, CAP[i]);
    };
    const oynDur = () => { oyn = false; clearTimeout(oynZ); const b = el.querySelector('[data-a="oyn"]'); if (b) { b.setAttribute('aria-pressed', 'false'); b.textContent = 'Oynat'; } };
    const adimla = () => { if (!oyn) return; if (i >= 6) { oynDur(); return; } git(i + 1); oynZ = setTimeout(adimla, 3000); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      if (b.dataset.a === 'oyn') {
        if (oyn) { oynDur(); return; }
        oyn = true; b.setAttribute('aria-pressed', 'true'); b.textContent = 'Duraklat';
        if (i >= 6) { git(0); oynZ = setTimeout(adimla, 3000); } else adimla();
        return;
      }
      oynDur();
      git(i + (b.dataset.a === 'ileri' ? 1 : -1));
    });
    const dar = darIzle(el, (d) => el.classList.toggle('f49-dar', d));
    git(0, false); yaz(); ekgCiz();
    const stop = RM ? () => {} : ticker(el, (dt) => {
      ekgT += dt; faz += dt;
      ekgCiz();
      const kh = AD[i].kh ? cur.kh : 0, k = svg2.querySelector('[data-p="kalp"]');
      const s = kh ? 1 + 0.08 * Math.max(0, Math.sin(faz * Math.PI * 2 * kh / 60)) ** 8 : 1;
      k.setAttribute('transform', `translate(316 125) scale(${s.toFixed(3)}) translate(-316 -125)`);
    });
    return () => { stop(); durT(); oynDur(); dar(); };
  };

  /* =====================================================================
     5 · f49_azalt — hangi bölme, hangi müdahale? (K1 s. 208–209)
     ===================================================================== */
  VIZ.f49_azalt = (el) => {
    const M = {
      evd: { ad: 'EVD\'den boşalt', d: 8, cap: '<b>CSF: EVD\'den boşaltma.</b> Hidrosefali neden olmasa da işe yarar; birkaç mililitre CSF bile ICP\'yi belirgin düşürür. Bir müdahale seçin. [[K1 s. 208]]' },
      hem: { ad: 'Hematomu boşalt', d: 10, cap: '<b>Kan: hematomun boşaltılması.</b> Yükselmiş ICP\'nin nedeni hematomsa acilen boşaltılır. [[K1 s. 208]]' },
      ven: { ad: 'Venöz drenaj', d: 4, cap: '<b>Venöz kan: drenajı kolaylaştırma.</b> Kafa içi venöz kanın yararlı bir işi yoktur. Dural sinüslerde kapak olmadığından akım yalnız sinüs–sağ atriyum basınç farkına bağlıdır: nötr baş, gevşek bağlar, 30° baş yukarı, en düşük PEEP ve öksürmeyi önleyen kas gevşetici bu farkı korur. [[K1 s. 208]]' },
      cmr: { ad: 'CMR\'yi düşür', d: 4, cap: '<b>Arteriyel kan: CMR\'yi düşürme.</b> Akım–metabolizma eşleşmesiyle CBF CMR\'yi izler. Nöbet CMR\'yi, CBF\'yi ve ICP\'yi çok artırır; benzodiazepin ve antiepileptikle hızla tedavi edilir. Propofol, tiyopental ya da midazolam CMR\'yi normalin altına indirir. [[K1 s. 208]]' },
      gaz: { ad: 'PaO₂/PaCO₂ hedefi', d: 3, cap: '<b>Arteriyel kan: hipoksemi ve hiperkapniden kaçınma.</b> İkisi de arteriyol dilatasyonuyla CBF\'yi ve ICP\'yi artırır; PaO₂ 10 kPa\'nın üstünde, PaCO₂ 4,5–5,0 kPa tutulur. Hedef, metabolizmaya tam yetecek kadar CBF\'dir. [[K1 s. 208]]' },
      ozm: { ad: 'Ozmoterapi', d: 6, cap: '<b>Parankim: ozmoterapi.</b> İntravenöz mannitol ya da hipertonik salin beyin hücre dışı sıvısını azaltır; ağır ICP artışını geçici olarak düşürür. [[K1 s. 208]]' },
      dex: { ad: 'Deksametazon / tümör cerrahisi', d: 3, cap: '<b>Parankim: tümör.</b> Tümör çevresindeki ödem deksametazonla küçültülür ya da tümörün cerrahi çıkarılması düşünülür. [[K1 s. 209]]' },
      aps: { ad: 'Apse drenajı + antibiyotik', d: 3, cap: '<b>Parankim: apse.</b> Apsenin hacmi cerrahi drenaj ve antibiyotikle küçültülür. [[K1 s. 209]]' },
      kra: { ad: 'Dekompresif kraniyektomi', d: 12, cap: '<b>Son çare: dekompresif kraniyektomi.</b> Öteki önlemler başarısızsa kemik flebi çıkarılır, deri kapatılır; beyin defektten yukarı doğru genişler. [[K1 s. 209]]' },
    };
    const GRP = [['CSF', 'basic', ['evd']], ['Kan', 'crit', ['hem', 'ven', 'cmr', 'gaz']], ['Parankim', 'chip', ['ozm', 'dex', 'aps']], ['Son çare', 'warn', ['kra']]];
    const ROZ = {
      ven: ['baş nötr', 'boyunluk ve sıkı ETT bağı yok', '30° baş yukarı', 'en düşük PEEP', 'kas gevşetici: öksürme/ıkınma yok', 'Dural sinüslerde kapak yok'],
      cmr: ['akım–metabolizma eşleşmesi: CMR ↓ → CBF ↓ → ICP ↓', 'nöbet: CMR ↑↑ → benzodiazepin + antiepileptik', 'propofol · tiyopental · midazolam'],
      gaz: ['PaO₂ > 10 kPa · PaCO₂ 4,5–5,0 kPa', 'hipoksemi ve hiperkapni → arteriyol dilatasyonu → CBF ↑ → ICP ↑'],
    };
    const S = new Set();
    let icpG = 35, durT = () => {}, k = {}; // k: her müdahalenin 0..1 uygulanma düzeyi (geçiş için)
    Object.keys(M).forEach((m) => (k[m] = 0));
    const icpH = () => Math.max(10, 35 - [...S].reduce((a, m) => a + M[m].d, 0));
    const FL1 = 118, FL2 = 252; // kemik flebi
    const flepD = ustYay(KS, FL1, FL2, 0, 24), deriD = `M${FL1} ${ustY(KS, FL1).toFixed(1)} Q${(FL1 + FL2) / 2} ${(ustY(KS, (FL1 + FL2) / 2) - 26).toFixed(1)} ${FL2} ${ustY(KS, FL2).toFixed(1)}`;
    const tumX = 250, tumY = 74, apsX = 104, apsY = 128;
    el.innerHTML = `<div class="f49-g2 f49-g2-azalt">
      <div><svg class="f49-svg" viewBox="0 0 360 300" role="img" aria-label="Yükselmiş ICP'li kafa kutusu, boyunda internal juguler ven ve sağ atriyum; seçilen müdahaleye göre bölmeler küçülür">
        <defs><pattern id="f49-od2" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V7" class="f49-od-c"/></pattern></defs>
        ${kafa('sagittal', { alt: ijvHtml() + '<path class="f49-boyun" d="M128 210 L136 270 M282 196 L270 270"/>', beyinUst: '<ellipse class="f49-od-u f49-od-u2" data-p="od" cx="178" cy="106" rx="128" ry="80"/>', ic: `${damarHtml()}
          <g data-p="hem"><ellipse class="f49-hem" cx="98" cy="58" rx="36" ry="10" transform="rotate(-38 98 58)"/></g>
          <circle class="f49-tum-h" data-p="tumh" cx="${tumX}" cy="${tumY}" r="24"/><circle class="f49-kitle" data-p="tum" cx="${tumX}" cy="${tumY}" r="13"/>
          <circle class="f49-aps" data-p="aps" cx="${apsX}" cy="${apsY}" r="12"/>
          <path class="f49-kat-c" data-p="evd" d="M154 92 L150 ${ustY(KS, 150).toFixed(1)} L150 6"/>` })}
        <path class="f49-kemik-ort" d="${flepD}"/>
        <path class="f49-bulge" data-p="bulge" d=""/>
        <path class="f49-deri" data-p="deri" d="${deriD}"/>
        <g data-p="flep"><path class="f49-flep" d="${flepD}"/></g>
        ${tx(204, 112, 'tümör + ödem', 'f49-ts f49-halo', 'start')}${tx(62, 152, 'apse', 'f49-ts f49-halo', 'start')}${tx(46, 38, 'hematom', 'f49-ts f49-c-crit', 'end')}
        <g data-p="basinc">${ok(140, 222, 140, 268, 'f49-c-crit f49-basinc', 9)}</g>
        ${tx(130, 236, 'basınç farkı', 'f49-ts', 'end')}${tx(130, 250, 'sinüs →', 'f49-ts', 'end')}${tx(130, 264, 'sağ atriyum', 'f49-ts', 'end')}
        <path class="f49-kalp" d="M150 280 C150 270 162 268 162 278 C162 268 174 270 174 280 C174 290 162 296 162 300 C162 296 150 290 150 280 Z"/>
        <g data-p="peep"><circle class="f49-peep" cx="200" cy="284" r="10"/>${tx(200, 288, '+', 'f49-t', 'middle')}</g>${tx(214, 289, 'PEEP', 'f49-ts', 'start')}
        <g data-p="yatak" class="f49-yatak-g"><path class="f49-yatak" data-p="yt" d=""/><path class="f49-aci" data-p="aci" d=""/><text class="f49-ts f49-c-acc" data-p="acit" x="346" y="262" text-anchor="end">30° baş yukarı</text></g>
      </svg><div class="f49-rozetler" data-o="roz"></div></div>
      <div class="f49-az-sag">
        <div class="f49-gst"><svg class="f49-svg" viewBox="0 0 200 128" role="img" aria-label="ICP göstergesi 0–60 mmHg">
          <path class="f49-gb f49-gb-ok" d="${yayD(0, 20)}"/><path class="f49-gb f49-gb-w" d="${yayD(20, 40)}"/><path class="f49-gb f49-gb-c" d="${yayD(40, 60)}"/>
          ${[0, 20, 40, 60].map((v) => { const p = gp(v, 98); return tx(p[0].toFixed(1), (p[1] + 4).toFixed(1), v, 'f49-ts', v === 0 ? 'end' : v === 60 ? 'start' : 'middle'); }).join('')}
          <path class="f49-ibre" d="M100 102 L100 34"/><circle class="f49-ibre-m" cx="100" cy="102" r="5"/>
          <text class="f49-gst-v" x="100" y="124" text-anchor="middle">35 mmHg</text></svg>
          <p class="f49-lbl">ICP (temsilî)</p></div>
        <dl class="kv f49-liste"></dl>
        ${GRP.map(([ad, c, ms]) => `<div class="f49-mg"><span class="tag ${c === 'chip' ? '' : c}">${ad}</span><div class="f49-mg-b">${ms.map((m) => `<button type="button" class="f49-mud" data-m="${m}" aria-pressed="false">${M[m].ad}</button>`).join('')}</div></div>`).join('')}
        <div class="btn-row"><button type="button" class="btn ghost" data-a="sif">Sıfırla</button></div>
      </div></div>`;
    function gp(v, r) { const a = Math.PI * (1 - v / 60); return [100 + r * Math.cos(a), 102 - r * Math.sin(a)]; }
    function yayD(a, b) { const p = gp(a, 80), q = gp(b, 80); return `M${p[0].toFixed(1)} ${p[1].toFixed(1)} A80 80 0 0 1 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`; }
    const svg = el.querySelector('svg');
    const P = (x) => svg.querySelector(`[data-p="${x}"]`);
    const ibre = el.querySelector('.f49-ibre'), gv = el.querySelector('.f49-gst-v');
    const uygula = () => {
      P('vent').setAttribute('transform', `translate(172 98) scale(${(1.35 - 0.4 * k.evd).toFixed(3)})`);
      P('evd').style.opacity = k.evd;
      const h = P('hem'); h.style.opacity = (1 - k.hem).toFixed(2); h.setAttribute('transform', `translate(98 58) scale(${(1 - 0.8 * k.hem).toFixed(3)}) translate(-98 -58)`);
      const w = 8 - 4 * k.ven; P('sin-d').style.strokeWidth = (w + 2.4).toFixed(2); P('sin-i').style.strokeWidth = w.toFixed(2);
      el.querySelector('.f49-basinc').style.strokeWidth = ''; el.querySelector('.f49-basinc .f49-ok-c').style.strokeWidth = (2.5 + 4 * k.ven).toFixed(2);
      P('peep').setAttribute('transform', `translate(200 284) scale(${(1 - 0.45 * k.ven).toFixed(3)}) translate(-200 -284)`);
      const ac = 30 * k.ven * Math.PI / 180, bx = 272, by = 292, L = 72;
      P('yt').setAttribute('d', `M${bx} ${by} L${bx + L} ${by} M${bx} ${by} L${(bx + L * 0.55 * Math.cos(ac)).toFixed(1)} ${(by - L * 0.55 * Math.sin(ac)).toFixed(1)}`);
      P('aci').setAttribute('d', k.ven > 0.05 ? `M${bx + 24} ${by} A24 24 0 0 0 ${(bx + 24 * Math.cos(ac)).toFixed(1)} ${(by - 24 * Math.sin(ac)).toFixed(1)}` : '');
      P('yatak').style.opacity = (0.25 + 0.75 * k.ven).toFixed(2);
      P('acit').style.opacity = k.ven.toFixed(2);
      P('art').style.strokeWidth = (3.4 - 0.9 * k.cmr - 0.8 * k.gaz).toFixed(2);
      const od = P('od'); od.style.opacity = (0.75 - 0.6 * k.ozm).toFixed(2);
      const bs = 1.03 - 0.03 * k.ozm; P('beyin').setAttribute('transform', `translate(178 106) scale(${bs.toFixed(3)}) translate(-178 -106)`); od.setAttribute('transform', P('beyin').getAttribute('transform'));
      P('tumh').style.opacity = (1 - k.dex).toFixed(2); P('tum').setAttribute('r', (13 - 5 * k.dex).toFixed(1));
      P('aps').setAttribute('r', (12 - 7 * k.aps).toFixed(1));
      P('flep').setAttribute('transform', `translate(${(-4 * k.kra).toFixed(1)} ${(-14 * k.kra).toFixed(1)}) rotate(${(-6 * k.kra).toFixed(1)} 185 22)`);
      P('flep').style.opacity = (1 - 0.7 * k.kra).toFixed(2);
      P('deri').style.opacity = k.kra.toFixed(2);
      const yb = ustY(KS, (FL1 + FL2) / 2) - 2 - 10 * k.kra;
      P('bulge').setAttribute('d', k.kra > 0.02 ? `M${FL1 + 6} ${(ustY(KS, FL1 + 6) + 4).toFixed(1)} Q${(FL1 + FL2) / 2} ${(yb - 12 * k.kra).toFixed(1)} ${FL2 - 6} ${(ustY(KS, FL2 - 6) + 4).toFixed(1)} Z` : '');
      const a = Math.PI * (1 - icpG / 60);
      ibre.setAttribute('d', `M100 102 L${(100 + 70 * Math.cos(a)).toFixed(1)} ${(102 - 70 * Math.sin(a)).toFixed(1)}`);
      gv.textContent = Math.round(icpG) + ' mmHg';
      gv.setAttribute('class', 'f49-gst-v ' + (icpG > 40 ? 'f49-c-crit' : icpG > 20 ? 'f49-c-warn' : 'f49-c-ok'));
    };
    const guncelle = (son) => {
      const h0 = icpG, k0 = { ...k }, h1 = icpH();
      durT();
      durT = tween(700, (f) => { Object.keys(M).forEach((m) => (k[m] = lerp(k0[m], S.has(m) ? 1 : 0, f))); icpG = lerp(h0, h1, f); uygula(); });
      el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(S.has(b.dataset.m))));
      el.querySelector('.f49-liste').innerHTML = S.size ? [...S].map((m) => `<dt>${M[m].ad}</dt><dd>−${M[m].d} mmHg</dd>`).join('') + `<dt><b>ICP</b></dt><dd><b>${h1} mmHg</b></dd>` : '<dt>Seçilen</dt><dd>yok · ICP 35 mmHg</dd>';
      const r = son && S.has(son) && ROZ[son] ? ROZ[son] : [];
      el.querySelector('[data-o="roz"]').innerHTML = r.map((s) => `<span class="tag ${son === 'ven' ? 'basic' : 'gold'}">${s}</span>`).join('');
      if (son) capYaz(el, M[son].cap);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m],[data-a]'); if (!b) return;
      if (b.dataset.a) { S.clear(); guncelle(null); capYaz(el, M.evd.cap); return; }
      const m = b.dataset.m;
      if (S.has(m)) S.delete(m); else S.add(m);
      guncelle(m);
    });
    const dar = darIzle(el, (d) => el.classList.toggle('f49-dar', d));
    uygula(); guncelle(null);
    return () => { durT(); dar(); };
  };

  /* =====================================================================
     6 · f49_sinif — sınıflama ağacı ve GCS şeridi (K1 s. 209)
     ===================================================================== */
  VIZ.f49_sinif = (el) => {
    const C = {
      kok: '<b>Kafa travması.</b> Beyin hasarı olsun olmasın başa gelen her travmadır; mekanizmaya ve eşlik eden yaralanmalara, TBI varsa ayrıca şiddete ve alana göre sınıflanır. [[K1 s. 209]]',
      mek: '<b>Mekanizma.</b> Künt (trafik kazası, düşme), penetran (ateşli silah, bıçak) ya da askerî ortamda patlama. Bir dala ya da GCS değerine dokunun. [[K1 s. 209]]',
      kunt: '<b>Künt travma: kapalı ya da açık.</b> Kapalıda dura sağlamdır; açıkta dura yırtılır, beyin ve CSF çevredeki mikroorganizmalara açılır. [[K1 s. 209]]',
      pen: '<b>Penetran travma.</b> Ateşli silah ya da bıçak yaralanması; tanım gereği açıktır. [[K1 s. 209]]',
      esl: '<b>Eşlik eden yaralanmalar.</b> Travmadan sonra kafa travması tek başına olabilir ya da başka travmatik yaralanmalar eşlik edebilir. [[K1 s. 209]]',
      alan: '<b>Alan.</b> Yerel (ekstradural hematom, kontüzyon) ya da diffüz (diffüz aksonal hasar, hipoksik beyin hasarı); iki tür sıklıkla bir aradadır. [[K1 s. 209]]',
      sid: '<b>Şiddet.</b> TBI\'nin şiddeti hastaneye gelişte resüsitasyon sonrası GCS ile belirlenir. Şeritten bir GCS değeri seçin. [[K1 s. 209]]',
    };
    const CK = { kok: 'kok', mek: 'mek', kunt: 'kunt', kap: 'kunt', ack: 'kunt', pen: 'pen', tan: 'pen', pat: 'mek', esl: 'esl', izo: 'esl', esk: 'esl', alan: 'alan', yer: 'alan', dif: 'alan', sid: 'sid', gcsb: 'sid' };
    const n = (id, s, cls = '') => `<button type="button" class="f49-dg ${cls}" data-n="${id}" aria-pressed="${id === 'mek'}">${s}</button>`;
    el.innerHTML = `<div class="f49-agac">
        <div class="f49-kok">${n('kok', '<b>Kafa travması</b>: başa gelen her travma (beyin hasarı olsun olmasın)', 'f49-dg-kok')}</div>
        <div class="f49-dallar">
          <div class="f49-dal" data-d="mek">${n('mek', 'Mekanizma', 'f49-dg-bas')}
            <ul><li>${n('kunt', '<b>Künt</b> · trafik kazası, düşme')}<ul><li>${n('kap', '<b>Kapalı</b>: dura sağlam')}</li><li>${n('ack', '<b>Açık</b>: dura yırtık, beyin ve CSF mikroorganizmalara açık', 'f49-dg-acik')}</li></ul></li>
              <li>${n('pen', '<b>Penetran</b> · ateşli silah, bıçak')}<ul><li>${n('tan', 'tanım gereği açık <span class="f49-ok-y">↖ Açık</span>')}</li></ul></li>
              <li>${n('pat', '<b>Patlama</b> · askerî ortam')}</li></ul></div>
          <div class="f49-dal" data-d="esl">${n('esl', 'Eşlik eden yaralanma', 'f49-dg-bas')}
            <ul><li>${n('izo', 'İzole kafa travması')}</li><li>${n('esk', 'Eşlik eden travmatik yaralanmalar')}</li></ul></div>
          <div class="f49-tbi"><p class="f49-tbi-b">TBI varsa ↓</p><div class="f49-tbi-g">
            <div class="f49-dal" data-d="sid">${n('sid', 'Şiddet', 'f49-dg-bas')}<ul><li>${n('gcsb', 'resüsitasyon sonrası GCS → aşağıdaki şerit ↓')}</li></ul></div>
            <div class="f49-dal" data-d="alan">${n('alan', 'Alan', 'f49-dg-bas')}<ul><li>${n('yer', '<b>Yerel</b>: ekstradural hematom, kontüzyon')}</li><li class="f49-iki">⇅ sıklıkla bir arada</li><li>${n('dif', '<b>Diffüz</b>: diffüz aksonal hasar, hipoksik beyin hasarı')}</li></ul></div>
          </div></div>
        </div></div>
      <div class="f49-gcs-k"></div>
      <div class="f49-gcs-leg"><span><i class="f49-sw-c"></i>Ağır 3–8 · mortalite ≈ %50 · sağ kalanların birçoğu ağır özürlü</span><span><i class="f49-sw-w"></i>Orta 9–12 · ≈ %10</span><span><i class="f49-sw-o"></i>Hafif 13–15 · %0,1 · iyi prognoz</span></div>`;
    let sec = 'mek', gcs = null, dar = false;
    const kutu = el.querySelector('.f49-gcs-k');
    const gcsCiz = () => {
      const W = dar ? 360 : 640, H = dar ? 132 : 128, x0 = 14, bw = (W - 28) / 13, y0 = 26, bh = 32;
      const grp = (g) => (g <= 8 ? 'c' : g <= 12 ? 'w' : 'o');
      const MORT = [['c', 3, 50, '≈ %50'], ['w', 9, 10, '≈ %10'], ['o', 13, 0.1, '%0,1']];
      const L = 6 * bw; // %50 = ağır grubun genişliği (doğrusal ölçek)
      kutu.innerHTML = `<svg class="f49-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="GCS 3–15 şeridi: ağır 3–8, orta 9–12, hafif 13–15 ve mortalite çubukları">
        ${tx(x0, 16, 'resüsitasyon sonrası GCS (hastaneye gelişte)', 'f49-ts')}
        ${Array.from({ length: 13 }, (_, k) => { const g = k + 3, x = x0 + k * bw; return `<g class="f49-gk" data-g="${g}" role="button" tabindex="0" aria-label="GCS ${g}"><rect class="f49-gk-${grp(g)}${gcs === g ? ' on' : ''}" x="${(x + 1).toFixed(1)}" y="${y0}" width="${(bw - 2).toFixed(1)}" height="${bh}" rx="4"/>${tx((x + bw / 2).toFixed(1), y0 + 21, g, 'f49-t', 'middle')}</g>`; }).join('')}
        ${[['Ağır', 3, 6], ['Orta', 9, 4], ['Hafif', 13, 3]].map(([a, g, nn]) => tx((x0 + (g - 3) * bw + (nn * bw) / 2).toFixed(1), y0 + bh + 16, a, 'f49-t', 'middle')).join('')}
        ${MORT.map(([c, g, p, s]) => { const x = x0 + (g - 3) * bw + 1, w = Math.max(1.5, (L * p) / 50); return `<rect class="f49-mort-${c}" x="${x.toFixed(1)}" y="${y0 + bh + 24}" width="${w.toFixed(1)}" height="10" rx="2"/>${tx(x.toFixed(1), y0 + bh + 50, s, 'f49-ts', 'start')}`; }).join('')}
        ${tx(W - 14, H - 4, 'mortalite (doğrusal ölçek)', 'f49-ts', 'end')}
      </svg>`;
    };
    const goster = () => {
      el.querySelectorAll('[data-n]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.n === sec && gcs === null)));
      gcsCiz();
    };
    el.addEventListener('click', (e) => {
      const g = e.target.closest('[data-g]');
      if (g) { gcs = +g.dataset.g; secGcs(); return; }
      const b = e.target.closest('[data-n]'); if (!b) return;
      sec = b.dataset.n; gcs = null;
      const dal = b.closest('.f49-dal');
      if (dar && dal && b.classList.contains('f49-dg-bas')) dal.classList.toggle('kapali');
      goster(); capYaz(el, C[CK[sec]]);
    });
    el.addEventListener('keydown', (e) => { const g = e.target.closest('[data-g]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); gcs = +g.dataset.g; secGcs(); } });
    const secGcs = () => {
      goster();
      const h = gcs >= 13 ? `<b>GCS ${gcs}: hafif TBI.</b> Mortalite %0,1; prognoz iyidir. [[K1 s. 209]]` : gcs >= 9 ? `<b>GCS ${gcs}: orta TBI.</b> Mortalite yaklaşık %10. [[K1 s. 209]]` : `<b>GCS ${gcs}: ağır TBI.</b> Mortalite yaklaşık %50; sağ kalanların birçoğu ağır özürlü kalır. [[K1 s. 209]]`;
      capYaz(el, h);
      const r = el.querySelector(`[data-g="${gcs}"]`); if (r) r.focus({ preventScroll: true });
    };
    const ro = darIzle(el, (d) => { dar = d; el.classList.toggle('f49-dar', d); el.querySelectorAll('.f49-dal').forEach((x) => x.classList.toggle('kapali', d && x.dataset.d !== 'mek')); gcsCiz(); }, 640);
    goster();
    return () => { ro(); };
  };

  /* =====================================================================
     7 · f49_hasar — primer ve sekonder hasarın zaman çizelgesi (K1 s. 209)
     ===================================================================== */
  VIZ.f49_hasar = (el) => {
    const AD = ['Çarpma', 'Dakikalar', 'Saatler', 'Günler', 'Sonuç'];
    const MEK = ['Kan–beyin bariyeri hasarı', 'Serebral ödem', 'ICP artışı', 'Nöbet', 'İskemi', 'Enfeksiyon'];
    const CAP = [
      '<b>Çarpma anı.</b> Mekanik kuvvetler nöron ve damar dokusunu gerer ve keser: primer hasar. Zamanı ilerletin. [[K1 s. 209]]',
      '<b>Primer hasar geri dönmez.</b> Nöron dokusu damarlardan daha duyarlıdır; ekstradural hematom ya da travmatik subaraknoid kanama gibi damar yırtılan yaralanmalara bu yüzden sıklıkla diffüz aksonal hasar eşlik eder. [[K1 s. 209]]',
      '<b>Sekonder hasar başlıyor.</b> Yaralı hücreler inflamasyonu tetikler; serebral ödem ve ICP artışı gelişir. [[K1 s. 209]]',
      '<b>Saatlerden günlere.</b> Mekanizmalar: kan–beyin bariyeri hasarı, serebral ödem, ICP artışı, nöbet, iskemi, enfeksiyon. [[K1 s. 209]]',
    ];
    const SON = ['<b>Sonuç.</b> Sekonder hasar primer hasarın çevresindeki nöronları da yitirtti. Tıbbi ve cerrahi çabalar bunu önlemeye, olabildiğince çok nöronu korumaya yöneliktir. [[K1 s. 209]]',
      '<b>Sonuç: sekonder hasar önlendi.</b> Primer hasar aynı kaldı; ama çevredeki nöronların çoğu korundu. [[K1 s. 209]]'];
    let adim = 0, ted = false, R = 0, durT = () => {}, oyn = false, oynZ = 0, dar = false;
    const RAD = [[0, 0, 56, 84, 100], [0, 0, 26, 32, 34]]; // sekonder halka yarıçapı (tedavisiz / tedavili), temsilî
    el.innerHTML = `<div class="f49-kont">
        <label class="f49-rng"><span>Zaman <b data-o="ad">Çarpma</b></span><input type="range" min="0" max="4" step="1" value="0" aria-label="Zaman"></label>
        <div class="btn-row"><button type="button" class="btn" data-a="oyn" aria-pressed="false">Oynat</button></div>
        <div><span class="f49-lbl">Tedavi</span>${segHtml('Tedavi', 'ted', [['0', 'Sekonder hasarı önle: yok'], ['1', 'var']], '0')}</div></div>
      <div class="f49-g2 f49-g2-hasar">
        <div class="f49-onleme"><h4>Primer hasarı azaltmanın en iyi yolu: önlemek</h4><ul><li>hız sınırları, güvenli sürüş</li><li>hava yastığı, emniyet kemeri</li><li>bisiklet ve motosiklette kask</li></ul><p class="f49-lbl">çarpmadan önce</p></div>
        <div><div class="f49-hasar-k"></div><p class="f49-not" data-o="not"></p><div class="f49-mek" data-o="mek"></div></div>
      </div>`;
    const kutu = el.querySelector('.f49-hasar-k');
    let N = [], cx = 180, cy = 132;
    const ciz = () => {
      const C = dar ? 8 : 10, xs = 34, xe = 326, dx = (xe - xs) / (C - 1);
      N = [];
      for (let r = 0; r < 5; r++) for (let c = 0; c < C; c++) { const x = xs + c * dx + (r % 2 ? dx * 0.25 : -dx * 0.25), y = 80 + r * 26; N.push({ x, y, d: Math.hypot(x - cx, y - cy) }); }
      const sir = N.map((n, i) => i).sort((a, b) => N[a].d - N[b].d);
      sir.slice(0, 8).forEach((i) => (N[i].p = true));
      const TX = [40, 112, 184, 256, 328];
      kutu.innerHTML = `<svg class="f49-svg" viewBox="0 0 360 250" role="img" aria-label="Zaman oku ve beyin dokusu ızgarası: primer hasar merkezde, sekonder hasar çevresinde yayılır">
        ${ok(16, 22, 350, 22, 'f49-c-mut', 9)}
        ${TX.map((x, i) => `<circle class="f49-zt" data-t="${i}" cx="${x}" cy="22" r="5"/>${tx(x, 42, AD[i].toLowerCase(), 'f49-ts', 'middle')}`).join('')}
        <path class="f49-simsek" d="M44 2 L35 16 L42 16 L36 30 L50 12 L43 12 L48 2 Z"/>
        <path class="f49-damar" d="M20 106 Q100 98 180 106 T340 106"/>
        <path class="f49-damar" data-p="dmr" d="M20 158 Q100 150 180 158 T340 158"/>
        <path class="f49-damar-k" data-p="yirtik" d="M164 155 L172 162 M188 155 L196 162"/>
        <defs><clipPath id="f49-hclip"><rect x="0" y="58" width="360" height="150"/></clipPath></defs><circle clip-path="url(#f49-hclip)" class="f49-halka" data-p="halka" cx="${cx}" cy="${cy}" r="0"/>
        ${N.map((n, i) => `<circle class="f49-nr" data-i="${i}" cx="${n.x.toFixed(1)}" cy="${n.y}" r="${dar ? 8 : 7.5}"/>`).join('')}
        <text class="f49-t f49-c-crit f49-halo" data-p="pt" x="${cx}" y="${cy + 4}" text-anchor="middle">primer hasar, geri dönmez</text>
        <text class="f49-t" data-p="say" x="180" y="226" text-anchor="middle"></text>
        <text class="f49-ts f49-c-ok" data-p="kor" x="180" y="244" text-anchor="middle"></text>
      </svg>`;
      uygula();
    };
    const uygula = () => {
      const svg = kutu.querySelector('svg'); if (!svg) return;
      const Rt = RAD[1][adim];
      let sek = 0, kor = 0;
      svg.querySelectorAll('.f49-nr').forEach((c) => {
        const n = N[+c.dataset.i];
        let cls = 'f49-nr';
        if (n.p && adim >= 0) cls += ' f49-nr-p';
        else if (n.d <= R) { cls += ' f49-nr-s'; sek++; }
        else if (ted && adim >= 2 && n.d <= RAD[0][adim]) { cls += ' f49-nr-k'; kor++; }
        c.setAttribute('class', cls);
      });
      svg.querySelector('[data-p="halka"]').setAttribute('r', R.toFixed(1));
      svg.querySelector('[data-p="yirtik"]').style.display = adim >= 1 ? '' : 'none';
      svg.querySelector('[data-p="dmr"]').classList.toggle('f49-damar-y', adim >= 1);
      svg.querySelector('[data-p="pt"]').style.display = adim >= 1 ? '' : 'none';
      svg.querySelectorAll('.f49-zt').forEach((z) => z.classList.toggle('on', +z.dataset.t === adim));
      svg.querySelector('[data-p="say"]').textContent = adim === 4 ? `Kaybedilen nöron: primer 8 + sekonder ${sek}` : '';
      svg.querySelector('[data-p="kor"]').textContent = adim >= 2 && ted ? `yeşil kenarlı: korunan nöronlar (${kor})` : '';
      void Rt;
    };
    const git = (n, anim = true) => {
      adim = clamp(n, 0, 4);
      el.querySelector('input[type=range]').value = adim;
      el.querySelector('[data-o="ad"]').textContent = AD[adim];
      const R0 = R, R1 = RAD[ted ? 1 : 0][adim];
      durT(); durT = tween(anim ? 1500 : 0, (f) => { R = lerp(R0, R1, f); uygula(); });
      el.querySelector('[data-o="not"]').textContent = adim === 1 ? 'Önce 8 nöron, sonra 1 damar: nöron dokusu damardan daha duyarlı → damar yırtılan yaralanmaya diffüz aksonal hasar eşlik eder.' : adim >= 2 ? 'yaralı hücreler → inflamasyon → ödem → ICP ↑' : '';
      const nM = adim === 2 ? 3 : adim >= 3 ? 6 : 0;
      el.querySelector('[data-o="mek"]').innerHTML = nM ? `<p class="f49-lbl">${ted ? 'Tedavinin hedefi: bu mekanizmaları önlemek' : 'Sekonder hasar mekanizmaları'}</p>` + MEK.slice(0, nM).map((s) => `<span class="tag ${ted ? 'ok' : 'warn'}">${s}</span>`).join('') : '';
      capYaz(el, adim === 4 ? SON[ted ? 1 : 0] : CAP[adim]);
    };
    const oynDur = () => { oyn = false; clearTimeout(oynZ); const b = el.querySelector('[data-a="oyn"]'); b.setAttribute('aria-pressed', 'false'); b.textContent = 'Oynat'; };
    const adimla = () => { if (!oyn) return; if (adim >= 4) { oynDur(); return; } git(adim + 1); oynZ = setTimeout(adimla, 2500); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a],[data-ted]'); if (!b) return;
      if (b.dataset.ted) { ted = b.dataset.ted === '1'; basSec(el, 'ted', b.dataset.ted); git(adim); return; }
      if (oyn) { oynDur(); return; }
      oyn = true; b.setAttribute('aria-pressed', 'true'); b.textContent = 'Duraklat';
      if (adim >= 4) { git(0); oynZ = setTimeout(adimla, 2500); } else adimla();
    });
    el.querySelector('input[type=range]').addEventListener('input', (e) => { oynDur(); git(+e.target.value); });
    const ro = darIzle(el, (d) => { dar = d; el.classList.toggle('f49-dar', d); ciz(); });
    git(0, false);
    return () => { durT(); oynDur(); ro(); };
  };

  /* =====================================================================
     8 · f49_hedef — beş "normal" hedef (K1 s. 208, 210)
     ===================================================================== */
  VIZ.f49_hedef = (el) => {
    const SL = [
      { k: 'po2', ad: 'PaO₂', b: 'kPa', min: 4, max: 20, st: 0.5, v: 13, d: 1 },
      { k: 'map', ad: 'MAP', b: 'mmHg', min: 50, max: 140, st: 5, v: 90, d: 0 },
      { k: 'co2', ad: 'PaCO₂', b: 'kPa', min: 3, max: 8, st: 0.1, v: 4.8, d: 1 },
      { k: 'glu', ad: 'Glukoz', b: 'mmol/L', min: 2, max: 20, st: 0.5, v: 7, d: 1 },
      { k: 'isi', ad: 'Vücut iç ısısı', b: '°C', min: 35, max: 40, st: 0.1, v: 37, d: 1 },
    ];
    const ICPV = 20;
    let mon = false, son = null;
    const val = {}; SL.forEach((s) => (val[s.k] = s.v));
    /* bölgeler: [üst sınır, sınıf, etiket] artan sırada */
    const BOL = () => ({
      po2: [[8, 'crit', 'hipoksemi'], [10, 'warn', 'sınırda'], [99, 'ok', 'hedefte']],
      map: mon ? [[70, 'crit', 'CPP < 50'], [80, 'warn', 'CPP < 60'], [110, 'ok', 'hedefte'], [999, 'warn', 'çok yüksek']] : [[80, 'crit', 'düşük'], [110, 'ok', 'hedefte'], [999, 'warn', 'çok yüksek']],
      co2: [[4.5, 'crit', 'hipokapni'], [5.0001, 'ok', 'hedefte'], [99, 'crit', 'hiperkapni']],
      glu: [[4, 'crit', 'hipoglisemi'], [11, 'ok', 'hedefte'], [99, 'warn', 'insülin başla']],
      isi: [[37.6001, 'ok', 'hedefte'], [99, 'crit', 'ateş']],
    });
    const bolge = (k) => { const B = BOL()[k], v = val[k]; for (const b of B) if (v < b[0]) return b; return B[B.length - 1]; };
    /* zincir yolları: ec (etken→CBF), ci (CBF→ICP), cs (CBF→iskemi), ih (ICP→hasar), sh (iskemi→hasar), eh (etken→hasar) */
    const YOL = {
      'po2:hipoksemi': { e: 'PaO₂ ↓', cbf: '↑', y: ['ec', 'ci', 'ih'], m: 'arteriyol dilatasyonu → CBF ↑ → ICP ↑', r: 'nedenler: hava yolu tıkanıklığı, göğüs yaralanması, aspirasyon pnömonisi · yüksek akımlı O₂, düşük GCS\'de erken entübasyon' },
      'po2:sınırda': { e: 'PaO₂ 8–10', y: [], m: 'yükselmiş ICP\'de PaO₂ > 10 kPa tutulur', r: '' },
      'map:düşük': { e: 'MAP ↓', cbf: '↓', y: ['ec', 'cs', 'sh'], m: 'CPP ↓ → otoregülasyon çöker → CBF ↓ → iskemi', r: 'tek bir sistolik < 90 mmHg atağı bile sonucu kötüleştirir · önce sıvı, kanamada kan' },
      'map:CPP < 50': { e: 'CPP < 50', cbf: '↓', y: ['ec', 'cs', 'sh'], m: 'CPP ↓ → otoregülasyon çöker → CBF ↓ → iskemi', r: 'tek bir sistolik < 90 mmHg atağı bile sonucu kötüleştirir · önce sıvı, kanamada kan' },
      'map:CPP < 60': { e: 'CPP < 60', cbf: '↓', y: ['ec', 'cs', 'sh'], m: 'CPP hedefin (> 60 mmHg) altında; 50\'nin altında otoregülasyon çöker', r: 'önce sıvı, kanamada kan' },
      'map:çok yüksek': { e: 'MAP ↑↑', cbf: '↑', y: ['ec', 'ci', 'ih'], m: 'otoregülasyon üst sınırı aşılır → CBF ↑ → ICP ↑', r: 'laringoskopi yanıtını baskıla: ör. güçlü opioid' },
      'co2:hiperkapni': { e: 'PaCO₂ ↑', cbf: '↑', y: ['ec', 'ci', 'ih'], m: 'vazodilatasyon → CBF > 50 mL/100 g/dk → ICP ↑', r: '' },
      'co2:hipokapni': { e: 'PaCO₂ ↓', cbf: '↓', y: ['ec', 'cs', 'sh'], m: 'vazokonstriksiyon → CBF < 50 mL/100 g/dk → iskemi', r: '' },
      'glu:insülin başla': { e: 'glukoz ↑', y: ['eh'], m: 'stres hiperglisemisi → daha kötü sonuç → insülin', r: '' },
      'glu:hipoglisemi': { e: 'glukoz ↓', y: ['eh'], m: 'hücresel asidoz ↑; uzarsa nöron ölümü', r: 'insüline bağımlı diyabetlide kazanın nedeni olabilir' },
      'isi:ateş': { e: 'ateş', cbf: '↑', y: ['ec', 'ci', 'ih'], m: 'CMR ↑ → CBF ↑ → ICP ↑', r: 'parasetamol + dış soğutma' },
    };
    const CAP = {
      ok: '<b>Bütün değerler hedefte.</b> Tıbbi yönetim sekonder beyin hasarını önlemek ve ICP\'yi düşürmek için normoksi, normotansiyon, normokapni, normoglisemi ve normotermiyi korur. Bir değeri kaydırın. [[K1 s. 210]]',
      'po2:hipoksemi': '<b>Hipoksemi (PaO₂ < 8 kPa).</b> CBF\'yi ve dolayısıyla ICP\'yi artırır, sonucu kötüleştirir. Her travma hastasına yüksek akımlı O₂; hipoksemi gelişebilecek hasta erken entübe edilir. [[K1 s. 210]]',
      'po2:sınırda': '<b>PaO₂ 8–10 kPa.</b> Yükselmiş ICP\'de PaO₂ 10 kPa\'nın üstünde tutulur. [[K1 s. 208]]',
      'map:düşük': '<b>MAP 80 mmHg\'nın altında.</b> Gelişte ICP bilinmediğinden AAGBI MAP > 80 mmHg önerir; önce sıvı, kanama düşünülüyorsa kan. Tek bir sistolik < 90 mmHg atağı bile sonucu kötüleştirir. [[K1 s. 210]]',
      cpp: (c) => `<b>CPP ${c} mmHg.</b> ICP ölçülen yoğun bakımda CPP 60 mmHg'nın üstünde tutulur; 50'nin altında otoregülasyon çöker, CBF düşer, iskemi gelişir. [[K1 s. 210]]`,
      'map:çok yüksek': '<b>Hipertansiyon da zararlı.</b> Laringoskopiye yanıt MAP\'yi otoregülasyonun üst sınırının üstüne çıkarabilir; CBF ve ICP artar. Entübasyonda sempatik yanıt baskılanır, ör. güçlü opioidle ön tedavi. [[K1 s. 210]]',
      'co2:hiperkapni': '<b>Hiperkapni.</b> Arteriyol dilatasyonu CBF\'yi 50 mL/100 g/dk\'nın üstüne çıkarır, ICP artar. AAGBI PaCO₂ 4,5–5,0 kPa önerir. [[K1 s. 210]]',
      'co2:hipokapni': '<b>Hipokapni.</b> Vazokonstriksiyon CBF\'yi 50 mL/100 g/dk\'nın altına indirir ve hücresel iskemi yapar. [[K1 s. 210]]',
      'glu:insülin başla': '<b>Hiperglisemi.</b> Travmanın stres yanıtıyla sık görülür ve daha kötü sonuçla ilişkilidir; insülin tipik olarak 11 mmol/L\'de başlanır. Beyin normalde yalnız glukoz kullanır. [[K1 s. 210]]',
      'glu:hipoglisemi': '<b>Hipoglisemi.</b> TBI\'nin doğrudan sonucu nadiren olur; insüline bağımlı diyabetlide kazanın nedeni olabilir. Beyinde hücresel asidozu artırır; uzarsa nöron ölümü yapar. [[K1 s. 210]]',
      'isi:ateş': '<b>Ateş (> 37,6 °C).</b> CMR\'yi artırır; CBF ve ICP yükselir. Antipiretik (parasetamol) ve dış soğutmayla hemen tedavi edilir. [[K1 s. 210]]',
    };
    const fv = (s) => (s.d ? fmt(val[s.k], s.d) : String(val[s.k]));
    el.innerHTML = `<div class="f49-kont"><div><span class="f49-lbl">ICP monitörü</span>${segHtml('ICP monitörü', 'mon', [['0', 'Yok (gelişte)'], ['1', 'Var (yoğun bakım)']], '0')}</div></div>
      <div class="f49-g2 f49-g2-hedef">
        <div class="f49-kayd">${SL.map((s) => `<div class="f49-ks" data-k="${s.k}">
          <div class="f49-ks-u"><span class="f49-ks-ad">${s.ad} <b data-v="${s.k}"></b> <small>${s.b}</small></span><span class="tag" data-z="${s.k}"></span></div>
          <input type="range" min="${s.min}" max="${s.max}" step="${s.st}" value="${s.v}" data-r="${s.k}" aria-label="${s.ad} (${s.b})">
          <div class="f49-zon" data-zb="${s.k}" aria-hidden="true"></div>
          ${s.k === 'map' ? '<p class="f49-cpp" data-o="cpp"></p>' : ''}</div>`).join('')}</div>
        <div>
          <p class="f49-hepsi tag ok">sekonder hasar riski en aza indirildi</p>
          <svg class="f49-svg f49-zincir" viewBox="0 0 360 296" role="img" aria-label="Sonuç zinciri: etken, CBF, ICP, iskemi ve sekonder beyin hasarı">
            ${ok(180, 52, 180, 80, '', 8, ' data-y="ec"')}${ok(150, 122, 96, 160, '', 8, ' data-y="ci"')}${ok(210, 122, 264, 160, '', 8, ' data-y="cs"')}
            ${ok(90, 202, 150, 240, '', 8, ' data-y="ih"')}${ok(270, 202, 210, 240, '', 8, ' data-y="sh"')}
            ${okYol('M252 30 L350 30 L350 262 L274 262', 272, 262, 290, 262, '', 8, ' data-y="eh"')}
            <g class="f49-zk" data-b="e"><rect x="108" y="10" width="144" height="42" rx="9"/><text class="f49-t" x="180" y="28" text-anchor="middle">Etken</text><text class="f49-ts" data-t="e" x="180" y="45" text-anchor="middle">—</text></g>
            <g class="f49-zk" data-b="cbf"><rect x="108" y="80" width="144" height="42" rx="9"/><text class="f49-t" data-t="cbf" x="180" y="106" text-anchor="middle">CBF</text></g>
            <g class="f49-zk" data-b="icp"><rect x="14" y="160" width="140" height="42" rx="9"/><text class="f49-t" x="84" y="186" text-anchor="middle">ICP ↑</text></g>
            <g class="f49-zk" data-b="isk"><rect x="200" y="160" width="140" height="42" rx="9"/><text class="f49-t" x="270" y="186" text-anchor="middle">İskemi</text></g>
            <g class="f49-zk" data-b="h"><rect x="74" y="240" width="196" height="44" rx="9"/><text class="f49-t" x="172" y="267" text-anchor="middle">Sekonder beyin hasarı</text></g>
          </svg>
          <p class="f49-yol" data-o="yol"></p><p class="f49-yol-r" data-o="roz"></p>
          <svg class="f49-svg f49-mini" viewBox="0 0 360 132" role="img" aria-label="CBF–PaCO₂ doğrusu (Bölüm 48), imleç anlık PaCO₂ değerinde">
            ${tx(48, 12, 'CBF (mL/100 g/dk)', 'f49-ts')}${tx(344, 98, 'PaCO₂ (kPa) →', 'f49-ts', 'end')}
            <rect class="f49-band" data-p="cb" y="18" height="88"/>
            <line class="f49-eks" x1="48" x2="48" y1="18" y2="106"/><line class="f49-eks" x1="48" x2="344" y1="106" y2="106"/>
            <path class="f49-mini-c" data-p="cl"/><line class="f49-esik" data-p="c50" x1="48" x2="344"/>
            <g data-p="ctk"></g><circle class="f49-imlec" data-p="cim" r="5.5"/>
          </svg>
          <p class="f49-ven">Venöz drenaj: 30° baş yukarı · nötr baş · gevşek ETT bağları · en düşük PEEP</p>
        </div></div>`;
    /* iç grafik: Bölüm 48 modeli (≤ 3,5 kPa → 25; 3,5–8 doğrusal 25→90; ≥ 8 → 90) */
    const cbfC = (p) => (p <= 3.5 ? 25 : p >= 8 ? 90 : 25 + (p - 3.5) * (65 / 4.5));
    const MX = (p) => 48 + ((p - 3) / 5) * 296, MY = (c) => 106 - (c / 100) * 88;
    const mini = el.querySelector('.f49-mini');
    mini.querySelector('[data-p="cl"]').setAttribute('d', Array.from({ length: 51 }, (_, i) => { const p = 3 + i * 0.1; return (i ? 'L' : 'M') + MX(p).toFixed(1) + ' ' + MY(cbfC(p)).toFixed(1); }).join(' '));
    const cb = mini.querySelector('[data-p="cb"]'); cb.setAttribute('x', MX(4.5)); cb.setAttribute('width', MX(5) - MX(4.5));
    const c50 = mini.querySelector('[data-p="c50"]'); c50.setAttribute('y1', MY(50)); c50.setAttribute('y2', MY(50));
    mini.querySelector('[data-p="ctk"]').innerHTML = [3, 4, 4.5, 5, 6, 7, 8].map((p) => tx(MX(p).toFixed(1), 120, fmt(p, p % 1 ? 1 : 0), 'f49-ts', 'middle')).join('') + tx(44, MY(50) + 4, '50', 'f49-ts', 'end') + tx(MX(4.75).toFixed(1), 30, 'hedef', 'f49-ts f49-c-ok', 'middle');
    const zonCiz = (s) => {
      const B = BOL()[s.k], z = el.querySelector(`[data-zb="${s.k}"]`);
      let a = s.min;
      z.innerHTML = B.map((b) => { const e = Math.min(s.max, b[0]); const w = Math.max(0, e - a) / (s.max - s.min) * 100, l = (a - s.min) / (s.max - s.min) * 100; a = Math.max(a, e); return w > 0 ? `<i class="f49-z-${b[1]}" style="left:${l}%;width:${w}%"></i>` : ''; }).join('');
    };
    const yaz = () => {
      const aktif = [];
      SL.forEach((s) => {
        const b = bolge(s.k);
        el.querySelector(`[data-v="${s.k}"]`).textContent = fv(s);
        const t = el.querySelector(`[data-z="${s.k}"]`); t.className = 'tag ' + b[1]; t.textContent = b[2];
        if (b[1] !== 'ok') aktif.push(s.k + ':' + b[2]);
      });
      const cpp = val.map - ICPV, cp = el.querySelector('[data-o="cpp"]');
      cp.style.display = mon ? '' : 'none';
      cp.innerHTML = `ICP ${ICPV} mmHg (temsilî) → CPP = MAP − ${ICPV} = <b class="${cpp < 50 ? 'f49-c-crit' : cpp < 60 ? 'f49-c-warn' : 'f49-c-ok'}">${cpp} mmHg</b>${cpp < 50 ? ' · otoregülasyon çöker' : ''}`;
      // zincir
      const z = el.querySelector('.f49-zincir'), lit = {}, kutu = {};
      let up = false, dn = false;
      aktif.forEach((a) => { const Y = YOL[a]; if (!Y) return; const cl = bolge(a.split(':')[0])[1]; Y.y.forEach((y) => { if (lit[y] !== 'crit') lit[y] = cl; }); if (Y.cbf === '↑') up = true; if (Y.cbf === '↓') dn = true; });
      const ka = (b, on, c) => { if (on) kutu[b] = kutu[b] === 'crit' ? 'crit' : c; };
      Object.entries(lit).forEach(([y, c]) => { ka('e', true, c); if (y === 'ec') ka('cbf', true, c); if (y === 'ci') ka('icp', true, c); if (y === 'cs') ka('isk', true, c); if (y === 'ih' || y === 'sh' || y === 'eh') ka('h', true, c); });
      z.querySelectorAll('[data-y]').forEach((g) => g.setAttribute('class', 'f49-ok f49-zo ' + (lit[g.dataset.y] ? 'on f49-zo-' + lit[g.dataset.y] : '')));
      z.querySelectorAll('[data-b]').forEach((g) => g.setAttribute('class', 'f49-zk ' + (kutu[g.dataset.b] ? 'on f49-zk-' + kutu[g.dataset.b] : '')));
      z.querySelector('[data-t="e"]').textContent = aktif.length ? aktif.map((a) => (YOL[a] ? YOL[a].e : '')).join(' · ') : '—';
      z.querySelector('[data-t="cbf"]').textContent = 'CBF' + (up && dn ? ' ↑ / ↓' : up ? ' ↑' : dn ? ' ↓' : '');
      z.classList.toggle('f49-soluk', !aktif.length);
      el.querySelector('.f49-hepsi').style.display = aktif.length ? 'none' : '';
      // seçilen yol: son değişen hedef dışıysa o, değilse ilk hedef dışı
      const sKey = son && aktif.find((a) => a.startsWith(son + ':')) ? aktif.find((a) => a.startsWith(son + ':')) : aktif[0];
      const Y = sKey && YOL[sKey];
      el.querySelector('[data-o="yol"]').textContent = Y ? Y.m : '';
      el.querySelector('[data-o="roz"]').textContent = Y ? Y.r : '';
      let h = CAP.ok;
      if (sKey) h = sKey.startsWith('map:CPP') ? CAP.cpp(cpp) : CAP[sKey];
      capYaz(el, h);
      // iç grafik imleci
      const p = clamp(val.co2, 3, 8), im = mini.querySelector('[data-p="cim"]');
      im.setAttribute('cx', MX(p).toFixed(1)); im.setAttribute('cy', MY(cbfC(p)).toFixed(1));
      im.classList.toggle('f49-imlec-c', bolge('co2')[1] !== 'ok');
    };
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r]'); if (!r) return; val[r.dataset.r] = +r.value; son = r.dataset.r; yaz(); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-mon]'); if (!b) return; mon = b.dataset.mon === '1'; basSec(el, 'mon', b.dataset.mon); zonCiz(SL[1]); son = 'map'; yaz(); });
    const dar = darIzle(el, (d) => el.classList.toggle('f49-dar', d));
    SL.forEach(zonCiz); yaz();
    return () => { dar(); };
  };
})();
