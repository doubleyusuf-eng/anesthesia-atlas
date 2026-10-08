'use strict';
/* İleri Monitörizasyon Atlası · ultrason bölümü · 3B uygulama laboratuvarı
   Jel fantom (deri, yağ, fasya, kas, sinir, arter, ven, kemik), Clarius L7 HD3 ve Vygon VygoPlex Echo iğnesi. Probun
   görüntü düzlemi yarı saydam gösterilir; yandaki ekran aynı anda USIM ile hesaplanır. Üç adım dizisi:
   part (prob manevraları ve yönelim), ip (plan içi), oop (plan dışı). Fantom koordinatları mm: (x, d, z) → 3B (x, −d, z).
   Serbest mod (setFree): adım dizisi yerine kullanıcının verdiği prob konumu (ileri-geri/yana kaydırma, eğim, rotasyon,
   basınç) ve iğne ilerlemesi kullanılır; prob sahnede sürüklenerek de kaydırılır. */
const USLAB = (() => {
  if (typeof K3 === 'undefined' || !K3 || typeof USM === 'undefined' || !USM) return null;
  const {std, lin} = K3, V3 = (x, y, z) => new THREE.Vector3(x, y, z), D2R = Math.PI / 180;
  const PH = USIM.PH, SKIN_Y = .07;
  const ease = u => u < .5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
  const seg = (u, a, b) => clamp((u - a) / (b - a), 0, 1);
  const tri = u => u < .5 ? u * 2 : 2 - u * 2;           /* 0 → 1 → 0 */

  function mount(stage, screen, TX) {
    const view = new K3.Viewer(stage, {target: [0, .06, 0], dist: .55, theta: .62, phi: 1.02, minD: .12, maxD: .9, fov: 30, shadow: .25, groundR: .3, panLim: .12, fitAspect: 1.15});
    const F = new THREE.Group(); F.position.y = SKIN_Y; F.scale.setScalar(.001); view.root.add(F);   /* fantom (mm) */
    const W = (x, d, z) => F.localToWorld(V3(x, -d, z));

    /* ---------- Fantom ---------- */
    const glass = (c, o) => std(c, .25, 0, {transparent: true, opacity: o, depthWrite: false});
    const tray = new THREE.Mesh(new THREE.BoxGeometry(108, 6, 80), std(0x2E363C, .7, .05)); tray.position.y = -PH.D - 3; tray.receiveShadow = true; F.add(tray);
    const gel = new THREE.Mesh(new THREE.BoxGeometry(PH.X * 2, PH.D, PH.Z * 2), glass(0xCDE7EC, .2)); gel.position.y = -PH.D / 2; F.add(gel);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(gel.geometry), new THREE.LineBasicMaterial({color: lin(0x7FA9B2), transparent: true, opacity: .55})); edges.position.copy(gel.position); F.add(edges);
    const slab = (d0, d1, c, o) => { const m = new THREE.Mesh(new THREE.BoxGeometry(PH.X * 2 - .4, d1 - d0, PH.Z * 2 - .4), glass(c, o)); m.position.y = -(d0 + d1) / 2; F.add(m); return m; };
    slab(0, PH.skin, 0xE6B9A0, .55); slab(PH.skin, PH.fat, 0xF2E0A8, .2);
    const sheet = (d, c, o, tiltK = 0) => { const g = new THREE.PlaneGeometry(PH.X * 2 - .4, PH.Z * 2 - .4); g.rotateX(-Math.PI / 2); const p = g.attributes.position; for (let i = 0; i < p.count; i++) p.setY(i, -(d + tiltK * p.getX(i))); g.computeVertexNormals(); const m = new THREE.Mesh(g, std(c, .5, 0, {transparent: true, opacity: o, depthWrite: false, side: THREE.DoubleSide})); F.add(m); return m; };
    sheet(PH.fat + .35, 0xF4F7F8, .35); sheet(PH.fasciaTop, 0xF4F7F8, .22, .035); sheet(PH.fasciaBot, 0xF4F7F8, .22, -.03);
    /* Silindirik yapılar z boyunca, merkezleri z ile kayar */
    const along = (S, r, c, o) => { const pts = []; for (let z = -PH.Z + .3; z <= PH.Z - .3; z += 4) { const q = USIM.cyl(S, z); pts.push(V3(q.x, -q.d, z)); } const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, r, 28, false), std(c, .45, 0, {transparent: o < 1, opacity: o})); m.castShadow = true; F.add(m); return m; };
    const nerve = along(PH.nerve, PH.nerve.r, 0xF2CF5B, .95), artery = along(PH.artery, PH.artery.r, 0xD13B3B, .9), vein = along(PH.vein, PH.vein.r, 0x3E6ED4, .85);
    /* Kemik: kavisli üst yüzey */
    { const s = new THREE.Shape(), B = PH.bone; s.moveTo(B.x0, -PH.D + .3); for (let x = B.x0; x <= B.x1 + .01; x += 2) s.lineTo(x, -(B.d + B.k * x * x)); s.lineTo(B.x1, -PH.D + .3); s.closePath();
      const g = new THREE.ExtrudeGeometry(s, {depth: PH.Z * 2 - .6, bevelEnabled: false}); g.translate(0, 0, -PH.Z + .3);
      const m = new THREE.Mesh(g, std(0xEDE3CC, .6, 0, {transparent: true, opacity: .85})); F.add(m); }
    /* Enjeksiyon: uçta sıvı cebi, sinir çevresinde halka (yarı saydam) */
    const water = std(0x9FD3F0, .1, 0, {transparent: true, opacity: .45, depthWrite: false});
    const pool = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), water); pool.visible = false; F.add(pool);
    const halo = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 16, 32, 1, true), water.clone()); halo.rotation.x = Math.PI / 2; halo.visible = false; F.add(halo);

    /* ---------- Prob (L7 HD3) ve görüntü düzlemi ---------- */
    const P = USM.probe('clarius-l7'); view.root.add(P.g);
    const beam = new THREE.Group(); P.g.add(beam);
    const bw = .038, bd = .04;
    const bm = new THREE.Mesh(new THREE.PlaneGeometry(bw, bd), new THREE.MeshBasicMaterial({color: lin(0x4FD1BE), transparent: true, opacity: .3, side: THREE.DoubleSide, depthWrite: false}));
    bm.position.y = -bd / 2; beam.add(bm);
    const bl = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(bw, bd)), new THREE.LineBasicMaterial({color: lin(0x4FD1BE), transparent: true, opacity: .8})); bl.position.y = -bd / 2; beam.add(bl);
    const basis = new THREE.Matrix4();
    function placeProbe(pz) {
      const L3 = V3(pz.L.x, -pz.L.d, pz.L.z), U3 = V3(-pz.Dn.x, pz.Dn.d, -pz.Dn.z), Z3 = new THREE.Vector3().crossVectors(L3, U3);
      basis.makeBasis(L3, U3, Z3); P.g.quaternion.setFromRotationMatrix(basis);
      P.g.position.copy(W(pz.O.x, (pz.press || 0) * 1.6, pz.O.z));
    }

    /* ---------- İğne (VygoPlex Echo, 50 mm, 22G) ---------- */
    const NL = 50, ND = USM.needle({len: NL, g: 22, ext: false}); F.add(ND.g);
    const X1 = V3(1, 0, 0);
    function placeNeedle(N) {
      ND.g.visible = !!N; if (!N) return;
      const tip = V3(N.E.x + N.u.x * N.L, -(N.E.d + N.u.d * N.L), N.E.z + N.u.z * N.L);
      ND.g.position.copy(tip); ND.g.quaternion.setFromUnitVectors(X1, V3(N.u.x, -N.u.d, N.u.z));
    }
    const mkN = (E, T, frac = 1) => { const dx = T.x - E.x, dd = T.d - E.d, dz = T.z - E.z, Lf = Math.hypot(dx, dd, dz); return {E, u: {x: dx / Lf, d: dd / Lf, z: dz / Lf}, L: Lf * frac, Lf, r: .36, echo: 20}; };
    const extend = (N, L) => Object.assign({}, N, {L});

    /* Parmak (yön doğrulama) */
    const finger = new THREE.Group();
    { const c = new THREE.Mesh(new THREE.CylinderGeometry(7, 8, 40, 24), std(0xE2A98C, .6, 0)); c.position.y = 20; finger.add(c); const s = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 16), std(0xE2A98C, .6, 0)); s.scale.y = .7; finger.add(s); const nail = new THREE.Mesh(new THREE.BoxGeometry(9, 1, 10), std(0xF1D2C6, .3, 0)); nail.position.set(0, 14, 7.6); nail.rotation.x = .3; finger.add(nail); }
    finger.visible = false; F.add(finger);

    /* ---------- 3B etiketler ---------- */
    const tag = (k, cls = 'side') => { const t = view.addTag(TX.tag[k], V3(), cls); t.show = false; return t; };
    const tags = {beam: tag('beam'), mark: tag('mark'), nerve: tag('nerve', 'anat'), artery: tag('artery', 'anat'), vein: tag('vein', 'anat'), tip: tag('tip'), stop: tag('stop', 'warnt'), shaft: tag('shaft', 'warnt'), echo: tag('echo')};
    const setTag = (k, p, on = true) => { tags[k].show = on; if (on && p) tags[k].pos.copy(p); };

    /* ---------- Ekran ---------- */
    const scan = USIM.Scanner(screen, {geom: {type: 'linear', W: 38}, depth: 40, freq: 10, gain: 1, tgc: [0, 0, 0], labels: true, doppler: false, head: {model: 'L7 HD3', preset: 'Nerve'}});

    /* ---------- Adımlar ----------
       run(u, t) → {probe:{x,z,rot,tilt,press}, n: iğne, inj, pool, dent, finger, doppler, tags:[...], lab:[...]} */
    const IPT = {x: 10.2, d: 22.8, z: 0}, IPE = {x: 40, d: 0, z: 0};
    const OPT = {x: 9.8, d: 23, z: 0}, OPE = {x: 9.8, d: 0, z: 14};
    const ipN = mkN(IPE, IPT), opN = mkN(OPE, OPT);
    const CAM = {
      over: [[0, .06, 0], .55, .62, 1.0], top: [[0, .06, 0], .42, .55, .78], press: [[-.006, .055, 0], .36, .3, 1.12], finger: [[-.018, .066, 0], .3, -.75, 1.05],
      ip: [[.016, .06, 0], .4, .08, 1.22], ipN: [[.02, .052, 0], .28, .12, 1.28], oop: [[.008, .058, .01], .38, 1.45, 1.2], oopT: [[.006, .062, .01], .42, 1.05, .98]
    };
    const P0 = {x: 0, z: 0, rot: 0, tilt: 0, press: 0};
    const TRACKS = {
      part: [
        {cam: CAM.over, run: () => ({probe: P0, tags: ['beam', 'mark', 'nerve', 'artery', 'vein']})},
        {run: u => ({probe: P0, finger: {x: -30, a: 3.5 * tri(u)}, dent: {x: -22, a: 3.8 * tri(u)}, tags: ['mark']}), loop: 2.6, cam: CAM.finger},
        {cam: CAM.press, run: u => ({probe: Object.assign({}, P0, {press: tri(u)}), tags: ['vein', 'artery']}), loop: 3.2},
        {cam: CAM.top, run: u => ({probe: Object.assign({}, P0, {z: 14 * Math.sin(u * Math.PI * 2)}), tags: ['nerve', 'artery']}), loop: 7, linear: true},
        {cam: CAM.top, run: u => { const r = u < .35 ? 35 * ease(u / .35) : u < .55 ? 35 + 55 * ease((u - .35) / .2) : u < .75 ? 90 : 90 * (1 - ease((u - .75) / .25)); return {probe: Object.assign({}, P0, {rot: r * D2R}), tags: ['nerve']}; }, loop: 8, linear: true},
        {cam: CAM.oopT, run: u => ({probe: Object.assign({}, P0, {tilt: 24 * D2R * Math.sin(u * Math.PI * 2)}), doppler: true, tags: ['nerve', 'artery']}), loop: 7, linear: true}
      ],
      ip: [
        {cam: CAM.ip, run: () => ({probe: Object.assign({}, P0, {x: 8}), n: Object.assign({}, ipN, {L: 0}), tags: ['nerve', 'beam']})},
        {cam: CAM.ip, run: u => ({probe: Object.assign({}, P0, {x: 8}), n: extend(ipN, ipN.Lf * .45 * ease(u)), tags: ['beam']})},
        {cam: CAM.ipN, run: u => ({probe: Object.assign({}, P0, {x: 8}), n: extend(ipN, ipN.Lf * (.45 + .55 * ease(u))), tags: ['tip', 'echo', 'nerve'], tip: true})},
        {cam: CAM.top, run: u => {
          /* Hizasızlık: iğne 7° dışa döner → yalnız gövdenin bir kısmı görünür, uç kaybolur; sonra düzeltme */
          const yaw = (u < .55 ? 7 : 7 * (1 - ease((u - .55) / .45))) * D2R, N = mkN(IPE, {x: IPE.x + (IPT.x - IPE.x), d: IPT.d, z: (IPT.x - IPE.x) * -Math.tan(yaw)});
          return {probe: Object.assign({}, P0, {x: 8}), n: extend(N, N.Lf * (u < .55 ? .55 + .45 * ease(u / .55) : 1)), tags: u < .55 ? ['stop'] : ['tip'], tip: true};
        }, loop: 7},
        {cam: CAM.ip, run: u => {
          /* Açı: dik giriş (≈52°) ile yatık giriş (≈35°) karşılaştırması */
          const steep = u < .5, E = steep ? {x: 28, d: 0, z: 0} : {x: 44, d: 0, z: 0}, N = mkN(E, IPT), w = seg(u % .5, 0, .3);
          return {probe: P0, n: extend(N, N.Lf * (.35 + .65 * ease(w))), tags: ['tip'], tip: true, angle: Math.round(Math.atan2(IPT.d, E.x - IPT.x) / D2R)};
        }, loop: 8, linear: true},
        {cam: CAM.ipN, run: u => ({probe: Object.assign({}, P0, {x: 8}), n: ipN, pool: {x: IPT.x, d: IPT.d, z: 0, r: 2.2 * Math.min(1, seg(u, 0, .3)) * (1 - seg(u, .5, .7) * .6)}, inj: ease(seg(u, .4, 1)), tags: ['nerve', 'tip'], tip: true}), loop: 6}
      ],
      oop: [
        {cam: CAM.oop, run: () => ({probe: Object.assign({}, P0, {z: 0}), n: Object.assign({}, opN, {L: 0}), tags: ['nerve', 'beam']})},
        {cam: CAM.oop, run: u => ({probe: P0, n: extend(opN, opN.Lf * ease(u)), tags: ['beam'], dot: true})},
        {cam: CAM.oop, run: u => {
          /* Dinamik iğne ucu konumlandırma: prob iğneden uzağa kaydırılır, uç yeniden görünene kadar iğne ilerletilir */
          const k = Math.min(5, Math.floor(u * 6)), w = ease((u * 6) % 1);
          const zb = k < 1 ? 3 : k < 2 ? 3 : k < 3 ? 3 - 1.5 * w : k < 4 ? 1.5 : k < 5 ? 1.5 - 1.5 * w : 0;
          const L = z => (OPE.z - z) / -opN.u.z;
          const Ln = k < 1 ? L(3) * (.4 + .6 * w) : k < 3 ? L(3) : k < 4 ? L(3) + (L(1.5) - L(3)) * w : k < 5 ? L(1.5) : L(1.5) + (L(0) - L(1.5)) * w;
          return {probe: Object.assign({}, P0, {z: zb}), n: extend(opN, Ln), tags: ['tip'], dot: true};
        }, loop: 10, linear: true},
        {cam: CAM.oop, run: u => { const a = 22 * (1 - ease(u)) * D2R, Ln = OPE.z / (-opN.u.z + opN.u.d * Math.tan(a)); return {probe: Object.assign({}, P0, {tilt: a}), n: extend(opN, Ln), tags: ['tip'], dot: true}; }, loop: 6},
        {cam: CAM.oop, run: u => ({probe: P0, n: opN, pool: {x: OPT.x, d: OPT.d, z: 0, r: 2 * Math.min(1, seg(u, 0, .3)) * (1 - seg(u, .5, .7) * .6)}, inj: ease(seg(u, .4, 1)), tags: ['nerve', 'tip'], dot: true}), loop: 6},
        {cam: CAM.oop, run: u => ({probe: P0, n: extend(opN, opN.Lf * (1 + .36 * ease(u))), tags: u > .4 ? ['shaft'] : ['tip'], dot: true, over: u > .4}), loop: 5}
      ]
    };

    /* ---------- Serbest mod ----------
       f: {x, z (mm), tilt, rot (°), press (0–1), adv (iğne yolu oranı), doppler}. Plan içi sahnede prob x = 8 mm'den başlar.
       İğne giriş noktası fantoma bağlıdır: prob hareket eder, iğne yerinde kalır (hizalama böyle öğrenilir). */
    const FREE_LIM = {x: 20, z: 22};
    function freeRun() {
      const f = S.free, tr = S.track;
      const probe = {x: f.x + (tr === 'ip' ? 8 : 0), z: f.z, rot: f.rot * D2R, tilt: f.tilt * D2R, press: f.press};
      if (tr === 'part') return {probe, doppler: f.doppler, tags: ['nerve', 'artery', 'vein']};
      const N = tr === 'ip' ? ipN : opN;
      return {probe, n: extend(N, Math.max(0, N.Lf * f.adv)), doppler: f.doppler, tags: ['tip'], tip: tr === 'ip', dot: tr === 'oop', over: tr === 'oop' && f.adv > 1.03};
    }
    /* İğnenin görüntü düzlemine göre durumu: ucu düzlemde mi, gövdenin ne kadarı düzlemde (ışın kalınlığı ≈ ±1 mm) */
    const planeN = pz => ({x: pz.L.d * pz.Dn.z - pz.L.z * pz.Dn.d, d: pz.L.z * pz.Dn.x - pz.L.x * pz.Dn.z, z: pz.L.x * pz.Dn.d - pz.L.d * pz.Dn.x});
    /* İğne ekseninin görüntü düzlemini kestiği uzaklık (girişten mm; paralelse ∞) */
    function crossAt(N, pz) {
      const n = planeN(pz), un = N.u.x * n.x + N.u.d * n.d + N.u.z * n.z;
      return Math.abs(un) < 1e-6 ? Infinity : ((pz.O.x - N.E.x) * n.x + (0 - N.E.d) * n.d + (pz.O.z - N.E.z) * n.z) / un;
    }
    function needleView(r, pz) {
      if (!r.n || r.n.L <= 0) return null;
      const {x: nx, d: nd, z: nz} = planeN(pz);
      const dist = s => { const px = r.n.E.x + r.n.u.x * s - pz.O.x, pd = r.n.E.d + r.n.u.d * s, pzz = r.n.E.z + r.n.u.z * s - pz.O.z; return {off: Math.abs(px * nx + pd * nd + pzz * nz), lat: px * pz.L.x + pzz * pz.L.z}; };
      const hw = 19, ok = q => q.off < 1.1 && Math.abs(q.lat) < hw;
      let k = 0, n = 0; for (let s = 0; s <= r.n.L; s += 1, n++) if (ok(dist(s))) k++;
      return {tip: ok(dist(r.n.L)), frac: n ? k / n : 0, tc: crossAt(r.n, pz), L: r.n.L};
    }

    /* ---------- Durum ve döngü ---------- */
    const S = {track: 'part', i: 0, t0: 0, now: 0, free: null};
    let cur = null, info = null;
    function setFree(f) {
      const was = !!S.free;
      S.free = f ? Object.assign({x: 0, z: 0, tilt: 0, rot: 0, press: 0, adv: 0, doppler: false}, S.free || {}, f) : null;
      S.free && (S.free.x = clamp(S.free.x, -FREE_LIM.x, FREE_LIM.x), S.free.z = clamp(S.free.z, -FREE_LIM.z, FREE_LIM.z));
      if (S.free && !was) { const c = S.track === 'part' ? CAM.top : S.track === 'ip' ? CAM.ip : CAM.oop; view.focus(V3(...c[0]), c[1], c[2], c[3]); }
      if (!S.free && was) go(S.track, S.i);
    }
    /* Probu sürükleme: işaretçi ışını deri düzlemini nerede kesiyorsa prob o kadar kayar */
    const skinPlane = new THREE.Plane(V3(0, 1, 0), -SKIN_Y), hitP = new THREE.Vector3();
    let drag = null;
    const onSkin = ray => ray.ray.intersectPlane(skinPlane, hitP) ? F.worldToLocal(hitP.clone()) : null;
    view.hits = (view.hits || []).concat({obj: P.g, drag: true, hover: () => true, on(type, u, v, ray) {
      if (type === 'down') { const q = ray && onSkin(ray); if (!q) return false; if (!S.free) setFree({}); drag = {q, x: S.free.x, z: S.free.z}; api.onDrag && api.onDrag(S.free); return true; }
      if (type === 'move' && drag) { const q = onSkin(ray); if (q) { setFree({x: drag.x + q.x - drag.q.x, z: drag.z + q.z - drag.q.z}); api.onDrag && api.onDrag(S.free); } return true; }
      if (type === 'up') drag = null;
      return true;
    }});
    function go(track, i, instant) {
      S.track = track; S.i = i; S.t0 = S.now;
      if (S.free) { S.free = null; drag = null; }
      const st = TRACKS[track][i], [t, d, th, ph] = st.cam;
      if (instant) view.jumpTo(V3(...t), d, th, ph); else view.focus(V3(...t), d, th, ph);
      view.auto = false;
    }
    function frame(t) {
      const st = TRACKS[S.track][S.i], loop = st.loop || 0, e = t - S.t0;
      const u = REDUCED_MOTION || !loop ? 1 : st.linear ? (e % loop) / loop : ease(clamp((e % (loop + 1.2)) / loop, 0, 1));
      const r = S.free ? freeRun() : st.run(u, t); cur = r;
      const pr = r.probe, pz = USIM.pose(pr.x, pr.z, pr.rot, pr.tilt, pr.press); pz.press = pr.press;
      info = S.free ? needleView(r, pz) : null;
      /* Plan dışı serbest modda: düzlemi uçtan önce kesen iğne gövdesidir (ekrandaki parlak nokta uç sanılabilir) */
      if (S.free && S.track === 'oop' && r.n) { const tc = crossAt(r.n, pz); r.over = tc > 0 && tc < r.n.L - 1.5; if (r.over) r.tags = ['shaft']; }
      placeProbe(pz);
      placeNeedle(r.n ? (r.n.L > 0 ? r.n : extend(r.n, -.5)) : null);   /* L ≤ 0: uç cildin hemen üstünde */
      /* Ven basınçla yassılır (yalnız y ekseninde, merkezi aşağı kayar) */
      { const k = Math.max(.08, 1 - (pr.press || 0) * .92), cv = USIM.cyl(PH.vein, 0); vein.scale.y = k; vein.position.y = -(cv.d + PH.vein.r) * (1 - k); }
      finger.visible = !!r.finger; if (r.finger) finger.position.set(r.finger.x, 8.2 - r.finger.a * 2, 0);
      pool.visible = !!(r.pool && r.pool.r > .05); if (pool.visible) { pool.position.set(r.pool.x, -r.pool.d, r.pool.z); pool.scale.setScalar(r.pool.r); }
      halo.visible = (r.inj || 0) > .02; if (halo.visible) { const cn = USIM.cyl(PH.nerve, 0), rr = PH.nerve.r + r.inj * 3.4; halo.position.set(cn.x, -cn.d, 0); halo.scale.set(rr, 1, rr); }
      /* Simülasyon durumu */
      const pulse = Math.max(0, Math.sin(t * 7.5)) ** 2;
      const needles = r.n && r.n.L > 0 ? [r.n] : [];
      const tipW = r.n ? {x: r.n.E.x + r.n.u.x * r.n.L, d: r.n.E.d + r.n.u.d * r.n.L, z: r.n.E.z + r.n.u.z * r.n.L} : null;
      scan.o.doppler = !!r.doppler;
      const sim = {pose: pz, press: pr.press || 0, pulse, needles, inj: r.inj || 0, tipPool: r.pool || null, dent: r.dent || null,
        labels: toImage => {
          const out = USIM.anatomyLabels(TX.img, toImage, pr.z || 0);
          if (tipW && r.n.L > 0) {
            const p = toImage(tipW.x, tipW.d, tipW.z, 1.2);
            if (p && (r.tip || r.dot) && !r.over) out.push({t: TX.img.tip, X: p.X, Y: p.Y, c: '#7FE0D1', dx: 14, dy: 10});
            if (r.dot && r.n) {
              /* Plan dışı: düzlemi kesen nokta (gövde olabilir) */
              const tc = crossAt(r.n, pz);
              if (r.over && tc > 0 && tc < r.n.L) { const q = toImage(r.n.E.x + r.n.u.x * tc, r.n.E.d + r.n.u.d * tc, r.n.E.z + r.n.u.z * tc, 1.5); if (q) out.push({t: TX.img.shaft, X: q.X, Y: q.Y, c: '#FF8A80', dx: 14, dy: 8}); }
            }
          }
          if (r.angle) out.push({t: `${r.angle}°`, X: 16, Y: 3, c: '#E6EEF2', dx: -60, dy: 0});
          return out;
        }};
      scan.render(sim, t);
      /* 3B etiketler */
      Object.keys(tags).forEach(k => { tags[k].show = false; });
      const on = new Set(r.tags || []);
      if (on.has('beam')) setTag('beam', P.g.localToWorld(V3(.016, -.032, 0)));
      if (on.has('mark')) setTag('mark', P.g.localToWorld(V3(-.03, .014, 0)));
      const zc = pr.z || 0, nc = USIM.cyl(PH.nerve, zc + 12), ac = USIM.cyl(PH.artery, zc - 14), vc = USIM.cyl(PH.vein, zc + 16);
      if (on.has('nerve')) setTag('nerve', W(nc.x + 3, nc.d - 4, zc + 12));
      if (on.has('artery')) setTag('artery', W(ac.x, ac.d + 4, zc - 14));
      if (on.has('vein')) setTag('vein', W(vc.x - 3, vc.d - 4, zc + 16));
      if (tipW && r.n.L > 0) {
        const tp = W(tipW.x, tipW.d - 4, tipW.z);
        if (on.has('tip')) setTag('tip', tp); if (on.has('stop')) setTag('stop', tp); if (on.has('shaft')) setTag('shaft', tp);
        if (on.has('echo')) setTag('echo', W(tipW.x - r.n.u.x * 10, tipW.d - r.n.u.d * 10 - 5, tipW.z - r.n.u.z * 10));
      }
    }
    view.tick.push((dt, t) => { S.now = t; frame(t); });
    view.onReset = () => { if (S.free) { const c = S.track === 'part' ? CAM.top : S.track === 'ip' ? CAM.ip : CAM.oop; view.focus(V3(...c[0]), c[1], c[2], c[3]); } else go(S.track, S.i); };
    go('part', 0, true);
    const api = {go, count: k => TRACKS[k].length, scan, view, state: () => cur, setFree, free: () => S.free, info: () => info, track: () => S.track, onDrag: null};
    return api;
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  return {mount};
})();
