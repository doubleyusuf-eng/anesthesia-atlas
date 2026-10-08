'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · fizik çekirdeği (vl-model-0.1)
   Atlasın mod kartlarındaki motordan (engine.js) ayrıdır: süzgeç, valf gecikmesi ve devre direnci yoktur; analitik çözümle
   sınanabilsin diye yalnız şartnamedeki denklemler kullanılır. Birimler: s, L, L/s, cmH₂O.
     Palv = x/C − M(t)        Paw = x/C + R·Q − M(t)        dx/dt = Q
   x, toplam sistemin sıfır gevşeme basıncındaki referansına göre hacimdir (mutlak akciğer hacmi değildir).
   M(t) pozitif inspiratuvar kas katkısıdır; nöral saat ventilatör saatinden bağımsızdır.
   Devre durumları: 'pc' ideal proksimal basınç kaynağı, 'vc' sabit akım, 'exp' Rexp + Rv üzerinden PEEP rezervuarı
   (talep yolu da aynıdır), 'hold' akım sıfır. Model sadeleştirmeleridir; gerçek cihaz valfi veya algoritması değildir. */
const VLAB_MODEL = (() => {
  const VERSION = 'vl-model-0.1';
  const HMAX = .001;               // [U] başlangıç adımı 1 ms
  const fin = v => typeof v === 'number' && Number.isFinite(v);

  /* ---------- Nöral efor saati ----------
     Her nöral solukta u = (t − başlangıç)/Ti_nöral; M = Mmax·sin²(πu), 0 ≤ u ≤ 1. İlk başlangıç neuralPhase anında,
     sonra her 60/neuralRR saniyede bir. Parametre değişikliği bir sonraki nöral başlangıçta uygulanır. */
  class Neural {
    constructor(p) {
      this.p = {Mmax: p.Mmax, rr: p.neuralRR, ti: p.neuralTi};
      this.pending = null;
      this.next = p.neuralPhase || 0;  // bir sonraki başlangıç
      this.cur = null;                 // {id, t0, ti, Mmax}
      this.id = 0;
    }
    request(p) { this.pending = {Mmax: p.Mmax, rr: p.neuralRR, ti: p.neuralTi}; }
    M(t) {
      const c = this.cur; if (!c || c.Mmax === 0) return 0;
      const u = (t - c.t0) / c.ti;
      if (u < 0 || u > 1) return 0;
      const s = Math.sin(Math.PI * u); return c.Mmax * s * s;
    }
    /* Planlı olay zamanları */
    times() { const a = [this.next]; if (this.cur) a.push(this.cur.t0 + this.cur.ti); return a; }
    /* t anında başlangıç/bitiş varsa işle; olay listesi döner */
    tick(t, eps) {
      const ev = [];
      if (this.cur && t >= this.cur.t0 + this.cur.ti - eps) { ev.push({type: 'neural_end', id: this.cur.id, t0: this.cur.t0, ti: this.cur.ti, Mmax: this.cur.Mmax}); this.cur = null; }
      if (t >= this.next - eps) {
        if (this.pending) { this.p = this.pending; this.pending = null; ev.push({type: 'effort_applied'}); }
        this.id++;
        this.cur = {id: this.id, t0: this.next, ti: this.p.ti, Mmax: this.p.Mmax};
        this.next = this.next + 60 / this.p.rr;
        ev.push({type: 'neural_start', id: this.id, Mmax: this.p.Mmax});
      }
      return ev;
    }
  }

  /* ---------- Devre denklemleri ----------
     cs: {kind, C, Rin, Rexp, Rv, PEEP, Q (vc), P0, dP, t0, rise (pc)} — adım boyunca sabit tutulur. */
  function target(cs, t) {
    if (cs.rise > 0) { const f = (t - cs.t0) / cs.rise; return cs.P0 + cs.dP * (f >= 1 ? 1 : f <= 0 ? 0 : f); }
    return cs.P0 + cs.dP;
  }
  /* Akım (hastaya giriş pozitif) */
  function flow(cs, t, x, M) {
    switch (cs.kind) {
      case 'pc': return (target(cs, t) + M - x / cs.C) / cs.Rin;
      case 'vc': return cs.Q;
      case 'exp': return (cs.PEEP + M - x / cs.C) / (cs.Rexp + cs.Rv);
      default: return 0;
    }
  }
  /* Proksimal hava yolu basıncı */
  function paw(cs, t, x, M, Q) {
    switch (cs.kind) {
      case 'pc': return target(cs, t);
      case 'vc': return x / cs.C + cs.Rin * Q - M;
      case 'exp': return cs.PEEP - cs.Rv * Q;
      default: return x / cs.C - M;
    }
  }
  /* RK4 adımı; dönüş: yeni x ve adım boyunca ∫Q dt (aynı ağırlıklarla, Δx ile özdeş) */
  function rk4(cs, t, x, h, Mf) {
    if (cs.kind === 'hold') return x;
    if (cs.kind === 'vc') return x + cs.Q * h;
    const f = (tt, xx) => flow(cs, tt, xx, Mf(tt));
    const a = f(t, x), b = f(t + h / 2, x + h * a / 2), c = f(t + h / 2, x + h * b / 2), d = f(t + h, x + h * c);
    return x + h * (a + 2 * b + 2 * c + d) / 6;
  }
  /* Adım sınırı: min(1 ms, en kısa zaman sabiti / 50) — mühendislik seçimi [U] */
  function hmax(p) { const tau = Math.min(p.Rin * p.C, (p.Rexp + p.Rv) * p.C); return Math.min(HMAX, tau / 50); }

  /* ---------- Analitik referanslar (testler ve "Modelin içi" paneli için) ---------- */
  const analytic = {
    /* sabit U = Paw + M, sabit R, C */
    constP: (x0, U, C, R, t) => C * U + (x0 - C * U) * Math.exp(-t / (R * C)),
    /* pasif ekspirasyon, M = 0 */
    exp: (x0, PEEP, C, Rtot, t) => C * PEEP + (x0 - C * PEEP) * Math.exp(-t / (Rtot * C)),
    /* VC basınç sınırına varış hacmi (sabit M) */
    xLimit: (C, Pmax, M, Rin, Q) => C * (Pmax + M - Rin * Q)
  };

  /* Birim dönüşümleri: motor L, L/s, L/cmH₂O; ekran mL, L/min, mL/cmH₂O */
  const units = {toML: L => L * 1000, fromML: v => v / 1000, toLmin: q => q * 60, fromLmin: v => v / 60, toMLcm: C => C * 1000, fromMLcm: v => v / 1000};

  return {VERSION, HMAX, fin, Neural, target, flow, paw, rk4, hmax, analytic, units};
})();
if (typeof module !== 'undefined') module.exports = VLAB_MODEL;
