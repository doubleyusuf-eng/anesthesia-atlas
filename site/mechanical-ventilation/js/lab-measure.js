'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · ölçüm ve uygunluk katmanı (vl-model-0.1)
   Monitör değerleri yalnız ölçülebilir sinyallerden (Paw, akım, zaman) ve tamamlanmış soluk kayıtlarından üretilir.
   Her değer bir zarf taşır: {value, unit, status, origin, validAt, window, reasonCodes, modelVersion}.
   status: valid / unavailable / invalid / settling / illustrative. Kullanılamayan değer null'dur; sıfırla doldurulmaz.
   Bekletme ölçümleri yalnız pasif koşulda (M tüm bekletme boyunca 0) "pasif model ölçümü" sayılır. Driving pressure ve Cstat
   yalnız aynı soluğun EE ve EI bekletmelerinden, aynı ayar ve mekanikle hesaplanır. Modelin bildiği C, R, Palv, M ve x
   monitöre değil "Modelin içi" paneline gider. */
const VLAB_MEAS = (() => {
  const MOD = typeof VLAB_MODEL !== 'undefined' ? VLAB_MODEL : require('./lab-model.js');
  const VERSION = MOD.VERSION;
  const env = (value, unit, status, origin, o = {}) => ({value: status === 'valid' || status === 'illustrative' ? value : null, unit, status, origin, validAt: o.at ?? null, window: o.window ?? null, reasonCodes: o.why || [], modelVersion: VERSION, raw: o.raw ?? null});
  const na = (unit, origin, why, o = {}) => env(null, unit, 'unavailable', origin, Object.assign({why}, o));

  /* Son tamamlanmış soluk (VTe dahil); grafik, tablo ve özet aynı kayıttan okunur */
  function lastBreath(lab) { for (let i = lab.breaths.length - 1; i >= 0; i--) if (lab.breaths[i].tInspEnd != null) return lab.breaths[i]; return null; }

  function monitor(lab) {
    const b = lastBreath(lab), M = {};
    const SM = 'synthetic_measurement';
    if (!b) {
      for (const [k, u] of [['Ppeak', 'cmH₂O'], ['PawMean', 'cmH₂O'], ['VTi', 'L'], ['VTe', 'L'], ['Ti', 's'], ['Te', 's'], ['IE', '']]) M[k] = na(u, SM, ['no_breath']);
    } else {
      const at = b.tStart;
      M.Ppeak = env(b.Ppeak, 'cmH₂O', 'valid', SM, {at});
      M.PawMean = env(b.PawMean, 'cmH₂O', 'valid', SM, {at});
      M.VTi = env(b.VTi, 'L', 'valid', SM, {at, why: b.pressureLimited ? ['pressure_limited'] : []});
      M.VTe = b.VTe != null ? env(b.VTe, 'L', 'valid', SM, {at, why: b.Te != null && Math.abs(b.flowAtNextStart) > .02 ? ['exp_incomplete'] : []}) : na('L', SM, ['no_expiration']);
      M.Ti = env(b.Ti, 's', 'valid', SM, {at});
      M.Te = b.Te != null ? env(b.Te, 's', 'valid', SM, {at}) : na('s', SM, ['no_expiration']);
      M.IE = b.Te ? env(b.Te / b.Ti, '', 'valid', SM, {at}) : na('', SM, ['no_expiration']);
      M.flowEnd = env(b.flowAtNextStart, 'L/s', 'valid', SM, {at});
    }
    /* Toplam frekans: son en çok 4 soluk aralığının ortalaması (RR × VT ile değil) */
    const starts = lab.breaths.map(x => x.tStart).concat(lab.br ? [lab.br.tStart] : []).slice(-5);
    M.ftotal = starts.length >= 2 ? env(60 * (starts.length - 1) / (starts[starts.length - 1] - starts[0]), '/min', 'valid', SM, {window: `${starts.length - 1}`}) : na('/min', SM, ['too_few_breaths']);
    if (starts.length >= 2 && lab.t - starts[starts.length - 1] > 60 / M.ftotal.value * 1.5) M.ftotal = na('/min', SM, ['no_recent_breath']);
    /* Dakika hacmi: son 60 s içinde tamamlanan ekspirasyonların toplamı; pencere dolmadan değer yok */
    if (lab.t - lab.tWindow < 60) M.MVe = env(null, 'L/min', 'settling', SM, {why: ['window_incomplete'], window: 60});
    else { let s = 0; for (const x of lab.breaths) if (x.VTe != null && x.tEnd > lab.t - 60 && x.tEnd <= lab.t) s += x.VTe; M.MVe = env(s, 'L/min', 'valid', SM, {window: 60}); }
    M.PEEPset = env(lab.S.PEEP, 'cmH₂O', 'valid', 'setting');
    /* Bayat değer: son soluk başlangıcından bu yana uzun süre geçtiyse soluk değerleri zamanıyla işaretlenir */
    const lastSt = starts.length ? starts[starts.length - 1] : null, ivs = starts.slice(1).map((v, i) => v - starts[i]);
    const lim = Math.max(10, 3 * (ivs.length ? Math.max(...ivs) : 0));
    if (b && lastSt != null && lab.t - lastSt > lim) for (const k of ['Ppeak', 'PawMean', 'VTi', 'VTe', 'Ti', 'Te', 'IE', 'flowEnd']) if (M[k] && M[k].status === 'valid') { M[k].reasonCodes = M[k].reasonCodes.concat('stale'); M[k].validAt = lastSt; }
    M.last = b;
    return M;
  }

  /* Bekletme ölçümleri */
  function holds(lab) {
    const SM = 'synthetic_measurement', out = {};
    const ei = [...lab.holds].reverse().find(h => h.kind === 'insp' && h.manual) || [...lab.holds].reverse().find(h => h.kind === 'insp');
    const ee = [...lab.holds].reverse().find(h => h.kind === 'exp');
    const why = h => { const w = []; if (h.Mmax > 0) w.push('effort_during_hold'); if (h.mechChanged) w.push('mechanics_changed'); return w; };
    if (ei) {
      out.holdPawI = env(ei.Paw, 'cmH₂O', 'valid', SM, {at: ei.t});
      const w = why(ei);
      out.Pplat = w.length ? env(null, 'cmH₂O', 'invalid', SM, {at: ei.t, why: w, raw: ei.Paw}) : env(ei.Paw, 'cmH₂O', 'valid', SM, {at: ei.t, why: ['passive_model']});
      /* Rin: yalnız VC sabit akım, akım sonu tepe örneği, pasif ve mekanik değişmemiş */
      if (ei.mode !== 'VC-AC' || ei.pawFlowEnd == null) out.Rin = na('cmH₂O·s/L', SM, ['needs_constant_flow']);
      else if (w.length || ei.Mflow > 0) out.Rin = env(null, 'cmH₂O·s/L', 'invalid', SM, {at: ei.t, why: w.length ? w : ['effort_during_insp']});
      else out.Rin = env((ei.pawFlowEnd - ei.Paw) / ei.Qset, 'cmH₂O·s/L', 'valid', SM, {at: ei.t, why: ['passive_model']});
    } else { out.holdPawI = na('cmH₂O', SM, ['no_insp_hold']); out.Pplat = na('cmH₂O', SM, ['no_insp_hold']); out.Rin = na('cmH₂O·s/L', SM, ['no_insp_hold']); }
    if (ee) {
      out.holdPawE = env(ee.Paw, 'cmH₂O', 'valid', SM, {at: ee.t});
      const w = why(ee);
      out.PEEPtot = w.length ? env(null, 'cmH₂O', 'invalid', SM, {at: ee.t, why: w, raw: ee.Paw}) : env(ee.Paw, 'cmH₂O', 'valid', SM, {at: ee.t, why: ['passive_model']});
      const d = ee.Paw - ee.PEEP;
      out.PEEPi = w.length ? env(null, 'cmH₂O', 'invalid', SM, {at: ee.t, why: w}) : d < -1e-9 ? env(null, 'cmH₂O', 'invalid', SM, {at: ee.t, why: ['negative_difference'], raw: d}) : env(Math.max(d, 0), 'cmH₂O', 'valid', SM, {at: ee.t, why: ['passive_model']});
    } else { out.holdPawE = na('cmH₂O', SM, ['no_exp_hold']); out.PEEPtot = na('cmH₂O', SM, ['no_exp_hold']); out.PEEPi = na('cmH₂O', SM, ['no_exp_hold']); }
    /* Driving pressure ve Cstat: aynı soluğun EE ve EI bekletmeleri */
    const pair = [...lab.breaths, ...(lab.br ? [lab.br] : [])].reverse().find(b => b.ei && b.ee);
    if (!pair) out.DP = out.Cstat = null;
    if (!pair) { const w = ei && ee ? ['not_same_breath'] : ['needs_paired_holds']; out.DP = na('cmH₂O', SM, w); out.Cstat = na('L/cmH₂O', SM, w); }
    else {
      const w = [...why(pair.ei), ...why(pair.ee)];
      if (pair.ei.sVer !== pair.ee.sVer) w.push('settings_changed');
      if (pair.ei.mVer !== pair.ee.mVer) w.push('mechanics_changed');
      const dp = pair.ei.Paw - pair.ee.Paw, vt = pair.ei.x - pair.ee.x;
      const ww = [...new Set(w)];
      out.DP = ww.length ? env(null, 'cmH₂O', 'invalid', SM, {at: pair.ei.t, why: ww}) : env(dp, 'cmH₂O', 'valid', SM, {at: pair.ei.t, why: ['passive_model', 'same_breath']});
      out.Cstat = ww.length ? env(null, 'L/cmH₂O', 'invalid', SM, {at: pair.ei.t, why: ww}) : dp > 0 ? env(vt / dp, 'L/cmH₂O', 'valid', SM, {at: pair.ei.t, why: ['passive_model', 'same_breath']}) : env(null, 'L/cmH₂O', 'invalid', SM, {at: pair.ei.t, why: ['denominator']});
    }
    return out;
  }

  /* Alarmlar: kullanıcı eşikleri [S]. Susturma fiziksel olayı silmez; olay kaydı kalır. */
  function alarms(lab, thr) {
    const M = monitor(lab), b = M.last, a = [];
    a.push({id: 'pmax', active: !!(b && b.pressureLimited) || !!(lab.br && lab.br.pressureLimited)});
    a.push({id: 'apnea', active: !!lab.apneaAlarm});
    a.push({id: 'backup', active: lab.backup, info: true});
    a.push({id: 'lowVT', active: !!(b && thr.VTlow != null && b.VTi < thr.VTlow)});
    a.push({id: 'lowMV', active: M.MVe.status === 'valid' && thr.MVlow != null && M.MVe.value < thr.MVlow, pending: M.MVe.status !== 'valid'});
    return a;
  }

  /* Modelin içi: ölçülmüş değil, modelin bildiği değişkenler */
  function inside(lab) {
    const P = lab.P, b = monitor(lab).last;
    return {
      x: lab.x, Palv: lab.x / P.C - (lab.Mnow || 0), M: lab.Mnow || 0, C: P.C, Rin: P.Rin, Rexp: P.Rexp, Rv: P.Rv,
      tauIn: P.Rin * P.C, tauExp: (P.Rexp + P.Rv) * P.C, xEq: P.C * lab.S.PEEP,
      xEE: b ? b.xStart : null, above: b ? b.xStart - P.C * lab.S.PEEP : null,
      neural: lab.neural.p, residual: lab.residual.trap, h: lab.h, state: lab.state, mode: lab.mode, version: VERSION
    };
  }

  /* Efor özeti (son 60 s): tetiklenen / tetiklenmeyen / makine soluğuyla çakışan */
  function efforts(lab) {
    const o = {triggered: 0, ineffective: 0, overlap: 0, spontaneous: 0, delays: [], offsets: []};
    for (const e of lab.efforts) if (e.cls && e.t0 > lab.t - 60) { o[e.cls]++; if (e.delay != null) o.delays.push(e.delay); }
    for (const b of lab.breaths) if (b.cycleOffset != null && b.tStart > lab.t - 60) o.offsets.push(b.cycleOffset);
    o.double = lab.events.filter(e => e.type === 'double_trigger' && e.t > lab.t - 60).length;
    return o;
  }

  return {env, monitor, holds, alarms, inside, efforts, lastBreath, VERSION};
})();
if (typeof module !== 'undefined') module.exports = VLAB_MEAS;
