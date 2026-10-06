'use strict';
/* İleri Monitörizasyon Atlası · 3B hasta modeli ve uygulama (yerleştirme) sahneleri
   Hasta: gerçek baş taraması (Lee Perry-Smith, Infinite-Realities, CC BY 3.0; models/head/LICENSE.txt).
   Model yüklendikten sonra yüz profilinden burun ucu, burun kökü (nasion) ve glabella otomatik bulunur;
   sensör konumları ve kamera açıları bu işaret noktalarına göre hesaplanır. Sensörler yüzeye ışın atılarak
   yerleştirilir; aynı yardımcılar (yüzeye oturan yama, şerit, kablo) farklı cihazlarda yeniden kullanılır.
   Koordinatlar metre cinsindendir; yüz +z yönüne bakar, hastanın solu +x tarafıdır. */
const ICA3D = (() => {
  if (typeof K3 === 'undefined' || !K3 || !THREE.GLTFLoader) return null;
  const {std} = K3;
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  const MODEL = 'models/head/';
  const SCALE = .047;            // tarama birimi → metre (çene–tepe ≈ 23 cm)

  const MAT = {
    sensor: std(0xF2F5F7, .5, 0, {side: THREE.DoubleSide}),
    cable: std(0x2E363C, .45, .05),
    plug: std(0x5B6F7C, .4, .2)
  };

  /* Model ve dokular tek kez yüklenir, her sahne kendi kopyasını alır */
  let headAsset = null;
  function loadHead() {
    if (headAsset) return headAsset;
    const base = ICA.root + MODEL, tl = new THREE.TextureLoader();
    const tex = (f, srgb) => new Promise(res => tl.load(base + f, t => { if (srgb) t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; res(t); }, undefined, () => res(null)));
    headAsset = Promise.all([
      new Promise((res, rej) => new THREE.GLTFLoader().load(base + 'LeePerrySmith.glb', g => res(g.scene.getObjectByName('LeePerrySmith') || g.scene.children.find(o => o.isMesh)), undefined, rej)),
      tex('Map-COL.jpg', true), tex('Infinite-Level_02_Tangent_SmoothUV.jpg', false)
    ]).then(([mesh, map, normalMap]) => {
      const mat = new THREE.MeshStandardMaterial({map, normalMap, roughness: .62, metalness: 0});
      if (normalMap) mat.normalScale.set(.8, .8);
      return {geometry: mesh.geometry, material: mat};
    });
    return headAsset;
  }

  function buildPatient(root, asset) {
    const head = new THREE.Mesh(asset.geometry, asset.material);
    head.scale.setScalar(SCALE);
    asset.geometry.computeBoundingBox();
    head.position.y = -asset.geometry.boundingBox.min.y * SCALE;   // büstün tabanı zeminde
    head.castShadow = head.receiveShadow = true;
    root.add(head); head.updateMatrixWorld(true);
    return head;
  }

  /* Yüzey yardımcıları */
  const ray = new THREE.Raycaster(), tri = new THREE.Triangle(), bary = new THREE.Vector3();
  const nA = new THREE.Vector3(), nB = new THREE.Vector3(), nC = new THREE.Vector3();
  /* Işın isabetinde üçgen içi yumuşatılmış normal (dünya koordinatında) */
  function smoothHit(mesh, hit, off = 0) {
    if (!hit) return null;
    const g = mesh.geometry, pos = g.attributes.position, nrm = g.attributes.normal, f = hit.face;
    const local = mesh.worldToLocal(hit.point.clone());
    tri.set(new THREE.Vector3().fromBufferAttribute(pos, f.a), new THREE.Vector3().fromBufferAttribute(pos, f.b), new THREE.Vector3().fromBufferAttribute(pos, f.c));
    tri.getBarycoord(local, bary);
    nA.fromBufferAttribute(nrm, f.a); nB.fromBufferAttribute(nrm, f.b); nC.fromBufferAttribute(nrm, f.c);
    const n = new THREE.Vector3().addScaledVector(nA, bary.x).addScaledVector(nB, bary.y).addScaledVector(nC, bary.z).transformDirection(mesh.matrixWorld);
    return {point: hit.point.clone().addScaledVector(n, off), normal: n};
  }

  /* Bir izdüşüm işlevinden yüzeye oturan yama ve şerit üreticileri */
  function tools(project) {
    /* Yüzeye oturan dikdörtgen yama (doku saydamlığıyla daire veya yuvarlak köşe elde edilir) */
    function patch(center, w, h, mat, off = .002, rot = 0) {
      const n = center.normal, up = Math.abs(n.y) > .95 ? V3(0, 0, -1) : V3(0, 1, 0);
      const u = new THREE.Vector3().crossVectors(up, n).normalize(), v = new THREE.Vector3().crossVectors(n, u);
      if (rot) { u.applyAxisAngle(n, rot); v.applyAxisAngle(n, rot); }
      const pg = new THREE.PlaneGeometry(w, h, Math.max(4, Math.round(w / .004)), Math.max(4, Math.round(h / .004))), gp = pg.attributes.position;
      for (let i = 0; i < gp.count; i++) {
        const s = project(center.point.clone().addScaledVector(u, gp.getX(i)).addScaledVector(v, gp.getY(i)), off);
        gp.setXYZ(i, s.point.x, s.point.y, s.point.z);
      }
      pg.computeVertexNormals();
      const m = new THREE.Mesh(pg, mat); m.castShadow = true; m.userData.normal = n; return m;
    }

    /* Kontrol noktalarından geçen, yüzeye yapışık şerit; reveal ile kademeli gösterilir */
    function ribbon(ctrl, w, mat, off = .0015, per = 40) {
      const curve = new THREE.CatmullRomCurve3(ctrl, false, 'centripetal'), N = per * (ctrl.length - 1);
      const P = [], Nn = [];
      for (let i = 0; i <= N; i++) { const s = project(curve.getPoint(i / N), off); P.push(s.point); Nn.push(s.normal); }
      const verts = [], idx = [];
      for (let i = 0; i <= N; i++) {
        const T = P[Math.min(N, i + 1)].clone().sub(P[Math.max(0, i - 1)]).normalize();
        const side = new THREE.Vector3().crossVectors(T, Nn[i]).normalize().multiplyScalar(w / 2);
        verts.push(P[i].x + side.x, P[i].y + side.y, P[i].z + side.z, P[i].x - side.x, P[i].y - side.y, P[i].z - side.z);
        if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
      }
      const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3)); rg.setIndex(idx); rg.computeVertexNormals();
      const mesh = new THREE.Mesh(rg, mat); mesh.castShadow = true;
      /* Her kontrol noktasının şerit üzerindeki parça indeksi */
      const at = ctrl.map(c => { const s = project(c, off).point; let best = 0, bd = 1e9; P.forEach((q, i) => { const d = q.distanceToSquared(s); if (d < bd) { bd = d; best = i; } }); return best; });
      return {mesh, N, at, points: P, normals: Nn, reveal(k) { rg.setDrawRange(0, Math.round(clamp(k, 0, N)) * 6); }};
    }
    return {patch, ribbon};
  }

  function surfaceKit(head) {
    const box = new THREE.Box3().setFromObject(head);
    const cast = (origin, dir) => { ray.set(origin, dir.clone().normalize()); return ray.intersectObject(head, false)[0]; };

    /* Yüz profili: orta hatta önden paralel ışınlar */
    const prof = [];
    for (let y = box.min.y + (box.max.y - box.min.y) * .45; y < box.max.y - .005; y += .0015) {
      const h = cast(V3(0, y, box.max.z + .2), V3(0, 0, -1)); if (h) prof.push({y, z: h.point.z});
    }
    const argmax = (a, f) => a.reduce((b, p) => f(p) > f(b) ? p : b);
    const inY = (a, b) => prof.filter(p => p.y >= a && p.y <= b);
    const noseTip = argmax(inY(box.min.y, box.min.y + (box.max.y - box.min.y) * .8), p => p.z);
    const nasion = argmax(inY(noseTip.y + .015, noseTip.y + .06), p => -p.z);
    const glabella = argmax(inY(nasion.y, nasion.y + .035), p => p.z);
    const top = box.max.y, chin = noseTip.y - .065;
    const cy = (top + chin) / 2;
    const fz = cast(V3(0, cy, box.max.z + .2), V3(0, 0, -1)).point.z, bz = cast(V3(0, cy, box.min.z - .2), V3(0, 0, 1)).point.z;
    const wy = nasion.y + .035, wx = cast(V3(box.max.x + .2, wy, (fz + bz) / 2), V3(-1, 0, 0)).point.x;
    const C = V3(0, cy, (fz + bz) / 2), HX = wx, HZ = (fz - bz) / 2;
    const L = {C, nasion: nasion.y, glabella: glabella.y, noseTip: noseTip.y, top};

    /* p noktasının merkezden geçen doğrultudaki yüzey izdüşümü; yumuşatılmış normal ile */
    function project(p, off = 0) {
      const dir = p.clone().sub(C).normalize();
      return smoothHit(head, cast(C.clone().addScaledVector(dir, .4), dir.clone().negate()), off) || {point: p.clone(), normal: dir};
    }
    /* Ön yüzde x (orta hattan uzaklık) ve mutlak y ile nokta */
    const front = (x, y, off) => project(V3(x, y, C.z + HZ), off);
    /* Yanal açı (az: 0 = ön, π/2 = yan) ve mutlak y ile nokta */
    const around = (az, y, off) => project(V3(C.x + Math.sin(az) * HX, y, C.z + Math.cos(az) * HZ), off);

    return {L, project, front, around, ...tools(project)};
  }

  function canvasTex(w, h, draw) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t;
  }
  const ACCENT = 0x0F8C7E;

  function electrodeMat(label) {
    const map = canvasTex(128, 128, (g, w) => {
      g.clearRect(0, 0, w, w);
      g.fillStyle = '#F7F8F9'; g.beginPath(); g.arc(64, 64, 62, 0, 7); g.fill();
      g.strokeStyle = '#B9C3C9'; g.lineWidth = 3; g.stroke();
      g.strokeStyle = '#0F8C7E'; g.lineWidth = 9; g.beginPath(); g.arc(64, 64, 42, 0, 7); g.stroke();
      g.fillStyle = '#1B2328'; g.font = '700 46px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, 64, 66);
    });
    return std(0xffffff, .55, 0, {map, alphaTest: .5, transparent: true, side: THREE.DoubleSide});
  }
  function padMat() {
    const map = canvasTex(256, 128, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      const r = 46; g.fillStyle = '#F7F8F9'; g.beginPath(); g.moveTo(r, 2); g.arcTo(w - 2, 2, w - 2, h - 2, r); g.arcTo(w - 2, h - 2, 2, h - 2, r); g.arcTo(2, h - 2, 2, 2, r); g.arcTo(2, 2, w - 2, 2, r); g.closePath(); g.fill();
      g.strokeStyle = '#B9C3C9'; g.lineWidth = 3; g.stroke();
      g.fillStyle = '#D9483B'; g.beginPath(); g.arc(w - 40, h / 2, 11, 0, 7); g.fill();          // ışık kaynağı
      g.fillStyle = '#26323A'; [w - 120, w - 172].forEach(x => { g.beginPath(); g.arc(x, h / 2, 13, 0, 7); g.fill(); }); // yakın ve uzak dedektör
      g.strokeStyle = '#0F8C7E'; g.lineWidth = 4; g.beginPath(); g.moveTo(26, h / 2 - 20); g.lineTo(26, h / 2 + 20); g.stroke();
    });
    return std(0xffffff, .55, 0, {map, alphaTest: .5, transparent: true, side: THREE.DoubleSide});
  }
  const glowMat = () => new THREE.MeshBasicMaterial({color: ACCENT, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2});

  /* Ortak animasyon: yerine inen parça (normal boyunca yükseklik + saydamlık) */
  function dropper(mesh) {
    const n = mesh.userData.normal; let lift = .03, op = 0, goal = 0;
    mesh.material.opacity = 0; mesh.visible = false;
    return {
      set on(v) { goal = v ? 1 : 0; },
      get on() { return goal === 1; },
      jump() { lift = goal ? 0 : .03; op = goal; },
      step(dt) {
        const k = REDUCED_MOTION ? 1 : 1 - Math.exp(-dt * 7);
        lift += ((goal ? 0 : .03) - lift) * k; op += (goal - op) * k;
        mesh.position.copy(n).multiplyScalar(lift); mesh.material.opacity = op; mesh.visible = op > .01;
      }
    };
  }
  function pulseRing(center, r) {
    const m = new THREE.Mesh(new THREE.RingGeometry(r, r * 1.14, 48), new THREE.MeshBasicMaterial({color: ACCENT, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide}));
    m.position.copy(center.point).addScaledVector(center.normal, .004); m.lookAt(center.point.clone().add(center.normal)); return m;
  }
  function cable(points, r = .0022) {
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, 'centripetal'), 96, r, 10, false), MAT.cable);
    m.castShadow = true; return m;
  }
  const lerp = (a, b, t) => a.clone().lerp(b, t);

  /* ---------- Frontal EEG sensörü (dört elektrotlu şerit) ---------- */
  function buildEEG(view, kit) {
    const {L, front, around, patch, ribbon} = kit, C = L.C;
    const eye = L.nasion - .004, brow = L.glabella;
    const e1 = front(0, L.nasion + .05), e4 = front(.03, brow + .014), e2 = front(.015, (L.nasion + .05 + brow + .014) / 2), e3 = around(1.04, eye + .006);
    const mid = around(.74, brow + .008), t1 = around(1.24, eye + .008), t2 = around(1.4, eye + .012);
    const strip = ribbon([e1.point, e2.point, e4.point, mid.point, e3.point, t1.point, t2.point], .009, MAT.sensor);
    view.root.add(strip.mesh); strip.reveal(0);
    const prep = ribbon([e1.point, e2.point, e4.point, mid.point, e3.point], .036, glowMat(), .001, 30); view.root.add(prep.mesh);

    const E = {1: e1, 2: e2, 3: e3, 4: e4};
    const el = {}, rings = {}, tags = {};
    for (const k of [1, 2, 3, 4]) {
      const m = patch(E[k], .019, .019, electrodeMat(String(k)), .0024); view.root.add(m); el[k] = dropper(m);
      rings[k] = pulseRing(E[k], .0105); view.root.add(rings[k]);
      /* Etiketi elektrodun üstüne değil, şeridin dışına (yukarı-yana) koy */
      const off = k === 3 ? V3(0, .017, 0) : V3(.009, .013, 0);
      tags[k] = view.addTag(String(k), kit.project(E[k].point.clone().add(off), .004).point, 'num'); tags[k].normal = E[k].normal; tags[k].show = false;
    }
    /* Bağlantı ucu ve monitöre giden kablo */
    const endP = strip.points[strip.N], endT = endP.clone().sub(strip.points[strip.N - 4]).normalize();
    const plugPos = endP.clone().addScaledVector(endT, .016);
    const plug = new THREE.Mesh(new THREE.BoxGeometry(.012, .007, .03), MAT.plug); plug.position.copy(plugPos); plug.lookAt(plugPos.clone().add(endT)); plug.castShadow = true;
    const p0 = plugPos.clone().addScaledVector(endT, .015);
    const cab = cable([p0, p0.clone().add(V3(.03, -.02, -.01)), V3(C.x + .16, C.y - .07, C.z - .02), V3(C.x + .28, C.y - .16, C.z + .02), V3(C.x + .38, 0, C.z + .06)]);
    view.root.add(plug, cab);
    const check = view.addTag(ICA.t('pl.eeg.check'), V3(0, L.top + .025, C.z), 'ok'); check.show = false;

    const S = {reveal: 0, revealGoal: 0, prep: 0, press: false};
    const steps = [
      {cam: [V3(0, C.y - .03, C.z), .8, .55, 1.35]},
      {cam: [lerp(e1.point, e3.point, .45), .42, .55, 1.38], prep: 1},
      {cam: [e1.point, .3, .2, 1.42], on: [1], reveal: strip.at[0]},
      {cam: [e2.point, .3, .34, 1.45], on: [1, 2, 4], reveal: strip.at[2]},
      {cam: [lerp(e4.point, e3.point, .6), .32, .95, 1.45], on: [1, 2, 4, 3], reveal: strip.at[4]},
      {cam: [lerp(e2.point, e3.point, .4), .38, .6, 1.4], on: [1, 2, 4, 3], reveal: strip.at[4], press: true},
      {cam: [V3(C.x + .05, C.y - .01, C.z), .64, 1.0, 1.3], on: [1, 2, 4, 3], reveal: strip.N, plug: 1}
    ];
    function go(i, instant) {
      const s = steps[i];
      for (const k of [1, 2, 3, 4]) { el[k].on = (s.on || []).includes(k); tags[k].show = el[k].on; if (instant) el[k].jump(); }
      S.revealGoal = s.reveal || 0; S.prep = s.prep || 0; S.press = !!s.press;
      if (instant) S.reveal = S.revealGoal;
      check.show = !!s.plug;
      const [t, d, th, ph] = s.cam; if (instant) view.jumpTo(t, d, th, ph); else view.focus(t, d, th, ph);
    }
    view.tick.push((dt, t) => {
      const k = REDUCED_MOTION ? 1 : 1 - Math.exp(-dt * 3);
      S.reveal += (S.revealGoal - S.reveal) * k; strip.reveal(S.reveal);
      prep.mesh.material.opacity = S.prep ? .22 + .14 * Math.sin(t * 3) : prep.mesh.material.opacity * (1 - k);
      for (const n of [1, 2, 3, 4]) {
        el[n].step(dt);
        const r = rings[n], ph = (t * .9 + n * .23) % 1;
        r.material.opacity = S.press ? (1 - ph) * .9 : 0; r.scale.setScalar(1 + ph * .9);
      }
      plug.visible = cab.visible = S.reveal > strip.N - 2;
    });
    return {go, home: steps[0].cam};
  }

  /* ---------- NIRS: iki taraflı frontal sensör ---------- */
  function buildNIRS(view, kit) {
    const {L, front, around, patch} = kit, C = L.C;
    const y = L.glabella + .021;
    const sides = [{s: 1, key: 'left'}, {s: -1, key: 'right'}].map(({s, key}) => {
      const c = front(s * .027, y);
      /* Dokuda ışık kaynağı sağ uçta; sol taraf sensöründe yanal uç +x olsun diye döndür */
      const m = patch(c, .044, .022, padMat(), .0024, s > 0 ? 0 : Math.PI); view.root.add(m);
      const prep = patch(c, .056, .032, glowMat(), .0012); view.root.add(prep);
      /* Kablo sensörün yan ucundan çıkar, şakak boyunca ilerler ve yana, monitöre doğru iner */
      const a = around(s * .55, y, .003).point, b = around(s * .9, y - .006, .005).point, c2 = around(s * 1.2, y - .02, .008).point;
      const out = c2.clone().add(V3(s * .05, -.04, .01));
      const cab = cable([a, b, c2, out, V3(s * .28, C.y - .16, C.z + .03), V3(s * .38, 0, C.z + .07)], .0026);
      view.root.add(cab);
      const tag = view.addTag(ICA.t('pl.' + key), kit.project(c.point.clone().add(V3(0, .026, 0)), .004).point, 'side'); tag.normal = c.normal; tag.show = false;
      return {d: dropper(m), prep, cab, tag, key, c, ex: s > 0 ? 68 : 71};
    });
    const mid = lerp(sides[0].c.point, sides[1].c.point, .5);
    const S = {prep: 0, cables: 0};
    const steps = [
      {cam: [V3(0, C.y - .03, C.z), .8, -.4, 1.35]},
      {cam: [mid, .36, 0, 1.42], prep: 1},
      {cam: [sides[0].c.point, .3, .38, 1.45], on: ['left']},
      {cam: [sides[1].c.point, .3, -.38, 1.45], on: ['left', 'right']},
      {cam: [V3(0, C.y - .01, C.z), .64, .7, 1.32], on: ['left', 'right'], cables: 1},
      {cam: [mid, .4, 0, 1.42], on: ['left', 'right'], cables: 1, base: true}
    ];
    function go(i, instant) {
      const s = steps[i];
      for (const p of sides) {
        p.d.on = (s.on || []).includes(p.key); if (instant) p.d.jump();
        p.tag.show = p.d.on;
        p.tag.el.textContent = s.base ? `${ICA.t('pl.' + p.key)} · rSO₂ ${p.ex}` : ICA.t('pl.' + p.key);
      }
      S.prep = s.prep || 0; S.cables = s.cables || 0;
      const [t, d, th, ph] = s.cam; if (instant) view.jumpTo(t, d, th, ph); else view.focus(t, d, th, ph);
    }
    view.tick.push((dt, t) => {
      for (const p of sides) {
        p.d.step(dt);
        p.prep.material.opacity = S.prep ? .22 + .14 * Math.sin(t * 3) : 0;
        p.cab.visible = S.cables > 0 && p.d.on;
      }
    });
    return {go, home: steps[0].cam};
  }


  /* =====================================================================
     Tam vücut hasta: MakeHuman CC0 varlıklarından üretilen model (tools/build-body.cjs).
     Ameliyat masasında sırtüstü, kollar kol tahtasında, avuç içi yukarı; alt gövde cerrahi örtüyle örtülü.
     Model ayakta duran pozda kaydedilir; burada x ekseni çevresinde döndürülerek yatırılır
     (baş −z, ayaklar +z, ön yüz +y; hastanın solu +x).
     ===================================================================== */
  const TABLE_TOP = .9, TABLE_HALF = .27;
  let bodyAsset = null;
  function loadBody() {
    if (!bodyAsset) bodyAsset = new Promise((res, rej) => new THREE.GLTFLoader().load(ICA.root + 'models/body/patient.glb', g => res(g.scene), undefined, rej));
    return bodyAsset;
  }

  function buildTheatre(root, scene, opts = {}) {
    const pt = scene.clone(true), group = new THREE.Group();
    group.add(pt); group.rotation.x = -Math.PI / 2; root.add(group);
    let body = null;
    pt.traverse(o => { if (o.isMesh) { o.castShadow = o.receiveShadow = o.name !== 'eyelashes' && o.name !== 'eyebrows'; if (o.name === 'body') body = o; } });
    group.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(body);
    group.position.set(0, TABLE_TOP - box.min.y - .006, -(box.min.z + box.max.z) / 2);
    group.updateMatrixWorld(true);
    const lmData = (pt.getObjectByName('patient') || pt).userData.landmarks || {};
    const lm = k => pt.localToWorld(V3(...lmData[k]));

    /* Şematik anatomi sahnelerinde deri yarı saydam (yalnızca bu sahnenin kopyası) */
    if (opts.xray) pt.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = o.name === 'body' ? .3 : .15; o.material.depthWrite = false; o.castShadow = false; } });
    /* Gövde köşeleri (dünya koordinatında) — örtü ve kol tahtası yüksekliği için */
    const bp = body.geometry.attributes.position, W = [];
    for (let i = 0; i < bp.count; i++) W.push(V3(bp.getX(i), bp.getY(i), bp.getZ(i)).applyMatrix4(body.matrixWorld));
    const bb = new THREE.Box3().setFromPoints(W);

    const M = {
      pad: std(0x2A3035, .78, 0), padTop: std(0x343C42, .7, 0), steel: std(0xC9D0D5, .3, .85),
      base: std(0x8E989F, .45, .4), gel: std(0x6FA9C4, .35, 0, {transparent: true, opacity: .85}),
      drape: std(0x3F86A0, .92, 0, {side: THREE.DoubleSide})
    };
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; root.add(m); return m; };
    /* Masa: yastıklı tabla, yan raylar, kolon ve taban */
    const zMin = bb.min.z - .1, zMax = bb.max.z + .12, len = zMax - zMin, zc = (zMin + zMax) / 2;
    add(new THREE.BoxGeometry(TABLE_HALF * 2, .07, len), M.pad, 0, TABLE_TOP - .035, zc);
    add(new THREE.BoxGeometry(TABLE_HALF * 2 - .02, .012, len - .02), M.padTop, 0, TABLE_TOP - .004, zc);
    [-1, 1].forEach(s => add(new THREE.BoxGeometry(.012, .028, len - .1), M.steel, s * (TABLE_HALF + .012), TABLE_TOP - .06, zc));
    add(new THREE.BoxGeometry(.32, TABLE_TOP - .2, .42), M.base, 0, (TABLE_TOP - .2) / 2 + .06, zc);
    add(new THREE.BoxGeometry(.62, .06, 1.05), M.base, 0, .03, zc);

    /* Kol tahtaları: kolun arka yüzünün altında */
    [-1, 1].forEach(s => {
      const sh = lm(s > 0 ? 'upperarm01.L' : 'upperarm01.R'), wr = lm(s > 0 ? 'wrist.L' : 'wrist.R');
      const arm = W.filter(p => s * p.x > Math.abs(sh.x) + .1);
      const top = Math.min(...arm.map(p => p.y)) - .002, x0 = TABLE_HALF - .02, x1 = Math.max(...arm.map(p => s * p.x)) + .06;
      const z = wr.z;
      add(new THREE.BoxGeometry(x1 - x0, .045, .16), M.pad, s * (x0 + x1) / 2, top - .0225, z);
      add(new THREE.CylinderGeometry(.018, .018, top - .045 - (TABLE_TOP - .07), 16), M.steel, s * (x0 + .05), (top - .045 + TABLE_TOP - .07) / 2, z);
    });

    /* Jel baş halkası */
    const hd = lm('head'), headPts = W.filter(p => p.z < hd.z + .02 && Math.abs(p.x) < .09);
    const headBack = Math.min(...headPts.map(p => p.y));
    const ring = add(new THREE.TorusGeometry(.065, .028, 16, 40), M.gel, 0, Math.max(TABLE_TOP + .02, headBack - .02), hd.z + .03);
    ring.rotation.x = Math.PI / 2;

    /* Cerrahi örtü: göbek altından ayak ucuna; gövde köşelerinden yükseklik haritası, yanlardan sarkar */
    const hip = lm('upperleg01.L'), z0 = hip.z + (opts.groin ? .16 : -.14), z1 = bb.max.z + .1, X = TABLE_HALF + .16, step = .018;
    const nx = Math.round(2 * X / step), nz = Math.round((z1 - z0) / step);
    const H = new Float32Array((nx + 1) * (nz + 1)).fill(TABLE_TOP);
    const at = (i, j) => j * (nx + 1) + i;
    for (const p of W) {
      if (p.z < z0 || p.z > z1 || Math.abs(p.x) > TABLE_HALF) continue;
      const i = Math.round((p.x + X) / step), j = Math.round((p.z - z0) / step);
      if (p.y > H[at(i, j)]) H[at(i, j)] = p.y;
    }
    /* Genişlet (boşlukları kapat) ve yumuşat: kumaşın gövde üzerine gerilmesi */
    let G = H;
    for (let pass = 0; pass < 2; pass++) { const D = new Float32Array(G.length); for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) { let m = G[at(i, j)]; for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) { const a = i + di, b = j + dj; if (a >= 0 && b >= 0 && a <= nx && b <= nz) m = Math.max(m, G[at(a, b)]); } D[at(i, j)] = m; } G = D; }
    for (let pass = 0; pass < 4; pass++) { const D = new Float32Array(G.length); for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) { let sum = 0, n = 0; for (let dj = -2; dj <= 2; dj++) for (let di = -2; di <= 2; di++) { const a = i + di, b = j + dj; if (a >= 0 && b >= 0 && a <= nx && b <= nz) { sum += G[at(a, b)]; n++; } } D[at(i, j)] = Math.max(sum / n, H[at(i, j)]); } G = D; }
    const dg = new THREE.PlaneGeometry(1, 1, nx, nz), dp = dg.attributes.position;
    for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) {
      let x = -X + i * step, z = z0 + j * step, y = G[at(i, j)] + .012 + .003 * Math.sin(x * 31 + z * 9) * Math.sin(z * 13);
      const ox = Math.abs(x) - TABLE_HALF - .01, oz = z - (bb.max.z + .02);
      if (ox > 0) { y = TABLE_TOP + .01 - ox * 1.6; x = Math.sign(x) * (TABLE_HALF + .012 + ox * .12); }      // yandan sarkma
      if (oz > 0) { y -= oz * 1.4; z = bb.max.z + .02 + oz * .15; }                                              // ayak ucundan sarkma
      if (j === 0) y += .004;                                                                                    // kıvrık kenar
      dp.setXYZ(at(i, j), x, y, z);
    }
    dg.computeVertexNormals();
    const drape = new THREE.Mesh(dg, M.drape); drape.castShadow = drape.receiveShadow = true; root.add(drape);

    return {body, lm, bounds: bb, toWorld: v => pt.localToWorld(v.clone()), W};
  }

  /* Gövde yüzeyi için yönlü izdüşüm: varsayılan olarak yukarıdan aşağı */
  function bodyKit(t) {
    const DOWN = V3(0, -1, 0);
    /* reach: ışının p'den ne kadar geriden başlayacağı (dar bölgelerde komşu parmağa çarpmamak için kısaltılır) */
    function project(p, off = 0, dir = DOWN, reach = .25) {
      ray.set(p.clone().addScaledVector(dir, -reach), dir.clone().normalize());
      return smoothHit(t.body, ray.intersectObject(t.body, false)[0], off) || {point: p.clone(), normal: dir.clone().negate()};
    }
    /* Uzuv yarıçapı: P noktasında eksene dik 8 yönden içeri ışın atılır, en büyük uzaklık alınır */
    function limbRadius(P, axis, reach = .12) {
      const a = axis.clone().normalize(), u = new THREE.Vector3().crossVectors(a, Math.abs(a.y) < .9 ? V3(0, 1, 0) : V3(1, 0, 0)).normalize(), v = new THREE.Vector3().crossVectors(a, u);
      let r = 0;
      for (let k = 0; k < 8; k++) {
        const ang = k * Math.PI / 4, d = u.clone().multiplyScalar(Math.cos(ang)).addScaledVector(v, Math.sin(ang));
        ray.set(P.clone().addScaledVector(d, reach), d.clone().negate());
        const h = ray.intersectObject(t.body, false)[0]; if (h) r = Math.max(r, h.point.distanceTo(P));
      }
      return r || .03;
    }
    /* Ayakta duruş koordinatında (x, y) verilen ön yüz noktasını gövde yüzeyine indir */
    const front = (x, y, off = 0) => project(t.toWorld(V3(x, y, .4)), off);
    return {lm: t.lm, bounds: t.bounds, toWorld: t.toWorld, project, front, limbRadius, ...tools(project)};
  }


  /* Uzuv çevresine sarılan manşon (açık silindir + kenar halkaları) */
  function band(P, axis, r, width, mat, edgeMat) {
    const g = new THREE.Group(), q = new THREE.Quaternion().setFromUnitVectors(V3(0, 1, 0), axis.clone().normalize());
    const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, width, 48, 1, true), mat); c.castShadow = true; g.add(c);
    [-1, 1].forEach(s => { const e = new THREE.Mesh(new THREE.TorusGeometry(r, .0025, 8, 48), edgeMat || mat); e.rotation.x = Math.PI / 2; e.position.y = s * width / 2; g.add(e); });
    g.position.copy(P); g.quaternion.copy(q); return g;
  }
  /* Görünür/görünmez geçişli nesne (saydamlıkla) */
  function fader(obj, lift = V3(0, .03, 0)) {
    const mats = []; obj.traverse(o => { if (o.material) { o.material = o.material.clone(); o.material.transparent = true; mats.push(o.material); } });
    const base = obj.position.clone(); let op = 0, goal = 0;
    obj.visible = false; mats.forEach(m => { m.opacity = 0; });
    return {
      set on(v) { goal = v ? 1 : 0; }, get on() { return goal === 1; },
      jump() { op = goal; },
      step(dt) { const k = REDUCED_MOTION ? 1 : 1 - Math.exp(-dt * 7); op += (goal - op) * k; obj.position.copy(base).addScaledVector(lift, 1 - op); mats.forEach(m => { m.opacity = op * (m.userData.maxOp || 1); }); obj.visible = op > .01; }
    };
  }
  /* Canlı dalga formu etiketi: SVG çizgisi CSS ile kayar */
  function waveSVG(kind) {
    const per = 40, pts = [];
    for (let x = 0; x <= per * 4; x += 1) {
      const t = (x % per) / per;
      let y;
      if (kind === 'art') y = t < .12 ? 26 - 20 * (t / .12) : t < .3 ? 6 + 10 * ((t - .12) / .18) : t < .36 ? 16 - 3 * Math.sin((t - .3) / .06 * Math.PI) : 16 + 10 * ((t - .36) / .64);
      else if (kind === 'ecg') y = t < .05 ? 20 : t < .08 ? 20 - 12 * Math.sin((t - .05) / .03 * Math.PI) * .3 : t < .1 ? 22 : t < .12 ? 4 : t < .14 ? 24 : t < .3 ? 20 : t < .42 ? 20 - 5 * Math.sin((t - .3) / .12 * Math.PI) : 20;
      else if (kind === 'capno') y = t < .1 ? 25 : t < .16 ? 25 - 17 * ((t - .1) / .06) : t < .55 ? 8 - 2 * ((t - .16) / .39) : t < .6 ? 6 + 19 * ((t - .55) / .05) : 25;
      else if (kind === 'ra' || kind === 'paop') y = 18 - 3 * Math.sin(t * Math.PI * 2) - 2.5 * Math.sin(t * Math.PI * 4 + 1);
      else if (kind === 'rv') y = t < .08 ? 24 - 18 * (t / .08) : t < .35 ? 6 + 2 * ((t - .08) / .27) : t < .42 ? 8 + 16 * ((t - .35) / .07) : 24 - 1.5 * ((t - .42) / .58);
      else if (kind === 'pa') y = t < .12 ? 22 - 12 * (t / .12) : t < .32 ? 10 + 5 * ((t - .12) / .2) : t < .38 ? 15 - 2 * Math.sin((t - .32) / .06 * Math.PI) : 15 + 7 * ((t - .38) / .62);
      else if (kind === 'thermo') { const u = (x % 160) / 160; y = 6 + 18 * (u < .1 ? 0 : Math.min(1, Math.exp(-((u - .32) ** 2) / .012) + (u > .32 ? Math.exp(-(u - .32) * 6) * .9 : 0))); }
      else y = 24 - 16 * Math.pow(Math.sin(Math.min(1, t / .45) * Math.PI / 2), 2) * (t < .45 ? 1 : Math.max(0, 1 - (t - .45) / .55)) - (t > .5 && t < .62 ? 2 * Math.sin((t - .5) / .12 * Math.PI) : 0);
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return `<svg class="wave-svg" viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts.join(' ')}" fill="none" stroke="currentColor" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`;
  }
  /* Dalga formu, sahnenin sol üst köşesinde monitör ekranı gibi sabit durur (konum parametresi geriye dönük uyumluluk için) */
  function waveTag(view, pos, kind, text) {
    const el = document.createElement('div'); el.className = 'tag3d wave fixedwave'; el.hidden = true;
    el.innerHTML = `${waveSVG(kind)}<span>${esc(text)}</span>`; view.el.appendChild(el);
    return {el, set show(v) { el.hidden = !v; }, get show() { return !el.hidden; }};
  }
  const PHLEBO = kit => {
    /* Flebostatik eksen: 4. interkostal aralık hizasında orta aksiller çizgi (sırtüstü hastada göğüs ön-arka çapının ortası) */
    const nip = kit.front(.17, 1.29), back = kit.bounds.min.y;
    const top = kit.front(0, 1.29).point.y;
    return V3(nip.point.x + .02, (top + back) / 2, nip.point.z);
  };
  const MATS = {
    probe: () => std(0x3A4652, .45, .1), probeAccent: () => std(0x0F8C7E, .4, 0),
    cuff: () => std(0x2F5E86, .8, 0, {side: THREE.DoubleSide}), cuffEdge: () => std(0x1E3D58, .7, 0),
    tube: () => std(0xDDE6EA, .25, 0, {transparent: true, opacity: .75}), white: () => std(0xF4F6F7, .5, 0), pole: () => std(0xC9D0D5, .3, .85)
  };

  function snapElectrodeMat() {
    const map = canvasTex(128, 128, (g, w) => {
      g.clearRect(0, 0, w, w);
      g.fillStyle = '#F7F8F9'; g.beginPath(); g.arc(64, 64, 62, 0, 7); g.fill();
      g.strokeStyle = '#C2CBD0'; g.lineWidth = 3; g.stroke();
      g.fillStyle = '#B9C3C9'; g.beginPath(); g.arc(64, 64, 24, 0, 7); g.fill();
    });
    return std(0xffffff, .6, 0, {map, alphaTest: .5, transparent: true, side: THREE.DoubleSide});
  }

  /* ---------- Nöromüsküler izlem: ulnar sinir uyarısı + başparmak ivme sensörü ---------- */
  function buildNMT(view, kit) {
    const {lm, project, patch} = kit;
    const elbow = lm('lowerarm01.L'), wrist = lm('wrist.L'), thumbA = lm('finger1-3.L'), thumbB = lm('finger1-3.L:tail'), little = lm('finger5-1.L');
    const axis = wrist.clone().sub(elbow).normalize();
    const uln = little.clone().sub(wrist); uln.addScaledVector(axis, -uln.dot(axis)); uln.y = 0; uln.normalize();
    const dist = project(wrist.clone().addScaledVector(axis, -.022).addScaledVector(uln, .007), .0022);
    const prox = project(dist.point.clone().addScaledVector(axis, -.042), .0022);
    /* Sensör başparmağın volar yüzüne, işaret parmağına bakan tarafa (addüksiyon yönüne dik) konur */
    const index = lm('finger2-1.L'), toThumb = lerp(thumbA, thumbB, .5).sub(index).normalize();
    const thumbPad = project(lerp(thumbA, thumbB, .5), .003, toThumb, .02);
    const prepC = project(lerp(dist.point, prox.point, .5), .0012);

    const prep = patch(prepC, .095, .045, glowMat(), .0012); view.root.add(prep);
    const stud = std(0xC9D0D5, .3, .85);
    const mkEl = c => {
      const m = patch(c, .024, .024, snapElectrodeMat(), .0022);
      const st = new THREE.Mesh(new THREE.CylinderGeometry(.0028, .0032, .005, 16), stud);
      st.position.copy(c.point).addScaledVector(c.normal, .0025); st.quaternion.setFromUnitVectors(V3(0, 1, 0), c.normal); m.add(st);
      view.root.add(m); return {m, d: dropper(m), c, ring: (() => { const r = pulseRing(c, .013); view.root.add(r); return r; })()};
    };
    const E = {dist: mkEl(dist), prox: mkEl(prox)};
    /* Uyarı kabloları ve klipsler: siyah distal (−), kırmızı proksimal (+) */
    const clipMat = {dist: std(0x1C2125, .45, .1), prox: std(0xC7372F, .45, .05)};
    const leads = {};
    for (const k of ['dist', 'prox']) {
      const c = E[k].c, top = c.point.clone().addScaledVector(c.normal, .007);
      const clip = new THREE.Mesh(new THREE.BoxGeometry(.012, .008, .022), clipMat[k]);
      clip.position.copy(top); clip.lookAt(top.clone().add(axis)); clip.castShadow = true;
      const back = top.clone().addScaledVector(axis, -.02);
      const wire = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([top.clone().addScaledVector(axis, -.011), back.clone().add(V3(0, .012, 0)), lerp(back, elbow, .5).add(V3(0, .02, 0)).addScaledVector(uln, .05), elbow.clone().addScaledVector(uln, .1).add(V3(0, -.02, 0)), elbow.clone().addScaledVector(uln, .14).add(V3(0, -.35, 0))]), 64, .0016, 8, false), clipMat[k]);
      wire.castShadow = true; view.root.add(clip, wire); leads[k] = [clip, wire];
    }
    /* Başparmak ivme sensörü ve kablosu */
    const sensor = new THREE.Group();
    const sb = new THREE.Mesh(new THREE.BoxGeometry(.018, .012, .0075), std(0x2F5E73, .4, .1)); sb.castShadow = true; sensor.add(sb);
    sensor.position.copy(thumbPad.point).addScaledVector(thumbPad.normal, .004);
    sensor.lookAt(sensor.position.clone().add(thumbPad.normal)); view.root.add(sensor);
    sb.material.transparent = true; sb.userData.normal = thumbPad.normal;
    const sDrop = dropper(sb);
    const sCable = cable([sensor.position.clone().addScaledVector(thumbPad.normal, .004), sensor.position.clone().addScaledVector(thumbPad.normal, .012).add(V3(0, .01, 0)), lerp(thumbPad.point, wrist, .5).add(V3(0, .03, 0)), wrist.clone().add(V3(0, .035, 0)), lerp(wrist, elbow, .5).add(V3(0, .03, 0)).addScaledVector(uln, .06), elbow.clone().addScaledVector(uln, .15).add(V3(0, -.35, 0))], .0018);
    view.root.add(sCable);

    const tg = (key, c, up = .022) => { const t = view.addTag(ICA.t(key), c.point.clone().addScaledVector(c.normal, up), 'side'); t.normal = c.normal; t.show = false; return t; };
    const tags = {dist: tg('pl.nmt.dist', dist), prox: tg('pl.nmt.prox', prox), sensor: tg('pl.nmt.sensor', thumbPad, .026)};
    const tof = view.addTag('', lerp(dist.point, thumbPad.point, .5).add(V3(0, .07, 0)), 'ok'); tof.show = false;

    const mid = lerp(elbow, wrist, .55);
    const S = {prep: 0, leads: false, tof: false};
    const steps = [
      {cam: [lerp(mid, lm('spine03'), .45), 1.45, .95, .78]},
      {cam: [prepC.point, .42, .25, .55], prep: 1},
      {cam: [dist.point, .32, .3, .6], on: ['dist']},
      {cam: [lerp(dist.point, prox.point, .5), .34, .3, .6], on: ['dist', 'prox']},
      {cam: [thumbPad.point, .3, 2.5, .62], on: ['dist', 'prox'], sensor: true},
      {cam: [lerp(prox.point, thumbPad.point, .45), .5, .45, .6], on: ['dist', 'prox'], sensor: true, leads: true},
      {cam: [lerp(dist.point, thumbPad.point, .5), .46, .35, .55], on: ['dist', 'prox'], sensor: true, leads: true, tof: true}
    ];
    function go(i, instant) {
      const s = steps[i];
      for (const k of ['dist', 'prox']) { E[k].d.on = (s.on || []).includes(k); if (instant) E[k].d.jump(); tags[k].show = E[k].d.on && !s.tof; }
      sDrop.on = !!s.sensor; if (instant) sDrop.jump(); tags.sensor.show = !!s.sensor && !s.leads;
      S.prep = s.prep || 0; S.leads = !!s.leads; S.tof = !!s.tof; tof.show = S.tof;
      const [t, d, th, ph] = s.cam; if (instant) view.jumpTo(t, d, th, ph); else view.focus(t, d, th, ph);
    }
    /* TOF: 0,5 s arayla dört uyarı (2 Hz), ardından ara; her uyarıda elektrot halkası ve sensör nabzı */
    view.tick.push((dt, t) => {
      for (const k of ['dist', 'prox']) E[k].d.step(dt);
      sDrop.step(dt); sCable.visible = sb.visible && S.leads;
      for (const k of ['dist', 'prox']) { leads[k][0].visible = leads[k][1].visible = S.leads && E[k].d.on; }
      prep.material.opacity = S.prep ? .22 + .14 * Math.sin(t * 3) : 0;
      const cyc = t % 4, n = Math.floor(cyc / .5), ph = (cyc % .5) / .5, firing = S.tof && n < 4;
      for (const k of ['dist', 'prox']) { const r = E[k].ring; r.material.opacity = firing ? (1 - ph) * .9 : 0; r.scale.setScalar(1 + ph * .8); }
      sb.scale.setScalar(firing && ph < .3 ? 1.12 : 1);
      if (S.tof) tof.el.textContent = n < 4 ? `TOF ${n + 1}/4` : ICA.t('pl.nmt.tof');
    });
    return {go, home: steps[0].cam};
  }

  /* Ortak: kamera adımları ve adım geçişi */
  function stepper(view, steps, apply) {
    return function go(i, instant) {
      const st = steps[i]; apply(st, instant);
      const [t, d, th, ph] = st.cam; if (instant) view.jumpTo(t, d, th, ph); else view.focus(t, d, th, ph);
    };
  }
  /* Ortak: genel bakış kamerası (hastanın sol tarafından, masanın üstünden) */
  const overview = (kit, focus, dist = 1.45) => [lerp(focus, kit.lm('spine01'), .45), dist, .95, .78];

  /* Yapışkan elektrot + çıtçıt; isteğe bağlı renkli klips ve kablo */
  function snap(view, kit, c, clipColor, wireTo) {
    const m = patch(c, .024, .024, snapElectrodeMat(), .0022);
    const st = new THREE.Mesh(new THREE.CylinderGeometry(.0028, .0032, .005, 16), std(0xC9D0D5, .3, .85));
    st.position.copy(c.point).addScaledVector(c.normal, .0025); st.quaternion.setFromUnitVectors(V3(0, 1, 0), c.normal); m.add(st);
    view.root.add(m);
    const e = {m, d: dropper(m), c, clip: null};
    if (clipColor != null) {
      const g = new THREE.Group();
      const top = c.point.clone().addScaledVector(c.normal, .008);
      const clip = new THREE.Mesh(new THREE.BoxGeometry(.012, .009, .02), std(clipColor, .45, .05)); clip.position.copy(top); clip.castShadow = true;
      const dir = (wireTo ? wireTo.clone().sub(top) : V3(0, 0, 1)).setY(0).normalize(); clip.lookAt(top.clone().add(dir)); g.add(clip);
      if (wireTo) { const w = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([top, top.clone().addScaledVector(dir, .04).add(V3(0, .02, 0)), lerp(top, wireTo, .6).add(V3(0, .04, 0)), wireTo]), 48, .0015, 8, false), std(clipColor, .5, .05)); w.castShadow = true; g.add(w); }
      view.root.add(g); e.clip = fader(g, V3(0, .01, 0));
    }
    return e;
  }
  const patch = (c, w, h, mat, off) => currentKit.patch(c, w, h, mat, off);
  let currentKit = null;

  /* ---------- Parmak ucu probu (pulse oksimetri, NOL, SPI) ---------- */
  function buildFingerProbe(view, kit) {
    currentKit = kit;
    const {lm, limbRadius} = kit;
    const A = lm('finger2-3.L'), B = lm('finger2-3.L:tail'), axis = B.clone().sub(A).normalize(), wrist = lm('wrist.L');
    const mid = lerp(A, B, .5), r = limbRadius(mid, axis, .03);
    const probe = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 24), MATS.probe()); body.scale.set(r + .009, .034, r + .011); body.castShadow = true; probe.add(body);
    const stripe = new THREE.Mesh(new THREE.TorusGeometry(1, .08, 8, 40), MATS.probeAccent()); stripe.scale.set(r + .0095, r + .0115, .02); stripe.rotation.x = Math.PI / 2; stripe.position.y = -.012; probe.add(stripe);
    probe.position.copy(lerp(A, B, .62)); probe.quaternion.setFromUnitVectors(V3(0, 1, 0), axis); view.root.add(probe);
    const fp = fader(probe, axis.clone().multiplyScalar(.04));
    const tail = lerp(A, B, .62).addScaledVector(axis, -.035);
    const cab = cable([tail, lerp(tail, wrist, .4).add(V3(0, -.004, 0)), wrist.clone().add(V3(0, -.012, 0)), lerp(wrist, lm('lowerarm01.L'), .5).add(V3(0, -.015, .03)), lm('lowerarm01.L').add(V3(0, -.3, .12))], .0022);
    view.root.add(cab);
    const site = kit.project(mid, .0015), glow = currentKit.patch(site, .03, .02, glowMat(), .0012); view.root.add(glow);
    const wave = waveTag(view, mid.clone().add(V3(0, .06, 0)), 'pleth', ICA.t('pl.spo2.val'));
    const S = {glow: 0, cable: false};
    const steps = [
      {cam: overview(kit, mid)},
      {cam: [mid, .34, .45, .62], glow: 1},
      {cam: [mid, .28, .7, .7], probe: true},
      {cam: [lerp(mid, wrist, .5), .4, .4, .55], probe: true, cable: true},
      {cam: [mid, .36, .5, .6], probe: true, cable: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => { fp.on = !!st.probe; if (instant) fp.jump(); S.glow = st.glow || 0; S.cable = !!st.cable; wave.show = !!st.wave; });
    view.tick.push((dt, t) => { fp.step(dt); cab.visible = S.cable && probe.visible; glow.material.opacity = S.glow ? .22 + .14 * Math.sin(t * 3) : 0; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Radiyal arter kateteri ve basınç transdüseri ---------- */
  function buildRadial(view, kit) {
    currentKit = kit;
    const {lm, project} = kit;
    const elbow = lm('lowerarm01.L'), wrist = lm('wrist.L'), thumb = lm('finger1-1.L');
    const axis = wrist.clone().sub(elbow).normalize();
    const rad = thumb.clone().sub(wrist); rad.addScaledVector(axis, -rad.dot(axis)); rad.y = 0; rad.normalize();
    const art = project(wrist.clone().addScaledVector(axis, -.022).addScaledVector(rad, .013), 0);
    const up = art.normal.clone();
    /* Kanül: distalden proksimale, cilde sığ açıyla */
    const dirIn = axis.clone().negate().multiplyScalar(Math.cos(.5)).addScaledVector(up, -Math.sin(.5)).normalize();
    const tip = art.point.clone().addScaledVector(up, -.004);
    const needle = new THREE.Group();
    const cath = new THREE.Mesh(new THREE.CylinderGeometry(.0006, .0006, .032, 10), std(0xE8ECEF, .3, .1)); cath.position.y = .016; needle.add(cath);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(.0035, .0028, .014, 16), std(0xE68AA8, .5, 0)); hub.position.y = .039; needle.add(hub);   // 20G pembe
    const wings = new THREE.Mesh(new THREE.BoxGeometry(.016, .0012, .006), std(0xE68AA8, .5, 0)); wings.position.y = .034; needle.add(wings);
    needle.position.copy(tip); needle.quaternion.setFromUnitVectors(V3(0, 1, 0), dirIn.clone().negate()); view.root.add(needle);
    const nf = fader(needle, dirIn.clone().multiplyScalar(-.03));
    const hubEnd = tip.clone().addScaledVector(dirIn, -.046);
    /* Şeffaf örtü */
    const dress = currentKit.patch(project(lerp(art.point, hubEnd, .5), .002), .05, .04, std(0xE9F3F7, .2, 0, {transparent: true, opacity: .35, depthWrite: false}), .0025);
    dress.material.userData.maxOp = .35; view.root.add(dress); const df = fader(dress, V3(0, .01, 0));
    /* Transdüser flebostatik eksen hizasında, masanın sol yanında askıda */
    const ph = PHLEBO(kit), td = V3(TABLE_HALF + .1, ph.y, ph.z + .18);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.008, .008, td.y + .5, 12), MATS.pole()); pole.position.set(td.x + .03, (td.y + .5) / 2, td.z); pole.castShadow = true; view.root.add(pole);
    const trans = new THREE.Group();
    const tb = new THREE.Mesh(new THREE.BoxGeometry(.03, .02, .06), MATS.white()); tb.castShadow = true; trans.add(tb);
    const stop = new THREE.Mesh(new THREE.CylinderGeometry(.006, .006, .016, 12), std(0x2F7DD1, .4, 0)); stop.position.set(0, .016, -.018); trans.add(stop);
    trans.position.copy(td); view.root.add(trans);
    const line = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([hubEnd, hubEnd.clone().addScaledVector(dirIn, -.03).add(V3(0, .006, 0)), lerp(wrist, elbow, .4).add(V3(0, .02, 0)), lerp(wrist, elbow, .9).add(V3(0, .025, .05)), V3(td.x - .05, td.y + .05, td.z - .05), td.clone().add(V3(0, 0, -.03))]), 120, .0022, 8, false), MATS.tube());
    line.material.userData.maxOp = .75; view.root.add(line); const lf = fader(line, V3(0, 0, 0));
    /* Seviye çizgisi: transdüser → flebostatik eksen */
    const lvl = new THREE.Line(new THREE.BufferGeometry().setFromPoints([td, ph]), new THREE.LineDashedMaterial({color: ACCENT, dashSize: .02, gapSize: .012, transparent: true}));
    lvl.computeLineDistances(); view.root.add(lvl);
    const tagPh = view.addTag(ICA.t('pl.art.phlebo'), ph.clone().add(V3(.02, .03, 0)), 'side'); tagPh.show = false;
    const tagZero = view.addTag(ICA.t('pl.art.zero'), td.clone().add(V3(0, .05, 0)), 'ok'); tagZero.show = false;
    const pulse = pulseRing(art, .01); view.root.add(pulse);
    const glow = currentKit.patch(project(lerp(art.point, wrist, .1), .001), .07, .05, glowMat(), .0012); view.root.add(glow);
    const wave = waveTag(view, art.point.clone().add(V3(0, .07, 0)), 'art', ICA.t('pl.art.val')); 
    const S = {glow: 0, pulse: false, lvl: false};
    const near = [art.point, .3, .25, .62];
    const steps = [
      {cam: overview(kit, art.point)},
      {cam: near, pulse: true},
      {cam: near, glow: 1},
      {cam: [art.point, .26, .9, .95], needle: true},
      {cam: near, needle: true, dress: true},
      {cam: [lerp(art.point, td, .5), .9, .7, .7], needle: true, dress: true, line: true},
      {cam: [lerp(ph, td, .5), .6, 1.3, 1.25], needle: true, dress: true, line: true, lvl: true},
      {cam: [art.point, .4, .35, .6], needle: true, dress: true, line: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      nf.on = !!st.needle; df.on = !!st.dress; lf.on = !!st.line; if (instant) { nf.jump(); df.jump(); lf.jump(); }
      S.glow = st.glow || 0; S.pulse = !!st.pulse; S.lvl = !!st.lvl; tagPh.show = tagZero.show = S.lvl; wave.show = !!st.wave;
    });
    view.tick.push((dt, t) => {
      nf.step(dt); df.step(dt); lf.step(dt);
      lvl.visible = S.lvl;
      glow.material.opacity = S.glow ? .22 + .14 * Math.sin(t * 3) : 0;
      const p = (t * 1.2) % 1; pulse.material.opacity = S.pulse ? (1 - p) * .9 : 0; pulse.scale.setScalar(1 + p);
    });
    return {go, home: steps[0].cam};
  }

  /* ---------- 5 derivasyonlu EKG (IEC renkleri) ---------- */
  function buildECG(view, kit) {
    currentKit = kit;
    const {front} = kit;
    const P = {
      R: [front(-.09, 1.40, .0022), 0xC7372F], L: [front(.09, 1.40, .0022), 0xE8C21E],
      N: [front(-.1, 1.12, .0022), 0x1C2125], F: [front(.1, 1.12, .0022), 0x2E9E58], C: [front(.155, 1.265, .0022), 0xF2F4F5]
    };
    const hub = V3(TABLE_HALF + .05, P.R[0].point.y + .05, P.R[0].point.z - .25);
    const E = {}, tags = {};
    for (const [k, [c, col]] of Object.entries(P)) {
      E[k] = snap(view, kit, c, col, hub);
      tags[k] = view.addTag(ICA.t('pl.ecg.' + k), c.point.clone().addScaledVector(c.normal, .03), 'side'); tags[k].normal = c.normal; tags[k].show = false;
    }
    const chest = kit.lm('spine01');
    const glow = currentKit.patch(front(0, 1.27, .001), .34, .36, glowMat(), .0012); view.root.add(glow);
    const wave = waveTag(view, front(0, 1.47).point.add(V3(0, .1, 0)), 'ecg', ICA.t('pl.ecg.val'));
    const camChest = [front(0, 1.27).point, .95, .35, .55];
    const S = {glow: 0};
    const steps = [
      {cam: overview(kit, chest, 1.5)},
      {cam: camChest, glow: 1},
      {cam: [front(0, 1.4).point, .7, .3, .5], on: ['R', 'L']},
      {cam: [front(0, 1.12).point, .7, .5, .55], on: ['R', 'L', 'N', 'F']},
      {cam: [P.C[0].point, .55, 1.0, .75], on: ['R', 'L', 'N', 'F', 'C']},
      {cam: camChest, on: ['R', 'L', 'N', 'F', 'C'], clips: true},
      {cam: camChest, on: ['R', 'L', 'N', 'F', 'C'], clips: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      for (const k in E) { E[k].d.on = (st.on || []).includes(k); if (instant) E[k].d.jump(); E[k].clip.on = E[k].d.on && !!st.clips; if (instant) E[k].clip.jump(); tags[k].show = E[k].d.on && !st.wave; }
      S.glow = st.glow || 0; wave.show = !!st.wave;
    });
    view.tick.push((dt, t) => { for (const k in E) { E[k].d.step(dt); E[k].clip.step(dt); } glow.material.opacity = S.glow ? .18 + .12 * Math.sin(t * 3) : 0; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Üst kol tansiyon manşonu ---------- */
  function buildNIBP(view, kit) {
    currentKit = kit;
    const {lm, limbRadius} = kit;
    const sh = lm('upperarm01.L'), el = lm('lowerarm01.L'), axis = el.clone().sub(sh).normalize();
    const C = el.clone().addScaledVector(axis, -.025 - .07), r = limbRadius(C, axis) + .006;
    const cuff = band(C, axis, r, .14, MATS.cuff(), MATS.cuffEdge()); view.root.add(cuff);
    /* Arter işareti brakiyal arter üzerinde: kolun iç (ayak tarafı) ön yüzü */
    const art = V3(0, .55, .83).normalize();
    const mark = new THREE.Mesh(new THREE.ConeGeometry(.007, .014, 3), std(0xF2F4F5, .5, 0)); mark.position.copy(C).addScaledVector(art, r + .002).addScaledVector(axis, .055); mark.quaternion.setFromUnitVectors(V3(0, 1, 0), axis); cuff.attach(mark);
    const cf = fader(cuff, V3(0, .05, 0));
    const hoseStart = C.clone().addScaledVector(V3(0, 1, 0), r).addScaledVector(axis, -.05);
    const hose = cable([hoseStart, hoseStart.clone().add(V3(0, .03, -.02)), lerp(sh, C, .4).add(V3(0, .06, -.06)), V3(TABLE_HALF + .05, sh.y + .05, sh.z - .3), V3(TABLE_HALF + .1, 0, sh.z - .5)], .0035);
    hose.material = std(0x3E4B57, .6, 0); view.root.add(hose);
    const fossa = kit.project(el.clone(), .001), glow = currentKit.patch(fossa, .03, .03, glowMat(), .0012); view.root.add(glow);
    const tagMark = view.addTag(ICA.t('pl.nibp.mark'), mark.position.clone().add(V3(0, .04, 0)), 'side'); tagMark.show = false;
    const tagFossa = view.addTag(ICA.t('pl.nibp.fossa'), fossa.point.clone().add(V3(0, .035, 0)), 'side'); tagFossa.show = false;
    const val = view.addTag(ICA.t('pl.nibp.val'), C.clone().add(V3(0, .1, 0)), 'ok'); val.show = false;
    const S = {glow: 0, hose: false, inflate: false};
    const near = [C, .55, .45, .6];
    const steps = [
      {cam: overview(kit, C)},
      {cam: near, glow: 1, fossa: true},
      {cam: near, cuff: true, mark: true, fossa: true},
      {cam: [C, .5, .9, .9], cuff: true},
      {cam: [C, .7, .5, .65], cuff: true, hose: true, inflate: true, val: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      cf.on = !!st.cuff; if (instant) cf.jump(); S.glow = st.glow || 0; S.hose = !!st.hose; S.inflate = !!st.inflate;
      tagMark.show = !!st.mark; tagFossa.show = !!st.fossa; val.show = !!st.val;
    });
    view.tick.push((dt, t) => {
      cf.step(dt); hose.visible = S.hose && cuff.visible;
      glow.material.opacity = S.glow ? .22 + .14 * Math.sin(t * 3) : 0;
      const cyc = (t % 8) / 8, inf = S.inflate ? (cyc < .35 ? cyc / .35 : cyc < .8 ? 1 - (cyc - .35) / .45 : 0) : 0;
      cuff.scale.set(1 + inf * .1, 1, 1 + inf * .1);
    });
    return {go, home: steps[0].cam};
  }

  /* ---------- Parmak manşonu (hacim kenetleme) + kalp referans sensörü ---------- */
  function buildFingerCuff(view, kit) {
    currentKit = kit;
    const {lm, limbRadius} = kit;
    const A = lm('finger3-2.L'), B = lm('finger3-2.L:tail'), axis = B.clone().sub(A).normalize(), wrist = lm('wrist.L'), elbow = lm('lowerarm01.L');
    const M = lerp(A, B, .5), r = limbRadius(M, axis, .03) + .003;
    const cuff = band(M, axis, r, .022, MATS.cuff(), MATS.cuffEdge()); view.root.add(cuff);
    const cfz = fader(cuff, axis.clone().multiplyScalar(.04));
    /* Basınç kontrol ünitesi bilekte */
    const wAx = wrist.clone().sub(elbow).normalize(), wr = limbRadius(wrist.clone().addScaledVector(wAx, -.03), wAx) + .004;
    const strap = band(wrist.clone().addScaledVector(wAx, -.035), wAx, wr, .03, std(0x2B3238, .8, 0, {side: THREE.DoubleSide}));
    const unit = new THREE.Mesh(new THREE.BoxGeometry(.045, .02, .05), std(0x3A4652, .45, .1)); unit.position.set(0, 0, 0);
    const pc = new THREE.Group(); pc.add(strap); const u2 = unit; u2.position.copy(wrist.clone().addScaledVector(wAx, -.035).add(V3(0, wr + .01, 0))); u2.castShadow = true; pc.add(u2); view.root.add(pc);
    const pcf = fader(pc, V3(0, .04, 0));
    const link = cable([M.clone().add(V3(0, r, 0)), lerp(M, wrist, .5).add(V3(0, .02, 0)), u2.position.clone().addScaledVector(wAx, .025)], .0016);
    view.root.add(link);
    /* Kalp referans sensörü: parmak ucu manşonda, kalp ucu flebostatik eksende */
    const ph = PHLEBO(kit);
    const hrsEnd = new THREE.Mesh(new THREE.CylinderGeometry(.006, .006, .02, 16), std(0xD9483B, .45, 0)); hrsEnd.position.copy(ph).add(V3(.015, 0, 0)); hrsEnd.rotation.z = Math.PI / 2; view.root.add(hrsEnd);
    const hrs = cable([M.clone().add(V3(0, r + .004, 0)), lerp(M, elbow, .5).add(V3(0, .05, 0)), lerp(elbow, lm('upperarm01.L'), .5).add(V3(0, .06, .06)), ph.clone().add(V3(.06, .02, .03)), hrsEnd.position.clone().add(V3(.01, 0, 0))], .0014);
    hrs.material = std(0xD9483B, .5, 0); view.root.add(hrs);
    const tagHrs = view.addTag(ICA.t('pl.fc.hrs'), ph.clone().add(V3(.03, .04, 0)), 'side'); tagHrs.show = false;
    const glow = currentKit.patch(kit.project(M, .0012), .03, .02, glowMat(), .0012); view.root.add(glow);
    const wave = waveTag(view, M.clone().add(V3(0, .08, 0)), 'art', ICA.t('pl.fc.val'));
    const S = {glow: 0, link: false, hrs: false};
    const near = [M, .32, .5, .62];
    const steps = [
      {cam: overview(kit, M)},
      {cam: near, glow: 1},
      {cam: near, cuff: true},
      {cam: [lerp(M, wrist, .6), .42, .6, .62], cuff: true, pc: true, link: true},
      {cam: [lerp(M, ph, .5), 1.2, .9, .75], cuff: true, pc: true, link: true, hrs: true},
      {cam: [M, .45, .45, .6], cuff: true, pc: true, link: true, hrs: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      cfz.on = !!st.cuff; pcf.on = !!st.pc; if (instant) { cfz.jump(); pcf.jump(); }
      S.glow = st.glow || 0; S.link = !!st.link; S.hrs = !!st.hrs; tagHrs.show = S.hrs && !st.wave; wave.show = !!st.wave;
    });
    view.tick.push((dt, t) => { cfz.step(dt); pcf.step(dt); link.visible = S.link; hrs.visible = hrsEnd.visible = S.hrs; glow.material.opacity = S.glow ? .22 + .14 * Math.sin(t * 3) : 0; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Pupillometre (baş taraması üzerinde) ---------- */
  function buildPupil(view, kit) {
    const {L, front} = kit, C = L.C;
    const eye = front(.032, L.nasion - .006, .002);
    const n = eye.normal.clone();
    const dev = new THREE.Group();
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(.019, .016, .022, 32, 1, true), std(0x23292E, .85, 0, {side: THREE.DoubleSide})); cup.position.y = .011; dev.add(cup);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(.016, 32), std(0x0B1216, .2, .3)); lens.position.y = .022; lens.rotation.x = -Math.PI / 2; dev.add(lens);
    const bodyM = new THREE.Mesh(new THREE.CylinderGeometry(.021, .023, .075, 32), std(0xE9EEF1, .45, .05)); bodyM.position.y = .06; dev.add(bodyM);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(.026, .03), std(0x0F8C7E, .3, 0, {emissive: new THREE.Color(0x0F8C7E), emissiveIntensity: .4})); scr.position.set(0, .07, .0236); dev.add(scr);
    dev.position.copy(eye.point).addScaledVector(n, .004); dev.quaternion.setFromUnitVectors(V3(0, 1, 0), n); view.root.add(dev);
    dev.traverse(o => { o.castShadow = true; });
    const df = fader(dev, n.clone().multiplyScalar(.08));
    const ring = pulseRing(eye, .012); view.root.add(ring);
    const tagLid = view.addTag(ICA.t('pl.pup.lid'), eye.point.clone().addScaledVector(n, .02).add(V3(0, .02, 0)), 'side'); tagLid.normal = n; tagLid.show = false;
    const res = view.addTag(ICA.t('pl.pup.val'), eye.point.clone().addScaledVector(n, .09).add(V3(0, .05, 0)), 'ok'); res.show = false;
    const S = {flash: false};
    const steps = [
      {cam: [V3(0, C.y - .02, C.z), .7, .5, 1.35]},
      {cam: [eye.point, .25, .35, 1.4], lid: true},
      {cam: [eye.point.clone().addScaledVector(n, .04), .42, 1.35, 1.3], dev: true},
      {cam: [eye.point.clone().addScaledVector(n, .04), .42, 1.35, 1.3], dev: true, flash: true},
      {cam: [eye.point.clone().addScaledVector(n, .05), .5, 1.1, 1.2], dev: true, res: true}
    ];
    const go = stepper(view, steps, (st, instant) => { df.on = !!st.dev; if (instant) df.jump(); tagLid.show = !!st.lid; S.flash = !!st.flash; res.show = !!st.res; });
    view.tick.push((dt, t) => { df.step(dt); const p = (t * .8) % 1; ring.material.opacity = S.flash ? (1 - p) * .9 : 0; ring.scale.setScalar(1 + p * .6); scr.material.emissiveIntensity = S.flash && p < .2 ? 1.2 : .4; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Suprasternal sürekli dalga Doppler (USCOM) ---------- */
  function buildSuprasternal(view, kit) {
    currentKit = kit;
    const {front, toWorld} = kit;
    const notch = front(0, 1.445, .002);
    const heart = toWorld(V3(.02, 1.27, -.02));
    const aim = heart.clone().sub(notch.point).normalize();
    const probe = new THREE.Group();
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(.009, .007, .11, 24), std(0xE9EEF1, .45, .05)); pen.position.y = .055; probe.add(pen);
    const tipM = new THREE.Mesh(new THREE.CylinderGeometry(.0072, .0072, .006, 24), std(0x2F5E73, .4, 0)); tipM.position.y = .003; probe.add(tipM);
    probe.position.copy(notch.point); probe.quaternion.setFromUnitVectors(V3(0, 1, 0), aim.clone().negate()); view.root.add(probe);
    probe.traverse(o => { o.castShadow = true; });
    const pf = fader(probe, aim.clone().multiplyScalar(-.06));
    const gel = new THREE.Mesh(new THREE.SphereGeometry(.009, 16, 10), std(0xBFE3F0, .1, 0, {transparent: true, opacity: .7})); gel.scale.set(1, .4, 1); gel.position.copy(notch.point); gel.material.userData.maxOp = .7; view.root.add(gel);
    const gf = fader(gel, V3(0, .01, 0));
    const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints([notch.point, heart]), new THREE.LineDashedMaterial({color: ACCENT, dashSize: .012, gapSize: .008, transparent: true})); beam.computeLineDistances(); view.root.add(beam);
    const tagN = view.addTag(ICA.t('pl.uscom.notch'), notch.point.clone().add(V3(0, .03, -.03)), 'side'); tagN.show = false;
    const wave = waveTag(view, notch.point.clone().add(V3(0, .12, 0)), 'art', ICA.t('pl.uscom.val'));
    const near = [notch.point, .45, .6, .7];
    const steps = [
      {cam: overview(kit, notch.point, 1.3)},
      {cam: near, gel: true, notch: true},
      {cam: near, gel: true, probe: true, beam: true},
      {cam: [notch.point, .5, 1.2, 1.1], gel: true, probe: true, beam: true},
      {cam: near, gel: true, probe: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => { pf.on = !!st.probe; gf.on = !!st.gel; if (instant) { pf.jump(); gf.jump(); } tagN.show = !!st.notch; beam.userData.on = !!st.beam; wave.show = !!st.wave; });
    view.tick.push(dt => { pf.step(dt); gf.step(dt); beam.visible = !!beam.userData.on; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Avuç içi deri iletkenliği elektrotları ---------- */
  function buildPalm(view, kit) {
    currentKit = kit;
    const {lm} = kit;
    const wrist = lm('wrist.L'), i1 = lm('finger2-1.L'), l1 = lm('finger5-1.L'), th = lm('finger1-1.L');
    const palmC = lerp(wrist, lerp(i1, l1, .5), .55);
    const pts = {
      a: kit.project(lerp(wrist, th, .62), .0022),                    // tenar
      b: kit.project(lerp(wrist, l1, .5), .0022),                     // hipotenar
      c: kit.project(lerp(wrist, lerp(i1, l1, .5), .72), .0022)       // avuç ortası
    };
    const hub = lm('lowerarm01.L').add(V3(0, .05, .1));
    const E = {a: snap(view, kit, pts.a, 0x1C2125, hub), b: snap(view, kit, pts.b, 0x1C2125, hub), c: snap(view, kit, pts.c, 0x1C2125, hub)};
    const glow = currentKit.patch(kit.project(palmC, .0012), .07, .06, glowMat(), .0012); view.root.add(glow);
    const wave = waveTag(view, palmC.clone().add(V3(0, .08, 0)), 'pleth', ICA.t('pl.palm.val'));
    const near = [palmC, .32, .45, .55];
    const S = {glow: 0};
    const steps = [
      {cam: overview(kit, palmC)},
      {cam: near, glow: 1},
      {cam: near, on: ['a', 'b', 'c']},
      {cam: [palmC, .4, .6, .6], on: ['a', 'b', 'c'], clips: true},
      {cam: [palmC, .42, .5, .6], on: ['a', 'b', 'c'], clips: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      for (const k in E) { E[k].d.on = (st.on || []).includes(k); E[k].clip.on = E[k].d.on && !!st.clips; if (instant) { E[k].d.jump(); E[k].clip.jump(); } }
      S.glow = st.glow || 0; wave.show = !!st.wave;
    });
    view.tick.push((dt, t) => { for (const k in E) { E[k].d.step(dt); E[k].clip.step(dt); } glow.material.opacity = S.glow ? .22 + .14 * Math.sin(t * 3) : 0; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Şematik anatomi (ayakta duruş koordinatında, metre; z öne) ---------- */
  function anatomy(view, kit) {
    const W = (x, y, z) => kit.toWorld(V3(x, y, z));
    const mat = (c, o = .92) => std(c, .5, 0, {transparent: true, opacity: o, emissive: new THREE.Color(c).multiplyScalar(.25)});
    const M = {art: mat(0xC8443C), vein: mat(0x3A5FB0), heart: mat(0xB8433A, .55), eso: mat(0xD99A84, .8), tra: mat(0xCFD8DC, .7), lung: mat(0xF0C4C0, .14)};
    const tube = (pts, r, m) => { const t = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => W(...p)), false, 'centripetal'), 80, r, 12, false), m); view.root.add(t); return t; };
    const blob = (c, r, m) => { const b = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), m); b.position.copy(W(...c)); b.scale.set(...r); view.root.add(b); return b; };
    const A = {
      ra: blob([-.035, 1.245, .04], [.03, .032, .03], M.heart), rv: blob([0, 1.215, .075], [.034, .035, .03], M.heart),
      la: blob([.012, 1.27, .0], [.03, .025, .025], M.heart), lv: blob([.038, 1.215, .04], [.038, .042, .036], M.heart),
      lungs: [blob([-.075, 1.27, .02], [.07, .12, .07], M.lung), blob([.085, 1.27, .02], [.065, .11, .065], M.lung)],
      aorta: tube([[.012, 1.245, .05], [-.004, 1.31, .052], [0, 1.36, .025], [.02, 1.345, -.02], [.026, 1.26, -.036], [.022, 1.1, -.032], [.012, .95, -.02]], .012, M.art),
      pa: tube([[0, 1.24, .095], [.012, 1.285, .07], [.02, 1.3, .045]], .011, M.art.clone()),
      paR: tube([[.02, 1.3, .045], [-.02, 1.3, .03], [-.06, 1.29, .02]], .007, M.art.clone()),
      paL: tube([[.02, 1.3, .045], [.05, 1.3, .03], [.075, 1.29, .015]], .007, M.art.clone()),
      svc: tube([[-.04, 1.42, .02], [-.037, 1.34, .028], [-.035, 1.27, .038]], .009, M.vein),
      ijv: tube([[-.042, 1.54, .035], [-.043, 1.48, .03], [-.04, 1.42, .02]], .007, M.vein),
      ivc: tube([[-.022, .98, .0], [-.024, 1.12, .015], [-.03, 1.215, .035]], .011, M.vein),
      eso: tube([[0, 1.53, .01], [0, 1.45, -.012], [.004, 1.36, -.03], [.01, 1.27, -.022], [.022, 1.13, -.02], [.045, 1.05, .0]], .008, M.eso),
      tra: tube([[0, 1.53, .045], [0, 1.44, .035], [0, 1.36, .025]], .009, M.tra)
    };
    A.pa.material.color = new THREE.Color(0x8E5BB8).convertSRGBToLinear(); A.paR.material = A.paL.material = A.pa.material;   // pulmoner arter: venöz kan, ayrı renk
    const label = (k, pos) => { const t = view.addTag(ICA.t('pl.anat.' + k), W(...pos), 'anat'); t.show = false; return t; };
    const tags = {ra: label('ra', [-.11, 1.24, .08]), rv: label('rv', [-.01, 1.15, .15]), pa: label('pa', [.04, 1.35, .11]), la: label('la', [.05, 1.32, -.05]), lv: label('lv', [.11, 1.18, .09]), ao: label('ao', [.09, 1.07, -.05]), svc: label('svc', [-.11, 1.39, .05]), eso: label('eso', [-.07, 1.13, -.06])};
    return {W, A, tags, show(keys) { for (const k in tags) tags[k].show = keys.includes(k); }};
  }

  /* ---------- Pulmoner arter kateteri (sağ internal juguler yol) ---------- */
  function buildPAC(view, kit) {
    currentKit = kit;
    const an = anatomy(view, kit), W = an.W;
    const path = [[-.042, 1.555, .05], [-.042, 1.5, .033], [-.041, 1.43, .022], [-.037, 1.34, .028], [-.035, 1.265, .04], [-.03, 1.235, .05], [-.01, 1.21, .075], [.005, 1.215, .09], [.004, 1.25, .095], [.012, 1.285, .07], [.02, 1.3, .045], [-.02, 1.3, .03], [-.052, 1.292, .022]].map(p => W(...p));
    const curve = new THREE.CatmullRomCurve3(path, false, 'centripetal'), SEG = 240, RAD = 8;
    const cath = new THREE.Mesh(new THREE.TubeGeometry(curve, SEG, .0022, RAD, false), std(0xF2E6C9, .4, 0)); view.root.add(cath);
    const balloon = new THREE.Mesh(new THREE.SphereGeometry(.0055, 20, 14), std(0xF3D35B, .3, 0, {transparent: true, opacity: .85})); view.root.add(balloon);
    /* İntrodüser kılıfı boyunda */
    const sheath = new THREE.Mesh(new THREE.CylinderGeometry(.004, .004, .07, 16), std(0x3E7CB1, .4, .1));
    const s0 = W(-.042, 1.575, .07), s1 = W(-.042, 1.52, .04); sheath.position.copy(lerp(s0, s1, .5)); sheath.quaternion.setFromUnitVectors(V3(0, 1, 0), s0.clone().sub(s1).normalize()); view.root.add(sheath);
    const sf = fader(sheath, V3(0, .03, 0));
    /* Uç konumu: curve parametresi */
    const at = {ra: .36, rv: .55, pa: .8, wedge: 1};
    const S = {u: 0, goal: 0, balloon: false};
    const wave = waveTag(view, W(.13, 1.36, .22), 'ra', '');
    const setWave = (k) => { if (!k) { wave.show = false; return; } wave.el.innerHTML = `${waveSVG(k)}<span>${esc(ICA.t('pl.pac.w.' + k))}</span>`; wave.show = true; };
    const cam = an.W(-.005, 1.28, .05), heartCam = [cam, .5, 1.15, .55];
    const steps = [
      {cam: overview(kit, cam, 1.2)},
      {cam: [W(-.04, 1.5, .04), .45, -.6, .9], sheath: true, show: ['svc']},
      {cam: heartCam, sheath: true, u: at.ra, balloon: true, wave: 'ra', show: ['ra', 'svc']},
      {cam: heartCam, sheath: true, u: at.rv, balloon: true, wave: 'rv', show: ['ra', 'rv']},
      {cam: heartCam, sheath: true, u: at.pa, balloon: true, wave: 'pa', show: ['rv', 'pa']},
      {cam: heartCam, sheath: true, u: at.wedge, balloon: true, wave: 'paop', show: ['pa', 'la']},
      {cam: heartCam, sheath: true, u: at.wedge - .05, balloon: false, wave: 'pa', show: ['pa']}
    ];
    const go = stepper(view, steps, (st, instant) => {
      sf.on = !!st.sheath; if (instant) sf.jump(); S.goal = st.u || 0; if (instant) S.u = S.goal; S.balloon = !!st.balloon;
      setWave(st.wave); an.show(st.show || []);
    });
    view.tick.push(dt => {
      sf.step(dt);
      const k = REDUCED_MOTION ? 1 : 1 - Math.exp(-dt * 1.6); S.u += (S.goal - S.u) * k;
      cath.geometry.setDrawRange(0, Math.round(S.u * SEG) * RAD * 6); cath.visible = S.u > .005;
      balloon.position.copy(curve.getPointAt(clamp(S.u, 0, 1))); balloon.visible = S.balloon && S.u > .005;
    });
    return {go, home: steps[0].cam};
  }

  /* ---------- Transpulmoner termodilüsyon (PiCCO): CVC + femoral arter termistörlü kateteri ---------- */
  function buildPiCCO(view, kit) {
    currentKit = kit;
    const an = anatomy(view, kit), W = an.W;
    tube2([[.085, .905, .07], [.092, .84, .068], [.1, .74, .06]], .007, std(0xC8443C, .5, 0, {transparent: true, opacity: .92}));
    function tube2(pts, r, m) { const t = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => W(...p))), 40, r, 10, false), m); view.root.add(t); return t; }
    tube2([[.022, 1.0, -.02], [.05, .95, .0], [.085, .905, .07]], .008, std(0xC8443C, .5, 0, {transparent: true, opacity: .92}));
    /* CVC boyunda, femoral kateter kasıkta */
    const cvc = new THREE.Mesh(new THREE.CylinderGeometry(.003, .003, .08, 12), std(0xF2F4F5, .4, 0)); const c0 = W(-.042, 1.58, .075), c1 = W(-.042, 1.5, .033);
    cvc.position.copy(lerp(c0, c1, .5)); cvc.quaternion.setFromUnitVectors(V3(0, 1, 0), c0.clone().sub(c1).normalize()); view.root.add(cvc);
    const sensor = new THREE.Mesh(new THREE.BoxGeometry(.016, .016, .03), std(0x3E7CB1, .4, .1)); sensor.position.copy(c0).add(V3(0, .01, 0)); view.root.add(sensor);
    const cf = fader(cvc, V3(0, .03, 0)), sf = fader(sensor, V3(0, .03, 0));
    const ac = new THREE.Mesh(new THREE.CylinderGeometry(.0025, .0025, .09, 12), std(0xF2F4F5, .4, 0)); const a0 = W(.07, .78, .14), a1 = W(.09, .85, .07);
    ac.position.copy(lerp(a0, a1, .5)); ac.quaternion.setFromUnitVectors(V3(0, 1, 0), a0.clone().sub(a1).normalize()); view.root.add(ac);
    const af = fader(ac, V3(0, .03, 0));
    /* Soğuk bolus yolu: SVC → sağ kalp → akciğer → sol kalp → aort → femoral arter */
    const route = new THREE.CatmullRomCurve3([[-.04, 1.42, .02], [-.035, 1.27, .038], [-.03, 1.24, .05], [0, 1.215, .075], [.012, 1.285, .07], [-.05, 1.28, .02], [-.02, 1.27, .0], [.012, 1.27, 0], [.038, 1.215, .04], [-.004, 1.31, .052], [0, 1.36, .025], [.026, 1.26, -.036], [.022, 1.05, -.03], [.05, .95, .0], [.09, .85, .068]].map(p => W(...p)), false, 'centripetal');
    const bolus = new THREE.Mesh(new THREE.SphereGeometry(.009, 16, 12), std(0x5BB7DE, .3, 0, {emissive: new THREE.Color(0x5BB7DE), emissiveIntensity: .8})); view.root.add(bolus);
    const thermo = waveTag(view, W(.2, .95, .25), 'thermo', ICA.t('pl.picco.curve')); 
    const res = view.addTag(ICA.t('pl.picco.val'), W(.15, 1.2, .3), 'ok'); res.show = false;
    const S = {bolus: false, t0: 0};
    const camHeart = [W(.03, 1.12, .03), .95, 1.1, .5];
    const steps = [
      {cam: overview(kit, W(0, 1.15, .05), 1.6)},
      {cam: [W(-.04, 1.52, .05), .5, -.6, .85], cvc: true, show: ['svc']},
      {cam: [W(.09, .84, .07), .55, .7, .8], cvc: true, art: true},
      {cam: camHeart, cvc: true, art: true, bolus: true, show: ['ra', 'rv', 'pa', 'la', 'lv', 'ao']},
      {cam: camHeart, cvc: true, art: true, bolus: true, curve: true},
      {cam: camHeart, cvc: true, art: true, res: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      cf.on = sf.on = !!st.cvc; af.on = !!st.art; if (instant) { cf.jump(); sf.jump(); af.jump(); }
      S.bolus = !!st.bolus; thermo.show = !!st.curve; res.show = !!st.res; an.show(st.show || []);
    });
    view.tick.push((dt, t) => { cf.step(dt); sf.step(dt); af.step(dt); const u = (t % 5) / 5; bolus.visible = S.bolus; if (S.bolus) bolus.position.copy(route.getPointAt(u)); });
    return {go, home: steps[0].cam};
  }

  /* ---------- Yemek borusu probu: özofageal Doppler ya da TEE ---------- */
  function buildEsophageal(view, kit, tee) {
    currentKit = kit;
    const an = anatomy(view, kit), W = an.W;
    const mouth = [0, 1.565, .172];
    const path = [mouth, [0, 1.566, .13], [0, 1.57, .07], [0, 1.55, .03], [0, 1.53, .01], [0, 1.45, -.012], [.004, 1.36, -.03], [.01, 1.27, -.022], [.022, 1.13, -.02], [.045, 1.06, .0]].map(p => W(...p));
    const curve = new THREE.CatmullRomCurve3(path, false, 'centripetal'), SEG = 220, RAD = 10, r = tee ? .0055 : .003;
    const probe = new THREE.Mesh(new THREE.TubeGeometry(curve, SEG, r, RAD, false), std(tee ? 0x2B3238 : 0xE9EEF1, .45, .05)); view.root.add(probe);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(r * 1.6, 16, 12), std(tee ? 0x2B3238 : 0x2F5E73, .4, .1)); view.root.add(tip);
    const beam = new THREE.Mesh(new THREE.ConeGeometry(tee ? .05 : .012, tee ? .08 : .05, 24, 1, true), std(0x4FD1BE, .3, 0, {transparent: true, opacity: .28, side: THREE.DoubleSide, depthWrite: false})); view.root.add(beam);
    const at = tee ? {me: .7, tg: .97} : {mid: .73};
    const S = {u: 0, goal: 0, beam: false};
    const wave = tee ? (() => { const t = view.addTag(ICA.t('pl.tee.val'), W(.12, 1.3, .2), 'ok'); t.show = false; return t; })() : waveTag(view, W(.18, 1.3, .2), 'art', ICA.t('pl.eso.val'));
    const camChest = [W(0, 1.32, .0), .85, 1.35, 1.1];
    const steps = tee ? [
      {cam: overview(kit, W(0, 1.4, .05), 1.3)},
      {cam: [W(0, 1.55, .06), .45, 1.2, 1.0], u: .18},
      {cam: camChest, u: at.me, beam: 'me', show: ['la', 'lv', 'ra', 'rv', 'eso']},
      {cam: camChest, u: at.tg, beam: 'tg', show: ['lv', 'eso']},
      {cam: camChest, u: at.me, beam: 'me', wave: true}
    ] : [
      {cam: overview(kit, W(0, 1.4, .05), 1.3)},
      {cam: [W(0, 1.55, .06), .45, 1.2, 1.0], u: .18},
      {cam: camChest, u: at.mid, show: ['ao', 'eso']},
      {cam: camChest, u: at.mid, beam: 'ao', show: ['ao']},
      {cam: camChest, u: at.mid, beam: 'ao', wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => { S.goal = st.u || 0; if (instant) S.u = S.goal; S.beam = st.beam || false; wave.show = !!st.wave; an.show(st.show || []); });
    view.tick.push(() => {
      S.u += (S.goal - S.u) * .05; if (Math.abs(S.goal - S.u) < .002) S.u = S.goal;
      probe.geometry.setDrawRange(0, Math.round(S.u * SEG) * RAD * 6); probe.visible = tip.visible = S.u > .005;
      const p = curve.getPointAt(clamp(S.u, 0, 1)); tip.position.copy(p);
      beam.visible = !!S.beam && S.u > .5;
      if (beam.visible) {
        /* Işın yönü: Doppler → inen aorta; TEE orta özofagus → sol atriyum/ventrikül; transgastrik → sol ventrikül */
        const target = S.beam === 'ao' ? W(.028, 1.2, -.036) : S.beam === 'tg' ? W(.04, 1.21, .05) : W(.02, 1.24, .04);
        const dir = target.clone().sub(p).normalize(), len = tee ? .08 : .05;
        beam.position.copy(p).addScaledVector(dir, len / 2); beam.quaternion.setFromUnitVectors(V3(0, -1, 0), dir);
      }
    });
    return {go, home: steps[0].cam};
  }

  /* Çift elektrotlu dikdörtgen sensör (biyoreaktans) dokusu: beyaz uç ayak tarafında */
  function dualPadMat() {
    const map = canvasTex(128, 256, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      const r = 26; g.fillStyle = '#F4F6F7'; g.beginPath(); g.moveTo(r, 2); g.arcTo(w - 2, 2, w - 2, h - 2, r); g.arcTo(w - 2, h - 2, 2, h - 2, r); g.arcTo(2, h - 2, 2, 2, r); g.arcTo(2, 2, w - 2, 2, r); g.closePath(); g.fill();
      g.strokeStyle = '#B9C3C9'; g.lineWidth = 3; g.stroke();
      g.fillStyle = '#2F7DD1'; g.fillRect(8, 8, w - 16, 26);                       // mavi yönlendirme işareti (üst)
      g.fillStyle = '#9AA7AF'; [96, 176].forEach(y => { g.beginPath(); g.arc(w / 2, y, 26, 0, 7); g.fill(); });
    });
    return std(0xffffff, .55, 0, {map, alphaTest: .5, transparent: true, side: THREE.DoubleSide});
  }

  /* ---------- Biyoreaktans (Starling): kalbi çerçeveleyen dört sensör ---------- */
  function buildBioreactance(view, kit) {
    currentKit = kit;
    const {front} = kit;
    const P = {UR: front(-.1, 1.395, .0022), UL: front(.1, 1.395, .0022), LR: front(-.13, 1.14, .0022), LL: front(.13, 1.14, .0022)};
    const hub = V3(-TABLE_HALF - .05, P.UR.point.y + .05, P.UR.point.z - .2);
    const E = {}, tags = {};
    for (const k in P) {
      const c = P[k], m = currentKit.patch(c, .045, .09, dualPadMat(), .0022, Math.PI);   // beyaz uç ayak tarafına
      view.root.add(m); E[k] = {d: dropper(m), c};
      const w = cable([c.point.clone().addScaledVector(c.normal, .004).add(V3(0, 0, -.045)), c.point.clone().add(V3(0, .05, -.08)), lerp(c.point, hub, .6).add(V3(0, .06, 0)), hub], .0016);
      view.root.add(w); E[k].w = w;
      tags[k] = view.addTag(ICA.t('pl.star.' + k), c.point.clone().addScaledVector(c.normal, .035), 'side'); tags[k].normal = c.normal; tags[k].show = false;
    }
    const glow = currentKit.patch(front(0, 1.27, .001), .38, .38, glowMat(), .0012); view.root.add(glow);
    const res = view.addTag(ICA.t('pl.star.val'), front(0, 1.27).point.add(V3(0, .12, 0)), 'ok'); res.show = false;
    const cam = [front(0, 1.27).point, 1.0, .35, .55];
    const S = {glow: 0, wires: false};
    const steps = [
      {cam: overview(kit, front(0, 1.27).point, 1.5)},
      {cam, glow: 1},
      {cam: [front(0, 1.39).point, .75, .3, .5], on: ['UR', 'UL']},
      {cam, on: ['UR', 'UL', 'LR', 'LL']},
      {cam, on: ['UR', 'UL', 'LR', 'LL'], wires: true},
      {cam, on: ['UR', 'UL', 'LR', 'LL'], wires: true, res: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      for (const k in E) { E[k].d.on = (st.on || []).includes(k); if (instant) E[k].d.jump(); tags[k].show = E[k].d.on && !st.res; }
      S.glow = st.glow || 0; S.wires = !!st.wires; res.show = !!st.res;
    });
    view.tick.push((dt, t) => { for (const k in E) { E[k].d.step(dt); E[k].w.visible = S.wires && E[k].d.on; } glow.material.opacity = S.glow ? .18 + .12 * Math.sin(t * 3) : 0; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Elektriksel kardiyometri (ICON): sol boyun tabanı + sol alt toraks ---------- */
  function buildCardiometry(view, kit) {
    currentKit = kit;
    const {front} = kit;
    const P = {n1: front(.035, 1.5, .0022), n2: front(.07, 1.45, .0022), t1: front(.11, 1.16, .0022), t2: front(.11, 1.09, .0022)};
    const hub = V3(TABLE_HALF + .06, P.n1.point.y + .05, P.n1.point.z - .25);
    const E = {}, tags = {};
    for (const k in P) {
      E[k] = snap(view, kit, P[k], 0x2F7DD1, hub);
      tags[k] = view.addTag(ICA.t('pl.icon.' + k.charAt(0)), P[k].point.clone().addScaledVector(P[k].normal, .03), 'side'); tags[k].normal = P[k].normal; tags[k].show = false;
    }
    const res = view.addTag(ICA.t('pl.icon.val'), front(0, 1.3).point.add(V3(0, .12, 0)), 'ok'); res.show = false;
    const cam = [lerp(P.n1.point, P.t1.point, .5), .95, 1.0, .65];
    const steps = [
      {cam: overview(kit, front(.05, 1.3).point, 1.4)},
      {cam: [P.n1.point, .5, .6, .6], on: ['n1', 'n2']},
      {cam: [P.t1.point, .55, 1.1, .7], on: ['n1', 'n2', 't1', 't2']},
      {cam, on: ['n1', 'n2', 't1', 't2'], clips: true},
      {cam, on: ['n1', 'n2', 't1', 't2'], clips: true, res: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      for (const k in E) { E[k].d.on = (st.on || []).includes(k); E[k].clip.on = E[k].d.on && !!st.clips; if (instant) { E[k].d.jump(); E[k].clip.jump(); } tags[k].show = E[k].d.on && !st.res; }
      res.show = !!st.res;
    });
    view.tick.push(dt => { for (const k in E) { E[k].d.step(dt); E[k].clip.step(dt); } });
    return {go, home: steps[0].cam};
  }

  /* ---------- Akustik solunum sensörü (boyun) ---------- */
  function buildAcoustic(view, kit) {
    currentKit = kit;
    const {front} = kit;
    const site = front(.028, 1.5, .0022);
    const padM = canvasTex(256, 128, (g, w, h) => {
      g.clearRect(0, 0, w, h); g.fillStyle = '#E9EEF1'; g.beginPath(); g.ellipse(w / 2, h / 2, w / 2 - 3, h / 2 - 3, 0, 0, 7); g.fill();
      g.strokeStyle = '#B9C3C9'; g.lineWidth = 3; g.stroke();
      g.fillStyle = '#5B6F7C'; g.beginPath(); g.arc(w / 2, h / 2, 28, 0, 7); g.fill();
      g.fillStyle = '#1B2328'; g.font = '600 20px sans-serif'; g.textAlign = 'center'; g.fillText('▲', w / 2, 24);
    });
    const pad = currentKit.patch(site, .05, .025, std(0xffffff, .55, 0, {map: padM, alphaTest: .5, transparent: true, side: THREE.DoubleSide}), .0022, Math.PI / 2);
    view.root.add(pad); const pd = dropper(pad);
    const anchor = front(.13, 1.43, .0022), aPad = currentKit.patch(anchor, .03, .03, snapElectrodeMat(), .0022); view.root.add(aPad); const ad = dropper(aPad);
    const cab = cable([site.point.clone().addScaledVector(site.normal, .004).add(V3(.02, 0, 0)), lerp(site.point, anchor.point, .5).add(V3(0, .025, 0)), anchor.point.clone().addScaledVector(anchor.normal, .006), anchor.point.clone().add(V3(.06, -.06, -.05)), anchor.point.clone().add(V3(.1, -.3, -.12))], .0018);
    view.root.add(cab);
    const glow = currentKit.patch(front(.028, 1.5, .001), .06, .04, glowMat(), .0012); view.root.add(glow);
    const tagL = view.addTag(ICA.t('pl.ras.site'), site.point.clone().addScaledVector(site.normal, .03), 'side'); tagL.normal = site.normal; tagL.show = false;
    const wave = waveTag(view, null, 'pleth', ICA.t('pl.ras.val'));
    const near = [site.point, .4, .9, .7];
    const S = {glow: 0, cable: false};
    const steps = [
      {cam: overview(kit, site.point, 1.2)},
      {cam: near, glow: 1, tag: true},
      {cam: near, pad: true},
      {cam: [lerp(site.point, anchor.point, .5), .55, .9, .6], pad: true, anchor: true, cable: true},
      {cam: near, pad: true, anchor: true, cable: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      pd.on = !!st.pad; ad.on = !!st.anchor; if (instant) { pd.jump(); ad.jump(); }
      S.glow = st.glow || 0; S.cable = !!st.cable; tagL.show = !!st.tag; wave.show = !!st.wave;
    });
    view.tick.push((dt, t) => { pd.step(dt); ad.step(dt); cab.visible = S.cable; glow.material.opacity = S.glow ? .22 + .14 * Math.sin(t * 3) : 0; });
    return {go, home: steps[0].cam};
  }

  /* Sahne genel bakışında yüz için kamera */
  const faceCam = (kit, d = .55) => [kit.toWorld(V3(0, 1.57, .16)), d, .5, .55];
  /* Saydam plastik ve hortum malzemeleri */
  const clear = () => std(0xDCEBF2, .15, 0, {transparent: true, opacity: .55, depthWrite: false});
  const corr = () => std(0x8FB7CC, .4, 0, {transparent: true, opacity: .8});

  /* ---------- Solunum devresi: endotrakeal tüp, adaptör, filtre, Y-parçası ---------- */
  function buildAirway(view, kit) {
    currentKit = kit;
    const W = (x, y, z) => kit.toWorld(V3(x, y, z));
    const lip = W(0, 1.565, .17), up = V3(0, 1, 0), headDir = W(0, 1.9, .17).sub(lip).setY(0).normalize();
    const p1 = lip.clone().addScaledVector(up, .05), p2 = p1.clone().addScaledVector(up, .02).addScaledVector(headDir, .04);
    const ett = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([W(0, 1.55, .1), lip, p1, p2]), 40, .0055, 12, false), clear()); view.root.add(ett);
    const along = (o, d, len) => o.clone().addScaledVector(d, len);
    const seg = (a, len, r, mat) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 24), mat); m.position.copy(along(a, headDir, len / 2)); m.quaternion.setFromUnitVectors(V3(0, 1, 0), headDir); m.castShadow = true; view.root.add(m); return m; };
    const conn = seg(p2, .02, .0085, std(0x2B3238, .5, 0));
    const adStart = along(p2, headDir, .02), adapter = seg(adStart, .03, .011, clear());
    const sensor = new THREE.Mesh(new THREE.BoxGeometry(.03, .022, .026), std(0x3A4652, .45, .1)); sensor.position.copy(along(adStart, headDir, .015)).add(V3(0, .018, 0)); view.root.add(sensor);
    const hmeStart = along(adStart, headDir, .03), hme = seg(hmeStart, .045, .024, std(0xEFF3F5, .45, 0));
    const yStart = along(hmeStart, headDir, .045), ypc = seg(yStart, .03, .011, std(0x2F7DD1, .4, 0));
    const yEnd = along(yStart, headDir, .03), side = new THREE.Vector3().crossVectors(headDir, up).normalize();
    const limbs = [-1, 1].map(s2 => { const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([yEnd, along(yEnd, headDir, .06).addScaledVector(side, s2 * .04), along(yEnd, headDir, .3).addScaledVector(side, s2 * .07).add(V3(0, -.05, 0)), along(yEnd, headDir, .7).addScaledVector(side, s2 * .09).add(V3(0, -.25, 0))]), 80, .011, 12, false), corr()); m.castShadow = true; view.root.add(m); return m; });
    const sample = cable([sensor.position.clone().add(V3(0, .012, 0)), sensor.position.clone().add(V3(0, .05, 0)).addScaledVector(side, .05), along(yEnd, headDir, .4).addScaledVector(side, .2).add(V3(0, .05, 0)), along(yEnd, headDir, .6).addScaledVector(side, .3).add(V3(0, -.3, 0))], .0018);
    view.root.add(sample);
    const parts = [ett, conn, adapter, hme, ypc, ...limbs];
    const fAd = fader(adapter, V3(0, .03, 0)), fSe = fader(sensor, V3(0, .03, 0));
    const tags = {
      ett: view.addTag(ICA.t('pl.aw.ett'), lip.clone().add(V3(.03, .03, 0)), 'side'),
      ad: view.addTag(ICA.t('pl.aw.adapter'), sensor.position.clone().add(V3(0, .04, 0)), 'side'),
      hme: view.addTag(ICA.t('pl.aw.hme'), along(hmeStart, headDir, .022).add(V3(0, .04, 0)), 'side'),
      y: view.addTag(ICA.t('pl.aw.y'), along(yStart, headDir, .015).add(V3(0, .04, 0)), 'side')
    };
    Object.values(tags).forEach(t => { t.show = false; });
    const wave = waveTag(view, null, 'capno', ICA.t('pl.aw.val'));
    const cam = [along(p2, headDir, .05), .45, .6, .6];
    const steps = [
      {cam: faceCam(kit, .9), tags: ['ett', 'y']},
      {cam, ad: true, tags: ['ad', 'hme']},
      {cam: [along(p2, headDir, .1), .7, 1.0, .7], ad: true, line: true},
      {cam, ad: true, line: true, tags: ['ad']},
      {cam, ad: true, line: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      fAd.on = fSe.on = !!st.ad; if (instant) { fAd.jump(); fSe.jump(); }
      for (const k in tags) tags[k].show = (st.tags || []).includes(k);
      sample.userData.on = !!st.line; wave.show = !!st.wave;
    });
    view.tick.push(dt => { fAd.step(dt); fSe.step(dt); sample.visible = !!sample.userData.on; });
    parts.forEach(m => { m.userData.keep = true; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Defibrilasyon / pacing pedleri (anterolateral) ---------- */
  function buildDefib(view, kit) {
    currentKit = kit;
    const {front} = kit;
    const padTex = canvasTex(256, 192, (g, w, h) => {
      g.clearRect(0, 0, w, h); const r = 30; g.fillStyle = '#F4F6F7'; g.beginPath(); g.moveTo(r, 2); g.arcTo(w - 2, 2, w - 2, h - 2, r); g.arcTo(w - 2, h - 2, 2, h - 2, r); g.arcTo(2, h - 2, 2, 2, r); g.arcTo(2, 2, w - 2, 2, r); g.closePath(); g.fill();
      g.strokeStyle = '#C7372F'; g.lineWidth = 8; g.stroke();
      g.fillStyle = '#C7372F'; g.beginPath(); g.moveTo(w / 2, h * .72); g.bezierCurveTo(w * .2, h * .45, w * .32, h * .2, w / 2, h * .38); g.bezierCurveTo(w * .68, h * .2, w * .8, h * .45, w / 2, h * .72); g.fill();
    });
    const pm = () => std(0xffffff, .55, 0, {map: padTex, alphaTest: .5, transparent: true, side: THREE.DoubleSide});
    const P = {st: front(-.07, 1.39, .0022), ap: front(.11, 1.235, .0022)};
    const hub = V3(TABLE_HALF + .08, P.st.point.y + .05, P.st.point.z + .1);
    const E = {}, tags = {};
    for (const k in P) {
      const m = currentKit.patch(P[k], .085, .065, pm(), .0022, k === 'ap' ? Math.PI / 2 : 0); view.root.add(m);
      const w = cable([P[k].point.clone().addScaledVector(P[k].normal, .004), P[k].point.clone().add(V3(0, .04, .05)), lerp(P[k].point, hub, .6).add(V3(0, .06, 0)), hub], .0022);
      w.material = std(0x3A4652, .5, 0); view.root.add(w);
      E[k] = {d: dropper(m), w};
      tags[k] = view.addTag(ICA.t('pl.def.' + k), P[k].point.clone().addScaledVector(P[k].normal, .05), 'side'); tags[k].normal = P[k].normal; tags[k].show = false;
    }
    const wave = waveTag(view, null, 'ecg', ICA.t('pl.def.val'));
    const warn = view.addTag(ICA.t('pl.def.clear'), front(0, 1.3).point.add(V3(0, .14, 0)), 'warnt'); warn.show = false;
    const cam = [front(.03, 1.3).point, .95, .55, .6];
    const steps = [
      {cam: overview(kit, front(0, 1.3).point, 1.4)},
      {cam: [P.st.point, .55, .3, .55], on: ['st']},
      {cam: [P.ap.point, .6, 1.1, .75], on: ['st', 'ap']},
      {cam, on: ['st', 'ap'], wires: true, wave: true},
      {cam, on: ['st', 'ap'], wires: true, warn: true}
    ];
    const go = stepper(view, steps, (st, instant) => {
      for (const k in E) { E[k].d.on = (st.on || []).includes(k); if (instant) E[k].d.jump(); tags[k].show = E[k].d.on && !st.warn; E[k].wires = !!st.wires; }
      wave.show = !!st.wave; warn.show = !!st.warn;
    });
    view.tick.push(dt => { for (const k in E) { E[k].d.step(dt); E[k].w.visible = !!E[k].wires && E[k].d.on; } });
    return {go, home: steps[0].cam};
  }

  /* ---------- EIT göğüs kemeri ---------- */
  function buildEIT(view, kit) {
    currentKit = kit;
    const W = (x, y, z) => kit.toWorld(V3(x, y, z));
    const C = W(0, 1.27, .035), axis = W(0, 1.37, .035).sub(C).normalize();
    const belt = new THREE.Group();
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, .05, 64, 1, true), std(0x2F5E86, .75, 0, {side: THREE.DoubleSide})); cyl.scale.set(.19, 1, .132); belt.add(cyl);
    for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; const e = new THREE.Mesh(new THREE.SphereGeometry(.0045, 10, 8), std(0xC9D0D5, .3, .8)); e.position.set(Math.cos(a) * .192, 0, Math.sin(a) * .134); belt.add(e); }
    belt.position.copy(C); belt.quaternion.setFromUnitVectors(V3(0, 1, 0), axis);
    /* Kemerin geniş ekseni göğüs genişliğine (x), dar ekseni ön-arka çapa denk gelsin */
    const q2 = new THREE.Quaternion().setFromAxisAngle(V3(0, 1, 0), 0); belt.quaternion.multiply(q2);
    view.root.add(belt); belt.traverse(o => { o.castShadow = true; });
    const bf = fader(belt, V3(0, .06, 0));
    const box = new THREE.Mesh(new THREE.BoxGeometry(.06, .03, .08), std(0x3A4652, .45, .1)); box.position.copy(C).add(V3(TABLE_HALF + .05, .05, 0)); view.root.add(box);
    const cab = cable([C.clone().add(V3(.16, .03, 0)), C.clone().add(V3(.24, .06, 0)), box.position.clone()], .003); view.root.add(cab);
    const res = view.addTag(ICA.t('pl.eit.val'), C.clone().add(V3(0, .2, 0)), 'ok'); res.show = false;
    const cam = [C, .95, .9, .75];
    const steps = [
      {cam: overview(kit, C, 1.4)},
      {cam, belt: true},
      {cam: [C, .8, 1.3, 1.1], belt: true},
      {cam, belt: true, wire: true},
      {cam, belt: true, wire: true, res: true}
    ];
    const go = stepper(view, steps, (st, instant) => { bf.on = !!st.belt; if (instant) bf.jump(); cab.userData.on = box.userData.on = !!st.wire; res.show = !!st.res; });
    view.tick.push(dt => { bf.step(dt); cab.visible = box.visible = !!cab.userData.on; });
    return {go, home: steps[0].cam};
  }

  /* ---------- Transkraniyal Doppler: temporal pencere (baş taraması) ---------- */
  function buildTCD(view, kit) {
    const {L, around} = kit, C = L.C;
    const win = around(1.26, L.nasion + .004, .002), n = win.normal.clone();
    const probe = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(.011, .009, .06, 24), std(0xE9EEF1, .45, .05)); body.position.y = .03; probe.add(body);
    const face = new THREE.Mesh(new THREE.CylinderGeometry(.0095, .0095, .004, 24), std(0x2F5E73, .4, 0)); face.position.y = .002; probe.add(face);
    probe.position.copy(win.point); probe.quaternion.setFromUnitVectors(V3(0, 1, 0), n); view.root.add(probe); probe.traverse(o => { o.castShadow = true; });
    const pf = fader(probe, n.clone().multiplyScalar(.06));
    const gel = new THREE.Mesh(new THREE.SphereGeometry(.01, 16, 10), std(0xBFE3F0, .1, 0, {transparent: true, opacity: .7})); gel.scale.set(1, .35, 1); gel.position.copy(win.point); gel.quaternion.copy(probe.quaternion); gel.material.userData.maxOp = .7; view.root.add(gel);
    const gf = fader(gel, n.clone().multiplyScalar(.01));
    const tagW = view.addTag(ICA.t('pl.tcd.win'), win.point.clone().addScaledVector(n, .03).add(V3(0, .025, 0)), 'side'); tagW.normal = n; tagW.show = false;
    const wave = waveTag(view, null, 'art', ICA.t('pl.tcd.val'));
    const near = [win.point, .32, 1.35, 1.3];
    const steps = [
      {cam: [V3(0, C.y - .02, C.z), .7, 1.0, 1.35]},
      {cam: near, gel: true, tag: true},
      {cam: near, gel: true, probe: true},
      {cam: [win.point, .4, 1.1, 1.1], gel: true, probe: true},
      {cam: near, gel: true, probe: true, wave: true}
    ];
    const go = stepper(view, steps, (st, instant) => { pf.on = !!st.probe; gf.on = !!st.gel; if (instant) { pf.jump(); gf.jump(); } tagW.show = !!st.tag; wave.show = !!st.wave; });
    view.tick.push(dt => { pf.step(dt); gf.step(dt); });
    return {go, home: steps[0].cam};
  }

  /* ---------- Yüz maskesi: balon-valf-maske ya da NIV ---------- */
  function buildMask(view, kit, niv) {
    currentKit = kit;
    const W = (x, y, z) => kit.toWorld(V3(x, y, z));
    const c = W(0, 1.578, .2), up = V3(0, 1, 0), headDir = W(0, 1.9, .2).sub(c).setY(0).normalize();
    const mask = new THREE.Group();
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), clear()); dome.scale.set(.04, .04, .05); dome.material.userData.maxOp = .55; mask.add(dome);
    const cushion = new THREE.Mesh(new THREE.TorusGeometry(1, .12, 10, 40), std(niv ? 0xE9EEF1 : 0x9FD3C7, .6, 0, {transparent: true, opacity: .9})); cushion.scale.set(.04, .05, .04); cushion.rotation.x = Math.PI / 2; cushion.material.userData.maxOp = .9; mask.add(cushion);
    const port = new THREE.Mesh(new THREE.CylinderGeometry(.011, .011, .03, 20), std(niv ? 0x2F7DD1 : 0x2B3238, .45, 0)); port.position.y = .055; mask.add(port);
    mask.position.copy(c).add(V3(0, -.03, 0)); mask.lookAt(mask.position.clone().add(headDir)); mask.rotateX(-Math.PI / 2); mask.rotation.set(0, 0, 0); mask.quaternion.setFromUnitVectors(V3(0, 1, 0), up);
    const yaw = new THREE.Quaternion().setFromUnitVectors(V3(0, 0, 1), headDir); mask.quaternion.premultiply(yaw);
    view.root.add(mask);
    const mf = fader(mask, V3(0, .05, 0));
    let extra;
    if (niv) {
      const strap = new THREE.Mesh(new THREE.TorusGeometry(.085, .006, 8, 48), std(0x3A4652, .8, 0)); strap.position.copy(W(0, 1.62, .06)); strap.rotation.x = Math.PI / 2.4; view.root.add(strap);
      const hose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([c.clone().add(V3(0, .055, 0)), c.clone().add(V3(0, .12, 0)).addScaledVector(headDir, .1), c.clone().addScaledVector(headDir, .5).add(V3(0, -.1, 0))]), 60, .011, 12, false), corr()); view.root.add(hose);
      extra = new THREE.Group(); extra.add(strap); extra.add(hose);
      view.root.add(extra);
    } else {
      const bag = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), std(0x2E9E58, .6, 0)); bag.scale.set(.06, .06, .12);
      const valve = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, .05, 16), std(0xE9EEF1, .4, 0));
      const g = new THREE.Group(); valve.position.copy(c).add(V3(0, .085, 0)); valve.quaternion.setFromUnitVectors(V3(0, 1, 0), up.clone().add(headDir).normalize());
      bag.position.copy(c).add(V3(0, .14, 0)).addScaledVector(headDir, .1); bag.quaternion.setFromUnitVectors(V3(0, 0, 1), headDir.clone().add(V3(0, .5, 0)).normalize());
      const res = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), std(0x9FD3C7, .4, 0, {transparent: true, opacity: .45})); res.scale.set(.05, .05, .1); res.position.copy(bag.position).addScaledVector(headDir, .2).add(V3(0, .05, 0)); res.material.userData.maxOp = .45;
      g.add(valve, bag, res); view.root.add(g); extra = g;
    }
    const ef = fader(extra, V3(0, .05, 0));
    const pump = {t: 0};
    const tagC = view.addTag(ICA.t(niv ? 'pl.niv.leak' : 'pl.bvm.rise'), W(0, 1.3, .2), 'ok'); tagC.show = false;
    const cam = faceCam(kit, .6);
    const steps = niv ? [
      {cam: faceCam(kit, .8)}, {cam, mask: true}, {cam: faceCam(kit, .7), mask: true, extra: true}, {cam, mask: true, extra: true, tag: true}, {cam: faceCam(kit, .9), mask: true, extra: true}
    ] : [
      {cam: faceCam(kit, .8)}, {cam, mask: true}, {cam, mask: true}, {cam: faceCam(kit, .75), mask: true, extra: true, squeeze: true, tag: true}, {cam: faceCam(kit, .8), mask: true, extra: true}
    ];
    const go = stepper(view, steps, (st, instant) => { mf.on = !!st.mask; ef.on = !!st.extra; if (instant) { mf.jump(); ef.jump(); } tagC.show = !!st.tag; pump.on = !!st.squeeze; });
    view.tick.push((dt, t) => { mf.step(dt); ef.step(dt); if (!niv && extra.children[1]) { const sq = pump.on ? .5 + .5 * Math.sin(t * 2.2) : 1; extra.children[1].scale.set(.06 * (.7 + .3 * sq), .06 * (.7 + .3 * sq), .12); } });
    return {go, home: steps[0].cam};
  }

  /* ---------- Yüksek akımlı nazal kanül ---------- */
  function buildHFNC(view, kit) {
    currentKit = kit;
    const W = (x, y, z) => kit.toWorld(V3(x, y, z));
    const g = new THREE.Group();
    const bar = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([W(-.06, 1.58, .14), W(-.02, 1.585, .172), W(.02, 1.585, .172), W(.06, 1.58, .14)]), 30, .0045, 10, false), std(0xE9EEF1, .4, 0)); g.add(bar);
    [-1, 1].forEach(s => { const pr = new THREE.Mesh(new THREE.CylinderGeometry(.0035, .004, .012, 12), std(0xE9EEF1, .4, 0)); pr.position.copy(W(s * .009, 1.592, .17)); pr.quaternion.setFromUnitVectors(V3(0, 1, 0), W(0, 1.62, .15).sub(W(0, 1.592, .17)).normalize()); g.add(pr); });
    const strap = new THREE.Mesh(new THREE.TorusGeometry(.082, .004, 8, 48), std(0x9FD3C7, .7, 0)); strap.position.copy(W(0, 1.6, .07)); strap.rotation.x = Math.PI / 2.2; g.add(strap);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([W(.06, 1.58, .14), W(.12, 1.55, .12), W(.2, 1.5, .25), W(.35, 1.4, .3)]), 60, .009, 12, false), corr()); g.add(tube);
    view.root.add(g); g.traverse(o => { o.castShadow = true; });
    const gf = fader(g, V3(0, .04, 0));
    const tag = view.addTag(ICA.t('pl.hfnc.prong'), W(0, 1.6, .2), 'side'); tag.show = false;
    const cam = faceCam(kit, .45);
    const steps = [{cam: faceCam(kit, .8)}, {cam, can: true, tag: true}, {cam: faceCam(kit, .7), can: true}, {cam: faceCam(kit, .9), can: true}];
    const go = stepper(view, steps, (st, instant) => { gf.on = !!st.can; if (instant) gf.jump(); tag.show = !!st.tag; });
    view.tick.push(dt => gf.step(dt));
    return {go, home: steps[0].cam};
  }

  const PLACEMENTS = {
    'forehead-eeg':  {id: 'eeg', count: 7, build: buildEEG},
    'forehead-nirs': {id: 'nirs', count: 6, build: buildNIRS},
    'forearm-nmt':   {id: 'nmt', count: 7, build: buildNMT, body: true},
    'finger-probe':  {id: 'spo2', count: 5, build: buildFingerProbe, body: true},
    'radial-artery': {id: 'art', count: 8, build: buildRadial, body: true},
    'chest-ecg':     {id: 'ecg', count: 7, build: buildECG, body: true},
    'upper-arm-cuff':{id: 'nibp', count: 5, build: buildNIBP, body: true},
    'finger-cuff':   {id: 'fc', count: 6, build: buildFingerCuff, body: true},
    'eye-pupil':     {id: 'pup', count: 5, build: buildPupil},
    'suprasternal-doppler': {id: 'uscom', count: 5, build: buildSuprasternal, body: true},
    'palm-electrodes': {id: 'palm', count: 5, build: buildPalm, body: true},
    'pa-catheter':   {id: 'pac', count: 7, build: buildPAC, body: true, theatre: {xray: true}},
    'femoral-artery-cvc': {id: 'picco', count: 6, build: buildPiCCO, body: true, theatre: {xray: true, groin: true}},
    'esophageal-probe': {id: 'eso', count: 5, build: (v, k) => buildEsophageal(v, k, false), body: true, theatre: {xray: true}},
    'tee-probe':     {id: 'tee', count: 5, build: (v, k) => buildEsophageal(v, k, true), body: true, theatre: {xray: true}},
    'thorax-bioreactance': {id: 'star', count: 6, build: buildBioreactance, body: true},
    'thorax-cardiometry':  {id: 'icon', count: 5, build: buildCardiometry, body: true},
    'neck-acoustic': {id: 'ras', count: 5, build: buildAcoustic, body: true},
    'airway-circuit': {id: 'aw', count: 5, build: buildAirway, body: true},
    'defib-pads':    {id: 'def', count: 5, build: buildDefib, body: true},
    'chest-belt':    {id: 'eit', count: 5, build: buildEIT, body: true},
    'temporal-window': {id: 'tcd', count: 5, build: buildTCD},
    'face-mask':     {id: 'bvm', count: 5, build: (v, k) => buildMask(v, k, false), body: true},
    'niv-mask':      {id: 'niv', count: 5, build: (v, k) => buildMask(v, k, true), body: true},
    'nasal-cannula': {id: 'hfnc', count: 4, build: buildHFNC, body: true}
  };
  const BODY_VIEW = {target: [0, 1, 0], dist: 2.4, theta: .6, phi: .9, minD: .15, maxD: 4, shadow: 1.3, groundR: 1.6, panLim: 1.2};

  /* Sahne: model yüklenene kadar bekleyen bir denetleyici döndürür; go() çağrıları yükleme sonrasına ertelenir */
  function mountScene(stage, key, opts, onReady) {
    const P = PLACEMENTS[key]; if (!P) return null;
    const view = new K3.Viewer(stage, Object.assign({target: [0, .25, 0], dist: .8, theta: .55, phi: 1.35, minD: .18, maxD: 1.5, fov: 30, shadow: .45, groundR: .55, panLim: .15}, P.body ? BODY_VIEW : {}, opts));
    stage.classList.add('is-loading');
    const ctl = {id: P.id, count: P.count, current: 0, go(i) { ctl.current = i; if (ctl.scene) ctl.scene.go(i); }};
    (P.body ? loadBody() : loadHead()).then(asset => {
      const kit = P.body ? bodyKit(buildTheatre(view.root, asset, P.theatre || {})) : surfaceKit(buildPatient(view.root, asset));
      ctl.scene = P.build(view, kit);
      const [t, d, th, ph] = ctl.scene.home; view.home = {target: t.clone(), dist: d, theta: th, phi: ph};
      onReady(ctl, view);
      stage.classList.remove('is-loading');
    }).catch(e => {
      console.error(e); stage.classList.remove('is-loading');
      const f = document.createElement('div'); f.className = 'stage-fail'; f.textContent = ICA.t('stage.fail'); stage.appendChild(f);
    });
    return ctl;
  }
  /* Cihaz sayfası: adım adım uygulama sahnesi */
  function mountPlacement(stage, key) {
    const ctl = mountScene(stage, key, {}, (c, view) => { c.scene.go(c.current, true); view.onReset = () => c.scene.go(c.current); });
    return ctl;
  }
  /* Ana sayfa: tamamlanmış uygulama, yavaş dönüş */
  function mountShowcase(stage, key = 'forehead-eeg') {
    return mountScene(stage, key, {}, (c, view) => {
      c.scene.go(c.count - 1, true);
      view.jumpTo(view.home.target, .78, .7, 1.35); view.auto = true;
      view.onReset = () => { view.focus(view.home.target, .78, .7, 1.35); view.auto = true; };
    });
  }
  return {ready: key => !!PLACEMENTS[key], keys: () => Object.keys(PLACEMENTS), mountPlacement, mountShowcase};
})();
