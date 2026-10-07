'use strict';
/* İleri Monitörizasyon Atlası · ultrason bölümü · görüntü benzetimi
   Ortak jel fantom anatomisi ve B-mod / renkli Doppler görüntüsünün ışın ışın hesaplanması. Aynı fantom 3B laboratuvar
   sahnesinde de çizilir; görüntü, probun ve iğnenin o anki konumundan üretilir. Eğitim amaçlı basitleştirilmiş fiziktir:
   darbe-yankı, frekansa bağlı zayıflama, sıvı arkasında güçlenme, kemik ve iğne arkasında gölge, iğnede yansıma açısı ve
   yankılanma (reverberation), sinirde anizotropi, Doppler'de açı bağımlılığı. Değerler ölçüm değildir.

   Koordinatlar (mm): x yanal, d deriden derinlik (aşağı +), z ışın kalınlığı yönü. 3B sahnede y = −d. */
const USIM = (() => {
  const C = 1.54; /* ses hızı, mm/µs (yumuşak doku ≈ 1540 m/s) */

  /* ---------- Fantom ----------
     Silindirik yapılar z boyunca uzanır; merkezleri z ile hafifçe kayar (probu kaydırınca yapıların ilişkisi değişir). */
  const PH = {
    X: 46, Z: 34, D: 64,
    skin: 1.6, fat: 8.2,
    nerve: {x: 5, d: 24, r: 4.2, sx: .1, sd: 0},
    artery: {x: -6, d: 25.5, r: 2.8, sx: -.16, sd: .03},
    vein: {x: -13.5, d: 21.5, r: 3.6, sx: -.2, sd: -.02},
    fasciaTop: 18.5, fasciaBot: 30.5,
    bone: {d: 50, k: .0065, x0: -34, x1: 34}
  };
  /* incl: nörovasküler demetin derinleşme eğimi (tan); uzun eksen benzetiminde damar görüntüde eğik seyreder */
  const cyl = (s, z, incl = 0) => ({x: s.x + s.sx * z, d: s.d + (s.sd + incl) * z});
  /* Sinir demetleri (fasikül): sinir kesitinde sabit yerleşim */
  const FASC = (() => { const a = []; let k = 0; for (let ring = 0; ring < 3; ring++) { const n = [1, 6, 11][ring], rr = [0, 1.55, 2.95][ring]; for (let i = 0; i < n; i++) { const t = i / n * Math.PI * 2 + ring * .5; a.push([Math.cos(t) * rr + .18 * Math.sin(k * 7.1), Math.sin(t) * rr + .18 * Math.cos(k * 3.3), .62 + .18 * ((k * 37 % 10) / 10)]); k++; } } return a; })();

  /* Deterministik benek (speckle): dünya konumuna bağlı, prob hareket edince dokuyla birlikte kalır */
  function hash3(i, j, k) { let h = (i * 374761393 + j * 668265263 + k * 2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; h ^= h >>> 16; return (h >>> 0) / 4294967296; }

  /* Bir noktadaki doku: e yansıtıcılık (genlik), a zayıflama çarpanı (doku = 1, sıvı ≈ 0), sp benek katkısı, k tür.
     S: anlık durum (basınç, nabız, enjeksiyon, eğim, deformasyon). */
  function tissue(x, d, z, S, out) {
    out.k = 0; out.sp = 1; out.a = 1; out.flow = 0;
    /* Prob basıncı yüzeyi bastırır: yapılar yaklaşır; parmak basısı yerel çukur oluşturur */
    if (S.press) d += S.press * 2.6 * Math.exp(-d / 26);
    if (S.dent) { const q = S.dent; d -= q.a * Math.exp(-((x - q.x) ** 2) / 70) * Math.exp(-d / 16); }
    if (d < 0) { out.e = 0; out.a = .05; out.sp = 0; return out; }
    /* Kemik (yüzeyi kavisli): parlak kenar, arkası tam gölge */
    const B = PH.bone;
    if (x > B.x0 && x < B.x1) { const bd = B.d + B.k * x * x; if (d > bd) { out.e = d < bd + 1 ? 2.2 : 0; out.a = 400; out.sp = .25; out.k = 6; return out; } }
    /* Ven: basınçla kapanan elips; arter: nabızla genişleyen, basınçla kapanmayan */
    const IN = S.incl || 0, v = cyl(PH.vein, z, IN), pr = S.press || 0, vry = PH.vein.r * Math.max(.06, 1 - pr * .94), vrx = PH.vein.r * (1 + pr * .45);
    const vn = ((x - v.x) / vrx) ** 2 + ((d - (v.d + PH.vein.r - vry)) / vry) ** 2;
    if (vn < 1) { out.e = .015; out.a = .06; out.sp = .2; out.k = 3; out.flow = -.7; return out; }
    if (vn < 1.35) { out.e = .55; out.k = 13; return out; }
    const ar = cyl(PH.artery, z, IN), arr = PH.artery.r * (1 + .07 * (S.pulse || 0)), an = Math.hypot(x - ar.x, d - ar.d);
    if (an < arr) { out.e = .012; out.a = .06; out.sp = .2; out.k = 2; out.flow = 1; return out; }
    if (an < arr + .55) { out.e = 1.05; out.k = 12; return out; }
    /* Enjeksiyon: iğne ucunda küçük sıvı cebi ve sinir çevresinde halka (sıvı anekoiktir) */
    const n = cyl(PH.nerve, z, IN), nd = Math.hypot(x - n.x, d - n.d), inj = S.inj || 0;
    if (S.tipPool && S.tipPool.r > .05) { const q = S.tipPool; if ((x - q.x) ** 2 + (d - q.d) ** 2 + ((z - q.z) * .8) ** 2 < q.r * q.r) { out.e = .01; out.a = .05; out.sp = .15; out.k = 5; return out; } }
    if (inj > 0 && nd > PH.nerve.r && nd < PH.nerve.r + inj * 3.4 && Math.abs(z) < 30) { out.e = .012; out.a = .05; out.sp = .15; out.k = 5; return out; }
    /* Sinir: hiperekoik bağ dokusu içinde hipoekoik fasiküller ("bal peteği"); eğimde anizotropi */
    if (nd < PH.nerve.r) {
      const lx = x - n.x, ly = d - n.d; let fas = false;
      for (const f of FASC) if ((lx - f[0]) ** 2 + (ly - f[1]) ** 2 < f[2] * f[2]) { fas = true; break; }
      const aniso = Math.pow(Math.cos(S.tilt || 0), 6) * Math.pow(Math.max(.25, Math.abs(Math.cos(S.rot || 0))), .6);
      out.e = (nd > PH.nerve.r - .55 ? 1 : fas ? .07 : .7) * (.35 + .65 * aniso); out.k = 1; return out;
    }
    /* Katmanlar: deri, deri altı yağ (septalar), fasyalar, kas (perimizyum çizgileri) */
    if (d < PH.skin) { out.e = .75; out.k = 7; return out; }
    if (d < PH.fat) { const s = Math.abs(Math.sin(x * .32 + d * 1.25 + .9 * Math.sin(x * .11 + z * .07))); out.e = s < .07 ? .45 : .055; out.k = 8; return out; }
    if (Math.abs(d - (PH.fat + .35)) < .45) { out.e = 1.1; out.k = 9; return out; }
    const ft = PH.fasciaTop + .035 * x, fb = PH.fasciaBot - .03 * x;
    if (Math.abs(d - ft) < .4 || Math.abs(d - fb) < .4) { out.e = .95; out.k = 9; return out; }
    if (d > ft && d < fb) { out.e = .2; out.k = 10; return out; }   /* nörovasküler bölme: gevşek bağ doku */
    const st = Math.abs(Math.sin(d * 2.1 - x * (d < ft ? .28 : -.22) + z * .03));
    out.e = st < .1 ? .36 : .13; out.k = 11; return out;
  }

  /* İğne: E giriş noktası {x,d,z}, u birim yön, L cilt altındaki uzunluk, r yarıçap (mm), echo: uçtan itibaren ekojenik bölge (mm) */
  function needleHit(px, pd, pz, N, bw) {
    const ex = px - N.E.x, ed = pd - N.E.d, ez = pz - N.E.z;
    let t = ex * N.u.x + ed * N.u.d + ez * N.u.z; if (t < 0) return -1; if (t > N.L) t = N.L;
    const qx = ex - N.u.x * t, qd = ed - N.u.d * t, qz = ez - N.u.z * t;
    const lat = Math.hypot(qx, qd), el = Math.abs(qz);
    return (lat < N.r + .35 && el < N.r + bw) ? t : -1;
  }

  /* ---------- Prob geometrisi ----------
     g: {type:'linear'|'convex'|'phased', W (lineer genişlik), R (kavis yarıçapı), fov (derece)} */
  function rays(g, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const s = n === 1 ? .5 : i / (n - 1);
      if (g.type === 'linear') out.push({u0: (s - .5) * g.W, v0: 0, du: 0, dv: 1});
      else { const th = (s - .5) * g.fov * Math.PI / 180, R = g.type === 'convex' ? g.R : 0; out.push({u0: R * Math.sin(th), v0: R * Math.cos(th) - R, du: Math.sin(th), dv: Math.cos(th)}); }
    }
    return out;
  }
  /* Görüntü düzleminin kapsadığı alan (mm): yanal [−hw, hw], derinlik [0, depth] */
  function extent(g, depth) {
    if (g.type === 'linear') return {hw: g.W / 2, top: 0, bot: depth};
    const R = g.type === 'convex' ? g.R : 0, th = g.fov / 2 * Math.PI / 180, far = R + depth;
    const hw = th > Math.PI / 2 ? far : far * Math.sin(th);
    return {hw, top: Math.min(0, R * Math.cos(th) - R, far * Math.cos(Math.min(th, Math.PI / 2)) - R), bot: depth};
  }

  /* ---------- Görüntüleyici ----------
     canvas: görünür tuval. o: {geom, depth (mm), freq (MHz), gain (dB), tgc:[yakın, orta, uzak] (dB), doppler, labels,
     marker:true, head:{model, preset}}. state(): her karede anlık durum (prob pozu, iğneler, basınç...). */
  function Scanner(canvas, o) {
    const g = canvas.getContext('2d');
    const off = document.createElement('canvas'), og = off.getContext('2d');
    let NR = 0, NS = 200, R = [], map = null, mapKey = '', img = null, buf = null, col = null;
    const tmp = {};
    const self = {o, canvas, frozen: false, last: null, labelsAt: []};

    function build() {
      const key = JSON.stringify([o.geom, o.depth, canvas.width, canvas.height]);
      if (key === mapKey) return; mapKey = key;
      NR = o.geom.type === 'linear' ? 112 : 140; NS = Math.round(clamp(o.depth * 3.2, 150, 260));
      R = rays(o.geom, NR); buf = new Float32Array(NR * NS); col = new Uint8Array(NR * NS);
      /* Ekran (yarım çözünürlük) → ışın/örnek eşlemesi */
      const W = Math.max(60, Math.round(canvas.width / 2)), H = Math.max(60, Math.round(canvas.height / 2));
      off.width = W; off.height = H; img = og.createImageData(W, H);
      const ex = extent(o.geom, o.depth), padT = H * .06, padB = H * .04, sc = Math.min((H - padT - padB) / (ex.bot - ex.top), W * .86 / (2 * ex.hw));
      self.geo = {W, H, sc, cx: W * .47, top: padT - ex.top * sc, ex};
      map = new Int32Array(W * H).fill(-1);
      const Rc = o.geom.type === 'convex' ? o.geom.R : 0, th = o.geom.fov / 2 * Math.PI / 180;
      for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < W; xx++) {
        const X = (xx - self.geo.cx) / sc, Y = (yy - self.geo.top) / sc;
        let ri, si;
        if (o.geom.type === 'linear') { if (Y < 0 || Y > o.depth || Math.abs(X) > o.geom.W / 2) continue; ri = (X / o.geom.W + .5) * (NR - 1); si = Y / o.depth * (NS - 1); }
        else { const yy2 = Y + Rc, r = Math.hypot(X, yy2), a = Math.atan2(X, yy2); if (Math.abs(a) > th || r < Rc || r > Rc + o.depth) continue; ri = (a / (2 * th) + .5) * (NR - 1); si = (r - Rc) / o.depth * (NS - 1); }
        map[yy * W + xx] = Math.round(si) * NR + Math.round(ri);
      }
    }

    /* Renk kutusu (renkli/power Doppler, elastografi): ışın ve örnek kesirleri {a0, a1, s0, s1}; yoksa tüm alan */
    const inRoi = (i, j) => { const q = o.roi; if (!q) return true; const a = i / (NR - 1), s = j / (NS - 1); return a >= q.a0 && a <= q.a1 && s >= q.s0 && s <= q.s1; };
    /* Elastografi: doku türüne göre göreli sertlik (0 yumuşak … 1 sert); eğitim amaçlı, ölçüm değildir */
    const STIFF = {0: .3, 1: .62, 2: .05, 3: .04, 5: .02, 6: 1, 7: .55, 8: .14, 9: .72, 10: .22, 11: .42, 12: .7, 13: .45, 20: .9};
    /* Işın ışın darbe-yankı: zayıflama birikir, yansıtıcılık × benek × kalan enerji → logaritmik sıkıştırma */
    function compute(S, t) {
      const f = o.freq, depth = o.depth, P = S.pose, ds = depth / (NS - 1);
      const att = .1 * f * ds; /* dB, gidiş-dönüş ≈ 0,5 dB/cm/MHz */
      const cx = .34 * 7 / f, cd = .2 * 7 / f, cz = .9;
      const nd = (S.needles || []).filter(Boolean), bw = .55 + 3 / f;
      const T = o.tgc || [0, 0, 0], G = o.gain || 0, DR = 50, noise = .0009;
      /* Needle Enhance: iğne yansıması için ışın iğne tarafına doğru yönlendirilmiş gibi hesaplanır (side: −1 sol, +1 sağ) */
      const NE = o.ne ? {s: Math.sin(o.ne.steer || .45) * (o.ne.side || 1), c: Math.cos(o.ne.steer || .45)} : null;
      const EL = o.elasto, CF = o.doppler || o.power;
      S.tilt = P.tilt || 0; S.rot = P.rot || 0;
      for (let i = 0; i < NR; i++) {
        const r = R[i];
        /* Işın başlangıcı ve yönü (dünya): O + L·u + Dn·v */
        let ox = P.O.x + P.L.x * r.u0 + P.Dn.x * r.v0, od = P.O.d + P.L.d * r.u0 + P.Dn.d * r.v0, oz = P.O.z + P.L.z * r.u0 + P.Dn.z * r.v0;
        const dx = P.L.x * r.du + P.Dn.x * r.dv, dd = P.L.d * r.du + P.Dn.d * r.dv, dz = P.L.z * r.du + P.Dn.z * r.dv;
        const sx = NE ? dx * NE.c - P.L.x * NE.s : 0, sd = NE ? dd * NE.c - P.L.d * NE.s : 0, sz = NE ? dz * NE.c - P.L.z * NE.s : 0;
        let loss = 0, shadow = 1, elAcc = 0;
        for (let j = 0; j < NS; j++) {
          const s = j * ds, x = ox + dx * s, d = od + dd * s, z = oz + dz * s;
          tissue(x, d, z, S, tmp);
          let e = tmp.e, k = tmp.k;
          /* İğne: yansıma yüzeye dik gelişte en güçlü; ekojenik bölge açıdan daha az etkilenir; altında yankılanma */
          let ne = 0;
          for (const N of nd) {
            const hit = needleHit(x, d, z, N, bw);
            const cos0 = Math.abs(N.u.x * dx + N.u.d * dd + N.u.z * dz), cosS = NE ? Math.abs(N.u.x * sx + N.u.d * sd + N.u.z * sz) : 1;
            const cosI = Math.min(cos0, cosS), spec = Math.pow(1 - cosI * cosI, 2.2) * (NE ? 1.15 : 1);
            if (hit >= 0) { const echo = N.echo && N.L - hit < N.echo; ne = Math.max(ne, 2.4 * (echo ? Math.max(spec, .62) : spec)); shadow *= .985; }
            else for (let q = 1; q <= 3; q++) { const h2 = needleHit(x - dx * q * .95, d - dd * q * .95, z - dz * q * .95, N, bw); if (h2 >= 0) { ne = Math.max(ne, 2.4 * spec * Math.pow(.42, q)); break; } }
          }
          if (ne > 0) { e = Math.max(e, ne); k = 20; }
          const sp = tmp.sp ? (.15 + .95 * -Math.log(1e-3 + hash3(Math.floor(x / cx), Math.floor(d / cd), Math.floor(z / cz)))) * tmp.sp + (1 - tmp.sp) : 1;
          const amp = e * sp * Math.pow(10, -loss / 20) * shadow;
          /* TGC: üç bölge (yakın / orta / uzak), doğrusal geçiş */
          const u = s / depth, tg = u < .5 ? T[0] + (T[1] - T[0]) * u * 2 : T[1] + (T[2] - T[1]) * (u - .5) * 2;
          const nz = noise * (.5 + hash3(i, j, (t * 30) | 0));
          const db = 20 * Math.log10(amp + nz + 1e-6) + G + tg + Math.min(s * .1 * f, 34);   /* otomatik derinlik kazancı: en fazla 34 dB */
          buf[j * NR + i] = clamp((db + 33) / DR, 0, 1);
          /* Renkli Doppler: akım yönünün ışınla açısı; dik gelişte renk yok (BART: uzaklaşan mavi, yaklaşan kırmızı).
             Power Doppler: yön yok, yalnız akımın gücü; açıya daha az bağımlı. Elastografi: göreli sertlik haritası. */
          if (EL && inRoi(i, j)) { const st = STIFF[k] ?? .4; elAcc = j ? elAcc * .72 + st * .28 : st; col[j * NR + i] = 1 + Math.round(Math.max(0, Math.min(1, elAcc + .05 * (hash3(i >> 2, j >> 2, (t * 4) | 0) - .5))) * 253); }
          else if (CF && tmp.flow && inRoi(i, j)) {
            const fz = tmp.flow, cosF = -(dz + dd * (S.incl || 0)) / Math.hypot(1, S.incl || 0) * Math.sign(fz), pulse = tmp.k === 2 ? .45 + .55 * Math.max(0, S.pulse || 0) : .5;
            if (o.power) { const pw = Math.abs(fz) * pulse * Math.min(1, .3 + 3.2 * Math.abs(cosF)); col[j * NR + i] = pw < .06 ? 0 : 1 + Math.min(253, pw * 300) | 0; }
            else { const vv = cosF * Math.abs(fz) * pulse; col[j * NR + i] = Math.abs(vv) < .045 ? 0 : vv > 0 ? 1 + Math.min(126, vv * 160) | 0 : 128 + Math.min(126, -vv * 160) | 0; }
          }
          else col[j * NR + i] = 0;
          loss += att * tmp.a;
          if (tmp.a > 50) shadow *= .2;
        }
      }
    }

    function paint(t) {
      const {W, H} = self.geo, D = img.data;
      for (let p = 0, q = 0; p < W * H; p++, q += 4) {
        const m = map[p];
        if (m < 0) { D[q] = D[q + 1] = D[q + 2] = 0; D[q + 3] = 255; continue; }
        const v = buf[m] * 255, c = col[m];
        if (c && o.elasto) { const s = (c - 1) / 253, rgb = elastoRGB(s), w = .55; D[q] = v * (1 - w) + rgb[0] * w; D[q + 1] = v * (1 - w) + rgb[1] * w; D[q + 2] = v * (1 - w) + rgb[2] * w; }
        else if (c && o.power) { const a = (c - 1) / 253; D[q] = 150 + 105 * Math.min(1, a * 1.6); D[q + 1] = 40 + 190 * a; D[q + 2] = 20 + 60 * a * a; }
        else if (c) { const red = c < 128, a = ((red ? c : c - 127) / 127) * .5 + .5; D[q] = red ? 220 * a + 30 : 20; D[q + 1] = red ? 40 * a : 90 * a + 30; D[q + 2] = red ? 30 : 230 * a + 25; }
        else { D[q] = v; D[q + 1] = v; D[q + 2] = v * 1.02; }
        D[q + 3] = 255;
      }
      og.putImageData(img, 0, 0);
      g.save(); g.fillStyle = '#000'; g.fillRect(0, 0, canvas.width, canvas.height);
      g.imageSmoothingEnabled = true; g.drawImage(off, 0, 0, canvas.width, canvas.height); g.restore();
      overlay(t);
    }

    /* Ekran üstü bilgiler: model, ön ayar, frekans, derinlik ölçeği, yön işareti, etiketler */
    function overlay() {
      const cw = canvas.width, ch = canvas.height, k = cw / self.geo.W, {sc, cx, top} = self.geo, fs = Math.max(10, Math.round(ch * .03));
      g.font = `600 ${fs}px "JetBrains Mono", ui-monospace, monospace`; g.textBaseline = 'top'; g.fillStyle = '#C9D6DC';
      const h = o.head || {};
      if (h.model) g.fillText(h.model, cw * .025, ch * .012);
      g.textAlign = 'right'; g.fillText(`${o.freq.toFixed(o.freq < 10 ? 1 : 0)} MHz · ${(o.depth / 10).toFixed(1)} cm`, cw * .975, ch * .012); g.textAlign = 'left';
      if (h.preset) { g.fillStyle = '#7FE0D1'; g.fillText(h.preset, cw * .025, ch * .012 + fs * 1.25); }
      /* Derinlik ölçeği (cm) */
      const x0 = cw * .955; g.strokeStyle = 'rgba(220,230,235,.55)'; g.fillStyle = 'rgba(220,230,235,.8)'; g.lineWidth = 1;
      g.textAlign = 'right'; g.textBaseline = 'middle'; g.font = `500 ${Math.round(fs * .85)}px "JetBrains Mono", monospace`;
      const step = o.depth > 90 ? 20 : 10;
      for (let mm = 0; mm <= o.depth + .01; mm += step / 2) { const y = (top + mm * sc) * k, big = mm % step === 0; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + (big ? 8 : 4), y); g.stroke(); if (big && mm > 0) g.fillText(String(mm / 10), x0 - 3, y); }
      g.textAlign = 'left';
      /* Yön işareti: ekranın sol üstü, probun işaretli tarafına karşılık gelir */
      if (o.marker !== false) { const mx = o.markerRight ? (cx + self.geo.ex.hw * sc) * k - 14 : (cx - self.geo.ex.hw * sc) * k + 2, my = (top + (o.geom.type === 'linear' ? 0 : self.geo.ex.top) * sc) * k + fs * 3.4; g.fillStyle = '#7FE0D1'; g.beginPath(); g.arc(mx + 6, my, Math.max(4, fs * .35), 0, 7); g.fill(); }
      /* Etiketler */
      self.labelsAt.forEach(L => {
        const X = (cx + L.X * sc) * k, Y = (top + L.Y * sc) * k; if (!(Y > ch * .05 && Y < ch * .98)) return;
        g.font = `700 ${fs}px "Archivo", Arial, sans-serif`; const tw = g.measureText(L.t).width + 10, bx = Math.min(cw - tw - 4, Math.max(4, X + (L.dx || 10))), by = Y + (L.dy || -fs * 1.6);
        g.strokeStyle = L.c || '#FFD24A'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(X, Y); g.lineTo(bx + (bx > X ? 0 : tw), by + fs * .7); g.stroke();
        g.fillStyle = 'rgba(5,9,12,.78)'; g.fillRect(bx, by, tw, fs * 1.45); g.fillStyle = L.c || '#FFD24A'; g.textBaseline = 'top'; g.fillText(L.t, bx + 5, by + fs * .2);
      });
      if (self.frozen) { g.fillStyle = '#FFD24A'; g.font = `700 ${fs}px "JetBrains Mono", monospace`; g.textAlign = 'center'; g.textBaseline = 'bottom'; g.fillText('❚❚ FREEZE', cw / 2, ch * .985); g.textAlign = 'left'; }
    }

    /* Dünya noktasını görüntü koordinatına çevir (etiketler için); düzlemden uzaksa null */
    function toImage(P, x, d, z, tol) {
      const rx = x - P.O.x, rd = d - P.O.d, rz = z - P.O.z;
      const u = rx * P.L.x + rd * P.L.d + rz * P.L.z, v = rx * P.Dn.x + rd * P.Dn.d + rz * P.Dn.z;
      const N = {x: P.L.d * P.Dn.z - P.L.z * P.Dn.d, d: P.L.z * P.Dn.x - P.L.x * P.Dn.z, z: P.L.x * P.Dn.d - P.L.d * P.Dn.x};
      const e = rx * N.x + rd * N.d + rz * N.z;
      if (Math.abs(e) > (tol ?? 3)) return null;
      const ex = self.geo.ex; if (Math.abs(u) > ex.hw * 1.02 || v < 0 || v > o.depth) return null;
      if (o.geom.type !== 'linear') { const Rc = o.geom.type === 'convex' ? o.geom.R : 0, a = Math.atan2(u, v + Rc); if (Math.abs(a) > o.geom.fov / 2 * Math.PI / 180) return null; }
      return {X: u, Y: v};
    }

    let lastT = -1;
    self.render = (S, t, force) => {
      if (!canvas.width || !canvas.height) return;
      build();
      if (!self.frozen && (force || t - lastT > (o.interval || .05))) { lastT = t; compute(S, t); self.last = S; }
      self.labelsAt = o.labels && S.labels ? S.labels((x, d, z, tol) => toImage(S.pose, x, d, z, tol)) : [];
      paint(t);
    };
    self.toImage = toImage;
    self.invalidate = () => { mapKey = ''; };
    return self;
  }

  /* Elastografi renk skalası: yumuşak kırmızı → orta yeşil → sert mavi (ekranda lejant gösterilir) */
  function elastoRGB(s) {
    return s < .5 ? [235 - 215 * (s / .5), 60 + 150 * (s / .5), 40] : [20, 210 - 150 * ((s - .5) / .5), 40 + 200 * ((s - .5) / .5)];
  }
  /* Prob pozu: O temas noktası; rot (y ekseni etrafında dönüş), tilt (yanal eksen etrafında eğim, + = ışın +z'ye) */
  function pose(x, z, rot = 0, tilt = 0, press = 0) {
    const L = {x: Math.cos(rot), d: 0, z: Math.sin(rot)};
    /* Aşağı yön: (0,1,0) vektörünün L etrafında tilt kadar döndürülmüşü */
    const ca = Math.cos(tilt), sa = Math.sin(tilt), n = {x: -Math.sin(rot), d: 0, z: Math.cos(rot)};
    const Dn = {x: n.x * sa, d: ca, z: n.z * sa};
    return {O: {x, d: 0, z}, L, Dn, rot, tilt};
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  /* Fantomdaki yapıların etiket konumları */
  function anatomyLabels(T, toImage, z0 = 0) {
    const out = [], add = (t, x, d, z, c, dx, dy, tol) => { const p = toImage(x, d, z, tol); if (p) out.push({t, X: p.X, Y: p.Y, c, dx, dy}); };
    const n = cyl(PH.nerve, z0), a = cyl(PH.artery, z0), v = cyl(PH.vein, z0);
    add(T.nerve, n.x + 3, n.d - 3.2, z0, '#FFD24A', 14, -26, 6);
    add(T.artery, a.x, a.d + 2.8, z0, '#FF8A80', 10, 6, 6);
    add(T.vein, v.x - 1, v.d - 3, z0, '#8AB4FF', -90, -30, 6);
    add(T.bone, 12, PH.bone.d + PH.bone.k * 144, z0, '#E6EEF2', 10, -26, 8);
    add(T.fascia, 26, PH.fat + .3, z0, '#9FE3D6', -20, 8, 8);
    return out;
  }

  return {PH, cyl, Scanner, pose, rays, extent, anatomyLabels, C, FASC, elastoRGB};
})();
