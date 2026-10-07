'use strict';
/* Mekanik Ventilasyon Atlası · ventilasyon fizik motoru
   Pasif/aktif tek bölmeli doğrusal model (iki bölmeli bağımsız akciğer seçeneğiyle):
     Paw + Pmus = V/C + R × akım          (Pmus: inspiratuvar kas yardımı, pozitif; içerik paketindeki işaret kuralı)
   V, gevşeme hacmine göre hacimdir; ekranda her inspirasyon başında sıfırlanan soluk hacmi gösterilir.
   Birimler: cmH₂O, L, L/s, s — gorseller/MODEL_NOTU.md ile aynı. İnertans, tüpün doğrusal olmayan direnci,
   heterojenlik ve recruitment yoktur. Bütün sayılar örnek model girdisidir; klinik hedef veya ayar önerisi değildir. */
const VENT = (() => {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const DT = .001;

  /* ---------- Hasta eforu: nöral döngü → Edi ve Pmus ---------- */
  class Effort {
    constructor(o = {}) { this.set(o); this.phase = 0; this.tn = 0; this.edi = 0; this.pm = 0; this.cycleT = 0; this.n = 0; this.amp = 1; }
    set(o) { Object.assign(this, {on: false, rate: 18, pmax: 6, ti: .9, ediPeak: 15, jitter: .06, periodic: 0, periodicT: 60, delayEdi: .06}, this._o || {}, o); this._o = Object.assign({}, this._o || {}, o); }
    step(dt, t) {
      if (!this.on) { this.edi *= Math.exp(-dt / .05); this.pm *= Math.exp(-dt / .12); return; }
      this.cycleT -= dt;
      if (this.cycleT <= 0) {
        const per = 60 / this.rate;
        this.cycleT = per * (1 + this.jitter * (Math.sin(this.n * 2.39) + Math.sin(this.n * .71)) / 2); this.tn = 0; this.n++;
        /* Periyodik solunum (crescendo–decrescendo, santral apne): genlik yavaş zarfla değişir */
        if (this.periodic) { const ph = (t % this.periodicT) / this.periodicT; this.amp = ph < .62 ? Math.pow(Math.sin(Math.PI * ph / .62), 1.4) : 0; } else this.amp = 1;
      }
      this.tn += dt;
      const x = this.tn / this.ti;
      const neural = x < 1 ? Math.sin(Math.PI * x * .5) * (x < .85 ? 1 : (1 - x) / .15 * .9 + .1) : 0;
      this.edi = this.ediPeak * this.amp * neural;
      /* Pmus: Edi'yi kısa gecikmeyle izler, nöral inspirasyondan sonra gevşer */
      const target = this.pmax * this.amp * neural;
      this.pm += (target - this.pm) * (1 - Math.exp(-dt / (target > this.pm ? .07 : .12)));
      this.neuralInsp = x < 1 && this.amp > .05;
    }
  }

  /* ---------- Akciğer bölmesi ---------- */
  class Lung {
    constructor(o) { this.R = o.R; this.C = o.C; this.Rexp = o.Rexp || o.R; this.V = (o.peep || 0) * o.C; this.flow = 0; this.Ku = o.Ku || 0; this.Vu = o.Vu || 9; this.fl = o.fl || 0; }
    /* Elastik basınç: doğrusal bölüm + (isteğe bağlı) üst hacimde sertleşme — aşırı distansiyon örneği için */
    el() { const x = this.V - this.Vu; return this.V / this.C + (this.Ku && x > 0 ? this.Ku * x * x : 0); }
    /* Ekspiratuvar direnç: akım kısıtlılığı örneğinde hacim azaldıkça artar (dinamik hava yolu kompresyonu, şematik) */
    rexp(vRef, vt) { if (!this.fl) return this.Rexp; const f = Math.min(1, Math.max(0, (this.V - vRef) / Math.max(vt, .05))); return this.Rexp * (1 + this.fl * Math.pow(1 - f, .7)); }
  }

  /* ---------- Simülasyon ---------- */
  class Sim {
    /* cfg: {patient:{R,C,Rexp,effort:{...},leak}, mode:{...}, lungs2?} */
    constructor(mode, patient = {}) {
      this.t = 0; this.mode = mode;
      this.pt = Object.assign({R: 10, C: .05, Rexp: null, leak: 0}, patient);
      this.lungs = [new Lung({R: this.pt.R, C: this.pt.C, Rexp: this.pt.Rexp, peep: mode.peep || 0, Ku: this.pt.Ku, Vu: this.pt.Vu, fl: this.pt.fl})];
      /* Devre ve ekspiratuvar valf direnci (Y-parçasındaki basıncın PEEP'e anında değil, akımla birlikte inmesi) */
      this.Rc = this.pt.Rcirc ?? this.pt.R * .3;
      this.fcmd = 0; this.fp = mode.peep || 0; this.ff = 0; this.measV = 0;
      if (patient.second) this.lungs.push(new Lung(Object.assign({peep: mode.peep || 0}, patient.second)));
      this.effort = new Effort(patient.effort || {});
      this.paw = mode.peep || 0; this.pext = 0; this.flowPt = 0; this.flowMeas = 0; this.leak = 0; this.leakEst = 0;
      this.phase = 'exp'; this.br = null; this.lastStart = -9; this.lastEnd = -9; this.vInspStart = this.lungs[0].V; this.dispV = 0;
      this.breaths = []; this.pbreaths = []; this.events = []; this.stats = {}; this.trend = [];
      this.target = {}; this.ramp = [];
      mode.init && mode.init(this);
    }
    get V() { return this.lungs.reduce((a, l) => a + l.V, 0); }
    get C() { return this.lungs.reduce((a, l) => a + l.C, 0); }
    /* Hasta parametresini yumuşak geçişle değiştir */
    setPatient(o, tau = 1.5) { for (const k in o) { if (k === 'effort') { this.effort.set(o.effort); continue; } this.ramp.push({k, to: o[k], tau}); } }
    applyRamps(dt) {
      this.ramp = this.ramp.filter(r => {
        const L = this.lungs[r.lung || 0];
        const obj = ['R', 'C', 'Rexp'].includes(r.k) ? L : this.pt;
        const cur = obj[r.k] ?? r.to; const nv = cur + (r.to - cur) * (1 - Math.exp(-dt / r.tau)); obj[r.k] = nv;
        if (r.k === 'R' && !this.pt.RexpSet) L.Rexp = nv;
        return Math.abs(nv - r.to) > Math.abs(r.to) * 1e-3 + 1e-6;
      });
    }

    /* İnspirasyonu başlat. b: {kind:'vc'|'pc'|'ps'|'pav'|'nava'|'vaps'|'jet', type:'mand'|'assist'|'spont', trig:'time'|'pat', ...} */
    startBreath(b) {
      this.phase = 'insp'; this.br = Object.assign({t0: this.t, vi: 0, peak: -1e9, flowPeak: 0, ediPeak: 0, pStart: this.paw}, b);
      /* Ters tetikleme modeli: makine soluğu hasta eforunu belirli gecikmeyle sürükler */
      if (this.effort.on && this.effort.entrain && b.trig === 'time') this.effort.cycleT = this.effort.entrain;
      this.lastStart = this.t; if (!this.mode.keepRef || b.type !== 'spont') { this.vInspStart = this.V; this.measV = 0; }
      this.events.push({t: this.t, type: b.type, trig: b.trig});
      if (this.events.length > 400) this.events.shift();
    }
    endBreath() {
      const b = this.br; if (!b) return;
      b.ti = this.t - b.t0; b.vt = this.V - this.vInspStart; if (b.vt > .002) this.lastVt = b.vt;
      this.phase = 'exp'; this.lastEnd = this.t; this.expStartV = this.V;
      this.breaths.push(b); if (this.breaths.length > 200) this.breaths.shift();
      this.br = null;
      this.mode.onEnd && this.mode.onEnd(this, b);
    }
    /* Ekspiratuvar basınç (PEEP veya iki düzeyli modda alt/üst düzey) */
    base() { return this.mode.base ? this.mode.base(this) : (this.mode.peep || 0); }

    step(dt) {
      const m = this.mode, ef = this.effort, L0 = this.lungs[0];
      this.applyRamps(dt);
      ef.step(dt, this.t);
      const pmus = ef.pm;
      let paw = null, flowCmd = null;

      if (m.tick) m.tick(this, dt);

      if (this.phase === 'insp') {
        const b = this.br, tb = this.t - b.t0;
        switch (b.kind) {
          case 'vc': {
            const tf = b.tflow;
            if (tb < tf) flowCmd = b.shape === 'decel' ? b.fpk * (1 - .75 * tb / tf) : b.flow;
            else if (tb < tf + (b.pause || 0)) flowCmd = 0;
            else { this.endBreath(); }
            break;
          }
          case 'fcv': {                       // akım kontrollü: sabit akımla doldur, ekspirasyonda da sabit akımla boşalt
            if (this.V - this.vInspStart < b.vt) flowCmd = b.flow; else this.endBreath();
            break;
          }
          case 'pc': case 'ps': case 'vaps': {
            const top = b.p, rise = b.rise ?? .1;
            paw = b.pStart + (top - b.pStart) * (rise > 0 ? clamp(tb / rise, 0, 1) : 1);
            if (b.kind === 'pc' && tb >= b.ti) { this.endBreath(); paw = null; }
            else if (b.kind !== 'pc' && tb > .15 && this.flowPt < b.flowPeak * b.ets) {
              if (b.kind === 'vaps' && this.V - this.vInspStart < b.vt) { b.kind = 'vc'; b.tflow = 9; b.flow = b.minFlow; b.tVol = b.vt; }
              else { this.endBreath(); paw = null; }
            }
            else if (b.kind !== 'pc' && tb > (b.tiMax || 2.5)) { this.endBreath(); paw = null; }
            break;
          }
          case 'pav': {                        // destek = kazanç × (elastik + rezistif yük); akım eşiğiyle biter
            const vt = this.V - this.vInspStart;
            paw = this.base() + b.gainV * vt / this.C + b.gainF * this.pt.R * Math.max(this.flowPt, 0);
            paw = Math.min(paw, b.pmax || 40);
            if (tb > .15 && this.flowPt < b.flowPeak * .25) { this.endBreath(); paw = null; }
            break;
          }
          case 'nava': {                       // destek = NAVA düzeyi × Edi; Edi tepe değerin %70'ine düşünce biter
            paw = this.base() + b.level * ef.edi;
            if (ef.edi > b.ediPeak) b.ediPeak = ef.edi;
            if (tb > .1 && ef.edi < b.ediPeak * .7) { this.endBreath(); paw = null; }
            break;
          }
          case 'jet': {
            if (tb < b.ti) paw = b.p; else { this.endBreath(); }
            break;
          }
        }
        if (b && b.kind === 'vc' && b.tVol && this.V - this.vInspStart >= b.tVol) { this.endBreath(); flowCmd = null; }
      }
      if (this.phase === 'exp') {
        const b = this.breaths[this.breaths.length - 1];
        if (b && b.kind === 'fcv' && this.V > this.expStartV - b.vt + 1e-4 && this.t - this.lastEnd < 4) flowCmd = -b.flow;
        else paw = this.base();
      }

      /* Kaçak (NIV): Q = k·√Paw, ölçülen akıma eklenir; tahmini kaçak yavaş izler */
      /* Hareket denklemi */
      if (flowCmd != null) {
        /* akım valfi komutu ~25 ms'de izler (köşeler gerçek cihazdaki gibi yuvarlanır) */
        this.fcmd += (flowCmd - this.fcmd) * (1 - Math.exp(-dt / .025));
        const fc = this.fcmd;
        L0.flow = fc; L0.V += fc * dt;
        this.paw = L0.el() + (fc >= 0 ? L0.R : L0.Rexp) * fc - pmus;
        for (let i = 1; i < this.lungs.length; i++) { const L = this.lungs[i]; L.flow = (this.paw + pmus - L.el()) / L.R; L.V += L.flow * dt; }
      } else {
        /* Taban fazında (PEEP/CPAP/alt düzey) Y-parçası basıncı devre direnciyle akımı izler; kontrollü inspirasyonda ventilatör basıncı doğrudan tutar */
        const circ = this.phase === 'exp' && !m.noCirc && this.lungs.length === 1;
        const drive = paw - this.pext, vRef = (m.peep || 0) * L0.C, vt = this.lastVt || .4;
        for (const L of this.lungs) {
          const f = (drive + pmus - L.el()); const R = f >= 0 ? L.R : L.rexp(vRef, vt);
          /* basınç tetiklemesinde inspiratuvar valf kapalıdır: hasta çektikçe Y-parçası basıncı PEEP'in altına iner */
          const rc = circ ? (f > 0 && m.trigP ? 40 : this.Rc) : 0;
          L.flow = f / (R + rc); L.V += L.flow * dt;
        }
        this.paw = circ ? paw - (L0.flow > 0 && m.trigP ? 40 : this.Rc) * L0.flow : paw;
        this.fcmd = L0.flow;
      }
      this.flowPt = this.lungs.reduce((a, l) => a + l.flow, 0);
      this.leak = this.pt.leak ? this.pt.leak * Math.sqrt(Math.max(this.paw, 0)) : 0;
      this.leakEst += (this.leak - this.leakEst) * (1 - Math.exp(-dt / (this.pt.leakTau || 4)));
      this.flowMeas = this.flowPt + (m.showLeak || this.pt.measVol ? this.leak : 0);
      /* Sekresyon / devrede su: akımla büyüyen testere dişi titreşim (şematik) */
      if (this.pt.secr) { const sw = ((this.t * 11) % 1) - .5, k = this.pt.secr * Math.min(1, Math.abs(this.flowPt) * 2); this.flowMeas += sw * k; this.pawX = sw * k * 6; } else this.pawX = 0;
      /* Ekrandaki hacim: ölçülen akımın integrali (kaçakta soluk sonunda sıfıra dönmez); aksi hâlde hasta hacmi */
      this.measV += this.flowMeas * dt;
      this.dispV = this.pt.measVol ? this.measV : this.V - this.vInspStart;
      /* Sensör/ekran süzgeci (~12 ms) */
      const kf = 1 - Math.exp(-dt / .012);
      this.fp += (this.paw + this.pawX - this.fp) * kf; this.ff += (this.flowMeas - this.ff) * kf;
      this.pmean = this.pmean == null ? this.paw : this.pmean + (this.paw - this.pmean) * dt / 4;

      /* Hasta akımından soluk sayımı (tetiklenen ventilatör soluğu olmayan modlar için: CPAP, osilasyon, negatif basınç) */
      if (this.flowPt > .02 && !this._pin) { this._pin = true; this._pv0 = this.V; this._pt0 = this.t; }
      else if (this.flowPt < -.02 && this._pin) { this._pin = false; this.pbreaths.push({t0: this._pt0, vt: this.V - this._pv0}); if (this.pbreaths.length > 300) this.pbreaths.shift(); }
      if (this.br) { const b = this.br; if (this.paw > b.peak) b.peak = this.paw; if (this.flowPt > b.flowPeak) b.flowPeak = this.flowPt; }

      /* Hasta tetiklemesi: tahmini hasta akımı eşiği aştığında (kaçak tahmini çıkarılır) */
      if (this.phase === 'exp' && m.onTrigger && this.t - this.lastEnd > (m.refractory ?? .25)) {
        const sensed = this.flowPt + this.leak - this.leakEst;
        if (m.trigP ? this.base() - this.paw > m.trigP : sensed > (m.trig ?? .05)) m.onTrigger(this);
      }
      this.t += dt;
    }

    /* dt'yi küçük adımlarla ilerlet; her örnekleme aralığında çıktı ver */
    run(seconds, every, cb) {
      let acc = 0;
      const n = Math.round(seconds / DT);
      for (let i = 0; i < n; i++) {
        this.step(DT); acc += DT;
        if (acc >= every - 1e-9) { acc -= every; cb && cb(this.sample()); }
      }
    }
    sample() {
      const L = this.lungs;
      return {t: this.t, paw: this.fp, flow: this.ff, pawRaw: this.paw, vol: this.dispV, V: this.V, pmus: this.effort.pm, edi: this.effort.edi,
        palv: L[0].el() - this.effort.pm, pext: this.pext, phase: this.phase, type: this.br ? this.br.type : null,
        flowL: L.map(l => l.flow), volL: L.map(l => l.V), leak: this.leak};
    }
  }

  /* =====================================================================
     Mod yapı taşları
     ===================================================================== */
  const vcBreath = (s, type, trig) => {
    const tflow = s.ti - (s.pause || 0), flow = s.vt / tflow;
    return {kind: 'vc', type, trig, flow, fpk: flow / .625, tflow, pause: s.pause || 0, shape: s.shape};
  };
  const pcBreath = (s, sim, type, trig, p) => ({kind: 'pc', type, trig, p: sim.base() + (p ?? s.pinsp), ti: s.ti, rise: s.rise ?? .08});
  const psBreath = (s, sim, type = 'spont', p) => ({kind: 'ps', type, trig: 'pat', p: sim.base() + (p ?? s.ps), rise: s.rise ?? .1, ets: s.ets ?? .25, tiMax: s.tiMax || 2});

  /* Zaman tetiklemeli zorunlu soluk zamanlayıcısı (A/C ve SIMV ortak) */
  function timer(sim, rate) {
    const per = 60 / rate;
    if (sim.phase === 'exp' && sim.t - sim.lastStart >= per - 1e-9) return true;
    return false;
  }

  const F = {};
  /* A/C: zaman ve hasta tetiklemeli, her soluk aynı zorunlu soluk */
  F.ac = (s, make) => ({
    peep: s.peep, trig: s.trig ?? .05, refractory: s.refr ?? .3,
    tick(sim) { if (timer(sim, s.rate)) sim.startBreath(make(sim, 'mand', 'time')); },
    onTrigger(sim) { if (s.noAssist) return; sim.startBreath(make(sim, 'assist', 'pat')); },
    onEnd: s.onEnd
  });
  /* SIMV: her pencerede ilk hasta tetiklemesi senkronize zorunlu soluk; diğerleri PS; tetikleme yoksa pencere sonunda zaman tetiklemesi */
  F.simv = (s, make) => {
    let win = -1, used = false;
    return {
      peep: s.peep, trig: s.trig ?? .05, refractory: .3,
      tick(sim) {
        const per = 60 / s.rate, w = Math.floor(sim.t / per);
        if (w !== win) { if (!used && win >= 0 && sim.phase === 'exp') { sim.startBreath(make(sim, 'mand', 'time')); } win = w; used = false; }
      },
      onTrigger(sim) { if (!used) { used = true; sim.startBreath(make(sim, 'assist', 'pat')); } else sim.startBreath(psBreath(s, sim)); },
      onEnd: s.onEnd
    };
  };
  /* Spontan: yalnız hasta tetiklemesi; isteğe bağlı apne yedeği */
  F.spont = (s, make) => ({
    peep: s.peep, trig: s.trig ?? .05, refractory: s.refr ?? .3, showLeak: s.showLeak,
    tick(sim) { if (s.backup && timer(sim, s.backup) && sim.t - sim.lastEnd > 60 / s.backup - (sim.br ? 0 : .8)) sim.startBreath(s.backupMake ? s.backupMake(sim) : pcBreath(s, sim, 'mand', 'time', s.backupP)); },
    onTrigger(sim) { sim.startBreath(make(sim)); },
    onEnd: s.onEnd
  });
  /* Hacim hedefli adaptif basınç: önceki solukların VT'sine göre sonraki basıncı adım adım ayarla */
  const adapt = (s, key, lo, hi, maxStep, every = 1) => {
    let n = 0;
    return (sim, b) => {
      if (b.trig === 'probe') return;
      if (++n % every) return;
      const err = s.vtTarget - b.vt, C = Math.max(sim.C, .005);
      s[key] = clamp(s[key] + clamp(err / C * .6, -maxStep, maxStep), lo, hi);
    };
  };

  /* =====================================================================
     Model kayıtları: her kart için kontrol mantığı ve örnek girdiler
     ===================================================================== */
  const R = {};
  const reg = (id, fn) => { R[id] = fn; };

  reg('vc-cmv', (s = {}) => { s = Object.assign({peep: 5, rate: 15, vt: .4, ti: 1, pause: .2}, s); return F.ac(s, (sim, type, trig) => vcBreath(s, type, trig)); });
  reg('pc-cmv', (s = {}) => { s = Object.assign({peep: 5, rate: 15, pinsp: 10, ti: 1}, s); return F.ac(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); });
  reg('vc-simv', (s = {}) => { s = Object.assign({peep: 5, rate: 8, vt: .4, ti: 1, pause: .1, ps: 6}, s); return F.simv(s, (sim, type, trig) => vcBreath(s, type, trig)); });
  reg('pc-simv', (s = {}) => { s = Object.assign({peep: 5, rate: 8, pinsp: 12, ti: 1, ps: 6}, s); return F.simv(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); });
  reg('prvc', (s = {}) => {
    s = Object.assign({peep: 5, rate: 15, vtTarget: .4, pinsp: 5, ti: 1, pmax: 30}, s);
    let probe = 1;
    const st = F.ac(s, (sim, type, trig) => probe-- > 0 ? Object.assign(vcBreath({vt: s.vtTarget, ti: s.ti, pause: .2}, type, 'probe'), {probe: true}) : pcBreath(s, sim, type, trig));
    st.onEnd = adapt(s, 'pinsp', 2, s.pmax - s.peep, 3); st.state = s; return st;
  });
  reg('prvc-simv', (s = {}) => {
    s = Object.assign({peep: 5, rate: 8, vtTarget: .4, pinsp: 6, ti: 1, ps: 6, pmax: 30}, s);
    const ad = adapt(s, 'pinsp', 2, s.pmax - s.peep, 3);
    const st = F.simv(s, (sim, type, trig) => pcBreath(s, sim, type, trig));
    st.onEnd = (sim, b) => { if (b.kind === 'pc') ad(sim, b); }; st.state = s; return st;
  });
  reg('psv', (s = {}) => { s = Object.assign({peep: 5, ps: 8, ets: .25, rise: .1}, s); const m = F.spont(s, sim => psBreath(s, sim)); if (s.trigP) m.trigP = s.trigP; return m; });
  reg('cpap', (s = {}) => { s = Object.assign({peep: 6}, s); return F.spont(s, sim => ({kind: 'ps', type: 'spont', trig: 'pat', p: sim.base() + .4, rise: .05, ets: .05, tiMax: 3})); });
  reg('volume-support', (s = {}) => {
    s = Object.assign({peep: 5, ps: 4, vtTarget: .45, ets: .25}, s);
    const st = F.spont(s, sim => psBreath(s, sim)); st.onEnd = adapt(s, 'ps', 1, 25, 3); st.state = s; return st;
  });
  /* İki basınç düzeyi: zamanla değişen taban basınç; hasta iki düzeyde de solur (alt düzeyde isteğe bağlı PS) */
  const twoLevel = s => ({
    peep: s.plow, trig: .06, refractory: .3, keepRef: true, state: s, twoLevel: true,
    base(sim) { const per = s.thigh + s.tlow, ph = sim.t % per; const hi = ph < s.thigh; sim.hiLevel = hi; return hi ? s.phigh : s.plow; },
    tick(sim) {
      const per = s.thigh + s.tlow, ph = sim.t % per, hi = ph < s.thigh;
      if (sim._hi !== hi) { sim._hi = hi; sim.events.push({t: sim.t, type: hi ? 'mand' : 'rel', trig: 'time'}); if (hi) sim.vInspStart = sim.expStartV ?? sim.V; }
      if (!hi && sim.phase === 'exp') sim.expStartV = sim.V;
    },
    onTrigger(sim) { if (s.psLow && !sim.hiLevel) sim.startBreath(psBreath({ps: s.psLow, ets: .25}, sim)); else { sim.startBreath({kind: 'ps', type: 'spont', trig: 'pat', p: sim.base() + .3, rise: .05, ets: .05, tiMax: 2}); } }
  });
  reg('bilevel', (s = {}) => twoLevel(Object.assign({plow: 5, phigh: 15, thigh: 1.6, tlow: 2.4, psLow: 6}, s)));
  reg('aprv', (s = {}) => twoLevel(Object.assign({plow: 0, phigh: 20, thigh: 4.5, tlow: .5}, s)));
  reg('mmv', (s = {}) => {
    s = Object.assign({peep: 5, ps: 6, mvTarget: 6, vt: .45, ti: 1}, s);
    /* Dakika ventilasyonu hareketli ortalaması hedefin altındaysa zorunlu soluk ekle */
    return {
      peep: s.peep, trig: .05, refractory: .3,
      tick(sim) {
        const win = 20, recent = sim.breaths.filter(b => b.t0 > sim.t - win), mv = recent.reduce((a, b) => a + b.vt, 0) * 60 / Math.min(win, Math.max(sim.t, 1));
        sim.stats.mmv = mv;
        if (sim.phase === 'exp' && mv < s.mvTarget && sim.t - sim.lastStart > 60 / 14 && sim.t > 3) sim.startBreath(vcBreath(s, 'mand', 'time'));
      },
      onTrigger(sim) { sim.startBreath(psBreath(s, sim)); }
    };
  });
  reg('pav-plus', (s = {}) => {
    s = Object.assign({peep: 5, gain: .6, probeEvery: 8}, s);
    let n = 0;
    return Object.assign(F.spont(s, sim => ({kind: 'pav', type: 'spont', trig: 'pat', gainV: s.gain, gainF: s.gain, pmax: 35})), {
      onEnd(sim, b) { if (++n % s.probeEvery === 0) { sim.probeUntil = sim.t; } }
    });
  });
  reg('pps', (s = {}) => { s = Object.assign({peep: 5, va: .5, fa: .3}, s); return F.spont(s, sim => ({kind: 'pav', type: 'spont', trig: 'pat', gainV: s.va, gainF: s.fa, pmax: 35})); });
  /* NAVA: tetikleme nöral (Edi eşiği) — pnömatik tetiklemeden önce gelir */
  const navaMode = s => ({
    peep: s.peep, showLeak: s.showLeak, trig: 9, refractory: .3,
    tick(sim) { if (sim.phase === 'exp' && sim.effort.edi > s.ediTrig && sim.t - sim.lastEnd > .3 && sim.effort.neuralInsp) sim.startBreath({kind: 'nava', type: 'spont', trig: 'neural', level: s.level}); }
  });
  reg('nava', (s = {}) => navaMode(Object.assign({peep: 5, level: .8, ediTrig: .8}, s)));
  reg('niv-nava', (s = {}) => navaMode(Object.assign({peep: 5, level: .7, ediTrig: .8, showLeak: true}, s)));
  /* ASV: pasif hastada basınç kontrollü zorunlu soluk, aktif hastada PS; hedef dakika ventilasyonuna göre basınç uyarlanır */
  reg('asv-adaptive-support', (s = {}) => {
    s = Object.assign({peep: 5, mvTarget: 6.5, vtTarget: .45, pinsp: 8, ti: 1, rate: 14}, s);
    const ad = adapt(s, 'pinsp', 4, 25, 2);
    return {
      peep: s.peep, trig: .05, refractory: .3, state: s,
      tick(sim) {
        const spRate = sim.breaths.filter(b => b.t0 > sim.t - 20 && b.type === 'spont').length * 3;
        const need = Math.max(0, s.mvTarget / s.vtTarget - spRate);
        if (need > 2 && sim.phase === 'exp' && sim.t - sim.lastStart >= 60 / Math.max(need, 5)) sim.startBreath(pcBreath(s, sim, 'mand', 'time'));
      },
      onTrigger(sim) { sim.startBreath(psBreath({ps: s.pinsp, ets: .25}, sim)); },
      onEnd: ad
    };
  });
  reg('intellivent-asv', (s = {}) => R['asv-adaptive-support'](Object.assign({mvTarget: 7}, s)));
  /* Automode: hasta efor gösterince kontrollü soluktan destekli soluğa; apnede geri */
  reg('automode', (s = {}) => {
    s = Object.assign({peep: 5, pinsp: 12, ps: 8, rate: 14, ti: 1, apnea: 7}, s);
    return {
      peep: s.peep, trig: .05, refractory: .3,
      tick(sim) {
        if (sim.auto !== 'sup') sim.auto = 'ctl';
        if (sim.auto === 'sup' && sim.phase === 'exp' && sim.t - sim.lastStart > s.apnea) { sim.auto = 'ctl'; sim.events.push({t: sim.t, type: 'switch', trig: 'apnea'}); }
        if (sim.auto === 'ctl' && timer(sim, s.rate)) sim.startBreath(pcBreath(s, sim, 'mand', 'time'));
      },
      onTrigger(sim) {
        if (sim.auto === 'ctl') { sim.trigCount = (sim.trigCount || 0) + 1; sim.startBreath(pcBreath(s, sim, 'assist', 'pat')); if (sim.trigCount >= 2) { sim.auto = 'sup'; sim.trigCount = 0; sim.events.push({t: sim.t, type: 'switch', trig: 'pat'}); } }
        else sim.startBreath(psBreath(s, sim));
      }
    };
  });
  reg('smartcare', (s = {}) => R.psv(Object.assign({ps: 10}, s)));
  reg('variable-ps', (s = {}) => { s = Object.assign({peep: 5, ps: 8, varPct: .35}, s); let n = 0; return F.spont(s, sim => { n++; const v = 1 + s.varPct * Math.sin(n * 2.17) * Math.cos(n * .9); return psBreath(s, sim, 'spont', Math.max(1, s.ps * v)); }); });
  /* NIV: IPAP/EPAP, kaçak; S: yalnız hasta, S/T: yedek sıklık, T/PC: zamanlı */
  reg('niv-s', (s = {}) => { s = Object.assign({peep: 5, ps: 8, ets: .3, showLeak: true}, s); return F.spont(s, sim => psBreath(s, sim)); });
  reg('niv-st', (s = {}) => { s = Object.assign({peep: 5, ps: 8, ets: .3, showLeak: true, backup: 12, ti: 1.1, pinsp: 8}, s); return F.spont(s, sim => psBreath(s, sim)); });
  reg('niv-t-pc', (s = {}) => { s = Object.assign({peep: 5, pinsp: 10, rate: 14, ti: 1.1}, s); const m = F.ac(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); m.showLeak = true; return m; });
  reg('avaps', (s = {}) => {
    s = Object.assign({peep: 5, ps: 6, vtTarget: .45, showLeak: true, backup: 10, ti: 1.1, pinsp: 6}, s);
    const m = F.spont(s, sim => psBreath(s, sim)); const ad = adapt(s, 'ps', 2, 20, .5, 1); m.onEnd = (sim, b) => { ad(sim, b); s.pinsp = s.ps; }; m.state = s; return m;
  });
  reg('avaps-ae', (s = {}) => R.avaps(s));
  reg('ivaps', (s = {}) => R.avaps(s));
  reg('sleep-asv', (s = {}) => {
    /* Uyku ASV: destek, hastanın son dakikalardaki ortalama ventilasyonuna göre ters yönde servo ayarlanır */
    s = Object.assign({peep: 5, psMin: 2, psMax: 12, backup: 12, ti: 1.1, showLeak: true}, s);
    let ps = s.psMin, avg = null;
    const m = {
      peep: s.peep, trig: .05, refractory: .3, showLeak: true, state: s,
      tick(sim, dt) {
        const recent = sim.breaths.filter(b => b.t0 > sim.t - 8), vNow = recent.reduce((a, b) => a + Math.max(0, b.vt - (b.assistV || 0)), 0) / 8;
        avg = avg == null ? .12 : avg + (vNow - avg) * dt / 120;
        sim.stats.asvAvg = avg;
        if (sim.phase === 'exp' && sim.t - sim.lastStart > 60 / s.backup && sim.t > 10) sim.startBreath(pcBreath({pinsp: s.psMax * .8, ti: s.ti}, sim, 'mand', 'time'));
      },
      onTrigger(sim) {
        /* Servo ilkesi (şematik): hastanın kendi eforu küçüldükçe destek artar, büyüdükçe azalır.
           Eforun büyüklüğü burada modelin efor genliğinden okunur; gerçek cihaz bunu akım sinyalinden tahmin eder. */
        ps = s.psMin + (s.psMax - s.psMin) * clamp(1 - sim.effort.amp, 0, 1);
        sim.startBreath(psBreath({ps, ets: .3}, sim));
      }
    };
    return m;
  });
  reg('apap', (s = {}) => R.cpap(Object.assign({peep: 7, showLeak: true}, s)));
  /* Yenidoğan: sürekli akımlı devre, zaman çevrimli basınç sınırlı soluk; A/C (SIPPV); hacim hedefli (VG) */
  reg('neonatal-tcpl', (s = {}) => { s = Object.assign({peep: 5, pinsp: 12, rate: 40, ti: .35, noAssist: true}, s); return F.ac(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); });
  reg('neonatal-ac-sippv', (s = {}) => { s = Object.assign({peep: 5, pinsp: 12, rate: 30, ti: .35, trig: .003, refr: .2}, s); return F.ac(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); });
  reg('neonatal-vg', (s = {}) => {
    s = Object.assign({peep: 5, pinsp: 18, rate: 40, ti: .35, vtTarget: .005, pmax: 30, trig: .003, refr: .2}, s);
    const m = F.ac(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); m.onEnd = adapt(s, 'pinsp', 3, s.pmax - s.peep, 1.5); m.state = s; return m;
  });
  reg('ncpap', (s = {}) => {
    s = Object.assign({peep: 6, bubble: .9, showLeak: true}, s);
    return {peep: s.peep, showLeak: true, trig: 99, base(sim) { return s.peep + s.bubble * (Math.sin(sim.t * 2 * Math.PI * 11) * .6 + Math.sin(sim.t * 2 * Math.PI * 17.3) * .4) * (.6 + .4 * Math.sin(sim.t * 1.3)); }};
  });
  reg('nippv', (s = {}) => {
    s = Object.assign({peep: 6, pinsp: 10, rate: 30, ti: .4}, s);
    const m = F.ac(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); m.onTrigger = null; m.showLeak = true; return m;
  });
  /* Yüksek frekans: ortalama basınç etrafında sinüs (HFOV), aktif ekspirasyon; jet darbeleri (HFJV); perküsif darbeler (HFPV) */
  const oscMode = s => ({
    peep: s.map, showLeak: s.showLeak, trig: 99, state: s, noCirc: true,
    base(sim) { return s.map + s.amp / 2 * Math.sin(2 * Math.PI * s.hz * sim.t); },
    tick(sim) {
      if (s.vg) {                                        // HFOV-VG: ölçülen osilatuvar hacme göre genliği uyarla
        const per = 1 / s.hz, k = Math.floor(sim.t / per);
        sim._vmin = Math.min(sim._vmin ?? 9, sim.V); sim._vmax = Math.max(sim._vmax ?? -9, sim.V);
        if (k !== sim._k) { if (sim._k != null) { const vthf = sim._vmax - sim._vmin; sim.stats.vthf = vthf; s.amp = clamp(s.amp + (s.vg - vthf) / sim.C * .08, 5, 60); } sim._k = k; sim._vmin = 9; sim._vmax = -9; }
      }
    }
  });
  reg('hfov', (s = {}) => oscMode(Object.assign({map: 14, amp: 30, hz: 10}, s)));
  reg('hfov-vg', (s = {}) => oscMode(Object.assign({map: 14, amp: 20, hz: 10, vg: .0025}, s)));
  reg('nhfov', (s = {}) => oscMode(Object.assign({map: 8, amp: 14, hz: 9, showLeak: true}, s)));
  reg('hfjv', (s = {}) => {
    s = Object.assign({peep: 6, pjet: 26, hz: 6, tij: .02}, s);
    return {peep: s.peep, trig: 99, tick(sim) { if (sim.phase === 'exp' && sim.t - sim.lastStart >= 1 / s.hz) sim.startBreath({kind: 'jet', type: 'mand', trig: 'time', p: s.pjet, ti: s.tij}); }};
  });
  reg('hfpv', (s = {}) => {
    s = Object.assign({peep: 5, pinsp: 18, rate: 12, ti: 1.6, hz: 8}, s);
    const env = sim => { const per = 60 / s.rate, ph = sim.t % per; return ph < s.ti; };
    return {
      peep: s.peep, trig: 99, noCirc: true,
      base(sim) { const ins = env(sim), pulse = (sim.t * s.hz) % 1 < .45; return (ins ? s.peep + 4 + (s.pinsp - 4) * Math.min(1, (sim.t % (60 / s.rate)) / s.ti * 1.4) * (pulse ? 1 : .55) : s.peep + (pulse ? 3 : 0)); },
      tick(sim) { const ins = env(sim); if (sim._ins !== ins) { sim._ins = ins; if (ins) { sim.events.push({t: sim.t, type: 'mand', trig: 'time'}); sim.vInspStart = sim.V; } } }
    };
  });
  reg('fcv', (s = {}) => { s = Object.assign({peep: 5, rate: 15, vt: .4, flow: .3}, s); return {peep: s.peep, trig: 99, tick(sim) { if (timer(sim, s.rate)) sim.startBreath({kind: 'fcv', type: 'mand', trig: 'time', flow: s.flow, vt: s.vt}); }}; });
  /* Ağızlık: hasta ağızlığa ulaştığında hacim solukları; ağızlık dışında devre bağlı değil (Paw=0, akım ölçülmez) */
  reg('mouthpiece', (s = {}) => {
    s = Object.assign({vt: .6, ti: 1.1, on: 12, off: 14}, s);
    return {
      peep: 0, trig: .03, refractory: .5,
      base(sim) { return 0; },
      tick(sim) { const ph = sim.t % (s.on + s.off); sim.mouth = ph < s.on; },
      onTrigger(sim) { if (sim.mouth) sim.startBreath(vcBreath({vt: s.vt, ti: s.ti, pause: 0}, 'assist', 'pat')); }
    };
  });
  /* Negatif basınç: hava yolu atmosfere açık; göğüs çevresindeki basınç inspirasyonda negatife iner */
  reg('negative-pressure', (s = {}) => {
    s = Object.assign({pneg: -12, rate: 14, ti: 1.4}, s);
    return {peep: 0, trig: 99, noCirc: true, base() { return 0; }, tick(sim) {
      const per = 60 / s.rate, ph = sim.t % per, ins = ph < s.ti;
      sim.pext = ins ? s.pneg * Math.min(1, ph / .25) : s.pneg * Math.max(0, 1 - (ph - s.ti) / .2);
      if (sim._ins !== ins) { sim._ins = ins; if (ins) { sim.events.push({t: sim.t, type: 'mand', trig: 'time'}); sim.vInspStart = sim.V; } }
    }};
  });
  /* VAPS: PS gibi başlar; akım ayarlı akıma düştüğünde hedef hacme ulaşılmadıysa sabit akımla tamamlar */
  reg('vaps-intrabreath', (s = {}) => {
    s = Object.assign({peep: 5, ps: 8, vt: .45, minFlow: .25, rate: 10}, s);
    const make = (sim, type = 'spont', trig = 'pat') => ({kind: 'vaps', type, trig, p: sim.base() + s.ps, rise: .08, ets: 1e-9, vt: s.vt, minFlow: s.minFlow, tiMax: 2.5});
    return {peep: s.peep, trig: .05, refractory: .3, tick(sim) { if (timer(sim, s.rate)) sim.startBreath(make(sim, 'mand', 'time')); }, onTrigger(sim) { sim.startBreath(make(sim, 'assist')); },
      onEnd() {}, _patch: true, flowSwitch: true, minFlowFrac: s.minFlow};
  });
  /* Bağımsız akciğer: iki bölme, iki ayrı kontrol (burada iki PC devresi aynı zamanlamayla) */
  reg('independent-lung', (s = {}) => { s = Object.assign({peep: 5, rate: 14, pinsp: 12, ti: 1}, s); return F.ac(s, (sim, type, trig) => pcBreath(s, sim, type, trig)); });

  /* VAPS: akım ayarlı minimuma düştüğünde geçiş (ets yerine minFlow ölçütü) */
  const _step = Sim.prototype.step;
  Sim.prototype.step = function (dt) {
    const b = this.br;
    if (b && b.kind === 'vaps' && this.t - b.t0 > .12 && this.flowPt <= b.minFlow) {
      if (this.V - this.vInspStart < b.vt) { b.kind = 'vc'; b.tflow = 9; b.flow = b.minFlow; b.tVol = b.vt; b.t0f = this.t; }
      else this.endBreath();
    }
    return _step.call(this, dt);
  };

  /* ---------- Ölçülen değerler (son solukların özeti) ---------- */
  function numerics(sim, win = 30) {
    let bs = sim.breaths.filter(b => b.t0 > sim.t - win && b.t0 > 2);
    if (!bs.length) bs = sim.pbreaths.filter(b => b.t0 > sim.t - win && b.t0 > 2 && b.vt > .002 * sim.C / .05);
    if (!bs.length) return null;
    const last = bs[bs.length - 1];
    /* sıklık: ardışık soluk başlangıçları arasındaki ortalama süre; dakika hacmi = ortalama VT × f */
    const fInt = bs.length > 1 ? (bs.length - 1) * 60 / (last.t0 - bs[0].t0) : 0, fCnt = bs.length * 60 / Math.min(win, sim.t - 2);
    const f = fCnt < fInt * .75 ? fCnt : fInt;                // aralıklı solukta (ör. ağızlık) pencere sayımı
    const vt = last.vt, mv = bs.reduce((a, b) => a + b.vt, 0) / bs.length * f;
    return {ppeak: last.peak ?? null, vt, f, mv, ti: last.ti ?? null};
  }

  return {Sim, Effort, models: R, numerics, DT, has: id => !!R[id], make: (id, s) => Object.assign(R[id](s), {_id: id})};
})();
if (typeof module !== 'undefined') module.exports = VENT;
