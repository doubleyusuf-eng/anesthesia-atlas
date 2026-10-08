'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · eğitim yorumları (vl-model-0.1)
   Kolay anlatım metinleri motorun soluk kayıtlarından ve ölçüm uygunluğundan türetilir [M]; kişiye özel tedavi önerisi
   değildir. Üç derinlik: 1 başlangıç (denklem gizli), 2 asistan (dirençli/elastik pay, tetikleme ve siklus işaretleri,
   modelin içinden), 3 ayrıntı (birimler, varsayımlar, sayısal çözüm). Hastalık adı mekanik profilden çıkarılmaz. */
const VLAB_TEACH = (() => {
  const T = k => MVA.t(k), F = (k, v) => MVA.fill(T(k), v), n = (v, d = 0) => MVA.num(v, d);
  const ME = typeof VLAB_MEAS !== 'undefined' ? VLAB_MEAS : null;

  function live(lab, depth) {
    const out = [], M = ME.monitor(lab), H = ME.holds(lab), b = M.last, P = lab.P, S = lab.S, mode = lab.mode;
    const add = (kind, html) => out.push({kind, html});
    add('info', T('lab.tc.mode.' + mode));
    /* soluk yoksa da (apne, tetiklenmeyen efor, eforsuz CPAP) açıklama sürer; yalnız soluğa bağlı satırlar atlanır */
    if (!b && !lab.apneaAlarm && !(P.Mmax > 0) && lab.t < 15) add('info', T('lab.tc.wait'));
    if (!b && mode === 'CPAP' && !(P.Mmax > 0)) add('info', T('lab.tc.noEffort'));
    if (b && b.pressureLimited) add('warn', F('lab.tc.pmax', {vt: n(b.VTi * 1000), set: n(S.VTset * 1000), pmax: n(S.Pmax)}));
    if (b && b.flowAtNextStart < -.02) add('warn', F('lab.tc.trap', {q: n(-b.flowAtNextStart * 60, 1)}));
    if (lab.apneaAlarm && !lab.backup) add('warn', F('lab.tc.apnea', {s: n(S.apneaTime)}));
    if (lab.backup) add('warn', T('lab.tc.backup'));
    if (b && mode === 'PSV' && b.cycle) add('info', F('lab.tc.cyc', {cause: T('lab.cause.' + b.cycle), ti: n(b.Ti, 2)}));
    const E = ME.efforts(lab);
    if (P.Mmax > 0 && mode !== 'CPAP') {
      if (E.ineffective) add('warn', F('lab.tc.ineff', {n: E.ineffective}));
      if (E.double) add('warn', F('lab.tc.double', {n: E.double}));
    }
    if (H.Pplat.status === 'invalid' && H.Pplat.reasonCodes.includes('effort_during_hold')) add('warn', T('lab.tc.effhold'));
    if (H.Pplat.status === 'valid' && H.DP.status !== 'valid') add('info', T('lab.tc.needpair'));
    if (depth >= 2) {
      if (!b) { /* soluğa bağlı ayrıntı yok */ } else if (mode === 'VC-AC' && b.pawFlowEnd != null && b.Mflow === 0) {
        /* akım sonunda: dirençli pay Rin·Q, elastik pay x/C − PEEP (modelin içinden) */
        const res = P.Rin * S.Qset, el = b.pawFlowEnd - res - S.PEEP;
        add('model', F('lab.tc.split', {res: n(res, 1), el: n(el, 1), peep: n(S.PEEP, 1), pk: n(b.pawFlowEnd, 1)}));
      } else if (mode === 'VC-AC') add('model', T('lab.tc.splitNo'));
      if (b && (mode === 'PC-AC' || mode === 'BACKUP' || mode === 'PSV')) add('model', F('lab.tc.tau', {tau: n(P.Rin * P.C, 2), ti: n(b.Ti, 2), k: n(b.Ti / (P.Rin * P.C), 1)}));
      add('model', F('lab.tc.texp', {tau: n((P.Rexp + P.Rv) * P.C, 2), te: b && b.Te != null ? n(b.Te, 2) : '—'}));
      if (E.delays.length) add('model', F('lab.tc.delay', {ms: n(1000 * E.delays.reduce((a, c) => a + c, 0) / E.delays.length)}));
      if (E.offsets.length) { const o = E.offsets[E.offsets.length - 1]; add('model', F(o < 0 ? 'lab.tc.early' : 'lab.tc.late', {ms: n(Math.abs(o) * 1000)})); }
    }
    if (depth >= 3) {
      add('detail', F('lab.tc.detail', {h: n(lab.h * 1000, 2), res: lab.residual.trap.toExponential(1), v: lab.S && ME.VERSION}));
    }
    return out;
  }

  return {live};
})();
