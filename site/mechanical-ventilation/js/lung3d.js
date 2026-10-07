'use strict';
/* Mekanik Ventilasyon Atlası · 3B akciğer sahnesi
   Ameliyat masasındaki tam vücut hasta (MakeHuman CC0; İleri Monitörizasyon Atlası ile aynı model) yarı saydam
   gösterilir; içinde şematik akciğerler, trakeobronşiyal ağaç, diyafram ve moda göre hava yolu arayüzü bulunur.
   Sahne fizik motorundan gelen örneklerle sürülür: akciğer hacmi (V), akım yönü ve hızı (parçacıklar),
   kas eforu (diyafram), dış basınç (kuiras), Edi (NAVA kateteri). Ölçekler eğitim amaçlı şematiktir.
   Koordinatlar: ayakta duruş koordinatı (metre, y yukarı, z öne, hastanın solu +x) → kit.toWorld ile sahneye. */
const LUNG3D = (() => {
  if (typeof K3 === 'undefined' || !K3 || !THREE.GLTFLoader) return null;
  const {std} = K3;
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lin = h => new THREE.Color(h).convertSRGBToLinear();
  const clear = () => std(0xDCEBF2, .15, 0, {transparent: true, opacity: .55, depthWrite: false});
  const corr = () => std(0x8FB7CC, .4, 0, {transparent: true, opacity: .8});
  const glow = (c, o = .9) => std(c, .5, 0, {transparent: true, opacity: o, emissive: lin(c).multiplyScalar(.25)});

  /* ---------- Hasta ve masa (İleri Monitörizasyon Atlası buildTheatre sadeleştirmesi) ---------- */
  const TABLE_TOP = .9, TABLE_HALF = .27;
  let bodyAsset = null;
  const loadBody = () => bodyAsset || (bodyAsset = new Promise((res, rej) => new THREE.GLTFLoader().load(MVA.root + 'models/body/patient.glb', g => res(g.scene), undefined, rej)));

  function theatre(root, scene) {
    const pt = scene.clone(true), group = new THREE.Group();
    group.add(pt); group.rotation.x = -Math.PI / 2; root.add(group);
    let body = null;
    pt.traverse(o => { if (o.isMesh) { o.castShadow = o.receiveShadow = false; if (o.name === 'body') body = o; } });
    group.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(body);
    group.position.set(0, TABLE_TOP - box.min.y - .006, -(box.min.z + box.max.z) / 2);
    group.updateMatrixWorld(true);
    const lmData = (pt.getObjectByName('patient') || pt).userData.landmarks || {};
    const lm = k => pt.localToWorld(V3(...lmData[k]));
    /* Deri yarı saydam; göz kapağı/kaş gibi ek ağlar daha da soluk */
    pt.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = o.name === 'body' ? .26 : .12; o.material.depthWrite = false; } });
    body.geometry = body.geometry.clone();
    const M = {pad: std(0x5A6670, .78, 0), padTop: std(0x6C7883, .7, 0), steel: std(0xC9D0D5, .3, .85), base: std(0x8E989F, .45, .4), gel: std(0x6FA9C4, .35, 0, {transparent: true, opacity: .85})};
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; root.add(m); return m; };
    const bb = new THREE.Box3().setFromObject(body);
    const zMin = bb.min.z - .1, zMax = bb.max.z + .12, len = zMax - zMin, zc = (zMin + zMax) / 2;
    add(new THREE.BoxGeometry(TABLE_HALF * 2, .07, len), M.pad, 0, TABLE_TOP - .035, zc);
    add(new THREE.BoxGeometry(TABLE_HALF * 2 - .02, .012, len - .02), M.padTop, 0, TABLE_TOP - .004, zc);
    [-1, 1].forEach(s => add(new THREE.BoxGeometry(.012, .028, len - .1), M.steel, s * (TABLE_HALF + .012), TABLE_TOP - .06, zc));
    add(new THREE.BoxGeometry(.32, TABLE_TOP - .2, .42), M.base, 0, (TABLE_TOP - .2) / 2 + .06, zc);
    add(new THREE.BoxGeometry(.62, .06, 1.05), M.base, 0, .03, zc);
    [-1, 1].forEach(s => {
      if (!lmData['wrist.L']) return;
      const wr = lm(s > 0 ? 'wrist.L' : 'wrist.R'), sh = lm(s > 0 ? 'upperarm01.L' : 'upperarm01.R');
      const x0 = TABLE_HALF - .02, x1 = Math.abs(wr.x) + .08, top = Math.min(wr.y, sh.y) - .03;
      add(new THREE.BoxGeometry(x1 - x0, .045, .16), M.pad, s * (x0 + x1) / 2, top - .0225, wr.z);
      add(new THREE.CylinderGeometry(.018, .018, top - .045 - (TABLE_TOP - .07), 16), M.steel, s * (x0 + .05), (top - .045 + TABLE_TOP - .07) / 2, wr.z);
    });
    return {pt, body, toWorld: v => pt.localToWorld(v.clone()), toLocal: v => pt.worldToLocal(v.clone())};
  }

  /* Gövdesiz şematik görünüm (yenidoğan, osilasyon): aynı koordinatlar, yatar pozisyonda */
  function bare(root) {
    const g = new THREE.Group(); g.rotation.x = -Math.PI / 2; g.position.set(0, .2, 1.27); root.add(g); g.updateMatrixWorld(true);
    return {pt: g, body: null, toWorld: v => g.localToWorld(v.clone()), toLocal: v => g.worldToLocal(v.clone())};
  }

  /* ---------- Akciğer geometrisi: deforme küre (apeks dar, taban diyaframa göre içbükey, medial yüz düz, solda kardiyak çentik) ---------- */
  function lungGeo(side) {
    const g = new THREE.SphereGeometry(1, 56, 40), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      if (y > 0) { const k = 1 - .38 * y * y; x *= k; z *= k; }
      const r2 = x * x + z * z;
      if (y < 0) y += .5 * -y * Math.max(0, 1 - r2 * 1.1);
      const u = x * side;
      if (u < 0) x *= .42;
      if (side > 0 && u < .25 && z > 0 && y < .25) x += side * .38 * z * Math.min(1, (.25 - y) * 1.4) * (u < 0 ? 1 : (1 - u / .25));
      z += -.12 * Math.max(0, -u) ;
      p.setXYZ(i, x, y, z);
    }
    g.computeVertexNormals(); return g;
  }

  /* ---------- Bronş ağacı: yinelemeli dallanma, akciğer elipsoidi içinde ---------- */
  function bronchi(W, lungs) {
    const segs = [], leaves = [];
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    function grow(a, dir, len, r, gen, side, path) {
      const b = a.clone().addScaledVector(dir, len);
      const L = lungs[side > 0 ? 1 : 0], c = L.c, ax = L.ax;
      const q = V3((b.x - c.x) / ax.x, (b.y - c.y) / ax.y, (b.z - c.z) / ax.z);
      if (q.length() > .88) b.copy(c).add(V3(q.x * ax.x, q.y * ax.y, q.z * ax.z).multiplyScalar(.86 / q.length()));
      segs.push({a, b, r});
      const np = path.concat([b]);
      if (gen >= 4) { leaves.push(np); return; }
      /* lob bronşları: sağda üst, orta (önde), alt; solda üst ve alt */
      const lobar = side < 0 ? [V3(-.5, .9, .2), V3(-.55, -.3, .75), V3(-.35, -.9, -.4)] : [V3(.5, .85, .25), V3(.4, -.9, -.3)];
      const n = gen < 1 ? lobar.length : 2;
      for (let k = 0; k < n; k++) {
        const spread = gen < 1 ? lobar[k].clone() : V3(side * (.4 + rnd() * .5) * (k ? 1 : -.4), (rnd() - .65) * 1.6, (rnd() - .5) * 1.4);
        const d = dir.clone().multiplyScalar(gen < 1 ? .1 : .7).add(spread.normalize()).normalize();
        grow(b, d, (gen < 1 ? .045 : len * .72), r * .68, gen + 1, side, np);
      }
    }
    /* Trakea krikoidden (C6) karinaya (T4–5) önden arkaya iner. Sağ ana bronş kısa ve dik, sol ana bronş uzun ve yatay */
    const top = V3(0, 1.505, .052), carina = V3(0, 1.36, .018);
    segs.push({a: top, b: carina, r: .0085});
    [[-1, V3(-.45, -.88, -.06), .026], [1, V3(.8, -.58, -.06), .05]].forEach(([s, d, l]) => grow(carina, d.normalize(), l, .0064, 0, s, [top, carina]));
    const mat = std(0xE6DDD3, .55, 0, {transparent: true, opacity: .9});
    const group = new THREE.Group();
    for (const sg of segs) {
      const a = W(sg.a.x, sg.a.y, sg.a.z), b = W(sg.b.x, sg.b.y, sg.b.z), d = b.clone().sub(a), l = d.length();
      const m = new THREE.Mesh(new THREE.CylinderGeometry(sg.r * .82, sg.r, l, 10, 1), mat);
      m.position.copy(a).addScaledVector(d, .5); m.quaternion.setFromUnitVectors(V3(0, 1, 0), d.normalize()); group.add(m);
      const j = new THREE.Mesh(new THREE.SphereGeometry(sg.r * .9, 10, 8), mat); j.position.copy(b); group.add(j);
    }
    return {group, leaves: leaves.map(p => p.map(v => W(v.x, v.y, v.z)))};
  }

  /* ---------- Sahne ---------- */
  /* o: {iface:'ett'|'niv'|'mouth'|'cuirass'|'jet'|'dlt'|'nava'|'nasal'|'none', bare:bool, two:bool} */
  function mount(stage, o = {}) {
    const view = new K3.Viewer(stage, {target: [0, 1.05, -.45], dist: 1.25, theta: .75, phi: .95, minD: .2, maxD: 3.2, fov: 30, shadow: 1.2, groundR: 1.5, panLim: .8, fitAspect: 1.2});
    const ctl = {ready: false, sample: null, sim: null, labels: true, view};
    stage.classList.add('is-loading');
    (o.bare ? Promise.resolve(null) : loadBody()).then(asset => {
      if (view.disposed) return;
      const kit = asset ? theatre(view.root, asset) : bare(view.root);
      build(view, kit, o, ctl);
      if (ctl.pendingView) { ctl.setView(ctl.pendingView); ctl.pendingView = null; }
      stage.classList.remove('is-loading');
      ctl.ready = true;
    }).catch(e => { console.error(e); stage.classList.remove('is-loading'); const f = document.createElement('div'); f.className = 'stage-fail'; f.textContent = MVA.t('stage.fail'); stage.appendChild(f); });
    ctl.update = (s, sim) => { ctl.sample = s; ctl.sim = sim; };
    ctl.dispose = () => view.dispose();
    ctl.setLabels = v => { ctl.labels = v; view.tags.forEach(t => { t.show = v && !t.cond || (v && t.cond && t.cond()); }); };
    /* Hazır kamera görünümü: yumuşak geçiş; sahne hazır değilse yüklenince uygulanır */
    ctl.setView = name => {
      ctl.viewName = name;
      if (ctl.onView) ctl.onView(name);
      const v = ctl.views && ctl.views[name]; if (!v) { ctl.pendingView = name; return; }
      view.focus(v.target, v.dist, v.theta, v.phi);
    };
    return ctl;
  }

  function build(view, kit, o, ctl) {
    const W = (x, y, z) => kit.toWorld(V3(x, y, z));
    const root = view.root;
    /* Akciğerler: merkez, yarı eksenler (dinlenme). Apeks klavikulanın biraz üstünde, tabanlar diyafram kubbelerinde;
       sağ akciğer daha geniş ve kısa (karaciğer), sol daha dar (kalp). Ölçüler gövde modelinin göğüs kesitlerinden alındı. */
    const LUNG = [{side: -1, c: V3(-.074, 1.292, .012), ax: V3(.064, .15, .086)}, {side: 1, c: V3(.077, 1.282, .01), ax: V3(.06, .156, .084)}];
    const lungCol = o.two ? [0xF2A3A0, 0x9CC3E8] : [0xF2B3AE, 0xF2B3AE];
    const lungs = LUNG.map((L, k) => {
      const m = new THREE.Mesh(lungGeo(L.side), std(lungCol[k], .55, 0, {transparent: true, opacity: .62, depthWrite: false, emissive: lin(lungCol[k]).multiplyScalar(.18)}));
      const anchor = W(L.c.x - L.side * .02, L.c.y + .04, L.c.z);       // hilus çevresinden büyüt
      const piv = new THREE.Group(); piv.position.copy(anchor); root.add(piv);
      m.position.copy(W(L.c.x, L.c.y, L.c.z).sub(anchor));
      /* yerel eksenleri dünya yönüne hizala: ayakta y → sahnede -z (baş yönü), z → +y */
      m.quaternion.copy(kit.pt.getWorldQuaternion(new THREE.Quaternion()));
      m.scale.set(L.ax.x, L.ax.y, L.ax.z); piv.add(m);
      m.renderOrder = 2;
      return {mesh: m, piv, base: L};
    });
    const tree = bronchi(W, LUNG); root.add(tree.group);
    const P0 = kit.pt;                                                   // ayakta koordinatlarında çizilen yapılar buraya eklenir
    const tubeL = (pts, r, mat, parent = P0, n = 40) => { const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n, r, 8, false), mat); parent.add(m); return m; };

    /* Diyafram: iki kubbe (sağ daha yüksek) ve ortada kalbin oturduğu santral tendon; arka sinüs öndekinden derin.
       İnspirasyonda kubbeler iner ve düzleşir; kas eforu kırmızı parlamayla gösterilir. */
    const dia = (() => {
      const R = 22, A = 56, pos = [], idx = [], col = [], base = [], dome = [];
      const bump = (x, z, cx, a, b, h) => { const q = 1 - ((x - cx) / a) ** 2 - ((z - .02) / b) ** 2; return q > 0 ? h * Math.pow(q, .55) : 0; };
      const mus = lin(0xB5524A), ten = lin(0xE6D8C3);
      for (let i = 0; i <= R; i++) for (let j = 0; j < A; j++) {
        const r = i / R, a = j / A * Math.PI * 2, x = .137 * r * Math.cos(a), z = .022 + .086 * r * Math.sin(a);
        const b0 = 1.045 + .05 * clamp((z + .064) / .172, 0, 1), cen = bump(x, z, 0, .055, .075, .1);
        const d0 = Math.max(bump(x, z, -.066, .085, .1, .14), bump(x, z, .07, .08, .095, .12), cen);
        base.push(b0); dome.push(d0); pos.push(x, b0 + d0, z);
        const c = mus.clone().lerp(ten, clamp(cen / .07, 0, 1) * (r < .45 ? 1 : 0)); col.push(c.r, c.g, c.b);
      }
      for (let i = 0; i < R; i++) for (let j = 0; j < A; j++) { const a = i * A + j, b = i * A + (j + 1) % A, c = (i + 1) * A + j, d = (i + 1) * A + (j + 1) % A; idx.push(a, c, b, b, c, d); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.setIndex(idx); g.computeVertexNormals();
      const m = new THREE.Mesh(g, std(0xFFFFFF, .6, 0, {vertexColors: true, transparent: true, opacity: .4, side: THREE.DoubleSide, depthWrite: false, emissive: lin(0xB5524A).multiplyScalar(.1)}));
      m.renderOrder = 1; P0.add(m);
      m.userData = {base, dome};
      return m;
    })();
    const shapeDia = (down, flat) => {
      const p = dia.geometry.attributes.position, {base, dome} = dia.userData;
      for (let i = 0; i < base.length; i++) p.setY(i, base[i] - down + dome[i] * (1 - flat));
      p.needsUpdate = true; dia.geometry.computeVertexNormals();
    };

    /* Kalp ve büyük damarlar: kalp santral tendon üzerinde, apeks sola-öne-aşağı; aort kavsi sol ana bronşun üstünden geçer */
    const heart = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), std(0xA8433F, .5, 0, {transparent: true, opacity: .55, depthWrite: false, emissive: lin(0xA8433F).multiplyScalar(.15)}));
    heart.position.set(.022, 1.228, .048); heart.scale.set(.05, .064, .044); heart.rotation.set(-.35, 0, .78); heart.renderOrder = 1; P0.add(heart);
    const heartS = heart.scale.clone();
    const vessel = (c, o = .5) => std(c, .45, 0, {transparent: true, opacity: o, depthWrite: false});
    if (kit.body) tubeL([V3(.006, 1.27, .055), V3(0, 1.345, .05), V3(.012, 1.392, .024), V3(.03, 1.386, -.012), V3(.034, 1.34, -.036), V3(.03, 1.2, -.042), V3(.024, 1.07, -.036)], .011, vessel(0xC0504D));
    if (kit.body) tubeL([V3(.024, 1.272, .076), V3(.032, 1.33, .062), V3(.036, 1.352, .038)], .0095, vessel(0x5E7FB8));

    /* Göğüs kafesi (yalnız tam gövdede): 10 kaburga çifti arkada omurgadan öne ve aşağı iner; ilk 7'si sternuma ulaşır.
       İnspirasyonda kafes omurga çevresinde hafifçe genişler (kova sapı/pompa kolu hareketinin şematik karşılığı). */
    let cage = null;
    if (kit.body) {
      const bone = std(0xEDE3CF, .65, 0, {transparent: true, opacity: .3, depthWrite: false});
      cage = new THREE.Group(); cage.position.set(0, 0, -.045); P0.add(cage);
      const Z = .045;                                                    // grup omurga çevresinde ölçeklensin diye kaydırma
      for (let i = 0; i < 10; i++) {
        const yb = 1.425 - i * .031, yf = yb - .055 - .004 * i, w = .095 + .035 * Math.min(1, i / 3), d = .084;
        const T = Math.PI * (i < 7 ? .97 : .78 - (i - 7) * .1);
        [-1, 1].forEach(s => {
          const pts = []; for (let k = 0; k <= 16; k++) { const t = T * k / 16; pts.push(V3(s * w * Math.sin(t), yb + (yf - yb) * (1 - Math.cos(t)) / 2, .022 - d * Math.cos(t) + Z)); }
          tubeL(pts, .0036, bone, cage, 32);
        });
      }
      const st = new THREE.Mesh(new THREE.BoxGeometry(.026, .19, .008), bone); st.position.set(0, 1.325, .104 + Z); st.rotation.x = .12; cage.add(st);
      [-1, 1].forEach(s => tubeL([V3(s * .018, 1.43, .097 + Z), V3(s * .08, 1.447, .078 + Z), V3(s * .15, 1.452, .035 + Z)], .0055, bone, cage, 16));
      tubeL([V3(0, 1.5, -.018), V3(0, 1.4, -.044), V3(0, 1.3, -.054), V3(0, 1.2, -.05), V3(0, 1.08, -.04)], .013, bone, P0, 30);
    }

    /* Göğüs ve karın yükselmesi: gövde köşelerine ağırlık ver */
    let rise = null;
    if (kit.body) {
      const b = kit.body, pos = b.geometry.attributes.position, base = pos.array.slice(), idx = [], wC = [], wA = [];
      b.updateMatrixWorld(true);
      const inv = new THREE.Matrix4().copy(b.matrixWorld).invert(), dirW = W(0, 0, 1).sub(W(0, 0, 0)).normalize();
      const dirL = dirW.clone().transformDirection(inv);
      const v = V3(0, 0, 0);
      for (let i = 0; i < pos.count; i++) {
        v.set(base[i * 3], base[i * 3 + 1], base[i * 3 + 2]).applyMatrix4(b.matrixWorld);
        const s = kit.toLocal(v);
        if (s.z < -.02 || Math.abs(s.x) > .2) continue;
        const ant = clamp((s.z + .02) / .14, 0, 1), lat = 1 - clamp((Math.abs(s.x) - .1) / .1, 0, 1);
        const c = Math.exp(-Math.pow((s.y - 1.26) / .09, 2)) * ant * lat, a = Math.exp(-Math.pow((s.y - 1.03) / .09, 2)) * ant * lat;
        if (c + a < .02) continue;
        idx.push(i); wC.push(c); wA.push(a);
      }
      const scale = 1 / b.matrixWorld.getMaxScaleOnAxis();
      rise = (chest, abd) => {
        const arr = pos.array;
        for (let k = 0; k < idx.length; k++) { const i = idx[k], d = (wC[k] * chest + wA[k] * abd) * scale; arr[i * 3] = base[i * 3] + dirL.x * d; arr[i * 3 + 1] = base[i * 3 + 1] + dirL.y * d; arr[i * 3 + 2] = base[i * 3 + 2] + dirL.z * d; }
        pos.needsUpdate = true;
      };
    }

    /* ---------- Hava yolu arayüzü ---------- */
    const lip = W(0, 1.565, .17), up = V3(0, 1, 0), headDir = W(0, 1.9, .17).sub(lip).setY(0).normalize(), side = new THREE.Vector3().crossVectors(headDir, up).normalize();
    const along = (p, d, l) => p.clone().addScaledVector(d, l);
    const tube = (pts, r, mat, n = 60) => { const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'centripetal'), n, r, 12, false), mat); root.add(m); return m; };
    const tags = {};
    const tag = (k, pos, cls = 'side') => { tags[k] = view.addTag(MVA.t('l3.' + k), pos, cls); return tags[k]; };
    let entry = W(0, 1.5, .04);                                         // parçacık yolunun başlangıcı
    const circuit = (start) => {
      const yEnd = along(start, headDir, .03);
      const yp = new THREE.Mesh(new THREE.CylinderGeometry(.011, .011, .03, 20), std(0x2F7DD1, .4, 0)); yp.position.copy(along(start, headDir, .015)); yp.quaternion.setFromUnitVectors(up, headDir); root.add(yp);
      [-1, 1].forEach(s2 => tube([yEnd, along(yEnd, headDir, .06).addScaledVector(side, s2 * .04), along(yEnd, headDir, .3).addScaledVector(side, s2 * .07).add(V3(0, -.05, 0)), along(yEnd, headDir, .7).addScaledVector(side, s2 * .09).add(V3(0, -.25, 0))], .011, corr(), 80));
      tag('circuit', along(yEnd, headDir, .12).add(V3(0, .05, 0)));
    };
    const iface = o.iface || 'ett';
    let jetPulse = null, ediRings = null, mouthpiece = null, shell = null, leakPuffs = null;
    if (!kit.body) {
      /* Şematik görünüm: trakea yukarı uzar, giriş etiketlenir */
      const top = W(0, 1.62, .05);
      tube([W(0, 1.505, .052), top], .0085, std(0xE6DDD3, .55, 0, {transparent: true, opacity: .9}));
      const tip = tube([top, W(0, 1.7, .06)], .006, clear());
      tag(iface === 'nasal' ? 'nasal' : 'ett', W(0, 1.68, .09));
      entry = W(0, 1.7, .06);
      tag('schematic', W(.18, 1.4, .05), 'note');
    } else if (iface === 'ett' || iface === 'jet' || iface === 'dlt' || iface === 'nava') {
      const p1 = along(lip, up, .05), p2 = along(p1, up, .02).addScaledVector(headDir, .04);
      const inside = [W(0, 1.405, .028), W(0, 1.46, .04), W(0, 1.515, .056), W(0, 1.55, .09), W(0, 1.565, .13), lip];        // uç karinanın ~4,5 cm üstünde
      tube(inside.concat([p1, p2]), .0055, std(0xBFDDEE, .2, 0, {transparent: true, opacity: .8, depthWrite: false}), 80);
      const cuff = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), std(0xC9E3EE, .2, 0, {transparent: true, opacity: .45, depthWrite: false})); cuff.position.copy(W(0, 1.432, .034)); cuff.scale.set(.011, .011, .02); cuff.quaternion.copy(kit.pt.getWorldQuaternion(new THREE.Quaternion())); root.add(cuff);
      tag('ett', lip.clone().add(V3(.04, .04, 0)));
      circuit(p2); entry = p2;
      if (iface === 'dlt') {
        /* Çift lümenli tüp: bronşiyal lümen sol ana bronşa uzanır */
        tube([W(0, 1.405, .028), W(.004, 1.375, .021), W(.028, 1.348, .015), W(.05, 1.333, .011)], .0042, std(0x2F7DD1, .35, 0, {transparent: true, opacity: .7}));
        const cuffB = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), std(0x2F7DD1, .3, 0, {transparent: true, opacity: .5})); cuffB.position.copy(W(.04, 1.34, .013)); cuffB.scale.setScalar(.007); root.add(cuffB);
        tag('dlt', W(.08, 1.43, .1));
      }
      if (iface === 'jet') {
        tube([W(0, 1.392, .025), ...inside.slice(1), p1, along(p1, up, .04).addScaledVector(side, .05)], .0016, std(0xF0A73A, .4, 0), 90);
        jetPulse = new THREE.Mesh(new THREE.SphereGeometry(.006, 12, 8), new THREE.MeshBasicMaterial({color: 0xFFC14D, transparent: true, opacity: .9}));
        jetPulse.userData.path = new THREE.CatmullRomCurve3([along(p1, up, .04).addScaledVector(side, .05), p1, ...inside.slice().reverse(), W(0, 1.392, .025)]);
        root.add(jetPulse); tag('jet', W(0, 1.45, .09));
      }
      if (iface === 'nava') {
        /* Nazogastrik Edi kateteri: burun → özofagus → mide; elektrot halkaları diyafram düzeyinde */
        const eso = [W(0, 1.62, .16), W(0, 1.6, .1), W(0, 1.53, .008), W(0, 1.45, -.01), W(.006, 1.36, -.024), W(.014, 1.25, -.03), W(.024, 1.15, -.026), W(.045, 1.06, -.006)];
        tube([along(W(0, 1.62, .16), up, .06).addScaledVector(headDir, .08), ...eso], .0022, std(0xE0E6EA, .4, 0), 120);
        const curve = new THREE.CatmullRomCurve3(eso); ediRings = [];
        for (let k = 0; k < 6; k++) { const r = new THREE.Mesh(new THREE.TorusGeometry(.0032, .0012, 8, 16), new THREE.MeshBasicMaterial({color: 0x9E7BFF})); const u = .7 + k * .035; r.position.copy(curve.getPoint(u)); r.lookAt(curve.getPoint(u + .01)); root.add(r); ediRings.push(r); }
        tag('edi', W(.06, 1.12, -.03));
      }
    } else if (iface === 'niv' || iface === 'nasal') {
      const c = W(0, 1.578, .2);
      const mask = new THREE.Group();
      if (iface === 'niv') {
        /* Ayakta koordinatlarında: kubbe yüzden öne açılır, yastık burun sırtı ve çene arasında yüze oturur, başlık başın arkasından dolanır */
        const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), clear()); dome.rotation.x = Math.PI / 2; dome.scale.set(.04, .036, .056); mask.add(dome);
        const cushion = new THREE.Mesh(new THREE.TorusGeometry(1, .1, 10, 40), std(0xE9EEF1, .6, 0, {transparent: true, opacity: .9})); cushion.scale.set(.041, .057, .04); mask.add(cushion);
        mask.position.set(0, 1.576, .157); P0.add(mask);
        const strap = new THREE.Mesh(new THREE.TorusGeometry(1, .07, 8, 48), std(0x3A4652, .8, 0)); strap.position.set(0, 1.605, .06); strap.rotation.x = Math.PI / 2 - .3; strap.scale.set(.088, .115, .088); P0.add(strap);
        tubeL([V3(0, 1.578, .19), V3(0, 1.6, .25), V3(0, 1.72, .32), V3(0, 1.95, .3)], .011, corr(), P0, 40);
        tag('mask', W(.06, 1.61, .23));
      } else {
        const bar = tube([W(-.06, 1.58, .14), W(-.02, 1.585, .172), W(.02, 1.585, .172), W(.06, 1.58, .14)], .0045, std(0xE9EEF1, .4, 0), 30);
        tube([W(.06, 1.58, .14), W(.12, 1.55, .12), W(.2, 1.5, .25), W(.35, 1.4, .3)], .009, corr());
        tag('nasal', W(.05, 1.6, .2));
      }
      entry = W(0, 1.6, .15);
      /* Kaçak: maske kenarından çıkan küçük parçacıklar */
      leakPuffs = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(30 * 3), 3)), new THREE.PointsMaterial({color: 0x9FD3E6, size: .006, transparent: true, opacity: .8, depthWrite: false}));
      leakPuffs.userData.seed = Array.from({length: 30}, (_, i) => ({a: i * 2.4, t: Math.random()}));
      leakPuffs.userData.c = c; root.add(leakPuffs);
      tag('leak', c.clone().add(V3(-.06, .03, 0)), 'note').cond = () => ctl.sim && ctl.sim.leak > .05;
    } else if (iface === 'mouth') {
      mouthpiece = new THREE.Group();
      const mp = new THREE.Mesh(new THREE.CylinderGeometry(.008, .011, .035, 16), std(0xE9EEF1, .4, 0)); mp.rotation.x = Math.PI / 2; mouthpiece.add(mp);
      root.add(mouthpiece);
      const arm = tube([W(.02, 1.62, .32), W(.15, 1.6, .4), W(.3, 1.4, .45)], .006, std(0x6A7782, .4, .5));
      mouthpiece.userData.on = lip.clone().add(V3(0, .012, 0)); mouthpiece.userData.off = W(.02, 1.6, .3);
      mouthpiece.position.copy(mouthpiece.userData.off); mouthpiece.quaternion.setFromUnitVectors(V3(0, 1, 0), up);
      tube([W(.02, 1.62, .32), W(.05, 1.75, .4), W(.15, 1.6, .5)], .009, corr());
      entry = lip.clone();
      tag('mouth', W(.06, 1.66, .3));
    } else if (iface === 'cuirass') {
      const g = new THREE.SphereGeometry(1, 40, 20, 0, Math.PI, 0, Math.PI);
      shell = new THREE.Mesh(g, std(0xBFD8E6, .25, 0, {transparent: true, opacity: .32, side: THREE.DoubleSide, depthWrite: false}));
      shell.position.copy(W(0, 1.18, .03)); shell.scale.set(.2, .2, .13);
      shell.quaternion.copy(kit.pt.getWorldQuaternion(new THREE.Quaternion())); shell.rotateX(Math.PI / 2); shell.rotateY(0);
      root.add(shell);
      tube([W(.16, 1.18, .12), W(.3, 1.15, .2), W(.45, 1.0, .25)], .014, corr());
      entry = W(0, 1.6, .17);
      tag('cuirass', W(.18, 1.28, .2));
    }
    tag('lungR', W(-.155, 1.32, .02)); tag('lungL', W(.15, 1.37, .02)); tag('trachea', W(-.04, 1.47, .06)); tag('diaphragm', W(.16, 1.1, -.02));
    tag('heart', W(.06, 1.17, .1));
    /* Ayrıntı etiketleri yalnız ilgili kamera görünümünde */
    tag('carina', W(.03, 1.355, .05)).cond = () => ctl.viewName === 'airway';
    if (kit.body) tag('ribs', W(-.13, 1.4, .08)).cond = () => ctl.viewName === 'front' || ctl.viewName === 'side';

    /* ---------- Hava parçacıkları: giriş → bronş ucu yolları ---------- */
    const paths = tree.leaves.map(p => new THREE.CatmullRomCurve3([entry, ...p.slice(0)], false, 'centripetal'));
    const N = 160, pg = new THREE.BufferGeometry(), pp = new Float32Array(N * 3), pc = new Float32Array(N * 3);
    pg.setAttribute('position', new THREE.BufferAttribute(pp, 3)); pg.setAttribute('color', new THREE.BufferAttribute(pc, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({size: kit.body ? .0065 : .006, vertexColors: true, transparent: true, opacity: .95, depthWrite: false, sizeAttenuation: true}));
    pts.renderOrder = 3; root.add(pts);
    const P = Array.from({length: N}, (_, i) => ({path: i % paths.length, u: (i * .618) % 1, side: paths.length ? (tree.leaves[i % paths.length].slice(-1)[0].x) : 0}));
    const cIn = lin(0x3BA7FF), cOut = lin(0x9AA3AB), cL = lin(0xFF7A59);

    /* ---------- Kare güncellemesi ---------- */
    let tm = 0;
    view.tick.push(dt => {
      tm += dt;
      const s = ctl.sample, sim = ctl.sim; if (!s || !sim) return;
      const two = sim.lungs.length > 1;
      /* şişme oranı: gevşeme hacmine göre hacim / (C × 25 cmH₂O) */
      lungs.forEach((L, k) => {
        const lung = two ? sim.lungs[k] : sim.lungs[0];
        const inf = clamp(lung.V / (lung.C * 25), -.2, 1.6);
        const sc = 1 + .2 * inf;
        L.piv.scale.set(sc, sc, sc);
      });
      const infAll = clamp(sim.V / (sim.C * 25), -.2, 1.6);
      const act = clamp(s.pmus / 8, 0, 1);
      shapeDia(.022 * infAll + .008 * act, clamp(.25 * clamp(infAll, 0, 1) + .15 * act, 0, .45));
      if (cage) { const k = 1 + .025 * clamp(infAll, 0, 1.4); cage.scale.set(k, 1, k); }
      if (!REDUCED_MOTION) { const hb = 1 + .03 * Math.max(0, Math.sin(tm * 7.5)); heart.scale.copy(heartS).multiplyScalar(hb); }
      dia.material.emissive.copy(lin(0xFF5A3C)).multiplyScalar(.08 + .6 * act);
      if (rise) rise(.012 * infAll, .009 * infAll + .006 * act);
      if (ediRings) ediRings.forEach(r => { r.material.color.setHSL(.72, .9, .45 + .45 * clamp(s.edi / 20, 0, 1)); });
      if (shell) shell.material.color.copy(lin(0xBFD8E6)).lerp(lin(0x5E9FD8), clamp(-s.pext / 15, 0, 1));
      if (mouthpiece) { const tgt = sim.mouth ? mouthpiece.userData.on : mouthpiece.userData.off; mouthpiece.position.lerp(tgt, 1 - Math.exp(-dt * 5)); }
      if (jetPulse) { const b = sim.br; const on = b && b.kind === 'jet'; jetPulse.visible = on; if (on) jetPulse.position.copy(jetPulse.userData.path.getPoint(clamp((sim.t - b.t0) / b.ti, 0, 1))); }
      if (leakPuffs) {
        const lp = leakPuffs.geometry.attributes.position, c = leakPuffs.userData.c, amt = clamp(sim.leak / .4, 0, 1);
        leakPuffs.visible = amt > .05;
        leakPuffs.userData.seed.forEach((q, i) => { q.t += dt * (.6 + amt); if (q.t > 1) q.t -= 1; const r = .045 + q.t * .05; lp.setXYZ(i, c.x + Math.cos(q.a) * r, c.y - .02 + q.t * .03, c.z + Math.sin(q.a) * r * .6); });
        lp.needsUpdate = true; leakPuffs.material.opacity = .8 * amt;
      }
      /* parçacıklar: akım işaretine göre ilerler; inspirasyonda mavi, ekspirasyonda gri */
      const fl = two ? s.flowL : [s.flow - (sim.mode.showLeak ? sim.leak : 0)];
      for (let i = 0; i < N; i++) {
        const q = P[i], f = two ? fl[q.side > 0 ? 1 : 0] : fl[0];
        const speed = f * (kit.body ? 1.1 : 1.1 * .05 / Math.max(sim.C, .0005));
        q.u += speed * dt * (.6 + .4 * ((i * 37) % 10) / 10);
        if (q.u > 1) q.u -= 1; if (q.u < 0) q.u += 1;
        const pnt = paths[q.path].getPoint(q.u);
        pp[i * 3] = pnt.x; pp[i * 3 + 1] = pnt.y; pp[i * 3 + 2] = pnt.z;
        const c = f > .005 ? cIn : f < -.005 ? cOut : cOut;
        const k = clamp(Math.abs(f) * 4, .25, 1);
        pc[i * 3] = c.r * k; pc[i * 3 + 1] = c.g * k; pc[i * 3 + 2] = c.b * k;
      }
      pg.attributes.position.needsUpdate = true; pg.attributes.color.needsUpdate = true;
      for (const k in tags) { const t = tags[k]; t.show = ctl.labels && (!t.cond || t.cond()); }
    });
    /* Kamera görünümleri. theta: 0 ayak yönü, -π/2 hastanın sağı; phi: 0 tepeden. Önden görünüm akciğer grafisi düzenindedir
       (baş yukarıda, hastanın solu ekranın sağında). Genel görünüm sağdan, ayak tarafından ve yukarıdan bakar. */
    const k = kit.body ? 1 : .75, chest = W(0, 1.3, .02);
    ctl.views = {
      over: {target: chest, dist: 1.3 * k, theta: -.85, phi: .95},
      front: {target: chest, dist: 1.3 * k, theta: 0, phi: .26},
      side: {target: W(0, 1.31, .02), dist: 1.25 * k, theta: -Math.PI / 2, phi: 1.32},
      airway: {target: W(0, 1.47, .07), dist: .8 * k, theta: -1.4, phi: 1.12}
    };
    ctl.viewName = 'over';
    view.home = Object.assign({}, ctl.views.over);
    view.jumpTo(chest.clone(), view.home.dist, view.home.theta, view.home.phi);
    view.onReset = () => ctl.setView('over');
  }

  return {mount};
})();
