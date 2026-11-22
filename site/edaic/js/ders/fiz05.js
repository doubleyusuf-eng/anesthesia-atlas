/* Fizyoloji Bölüm 05 · Enzimler · bileşenler. VIZ.f05_ad = (el) => { ...; return temizle; }
   Modeller eğitim amaçlı ve şematiktir; her bileşenin altında belirtilir. */
(function () {
  'use strict';
  const { ticker, esc, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',');
  const pct = (v) => Math.round(clamp(v, 0, 1) * 100);

  /* ---------- 1 · Aktivasyon enerjisi, geçişler ve denge ---------- */
  VIZ.f05_enerji = (el) => {
    const PX = 34, DG = 0.9, EA = [3.6, 1.2], NU = 0.8, N0 = 30, NMAX = 60, GEC = 1.1;
    const YS = 150, YP = YS + DG * PX, XA = 112, XB = 288;
    const KEQ = Math.exp(DG), PEQ = KEQ / (1 + KEQ);
    const yAt = (x, ea) => {
      if (x <= XA) return YS;
      if (x >= XB) return YP;
      const t = (x - XA) / (XB - XA), H = ea * PX + (YP - YS) / 2;
      return YS + (YP - YS) * ease(t) - H * Math.pow(Math.sin(Math.PI * t), 2);
    };
    const bump = (x) => (x <= XA || x >= XB ? 0 : Math.sin((Math.PI * (x - XA)) / (XB - XA)));
    const yol = (ea) => { let d = ''; for (let x = 14; x <= 386; x += 4) d += (x === 14 ? 'M' : 'L') + x + ',' + yAt(x, ea).toFixed(1); return d; };
    const tepe = EA.map((e) => YS - e * PX);
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Enzim"><button type="button" data-e="0" aria-pressed="true">Enzimsiz</button><button type="button" data-e="1" aria-pressed="false">Enzimli</button></div>
      <div class="btn-row"><button type="button" class="btn ghost" data-a="ekle">S ekle (Le Chatelier)</button><button type="button" class="btn ghost" data-a="sif">Baştan</button></div></div>
      <div class="f05-en">
        <svg class="f05-en-svg" viewBox="0 0 400 236" role="img" aria-label="Enerji profili: enzim aktivasyon enerjisini düşürür, ΔG değişmez; moleküller engeli iki yönde aşar">
          <defs><marker id="f05-oka" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker><marker id="f05-okm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
          <text class="f05-ax" x="14" y="16">serbest enerji ↑</text>
          <text class="f05-ax" x="386" y="230" text-anchor="end">tepkime ilerleyişi →</text>
          <line class="f05-ref" x1="14" x2="392" y1="${YS}" y2="${YS}"/>
          <path class="f05-cv" data-e="0" d="${yol(EA[0])}"/>
          <path class="f05-cv" data-e="1" d="${yol(EA[1])}"/>
          <line class="f05-ea" data-e="0" x1="192" x2="192" y1="${YS}" y2="${tepe[0] + 4}" marker-end="url(#f05-okm)"/>
          <text class="f05-eal" data-e="0" x="186" y="78" text-anchor="end">Eₐ</text>
          <line class="f05-ea" data-e="1" x1="208" x2="208" y1="${YS}" y2="${tepe[1] + 4}" marker-end="url(#f05-oka)"/>
          <text class="f05-eal" data-e="1" x="214" y="140">Eₐ</text>
          <line class="f05-dg" x1="388" x2="388" y1="${YS}" y2="${YP - 3}" marker-end="url(#f05-okm)"/>
          <text class="f05-dgl" x="382" y="${(YS + YP) / 2 + 5}" text-anchor="end">ΔG</text>
          <text class="f05-lv" x="20" y="${YS + 24}">S · substrat</text>
          <text class="f05-lv" x="356" y="${YP + 24}" text-anchor="end">P · ürün</text>
          <g class="f05-pt">${Array.from({ length: NMAX }, () => '<circle r="4.6"/>').join('')}</g>
        </svg>
        <div class="f05-en-yan">
          <div class="f05-key"><span><i class="k0"></i>enzimsiz yol</span><span><i class="k1"></i>enzimli yol</span></div>
          <div class="f05-oku">
            <div><span>S (substrat)</span><b data-o="s">0</b></div>
            <div><span>P (ürün)</span><b data-o="p">0</b></div>
            <div><span>son 10 sn · ileri</span><b data-o="f">0</b></div>
            <div><span>son 10 sn · geri</span><b data-o="r">0</b></div>
          </div>
          <div class="f05-bar"><span class="trk"><i class="fl"></i><i class="mk" style="left:${(PEQ * 100).toFixed(1)}%"></i></span><span class="small muted">ürün oranı <b data-o="o">%0</b> · denge ≈ %${pct(PEQ)}</span></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Model şematiktir (Atlas notu): her molekülün engeli aşma hızı e^(−Eₐ/kT) ile orantılı alındı; Eₐ enzimsiz 3,6 kT, enzimli 1,2 kT, ΔG −0,9 kT. Bu modelde enzim iki yöndeki hızı da ≈ 11 kat artırır; gerçek enzimlerde artış genellikle milyonlarca kat ve üzeridir. Mekanizma kitaptandır. [[K1 s. 18]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const dots = [...el.querySelectorAll('.f05-pt circle')], cap = $('.viz-cap'), fl = $('.f05-bar .fl');
    const O = {}; el.querySelectorAll('[data-o]').forEach((b) => { O[b.dataset.o] = b; });
    let enz = 0, P = [], accF = 0, accR = 0, gecF = [], gecR = [], now = 0, tDeg = -99, eklendi = false, last = '';
    const ev = (side) => (side ? { x: lerp(300, 352, Math.random()), row: Math.floor(Math.random() * 4) } : { x: lerp(24, 100, Math.random()), row: Math.floor(Math.random() * 4) });
    const yeni = (side) => Object.assign({ side, c: null }, ev(side));
    const kur = (n) => { P = Array.from({ length: n }, () => yeni(0)); accF = accR = 0; gecF = []; gecR = []; };
    const dengeyeKoy = () => { const n = P.length, np = Math.round(n * PEQ); P = P.map((_, i) => yeni(i < np ? 1 : 0)); };
    const say = () => { let s = 0, p = 0; P.forEach((q) => { if (q.side) p++; else s++; }); return [s, p]; };
    const basla = (q) => { const h = ev(1 - q.side); q.c = { u: 0, x0: q.x, r0: q.row, x1: h.x, r1: h.row, to: 1 - q.side }; (q.side ? gecR : gecF).push(now); };
    const adim = (dt) => {
      now += dt;
      const ea = EA[enz], kf = NU * Math.exp(-ea), kr = NU * Math.exp(-(ea + DG));
      const bosS = P.filter((q) => !q.c && q.side === 0), bosP = P.filter((q) => !q.c && q.side === 1);
      accF += kf * bosS.length * dt; accR += kr * bosP.length * dt;
      while (accF >= 1 && bosS.length) { basla(bosS.splice(Math.floor(Math.random() * bosS.length), 1)[0]); accF -= 1; }
      while (accR >= 1 && bosP.length) { basla(bosP.splice(Math.floor(Math.random() * bosP.length), 1)[0]); accR -= 1; }
      P.forEach((q) => { if (!q.c) return; q.c.u += dt / GEC; if (q.c.u >= 1) { q.side = q.c.to; q.x = q.c.x1; q.row = q.c.r1; q.c = null; } });
      gecF = gecF.filter((t) => now - t < 10); gecR = gecR.filter((t) => now - t < 10);
    };
    const ciz = () => {
      const ea = EA[enz];
      el.querySelectorAll('[data-e]').forEach((b) => {
        const on = +b.dataset.e === enz;
        if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', String(on));
        else b.classList.toggle('on', on);
      });
      dots.forEach((d, i) => {
        const q = P[i];
        if (!q) { d.setAttribute('r', 0); return; }
        d.setAttribute('r', 4.6);
        let x, y, cls;
        if (q.c) {
          const u = ease(q.c.u); x = lerp(q.c.x0, q.c.x1, u);
          y = yAt(x, ea) - 6 - lerp(q.c.r0, q.c.r1, u) * 10 * (1 - bump(x)); cls = 'gec';
        } else {
          const j = RM ? 0 : Math.sin(now * 3.1 + i * 1.7) * 1.4;
          x = q.x + j; y = (q.side ? YP : YS) - 6 - q.row * 10; cls = q.side ? 'p' : 's';
        }
        d.setAttribute('cx', x.toFixed(1)); d.setAttribute('cy', y.toFixed(1)); d.setAttribute('class', cls);
      });
      const [s, p] = say(), n = s + p, oran = p / n;
      O.s.textContent = s; O.p.textContent = p; O.f.textContent = gecF.length; O.r.textContent = gecR.length; O.o.textContent = '%' + pct(oran);
      fl.style.width = (oran * 100).toFixed(1) + '%';
      const yakin = Math.abs(p - n * PEQ) <= 1.5;
      let c;
      if (eklendi && !yakin) c = '<b>Le Chatelier.</b> Eklenen substrat dengeyi bozdu. Net tepkime fazla S\'yi P\'ye çevirerek aynı orana döner; enzim bu düzeltmeyi hızlandırır, yönünü belirlemez. [[K1 s. 18]]';
      else if (yakin && now - tDeg > 1.5) c = '<b>Dinamik denge.</b> İleri ve geri geçişler eşitlendi: tepkime durmadı, iki yönde aynı hızla sürüyor. Ürün oranı enzimli ve enzimsiz durumda aynıdır (≈ %' + pct(PEQ) + '); enzim dengenin yerini değil, ona ulaşma hızını değiştirir. [[K1 s. 18]]';
      else if (enz) c = '<b>Enzimli.</b> Substrat uygun yönelimde bağlandığı için aktivasyon enerjisi düşük: hem ileri hem geri geçişler çok daha sık, denge hızla kuruluyor. [[K1 s. 18]]';
      else c = '<b>Enzimsiz.</b> Engel yüksek: yalnızca az sayıda molekül engeli aşacak enerjiye ulaşıyor, dengeye yaklaşma yavaş. Üstteki düğmeyle enzimi ekleyin. [[K1 s. 18]]';
      if (yakin) eklendi = false;
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-e]');
      if (b) { enz = +b.dataset.e; tDeg = RM ? -99 : now; if (RM) dengeyeKoy(); ciz(); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'ekle') { const k = Math.min(15, NMAX - P.length); for (let i = 0; i < k; i++) P.push(yeni(0)); if (k) { eklendi = true; tDeg = RM ? -99 : now; } if (RM) { dengeyeKoy(); eklendi = false; } }
      if (a.dataset.a === 'sif') { kur(N0); tDeg = RM ? -99 : now; eklendi = false; if (RM) dengeyeKoy(); }
      ciz();
    });
    kur(N0);
    if (RM) dengeyeKoy();
    ciz();
    return ticker(el, (dt) => { if (!RM) adim(dt); ciz(); });
  };

  /* ---------- 2 · Aktif bölge: özgüllük, sıcaklık ve pH ---------- */
  VIZ.f05_aktif = (el) => {
    const CX = 180, CY = 160, R = 54;
    const SOK = [['o', -90], ['k', 150], ['u', 30]]; // daire, kare, üçgen: cebin biçimi ve açısı
    const IZO = { L: [['o', -90], ['k', 150], ['u', 30]], D: [['o', -90], ['k', 30], ['u', 150]] };
    const RENK = { o: 'var(--crit)', k: 'var(--c-clin)', u: 'var(--warn)' };
    const OFF = [[26, 1], [-20, 1], [32, 1]];
    const sekil = (s, z) => (s === 'o' ? `<circle r="${z}"/>` : s === 'k' ? `<rect x="${-z}" y="${-z}" width="${2 * z}" height="${2 * z}" rx="3"/>` : `<path d="M0 ${-z * 1.2}L${z * 1.12} ${z * 0.75}L${-z * 1.12} ${z * 0.75}Z"/>`);
    const pol = (a, r) => [Math.cos((a * Math.PI) / 180) * r, Math.sin((a * Math.PI) / 180) * r];
    const norm = (a) => ((Math.round(a) % 360) + 360) % 360;
    // sıcaklık ve pH modeli (şematik)
    const katla = (T) => 1 / (1 + Math.exp((T - 44) / 2.2));
    const hamT = (T) => Math.exp(0.065 * (T - 37)) * katla(T);
    let AMAX = 0, TOPT = 37; for (let T = 0; T <= 60; T += 0.1) { const v = hamT(T); if (v > AMAX) { AMAX = v; TOPT = T; } }
    const aT = (T) => hamT(T) / AMAX, aPH = (p) => Math.exp(-Math.pow((p - 7.4) / 1.2, 2));
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Görünüm"><button type="button" data-m="oz" aria-pressed="true">Özgüllük</button><button type="button" data-m="T" aria-pressed="false">Sıcaklık</button><button type="button" data-m="pH" aria-pressed="false">pH</button></div></div>
      <div class="f05-ak">
        <svg class="f05-ak-svg" viewBox="0 0 360 300" role="img" aria-label="Aktif bölgenin üstten görünüşü: üç farklı cep ve substratın üç grubu">
          <path class="f05-enz" d="M60 96C64 54 120 34 178 36C246 38 300 64 314 112C330 166 318 236 262 266C212 292 132 290 88 258C46 228 54 150 60 96Z"/>
          <circle class="f05-cep" cx="${CX}" cy="${CY}" r="88"/>
          <text class="f05-ak-t" x="14" y="20">aktif bölge · üstten bakış</text>
          <g class="f05-sok">${SOK.map(([s], i) => `<g data-i="${i}"><g class="sh" style="stroke:${RENK[s]}">${sekil(s, 15)}</g><text class="ck" text-anchor="middle"></text></g>`).join('')}</g>
          <g class="f05-sub"><g class="bag"></g><g class="grp"></g><circle class="mrk" r="15"/><text class="mrk-t" text-anchor="middle" y="4.5">H</text></g>
        </svg>
        <div class="f05-ak-yan">
          <div class="f05-ak-ctl" data-p="oz">
            <div class="seg" role="group" aria-label="Molekül"><button type="button" data-z="L" aria-pressed="true">Substrat</button><button type="button" data-z="D" aria-pressed="false">Ayna görüntüsü</button></div>
            <div class="btn-row" style="margin-top:10px"><button type="button" class="btn" data-a="yer">Yerleştir</button><button type="button" class="btn ghost" data-a="don">120° döndür</button><button type="button" class="btn ghost" data-a="cev">Ters çevir</button></div>
            <p class="small muted" style="margin-top:10px">Ortadaki daire dördüncü gruptur (H): normalde size, yani enzimin dışına bakar.</p>
          </div>
          <div class="f05-ak-ctl" data-p="T" hidden><label class="f05-rng"><span>Sıcaklık <b data-o="T">37 °C</b></span><input type="range" min="0" max="60" step="1" value="37" data-r="T"></label></div>
          <div class="f05-ak-ctl" data-p="pH" hidden><label class="f05-rng"><span>pH <b data-o="pH">7,4</b></span><input type="range" min="4" max="10.6" step="0.1" value="7.4" data-r="pH"></label></div>
          <svg class="f05-ak-ch" viewBox="0 0 360 150" role="img" aria-label="Enzim etkinliğinin sıcaklık ya da pH ile değişimi" hidden>
            <rect x="44" y="12" width="300" height="104" rx="6" class="f05-ch-bg"/>
            <path class="f05-ch-cv"/><line class="f05-ch-v" y1="12" y2="116"/><circle class="f05-ch-p" r="5.5"/>
            <text class="f05-ax" x="38" y="20" text-anchor="end">%100</text><text class="f05-ax" x="38" y="118" text-anchor="end">0</text>
            <g class="f05-ch-tk"></g><text class="f05-ax f05-ch-xl" x="344" y="146" text-anchor="end"></text>
          </svg>
          <div class="f05-bar" style="margin-top:12px"><span class="trk"><i class="fl"></i></span><span class="small muted" data-o="et"></span></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik model (Atlas notu): stereoizomer ayrımı üç noktadan bağlanma ile gösterildi. Sıcaklık eğrisinin yükselen kolu ve optimum değerleri kitapta yoktur; genel biyokimya bilgisidir. Gerçek optimumlar enzimden enzime değişir; örneğin midede çalışan pepsin asidik ortamda en etkindir. pH değişikliği aktif bölgedeki grupların yükünü de değiştirir. Modelde kaydırıcı geri alınınca etkinlik geri gelir; gerçekte ısıyla denatürasyon çoğu enzimde geri dönüşsüzdür. [[K1 s. 18]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const sokG = [...el.querySelectorAll('.f05-sok > g')], sub = $('.f05-sub'), bagG = sub.querySelector('.bag'), grpG = sub.querySelector('.grp');
    const mrkT = sub.querySelector('.mrk-t'), mrk = sub.querySelector('.mrk'), cap = $('.viz-cap'), fl = $('.f05-bar .fl'), etO = $('[data-o="et"]');
    const ch = $('.f05-ak-ch'), cv = ch.querySelector('.f05-ch-cv'), chV = ch.querySelector('.f05-ch-v'), chP = ch.querySelector('.f05-ch-p'), chTk = ch.querySelector('.f05-ch-tk'), chXl = ch.querySelector('.f05-ch-xl');
    let mod = 'oz', izo = 'L', ang = IZO.L.map((g) => g[1]), hUp = true, yer = 0, yerHedef = 0, T = 37, PH = 7.4;
    let anim = null, last = '';
    const grpSek = () => IZO[izo].map((g) => g[0]);
    const kurGrp = () => { grpG.innerHTML = grpSek().map((s) => `<g style="fill:${RENK[s]}">${sekil(s, 11.5)}</g>`).join(''); bagG.innerHTML = grpSek().map(() => '<line/>').join(''); };
    const deform = () => (mod === 'T' ? 1 - katla(T) : mod === 'pH' ? 1 - aPH(PH) : 0);
    const etkin = () => (mod === 'T' ? aT(T) : mod === 'pH' ? aPH(PH) : 1);
    const eslesme = () => SOK.map(([s, a]) => { const j = ang.findIndex((g) => norm(g) === norm(a)); return j >= 0 && grpSek()[j] === s; });
    const ciz = () => {
      const d = deform(), sx = anim && anim.t === 'cev' ? Math.cos(Math.PI * ease(anim.u)) : 1;
      // cepler
      sokG.forEach((g, i) => {
        const a = SOK[i][1] + d * OFF[i][0], r = R + d * 20, [x, y] = pol(a, r);
        g.querySelector('.sh').setAttribute('transform', `translate(${(CX + x).toFixed(1)},${(CY + y).toFixed(1)}) rotate(${(a + 90 + d * 38).toFixed(1)})`);
        const [tx, ty] = pol(SOK[i][1], R + 34);
        const ck = g.querySelector('.ck'); ck.setAttribute('x', (CX + tx).toFixed(1)); ck.setAttribute('y', (CY + ty + 5).toFixed(1));
      });
      // substrat
      const f = ease(yer), px = lerp(296, CX, f), py = lerp(62, CY, f), sc = lerp(0.62, 1, f);
      sub.setAttribute('transform', `translate(${px.toFixed(1)},${py.toFixed(1)}) scale(${(sx * sc).toFixed(3)},${sc.toFixed(3)})`);
      const lines = [...bagG.children], gs = [...grpG.children];
      ang.forEach((a, i) => {
        const [x, y] = pol(a, R);
        lines[i].setAttribute('x2', x.toFixed(1)); lines[i].setAttribute('y2', y.toFixed(1));
        gs[i].setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(a + 90).toFixed(1)})`);
      });
      const hGor = anim && anim.t === 'cev' ? (anim.u < 0.5 ? hUp : !hUp) : hUp;
      mrkT.textContent = hGor ? 'H' : 'C'; mrk.classList.toggle('alt', !hGor);
      // değerlendirme
      const yerde = yer >= 0.999 && !anim, es = eslesme();
      sokG.forEach((g, i) => {
        const ck = g.querySelector('.ck');
        if (mod !== 'oz') { const ok = d < 0.2, mid = d < 0.5; ck.textContent = ok ? '✓' : mid ? '~' : '✕'; ck.setAttribute('class', 'ck ' + (ok ? 'ok' : mid ? 'mid' : 'no')); }
        else if (yerde) { ck.textContent = es[i] ? '✓' : '✕'; ck.setAttribute('class', 'ck ' + (es[i] ? 'ok' : 'no')); }
        else { ck.textContent = ''; }
      });
      const m = es.filter(Boolean).length, uydu = yerde && m === 3 && hUp;
      sub.classList.toggle('uydu', mod === 'oz' ? uydu : deform() < 0.2);
      // etkinlik çubuğu ve grafik
      let et, etTxt;
      if (mod === 'oz') { et = yerde ? (uydu ? 1 : 0) : 0; etTxt = yerde ? (uydu ? 'bağlandı · tepkime olur' : `${m}/3 grup cebinde${m === 3 ? ' · H içeride' : ''} · bağlanamaz`) : 'henüz yerleştirilmedi'; }
      else { et = etkin(); etTxt = 'etkinlik %' + pct(et) + (mod === 'T' ? ' · optimum ≈ ' + Math.round(TOPT) + ' °C (model)' : ' · optimum 7,4 (model)'); }
      fl.style.width = (et * 100).toFixed(1) + '%'; etO.textContent = etTxt;
      if (mod !== 'oz') {
        const x0 = mod === 'T' ? 0 : 4, x1 = mod === 'T' ? 60 : 10.6, X = (v) => 44 + ((v - x0) / (x1 - x0)) * 300, Y = (v) => 116 - v * 100;
        const v = mod === 'T' ? T : PH;
        chV.setAttribute('x1', X(v).toFixed(1)); chV.setAttribute('x2', X(v).toFixed(1));
        chP.setAttribute('cx', X(v).toFixed(1)); chP.setAttribute('cy', Y(et).toFixed(1));
      }
      // açıklama
      let c;
      if (mod === 'oz') {
        if (anim) c = null;
        else if (!yerde) c = '<b>Üç noktadan bağlanma.</b> Aktif bölgede biçimleri farklı üç cep var. Substratın üç grubu bunlara ancak doğru düzende oturur; dördüncü grup (H) dışarı bakar. "Yerleştir"e basın, sonra ayna görüntüsünü deneyin. [[K1 s. 18]]';
        else if (uydu) c = '<b>Uydu.</b> Üç grup da kendi cebine oturdu ve H dışarıda: substrat doğru yönelimde bağlandı, tepkime için en uygun konumda. [[K1 s. 18]]';
        else if (m === 3) c = '<b>Üç grup oturdu ama H enzime gömülüyor.</b> Ters çevrilen molekülde dördüncü grup enzimin içine bakmak zorunda kalır; bu yüzden bu biçimde bağlanamaz.';
        else if (izo === 'D' && hUp) c = `<b>Uymadı: ${m}/3 grup cebinde.</b> Ayna görüntüsü aynı gruplardan oluşur ama düzeni terstir: ne kadar döndürseniz de en fazla bir grup kendi cebine oturur. Aktif bölge stereoizomerleri böyle ayırt eder. [[K1 s. 18]]`;
        else c = `<b>Uymadı: ${m}/3 grup cebinde.</b> Yönelim yanlış. Döndürerek ya da ters çevirerek doğru yönelimi arayın: enzim substratı ancak belirli bir yönelimde bağlar. [[K1 s. 18]]`;
      } else if (mod === 'T') {
        if (T < 35) c = '<b>Düşük sıcaklık.</b> Aktif bölgenin biçimi korunuyor ama moleküller daha az enerjili; tepkime yavaş (Atlas notu). Enzim kinetiğinin optimal sıcaklık aralığı dardır. [[K1 s. 3]]';
        else if (T <= TOPT + 1 || d < 0.3) c = '<b>Optimum çevresi.</b> Biçim büyük ölçüde korunuyor, etkinlik en yüksek düzeyine yakın. [[K1 s. 3]]';
        else c = '<b>Yüksek sıcaklık.</b> Protein yapısı bozuluyor (denatürasyon): aktif bölgenin biçimi değişiyor, cepler substrata uymuyor ve tepkime hızla yavaşlıyor. [[K1 s. 18]]';
      } else {
        if (Math.abs(PH - 7.4) < 0.5) c = '<b>Optimum pH.</b> Aktif bölgenin biçimi substrata uygun. Enzimler dar bir pH aralığında verimli çalışır. [[K1 s. 2]]';
        else c = '<b>pH optimumdan uzak.</b> Aktif bölgenin biçimi değişiyor, substrat artık iyi uymuyor ve tepkime yavaşlıyor. Uç pH değerleri proteinin üçüncül ya da dördüncül yapısını bozar. [[K1 s. 18]] [[K1 s. 2]]';
      }
      if (c && c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    const grafik = () => {
      const T_ = mod === 'T', x0 = T_ ? 0 : 4, x1 = T_ ? 60 : 10.6, X = (v) => 44 + ((v - x0) / (x1 - x0)) * 300, Y = (v) => 116 - v * 100;
      let dd = ''; for (let v = x0; v <= x1 + 1e-6; v += (x1 - x0) / 150) dd += (dd ? 'L' : 'M') + X(v).toFixed(1) + ',' + Y(T_ ? aT(v) : aPH(v)).toFixed(1);
      cv.setAttribute('d', dd);
      const tk = T_ ? [0, 10, 20, 30, 40, 50, 60] : [4, 5, 6, 7, 8, 9, 10];
      chTk.innerHTML = tk.map((t) => `<text class="f05-ax" x="${X(t).toFixed(1)}" y="132" text-anchor="middle">${t}</text>`).join('');
      chXl.textContent = T_ ? 'sıcaklık (°C)' : 'pH';
    };
    const mode = (m) => {
      mod = m; anim = null; last = '';
      el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === m)));
      el.querySelectorAll('.f05-ak-ctl').forEach((p) => { p.hidden = p.dataset.p !== m; });
      ch.toggleAttribute('hidden', m === 'oz'); // SVG öğesinde .hidden özelliği yok; öznitelik değişmeli
      if (m !== 'oz') { izo = 'L'; ang = IZO.L.map((g) => g[1]); hUp = true; kurGrp(); yer = yerHedef = 1; grafik(); ciz(); }
      else izoSec('L');
    };
    const izoSec = (z) => {
      izo = z; ang = IZO[z].map((g) => g[1]); hUp = true; anim = null; yer = yerHedef = 0; kurGrp();
      el.querySelectorAll('[data-z]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.z === z)));
      el.querySelector('[data-a="yer"]').textContent = 'Yerleştir';
      ciz();
    };
    const bitir = () => {
      if (!anim) return;
      if (anim.t === 'don') ang = anim.a0.map((a) => a + 120);
      if (anim.t === 'cev') { ang = ang.map((a) => 180 - a); hUp = !hUp; }
      anim = null;
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const mb = e.target.closest('[data-m]'); if (mb) { mode(mb.dataset.m); return; }
      const zb = e.target.closest('[data-z]'); if (zb) { izoSec(zb.dataset.z); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      bitir();
      if (a.dataset.a === 'yer') { yerHedef = yerHedef ? 0 : 1; a.textContent = yerHedef ? 'Çıkar' : 'Yerleştir'; if (RM) yer = yerHedef; }
      if (a.dataset.a === 'don') { if (RM) ang = ang.map((x) => x + 120); else anim = { t: 'don', u: 0, a0: ang.slice() }; }
      if (a.dataset.a === 'cev') { if (RM) { ang = ang.map((x) => 180 - x); hUp = !hUp; } else anim = { t: 'cev', u: 0 }; }
      last = ''; ciz();
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'T') { T = +r.value; $('[data-o="T"]').textContent = T + ' °C'; }
      else { PH = +r.value; $('[data-o="pH"]').textContent = fmt(PH); }
      ciz();
    });
    kurGrp(); ciz();
    return ticker(el, (dt) => {
      let deg = false;
      if (yer !== yerHedef) { yer = yerHedef > yer ? Math.min(1, yer + dt / 0.8) : Math.max(0, yer - dt / 0.8); deg = true; }
      if (anim) {
        anim.u += dt / 0.7;
        if (anim.t === 'don') ang = anim.a0.map((x) => x + 120 * ease(Math.min(1, anim.u)));
        if (anim.u >= 1) { bitir(); last = ''; }
        deg = true;
      }
      if (deg) ciz();
    });
  };

  /* ---------- 3 · Karbonik anhidrazın katalitik döngüsü ---------- */
  VIZ.f05_ca = (el) => {
    // durumlar: 0 hazır · 1 su bağlı · 2 OH⁻ + His–H⁺ · 3 CO₂ cepte · 4 HCO₃⁻ çinkoda · 5 ürünler ayrıldı
    const ZN = [205, 194], HIS = [128, 150];
    const A = { // [x, y, opaklık] her durum için
      Ow: [[150, 46, 1], [205, 162, 1], [205, 162, 1], [205, 162, 1], [208, 160, 1], [300, 20, 0]],
      Ha: [[133, 36, 1], [189, 152, 1], [147, 136, 1], [147, 136, 1], [147, 136, 1], [112, 18, 0]],
      Hb: [[167, 36, 1], [221, 152, 1], [221, 152, 1], [221, 152, 1], [192, 148, 1], [284, 10, 0]],
      C: [[330, 52, 1], [330, 52, 1], [330, 52, 1], [292, 150, 1], [240, 142, 1], [330, 22, 0]],
      O1: [[310, 52, 1], [310, 52, 1], [310, 52, 1], [272, 150, 1], [240, 119, 1], [330, 0, 0]],
      O2: [[350, 52, 1], [350, 52, 1], [350, 52, 1], [312, 150, 1], [266, 150, 1], [356, 30, 0]],
    };
    const TUR = { Ow: 'O', Ha: 'H', Hb: 'H', C: 'C', O1: 'O', O2: 'O' };
    const BAG = [['Ow', 'Ha', [1, 1, 0, 0, 0, 0]], ['Ow', 'Hb', [1, 1, 1, 1, 1, 1]], ['C', 'O1', [1, 1, 1, 1, 1, 1]], ['C', 'O2', [1, 1, 1, 1, 1, 1]], ['Ow', 'C', [0, 0, 0, 0, 1, 1]], ['ZN', 'Ow', [0, 1, 1, 1, 1, 0], 'koor'], ['HIS', 'Ha', [0, 0, 1, 1, 1, 0]]];
    const ETK = [['H₂O', 'Ow', -42, 6, [1, 1, 0, 0, 0, 0]], ['OH⁻', 'Ow', 0, -24, [0, 0, 1, 1, 0, 0]], ['CO₂', 'C', 0, -18, [1, 1, 1, 1, 0, 0]], ['HCO₃⁻', 'C', 36, -22, [0, 0, 0, 0, 1, 0]]];
    const ILERI = [
      '<b>Hazır.</b> Karbonik anhidrazın aktif bölgesinde bir çinko iyonu (Zn²⁺), yan duvarda bir histidin kalıntısı ve CO₂ molekülüne tam uyan bir cep var. [[K1 s. 18]]',
      '<b>1 · Su çinkoya bağlanır.</b> [[K1 s. 18]]',
      '<b>2 · Histidin H⁺\'yı koparır.</b> Komşu histidin kalıntısı sudan bir H⁺ alır; çinkoya bağlı, çok etkin bir OH⁻ kalır. [[K1 s. 18]]',
      '<b>3 · CO₂ cebe oturur.</b> Aktif bölgedeki cep CO₂ molekülüne tam uyar; CO₂ ile OH⁻ artık yan yanadır. [[K1 s. 18]]',
      '<b>4 · Tepkime.</b> Yakınlık sayesinde OH⁻ CO₂\'ye hızla bağlanır; çinkonun üzerinde bikarbonat (HCO₃⁻) oluşur. [[K1 s. 18]]',
      '<b>5 · Ürün ayrılır.</b> HCO₃⁻ enzimden ayrılır, histidin H⁺\'yı ortama verir. Net sonuç CO₂ + H₂O → H⁺ + HCO₃⁻, yani H₂CO₃. Enzim kimyasal olarak değişmedi ve yeni bir döngüye hazır: katalizör budur. [[K1 s. 18]]',
    ];
    const TERS = [
      '<b>Ters 5 · Su ayrılır.</b> Aynı enzim ters tepkimeyi de katalizledi ve yine değişmeden kaldı: H₂CO₃ → CO₂ + H₂O. [[K1 s. 18]]',
      '<b>Ters 4 · Su yeniden oluşur.</b> Histidin H⁺\'yı çinkodaki OH⁻\'ye geri verir; çinkoda su oluşur.',
      '<b>Ters 3 · CO₂ ayrılır.</b> CO₂ cepten çıkar ve ortama geçer. [[K1 s. 18]]',
      '<b>Ters 2 · HCO₃⁻ ayrışır.</b> CO₂ cepte, OH⁻ çinkoda kalır.',
      '<b>Ters 1 · Ürünler geri gelir.</b> H⁺ histidine, HCO₃⁻ çinkoya bağlanır. Akciğerde olduğu gibi CO₂ ortamdan uzaklaştırılıyorsa net tepkime bu yöne kayar. [[K1 s. 18]] [[K1 s. 38]]',
      '<b>Ters yön.</b> Ortamda H⁺ ve HCO₃⁻ (yani H₂CO₃) var; enzim bunları CO₂ ve suya çevirecek. [[K1 s. 18]]',
    ];
    const ADIM = ['Hazır', '1 Su', '2 H⁺ → His', '3 CO₂', '4 HCO₃⁻', '5 Ayrılma'];
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Yön"><button type="button" data-y="1" aria-pressed="true">İleri: CO₂ + H₂O → H⁺ + HCO₃⁻</button><button type="button" data-y="-1" aria-pressed="false">Ters</button></div>
      <div class="btn-row"><button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">‹</button><button type="button" class="btn play" data-a="oyn">Duraklat</button><button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">›</button></div></div>
      <div class="f05-ca">
        <svg class="f05-ca-svg" viewBox="0 0 400 270" role="img" aria-label="Karbonik anhidrazın aktif bölgesi: çinko, histidin, CO₂ cebi ve katalitik döngü">
          <path class="f05-prot" d="M0 270V122Q0 98 26 98H374Q400 98 400 122V270Z"/>
          <ellipse class="f05-oyuk" cx="205" cy="118" rx="80" ry="88"/>
          <ellipse class="f05-oyuk" cx="292" cy="150" rx="28" ry="16"/>
          <text class="f05-ca-l" x="368" y="200" text-anchor="end">CO₂ cebi</text>
          <path class="f05-ca-ip" d="M300 186L298 168"/>
          <text class="f05-ca-l" x="84" y="256">katlanmış protein</text>
          <text class="f05-ca-l" x="84" y="20">çözelti</text>
          ${[[-16, 22], [0, 28], [16, 22]].map(([dx, dy]) => `<line class="f05-lig" x1="${ZN[0]}" y1="${ZN[1]}" x2="${ZN[0] + dx}" y2="${ZN[1] + dy}"/>`).join('')}
          <g class="f05-bg">${BAG.map((b) => `<line class="${b[3] || ''}"/>`).join('')}</g>
          <polygon class="f05-his" points="${Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; return (HIS[0] + 13 * Math.cos(a)).toFixed(1) + ',' + (HIS[1] + 13 * Math.sin(a)).toFixed(1); }).join(' ')}"/>
          <text class="f05-ca-his" x="${HIS[0] - 18}" y="${HIS[1] + 5}" text-anchor="end">His</text><text class="f05-ca-his f05-hisp" x="${HIS[0] - 17}" y="${HIS[1] - 2}">+</text>
          <circle class="f05-glow" r="20"/>
          <g class="f05-at">${Object.keys(A).map((k) => `<g data-k="${k}" class="a-${TUR[k]}"><circle r="${TUR[k] === 'H' ? 7.5 : 10.5}"/><text text-anchor="middle" y="${TUR[k] === 'H' ? 3.5 : 4.5}">${TUR[k]}</text></g>`).join('')}</g>
          <g class="f05-zn"><circle cx="${ZN[0]}" cy="${ZN[1]}" r="17"/><text x="${ZN[0]}" y="${ZN[1] + 4.5}" text-anchor="middle">Zn²⁺</text></g>
          <g class="f05-et">${ETK.map((e) => `<text text-anchor="middle">${e[0]}</text>`).join('')}</g>
        </svg>
        <div class="f05-ca-yan">
          <ol class="f05-adim">${ADIM.map((s, i) => `<li><button type="button" data-s="${i}">${s}</button></li>`).join('')}</ol>
          <div class="f05-sayac"><span>Aynı enzim molekülü</span><b data-o="n">1. döngü</b><span class="small muted">her turda değişmeden çıkar</span></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim; kitaptaki şeklin kopyası değildir. İleri adımlar kitaptaki sırayı izler [[K1 s. 18]]. Atlas notu: ürün mekanizma düzeyinde HCO₃⁻ ve H⁺ olarak gösterildi (H₂CO₃ ⇌ H⁺ + HCO₃⁻ [[K1 s. 37]]); ters yöndeki adımlar ileri adımların tersidir. Çinkoyu proteine bağlayan üç kısa çizgi şematiktir.')}</p>`;
    const $ = (s) => el.querySelector(s);
    const at = {}; el.querySelectorAll('.f05-at > g').forEach((g) => { at[g.dataset.k] = g; });
    const bgl = [...el.querySelectorAll('.f05-bg line')], etl = [...el.querySelectorAll('.f05-et text')], glow = $('.f05-glow'), hisp = $('.f05-hisp');
    const cap = $('.viz-cap'), oyn = $('[data-a="oyn"]'), nO = $('[data-o="n"]'), chips = [...el.querySelectorAll('.f05-adim button')];
    const MOVE = 1.0, HOLD = 2.2, svgCa = $('.f05-ca-svg');
    const vb = () => svgCa.setAttribute('viewBox', el.clientWidth && el.clientWidth < 560 ? '72 4 322 262' : '0 0 400 270'); // dar ekranda sahneyi yakınlaştır
    vb(); window.addEventListener('resize', vb);
    let yon = 1, cur = 0, hedef = 0, u = 1, bek = 0, oyna = !RM, tur = 1, last = '';
    const ara = (k, a, b, f) => { const p = A[k][a], q = A[k][b]; return [lerp(p[0], q[0], f), lerp(p[1], q[1], f), lerp(p[2], q[2], f)]; };
    const ciz = () => {
      const f = ease(u), P = {};
      Object.keys(A).forEach((k) => { P[k] = ara(k, cur, hedef, f); const g = at[k]; g.setAttribute('transform', `translate(${P[k][0].toFixed(1)},${P[k][1].toFixed(1)})`); g.setAttribute('opacity', P[k][2].toFixed(2)); });
      P.ZN = [ZN[0], ZN[1], 1]; P.HIS = [HIS[0], HIS[1], 1];
      const st = (arr) => lerp(arr[cur], arr[hedef], f);
      BAG.forEach((b, i) => {
        const p = P[b[0]], q = P[b[1]], l = bgl[i];
        l.setAttribute('x1', p[0].toFixed(1)); l.setAttribute('y1', p[1].toFixed(1)); l.setAttribute('x2', q[0].toFixed(1)); l.setAttribute('y2', q[1].toFixed(1));
        l.setAttribute('opacity', (st(b[2]) * Math.min(p[2], q[2])).toFixed(2));
      });
      ETK.forEach((e, i) => { const p = P[e[1]]; etl[i].setAttribute('x', (p[0] + e[2]).toFixed(1)); etl[i].setAttribute('y', (p[1] + e[3]).toFixed(1)); etl[i].setAttribute('opacity', (st(e[4]) * p[2]).toFixed(2)); });
      glow.setAttribute('cx', P.Ow[0].toFixed(1)); glow.setAttribute('cy', P.Ow[1].toFixed(1)); glow.setAttribute('opacity', (st([0, 0, 1, 1, 0, 0]) * 0.9).toFixed(2));
      hisp.setAttribute('opacity', st([0, 0, 1, 1, 1, 0]).toFixed(2));
      const gor = u >= 1 ? hedef : (f < 0.5 ? cur : hedef);
      chips.forEach((c, i) => c.setAttribute('aria-pressed', String(i === gor)));
      nO.textContent = tur + '. döngü';
      if (u >= 1) {
        const c = yon > 0 ? ILERI[hedef] : TERS[hedef];
        if (c !== last) { cap.innerHTML = REF(c); last = c; }
      }
    };
    const adimAt = (dir, sayac) => {
      // dir: durum numarası yönünde +1 ya da −1; uçlarda döngü sarılır (durum 5 ≡ durum 0)
      if (u < 1) { cur = hedef; u = 1; }
      let s = hedef, t = s + dir;
      if (t > 5) { s = 0; t = 1; if (sayac) tur++; }
      if (t < 0) { s = 5; t = 4; if (sayac) tur++; }
      cur = s; hedef = t; u = RM ? 1 : 0; bek = 0;
    };
    const git = (s) => { cur = hedef = s; u = 1; bek = 0; ciz(); };
    const syncBtn = () => { oyn.textContent = oyna ? 'Duraklat' : 'Oynat'; };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const yb = e.target.closest('[data-y]');
      if (yb) {
        yon = +yb.dataset.y; el.querySelectorAll('[data-y]').forEach((b) => b.setAttribute('aria-pressed', String(b === yb)));
        tur = 1; last = ''; git(yon > 0 ? 0 : 5); return;
      }
      const sb = e.target.closest('[data-s]'); if (sb) { oyna = false; syncBtn(); git(+sb.dataset.s); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'oyn') { oyna = !oyna; syncBtn(); bek = HOLD; }
      if (a.dataset.a === 'ileri') { oyna = false; syncBtn(); adimAt(yon, true); ciz(); }
      if (a.dataset.a === 'geri') { oyna = false; syncBtn(); adimAt(-yon, false); ciz(); }
    });
    git(0); syncBtn();
    const dur = ticker(el, (dt) => {
      if (u < 1) { u = Math.min(1, u + dt / MOVE); ciz(); return; }
      if (!oyna) return;
      bek += dt;
      if (bek >= HOLD) { adimAt(yon, true); ciz(); }
    });
    return () => { dur(); window.removeEventListener('resize', vb); };
  };

  /* ---------- 4 · Enzim sınıfları ---------- */
  VIZ.f05_sinif = (el) => {
    // öğe: [tür, etiket, x0, y0, x1, y1, op0, op1, genişlik, konum penceresi, opaklık penceresi]
    const m = (lbl, x0, y0, x1, y1, o0, o1, w, pw = [0, 1], ow = [0, 1], tur = 'm') => ({ tur, lbl, x0, y0, x1, y1, o0, o1, w, pw, ow });
    const d = (lbl, x0, y0, x1, y1, o0, o1, pw, ow) => m(lbl, x0, y0, x1, y1, o0, o1, 0, pw, ow, 'd');
    const FADE = [0.6, 0.85];
    const S = [
      { ad: 'Oksidoredüktazlar', ec: 1, tanim: 'Oksidasyon ve redüksiyon (redoks) tepkimelerini katalizler.', ornek: 'Etanol + NAD⁺ → asetaldehit + NADH + H⁺', oe: 'alkol dehidrogenaz; NAD⁺ hidrür (H⁻) iyonunu kabul eder [[K1 s. 19]]', bu: 'sitokrom P450, monoamin oksidaz (MAO), alkol dehidrogenaz, süperoksit dismutaz',
        it: [m('Etanol', 80, 62, 80, 62, 1, 0, 84, [0, 1], FADE), m('Asetaldehit', 80, 62, 80, 62, 0, 1, 104, [0, 1], FADE), m('NAD⁺', 272, 62, 272, 62, 1, 0, 66, [0, 1], FADE), m('NADH', 272, 62, 272, 62, 0, 1, 66, [0, 1], FADE), d('H⁻', 118, 36, 250, 36, 1, 0, [0.05, 0.55], [0.6, 0.8]), d('H⁺', 100, 92, 176, 104, 0, 1, [0.3, 0.8], [0.3, 0.5])] },
      { ad: 'Transferazlar', ec: 2, tanim: 'Fonksiyonel grupları bir molekülden diğerine aktarır; örneğin bir kinaz fosfat grubu aktarır.', ornek: 'Glukoz + ATP → glukoz-6-fosfat + ADP', oe: 'hekzokinaz (Mg²⁺ ile) [[K1 s. 19]]', bu: 'kinazlar (hekzokinaz, fosfofruktokinaz), COMT (metil grubu aktarır)',
        it: [m('Glukoz', 80, 62, 80, 62, 1, 0, 80, [0, 1], FADE), m('Glukoz-6-P', 80, 62, 80, 62, 0, 1, 104, [0, 1], FADE), m('ATP', 272, 62, 272, 62, 1, 0, 58, [0, 1], FADE), m('ADP', 272, 62, 272, 62, 0, 1, 58, [0, 1], FADE), d('P', 294, 38, 128, 38, 1, 1, [0.05, 0.6], [0, 1])] },
      { ad: 'Hidrolazlar', ec: 3, tanim: 'Hidroliz tepkimelerini katalizler: bir bağı suyun katılmasıyla koparır.', ornek: 'Asetilkolin + H₂O → asetat + kolin', oe: 'asetilkolinesteraz [[K1 s. 20]]', bu: 'asetilkolinesteraz, psödokolinesteraz, remifentanili ve esmololü yıkan esterazlar',
        it: [m('Asetil', 146, 62, 84, 62, 1, 0, 64, [0.3, 0.8], FADE), m('Asetat', 146, 62, 84, 62, 0, 1, 64, [0.3, 0.8], FADE), m('Kolin', 212, 62, 276, 62, 1, 1, 64, [0.3, 0.8], [0, 1]), m('ester bağı', 179, 30, 179, 30, 1, 0, 0, [0, 1], [0.1, 0.3], 't'), d('H₂O', 179, 104, 179, 104, 1, 0, [0, 1], [0.22, 0.4]), d('OH', 179, 104, 118, 38, 0, 1, [0.3, 0.8], [0.22, 0.4]), d('H', 179, 104, 244, 38, 0, 1, [0.3, 0.8], [0.22, 0.4])] },
      { ad: 'Liyazlar', ec: 4, tanim: 'Bağları hidroliz ve oksidasyon dışındaki yollarla koparır.', ornek: 'H₂CO₃ → CO₂ + H₂O', oe: 'karbonik anhidraz; su eklenmez, yükseltgenme olmaz', bu: 'karbonik anhidraz',
        it: [m('H₂CO₃', 180, 62, 180, 62, 1, 0, 80, [0, 1], [0.15, 0.4]), m('CO₂', 180, 62, 96, 62, 0, 1, 62, [0.15, 0.75], [0.15, 0.4]), m('H₂O', 180, 62, 264, 62, 0, 1, 62, [0.15, 0.75], [0.15, 0.4])] },
      { ad: 'İzomerazlar', ec: 5, tanim: 'Bir molekülün izomerleri arasında dönüşümünü sağlar.', ornek: 'Glukoz-6-fosfat ⇌ fruktoz-6-fosfat', oe: 'glukoz-6-fosfat izomeraz (glikolizin ikinci basamağı)', bu: 'bu bölümde örnek yok',
        it: [m('6', 180, 54, 180, 54, 1, 0, 0, [0, 1], [0.35, 0.65], 'p6'), m('5', 180, 54, 180, 54, 0, 1, 0, [0, 1], [0.35, 0.65], 'p5'), m('Glukoz-6-P', 180, 108, 180, 108, 1, 0, 110, [0, 1], [0.35, 0.65]), m('Fruktoz-6-P', 180, 108, 180, 108, 0, 1, 110, [0, 1], [0.35, 0.65])] },
      { ad: 'Ligazlar', ec: 6, tanim: 'ATP hidrolizinden gelen enerjiyle iki molekülü kovalent bağla birleştirir.', ornek: 'Asetil-CoA + HCO₃⁻ + ATP → malonil-CoA + ADP + Pᵢ', oe: 'asetil-CoA karboksilaz; kitapta koenzim A kullanan enzim örneği [[K1 s. 19]]', bu: 'asetil-CoA karboksilaz',
        it: [m('Asetil-CoA', 70, 46, 146, 46, 1, 0, 96, [0.25, 0.65], [0.65, 0.85]), m('HCO₃⁻', 292, 46, 222, 46, 1, 0, 62, [0.25, 0.65], [0.65, 0.85]), m('Malonil-CoA', 180, 46, 180, 46, 0, 1, 114, [0, 1], [0.65, 0.85]), m('ATP', 180, 104, 180, 104, 1, 0, 58, [0, 1], [0.1, 0.35]), m('ADP + Pᵢ', 180, 104, 180, 104, 0, 1, 88, [0, 1], [0.1, 0.35])] },
      { ad: 'Translokazlar', ec: 7, atlas: true, tanim: 'İyonların ya da moleküllerin zarlar boyunca taşınmasını katalizler. Kitapta yoktur; IUBMB 2018\'de yedinci sınıf olarak ekledi.', ornek: '3 Na⁺ hücreden dışarı, 2 K⁺ hücreye; ATP → ADP + Pᵢ', oe: 'Na⁺/K⁺-ATPaz', bu: 'bu bölümde örnek yok (Na⁺/K⁺-ATPaz Bölüm 4\'te geçer)',
        it: [m('', 180, 54, 180, 54, 1, 1, 0, [0, 1], [0, 1], 'zar'), m('hücre içi', 16, 16, 16, 16, 1, 1, 0, [0, 1], [0, 1], 'ts'), m('hücre dışı', 344, 16, 344, 16, 1, 1, 0, [0, 1], [0, 1], 'te'),
          d('Na⁺', 112, 28, 250, 28, 1, 1, [0.1, 0.7], [0, 1]), d('Na⁺', 92, 56, 270, 56, 1, 1, [0.15, 0.75], [0, 1]), d('Na⁺', 112, 84, 250, 84, 1, 1, [0.2, 0.8], [0, 1]), d('K⁺', 262, 42, 98, 42, 1, 1, [0.2, 0.8], [0, 1]), d('K⁺', 262, 70, 98, 70, 1, 1, [0.25, 0.85], [0, 1]),
          m('ATP', 80, 112, 80, 112, 1, 0, 58, [0, 1], [0.1, 0.35]), m('ADP + Pᵢ', 80, 112, 80, 112, 0, 1, 88, [0, 1], [0.1, 0.35])] },
    ];
    el.innerHTML = `<div class="f05-sn">
        <div class="f05-sn-grid">${S.map((s, i) => `<button type="button" data-i="${i}" class="${s.atlas ? 'atlas' : ''}" aria-pressed="false"><span class="ec">EC ${s.ec}${s.atlas ? ' · Atlas notu' : ''}</span><b>${s.ad}</b></button>`).join('')}</div>
        <div class="f05-sn-sahne">
          <svg class="f05-sn-svg" viewBox="0 0 360 130" role="img" aria-label="Seçilen enzim sınıfının şematik tepkimesi"></svg>
          <p class="f05-sn-eq"></p>
        </div>
      </div>
      <div class="f05-sn-det card" aria-live="polite"></div>
      <p class="viz-foot">${REF('Sınıf tanımları kitaptandır [[K1 s. 19]]. Örnek tepkimeler ve "bu bölümdeki enzimler" eşleştirmesi atlas notudur (IUBMB sınıflamasına göre). Şekiller şematiktir; moleküllerin gerçek yapısını göstermez.')}</p>`;
    const svg = el.querySelector('.f05-sn-svg'), eq = el.querySelector('.f05-sn-eq'), det = el.querySelector('.f05-sn-det'), btns = [...el.querySelectorAll('.f05-sn-grid button')];
    const poli = (n, r) => Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return (r * Math.cos(a)).toFixed(1) + ',' + (r * Math.sin(a)).toFixed(1); }).join(' ');
    let sec = 0, t = 0, oto = !RM, otoT = 0, els = [];
    const kur = (i) => {
      sec = i; t = 0;
      const s = S[i];
      btns.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
      svg.innerHTML = s.it.map((q) => {
        if (q.tur === 'm') { const w = Math.max(q.w, q.lbl.length * 8.2 + 22); return `<g class="f05-m"><rect x="${-w / 2}" y="-14" width="${w}" height="28" rx="14"/><text text-anchor="middle" y="5">${q.lbl}</text></g>`; }
        if (q.tur === 'd') return `<g class="f05-d"><circle r="${q.lbl.length > 2 ? 15 : 12}"/><text text-anchor="middle" y="4.5">${q.lbl}</text></g>`;
        if (q.tur === 'p6' || q.tur === 'p5') return `<g class="f05-pl"><polygon points="${poli(q.tur === 'p6' ? 6 : 5, 30)}"/><text text-anchor="middle" y="5">${q.tur === 'p6' ? 'piranoz' : 'furanoz'}</text></g>`;
        if (q.tur === 'zar') return '<g class="f05-zar"><rect x="-13" y="-48" width="26" height="96" rx="6"/></g>';
        if (q.tur === 't' || q.tur === 'ts' || q.tur === 'te') return `<g><text class="f05-sn-t" text-anchor="${q.tur === 'ts' ? 'start' : q.tur === 'te' ? 'end' : 'middle'}">${q.lbl}</text></g>`;
        return '<g></g>';
      }).join('');
      els = [...svg.children];
      eq.innerHTML = `<b>${esc(s.ornek)}</b>`;
      det.innerHTML = `<span class="tag ${s.atlas ? 'warn' : 'basic'}">EC ${s.ec}${s.atlas ? ' · Atlas notu' : ''}</span><h3 style="margin-top:8px">${s.ad}</h3><p>${REF(s.tanim + (s.atlas ? '' : ' [[K1 s. 19]]'))}</p><p class="small" style="margin-top:8px"><b>Örnek tepkime (atlas):</b> ${REF(s.ornek + ' · ' + s.oe)}</p><p class="small" style="margin-top:6px"><b>Bu bölümdeki enzimlerden (Atlas notu):</b> ${esc(s.bu)}.</p>`;
      ciz();
    };
    const ciz = () => {
      const s = S[sec], CYC = 4.4, tt = t % CYC, f = RM ? 1 : clamp((tt - 0.7) / 2.0, 0, 1);
      s.it.forEach((q, i) => {
        const pf = ease(clamp((f - q.pw[0]) / (q.pw[1] - q.pw[0]), 0, 1)), of = ease(clamp((f - q.ow[0]) / (q.ow[1] - q.ow[0]), 0, 1));
        const x = lerp(q.x0, q.x1, pf), y = lerp(q.y0, q.y1, pf), sc = q.tur === 'p6' ? lerp(1, 0.7, of) : q.tur === 'p5' ? lerp(0.7, 1, of) : 1;
        els[i].setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${sc.toFixed(3)})`);
        els[i].setAttribute('opacity', lerp(q.o0, q.o1, of).toFixed(2));
      });
    };
    el.addEventListener('click', (e) => { if (e.target.closest('.ref')) return; const b = e.target.closest('.f05-sn-grid button'); if (b) { oto = false; kur(+b.dataset.i); } });
    kur(0);
    return ticker(el, (dt) => {
      if (RM) return;
      t += dt;
      if (oto) { otoT += dt; if (otoT > 8.8) { otoT = 0; kur((sec + 1) % S.length); return; } }
      ciz();
    });
  };

  /* ---------- 5 · Kolinesterazlar: AChE ve neostigmin · psödokolinesteraz ve süksametonyum ---------- */
  VIZ.f05_kolin = (el) => {
    const RX = [60, 112, 164, 216, 268, 320], EX = [86, 138, 190, 242, 294], RY = 190, EY = 160;
    const KA = 0.3, KB = 1 / 6, KD = 0.15, PULS = 1.6;
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Görünüm"><button type="button" data-g="nmk" aria-pressed="true">Kavşak: AChE ve neostigmin</button><button type="button" data-g="pl" aria-pressed="false">Plazma: psödokolinesteraz</button></div></div>
      <div class="f05-ko" data-p="nmk">
        <svg class="f05-ko-svg" viewBox="0 0 380 250" role="img" aria-label="Nöromüsküler kavşak: ACh salınımı, asetilkolinesteraz, nikotinik reseptörler ve kompetitif kas gevşetici">
          <rect class="f05-sinir" x="26" y="6" width="328" height="60" rx="20"/>
          <text class="f05-ko-l b" x="42" y="30">motor sinir ucu</text>
          ${[206, 248, 290, 332].map((x) => `<circle class="f05-vez" cx="${x}" cy="38" r="10"/>`).join('')}
          <text class="f05-ko-l m" x="372" y="122" text-anchor="end">sinaptik aralık</text>
          <rect class="f05-kas" x="14" y="${RY}" width="352" height="56"/>
          <text class="f05-ko-l r" x="26" y="236">kas zarı · motor son plak</text>
          ${RX.map((x) => `<path class="f05-res" d="M${x - 13} ${RY - 16}V${RY}H${x + 13}V${RY - 16}"/>`).join('')}
          <g class="f05-slot">${RX.map((x) => `<g transform="translate(${x},${RY - 7})"><circle class="sa" r="6"/><rect class="sb" x="-6" y="-6" width="12" height="12" transform="rotate(45)"/></g>`).join('')}</g>
          <g class="f05-ache">${EX.map((x) => `<g transform="translate(${x},${EY})"><path class="pc" d="M0 0L11 -6A12.5 12.5 0 1 0 11 6Z"/><rect class="neo" x="2" y="-4" width="8" height="8" rx="1.5"/></g>`).join('')}</g>
          <g class="f05-ach"></g><g class="f05-ndm"></g>
        </svg>
        <div class="f05-ko-yan">
          <div class="btn-row"><button type="button" class="btn ghost f05-tg" data-t="nd" aria-pressed="false">Nondepolarizan gevşetici</button><button type="button" class="btn ghost f05-tg" data-t="neo" aria-pressed="false">Neostigmin</button></div>
          <div class="f05-key" style="margin-top:12px"><span><i class="ka"></i>ACh</span><span><i class="kb"></i>gevşetici</span><span><i class="ke"></i>AChE</span><span><i class="kn"></i>neostigmin</span></div>
          <div class="f05-ko-bar"><span>ACh'nin tuttuğu reseptörler</span><span class="trk"><i class="a"></i></span><b data-o="a">%0</b></div>
          <div class="f05-ko-bar"><span>gevşeticinin tuttuğu reseptörler</span><span class="trk"><i class="b"></i></span><b data-o="b">%0</b></div>
          <div class="f05-ko-bar"><span>aralıktaki ACh (göreli)</span><span class="trk"><i class="c"></i></span><b data-o="c"></b></div>
        </div>
      </div>
      <div class="f05-ko" data-p="pl" hidden>
        <svg class="f05-pl-svg" viewBox="0 0 380 216" role="img" aria-label="Süksametonyumun plazma düzeyi: psödokolinesteraz etkinliği azaldıkça düzey blok eşiğinin üstünde daha uzun kalır">
          <rect class="f05-ch-bg" x="46" y="12" width="320" height="150" rx="6"/>
          <line class="f05-esik" x1="46" x2="366"/><text class="f05-ax f05-esik-t" x="40" text-anchor="end">eşik</text>
          <path class="f05-pl-n"/><path class="f05-pl-c"/><circle class="f05-pl-p" r="5.5"/>
          <text class="f05-ax" x="40" y="168" text-anchor="end">0</text>
          <text class="f05-ax" x="18" y="90" text-anchor="middle" transform="rotate(-90 18 90)">plazma düzeyi</text>
          <text class="f05-ax" x="48" y="182">normal etkinlikte blok</text><line class="f05-sure n" y1="188" y2="188" x1="46"/>
          <text class="f05-ax f05-sure-t" x="48" y="203"></text><line class="f05-sure c" y1="209" y2="209" x1="46"/>
          <text class="f05-ax" x="366" y="176" text-anchor="end">zaman →</text>
        </svg>
        <div class="f05-ko-yan">
          <label class="f05-rng"><span>Psödokolinesteraz etkinliği <b data-o="pk">%100</b></span><input type="range" min="5" max="100" step="5" value="100" data-r="pk"></label>
          <div class="f05-durum" data-o="du"></div>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot" data-o="foot"></p>`;
    const $ = (s) => el.querySelector(s);
    const cap = $('.viz-cap'), foot = $('[data-o="foot"]'), achG = $('.f05-ach'), ndG = $('.f05-ndm');
    const slotA = [...el.querySelectorAll('.f05-slot .sa')], slotB = [...el.querySelectorAll('.f05-slot .sb')], ache = [...el.querySelectorAll('.f05-ache > g')];
    const O = {}; el.querySelectorAll('[data-o]').forEach((b) => { O[b.dataset.o] = b; });
    const bars = { a: $('.f05-ko-bar .a'), b: $('.f05-ko-bar .b'), c: $('.f05-ko-bar .c') };
    let gor = 'nmk', nd = false, neo = false, A = 0, B = 0, tp = 0, tA = 0, tB = 0, slot = RX.map(() => 0), par = [], ndp = [], last = '', pk = 1, pt = 0;
    const kh = () => (neo ? 0.05 : 2.5);
    // görsel ACh tanecikleri
    const MAXP = 34;
    achG.innerHTML = Array.from({ length: MAXP }, () => '<circle r="3.6"/>').join('');
    ndG.innerHTML = Array.from({ length: 5 }, () => '<rect x="-5" y="-5" width="10" height="10" transform="rotate(45)"/>').join('');
    const achC = [...achG.children], ndC = [...ndG.children];
    const yeniP = (ust) => ({ x: lerp(60, 320, Math.random()), y: ust ? 70 : lerp(76, 170, Math.random()), vx: (Math.random() - 0.5) * 30, vy: ust ? 40 + Math.random() * 30 : (Math.random() - 0.5) * 30, o: 1, olu: false });
    for (let i = 0; i < 5; i++) ndp.push(yeniP(false));
    const kararli = () => { const per = PULS, k = kh() + KD; return (1 / per) / k; }; // ortalama ACh (RM için)
    const nmkCiz = () => {
      const den = 1 + A / KA + B / KB, thA = A / KA / den, thB = B / KB / den;
      tA += (thA - tA) * 0.25; tB += (thB - tB) * 0.25;
      // reseptör yuvaları
      const nA = Math.round(tA * 6), nB = Math.min(6 - nA, Math.round(tB * 6));
      const sayA = slot.filter((v) => v === 1).length, sayB = slot.filter((v) => v === 2).length;
      const bos = () => slot.map((v, i) => (v === 0 ? i : -1)).filter((i) => i >= 0);
      const sec = (arr) => arr[Math.floor(Math.random() * arr.length)];
      if (sayA > nA) slot[sec(slot.map((v, i) => (v === 1 ? i : -1)).filter((i) => i >= 0))] = 0;
      if (sayB > nB) slot[sec(slot.map((v, i) => (v === 2 ? i : -1)).filter((i) => i >= 0))] = 0;
      if (slot.filter((v) => v === 2).length < nB && bos().length) slot[sec(bos())] = 2;
      if (slot.filter((v) => v === 1).length < nA && bos().length) slot[sec(bos())] = 1;
      slot.forEach((v, i) => { slotA[i].setAttribute('opacity', v === 1 ? 1 : 0); slotB[i].setAttribute('opacity', v === 2 ? 1 : 0); });
      ache.forEach((g) => g.classList.toggle('inh', neo));
      achC.forEach((c, i) => { const p = par[i]; if (!p) { c.setAttribute('opacity', 0); return; } c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('opacity', p.o.toFixed(2)); });
      ndC.forEach((c, i) => { const p = ndp[i]; c.setAttribute('transform', `translate(${p.x.toFixed(1)},${p.y.toFixed(1)}) rotate(45)`); c.setAttribute('opacity', (B * 0.95).toFixed(2)); });
      O.a.textContent = '%' + pct(tA); O.b.textContent = '%' + pct(tB); bars.a.style.width = pct(tA) + '%'; bars.b.style.width = pct(tB) + '%';
      const cr = clamp(A / 4, 0, 1); bars.c.style.width = (cr * 100).toFixed(0) + '%'; O.c.textContent = cr > 0.66 ? 'yüksek' : cr > 0.25 ? 'orta' : 'düşük';
      let c;
      if (!nd && !neo) c = '<b>Normal ileti.</b> Sinir ucundan salınan ACh reseptörlere bağlanır; sinaptik aralıktaki AChE onu hızla hidrolize eder ve iletim sonlanır. [[K1 s. 20]]';
      else if (!nd && neo) c = '<b>Neostigmin, gevşetici yok.</b> AChE inhibe olduğu için ACh aralıkta birikir ve reseptörleri daha uzun süre tutar. [[K1 s. 20]]';
      else if (nd && !neo) c = '<b>Nondepolarizan blok.</b> Gevşetici reseptörlerin çoğunu tutuyor; salınan ACh az sayıda reseptöre ulaşabiliyor ve AChE onu hızla yıkıyor. [[K1 s. 20]]';
      else c = '<b>Neostigminle geri çevirme.</b> Neostigmin AChE\'yi geri dönüşümlü olarak inhibe eder; aralıktaki ACh artar ve nondepolarizan gevşeticiyi reseptörlerinden kompetitif olarak uzaklaştırır. [[K1 s. 20]]';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    const nmkAdim = (dt) => {
      tp += dt;
      if (tp >= PULS) { tp -= PULS; A += 1; const k = Math.min(12, MAXP - par.length); for (let i = 0; i < k; i++) par.push(yeniP(true)); }
      A -= A * (kh() + KD) * dt; B += ((nd ? 1 : 0) - B) * (1 - Math.exp(-dt / 1.2));
      const hedef = Math.round(clamp(A, 0, 4.8) * 7);
      // fazla tanecikleri AChE yanında "yık"
      let fazla = par.filter((p) => !p.olu).length - hedef;
      if (fazla > 0) {
        const aday = par.filter((p) => !p.olu).map((p) => ({ p, dd: neo ? Math.random() : Math.min(...EX.map((x) => Math.hypot(p.x - x, p.y - EY))) })).sort((a, b) => a.dd - b.dd);
        for (let i = 0; i < fazla && i < aday.length; i++) aday[i].p.olu = true;
      }
      par.forEach((p) => {
        p.vx += (Math.random() - 0.5) * 160 * dt; p.vy += (Math.random() - 0.5) * 160 * dt + 18 * dt;
        p.vx *= 0.96; p.vy *= 0.96; p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.y < 72) { p.y = 72; p.vy = Math.abs(p.vy); } if (p.y > RY - 20) { p.y = RY - 20; p.vy = -Math.abs(p.vy); }
        if (p.x < 22) { p.x = 22; p.vx = Math.abs(p.vx); } if (p.x > 358) { p.x = 358; p.vx = -Math.abs(p.vx); }
        if (p.olu) p.o -= dt * 4;
      });
      par = par.filter((p) => p.o > 0);
      ndp.forEach((p) => { p.vx += (Math.random() - 0.5) * 90 * dt; p.vy += (Math.random() - 0.5) * 90 * dt; p.vx *= 0.95; p.vy *= 0.95; p.x = clamp(p.x + p.vx * dt, 30, 350); p.y = clamp(p.y + p.vy * dt, 84, 150); });
    };
    // plazma görünümü
    const X0 = 46, X1 = 366, YT = 24, YB = 162, C0 = 10, ESIK = 1, K = Math.LN10; // normalde süre = 1 birim
    const Yc = (c) => YB - (c / C0) * (YB - YT);
    const sure = (a) => Math.LN10 / (K * a);
    const plCiz = () => {
      const D = sure(pk), XM = Math.max(1.6, D * 1.25), X = (t) => X0 + (t / XM) * (X1 - X0);
      const yolu = (a) => { let s = ''; for (let i = 0; i <= 120; i++) { const t = (i / 120) * XM; s += (i ? 'L' : 'M') + X(t).toFixed(1) + ',' + Yc(C0 * Math.exp(-K * a * t)).toFixed(1); } return s; };
      $('.f05-pl-n').setAttribute('d', yolu(1)); $('.f05-pl-c').setAttribute('d', yolu(pk));
      const ye = Yc(ESIK); el.querySelector('.f05-esik').setAttribute('y1', ye); el.querySelector('.f05-esik').setAttribute('y2', ye); el.querySelector('.f05-esik-t').setAttribute('y', ye + 4);
      const sn = el.querySelector('.f05-sure.n'), sc = el.querySelector('.f05-sure.c'), st = el.querySelector('.f05-sure-t');
      sn.setAttribute('x2', X(1).toFixed(1)); sc.setAttribute('x2', X(D).toFixed(1));
      st.textContent = pk >= 0.999 ? 'bu hastada blok: normalle aynı' : 'bu hastada blok';
      const tc = RM ? D * 0.5 : Math.min(1, (pt % 7) / 6) * XM, cc = C0 * Math.exp(-K * pk * tc);
      const pp = el.querySelector('.f05-pl-p'); pp.setAttribute('cx', X(tc).toFixed(1)); pp.setAttribute('cy', Yc(cc).toFixed(1));
      O.pk.textContent = '%' + Math.round(pk * 100);
      O.du.innerHTML = cc > ESIK ? '<b class="f05-par">paralizi sürüyor</b>' : '<b class="f05-don">kas gücü dönüyor</b>';
      const c = pk >= 0.9 ? '<b>Normal psödokolinesteraz.</b> Plazma enzimi süksametonyumu (ve mivakuryumu) hızla yıkar; ilaç düzeyi blok eşiğinin altına çabuk iner, paralizi kısa sürer. [[K1 s. 20]]'
        : '<b>Etkinlik azalmış.</b> İlaç plazmada daha yavaş yıkılır, düzey eşiğin üstünde daha uzun kalır ve paralizi uzar. Enzimi olmayan ya da etkinliği azalmış hastalarda bu tabloya süksametonyum apnesi denir. [[K1 s. 20]]';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    const FOOT = {
      nmk: 'Şematik model (Atlas notu): kompetitif bağlanma; ACh\'nin yıkım hızı AChE etkinliğiyle orantılı; sayılar göreli. Mekanizma kitaptandır. [[K1 s. 20]]',
      pl: 'Şematik model (Atlas notu): plazma düzeyinin enzim etkinliğiyle orantılı bir hızla azaldığı varsayıldı; eksenler göreli, gerçek süre verilmez. Klinik tablo kitaptandır. [[K1 s. 20]]',
    };
    const goster = (g) => {
      gor = g; last = '';
      el.querySelectorAll('[data-g]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === g)));
      el.querySelectorAll('.f05-ko').forEach((p) => { p.hidden = p.dataset.p !== g; });
      foot.innerHTML = REF(FOOT[g]);
      if (g === 'pl') plCiz(); else nmkCiz();
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const g = e.target.closest('[data-g]'); if (g) { goster(g.dataset.g); return; }
      const t = e.target.closest('[data-t]'); if (!t) return;
      if (t.dataset.t === 'nd') nd = !nd; else neo = !neo;
      t.setAttribute('aria-pressed', String(t.dataset.t === 'nd' ? nd : neo));
      if (RM) { A = kararli() * 1.4; B = nd ? 1 : 0; tA = tB = 0; }
      nmkCiz();
    });
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r]'); if (!r) return; pk = +r.value / 100; pt = 0; plCiz(); });
    if (RM) A = kararli() * 1.4;
    goster('nmk');
    return ticker(el, (dt) => {
      if (gor === 'nmk') { if (!RM) nmkAdim(dt); nmkCiz(); }
      else { pt += dt; plCiz(); }
    });
  };

  /* ---------- 6 · Kofaktör ve koenzim: sınıflama ağacı (docs/tasarim/fiz05.md) ---------- */
  VIZ.f05_kofaktor = (el) => {
    const CAP = {
      prot: '<b>Yalnız protein.</b> Bazı enzimler yalnız proteinden oluşur ve tepkimeyi tek başına katalizler. [[K1 s. 19]]',
      kof: '<b>Kofaktör.</b> Diğer enzimler etkinlikleri için protein olmayan yardımcı moleküllere, kofaktörlere, gereksinim duyar. Kofaktör inorganik ya da organik olabilir. [[K1 s. 19]]',
      zn: '<b>Zn²⁺ · karbonik anhidraz.</b> Aktif bölgedeki çinkoya su bağlanır; histidin H⁺\'yı alınca çinkoda etkin OH⁻ kalır (yukarıdaki CA şekli). [[K1 s. 18–19]]',
      fe: '<b>Fe²⁺ · sitokrom P450.</b> Kitaba göre P450 grubundaki enzimlerin tümü demir içerir; bu süperaile anestezi ilaçlarının çoğunu metabolize eder. [[K1 s. 19–20]]',
      co: '<b>Co²⁺ · B₁₂ vitamini.</b> Kitabın listesinde B₁₂ vitamini kobalt içerir. [[K1 s. 19]]',
      cu: '<b>Cu²⁺ · süperoksit dismutaz.</b> Kitabın listesinde süperoksit dismutaz bakır içerir. [[K1 s. 19]]',
      mg: '<b>Mg²⁺ · hekzokinaz.</b> Kitabın listesinde hekzokinaz magnezyum içerir. [[K1 s. 19]]',
      coa: '<b>Koenzim A (CoA).</b> Birçok enzimin (ör. asetil-CoA karboksilaz) açil grubu aktarmak için kullandığı koenzim. [[K1 s. 19]]',
      nad: '<b>NAD⁺ (nikotinamid adenin dinükleotit).</b> Hidrür (H⁻) iyonu kabul eden koenzim; örneğin alkol dehidrogenazla birlikte kullanılır. [[K1 s. 19]]',
    };
    const ION = [['zn', 'Zn²⁺', ['karbonik', 'anhidraz']], ['fe', 'Fe²⁺', ['sitokrom', 'P450 grubu', '(tümü)']], ['co', 'Co²⁺', ['B₁₂', 'vitamini']], ['cu', 'Cu²⁺', ['süperoksit', 'dismutaz']], ['mg', 'Mg²⁺', ['hekzokinaz']]];
    const KO = [['coa', 'CoA (koenzim A)', 'açil grubu taşır', 'ör. asetil-CoA karboksilaz'], ['nad', 'NAD⁺', 'hidrür (H⁻) iyonu kabul eder', 'ör. alkol dehidrogenaz']];
    const INOR = ION.map((i) => i[0]).join(' '), ORG = 'coa nad', ALT = INOR + ' ' + ORG, HEPSI = 'prot kof ' + ALT;
    const RENK = { prot: '--c-basic', kof: '--accent', coa: '--c-clin', nad: '--c-clin' };
    ION.forEach((i) => { RENK[i[0]] = '--c-basic'; });
    const bt = (k, p) => `role="button" tabindex="0" aria-pressed="false" data-k="${k}" data-p="${p}"`;
    // protein lekesi (+ isteğe bağlı kofaktör dairesi) — cx, cy merkez
    const blob = (cx, cy, kof) => {
      const r = 17, n = 40, pts = [];
      for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, rr = r + 1.8 * Math.sin(3 * a) + 1.1 * Math.cos(5 * a); pts.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1)); }
      const nx = cx + 12, ny = cy - 12;
      return `<g class="f05-kf-blob"><polygon points="${pts.join(' ')}"/><circle class="f05-kf-centik" cx="${nx}" cy="${ny}" r="7.5"/>${kof ? `<circle class="f05-kf-kofd" cx="${nx}" cy="${ny}" r="5.5"/>` : ''}</g>`;
    };
    const ln = (d, p) => `<path class="f05-kf-ln" data-p="${p}" d="${d}"/>`;
    const kutu = (k, p, x, y, w, h, cls, baslik, alt, ikon) => `<g class="f05-kf-kt ${cls}" ${k ? bt(k, p) : `data-p="${p}"`}>
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${ikon || ''}
        <text class="f05-kf-b" x="${ikon ? x + 56 : x + w / 2}" y="${alt.length ? y + 23 : y + h / 2 + 5}" text-anchor="${ikon ? 'start' : 'middle'}">${baslik}</text>
        ${alt.map((s, i) => `<text class="f05-kf-s" x="${ikon ? x + 56 : x + w / 2}" y="${y + 41 + i * 14}" text-anchor="${ikon ? 'start' : 'middle'}">${s}</text>`).join('')}</g>`;
    const IX = [44, 122, 200, 278, 356];
    const svg = `<svg class="f05-kf-svg" viewBox="0 0 640 360" role="img" aria-label="Kofaktör sınıflaması: yalnız protein enzimler ve kofaktör gerektiren enzimler; inorganik metal iyonları Zn, Fe, Co, Cu, Mg ve organik koenzimler CoA ve NAD⁺">
      <defs><marker id="f05-kf-ok" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L8,4L0,8z" class="f05-kf-okuc"/></marker></defs>
      <g class="f05-kf-lns">
        ${ln('M320,50V60', HEPSI)}${ln('M320,60H126V70', 'prot')}${ln('M320,60H430V70', 'kof ' + ALT)}
        ${ln('M430,136V144', ALT)}${ln('M430,144H250V154', INOR)}${ln('M430,144H520V154', ORG)}
        ${ln('M250,206V216', INOR)}${IX.map((x, i) => ln(`M250,216H${x}V230`, ION[i][0])).join('')}
        ${ln('M520,206V214H418', ORG)}${ln('M418,214V253H430', 'coa')}${ln('M418,214V319H430', 'nad')}
      </g>
      ${kutu('', HEPSI, 262, 16, 116, 34, 'kok', 'Enzim', [])}
      ${kutu('prot', 'prot', 16, 70, 220, 66, 'prot', 'Yalnız protein', ['tepkimeyi tek başına', 'katalizler'], blob(44, 103, false))}
      ${kutu('kof', 'kof ' + ALT, 316, 70, 228, 66, 'kofk', 'Protein + kofaktör', ['protein olmayan yardımcı', 'molekül gerekir'], blob(344, 103, true))}
      ${kutu('', INOR, 150, 154, 200, 52, 'inor', 'İnorganik · metal iyonu', ['aktif bölgedeki metal'])}
      ${kutu('', ORG, 410, 154, 220, 52, 'org', 'Organik · koenzim', ['organik kofaktöre koenzim denir'])}
      ${ION.map(([k, ion, et], i) => `<g class="f05-kf-ion" ${bt(k, k)}><circle cx="${IX[i]}" cy="252" r="22"/><text class="f05-kf-iy" x="${IX[i]}" y="257" text-anchor="middle">${ion}</text>${et.map((s, j) => `<text class="f05-kf-s" x="${IX[i]}" y="${292 + j * 14}" text-anchor="middle">${s}</text>`).join('')}</g>`).join('')}
      ${KO.map(([k, ad, a1, a2], i) => { const y = i ? 292 : 226; return `<g class="f05-kf-ko" ${bt(k, k)}><rect x="430" y="${y}" width="202" height="54" rx="10"/>
        <text class="f05-kf-b" x="440" y="${y + 19}">${ad}</text><text class="f05-kf-s" x="440" y="${y + 35}">${a1}</text><text class="f05-kf-s" x="440" y="${y + 48}">${a2}</text>
        ${i ? `<text class="f05-kf-ik" x="532" y="${y + 19}">H⁻</text><path class="f05-kf-oki" d="M549,${y + 15}H568" marker-end="url(#f05-kf-ok)"/><text class="f05-kf-ik" x="572" y="${y + 19}">NADH</text>`
            : `<circle class="f05-kf-e" cx="566" cy="${y + 15}" r="7"/><path class="f05-kf-oki" d="M575,${y + 15}H600" marker-end="url(#f05-kf-ok)"/><circle class="f05-kf-e" cx="611" cy="${y + 15}" r="7"/><text class="f05-kf-ik" x="588" y="${y + 5}" text-anchor="middle">açil</text>`}</g>`; }).join('')}
    </svg>`;
    const ikonH = (kof) => `<svg class="f05-kf-hi" viewBox="0 0 44 44" aria-hidden="true">${blob(22, 23, kof)}</svg>`;
    const dar = `<div class="f05-kf-dar">
        <div class="f05-kf-nk" data-p="${HEPSI}">Enzim</div>
        <div class="f05-kf-n2">
          <div class="f05-kf-nb prot" ${bt('prot', 'prot')}>${ikonH(false)}<span><b>Yalnız protein</b><small>tepkimeyi tek başına katalizler</small></span></div>
          <div class="f05-kf-nb kofk" ${bt('kof', 'kof ' + ALT)}>${ikonH(true)}<span><b>Protein + kofaktör</b><small>protein olmayan yardımcı molekül gerekir</small></span></div>
        </div>
        <div class="f05-kf-nd inor">
          <div class="f05-kf-nh" data-p="${INOR}"><b>İnorganik · metal iyonu</b><small>aktif bölgedeki metal</small></div>
          <div class="f05-kf-ng">${ION.map(([k, ion, et]) => `<div class="f05-kf-ni" ${bt(k, k)}><i>${ion}</i><small>${et.join(' ')}</small></div>`).join('')}</div>
        </div>
        <div class="f05-kf-nd org">
          <div class="f05-kf-nh" data-p="${ORG}"><b>Organik · koenzim</b><small>organik kofaktöre koenzim denir</small></div>
          ${KO.map(([k, ad, a1, a2], i) => `<div class="f05-kf-nc" ${bt(k, k)}><b>${ad}<em>${i ? 'H⁻ → NADH' : 'açil →'}</em></b><small>${a1} · ${a2}</small></div>`).join('')}
        </div>
      </div>`;
    el.innerHTML = `<div class="f05-kf">${svg}${dar}</div><p class="viz-foot">${REF('Şematik çizim; kitaptaki listeyi gösterir [[K1 s. 19]]. İyon yüklerinin ve B₁₂\'nin listedeki yerinin düzeltmesi sayfadaki Atlas notunda.')}</p>`;
    const kok = el.querySelector('.f05-kf'), viz = el.closest('.viz'), cap = viz && viz.querySelector('.viz-cap'), cap0 = cap ? cap.innerHTML : '';
    let sec = null;
    const uygula = () => {
      kok.classList.toggle('sec', !!sec);
      if (sec) kok.style.setProperty('--kf-c', `var(${RENK[sec]})`); else kok.style.removeProperty('--kf-c');
      kok.querySelectorAll('[data-p]').forEach((n) => {
        const on = !!sec && n.dataset.p.split(' ').includes(sec);
        n.classList.toggle('on', on);
        if (n.dataset.k) n.setAttribute('aria-pressed', String(n.dataset.k === sec));
        if (on && n.classList.contains('f05-kf-ln')) n.parentNode.appendChild(n);
      });
      if (cap) cap.innerHTML = sec ? REF(CAP[sec]) : cap0;
    };
    const sec_ = (k) => { sec = sec === k ? null : k; uygula(); };
    const tik = (e) => { if (e.target.closest('.ref')) return; const b = e.target.closest('[data-k]'); if (b && kok.contains(b)) sec_(b.dataset.k); };
    const tus = (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const b = e.target.closest('[data-k]'); if (b && kok.contains(b)) { e.preventDefault(); sec_(b.dataset.k); } };
    kok.addEventListener('click', tik); kok.addEventListener('keydown', tus);
    return () => { kok.removeEventListener('click', tik); kok.removeEventListener('keydown', tus); if (cap) cap.innerHTML = cap0; };
  };
})();
