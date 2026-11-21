/* Fizyoloji Bölüm 6 · Üst hava yolları · bileşenler (K1 s. 21–23).
   Çizimler şematik, modeller eğitim amaçlı ve yaklaşıktır; her bileşenin altında öyle belirtilir.
   VIZ.f06_ad = (el) => { ...; return temizle; } */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 0) => { const k = 10 ** d, r = Math.round(v * k) / k; return (r === 0 ? 0 : r).toFixed(d).replace('.', ',').replace('-', '−'); };

  /* çoklu doğru boyunca konum: s yol uzunluğudur */
  const hat = (pts) => {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const top = L[L.length - 1];
    const at = (s) => {
      s = clamp(s, 0, top);
      let i = 1;
      while (i < L.length - 1 && L[i] < s) i++;
      const f = (s - L[i - 1]) / (L[i] - L[i - 1] || 1);
      return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
    };
    return { L, top, at, d: 'M' + pts.map((p) => p.join(' ')).join(' L') };
  };

  /* dar ekran: bileşen genişliği eşiğin altına inince (ya da üstüne çıkınca) çizimi yeniden kur */
  const duyarli = (el, esik, kur) => {
    let dar = null;
    const bak = () => { const w = el.clientWidth; const d = w > 0 && w < esik; if (d !== dar) { dar = d; kur(d); } };
    bak();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };

  /* ---------- Bölüm 6: üst hava yolunda havanın yolculuğu (şematik orta hat kesiti) ---------- */
  VIZ.f06_yol = (el) => {
    const ADIM = [
      { k: 'Süzme', c: '<b>1 · Süzme.</b> Burun deliğinin hemen içindeki kıllar büyük partikülleri (gri) tutar; hava ve daha küçük partiküller (turuncu) yola devam eder. [[K1 s. 21]]' },
      { k: 'Isıtma ve nemlendirme', c: '<b>2 · Isıtma ve nemlendirme.</b> Üst, orta ve alt konka havayı sıcak ve nemli mukozanın üzerinden geçecek biçimde yönlendirir: burun boşluğuna soğuk ve kuru giren hava (mavi) ısınmış ve nemlenmiş (kırmızı) olarak çıkar. [[K1 s. 21]] [[K1 s. 23]]' },
      { k: 'Mukus ve silyalar', c: '<b>3 · Mukus ve silyalar.</b> Burun boşluğunun arka bölümündeki ince mukus tabakası küçük partikülleri yakalar. Silyalar mukusu farinkse taşır; mukus yutularak özofagusa gider. [[K1 s. 21]]' },
      { k: 'Paranazal sinüsler', c: '<b>4 · Paranazal sinüsler.</b> Hava dolu dört sinüsün işlevi tartışmalıdır: kafatasını hafifletir ve bir darbe emici bölge gibi kafa içi yapıları korurlar; nemlendirmede, bağışıklık savunmasında ve ses rezonansında da rolleri olabilir. [[K1 s. 21]]' },
      { k: 'Koku', c: '<b>5 · Koku.</b> Kısa ve hızlı bir inspirasyon, yani koklama, havayı koku reseptörlerine ulaştırır. Zararlı bir gaz böylece akciğerlere çekilmeden önce fark edilir. Koku tat almada da büyük rol oynar. [[K1 s. 21]]' },
      { k: 'Farinks', c: '<b>6 · Farinks.</b> Nazofarinks, orofarinks ve laringofarinks: hava larinkse, lokma özofagusa gider. Yutmada konstriktörler lokmayı özofagusa iter; solunumda dilatatörler (en başta dili öne çeken genioglossus) farinksi açık tutar. [[K1 s. 21]]' },
    ];
    const A1 = hat([[26, 172], [42, 152], [60, 134], [88, 123], [130, 122], [190, 122], [226, 122], [250, 128], [264, 146], [265, 180], [265, 215], [262, 240], [252, 258], [241, 272], [236, 300], [236, 340], [236, 392]]);
    const A2 = hat([[26, 172], [42, 153], [64, 147], [110, 147], [170, 147], [212, 146], [236, 140], [256, 138], [265, 152], [265, 180], [265, 215], [262, 240], [252, 258], [241, 272], [236, 300], [236, 340], [236, 392]]);
    const MU = hat([[172, 150], [210, 149], [226, 160], [242, 182], [254, 202], [268, 240], [270, 290], [267, 318], [267, 392]]);
    const SN = hat([[26, 172], [42, 152], [60, 130], [92, 108], [130, 94], [178, 84]]);
    const BO = hat([[96, 175], [150, 171], [200, 173], [230, 190], [250, 212], [262, 244], [266, 280], [267, 318], [267, 392]]);
    const KIL = A1.L[1] + 7;
    const HEAD = 'M440 0 L122 0 C86 6 64 34 62 70 C61 84 60 92 56 100 L34 146 C32 152 36 156 44 156 L52 158 C54 166 54 172 52 180 C50 186 52 190 56 192 L54 198 C52 204 54 210 58 214 C60 230 64 246 76 254 C100 262 150 268 186 276 L196 384 L440 384 Z';
    const AIR = 'M40 156 L54 132 C70 112 92 92 126 82 L204 76 C222 76 236 82 248 92 C264 104 274 118 275 140 L276 318 L258 318 L258 268 L250 264 L250 384 L222 384 L222 300 C222 282 226 270 232 262 L240 250 C238 230 240 210 242 196 L236 184 C228 178 222 166 214 152 L70 157 Z';
    const KONKA = ['M150 92 C170 86 200 86 214 94 C204 99 176 99 150 92 Z', 'M108 111 C140 102 192 102 224 111 C212 118 160 120 108 111 Z', 'M86 133 C120 124 192 124 228 133 C216 142 140 143 86 133 Z'];
    const lb = (s, x, y, t, an, ln) => `<g class="f06-lb" data-s="${s}">${ln ? `<line x1="${ln[0]}" y1="${ln[1]}" x2="${ln[2]}" y2="${ln[3]}"/>` : ''}<text x="${x}" y="${y}" text-anchor="${an}">${t}</text></g>`;
    const kos = (s, y1, y2, t) => `<g class="f06-lb" data-s="${s}"><path d="M318 ${y1} H324 V${y2} H318"/><text x="330" y="${(y1 + y2) / 2 + 5}">${t}</text></g>`;
    el.innerHTML = `<div class="f06-yol">
      <svg class="f06-yol-svg" viewBox="0 0 440 384" role="img" aria-label="Baş ve boynun şematik orta hat kesiti: burun boşluğu ve konkalar, sinüsler, ağız ve dil, farinksin üç bölümü, larinks, trakea ve özofagus">
        <path class="f06-bas" d="${HEAD}"/>
        <ellipse class="f06-sin" data-h="3" cx="96" cy="50" rx="15" ry="11"/><ellipse class="f06-sin" data-h="3" cx="252" cy="68" rx="17" ry="12"/>
        ${Array.from({ length: 8 }, (_, i) => `<rect class="f06-omur" x="284" y="${98 + i * 36}" width="30" height="30" rx="5"/>`).join('')}
        <path class="f06-hava" d="${AIR}"/>
        <rect class="f06-ozo" x="258" y="318" width="18" height="70" rx="3"/>
        <path class="f06-kon" d="M275.5 140 L276 318"/>
        <path class="f06-kemik" d="M70 157 L214 151 L215 160 L72 166 Z"/>
        <path class="f06-yumu" d="M214 151 C222 166 228 178 236 184 C234 190 226 190 220 182 C214 174 210 166 207 160 Z"/>
        <path class="f06-dil" d="M64 198 C74 178 108 168 160 168 C202 168 228 178 241 196 C245 214 242 236 239 250 C214 254 168 250 128 242 C98 236 76 224 64 208 Z"/>
        <g class="f06-gg" data-h="5">${[[140, 178], [182, 178], [222, 196], [234, 228]].map(([x, y]) => `<line x1="98" y1="236" x2="${x}" y2="${y}"/>`).join('')}</g>
        <path class="f06-mand" d="M64 214 C66 230 70 242 82 248 C106 254 146 258 172 264"/>
        <ellipse class="f06-kemik" cx="200" cy="272" rx="9" ry="5"/>
        <path class="f06-epi" d="M230 274 C234 258 244 244 255 236 C254 248 246 262 238 276 Z"/>
        <path class="f06-kord" d="M222 297 L233 302 L222 307 Z M250 297 L239 302 L250 307 Z"/>
        ${[336, 350, 364, 378].map((y) => `<ellipse class="f06-halka" cx="219" cy="${y}" rx="3" ry="4.5"/>`).join('')}
        <g class="f06-konka" data-h="1">${KONKA.map((d) => `<path d="${d}"/>`).join('')}</g>
        <path class="f06-koku" data-h="4" d="M150 79 C170 77 190 76 206 77"/>
        <g class="f06-kil" data-h="0">${[[45, 147, 52, 141], [47, 152, 55, 147], [50, 139, 55, 134], [51, 155, 60, 152]].map(([a, b, c, d]) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`).join('')}</g>
        <path class="f06-muk" d="${MU.d}"/>
        <g class="f06-par"></g>
        <g class="f06-etk">
          ${lb(0, 6, 22, 'burun kılları', 'start', [40, 28, 50, 140])}
          ${lb(1, 150, 22, 'üst, orta ve alt konka', 'start', [178, 28, 178, 88])}
          ${lb(2, 330, 136, 'mukus ve', 'start', [326, 140, 272, 182])}${lb(2, 330, 152, 'silyalar', 'start', null)}${lb(2, 330, 352, 'yutulur', 'start', [326, 348, 278, 346])}
          ${lb(3, 6, 22, 'frontal sinüs', 'start', [52, 28, 86, 42])}${lb(3, 300, 22, 'sfenoid sinüs', 'start', [318, 28, 262, 58])}
          ${lb(4, 150, 22, 'koku reseptörleri', 'start', [178, 28, 178, 75])}
          ${kos(5, 96, 184, 'nazofarinks')}${kos(5, 188, 252, 'orofarinks')}${kos(5, 256, 318, 'laringofarinks')}
          ${lb(5, 150, 362, 'trakea', 'end', [154, 358, 218, 352])}${lb(5, 330, 374, 'özofagus', 'start', [326, 370, 278, 368])}
        </g>
      </svg>
      <div class="f06-yol-yan">
        <ol class="f06-adim">${ADIM.map((a, i) => `<li><button type="button" data-i="${i}" aria-pressed="false"><span>${i + 1}</span>${a.k}</button></li>`).join('')}</ol>
        <div class="btn-row"><button type="button" class="btn ghost" data-a="oto"></button></div>
        <ul class="f06-lej" aria-label="Simgeler">
          <li><i style="background:var(--c-basic)"></i>soğuk, kuru hava</li><li><i style="background:var(--crit)"></i>ısınmış, nemli hava</li>
          <li><i style="background:var(--muted)"></i>büyük partikül</li><li><i style="background:var(--warn)"></i>küçük partikül</li>
          <li><i style="background:var(--c-clin)"></i>koku molekülü</li><li><i class="lok"></i>lokma</li>
        </ul>
      </div>
    </div>
    <p class="viz-cap" aria-live="polite"></p>
    <p class="viz-foot">${REF('Şematik orta hat (sagittal) kesit; ölçekli değildir. Maksiller ve etmoid sinüsler bu düzlemin yanlarında kaldığı için çizilmedi. İşlevler kitaptandır. [[K1 s. 21]]')}</p>`;
    const svg = el.querySelector('svg'), parG = el.querySelector('.f06-par'), cap = el.querySelector('.viz-cap'), otoB = el.querySelector('[data-a="oto"]');
    const btns = [...el.querySelectorAll('.f06-adim button')], hls = [...svg.querySelectorAll('[data-h]')], lbs = [...svg.querySelectorAll('.f06-lb')];
    const koku = svg.querySelector('.f06-koku'), muk = svg.querySelector('.f06-muk'), kon = svg.querySelector('.f06-kon');
    let adim = 0, tA = 0, oto = !RM, P = [], tK = 0, off = 0;
    const r = () => Math.random();
    const yap = () => {
      P = [];
      const ekle = (n, f) => { for (let i = 0; i < n; i++) P.push(f(i, n)); };
      const hava = (n, h) => ekle(n, (i) => ({ tip: 'hava', h: h || (i % 3 ? A1 : A2), s: (i / n) * A1.top, v: 78 + r() * 12 }));
      if (adim === 0) { hava(8); ekle(5, (i) => ({ tip: 'iri', h: A1, s: -i * 22, v: 70, dur: 0, ox: 0, oy: 0 })); ekle(6, (i, n) => ({ tip: 'ince', h: i % 2 ? A1 : A2, s: (i / n) * A1.top - 30, v: 80 })); }
      if (adim === 1) hava(16);
      if (adim === 2) { hava(6, A1); ekle(10, (i, n) => (i % 2 ? { tip: 'ince', h: A2, s: -(i / n) * 320, v: 80, mu: false } : { tip: 'ince', h: A2, s: (i / n) * MU.top, v: 80, mu: true })); }
      if (adim === 3) hava(10);
      if (adim === 4) ekle(12, (i) => ({ tip: 'koku', d: (i % 4) * 0.07 + Math.floor(i / 4) * 0.8 }));
      if (adim === 5) { hava(10, A1); ekle(1, () => ({ tip: 'lok', s: -20, v: 64 })); }
      parG.innerHTML = P.map((p) => (p.tip === 'hava' ? '<g><circle r="2.6" class="sg"/><circle r="2.6" class="sc"/></g>'
        : p.tip === 'lok' ? '<ellipse rx="8" ry="5.5" class="lk"/>' : `<circle r="${p.tip === 'iri' ? 3.8 : p.tip === 'koku' ? 2.6 : 2.3}" class="${p.tip}"/>`)).join('');
      P.forEach((p, i) => { p.el = parG.children[i]; if (p.tip === 'hava') { p.c2 = p.el.children[1]; } });
    };
    const ilerle = (dt) => {
      tK += dt; off = (off + dt * 16) % 1000;
      for (const p of P) {
        if (p.tip === 'hava') { p.s += p.v * dt; if (p.s > p.h.top) p.s -= p.h.top + r() * 30; }
        else if (p.tip === 'iri') {
          if (p.dur > 0) { p.dur -= dt; if (p.dur <= 0) { p.s = -10 - r() * 50; } }
          else { p.s += p.v * dt; if (p.s >= KIL) { p.s = KIL; p.dur = 2.6; p.ox = (r() - 0.5) * 7; p.oy = (r() - 0.5) * 7; } }
        } else if (p.tip === 'ince') {
          if (adim !== 2) { p.s += p.v * dt; if (p.s > p.h.top) p.s -= p.h.top + r() * 40; }
          else if (!p.mu) { p.s += p.v * dt; if (p.s >= 0 && p.h.at(p.s)[0] >= 170) { p.mu = true; p.s = 0; } }
          else { p.s += 24 * dt; if (p.s >= MU.top) { p.mu = false; p.s = -r() * 320; } }
        } else if (p.tip === 'lok') { p.s += p.v * dt; if (p.s > BO.top + 80) p.s = -30; }
      }
    };
    const ciz = () => {
      let kokuOn = false, yutma = false;
      for (const p of P) {
        let x, y, op = 1;
        if (p.tip === 'koku') {
          const u = (((tK - p.d) % 2.4) + 2.4) % 2.4, s = u * 250;
          [x, y] = SN.at(s); op = s < SN.top ? 1 : u < SN.top / 250 + 0.45 ? 1 - (u - SN.top / 250) / 0.45 : 0;
          if (s >= SN.top && op > 0) kokuOn = true;
        } else if (p.tip === 'lok') {
          [x, y] = BO.at(p.s); op = p.s < 0 || p.s > BO.top ? 0 : 1;
          if (p.s > 70 && p.s < BO.top - 60) yutma = true;
        } else if (p.tip === 'ince' && p.mu) { [x, y] = MU.at(p.s); }
        else {
          [x, y] = p.h.at(p.s);
          if (p.s <= 0 || p.s >= p.h.top) op = 0;
          if (p.tip === 'iri' && p.dur > 0) { x += p.ox; y += p.oy; op = Math.min(1, p.dur / 0.6); }
        }
        if (p.tip === 'lok' || p.tip === 'hava') p.el.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
        else { p.el.setAttribute('cx', x.toFixed(1)); p.el.setAttribute('cy', y.toFixed(1)); }
        p.el.setAttribute('opacity', op.toFixed(2));
        if (p.tip === 'hava') p.c2.setAttribute('opacity', clamp((x - 60) / 160, 0, 1).toFixed(2));
      }
      koku.classList.toggle('yan', adim === 4 && (kokuOn || RM));
      kon.classList.toggle('on', adim === 5 && (yutma || RM));
      muk.style.strokeDashoffset = -off;
    };
    const goster = (i) => {
      adim = i; tA = 0;
      btns.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
      hls.forEach((h) => h.classList.toggle('on', +h.dataset.h === i));
      lbs.forEach((l) => l.classList.toggle('on', +l.dataset.s === i));
      muk.classList.toggle('on', i === 2);
      cap.innerHTML = REF(ADIM[i].c);
      yap();
      if (RM) { for (let k = 0; k < 120; k++) ilerle(0.05); tK = 0.5; }
      ciz();
    };
    const otoYaz = () => { otoB.textContent = oto ? 'Bu adımda kal' : 'Adımları sırayla oynat'; otoB.setAttribute('aria-pressed', String(oto)); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('.f06-adim button');
      if (b) { oto = false; otoYaz(); goster(+b.dataset.i); return; }
      if (e.target.closest('[data-a="oto"]')) { oto = !oto; tA = 0; otoYaz(); }
    });
    otoYaz(); goster(0);
    if (RM) return () => {};
    return ticker(el, (dt) => {
      if (oto) { tA += dt; if (tA > 8) goster((adim + 1) % ADIM.length); }
      ilerle(dt); ciz();
    });
  };

  /* ---------- Bölüm 6: farinks açıklığı: negatif basınç, dilatatörler, doku yükü, CPAP ---------- */
  VIZ.f06_farinks = (el) => {
    const DUR = {
      uyanik: { ad: 'Uyanık', T: 15, phi: 1.0 },
      uyku: { ad: 'Uyku', T: 10, phi: 0.7 },
      anestezi: { ad: 'Anestezi, sedasyon', T: 4, phi: 0.15 },
    };
    const CX = 150, W0 = 34, Y0 = 84, Y1 = 234, YM = 159, PER = 4, TI = 1.6, PENC = 8;
    let st = 'uyanik', L = 0.2, E = 6, C = 0, t = TI / 2, last = '';
    const ok = (id, renk) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${renk}"/></marker>`;
    el.innerHTML = `<div class="f06-far">
      <div class="f06-far-sahne">
        <svg class="f06-far-svg" viewBox="0 0 300 366" role="img" aria-label="Şematik hava yolu: üstte burun, ortada büyük ölçüde desteksiz farinks, altta kıkırdak halkalı trakea; farinks duvarını içeri çeken negatif basınç ve dışarı çeken dilatatör kaslar">
          <defs>${ok('f06-okp', 'var(--c-basic)')}${ok('f06-okc', 'var(--accent)')}</defs>
          <text class="f06-f-k" x="${CX}" y="15" text-anchor="middle">burun</text>
          <rect class="f06-f-lum" x="${CX - W0}" y="22" width="${W0 * 2}" height="${Y0 - 22}"/>
          <path class="f06-f-sert" d="M${CX - W0} 22 V${Y0} M${CX + W0} 22 V${Y0}"/>
          <path class="f06-f-pad"/><path class="f06-f-pad r"/>
          <path class="f06-f-lum c"/>
          <path class="f06-f-duv"/><path class="f06-f-duv r"/>
          <rect class="f06-f-lum" x="${CX - W0}" y="${Y1}" width="${W0 * 2}" height="${352 - Y1}"/>
          <path class="f06-f-sert" d="M${CX - W0} ${Y1} V352 M${CX + W0} ${Y1} V352"/>
          ${Array.from({ length: 7 }, (_, i) => `<ellipse class="f06-f-halka" cx="${CX}" cy="${252 + i * 15}" rx="${W0 + 3}" ry="4"/>`).join('')}
          <rect class="f06-f-cpa" x="${CX - 128 - 4}" y="134" width="8" height="50" rx="3"/><rect class="f06-f-cpa" x="${CX + 128 - 4}" y="134" width="8" height="50" rx="3"/>
          <path class="f06-f-kas"/><path class="f06-f-kas r"/>
          <g class="f06-f-ok"></g>
          <g class="f06-f-tur"><path d="M${CX - 92} 150 q5 -6 10 0 t10 0 t10 0"/><path d="M${CX + 62} 150 q5 -6 10 0 t10 0 t10 0"/></g>
          <g class="f06-f-par">${Array.from({ length: 16 }, () => '<circle r="2.4"/>').join('')}</g>
          <text class="f06-f-k" x="6" y="98">farinks</text><text class="f06-f-s" x="6" y="113">büyük ölçüde</text><text class="f06-f-s" x="6" y="127">desteksiz</text>
          <text class="f06-f-k" x="294" y="112" text-anchor="end">dilatatör</text><text class="f06-f-k" x="294" y="127" text-anchor="end">kaslar</text>
          <text class="f06-f-s" x="294" y="206" text-anchor="end">yumuşak doku</text>
          <text class="f06-f-k" x="6" y="284">trakea</text><text class="f06-f-s" x="6" y="299">kıkırdak</text><text class="f06-f-s" x="6" y="313">halkalar</text>
        </svg>
      </div>
      <div class="f06-far-pan">
        <div class="seg" role="group" aria-label="Durum">${Object.entries(DUR).map(([k, d]) => `<button type="button" data-st="${k}" aria-pressed="${k === st}">${d.ad}</button>`).join('')}</div>
        <label class="f06-rng"><span>Anatomik yük <b data-o="L"></b></span><input type="range" min="0" max="100" value="${L * 100}" data-r="L"><small>farinks çevresinde yağ, büyük tonsil ve adenoid, kraniyofasiyal anomali</small></label>
        <label class="f06-rng"><span>İnspiratuvar negatif basınç <b data-o="E"></b></span><input type="range" min="2" max="60" value="${E}" data-r="E"></label>
        <label class="f06-rng"><span>nCPAP <b data-o="C"></b></span><input type="range" min="0" max="20" value="${C}" data-r="C"></label>
        <div class="btn-row"><button type="button" class="btn ghost" data-a="60">Uyanık, −60 cmH₂O</button><button type="button" class="btn ghost" data-a="osa">Yatkın kişi uykuda</button></div>
        <div class="f06-oku"><div><span>Hava yolu basıncı, şu an</span><b data-o="P"></b></div><div><span>Açıklık, inspirasyon tepesinde</span><b data-o="A"></b></div></div>
        <div class="f06-durum" aria-live="polite"></div>
        <svg class="f06-iz" viewBox="0 0 300 96" role="img" aria-label="Son 8 saniyede farinks açıklığı ve basıncı">
          <rect x="34" y="6" width="262" height="70" rx="5" class="f06-iz-bg"/>
          <line x1="34" x2="296" y1="41" y2="41" class="f06-iz-0"/>
          <text x="30" y="14" text-anchor="end" class="f06-iz-ax">%100</text><text x="30" y="79" text-anchor="end" class="f06-iz-ax">0</text>
          <polyline class="f06-iz-a"/><polyline class="f06-iz-p"/>
          <text x="34" y="92" class="f06-iz-la">— açıklık</text><text x="140" y="92" class="f06-iz-lp">— basınç (±20 cmH₂O)</text>
        </svg>
      </div>
    </div>
    <p class="viz-cap" aria-live="polite"></p>
    <p class="viz-foot">${REF('Model şematiktir: farinks; içindeki basınç, dilatatör desteği ve çevre doku yükünün dengesine göre açılıp kapanan bir tüp olarak çizildi. Katsayılar ve yüzdeler eğitim amaçlıdır. Mekanizmalar, −60 cmH₂O ve nCPAP aralığı kitaptandır; kitaptaki −60 cmH₂O intratorasik basınçtır, modelde sadelik için farinks içine aynen yansıdığı varsayılır. [[K1 s. 21–22]]')}</p>`;
    const $ = (s) => el.querySelector(s), $$ = (s) => [...el.querySelectorAll(s)];
    const pads = $$('.f06-f-pad'), duv = $$('.f06-f-duv'), kas = $$('.f06-f-kas'), lum = $('.f06-f-lum.c'), okG = $('.f06-f-ok'), tur = $('.f06-f-tur'), cap = $('.viz-cap'), dur = $('.f06-durum');
    const par = [...el.querySelectorAll('.f06-f-par circle')].map((c, i) => ({ c, u: ((i * 0.618) % 1) * 1.6 - 0.8, y: 22 + ((i * 37) % 330) }));
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const solunum = (tt) => { const u = ((tt % PER) + PER) % PER; return u < TI ? -E * Math.sin((Math.PI * u) / TI) : Math.sin((Math.PI * (u - TI)) / (PER - TI)); };
    const ptm = (Pb, cp) => { const D = DUR[st]; return cp + Pb + D.T + D.phi * Math.max(0, -Pb) - (2 + 9 * L); };
    const acik = (x) => clamp(x / 7, 0, 1);
    const tepe = (cp) => acik(ptm(-E, cp));
    const sinif = (a) => (a >= 0.5 ? 'acik' : a >= 0.12 ? 'kismi' : 'tam');
    const bump = (y) => Math.pow(Math.sin((Math.PI * clamp((y - Y0) / (Y1 - Y0), 0, 1))), 1.4);
    const yar = (y, a) => W0 * (1 - (1 - a) * bump(y));
    const YS = Array.from({ length: 31 }, (_, i) => Y0 + i * 5);
    const metin = () => {
      const a = tepe(C), k = sinif(a), k0 = sinif(tepe(0));
      if (C > 0 && k0 !== 'acik' && k === 'acik') return '<b>nCPAP: pnömatik atel.</b> Hava yolu içindeki pozitif basınç farinksi içeriden açık tutar; OSA’da gece boyu +5 ile +20 cmH₂O kullanılır. HFNO’nun oluşturduğu pozitif basınç da üst hava yolu kollapsını azaltır. [[K1 s. 22–23]]';
      if (st === 'uyanik') return '<b>Uyanık.</b> İnspirasyonda negatif basınç farinks duvarlarını içe çeker; dilatatörlerin inspirasyonda artan aktivitesi buna karşı koyar. Bilinç açıkken intratorasik basınç −60 cmH₂O’ya düşse bile hava yolu açık kalır. [[K1 s. 21]]';
      if (st === 'uyku') {
        if (k === 'acik') return '<b>Uyku.</b> Dilatatör tonusu belirgin azalır ve farinks daralır; çoğu kişide lümen yine de yeterlidir. Anatomik yükü artırın. [[K1 s. 21–22]]';
        if (k === 'kismi') return '<b>Kısmi obstrüksiyon.</b> Daralmış farinkste akım türbülanslı olur: horlama. Yük biraz daha artarsa farinks tamamen kapanır. [[K1 s. 22]]';
        return '<b>Tam obstrüksiyon.</b> Farinks inspirasyonda kapanır; diyafram çabası sürer ama akım durur. OSA’daki apne budur. nCPAP’ı açıp yavaşça artırın. [[K1 s. 22]]';
      }
      return '<b>Anestezi, sedasyon.</b> Ketamin dışındaki anestezik ve sedatif ajanlar merkezi solunum dürtüsünü ve faringeal kas tonusunu azaltır; sonuç üst hava yolu obstrüksiyonudur. Pozitif basınç uygulayarak farkı görün. [[K1 s. 22]]';
    };
    const etiket = () => {
      o('L').textContent = (L < 0.34 ? 'düşük' : L < 0.67 ? 'orta' : 'yüksek') + ' · ' + Math.round(L * 100);
      o('E').textContent = '−' + E + ' cmH₂O';
      o('C').textContent = C ? '+' + C + ' cmH₂O' : 'kapalı';
      el.querySelector('[data-r="L"]').value = Math.round(L * 100); el.querySelector('[data-r="E"]').value = E; el.querySelector('[data-r="C"]').value = C;
      $$('[data-st]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.st === st)));
      const a = tepe(C), k = sinif(a);
      o('A').textContent = '%' + Math.round(a * 100);
      dur.className = 'f06-durum ' + k;
      dur.textContent = k === 'acik' ? 'Açık: akım düzgün' : k === 'kismi' ? 'Kısmi obstrüksiyon: türbülans, horlama' : 'Tam obstrüksiyon: inspirasyonda akım yok (apne)';
      const c = metin(); if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    const ciz = () => {
      const Pb = solunum(t), Pl = C + Pb, a = acik(ptm(Pb, C)), D = DUR[st];
      const sol = YS.map((y) => [CX - yar(y, a), y]), sag = YS.map((y) => [CX + yar(y, a), y]);
      const dis = (sgn) => YS.map((y) => [CX + sgn * (W0 + 6 + 30 * L * (0.35 + 0.65 * bump(y))), y]).reverse();
      const pth = (arr) => 'M' + arr.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
      pads[0].setAttribute('d', pth([...sol, ...dis(-1)]) + ' Z'); pads[1].setAttribute('d', pth([...sag, ...dis(1)]) + ' Z');
      duv[0].setAttribute('d', pth(sol)); duv[1].setAttribute('d', pth(sag));
      lum.setAttribute('d', pth([...sol, ...[...sag].reverse()]) + ' Z');
      const F = D.T + D.phi * Math.max(0, -Pb), kw = (2 + 12 * clamp(F / 30, 0, 1)).toFixed(1), wm = yar(YM, a);
      kas[0].setAttribute('d', `M${CX - wm} ${YM} L${CX - 124} ${YM}`); kas[1].setAttribute('d', `M${CX + wm} ${YM} L${CX + 124} ${YM}`);
      kas.forEach((k) => k.setAttribute('stroke-width', kw));
      let oklar = '';
      if (Pl < -0.6 || (Pl > 0.6 && C > 0)) {
        [118, YM, 200].forEach((y) => {
          const w = yar(y, a) - 3, len = Math.min(w - 4, 4 + 0.7 * Math.abs(Pl));
          if (len < 4) return;
          [-1, 1].forEach((sg) => {
            const xa = CX + sg * w, xb = CX + sg * (w - len);
            oklar += Pl < 0 ? `<line x1="${xa.toFixed(1)}" y1="${y}" x2="${xb.toFixed(1)}" y2="${y}" class="p" marker-end="url(#f06-okp)"/>` : `<line x1="${xb.toFixed(1)}" y1="${y}" x2="${xa.toFixed(1)}" y2="${y}" class="c" marker-end="url(#f06-okc)"/>`;
          });
        });
      }
      okG.innerHTML = oklar;
      const k = sinif(a);
      tur.classList.toggle('on', Pb < -0.5 && k === 'kismi');
      par.forEach((p, i) => {
        const w = Math.max(0, yar(p.y, a) - 4);
        let x = CX + p.u * w;
        if (k === 'kismi' && Pb < -0.5 && p.y > 110 && p.y < 210 && !RM) x += Math.sin(t * 37 + i * 2.1) * Math.min(2.5, w * 0.3);
        p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', p.y.toFixed(1));
        p.c.setAttribute('opacity', p.y > Y0 + 8 && p.y < Y1 - 8 && w < 1.5 ? 0 : 0.9);
      });
      o('P').textContent = (Math.round(Pl * 10) > 0 ? '+' : '') + fmt(Pl, 1) + ' cmH₂O';
      const n = 80, pa = [], pp = [];
      for (let i = 0; i <= n; i++) {
        const tt = t - PENC + (i / n) * PENC, Pq = solunum(tt), aq = acik(ptm(Pq, C)), x = (34 + (i / n) * 262).toFixed(1);
        pa.push(x + ',' + (76 - aq * 70).toFixed(1)); pp.push(x + ',' + (41 - (clamp(C + Pq, -20, 20) / 20) * 35).toFixed(1));
      }
      el.querySelector('.f06-iz-a').setAttribute('points', pa.join(' ')); el.querySelector('.f06-iz-p').setAttribute('points', pp.join(' '));
    };
    const akim = (dt) => {
      const Pb = solunum(t), a = acik(ptm(Pb, C));
      // inspirasyonda tam obstrüksiyon varsa (apne) giren hava yoktur; ekspirasyonda da akım gösterilmez
      const q = a < 0.12 ? 0 : Pb < 0 ? (-Pb / Math.max(E, 1)) * (a < 0.5 ? 0.6 : 1) : tepe(C) < 0.12 ? 0 : -Pb * 0.55;
      par.forEach((p) => { p.y += q * 150 * dt; if (p.y > 352) p.y -= 330; if (p.y < 22) p.y += 330; });
    };
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'L') L = +r.value / 100; if (r.dataset.r === 'E') E = +r.value; if (r.dataset.r === 'C') C = +r.value;
      etiket(); ciz();
    });
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const s = e.target.closest('[data-st]'); if (s) { st = s.dataset.st; etiket(); ciz(); return; }
      const b = e.target.closest('[data-a]'); if (!b) return;
      if (b.dataset.a === '60') { st = 'uyanik'; E = 60; C = 0; }
      if (b.dataset.a === 'osa') { st = 'uyku'; L = 0.8; E = 6; C = 0; }
      etiket(); ciz();
    });
    etiket(); ciz();
    if (RM) return () => {};
    return ticker(el, (dt) => { t += dt; akim(dt); ciz(); });
  };

  /* ---------- Bölüm 6: OSA döngüsü (zaman izleri) ---------- */
  VIZ.f06_osa = (el) => {
    const DT = 0.1, N = 900, HIZ = 6;
    let sure = 30, frc = false, cpap = false;
    let faz, tF, ton, ph, alv, spo2, eff, minCur, sonMin, sonApne, H, AQ, acc = 0, last = '';
    const sifirla = () => { faz = 'uyku'; tF = 0; ton = 1; ph = 0; alv = 97.5; spo2 = 97.5; eff = 1; minCur = 100; sonMin = null; sonApne = null; H = []; AQ = []; };
    const adim = () => {
      tF += DT;
      let a, amp, tb = 4;
      if (faz === 'uyku') {
        ton += (1 - 0.72 * Math.min(1, tF / 16) - ton) * (1 - Math.exp(-DT));
        a = cpap ? 1 : clamp((ton - 0.3) / 0.4, 0, 1);
        amp = a >= 0.12 ? 0.55 + 0.45 * a : 0;
        eff += (1 - eff) * (1 - Math.exp(-DT / 2));
        if (!cpap && a < 0.12) { faz = 'apne'; tF = 0; a = 0; amp = 0; }
      } else if (faz === 'apne') {
        ton += (0.26 - ton) * (1 - Math.exp(-DT));
        a = 0; amp = 0; eff = 1 + 0.5 * Math.min(1, tF / sure);
        if (cpap) { faz = 'uyku'; tF = 16; a = 1; amp = 1; }
        else if (tF >= sure) { faz = 'uyanma'; tF = 0; sonApne = sure; }
      } else {
        ton += (1 - ton) * (1 - Math.exp(-DT / 0.6));
        a = 1; tb = 3; amp = 1 + 0.75 * Math.exp(-tF / 4); eff = 1 + 0.4 * Math.exp(-tF / 4);
        if (tF >= 10) { faz = 'uyku'; tF = 0; sonMin = minCur; minCur = 100; }
      }
      ph += (2 * Math.PI * DT) / tb;
      if (a >= 0.12) alv += (97.5 - alv) * (1 - Math.exp(-DT / (faz === 'uyanma' ? 2.5 : 5)));
      else alv = Math.max(50, alv - (frc ? 0.62 : 0.3) * DT);
      AQ.push(alv); const ag = AQ.length > 60 ? AQ.shift() : AQ[0]; // akciğerden parmağa ≈6 sn dolaşım gecikmesi
      spo2 += (ag - spo2) * (1 - Math.exp(-DT / 5));
      minCur = Math.min(minCur, spo2);
      H.push({ ton, ak: amp * Math.sin(ph), ca: eff * Math.sin(ph), s: spo2, f: faz });
      if (H.length > N) H.shift();
    };
    const onizle = () => { sifirla(); for (let i = 0; i < 1000; i++) adim(); };
    el.innerHTML = `<div class="viz-head">
        <div class="seg" role="group" aria-label="Apne süresi">${[20, 30, 40].map((s) => `<button type="button" data-sure="${s}" aria-pressed="${s === sure}">Apne ${s} sn</button>`).join('')}</div>
        <div class="btn-row"><button type="button" class="btn ghost f06-tg" data-t="frc" aria-pressed="false">Abdominal obezite: FRC ↓</button><button type="button" class="btn ghost f06-tg" data-t="cpap" aria-pressed="false">nCPAP</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div>
      </div>
      <div class="f06-osa"><div class="f06-osa-iz"></div>
        <div class="f06-osa-oku">
          <div><span>Evre</span><b data-o="faz"></b></div>
          <div><span>Son apne</span><b data-o="apne"></b></div>
          <div><span data-o="minA">En düşük SpO₂, son döngü</span><b data-o="min"></b></div>
          <div><span>Uyanma sayısı, ekranda</span><b data-o="uy"></b></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model: solunum sayısı, tonus ve SpO₂ eğrileri yaklaşık ve eğitim amaçlıdır; SpO₂ eğrisi apneyi dolaşım gecikmesiyle izler, en düşük değer apne bittikten birkaç saniye sonra görülür. Canlandırma 6 kat hızlıdır; zaman ekseni model süresini gösterir. Döngünün sırası, 20–40 saniyelik apne, FRC azalmasının hipoksemiyi ağırlaştırması ve nCPAP’ın etkisi kitaptandır. [[K1 s. 22]]')}</p>`;
    const iz = el.querySelector('.f06-osa-iz'), cap = el.querySelector('.viz-cap'), o = (k) => el.querySelector(`[data-o="${k}"]`);
    let G = null;
    const kur = (dar) => {
      const W = dar ? 360 : 600, X0 = dar ? 4 : 112, X1 = W - 6, WIN = dar ? 60 : 90;
      const SER = [['f', 'Uyku, uyanma', 20], ['ton', 'Faringeal tonus', 36], ['ak', 'Hava akımı', 50], ['ca', 'Diyafram çabası', 46], ['s', 'SpO₂', 62]];
      let y = 4; const LN = {}; let par = '';
      let yaz = '';
      SER.forEach(([k, ad, h]) => {
        if (dar) { yaz += `<text class="f06-o-ad" x="${X0}" y="${y + 11}">${ad}</text>`; y += 15; }
        LN[k] = { y, h };
        if (!dar) yaz += `<text class="f06-o-ad" x="${X0 - 10}" y="${y + h / 2 + 4}" text-anchor="end">${ad}</text>`;
        par += `<rect class="f06-o-bg${k === 'f' ? ' uy' : ''}" x="${X0}" y="${y}" width="${X1 - X0}" height="${h}" rx="4"/>`;
        y += h + 8;
      });
      const s = LN.s, sy = (v) => s.y + ((100 - clamp(v, 60, 100)) / 40) * s.h;
      const HT = y + 12;
      const ax = dar ? [[X0, '−60 sn', 'start'], [(X0 + X1) / 2, '−30 sn', 'middle'], [X1, 'şimdi', 'end']] : [[X0, '−90 sn', 'start'], [X0 + (X1 - X0) / 3, '−60', 'middle'], [X0 + (2 * (X1 - X0)) / 3, '−30', 'middle'], [X1, 'şimdi', 'end']];
      iz.innerHTML = `<svg class="f06-osa-svg" viewBox="0 0 ${W} ${HT}" role="img" aria-label="OSA döngüsü: uyku, faringeal tonus, hava akımı, diyafram çabası ve SpO₂ zamanla">
        ${par}<g class="f06-o-ap"></g>${yaz}
        <line class="f06-o-gr" x1="${X0}" x2="${X1}" y1="${sy(90)}" y2="${sy(90)}"/>
        <text class="f06-o-ax" x="${dar ? X1 - 3 : X0 - 6}" y="${sy(90) + (dar ? -3 : 4)}" text-anchor="end">%90</text>
        <text class="f06-o-ax" x="${dar ? X1 - 3 : X0 - 6}" y="${s.y + s.h - (dar ? 4 : 1)}" text-anchor="end">%60</text>
        <line class="f06-o-0" x1="${X0}" x2="${X1}" y1="${LN.ak.y + LN.ak.h / 2}" y2="${LN.ak.y + LN.ak.h / 2}"/>
        <line class="f06-o-0" x1="${X0}" x2="${X1}" y1="${LN.ca.y + LN.ca.h / 2}" y2="${LN.ca.y + LN.ca.h / 2}"/>
        <g class="f06-o-uy"></g>
        <polyline class="f06-o-l ton"/><polyline class="f06-o-l ak"/><polyline class="f06-o-l ca"/><polyline class="f06-o-l s"/>
        ${ax.map(([x, t, an]) => `<text class="f06-o-ax" x="${x}" y="${HT - 2}" text-anchor="${an}">${t}</text>`).join('')}
      </svg>`;
      G = { X0, X1, M: Math.round(WIN / DT), LN, sy, top: LN.ton.y, bot: s.y + s.h, svg: iz.querySelector('svg') };
      G.l = ['ton', 'ak', 'ca', 's'].map((k) => G.svg.querySelector('.f06-o-l.' + k));
      G.ap = G.svg.querySelector('.f06-o-ap'); G.uy = G.svg.querySelector('.f06-o-uy');
      ciz();
    };
    const ciz = () => {
      if (!G) return;
      const { X0, X1, M, LN } = G, D = H.slice(-M), n = D.length, off = M - n;
      const X = (i) => (X0 + ((i + off) / (M - 1)) * (X1 - X0)).toFixed(1);
      const yT = (v) => (LN.ton.y + LN.ton.h - 3 - v * (LN.ton.h - 6)).toFixed(1);
      const yA = (v) => (LN.ak.y + LN.ak.h / 2 - (v / 1.8) * (LN.ak.h / 2 - 3)).toFixed(1);
      const yC = (v) => (LN.ca.y + LN.ca.h / 2 - (v / 1.6) * (LN.ca.h / 2 - 3)).toFixed(1);
      const f = [(d) => yT(d.ton), (d) => yA(d.ak), (d) => yC(d.ca), (d) => G.sy(d.s).toFixed(1)];
      G.l.forEach((pl, k) => pl.setAttribute('points', D.map((d, i) => X(i) + ',' + f[k](d)).join(' ')));
      let ap = '', uy = '', bas = 0, say = 0;
      for (let i = 1; i <= n; i++) {
        if (i === n || D[i].f !== D[bas].f) {
          const x1 = +X(bas), x2 = +X(i - 1), w = Math.max(0, x2 - x1);
          if (D[bas].f === 'apne') ap += `<rect x="${x1}" y="${G.top - 2}" width="${w}" height="${G.bot - G.top + 4}" rx="3"/>${w > 34 ? `<text x="${(x1 + x2) / 2}" y="${LN.ak.y + 13}" text-anchor="middle">apne</text>` : ''}`;
          if (D[bas].f === 'uyanma') { uy += `<rect x="${x1}" y="${LN.f.y + 2}" width="${w}" height="${LN.f.h - 4}" rx="3"/>${w > 40 ? `<text x="${(x1 + x2) / 2}" y="${LN.f.y + LN.f.h / 2 + 4}" text-anchor="middle">uyanma</text>` : ''}`; say++; }
          bas = i;
        }
      }
      G.ap.innerHTML = ap; G.uy.innerHTML = uy;
      const fa = faz === 'apne' ? 'Apne' : faz === 'uyanma' ? 'Uyanma' : cpap ? 'Uyku (nCPAP)' : 'Uyku';
      o('faz').textContent = fa; o('faz').className = 'f06-faz ' + faz;
      o('apne').textContent = sonApne ? sonApne + ' sn' : '—';
      o('minA').textContent = cpap ? 'SpO₂, şu an' : 'En düşük SpO₂, son döngü';
      o('min').textContent = cpap ? '%' + Math.round(spo2) : sonMin ? '%' + Math.round(sonMin) : '—';
      o('uy').textContent = String(say);
      const c = cpap ? '<b>nCPAP.</b> Uykuda tonus yine azalır, ama pozitif basınç farinksi bir pnömatik atel gibi açık tutar: apne ve uyanma olmaz, satürasyon korunur. Gündüz uyku hâli ve atriyal fibrilasyon azalır. [[K1 s. 22]]'
        : faz === 'uyku' ? '<b>Uyku derinleşir.</b> Faringeal dilatatörlerin tonusu azalır ve farinks daralır; akım küçülür. [[K1 s. 21–22]]'
        : faz === 'apne' ? '<b>Apne.</b> Farinks tamamen kapandı: diyafram çabası sürüyor, hava akımı yok. Hipoksi ve hiperkapni gelişir; bir apne tipik olarak 20–40 saniye sürer.' + (frc ? ' Abdominal obezitede FRC azaldığı için satürasyon daha hızlı ve derin düşer.' : '') + ' [[K1 s. 22]]'
        : '<b>Uyanma.</b> Kemoreseptör uyarısı kişiyi faringeal tonusu ve hava yolu açıklığını geri getirecek kadar uyandırır. Kısa bir hiperventilasyonun ardından uyku yeniden derinleşir ve döngü tekrarlar. [[K1 s. 22]]';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const s = e.target.closest('[data-sure]');
      if (s) { sure = +s.dataset.sure; el.querySelectorAll('[data-sure]').forEach((b) => b.setAttribute('aria-pressed', String(b === s))); if (RM) onizle(); ciz(); return; }
      const t = e.target.closest('[data-t]');
      if (t) { if (t.dataset.t === 'frc') frc = !frc; else cpap = !cpap; t.setAttribute('aria-pressed', String(t.dataset.t === 'frc' ? frc : cpap)); if (RM) onizle(); ciz(); return; }
      if (e.target.closest('[data-a="bas"]')) { onizle(); ciz(); }
    });
    onizle();
    const dur = duyarli(el, 560, kur);
    if (RM) return dur;
    const tik = ticker(el, (dt) => { acc += dt * HIZ; while (acc >= DT) { adim(); acc -= DT; } ciz(); });
    return () => { tik(); dur(); };
  };

  /* ---------- Bölüm 6: STOP-BANG taraması ---------- */
  VIZ.f06_stopbang = (el) => {
    const OG = [
      ['S', 'Horlama', 'Yüksek sesli horlama'], ['T', 'Yorgunluk', 'Gündüz uyku hâli'], ['O', 'Gözlenen apne', 'Uykuda solunum durmaları görülmüş'], ['P', 'Basınç', 'Hipertansiyon'],
      ['B', 'BKİ', 'Artmış beden kitle indeksi'], ['A', 'Yaş', '50 yaşın üstünde'], ['N', 'Boyun', 'Boyun çevresi 40 cm’den fazla'], ['G', 'Cinsiyet', 'Erkek'],
    ];
    const sec = OG.map(() => false);
    el.innerHTML = `<div class="viz-head"><span class="small muted">Hastada bulunan öğelere basın</span><div class="btn-row"><button type="button" class="btn ghost" data-a="ornek">Örnek hasta</button><button type="button" class="btn ghost" data-a="sil">Temizle</button></div></div>
      <div class="f06-sb">${OG.map(([h, k, a], i) => `<button type="button" class="f06-sb-o" data-i="${i}" aria-pressed="false"><span class="h">${h}</span><b>${k}</b><span class="a">${a}</span></button>`).join('')}</div>
      <div class="f06-sb-p"><div class="f06-sb-n"><b data-o="n">0</b><span>/ 8</span></div><div class="f06-sb-bar">${OG.map(() => '<i></i>').join('')}</div><div class="f06-sb-r" data-o="r"></div></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Öğeler kitaptandır [[K1 s. 22]]. Puan aralıkları (0–2 düşük, 3–4 orta, 5–8 yüksek risk) ve BKİ eşiği (>35 kg/m²) anketin özgün biçiminden alınmıştır (Atlas notu). Örnek hasta bu atlas için kurgulanmıştır.')}</p>`;
    const bs = [...el.querySelectorAll('.f06-sb-o')], bar = [...el.querySelectorAll('.f06-sb-bar i')], cap = el.querySelector('.viz-cap'), n = el.querySelector('[data-o="n"]'), rr = el.querySelector('[data-o="r"]');
    const yaz = () => {
      const p = sec.filter(Boolean).length, k = p <= 2 ? 'ok' : p <= 4 ? 'warn' : 'crit', ad = p <= 2 ? 'Düşük risk' : p <= 4 ? 'Orta risk' : 'Yüksek risk';
      bs.forEach((b, i) => b.setAttribute('aria-pressed', String(sec[i])));
      bar.forEach((b, i) => { b.className = i < p ? k : ''; });
      n.textContent = p; rr.className = 'f06-sb-r ' + k; rr.textContent = ad + ' (Atlas notu)';
      cap.innerHTML = REF(p <= 2
        ? `<b>${p} puan.</b> Düşük OSA riski (Atlas notu). Her “evet” 1 puandır; öğeleri işaretledikçe puan ve risk değişir. [[K1 s. 22]]`
        : `<b>${p} puan, ${ad.toLowerCase()}.</b> Tanı almamış OSA olasılığı artar. Preoperatif değerlendirmenin önceliklerinden biri bu hastaları bulmaktır: ameliyattan önce bir süre nCPAP tedavisinden yarar görürler; sedatif premedikasyondan kaçınılır, mümkünse rejyonal ya da lokal teknik seçilir. [[K1 s. 22]]`);
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('.f06-sb-o'); if (b) { sec[+b.dataset.i] = !sec[+b.dataset.i]; yaz(); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'sil') sec.fill(false);
      if (a.dataset.a === 'ornek') { sec.fill(false); [0, 3, 4, 5, 7].forEach((i) => { sec[i] = true; }); }
      yaz();
      if (a.dataset.a === 'ornek') cap.innerHTML = REF('<b>Örnek: 58 yaşında, yüksek sesle horlayan, hipertansif, BKİ’si 38 kg/m² olan erkek.</b> S, P, B, A ve G: 5 puan, yüksek risk (Atlas notu). Tanı almamışsa ameliyattan önce bir süre nCPAP tedavisinden yarar görür. [[K1 s. 22]]');
    });
    yaz();
    return () => {};
  };

  /* ---------- Bölüm 6: geleneksel O₂ ve HFNO: akım talebi, ortam havası, basınç ---------- */
  VIZ.f06_hfno = (el) => {
    const CIH = {
      kanul: { ad: 'Nazal kanül', min: 1, max: 6, nazal: true },
      maske: { ad: 'Yeniden solumasız maske', min: 10, max: 15, nazal: false },
      hfno: { ad: 'HFNO', min: 10, max: 60, nazal: true },
    };
    const Q = { kanul: 4, maske: 15, hfno: 50 };
    const TI = 1, TE = 2, TT = TI + TE;
    let c = 'maske', PIF = 40, kapali = true, tc = 0.5, last = '', G = null;
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="O₂ verme aracı">${Object.entries(CIH).map(([k, d]) => `<button type="button" data-c="${k}" aria-pressed="${k === c}">${d.ad}</button>`).join('')}</div></div>
      <div class="f06-hf"><div class="f06-hf-g"></div>
        <div class="f06-hf-pan">
          <label class="f06-rng"><span>Cihaz akımı <b data-o="Q"></b></span><input type="range" data-r="Q"></label>
          <label class="f06-rng"><span>Hastanın tepe inspiratuvar akımı <b data-o="PIF"></b></span><input type="range" min="30" max="100" step="5" value="${PIF}" data-r="PIF"><small>takipneik hastada yükselir</small></label>
          <div class="seg" role="group" aria-label="Ağız"><button type="button" data-m="1" aria-pressed="true">Ağız kapalı</button><button type="button" data-m="0" aria-pressed="false">Ağız açık</button></div>
          <div class="f06-oku f06-hf-oku">
            <div><span>İnspirasyon hacminin cihazdan gelen payı</span><b data-o="pay"></b></div>
            <div><span>FiO₂, basit karışım modeli</span><b data-o="fio"></b></div>
            <div><span>Pozitif basınç</span><b data-o="peep"></b></div>
            <div><span>Verilen gaz</span><b data-o="gaz"></b></div>
          </div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Basit model: inspirasyon akımı yarım sinüs dalgası, I:E 1:2; cihaz %100 O₂ verir, eksik kalan akım ortam havasıyla (%21 O₂) tamamlanır. Maske, rezervuar torba ve nazofarinks hacmi hesaba katılmaz; FiO₂ ve basınç yaklaşıktır, basıncın akımla doğrusal arttığı varsayılmıştır (Atlas notu). Kitaptaki değerler: geleneksel araçlar ≤15 L/dk, yeniden solumasız maske FiO₂ %60–80, nazal kanülde >4 L/dk iyi tolere edilmez, HFNO ≤60 L/dk ve +3 ile +7 cmH₂O. [[K1 s. 23]]')}</p>`;
    const g = el.querySelector('.f06-hf-g'), cap = el.querySelector('.viz-cap'), o = (k) => el.querySelector(`[data-o="${k}"]`), rq = el.querySelector('[data-r="Q"]');
    const q = (t) => (t < TI ? PIF * Math.sin((Math.PI * t) / TI) : -(PIF * TI / TE) * Math.sin((Math.PI * (t - TI)) / TE));
    const pay = () => {
      const r = Q[c] / PIF; if (r >= 1) return 1;
      const th = Math.asin(r); return (2 * (1 - Math.cos(th)) + r * (Math.PI - 2 * th)) / 2;
    };
    const kur = (dar) => {
      const W = dar ? 360 : 560, HT = 236, X0 = dar ? 34 : 48, X1 = W - 8;
      const X = (t) => X0 + (t / TT) * (X1 - X0), Y = (v) => 16 + ((100 - v) / 150) * 196;
      g.innerHTML = `<svg class="f06-hf-svg" viewBox="0 0 ${W} ${HT}" role="img" aria-label="Bir soluk boyunca hastanın akımı ve cihaz akımı; aradaki fark ortam havasıyla karşılanır">
        <rect class="f06-hf-bg" x="${X0}" y="16" width="${X1 - X0}" height="196" rx="5"/>
        <rect class="f06-hf-ins" x="${X0}" y="16" width="${X(TI) - X0}" height="196"/>
        ${[100, 50, 0, -50].map((v) => `<line class="f06-hf-gr${v === 0 ? ' z' : ''}" x1="${X0}" x2="${X1}" y1="${Y(v)}" y2="${Y(v)}"/><text class="f06-hf-ax" x="${X0 - 5}" y="${Y(v) + 4}" text-anchor="end">${v < 0 ? '−' + -v : v}</text>`).join('')}
        <text class="f06-hf-ax" x="${dar ? 2 : X0}" y="10">L/dk</text>
        <text class="f06-hf-ax" x="${X(TI / 2)}" y="10" text-anchor="middle">inspirasyon</text><text class="f06-hf-ax" x="${X(TI + TE / 2)}" y="10" text-anchor="middle">ekspirasyon</text>
        <path class="f06-hf-yk"/><path class="f06-hf-cz"/><path class="f06-hf-oh"/>
        <line class="f06-hf-q"/><path class="f06-hf-c"/>
        <text class="f06-hf-t oh" text-anchor="middle"></text><text class="f06-hf-t cz" text-anchor="middle"></text><text class="f06-hf-t yk" text-anchor="middle"></text><text class="f06-hf-t ql" text-anchor="end"></text>
        <line class="f06-hf-cur" y1="16" y2="212"/><circle class="f06-hf-dot" r="5"/>
      </svg>`;
      G = { X, Y, X0, X1, svg: g.querySelector('svg') };
      ciz(true);
    };
    const ciz = (tam) => {
      if (!G) return;
      const { X, Y, X0, X1, svg } = G, Qd = Q[c], $s = (s) => svg.querySelector(s);
      if (tam) {
        const n = 60, ins = Array.from({ length: n + 1 }, (_, i) => (i / n) * TI), exp = Array.from({ length: n + 1 }, (_, i) => TI + (i / n) * TE);
        const P = (arr, f) => arr.map((t) => X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1));
        $s('.f06-hf-c').setAttribute('d', 'M' + [...P(ins, q), ...P(exp, q)].join(' L'));
        $s('.f06-hf-cz').setAttribute('d', 'M' + X(0).toFixed(1) + ' ' + Y(0).toFixed(1) + ' L' + P(ins, (t) => Math.min(q(t), Qd)).join(' L') + ` L${X(TI).toFixed(1)} ${Y(0).toFixed(1)} Z`);
        const fazla = PIF > Qd + 0.5;
        $s('.f06-hf-oh').setAttribute('d', fazla ? 'M' + P(ins, (t) => Math.max(q(t), Qd)).join(' L') + ' L' + [...ins].reverse().map((t) => X(t).toFixed(1) + ' ' + Y(Qd).toFixed(1)).join(' L') + ' Z' : '');
        const yik = CIH[c].nazal;
        $s('.f06-hf-yk').setAttribute('d', yik ? `M${X(TI).toFixed(1)} ${Y(0).toFixed(1)} L${X(TI).toFixed(1)} ${Y(Qd).toFixed(1)} L${X1} ${Y(Qd).toFixed(1)} L${X1} ${Y(0).toFixed(1)} Z` : '');
        const ql = $s('.f06-hf-q'); ql.setAttribute('x1', X0); ql.setAttribute('x2', X1); ql.setAttribute('y1', Y(Qd)); ql.setAttribute('y2', Y(Qd));
        const tx = (s, x, y, t) => { const e = $s(s); e.setAttribute('x', x); e.setAttribute('y', y); e.textContent = t; };
        tx('.f06-hf-t.ql', X1 - 4, Y(Qd) - 6, 'cihaz ' + Qd + ' L/dk');
        tx('.f06-hf-t.oh', X(TI / 2), Y((PIF + Qd) / 2) + 5, fazla && PIF - Qd > 14 ? 'ortam havası' : '');
        tx('.f06-hf-t.cz', X(TI / 2), Y(Math.min(Qd, PIF) / 2) + 5, Math.min(Qd, PIF) > 14 ? 'cihazdan' : '');
        tx('.f06-hf-t.yk', X(TI + TE / 2), Y(Qd / 2) + 5, c === 'hfno' && Qd >= 14 ? 'ekspirasyonda yıkama' : '');
        // göstergeler
        const f = pay(), fio = f + (1 - f) * 0.21;
        o('pay').textContent = '%' + Math.round(f * 100);
        o('fio').textContent = '≈ %' + Math.round(fio * 100);
        o('peep').textContent = c === 'hfno' ? '≈ +' + fmt((Qd / 60) * (kapali ? 7 : 3), 1) + ' cmH₂O' : '≈ 0';
        o('gaz').textContent = c === 'hfno' ? '37 °C, doymuş nem' : 'soğuk, kuru';
        o('Q').textContent = Qd + ' L/dk'; o('PIF').textContent = PIF + ' L/dk';
        el.querySelectorAll('[data-m]').forEach((b) => { b.disabled = c !== 'hfno'; b.setAttribute('aria-pressed', String((b.dataset.m === '1') === kapali)); });
        let m;
        if (c === 'kanul') m = (Qd > 4 ? '<b>4 L/dk’nın üstü iyi tolere edilmez.</b> Burnun soğuk ve kuru gazı ısıtma ve nemlendirme kapasitesi aşılır. ' : '<b>Nazal kanül.</b> Hasta yiyip içebilir ve konuşabilir, bu yüzden uyum iyidir. ') + 'Akım hastanın inspiratuvar akımının yanında çok küçüktür; inspirasyonun büyük bölümü ortam havasıyla karşılanır. [[K1 s. 23]]';
        else if (c === 'maske') m = (fazla ? '<b>Tepe inspiratuvar akım maskeye giren O₂ akımını aşıyor.</b> Aradaki fark ortam havasıyla karşılanır ve inspire O₂ düşer; hasta takipneikleştikçe fark büyür. ' : '<b>Akım talebi karşılanıyor.</b> ') + 'Yeniden solumasız maskeyle ulaşılabilen en yüksek inspire O₂ konsantrasyonu bu yüzden %60–80’dir; kuru O₂ sekresyonları koyulaştırır. [[K1 s. 23]]';
        else m = (fazla ? '<b>Akım hâlâ talebin altında.</b> Tepe inspiratuvar akımın cihaz akımını aşan kısmı ortam havasıyla karşılanıyor; akımı artırın. ' : '<b>HFNO akımı talebi karşılıyor.</b> Ortam havası çekilmez, inspire O₂ cihazdakine eşit olur. ') + 'Ekspirasyonda süren akım üst hava yolundaki CO₂’yi yıkar ve etkin ölü boşluğu azaltır; ağız kapalıyken basınç daha yüksektir. Isıtılmış, nemlendirilmiş gaz bu akımların tolere edilmesini sağlar. [[K1 s. 23]]';
        if (m !== last) { cap.innerHTML = REF(m); last = m; }
      }
      const cur = $s('.f06-hf-cur'), dot = $s('.f06-hf-dot');
      cur.setAttribute('x1', X(tc)); cur.setAttribute('x2', X(tc));
      dot.setAttribute('cx', X(tc)); dot.setAttribute('cy', Y(q(tc)));
      dot.classList.toggle('oh', tc < TI && q(tc) > Qd);
    };
    const aralik = () => { const d = CIH[c]; rq.min = d.min; rq.max = d.max; rq.step = 1; rq.value = Q[c]; };
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'Q') Q[c] = +r.value; else PIF = +r.value;
      ciz(true);
    });
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('[data-c]');
      if (b) { c = b.dataset.c; el.querySelectorAll('[data-c]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); aralik(); ciz(true); return; }
      const m = e.target.closest('[data-m]'); if (m && !m.disabled) { kapali = m.dataset.m === '1'; ciz(true); }
    });
    aralik();
    const dur = duyarli(el, 560, kur);
    if (RM) return dur;
    const tik = ticker(el, (dt) => { tc = (tc + dt * 0.7) % TT; ciz(false); });
    return () => { tik(); dur(); };
  };
})();
