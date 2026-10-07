'use strict';
/* İleri Monitörizasyon Atlası · ortak 3B görüntüleyici
   Yörünge kamerası, yakınlaştırma, kaydırma, odaklanma animasyonu ve sahne üzerindeki HTML etiketleri.
   three.js r128, site/vendor altından yüklenir. */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const REDUCED_MOTION = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

const K3 = (() => {
  const has3D = (() => { try { if (!window.THREE) return false; const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } })();
  if (!has3D) return null;

  const lin = h => new THREE.Color(h).convertSRGBToLinear();
  const std = (c, r = .5, m = 0, extra) => new THREE.MeshStandardMaterial(Object.assign({color: lin(c), roughness: r, metalness: m}, extra || {}));

  /* Yumuşak stüdyo ışığı için basit ortam haritası */
  function makeEnv(r) {
    const pm = new THREE.PMREMGenerator(r), s = new THREE.Scene(), geo = new THREE.SphereGeometry(10, 32, 16), pos = geo.attributes.position, cols = [];
    for (let i = 0; i < pos.count; i++) { const y = pos.getY(i) / 10, c = new THREE.Color().setHSL(.5, .1, .2 + .55 * (y * .5 + .5)); cols.push(c.r, c.g, c.b); }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    s.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.BackSide})));
    const lm = new THREE.MeshBasicMaterial({color: new THREE.Color(4, 4, 4)});
    [[0, 8, 3, 8, 4], [6, 3, 4, 3, 5], [-6, 4, -2, 3, 4]].forEach(([x, y, z, w, h]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lm); m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m); });
    const t = pm.fromScene(s, .03).texture; pm.dispose(); return t;
  }

  const viewers = [];

  class Viewer {
    /* o: {target:[x,y,z], dist, theta, phi, minD, maxD, fov, shadow, groundR, panLim} */
    constructor(el, o) {
      this.el = el; this.o = o;
      const r = new THREE.WebGLRenderer({antialias: true, alpha: true});
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.ACESFilmicToneMapping; r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
      r.domElement.className = 'gl'; el.prepend(r.domElement); this.renderer = r;
      this.scene = new THREE.Scene(); this.scene.environment = makeEnv(r);
      this.camera = new THREE.PerspectiveCamera(o.fov || 30, 1, .01, 20);
      this.home = {target: new THREE.Vector3(...o.target), dist: o.dist, theta: o.theta, phi: o.phi};
      this.v = {target: this.home.target.clone(), dist: o.dist, theta: o.theta, phi: o.phi};
      this.goal = null; this.distMul = 1; this.auto = false; this.visible = false; this.tick = []; this.tags = [];

      this.scene.add(new THREE.HemisphereLight(0xffffff, 0x7d8a94, .55));
      const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(1.2, 2.6, 2.2); key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
      const sc = key.shadow.camera, S = o.shadow || .6; sc.left = -S; sc.right = S; sc.top = S; sc.bottom = -S; sc.near = .5; sc.far = 8; key.shadow.bias = -.0005; key.shadow.radius = 4;
      this.scene.add(key);
      const rim = new THREE.DirectionalLight(0xc6e6ff, .45); rim.position.set(-2, 1.4, -2); this.scene.add(rim);
      const gr = new THREE.Mesh(new THREE.CircleGeometry(o.groundR || .6, 48), new THREE.ShadowMaterial({opacity: .18}));
      gr.rotation.x = -Math.PI / 2; gr.receiveShadow = true; this.scene.add(gr);
      this.root = new THREE.Group(); this.scene.add(this.root);

      this.layer = el.querySelector('.pins'); this.tmp = new THREE.Vector3();
      this.bind();
      if ('ResizeObserver' in window) new ResizeObserver(() => this.resize()).observe(el); else addEventListener('resize', () => this.resize());
      this.resize();
      el.querySelectorAll('.stage-tools [data-act]').forEach(b => b.addEventListener('click', () => {
        const a = b.dataset.act;
        if (a === 'in') this.zoom(.8); else if (a === 'out') this.zoom(1.25); else if (a === 'reset') { this.onReset ? this.onReset() : this.reset(); }
      }));
      viewers.push(this);
    }
    resize() {
      const cv = this.renderer.domElement, w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
      this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.w = w; this.h = h;
      const a = w / h, fa = this.o.fitAspect || 1.1; this.distMul = a < fa ? Math.pow(fa / a, .8) : 1;
    }
    bind() {
      const c = this.renderer.domElement, pts = new Map(); let pinch = null, mode = 'rot';
      const pinfo = () => { const a = [...pts.values()]; return {mx: (a[0].x + a[1].x) / 2, my: (a[0].y + a[1].y) / 2, d: Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y)}; };
      /* Dokunulabilir ekranlar (this.hits: [{mesh, on(type, u, v) → bool, hover(u, v) → bool}]): ışın ilk çarptığı nesne
         kayıtlı ekransa dokunuş ekrana gider, sahne dönmez. */
      const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(); let scr = null;
      const hitAt = e => {
        if (!this.hits || !this.hits.length) return null;
        const r = c.getBoundingClientRect(); ndc.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
        ray.setFromCamera(ndc, this.camera);
        const f = ray.intersectObject(this.root, true).find(h => h.object.visible); if (!f || !f.uv) return null;
        const H = this.hits.find(h => h.mesh === f.object); return H ? {H, u: f.uv.x, v: f.uv.y} : null;
      };
      c.addEventListener('contextmenu', e => e.preventDefault());
      c.addEventListener('pointerdown', e => {
        if (!pts.size) { const s = hitAt(e); if (s && s.H.on('down', s.u, s.v)) { scr = {id: e.pointerId, H: s.H}; this.auto = false; this.goal = null; try { c.setPointerCapture(e.pointerId); } catch (_) {} return; } }
        pts.set(e.pointerId, {x: e.clientX, y: e.clientY}); this.auto = false; this.goal = null;
        try { c.setPointerCapture(e.pointerId); } catch (_) {}
        c.classList.add('drag'); mode = (e.button === 1 || e.button === 2 || e.shiftKey) ? 'pan' : 'rot'; pinch = pts.size === 2 ? pinfo() : null;
      });
      c.addEventListener('pointermove', e => {
        if (scr && e.pointerId === scr.id) { const s = hitAt(e); if (s && s.H === scr.H) scr.H.on('move', s.u, s.v); return; }
        if (!pts.size && this.hits && this.hits.length && e.pointerType === 'mouse') { const s = hitAt(e); c.style.cursor = s && s.H.hover && s.H.hover(s.u, s.v) ? 'pointer' : ''; }
        const p = pts.get(e.pointerId); if (!p) return;
        const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
        if (pts.size >= 2) { const n = pinfo(); if (pinch) { this.pan(n.mx - pinch.mx, n.my - pinch.my); if (n.d > 0 && pinch.d > 0) this.v.dist = clamp(this.v.dist * pinch.d / n.d, this.o.minD, this.o.maxD); } pinch = n; return; }
        if (mode === 'pan') this.pan(dx, dy); else { this.v.theta -= dx * .008; this.v.phi = clamp(this.v.phi - dy * .006, .25, 1.75); }
      });
      const end = e => { if (scr && e.pointerId === scr.id) { scr.H.on('up', 0, 0); scr = null; return; } if (!pts.has(e.pointerId)) return; pts.delete(e.pointerId); pinch = pts.size === 2 ? pinfo() : null; if (!pts.size) c.classList.remove('drag'); };
      c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
      /* Sayfa kaydırmasını bozmamak için yalnızca Ctrl/⌘ + tekerlek yakınlaştırır */
      c.addEventListener('wheel', e => { if (!(e.ctrlKey || e.metaKey)) return; e.preventDefault(); this.zoom(Math.exp(e.deltaY * .01)); }, {passive: false});
    }
    pan(dx, dy) {
      this.goal = null; this.camera.updateMatrixWorld();
      const k = this.v.dist * this.distMul * 2 * Math.tan(this.camera.fov * Math.PI / 360) / (this.h || 1);
      const r = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0), u = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
      this.v.target.addScaledVector(r, -dx * k).addScaledVector(u, dy * k);
      const H = this.home.target, L = this.o.panLim || .3;
      this.v.target.set(clamp(this.v.target.x, H.x - L, H.x + L), clamp(this.v.target.y, H.y - L, H.y + L), clamp(this.v.target.z, H.z - L, H.z + L));
    }
    zoom(f) { if (this.goal) { this.v.target.copy(this.goal.target); this.goal = null; } this.v.dist = clamp(this.v.dist * f, this.o.minD, this.o.maxD); }
    /* Kamerayı yumuşak geçişle yeni bakış noktasına götür */
    focus(t, d, th, ph) {
      let x = th; const c = this.v.theta;
      while (x - c > Math.PI) x -= 2 * Math.PI; while (x - c < -Math.PI) x += 2 * Math.PI;
      this.goal = {target: t.clone ? t.clone() : new THREE.Vector3(...t), dist: d, theta: x, phi: ph}; this.auto = false;
    }
    /* Animasyonsuz konumlandırma */
    jumpTo(t, d, th, ph) { this.goal = null; this.v = {target: t.clone(), dist: d, theta: th, phi: ph}; }
    reset() { this.focus(this.home.target, this.home.dist, this.home.theta, this.home.phi); }
    addTag(text, pos, cls = '') { const s = document.createElement('span'); s.className = 'tag3d ' + cls; s.textContent = text; s.hidden = true; this.layer.appendChild(s); const tg = {el: s, pos, show: true}; this.tags.push(tg); return tg; }
    frame(dt, t) {
      if (this.goal) {
        const k = REDUCED_MOTION ? 1 : 1 - Math.exp(-dt * 4), G = this.goal;
        this.v.target.lerp(G.target, k); this.v.dist += (G.dist - this.v.dist) * k; this.v.theta += (G.theta - this.v.theta) * k; this.v.phi += (G.phi - this.v.phi) * k;
        if (Math.abs(G.dist - this.v.dist) < 1e-4 && this.v.target.distanceTo(G.target) < 1e-4 && Math.abs(G.theta - this.v.theta) < 1e-4) this.goal = null;
      }
      if (this.auto && !REDUCED_MOTION) this.v.theta += dt * .18;
      const d = this.v.dist * this.distMul, s = Math.sin(this.v.phi), T = this.v.target;
      this.camera.position.set(T.x + d * s * Math.sin(this.v.theta), T.y + d * Math.cos(this.v.phi), T.z + d * s * Math.cos(this.v.theta)); this.camera.lookAt(T);
      for (const f of this.tick) f(dt, t);
      this.renderer.render(this.scene, this.camera);
      const camDir = new THREE.Vector3().subVectors(T, this.camera.position).normalize();
      /* İsteğe bağlı örtülme denetimi: modelin arkasında kalan işaretler soluklaşır (birkaç karede bir) */
      const occ = this.occluders && (this._occN = ((this._occN || 0) + 1) % 6) === 0;
      if (occ) { this._ray = this._ray || new THREE.Raycaster(); }
      for (const tg of this.tags) {
        if (occ && tg.show) {
          const to = tg.pos.clone().sub(this.camera.position), dd = to.length();
          this._ray.set(this.camera.position, to.normalize()); this._ray.far = dd;
          const hit = this._ray.intersectObjects(this.occluders, true).find(h => h.object.visible && !(h.object.material && h.object.material.transparent && h.object.material.opacity < .5));
          tg.el.classList.toggle('behind', !!hit && hit.distance < dd - Math.max(.015, dd * .03));
        }
        this.tmp.copy(tg.pos).project(this.camera);
        /* Kameraya arkası dönük yüzeydeki etiketleri gizle */
        const facing = !tg.normal || tg.normal.dot(camDir) < .15;
        const vis = tg.show && facing && this.tmp.z < 1 && Math.abs(this.tmp.x) < 1.02 && Math.abs(this.tmp.y) < 1.02;
        tg.el.hidden = !vis;
        if (vis) {
          /* Etiket sahne kenarından taşmasın */
          const half = tg.el.offsetWidth / 2 + 6, x = clamp((this.tmp.x * .5 + .5) * this.w, half, this.w - half);
          tg.el.style.transform = `translate(${x.toFixed(1)}px,${((-this.tmp.y * .5 + .5) * this.h).toFixed(1)}px) translate(-50%,-50%)`;
        }
      }
    }
  }

  let last = performance.now();
  (function loop(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    /* Görünürlük her karede ölçülür (yalnızca ekrandaki sahneler çizilir). IntersectionObserver, düzen sonradan
       değiştiğinde bazı ortamlarda eski durumda kalabildiği için kullanılmıyor. */
    for (const v of viewers) { const r = v.el.getBoundingClientRect(); v.visible = r.width > 0 && r.bottom > -120 && r.top < innerHeight + 120; }
    /* Bir sahnedeki hata diğer sahneleri ve döngüyü durdurmasın; ilk hata bir kez kaydedilir */
    for (const v of viewers) if (v.visible && !v.failed) { try { v.frame(dt, now / 1000); } catch (e) { v.failed = true; console.error('[ICA 3B]', e && e.stack || e); } }
    requestAnimationFrame(loop);
  })(last);

  return {Viewer, std, lin, viewers};
})();
