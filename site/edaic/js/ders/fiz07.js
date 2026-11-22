/* Fizyoloji Bölüm 7 · Alt hava yolları: bileşenler (K1 s. 24–29).
   Modeller şematiktir; kitaptan alınan değerler dışındaki sayılar temsilîdir ve her bileşenin altında belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const fmt = (v, d = 1) => {
    let s = (Math.round(v * 10 ** d) / 10 ** d).toFixed(d);
    if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
    return s.replace('.', ',').replace('-', '−');
  };
  const sg = (v, d = 1) => { const s = fmt(v, d); return /^[0,]+$/.test(s) || s[0] === '−' ? s : '+' + s; };
  const yazici = (cap) => { let son = ''; return (c) => { if (c !== son) { cap.innerHTML = REF(c); son = c; } }; };
  const cizgi = (l, a, b) => { l.setAttribute('x1', a[0].toFixed(1)); l.setAttribute('y1', a[1].toFixed(1)); l.setAttribute('x2', b[0].toFixed(1)); l.setAttribute('y2', b[1].toFixed(1)); };
  const basili = (el, sec, deger) => el.querySelectorAll(sec).forEach((b) => b.setAttribute('aria-pressed', String(deger(b))));

  /* ---------- 1 · Larinks: vokal kordlar, fizyolojik PEEP ve entübasyon (K1 s. 24) ---------- */
  VIZ.f07_peep = (el) => {
    const AP = [[88, 92], [160, 88], [54, 140], [124, 134], [198, 138], [80, 188], [150, 186], [214, 184]];
    const RISK = [5, 7, 6, 2]; // kollapsa yatkın alveoller, çökme sırası
    const BAR = [['peep', 'Ekspirasyon sonu alveol basıncı'], ['frc', 'Açık alveoller (FRC)'], ['itp', 'İntratorasik basınç'], ['vd', 'Venöz dönüş']];
    el.innerHTML = `<div class="viz-head">
        <div class="seg" role="group" aria-label="Hasta"><button type="button" data-m="spon" aria-pressed="true">Spontan solunum</button><button type="button" data-m="ett" aria-pressed="false">Entübe hasta</button></div>
        <label class="f07-range"><span>PEEPe</span><input type="range" min="0" max="10" step="1" value="0" disabled aria-label="Ekstrinsik PEEP, cmH₂O"><b class="f07-pv">uygulanmaz</b></label>
      </div>
      <div class="f07-peep">
        <figure class="f07-fig">
          <svg class="f07-glot" viewBox="0 0 220 226" role="img" aria-label="Glottisin yukarıdan görünüşü: vokal kordlar inspirasyonda açılır, ekspirasyonda hafifçe kapanır; entübe hastada tüp kordları açık tutar">
            <ellipse cx="110" cy="118" rx="92" ry="88" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.5"/>
            <polygon class="g-ac" fill="var(--screen)"/>
            <line class="g-ka" stroke="var(--muted)" stroke-width="12" stroke-linecap="round"/><line class="g-ka" stroke="var(--muted)" stroke-width="12" stroke-linecap="round"/>
            <line class="g-k" stroke="var(--paper)" stroke-width="8" stroke-linecap="round"/><line class="g-k" stroke="var(--paper)" stroke-width="8" stroke-linecap="round"/>
            <ellipse class="g-ar" rx="10" ry="8" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.5"/><ellipse class="g-ar" rx="10" ry="8" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.5"/>
            <circle class="g-ett" cx="110" cy="140" r="19" fill="var(--screen)" stroke="var(--accent)" stroke-width="6"/>
            <text x="110" y="21" text-anchor="middle" class="f07-t">ön</text><text x="110" y="222" text-anchor="middle" class="f07-t">arka</text>
          </svg>
          <figcaption class="g-cap"></figcaption>
        </figure>
        <figure class="f07-fig">
          <svg class="f07-alv" viewBox="0 0 260 220" role="img" aria-label="Bir bronşiyolün ucundaki alveoller ekspirasyonda açık kalır ya da kollabe olur">
            <path d="M130 0V58" stroke="var(--c-clin)" stroke-width="10" stroke-linecap="round"/>
            ${AP.map(([x, y]) => `<path d="M130 58L${x} ${y}" stroke="var(--c-clin)" stroke-width="4"/>`).join('')}
            ${AP.map(([x, y]) => `<circle class="a-c" cx="${x}" cy="${y}" stroke-width="2"/>`).join('')}
          </svg>
          <figcaption class="a-cap"></figcaption>
        </figure>
        <div class="f07-bars">${BAR.map(([k, ad]) => `<div class="f07-bar" data-b="${k}"><span>${ad}</span><b></b><span class="trk"><i></i></span></div>`).join('')}</div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model: alveol sayısı, kollaps hızı ve çubuk boyları temsilîdir, ölçek yoktur. Fizyolojik PEEP (3–4 cmH₂O) ve PEEPe (3–5 cmH₂O) değerleri kitaptandır. Her seçim entübasyondan hemen sonraki durumdan başlar. [[K1 s. 24]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const ac = $('.g-ac'), kk = [...el.querySelectorAll('.g-k')], ka = [...el.querySelectorAll('.g-ka')], ar = [...el.querySelectorAll('.g-ar')], ett = $('.g-ett');
    const alv = [...el.querySelectorAll('.a-c')], rng = $('input'), pv = $('.f07-pv'), gcap = $('.g-cap'), acap = $('.a-cap'), cap = yazici($('.viz-cap'));
    const bars = Object.fromEntries(BAR.map(([k]) => [k, el.querySelector(`[data-b="${k}"]`)]));
    const C = {
      si: '<b>Spontan solunum, inspirasyon.</b> Vokal kordlar abdüksiyonda; içeri doğru gaz akımına direnç azalır. [[K1 s. 24]]',
      se: '<b>Spontan solunum, ekspirasyon.</b> Kordlar hafifçe addüksiyona gelir, akıma direnç artar ve yaklaşık 3–4 cmH₂O’luk fizyolojik PEEP oluşur. Ekspirasyon boyunca küçük hava yollarında ve alveollerde pozitif basınç sürer: alveoller kollabe olmaz, FRC korunur. Bu PEEP ses çıkarma ve öksürük için de önemlidir. [[K1 s. 24]]',
      e0a: '<b>Entübe hasta, PEEPe yok.</b> Tüp kordların arasından geçer; kordlar ekspirasyonda addüksiyon yapamaz ve fizyolojik PEEP kaybolur. Ekspirasyonda alveolleri izleyin. [[K1 s. 24]]',
      e0b: '<b>Fizyolojik PEEP kayboldu.</b> Ekspirasyonda alveoller birer birer kollabe oluyor: atelektazi ve ventilasyon–perfüzyon (V̇/Q̇) uyumsuzluğu. Önlemek için PEEPe’yi fizyolojik düzeye (3–5 cmH₂O) getirin. [[K1 s. 24]]',
      e5: '<b>PEEPe fizyolojik düzeyde (3–5 cmH₂O).</b> Kaybolan fizyolojik PEEP’in yerini tutar: FRC korunur, atelektazi önlenir; entübasyondan sonra yaygın uygulamadır. Bedeli: PEEP intratorasik basıncı artırır, venleri dışarıdan sıkıştırır ve venöz dönüşü azaltır. [[K1 s. 24]]',
      e10: '<b>Fizyolojik düzeyin üstünde PEEPe.</b> Alveoller açık kalır, ama PEEP yükseldikçe intratorasik basınç da artar; venlere dışarıdan binen basınç onları daraltır ve venöz dönüş azalır. ICP artışında ve tonsillektomide PEEPe uygulamamak bu yüzden avantajlı olabilir. [[K1 s. 24]]',
    };
    let mod = 'spon', P = 0, T = RM ? 30 : 0;
    const PER = 4, TI = 1.6;
    const nRisk = () => (mod === 'ett' && P < 3 ? 4 - P : 0);
    const acik = (i) => { const k = RISK.indexOf(i); if (k < 0 || k >= nRisk()) return 1; return 1 - ease((T - (TI + PER * k)) / 2); };
    const bar = (k, f, txt, renk) => { const b = bars[k]; const i = b.querySelector('i'); i.style.width = (clamp(f, 0, 1) * 100).toFixed(1) + '%'; i.style.background = renk; b.querySelector('b').textContent = txt; };
    const draw = () => {
      const p = RM ? 3 : T % PER, ins = p < TI;
      const f = ins ? (1 - Math.cos((Math.PI * p) / TI)) / 2 : (1 + Math.cos((Math.PI * (p - TI)) / (PER - TI))) / 2;
      let w;
      if (mod === 'ett') w = 30;
      else { const g = ins ? ease(p / 0.45) : 1 - ease((p - TI) / 0.45); w = 15 + 33 * g; }
      const A = [110, 50], L = [110 - w, 180], R = [110 + w, 180];
      ac.setAttribute('points', `${A.join(',')} ${L.join(',')} ${R.join(',')}`);
      [kk, ka].forEach((arr) => { cizgi(arr[0], A, L); cizgi(arr[1], A, R); });
      ar[0].setAttribute('cx', L[0]); ar[0].setAttribute('cy', L[1] + 4); ar[1].setAttribute('cx', R[0]); ar[1].setAttribute('cy', R[1] + 4);
      ett.style.display = mod === 'ett' ? '' : 'none';
      let top = 0, coken = 0;
      alv.forEach((c, i) => {
        const o = acik(i); top += o; if (o < 0.5) coken++;
        c.setAttribute('r', (23 * (0.84 + 0.16 * f * o) * (0.28 + 0.72 * o)).toFixed(2));
        c.setAttribute('fill', o < 0.5 ? 'var(--crit-soft)' : 'var(--c-clin-soft)');
        c.setAttribute('stroke', o < 0.5 ? 'var(--crit)' : 'var(--c-clin)');
      });
      gcap.textContent = mod === 'ett' ? 'Tüp kordları açık tutar' : ins ? 'İnspirasyon: abdüksiyon' : 'Ekspirasyon: hafif addüksiyon';
      acap.textContent = coken ? `Atelektazi: ${coken} alveol kollabe` : ins ? 'İnspirasyon: alveoller dolar' : 'Ekspirasyon: alveoller açık';
      const frc = top / AP.length;
      if (mod === 'spon') {
        bar('peep', 0.35, '≈ 3–4 cmH₂O (fizyolojik)', 'var(--c-clin)');
        bars.itp.hidden = bars.vd.hidden = true;
      } else {
        bars.itp.hidden = bars.vd.hidden = false;
        bar('peep', P / 10, P ? P + ' cmH₂O (PEEPe)' : '0 cmH₂O', P ? 'var(--c-clin)' : 'var(--crit)');
        bar('itp', 0.2 + P * 0.075, P ? '↑ PEEPe ile artar' : 'karşılaştırma düzeyi', 'var(--warn)');
        bar('vd', 1 - P * 0.05, P ? '↓ PEEPe ile azalır' : 'karşılaştırma düzeyi', P > 5 ? 'var(--crit)' : 'var(--c-basic)');
      }
      bar('frc', frc, frc > 0.97 ? 'korunuyor' : 'azalıyor', frc > 0.97 ? 'var(--ok)' : 'var(--crit)');
      cap(mod === 'spon' ? (ins ? C.si : C.se) : P < 3 ? (coken ? C.e0b : P ? C.e0a.replace('PEEPe yok.', `PEEPe ${P} cmH₂O, fizyolojik düzeyin altında.`) : C.e0a) : P <= 5 ? C.e5 : C.e10);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m]'); if (!b) return;
      mod = b.dataset.m; T = RM ? 30 : 0;
      basili(el, '[data-m]', (x) => x === b);
      rng.disabled = mod !== 'ett';
      pv.textContent = mod === 'ett' ? P + ' cmH₂O' : 'uygulanmaz';
      draw();
    });
    rng.addEventListener('input', () => { P = +rng.value; T = RM ? 30 : 0; pv.textContent = P + ' cmH₂O'; draw(); });
    draw();
    return ticker(el, (dt) => { if (RM) return; T += dt; draw(); });
  };

  /* ---------- 2 · Trakeobronşiyal ağaç: 23 kuşak (K1 s. 25–26) ---------- */
  VIZ.f07_agac = (el) => {
    const GR = [
      { a: 0, b: 0, ad: 'Trakea', k: 'C şeklinde halkalar', m: 'trakealis kası (arka duvar)', t: 'Krikoid kıkırdağın alt kenarında (C6) başlar, karinada (T4/5) ikiye ayrılır. Ön ve yan duvarı C şeklinde kıkırdak halkalarla desteklenir, arkadaki açıklığı trakealis kası kapatır; halkalar aşırı inspiratuvar çabanın yüksek negatif basıncında kollapsı önler. İlk kuşaklar silyalı, yalancı çok katlı prizmatik epitelle döşelidir. [[K1 s. 25–26]]' },
      { a: 1, b: 1, ad: 'Ana bronşlar', k: 'kıkırdaklı hava yolu', t: 'Sağ ana bronş soldakinden daha kısa, daha geniş ve daha diktir; yabancı cisimler ve endotrakeal tüpler bu yüzden daha çok sağa girer. Sağ üst lob bronşu karinanın yalnızca 2 cm distalinde çıkar, sol ana bronş 5 cm sonra ikiye ayrılır. [[K1 s. 26]]' },
      { a: 2, b: 2, ad: 'Lob bronşları', k: 'kıkırdaklı hava yolu', t: 'Sağ akciğerin üç (üst, orta, alt), solun iki (üst, alt) lobu vardır. Lingula sol üst lobun bir parçasıdır; evrimde kaybolmuş sol orta lobun kalıntısı sayılır. [[K1 s. 26]]' },
      { a: 3, b: 4, ad: 'Segment bronşları', k: 'düzensiz plaklar', m: 'epiteli çevreleyen tabaka', t: 'Sağda 10 (üst lob 3, orta lob 2, alt lob 5), solda 9 (üst lob 5, alt lob 4) bronkopulmoner segment vardır. Epiteli bir düz kas tabakası çevreler; düzensiz biçimli kıkırdak plaklar kollapsı önler. [[K1 s. 26]]' },
      { a: 5, b: 11, ad: 'Subsegment bronşları', k: 'düzensiz plaklar', m: 'epiteli çevreleyen tabaka', t: 'Segment bronşlarıyla aynı duvar yapısı: epiteli çevreleyen düz kas ve düzensiz kıkırdak plaklar. Kıkırdaklı hava yolları 11. kuşakta biter. [[K1 s. 25–26]]' },
      { a: 12, b: 15, ad: 'Bronşiyoller', k: 'yok', m: 'var: bronkokonstriksiyon ve bronkodilatasyon', t: 'Kıkırdak içermeyen ilk kuşak. Düz kas kasılarak (bronkokonstriksiyon) ya da gevşeyerek (bronkodilatasyon) gaz akımını ayarlar. [[K1 s. 26]]' },
      { a: 16, b: 16, ad: 'Terminal bronşiyoller', k: 'yok', t: 'İletici bölgenin son (16.) kuşağı. 0–16. kuşakların toplam hacmi, yaklaşık 150 mL’lik anatomik ölü boşluktur. [[K1 s. 25–26]]' },
      { a: 17, b: 19, ad: 'Respiratuvar bronşiyoller', k: 'yok', t: 'Solunumsal bölgenin ilk kuşakları. Ağırlıklı olarak iletici işlev görürler; duvarlarına dağılmış alveoller gaz değişimine katılır. [[K1 s. 26]]' },
      { a: 20, b: 22, ad: 'Alveoler kanallar', k: 'yok', t: 'Respiratuvar bronşiyollerin ayrıldığı kanallar; alveoler keselere ve alveollere açılır. Solunumsal bölgenin istirahatteki hacmi yaklaşık 3000 mL’dir. [[K1 s. 25–26]]' },
      { a: 23, b: 23, ad: 'Alveoler keseler ve alveoller', k: 'yok', t: 'Ağacın son kuşağı. Yaklaşık 300 milyon alveol, gaz değişimi için yaklaşık 70 m²’lik yüzey sağlar; her alveolü pulmoner dolaşımdan gelen bir kapiller ağ sarar. [[K1 s. 26]]' },
    ];
    // Toplam kesit alanı (cm²), yalnız eğrinin biçimi için: Weibel'in simetrik modeli (Atlas notu; değerler gösterilmez)
    const ALAN = [2.5, 2.3, 2.1, 2.0, 2.5, 3.1, 4.0, 5.1, 6.95, 9.6, 13.4, 19.6, 28.8, 44.5, 69.4, 113, 180, 300, 534, 944, 1600, 3220, 5880, 11800];
    const grp = (z) => GR.find((g) => z >= g.a && z <= g.b);
    const LEN = [60, 50, 40, 32, 25, 20, 16, 12], ANG = [0, 30, 25, 21, 18, 16, 14, 12], WID = [13, 9, 6.6, 5, 3.8, 2.9, 2.2, 1.7];
    const seg = [];
    const buyut = (x, y, a, d) => {
      const x2 = x + LEN[d] * Math.cos(a), y2 = y + LEN[d] * Math.sin(a);
      seg.push([x, y, x2, y2, d]);
      if (d < 7) { const t = (ANG[d + 1] * Math.PI) / 180; [a - t, a + t].forEach((b) => buyut(x2, y2, b * 0.78 + (Math.PI / 2) * 0.22, d + 1)); }
    };
    buyut(0, 0, Math.PI / 2, 0);
    const xs = seg.flatMap((s) => [s[0], s[2]]), ys = seg.flatMap((s) => [s[1], s[3]]);
    const X0 = Math.min(...xs) - 8, X1 = Math.max(...xs) + 8, Y0 = Math.min(...ys) - 8, Y1 = Math.max(...ys) + 8;
    const X = (z) => 30 + z * (262 / 23), Yc = (f) => 98 - f * 82;
    const alanF = (z) => ALAN[z] / ALAN[23], hizF = (z) => Math.min(1, ALAN[0] / ALAN[z]);
    const egri = (fn) => ALAN.map((_, z) => X(z).toFixed(1) + ',' + Yc(fn(z)).toFixed(1)).join(' ');
    el.innerHTML = `<div class="viz-head"><span class="small muted">Bir kuşak seçin ya da kaydırın</span><button type="button" class="btn ghost play">Trakeadan alveole</button></div>
      <div class="f07-ag">
        <div class="f07-ag-cizim">
          <svg class="f07-ag-agac" viewBox="${X0.toFixed(0)} ${Y0.toFixed(0)} ${(X1 - X0).toFixed(0)} ${(Y1 - Y0).toFixed(0)}" role="img" aria-label="Trakeadan başlayıp her kuşakta ikiye bölünen hava yolu ağacı; ilk sekiz kuşak (0–7) çizildi">
            ${seg.map(([x, y, x2, y2, d]) => `<line class="t-s" data-d="${d}" x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="${WID[d]}"/>`).join('')}
          </svg>
          <svg class="f07-ag-asinus" viewBox="0 0 240 150" role="img" aria-label="Büyütülmüş solunumsal bölge: terminal bronşiyol, respiratuvar bronşiyol, alveoler kanal ve alveoler keseler">
            <text x="4" y="14" class="f07-t">solunumsal bölge, büyütülmüş</text>
            <g class="ac" data-a="16" data-b="16"><path d="M6 44L52 62" class="ac-yol" stroke-width="10"/><text x="10" y="70" class="f07-t">16</text></g>
            <g class="ac" data-a="17" data-b="19"><path d="M52 62L104 84" class="ac-yol" stroke-width="9"/>${[[70, 63], [92, 87]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" class="ac-alv"/>`).join('')}<text x="62" y="104" class="f07-t">17–19</text></g>
            <g class="ac" data-a="20" data-b="22"><path d="M104 84L156 104" class="ac-yol" stroke-width="9"/>${[[112, 76], [126, 81], [140, 87], [116, 96], [130, 102], [144, 107]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" class="ac-alv"/>`).join('')}<text x="112" y="126" class="f07-t">20–22</text></g>
            <g class="ac" data-a="23" data-b="23">${[[166, 94], [184, 86], [176, 112], [196, 104], [212, 92], [204, 122], [222, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" class="ac-alv"/>`).join('')}<text x="206" y="146" class="f07-t">23</text></g>
          </svg>
          <p class="f07-ag-not small muted"></p>
        </div>
        <div class="f07-ag-bilgi">
          <div class="f07-ag-bas"><span class="f07-zno"></span><h3 class="f07-ag-ad"></h3></div>
          <div class="f07-chips"></div>
          <p class="f07-ag-t small"></p>
          <p class="f07-ag-say small"></p>
          <svg class="f07-ag-egri" viewBox="0 0 310 124" role="img" aria-label="Kuşak ilerledikçe toplam kesit alanı artar, gazın ilerleme hızı düşer">
            <line x1="30" x2="294" y1="98" y2="98" stroke="var(--line)"/>
            <line x1="${X(16.5)}" x2="${X(16.5)}" y1="12" y2="98" stroke="var(--line)" stroke-dasharray="3 4"/>
            <polyline points="${egri(alanF)}" fill="none" stroke="var(--c-clin)" stroke-width="2.6"/>
            <polyline points="${egri(hizF)}" fill="none" stroke="var(--crit)" stroke-width="2.2" stroke-dasharray="6 4"/>
            <line class="e-z" y1="12" y2="98" stroke="var(--accent)" stroke-width="1.5"/>
            <circle class="e-a" r="4.5" fill="var(--c-clin)"/><circle class="e-h" r="4.5" fill="var(--crit)"/>
            <text x="${X(0)}" y="114" text-anchor="middle" class="f07-t">0</text><text x="${X(16)}" y="114" text-anchor="middle" class="f07-t">16</text><text x="${X(23)}" y="114" text-anchor="middle" class="f07-t">23</text>
            <text x="142" y="52" class="f07-t" style="fill:var(--crit)">gazın ilerleme hızı</text>
            <text x="252" y="30" class="f07-t" text-anchor="end" style="fill:var(--c-clin)">toplam kesit alanı</text>
          </svg>
        </div>
      </div>
      <div class="f07-serit" role="group" aria-label="Kuşaklar">${ALAN.map((_, z) => `<button type="button" data-z="${z}" class="${z <= 16 ? 'il' : 'so'}" aria-label="Kuşak ${z}"><span>${z}</span></button>`).join('')}</div>
      <div class="f07-serit-alt"><span class="kk" style="grid-column:1/13">kıkırdaklı 0–11</span><span style="grid-column:13/25">kıkırdaksız 12–23</span></div>
      <div class="f07-serit-alt"><span class="il" style="grid-column:1/18">iletici bölge 0–16</span><span class="so" style="grid-column:18/25">solunumsal 17–23</span></div>
      <label class="f07-range f07-range-blok"><span>Kuşak</span><input type="range" min="0" max="23" step="1" value="0" aria-label="Hava yolu kuşağı"><b class="f07-zv">0</b></label>
      <p class="viz-foot">${REF('Ağaç şematiktir; yalnız ilk 8 kuşak (0–7) çizildi. Hava yolu sayısı (2ᶻ) ve eğrilerin biçimi Weibel’in simetrik modeline göredir (Atlas notu; gerçek ağaç asimetriktir, eğriler göreli ve sayısızdır). Kuşak adları, bölgeler ve kıkırdak sınırı kitaptandır. [[K1 s. 25–26]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const lines = [...el.querySelectorAll('.t-s')], acs = [...el.querySelectorAll('.ac')], cells = [...el.querySelectorAll('.f07-serit button')], rng = $('input');
    let Z = 0, run = false, acc = 0;
    const sec = (z) => {
      Z = z; const g = grp(z);
      rng.value = z; $('.f07-zv').textContent = z;
      cells.forEach((c, i) => c.classList.toggle('on', i === z));
      lines.forEach((l) => {
        const d = +l.dataset.d;
        l.classList.toggle('on', z <= 7 ? d === z : z <= 16 ? d === 7 : false);
        l.classList.toggle('fade', z <= 7 && d > z);
        l.classList.toggle('resp', z >= 17 && d === 7);
      });
      acs.forEach((a) => a.classList.toggle('on', z >= +a.dataset.a && z <= +a.dataset.b));
      $('.f07-ag-asinus').classList.toggle('akt', z >= 16);
      $('.f07-ag-not').textContent = z <= 7 ? `Vurgulu: ${z}. kuşak.` : z <= 16 ? '8–16. kuşaklar çizilemeyecek kadar çok ve ince; ağacın uçlarında temsil ediliyor.' : 'Solunumsal bölge: büyütülmüş çizimde vurgulu.';
      $('.f07-zno').textContent = g.a === g.b ? `Kuşak ${z}` : `Kuşak ${z} · grup ${g.a}–${g.b}`;
      $('.f07-ag-ad').textContent = g.ad;
      const ileti = z <= 16;
      $('.f07-chips').innerHTML = `<span class="tag ${ileti ? 'basic' : 'clin'}">${ileti ? 'İletici bölge' : 'Solunumsal bölge'}</span><span class="tag ${g.k === 'yok' ? '' : 'gold'}">${g.k === 'yok' ? 'Kıkırdak yok' : 'Kıkırdak: ' + g.k}</span>${g.m ? `<span class="tag">Düz kas: ${g.m}</span>` : ''}`;
      $('.f07-ag-t').innerHTML = REF(g.t);
      $('.f07-ag-say').innerHTML = `Bu kuşaktaki hava yolu sayısı (simetrik model): <b>2${String(z).replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])} = ${(2 ** z).toLocaleString('tr-TR')}</b>`;
      const e = $('.e-z'); e.setAttribute('x1', X(z)); e.setAttribute('x2', X(z));
      $('.e-a').setAttribute('cx', X(z)); $('.e-a').setAttribute('cy', Yc(alanF(z)));
      $('.e-h').setAttribute('cx', X(z)); $('.e-h').setAttribute('cy', Yc(hizF(z)));
    };
    el.addEventListener('click', (e) => {
      const c = e.target.closest('.f07-serit button'); if (c) { run = false; sec(+c.dataset.z); return; }
      if (e.target.closest('.play')) { if (RM) { sec(23); return; } run = true; acc = 0; sec(0); }
    });
    rng.addEventListener('input', () => { run = false; sec(+rng.value); });
    sec(0);
    return ticker(el, (dt) => { if (!run) return; acc += dt; if (acc >= 0.8) { acc = 0; if (Z >= 23) run = false; else sec(Z + 1); } });
  };

  /* ---------- 3 · Mukosiliyer taşıma ve nemlendirme (K1 s. 24–25) ---------- */
  VIZ.f07_silya = (el) => {
    const NC = 10, GOB = [2, 6], CY = 132;
    const MOD = {
      nor: { gaz: 'burundan: ılık, nemli gaz', renk: 'var(--warn)', v: 0, c: '<b>Normal.</b> Üst hava yolu solunan havayı ısıtır ve nemlendirir. Goblet hücrelerinin mukusu partikülleri yakalar; silyalar uyum içinde çarparak mukusu orofarinkse doğru taşır, orada yutulur ya da balgamla atılır. [[K1 s. 24–25]]' },
      kuru: { gaz: 'tüpten: soğuk, kuru gaz', renk: 'var(--c-basic)', v: 1, c: '<b>Tüp, nemlendirme yok.</b> Endotrakeal ya da trakeostomi tüpü üst hava yolunu atlar. Soğuk ve kuru gaz mukusun viskozitesini artırır ve mukosiliyer taşımayı bozar: alt hava yollarında mukus birikir, pulmoner enfeksiyon riski artar, mikroatelektazi gelişir. [[K1 s. 24]]' },
      hme: { gaz: 'tüp + HME/nemlendirici: ılık, nemli', renk: 'var(--warn)', v: 0, c: '<b>Yapay ısıtma ve nemlendirme.</b> Ameliyatta çoğunlukla ısı ve nem değiştirici (HME), yoğun bakımda sıcak su banyolu nemlendirici solunan gazı ısıtıp nemlendirir; mukus akışkan kalır ve taşıma sürer. [[K1 s. 24]]' },
    };
    const hucre = Array.from({ length: NC }, (_, i) => {
      const x = i * 40;
      if (GOB.includes(i)) return `<rect x="${x + 1}" y="${CY}" width="38" height="96" rx="6" fill="var(--paper)" stroke="var(--line)"/><path d="M${x + 7} ${CY + 2}Q${x + 20} ${CY + 44} ${x + 33} ${CY + 2}" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.5"/>${[0, 1, 2].map((j) => `<circle cx="${x + 14 + j * 6}" cy="${CY + 12 + (j % 2) * 7}" r="2.6" fill="var(--warn)" opacity=".7"/>`).join('')}<ellipse cx="${x + 20}" cy="${CY + 72}" rx="7" ry="10" fill="var(--c-basic)" opacity=".35"/>`;
      return `<rect x="${x + 1}" y="${CY}" width="38" height="96" rx="6" fill="var(--paper)" stroke="var(--line)"/><ellipse cx="${x + 20}" cy="${CY + 62}" rx="8" ry="12" fill="var(--c-basic)" opacity=".35"/>`;
    }).join('');
    const SIL = [];
    for (let i = 0; i < NC; i++) if (!GOB.includes(i)) for (let j = 0; j < 6; j++) SIL.push(i * 40 + 5 + j * 6);
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Solunan gaz"><button type="button" data-m="nor" aria-pressed="true">Burundan solunum</button><button type="button" data-m="kuru" aria-pressed="false">Tüp: kuru gaz</button><button type="button" data-m="hme" aria-pressed="false">Tüp: HME / nemlendirici</button></div></div>
      <div class="f07-sil">
        <svg class="f07-sil-svg" viewBox="0 0 400 236" role="img" aria-label="Silyalı epitel, goblet hücreleri ve mukus tabakası; partiküller mukusa yakalanıp orofarinkse taşınır">
          <text class="s-gaz f07-tb" x="200" y="20" text-anchor="middle"></text>
          <g class="s-ok">${[110, 200, 290].map((x) => `<path d="M${x} 30v24M${x - 6} 47l6 8 6-8" fill="none" stroke-width="2.4" stroke-linecap="round"/>`).join('')}</g>
          <path d="M14 64H96M14 64l9-6M14 64l9 6" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round"/><text x="104" y="68" class="f07-t">orofarinkse</text>
          <rect class="s-muk" x="0" width="400" fill="var(--warn-soft)"/><rect class="s-mukk" x="0" width="400" fill="var(--warn)"/>
          <rect x="0" y="110" width="400" height="22" fill="var(--c-basic-soft)" opacity=".55"/>
          ${hucre}
          <g class="s-sil">${SIL.map(() => '<line stroke="var(--c-basic)" stroke-width="1.8" stroke-linecap="round"/>').join('')}</g>
          <g class="s-par"></g>
        </svg>
        <div class="legend" style="margin-top:6px"><span><i style="background:var(--warn-soft);border:1px solid var(--warn)"></i>mukus</span><span><i style="background:var(--c-basic)"></i>silyalar</span><span><i style="background:var(--warn);opacity:.7"></i>goblet hücresi salgısı</span><span><i style="background:var(--ink);border-radius:50%"></i>partikül</span></div>
        <div class="f07-bars f07-bars-2">
          <div class="f07-bar" data-b="vis"><span>Mukus viskozitesi</span><b></b><span class="trk"><i></i></span></div>
          <div class="f07-bar" data-b="hiz"><span>Mukosiliyer taşıma</span><b></b><span class="trk"><i></i></span></div>
          <div class="f07-sayac"><span>Taşınan partikül <b class="s-n1">0</b></span><span>Hava yolunda biriken <b class="s-n2">0</b></span></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim; silya hareketi, taşıma hızı ve viskozite göreli birimlerdedir. Mekanizma ve sonuçlar kitaptandır. [[K1 s. 24–25]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const sil = [...el.querySelectorAll('.s-sil line')], parG = $('.s-par'), muk = $('.s-muk'), mukk = $('.s-mukk'), cap = yazici($('.viz-cap'));
    const okG = $('.s-ok'), gaz = $('.s-gaz');
    let mod = 'nor', vis = 0, t = 0, spawn = 0, tasinan = 0;
    const par = [];
    const ekle = (x, y, kon) => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '3.2'); c.setAttribute('fill', 'var(--ink)'); c.setAttribute('opacity', '.75'); parG.appendChild(c); par.push({ x, y, kon, c }); };
    if (RM) [60, 150, 230, 320].forEach((x) => ekle(x, 0, true));
    const bar = (k, f, txt, renk) => { const b = el.querySelector(`[data-b="${k}"]`); const i = b.querySelector('i'); i.style.width = (clamp(f, 0, 1) * 100).toFixed(1) + '%'; i.style.background = renk; b.querySelector('b').textContent = txt; };
    const draw = () => {
      const th = 14 + 18 * vis, mt = 110 - th;
      muk.setAttribute('y', mt.toFixed(1)); muk.setAttribute('height', th.toFixed(1));
      mukk.setAttribute('y', mt.toFixed(1)); mukk.setAttribute('height', th.toFixed(1)); mukk.setAttribute('opacity', (0.12 + 0.5 * vis).toFixed(2));
      const M = MOD[mod];
      gaz.textContent = M.gaz; gaz.style.fill = M.renk; okG.setAttribute('stroke', M.renk);
      sil.forEach((l, i) => {
        const bx = SIL[i], th2 = RM ? 0.3 : 0.55 * Math.sin(t * 9 - bx * 0.05);
        cizgi(l, [bx, CY], [bx - 22 * Math.sin(th2), CY - 22 * Math.cos(th2)]);
      });
      let bir = 0;
      par.forEach((p) => { if (p.kon) { p.y = mt + 3; bir++; } p.c.setAttribute('cx', p.x.toFixed(1)); p.c.setAttribute('cy', p.y.toFixed(1)); });
      $('.s-n1').textContent = tasinan; $('.s-n2').textContent = bir;
      bar('vis', 0.25 + 0.75 * vis, vis > 0.5 ? 'artmış' : 'normal', vis > 0.5 ? 'var(--crit)' : 'var(--ok)');
      bar('hiz', 1 - 0.88 * vis, vis > 0.5 ? 'bozulmuş' : 'normal', vis > 0.5 ? 'var(--crit)' : 'var(--ok)');
      cap(M.c);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m]'); if (!b) return;
      mod = b.dataset.m; basili(el, '[data-m]', (x) => x === b);
      if (RM) vis = MOD[mod].v;
      draw();
    });
    draw();
    return ticker(el, (dt) => {
      if (RM) return;
      t += dt;
      vis += (MOD[mod].v - vis) * (1 - Math.exp(-dt / 2.2));
      const v = 46 * (1 - 0.88 * vis), mt = 110 - (14 + 18 * vis);
      spawn += dt;
      if (spawn > 0.45 && par.length < 46) { spawn = 0; ekle(40 + Math.random() * 350, 26, false); }
      for (let i = par.length - 1; i >= 0; i--) {
        const p = par[i];
        if (!p.kon) { p.y += 70 * dt; if (p.y >= mt + 3) p.kon = true; }
        else { p.x -= v * dt; if (p.x < -4) { p.c.remove(); par.splice(i, 1); tasinan++; } }
      }
      draw();
    });
  };

  /* ---------- 4 · Çift lümenli tüp: sağ üst lob bronşu 2 cm, sol ana bronş 5 cm (K1 s. 26) ---------- */
  VIZ.f07_cift = (el) => {
    const S = 27, K = [220, 116];
    const nrm = (x, y) => { const l = Math.hypot(x, y); return [x / l, y / l]; };
    const dR = nrm(-0.42, 0.91), dL = nrm(0.72, 0.69), uRUL = nrm(-0.93, -0.36), uLUL = nrm(0.88, -0.47), uLLL = nrm(0.42, 0.91);
    const at = (d, s, off = 0) => [K[0] + d[0] * s * S - d[1] * off, K[1] + d[1] * s * S + d[0] * off];
    const P2 = (p) => p.map((v) => v.toFixed(1)).join(' ');
    const yol = (a, b, w, renk, ek = '') => `<path d="M${P2(a)}L${P2(b)}" stroke="${renk}" stroke-width="${w}" stroke-linecap="round" fill="none"${ek}/>`;
    const yan = (u, p, L) => [p[0] + u[0] * L, p[1] + u[1] * L];
    el.innerHTML = `<div class="viz-head">
        <div class="seg" role="group" aria-label="Tüpün tarafı"><button type="button" data-t="sol" aria-pressed="true">Sol taraflı tüp</button><button type="button" data-t="sag" aria-pressed="false">Sağ taraflı tüp</button></div>
        <button type="button" class="btn ghost" data-a="var" aria-pressed="false">Varyasyon: sağ üst lob bronşu daha proksimal</button>
      </div>
      <div class="f07-clt">
        <svg class="f07-clt-svg" viewBox="0 0 440 300" role="img" aria-label="Önden görünüşte trakea, karina ve ana bronşlar; çift lümenli tüpün bronşiyal kafı ve sağ üst lob bronşu"><g class="c-g"></g></svg>
        <div class="f07-clt-yan">
          <label class="f07-range f07-range-blok"><span>Bronşiyal ucun karinaya uzaklığı</span><input type="range" min="0.5" max="6" step="0.1" value="3.2" aria-label="Bronşiyal ucun karinaya uzaklığı, cm"><b class="f07-dv"></b></label>
          <div class="f07-durum"></div>
          <div class="legend"><span><i style="background:var(--accent)"></i>tüp</span><span><i style="background:var(--c-basic)"></i>bronşiyal kaf</span><span><i style="background:var(--paper);border:1.5px solid var(--c-basic)"></i>yan delik (sağ tüp)</span><span><i style="background:var(--ok)"></i>uygun uç konumu (model)</span></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Önden görünüş: hastanın sağı solda. Şematik model; 2 cm ve 5 cm uzaklıklar kitaptandır, tüp, kaf ve yan delik boyutları ile yeşil bant yaklaşıktır ve tüp tipine göre değişir. [[K1 s. 26]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const g = $('.c-g'), rng = $('input'), dv = $('.f07-dv'), durum = $('.f07-durum'), cap = yazici($('.viz-cap'));
    let taraf = 'sol', d = 3.2, varyant = false;
    const ust = (a, b, c, e) => Math.max(0, Math.min(b, e) - Math.max(a, c));
    const durumu = (dd) => {
      const r = varyant ? 1.2 : 2;
      if (taraf === 'sol') { if (dd - 1.6 < 0) return 'sig'; if (dd > 5) return 'derin'; return 'ok'; }
      const kafUst = dd - 1.8;
      if (kafUst < 0) return 'sig';
      if (kafUst > r + 0.3) return 'derin';
      if (ust(dd - 1.35, dd - 0.85, r - 0.3, r + 0.3) >= 0.3) return 'ok';
      return 'tikali';
    };
    const ciz = () => {
      const r = varyant ? 1.2 : 2, dir = taraf === 'sol' ? dL : dR, st = durumu(d);
      const Lb = at(dL, 5), Rr = at(dR, r), Rend = at(dR, 5.6);
      const rulE = yan(uRUL, Rr, 56), lulE = yan(uLUL, Lb, 52), lllE = yan(uLLL, Lb, 60);
      const duvar = 'var(--muted)', lumen = 'var(--chip)';
      const rulRenk = taraf === 'sag' && st === 'tikali' ? 'var(--crit-soft)' : taraf === 'sag' && st === 'ok' ? 'var(--ok-soft)' : lumen;
      const lulRenk = taraf === 'sol' && st === 'derin' ? 'var(--crit-soft)' : lumen;
      let s = '';
      s += yol([220, -6], K, 54, duvar) + yol(K, Rend, 38, duvar) + yol(K, Lb, 32, duvar) + yol(Rr, rulE, 26, duvar) + yol(Lb, lulE, 26, duvar) + yol(Lb, lllE, 28, duvar);
      s += yol([220, -6], K, 46, lumen) + yol(K, Rend, 30, lumen) + yol(K, Lb, 24, lumen) + yol(Rr, rulE, 19, rulRenk) + yol(Lb, lulE, 19, lulRenk) + yol(Lb, lllE, 21, lumen);
      // uygun uç bandı
      const ok = []; for (let x = 0.5; x <= 6.0001; x += 0.05) if (durumu(x) === 'ok') ok.push(x);
      // tüp yolu: sol tüp 5 cm'yi geçerse alt lob bronşuna sapar
      const nL = [-uLLL[1], uLLL[0]];
      const pt = (x, off = 0) => (taraf === 'sol' && x > 5 ? [Lb[0] + uLLL[0] * (x - 5) * S + nL[0] * off, Lb[1] + uLLL[1] * (x - 5) * S + nL[1] * off] : at(dir, x, off));
      const hat = (a, b, off = 0) => { const p = []; for (let x = a; x < b; x += 0.1) p.push(pt(x, off)); p.push(pt(b, off)); return 'M' + p.map(P2).join('L'); };
      // uygun uç bandı: dış (lateral) duvarın hemen yanında
      const bOff = taraf === 'sol' ? -23 : 26;
      if (ok.length) s += `<path d="${hat(ok[0], ok[ok.length - 1], bOff)}" stroke="var(--ok)" stroke-width="7" stroke-linecap="round" fill="none" opacity=".8"/>`;
      const tipM = pt(d, bOff);
      s += `<circle cx="${tipM[0].toFixed(1)}" cy="${tipM[1].toFixed(1)}" r="5.5" fill="${st === 'ok' ? 'var(--ok)' : 'var(--crit)'}" stroke="var(--paper)" stroke-width="2"/>`;
      // uzaklık işaretleri: iç (medial) duvarda çentik ve etiket
      const cent = (dd, s1, o1, o2, oT, etiket) => { const m = at(dd, s1, oT); return yol(at(dd, s1, o1), at(dd, s1, o2), 2, 'var(--ink)') + `<text x="${m[0].toFixed(1)}" y="${(m[1] + 5).toFixed(1)}" text-anchor="middle" class="f07-tb">${etiket}</text>`; };
      s += cent(dR, r, -12, -26, -44, fmt(r, r % 1 ? 1 : 0) + ' cm') + cent(dL, 5, 10, 24, 40, '5 cm');
      // tüp
      const kafA = taraf === 'sol' ? 1.6 : 1.8, kafB = taraf === 'sol' ? 0.55 : 0.4, kafW = taraf === 'sol' ? 25 : 31;
      s += `<ellipse cx="220" cy="60" rx="24" ry="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>`;
      s += `<path d="${hat(d - kafA, d - kafB)}" stroke="var(--c-basic)" stroke-width="${kafW}" stroke-linecap="round" fill="none" opacity=".85"/>`;
      s += `<path d="M220 -6L220 96Q220 ${K[1]} ${P2(at(dir, 0.55))}${hat(0.6, d).replace('M', 'L')}" stroke="var(--accent)" stroke-width="13" fill="none"/>`;
      s += `<rect x="213.5" y="90" width="13" height="8" rx="2" fill="var(--screen)"/>`;
      if (taraf === 'sag') s += yol(at(dR, d - 1.35, 8), at(dR, d - 0.85, 8), 5, 'var(--paper)');
      if (taraf === 'sag' && st === 'tikali') { const m = yan(uRUL, Rr, 34); s += `<text x="${m[0].toFixed(1)}" y="${(m[1] + 6).toFixed(1)}" text-anchor="middle" class="c-x">×</text>`; }
      if (taraf === 'sol' && st === 'derin') { const m = yan(uLUL, Lb, 30); s += `<text x="${m[0].toFixed(1)}" y="${(m[1] + 6).toFixed(1)}" text-anchor="middle" class="c-x">×</text>`; }
      // etiketler
      s += `<text x="16" y="22" class="f07-tb">SAĞ</text><text x="424" y="22" text-anchor="end" class="f07-tb">SOL</text>`;
      s += `<text x="256" y="30" class="f07-t">trakea</text><path d="M300 104L228 116" stroke="var(--muted)" stroke-width="1"/><text x="304" y="106" class="f07-t">karina</text>`;
      s += `<text x="${(rulE[0] - 4).toFixed(1)}" y="${(rulE[1] - 18).toFixed(1)}" text-anchor="middle" class="f07-t">sağ üst lob</text>`;
      s += `<text x="${(Rend[0] - 6).toFixed(1)}" y="${(Rend[1] + 30).toFixed(1)}" text-anchor="middle" class="f07-t">orta ve alt loblara</text>`;
      s += `<text x="${(lulE[0] - 30).toFixed(1)}" y="${(lulE[1] - 20).toFixed(1)}" class="f07-t">sol üst lob</text>`;
      s += `<text x="${(lllE[0] - 10).toFixed(1)}" y="${(lllE[1] + 26).toFixed(1)}" text-anchor="middle" class="f07-t">sol alt lob</text>`;
      g.innerHTML = s;
      dv.textContent = fmt(d) + ' cm';
      const AD = { ok: ['ok', 'Uygun konum'], sig: ['warn', 'Çok sığ'], derin: ['warn', 'Çok derin'], tikali: ['crit', 'Sağ üst lob bronşu tıkalı'] };
      durum.innerHTML = `<span class="tag ${AD[st][0]}">${AD[st][1]}</span>`;
      const V = varyant ? ' Sağ üst lob bronşunun yeri kişiden kişiye değişir; konum her zaman fiberoptik bronkoskopiyle doğrulanmalıdır. [[K1 s. 26]]' : '';
      const C = {
        sol: {
          ok: '<b>Sol taraflı tüp, uygun konum.</b> Bronşiyal kaf sol ana bronşta. Sol ana bronş karinadan ancak 5 cm sonra ikiye ayrıldığı için kafın oturabileceği uzun bir bölüm vardır: yeşil bant geniştir. [[K1 s. 26]]',
          derin: '<b>Sol tüp çok derin.</b> Uç sol ana bronşun ikiye ayrıldığı yeri geçti; bronşiyal lümen tek bir lobu havalandırır, öbür lobun ağzı tıkanabilir (Atlas notu). Tüpü yeşil banda çekin.',
          sig: '<b>Sol tüp çok sığ.</b> Bronşiyal kaf karinaya ve trakeaya taşıyor; iki akciğerin birbirinden ayrılması güvenilir olmaz (Atlas notu).',
        },
        sag: {
          ok: '<b>Sağ taraflı tüp, uygun konum.</b> Yan delik sağ üst lob bronşunun ağzıyla hizada. Bu bronş karinaya çok yakın, tipik olarak yalnızca 2 cm distalinde çıktığı için hizalamanın toleransı çok dardır: yeşil banda bakın. [[K1 s. 26]]',
          tikali: '<b>Sağ üst lob bronşu tıkalı.</b> Bronşiyal kaf lob bronşunun ağzını kapatıyor: sağ taraflı tüpün başlıca riski. Sol taraflı tüplerin bazı sağ toraks ameliyatlarında bile sıklıkla tercih edilmesinin nedeni budur. [[K1 s. 26]]',
          derin: '<b>Sağ tüp çok derin.</b> Sağ üst lob bronşunun ağzı kafın proksimalinde kaldı; bronşiyal lümen yalnız orta ve alt lobları havalandırır (Atlas notu).',
          sig: '<b>Sağ tüp çok sığ.</b> Bronşiyal kaf karinaya ve trakeaya taşıyor; iki akciğerin birbirinden ayrılması güvenilir olmaz (Atlas notu).',
        },
      };
      cap(C[taraf][st] + (varyant && taraf === 'sol' ? ' Sol taraflı tüp sağ ana bronşa girmediği için sağ üst lob bronşunun yerinden etkilenmez. [[K1 s. 26]]' : V));
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-t]');
      if (b) { taraf = b.dataset.t; basili(el, '[data-t]', (x) => x === b); d = taraf === 'sol' ? 3.2 : varyant ? 2.3 : 3.1; rng.value = d; ciz(); return; }
      const v = e.target.closest('[data-a="var"]');
      if (v) { varyant = !varyant; v.setAttribute('aria-pressed', String(varyant)); ciz(); }
    });
    rng.addEventListener('input', () => { d = +rng.value; ciz(); });
    ciz();
    return () => {};
  };

  /* ---------- 5 · Alveol: hücreler ve alveoler–kapiller bariyer (K1 s. 26–27) ---------- */
  VIZ.f07_alveol = (el) => {
    const CX = 150, CY = 140, R = 98;
    const pol = (a, r) => [CX + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];
    const kap = Array.from({ length: 14 }, (_, i) => pol(i * (360 / 14) + 8, 114));
    const tip2 = [-50, 150, 250], cekirdek = [10, 100, 205, 300];
    const MAK = 62;
    const SEC = {
      tip1: '<b>Tip I pnömositler.</b> Son derece ince, özelleşmiş epitel hücreleri; etkin gaz değişimine olanak verir. Alveol yüzeyinin yaklaşık %90’ını kaplarlar ve bariyerin alveol tarafındaki tabakasıdır. [[K1 s. 26–27]]',
      tip2: '<b>Tip II pnömositler.</b> Kalan yaklaşık %10’luk yüzeyi kaplayan özelleşmiş salgı hücreleri; alveol yüzeyini pulmoner sürfaktanla örterler (kesik çizgi). [[K1 s. 26]]',
      mak: '<b>Alveoler makrofajlar.</b> Monositlerden köken alır; alveoler septalarda ve akciğer interstisyumunda bulunur. İletici bölgenin mukosiliyer taşıma sisteminden kaçan partikülleri fagosite eder. [[K1 s. 27]]',
      bar: '<b>Alveoler–kapiller bariyer.</b> Üç tabaka: tip I pnömosit, hücre dışı matriks ve kapiller endoteli. Bazı yerlerde yalnızca 200 nm kalınlığındadır; ince olmasına karşın matriksteki tip IV kollajen sayesinde çok güçlüdür. O₂, CO₂, karbon monoksit, N₂O ve volatil anestezikler gibi küçük gaz moleküllerine geçirgendir; gaz kabarcıklarının dolaşıma, kanın alveole girmesini önler ve suyun transüdasyonunu sınırlar. [[K1 s. 27]]',
      kap: '<b>Kapiller ağ.</b> Her alveolü pulmoner dolaşımdan gelen bir kapiller ağ sarar; insan akciğerindeki yaklaşık 300 milyon alveol yaklaşık 70 m²’lik bir değişim yüzeyi oluşturur. [[K1 s. 26]]',
    };
    const AD = [['tip1', 'Tip I pnömosit'], ['tip2', 'Tip II pnömosit'], ['mak', 'Alveoler makrofaj'], ['bar', 'Alveoler–kapiller bariyer'], ['kap', 'Kapiller ağ']];
    const t2 = tip2.map((a) => { const [x, y] = pol(a, R - 10); return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a + 90})"><rect x="-15" y="-12" width="30" height="22" rx="7" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>${[-7, 0, 7].map((dx) => `<circle cx="${dx}" cy="-1" r="2.6" fill="var(--accent)"/>`).join('')}</g>`; }).join('');
    const mk = (() => { const [x, y] = pol(MAK, R + 2); return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><path d="M-20 -4C-22 -16 -6 -20 2 -15C10 -22 24 -14 20 -3C28 4 18 18 6 14C-2 22 -18 16 -16 6C-26 4 -24 -2 -20 -4Z" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/><ellipse cx="0" cy="0" rx="7" ry="5" fill="var(--c-clin)" opacity=".5"/><circle cx="10" cy="6" r="2.4" fill="var(--ink)"/><circle cx="-9" cy="7" r="2" fill="var(--ink)"/></g>`; })();
    el.innerHTML = `<div class="f07-alv-ust" role="group" aria-label="Yapı seçin">${AD.map(([k, a], i) => `<button type="button" class="f07-chip" data-h="${k}" aria-pressed="${i === 0}">${a}</button>`).join('')}</div>
      <div class="f07-alveol" data-h="tip1">
        <svg class="f07-alv-a" viewBox="0 0 300 282" role="img" aria-label="Kesitte bir alveol: duvarı tip I ve tip II pnömositler, çevresinde kapillerler, septumda bir makrofaj">
          <g class="h-kap">${kap.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10.5" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.4"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="3.4" fill="var(--crit)" opacity=".75"/>`).join('')}</g>
          <circle cx="${CX}" cy="${CY}" r="${R}" fill="var(--paper)"/>
          <g class="h-tip1"><circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="var(--c-basic)" stroke-width="3.5"/>${cekirdek.map((a) => { const [x, y] = pol(a, R - 2); return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="9" ry="3.2" transform="rotate(${a + 90} ${x.toFixed(1)} ${y.toFixed(1)})" fill="var(--c-basic)"/>`; }).join('')}</g>
          <g class="h-tip2"><circle cx="${CX}" cy="${CY}" r="${R - 6}" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-dasharray="3 4"/>${t2}</g>
          <g class="h-mak">${mk}</g>
          <g class="h-bar"><rect x="${CX + R - 10}" y="${CY - 2}" width="34" height="28" rx="4" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="4 3"/></g>
          <text x="${CX}" y="${CY + 5}" text-anchor="middle" class="f07-tb">alveol (gaz)</text>
          <g class="a-gaz"></g>
        </svg>
        <svg class="f07-alv-b" viewBox="0 0 280 252" role="img" aria-label="Büyütülmüş alveoler–kapiller bariyer: tip I pnömosit, hücre dışı matriks, kapiller endoteli; O₂ kana, CO₂ alveole geçer">
          <text x="10" y="16" class="f07-t">büyütme: işaretli kare</text>
          <rect x="0" y="22" width="280" height="56" fill="var(--paper)"/><text x="10" y="44" class="f07-tb">alveol gazı</text>
          <g class="h-tip1 h-bar"><rect x="0" y="78" width="280" height="26" fill="var(--c-basic-soft)" stroke="var(--c-basic)"/><text x="10" y="96" class="f07-t" style="fill:var(--c-basic)">tip I pnömosit</text></g>
          <g class="h-bar"><rect x="0" y="104" width="280" height="22" fill="var(--warn-soft)"/><path d="${Array.from({ length: 14 }, (_, i) => `M${i * 20} 108l10 14l10 -14`).join('')}" stroke="var(--warn)" stroke-width="1" fill="none" opacity=".6"/><text x="10" y="120" class="f07-t" style="fill:var(--warn)">matriks · tip IV kollajen</text></g>
          <g class="h-kap h-bar"><rect x="0" y="126" width="280" height="24" fill="var(--crit-soft)" stroke="var(--crit)"/><text x="10" y="143" class="f07-t" style="fill:var(--crit)">kapiller endoteli</text></g>
          <rect x="0" y="150" width="280" height="102" fill="var(--paper)"/><text x="10" y="172" class="f07-tb">kapiller kan</text>
          <ellipse cx="196" cy="208" rx="46" ry="20" fill="var(--crit)" opacity=".8"/><text x="196" y="213" text-anchor="middle" class="f07-t" style="fill:var(--paper)">eritrosit</text>
          <path d="M266 78V150M260 78H272M260 150H272" stroke="var(--ink)" stroke-width="1.4" fill="none"/><text x="276" y="182" text-anchor="end" class="f07-tb">≈ 200 nm</text>
          <g class="b-gaz"></g>
        </svg>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim, ölçekli değildir; gaz molekülleri yalnızca yönü gösterir (O₂ mavi, CO₂ gri). Yapılar ve değerler kitaptandır. [[K1 s. 26–27]]')}</p>`;
    const kutu = el.querySelector('.f07-alveol'), cap = yazici(el.querySelector('.viz-cap')), bg = el.querySelector('.b-gaz');
    const GZ = Array.from({ length: 6 }, (_, i) => ({ o2: i % 3 !== 2, x: 214 + i * 7, f: i / 6 }));
    bg.innerHTML = GZ.map((m) => `<g><circle r="5" fill="${m.o2 ? 'var(--c-basic)' : 'var(--muted)'}"/><text y="-8" text-anchor="middle" class="f07-t" style="font-size:10px">${m.o2 ? 'O₂' : 'CO₂'}</text></g>`).join('');
    const gz = [...bg.children];
    const sec = (h) => { kutu.dataset.h = h; basili(el, '[data-h]', (b) => b.dataset.h === h); cap(SEC[h]); };
    el.addEventListener('click', (e) => { const b = e.target.closest('.f07-chip'); if (b) sec(b.dataset.h); });
    const draw = () => GZ.forEach((m, i) => {
      const f = m.f, y = m.o2 ? 36 + f * 124 : 160 - f * 124;
      gz[i].setAttribute('transform', `translate(${m.x} ${y.toFixed(1)})`);
      gz[i].setAttribute('opacity', (Math.sin(Math.PI * f) * 0.9 + 0.1).toFixed(2));
    });
    sec('tip1'); draw();
    return ticker(el, (dt) => { if (RM) return; GZ.forEach((m) => { m.f = (m.f + dt * 0.28) % 1; }); draw(); });
  };

  /* ---------- 6 · Tidal solunumda akciğere etki eden kuvvetler; ARDS ve pnömotoraks (K1 s. 27–29) ---------- */
  VIZ.f07_mekanik = (el) => {
    const CN = 500 / 3, R0 = 0.35 / CN; // kompliyans (mL/cmH₂O) ve direnç (cmH₂O·s/mL): τ ≈ 0,35 s
    const SC = { nor: { C: CN }, ards: { C: 50 }, ptx: { C: CN } };
    const PER = 5, TI = 1.6, TH = 0.7, TE = 0.9, N = 200;
    const FAZ = [['run', 'Sürekli'], ['a', 'a · istirahat'], ['b', 'b · erken insp.'], ['c', 'c · insp. sonu'], ['d', 'd · ekspirasyon']];
    el.innerHTML = `<div class="viz-head f07-mk-bas">
        <div class="seg" role="group" aria-label="Akciğer"><button type="button" data-s="nor" aria-pressed="true">Normal</button><button type="button" data-s="ards" aria-pressed="false">ARDS</button><button type="button" data-s="ptx" aria-pressed="false">Pnömotoraks</button></div>
        <div class="seg" role="group" aria-label="Evre">${FAZ.map(([k, a], i) => `<button type="button" data-f="${k}" aria-pressed="${i === 0}">${a}</button>`).join('')}</div>
      </div>
      <div class="f07-mk">
        <svg class="f07-mk-gogus" viewBox="0 0 320 300" role="img" aria-label="Göğüs kafesi, plevral boşluk, akciğer ve diyafram; basınçlar ve hava akımı">
          <path class="m-kafes" stroke="var(--muted)" stroke-width="7" stroke-dasharray="11 5"/>
          <path class="m-akc" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="2"/>
          <path class="m-dyf" fill="none" stroke="var(--crit)" stroke-width="5" stroke-linecap="round"/>
          <g class="m-pel"></g><g class="m-gd"></g>
          <rect class="m-tr" x="150" y="0" width="20" fill="var(--paper)" stroke="var(--muted)" stroke-width="2"/>
          <g class="m-ok"><path class="m-okp" fill="none" stroke="var(--c-basic)" stroke-width="3" stroke-linecap="round"/></g>
          <g class="m-del"><path d="M300 150H276M282 144l-7 6 7 6" stroke="var(--crit)" stroke-width="2.4" fill="none" stroke-linecap="round"/><text x="312" y="136" text-anchor="end" class="f07-t" style="fill:var(--crit)">hava</text></g>
          <text x="10" y="18" class="f07-tb">PB = 0</text>
          <text class="m-akl f07-tb" text-anchor="middle">akciğer</text>
          <text class="m-pll f07-t" text-anchor="middle"></text>
          <text x="160" y="296" text-anchor="middle" class="f07-t" style="fill:var(--crit)">diyafram</text>
        </svg>
        <div class="f07-mk-sag">
          <div class="f07-oku"></div>
          <svg class="f07-mk-graf" viewBox="0 0 420 226" role="img" aria-label="Son 10 saniyede intraplevral basınç, alveol basıncı ve hacim">
            <g class="m-grid"></g>
            <polyline class="m-ppl" fill="none" stroke="var(--c-clin)" stroke-width="2.6" stroke-linejoin="round"/>
            <polyline class="m-pa" fill="none" stroke="var(--c-basic)" stroke-width="2.2" stroke-linejoin="round"/>
            <polyline class="m-v" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round"/>
            <text x="44" y="222" class="f07-t" style="fill:var(--c-clin)">— Ppl</text><text x="112" y="222" class="f07-t" style="fill:var(--c-basic)">— PA (cmH₂O)</text><text x="250" y="222" class="f07-t" style="fill:var(--accent-ink)">— ΔV (mL)</text>
          </svg>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Tek bölmeli model (Atlas): PA = Ppl + Pel; Pel = 5 + ΔV/C; akım = (PB − PA)/R. Normal C = 500 mL / 3 cmH₂O kitaptaki örnekten; ARDS kompliyansı, direnç, zaman ölçeği ve çizim oranları şematiktir. Sürekli modda akciğer Ppl’yi gecikmeyle izlediği için PA’daki sapma ±3 cmH₂O’dan küçüktür; a–d düğmeleri kitaptaki dört evreyi tek tek gösterir. Basınçlar cmH₂O, PB = 0. [[K1 s. 27–29]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const kafes = $('.m-kafes'), akc = $('.m-akc'), dyf = $('.m-dyf'), pelG = $('.m-pel'), gdG = $('.m-gd'), tr = $('.m-tr'), okp = $('.m-okp'), del = $('.m-del'), akl = $('.m-akl'), pll = $('.m-pll');
    const oku = $('.f07-oku'), cap = yazici($('.viz-cap')), grid = $('.m-grid');
    let sc = 'nor', faz = RM ? 'a' : 'run', t = 0, V = 0, Ppl = -5, sKas = 0, akim = 0;
    const H = Array.from({ length: N }, () => ({ p: -5, a: 0, v: 0 }));
    let acc = 0;
    const kas = (tc) => (tc < TI ? (1 - Math.cos((Math.PI * tc) / TI)) / 2 : tc < TI + TH ? 1 : tc < TI + TH + TE ? (1 + Math.cos((Math.PI * (tc - TI - TH)) / TE)) / 2 : 0);
    const Pel = (v) => Math.max(0, 5 + v / SC[sc].C);
    const sekil = (cx, top, rx, h, dome) => {
      const yM = top + 0.55 * h, yB = top + h;
      return `M${(cx - rx).toFixed(1)} ${yM.toFixed(1)}A${rx.toFixed(1)} ${(0.55 * h).toFixed(1)} 0 0 1 ${(cx + rx).toFixed(1)} ${yM.toFixed(1)}L${(cx + 0.96 * rx).toFixed(1)} ${yB.toFixed(1)}Q${cx} ${(yB - 2 * dome).toFixed(1)} ${(cx - 0.96 * rx).toFixed(1)} ${yB.toFixed(1)}Z`;
    };
    const ok = (x, y, ux, uy, L, renk, w = 2.4) => { const x2 = x + ux * L, y2 = y + uy * L, px = -uy, py = ux; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}M${(x2 - ux * 6 + px * 4.5).toFixed(1)} ${(y2 - uy * 6 + py * 4.5).toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}L${(x2 - ux * 6 - px * 4.5).toFixed(1)} ${(y2 - uy * 6 - py * 4.5).toFixed(1)}" stroke="${renk}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
    const Yp = (p) => 12 + ((6 - p) / 16) * 108, xg = (i) => 44 + (i / (N - 1)) * 366;
    const vAr = () => (sc === 'ptx' ? [-900, 600] : [-60, 600]);
    const Yv = (v) => { const [a, b] = vAr(); return 198 - ((clamp(v, a, b) - a) / (b - a)) * 60; };
    const izgara = () => {
      grid.innerHTML = [-8, -5, 0, 3].map((p) => `<line x1="44" x2="410" y1="${Yp(p)}" y2="${Yp(p)}" stroke="var(--line)"${p === 0 ? '' : ' stroke-dasharray="3 4"'}/><text x="38" y="${Yp(p) + 4}" text-anchor="end" class="f07-t">${sg(p, 0)}</text>`).join('')
        + (sc === 'ptx' ? [-800, 0, 500] : [0, 500]).map((v) => `<line x1="44" x2="410" y1="${Yv(v)}" y2="${Yv(v)}" stroke="var(--line)" stroke-dasharray="3 4"/><text x="38" y="${Yv(v) + 4}" text-anchor="end" class="f07-t">${fmt(v, 0)}</text>`).join('')
        + `<text x="410" y="${Yp(0) - 5}" text-anchor="end" class="f07-t">PB</text><text x="410" y="132" text-anchor="end" class="f07-t">son 10 sn →</text>`;
    };
    const evre = () => {
      if (faz !== 'run') return faz;
      const tc = t % PER;
      return tc < TI ? 'b' : tc < TI + TH + 0.1 ? 'c' : tc < TI + TH + TE + 0.9 ? 'd' : 'a';
    };
    const CAP = {
      a: '<b>a · İstirahat, FRC.</b> Göğüs duvarının dışa yaylanma eğilimi intraplevral basıncı yaklaşık −5 cmH₂O’da tutar; akciğerin içe elastik geri çekilmesi (Pel) buna eşit ve zıttır. Alveol basıncı atmosfer basıncına eşit, akım yok. [[K1 s. 27]]',
      b: '<b>b · İnspirasyon.</b> Diyafram kasılıp iner (sakin solunumda 1–2 cm). Göğüs kafesi hava geçirmez olduğundan toraks genişleyince Ppl −5’ten −8 cmH₂O’ya düşer ve elastik geri çekilmeyi aşar: PA atmosferin altına iner, hava girer. [[K1 s. 27]]',
      c: '<b>c · İnspirasyon sonu.</b> Gerilen elastik lifler Pel’i, Ppl ile eşit ve zıt olana dek (≈ +8 cmH₂O) artırmıştır. PA yeniden atmosfer basıncına eşit, akım durur. [[K1 s. 27]]',
      d: '<b>d · Ekspirasyon.</b> İnspiratuvar kaslar gevşer; göğüs kafesi ve diyafram pasif olarak dinlenme konumuna döner, Ppl yeniden −5 cmH₂O olur. Pel henüz yüksektir: PA atmosfer basıncını aşar, hava dışarı akar ve PA yeniden PB’ye eşitlenince akım durur. [[K1 s. 28]]',
    };
    const draw = () => {
      const ptx = sc === 'ptx', pe = Pel(V), PA = Ppl + pe, ev = evre();
      // akciğer ve göğüs kafesi
      let lrx, lh, ld, lt;
      if (V >= 0) { const u = V / 500; lrx = 104 + 6 * u; lh = 196 + 18 * u; ld = 30 - 9 * u; lt = 58; }
      else { const f = clamp(1 + V / 1100, 0, 1); lrx = 104 * (0.4 + 0.6 * f); lh = 196 * (0.36 + 0.64 * f); ld = 30 * f; lt = 58 + 24 * (1 - f); }
      let krx, kh, kd, kt;
      if (!ptx) { krx = lrx + 7; kh = lh + 14; kd = ld; kt = lt - 7; }
      else { const u = 0.5 + sKas; krx = 111 + 6 * u; kh = 210 + 18 * u; kd = 30 - 9 * u; kt = 51; }
      kafes.setAttribute('d', sekil(160, kt, krx, kh, kd));
      kafes.setAttribute('fill', ptx ? 'var(--bg)' : 'var(--c-clin-soft)');
      akc.setAttribute('d', sekil(160, lt, lrx, lh, ld));
      const yB = kt + kh;
      dyf.setAttribute('d', `M${(160 + 0.96 * krx).toFixed(1)} ${yB.toFixed(1)}Q160 ${(yB - 2 * kd).toFixed(1)} ${(160 - 0.96 * krx).toFixed(1)} ${yB.toFixed(1)}`);
      tr.setAttribute('height', (lt + 4).toFixed(1));
      // içe geri çekilme (Pel) ve göğüs duvarı okları
      const yM = lt + 0.55 * lh, L = 4 + 2.3 * pe;
      pelG.innerHTML = ok(160 - lrx + 2, yM, 1, 0, L, 'var(--c-basic)') + ok(160 + lrx - 2, yM, -1, 0, L, 'var(--c-basic)') + ok(160 - 0.62 * lrx, lt + 0.16 * lh, 0.6, 0.8, L * 0.85, 'var(--c-basic)') + ok(160 + 0.62 * lrx, lt + 0.16 * lh, -0.6, 0.8, L * 0.85, 'var(--c-basic)');
      const kyM = kt + 0.55 * kh;
      gdG.innerHTML = ok(160 - krx - 4, kyM + 40, -1, 0, 14, 'var(--muted)', 2) + ok(160 + krx + 4, kyM + 40, 1, 0, 14, 'var(--muted)', 2);
      // hava akımı oku
      const fl = clamp(akim / 900, -1, 1), Lo = Math.abs(fl) * 34;
      if (Lo > 3) { const y0 = fl > 0 ? 6 : 46, dir = fl > 0 ? 1 : -1, y1 = y0 + dir * Lo; okp.setAttribute('d', `M160 ${y0}V${y1.toFixed(1)}M154 ${(y1 - dir * 7).toFixed(1)}L160 ${y1.toFixed(1)}L166 ${(y1 - dir * 7).toFixed(1)}`); }
      else okp.setAttribute('d', '');
      del.style.display = ptx ? '' : 'none';
      akl.setAttribute('x', 160); akl.setAttribute('y', (lt + 0.6 * lh).toFixed(1));
      pll.setAttribute('x', 160); pll.setAttribute('y', Math.min(lt + lh + 24, yB - 30).toFixed(1));
      pll.textContent = ptx ? 'plevral boşlukta hava' : '';
      // okumalar
      const akT = Math.abs(PA) < 0.05 ? 'yok' : PA < 0 ? 'içeri ↓' : 'dışarı ↑';
      oku.innerHTML = [['PA', 'alveol', sg(PA)], ['Ppl', 'intraplevral', sg(Ppl)], ['Pel', 'içe geri çekilme', sg(pe)], ['ΔV', 'FRC üzerinde, mL', sg(V, 0)], ['Akım', '', akT], ['PB', 'atmosfer', '0']]
        .map(([k, a, v]) => `<span><i>${k}</i><b>${v}</b><em>${a}</em></span>`).join('');
      // grafik
      $('.m-ppl').setAttribute('points', H.map((h, i) => xg(i).toFixed(1) + ',' + Yp(clamp(h.p, -10, 6)).toFixed(1)).join(' '));
      $('.m-pa').setAttribute('points', H.map((h, i) => xg(i).toFixed(1) + ',' + Yp(clamp(h.a, -10, 6)).toFixed(1)).join(' '));
      $('.m-v').setAttribute('points', H.map((h, i) => xg(i).toFixed(1) + ',' + Yv(h.v).toFixed(1)).join(' '));
      // açıklama
      let c;
      if (ptx) c = V > -5 * CN + 40 ? '<b>Pnömotoraks.</b> Plevral boşluk atmosferle birleşti; negatif Ppl havayı içeri çekti ve Ppl atmosfer basıncına eşitlendi (0). Akciğer kendi içe elastik geri çekilmesine yenik düşüyor: PA pozitif, hava dışarı çıkıyor ve akciğer küçülüyor. [[K1 s. 29]]' : '<b>Pnömotoraks: akciğer kollabe.</b> Ppl = PB olduğu için geri çekilmeye karşı koyan kuvvet kalmadı. Modelde solunum kasları çalışmayı sürdürür, ama Ppl atmosfer basıncında kaldığı için bu akciğere hava girmez. [[K1 s. 27–29]]';
      else {
        c = CAP[ev];
        if (sc === 'ards' && (ev === 'b' || ev === 'c')) c += ' <b>ARDS:</b> kompliyans düşük; aynı 3 cmH₂O’luk Ppl değişikliği çok daha küçük bir tidal hacim üretir. [[K1 s. 28]]';
        if (sc === 'nor' && ev === 'c') c += ' Normal akciğerde bu 3 cmH₂O’luk değişiklik yaklaşık 500 mL tidal hacim oluşturabilir. [[K1 s. 28]]';
      }
      cap(c);
    };
    const statik = (f) => {
      const C = SC[sc].C;
      sKas = f === 'b' || f === 'c' ? 1 : 0;
      V = f === 'c' || f === 'd' ? 3 * C : 0;
      Ppl = -5 - 3 * sKas;
      akim = -(Ppl + Pel(V)) / R0 * 0.35;
      if (f === 'a' || f === 'c') akim = 0;
    };
    const sifirla = () => { t = 0; V = 0; Ppl = -5; sKas = 0; akim = 0; H.forEach((h) => { h.p = -5; h.a = 0; h.v = 0; }); };
    el.addEventListener('click', (e) => {
      const s = e.target.closest('[data-s]');
      if (s) {
        const once = sc; sc = s.dataset.s; basili(el, '[data-s]', (b) => b === s);
        if (sc === 'ptx') { faz = 'run'; basili(el, '[data-f]', (b) => b.dataset.f === 'run'); }
        else if (once === 'ptx') sifirla();
        el.querySelectorAll('[data-f]').forEach((b) => { b.disabled = sc === 'ptx' && b.dataset.f !== 'run'; });
        if (faz !== 'run') statik(faz);
        izgara(); draw(); return;
      }
      const f = e.target.closest('[data-f]');
      if (f && !f.disabled) { faz = f.dataset.f; basili(el, '[data-f]', (b) => b === f); if (faz !== 'run') statik(faz); else if (RM) sifirla(); draw(); }
    });
    const adim = (h) => {
      const C = SC[sc].C, ptx = sc === 'ptx';
      t += h;
      sKas = kas(t % PER);
      if (ptx) Ppl += (0 - Ppl) * (1 - Math.exp(-h / 0.4));
      else Ppl = -5 - 3 * sKas;
      const R = ptx ? R0 * 3 : R0;
      akim = -(Ppl + Pel(V)) / R;
      V += akim * h;
      if (V < -5 * C) { V = -5 * C; akim = 0; }
    };
    izgara();
    if (faz !== 'run') statik(faz);
    draw();
    return ticker(el, (dt) => {
      if (faz !== 'run' || (RM && sc !== 'ptx')) return;
      const n = Math.max(1, Math.round(dt / 0.005));
      for (let i = 0; i < n; i++) {
        adim(dt / n);
        acc += dt / n;
        if (acc >= 0.05) { acc -= 0.05; H.shift(); H.push({ p: Ppl, a: Ppl + Pel(V), v: V }); }
      }
      draw();
    });
  };

  /* ---------- 7 · Akciğerin metabolik işlevleri: pulmoner kapillerden geçen maddeler (K1 s. 29) ---------- */
  VIZ.f07_filtre = (el) => {
    const KAT = { ina: 'İnaktive edilir', gec: 'Değişmeden geçer', don: 'Dönüştürülür', tut: 'Önemli ölçüde tutulur' };
    const M = [
      { id: 'na', k: 'NA', ad: 'Noradrenalin', s: ['ina', 'tut'], a: 'ina', t: '<b>Noradrenalin</b> akciğerden geçerken inaktive edilir; kitap onu akciğerde önemli tutulum ve ilk geçiş metabolizmasına uğrayan anestezi ilaçları arasında da sayar. [[K1 s. 29]]' },
      { id: 'adr', k: 'A', ad: 'Adrenalin', s: ['gec'], a: 'gec', t: '<b>Adrenalin</b> akciğerden değişmeden geçer; noradrenalin ise inaktive edilir. [[K1 s. 29]]' },
      { id: 'ser', k: '5-HT', ad: 'Serotonin', s: ['ina'], a: 'ina', t: '<b>Serotonin</b> akciğerde inaktive edilir. [[K1 s. 29]]' },
      { id: 'pg', k: 'PG', ad: 'Prostaglandinler', s: ['ina'], a: 'ina', t: '<b>Prostaglandinler</b> akciğerde inaktive edilir. [[K1 s. 29]] Atlas notu: bu genelleme PGE ve PGF₂α için geçerlidir; prostasiklin (PGI₂) akciğerden büyük ölçüde değişmeden geçer.' },
      { id: 'bk', k: 'BK', ad: 'Bradikinin', s: ['ina'], a: 'ina', ace: 'kismi', t: '<b>Bradikinin</b> akciğerde inaktive edilir; ACE bradikinini yıkan üç enzimden biridir. [[K1 s. 29]]', tA: '<b>Bradikinin, ACE inhibitörüyle.</b> ACE inhibe edilince bradikinin yıkımı azalır ve bradikinin birikir; bu fazlalık inatçı bir öksürüğe yol açabilir ve ACE inhibitörüne bağlı anjiyoödemle ilişkilendirilmiştir. [[K1 s. 29]]' },
      { id: 'ach', k: 'ACh', ad: 'Asetilkolin', s: ['ina'], a: 'ina', t: '<b>Asetilkolin</b> akciğerde inaktive edilir. [[K1 s. 29]]' },
      { id: 'adh', k: 'ADH', ad: 'Antidiüretik hormon', s: ['gec'], a: 'gec', t: '<b>Antidiüretik hormon</b> akciğerden değişmeden geçer. [[K1 s. 29]]' },
      { id: 'at1', k: 'AT I', ad: 'Anjiyotensin I', s: ['don'], a: 'don', ace: 'kismi', t: '<b>Anjiyotensin I</b>, anjiyotensin dönüştürücü enzim (ACE) ile anjiyotensin II’ye dönüştürülür. [[K1 s. 29]]', tA: '<b>Anjiyotensin I, ACE inhibitörüyle.</b> Dönüştürücü enzim inhibe edildiği için anjiyotensin II oluşumu azalır; ACE inhibitörlerinin etki mekanizması budur. [[K1 s. 29]]' },
      { id: 'at2', k: 'AT II', ad: 'Anjiyotensin II', s: ['gec'], a: 'gec', t: '<b>Anjiyotensin II</b> akciğerden değişmeden geçer. [[K1 s. 29]]' },
      { id: 'lid', k: 'Lid', ad: 'Lidokain', s: ['tut'], a: 'tut', t: '<b>Lidokain</b> akciğerde önemli ölçüde tutulur ve ilk geçiş metabolizmasına uğrar. [[K1 s. 29]] Atlas notu: bu tutulum büyük ölçüde geri dönüşlüdür; akciğer ilacı tutar ve kan düzeyi düştükçe yeniden dolaşıma verir.' },
      { id: 'fen', k: 'Fen', ad: 'Fentanil', s: ['tut'], a: 'tut', t: '<b>Fentanil</b> akciğerde önemli ölçüde tutulur ve ilk geçiş metabolizmasına uğrar. [[K1 s. 29]] Atlas notu: bu tutulum büyük ölçüde geri dönüşlüdür; akciğer ilacı tutar ve kan düzeyi düştükçe yeniden dolaşıma verir.' },
    ];
    el.innerHTML = `<div class="viz-head"><span class="small muted">Bir madde seçin; akciğerden geçince ne olacağını tahmin edin</span><button type="button" class="btn ghost" data-a="ace" aria-pressed="false">ACE inhibitörü: yok</button></div>
      <div class="f07-md" role="group" aria-label="Maddeler">${M.map((m) => `<button type="button" class="f07-mb" data-id="${m.id}" aria-pressed="false"><b>${m.k}</b><span>${m.ad}</span><i class="f07-mi"></i></button>`).join('')}</div>
      <svg class="f07-pk" viewBox="0 0 520 192" role="img" aria-label="Sağ kalpten gelen kan pulmoner kapillerden geçerek sol kalbe gider; bazı maddeler yolda değişir">
        ${[110, 170, 230, 290, 350, 410].map((x) => `<circle cx="${x}" cy="38" r="27" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.4"/><circle cx="${x}" cy="140" r="27" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.4"/>`).join('')}
        <text x="110" y="42" text-anchor="middle" class="f07-t p-alv">alveol</text>
        <rect x="6" y="52" width="84" height="74" rx="12" fill="var(--c-basic-soft)" stroke="var(--c-basic)"/><text x="48" y="78" text-anchor="middle" class="f07-tb">sağ kalp</text><text x="48" y="96" text-anchor="middle" class="f07-t p-alt">karışık</text><text x="48" y="111" text-anchor="middle" class="f07-t p-alt">venöz kan</text>
        <rect x="430" y="52" width="84" height="74" rx="12" fill="var(--crit-soft)" stroke="var(--crit)"/><text x="472" y="78" text-anchor="middle" class="f07-tb">sol kalp</text><text x="472" y="96" text-anchor="middle" class="f07-t p-alt">arteriyel</text><text x="472" y="111" text-anchor="middle" class="f07-t p-alt">kan</text>
        <rect x="90" y="70" width="340" height="38" fill="var(--crit-soft)" opacity=".7"/>
        <path d="M90 70H430M90 108H430" stroke="var(--crit)" stroke-width="2.4"/>
        ${[200, 222, 244, 266, 288, 310].map((x) => `<circle cx="${x}" cy="70" r="3.4" fill="var(--accent)"/><circle cx="${x + 11}" cy="108" r="3.4" fill="var(--accent)"/>`).join('')}
        <text x="260" y="188" text-anchor="middle" class="f07-t" style="fill:var(--accent-ink)">• endotel yüzeyinde ACE</text>
        <g class="p-par"></g>
        <g class="p-tok" style="display:none"><circle r="17" stroke-width="2.4"/><text y="4" text-anchor="middle" class="f07-tb"></text></g>
      </svg>
      <div class="f07-tahmin" hidden><span class="small">Tahmininiz:</span>${Object.entries(KAT).map(([k, v]) => `<button type="button" class="btn ghost" data-g="${k}">${v}</button>`).join('')}<button type="button" class="btn ghost" data-g="goster">Göster</button></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="f07-skor small muted"></p>
      <p class="viz-foot">${REF('Şematik çizim; hangi maddenin inaktive edildiği, değişmeden geçtiği, dönüştürüldüğü ya da tutulduğu kitaptandır. Oranlar gösterilmez. [[K1 s. 29]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const tok = $('.p-tok'), tc = tok.querySelector('circle'), tt = tok.querySelector('text'), parG = $('.p-par'), tah = $('.f07-tahmin'), skor = $('.f07-skor'), aceB = $('[data-a="ace"]'), cap = yazici($('.viz-cap'));
    let cur = null, T = -1, ace = false, dogru = 0, deneme = 0;
    const gorulen = new Set();
    cap('<b>Akciğer bir süzgeçtir.</b> Kalp debisinin neredeyse tamamı akciğerden geçtiği için akciğer dolaşımdaki pek çok maddeyi inaktive eder, bazılarını dönüştürür, bazılarına dokunmaz. Bir madde seçin. [[K1 s. 29]]');
    const anim = () => (cur ? (ace && cur.ace ? cur.ace : cur.a) : 'gec');
    const draw = () => {
      if (!cur || T < 0) { tok.style.display = 'none'; parG.innerHTML = ''; return; }
      const D = 3.4, f = clamp(T / D, 0, 1), x = 48 + f * 424, a = anim();
      const svg = tok.ownerSVGElement, kk = svg && svg.clientWidth && svg.clientWidth < 440 ? 1.45 : 1;
      let r = 17, op = 1, y = 89, renk = 'var(--c-basic)', lab = cur.k, frag = '';
      const mid = clamp((x - 200) / 120, 0, 1); // 200–320: işlem bölgesi
      if (a === 'ina') { r = 17 * (1 - 0.75 * mid); op = 1 - mid; frag = mid > 0.2 ? [0, 1, 2].map((j) => `<circle cx="${(260 + j * 18 - 18).toFixed(1)}" cy="${(j % 2 ? 72 + 10 * (1 - mid) : 106 - 10 * (1 - mid)).toFixed(1)}" r="3" fill="var(--muted)" opacity="${(0.4 + 0.5 * mid).toFixed(2)}"/>`).join('') : ''; renk = mid > 0.5 ? 'var(--muted)' : renk; }
      if (a === 'don') { renk = mid > 0.5 ? 'var(--crit)' : 'var(--c-basic)'; lab = mid > 0.5 ? 'AT II' : 'AT I'; }
      if (a === 'tut') { op = 1 - 0.6 * mid; r = 17 * (1 - 0.35 * mid); frag = mid > 0.1 ? `<circle cx="${(200 + 60 * mid).toFixed(1)}" cy="${(108 + 16 * mid).toFixed(1)}" r="${(4 + 6 * mid).toFixed(1)}" fill="var(--c-basic)" opacity=".55"/>` : ''; }
      if (a === 'kismi') { r = 17 * (1 - 0.15 * mid); renk = cur.id === 'at1' ? 'var(--c-basic)' : 'var(--warn)'; }
      tok.style.display = '';
      tok.setAttribute('transform', `translate(${x.toFixed(1)} ${y})`);
      tok.setAttribute('opacity', op.toFixed(2));
      tc.setAttribute('r', Math.max(0.1, r * kk).toFixed(1)); tc.setAttribute('fill', 'var(--paper)'); tc.setAttribute('stroke', renk);
      tt.textContent = lab; tt.style.fill = renk; tt.style.fontSize = (11 * kk).toFixed(1) + 'px'; tt.setAttribute('y', (4 * kk).toFixed(1));
      parG.innerHTML = frag;
    };
    const goster = (tahmin) => {
      const ok = tahmin && cur.s.includes(tahmin);
      if (tahmin && !gorulen.has(cur.id)) { deneme++; if (ok) dogru++; gorulen.add(cur.id); }
      const b = el.querySelector(`.f07-mb[data-id="${cur.id}"] .f07-mi`);
      b.textContent = KAT[cur.s[0]] + (cur.s.length > 1 ? ' · tutulur' : '');
      const bas = tahmin ? (ok ? '<b>Doğru.</b> ' : `<b>Tahmininiz: ${KAT[tahmin].toLocaleLowerCase('tr')}.</b> Doğrusu: ${KAT[cur.s[0]].toLocaleLowerCase('tr')}. `) : '';
      cap(bas + (ace && cur.tA ? cur.tA : cur.t));
      tah.hidden = true; T = RM ? 3.4 : 0;
      skor.textContent = deneme ? `Tahmin: ${dogru}/${deneme} doğru · ${M.length - gorulen.size} madde kaldı` : '';
      draw();
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const a = e.target.closest('[data-a="ace"]');
      if (a) { ace = !ace; a.setAttribute('aria-pressed', String(ace)); a.textContent = 'ACE inhibitörü: ' + (ace ? 'var' : 'yok'); if (cur && cur.ace && T >= 0) goster(null); return; }
      const m = e.target.closest('.f07-mb');
      if (m) {
        cur = M.find((x) => x.id === m.dataset.id); basili(el, '.f07-mb', (b) => b === m); T = -1; draw();
        if (ace && cur.ace) { goster(null); return; }
        tah.hidden = false; cap(`<b>${cur.ad}</b>: akciğerden geçerken ne olur?`); return;
      }
      const g = e.target.closest('[data-g]');
      if (g && cur) goster(g.dataset.g === 'goster' ? null : g.dataset.g);
    });
    return ticker(el, (dt) => { if (T < 0 || T > 3.4 || RM) return; T += dt; draw(); });
  };
})();

/* Okur-sade (2026-11-22) ile eklenen iki durağan şema: 8 · f07_islev, 9 · f07_brons (docs/tasarim/fiz07.md). */
(function () {
  'use strict';
  const { REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* Ortak seçim düzeni: data-k = tıklanınca seçilen anahtar; data-p = hangi anahtarlarda vurgulu kalacağı (boşlukla ayrılmış).
     Seçim yokken kök .sec sınıfını kaybeder, sayfadaki varsayılan viz-cap geri gelir. Esc ya da ikinci tık seçimi kaldırır. */
  const secici = (el, CAP, ekle) => {
    const kutu = el.closest('.viz');
    const cap = kutu && kutu.querySelector(':scope > .viz-cap');
    const cap0 = cap ? cap.innerHTML : '';
    let cur = null;
    const uygula = (k) => {
      cur = k;
      el.classList.toggle('sec', !!k);
      el.querySelectorAll('[data-p]').forEach((n) => n.classList.toggle('on', !!k && n.dataset.p.split(' ').includes(k)));
      el.querySelectorAll('[data-k]').forEach((n) => { if (n.tagName === 'BUTTON' || n.getAttribute('role') === 'button') n.setAttribute('aria-pressed', String(n.dataset.k === k)); });
      if (cap) cap.innerHTML = k ? REF(CAP[k]) : cap0;
      if (ekle) ekle(k);
    };
    const tik = (e) => {
      if (e.target.closest('.ref') || e.target.closest('[data-scroll]')) return;
      const n = e.target.closest('[data-k]'); if (!n || !el.contains(n)) return;
      uygula(cur === n.dataset.k ? null : n.dataset.k);
    };
    const tus = (e) => {
      if (e.key === 'Escape' && cur) { uygula(null); return; }
      const n = e.target.closest && e.target.closest('[data-k]');
      if (n && n.tagName !== 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); uygula(cur === n.dataset.k ? null : n.dataset.k); }
    };
    el.addEventListener('click', tik); el.addEventListener('keydown', tus);
    return () => { el.removeEventListener('click', tik); el.removeEventListener('keydown', tus); if (cap) cap.innerHTML = cap0; };
  };

  /* ---------- 8 · Solunumsal ve solunum dışı işlevler (K1 s. 24, 26, 27, 29) ---------- */
  VIZ.f07_islev = (el) => {
    const ok = (x1, y1, x2, y2, renk) => {
      const a = Math.atan2(y2 - y1, x2 - x1), u = 4.2;
      const p1 = [x2 - u * Math.cos(a - 0.5), y2 - u * Math.sin(a - 0.5)], p2 = [x2 - u * Math.cos(a + 0.5), y2 - u * Math.sin(a + 0.5)];
      return `<path d="M${x1} ${y1}L${x2} ${y2}M${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${x2} ${y2}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" stroke="${renk}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    };
    const alv = '<circle cx="8" cy="14" r="6" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.6"/>';
    const tup = '<rect x="20" y="3" width="6" height="22" rx="3" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.6"/>';
    const SIM = {
      gaz: `${ok(14, 12, 14, 2, 'var(--c-basic)')}${ok(14, 4, 14, 15, 'var(--c-basic)')}<circle cx="14" cy="22" r="4.5" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.6"/>`,
      o2: `${alv}${tup}${ok(14.5, 14, 19, 14, 'var(--c-basic)')}`,
      co2: `${alv}${tup}${ok(19, 14, 14.5, 14, 'var(--muted)')}`,
      surf: '<circle cx="14" cy="14" r="11" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.6"/><circle cx="14" cy="14" r="8.2" fill="none" stroke="var(--c-basic)" stroke-width="1" stroke-dasharray="2 1.6"/>',
      ph: '<rect x="2" y="5" width="24" height="18" rx="4" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="1.4"/><text x="14" y="18.5" text-anchor="middle" style="font:800 11px var(--f-display);fill:var(--c-clin)">pH</text>',
      kal: '<path d="M14 3L24 7V13C24 19 19.5 23.5 14 25.5C8.5 23.5 4 19 4 13V7Z" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.5 14L12.8 17.2L18.5 10.5" stroke="var(--c-clin)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      dam: '<path d="M14 26V15M14 15L5 6M14 15L23 6M9 10.5L6 13M19 10.5L22 13M14 15V4" stroke="var(--crit)" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
      sur: '<path d="M3 5H25L17 15V24L11 21V15Z" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="1.6" stroke-linejoin="round"/><circle cx="9" cy="8.5" r="1.2" fill="var(--c-clin)"/><circle cx="14" cy="8.5" r="1.2" fill="var(--c-clin)"/><circle cx="19" cy="8.5" r="1.2" fill="var(--c-clin)"/>',
    };
    const SOL = [
      ['gaz', 'Atmosfer ↔ alveol gaz hareketi', '<b>Gaz hareketi.</b> Gazların atmosfer ile alveoller arasında taşınması: bu bölümde tidal solunum mekaniği olarak işlenir. [[K1 s. 24, 27]]'],
      ['o2', 'O₂: alveol → pulmoner kapiller', '<b>O₂ geçişi.</b> O₂ alveollerden pulmoner kapillerlere geçer; geçtiği yer alveoler–kapiller bariyerdir (bu bölümde “Alveol”, difüzyon Bölüm 10). [[K1 s. 24, 27]]'],
      ['co2', 'CO₂: pulmoner kapiller → alveol', '<b>CO₂ geçişi.</b> CO₂ pulmoner kapillerlerden alveollere geçer, aynı bariyerden ters yönde. [[K1 s. 24, 27]]'],
      ['surf', 'Sürfaktan sentezi', '<b>Sürfaktan sentezi.</b> Kitap bunu solunumsal işlevler arasında sayar; sürfaktanı tip II pnömositler salgılar. Solunum dışı işlevlerdeki sentez listesinde (sürfaktan, nitrik oksit, heparinler) yeniden geçer. [[K1 s. 24, 26, 29]]'],
    ];
    const DIS = [
      ['ph', 'Asit–baz dengesi', '<b>Asit–baz dengesi.</b> Kitap bunu solunum dışı işlevler arasında sayar; bu bölümde ayrıca işlenmez. [[K1 s. 24]]'],
      ['kal', 'İmmünolojik savunma ve akciğer savunması', '<b>Savunma.</b> Korunacak alveoler yüzey 70 m² (kitaba göre deri 2 m², bağırsak 300 m²; bağırsak değeri için bölüm sonundaki Atlas notuna bakın). Mekanizmalar: solunan havanın süzülmesi, mukosiliyer taşıma, alveoler makrofajlar, IgA salgısı; öksürük ve hapşırık refleksleri. Ayrıntı bölüm sonunda. [[K1 s. 29]]'],
      ['dam', 'Vasküler işlevler', '<b>Vasküler işlevler.</b> Pulmoner dolaşım Bölüm 23’te işlenir. [[K1 s. 24, 29]]'],
      ['sur', 'Metabolik ve endokrin işlevler', '<b>Metabolik ve endokrin.</b> Kalp debisinin neredeyse tamamı akciğerden geçer: maddeleri inaktive eder, dönüştürür (ACE), sentezler ve salar. Ayrıntı ve etkileşimli süzgeç bölüm sonunda. [[K1 s. 29]]'],
    ];
    const CAP = Object.fromEntries([...SOL, ...DIS].map(([k, , t]) => [k, t]));
    const kart = ([k, ad]) => `<div class="f07-ik f07-dim" data-p="${k}">
        <button type="button" class="f07-ib" data-k="${k}" aria-pressed="false"><svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">${SIM[k]}</svg><span>${ad}</span></button>
        ${k === 'surf' ? '<span class="f07-rz">iki listede</span>' : ''}
        ${k === 'kal' || k === 'sur' ? '<button type="button" class="f07-il" data-scroll="d07-metab">↓ bölüm sonu</button>' : ''}
      </div>`;
    el.innerHTML = `<div class="f07-is">
        <div class="f07-isu f07-isu-s"><h4>Solunumsal işlevler<small>gaz değişimine hizmet eder</small></h4>${SOL.map(kart).join('')}</div>
        <div class="f07-isu f07-isu-d"><h4>Solunum dışı işlevler<small>gaz değişimi dışında</small></h4>${DIS.map(kart).join('')}</div>
      </div>
      <p class="viz-foot">${REF('Şematik; dört + dört işlev kitabın listesidir. [[K1 s. 24]]')}</p>`;
    return secici(el, CAP);
  };

  /* ---------- 9 · Trakeadan bronşiyole: duvar, loblar ve uzaklıklar (K1 s. 25–26) ---------- */
  VIZ.f07_brons = (el) => {
    const CAP = {
      trakea: '<b>Trakea.</b> Krikoid kıkırdağın alt kenarında (C6) başlar, karinada (T4/5) ikiye ayrılır. Ön ve yan duvarı C şeklinde kıkırdak halkalarla desteklenir; arka açıklığı trakealis kası kapatır. Halkalar, yüksek negatif hava yolu basıncının eşlik ettiği aşırı inspiratuvar çabada kollapsı önler. [[K1 s. 25–26]]',
      sag: '<b>Sağ ana bronş.</b> Soldakinden daha kısa, daha geniş ve daha diktir; solukla alınan yabancı cisimler ve endotrakeal tüpler bu yüzden daha çok sağa girer. [[K1 s. 26]]',
      d2: '<b>Sağ üst lob bronşu</b> sağ ana bronştan karinanın yalnızca 2 cm distalinde çıkar; yeri kişiden kişiye değişir. Sağ taraflı çift lümenli tüpün kafı onu tıkayabilir (aşağıdaki modele bakın). [[K1 s. 26]]',
      d5: '<b>Sol ana bronş</b> karinadan 5 cm sonra ikiye ayrılır; sol taraflı çift lümenli tüp için yeterli bir boy kalır. [[K1 s. 26]]',
      sagak: '<b>Sağ akciğer:</b> 3 lob (üst, orta, alt), 10 bronkopulmoner segment (3 + 2 + 5). [[K1 s. 26]]',
      solak: '<b>Sol akciğer:</b> 2 lob (üst, alt), 9 segment (üst 5, alt 4). [[K1 s. 26]]',
      ling: '<b>Lingula</b> (Latince “küçük dil”) sol üst lobun parçasıdır; evrimde kaybolmuş sol orta lobun kalıntısı sayılır. [[K1 s. 26]]',
      seg: '<b>Segment ve subsegment bronşları.</b> Epiteli bir düz kas tabakası çevreler; düzensiz biçimli kıkırdak plaklar hava yolunun kollabe olmasını önler. [[K1 s. 26]]',
      bron: '<b>Bronşiyoller</b> kıkırdak içermeyen ilk kuşaktır; düz kasları gaz akımını ayarlar. Terminal bronşiyoller iletici bölgenin son, 16. kuşağıdır. [[K1 s. 26]]',
      dil: '<b>Bronkodilatasyon:</b> sempatik etkinlik (ör. egzersiz); direnç azalır, O₂ gereksinimi arttığında daha çok ventilasyon. İlaçlar: β₂ agonistler, antikolinerjikler. [[K1 s. 26]]',
      kon: '<b>Bronkokonstriksiyon:</b> parasempatik sistem, histamin, soğuk hava, zararlı kimyasallar ve başka etkenler. İstirahatte akım hızı düşünce partiküller mukusa çöker ve silyalarla solunumsal bölgeden uzaklaştırılır. [[K1 s. 26]]',
    };
    /* Geometri: karina (210,170). Ölçek 1 cm = 20 birim: sağ üst lob çıkışı 2 cm (40), sol ana bronş bölünmesi 5 cm (100). */
    const K = [210, 170];
    const at = (aci, L) => { const r = (aci * Math.PI) / 180; return [+(K[0] + L * Math.sin(r)).toFixed(1), +(K[1] + L * Math.cos(r)).toFixed(1)]; };
    const RU = at(-25, 40), LB = at(45, 100); // sağ üst lob çıkışı, sol ana bronş bölünmesi
    const P = (pts) => 'M' + pts.map((q) => q.join(' ')).join('L');
    const YOL = [
      // [yol, lümen genişliği]
      [P([[210, 40], K]), 26, 'butt'],
      [P([K, RU]), 18], [P([K, LB]), 13],
      [P([RU, [150, 182]]), 10], [P([RU, [182, 252]]), 14], [P([[182, 252], [158, 300]]), 9], [P([[182, 252], [96, 326]]), 11],
      [P([LB, [322, 214]]), 10], [P([[300, 228], [290, 288]]), 7], [P([LB, [340, 312]]), 10],
    ];
    const tup = (d, w, cap = 'round', renk = 'var(--paper)') => `<path d="${d}" stroke="${renk}" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="round" fill="none"/>`;
    const hl = (d, w, cap, p) => `<g class="f07-hl f07-dim" data-p="${p}">${tup(d, w + 4, cap, 'var(--muted)')}${tup(d, w, cap, 'var(--c-basic-soft)')}</g>`;
    const hit = (d, w, k, ad, cap = 'round') => `<path class="f07-hit" data-k="${k}" tabindex="0" role="button" aria-pressed="false" aria-label="${ad}" d="${d}" stroke="transparent" stroke-width="${w}" stroke-linecap="${cap}" fill="none"/>`;
    const tick = (q, ux, uy, renk) => `<path d="M${(q[0] - 7 * ux).toFixed(1)} ${(q[1] - 7 * uy).toFixed(1)}L${(q[0] + 7 * ux).toFixed(1)} ${(q[1] + 7 * uy).toFixed(1)}" stroke="${renk}" stroke-width="2.6" stroke-linecap="round"/>`;
    const olcu = (a, b, renk) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = -dy / L, uy = dx / L; return `<path d="${P([a, b])}" stroke="${renk}" stroke-width="3" stroke-linecap="round"/>${tick(a, ux, uy, renk)}${tick(b, ux, uy, renk)}`; };
    const RAK = 'M168 100C120 94 58 140 46 236C38 304 50 352 86 368C124 382 168 374 180 352L182 250C180 190 178 140 168 100Z';
    const LAK = 'M252 100C300 94 362 140 374 236C382 304 370 352 334 368C304 380 270 374 258 360C268 342 274 322 266 304C256 292 248 282 246 262L246 250C246 190 244 140 252 100Z';
    const halkalar = Array.from({ length: 10 }, (_, i) => { const y = 50 + i * 12; return `<path d="M198 ${y}Q210 ${y + 5} 222 ${y}" stroke="var(--warn)" stroke-width="3" fill="none" stroke-linecap="round"/>`; }).join('');
    const ana = `<svg class="f07-br-ana" viewBox="0 0 420 400" role="img" aria-label="Trakea, karina, sağ ve sol ana bronş, loblar ve segment sayıları; önden görünüş, hastanın sağı solda">
      <defs><clipPath id="f07-cl-r"><path d="${RAK}"/></clipPath><clipPath id="f07-cl-l"><path d="${LAK}"/></clipPath></defs>
      <text x="6" y="16" class="f07-bm">Önden görünüş: hastanın sağı solda</text>
      <text x="108" y="88" text-anchor="middle" class="f07-bk">SAĞ</text><text x="312" y="88" text-anchor="middle" class="f07-bk">SOL</text>
      <g class="f07-dim f07-lob" data-k="sagak" data-p="sagak" tabindex="0" role="button" aria-pressed="false" aria-label="Sağ akciğer">
        <path d="${RAK}" fill="var(--c-basic-soft)" stroke="var(--line)" stroke-width="1.6"/>
        <g clip-path="url(#f07-cl-r)" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="5 4" fill="none"><path d="M30 229L190 220"/><path d="M40 220L156 384"/></g>
      </g>
      <g class="f07-dim f07-lob" data-k="solak" data-p="solak" tabindex="0" role="button" aria-pressed="false" aria-label="Sol akciğer">
        <path d="${LAK}" fill="var(--c-basic-soft)" stroke="var(--line)" stroke-width="1.6"/>
        <g clip-path="url(#f07-cl-l)" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="5 4" fill="none"><path d="M386 214L282 384"/></g>
      </g>
      <g class="f07-dim f07-lob" data-k="ling" data-p="ling solak" tabindex="0" role="button" aria-pressed="false" aria-label="Lingula">
        <path clip-path="url(#f07-cl-l)" d="M240 266L356 252L300 360L250 370Z" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="1.2" stroke-dasharray="3 3"/>
      </g>
      <g class="f07-yol">${YOL.map(([d, w, c]) => tup(d, w + 4, c || 'round', 'var(--muted)')).join('')}${YOL.map(([d, w, c]) => tup(d, w, c || 'round')).join('')}</g>
      ${hl(YOL[0][0], 26, 'butt', 'trakea')}${hl(YOL[1][0], 18, 'round', 'sag d2')}${hl(YOL[2][0], 13, 'round', 'd5')}
      <g class="f07-dim" data-p="trakea">${halkalar}
        <path d="M236 40V170M231 40H241M231 170H241" stroke="var(--muted)" stroke-width="1.4" fill="none"/>
        <text x="245" y="45" class="f07-bt">C6</text><text x="245" y="61" class="f07-bm">krikoid alt kenarı</text>
        <text x="245" y="110" class="f07-bt">trakea</text>
        <text x="245" y="170" class="f07-bt">T4/5 <tspan class="f07-bm">· karina</tspan></text>
      </g>
      <g class="f07-dim" data-p="d2 sag">${olcu(K, RU, 'var(--crit)')}</g>
      <g class="f07-dim" data-p="d5">${olcu(K, LB, 'var(--c-basic)')}</g>
      <g class="f07-dim f07-lab" data-p="sagak"><text x="96" y="172" text-anchor="middle" class="f07-bt">üst · 3</text><text x="152" y="320" text-anchor="middle" class="f07-bt">orta · 2</text><text x="76" y="346" text-anchor="middle" class="f07-bt">alt · 5</text><text x="112" y="396" text-anchor="middle" class="f07-bm">3 lob · 10 segment</text></g>
      <g class="f07-dim f07-lab" data-p="solak"><text x="304" y="140" text-anchor="middle" class="f07-bt">üst · 5</text><text x="346" y="350" text-anchor="middle" class="f07-bt">alt · 4</text><text x="314" y="396" text-anchor="middle" class="f07-bm">2 lob · 9 segment</text></g>
      <g class="f07-dim f07-lab" data-p="ling solak"><text x="296" y="322" text-anchor="middle" class="f07-bt" style="fill:var(--c-clin)">lingula</text></g>
      ${hit(YOL[0][0], 34, 'trakea', 'Trakea', 'butt')}${hit(YOL[1][0], 24, 'sag', 'Sağ ana bronş')}${hit(YOL[2][0], 19, 'd5', 'Sol ana bronş, karinadan 5 cm')}
      <g class="f07-dim f07-olc" data-k="d2" data-p="d2" tabindex="0" role="button" aria-pressed="false" aria-label="2 cm: sağ üst lob bronşunun karinaya uzaklığı"><rect x="196" y="217" width="46" height="24" fill="transparent"/><text x="200" y="235" class="f07-bo" style="fill:var(--crit)">2 cm</text></g>
      <g class="f07-dim f07-olc" data-k="d5" data-p="d5" tabindex="0" role="button" aria-pressed="false" aria-label="5 cm: sol ana bronşun bölünmesine uzaklık"><rect x="254" y="179" width="46" height="24" fill="transparent"/><text x="258" y="197" class="f07-bo" style="fill:var(--c-basic)">5 cm</text></g>
    </svg>`;
    const kesA = `<button type="button" class="f07-kes f07-dim" data-k="trakea" data-p="trakea" aria-pressed="false">
        <span class="f07-kt">A · Trakea kesiti</span>
        <svg viewBox="0 0 160 140" aria-hidden="true">
          <text x="80" y="14" text-anchor="middle" class="f07-km">ön</text>
          <circle cx="80" cy="64" r="31" fill="var(--paper)" stroke="var(--line)" stroke-width="2"/>
          <path d="M60 96.6A40 40 0 1 1 100 96.6" stroke="var(--warn)" stroke-width="10" fill="none"/>
          <path d="M60 96.6Q80 104 100 96.6" stroke="var(--crit)" stroke-width="5" fill="none" stroke-linecap="round"/>
          <text x="80" y="124" text-anchor="middle" class="f07-km" style="fill:var(--crit)">trakealis</text>
          <text x="128" y="44" class="f07-km" style="fill:var(--warn)">C</text>
        </svg>
        <span class="f07-kn">C halka: aşırı inspiratuvar çabada kollapsı önler</span>
      </button>`;
    const kesB = `<div class="f07-kes f07-dim" data-p="dil kon bron">
        <span class="f07-kt">B · Bronşiyol kesiti</span>
        <svg viewBox="0 0 160 140" aria-hidden="true">
          <text x="80" y="14" text-anchor="middle" class="f07-km" style="fill:var(--crit)">düz kas</text>
          <circle class="f07-kas" cx="80" cy="70" r="42" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="2" vector-effect="non-scaling-stroke"/>
          <circle class="f07-lum" cx="80" cy="70" r="33" fill="var(--paper)" stroke="var(--line)" stroke-width="2" vector-effect="non-scaling-stroke"/>
          <text class="f07-lt f07-km" x="80" y="74" text-anchor="middle">lümen</text>
          <text x="80" y="132" text-anchor="middle" class="f07-km">kıkırdak yok</text>
        </svg>
        <div class="seg f07-kseg" role="group" aria-label="Bronşiyol düz kası"><button type="button" data-k="dil" aria-pressed="false">Dilatasyon</button><button type="button" data-k="kon" aria-pressed="false">Konstriksiyon</button></div>
      </div>`;
    const SER = [
      ['trakea', 'trakea', 'Trakea', 'kuşak 0', 'C şeklinde kıkırdak halkalar, arkada trakealis', '<path d="M8 20A11 11 0 1 1 26 20" stroke="var(--warn)" stroke-width="4" fill="none"/><path d="M8 20Q17 24 26 20" stroke="var(--crit)" stroke-width="2.4" fill="none"/>'],
      ['seg', 'seg', 'Segment ve subsegment bronşları', '', 'Epiteli saran düz kas tabakası + düzensiz kıkırdak plaklar', '<circle cx="17" cy="14" r="9" fill="none" stroke="var(--crit)" stroke-width="2"/><path d="M6 9L9 5M26 10L23 5M8 22L12 25M27 18L24 23" stroke="var(--warn)" stroke-width="3.4" stroke-linecap="round"/>'],
      ['bron', 'bron', 'Bronşiyoller → terminal bronşiyol', '16. kuşak', 'Kıkırdak yok (ilk kıkırdaksız kuşak), düz kas', '<circle cx="17" cy="14" r="9" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="2.4"/><circle cx="17" cy="14" r="5" fill="var(--paper)" stroke="var(--line)"/>'],
    ];
    const serit = `<div class="f07-ser" role="group" aria-label="Kuşaklar boyunca duvar yapısı">${SER.map(([k, p, ad, alt, t, s]) => `<button type="button" class="f07-sh f07-dim" data-k="${k}" data-p="${p}" aria-pressed="false"><svg viewBox="0 0 34 28" width="34" height="28" aria-hidden="true">${s}</svg><span><b>${ad}</b>${alt ? `<i>${alt}</i>` : ''}<small>${t}</small></span></button>`).join('')}</div>`;
    el.innerHTML = `<div class="f07-br">
        <div class="f07-br-sol">${ana}</div>
        <div class="f07-br-kes">${kesA}${kesB}</div>
        ${serit}
      </div>
      <p class="viz-foot">${REF('Şematik önden görünüş; açılar, çaplar ve akciğer ana hatları temsilîdir. C6, T4/5, 2 cm, 5 cm, lob ve segment sayıları kitaptandır. [[K1 s. 25–26]]')}</p>`;
    const kas = el.querySelector('.f07-kas'), lum = el.querySelector('.f07-lum'), lt = el.querySelector('.f07-lt');
    const durum = (d) => { // yalnız lümen çapı değişir; kas halkası aynı dış sınırda kalınlaşır
      const s = d === 'kon' ? 11 / 33 : 1;
      lum.style.transform = `scale(${s})`; lt.style.opacity = d === 'kon' ? '0' : '1';
      kas.style.transform = `scale(${d === 'kon' ? 0.9 : 1})`;
    };
    if (RM) [kas, lum, lt].forEach((n) => { n.style.transition = 'none'; });
    durum('dil');
    return secici(el, CAP, (k) => { if (k === 'dil' || k === 'kon') durum(k); });
  };
})();
