'use strict';
/* Cihaz yapılandırmaları E: hava yolu (laringoskoplar, bronkoskop, aspirasyon), infüzyon pompaları, sıvı/hasta ısıtma,
   hücre kurtarma, defibrilatör/pacing ve manuel resüsitatör. Bunlar cihaz türleridir (kind:'type'); fotoğrafı olanlarda
   renk ve oranlar fotoğraftan, olmayanlarda markadan bağımsız genel biçim kullanılmıştır. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, torus, lathe, tube, corrugated, put, canvasTex, decal, makeScreen} = DEV3D.H;
  const {nameplate} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Ortak yardımcılar ---------- */
  /* Süpürme: y-z düzlemindeki bir eğri boyunca 2B kesit (profile: [[yanal(x), normal], ...] kapalı çokgen) */
  function sweep(path, profile, mat, capEnds = true, scale) {
    const pts = path.map(p => Array.isArray(p) ? V3(...p) : p);
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const N = 48, P = profile.length, pos = [], idx = [];
    const X = V3(1, 0, 0);
    for (let i = 0; i <= N; i++) {
      const u = i / N, c = curve.getPointAt(u), t = curve.getTangentAt(u).normalize();
      const n = new THREE.Vector3().crossVectors(t, X).normalize(), [sa, sb] = scale ? scale(u) : [1, 1];
      profile.forEach(([a, b]) => { const v = c.clone().addScaledVector(X, a * sa).addScaledVector(n, b * sb); pos.push(v.x, v.y, v.z); });
    }
    for (let i = 0; i < N; i++) for (let j = 0; j < P; j++) {
      const a = i * P + j, b = i * P + (j + 1) % P, c = a + P, d = b + P; idx.push(a, c, b, b, c, d);
    }
    if (capEnds) {
      const tri = THREE.ShapeUtils.triangulateShape(profile.map(p => new THREE.Vector2(p[0], p[1])), []);
      tri.forEach(([a, b, c]) => { idx.push(a, c, b); const o = N * P; idx.push(o + a, o + b, o + c); });
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); m.material.side = THREE.DoubleSide; m.castShadow = m.receiveShadow = true; return m;
  }
  /* Kamera görüntüsü (laringoskop/bronkoskop): glottis ya da karina; örnek görüntü */
  function scopeView(kind, w, h) {
    const tex = canvasTex(512, Math.round(512 * h / w), (g, W, Hh) => {
      const bg = g.createRadialGradient(W / 2, Hh / 2, 10, W / 2, Hh / 2, W * .7); bg.addColorStop(0, '#E39A8E'); bg.addColorStop(.55, '#A9463F'); bg.addColorStop(1, '#2A0B0A');
      g.fillStyle = bg; g.fillRect(0, 0, W, Hh);
      if (kind === 'glottis') {
        g.fillStyle = '#1B0505'; g.beginPath(); g.moveTo(W * .5, Hh * .32); g.lineTo(W * .42, Hh * .78); g.lineTo(W * .58, Hh * .78); g.closePath(); g.fill();
        g.strokeStyle = '#F4E7DD'; g.lineWidth = 9; g.beginPath(); g.moveTo(W * .5, Hh * .3); g.lineTo(W * .4, Hh * .8); g.moveTo(W * .5, Hh * .3); g.lineTo(W * .6, Hh * .8); g.stroke();
        g.fillStyle = '#C9655C'; g.beginPath(); g.ellipse(W * .5, Hh * .2, W * .16, Hh * .09, 0, 0, 7); g.fill();
        g.fillStyle = '#B85A52'; [[.36, .86], [.64, .86]].forEach(([x, y]) => { g.beginPath(); g.arc(W * x, Hh * y, W * .05, 0, 7); g.fill(); });
      } else {
        g.fillStyle = '#C97A70'; g.beginPath(); g.arc(W / 2, Hh / 2, Hh * .36, 0, 7); g.fill();
        [[.38, .55], [.62, .55]].forEach(([x, y]) => { const r = g.createRadialGradient(W * x, Hh * y, 2, W * x, Hh * y, Hh * .16); r.addColorStop(0, '#050101'); r.addColorStop(1, '#7A2E28'); g.fillStyle = r; g.beginPath(); g.ellipse(W * x, Hh * y, Hh * .11, Hh * .15, 0, 0, 7); g.fill(); });
        g.strokeStyle = 'rgba(255,235,225,.5)'; g.lineWidth = 3; for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(W / 2, Hh / 2, Hh * (.4 + k * .06), Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
      }
      g.fillStyle = '#E6EEF2'; g.font = '600 22px "JetBrains Mono", monospace'; g.fillText('▮▮▮▯', W - 80, 30);
    });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({map: tex, toneMapped: false})); m.userData.part = 'screen'; return m;
  }
  /* Yazılı plaka */
  const label = (text, w, h, ink, bg) => nameplate(text, w, h, ink, bg);
  /* Yuvarlatılmış dikdörtgen kesit (süpürme için) */
  const rrProfile = (hw, hh, r = .35, n = 4) => { const out = [], rr = Math.min(hw, hh) * r; [[hw - rr, hh - rr, 0], [-hw + rr, hh - rr, 1], [-hw + rr, -hh + rr, 2], [hw - rr, -hh + rr, 3]].forEach(([cx, cy, q]) => { for (let k = 0; k <= n; k++) { const a = (q + k / n) * Math.PI / 2; out.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } }); return out; };
  /* Tırtıllı (knurl) metal yüzey dokusu */
  function knurlMat(color = 0xD5DADE) {
    const t = canvasTex(256, 256, (g, W, Hh) => { g.fillStyle = '#9AA2A8'; g.fillRect(0, 0, W, Hh); g.strokeStyle = '#F2F4F5'; g.lineWidth = 3; for (let k = -W; k < W * 2; k += 16) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + Hh, Hh); g.stroke(); g.beginPath(); g.moveTo(k, Hh); g.lineTo(k + Hh, 0); g.stroke(); } });
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3);
    return K3.std(color, .38, .85, {map: t, bumpMap: t, bumpScale: .0006});
  }
  /* Parçaları iç gruptan dünya koordinatına taşımak için */
  const toWorld = (inner, x, y, z) => { inner.updateMatrixWorld(true); return inner.localToWorld(V3(x, y, z)); };
  /* Yere/cihaza uzanan esnek hat (kablo ya da infüzyon seti) */
  const line = (pts, r = .002, c = 0xE9EEF1, o = .8) => tube(pts, r, c === 'clear' ? M.clear(0xE6F1F5, o) : M.plastic(c));

  /* ---------- Parça metinleri ---------- */
  /* (cihaz bölümlerinde eklenir) */

  /* ---------- Kurucular ve yapılandırmalar ---------- */

  /* ===== Direkt laringoskop: tırtıllı sap + Macintosh bıçak (flanş, ışık kaynağı) =====
     cfg: {blade: bıçak uzunluğu (m), handleColor, bladeColor} */
  DEV3D.register('e-direct-laryngoscope', cfg => {
    const g = new THREE.Group(), parts = [], inner = new THREE.Group(); g.add(inner);
    inner.rotation.y = Math.PI / 2;
    const hl = .125, r = .0145;
    /* Sap: tırtıllı gövde, uç kapakları, kanca bağlantısı */
    put(inner, cyl(r, r, hl * .82, knurlMat(cfg.handleColor || 0xD9DEE2), 40), 0, hl * .5, 0);
    put(inner, cyl(r * 1.04, r * .98, hl * .09, M.chrome(), 40), 0, hl * .045, 0);
    put(inner, cyl(r * 1.04, r * 1.04, hl * .09, M.chrome(), 40), 0, hl * .955, 0);
    put(inner, box(.016, .012, .024, M.chrome()), 0, hl + .006, .002);
    put(inner, cyl(.0025, .0025, .02, M.metal(), 16), 0, hl + .007, .006, 0, 0, Math.PI / 2);
    /* Bıçak: dil plakası + dikey duvar + üst flanş (Z kesit), Macintosh eğrisi */
    const L = cfg.blade || .13, y0 = hl + .012;
    const path = [[0, y0, .004], [0, y0 + .004, L * .3], [0, y0 - .002, L * .58], [0, y0 - .018, L * .82], [0, y0 - .036, L]];
    const prof = [[.0105, -.0016], [.0105, 0], [-.0085, 0], [-.0085, .0115], [-.0005, .0115], [-.0005, .0132], [-.0105, .0132], [-.0105, -.0016]];
    inner.add(sweep(path, prof, M.chrome(), true, u => [1 - u * .2, u > .78 ? Math.max(.25, 1 - (u - .78) * 3.4) : 1]));
    /* Distal uç kabarığı */
    put(inner, cyl(.0024, .0024, .018, M.chrome(), 16), -.0005, y0 - .0365, L + .0005, 0, 0, Math.PI / 2);
    /* Işık kaynağı (ampul/LED) duvarın sağında */
    const lc = new THREE.CatmullRomCurve3(path.map(p => V3(...p)), false, 'centripetal').getPointAt(.52);
    put(inner, cyl(.0035, .0035, .007, M.chrome(), 16), -.0055, lc.y + .004, lc.z, 0, 0, Math.PI / 2);
    put(inner, sphere(.003, M.led(0xFFF6D8)), -.0018, lc.y + .004, lc.z);
    parts.push({key: 'e-lhandle', at: toWorld(inner, 0, hl * .5, r + .004)}, {key: 'e-hinge', at: toWorld(inner, 0, hl + .012, .002)},
      {key: 'e-blade', at: toWorld(inner, .006, y0 + .002, L * .35)}, {key: 'e-flange', at: toWorld(inner, -.008, y0 + .014, L * .55)},
      {key: 'e-light', at: toWorld(inner, -.002, lc.y + .008, lc.z)}, {key: 'e-tip', at: toWorld(inner, 0, y0 - .036, L + .004)});
    return {group: g, parts, screens: []};
  });
  T('e-lhandle', {tr: ['Sap', 'Tırtıllı yüzeyli metal saptır; içinde ışık kaynağının pili bulunur.'], en: ['Handle', 'Knurled metal handle; it houses the battery for the light source.'], es: ['Mango', 'Mango metálico moleteado; aloja la batería de la fuente de luz.']});
  T('e-hinge', {tr: ['Kanca bağlantısı', 'Bıçağın sapa takıldığı menteşeli bağlantıdır; bıçak açıldığında ışık devresi kapanır.'], en: ['Hook-on fitting', 'Hinged fitting where the blade attaches to the handle; opening the blade completes the light circuit.'], es: ['Conexión de enganche', 'Conexión articulada donde la pala se fija al mango; al abrir la pala se cierra el circuito de luz.']});
  T('e-blade', {tr: ['Macintosh bıçak (dil plakası)', 'Kavisli plaka dili kaldırıp kenara iter; ucu valleküla içine yerleştirilir.'], en: ['Macintosh blade (spatula)', 'The curved plate lifts and displaces the tongue; its tip is placed in the vallecula.'], es: ['Pala Macintosh (espátula)', 'La placa curva eleva y desplaza la lengua; su punta se coloca en la vallécula.']});
  T('e-flange', {tr: ['Flanş', 'Bıçağın sol kenarındaki duvar ve üst kenar; dili görüş hattının dışında tutar.'], en: ['Flange', 'Wall and top edge on the left of the blade; keeps the tongue out of the line of sight.'], es: ['Reborde', 'Pared y borde superior a la izquierda de la pala; mantiene la lengua fuera de la línea de visión.']});
  T('e-light', {tr: ['Işık kaynağı', 'Bıçak üzerindeki ampul ya da fiberoptik/LED çıkış; larenks girişini aydınlatır.'], en: ['Light source', 'Bulb or fibre-optic/LED outlet on the blade; illuminates the laryngeal inlet.'], es: ['Fuente de luz', 'Bombilla o salida de fibra óptica/LED de la pala; ilumina la entrada laríngea.']});
  T('e-tip', {tr: ['Bıçak ucu', 'Künt, kalınlaştırılmış distal uç; dokuya travmayı azaltmak için yuvarlatılmıştır.'], en: ['Blade tip', 'Blunt, thickened distal end, rounded to reduce tissue trauma.'], es: ['Punta de la pala', 'Extremo distal romo y engrosado, redondeado para reducir el traumatismo tisular.']});
  DEV3D.model('direct-laryngoscope', {type: 'e-direct-laryngoscope', blade: .13});

  /* ===== Videolaringoskop: J biçimli kameralı bıçak/sap + bağlantı kablosu + ayrı monitör =====
     cfg: {color, connector, monitorW} */
  DEV3D.register('e-videolaryngoscope', cfg => {
    const g = new THREE.Group(), parts = [], screens = [], inner = new THREE.Group(); g.add(inner);
    inner.rotation.y = Math.PI / 2; inner.position.set(.05, 0, .04);
    const dark = M.plastic(cfg.color || 0x262B31, .32);
    const path = [[0, .172, .004], [0, .13, .007], [0, .088, .003], [0, .05, -.003], [0, .026, .016], [0, .021, .05], [0, .027, .088], [0, .033, .118]];
    inner.add(sweep(path, rrProfile(.012, .011, .5), dark, true, u => u < .42 ? [1, 1] : [1 - (u - .42) * .25, Math.max(.28, 1 - (u - .42) * 1.6)]));
    /* Üst burun ve kamera kablosu bağlantı yuvası */
    put(inner, rbox(.024, .028, .04, .011, dark), 0, .172, .01, -.25, 0, 0);
    put(inner, cyl(.0105, .0115, .014, M.matte(0x1A1E22), 28), 0, .183, -.012, -.95, 0, 0);
    put(inner, torus(.0095, .0016, M.color(cfg.ring || 0x6CC04A, .4), 28), 0, .1875, -.017, -.95 + Math.PI / 2, 0, 0);
    /* Kablo ucu (mavi konnektör) */
    put(inner, cyl(.009, .011, .03, M.color(cfg.connector || 0x3BA3D8, .35), 24), 0, .2, -.035, -.95, 0, 0);
    /* Kamera penceresi bıçağın alt yüzünde */
    put(inner, cyl(.0045, .0045, .002, M.glass(0x0B1A24, .9), 20), 0, .014, .052, -.25, 0, 0);
    put(inner, sphere(.002, M.matte(0x0A0D10)), 0, .0135, .053);
    /* Monitör: ayaklı, kameradan görüntü */
    const mw = cfg.monitorW || .19, mh = mw * .74, mx = -.15, mz = -.06, my = .07 + mh / 2;
    const mon = new THREE.Group(); mon.position.set(mx, my, mz); mon.rotation.set(-.12, .35, 0); g.add(mon);
    mon.add(rbox(mw, mh, .028, .008, M.matte(0x2B3035)));
    const scr = scopeView('glottis', mw * .86, mh * .8); put(mon, scr, -mw * .02, mh * .03, .0145);
    put(mon, label('◉  ⏻', mw * .3, .012, '#C9D0D5'), mw * .3, -mh / 2 + .01, .0145);
    put(g, box(.02, my - mh / 2, .02, M.matte(0x3A4148)), mx, (my - mh / 2) / 2, mz - .01);
    put(g, rbox(.16, .012, .12, .004, M.matte(0x3A4148)), mx, .006, mz - .01);
    mon.updateMatrixWorld(true);
    /* Kablo: konnektörden monitöre */
    const c0 = toWorld(inner, 0, .212, -.047);
    g.add(line([c0, c0.clone().add(V3(-.02, .05, 0)), V3(-.02, .2, -.04), V3(mx + mw * .3, my, mz - .05), mon.localToWorld(V3(mw * .4, 0, -.014))], .003, 0xB9C1C7));
    parts.push({key: 'screen', at: mon.localToWorld(V3(0, 0, .03))}, {key: 'e-vhandle', at: toWorld(inner, .014, .1, 0)},
      {key: 'e-vblade', at: toWorld(inner, .012, .03, .1)}, {key: 'e-camera', at: toWorld(inner, 0, .008, .055)},
      {key: 'e-vconnector', at: toWorld(inner, 0, .2, -.035)}, {key: 'mount', at: V3(mx + .06, .015, mz + .04)});
    return {group: g, parts, screens};
  });
  T('e-vhandle', {tr: ['Sap', 'Elle kavranan bölüm; kamera ve aydınlatma elektroniğini taşır ya da tek kullanımlık bıçağın içine yerleştirilen video çubuğunu barındırır.'], en: ['Handle', 'The gripped section; carries the camera and lighting electronics or houses the video baton inserted into a single-use blade.'], es: ['Mango', 'La sección que se sujeta; lleva la electrónica de cámara e iluminación o aloja el bastón de vídeo insertado en una pala de un solo uso.']});
  T('e-vblade', {tr: ['Bıçak', 'Macintosh benzeri ya da hiperanguler (çok açılı) bıçak; glottisin doğrudan görüş hattı olmadan görüntülenmesini sağlar.'], en: ['Blade', 'Macintosh-type or hyperangulated blade; allows the glottis to be viewed without a direct line of sight.'], es: ['Pala', 'Pala tipo Macintosh o hiperangulada; permite visualizar la glotis sin línea de visión directa.']});
  T('e-camera', {tr: ['Kamera ve ışık', 'Bıçağın distal bölümündeki kamera ve LED; görüntüyü ekrana iletir.'], en: ['Camera and light', 'Camera and LED on the distal part of the blade; send the image to the display.'], es: ['Cámara y luz', 'Cámara y LED en la parte distal de la pala; envían la imagen a la pantalla.']});
  T('e-vconnector', {tr: ['Video kablosu bağlantısı', 'Bıçağı/sapı monitöre bağlayan kablonun takıldığı yuvadır.'], en: ['Video cable connector', 'Socket for the cable that links the blade/handle to the monitor.'], es: ['Conector del cable de vídeo', 'Toma para el cable que conecta la pala/mango con el monitor.']});
  DEV3D.model('videolaryngoscope', {type: 'e-videolaryngoscope', theta: .2});

  /* ===== Esnek bronkoskop: sap + açılandırma kolu + çalışma kanalı + esnek kordon + görüntü ünitesi =====
     cfg: {color, cord} */
  DEV3D.register('e-bronchoscope', cfg => {
    const g = new THREE.Group(), parts = [], hy = .2;
    const body = M.plastic(cfg.color || 0x2F3A44, .4), acc = M.color(cfg.accent || 0x2F8FD0, .4);
    /* Tutucu: taban, direk, beşik */
    put(g, rbox(.12, .012, .1, .004, M.plastic(0xC9D0D5)), 0, .006, -.03);
    put(g, box(.012, hy + .06, .012, M.plastic(0xC9D0D5)), 0, (hy + .06) / 2, -.045);
    put(g, rbox(.03, .016, .03, .006, M.plastic(0xC9D0D5)), 0, hy + .06, -.028);
    /* Sap (lathe), üstte kablo çıkışı */
    const h = new THREE.Group(); h.position.set(0, hy, 0); g.add(h);
    h.add(lathe([[0, 0], [.005, 0], [.007, .012], [.013, .03], [.016, .06], [.017, .1], [.019, .125], [.017, .145], [.008, .152], [0, .153]], body));
    put(h, cyl(.0045, .006, .025, M.rubber(0x2B3035), 16), 0, .162, -.006, -.4, 0, 0);
    /* Açılandırma kolu (başparmak) arka üstte */
    put(h, cyl(.004, .004, .012, M.metal(), 12), 0, .118, -.017, Math.PI / 2, 0, 0);
    put(h, rbox(.014, .03, .006, .003, acc), 0, .128, -.025, .35, 0, 0);
    /* Aspirasyon düğmesi (ön üst) ve aspirasyon bağlantısı */
    put(h, cyl(.006, .006, .01, M.plastic(0xE9EEF1), 20), 0, .128, .018, Math.PI / 2, 0, 0);
    put(h, cyl(.0035, .003, .022, M.plastic(0xE9EEF1), 16), 0, .1, .02, 1.1, 0, 0);
    /* Çalışma kanalı girişi (ön alt, eğik) ve kapağı */
    put(h, cyl(.004, .0045, .022, M.plastic(0xDDE3E7), 16), 0, .04, .02, .8, 0, 0);
    put(h, cyl(.0055, .0055, .007, M.color(0xD9534F, .5), 16), 0, .049, .028, .8, 0, 0);
    /* Esnek kordon (yere uzanır, kıvrılır) ve bükülebilir uç */
    const cord = [[0, hy + .002, 0], [0, hy - .05, .003], [.005, .08, .03], [.05, .004, .12], [.2, .004, .14], [.26, .004, .02], [.18, .004, -.1], [.06, .004, -.08], [.02, .004, .02]];
    g.add(tube(cord, .0028, M.matte(cfg.cord || 0x2E3439), 160));
    g.add(tube([[.02, .004, .02], [.0, .005, .06], [.01, .01, .085]], .003, M.matte(0x4A5258), 20));
    put(g, sphere(.0032, M.matte(0x111417)), .012, .011, .087);
    /* Görüntü ünitesi */
    const mw = .2, mh = .145, mx = -.2, my = .1 + mh / 2, mz = -.04;
    const mon = new THREE.Group(); mon.position.set(mx, my, mz); mon.rotation.set(-.1, .3, 0); g.add(mon);
    mon.add(rbox(mw, mh, .03, .01, M.plastic(0xE9EEF1)));
    put(mon, rbox(mw * .9, mh * .84, .004, .003, M.matte(0x1B2126)), 0, .002, .015);
    put(mon, scopeView('carina', mw * .86, mh * .78), 0, .002, .0175);
    put(g, box(.02, my - mh / 2, .02, M.matte(0x3A4148)), mx, (my - mh / 2) / 2, mz - .01);
    put(g, rbox(.15, .012, .11, .004, M.matte(0x3A4148)), mx, .006, mz - .01);
    mon.updateMatrixWorld(true);
    g.add(line([V3(0, hy + .17, -.014), V3(0, hy + .23, -.04), V3(-.1, hy + .2, -.08), mon.localToWorld(V3(mw * .45, 0, -.015))], .0028, 0x3B4249));
    parts.push({key: 'screen', at: mon.localToWorld(V3(0, 0, .03))}, {key: 'e-bhandle', at: V3(.02, hy + .08, 0)}, {key: 'e-lever', at: V3(0, hy + .135, -.03)},
      {key: 'e-suction-btn', at: V3(0, hy + .128, .028)}, {key: 'e-channel', at: V3(0, hy + .05, .034)}, {key: 'e-cord', at: V3(.2, .012, .14)},
      {key: 'e-btip', at: V3(.012, .02, .087)}, {key: 'mount', at: V3(.03, .02, -.03)});
    return {group: g, parts, screens: []};
  });
  T('e-bhandle', {tr: ['Kumanda sapı', 'Bronkoskopun tutulduğu bölüm; kontrol elemanlarını ve görüntü kablosu çıkışını taşır.'], en: ['Control handle', 'The part by which the bronchoscope is held; carries the controls and the video cable outlet.'], es: ['Mango de control', 'Parte por la que se sujeta el broncoscopio; lleva los controles y la salida del cable de vídeo.']});
  T('e-lever', {tr: ['Açılandırma kolu', 'Başparmakla itilip çekilerek distal ucun tek düzlemde yukarı/aşağı bükülmesini sağlar.'], en: ['Angulation lever', 'Pushed or pulled with the thumb to bend the distal tip up or down in one plane.'], es: ['Palanca de angulación', 'Se empuja o tira con el pulgar para flexionar la punta distal hacia arriba o abajo en un plano.']});
  T('e-suction-btn', {tr: ['Aspirasyon düğmesi', 'Basıldığında çalışma kanalı üzerinden aspirasyon uygulanır; aspirasyon hattı yanındaki bağlantıya takılır.'], en: ['Suction button', 'When pressed, suction is applied through the working channel; the suction line attaches to the adjacent connector.'], es: ['Botón de aspiración', 'Al pulsarlo se aplica aspiración a través del canal de trabajo; la línea de aspiración se conecta al conector contiguo.']});
  T('e-channel', {tr: ['Çalışma kanalı girişi', 'İlaç/sıvı uygulaması, aspirasyon ve aletlerin geçişi için kullanılan kanalın kapaklı girişidir.'], en: ['Working channel port', 'Capped entry to the channel used for instilling fluid, suction and passing instruments.'], es: ['Puerto del canal de trabajo', 'Entrada con tapón al canal usado para instilar líquidos, aspirar y pasar instrumentos.']});
  T('e-cord', {tr: ['Esnek giriş kordonu', 'Hava yoluna ilerletilen esnek bölüm; içinde görüntü, ışık ve çalışma kanalı bulunur.'], en: ['Flexible insertion cord', 'The flexible section advanced into the airway; contains the imaging, light and working channel.'], es: ['Cordón de inserción flexible', 'Sección flexible que se avanza en la vía aérea; contiene la imagen, la luz y el canal de trabajo.']});
  T('e-btip', {tr: ['Bükülebilir distal uç', 'Kamera/ışık ve kanal ağzını taşır; açılandırma koluyla yönlendirilir.'], en: ['Bending distal tip', 'Carries the camera/light and channel opening; steered with the angulation lever.'], es: ['Punta distal flexible', 'Lleva la cámara/luz y la abertura del canal; se dirige con la palanca de angulación.']});
  DEV3D.model('flexible-bronchoscope', {type: 'e-bronchoscope', theta: .35});

  /* Analog gösterge kadranı (decal): {min, max, step, value, unit, label} */
  function gaugeFace(r, o) {
    return decal(r * 2, r * 2, (g, W) => {
      const c = W / 2; g.fillStyle = '#F7F8F6'; g.beginPath(); g.arc(c, c, c * .98, 0, 7); g.fill();
      g.strokeStyle = '#1B2328'; g.lineWidth = W * .012; g.stroke();
      const a0 = Math.PI * .75, a1 = Math.PI * 2.25, f = v => a0 + (v - o.min) / (o.max - o.min) * (a1 - a0);
      g.fillStyle = '#1B2328'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `600 ${Math.round(W * .075)}px Archivo, Arial`;
      for (let v = o.min; v <= o.max + 1e-6; v += o.step) { const a = f(v); g.lineWidth = W * .012; g.beginPath(); g.moveTo(c + Math.cos(a) * c * .82, c + Math.sin(a) * c * .82); g.lineTo(c + Math.cos(a) * c * .92, c + Math.sin(a) * c * .92); g.stroke(); g.fillText(String(v), c + Math.cos(a) * c * .66, c + Math.sin(a) * c * .66); }
      g.font = `600 ${Math.round(W * .07)}px Archivo, Arial`; g.fillText(o.unit || '', c, c * 1.35); if (o.label) g.fillText(o.label, c, c * .62);
      const a = f(o.value); g.strokeStyle = '#C8352E'; g.lineWidth = W * .02; g.beginPath(); g.moveTo(c, c); g.lineTo(c + Math.cos(a) * c * .8, c + Math.sin(a) * c * .8); g.stroke();
      g.fillStyle = '#1B2328'; g.beginPath(); g.arc(c, c, W * .04, 0, 7); g.fill();
    });
  }

  /* ===== Aspirasyon: duvar vakum regülatörü + gösterge + toplama kabı + Yankauer ucu ===== */
  DEV3D.register('e-suction', cfg => {
    const g = new THREE.Group(), parts = [];
    /* Duvar paneli ve ray */
    put(g, box(.42, .62, .02, M.plastic(0xDCE3E6, .6)), 0, .31, -.07);
    put(g, box(.4, .025, .012, M.metal()), 0, .36, -.054);
    /* Regülatör: gövde, gösterge, ayar düğmesi, mod anahtarı, duvar bağlantısı */
    const rx = -.09, ry = .5;
    put(g, box(.03, .03, .03, M.metal()), rx, ry, -.045);
    put(g, cyl(.042, .042, .05, M.plastic(0xF2F4F5), 40), rx, ry, -.01, Math.PI / 2, 0, 0);
    put(g, torus(.041, .004, M.chrome(), 40), rx, ry, .016);
    put(g, gaugeFace(.037, {min: 0, max: 600, step: 100, value: 150, unit: 'mmHg', label: 'VAC'}), rx, ry, .0165);
    put(g, cyl(.04, .04, .002, M.glass(0xEAF4F7, .2), 40), rx, ry, .018, Math.PI / 2, 0, 0);
    put(g, box(.05, .04, .04, M.plastic(0xF2F4F5)), rx, ry - .06, -.015);
    put(g, cyl(.016, .016, .018, M.matte(0x2B3238), 24), rx, ry - .06, .012, Math.PI / 2, 0, 0);
    put(g, box(.016, .008, .006, M.color(0x2F7DD1)), rx + .035, ry - .06, .005);
    put(g, label('OFF  REG  FULL', .05, .007, '#2B3238'), rx, ry - .092, .006);
    put(g, cyl(.004, .004, .02, M.chrome(), 12), rx, ry - .09, -.01);
    /* Toplama kabı: şeffaf kap, sıvı, kapak ve portlar; raya takılı tutucu */
    const cx = .1, cy = .16, ch = .2, cr = .055;
    put(g, box(.03, .04, .05, M.metal()), cx, .36, -.035);
    put(g, torus(cr + .004, .004, M.metal(), 40), cx, cy + ch * .25, 0, Math.PI / 2, 0, 0);
    put(g, box(.012, .36 - cy - ch * .25, .008, M.metal()), cx, (.36 + cy + ch * .25) / 2, -cr - .008);
    put(g, cyl(cr, cr * .94, ch, M.clear(0xEAF4F7, .4), 40, true), cx, cy, 0);
    put(g, cyl(cr * .95, cr * .9, ch * .28, M.color(0xC9635A, .3), 40), cx, cy - ch * .35, 0);
    put(g, cyl(cr * .94, cr * .94, .004, M.clear(0xEAF4F7, .5), 40), cx, cy - ch / 2, 0);
    put(g, cyl(cr + .004, cr + .004, .018, M.plastic(0x2F7DD1, .45), 40), cx, cy + ch / 2 + .008, 0);
    [[-.025, 'PAT'], [.025, 'VAC']].forEach(([dx]) => put(g, cyl(.006, .007, .02, M.plastic(0xF2F4F5), 16), cx + dx, cy + ch / 2 + .026, .01));
    /* Hortumlar: regülatör → kap (VAC), kap (PAT) → Yankauer */
    g.add(line([[rx, ry - .1, -.01], [rx, ry - .16, .02], [cx + .025, cy + ch / 2 + .09, .03], [cx + .025, cy + ch / 2 + .036, .01]], .0045, 'clear', .55));
    const yk = [[.02, .012, .2], [-.08, .01, .19], [-.2, .012, .17]];
    g.add(line([[cx - .025, cy + ch / 2 + .036, .01], [cx - .04, cy + ch / 2 + .12, .06], [cx + .15, .25, .14], [.18, .01, .2], [.1, .012, .21], yk[0]], .0045, 'clear', .55));
    /* Yankauer: düz sap + kavisli uç + topuz */
    g.add(tube([...yk, [-.24, .016, .16], [-.27, .03, .15]], .0055, M.clear(0x7FB6CC, .8), 40));
    put(g, sphere(.0075, M.clear(0x7FB6CC, .85)), -.272, .032, .149);
    put(g, cyl(.0075, .0065, .03, M.clear(0x7FB6CC, .8), 16), .015, .012, .2, 0, 0, Math.PI / 2);
    parts.push({key: 'e-regulator', at: V3(rx + .03, ry - .06, .02)}, {key: 'e-gauge', at: V3(rx, ry + .02, .025)}, {key: 'e-wall', at: V3(rx, ry - .09, .0)},
      {key: 'e-canister', at: V3(cx + cr, cy, .02)}, {key: 'e-lid', at: V3(cx, cy + ch / 2 + .03, .03)}, {key: 'e-stube', at: V3(.18, .03, .2)}, {key: 'e-yankauer', at: V3(-.24, .03, .16)});
    return {group: g, parts, screens: []};
  });
  T('e-regulator', {tr: ['Vakum regülatörü', 'Merkezi vakumdan gelen negatif basıncı ayarlar; düğme seviyeyi, mod anahtarı kapalı/ayarlı/tam vakum seçimini yapar.'], en: ['Vacuum regulator', 'Adjusts the negative pressure from the central vacuum; the knob sets the level and the mode switch selects off/regulated/full vacuum.'], es: ['Regulador de vacío', 'Ajusta la presión negativa del vacío central; el mando fija el nivel y el selector elige apagado/regulado/vacío total.']});
  T('e-gauge', {tr: ['Vakum göstergesi', 'Ayarlanan negatif basıncı mmHg ya da kPa olarak gösterir; ayar, hasta hattı kapatılarak okunur.'], en: ['Vacuum gauge', 'Shows the set negative pressure in mmHg or kPa; the setting is read with the patient line occluded.'], es: ['Manómetro de vacío', 'Muestra la presión negativa ajustada en mmHg o kPa; el ajuste se lee con la línea del paciente ocluida.']});
  T('e-wall', {tr: ['Duvar vakum bağlantısı', 'Regülatörü merkezi vakum çıkışına takan geçmeli bağlantıdır.'], en: ['Wall vacuum connector', 'Quick-connect probe that plugs the regulator into the central vacuum outlet.'], es: ['Conexión de vacío de pared', 'Conector rápido que enchufa el regulador a la toma de vacío central.']});
  T('e-canister', {tr: ['Toplama kabı', 'Aspire edilen sekresyonları toplar; dolma ve taşma koruması kapakta ya da iç torbadadır.'], en: ['Collection canister', 'Collects aspirated secretions; fill and overflow protection is in the lid or liner.'], es: ['Recipiente colector', 'Recoge las secreciones aspiradas; la protección contra llenado y rebose está en la tapa o en la bolsa interior.']});
  T('e-lid', {tr: ['Kapak ve portlar', 'Hasta (PAT) ve vakum (VAC) portlarını taşır; hortumların doğru porta takılması gerekir.'], en: ['Lid and ports', 'Carries the patient (PAT) and vacuum (VAC) ports; the tubes must be attached to the correct port.'], es: ['Tapa y puertos', 'Lleva los puertos de paciente (PAT) y de vacío (VAC); los tubos deben conectarse al puerto correcto.']});
  T('e-stube', {tr: ['Aspirasyon hortumu', 'Kabı aspirasyon ucuna ya da kateterine bağlayan şeffaf hortumdur.'], en: ['Suction tubing', 'Clear tubing linking the canister to the suction tip or catheter.'], es: ['Tubo de aspiración', 'Tubo transparente que une el recipiente con la cánula o sonda de aspiración.']});
  T('e-yankauer', {tr: ['Yankauer ucu', 'Ağız ve orofarinks aspirasyonu için sert, kavisli uç; geniş lümenli ve uç kısmı topuzludur.'], en: ['Yankauer tip', 'Rigid, curved tip for mouth and oropharyngeal suction; wide-bore with a bulbous end.'], es: ['Cánula Yankauer', 'Cánula rígida y curva para aspiración de boca y orofaringe; de gran calibre y con punta bulbosa.']});
  DEV3D.model('suction', {type: 'e-suction', theta: .3});

  /* ===== Ortak infüzyon pompası (şırınga / volümetrik) =====
     cfg: {kind:'syringe'|'volumetric', screen:spec, units:[{screen, fill, liquid}] (alt alta ek pompalar), fill (0–1), liquid,
           stripe (renk bandı), lineColor, lineTag ('EPIDURAL' gibi), handset:bool, handsetColor, lock:bool, bag:bool} */
  DEV3D.register('e-pump', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = .24, h = .072, d = .15, gap = .006, stackN = 1 + (cfg.units || []).length, vol = cfg.kind === 'volumetric';
    const white = M.plastic(0xF1F3F4, .4), black = M.matte(0x16191C, .35), grey = M.plastic(0xC9CED2, .45);
    const yTop = .008 + stackN * (h + gap);
    /* Arka direk kesiti ve kelepçe */
    const poleH = cfg.bag ? .615 : yTop - .004;
    put(g, cyl(.0125, .0125, poleH, M.metal()), -.03, poleH / 2, -d / 2 - .03);
    put(g, rbox(.05, .05, .04, .006, M.matte(0x3A4148)), -.03, yTop - h * .6, -d / 2 - .02);
    parts.push({key: 'mount', at: V3(-.03, yTop - h * .6, -d / 2 - .045)});
    const unit = (k, spec, fill, liquid) => {
      const y0 = .008 + (stackN - 1 - k) * (h + gap), yc = y0 + h / 2, first = k === 0;
      if (vol) put(g, rbox(w, h, d, .012, white), 0, yc, 0);
      else {
        /* Gövde üstünde şırınga oluğu: alt blok + ön ve arka bloklar */
        const hl = h - .035; put(g, rbox(w, hl, d, .01, white), 0, y0 + hl / 2, 0);
        put(g, rbox(w, h, .0775, .012, white), 0, yc, .03625); put(g, rbox(w, h, .0375, .01, white), 0, yc, -.05625);
      }
      [-1, 1].forEach(s => put(g, box(.03, .008, d * .8, grey), s * w * .38, y0 - .002, 0));
      /* Ön panel: siyah yüz, ekran, tuşlar, LED'ler */
      const fw = vol ? w * .76 : w * .96, fx = vol ? -w * .11 : 0;
      put(g, rbox(fw, h * .86, .004, .01, black), fx, yc, d / 2 + .001);
      /* Ekran oranı fotoğraftaki gibi yaklaşık 3:1 (volümetrik pompada da şırınga pompasıyla aynı ekran) */
      const sw = vol ? fw - .046 : w * .62, sh = vol ? h * .62 : h * .66, sx = fx + fw / 2 - sw / 2 - .012;
      const scr = makeScreen(sw, sh, spec, 768); put(g, scr.mesh, sx, yc, d / 2 + .0035); screens.push(scr);
      const kx = fx - fw / 2 + .022;
      put(g, cyl(.0075, .0075, .004, M.plastic(0xF4F6F7), 24), kx, yc + h * .24, d / 2 + .004, Math.PI / 2, 0, 0);
      put(g, cyl(.0075, .0075, .004, black, 24), kx, yc, d / 2 + .004, Math.PI / 2, 0, 0);
      put(g, torus(.0068, .0008, M.plastic(0xF4F6F7), 24), kx, yc, d / 2 + .0062);
      put(g, cyl(.0075, .0075, .004, M.color(0xE0262B, .4), 24), kx, yc - h * .24, d / 2 + .004, Math.PI / 2, 0, 0);
      put(g, box(.003, .003, .002, M.led(0x2ECC71)), kx - .012, yc + h * .05, d / 2 + .004);
      if (cfg.stripe) put(g, box(fw * .9, .004, .002, M.color(cfg.stripe, .4)), fx, yc + h * .4, d / 2 + .004);
      if (first) parts.push({key: 'screen', at: V3(sx, yc, d / 2 + .01)}, {key: 'keypad', at: V3(kx, yc, d / 2 + .012)}, {key: 'alarm', at: V3(kx - .012, yc + h * .05, d / 2 + .01)});
      if (vol) {
        /* Kapak (kaset/hat yuvası) ve açma düğmesi; hat üstten girip alttan çıkar */
        const dx = w / 2 - w * .12;
        put(g, rbox(w * .22, h * .9, .006, .01, black), dx, yc, d / 2 + .002);
        put(g, cyl(.009, .009, .004, M.plastic(0xC9CED2), 24), dx, yc, d / 2 + .006, Math.PI / 2, 0, 0);
        put(g, box(.006, .003, .002, M.matte(0x2B3238)), dx, yc + .001, d / 2 + .0085);
        g.add(line([[dx + .03, y0 + h + .1, -.08], [dx + .03, y0 + h + .09, -.02], [dx + .03, y0 + h + .04, .025], [dx + .03, y0 + h, .03]], .0018, 'clear', .7));
        g.add(line([[dx + .03, y0, .03], [dx + .03, y0 - .02, .04], [dx + .1, .004, .14], [dx - .1, .004, .2]], .0018, 'clear', .7));
        if (first) parts.push({key: 'e-door', at: V3(dx, yc, d / 2 + .012)}, {key: 'e-line', at: V3(dx + .03, y0 + h + .1, .02)});
        return;
      }
      /* Şırınga: üst oyukta; gövde, sıvı, piston, sap ve kanat */
      const r = .0145, L = .1, xs0 = -w / 2 + .055, ys = y0 + h - .035 + r + .001, zs = -.02, f = fill ?? .7, xp = xs0 + L * f;
      put(g, cyl(r, r, L, M.clear(0xEEF5F8, .35), 32, true), xs0 + L / 2, ys, zs, 0, 0, Math.PI / 2);
      put(g, cyl(r * .93, r * .93, L * f, M.color(liquid || 0xDDEBF2, .25), 24), xs0 + L * f / 2, ys, zs, 0, 0, Math.PI / 2);
      put(g, cyl(r * .95, r * .95, .006, M.rubber(0x222629), 24), xp + .003, ys, zs, 0, 0, Math.PI / 2);
      put(g, cyl(.004, .004, .012, M.clear(0xEEF5F8, .6), 16), xs0 - .006, ys, zs, 0, 0, Math.PI / 2);
      put(g, box(L * 1.02, .009, .009, M.plastic(0xF4F6F7)), xp + .006 + L * .51, ys, zs);
      put(g, cyl(r * 1.05, r * 1.05, .003, M.plastic(0xF4F6F7), 24), xp + .006 + L * 1.02, ys, zs, 0, 0, Math.PI / 2);
      put(g, box(.004, r * 3.6, .007, M.clear(0xEEF5F8, .7)), xs0 + L + .001, ys, zs);
      /* Gövde kelepçesi */
      put(g, rbox(.022, .01, r * 2.6, .004, grey), xs0 + L * .55, ys + r + .004, zs);
      put(g, box(.006, r + .01, .006, grey), xs0 + L * .55, ys + .003, zs - r - .006);
      /* Piston itici: sağa taşan blok, kılavuz çubuğu, kavrama kolu */
      const xd = xp + .006 + L * 1.02 + .032;
      put(g, box(xd - w / 2, .016, .022, grey), (w / 2 + xd) / 2, yc + .006, zs);
      put(g, rbox(.06, h * .92, .085, .014, M.plastic(0xE6E9EB, .55)), xd, yc + .004, zs + .01);
      put(g, rbox(.02, h * .55, .012, .005, M.plastic(0xD9DDE0)), xd - .028, yc, zs + .055);
      /* Hat: şırınga ucundan aşağı */
      const lc = cfg.lineColor || 'clear';
      g.add(line([[xs0 - .012, ys, zs], [xs0 - .03, ys + .01, zs + .02], [-w / 2 - .03, yTop - .02, .05], [-w / 2 - .06, .004, .16], [-.02, .004, .2]], .0018, lc, .7));
      if (cfg.lineTag) put(g, label(cfg.lineTag, .04, .01, '#1B2328', '#F2C531'), -w / 2 - .045, .02, .16, -Math.PI / 2, 0, 0);
      if (first) parts.push({key: 'e-syringe', at: V3(xs0 + L * .3, ys + r, zs + r)}, {key: 'e-clamp', at: V3(xs0 + L * .55, ys + r + .012, zs)},
        {key: 'e-driver', at: V3(xd + .02, yc + h * .3, zs + .05)}, {key: 'e-line', at: V3(-w / 2 - .05, .03, .14)});
    };
    unit(0, cfg.screen || {title: ''}, cfg.fill, cfg.liquid);
    (cfg.units || []).forEach((u, i) => unit(i + 1, u.screen, u.fill, u.liquid));
    /* Kilitli şeffaf kapak (yetkisiz erişime karşı) */
    if (cfg.lock) {
      put(g, rbox(w * .98, .03, d * .62, .008, M.clear(0xDCEBF2, .32)), 0, yTop + .006, -.012);
      put(g, cyl(.006, .006, .006, M.chrome(), 20), w * .35, yTop + .022, .02);
      put(g, box(.0015, .001, .006, M.matte(0x2B3238)), w * .35, yTop + .0255, .02);
      parts.push({key: 'e-lock', at: V3(w * .35, yTop + .03, .02)});
    }
    /* Hasta el düğmesi (bolus talebi) ve kablosu */
    if (cfg.handset) {
      const hx = w / 2 + .08, hz = .17;
      const hs = new THREE.Group(); hs.position.set(hx, .016, hz); hs.rotation.y = .5; g.add(hs); hs.updateMatrixWorld(true);
      const he = hs.localToWorld(V3(0, 0, -.056)), he2 = hs.localToWorld(V3(0, 0, -.09));
      g.add(line([[w / 2 - .01, .03, -d / 2 + .01], [w / 2 + .06, .02, -d / 2 + .02], [w / 2 + .14, .008, .02], he2, he], .0022, 0x3A4148));
      put(hs, cyl(.014, .012, .11, M.plastic(0xEEF1F3), 28), 0, 0, 0, Math.PI / 2, 0, 0);
      put(hs, cyl(.0095, .0095, .006, M.color(cfg.handsetColor || 0x2E9E58, .4), 24), 0, .013, .03);
      put(hs, box(.004, .002, .004, M.led(0x2ECC71)), 0, .0135, -.01);
      parts.push({key: 'e-handset', at: V3(hx, .04, hz)});
    }
    if (cfg.extra) cfg.extra(g, {w, h, d, yTop, parts, screens});
    return {group: g, parts, screens};
  });
  /* Asılı sıvı torbası (direkte) */
  function ivBag(g, x, y, z, o = {}) {
    const bw = o.w || .09, bh = o.h || .15;
    const b = rbox(bw, bh, .022, .01, M.clear(o.tint || 0xEAF4F7, .55)); put(g, b, x, y, z);
    put(g, rbox(bw * .9, bh * (o.fill || .7), .016, .006, M.color(o.liquid || 0xD9E9F0, .2)), x, y - bh * (1 - (o.fill || .7)) / 2, z);
    put(g, label(o.text || '0.9% NaCl', bw * .7, .012, '#1B2328', 'rgba(255,255,255,.85)'), x, y + bh * .1, z + .0115);
    put(g, cyl(.004, .004, .02, M.plastic(0xF2F4F5), 12), x, y - bh / 2 - .01, z);
    put(g, cyl(.007, .006, .03, M.clear(0xEEF6F8, .6), 16), x, y - bh / 2 - .035, z);
    put(g, torus(.008, .0015, M.metal(), 16), x, y + bh / 2 + .008, z);
  }
  DEV3D.H.eIvBag = ivBag;
  /* ---------- İnfüzyon pompası ekranı (üretici fotoğrafındaki Space tipi düzen) ----------
     Solda durum sütunu (ilerleme okları, mod etiketi, kablosuz, pil, basınç seviyesi), ortada renkli ilaç bandı ve altında
     bilgi alanı (şırınga çizimi, kalan süre/doz, TCI grafiği), sağda büyük doz hızı, en altta yazılım tuşu çubuğu.
     o: {tag, bx, ux, banner:{name, conc, fill, fill2, ink}, mid:[layout], draw, right:{l, v, u, vs, sub}, arrows, soft, pill, accent} */
  const PG = '#9AA0A5', PL = 'rgba(255,255,255,.22)';
  function pumpUI(o) {
    const bx = o.bx ?? .142, ux = o.ux ?? .708, re = o.arrows ? .872 : 1, rw = re - ux, R = o.right || {}, acc = o.accent || '#F08A24';
    const L = [
      {t: 'icon', g: 'wifi', x: .02, y: .29, w: .045, h: .09, c: '#8A9095'},
      {t: 'icon', g: 'battery', x: .016, y: .44, w: .045, h: .08, c: '#8A9095'},
      {t: 'text', txt: '100%', x: .062, y: .44, w: .07, h: .08, c: '#8A9095', s: .045, wt: 500, pad: 0},
      {t: 'text', txt: o.press || '210', x: .014, y: .6, w: .06, h: .07, c: '#B9BEC2', s: .05, wt: 600, pad: 0},
      {t: 'box', x: ux - .002, y: 0, w: .003, h: .79, fill: PL}
    ];
    if (o.tag) L.push({t: 'box', x: .016, y: .165, w: bx - .03, h: .075, fill: '#C9CDD0', r: .012}, {t: 'text', txt: o.tag, x: .016, y: .165, w: bx - .03, h: .075, c: '#1B2024', s: .048, wt: 700, al: 'c'});
    const b = o.banner;
    if (b) {
      L.push({t: 'box', x: bx, y: .02, w: ux - bx - .006, h: .34, fill: b.fill});
      L.push({t: 'text', txt: b.name, x: bx, y: .03, w: ux - bx - .006, h: .17, c: b.ink || '#11181C', s: .12, wt: 700, al: 'c'});
      L.push({t: 'text', txt: b.conc, x: bx, y: .2, w: ux - bx - .006, h: .14, c: b.ink || '#11181C', s: .08, wt: 700, al: 'c'});
    }
    /* Sağ sütun: doz hızı / hedef */
    L.push({t: 'text', txt: R.l, x: ux, y: .03, w: rw, h: .12, c: PG, s: .062, wt: 500, al: 'c'},
      {t: 'text', txt: R.v, x: ux, y: R.sub ? .14 : .17, w: rw, h: .34, c: '#FFFFFF', s: R.vs || .3, wt: 400, al: 'c'},
      {t: 'text', txt: R.u, x: ux, y: R.sub ? .46 : .53, w: rw, h: .1, c: '#E6EEF2', s: .068, wt: 600, al: 'c'});
    if (R.sub) L.push({t: 'box', x: ux + .01, y: .6, w: rw - .02, h: .005, fill: PL}, {t: 'text', txt: R.sub, x: ux, y: .62, w: rw, h: .15, c: '#E6EEF2', s: .075, wt: 600, al: 'c'});
    if (o.arrows) L.push({t: 'box', x: .882, y: .03, w: .108, h: .36, fill: '#55595C', r: .01}, {t: 'box', x: .882, y: .41, w: .108, h: .36, fill: '#55595C', r: .01});
    L.push(...(o.mid || []));
    /* Alt çubuk: CHANGE VIEW + işlev tuşu, renkli alt çizgi */
    L.push({t: 'box', x: 0, y: .8, w: 1, h: .2, fill: '#5F6366'}, {t: 'box', x: 0, y: .8, w: .255, h: .2, fill: '#7E8184'},
      {t: 'text', txt: 'CHANGE VIEW', x: 0, y: .8, w: .255, h: .17, c: '#F4F6F7', s: .066, wt: 700, al: 'c'},
      {t: 'box', x: .258, y: .965, w: .742, h: .035, fill: acc});
    if (o.pill) L.push({t: 'box', x: .53, y: .835, w: .06, h: .1, fill: acc, r: .05}, {t: 'text', txt: '‹‹‹', x: .53, y: .835, w: .06, h: .1, c: '#FFFFFF', s: .07, wt: 800, al: 'c'},
      {t: 'text', txt: o.soft || 'BOLUS', x: .6, y: .8, w: .3, h: .17, c: '#F4F6F7', s: .066, wt: 700, pad: 0});
    else L.push({t: 'text', txt: o.soft || 'BOLUS', x: .258, y: .8, w: .742, h: .17, c: '#F4F6F7', s: .066, wt: 700, al: 'c'});
    return {bg: '#000000', layout: L, draw(g, t, a) {
      const {W, H} = a;
      /* İlerleme okları (soldan sağa yanıp sönen yeşil üçgenler) */
      const n = 5, cw = (bx - .03) * W / n, ph = Math.floor(t * 3) % (n + 2);
      for (let k = 0; k < n; k++) { const x = .016 * W + k * cw; g.fillStyle = k === n - 1 - ph ? '#1E5E2A' : '#3BD45A'; g.beginPath(); g.moveTo(x + cw * .9, .04 * H); g.lineTo(x + cw * .9, .135 * H); g.lineTo(x + cw * .05, .0875 * H); g.fill(); }
      /* Basınç seviyesi yayı */
      g.strokeStyle = '#B9BEC2'; g.lineWidth = Math.max(1, H * .008); g.beginPath(); g.arc(.105 * W, .675 * H, .045 * H, Math.PI, Math.PI * 1.9); g.stroke();
      g.beginPath(); g.moveTo(.105 * W, .675 * H); g.lineTo(.105 * W + .04 * H, .64 * H); g.stroke();
      /* Çapraz renkli ilaç bandı (iki renkli sınıf kodu) */
      if (b && b.fill2) { const x0 = bx * W, x1 = (ux - .006) * W, y0 = .02 * H, y1 = .36 * H, wd = x1 - x0; g.fillStyle = b.fill2; g.beginPath(); g.moveTo(x0 + wd * .78, y0); g.lineTo(x1, y0); g.lineTo(x1, y1); g.lineTo(x0 + wd * .45, y1); g.fill();
        a.txt(b.name, (x0 + x1) / 2, .115 * H, {c: b.ink, s: .12, al: 'c'}); a.txt(b.conc, (x0 + x1) / 2, .27 * H, {c: b.ink, s: .08, al: 'c'}); }
      /* Hedef ok tuşları */
      if (o.arrows) { g.fillStyle = '#C9CDD0'; const cx = .936 * W; [[.21, -1], [.59, 1]].forEach(([cy, s]) => { g.beginPath(); g.moveTo(cx - .03 * W, cy * H - s * .05 * H); g.lineTo(cx + .03 * W, cy * H - s * .05 * H); g.lineTo(cx, cy * H + s * .05 * H); g.fill(); }); }
      if (o.draw) o.draw(g, t, a);
    }};
  }
  /* Şırınga çizimi (bilgi alanında): dolum oranı ve etiket */
  const syrDraw = (fill, lbl) => (g, t, {W, H, txt}) => {
    const x0 = .16 * W, x1 = .695 * W, y0 = .43 * H, y1 = .76 * H, bx = .225 * W, bl = .4 * W, cy = (y0 + y1) / 2, bh = y1 - y0, lx = bx + bl * fill;
    g.fillStyle = '#7E878D'; g.fillRect(x0, cy - bh * .05, bx - x0, bh * .1); g.fillStyle = '#9AA3A9'; g.beginPath(); g.moveTo(x0 + (bx - x0) * .35, cy - bh * .08); g.lineTo(bx, cy - bh * .2); g.lineTo(bx, cy + bh * .2); g.lineTo(x0 + (bx - x0) * .35, cy + bh * .08); g.fill();
    g.fillStyle = '#2A3034'; g.fillRect(bx, y0, x1 - bx, bh);
    const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, '#6FB58A'); gr.addColorStop(.45, '#2F7550'); gr.addColorStop(1, '#173F2A');
    g.fillStyle = gr; g.fillRect(bx, y0 + bh * .06, lx - bx, bh * .88);
    g.fillStyle = '#0B0D0E'; g.fillRect(lx, y0 + bh * .03, bl * .035, bh * .94); g.fillStyle = '#4A5157'; g.fillRect(lx + bl * .035, cy - bh * .1, x1 - lx - bl * .035, bh * .2);
    g.strokeStyle = '#E6EEF2'; g.lineWidth = Math.max(1, H * .006); g.beginPath();
    for (let k = 1; k <= 50; k++) { const xx = bx + bl * k / 50, tl = k % 10 ? (k % 5 ? .12 : .2) : .3; g.moveTo(xx, y0 + bh * .06); g.lineTo(xx, y0 + bh * (.06 + tl)); }
    g.stroke();
    [10, 20, 30, 40, 50].forEach(k => txt(k === 40 ? '40 mL' : k, bx + bl * k / 50 - (k === 40 ? .02 * W : 0), y0 + bh * .52, {c: '#E6EEF2', s: .055, al: 'c', wt: 600}));
    txt(lbl, x1 - .01 * W, y0 + bh * .82, {c: '#C9D0D5', s: .045, al: 'r', wt: 500});
  };
  /* TCI simgeleri: Cp (plazma, mavi kalp) ve Ce (etki yeri, yeşil beyin) */
  const cpIcon = (g, x, y, r) => { g.fillStyle = '#3FA3DC'; g.beginPath(); g.moveTo(x, y + r * .8); g.bezierCurveTo(x - r * 1.2, y, x - r * .6, y - r, x, y - r * .3); g.bezierCurveTo(x + r * .6, y - r, x + r * 1.2, y, x, y + r * .8); g.fill(); };
  const ceIcon = (g, x, y, r) => { g.fillStyle = '#4CC85A'; [[-.4, -.15, .55], [.25, -.3, .55], [.45, .2, .45], [-.2, .3, .5]].forEach(([dx, dy, rr]) => { g.beginPath(); g.arc(x + dx * r, y + dy * r, rr * r, 0, 7); g.fill(); }); g.fillRect(x - r * .1, y + r * .5, r * .3, r * .5); };
  const SYR = '#4FD1BE';
  DEV3D.model('syringe-pump', {type: 'e-pump', fill: .72,
    /* Fotoğraftaki şırınga pompası görünümü: renkli ilaç bandı, altında şırınga dolum çizimi, sağda doz hızı */
    screen: pumpUI({banner: {name: 'NORadrenaline', conc: '0.1 mg / 1 mL', fill: '#D9B8EC'},
      right: {l: 'Dose Rate', v: '7.5', u: 'mcg/min', sub: '4.5 mL/h'}, pill: true,
      draw: syrDraw(.75, '50 mL · VI 12.4 mL')})});
  /* TCI grafiği: geçmiş Cp (mavi dolgu) ve Ce (yeşil) eğrileri, "şimdi" çizgisi, öngörü bölümü */
  const tciChart = (tgt, cp) => (g, t, {W, H, txt}) => {
    const x0 = .275 * W, x1 = .68 * W, y0 = .25 * H, y1 = .69 * H, X = m => x0 + (m + 10) / 30 * (x1 - x0), Y = v => y1 - v / (tgt * 1.9) * (y1 - y0);
    const Cp = m => m < -7.6 ? 0 : m < -7 ? tgt * 1.75 * (m + 7.6) / .6 : tgt + (tgt * .75) * Math.exp(-(m + 7) / 1.1) + (cp - tgt) * Math.exp(-(m + 7) / 9);
    const Ce = m => m < -7.6 ? 0 : tgt * (1 - Math.exp(-(m + 7.6) / 1.6)) * .96;
    const curve = (f, m0, m1, fillC, lineC) => {
      g.beginPath(); g.moveTo(X(m0), y1); for (let m = m0; m <= m1; m += .1) g.lineTo(X(m), Y(f(m))); g.lineTo(X(m1), y1); g.closePath(); g.fillStyle = fillC; g.fill();
      g.strokeStyle = lineC; g.lineWidth = Math.max(1.5, H * .008); g.beginPath(); for (let m = m0; m <= m1; m += .1) m === m0 ? g.moveTo(X(m), Y(f(m))) : g.lineTo(X(m), Y(f(m))); g.stroke();
    };
    curve(Cp, -10, 0, 'rgba(63,163,220,.75)', '#7FD0F5'); curve(Ce, -10, 0, 'rgba(76,200,90,.55)', '#7BE08A');
    g.lineWidth = Math.max(1.5, H * .007); g.strokeStyle = '#7FD0F5'; g.beginPath(); g.moveTo(X(0), Y(Cp(0))); g.lineTo(X(20), Y(tgt)); g.stroke();
    g.strokeStyle = '#7BE08A'; g.beginPath(); g.moveTo(X(0), Y(Ce(0))); g.lineTo(X(2), Y(tgt)); g.lineTo(X(20), Y(tgt)); g.stroke();
    g.strokeStyle = '#FFFFFF'; g.lineWidth = Math.max(1, H * .006); g.beginPath(); g.moveTo(X(0), y0 - .03 * H); g.lineTo(X(0), y1); g.stroke();
    g.strokeStyle = '#D24BD8'; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(X(7), y0 - .03 * H); g.lineTo(X(7), y1); g.stroke(); g.setLineDash([]);
    g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y0 - .03 * H); g.lineTo(x0, y1); g.lineTo(x1, y1); g.stroke();
    g.fillStyle = '#FFFFFF'; g.beginPath(); g.moveTo(x1, y1 - .025 * H); g.lineTo(x1 - .012 * W, y1); g.lineTo(x1, y1 + .025 * H); g.fill();
    [['-10 min', -10, 'l'], ['0', 0, 'c'], ['20', 20, 'r']].forEach(([s, m, al]) => txt(s, X(m), .74 * H, {c: '#E6EEF2', s: .05, al, wt: 600}));
  };
  /* TCI ikinci sütun: geri sayım, Cp ve Ce değerleri (simgeli) */
  const tciCol = (cp, ce, u, clock) => (g, t, {W, H, txt}) => {
    if (clock) { g.strokeStyle = '#D24BD8'; g.lineWidth = Math.max(1.5, H * .008); g.beginPath(); g.arc(.19 * W, .075 * H, .04 * H, 0, 7); g.stroke(); g.beginPath(); g.moveTo(.19 * W, .075 * H); g.lineTo(.19 * W, .05 * H); g.lineTo(.2 * W, .075 * H); g.stroke(); txt(clock, .19 * W, .17 * H, {c: '#FFFFFF', s: .06, al: 'c'}); }
    const x = clock ? .14 : .43, y = clock ? [.34, .52, .68] : [.5, .68];
    cpIcon(g, x * W, y[0] * H, .035 * H); ceIcon(g, x * W, y[1] * H, .032 * H);
    txt(cp + (clock ? '' : ' ' + u), (x + .025) * W, y[0] * H, {c: '#FFFFFF', s: .085}); txt(ce + (clock ? '' : ' ' + u), (x + .025) * W, y[1] * H, {c: '#FFFFFF', s: .085});
    if (clock) txt(u, .19 * W, y[2] * H, {c: '#FFFFFF', s: .055, al: 'c'});
  };
  DEV3D.model('tci-pump', {type: 'e-pump', fill: .8, liquid: 0xF6F4EE,
    /* Fotoğraftaki TCI görünümü: üstte propofol (grafik ekranı: Cp/Ce eğrileri, hedef Ce), altta remifentanil (sarı ilaç bandı) */
    screen: pumpUI({tag: 'TCI Eff', bx: .125, ux: .69, arrows: true, accent: '#C93FD0', soft: 'SET TO ZERO',
      right: {l: 'Target Ce', v: '3', u: 'mcg/mL', vs: .34},
      mid: [{t: 'text', txt: '▭ 16 mL in 46 min', x: .26, y: .02, w: .3, h: .1, c: '#E6EEF2', s: .055, wt: 600},
        {t: 'box', x: .262, y: .125, w: .422, h: .085, fill: '#15191C'},
        {t: 'text', txt: 'Propofol  |  10 mg / 1 mL', x: .262, y: .125, w: .422, h: .085, c: PG, s: .05, wt: 500, al: 'r'},
        {t: 'box', x: .258, y: 0, w: .003, h: .79, fill: PL}],
      draw(g, t, a) { tciChart(3, 3.4)(g, t, a); tciCol('3.40', '2.61', 'mcg/mL', '7 min')(g, t, a); }}),
    units: [{fill: .55, liquid: 0xDDEBF2,
      screen: pumpUI({tag: 'TCI Eff', bx: .125, ux: .69, arrows: true, accent: '#C93FD0', soft: 'SET TO ZERO',
        banner: {name: 'Remifentanil', conc: '50 mcg / 1 mL', fill: '#F2EE1C'},
        right: {l: 'Target Ce', v: '5', u: 'ng/mL', vs: .34},
        mid: [{t: 'box', x: .41, y: .4, w: .003, h: .38, fill: PL},
          {t: 'text', txt: 'Infused Amount', x: .125, y: .42, w: .285, h: .12, c: PG, s: .055, wt: 500, al: 'c'},
          {t: 'text', txt: '113.7 mcg', x: .125, y: .56, w: .285, h: .18, c: '#FFFFFF', s: .085, wt: 600, al: 'c'}],
        draw: tciCol('4.95', '4.81', 'ng/mL')})}]});
  DEV3D.model('volumetric-pump', {type: 'e-pump', kind: 'volumetric',
    /* Fotoğraftaki volümetrik pompa görünümü: ilaç/sıvı bandı, altında kalan süre ve hacim, sağda hız */
    screen: pumpUI({tag: 'CONT', banner: {name: 'NaCl 0.9 %', conc: '500 mL bag', fill: '#CFE3F0'},
      right: {l: 'Rate', v: '120', u: 'mL/h', sub: 'KVO 3 mL/h'}, pill: true,
      mid: [{t: 'box', x: .142, y: .38, w: .563, h: .003, fill: PL}, {t: 'box', x: .425, y: .4, w: .003, h: .38, fill: PL},
        {t: 'text', txt: 'Remaining Time', x: .142, y: .41, w: .283, h: .12, c: PG, s: .058, wt: 500, al: 'c'},
        {t: 'text', txt: '3 h 06 min', x: .142, y: .56, w: .283, h: .18, c: '#F4F6F7', s: .09, wt: 500, al: 'c'},
        {t: 'text', txt: 'VTBI', x: .43, y: .42, w: .14, h: .16, c: PG, s: .058, wt: 500, pad: .02},
        {t: 'text', txt: '500 mL', x: .43, y: .42, w: .27, h: .16, c: '#F4F6F7', s: .085, wt: 500, al: 'r', pad: .02},
        {t: 'text', txt: 'VI', x: .43, y: .6, w: .14, h: .16, c: PG, s: .058, wt: 500, pad: .02},
        {t: 'text', txt: '128 mL', x: .43, y: .6, w: .27, h: .16, c: '#F4F6F7', s: .085, wt: 500, al: 'r', pad: .02}]})});
  /* PCA ve epidural pompa fotoğrafı yok: gövde aynı genel pompa olduğundan aynı (markasız) ekran düzeni, cihazın kendi değerleriyle */
  const midCells = cells => [{t: 'box', x: .142, y: .38, w: .563, h: .003, fill: PL}, {t: 'box', x: .425, y: .4, w: .003, h: .38, fill: PL}].concat(cells.flatMap(([l, v], i) => [
    {t: 'text', txt: l, x: i ? .425 : .142, y: .41, w: .283, h: .12, c: PG, s: .056, wt: 500, al: 'c'}, {t: 'text', txt: v, x: i ? .425 : .142, y: .56, w: .283, h: .18, c: '#F4F6F7', s: .085, wt: 500, al: 'c'}]));
  DEV3D.model('pca-pump', {type: 'e-pump', fill: .6, lock: true, handset: true,
    screen: pumpUI({tag: 'PCA', banner: {name: 'Morphine', conc: '1 mg / 1 mL', fill: '#9FD3F2'}, accent: '#B184E8', soft: 'HISTORY',
      right: {l: 'PCA Bolus', v: '1.0', u: 'mL', sub: 'Basal 0 mL/h'}, mid: midCells([['Lockout', '5 min'], ['Given / Demands', '14 / 16']])})});
  DEV3D.model('epidural-pump', {type: 'e-pump', fill: .75, stripe: 0xF2C531, lineColor: 0xF2C531, lineTag: 'EPIDURAL', handset: true, handsetColor: 0xF2C531, lock: true,
    screen: pumpUI({tag: 'PIEB', banner: {name: 'EPIDURAL', conc: 'Bupivacaine 0.1 % + Fentanyl 2 mcg/mL', fill: '#F2C531'}, accent: '#F2C531', soft: 'PCEA BOLUS', pill: true,
      right: {l: 'Rate', v: '4.0', u: 'mL/h', sub: 'PIEB 5 mL / 60 min'}, mid: midCells([['Next PIEB in', '42 min'], ['VI', '38 mL']])})});
  T('e-lock', {tr: ['Kilitli kapak', 'Şırıngayı ve ayarları yetkisiz erişime karşı korur; anahtar ya da kodla açılır.'], en: ['Locked cover', 'Protects the syringe and settings against unauthorised access; opened with a key or code.'], es: ['Tapa con cerradura', 'Protege la jeringa y los ajustes contra el acceso no autorizado; se abre con llave o código.']});
  T('e-handset', {tr: ['Hasta düğmesi', 'Hastanın bolus talebinde bulunduğu el düğmesi; kilit süresi içindeki talepler doz vermez ancak kaydedilir.'], en: ['Patient handset', 'Hand button with which the patient requests a bolus; demands during the lockout interval deliver no dose but are recorded.'], es: ['Pulsador del paciente', 'Botón manual con el que el paciente solicita un bolo; las demandas durante el intervalo de bloqueo no administran dosis pero se registran.']});
  T('e-syringe', {tr: ['Şırınga', 'Pompaya uyumlu tanımlı şırınga; boyut ve marka pompada doğru seçilmelidir.'], en: ['Syringe', 'A syringe type recognised by the pump; size and brand must be correctly selected on the pump.'], es: ['Jeringa', 'Jeringa reconocida por la bomba; el tamaño y la marca deben seleccionarse correctamente en la bomba.']});
  T('e-clamp', {tr: ['Şırınga kelepçesi', 'Şırınga gövdesini sabitler ve çoğu pompada şırınga boyutunu algılar.'], en: ['Syringe clamp', 'Holds the syringe barrel and, on most pumps, detects the syringe size.'], es: ['Pinza de jeringa', 'Sujeta el cuerpo de la jeringa y, en la mayoría de las bombas, detecta su tamaño.']});
  T('e-driver', {tr: ['Piston itici', 'Şırınga pistonunu programlanan hızda iter; kavrama kolu pistonun kanadını tutar, tıkanma basıncını da algılar.'], en: ['Plunger driver', 'Pushes the syringe plunger at the programmed rate; the grip holds the plunger flange and also senses occlusion pressure.'], es: ['Impulsor del émbolo', 'Empuja el émbolo de la jeringa a la velocidad programada; la pinza sujeta la aleta del émbolo y detecta la presión de oclusión.']});
  T('e-line', {tr: ['İnfüzyon hattı', 'İlacı hastaya taşıyan uzatma seti; hat etiketlenmeli ve klempler kontrol edilmelidir.'], en: ['Infusion line', 'Extension set carrying the drug to the patient; the line should be labelled and clamps checked.'], es: ['Línea de infusión', 'Equipo de extensión que lleva el fármaco al paciente; la línea debe etiquetarse y revisarse las pinzas.']});
  T('e-door', {tr: ['Pompa kapağı ve set yuvası', 'Kapak açılınca infüzyon seti pompalama mekanizmasına yerleştirilir; kapak kapalıyken serbest akış önlenir.'], en: ['Pump door and set channel', 'With the door open the infusion set is loaded into the pumping mechanism; when closed, free flow is prevented.'], es: ['Puerta y canal del equipo', 'Con la puerta abierta se carga el equipo de infusión en el mecanismo de bombeo; cerrada, se evita el flujo libre.']});

  /* ===== Hızlı infüzör: beyaz gövde, üstte eğik dokunmatik ekran, yan kapıda pompa ve ısı eşanjörü, tutamak ===== */
  DEV3D.register('e-rapid-infuser', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = .3, h = .27, d = .17, y0 = .02, yc = y0 + h / 2, red = M.color(0xC4161C, .35);
    put(g, rbox(w, h, d, .012, M.plastic(0xF1F3F4, .4)), 0, yc, 0);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sz]) => put(g, cyl(.012, .012, .02, M.rubber(), 16), sx * (w / 2 - .03), .01, sz * (d / 2 - .025)));
    /* Yan kapı: kırmızı çerçeve, şeffaf pencere, içte pompa başı ve sensörler, kırmızı oluklu ısı eşanjörü */
    const dz = d / 2, dx = .025, dw = w * .78, dh = h * .9;
    [[0, dh / 2 - .008, dw, .016], [0, -dh / 2 + .008, dw, .016]].forEach(([x, y, bw, bh]) => put(g, rbox(bw, bh, .014, .004, red), dx + x, yc + y, dz + .007));
    [-1, 1].forEach(sx => put(g, rbox(.016, dh, .014, .004, red), dx + sx * (dw / 2 - .008), yc, dz + .007));
    put(g, box(dw * .94, dh * .92, .002, M.plastic(0xF4F6F7, .6)), dx, yc, dz + .001);
    put(g, cyl(.045, .045, .012, M.plastic(0xE9ECEE), 32), dx - .06, yc + .045, dz + .006, Math.PI / 2, 0, 0);
    put(g, box(.03, .03, .02, M.clear(0xEAF4F7, .6)), dx - .085, yc + .0, dz + .012);
    put(g, box(.03, .02, .02, M.clear(0xEAF4F7, .6)), dx - .085, yc - .1, dz + .012);
    const hx = new THREE.Shape(); [[.02, .12], [.115, .12], [.115, -.12], [.07, -.12], [-.06, .0], [-.02, .0]].forEach(([x, y], i) => i ? hx.lineTo(x, y) : hx.moveTo(x, y));
    const hxm = new THREE.Mesh(new THREE.ExtrudeGeometry(hx, {depth: .01, bevelEnabled: false}), red); hxm.castShadow = true; put(g, hxm, dx, yc, dz + .006);
    for (let k = 0; k < 5; k++) put(g, box(.004, .17 - k * .02, .006, M.color(0x9E1015, .35)), dx + .04 + k * .015, yc - .01 + k * .004, dz + .018, 0, 0, .78);
    put(g, box(dw * .94, dh * .92, .002, M.clear(0xEAF4F7, .16)), dx, yc, dz + .026);
    put(g, box(.06, .016, .02, M.matte(0x1B2126)), dx - .06, yc - .045, dz + .014);
    /* Üst eğik ekran */
    const sg = new THREE.Group(); sg.position.set(-w * .2, y0 + h + .03, .0); sg.rotation.set(.45, 0, 0); g.add(sg);
    sg.add(rbox(.166, .016, .13, .006, M.matte(0x1B2126)));
    const scr = makeScreen(.15, .112, cfg.screen, 768); scr.mesh.rotation.set(-Math.PI / 2, 0, 0); scr.mesh.position.set(0, .0085, 0); sg.add(scr.mesh); screens.push(scr);
    put(g, box(.1, .02, d * .8, M.plastic(0xF1F3F4)), -w * .2, y0 + h + .006, 0);
    /* Tutamak (arka üst) */
    g.add(tube([[w / 2 - .03, y0 + h - .01, 0], [w / 2 - .03, y0 + h + .09, 0], [w / 2 - .06, y0 + h + .12, 0], [w * .02, y0 + h + .13, 0]], .013, M.plastic(0xC9CED2, .4)));
    /* Hatlar: üstten giriş (rezervuardan), kapı altından hastaya çıkış */
    g.add(line([[dx + .1, y0 + h - .02, dz + .02], [dx + .1, y0 + h + .1, dz + .04], [dx + .12, y0 + h + .25, dz - .02]], .003, 'clear', .7));
    g.add(line([[dx - .085, y0 + .02, dz + .02], [dx - .1, .006, dz + .08], [dx + .1, .005, dz + .16], [dx + .25, .005, dz + .1]], .003, 'clear', .7));
    sg.updateMatrixWorld(true);
    parts.push({key: 'screen', at: sg.localToWorld(V3(0, .02, 0))}, {key: 'e-ri-door', at: V3(dx - .1, yc + .1, dz + .03)}, {key: 'e-ri-pump', at: V3(dx - .06, yc + .045, dz + .03)},
      {key: 'e-ri-hx', at: V3(dx + .08, yc - .03, dz + .03)}, {key: 'e-ri-sensor', at: V3(dx - .085, yc - .1, dz + .03)}, {key: 'handle', at: V3(w * .2, y0 + h + .14, 0)},
      {key: 'e-ri-in', at: V3(dx + .11, y0 + h + .15, dz + .03)}, {key: 'e-line', at: V3(dx + .1, .02, dz + .16)});
    return {group: g, parts, screens};
  });
  T('e-ri-door', {tr: ['Set kapısı', 'Tek kullanımlık set (pompa segmenti, ısı eşanjörü, hava dedektörü yolu) bu kapının arkasına yerleştirilir.'], en: ['Set door', 'The disposable set (pump segment, heat exchanger, air-detector path) is loaded behind this door.'], es: ['Puerta del equipo', 'El equipo desechable (segmento de bomba, intercambiador de calor, trayecto del detector de aire) se coloca tras esta puerta.']});
  T('e-ri-pump', {tr: ['Pompa başı', 'Set üzerindeki pompa segmentini sıkıştırarak ayarlanan akımı sağlar.'], en: ['Pump head', 'Compresses the pump segment of the set to deliver the set flow.'], es: ['Cabezal de bomba', 'Comprime el segmento de bomba del equipo para administrar el flujo ajustado.']});
  T('e-ri-hx', {tr: ['Isı eşanjörü', 'Sıvı/kan hastaya gitmeden önce ısıtılır; çıkış sıcaklığı izlenir.'], en: ['Heat exchanger', 'Warms fluid/blood before it reaches the patient; output temperature is monitored.'], es: ['Intercambiador de calor', 'Calienta el líquido/sangre antes de llegar al paciente; se vigila la temperatura de salida.']});
  T('e-ri-sensor', {tr: ['Hava ve basınç algılayıcıları', 'Hatta hava saptanırsa ya da hat basıncı yükselirse infüzyon durdurulur ve alarm verilir.'], en: ['Air and pressure sensors', 'If air is detected in the line or line pressure rises, the infusion stops and an alarm sounds.'], es: ['Sensores de aire y presión', 'Si se detecta aire en la línea o aumenta la presión, la infusión se detiene y suena una alarma.']});
  T('e-ri-in', {tr: ['Giriş hattı', 'Rezervuar ya da torbalardan gelen sıvıyı/kanı sete taşır.'], en: ['Inlet line', 'Carries fluid/blood from the reservoir or bags into the set.'], es: ['Línea de entrada', 'Lleva el líquido/sangre desde el reservorio o las bolsas al equipo.']});
  DEV3D.model('rapid-infuser', {type: 'e-rapid-infuser', theta: .45,
    /* Fotoğraftaki tek renkli (siyah zemin, sarı yazı) tablo ekranı: üç satır değer + altta dokunmatik tuş satırı */
    screen: (() => {
      const Y = '#F2C531', K = '#0B0B07', bx = (x, y, w, h, fill) => ({t: 'box', x, y, w, h, stroke: Y, lw: .007, fill});
      const tx = (txt, x, y, w, h, o = {}) => ({t: 'text', txt, x, y, w, h, c: o.c || Y, s: o.s || .058, wt: 700, al: o.al || 'c', mono: true, pad: o.pad ?? .02});
      /* Satır: iki satırlık küçük etiket + "= değer" */
      const row = (x, y, w, h, l1, l2, val) => [bx(x, y, w, h), tx(l1, x, y + h * .12, w * .3, h * .38, {s: .04, al: 'l'}), tx(l2, x, y + h * .5, w * .3, h * .38, {s: .04, al: 'l'}), tx(val, x + w * .26, y, w * .74, h, {al: 'l', pad: .01})];
      return {bg: K, layout: [
        ...row(.02, .03, .52, .17, 'SET', 'RATE', '= 500 ml/min'), bx(.54, .03, .44, .17), tx('INFUSING', .54, .03, .36, .17),
        ...row(.02, .2, .52, .17, 'ACTUAL', 'RATE', '= 498 ml/min'), bx(.54, .2, .44, .17), tx('T = 37.7 °C', .54, .2, .44, .17),
        bx(.02, .37, .52, .17), tx('VOL = 2185 ml', .02, .37, .52, .17, {al: 'l', pad: .03}), bx(.54, .37, .44, .17), tx('P = 122 mmHg', .54, .37, .44, .17),
        bx(.02, .58, .2, .19), tx('INFUSE', .02, .6, .2, .08, {s: .042}), tx('RATE ▲', .02, .68, .2, .08, {s: .042}),
        bx(.02, .77, .2, .19), tx('INFUSE', .02, .79, .2, .08, {s: .042}), tx('RATE ▼', .02, .87, .2, .08, {s: .042}),
        bx(.22, .58, .26, .38, Y), tx('500 ml/min', .22, .64, .26, .14, {c: K, s: .05}), tx('RATE', .22, .78, .26, .12, {c: K, s: .05}),
        bx(.48, .58, .26, .19), tx('BOLUS', .48, .6, .26, .08, {s: .042}), tx('100 ml', .48, .68, .26, .08, {s: .042}),
        bx(.48, .77, .26, .19), tx('RECIRC', .48, .77, .26, .19, {s: .05}),
        bx(.74, .58, .24, .38), tx('STOP', .74, .58, .24, .38, {s: .065}),
        {t: 'icon', g: 'battery', x: .91, y: .075, w: .05, h: .08, c: Y}
      ]};
    })()});

  /* Küçük LED sayısal gösterge (decal) */
  const ledReadout = (w, h, text, col = '#58E07A', sub = '') => decal(w, h, (g, W, Hh) => {
    g.fillStyle = '#0A0F0C'; g.fillRect(0, 0, W, Hh); g.fillStyle = col; g.font = `700 ${Math.round(Hh * .62)}px "JetBrains Mono", monospace`;
    g.textBaseline = 'middle'; g.fillText(text, W * .08, Hh * .55); if (sub) { g.font = `600 ${Math.round(Hh * .24)}px "JetBrains Mono", monospace`; g.fillText(sub, W * .68, Hh * .55); }
  });

  /* ===== Sıvı ısıtıcı: kuru ısıtma ünitesi + şeffaf ısıtma kaseti + set, direk kelepçesi ===== */
  DEV3D.register('e-fluid-warmer', cfg => {
    const g = new THREE.Group(), parts = [];
    const w = .2, h = .065, d = .2, y0 = .02, yc = y0 + h / 2, body = M.plastic(cfg.color || 0x7C9A88, .5);
    put(g, rbox(w, h, d, .014, body), 0, yc, 0);
    put(g, rbox(w * .96, .012, d * .96, .006, M.plastic(0x6E8C7A, .5)), 0, y0 + .004, 0);
    /* Ön yüz: kaset yuvası, uyarı penceresi, sıcaklık göstergesi */
    put(g, box(w * .82, .006, .004, M.matte(0x1B2126)), 0, yc - .012, d / 2 + .001);
    put(g, cyl(.012, .012, .004, M.color(0x8E1418, .25), 24), -w * .12, yc + .014, d / 2 + .001, Math.PI / 2, 0, 0);
    put(g, sphere(.004, M.led(0xFF5A4F)), -w * .12, yc + .014, d / 2 + .002);
    put(g, ledReadout(.045, .016, '41.0', '#58E07A', '°C'), w * .2, yc + .014, d / 2 + .0015);
    /* Isıtma kaseti: yuvadan dışarı uzanan şeffaf düz torba (kanallı) */
    const cas = new THREE.Group(); cas.position.set(0, yc - .012, d / 2 + .07); g.add(cas);
    put(cas, box(w * .78, .004, .15, M.clear(0xE6F1F5, .45)), 0, 0, 0);
    for (let k = -2; k <= 2; k++) put(cas, box(.006, .005, .13, M.clear(0xCFE4EC, .6)), k * .03, .0005, -.004);
    put(cas, rbox(.06, .008, .03, .003, M.plastic(0xF4F6F7)), 0, .002, .06);
    put(g, rbox(.12, .006, .03, .003, M.plastic(0xF4F6F7)), 0, y0 + h + .003, -.02);
    /* Set hatları: giriş (sol) ve hastaya çıkış (sağ) */
    g.add(line([[-.06, yc - .012, d / 2 + .145], [-.12, .03, d / 2 + .16], [-.18, .14, d / 2 + .02], [-.17, .22, 0]], .002, 'clear', .7));
    put(g, cyl(.006, .006, .03, M.clear(0xEEF6F8, .6), 16), -.17, .23, 0);
    g.add(line([[.06, yc - .012, d / 2 + .145], [.12, .01, d / 2 + .17], [.25, .004, d / 2 + .1]], .002, 'clear', .7));
    put(g, cyl(.004, .004, .012, M.color(0xD9534F, .4), 12), .25, .006, d / 2 + .1, 0, 0, Math.PI / 2);
    /* Direk kelepçesi ve direk */
    put(g, box(.04, .03, .03, M.plastic(0xE9EEF1)), w / 2 + .02, yc, -.03);
    put(g, cyl(.011, .011, .26, M.metal()), w / 2 + .05, .13, -.03);
    put(g, cyl(.004, .004, .07, M.metal(), 12), w / 2 + .09, yc, -.03, 0, 0, Math.PI / 2);
    put(g, cyl(.016, .016, .01, M.matte(0x1B2126), 20), w / 2 + .125, yc, -.03, 0, 0, Math.PI / 2);
    parts.push({key: 'e-fw-unit', at: V3(-w * .35, y0 + h + .005, 0)}, {key: 'e-fw-display', at: V3(w * .2, yc + .014, d / 2 + .01)}, {key: 'alarm', at: V3(-w * .12, yc + .014, d / 2 + .01)},
      {key: 'e-fw-cassette', at: V3(.03, yc - .008, d / 2 + .08)}, {key: 'e-ri-in', at: V3(-.17, .2, .02)}, {key: 'e-line', at: V3(.2, .02, d / 2 + .12)}, {key: 'mount', at: V3(w / 2 + .1, yc + .02, -.03)});
    return {group: g, parts, screens: []};
  });
  T('e-fw-unit', {tr: ['Isıtma ünitesi', 'Isıtıcı plakalar arasındaki kaseti ayarlı sıcaklıkta tutar; sıvı akarken ısınır.'], en: ['Warming unit', 'Keeps the cassette between its heater plates at the set temperature; fluid is warmed as it flows.'], es: ['Unidad calefactora', 'Mantiene el casete entre sus placas calefactoras a la temperatura ajustada; el líquido se calienta al fluir.']});
  T('e-fw-display', {tr: ['Sıcaklık göstergesi', 'Isıtıcı sıcaklığını gösterir; aşırı ya da düşük sıcaklıkta sesli/görsel uyarı verilir.'], en: ['Temperature display', 'Shows the heater temperature; audible/visual alerts are given for over- or under-temperature.'], es: ['Indicador de temperatura', 'Muestra la temperatura del calentador; da alertas sonoras/visuales por exceso o defecto de temperatura.']});
  T('e-fw-cassette', {tr: ['Isıtma kaseti', 'Tek kullanımlık, kanallı ince torba; yuvaya tam oturtulmalı, sıvı kanallarda ısınır.'], en: ['Warming cassette', 'Disposable thin channelled bag; must be fully seated in the slot, fluid warms in the channels.'], es: ['Casete de calentamiento', 'Bolsa fina desechable con canales; debe quedar bien insertada en la ranura, el líquido se calienta en los canales.']});
  DEV3D.model('fluid-warmer', {type: 'e-fluid-warmer'});

  /* Kapitone battaniye dokusu (decal üstte) */
  const quilt = (w, d, col = '#CFE6F2', line = '#9CC3D8') => decal(w, d, (g, W, Hh) => {
    g.fillStyle = col; g.fillRect(0, 0, W, Hh); g.strokeStyle = line; g.lineWidth = 3;
    for (let x = W / 12; x < W; x += W / 6) { g.beginPath(); g.moveTo(x, Hh * .05); g.lineTo(x, Hh * .95); g.stroke(); }
    g.fillStyle = line; for (let x = W / 6; x < W; x += W / 6) for (let y = Hh / 8; y < Hh; y += Hh / 4) { g.beginPath(); g.arc(x, y, 3, 0, 7); g.fill(); }
  });

  /* ===== Zorlanmış sıcak hava ısıtıcısı: üfleyici ünite + körüklü hortum + battaniye ===== */
  DEV3D.register('e-forced-air', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const blue = M.plastic(cfg.color || 0x1F3F8F, .35), w = .3, h = .24, d = .24, y0 = .015;
    /* Gövde (aşağı doğru genişleyen), taban, üst tutamak */
    put(g, rbox(w, h, d, .06, blue), 0, y0 + h / 2, 0);
    put(g, rbox(w * 1.06, .03, d * 1.06, .012, M.plastic(0x183372, .4)), 0, y0 + .015, 0);
    g.add(tube([[-w * .25, y0 + h - .02, 0], [-w * .2, y0 + h + .06, 0], [w * .2, y0 + h + .06, 0], [w * .25, y0 + h - .02, 0]], .013, blue));
    /* Ön kontrol paneli: krem yüz, LCD, tuşlar */
    const pn = new THREE.Group(); pn.position.set(0, y0 + h * .58, d / 2 + .002); pn.rotation.x = -.08; g.add(pn);
    pn.add(rbox(w * .72, h * .5, .008, .02, M.plastic(0xE8E6DC, .5)));
    put(pn, decal(.07, .028, (c, W, Hh) => { c.fillStyle = '#5FA98E'; c.fillRect(0, 0, W, Hh); c.fillStyle = '#0F2A20'; c.font = `700 ${Math.round(Hh * .6)}px "JetBrains Mono", monospace`; c.textBaseline = 'middle'; c.fillText('43 °C', W * .1, Hh * .55); }), -w * .16, h * .1, .0046);
    [[.03, .07], [.075, .07], [.03, .03], [.075, .03], [.03, -.01], [.075, -.01], [.03, -.05]].forEach(([x, y], i) => { const b = cyl(.013, .013, .006, M.matte(i === 6 ? 0x6E7880 : 0x8E989F), 20); b.scale.x = 1.3; put(pn, b, x, y, .005, Math.PI / 2, 0, 0); });
    put(pn, label('32  38  43  AMB', .1, .012, '#2B3238'), -w * .14, -h * .05, .0045);
    /* Hortum (körüklü) ve battaniye */
    const hz = .02;
    put(g, cyl(.04, .04, .03, M.plastic(0xF2F4F5), 28), w / 2 + .01, y0 + h * .4, hz, 0, 0, Math.PI / 2);
    g.add(corrugated([[w / 2 + .02, y0 + h * .4, hz], [w / 2 + .15, y0 + h * .45, hz], [w / 2 + .25, y0 + .2, .1], [w / 2 + .22, .04, .28], [w / 2 + .05, .05, .42]], .03, M.plastic(0xF4F6F7, .5)));
    put(g, cyl(.034, .03, .05, M.matte(0x16191C), 24), w / 2 + .03, .05, .43, 0, 0, Math.PI / 2);
    const bl = new THREE.Group(); bl.position.set(-.05, .006, .5); bl.rotation.y = .12; g.add(bl);
    put(bl, rbox(.6, .012, .36, .005, M.plastic(0xA9CFE3, .8)), 0, 0, 0);
    put(bl, quilt(.58, .34, '#A9CFE3', '#6FA6C6'), 0, .0065, 0, -Math.PI / 2, 0, 0);
    parts.push({key: 'e-fa-unit', at: V3(-w * .3, y0 + h * .3, d / 2 + .01)}, {key: 'keypad', at: V3(w * .05, y0 + h * .6, d / 2 + .02)}, {key: 'e-fa-display', at: V3(-w * .16, y0 + h * .64, d / 2 + .02)},
      {key: 'handle', at: V3(0, y0 + h + .07, 0)}, {key: 'e-fa-filter', at: V3(-w / 2 - .005, y0 + h * .45, 0)}, {key: 'e-fa-hose', at: V3(w / 2 + .25, .2, .1)},
      {key: 'e-fa-blanket', at: V3(-.1, .03, .5)});
    put(g, rbox(.012, .1, .14, .004, M.matte(0x16191C)), -w / 2 - .002, y0 + h * .45, 0);
    return {group: g, parts, screens};
  });
  T('e-fa-unit', {tr: ['Üfleyici ünite', 'Ortam havasını filtreden çeker, ısıtır ve hortuma üfler; sıcaklık hortum ucunda denetlenir.'], en: ['Blower unit', 'Draws room air through a filter, heats it and blows it into the hose; temperature is controlled at the hose end.'], es: ['Unidad soplante', 'Aspira aire ambiente a través de un filtro, lo calienta y lo impulsa a la manguera; la temperatura se controla en el extremo de la manguera.']});
  T('e-fa-display', {tr: ['Sıcaklık göstergesi', 'Seçilen ayarı ve hortum ucu hava sıcaklığını gösterir; aşırı sıcaklıkta ısıtıcı kapanır ve alarm verilir.'], en: ['Temperature display', 'Shows the selected setting and hose-end air temperature; on over-temperature the heater shuts off and an alarm sounds.'], es: ['Indicador de temperatura', 'Muestra el ajuste seleccionado y la temperatura del aire en el extremo de la manguera; ante sobretemperatura el calentador se apaga y suena una alarma.']});
  T('e-fa-filter', {tr: ['Hava giriş filtresi', 'Üfleyiciye giren havayı süzer; değişim aralığı üreticinin önerisine göredir.'], en: ['Air inlet filter', 'Filters the air entering the blower; replaced at the interval the manufacturer recommends.'], es: ['Filtro de entrada de aire', 'Filtra el aire que entra en el soplante; se sustituye con la periodicidad que recomienda el fabricante.']});
  T('e-fa-hose', {tr: ['Isıtma hortumu', 'Sıcak havayı battaniyeye taşır; hortum battaniyesiz doğrudan hastaya yöneltilmemelidir.'], en: ['Warming hose', 'Carries the warm air to the blanket; the hose must never be aimed directly at the patient without a blanket.'], es: ['Manguera de calentamiento', 'Lleva el aire caliente a la manta; nunca debe dirigirse directamente al paciente sin manta.']});
  T('e-fa-blanket', {tr: ['Battaniye', 'Tek kullanımlık delikli battaniye; havayı hastanın cilt yüzeyine dağıtır.'], en: ['Blanket', 'Single-use perforated blanket; distributes the air over the patient’s skin surface.'], es: ['Manta', 'Manta perforada de un solo uso; distribuye el aire sobre la superficie cutánea del paciente.']});
  DEV3D.model('forced-air-warmer', {type: 'e-forced-air'});

  /* ===== İletken (su dolaşımlı) ısıtma: kontrol ünitesi + çift hortum + ısıtma pedi ===== */
  DEV3D.register('e-conductive', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = .26, h = .3, d = .3, y0 = .05;
    put(g, rbox(w, h, d, .02, M.plastic(0xE9EEF1, .45)), 0, y0 + h / 2, 0);
    put(g, rbox(w * 1.04, .03, d * 1.04, .01, M.matte(0x3A4148)), 0, y0 - .005, 0);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sz]) => put(g, cyl(.022, .022, .02, M.rubber(), 16), sx * (w / 2 - .03), .022, sz * (d / 2 - .03), 0, 0, Math.PI / 2));
    /* Eğik kontrol paneli: ekran ve tuşlar */
    const pn = new THREE.Group(); pn.position.set(0, y0 + h - .07, d / 2 + .012); pn.rotation.x = -.12; g.add(pn);
    pn.add(rbox(w * .9, .1, .012, .008, M.matte(0x2B3238)));
    const scr = makeScreen(w * .5, .075, cfg.screen, 768); put(pn, scr.mesh, -w * .15, 0, .0065); screens.push(scr);
    for (let k = 0; k < 4; k++) put(pn, rbox(.022, .014, .006, .003, M.matte(k === 0 ? 0x2E9E58 : 0x6E7880)), w * .2 + (k % 2) * .03, .018 - Math.floor(k / 2) * .03, .008);
    /* Su haznesi kapağı ve seviye penceresi */
    put(g, cyl(.025, .025, .012, M.plastic(0x2F7DD1, .4), 24), -w * .25, y0 + h + .006, -d * .2);
    put(g, box(.012, .08, .003, M.clear(0x9CC9E8, .6)), -w / 2 - .001, y0 + h * .5, 0, 0, Math.PI / 2, 0);
    /* Hortum bağlantıları (giden/dönen) */
    const hp = [[-.03, 0xD9534F], [.03, 0x2F7DD1]];
    hp.forEach(([dz, c]) => put(g, cyl(.009, .009, .025, M.color(c, .4), 16), w / 2 + .01, y0 + .08, dz, 0, 0, Math.PI / 2));
    /* Isıtma pedi (su kanallı) */
    const pad = new THREE.Group(); pad.position.set(w / 2 + .38, .008, .1); g.add(pad);
    put(pad, rbox(.5, .014, .7, .006, M.plastic(0x5BA3D0, .55)), 0, 0, 0);
    put(pad, decal(.48, .68, (c, W, Hh) => { c.fillStyle = '#5BA3D0'; c.fillRect(0, 0, W, Hh); c.strokeStyle = '#3F86B5'; c.lineWidth = 6; for (let x = W * .1; x < W; x += W * .1) { c.beginPath(); c.moveTo(x, Hh * .06); c.lineTo(x, Hh * .94); c.stroke(); } }), 0, .0075, 0, -Math.PI / 2, 0, 0);
    hp.forEach(([dz], i) => g.add(line([[w / 2 + .022, y0 + .08, dz], [w / 2 + .07, .05, dz * 2], [w / 2 + .1, .015, -.15 + i * .03], [w / 2 + .14, .01, -.2 + i * .03]], .007, 0xF2F4F5)));
    parts.push({key: 'screen', at: pn.localToWorld(V3(-w * .15, 0, .02))}, {key: 'keypad', at: V3(w * .25, y0 + h - .07, d / 2 + .02)}, {key: 'e-cw-reservoir', at: V3(-w * .25, y0 + h + .02, -d * .2)},
      {key: 'e-cw-hoses', at: V3(w / 2 + .06, .06, 0)}, {key: 'e-cw-pad', at: V3(w / 2 + .38, .03, .2)});
    pn.updateMatrixWorld(true); parts[0].at = pn.localToWorld(V3(-w * .15, 0, .02));
    return {group: g, parts, screens};
  });
  T('e-cw-reservoir', {tr: ['Su haznesi', 'Sistemde dolaşan suyu içerir; su seviyesi üreticinin belirttiği aralıkta tutulur.'], en: ['Water reservoir', 'Holds the water circulating in the system; the level is kept within the range the manufacturer specifies.'], es: ['Depósito de agua', 'Contiene el agua que circula por el sistema; el nivel se mantiene en el rango que indica el fabricante.']});
  T('e-cw-hoses', {tr: ['Giden ve dönen hortumlar', 'Isıtılmış/soğutulmuş suyu pede taşır ve geri getirir; bükülme akışı keser.'], en: ['Supply and return hoses', 'Carry heated/cooled water to the pad and back; kinking stops the flow.'], es: ['Mangueras de ida y retorno', 'Llevan el agua calentada/enfriada a la almohadilla y la devuelven; un acodamiento detiene el flujo.']});
  T('e-cw-pad', {tr: ['Isıtma pedi', 'Hastanın altına ya da üstüne yerleştirilen, su kanallı ped; ısıyı cilde iletimle aktarır.'], en: ['Warming pad', 'Water-channelled pad placed under or over the patient; transfers heat to the skin by conduction.'], es: ['Almohadilla térmica', 'Almohadilla con canales de agua colocada bajo o sobre el paciente; transfiere calor a la piel por conducción.']});
  DEV3D.model('conductive-warming', {type: 'e-conductive',
    /* Fotoğraf yok: markadan bağımsız düzen — üstte mod çubuğu, iki büyük sıcaklık kutusu (su / hasta), altta hedef ve akış */
    screen: {bg: '#05090C', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .16, fill: '#13222C'}, {t: 'text', txt: 'MANUAL', x: .02, y: 0, w: .4, h: .16, c: '#5BB7DE', s: .1},
      {t: 'icon', g: 'drop', x: .86, y: .02, w: .1, h: .12, c: '#5BB7DE'},
      {t: 'tile', x: .02, y: .2, w: .47, h: .56, l: 'WATER', v: '40.0', u: '°C', c: '#5BB7DE', stroke: 'rgba(91,183,222,.4)', r: .03},
      {t: 'tile', x: .51, y: .2, w: .47, h: .56, l: 'PATIENT', v: '36.2', u: '°C', c: '#F2C531', stroke: 'rgba(242,197,49,.4)', r: .03, live: true},
      {t: 'text', txt: 'SET 40.0 °C', x: .02, y: .8, w: .47, h: .18, c: '#E6EEF2', s: .09},
      {t: 'text', txt: 'FLOW OK', x: .51, y: .8, w: .47, h: .18, c: '#4FD18F', s: .09, al: 'r'}]}});

  /* ===== Hücre kurtarma (cell saver): araba, santrifüj ünitesi ve kase, rezervuar, yıkama/ürün/atık torbaları ===== */
  DEV3D.register('e-cell-salvage', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const white = M.plastic(0xE9ECEE, .45), grey = M.plastic(0xC9CED2, .45), blue = M.plastic(0x5B8FD0, .4), metal = M.metal();
    /* Araba: ayaklar, tekerler, kolon, sepetler, raf */
    [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sz]) => {
      put(g, box(.035, .025, .035, grey), sx * .26, .07, sz * .2);
      put(g, cyl(.035, .035, .025, M.rubber(0x3A4148), 20), sx * .26, .036, sz * .2, 0, 0, Math.PI / 2);
    });
    put(g, box(.56, .025, .05, grey), 0, .085, .2); put(g, box(.56, .025, .05, grey), 0, .085, -.2); put(g, box(.05, .025, .4, grey), .2, .085, 0);
    put(g, rbox(.08, .9, .08, .02, white), .2, .53, -.05);
    put(g, rbox(.34, .14, .3, .01, M.plastic(0xDDE2E5, .5)), -.03, .2, .03);
    put(g, rbox(.14, .06, .14, .008, M.plastic(0xDDE2E5, .5)), -.04, .4, .1);
    put(g, rbox(.42, .025, .4, .008, white), -.03, .5, 0);
    /* Ünite: gri gövde, mavi üst güverte, şeffaf kapak, santrifüj kasesi, pompa */
    const mx = -.04, my = .515, mh = .32, mw = .4, md = .42;
    put(g, rbox(mw, mh, md, .02, grey), mx, my + mh / 2, 0);
    put(g, rbox(mw * .5, .03, .006, .004, M.plastic(0xB9C0C5)), mx - mw * .05, my + mh * .4, md / 2 + .002);
    put(g, rbox(mw + .01, .04, md + .01, .012, blue), mx, my + mh + .01, 0);
    put(g, rbox(mw * .92, .012, md * .9, .006, M.plastic(0xF1F3F4, .5)), mx, my + mh + .032, 0);
    put(g, cyl(.07, .07, .02, M.matte(0x1B2126), 32), mx + .05, my + mh + .042, -.06);
    put(g, lathe([[0, 0], [.04, 0], [.05, .02], [.05, .07], [.03, .095], [.012, .1], [.012, .12], [0, .12]], M.plastic(0x2F6FBF, .35)), mx + .05, my + mh + .04, -.06);
    put(g, lathe([[.085, 0], [.085, .1], [.06, .14], [0, .15]], M.clear(0xE6F1F5, .3)), mx + .05, my + mh + .038, -.06);
    put(g, cyl(.035, .035, .04, M.plastic(0x5B8FD0), 24), mx - .1, my + mh + .055, .1);
    put(g, rbox(.06, .03, .05, .006, M.matte(0x1B2126)), mx + .08, my + mh + .052, .12);
    /* Ekran (kol üstünde) */
    const sg = new THREE.Group(); sg.position.set(-.26, 1.1, .02); sg.rotation.y = .35; g.add(sg);
    /* Fotoğraftaki gibi açık gri-mavi çerçeve, sağ kenarı mavi; dokunmatik ekran yaklaşık 6:5 */
    sg.add(rbox(.21, .185, .03, .012, M.plastic(0xC9D3DD, .4))); put(sg, rbox(.014, .17, .032, .006, M.plastic(0x6E9BD0, .4)), .1, 0, 0);
    const scr = makeScreen(.18, .15, cfg.screen, 768); put(sg, scr.mesh, -.004, .004, .0155); screens.push(scr);
    put(g, cyl(.01, .01, .1, metal), -.2, 1.0, -.05, 0, 0, 1.1);
    /* Direkler (kolon ve arka sol), askılar */
    const poles = [[.2, .98, 1.8, -.05], [-.18, my + mh, 1.8, -.18]];
    poles.forEach(([x, yb, yt, z]) => {
      put(g, cyl(.009, .009, yt - yb, metal), x, (yb + yt) / 2, z);
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; g.add(tube([[x, yt, z], [x + Math.cos(a) * .07, yt + .01, z + Math.sin(a) * .07], [x + Math.cos(a) * .08, yt + .035, z + Math.sin(a) * .08]], .003, metal, 12)); }
    });
    /* Rezervuar (kardiyotomi) direkte, torbalar */
    const rx = .2, ry = 1.25, rz = .06;
    put(g, rbox(.14, .02, .12, .006, blue), rx, ry - .02, rz - .02);
    put(g, cyl(.055, .045, .16, M.clear(0xEAF4F7, .4), 32, true), rx, ry + .07, rz);
    put(g, cyl(.044, .04, .05, M.color(0xA8302C, .3), 24), rx, ry + .02, rz);
    put(g, cyl(.06, .06, .02, blue, 32), rx, ry + .16, rz);
    const bag = (x, y, z, col, txt) => { put(g, rbox(.12, .2, .025, .012, M.clear(0xEAF4F7, .5)), x, y, z); put(g, rbox(.11, .14, .018, .008, M.color(col, .25)), x, y - .025, z); put(g, label(txt, .08, .014, '#1B2328', 'rgba(255,255,255,.85)'), x, y + .05, z + .013); };
    bag(-.18 + .08, 1.68, -.18, 0xDCEBF2, 'NaCl 0.9%');
    bag(.2 + .08, 1.68, -.05, 0x9E2A2A, 'PRODUCT');
    bag(.32, .3, .05, 0xC9897E, 'WASTE');
    g.add(line([[rx, ry, rz], [rx - .05, ry - .1, rz + .05], [mx + .05, my + mh + .25, -.02], [mx + .05, my + mh + .16, -.06]], .003, 'clear', .7));
    g.add(line([[-.1, 1.57, -.18], [-.12, 1.3, -.1], [mx - .1, my + mh + .12, .1]], .003, 'clear', .7));
    g.add(line([[.28, 1.57, -.05], [.26, 1.3, .0], [mx + .08, my + mh + .1, .12]], .003, 'clear', .7));
    g.add(line([[mx + mw / 2, my + mh, .1], [.3, .6, .1], [.32, .4, .05]], .003, 'clear', .7));
    sg.updateMatrixWorld(true);
    parts.push({key: 'screen', at: sg.localToWorld(V3(0, 0, .03))}, {key: 'e-cs-bowl', at: V3(mx + .05, my + mh + .2, -.06)}, {key: 'e-cs-pump', at: V3(mx - .1, my + mh + .09, .1)},
      {key: 'e-cs-reservoir', at: V3(rx + .06, ry + .08, rz)}, {key: 'e-cs-wash', at: V3(-.1, 1.68, -.16)}, {key: 'e-cs-product', at: V3(.28, 1.68, -.03)},
      {key: 'e-cs-waste', at: V3(.33, .3, .08)}, {key: 'mount', at: V3(.26, .08, .2)});
    return {group: g, parts, screens};
  });
  T('e-cs-bowl', {tr: ['Santrifüj kasesi', 'Toplanan kan kasede dönerek ayrışır; eritrositler yıkanır, plazma ve yıkama sıvısı atığa gider.'], en: ['Centrifuge bowl', 'Collected blood separates as the bowl spins; red cells are washed, plasma and wash solution go to waste.'], es: ['Campana de centrifugación', 'La sangre recogida se separa al girar la campana; los hematíes se lavan y el plasma y la solución de lavado van a desecho.']});
  T('e-cs-pump', {tr: ['Pompa ve valfler', 'Kanı rezervuardan kaseye, yıkama sıvısını kaseye ve ürünü torbaya yönlendirir.'], en: ['Pump and valves', 'Route blood from the reservoir to the bowl, wash solution to the bowl and the product to the bag.'], es: ['Bomba y válvulas', 'Dirigen la sangre del reservorio a la campana, la solución de lavado a la campana y el producto a la bolsa.']});
  T('e-cs-reservoir', {tr: ['Toplama rezervuarı', 'Aspire edilen kanı antikoagülanla toplar ve filtreler.'], en: ['Collection reservoir', 'Collects and filters the aspirated blood with anticoagulant.'], es: ['Reservorio de recogida', 'Recoge y filtra la sangre aspirada con anticoagulante.']});
  T('e-cs-wash', {tr: ['Yıkama sıvısı', 'Eritrositleri yıkamak için kullanılan serum fizyolojik torbası.'], en: ['Wash solution', 'Normal saline bag used to wash the red cells.'], es: ['Solución de lavado', 'Bolsa de suero fisiológico utilizada para lavar los hematíes.']});
  T('e-cs-product', {tr: ['Ürün (reinfüzyon) torbası', 'Yıkanmış eritrositlerin toplandığı ve hastaya geri verildiği torba; etiketlenmelidir.'], en: ['Product (reinfusion) bag', 'Bag that collects the washed red cells for return to the patient; it must be labelled.'], es: ['Bolsa de producto (reinfusión)', 'Bolsa que recoge los hematíes lavados para devolverlos al paciente; debe etiquetarse.']});
  T('e-cs-waste', {tr: ['Atık torbası', 'Plazma, yıkama sıvısı ve artıkları toplar.'], en: ['Waste bag', 'Collects plasma, wash solution and debris.'], es: ['Bolsa de desecho', 'Recoge el plasma, la solución de lavado y los residuos.']});
  DEV3D.model('cell-salvage', {type: 'e-cell-salvage', theta: .5,
    /* Fotoğraftaki dokunmatik ekran düzeni: lacivert üst/alt çubuk, solda mavi işlem tuşları, ortada beyaz durum paneli,
       orta mavi sütun, sağda beyaz ayar paneli ve koyu tuşlar */
    screen: (() => {
      const N = '#1B3768', B = '#2E6DB8', B2 = '#4F8FD6', Wt = '#F4F7F9', btn = (x, y, w, h, txt, fill = B, c = '#FFFFFF', sz = .038) => ({t: 'button', x, y, w, h, txt, fill, c, s: sz, r: .012});
      return {bg: '#DCE3EA', layout: [
        {t: 'box', x: 0, y: 0, w: 1, h: .1, fill: N}, {t: 'text', txt: 'AUTO', x: .02, y: 0, w: .18, h: .1, c: '#C9D6E8', s: .05},
        {t: 'box', x: .22, y: .015, w: .18, h: .07, fill: '#2FA84F', r: .01}, {t: 'text', txt: 'WASH', x: .22, y: .015, w: .18, h: .07, c: '#FFFFFF', s: .05, al: 'c'},
        {t: 'text', txt: 'Bowl 225 mL', x: .5, y: 0, w: .3, h: .1, c: '#C9D6E8', s: .045}, {t: 'text', txt: '10:42', x: .8, y: 0, w: .18, h: .1, c: '#FFFFFF', s: .05, al: 'r'},
        btn(.015, .13, .16, .13, 'FILL'), btn(.015, .28, .16, .13, 'WASH', B2), btn(.015, .43, .16, .13, 'EMPTY'), btn(.015, .58, .16, .13, 'RETURN'),
        {t: 'box', x: .19, y: .13, w: .31, h: .58, fill: Wt},
        {t: 'table', x: .2, y: .16, w: .29, h: .5, rows: [['Collected', '1450 mL', '#1B2328'], ['Processed', '1200 mL', '#1B2328'], ['Product', '420 mL', '#B03A3A'], ['Wash', '650 mL', '#1B2328']], lc: '#5A6B75', s: .034, zebra: false},
        btn(.515, .13, .08, .18, 'P1'), btn(.515, .33, .08, .18, 'P2'), btn(.515, .53, .08, .18, 'V'),
        {t: 'box', x: .61, y: .13, w: .375, h: .58, fill: Wt},
        {t: 'text', txt: 'Fill 400 mL/min', x: .615, y: .15, w: .2, h: .14, c: '#1B2328', s: .03, wt: 600},
        {t: 'text', txt: 'Wash 1000 mL', x: .615, y: .35, w: .2, h: .14, c: '#1B2328', s: .03, wt: 600},
        {t: 'text', txt: 'Vacuum 150', x: .615, y: .55, w: .2, h: .14, c: '#1B2328', s: .03, wt: 600},
        btn(.84, .15, .135, .13, '▲▼', N), btn(.84, .35, .135, .13, '▲▼', N), btn(.84, .55, .135, .13, '▲▼', N),
        btn(.19, .75, .1, .1, 'MENU', B, '#FFFFFF', .028), btn(.295, .75, .1, .1, 'SETUP', B, '#FFFFFF', .028), btn(.4, .75, .1, .1, 'DATA', B, '#FFFFFF', .028), btn(.515, .75, .15, .1, 'STOP', '#3A4148'),
        {t: 'box', x: .015, y: .75, w: .16, h: .1, fill: B, r: .012}, {t: 'icon', g: 'home', x: .07, y: .76, w: .05, h: .08, c: '#FFFFFF'},
        {t: 'box', x: 0, y: .89, w: 1, h: .11, fill: N}, {t: 'text', txt: 'Processing: wash in progress', x: .02, y: .89, w: .6, h: .11, c: '#E6EEF2', s: .045},
        {t: 'icon', g: 'alarm', x: .93, y: .9, w: .05, h: .09, c: '#F2C531'}
      ]};
    })()});

  /* ===== Defibrilatör / transkütan pacing: tutamaklı gövde, EKG ekranı, enerji düğmesi, şarj ve şok tuşları, ped kablosu ve pedler =====
     cfg: {pacer:bool, screen, color} */
  DEV3D.register('e-defib', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = .32, h = .25, d = .23, y0 = .015, yc = y0 + h / 2, body = M.plastic(cfg.color || 0x3B4248, .45), face = M.matte(0x22272C, .5);
    put(g, rbox(w, h, d, .02, body), 0, yc, 0);
    put(g, rbox(w * 1.02, .025, d * 1.02, .01, M.rubber(0x1D2125)), 0, y0 + .008, 0);
    /* Tutamak */
    g.add(tube([[-w * .32, y0 + h - .01, -d * .1], [-w * .3, y0 + h + .05, -d * .1], [w * .3, y0 + h + .05, -d * .1], [w * .32, y0 + h - .01, -d * .1]], .013, M.matte(0x2B3035)));
    /* Ön yüz */
    put(g, rbox(w * .96, h * .9, .006, .012, face), 0, yc, d / 2 + .001);
    const sw = w * .55, sh = h * .52, sx = -w * .18, sy = yc + h * .14;
    put(g, rbox(sw + .01, sh + .01, .004, .004, M.matte(0x111417)), sx, sy, d / 2 + .004);
    const scr = makeScreen(sw, sh, cfg.screen, 1024); put(g, scr.mesh, sx, sy, d / 2 + .0065); screens.push(scr);
    for (let k = 0; k < 5; k++) put(g, rbox(.026, .012, .005, .003, M.matte(0x5B6670)), sx - sw / 2 + .02 + k * (sw - .04) / 4, sy - sh / 2 - .016, d / 2 + .005);
    /* Sağ kontrol bölümü: 1 enerji düğmesi, 2 şarj, 3 şok */
    const cx = w * .3;
    put(g, cyl(.034, .036, .022, M.matte(0x1B1F23), 40), cx, yc + h * .24, d / 2 + .012, Math.PI / 2, 0, 0);
    put(g, box(.006, .026, .004, M.color(0xF2F4F5)), cx, yc + h * .24 + .01, d / 2 + .024);
    put(g, decal(.1, .1, (c, W) => { c.fillStyle = '#E6EEF2'; c.font = `700 ${Math.round(W * .085)}px Archivo, Arial`; c.textAlign = 'center'; c.textBaseline = 'middle'; const L = cfg.pacer ? ['OFF', 'MON', 'DEFIB', 'PACER'] : ['OFF', 'MON', '150', '200']; L.forEach((t, i) => { const a = Math.PI * (1.05 + i * .3); c.fillText(t, W / 2 + Math.cos(a) * W * .42, W / 2 + Math.sin(a) * W * .42); }); c.fillStyle = '#F2C531'; c.fillText('1', W * .1, W * .9); }), cx, yc + h * .24, d / 2 + .0045);
    put(g, rbox(.05, .028, .01, .006, M.color(0xF2C531, .4)), cx, yc - h * .1, d / 2 + .007);
    put(g, rbox(.05, .034, .012, .008, M.color(0xE5532D, .35)), cx, yc - h * .3, d / 2 + .008);
    put(g, decal(.03, .022, (c, W, Hh) => { c.fillStyle = '#FFFFFF'; c.beginPath(); c.moveTo(W * .55, 0); c.lineTo(W * .3, Hh * .55); c.lineTo(W * .5, Hh * .55); c.lineTo(W * .4, Hh); c.lineTo(W * .72, Hh * .4); c.lineTo(W * .52, Hh * .4); c.closePath(); c.fill(); }, 128), cx, yc - h * .3, d / 2 + .0145);
    put(g, rbox(.03, .014, .006, .004, M.matte(0x5B6670)), cx - .045, yc - h * .1, d / 2 + .005);
    /* Pacing tuşları (hız ve akım +/−) */
    if (cfg.pacer) {
      ['RATE', 'mA'].forEach((t, i) => {
        const px = sx - sw / 2 + .03 + i * .09, py = y0 + .04;
        put(g, rbox(.028, .016, .006, .004, M.matte(0x6E7880)), px - .017, py, d / 2 + .005); put(g, rbox(.028, .016, .006, .004, M.matte(0x6E7880)), px + .017, py, d / 2 + .005);
        put(g, label(`${t}  −  +`, .07, .01, '#E6EEF2'), px, py + .017, d / 2 + .0045);
      });
      put(g, rbox(.034, .016, .006, .004, M.color(0x3FA1D8, .4)), sx + sw / 2 - .02, y0 + .04, d / 2 + .005);
      parts.push({key: 'e-pacer', at: V3(sx - sw / 2 + .06, y0 + .05, d / 2 + .015)});
    } else parts.push({key: 'e-sync', at: V3(cx - .045, yc - h * .1, d / 2 + .015)});
    /* Ped konnektörü (sağ yan alt), kablo ve pedler */
    put(g, rbox(.012, .04, .05, .004, M.matte(0x5B6670)), w / 2 + .004, y0 + .05, .03);
    const pk = [[w / 2 + .015, y0 + .05, .03], [w / 2 + .08, .04, .08], [w / 2 + .06, .01, .22], [.08, .008, .3]];
    g.add(line(pk, .004, 0x2B3035));
    [[-.02, .3, -.2], [.16, .34, .25]].forEach(([x, z, ry], i) => {
      const p = new THREE.Group(); p.position.set(x, .004, z); p.rotation.y = ry; g.add(p);
      put(p, rbox(.11, .005, .14, .003, M.plastic(0xF4F6F7, .6)), 0, 0, 0);
      put(p, decal(.1, .13, (c, W, Hh) => { c.fillStyle = '#F4F6F7'; c.fillRect(0, 0, W, Hh); c.strokeStyle = '#D23A3A'; c.lineWidth = 8; c.strokeRect(10, 10, W - 20, Hh - 20); c.fillStyle = '#D23A3A'; c.font = `700 ${Math.round(W * .14)}px Archivo, Arial`; c.textAlign = 'center'; c.fillText(i ? 'APEX' : 'STERNUM', W / 2, Hh * .55); }), 0, .003, 0, -Math.PI / 2, 0, 0);
      g.add(line([[.08, .008, .3], [x + (i ? .02 : .04), .006, z - (i ? .06 : .02)]], .0025, 0x2B3035));
    });
    parts.push({key: 'screen', at: V3(sx, sy, d / 2 + .015)}, {key: 'e-energy', at: V3(cx, yc + h * .24, d / 2 + .03)}, {key: 'e-charge', at: V3(cx, yc - h * .1, d / 2 + .016)},
      {key: 'e-shock', at: V3(cx, yc - h * .3, d / 2 + .018)}, {key: 'handle', at: V3(0, y0 + h + .06, -d * .1)}, {key: 'e-padport', at: V3(w / 2 + .012, y0 + .07, .03)},
      {key: 'e-pads', at: V3(.16, .02, .34)}, {key: 'keypad', at: V3(sx, sy - sh / 2 - .016, d / 2 + .012)});
    parts.push(parts.shift());
    return {group: g, parts, screens};
  });
  T('e-energy', {tr: ['Enerji/mod seçme düğmesi', 'Kapalı, monitör, defibrilasyon (joule) ya da pacing modunu seçer.'], en: ['Energy/mode selector', 'Selects off, monitor, defibrillation (joules) or pacing mode.'], es: ['Selector de energía/modo', 'Selecciona apagado, monitor, desfibrilación (julios) o modo de estimulación.']});
  T('e-charge', {tr: ['Şarj tuşu', 'Seçilen enerjiye kondansatörü doldurur; şarj sırasında hasta ve çevre güvenliği sağlanır.'], en: ['Charge button', 'Charges the capacitor to the selected energy; patient and bystander safety is ensured while charging.'], es: ['Botón de carga', 'Carga el condensador a la energía seleccionada; se garantiza la seguridad del paciente y del entorno durante la carga.']});
  T('e-shock', {tr: ['Şok tuşu', 'Şarj tamamlandığında şoku verir; öncesinde kimsenin hastaya temas etmediği doğrulanır.'], en: ['Shock button', 'Delivers the shock once charged; first confirm that no one is touching the patient.'], es: ['Botón de descarga', 'Administra la descarga una vez cargado; antes se confirma que nadie toca al paciente.']});
  T('e-sync', {tr: ['Senkron tuşu', 'Şokun R dalgasına senkronize verilmesini (kardiyoversiyon) açar; ekranda R işaretleri görünür.'], en: ['Sync button', 'Enables shock delivery synchronised to the R wave (cardioversion); R markers appear on screen.'], es: ['Botón de sincronización', 'Activa la descarga sincronizada con la onda R (cardioversión); aparecen marcas R en la pantalla.']});
  T('e-pacer', {tr: ['Pacing kontrolleri', 'Pacing hızını (uyarı/dk) ve çıkış akımını (mA) ayarlar; mekanik yakalama nabızla doğrulanır.'], en: ['Pacing controls', 'Set the pacing rate (pulses/min) and output current (mA); mechanical capture is confirmed by pulse.'], es: ['Controles de estimulación', 'Ajustan la frecuencia (estímulos/min) y la corriente de salida (mA); la captura mecánica se confirma por el pulso.']});
  T('e-padport', {tr: ['Ped kablosu konnektörü', 'Çok işlevli ped kablosunun takıldığı yuvadır; defibrilasyon, pacing ve EKG izlemi bu kablodan yapılır.'], en: ['Pads cable connector', 'Socket for the multifunction pads cable; defibrillation, pacing and ECG monitoring run through this cable.'], es: ['Conector del cable de parches', 'Toma para el cable de parches multifunción; la desfibrilación, la estimulación y la monitorización del ECG pasan por este cable.']});
  T('e-pads', {tr: ['Çok işlevli pedler', 'Yapışkan elektrotlar; üzerlerindeki çizime göre (anterolateral ya da anteroposterior) göğse yerleştirilir.'], en: ['Multifunction pads', 'Adhesive electrodes; placed on the chest as shown on them (anterolateral or anteroposterior).'], es: ['Parches multifunción', 'Electrodos adhesivos; se colocan en el tórax según el dibujo que llevan (anterolateral o anteroposterior).']});
  /* Defibrilatör/pacing ekranı (fotoğraf yok; markadan bağımsız genel monitör-defibrilatör düzeni): üst durum çubuğu, solda EKG ve
     SpO₂ dalgaları, sağda değer kutuları, altta ekran altındaki beş yazılım tuşuyla hizalı tuş etiketleri */
  const defibUI = (mode, lead, tiles, keys, status, pace) => ({bg: '#05090C', layout: [
    {t: 'box', x: 0, y: 0, w: 1, h: .09, fill: '#1A2228'}, {t: 'text', txt: 'ADULT', x: .01, y: 0, w: .15, h: .09, c: '#E6EEF2', s: .05},
    {t: 'text', txt: mode, x: .2, y: 0, w: .5, h: .09, c: pace ? '#3FA1D8' : '#F2C531', s: .055, al: 'c'},
    {t: 'text', txt: '08:42', x: .74, y: 0, w: .16, h: .09, c: '#9AA8B0', s: .045, al: 'r'}, {t: 'icon', g: 'battery', x: .92, y: .015, w: .06, h: .06, c: '#4FD18F'},
    {t: 'wave', k: 'ecg', x: .01, y: .11, w: .64, h: .34, c: '#4FD18F', l: lead, grid: true, amp: .4},
    {t: 'wave', k: 'pleth', x: .01, y: .47, w: .64, h: .2, c: '#5BB7DE', l: 'SpO₂', amp: .4},
    {t: 'box', x: .01, y: .69, w: .64, h: .12, fill: '#11191F', r: .01}, {t: 'text', txt: status, x: .01, y: .69, w: .64, h: .12, c: pace ? '#E6EEF2' : '#F2C531', s: .05, al: 'c'},
    ...tiles.map(([l, v, u, c, h, y, live]) => ({t: 'tile', x: .67, y, w: .32, h, l, v, u, c, live, stroke: 'rgba(255,255,255,.12)', r: .01})),
    ...keys.map((k, i) => ({t: 'button', x: .114 + i * .193 - .085, y: .85, w: .17, h: .13, txt: k, c: '#E6EEF2', fill: '#1E2830', s: .045, r: .01}))
  ], draw: pace ? (g, t, {W, H}) => {
    /* Pacing spike'ları: her QRS'in hemen önünde beyaz dikey çizgi */
    const x0 = .01 * W, w = .64 * W, span = 3.2, sh = t * .9; g.strokeStyle = '#FFFFFF'; g.lineWidth = Math.max(1.5, H * .006);
    for (let n = Math.floor(sh) - 1; n < sh + span + 1; n++) { const x = x0 + (n + .08 - sh) / span * w; if (x > x0 && x < x0 + w) { g.beginPath(); g.moveTo(x, .2 * H); g.lineTo(x, .42 * H); g.stroke(); } }
  } : null});
  DEV3D.model('defibrillator', {type: 'e-defib',
    screen: defibUI('DEFIB · ASYNC', 'PADS', [['HR', 148, '/min', '#4FD18F', .3, .11, true], ['SpO₂', 96, '%', '#5BB7DE', .2, .43, true], ['ENERGY', '200 J', '', '#F2C531', .2, .64]],
      ['SYNC', 'LEAD', 'ALARMS', 'EVENT', 'MENU'], 'Press CHARGE')});
  DEV3D.model('external-pacing', {type: 'e-defib', pacer: true,
    screen: defibUI('PACER · DEMAND', 'II', [['RATE', '70', 'ppm', '#3FA1D8', .28, .11], ['OUTPUT', '65', 'mA', '#F2C531', .24, .41], ['HR', 70, '/min', '#4FD18F', .17, .67, true]],
      ['PACER', 'LEAD', 'ALARMS', '4:1', 'MENU'], 'Pacing · capture', true)});

  /* Buruşuk şeffaf torba (rezervuar) */
  function crumpled(r, mat, seed = 3) {
    const geo = new THREE.SphereGeometry(r, 28, 20), pos = geo.attributes.position, v = new THREE.Vector3();
    let s = seed; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i); const f = 1 + (rnd() - .5) * .14 + .05 * Math.sin(v.x * 60) * Math.cos(v.y * 50); pos.setXYZ(i, v.x * f, v.y * f * .85, v.z * f); }
    geo.computeVertexNormals(); const m = new THREE.Mesh(geo, mat); m.castShadow = true; return m;
  }

  /* ===== Manuel resüsitatör: kendiliğinden şişen balon + hasta valfi + maske + giriş valfi, rezervuar ve O₂ hortumu ===== */
  DEV3D.register('e-resuscitator', cfg => {
    const g = new THREE.Group(), parts = [];
    const frost = K3.std(0xDCE4E8, .5, 0, {transparent: true, opacity: .9}), clr = M.clear(0xEAF3F6, .4), red = M.color(0xD6331F, .4);
    const by = .115, L = .26, x0 = -L / 2;
    /* Balon (lathe, x ekseni boyunca) ve halkalar, kayış */
    put(g, lathe([[.016, 0], [.026, .015], [.05, .05], [.064, .09], [.066, .13], [.064, .17], [.05, .21], [.026, .245], [.016, .26]], frost, 48), x0, by, 0, 0, 0, -Math.PI / 2);
    [.075, .185].forEach(t => put(g, torus(.065, .0015, M.plastic(0xDDE3E6, .5), 48), x0 + t, by, 0, 0, Math.PI / 2, 0));
    g.add(tube([[-.07, by + .058, 0], [-.06, by + .095, 0], [.06, by + .095, 0], [.07, by + .058, 0]], .005, M.clear(0xF2F5F6, .75), 32));
    /* Hasta valfi: şeffaf gövde, kırmızı tek yönlü valf, basınç sınırlayıcı, ekspirasyon kapağı, 22 mm port */
    const px = L / 2 + .022;
    put(g, cyl(.014, .014, .045, clr, 24), px, by, 0, 0, 0, Math.PI / 2);
    put(g, cyl(.011, .011, .01, red, 20), px - .008, by + .017, 0);
    put(g, cyl(.008, .008, .02, red, 16), px + .004, by - .002, .02, Math.PI / 2, 0, 0);
    put(g, sphere(.016, clr), px + .024, by, 0);
    put(g, cyl(.011, .011, .035, M.plastic(0xB9C0C5, .45), 24), px + .006, by - .03, 0);
    /* Maske: şeffaf kubbe + şişirilmiş yastık, konnektör üstte */
    const mx = px + .006, my = 0;
    put(g, lathe([[.05, 0], [.046, .015], [.033, .04], [.016, .055], [.012, .062], [0, .062]], M.clear(0xE4EEF2, .45)), mx, my + .008, 0);
    put(g, torus(.048, .009, M.clear(0x8FB3C4, .75), 36), mx, my + .009, 0, Math.PI / 2, 0, 0);
    /* Giriş valfi, O₂ hortumu ve rezervuar */
    put(g, cyl(.015, .015, .03, clr, 24), x0 - .014, by, 0, 0, 0, Math.PI / 2);
    put(g, cyl(.013, .013, .008, red, 20), x0 - .012, by, .017, Math.PI / 2, 0, 0);
    put(g, cyl(.004, .004, .022, M.clear(0xEAF3F6, .7), 12), x0 - .02, by - .022, 0);
    g.add(line([[x0 - .02, by - .033, 0], [x0 - .03, .02, .06], [x0 + .05, .006, .18], [x0 + .25, .006, .2]], .0035, 'clear', .65));
    put(g, crumpled(.085, M.clear(0xE8F1F5, .35)), x0 - .115, .085, 0);
    put(g, cyl(.016, .02, .03, clr, 20), x0 - .04, by - .01, 0, 0, 0, Math.PI / 2);
    parts.push({key: 'e-rbag', at: V3(0, by + .07, .03)}, {key: 'e-rstrap', at: V3(0, by + .1, 0)}, {key: 'e-rvalve', at: V3(px - .008, by + .03, 0)},
      {key: 'e-rpop', at: V3(px + .004, by, .03)}, {key: 'e-rmask', at: V3(mx + .05, .03, .02)}, {key: 'e-rintake', at: V3(x0 - .012, by + .01, .025)},
      {key: 'e-rreservoir', at: V3(x0 - .14, .14, .03)}, {key: 'e-ro2', at: V3(x0 + .1, .015, .19)});
    return {group: g, parts, screens: []};
  });
  T('e-rbag', {tr: ['Kendiliğinden şişen balon', 'Sıkıldığında hacmi hastaya iletir, bırakıldığında giriş valfinden dolar; göğüs yükselmesi izlenir.'], en: ['Self-inflating bag', 'Delivers its volume to the patient when squeezed and refills through the intake valve when released; chest rise is observed.'], es: ['Bolsa autoinflable', 'Entrega su volumen al paciente al comprimirla y se rellena por la válvula de entrada al soltarla; se observa la elevación torácica.']});
  T('e-rstrap', {tr: ['Tutma kayışı', 'Balonun tek elle kavranmasına yardımcı olur.'], en: ['Hand strap', 'Helps grip the bag with one hand.'], es: ['Correa de sujeción', 'Ayuda a sujetar la bolsa con una mano.']});
  T('e-rvalve', {tr: ['Hasta valfi', 'Tek yönlü valf; inspirasyonda gazı hastaya yönlendirir, ekspirasyonda soluk gazını dışarı atar.'], en: ['Patient valve', 'One-way valve; directs gas to the patient on inspiration and vents exhaled gas on expiration.'], es: ['Válvula del paciente', 'Válvula unidireccional; dirige el gas al paciente en la inspiración y expulsa el gas espirado en la espiración.']});
  T('e-rpop', {tr: ['Basınç sınırlayıcı valf', 'Belirlenen basınç aşılınca açılır; bazı modellerde kapatılabilir ya da PEEP valfi eklenebilir.'], en: ['Pressure-limiting valve', 'Opens when a preset pressure is exceeded; on some models it can be overridden or a PEEP valve added.'], es: ['Válvula limitadora de presión', 'Se abre al superarse una presión prefijada; en algunos modelos puede anularse o añadirse una válvula PEEP.']});
  T('e-rmask', {tr: ['Yüz maskesi', 'Şeffaf kubbe ve şişirilmiş yastık; ağız ve burnu sızdırmaz şekilde kapatır.'], en: ['Face mask', 'Clear dome with an inflated cushion; seals over the mouth and nose.'], es: ['Mascarilla facial', 'Cúpula transparente con almohadilla inflada; sella boca y nariz.']});
  T('e-rintake', {tr: ['Giriş valfi', 'Balon bırakıldığında rezervuardan ya da ortam havasından dolmasını sağlar.'], en: ['Intake valve', 'Lets the bag refill from the reservoir or room air when released.'], es: ['Válvula de entrada', 'Permite que la bolsa se rellene desde el reservorio o el aire ambiente al soltarla.']});
  T('e-rreservoir', {tr: ['Oksijen rezervuarı', 'Oksijeni biriktirerek verilen oksijen konsantrasyonunu artırır.'], en: ['Oxygen reservoir', 'Stores oxygen to raise the delivered oxygen concentration.'], es: ['Reservorio de oxígeno', 'Almacena oxígeno para aumentar la concentración de oxígeno administrada.']});
  T('e-ro2', {tr: ['Oksijen hortumu', 'Balonu oksijen akımölçerine bağlar.'], en: ['Oxygen tubing', 'Connects the bag to the oxygen flowmeter.'], es: ['Tubo de oxígeno', 'Conecta la bolsa al caudalímetro de oxígeno.']});
  DEV3D.model('manual-resuscitator', {type: 'e-resuscitator'});

  /* ===== Periferik kateter pompası (elastomerik): şeffaf gövde içinde balon, dolum portu, filtre, hız seçici, bolus düğmesi, klemp, konnektör ===== */
  DEV3D.register('e-elastomeric', cfg => {
    const g = new THREE.Group(), parts = [];
    const r = .05, L = .17, y = r + .004;
    /* Dış kabuk (yatay) ve iç balon */
    put(g, lathe([[.012, 0], [.03, .006], [.046, .025], [r, .06], [r, .11], [.046, .145], [.03, .164], [.012, .17]], M.clear(0xE8F2F6, .35), 48), -L / 2, y, 0, 0, 0, -Math.PI / 2);
    put(g, sphere(.038, M.color(cfg.balloon || 0xE9D9A8, .3), 32), 0, y, 0).scale.set(1.75, 1, 1);
    put(g, decal(.07, .03, (c, W, Hh) => { c.fillStyle = 'rgba(255,255,255,.9)'; c.fillRect(0, 0, W, Hh); c.fillStyle = '#1B2328'; c.font = `700 ${Math.round(Hh * .32)}px Archivo, Arial`; c.fillText('400 mL', 10, Hh * .4); c.font = `600 ${Math.round(Hh * .24)}px Archivo, Arial`; c.fillText('2–14 mL/h', 10, Hh * .78); }), 0, y + .012, r + .001, -.25, 0, 0);
    /* Dolum portu (arka uç) ve kapak */
    put(g, cyl(.006, .007, .016, M.plastic(0xF2F4F5), 16), -L / 2 - .008, y, 0, 0, 0, Math.PI / 2);
    put(g, cyl(.007, .007, .008, M.color(0xE0262B, .4), 16), -L / 2 - .02, y, 0, 0, 0, Math.PI / 2);
    /* Hat: filtre, hız seçici, bolus düğmesi, klemp, kateter konnektörü */
    const p0 = [L / 2 + .004, y, 0];
    g.add(line([p0, [L / 2 + .04, y - .01, .02], [L / 2 + .06, .01, .08], [.08, .006, .12], [-.02, .006, .14], [-.12, .006, .13], [-.2, .006, .1]], .0018, 'clear', .7));
    put(g, cyl(.014, .014, .005, M.clear(0xF2F4F5, .7), 24), L / 2 + .045, .016, .07, Math.PI / 2, .9, 0);
    /* Hız seçici (döner kadran) */
    const dx = .02, dz = .125;
    put(g, rbox(.036, .012, .03, .005, M.plastic(0xF2F4F5)), dx, .01, dz);
    put(g, cyl(.012, .012, .008, M.color(0x3F7FD0, .4), 24), dx, .02, dz);
    put(g, box(.002, .002, .016, M.plastic(0xF2F4F5)), dx, .025, dz);
    /* Bolus düğmesi (hazneli) */
    const bx = -.08, bz = .135;
    put(g, cyl(.016, .018, .02, M.plastic(0xF2F4F5), 24), bx, .012, bz);
    put(g, cyl(.01, .01, .006, M.color(0x7E5BD0, .4), 20), bx, .025, bz);
    /* Klemp ve konnektör */
    put(g, rbox(.022, .01, .014, .003, M.plastic(0xF4F6F7)), -.15, .008, .118);
    put(g, cyl(.004, .003, .018, M.color(0xF2C531, .4), 12), -.208, .006, .097, 0, 0, Math.PI / 2);
    parts.push({key: 'e-el-shell', at: V3(-.03, y + r, 0)}, {key: 'e-el-balloon', at: V3(.04, y, .04)}, {key: 'e-el-fill', at: V3(-L / 2 - .02, y + .012, 0)},
      {key: 'e-el-filter', at: V3(L / 2 + .045, .03, .07)}, {key: 'e-el-rate', at: V3(dx, .03, dz)}, {key: 'e-el-bolus', at: V3(bx, .032, bz)},
      {key: 'e-el-clamp', at: V3(-.15, .018, .118)}, {key: 'e-el-connector', at: V3(-.21, .014, .097)});
    return {group: g, parts, screens: []};
  });
  T('e-el-shell', {tr: ['Koruyucu dış kabuk', 'Elastomerik balonu dış etkilerden korur; dolum düzeyi üzerinden izlenebilir.'], en: ['Protective outer shell', 'Protects the elastomeric balloon; the fill level can be checked through it.'], es: ['Carcasa exterior protectora', 'Protege el balón elastomérico; a través de ella se puede comprobar el nivel de llenado.']});
  T('e-el-balloon', {tr: ['Elastomerik balon', 'Gerilen balonun basıncı ilacı sabit bir akıma yakın şekilde iter; akım sıcaklık ve dolum hacminden etkilenebilir.'], en: ['Elastomeric balloon', 'Pressure from the stretched balloon drives the drug at a near-constant flow; flow can be affected by temperature and fill volume.'], es: ['Balón elastomérico', 'La presión del balón distendido impulsa el fármaco con un flujo casi constante; el flujo puede verse afectado por la temperatura y el volumen de llenado.']});
  T('e-el-fill', {tr: ['Dolum portu', 'Pompanın doldurulduğu tek yönlü valfli porttur; dolum sonrası kapağı kapatılır.'], en: ['Fill port', 'One-way valved port through which the pump is filled; capped after filling.'], es: ['Puerto de llenado', 'Puerto con válvula unidireccional por el que se llena la bomba; se tapa tras el llenado.']});
  T('e-el-filter', {tr: ['Hat filtresi', 'Partikül ve havayı tutan hat içi filtre.'], en: ['In-line filter', 'In-line filter that retains particles and air.'], es: ['Filtro en línea', 'Filtro en línea que retiene partículas y aire.']});
  T('e-el-rate', {tr: ['Hız seçici', 'Ayarlanabilir modellerde bazal akım hızını (mL/saat) seçer; sabit hızlı modellerde akım kısıtlayıcı bulunur.'], en: ['Rate selector', 'On adjustable models selects the basal flow rate (mL/h); fixed-rate models have a flow restrictor instead.'], es: ['Selector de flujo', 'En los modelos ajustables selecciona el flujo basal (mL/h); los de flujo fijo llevan un restrictor.']});
  T('e-el-bolus', {tr: ['Bolus düğmesi', 'Haznesi dolunca hasta tarafından basılarak ek doz verilir; hazne dolum süresi kilit süresi işlevi görür.'], en: ['Bolus button', 'When its chamber has refilled the patient presses it for an extra dose; the refill time acts as the lockout.'], es: ['Botón de bolo', 'Cuando su cámara se ha rellenado, el paciente lo pulsa para una dosis extra; el tiempo de rellenado actúa como bloqueo.']});
  T('e-el-clamp', {tr: ['Klemp', 'Akışı durdurmak için hattı kapatır.'], en: ['Clamp', 'Closes the line to stop the flow.'], es: ['Pinza', 'Cierra la línea para detener el flujo.']});
  T('e-el-connector', {tr: ['Kateter konnektörü', 'Sinir bloğu kateterine bağlanan uç; yanlış yola bağlantıyı önleyen konnektör kullanılabilir.'], en: ['Catheter connector', 'End that connects to the nerve block catheter; misconnection-preventing connectors may be used.'], es: ['Conector del catéter', 'Extremo que se conecta al catéter de bloqueo nervioso; pueden usarse conectores que evitan conexiones erróneas.']});
  DEV3D.model('peripheral-catheter-pump', {type: 'e-elastomeric', theta: .3});
})();
