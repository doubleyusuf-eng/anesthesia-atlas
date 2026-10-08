'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · mod denetleyicisi ve durum makinesi (vl-model-0.1)
   Aynı fizik çekirdeği (lab-model.js) dört denetleyiciyle sürülür: VC-AC, PC-AC, PSV, CPAP; apnede açıkça etiketli PC yedek.
   Durumlar: EXP → INSP_VC / INSP_PC → HOLD_I (isteğe bağlı) → EXP; ayrıca HOLD_E ve INVALID.
   Özgün eğitim denetleyicisidir; hiçbir marka veya kullanım kılavuzunun birebir algoritması değildir.
   Uygulama kararları [U]: tetikleme için 100 ms yeniden etkinleşme ve 10 ms süzgeç, siklus için 10 ms süzgeç, CPAP soluk
   ayrımı için ±0,005 L/s ve 20 ms, bekletme 1 s. Eşik kararları ham değerle verilir; yuvarlama yalnız gösterimdedir.
   Ayar paketi bir sonraki ekspirasyon başlangıcında atomik uygulanır (CPAP/PSV'de ekspirasyondaysa bir sonraki adımda).
   Hasta mekaniği (C, R) değişikliği hemen uygulanır ve olay olarak kaydedilir; x hiçbir değişiklikte sıfırlanmaz. */
const VLAB_CTRL = (() => {
  const MOD = typeof VLAB_MODEL !== 'undefined' ? VLAB_MODEL : require('./lab-model.js');
  const {fin} = MOD;
  const EPS = 1e-9;
  const REFRACT = .1, TRIG_FILT = .01, CYC_FILT = .01, CPAP_Q = .005, CPAP_FILT = .02, HOLD_T = 1, CLASS_LAG = .1;
  const MODES = ['VC-AC', 'PC-AC', 'PSV', 'CPAP'];

  /* ---------- Girdi aralıkları (veri sözleşmesi; sentetik çalışma alanı, klinik hedef değildir) ---------- */
  const RANGE = {
    C: [.01, .15], Rin: [1, 100], Rexp: [1, 100], Rv: [0, 10],
    Mmax: [0, 20], neuralRR: [5, 40], neuralTi: [.2, 3], neuralPhase: [0, 60],
    PEEP: [0, 20], VTset: [.1, 1], Qset: [.1, 2], RRset: [5, 40], dPinsp: [1, 30], PS: [1, 30], Ti: [.2, 3],
    pauseTime: [0, 1], riseTime: [0, .5], Ti_min: [.1, 1], Ti_max: [.5, 4], cycle_fraction: [.05, .8],
    Qtrigger: [.5 / 60, 15 / 60], dPtrigger: [.2, 10], Pmax: [10, 60], apneaTime: [5, 60]
  };
  const PATIENT_KEYS = ['C', 'Rin', 'Rexp', 'Rv', 'Mmax', 'neuralRR', 'neuralTi', 'neuralPhase'];
  const MECH_KEYS = ['C', 'Rin', 'Rexp', 'Rv'], EFFORT_KEYS = ['Mmax', 'neuralRR', 'neuralTi'];
  const SET_KEYS = ['PEEP', 'VTset', 'Qset', 'RRset', 'dPinsp', 'PS', 'Ti', 'pauseTime', 'riseTime', 'Ti_min', 'Ti_max', 'cycle_fraction', 'Qtrigger', 'dPtrigger', 'Pmax', 'apneaTime'];

  /* Sayı okuma: Türkçe virgül veya nokta; belirsiz binlik ayraç, boş, "bilinmiyor", NaN, Infinity → null + neden */
  function parseNum(v) {
    if (typeof v === 'number') return Number.isFinite(v) ? {v} : {v: null, why: 'nonfinite'};
    if (v == null) return {v: null, why: 'empty'};
    const s = String(v).trim();
    if (!s) return {v: null, why: 'empty'};
    if (!/^[-+]?\d*([.,]\d*)?$/.test(s) || !/\d/.test(s)) return {v: null, why: /[.,].*[.,]/.test(s) ? 'ambiguous' : 'nan'};
    const n = Number(s.replace(',', '.'));
    return Number.isFinite(n) ? {v: n} : {v: null, why: 'nonfinite'};
  }

  /* Doğrulama: sessiz kırpma yok; her hata {k, code} */
  function validate(S, P) {
    const e = [], num = (o, k) => { const x = o[k]; if (!fin(x)) { e.push({k, code: x == null ? 'missing' : 'nonfinite'}); return false; } if (RANGE[k] && (x < RANGE[k][0] - 1e-12 || x > RANGE[k][1] + 1e-12)) { e.push({k, code: 'range', lo: RANGE[k][0], hi: RANGE[k][1]}); return false; } return true; };
    if (P) {
      PATIENT_KEYS.forEach(k => num(P, k));
      if (fin(P.neuralTi) && fin(P.neuralRR) && P.neuralTi >= 60 / P.neuralRR) e.push({k: 'neuralTi', code: 'neural_period'});
    }
    if (S) {
      if (!MODES.includes(S.mode)) e.push({k: 'mode', code: 'mode'});
      const m = S.mode;
      ['PEEP', 'Pmax', 'Qtrigger', 'dPtrigger', 'apneaTime'].forEach(k => num(S, k));
      if (!['flow', 'pressure'].includes(S.trigger_kind)) e.push({k: 'trigger_kind', code: 'enum'});
      if (fin(S.Pmax) && fin(S.PEEP) && S.Pmax <= S.PEEP) e.push({k: 'Pmax', code: 'pmax_low'});
      if (m === 'VC-AC') {
        ['VTset', 'Qset', 'RRset', 'pauseTime'].map(k => num(S, k));
        if (fin(S.VTset) && fin(S.Qset) && fin(S.RRset) && fin(S.pauseTime) && S.VTset / S.Qset + S.pauseTime >= 60 / S.RRset) e.push({k: 'RRset', code: 'ti_period'});
      }
      if (m === 'PC-AC') {
        ['dPinsp', 'RRset', 'Ti', 'riseTime'].map(k => num(S, k));
        if (fin(S.Ti) && fin(S.RRset) && S.Ti >= 60 / S.RRset) e.push({k: 'Ti', code: 'ti_period'});
        if (fin(S.riseTime) && fin(S.Ti) && S.riseTime > S.Ti) e.push({k: 'riseTime', code: 'rise_ti'});
        if (fin(S.Pmax) && fin(S.PEEP) && fin(S.dPinsp) && S.Pmax <= S.PEEP + S.dPinsp) e.push({k: 'Pmax', code: 'pmax_low'});
      }
      if (m === 'PSV') {
        ['PS', 'riseTime', 'Ti_min', 'Ti_max', 'cycle_fraction'].map(k => num(S, k));
        if (fin(S.Ti_min) && fin(S.Ti_max) && S.Ti_min >= S.Ti_max) e.push({k: 'Ti_min', code: 'tmin_tmax'});
        if (fin(S.riseTime) && fin(S.Ti_max) && S.riseTime > S.Ti_max) e.push({k: 'riseTime', code: 'rise_ti'});
        if (fin(S.Pmax) && fin(S.PEEP) && fin(S.PS) && S.Pmax <= S.PEEP + S.PS) e.push({k: 'Pmax', code: 'pmax_low'});
      }
      if ((m === 'PSV' || m === 'CPAP') && S.backupEnabled) {
        const b = S.backupPC;
        if (!b) e.push({k: 'backupPC', code: 'missing'});
        else {
          [['RRset', 'RRset'], ['dPinsp', 'dPinsp'], ['Ti', 'Ti'], ['riseTime', 'riseTime']].forEach(([k]) => { const x = b[k]; if (!fin(x) || x < RANGE[k][0] || x > RANGE[k][1]) e.push({k: 'backupPC.' + k, code: fin(x) ? 'range' : 'missing', lo: RANGE[k][0], hi: RANGE[k][1]}); });
          if (fin(b.Ti) && fin(b.RRset) && b.Ti >= 60 / b.RRset) e.push({k: 'backupPC.Ti', code: 'ti_period'});
          if (fin(b.riseTime) && fin(b.Ti) && b.riseTime > b.Ti) e.push({k: 'backupPC.riseTime', code: 'rise_ti'});
          if (fin(S.Pmax) && fin(S.PEEP) && fin(b.dPinsp) && S.Pmax <= S.PEEP + b.dPinsp) e.push({k: 'Pmax', code: 'pmax_low'});
        }
      }
    }
    return e;
  }

  /* ---------- Örnek halka belleği (eğriler bu kayıttan çizilir) ---------- */
  class Ring {
    constructor(n) {
      this.n = n; this.i = 0; this.len = 0;
      for (const k of ['t', 'paw', 'q', 'vol', 'M', 'x', 'palv']) this[k] = new Float64Array(n);
      this.ph = new Uint8Array(n); this.bt = new Uint8Array(n); this.gap = new Uint8Array(n);
    }
    push(o) {
      const i = this.i;
      this.t[i] = o.t; this.paw[i] = o.paw; this.q[i] = o.q; this.vol[i] = o.vol; this.M[i] = o.M; this.x[i] = o.x; this.palv[i] = o.palv;
      this.ph[i] = o.ph; this.bt[i] = o.bt; this.gap[i] = o.gap ? 1 : 0;
      this.i = (i + 1) % this.n; if (this.len < this.n) this.len++;
    }
    /* k = 0 en eski … len−1 en yeni */
    idx(k) { return (this.i - this.len + k + this.n) % this.n; }
  }
  const PH = {EXP: 0, INSP_VC: 1, INSP_PC: 2, HOLD_I: 3, HOLD_E: 4, INVALID: 5};
  const BT = {none: 0, mand: 1, assist: 2, spont: 3, backup: 4};

  const clone = o => JSON.parse(JSON.stringify(o));

  class Lab {
    /* init: {settings, patient, x0?, hScale?, ring?} — doğrulanmamış girdiyle kurulmaz */
    constructor(init) {
      const errs = validate(init.settings, init.patient);
      if (errs.length) { const er = new Error('invalid input'); er.errors = errs; throw er; }
      this.S = clone(init.settings); this.P = clone(init.patient);
      this.hScale = init.hScale || 1;
      this.t = 0; this.x = init.x0 != null ? init.x0 : this.P.C * this.S.PEEP;
      this.neural = new MOD.Neural(this.P);
      this.state = 'EXP'; this.backup = false; this.backupReturn = false;
      this.tExp = 0; this.armT = REFRACT;
      const RR = this.S.RRset;
      this.lastStart = this.mandatory() ? .5 - 60 / RR : 0;   // ilk zorunlu soluk 0,5 s'de
      this.nextMandOverride = null;
      this.apneaFlag = false; this.apneaAlarm = false;
      this.br = null; this.breaths = []; this.events = []; this.holds = []; this.windows = []; this.efforts = [];
      this.I = {pos: 0, neg: 0}; this.qPrev = 0; this.qNow = 0; this.pawNow = this.S.PEEP;
      this.filt = {trig: null, cyc: null, cin: null, cout: null};
      this.cpapIn = false; this.pending = null; this.holdReq = null; this.eeHold = null;
      this.sVer = 0; this.mVer = 0; this.lastNeuralEnd = null;
      this.xRef = this.x; this.gapNext = true; this.loop = []; this.loops = [];
      this.ring = new Ring(init.ring || 60000);
      this.actions = [];          // yeniden oynatma için kullanıcı işlemleri
      this.tWindow = 0;           // 60 s ekspire hacim penceresi başlangıcı
      this.residual = {max: 0, trap: 0};
      this.updH();
      this.log('start', {x: this.x, mode: this.S.mode});
      this.sample();
    }
    updH() { this.h = MOD.hmax(this.P) * this.hScale; }
    log(type, o = {}) { const e = Object.assign({id: this.events.length + 1, t: this.t, type}, o); this.events.push(e); if (this.events.length > 3000) this.events.splice(0, 500); return e; }

    /* ---------- Etkin denetleyici ---------- */
    get mode() { return this.backup ? 'BACKUP' : this.S.mode; }
    mandatory() { const m = this.mode; return m === 'VC-AC' || m === 'PC-AC' || m === 'BACKUP'; }
    ctl() {
      const S = this.S;
      if (this.backup) return {kind: 'pc', RR: S.backupPC.RRset, dP: S.backupPC.dPinsp, Ti: S.backupPC.Ti, rise: S.backupPC.riseTime};
      switch (S.mode) {
        case 'VC-AC': return {kind: 'vc', RR: S.RRset, Q: S.Qset, Tflow: S.VTset / S.Qset, pause: S.pauseTime};
        case 'PC-AC': return {kind: 'pc', RR: S.RRset, dP: S.dPinsp, Ti: S.Ti, rise: S.riseTime};
        case 'PSV': return {kind: 'ps', dP: S.PS, rise: S.riseTime, tmin: S.Ti_min, tmax: S.Ti_max, cf: S.cycle_fraction};
        default: return {kind: 'cpap'};
      }
    }
    nextMand() { if (!this.mandatory()) return Infinity; return this.nextMandOverride != null ? this.nextMandOverride : this.lastStart + 60 / this.ctl().RR; }

    /* Adım boyunca sabit devre durumu */
    cs() {
      const P = this.P, S = this.S, b = {C: P.C, Rin: P.Rin, Rexp: P.Rexp, Rv: P.Rv, PEEP: S.PEEP};
      switch (this.state) {
        case 'INSP_VC': return Object.assign(b, {kind: 'vc', Q: this.ctl().Q});
        case 'INSP_PC': { const c = this.ctl(); return Object.assign(b, {kind: 'pc', P0: S.PEEP, dP: c.dP, t0: this.br.tStart, rise: c.rise}); }
        case 'HOLD_I': case 'HOLD_E': case 'INVALID': return Object.assign(b, {kind: 'hold'});
        default: return Object.assign(b, {kind: 'exp'});
      }
    }
    Qat(cs, t, x) { return MOD.flow(cs, t, x, this.neural.M(t)); }
    Pat(cs, t, x) { const M = this.neural.M(t), Q = MOD.flow(cs, t, x, M); return MOD.paw(cs, t, x, M, Q); }

    /* ---------- Eşik koşulları (ham değer) ---------- */
    trigCond(cs, t, x) {
      const S = this.S;
      if (S.trigger_kind === 'pressure') return this.Pat(cs, t, x) <= S.PEEP - S.dPtrigger;
      return this.Qat(cs, t, x) >= S.Qtrigger;
    }
    canPatientTrigger() { return this.state === 'EXP' && this.mode !== 'CPAP' && this.t >= this.armT - EPS && !this.holdingExp(); }
    holdingExp() { return this.state === 'HOLD_E'; }
    cycActive() { if (this.state !== 'INSP_PC' || this.mode !== 'PSV') return false; const c = this.ctl(), tb = this.t - this.br.tStart; return tb >= Math.max(c.rise, c.tmin) - EPS && this.br.Qpeak > 0; }
    cycCond(cs, t, x) { const q = this.Qat(cs, t, x); return q <= this.ctl().cf * this.br.Qpeak || q <= 0; }
    preds(cs) {
      const p = [];
      if (this.state === 'INSP_VC') p.push({id: 'pmax', f: (t, x) => this.Pat(cs, t, x) >= this.S.Pmax});
      if (this.canPatientTrigger() && !this.filt.trig) p.push({id: 'trig', f: (t, x) => this.trigCond(cs, t, x)});
      if (this.cycActive() && !this.filt.cyc) p.push({id: 'cyc', f: (t, x) => this.cycCond(cs, t, x)});
      if (this.mode === 'CPAP' && this.state === 'EXP') {
        if (!this.cpapIn && !this.filt.cin) p.push({id: 'cin', f: (t, x) => this.Qat(cs, t, x) >= CPAP_Q});
        if (this.cpapIn && !this.filt.cout) p.push({id: 'cout', f: (t, x) => this.Qat(cs, t, x) <= -CPAP_Q});
      }
      return p;
    }

    /* ---------- Planlı olay zamanları ---------- */
    scheduled() {
      const a = this.neural.times(), br = this.br, st = this.state;
      if (st === 'INSP_VC') a.push(br.tStart + this.ctl().Tflow);
      if (st === 'HOLD_I' || st === 'HOLD_E') a.push(this.holdEnd);
      if (st === 'INSP_PC') { const c = this.ctl(); a.push(br.tStart + c.rise); if (c.kind === 'ps') a.push(br.tStart + c.tmin, br.tStart + c.tmax); else a.push(br.tStart + c.Ti); }
      if (st === 'EXP') {
        a.push(this.armT, Math.max(this.nextMand(), this.armT));
        if ((this.mode === 'PSV' || this.mode === 'CPAP') && !this.apneaFlag) a.push(this.lastStart + this.S.apneaTime);
      }
      if (this.filt.trig) a.push(this.filt.trig.t0 + TRIG_FILT);
      if (this.filt.cyc) a.push(this.filt.cyc.t0 + CYC_FILT);
      if (this.filt.cin) a.push(this.filt.cin.t0 + CPAP_FILT);
      if (this.filt.cout) a.push(this.filt.cout.t0 + CPAP_FILT);
      for (const w of this.windows) a.push(w.check);
      let m = Infinity; for (const v of a) if (v > this.t + EPS && v < m) m = v;
      return m;
    }

    /* ---------- Zaman ilerletme ---------- */
    advance(T) {
      const tEnd = this.t + T; let n = 0;
      while (this.t < tEnd - EPS && this.state !== 'INVALID') { this.step(tEnd); if (++n > 2e7) break; }
    }
    /* Bir sonraki soluk başlangıcına kadar ilerlet (en çok tmax saniye) */
    /* Sonraki soluk başlangıcına veya önemli olaya kadar ilerlet (en çok tmax saniye): soluksuz deneyde geçiş kaçırılmaz */
    untilNext(tmax = 60) {
      const STOP = new Set(['breath_start', 'apnea', 'backup_on', 'backup_off', 'settings_applied', 'effort_applied', 'ineffective_effort', 'effort_overlap', 'hold_end', 'pressure_limit', 'invalid']);
      const e0 = this.events.length ? this.events[this.events.length - 1].id : 0, tEnd = this.t + tmax;
      const hit = () => { for (let i = this.events.length - 1; i >= 0 && this.events[i].id > e0; i--) if (STOP.has(this.events[i].type)) return true; return false; };
      while (this.t < tEnd - EPS && this.state !== 'INVALID' && !hit()) this.step(tEnd);
    }
    untilNextBreath(tmax = 60) { const n0 = this.breaths.length + (this.br ? 1 : 0), tEnd = this.t + tmax; while (this.t < tEnd && this.state !== 'INVALID' && this.breaths.length + (this.br ? 1 : 0) === n0) this.step(tEnd); }
    step(tLimit) {
      let h = Math.min(this.h, tLimit - this.t, this.scheduled() - this.t);
      if (!(h > 0)) h = Math.min(this.h, Math.max(tLimit - this.t, 1e-9));
      const cs = this.cs(), Mf = tt => this.neural.M(tt), t0 = this.t, x0 = this.x;
      let x1 = MOD.rk4(cs, t0, x0, h, Mf), hit = null;
      for (const p of this.preds(cs)) {
        if (p.f(t0, x0) || !p.f(t0 + h, x1)) continue;
        let lo = 0, hi = h;
        for (let k = 0; k < 48; k++) { const mid = (lo + hi) / 2; if (p.f(t0 + mid, MOD.rk4(cs, t0, x0, mid, Mf))) hi = mid; else lo = mid; }
        if (!hit || hi < hit.h) hit = {id: p.id, h: hi};
      }
      if (hit) { h = hit.h; x1 = MOD.rk4(cs, t0, x0, h, Mf); }
      /* adım integralleri: ∫Q dt = Δx (RK4 ağırlıkları); ayrıca uç noktalardan yamuk kuralı karşılaştırma için */
      const q0 = this.qNow, M1 = this.neural.M(t0 + h), q1 = MOD.flow(cs, t0 + h, x1, M1), dx = x1 - x0;
      if (!fin(x1) || !fin(q1)) { this.state = 'INVALID'; this.log('invalid', {why: 'nonfinite'}); return; }
      if (dx >= 0 && q0 >= 0 && q1 >= 0) this.I.pos += dx;
      else if (dx <= 0 && q0 <= 0 && q1 <= 0) this.I.neg -= dx;
      else { const tr = (q0 + q1) / 2 * h; const pp = (Math.max(q0, 0) + Math.max(q1, 0)) / 2 * h, nn = (Math.min(q0, 0) + Math.min(q1, 0)) / 2 * h; const sc = tr ? dx / tr : 0; this.I.pos += pp * sc; this.I.neg -= nn * sc; }
      this.residual.trap += (q0 + q1) / 2 * h - dx;
      this.t = t0 + h; this.x = x1; this.qPrev = q0; this.qNow = q1;
      this.pawNow = MOD.paw(cs, this.t, x1, M1, q1); this.Mnow = M1;
      if (this.br) { const b = this.br; b.pawInt += h * this.pawNow; if (this.pawNow > b.Ppeak) b.Ppeak = this.pawNow; if (M1 > b.Mmax) b.Mmax = M1; if (this.state === 'INSP_PC' && q1 > b.Qpeak) b.Qpeak = q1; if (this.state === 'INSP_PC' && q1 < -1e-6 && !b.negQ) { b.negQ = true; this.log('neg_flow_insp', {breath: b.id}); } }
      if ((this.state === 'HOLD_I' || this.state === 'HOLD_E') && M1 > this.holdM) this.holdM = M1;
      this.process(hit && hit.id);
      this.sample();
    }
    sample() {
      const ph = PH[this.state] ?? 0, bt = this.br ? BT[this.br.kind] || 0 : 0;
      const vol = this.x - this.xRef;
      this.ring.push({t: this.t, paw: this.pawNow, q: this.qNow, vol, M: this.Mnow || 0, x: this.x, palv: this.x / this.P.C - (this.Mnow || 0), ph, bt, gap: this.gapNext});
      this.gapNext = false;
      if (!this.loop.length || this.t - this.loop[this.loop.length - 1][3] >= .004) this.loop.push([this.pawNow, vol, this.qNow, this.t]);
    }

    /* ---------- Olay işleme (öncelik: geçersiz → Pmax → bekletme/Ti/akım sonu → akım siklusu → tetikleme → ayar) ---------- */
    process(hitId) {
      const t = this.t, cs = this.cs();
      /* nöral saat */
      for (const ev of this.neural.tick(t, EPS)) {
        if (ev.type === 'neural_start') { this.efforts.push({id: ev.id, t0: t, Mmax: ev.Mmax}); if (this.efforts.length > 400) this.efforts.shift(); }
        if (ev.type === 'neural_end') { this.lastNeuralEnd = ev; const w = this.efforts.find(e => e.id === ev.id); if (w) { w.ti = ev.ti; w.tEnd = ev.t0 + ev.ti; } if (ev.Mmax > 0) this.windows.push({id: ev.id, t0: ev.t0, tEnd: ev.t0 + ev.ti, check: ev.t0 + ev.ti + CLASS_LAG}); }
        if (ev.type === 'effort_applied') this.log('effort_applied', {p: clone(this.neural.p)});
      }
      this.classify(t);
      /* süzgeç bakımı: koşul bozulursa süzgeç sıfırlanır */
      const keep = (k, ok) => { if (this.filt[k] && !ok) this.filt[k] = null; };
      keep('trig', this.canPatientTrigger() && this.trigCond(cs, t, this.x));
      keep('cyc', this.cycActive() && this.cycCond(cs, t, this.x));
      if (this.mode === 'CPAP' && this.state === 'EXP') { keep('cin', !this.cpapIn && this.qNow >= CPAP_Q); keep('cout', this.cpapIn && this.qNow <= -CPAP_Q); }
      /* süzgeç başlangıcı: koşulun ilk doğrulandığı an */
      if (!this.filt.trig && this.canPatientTrigger() && this.trigCond(cs, t, this.x)) this.filt.trig = {t0: t};
      if (!this.filt.cyc && this.cycActive() && this.cycCond(cs, t, this.x) && (this.qNow < this.qPrev || this.qNow <= 0)) this.filt.cyc = {t0: t, why: this.qNow <= 0 ? 'flow_nonpositive' : 'flow'};
      if (this.mode === 'CPAP' && this.state === 'EXP') {
        if (!this.cpapIn && !this.filt.cin && this.qNow >= CPAP_Q) this.filt.cin = {t0: t, Ipos: this.I.pos, Ineg: this.I.neg, x: this.x, q: this.qNow, ri: this.ring.i};
        if (this.cpapIn && !this.filt.cout && this.qNow <= -CPAP_Q) this.filt.cout = {t0: t, Ipos: this.I.pos, Ineg: this.I.neg};
      }
      const due = v => t >= v - EPS;
      switch (this.state) {
        case 'INSP_VC': {
          const c = this.ctl();
          if (this.pawNow >= this.S.Pmax) { this.br.pressureLimited = true; this.log('pressure_limit', {breath: this.br.id, Paw: this.pawNow, Pmax: this.S.Pmax}); this.endInsp('pmax'); }
          else if (due(this.br.tStart + c.Tflow)) { this.br.pawFlowEnd = this.pawNow; this.br.Mflow = this.br.Mmax; this.toHoldOrExp('flow_end', c.pause); }
          break;
        }
        case 'INSP_PC': {
          const c = this.ctl(), tb = t - this.br.tStart;
          if (c.kind === 'pc') { if (due(this.br.tStart + c.Ti)) this.toHoldOrExp('ti', 0); }
          else if (due(this.br.tStart + c.tmax)) this.endInsp('ti_max');
          else if (this.filt.cyc && due(this.filt.cyc.t0 + CYC_FILT)) this.endInsp(this.filt.cyc.why);
          void tb;
          break;
        }
        case 'HOLD_I': if (due(this.holdEnd)) this.endHoldI(); break;
        case 'HOLD_E': if (due(this.holdEnd)) this.endHoldE(); break;
        case 'EXP': this.expTick(t); break;
      }
    }
    expTick(t) {
      const due = v => t >= v - EPS;
      if (this.pending && (this.mode === 'PSV' || this.mode === 'CPAP')) this.applyPending();
      if (this.mode === 'CPAP') {
        if (this.filt.cin && due(this.filt.cin.t0 + CPAP_FILT)) this.cpapStart(this.filt.cin);
        if (this.filt.cout && due(this.filt.cout.t0 + CPAP_FILT)) this.cpapEnd(this.filt.cout);
      }
      const timeDue = this.mandatory() && due(Math.max(this.nextMand(), this.armT));
      const patDue = this.filt.trig && due(this.filt.trig.t0 + TRIG_FILT) && this.mode !== 'CPAP';
      /* ekspiratuvar bekletme: bir sonraki soluk başlayacağı anda (zaman veya hasta tetiği) devre kapanır; hasta eforu varsa ölçüm geçersiz olur */
      if ((timeDue || patDue) && this.holdReq && (this.holdReq.kind === 'exp' || this.holdReq.kind === 'both') && !this.holdReq.eeDone) { this.startHoldE(); return; }
      if (timeDue || patDue) {
        const cause = timeDue && patDue ? 'time_and_patient' : timeDue ? 'time' : 'patient';
        this.startBreath(cause);
        return;
      }
      if ((this.mode === 'PSV' || this.mode === 'CPAP') && !this.apneaFlag && due(this.lastStart + this.S.apneaTime)) {
        this.apneaFlag = true; this.apneaAlarm = true; this.log('apnea', {since: this.lastStart, apneaTime: this.S.apneaTime});
        if (this.S.backupEnabled) { this.backup = true; this.cpapIn = false; this.filt.cin = this.filt.cout = null; this.log('backup_on', {p: clone(this.S.backupPC)}); this.startBreath('apnea_backup'); }
      }
    }

    /* ---------- Soluk başlangıcı / bitişi ---------- */
    closeBreath(t, snap) {
      const b = this.br; if (!b) return;
      b.tEnd = t; b.Te = b.tInspEnd != null ? t - b.tInspEnd : null;
      b.VTe = b.tInspEnd != null ? snap.Ineg - b.Ineg1 : null;
      b.flowAtNextStart = snap.q;
      b.xEnd = snap.x;
      b.PawMean = b.pawInt / Math.max(t - b.tStart, 1e-9);
      b.loop = this.loop; this.loop = [];
      this.loops.push({id: b.id, pts: b.loop, kind: b.kind}); if (this.loops.length > 6) this.loops.shift();
      this.breaths.push(b); if (this.breaths.length > 400) this.breaths.shift();
      this.br = null;
    }
    newBreath(t, cause, kind, snap) {
      this.closeBreath(t, snap);
      const id = (this.nB = (this.nB || 0) + 1);
      const ne = this.neural.cur && this.neural.cur.Mmax > 0 ? this.neural.cur.id : this.lastNeuralEnd && t - (this.lastNeuralEnd.t0 + this.lastNeuralEnd.ti) <= CLASS_LAG && this.lastNeuralEnd.Mmax > 0 ? this.lastNeuralEnd.id : null;
      this.br = {id, tStart: t, trigger: cause, kind, mode: this.mode, xStart: snap.x, Ipos0: snap.Ipos, Ineg0: snap.Ineg, Ppeak: -Infinity, pawInt: 0, Mmax: 0, Qpeak: 0,
        sVer: this.sVer, mVer: this.mVer, mechChanged: false, neuralId: ne, pressureLimited: false, ee: null, ei: null};
      this.lastStart = t; this.nextMandOverride = null; this.apneaFlag = false;
      /* apne alarmı yedek solukla değil, hastanın kendi soluğuyla (veya zorunlu soluklu moda geçişle) kalkar */
      if (kind !== 'backup') this.apneaAlarm = false;
      this.xRef = snap.x; this.gapNext = true;
      this.log('breath_start', {breath: id, cause, kind, mode: this.mode});
      return this.br;
    }
    startBreath(cause) {
      const t = this.t, c = this.ctl();
      const kind = this.backup ? (cause === 'patient' ? 'assist' : 'backup') : this.mode === 'PSV' ? 'spont' : cause === 'patient' ? 'assist' : 'mand';
      const b = this.newBreath(t, cause, kind, {x: this.x, Ipos: this.I.pos, Ineg: this.I.neg, q: this.qNow});
      if (this.eeHold) { b.ee = this.eeHold; this.eeHold = null; }
      this.filt.trig = null; this.filt.cyc = null;
      this.state = c.kind === 'vc' ? 'INSP_VC' : 'INSP_PC';
      if (c.kind === 'vc') {
        /* başlangıçta sınır ihlali: Paw(t0) = x/C + Rin·Q − M */
        const p0 = this.x / this.P.C + this.P.Rin * c.Q - this.neural.M(t);
        this.pawNow = p0; this.qNow = c.Q;
        if (p0 >= this.S.Pmax) { b.pressureLimited = true; b.Ppeak = p0; this.log('pressure_limit', {breath: b.id, Paw: p0, Pmax: this.S.Pmax, atStart: true}); this.endInsp('pmax_at_start'); }
      } else {
        this.pawNow = this.S.PEEP; this.qNow = this.Qat(this.cs(), t, this.x);
      }
    }
    toHoldOrExp(cause, pause) {
      const hr = this.holdReq, wantI = hr && (hr.kind === 'insp' || (hr.kind === 'both' && hr.eeDone)) && this.mandatory() && this.br.kind !== 'spont';
      if (pause > 0 || wantI) {
        this.br.inspCause = cause; this.state = 'HOLD_I'; this.holdM = this.neural.M(this.t);
        this.holdManual = !!wantI; this.holdEnd = this.t + (wantI ? Math.max(HOLD_T, pause) : pause);
        this.holdStart = this.t; this.holdMech = this.mVer;
        this.pawNow = this.x / this.P.C - this.neural.M(this.t); this.qNow = 0;
        this.log('hold_start', {kind: 'insp', manual: this.holdManual, breath: this.br.id});
      } else this.endInsp(cause);
    }
    endHoldI() {
      const b = this.br, M = this.neural.M(this.t);
      const rec = {kind: 'insp', t: this.t, breath: b.id, Paw: this.x / this.P.C - M, x: this.x, VT: this.I.pos - b.Ipos0, Mmax: this.holdM, passive: this.holdM === 0 && M === 0,
        manual: this.holdManual, sVer: this.sVer, mVer: this.mVer, mechChanged: this.holdMech !== this.mVer || b.mechChanged, mode: this.mode, Qset: this.mode === 'VC-AC' ? this.ctl().Q : null,
        pawFlowEnd: b.pawFlowEnd ?? null, Mflow: b.Mflow ?? null, settled: null};
      b.ei = rec; this.holds.push(rec); if (this.holds.length > 50) this.holds.shift();
      this.log('hold_end', {kind: 'insp', breath: b.id, passive: rec.passive});
      if (this.holdManual) {
        if (this.holdReq && this.holdReq.kind !== 'exp') this.holdReq = null;
        const c = this.ctl(); const ti = c.kind === 'vc' ? c.Tflow + c.pause : c.Ti;
        this.endInsp(b.inspCause || 'hold_end');
        this.nextMandOverride = this.t + Math.max(60 / c.RR - ti, REFRACT);
      } else this.endInsp(b.inspCause === 'flow_end' ? 'pause_end' : b.inspCause);
    }
    startHoldE() {
      this.state = 'HOLD_E'; this.holdM = this.neural.M(this.t); this.holdEnd = this.t + HOLD_T; this.holdStart = this.t; this.holdMech = this.mVer;
      this.filt.trig = null; this.pawNow = this.x / this.P.C - this.neural.M(this.t); this.qNow = 0;
      this.log('hold_start', {kind: 'exp'});
    }
    endHoldE() {
      const M = this.neural.M(this.t);
      const rec = {kind: 'exp', t: this.t, Paw: this.x / this.P.C - M, x: this.x, Mmax: this.holdM, passive: this.holdM === 0 && M === 0, PEEP: this.S.PEEP, sVer: this.sVer, mVer: this.mVer, mechChanged: this.holdMech !== this.mVer, manual: true};
      this.holds.push(rec); if (this.holds.length > 50) this.holds.shift();
      this.log('hold_end', {kind: 'exp', passive: rec.passive});
      if (this.holdReq && this.holdReq.kind === 'both') this.holdReq.eeDone = true; else this.holdReq = null;
      this.eeHold = rec; this.state = 'EXP';
      this.startBreath('time');
      if (this.br) rec.breath = this.br.id;
    }
    endInsp(cause) {
      const b = this.br, t = this.t;
      b.tInspEnd = t; b.cycle = cause; b.Ti = t - b.tStart; b.VTi = this.I.pos - b.Ipos0; b.Ineg1 = this.I.neg;
      if (b.neuralId != null && (b.kind === 'assist' || b.kind === 'spont' || b.trigger === 'time_and_patient')) {
        const e = this.efforts.find(w => w.id === b.neuralId); if (e) { const end = e.t0 + (e.ti ?? this.neural.p.ti); b.cycleOffset = t - end; b.neuralEnd = end; b.neuralStart = e.t0; }
      }
      this.log('insp_end', {breath: b.id, cause, VTi: b.VTi, Ti: b.Ti});
      this.state = 'EXP'; this.tExp = t; this.armT = t + REFRACT; this.filt.cyc = null; this.filt.trig = null;
      this.pawNow = MOD.paw(this.cs(), t, this.x, this.neural.M(t), this.qNow = this.Qat(this.cs(), t, this.x));
      if (this.backupReturn) { this.backupReturn = false; this.backup = false; this.lastStart = t; this.apneaFlag = false; this.log('backup_off', {}); }
      this.applyPending();
    }
    /* CPAP: akım geçişinden soluk ayrımı (başlangıç zamanı, koşulun ilk doğrulandığı an) */
    cpapStart(f) {
      const b = this.newBreath(f.t0, 'spont_flow', 'spont', {x: f.x, Ipos: f.Ipos, Ineg: f.Ineg, q: f.q});
      b.Ppeak = this.pawNow; this.cpapIn = true; this.filt.cin = null;
      /* süzgeç süresindeki örneklerin hacmini yeni başlangıca göre yeniden yaz */
      const R = this.ring; for (let k = 0, i = f.ri; k < R.n && i !== R.i; k++, i = (i + 1) % R.n) { R.vol[i] = R.x[i] - f.x; R.gap[i] = i === f.ri ? 1 : 0; }
      this.gapNext = false;
    }
    cpapEnd(f) {
      const b = this.br; this.filt.cout = null; this.cpapIn = false; if (!b) return;
      b.tInspEnd = f.t0; b.cycle = 'flow_reversal'; b.Ti = f.t0 - b.tStart; b.VTi = f.Ipos - b.Ipos0; b.Ineg1 = f.Ineg;
      this.log('insp_end', {breath: b.id, cause: 'flow_reversal', VTi: b.VTi, Ti: b.Ti, at: f.t0});
    }

    /* ---------- Sınıflandırma: tetiklenmeyen efor / çakışma / çift tetikleme ---------- */
    classify(t) {
      if (!this.windows.length) return;
      const keep = [];
      for (const w of this.windows) {
        if (t < w.check - EPS) { keep.push(w); continue; }
        const all = this.breaths.concat(this.br ? [this.br] : []);
        if (this.mode === 'CPAP' && !this.backup) { this.setEffort(w, 'spontaneous'); continue; }
        const pt = all.filter(b => b.tStart >= w.t0 - EPS && b.tStart <= w.check + EPS && (b.trigger === 'patient' || b.trigger === 'time_and_patient'));
        const sameNeural = all.filter(b => b.neuralId === w.id && (b.trigger === 'patient' || b.trigger === 'time_and_patient'));
        if (pt.length) {
          this.setEffort(w, 'triggered', {delay: pt[0].tStart - w.t0, breath: pt[0].id});
          if (sameNeural.length >= 2) this.log('double_trigger', {neural: w.id, breaths: sameNeural.map(b => b.id)});
        } else {
          const overlap = all.some(b => b.tStart < w.tEnd && (b.tInspEnd == null ? true : b.tInspEnd > w.t0) && b.tStart <= w.tEnd);
          this.setEffort(w, overlap ? 'overlap' : 'ineffective');
          this.log(overlap ? 'effort_overlap' : 'ineffective_effort', {neural: w.id, t0: w.t0});
        }
      }
      this.windows = keep;
    }
    setEffort(w, cls, o = {}) { const e = this.efforts.find(x => x.id === w.id); if (e) Object.assign(e, {cls}, o); }

    /* ---------- Kullanıcı işlemleri ---------- */
    act(type, data) { this.actions.push({t: this.t, type, data: clone(data ?? null)}); }
    /* Ayar paketi: doğrulanır, bekletilir, sonraki ekspirasyon başlangıcında atomik uygulanır */
    request(bundle) {
      const next = Object.assign(clone(this.pending || this.S), clone(bundle));
      const errs = validate(next, null);
      if (errs.length) { this.log('settings_rejected', {errors: errs}); return errs; }
      this.act('request', bundle);
      this.pending = next; this.log('settings_requested', {diff: diff(this.S, next)});
      if (this.state === 'EXP' && (this.mode === 'PSV' || this.mode === 'CPAP')) this.applyPending();
      return [];
    }
    applyPending() {
      if (!this.pending) return;
      const old = this.S, nw = this.pending; this.pending = null;
      const d = diff(old, nw); if (!d.length) return;
      const modeChange = old.mode !== nw.mode;
      this.S = nw; this.sVer++;
      if (modeChange) {
        this.filt = {trig: null, cyc: null, cin: null, cout: null}; this.cpapIn = false; this.nextMandOverride = null; this.apneaFlag = false;
        if (this.backup) { this.backup = false; this.backupReturn = false; }
        if (nw.mode === 'PSV' || nw.mode === 'CPAP') this.lastStart = this.t; else this.apneaAlarm = false;
      }
      this.log('settings_applied', {diff: d, modeChange});
    }
    /* Hasta: mekanik hemen, efor bir sonraki nöral başlangıçta */
    setPatient(p) {
      const next = Object.assign(clone(this.P), clone(p));
      const errs = validate(null, next); if (errs.length) { this.log('patient_rejected', {errors: errs}); return errs; }
      this.act('patient', p);
      const mech = MECH_KEYS.filter(k => k in p && p[k] !== this.P[k]), eff = EFFORT_KEYS.filter(k => k in p && p[k] !== this.P[k]);
      if (mech.length) {
        const pel0 = this.x / this.P.C;
        const d = mech.map(k => ({k, old: this.P[k], nw: next[k]}));
        mech.forEach(k => { this.P[k] = next[k]; });
        this.mVer++; if (this.br) this.br.mechChanged = true;
        this.updH();
        this.log('mechanics_change', {diff: d, x: this.x, Pel_old: pel0, Pel_new: this.x / this.P.C});
        /* devre akımı ve basıncı yeni mekanikle yeniden hesaplanır; x korunur */
        const cs = this.cs(); this.qNow = this.Qat(cs, this.t, this.x); this.pawNow = MOD.paw(cs, this.t, this.x, this.neural.M(this.t), this.qNow);
      }
      if (eff.length) { EFFORT_KEYS.forEach(k => { this.P[k] = next[k]; }); this.neural.request(this.P); this.log('effort_requested', {diff: eff.map(k => ({k, nw: next[k]}))}); }
      return [];
    }
    hold(kind) {
      if (!this.mandatory() || this.backup) { this.log('hold_unavailable', {kind, why: 'no_mandatory'}); return 'no_mandatory'; }
      if (this.holdReq) return 'busy';
      this.act('hold', kind);
      this.holdReq = {kind, t: this.t}; this.log('hold_requested', {kind}); return null;
    }
    endBackup() { if (!this.backup) return; this.act('endBackup'); this.backupReturn = true; this.log('backup_off_requested', {}); }
  }
  function diff(a, b) {
    const out = [];
    for (const k of ['mode', 'trigger_kind', 'backupEnabled', ...SET_KEYS]) if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) out.push({k, old: a[k], nw: b[k]});
    if (JSON.stringify(a.backupPC) !== JSON.stringify(b.backupPC)) out.push({k: 'backupPC', old: a.backupPC, nw: b.backupPC});
    return out;
  }
  /* Aynı başlangıç ve işlem kaydıyla yeniden oynat (deterministik) */
  function replay(init, actions, T) {
    const lab = new Lab(init);
    for (const a of actions) {
      lab.advance(a.t - lab.t);
      if (a.type === 'request') lab.request(a.data); else if (a.type === 'patient') lab.setPatient(a.data); else if (a.type === 'hold') lab.hold(a.data); else if (a.type === 'endBackup') lab.endBackup();
    }
    lab.advance(T - lab.t);
    return lab;
  }

  /* Ekran karesi başına simülasyon süresi: sekme uykusundan dönüşte dev adım atılmaz [U] */
  const frameStep = (wall, speed) => (Number.isFinite(wall) && wall > 0 ? Math.min(wall, .05) : 0) * speed;

  return {Lab, validate, parseNum, replay, frameStep, RANGE, MODES, PATIENT_KEYS, MECH_KEYS, EFFORT_KEYS, SET_KEYS, PH, BT, consts: {REFRACT, TRIG_FILT, CYC_FILT, CPAP_Q, CPAP_FILT, HOLD_T, CLASS_LAG}, VERSION: MOD.VERSION};
})();
if (typeof module !== 'undefined') module.exports = VLAB_CTRL;
