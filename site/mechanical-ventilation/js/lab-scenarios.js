'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · 16 sentetik senaryo (vl-model-0.1)
   Başlangıç ve müdahale sayıları içerik paketindeki senaryolar.json dosyasından birebir alınmıştır [S]: eğitim/test için
   seçilmiş sayılardır; normal değer, tedavi hedefi veya başlangıç önerisi değildir. Başlangıç x = C·PEEP (pasif denge).
   Tahmin sorusunun yanıtı yazarca belirlenmez: müdahale öncesi ve sonrası soluk kayıtları karşılaştırılarak motordan okunur.
   Metinler (başlık, görev, beklenen, üretilmemeli, soru ve seçenekler) locales/lab.<dil>.js içinde lab.sc.<kimlik>.* anahtarlarıyladır. */
const VLAB_SC = (() => {
  const DATA = [{"id":"VL01","mode":"VC-AC","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"VC-AC"},"iv":{"patient":{"Rin":20},"settings":{}}},{"id":"VL02","mode":"VC-AC","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"VC-AC"},"iv":{"patient":{"C":0.025},"settings":{}}},{"id":"VL03","mode":"PC-AC","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"PC-AC"},"iv":{"patient":{"C":0.025},"settings":{}}},{"id":"VL04","mode":"PC-AC","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"PC-AC"},"iv":{"patient":{"Rin":30},"settings":{}}},{"id":"VL05","mode":"VC-AC","patient":{"C":0.08,"Rin":10,"Rexp":25,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":20,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"VC-AC"},"iv":{"patient":{},"settings":{"RRset":30}}},{"id":"VL06","mode":"CPAP","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"CPAP"},"iv":{"patient":{},"settings":{"PEEP":10}}},{"id":"VL07","mode":"PC-AC","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":8,"neuralRR":18,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"PC-AC"},"iv":{"patient":{},"settings":{}}},{"id":"VL08","mode":"PSV","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":0.1,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.05,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"PSV"},"iv":{"patient":{},"settings":{}}},{"id":"VL09","mode":"PSV","patient":{"C":0.07,"Rin":20,"Rexp":20,"Rv":2,"Mmax":6,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"PSV"},"iv":{"patient":{},"settings":{"cycle_fraction":0.5}}},{"id":"VL10","mode":"PSV","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":8,"neuralRR":12,"neuralTi":1.8,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.7,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"PSV"},"iv":{"patient":{},"settings":{}}},{"id":"VL11","mode":"PSV","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":true,"backupPC":{"RRset":12,"dPinsp":10,"Ti":1,"riseTime":0.1},"mode":"PSV"},"iv":{"patient":{},"settings":{}}},{"id":"VL12","mode":"PC-AC","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":8,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"PC-AC"},"iv":{"patient":{},"settings":{}}},{"id":"VL13","mode":"VC-AC","patient":{"C":0.025,"Rin":20,"Rexp":10,"Rv":2,"Mmax":0,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":25,"apneaTime":20,"backupEnabled":false,"mode":"VC-AC"},"iv":{"patient":{},"settings":{}}},{"id":"VL14","mode":"CPAP","patient":{"C":0.05,"Rin":10,"Rexp":10,"Rv":2,"Mmax":6,"neuralRR":12,"neuralTi":1,"neuralPhase":0.7},"settings":{"PEEP":5,"VTset":0.5,"Qset":0.5,"RRset":12,"dPinsp":10,"PS":10,"Ti":1,"pauseTime":0,"riseTime":0.1,"Ti_min":0.2,"Ti_max":2,"cycle_fraction":0.25,"trigger_kind":"flow","Qtrigger":0.03333333333333333,"dPtrigger":0.5,"Pmax":40,"apneaTime":20,"backupEnabled":false,"mode":"CPAP"},"iv":{"patient":{"Mmax":0},"settings":{}}},{"id":"VL15","mode":"CO2_LAB","gas":{"VT_L":0.5,"VD_L":0.15,"f_min":12,"VCO2_mL_min_STPD":200}},{"id":"VL16","mode":"O2_LAB","gas":{"FiO2_fraction":0.4,"PB_mmHg":760,"PACO2_mmHg":40,"RQ":0.8,"Hb_g_dL":12,"PvO2_mmHg":40,"shunt_fraction":0.2,"fixed_pH":7.4,"fixed_temperature_C":37}}];
  const med = a => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  /* Değerlendirme: önce = müdahaleden önceki son 3 tamamlanmış soluk; ilk = müdahaleden sonra ilk tam soluk (geçiş);
     son = son 3 tamamlanmış soluk (yeni periyodik örüntüye yakın). Geçiş soluğu kararlı durum diye sunulmaz. */
  /* Müdahale anında süren soluk ve henüz eski ayar sürümüyle başlamış soluklar iki gruba da alınmaz (geçiş);
     "sonra" yalnız yeni ayar ve mekanik sürümüyle başlayan, mekaniği soluk içinde değişmemiş soluklardır. */
  function split(lab, tI, sv = 0, mv = 0) {
    const done = lab.breaths.filter(b => b.tInspEnd != null);
    const before = done.filter(b => b.tEnd != null && b.tEnd <= tI + 1e-9).slice(-3);
    const after = done.filter(b => b.tStart >= tI - 1e-9 && b.sVer >= sv && b.mVer >= mv && !b.mechChanged);
    const trans = done.filter(b => !before.includes(b) && !after.includes(b) && b.tEnd > tI).length;
    return {before, first: after[0] || null, last: after.slice(-3), after, trans};
  }
  /* Müdahale için başlangıç verisi hazır mı? (gözlem senaryolarında gerekmez) */
  function baseline(sc, lab) {
    if (sc.observe || sc.lab) return {ready: true};
    if (sc.baseT) return {ready: lab.t >= sc.baseT, s: Math.max(0, sc.baseT - lab.t)};
    const k = lab.breaths.filter(b => b.tInspEnd != null && b.tEnd != null).length;
    return {ready: k >= 3, k: Math.min(k, 3), n: 3};
  }
  const pick = (bs, f) => med(bs.map(f).filter(v => v != null && Number.isFinite(v)));
  const dir = (a, b, tol) => a == null || b == null ? null : b - a > tol ? 'up' : a - b > tol ? 'down' : 'same';
  /* Senaryo tanımları: soru seçenekleri, gözlem süresi, karşılaştırılan büyüklükler ve motordan yanıt okuma */
  const DEF = {
    VL01: {opts: ['up', 'same', 'down'], minAfter: 4, show: ['Ppeak', 'VTi'], judge: (s) => dir(pick(s.before, b => b.Ppeak), pick(s.last, b => b.Ppeak), .5)},
    VL02: {opts: ['up', 'same', 'down'], minAfter: 4, show: ['Ppeak', 'VTi'], judge: (s) => dir(pick(s.before, b => b.Ppeak), pick(s.last, b => b.Ppeak), .5)},
    VL03: {opts: ['up', 'same', 'down'], minAfter: 4, show: ['VTi', 'Ppeak'], judge: (s) => dir(pick(s.before, b => b.VTi), pick(s.last, b => b.VTi), .005)},
    VL04: {opts: ['up', 'same', 'down'], minAfter: 4, show: ['VTi', 'Ppeak'], judge: (s) => dir(pick(s.before, b => b.VTi), pick(s.last, b => b.VTi), .005)},
    VL05: {opts: ['up', 'same', 'down'], minAfter: 8, show: ['flowEnd', 'Ppeak', 'VTe'], judge: (s) => dir(pick(s.before, b => -b.flowAtNextStart), pick(s.last, b => -b.flowAtNextStart), .005)},
    VL06: {opts: ['instant', 'gradual', 'none'], minTime: 4, baseT: 2, show: ['xstep'], judge: (s, lab, tI) => {
      const x0 = s.x0, xf = lab.x, x50 = s.x50; if (x0 == null || x50 == null) return null;
      if (Math.abs(xf - x0) < 1e-3) return 'none'; return (x50 - x0) / (xf - x0) < .5 ? 'gradual' : 'instant'; }},
    VL07: {opts: ['higher', 'equal', 'lower'], observe: true, minTime: 30, show: ['ftotal', 'causes'], judge: (s, lab) => {
      const st = s.after.map(b => b.tStart); if (st.length < 3) return null; const f = 60 * (st.length - 1) / (st[st.length - 1] - st[0]), rr = lab.S.RRset;
      return f > rr + .5 ? 'higher' : f < rr - .5 ? 'lower' : 'equal'; }},
    VL08: {opts: ['none', 'some'], observe: true, minTime: 25, show: ['count', 'efforts'], judge: (s) => s.after.length ? 'some' : 'none'},
    VL09: {opts: ['up', 'same', 'down'], minAfter: 4, show: ['Ti', 'VTi', 'cycle'], judge: (s) => dir(pick(s.before, b => b.Ti), pick(s.last, b => b.Ti), .01)},
    VL10: {opts: ['earlier', 'same', 'later'], observe: true, minTime: 30, show: ['offset', 'double'], judge: (s) => {
      const o = pick(s.after, b => b.cycleOffset); return o == null ? null : o < -.05 ? 'earlier' : o > .05 ? 'later' : 'same'; }},
    VL11: {opts: ['nothing', 'psv', 'backup'], observe: true, minTime: 30, show: ['count', 'kinds'], judge: (s) => s.after.some(b => b.kind === 'backup') ? 'backup' : s.after.length ? 'psv' : 'nothing'},
    VL12: {opts: ['yes', 'no'], hold: 'insp', minTime: 12, show: ['Pplat', 'holdPaw'], judge: (s, lab) => {
      const h = [...lab.holds].reverse().find(x => x.kind === 'insp' && x.manual && x.t >= s.tI); if (!h) return null; return h.Mmax === 0 ? 'yes' : 'no'; }},
    VL13: {opts: ['yes', 'no'], observe: true, minTime: 6, show: ['VTi', 'limited'], judge: (s, lab) => { const b = s.after[0]; return b ? (b.VTi >= .95 * lab.S.VTset ? 'yes' : 'no') : null; }},
    VL14: {opts: ['machine', 'stops', 'drops'], minTime: 20, show: ['count', 'pawEnd'], judge: (s, lab, tI) => {
      const late = s.after.filter(b => b.tStart > tI + 60 / lab.P.neuralRR + .1); if (late.length) return 'machine';
      return Math.abs(lab.pawNow - lab.S.PEEP) < .5 ? 'stops' : 'drops'; }},
    VL15: {lab: 'co2', opts: ['double', 'same', 'half']}, VL16: {lab: 'o2', opts: ['toward_c', 'same', 'toward_v']}
  };
  const list = DATA.map(d => Object.assign({}, d, DEF[d.id]));
  const get = id => list.find(s => s.id === id);
  const clone = o => JSON.parse(JSON.stringify(o));
  /* Laboratuvar kurulumu: başlangıç x = C·PEEP */
  function init(sc) { return {settings: clone(sc.settings), patient: clone(sc.patient)}; }
  /* Müdahaleyi uygula; değerlendirme için başlangıç anlık görüntüsü döner */
  function intervene(sc, lab) {
    const snap = {tI: lab.t, x0: lab.x};
    const iv = sc.iv || {settings: {}, patient: {}};
    if (Object.keys(iv.patient).length) lab.setPatient(iv.patient);
    if (Object.keys(iv.settings).length) { const e = lab.request(iv.settings); if (e.length) snap.errors = e; }
    if (sc.hold) lab.hold(sc.hold);
    /* hedef sürümler: bekleyen ayar paketi uygulanınca sVer bir artar */
    snap.sv = lab.pending ? lab.sVer + 1 : lab.sVer; snap.mv = lab.mVer;
    return snap;
  }
  /* Değerlendirme hazır mı ve yanıt ne? */
  function evaluate(sc, lab, snap) {
    const s = Object.assign(split(lab, snap.tI, snap.sv || 0, snap.mv || 0), snap);
    /* VL06: müdahaleden 50 ms sonraki x, örnek belleğinden */
    if (sc.id === 'VL06' && snap.x50 == null && lab.t >= snap.tI + .05) { const R = lab.ring; for (let k = R.len - 1; k >= 0; k--) { const i = R.idx(k); if (R.t[i] <= snap.tI + .05 + 1e-9) { snap.x50 = s.x50 = R.x[i]; break; } } }
    const enoughB = sc.minAfter ? s.before.length >= 3 && s.last.length >= 3 && s.after.length >= sc.minAfter : true;
    const enoughT = sc.minTime ? lab.t >= snap.tI + sc.minTime : true;
    const ready = enoughB && enoughT;
    return {ready, answer: ready ? sc.judge(s, lab, snap.tI) : null, s};
  }
  return {list, get, init, intervene, evaluate, split, baseline, med, pick};
})();
if (typeof module !== 'undefined') module.exports = VLAB_SC;
