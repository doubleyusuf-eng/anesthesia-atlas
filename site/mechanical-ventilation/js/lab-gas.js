'use strict';
/* Mekanik Ventilasyon Atlası · Ventilasyon Laboratuvarı · kararlı durum gaz deneyleri (vl-model-0.1)
   Mekanik döngüden ayrıdır; canlı kan gazı, SpO₂, ETCO₂ veya pH üretmez. İki bağımsız deney:
   A. Alveoler ventilasyon ve CO₂: VA = f·(VT − VD) [L/min, BTPS]; PACO₂ = 0,863·VCO₂/VA [mmHg; VCO₂ mL/min STPD].
   B. İdeal alveoler O₂: PAO₂ = FiO₂·(PB − PH₂O) − PACO₂·(FiO₂ + (1 − FiO₂)/RQ); PH₂O 47 mmHg, 37 °C.
   C. İzole şant: S(P) = (P³ + 150P)/(P³ + 150P + 23400) (Severinghaus 1979); C_O₂ = 1,34·Hb·S + 0,003·P [mL/dL];
      CaO₂ = (1 − s)·CcO₂ + s·CvO₂; PaO₂, C_O₂(PaO₂) = CaO₂ kökünden ikiye bölmeyle bulunur. Basınçlar ortalanmaz.
   Sabitler: erişkin Hb, pH 7,40, 37 °C, dishemoglobin yok, sabit PvO₂. HbF, sıcaklık/pH değişimi bu sürümde yoktur. */
const VLAB_GAS = (() => {
  const VERSION = 'vl-model-0.1', PH2O = 47;
  const fin = v => typeof v === 'number' && Number.isFinite(v);
  const res = (value, status, why = [], extra = {}) => Object.assign({value: status === 'valid' ? value : null, status, origin: 'steady_state_estimate', reasonCodes: why, modelVersion: VERSION}, extra);

  function co2(i) {
    const why = [];
    if (!fin(i.VT_L) || i.VT_L <= 0) why.push('vt');
    if (!fin(i.VD_L) || i.VD_L < 0) why.push('vd');
    if (!fin(i.f_min) || i.f_min <= 0) why.push('f');
    if (!fin(i.VCO2) || i.VCO2 <= 0) why.push('vco2');
    if (why.length) return {VA: res(null, 'invalid', why), PACO2: res(null, 'invalid', why)};
    const VA = i.f_min * (i.VT_L - i.VD_L);
    if (!(VA > 0)) return {VA: res(null, 'invalid', ['va_nonpositive'], {raw: VA}), PACO2: res(null, 'unavailable', ['va_nonpositive'])};
    return {VA: res(VA, 'valid'), PACO2: res(.863 * i.VCO2 / VA, 'valid')};
  }

  function pao2(i) {
    const why = [];
    if (!fin(i.FiO2) || i.FiO2 <= 0 || i.FiO2 > 1) why.push('fio2');
    if (!fin(i.PB) || i.PB <= PH2O) why.push('pb');
    if (!fin(i.RQ) || i.RQ <= 0) why.push('rq');
    if (!fin(i.PACO2) || i.PACO2 < 0) why.push('paco2');
    if (why.length) return res(null, 'invalid', why);
    const PIO2 = i.FiO2 * (i.PB - PH2O);
    const v = PIO2 - i.PACO2 * (i.FiO2 + (1 - i.FiO2) / i.RQ);
    if (v < 0 || v > PIO2) return res(null, 'invalid', ['inconsistent'], {raw: v, PIO2});
    return res(v, 'valid', [], {PIO2});
  }

  const sat = p => { const a = p * p * p + 150 * p; return a / (a + 23400); };
  const content = (p, hb) => 1.34 * hb * sat(p) + .003 * p;

  function shunt(i) {
    /* standart erişkin eğrisinin dışındaki koşullar bu sürümde açılmaz */
    if ((i.pH != null && i.pH !== 7.4) || (i.tempC != null && i.tempC !== 37) || i.HbF || i.dyshemoglobin) return {PAO2: res(null, 'invalid', ['out_of_model_scope']), PaO2: res(null, 'invalid', ['out_of_model_scope'])};
    const A = pao2(i);
    if (A.status !== 'valid') return {PAO2: A, PaO2: res(null, 'unavailable', ['pao2'])};
    const why = [];
    if (!fin(i.Hb) || i.Hb <= 0) why.push('hb');
    if (!fin(i.s) || i.s < 0 || i.s > 1) why.push('shunt');
    if (!fin(i.PvO2) || i.PvO2 < 0 || i.PvO2 > A.value) why.push('pvo2');
    if (why.length) return {PAO2: A, PaO2: res(null, 'invalid', why)};
    const PA = A.value, Cc = content(PA, i.Hb), Cv = content(i.PvO2, i.Hb), Ca = (1 - i.s) * Cc + i.s * Cv;
    let lo = i.PvO2, hi = PA, mid = (lo + hi) / 2, n = 0;
    if (i.s === 0) mid = PA; else if (i.s === 1) mid = i.PvO2;
    else for (; n < 100; n++) { mid = (lo + hi) / 2; const r = content(mid, i.Hb) - Ca; if (Math.abs(r) < 1e-8) break; if (r < 0) lo = mid; else hi = mid; }
    return {PAO2: A, PaO2: res(mid, 'valid', [], {iter: n}), SaO2: res(100 * sat(mid), 'valid'), CaO2: res(Ca, 'valid'), CcO2: res(Cc, 'valid'), CvO2: res(Cv, 'valid'),
      /* öğretim karşılaştırması: basınçların aritmetik ortalaması (yanlış yöntem) */
      naive: (1 - i.s) * PA + i.s * i.PvO2};
  }

  return {co2, pao2, shunt, sat, content, PH2O, VERSION};
})();
if (typeof module !== 'undefined') module.exports = VLAB_GAS;
