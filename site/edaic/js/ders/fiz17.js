/* Fizyoloji Bölüm 17 · Oksijen sunumu ve gereksinimi · bileşenler.
   Modeller eğitim amaçlı ve şematiktir: denklemler ve örnek değerler K1 s. 74–76'dan, ara sayılar kitabın
   denklemleriyle yapılmış atlas hesaplarıdır. Tarif: docs/tasarim/fiz17.md */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',');
  const fmtY = (v) => fmt(v, Math.abs(v - Math.round(v)) > 1e-6 ? 1 : 0);
  const on10 = (v) => Math.round(v / 10) * 10;

  /* ortak model sabitleri · K1 s. 74–75 */
  const HUF = 1.34, COZ = 0.023, PAO2 = 13, SAO2 = 98, OERMAX = 0.7, VO2N = 250;
  const bagliO2 = (hb, sa = SAO2) => (HUF * hb * sa) / 100;
  const caO2 = (hb, sa = SAO2) => bagliO2(hb, sa) + COZ * PAO2;
  const svO2 = (oer) => Math.round(SAO2 * (1 - oer));
  const DO = 'ḊO₂', VO = 'V̇O₂';
  const ESIK = 660; // bileşen bu genişliğin altında dar yerleşime geçer (SVG yazıları ekranda ≥ 11 px kalsın)

  /* ---------- yardımcılar ---------- */
  const duyarli = (el, kur) => {
    let dar = null;
    const bak = () => { const w = el.clientWidth; const d = w > 0 && w < ESIK; if (d !== dar) { dar = d; kur(d); } };
    bak();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const capci = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    let son = '';
    return (h) => { if (cap && h !== son) { cap.innerHTML = REF(h); son = h; } };
  };
  const yaz = (n, s) => { if (n && n._t !== s) { n.textContent = s; n._t = s; } };
  const yazH = (n, s) => { if (n && n._h !== s) { n.innerHTML = s; n._h = s; } };
  const at = (n, k, v) => { if (n) n.setAttribute(k, typeof v === 'number' ? String(+v.toFixed(2)) : v); };
  const topla = (kok, ad) => { const o = {}; kok.querySelectorAll(`[${ad}]`).forEach((n) => { o[n.getAttribute(ad)] = n; }); return o; };
  const rng = (k, ad, min, max, step, val, aria) => `<label class="f17-rng"><span>${ad}<b data-o="v${k}"></b></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-s="${k}" aria-label="${aria}"></label>`;
  const okuH = (list) => `<dl class="f17-oku">${list.map(([k, dt]) => `<div data-ok="${k}"><dt>${dt}</dt><dd data-o="${k}"></dd></div>`).join('')}</dl>`;
  const segH = (ad, key, list) => `<div class="seg" role="group" aria-label="${ad}">${list.map(([v, t]) => `<button type="button" data-${key}="${v}" aria-pressed="false">${t}</button>`).join('')}</div>`;
  const bas = (kok, key, v) => kok.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute(`data-${key}`) === v)));
  const svgNokta = (svg, ev) => {
    const m = svg.getScreenCTM(); if (!m) return { x: 0, y: 0 };
    const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY;
    const r = p.matrixTransform(m.inverse()); return { x: r.x, y: r.y };
  };

  /* =====================================================================
     1 · oksijen akısı: ḊO₂ = CO × CaO₂ × 10; anemi ve kompansasyon
     ===================================================================== */
  VIZ.f17_aki = (el) => {
    const cap = capci(el);
    const DO2N = 5 * caO2(15) * 10;              // 999,85 ≈ 1000 mL/dk
    const CO3 = 1000 / (caO2(8) * 10);           // 9,2553 L/dk: ḊO₂ 1000'de kalsın (atlas hesabı)
    const ADIM = {
      1: { co: 5, hb: 15, sa: 98, c: `<b>Normal.</b> CO 5 L/dk, [Hb] 15 g/dL, SaO₂ %98, PaO₂ 13 kPa: CaO₂ ≈ 20,0 mL/100 mL, ${DO} = 5 × 20,0 × 10 ≈ 1000 mL/dk. Her nokta hemoglobine bağlı oksijeni, akış hızı kalp debisini gösterir. [[K1 s. 74]]` },
      2: { co: 5, hb: 8, sa: 98, c: `<b>Anemi, CO değişmezse.</b> [Hb] 8 g/dL: CaO₂ ≈ 10,8 mL/100 mL, ${DO} ≈ 540 mL/dk; sunum normalin neredeyse yarısına iner. ${VO} 250 mL/dk sürerse dokuların ekstraksiyonu 0,46'ya çıkmak zorundadır. [[K1 s. 75]]` },
      3: { co: CO3, hb: 8, sa: 98, c: `<b>Hesabın kusuru: kompansasyon.</b> Anemik hastanın kalp debisi 5 L/dk'da kalmaz; ${DO}'yi korumak için artar ve bunda anemik kanın düşük viskozitesi de rol oynar. ${DO}'nin 1000 mL/dk'da kalması için CO ≈ 9,3 L/dk olmalıdır (atlas hesabı). [[K1 s. 75]]` },
    };
    const NMAX = 64;
    const PX = Array.from({ length: NMAX }, (_, i) => ((i + 0.5) * 0.6180339887) % 1);
    const PY = Array.from({ length: NMAX }, (_, i) => { const h = Math.sin((i + 1) * 12.9898) * 43758.5453; return h - Math.floor(h); });
    const GEN = { dar: false, nb: 48, xa: 116, xb: 572, ya: 105, yh: 42, r: 4, pc: [66, 125], bx: 120, bw: 584 };
    const DAR = { dar: true, nb: 24, xa: 48, xb: 286, ya: 110, yh: 34, r: 3.6, pc: [48, 45] };
    let co = 5, hb = 15, sa = 98, adim = '1', tw = null, off = 0, faz = 0, G = GEN;

    el.innerHTML = `<div class="f17-aki">
      <div class="f17-ctl">${segH('Adım', 'adim', [['1', '1 · Normal'], ['2', '2 · Anemi'], ['3', '3 · Kompansasyon'], ['s', 'Serbest']])}</div>
      <div class="f17-sahne" data-o="sahne"></div>
      <p class="f17-denk" data-o="denk"></p>
      <div class="f17-alt">
        <div class="f17-rngs">
          ${rng('co', 'Kalp debisi (CO)', 2, 12, 0.1, 5, 'Kalp debisi, litre/dakika')}
          ${rng('hb', 'Hemoglobin [Hb]', 5, 18, 0.5, 15, 'Hemoglobin konsantrasyonu, g/dL')}
          ${rng('sa', 'SaO₂', 80, 100, 1, 98, 'Arteriyel oksijen satürasyonu, yüzde')}
        </div>
        <div>
          ${okuH([['ca', 'CaO₂'], ['do2', DO], ['oran', 'Normale göre'], ['oer', `OER (${VO} 250 iken)`]])}
          <div class="f17-hbar" aria-hidden="true"><span class="f17-hbar-ad">${DO} · 0–2000 mL/dk</span><span class="f17-hbar-r"><i data-o="hbar"></i><u></u></span><span class="f17-hbar-n">normal 1000</span></div>
        </div>
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s');
    const noktaH = (g) => Array.from({ length: NMAX }, (_, i) => `<circle class="f17-aki-o2" r="${g.r}" cx="-20" cy="${(g.ya + PY[i] * g.yh).toFixed(1)}" opacity="0"/>`).join('');
    const svgGen = () => `<svg class="f17-svg" viewBox="0 52 720 210" role="img" aria-label="Oksijen akısı şeması: kalp debisi pompası, hemoglobine bağlı oksijeni taşıyan damar, dokulara dakikada ulaşan oksijen ve ${DO} çubuğu">
        <path class="f17-aki-dis" d="M66 125 H637" stroke-width="62"/>
        <path class="f17-aki-ic" d="M66 125 H637" stroke-width="58"/>
        <rect class="f17-aki-coz" x="116" y="97.5" width="456" height="3"/>
        <text class="f17-sm f17-c-mavi" x="562" y="87" text-anchor="end">çözünmüş 0,30</text>
        <g>${noktaH(GEN)}</g>
        <g data-t="pompa"><rect class="f17-aki-pompa" x="16" y="70" width="100" height="110" rx="22"/>
          <text class="f17-sm" x="66" y="102" text-anchor="middle">Kalp debisi</text>
          <text class="f17-val" x="66" y="137" text-anchor="middle" data-t="co"></text>
          <text class="f17-sm" x="66" y="158" text-anchor="middle">L/dk</text></g>
        <rect class="f17-aki-doku" x="570" y="60" width="134" height="130" rx="14"/>
        <text class="f17-lb" x="637" y="86" text-anchor="middle">Dokular</text>
        <text class="f17-big" x="637" y="138" text-anchor="middle" data-t="do2"></text>
        <text class="f17-sm" x="637" y="162" text-anchor="middle">mL O₂/dk</text>
        <text class="f17-lb2" x="343" y="182" text-anchor="middle"><tspan data-t="ca"></tspan><tspan class="f17-sm" dx="10" data-t="cab"></tspan></text>
        <text class="f17-lb" x="110" y="229" text-anchor="end">${DO}</text>
        <rect class="f17-aki-bar0" x="120" y="212" width="584" height="24" rx="6"/>
        <rect class="f17-aki-bar" data-t="bar" x="120" y="212" width="0" height="24" rx="6"/>
        <line class="f17-aki-norm" x1="412" x2="412" y1="206" y2="242"/>
        <text class="f17-sm" x="412" y="201" text-anchor="middle">normal 1000</text>
        <text class="f17-tk" x="120" y="256">0</text>
        <text class="f17-tk" x="704" y="256" text-anchor="end">2000 mL/dk</text>
      </svg>`;
    const svgDar = () => `<svg class="f17-svg" viewBox="0 0 360 300" role="img" aria-label="Oksijen akısı şeması: kalp debisi pompası, hemoglobine bağlı oksijeni taşıyan damar ve dokulara dakikada ulaşan oksijen">
        <path class="f17-aki-dis" d="M48 80 V125 H286 V200" stroke-width="52"/>
        <path class="f17-aki-ic" d="M48 80 V125 H286 V200" stroke-width="48"/>
        <rect class="f17-aki-coz" x="74" y="102.5" width="186" height="3"/>
        <text class="f17-sm f17-c-mavi" x="258" y="93" text-anchor="end">çözünmüş 0,30</text>
        <g>${noktaH(DAR)}</g>
        <g data-t="pompa"><rect class="f17-aki-pompa" x="8" y="8" width="80" height="74" rx="16"/>
          <text class="f17-sm" x="48" y="28" text-anchor="middle">Kalp debisi</text>
          <text class="f17-val" x="48" y="54" text-anchor="middle" data-t="co"></text>
          <text class="f17-sm" x="48" y="73" text-anchor="middle">L/dk</text></g>
        <rect class="f17-aki-doku" x="220" y="196" width="132" height="94" rx="14"/>
        <text class="f17-lb" x="286" y="218" text-anchor="middle">Dokular</text>
        <text class="f17-big" x="286" y="253" text-anchor="middle" data-t="do2"></text>
        <text class="f17-sm" x="286" y="276" text-anchor="middle">mL O₂/dk</text>
        <text class="f17-lb2" x="8" y="176" data-t="ca"></text>
        <text class="f17-sm" x="8" y="194" data-t="cab"></text>
        <circle class="f17-aki-o2" cx="14" cy="232" r="4"/><text class="f17-sm" x="24" y="236">Hb'ye bağlı O₂</text>
        <rect class="f17-aki-coz" x="8" y="256" width="13" height="3"/><text class="f17-sm" x="24" y="262">çözünmüş O₂</text>
      </svg>`;
    const noktalar = () => {
      const N = Math.min(NMAX, Math.round((G.nb * bagliO2(hb, sa)) / 19.7)), L = G.xb - G.xa;
      for (let i = 0; i < NMAX; i++) {
        const c = G.dots[i];
        if (i >= N) { if (c._v !== 0) { c.setAttribute('opacity', '0'); c._v = 0; } continue; }
        const s = (PX[i] * L + off) % L;
        c.setAttribute('cx', (G.xa + s).toFixed(1));
        c.setAttribute('opacity', Math.max(0, Math.min(1, s / 16, (L - s) / 28)).toFixed(2));
        c._v = 1;
      }
    };
    const esitle = () => { IN.co.value = co; IN.hb.value = hb; IN.sa.value = sa; };
    const ciz = () => {
      const b = bagliO2(hb, sa), ca = b + COZ * PAO2, dv = co * ca * 10, d = Math.round(dv);
      const oer = VO2N / dv, oerR = Math.round(oer * 100) / 100, oran = Math.round((dv / DO2N) * 100);
      const T = G.T;
      yaz(T.co, fmt(co, 1)); yaz(T.do2, String(d));
      if (G.dar) { yaz(T.ca, `CaO₂ ${fmt(ca, 1)} mL/100 mL`); yaz(T.cab, `bağlı ${fmt(b, 2)} + çözünmüş 0,30`); }
      else {
        yaz(T.ca, `CaO₂ = ${fmt(ca, 1)} mL/100 mL`); yaz(T.cab, `(Hb'ye bağlı ${fmt(b, 2)} + çözünmüş 0,30)`);
        at(T.bar, 'width', clamp(dv / 2000, 0, 1) * G.bw); T.bar.classList.toggle('dus', dv < 700);
      }
      O.hbar.style.width = (clamp(dv / 2000, 0, 1) * 100).toFixed(1) + '%'; O.hbar.classList.toggle('dus', dv < 700);
      yaz(O.vco, `${fmt(co, 1)} L/dk`); yaz(O.vhb, `${fmtY(hb)} g/dL`); yaz(O.vsa, `%${Math.round(sa)}`);
      yaz(O.ca, `${fmt(ca, 1)} mL/100 mL`); yaz(O.do2, `${d} mL/dk`); yaz(O.oran, `%${oran}`);
      yazH(O.oer, fmt(oer, 2) + (oerR > OERMAX ? '<small>ekstraksiyon sınırı (model)</small>' : ''));
      O.oer.classList.toggle('f17-uyar', oerR > 0.3 && oerR <= OERMAX); O.oer.classList.toggle('f17-krit', oerR > OERMAX);
      yaz(O.denk, `${DO} = ${fmt(co, 1)} × ${fmt(ca, 1)} × 10 = ${d} mL/dk`);
      if (ADIM[adim]) cap(ADIM[adim].c);
      else {
        let c = `${DO} = ${fmt(co, 1)} × ${fmt(ca, 1)} × 10 = ${d} mL/dk (normale göre %${oran}). [[K1 s. 74]]`;
        if (hb < 11 && co < 7) c += ' Anemi: içerik Hb ile neredeyse orantılı düşer; kalp debisi artmazsa sunum da düşer. [[K1 s. 75]]';
        else if (hb < 11) c += ' Artan kalp debisi düşük içeriği kısmen ya da tamamen karşılıyor: anemideki kompansasyon budur. [[K1 s. 75]]';
        else if (co < 4) c += ' Kalp debisi düşük: içerik normal olsa da sunum azalır; dokular ekstraksiyonu artırmak zorundadır. [[K1 s. 75]]';
        else c += ' Üç etkenden (CO, [Hb], SaO₂) hangisi düşerse ḊO₂ neredeyse aynı oranda düşer; çözünmüş terim çok küçüktür. [[K1 s. 74]]';
        cap(c);
      }
      noktalar();
    };
    const kur = (dar) => {
      kok.classList.toggle('f17-dar', dar);
      G = Object.assign({}, dar ? DAR : GEN);
      O.sahne.innerHTML = dar ? svgDar() : svgGen();
      G.T = topla(O.sahne, 'data-t');
      G.dots = [...O.sahne.querySelectorAll('g > .f17-aki-o2')];
      off %= G.xb - G.xa;
      ciz();
    };
    const git = (k) => {
      adim = k; bas(kok, 'adim', k);
      if (k === 's') { tw = null; ciz(); return; }
      const h = ADIM[k];
      if (k === '3') co = 5;                    // kompansasyon 5 L/dk'dan başlar
      if (RM) { co = h.co; hb = h.hb; sa = h.sa; tw = null; }
      else tw = { a: { co, hb, sa }, b: h, t: 0, dur: k === '3' ? 2 : 1 };
      esitle(); ciz();
    };
    kok.addEventListener('click', (e) => { const b = e.target.closest('[data-adim]'); if (b) git(b.dataset.adim); });
    kok.addEventListener('input', (e) => {
      const s = e.target.closest('[data-s]'); if (!s) return;
      tw = null; const v = +s.value;
      if (s.dataset.s === 'co') co = v; else if (s.dataset.s === 'hb') hb = v; else sa = v;
      if (adim !== 's') { adim = 's'; bas(kok, 'adim', 's'); }
      ciz();
    });
    bas(kok, 'adim', '1'); esitle();
    const durRO = duyarli(el, kur);
    const durT = ticker(el, (dt) => {
      if (tw) {
        tw.t += dt;
        const f = ease(clamp(tw.t / tw.dur, 0, 1));
        co = lerp(tw.a.co, tw.b.co, f); hb = lerp(tw.a.hb, tw.b.hb, f); sa = lerp(tw.a.sa, tw.b.sa, f);
        if (tw.t >= tw.dur) { co = tw.b.co; hb = tw.b.hb; sa = tw.b.sa; tw = null; }
        esitle(); ciz();
      }
      if (RM || !dt) return;
      off = (off + 14 * co * dt) % (G.xb - G.xa);
      faz = (faz + dt / 0.9) % 1;
      const s = 1 + 0.04 * (0.5 - 0.5 * Math.cos(2 * Math.PI * faz)), [cx, cy] = G.pc;
      at(G.T.pompa, 'transform', `translate(${cx} ${cy}) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`);
      noktalar();
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     2 · doku yatağında ekstraksiyon: gelen = tüketilen + dönen; OER, SvO₂
     ===================================================================== */
  VIZ.f17_oer = (el) => {
    const cap = capci(el);
    const SEC = {
      ist: { d: 1000, v: 250, c: `<b>İstirahat.</b> ${DO} 1000 mL/dk, ${VO} 250 mL/dk: OER 0,25. Sunulan oksijenin dörtte üçü venöz kanla akciğerlere döner; SvO₂ ≈ %74. Kitaba göre normal OER 0,2–0,3, buna karşılık gelen miks venöz satürasyon %70–80'dir. [[K1 s. 75]]` },
      hipo: { d: 600, v: 250, c: `<b>${DO} düştü, ${VO} aynı.</b> Örnekte kalp debisi 3 L/dk'ya inmiş, ${DO} 600 mL/dk. Aerobik metabolizmayı sürdürmek için dokular geçen kandan daha fazla oksijen çeker: OER ≈ 0,42; venöz kan daha desatüre döner (SvO₂ ≈ %57). [[K1 s. 75]]` },
      egz: { d: 1000, v: 400, c: `<b>${VO} arttı, ${DO} aynı.</b> Örnekte tüketim 400 mL/dk. Dokular ekstraksiyonu artırır: OER 0,40, SvO₂ ≈ %59. [[K1 s. 75]]` },
      kalp: { f: 0.6, c: `<b>Kalp: OER yaklaşık 0,6.</b> Miyokard istirahatte bile kendisine sunulan oksijenin büyük bölümünü çeker; ekstraksiyonu artırma payı az kaldığı için koroner perfüzyon basıncı düşünce iskemiye çok duyarlıdır. [[K1 s. 75]]` },
      karo: { f: 0.05, c: `<b>Karotis cisimciği: OER düşük.</b> Aldığı oksijen tükettiğine göre çok fazladır; içinden geçen kanın bileşimi pek değişmez. Bu, kan bileşimindeki değişiklikleri algılama görevini yansıtır. [[K1 s. 75]]` },
    };
    const GEN = { dar: false, k: 0.12, ref: 120, g: [350, 166, 54] };
    const DAR = { dar: true, k: 0.1, ref: 100, g: [180, 198, 44] };
    let mod = 'ist', d = 1000, v = 250, G = GEN, cur = null, tw = null;
    el.innerHTML = `<div class="f17-oer">
      <div class="f17-ctl">${segH('Durum', 'sec', [['ist', 'İstirahat'], ['hipo', 'Hipotansiyon'], ['egz', 'Egzersiz · sepsis'], ['kalp', 'Kalp'], ['karo', 'Karotis cisimciği']])}</div>
      <div class="f17-oer-k"><p class="f17-rozet" data-o="rozet">Ekstraksiyon sınırı: ${VO} sunuma bağımlı (bkz. sonraki grafik)</p>
      <div class="f17-sahne" data-o="sahne"></div></div>
      <div class="f17-alt">
        <div class="f17-rngs">
          ${rng('d', `${DO} (sunum)`, 400, 1500, 10, 1000, 'Oksijen sunumu, mL/dakika')}
          ${rng('v', `${VO} (tüketim)`, 150, 450, 5, 250, 'Oksijen tüketimi, mL/dakika')}
        </div>
        ${okuH([['do2', DO], ['vo2', VO], ['don', 'Dönen O₂'], ['oer', 'OER'], ['sv', 'SvO₂ ≈']])}
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s');
    const yay = (cx, cy, r, u0, u1) => {
      const p = (u) => [cx + r * Math.cos(Math.PI * (1 - u)), cy - r * Math.sin(Math.PI * (1 - u))];
      const [x0, y0] = p(u0), [x1, y1] = p(u1);
      return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    };
    const kadran = (g, dar) => {
      const [cx, cy, r] = g, p = (u, rr) => [cx + rr * Math.cos(Math.PI * (1 - u)), cy - rr * Math.sin(Math.PI * (1 - u))];
      const [nx, ny] = p(0.25, r + 15), [kx, ky] = p(0.6, r + 14), [a1, b1] = p(0.6, r - 7), [a2, b2] = p(0.6, r + 6);
      return `<path class="f17-oer-yay0" d="${yay(cx, cy, r, 0, 1)}"/>
        <path class="f17-oer-yayn" d="${yay(cx, cy, r, 0.2, 0.3)}"/>
        <line class="f17-oer-cent" x1="${a1.toFixed(1)}" y1="${b1.toFixed(1)}" x2="${a2.toFixed(1)}" y2="${b2.toFixed(1)}"/>
        <text class="f17-sm f17-c-yes" x="${nx.toFixed(1)}" y="${(ny + 2).toFixed(1)}" text-anchor="middle">normal</text>
        <text class="f17-sm" x="${kx.toFixed(1)}" y="${(ky + 2).toFixed(1)}" text-anchor="start">kalp</text>
        ${dar ? '' : `<text class="f17-tk" x="${cx - r}" y="${cy + 17}" text-anchor="middle">0</text><text class="f17-tk" x="${cx + r}" y="${cy + 17}" text-anchor="middle">1</text>`}
        <line data-t="ibre" class="f17-oer-ibre" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r + 8}"/>
        <circle class="f17-oer-gobek" cx="${cx}" cy="${cy}" r="5"/>`;
    };
    const svgGen = () => `<svg class="f17-svg" viewBox="0 0 720 300" role="img" aria-label="Doku yatağında oksijen akımı: arteriyel giriş, dokuda tüketilen bölüm ve venöz kanla akciğerlere dönen bölüm; ortada oksijen ekstraksiyon oranı göstergesi">
        <rect data-t="in" class="f17-oer-in" x="20" width="246"/>
        <rect data-t="out" class="f17-oer-out" x="434" width="266"/>
        <rect data-t="tk" class="f17-oer-tk" y="216" height="64"/>
        <polygon data-t="tkok" class="f17-oer-tk"/>
        <rect data-t="kutu" class="f17-oer-kutu" x="260" y="34" width="180" height="188" rx="14"/>
        <text class="f17-lb" x="350" y="60" text-anchor="middle">Doku</text>
        ${kadran(GEN.g, false)}
        <text data-t="oer" class="f17-oer-deg" x="350" y="204" text-anchor="middle"></text>
        <text data-t="inL" class="f17-lb2" x="20"></text>
        <text data-t="outL1" class="f17-lb2" x="448">Venöz kanla akciğerlere dönen</text>
        <text data-t="outL2" class="f17-lb2 f17-mn" x="448"></text>
        <text data-t="akc" class="f17-sm" x="700" text-anchor="end">→ akciğerler</text>
        <text data-t="tkL" class="f17-lb2" y="266"></text>
      </svg>`;
    const svgDar = () => `<svg class="f17-svg" viewBox="0 0 360 384" role="img" aria-label="Doku yatağında oksijen akımı: yukarıdan gelen arteriyel kan, sağa ayrılan tüketim ve aşağı akciğerlere dönen venöz kan; ortada oksijen ekstraksiyon oranı göstergesi">
        <rect data-t="in" class="f17-oer-in" y="0" height="114"/>
        <rect data-t="tk" class="f17-oer-tk" x="286" width="54"/>
        <polygon data-t="tkok" class="f17-oer-tk"/>
        <rect data-t="out" class="f17-oer-out" y="236" height="128"/>
        <polygon data-t="outok" class="f17-oer-out"/>
        <rect data-t="kutu" class="f17-oer-kutu" x="70" y="110" width="220" height="130" rx="14"/>
        <text class="f17-lb" x="82" y="132">Doku</text>
        ${kadran(DAR.g, true)}
        <text data-t="oer" class="f17-oer-deg" x="180" y="230" text-anchor="middle"></text>
        <text class="f17-lb2" text-anchor="end"><tspan data-t="inL1">Arteriyel kan</tspan><tspan data-t="inL2"></tspan><tspan data-t="inL3"></tspan></text>
        <text class="f17-lb2" text-anchor="middle"><tspan data-t="tkL1"></tspan><tspan data-t="tkL2"></tspan></text>
        <text class="f17-lb2"><tspan data-t="outL1">Akciğerlere</tspan><tspan data-t="outL2">dönen</tspan><tspan data-t="outL3" class="f17-mn"></tspan></text>
      </svg>`;
    const hedef = () => {
      const s = SEC[mod];
      if (s && s.f) return { a: G.ref, b: G.ref * s.f, c: G.ref * (1 - s.f), g: s.f };
      const vv = Math.min(v, OERMAX * d);
      return { a: G.k * d, b: G.k * vv, c: G.k * (d - vv), g: vv / d };
    };
    const etiket = () => {
      const s = SEC[mod], T = G.T;
      if (s && s.f) {
        const kalp = mod === 'kalp';
        const sun = kalp ? 'sunum %100' : 'sunum yüksek', tuk = kalp ? 'tüketim %60' : 'tüketim düşük', don = kalp ? 'dönen %40' : 'dönen: büyük bölümü';
        if (G.dar) {
          yaz(T.inL2, 'sunum'); yaz(T.inL3, kalp ? '%100' : 'yüksek');
          yaz(T.tkL1, 'tüketim'); yaz(T.tkL2, kalp ? '%60' : 'düşük');
          yaz(T.outL3, kalp ? '%40' : 'büyük bölümü');
        } else {
          yaz(T.inL, `Arteriyel kan · ${sun}`); yaz(T.tkL, `Tüketilen · ${tuk}`); yaz(T.outL2, don);
        }
        yaz(T.oer, kalp ? 'OER ≈ 0,6' : 'düşük (kitapta sayı yok)');
        T.oer.classList.toggle('kucuk', !kalp);
        return;
      }
      const vv = Math.min(v, OERMAX * d), g = vv / d;
      if (G.dar) {
        yaz(T.inL2, `${DO} ${d}`); yaz(T.inL3, 'mL/dk');
        yaz(T.tkL1, 'Tüketilen'); yaz(T.tkL2, `${Math.round(vv)} mL/dk`);
        yaz(T.outL3, `${Math.round(d - vv)} mL/dk`);
      } else {
        yaz(T.inL, `Arteriyel kan · ${DO} ${d} mL/dk`); yaz(T.tkL, `Tüketilen · ${VO} ${Math.round(vv)} mL/dk`); yaz(T.outL2, `${Math.round(d - vv)} mL/dk`);
      }
      yaz(T.oer, `OER ${fmt(g, 2)}`); T.oer.classList.remove('kucuk');
    };
    const sahneCiz = (p) => {
      const T = G.T, [cx, cy, r] = G.g, a = Math.max(2, p.a), b = Math.max(2, p.b), c = Math.max(2, p.c);
      if (!G.dar) {
        const top = 128 - a / 2;
        at(T.in, 'y', top); at(T.in, 'height', a);
        at(T.out, 'y', top); at(T.out, 'height', c);
        at(T.tk, 'x', 350 - b / 2); at(T.tk, 'width', b);
        at(T.tkok, 'points', `${(350 - b / 2 - 6).toFixed(1)},280 ${(350 + b / 2 + 6).toFixed(1)},280 350,294`);
        at(T.inL, 'y', top - 9); at(T.outL1, 'y', top - 27); at(T.outL2, 'y', top - 9);
        at(T.akc, 'y', top + c + 17); at(T.tkL, 'x', 350 + b / 2 + 14);
      } else {
        const xc = 180;
        at(T.in, 'x', xc - a / 2); at(T.in, 'width', a);
        at(T.tk, 'y', 190 - b / 2); at(T.tk, 'height', b);
        at(T.tkok, 'points', `340,${(190 - b / 2 - 6).toFixed(1)} 340,${(190 + b / 2 + 6).toFixed(1)} 353,190`);
        at(T.out, 'x', xc - c / 2); at(T.out, 'width', c);
        at(T.outok, 'points', `${(xc - c / 2 - 6).toFixed(1)},364 ${(xc + c / 2 + 6).toFixed(1)},364 ${xc},378`);
        const xi = xc - a / 2 - 8;
        [['inL1', 40], ['inL2', 57], ['inL3', 74]].forEach(([k, y]) => { at(T[k], 'x', xi); at(T[k], 'y', y); });
        [['tkL1', 190 + b / 2 + 19], ['tkL2', 190 + b / 2 + 36]].forEach(([k, y]) => { at(T[k], 'x', 321); at(T[k], 'y', y); });
        const xo = xc + c / 2 + 10;
        [['outL1', 286], ['outL2', 303], ['outL3', 320]].forEach(([k, y]) => { at(T[k], 'x', xo); at(T[k], 'y', y); });
      }
      const th = Math.PI * (1 - clamp(p.g, 0, 1));
      at(T.ibre, 'x2', cx + (r - 8) * Math.cos(th)); at(T.ibre, 'y2', cy - (r - 8) * Math.sin(th));
    };
    const ciz = () => {
      const s = SEC[mod], organ = !!(s && s.f);
      const vv = Math.min(v, OERMAX * d), lim = !organ && v / d > OERMAX + 1e-9, g = vv / d;
      etiket();
      G.T.kutu.classList.toggle('lim', lim);
      O.rozet.classList.toggle('on', lim);
      IN.d.disabled = organ; IN.v.disabled = organ;
      yaz(O.vd, `${d} mL/dk`); yaz(O.vv, `${v} mL/dk`);
      if (organ) {
        const kalp = mod === 'kalp';
        yaz(O.do2, kalp ? '— (%100)' : '— (yüksek)'); yazH(O.vo2, kalp ? '— (%60)' : '— (düşük)');
        yaz(O.don, kalp ? '— (%40)' : '— (büyük bölümü)'); yaz(O.oer, kalp ? '≈ 0,6' : 'düşük');
        yazH(O.sv, kalp ? '≈ %39<small>koroner venöz, yaklaştırma</small>' : '—');
      } else {
        yaz(O.do2, `${d} mL/dk`);
        yazH(O.vo2, `${Math.round(vv)} mL/dk` + (lim ? `<small>istenen ${v}</small>` : ''));
        yaz(O.don, `${Math.round(d - vv)} mL/dk`); yaz(O.oer, fmt(g, 2)); yazH(O.sv, `%${svO2(g)}`);
      }
      const gr = Math.round(g * 100) / 100;
      O.oer.classList.toggle('f17-uyar', !organ && gr > 0.3 && !lim); O.oer.classList.toggle('f17-krit', lim || mod === 'kalp');
      if (s) cap(s.c);
      else {
        let c = `${DO} ${d} mL/dk, ${VO} ${Math.round(vv)} mL/dk: OER ${fmt(g, 2)}, SvO₂ ≈ %${svO2(g)}. `;
        if (lim) c += 'Model sınırı (OER 0,7) aşıldı: tüketim artık sunuma bağlı; bkz. bir sonraki grafik. [[K1 s. 75]]';
        else if (gr < 0.2) c += 'OER normal aralığın (0,2–0,3) altında: sunum tüketime göre bol. [[K1 s. 75]]';
        else if (gr <= 0.3) c += 'Normal aralıkta (0,2–0,3). [[K1 s. 75]]';
        else c += 'Dokular ekstraksiyonu artırarak aerobik metabolizmayı sürdürüyor. [[K1 s. 75]]';
        cap(c);
      }
    };
    const kur = (dar) => {
      kok.classList.toggle('f17-dar', dar);
      G = Object.assign({}, dar ? DAR : GEN);
      O.sahne.innerHTML = dar ? svgDar() : svgGen();
      G.T = topla(O.sahne, 'data-t');
      tw = null; cur = hedef(); sahneCiz(cur); ciz();
    };
    const sec = (k) => {
      mod = k; bas(kok, 'sec', k);
      const s = SEC[k];
      if (s && !s.f) { d = s.d; v = s.v; IN.d.value = d; IN.v.value = v; }
      const h = hedef();
      if (RM) { cur = h; sahneCiz(cur); } else tw = { a: Object.assign({}, cur), b: h, t: 0 };
      ciz();
    };
    kok.addEventListener('click', (e) => { const b = e.target.closest('[data-sec]'); if (b) sec(b.dataset.sec); });
    kok.addEventListener('input', (e) => {
      const s = e.target.closest('[data-s]'); if (!s) return;
      if (s.dataset.s === 'd') d = +s.value; else v = +s.value;
      if (mod) { mod = null; bas(kok, 'sec', ''); }
      tw = null; cur = hedef(); sahneCiz(cur); ciz();
    });
    bas(kok, 'sec', 'ist');
    const durRO = duyarli(el, kur);
    const durT = ticker(el, (dt) => {
      if (!tw) return;
      tw.t += dt;
      const f = ease(clamp(tw.t / 0.6, 0, 1));
      cur = { a: lerp(tw.a.a, tw.b.a, f), b: lerp(tw.a.b, tw.b.b, f), c: lerp(tw.a.c, tw.b.c, f), g: lerp(tw.a.g, tw.b.g, f) };
      sahneCiz(cur);
      if (f >= 1) tw = null;
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     3 · V̇O₂–ḊO₂ ilişkisi: plato, kritik ḊO₂, sunuma bağımlılık; kritik hastalık
     Model: V̇O₂ = en küçük(G, k × ḊO₂); kırılma = G / k (şematik)
     ===================================================================== */
  VIZ.f17_kritik = (el) => {
    const cap = capci(el);
    const HAZ = { ger: { G: 350, k: 0.7 }, eks: { G: 250, k: 0.35 }, iki: { G: 350, k: 0.35 } };
    const GEO = {
      gen: { dar: false, vb: '0 0 680 380', x0: 70, x1: 650, y0: 310, y1: 30, xt: [0, 200, 400, 600, 800, 1000, 1200], yt: [0, 100, 200, 300, 400], xAd: `Oksijen sunumu, ${DO} (mL/dk)`, yAd: `Oksijen tüketimi, ${VO} (mL/dk)`, axy: 364, ayx: 22, lbA: 'sunuma bağımlı · anaerobik', lbB: 'sunumdan bağımsız', minB: 118, isin: 'eğim = OER ', ekst: 'en yüksek OER (şematik)', uzun: 190 },
      dar: { dar: true, vb: '0 0 360 300', x0: 46, x1: 346, y0: 240, y1: 22, xt: [0, 400, 800, 1200], yt: [0, 100, 250, 400], xAd: `${DO} (mL/dk)`, yAd: `${VO} (mL/dk)`, axy: 288, ayx: 12, lbA: 'bağımlı', lbB: 'bağımsız', minB: 64, isin: 'eğim = OER', ekst: 'en yüksek OER', uzun: 120 },
    };
    let mod = 'n', d = 1000, Gk = 250, kk = 0.35, haz = 'eks', oyn = false, sur = false, G = GEO.gen, sonAnah = '';
    const par = () => (mod === 'n' ? { g: VO2N, k: OERMAX } : { g: Gk, k: kk });
    const vo2 = (dd, p) => Math.min(p.g, p.k * dd);
    const OYNA = `Oynat: ${DO}'yi azalt`;
    el.innerHTML = `<div class="f17-kr">
      <div class="f17-ctl">${segH('Durum', 'mod', [['n', 'Normal'], ['k', 'Kritik hastalık']])}<button type="button" class="btn" data-a="oyna">${OYNA}</button></div>
      <div class="f17-kh" data-o="kh" hidden>
        ${segH('Kritik hastalıkta olasılık', 'haz', [['ger', 'Gereksinim artmış'], ['eks', 'Ekstraksiyon azalmış'], ['iki', 'İkisi birlikte']])}
        <p class="small muted f17-kh-not">Bu bulgunun yorumu tartışmalıdır; sayfadaki Atlas notuna bakın.</p>
      </div>
      <div class="f17-sahne" data-o="sahne"></div>
      <div class="f17-alt">
        <div class="f17-rngs">
          ${rng('d', `${DO} (sunum)`, 0, 1200, 10, 1000, 'Oksijen sunumu, mL/dakika')}
          <span class="f17-kh2" data-o="kh2" hidden>${rng('g', `${VO} gereksinimi`, 250, 400, 10, 250, 'Oksijen tüketimi gereksinimi, mL/dakika')}${rng('k', 'En yüksek OER', 0.3, 0.7, 0.05, 0.35, 'En yüksek oksijen ekstraksiyon oranı')}</span>
        </div>
        ${okuH([['do2', DO], ['vo2', VO], ['oer', 'OER'], ['sv', 'SvO₂ ≈'], ['met', 'Metabolizma'], ['kr', `Kritik ${DO} ≈`]])}
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s'), oynB = kok.querySelector('[data-a="oyna"]');
    const krKutu = kok.querySelector('[data-ok="kr"]');
    const X = (v) => G.x0 + (clamp(v, 0, 1200) / 1200) * (G.x1 - G.x0);
    const Y = (v) => G.y0 - (v / 450) * (G.y0 - G.y1);
    const svgH = () => {
      const g = G, tk = g.xt.map((t, i) => `<line class="f17-ax" x1="${X(t)}" x2="${X(t)}" y1="${g.y0}" y2="${g.y0 + 5}"/><text class="f17-tk" x="${X(t)}" y="${g.y0 + 19}" text-anchor="${i === g.xt.length - 1 && g.dar ? 'end' : 'middle'}">${t}</text>`).join('')
        + g.yt.map((t) => `<line class="f17-ax" x1="${g.x0 - 5}" x2="${g.x0}" y1="${Y(t)}" y2="${Y(t)}"/><text class="f17-tk${t === 250 ? ' f17-kalin' : ''}" x="${g.x0 - 8}" y="${Y(t) + 4}" text-anchor="end">${t}</text>`).join('')
        + (g.yt.includes(250) ? '' : `<text class="f17-tk f17-kalin" x="${g.x0 - 8}" y="${Y(250) + 4}" text-anchor="end">250</text>`);
      return `<svg class="f17-svg" viewBox="${g.vb}" role="img" aria-label="Oksijen tüketiminin oksijen sunumuna göre grafiği: kritik ${DO} değerinin sağında sunumdan bağımsız plato, solunda sunuma bağımlı bölge">
        <rect data-t="bolA" class="f17-kr-bA" y="${g.y1}" height="${g.y0 - g.y1}"/>
        <rect data-t="bolB" class="f17-kr-bB" y="${g.y1}" height="${g.y0 - g.y1}"/>
        <text data-t="lbA" class="f17-sm f17-c-kir" x="${g.x0 + 8}" y="${g.y1 + 18}">${g.lbA}</text>
        <text data-t="lbB" class="f17-sm f17-c-yes" x="${g.x1 - 6}" y="${g.y0 - 10}" text-anchor="end">${g.lbB}</text>
        <line class="f17-kr-250" x1="${g.x0}" x2="${g.x1}" y1="${Y(250)}" y2="${Y(250)}"/>
        <line class="f17-ax" x1="${g.x0}" x2="${g.x1}" y1="${g.y0}" y2="${g.y0}"/>
        <line class="f17-ax" x1="${g.x0}" x2="${g.x0}" y1="${g.y1}" y2="${g.y0}"/>
        ${tk}
        <text class="f17-lb2" x="${(g.x0 + g.x1) / 2}" y="${g.axy}" text-anchor="middle">${g.xAd}</text>
        <text class="f17-lb2" transform="rotate(-90)" x="${-(g.y0 + g.y1) / 2}" y="${g.ayx}" text-anchor="middle">${g.yAd}</text>
        <line data-t="ekst" class="f17-kr-ekst"/>
        <text data-t="ekstL" class="f17-sm"></text>
        <path data-t="norm" class="f17-kr-norm"/>
        <text data-t="normL" class="f17-sm" x="${g.x1 - 4}" y="${Y(250) - 8}" text-anchor="end">normal</text>
        <path data-t="kh" class="f17-kr-kh"/>
        <line data-t="kir" class="f17-kr-kir" y1="${g.y1}" y2="${g.y0}"/>
        <text data-t="kirL" class="f17-sm f17-c-kir" text-anchor="middle"><tspan data-t="kirL1">kritik ${DO}</tspan>${g.dar ? '' : '<tspan data-t="kirL2">= anaerobik eşik</tspan>'}</text>
        <line data-t="isin" class="f17-kr-isin" x1="${g.x0}" y1="${g.y0}"/>
        <text data-t="isinL" class="f17-sm f17-c-mavi f17-kalin"></text>
        <g data-t="nok"><circle class="f17-kr-hit" r="18"/><circle class="f17-kr-n" r="7"/></g>
      </svg>`;
    };
    const capYaz = (zorla) => {
      const p = par(), c = p.g / p.k, vv = vo2(d, p), dr = Math.round(d), oer = d > 0 ? vv / d : 0;
      let z;
      if (mod === 'n') z = d <= 0 ? 'yok' : d >= 900 ? 'ist' : Math.abs(d - c) <= 15 ? 'kr' : d > c ? 'bag' : 'dep';
      else z = c > 1200 ? 'disi' : d >= c ? 'kar' : 'dep';
      const anah = mod + z + (oyn ? '' : `${dr}|${p.g}|${p.k}`);
      if (!zorla && oyn && anah === sonAnah) return;
      sonAnah = anah;
      let t;
      const sy = (s) => (oyn ? '' : s);           // oynatırken sayılar donmasın: açıklama yalnız bölge değişince yazılır
      if (mod === 'n') {
        t = {
          ist: `<b>İstirahat bölgesi.</b> ${sy(`${DO} ${dr} mL/dk, ${VO} 250 mL/dk; OER ${fmt(oer, 2)}. `)}Sunum gereksinimin çok üzerinde: orijinden çalışma noktasına çizilen doğrunun eğimi OER'dir. [[K1 s. 75]]`,
          bag: `<b>Sunumdan bağımsız.</b> ${DO} ${oyn ? 'azalıyor' : `${dr} mL/dk'ya indi`} ama ${VO} 250 mL/dk'da kalıyor: dokular geçen kandan daha fazla oksijen çekiyor, eğim (OER) ${oyn ? 'dikleşiyor' : `${fmt(oer, 2)} değerine dikleşti`}. [[K1 s. 75]]`,
          kr: `<b>Kritik ${DO} (anaerobik eşik).</b> Ekstraksiyon en yüksek düzeyinde (modelde 0,70). Sunumdaki her yeni düşüş artık tüketimi de düşürecek. [[K1 s. 75]]`,
          dep: `<b>Sunuma bağımlı.</b> ${VO} ${DO} ile birlikte hızla düşüyor${sy(` (${Math.round(vv)} mL/dk)`)}; dokular enerjilerini anaerobik yollarla elde etmek zorunda. [[K1 s. 75]]`,
          yok: '<b>Sunum yok.</b> Aerobik tüketim de yok. [[K1 s. 75]]',
        }[z];
      } else {
        t = `<b>Kritik hastalık (ağır sepsis, ARDS).</b> ${VO} çok daha yüksek bir ${DO}'de sunuma bağımlı olur; kitaba göre normal bifazik ilişki artık görülmez, bu şematik model ise yalnız kırılmanın ≈ ${on10(c)} mL/dk'ya kaymasını gösterir. Kitaba göre nedeni açık değildir: kritik ${DO} mi yükselmiştir, yoksa dokuların oksijen çekme yeteneği mi azalmıştır? Burada birincisini artmış gereksinim, ikincisini düşük en yüksek OER temsil ediyor. [[K1 s. 75–76]] `
          + (z === 'disi' ? 'Kırılma eksenin dışında: bu aralıkta plato hiç görülmüyor.' : z === 'kar' ? 'Bu sunumda tüketim karşılanıyor.' : `Bu sunumda tüketim sunuma bağlı${sy(` (${Math.round(vv)} / ${p.g} mL/dk)`)}.`);
      }
      cap(t);
    };
    const ciz = () => {
      const T = G.T, p = par(), c = p.g / p.k, vv = vo2(d, p), oer = d > 0 ? vv / d : 0, ic = c <= 1200;
      const xc = X(Math.min(c, 1200));
      at(T.bolA, 'x', G.x0); at(T.bolA, 'width', xc - G.x0);
      at(T.bolB, 'x', xc); at(T.bolB, 'width', Math.max(0, G.x1 - xc));
      const gB = G.x1 - xc;
      T.lbB.style.display = ic && gB >= G.minB * 0.62 ? '' : 'none';
      yaz(T.lbB, gB >= G.minB ? G.lbB : 'bağımsız');
      /* en yüksek ekstraksiyon doğrusu */
      const ex = Math.min(450 / p.k, 1200), ey = p.k * ex;
      at(T.ekst, 'x1', G.x0); at(T.ekst, 'y1', G.y0); at(T.ekst, 'x2', X(ex)); at(T.ekst, 'y2', Y(ey));
      {
        /* etiket doğrunun ucunda, doğruya paralel ve hemen üstünde */
        const ax = X(ex), ay = Y(ey), ux = (ax - G.x0) / Math.hypot(ax - G.x0, ay - G.y0), uy = (ay - G.y0) / Math.hypot(ax - G.x0, ay - G.y0);
        const tx = ax - ux * 6 + uy * 7, ty = ay - uy * 6 - ux * 7;
        at(T.ekstL, 'x', tx); at(T.ekstL, 'y', ty); at(T.ekstL, 'text-anchor', 'end');
        at(T.ekstL, 'transform', `rotate(${((Math.atan2(uy, ux) * 180) / Math.PI).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)})`);
      }
      yaz(T.ekstL, mod === 'k' ? 'en yüksek OER' : G.ekst);
      T.ekstL.style.display = G.dar && ex >= 1200 ? 'none' : '';
      /* eğriler */
      const egri = (g, k) => (g / k <= 1200 ? `M${X(0)} ${Y(0)} L${X(g / k).toFixed(1)} ${Y(g).toFixed(1)} L${X(1200)} ${Y(g).toFixed(1)}` : `M${X(0)} ${Y(0)} L${X(1200)} ${Y(k * 1200).toFixed(1)}`);
      at(T.norm, 'd', egri(VO2N, OERMAX));
      T.norm.classList.toggle('soluk', mod === 'k');
      T.normL.style.display = mod === 'k' ? '' : 'none';
      T.kh.style.display = mod === 'k' ? '' : 'none';
      if (mod === 'k') at(T.kh, 'd', egri(p.g, p.k));
      /* kırılma */
      T.kir.style.display = ic ? '' : 'none'; T.kirL.style.display = ic ? '' : 'none';
      at(T.kir, 'x1', xc); at(T.kir, 'x2', xc);
      const lx = clamp(xc, G.dar ? 80 : 110, G.dar ? 300 : 600);
      at(T.kirL1, 'x', lx); at(T.kirL1, 'y', G.dar ? 15 : 11);
      if (T.kirL2) { at(T.kirL2, 'x', lx); at(T.kirL2, 'y', 25); }
      /* çalışma noktası ve OER ışını */
      const px = X(d), py = Y(vv);
      at(T.nok, 'transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`);
      at(T.isin, 'x2', px); at(T.isin, 'y2', py);
      const dx = px - G.x0, dy = py - G.y0, len = Math.hypot(dx, dy);
      T.isin.style.display = d > 0 ? '' : 'none'; T.isinL.style.display = d > 0 ? '' : 'none';
      if (d > 0) {
        const ang = (Math.atan2(dy, dx) * 180) / Math.PI, nx = dy / len, ny = -dx / len;
        let lx2, ly2, an;
        if (len > G.uzun) { const f = 0.55; lx2 = G.x0 + dx * f + nx * 9; ly2 = G.y0 + dy * f + ny * 9; an = 'middle'; }
        else { lx2 = px + (dx / len) * 14 + nx * 10; ly2 = py + (dy / len) * 14 + ny * 10; an = 'start'; }
        at(T.isinL, 'x', lx2); at(T.isinL, 'y', ly2); at(T.isinL, 'text-anchor', an);
        at(T.isinL, 'transform', `rotate(${ang.toFixed(1)} ${lx2.toFixed(1)} ${ly2.toFixed(1)})`);
        yaz(T.isinL, G.dar ? G.isin : G.isin + fmt(oer, 2));
      }
      /* okuma */
      const dep = d < c - 1e-9;
      yaz(O.vd, `${Math.round(d)} mL/dk`); yaz(O.vg, `${Gk} mL/dk`); yaz(O.vk, fmt(kk, 2));
      yaz(O.do2, `${Math.round(d)} mL/dk`); yaz(O.vo2, `${Math.round(vv)} mL/dk`);
      yaz(O.oer, d > 0 ? fmt(oer, 2) : '—'); yaz(O.sv, d > 0 ? `%${svO2(oer)}` : '—');
      yaz(O.met, dep ? 'anaerobik katkı' : 'aerobik');
      O.met.classList.toggle('f17-krit', dep); O.met.classList.toggle('f17-iyi', !dep);
      krKutu.hidden = mod !== 'k';
      yaz(O.kr, ic ? `${on10(c)} mL/dk` : '> 1200 (eksen dışı)');
      capYaz(false);
    };
    const kur = (dar) => {
      kok.classList.toggle('f17-dar', dar);
      G = dar ? GEO.dar : GEO.gen;
      O.sahne.innerHTML = svgH();
      G.T = topla(O.sahne, 'data-t');
      const svg = O.sahne.querySelector('svg');
      const xd = (ev) => { const q = svgNokta(svg, ev); return clamp(Math.round((((q.x - G.x0) / (G.x1 - G.x0)) * 1200) / 10) * 10, 0, 1200); };
      svg.addEventListener('pointerdown', (ev) => {
        const q = svgNokta(svg, ev);
        if (q.x < G.x0 - 12 || q.x > G.x1 + 12 || q.y < G.y1 - 12 || q.y > G.y0 + 12) return;
        sur = true; durdur(); d = xd(ev); IN.d.value = d;
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* yok */ }
        ciz();
      });
      svg.addEventListener('pointermove', (ev) => { if (!sur) return; d = xd(ev); IN.d.value = d; ciz(); });
      const bit = () => { sur = false; };
      svg.addEventListener('pointerup', bit); svg.addEventListener('pointercancel', bit);
      sonAnah = ''; ciz();
    };
    const durdur = () => { if (!oyn) return; oyn = false; oynB.textContent = OYNA; d = on10(d); IN.d.value = d; capYaz(true); };
    const modSec = (m) => {
      durdur(); mod = m; bas(kok, 'mod', m);
      O.kh.hidden = m !== 'k'; O.kh2.hidden = m !== 'k';
      if (m === 'k') { haz = 'eks'; Gk = HAZ.eks.G; kk = HAZ.eks.k; d = 600; IN.d.value = d; IN.g.value = Gk; IN.k.value = kk; bas(kok, 'haz', 'eks'); }
      ciz();
    };
    kok.addEventListener('click', (e) => {
      const m = e.target.closest('[data-mod]'); if (m) { modSec(m.dataset.mod); return; }
      const h = e.target.closest('[data-haz]');
      if (h) { durdur(); haz = h.dataset.haz; Gk = HAZ[haz].G; kk = HAZ[haz].k; IN.g.value = Gk; IN.k.value = kk; bas(kok, 'haz', haz); ciz(); return; }
      if (e.target.closest('[data-a="oyna"]')) {
        if (oyn) { durdur(); return; }
        if (RM) { d = 300; IN.d.value = d; ciz(); return; }
        d = 1000; oyn = true; oynB.textContent = 'Durdur'; ciz();
      }
    });
    kok.addEventListener('input', (e) => {
      const s = e.target.closest('[data-s]'); if (!s) return;
      durdur();
      if (s.dataset.s === 'd') d = +s.value;
      else { if (s.dataset.s === 'g') Gk = +s.value; else kk = Math.round(+s.value * 100) / 100; haz = ''; bas(kok, 'haz', ''); }
      ciz();
    });
    bas(kok, 'mod', 'n');
    const durRO = duyarli(el, kur);
    const durT = ticker(el, (dt) => {
      if (!oyn || !dt) return;
      d = Math.max(100, d - (900 / 8) * dt);
      IN.d.value = on10(d);
      ciz();
      if (d <= 100) { d = 100; durdur(); ciz(); }
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     4 · perioperatif V̇O₂ zaman çizelgesi ve kardiyopulmoner rezerv
     ===================================================================== */
  VIZ.f17_periop = (el) => {
    const cap = capci(el);
    const CAP = {
      1: `<b>Ameliyat öncesi.</b> İstirahat ${VO} 250 mL/dk, ${DO} 1000 mL/dk, OER 0,25. [[K1 s. 74–75]]`,
      2: `<b>Ameliyat: ${VO}'yi artıranlar.</b> Cerrahinin kendisi, ağrı ve anksiyete, inflamasyon, sepsis ve ateş perioperatif ${VO}'yi 250 mL/dk'lık istirahat değerinin üzerine çıkarır. [[K1 s. 75]]`,
      3: `<b>Genel anestezi artışın bir bölümünü dengeler.</b> Sedatif ve hipnotikler istirahat ${VO}'sinin önemli bir bileşeni olan serebral metabolizma hızını azaltır; mekanik ventilasyon ve kas paralizisi solunum işini ortadan kaldırır; preoperatif açlık bağırsakların O₂ tüketimini azaltır. [[K1 s. 76]]`,
      4: `<b>Ameliyat sonrası.</b> Postoperatif titreme ${VO}'yi artırır. Majör cerrahiden sonraki inflamatuvar yanıt istirahat ${VO}'sini %50 artırır (250 → 375 mL/dk) ve bu artış günlerce sürer. [[K1 s. 75–76]]`,
    };
    const UP = [['Cerrahi', 2], ['Ağrı ve anksiyete', 2], ['İnflamasyon, sepsis, ateş', 2]];
    const DN = [['Sedatif/hipnotik: serebral metabolizma ↓', 3], ['Ventilasyon + paralizi: solunum işi yok', 3], ['Açlık: bağırsak O₂ tüketimi ↓', 3]];
    const VO2S = 375, DO2S = VO2S / 0.25;          // 375 ÷ 0,25 = 1500 mL/dk
    let adim = RM ? 5 : 1, oyn = false, acc = 0, hb = 15, mco = 8, dar = false;
    el.innerHTML = `<div class="f17-po">
      <div class="f17-ctl">${segH('Adım', 'adim', [['1', '1 · Öncesi'], ['2', '2 · Artıranlar'], ['3', '3 · Anestezi'], ['4', '4 · Sonrası'], ['5', '5 · Rezerv']])}<button type="button" class="btn ghost" data-a="oyna">Oynat</button></div>
      <div class="f17-sahne" data-o="sahne"></div>
      <div class="f17-po-liste">
        <div><h4 data-g="2" class="f17-po-yuk">↑ Artıranlar</h4><ul>${UP.map(([t, g]) => `<li data-g="${g}">${t}</li>`).join('')}<li data-g="4">Postoperatif titreme</li></ul></div>
        <div><h4 data-g="3" class="f17-po-dus">↓ Genel anestezide dengeleyenler</h4><ul>${DN.map(([t, g]) => `<li data-g="${g}">${t}</li>`).join('')}</ul></div>
      </div>
      <div class="f17-rez" data-o="rez" hidden>
        <div class="f17-rez-sol">
          ${rng('hb', 'Hemoglobin [Hb]', 7, 16, 0.5, 15, 'Hemoglobin konsantrasyonu, g/dL')}
          ${rng('mco', 'Hastanın ulaşabildiği en yüksek kalp debisi', 4, 14, 0.5, 8, 'Ulaşılabilen en yüksek kalp debisi, litre/dakika')}
          <div class="f17-hesap"><div data-o="h1"></div><div data-o="h2"></div><div data-o="h3"></div></div>
        </div>
        <div class="f17-rez-sag">
          <div class="f17-cub"><div class="f17-cub-u"><span>Gereken CO</span><b data-o="gco"></b></div><div class="f17-cub-r"><i class="ger" data-o="gcoB"></i></div></div>
          <div class="f17-cub"><div class="f17-cub-u"><span>Ulaşılabilen en yüksek CO</span><b data-o="mcoT"></b></div><div class="f17-cub-r"><i data-o="mcoB"></i></div></div>
          <div class="f17-cub-tk" aria-hidden="true">${[0, 4, 8, 12, 16].map((t) => `<em style="left:${(t / 16) * 100}%">${t}${t === 16 ? ' L/dk' : ''}</em>`).join('')}</div>
          <p class="f17-karar" data-o="karar"></p>
        </div>
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), oynB = kok.querySelector('[data-a="oyna"]');
    const cip = (t, cx, y, yon, g) => `<g class="f17-cip ${yon}" data-g="${g}" data-cx="${cx}"><rect x="${cx - (t.length * 3.3 + 18)}" y="${y}" width="${t.length * 6.6 + 36}" height="23" rx="11.5"/><text x="${cx}" y="${y + 16}" text-anchor="middle"><tspan class="f17-cip-ok">${yon === 'up' ? '↑' : '↓'}</tspan> ${t}</text></g>`;
    const dalga = (x0, x1, y, A, n) => { let s = `M${x0} ${y}`; for (let x = x0 + 4; x <= x1; x += 4) s += ` L${x} ${(y + A * Math.sin(((x - x0) / (x1 - x0)) * Math.PI * 2 * n)).toFixed(1)}`; return s; };
    const svgGen = () => {
      const B = [60, 180, 470, 690], Yv = (v) => 190 - (v - 250) * 0.64, y25 = Yv(250), y37 = Yv(375);
      const ad = ['Ameliyat öncesi', 'Ameliyat · genel anestezi', 'Ameliyat sonrası'];
      return `<svg class="f17-svg" viewBox="0 0 700 300" role="img" aria-label="Perioperatif ${VO} zaman çizelgesi: ameliyat öncesi istirahat 250 mL/dk, ameliyat sırasında artıran ve azaltan etkenler, ameliyat sonrası 375 mL/dk">
        <defs><marker id="f17-po-ok" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="f17-po-okb"/></marker></defs>
        ${[0, 1, 2].map((i) => `<rect class="f17-po-bant" data-faz="${i}" x="${B[i] + 1.5}" y="34" width="${B[i + 1] - B[i] - 3}" height="262" rx="8"/><text class="f17-lb" x="${(B[i] + B[i + 1]) / 2}" y="24" text-anchor="middle">${ad[i]}</text>`).join('')}
        <line class="f17-ax" x1="60" x2="60" y1="40" y2="292"/>
        <line class="f17-ax" x1="54" x2="60" y1="${y25}" y2="${y25}"/><text class="f17-tk f17-kalin" x="51" y="${y25 + 4}" text-anchor="end">250</text>
        <text class="f17-lb2" transform="rotate(-90)" x="-165" y="22" text-anchor="middle">${VO} (mL/dk)</text>
        <line class="f17-po-250" x1="60" x2="690" y1="${y25}" y2="${y25}"/>
        <text class="f17-sm" x="120" y="${y25 - 10}" text-anchor="middle">istirahat 250</text>
        <path class="f17-po-cizgi" d="M60 ${y25} H180"/>
        <g data-g="2"><path class="f17-po-nok" d="${dalga(180, 470, y25, 6, 3)}"/>
          <text class="f17-sm" x="325" y="${y25 - 22}" text-anchor="middle">büyüklük kitapta yok · yalnız yön</text>
          ${UP.map(([t], i) => cip(t, 325, 48 + i * 30, 'up', 2)).join('')}</g>
        <g data-g="3">${DN.map(([t], i) => cip(t, 325, 206 + i * 30, 'dn', 3)).join('')}</g>
        <g data-g="4">
          <line class="f17-ax" x1="54" x2="60" y1="${y37}" y2="${y37}"/><text class="f17-tk f17-kalin" x="51" y="${y37 + 4}" text-anchor="end">375</text>
          <path class="f17-po-nok" d="M470 ${y25} L488 ${y25 - 66} L504 ${y25 - 12}"/>
          <line class="f17-po-kilavuz" x1="498" y1="74" x2="490" y2="${y25 - 72}"/>
          ${cip('Postoperatif titreme', 560, 48, 'up', 4)}
          <path class="f17-po-cizgi" d="M504 ${y25 - 12} C520 ${y25 - 40} 528 ${y37 + 2} 550 ${y37} H672" marker-end="url(#f17-po-ok)"/>
          <text class="f17-lb2 f17-c-ac f17-kalin" x="612" y="${y37 - 12}" text-anchor="middle">+%50 → 375 mL/dk</text>
          <text class="f17-sm" x="686" y="${y37 + 24}" text-anchor="end">günlerce</text></g>
      </svg>`;
    };
    const svgDar = () => {
      const B = [46, 100, 236, 352], Yv = (v) => 160 - (v - 250) * 0.56, y25 = Yv(250), y37 = Yv(375);
      const ad = ['Öncesi', 'Ameliyat', 'Sonrası'];
      return `<svg class="f17-svg" viewBox="0 0 360 262" role="img" aria-label="Perioperatif ${VO} zaman çizelgesi: ameliyat öncesi 250 mL/dk, ameliyat sırasında yalnız yön, ameliyat sonrası 375 mL/dk">
        <defs><marker id="f17-po-ok" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="f17-po-okb"/></marker></defs>
        ${[0, 1, 2].map((i) => `<rect class="f17-po-bant" data-faz="${i}" x="${B[i] + 1.5}" y="34" width="${B[i + 1] - B[i] - 3}" height="222" rx="7"/><text class="f17-lb" x="${(B[i] + B[i + 1]) / 2}" y="24" text-anchor="middle">${ad[i]}</text>`).join('')}
        <line class="f17-ax" x1="46" x2="46" y1="40" y2="252"/>
        <line class="f17-ax" x1="41" x2="46" y1="${y25}" y2="${y25}"/><text class="f17-tk f17-kalin" x="39" y="${y25 + 4}" text-anchor="end">250</text>
        <text class="f17-lb2" transform="rotate(-90)" x="-145" y="12" text-anchor="middle">${VO} (mL/dk)</text>
        <line class="f17-po-250" x1="46" x2="352" y1="${y25}" y2="${y25}"/>
        <path class="f17-po-cizgi" d="M46 ${y25} H100"/>
        <g data-g="2"><path class="f17-po-nok" d="${dalga(100, 236, y25, 5, 2)}"/>
          <text class="f17-sm" x="168" y="${y25 - 34}" text-anchor="middle">büyüklük kitapta yok</text>
          <text class="f17-sm" x="168" y="${y25 - 17}" text-anchor="middle">yalnız yön</text></g>
        <g data-g="4">
          <line class="f17-ax" x1="41" x2="46" y1="${y37}" y2="${y37}"/><text class="f17-tk f17-kalin" x="39" y="${y37 + 4}" text-anchor="end">375</text>
          <path class="f17-po-nok" d="M236 ${y25} L248 ${y25 - 48} L260 ${y25 - 8}"/>
          <path class="f17-po-cizgi" d="M260 ${y25 - 8} C270 ${y25 - 34} 276 ${y37 + 2} 290 ${y37} H336" marker-end="url(#f17-po-ok)"/>
          <text class="f17-lb2 f17-c-ac f17-kalin" x="300" y="${y37 - 12}" text-anchor="middle">+%50 → 375</text>
          <text class="f17-sm" x="350" y="${y37 + 24}" text-anchor="end">günlerce</text></g>
      </svg>`;
    };
    const olc = () => O.sahne.querySelectorAll('.f17-cip').forEach((g) => {
      const t = g.querySelector('text'), r = g.querySelector('rect');
      let w = 0; try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      if (!w) return;
      const cx = +g.dataset.cx; at(r, 'x', cx - w / 2 - 10); at(r, 'width', w + 20);
    });
    const rezCiz = () => {
      const ca = caO2(hb), gco = DO2S / (ca * 10), yeter = mco >= gco - 1e-9;
      yaz(O.vhb, `${fmtY(hb)} g/dL`); yaz(O.vmco, `${fmtY(mco)} L/dk`);
      yaz(O.h1, `Gereken ${DO} = 375 ÷ 0,25 = 1500 mL/dk`);
      yaz(O.h2, `CaO₂ = ${fmt(ca, 1)} mL/100 mL`);
      yaz(O.h3, `Gereken CO = 1500 ÷ (${fmt(ca, 1)} × 10) = ${fmt(gco, 1)} L/dk`);
      yaz(O.gco, `${fmt(gco, 1)} L/dk`); yaz(O.mcoT, `${fmtY(mco)} L/dk`);
      O.gcoB.style.width = (clamp(gco / 16, 0, 1) * 100).toFixed(1) + '%';
      O.mcoB.style.width = (clamp(mco / 16, 0, 1) * 100).toFixed(1) + '%';
      O.mcoB.classList.toggle('iyi', yeter); O.mcoB.classList.toggle('kotu', !yeter);
      let k;
      if (yeter) k = `<b>Rezerv yeterli:</b> artış OER'yi yükseltmeden karşılanabilir.`;
      else {
        const ud = mco * ca * 10, oer = VO2S / ud;
        k = `<b>Rezerv yetersiz:</b> ulaşılabilen ${DO} ${Math.round(ud)} mL/dk; OER'nin ${fmt(oer, 2)} düzeyine çıkması gerekir.`;
        if (Math.round(oer * 100) / 100 > OERMAX) k += ` <b>Kritik ${DO}'nin altında:</b> ${VO} sunuma bağımlı (model).`;
        O.karar.classList.toggle('krit', oer > OERMAX);
      }
      yazH(O.karar, k);
      O.karar.classList.toggle('iyi', yeter); if (yeter) O.karar.classList.remove('krit');
      return gco;
    };
    const ciz = () => {
      bas(kok, 'adim', String(adim));
      kok.querySelectorAll('[data-g]').forEach((n) => n.classList.toggle('f17-gizli', +n.dataset.g > adim));
      const faz = adim === 1 ? 0 : adim <= 3 ? 1 : 2;
      O.sahne.querySelectorAll('.f17-po-bant').forEach((r) => r.classList.toggle('on', +r.dataset.faz === faz));
      O.rez.hidden = adim < 5;
      if (adim === 5) {
        const gco = rezCiz();
        cap(`<b>Rezerv yetecek mi?</b> OER istirahat düzeyinde (0,25) kalacaksa 375 mL/dk için ${DO} 1500 mL/dk olmalı; [Hb] ${fmtY(hb)} g/dL ile bu, ${fmt(gco, 1)} L/dk kalp debisi demek. Bu artışı karşılayacak kardiyopulmoner rezerv ameliyattan önce bilinmeli; kitaba göre rezervi en iyi değerlendirenin kardiyopulmoner egzersiz testi olduğu söylenebilir. [[K1 s. 76]]`);
      } else cap(CAP[adim]);
    };
    const kur = (d) => {
      dar = d; kok.classList.toggle('f17-dar', d);
      O.sahne.innerHTML = d ? svgDar() : svgGen();
      if (!d) { olc(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!dar && O.sahne.isConnected) olc(); }); }
      ciz();
    };
    const durdur = () => { oyn = false; acc = 0; oynB.textContent = 'Oynat'; };
    kok.addEventListener('click', (e) => {
      const b = e.target.closest('[data-adim]');
      if (b) { durdur(); adim = +b.dataset.adim; ciz(); return; }
      if (e.target.closest('[data-a="oyna"]')) {
        if (oyn) { durdur(); return; }
        if (RM) { adim = 5; ciz(); return; }
        if (adim >= 5) adim = 1;
        oyn = true; acc = 0; oynB.textContent = 'Duraklat'; ciz();
      }
    });
    kok.addEventListener('input', (e) => {
      const s = e.target.closest('[data-s]'); if (!s) return;
      if (s.dataset.s === 'hb') hb = +s.value; else mco = +s.value;
      ciz();
    });
    const durRO = duyarli(el, kur);
    const durT = ticker(el, (dt) => {
      if (!oyn || !dt) return;
      acc += dt;
      if (acc >= 4) { acc = 0; adim = Math.min(5, adim + 1); if (adim >= 5) durdur(); ciz(); }
    });
    return () => { durT(); durRO(); };
  };
  /* =====================================================================
     5 · bir dolaşım, iki denklem: oksijen akısı (ḊO₂) ve ters Fick (V̇O₂); ölçüm noktaları
     Değerler kitabın istirahat örneği [K1 s. 74]; CvO₂ ≈ 15 atlas hesabı: 20,0 − 250 ÷ (5 × 10)
     ===================================================================== */
  VIZ.f17_fick = (el) => {
    const cap = capci(el);
    const CA = fmt(caO2(15), 1);                 // "20,0"
    const CAP = {
      hep: `<b>Bir dolaşım, iki denklem.</b> Kırmızı kol dokulara getirileni (${DO}), doku kutusu alınanı (${VO}), mavi kol akciğerlere dönen miks venöz kanı gösterir; ölçüm noktaları işaretlidir. [[K1 s. 74]]`,
      sun: `<b>Sunum: ne getirildi?</b> Oksijen akısı denklemi kalp debisini yalnız arteriyel içerikle çarpar: 5 × ${CA} × 10 = 1000 mL/dk. 10, L/dk ile mL/100 mL arasındaki birim dönüştürme katsayısıdır. [[K1 s. 74]]`,
      tuk: `<b>Tüketim: ne alındı?</b> Ters Fick ilkesi akımı arteriyovenöz içerik farkıyla çarpar; dokuların arteriyel kandan “aldığı” oksijen ${VO}'dir: 5 × (${CA} − 15) × 10 = 250 mL/dk. [[K1 s. 74]]`,
      olc: `<b>Neyi, nereden ölçeriz?</b> CO ve CvO₂ pulmoner arter kateteriyle ölçülür, çünkü CvO₂ miks venöz kanda ölçülmelidir; CaO₂ periferik arteriyel kan gazından hesaplanır. [[K1 s. 74]]`,
    };
    /* vurguda açık kalan öğeler (akciğerler çerçevedir, hiç sönmez). CO iki denklemde de çarpan olduğu için kalp Tüketim'de de açık. */
    const UYE = {
      sun: ['a', 'h', 'la', 'A', 'dk', 'd1', 'n'],
      tuk: ['a', 'v', 'h', 'la', 'lv', 'B', 'dk', 'd1', 'd2', 'd3', 'd4', 'n'],
      olc: ['m1', 'm2', 'h', 'la', 'lv'],
    };
    let mod = 'hep', dar = null, faz = 0, akis = [];
    el.innerHTML = `<div class="f17-fk">
      <div class="f17-ctl">${segH('Vurgu', 'fv', [['hep', 'Hepsi'], ['sun', `Sunum (${DO})`], ['tuk', `Tüketim (${VO})`], ['olc', 'Ölçüm']])}</div>
      <div class="f17-sahne" data-o="sahne"></div>
      <div class="f17-fk-alt">
        <p class="f17-fk-denk"><span data-fk="A">${DO} = CO × CaO₂ × 10</span><span data-fk="B">${VO} = CO × (CaO₂ − CvO₂) × 10</span></p>
        <p class="f17-fk-not" data-fk="n">10 = birim katsayısı (CO L/dk, içerik mL/100 mL)</p>
        <ul class="f17-fk-liste">
          <li data-fk="m1"><span class="f17-fk-no">1</span><span><b>Pulmoner arter kateteri:</b> CO ve miks venöz CvO₂</span></li>
          <li data-fk="m2"><span class="f17-fk-no">2</span><span><b>Periferik arteriyel kan gazı:</b> CaO₂</span></li>
        </ul>
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o');
    const ARIA = `Dolaşım şeması: akciğerlerden kalp ve arteriyel kanla dokulara giden oksijen (${DO} 1000 mL/dk), dokuların aldığı oksijen (${VO} 250 mL/dk) ve miks venöz kanla akciğerlere dönüş; pulmoner arter kateteri ve periferik arteriyel kan gazı ölçüm noktaları.`;
    const okM = (id, cls) => `<marker id="${id}" viewBox="0 0 12 12" refX="1" refY="6" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto"><path class="${cls}" d="M0 0 L12 6 L0 12 z"/></marker>`;
    const kol = (k, d, ok) => `<g data-fk="${k}"><path class="f17-fk-kol ${k}" d="${d}" marker-end="url(#${ok})"/>${RM ? '' : `<path class="f17-fk-akis" d="${d}"/>`}</g>`;
    const isaret = (n, x, y) => `<circle cx="${x}" cy="${y}" r="10"/><text class="f17-fk-nos" x="${x}" y="${y + 4.5}" text-anchor="middle">${n}</text>`;
    const svgGen = () => `<svg class="f17-svg" viewBox="0 0 720 330" role="group" aria-label="${ARIA}">
        <defs>${okM('f17-fk-ok-a', 'f17-fk-okA')}${okM('f17-fk-ok-v', 'f17-fk-okV')}</defs>
        ${kol('a', 'M70 120 V96 Q70 84 82 84 H634 Q646 84 646 96', 'f17-fk-ok-a')}
        ${kol('v', 'M646 220 V244 Q646 256 634 256 H82 Q70 256 70 244 V224', 'f17-fk-ok-v')}
        <g><rect class="f17-fk-akc" x="16" y="120" width="108" height="90" rx="16"/>
          <text class="f17-fk-t14" x="70" y="170" text-anchor="middle">Akciğerler</text></g>
        <rect data-fk="dk" class="f17-fk-doku" x="582" y="110" width="128" height="110" rx="14"/>
        <text data-fk="d1" class="f17-fk-t14" x="646" y="136" text-anchor="middle">Dokular</text>
        <text data-fk="d2" data-sig="118" class="f17-fk-t15" x="646" y="166" text-anchor="middle">${VO} ≈ 250 mL/dk</text>
        <text data-fk="d3" class="f17-fk-ik" x="646" y="186" text-anchor="middle">alınan O₂</text>
        <text data-fk="d4" class="f17-fk-t12" x="646" y="206" text-anchor="middle">CaO₂ − CvO₂ ≈ 5</text>
        <g data-fk="h"><rect class="f17-fk-kalp" x="168" y="62" width="104" height="44" rx="12"/>
          <text class="f17-fk-ik" x="220" y="80" text-anchor="middle">Kalp</text>
          <text class="f17-fk-t15" x="220" y="99" text-anchor="middle">CO 5 L/dk</text></g>
        <text data-fk="la" data-sig="250" class="f17-fk-et a" x="400" y="72" text-anchor="middle">Arteriyel kan · CaO₂ ${CA} mL/100 mL</text>
        <text data-fk="lv" class="f17-fk-et v" x="400" y="280" text-anchor="middle">Miks venöz kan · CvO₂ ≈ 15 mL/100 mL</text>
        <g data-fk="A" data-fv="sun" class="f17-fk-A" role="button" tabindex="0" aria-label="Sunum denklemini vurgula">
          <rect x="136" y="112" width="440" height="40" rx="10"/>
          <text class="f17-fk-bas" x="150" y="128">Sunum · ${DO} (oksijen akısı denklemi)</text>
          <text class="f17-fk-mn" x="150" y="145">CO × CaO₂ × 10 = 5 × ${CA} × 10 = 1000 mL/dk</text></g>
        <g data-fk="B" data-fv="tuk" class="f17-fk-B" role="button" tabindex="0" aria-label="Tüketim denklemini vurgula">
          <rect x="136" y="164" width="440" height="54" rx="10"/>
          <text class="f17-fk-bas" x="150" y="180">Tüketim · ${VO} (ters Fick ilkesi)</text>
          <text class="f17-fk-mn" x="150" y="197">CO × (CaO₂ − CvO₂) × 10</text>
          <text class="f17-fk-mn" x="150" y="211">= 5 × (${CA} − 15) × 10 = 250 mL/dk</text></g>
        <text data-fk="n" class="f17-fk-ik" x="356" y="236" text-anchor="middle">10 = birim katsayısı: CO L/dk, içerik mL O₂/100 mL kan</text>
        <g data-fk="m1" data-fv="olc" class="f17-fk-olc" role="button" tabindex="0" aria-label="Ölçüm noktalarını vurgula: 1, pulmoner arter kateteri">
          ${isaret(1, 150, 256)}
          <text class="f17-fk-bas" x="136" y="304">1 · Pulmoner arter kateteri</text>
          <text class="f17-fk-ik" x="136" y="320">CO + miks venöz kan (CvO₂)</text></g>
        <g data-fk="m2" data-fv="olc" class="f17-fk-olc" role="button" tabindex="0" aria-label="Ölçüm noktalarını vurgula: 2, periferik arteriyel kan gazı">
          ${isaret(2, 548, 84)}
          <text class="f17-fk-bas" x="548" y="38" text-anchor="middle">2 · Periferik arteriyel kan gazı</text>
          <text class="f17-fk-ik" x="548" y="54" text-anchor="middle">CaO₂</text></g>
      </svg>`;
    const svgDar = () => `<svg class="f17-svg" viewBox="0 0 360 392" role="group" aria-label="${ARIA}">
        <defs>${okM('f17-fk-ok-a', 'f17-fk-okA')}${okM('f17-fk-ok-v', 'f17-fk-okV')}</defs>
        ${kol('a', 'M120 37 H60 Q48 37 48 49 V328 Q48 340 60 340 H95', 'f17-fk-ok-a')}
        ${kol('v', 'M250 340 H300 Q312 340 312 328 V49 Q312 37 300 37 H255', 'f17-fk-ok-v')}
        <g><rect class="f17-fk-akc" x="120" y="12" width="120" height="50" rx="14"/>
          <text class="f17-fk-t14" x="180" y="42" text-anchor="middle">Akciğerler</text></g>
        <rect data-fk="dk" class="f17-fk-doku" x="110" y="300" width="140" height="80" rx="14"/>
        <text data-fk="d1" class="f17-fk-t14" x="180" y="323" text-anchor="middle">Dokular</text>
        <text data-fk="d2" data-sig="128" class="f17-fk-t15" x="180" y="345" text-anchor="middle">${VO} ≈ 250 mL/dk</text>
        <text data-fk="d3" class="f17-fk-ik" x="180" y="366" text-anchor="middle">alınan O₂</text>
        <text data-fk="d4" data-sig="128" class="f17-fk-t12" x="180" y="366" text-anchor="middle">CaO₂ − CvO₂ ≈ 5</text>
        <g data-fk="h"><rect class="f17-fk-kalp" x="10" y="92" width="76" height="46" rx="10"/>
          <text class="f17-fk-ik" x="48" y="110" text-anchor="middle">Kalp</text>
          <text data-sig="68" class="f17-fk-t15" x="48" y="129" text-anchor="middle">CO 5 L/dk</text></g>
        <text data-fk="la" data-sig="200" class="f17-fk-et a" x="184" y="94" text-anchor="middle">Arteriyel · CaO₂ ${CA}</text>
        <g data-fk="A" data-fv="sun" class="f17-fk-A" role="button" tabindex="0" aria-label="Sunum denklemini vurgula">
          <rect x="94" y="106" width="182" height="50" rx="10"/>
          <text class="f17-fk-bas" x="185" y="126" text-anchor="middle">Sunum · ${DO}</text>
          <text data-sig="170" class="f17-fk-mn" x="185" y="146" text-anchor="middle">5 × ${CA} × 10 = 1000</text></g>
        <g data-fk="B" data-fv="tuk" class="f17-fk-B" role="button" tabindex="0" aria-label="Tüketim denklemini vurgula">
          <rect x="94" y="166" width="182" height="66" rx="10"/>
          <text class="f17-fk-bas" x="185" y="186" text-anchor="middle">Tüketim · ${VO}</text>
          <text data-sig="170" class="f17-fk-mn" x="185" y="205" text-anchor="middle">5 × (${CA} − 15) × 10</text>
          <text class="f17-fk-mn" x="185" y="223" text-anchor="middle">= 250 mL/dk</text></g>
        <text data-fk="lv" data-sig="200" class="f17-fk-et v" x="184" y="262" text-anchor="middle">Miks venöz · CvO₂ ≈ 15</text>
        <g data-fk="m1" data-fv="olc" class="f17-fk-olc" role="button" tabindex="0" aria-label="Ölçüm noktalarını vurgula: 1, pulmoner arter kateteri">${isaret(1, 312, 82)}</g>
        <g data-fk="m2" data-fv="olc" class="f17-fk-olc" role="button" tabindex="0" aria-label="Ölçüm noktalarını vurgula: 2, periferik arteriyel kan gazı">${isaret(2, 48, 268)}</g>
      </svg>`;
    /* yazı kutusuna sığmıyorsa yazı boyunu küçült (yedek yazı tiplerinde de taşmasın) */
    const sigdir = () => O.sahne.querySelectorAll('[data-sig]').forEach((t) => {
      t.style.fontSize = '';
      let w = 0; try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      const m = +t.dataset.sig;
      if (w > m) t.style.fontSize = (parseFloat(getComputedStyle(t).fontSize) * m / w).toFixed(2) + 'px';
    });
    const uygula = () => {
      bas(kok, 'fv', mod);
      const acik = UYE[mod];
      kok.querySelectorAll('[data-fk]').forEach((n) => n.classList.toggle('f17-fk-son', !!acik && !acik.includes(n.dataset.fk)));
      /* 4. satır (a-v farkı) yalnız Tüketim'de; dar yerleşimde "alınan O₂"nin yerini alır */
      const S = topla(O.sahne, 'data-fk');
      if (S.d4) S.d4.style.display = mod === 'tuk' ? '' : 'none';
      if (S.d3) S.d3.style.display = dar && mod === 'tuk' ? 'none' : '';
      sigdir();
      cap(CAP[mod]);
    };
    const kur = (d) => {
      dar = d; kok.classList.toggle('f17-dar', d);
      O.sahne.innerHTML = d ? svgDar() : svgGen();
      akis = [...O.sahne.querySelectorAll('.f17-fk-akis')];
      uygula();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (dar === d && O.sahne.isConnected) sigdir(); });
    };
    const sec = (k) => { if (UYE[k] || k === 'hep') { mod = k; uygula(); } };
    kok.addEventListener('click', (e) => { const b = e.target.closest('[data-fv]'); if (b) sec(b.dataset.fv); });
    kok.addEventListener('keydown', (e) => {
      const b = e.target.closest('g[data-fv]');
      if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec(b.dataset.fv); }
    });
    const durRO = duyarli(el, kur);
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (!dt) return;
      faz = (faz + 16 * dt) % 18;               // kesikli çizgi akış yönünde yavaşça ilerler (şematik)
      akis.forEach((p) => p.setAttribute('stroke-dashoffset', (-faz).toFixed(2)));
    });
    return () => { durT(); durRO(); };
  };
})();
