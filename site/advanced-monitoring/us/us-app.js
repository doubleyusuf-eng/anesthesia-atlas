'use strict';
/* İleri Monitörizasyon Atlası · ultrason bölümü · Clarius uygulaması benzetimi (yatay tablet ekranı)
   Tek bir uygulama durumu hem 3B tabletin ekran dokusunu hem sayfadaki büyük tablet görünümünü besler.
   Mantıksal ekran 1200 × 800 px (3:2, yatay). Dokunma: pointer('down'|'move'|'up', x, y) mantıksal piksel.
   Ekran düzeni, simgeler ve renkler Clarius uygulamasının üreticinin yayımladığı ekran görüntüleri ve simge sözlüğüne
   göre çizilmiştir (App Store ekran görüntüleri, App 9 tanıtım animasyonları, "App Icon Definitions"):
   iPadOS durum çubuğu · başlık (çalışma sayfası simgesi, tarayıcı/ön ayar kutusu, MI/TIS/TIB, bağlantı, ısı, pil,
   Clarius Live) · siyah görüntü alanı (otomatik kazanç, turuncu C yön işareti, sağ kenarda derinlik noktaları)
   · alt çubuk (ölçüm araçları, mod menüsü, menüyü aç, turuncu dondur, cine kaydı, görüntü kaydı).
   Uygulama metinleri gerçek uygulamadaki gibi İngilizcedir. Görüntü USIM jel fantomundan üretilir; modların prob başına
   varlığı ve ön ayar adları üreticinin ürün sayfalarından alınmıştır (us-text.js kaynakçası). MI/TIS/TIB, ölçek ve
   PW Doppler hızları bu benzetimin örnek değerleridir. */
