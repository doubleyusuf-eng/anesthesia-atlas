'use strict';
/* İleri Monitörizasyon Atlası · ultrason bölümü · Clarius uygulaması benzetimi (yatay tablet ekranı)
   Tek bir uygulama durumu hem 3B tabletin ekran dokusunu hem sayfadaki büyük tablet görünümünü besler.
   Mantıksal ekran 1200 × 800 px (3:2, yatay). Dokunma: pointer('down'|'move'|'up', x, y) mantıksal piksel.
   Görüntü USIM jel fantomundan üretilir. Modlar: B, M, renkli Doppler, Power Doppler, PW Doppler, elastografi;
   ek olarak Needle Enhance ve bölünmüş ekran. Modların prob başına varlığı ve ön ayar adları üreticinin ürün
   sayfalarından alınmıştır (us-text.js kaynakçası). Arayüz düzeni temsilidir; uygulamanın birebir kopyası değildir.
   Ön ayarın değiştirdiği derinlik/frekans değerleri ve PW Doppler hızları bu benzetimin örnek değerleridir. */
const USAPP = (() => {
  if (typeof USIM === 'undefined' || typeof USM === 'undefined' || !USM) return null;
  const W = 1200, H = 800, SB = 40, IMW = 850, PX = IMW, PW_ = W - IMW;
  const FD = '"Archivo", Arial, sans-serif', FM = '"JetBrains Mono", ui-monospace, monospace';
  const C = {bg: '#070C0F', panel: '#0F181D', tile: '#16232A', line: '#22343D', ink: '#E4EEF2', dim: '#7F97A3', acc: '#4FD1BE', warn: '#FFB347', red: '#FF5D5D'};
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

  let T = {}, inst = null;

  function create() {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    const bc = document.createElement('canvas'); bc.width = IMW; bc.height = H - SB;       /* canlı B görüntüsü */
    const snap = document.createElement('canvas'); snap.width = IMW / 2; snap.height = H - SB; /* bölünmüş ekranda bekleyen panel */
    const strip = document.createElement('canvas'); strip.width = IMW; strip.height = 330;    /* M-mod / PW şeridi */
    const sg = strip.getContext('2d');
    const scan = USIM.Scanner(bc, {geom: USM.GEOM['clarius-l7'], depth: 35, freq: 10, gain: 0, tgc: [0, 0, 0], marker: true, interval: .07, head: {model: 'L7 HD3', preset: 'Nerve/Pain'}});

    /* Benzetim girdileri (sayfadaki "prob elinizde" denetimleri): görünüm, açı, bası, iğne */
    const sim = {view: 'short', angle: 15, press: 0, needle: false, adv: .7};
    const S = {
      probe: 'clarius-l7', side: 'pa', preset: 'Nerve/Pain', depth: 35, gain: 0, freq: 10,
      mode: 'B', ne: false, neSide: 1, split: false, ap: 1, frozen: false, flip: false,
      tool: null, meas: [], pend: null, labels: [], pendLabel: null, menu: null,
      roi: {a0: .2, a1: .8, s0: .15, s1: .7}, mx: .5, gate: {x: .5, y: .5},
      shots: 0, rec: 0, toast: null, toastT: 0, last: -1, stripT: 0, lastPW: null
    };
    const geomId = () => S.probe === 'clarius-pal' && S.side === 'la' ? 'clarius-pal-la' : S.probe;
    const spec = () => S.probe === 'clarius-pal' && S.side === 'la' ? {f: [5, 15], dmax: 7, name: 'PAL HD3 · LA', f0: 10, ne: true} : USM.MODELS[S.probe];
    const isLin = () => USM.GEOM[geomId()].type === 'linear';
    const has = k => k === 'ne' ? !!spec().ne : k === 'EL' ? ELASTO.has(S.probe) : true;
    const tr = (k, f) => (T[k] ?? f ?? k);
    const fmt = (v, d = 1) => { const s = v.toFixed(d); return (typeof ICA !== 'undefined' && ICA.lang !== 'en') ? s.replace('.', ',') : s; };

    function setProbe(id, keepPreset) {
      if (!USM.MODELS[id]) return;
      S.probe = id; S.side = 'pa';
      if (!keepPreset) S.preset = PRESETS[geomId()][0];
      if (S.mode === 'EL' && !has('EL')) S.mode = 'B';
      if (S.ne && !has('ne')) S.ne = false;
      applyPreset(); S.meas = []; S.labels = [];
    }
    function applyPreset() {
      const m = spec();
      S.depth = clamp(PDEPTH[S.preset] || (isLin() ? 35 : 120), 10, Math.min(m.dmax * 10, 160));
      if (S.preset === 'Lung' && !isLin()) S.depth = Math.min(m.dmax * 10, 120);
      S.freq = m.f0 || m.f[0]; S.gain = 0;
      S.roi = isLin() ? {a0: .2, a1: .8, s0: .15, s1: .7} : {a0: .3, a1: .7, s0: .05, s1: .55};
      resetStrip();
    }
    const toast = (s) => { S.toast = s; S.toastT = performance.now() / 1000; };

    /* ---------- Poz: kısa eksen (damarlar kesitte) ya da uzun eksen (artere paralel, topuk–parmak açısı) ---------- */
    function pose() {
      const a = sim.angle * D2R;
      if (sim.view === 'long') {
        /* Uzun eksen: prob artere paralel ve deriye oturmuş; topuk–parmak açısı, damarın ışına göre eğimi olarak verilir (incl) */
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
    const lower = () => S.mode === 'M' || S.mode === 'PW';
    const bH = () => lower() ? 430 : H - SB;
    const paneW = () => S.split ? IMW / 2 : IMW;
    function sizeScanner() {
      const w = paneW(), h = bH();
      if (bc.width !== w || bc.height !== h) { bc.width = w; bc.height = h; scan.invalidate(); }
    }
    const paneX = () => S.split ? (S.ap ? IMW / 2 : 0) : 0;
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
      const m = spec();
      Object.assign(scan.o, {
        geom: USM.GEOM[geomId()], depth: S.depth, freq: S.freq, gain: S.gain, tgc: [0, 0, 0],
        doppler: S.mode === 'CD', power: S.mode === 'PD', elasto: S.mode === 'EL',
        roi: (S.mode === 'CD' || S.mode === 'PD' || S.mode === 'EL') ? S.roi : null,
        ne: S.ne ? {side: S.neSide * (S.flip ? -1 : 1), steer: .5} : null, markerRight: S.flip,
        head: {model: m.name, preset: S.preset}
      });
      scan.frozen = S.frozen;
    }
    let lastKey = '';
    function maybeInvalidate() {
      const k = [geomId(), S.depth, bc.width, bc.height].join('|');
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
      /* Kapıdaki ışın yönü */
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

    /* ---------- M-mod / PW şeridi ---------- */
    function resetStrip() { sg.fillStyle = '#000'; sg.fillRect(0, 0, strip.width, strip.height); S.stripT = 0; }
    const SCROLL = 3, SPD = 170;
    function stepStrip(t, P) {
      if (S.frozen || !lower()) { S.stripT = 0; return; }
      /* Şerit hızı gerçek zamana bağlı (SPD px/s): yavaş karelerde de dalga biçimi doğru genişlikte kalır */
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
      const base = sh * .62, scale = gi.vessel === 'vein' ? 40 : 100, pxv = (sh * .55) / scale;
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
    function rr(x, y, w, h, r, fill, stroke) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = 1.5; g.stroke(); } }
    function txt(s, x, y, size, col, wt = 600, align = 'left', font = FD) { g.font = `${wt} ${size}px ${font}`; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); }
    function fit(s, maxW, size, wt = 600, font = FD) { g.font = `${wt} ${size}px ${font}`; while (size > 9 && g.measureText(s).width > maxW) { size -= 1; g.font = `${wt} ${size}px ${font}`; } return size; }
    function button(x, y, w, h, label, id, on, dis, sub) {
      rr(x, y, w, h, 12, on ? C.acc : C.tile, on ? null : C.line);
      const col = dis ? '#4A5B63' : on ? '#04201C' : C.ink;
      if (sub) { txt(label, x + w / 2, y + h * .4, fit(label, w - 10, 22, 750), col, 750, 'center'); txt(sub, x + w / 2, y + h * .74, fit(sub, w - 8, 11.5, 600), dis ? '#3C4B52' : on ? '#04201C' : C.dim, 600, 'center'); }
      else txt(label, x + w / 2, y + h / 2, fit(label, w - 12, 17, 700), col, 700, 'center');
      zone(x, y, w, h, id, {dis});
    }

    /* ---------- Ana çizim ---------- */
    function render(t) {
      if (t - S.last < 1 / 32) return false; S.last = t;
      zones.length = 0;
      sizeScanner(); syncScanner(); maybeInvalidate();
      const P = pose(), N = needle(P);
      const state = {pose: P, press: sim.press, incl: incl(), pulse: Math.max(0, Math.sin(t * 7.5)) ** 2, needles: N ? [N] : []};
      scan.render(state, t);
      stepStrip(t, P);
      g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
      drawImageArea(t);
      drawStatus(t);
      drawPanel(t);
      drawMenus();
      drawToast(t);
      if (S.rec && t - S.rec > 3) { S.rec = 0; toast(tr('clipSaved')); }
      return true;
    }

    function drawStatus(t) {
      g.fillStyle = '#05090B'; g.fillRect(0, 0, W, SB);
      const d = new Date(); txt(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`, 18, SB / 2, 16, C.ink, 700, 'left', FM);
      txt('Clarius', 110, SB / 2, 17, C.acc, 800);
      txt(`${spec().name} · ${S.preset}`, 186, SB / 2, 15, C.dim, 600);
      /* Eğitim simülasyonu etiketi */
      const lab = tr('sim'); g.font = `700 13px ${FD}`; const tw = g.measureText(lab).width + 18;
      rr(W / 2 + 40, 8, tw, SB - 16, 8, 'rgba(255,210,74,.14)'); txt(lab, W / 2 + 40 + tw / 2, SB / 2, 13, '#FFD24A', 700, 'center');
      if (S.rec) { const on = (t * 2 | 0) % 2; g.fillStyle = on ? C.red : '#7A2B2B'; g.beginPath(); g.arc(W - 250, SB / 2, 6, 0, 7); g.fill(); txt(`REC ${fmt(Math.max(0, 3 - (t - S.rec)), 0)}`, W - 238, SB / 2, 14, C.red, 700, 'left', FM); }
      /* Wi-Fi ve pil simgeleri */
      const wx = W - 120; g.strokeStyle = C.ink; g.lineWidth = 2.2;
      [11, 7, 3].forEach(r => { g.beginPath(); g.arc(wx, SB / 2 + 7, r, -Math.PI * .78, -Math.PI * .22); g.stroke(); });
      rr(W - 82, 12, 44, 17, 4, null, C.ink); g.fillStyle = C.ink; g.fillRect(W - 37, 17, 3, 7); g.fillStyle = C.acc; g.fillRect(W - 79, 15, 30, 11);
    }

    function drawImageArea(t) {
      const top = SB, bh = bc.height, pw = paneW();
      g.fillStyle = '#000'; g.fillRect(0, top, IMW, H - top);
      if (S.split) {
        const ix = S.ap ? 0 : IMW / 2;
        g.drawImage(snap, 0, 0, snap.width, snap.height, ix, top, pw, bh);
        g.drawImage(bc, paneX(), top);
        g.strokeStyle = C.acc; g.lineWidth = 3; g.strokeRect(paneX() + 1.5, top + 1.5, pw - 3, bh - 3);
        g.fillStyle = C.line; g.fillRect(IMW / 2 - 1, top, 2, bh);
        zone(ix, top, pw, bh, 'pane', {pane: S.ap ? 0 : 1});
      } else g.drawImage(bc, 0, top);
      const ox = paneX(), oy = top;
      const toC = p => ({x: ox + p.x, y: oy + p.y});
      /* Renk kutusu */
      if (S.mode === 'CD' || S.mode === 'PD' || S.mode === 'EL') {
        g.strokeStyle = S.mode === 'EL' ? '#E6EEF2' : '#FFD24A'; g.lineWidth = 2; g.setLineDash([7, 5]); g.beginPath();
        const R = S.roi, pts = [];
        for (let i = 0; i <= 12; i++) pts.push([R.a0 + (R.a1 - R.a0) * i / 12, R.s0]);
        for (let i = 0; i <= 12; i++) pts.push([R.a1, R.s0 + (R.s1 - R.s0) * i / 12]);
        for (let i = 12; i >= 0; i--) pts.push([R.a0 + (R.a1 - R.a0) * i / 12, R.s1]);
        for (let i = 12; i >= 0; i--) pts.push([R.a0, R.s0 + (R.s1 - R.s0) * i / 12]);
        pts.forEach(([a, s], i) => { const m = frac2mm(a, s), p = toC(mm2px(m.X, m.Y)); i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y); });
        g.closePath(); g.stroke(); g.setLineDash([]);
        /* Renk skalası */
        const sx = ox + 14, sy = oy + bh * .32, sh = bh * .3;
        for (let i = 0; i < sh; i++) {
          const u = i / sh; let c;
          if (S.mode === 'EL') { const rgb = USIM.elastoRGB(u); c = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`; }
          else if (S.mode === 'PD') { const a = 1 - u; c = `rgb(${150 + 105 * Math.min(1, a * 1.6) | 0},${40 + 190 * a | 0},${20 + 60 * a * a | 0})`; }
          else { const a = Math.abs(u - .5) * 2; c = u < .5 ? `rgb(${220 * a + 30 | 0},${40 * a | 0},30)` : `rgb(20,${90 * a + 30 | 0},${230 * a + 25 | 0})`; }
          g.fillStyle = c; g.fillRect(sx, sy + i, 12, 1);
        }
        g.strokeStyle = C.dim; g.lineWidth = 1; g.strokeRect(sx, sy, 12, sh);
        if (S.mode === 'EL') { txt(tr('soft'), sx + 18, sy + 6, 12, C.ink, 700); txt(tr('hard'), sx + 18, sy + sh - 6, 12, C.ink, 700); }
        else if (S.mode === 'CD') { txt('+', sx + 18, sy + 6, 13, C.ink, 700, 'left', FM); txt('−', sx + 18, sy + sh - 6, 13, C.ink, 700, 'left', FM); }
      }
      /* M çizgisi / PW kapısı */
      if (S.mode === 'M') {
        const x = ox + S.mx * bc.width; g.strokeStyle = C.acc; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(x, oy + 30); g.lineTo(x, oy + bh); g.stroke(); g.setLineDash([]);
        g.fillStyle = C.acc; g.beginPath(); g.moveTo(x - 9, oy + 22); g.lineTo(x + 9, oy + 22); g.lineTo(x, oy + 34); g.fill();
      }
      if (S.mode === 'PW') {
        const x = ox + S.gate.x * bc.width, y = oy + S.gate.y * bc.height;
        g.strokeStyle = C.acc; g.lineWidth = 1.5; g.setLineDash([5, 6]); g.beginPath(); g.moveTo(x, oy + 30); g.lineTo(x, oy + bh); g.stroke(); g.setLineDash([]);
        g.lineWidth = 3; g.beginPath(); g.moveTo(x - 12, y - 8); g.lineTo(x + 12, y - 8); g.moveTo(x - 12, y + 8); g.lineTo(x + 12, y + 8); g.stroke();
      }
      /* Ölçümler ve etiketler */
      const kmm = scan.geo ? scan.geo.sc * (bc.width / scan.geo.W) : 1;
      const caliper = (x, y) => { g.strokeStyle = '#FFD24A'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 7, y); g.lineTo(x + 7, y); g.moveTo(x, y - 7); g.lineTo(x, y + 7); g.stroke(); };
      S.meas.forEach((m, i) => {
        const a = toC(m.a), b = toC(m.b); g.strokeStyle = 'rgba(255,210,74,.8)'; g.lineWidth = 1.5; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); g.setLineDash([]);
        caliper(a.x, a.y); caliper(b.x, b.y); txt(String(i + 1), b.x + 10, b.y - 10, 13, '#FFD24A', 800);
      });
      if (S.pend) { const a = toC(S.pend); caliper(a.x, a.y); }
      if (S.meas.length) {
        const bx = ox + 14, by = oy + 64; rr(bx - 6, by - 14, 168, S.meas.length * 24 + 8, 8, 'rgba(0,0,0,.6)');
        S.meas.forEach((m, i) => txt(`D${i + 1}  ${fmt(Math.hypot(m.a.x - m.b.x, m.a.y - m.b.y) / kmm / 10, 2)} cm`, bx + 2, by + i * 24, 15, '#FFD24A', 700, 'left', FM));
      }
      S.labels.forEach(L => { const p = toC(L); g.font = `750 16px ${FD}`; const w = g.measureText(L.t).width + 14; rr(p.x - w / 2, p.y - 13, w, 26, 7, 'rgba(0,0,0,.65)', 'rgba(127,224,209,.7)'); txt(L.t, p.x, p.y, 16, '#7FE0D1', 750, 'center'); });
      /* İpucu satırı */
      const hint = S.tool === 'measure' ? tr('measHint') : S.pendLabel ? tr('labelHint') : S.mode === 'M' ? tr('mHint') : S.mode === 'PW' ? tr('pwHint') : (S.mode === 'CD' || S.mode === 'PD' || S.mode === 'EL') ? tr('roiHint') : S.split ? tr('splitHint') : tr('gestHint');
      txt(hint, IMW / 2, top + bh - 16, 13.5, 'rgba(200,215,222,.7)', 600, 'center');
      if (S.frozen) { rr(IMW / 2 - 70, top + 44, 140, 30, 8, 'rgba(0,0,0,.6)'); txt('❄ ' + tr('frozen'), IMW / 2, top + 59, 15, '#9FD8FF', 750, 'center'); }
      /* NE tarafı */
      if (S.ne) { const L = (S.neSide * (S.flip ? -1 : 1)) < 0, x = L ? ox + 64 : ox + pw - 96; rr(x - 26, top + 132, 52, 28, 8, 'rgba(79,209,190,.25)', C.acc); txt('NE', x, top + 146, 13, C.acc, 800, 'center'); txt(L ? '◀' : '▶', L ? x - 38 : x + 38, top + 146, 15, C.acc, 800, 'center'); }
      if (S.mode !== 'M' && S.mode !== 'PW' || true) zone(ox, top, pw, bh, 'img');
      /* Alt şerit */
      if (lower()) {
        const sy = top + bh + 6, sh = H - sy - 4;
        g.drawImage(strip, 0, 0, strip.width, strip.height, 0, sy, IMW, sh);
        g.strokeStyle = C.line; g.lineWidth = 1; g.strokeRect(0.5, sy - 3, IMW - 1, sh + 2);
        if (S.mode === 'PW') {
          const gi = S.lastPW || {}, base = sy + sh * .62, scale = gi.vessel === 'vein' ? 40 : 100, pxv = (sh * .55) / scale;
          g.strokeStyle = 'rgba(127,224,209,.55)'; g.beginPath(); g.moveTo(0, base); g.lineTo(IMW, base); g.stroke();
          g.fillStyle = C.dim; g.font = `500 12px ${FM}`; g.textAlign = 'right';
          for (let v = -scale; v <= scale; v += scale / 2) { const y = base - v * pxv; if (y > sy + 6 && y < sy + sh - 4) g.fillText(String(v), IMW - 8, y); }
          g.textAlign = 'left';
          const info = !gi.vessel ? tr('noFlow') : gi.vessel === 'artery'
            ? `PSV ${fmt(gi.psv, 0)} cm/s · EDV 0 cm/s · θ ${fmt(gi.theta, 0)}°`
            : `${tr('vein')} · Vmean ${fmt(gi.vmean, 0)} cm/s · θ ${fmt(gi.theta, 0)}°`;
          rr(10, sy + 6, 420, 28, 7, 'rgba(0,0,0,.6)'); txt(info, 20, sy + 20, 14, C.ink, 700, 'left', FM);
          if (gi.vessel && gi.theta > 60) { rr(440, sy + 6, 300, 28, 7, 'rgba(255,179,71,.18)'); txt(tr('angleWarn'), 450, sy + 20, 13, C.warn, 700); }
          txt(`HR ${fmt(HR, 0)}`, IMW - 70, sy + 20, 13, C.dim, 700, 'right', FM);
        } else txt('M-mode · 1 s ⟷', 16, sy + 18, 13, C.dim, 700, 'left', FM);
        zone(0, sy, IMW, sh, 'strip');
      }
    }

    function drawPanel(t) {
      const x0 = PX, w = PW_, pad = 16, X = x0 + pad, IW = w - pad * 2;
      g.fillStyle = C.panel; g.fillRect(x0, SB, w, H - SB);
      g.fillStyle = C.line; g.fillRect(x0, SB, 1, H - SB);
      let y = SB + 12;
      /* Prob kartı */
      const m = spec(), gm = USM.GEOM[geomId()];
      rr(X, y, IW, 62, 12, C.tile, C.line);
      txt(USM.MODELS[S.probe].name, X + 14, y + 22, 20, C.ink, 800);
      txt(`${tr('t_' + gm.type)} · ${m.f[0]}–${m.f[1]} MHz`, X + 14, y + 45, 12.5, C.dim, 600);
      zone(X, y, S.probe === 'clarius-pal' ? IW - 104 : IW, 62, 'probeMenu');
      if (S.probe === 'clarius-pal') ['pa', 'la'].forEach((sd, i) => { const bx = X + IW - 98 + i * 48; rr(bx, y + 14, 44, 34, 8, S.side === sd ? C.acc : '#0B1317', C.line); txt(sd.toUpperCase(), bx + 22, y + 31, 14, S.side === sd ? '#04201C' : C.ink, 800, 'center'); zone(bx, y + 14, 44, 34, 'side', {v: sd}); });
      else txt('▾', X + IW - 18, y + 31, 16, C.dim, 700, 'center');
      y += 72;
      /* Ön ayar */
      rr(X, y, IW, 40, 10, '#0B1317', C.line);
      txt(tr('preset'), X + 12, y + 20, 12.5, C.dim, 600); txt(S.preset, X + IW - 30, y + 20, fit(S.preset, IW - 130, 15, 700), C.ink, 700, 'right'); txt('▾', X + IW - 14, y + 20, 14, C.dim, 700, 'center');
      zone(X, y, IW, 40, 'presetMenu');
      y += 52;
      /* Modlar */
      const MODES = [['B', 'B', tr('mB')], ['M', 'M', tr('mM')], ['CD', 'Color', tr('mCD')], ['PD', 'Power', tr('mPD')], ['PW', 'PW', tr('mPW')], ['ne', 'Needle', 'Enhance'], ['split', 'Split', tr('mSplit')], ['EL', 'Elasto', tr('mEL')]];
      const cw = (IW - 3 * 8) / 4, ch = 64;
      MODES.forEach(([k, lab, sub], i) => {
        const cx = X + (i % 4) * (cw + 8), cy = y + Math.floor(i / 4) * (ch + 8);
        const on = k === 'ne' ? S.ne : k === 'split' ? S.split : S.mode === k, dis = !has(k);
        button(cx, cy, cw, ch, lab, 'mode', on, dis, sub); zones[zones.length - 1].v = k;
      });
      y += 2 * ch + 8 + 14;
      /* Kazanç */
      txt(tr('gain'), X, y + 8, 13, C.dim, 600); txt(`${S.gain > 0 ? '+' : ''}${S.gain} dB`, X + IW, y + 8, 14, C.ink, 700, 'right', FM);
      const ty = y + 32, tx0 = X + 6, tw = IW - 12, u = (S.gain + 20) / 40;
      rr(tx0, ty - 4, tw, 8, 4, '#0B1317'); rr(tx0, ty - 4, tw * u, 8, 4, C.acc);
      g.fillStyle = C.ink; g.beginPath(); g.arc(tx0 + tw * u, ty, 11, 0, 7); g.fill();
      zone(X, ty - 18, IW, 36, 'gain', {tx0, tw});
      y += 58;
      /* Derinlik */
      txt(tr('depth'), X, y + 20, 13, C.dim, 600);
      button(X + IW - 170, y, 48, 40, '−', 'depth', false, false); zones[zones.length - 1].v = -1;
      txt(`${fmt(S.depth / 10, 1)} cm`, X + IW - 85, y + 20, 16, C.ink, 800, 'center', FM);
      button(X + IW - 48, y, 48, 40, '+', 'depth', false, false); zones[zones.length - 1].v = 1;
      y += 52;
      /* Araçlar */
      const TOOLS = [['measure', tr('measure')], ['label', tr('label')], ['flip', tr('flip')], ['clear', tr('clear')]], tw2 = (IW - 3 * 8) / 4;
      TOOLS.forEach(([k, lab], i) => { button(X + i * (tw2 + 8), y, tw2, 40, lab, 'tool', (k === 'measure' && S.tool === 'measure') || (k === 'label' && !!S.pendLabel) || (k === 'flip' && S.flip), false); zones[zones.length - 1].v = k; });
      y += 52;
      /* Moda özgü satır */
      if (S.ne) {
        txt(tr('neSide'), X, y + 18, 13, C.dim, 600);
        [[-1, tr('left')], [1, tr('right')]].forEach(([v, lab], i) => { button(X + IW - 170 + i * 88, y, 82, 36, lab, 'neSide', S.neSide === v, false); zones[zones.length - 1].v = v; });
      } else if (S.mode === 'EL') txt(tr('elNote'), X, y + 18, 12.5, C.dim, 600);
      else if (S.mode === 'CD') txt(tr('cdNote'), X, y + 18, 12.5, C.dim, 600);
      else if (S.mode === 'PD') txt(tr('pdNote'), X, y + 18, 12.5, C.dim, 600);
      else if (S.mode === 'PW') txt(tr('pwNote'), X, y + 18, 12.5, C.dim, 600);
      else if (S.mode === 'M') txt(tr('mNote'), X, y + 18, 12.5, C.dim, 600);
      /* Alt düğmeler: görüntü, klip, dondur */
      const by = H - 108, bw = (IW - 16) / 3;
      button(X, by, bw, 92, '◉', 'capture', false, false, tr('capture'));
      button(X + bw + 8, by, bw, 92, '●', 'clip', !!S.rec, false, tr('clip'));
      button(X + 2 * (bw + 8), by, bw, 92, '❄', 'freeze', S.frozen, false, tr('freeze'));
      if (S.shots) { g.fillStyle = C.acc; g.beginPath(); g.arc(X + bw - 12, by + 12, 13, 0, 7); g.fill(); txt(String(S.shots), X + bw - 12, by + 12, 13, '#04201C', 800, 'center', FM); }
    }

    function drawMenus() {
      if (!S.menu) return;
      const items = S.menu === 'probe' ? Object.keys(USM.MODELS).map(id => [id, USM.MODELS[id].name])
        : S.menu === 'preset' ? PRESETS[geomId()].map(p => [p, p])
        : (T.labels || []).map(s => [s, s]);
      const title = S.menu === 'probe' ? tr('probeMenu') : S.menu === 'preset' ? tr('presetMenu') : tr('label');
      g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(0, SB, W, H - SB); zone(0, SB, W, H - SB, 'menuOut');
      const cols = items.length > 6 ? 2 : 1, iw = 250, ih = 50, mw = cols * iw + (cols - 1) * 10 + 40, rows = Math.ceil(items.length / cols), mh = rows * (ih + 8) + 80;
      const mx = (IMW - mw) / 2 + 60, my = SB + Math.max(20, (H - SB - mh) / 2);
      rr(mx, my, mw, mh, 16, C.panel, C.line);
      txt(title, mx + 20, my + 30, 18, C.ink, 800); txt('✕', mx + mw - 26, my + 30, 18, C.dim, 700, 'center'); zone(mx + mw - 50, my + 8, 46, 44, 'menuOut');
      zone(mx, my, mw, 56, 'noop');
      items.forEach(([v, lab], i) => {
        const cx = mx + 20 + (i % cols) * (iw + 10), cy = my + 60 + Math.floor(i / cols) * (ih + 8);
        const cur = S.menu === 'probe' ? v === S.probe : S.menu === 'preset' ? v === S.preset : false;
        button(cx, cy, iw, ih, lab, 'menuItem', cur, false); zones[zones.length - 1].v = v;
      });
    }
    function drawToast(t) {
      if (!S.toast) return; const age = t - S.toastT; if (age > 2) { S.toast = null; return; }
      g.globalAlpha = Math.min(1, (2 - age) * 3); g.font = `700 17px ${FD}`; const w = g.measureText(S.toast).width + 36;
      rr(IMW / 2 - w / 2, H - 120, w, 44, 12, 'rgba(15,24,29,.92)', C.acc); txt(S.toast, IMW / 2, H - 98, 17, C.ink, 700, 'center'); g.globalAlpha = 1;
    }

    /* ---------- Dokunma ---------- */
    let drag = null;
    function find(x, y) { for (let i = zones.length - 1; i >= 0; i--) { const z = zones[i]; if (x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h) return z; } return null; }
    const inImg = (x, y) => ({x: x - paneX(), y: y - SB});
    function setMode(k) {
      if (k === 'ne') { if (!has('ne')) return toast(tr('notAvail')); S.ne = !S.ne; if (S.ne && S.mode !== 'B') S.mode = 'B'; if (S.ne) S.split = S.split && true; return; }
      if (k === 'split') { if (!S.split) { if (lower()) S.mode = 'B'; S.split = true; S.ap = 1; S.pendSnap = 5; } else S.split = false; return; }
      if (!has(k)) return toast(tr('notAvail'));
      if (k !== 'B') S.ne = false;
      if ((k === 'M' || k === 'PW') && S.split) S.split = false;
      S.mode = k; resetStrip();
      if (k === 'CD' || k === 'PD' || k === 'EL') {
        /* Kutu başlangıçta artere ortalanır */
        sizeScanner(); syncScanner(); maybeInvalidate(); scan.render({pose: pose(), press: sim.press, incl: incl(), pulse: 0, needles: []}, performance.now() / 1000, true);
        const A = USIM.cyl(USIM.PH.artery, 0), p = scan.toImage(pose(), A.x, A.d, 0, 8);
        if (p) { const f = mm2frac(p.X, p.Y), wa = isLin() ? .55 : .4, ws = .45, a0 = clamp(f.a - wa / 2, 0, 1 - wa), s0 = clamp(f.s - ws / 2, 0, 1 - ws); S.roi = {a0, a1: a0 + wa, s0, s1: s0 + ws}; }
      }
      if (k === 'M' || k === 'PW') {
        /* Çizgi/kapı başlangıçta artere */
        sizeScanner(); syncScanner(); maybeInvalidate(); scan.render({pose: pose(), press: sim.press, incl: incl(), pulse: 0, needles: []}, performance.now() / 1000, true);
        const A = USIM.cyl(USIM.PH.artery, 0), p = scan.toImage(pose(), A.x, A.d, 0, 8);
        if (p) { const q = mm2px(p.X, p.Y); S.mx = clamp(q.x / bc.width, .05, .95); S.gate = {x: clamp(q.x / bc.width, .05, .95), y: clamp(q.y / bc.height, .1, .95)}; }
        else { S.mx = .5; S.gate = {x: .5, y: .5}; }
      }
    }
    function pointer(type, x, y) {
      if (type === 'down') {
        const z = find(x, y); drag = null; if (!z) return false;
        const id = z.id;
        if (S.menu) {
          if (id === 'menuItem') {
            if (S.menu === 'probe') { if (api.onProbe) api.onProbe(z.v); setProbe(z.v); }
            else if (S.menu === 'preset') { S.preset = z.v; applyPreset(); S.meas = []; }
            else { S.pendLabel = z.v; S.tool = null; }
            S.menu = null;
          } else if (id === 'menuOut') S.menu = null;
          return true;
        }
        switch (id) {
          case 'probeMenu': S.menu = 'probe'; break;
          case 'presetMenu': S.menu = 'preset'; break;
          case 'side': if (S.side !== z.v) { S.side = z.v; S.preset = PRESETS[geomId()][0]; if (S.ne && !has('ne')) S.ne = false; applyPreset(); S.meas = []; } break;
          case 'mode': if (z.dis) toast(tr('notAvail')); else setMode(z.v); break;
          case 'gain': drag = {k: 'gain', z}; dragGain(x, z); break;
          case 'depth': { const step = isLin() ? 5 : 10, m = spec(); S.depth = clamp(S.depth + z.v * step, 10, Math.min(m.dmax * 10, 160)); S.meas = []; resetStrip(); break; }
          case 'tool':
            if (z.v === 'measure') { S.tool = S.tool === 'measure' ? null : 'measure'; S.pend = null; S.pendLabel = null; }
            else if (z.v === 'label') { S.menu = 'label'; S.tool = null; }
            else if (z.v === 'flip') { S.flip = !S.flip; S.meas = []; S.labels = []; }
            else { S.meas = []; S.labels = []; S.pend = null; S.pendLabel = null; S.tool = null; }
            break;
          case 'neSide': S.neSide = z.v; break;
          case 'capture': S.shots++; toast(`${tr('saved')} · ${S.shots}`); break;
          case 'clip': if (!S.rec) { S.rec = performance.now() / 1000; toast(tr('clipRec')); } break;
          case 'freeze': S.frozen = !S.frozen; break;
          case 'pane': { /* bölünmüş ekran: diğer panele geç; canlı görüntü o panelde sürer */
            const sc2 = snap.getContext('2d'); sc2.drawImage(bc, 0, 0, snap.width, snap.height); S.ap = z.pane; break; }
          case 'img': {
            const p = inImg(x, y);
            if (S.pendLabel) { S.labels.push({x: p.x, y: p.y, t: S.pendLabel}); S.pendLabel = null; break; }
            if (S.tool === 'measure') { if (!S.pend) S.pend = p; else { if (S.meas.length >= 4) S.meas.shift(); S.meas.push({a: S.pend, b: p}); S.pend = null; } break; }
            if (S.mode === 'M') { drag = {k: 'mline'}; S.mx = clamp(p.x / bc.width, .02, .98); break; }
            if (S.mode === 'PW') { drag = {k: 'gate'}; S.gate = {x: clamp(p.x / bc.width, .02, .98), y: clamp(p.y / bc.height, .06, .98)}; break; }
            if (S.mode === 'CD' || S.mode === 'PD' || S.mode === 'EL') { drag = {k: 'roi'}; moveRoi(p); break; }
            drag = {k: 'gest', x0: x, y0: y, d0: S.depth, g0: S.gain}; break;
          }
          default: return false;
        }
        return true;
      }
      if (type === 'move' && drag) {
        if (drag.k === 'gain') dragGain(x, drag.z);
        else if (drag.k === 'mline') S.mx = clamp(inImg(x, y).x / bc.width, .02, .98);
        else if (drag.k === 'gate') { const p = inImg(x, y); S.gate = {x: clamp(p.x / bc.width, .02, .98), y: clamp(p.y / bc.height, .06, .98)}; }
        else if (drag.k === 'roi') moveRoi(inImg(x, y));
        else if (drag.k === 'gest') {
          const dx = x - drag.x0, dy = y - drag.y0, m = spec(), step = isLin() ? 5 : 10;
          if (Math.abs(dy) > Math.abs(dx)) S.depth = clamp(Math.round((drag.d0 + dy / 12 * step / 2) / step) * step, 10, Math.min(m.dmax * 10, 160));
          else S.gain = clamp(Math.round(drag.g0 + dx / 14), -20, 20);
        }
        return true;
      }
      if (type === 'up') { const was = !!drag; drag = null; return was; }
      return false;
    }
    function dragGain(x, z) { S.gain = clamp(Math.round(((x - z.tx0) / z.tw) * 40 - 20), -20, 20); }
    function moveRoi(p) {
      const mm = px2mm(p.x, p.y), f = mm2frac(mm.X, mm.Y), R = S.roi, wa = R.a1 - R.a0, ws = R.s1 - R.s0;
      const a0 = clamp(f.a - wa / 2, 0, 1 - wa), s0 = clamp(f.s - ws / 2, 0, 1 - ws);
      S.roi = {a0, a1: a0 + wa, s0, s1: s0 + ws};
    }

    /* Bölünmüş ekrana geçerken o anki görüntü sol panele alınır */
    const _render = render;
    function renderWrap(t) {
      const r = _render(t);
      if (S.pendSnap && r && --S.pendSnap === 0) snap.getContext('2d').drawImage(bc, 0, 0, snap.width, snap.height);
      return r;
    }

    const api = {canvas: cv, W, H, sim, state: S, render: renderWrap, pointer, setProbe, onProbe: null,
      hover: (x, y) => { const z = find(x, y); return !!z && z.id !== 'noop'; },
      setText(t) { T = t || {}; }};
    setProbe('clarius-l7');
    return api;
  }

  return {get: () => inst || (inst = create()), setText: t => { T = t || {}; }, W, H};
})();
