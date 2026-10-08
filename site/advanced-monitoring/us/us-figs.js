'use strict';
/* İleri Monitörizasyon Atlası · ultrason · mod ve artefakt görüntüleri
   Her görüntü USIM ile ışın ışın hesaplanır: sayfanın jel fantomu (sinir, arter, ven, fasya, kemik) ya da bu dosyadaki küçük
   fantomlar (kemik yüzeyi, kist, karaciğer–diyafram, mesane–bağırsak gazı, iki derinlikte kist, göğüs duvarı–akciğer).
   Artefaktlar fizikten doğar: zayıflama ve gölge, sıvı arkasında güçlenme, iğne altında yankılanma, anizotropi; ayna,
   yan lob, dilim kalınlığı ve akciğer çizgileri fantomda yankının yanlış yerde göründüğü biçimiyle modellenmiştir.
   M-mod, PW ve CW düzenleri gerçek cihazdaki gibi üstte görüntü, altta zaman şerididir. Hız ve ölçek değerleri bu
   benzetimin örnek değerleridir, ölçüm değildir. USFIG.mount(kök, metinler): [data-fig] tuvallerini görünür olunca çizer. */
const USFIG = (() => {
  if (typeof USIM === 'undefined' || !USIM) return null;
  const {PH, cyl, hash3} = USIM, D2R = Math.PI / 180;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const MONO = (s, w = 600) => `${w} ${s}px "JetBrains Mono", ui-monospace, Menlo, monospace`;
  const SANS = (s, w = 700) => `${w} ${s}px "Archivo", Arial, sans-serif`;
  let L = {}, Z = 1;   /* etiket metinleri (sayfa dilinde); Z: küçük görüntülerde yazı büyütme */

  /* ---------- Küçük fantomlar (USIM doku işleviyle aynı imza) ---------- */
  const set = (o, e, a, sp, k) => { o.e = e; o.a = a; o.sp = sp; o.k = k; o.flow = 0; return o; };
  const fluid = (o, k = 5) => set(o, .012, .05, .15, k);
  function wall(x, d, z, o) {   /* deri, yağ (septalar), fasya, kas */
    if (d < 0) return set(o, 0, .05, 0, 0);
    if (d < 1.5) return set(o, .75, 1, 1, 7);
    if (d < 6.5) { const s = Math.abs(Math.sin(x * .32 + d * 1.25 + .9 * Math.sin(x * .11 + z * .07))); return set(o, s < .07 ? .45 : .055, 1, 1, 8); }
    if (Math.abs(d - 6.9) < .45) return set(o, 1.05, 1, 1, 9);
    const st = Math.abs(Math.sin(d * 2.1 - x * .26 + .6 * Math.sin(x * .09)));
    return set(o, st < .1 ? .36 : .13, 1, 1, 11);
  }
  /* Kemik yüzeyi: görüntünün sağ yarısında eğri korteks; altı tam gölge */
  function tBone(x, d, z, S, o) {
    const bd = 17 + .012 * (x - 14) ** 2;
    if (x > -2 && d > bd) return set(o, d < bd + .9 ? 2.4 : 0, 400, .25, 6);
    return wall(x, d, z, o);
  }
  /* Kist: anekoik, arkasında güçlenme */
  function tCyst(x, d, z, S, o) {
    if ((x / 6.5) ** 2 + ((d - 15) / 5.5) ** 2 < 1) return fluid(o);
    return wall(x, d, z, o);
  }
  /* Karaciğer ve diyafram; diyaframın altında üstteki dokunun ayna kopyası */
  const dia = x => 78 + .0065 * x * x;
  function liver(x, d, z, o) {
    if (d < 1.5) return set(o, .75, 1, 1, 7);
    if (d < 12) return wall(x, d * .6, z, o);
    if (Math.hypot(x + 14, d - 56) < 7.5) { const r = Math.hypot(x + 14, d - 56); return set(o, r > 6.6 ? .7 : .95, 1, 1, 13); }   /* hiperekoik odak */
    if (Math.hypot(x - 18, (d - 44) * 1.2) < 4.2) return fluid(o, 3);                                                         /* hepatik ven */
    return set(o, .2 + .03 * Math.sin(x * .7 + d * .5), 1, 1, 14);
  }
  function tMirror(x, d, z, S, o) {
    const D = dia(x);
    if (Math.abs(d - D) < 1.3) return set(o, 2.4, 1, .35, 9);
    if (d < D) return liver(x, d, z, o);
    liver(x, 2 * D - d, z, o); o.e *= .7; o.a = .6; return o;   /* yalancı kopya: ses diyaframdan yansıyıp geri dönmüş gibi */
  }
  /* Mesane: anekoik; yanda bağırsak gazı (parlak, gölgeli); mesane içinde yan lob yankıları */
  function tBladder(x, d, z, S, o) {
    if (d < 9) return wall(x, d * .9, z, o);
    const bn = (x / 30) ** 2 + ((d - 56) / 25) ** 2;
    if (bn < 1) {
      const lobe = .2 * Math.exp(-(((d - 50) / 6) ** 2)) * clamp((Math.abs(x) - 4) / 22, 0, 1) ** 1.6;
      if (lobe > .03) return set(o, lobe, .05, .9, 4);
      return fluid(o);
    }
    if (bn < 1.08) return set(o, .9, 1, 1, 9);
    const gx = Math.abs(x) - 40, gd = d - 50;
    if (gx > -6 && Math.abs(gd + .18 * gx) < 7 && d > 42) { const top = 42 - .18 * gx + Math.sin(x) * 1.2; if (d > top) return set(o, d < top + 1.2 ? 2.4 : 0, 300, .3, 6); }
    return set(o, .16 + .05 * Math.sin(x * .4 + d * .3), 1, 1, 11);
  }
  /* Dilim kalınlığı: aynı büyüklükte sığ ve derin kist; ışın kalınlığı derinlikle artar, kistin içine çevre dokunun yankısı karışır */
  function tSlice(x, d, z, S, o) {
    for (const [cx, cd] of [[-9, 11], [9, 31]]) {
      const rho = Math.hypot(x - cx, d - cd), R = 4.2;
      if (rho < R) {
        const h = .5 + .15 * d, chord = Math.sqrt(R * R - rho * rho), f = clamp(chord / h, 0, 1);
        wall(x, d, z, o); o.e *= (1 - f) ** 1.3; o.a = .05 + .95 * (1 - f); o.sp = .2 + .8 * (1 - f); return o;
      }
    }
    return wall(x, d, z, o);
  }
  /* Göğüs duvarı ve akciğer: kaburgalar (gölgeli), plevra çizgisi, altında yankılanma çizgileri ve bir kuyruklu yıldız */
  const PL = 15;
  function tLung(x, d, z, S, o) {
    if (d < PL - 1) {
      for (const cx of [-15, 15]) if (((x - cx) / 6.5) ** 2 + ((d - 10.5) / 3.6) ** 2 < 1) return set(o, d < 8.2 ? 2.2 : 0, 400, .3, 6);
      return wall(x, d, z, o);
    }
    const pd = PL + .25 * Math.sin(x * .3);
    if (d < pd + .9) return set(o, d < pd - .2 ? .3 : 1.9, 1, .5, 9);
    if (Math.abs(x - 4) < .7) return set(o, 1.1 - .25 * (d - pd) / 40, .2, .6, 15);   /* kuyruklu yıldız: plevradan dibe uzanan parlak çizgi */
    const rv = [2, 3].map(n => Math.exp(-(((d - n * pd) / .7) ** 2)) * (1.3 / n)).reduce((a, b) => a + b, 0);
    const near = Math.abs(x - 4) < 3 ? .25 : 1;   /* çizginin çevresinde yankılanma silinir */
    return set(o, .025 + rv * near, .35, .9, 16);
  }

  /* ---------- Tarama ---------- */
  const LIN = W => ({type: 'linear', W}), CVX = {type: 'convex', R: 45, fov: 70}, SEC = {type: 'phased', fov: 80};
  function scan(w, h, o, S) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const sc = USIM.Scanner(c, Object.assign({gain: 0, tgc: [0, 0, 0], bare: true, smooth: true, cx: .5, padT: .02, padB: .02, fillW: .96, freq: 10, depth: 35}, o));
    sc.render(Object.assign({pose: USIM.pose(0, 0, 0, 0, 0), press: 0, pulse: .55, needles: [], labels: () => []}, S), 1.3, true);
    return sc;
  }
  /* Tarama tuvalini hedefe yerleştir; mm → hedef piksel dönüştürücüsü döner */
  function place(g, sc, x, y, w, h) {
    const c = sc.canvas, s = Math.min(w / c.width, h / c.height), dw = c.width * s, dh = c.height * s, ox = x + (w - dw) / 2, oy = y + (h - dh) / 2;
    g.drawImage(c, ox, oy, dw, dh);
    const G = sc.geo, k = c.width / G.W * s;
    return {map: (X, Y) => [ox + (G.cx + X * G.sc) * k, oy + (G.top + Y * G.sc) * k], ox, oy, dw, dh, k: G.sc * k, G};
  }
  /* Dünya noktası → görüntü (pozun düzlemine izdüşüm) */
  const onImg = (P, x, d, z) => { const rx = x - P.O.x, rd = d - P.O.d, rz = z - P.O.z; return [rx * P.L.x + rd * P.L.d + rz * P.L.z, rx * P.Dn.x + rd * P.Dn.d + rz * P.Dn.z]; };
  const LONG = (A = PH.artery, n = Math.hypot(PH.artery.sx, 1)) => ({O: {x: cyl(A, 0).x, d: 0, z: 0}, L: {x: A.sx / n, d: 0, z: 1 / n}, Dn: {x: 0, d: 1, z: 0}, rot: Math.PI / 2, tilt: 0});   /* uzun eksen: düzlem arterin seyrine hizalı */

  /* ---------- Ekran çerçevesi ---------- */
  function screen(g, W, H, head) {
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    const fs = Math.round(W * .024 * Z);
    g.font = MONO(fs, 600); g.textBaseline = 'top'; g.fillStyle = '#AFC0C8';
    if (head) { g.textAlign = 'left'; g.fillText(head[0], W * .02, H * .025); g.textAlign = 'right'; g.fillText(head[1], W * .98, H * .025); g.textAlign = 'left'; }
    return fs;
  }
  function depthTicks(g, pl, depth, W, x) {
    g.strokeStyle = 'rgba(210,222,228,.6)'; g.fillStyle = 'rgba(210,222,228,.85)'; g.lineWidth = Math.max(1, W / 600);
    g.font = MONO(Math.round(W * .02 * Z), 500); g.textAlign = 'right'; g.textBaseline = 'middle';
    const step = depth > 70 ? 20 : 10;
    for (let mm = 0; mm <= depth + .01; mm += step / 2) { const y = pl.map(0, mm)[1], big = mm % step === 0; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (big ? W * .012 : W * .006), y); g.stroke(); if (big && mm) g.fillText(String(mm / 10), x - 3, y); }
    g.textAlign = 'left';
  }
  function marker(g, pl, W) { const [x, y] = pl.map(-pl.G.ex.hw, 0); g.fillStyle = '#7FE0D1'; g.beginPath(); g.arc(x + W * .012, y + W * .03, W * .008, 0, 7); g.fill(); }
  /* Etiket: nokta, çizgi, kutu */
  function tag(g, W, x, y, t, c = '#FFD24A', dx = 14, dy = -26, noDot) {
    const fs = Math.round(W * .026 * Z); g.font = SANS(fs, 700);
    const k = W / 600, tw = g.measureText(t).width + fs * .7, bh = fs * 1.45;
    let bx = x + dx * k, by = y + dy * k; if (dx < 0) bx -= tw; bx = clamp(bx, 3, W - tw - 3); by = clamp(by, 3, g.canvas.height - bh - 3);
    g.strokeStyle = c; g.lineWidth = Math.max(1.2, 1.4 * k);
    if (!noDot) { g.beginPath(); g.arc(x, y, 2.4 * k, 0, 7); g.fillStyle = c; g.fill(); g.beginPath(); g.moveTo(x, y); g.lineTo(bx + (bx + tw / 2 > x ? 0 : tw), by + bh / 2); g.stroke(); }
    g.fillStyle = 'rgba(4,8,11,.82)'; g.fillRect(bx, by, tw, bh); g.strokeRect(bx, by, tw, bh);
    g.fillStyle = c; g.textBaseline = 'middle'; g.fillText(t, bx + fs * .35, by + bh / 2 + 1);
  }
  const cap = (g, W, x, y, t, c = '#E8EEF1', align = 'left') => { g.font = SANS(Math.round(W * .028 * Z), 800); g.fillStyle = c; g.textAlign = align; g.textBaseline = 'top'; g.fillText(t, x, y); g.textAlign = 'left'; };
  function colorBar(g, W, x, y, h, kind, top, bot) {
    const w = W * .016, gr = g.createLinearGradient(0, y, 0, y + h);
    if (kind === 'power') { gr.addColorStop(0, '#FFE9A0'); gr.addColorStop(.5, '#F08A2A'); gr.addColorStop(1, '#5A1A08'); }
    else { gr.addColorStop(0, '#FFE25A'); gr.addColorStop(.18, '#F23C2A'); gr.addColorStop(.48, '#3A0A0A'); gr.addColorStop(.52, '#08143A'); gr.addColorStop(.82, '#2E6CF0'); gr.addColorStop(1, '#8EE8FF'); }
    g.fillStyle = gr; g.fillRect(x, y, w, h);
    g.font = MONO(Math.round(W * .018 * Z), 500); g.fillStyle = '#C9D6DC'; g.textBaseline = 'bottom'; if (top) g.fillText(top, x - 2, y - 2); g.textBaseline = 'top'; if (bot) g.fillText(bot, x - 2, y + h + 2);
  }
  function roiBox(g, pl, X0, X1, Y0, Y1, steer = 0) {
    const sh = Math.tan(steer) * (Y1 - Y0), a = pl.map(X0, Y0), b = pl.map(X1, Y0), c = pl.map(X1 + sh, Y1), d = pl.map(X0 + sh, Y1);
    g.strokeStyle = '#E8E3A0'; g.lineWidth = Math.max(1, pl.dw / 420); g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.lineTo(...c); g.lineTo(...d); g.closePath(); g.stroke();
  }

  /* ---------- Spektrum (PW / CW) ---------- */
  function artWave(p) { if (p < .06) return p / .06; if (p < .2) return 1 - (p - .06) / .14 * 1.2; if (p < .3) return -.2 + (p - .2) / .1 * .3; if (p < .45) return .1 * (1 - (p - .3) / .15); return 0; }
  function spectrum(g, x, y, w, h, o) {
    /* o: {top, bot (hız birimi), base (taban çizgisi), v(t) → hız, win: pencere oranı (0 = dolu spektrum), dur (s), unit} */
    g.fillStyle = '#000'; g.fillRect(x, y, w, h);
    const img = g.createImageData(Math.round(w), Math.round(h)), D = img.data, Wp = img.width, Hp = img.height;
    const pv = Hp / (o.top - o.bot), base = o.top * pv;
    for (let cx = 0; cx < Wp; cx++) {
      const t = cx / Wp * o.dur, v = o.v(t), env = v * (.96 + .08 * hash3(cx, 3, 1));
      for (let cy = 0; cy < Hp; cy++) {
        const vel = (base - cy) / pv; let a = .03 * hash3(cx, cy, 2);
        const lo = Math.min(0, env), hi = Math.max(0, env), inEnv = vel >= lo && vel <= hi && Math.abs(env) > .5;
        if (inEnv) {
          const f = Math.abs(vel / env), wv = o.win || 0;
          a = f < wv ? .06 + .1 * hash3(cx, cy, 5) : (.45 + .55 * hash3(cx >> 1, cy, 4)) * (.55 + .45 * f);
          if (f > .9) a = Math.min(1, a + .25);
        }
        const q = (cy * Wp + cx) * 4, g8 = Math.round(255 * clamp(a, 0, 1));
        D[q] = g8; D[q + 1] = g8; D[q + 2] = Math.min(255, g8 * 1.04); D[q + 3] = 255;
      }
    }
    g.putImageData(img, Math.round(x), Math.round(y));
    /* taban çizgisi, hız ölçeği, zaman işaretleri */
    const W = g.canvas.width, fs = Math.round(W * .019 * Z);
    g.strokeStyle = 'rgba(127,224,209,.9)'; g.lineWidth = Math.max(1, W / 700); g.beginPath(); g.moveTo(x, y + base); g.lineTo(x + w, y + base); g.stroke();
    g.font = MONO(fs, 500); g.fillStyle = '#C9D6DC'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.strokeStyle = 'rgba(201,214,220,.6)';
    for (const v of o.ticks) { const yy = y + base - v * pv; g.beginPath(); g.moveTo(x + w - W * .012, yy); g.lineTo(x + w, yy); g.stroke(); g.fillText(String(v), x + w + 4, yy); }
    g.fillText(o.unit, x + w + 4, y + fs * .6);
    for (let s = 0; s <= o.dur; s += .5) { const xx = x + s / o.dur * w; g.beginPath(); g.moveTo(xx, y + h); g.lineTo(xx, y + h - (s % 1 ? 4 : 8)); g.stroke(); }
  }

  /* ---------- Görüntü tarifleri ---------- */
  const base = (o = {}) => Object.assign({geom: LIN(38), depth: 35, freq: 10}, o);
  function labelsBase(g, W, pl, P, z0 = 0, which = ['nerve', 'artery', 'vein']) {
    const n = cyl(PH.nerve, z0), a = cyl(PH.artery, z0), v = cyl(PH.vein, z0);
    const at = {nerve: [n.x + 2.4, n.d - 3.6, '#FFD24A', 16, -30], artery: [a.x, a.d + 2.6, '#FF8A80', 12, 22], vein: [v.x - 1, v.d - 3.4, '#8AB4FF', -16, -32]};
    which.forEach(k => { const [x, d, c, dx, dy] = at[k], [X, Y] = onImg(P, x, d, z0); tag(g, W, ...pl.map(X, Y), L[k], c, dx, dy); });
  }
  const R = {};
  R.b = (g, W, H) => {
    screen(g, W, H, ['L 4–13 MHz · Nerve', '10 MHz · 3,5 cm']);
    const P = USIM.pose(0, 0, 0, 0, 0), sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base(), {pose: P}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 35, W, W * .965); marker(g, pl, W); labelsBase(g, W, pl, P);
    tag(g, W, ...pl.map(14, PH.fasciaTop + .035 * 14), L.fascia, '#9FE3D6', 10, -30);
  };
  R.m = (g, W, H) => {
    screen(g, W, H, ['M', '10 MHz · 3,0 cm']);
    const ax = cyl(PH.artery, 0).x, P = USIM.pose(0, 0, 0, 0, 0), o = base({depth: 30});
    const top = scan(W * 1.1 | 0, H * .5 * 1.1 | 0, o, {pose: P}), pl = place(g, top, 0, H * .07, W, H * .46);
    const [mx, my] = pl.map(ax, 0); g.setLineDash([W * .008, W * .008]); g.strokeStyle = '#E8E3A0'; g.lineWidth = Math.max(1, W / 450); g.beginPath(); g.moveTo(mx, my); g.lineTo(mx, pl.oy + pl.dh); g.stroke(); g.setLineDash([]);
    tag(g, W, mx, pl.map(0, 6)[1], L.mline, '#E8E3A0', 14, -6);
    /* Şerit: aynı çizgi boyunca her an yeniden hesaplanan yankılar */
    const sy = H * .56, sh = H * .41, sx = W * .04, sw = W * .88, cols = Math.round(sw / 2);
    const col = document.createElement('canvas'); col.width = 120; col.height = Math.round(sh * 1.2);
    const sc = USIM.Scanner(col, Object.assign({}, o, {geom: LIN(.6), nr: 3, bare: true, smooth: false, cx: .5, padT: 0, padB: 0, fillW: .9, gain: 0, tgc: [0, 0, 0]}));
    g.fillStyle = '#000'; g.fillRect(sx, sy, sw, sh);
    const dur = 2.6, Z0 = 13, Z1 = 33;   /* şerit, M çizgisinin 13–33 mm bölümünü büyütür */
    for (let i = 0; i < cols; i++) {
      const t = i / cols * dur, pulse = Math.max(0, Math.sin(t * 7.5 - .4)) ** 2;
      sc.render({pose: USIM.pose(ax, 0, 0, 0, 0), press: 0, pulse, pamp: .36, needles: [], labels: () => []}, t, true);
      const k = col.height / 30; g.drawImage(col, col.width / 2, Z0 * k, 1, (Z1 - Z0) * k, sx + i * sw / cols, sy, sw / cols + .6, sh);
    }
    g.strokeStyle = 'rgba(201,214,220,.6)'; g.lineWidth = 1;
    for (let s = 0; s <= dur; s += .5) { const xx = sx + s / dur * sw; g.beginPath(); g.moveTo(xx, sy + sh); g.lineTo(xx, sy + sh - (s % 1 ? 4 : 8)); g.stroke(); }
    const a = cyl(PH.artery, 0), wy = sy + (a.d - a.r - Z0) / (Z1 - Z0) * sh;
    g.strokeStyle = 'rgba(232,227,160,.7)'; g.setLineDash([3, 3]); [Z0, Z1].forEach(z => { const y = pl.map(ax, z)[1]; g.beginPath(); g.moveTo(mx - 6, y); g.lineTo(mx + 6, y); g.stroke(); }); g.setLineDash([]);
    tag(g, W, sx + sw * .62, wy, L.wall, '#FF8A80', 18, -30);
    cap(g, W, sx + sw + 6, sy + sh - W * .03, '1 s', '#9FB0B8');
  };
  const tiltCF = -.38;
  R.cf = (g, W, H) => {
    screen(g, W, H, ['CF', 'PRF 1,5 kHz · 3,5 cm']);
    const P = USIM.pose(0, 0, 0, tiltCF, 0), sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base({doppler: true, cgain: 330, roi: {a0: .05, a1: .56, s0: .38, s1: .92}}), {pose: P, pulse: 1}), pl = place(g, sc, 0, H * .08, W, H * .9);
    roiBox(g, pl, -17.1, 2.3, 13.3, 32.2); depthTicks(g, pl, 35, W, W * .965); marker(g, pl, W);
    colorBar(g, W, W * .03, H * .24, H * .5, 'cf', '+12', '−12'); labelsBase(g, W, pl, P, 0, ['artery', 'vein', 'nerve']);
  };
  R.pd = (g, W, H) => {
    screen(g, W, H, ['PDI', 'PRF 1 kHz · 3,5 cm']);
    const P = USIM.pose(0, 0, 0, tiltCF * .45, 0), sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base({power: true, roi: {a0: .05, a1: .56, s0: .38, s1: .92}}), {pose: P, pulse: 1}), pl = place(g, sc, 0, H * .08, W, H * .9);
    roiBox(g, pl, -17.1, 2.3, 13.3, 32.2); depthTicks(g, pl, 35, W, W * .965); marker(g, pl, W);
    colorBar(g, W, W * .03, H * .24, H * .5, 'power'); labelsBase(g, W, pl, P, 0, ['artery', 'vein']);
  };
  /* Uzun eksen arter: damar yatay ve yerinde; renk kutusu ve PW çizgisi 30° yönlendirilir (steer) */
  const INCL = 0, STEER = -32 * D2R;
  function longTop(g, W, y, h, extra = {}) {
    const P = LONG(), sc = scan(W * 1.1 | 0, h * 1.1 | 0, base(Object.assign({geom: LIN(50), depth: 32, doppler: true, cgain: 170, steer: STEER, roi: {a0: .4, a1: .9, s0: .3, s1: .95}}, extra)), {pose: P, pulse: 1});
    return {P, pl: place(g, sc, 0, y, W, h)};
  }
  function gate(g, W, pl, X, Y, theta) {
    const k = pl.k, [gx, gy] = pl.map(X, Y), dx = Math.sin(STEER), dy = Math.cos(STEER);
    g.strokeStyle = '#E8EEF1'; g.lineWidth = Math.max(1, W / 500); g.setLineDash([W * .006, W * .006]); g.beginPath(); g.moveTo(gx - dx * (Y - 1) * k, gy - dy * (Y - 1) * k); g.lineTo(gx + dx * 9 * k, gy + dy * 9 * k); g.stroke(); g.setLineDash([]);
    g.lineWidth = Math.max(1.5, W / 320); const gw = 2.2 * k;
    [-1, 1].forEach(s => { const cx = gx + dx * s * 1.6 * k, cy = gy + dy * s * 1.6 * k; g.beginPath(); g.moveTo(cx - dy * gw, cy + dx * gw); g.lineTo(cx + dy * gw, cy - dx * gw); g.stroke(); });
    /* açı düzeltme çizgisi: damar ekseni boyunca */
    const vx = Math.cos(Math.atan(INCL + PH.artery.sd)), vy = Math.sin(Math.atan(INCL + PH.artery.sd));
    g.strokeStyle = '#7FE0D1'; g.beginPath(); g.moveTo(gx - vx * 5 * k, gy - vy * 5 * k); g.lineTo(gx + vx * 5 * k, gy + vy * 5 * k); g.stroke();
    if (theta) cap(g, W, gx + 6 * k, gy - 9 * k, theta, '#7FE0D1');
  }
  const thetaDeg = () => { const m = INCL + PH.artery.sd; return Math.round(Math.acos(Math.abs(Math.sin(STEER) + m * Math.cos(STEER)) / Math.hypot(1, m)) / D2R); };
  R.pw = (g, W, H) => {
    screen(g, W, H, ['PW', `θ ${thetaDeg()}° · SV 1,5 mm`]);
    const {pl} = longTop(g, W, H * .07, H * .49), a = cyl(PH.artery, 0, INCL);
    roiBox(g, pl, -5, 20, 9.6, 30.4, STEER); gate(g, W, pl, 0, a.d);
    spectrum(g, W * .03, H * .58, W * .86, H * .38, {top: 100, bot: -30, dur: 2.6, ticks: [-20, 0, 40, 80], unit: 'cm/s', win: .55, v: t => 75 * artWave(((t * 7.5 / (2 * Math.PI)) % 1 + 1) % 1)});
    tag(g, W, W * .2, H * .58 + H * .38 * (100 - 72) / 130, 'PSV', '#FFD24A', 14, -8);
    tag(g, W, W * .55, H * .58 + H * .38 * (100 - 4) / 130, L.window, '#7FE0D1', 10, -40);
  };
  R.cw = (g, W, H) => {
    screen(g, W, H, ['CW', '2 MHz']);
    const P = USIM.pose(0, 0, 0, 0, 0), sc = scan(W * 1.1 | 0, H * .48 * 1.1 | 0, {geom: SEC, depth: 60, freq: 3.5}, {pose: P}), pl = place(g, sc, 0, H * .07, W, H * .48);
    const ang = -12 * D2R, [ox, oy] = pl.map(0, 0), len = 60 * pl.k;
    g.setLineDash([W * .006, W * .006]); g.strokeStyle = '#E8EEF1'; g.lineWidth = Math.max(1, W / 500); g.beginPath(); g.moveTo(ox, oy); g.lineTo(ox + Math.sin(ang) * len, oy + Math.cos(ang) * len); g.stroke(); g.setLineDash([]);
    const fx = ox + Math.sin(ang) * len * .55, fy = oy + Math.cos(ang) * len * .55; g.fillStyle = '#E8EEF1'; g.beginPath(); g.moveTo(fx, fy - 5); g.lineTo(fx + 4, fy); g.lineTo(fx, fy + 5); g.lineTo(fx - 4, fy); g.fill();
    tag(g, W, ox + Math.sin(ang) * len * .3, oy + Math.cos(ang) * len * .3, L.cwline, '#E8EEF1', -18, -12);
    const jet = t => { const p = ((t / .85) % 1 + 1) % 1; return p < .38 ? -380 * Math.sin(Math.PI * p / .38) ** .8 : 0; };
    spectrum(g, W * .03, H * .58, W * .86, H * .38, {top: 100, bot: -450, dur: 2.6, ticks: [0, -100, -200, -300, -400], unit: 'cm/s', win: 0, v: jet});
    tag(g, W, W * .4, H * .58 + H * .38 * (100 + 250) / 550, L.filled, '#FFD24A', 26, -10);
  };
  R.ang = (g, W, H) => {
    screen(g, W, H, null);
    const half = (x, tilt, title, c) => {
      const P = USIM.pose(0, 0, 0, tilt, 0), sc = scan(W * .55 | 0, H * .9 * 1.1 | 0, base({geom: LIN(24), doppler: true, cgain: 330, roi: {a0: .02, a1: .98, s0: .45, s1: .95}}), {pose: P, pulse: 1}), pl = place(g, sc, x, H * .1, W / 2 - 4, H * .88);
      roiBox(g, pl, -11.7, 11.7, 15.8, 33.2); cap(g, W, x + W * .25, H * .025, title, c, 'center');
      const a = cyl(PH.artery, 0), [X, Y] = onImg(P, a.x, a.d - 3.2, 0); tag(g, W, ...pl.map(X, Y), L.artery, '#FF8A80', -10, -26);
    };
    g.save(); g.beginPath(); g.rect(0, 0, W / 2 - 2, H); g.clip(); half(0, 0, L.ang90, '#FF8A80'); g.restore();
    g.save(); g.beginPath(); g.rect(W / 2 + 2, 0, W / 2, H); g.clip(); half(W / 2 + 2, tiltCF, L.angTilt, '#7FE0D1'); g.restore();
    g.fillStyle = '#2A3338'; g.fillRect(W / 2 - 2, 0, 4, H);
  };
  /* İki yarım: aynı kesit, farklı ayar */
  function split(g, W, H, a, b, la, lb, o = {}) {
    screen(g, W, H, null);
    [[a, la, 0], [b, lb, 1]].forEach(([opt, lab, i]) => {
      const x = i ? W / 2 + 2 : 0, P = opt.pose || USIM.pose(o.cx || 0, 0, 0, 0, 0);
      const sc = scan(W * .56 | 0, H * .88 * 1.1 | 0, base(Object.assign({geom: LIN(o.W || 22), depth: o.depth || 32}, opt.o)), Object.assign({pose: P}, opt.S));
      g.save(); g.beginPath(); g.rect(x, 0, W / 2 - 2, H); g.clip();
      const pl = place(g, sc, x, H * .1, W / 2 - 2, H * .88); if (opt.after) opt.after(pl, P);
      g.restore(); cap(g, W, x + W / 4, H * .025, lab, i ? '#7FE0D1' : '#FFB4A8', 'center');
    });
    g.fillStyle = '#2A3338'; g.fillRect(W / 2 - 2, 0, 4, H);
  }
  R.thi = (g, W, H) => split(g, W, H, {o: {freq: 7, haze: .12, dr: 44}}, {o: {freq: 10, compound: true, dr: 54}}, L.thiOff, L.thiOn, {cx: -6, W: 26});
  /* ---------- Artefaktlar ---------- */
  const A = {};
  A.shadow = (g, W, H) => {
    screen(g, W, H, ['L 4–13 MHz', '10 MHz · 4 cm']);
    const sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base({depth: 40, tissue: tBone}), {}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 40, W, W * .965);
    tag(g, W, ...pl.map(6, 17 + .012 * 64), L.boneSurf, '#E6EEF2', -16, -34); tag(g, W, ...pl.map(10, 31), L.shadow, '#FFD24A', 12, 8);
  };
  A.enh = (g, W, H) => {
    screen(g, W, H, ['L 4–13 MHz', '10 MHz · 4 cm']);
    const sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base({depth: 40, tissue: tCyst}), {}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 40, W, W * .965);
    tag(g, W, ...pl.map(0, 15), L.fluid, '#8AB4FF', 30, -30); tag(g, W, ...pl.map(0, 29), L.enh, '#FFD24A', 30, 4);
  };
  A.rev = (g, W, H) => {
    screen(g, W, H, ['L 4–13 MHz · Nerve', '10 MHz · 3,5 cm']);
    const E = {x: -24, d: 1, z: 0}, T = {x: 10, d: 12.5, z: 0}, dx = T.x - E.x, dd = T.d - E.d, Ln = Math.hypot(dx, dd);
    const N = {E, u: {x: dx / Ln, d: dd / Ln, z: 0}, L: Ln, r: .45, echo: 0};
    /* Ses iğnenin duvarları arasında gidip gelir: iğnenin altında eşit aralıklı, giderek sönen çizgiler */
    const tRev = (x, d, z, S, o) => {
      USIM.tissue(x, d, z, S, o);
      if (x > E.x && x < T.x - .6) { const dn = E.d + (x - E.x) * dd / dx, dv = d - dn; for (let k = 1; k <= 6; k++) if (Math.abs(dv - k * 2.1) < .32) { o.e = Math.max(o.e, 1.5 * Math.pow(.64, k)); o.sp = .2; o.k = 20; break; } }
      return o;
    };
    const sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base({tissue: tRev}), {needles: [N]}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 35, W, W * .965);
    tag(g, W, ...pl.map(-8, 6.5), L.needle, '#E8EEF1', -18, -30); tag(g, W, ...pl.map(2, 15.6), L.reverb, '#FFD24A', 26, 30);
  };
  A.mirror = (g, W, H) => {
    screen(g, W, H, ['C 2–6 MHz', '4 MHz · 13 cm']);
    const sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, {geom: CVX, depth: 130, freq: 4, tissue: tMirror, padT: .02}, {}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 130, W, W * .965);
    tag(g, W, ...pl.map(-14, 49), L.real, '#7FE0D1', -24, -24); tag(g, W, ...pl.map(-14, 2 * dia(-14) - 56 + 7), L.ghost, '#FFD24A', -24, 10);
    tag(g, W, ...pl.map(14, dia(14)), L.diaphragm, '#E6EEF2', 20, -30);
  };
  A.aniso = (g, W, H) => {
    const n = cyl(PH.nerve, 0);
    const lab = (pl, P) => { const [X, Y] = onImg(P, n.x, n.d - PH.nerve.r - .6, 0); tag(g, W, ...pl.map(X, Y), L.nerve, '#FFD24A', 10, -28); };
    /* Benzetimdeki anizotropiye ek olarak sinirin yansıması eğik gelişte belirgin düşer ("şimdi görüyorsun, şimdi görmüyorsun") */
    const dim = (x, d, z, S, o) => { USIM.tissue(x, d, z, S, o); if (o.k === 1) o.e *= .22; return o; };
    split(g, W, H, {pose: USIM.pose(n.x, 0, 0, 0, 0), after: lab}, {pose: USIM.pose(n.x, 0, 0, .35, 0), o: {tissue: dim}, after: lab}, '90°', '≈ 70°', {depth: 34});
  };
  A.lobe = (g, W, H) => {
    screen(g, W, H, ['C 2–6 MHz', '4 MHz · 10 cm']);
    const sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, {geom: CVX, depth: 100, freq: 4, tissue: tBladder}, {}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 100, W, W * .965);
    tag(g, W, ...pl.map(-18, 51), L.lobe, '#FFD24A', -30, 40); tag(g, W, ...pl.map(4, 68), L.bladder, '#8AB4FF', 30, 12); tag(g, W, ...pl.map(37, 43), L.gas, '#E6EEF2', 16, -40);
  };
  A.slice = (g, W, H) => {
    screen(g, W, H, ['L 4–13 MHz', '7 MHz · 4 cm']);
    const sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base({depth: 40, freq: 7, tissue: tSlice}), {}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 40, W, W * .965);
    tag(g, W, ...pl.map(-9, 6.8), L.cystShallow, '#8AB4FF', -14, -26); tag(g, W, ...pl.map(9, 31), L.cystDeep, '#FFD24A', -40, 26);
  };
  A.speckle = (g, W, H) => split(g, W, H, {o: {dr: 56}}, {o: {compound: true, dr: 46}}, L.spOff, L.spOn, {cx: 4, W: 24});
  A.dop = (g, W, H) => {
    screen(g, W, H, ['CF', 'PRF 0,6 kHz · 3,5 cm']);
    const {pl} = longTop(g, W, H * .08, H * .9, {cgain: 250, alias: true});
    roiBox(g, pl, -5, 20, 9.6, 30.4, STEER); depthTicks(g, pl, 32, W, W * .965);
    colorBar(g, W, W * .03, H * .24, H * .5, 'cf', '+4', '−4');
    const a = cyl(PH.artery, 0, INCL); tag(g, W, ...pl.map(0, a.d), L.alias, '#FFD24A', 40, -70);
  };
  A.lung = (g, W, H) => {
    screen(g, W, H, ['L 4–13 MHz · Lung', '8 MHz · 5 cm']);
    const sc = scan(W * 1.1 | 0, H * .9 * 1.1 | 0, base({geom: LIN(44), depth: 50, freq: 8, tissue: tLung}), {}), pl = place(g, sc, 0, H * .08, W, H * .9);
    depthTicks(g, pl, 50, W, W * .965);
    tag(g, W, ...pl.map(-15, 7), L.rib, '#E6EEF2', 16, -20); tag(g, W, ...pl.map(-6, PL), L.pleura, '#7FE0D1', -10, -40);
    tag(g, W, ...pl.map(-8, 2 * PL), L.reverb, '#FFD24A', -12, 14); tag(g, W, ...pl.map(4, 38), L.comet, '#FFB4A8', 18, 0);
  };

  /* ---------- Çizim ve tembel yükleme ---------- */
  function draw(cv) {
    const [set, k] = cv.dataset.fig.split(':'), fn = (set === 'm' ? R : A)[k]; if (!fn) return;
    const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    const W = Math.round(clamp(r.width * dpr, 320, 1100)), H = Math.round(W * .625);
    cv.width = W; cv.height = H; Z = clamp(440 / Math.max(1, r.width), 1, 1.6);
    try { fn(cv.getContext('2d'), W, H); cv.dataset.done = '1'; } catch (e) { cv.dataset.done = 'err'; }
  }
  function mount(root, labels) {
    L = labels || {};
    const cvs = [...root.querySelectorAll('canvas[data-fig]')];
    if (!('IntersectionObserver' in window)) { cvs.forEach(draw); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); requestAnimationFrame(() => draw(e.target)); } }), {rootMargin: '300px 0px'});
    cvs.forEach(c => io.observe(c));
  }
  return {mount, draw, R, A};
})();
