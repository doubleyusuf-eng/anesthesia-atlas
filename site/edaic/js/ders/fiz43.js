/* Bölüm 43 · Egzersiz testleri · bileşenler (tarif: docs/tasarim/fiz43.md; K1 s. 185–186).
   Kitaptan: 9 m koni aralığı, 250 m, 10,2 / 15 / 25–40 / 97,5 mL kg⁻¹ dk⁻¹, 1 MET = 3,5, kat–MET eşlemesi.
   Temsilî: çubuk boyları, mekik protokolü, CPET eğrileri, O₂ zinciri kapasiteleri (viz-foot'larda belirtildi). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const VO = 'V̇O₂';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const mk = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  /* ms süren geçiş; RM'de anında */
  const tween = (ms, cb) => {
    if (RM || !ms) { cb(1); return () => {}; }
    let raf = 0, t0 = 0;
    const f = (t) => { if (!t0) t0 = t; const k = clamp((t - t0) / ms, 0, 1); cb(ease(k)); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  };
  const tx = (x, y, s, cls, anc, extra) => `<text class="${cls}" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}${extra || ''}>${s}</text>`;
  /* basit insan figürü (0,0 = ayak arası, yukarı negatif) */
  const insan = (cls, faz) => {
    const s = Math.sin(faz || 0) * 7;
    return `<g class="${cls}"><circle cx="0" cy="-40" r="6"/><path d="M0 -34 L0 -16 M0 -29 L${-s * 0.8} -20 M0 -29 L${s * 0.8} -20 M0 -16 L${s} 0 M0 -16 L${-s} 0"/></g>`;
  };

  /* =====================================================================
     1 · f43_talep — cerrahinin O₂ talebi ve hastanın karşılama gücü (K1 s. 185)
     ===================================================================== */
  VIZ.f43_talep = (el) => {
    const CER = [['kucuk', 'Küçük', 30], ['orta', 'Orta', 55], ['major', 'Majör', 85]];
    const REZ = [['iyi', 'İyi', 100, 'iyi rezerv'], ['kond', 'Kondisyon kaybı', 60, 'kondisyon kaybı'], ['hast', 'Kalp/akciğer hastalığı', 40, 'kalp/akciğer hastalığı']];
    let cer = 'major', rez = 'iyi', gV = 85, sV = 100, durT = () => {};
    el.innerHTML = `<div class="f43-kont">
        <div><span class="f43-lbl">Cerrahi</span>${segHtml('Cerrahi', 'cer', CER.map((c) => [c[0], c[1]]), cer)}</div>
        <div><span class="f43-lbl">Hasta rezervi</span>${segHtml('Hasta rezervi', 'rez', REZ.map((r) => [r[0], r[1]]), rez)}</div></div>
      <div class="f43-talep-g"><div class="f43-talep-svg"></div>
        <div class="f43-kartlar"><p class="f43-kart-bas">Risk yüksekse değerlendirme ne işe yarar?</p>
          <div class="f43-kart" data-k="1"><b>1</b><span>Hastayı bilgilendir: kendi riski, kararı</span></div>
          <div class="f43-kart" data-k="2"><b>2</b><span>Ekip kararı: ör. açık onarım yerine EVAR</span></div>
          <div class="f43-kart" data-k="3"><b>3</b><span>Postoperatif bakım: ör. yüksek bağımlılık yatağı</span></div></div></div>`;
    const kutu = el.querySelector('.f43-talep-svg');
    const g = el.querySelector('.f43-talep-g');
    let dar = false;
    const B = 250, H = 2; // taban y, 1 birim = 2 px
    const yy = (v) => B - v * H;
    const ciz = () => {
      kutu.innerHTML = `<svg class="f43-svg" viewBox="0 0 360 290" role="img" aria-label="Gereken V̇O₂ ve artırılabilen O₂ sunumu çubukları; aradaki açık risk">
        <defs><pattern id="f43-tar" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" class="f43-tar-z"/><path d="M0 0V7" class="f43-tar-c"/></pattern></defs>
        <line class="f43-eks" x1="62" x2="310" y1="${B}" y2="${B}"/>
        ${tx(58, B + 4, 'dinlenme', 'f43-ts', 'end')}
        <rect class="f43-bar-v" data-b="g" x="80" width="90" y="${B}" height="0" rx="4"/>
        <rect class="f43-bar-s" data-b="s" x="200" width="90" y="${B}" height="0" rx="4"/>
        <rect class="f43-acik" x="200" width="90" y="${B}" height="0"/>
        <line class="f43-gcizgi" x1="72" x2="300" y1="${B}" y2="${B}"/>
        <text class="f43-acik-t" x="245" y="0" text-anchor="middle">karşılanamayan</text>
        <text class="f43-acik-t" x="245" y="0" text-anchor="middle">talep</text>
        ${tx(125, B + 18, 'Gereken', 'f43-t f43-c-v', 'middle')}${tx(125, B + 34, VO, 'f43-t f43-c-v', 'middle')}
        ${tx(245, B + 18, 'Artırılabilen', 'f43-t f43-c-ok', 'middle')}${tx(245, B + 34, 'O₂ sunumu', 'f43-t f43-c-ok', 'middle')}
      </svg>`;
      uygula(1);
    };
    const uygula = (k0) => {
      const svg = kutu.querySelector('svg'); if (!svg) return;
      const gr = svg.querySelector('[data-b=g]'), sr = svg.querySelector('[data-b=s]'), ac = svg.querySelector('.f43-acik'), gc = svg.querySelector('.f43-gcizgi');
      const at = svg.querySelectorAll('.f43-acik-t');
      gr.setAttribute('y', yy(gV)); gr.setAttribute('height', gV * H);
      sr.setAttribute('y', yy(sV)); sr.setAttribute('height', sV * H);
      gc.setAttribute('y1', yy(gV)); gc.setAttribute('y2', yy(gV));
      const acik = gV - sV;
      if (acik > 0.5) {
        ac.setAttribute('y', yy(gV)); ac.setAttribute('height', acik * H); ac.style.display = '';
        const my = yy(gV) - 22; at[0].setAttribute('y', my); at[1].setAttribute('y', my + 14); at.forEach((t) => (t.style.display = ''));
      } else { ac.style.display = 'none'; at.forEach((t) => (t.style.display = 'none')); }
    };
    const durum = () => {
      const g1 = CER.find((c) => c[0] === cer), r1 = REZ.find((r) => r[0] === rez);
      const g0 = gV, s0 = sV;
      durT();
      durT = tween(400, (k) => { gV = g0 + (g1[2] - g0) * k; sV = s0 + (r1[2] - s0) * k; uygula(); });
      const acik = g1[2] > r1[2];
      el.querySelectorAll('.f43-kart').forEach((c) => c.classList.toggle('on', acik));
      g.classList.toggle('f43-acikvar', acik);
      let h;
      if (!acik && cer === 'kucuk') h = '<b>Küçük cerrahi.</b> Stres yanıtı cerrahi travmanın şiddetiyle orantılıdır; küçük girişimde V̇O₂ artışı küçüktür. [[K1 s. 185]]';
      else if (!acik) h = `<b>${g1[1]} cerrahi, ${r1[3]}.</b> Hasta O₂ sunumunu artırarak yükselen V̇O₂'yi karşılar. [[K1 s. 185]]`;
      else if (rez === 'kond') h = `<b>${g1[1]} cerrahi, kondisyon kaybı.</b> Fiziksel kondisyonu düşük hasta O₂ sunumunu yeterince artıramaz; artan V̇O₂ karşılanamaz ve komplikasyon riski yükselir. [[K1 s. 185]]`;
      else h = `<b>${g1[1]} cerrahi, kalp/akciğer hastalığı.</b> Solunum ve kardiyovasküler eşlik eden hastalıklar O₂ sunumunun artışını büyük ölçüde sınırlar. [[K1 s. 185]]`;
      return h;
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cer],[data-rez]'); if (!b) return;
      if (b.dataset.cer) { cer = b.dataset.cer; basSec(el, 'cer', cer); } else { rez = b.dataset.rez; basSec(el, 'rez', rez); }
      capYaz(el, durum());
    });
    const ro = darIzle(el, (d) => { dar = d; g.classList.toggle('f43-dar', dar); ciz(); });
    durum();
    return () => { durT(); ro(); };
  };

  /* =====================================================================
     2 · f43_mekik — artan hızlı mekik yürüme testi (K1 s. 185)
     ===================================================================== */
  VIZ.f43_mekik = (el) => {
    const SN = 4; // 1 basamak = 4 s gerçek zaman
    const mekikOnce = (n) => { let s = 0; for (let k = 1; k < n; k++) s += k + 2; return s; }; // n. basamaktan önceki mekik sayısı
    const mesafe = (n) => 10 * mekikOnce(n + 1); // n. basamak sonu
    let bitis = 7, t = 0, oyn = false, dar = false, faz = 0, sonMekik = 0, flas = [0, 0], sonCap = '';
    el.innerHTML = `<div class="f43-kont">
        <div class="btn-row"><button type="button" class="btn" data-a="oyn" aria-pressed="false">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button>
          <button type="button" class="btn ghost" data-a="geri" aria-label="Önceki basamak">‹ Basamak</button><button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki basamak">Basamak ›</button></div>
        <div><span class="f43-lbl">Hasta nerede bırakıyor?</span>${segHtml('Hasta nerede bırakıyor', 'bit', [[3, '3. basamak'], [5, '5. basamak'], [7, '7. basamak']], bitis)}</div></div>
      <div class="f43-sayac"><div><span>Basamak</span><b data-s="n">1</b></div><div><span>Mekik süresi</span><b data-s="ms">20,0 s</b></div><div><span>Mesafe</span><b data-s="m">0 m</b></div></div>
      <div class="f43-mekik-svg"></div>`;
    const kutu = el.querySelector('.f43-mekik-svg');
    let L, svg;
    const ciz = () => {
      L = dar ? { vb: '0 0 360 230', c1: 46, c2: 314, py: 78, oy: 112, bx0: 22, bx1: 338, by: 168 } : { vb: '0 0 640 230', c1: 120, c2: 520, py: 78, oy: 112, bx0: 60, bx1: 590, by: 168 };
      const bx = (m) => L.bx0 + (L.bx1 - L.bx0) * m / 420;
      const kon = (x) => `<path class="f43-koni" d="M${x - 11} ${L.py + 4} L${x} ${L.py - 22} L${x + 11} ${L.py + 4} Z"/>`;
      const tik = [0, 100, 200, 300, 400].map((m) => `<line class="f43-eks" x1="${bx(m)}" x2="${bx(m)}" y1="${L.by + 14}" y2="${L.by + 19}"/>${tx(bx(m), L.by + 32, m, 'f43-ts', 'middle')}`).join('');
      kutu.innerHTML = `<svg class="f43-svg" viewBox="${L.vb}" role="img" aria-label="İki koni arasında 9 m'lik parkurda yürüyen hasta ve kümülatif mesafe çubuğu">
        <defs><marker id="f43-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="f43-ok-uc"/></marker></defs>
        <line class="f43-zemin" x1="${L.c1 - 30}" x2="${L.c2 + 30}" y1="${L.py + 4}" y2="${L.py + 4}"/>
        ${kon(L.c1)}${kon(L.c2)}
        <circle class="f43-bip" data-b="0" cx="${L.c1}" cy="${L.py - 34}" r="9"/><circle class="f43-bip" data-b="1" cx="${L.c2}" cy="${L.py - 34}" r="9"/>
        <line class="f43-olcu" x1="${L.c1 + 4}" x2="${L.c2 - 4}" y1="${L.oy}" y2="${L.oy}" marker-start="url(#f43-ok)" marker-end="url(#f43-ok)"/>
        <rect class="f43-olcu-z" x="${(L.c1 + L.c2) / 2 - 20}" y="${L.oy - 10}" width="40" height="18" rx="4"/>
        ${tx((L.c1 + L.c2) / 2, L.oy + 4, '9 m', 'f43-t', 'middle')}
        <g class="f43-fig-y" transform="translate(${L.c1},${L.py + 4})"></g>
        <text class="f43-dur-t" x="${(L.c1 + L.c2) / 2}" y="${L.py - 34}" text-anchor="middle" style="display:none">Yetişemiyor: test biter</text>
        <rect class="f43-mbar-z" x="${L.bx0}" y="${L.by}" width="${L.bx1 - L.bx0}" height="14" rx="4"/>
        <rect class="f43-mbar" x="${L.bx0}" y="${L.by}" width="0" height="14" rx="4"/>
        <line class="f43-esik" x1="${bx(250)}" x2="${bx(250)}" y1="${L.by - 22}" y2="${L.by + 20}"/>
        ${tx(bx(250) + (dar ? 0 : 6), L.by - (dar ? 26 : 10), dar ? '250 m: altı artmış risk' : '250 m: altı artmış perioperatif risk', 'f43-ts f43-c-crit', dar ? 'middle' : 'start')}
        ${tik}${tx(L.bx1, L.by + 32, dar ? '' : 'm', 'f43-ts', 'start', ' dx="8"')}
      </svg>`;
      svg = kutu.querySelector('svg');
      L.bx = bx;
      goster();
    };
    const goster = () => {
      if (!svg) return;
      const tt = clamp(t, 0, bitis);
      const n = Math.min(bitis, Math.floor(tt) + 1);
      const f = tt - (n - 1);
      const mek = mekikOnce(n) + f * (n + 2);
      const m = 10 * mek;
      const i = Math.floor(mek), u = mek - i;
      const ileri = i % 2 === 0;
      const x = ileri ? L.c1 + (L.c2 - L.c1) * u : L.c2 - (L.c2 - L.c1) * u;
      const fig = svg.querySelector('.f43-fig-y');
      fig.setAttribute('transform', `translate(${x.toFixed(1)},${L.py + 4}) scale(${(ileri ? 1 : -1) * 1.3},1.3)`);
      const bitti = tt >= bitis - 1e-6;
      fig.innerHTML = insan('f43-insan', bitti ? 0 : faz);
      svg.querySelector('.f43-dur-t').style.display = bitti ? '' : 'none';
      const bar = svg.querySelector('.f43-mbar');
      bar.setAttribute('width', Math.max(0, L.bx(m) - L.bx0));
      bar.classList.toggle('ok', m >= 250);
      el.querySelector('[data-s=n]').textContent = n;
      el.querySelector('[data-s=ms]').textContent = fmt(60 / (n + 2)) + ' s';
      el.querySelector('[data-s=m]').textContent = Math.round(m) + ' m';
      svg.querySelectorAll('.f43-bip').forEach((b, k) => b.style.opacity = flas[k] > 0 ? String(flas[k]) : '0');
      let h;
      if (bitti && t > 0) {
        const mm = mesafe(bitis);
        h = mm < 250 ? `<b>${mm} m'de bitti.</b> En az 250 m yürüyemeyen hastada perioperatif komplikasyon riski artmıştır. [[K1 s. 185]]`
          : `<b>${mm} m.</b> 250 m eşiği aşıldı. Test ucuz ve kolaydır; ama alt ekstremite amputasyonu, periferik vasküler hastalık ya da kalça/diz osteoartriti olan hasta yürüyemeyebilir. [[K1 s. 185]]`;
      } else if (n <= 2) h = `<b>${n}. basamak.</b> Hasta 9 m aralıklı iki koni arasında durmadan yürür; her basamakta bir sonraki koniye varma süresi kısalır. [[K1 s. 185]]`;
      else h = `<b>${n}. basamak: hız artıyor.</b> Hasta bir sonraki koniye giderek daha kısa sürede ulaşmalıdır; ulaşamayınca test biter. [[K1 s. 185]]`;
      if (h !== sonCap && (t > 0 || sonCap)) { sonCap = h; capYaz(el, h); }
    };
    const oynBtn = el.querySelector('[data-a=oyn]');
    const oynYaz = (v) => { oyn = v; oynBtn.textContent = v ? 'Duraklat' : 'Oynat'; oynBtn.setAttribute('aria-pressed', String(v)); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      const a = b.dataset.a;
      if (b.dataset.bit) { bitis = +b.dataset.bit; basSec(el, 'bit', bitis); if (RM) t = bitis; else if (t > bitis) t = bitis; sonMekik = 0; }
      else if (a === 'oyn') { if (RM) { t = bitis; oynYaz(false); } else { if (t >= bitis) { t = 0; sonMekik = 0; } oynYaz(!oyn); } }
      else if (a === 'bas') { t = RM ? 0.001 : 0; sonMekik = 0; oynYaz(false); if (RM) t = 0.001; }
      else if (a === 'ileri') { oynYaz(false); t = Math.min(bitis, Math.floor(t + 1e-6) + 1); }
      else if (a === 'geri') { oynYaz(false); t = Math.max(0.001, Math.ceil(t - 1e-6) - 1); }
      else return;
      goster();
    });
    const ro = darIzle(el, (d) => { dar = d; ciz(); });
    let dur = () => {};
    if (RM) { t = bitis; sonCap = ''; goster(); }
    else dur = ticker(el, (dt) => {
      let deg = false;
      flas = flas.map((v) => { if (v > 0) deg = true; return Math.max(0, v - dt * 2.2); });
      if (oyn) {
        const n0 = Math.min(bitis, Math.floor(t) + 1);
        t = Math.min(bitis, t + dt / SN);
        faz += dt * (8 + n0 * 1.6);
        const n = Math.min(bitis, Math.floor(t) + 1);
        const mek = Math.floor(mekikOnce(n) + (t - (n - 1)) * (n + 2) + 1e-9);
        if (mek > sonMekik) { sonMekik = mek; flas[mek % 2 === 1 ? 1 : 0] = 1; }
        if (t >= bitis) oynYaz(false);
        deg = true;
      }
      if (deg) goster();
    });
    return () => { dur(); ro(); };
  };

  /* =====================================================================
     3 · f43_olcum — CPET düzeneği ve dört ölçüm grubu (K1 s. 185–186)
     ===================================================================== */
  VIZ.f43_olcum = (el) => {
    const GR = [
      ['is', 'İş hızı', 'watt (W); sürekli artar', '<b>İş hızı.</b> Elektromanyetik frenli bisiklet ergometresi direnci sürekli artırır; yapılan iş watt (W) cinsinden kaydedilir. [[K1 s. 185]]'],
      ['gaz', 'Metabolik gaz değişimi', 'V̇O₂ · V̇CO₂ · solunum değişim oranı = V̇CO₂/V̇O₂', '<b>Metabolik gaz değişimi.</b> Ekspiryum gazlarından V̇O₂, CO₂ üretimi (V̇CO₂) ve solunum değişim oranı (V̇CO₂/V̇O₂) hesaplanır. [[K1 s. 186]]'],
      ['ven', 'Ventilatuvar', 'O₂ satürasyonu · V̇E · VT · solunum sayısı · V̇E/V̇O₂ · V̇E/V̇CO₂', '<b>Ventilatuvar ölçümler.</b> O₂ satürasyonu, dakika ventilasyonu (V̇E), tidal hacim (VT), solunum sayısı ve O₂ ile CO₂ için ventilatuvar eşdeğerler (V̇E/V̇O₂, V̇E/V̇CO₂). [[K1 s. 186]]'],
      ['kv', 'Kardiyovasküler', 'kalp hızı · EKG ST segmenti · noninvaziv kan basıncı', '<b>Kardiyovasküler ölçümler.</b> Kalp hızı, EKG\'de ST segment değişiklikleri ve noninvaziv kan basıncı. [[K1 s. 186]]'],
    ];
    let sec = 'is', ilk = true;
    const hp = 'M231 48 C 262 52 268 96 300 120 S 316 140 318 158';
    el.innerHTML = `<div class="f43-olcum-g">
      <div class="f43-olcum-sv"><svg class="f43-svg f43-olc" data-sec="is" viewBox="0 0 360 250" role="img" aria-label="Bisiklet ergometresinde maskeli, EKG elektrotlu, tansiyon manşonlu ve parmak ucu oksimetreli hasta; maskeden gaz analizörüne hortum">
        <line class="f43-zemin" x1="20" x2="350" y1="232" y2="232"/>
        <g class="f43-p f43-p-is">
          <circle class="f43-teker" cx="105" cy="196" r="34"/><circle class="f43-teker-i" cx="105" cy="196" r="22"/>
          <path class="f43-govde" d="M105 196 L150 132 M150 132 L165 196 L105 196 M165 196 L226 120 M150 132 L148 124 M226 120 L232 104 M96 230 L114 230 M105 196 L105 230"/>
          <rect class="f43-sele" x="134" y="118" width="30" height="7" rx="3"/>
          <rect class="f43-gidon" x="224" y="98" width="20" height="6" rx="3"/>
          <g class="f43-krank"><line x1="0" y1="0" x2="18" y2="0"/><circle cx="18" cy="0" r="3.5"/></g>
        </g>
        <g class="f43-hasta">
          <path class="f43-vucut" d="M150 116 L194 62"/>
          <circle class="f43-bas" cx="208" cy="40" r="14"/>
          <path class="f43-uzuv" d="M188 70 L212 90 L236 102"/>
          <path class="f43-uzuv f43-bacak" d=""/>
        </g>
        <g class="f43-p f43-p-kv"><rect class="f43-mans" x="196" y="73" width="14" height="18" rx="3" transform="rotate(40 203 82)"/>
          <circle class="f43-elek" cx="174" cy="72" r="3.6"/><circle class="f43-elek" cx="183" cy="82" r="3.6"/><circle class="f43-elek" cx="168" cy="88" r="3.6"/>
          <path class="f43-kablo" d="M174 72 C 150 80 128 92 112 100 M183 82 C 150 96 128 100 112 100 M168 88 C 140 100 124 102 112 100"/>
          <rect class="f43-mon" x="70" y="88" width="42" height="26" rx="4"/><path class="f43-ekg" d="M74 102 h8 l3 -8 l3 14 l3 -6 h6 l3 -4 l3 4 h4"/></g>
        <g class="f43-p f43-p-gaz f43-p-ven"><path class="f43-maske" d="M218 36 q12 0 14 10 q-2 10 -14 10 z"/><path class="f43-hortum" d="${hp}"/></g>
        <g class="f43-p f43-p-gaz"><rect class="f43-analiz" x="284" y="158" width="66" height="44" rx="6"/></g>
        <g class="f43-p f43-p-ven"><rect class="f43-pulsox" x="233" y="97" width="11" height="10" rx="3"/></g>
        <g class="f43-akim"></g>
        <path id="f43-hp" d="${hp}" class="f43-gizli"/>
        ${tx(317, 177, 'gaz', 'f43-ts', 'middle')}${tx(317, 191, 'analizörü', 'f43-ts', 'middle')}
        ${tx(105, 246, 'elektromanyetik fren', 'f43-ts', 'middle')}
        ${[['is', 1, 56, 178], ['gaz', 2, 272, 66], ['ven', 3, 258, 102], ['kv', 4, 160, 56]].map(([k, n, x, y]) => `<g class="f43-rozet" data-r="${k}"><circle cx="${x}" cy="${y}" r="9"/>${tx(x, y + 4, n, 'f43-rozet-t', 'middle')}</g>`).join('')}
      </svg></div>
      <div class="f43-olcum-k">${GR.map(([k, ad, ic], i) => `<button type="button" class="f43-okart" data-g="${k}" aria-pressed="${k === sec}"><span class="f43-onum">${i + 1}</span><b>${ad}</b><span class="f43-oic">${ic}</span></button>`).join('')}</div></div>
      <div class="f43-serit"><span>10 dakika · &gt; 5000 ölçüm → dokuz panelli grafik</span><span class="f43-dokuz" aria-hidden="true">${'<i></i>'.repeat(9)}</span></div>`;
    const svg = el.querySelector('svg'), krank = svg.querySelector('.f43-krank'), bacak = svg.querySelector('.f43-bacak');
    const hpEl = svg.querySelector('#f43-hp'), HL = hpEl.getTotalLength();
    const nokt = Array.from({ length: 6 }, () => mk('circle', { r: 2.6, class: 'f43-nokta' }, svg.querySelector('.f43-akim')));
    let a = 0.6, tz = 0;
    const kur = () => {
      const kx = 165 + 18 * Math.cos(a), ky = 196 + 18 * Math.sin(a);
      krank.setAttribute('transform', `translate(165,196) rotate(${(a * 180 / Math.PI).toFixed(1)})`);
      // diz: kalça (150,116) ile pedal arasında öne doğru
      const hx = 150, hy = 116, dx = kx - hx, dy = ky - hy, d = Math.hypot(dx, dy), l = 48;
      const m = Math.sqrt(Math.max(0, l * l - (d / 2) * (d / 2)));
      const nx = hx + dx / 2 + (-dy / d) * -m, ny = hy + dy / 2 + (dx / d) * -m;
      bacak.setAttribute('d', `M${hx} ${hy} L${nx.toFixed(1)} ${ny.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)}`);
      const nef = 0.5 + 0.5 * Math.sin(tz * 1.6);
      nokt.forEach((c, i) => { const u = ((i / nokt.length) + tz * 0.18) % 1; const p = hpEl.getPointAtLength(u * HL); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.style.opacity = RM ? '0.8' : (0.25 + 0.75 * nef).toFixed(2); });
    };
    const sec1 = (k) => {
      sec = k; svg.dataset.sec = k;
      el.querySelectorAll('.f43-okart').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === k)));
      if (!ilk) capYaz(el, GR.find((g) => g[0] === k)[3]);
      ilk = false;
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-g]'); if (b) sec1(b.dataset.g); });
    sec1('is'); kur();
    const dur = RM ? () => {} : ticker(el, (dt) => { a += dt * 2.2; tz += dt; kur(); });
    return dur;
  };

  /* =====================================================================
     4 · f43_cpet — artan iş yükünde V̇O₂: AT, V̇O₂ peak, risk sınırları (K1 s. 186)
     ===================================================================== */
  VIZ.f43_cpet = (el) => {
    /* elit sporcu: 4 + 0,27·W 321 W'a dek, 50 W'lık yumuşak dönüş, 371–400 W plato 97,5 */
    const elit = (w) => { const W1 = 321, D = 50, s = 0.270231; if (w <= W1) return 4 + s * w; const d = Math.min(D, w - W1); return 4 + s * W1 + s * d - (s / (2 * D)) * d * d; };
    const PR = {
      normal: { ad: 'Normal hasta', son: 220, f: (w) => 4 + 0.13 * w, at: 18, ymax: 45, bit: 'Devam edemiyor', bk: 'warn', peakAd: 'V̇O₂ peak', risk: ['25–40 bandında', 'ok'] },
      dusuk: { ad: 'Düşük rezerv', son: 90, f: (w) => 4 + 0.11 * w, at: 9, ymax: 45, bit: 'ST elevasyonu: test durduruldu', bk: 'crit', peakAd: 'V̇O₂ peak', risk: ['AT < 10,2 · peak < 15: yüksek risk', 'crit'] },
      elit: { ad: 'Elit sporcu', son: 400, f: elit, at: 60, ymax: 100, bit: 'Plato: V̇O₂ max', bk: 'ok', peakAd: 'V̇O₂ max', risk: ['plato değeri = V̇O₂ max', 'ok'] },
    };
    let pr = 'normal', p = 0, oyn = false, dar = false, ymax = 45, ymT = () => {}, sonCap = '';
    el.innerHTML = `<div class="f43-kont">
        <div class="btn-row"><button type="button" class="btn" data-a="oyn" aria-pressed="false">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div>
        <div><span class="f43-lbl">Hasta</span>${segHtml('Hasta profili', 'pr', [['normal', 'Normal hasta'], ['dusuk', 'Düşük rezerv'], ['elit', 'Elit sporcu']], pr)}</div></div>
      <div class="f43-cpet-svg"></div>
      <dl class="f43-oku"><div><dt>İş hızı</dt><dd data-o="w">0 W</dd></div><div><dt>V̇O₂</dt><dd data-o="v">4,0</dd></div><div><dt>AT</dt><dd data-o="at">–</dd></div><div><dt data-o="pa">V̇O₂ peak</dt><dd data-o="pk">–</dd></div><div class="f43-oku-r"><span class="tag" data-o="r">test sürüyor</span></div></dl>`;
    const kutu = el.querySelector('.f43-cpet-svg');
    let G;
    const ciz = () => {
      G = dar ? { vb: '0 0 360 300', x0: 46, x1: 344, y0: 262, y1: 16 } : { vb: '0 0 640 340', x0: 66, x1: 600, y0: 296, y1: 18 };
      kutu.innerHTML = `<svg class="f43-svg${dar ? ' f43-dar' : ''}" viewBox="${G.vb}" role="img" aria-label="İş hızına karşı V̇O₂ grafiği; anaerobik eşik, V̇O₂ peak ve risk eşikleri">
        <defs><pattern id="f43-ana" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="f43-ana-z"/><path d="M0 0V6" class="f43-ana-c"/></pattern>
        <clipPath id="f43-cpet-kl"><rect x="${G.x0}" y="${G.y1 - 4}" width="${G.x1 - G.x0 + 2}" height="${G.y0 - G.y1 + 4}"/></clipPath></defs>
        <g class="f43-izg"></g><g class="f43-esikler"></g>
        <g clip-path="url(#f43-cpet-kl)"><path class="f43-anaer"/><path class="f43-egri"/></g>
        <g class="f43-isaret"></g>
        <line class="f43-eks" x1="${G.x0}" x2="${G.x1}" y1="${G.y0}" y2="${G.y0}"/><line class="f43-eks" x1="${G.x0}" x2="${G.x0}" y1="${G.y0}" y2="${G.y1}"/>
        ${[0, 100, 200, 300, 400].map((w) => tx(G.x0 + (G.x1 - G.x0) * w / 400, G.y0 + 16, w, 'f43-ts', 'middle')).join('')}
        ${tx((G.x0 + G.x1) / 2, G.y0 + (dar ? 34 : 36), 'İş hızı (W)', 'f43-t', 'middle')}
        <text class="f43-t" transform="translate(${dar ? 12 : 16},${(G.y0 + G.y1) / 2}) rotate(-90)" text-anchor="middle">${dar ? 'V̇O₂ (mL/kg/dk)' : 'V̇O₂ (mL kg⁻¹ dk⁻¹)'}</text>
      </svg>`;
      goster();
    };
    const X = (w) => G.x0 + (G.x1 - G.x0) * w / 400;
    const Y = (v) => G.y0 - (G.y0 - G.y1) * v / ymax;
    const goster = () => {
      const svg = kutu.querySelector('svg'); if (!svg) return;
      const P = PR[pr];
      // ızgara ve eşikler (ymax değişince yeniden)
      let iz = '';
      for (let v = 0; v <= ymax + 0.01; v += 10) iz += `<line class="f43-izg-c" x1="${G.x0}" x2="${G.x1}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/>${tx(G.x0 - 6, Y(v) + 4, v, 'f43-ts', 'end')}`;
      svg.querySelector('.f43-izg').innerHTML = iz;
      const bx = G.x1 - (dar ? 12 : 16);
      const bt = Y(Math.min(40, ymax)), bb = Y(25);
      const L15 = dar ? '15 · peak riski' : 'V̇O₂ peak < 15: yüksek risk', L10 = dar ? '10,2 · AT riski' : 'AT < 10,2: yüksek risk', LN = dar ? 'normal 25–40' : 'normal V̇O₂ peak 25–40';
      let es = `<rect class="f43-bant" x="${bx}" y="${bt}" width="${G.x1 - bx}" height="${bb - bt}"/>${tx(bx - 4, (bt + bb) / 2 + 4, LN, 'f43-ts f43-c-ok', 'end')}
        <line class="f43-e15" x1="${G.x0}" x2="${G.x1}" y1="${Y(15)}" y2="${Y(15)}"/>${tx(bx - 6, Y(15) - 5, L15, 'f43-ts f43-hale f43-c-crit', 'end')}
        <line class="f43-e10" x1="${G.x0}" x2="${G.x1}" y1="${Y(10.2)}" y2="${Y(10.2)}"/>${tx(bx - 6, Y(10.2) + 14, L10, 'f43-ts f43-hale f43-c-warn', 'end')}`;
      if (pr === 'elit') es += `<line class="f43-emax" x1="${X(250)}" x2="${G.x1}" y1="${Y(97.5)}" y2="${Y(97.5)}"/>${tx(X(dar ? 395 : 360), Y(97.5) - 6, dar ? 'V̇O₂ max 97,5' : 'V̇O₂ max 97,5: ölçülen en yüksek (elit bisikletçi)', 'f43-ts f43-c-v', 'end')}`;
      svg.querySelector('.f43-esikler').innerHTML = es;
      // eğri
      const wE = P.son * p, n = 80;
      const pts = []; for (let i = 0; i <= n; i++) { const w = wE * i / n; pts.push([X(w), Y(P.f(w))]); }
      svg.querySelector('.f43-egri').setAttribute('d', 'M' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L'));
      // AT
      let wAT = 0; { let lo = 0, hi = P.son; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (P.f(m) < P.at) lo = m; else hi = m; } wAT = (lo + hi) / 2; }
      const atGecti = wE >= wAT;
      let an = '';
      if (atGecti && wE > wAT) { const q = []; for (let i = 0; i <= 40; i++) { const w = wAT + (wE - wAT) * i / 40; q.push(X(w).toFixed(1) + ' ' + Y(P.f(w)).toFixed(1)); } an = `M${X(wAT)} ${G.y0} L${q.join(' L')} L${X(wE)} ${G.y0} Z`; }
      svg.querySelector('.f43-anaer').setAttribute('d', an || 'M0 0');
      const bitti = p >= 1 - 1e-6;
      let is = '';
      if (atGecti) {
        const ax = X(wAT), ay = Y(P.at);
        is += `<line class="f43-at-c" x1="${ax}" x2="${ax}" y1="${G.y0}" y2="${ay}"/><circle class="f43-at-n" cx="${ax}" cy="${ay}" r="5"/>${tx(ax + 8, ay + 18, 'AT', 'f43-t f43-hale f43-c-warn', 'start')}`;
        if (ax - G.x0 > 56) is += tx((G.x0 + ax) / 2, G.y0 - 8, 'aerobik', 'f43-ts', 'middle');
        if (X(wE) - ax > (dar ? 100 : 130)) is += tx((ax + X(wE)) / 2, G.y0 - 8, 'aerobik + anaerobik', 'f43-ts f43-c-warn', 'middle');
      } else if (p > 0.04) is += tx((G.x0 + X(wE)) / 2, G.y0 - 8, 'aerobik', 'f43-ts', 'middle');
      const v = P.f(wE);
      if (bitti) {
        const pk = P.f(P.son), px = X(P.son), py = Y(pk);
        const lbl = `${P.peakAd} ${fmt(pk)}`;
        is += `<circle class="f43-peak" cx="${px}" cy="${py}" r="6"/>`;
        if (pr === 'elit') is += tx(px - 10, py + 20, lbl, 'f43-t f43-c-v', 'end');
        else is += tx(px + (px > G.x1 - 120 ? -10 : 10), py - 10, lbl, 'f43-t f43-c-v', px > G.x1 - 120 ? 'end' : 'start');
      } else if (p > 0) is += `<circle class="f43-imlec" cx="${X(wE)}" cy="${Y(v)}" r="5"/>`;
      svg.querySelector('.f43-isaret').innerHTML = is;
      // okuma kartı
      const o = (k) => el.querySelector(`[data-o=${k}]`);
      o('w').textContent = Math.round(wE) + ' W';
      o('v').textContent = fmt(v);
      o('at').textContent = atGecti ? '≈ ' + P.at : '–';
      o('pa').textContent = P.peakAd;
      o('pk').textContent = bitti ? '≈ ' + fmt(P.f(P.son)) : '–';
      const r = o('r');
      r.className = 'tag ' + (bitti ? P.bk : '');
      r.textContent = bitti ? P.bit : (p > 0 ? 'test sürüyor' : 'başlamadı');
      // açıklama
      let h;
      if (bitti) h = { normal: '<b>V̇O₂ peak ≈ 33.</b> Testte ulaşılan en yüksek V̇O₂; normali tipik olarak 25–40 mL kg⁻¹ dk⁻¹. Cerrahinin ek metabolik yükünü karşılayacak fizyolojik rezervin ölçüsüdür. [[K1 s. 186]]',
        dusuk: '<b>AT ≈ 9, V̇O₂ peak ≈ 14.</b> İkisi de risk eşiğinin altında (10,2 ve 15 mL kg⁻¹ dk⁻¹); test, EKG\'de ST elevasyonu gibi istenmeyen bir bulguyla ya da hasta devam edemeyince biter. [[K1 s. 186]]',
        elit: '<b>Plato: V̇O₂ max.</b> Elit sporcuda V̇O₂ önce doğrusal artar, sonra plato yapar; platodaki değer V̇O₂ max\'tır. Ölçülen en yüksek değer 97,5 mL kg⁻¹ dk⁻¹ (elit bir bisikletçi). [[K1 s. 186]]' }[pr];
      else if (atGecti) h = '<b>Anaerobik eşik.</b> Bu V̇O₂\'nin üstünde aerobik metabolizma anaerobik metabolizmayla desteklenir. AT &lt; 10,2 mL kg⁻¹ dk⁻¹ daha yüksek perioperatif komplikasyon riskiyle ilişkilidir. [[K1 s. 186]]';
      else h = `<b>${P.ad}.</b> V̇O₂ iş hızıyla doğrusal artar; AT'nin üstünde aerobik metabolizmaya anaerobik metabolizma eklenir. [[K1 s. 186]]`;
      if (h !== sonCap) { if (sonCap || p > 0 || pr !== 'normal') capYaz(el, h); sonCap = h; }
    };
    const oynBtn = el.querySelector('[data-a=oyn]');
    const oynYaz = (v) => { oyn = v; oynBtn.textContent = v ? 'Duraklat' : 'Oynat'; oynBtn.setAttribute('aria-pressed', String(v)); };
    const ymaxGec = () => { const a0 = ymax, a1 = PR[pr].ymax; ymT(); ymT = tween(a0 === a1 ? 0 : 450, (k) => { ymax = a0 + (a1 - a0) * k; goster(); }); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.pr) { pr = b.dataset.pr; basSec(el, 'pr', pr); p = RM ? 1 : 0; oynYaz(!RM); ymaxGec(); goster(); return; }
      if (b.dataset.a === 'oyn') { if (RM) { p = 1; } else { if (p >= 1) p = 0; oynYaz(!oyn); } goster(); }
      else if (b.dataset.a === 'bas') { p = RM ? 1 : 0; oynYaz(false); goster(); }
    });
    const ro = darIzle(el, (d) => { dar = d; ciz(); });
    if (RM) { p = 1; goster(); }
    const dur = RM ? () => {} : ticker(el, (dt) => { if (!oyn) return; p = Math.min(1, p + dt / 8); if (p >= 1) oynYaz(false); goster(); });
    return () => { dur(); ro(); ymT(); };
  };

  /* =====================================================================
     5 · f43_zincir — akciğerden kasa O₂ yolu: darboğaz (K1 s. 186)
     ===================================================================== */
  VIZ.f43_zincir = (el) => {
    const HALKA = [['Akciğer', 'V̇E, alveol–|kapiller geçiş'], ['Kalp', 'kalp debisi|(CO)'], ['Kan', 'O₂ taşıma|kapasitesi (Hb)'], ['Kas kapilleri', 'kapiller|yoğunluk']];
    const D = {
      saglikli: { ad: 'Sağlıklı', k: [100, 90, 85, 70], pk: 70, cap: '<b>Sağlıklı kişi.</b> Kitaba göre darboğaz büyük olasılıkla kasların kapiller yoğunluğudur; normal egzersizde de sporcularda da. [[K1 s. 186]]' },
      anemi: { ad: 'Anemi', k: [100, 90, 50, 70], pk: 50, cap: '<b>Anemi.</b> Kanın O₂ taşıma kapasitesi düşer; kaslara O₂ sunumu ve V̇O₂ peak azalır. [[K1 s. 186]]' },
      irtifa: { ad: 'İrtifa antrenmanı', k: [100, 90, 92, 82], pk: 80, cap: '<b>İrtifa antrenmanı.</b> Hipoksemi VEGF\'yi güçlü uyarır: kas damarlanması ve V̇O₂ peak artar. Hipoksemi ayrıca eritropoietin salgılatır, hematokrit yükselir. [[K1 s. 186]]' },
      kalp: { ad: 'Kalp hastalığı', k: [100, 45, 85, 70], pk: 45, cap: '<b>Kardiyovasküler hastalık.</b> Kalp, CO\'yu kasların artan ihtiyacına yetecek kadar artıramazsa egzersiz kapasitesi sınırlanır. [[K1 s. 186]]' },
      beta: { ad: 'β-bloker', k: [100, 55, 85, 70], pk: 55, cap: '<b>β-bloker.</b> CO\'yu sınırlayan ilaç alan hastada V̇O₂ peak buna uygun olarak düşüktür. [[K1 s. 186]]' },
      akc: { ad: 'Ağır akciğer hastalığı', k: [40, 90, 85, 70], pk: 40, cap: '<b>Ağır akciğer hastalığı.</b> Solunum sistemini sınırlayıcı yapan neredeyse tek durum budur; normalde V̇E artışı CO artışını çok aşar ve O₂ geçişi difüzyonla sınırlı değildir (Bölüm 10). [[K1 s. 186]]' },
    };
    let du = 'saglikli', K = D.saglikli.k.slice(), PK = 70, dar = false, tw = () => {}, svg, nokt = [], faz = 0;
    el.innerHTML = `<div class="f43-kont">${segHtml('Durum', 'du', Object.entries(D).map(([k, v]) => [k, v.ad]), du, 'f43-seg-z')}</div><div class="f43-zincir-svg"></div>`;
    const kutu = el.querySelector('.f43-zincir-svg');
    let Z;
    const ciz = () => {
      Z = dar ? { vb: '0 0 360 440', dik: true, cx: 86, ys: [44, 126, 208, 290], tx: 176, max: 150, kal: 40, lif: [86, 352], pby: 402, pbx0: 96, pbx1: 340 }
        : { vb: '0 0 640 332', dik: false, xs: [88, 218, 348, 478], cy: 104, max: 110, gen: 92, lif: [584, 104], pby: 278, pbx0: 116, pbx1: 600 };
      const ak = Z.dik ? `<rect class="f43-boru" x="0" y="${Z.ys[0]}" width="0" height="${Z.lif[1] - Z.ys[0]}"/>` : `<rect class="f43-boru" x="${Z.xs[0]}" y="0" width="${Z.lif[0] - Z.xs[0]}" height="0"/>`;
      const halkalar = HALKA.map(([ad, alt], i) => Z.dik
        ? `<rect class="f43-halka" data-h="${i}" x="0" y="${Z.ys[i] - Z.kal / 2}" width="0" height="${Z.kal}" rx="10"/>${tx(Z.tx, Z.ys[i] - 6, ad, 'f43-t')}${tx(Z.tx, Z.ys[i] + 10, alt.replace('|', ' '), 'f43-ts')}<text class="f43-ek f43-ts" data-e="${i}" x="${Z.tx}" y="${Z.ys[i] + 26}"></text>`
        : `<rect class="f43-halka" data-h="${i}" x="${Z.xs[i] - Z.gen / 2}" y="0" width="${Z.gen}" height="0" rx="12"/>${tx(Z.xs[i], 196, ad, 'f43-t', 'middle')}${alt.split('|').map((a, j) => tx(Z.xs[i], 212 + j * 14, a, 'f43-ts', 'middle')).join('')}<text class="f43-ek f43-ts" data-e="${i}" x="${Z.xs[i]}" y="244" text-anchor="middle"></text>`).join('');
      const [lx, ly] = Z.lif;
      const lif = `<g class="f43-lif" transform="translate(${lx},${ly})"><ellipse rx="${Z.dik ? 46 : 26}" ry="${Z.dik ? 16 : 40}"/>${Z.dik ? '<path d="M-36 -5 H36 M-38 5 H38"/>' : '<path d="M-8 -34 V34 M8 -34 V34"/>'}</g>${tx(lx + (Z.dik ? 56 : 0), ly + (Z.dik ? 5 : 58), 'kas lifi', 'f43-ts', Z.dik ? 'start' : 'middle')}`;
      kutu.innerHTML = `<svg class="f43-svg${dar ? ' f43-dar' : ''}" viewBox="${Z.vb}" role="img" aria-label="Akciğer, kalp, kan ve kas kapillerlerinden oluşan O₂ yolu; en dar halka darboğaz">
        ${ak}${lif}${halkalar}<g class="f43-akim"></g><g class="f43-dbg"></g>
        ${tx(Z.pbx0 - 10, Z.pby + 13, 'V̇O₂ peak', 'f43-t', 'end')}
        <rect class="f43-pb-z" x="${Z.pbx0}" y="${Z.pby}" width="${Z.pbx1 - Z.pbx0}" height="18" rx="4"/>
        <rect class="f43-pb" x="${Z.pbx0}" y="${Z.pby}" width="0" height="18" rx="4"/>
        <line class="f43-pb-ref" x1="${Z.pbx0 + (Z.pbx1 - Z.pbx0) * 0.7}" x2="${Z.pbx0 + (Z.pbx1 - Z.pbx0) * 0.7}" y1="${Z.pby - 5}" y2="${Z.pby + 23}"/>
        ${tx(Z.pbx0 + (Z.pbx1 - Z.pbx0) * 0.7, Z.pby + 37, 'sağlıklı', 'f43-ts', 'middle')}<text class="f43-pb-ok f43-t" x="0" y="${Z.pby + 13}"></text>
      </svg>`;
      svg = kutu.querySelector('svg');
      nokt = Array.from({ length: 26 }, (_, i) => ({ u: i / 26, o: (((i * 37) % 26) / 25) - 0.5, c: mk('circle', { r: dar ? 3 : 3.2, class: 'f43-o2' }, svg.querySelector('.f43-akim')) }));
      goster();
    };
    const goster = () => {
      if (!svg) return;
      const sc = Z.max / 100;
      const enAz = Math.min(...D[du].k), dbI = D[du].k.indexOf(enAz);
      svg.querySelectorAll('.f43-halka').forEach((r, i) => {
        const s = K[i] * sc;
        if (Z.dik) { r.setAttribute('x', Z.cx - s / 2); r.setAttribute('width', s); } else { r.setAttribute('y', Z.cy - s / 2); r.setAttribute('height', s); }
        r.classList.toggle('db', i === dbI);
      });
      const fh = PK * sc * 0.92;
      const boru = svg.querySelector('.f43-boru');
      if (Z.dik) { boru.setAttribute('x', Z.cx - fh / 2); boru.setAttribute('width', fh); } else { boru.setAttribute('y', Z.cy - fh / 2); boru.setAttribute('height', fh); }
      // darboğaz etiketi
      const dbg = svg.querySelector('.f43-dbg');
      if (Z.dik) { const w = K[dbI] * sc; dbg.innerHTML = tx(Z.cx, Z.ys[dbI] - Z.kal / 2 - 5, 'darboğaz', 'f43-t f43-hale f43-c-crit', 'middle'); void w; }
      else dbg.innerHTML = tx(Z.xs[dbI], Z.cy - K[dbI] * sc / 2 - 8, 'darboğaz', 'f43-t f43-hale f43-c-crit', 'middle');
      // ek notlar
      const ek = { saglikli: { 0: 'V̇E artışı CO artışını çok aşar' }, irtifa: { 2: 'EPO → hematokrit ↑', 3: 'VEGF → damarlanma ↑' } }[du] || {};
      svg.querySelectorAll('.f43-ek').forEach((t) => { const s = ek[t.dataset.e] || ''; if (Z.dik) t.textContent = s; else t.innerHTML = s.replace(/ → /, ' →|').split('|').map((a, j) => `<tspan x="${t.getAttribute('x')}" dy="${j ? 14 : 0}">${a}</tspan>`).join(''); t.classList.toggle('f43-c-acc', !!s && du === 'irtifa'); });
      if (!Z.dik && du === 'saglikli') { const t = svg.querySelector('.f43-ek[data-e="0"]'); t.textContent = ''; dbg.innerHTML += tx(Z.xs[0], 18, 'V̇E artışı CO artışını', 'f43-ts', 'middle') + tx(Z.xs[0], 32, 'çok aşar', 'f43-ts', 'middle'); }
      const pw = (Z.pbx1 - Z.pbx0) * PK / 100;
      const pb = svg.querySelector('.f43-pb'); pb.setAttribute('width', pw);
      const yon = D[du].pk > 70 ? '↑' : D[du].pk < 70 ? '↓' : '';
      const po = svg.querySelector('.f43-pb-ok'); po.setAttribute('x', Z.pbx0 + pw - 8); po.setAttribute('text-anchor', 'end'); po.textContent = yon;
      nokt.forEach((n) => {
        const t = (n.u + faz) % 1;
        if (Z.dik) { const y = Z.ys[0] + (Z.lif[1] - 18 - Z.ys[0]) * t; n.c.setAttribute('cx', (Z.cx + n.o * fh * 0.8).toFixed(1)); n.c.setAttribute('cy', y.toFixed(1)); }
        else { const x = Z.xs[0] - 30 + (Z.lif[0] - 22 - Z.xs[0] + 30) * t; n.c.setAttribute('cx', x.toFixed(1)); n.c.setAttribute('cy', (Z.cy + n.o * fh * 0.8).toFixed(1)); }
      });
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-du]'); if (!b) return;
      du = b.dataset.du; basSec(el, 'du', du); capYaz(el, D[du].cap);
      const k0 = K.slice(), p0 = PK, k1 = D[du].k, p1 = D[du].pk;
      tw(); tw = tween(450, (k) => { K = k0.map((v, i) => v + (k1[i] - v) * k); PK = p0 + (p1 - p0) * k; goster(); });
    });
    const ro = darIzle(el, (d) => { dar = d; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { faz = (faz + dt * 0.0022 * PK) % 1; goster(); });
    return () => { dur(); ro(); tw(); };
  };

  /* =====================================================================
     6 · f43_merdiven — kat sayısı → MET, V̇O₂, risk (K1 s. 185–186)
     ===================================================================== */
  VIZ.f43_merdiven = (el) => {
    const K = [
      { met: '< 3', vo: '< 10,5', v: 10.5, rz: ['Yüksek perioperatif mortalite riski', 'crit'], cap: '<b>Bir kat merdiveni çıkamıyor.</b> Bir kat ≈ 3 MET\'lik bir etkinliktir; bunu yapamayan hastada perioperatif mortalite riski yüksektir. [[K1 s. 186]]' },
      { met: '≈ 3', vo: '≈ 10,5', v: 10.5, rz: ['1 kat ≈ 3 MET: çıkamayan hastada risk yüksek', 'warn'], cap: '<b>Bir kat merdiven.</b> ≈ 3 MET, V̇O₂ ≈ 10,5 mL kg⁻¹ dk⁻¹ (kitapta 9,5). Bu düzeyin altında kalan hasta yüksek risklidir. [[K1 s. 186]]' },
      { met: '≈ 4', vo: '≈ 14', v: 14, rz: ['Düşük perioperatif mortalite riski', 'ok'], cap: '<b>İki kat merdiven.</b> ≈ 4 MET, V̇O₂ ≈ 14 mL kg⁻¹ dk⁻¹: iki katı durmadan çıkabilen hastada perioperatif mortalite riski düşüktür. 4 MET aynı zamanda DASI eşiğidir. [[K1 s. 185–186]]' },
      { ara: 1, rz: ['Kitapta değer yok', ''], cap: '<b>3 kat.</b> Kitap yalnız 1, 2 ve 5 kat için değer verir. [[K1 s. 186]]' },
      { ara: 1, rz: ['Kitapta değer yok', ''], cap: '<b>4 kat.</b> Kitap yalnız 1, 2 ve 5 kat için değer verir. [[K1 s. 186]]' },
      { met: '≈ 8', vo: '≈ 28 (> 20)', v: 28, rz: ['Minimal perioperatif mortalite riski', 'ok f43-koyu'], cap: '<b>Beş kat merdiven.</b> ≈ 8 MET, V̇O₂ > 20 mL kg⁻¹ dk⁻¹: perioperatif mortalite riski minimaldir. [[K1 s. 186]]' },
    ];
    let kat = 2, dar = false, svg, ilk = true;
    el.innerHTML = `<div class="f43-kont f43-kat-k"><label class="f43-lbl" for="f43-kat">Durmadan çıkılan kat: <b data-k="n">2</b></label>
        <input type="range" id="f43-kat" class="f43-range" min="0" max="5" step="1" value="2" aria-label="Durmadan çıkılan kat sayısı">
        <div class="f43-range-t" aria-hidden="true">${[0, 1, 2, 3, 4, 5].map((n) => `<span>${n}</span>`).join('')}</div></div>
      <div class="f43-merd-svg"></div><div class="f43-rozet-h"><span class="tag" data-k="rz"></span></div>`;
    const kutu = el.querySelector('.f43-merd-svg');
    let M;
    const ciz = () => {
      M = dar ? { vb: '0 0 360 332', sx: 64, sy: 186, sw: 40, sh: 24, dik: false, rx0: 24, rx1: 336, ry: 262 }
        : { vb: '0 0 640 300', sx: 60, sy: 270, sw: 52, sh: 42, dik: true, rx: 452, ry0: 270, ry1: 30 };
      const R = M.dik ? (v) => M.ry0 - (M.ry0 - M.ry1) * v / 30 : (v) => M.rx0 + (M.rx1 - M.rx0) * v / 30;
      M.R = R;
      let st = `<path class="f43-zemin" d="M${M.sx - 50} ${M.sy} H${M.sx}"/>`;
      let d = `M${M.sx} ${M.sy}`;
      for (let k = 1; k <= 5; k++) { d += ` V${M.sy - M.sh * k} H${M.sx + M.sw * k}`; }
      d += ` V${M.sy} Z`;
      st += `<path class="f43-merd" d="${d}"/>`;
      for (let k = 1; k <= 5; k++) st += tx(M.sx + M.sw * (k - 0.5), M.sy - M.sh * (k - 1) - (dar ? 6 : 10), k, 'f43-ts', 'middle');
      st += tx(M.sx - 26, M.sy + (dar ? 16 : 20), '0', 'f43-ts', 'middle');
      let cet = '';
      const isr = [[3.5, '1 MET = 3,5 (dinlenme)', 'f43-m-din', 'f43-ts'], [10.2, 'AT eşiği 10,2', 'f43-m-at', 'f43-ts f43-c-warn'], [14, '4 MET = 14 (DASI eşiği)', 'f43-m-dasi', 'f43-ts f43-c-acc'], [15, 'V̇O₂ peak eşiği 15', 'f43-m-pk', 'f43-ts f43-c-crit']];
      if (M.dik) {
        const x = M.rx;
        cet += `<rect class="f43-cet" x="${x}" y="${M.ry1}" width="16" height="${M.ry0 - M.ry1}" rx="3"/>`;
        for (let v = 0; v <= 30; v += 5) cet += `<line class="f43-eks" x1="${x + 16}" x2="${x + 22}" y1="${R(v)}" y2="${R(v)}"/>${tx(x + 26, R(v) + 4, v, 'f43-ts')}`;
        for (let m = 0; m <= 8; m++) cet += `<line class="f43-eks" x1="${x - 6}" x2="${x}" y1="${R(m * 3.5)}" y2="${R(m * 3.5)}"/>${tx(x - 10, R(m * 3.5) + 4, m, 'f43-ts f43-mt', 'end')}`;
        cet += tx(x - 10, M.ry1 - 12, 'MET', 'f43-t', 'end') + tx(x + 4, M.ry1 - 12, 'V̇O₂', 'f43-t');
        const ly = { 3.5: R(3.5) + 4, 10.2: R(10.2) + 12, 14: R(14) + 13, 15: R(15) - 5 };
        isr.forEach(([v, s, c, tc]) => { cet += `<line class="${c}" x1="${x - 2}" x2="${x + 62}" y1="${R(v)}" y2="${R(v)}"/>${tx(x + 66, ly[v], s, tc)}`; });
        cet += `<rect class="f43-dolu" x="${x + 3}" width="10" y="${M.ry0}" height="0" rx="2"/><rect class="f43-aral" x="${x - 2}" width="20" y="${R(28)}" height="${R(14) - R(28)}" rx="3"/>`;
        cet += `<path class="f43-imlec2" d=""/>`;
        cet += tx(x + 26, M.ry0 + 22, 'mL kg⁻¹ dk⁻¹', 'f43-ts');
      } else {
        const y = M.ry;
        cet += `<rect class="f43-cet" x="${M.rx0}" y="${y - 8}" width="${M.rx1 - M.rx0}" height="16" rx="3"/>`;
        for (let v = 0; v <= 30; v += 5) cet += `<line class="f43-eks" x1="${R(v)}" x2="${R(v)}" y1="${y - 8}" y2="${y - 14}"/>`;
        for (let m = 0; m <= 8; m++) cet += `<line class="f43-eks" x1="${R(m * 3.5)}" x2="${R(m * 3.5)}" y1="${y + 8}" y2="${y + 14}"/>${tx(R(m * 3.5), y + 27, m, 'f43-ts f43-mt', 'middle')}`;
        cet += tx(M.rx1, y + 44, 'MET', 'f43-t', 'end');
        cet += [0, 10, 20, 30].map((v) => tx(R(v), y - 18, v, 'f43-ts', 'middle')).join('');
        cet += tx(M.rx1, y - 34, 'V̇O₂ mL/kg/dk', 'f43-t', 'end');
        const isr2 = [[10.2, 'AT 10,2', 'f43-m-at', 'f43-ts f43-c-warn', 'end', -56], [15, 'peak 15', 'f43-m-pk', 'f43-ts f43-c-crit', 'start', -56], [14, 'DASI 4 MET', 'f43-m-dasi', 'f43-ts f43-c-acc', 'start', 58], [3.5, 'dinlenme', 'f43-m-din', 'f43-ts', 'start', 58]];
        isr2.forEach(([v, s, c, tc, an, dy]) => { cet += `<line class="${c}" x1="${R(v)}" x2="${R(v)}" y1="${y - (dy < 0 ? 48 : 8)}" y2="${y + (dy > 0 ? 48 : 8)}"/>${tx(R(v) + (an === 'end' ? -3 : 3), y + dy, s, tc, an)}`; });
        cet += `<rect class="f43-dolu" x="${M.rx0}" y="${y - 5}" width="0" height="10" rx="2"/><rect class="f43-aral" x="${R(14)}" y="${y - 10}" width="${R(28) - R(14)}" height="20" rx="3"/>`;
        cet += `<path class="f43-imlec2" d=""/>`;
      }
      kutu.innerHTML = `<svg class="f43-svg${dar ? ' f43-dar' : ''}" viewBox="${M.vb}" role="img" aria-label="Beş katlı merdiven ve V̇O₂–MET cetveli; seçilen kat sayısının V̇O₂ karşılığı ve riski">
        <defs><linearGradient id="f43-sol" ${M.dik ? 'x1="0" y1="1" x2="0" y2="0"' : 'x1="0" y1="0" x2="1" y2="0"'}><stop offset="0.7" class="f43-sol-a"/><stop offset="1" class="f43-sol-b"/></linearGradient></defs>
        ${st}${cet}<g class="f43-fig-m"></g><text class="f43-t f43-figt" x="0" y="0"></text><text class="f43-t f43-figt2" x="0" y="0"></text></svg>`;
      svg = kutu.querySelector('svg');
      goster();
    };
    const goster = () => {
      if (!svg) return;
      const k = K[kat], R = M.R;
      el.querySelector('[data-k=n]').textContent = kat;
      const fx = kat === 0 ? M.sx - 26 : M.sx + M.sw * (kat - 0.5), fy = M.sy - M.sh * kat;
      const sk = dar ? 0.62 : 0.95;
      svg.querySelector('.f43-fig-m').innerHTML = `<g transform="translate(${fx},${fy}) scale(${sk})">${insan('f43-insan', 0.5)}</g>`;
      const t1 = svg.querySelector('.f43-figt'), t2 = svg.querySelector('.f43-figt2');
      t1.setAttribute('x', dar ? 14 : 20); t1.setAttribute('y', dar ? 20 : 30); t2.setAttribute('x', dar ? 14 : 20); t2.setAttribute('y', dar ? 40 : 50);
      t1.textContent = k.ara ? `${kat} kat: kitapta değer yok` : `${kat === 0 ? '1 katı çıkamıyor' : kat + ' kat'}: ${k.met} MET`;
      t2.textContent = k.ara ? '2 ile 5 kat arası' : `V̇O₂ ${k.vo}`;
      const dolu = svg.querySelector('.f43-dolu'), aral = svg.querySelector('.f43-aral'), im = svg.querySelector('.f43-imlec2');
      aral.style.display = k.ara ? '' : 'none';
      dolu.style.display = k.ara ? 'none' : '';
      dolu.classList.toggle('f43-sol', kat === 0);
      dolu.setAttribute('class', 'f43-dolu' + (kat === 0 ? ' f43-dolu-0' : ''));
      if (!k.ara) {
        if (M.dik) { dolu.setAttribute('y', R(k.v)); dolu.setAttribute('height', M.ry0 - R(k.v)); im.setAttribute('d', `M${M.rx - 3} ${R(k.v) - 1.5} h22 v3 h-22 z`); }
        else { dolu.setAttribute('width', R(k.v) - M.rx0); im.setAttribute('d', `M${R(k.v)} ${M.ry - 4} l-6 -10 h12 z`); }
        im.style.display = '';
      } else im.style.display = 'none';
      const rz = el.querySelector('[data-k=rz]');
      rz.className = 'tag ' + k.rz[1]; rz.textContent = k.rz[0];
      if (!ilk) capYaz(el, k.cap);
      ilk = false;
    };
    const rng = el.querySelector('.f43-range');
    rng.addEventListener('input', () => { kat = +rng.value; goster(); });
    const ro = darIzle(el, (d) => { dar = d; ciz(); });
    return () => { ro(); };
  };
})();
