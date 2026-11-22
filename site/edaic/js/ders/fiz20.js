/* Fizyoloji Bölüm 20 · Akciğer kompliyansı · bileşenler.
   Modeller eğitim amaçlı ve şematiktir: kitaptan gelen değerler K1 s. 82–87 (RV/FRC/TLC ve 30 cmH₂O sınırı K1 s. 50–51),
   ara sayılar atlas hesaplarıdır. Tarif: docs/tasarim/fiz20.md */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const ESIK = 640; // bileşen bu genişliğin altında dar yerleşime geçer (SVG yazıları ekranda ≥ 11 px kalsın)

  /* ---------- yardımcılar ---------- */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const sig = (z) => 1 / (1 + Math.exp(-z));
  const fmt = (v, d = 1) => {
    const k = Math.pow(10, d), r = Math.round(v * k) / k;
    return (Object.is(r, -0) || r === 0 ? 0 : r).toFixed(d).replace('.', ',').replace('-', '−');
  };
  const isr = (v, d = 1) => (Math.round(v * Math.pow(10, d)) > 0 ? '+' : '') + fmt(v, d);
  const n2 = (v) => +v.toFixed(2);
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
  const at = (n, k, v) => {
    if (!n) return;
    const s = typeof v === 'number' ? String(n2(v)) : v;
    if (!n._a) n._a = {};
    if (n._a[k] !== s) { n.setAttribute(k, s); n._a[k] = s; }
  };
  const gos = (n, v) => { if (n && n._g !== v) { n.style.display = v ? '' : 'none'; n._g = v; } };
  const topla = (kok, ad) => { const o = {}; kok.querySelectorAll(`[${ad}]`).forEach((n) => { o[n.getAttribute(ad)] = n; }); return o; };
  const segH = (ad, key, list) => `<div class="seg" role="group" aria-label="${ad}">${list.map(([v, t]) => `<button type="button" data-${key}="${v}" aria-pressed="false">${t}</button>`).join('')}</div>`;
  const bas = (kok, key, v) => kok.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute(`data-${key}`) === String(v))));
  const rng = (k, ad, min, max, step, val, aria) => `<label class="f20-rng"><span>${ad}<b data-o="v${k}"></b></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-s="${k}" aria-label="${aria}"></label>`;
  /* (x, y) ucunda, a açısı yönünü gösteren ok başı */
  const ucD = (x, y, a, s = 7) => {
    const c = Math.cos(a), si = Math.sin(a), bx = x - c * s, by = y - si * s, px = -si * s * 0.55, py = c * s * 0.55;
    return `M${n2(x)} ${n2(y)}L${n2(bx + px)} ${n2(by + py)}L${n2(bx - px)} ${n2(by - py)}Z`;
  };
  const kutu = (n) => { try { const b = n.getBBox(); return b.width ? { x: b.x, y: b.y, w: b.width, h: b.height } : null; } catch (e) { return null; } };
  const kesis = (a, b) => a.x < b.x + b.w - 1 && b.x < a.x + a.w - 1 && a.y < b.y + b.h - 1 && b.y < a.y + a.h - 1;
  /* metni aday konumlardan, sınır içinde kalan ve engellere çarpmayan ilkine yerleştirir */
  const yerles = (n, adaylar, engel, s) => {
    for (const [x, y, an] of adaylar) {
      at(n, 'x', x); at(n, 'y', y); at(n, 'text-anchor', an);
      const b = kutu(n); if (!b) return;
      if (b.x < s.x0 || b.x + b.w > s.x1 || b.y < s.y0 || b.y + b.h > s.y1) continue;
      if (!engel.some((e) => e && kesis(b, e))) return;
    }
    const [x, y, an] = adaylar[0]; at(n, 'x', x); at(n, 'y', y); at(n, 'text-anchor', an);
  };
  const yol = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${n2(x)} ${n2(y)}`).join('');
  /* sayının sonundaki sözcüğe göre bulunma eki: "0,50" → 'de (elli), "0,35" → 'te (beş) */
  const BIR = ['', "'de", "'de", "'te", "'te", "'te", "'da", "'de", "'de", "'da"];
  const ON = ['', "'da", "'de", "'da", "'ta", "'de", "'ta", "'te", "'de", "'da"];
  const deEki = (s) => { const [a, b = ''] = s.split(','); const y = +b[1] || 0, x = +b[0] || 0; if (y) return BIR[y]; if (x) return ON[x]; return BIR[+a % 10] || "'da"; };

  /* =====================================================================
     1 · seri kompliyans: aynı hacim, toplanan basınçlar (1/RC = 1/LC + 1/TCC)
     ===================================================================== */
  VIZ.f20_seri = (el) => {
    const cap = capci(el);
    const VT = 500;
    const DUR = {
      normal: { lc: 200, tcc: 200, c: "<b>Normal.</b> Akciğer ve göğüs kafesi 200'er mL/cmH₂O: 500 mL için her biri 2,5 cmH₂O, toplam 5,0 cmH₂O; RC = 100 mL/cmH₂O. [[K1 s. 82]]" },
      amfizem: { lc: 500, tcc: 200, c: "<b>Amfizem: akciğer kompliyansı artar.</b> Elastik doku yıkılmıştır; akciğer payı 1,0 cmH₂O'ya iner, RC ≈ 143 mL/cmH₂O. Bedeli azalmış elastik geri çekilme ve zorlaşan ekspirasyondur. [[K1 s. 82–83]]" },
      fibrozis: { lc: 50, tcc: 200, c: '<b>Pulmoner fibrozis: akciğer kompliyansı azalır.</b> İnterstisyum sertleşir; aynı 500 mL için akciğer payı 10 cmH₂O, toplam 12,5 cmH₂O; RC 40 mL/cmH₂O. [[K1 s. 83]]' },
      odem: { lc: 100, tcc: 200, c: '<b>Pulmoner ödem, pnömoni: akciğer kompliyansı azalır.</b> Sıvı dolu alveolü genişletmek için yüzey gerilimi nedeniyle çok daha yüksek transmural basınç gerekir. [[K1 s. 83]]' },
      obezite: { lc: 200, tcc: 100, c: "<b>Obezite: göğüs kafesi kompliyansı azalır.</b> Göğüs duvarının artmış ağırlığı genişlemeye karşı koyar; akciğer payı değişmez, göğüs kafesi payı 5,0 cmH₂O'ya çıkar. [[K1 s. 83]]" },
      kifo: { lc: 200, tcc: 50, c: '<b>Kifoskolyoz, ankilozan spondilit: göğüs kafesi kompliyansı azalır.</b> Göğüs duvarının deformitesi ya da rijiditesi göğüs kafesinin genişlemesini engeller. [[K1 s. 83]]' },
      gebelik: { lc: 200, tcc: 125, c: '<b>İleri gebelik: göğüs kafesi kompliyansı azalır.</b> Akciğer kompliyansı görece etkilenmez. [[K1 s. 83]]' },
      nm: { lc: 200, tcc: 500, c: '<b>Nöromüsküler hastalık: göğüs kafesi kompliyansı artar.</b> Kas tonusu azaldığı için göğüs kafesi daha kolay genişler (ör. motor nöron hastalığı). [[K1 s. 83]]' },
    };
    let lc = 200, tcc = 200, durum = 'normal', h = VT, an = null, tw = null, eL = 1 / 200, eC = 1 / 200, G = null, kirli = true;

    el.innerHTML = `<div class="f20-sr">
      <div class="f20-sr-durum">
        <div class="f20-sr-sat"><span class="f20-sr-sl" aria-hidden="true"></span><div class="f20-sr-ic">${segH('Başlangıç durumu', 'd', [['normal', 'Normal']])}${RM ? '' : '<button type="button" class="btn" data-a="sisir">Şişir ▶</button>'}</div></div>
        <div class="f20-sr-sat"><span class="f20-sr-sl">Akciğer:</span><div class="f20-sr-ic">${segH('Akciğeri etkileyen durumlar', 'd', [['amfizem', 'Amfizem'], ['fibrozis', 'Pulmoner fibrozis'], ['odem', 'Pulmoner ödem']])}</div></div>
        <div class="f20-sr-sat"><span class="f20-sr-sl">Göğüs kafesi:</span><div class="f20-sr-ic">${segH('Göğüs kafesini etkileyen durumlar', 'd', [['obezite', 'Obezite'], ['kifo', 'Kifoskolyoz'], ['gebelik', 'İleri gebelik'], ['nm', 'Nöromüsküler']])}</div></div>
      </div>
      <div class="f20-sahne" data-o="sahne"></div>
      <p class="f20-denk" data-o="denk"></p>
      <div class="f20-alt">
        <div class="f20-rngs">
          ${rng('lc', 'Akciğer kompliyansı (LC)', 50, 500, 5, 200, 'Akciğer kompliyansı, mL/cmH₂O')}
          ${rng('tcc', 'Göğüs kafesi kompliyansı (TCC)', 50, 500, 5, 200, 'Göğüs kafesi kompliyansı, mL/cmH₂O')}
        </div>
        <div class="f20-sr-mini" aria-hidden="true">
          <div class="f20-sr-mr"><span class="f20-sr-ml">LC <b data-o="mlc"></b></span><span class="f20-sr-trk"><i class="akc" data-o="blc"></i></span></div>
          <div class="f20-sr-mr"><span class="f20-sr-ml">TCC <b data-o="mtcc"></b></span><span class="f20-sr-trk"><i class="gk" data-o="btcc"></i></span></div>
          <div class="f20-sr-mr"><span class="f20-sr-ml">RC <b data-o="mrc"></b></span><span class="f20-sr-trk"><i class="ac" data-o="brc"></i></span></div>
          <p class="f20-sr-not">Üç çubuk aynı ölçekte (0–500 mL/cmH₂O). RC her zaman iki bileşenin küçüğünden de küçüktür.</p>
        </div>
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s');
    const ARIA = 'Göğüs şeması ve yığılmış basınç çubuğu: 500 mL için gereken basınç göğüs kafesi ve akciğer payına ayrılır, toplamı solunum sistemi basıncıdır';

    const svgGen = () => `<svg class="f20-svg" viewBox="0 0 720 340" role="img" aria-label="${ARIA}">
      <g data-t="olc">
        <path class="f20-sr-akc" d="M58 298 L56 192 C56 138 96 104 150 104 C204 104 244 138 244 192 L242 298 Z"/>
        <path class="f20-sr-gk" d="M44 310 L42 190 C42 128 88 90 150 90 C212 90 258 128 258 190 L256 310"/>
        <line class="f20-sr-dyf" x1="38" y1="310" x2="262" y2="310"/>
      </g>
      <rect class="f20-sr-tr" x="144" y="30" width="12" height="84" rx="3"/>
      <rect class="f20-sr-kutu" x="86" y="4" width="128" height="27" rx="7"/>
      <text class="f20-mn" x="150" y="22.5" text-anchor="middle" data-t="ippv"></text>
      <text class="f20-lb f20-c-gk" x="14" y="72">göğüs kafesi</text>
      <text class="f20-lb f20-c-akc" x="150" y="214" text-anchor="middle">akciğer</text>
      <text class="f20-mn" x="164" y="60" data-t="palv"></text>
      <line class="f20-sr-kl" data-t="kl" x1="251" y1="200" x2="281" y2="200"/>
      <text class="f20-sm" x="285" y="194">plevra</text>
      <text class="f20-mn" x="285" y="212" data-t="ppl"></text>
      <text class="f20-mn f20-c-mut" x="285" y="304">atmosfer 0</text>
      <line class="f20-ax" x1="410" y1="38" x2="410" y2="300"/>
      ${[0, 5, 10, 15, 20].map((v) => `<line class="f20-tik" x1="404" x2="410" y1="${300 - v * 13}" y2="${300 - v * 13}"/><text class="f20-tk" x="399" y="${304 - v * 13}" text-anchor="end">${v}</text>`).join('')}
      <text class="f20-sm" x="410" y="26" text-anchor="middle">cmH₂O</text>
      <line class="f20-ax" x1="410" y1="300" x2="610" y2="300"/>
      <line class="f20-sr-norm" x1="414" x2="610" y1="235" y2="235"/>
      <text class="f20-sm" x="463" y="230" text-anchor="end">normal 5,0</text>
      <rect class="f20-sr-bgk" data-t="bgk" x="470" width="90" y="300" height="0"/>
      <rect class="f20-sr-bakc" data-t="bakc" x="470" width="90" y="300" height="0"/>
      <line class="f20-sr-top" data-t="top" x1="462" x2="568" y1="300" y2="300"/>
      <text class="f20-big f20-c-ac" data-t="ttop" x="470" y="290"></text>
      <text class="f20-mn f20-c-gk" data-t="tgk" x="572" y="290"></text>
      <text class="f20-mn f20-c-akc" data-t="takc" x="572" y="270"></text>
    </svg>`;
    const svgDar = () => `<svg class="f20-svg" viewBox="0 0 360 392" role="img" aria-label="${ARIA}">
      <g data-t="olc">
        <path class="f20-sr-akc" d="M96 229 L94 152 C94 108 130 72 180 72 C230 72 266 108 266 152 L264 229 Z"/>
        <path class="f20-sr-gk" d="M84 240 L82 150 C82 98 124 60 180 60 C236 60 278 98 278 150 L276 240"/>
        <line class="f20-sr-dyf" x1="78" y1="240" x2="282" y2="240"/>
      </g>
      <rect class="f20-sr-tr" x="174" y="27" width="12" height="57" rx="3"/>
      <rect class="f20-sr-kutu" x="112" y="1" width="136" height="27" rx="7"/>
      <text class="f20-mn" x="180" y="19.5" text-anchor="middle" data-t="ippv"></text>
      <text class="f20-mn" x="194" y="47" data-t="palv"></text>
      <text class="f20-lb f20-c-gk" x="6" y="60">göğüs kafesi</text>
      <text class="f20-lb f20-c-akc" x="180" y="164" text-anchor="middle">akciğer</text>
      <path class="f20-sr-kl" data-t="kl" d="M88 205 L40 252"/>
      <text class="f20-mn" x="8" y="270" data-t="ppl"></text>
      <text class="f20-mn f20-c-mut" x="352" y="270" text-anchor="end">atmosfer 0</text>
      ${[0, 5, 10, 15, 20].map((v) => `<line class="f20-tik" x1="${30 + v * 15}" x2="${30 + v * 15}" y1="298" y2="304"/><text class="f20-tk" x="${30 + v * 15}" y="294" text-anchor="middle">${v}</text>`).join('')}
      <line class="f20-ax" x1="30" y1="304" x2="330" y2="304"/>
      <rect class="f20-sr-bgk" data-t="bgk" x="30" y="306" height="30" width="0"/>
      <rect class="f20-sr-bakc" data-t="bakc" x="30" y="306" height="30" width="0"/>
      <line class="f20-sr-norm" x1="105" x2="105" y1="300" y2="342"/>
      <line class="f20-sr-top" data-t="top" x1="30" x2="30" y1="300" y2="342"/>
      <text class="f20-mn f20-c-gk" data-t="tgk" x="30" y="362"></text>
      <text class="f20-mn f20-c-akc" data-t="takc" x="30" y="382"></text>
      <text class="f20-big f20-c-ac" data-t="ttop" x="340" y="362" text-anchor="end"></text>
      <text class="f20-sm" x="340" y="382" text-anchor="end">kesik çizgi: normal 5,0 cmH₂O</text>
    </svg>`;

    const ciz = () => {
      if (!G) return;
      const T = G.T, s = 1 + (0.1 * h) / VT, pc = h * eC, pl = h * eL, tot = pc + pl;
      const cx = G.dar ? 180 : 150, cy = G.dar ? 150 : 200;
      at(T.olc, 'transform', `translate(${cx} ${cy}) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`);
      yaz(T.ippv, `IPPV · ${Math.round(h)} mL`);
      yaz(T.palv, `ΔP alveol ${isr(tot)}`);
      yaz(T.ppl, `ΔP plevra ${isr(pc)}`);
      yaz(T.tgk, `göğüs kafesi ${fmt(pc)}`);
      yaz(T.takc, `akciğer ${fmt(pl)}`);
      yaz(T.ttop, `toplam ${fmt(tot)} cmH₂O`);
      if (!G.dar) {
        at(T.kl, 'x1', 150 + 101 * s);
        const y0 = 300, k = 13, yc = y0 - pc * k, yt = y0 - tot * k;
        at(T.bgk, 'y', yc); at(T.bgk, 'height', pc * k);
        at(T.bakc, 'y', yt); at(T.bakc, 'height', pl * k);
        at(T.top, 'y1', yt); at(T.top, 'y2', yt); at(T.ttop, 'y', yt - 9);
        let yl = Math.max((yt + yc) / 2 + 4, yt + 7), yg = (yc + y0) / 2 + 4; // akciğer etiketi toplam etiketinin altında kalsın
        if (yg - yl < 16) yg = yl + 16;
        if (yg > 334) { yg = 334; yl = Math.min(yl, yg - 16); }
        at(T.takc, 'y', yl); at(T.tgk, 'y', yg);
      } else {
        at(T.kl, 'd', `M${n2(180 - 91 * s)} ${n2(150 + 55 * s)} L40 254`);
        const x0 = 30, k = 15;
        at(T.bgk, 'width', pc * k);
        at(T.bakc, 'x', x0 + pc * k); at(T.bakc, 'width', pl * k);
        at(T.top, 'x1', x0 + tot * k); at(T.top, 'x2', x0 + tot * k);
      }
    };
    const metin = () => {
      const rc = 1 / (1 / lc + 1 / tcc), RC = Math.round(rc), top = VT / lc + VT / tcc;
      yaz(O.vlc, `${lc} mL/cmH₂O`); yaz(O.vtcc, `${tcc} mL/cmH₂O`);
      yaz(O.mlc, String(lc)); yaz(O.mtcc, String(tcc)); yaz(O.mrc, String(RC));
      O.blc.style.width = (lc / 5) + '%'; O.btcc.style.width = (tcc / 5) + '%'; O.brc.style.width = (rc / 5) + '%';
      O.denk.innerHTML = `<span>1/RC = 1/${lc} + 1/${tcc}</span> <span>→ RC = ${RC} mL/cmH₂O</span>`;
      IN.lc.setAttribute('aria-valuetext', `${lc} mL/cmH₂O`); IN.tcc.setAttribute('aria-valuetext', `${tcc} mL/cmH₂O`);
      if (durum) cap(DUR[durum].c);
      else cap(`<b>Kendi değerleriniz.</b> 1/RC = 1/${lc} + 1/${tcc} → RC = ${RC} mL/cmH₂O; 500 mL için ${fmt(top)} cmH₂O. RC her zaman iki bileşenin küçüğünden de küçüktür. [[K1 s. 82]]`);
    };
    const ayarla = (L, C, d) => {
      lc = L; tcc = C; durum = d; bas(kok, 'd', d || '-');
      if (d) { IN.lc.value = L; IN.tcc.value = C; }
      const b = { eL: 1 / L, eC: 1 / C };
      if (RM) { eL = b.eL; eC = b.eC; tw = null; } else tw = { a: { eL, eC }, b, t: 0 };
      metin(); kirli = true; if (RM) ciz();
    };
    const sisirH = (t) => {
      if (t < 1.2) return VT * ease(t / 1.2);
      if (t < 2.2) return VT;
      if (t < 3.4) return VT * (1 - ease((t - 2.2) / 1.2));
      if (t < 3.9) return 0;
      if (t < 4.7) return VT * ease((t - 3.9) / 0.8);
      return VT;
    };
    kok.addEventListener('click', (e) => {
      const b = e.target.closest('[data-d]');
      if (b) { const k = b.dataset.d; ayarla(DUR[k].lc, DUR[k].tcc, k); return; }
      if (e.target.closest('[data-a="sisir"]')) { an = { t: 0 }; h = 0; kirli = true; }
    });
    kok.addEventListener('input', (e) => {
      const s = e.target.closest('[data-s]'); if (!s) return;
      const L = s.dataset.s === 'lc' ? +s.value : lc, C = s.dataset.s === 'tcc' ? +s.value : tcc;
      ayarla(L, C, null);
    });
    const kur = (dar) => {
      kok.classList.toggle('f20-dar', dar);
      O.sahne.innerHTML = dar ? svgDar() : svgGen();
      G = { dar, T: topla(O.sahne, 'data-t') };
      ciz();
    };
    bas(kok, 'd', 'normal'); metin();
    const durRO = duyarli(el, kur);
    if (!G) kur(false);
    const durT = ticker(el, (dt) => {
      if (tw) {
        tw.t += dt; const f = ease(clamp(tw.t / 0.3, 0, 1));
        eL = lerp(tw.a.eL, tw.b.eL, f); eC = lerp(tw.a.eC, tw.b.eC, f);
        if (tw.t >= 0.3) tw = null;
        kirli = true;
      }
      if (an) { an.t += dt; h = sisirH(an.t); if (an.t >= 4.7) { an = null; h = VT; } kirli = true; }
      if (kirli) { ciz(); kirli = false; }
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     2 · Laplace yasası: iki bağlı alveol, sürfaktanla ve sürfaktansız
     ===================================================================== */
  VIZ.f20_laplace = (el) => {
    const cap = capci(el);
    const KOL = 0.12, SURE = 2.5;
    let mod = 'yok', r10 = 0.5, r1 = 0.5, r2 = 1, bag = false, oyn = null, bitti = false, yor = null, faz = 0, G = null, kirli = true;
    const Tf = (r) => (mod === 'yok' ? 1 : 0.3 * r);
    const Pf = (r) => (2 * Tf(r)) / r;
    const yorunge = (a) => {
      const K = a * a * a + 1, dt = 2e-5, uSon = KOL * KOL * KOL, us = [];
      let u = a * a * a;
      while (u > uSon && us.length < 4e5) { us.push(u); const x1 = Math.cbrt(u), x2 = Math.cbrt(K - u); u -= (2 / x1 - 2 / x2) * dt; }
      us.push(uSon);
      return { K, us };
    };
    const yorR = (p) => {
      const n = yor.us.length - 1, i = p * n, i0 = Math.min(n, Math.floor(i)), f = i - i0;
      const u = i0 >= n ? yor.us[n] : lerp(yor.us[i0], yor.us[i0 + 1], f);
      return [Math.max(KOL, Math.cbrt(u)), Math.cbrt(yor.K - u)];
    };
    const GEN = { dar: false, vb: '0 0 720 420', S: 90, cy: 214, x: [0, 210, 500], jx: 360, jy: 64, ty: 12, nM: 18, hr: 4, sy: 372 };
    const DAR = { dar: true, vb: '0 0 360 430', S: 62, cy: 160, x: [0, 95, 258], jx: 180, jy: 44, ty: 6, nM: 14, hr: 3, sy: 384 };

    el.innerHTML = `<div class="f20-lp">
      <div class="f20-ctl">
        ${segH('Sürfaktan', 'm', [['yok', 'Sürfaktan yok'], ['var', 'Sürfaktan var']])}
        <button type="button" class="btn" data-a="ac">Bağlantıyı aç ▶</button>
        <button type="button" class="btn ghost" data-a="bas">Baştan</button>
      </div>
      <div class="f20-sahne" data-o="sahne"></div>
      <div class="f20-alt"><div class="f20-rngs">${rng('r', 'Küçük alveolün yarıçapı (büyüğe oranla)', 0.3, 0.9, 0.05, 0.5, 'Küçük alveolün yarıçapı, büyük alveole oranla')}</div></div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s'), BAC = kok.querySelector('[data-a="ac"]');
    const alvH = (i, g) => `<g>
        <circle class="f20-lp-duvar" data-t="w${i}" cx="${g.x[i]}" cy="${g.cy}" r="10"/>
        <circle class="f20-lp-sivi" data-t="s${i}" cx="${g.x[i]}" cy="${g.cy}" r="6"/>
        <path class="f20-lp-ok" data-t="o${i}"/><path class="f20-lp-okh" data-t="oh${i}"/><path class="f20-lp-nk" data-t="nk${i}"/>
        <g class="f20-lp-dppc" data-t="dp${i}">${Array.from({ length: g.nM }, (_, k) => `<circle class="f20-lp-bas" data-t="h${i}_${k}" r="${g.hr}" cx="0" cy="0"/>`).join('')}<path class="f20-lp-kuy" data-t="k${i}"/></g>
      </g>`;
    const svgH = (g) => `<svg class="f20-svg" viewBox="${g.vb}" role="img" aria-label="İki alveol ortak hava yoluna bağlı; Laplace yasasına göre gereken basınçlar, yüzey gerilimi okları, sürfaktan molekülleri ve interstisyumdan transüdasyon">
      <rect class="f20-lp-int" x="${g.dar ? 6 : 20}" y="${g.sy}" width="${g.dar ? 348 : 680}" height="${g.dar ? 24 : 28}" rx="6"/>
      <text class="f20-sm" x="${g.dar ? 12 : 30}" y="${g.sy + (g.dar ? 17 : 19)}">interstisyum</text>
      <path class="f20-lp-tr" data-t="tr"/><path class="f20-lp-trh" data-t="trh"/>
      <text class="f20-sm f20-c-warn" data-t="trl">transüdasyon</text>
      <path class="f20-lp-yd" data-t="yd"/><path class="f20-lp-yi" data-t="yi"/>
      <path class="f20-lp-ak" data-t="ak"/>
      <line class="f20-lp-vana" data-t="v1"/><line class="f20-lp-vana" data-t="v2"/>
      ${g.dar
        ? `<text class="f20-sm" x="194" y="20">ortak hava yolu</text>
           <text class="f20-sm f20-c-ac f20-k" data-t="fl1" x="166" y="18" text-anchor="end">hava küçükten</text><text class="f20-sm f20-c-ac f20-k" data-t="fl2" x="166" y="34" text-anchor="end">büyüğe akar</text>
           <text class="f20-sm f20-c-ok f20-k" data-t="nf1" x="166" y="18" text-anchor="end">akım yok</text><text class="f20-sm f20-c-ok f20-k" data-t="nf2" x="166" y="34" text-anchor="end">basınçlar eşit</text>`
        : `<text class="f20-sm" x="376" y="30">ortak hava yolu</text>
           <text class="f20-sm f20-c-ac f20-k" data-t="fl1" x="${g.jx}" y="144" text-anchor="middle">hava küçükten</text><text class="f20-sm f20-c-ac f20-k" data-t="fl2" x="${g.jx}" y="160" text-anchor="middle">büyüğe akar</text>
           <text class="f20-sm f20-c-ok f20-k" data-t="nf1" x="${g.jx}" y="144" text-anchor="middle">akım yok</text><text class="f20-sm f20-c-ok f20-k" data-t="nf2" x="${g.jx}" y="160" text-anchor="middle">basınçlar eşit</text>`}
      ${alvH(1, g)}${alvH(2, g)}
      ${[1, 2].map((i) => `<text class="f20-mn" data-t="va${i}"></text><text class="f20-mn" data-t="vb${i}"></text><text class="f20-mn f20-k" data-t="vc${i}"></text>`).join('')}
      ${g.dar
        ? `<rect class="f20-lp-cub0" x="25" y="292" width="130" height="12" rx="3"/><rect class="f20-lp-cub0" x="193" y="292" width="130" height="12" rx="3"/>
           <rect class="f20-lp-cub" data-t="c1" x="25" y="292" width="0" height="12" rx="3"/><rect class="f20-lp-cub" data-t="c2" x="193" y="292" width="0" height="12" rx="3"/>
           <text class="f20-sm f20-c-ac" data-t="u1" x="158" y="303">▲</text><text class="f20-sm f20-c-ac" data-t="u2" x="326" y="303">▲</text>
           <text class="f20-sm" x="180" y="322" text-anchor="middle">çubuklar: gereken P (0–8, göreli)</text>`
        : `<rect class="f20-lp-cub0" x="32" y="160" width="16" height="140" rx="3"/><rect class="f20-lp-cub0" x="672" y="160" width="16" height="140" rx="3"/>
           <rect class="f20-lp-cub" data-t="c1" x="32" y="300" width="16" height="0" rx="3"/><rect class="f20-lp-cub" data-t="c2" x="672" y="300" width="16" height="0" rx="3"/>
           <text class="f20-mn f20-k" data-t="cv1" x="40" text-anchor="middle"></text><text class="f20-mn f20-k" data-t="cv2" x="680" text-anchor="middle"></text>
           <text class="f20-sm" x="40" y="318" text-anchor="middle">gereken P</text><text class="f20-sm" x="680" y="318" text-anchor="middle">gereken P</text>`}
      <text class="f20-sm f20-c-ok" data-t="dl1" text-anchor="middle">sıkışmış DPPC</text><text class="f20-sm f20-c-ok" data-t="dl2" text-anchor="middle">→ T daha düşük</text>
      <text class="f20-lb f20-c-crit" data-t="kl" text-anchor="middle">kollaps (atelektazi)</text>
    </svg>`;
    const vana = (n, x0, y0, x1, y1) => {
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, a = Math.atan2(y1 - y0, x1 - x0) + Math.PI / 2, L = 13;
      at(n, 'x1', mx - Math.cos(a) * L); at(n, 'y1', my - Math.sin(a) * L); at(n, 'x2', mx + Math.cos(a) * L); at(n, 'y2', my + Math.sin(a) * L);
    };
    const alv = (i, r) => {
      const g = G.g, T = G.T, S = g.S, R = r * S, cx = g.x[i], cy = g.cy, t = Tf(r), kol = i === 1 && r <= KOL + 1e-6;
      at(T['w' + i], 'r', R); T['w' + i].classList.toggle('kol', kol);
      at(T['s' + i], 'r', Math.max(R - 4, 1)); T['s' + i].classList.toggle('az', mod === 'var');
      let dS = '', dH = '', dN = '';
      const ic = mod === 'var' ? (g.dar ? 18 : 22) : 8, len = Math.min(18 * t, 0.55 * (R - ic));
      for (let k = 0; k < 8; k++) {
        const a = (2 * Math.PI * k) / 8 + Math.PI / 8, c = Math.cos(a), s = Math.sin(a);
        if (t >= 0.2 && len >= 3) {
          const hs = clamp(len * 0.6, 3.5, 6.5), r0 = R - ic, re = R - ic - len;
          dS += `M${n2(cx + c * r0)} ${n2(cy + s * r0)}L${n2(cx + c * (re + hs * 0.8))} ${n2(cy + s * (re + hs * 0.8))}`;
          dH += ucD(cx + c * re, cy + s * re, a + Math.PI, hs);
        } else if (mod === 'var' && R > ic + 6) {
          const rr = R - ic - 2;
          dN += `M${n2(cx + c * rr - 1.6)} ${n2(cy + s * rr)}a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0`;
        }
      }
      at(T['o' + i], 'd', dS); at(T['oh' + i], 'd', dH); at(T['nk' + i], 'd', dN);
      const dp = T['dp' + i]; dp.classList.toggle('on', mod === 'var');
      if (mod === 'var') {
        let dk = '';
        for (let k = 0; k < g.nM; k++) {
          const a = (2 * Math.PI * k) / g.nM - Math.PI / 2 + Math.PI / g.nM, c = Math.cos(a), s = Math.sin(a), rh = R - 7, p = -s * 1.6, q = c * 1.6;
          at(T[`h${i}_${k}`], 'cx', cx + c * rh); at(T[`h${i}_${k}`], 'cy', cy + s * rh);
          const r0 = rh - g.hr, r1e = rh - g.hr - 6;
          dk += `M${n2(cx + c * r0 + p)} ${n2(cy + s * r0 + q)}L${n2(cx + c * r1e + p)} ${n2(cy + s * r1e + q)}M${n2(cx + c * r0 - p)} ${n2(cy + s * r0 - q)}L${n2(cx + c * r1e - p)} ${n2(cy + s * r1e - q)}`;
        }
        at(T['k' + i], 'd', dk);
      }
      const P = (2 * t) / r;
      if (g.dar) {
        yaz(T['va' + i], `r ${fmt(r, 2)} · T ${fmt(t, 2)}`); yaz(T['vb' + i], `P = ${fmt(P, 1)}`); yaz(T['vc' + i], '');
        [['va', 262], ['vb', 279]].forEach(([k, y]) => { at(T[k + i], 'x', cx); at(T[k + i], 'y', y); at(T[k + i], 'text-anchor', 'middle'); });
        at(T['c' + i], 'width', clamp(P / 8, 0, 1) * 130); gos(T['u' + i], P > 8);
      } else {
        const top = cy - R, x = i === 1 ? cx - 18 : cx + 18, an = i === 1 ? 'end' : 'start';
        yaz(T['va' + i], `r = ${fmt(r, 2)}`); yaz(T['vb' + i], `T = ${fmt(t, 2)}`); yaz(T['vc' + i], `P = 2T/r = ${fmt(P, 1)}`);
        [['va', -44], ['vb', -27], ['vc', -10]].forEach(([k, dy]) => { at(T[k + i], 'x', x); at(T[k + i], 'y', top + dy); at(T[k + i], 'text-anchor', an); });
        const hh = clamp(P / 8, 0, 1) * 140;
        at(T['c' + i], 'y', 300 - hh); at(T['c' + i], 'height', hh);
        yaz(T['cv' + i], (P > 8 ? '▲ ' : '') + fmt(P, 1)); at(T['cv' + i], 'y', 300 - hh - 8);
      }
      return P;
    };
    const ciz = () => {
      if (!G) return;
      const g = G.g, T = G.T, S = g.S, t1 = g.cy - r1 * S, t2 = g.cy - r2 * S;
      const yd = `M${g.jx} ${g.ty}V${g.jy}L${g.x[1]} ${n2(t1 + 3)}M${g.jx} ${g.jy}L${g.x[2]} ${n2(t2 + 3)}`;
      at(T.yd, 'd', yd); at(T.yi, 'd', yd);
      at(T.ak, 'd', `M${g.x[1]} ${n2(t1)}L${g.jx} ${g.jy}L${g.x[2]} ${n2(t2)}`);
      const akim = bag && mod === 'yok';
      gos(T.ak, akim); gos(T.fl1, akim); gos(T.fl2, akim);
      gos(T.nf1, bag && mod === 'var'); gos(T.nf2, bag && mod === 'var');
      vana(T.v1, g.jx, g.jy, g.x[1], t1); vana(T.v2, g.jx, g.jy, g.x[2], t2);
      gos(T.v1, !bag); gos(T.v2, !bag);
      at(T.ak, 'stroke-dashoffset', n2(-faz));
      const P1 = alv(1, r1), P2 = alv(2, r2);
      // transüdasyon okları
      let dT = '', dTH = '', lx = null;
      [[1, P1], [2, P2]].forEach(([i, P]) => {
        const nOk = P >= 3 ? 3 : P >= 1.5 ? 2 : P >= 0.8 ? 1 : 0;
        const off = nOk === 3 ? [-18, 0, 18] : nOk === 2 ? [-11, 11] : nOk === 1 ? [0] : [];
        const yb = g.sy - 4, ye = g.sy - (g.dar ? 32 : 38);
        off.forEach((o) => { const x = g.x[i] + o; dT += `M${x} ${yb}V${ye + 5}`; dTH += ucD(x, ye, -Math.PI / 2, 6.5); });
        if (i === 1 && nOk) lx = g.x[1] + (nOk === 1 ? 10 : nOk === 2 ? 20 : 28);
      });
      at(T.tr, 'd', dT); at(T.trh, 'd', dTH);
      gos(T.trl, lx !== null);
      if (lx !== null) { at(T.trl, 'x', lx); at(T.trl, 'y', g.sy - (g.dar ? 14 : 18)); }
      // etiketler
      const R1 = r1 * S, alt1 = g.cy + R1;
      gos(T.dl1, mod === 'var'); gos(T.dl2, mod === 'var');
      if (g.dar) { at(T.dl1, 'x', g.x[1]); at(T.dl1, 'y', alt1 + 15); at(T.dl2, 'x', g.x[1]); at(T.dl2, 'y', alt1 + 30); }
      else { yaz(T.dl1, 'sıkışmış DPPC → T daha düşük'); at(T.dl1, 'x', g.x[1]); at(T.dl1, 'y', alt1 + 20); gos(T.dl2, false); }
      const kol = r1 <= KOL + 1e-6;
      gos(T.kl, kol); at(T.kl, 'x', g.x[1]); at(T.kl, 'y', alt1 + 24);
      // açıklama
      let c;
      if (mod === 'yok' && !bag) { const rs = fmt(r1, 2); c = `<b>Laplace yasası: P = 2T/r.</b> Yüzey gerilimi sabitken küçük alveolü açık tutmak için daha yüksek basınç gerekir: r = ${rs}${deEki(rs)} ${fmt(P1, 1)}, r = 1,00'de 2,0 (göreli). Küçük alveolün kompliyansı düşüktür ve yüzey geriliminin içe çekişi interstisyumdan sıvı çeker (transüdasyon). [[K1 s. 83–84]]`; }
      else if (mod === 'yok') c = '<b>Küçük alveol büyüğe boşalır.</b> Hava yolu basıncı iki alveolde aynıdır ve küçük olanı açık tutmaya yetmez. Küçüldükçe r azalır, gereken basınç daha da artar ve alveol kollabe olur. [[K1 s. 83]]';
      else if (!bag) c = '<b>Sürfaktan: küçük alveolde yüzey gerilimi daha çok düşer.</b> Aynı sayıda DPPC molekülü küçük yüzeyde birbirine daha çok yaklaşır, aralarındaki itme kuvvetleri yüzey gerilimini azaltır. Gereken basınç iki alveolde eşitlenir. [[K1 s. 84]]';
      else c = '<b>Akım yok: alveoller kararlı.</b> Basınçlar eşit olduğu için küçük alveol boşalmaz. Gereken basınç her iki alveolde de düşüktür (kompliyans artar) ve transüdasyon eğilimi azalır. [[K1 s. 84]]';
      cap(c);
    };
    const durumBtn = () => {
      IN.r.disabled = bag;
      BAC.disabled = bag;
      yaz(O.vr, fmt(r10, 2));
      IN.r.setAttribute('aria-valuetext', fmt(r10, 2));
    };
    const basla = () => { bag = false; oyn = null; bitti = false; r1 = r10; r2 = 1; faz = 0; durumBtn(); kirli = true; ciz(); };
    const ac = () => {
      if (bag) return;
      bag = true; durumBtn();
      if (mod === 'yok') {
        yor = yorunge(r10);
        if (RM) { [r1, r2] = yorR(1); bitti = true; } else { oyn = { t: 0 }; bitti = false; }
      }
      kirli = true; ciz();
    };
    kok.addEventListener('click', (e) => {
      const m = e.target.closest('[data-m]');
      if (m) { mod = m.dataset.m; bas(kok, 'm', mod); basla(); return; }
      const a = e.target.closest('[data-a]');
      if (!a) return;
      if (a.dataset.a === 'ac') ac(); else basla();
    });
    kok.addEventListener('input', (e) => { const s = e.target.closest('[data-s="r"]'); if (!s || bag) return; r10 = +s.value; basla(); });
    const kur = (dar) => {
      kok.classList.toggle('f20-dar', dar);
      const g = dar ? DAR : GEN;
      O.sahne.innerHTML = svgH(g);
      G = { g, T: topla(O.sahne, 'data-t') };
      ciz();
    };
    bas(kok, 'm', 'yok'); durumBtn();
    const durRO = duyarli(el, kur);
    if (!G) kur(false);
    const durT = ticker(el, (dt) => {
      if (oyn) {
        oyn.t += dt; const p = clamp(oyn.t / SURE, 0, 1);
        [r1, r2] = yorR(p);
        if (p >= 1) { oyn = null; bitti = true; }
        kirli = true;
      }
      if (bag && mod === 'yok' && !RM && !bitti) { faz += dt * 34; kirli = true; }
      if (kirli) { ciz(); kirli = false; }
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     3 · statik basınç–hacim eğrisi: ölçüm, sigmoid, eğim, statik histerezis
     ===================================================================== */
  VIZ.f20_statik = (el) => {
    const cap = capci(el);
    /* x = −Ppl (cmH₂O); hacim L */
    const Vx = (x) => (x <= 5 ? 1.5 + 3 * sig((x - 5) / 3.75) : 6 * sig((x - 5) / 7.5));
    const Cx = (x) => { if (x <= 5) { const s = sig((x - 5) / 3.75); return (3 * s * (1 - s)) / 3.75; } const s = sig((x - 5) / 7.5); return (6 * s * (1 - s)) / 7.5; };
    const xV = (V) => { if (V <= 3) { const s = (V - 1.5) / 3; return 5 + 3.75 * Math.log(s / (1 - s)); } const s = V / 6; return 5 + 7.5 * Math.log(s / (1 - s)); };
    const del = (V) => { const s = (V - 1.5) / 4.5; return 4 * s * (1 - s); };
    const NV = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5], NX = NV.map(xV);
    const CAP = {
      1: "<b>1 · Ölçüm: akım yokken.</b> Hasta 500 mL'lik adımlarla soluk alır; her adımdan sonra duraklanır, gaz akımı durur ve intraplevral basınç özofageal balon kateterle ölçülür. Her nokta bir hacim–basınç çiftidir. [[K1 s. 84]]",
      2: '<b>2 · Sigmoid eğri.</b> Düşük hacimde (intraplevral basınç az negatif) eğri yatıktır; normal aralıkta (−5 ile −10 cmH₂O) en diktir; yüksek hacimde alveoller elastik sınırlarına yaklaştığı için yeniden yataylaşır. [[K1 s. 84–85]]',
      4: '<b>4 · Statik histerezis.</b> Akım olmadığı hâlde inspirasyon ve ekspirasyon kolları farklı yol izler; döngünün alanı ısı olarak harcanan enerjidir. Kitap bunu sürfaktanın ve parankimin viskoz direncine bağlar; asıl nedenin yüzey gerilimi olduğu sayfadaki Atlas notundadır. [[K1 s. 85–86]]',
    };
    let adim = RM ? 3 : 1, n = RM ? 8 : 0, an = null, x = 5, oyn = null, cf = RM ? 1 : 0, Vsp = RM ? 5.5 : 2, sonP = RM ? -NX[7] : null, G = null, kirli = true;

    el.innerHTML = `<div class="f20-st">
      <div class="f20-ctl">
        <button type="button" class="btn ghost" data-a="geri">◀ Geri</button>
        <button type="button" class="btn" data-a="ileri">İleri ▶</button>
        <button type="button" class="btn ghost" data-a="bas">Baştan</button>
        ${RM ? '' : '<button type="button" class="btn ghost" data-a="oyn">Oynat</button>'}
        <span class="f20-adim" data-o="adim" aria-live="polite"></span>
      </div>
      <div class="f20-sahne" data-o="sahne"></div>
      <div class="f20-st-alt">
        <div data-o="a1" class="f20-st-k"><button type="button" class="btn" data-a="ekle">500 mL ekle</button><span class="f20-not" data-o="nsay"></span></div>
        <div data-o="a3" class="f20-st-k f20-st-k3">
          ${segH('Hızlı seçim', 'q', [['0', 'Düşük hacim'], ['5', 'FRC'], ['20', 'Yüksek hacim']])}
          <div class="f20-rngs">${rng('x', 'İntraplevral basınç (sağa doğru daha negatif)', -5, 35, 0.5, 5, 'İntraplevral basınç, cmH₂O; sağa doğru daha negatif')}</div>
        </div>
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s');
    const B = topla(kok, 'data-a');

    const GEN = { dar: false, vb: '0 0 720 400', X: (p) => 262 + (5 - p) * 10.8, Y: (v) => 340 - (v - 1) * (300 / 5.5), x0: 262, x1: 694, y0: 340, y1: 40 };
    const DAR = { dar: true, vb: '0 0 360 600', X: (p) => 56 + (5 - p) * 7.2, Y: (v) => 470 - (v - 1) * (290 / 5.5), x0: 56, x1: 344, y0: 470, y1: 180 };
    const egriD = (g) => { const p = []; for (let xx = -5; xx <= 35.001; xx += 0.25) p.push([g.X(-xx), g.Y(Vx(xx))]); return yol(p); };
    const kolD = (g, sgn) => { const p = []; for (let V = 1.6; V <= 5.951; V += 0.025) p.push([g.X(-(xV(V) + sgn * del(V))), g.Y(V)]); return p; };
    const svgH = (g) => {
      const X = g.X, Y = g.Y, ins = kolD(g, 1), eks = kolD(g, -1), d = g.dar;
      const bant = (a, b, cls) => `<rect class="${cls}" x="${n2(X(a))}" y="${g.y1}" width="${n2(X(b) - X(a))}" height="${g.y0 - g.y1}"/>`;
      const bAd = (a, b, l1, l2) => (d ? `<text class="f20-sm f20-hl" x="${n2((X(a) + X(b)) / 2)}" y="${g.y0 - 8}" text-anchor="middle">${l1}</text>`
        : `<text class="f20-sm" x="${n2((X(a) + X(b)) / 2)}" y="20" text-anchor="middle">${l1}</text><text class="f20-sm" x="${n2((X(a) + X(b)) / 2)}" y="33" text-anchor="middle">${l2}</text>`);
      const ucIns = (() => { const a = [X(-(xV(4) + del(4))), Y(4)], b = [X(-(xV(4.06) + del(4.06))), Y(4.06)]; return ucD(b[0], b[1], Math.atan2(b[1] - a[1], b[0] - a[0]), 8); })();
      const ucEks = (() => { const a = [X(-(xV(3.4) - del(3.4))), Y(3.4)], b = [X(-(xV(3.34) - del(3.34))), Y(3.34)]; return ucD(b[0], b[1], Math.atan2(b[1] - a[1], b[0] - a[0]), 8); })();
      const vm = 3.75, xm = (X(-(xV(vm) + del(vm))) + X(-(xV(vm) - del(vm)))) / 2, ym = Y(vm);
      const P = d
        ? { ak: [284, 30, 'middle'], sp: [110, 10, 96, 66], spl: [158, 28], spv: [158, 58], boru: 'M77 38H110', bas: [64, 34, 13], gov: [38, 52, 52, 82, 14], ac: [52, 76, 10], acY: 58, acK: [14, 5], oz: 'M64 46V99', bal: [64, 108, 4, 9], balL: [100, 124, 'start'], balK: 'M69 110L97 120', bk: [218, 46, 134, 34], bkt: [285, 68] }
        : { ak: [108, 22, 'middle'], sp: [14, 40, 86, 72], spl: [57, 57], spv: [57, 88], boru: 'M100 80H150', bas: [166, 78, 16], gov: [134, 100, 64, 162, 18], ac: [152, 180, 12], acY: 112, acK: [26, 9], oz: 'M166 94V195', bal: [166, 206, 5, 11], balL: [126, 211, 'end'], balK: 'M130 208L159 206', bk: [14, 286, 186, 40], bkt: [107, 312] };
      const xt = d ? [0, -10, -20, -30] : [5, 0, -5, -10, -15, -20, -25, -30, -35];
      return `<svg class="f20-svg" viewBox="${g.vb}" role="img" aria-label="Statik basınç–hacim eğrisi: yatay eksen intraplevral basınç (sağa doğru daha negatif), dikey eksen akciğer hacmi; ölçüm noktaları, sigmoid eğri, eğim ve statik histerezis">
        <defs><clipPath id="f20-st-klip${d ? 'd' : 'g'}"><rect x="${g.x0}" y="${g.y1}" width="${g.x1 - g.x0}" height="${g.y0 - g.y1}"/></clipPath></defs>
        <text class="f20-sm f20-k" data-t="akim" x="${P.ak[0]}" y="${P.ak[1]}" text-anchor="${P.ak[2]}"></text>
        <rect class="f20-st-sp" x="${P.sp[0]}" y="${P.sp[1]}" width="${P.sp[2]}" height="${P.sp[3]}" rx="8"/>
        <text class="f20-sm" x="${P.spl[0]}" y="${P.spl[1]}" text-anchor="middle">spirometre</text>
        <text class="f20-big" data-t="spv" x="${P.spv[0]}" y="${P.spv[1]}" text-anchor="middle"></text>
        <path class="f20-st-boru" d="${P.boru}"/>
        <rect class="f20-st-kisi" x="${P.gov[0]}" y="${P.gov[1]}" width="${P.gov[2]}" height="${P.gov[3]}" rx="${P.gov[4]}"/>
        <circle class="f20-st-kisi" cx="${P.bas[0]}" cy="${P.bas[1]}" r="${P.bas[2]}"/>
        <ellipse class="f20-st-akc" data-t="ac1" cx="${P.ac[0]}" rx="${P.ac[2]}"/><ellipse class="f20-st-akc" data-t="ac2" cx="${P.ac[1]}" rx="${P.ac[2]}"/>
        <path class="f20-st-oz" d="${P.oz}"/>
        <ellipse class="f20-st-bal" cx="${P.bal[0]}" cy="${P.bal[1]}" rx="${P.bal[2]}" ry="${P.bal[3]}"/>
        <path class="f20-st-kl" d="${P.balK}"/>
        <text class="f20-sm" x="${P.balL[0]}" y="${P.balL[1]}" text-anchor="${P.balL[2]}">özofageal balon</text>
        <rect class="f20-st-kutu" x="${P.bk[0]}" y="${P.bk[1]}" width="${P.bk[2]}" height="${P.bk[3]}" rx="8"/>
        <text class="f20-big" data-t="bal" x="${P.bkt[0]}" y="${P.bkt[1]}" text-anchor="middle"></text>
        <g data-t="bant">
          ${bant(5, 0, 'f20-st-bk')}${bant(-5, -10, 'f20-st-by')}${bant(-20, -35, 'f20-st-bk')}
        </g>
        <g data-t="bantAd">${bAd(5, 0, d ? 'yatık' : 'düşük hacim', 'yatık')}${bAd(-5, -10, d ? 'en dik' : 'normal aralık', 'en dik')}${bAd(-20, -35, d ? 'yatık' : 'yüksek hacim', 'yatık')}</g>
        ${[[1.5, 'RV 1,5'], [3, 'FRC 3,0'], [6, 'TLC 6,0']].map(([v, l]) => `<line class="f20-st-ref" x1="${g.x0}" x2="${g.x1}" y1="${n2(Y(v))}" y2="${n2(Y(v))}"/><text class="f20-sm" x="${g.x1 - 4}" y="${n2(Y(v) - 5)}" text-anchor="end">${l}</text>`).join('')}
        <line class="f20-ax" x1="${g.x0}" y1="${g.y0}" x2="${g.x1}" y2="${g.y0}"/><line class="f20-ax" x1="${g.x0}" y1="${g.y1}" x2="${g.x0}" y2="${g.y0}"/>
        ${[5, 0, -5, -10, -15, -20, -25, -30, -35].map((p) => `<line class="f20-tik" x1="${n2(X(p))}" x2="${n2(X(p))}" y1="${g.y0}" y2="${g.y0 + 5}"/>`).join('')}
        ${xt.map((p) => `<text class="f20-tk" x="${n2(X(p))}" y="${g.y0 + 18}" text-anchor="middle">${p > 0 ? '+' + p : fmt(p, 0)}</text>`).join('')}
        ${[2, 3, 4, 5, 6].map((v) => `<line class="f20-tik" x1="${g.x0 - 5}" x2="${g.x0}" y1="${n2(Y(v))}" y2="${n2(Y(v))}"/><text class="f20-tk" x="${g.x0 - 8}" y="${n2(Y(v) + 4)}" text-anchor="end">${v}</text>`).join('')}
        ${d ? `<text class="f20-sm" x="200" y="${g.y0 + 40}" text-anchor="middle">İntraplevral basınç (cmH₂O)</text><text class="f20-sm" x="${g.x1}" y="${g.y0 + 58}" text-anchor="end">→ daha negatif</text>`
          : `<text class="f20-sm" x="478" y="${g.y0 + 40}" text-anchor="middle">İntraplevral basınç (cmH₂O)</text><text class="f20-sm" x="${g.x1}" y="${g.y0 + 40}" text-anchor="end">→ daha negatif</text>`}
        <text class="f20-sm" transform="translate(${d ? 16 : 228} ${n2((g.y0 + g.y1) / 2)}) rotate(-90)" text-anchor="middle">Akciğer hacmi (L)</text>
        <g clip-path="url(#f20-st-klip${d ? 'd' : 'g'})">
          <g data-t="s4">
            <path class="f20-st-alan" d="${yol(ins)}${yol(eks.slice().reverse()).replace('M', 'L')}Z"/>
          </g>
          <path class="f20-st-egri" data-t="egri" d="${egriD(g)}" pathLength="1"/>
          <g data-t="s4b">
            <path class="f20-st-ins" d="${yol(ins)}"/><path class="f20-st-eks" d="${yol(eks)}"/>
          </g>
        </g>
        <g data-t="s4c">
          <path class="f20-st-insh" d="${ucIns}"/><path class="f20-st-eksh" d="${ucEks}"/>
          ${(() => { const vi = 4.6, xi = X(-(xV(vi) + del(vi))), xe = X(-(xV(vi) - del(vi))), yi = Y(vi);
            return `<text class="f20-lb f20-c-akc f20-hl" x="${n2(xi + (d ? 8 : 10))}" y="${n2(yi + 14)}">inspirasyon</text><text class="f20-lb f20-c-gk f20-hl" x="${n2(xe - (d ? 8 : 10))}" y="${n2(yi - 6)}" text-anchor="end">ekspirasyon</text>`; })()}
          <path class="f20-st-kl" d="M${n2(xm + 3)} ${n2(ym + 4)}L${n2(xm + (d ? 42 : 58))} ${n2(ym + (d ? 34 : 42))}"/>
          <text class="f20-sm f20-c-ac f20-k f20-hl" x="${n2(xm + (d ? 45 : 62))}" y="${n2(ym + (d ? 44 : 52))}">döngü alanı = ısı</text>
        </g>
        <g data-t="nok">${NV.map((v, i) => `<circle class="f20-st-n" data-t="n${i}" cx="${n2(X(-NX[i]))}" cy="${n2(Y(v))}" r="5"/>`).join('')}</g>
        <g data-t="s3">
          <path class="f20-st-ucg" data-t="ucg" d="M${n2(X(-5))} ${n2(Y(3))}H${n2(X(-7.5))}V${n2(Y(3.5))}"/>
          <text class="f20-sm f20-c-ac f20-k f20-hl" data-t="ucgP" x="${n2(X(-5) + 8)}" y="${n2(Y(3) + 16)}">ΔP 2,5 cmH₂O</text>
          <text class="f20-sm f20-c-ac f20-k f20-hl" data-t="ucgV" x="${n2(X(-7.5) + 6)}" y="${n2((Y(3) + Y(3.5)) / 2 + 12)}">ΔV 500 mL</text>
          <line class="f20-st-teg" data-t="teg"/>
          <circle class="f20-st-p" data-t="pt" r="6"/>
          ${d ? `<rect class="f20-st-kutu" x="70" y="544" width="260" height="50" rx="8"/><text class="f20-mn f20-k" data-t="ok1" x="200" y="565" text-anchor="middle"></text><text class="f20-mn f20-k" data-t="ok2" x="200" y="585" text-anchor="middle"></text>`
            : `<rect class="f20-st-kutu" x="${g.x0 + 6}" y="${g.y1 + 6}" width="226" height="48" rx="8"/><text class="f20-mn f20-k" data-t="ok1" x="${g.x0 + 16}" y="${g.y1 + 26}"></text><text class="f20-mn f20-k" data-t="ok2" x="${g.x0 + 16}" y="${g.y1 + 45}"></text>`}
        </g>
      </svg>`;
    };
    const ciz = () => {
      if (!G) return;
      const g = G.g, T = G.T, d = g.dar;
      // sol panel
      const vPan = adim === 1 ? Vsp : Vx(x), pPan = adim === 1 ? sonP : -x;
      yaz(T.spv, `${fmt(vPan, 1)} L`);
      const ry = (d ? 14 : 26) + (vPan - 1.5) * (d ? 5 : 9), acY = d ? 58 : 112;
      ['ac1', 'ac2'].forEach((k) => { at(T[k], 'ry', ry); at(T[k], 'cy', acY + ry); });
      const akis = adim === 1 && an && an.akis && an.t < 0.6;
      const olcum = adim === 1 && an && !akis;
      yaz(T.akim, akis ? 'akım var' : (olcum || (adim === 1 && n > 0) || adim > 1) ? 'akım = 0 · ölçüm' : 'akım = 0');
      T.akim.classList.toggle('f20-c-warn', !!akis); T.akim.classList.toggle('f20-yanip', !!akis && !RM);
      T.akim.classList.toggle('f20-c-ok', !akis && (olcum || n > 0 || adim > 1));
      yaz(T.bal, akis ? 'Ppl …' : pPan === null ? 'Ppl —' : `Ppl ${fmt(pPan, 1)} cmH₂O`);
      // noktalar
      for (let i = 0; i < 8; i++) gos(T['n' + i], i < n);
      // adım 2+: bantlar ve eğri
      gos(T.bant, adim >= 2); gos(T.bantAd, adim >= 2);
      T.bant.style.opacity = adim >= 3 ? 0.4 : 1;
      gos(T.egri, adim >= 2);
      at(T.egri, 'stroke-dasharray', '1 1'); at(T.egri, 'stroke-dashoffset', n2(1 - clamp(cf, 0, 1)));
      T.egri.classList.toggle('sol', adim === 4);
      // adım 3
      gos(T.s3, adim === 3);
      if (adim === 3) {
        const X = g.X, Y = g.Y, px = X(-x), py = Y(Vx(x)), C = Cx(x);
        const kx = 1, ky = -(C * (d ? 290 / 5.5 : 300 / 5.5)) / (d ? 7.2 : 10.8), L = Math.hypot(kx, ky), hl = d ? 56 : 70;
        at(T.teg, 'x1', px - (kx / L) * hl); at(T.teg, 'y1', py - (ky / L) * hl); at(T.teg, 'x2', px + (kx / L) * hl); at(T.teg, 'y2', py + (ky / L) * hl);
        at(T.pt, 'cx', px); at(T.pt, 'cy', py);
        const frc = Math.abs(x - 5) < 1e-6;
        gos(T.ucg, frc); gos(T.ucgP, frc); gos(T.ucgV, frc);
        const Cm = Math.round(C * 1000);
        if (d) { yaz(T.ok1, `Ppl ${fmt(-x, 1)} · V ${fmt(Vx(x), 2)} L`); yaz(T.ok2, `C ${Cm} mL/cmH₂O`); }
        else { yaz(T.ok1, `Ppl ${fmt(-x, 1)} cmH₂O · V ${fmt(Vx(x), 2)} L`); yaz(T.ok2, `C ${Cm} mL/cmH₂O`); }
      }
      // adım 4
      gos(T.s4, adim === 4); gos(T.s4b, adim === 4); gos(T.s4c, adim === 4);
      // denetimler
      yaz(O.adim, `Adım ${adim} / 4`);
      B.geri.disabled = adim === 1; B.ileri.disabled = adim === 4;
      B.ileri.classList.toggle('f20-vurgu', adim === 1 && n === 8);
      gos(O.a1, adim === 1); gos(O.a3, adim === 3);
      B.ekle.disabled = n >= 8 || !!an;
      yaz(O.nsay, `${n} / 8 nokta`);
      if (B.oyn) yaz(B.oyn, oyn ? 'Durdur' : 'Oynat');
      yaz(O.vx, `${fmt(-x, 1)} cmH₂O`); IN.x.setAttribute('aria-valuetext', `${fmt(-x, 1)} cmH₂O`);
      bas(kok, 'q', [0, 5, 20].includes(x) ? x : '-');
      // açıklama
      if (adim !== 3) cap(CAP[adim]);
      else {
        const Cm = Math.round(Cx(x) * 1000), p = fmt(-x, 1);
        if (Cm >= 190) cap(`<b>3 · Eğim = kompliyans.</b> ${p} cmH₂O'da eğim ${Cm} mL/cmH₂O. FRC'de 200 mL/cmH₂O: 500 mL'lik tidal hacim için 2,5 cmH₂O yeter; istirahatte solunum işi en azdır. [[K1 s. 82, 84–85]]`);
        else if (x < 5) cap(`<b>3 · Düşük hacimde eğri yatık.</b> ${p} cmH₂O'da eğim yalnız ${Cm} mL/cmH₂O: aynı hacim için çok daha büyük basınç değişikliği gerekir. [[K1 s. 84]]`);
        else cap(`<b>3 · Yüksek hacimde eğri yeniden yatık.</b> ${p} cmH₂O'da eğim ${Cm} mL/cmH₂O: alveoller elastik sınırlarına yakın, hacmi biraz artırmak için intraplevral basıncın çok düşmesi gerekir. [[K1 s. 85]]`);
      }
    };
    const tamamla = () => { n = 8; an = null; Vsp = 5.5; sonP = -NX[7]; };
    const olcBasla = () => {
      if (an || n >= 8) return;
      if (RM) { tamamla(); return; }
      an = { i: n, t: 0, akis: n > 0 };
    };
    const git = (k) => {
      const eski = adim; adim = clamp(k, 1, 4);
      if (adim >= 2 && n < 8) tamamla();
      if (adim === 2 && eski === 1) cf = RM ? 1 : 0; else if (adim >= 2) cf = 1;
      kirli = true; ciz();
    };
    const sifirla = () => { adim = 1; n = 0; an = null; Vsp = 2; sonP = null; cf = 0; x = 5; IN.x.value = 5; };
    const xAyar = (v) => { x = clamp(Math.round(v * 2) / 2, -5, 35); IN.x.value = x; kirli = true; };
    kok.addEventListener('click', (e) => {
      const q = e.target.closest('[data-q]');
      if (q) { oyn = null; xAyar(+q.dataset.q); ciz(); return; }
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'ekle') { olcBasla(); kirli = true; ciz(); return; }
      if (a === 'oyn') {
        if (oyn) { oyn = null; ciz(); return; }
        if (adim === 4) sifirla();
        oyn = { bek: 0, sup: 0 }; kirli = true; ciz(); return;
      }
      oyn = null;
      if (a === 'ileri') git(adim + 1);
      else if (a === 'geri') git(adim - 1);
      else if (a === 'bas') { sifirla(); kirli = true; ciz(); }
    });
    kok.addEventListener('input', (e) => { const s = e.target.closest('[data-s="x"]'); if (!s) return; oyn = null; x = +s.value; kirli = true; ciz(); });
    const kur = (dar) => {
      kok.classList.toggle('f20-dar', dar);
      const g = dar ? DAR : GEN;
      O.sahne.innerHTML = svgH(g);
      G = { g, T: topla(O.sahne, 'data-t') };
      ciz();
    };
    const durRO = duyarli(el, kur);
    if (!G) kur(false);
    const durT = ticker(el, (dt) => {
      if (an) {
        an.t += dt;
        const i = an.i;
        if (an.akis && an.t < 0.6) Vsp = lerp(NV[i - 1], NV[i], ease(an.t / 0.6)); else Vsp = NV[i];
        if (an.t >= (an.akis ? 1.2 : 0.6)) { n = i + 1; sonP = -NX[i]; Vsp = NV[i]; an = null; }
        kirli = true;
      }
      if (adim >= 2 && cf < 1) { cf = Math.min(1, cf + dt / 0.8); kirli = true; }
      if (oyn) {
        if (adim === 1) {
          if (!an) { if (n < 8) olcBasla(); else { oyn.bek += dt; if (oyn.bek >= 1.5) { oyn.bek = 0; git(2); } } }
        } else if (adim === 2) { oyn.bek += dt; if (oyn.bek >= 3) { oyn.bek = 0; oyn.sup = 0; git(3); } }
        else if (adim === 3) {
          oyn.sup += dt; const s = oyn.sup;
          xAyar(s < 3 ? lerp(-5, 35, ease(s / 3)) : s < 4.2 ? lerp(35, 5, ease((s - 3) / 1.2)) : 5);
          if (s >= 5.8) git(4);
        } else oyn = null;
        kirli = true;
      }
      if (kirli) { ciz(); kirli = false; }
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     4 · dinamik döngü: iki paralel akciğer birimi, solunum sayısı, hava yolu direnci
     ===================================================================== */
  VIZ.f20_dinamik = (el) => {
    const cap = capci(el);
    const C1 = 0.1, C2 = 0.1, M = 1.25, DT = 0.001;
    const DIR = { normal: [1, 1, 1], astim: [3, 2, 10] };
    const sim = (R, RR, A, Mo) => {
      const [R0, R1, R2] = R, w = (2 * Math.PI * RR) / 60, N = Math.round(60 / RR / DT);
      const a = R0 + R1, b = R0, dd = R0 + R2, det = a * dd - b * b;
      let v1 = Mo * C1, v2 = Mo * C2;
      const pd = new Float64Array(N), v = new Float64Array(N), q = new Float64Array(N);
      for (let c = 0; c < 8; c++) {
        for (let i = 0; i < N; i++) {
          const P = Mo + A * Math.sin(w * i * DT), r1 = P - v1 / C1, r2 = P - v2 / C2;
          const q1 = (r1 * dd - b * r2) / det, q2 = (a * r2 - b * r1) / det;
          if (c === 7) { pd[i] = P; v[i] = v1 + v2; q[i] = q1 + q2; }
          v1 += q1 * DT; v2 += q2 * DT;
        }
      }
      return { N, pd, v, q };
    };
    const ONB = new Map();
    const hesap = (yolK, RR) => {
      const key = yolK + RR; if (ONB.has(key)) return ONB.get(key);
      const R = DIR[yolK];
      let s = sim(R, RR, 1, 0); let mx = -Infinity, mn = Infinity;
      for (let i = 0; i < s.N; i++) { mx = Math.max(mx, s.v[i]); mn = Math.min(mn, s.v[i]); }
      const A = 0.5 / (mx - mn);
      s = sim(R, RR, A, M);
      const N = s.N;
      let i0 = 0; for (let i = 0; i < N; i++) { const j = (i + N - 1) % N; if (s.q[j] <= 0 && s.q[i] > 0) { i0 = i; break; } }
      const ppl = new Float64Array(N), V = new Float64Array(N), q = new Float64Array(N);
      let vmin = Infinity; for (let i = 0; i < N; i++) vmin = Math.min(vmin, s.v[i]);
      for (let k = 0; k < N; k++) { const i = (i0 + k) % N; ppl[k] = -5 - s.pd[i]; V[k] = 3 + s.v[i] - vmin; q[k] = s.q[i]; }
      let i1 = N >> 1; for (let k = 1; k < N; k++) if (q[k - 1] > 0 && q[k] <= 0) { i1 = k; break; }
      const iz = (k) => { const j = (k - 1 + N) % N, f = q[j] / (q[j] - q[k]); return { p: lerp(ppl[j], ppl[k], f), v: lerp(V[j], V[k], f), k: j + f }; };
      const ze = iz(0), zi = iz(i1);
      let alan = 0; for (let k = 1; k <= N; k++) { const j = k % N, h = k - 1; alan += ((s.pd[(i0 + j) % N] + s.pd[(i0 + h) % N]) / 2) * (V[j] - V[h]); }
      let qmax = 0; for (let k = 0; k < N; k++) qmax = Math.max(qmax, Math.abs(q[k]));
      const C = 0.5 / Math.abs(zi.p - ze.p) * 1000;
      const r = { N, ppl, V, q, i1, ze, zi, C, oran: C / 200, alanM: Math.abs(alan), qmax, A, T: 60 / RR };
      ONB.set(key, r); return r;
    };
    const REF0 = hesap('normal', 10).alanM;
    let yolK = 'normal', RR = 10, oyn = !RM, faz = 0, H = hesap('normal', 10), G = null, kirli = true;

    el.innerHTML = `<div class="f20-dn">
      <div class="f20-ctl">
        ${segH('Hava yolu', 'y', [['normal', 'Normal hava yolu'], ['astim', 'Akut astım']])}
        ${RM ? '' : '<button type="button" class="btn" data-a="oyn">Durdur</button>'}
      </div>
      <div class="f20-ctl f20-dn-hiz">
        <button type="button" class="btn ghost" data-h="a">Kitaptaki a: 10/dk</button>
        <button type="button" class="btn ghost" data-h="b">Kitaptaki b: astım, 30/dk</button>
      </div>
      <div class="f20-sahne" data-o="sahne"></div>
      <div class="f20-cips f20-cips-4" data-o="cips">
        <span class="f20-cip">Statik <b>200 mL/cmH₂O</b></span>
        <span class="f20-cip" data-o="cd">Dinamik <b data-o="cdv"></b></span>
        <span class="f20-cip">Dinamik/statik <b data-o="co"></b></span>
        <span class="f20-cip">Döngü alanı <b data-o="ca"></b></span>
      </div>
      <div class="f20-alt"><div class="f20-rngs">${rng('rr', 'Solunum sayısı', 10, 40, 1, 10, 'Solunum sayısı, dakikada')}</div></div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s'), BO = kok.querySelector('[data-a="oyn"]');
    const GEN = { dar: false, vb: '0 0 720 468', X: (p) => 90 + -p * 50, Y: (v) => 280 - (v - 2.9) * (250 / 0.7), x0: 90, x1: 690, y0: 280, y1: 30, tb: 392, tk: 40 / 1.2 };
    const DAR = { dar: true, vb: '0 0 360 480', X: (p) => 50 + -p * (295 / 12), Y: (v) => 280 - (v - 2.9) * (260 / 0.7), x0: 50, x1: 345, y0: 280, y1: 20, tb: 412, tk: 32 / 1.2 };
    const svgH = (g) => {
      const X = g.X, Y = g.Y, d = g.dar, id = 'f20-dn-klip' + (d ? 'd' : 'g');
      const xl = d ? [0, -4, -8, -12] : [0, -2, -4, -6, -8, -10, -12];
      return `<svg class="f20-svg" viewBox="${g.vb}" role="img" aria-label="Dinamik basınç–hacim döngüsü: yatay eksen intraplevral basınç (sağa doğru daha negatif), dikey eksen akciğer hacmi; akımın durduğu iki nokta, dinamik ve statik eğim; altta bir solunum döngüsündeki akım">
        <defs><clipPath id="${id}"><rect x="${g.x0}" y="${g.y1}" width="${g.x1 - g.x0}" height="${g.y0 - g.y1}"/></clipPath></defs>
        ${Array.from({ length: 13 }, (_, i) => `<line class="f20-tik" x1="${n2(X(-i))}" x2="${n2(X(-i))}" y1="${g.y0}" y2="${g.y0 + 5}"/>`).join('')}
        ${xl.map((p) => `<text class="f20-tk" x="${n2(X(p))}" y="${g.y0 + 18}" text-anchor="middle">${fmt(p, 0)}</text>`).join('')}
        ${d ? `<text class="f20-sm" x="${(g.x0 + g.x1) / 2}" y="${g.y0 + 36}" text-anchor="middle">İntraplevral basınç (cmH₂O) → daha negatif</text>`
          : `<text class="f20-sm" x="390" y="${g.y0 + 38}" text-anchor="middle">İntraplevral basınç (cmH₂O)</text><text class="f20-sm" x="${g.x1}" y="${g.y0 + 38}" text-anchor="end">→ daha negatif</text>`}
        ${[[3, '3,0', 'FRC'], [3.5, '3,5', 'FRC + VT']].map(([v, l, k]) => `<line class="f20-st-ref" x1="${g.x0}" x2="${g.x1}" y1="${n2(Y(v))}" y2="${n2(Y(v))}"/><line class="f20-tik" x1="${g.x0 - 5}" x2="${g.x0}" y1="${n2(Y(v))}" y2="${n2(Y(v))}"/><text class="f20-tk" x="${g.x0 - 8}" y="${n2(Y(v) + 4)}" text-anchor="end">${l}</text><text class="f20-sm" x="${d ? g.x0 + 4 : g.x1 - 4}" y="${n2(Y(v) - 5)}" text-anchor="${d ? 'start' : 'end'}">${k}</text>`).join('')}
        <line class="f20-ax" x1="${g.x0}" y1="${g.y0}" x2="${g.x1}" y2="${g.y0}"/><line class="f20-ax" x1="${g.x0}" y1="${g.y1}" x2="${g.x0}" y2="${g.y0}"/>
        <text class="f20-sm" transform="translate(${d ? 12 : 22} ${(g.y0 + g.y1) / 2}) rotate(-90)" text-anchor="middle">Akciğer hacmi (L)</text>
        <g clip-path="url(#${id})">
          <path class="f20-dn-dong" data-t="dong"/>
          <line class="f20-dn-st" x1="${n2(X(-4))}" y1="${n2(Y(2.8))}" x2="${n2(X(-8.5))}" y2="${n2(Y(3.7))}"/>
          <line class="f20-dn-dc" data-t="dc"/>
        </g>
        <path class="f20-dn-okh" data-t="ok"/>
        <circle class="f20-dn-z" data-t="ze" r="6"/><circle class="f20-dn-z" data-t="zi" r="6"/>
        <text class="f20-sm f20-k f20-hl" data-t="tze">${d ? 'eksp. sonu' : 'ekspirasyon sonu · akım 0'}</text>
        <text class="f20-sm f20-k f20-hl" data-t="tzi" text-anchor="end">${d ? 'insp. sonu' : 'inspirasyon sonu · akım 0'}</text>
        <circle class="f20-dn-nok" data-t="nok" r="6"/>
        ${d ? `<line class="f20-dn-st" x1="${g.x0}" x2="${g.x0 + 22}" y1="333" y2="333"/><text class="f20-sm" x="${g.x0 + 28}" y="337">statik 200</text>
               <line class="f20-dn-dc" data-t="lgc" x1="200" x2="222" y1="333" y2="333"/><text class="f20-sm f20-k" data-t="lgt" x="228" y="337"></text>
               <text class="f20-sm f20-c-ac f20-k" x="${g.x0}" y="356">döngü alanı: dirençle ısıya giden enerji</text>`
          : `<text class="f20-sm f20-c-ac f20-k f20-hl" x="${g.x0 + 8}" y="256">döngü alanı:</text><text class="f20-sm f20-c-ac f20-k f20-hl" x="${g.x0 + 8}" y="272">dirençle ısıya giden enerji</text>
             <line class="f20-dn-st" x1="476" x2="500" y1="251" y2="251"/><text class="f20-sm f20-hl" x="506" y="255">statik 200 mL/cmH₂O</text>
             <line class="f20-dn-dc" data-t="lgc" x1="476" x2="500" y1="270" y2="270"/><text class="f20-sm f20-k f20-hl" data-t="lgt" x="506" y="274"></text>`}
        <line class="f20-ax" x1="${g.x0}" x2="${g.x1}" y1="${g.tb}" y2="${g.tb}"/>
        <path class="f20-dn-q" data-t="q"/>
        <circle class="f20-dn-z" data-t="qe" r="4.5"/><circle class="f20-dn-z" data-t="qi" r="4.5"/>
        <line class="f20-dn-imlec" data-t="iml" y1="${g.tb - 44}" y2="${g.tb + 44}"/>
        ${d ? `<text class="f20-sm f20-k" x="${g.x0 - 4}" y="${g.tb - 12}" text-anchor="end">akım</text><text class="f20-sm" x="${g.x0 - 4}" y="${g.tb + 4}" text-anchor="end">+ insp.</text><text class="f20-sm" x="${g.x0 - 4}" y="${g.tb + 20}" text-anchor="end">− eksp.</text>`
          : `<text class="f20-sm f20-k" x="${g.x0 - 6}" y="${g.tb - 14}" text-anchor="end">akım</text><text class="f20-sm" x="${g.x0 - 6}" y="${g.tb + 2}" text-anchor="end">+ insp.</text><text class="f20-sm" x="${g.x0 - 6}" y="${g.tb + 18}" text-anchor="end">− eksp.</text>`}
        <text class="f20-tk" x="${g.x1}" y="${g.tb - 32}" text-anchor="end">±1,2 L/s</text>
        <text class="f20-sm" data-t="per" x="${g.x1}" y="${g.tb + (d ? 56 : 62)}" text-anchor="end"></text>
        <text class="f20-sm" data-t="hiz" x="${g.x0}" y="${g.tb + (d ? 56 : 62)}"></text>
      </svg>`;
    };
    const ciz = () => {
      if (!G) return;
      const g = G.g, T = G.T, X = g.X, Y = g.Y, h = H, d = g.dar;
      if (G.h !== h) {
        G.h = h;
        const st = Math.max(1, Math.floor(h.N / 320)); let p = [];
        for (let k = 0; k < h.N; k += st) p.push([X(h.ppl[k]), Y(h.V[k])]);
        at(T.dong, 'd', yol(p) + 'Z');
        const okA = (k0, k1) => { const a = [X(h.ppl[k0]), Y(h.V[k0])], b = [X(h.ppl[k1]), Y(h.V[k1])]; return ucD(b[0], b[1], Math.atan2(b[1] - a[1], b[0] - a[0]), 8); };
        const ki = Math.round(h.i1 * 0.5), ke = Math.round((h.i1 + h.N) / 2), dk = Math.max(2, Math.round(h.N / 200));
        at(T.ok, 'd', okA(ki - dk, ki + dk) + okA(ke - dk, ke + dk));
        const ze = h.ze, zi = h.zi, sl = (zi.v - ze.v) / (zi.p - ze.p);
        at(T.ze, 'cx', X(ze.p)); at(T.ze, 'cy', Y(ze.v)); at(T.zi, 'cx', X(zi.p)); at(T.zi, 'cy', Y(zi.v));
        at(T.dc, 'x1', X(ze.p + 1)); at(T.dc, 'y1', Y(ze.v + sl)); at(T.dc, 'x2', X(zi.p - 1)); at(T.dc, 'y2', Y(zi.v - sl));
        const ok = h.oran >= 0.95;
        T.dc.classList.toggle('krit', !ok); T.lgc.classList.toggle('krit', !ok);
        at(T.tze, 'x', X(ze.p) + (d ? 6 : 8)); at(T.tze, 'y', Y(ze.v) + (d ? 20 : 22));
        at(T.tzi, 'x', X(zi.p) - (d ? 22 : 30)); at(T.tzi, 'y', Y(zi.v) - (d ? 9 : 12));
        const Cr = Math.round(h.C);
        yaz(T.lgt, d ? `dinamik ${Cr}` : `dinamik ${Cr} mL/cmH₂O`);
        p = []; for (let k = 0; k <= h.N; k += st) { const j = Math.min(k, h.N - 1); p.push([g.x0 + (k / h.N) * (g.x1 - g.x0), g.tb - h.q[j] * g.tk]); }
        at(T.q, 'd', yol(p));
        at(T.qe, 'cx', g.x0); at(T.qe, 'cy', g.tb); at(T.qi, 'cx', g.x0 + (h.zi.k / h.N) * (g.x1 - g.x0)); at(T.qi, 'cy', g.tb);
        const Tg = Math.max(2, h.T), yv = Tg / h.T;
        yaz(T.per, d ? `bir döngü (${fmt(h.T, 1)} s)` : `bir solunum döngüsü (${fmt(h.T, 1)} s)`);
        yaz(T.hiz, RM ? '' : yv > 1.01 ? (d ? `${fmt(yv, 1)} kat yavaş` : `gerçek hızdan ${fmt(yv, 1)} kat yavaş gösteriliyor`) : (d ? 'gerçek hızda' : 'gerçek hızda gösteriliyor'));
        // çipler ve açıklama
        const alan = h.alanM / REF0;
        yaz(O.cdv, `${Cr} mL/cmH₂O`); yaz(O.co, fmt(h.oran, 2)); yaz(O.ca, `×${fmt(alan, 1)}`);
        O.cd.classList.toggle('ok', ok); O.cd.classList.toggle('krit', !ok);
        if (yolK === 'astim') cap(`<b>Akut astım, ${RR}/dk.</b> Döngü belirgin genişler (×${fmt(alan, 1)}) ve akımın durduğu noktaları birleştiren çizgi yatıklaşır: dinamik kompliyans ${Cr} mL/cmH₂O, statik değerin %${Math.round(h.oran * 100)}'ü. Dar hava yolunun arkasındaki birim kısa inspirasyon süresinde dolamaz; solunum sayısı arttıkça fark büyür. [[K1 s. 85–86]]`);
        else if (RR === 10) cap('<b>10/dk, normal hava yolu.</b> Akımın durduğu iki nokta (ekspirasyon ve inspirasyon sonu) birleştirilince dinamik kompliyans bulunur: burada statik eğimle aynıdır, 200 mL/cmH₂O. Dar döngü, hava yolu direncini yenmek için harcanan küçük enerjiyi gösterir. [[K1 s. 85–86]]');
        else cap(`<b>${RR}/dk, normal hava yolu.</b> Aynı tidal hacim daha kısa sürede alınır, akım hızlanır ve döngü genişler (döngü alanı ×${fmt(alan, 1)}). Akciğer birimleri eşit hızla dolduğu için akımın durduğu noktalar yine statik eğri üzerindedir: dinamik kompliyans ≈ 200 mL/cmH₂O (Atlas notu). [[K1 s. 85]]`);
      }
      const k = Math.min(h.N - 1, Math.floor(faz * h.N));
      gos(T.nok, !RM); gos(T.iml, !RM);
      if (!RM) {
        at(T.nok, 'cx', X(h.ppl[k])); at(T.nok, 'cy', Y(h.V[k]));
        const xi = g.x0 + faz * (g.x1 - g.x0); at(T.iml, 'x1', xi); at(T.iml, 'x2', xi);
      }
    };
    const yeni = () => {
      H = hesap(yolK, RR); bas(kok, 'y', yolK);
      IN.rr.value = RR; yaz(O.vrr, `${RR} /dk`); IN.rr.setAttribute('aria-valuetext', `${RR} soluk/dakika`);
      kirli = true; ciz();
    };
    kok.addEventListener('click', (e) => {
      const y = e.target.closest('[data-y]'); if (y) { yolK = y.dataset.y; yeni(); return; }
      const hz = e.target.closest('[data-h]'); if (hz) { if (hz.dataset.h === 'a') { yolK = 'normal'; RR = 10; } else { yolK = 'astim'; RR = 30; } yeni(); return; }
      if (e.target.closest('[data-a="oyn"]')) { oyn = !oyn; yaz(BO, oyn ? 'Durdur' : 'Oynat'); }
    });
    kok.addEventListener('input', (e) => { const s = e.target.closest('[data-s="rr"]'); if (!s) return; RR = +s.value; yeni(); });
    const kur = (dar) => {
      kok.classList.toggle('f20-dar', dar);
      const g = dar ? DAR : GEN;
      O.sahne.innerHTML = svgH(g);
      G = { g, T: topla(O.sahne, 'data-t'), h: null };
      ciz();
    };
    const durRO = duyarli(el, kur);
    if (!G) kur(false);
    yeni();
    const durT = ticker(el, (dt) => {
      if (oyn) { faz = (faz + dt / Math.max(2, H.T)) % 1; kirli = true; }
      if (kirli) { ciz(); kirli = false; }
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     5 · bölgesel ventilasyon: tepe ve taban aynı eğride
     ===================================================================== */
  VIZ.f20_bolgesel = (el) => {
    const cap = capci(el);
    const Vp = (p) => 100 * sig((-p - 5) / 2.5);
    const CAP = {
      frc: "<b>FRC'de.</b> Yerçekimi nedeniyle intraplevral basınç tepede daha negatif (−10 cmH₂O), tabanda daha az negatiftir (−3 cmH₂O). Tepe alveolleri eğrinin üst, yatık bölümünde neredeyse en büyük hacimlerindeyken taban alveolleri az şişmiştir: tepe \"daha havalı\"dır. [[K1 s. 86–87]]",
      ins: '<b>Tidal inspirasyon.</b> İnspiratuvar kaslar intraplevral basıncı her yerde 3 cmH₂O düşürür: tepe −13, taban −6 cmH₂O. Taban eğrinin dik bölümünde olduğu için hacmi çok daha fazla artar: taban daha kompliyandır ve daha iyi ventile olur. [[K1 s. 87]]',
    };
    let f = RM ? 1 : 0, oyn = null, tw = null, G = null, kirli = true, gst = RM ? 'ins' : 'frc';

    el.innerHTML = `<div class="f20-bg">
      <div class="f20-ctl">
        ${segH('Solunum anı', 'b', [['frc', "FRC'de"], ['ins', 'İnspirasyon sonunda']])}
        ${RM ? '' : '<button type="button" class="btn" data-a="oyn">Oynat ▶</button>'}
      </div>
      <div class="f20-sahne" data-o="sahne"></div>
      <div class="f20-cips" data-o="cips">
        <span class="f20-cip tepe" data-o="ct"></span>
        <span class="f20-cip taban" data-o="cb"></span>
        <span class="f20-cip" data-o="cr"></span>
      </div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), BO = kok.querySelector('[data-a="oyn"]');
    const GEN = { dar: false, vb: '0 0 720 380', X: (p) => 330 + (5 - p) * 14, Y: (v) => 330 - v * 2.9, x0: 330, x1: 680, y0: 330, y1: 40, at: [140, 80], ab: [140, 270], k: 4, cubx: 250, xt: [5, 0, -3, -6, -10, -13, -15, -20] };
    const DAR = { dar: true, vb: '0 0 360 610', X: (p) => 45 + (5 - p) * 12, Y: (v) => 540 - v * 2.5, x0: 45, x1: 345, y0: 540, y1: 290, at: [150, 62], ab: [150, 198], k: 3.2, cubx: 316, xt: [0, -3, -6, -10, -13, -20] };
    const svgH = (g) => {
      const X = g.X, Y = g.Y, d = g.dar, gid = 'f20-bg-gr' + (d ? 'd' : 'g'), cid = 'f20-bg-gc' + (d ? 'd' : 'g');
      const lung = d ? 'M150 10C196 10 220 52 226 110C232 168 238 220 236 246Q150 222 64 246C62 220 68 168 74 110C80 52 104 10 150 10Z'
        : 'M140 20C190 20 214 70 220 140C226 210 232 290 230 336Q140 300 50 336C48 290 54 210 60 140C66 70 90 20 140 20Z';
      const cp = []; for (let p = 5; p >= -20.001; p -= 0.25) cp.push([X(p), Y(Vp(p))]);
      const koyu = [-3, -6, -10, -13];
      const ct = d ? [60, 236] : [80, 270];
      return `<svg class="f20-svg" viewBox="${g.vb}" role="img" aria-label="Dik akciğerde tepe ve taban alveolü ve bölgesel basınç–hacim eğrisi: aynı 3 cmH₂O düşüş tabanda çok daha büyük hacim artışı oluşturur">
        <defs>
          <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--c-clin-soft)"/><stop offset="1" style="stop-color:var(--c-basic-soft)"/></linearGradient>
          <linearGradient id="${cid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--c-clin)"/><stop offset="1" style="stop-color:var(--c-basic)"/></linearGradient>
        </defs>
        <path class="f20-bg-akc0" d="${lung}"/>
        <path d="${lung}" style="fill:url(#${gid});opacity:.6"/>
        <path class="f20-bg-akc" d="${lung}"/>
        <path class="f20-bg-dyf" d="${d ? 'M30 252 Q150 214 270 252' : 'M34 344 Q140 304 246 344'}"/>
        <rect x="${g.cubx}" y="${ct[0] - 18}" width="12" height="${ct[1] - ct[0] + 36}" rx="6" style="fill:url(#${cid})"/>
        <text class="f20-sm f20-k" x="${g.cubx + 6}" y="${ct[0] - 26}" text-anchor="middle">Ppl</text>
        <text class="f20-mn f20-k f20-c-gk" data-t="pt" x="${g.cubx + (d ? -6 : 18)}" y="${ct[0] + 4}" text-anchor="${d ? 'end' : 'start'}"></text>
        <text class="f20-mn f20-k f20-c-akc" data-t="pb" x="${g.cubx + (d ? -6 : 18)}" y="${ct[1] + 4}" text-anchor="${d ? 'end' : 'start'}"></text>
        <circle class="f20-bg-at" data-t="at" cx="${g.at[0]}" cy="${g.at[1]}" r="30"/>
        <circle class="f20-bg-ab" data-t="ab" cx="${g.ab[0]}" cy="${g.ab[1]}" r="20"/>
        <text class="f20-lb f20-c-gk" x="${d ? 6 : 8}" y="${g.at[1] + 5}">tepe</text>
        <text class="f20-lb f20-c-akc" x="${d ? 6 : 8}" y="${g.ab[1] + 5}">taban</text>
        <path class="f20-bg-yc" d="M${d ? 24 : 26} ${d ? 96 : 128}V${d ? 160 : 208}"/><path class="f20-bg-ych" d="${ucD(d ? 24 : 26, d ? 166 : 214, Math.PI / 2, 7)}"/>
        <text class="f20-sm" x="${d ? 6 : 8}" y="${d ? 88 : 120}">yerçekimi</text>
        <line class="f20-ax" x1="${g.x0}" y1="${g.y0}" x2="${g.x1}" y2="${g.y0}"/><line class="f20-ax" x1="${g.x0}" y1="${g.y1}" x2="${g.x0}" y2="${g.y0}"/>
        ${g.xt.map((p) => `<line class="f20-tik" x1="${n2(X(p))}" x2="${n2(X(p))}" y1="${g.y0}" y2="${g.y0 + 5}"/><text class="f20-tk${koyu.includes(p) ? ' f20-koyu' : ''}" x="${n2(X(p))}" y="${g.y0 + 18}" text-anchor="middle">${p > 0 ? '+' + p : fmt(p, 0)}</text>`).join('')}
        ${[0, 50, 100].map((v) => `<line class="f20-tik" x1="${g.x0 - 5}" x2="${g.x0}" y1="${n2(Y(v))}" y2="${n2(Y(v))}"/><text class="f20-tk" x="${g.x0 - 8}" y="${n2(Y(v) + 4)}" text-anchor="end">${v}</text>`).join('')}
        ${d ? `<text class="f20-sm" x="${(g.x0 + g.x1) / 2}" y="${g.y0 + 38}" text-anchor="middle">İntraplevral basınç (cmH₂O) → daha negatif</text>`
          : `<text class="f20-sm" x="480" y="${g.y0 + 40}" text-anchor="middle">İntraplevral basınç (cmH₂O)</text><text class="f20-sm" x="${g.x1}" y="${g.y0 + 40}" text-anchor="end">→ daha negatif</text>`}
        <text class="f20-sm" x="${g.x0 + 6}" y="${g.y1 - 14}">bölge hacmi (% en büyük)</text>
        <path class="f20-bg-egri" d="${yol(cp)}"/>
        <circle class="f20-bg-hal t" data-t="ht" r="7"/><circle class="f20-bg-hal b" data-t="hb" r="7"/>
        <path class="f20-bg-dp" data-t="dp"/><path class="f20-bg-dph" data-t="dph"/>
        <path class="f20-bg-ay t" data-t="yt"/><path class="f20-bg-ay b" data-t="yb"/>
        <text class="f20-sm f20-hl" data-t="dpt" text-anchor="middle"></text><text class="f20-sm f20-hl" data-t="dpb" text-anchor="middle"></text>
        <text class="f20-big f20-c-gk f20-hl" data-t="dvt"></text><text class="f20-big f20-c-akc f20-hl" data-t="dvb"></text>
        <circle class="f20-bg-nt" data-t="nt" r="7"/><circle class="f20-bg-nb" data-t="nb" r="7"/>
      </svg>`;
    };
    const ciz = () => {
      if (!G) return;
      const g = G.g, T = G.T, X = g.X, Y = g.Y;
      const pt = -10 - 3 * f, pb = -3 - 3 * f, vt0 = Vp(-10), vb0 = Vp(-3), vt = Vp(pt), vb = Vp(pb), dvt = vt - vt0, dvb = vb - vb0;
      const tam = Math.abs(f - Math.round(f)) < 1e-6;
      yaz(T.pt, tam ? fmt(pt, 0) : fmt(pt, 1)); yaz(T.pb, tam ? fmt(pb, 0) : fmt(pb, 1));
      at(T.at, 'r', g.k * Math.sqrt(vt)); at(T.ab, 'r', g.k * Math.sqrt(vb));
      at(T.nt, 'cx', X(pt)); at(T.nt, 'cy', Y(vt)); at(T.nb, 'cx', X(pb)); at(T.nb, 'cy', Y(vb));
      const v = f > 0.02;
      ['ht', 'hb', 'dp', 'dph', 'yt', 'yb', 'dpt', 'dpb', 'dvt', 'dvb'].forEach((k) => gos(T[k], v));
      if (v) {
        at(T.ht, 'cx', X(-10)); at(T.ht, 'cy', Y(vt0)); at(T.hb, 'cx', X(-3)); at(T.hb, 'cy', Y(vb0));
        let dP = '', dH = '';
        [[-10, pt, vt0], [-3, pb, vb0]].forEach(([p0, p1, v0]) => {
          const x0 = X(p0) + 9, x1 = X(p1), y = Y(v0);
          if (x1 - x0 > 8) { dP += `M${n2(x0)} ${n2(y)}H${n2(x1 - 5)}`; dH += ucD(x1, y, 0, 6); }
        });
        at(T.dp, 'd', dP); at(T.dph, 'd', dH);
        const br = (p1, v0, v1) => { const x = X(p1) + (g.dar ? 10 : 12), ya = Y(v1), yb2 = Y(v0); return `M${n2(x - 5)} ${n2(ya)}H${n2(x)}V${n2(yb2)}H${n2(x - 5)}`; };
        at(T.yt, 'd', br(pt, vt0, vt)); at(T.yb, 'd', br(pb, vb0, vb));
        const dps = `ΔP ${tam ? fmt(3 * f, 0) : fmt(3 * f, 1)}`;
        yaz(T.dpt, dps); yaz(T.dpb, dps);
        at(T.dpt, 'x', (X(-10) + X(pt)) / 2); at(T.dpt, 'y', Y(vt0) + 17);
        at(T.dpb, 'x', (X(-3) + X(pb)) / 2); at(T.dpb, 'y', Y(vb0) + 17);
        yaz(T.dvt, `ΔV +${Math.round(dvt)}`); yaz(T.dvb, `ΔV +${Math.round(dvb)}`);
        const ox = g.dar ? 16 : 20;
        at(T.dvt, 'x', X(pt) + ox); at(T.dvt, 'y', (Y(vt) + Y(vt0)) / 2 + 5);
        at(T.dvb, 'x', X(pb) + ox); at(T.dvb, 'y', (Y(vb) + Y(vb0)) / 2 + 5);
      }
      // çipler
      if (!v) { yaz(O.ct, `Tepe: %${Math.round(vt0)}`); yaz(O.cb, `Taban: %${Math.round(vb0)}`); gos(O.cr, false); }
      else {
        yaz(O.ct, `Tepe: %${Math.round(vt0)} → %${Math.round(vt)} (Δ ${Math.round(dvt)})`);
        yaz(O.cb, `Taban: %${Math.round(vb0)} → %${Math.round(vb)} (Δ ${Math.round(dvb)})`);
        gos(O.cr, dvt > 0.5); yaz(O.cr, `Taban ≈ ${fmt(dvb / dvt, 1)} kat`);
      }
      bas(kok, 'b', gst);
      cap(CAP[gst]);
    };
    kok.addEventListener('click', (e) => {
      const b = e.target.closest('[data-b]');
      if (b) {
        oyn = null; if (BO) yaz(BO, 'Oynat ▶');
        gst = b.dataset.b; const hedef = gst === 'ins' ? 1 : 0;
        if (RM) { f = hedef; tw = null; } else tw = { a: f, b: hedef, t: 0 };
        kirli = true; ciz(); return;
      }
      if (e.target.closest('[data-a="oyn"]')) {
        if (oyn) { oyn = null; yaz(BO, 'Oynat ▶'); }
        else { tw = null; oyn = { t: f >= 1 ? 2 : f * 2 }; yaz(BO, 'Durdur'); }
      }
    });
    const kur = (dar) => {
      kok.classList.toggle('f20-dar', dar);
      const g = dar ? DAR : GEN;
      O.sahne.innerHTML = svgH(g);
      G = { g, T: topla(O.sahne, 'data-t') };
      ciz();
    };
    const durRO = duyarli(el, kur);
    if (!G) kur(false);
    const durT = ticker(el, (dt) => {
      if (tw) { tw.t += dt; const q = clamp(tw.t / 0.7, 0, 1); f = lerp(tw.a, tw.b, ease(q)); if (q >= 1) tw = null; kirli = true; }
      if (oyn) {
        oyn.t = (oyn.t + dt) % 4;
        f = oyn.t < 2 ? oyn.t / 2 : 1 - (oyn.t - 2) / 2;
        gst = oyn.t < 2 ? 'ins' : 'frc';
        kirli = true;
      }
      if (kirli) { ciz(); kirli = false; }
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     6 · en uygun PEEP: şematik ARDS eğrisinde tidal soluk
     ===================================================================== */
  VIZ.f20_peep = (el) => {
    const cap = capci(el);
    const KG = 70, VMAX = 1200, LIP = 18 - 6 * Math.log(2 + Math.sqrt(3)), UIP = 18 + 6 * Math.log(2 + Math.sqrt(3));
    const Vp = (P) => VMAX * sig((P - 18) / 6);
    const Pv = (V) => { const s = V / VMAX; return 18 + 6 * Math.log(s / (1 - s)); };
    let peep = 0, mlkg = 6, sp = 0, sv = 6 * KG, tw = null, G = null, kirli = true;

    el.innerHTML = `<div class="f20-pp">
      <div class="f20-ctl">${segH('Hızlı PEEP seçimi', 'p', [['0', 'PEEP 0'], ['14', 'PEEP 14'], ['20', 'PEEP 20']])}</div>
      <div class="f20-sahne" data-o="sahne"></div>
      <div class="f20-cips" data-o="cips">
        <span class="f20-cip">VT <b data-o="cvt"></b></span>
        <span class="f20-cip">PEEP <b data-o="cpe"></b></span>
        <span class="f20-cip">Pplato <b data-o="cpp"></b></span>
        <span class="f20-cip">ΔP <b data-o="cdp"></b></span>
        <span class="f20-cip" data-o="cc">C <b data-o="ccv"></b></span>
      </div>
      <div data-o="uy"></div>
      <div class="f20-alt"><div class="f20-rngs">
        ${rng('p', 'PEEP', 0, 20, 1, 0, 'PEEP, cmH₂O')}
        ${rng('v', 'Tidal hacim', 4, 10, 1, 6, 'Tidal hacim, mL/kg')}
      </div></div>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o'), IN = topla(kok, 'data-s');
    const GEN = { dar: false, vb: '0 0 720 362', X: (P) => 80 + P * (600 / 45), Y: (V) => 310 - V * (270 / 1300), x0: 80, x1: 680, y0: 310, y1: 40 };
    const DAR = { dar: true, vb: '0 0 360 384', X: (P) => 60 + P * (285 / 45), Y: (V) => 330 - V * (290 / 1300), x0: 60, x1: 345, y0: 330, y1: 40 };
    const svgH = (g) => {
      const X = g.X, Y = g.Y, d = g.dar, H = g.y0 - g.y1;
      const cp = []; for (let P = 0; P <= 45.001; P += 0.25) cp.push([X(P), Y(Vp(P))]);
      const bant = (a, b, cls) => `<rect class="${cls}" x="${n2(X(a))}" y="${g.y1}" width="${n2(X(b) - X(a))}" height="${H}"/>`;
      const bAd = d
        ? `<text class="f20-sm f20-c-crit f20-eng" x="${n2((X(0) + X(LIP)) / 2)}" y="${g.y1 - 8}" text-anchor="middle">kollaps</text>
           <text class="f20-sm f20-c-ok f20-eng" x="${n2((X(LIP) + X(UIP)) / 2)}" y="${g.y1 - 8}" text-anchor="middle">en dik</text>
           <text class="f20-sm f20-c-crit f20-eng" x="${n2((X(UIP) + X(45)) / 2)}" y="${g.y1 - 8}" text-anchor="middle">aşırı gerilme</text>`
        : `<text class="f20-sm f20-c-crit f20-eng" x="${n2((X(0) + X(LIP)) / 2)}" y="${g.y1 - 8}" text-anchor="middle">kollaps ve yeniden açılma</text>
           <text class="f20-sm f20-c-ok f20-eng" x="${n2((X(LIP) + X(UIP)) / 2)}" y="${g.y1 - 8}" text-anchor="middle">en kompliyan bölüm</text>
           <text class="f20-sm f20-c-crit f20-eng" x="${n2((X(UIP) + X(45)) / 2)}" y="${g.y1 - 8}" text-anchor="middle">aşırı gerilme</text>`;
      const xt = d ? [0, 10, 20, 30, 40] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];
      return `<svg class="f20-svg" viewBox="${g.vb}" role="img" aria-label="Şematik ARDS basınç–hacim eğrisi: alt ve üst infleksiyon noktaları, 30 cmH₂O plato sınırı ve PEEP'ten plato basıncına uzanan tidal soluk">
        ${bant(0, LIP, 'f20-pp-bk')}${bant(LIP, UIP, 'f20-pp-by')}${bant(UIP, 45, 'f20-pp-bk')}
        ${bAd}
        <line class="f20-pp-inf" x1="${n2(X(LIP))}" x2="${n2(X(LIP))}" y1="${g.y1}" y2="${g.y0}"/><line class="f20-pp-inf" x1="${n2(X(UIP))}" x2="${n2(X(UIP))}" y1="${g.y1}" y2="${g.y0}"/>
        <text class="f20-sm f20-hl f20-eng" x="${n2(X(LIP) - 5)}" y="${g.y1 + 16}" text-anchor="end">${d ? '≈10' : 'alt infleksiyon ≈ 10'}</text>
        <text class="f20-sm f20-hl f20-eng" x="${n2(X(UIP) - 5)}" y="${g.y1 + 16}" text-anchor="end">${d ? '≈26' : 'üst infleksiyon ≈ 26'}</text>
        <line class="f20-pp-30" x1="${n2(X(30))}" x2="${n2(X(30))}" y1="${g.y1}" y2="${g.y0}"/>
        <text class="f20-mn f20-c-crit f20-k f20-hl f20-eng" x="${n2(X(30) + 5)}" y="${g.y0 - 8}">Pplato 30</text>
        <line class="f20-ax" x1="${g.x0}" y1="${g.y0}" x2="${g.x1}" y2="${g.y0}"/><line class="f20-ax" x1="${g.x0}" y1="${g.y1}" x2="${g.x0}" y2="${g.y0}"/>
        ${xt.map((P) => `<line class="f20-tik" x1="${n2(X(P))}" x2="${n2(X(P))}" y1="${g.y0}" y2="${g.y0 + 5}"/><text class="f20-tk" x="${n2(X(P))}" y="${g.y0 + 18}" text-anchor="middle">${P}</text>`).join('')}
        ${[0, 400, 800, 1200].map((V) => `<line class="f20-tik" x1="${g.x0 - 5}" x2="${g.x0}" y1="${n2(Y(V))}" y2="${n2(Y(V))}"/><text class="f20-tk" x="${g.x0 - 8}" y="${n2(Y(V) + 4)}" text-anchor="end">${V}</text>`).join('')}
        <text class="f20-sm" x="${(g.x0 + g.x1) / 2}" y="${g.y0 + (d ? 38 : 40)}" text-anchor="middle">Hava yolu (plato) basıncı (cmH₂O)</text>
        <text class="f20-sm" transform="translate(${d ? 15 : 22} ${(g.y0 + g.y1) / 2}) rotate(-90)" text-anchor="middle">${d ? 'Hacim (mL)' : "Hacim (mL, sıfır PEEP'in üstü)"}</text>
        <path class="f20-pp-egri" d="${yol(cp)}"/>
        <path class="f20-pp-ucg" data-t="ucg"/>
        <path class="f20-pp-tid" data-t="tid"/>
        <circle class="f20-pp-u" data-t="u1" r="6"/><circle class="f20-pp-u" data-t="u2" r="6"/>
        <text class="f20-mn f20-k f20-hl" data-t="tp"></text><text class="f20-mn f20-k f20-hl" data-t="tpp" text-anchor="end"></text>
        <text class="f20-sm f20-c-ac f20-k f20-hl" data-t="tdp" text-anchor="middle"></text>
        <text class="f20-sm f20-c-ac f20-k f20-hl" data-t="tvt"></text>
        <text class="f20-sm f20-c-ac f20-k f20-hl" data-t="tc" text-anchor="end"></text>
      </svg>`;
    };
    const hesap = (p, vt) => {
      const v0 = Vp(p), s = (v0 + vt) / VMAX;
      let pp = s < 0.9995 ? Pv(v0 + vt) : Infinity;
      const tavan = !(pp <= 45);
      return { v0, pp, tavan, dP: pp - p, C: vt / (pp - p) };
    };
    const ciz = () => {
      if (!G) return;
      const g = G.g, T = G.T, X = g.X, Y = g.Y, d = g.dar;
      const h = hesap(sp, sv), pe = h.tavan ? 45 : h.pp, ve = h.tavan ? Vp(45) : h.v0 + sv;
      const pts = []; for (let i = 0; i <= 40; i++) { const P = lerp(sp, pe, i / 40); pts.push([X(P), Y(Vp(P))]); }
      at(T.tid, 'd', yol(pts));
      const x1 = X(sp), y1 = Y(h.v0), x2 = X(pe), y2 = Y(ve);
      at(T.u1, 'cx', x1); at(T.u1, 'cy', y1); at(T.u2, 'cx', x2); at(T.u2, 'cy', y2);
      at(T.ucg, 'd', `M${n2(x1)} ${n2(y1)}H${n2(x2)}V${n2(y2)}`);
      const fp = (v) => fmt(v, 1);
      const ppS = h.tavan ? '> 45' : fp(h.pp), dpS = h.tavan ? `> ${fp(45 - sp)}` : fp(h.dP), cS = h.tavan ? `< ${Math.round(sv / (45 - sp))}` : String(Math.round(h.C));
      yaz(T.tp, `PEEP ${Math.round(sp)}`); yaz(T.tpp, `Pplato ${ppS}`);
      yaz(T.tdp, `ΔP ${dpS}`); at(T.tdp, 'x', (x1 + x2) / 2); at(T.tdp, 'y', y1 + 16);
      yaz(T.tvt, `VT ${Math.round(sv)}`);
      const sag = x2 + 8 + (d ? 52 : 56) < (d ? 358 : 716);
      at(T.tvt, 'x', sag ? x2 + 8 : x2 - 8); at(T.tvt, 'text-anchor', sag ? 'start' : 'end'); at(T.tvt, 'y', (y1 + y2) / 2 + 4);
      yaz(T.tc, d ? '' : `C = ${cS}`); at(T.tc, 'x', x2 - 7); at(T.tc, 'y', y1 - 8);
      gos(T.tc, !d && (x2 - x1) > 70 && (y1 - y2) > 50);
      // nokta etiketleri: sabit etiketlere ve birbirine çarpmayan ilk aday konum
      if (!G.eng || G.eng.some((b) => !b)) G.eng = [...G.svg.querySelectorAll('.f20-eng, .f20-tk')].map(kutu);
      const sinir = { x0: g.x0 + 2, x1: d ? 358 : 718, y0: 2, y1: g.y0 - 2 };
      const dinamik = [kutu(T.tdp), kutu(T.tvt), T.tc._g === false ? null : kutu(T.tc)];
      yerles(T.tp, [[x1 - 9, y1 - 9, 'end'], [x1 + 8, y1 - 12, 'start'], [x1 - 10, y1 + 5, 'end']], G.eng.concat(dinamik), sinir);
      yerles(T.tpp, [[x2 - 9, y2 - 9, 'end'], [x2 - 11, y2 + 5, 'end'], [x2 + 9, y2 - 9, 'start'], [x2 + 10, y2 + 5, 'start'], [x2 - 9, y2 + 20, 'end'], [x2 - 12, y2 + 34, 'end'], [x2 - 12, y2 + 48, 'end']], G.eng.concat(dinamik, [kutu(T.tp)]), sinir);
      // çipler, uyarılar, açıklama (hedef değerlerle)
      const H = hesap(peep, mlkg * KG), vt = mlkg * KG;
      const PPs = H.tavan ? '> 45' : fp(H.pp), DPs = H.tavan ? `> ${fp(45 - peep)}` : fp(H.dP), Cs = H.tavan ? `< ${Math.round(vt / (45 - peep))}` : String(Math.round(H.C));
      yaz(O.cvt, `${vt} mL`); yaz(O.cpe, String(peep)); yaz(O.cpp, PPs); yaz(O.cdp, DPs); yaz(O.ccv, `${Cs} mL/cmH₂O`);
      yaz(O.vp, `${peep} cmH₂O`); yaz(O.vv, `${mlkg} mL/kg × 70 kg = ${vt} mL`);
      IN.p.setAttribute('aria-valuetext', `${peep} cmH₂O`); IN.v.setAttribute('aria-valuetext', `${mlkg} mL/kg, ${vt} mL`);
      const asiri = H.tavan || H.pp > UIP, alt = peep < LIP, ust30 = H.tavan || H.pp > 30;
      const uy = [];
      if (alt) uy.push(['', 'Ekspirasyon sonu alt infleksiyon noktasının altında.']);
      if (asiri) uy.push(['', 'İnspirasyon sonu üst infleksiyon noktasının üstünde: aşırı gerilme.']);
      if (ust30) uy.push(['', "Pplato 30 cmH₂O'yu aşıyor."]);
      if (!uy.length) uy.push(['ok', 'Tidal soluk eğrinin en dik bölümünde.']);
      const uyH = uy.map(([c, t]) => `<p class="f20-uyari ${c}">${t}</p>`).join('');
      if (O.uy._h !== uyH) { O.uy.innerHTML = uyH; O.uy._h = uyH; }
      const iyi = uy[0][0] === 'ok'; O.cc.classList.toggle('ok', iyi); O.cc.classList.toggle('krit', !iyi);
      bas(kok, 'p', [0, 14, 20].includes(peep) ? peep : '-');
      let c;
      if (asiri) c = `<b>İnspirasyon sonu üst infleksiyon noktasının üstünde.</b> Soluğun sonu eğrinin üst, yatık bölümüne taşıyor: alveoller aşırı gerilir ve aynı hacim için çok daha büyük basınç gerekir (C ${Cs} mL/cmH₂O). Pplato ${PPs} cmH₂O. [[K1 s. 87]]` + (ust30 ? ' Plato basıncı 30 cmH₂O sınırını aşıyor. [[K1 s. 51]]' : '');
      else if (alt) c = `<b>Ekspirasyon sonu alt infleksiyon noktasının altında.</b> Soluk eğrinin yatık alt bölümünden başlar: aynı hacim için daha büyük basınç gerekir (C ${Cs} mL/cmH₂O). PEEP'i alt infleksiyon noktasının hemen üstüne çıkarmak tidal solunumu eğrinin daha kompliyan bölümüne taşır. [[K1 s. 87]]`;
      else c = `<b>Tidal soluk eğrinin en dik bölümünde.</b> Ekspirasyon sonu alt, inspirasyon sonu üst infleksiyon noktasının arasında: C ${Cs} mL/cmH₂O, Pplato ${PPs} cmH₂O. Pratikte bu nokta klinik yargıyla, 6 mL/kg tidal hacim ve güvenli tepe ve plato basınçları gözetilerek aranır. [[K1 s. 87]]`;
      cap(c);
    };
    const hedef = () => {
      IN.p.value = peep; IN.v.value = mlkg;
      const b = { p: peep, v: mlkg * KG };
      if (RM) { sp = b.p; sv = b.v; tw = null; } else tw = { a: { p: sp, v: sv }, b, t: 0 };
      kirli = true; ciz();
    };
    kok.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) { peep = +b.dataset.p; hedef(); } });
    kok.addEventListener('input', (e) => { const s = e.target.closest('[data-s]'); if (!s) return; if (s.dataset.s === 'p') peep = +s.value; else mlkg = +s.value; hedef(); });
    const kur = (dar) => {
      kok.classList.toggle('f20-dar', dar);
      const g = dar ? DAR : GEN;
      O.sahne.innerHTML = svgH(g);
      G = { g, T: topla(O.sahne, 'data-t'), svg: O.sahne.firstElementChild, eng: null };
      ciz();
    };
    const durRO = duyarli(el, kur);
    if (!G) kur(false);
    const durT = ticker(el, (dt) => {
      if (tw) { tw.t += dt; const q = clamp(tw.t / 0.25, 0, 1), f = ease(q); sp = lerp(tw.a.p, tw.b.p, f); sv = lerp(tw.a.v, tw.b.v, f); if (q >= 1) tw = null; kirli = true; }
      if (kirli) { ciz(); kirli = false; }
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     7 · tanım: kompliyans = eğim; yüksek/düşük kompliyans, elastik enerji, FRC dengesi
     ===================================================================== */
  VIZ.f20_tanim = (el) => {
    const cap = capci(el);
    const VT = 500;
    const D = {
      n: { C: 200, r: 'ac', ad: 'Normal · FRC' },
      y: { C: 500, r: 'warn', ad: 'Yüksek kompliyans' },
      d: { C: 50, r: 'crit', ad: 'Düşük kompliyans' },
    };
    const SIRA = ['y', 'n', 'd'];
    const CAP = {
      n: "<b>Normal, FRC'de: 200 mL/cmH₂O.</b> 500 mL'lik tidal hacim için 2,5 cmH₂O transpulmoner basınç yeter. Akciğer en kompliyan durumuna FRC'de, akciğerin içe geri çekilmesiyle göğüs kafesinin dışa yaylanmasının dengelendiği dinlenme noktasında ulaşır. [[K1 s. 82]]",
      y: '<b>Yüksek kompliyans (şematik 500 mL/cmH₂O).</b> 500 mL için 1,0 cmH₂O yeter; ama üçgen küçüktür: genişlemede az iş yapılır ve az elastik enerji depolanır, ekspirasyon zorlaşır. [[K1 s. 82]]',
      d: '<b>Düşük kompliyans (şematik 50 mL/cmH₂O).</b> Aynı 500 mL için 10 cmH₂O gerekir; üçgen büyüktür: solunum kasları inspirasyonda çok daha fazla iş yapar ve solunum yetmezliği gelişebilir. [[K1 s. 82]]',
    };
    let st = 'n', G = null;

    el.innerHTML = `<div class="f20-tn">
      <div class="f20-ctl">${segH('Kompliyans durumu', 'd', [['n', 'Normal · FRC'], ['y', 'Yüksek kompliyans'], ['d', 'Düşük kompliyans']])}</div>
      <div class="f20-sahne" data-o="sahne"></div>
      <div class="f20-cips">
        <span class="f20-cip f20-tn-cip" data-o="c1">C <b data-o="cc"></b></span>
        <span class="f20-cip f20-tn-cip" data-o="c2">500 mL için <b data-o="cp"></b></span>
        <span class="f20-cip f20-tn-cip" data-o="c3">elastik enerji <b data-o="ce"></b></span>
      </div>
      <p class="f20-tn-not">Δ basınç spontan solunumda negatif (plevra basıncı düşer), IPPV'de pozitif (hava yolu basıncı artar).</p>
    </div>`;
    const kok = el.firstElementChild, O = topla(kok, 'data-o');

    /* geniş: grafik solda, FRC şeması sağda; dar: alt alta */
    const GEN = {
      dar: false, vb: '0 0 720 360', x0: 70, x1: 430, y0: 310, y1: 40, k: 30, kv: 0.45,
      xadY: 345, yadX: 22, tkY: 326,
      etk: { y: ['C 500', 112, 36, 'start'], n: ['C 200', 166, 36, 'start'], d: ['C 50 mL/cmH₂O', 352, 142, 'start'] },
      kutu: { x: 220, y: 212, w: 205, h: 88 },
      frc: { cx: 590, ust: 75, alt: 275, yg: 90, ic: 18, ok: 24, bas: 30, gk: 64, sat: [300, 316, 332] },
    };
    const DAR = {
      dar: true, vb: '0 0 360 676', x0: 55, x1: 345, y0: 300, y1: 20, k: 290 / 12, kv: 280 / 600,
      xadY: 338, yadX: 16, tkY: 317,
      etk: { y: ['500', 84, 16, 'end'], n: ['200', 132, 16, 'start'], d: ['50', 300, 108, 'start'] },
      kutu: { x: 20, y: 352, w: 320, h: 50 },
      frc: { cx: 180, ust: 462, alt: 606, yg: 80, ic: 16, ok: 18, bas: 424, gk: 449, sat: [630, 646, 662] },
    };

    const svgH = (g) => {
      const X = (p) => g.x0 + g.k * p, Y = (v) => g.y0 - g.kv * v, d = g.dar, yVT = Y(VT);
      const xt = [0, 2, 4, 6, 8, 10, 12], yt = [0, 100, 200, 300, 400, 500, 600];
      const cizgi = (k) => {
        const C = D[k].C, pe = Math.min(12, 600 / C), ve = C * pe, dp = VT / C;
        const x2 = X(pe), y2 = Y(ve), px = X(dp);
        return `<g class="f20-tn-g ${D[k].r}" data-g="${k}">
          <line class="f20-tn-hit" data-d="${k}" x1="${g.x0}" y1="${g.y0}" x2="${n2(x2)}" y2="${n2(y2)}"/>
          <line class="f20-tn-ln" x1="${g.x0}" y1="${g.y0}" x2="${n2(x2)}" y2="${n2(y2)}"/>
          <line class="f20-tn-dus" data-u="${k}" x1="${n2(px)}" y1="${n2(yVT + 7)}" x2="${n2(px)}" y2="${g.y0}"/>
          <circle class="f20-tn-nk" data-d="${k}" cx="${n2(px)}" cy="${n2(yVT)}" r="6"/>
          <text class="f20-mn f20-k f20-hl f20-tn-v" x="${n2(px)}" y="${n2(yVT - 9)}" text-anchor="middle">${fmt(dp, 1)}</text>
          <text class="f20-mn f20-k f20-hl f20-tn-et" x="${g.etk[k][1]}" y="${g.etk[k][2]}" text-anchor="${g.etk[k][3]}">${g.etk[k][0]}</text>
        </g>`;
      };
      /* FRC şeması: kalkan biçimli göğüs kafesi, içinde akciğer */
      const f = g.frc, cx = f.cx, kab = (yg, ust, alt, r) => {
        const x0 = cx - yg, x1 = cx + yg, om = ust + (alt - ust) * 0.375, k1 = (alt - ust) * 0.25;
        return { d: `M${x0} ${alt}V${om}C${x0} ${om - k1} ${cx - yg * 0.56} ${ust} ${cx} ${ust}C${cx + yg * 0.56} ${ust} ${x1} ${om - k1} ${x1} ${om}V${alt}`, x0, x1, om, k1, r };
      };
      const akA = f.alt - f.ic, gk = kab(f.yg, f.ust, f.alt), ak = kab(f.yg - f.ic, f.ust + f.ic, akA - 10);
      const ustNokta = (yg, ust, om, k1) => { // t = 0,5 noktası (sol üst); sağ üst simetrik
        const P0 = [cx - yg, om], P1 = [cx - yg, om - k1], P2 = [cx - yg * 0.56, ust], P3 = [cx, ust];
        const t = 0.5, a = (1 - t) ** 3, b = 3 * (1 - t) ** 2 * t, c = 3 * (1 - t) * t * t, e = t ** 3;
        return [a * P0[0] + b * P1[0] + c * P2[0] + e * P3[0], a * P0[1] + b * P1[1] + c * P2[1] + e * P3[1]];
      };
      const mY = (f.ust + f.alt) / 2;
      const akUst = ustNokta(f.yg - f.ic, f.ust + f.ic, ak.om, ak.k1), gkUst = ustNokta(f.yg, f.ust, gk.om, gk.k1);
      const merk = [cx, mY + 4];
      const oklar = [];
      // içe: akciğer kenarından merkeze
      const ice = (p, u) => {
        const dx = merk[0] - p[0], dy = merk[1] - p[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        const x1 = p[0] + ux * 3, y1 = p[1] + uy * 3, x2 = x1 + ux * u, y2 = y1 + uy * u;
        return `<path class="f20-tn-oki" d="M${n2(x1)} ${n2(y1)}L${n2(x2 - ux * 6)} ${n2(y2 - uy * 6)}"/><path class="f20-tn-okih" d="${ucD(x2, y2, Math.atan2(uy, ux), 8)}"/>`;
      };
      const disa = (p, u) => {
        const dx = p[0] - merk[0], dy = p[1] - merk[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        const x1 = p[0] + ux * 5, y1 = p[1] + uy * 5, x2 = x1 + ux * u, y2 = y1 + uy * u;
        return `<path class="f20-tn-okd" d="M${n2(x1)} ${n2(y1)}L${n2(x2 - ux * 6)} ${n2(y2 - uy * 6)}"/><path class="f20-tn-okdh" d="${ucD(x2, y2, Math.atan2(uy, ux), 8)}"/>`;
      };
      const yanY = mY + 10;
      [[cx - (f.yg - f.ic), yanY], [cx + (f.yg - f.ic), yanY], akUst, [2 * cx - akUst[0], akUst[1]]].forEach((p) => oklar.push(ice(p, f.ok)));
      [[cx - f.yg, yanY], [cx + f.yg, yanY], gkUst, [2 * cx - gkUst[0], gkUst[1]]].forEach((p) => oklar.push(disa(p, f.ok)));
      const akD = `${ak.d}Q${ak.x1} ${akA} ${ak.x1 - 10} ${akA}H${ak.x0 + 10}Q${ak.x0} ${akA} ${ak.x0} ${akA - 10}Z`;

      const kt = g.kutu, kx = kt.x + 12;
      const kutuH = d
        ? `<rect class="f20-tn-kutu" x="${kt.x}" y="${kt.y}" width="${kt.w}" height="${kt.h}" rx="6"/>
           <rect class="f20-tn-kare" data-t="kare" x="${kx}" y="${kt.y + 11}" width="13" height="13" rx="2"/>
           <text class="f20-sm f20-tn-kt" x="${kx + 21}" y="${kt.y + 22}">taralı üçgen = depolanan elastik enerji</text>
           <text class="f20-big" data-t="oran" x="${kx + 21}" y="${kt.y + 41}"></text>`
        : `<rect class="f20-tn-kutu" x="${kt.x}" y="${kt.y}" width="${kt.w}" height="${kt.h}" rx="6"/>
           <rect class="f20-tn-kare" data-t="kare" x="${kx}" y="${kt.y + 13}" width="13" height="13" rx="2"/>
           <text class="f20-sm f20-tn-kt" x="${kx + 21}" y="${kt.y + 24}">taralı üçgen: genişletme işi</text>
           <text class="f20-sm f20-tn-kt" x="${kx + 21}" y="${kt.y + 42}">= depolanan elastik enerji</text>
           <text class="f20-big" data-t="oran" x="${kx}" y="${kt.y + 70}"></text>`;

      return `<svg class="f20-svg" viewBox="${g.vb}" role="img" aria-label="Basınç–hacim çizgileri: kompliyans eğimdir; FRC'de akciğer ile göğüs kafesi kuvvetleri dengededir">
        <polygon class="f20-tn-ucg" data-t="ucg" points=""/>
        <line class="f20-tn-vt" x1="${g.x0}" y1="${n2(yVT)}" x2="${g.x1}" y2="${n2(yVT)}"/>
        <line class="f20-ax" x1="${g.x0}" y1="${g.y0}" x2="${g.x1}" y2="${g.y0}"/><line class="f20-ax" x1="${g.x0}" y1="${g.y1}" x2="${g.x0}" y2="${g.y0}"/>
        ${xt.map((p) => `<line class="f20-tik" x1="${n2(X(p))}" x2="${n2(X(p))}" y1="${g.y0}" y2="${g.y0 + 5}"/><text class="f20-tk" x="${n2(X(p))}" y="${g.tkY}" text-anchor="middle">${p}</text>`).join('')}
        ${yt.map((v) => `<line class="f20-tik" x1="${g.x0 - 5}" x2="${g.x0}" y1="${n2(Y(v))}" y2="${n2(Y(v))}"/>${v === VT
          ? `<text class="f20-tn-vtl" x="${g.x0 - 8}" y="${n2(Y(v) + 4)}" text-anchor="end">V<tspan class="f20-tn-alt" dy="3">T</tspan><tspan dy="-3"> 500</tspan></text>`
          : `<text class="f20-tk" x="${g.x0 - 8}" y="${n2(Y(v) + 4)}" text-anchor="end">${v}</text>`}`).join('')}
        <text class="f20-sm" x="${(g.x0 + g.x1) / 2}" y="${g.xadY}" text-anchor="middle">Δ transpulmoner basınç (cmH₂O)</text>
        <text class="f20-sm" transform="translate(${g.yadX} ${(g.y0 + g.y1) / 2}) rotate(-90)" text-anchor="middle">Δ akciğer hacmi (mL)</text>
        ${SIRA.map(cizgi).join('')}
        ${kutuH}
        <text class="f20-lb" x="${cx}" y="${f.bas}" text-anchor="middle">FRC: dinlenme noktası</text>
        <text class="f20-sm f20-c-gk" x="${cx}" y="${f.gk}" text-anchor="middle">göğüs kafesi</text>
        <path class="f20-tn-akc" d="${akD}"/>
        <path class="f20-tn-gk" d="${gk.d}"/>
        <line class="f20-tn-dyf" x1="${gk.x0}" y1="${f.alt}" x2="${gk.x1}" y2="${f.alt}"/>
        <text class="f20-lb f20-c-akc" x="${cx}" y="${mY + 9}" text-anchor="middle">akciğer</text>
        ${oklar.join('')}
        <text class="f20-sm f20-c-akc" x="${cx}" y="${f.sat[0]}" text-anchor="middle">içe: akciğerin elastik geri çekilmesi</text>
        <text class="f20-sm f20-c-gk" x="${cx}" y="${f.sat[1]}" text-anchor="middle">dışa: göğüs kafesinin yaylanması</text>
        <text class="f20-sm f20-tn-k" x="${cx}" y="${f.sat[2]}" text-anchor="middle">eşit ve zıt · tidal solunum buradan başlar</text>
      </svg>`;
    };

    const ciz = () => {
      if (!G) return;
      const g = G.g, T = G.T, s = D[st], dp = VT / s.C, oran = dp / 2.5;
      const X = (p) => g.x0 + g.k * p, Y = (v) => g.y0 - g.kv * v;
      at(T.ucg, 'points', `${g.x0},${g.y0} ${g.x0},${n2(Y(VT))} ${n2(X(dp))},${n2(Y(VT))}`);
      at(T.ucg, 'class', `f20-tn-ucg ${s.r}`);
      at(T.kare, 'class', `f20-tn-kare ${s.r}`);
      yaz(T.oran, `normale göre ×${fmt(oran, 1)}`);
      G.svg.querySelectorAll('[data-g]').forEach((n) => n.classList.toggle('on', n.getAttribute('data-g') === st));
      // seçili çizgi en üstte
      const gs = [...G.svg.querySelectorAll('[data-g]')], sec = gs.find((n) => n.getAttribute('data-g') === st), son = gs[gs.length - 1];
      if (sec && sec !== son) son.after(sec);
      yaz(O.cc, `${s.C} mL/cmH₂O`); yaz(O.cp, `${fmt(dp, 1)} cmH₂O`); yaz(O.ce, `×${fmt(oran, 1)}`);
      ['c1', 'c2', 'c3'].forEach((k) => at(O[k], 'class', `f20-cip f20-tn-cip ${s.r}`));
      bas(kok, 'd', st);
      cap(CAP[st]);
    };
    kok.addEventListener('click', (e) => {
      const b = e.target.closest('[data-d]');
      if (b && D[b.getAttribute('data-d')]) { st = b.getAttribute('data-d'); ciz(); }
    });
    const kur = (dar) => {
      kok.classList.toggle('f20-dar', dar);
      const g = dar ? DAR : GEN;
      O.sahne.innerHTML = svgH(g);
      G = { g, T: topla(O.sahne, 'data-t'), svg: O.sahne.firstElementChild };
      ciz();
    };
    const durRO = duyarli(el, kur);
    if (!G) kur(false);
    return () => { durRO(); };
  };
})();