const USAPP = (() => {
  if (typeof USIM === 'undefined' || typeof USM === 'undefined' || !USM) return null;
  const W = 1200, H = 800, SBH = 26, HDR = 90, BOT = 86;
  const FS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  const C = {bar: '#272727', box: '#383838', boxLine: '#8C8C8C', ink: '#F2F2F2', dim: '#BDBDBD', mute: '#8A8A8A',
    or: '#F28B3B', orD: '#C96E2A', grn: '#58C23C', blue: '#3D6CF0', roi: '#D9D84A', row: '#303030', sel: '#3E9A3A', meas: '#7BE05E'};
  const D2R = Math.PI / 180, clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- Prob başına ön ayarlar (üretici ürün sayfalarındaki uygulama adları) ---------- */
  const PRESETS = {
    'clarius-l7': ['Nerve/Pain', 'Vascular', 'Shoulder', 'Knee', 'Spine', 'Breast'],
    'clarius-l15': ['Nerve/Pain', 'MSK', 'Hand/Wrist', 'Shoulder', 'Knee', 'Plastic Surgery'],
    'clarius-l20': ['Vascular', 'Dermatology', 'Aesthetics', 'Lips'],
    'clarius-c3': ['Abdomen', 'Bladder', 'Cardiac', 'Lung', 'Obstetrics', 'Nerve/Pain', 'MSK'],
    'clarius-c7': ['Abdomen', 'Bladder', 'Cardiac', 'Lung', 'MSK', 'Small Organs'],
    'clarius-ec7': ['Early OB', 'Pelvic/GYN', 'Prostate', 'IVF'],
    'clarius-pa': ['Abdomen', 'Cardiac', 'eFAST', 'Lung', 'Bladder', 'Obstetrics'],
    'clarius-pal': ['Cardiac', 'Lung'],
    'clarius-pal-la': ['Vascular Access', 'DVT', 'Lung']
  };
  /* Ön ayarın başlangıç derinliği (mm; probun en fazla derinliğiyle sınırlanır) — benzetim değeri */
  const PDEPTH = {'Nerve/Pain': 35, Vascular: 30, 'Vascular Access': 30, DVT: 40, Shoulder: 40, Knee: 40, Spine: 50, Breast: 40, MSK: 40, 'Hand/Wrist': 20,
    'Plastic Surgery': 25, Dermatology: 10, Aesthetics: 15, Lips: 10, Abdomen: 160, Bladder: 120, Cardiac: 160, Lung: 60, Obstetrics: 140, 'Small Organs': 50,
    'Early OB': 80, 'Pelvic/GYN': 90, Prostate: 60, IVF: 80, eFAST: 160};
  /* Elastografi: L7 ve L15 ürün sayfalarında listelenir */
  const ELASTO = new Set(['clarius-l7', 'clarius-l15']);
  /* Uygulamadaki açıklama etiketleri (Annotations) */
  const LABELS = ['Nerve', 'Artery', 'Vein', 'Fascia', 'Bone', 'Needle Tip'];

  let T = {}, inst = null;

  function create() {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    const bc = document.createElement('canvas'); bc.width = W; bc.height = H - HDR - BOT;   /* canlı B görüntüsü */
    const snap = document.createElement('canvas'); snap.width = W / 2; snap.height = bc.height; /* bölünmüş ekranda bekleyen panel */
    const strip = document.createElement('canvas'); strip.width = W; strip.height = 300;      /* M-mod / PW şeridi */
    const sg = strip.getContext('2d');
    const scan = USIM.Scanner(bc, {geom: USM.GEOM['clarius-l7'], depth: 35, freq: 10, gain: 0, tgc: [0, 0, 0], bare: true, smooth: true, cx: .5, padT: .03, padB: .03, fillW: .9, interval: .07});

    /* Benzetim girdileri (sayfadaki "prob elinizde" denetimleri): görünüm, açı, bası, iğne */
    const sim = {view: 'short', angle: 15, press: 0, needle: false, adv: .7};
    const S = {
      probe: 'clarius-l7', side: 'pa', preset: 'Nerve/Pain', depth: 35, gain: 0, freq: 10, autoGain: true, tgc: [0, 0, 0], dr: 50,
      mode: 'B', ne: false, neSide: 1, compound: false, chroma: false, centerLine: false, drAdj: false, full: false,
      split: false, ap: 1, frozen: false, flip: false,
      tool: null, meas: [], pend: null, labels: [], pendLabel: null, menu: null, scanTab: 'apps',
      roi: {a0: .2, a1: .8, s0: .15, s1: .7}, mx: .5, gate: {x: .5, y: .5},
      shots: 0, clips: 0, rec: 0, flash: 0, toast: null, toastT: 0, last: -1, stripT: 0, lastPW: null,
      cine: 1, cinePlay: false, frozenAt: 0, cineDirty: false, hud: null, hudT: 0
    };
    const geomId = () => S.probe === 'clarius-pal' && S.side === 'la' ? 'clarius-pal-la' : S.probe;
    const spec = () => S.probe === 'clarius-pal' && S.side === 'la' ? {f: [5, 15], dmax: 7, name: 'PAL HD3', f0: 10, ne: true, sc: true} : USM.MODELS[S.probe];
    const isLin = () => USM.GEOM[geomId()].type === 'linear';
    const has = k => k === 'ne' ? !!spec().ne : k === 'EL' ? ELASTO.has(S.probe) && isLin() : k === 'SC' ? !!spec().sc : true;
    const tr = (k, f) => (T[k] ?? f ?? k);
    const fmt = (v, d = 1) => { const s = v.toFixed(d); return (typeof ICA !== 'undefined' && ICA.lang !== 'en') ? s.replace('.', ',') : s; };
    const fmtE = (v, d = 1) => v.toFixed(d);   /* uygulama içi sayılar (İngilizce arayüz) */
    const scannerName = () => `${USM.MODELS[S.probe].name.replace(/ HD3$/, '')} Scanner`;
    const gainPct = () => Math.round(50 + S.gain * 2.5);

    function setProbe(id, keepPreset) {
      if (!USM.MODELS[id]) return;
      S.probe = id; S.side = 'pa';
      if (!keepPreset) S.preset = PRESETS[geomId()][0];
      fixModes(); applyPreset(); S.meas = []; S.labels = [];
    }
    function fixModes() {
      if (S.mode === 'EL' && !has('EL')) S.mode = 'B';
      if (S.ne && !has('ne')) S.ne = false;
      if (S.compound && !has('SC')) S.compound = false;
    }
    function applyPreset() {
      const m = spec();
      S.depth = clamp(PDEPTH[S.preset] || (isLin() ? 35 : 120), 10, Math.min(m.dmax * 10, 160));
      if (S.preset === 'Lung' && !isLin()) S.depth = Math.min(m.dmax * 10, 120);
      S.freq = m.f0 || m.f[0]; S.gain = 0; S.tgc = [0, 0, 0]; S.dr = 50;
      S.roi = isLin() ? {a0: .2, a1: .8, s0: .15, s1: .7} : {a0: .3, a1: .7, s0: .05, s1: .55};
      resetStrip();
    }
    const toast = (s) => { S.toast = s; S.toastT = performance.now() / 1000; };
    const hud = (s) => { S.hud = s; S.hudT = performance.now() / 1000; };

    /* ---------- Poz: kısa eksen (damarlar kesitte) ya da uzun eksen (artere paralel, topuk–parmak açısı) ---------- */
    function pose() {
      const a = sim.angle * D2R;
      if (sim.view === 'long') {
        const ax = USIM.cyl(USIM.PH.artery, 0).x, f = S.flip ? -1 : 1;
        return {O: {x: ax, d: 0, z: 0}, L: {x: 0, d: 0, z: f}, Dn: {x: 0, d: 1, z: 0}, rot: Math.PI / 2, tilt: 0};
      }
      return USIM.pose(0, 0, S.flip ? Math.PI : 0, a, sim.press);
    }
    const incl = () => sim.view === 'long' ? Math.tan(sim.angle * D2R) : 0;
    /* Plan içi benzetim iğnesi (kısa eksende): Needle Enhance tarafından girer, dik açıyla sinire yönelir */
    function needle(P) {
      if (!sim.needle || sim.view !== 'short') return null;
      const side = S.ne ? S.neSide : 1, flipS = S.flip ? -1 : 1, hw = (USM.GEOM[geomId()].W || 38) / 2;
      const ex = side * flipS * (hw + 6), n = USIM.cyl(USIM.PH.nerve, 0);
      const E = {x: P.O.x + ex, d: 0, z: 0}, Tt = {x: n.x + side * flipS * 4.6, d: n.d - 1.2, z: 0};
      const dx = Tt.x - E.x, dd = Tt.d - E.d, L = Math.hypot(dx, dd);
      return {E, u: {x: dx / L, d: dd / L, z: 0}, L: L * clamp(sim.adv, .02, 1), r: .36, echo: 20};
    }

    /* ---------- Düzen ---------- */
    const IY0 = () => S.full ? 0 : HDR, IY1 = () => S.full ? H : H - BOT, IH = () => IY1() - IY0();
    const lower = () => S.mode === 'M' || S.mode === 'PW';
    const bH = () => lower() ? Math.round(IH() * .5) : IH();
    const paneW = () => S.split ? W / 2 : W;
    const paneX = () => S.split ? (S.ap ? W / 2 : 0) : 0;
    function sizeScanner() {
      const w = paneW(), h = bH();
      if (bc.width !== w || bc.height !== h) { bc.width = w; bc.height = h; scan.invalidate(); }
      if (snap.height !== IH()) { snap.height = IH(); }
    }
    /* Görüntü pikseli (B tuvali) ↔ düzlem mm */
    function px2mm(px, py) { const G = scan.geo, k = bc.width / G.W; return {X: (px / k - G.cx) / G.sc, Y: (py / k - G.top) / G.sc}; }
    function mm2px(X, Y) { const G = scan.geo, k = bc.width / G.W; return {x: (G.cx + X * G.sc) * k, y: (G.top + Y * G.sc) * k}; }
    function frac2mm(a, s) {
      const gm = USM.GEOM[geomId()];
      if (gm.type === 'linear') return {X: (a - .5) * gm.W, Y: s * S.depth};
      const th = (a - .5) * gm.fov * D2R, R = gm.type === 'convex' ? gm.R : 0, r = R + s * S.depth;
      return {X: r * Math.sin(th), Y: r * Math.cos(th) - R};
    }
    function mm2frac(X, Y) {
      const gm = USM.GEOM[geomId()];
      if (gm.type === 'linear') return {a: X / gm.W + .5, s: Y / S.depth};
      const R = gm.type === 'convex' ? gm.R : 0, th = Math.atan2(X, Y + R), r = Math.hypot(X, Y + R);
      return {a: th / (gm.fov * D2R) + .5, s: (r - R) / S.depth};
    }

    /* ---------- Tarayıcı seçenekleri ---------- */
    function syncScanner() {
      Object.assign(scan.o, {
        geom: USM.GEOM[geomId()], depth: S.depth, freq: S.freq, gain: S.gain, tgc: S.autoGain ? [0, 0, 0] : S.tgc, dr: S.dr,
        doppler: S.mode === 'CD', power: S.mode === 'PD', elasto: S.mode === 'EL', chroma: S.chroma && S.mode === 'B', compound: S.compound,
        roi: (S.mode === 'CD' || S.mode === 'PD' || S.mode === 'EL') ? S.roi : null,
        ne: S.ne ? {side: S.neSide * (S.flip ? -1 : 1), steer: .5} : null,
        padT: isLin() ? .03 : .02, fillW: S.split ? .94 : .9, cz: .5 * 7 / S.freq, nr: isLin() ? 150 : 170, cgain: 900
      });
      scan.frozen = S.frozen;
    }
    let lastKey = '';
    function maybeInvalidate() {
      const k = [geomId(), S.depth, bc.width, bc.height, S.split].join('|');
      if (k !== lastKey) { lastKey = k; scan.invalidate(); }
    }

    /* ---------- PW Doppler: kapıdaki hız (benzetim değerleri) ---------- */
    const HR = 7.5 / (2 * Math.PI) * 60; /* USIM nabzıyla aynı ritim ≈ 72/dk */
    function artWave(p) { /* periferik arter, üç fazlı: oranlar tepe hıza göre */
      if (p < .06) return p / .06; if (p < .2) return 1 - (p - .06) / .14 * 1.2; if (p < .3) return -.2 + (p - .2) / .1 * .3; if (p < .45) return .1 * (1 - (p - .3) / .15); return 0;
    }
    function gateInfo(P) {
      const pxp = {x: S.gate.x * bc.width, y: S.gate.y * bc.height}, mm = px2mm(pxp.x, pxp.y);
      const w = {x: P.O.x + P.L.x * mm.X + P.Dn.x * mm.Y, d: P.O.d + P.L.d * mm.X + P.Dn.d * mm.Y, z: P.O.z + P.L.z * mm.X + P.Dn.z * mm.Y};
      if (sim.press) w.d += sim.press * 2.6 * Math.exp(-w.d / 26);
      const gm = USM.GEOM[geomId()]; let bu = 0, bv = 1;
      if (gm.type !== 'linear') { const R = gm.type === 'convex' ? gm.R : 0, n = Math.hypot(mm.X, mm.Y + R) || 1; bu = mm.X / n; bv = (mm.Y + R) / n; }
      const beam = {x: P.L.x * bu + P.Dn.x * bv, d: P.L.d * bu + P.Dn.d * bv, z: P.L.z * bu + P.Dn.z * bv};
      const out = {vessel: null, v: 0, cos: 0, theta: 90, psv: 0, edv: 0, mm};
      const IN = incl(), chk = (s, r, k) => { const c = USIM.cyl(s, w.z, IN), dd = Math.hypot(w.x - c.x, w.d - c.d); return dd < r ? {k, q: dd / r, s} : null; };
      const vr = USIM.PH.vein.r * Math.max(.06, 1 - sim.press * .94);
      const hit = chk(USIM.PH.artery, USIM.PH.artery.r, 'artery') || (sim.press < .6 ? chk(USIM.PH.vein, vr, 'vein') : null);
      if (!hit) return out;
      const ax = {x: hit.s.sx, d: hit.s.sd + IN, z: 1}, an = Math.hypot(ax.x, ax.d, ax.z), dirF = hit.k === 'artery' ? 1 : -1;
      const cosB = (beam.x * ax.x + beam.d * ax.d + beam.z * ax.z) / an;
      out.vessel = hit.k; out.cos = Math.abs(cosB); out.theta = Math.acos(Math.min(1, out.cos)) / D2R;
      out.sign = -Math.sign(cosB || 1) * dirF;  /* + = probe doğru (taban çizgisinin üstü) */
      out.prof = 1 - hit.q * hit.q;
      out.psv = hit.k === 'artery' ? 75 * out.prof : 0; out.edv = 0; out.vmean = hit.k === 'vein' ? 16 * out.prof : 0;
      return out;
    }
    function velocityAt(gi, t) {
      if (!gi.vessel) return 0;
      if (gi.vessel === 'artery') { const p = ((t * 7.5 / (2 * Math.PI)) % 1 + 1) % 1; return gi.psv * artWave(p); }
      return gi.vmean * (1 + .3 * Math.sin(t * 1.6));
    }
    /* Spektrum ölçeği (cm/s): akım yönüne göre taban çizgisi kaydırılır */
    function pwScale(gi) {
      const top = gi.vessel === 'vein' ? 40 : 127, bot = gi.vessel === 'vein' ? 10 : 13;
      return (gi.sign || 1) > 0 ? {top, bot: -bot} : {top: bot, bot: -top};
    }

    /* ---------- M-mod / PW şeridi ---------- */
    function resetStrip() { sg.fillStyle = '#000'; sg.fillRect(0, 0, strip.width, strip.height); S.stripT = 0; }
    const SCROLL = 3, SPD = 170;
    function stepStrip(t, P) {
      if (S.frozen || !lower()) { S.stripT = 0; return; }
      if (!S.stripT || t - S.stripT > .5) { S.stripT = t; return; }
      const n = Math.min(60, Math.floor((t - S.stripT) * SPD / SCROLL)); if (n < 1) return;
      const t0 = S.stripT; S.stripT += n * SCROLL / SPD;
      const sw = strip.width, sh = strip.height, dx = n * SCROLL;
      sg.drawImage(strip, dx, 0, sw - dx, sh, 0, 0, sw - dx, sh);
      sg.fillStyle = '#000'; sg.fillRect(sw - dx, 0, dx, sh);
      if (S.mode === 'M') {
        const x = Math.round(S.mx * (bc.width - 1));
        sg.imageSmoothingEnabled = true;
        sg.drawImage(bc, x, 0, 1, bc.height, sw - dx, 0, dx, sh);
        return;
      }
      const gi = gateInfo(P); S.lastPW = gi;
      const sc = pwScale(gi), pxv = sh / (sc.top - sc.bot), base = sc.top * pxv;
      const sig = gi.vessel ? clamp((gi.cos - .08) * 3, 0, 1) : 0, img = sg.createImageData(dx, sh), D = img.data;
      for (let c = 0; c < n; c++) {
        const tc = t0 + (c + 1) * SCROLL / SPD, v = velocityAt(gi, tc) * (gi.sign || 1);
        for (let y = 0; y < sh; y++) {
          const vel = (base - y) / pxv; let a = .035 * Math.random();
          if (sig > 0) {
            /* Spektral genişleme: tepe hızın yaklaşık üçte birinden tepeye kadar, kenara doğru parlak */
            const inside = Math.abs(v) > 1.5 && (v >= 0 ? vel >= v * .3 && vel <= v : vel <= v * .3 && vel >= v);
            if (inside) a = (.5 + .5 * Math.random()) * sig * (.55 + .45 * Math.abs(vel / v));
            else if (Math.abs(vel) < 1.5) a = .3 * sig;
          }
          const g8 = Math.round(255 * clamp(a, 0, 1));
          for (let k = 0; k < SCROLL; k++) { const q = (y * dx + c * SCROLL + k) * 4; D[q] = D[q + 1] = D[q + 2] = g8; D[q + 3] = 255; }
        }
      }
      sg.putImageData(img, sw - dx, 0);
    }

    /* ---------- Çizim yardımcıları ---------- */
    const zones = [];
    const zone = (x, y, w, h, id, extra) => zones.push(Object.assign({x, y, w, h, id}, extra || {}));
    function rr(x, y, w, h, r, fill, stroke, lw = 1.5) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } }
    function txt(s, x, y, size, col, wt = 400, align = 'left') { g.font = `${wt} ${size}px ${FS}`; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); }
    const line = (x1, y1, x2, y2, col, lw = 2) => { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
    const dot = (x, y, r, col) => { g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); };

    /* ---------- Simgeler (üretici simge sözlüğündeki biçimlerin çizimi) ---------- */
    const I = {
      /* Mod menüsü: konveks sektör çerçevesi ve içinde mod kısaltması */
      sector(cx, cy, w, h, col, lab, lw = 2.2, fs = 13) {
        g.strokeStyle = col; g.lineWidth = lw; g.lineJoin = 'round'; g.beginPath();
        g.moveTo(cx - w * .26, cy - h * .5); g.quadraticCurveTo(cx, cy - h * .32, cx + w * .26, cy - h * .5);
        g.lineTo(cx + w * .5, cy + h * .14); g.quadraticCurveTo(cx, cy + h * .78, cx - w * .5, cy + h * .14); g.closePath(); g.stroke();
        if (lab) txt(lab, cx, cy + h * .1, fs, col, 700, 'center');
      },
      /* Ölçüm araçları: çapraz cetvel ve kalem */
      measure(cx, cy, col) {
        g.save(); g.translate(cx, cy); g.fillStyle = col;
        g.save(); g.rotate(-Math.PI / 4); g.fillRect(-19, -5, 38, 10); g.fillStyle = C.bar; for (let i = -14; i <= 14; i += 5) g.fillRect(i, -5, 1.6, i % 2 ? 4 : 6); g.restore();
        g.save(); g.rotate(Math.PI / 4); g.fillStyle = col; g.fillRect(-12, -4.5, 30, 9); g.beginPath(); g.moveTo(-12, -4.5); g.lineTo(-20, 0); g.lineTo(-12, 4.5); g.fill();
        g.fillStyle = C.bar; g.fillRect(-11, -4.5, 1.6, 9); g.fillRect(12, -4.5, 1.6, 9); g.restore();
        g.restore();
      },
      chevron(cx, cy, col, up = true) { g.strokeStyle = col; g.lineWidth = 3.6; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); const d = up ? 1 : -1; g.moveTo(cx - 14, cy + 7 * d); g.lineTo(cx, cy - 7 * d); g.lineTo(cx + 14, cy + 7 * d); g.stroke(); g.lineCap = 'butt'; },
      snow(cx, cy, r, col) {
        g.strokeStyle = col; g.lineWidth = 2.2; g.lineCap = 'round';
        for (let k = 0; k < 6; k++) {
          const a = k * Math.PI / 3, ux = Math.cos(a), uy = Math.sin(a); g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + ux * r, cy + uy * r); g.stroke();
          [.42, .72].forEach((f, j) => { const bx = cx + ux * r * f, by = cy + uy * r * f, l = r * (j ? .26 : .3);
            [-1, 1].forEach(s => { const b = a + s * Math.PI / 4; g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + Math.cos(b) * l, by + Math.sin(b) * l); g.stroke(); }); });
        }
        g.lineCap = 'butt';
      },
      film(cx, cy, col) {
        g.strokeStyle = col; g.lineWidth = 2.2; g.strokeRect(cx - 23, cy - 16, 46, 32);
        g.fillStyle = col; for (let i = 0; i < 8; i++) { g.fillRect(cx - 20 + i * 5.6, cy - 13.5, 3, 3); g.fillRect(cx - 20 + i * 5.6, cy + 10.5, 3, 3); }
        g.fillRect(cx - 23, cy - 8, 46, 1.8); g.fillRect(cx - 23, cy + 6.5, 46, 1.8); g.fillRect(cx - 9, cy - 8, 1.8, 16); g.fillRect(cx + 8, cy - 8, 1.8, 16);
      },
      camera(cx, cy, col) {
        g.strokeStyle = col; g.lineWidth = 2.4; g.lineJoin = 'round'; g.beginPath();
        g.moveTo(cx - 22, cy - 9); g.lineTo(cx - 10, cy - 9); g.lineTo(cx - 6, cy - 15); g.lineTo(cx + 6, cy - 15); g.lineTo(cx + 10, cy - 9); g.lineTo(cx + 22, cy - 9);
        g.lineTo(cx + 22, cy + 15); g.lineTo(cx - 22, cy + 15); g.closePath(); g.stroke();
        g.beginPath(); g.arc(cx, cy + 3, 7.5, 0, 7); g.stroke();
      },
      worksheet(cx, cy, col) {
        g.strokeStyle = col; g.lineWidth = 2.2; g.lineJoin = 'round'; rr(cx - 12, cy - 14, 24, 30, 3, null, col, 2.2);
        g.fillStyle = col; g.fillRect(cx - 5, cy - 18, 10, 6);
        g.beginPath(); g.moveTo(cx + 6, cy + 2); g.lineTo(cx - 6, cy + 2); g.moveTo(cx - 1, cy - 3); g.lineTo(cx - 6, cy + 2); g.lineTo(cx - 1, cy + 7); g.stroke();
      },
      live(cx, cy, col) {
        I.sector(cx, cy + 2, 46, 32, col, null, 2.2);
        g.save(); g.translate(cx + 1, cy + 3); g.rotate(-Math.PI / 5); g.strokeStyle = col; g.lineWidth = 4; g.lineCap = 'round';
        g.beginPath(); g.arc(0, 0, 7, Math.PI * .55, Math.PI * 1.45); g.stroke(); g.lineCap = 'butt'; g.restore();
      },
      autoGain(cx, cy, col, auto) {
        g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 2;
        g.beginPath(); g.arc(cx, cy, 8, 0, 7); g.stroke(); g.beginPath(); g.arc(cx, cy, 8, Math.PI / 2, Math.PI * 1.5); g.fill();
        for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; if (auto && (k === 0 || k === 1)) continue; line(cx + Math.cos(a) * 11.5, cy + Math.sin(a) * 11.5, cx + Math.cos(a) * 15.5, cy + Math.sin(a) * 15.5, col, 2); }
        if (auto) { g.font = `800 15px ${FS}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 3; g.strokeStyle = '#000'; g.strokeText('A', cx + 9, cy + 8); g.fillText('A', cx + 9, cy + 8); }
      },
      /* Clarius yön işareti: sağa açık iç içe yaylar */
      cMark(cx, cy, col, mirror) {
        g.save(); g.translate(cx, cy); if (mirror) g.scale(-1, 1); g.strokeStyle = col; g.lineWidth = 2.4;
        [4, 8.5, 13].forEach((r, i) => { g.beginPath(); g.arc(i ? 0 : 1, 0, r, Math.PI * (.32 + i * .02), Math.PI * (1.68 - i * .02)); g.stroke(); });
        g.restore();
      },
      ap(cx, cy, col) { g.strokeStyle = col; g.lineWidth = 2; [5, 10].forEach(r => { g.beginPath(); g.arc(cx, cy, r, Math.PI * .75, Math.PI * 2.25); g.stroke(); }); dot(cx, cy, 2.4, col); },
      thermo(cx, cy) { rr(cx - 3.5, cy - 13, 7, 20, 3.5, null, '#FFFFFF', 1.6); dot(cx, cy + 8, 5.5, C.blue); g.strokeStyle = '#FFFFFF'; g.lineWidth = 1.4; g.beginPath(); g.arc(cx, cy + 8, 5.8, -Math.PI * .28, Math.PI * 1.28); g.stroke(); g.fillStyle = C.blue; g.fillRect(cx - 1.5, cy - 2, 3, 8); },
      battV(cx, cy) { rr(cx - 7, cy - 12, 14, 26, 2.5, null, '#FFFFFF', 1.6); g.fillStyle = '#FFFFFF'; g.fillRect(cx - 3, cy - 15, 6, 3); g.fillStyle = C.grn; g.fillRect(cx - 5, cy - 10, 10, 22); },
      bars(x, y, col) { g.fillStyle = col; [6, 10, 14, 19].forEach((h, i) => g.fillRect(x + i * 6, y - h, 4, h)); },
      corners(cx, cy, s, col) { g.strokeStyle = col; g.lineWidth = 2.4; const a = s / 2, b = s * .18; [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => { g.beginPath(); g.moveTo(cx + sx * a, cy + sy * (a - b * 1.6)); g.lineTo(cx + sx * a, cy + sy * a); g.lineTo(cx + sx * (a - b * 1.6), cy + sy * a); g.stroke(); }); },
      centerLine(cx, cy, col) { g.strokeStyle = col; g.lineWidth = 2; g.strokeRect(cx - 15, cy - 12, 30, 24); g.setLineDash([3, 3]); line(cx, cy - 10, cx, cy + 10, col, 1.6); g.setLineDash([]); },
      leaf(cx, cy, col) { g.fillStyle = col; g.beginPath(); g.moveTo(cx - 12, cy + 12); g.bezierCurveTo(cx - 14, cy - 6, cx, cy - 14, cx + 13, cy - 13); g.bezierCurveTo(cx + 13, cy + 2, cx + 4, cy + 13, cx - 12, cy + 12); g.fill(); line(cx - 12, cy + 12, cx + 2, cy - 2, C.bar, 1.6); },
      dr(cx, cy, col) { g.strokeStyle = col; g.lineWidth = 2; g.strokeRect(cx - 13, cy - 13, 26, 26); g.fillStyle = col; g.beginPath(); g.moveTo(cx + 13, cy - 13); g.lineTo(cx + 13, cy + 13); g.lineTo(cx - 13, cy + 13); g.fill(); line(cx - 9, cy - 6, cx - 1, cy - 6, col, 2); line(cx - 5, cy - 10, cx - 5, cy - 2, col, 2); line(cx + 2, cy + 7, cx + 9, cy + 7, C.bar, 2.2); },
      chroma(cx, cy, col) { g.strokeStyle = col; g.lineWidth = 2; for (let k = 0; k < 3; k++) { g.save(); g.translate(cx, cy); g.rotate(k * Math.PI / 3); g.beginPath(); g.ellipse(0, 0, 13, 5, 0, 0, 7); g.stroke(); g.restore(); } dot(cx, cy, 2.6, col); },
      split(cx, cy, col) { g.strokeStyle = col; g.lineWidth = 2; g.strokeRect(cx - 15, cy - 11, 13, 22); g.strokeRect(cx + 2, cy - 11, 13, 22); },
      addAnn(cx, cy, col) { g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 11, 0, 7); g.stroke(); line(cx - 6, cy, cx + 6, cy, col, 2); line(cx, cy - 6, cx, cy + 6, col, 2); },
      dist(cx, cy, col) { const p = (x, y) => { line(x - 5, y, x + 5, y, col, 1.8); line(x, y - 5, x, y + 5, col, 1.8); }; p(cx - 13, cy); p(cx + 13, cy); g.setLineDash([2.5, 3]); line(cx - 7, cy, cx + 7, cy, col, 1.6); g.setLineDash([]); },
      clear(cx, cy, col) { line(cx - 10, cy - 10, cx + 10, cy + 10, col, 3); line(cx + 10, cy - 10, cx - 10, cy + 10, col, 3); },
      play(cx, cy, col, playing) { g.fillStyle = col; if (playing) { g.fillRect(cx - 9, cy - 11, 6, 22); g.fillRect(cx + 3, cy - 11, 6, 22); } else { g.beginPath(); g.moveTo(cx - 8, cy - 12); g.lineTo(cx + 12, cy); g.lineTo(cx - 8, cy + 12); g.fill(); } }
    };

    /* ---------- Ana çizim ---------- */
    function render(t) {
      if (t - S.last < 1 / 32) return false;
      const dt = Math.min(.1, t - S.last); S.last = t;
      zones.length = 0;
      sizeScanner(); syncScanner(); maybeInvalidate();
      const P = pose(), N = needle(P);
      const state = {pose: P, press: sim.press, incl: incl(), pulse: Math.max(0, Math.sin(t * 7.5)) ** 2, needles: N ? [N] : []};
      /* Dondurulmuşken cine: son 3 saniyenin seçilen anı yeniden hesaplanır */
      if (S.frozen && S.cinePlay) { S.cine += dt / 3; if (S.cine > 1) S.cine = 0; S.cineDirty = true; }
      if (S.frozen && S.cineDirty) {
        const tc = S.frozenAt - 3 * (1 - S.cine), st2 = Object.assign({}, state, {pulse: Math.max(0, Math.sin(tc * 7.5)) ** 2});
        scan.frozen = false; scan.render(st2, tc, true); scan.frozen = true; S.cineDirty = false;
      } else scan.render(state, t);
      stepStrip(t, P);
      g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
      drawImageArea(t);
      if (!S.full) { drawHeader(t); drawBottom(t); }
      else { I.corners(34, H - 34, 22, C.or); zone(10, H - 58, 50, 50, 'exitFull'); }
      drawMenus();
      drawToast(t);
      if (S.flash) { const a = 1 - (t - S.flash) / .25; if (a <= 0) S.flash = 0; else { g.fillStyle = `rgba(255,255,255,${a * .55})`; g.fillRect(0, IY0(), W, IH()); } }
      if (S.rec && t - S.rec > 3) { S.rec = 0; S.clips++; toast('Cine saved'); }
      return true;
    }

    /* iPadOS durum çubuğu + Clarius başlığı */
    function drawHeader(t) {
      g.fillStyle = C.bar; g.fillRect(0, 0, W, HDR);
      const d = new Date(), loc = (typeof ICA !== 'undefined' && ICA.lang) || 'en';
      let tm, dy;
      try { tm = d.toLocaleTimeString(loc, {hour: 'numeric', minute: '2-digit'}); dy = d.toLocaleDateString(loc, {weekday: 'short', month: 'short', day: 'numeric'}); } catch (_) { tm = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`; dy = ''; }
      txt(`${tm}  ${dy}`, 22, 14, 12.5, C.ink, 600);
      /* Wi-Fi, yüzde, pil */
      const wx = W - 92, wy = 19; g.fillStyle = C.ink;
      g.beginPath(); g.moveTo(wx, wy); g.arc(wx, wy, 11, -Math.PI * .75, -Math.PI * .25); g.closePath(); g.fill();
      g.strokeStyle = C.bar; g.lineWidth = 1.6; [4, 7.5].forEach(r => { g.beginPath(); g.arc(wx, wy, r, -Math.PI * .75, -Math.PI * .25); g.stroke(); });
      txt('100%', W - 56, 14, 12, C.ink, 600, 'right');
      rr(W - 50, 8, 25, 12, 3.5, null, 'rgba(242,242,242,.6)', 1.2); rr(W - 48, 10, 21, 8, 2, C.ink); g.fillStyle = 'rgba(242,242,242,.6)'; g.fillRect(W - 24, 12, 2, 4);
      /* Başlık */
      const y0 = SBH, cy = y0 + 32;
      I.worksheet(38, cy, C.ink); zone(10, y0, 58, 64, 'worksheet');
      const bx = 74, bw = W - 74 - 82, by = cy - 26, bh = 52;
      rr(bx, by, bw, bh, 7, C.box, C.boxLine, 1.8);
      txt(scannerName(), bx + 16, cy - 9, 18, C.ink, 600);
      txt(S.preset, bx + 16, cy + 12, 13.5, '#E4E4E4', 600);
      zone(bx, by, bw, bh, 'scanPage');
      let rx = bx + bw - 14;
      I.battV(rx - 7, cy); rx -= 30;
      I.thermo(rx - 4, cy - 1); rx -= 24;
      if (S.frozen) { I.ap(rx - 10, cy + 2, '#9A9A9A'); }
      else {
        I.bars(rx - 24, cy + 10, C.grn); rx -= 34;
        const mi = S.mode === 'PW' ? ['0.73', '0.29', '0.73'] : (S.mode === 'CD' || S.mode === 'PD') ? ['0.71', '0.24', '0.52'] : ['0.67', '0.11', '0.19'];
        [['MI', mi[0]], ['TIS', mi[1]], ['TIB', mi[2]]].forEach(([k, v], i) => txt(`${k} ${v}`, rx, cy - 13 + i * 13, 10.5, C.ink, 500, 'right'));
      }
      if (S.rec) { const on = (t * 2 | 0) % 2; dot(bx + bw - 190, cy, 6, on ? '#FF4B4B' : '#7A2B2B'); }
      I.live(W - 40, cy, C.ink); zone(W - 78, y0, 78, 64, 'live');
    }

    function drawBottom(t) {
      const y0 = H - BOT, cy = y0 + 38;
      g.fillStyle = C.bar; g.fillRect(0, y0, W, BOT);
      const mOpen = S.menu === 'meas' || S.menu === 'label' || !!S.tool;
      I.measure(66, cy, mOpen ? C.or : C.ink); zone(26, y0, 80, 76, 'measMenu');
      const lab = S.ne ? 'NE' : {B: S.compound ? 'SC' : 'B', M: 'M', CD: 'CFI', PD: 'PDI', PW: 'PW', EL: 'E'}[S.mode];
      I.sector(168, cy, 58, 36, S.menu === 'modes' ? C.or : C.ink, lab, 2.4, lab.length > 2 ? 12 : 14); zone(126, y0, 84, 76, 'modeMenu');
      I.chevron(266, cy, C.ink, S.menu !== 'modes'); zone(230, y0, 72, 76, 'expand');
      /* Dondur / görüntüle */
      if (S.frozen) { dot(W / 2, cy, 37, '#1C1C1C'); g.strokeStyle = C.or; g.lineWidth = 2.6; g.beginPath(); g.arc(W / 2, cy, 36, 0, 7); g.stroke(); }
      else dot(W / 2, cy, 37, C.or);
      I.snow(W / 2, cy, 20, '#FFFFFF'); zone(W / 2 - 44, y0, 88, 80, 'freeze');
      I.film(W - 168, cy, S.rec ? '#FF5A4E' : C.ink); zone(W - 210, y0, 84, 76, 'clip');
      if (S.rec) { const p = clamp((t - S.rec) / 3, 0, 1); g.strokeStyle = '#FF5A4E'; g.lineWidth = 3; g.beginPath(); g.arc(W - 168, cy, 31, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); g.stroke(); }
      I.camera(W - 64, cy, C.ink); zone(W - 110, y0, 90, 76, 'capture');
      const badge = (x, n) => { if (!n) return; dot(x, cy - 20, 10, C.or); txt(String(n), x, cy - 20, 11.5, '#FFFFFF', 700, 'center'); };
      badge(W - 144, S.clips); badge(W - 40, S.shots);
      rr(W / 2 - 135, H - 10, 270, 5, 2.5, '#E9E9E9');
    }

    function drawImageArea(t) {
      const top = IY0(), bh = bc.height, pw = paneW();
      if (S.split) {
        const ix = S.ap ? 0 : W / 2;
        g.drawImage(snap, 0, 0, snap.width, snap.height, ix, top, pw, bh);
        g.drawImage(bc, paneX(), top);
        g.strokeStyle = C.or; g.lineWidth = 2; g.strokeRect(paneX() + 1, top + 1, pw - 2, bh - 2);
        zone(ix, top, pw, bh, 'pane', {pane: S.ap ? 0 : 1});
      } else g.drawImage(bc, 0, top);
      const ox = paneX(), oy = top, toC = p => ({x: ox + p.x, y: oy + p.y});
      zone(ox, top, pw, bh, 'img');   /* önce: üstteki simgelerin bölgeleri bunu örter */
      const G = scan.geo; if (!G) return;
      /* Görüntünün sol üst köşesi (yön işareti) */
      const corner = (right) => { const m = frac2mm(right ? 1 : 0, 0); return toC(mm2px(m.X, m.Y)); };
      /* Renk kutusu ve skala */
      if (S.mode === 'CD' || S.mode === 'PD' || S.mode === 'EL') {
        g.strokeStyle = S.mode === 'EL' ? '#E8E8E8' : C.roi; g.lineWidth = 1.4; g.beginPath();
        const R = S.roi, pts = [];
        for (let i = 0; i <= 12; i++) pts.push([R.a0 + (R.a1 - R.a0) * i / 12, R.s0]);
        for (let i = 0; i <= 12; i++) pts.push([R.a1, R.s0 + (R.s1 - R.s0) * i / 12]);
        for (let i = 12; i >= 0; i--) pts.push([R.a0 + (R.a1 - R.a0) * i / 12, R.s1]);
        for (let i = 12; i >= 0; i--) pts.push([R.a0, R.s0 + (R.s1 - R.s0) * i / 12]);
        pts.forEach(([a, s], i) => { const m = frac2mm(a, s), p = toC(mm2px(m.X, m.Y)); i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y); });
        g.closePath(); g.stroke();
        const sx = ox + 26, sh = 64, sy = oy + bh * .5 - sh / 2;
        for (let i = 0; i < sh; i++) {
          const u = i / sh; let c;
          if (S.mode === 'EL') { const rgb = USIM.elastoRGB(u); c = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`; }
          else if (S.mode === 'PD') { const a = 1 - u; c = `rgb(${150 + 105 * Math.min(1, a * 1.6) | 0},${40 + 190 * a | 0},${20 + 60 * a * a | 0})`; }
          else { const a = Math.abs(u - .5) * 2; c = u < .5 ? `rgb(${30 + 60 * a | 0},${120 + 110 * a | 0},${200 + 55 * a | 0})` : `rgb(${200 + 55 * a | 0},${60 + 140 * a * a | 0},${30 * a | 0})`; }
          g.fillStyle = c; g.fillRect(sx, sy + i, 14, 1);
        }
        const v = isLin() ? 19.4 : 8.8, lab = (s, y) => { g.font = `500 12.5px ${FS}`; const w = g.measureText(s).width + 10; rr(sx - 8, y - 10, w, 20, 4, 'rgba(40,40,40,.85)'); txt(s, sx - 3, y, 12.5, C.ink, 500); };
        if (S.mode === 'CD') { lab(`-${fmtE(v)} cm/s`, sy - 14); lab(`${fmtE(v)} cm/s`, sy + sh + 14); }
        else if (S.mode === 'EL') { lab('Soft', sy - 14); lab('Hard', sy + sh + 14); }
      }
      /* Orta çizgi kılavuzu */
      if (S.centerLine) { const p = toC(mm2px(0, 0)), q = toC(mm2px(0, S.depth)); g.setLineDash([6, 6]); line(p.x, p.y, q.x, q.y, 'rgba(230,230,230,.7)', 1.4); g.setLineDash([]); }
      /* M çizgisi / PW kapısı */
      if (S.mode === 'M') { const x = ox + S.mx * bc.width; g.setLineDash([2, 5]); line(x, oy, x, oy + bh, C.roi, 1.6); g.setLineDash([]); }
      if (S.mode === 'PW') {
        const x = ox + S.gate.x * bc.width, y = oy + S.gate.y * bc.height, gl = 14;
        line(x, oy, x, y - gl / 2 - 3, C.roi, 1.3); line(x, y + gl / 2 + 3, x, oy + bh, C.roi, 1.3);
        line(x - 11, y - gl / 2, x + 11, y - gl / 2, C.roi, 1.6); line(x - 11, y + gl / 2, x + 11, y + gl / 2, C.roi, 1.6);
        /* Açı düzeltme çizgisi: damar eksenine paralel */
        const a = sim.view === 'long' ? Math.atan(incl()) * (S.flip ? -1 : 1) : 0, ca = Math.cos(a) * 22, sa = Math.sin(a) * 22;
        line(x - ca - 16 * Math.cos(a), y - sa - 16 * Math.sin(a), x - ca, y - sa, C.roi, 1.6); line(x + ca, y + sa, x + ca + 16 * Math.cos(a), y + sa + 16 * Math.sin(a), C.roi, 1.6);
      }
      /* Ölçümler ve açıklamalar */
      const kmm = G.sc * (bc.width / G.W);
      const caliper = (x, y) => { line(x - 7, y, x + 7, y, C.meas, 1.8); line(x, y - 7, x, y + 7, C.meas, 1.8); };
      S.meas.forEach((m, i) => {
        const a = toC(m.a), b = toC(m.b); g.setLineDash([3, 4]); line(a.x, a.y, b.x, b.y, C.meas, 1.4); g.setLineDash([]);
        caliper(a.x, a.y); caliper(b.x, b.y); txt(String(i + 1), b.x + 9, b.y - 10, 12, C.meas, 700);
      });
      if (S.pend) { const a = toC(S.pend); caliper(a.x, a.y); }
      S.meas.forEach((m, i) => txt(`${i + 1}  D  ${fmtE(Math.hypot(m.a.x - m.b.x, m.a.y - m.b.y) / kmm / 10, 2)} cm`, ox + 76, oy + 76 + i * 20, 14, C.ink, 500));
      S.labels.forEach(L => { const p = toC(L); g.font = `600 17px ${FS}`; g.lineWidth = 3.5; g.strokeStyle = 'rgba(0,0,0,.8)'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.strokeText(L.t, p.x, p.y); txt(L.t, p.x, p.y, 17, '#FFFFFF', 600, 'center'); });
      /* Needle Enhance: güçlendirilen taraf turuncu, diğer taraf soluk; dokunarak taraf değişir */
      if (S.ne) {
        const yy = oy + bh * .42;
        [-1, 1].forEach(sd => {
          const on = sd === S.neSide * (S.flip ? -1 : 1), x = sd < 0 ? ox + 92 : ox + pw - 92, col = on ? C.or : 'rgba(190,190,190,.45)';
          g.strokeStyle = col; g.lineWidth = 2.4; for (let k = 0; k < 3; k++) { const xx = x - sd * k * 9; g.beginPath(); g.moveTo(xx + sd * 6, yy - 12); g.lineTo(xx - sd * 4, yy); g.lineTo(xx + sd * 6, yy + 12); g.stroke(); }
          txt('NE', x - sd * 8, yy + 26, 12, col, 700, 'center');
          zone(x - 40, yy - 30, 80, 70, 'neSide', {v: sd * (S.flip ? -1 : 1)});
        });
      }
      /* Otomatik kazanç simgesi ve TGC */
      I.autoGain(ox + 34, oy + 34, S.autoGain ? C.or : C.ink, S.autoGain); zone(ox + 6, oy + 6, 58, 58, 'autoGain');
      if (!S.autoGain) {
        ['Near', 'Mid', 'Far'].forEach((k, i) => {
          const ty = oy + bh * (.3 + i * .2), tx = ox + 30, tw = 120, u = (S.tgc[i] + 15) / 30;
          rr(tx, ty - 2, tw, 4, 2, 'rgba(255,255,255,.28)'); dot(tx + tw * u, ty, 9, C.ink); txt(k, tx, ty - 16, 11.5, C.dim, 600);
          zone(tx - 12, ty - 18, tw + 24, 36, 'tgc', {i, tx, tw});
        });
      }
      const cm = corner(S.flip); I.cMark(clamp(cm.x + (S.flip ? -18 : 18), ox + 70, ox + pw - 30), Math.max(oy + 22, cm.y + 20), C.or, S.flip);
      if (S.drAdj && !S.frozen) { I.dr(ox + 34, oy + bh - 40, C.or); }
      /* Sağ kenar: derinlik noktaları ve derinlik */
      const dx0 = ox + pw - 14, deep = S.depth > 80, small = deep ? 10 : 5, big = deep ? 50 : 10;
      for (let mm = 0; mm <= S.depth + .01; mm += small) { const y = toC(mm2px(0, mm)).y; dot(dx0, y, mm % big === 0 ? 2.8 : 1.4, '#FFFFFF'); }
      txt(`${fmtE(S.depth / 10, 1)} cm`, ox + pw - 26, oy + bh - 16, 16, C.ink, 500, 'right');
      /* Alt şerit (M-mod / PW) */
      if (lower()) {
        const sy = top + bh, sh = IY1() - sy;
        g.drawImage(strip, 0, 0, strip.width, strip.height, 0, sy, W, sh);
        for (let x = W - 30; x > 0; x -= SPD / 2) dot(x, sy + 2, 1.6, '#FFFFFF');
        if (S.mode === 'PW') {
          const gi = S.lastPW || {}, sc = pwScale(gi), pxv = sh / (sc.top - sc.bot), base = sy + sc.top * pxv;
          line(0, base, W - 16, base, '#FFFFFF', 1.2);
          for (let v = Math.ceil(sc.bot / 10) * 10; v <= sc.top; v += 10) dot(W - 14, base - v * pxv, v % 50 === 0 ? 2.6 : 1.3, '#FFFFFF');
          txt(`${sc.top} cm/s`, W - 26, sy + 13, 14, C.ink, 500, 'right'); txt(`${sc.bot} cm/s`, W - 26, IY1() - 14, 15, C.ink, 500, 'right');
          I.autoGain(30, sy + sh * .35, C.ink, false);
        } else {
          for (let mm = 0; mm <= S.depth + .01; mm += small) dot(W - 14, sy + mm / S.depth * (sh - 8) + 4, mm % big === 0 ? 2.6 : 1.3, '#FFFFFF');
        }
        zone(0, sy, W, sh, 'strip');
      }
      /* Dondurulmuşken cine çubuğu */
      if (S.frozen) {
        const cyb = top + bh - 44, x0 = 96, x1 = W - 150, xp = x0 + (x1 - x0) * S.cine;
        I.play(52, cyb, '#FFFFFF', S.cinePlay); zone(24, cyb - 26, 56, 52, 'cinePlay');
        line(x0, cyb, x1, cyb, 'rgba(210,210,210,.8)', 3);
        dot(xp, cyb, 11, C.or);
        const lab = `${fmtE(3 * S.cine, 1)} s`; g.font = `600 12px ${FS}`; const lw = g.measureText(lab).width + 14;
        rr(xp - lw / 2, cyb - 34, lw, 20, 10, '#3A7BD5'); txt(lab, xp, cyb - 24, 12, '#FFFFFF', 600, 'center');
        zone(x0 - 16, cyb - 26, x1 - x0 + 32, 52, 'cine', {x0, x1});
      }
      /* Kazanç / derinlik / dinamik aralık göstergesi (sürüklerken) */
      if (S.hud && t - S.hudT < 1) { g.font = `600 18px ${FS}`; const w = g.measureText(S.hud).width + 30; rr(W / 2 - w / 2, top + 22, w, 36, 18, 'rgba(30,30,30,.82)'); txt(S.hud, W / 2, top + 40, 18, C.ink, 600, 'center'); }
    }

    /* ---------- Menüler ---------- */
    function panelBase(x, y, w, h) { rr(x, y, w, h, 10, 'rgba(36,36,36,.97)'); zone(x, y, w, h, 'noop'); }
    function drawMenus() {
      if (!S.menu) return;
      const by = H - BOT;
      if (S.menu === 'modes') {
        const TOOLS = [['centerLine', 'centerLine', S.centerLine], ['eco', 'leaf', false], ['drAdj', 'dr', S.drAdj], ['chroma', 'chroma', S.chroma && S.mode === 'B'], ['split', 'split', S.split], ['full', 'corners', false]];
        const MODES = [['B', 'B', 'B-Mode'], ['CD', 'CFI', 'Color Doppler'], ['PD', 'PDI', 'Power Doppler']]
          .concat(has('SC') ? [['SC', 'SC', 'Compound']] : [], [['M', 'M', 'M-Mode'], ['PW', 'PW', 'PW Doppler']], has('ne') ? [['ne', 'NE', 'Needle Enhance']] : [], has('EL') ? [['EL', 'E', 'Elastography']] : []);
        const rh = 50, ph = 44 + Math.max(TOOLS.length, MODES.length) * rh + 8, pw = 470, px = 14, py = by - ph - 8;
        zone(0, IY0(), W, by - IY0(), 'menuOut');
        panelBase(px, py, pw, ph);
        txt('TOOLS', px + 18, py + 22, 12, C.dim, 700); txt('IMAGING MODES', px + 98, py + 22, 12, C.dim, 700);
        line(px + 10, py + 40, px + pw - 10, py + 40, 'rgba(255,255,255,.12)', 1);
        TOOLS.forEach(([k, ic, on], i) => { const cx = px + 44, cy = py + 44 + rh * i + rh / 2; if (ic === 'corners') I.corners(cx, cy, 26, on ? C.or : C.ink); else I[ic](cx, cy, on ? C.or : C.ink); zone(px, cy - rh / 2, 84, rh, 'toolItem', {v: k}); });
        MODES.forEach(([k, lab, name], i) => {
          const cy = py + 44 + rh * i + rh / 2, on = k === 'ne' ? S.ne : k === 'SC' ? S.compound && S.mode === 'B' && !S.ne : k === 'B' ? S.mode === 'B' && !S.ne && !S.compound : S.mode === k;
          I.sector(px + 124, cy, 40, 26, on ? C.or : C.ink, lab, 1.8, lab.length > 2 ? 9.5 : 11);
          txt(name, px + 158, cy + 1, 17, on ? C.or : C.ink, on ? 700 : 400);
          zone(px + 90, cy - rh / 2, pw - 96, rh, 'modeItem', {v: k});
        });
        return;
      }
      if (S.menu === 'meas' || S.menu === 'label') {
        zone(0, IY0(), W, by - IY0(), 'menuOut');
        if (S.menu === 'label') {
          const rh = 48, ph = 48 + LABELS.length * rh, pw = 300, px = 14, py = by - ph - 8;
          panelBase(px, py, pw, ph); txt('Annotations', px + 18, py + 24, 15, C.dim, 700); line(px + 10, py + 44, px + pw - 10, py + 44, 'rgba(255,255,255,.12)', 1);
          LABELS.forEach((l, i) => { const cy = py + 48 + rh * i + rh / 2; txt(l, px + 22, cy, 17, C.ink); zone(px, cy - rh / 2, pw, rh, 'labelItem', {v: l}); });
          return;
        }
        const rh = 50, pw = 420, ph = 3 * rh + 52 + 92, px = 14, py = by - ph - 8;
        panelBase(px, py, pw, ph);
        [['addAnn', 'Annotations', 'ann'], ['dist', 'Distance', 'dist'], ['clear', 'Clear Tools', 'clear']].forEach(([ic, name, v], i) => {
          const cy = py + 8 + rh * i + rh / 2; I[ic](px + 34, cy, v === 'dist' && S.tool === 'measure' ? C.or : C.ink); txt(name, px + 68, cy, 17, C.ink); zone(px, cy - rh / 2, pw, rh, 'measItem', {v});
        });
        const ty = py + 8 + 3 * rh + 6;
        txt('General', px + pw * .25, ty + 20, 16, C.ink, 700, 'center'); line(px + 10, ty + 40, px + pw / 2, ty + 40, C.or, 2.5);
        txt(S.preset, px + pw * .75, ty + 20, 16, C.dim, 400, 'center');
        I.dist(px + 50, ty + 72, S.tool === 'measure' ? C.or : C.ink); txt('Distance', px + 50, ty + 92, 11.5, C.dim, 500, 'center'); zone(px + 10, ty + 48, 80, 56, 'measItem', {v: 'dist'});
        return;
      }
      if (S.menu === 'scan') {
        const y0 = IY0(), h = H - BOT - y0;
        g.fillStyle = '#141414'; g.fillRect(0, y0, W, h); zone(0, y0, W, h, 'noop');
        g.fillStyle = '#2B2B2B'; g.fillRect(0, y0, W, 50);
        [['scanners', 'Scanners'], ['apps', 'Applications']].forEach(([k, lab], i) => {
          const on = S.scanTab === k, cx = W / 4 + i * W / 2;
          txt(lab, cx, y0 + 25, 18, on ? '#FFFFFF' : '#D0D0D0', on ? 700 : 400, 'center');
          if (on) line(i * W / 2 + 12, y0 + 48, (i + 1) * W / 2 - 12, y0 + 48, C.or, 2.5);
          zone(i * W / 2, y0, W / 2, 50, 'scanTab', {v: k});
        });
        const items = S.scanTab === 'apps' ? PRESETS[geomId()].map(p => [p, p, p === S.preset])
          : Object.keys(USM.MODELS).flatMap(id => id === 'clarius-pal'
            ? [['pal:pa', 'PAL HD3 · Phased Array', S.probe === id && S.side === 'pa'], ['pal:la', 'PAL HD3 · Linear Array', S.probe === id && S.side === 'la']]
            : [[id, USM.MODELS[id].name, S.probe === id]]);
        const rh = Math.min(52, Math.floor((h - 64) / items.length) - 7);
        items.forEach(([v, lab, on], i) => {
          const ry = y0 + 60 + i * (rh + 7);
          rr(10, ry, W - 20, rh, 2, on ? '#262626' : C.row, on ? C.sel : null, 1.6);
          txt(lab, 34, ry + rh / 2, 18, on ? C.or : '#EDEDED', on ? 700 : 400);
          zone(10, ry, W - 20, rh, 'scanItem', {v});
        });
      }
    }
    function drawToast(t) {
      if (!S.toast) return; const age = t - S.toastT; if (age > 1.8) { S.toast = null; return; }
      g.globalAlpha = Math.min(1, (1.8 - age) * 3); g.font = `500 16px ${FS}`; const w = g.measureText(S.toast).width + 40, y = (S.full ? H : H - BOT) - 70;
      rr(W / 2 - w / 2, y, w, 40, 20, 'rgba(50,50,50,.95)'); txt(S.toast, W / 2, y + 20, 16, '#FFFFFF', 500, 'center'); g.globalAlpha = 1;
    }

    /* ---------- Dokunma ---------- */
    let drag = null;
    function find(x, y) { for (let i = zones.length - 1; i >= 0; i--) { const z = zones[i]; if (x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h) return z; } return null; }
    const inImg = (x, y) => ({x: x - paneX(), y: y - IY0()});
    function centerOnArtery() {
      sizeScanner(); syncScanner(); maybeInvalidate(); scan.render({pose: pose(), press: sim.press, incl: incl(), pulse: 0, needles: []}, performance.now() / 1000, true);
      const A = USIM.cyl(USIM.PH.artery, 0); return scan.toImage(pose(), A.x, A.d, 0, 8);
    }
    function setMode(k) {
      if (S.frozen) unfreeze();
      if (k === 'ne') { S.ne = !S.ne; if (S.ne) { S.mode = 'B'; } return; }
      if (k === 'SC') { S.compound = !(S.compound && S.mode === 'B'); S.mode = 'B'; S.ne = false; return; }
      S.ne = false; if (k === 'B') S.compound = false;
      if ((k === 'M' || k === 'PW') && S.split) S.split = false;
      S.mode = k; resetStrip();
      if (k === 'CD' || k === 'PD' || k === 'EL') {
        /* Kutu başlangıçta artere ortalanır */
        const p = centerOnArtery();
        if (p) { const f = mm2frac(p.X, p.Y), wa = isLin() ? .55 : .4, ws = .45, a0 = clamp(f.a - wa / 2, 0, 1 - wa), s0 = clamp(f.s - ws / 2, 0, 1 - ws); S.roi = {a0, a1: a0 + wa, s0, s1: s0 + ws}; }
      }
      if (k === 'M' || k === 'PW') {
        const p = centerOnArtery();
        if (p) { const q = mm2px(p.X, p.Y); S.mx = clamp(q.x / bc.width, .05, .95); S.gate = {x: clamp(q.x / bc.width, .05, .95), y: clamp(q.y / bc.height, .1, .95)}; }
        else { S.mx = .5; S.gate = {x: .5, y: .5}; }
      }
    }
    function unfreeze() { S.frozen = false; S.cinePlay = false; S.cine = 1; }
    function setTool(k) {
      if (k === 'centerLine') S.centerLine = !S.centerLine;
      else if (k === 'drAdj') { S.drAdj = !S.drAdj; if (S.drAdj) hud(`Dynamic Range ${S.dr} dB`); }
      else if (k === 'chroma') { if (S.mode !== 'B' || S.ne) setMode('B'); S.chroma = !S.chroma; }
      else if (k === 'split') { if (!S.split) { if (lower()) S.mode = 'B'; S.split = true; S.ap = 1; S.pendSnap = 5; } else S.split = false; }
      else if (k === 'full') { S.full = true; S.menu = null; }
      else if (k === 'eco') toast('Eco Mode');
    }
    function pointer(type, x, y) {
      if (type === 'down') {
        const z = find(x, y); drag = null; if (!z) return false;
        const id = z.id;
        if (S.menu) {
          if (id === 'modeItem') { setMode(z.v); S.menu = null; }
          else if (id === 'toolItem') { setTool(z.v); if (z.v !== 'centerLine' && z.v !== 'eco') S.menu = null; }
          else if (id === 'measItem') {
            if (z.v === 'ann') S.menu = 'label';
            else if (z.v === 'dist') { S.tool = S.tool === 'measure' ? null : 'measure'; S.pend = null; S.pendLabel = null; S.menu = null; }
            else { S.meas = []; S.labels = []; S.pend = null; S.pendLabel = null; S.tool = null; S.menu = null; }
          }
          else if (id === 'labelItem') { S.pendLabel = z.v; S.tool = null; S.menu = null; }
          else if (id === 'scanTab') S.scanTab = z.v;
          else if (id === 'scanItem') {
            if (S.scanTab === 'apps') { S.preset = z.v; applyPreset(); S.meas = []; S.menu = null; }
            else {
              const [id2, sd] = z.v.startsWith('pal:') ? ['clarius-pal', z.v.slice(4)] : [z.v, 'pa'];
              if (id2 !== S.probe) { if (api.onProbe) api.onProbe(id2); setProbe(id2); }
              if (sd !== S.side) { S.side = sd; S.preset = PRESETS[geomId()][0]; fixModes(); applyPreset(); S.meas = []; }
              S.scanTab = 'apps';
            }
          }
          else if (id === 'menuOut' || id === 'modeMenu' || id === 'expand' || id === 'measMenu' || id === 'scanPage' || id === 'worksheet') S.menu = null;
          else if (id === 'freeze') { S.menu = null; return pointer('down', x, y); }
          return true;
        }
        switch (id) {
          case 'modeMenu': case 'expand': S.menu = 'modes'; break;
          case 'measMenu': if (S.tool || S.pendLabel) { S.tool = null; S.pend = null; S.pendLabel = null; } else S.menu = 'meas'; break;
          case 'scanPage': S.menu = 'scan'; S.scanTab = 'apps'; break;
          case 'worksheet': toast('Exam worksheet'); break;
          case 'live': toast('Clarius Live'); break;
          case 'exitFull': S.full = false; break;
          case 'autoGain': S.autoGain = !S.autoGain; break;
          case 'tgc': drag = {k: 'tgc', z}; dragTgc(x, z); break;
          case 'neSide': S.neSide = z.v; break;
          case 'capture': S.shots++; S.flash = performance.now() / 1000; toast('Image saved'); break;
          case 'clip': if (!S.rec) { S.rec = performance.now() / 1000; } break;
          case 'freeze':
            if (S.frozen) unfreeze();
            else { S.frozen = true; S.frozenAt = performance.now() / 1000; S.cine = 1; S.cinePlay = false; }
            break;
          case 'cinePlay': S.cinePlay = !S.cinePlay; break;
          case 'cine': drag = {k: 'cine', z}; dragCine(x, z); break;
          case 'pane': { const sc2 = snap.getContext('2d'); sc2.drawImage(bc, 0, 0, snap.width, snap.height); S.ap = z.pane; break; }
          case 'img': {
            const p = inImg(x, y);
            if (S.pendLabel) { S.labels.push({x: p.x, y: p.y, t: S.pendLabel}); S.pendLabel = null; break; }
            if (S.tool === 'measure') { if (!S.pend) S.pend = p; else { if (S.meas.length >= 4) S.meas.shift(); S.meas.push({a: S.pend, b: p}); S.pend = null; } break; }
            if (S.frozen) break;
            if (S.drAdj) { drag = {k: 'dr', y0: y, d0: S.dr}; break; }
            if (S.mode === 'M') { drag = {k: 'mline'}; S.mx = clamp(p.x / bc.width, .02, .98); break; }
            if (S.mode === 'PW') { drag = {k: 'gate'}; S.gate = {x: clamp(p.x / bc.width, .02, .98), y: clamp(p.y / bc.height, .06, .98)}; break; }
            if (S.mode === 'CD' || S.mode === 'PD' || S.mode === 'EL') { drag = {k: 'roi'}; moveRoi(p); break; }
            drag = {k: 'gest', x0: x, y0: y, d0: S.depth, g0: S.gain, ax: null}; break;
          }
          default: return id !== 'noop' ? false : true;
        }
        return true;
      }
      if (type === 'move' && drag) {
        if (drag.k === 'tgc') dragTgc(x, drag.z);
        else if (drag.k === 'cine') dragCine(x, drag.z);
        else if (drag.k === 'mline') S.mx = clamp(inImg(x, y).x / bc.width, .02, .98);
        else if (drag.k === 'gate') { const p = inImg(x, y); S.gate = {x: clamp(p.x / bc.width, .02, .98), y: clamp(p.y / bc.height, .06, .98)}; }
        else if (drag.k === 'roi') moveRoi(inImg(x, y));
        else if (drag.k === 'dr') { S.dr = clamp(Math.round((drag.d0 - (y - drag.y0) / 6) / 2) * 2, 30, 80); hud(`Dynamic Range ${S.dr} dB`); }
        else if (drag.k === 'gest') {
          /* Görüntüde dikey kaydırma derinliği, yatay kaydırma kazancı (parlaklığı) değiştirir */
          const dx = x - drag.x0, dy = y - drag.y0, m = spec(), step = isLin() ? 5 : 10;
          if (!drag.ax && Math.hypot(dx, dy) > 8) drag.ax = Math.abs(dy) > Math.abs(dx) ? 'v' : 'h';
          if (drag.ax === 'v') { const d = clamp(Math.round((drag.d0 + dy / 12 * step / 2) / step) * step, 10, Math.min(m.dmax * 10, 160)); if (d !== S.depth) { S.depth = d; S.meas = []; resetStrip(); } hud(`Depth ${fmtE(S.depth / 10, 1)} cm`); }
          else if (drag.ax === 'h') { S.gain = clamp(Math.round(drag.g0 + dx / 14), -20, 20); hud(`Gain ${gainPct()}%`); }
        }
        return true;
      }
      if (type === 'up') { const was = !!drag; drag = null; return was; }
      return false;
    }
    function dragTgc(x, z) { S.tgc[z.i] = clamp(Math.round(((x - z.tx) / z.tw) * 30 - 15), -15, 15); }
    function dragCine(x, z) { S.cine = clamp((x - z.x0) / (z.x1 - z.x0), 0, 1); S.cinePlay = false; S.cineDirty = true; }
    function moveRoi(p) {
      const mm = px2mm(p.x, p.y), f = mm2frac(mm.X, mm.Y), R = S.roi, wa = R.a1 - R.a0, ws = R.s1 - R.s0;
      const a0 = clamp(f.a - wa / 2, 0, 1 - wa), s0 = clamp(f.s - ws / 2, 0, 1 - ws);
      S.roi = {a0, a1: a0 + wa, s0, s1: s0 + ws};
    }

    /* Bölünmüş ekrana geçerken o anki görüntü sol panele alınır */
    function renderWrap(t) {
      const r = render(t);
      if (S.pendSnap && r && --S.pendSnap === 0) snap.getContext('2d').drawImage(bc, 0, 0, snap.width, snap.height);
      return r;
    }
    /* Sayfadaki açıklama kartı için anlık değerler (sayfa dilinde) */
    function readout() {
      const lang = (typeof ICA !== 'undefined' && ICA.lang) || 'tr', pct = lang === 'tr' ? `%${gainPct()}` : lang === 'es' ? `${gainPct()} %` : `${gainPct()}%`;
      const base = `${tr('depth')} ${fmt(S.depth / 10, 1)} cm · ${tr('gain')} ${pct} · ${fmt(S.freq, S.freq < 10 ? 1 : 0)} MHz`;
      if (S.mode !== 'PW') return base;
      const gi = S.lastPW || {};
      if (!gi.vessel) return tr('noFlow');
      const v = gi.vessel === 'artery' ? `PSV ${fmt(gi.psv, 0)} cm/s` : `${tr('vein')} · Vmean ${fmt(gi.vmean, 0)} cm/s`;
      return `${v} · θ ${fmt(gi.theta, 0)}°${gi.theta > 60 ? ' · ' + tr('angleWarn') : ''}`;
    }

    const api = {canvas: cv, W, H, sim, state: S, render: renderWrap, pointer, setProbe, onProbe: null, readout, zones,
      hover: (x, y) => { const z = find(x, y); return !!z && z.id !== 'noop' && z.id !== 'img' && z.id !== 'strip'; },
      setText(t) { T = t || {}; }};
    setProbe('clarius-l7');
    return api;
  }

  return {get: () => inst || (inst = create()), setText: t => { T = t || {}; }, W, H};
})();
