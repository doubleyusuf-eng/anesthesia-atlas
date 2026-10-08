'use strict';
/* İleri Monitörizasyon Atlası · cihaz senaryoları: dalga formu üreteçleri
   Her üreteç [[x 0..1, y 0..1], ...] noktaları döndürür (SCN.monitor satırlarında kullanılır). Görünüm eğitim
   amaçlı çizimdir; şekil özellikleri senaryo metinlerindeki kaynaklara göre seçilir. Rastgelelik tohumludur:
   aynı senaryo her seferinde aynı çizilir. */
const SCNW = (() => {
  const rng = seed => { let s = seed >>> 0 || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);

  /* ---------- Kapnogram ----------
     o: {sec: pencere (s), max: ölçek üstü (mmHg), breaths:[{t0, ti, te, et, base, up, sl, cleft, osc, on}], cpr:{rate, amp}}
     Her nefes: t0 başlangıç (s), ti inspirasyon süresi, te ekspirasyon süresi; et plato sonu (mmHg); base inspire CO2;
     up: faz II hızı (1 normal, küçük = yavaş eğimli); sl: faz III eğimi (0 düz … 1 köpekbalığı yüzgeci);
     cleft: platoda çentik derinliği (0..1); osc: kardiyojenik salınım (mmHg); on:false → iz yok. */
  function capno(o) {
    const N = 900, pts = [], sec = o.sec || 12, max = o.max || 60, R = rng(o.seed || 7);
    const br = o.breaths || [];
    for (let i = 0; i <= N; i++) {
      const t = i / N * sec; let v = 0;
      const b = br.find(q => t >= q.t0 && t < q.t0 + q.ti + q.te);
      if (b && b.on !== false) {
        const base = b.base || 0;
        if (t < b.t0 + b.ti) v = base;                                     /* faz I (inspirasyon) */
        else {
          const u = (t - b.t0 - b.ti) / b.te;                               /* ekspirasyon 0..1 */
          const up = b.up || 1, rise = smooth(u / (.12 / up));              /* faz II */
          const pl = b.et * (1 - (b.sl || 0) * .45 * (1 - u)) - (b.sl || 0) * b.et * .05; /* faz III eğimi */
          let w = base + (pl - base) * rise;
          if (b.cleft) w -= b.et * b.cleft * Math.exp(-((((u - .55) / .07)) ** 2));
          if (b.osc && u > .45) w += b.osc * Math.sin((t - b.t0) * 2 * Math.PI * 1.3) * smooth((u - .45) / .1);
          const down = u > .94 ? smooth((u - .94) / .06) : 0;               /* faz 0 (inspiratuvar iniş) */
          v = w + (base - w) * down;
        }
      } else if (o.base) v = o.base;
      if (o.cpr) v += o.cpr.amp * Math.max(0, Math.sin(t * 2 * Math.PI * o.cpr.rate / 60)) ** 2 * (b && b.on !== false ? 1 : .6);
      v += (R() - .5) * .25;
      pts.push([i / N, clamp(v / max, 0, 1)]);
    }
    return pts;
  }
  /* Düzenli soluma kolaylığı: n nefes, solunum sayısı rr, her nefese ayrı ayar f(k) */
  function breaths(sec, rr, f) {
    const per = 60 / rr, out = [];
    for (let k = 0, t = .3; t < sec; k++, t += per) out.push(Object.assign({t0: t, ti: per * .33, te: per * .67}, f(k)));
    return out;
  }

  /* ---------- Pletismografi (SpO2) ----------
     o: {sec, hr, amp (0..1), notch, resp:{rate, depth}, noise, motion:[t0, t1], perf (0..1 düşük perfüzyonda küçük ve gürültülü)} */
  function pleth(o) {
    const N = 900, pts = [], sec = o.sec || 6, R = rng(o.seed || 3), per = 60 / (o.hr || 72);
    let mv = 0;
    for (let i = 0; i <= N; i++) {
      const t = i / N * sec, ph = (t % per) / per;
      let p = ph < .18 ? smooth(ph / .18) : Math.exp(-(ph - .18) * 3.2) * (1 + (o.notch ?? .12) * Math.exp(-((((ph - .42) / .05)) ** 2)) * 2.2);
      p = p * .9 + .05;
      let a = o.amp ?? .8;
      if (o.resp) a *= 1 - o.resp.depth * (.5 + .5 * Math.sin(t * 2 * Math.PI * o.resp.rate / 60));
      let v = .1 + p * a;
      v += (R() - .5) * (o.noise || .01);
      if (o.motion && t >= o.motion[0] && t <= o.motion[1]) { mv = mv * .85 + (R() - .5) * .9; v = .5 + mv * .9 + Math.sin(t * 17) * .15; }
      pts.push([i / N, clamp(v, 0, 1)]);
    }
    return pts;
  }

  /* ---------- Arter basıncı ----------
     o: {sec, hr, sys, dia, max, min, damp:'normal'|'over'|'under', ppv (oransal değişim), rr, as (aort darlığı), flush:t (s)} */
  function art(o) {
    const N = 1200, pts = [], sec = o.sec || 6, per = 60 / (o.hr || 75), max = o.max || 180, min = o.min ?? 0, R = rng(o.seed || 5);
    const shape = ph => {
      if (o.as) { if (ph < .32) return ph < .1 ? .55 * smooth(ph / .1) : .55 + .45 * smooth((ph - .14) / .18) * (ph > .14 ? 1 : 0); return Math.exp(-(ph - .32) * 2.4); }   /* yavaş yükselme, anakrotik çentik, gecikmiş tepe */
      if (o.ar) { if (ph < .08) return smooth(ph / .08); return Math.exp(-(ph - .08) * 4.2); }   /* geniş nabız basıncı, hızlı diyastolik düşüş, çentik yok */
      if (ph < .09) return smooth(ph / .09);
      let v = Math.exp(-(ph - .09) * 2.6) * .9 + .1 * Math.exp(-(ph - .09) * 9);
      v -= .1 * Math.exp(-((((ph - .36) / .03)) ** 2)); v += .08 * Math.exp(-((((ph - .42) / .05)) ** 2));   /* dikrotik çentik */
      return v;
    };
    let y = null, vel = 0;
    for (let i = 0; i <= N; i++) {
      const t = i / N * sec, ph = (t % per) / per;
      let pp = (o.sys - o.dia);
      if (o.alt && Math.floor(t / per) % 2 === 1) pp *= o.alt;            /* dönüşümlü küçük vuruşlar */
      if (o.ppv) pp *= 1 + o.ppv / 2 * Math.sin(t * 2 * Math.PI * (o.rr || 15) / 60);
      let target = o.dia + pp * shape(ph) * 1.0;
      if (o.flush != null && t >= o.flush && t < o.flush + .6) target = 300;
      /* Sönümleme: ikinci derece sistem; aşırı sönümde yavaş, az sönümde çınlama */
      const wn = o.damp === 'over' ? 16 : o.damp === 'under' ? 75 : 90, z = o.damp === 'over' ? 1.8 : o.damp === 'under' ? .07 : .4, dt = sec / N;
      if (y == null) y = target;
      for (let k = 0; k < 4; k++) { const acc = wn * wn * (target - y) - 2 * z * wn * vel; vel += acc * dt / 4; y += vel * dt / 4; }
      pts.push([i / N, clamp((y - min) / (max - min) + (R() - .5) * .003, 0, 1)]);
    }
    return pts;
  }

  /* ---------- EKG ----------
     o: {sec, hr, rhythm:'sinus'|'af'|'vf'|'vt'|'asys', st (mV), t (T dalgası ölçeği), p (0 = P yok), qrs (genişlik ölçeği),
         pr (s), noise, cautery:[t0,t1]} */
  function ecg(o) {
    const N = 1400, pts = [], sec = o.sec || 6, R = rng(o.seed || 11), hr = o.hr || 70;
    const g = (x, m, s, a) => a * Math.exp(-((((x - m) / s)) ** 2));
    /* Atım zamanları */
    const beats = [];
    if (o.rhythm === 'af') { let t = .2; while (t < sec) { beats.push(t); t += 60 / hr * (.6 + R() * .8); } }
    else if (o.rhythm !== 'vf' && o.rhythm !== 'asys' && o.rhythm !== 'sine') { for (let t = .25; t < sec; t += 60 / hr) beats.push(t); }
    const qw = o.qrs || 1, pAmp = o.p ?? .15, tAmp = .3 * (o.t ?? 1), st = o.st || 0, pr = o.pr || .16;
    const pvc = x => g(x, 0, .05, -.9) + g(x, .08, .06, .5) + g(x, .3, .1, .3);   /* geniş, P dalgasız erken atım */
    const beat = (x, k) => {        /* x: atımın QRS merkezine göre zaman (s), k: atım sırası */
      if (o.bigeminy && k % 2 === 1) return pvc(x);
      let v = 0;
      if (o.rhythm === 'vt') return g(x, 0, .06, 1.1) - g(x, .12, .07, .6) + g(x, .3, .09, -.35);
      v += g(x, -pr, .035, pAmp);
      v += g(x, -.025 * qw, .01 * qw, -.12) + g(x, 0, .014 * qw, 1.15) + g(x, .028 * qw, .012 * qw, -.28);
      if (Math.abs(st) > 0) v += st * smooth((x - .04 * qw) / .02) * (1 - smooth((x - .3) / .06));
      v += g(x, .28 + .02 * qw, o.t > 1.6 ? .045 : .065, tAmp);
      return v;
    };
    for (let i = 0; i <= N; i++) {
      const t = i / N * sec; let v = 0;
      if (o.rhythm === 'vf') v = .45 * Math.sin(t * 2 * Math.PI * 4.6 + Math.sin(t * 1.7) * 2) * (.6 + .4 * Math.sin(t * .9)) + .2 * Math.sin(t * 2 * Math.PI * 6.3 + 1);
      else if (o.rhythm === 'asys') v = .02 * Math.sin(t * 1.3);
      else if (o.rhythm === 'sine') v = .75 * Math.sin(t * 2 * Math.PI * hr / 60) * (1 + .15 * Math.sin(t * 2 * Math.PI * hr / 30));   /* sinüs dalgası (ağır hiperkalemi) */
      else { beats.forEach((b, k) => { const x = t - b; if (x > -.35 && x < .55) v += beat(x, k); }); }
      if (o.rhythm === 'af') v += .04 * Math.sin(t * 2 * Math.PI * 6.5) + .03 * Math.sin(t * 2 * Math.PI * 8.7 + 2);
      v += (R() - .5) * (o.noise || .015);
      if (o.cautery && t >= o.cautery[0] && t <= o.cautery[1]) v = (R() - .5) * 2.2;
      pts.push([i / N, clamp((v + .9) / 2.4, 0, 1)]);
    }
    return pts;
  }

  /* ---------- Ham EEG (frontal) ----------
     o: {sec, kind:'awake'|'ga'|'deep'|'bs'|'iso'|'emg'|'ketamine', bursts:[[t0,t1]]} → μV ölçeği ±100 */
  function eeg(o) {
    const N = 1400, pts = [], sec = o.sec || 4, R = rng(o.seed || 13);
    let lp = 0, lp2 = 0;
    for (let i = 0; i <= N; i++) {
      const t = i / N * sec, n = R() - .5; lp = lp * .55 + n * .45; lp2 = lp2 * .92 + n * .08;
      let v = 0;
      switch (o.kind) {
        case 'awake': v = 12 * lp + 6 * Math.sin(t * 2 * Math.PI * 21 + lp2 * 3) + 4 * Math.sin(t * 2 * Math.PI * 10); break;
        case 'ga': v = 32 * Math.sin(t * 2 * Math.PI * 1.1 + Math.sin(t * .7)) + 14 * Math.sin(t * 2 * Math.PI * 10.5) * (.6 + .4 * Math.sin(t * 2.1)) + 40 * lp2 + 4 * lp; break;
        case 'deep': v = 55 * Math.sin(t * 2 * Math.PI * .8 + Math.sin(t)) + 8 * Math.sin(t * 2 * Math.PI * 9) + 50 * lp2 + 3 * lp; break;
        case 'bs': { const on = (o.bursts || []).some(([a, b]) => t >= a && t <= b); v = on ? 60 * Math.sin(t * 2 * Math.PI * 7 + lp2 * 4) * Math.sin(Math.PI * ((t % 1))) + 45 * lp2 + 10 * lp : 2 * lp; break; }
        case 'iso': v = 1.5 * lp; break;
        case 'emg': v = 30 * Math.sin(t * 2 * Math.PI * 1.1) + 12 * Math.sin(t * 2 * Math.PI * 10.5) + 30 * lp2 + 28 * n; break;
        case 'ketamine': v = 14 * lp + 10 * Math.sin(t * 2 * Math.PI * 30 + lp2 * 5) + 18 * Math.sin(t * 2 * Math.PI * 4 + Math.sin(t)) + 15 * lp2; break;
        default: v = 10 * lp;
      }
      pts.push([i / N, clamp((v + 100) / 200, 0, 1)]);
    }
    return pts;
  }

  /* Eğilim (trend) çizgisi: değer listesi → noktalar */
  const trend = (vals, max, min = 0) => vals.map((v, i) => [i / (vals.length - 1), clamp((v - min) / (max - min), 0, 1)]);

  return {capno, breaths, pleth, art, ecg, eeg, trend, rng};
})();
