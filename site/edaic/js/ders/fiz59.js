/* Bölüm 59 · Otonom sinir sistemi · bileşenler (tarif: docs/tasarim/fiz59.md; K1 s. 267–271).
   Şematik modeller; kitap sayısal fizyolojik değer vermez, süreler ve uzunluklar göreli çizilmiştir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
  const NARROW = 600; // bu genişliğin altında dar yerleşim
  const SYM = 'var(--crit)', PAR = 'var(--ok)';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const setCap = (el, html) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  // metni en çok n karakterlik satırlara böler
  const wrap = (s, n) => { const out = []; let cur = ''; String(s).split(' ').forEach((w) => { if ((cur + ' ' + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }); if (cur) out.push(cur); return out; };
  const tspans = (lines, x, y0, lh, cls) => lines.map((l, i) => `<text class="${cls || ''}" x="${x}" y="${y0 + i * lh}">${esc(l)}</text>`).join('');
  // genişliği izler; dar/geniş kipi değişince yeniden çizdirir
  function izle(el, render) {
    let mode = null;
    const kip = () => ((el.clientWidth || 700) < NARROW ? 'n' : 'w');
    const run = () => { const m = kip(); if (m !== mode) { mode = m; render(m); } };
    run();
    let ro = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(run); ro.observe(el); }
    return () => { if (ro) ro.disconnect(); };
  }
  const act = (e) => e.type === 'click' || e.key === 'Enter' || e.key === ' ';

  /* ---------- 1 · f59_organ: savaş-kaç mı, dinlen-sindir mi? ---------- */
  const ORG = [
    { id: 'goz', ad: 'Pupilla', s: 'Dilatasyon', p: 'Konstriksiyon', x: 340, y: 52, sol: true },
    { id: 'tuk', ad: 'Tükürük bezleri', s: 'Salgı baskılanır', p: 'Salgı uyarılır', x: 316, y: 84, sol: true },
    { id: 'akc', ad: 'Akciğer', s: 'Bronkodilatasyon', p: 'Bronkokonstriksiyon, mukus artışı', x: 316, y: 132, sol: true },
    { id: 'art', ad: 'Arteriyoller', s: 'Vazokonstriksiyon', p: 'Etki yok', x: 274, y: 186, sol: true, dip: '² Parasempatik innervasyon önemsizdir; penis istisnadır.' },
    { id: 'mes', ad: 'Mesane', s: 'Gevşer', p: 'Kasılır', x: 340, y: 306, sol: true },
    { id: 'kal', ad: 'Kalp', s: 'Hız ve kontraktilite artar', p: 'Hız azalır', x: 340, y: 168, sol: false, dip: '¹ Ventrikül kası çok az parasempatik lif alır (Bölüm 57).' },
    { id: 'ter', ad: 'Ter bezleri', s: 'Terleme başlar', p: 'Etki yok', x: 408, y: 190, sol: false },
    { id: 'adr', ad: 'Adrenal bez', s: 'Adrenalin ve noradrenalin salınır', p: 'Etki yok', x: 320, y: 218, sol: false },
    { id: 'gis', ad: 'Gastrointestinal kanal', s: 'Peristaltizm baskılanır', p: 'Peristaltizm uyarılır', x: 370, y: 262, sol: false },
    { id: 'pen', ad: 'Penis', s: 'Ejakülasyon', p: 'Ereksiyon', x: 340, y: 332, sol: false },
  ];
  const GIS_D = 'M314 252 H366 Q374 252 374 260 Q374 268 366 268 H314 Q306 268 306 276 Q306 284 314 284 H366';
  const HEART = 'M0 9 C-15 -2 -13 -13 -5 -13 C-2 -13 0 -10 0 -8 C0 -10 2 -13 5 -13 C13 -13 15 -2 0 9 Z';
  VIZ.f59_organ = (el) => {
    let bol = 's', sel = -1, stop = () => {}, ro = () => {}, mode = 'w';
    const cur = { pup: 7.5, bro: 5, muk: 0, lum: 2.5, bla: 15, sal: 0, ter: 1, adr: 1, gis: 0, hz: 2.2, amp: 0.2 };
    const tgt = () => (bol === 's'
      ? { pup: 7.5, bro: 5, muk: 0, lum: 2.5, bla: 15, sal: 0, ter: 1, adr: 1, gis: 0, hz: 2.2, amp: 0.2 }
      : { pup: 2.4, bro: 1.8, muk: 1, lum: 5, bla: 9, sal: 1, ter: 0, adr: 0, gis: 1, hz: 0.9, amp: 0.12 });
    const kut = (o, i, sel1) => {
      const etki = bol === 's' ? o.s : o.p, yok = etki === 'Etki yok';
      const y = 8 + 76 * (o.sol ? ORG.filter((q) => q.sol).indexOf(o) : ORG.filter((q) => !q.sol).indexOf(o)), x = o.sol ? 12 : 468;
      const L = sel1 ? [`S: ${o.s}`, `P: ${o.p}`] : [etki];
      const sat = L.flatMap((t) => wrap(t, 27));
      return `<g class="f59-box${sel1 ? ' on' : ''}${yok && !sel1 ? ' yok' : ''}" data-o="${i}" tabindex="0" role="button" aria-label="${o.ad}: ${esc(L.join(', '))}">
        <rect x="${x}" y="${y}" width="200" height="68" rx="9"/>
        <text class="f59-bt" x="${x + 10}" y="${y + 17}">${i + 1} · ${o.ad}</text>${tspans(sat, x + 10, y + 33, 14, 'f59-bd')}</g>`;
    };
    const govde = () => `
      <g class="f59-gov">
        <line x1="296" y1="112" x2="266" y2="250" stroke="var(--line)" stroke-width="20" stroke-linecap="round"/><line x1="296" y1="112" x2="266" y2="250" stroke="var(--chip)" stroke-width="17" stroke-linecap="round"/>
        <line x1="384" y1="112" x2="414" y2="250" stroke="var(--line)" stroke-width="20" stroke-linecap="round"/><line x1="384" y1="112" x2="414" y2="250" stroke="var(--chip)" stroke-width="17" stroke-linecap="round"/>
        <rect x="330" y="82" width="20" height="26" fill="var(--chip)" stroke="var(--line)"/>
        <circle cx="340" cy="54" r="31" fill="var(--chip)" stroke="var(--line)" stroke-width="1.5"/>
        <path d="M296 108 Q340 98 384 108 L392 232 Q398 292 384 340 L296 340 Q282 292 288 232 Z" fill="var(--chip)" stroke="var(--line)" stroke-width="1.5"/>
        <ellipse cx="316" cy="150" rx="21" ry="34" fill="var(--paper)" stroke="var(--line)"/><ellipse cx="364" cy="150" rx="21" ry="34" fill="var(--paper)" stroke="var(--line)"/>
        <g class="f59-bro" stroke="var(--accent-ink)" fill="none" stroke-linecap="round"><path d="M340 106 V126 M340 126 L322 142 M340 126 L358 142 M322 142 L312 160 M358 142 L368 160"/></g>
        <g class="f59-muk" fill="var(--c-basic)"><circle cx="308" cy="150" r="2.4"/><circle cx="318" cy="166" r="2.4"/><circle cx="364" cy="152" r="2.4"/><circle cx="372" cy="138" r="2.4"/></g>
        <path d="M340 38 m-15 14 q15 -13 30 0 q-15 13 -30 0" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.3" transform="translate(0 0)"/>
        <circle class="f59-pup" cx="340" cy="52" r="7.5" fill="var(--ink)"/>
        <ellipse cx="316" cy="86" rx="9" ry="5.5" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="1.5"/>
        <g class="f59-sal" fill="var(--c-basic)"><circle r="2.3" cx="314" cy="92"/><circle r="2.3" cx="319" cy="92"/><circle r="2.3" cx="316" cy="92"/></g>
        <path d="M308 228 H332 L320 208 Z" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M312 232 L292 246" stroke="var(--crit)" stroke-width="5" stroke-linecap="round" opacity=".35"/>
        <g class="f59-adr" fill="var(--warn)"><circle r="2.8" cx="320" cy="224"/><circle r="2.8" cx="320" cy="224"/><circle r="2.8" cx="320" cy="224"/></g>
        <path class="f59-gis" d="${GIS_D}" fill="none" stroke="var(--line)" stroke-width="10" stroke-linecap="round"/>
        <path d="${GIS_D}" fill="none" stroke="var(--paper)" stroke-width="6.5" stroke-linecap="round"/>
        <circle class="f59-bol" r="4.5" fill="var(--ok)"/>
        <circle class="f59-bla" cx="340" cy="306" r="15" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.6"/>
        <circle cx="340" cy="332" r="5" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.4"/>
        <g transform="translate(340 168)"><g class="f59-kalp"><path d="${HEART}" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.8" stroke-linejoin="round"/></g></g>
        <circle cx="276" cy="186" r="10" fill="var(--paper)" stroke="var(--crit)" stroke-width="2"/><circle class="f59-lum" cx="276" cy="186" r="5" fill="var(--crit-soft)"/>
        <path d="M402 182 q6 -6 6 0 q6 6 6 0 q-6 -6 -6 0" fill="none" stroke="var(--muted)" stroke-width="1.5" transform="translate(-2 6)"/>
        <g class="f59-ter" fill="var(--c-basic)"><circle r="2.4" cx="406" cy="198"/><circle r="2.4" cx="406" cy="198"/><circle r="2.4" cx="406" cy="198"/></g>
        <circle class="f59-halka" r="23" fill="none" stroke="var(--accent)" stroke-width="3" visibility="hidden"/>
      </g>`;
    const ciz = (m) => {
      mode = m;
      const dar = m === 'n';
      const W = dar ? 330 : 680, H = dar ? 350 : 392;
      const baglanti = ORG.map((o, i) => { const ax = dar ? (o.sol ? 50 : 280) + 175 : (o.sol ? 212 : 468); const grp = ORG.filter((q) => q.sol === o.sol), ay = dar ? 28 + 66 * grp.indexOf(o) + 10 : 8 + 76 * grp.indexOf(o) + 34; return { ax, ay, o, i }; });
      const bag = baglanti.map(({ ax, ay, o }) => `<line class="f59-bag" x1="${ax}" y1="${ay}" x2="${o.x}" y2="${o.y}"/>`).join('');
      const sag = dar
        ? baglanti.map(({ ax, ay, o, i }) => `<g class="f59-no${sel === i ? ' on' : ''}" data-o="${i}" tabindex="0" role="button" aria-label="${i + 1} ${o.ad}"><circle cx="${ax}" cy="${ay}" r="12"/><text x="${ax}" y="${ay + 4.5}" text-anchor="middle">${i + 1}</text></g>`).join('')
        : ORG.map((o, i) => kut(o, i, sel === i)).join('');
      el.innerHTML = `<div class="f59-bar">${segHtml('Otonom bölüm', 'b', [['s', 'Sempatik'], ['p', 'Parasempatik']], bol)}</div>
        <svg class="f59-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gövde şeması: sempatik ya da parasempatik uyarının kalp, akciğer, pupilla, bez ve bağırsak üzerindeki etkisi">
          <g transform="translate(${dar ? -175 : 0} 0)">${bag}${govde()}${dar ? '' : ''}
          ${ORG.map((o, i) => `<circle class="f59-hit" data-o="${i}" cx="${o.x}" cy="${o.y}" r="${o.id === 'kal' || o.id === 'akc' ? 24 : 15}" tabindex="${dar ? -1 : -1}" fill="transparent"/>`).join('')}
          </g>${dar ? '' : sag}${dar ? sag.replace(/(<g class="f59-no[^>]*>)/g, '$1') : ''}</svg>
        <div class="f59-ozet" data-r="oz"></div>
        ${dar ? `<div class="f59-kartlar">${ORG.map((o, i) => `<button type="button" class="f59-kart${sel === i ? ' on' : ''}" data-o="${i}" aria-pressed="${String(sel === i)}"><b>${i + 1} · ${o.ad}</b><span>${esc(sel === i ? 'S: ' + o.s + ' · P: ' + o.p : (bol === 's' ? o.s : o.p))}</span></button>`).join('')}</div>` : ''}
        <p class="f59-dip" data-r="dip"></p>`;
      // dar kipte numaralı daireler gövde grubunun dışında; ofset uygulandığı için çizim gruba taşınır
      if (dar) { const g = el.querySelector('svg > g'); el.querySelectorAll('svg > .f59-no').forEach((n) => { n.setAttribute('transform', 'translate(-175 0)'); }); void g; }
      guncelle(true);
    };
    const R = (s) => el.querySelector(s);
    const guncelle = (ilk) => {
      basSec(el, 'b', bol);
      const o = sel >= 0 ? ORG[sel] : null;
      const oz = R('[data-r=oz]');
      if (oz) oz.innerHTML = bol === 's' ? '<b>Savaş, kaç ya da kork:</b> stresli duruma hazırlık' : '<b>Dinlen ve sindir:</b> yaşam için temel işler';
      if (oz) oz.style.setProperty('--r', bol === 's' ? SYM : PAR);
      const halka = R('.f59-halka');
      if (halka) { if (o) { halka.setAttribute('cx', o.x); halka.setAttribute('cy', o.y); halka.setAttribute('visibility', 'visible'); } else halka.setAttribute('visibility', 'hidden'); }
      const dp = R('[data-r=dip]'); if (dp) dp.textContent = o && o.dip ? o.dip : '';
      if (o) setCap(el, `<b>${o.ad}.</b> Sempatik: ${o.s}. Parasempatik: ${o.p}. ${o.dip ? o.dip.slice(2) + ' ' : ''}[[K1 s. 268]]`);
      else setCap(el, bol === 's' ? '<b>Sempatik.</b> Vücut strese hazırlanır: kalp hızlanır ve güçlenir, bronşlar genişler, pupilla büyür. "Parasempatik"i seçin ya da bir organa dokunun. [[K1 s. 267–268]]' : '<b>Parasempatik.</b> Kalp yavaşlar, tükürük salgısı ve peristaltizm uyarılır, mesane kasılır, pupilla küçülür. Ter bezi, adrenal bez ve arteriyoller parasempatik etki almaz. [[K1 s. 267–268]]');
      if (RM) { Object.assign(cur, tgt()); uygula(0, 0); }
      void ilk;
    };
    let faz = 0, t = 0;
    const gisPath = () => R('.f59-gis');
    const uygula = (dt, tt) => {
      const g = tgt();
      for (const k in g) cur[k] = RM ? g[k] : cur[k] + (g[k] - cur[k]) * Math.min(1, dt * 6);
      const set = (s, a, v) => { const e = R(s); if (e) e.setAttribute(a, v); };
      set('.f59-pup', 'r', cur.pup.toFixed(2));
      set('.f59-bro', 'stroke-width', cur.bro.toFixed(2));
      set('.f59-muk', 'opacity', cur.muk.toFixed(2));
      set('.f59-lum', 'r', cur.lum.toFixed(2));
      set('.f59-bla', 'r', cur.bla.toFixed(2));
      faz += dt * cur.hz;
      const pulse = RM ? 0 : Math.pow(Math.max(0, Math.sin(faz * 2 * Math.PI)), 2);
      const kal = R('.f59-kalp'); if (kal) kal.setAttribute('transform', `scale(${(1 + cur.amp * pulse).toFixed(3)})`);
      const dr = (sel1, cx0, cy0, dist, op, n, hiz) => { const e = R(sel1); if (!e) return; [...e.children].forEach((c, i) => { const ph = RM ? 0.45 + i * 0.2 : (tt * hiz + i / n) % 1; c.setAttribute('cx', (cx0 + (sel1 === '.f59-adr' ? -ph * 22 : 0) + (sel1 === '.f59-sal' ? i * 4 - 4 : 0)).toFixed(1)); c.setAttribute('cy', (cy0 + ph * dist).toFixed(1)); c.setAttribute('opacity', (op * (1 - ph * 0.8)).toFixed(2)); }); };
      dr('.f59-sal', 316, 92, 16, cur.sal, 3, 0.8);
      dr('.f59-ter', 406, 196, 18, cur.ter, 3, 0.7);
      dr('.f59-adr', 320, 226, 22, cur.adr, 3, 0.6);
      const gp = gisPath(), bol1 = R('.f59-bol');
      if (gp && bol1 && gp.getTotalLength) { const L = gp.getTotalLength(), ph = RM ? 0.5 : (tt * 0.25) % 1, p = gp.getPointAtLength(ph * L); bol1.setAttribute('cx', p.x); bol1.setAttribute('cy', p.y); bol1.setAttribute('opacity', cur.gis.toFixed(2)); }
      if (gp) gp.setAttribute('stroke-width', (10 + cur.gis * 0 + (cur.gis > 0.5 && !RM ? 1.5 * Math.sin(tt * 6) : 0)).toFixed(2));
    };
    ro = izle(el, ciz);
    if (!RM) stop = ticker(el, (dt) => { t += dt; uygula(dt, t); });
    const sec = (e) => {
      const b = e.target.closest('[data-b]'); if (b && e.type === 'click') { bol = b.dataset.b; ciz(mode); return; }
      const o = e.target.closest('[data-o]'); if (o && act(e) && !(e.type === 'keydown' && e.target.tagName === 'BUTTON')) { if (e.type === 'keydown') e.preventDefault(); const i = +o.dataset.o; sel = sel === i ? -1 : i; ciz(mode); }
    };
    el.addEventListener('click', sec); el.addEventListener('keydown', sec);
    return () => { stop(); ro(); };
  };

  /* ---------- 2 · f59_harita: OSS haritası ---------- */
  const HCAP = {
    sem: '<b>Sempatik çıkış.</b> Preganglionik nöronlar T1–L2/3 segmentlerinin lateral boynuzundan çıkar. Bir bölüme ya da gangliyona dokunun. [[K1 s. 267]]',
    par: '<b>Kraniyosakral çıkış.</b> Lifler III, VII, IX ve X. kraniyal sinirler ve S2–4 spinal sinirleriyle çıkar; gangliyonlar organın yanındadır. [[K1 s. 269]]',
    rami: '<b>Beyaz ve gri rami.</b> Preganglionik lifler spinal sinirle beyaz ramiden çıkar (çoğu miyelinli, tip B); postganglionik lifler gri ramiden periferik sinire döner (miyelinsiz, tip C). [[K1 s. 267–268]]',
    cerv: '<b>Servikal zincir</b> baş ve boynu besler. [[K1 s. 267]]',
    tor: '<b>Torasik zincir.</b> Üst kısmı (T1–5) kalp, akciğer ve aortu; alt kısmı (T6–12) ön ve orta bağırsak organlarını besler. [[K1 s. 267]]',
    lomb: '<b>Lomber (abdominal) zincir</b> arka bağırsak organlarını besler. [[K1 s. 267]]',
    sak: '<b>Sakral (pelvik) zincir</b> pelvis organlarını besler. [[K1 s. 267]]',
    coel: '<b>Çölyak gangliyon.</b> Zincire değil omurganın önüne yerleşen prevertebral gangliyonlardan biri; preganglionik lif zincirden geçip burada sinaps yapar. [[K1 s. 267]]',
    sma: '<b>Süperior mezenterik gangliyon.</b> Zincire değil omurganın önüne yerleşen prevertebral gangliyonlardan biri; preganglionik lif zincirden geçip burada sinaps yapar. [[K1 s. 267]]',
    ima: '<b>İnferior mezenterik gangliyon.</b> Zincire değil omurganın önüne yerleşen prevertebral gangliyonlardan biri; preganglionik lif zincirden geçip burada sinaps yapar. [[K1 s. 267]]',
    adr: '<b>Adrenal medulla</b> doğrudan preganglionik lif alır; değişmiş bir sempatik gangliyondur. [[K1 s. 268]]',
    X: '<b>Vagus (X).</b> Kraniyal parasempatik lifler vücudun üst yarısını, orta ve arka bağırsağın birleşimine, dalak bükümünün hemen öncesine kadar besler. [[K1 s. 269]]',
    III: '<b>Okülomotor sinir (III).</b> Göz; uzun preganglionik lif organa yakın gangliyonda sinaps yapar, postganglionik lif kısadır. [[K1 s. 269]]',
    VII: '<b>Fasiyal sinir (VII).</b> Gözyaşı, submandibular ve sublingual bezler; uzun preganglionik lif organa yakın gangliyonda sinaps yapar, postganglionik lif kısadır. [[K1 s. 269]]',
    IX: '<b>Glossofaringeal sinir (IX).</b> Parotis; uzun preganglionik lif organa yakın gangliyonda sinaps yapar, postganglionik lif kısadır. [[K1 s. 269]]',
    S24: '<b>Sakral çıkış (S2–4)</b> vücudun alt yarısındaki organları besler: alt karın organları, mesane, genital organlar. [[K1 s. 269]]',
  };
  // hedef etiketleri (geniş yerleşim, aynı kimlikler dar yerleşimde de kullanılır)
  const HP = [
    { id: 'III', y: 22, t: 'III · Göz' }, { id: 'VII', y: 66, t: 'VII · Gözyaşı, submandibular ve sublingual bezler' },
    { id: 'IX', y: 112, t: 'IX · Parotis' }, { id: 'X', y: 190, t: 'X · Kalp, akciğer, üst karın organları (dalak bükümüne kadar)' },
    { id: 'S24', y: 362, t: 'S2–4 · Alt karın organları, mesane, genital organlar' },
  ];
  VIZ.f59_harita = (el) => {
    let vis = 'h', sel = null, ro = () => {};
    const grp = (g, cls, inner) => `<g class="${cls}" data-g="${g}">${inner}</g>`;
    const ln = (kind, col, x1, y1, x2, y2) => `<line class="f59-${kind}" stroke="${col}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    const gl = (x, y, r, col) => `<circle class="f59-gl" cx="${x}" cy="${y}" r="${r}" stroke="${col}"/>`;
    const hit = (id, ad, x, y, w, h) => `<rect class="f59-hit" data-id="${id}" tabindex="0" role="button" aria-label="${ad}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
    const hitC = (id, ad, x, y, r) => `<circle class="f59-hit" data-id="${id}" tabindex="0" role="button" aria-label="${ad}" cx="${x}" cy="${y}" r="${r}"/>`;
    const txtR = (x, c, lines, cls, anchor) => lines.map((l, i) => `<text class="${cls}" text-anchor="${anchor}" x="${x}" y="${c - (lines.length - 1) * 7 + 4 + i * 14}">${esc(l)}</text>`).join('');
    const rami = (x0, y0, w) => `<g transform="translate(${x0} ${y0})" data-g="rami" class="f59-rm">
      <rect width="${w}" height="72" rx="9" fill="var(--paper)" stroke="var(--line)"/>
      <text class="f59-bt" x="10" y="16">Spinal sinir · rami</text>
      <path d="M14 60 V30" stroke="var(--muted)" stroke-width="6" stroke-linecap="round"/>
      <circle cx="${w - 190}" cy="44" r="8" class="f59-gl" stroke="var(--ink)"/>
      <line x1="20" y1="38" x2="${w - 200}" y2="38" stroke="${SYM}" stroke-width="3.2"/>
      <line x1="${w - 200}" y1="52" x2="20" y2="52" stroke="${SYM}" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text class="f59-bd" x="${w - 172}" y="38"><tspan font-weight="700">Beyaz rami · tip B</tspan></text><text class="f59-bd" x="${w - 172}" y="52">preganglionik, miyelinli</text>
      <text class="f59-bd" x="${w - 172}" y="66">Gri rami: tip C, miyelinsiz</text></g>`;
    const wide = () => {
      let s = '';
      s += `<text class="f59-bt" x="8" y="16" fill="${PAR}" style="fill:${PAR}">Parasempatik · kraniyosakral</text><text class="f59-bd" x="8" y="32">(III, VII, IX, X; S2–4) · Pre: ACh · Post: ACh</text>`;
      s += `<text class="f59-bt" x="692" y="16" text-anchor="end" style="fill:${SYM}">Sempatik · torakolomber (T1–L2/3)</text><text class="f59-bd" x="692" y="32" text-anchor="end">Pre: ACh · Post: noradrenalin</text>`;
      s += '<g transform="translate(0 50)">';
      // omurilik
      s += `<path d="M326 0 H374 L378 40 H322 Z" fill="var(--chip)" stroke="var(--line)"/><text class="f59-sm" x="350" y="22" text-anchor="middle">Beyin sapı</text>`;
      s += `<rect x="322" y="40" width="56" height="380" fill="var(--chip)" stroke="var(--line)"/><rect x="323" y="68" width="54" height="226" fill="var(--crit-soft)"/><rect x="323" y="334" width="54" height="58" fill="var(--ok-soft)"/>`;
      [['C', 52], ['T1', 80], ['T5', 125], ['T6', 145], ['T12', 235], ['L1', 255], ['L2/3', 285], ['S2', 345], ['S4', 380]].forEach(([n, y]) => { s += `<line x1="322" x2="332" y1="${y - 4}" y2="${y - 4}" stroke="var(--muted)"/><text class="f59-sg-t" x="350" y="${y}" text-anchor="middle">${n}</text>`; });
      // sempatik
      const chain = (g, y1, y2) => grp(g, 'f59-sg', `<line class="f59-chain" x1="420" y1="${y1}" x2="420" y2="${y2}"/>` + Array.from({ length: Math.floor((y2 - y1) / 13) + 1 }, (_, i) => `<circle class="f59-bead" cx="420" cy="${y1 + i * 13}" r="4"/>`).join(''));
      s += chain('cerv', 40, 76) + chain('tor', 84, 238) + chain('lomb', 246, 308) + chain('sak', 316, 396);
      [['Servikal', 62, 'cerv'], ['Torasik', 170, 'tor'], ['Lomber', 292, 'lomb'], ['Sakral', 360, 'sak']].forEach(([n, y, g]) => { s += grp(g, 'f59-sg', `<text class="f59-bd" x="431" y="${y}">${n}</text>`); });
      s += grp('cerv tor', 'f59-sg', ln('pre', SYM, 378, 80, 420, 80)) + grp('tor', 'f59-sg', ln('pre', SYM, 378, 125, 420, 125) + ln('pre', SYM, 378, 175, 420, 175));
      s += grp('tor coel sma', 'f59-sg', ln('pre', SYM, 378, 235, 420, 235)) + grp('lomb ima sak', 'f59-sg', ln('pre', SYM, 378, 285, 420, 285));
      // adrenal
      s += grp('adr', 'f59-sg', ln('pre', SYM, 378, 160, 546, 160) + `<ellipse cx="540" cy="160" rx="6" ry="6" class="f59-gl" stroke="${SYM}" style="fill:var(--warn-soft)"/>`);
      // prevertebral
      s += grp('coel tor', 'f59-sg', ln('pre', SYM, 420, 196, 494, 207)) + grp('sma tor', 'f59-sg', ln('pre', SYM, 420, 222, 494, 241)) + grp('ima lomb', 'f59-sg', ln('pre', SYM, 420, 272, 494, 276));
      [['coel', 207, 'Çölyak'], ['sma', 241, 'Süp. mez.'], ['ima', 276, 'İnf. mez.']].forEach(([g, y, n]) => { s += grp(g, 'f59-sg', gl(505, y, 9, SYM) + `<text class="f59-sm" x="505" y="${y + 21}" text-anchor="middle">${n}</text>`); });
      // postganglionik ve hedefler
      const HT = [['cerv', 56, 'Göz, tükürük bezi', [420, 58]], ['tor', 110, 'Kalp, akciğer, aort', [420, 105]], ['adr', 160, 'Adrenal medulla', null], ['coel sma', 222, 'Ön ve orta bağırsak', null], ['ima sak', 296, 'Arka bağırsak, mesane, genital organlar', null]];
      s += grp('cerv', 'f59-sg', ln('post', SYM, 424, 58, 544, 56)) + grp('tor', 'f59-sg', ln('post', SYM, 424, 105, 544, 110));
      s += grp('coel', 'f59-sg', ln('post', SYM, 514, 207, 544, 218)) + grp('sma', 'f59-sg', ln('post', SYM, 514, 241, 544, 228)) + grp('ima', 'f59-sg', ln('post', SYM, 514, 276, 544, 292)) + grp('sak', 'f59-sg', ln('post', SYM, 424, 360, 544, 300));
      HT.forEach(([g, y, t]) => { s += grp(g, 'f59-sg', txtR(552, y, wrap(t, 19), 'f59-bd', 'start')); });
      // parasempatik
      const ex = [['III', 10, 22], ['VII', 20, 66], ['IX', 30, 112], ['X', 38, 190], ['S24', 362, 362]];
      ex.forEach(([g, y0, yg]) => {
        const t = HP.find((h) => h.id === g).t;
        s += grp(g, 'f59-pg', ln('pre', PAR, 322, y0, 221, yg) + gl(214, yg, 7, PAR) + ln('post', PAR, 207, yg, 197, yg) + txtR(190, yg, wrap(t, 23), 'f59-bd', 'end'));
      });
      s += '</g>';
      // hit alanları
      s += '<g transform="translate(0 50)">';
      [['cerv', 'Servikal zincir', 40, 36], ['tor', 'Torasik zincir', 84, 154], ['lomb', 'Lomber zincir', 246, 62], ['sak', 'Sakral zincir', 316, 80]].forEach(([id, ad, y, h]) => { s += hit(id, ad, 408, y - 2, 26, h + 4); });
      [['coel', 'Çölyak gangliyon', 207], ['sma', 'Süperior mezenterik gangliyon', 241], ['ima', 'İnferior mezenterik gangliyon', 276]].forEach(([id, ad, y]) => { s += hitC(id, ad, 505, y, 14); });
      s += hit('adr', 'Adrenal medulla', 546, 140, 150, 40);
      ex.forEach(([g, , yg]) => { s += hit(g, 'Kraniyosakral çıkış ' + g, 0, yg - 26, 230, 52); });
      s += '</g>';
      s += rami(360, 490, 332) + hit('rami', 'Beyaz ve gri rami', 360, 490, 332, 72);
      return `<svg class="f59-svg" data-vis="${vis}" viewBox="0 0 700 572" role="img" aria-label="Otonom sinir sistemi haritası: sempatik torakolomber ve parasempatik kraniyosakral çıkış">${s}</svg>`;
    };
    const dar = () => {
      let s = '';
      const panel = (y0, tip) => {
        let t = `<g transform="translate(0 ${y0})" class="${tip === 'S' ? 'f59-pnl-s' : 'f59-pnl-p'}">`;
        if (tip === 'S') {
          t += `<text class="f59-bt" x="6" y="14" style="fill:${SYM}">Sempatik · torakolomber (T1–L2/3)</text><text class="f59-bd" x="6" y="30">Pre: ACh · Post: noradrenalin</text><g transform="translate(0 40)">`;
          t += `<rect x="6" y="0" width="40" height="232" fill="var(--chip)" stroke="var(--line)"/><rect x="7" y="22" width="38" height="164" fill="var(--crit-soft)"/>`;
          [['C', 12], ['T1', 36], ['T5', 74], ['T6', 92], ['T12', 154], ['L1', 172], ['L2/3', 194]].forEach(([n, y]) => { t += `<text class="f59-sg-t" x="26" y="${y + 4}" text-anchor="middle">${n}</text>`; });
          const chain = (g, y1, y2) => grp(g, 'f59-sg', `<line class="f59-chain" x1="92" y1="${y1}" x2="92" y2="${y2}"/>` + Array.from({ length: Math.floor((y2 - y1) / 13) + 1 }, (_, i) => `<circle class="f59-bead" cx="92" cy="${y1 + i * 13}" r="4"/>`).join(''));
          t += chain('cerv', 0, 24) + chain('tor', 32, 166) + chain('lomb', 174, 206) + chain('sak', 214, 232);
          t += grp('cerv tor', 'f59-sg', ln('pre', SYM, 46, 36, 92, 36)) + grp('tor', 'f59-sg', ln('pre', SYM, 46, 74, 92, 74)) + grp('tor coel sma', 'f59-sg', ln('pre', SYM, 46, 154, 92, 154)) + grp('lomb ima sak', 'f59-sg', ln('pre', SYM, 46, 194, 92, 194));
          t += grp('adr', 'f59-sg', ln('pre', SYM, 46, 108, 190, 108) + `<circle cx="186" cy="108" r="6" class="f59-gl" stroke="${SYM}" style="fill:var(--warn-soft)"/>`);
          t += grp('coel tor', 'f59-sg', ln('pre', SYM, 92, 130, 160, 138)) + grp('sma tor', 'f59-sg', ln('pre', SYM, 92, 142, 160, 160)) + grp('ima lomb', 'f59-sg', ln('pre', SYM, 92, 190, 160, 186));
          [['coel', 138, 'Çölyak'], ['sma', 160, 'Süp. mez.'], ['ima', 186, 'İnf. mez.']].forEach(([g, y, n]) => { t += grp(g, 'f59-sg', gl(168, y, 8, SYM) + `<text class="f59-bd2" x="100" y="${y + 4}">${n}</text>`); });
          const labs = [['cerv', 12, 'Göz, tükürük bezi', 424], ['tor', 56, 'Kalp, akciğer, aort', 0], ['adr', 108, 'Adrenal medulla', 0], ['coel sma', 148, 'Ön ve orta bağırsak', 0], ['ima sak', 200, 'Arka bağırsak, mesane, genital organlar', 0]];
          t += grp('cerv', 'f59-sg', ln('post', SYM, 96, 12, 190, 12)) + grp('tor', 'f59-sg', ln('post', SYM, 96, 56, 190, 56));
          t += grp('coel', 'f59-sg', ln('post', SYM, 176, 138, 190, 148)) + grp('sma', 'f59-sg', ln('post', SYM, 176, 160, 190, 152)) + grp('ima', 'f59-sg', ln('post', SYM, 176, 186, 190, 202)) + grp('sak', 'f59-sg', ln('post', SYM, 96, 226, 190, 206));
          labs.forEach(([g, y, tx]) => { t += grp(g, 'f59-sg', txtR(196, y, wrap(tx, 25), 'f59-bd', 'start')); });
          // ad yazıları (gangliyon ve zincir parçaları)
          t += `<text class="f59-bd2" x="100" y="22">Servikal</text><text class="f59-bd2" x="100" y="100">Torasik</text><text class="f59-bd2" x="100" y="224">Lomber</text>`;
          [['cerv', 'Servikal zincir', 0, 24], ['tor', 'Torasik zincir', 32, 134], ['lomb', 'Lomber zincir', 174, 32], ['sak', 'Sakral zincir', 214, 18]].forEach(([id, ad, y, h]) => { t += hit(id, ad, 80, y - 3, 26, h + 6); });
          [['coel', 'Çölyak gangliyon', 138], ['sma', 'Süperior mezenterik gangliyon', 160], ['ima', 'İnferior mezenterik gangliyon', 186]].forEach(([id, ad, y]) => { t += hitC(id, ad, 168, y, 12); });
          t += hit('adr', 'Adrenal medulla', 194, 94, 160, 28);
          t += '</g>';
        } else {
          t += `<text class="f59-bt" x="6" y="14" style="fill:${PAR}">Parasempatik · kraniyosakral</text><text class="f59-bd" x="6" y="30">(III, VII, IX, X; S2–4) · Pre: ACh · Post: ACh</text><g transform="translate(0 40)">`;
          t += `<path d="M10 0 H42 L46 26 H6 Z" fill="var(--chip)" stroke="var(--line)"/><rect x="6" y="26" width="40" height="214" fill="var(--chip)" stroke="var(--line)"/><rect x="7" y="186" width="38" height="44" fill="var(--ok-soft)"/>`;
          t += `<text class="f59-sg-t" x="26" y="14" text-anchor="middle" style="font-size:10.5px">Sap</text><text class="f59-sg-t" x="26" y="204" text-anchor="middle">S2</text><text class="f59-sg-t" x="26" y="224" text-anchor="middle">S4</text>`;
          const ex = [['III', 6, 20], ['VII', 12, 66], ['IX', 18, 114], ['X', 24, 168], ['S24', 208, 222]];
          ex.forEach(([g, y0, yg]) => {
            const tx = HP.find((h) => h.id === g).t;
            t += grp(g, 'f59-pg', ln('pre', PAR, 46, y0, 142, yg) + gl(150, yg, 8, PAR) + ln('post', PAR, 158, yg, 190, yg) + txtR(196, yg, wrap(tx, 25), 'f59-bd', 'start'));
            t += hit(g, 'Çıkış ' + g, 40, yg - 24, 316, 48);
          });
          t += '</g>';
        }
        return t + '</g>';
      };
      let yo = 0;
      if (vis !== 'p') { s += panel(yo, 'S'); yo += 300; }
      if (vis !== 's') { s += panel(yo, 'P'); yo += 290; }
      s += rami(8, yo, 344); s += hit('rami', 'Beyaz ve gri rami', 8, yo, 344, 72);
      return `<svg class="f59-svg" data-vis="${vis}" viewBox="0 0 360 ${yo + 82}" role="img" aria-label="Otonom sinir sistemi haritası: sempatik torakolomber ve parasempatik kraniyosakral çıkış">${s}</svg>`;
    };
    const ciz = (m) => {
      el.innerHTML = `<div class="f59-bar">${segHtml('Bölüm', 'v', [['s', 'Sempatik'], ['p', 'Parasempatik'], ['h', 'Hepsi']], vis)}</div>${m === 'n' ? dar() : wide()}
        <div class="legend f59-leg"><span><i class="f59-lg pre"></i>preganglionik (düz)</span><span><i class="f59-lg post"></i>postganglionik (kesik)</span><span><i class="f59-lg gl"></i>gangliyon</span></div>`;
      boya();
    };
    const boya = () => {
      const svg = el.querySelector('svg'); if (!svg) return;
      svg.dataset.vis = vis; basSec(el, 'v', vis);
      svg.querySelectorAll('[data-g]').forEach((g) => { const on = !sel || g.dataset.g.split(' ').includes(sel); g.classList.toggle('f59-dim', !on); });
      svg.querySelectorAll('.f59-hit').forEach((h) => h.classList.toggle('on', h.dataset.id === sel));
      setCap(el, sel ? HCAP[sel] : (vis === 'p' ? HCAP.par : HCAP.sem));
    };
    ro = izle(el, ciz);
    const tikla = (e) => {
      const v = e.target.closest('[data-v]'); if (v && e.type === 'click') { vis = v.dataset.v; sel = null; if ((el.clientWidth || 700) < NARROW) ciz('n'); else boya(); return; }
      const h = e.target.closest('.f59-hit'); if (h && act(e)) { if (e.type === 'keydown') e.preventDefault(); sel = sel === h.dataset.id ? null : h.dataset.id; boya(); }
    };
    el.addEventListener('click', tikla); el.addEventListener('keydown', tikla);
    return () => ro();
  };

  /* ---------- 3 · f59_yol: aksiyon potansiyeli omurilikten organa ---------- */
  const NTR = { ach: 'var(--c-basic)', na: 'var(--warn)' };
  const YOL = {
    sem: { ad: 'Sempatik', col: SYM, gx: 240, post: SYM, organ: 'Kalp', ik: 'kalp', g: ['ach', 'nikotinik'], o: ['na', 'adrenerjik'], pre: 'kısa', pst: 'uzun',
      ozet: '<b>Tipik sempatik yol.</b> Kısa preganglionik lif → gangliyonda ACh, nikotinik reseptör → uzun postganglionik lif → organda noradrenalin, adrenerjik reseptör. "Oynat"a basın ya da başka bir yol seçin. [[K1 s. 268]]',
      s4: 'Noradrenalin salınır, organdaki adrenerjik reseptöre bağlanır; kalp tepki verir. [[K1 s. 268]]' },
    par: { ad: 'Parasempatik', col: PAR, gx: 550, post: PAR, organ: 'Tükürük bezi', ik: 'bez', g: ['ach', 'nikotinik'], o: ['ach', 'muskarinik'], pre: 'uzun', pst: 'kısa',
      ozet: '<b>Parasempatik yol.</b> Uzun preganglionik lif → organa yakın gangliyonda ACh, nikotinik → kısa postganglionik lif → organda ACh, muskarinik. [[K1 s. 269–270]]',
      s4: 'ACh salınır, organdaki muskarinik reseptöre bağlanır; bez salgı yapar. [[K1 s. 269–270]]' },
    adr: { ad: 'Adrenal medulla', col: SYM, gx: null, post: SYM, organ: 'Adrenal medulla', ik: 'adr', g: null, o: ['ach', 'medulla hücresi'], pre: 'uzun', pst: '',
      ozet: '<b>Adrenal medulla.</b> Preganglionik lif ACh ile doğrudan medullayı uyarır; bez, nörotransmitterini kana salan değişmiş bir sempatik gangliyondur. [[K1 s. 268]]',
      s4: 'ACh medulla hücresini uyarır (kitap reseptör tipini vermez). [[K1 s. 268]]' },
    ter: { ad: 'Ter bezi', col: SYM, gx: 240, post: 'var(--c-basic)', organ: 'Ter bezi', ik: 'ter', g: ['ach', 'nikotinik'], o: ['ach', 'muskarinik'], pre: 'kısa', pst: 'uzun', kol: true,
      ozet: '<b>Ter bezi.</b> Sempatik kolinerjik lif: postganglionik uç ACh salar, muskarinik reseptör üzerinden etki eder. [[K1 s. 268]]',
      s4: 'Postganglionik uç ACh salar, muskarinik reseptöre bağlanır; ter bezi terleme başlatır. [[K1 s. 268]]' },
    met: { ad: 'Kas metarteriyolü', col: SYM, gx: 240, post: 'var(--c-basic)', organ: 'Kas damarı', ik: 'met', g: ['ach', 'nikotinik'], o: ['ach', 'ACh'], pre: 'kısa', pst: 'uzun', kol: true,
      ozet: '<b>Kas metarteriyolü.</b> Sempatik kolinerjik liflerle innerve edilir; işlevsel arteriyovenöz şant yaparak egzersiz başında ortalama arter basıncının aşırı yükselmesini önler. [[K1 s. 268]]',
      s4: 'ACh salınır (sempatik kolinerjik; kitap reseptör tipini vermez); işlevsel arteriyovenöz şant açılır. [[K1 s. 268]]' },
  };
  VIZ.f59_yol = (el) => {
    let yk = 'sem', k = 0, t = 0, kip = 'idle', bitti = !!RM, mode = 'w', ro = () => {}, stop = () => {}, T = 0;
    const adimlar = () => { const y = YOL[yk]; return y.gx == null ? ['pre', 'syn', 'sal'] : ['pre', 'gan', 'post', 'syn']; };
    const X0 = 90, OX = 620, V = 200; // hız: 200 birim/s (geniş çizim ölçeği)
    const sure = (a) => (a === 'pre' ? ((YOL[yk].gx == null ? OX : YOL[yk].gx - 10) - X0) / V : a === 'post' ? (OX - YOL[yk].gx - 10) / V : a === 'sal' ? 2.2 : 1.5);
    const reset = () => { k = 0; t = 0; kip = 'idle'; bitti = !!RM; };
    const prog = (i) => { const n = adimlar().length; if (bitti || i < k) return 1; if (i > k || k === 0) return 0; return clamp(t / sure(adimlar()[i - 1]), 0, 1); };
    const R = (s) => el.querySelector(s);
    const mx = (x) => (mode === 'n' ? 46 + ((x - X0) / (OX - X0)) * 250 : x);
    const FY = () => (mode === 'n' ? 62 : 175);
    const gorun = { sem: 'Omurilik · lateral boynuz', par: 'Beyin sapı / S2–4', adr: 'Omurilik · lateral boynuz', ter: 'Omurilik · lateral boynuz', met: 'Omurilik · lateral boynuz' };

    const mag = (id, cx, cy, sc, baslik, nt, recName, recKind) => {
      const col = NTR[nt];
      const rc = recKind === 'nik' ? ['var(--c-basic-soft)', 'var(--c-basic)'] : recKind === 'gpcr' ? ['var(--accent-soft)', 'var(--accent-ink)'] : ['var(--chip)', 'var(--muted)'];
      return `<g class="f59-mag" id="f59-mg-${id}" transform="translate(${cx} ${cy}) scale(${sc})">
        <clipPath id="f59-clp-${id}"><circle r="46"/></clipPath>
        <circle class="f59-mc" r="46" fill="var(--paper)" stroke="var(--line)" stroke-width="2"/>
        <g clip-path="url(#f59-clp-${id})">
          <ellipse cx="-38" cy="0" rx="30" ry="34" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>
          <circle cx="-44" cy="-14" r="4" fill="${col}" opacity=".45"/><circle cx="-40" cy="2" r="4" fill="${col}" opacity=".45"/><circle cx="-46" cy="14" r="4" fill="${col}" opacity=".45"/>
          <rect x="16" y="-60" width="14" height="120" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>
          <rect class="f59-rec" x="8" y="-16" width="12" height="32" rx="3" fill="${rc[0]}" stroke="${rc[1]}" stroke-width="2"/>
          ${[0, 1, 2, 3].map((i) => `<circle class="f59-nt" data-i="${i}" r="3.6" fill="${col}"/>`).join('')}
        </g></g>`;
    };
    const organIcon = (y, x, ik) => {
      const c = `translate(${x} ${y})`;
      if (ik === 'kalp') return `<g transform="${c}"><g class="f59-ik"><g transform="scale(1.7)"><path d="${HEART}" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.6" stroke-linejoin="round"/></g></g></g>`;
      if (ik === 'bez') return `<g transform="${c}"><ellipse rx="22" ry="14" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2"/><g class="f59-dr" fill="var(--c-basic)"><circle cx="-6" r="2.8"/><circle cx="2" r="2.8"/><circle cx="10" r="2.8"/></g></g>`;
      if (ik === 'adr') return `<g transform="${c}"><path d="M-14 8 H14 L0 -16 Z" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2" stroke-linejoin="round"/><rect x="-30" y="16" width="60" height="9" rx="4" fill="var(--crit-soft)"/><g class="f59-dr" fill="var(--warn)"><circle r="3"/><circle r="3"/><circle r="3"/><circle r="3"/></g></g>`;
      if (ik === 'ter') return `<g transform="${c}"><path d="M-26 -10 H26" stroke="var(--muted)" stroke-width="2.4"/><path d="M-10 -10 q-6 8 0 14 q6 6 0 12 M4 -10 q-6 8 0 14 q6 6 0 12" fill="none" stroke="var(--c-basic)" stroke-width="2.2"/><g class="f59-dr" fill="var(--c-basic)"><circle cx="-12" r="2.8"/><circle cx="2" r="2.8"/><circle cx="16" r="2.8"/></g></g>`;
      return `<g transform="${c}"><path d="M-28 -12 H-4 M4 -12 H28" stroke="var(--crit)" stroke-width="3" fill="none"/><path d="M-28 14 H-4 M4 14 H28" stroke="var(--c-basic)" stroke-width="3" fill="none"/><circle class="f59-ik" r="7" cx="0" cy="-12" fill="var(--paper)" stroke="var(--crit)" stroke-width="2"/><path class="f59-sant" d="M0 -4 V8" stroke="var(--ok)" stroke-width="3" stroke-dasharray="3 2" marker-end="none"/><text class="f59-sm" x="0" y="34" text-anchor="middle">şant</text></g>`;
    };
    const ciz = (m) => {
      mode = m;
      const y = YOL[yk], n = m === 'n', dar = n, adrP = y.gx == null;
      const fy = FY(), gx = adrP ? null : mx(y.gx), ox = n ? 300 : 616, ob = n ? [300, 30, 56, 66] : [616, 128, 76, 96];
      const preEnd = adrP ? ox : gx - 10, postSt = adrP ? 0 : gx + 10;
      let s = '';
      // omurilik
      s += n ? `<path d="M6 ${fy - 22} q20 -8 38 0 v44 q-18 8 -38 0 Z" fill="var(--chip)" stroke="var(--line)"/>` : `<path d="M14 ${fy - 32} q36 -10 72 0 v64 q-36 10 -72 0 Z" fill="var(--chip)" stroke="var(--line)"/><path d="M40 ${fy - 14} q10 -10 22 0 q10 10 0 20 q-12 6 -22 -4 z" fill="var(--paper)" stroke="var(--muted)"/>`;
      s += n ? `<circle cx="38" cy="${fy}" r="6" fill="${y.col}"/>` : `<circle cx="86" cy="${fy}" r="9" fill="${y.col}"/>`;
      s += `<text class="f59-sm" x="${n ? 25 : 50}" y="${n ? fy + 38 : fy + 52}" text-anchor="middle">${n ? '' : esc(gorun[yk])}</text>`;
      const x0 = n ? 46 : X0;
      s += `<line class="f59-fib pre" x1="${x0}" y1="${fy}" x2="${preEnd}" y2="${fy}" stroke="${y.col}"/>`;
      if (!adrP) {
        s += `<line class="f59-fib post" x1="${postSt}" y1="${fy}" x2="${ox - 2}" y2="${fy}" stroke="${y.post}"/>`;
        s += `<circle class="f59-glg" cx="${gx}" cy="${fy}" r="${n ? 9 : 10}" fill="var(--paper)" stroke="${y.col}" stroke-width="2"/>`;
      }
      s += `<line class="f59-trail" x1="0" y1="${fy}" x2="0" y2="${fy}" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" opacity="0"/><circle class="f59-ap" r="5.5" cy="${fy}" cx="0" fill="var(--accent)" stroke="var(--paper)" stroke-width="1.5" opacity="0"/>`;
      // etiketler
      const lab = (lines, x, yy, anc) => lines.map((l, i) => `<text class="f59-bd" x="${x}" y="${yy + i * 14}" text-anchor="${anc}">${esc(l)}</text>`).join('');
      const preMid = (x0 + preEnd) / 2;
      const ly = n ? 112 : 226;
      s += lab([adrP ? 'preganglionik · uzun' : y.pre + ' preganglionik', 'miyelinli · tip B', 'beyaz rami'].slice(0, adrP ? 2 : 3), preMid, ly, 'middle');
      if (!adrP) {
        const pm = (postSt + ox) / 2;
        const pl = [y.pst + ' postganglionik', 'miyelinsiz · tip C', 'gri rami'];
        if (yk === 'par') s += lab(pl, n ? 354 : 690, n ? ly : 262, 'end'); else s += lab(pl, pm, ly, 'middle');
        s += lab(y.kol ? ['sempatik kolinerjik'] : [], pm, ly + 46, 'middle').replace('class="f59-bd"', 'class="f59-bd f59-kol"');
        s += `<text class="f59-bd f59-gl-ad" x="${yk === 'par' && n ? 296 : gx}" y="${n ? 88 : fy + 28}" text-anchor="${yk === 'par' ? 'end' : 'middle'}" ${yk === 'par' ? `dx="${n ? 0 : 62}"` : ''}>${yk === 'par' ? 'organa yakın gangliyon' : 'zincir / prevertebral'}</text>`;
      } else {
        s += `<text class="f59-bd" x="${preMid}" y="${ly + 28}" text-anchor="middle">değişmiş sempatik gangliyon:</text><text class="f59-bd" x="${preMid}" y="${ly + 42}" text-anchor="middle">salgı doğrudan kana</text>`;
      }
      // organ kutusu
      s += `<rect class="f59-org" x="${ob[0]}" y="${ob[1]}" width="${ob[2]}" height="${ob[3]}" rx="10"/>`;
      s += organIcon(ob[1] + (n ? 30 : 44), ob[0] + ob[2] / 2, y.ik).replace(/scale\(1\.7\)/, n ? 'scale(1.2)' : 'scale(1.7)');
      const on = wrap(y.organ, n ? 8 : 12);
      s += on.map((l, i) => `<text class="f59-bt f59-on" x="${ob[0] + ob[2] / 2}" y="${ob[1] + ob[3] - 6 - (on.length - 1 - i) * 13}" text-anchor="middle">${esc(l)}</text>`).join('');
      // sinaps büyüteçleri
      const hasG = !adrP;
      const rk = (r) => (r === 'nikotinik' ? 'nik' : r === 'muskarinik' || r === 'adrenerjik' ? 'gpcr' : 'x');
      if (!n) {
        if (hasG) { s += `<line class="f59-lead" x1="190" y1="114" x2="${gx}" y2="${fy - 10}"/>` + mag('g', 190, 68, 1, 'Gangliyon', y.g[0], y.g[1], rk(y.g[1])); s += `<text class="f59-bt" x="190" y="12" text-anchor="middle">Gangliyon sinapsı</text><text class="f59-bd" x="190" y="130" text-anchor="middle" style="display:none"></text>`; }
        s += `<line class="f59-lead" x1="470" y1="114" x2="${ox - 2}" y2="${fy - 20}"/>` + mag('o', 470, 68, 1, 'Organ', y.o[0], y.o[1], rk(y.o[1]));
        s += `<text class="f59-bt" x="470" y="12" text-anchor="middle">${adrP ? 'Medulla sinapsı' : 'Organ sinapsı'}</text>`;
        if (hasG) s += `<text class="f59-bd" x="190" y="${68 + 62}" text-anchor="middle">${esc(NTL[y.g[0]] + ' → ' + y.g[1])}</text>`.replace('y="130"', 'y="130"');
        s += `<text class="f59-bd" x="470" y="${68 + 62}" text-anchor="middle">${esc(NTL[y.o[0]] + ' → ' + y.o[1])}</text>`;
      } else {
        if (hasG) { s += `<text class="f59-bt" x="92" y="176" text-anchor="middle">Gangliyon sinapsı</text>` + mag('g', 92, 250, 1.28, 'Gangliyon', y.g[0], y.g[1], rk(y.g[1])) + `<text class="f59-bd" x="92" y="326" text-anchor="middle">${esc(NTL[y.g[0]] + ' → ' + y.g[1])}</text>`; }
        s += `<text class="f59-bt" x="${hasG ? 268 : 180}" y="176" text-anchor="middle">${adrP ? 'Medulla sinapsı' : 'Organ sinapsı'}</text>` + mag('o', hasG ? 268 : 180, 250, 1.28, 'Organ', y.o[0], y.o[1], rk(y.o[1])) + `<text class="f59-bd" x="${hasG ? 268 : 180}" y="326" text-anchor="middle">${esc(NTL[y.o[0]] + ' → ' + y.o[1])}</text>`;
      }
      const H = n ? 346 : 276;
      el.innerHTML = `<div class="f59-bar">${segHtml('Yol', 'y', Object.entries(YOL).map(([a, v]) => [a, v.ad]), yk)}</div>
        <div class="btn-row f59-ctl"><button type="button" class="btn play" data-a="oyn"></button><button type="button" class="btn ghost" data-a="adm">Adım ›</button><button type="button" class="btn ghost" data-a="bas">Baştan</button><span class="f59-sayac" data-r="say" aria-live="polite"></span></div>
        <svg class="f59-svg" viewBox="0 0 ${n ? 360 : 700} ${H}" role="img" aria-label="${YOL[yk].ad} yolu: omurilikten organa iki nöronlu yol ve sinapslar">${s}</svg>
        <div class="legend"><span><i style="background:var(--accent)"></i>aksiyon potansiyeli</span><span><i style="background:var(--c-basic)"></i>ACh</span><span><i style="background:var(--warn)"></i>noradrenalin / adrenalin</span></div>`;
      guncelle(0);
    };
    const NTL = { ach: 'ACh', na: 'Noradrenalin' };
    const ADIM_M = (a, i, n) => {
      const y = YOL[yk];
      if (a === 'pre') return `<b>${i} · Preganglionik lif.</b> AP ${y.pre} lif boyunca ilerler. [[K1 s. 269–270]]`;
      if (a === 'gan') return '<b>2 · Gangliyon.</b> ACh salınır, postsinaptik nikotinik reseptöre bağlanır. [[K1 s. 268]]';
      if (a === 'post') return `<b>3 · Postganglionik lif.</b> ${yk === 'par' ? 'Postganglionik lif kısadır; organa yakın gangliyondan organa ilerler.' : 'Gri ramiden periferik sinire geçen uzun lif organa ilerler.'} [[K1 s. 268–269]]`;
      if (a === 'syn') return `<b>${i} · ${yk === 'adr' ? 'Medulla sinapsı' : 'Organ sinapsı'}.</b> ${y.s4}`;
      return `<b>3 · Kana salınım.</b> Medulladan adrenalin ve noradrenalin doğrudan kana salınır. [[K1 s. 268]]`;
    };
    const R2 = (s) => el.querySelector(s);
    const guncelle = (dt) => {
      const A = adimlar(), nA = A.length, y = YOL[yk];
      if (kip !== 'idle' && !bitti && k > 0) {
        t += dt;
        const d = sure(A[k - 1]);
        if (t >= d) {
          if (k === nA) { bitti = true; kip = 'idle'; }
          else if (kip === 'auto') { k++; t = 0; }
          else { kip = 'idle'; t = d; }
        }
      }
      const fy = FY(), svg = R2('svg'); if (!svg) return;
      const ap = R2('.f59-ap'), tr = R2('.f59-trail');
      // AP noktası
      let px = null;
      const dot = (a, i) => { const p = prog(i); return p > 0 && p < 1 ? p : null; };
      A.forEach((a, idx) => {
        const i = idx + 1, p = dot(a, i);
        if (p == null) return;
        if (a === 'pre') px = mx(X0 + p * ((y.gx == null ? OX : y.gx - 10) - X0));
        if (a === 'post') px = mx(y.gx + 10 + p * (OX - y.gx - 10));
      });
      if (px != null && ap) { ap.setAttribute('cx', px); ap.setAttribute('opacity', 1); tr.setAttribute('x1', Math.max(px - 38, mx(X0))); tr.setAttribute('x2', px); tr.setAttribute('opacity', 0.7); }
      else if (ap) { ap.setAttribute('opacity', 0); tr.setAttribute('opacity', 0); }
      // sinaps büyüteçleri
      const sinapsAd = (A.indexOf('gan') >= 0) ? { g: A.indexOf('gan') + 1, o: A.indexOf('syn') + 1 } : { g: 0, o: A.indexOf('syn') + 1 };
      [['g', sinapsAd.g], ['o', sinapsAd.o]].forEach(([id, i]) => {
        const m = R2('#f59-mg-' + id); if (!m || !i) return;
        const p = prog(i), akt = p > 0 && p < 1;
        m.querySelector('.f59-mc').setAttribute('stroke', p > 0 ? 'var(--accent)' : 'var(--line)');
        m.querySelector('.f59-mc').setAttribute('stroke-width', akt ? 3.5 : 2);
        m.querySelectorAll('.f59-nt').forEach((c) => {
          const q = +c.dataset.i, e = ease(clamp((p - q * 0.1) / 0.55, 0, 1));
          c.setAttribute('cx', (lerp(-42, 3, e) + (e > 0 && e < 1 ? Math.sin(T * 9 + q) * 1.5 : 0)).toFixed(1));
          c.setAttribute('cy', (lerp(-14 + q * 9, -9 + q * 6, e)).toFixed(1));
          c.setAttribute('opacity', p === 0 ? 0 : 1);
        });
      });
      // organ tepkisi
      const son = prog(nA), gor = son > 0.5 || bitti;
      const ik = R2('.f59-ik');
      if (ik && y.ik === 'kalp') ik.setAttribute('transform', `scale(${(gor ? 1 + 0.16 * (RM ? 0 : Math.pow(Math.max(0, Math.sin(T * 7)), 2)) : 1).toFixed(3)})`);
      if (ik && y.ik === 'met') { ik.setAttribute('r', gor ? 3 : 7); }
      const san = R2('.f59-sant'); if (san) san.setAttribute('opacity', gor ? 1 : 0.15);
      const dr = R2('.f59-dr');
      if (dr) [...dr.children].forEach((c, i) => {
        const ph = RM ? 0.5 : (T * 0.7 + i / dr.children.length) % 1;
        const adrN = y.ik === 'adr';
        if (adrN) { const pp = A.indexOf('sal') + 1; const pr = prog(pp); c.setAttribute('cx', (-22 + ((RM ? 0.5 : (T * 0.5 + i / 4) % 1)) * 44).toFixed(1)); c.setAttribute('cy', 20.5); c.setAttribute('opacity', pr > 0 || bitti ? 1 : 0); }
        else { c.setAttribute('cy', (4 + ph * 14).toFixed(1)); c.setAttribute('opacity', gor ? (1 - ph).toFixed(2) : 0); }
      });
      // denetimler ve metin
      const pb = R2('[data-a=oyn]'); if (pb) { pb.textContent = kip === 'auto' ? 'Duraklat' : 'Oynat'; pb.hidden = !!RM; }
      const say = R2('[data-r=say]'); if (say) say.textContent = bitti ? `${nA}/${nA}` : k ? `${k}/${nA}` : `0/${nA}`;
      if (dt === 0 || k !== guncelle.sonK || bitti !== guncelle.sonB || yk !== guncelle.sonY) {
        guncelle.sonK = k; guncelle.sonB = bitti; guncelle.sonY = yk;
        setCap(el, bitti || k === 0 ? y.ozet : ADIM_M(A[k - 1], k, nA));
      }
    };
    ro = izle(el, ciz);
    if (!RM) stop = ticker(el, (dt) => { T += dt; guncelle(dt); });
    const tikla = (e) => {
      const b = e.target.closest('[data-y]'); if (b) { yk = b.dataset.y; reset(); ciz(mode); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      const A = adimlar(), nA = A.length;
      if (a.dataset.a === 'bas') { reset(); guncelle(0); return; }
      if (a.dataset.a === 'oyn') {
        if (kip === 'auto') { kip = 'idle'; guncelle(0); return; }
        if (bitti) reset();
        if (k === 0) { k = 1; t = 0; } else if (t >= sure(A[k - 1]) - 0.001 && k < nA) { k++; t = 0; }
        kip = 'auto'; guncelle(0); return;
      }
      if (a.dataset.a === 'adm') {
        if (RM) { k = (k % nA) + 1; bitti = k === nA; t = 99; guncelle(0); return; }
        if (bitti) { reset(); k = 1; t = 0; kip = 'one'; guncelle(0); return; }
        if (k === 0) { k = 1; t = 0; } else if (k < nA) { k++; t = 0; } else { reset(); k = 1; t = 0; }
        kip = 'one'; guncelle(0);
      }
    };
    el.addEventListener('click', tikla);
    return () => { stop(); ro(); };
  };

  /* ---------- 4 · f59_blok: üç blok, üç düzey ---------- */
  const BLOK = {
    stel: { ad: 'Stellat', yer: 'C7', hedef: 'İnferior servikal ve birinci torasik gangliyonun birleşimi', kul: 'Üst ekstremitenin sempatik kaynaklı ağrısı (ör. Raynaud), kompleks bölgesel ağrı sendromu, uzun QT sendromu gibi sempatik kaynaklı aritmiler, hiperhidroz', yon: 'Lokal anestezikle geçici', rz: 'gec', bolge: 'kol',
      cap: '<b>Stellat gangliyon (C7).</b> İnferior servikal gangliyon ile birinci torasik gangliyonun birleşimidir. Bir bloğa dokunun. [[K1 s. 268]]' },
    coel: { ad: 'Çölyak', yer: 'L1 vertebra gövdesinin iki yanı', hedef: 'Karın organlarının çoğunun sempatik kaynağı', kul: 'Pankreas kanseri ve kronik pankreatit ağrısı', yon: 'Floroskopi eşliğinde fenolle yarı kalıcı', rz: 'yk', bolge: 'karin',
      cap: '<b>Çölyak pleksus (L1).</b> L1 gövdesinin iki yanında, karın organlarının çoğuna sempatik lif verir; pankreas kanseri ve kronik pankreatit ağrısında floroskopiyle fenol uygulanır. [[K1 s. 268]]' },
    lomb: { ad: 'Lomber', yer: 'L3 vertebra gövdesinin önyanı', hedef: 'Lomber sempatik zincir', kul: 'Alt ekstremitenin sempatik kaynaklı ağrısında tanı ve tedavi', yon: 'Floroskopi eşliğinde enjeksiyon', rz: '', bolge: 'bacak',
      cap: '<b>Lomber sempatektomi (L3).</b> L3 gövdesinin önyanına floroskopi eşliğinde enjeksiyon; alt ekstremitenin sempatik kaynaklı ağrısında tanı ve tedavi. [[K1 s. 268–269]]' },
  };
  VIZ.f59_blok = (el) => {
    let b = 'stel', ro = () => {};
    // omurga: C1–C7, T1–T12, L1–L5 (yan görünüm, şematik)
    const V = []; let yy = 12;
    for (let i = 1; i <= 7; i++) { V.push({ n: 'C' + i, y: yy, h: 9 }); yy += 11; }
    for (let i = 1; i <= 12; i++) { V.push({ n: 'T' + i, y: yy, h: 13 }); yy += 15; }
    for (let i = 1; i <= 5; i++) { V.push({ n: 'L' + i, y: yy, h: 17 }); yy += 20; }
    const vy = (n) => { const v = V.find((q) => q.n === n); return v.y + v.h / 2; };
    const YS = (vy('C7') + vy('T1')) / 2 + 2, YC = vy('L1'), YL = vy('L3');
    const spineSvg = () => {
      let s = V.map((v) => `<rect x="${v.n[0] === 'C' ? 54 : 50}" y="${v.y}" width="${v.n[0] === 'C' ? 30 : v.n[0] === 'T' ? 36 : 42}" height="${v.h}" rx="3" fill="var(--chip)" stroke="var(--line)"/>`).join('');
      s += `<line x1="108" y1="12" x2="108" y2="${V[V.length - 1].y + 17}" stroke="${SYM}" stroke-width="2.5"/>` + Array.from({ length: 24 }, (_, i) => `<circle cx="108" cy="${16 + i * 13.6}" r="3.2" fill="var(--paper)" stroke="${SYM}" stroke-width="1.6"/>`).join('');
      [['C7', 'C7'], ['T1', 'T1'], ['L1', 'L1'], ['L3', 'L3']].forEach(([n, t]) => { s += `<text class="f59-bd" x="44" y="${vy(n) + 4}" text-anchor="end" style="font-weight:700">${t}</text><line x1="46" x2="52" y1="${vy(n)}" y2="${vy(n)}" stroke="var(--muted)"/>`; });
      s += `<text class="f59-sm" x="148" y="10">ön</text>`;
      const mk = (id, x, y, ad, ic) => `<g class="f59-mk${b === id ? ' on' : ''}" data-b="${id}" tabindex="0" role="button" aria-label="${ad}" aria-pressed="${String(b === id)}">
        <line class="f59-ig" x1="${x + 70}" y1="${y - 18}" x2="${x + 8}" y2="${y - 2}"/><rect class="f59-hub" x="${x + 68}" y="${y - 24}" width="12" height="9" rx="2" transform="rotate(-14 ${x + 74} ${y - 20})"/>
        <circle class="f59-halka" cx="${x}" cy="${y}" r="${b === id ? 23 : 0}"/>${ic}<circle class="f59-hit" cx="${x}" cy="${y}" r="24"/></g>`;
      s += mk('stel', 112, YS, 'Stellat gangliyon', `<path d="M112 ${YS - 15} l5 9 l9 -2 l-5 8 l6 8 l-10 -1 l-5 9 l-5 -9 l-10 1 l6 -8 l-5 -8 l9 2 Z" fill="var(--crit-soft)" stroke="${SYM}" stroke-width="1.8" stroke-linejoin="round"/>`);
      const web = [[-14, -10], [14, -12], [-16, 8], [16, 10], [0, 0]];
      s += mk('coel', 140, YC, 'Çölyak pleksus', web.map(([dx, dy]) => `<line x1="${140}" y1="${YC}" x2="${140 + dx}" y2="${YC + dy}" stroke="${SYM}" stroke-width="1.6"/><circle cx="${140 + dx}" cy="${YC + dy}" r="4.6" fill="var(--crit-soft)" stroke="${SYM}" stroke-width="1.6"/>`).join('') + `<line x1="112" y1="${YC}" x2="140" y2="${YC}" stroke="${SYM}" stroke-width="1.6" stroke-dasharray="3 3"/>`);
      s += mk('lomb', 112, YL, 'Lomber sempatik zincir', `<rect x="100" y="${YL - 11}" width="24" height="22" rx="8" fill="var(--crit-soft)" stroke="${SYM}" stroke-width="1.8"/>`);
      return `<svg class="f59-svg f59-sp" viewBox="0 0 240 ${V[V.length - 1].y + 28}" role="img" aria-label="Omurga yan görünümü ve üç sempatik blok düzeyi">${s}</svg>`;
    };
    const sil = (bolge) => {
      const on = (a) => (a === bolge ? 'f59-sil on' : 'f59-sil');
      return `<svg class="f59-sil-svg" viewBox="0 0 80 120" role="img" aria-label="Etkilenen vücut bölgesi"><circle cx="40" cy="12" r="9" class="f59-sb"/><rect x="27" y="24" width="26" height="44" rx="8" class="f59-sb"/>
        <path class="${on('kol')}" d="M27 28 L12 62 M53 28 L68 62" fill="none" stroke-width="7" stroke-linecap="round"/><rect class="${on('karin')}" x="29" y="38" width="22" height="16" rx="4"/>
        <path class="${on('bacak')}" d="M33 68 L30 108 M47 68 L50 108" fill="none" stroke-width="8" stroke-linecap="round"/></svg>`;
    };
    const ciz = (m) => {
      const B = BLOK[b], dar = m === 'n';
      el.innerHTML = `<div class="f59-bar">${segHtml('Blok', 'k', Object.entries(BLOK).map(([a, v]) => [a, v.ad]), b)}</div>
        <div class="f59-blok${dar ? ' n' : ''}"><div class="f59-spwrap">${spineSvg()}</div>
        <div class="f59-kart2"><div class="f59-silw">${sil(B.bolge)}</div>
          <dl class="f59-kv"><div><dt>Yer</dt><dd>${esc(B.yer)}</dd></div><div><dt>Hedef</dt><dd>${esc(B.hedef)}</dd></div><div><dt>Kullanım</dt><dd>${esc(B.kul)}</dd></div><div><dt>Yöntem</dt><dd>${esc(B.yon)}</dd></div></dl>
          <div class="f59-rz"><span class="tag basic${B.rz === 'gec' ? ' f59-on' : ''}">Geçici: lokal anestezik</span><span class="tag warn${B.rz === 'yk' ? ' f59-on' : ''}">Yarı kalıcı: fenol ya da alkol</span></div></div></div>`;
      basSec(el, 'k', b);
      setCap(el, B.cap);
    };
    ro = izle(el, ciz);
    const sec = (e) => {
      const s = e.target.closest('[data-k],[data-b]'); if (!s) return;
      if (e.type === 'keydown' && (!act(e) || e.target.tagName === 'BUTTON')) return;
      if (e.type === 'keydown') e.preventDefault();
      b = s.dataset.k || s.dataset.b; ciz(el.clientWidth < NARROW ? 'n' : 'w');
    };
    el.addEventListener('click', sec); el.addEventListener('keydown', sec);
    return () => ro();
  };

  /* ---------- 5 · f59_ach: iyonotropik ve metabotropik ---------- */
  const NSUB = { fetal: ['NMK fetal', ['α', 'α', 'β', 'γ', 'δ'], 'α2βγδ'], erisk: ['NMK erişkin', ['α', 'α', 'β', 'ε', 'δ'], 'α2βεδ'], gang: ['Gangliyon', ['α', 'α', 'β', 'β', 'β'], 'α2β3'] };
  const MSUB = [['M1', 'salgı bezleri (ör. tükürük bezi), MSS'], ['M2', 'kalp'], ['M3', 'bronşiyol ve arteriyol düz kası'], ['M4', 'MSS'], ['M5', 'MSS']];
  VIZ.f59_ach = (el) => {
    let md = 'n', sub = 'fetal', msel = -1, t = 0, run = true, stop = () => {}, ro = () => {}, T = 0;
    const DUR = { n: 1.5, m: 3.0 };
    const svg = () => {
      const dur = DUR[md];
      let s = `<text class="f59-sm" x="6" y="14">hücre dışı</text><text class="f59-sm" x="6" y="224">hücre içi</text>
        <rect x="0" y="100" width="360" height="22" fill="var(--chip)"/><line x1="0" y1="100" x2="360" y2="100" stroke="var(--muted)" stroke-width="1.6"/><line x1="0" y1="122" x2="360" y2="122" stroke="var(--muted)" stroke-width="1.6"/>`;
      if (md === 'n') {
        const L = NSUB[sub][1];
        s += L.map((h, i) => `<g class="f59-col" data-i="${i}"><rect x="${180 + (i - 2) * 29 - 13}" y="80" width="26" height="62" rx="7" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="2"/><text class="f59-bt" x="${180 + (i - 2) * 29}" y="116" text-anchor="middle" style="fill:var(--c-basic);font-size:15px">${h}</text></g>`).join('');
        s += `<g class="f59-ions" fill="var(--ok)">${[0, 1, 2, 3].map(() => '<circle r="3.4"/>').join('')}</g>`;
        s += `<g class="f59-achm"><g class="f59-a0"><circle r="6.5" fill="var(--c-basic)"/><text class="f59-sm" y="-10" text-anchor="middle">ACh</text></g><g class="f59-a1"><circle r="6.5" fill="var(--c-basic)"/><text class="f59-sm" y="-10" text-anchor="middle">ACh</text></g></g>`;
        s += `<text class="f59-bt f59-son" x="180" y="198" text-anchor="middle" opacity="0">hızlı: reseptörün kendisi kanaldır</text><text class="f59-sm f59-iyon" x="180" y="168" text-anchor="middle" opacity="0">iyonlar geçer</text>`;
      } else {
        s += [0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${140 + i * 13}" y="82" width="9" height="58" rx="4" fill="var(--accent-soft)" stroke="var(--accent-ink)" stroke-width="1.6"/>`).join('');
        s += `<path d="M144 82 Q150 68 157 82 M170 82 Q176 68 183 82 M196 82 Q202 68 209 82" fill="none" stroke="var(--accent-ink)" stroke-width="1.6"/><path d="M157 140 Q163 154 170 140 M183 140 Q189 154 196 140" fill="none" stroke="var(--accent-ink)" stroke-width="1.6"/>`;
        s += `<text class="f59-bt" x="8" y="116">muskarinik reseptör</text>`;
        s += `<rect class="f59-ef" x="262" y="94" width="74" height="34" rx="8" fill="var(--paper)" stroke="var(--muted)" stroke-width="2"/><text class="f59-bd" x="299" y="115" text-anchor="middle">efektör</text>`;
        s += `<g class="f59-gp"><circle class="f59-gb" cx="152" cy="162" r="12"/><circle class="f59-ga" cx="180" cy="168" r="12"/><circle class="f59-gb" cx="208" cy="162" r="12"/><text class="f59-bd" x="152" y="166" text-anchor="middle">β</text><text class="f59-bd f59-gat" x="180" y="172" text-anchor="middle">α</text><text class="f59-bd" x="208" y="166" text-anchor="middle">γ</text></g>`;
        s += `<text class="f59-sm" x="180" y="196" text-anchor="middle">G proteini</text>`;
        s += `<g class="f59-ach1"><circle r="6.5" fill="var(--c-basic)"/><text class="f59-sm" y="-10" text-anchor="middle">ACh</text></g>`;
        s += `<g class="f59-ikh" fill="var(--warn)">${[0, 1, 2, 3, 4].map(() => '<circle r="3.2"/>').join('')}</g><text class="f59-sm f59-ikt" x="299" y="212" text-anchor="middle" opacity="0">ikinci haberci</text>`;
        s += `<text class="f59-bt f59-son" x="180" y="218" text-anchor="middle" opacity="0">yavaş: ikinci haberci sistemi</text>`;
      }
      return `<svg class="f59-svg" viewBox="0 0 360 232" role="img" aria-label="${md === 'n' ? 'Nikotinik reseptör: ACh bağlanınca kanal açılır' : 'Muskarinik reseptör: ACh, G proteini ve ikinci haberci'}">${s}</svg>`;
    };
    const bilgi = () => {
      if (md === 'n') return `<div class="f59-alt">${segHtml('Alt birim dizilimi', 'u', Object.entries(NSUB).map(([a, v]) => [a, v[0]]), sub)}</div>
        <dl class="f59-kv"><div><dt>Alt birimler</dt><dd>${NSUB[sub][2]}</dd></div><div><dt>Bulunduğu yer</dt><dd>Nöromüsküler kavşak, otonom gangliyonlar, beyin</dd></div><div><dt>Agonist</dt><dd>ACh, nikotin</dd></div></dl>`;
      return `<div class="f59-mlist" role="group" aria-label="Muskarinik alt tipler">${MSUB.map(([a, y], i) => `<button type="button" class="f59-m${msel === i ? ' on' : ''}" data-m="${i}" aria-pressed="${String(msel === i)}"><b>${a}</b><span>${esc(y)}</span></button>`).join('')}</div>
        <dl class="f59-kv"><div><dt>Agonist</dt><dd>ACh, muskarin (mantar alkaloidi)</dd></div></dl>`;
    };
    const ciz = (m) => {
      el.innerHTML = `<div class="f59-bar">${segHtml('Reseptör', 'r', [['n', 'Nikotinik'], ['m', 'Muskarinik']], md)}<span class="btn-row"><button type="button" class="btn play" data-a="oyn">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></span></div>
        <div class="f59-ach${m === 'n' ? ' n' : ''}"><div>${svg()}</div><div class="f59-info">${bilgi()}</div></div>
        <div class="f59-karsi"><div class="${md === 'n' ? 'on' : ''}"><b>İyonotropik</b> iyon kanalına doğrudan bağlı</div><div class="${md === 'm' ? 'on' : ''}"><b>Metabotropik</b> G proteini → ikinci haberci</div></div>`;
      kap(); ciz2();
    };
    const kap = () => {
      setCap(el, md === 'n'
        ? (subSec ? `<b>${NSUB[sub][0]}: ${NSUB[sub][2]}.</b> İzoformlar farklı olduğu için NMK ve gangliyon reseptörlerine farklı ilaçlar etki eder. [[K1 s. 270]]` : '<b>Nikotinik.</b> ACh bağlanınca reseptörün kendisi olan kanal açılır. "Oynat"a basın ya da "Muskarinik"i seçin. [[K1 s. 270]]')
        : (msel >= 0 ? `<b>${MSUB[msel][0]}.</b> ${MSUB[msel][1][0].toUpperCase() + MSUB[msel][1].slice(1)}. [[K1 s. 270]]` : '<b>Muskarinik.</b> G proteinine bağlı, metabotropik reseptör; etki ikinci haberci sistemiyle oluşur. Muskarin de bu reseptörü uyarır. Bir alt tipe dokunun. [[K1 s. 270]]'));
    };
    let subSec = false, run0 = false;
    const R = (s) => el.querySelector(s);
    const ciz2 = () => {
      const p = clamp(t / DUR[md], 0, 1), S = (a, v) => (e) => e && e.setAttribute(a, v);
      const pb = R('[data-a=oyn]'); if (pb) pb.hidden = !!RM;
      if (md === 'n') {
        const ap = clamp(p / 0.4, 0, 1), ao = ease(clamp((p - 0.35) / 0.2, 0, 1)), fl = clamp((p - 0.55) / 0.25, 0, 1);
        const a0 = R('.f59-a0'), a1 = R('.f59-a1');
        const e0 = ease(ap);
        if (a0) a0.setAttribute('transform', `translate(${lerp(50, 150, e0)} ${lerp(30, 72, e0)})`);
        if (a1) a1.setAttribute('transform', `translate(${lerp(320, 210, e0)} ${lerp(40, 72, e0)})`);
        el.querySelectorAll('.f59-col').forEach((g) => { const i = +g.dataset.i; g.setAttribute('transform', `translate(${((i - 2) * 7 * ao).toFixed(2)} 0)`); });
        const ions = R('.f59-ions');
        if (ions) [...ions.children].forEach((c, i) => { const ph = RM ? (i + 0.5) / 4 : (fl > 0 ? ((T * 0.9 + i / 4) % 1) : 0); c.setAttribute('cx', 180 + Math.sin(i * 2 + ph * 5) * 5); c.setAttribute('cy', 40 + ph * 160); c.setAttribute('opacity', fl > 0 ? 1 : 0); });
        const sn = R('.f59-son'); if (sn) sn.setAttribute('opacity', p >= 0.99 ? 1 : 0);
        const iy = R('.f59-iyon'); if (iy) iy.setAttribute('opacity', 0);
      } else {
        const a1 = clamp(p / 0.23, 0, 1), sep = ease(clamp((p - 0.23) / 0.33, 0, 1)), ef = clamp((p - 0.56) / 0.1, 0, 1), mm = clamp((p - 0.63) / 0.37, 0, 1);
        const ach = R('.f59-ach1'); if (ach) ach.setAttribute('transform', `translate(${lerp(60, 181, ease(a1))} ${lerp(40, 66, ease(a1))})`);
        const ga = R('.f59-ga'), gat = R('.f59-gat');
        const gx = lerp(180, 290, sep), gy = lerp(168, 150, sep);
        if (ga) { ga.setAttribute('cx', gx); ga.setAttribute('cy', gy); ga.style.fill = p > 0.23 ? 'var(--accent-soft)' : ''; }
        if (gat) { gat.setAttribute('x', gx); gat.setAttribute('y', gy + 4); }
        const efk = R('.f59-ef'); if (efk) { efk.style.fill = ef > 0.5 ? 'var(--accent-soft)' : 'var(--paper)'; efk.style.stroke = ef > 0.5 ? 'var(--accent-ink)' : 'var(--muted)'; }
        const ik = R('.f59-ikh'); if (ik) [...ik.children].forEach((c, i) => { const a = (i / 4) * Math.PI; c.setAttribute('cx', 299 + Math.cos(a) * 36 * mm * (i % 2 ? 1 : -1) * (0.4 + i * 0.15)); c.setAttribute('cy', 140 + mm * (24 + i * 8)); c.setAttribute('opacity', mm > 0 ? 1 : 0); });
        const it = R('.f59-ikt'); if (it) it.setAttribute('opacity', mm > 0.3 ? 1 : 0);
        const sn = R('.f59-son'); if (sn) sn.setAttribute('opacity', p >= 0.99 ? 1 : 0);
      }
    };
    ro = izle(el, ciz);
    if (!RM) { t = 0; stop = ticker(el, (dt) => { T += dt; if (run && t < DUR[md] + 0.01) t += dt; ciz2(); }); } else { t = DUR[md]; ciz2(); }
    const tikla = (e) => {
      const r = e.target.closest('[data-r]'); if (r) { md = r.dataset.r; t = RM ? DUR[md] : 0; run = true; subSec = false; msel = -1; ciz(el.clientWidth < NARROW ? 'n' : 'w'); return; }
      const u = e.target.closest('[data-u]'); if (u) { sub = u.dataset.u; subSec = true; t = RM ? DUR[md] : 0; run = true; ciz(el.clientWidth < NARROW ? 'n' : 'w'); return; }
      const mm = e.target.closest('[data-m]'); if (mm) { msel = msel === +mm.dataset.m ? -1 : +mm.dataset.m; ciz(el.clientWidth < NARROW ? 'n' : 'w'); t = DUR[md]; ciz2(); return; }
      const a = e.target.closest('[data-a]'); if (a) { t = 0; run = a.dataset.a === 'oyn'; ciz2(); }
    };
    el.addEventListener('click', tikla);
    return () => { stop(); ro(); };
  };

  /* ---------- 6 · f59_adr: dört adrenoseptör ---------- */
  const ADR = {
    a1: { ad: 'α1', g: 'Gq', yer: 'Arteriyol düz kası, üretral sfinkter', et: 'Vazokonstriksiyon', ag: 'Noradrenalin, metaraminol, fenilefrin', ant: 'Doksazosin, tamsulosin (seçici): hipertansiyon, benign prostat hipertrofisi', inh: false, eff: 'Vazokonstriksiyon', lig: [0, 0, 1, 1],
      ilac: [['Noradrenalin', 'a'], ['Metaraminol', 'a'], ['Fenilefrin', 'a'], ['Doksazosin', 'z'], ['Tamsulosin', 'z']],
      cap: '<b>α1 · Gq.</b> Arteriyol düz kası ve üretral sfinkter: vazokonstriksiyon. Agonist: noradrenalin, metaraminol, fenilefrin; antagonist: doksazosin, tamsulosin. Başka bir reseptör seçin. [[K1 s. 270]]' },
    a2: { ad: 'α2', g: 'Gi', yer: 'Pankreas, arteriyoller, MSS (presinaptik)', et: 'Vazodilatasyon*, insülin salgısı baskılanır, sedasyon, analjezi', ag: 'Noradrenalin, adrenalin; klonidin (sedatif, analjezik)', ant: '* Kitaptaki ifade; sayfadaki Atlas notuna bakın.', inh: true, eff: 'Baskılayıcı etki', lig: [0, 0, 1],
      ilac: [['Noradrenalin', 'a'], ['Adrenalin', 'a'], ['Klonidin', 'a']],
      cap: '<b>α2 · Gi, presinaptik.</b> Pankreas, arteriyoller ve MSS. Noradrenalin ve adrenalinle: kitaba göre vazodilatasyon, insülin salgısında baskılanma, sedasyon ve analjezi. Klonidin α2-agonisttir. [[K1 s. 270]]' },
    b1: { ad: 'β1', g: 'Gs', yer: 'Kalp, böbrek', et: 'Pozitif kronotropi ve inotropi, renin salgısı', ag: 'Adrenalin, noradrenalin', ant: 'Bisoprolol: iskemik kalp hastalığında kontraktilite ve hız azalır', inh: false, eff: 'Kalp ↑ · renin ↑', lig: [0, 1, 0, 1],
      ilac: [['Adrenalin', 'a'], ['Noradrenalin', 'a'], ['Bisoprolol', 'z']],
      cap: '<b>β1 · Gs.</b> Kalp ve böbrek. Adrenalin ve noradrenalinle pozitif kronotropi, inotropi ve renin salgısı. Bisoprolol β1-antagonisttir. [[K1 s. 270–271]]' },
    b2: { ad: 'β2', g: 'Gs', yer: 'Bronşiyol ve uterus düz kası', et: 'Bronkodilatasyon, uterus gevşemesi', ag: 'Başlıca adrenalin; salbutamol', ant: 'Salbutamol: akut astımda bronkodilatör, erken doğumda tokolitik', inh: false, eff: 'Bronkodilatasyon', lig: [1, 1, 0, 1, 1],
      ilac: [['Adrenalin', 'a'], ['Salbutamol', 'a']],
      cap: '<b>β2 · Gs.</b> Bronşiyol ve uterus düz kası; başlıca adrenalinle uyarılır: bronkodilatasyon, uterus gevşemesi. Salbutamol β2-agonisttir. [[K1 s. 271]]' },
  };
  VIZ.f59_adr = (el) => {
    let r = 'a1', t = 0, T = 0, stop = () => {}, ro = () => {}, ilacSec = null;
    const R = (s) => el.querySelector(s);
    const icons = () => {
      const lab = (x, y, tx) => wrap(tx, 16).map((l, i) => `<text class="f59-sm" x="${x}" y="${y + i * 13}" text-anchor="middle">${esc(l)}</text>`).join('');
      const ring = (x, y, c) => `<g transform="translate(${x} ${y})"><circle r="21" fill="var(--crit-soft)" stroke="${c}" stroke-width="2.5"/><circle class="f59-lum" r="14" fill="var(--paper)" stroke="${c}" stroke-width="1"/></g>`;
      if (r === 'a1') return ring(170, 276, SYM) + lab(170, 312, 'damar daralır');
      if (r === 'a2') return `<ellipse cx="56" cy="274" rx="26" ry="13" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2"/><text class="f59-bd f59-ins" x="56" y="278" text-anchor="middle">↓</text>${lab(56, 306, 'insülin ↓')}
        <path d="M150 284 q-14 0 -14 -12 q0 -14 14 -12 q6 -8 20 -4 q14 -4 20 6 q12 2 10 14 q-2 10 -14 8 q-10 6 -20 0 q-8 4 -16 0z" fill="var(--accent-soft)" stroke="var(--accent-ink)" stroke-width="1.8"/>${lab(170, 306, 'sedasyon, analjezi')}
        ${ring(284, 274, SYM).replace('r="14"', 'r="9"')}${lab(284, 306, 'vazodilatasyon*')}`;
      if (r === 'b1') return `<g transform="translate(86 276)"><g class="f59-ik"><g transform="scale(1.8)"><path d="${HEART}" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.6" stroke-linejoin="round"/></g></g></g>${lab(86, 312, 'hız ve kontraktilite ↑')}
        <path d="M262 258 q-24 4 -22 22 q2 20 22 22 q-10 -14 -2 -26 q4 -8 2 -18z" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2"/><g class="f59-dr" fill="var(--warn)">${[0, 1, 2].map(() => '<circle r="2.8"/>').join('')}</g>${lab(262, 316, 'renin')}`;
      return `<g transform="translate(86 276)"><path class="f59-br1" d="M-30 0 H-4" stroke="var(--accent-ink)" stroke-width="3" fill="none"/><path class="f59-br" d="M-4 0 L22 -16 M-4 0 L22 16" stroke="var(--accent-ink)" stroke-width="3" fill="none" stroke-linecap="round"/></g>${lab(86, 312, 'bronkodilatasyon')}
        <g transform="translate(262 274)"><path class="f59-ut" d="M0 -22 q22 0 22 22 q0 20 -22 24 q-22 -4 -22 -24 q0 -22 22 -22z" fill="var(--accent-soft)" stroke="var(--accent-ink)" stroke-width="2"/></g>${lab(262, 312, 'uterus gevşer')}`;
    };
    const svg = () => {
      const A = ADR[r], pre = r === 'a2';
      let s = '';
      // zar
      s += `<rect x="0" y="118" width="340" height="20" fill="var(--chip)"/><line x1="0" y1="118" x2="340" y2="118" stroke="var(--muted)" stroke-width="1.6"/><line x1="0" y1="138" x2="340" y2="138" stroke="var(--muted)" stroke-width="1.6"/>`;
      s += `<text class="f59-sm" x="6" y="${pre ? 112 : 112}">${pre ? 'sinaptik aralık' : 'hücre dışı'}</text>`;
      if (pre) s += `<path d="M0 138 H340 V160 H0 Z" fill="var(--chip)" opacity=".55"/><text class="f59-sm" x="334" y="152" text-anchor="end">presinaptik sinir ucu</text>`;
      else s += `<text class="f59-sm" x="334" y="150" text-anchor="end">hedef hücre zarı</text>`;
      s += [0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${126 + i * 13}" y="104" width="9" height="48" rx="4" fill="var(--accent-soft)" stroke="var(--accent-ink)" stroke-width="1.6"/>`).join('');
      s += `<rect class="f59-rc" x="122" y="100" width="100" height="56" rx="10" fill="none" stroke="var(--accent)" stroke-width="3" opacity="0"/>`;
      s += `<text class="f59-bt" x="8" y="132">${A.ad}-reseptör</text>`;
      // ligandlar
      s += `<g class="f59-lg">${A.lig.map((l) => `<circle r="${l ? 5 : 6.5}" fill="var(--warn)" opacity="${l ? 0.55 : 1}"/>`).join('')}</g>`;
      s += `<g class="f59-lgt"><circle cx="8" cy="14" r="5" fill="var(--warn)"/><text class="f59-sm" x="18" y="18">noradrenalin</text><circle cx="108" cy="14" r="5" fill="var(--warn)" opacity=".55"/><text class="f59-sm" x="118" y="18">adrenalin</text></g>`;
      // G proteini ve ok
      const yG = 166;
      s += `<rect class="f59-gb" x="132" y="${yG}" width="80" height="26" rx="8" fill="var(--paper)" stroke="var(--accent-ink)" stroke-width="2"/><text class="f59-bt" x="172" y="${yG + 18}" text-anchor="middle">${A.g}</text>`;
      s += `<line class="f59-ok1" x1="172" y1="152" x2="172" y2="${yG - 1}" stroke="var(--muted)" stroke-width="2.2"/>`;
      const ec = A.inh ? SYM : PAR;
      s += `<line class="f59-ok2" x1="172" y1="${yG + 26}" x2="172" y2="218" stroke="${ec}" stroke-width="2.6" ${A.inh ? 'stroke-dasharray="5 4"' : ''}/><path class="f59-uc" d="M165 214 L172 224 L179 214" fill="none" stroke="${ec}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
      s += `<text class="f59-bd" x="${A.inh ? 182 : 182}" y="212" fill="${ec}" style="fill:${ec}" font-weight="700">${A.inh ? 'baskılayıcı' : 'uyarıcı'}</text>`;
      s += `<rect class="f59-ef" x="62" y="224" width="220" height="24" rx="8" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.6"/><text class="f59-bd f59-eft" x="172" y="240" text-anchor="middle">${esc(A.eff)}</text>`;
      s += icons();
      return `<svg class="f59-svg" viewBox="0 0 340 330" role="img" aria-label="${A.ad} reseptörü: ligand, ${A.g} proteini ve etki">${s}</svg>`;
    };
    const kart = () => {
      const A = ADR[r];
      return `<dl class="f59-kv"><div><dt>Yer</dt><dd>${esc(A.yer)}</dd></div><div><dt>Uyarınca</dt><dd>${esc(A.et)}</dd></div><div><dt>Agonist</dt><dd>${esc(A.ag)}</dd></div><div><dt>Antagonist / not</dt><dd>${esc(A.ant)}</dd></div></dl>
        <div class="f59-ilac" role="group" aria-label="İlaç örnekleri">${A.ilac.map(([n, ty]) => `<button type="button" class="f59-chip${ilacSec === n ? ' on ' + ty : ''}" data-d="${esc(n)}" aria-pressed="${String(ilacSec === n)}">${esc(n)}</button>`).join('')}</div>
        <p class="f59-rozet" aria-live="polite">${ilacSec ? (() => { const d = A.ilac.find((q) => q[0] === ilacSec); return `<span class="tag ${d[1] === 'a' ? 'ok' : 'crit'}">${esc(d[0])}: ${d[1] === 'a' ? 'agonist' : 'antagonist'}</span>`; })() : '<span class="muted small">Bir ilaca dokunun: agonist mi, antagonist mi?</span>'}</p>`;
    };
    const ciz = (m) => {
      el.innerHTML = `<div class="f59-bar">${segHtml('Reseptör', 'r', Object.entries(ADR).map(([a, v]) => [a, v.ad]), r)}<button type="button" class="btn ghost" data-a="tek">Yeniden oynat</button></div>
        <div class="f59-adr${m === 'n' ? ' n' : ''}"><div class="f59-sv">${svg()}</div><div class="f59-info">${kart()}</div></div>`;
      setCap(el, ADR[r].cap); ciz2();
    };
    const ciz2 = () => {
      const A = ADR[r], p = RM ? 2 : clamp(t, 0, 2.2);
      const lg = R('.f59-lg'), e1 = ease(clamp(p / 0.7, 0, 1)), n = A.lig.length;
      if (lg) [...lg.children].forEach((c, i) => { const bx = 130 + (i + 0.5) * (84 / n) + 4; c.setAttribute('cx', lerp(30 + i * 60, bx, e1)); c.setAttribute('cy', lerp(40 + (i % 2) * 14, 88 - (i % 2) * 4, e1)); });
      const lgt = R('.f59-lgt'); if (lgt) lgt.setAttribute('opacity', e1 < 0.3 ? 1 : 0.35);
      const rc = R('.f59-rc'); if (rc) rc.setAttribute('opacity', p > 0.7 ? 1 : 0);
      const gb = R('.f59-gb'); if (gb) { gb.style.fill = p > 0.9 ? 'var(--accent-soft)' : 'var(--paper)'; }
      const o1 = clamp((p - 1.0) / 0.4, 0, 1);
      const k1 = R('.f59-ok1'), k2 = R('.f59-ok2'), uc = R('.f59-uc');
      if (k1) k1.setAttribute('opacity', p > 0.8 ? 1 : 0.25);
      if (k2) { k2.setAttribute('opacity', o1 > 0 ? 1 : 0.2); }
      if (uc) uc.setAttribute('opacity', o1 > 0 ? 1 : 0.2);
      const ef = R('.f59-ef'); if (ef) { ef.style.fill = p > 1.4 ? (A.inh ? 'var(--crit-soft)' : 'var(--ok-soft)') : 'var(--paper)'; ef.style.stroke = p > 1.4 ? (A.inh ? SYM : PAR) : 'var(--muted)'; }
      const gor = p > 1.5 ? ease(clamp((p - 1.5) / 0.6, 0, 1)) : 0;
      const lum = R('.f59-lum'); if (lum) lum.setAttribute('r', r === 'a1' ? lerp(14, 6, gor) : r === 'a2' ? 9 : 14);
      const lums = el.querySelectorAll('.f59-lum'); if (r === 'a2' && lums[0]) lums[0].setAttribute('r', lerp(9, 15, gor));
      const ik = R('.f59-ik'); if (ik) ik.setAttribute('transform', `scale(${(1 + (gor > 0.5 && !RM ? 0.16 * Math.pow(Math.max(0, Math.sin(T * 8)), 2) : 0)).toFixed(3)})`);
      const dr = R('.f59-dr'); if (dr) [...dr.children].forEach((c, i) => { const ph = RM ? 0.5 : (T * 0.6 + i / 3) % 1; c.setAttribute('cx', 262 + (i - 1) * 10); c.setAttribute('cy', 304 - ph * 40); c.setAttribute('opacity', gor ? 1 - ph : 0); });
      const br = R('.f59-br'); if (br) br.setAttribute('d', `M-4 0 L22 ${-lerp(6, 22, gor)} M-4 0 L22 ${lerp(6, 22, gor)}`);
      const ut = R('.f59-ut'); if (ut) ut.setAttribute('transform', `scale(${lerp(1, 1.12, gor)} ${lerp(1, 0.9, gor)})`);
      const ins = R('.f59-ins'); if (ins) ins.setAttribute('opacity', gor ? 1 : 0.2);
    };
    ro = izle(el, ciz);
    if (!RM) stop = ticker(el, (dt) => { T += dt; t += dt; ciz2(); });
    const tikla = (e) => {
      const m = el.clientWidth < NARROW ? 'n' : 'w';
      const s = e.target.closest('[data-r]'); if (s) { r = s.dataset.r; t = 0; ilacSec = null; ciz(m); return; }
      const d = e.target.closest('[data-d]'); if (d) { ilacSec = ilacSec === d.dataset.d ? null : d.dataset.d; const sv = R('.f59-sv'); const h = R('.f59-info'); h.innerHTML = kart(); return; }
      if (e.target.closest('[data-a=tek]')) t = 0;
    };
    el.addEventListener('click', tikla);
    return () => { stop(); ro(); };
  };
})();
